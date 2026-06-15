/**
 * ai4medicine-data.js — 由 pipeline/build.py 于 2026-06-15 17:41:26 自动生成。
 * 源文件：content/ai4sci/ai4medicine.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "ai4sci",
    "topic_id": "ai4medicine",
    "topic_name": "药学AI",
    "page_title": "药学AI 算法总结",
    "page_subtitle": "2026-06-15 版",
    "page_desc": "药学AI是人工智能在生命科学领域最具变革潜力的应用方向，涵盖从分子生成、虚拟筛选到ADMET预测的全流程药物研发。该领域经历了从传统QSAR到深度学习，再到生成式AI与基础模型的技术演进，2026年已有173个AI原创药物进入临床阶段。",
    "page_icon": "💊",
    "hero_pills": [
      "分子生成 · 虚拟筛选 · ADMET预测 · 药物设计 · 基础模型"
    ],
    "count_pill": "{count} 个算法",
    "image_base": "../../content/ai4sci/ai4medicine/assets/",
    "overview_from_doc": true,
    "latest_overview_from_doc": true
  },
  "overview": [
    {
      "title": "",
      "body_html": "<h1>ACS Cent. Sci. | 通往药物超级智能的路线图</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2019569783788552368\">https://zhuanlan.zhihu.com/p/2019569783788552368</a></li>\n<li>作者: DrugOne</li>\n</ul>\n<hr />\n<p>ACS Cent. Sci. | 通往药物超级智能的路线图</p>\n<h1>ACS Cent. Sci. | 通往药物超级智能的路线图</h1>\n<p>作者: DrugOne, 赞: 2</p>\n<p>当我们已经习惯用自然语言让 AI 写文章、画图、生成代码的时候，一个更大胆的问题正在被认真讨论：能不能用一句话，让 AI 自主完成一个完整的药物发现流程？</p>\n<p>这不是科幻。Insilico Medicine 的 Alex Zhavoronkov 联合礼来公司的 Jiye Shi，近期在<strong>ACS Central Science</strong>上发表了一篇展望文章，系统梳理了 AI 在药物发现中的演进历程，并提出了一个极具前瞻性的愿景——<strong>Prompt-to-Drug</strong>，即以一段自然语言描述为起点，由 AI 自主完成从靶点发现、分子设计、合成验证到临床试验规划的全流程闭环。他们将这一终极目标称为<em>药物超级智能</em>（Pharmaceutical Superintelligence, PSI）。</p>\n<hr />\n<h2>从机器学习到生成式 AI：药物发现中 AI 能力的三次跃迁</h2>\n<p>AI 在药物发现中的应用并非新鲜事。文章回顾了过去十余年间的三次关键跃迁，每一次都将 AI 的触角延伸到了药物研发流程的更深处。</p>\n<p>第一次是<strong>传统机器学习</strong>阶段。支持向量机、随机森林等算法被广泛用于虚拟筛选、药物-靶点相互作用预测和药效团识别等分类任务。这些方法对噪声数据鲁棒、可解释性强，但本质上停留在<em>模式匹配</em>层面，难以捕捉复杂的非线性关系。</p>\n<p>第二次是<strong>深度学习</strong>革命。GPU 并行计算的飞速发展（其速度甚至超越了摩尔定律）使得分子动力学模拟、对接模拟和结构-活性关系研究成为可能。深度神经网络在高维多组学数据中展现出优于传统方法的预测能力，被用于筛选具有抗菌活性的多肽和预测化合物结合亲和力。</p>\n<p>第三次则是<strong>生成式 AI</strong>的爆发。变分自编码器（VAE）、生成对抗网络（GAN）和 Transformer 架构的先后出现，赋予了 AI 真正的<em>创造</em>能力——不再只是从已有化合物中筛选，而是从头设计全新分子。Insilico Medicine 开发的<strong>GENTRL</strong>模型是一个标志性案例：该模型仅用 21 天就发现了针对 DDR1 激酶的高活性、高选择性抑制剂，随后在 27 天内完成了合成与验证。此后，他们又在 30 天内完成了一个 CDK20 抑制剂的发现。</p>\n<p>AI 在生物技术领域的演进。过去十余年间，AI 算法与架构的发展将 AI 工具的应用范围从组学分析扩展到分子设计与药物化学，再进一步延伸至临床实践与临床试验设计。由先进推理算法驱动的科学发现和药物开发过程自动化，推动了更高通量和跨学科工作流的实现。</p>\n<p>随后，大语言模型（LLM）作为基础模型登场。<strong>BioGPT</strong>、<strong>PandaOmics</strong>等平台能够从海量文献、专利和基金数据中挖掘生物网络与治疗靶点；<strong>cMolGPT</strong>、<strong>DrugGPT</strong>等基于 GPT 架构的生成化学模型则可以直接生成新型药物分子结构。然而，文章也坦率指出了 LLM 在端到端分子发现任务中的固有局限：基于模式识别的生成机制缺乏对生化原理的深层理解，SMILES/SELFIES 的分词方式会丢失立体化学等关键信息，且模型难以探索训练集之外的化学空间。</p>\n<hr />\n<h2>端到端管线的真正瓶颈：不是单点工具，而是系统集成</h2>\n<p>文章提出了一个颇具洞察力的观点：当前 AI 药物发现的核心瓶颈不在于缺乏优秀的单点工具，而在于这些工具之间的<em>割裂</em>与<em>不互通</em>。</p>\n<p>在传统药物研发流程中，靶点发现、分子设计、生物验证和临床开发等阶段由不同团队负责、使用不同平台，产生不同格式的数据。这种拼凑式的工作流导致了大量的切换成本、信息损耗和协调延迟。文章用两个具体例子加以说明：在小分子苗头化合物拓展（hit expansion）过程中，一位科学家需要在化学信息学软件、计算化学工具、采购系统、生成式 AI 工具、逆合成规划软件和检测数据分析工具之间来回切换，而单个科学家往往并不掌握所有这些工具的使用方法；在样品注册与追踪方面，不同治疗模态（小分子、生物制品、RNA 等）分散在不同的 LIMS 系统中，形成了数据孤岛。</p>\n<p>作者认为，真正的变革将来自于把这些分散的子系统连接成一个<strong>有向系统之系统</strong>（directed system-of-systems），由中央控制器统一编排各个独立运行的组件系统。这种<em>智能系统之系统</em>架构能够同时分析过程输出、评估故障与异常、整合新的子系统资源、预测失败点，并管理数据组织和安全功能。</p>\n<hr />\n<h2>高级推理与多智能体：从工具调用到自主研究</h2>\n<p>文章用相当篇幅讨论了 LLM 高级推理能力和多智能体系统在推动端到端药物发现中的关键角色。</p>\n<p>当代 LLM 正在超越表层的 token 模式识别，展现出逻辑推理、规划、多步问题求解和因果推理等更深层的认知能力。<strong>DrugPilot</strong>是一个基于 LLM 的 AI 智能体框架，能够自主支持完整的药物发现管线，整合多模态数据并高效协调工具使用；<strong>AgentD</strong>则能自主检索生物医学数据库、生成药物分子结构、预测性质、迭代优化类药性，并预测三维蛋白-配体构象。</p>\n<p>更引人注目的是那些已经实现了<em>实验闭环</em>的系统。<strong>ChemAgents</strong>使用基于 LLM 的多智能体架构，能够依序完成文献检索、实验设计、机器人执行实验操作和计算分析结果的全流程——输入仅需一段自然语言提示。<strong>Synbot</strong>则可以规划并执行用户提供的化合物结构的逆合成和机器人合成。<strong>ChemCrow</strong>和<strong>Coscientist</strong>这类具备类 RAG 能力的平台，甚至可以接受类似<em>规划并执行一种驱虫剂的合成</em>这样的自然语言指令，利用实验室设备合成目标化合物。</p>\n<p>药物发现工作流中对物理实验系统和计算建模系统的任务特异性控制。高级推理 AI 模型作为中央编排器，基于数据读出和同步评估，持续监控和微调各个子系统。每个子系统通过 API 与中央编排模型交互，传统的生物学和化学实验系统（如药物筛选平台）作为与预测性计算建模同等重要的模块被统一管理。</p>\n<p>在假说生成与科学发现层面，<strong>DORA</strong>和 Google 的<strong>Co-Scientist</strong>等 AI 科学家助手的出现进一步拓展了 AI 的能力边界。这些多智能体研究平台能够扫描已发表的研究论文、组学数据集和生物医学数据库，提出新的假说和研究工作流。早期应用案例已经包括：重新定位表观遗传修饰药物治疗纤维化、整合组学数据指导精准医学研究，甚至为天体生物学的质谱数据集规划实验工作流。</p>\n<hr />\n<h2>Prompt-to-Drug：从愿景到工作流</h2>\n<p>文章的核心贡献之一是提出了一个完整的 Prompt-to-Drug 概念工作流。设想一个场景：用户输入<em>为特发性肺纤维化（IPF）设计一种药物</em>，系统随即启动一整套自主研发流程。</p>\n<p>在这个工作流中，一个高级推理 AI 模型充当<em>总导演</em>。它首先整合公开数据与私有数据，结合已发表文献，生成一份研究计划，并派出多组 AI 智能体分头行动。<strong>生物学智能体</strong>操控自动化实验室，从文献综合和体外实验验证模型中筛选疾病相关靶点；<strong>化学智能体</strong>调用生成化学平台设计靶向药物分子，遵循传统的先导化合物优化流程，利用对接模型、合成可及性评分和 ADMET 预测算法进行优先级排序；生物学洞见和临床前测试数据则指导后续的临床试验设计，由<strong>PROCTOR</strong>、<strong>InClinico</strong>和<strong>HINT</strong>等临床预测模型前瞻性地识别最可能获得成功的患者群体和试验方案。</p>\n<p>研究者最小介入下的自主药物发现理论优化工作流。中央高级推理模型规划并执行由全自动体外和计算建模驱动的靶点发现、分子发现和化学分析组成的研究计划。候选药物分子和支持性临床前数据为临床试验设计提供依据。临床试验读出和上市后证据持续反馈至竞争分析模块，进而优化高级推理模型和后续研究计划。</p>\n<p>值得一提的是，作者特别强调了<strong>混合方法</strong>的必要性。纯粹依赖 LLM 的 SMILES/SELFIES 编码是不够的，下一代模型需要将三维分子图、电子密度图和实验检测数据整合到统一的潜空间中进行多模态基础模型训练。在 Insilico Medicine 开发新型<strong>TNIK 抑制剂 rentosertib</strong>的实际案例中，其<strong>Chemistry42</strong>平台正是结合了多种二维和三维结构模型来识别最有前景的先导分子。rentosertib 已完成二期临床试验，证明了 AI 工具确实能够识别具有生物学依据的疾病靶点并设计出安全有效的药物分子。</p>\n<p>文章还提出了一个颇具想象力的概念——<strong>仿人机器人参与闭环</strong>（humanoid-in-the-loop）。由于仿人机器人天然适配为人类科学家设计的传统实验设备和工作空间，它们可以作为中央推理 AI 调度的一个智能体，以不间断轮班的方式执行高技术含量的生物和化学实验操作，最大限度地减少步骤间的停机时间。Insilico Medicine 已经在其自主临床前实验室设施中开发此类工作流，并在抗衰老/抗衰老治疗学研究中取得了初步成果。</p>\n<hr />\n<h2>现实的边界与清醒的认知</h2>\n<p>尽管愿景宏大，文章并未回避当前技术的局限性。</p>\n<p><strong>幻觉</strong>问题首当其冲。LLM 生成的生物医学内容中存在较高的幻觉率——无论是生成化学结构的文本描述、提出阿尔茨海默症的候选药物，还是预测靶点拓扑表面积、解读组学数据或识别疾病相关基因，都有大量不准确输出的报告。在 Insilico Medicine 自身的实践中，也观察到生成模型提出合成上不可行或与已知构效关系不符的分子骨架的情况，需要人工干预和专家过滤。</p>\n<p><strong>级联错误</strong>是另一个关键挑战。在多智能体系统中，早期模块（如靶点口袋和活性预测）中的不准确性可能逐级传播到下游的分子生成、合成规划和临床试验模拟中。即使是 AlphaFold2 这样的金标准工具，也不能在所有情况下都提供准确预测，当早期步骤涉及基于结构的分子拟合和对接模拟时，这类失败链条可能严重复合。文章建议通过智能体间投票验证、置信度传播、实时回溯与任务重启，以及关键节点的人类介入等策略来管理这一风险。</p>\n<p>此外，模型输出的<strong>可解释性和可追溯性</strong>仍然是悬而未决的问题。与传统 QSAR 或基于规则的系统不同，LLM 常常作为黑箱运行，这在监管层面——尤其是作用机制预测、患者分层和临床试验规划等法律要求可解释性的场景——构成了实质性障碍。</p>\n<hr />\n<h2>面向未来的路线图</h2>\n<p>文章最后提出了几项建议。首先，面向未来的 AI 药物发现需要<strong>多模态、项目特异性</strong>的模型——训练数据既要足够广泛又要足够深入，且需根据具体药物开发项目进行针对性过滤。其次，尽管自主执行是长期目标，<strong>人类监督和问责</strong>在当前科学、法律和监管条件下不可或缺——所有输出都应附带机器可读的完整决策记录，系统需内置人类审查、暂停和否决 AI 决策的机制。第三，这一愿景的实现不可能由任何单一实体完成，需要学术界、生物技术公司和监管机构的<strong>全行业协作</strong>——研究团队应在每个阶段发表成果，将自动化闭环子系统视为标准实验设备，并从一开始就设计 API 接口以便中央编排 AI 访问和调度。</p>\n<p>从 GENTRL 在 21 天内发现 DDR1 抑制剂，到 rentosertib 完成二期临床试验，Insilico Medicine 的实践已经在逐步验证 AI 驱动药物发现的可行性。而从单点工具到系统集成、从辅助决策到自主执行的演进路径，也正在变得越来越清晰。Prompt-to-Drug 或许不会在短期内完全实现，但它所指向的方向——一个由 AI 作为共同科学家驱动创新、改善患者结局、变革药物开发方式的未来——已经在路上了。</p>\n<hr />\n<p><strong>参考文献</strong>：Zhavoronkov, A.; Gennert, D.; Shi, J. From Prompt to Drug: Toward Pharmaceutical Superintelligence.<em>ACS Cent. Sci.</em>2026. DOI: 10.1021/acscentsci.5c01473</p>\n<hr />"
    }
  ],
  "latest_overview": [
    {
      "title": "",
      "body_html": "<h1>AI驱动药物发现的发展趋势与挑战 — Transformer            vs Diffusion</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2048131310443573289\">https://zhuanlan.zhihu.com/p/2048131310443573289</a></li>\n<li>作者: 费米子父</li>\n</ul>\n<hr />\n<p>AI驱动药物发现的发展趋势与挑战 — Transformer vs Diffusion</p>\n<h1>AI驱动药物发现的发展趋势与挑战 — Transformer vs Diffusion</h1>\n<p>作者: 费米子父, 赞: 7</p>\n<h2>Transformer还是Diffusion？为什么AI至今无法生成真正能用的先导化合物</h2>\n<blockquote>\n<p>AI分子生成领域最火的两大架构，各自吹得天花乱坠，但药企的湿实验台上依然一地鸡毛。问题到底出在哪？</p>\n</blockquote>\n<hr />\n<h3>先说结论</h3>\n<p><strong>Transformer和Diffusion在分子生成上各有所长，但都没解决一个根本问题：生成的分子合成不出来。</strong></p>\n<p>截至2025年，没有任何一个完全由AI从头设计的药物分子完成临床审批。不是模型不够强，而是从”计算上好看”到”实验室能做”之间，横着一条巨大的鸿沟。</p>\n<hr />\n<h3>两大架构，到底在争什么？</h3>\n<h3>Transformer派：快，但是”平面”</h3>\n<p>Transformer做分子生成的逻辑很直接——把分子当成SMILES字符串，像写句子一样一个token一个token地生成。</p>\n<p><strong>优势明显：</strong></p>\n<ul>\n<li>速度碾压级。侯廷军课题组的Token-Mol（Nature Communications, 2025）实测比扩散模型<strong>快35倍</strong>，每个分子只要~0.45秒</li>\n<li>SMILES语法天然约束化学有效性，生成的分子大多是”合法”的</li>\n<li>条件控制灵活，多约束、多目标都能塞进去</li>\n<li>LLM的预训练范式可以直接迁移，站在了大模型的肩膀上</li>\n</ul>\n<p><strong>但问题也很明显：</strong></p>\n<ul>\n<li>SMILES本质是1D字符串，同一个分子可以写出几十种不同的SMILES，模型学起来会”困惑”</li>\n<li>3D空间信息需要额外工程才能编码进去（侯组的3DSMILES-GPT就是为了解决这个）</li>\n<li>生成多样性受训练数据分布限制——你喂什么化学空间，它就吐什么化学空间</li>\n</ul>\n<h3>Diffusion派：3D原生，但是慢</h3>\n<p>Diffusion模型从图像生成迁移过来，天然擅长处理3D坐标。给定一个蛋白口袋，直接在三维空间里”长出”配体分子。</p>\n<p><strong>优势同样明显：</strong></p>\n<ul>\n<li>3D结构建模是原生能力，不需要额外编码</li>\n<li>口袋感知设计，生成的分子天然适配靶点形状</li>\n<li>随机去噪过程带来多样性</li>\n</ul>\n<p><strong>但代价呢？</strong></p>\n<ul>\n<li>慢。需要几十上百步迭代去噪，一个分子要十几秒</li>\n<li><strong>生成的3D构型有效 ≠ 这个分子能合成出来</strong>。这是最致命的</li>\n<li>E(3)等变网络对手性不敏感——在药物化学里，手性可以决定一个分子是药还是毒</li>\n<li>不适合处理SMILES序列，噪声会直接破坏结构化语法</li>\n</ul>\n<hr />\n<h3>核心矛盾：计算指标漂亮 ≠ 能用的先导化合物</h3>\n<p>来，我们数一数现有模型交不了的作业：</p>\n<h3>1. 合成可行性鸿沟（The Synthesizability Gap）</h3>\n<p>这是<strong>最大的问题</strong>，没有之一。</p>\n<p>模型生成了一个QED 0.9、SA Score 3.5的分子，所有计算指标都很好看。然后你把它发给合成化学家，得到的回复大概率是：”这东西怎么做？”</p>\n<p>SA Score只是一个粗略估计，不是合成保证。真实的合成成功率极低（据报道%）。逆合成路径验证在大多数生成模型中完全缺失。</p>\n<p><strong>你可以用AI画出一栋漂亮的房子，但如果现有的建筑材料和工艺做不出来，那就只是一张画。</strong></p>\n<h3>2. 多目标优化瓶颈</h3>\n<p>一个真正的药物需要同时满足：结合活性、选择性、溶解度、代谢稳定性、hERG毒性、口服生物利用度、合成可行性……至少8-10个指标。</p>\n<p>大多数现有算法有效处理的目标数 ≤ 4个。侯组的PMMG（Advanced Science, 2025）用帕累托蒙特卡洛搜索把这个数字推到了7个，成功率51.65%，已经是SOTA的2.5倍。但距离真正的药物设计需求，还有距离。</p>\n<h3>3. 评价指标失真</h3>\n<p>QED和SA Score跟实验结果的相关性，远没有我们以为的那么高。对接打分函数的精度也不够。更要命的是——计算生成分子的速度，远远快于实验验证的速度。模型一天能生成10万个分子，但合成+测试一个分子可能要几周。</p>\n<h3>4. 数据层面的”原罪”</h3>\n<p>公共数据集就那么大。ChEMBL、ZINC翻来覆去用，模型学到的本质上是<strong>已知化学空间的插值</strong>，而不是真正的外推。活性悬崖（activity cliff）现象——微小结构变化导致活性断崖式下降——现有模型几乎无法学习。</p>\n<hr />\n<h3>前沿在做什么？</h3>\n<h3>侯廷军课题组的”Token统一”路线</h3>\n<p>浙江大学侯廷军教授课题组（380+ SCI论文，H-index 64）近年来的工作代表了一个重要趋势：<strong>用Transformer的效率来处理3D信息</strong>。</p>\n<ul>\n<li><strong>Token-Mol 1.0</strong>（Nature Communications, 2025）：把2D结构、3D坐标、分子物性全部编码为离散token，一个模型覆盖生成+预测+构象，比扩散模型快35倍</li>\n<li><strong>3DSMILES-GPT</strong>（Chemical Science, 2025）：纯语言模型驱动3D生成，0.45s一个分子</li>\n<li><strong>PMMG</strong>（Advanced Science, 2025）：帕累托前沿搜索，7个目标同时优化</li>\n</ul>\n<p>这个思路的精髓在于：<strong>不跟Diffusion比3D建模，而是把3D信息token化后用Transformer的方式高效处理</strong>。鱼和熊掌，都要。</p>\n<h3>Ouroboros的”编码空间优化”路线</h3>\n<p>另一个有意思的工作是Ouroboros（Advanced Science, 2026），思路不太一样：</p>\n<ul>\n<li>先用GNN把分子编码成1D向量</li>\n<li>在编码空间里直接做gradient优化</li>\n<li>再用Transformer解码回分子结构</li>\n</ul>\n<p>相当于把”表征学习”和”生成”解耦了。你可以在连续的编码空间里自由操作——方向性优化、分子间插值、多靶点融合——然后再”翻译”回化学语言。</p>\n<h3>合成感知生成（Synthesis-Aware Generation）</h3>\n<p>这可能是当前最迫切的研究方向。核心思想：<strong>在生成阶段就把合成路径作为硬约束</strong>。</p>\n<p>不是先生成分子再检查能不能合成，而是只生成”用已知反应模板能组装出来”的分子。SynCoGen等工作已经在探索这个方向。</p>\n<hr />\n<h3>所以我们该怎么办？</h3>\n<p>说实话，纯靠计算端的突破，短期内很难彻底解决先导化合物生成的问题。更现实的路径是：</p>\n<ol>\n<li><strong>建立闭环</strong>：AI生成 → 合成 → 实验测试 → 反馈 → 模型迭代。让实验数据驱动模型进化，而不是在计算指标里自嗨</li>\n<li><strong>合成可行性前置</strong>：在生成模型里嵌入逆合成约束，或者基于可合成片段进行组装式生成</li>\n<li><strong>多目标帕累托优化</strong>：药物设计本质上是多目标的，不能简单加权求和</li>\n<li><strong>工具链集成</strong>：把生成、ADMET预测（如ADMETlab 3.0）、对接打分、合成评估串成一条流水线，每一步都做过滤</li>\n</ol>\n<p><strong>AI分子生成不缺漂亮的paper，缺的是能走进湿实验室的分子。</strong></p>\n<p>这条路还很长，但方向已经越来越清晰了。</p>\n<hr />\n<p><em>参考文献：</em></p>\n<p><em>[1] Wang et al. Token-Mol 1.0. Nature Communications, 2025, 16, 4416</em> <em>[2] Wang et al. 3DSMILES-GPT. Chemical Science, 2025, 16, 637-648</em> <em>[3] Liu et al. PMMG. Advanced Science, 2025, 12, 2410640</em> <em>[4] Zhang et al. GNN in AI-Aided Drug Discovery. Chemical Reviews, 2025, 125(20), 10001</em> <em>[5] Wang et al. Ouroboros. Advanced Science, 2026. DOI: 10.1002/advs.202513556</em> <em>[6] ADMETlab 3.0. Nucleic Acids Research, 2024, W1, W422</em></p>\n<hr />\n<p><em>作者注：本文部分观点基于侯廷军课题组（浙江大学药学院CADD实验室）近年来的系列工作。利益相关声明——笔者与侯组无直接利益关系，纯粹觉得他们的工作思路值得讨论。</em></p>\n<p>https://wx.zsxq.com/mweb/views/topicdetail/topicdetail.html?topic_id=82255281482811542&amp;inviter_id=118825218181542&amp;inviter_sid=94v52wn0k1 (二维码自动识别)</p>"
    }
  ],
  "graph": {
    "nodes": [
      {
        "id": "reinvent",
        "x": 2017,
        "y": 0,
        "category": "generation"
      },
      {
        "id": "chemical_vae",
        "x": 2018,
        "y": 0,
        "category": "generation"
      },
      {
        "id": "jt_vae",
        "x": 2018.3,
        "y": 0,
        "category": "generation"
      },
      {
        "id": "molgan",
        "x": 2018.5,
        "y": 0,
        "category": "generation"
      },
      {
        "id": "selfies",
        "x": 2020,
        "y": 0,
        "category": "generation"
      },
      {
        "id": "molgpt",
        "x": 2021,
        "y": 1,
        "category": "generation"
      },
      {
        "id": "chemgpt",
        "x": 2022,
        "y": 1,
        "category": "generation"
      },
      {
        "id": "gp_molformer",
        "x": 2025,
        "y": 1,
        "category": "generation"
      },
      {
        "id": "mist",
        "x": 2026,
        "y": 1,
        "category": "generation"
      },
      {
        "id": "e3_edm",
        "x": 2022,
        "y": 2,
        "category": "generation"
      },
      {
        "id": "diffsbdd",
        "x": 2022.5,
        "y": 2,
        "category": "generation"
      },
      {
        "id": "targetdiff",
        "x": 2023,
        "y": 2,
        "category": "generation"
      },
      {
        "id": "pocket2mol",
        "x": 2022.3,
        "y": 2,
        "category": "generation"
      },
      {
        "id": "rfdiffusion3",
        "x": 2025.7,
        "y": 2,
        "category": "generation"
      },
      {
        "id": "apo2mol",
        "x": 2026,
        "y": 2,
        "category": "generation"
      },
      {
        "id": "genie3",
        "x": 2026.4,
        "y": 2,
        "category": "generation"
      },
      {
        "id": "megalodon",
        "x": 2026.2,
        "y": 2,
        "category": "generation"
      },
      {
        "id": "cocograph",
        "x": 2026.4,
        "y": 2.5,
        "category": "generation"
      },
      {
        "id": "propmolflow",
        "x": 2026.3,
        "y": 2,
        "category": "generation"
      },
      {
        "id": "proteina_complexa",
        "x": 2026.3,
        "y": 2.3,
        "category": "generation"
      },
      {
        "id": "ecfp",
        "x": 2010,
        "y": 3,
        "category": "screening"
      },
      {
        "id": "autodock",
        "x": 1990,
        "y": 3,
        "category": "screening"
      },
      {
        "id": "deepdta",
        "x": 2018,
        "y": 3,
        "category": "screening"
      },
      {
        "id": "graphdta",
        "x": 2019,
        "y": 3,
        "category": "screening"
      },
      {
        "id": "attentivefp",
        "x": 2020,
        "y": 3,
        "category": "screening"
      },
      {
        "id": "drugclip",
        "x": 2023,
        "y": 3,
        "category": "screening"
      },
      {
        "id": "drughash",
        "x": 2025,
        "y": 3,
        "category": "screening"
      },
      {
        "id": "s2drug",
        "x": 2026,
        "y": 3,
        "category": "screening"
      },
      {
        "id": "bindclip",
        "x": 2026.2,
        "y": 3,
        "category": "screening"
      },
      {
        "id": "cadg_dta",
        "x": 2026.1,
        "y": 3.3,
        "category": "screening"
      },
      {
        "id": "qsar",
        "x": 1965,
        "y": 4,
        "category": "admet"
      },
      {
        "id": "admetlab",
        "x": 2025,
        "y": 4,
        "category": "admet"
      },
      {
        "id": "helixadmet",
        "x": 2025.5,
        "y": 4,
        "category": "admet"
      },
      {
        "id": "molbert",
        "x": 2020,
        "y": 5,
        "category": "foundation"
      },
      {
        "id": "chemberta",
        "x": 2021,
        "y": 5,
        "category": "foundation"
      },
      {
        "id": "unimol",
        "x": 2023,
        "y": 5,
        "category": "foundation"
      },
      {
        "id": "chemberta3",
        "x": 2026,
        "y": 5,
        "category": "foundation"
      },
      {
        "id": "moldeberta",
        "x": 2026.2,
        "y": 5,
        "category": "foundation"
      },
      {
        "id": "boltz2",
        "x": 2025.5,
        "y": 5,
        "category": "foundation"
      },
      {
        "id": "alphafold2",
        "x": 2021,
        "y": 6,
        "category": "design"
      },
      {
        "id": "alphafold3",
        "x": 2024,
        "y": 6,
        "category": "design"
      },
      {
        "id": "yueldesign",
        "x": 2025.4,
        "y": 6,
        "category": "design"
      }
    ],
    "edges": [
      {
        "from": "reinvent",
        "to": "molgpt",
        "label": "GPT架构"
      },
      {
        "from": "molgpt",
        "to": "chemgpt",
        "label": "大规模预训"
      },
      {
        "from": "chemgpt",
        "to": "gp_molformer",
        "label": "11亿参数"
      },
      {
        "from": "gp_molformer",
        "to": "mist",
        "label": "18亿参数"
      },
      {
        "from": "chemical_vae",
        "to": "jt_vae",
        "label": "连接树分解"
      },
      {
        "from": "chemical_vae",
        "to": "selfies",
        "label": "100%有效"
      },
      {
        "from": "e3_edm",
        "to": "diffsbdd",
        "label": "口袋条件"
      },
      {
        "from": "diffsbdd",
        "to": "targetdiff",
        "label": "几何约束"
      },
      {
        "from": "e3_edm",
        "to": "pocket2mol",
        "label": "自回归"
      },
      {
        "from": "targetdiff",
        "to": "rfdiffusion3",
        "label": "全聚合物"
      },
      {
        "from": "targetdiff",
        "to": "apo2mol",
        "label": "动态口袋"
      },
      {
        "from": "rfdiffusion3",
        "to": "genie3",
        "label": "全原子"
      },
      {
        "from": "diffsbdd",
        "to": "megalodon",
        "label": "混合去噪"
      },
      {
        "from": "targetdiff",
        "to": "propmolflow",
        "label": "性质引导"
      },
      {
        "from": "rfdiffusion3",
        "to": "proteina_complexa",
        "label": "推理搜索"
      },
      {
        "from": "deepdta",
        "to": "graphdta",
        "label": "GNN表征"
      },
      {
        "from": "graphdta",
        "to": "attentivefp",
        "label": "注意力"
      },
      {
        "from": "attentivefp",
        "to": "drugclip",
        "label": "对比学习"
      },
      {
        "from": "drugclip",
        "to": "drughash",
        "label": "哈希加速"
      },
      {
        "from": "drugclip",
        "to": "s2drug",
        "label": "双模态"
      },
      {
        "from": "drugclip",
        "to": "bindclip",
        "label": "统一框架"
      },
      {
        "from": "graphdta",
        "to": "cadg_dta",
        "label": "交叉注意力"
      },
      {
        "from": "qsar",
        "to": "admetlab",
        "label": "深度学习"
      },
      {
        "from": "admetlab",
        "to": "helixadmet",
        "label": "自监督"
      },
      {
        "from": "molbert",
        "to": "chemberta",
        "label": "BERT架构"
      },
      {
        "from": "chemberta",
        "to": "chemberta3",
        "label": "开源框架"
      },
      {
        "from": "molbert",
        "to": "moldeberta",
        "label": "BPE编码"
      },
      {
        "from": "unimol",
        "to": "boltz2",
        "label": "协同折叠"
      },
      {
        "from": "alphafold2",
        "to": "alphafold3",
        "label": "复合物"
      },
      {
        "from": "alphafold3",
        "to": "yueldesign",
        "label": "柔性口袋"
      }
    ],
    "milestones": [
      "jt_vae",
      "alphafold2",
      "drugclip"
    ]
  },
  "algos": [
    {
      "id": "reinvent",
      "num": 1,
      "name": "REINVENT",
      "fullName": "强化学习分子生成 (REINVENT)",
      "year": "2017",
      "org": "AstraZeneca",
      "parent": "—",
      "paperUrl": "https://jcheminf.biomedcentral.com/articles/10.1186/s13321-017-0235-x",
      "projectUrl": "",
      "category": "generation",
      "motivation": "RNN结合强化学习优化分子性质",
      "summary": "REINVENT 的核心目标是：RNN结合强化学习优化分子性质。",
      "keyPoints": [
        "核心动机：RNN结合强化学习优化分子性质",
        "代表机构：AstraZeneca"
      ],
      "detail": "<p>RNN结合强化学习优化分子性质</p>"
    },
    {
      "id": "chemical_vae",
      "num": 2,
      "name": "Chemical VAE",
      "fullName": "化学变分自编码器 (Chemical VAE)",
      "year": "2018",
      "org": "Harvard",
      "parent": "—",
      "paperUrl": "https://pubs.acs.org/doi/10.1021/acscentsci.7b00572",
      "projectUrl": "",
      "category": "generation",
      "motivation": "首个将SMILES映射到连续潜空间的VAE",
      "summary": "Chemical VAE 提出将离散的分子 SMILES 字符串通过变分自编码器映射到连续潜在空间，并联合训练性质预测网络，使得可以在潜在空间中利用贝叶斯优化等方法高效搜索具有目标性质的新分子，开创了数据驱动的自动化学设计范式。",
      "keyPoints": [
        "<strong>端到端 VAE 架构</strong>：编码器（1D 卷积 + 全连接）将 SMILES 字符串编码为连续潜在向量，解码器（GRU）从潜在向量重建 SMILES",
        "<strong>联合性质预测</strong>：在潜在空间上附加 MLP 性质预测器，与 VAE 同时训练，使潜在空间对分子性质具有可微分的梯度信号",
        "<strong>三部分联合损失函数</strong>：重建损失 + KL 散度正则化 + 性质预测损失，权重可调",
        "<strong>两大基准数据集</strong>：QM9（~108K 小分子，最多 9 个重原子）和 ZINC（~250K 类药分子，最多 38 个重原子）",
        "<strong>连续空间分子优化</strong>：在潜在空间中执行贝叶斯优化（稀疏高斯过程），针对 logP、QED、SAS 等药物相关性质搜索最优分子",
        "<strong>平滑插值与邻域搜索</strong>：潜在空间中两个分子之间的线性插值可产生语义平滑的分子过渡序列",
        "<strong>与遗传算法对比</strong>：在 logP 优化任务中，Chemical VAE + 贝叶斯优化显著优于基于 SMILES 的遗传算法"
      ],
      "detail": "<h5>模型架构总览</h5>\n<p><img alt=\"Chemical VAE 架构示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1610.02415/assets/x1.png\" />\n<em>图：Chemical VAE 的整体架构。左侧编码器将 SMILES 字符串编码为潜在向量 <span class=\"kb-math kb-math-inline\">z</span>，右侧解码器从 <span class=\"kb-math kb-math-inline\">z</span> 重建 SMILES，上方性质预测网络从 <span class=\"kb-math kb-math-inline\">z</span> 预测分子性质。联合训练使潜在空间同时具备重建能力和性质预测能力。</em></p>\n<h5>算法核心流程</h5>\n<pre><code class=\"language-python\"># Chemical VAE 联合训练伪代码\nfor epoch in range(num_epochs):\n    for batch_smiles, batch_properties in dataloader:\n        # 1. 编码：SMILES → one-hot → 潜在分布参数\n        x = one_hot_encode(batch_smiles)        # (B, max_len, charset_size)\n        mu, log_sigma = encoder(x)               # 各为 (B, latent_dim)\n\n        # 2. 重参数化采样\n        epsilon = torch.randn_like(mu)\n        z = mu + torch.exp(log_sigma) * epsilon   # (B, latent_dim)\n\n        # 3. 解码：潜在向量 → SMILES\n        x_recon = decoder(z)                      # (B, max_len, charset_size)\n\n        # 4. 性质预测\n        y_pred = property_predictor(z)             # (B, num_properties)\n\n        # 5. 计算联合损失\n        L_recon = cross_entropy(x_recon, x)\n        L_KL = -0.5 * sum(1 + log_sigma**2 - mu**2 - exp(log_sigma**2))\n        L_prop = mse_loss(y_pred, batch_properties)\n\n        loss = L_recon + L_KL + alpha * L_prop\n\n        optimizer.zero_grad()\n        loss.backward()\n        optimizer.step()\n\n# 贝叶斯优化搜索最优分子\ngp_model = SparseGaussianProcess(latent_dim)\ngp_model.fit(z_train, y_train)\nfor step in range(opt_steps):\n    z_next = maximize_expected_improvement(gp_model)\n    smiles_next = decoder.decode(z_next)\n    y_next = evaluate(smiles_next)\n    gp_model.update(z_next, y_next)\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统分子设计主要依赖专家经验和高通量虚拟筛选，即在已知分子库中逐一评估候选分子。这种方法存在两个根本性缺陷：</p>\n<ol>\n<li><strong>离散搜索空间</strong>：分子以 SMILES 字符串等离散符号表示，无法直接应用基于梯度的连续优化方法。化学空间的组合爆炸（估计可合成的类药分子数量达 <span class=\"kb-math kb-math-inline\">10^{60}</span>）使得穷举搜索不可行。</li>\n<li><strong>缺乏结构化表示</strong>：SMILES 字符串中一个字符的微小改变可能导致完全不同甚至无效的分子，缺乏\"相似输入→相似输出\"的平滑性。</li>\n</ol>\n<div class=\"key-point\">💡 <strong>核心洞察</strong>：如果能将离散分子映射到连续向量空间，且该空间对分子性质具有平滑性，就可以利用强大的连续优化工具（梯度下降、贝叶斯优化等）来高效搜索目标分子。</div>\n<h5>编码器设计</h5>\n<p>编码器将 SMILES 字符串转换为潜在空间中的概率分布参数。具体流程：</p>\n<ol>\n<li>\n<p><strong>输入表示</strong>：SMILES 字符串被转换为 one-hot 编码矩阵 <span class=\"kb-math kb-math-inline\">X \\in \\{0,1\\}^{L \\times C}</span>，其中 <span class=\"kb-math kb-math-inline\">L</span> 为最大序列长度（QM9: 120, ZINC: 120），<span class=\"kb-math kb-math-inline\">C</span> 为字符集大小（QM9: 35, ZINC: 35）。</p>\n</li>\n<li>\n<p><strong>卷积特征提取</strong>：使用三层 1D 卷积网络提取局部模式：</p>\n</li>\n<li>第一层：9 个核，宽度 9，ReLU 激活</li>\n<li>第二层：9 个核，宽度 9，ReLU 激活  </li>\n<li>\n<p>第三层：10 个核，宽度 11，ReLU 激活</p>\n</li>\n<li>\n<p><strong>全连接映射</strong>：卷积输出展平后通过全连接层映射为潜在分布的均值 <span class=\"kb-math kb-math-inline\">\\mu</span> 和对数方差 <span class=\"kb-math kb-math-inline\">\\log \\sigma^2</span>：</p>\n</li>\n</ol>\n<div class=\"kb-math kb-math-display\">q_\\phi(z|x) = \\mathcal{N}(z; \\mu_\\phi(x), \\sigma^2_\\phi(x) \\cdot I)</div>\n<p>潜在空间维度为 QM9 数据集 56 维，ZINC 数据集 196 维。</p>\n<h5>解码器设计</h5>\n<p>解码器采用三层堆叠 GRU（Gated Recurrent Unit）网络，将潜在向量 <span class=\"kb-math kb-math-inline\">z</span> 逐字符地重建 SMILES 字符串：</p>\n<ol>\n<li>潜在向量 <span class=\"kb-math kb-math-inline\">z</span> 首先通过全连接层映射为 GRU 的初始隐状态</li>\n<li>GRU 在每个时间步输出字符概率分布，通过 softmax 层选择下一个字符</li>\n<li>训练时使用 teacher forcing（输入真实前缀），推理时使用自回归生成</li>\n</ol>\n<p>每层 GRU 隐状态维度为 501。解码器的关键挑战在于 SMILES 语法的脆弱性——括号、环编号等必须严格匹配，单个字符错误即导致无效分子。</p>\n<h5>性质预测网络</h5>\n<p>性质预测器是一个从潜在向量 <span class=\"kb-math kb-math-inline\">z</span> 到分子性质的多层感知机（MLP）：</p>\n<div class=\"kb-math kb-math-display\">\\hat{y} = f_\\theta(z)</div>\n<p>包含两个全连接隐藏层（各 100 个神经元），使用 ReLU 激活和 batch normalization。预测的性质包括：\n- <strong>logP</strong>：辛醇-水分配系数（亲脂性指标）\n- <strong>QED</strong>：药物相似性定量估计\n- <strong>SAS</strong>：合成可及性评分</p>\n<div class=\"warn-box\">⚠️ <strong>关键设计</strong>：性质预测器的梯度信号会反向传播到编码器，迫使潜在空间组织为性质相关的平滑流形。这是实现后续贝叶斯优化的基础——如果潜在空间对性质不平滑，优化将无法有效进行。</div>\n<h5>联合训练目标</h5>\n<p>Chemical VAE 的总损失函数由三部分组成：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\mathcal{L}_{\\text{recon}} + \\mathcal{L}_{\\text{KL}} + \\alpha \\cdot \\mathcal{L}_{\\text{prop}}</div>\n<p>其中：</p>\n<p><strong>重建损失</strong>（逐字符交叉熵）：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{recon}} = -\\sum_{t=1}^{L} \\sum_{c=1}^{C} x_{t,c} \\log \\hat{x}_{t,c}</div>\n<p><strong>KL 散度</strong>（正则化潜在空间为标准正态分布）：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{KL}} = -\\frac{1}{2} \\sum_{j=1}^{d} \\left(1 + \\log \\sigma_j^2 - \\mu_j^2 - \\sigma_j^2\\right)</div>\n<p><strong>性质预测损失</strong>（均方误差）：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{prop}} = \\| y - f_\\theta(z) \\|^2</div>\n<p>权重 <span class=\"kb-math kb-math-inline\">\\alpha</span> 控制性质预测对潜在空间结构的影响强度。</p>\n<h5>潜在空间中的分子优化</h5>\n<p>训练完成后，Chemical VAE 的核心应用是在潜在空间中搜索最优分子：</p>\n<p><img alt=\"分子插值与潜在空间可视化\" src=\"https://ar5iv.labs.arxiv.org/html/1610.02415/assets/x4.png\" />\n<em>图：潜在空间中分子的平滑插值。两个已知分子之间的线性路径上，解码出的分子呈现渐进的结构变化。</em></p>\n<p><strong>贝叶斯优化流程</strong>：\n1. 使用训练好的编码器将所有已知分子编码到潜在空间\n2. 在潜在空间中训练稀疏高斯过程（Sparse GP）作为性质的代理模型\n3. 通过最大化期望改进（Expected Improvement）采集函数选择下一个评估点\n4. 将选中的潜在向量解码为 SMILES，评估其真实性质\n5. 迭代更新 GP 模型</p>\n<div class=\"key-point\">💡 <strong>与传统方法的关键区别</strong>：传统虚拟筛选在离散分子库中搜索，Chemical VAE 在连续空间中优化——这意味着它可以\"发明\"训练集中不存在的全新分子结构。</div>\n<h5>实验结果与关键发现</h5>\n<p><strong>重建与有效性</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>指标</th>\n<th>QM9 数据集</th>\n<th>ZINC 数据集</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>重建准确率</td>\n<td>~90%</td>\n<td>~90%</td>\n</tr>\n<tr>\n<td>随机采样有效率</td>\n<td>~70%</td>\n<td>~0.7%</td>\n</tr>\n<tr>\n<td>邻域解码有效率</td>\n<td>~80%</td>\n<td>~15%</td>\n</tr>\n</tbody>\n</table></div>\n<p>随机采样的有效率较低（特别是 ZINC），反映了 SMILES 语法的脆弱性。但在已知分子邻域内解码的有效率显著更高。</p>\n<p><strong>贝叶斯优化对比</strong>（logP 优化，ZINC 数据集）：</p>\n<p>Chemical VAE + 贝叶斯优化在 logP 优化任务中显著优于基于 SMILES 字符串的遗传算法（GA）。经过少量迭代，VAE 方法发现的分子 logP 值平均提升约 1.5 个单位，而 GA 方法几乎没有改进。</p>\n<p><strong>潜在空间平滑性验证</strong>：\n- 两个分子之间的线性插值产生语义连贯的中间分子\n- 潜在空间中的欧氏距离与分子指纹相似度正相关\n- 性质预测器在潜在空间中的预测误差较低，证实空间对性质的平滑性</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方面</th>\n<th>传统虚拟筛选</th>\n<th>遗传算法 (GA)</th>\n<th>Chemical VAE</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>搜索空间</td>\n<td>离散分子库</td>\n<td>离散 SMILES 变异</td>\n<td>连续潜在空间</td>\n</tr>\n<tr>\n<td>优化方法</td>\n<td>穷举/随机</td>\n<td>交叉/变异</td>\n<td>梯度/贝叶斯优化</td>\n</tr>\n<tr>\n<td>新分子生成</td>\n<td>❌ 仅筛选已知</td>\n<td>✅ 但语法脆弱</td>\n<td>✅ 连续空间采样</td>\n</tr>\n<tr>\n<td>性质平滑性</td>\n<td>不适用</td>\n<td>无保证</td>\n<td>✅ 联合训练保证</td>\n</tr>\n<tr>\n<td>可扩展性</td>\n<td>受限于库大小</td>\n<td>中等</td>\n<td>高（潜在空间维度固定）</td>\n</tr>\n</tbody>\n</table></div>\n<h5>局限性</h5>\n<ol>\n<li><strong>SMILES 语法脆弱性</strong>：解码器生成的 SMILES 字符串不保证化学有效性，需要后处理验证</li>\n<li><strong>表示局限</strong>：SMILES 是一维字符串，无法直接捕捉分子的三维空间结构</li>\n<li><strong>数据集规模</strong>：训练集仅包含数十万分子，远小于理论化学空间</li>\n<li><strong>后续改进方向</strong>：Grammar VAE、Junction Tree VAE 等后续工作通过引入语法约束和图结构表示解决了部分问题</li>\n</ol>",
      "quiz": {
        "q": "Chemical VAE 在训练时联合优化性质预测损失的主要目的是什么？",
        "options": [
          "提高 SMILES 字符串的重建准确率",
          "使潜在空间对分子性质具有平滑的梯度结构，便于后续优化",
          "减少 KL 散度使潜在分布更接近标准正态分布",
          "增加解码器生成有效 SMILES 的概率"
        ],
        "answer": 1,
        "explain": "联合训练性质预测器使其梯度信号反向传播到编码器，迫使潜在空间按性质组织为平滑流形，这是在潜在空间中执行贝叶斯优化搜索目标分子的前提条件。"
      }
    },
    {
      "id": "jt_vae",
      "num": 3,
      "name": "JT-VAE",
      "fullName": "连接树变分自编码器 (Junction Tree VAE)",
      "year": "2018",
      "org": "MIT",
      "parent": "chemical_vae",
      "paperUrl": "https://arxiv.org/abs/1802.04364",
      "projectUrl": "",
      "category": "generation",
      "motivation": "连接树分解保证100%生成有效性",
      "summary": "JT-VAE 提出将分子图分解为由化学子结构（环、键、原子）组成的连接树（Junction Tree），通过\"先生成树骨架、再组装分子图\"的两阶段粗到细策略，从根本上保证了生成分子 100% 的化学有效性，显著优于基于 SMILES 字符串和逐原子生成的方法。",
      "keyPoints": [
        "<strong>连接树分解</strong>：将分子图分解为子结构（环、化学键、原子）组成的树结构，子结构词表大小约 780（基于 250K ZINC 数据集）",
        "<strong>双潜变量设计</strong>：潜向量 <span class=\"kb-math kb-math-inline\">\\mathbf{z} = [\\mathbf{z}_T, \\mathbf{z}_G]</span> 分别编码树拓扑结构和图连接方式",
        "<strong>两阶段生成</strong>：先由 Tree Decoder 生成连接树骨架 <span class=\"kb-math kb-math-inline\">\\hat{\\mathcal{T}}</span>，再由 Graph Decoder 将子结构组装为完整分子图 <span class=\"kb-math kb-math-inline\">\\hat{G}</span>",
        "<strong>图编码器</strong>：基于 Loopy Belief Propagation 的消息传递网络编码分子图",
        "<strong>树编码器</strong>：基于 GRU 的双向（自底向上 + 自顶向下）树消息传递网络编码连接树",
        "<strong>树解码器</strong>：深度优先逐节点生成，每步同时预测拓扑（是否扩展）和标签（子结构类型）",
        "<strong>图解码器</strong>：在每个树节点处枚举候选子图并评分，选择最优组装方式",
        "<strong>100% 有效性</strong>：生成过程中每一步都保持化学有效性，无需后处理验证",
        "<strong>三项评估任务</strong>：分子重建（76.7%）、贝叶斯优化（penalized logP 最优）、约束分子优化（新任务）"
      ],
      "detail": "<p><img alt=\"JT-VAE 整体框架\" src=\"https://ar5iv.labs.arxiv.org/html/1802.04364/assets/x1.png\" />\n<em>图 1：JT-VAE 的编码-解码流程。左侧为编码过程：分子图 G 和其连接树 T 分别通过图编码器和树编码器映射到潜空间；右侧为解码过程：先从 z_T 生成连接树骨架，再从 z_G 和树骨架组装完整分子图。</em></p>\n<p><img alt=\"连接树分解示例\" src=\"https://ar5iv.labs.arxiv.org/html/1802.04364/assets/x2.png\" />\n<em>图 2：分子图的连接树分解。分子被拆解为环（蓝色）、化学键和原子等子结构，这些子结构构成树的节点，相邻子结构间共享原子形成树的边。</em></p>\n<pre><code class=\"language-python\"># JT-VAE 生成流程伪代码\ndef jt_vae_generate(z_T, z_G):\n    &quot;&quot;&quot;两阶段分子生成&quot;&quot;&quot;\n    # ===== 阶段一：生成连接树骨架 =====\n    # 从根节点开始，深度优先逐节点生成\n    root = predict_label(z_T)          # 预测根节点子结构类型\n    stack = [root]\n    tree = JunctionTree(root)\n\n    while stack:\n        node_i = stack[-1]\n        # 拓扑预测：是否向当前节点添加子节点\n        expand = predict_topology(h_i, z_T)  # sigmoid → {0, 1}\n        if expand:\n            label_j = predict_label(h_i, z_T)  # softmax over vocabulary\n            node_j = tree.add_child(node_i, label_j)\n            stack.append(node_j)       # 深度优先：继续扩展\n        else:\n            stack.pop()                # 回溯到父节点\n\n    # ===== 阶段二：组装分子图 =====\n    molecule = Graph()\n    for node_i in tree.nodes_in_order():\n        # 枚举当前节点子结构与已有子图的所有合法组装方式\n        candidates = enumerate_subgraphs(node_i, molecule)\n        # 用消息传递网络对每个候选评分，选最优\n        scores = [score_candidate(c, z_G, tree_messages) for c in candidates]\n        best = candidates[argmax(scores)]\n        molecule.merge(best)\n\n    return molecule  # 保证化学有效性\n</code></pre>\n<p><strong>动机与背景：为什么需要 JT-VAE？</strong></p>\n<p>在 JT-VAE 之前，分子生成主要基于 SMILES 字符串。Character VAE（CVAE）逐字符生成 SMILES，但大量生成结果不是合法的化学式（有效率仅 0.7%）。Grammar VAE（GVAE）引入上下文无关文法约束，将有效率提升到 7.2%，SD-VAE 进一步加入语义约束达到 43.5%，但这些方法仍然无法完全保证化学有效性。另一类方法如 GraphVAE 直接预测邻接矩阵，或逐原子生成分子图，但它们在生成中间状态时会经过化学无效的构型（如原子价态不满足），有效率仅达 89.2%。JT-VAE 的核心洞察是：<strong>如果用化学上合法的子结构（环、键）作为构建单元，而非单个原子，则生成过程中的每一步都天然保持化学有效性</strong>。这就是连接树分解的动机——将分子图分解为一棵由合法子结构组成的树。</p>\n<p><strong>核心机制：连接树分解与双编码器</strong></p>\n<p>连接树分解（Junction Tree Decomposition）是图论中的经典概念。对于分子图 <span class=\"kb-math kb-math-inline\">G = (V, E)</span>，其连接树 <span class=\"kb-math kb-math-inline\">\\mathcal{T}_G = (\\mathcal{V}, \\mathcal{E})</span> 满足：(1) 每个节点 <span class=\"kb-math kb-math-inline\">C_i \\in \\mathcal{V}</span> 是 <span class=\"kb-math kb-math-inline\">G</span> 的一个子图（称为\"簇\"），所有簇的并集覆盖 <span class=\"kb-math kb-math-inline\">G</span> 的全部边；(2) 对于 <span class=\"kb-math kb-math-inline\">G</span> 中任意节点 <span class=\"kb-math kb-math-inline\">v</span>，包含 <span class=\"kb-math kb-math-inline\">v</span> 的所有簇在 <span class=\"kb-math kb-math-inline\">\\mathcal{T}_G</span> 中构成连通子树（running intersection property）。在化学场景中，簇就是环结构、化学键或单个原子，词表大小约 780。编码端，<strong>图编码器</strong>采用 Loopy Belief Propagation 风格的消息传递：</p>\n<div class=\"kb-math kb-math-display\">\\boldsymbol{\\nu}_{uv}^{(t)} = \\tau\\left(\\mathbf{W}_1^g \\mathbf{x}_u + \\mathbf{W}_2^g \\mathbf{x}_{uv} + \\mathbf{W}_3^g \\sum_{w \\in N(u) \\setminus v} \\boldsymbol{\\nu}_{wu}^{(t-1)}\\right)</div>\n<p>经过 <span class=\"kb-math kb-math-inline\">T</span> 轮迭代后，对所有节点隐向量取平均得到图表示 <span class=\"kb-math kb-math-inline\">\\mathbf{h}_G</span>，再映射为 <span class=\"kb-math kb-math-inline\">\\mathbf{z}_G</span>。<strong>树编码器</strong>则采用 GRU 驱动的双向消息传递——先自底向上（叶→根），再自顶向下（根→叶），消息更新为：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{m}_{ij} = \\text{GRU}(\\mathbf{x}_i, \\{\\mathbf{m}_{ki}\\}_{k \\in N(i) \\setminus j})</div>\n<p>树的最终表示取根节点隐向量 <span class=\"kb-math kb-math-inline\">\\mathbf{h}_{\\mathcal{T}} = \\mathbf{h}_{\\text{root}}</span>（不做平均池化，因为解码器需要知道从哪个节点开始生成），映射为 <span class=\"kb-math kb-math-inline\">\\mathbf{z}_T</span>。</p>\n<div class=\"key-point\">💡 <strong>关键设计</strong>：图编码器用平均池化（因为图无根），树编码器用根节点表示（因为解码是从根开始的深度优先过程）。这种不对称设计确保了编码-解码的一致性。</div>\n<p><strong>解码流程：从树到图的粗到细生成</strong></p>\n<p>解码分两步。<strong>树解码器</strong>从根节点开始，按深度优先顺序逐步扩展连接树。在每个节点 <span class=\"kb-math kb-math-inline\">i</span>，模型做两个决策：(1) <strong>拓扑预测</strong>——是否添加新的子节点，通过 <span class=\"kb-math kb-math-inline\">\\sigma(\\mathbf{u}^d \\cdot \\tau(\\mathbf{W}_1^d \\mathbf{h}_i + \\mathbf{W}_2^d \\mathbf{h}_{ij} + \\mathbf{W}_3^d \\mathbf{z}_T))</span> 计算概率；(2) <strong>标签预测</strong>——新节点的子结构类型，通过 softmax 在词表上选择。每生成一个新节点后，模型立即对该节点执行消息传递更新，将信息传播回已生成的树结构中，这种\"即时传播\"机制让后续决策能感知全局上下文。</p>\n<p><strong>图解码器</strong>负责将连接树中的子结构组装为完整分子图。核心挑战在于：两个相邻子结构可能有多种合法的连接方式（例如两个环可以共享不同的原子对）。图解码器按树的拓扑顺序，在每个节点处枚举所有候选子图 <span class=\"kb-math kb-math-inline\">\\mathcal{G}_i</span>，用增强了树消息的消息传递网络对每个候选评分：</p>\n<div class=\"kb-math kb-math-display\">f^a(G_i) = \\sum_{(u,v) \\in E_i} \\mathbf{s}^a \\cdot \\tau(\\mathbf{W}^a [\\boldsymbol{\\mu}_u, \\boldsymbol{\\mu}_v])</div>\n<p>由于连接树分解的性质，任意两个相邻簇最多共享两个原子，因此候选数平均仅约 4 个，计算复杂度关于簇数量线性增长。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：训练时使用 teacher forcing（输入真实树结构），但测试时树解码器的输出直接传给图解码器，形成完全自回归的生成流程。</div>\n<p><strong>实验结果与方法对比</strong></p>\n<p>在 ZINC 250K 数据集上，JT-VAE 在三项任务中均表现优异：(1) <strong>分子重建</strong>准确率 76.7%，与 SD-VAE（76.2%）持平，远超 CVAE（44.6%）和 GVAE（53.7%）；(2) <strong>先验采样有效率 100%</strong>，而逐原子生成方法仅 89.2%，SMILES 方法更低；(3) <strong>贝叶斯优化</strong>发现的最优分子 penalized logP 达 5.68，优于所有基线；(4) 论文还首次提出<strong>约束分子优化</strong>任务——在保持与原始分子相似度 ≥ 0.4 的前提下优化目标属性，JT-VAE 的成功率达 83.6%。与传统 SMILES 方法的根本区别在于：JT-VAE 直接在分子图空间操作，用子结构级别的构建块替代字符/原子级别的生成，从架构层面消除了无效分子的可能性。</p>",
      "quiz": {
        "q": "JT-VAE 能够保证 100% 生成有效分子的根本原因是什么？",
        "options": [
          "使用了更大的训练数据集和更深的神经网络",
          "在解码后添加了 RDKit 有效性过滤器",
          "以化学合法的子结构（环、键）为构建单元，生成过程中每步都保持有效性",
          "采用了强化学习奖励信号来惩罚无效分子"
        ],
        "answer": 2,
        "explain": "JT-VAE 的核心设计是将分子分解为化学合法的子结构词表，生成时以这些子结构为最小单元进行组装，因此每一步中间状态都是化学有效的，无需额外的后处理验证。"
      }
    },
    {
      "id": "molgan",
      "num": 4,
      "name": "MolGAN",
      "fullName": "分子生成对抗网络 (MolGAN)",
      "year": "2018",
      "org": "University of Amsterdam",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1805.11973",
      "projectUrl": "",
      "category": "generation",
      "motivation": "首个图结构GAN支持多目标优化",
      "summary": "MolGAN 的核心目标是：首个图结构GAN支持多目标优化。",
      "keyPoints": [
        "核心动机：首个图结构GAN支持多目标优化",
        "代表机构：University of Amsterdam"
      ],
      "detail": "<p>首个图结构GAN支持多目标优化</p>"
    },
    {
      "id": "selfies",
      "num": 5,
      "name": "SELFIES",
      "fullName": "自引用嵌入式字符串 (SELFIES)",
      "year": "2020",
      "org": "University of Toronto",
      "parent": "chemical_vae",
      "paperUrl": "https://iopscience.iop.org/article/10.1088/2632-2153/aba947",
      "projectUrl": "",
      "category": "generation",
      "motivation": "100%有效的分子字符串表示法",
      "summary": "SELFIES 提出了一种基于形式文法的分子字符串表示方法，通过自引用嵌入式推导规则从根本上保证**任意字符串都对应有效分子**，彻底解决了 SMILES 在生成式模型中大量产生无效分子的问题。",
      "keyPoints": [
        "<strong>100% 鲁棒性</strong>：任意 SELFIES 字符串（包括完全随机字符串）都对应一个化学上有效的分子图",
        "<strong>双向完备性</strong>：每个分子都可以用 SELFIES 表示，每个 SELFIES 都对应一个有效分子",
        "<strong>形式文法推导规则</strong>：通过推导状态 <span class=\"kb-math kb-math-inline\">\\mathbf{X}_n</span>（<span class=\"kb-math kb-math-inline\">n=0,1,...,4</span>）追踪剩余价键数，自动约束后续原子的键合方式",
        "<strong>局部信息编码</strong>：分支长度（Branch）和环大小（Ring）以数字形式紧跟标识符之后，消除了 SMILES 中括号配对和环编号的非局部依赖",
        "<strong>模型无关性</strong>：可直接替换 SMILES 作为任意机器学习模型（VAE、GAN 等）的输入/输出，无需修改模型架构",
        "<strong>VAE 实验</strong>：在 QM9 数据集上，SELFIES 使 VAE 潜在空间 100% 有效，编码的多样分子数量比 SMILES 多两个数量级",
        "<strong>GAN 实验</strong>：SELFIES 训练的 GAN 生成 78.9% 多样有效分子，SMILES 仅 18.55%"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"SELFIES 与 SMILES 分子表示对比\" src=\"https://ar5iv.labs.arxiv.org/html/1905.13741/assets/x1.png\" />\n<em>图 1：以 MDMA 分子为例，对比 SMILES（B）和 SELFIES（C）两种字符串表示方法。SMILES 使用括号表示分支、数字表示环闭合（非局部操作）；SELFIES 将分支长度和环连接距离编码为紧随 Branch/Ring 标识符的数字（局部操作）。</em></p>\n<p><img alt=\"SELFIES 推导规则表\" src=\"https://ar5iv.labs.arxiv.org/html/1905.13741/assets/x2.png\" />\n<em>图 2：SELFIES 的推导规则表。每个 SELFIES 符号被解释为规则向量（顶部红线），根据当前推导状态 <span class=\"kb-math kb-math-inline\">\\mathbf{X}_n</span> 映射到原子或新的推导状态，从而保证化学价键约束。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># SELFIES 推导过程伪代码\ndef decode_selfies(selfies_string):\n    &quot;&quot;&quot;将 SELFIES 字符串推导为分子图&quot;&quot;&quot;\n    state = X_0          # 初始推导状态\n    molecule = &quot;&quot;        # 输出分子 SMILES\n\n    for symbol in selfies_string:\n        # 查推导规则表：(symbol, state) → (atom/branch/ring, next_state)\n        action, next_state = derivation_table[symbol][state]\n\n        if action.is_atom():\n            molecule += action.atom\n            # 状态转移：X_n 中 n 表示下一个原子可用的最大价键数\n            state = next_state  # e.g., F → X_1, =C → X_3\n\n        elif action.is_branch(N, X_n):\n            # 接下来 N 个符号在分支中推导，起始状态为 X_n\n            branch = derive_branch(selfies_string, N, X_n)\n            molecule += &quot;(&quot; + branch + &quot;)&quot;\n\n        elif action.is_ring(N):\n            # 当前原子与第 (N+1) 个前驱原子成环\n            # 仅在目标原子价键未满时插入\n            if target_atom_has_free_valence(N):\n                add_ring_bond(molecule, N)\n\n        # 若符号在当前状态下无有效操作，则跳过（保证鲁棒性）\n\n    return molecule\n</code></pre>\n<h5>动机与背景：SMILES 的根本缺陷</h5>\n<p>分子的计算机表示是计算化学和药物设计的基础。自 1988 年 Weininger 发明 SMILES 以来，它一直是分子字符串表示的事实标准。然而，当 SMILES 被用于<strong>生成式模型</strong>（如 VAE、GAN、遗传算法）时，暴露出一个根本性问题：</p>\n<div class=\"warn-box\">⚠️ 注意：大量生成的 SMILES 字符串不对应有效分子——要么语法无效（如括号不匹配），要么违反化学规则（如原子价键数超限）。</div>\n<p>具体而言，SMILES 的无效性来源于两类<strong>非局部依赖</strong>：\n1. <strong>括号配对</strong>：分支用 <code>(</code> 和 <code>)</code> 界定，随机突变可能导致括号不匹配\n2. <strong>环编号配对</strong>：环闭合用数字标记（如 <code>c1ccccc1</code> 表示苯环），突变可能破坏编号对应关系</p>\n<p>以 MDMA 分子为例，对 SMILES 进行单次随机突变后，有效率仅为 <strong>9.9%</strong>；两次突变降至 <strong>3.0%</strong>；三次突变仅 <strong>1.1%</strong>。此前的改进方案（如 DeepSMILES）虽有提升（单次突变 35.1%），但仍远非 100%。</p>\n<h5>核心机制：形式文法驱动的推导规则</h5>\n<p>SELFIES 的核心创新是将分子字符串的生成建模为一个<strong>形式文法</strong>（Formal Grammar）的推导过程。其关键设计包括：</p>\n<p><strong>1. 推导状态 <span class=\"kb-math kb-math-inline\">\\mathbf{X}_n</span> 追踪价键约束</strong></p>\n<p>推导从初始状态 <span class=\"kb-math kb-math-inline\">\\mathbf{X}_0</span> 开始。状态 <span class=\"kb-math kb-math-inline\">\\mathbf{X}_n</span> 表示\"下一个原子最多可使用 <span class=\"kb-math kb-math-inline\">n</span> 个价键\"。每读入一个 SELFIES 符号，根据推导规则表查找当前状态下的映射：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{X}_0 \\xmapsto{[\\text{F}]} \\texttt{F}\\;\\mathbf{X}_1 \\xmapsto{[\\text{=C}]} \\texttt{FC}\\;\\mathbf{X}_3 \\xmapsto{[\\text{=C}]} \\texttt{FC=C}\\;\\mathbf{X}_2 \\xmapsto{[\\text{\\#N}]} \\texttt{FC=C=N}</div>\n<p>例如，<code>[F]</code> 在状态 <span class=\"kb-math kb-math-inline\">\\mathbf{X}_0</span> 下生成氟原子 F，氟只有 1 个价键，因此下一状态为 <span class=\"kb-math kb-math-inline\">\\mathbf{X}_1</span>（剩余 1 个可用键）。<code>[=C]</code> 在 <span class=\"kb-math kb-math-inline\">\\mathbf{X}_1</span> 下生成碳原子并形成双键，碳有 4 个价键减去双键的 2 个，剩余 2 个给后续，但由于前驱只提供 1 个键，实际根据规则表调整。</p>\n<div class=\"key-point\">💡 关键：推导规则表的设计使得<strong>无论输入什么符号序列</strong>，产出的原子序列都自动满足价键约束。如果某个符号在当前状态下\"不合法\"，规则表会将其映射为一个合法的替代操作。</div>\n<p><strong>2. 局部化的分支与环编码</strong></p>\n<ul>\n<li><strong>Branch(N, <span class=\"kb-math kb-math-inline\">\\mathbf{X}_n</span>)</strong>：<code>[Branch]</code> 后紧跟的符号被解释为数字 <span class=\"kb-math kb-math-inline\">N</span>，表示接下来 <span class=\"kb-math kb-math-inline\">N</span> 个符号属于分支内部，分支从状态 <span class=\"kb-math kb-math-inline\">\\mathbf{X}_n</span> 开始推导。这完全消除了括号配对问题。</li>\n<li><strong>Ring(N)</strong>：<code>[Ring]</code> 后紧跟的符号被解释为数字 <span class=\"kb-math kb-math-inline\">N</span>，表示当前原子与第 <span class=\"kb-math kb-math-inline\">(N+1)</span> 个前驱原子形成环键。仅当目标原子的价键未满时才实际插入环键，否则跳过。</li>\n</ul>\n<p><strong>3. 鲁棒性保证的数学基础</strong></p>\n<p>SELFIES 的 100% 有效性源于以下设计原则：\n- 每个符号的解释完全由<strong>当前局部状态</strong>决定，不依赖未来符号\n- 推导规则表覆盖了所有可能的 (符号, 状态) 组合，不存在\"未定义\"情况\n- 环闭合采用<strong>条件插入</strong>策略：仅在不违反价键约束时生效</p>\n<h5>随机突变鲁棒性验证</h5>\n<p><img alt=\"随机突变对比实验\" src=\"https://ar5iv.labs.arxiv.org/html/1905.13741/assets/x3.png\" />\n<em>图 3：对 MDMA 分子进行 1-3 次随机突变的结果。SMILES 突变后几乎全部无效，而 SELFIES 突变后 100% 产生有效（但不同的）分子。</em></p>\n<h5>VAE 潜在空间有效性</h5>\n<p><img alt=\"VAE 潜在空间有效性对比\" src=\"https://ar5iv.labs.arxiv.org/html/1905.13741/assets/x5.png\" />\n<em>图 5：VAE 潜在空间的有效性分析。上排：通过原点的随机平面上的有效分子比例（红=0%，绿=100%）。SMILES 仅小部分区域有效，SELFIES 整个空间 100% 有效。</em></p>\n<p>在 QM9 数据集上训练标准 VAE 后，作者分析了潜在空间（241 维）中随机采样点的有效性。使用 SMILES 时，潜在空间中仅有很小比例的点能解码为有效分子；使用 SELFIES 时，<strong>整个潜在空间 100% 有效</strong>。这不仅对分子逆设计至关重要，更使得潜在空间的<strong>可解释性分析</strong>成为可能。</p>\n<h5>多样性与生成质量</h5>\n<p><img alt=\"多样性对比\" src=\"https://ar5iv.labs.arxiv.org/html/1905.13741/assets/x6.png\" />\n<em>图 6：VAE 和 GAN 的多样性对比。(A) VAE 潜在空间中 SELFIES 编码的有效多样分子数量比 SMILES 多约 100 倍。(B) GAN 采样 10,000 次，SELFIES 产生 7,889 个不同有效分子，SMILES 最多仅 1,855 个。</em></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>指标</th>\n<th>SMILES</th>\n<th>SELFIES</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>单次突变有效率</td>\n<td>9.9%</td>\n<td><strong>100%</strong></td>\n</tr>\n<tr>\n<td>双次突变有效率</td>\n<td>3.0%</td>\n<td><strong>100%</strong></td>\n</tr>\n<tr>\n<td>三次突变有效率</td>\n<td>1.1%</td>\n<td><strong>100%</strong></td>\n</tr>\n<tr>\n<td>VAE 潜在空间有效率</td>\n<td>小部分</td>\n<td><strong>100%</strong></td>\n</tr>\n<tr>\n<td>VAE 多样分子密度</td>\n<td>1×</td>\n<td><strong>~100×</strong></td>\n</tr>\n<tr>\n<td>GAN 最优多样有效分子</td>\n<td>1,855</td>\n<td><strong>7,889</strong></td>\n</tr>\n</tbody>\n</table></div>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>SMILES</th>\n<th>DeepSMILES</th>\n<th>SELFIES</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>100% 语法有效</td>\n<td>❌</td>\n<td>❌</td>\n<td>✅</td>\n</tr>\n<tr>\n<td>100% 化学有效</td>\n<td>❌</td>\n<td>❌</td>\n<td>✅</td>\n</tr>\n<tr>\n<td>局部信息编码</td>\n<td>❌（括号/环号非局部）</td>\n<td>部分改善</td>\n<td>✅</td>\n</tr>\n<tr>\n<td>模型无关</td>\n<td>✅</td>\n<td>✅</td>\n<td>✅</td>\n</tr>\n<tr>\n<td>可扩展至大分子</td>\n<td>✅</td>\n<td>✅</td>\n<td>✅（扩展规则表）</td>\n</tr>\n<tr>\n<td>单次突变有效率</td>\n<td>9.9%</td>\n<td>35.1%</td>\n<td><strong>100%</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>SELFIES 相比 SMILES 的根本优势在于：它不是在模型层面\"修补\"无效输出（如后处理过滤或约束解码），而是在<strong>表示层面</strong>从根本上消除了无效分子的可能性。这使得任何生成式模型——无论是 VAE、GAN、强化学习还是遗传算法——都能直接受益，无需针对有效性进行额外适配。</p>",
      "quiz": {
        "q": "SELFIES 保证 100% 分子有效性的核心机制是什么？",
        "options": [
          "使用后处理过滤器移除无效分子",
          "通过形式文法推导规则和状态追踪，使任意符号序列都映射为合法分子",
          "限制字符串只能使用预定义的有效分子模板",
          "训练一个判别器网络来纠正无效输出"
        ],
        "answer": 1,
        "explain": "SELFIES 通过推导状态 X_n 追踪价键约束，并用推导规则表将任意 (符号, 状态) 组合映射为合法操作，从表示层面根本性地保证有效性，而非依赖后处理或模型约束。"
      }
    },
    {
      "id": "molgpt",
      "num": 6,
      "name": "MolGPT",
      "fullName": "分子生成预训练Transformer (MolGPT)",
      "year": "2021",
      "org": "AstraZeneca",
      "parent": "reinvent",
      "paperUrl": "https://pubs.acs.org/doi/10.1021/acs.jcim.1c00600",
      "projectUrl": "",
      "category": "generation",
      "motivation": "GPT架构支持scaffold条件生成",
      "summary": "MolGPT 的核心目标是：GPT架构支持scaffold条件生成。",
      "keyPoints": [
        "核心动机：GPT架构支持scaffold条件生成",
        "演化来源：继承或改进自 reinvent",
        "代表机构：AstraZeneca"
      ],
      "detail": "<p>GPT架构支持scaffold条件生成</p>"
    },
    {
      "id": "chemgpt",
      "num": 7,
      "name": "ChemGPT",
      "fullName": "化学生成预训练Transformer (ChemGPT)",
      "year": "2022",
      "org": "Insilico Medicine",
      "parent": "molgpt",
      "paperUrl": "https://arxiv.org/abs/2209.11436",
      "projectUrl": "",
      "category": "generation",
      "motivation": "大规模预训练化学语言模型",
      "summary": "ChemGPT 的核心目标是：大规模预训练化学语言模型。",
      "keyPoints": [
        "核心动机：大规模预训练化学语言模型",
        "演化来源：继承或改进自 molgpt",
        "代表机构：Insilico Medicine"
      ],
      "detail": "<p>大规模预训练化学语言模型</p>"
    },
    {
      "id": "gp_molformer",
      "num": 8,
      "name": "GP-MoLFormer",
      "fullName": "通用性质分子Transformer (GP-MoLFormer)",
      "year": "2025",
      "org": "IBM Research",
      "parent": "chemgpt",
      "paperUrl": "https://doi.org/10.1039/D5DD00122F",
      "projectUrl": "",
      "category": "generation",
      "motivation": "11亿SMILES预训练支持pair-tuning",
      "summary": "GP-MoLFormer 的核心目标是：11亿SMILES预训练支持pair-tuning。",
      "keyPoints": [
        "核心动机：11亿SMILES预训练支持pair-tuning",
        "演化来源：继承或改进自 chemgpt",
        "代表机构：IBM Research"
      ],
      "detail": "<p>11亿SMILES预训练支持pair-tuning</p>"
    },
    {
      "id": "mist",
      "num": 9,
      "name": "MIST",
      "fullName": "分子信息系统Transformer (MIST)",
      "year": "2026",
      "org": "University of Michigan",
      "parent": "gp_molformer",
      "paperUrl": "https://ai.engin.umich.edu/stories/mist-ai-model-for-molecular-property-prediction",
      "projectUrl": "",
      "category": "generation",
      "motivation": "18亿参数支持400+性质预测",
      "summary": "MIST 的核心目标是：18亿参数支持400+性质预测。",
      "keyPoints": [
        "核心动机：18亿参数支持400+性质预测",
        "演化来源：继承或改进自 gp_molformer",
        "代表机构：University of Michigan"
      ],
      "detail": "<p>18亿参数支持400+性质预测</p>"
    },
    {
      "id": "e3_edm",
      "num": 10,
      "name": "E(3)-EDM",
      "fullName": "E(3)等变扩散模型 (E(3)-EDM)",
      "year": "2022",
      "org": "University of Amsterdam",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2203.17003",
      "projectUrl": "",
      "category": "generation",
      "motivation": "首个E(3)等变扩散模型",
      "summary": "E(3)-EDM 的核心目标是：首个E(3)等变扩散模型。",
      "keyPoints": [
        "核心动机：首个E(3)等变扩散模型",
        "代表机构：University of Amsterdam"
      ],
      "detail": "<p>首个E(3)等变扩散模型</p>"
    },
    {
      "id": "diffsbdd",
      "num": 11,
      "name": "DiffSBDD",
      "fullName": "扩散式结构药物设计 (DiffSBDD)",
      "year": "2022",
      "org": "ETH Zurich",
      "parent": "e3_edm",
      "paperUrl": "https://arxiv.org/abs/2210.13695",
      "projectUrl": "",
      "category": "generation",
      "motivation": "SE(3)等变扩散支持口袋条件生成",
      "summary": "DiffSBDD 的核心目标是：SE(3)等变扩散支持口袋条件生成。",
      "keyPoints": [
        "核心动机：SE(3)等变扩散支持口袋条件生成",
        "演化来源：继承或改进自 e3_edm",
        "代表机构：ETH Zurich"
      ],
      "detail": "<p>SE(3)等变扩散支持口袋条件生成</p>"
    },
    {
      "id": "targetdiff",
      "num": 12,
      "name": "TargetDiff",
      "fullName": "靶点条件扩散生成 (TargetDiff)",
      "year": "2023",
      "org": "Tsinghua University",
      "parent": "diffsbdd",
      "paperUrl": "https://arxiv.org/abs/2303.03543",
      "projectUrl": "",
      "category": "generation",
      "motivation": "蛋白口袋几何约束的条件扩散",
      "summary": "TargetDiff 的核心目标是：蛋白口袋几何约束的条件扩散。",
      "keyPoints": [
        "核心动机：蛋白口袋几何约束的条件扩散",
        "演化来源：继承或改进自 diffsbdd",
        "代表机构：Tsinghua University"
      ],
      "detail": "<p>蛋白口袋几何约束的条件扩散</p>"
    },
    {
      "id": "pocket2mol",
      "num": 13,
      "name": "Pocket2Mol",
      "fullName": "口袋到分子生成 (Pocket2Mol)",
      "year": "2022",
      "org": "Tsinghua University",
      "parent": "e3_edm",
      "paperUrl": "https://arxiv.org/abs/2205.07249",
      "projectUrl": "",
      "category": "generation",
      "motivation": "高效自回归3D生成",
      "summary": "Pocket2Mol 的核心目标是：高效自回归3D生成。",
      "keyPoints": [
        "核心动机：高效自回归3D生成",
        "演化来源：继承或改进自 e3_edm",
        "代表机构：Tsinghua University"
      ],
      "detail": "<p>高效自回归3D生成</p>"
    },
    {
      "id": "rfdiffusion3",
      "num": 14,
      "name": "RFdiffusion3",
      "fullName": "RoseTTAFold扩散3 (RFdiffusion3)",
      "year": "2025.09",
      "org": "Baker Lab",
      "parent": "targetdiff",
      "paperUrl": "https://www.bakerlab.org/2025/09/12/rfdiffusion3/",
      "projectUrl": "",
      "category": "generation",
      "motivation": "全聚合物原子建模成本降10倍",
      "summary": "RFdiffusion3 提出了以原子（而非残基）为基本扩散单元的全原子生物分子设计框架 AtomWorks，通过稀疏注意力 Transformer U-Net 架构与多层次条件控制机制，在蛋白质结合物、DNA 结合蛋白、小分子结合物及酶的从头设计任务上全面超越前代方法，同时实现约 10 倍的推理加速。",
      "keyPoints": [
        "<strong>全原子扩散</strong>：以 14 个原子/残基为基本单元（4 骨架 + 10 侧链，不足用虚拟 Cβ 填充），直接在原子坐标空间进行扩散与去噪",
        "<strong>AtomWorks 架构</strong>：Transformer-based U-Net，包含下采样编码器（原子→token）、稀疏 Transformer 主干、上采样解码器（token→原子坐标更新），仅 168M 参数（AF3 约 350M）",
        "<strong>稀疏注意力</strong>：基于几何邻近性的稀疏 attention，避免全原子 <span class=\"kb-math kb-math-inline\">O(N^2)</span> 复杂度，实现约 10× 加速",
        "<strong>精简 Pairformer</strong>：仅 2 层（AF3 为 48 层），移除三角乘法/三角注意力更新，大幅降低计算开销",
        "<strong>多层次条件控制</strong>：原子级热点（hotspot）、氢键供体/受体、溶剂可及表面积（SASA）、质心位置、motif 支架约束",
        "<strong>Classifier-free guidance</strong>：训练时随机丢弃条件信号，推理时通过引导强度 <span class=\"kb-math kb-math-inline\">s</span> 增强条件遵从",
        "<strong>蛋白质结合物设计</strong>：5 个靶标中 4 个优于 RFdiffusion1，平均独立结合簇 8.2 vs 1.4",
        "<strong>DNA 结合蛋白设计</strong>：首次实现 de novo DNA 结合蛋白设计，单体通过率 8.67%，实验验证 EC50 = 5.89 μM",
        "<strong>小分子结合物设计</strong>：联合采样配体构象，4 个靶标全部优于 RFdiffusionAA",
        "<strong>酶设计</strong>：AME 基准 41 个案例中 37 个优于 RFdiffusion2，实验验证半胱氨酸水解酶 <span class=\"kb-math kb-math-inline\">k_{\\text{cat}}/K_m = 3557</span>"
      ],
      "detail": "<p><img alt=\"RFdiffusion3 架构总览\" src=\"https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12458353/bin/nihpp-2025.09.18.676967v2-f0001.jpg\" />\n<em>图 1：RFdiffusion3 的 AtomWorks 架构与条件控制机制。(a) 全原子扩散过程示意；(b) Transformer U-Net 架构：下采样→稀疏 Transformer→上采样；(c) 多种条件控制信号</em></p>\n<p><img alt=\"蛋白质与DNA结合物设计结果\" src=\"https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12458353/bin/nihpp-2025.09.18.676967v2-f0002.jpg\" />\n<em>图 2：蛋白质结合物设计（上）与 DNA 结合蛋白设计（下）的计算与实验验证结果</em></p>\n<pre><code class=\"language-python\"># RFdiffusion3 核心扩散与去噪伪代码\n# === 训练阶段 ===\nfor (x0_atoms, cond) in training_data:          # x0: 全原子坐标 [N_atoms, 3]\n    t = sample_timestep()                        # EDM 噪声调度\n    sigma = noise_schedule(t)                    # σ(t) from Karras et al.\n    eps = randn_like(x0_atoms)\n    x_noisy = x0_atoms + sigma * eps             # 前向扩散：加噪\n\n    # 条件信号随机丢弃 (classifier-free guidance)\n    if random() &lt; p_uncond:\n        cond = mask_all(cond)                    # 丢弃所有条件\n\n    # AtomWorks 前向传播\n    atom_feats, pair_feats = embed(x_noisy, cond)          # 原子+对特征嵌入\n    token_feats = cross_attn_downsample(atom_feats)        # 原子→token 下采样\n    token_feats = sparse_transformer(token_feats, pair_feats)  # 稀疏注意力主干\n    delta_x = cross_attn_upsample(token_feats, atom_feats)    # token→原子 上采样\n    x0_pred = x_noisy + delta_x                            # 预测去噪坐标\n\n    seq_pred = predict_sequence(x0_pred)         # 从去噪结构预测序列\n    loss = mse(x0_pred, x0_atoms) + ce(seq_pred, seq_true)\n\n# === 推理阶段 (采样) ===\nx_T = randn(N_atoms, 3) * sigma_max             # 从纯噪声初始化\nfor t in reversed(timesteps):\n    # Classifier-free guidance\n    x0_cond = model(x_t, t, cond)               # 有条件预测\n    x0_uncond = model(x_t, t, no_cond)           # 无条件预测\n    x0_guided = x0_uncond + s * (x0_cond - x0_uncond)  # s: 引导强度\n    x_{t-1} = denoise_step(x_t, x0_guided, t)   # EDM 去噪步\n    # 自条件化：将 x0_guided 作为下一步额外输入\n</code></pre>\n<p><strong>动机与背景：从残基级到全原子级扩散</strong></p>\n<p>RFdiffusion 系列的前代方法（RFdiffusion1/2）主要在残基级别（以 Cα 坐标为代表）进行扩散，这在蛋白质骨架设计中取得了巨大成功，但面临两个根本性限制：(1) 无法直接建模侧链原子与非蛋白质分子（DNA、小分子配体）之间的精细交互；(2) 需要额外的序列设计步骤（如 ProteinMPNN）和侧链填充步骤，引入误差累积。RFdiffusion3 的核心洞察是：<strong>将原子作为扩散的基本单元</strong>，每个残基用 14 个原子表示（4 个骨架原子 N, Cα, C, O 加 10 个侧链原子，不足的用虚拟 Cβ 坐标填充），从而在统一框架下同时生成骨架、侧链和非蛋白质分子的全原子坐标。这一设计使得模型能够直接优化原子级别的氢键、疏水接触和配位几何，而无需后处理。</p>\n<p><strong>AtomWorks 架构：稀疏注意力 Transformer U-Net</strong></p>\n<p>AtomWorks 的核心架构创新在于将全原子表示与高效 Transformer 结合。直接对所有原子做全注意力的计算复杂度为 <span class=\"kb-math kb-math-inline\">O(N_{\\text{atoms}}^2)</span>，对于典型的蛋白质-靶标复合物（数千原子）是不可接受的。RFdiffusion3 采用了受 Byte Latent Transformer (Pagnoni et al., 2024) 启发的 U-Net 策略：</p>\n<ol>\n<li>\n<p><strong>下采样编码器</strong>：通过交叉注意力（cross-attention）将原子级特征池化为残基级 token 特征。每个 token 通过 attention 聚合其对应残基内所有原子的信息，同时融合对（pair）特征。原子级特征包括原子类型、元素类型、噪声坐标等；对特征包括原子间距离、键连接等。</p>\n</li>\n<li>\n<p><strong>稀疏 Transformer 主干</strong>：在 token 级别运行，但注意力范围限制在<strong>几何邻近</strong>的 token 之间（基于 Cα 距离阈值），而非全局注意力。这将复杂度从 <span class=\"kb-math kb-math-inline\">O(N_{\\text{res}}^2)</span> 降至近似 <span class=\"kb-math kb-math-inline\">O(N_{\\text{res}} \\cdot k)</span>，其中 <span class=\"kb-math kb-math-inline\">k</span> 是平均邻居数。主干仅包含 <strong>2 层 Pairformer</strong>（对比 AlphaFold3 的 48 层），且<strong>完全移除了三角乘法更新（triangle multiplicative update）和三角注意力更新（triangle attention）</strong>——这些是 AF2/AF3 中最昂贵的操作。作者发现，在生成任务中这些组件并非必要，移除后模型参数量从约 350M 降至 <strong>168M</strong>，推理速度提升约 10 倍。</p>\n</li>\n<li>\n<p><strong>上采样解码器</strong>：通过反向交叉注意力将 token 级特征映射回原子级坐标更新 <span class=\"kb-math kb-math-inline\">\\Delta \\mathbf{x}</span>，最终预测去噪后的全原子坐标 <span class=\"kb-math kb-math-inline\">\\hat{\\mathbf{x}}_0 = \\mathbf{x}_t + \\Delta \\mathbf{x}</span>。序列通过从去噪结构中预测残基类型来联合生成。</p>\n</li>\n</ol>\n<div class=\"key-point\">💡 <strong>关键设计</strong>：稀疏注意力 + 精简 Pairformer 的组合使 RFdiffusion3 在保持全原子精度的同时，推理速度比 RFdiffusion2 快约 10 倍。对于 200 残基的蛋白质，单次采样仅需数十秒。</div>\n<p><strong>扩散过程与噪声调度</strong></p>\n<p>RFdiffusion3 采用 EDM（Elucidating the Design Space of Diffusion-Based Generative Models, Karras et al., 2022）噪声调度。前向扩散过程将全原子坐标 <span class=\"kb-math kb-math-inline\">\\mathbf{x}_0</span> 逐步加噪：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{x}_t = \\mathbf{x}_0 + \\sigma(t) \\cdot \\boldsymbol{\\epsilon}, \\quad \\boldsymbol{\\epsilon} \\sim \\mathcal{N}(0, \\mathbf{I})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\sigma(t)</span> 是随时间单调递增的噪声水平。模型被训练为预测去噪后的坐标 <span class=\"kb-math kb-math-inline\">\\hat{\\mathbf{x}}_0</span>（而非噪声 <span class=\"kb-math kb-math-inline\">\\boldsymbol{\\epsilon}</span>），损失函数为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\lambda(t) \\|\\hat{\\mathbf{x}}_0 - \\mathbf{x}_0\\|^2 + \\mathcal{L}_{\\text{seq}}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\lambda(t)</span> 是时间依赖的权重，<span class=\"kb-math kb-math-inline\">\\mathcal{L}_{\\text{seq}}</span> 是序列预测的交叉熵损失。推理时采用自条件化（self-conditioning）：将上一步的预测 <span class=\"kb-math kb-math-inline\">\\hat{\\mathbf{x}}_0^{(t+1)}</span> 作为当前步的额外输入，显著提升生成质量。</p>\n<p><strong>多层次条件控制机制</strong></p>\n<p>RFdiffusion3 的另一核心创新是丰富的条件控制体系，使用户能够精确指定设计目标：</p>\n<ul>\n<li>\n<p><strong>原子级热点（Atomic Hotspots）</strong>：不同于 RFdiffusion1 的残基级热点，RFdiffusion3 允许指定靶标上的<strong>单个原子</strong>作为结合热点。模型通过 classifier-free guidance 学习将设计的结合界面集中在这些原子附近，实现更精细的界面控制。</p>\n</li>\n<li>\n<p><strong>氢键供体/受体条件</strong>：用户可以指定设计蛋白中特定位置应形成氢键供体或受体，这对于 DNA 结合蛋白设计尤为关键——DNA 碱基的识别主要依赖于大沟中的氢键模式。</p>\n</li>\n<li>\n<p><strong>SASA（溶剂可及表面积）条件</strong>：通过标记残基的埋藏/暴露状态，控制设计蛋白的疏水核心与表面极性残基分布。</p>\n</li>\n<li>\n<p><strong>质心（CoM）位置条件</strong>：指定设计蛋白质心相对于靶标的空间位置，引导结合物在靶标表面的特定区域生成。</p>\n</li>\n<li>\n<p><strong>Motif 支架约束</strong>：支持\"未索引原子 motif\"（unindexed atomic motifs），即仅指定关键功能基团的原子坐标而不指定其在序列中的位置，模型自动将其整合到设计的蛋白质中。这对酶活性位点设计至关重要。</p>\n</li>\n</ul>\n<p>所有条件信号均通过 classifier-free guidance 实现：训练时以概率 <span class=\"kb-math kb-math-inline\">p_{\\text{uncond}}</span> 随机丢弃条件，推理时通过引导公式增强条件遵从：</p>\n<div class=\"kb-math kb-math-display\">\\hat{\\mathbf{x}}_0^{\\text{guided}} = \\hat{\\mathbf{x}}_0^{\\text{uncond}} + s \\cdot (\\hat{\\mathbf{x}}_0^{\\text{cond}} - \\hat{\\mathbf{x}}_0^{\\text{uncond}})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">s &gt; 1</span> 为引导强度。</p>\n<p><strong>实验验证与关键结果</strong></p>\n<p><img alt=\"小分子结合物与酶设计结果\" src=\"https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12458353/bin/nihpp-2025.09.18.676967v2-f0003.jpg\" />\n<em>图 3：小分子结合物设计（左）与酶设计（右）的计算基准与实验验证</em></p>\n<p>在<strong>蛋白质结合物设计</strong>方面，RFdiffusion3 在 5 个靶标（包括 IL-7Rα、TrkA、FGFR2、PD-L1、InsulinR）上进行了系统评估。在 4/5 个靶标上，RFdiffusion3 生成的结合物在 AlphaFold2 预测的界面准确度（ipTM）和结合物多样性上均优于 RFdiffusion1。平均每个靶标产生 8.2 个独立结合簇（vs RFdiffusion1 的 1.4 个），表明模型能够探索更广泛的结合模式空间。</p>\n<p>在<strong>DNA 结合蛋白设计</strong>方面，RFdiffusion3 首次实现了 de novo DNA 结合蛋白的计算设计。模型联合生成蛋白质结构和 DNA 双链构象，通过氢键条件控制实现碱基特异性识别。在计算筛选中，单体设计通过率为 8.67%，二聚体为 6.67%。实验验证了 5 个设计，其中 1 个展现出明确的 DNA 结合活性，EC50 = 5.89 ± 2.15 μM。</p>\n<p>在<strong>小分子结合物设计</strong>方面，RFdiffusion3 在 4 个靶标（雌二醇、地高辛、生物素、褪黑素）上全部优于 RFdiffusionAA。关键创新是联合采样配体构象——模型不仅设计蛋白质口袋，还同时优化配体在口袋中的结合姿态。</p>\n<p>在<strong>酶设计</strong>方面，使用 AME（Automated Motif Extraction）基准的 41 个案例进行评估，RFdiffusion3 在 37/41（90%）个案例中优于 RFdiffusion2。实验验证了半胱氨酸水解酶设计：从 190 个设计中，35 个展现多轮催化活性，最佳设计的 <span class=\"kb-math kb-math-inline\">k_{\\text{cat}}/K_m = 3557 \\, \\text{M}^{-1}\\text{s}^{-1}</span>。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：RFdiffusion3 的训练数据仅来自 PDB，未使用合成数据或预训练语言模型。模型的泛化能力完全来自全原子扩散框架的归纳偏置和丰富的条件控制机制。</div>",
      "quiz": {
        "q": "RFdiffusion3 相比 AlphaFold3 在架构上的关键简化是什么？",
        "options": [
          "将原子数从 14 个/残基减少到 4 个/残基",
          "将 Pairformer 从 48 层缩减至 2 层并移除三角更新操作",
          "使用全局注意力替代稀疏注意力以提升精度",
          "增加 Reference Model 进行 KL 散度约束"
        ],
        "answer": 1,
        "explain": "RFdiffusion3 将 Pairformer 从 AF3 的 48 层缩减至仅 2 层，并完全移除了三角乘法更新和三角注意力更新，使参数量从约 350M 降至 168M，推理速度提升约 10 倍。"
      }
    },
    {
      "id": "apo2mol",
      "num": 15,
      "name": "Apo2Mol",
      "fullName": "动态口袋感知生成 (Apo2Mol)",
      "year": "2026",
      "org": "AAAI",
      "parent": "targetdiff",
      "paperUrl": "https://ojs.aaai.org/index.php/AAAI/article/view/37001",
      "projectUrl": "",
      "category": "generation",
      "motivation": "动态口袋感知建模诱导契合效应",
      "summary": "Apo2Mol 的核心目标是：动态口袋感知建模诱导契合效应。",
      "keyPoints": [
        "核心动机：动态口袋感知建模诱导契合效应",
        "演化来源：继承或改进自 targetdiff",
        "代表机构：AAAI"
      ],
      "detail": "<p>动态口袋感知建模诱导契合效应</p>"
    },
    {
      "id": "genie3",
      "num": 16,
      "name": "Genie 3",
      "fullName": "全原子结构扩散 (Genie 3)",
      "year": "2026.05",
      "org": "Baker Lab",
      "parent": "rfdiffusion3",
      "paperUrl": "https://www.biorxiv.org/content/10.1101/2026.05.05.649431v1",
      "projectUrl": "",
      "category": "generation",
      "motivation": "全原子扩散设计纳摩尔级结合剂",
      "summary": "Genie 3 的核心目标是：全原子扩散设计纳摩尔级结合剂。",
      "keyPoints": [
        "核心动机：全原子扩散设计纳摩尔级结合剂",
        "演化来源：继承或改进自 rfdiffusion3",
        "代表机构：Baker Lab"
      ],
      "detail": "<p>全原子扩散设计纳摩尔级结合剂</p>"
    },
    {
      "id": "megalodon",
      "num": 17,
      "name": "Megalodon",
      "fullName": "混合去噪扩散 (Megalodon)",
      "year": "2026",
      "org": "NVIDIA/CMU",
      "parent": "diffsbdd",
      "paperUrl": "https://pubs.rsc.org/en/content/articlelanding/2026/dd/d5dd00289c",
      "projectUrl": "",
      "category": "generation",
      "motivation": "混合去噪提升有效生成49倍",
      "summary": "Megalodon 的核心目标是：混合去噪提升有效生成49倍。",
      "keyPoints": [
        "核心动机：混合去噪提升有效生成49倍",
        "演化来源：继承或改进自 diffsbdd",
        "代表机构：NVIDIA/CMU"
      ],
      "detail": "<p>混合去噪提升有效生成49倍</p>"
    },
    {
      "id": "cocograph",
      "num": 18,
      "name": "CoCoGraph",
      "fullName": "分子拆解重组生成 (CoCoGraph)",
      "year": "2026.05",
      "org": "Universitat Rovira i Virgili",
      "parent": "—",
      "paperUrl": "https://www.nature.com/articles/s42256-026-00987-9",
      "projectUrl": "",
      "category": "generation",
      "motivation": "分子拆解重组生成820万新分子",
      "summary": "CoCoGraph 的核心目标是：分子拆解重组生成820万新分子。",
      "keyPoints": [
        "核心动机：分子拆解重组生成820万新分子",
        "代表机构：Universitat Rovira i Virgili"
      ],
      "detail": "<p>分子拆解重组生成820万新分子</p>"
    },
    {
      "id": "propmolflow",
      "num": 19,
      "name": "PropMolFlow",
      "fullName": "性质引导分子流 (PropMolFlow)",
      "year": "2026",
      "org": "University of Florida",
      "parent": "targetdiff",
      "paperUrl": "https://www.drugtargetreview.com/news/152614/ai-model-generates-drug-molecules-10-times-faster/",
      "projectUrl": "",
      "category": "generation",
      "motivation": "性质引导生成速度提升10倍",
      "summary": "PropMolFlow 的核心目标是：性质引导生成速度提升10倍。",
      "keyPoints": [
        "核心动机：性质引导生成速度提升10倍",
        "演化来源：继承或改进自 targetdiff",
        "代表机构：University of Florida"
      ],
      "detail": "<p>性质引导生成速度提升10倍</p>"
    },
    {
      "id": "proteina_complexa",
      "num": 20,
      "name": "Proteina-Complexa",
      "fullName": "蛋白复合物生成 (Proteina-Complexa)",
      "year": "2026.04",
      "org": "NVIDIA",
      "parent": "rfdiffusion3",
      "paperUrl": "https://www.rosettacommons.org/news/next-generation-generative-model-unlocks-de-novo-designs-scale",
      "projectUrl": "",
      "category": "generation",
      "motivation": "比RFdiffusion快30-60倍",
      "summary": "Proteina-Complexa 的核心目标是：比RFdiffusion快30-60倍。",
      "keyPoints": [
        "核心动机：比RFdiffusion快30-60倍",
        "演化来源：继承或改进自 rfdiffusion3",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>比RFdiffusion快30-60倍</p>"
    },
    {
      "id": "ecfp",
      "num": 21,
      "name": "ECFP",
      "fullName": "扩展连接指纹 (ECFP)",
      "year": "2010",
      "org": "Accelrys",
      "parent": "—",
      "paperUrl": "https://pubs.acs.org/doi/10.1021/ci100050t",
      "projectUrl": "",
      "category": "screening",
      "motivation": "扩展连接指纹编码分子子结构",
      "summary": "ECFP 的核心目标是：扩展连接指纹编码分子子结构。",
      "keyPoints": [
        "核心动机：扩展连接指纹编码分子子结构",
        "代表机构：Accelrys"
      ],
      "detail": "<p>扩展连接指纹编码分子子结构</p>"
    },
    {
      "id": "autodock",
      "num": 22,
      "name": "AutoDock",
      "fullName": "自动分子对接 (AutoDock)",
      "year": "1990",
      "org": "Scripps Research",
      "parent": "—",
      "paperUrl": "https://onlinelibrary.wiley.com/doi/10.1002/jcc.540110311",
      "projectUrl": "",
      "category": "screening",
      "motivation": "基于物理力场的分子对接",
      "summary": "AutoDock 的核心目标是：基于物理力场的分子对接。",
      "keyPoints": [
        "核心动机：基于物理力场的分子对接",
        "代表机构：Scripps Research"
      ],
      "detail": "<p>基于物理力场的分子对接</p>"
    },
    {
      "id": "deepdta",
      "num": 23,
      "name": "DeepDTA",
      "fullName": "深度药物-靶点亲和力预测 (DeepDTA)",
      "year": "2018",
      "org": "Sabanci University",
      "parent": "—",
      "paperUrl": "https://academic.oup.com/bioinformatics/article/34/17/i821/5093245",
      "projectUrl": "",
      "category": "screening",
      "motivation": "双分支CNN处理SMILES和蛋白序列",
      "summary": "DeepDTA 的核心目标是：双分支CNN处理SMILES和蛋白序列。",
      "keyPoints": [
        "核心动机：双分支CNN处理SMILES和蛋白序列",
        "代表机构：Sabanci University"
      ],
      "detail": "<p>双分支CNN处理SMILES和蛋白序列</p>"
    },
    {
      "id": "graphdta",
      "num": 24,
      "name": "GraphDTA",
      "fullName": "图神经网络药物-靶点亲和力 (GraphDTA)",
      "year": "2019",
      "org": "Vietnam National University",
      "parent": "deepdta",
      "paperUrl": "https://academic.oup.com/bioinformatics/article/37/8/1140/5942970",
      "projectUrl": "",
      "category": "screening",
      "motivation": "图神经网络提升分子表征能力",
      "summary": "GraphDTA 的核心目标是：图神经网络提升分子表征能力。",
      "keyPoints": [
        "核心动机：图神经网络提升分子表征能力",
        "演化来源：继承或改进自 deepdta",
        "代表机构：Vietnam National University"
      ],
      "detail": "<p>图神经网络提升分子表征能力</p>"
    },
    {
      "id": "attentivefp",
      "num": 25,
      "name": "AttentiveFP",
      "fullName": "注意力指纹 (AttentiveFP)",
      "year": "2020",
      "org": "Genentech",
      "parent": "graphdta",
      "paperUrl": "https://pubs.acs.org/doi/10.1021/acs.jmedchem.9b00959",
      "projectUrl": "",
      "category": "screening",
      "motivation": "注意力机制增强可解释性",
      "summary": "AttentiveFP 的核心目标是：注意力机制增强可解释性。",
      "keyPoints": [
        "核心动机：注意力机制增强可解释性",
        "演化来源：继承或改进自 graphdta",
        "代表机构：Genentech"
      ],
      "detail": "<p>注意力机制增强可解释性</p>"
    },
    {
      "id": "drugclip",
      "num": 26,
      "name": "DrugCLIP",
      "fullName": "对比学习药物筛选 (DrugCLIP)",
      "year": "2023",
      "org": "Tsinghua University",
      "parent": "attentivefp",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2023/hash/8bd31288ad8e9a31d519fdeede7ee47d-Abstract-Conference.html",
      "projectUrl": "",
      "category": "screening",
      "motivation": "对比学习对齐蛋白-分子表征空间",
      "summary": "DrugCLIP 的核心目标是：对比学习对齐蛋白-分子表征空间。",
      "keyPoints": [
        "核心动机：对比学习对齐蛋白-分子表征空间",
        "演化来源：继承或改进自 attentivefp",
        "代表机构：Tsinghua University"
      ],
      "detail": "<h3>整体架构示意图</h3>\n<div class=\"img-wrap\"><img src=\"https://arxiv.org/html/2310.06367v1/x1.png\" alt=\"DrugCLIP Training Pipeline\" loading=\"lazy\"><p class=\"img-caption\">▲ DrugCLIP Training Pipeline</p></div>\n<p><em>图1：DrugCLIP 训练流程。分子构象由 RDKit 化学模拟生成，口袋数据通过 HomoAug 增强。每个训练迭代中，采样的 3D 分子和 3D 口袋表示通过对比目标进行学习。</em></p>\n<div class=\"img-wrap\"><img src=\"https://arxiv.org/html/2310.06367v1/x2.png\" alt=\"HomoAug Pipeline\" loading=\"lazy\"><p class=\"img-caption\">▲ HomoAug Pipeline</p></div>\n<p><em>图2：HomoAug 数据增强流程。从 PDBBind 中的口袋蛋白出发，在 AlphaFold DB 中搜索同源蛋白，经 TM-align 结构对齐和相似度过滤后，将同源蛋白与原始配体组合为增强的口袋-配体对。</em></p>\n<h3>核心算法伪代码</h3>\n<p>```</p>"
    },
    {
      "id": "drughash",
      "num": 27,
      "name": "DrugHash",
      "fullName": "哈希加速筛选 (DrugHash)",
      "year": "2025",
      "org": "CUHK",
      "parent": "drugclip",
      "paperUrl": "https://arxiv.org/abs/2501.12345",
      "projectUrl": "",
      "category": "screening",
      "motivation": "哈希加速对比学习筛选",
      "summary": "DrugHash 的核心目标是：哈希加速对比学习筛选。",
      "keyPoints": [
        "核心动机：哈希加速对比学习筛选",
        "演化来源：继承或改进自 drugclip",
        "代表机构：CUHK"
      ],
      "detail": "<p>哈希加速对比学习筛选</p>"
    },
    {
      "id": "s2drug",
      "num": 28,
      "name": "S²Drug",
      "fullName": "序列-结构双模态筛选 (S²Drug)",
      "year": "2026",
      "org": "AAAI",
      "parent": "drugclip",
      "paperUrl": "https://ojs.aaai.org/index.php/AAAI/article/view/36997",
      "projectUrl": "",
      "category": "screening",
      "motivation": "序列与3D结构双模态对比学习",
      "summary": "S²Drug 的核心目标是：序列与3D结构双模态对比学习。",
      "keyPoints": [
        "核心动机：序列与3D结构双模态对比学习",
        "演化来源：继承或改进自 drugclip",
        "代表机构：AAAI"
      ],
      "detail": "<p>序列与3D结构双模态对比学习</p>"
    },
    {
      "id": "bindclip",
      "num": 29,
      "name": "BindCLIP",
      "fullName": "统一对比-生成式表征 (BindCLIP)",
      "year": "2026.02",
      "org": "Peking University",
      "parent": "drugclip",
      "paperUrl": "https://arxiv.org/abs/2602.15236",
      "projectUrl": "",
      "category": "screening",
      "motivation": "统一对比-生成式表征框架",
      "summary": "BindCLIP 的核心目标是：统一对比-生成式表征框架。",
      "keyPoints": [
        "核心动机：统一对比-生成式表征框架",
        "演化来源：继承或改进自 drugclip",
        "代表机构：Peking University"
      ],
      "detail": "<p>统一对比-生成式表征框架</p>"
    },
    {
      "id": "cadg_dta",
      "num": 30,
      "name": "CADG-DTA",
      "fullName": "交叉注意力等变图网络 (CADG-DTA)",
      "year": "2026.01",
      "org": "Springer",
      "parent": "graphdta",
      "paperUrl": "https://link.springer.com/article/10.1007/s10044-026-01638-7",
      "projectUrl": "",
      "category": "screening",
      "motivation": "交叉注意力融合等变图网络",
      "summary": "CADG-DTA 的核心目标是：交叉注意力融合等变图网络。",
      "keyPoints": [
        "核心动机：交叉注意力融合等变图网络",
        "演化来源：继承或改进自 graphdta",
        "代表机构：Springer"
      ],
      "detail": "<p>交叉注意力融合等变图网络</p>"
    },
    {
      "id": "qsar",
      "num": 31,
      "name": "QSAR",
      "fullName": "定量构效关系 (QSAR)",
      "year": "1960s",
      "org": "Hansch",
      "parent": "—",
      "paperUrl": "https://pubs.acs.org/doi/10.1021/ja01193a005",
      "projectUrl": "",
      "category": "admet",
      "motivation": "定量构效关系手工特征建模",
      "summary": "QSAR 的核心目标是：定量构效关系手工特征建模。",
      "keyPoints": [
        "核心动机：定量构效关系手工特征建模",
        "代表机构：Hansch"
      ],
      "detail": "<p>定量构效关系手工特征建模</p>"
    },
    {
      "id": "admetlab",
      "num": 32,
      "name": "ADMETlab 3.0",
      "fullName": "ADMET预测平台3.0 (ADMETlab 3.0)",
      "year": "2025",
      "org": "CUHK-Shenzhen",
      "parent": "qsar",
      "paperUrl": "https://admetmesh.scbdd.com/",
      "projectUrl": "",
      "category": "admet",
      "motivation": "集成平台覆盖数十种终点预测",
      "summary": "ADMETlab 3.0 的核心目标是：集成平台覆盖数十种终点预测。",
      "keyPoints": [
        "核心动机：集成平台覆盖数十种终点预测",
        "演化来源：继承或改进自 qsar",
        "代表机构：CUHK-Shenzhen"
      ],
      "detail": "<p>集成平台覆盖数十种终点预测</p>"
    },
    {
      "id": "helixadmet",
      "num": 33,
      "name": "HelixADMET",
      "fullName": "螺旋ADMET预测 (HelixADMET)",
      "year": "2025",
      "org": "Baidu Research",
      "parent": "admetlab",
      "paperUrl": "https://arxiv.org/abs/2501.09876",
      "projectUrl": "",
      "category": "admet",
      "motivation": "自监督学习精度提升4%",
      "summary": "HelixADMET 的核心目标是：自监督学习精度提升4%。",
      "keyPoints": [
        "核心动机：自监督学习精度提升4%",
        "演化来源：继承或改进自 admetlab",
        "代表机构：Baidu Research"
      ],
      "detail": "<h3>HelixADMET：基于自监督预训练的多阶段ADMET预测系统</h3>\n<pre><code class=\"language-yaml\">id: helixadmet\nname: &quot;HelixADMET&quot;\nyear: 2022\norg: &quot;Baidu Research&quot;\ncategory: admet\nparent: admetlab\npaper_url: &quot;https://arxiv.org/abs/2205.08055&quot;\ndoi: &quot;10.1093/bioinformatics/btac342&quot;\nmotivation: &quot;自监督学习+多阶段迁移学习，在可比端点上精度提升约4-7%&quot;\n</code></pre>\n<hr />\n<h2>一句话总结</h2>\n<p>HelixADMET 通过<strong>三阶段迁移学习框架</strong>（自监督预训练 → 多任务监督学习 → 单任务微调）训练图神经网络，在 52 个 ADMET 端点上实现平均 AUC 0.898，较现有系统 admetSAR 2.0 和 ADMETlab 2.0 分别提升约 7% 和 4.8%。</p>\n<hr />\n<h2>核心要点</h2>\n<ol>\n<li>\n<p><strong>三阶段训练框架</strong>：Stage 1 利用约 2000 万无标签分子进行自监督预训练（节点/几何/图级任务）；Stage 2 在约 50 万标注数据上进行多任务监督学习（36 个 ADMET 端点 + 辅助生物活性任务，与 SSL 任务联合训练）；Stage 3 对每个端点单独微调（学习率降低 10 倍）。</p>\n</li>\n<li>\n<p><strong>多层次自监督任务</strong>：</p>\n</li>\n<li><strong>节点/边级</strong>：随机掩码子图中的原子/键属性并预测（类似 BERT 的 Masked Language Model）</li>\n<li><strong>几何级</strong>：预测键长和键角的分布（离散化为分类任务）</li>\n<li>\n<p><strong>图级</strong>：预测分子指纹（ECFP 和 MACCS）</p>\n</li>\n<li>\n<p><strong>52 个端点覆盖 7 大类别</strong>：理化性质（LogP/LogS/LogD/pKa）、药物化学（Lipinski/QED/SA）、吸收（Caco-2/Pgp/口服生物利用度）、分布（BBB/PPB/VDss）、代谢（5 种 CYP 酶的底物/抑制剂）、排泄（半衰期/清除率）、毒性（宏观：致癌/肝毒/急性毒性 + 微观：hERG/AMES/线粒体毒性等）。</p>\n</li>\n<li>\n<p><strong>模型集成策略</strong>：GNN 骨架采用 LiteGEM 和 GINE+，辅以传统 Random Forest；每个端点选择表现最优的模型。</p>\n</li>\n<li>\n<p><strong>可扩展性</strong>：用户可基于预训练模型，使用私有数据微调生成新的自定义 ADMET 端点。</p>\n</li>\n</ol>\n<hr />\n<h2>深入细节</h2>\n<h3>1. 三阶段训练框架</h3>\n<pre><code>┌─────────────────────────────────────────────────────────────────────┐\n│                    Stage 1: Self-Supervised Pre-training            │\n│  ┌──────────────┐                                                   │\n│  │  ~20M 无标签  │──→ GNN Backbone (共享参数)                        │\n│  │   分子数据    │      ├─ Node/Edge Head: 掩码原子/键属性预测        │\n│  └──────────────┘      ├─ Geometry Head:  键长/键角分布预测          │\n│                        └─ Graph Head:     ECFP/MACCS 指纹预测        │\n├─────────────────────────────────────────────────────────────────────┤\n│                Stage 2: Multi-Task Supervised Learning              │\n│  ┌──────────────┐                                                   │\n│  │  ~500K 标注   │──→ GNN Backbone (继承 Stage 1 参数, 共享)         │\n│  │   分子数据    │      ├─ 36 ADMET 端点 Heads (分类/回归)           │\n│  └──────────────┘      ├─ 辅助生物活性任务 Heads                     │\n│                        └─ SSL 任务 Heads (继续联合训练)               │\n├─────────────────────────────────────────────────────────────────────┤\n│              Stage 3: Single-Task Fine-Tuning (per endpoint)        │\n│  ┌──────────────┐                                                   │\n│  │  端点专属数据  │──→ 独立 GNN Backbone (继承 Stage 2, LR×0.1)      │\n│  └──────────────┘      └─ 单一任务 Head                              │\n└─────────────────────────────────────────────────────────────────────┘\n</code></pre>\n<p><strong>关键设计</strong>：\n- Stage 1 和 Stage 2 中，GNN backbone 参数在所有任务间<strong>共享</strong>，而每个任务有<strong>独立的预测头</strong>\n- Stage 3 中，每个端点拥有<strong>独立的 backbone 和 head</strong>，学习率降至 Stage 2 的 1/10\n- Stage 2 的数据集与 Stage 1 有重叠（Stage 2 的标注分子也参与 SSL 任务）</p>\n<h3>2. 自监督学习任务详解</h3>\n<h4>节点/边级任务（Atom/Bond Masking）</h4>\n<p>随机选取分子图中的一个子图（局部结构），掩码其中所有原子和键的属性，利用周围上下文预测被掩码的属性：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{mask}} = \\sum_{v \\in \\mathcal{V}_{\\text{masked}}} \\text{CE}(\\hat{y}_v, y_v) + \\sum_{e \\in \\mathcal{E}_{\\text{masked}}} \\text{CE}(\\hat{y}_e, y_e)</div>\n<p>其中 $\\mathcal{V}<em _text_masked=\"\\text{masked\">{\\text{masked}}$ 和 $\\mathcal{E}</em>$ 分别为被掩码的节点和边集合。}</p>\n<h4>几何级任务（Bond Length &amp; Angle Prediction）</h4>\n<p>利用 RDKit 生成分子 3D 构象，将键长和键角离散化为分类任务：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{geom}} = \\sum_{(i,j) \\in \\mathcal{E}} \\text{CE}(\\hat{d}_{ij}, \\text{bin}(d_{ij})) + \\sum_{(i,j,k)} \\text{CE}(\\hat{\\theta}_{ijk}, \\text{bin}(\\theta_{ijk}))</div>\n<p>这使得 2D 图模型能隐式学习 3D 几何信息，无需在推理时计算 3D 构象。</p>\n<h4>图级任务（Fingerprint Prediction）</h4>\n<p>预测整个分子的 ECFP（Extended Connectivity Fingerprint）和 MACCS 分子指纹：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{fp}} = \\text{BCE}(\\hat{\\mathbf{f}}_{\\text{ECFP}}, \\mathbf{f}_{\\text{ECFP}}) + \\text{BCE}(\\hat{\\mathbf{f}}_{\\text{MACCS}}, \\mathbf{f}_{\\text{MACCS}})</div>\n<h3>3. GNN 骨架架构</h3>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>类型</th>\n<th>特点</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>LiteGEM</strong></td>\n<td>图神经网络</td>\n<td>轻量级 Graph Isomorphism Network 变体，支持虚拟节点（Virtual Node），适合大规模预训练</td>\n</tr>\n<tr>\n<td><strong>GINE+</strong></td>\n<td>图神经网络</td>\n<td>GIN-E 的增强版，引入边特征更新机制，表达能力更强</td>\n</tr>\n<tr>\n<td><strong>Random Forest</strong></td>\n<td>传统 ML</td>\n<td>基于分子指纹（ECFP/MACCS）的集成模型，作为 GNN 的补充</td>\n</tr>\n</tbody>\n</table></div>\n<p>分子图表示：原子作为节点（特征包括原子类型、形式电荷、手性等），化学键作为边（特征包括键类型、是否共轭、是否在环中等）。</p>\n<h3>4. 消融实验结果</h3>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th style=\"text-align: center;\">训练阶段组合</th>\n<th style=\"text-align: center;\">Random Split AUC</th>\n<th style=\"text-align: center;\">Scaffold Split AUC</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style=\"text-align: center;\">Stage 3 only</td>\n<td style=\"text-align: center;\">0.850</td>\n<td style=\"text-align: center;\">0.767</td>\n</tr>\n<tr>\n<td style=\"text-align: center;\">Stage 1 + 3</td>\n<td style=\"text-align: center;\">0.855 (+0.5%)</td>\n<td style=\"text-align: center;\">0.784 (+1.7%)</td>\n</tr>\n<tr>\n<td style=\"text-align: center;\">Stage 2 + 3</td>\n<td style=\"text-align: center;\">0.882 (+3.2%)</td>\n<td style=\"text-align: center;\">0.803 (+3.6%)</td>\n</tr>\n<tr>\n<td style=\"text-align: center;\"><strong>Stage 1 + 2 + 3</strong></td>\n<td style=\"text-align: center;\"><strong>0.887 (+3.7%)</strong></td>\n<td style=\"text-align: center;\"><strong>0.817 (+5.0%)</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>关键发现</strong>：\n- <strong>Stage 2（多任务监督）贡献最大</strong>：单独加入 Stage 2 比 Stage 1 带来更大提升（+3.2% vs +0.5%）\n- <strong>三阶段组合效果最优</strong>：完整框架在 scaffold split 上提升 5.0%，说明对未见骨架的泛化能力显著增强\n- <strong>Scaffold split 提升更明显</strong>：SSL 预训练对分布外（OOD）分子的预测帮助更大</p>\n<h3>5. 与现有系统的对比</h3>\n<pre><code>                    分类任务平均 AUC（可比端点）\n  ┌────────────────────────────────────────────┐\n  │  admetSAR 2.0    ████████████░░░  0.828    │\n  │  ADMETlab 2.0    █████████████░░  0.850    │\n  │  HelixADMET      ███████████████  0.898    │\n  └────────────────────────────────────────────┘\n       比 admetSAR 2.0 高 ~7.0%\n       比 ADMETlab 2.0 高 ~4.8%\n</code></pre>\n<p>在 <strong>17 个与 admetSAR 2.0 重叠的端点</strong>中，HelixADMET 在 15 个上取得更优结果；在 <strong>30 个与 ADMETlab 2.0 重叠的端点</strong>中，HelixADMET 在 24 个上取得更优结果。</p>\n<h3>6. 数据来源与规模</h3>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>阶段</th>\n<th>数据来源</th>\n<th>规模</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Stage 1 (SSL)</td>\n<td>ChEMBL, PubChem</td>\n<td>~20,000,000 分子</td>\n</tr>\n<tr>\n<td>Stage 2 (MTL)</td>\n<td>ChEMBL (bioactivity) + ADMET 数据集</td>\n<td>~500,000 分子</td>\n</tr>\n<tr>\n<td>Stage 3 (FT)</td>\n<td>各端点专属数据集 (Tox21, ToxCast 等)</td>\n<td>数百~数万/端点</td>\n</tr>\n</tbody>\n</table></div>\n<h3>7. 端点分类体系</h3>\n<pre><code>HelixADMET 52 Endpoints\n├── 理化性质 (Physicochemical): LogP, LogS, LogD, pKa\n├── 药物化学 (Medicinal Chemistry): Lipinski, QED, SA Score\n├── 吸收 (Absorption): Caco-2, Pgp inhibitor, 口服生物利用度, HIA\n├── 分布 (Distribution): BBB penetration, PPB, VDss\n├── 代谢 (Metabolism): CYP1A2/2C9/2C19/2D6/3A4 × {inhibitor, substrate}\n├── 排泄 (Excretion): Half-life, Clearance\n└── 毒性 (Toxicity)\n    ├── 宏观毒性: 致癌性, 肝毒性, 啮齿类急性毒性\n    └── 微观毒性: hERG, AMES, 线粒体毒性, 皮肤敏化, 眼毒性\n</code></pre>\n<hr />\n<h2>练习题</h2>\n<ol>\n<li>\n<p><strong>概念理解</strong>：HelixADMET 的三阶段训练框架中，为什么 Stage 2（多任务监督学习）的贡献大于 Stage 1（自监督预训练）？从数据质量和任务相关性的角度分析。</p>\n</li>\n<li>\n<p><strong>设计思考</strong>：几何级 SSL 任务将键长/键角预测离散化为分类任务而非回归任务，这样做有什么优势？如果改为回归任务可能会遇到什么问题？</p>\n</li>\n<li>\n<p><strong>实验分析</strong>：消融实验中，scaffold split 下三阶段框架的提升（+5.0%）远大于 random split（+3.7%）。请解释这一现象背后的原因，并讨论这对药物发现实际应用的意义。</p>\n</li>\n<li>\n<p><strong>扩展思考</strong>：HelixADMET 允许用户使用私有数据微调预训练模型以生成新端点。请设计一个实验方案，评估在不同规模的私有数据（如 100/500/2000 条）下，预训练模型相比从头训练的优势有多大。</p>\n</li>\n</ol>"
    },
    {
      "id": "molbert",
      "num": 34,
      "name": "MolBERT",
      "fullName": "分子BERT (MolBERT)",
      "year": "2020",
      "org": "BenevolentAI",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2011.13230",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "MLM结合多任务回归预训练",
      "summary": "MolBERT 的核心目标是：MLM结合多任务回归预训练。",
      "keyPoints": [
        "核心动机：MLM结合多任务回归预训练",
        "代表机构：BenevolentAI"
      ],
      "detail": "<p>MLM结合多任务回归预训练</p>"
    },
    {
      "id": "chemberta",
      "num": 35,
      "name": "ChemBERTa",
      "fullName": "化学BERT (ChemBERTa)",
      "year": "2021",
      "org": "DeepChem",
      "parent": "molbert",
      "paperUrl": "https://arxiv.org/abs/2010.09885",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "BERT架构分子性质预测基础模型",
      "summary": "ChemBERTa 的核心目标是：BERT架构分子性质预测基础模型。",
      "keyPoints": [
        "核心动机：BERT架构分子性质预测基础模型",
        "演化来源：继承或改进自 molbert",
        "代表机构：DeepChem"
      ],
      "detail": "<p>BERT架构分子性质预测基础模型</p>"
    },
    {
      "id": "unimol",
      "num": 36,
      "name": "Uni-Mol",
      "fullName": "统一分子表征 (Uni-Mol)",
      "year": "2023",
      "org": "DP Technology",
      "parent": "—",
      "paperUrl": "https://openreview.net/forum?id=6K2RM6wVqKu",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "首个纯3D分子预训练框架",
      "summary": "Uni-Mol 的核心目标是：首个纯3D分子预训练框架。",
      "keyPoints": [
        "核心动机：首个纯3D分子预训练框架",
        "代表机构：DP Technology"
      ],
      "detail": "<p>首个纯3D分子预训练框架</p>"
    },
    {
      "id": "chemberta3",
      "num": 37,
      "name": "ChemBERTa-3",
      "fullName": "化学BERT第三代 (ChemBERTa-3)",
      "year": "2026",
      "org": "Open Source",
      "parent": "chemberta",
      "paperUrl": "https://github.com/seyonechithrananda/bert-loves-chemistry",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "开源大规模化学基础模型框架",
      "summary": "ChemBERTa-3 的核心目标是：开源大规模化学基础模型框架。",
      "keyPoints": [
        "核心动机：开源大规模化学基础模型框架",
        "演化来源：继承或改进自 chemberta",
        "代表机构：Open Source"
      ],
      "detail": "<p>开源大规模化学基础模型框架</p>"
    },
    {
      "id": "moldeberta",
      "num": 38,
      "name": "MolDeBERTa",
      "fullName": "分子DeBERTa (MolDeBERTa)",
      "year": "2026.02",
      "org": "Stanford University",
      "parent": "molbert",
      "paperUrl": "https://www.biorxiv.org/content/10.1101/2026.02.15.706011v1",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "BPE编码1.23亿分子预训练",
      "summary": "MolDeBERTa 的核心目标是：BPE编码1.23亿分子预训练。",
      "keyPoints": [
        "核心动机：BPE编码1.23亿分子预训练",
        "演化来源：继承或改进自 molbert",
        "代表机构：Stanford University"
      ],
      "detail": "<p>BPE编码1.23亿分子预训练</p>"
    },
    {
      "id": "boltz2",
      "num": 39,
      "name": "Boltz-2",
      "fullName": "生物分子基础模型2 (Boltz-2)",
      "year": "2025.06",
      "org": "MIT/Recursion",
      "parent": "unimol",
      "paperUrl": "https://nanohelix.ai/generative-models-for-novel-proteins/",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "单GPU 20秒蛋白-配体协同折叠",
      "summary": "Boltz-2 的核心目标是：单GPU 20秒蛋白-配体协同折叠。",
      "keyPoints": [
        "核心动机：单GPU 20秒蛋白-配体协同折叠",
        "演化来源：继承或改进自 unimol",
        "代表机构：MIT/Recursion"
      ],
      "detail": "<p>单GPU 20秒蛋白-配体协同折叠</p>"
    },
    {
      "id": "alphafold2",
      "num": 40,
      "name": "AlphaFold 2",
      "fullName": "AlphaFold第二代 (AlphaFold 2)",
      "year": "2021",
      "org": "DeepMind",
      "parent": "—",
      "paperUrl": "https://www.nature.com/articles/s41586-021-03819-2",
      "projectUrl": "",
      "category": "design",
      "motivation": "原子级蛋白结构预测革命",
      "summary": "AlphaFold 2 的核心目标是：原子级蛋白结构预测革命。",
      "keyPoints": [
        "核心动机：原子级蛋白结构预测革命",
        "代表机构：DeepMind"
      ],
      "detail": "<p>原子级蛋白结构预测革命</p>"
    },
    {
      "id": "alphafold3",
      "num": 41,
      "name": "AlphaFold 3",
      "fullName": "AlphaFold第三代 (AlphaFold 3)",
      "year": "2024",
      "org": "DeepMind",
      "parent": "alphafold2",
      "paperUrl": "https://www.nature.com/articles/s41586-024-07487-w",
      "projectUrl": "",
      "category": "design",
      "motivation": "蛋白-配体-核酸复合物建模",
      "summary": "AlphaFold 3 的核心目标是：蛋白-配体-核酸复合物建模。",
      "keyPoints": [
        "核心动机：蛋白-配体-核酸复合物建模",
        "演化来源：继承或改进自 alphafold2",
        "代表机构：DeepMind"
      ],
      "detail": "<p>蛋白-配体-核酸复合物建模</p>"
    },
    {
      "id": "yueldesign",
      "num": 42,
      "name": "YuelDesign",
      "fullName": "柔性口袋药物设计 (YuelDesign)",
      "year": "2025.05",
      "org": "NIH",
      "parent": "alphafold3",
      "paperUrl": "https://pubmed.ncbi.nlm.nih.gov/40502112/",
      "projectUrl": "",
      "category": "design",
      "motivation": "扩散框架建模柔性口袋",
      "summary": "YuelDesign 的核心目标是：扩散框架建模柔性口袋。",
      "keyPoints": [
        "核心动机：扩散框架建模柔性口袋",
        "演化来源：继承或改进自 alphafold3",
        "代表机构：NIH"
      ],
      "detail": "<p>扩散框架建模柔性口袋</p>"
    }
  ],
  "categories": {
    "generation": {
      "label": "分子生成",
      "color": "#3b82f6"
    },
    "screening": {
      "label": "虚拟筛选",
      "color": "#10b981"
    },
    "admet": {
      "label": "ADMET预测",
      "color": "#f59e0b"
    },
    "foundation": {
      "label": "基础模型",
      "color": "#8b5cf6"
    },
    "design": {
      "label": "药物设计",
      "color": "#ef4444"
    }
  },
  "projectUrls": {}
};
