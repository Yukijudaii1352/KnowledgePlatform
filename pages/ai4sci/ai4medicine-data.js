/**
 * ai4medicine-data.js — 由 pipeline/build.py 于 2026-06-16 17:00:07 自动生成。
 * 源文件：content/ai4sci/ai4medicine.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "ai4sci",
    "topic_id": "ai4medicine",
    "topic_name": "药学AI",
    "page_title": "药学AI 算法总结",
    "page_subtitle": "2026-06-16 版",
    "page_desc": "药学AI是人工智能在生命科学领域最具变革潜力的应用方向，涵盖从分子生成、虚拟筛选到ADMET预测的全流程药物研发。该领域经历了从传统QSAR到深度学习，再到生成式AI与基础模型的技术演进，2026年已有173个AI原创药物进入临床阶段。",
    "page_icon": "💊",
    "hero_pills": [
      "分子生成 · 虚拟筛选 · ADMET预测 · 药物设计 · 基础模型"
    ],
    "count_pill": "{count} 个算法",
    "image_base": "",
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
      "summary": "REINVENT 将预训练 SMILES RNN 作为 Prior，再用基于目标打分函数的策略梯度微调 Agent，解决了纯最大似然分子生成无法直接按药物性质优化的问题。它的关键不是单纯奖励高分分子，而是用 Prior likelihood 锚定化学合理性，用 augmented likelihood 将目标性质注入生成分布。",
      "keyPoints": [
        "<strong>Prior-Agent 双网络</strong>：Prior 在 ChEMBL 的 RDKit canonical SMILES 上最大似然预训练，Agent 复制 Prior 参数后通过强化学习微调",
        "<strong>序列生成建模为 episodic RL</strong>：一个完整 SMILES 从 GO 到 EOS 视为一条 episode，最终分子打分 <span class=\"kb-math kb-math-inline\">S(A)</span> 作为序列级反馈",
        "<strong>Augmented likelihood 目标</strong>：<span class=\"kb-math kb-math-inline\">\\log P(A)_U = \\log P(A)_{Prior} + \\sigma S(A)</span>，把先验化学分布和用户定义目标函数合成目标策略",
        "<strong>平方差策略损失</strong>：最小化 Agent likelihood 与 augmented likelihood 的距离，避免普通 REINFORCE 只追逐奖励导致的简单无意义结构",
        "<strong>连续/负奖励兼容</strong>：打分函数 <span class=\"kb-math kb-math-inline\">S(A)\\in[-1,1]</span> 可来自规则、相似度、QSAR/SVM 活性模型等，不限于正样本最大似然微调",
        "<strong>三个示范任务</strong>：去除硫原子、生成 Celecoxib 类似物、生成预测为 DRD2 活性的分子",
        "<strong>实验性结论</strong>：Prior 本身生成约 94% 有效 SMILES；DRD2 任务中 Agent 生成样本超过 95% 被模型预测为活性",
        "<strong>主要局限</strong>：仍依赖 SMILES 语法学习和外部打分函数质量，过强奖励可能牺牲多样性或引入打分模型漏洞"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"REINVENT Agent 训练流程\" src=\"https://media.springernature.com/lw685/springer-static/image/art%3A10.1186%2Fs13321-017-0235-x/MediaObjects/13321_2017_235_Fig4_HTML.gif\" />\n<em>图：REINVENT 的 Prior-Agent 流程。Prior 从 ChEMBL 学到 SMILES 语法和药物样分布；Agent 从 Prior 初始化，采样 SMILES 后由 scoring function 打分，并用 augmented likelihood 更新生成策略。来源为 Journal of Cheminformatics 原文 Figure 4。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># REINVENT 强化学习分子生成伪代码\nprior = train_rnn_by_mle(chembl_smiles)   # 3-layer GRU/LSTM style RNN, 学习 SMILES 分布\nagent = copy(prior)                       # Agent 初始策略等于 Prior\n\nfor step in range(num_rl_steps):\n    smiles_batch, logp_agent = agent.sample(batch_size=128, return_logp=True)\n\n    scores = []\n    logp_prior = []\n    for smiles in smiles_batch:\n        mol = rdkit_parse(smiles)\n        score = scoring_function(mol) if mol is not None else invalid_score\n        scores.append(score)              # S(A) in [-1, 1]\n        logp_prior.append(prior.log_likelihood(smiles))\n\n    # 目标 likelihood：Prior 负责保持化学合理性，score 负责推动目标性质\n    augmented = logp_prior + sigma * scores\n\n    # Agent 学习接近 augmented likelihood\n    loss = mean((augmented - logp_agent) ** 2)\n    agent.optimizer.zero_grad()\n    loss.backward()\n    clip_gradients(agent, min_value=-3, max_value=3)\n    agent.optimizer.step()\n\nreturn agent\n</code></pre>\n<h5>动机与背景</h5>\n<p>REINVENT 之前的神经分子生成常见做法是：先训练 RNN 生成类似训练集的 SMILES，再用最大似然在某个小规模活性集合上微调。这个流程能模仿已知化学空间，但对药物发现来说仍有两个硬伤：第一，目标性质通常由连续打分函数给出，例如相似度、活性预测概率、合成可及性或多目标组合，不一定有成批的正样本；第二，直接追逐奖励的 RL 容易学到“投机”字符串，例如很短、简单、但在奖励函数下得分高的分子，导致模型遗忘 Prior 学到的化学语法和药物样分布。</p>\n<p>REINVENT 的设计把分子生成写成一个部分可观测的序列决策问题。状态是当前 RNN hidden state 和已生成前缀，动作是下一个 SMILES token，episode 在 EOS 结束。由于分子性质只有完整 SMILES 解析后才有意义，奖励不逐 token 给出，而是在序列级别计算。这样做允许任何可调用的外部函数成为 <span class=\"kb-math kb-math-inline\">S(A)</span>，例如“是否含硫”“与 Celecoxib 的 Tanimoto 相似度”“DRD2 SVM 活性概率”。</p>\n<h5>Prior、Agent 与 augmented likelihood</h5>\n<p>Prior 是普通语言模型式的 SMILES RNN。给定 token 序列 <span class=\"kb-math kb-math-inline\">A=(a_1,\\dots,a_T)</span>，它定义序列概率：</p>\n<div class=\"kb-math kb-math-display\">P(A)=\\prod_{t=1}^{T}\\pi(a_t\\mid s_t)</div>\n<p>预训练目标是最大化训练 SMILES 的下一 token likelihood，等价于最小化负对数似然：</p>\n<div class=\"kb-math kb-math-display\">J(\\Theta)=-\\sum_{t=1}^{T}\\log P(x^t\\mid x^{t-1},\\ldots,x^1)</div>\n<p>Agent 与 Prior 架构相同，并从 Prior 参数初始化。强化学习阶段的核心公式是 augmented likelihood：</p>\n<div class=\"kb-math kb-math-display\">\\log P(A)_U = \\log P(A)_{Prior} + \\sigma S(A)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">S(A)\\in[-1,1]</span> 是用户定义的分子打分，<span class=\"kb-math kb-math-inline\">\\sigma</span> 控制目标性质相对于 Prior 的强度。如果某个分子打分高，它的目标 log-likelihood 会被抬高；如果打分低，目标 log-likelihood 会被压低。Prior 项则像一个化学语言约束，防止 Agent 远离 ChEMBL 风格的合理分子。</p>\n<p>Agent 最大化的 return 被定义为 Agent likelihood 与 augmented likelihood 的一致性：</p>\n<div class=\"kb-math kb-math-display\">G(A)=-\\left[\\log P(A)_U-\\log P(A)_A\\right]^2</div>\n<p>因此优化时最小化：</p>\n<div class=\"kb-math kb-math-display\">J(\\Theta)=\\left[\\log P(A)_U-\\log P(A)_A\\right]^2</div>\n<div class=\"key-point\">💡 关键：REINVENT 不是把 <span class=\"kb-math kb-math-inline\">S(A)</span> 直接当作 REINFORCE 奖励，而是构造一个“期望的序列概率”。这使高分分子更可能出现，同时仍保留 Prior 对 SMILES 语法、分子尺寸和常见化学结构的约束。</div>\n<h5>训练和推理流程</h5>\n<p>训练时，每一轮由当前 Agent on-policy 采样一批 SMILES。每条序列都会被 Agent 计算 <span class=\"kb-math kb-math-inline\">\\log P(A)_A</span>，也会被冻结的 Prior 计算 <span class=\"kb-math kb-math-inline\">\\log P(A)_{Prior}</span>。随后 RDKit 或外部预测器解析分子并给出 <span class=\"kb-math kb-math-inline\">S(A)</span>。这三项合成损失后反向传播，只更新 Agent，不更新 Prior 和 scoring function。</p>\n<p>推理时不再需要梯度，只需用训练后的 Agent 自回归采样。由于 Agent 的策略已经偏向 augmented likelihood，高分目标会在采样分布中富集。例如在相似度任务中，scoring function 可以写成：</p>\n<div class=\"kb-math kb-math-display\">S(A)=-1+2\\cdot\\frac{\\min(J_{i,j}, k)}{k}</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">J_{i,j}</span> 是生成分子与查询分子的指纹 Jaccard/Tanimoto 相似度，<span class=\"kb-math kb-math-inline\">k</span> 是饱和阈值。超过阈值后不再额外奖励，避免模型只复制查询分子。</p>\n<p>在 DRD2 示例中，作者从 ExCAPE-DB 构建活性/非活性数据，用 ECFP6 指纹和高斯核 SVM 训练活性分类器，再把分类器预测转成 Agent 的目标打分。这个设置展示了 REINVENT 的通用性：只要目标函数能对完整分子返回标量分数，就可以接入同一训练循环。</p>\n<h5>与传统微调和普通 RL 的区别</h5>\n<p>最大似然微调需要一个“期望生成”的样本集合，目标是提高这些样本的 likelihood；REINVENT 不需要先有目标分子集合，只需要 scoring function。普通 REINFORCE 直接最大化 <span class=\"kb-math kb-math-inline\">S(A)</span>，容易把概率质量集中到极少数奖励漏洞上；REINVENT 的 Prior 项持续惩罚那些在化学训练分布下极不可能的序列。与基于规则的 de novo 设计相比，它不需要人工枚举反应或片段替换规则，而是从 SMILES 分布中学习可生成空间，再用 RL 改变采样偏好。</p>\n<h5>局限性与后续影响</h5>\n<p>REINVENT 的有效性强依赖三个因素：SMILES RNN 是否学到足够好的化学语言模型、scoring function 是否真实反映药物设计目标、<span class=\"kb-math kb-math-inline\">\\sigma</span> 是否平衡探索和约束。若 <span class=\"kb-math kb-math-inline\">\\sigma</span> 太小，Agent 变化有限；若太大，模型会牺牲多样性并过拟合打分器。尽管如此，Prior + Agent + scoring function 的接口非常实用，后来许多分子生成系统沿用了这种“预训练生成模型 + 目标驱动微调”的范式。</p>",
      "quiz": {
        "q": "REINVENT 中 augmented likelihood 的主要作用是什么？",
        "options": [
          "把 SMILES 转换成分子图，避免所有语法错误",
          "用 Prior likelihood 锚定化学合理性，同时用打分函数提高目标分子的生成概率",
          "用判别器区分真实分子和生成分子",
          "直接最大化分子量，使生成分子更复杂"
        ],
        "answer": 1,
        "explain": "Augmented likelihood 等于 Prior log-likelihood 加上 sigma 倍目标分数，既保留预训练分布，又把策略推向高分分子。"
      }
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
      "summary": "MolGAN 提出直接在分子图空间训练 GAN：生成器一次性输出邻接张量和原子类型矩阵，判别器与奖励网络用 permutation-invariant 的图卷积读取图结构，从而绕开 SMILES 语法和图 likelihood 中昂贵的节点匹配问题。它进一步把 WGAN-GP 与确定性策略梯度式奖励优化结合，使小分子图生成能同时追求真实性和目标化学性质。",
      "keyPoints": [
        "<strong>图结构生成</strong>：分子表示为节点特征矩阵 <span class=\"kb-math kb-math-inline\">\\mathbf{X}\\in\\mathbb{R}^{N\\times T}</span> 和边类型邻接张量 <span class=\"kb-math kb-math-inline\">\\mathbf{A}\\in\\mathbb{R}^{N\\times N\\times Y}</span>",
        "<strong>一次性非自回归生成</strong>：生成器从高斯噪声 <span class=\"kb-math kb-math-inline\">\\mathbf{z}</span> 经 MLP 直接预测完整分子图，而非逐字符或逐节点生成",
        "<strong>Likelihood-free GAN</strong>：避免图生成 VAE/自回归模型中对节点排列求 likelihood 或图匹配的高成本",
        "<strong>Improved WGAN 训练</strong>：使用 Wasserstein loss 和 gradient penalty 稳定判别器训练",
        "<strong>奖励网络 <span class=\"kb-math kb-math-inline\">\\hat R_\\psi</span></strong>：学习 RDKit 等外部工具给出的非可微化学性质分数，为生成器提供可微梯度",
        "<strong>联合目标</strong>：生成器损失为 <span class=\"kb-math kb-math-inline\">L(\\theta)=\\lambda L_{WGAN}+(1-\\lambda)L_{RL}</span>，平衡数据分布拟合和性质优化",
        "<strong>Relational-GCN 判别器/奖励器</strong>：支持多种键类型，并通过 gated aggregation 聚合为图级表示",
        "<strong>QM9 设置</strong>：最多 9 个重原子，原子类型为 C/O/N/F/padding，键类型为单键/双键/三键/无键",
        "<strong>核心缺陷</strong>：虽然有效率高、训练快，但 GAN 和 RL 目标均不显式鼓励多样性，论文报告明显 mode collapse 风险"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"MolGAN 模型结构\" src=\"https://ar5iv.labs.arxiv.org/html/1805.11973/assets/x2.png\" />\n<em>图：MolGAN 的完整架构。生成器从噪声输出 dense adjacency tensor <span class=\"kb-math kb-math-inline\">\\mathbf{A}</span> 和 annotation matrix <span class=\"kb-math kb-math-inline\">\\mathbf{X}</span>，经采样得到离散分子图；同一分子图输入判别器和奖励网络，二者都基于 Relational-GCN。来源为 arXiv HTML Figure 2。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># MolGAN 训练伪代码\nfor epoch in range(num_epochs):\n    for real_graphs in qm9_loader:\n        # ===== 1. 训练判别器 / critic =====\n        z = torch.randn(batch_size, 32)\n        A_prob, X_prob = generator(z)                 # dense probabilities\n        A_fake, X_fake = discretize_or_relax(A_prob, X_prob)\n\n        d_real = discriminator(real_graphs)\n        d_fake = discriminator((A_fake, X_fake))\n        gp = gradient_penalty(discriminator, real_graphs, (A_fake, X_fake))\n        loss_D = -d_real.mean() + d_fake.mean() + alpha * gp\n        update(discriminator, loss_D)\n\n        # ===== 2. 训练奖励网络 =====\n        with torch.no_grad():\n            rdkit_reward = external_reward((A_fake, X_fake))  # invalid graph -&gt; 0\n        pred_reward = reward_network((A_fake, X_fake))\n        loss_R = mse_loss(pred_reward, rdkit_reward)\n        update(reward_network, loss_R)\n\n        # ===== 3. 训练生成器 =====\n        z = torch.randn(batch_size, 32)\n        A_prob, X_prob = generator(z)\n        A_fake, X_fake = differentiable_sample(A_prob, X_prob)  # continuous/Gumbel/ST\n\n        wgan_loss = -discriminator((A_fake, X_fake)).mean()\n        rl_loss = -reward_network((A_fake, X_fake)).mean()\n        loss_G = lambda_ * wgan_loss + (1 - lambda_) * rl_loss\n        update(generator, loss_G)\n</code></pre>\n<h5>动机与背景</h5>\n<p>SMILES 生成模型把分子转成字符串，因此 RNN/Transformer 必须同时学习化学语义、SMILES 语法和同一分子多种字符串排列的歧义。图生成模型更接近分子的本体表示，但 likelihood-based 图模型也有难点：邻接矩阵依赖节点顺序，若要对所有等价节点排列求 likelihood，复杂度会迅速爆炸；若做图匹配，训练也很昂贵。MolGAN 的切入点是使用隐式生成模型：GAN 不需要显式 likelihood，因此判别器只要对节点置换不敏感，生成器就不必为每一种节点顺序分配概率。</p>\n<p>MolGAN 关注的是小分子图，尤其是 QM9。每个分子被固定到最多 <span class=\"kb-math kb-math-inline\">N=9</span> 个节点，节点 one-hot 表示原子类型，边 one-hot 表示键类型：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{X}=[\\mathbf{x}_1,\\ldots,\\mathbf{x}_N]^T\\in\\mathbb{R}^{N\\times T},\\qquad\n\\mathbf{A}_{ij}\\in\\mathbb{R}^{Y}</div>\n<p>在论文实验中 <span class=\"kb-math kb-math-inline\">T=5</span>（C、O、N、F 和 padding），<span class=\"kb-math kb-math-inline\">Y=4</span>（单键、双键、三键和无键）。这种固定尺寸设计让生成器可以用简单 MLP 一次性输出整张图，代价是难以直接扩展到大分子。</p>\n<h5>生成器：一次性输出分子图</h5>\n<p>生成器 <span class=\"kb-math kb-math-inline\">G_\\theta</span> 输入 <span class=\"kb-math kb-math-inline\">D=32</span> 维标准正态噪声：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{z}\\sim\\mathcal{N}(\\mathbf{0},\\mathbf{I})</div>\n<p>经过隐藏层大小为 <span class=\"kb-math kb-math-inline\">[128,256,512]</span> 的 MLP 后，线性投影到节点类型矩阵和边类型张量的尺寸，并在最后一维 softmax，得到每个节点/边的类别概率。生成真实分子时需要把这些概率离散化为 one-hot：</p>\n<div class=\"kb-math kb-math-display\">\\tilde{\\mathbf{X}}_i\\sim\\mathrm{Cat}(\\mathbf{X}_i),\\qquad\n\\tilde{\\mathbf{A}}_{ij}\\sim\\mathrm{Cat}(\\mathbf{A}_{ij})</div>\n<p>离散采样不可微，因此论文比较了三种训练近似：直接把连续 <span class=\"kb-math kb-math-inline\">\\mathbf{X},\\mathbf{A}</span> 送入判别器；加入 Gumbel 噪声但仍传连续值；使用 Gumbel-Softmax/straight-through，在前向传播用离散样本，反向传播用连续松弛值。</p>\n<h5>判别器和奖励网络：Relational-GCN 读取多键图</h5>\n<p>判别器 <span class=\"kb-math kb-math-inline\">D_\\phi</span> 与奖励网络 <span class=\"kb-math kb-math-inline\">\\hat R_\\psi</span> 架构相同但不共享参数。二者都用 Relational-GCN 处理多种键类型。节点 <span class=\"kb-math kb-math-inline\">i</span> 在第 <span class=\"kb-math kb-math-inline\">\\ell</span> 层的更新为：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{h}&#x27;^{(\\ell+1)}_i =\nf_s^{(\\ell)}(\\mathbf{h}^{(\\ell)}_i,\\mathbf{x}_i)\n+ \\sum_{j=1}^{N}\\sum_{y=1}^{Y}\n\\frac{\\tilde{\\mathbf{A}}_{ijy}}{|\\mathcal{N}_i|}\nf_y^{(\\ell)}(\\mathbf{h}^{(\\ell)}_j,\\mathbf{x}_j)</div>\n<div class=\"kb-math kb-math-display\">\\mathbf{h}^{(\\ell+1)}_i=\\tanh(\\mathbf{h}&#x27;^{(\\ell+1)}_i)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">f_y</span> 是键类型 <span class=\"kb-math kb-math-inline\">y</span> 专属的仿射变换，<span class=\"kb-math kb-math-inline\">f_s</span> 是 self-connection。多层传播后，用 gated aggregation 得到图级向量：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{h}&#x27;_{\\mathcal{G}} =\n\\sum_{v\\in\\mathcal{V}}\n\\sigma(i(\\mathbf{h}^{(L)}_v,\\mathbf{x}_v))\n\\odot\n\\tanh(j(\\mathbf{h}^{(L)}_v,\\mathbf{x}_v))</div>\n<div class=\"kb-math kb-math-display\">\\mathbf{h}_{\\mathcal{G}}=\\tanh(\\mathbf{h}&#x27;_{\\mathcal{G}})</div>\n<p>这个聚合对节点顺序求和，因此天然具有 permutation invariance。判别器输出实数 critic score；奖励网络输出 <span class=\"kb-math kb-math-inline\">(0,1)</span> 范围的性质预测值。</p>\n<h5>WGAN-GP 与 RL 联合损失</h5>\n<p>MolGAN 使用 Improved WGAN。判别器/critic 对一对真实样本 <span class=\"kb-math kb-math-inline\">\\mathbf{x}</span> 与生成样本 <span class=\"kb-math kb-math-inline\">G_\\theta(\\mathbf{z})</span> 的损失为：</p>\n<div class=\"kb-math kb-math-display\">L_D =\n-D_\\phi(\\mathbf{x})\n+D_\\phi(G_\\theta(\\mathbf{z}))\n+\\alpha\\left(\\left\\|\\nabla_{\\hat{\\mathbf{x}}}D_\\phi(\\hat{\\mathbf{x}})\\right\\|-1\\right)^2</div>\n<p>其中：</p>\n<div class=\"kb-math kb-math-display\">\\hat{\\mathbf{x}}=\\epsilon\\mathbf{x}+(1-\\epsilon)G_\\theta(\\mathbf{z}),\\qquad\n\\epsilon\\sim\\mathcal{U}(0,1)</div>\n<p>奖励网络通过均方误差拟合外部工具给出的真实奖励：</p>\n<div class=\"kb-math kb-math-display\">L_R(\\psi)=\\left(\\hat R_\\psi(\\mathcal{G})-R(\\mathcal{G})\\right)^2</div>\n<p>对于无效图，由于无法计算化学性质，论文把奖励设为 0。生成器最终优化 WGAN 和 RL 的线性组合：</p>\n<div class=\"kb-math kb-math-display\">L_G(\\theta)=\\lambda L_{WGAN}(\\theta)+(1-\\lambda)L_{RL}(\\theta)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\lambda\\in[0,1]</span> 控制“像训练集”与“高性质分”的权衡。论文还指出奖励网络需要先预训练若干 epoch；否则早期不准确的奖励梯度会把生成器带偏。</p>\n<div class=\"warn-box\">⚠️ 注意：MolGAN 的“RL”不是 REINFORCE 式采样回报，而是把生成器看作确定性策略，把奖励网络看作可微 critic，从 <span class=\"kb-math kb-math-inline\">\\hat R_\\psi(G_\\theta(\\mathbf{z}))</span> 直接反向传播到生成器。</div>\n<h5>实验结果和方法差异</h5>\n<p>在 QM9 基准上，MolGAN 与 CharacterVAE、GrammarVAE、GraphVAE 等方法比较，论文报告 MolGAN 的 validity 可达到约 98% 以上，并且在多个单性质优化任务中能比 ORGAN 更快训练。MolGAN 的优势来自两个方面：图表示避免了 SMILES 语法错误；一次性生成避免了序列模型长 rollout 和 REINFORCE 高方差。</p>\n<p>但 MolGAN 的弱点也非常明确：唯一性/多样性偏低，容易 mode collapse。论文用 early stopping 和 unique score 阈值作为简单缓解，但没有从目标函数上解决多样性。因此，MolGAN 更像是“图 GAN 分子生成”的早期里程碑：它证明了图空间 GAN + 可微奖励优化可行，但也暴露了 GAN 在离散小化学空间中覆盖分布困难的问题。</p>",
      "quiz": {
        "q": "MolGAN 为什么选择 GAN 这类 likelihood-free 方法来生成分子图？",
        "options": [
          "因为 GAN 可以自动保证所有生成分子都可合成",
          "因为图 likelihood 需要处理节点排列/图匹配，显式 likelihood 成本很高",
          "因为 SMILES 不能表示含环分子",
          "因为奖励网络只能用于字符串模型"
        ],
        "answer": 1,
        "explain": "分子图的邻接矩阵依赖节点顺序，显式 likelihood 需要处理排列不变性。MolGAN 用 GAN 避开 likelihood，并让判别器/奖励器通过图卷积和聚合实现节点置换不变。"
      }
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
      "summary": "MolGPT 将 decoder-only GPT 架构用于 SMILES 自回归生成，通过 masked self-attention 学习长程语法依赖，并把分子性质向量和 Bemis-Murcko scaffold token 作为条件前缀，实现可控的性质条件与 scaffold 条件分子生成。相比 REINVENT 依赖外部奖励微调，MolGPT 把“按条件生成”直接写进语言模型训练目标。",
      "keyPoints": [
        "<strong>GPT-style Transformer decoder</strong>：8 个 decoder block，每个 block 包含 masked multi-head self-attention 和前馈网络",
        "<strong>小型参数规模</strong>：token/位置/segment 嵌入均为 256 维，前馈隐藏层为 1024 维，总参数量约 6M",
        "<strong>下一 token 预测训练</strong>：SMILES 通过 tokenizer 切分，模型以 causal mask 预测下一个 token",
        "<strong>条件生成机制</strong>：性质条件经线性层映射到 256 维后拼接到 SMILES 嵌入前；scaffold 条件用同一 SMILES token embedding 编码后作为前缀",
        "<strong>支持多性质控制</strong>：论文使用 logP、SAS、TPSA、QED 等属性，并测试单性质和多性质条件生成",
        "<strong>支持 scaffold + property 联合条件</strong>：在 MOSES scaffold 测试集上，生成分子保持目标骨架并控制性质",
        "<strong>两个基准数据集</strong>：MOSES 约 1.9M lead-like 分子，GuacaMol 约 1.6M ChEMBL 分子",
        "<strong>解释性分析</strong>：使用输入 saliency map 展示模型在生成环闭合、支链和原子 token 时关注的历史 token",
        "<strong>评估指标完整</strong>：validity、uniqueness、novelty、internal diversity、FCD、KL divergence、scaffold similarity ratio 等"
      ],
      "detail": "<h5>图示与可访问来源</h5>\n<p><img alt=\"MolGPT 训练流水线和模型架构，见 PDF 第 2 页 Figure 2/3\" src=\"https://cdn.iiit.ac.in/cdn/hai.iiit.ac.in/assets/img/publication/journal/2021/molgpt.pdf#page=2\" />\n<em>图示来源说明：ACS 论文页面的图片资源需要页面脚本/权限环境，不适合作为稳定图片直链；本文引用作者机构托管的可访问 PDF。PDF 第 2 页包含 Figure 2（训练与生成 pipeline）和 Figure 3（MolGPT 架构），PubMed 页面也可访问摘要与 DOI 元信息：https://pubmed.ncbi.nlm.nih.gov/34694798/。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># MolGPT 条件分子生成伪代码\nfor batch in dataloader:\n    smiles = batch[&quot;smiles&quot;]\n    tokens = smiles_tokenizer(smiles)             # [B, L]\n\n    token_emb = token_embedding(tokens)           # [B, L, 256]\n    pos_emb = position_embedding(arange(L))       # [L, 256]\n    seg_emb = segment_embedding(smiles_segment)   # [B, L, 256]\n    x = token_emb + pos_emb + seg_emb\n\n    prefixes = []\n    if use_property_condition:\n        prop = normalize(batch[&quot;logP_SAS_TPSA_QED&quot;])\n        prop_emb = property_linear(prop)          # [B, 1, 256] or multiple condition slots\n        prefixes.append(prop_emb)\n\n    if use_scaffold_condition:\n        scaffold_tokens = smiles_tokenizer(batch[&quot;scaffold&quot;])\n        scaffold_emb = token_embedding(scaffold_tokens)\n        scaffold_emb += segment_embedding(scaffold_segment)\n        prefixes.append(scaffold_emb)\n\n    model_input = concat(prefixes + [x[:, :-1]], dim=1)\n    logits = transformer_decoder(model_input, causal_mask=True)\n\n    # 只对 SMILES next-token 部分计算交叉熵\n    loss = cross_entropy(logits_for_smiles_positions, tokens[:, 1:])\n    update(model, loss)\n\n\ndef generate(condition=None, scaffold=None, max_len=128, temperature=1.0):\n    context = encode_condition_prefix(condition, scaffold)\n    token = weighted_random_first_token(training_first_token_freq)\n    generated = [token]\n\n    for _ in range(max_len):\n        logits = model(context + embed(generated), causal_mask=True)[-1]\n        next_token = sample(softmax(logits / temperature))\n        generated.append(next_token)\n        if next_token == &quot;&lt;eos&gt;&quot;:\n            break\n\n    return detokenize(generated)\n</code></pre>\n<h5>动机与背景</h5>\n<p>SMILES 是离散字符串，天然适合语言模型，但分子生成比普通文本更依赖长程约束。例如括号必须匹配、环编号必须闭合、原子价态要满足化学规则。早期 RNN 生成模型可以学习局部 token 规律，但捕捉长距离依赖相对困难；REINVENT 一类方法再用 RL 将分布推向高分分子，却需要设计外部奖励和调参。MolGPT 的核心思路是：直接把 GPT 的 causal self-attention 用到 SMILES，先学好下一 token 分布，再通过条件前缀让模型在生成时“看到”目标属性或 scaffold。</p>\n<p>论文使用两个成熟基准。MOSES 由约 1.9M 个 lead-like ZINC 分子组成，适合评估标准分子生成和 scaffold 条件生成；GuacaMol 来自 ChEMBL，约 1.6M 分子，属性分布更宽，适合测试性质条件控制。论文用 RDKit 计算 logP、SAS、TPSA、QED，并提取 Bemis-Murcko scaffolds。</p>\n<h5>Transformer decoder 结构</h5>\n<p>MolGPT 是 mini GPT。每个 SMILES token 先映射到 256 维，位置嵌入和 segment 嵌入也映射到 256 维，三者相加作为输入：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{e}_t =\n\\mathbf{e}^{token}_t\n+\\mathbf{e}^{pos}_t\n+\\mathbf{e}^{seg}_t</div>\n<p>segment embedding 的作用是在条件训练时区分“这是条件 token/向量”还是“这是分子 SMILES token”。模型包含 8 个 decoder block。每个 block 中，masked self-attention 输出 256 维向量，前馈网络先扩展到 1024 维，经过 GELU，再投回 256 维。</p>\n<p>Scaled dot-product attention 的核心公式为：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{Attention}(Q,K,V)=\n\\mathrm{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}+M\\right)V</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">M</span> 是 causal mask：当前位置只能关注当前位置及其之前的 token，不能偷看未来 token。多头注意力并行计算多个 <span class=\"kb-math kb-math-inline\">Q,K,V</span> 子空间，再拼接输出，使模型能同时关注环编号、支链括号、芳香环片段和性质/scaffold 条件。</p>\n<p>训练目标是标准自回归交叉熵：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{LM}\n=-\\sum_{t=1}^{L}\\log p_\\theta(x_t\\mid x_{&lt;t}, c)</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">c</span> 可以为空，也可以是性质向量、scaffold token，或二者组合。</p>\n<h5>条件生成机制</h5>\n<p>MolGPT 的条件不是后验打分筛选，而是直接输入模型。性质条件先归一化，再通过可训练线性层映射到 256 维表示，拼接在 SMILES token 序列之前：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{c}_{prop}=W_p\\mathbf{p}+\\mathbf{b}_p</div>\n<p>scaffold 条件则使用与 SMILES 相同的 tokenizer 和 token embedding。直觉上，性质向量告诉模型“目标在哪里”，scaffold token 告诉模型“核心骨架必须长什么样”。生成时给定条件前缀和起始 token，模型逐 token 采样直到 EOS。</p>\n<p>这种设计与 REINVENT 有明显区别。REINVENT 生成完整分子后才由 scoring function 打分，再通过 RL 调整策略；MolGPT 在每一步生成时都能通过注意力访问条件前缀，因此条件会影响所有后续 token 的概率分布。对 scaffold 条件尤其重要：模型可以在生成支链和环闭合时持续参考 scaffold token，而不是生成后再过滤。</p>\n<h5>训练、评价和实验发现</h5>\n<p>论文训练 10 个 epoch，优化器为 Adam，学习率 <span class=\"kb-math kb-math-inline\">6\\times10^{-4}</span>。无条件生成时，MolGPT 在 MOSES 上达到接近 0.994 的 validity 和 1.0 的 unique@10K；在 GuacaMol 上达到约 0.981 validity、0.998 uniqueness、1.0 novelty，并在 FCD/KL 等分布指标上与强基线相当或更优。</p>\n<p>条件生成部分更能体现 MolGPT 的贡献。单性质与多性质条件下，生成分子的属性分布会围绕用户给定值集中；scaffold 条件下，论文随机选取 MOSES 测试 scaffold，为每个 scaffold 生成 100 个分子，并计算生成分子 scaffold 与条件 scaffold 的 Tanimoto 相似度。论文报告所有 scaffolds 的 similarity ratio 都高于 0.8，且精确保留条件 scaffold 的比例约 0.9897。联合 scaffold + property 条件时，性质控制会更难，因为 scaffold 本身限制可行化学空间，但模型仍能在保持核心骨架的同时移动属性分布。</p>\n<h5>Saliency map 的解释性</h5>\n<p>MolGPT 使用 saliency map 分析生成过程：对某个待生成 token，计算历史 token 对该输出的影响强度。论文示例显示，在生成氧原子时模型关注前面的双键和氮原子；生成支链相关 token 时关注括号平衡；生成环编号时关注非芳香环内邻近 token；生成芳香碳时关注尚未闭合的芳香环。这说明模型不是只记忆局部 n-gram，而是在一定程度上学习了 SMILES 的长程语法和化学约束。</p>\n<div class=\"key-point\">💡 关键：MolGPT 的优势来自“条件前缀 + causal attention”的组合。条件负责控制目标，attention 负责在长 SMILES 序列中传播这些约束。</div>\n<h5>局限性</h5>\n<p>MolGPT 仍是 SMILES 语言模型，因此不能像 JT-VAE 或 SELFIES 那样从表示层面保证 100% 有效。属性条件也不是硬约束，给定目标值过于极端或与 scaffold 冲突时，模型只能在训练分布附近折中。此外，模型没有显式 3D 构象、蛋白口袋或可合成路线信息，生成分子还需要后续 ADMET、合成可及性和实验验证。</p>",
      "quiz": {
        "q": "MolGPT 实现 scaffold 条件生成的关键方式是什么？",
        "options": [
          "先无条件生成大量分子，再用 RDKit 过滤出含目标 scaffold 的分子",
          "将 scaffold SMILES token 编码为条件前缀，使自回归生成每一步都能通过注意力访问该条件",
          "用强化学习奖励惩罚不含目标 scaffold 的分子",
          "把分子图邻接矩阵输入 Relational-GCN 生成 SMILES"
        ],
        "answer": 1,
        "explain": "MolGPT 将 scaffold token 嵌入拼接到序列前端，并用 masked self-attention 在生成过程中持续参考条件，因此能直接进行 scaffold 条件生成。"
      }
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
      "summary": "ChemGPT 将 GPT 风格的自回归语言模型迁移到分子字符串建模中，用 SELFIES/SMILES token 序列学习小分子的生成分布，并系统研究模型规模、数据规模和训练超参数对化学语言模型损失的缩放规律。",
      "keyPoints": [
        "<strong>GPT-Neo/GPT-3 风格分子语言模型</strong>：把一个分子表示为 SELFIES 或 SMILES token 序列，用 decoder-only Transformer 预测下一个 token",
        "<strong>化学有效性优先的表示</strong>：论文主实验使用 SELFIES tokenization，利用 SELFIES 的化学约束降低无效分子生成风险，同时说明模型也可换用 SMILES",
        "<strong>大规模缩放实验</strong>：训练从小模型到超过 10 亿非 embedding 参数的 ChemGPT，并使用最多 1000 万个 PubChem 分子研究预训练损失",
        "<strong>训练目标简单但可扩展</strong>：核心目标是 causal language modeling 的交叉熵，即最大化 <span class=\"kb-math kb-math-inline\">p(s_i \\mid s_{&lt;i})</span>",
        "<strong>训练速度估计加速 HPO</strong>：用 early training loss 预测最终收敛 loss，提前淘汰较差 learning rate/batch size 配置，降低大规模化学模型调参成本",
        "<strong>经验缩放规律</strong>：验证化学语言模型 loss 会随模型参数、数据量和 compute 增加而下降，并观察到类似 power-law 或 broken power-law 的区域",
        "<strong>来源限制</strong>：任务给定的 arXiv 链接当前指向一篇 open-set recognition 论文；本文方法解读追溯到 ChemGPT 对应的开放论文页 <code>https://www.nature.com/articles/s42256-023-00740-3</code> 和 ChemRxiv 预印本 <code>https://chemrxiv.org/doi/10.26434/chemrxiv-2022-3s512</code>"
      ],
      "detail": "<h5>论文图示与可访问来源</h5>\n<p><img alt=\"ChemGPT 缩放实验总览\" src=\"https://media.springernature.com/lw1200/springer-static/image/art%3A10.1038%2Fs42256-023-00740-3/MediaObjects/42256_2023_740_Fig1_HTML.png\" />\n<em>图：ChemGPT 被放在“化学语言模型 + 神经力场”的统一缩放实验框架中。核心流程是先用训练速度估计筛选超参数，再在模型规模和数据规模维度上训练大模型并拟合 neural scaling relation。</em></p>\n<p><img alt=\"ChemGPT 模型规模与数据规模缩放曲线\" src=\"https://media.springernature.com/lw1200/springer-static/image/art%3A10.1038%2Fs42256-023-00740-3/MediaObjects/42256_2023_740_Fig4_HTML.png\" />\n<em>图：ChemGPT validation loss 随模型参数量和数据规模变化而下降。图中显示数据量越大、模型越大，next-token prediction loss 通常越低，但在不同区间会出现收益递减。</em></p>\n<h5>算法核心流程</h5>\n<pre><code class=\"language-python\"># ChemGPT 预训练与缩放实验伪代码\ndatasets = sample_pubchem_subsets(max_molecules=10_000_000)\nmodel_sizes = [small, medium, large, billion_scale]\ncandidate_hparams = grid(learning_rate, batch_size)\n\nfor hparams in candidate_hparams:\n    model = ChemGPT(size=&quot;probe&quot;, tokenizer=&quot;SELFIES&quot;)\n    partial_curve = train_for_first_epochs(\n        model,\n        data=sample(datasets, molecules=2_000_000),\n        hparams=hparams,\n    )\n    predicted_final_loss = training_speed_estimator(partial_curve)\n    keep_if_promising(hparams, predicted_final_loss)\n\nbest_hparams = select_lowest_predicted_loss(candidate_hparams)\n\nfor data_size in datasets:\n    tokenized = SELFIES_tokenize(data_size)\n    for model_size in model_sizes:\n        model = GPTNeoLikeDecoder(\n            num_parameters=model_size,\n            causal_attention=True,\n        )\n        for batch in dataloader(tokenized, best_hparams):\n            logits = model(batch.input_tokens[:, :-1])\n            target = batch.input_tokens[:, 1:]\n            loss = cross_entropy(logits, target)\n            loss.backward()\n            optimizer.step()\n\n        record_validation_loss(model_size, data_size, loss)\n\n# 生成阶段\nprefix = [BOS]\nfor t in range(max_len):\n    probs = softmax(model(prefix)[-1] / temperature)\n    next_token = sample(probs, top_p=0.95)\n    prefix.append(next_token)\n    if next_token == EOS:\n        break\nmolecule = SELFIES_decode(prefix)\n</code></pre>\n<h5>动机与背景</h5>\n<p>MolGPT 等早期分子 Transformer 已经证明 GPT 结构可以学习 SMILES 语法并生成分子，但它们通常在百万级以下数据、百万级参数模型上评估。ChemGPT 的核心问题不是提出复杂的新生成头，而是回答一个更基础的问题：化学语言模型是否像自然语言模型一样能从更大模型、更大数据和更多 compute 中持续受益。</p>\n<p>这个问题对药物设计很关键。若自回归模型只是在小数据上记住常见官能团，那么继续放大参数没有太大意义；如果预训练 loss 和生成质量随规模有稳定改善，就说明可以把分子生成模型做成可复用的化学 foundation model，再通过条件约束、奖励模型或实验反馈做定向优化。</p>\n<h5>表示与自回归建模</h5>\n<p>ChemGPT 把分子 <span class=\"kb-math kb-math-inline\">x</span> 写成 token 序列：</p>\n<div class=\"kb-math kb-math-display\">x = (s_1, s_2, \\ldots, s_n)</div>\n<p>自回归语言模型把分子概率分解为逐 token 条件概率：</p>\n<div class=\"kb-math kb-math-display\">p_\\theta(x)=\\prod_{i=1}^{n}p_\\theta(s_i \\mid s_1,\\ldots,s_{i-1})</div>\n<p>训练时最小化 next-token cross entropy：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{CLM}}(\\theta)\n=-\\sum_{x \\in \\mathcal{D}}\\sum_{i=1}^{|x|}\n\\log p_\\theta(s_i \\mid s_{&lt;i})</div>\n<p>这里的关键不是公式新颖，而是它把分子生成变成了标准语言建模问题：decoder-only Transformer 只看左侧上下文，用 causal attention 学习 token 之间的长程依赖。对 SELFIES 来说，token 本身带有价键约束，随机采样后更容易解码成有效分子；对 SMILES 来说，模型需要自己学会括号、环编号、芳香性符号等语法规律。</p>\n<h5>模型机制</h5>\n<p>ChemGPT 基于 GPT-Neo/GPT-3 风格 decoder-only Transformer：输入 token 先映射为 embedding，加上位置信息后进入多层 masked self-attention block。每层用 causal mask 阻止当前位置看到未来 token，因此第 <span class=\"kb-math kb-math-inline\">i</span> 个位置只能利用 <span class=\"kb-math kb-math-inline\">s_{&lt;i}</span> 预测 <span class=\"kb-math kb-math-inline\">s_i</span>。</p>\n<p>模型生成分子时从起始 token 开始递推采样。温度、top-k/top-p 或 beam search 会改变探索性：温度较高时更容易产生新颖结构，但也可能偏离训练分布；温度较低时更像训练集中高概率分子，novelty 通常下降。ChemGPT 的贡献之一是把这些现象放在 scale 维度下看，而不是只报告单个模型的一组生成指标。</p>\n<div class=\"key-point\">💡 关键：ChemGPT 的“化学知识”主要来自大规模自监督 token 统计，而不是显式 3D 几何或反应规则；因此它适合作为分子字符串生成底座，但仍需要外部分子验证、性质模型或实验闭环来完成药物发现任务。</div>\n<h5>缩放规律与训练速度估计</h5>\n<p>论文采用 neural scaling 的视角分析预训练 loss。经典形式可以写成：</p>\n<div class=\"kb-math kb-math-display\">L(R)=\\alpha R^{-\\beta}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">R</span> 可以是模型参数量、数据量或 compute，<span class=\"kb-math kb-math-inline\">\\beta</span> 表示扩展资源带来的 loss 改善速度。实际化学模型中可能出现 broken scaling：某一段近似幂律，另一段因为数据不足或模型容量不足而收益变缓。</p>\n<p>ChemGPT 还使用 training speed estimation 来减少超参数搜索成本。直觉是：如果一个学习率和 batch size 在早期训练曲线中已经明显落后，它在完整训练后也很可能落后。可把早期曲线特征 <span class=\"kb-math kb-math-inline\">g(\\mathcal{C}_{0:T})</span> 映射到最终 loss：</p>\n<div class=\"kb-math kb-math-display\">\\hat{L}_{\\text{final}} = a \\cdot g(\\mathcal{C}_{0:T}) + b</div>\n<p>在论文实验中，早期 20% 训练预算就能较好预测最终 loss，从而把大模型 HPO 从“完整训练所有配置”改成“短训筛选 + 全训少量候选”。这对十亿参数化学模型很实用，因为一次错误的 learning rate 选择就会消耗大量 GPU 时间。</p>\n<h5>与 MolGPT 的关系</h5>\n<p>MolGPT 更像“把 GPT 用于分子生成并做条件控制”的早期示范，关注 scaffold、性质 token 或条件生成任务。ChemGPT 的重点转向 foundation model 的工程科学问题：模型要多大、数据要多大、超参数如何迁移、化学领域是否存在类似 NLP 的缩放收益。</p>\n<p>因此 ChemGPT 可以被看作 MolGPT 之后的规模化版本：基础训练目标仍是 next-token prediction，但研究对象从单个生成任务扩展到“化学语言模型能否通过规模化获得更强、更稳定的分子分布建模能力”。</p>\n<h5>局限性</h5>\n<p>ChemGPT 仍然是分子字符串模型，不直接建模构象、蛋白口袋、反应可合成性或实验噪声。SELFIES 提高了语法有效性，但不等于生成分子一定有合适药效、ADMET 或合成路线。论文也主要从预训练 loss 和缩放规律出发，并不等价于证明所有下游药物设计任务都会随参数规模单调提升。</p>",
      "quiz": {
        "q": "ChemGPT 中自回归语言建模目标的核心作用是什么？",
        "options": [
          "直接最小化分子的合成路线长度",
          "预测下一个 SELFIES/SMILES token，从而学习分子字符串的生成分布",
          "用 3D 坐标约束每个原子的空间位置",
          "通过 docking score 端到端训练蛋白-配体结合"
        ],
        "answer": 1,
        "explain": "ChemGPT 的基础训练目标是 causal language modeling：给定前缀 token 预测下一个 token。它学习的是分子字符串分布，后续生成或优化需要额外采样策略和性质评估。"
      }
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
      "summary": "GP-MoLFormer 是 IBM 提出的 46.8M 参数 decoder-only 分子语言模型，在 6.5 亿到 11 亿条 canonical SMILES 上用因果语言建模预训练，并通过 scaffold prompt 和 pair-tuning 支持从无条件生成到性质优化的分子设计任务。",
      "keyPoints": [
        "<strong>大规模自回归 SMILES 生成器</strong>：使用 MoLFormer block 的 decoder-only 版本，在 PubChem + ZINC 的 11 亿 SMILES 上预训练",
        "<strong>高效 Transformer 结构</strong>：12 层、12 个 attention heads、hidden size 768，结合 linear attention 和 rotary positional embedding 降低长序列训练成本",
        "<strong>两种数据版本</strong>：GP-MoLFormer 使用 1.1B SMILES；GP-MoLFormer-Uniq 使用去重后的 650M SMILES，减少重复分子带来的 memorization",
        "<strong>无额外训练的 scaffold decoration</strong>：把 scaffold 的 randomized SMILES 作为前缀，让 causal decoder 自然补全侧链和片段",
        "<strong>pair-tuning 性质优化</strong>：只学习 20 个 soft prompt embeddings，用“低性质 seed 分子 → 高性质 target 分子”的有序分子对引导生成方向",
        "<strong>三类评估任务</strong>：de novo generation、scaffold-constrained molecular decoration、QED/penalized logP/DRD2 的 property-guided optimization",
        "<strong>规模化生成分析</strong>：报告 30K 到 10B 生成规模下的 novelty、validity、uniqueness，并指出训练数据重复会提高记忆化、降低新颖性"
      ],
      "detail": "<h5>模型图示</h5>\n<p><img alt=\"GP-MoLFormer 总览\" src=\"https://pubs.rsc.org/image/article/2025/DD/d5dd00122f/d5dd00122f-f1.gif\" />\n<em>图：GP-MoLFormer 的两种使用方式。A 部分展示自回归 SMILES 生成；B 部分展示 pair-tuning，通过可学习 prompt vector 把 seed molecule 的表示推向性质更优的分子区域。</em></p>\n<p><img alt=\"GP-MoLFormer 生成分布示例\" src=\"https://pubs.rsc.org/image/article/2025/DD/d5dd00122f/d5dd00122f-f2.gif\" />\n<em>图：GP-MoLFormer-Uniq 生成分子的 logP、QED、合成可及性和分子量分布与 held-out test distribution 的对比，用于验证生成分布是否贴近训练化学空间。</em></p>\n<h5>算法核心流程</h5>\n<pre><code class=\"language-python\"># GP-MoLFormer 预训练\nmodel = DecoderOnlyMoLFormer(\n    layers=12,\n    heads=12,\n    hidden_size=768,\n    attention=&quot;linear&quot;,\n    position_embedding=&quot;rotary&quot;,\n)\n\nfor batch_smiles in billion_scale_smiles_loader():\n    tokens = tokenize_canonical_smiles(batch_smiles, vocab_size=2362)\n    input_tokens = tokens[:, :-1]\n    target_tokens = tokens[:, 1:]\n\n    logits = model(input_tokens, causal_mask=True)\n    loss = cross_entropy(logits, target_tokens)\n\n    optimizer.zero_grad()\n    loss.backward()\n    optimizer.step()\n\n# scaffold-constrained generation: scaffold 直接作为前缀\nprefix = tokenize(randomized_scaffold_smiles)\ngenerated = sample_until_eos(model, prefix, temperature=1.0, top_p=0.95)\n\n# pair-tuning: 冻结基础模型，仅学习 soft prompt\nsoft_prompt = Parameter(shape=(20, hidden_size))\nfor seed_smiles, target_smiles in ordered_pairs:\n    seed = embed(tokenize(seed_smiles))\n    target = tokenize(target_smiles)\n\n    # 训练序列: prompt + &lt;bos&gt; + seed + &lt;unk&gt; + target + &lt;eos&gt;\n    context = concat(soft_prompt, BOS, seed, UNK, embed(target[:-1]))\n    logits = frozen_model(context)\n    loss = cross_entropy(logits[-len(target):], target)\n    update(soft_prompt, loss)\n\n# pair-tuned 推理\ncontext = concat(soft_prompt, BOS, embed(tokenize(seed_smiles)), UNK)\noptimized = sample_until_eos(frozen_model, context)\n</code></pre>\n<h5>动机与背景</h5>\n<p>ChemGPT 证明了分子语言模型可以被规模化，但药物设计真正需要的是一个可执行的生成底座：既能无条件探索化学空间，又能围绕 scaffold 做局部设计，还能朝着高 QED、高 penalized logP 或高 DRD2 活性方向优化。GP-MoLFormer 的动机就是把 MoLFormer 在分子表征上的缩放经验迁移到生成任务。</p>\n<p>与许多小数据集生成模型不同，GP-MoLFormer 不只在 MOSES 这类百万级 benchmark 上训练，而是合并 ZINC 和 PubChem，训练到 11 亿条 canonical SMILES。这样做的优势是覆盖更广的化学结构和 scaffold；代价是公共化学数据库中有大量重复、热门或偏置分子，模型可能更容易记忆训练样本。论文因此同时训练了去重版本 GP-MoLFormer-Uniq。</p>\n<h5>模型机制：linear attention + RoPE 的 decoder</h5>\n<p>GP-MoLFormer 沿用 MoLFormer 的高效 Transformer block，但从 masked-language encoder 改成 causal decoder。普通 attention 的复杂度是 <span class=\"kb-math kb-math-inline\">O(n^2)</span>，长 SMILES 或大 batch 训练会很贵；linear attention 用特征映射 <span class=\"kb-math kb-math-inline\">\\phi(\\cdot)</span> 改写 attention：</p>\n<div class=\"kb-math kb-math-display\">\\operatorname{Att}(Q,K,V)\n=\n\\frac{\\phi(Q)\\left(\\phi(K)^\\top V\\right)}\n{\\phi(Q)\\left(\\phi(K)^\\top \\mathbf{1}\\right)}</div>\n<p>这样可以避免显式构造完整 <span class=\"kb-math kb-math-inline\">n \\times n</span> attention matrix。RoPE 则把相对位置信息注入 query/key，使模型更好地区分 SMILES 中 token 顺序。对 SMILES 来说，顺序不是自然语言语序，而是图遍历顺序；括号、环闭合编号和支链位置都依赖长程 token 关系，因此位置编码仍然关键。</p>\n<p>预训练目标是标准 next-token prediction：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{CLM}}\n=-\\sum_{t=1}^{T}\\log p_\\theta(x_t \\mid x_{&lt;t})</div>\n<p>论文构建了 2362 个 token 的 vocabulary，并将序列长度限制到 202 token 以内；由于超过 99.4% 的训练分子短于这个阈值，截断对覆盖率影响较小，却能显著减少训练成本。</p>\n<h5>scaffold-constrained generation</h5>\n<p>GP-MoLFormer 的 scaffold 设计不需要重新训练一个条件模型。做法是把 scaffold 的 randomized SMILES 放在序列前缀里，然后让 decoder 继续生成剩余 token。因为模型训练时学习的是：</p>\n<div class=\"kb-math kb-math-display\">p_\\theta(x_{t:T}\\mid x_{&lt;t})</div>\n<p>如果 scaffold prefix 是合法上下文，模型会按训练分布补全后续片段。论文在 DRD2 scaffold decoration 上展示了这种能力：即使没有针对 scaffold decoration 做 task-specific finetuning，GP-MoLFormer 也能产生更多被分类器判定为 active 的候选。</p>\n<h5>pair-tuning：用有序分子对学习优化方向</h5>\n<p>pair-tuning 是 GP-MoLFormer 最有代表性的机制。它不是把性质分数作为回归标签，也不是用 RL 直接更新整个语言模型，而是用“seed 分子 + target 分子”的有序对学习一个 soft prompt。若 <span class=\"kb-math kb-math-inline\">x</span> 是性质较低的 seed，<span class=\"kb-math kb-math-inline\">y</span> 是性质较高的 target，则训练序列为：</p>\n<div class=\"kb-math kb-math-display\">[p_1,\\ldots,p_m],\\langle bos\\rangle,x,\\langle unk\\rangle,y,\\langle eos\\rangle</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">p_1,\\ldots,p_m</span> 是可学习 prompt embeddings。训练损失为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{pair}}\n=-\\sum_{t=1}^{|y|}\n\\log p_\\theta(y_t \\mid p_{1:m}, \\langle bos\\rangle, x, \\langle unk\\rangle, y_{&lt;t})</div>\n<p>推理时只输入：</p>\n<div class=\"kb-math kb-math-display\">[p_1,\\ldots,p_m],\\langle bos\\rangle,x,\\langle unk\\rangle</div>\n<p>然后从模型分布中采样生成候选分子。这个设计的直觉是：soft prompt 学到“如何把一个分子移动到性质更好区域”的方向，而基础模型继续负责化学语法和分布合理性。由于只调 prompt，参数效率高，也减少了小规模性质数据把大模型过拟合坏的风险。</p>\n<h5>训练数据、记忆化与规模化生成</h5>\n<p>GP-MoLFormer 的 1.1B 训练集由约 1B ZINC SMILES 和 111M PubChem SMILES 组成。去重后的 GP-MoLFormer-Uniq 数据集约 650M 条，说明原始集合中存在大量重复或 canonicalization 后合并的分子。</p>\n<p>论文特别强调：在 billion-scale chemical language model 中，只看 10K 或 30K 生成样本的 novelty/validity/uniqueness 不够。模型生成数量扩大到 1B、10B 后，重复和训练集命中的概率都会变化。实验显示 GP-MoLFormer 在 10B 生成规模下仍保持高 validity，但 novelty 和 uniqueness 会下降；去重训练通常能提高 novelty。</p>\n<div class=\"warn-box\">⚠️ 注意：高 validity 并不等于高新颖性。对于超大化学数据库训练的模型，生成分子完全可能是训练集中出现过的高频分子，因此需要把 novelty 和训练集去重策略一起报告。</div>\n<h5>与 ChemGPT 的区别</h5>\n<p>ChemGPT 更关注“化学语言模型能否随模型/数据规模缩放”，GP-MoLFormer 则把这个方向落到可用的生成 foundation model 上：它选择更轻量的 46.8M 参数架构，用 linear attention 和 bucketing 支撑 11 亿 SMILES 训练，并增加 pair-tuning 这种面向性质优化的参数高效适配方法。</p>\n<p>因此 GP-MoLFormer 的核心价值不是最大参数量，而是“训练数据足够大 + decoder 生成效率足够高 + 下游控制接口足够简单”。这使它可以作为后续 test-time optimization、soft prompting 或 RL 微调方法的底座。</p>",
      "quiz": {
        "q": "GP-MoLFormer 的 pair-tuning 为什么属于参数高效的性质优化方法？",
        "options": [
          "它只学习一组 soft prompt embeddings，引导冻结的基础语言模型从 seed 分子生成更优 target 风格分子",
          "它重新训练全部 46.8M 参数，使模型完全拟合每个性质数据集",
          "它不需要任何成对分子数据，只依靠随机采样",
          "它把 SMILES 转换为 3D docking pose 后再训练图神经网络"
        ],
        "answer": 0,
        "explain": "pair-tuning 使用有序分子对训练 20 个 prompt embeddings；基础 GP-MoLFormer 主要保持冻结，由 prompt 学习优化方向，因此比全量微调更轻量。"
      }
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
      "summary": "MIST 提出一族 Molecular Insight SMILES Transformers，用 Smirk tokenizer 和 encoder-only Transformer 在数十亿分子上做 masked language modeling 预训练，再通过小型任务网络微调到 400+ 分子、材料和配方性质预测任务。",
      "keyPoints": [
        "<strong>分子 foundation model 家族</strong>：包含从小模型到 MIST-1.8B 的多种规模，最大模型 18 亿参数",
        "<strong>Smirk tokenizer</strong>：比普通 atom-wise tokenizer 更完整地保留核素、电子、几何和手性信息，可表示同位素、非四面体手性和有机金属复合物",
        "<strong>encoder-only MLM 预训练</strong>：基于 HuggingFace RoBERTa-PreLayerNorm，用 masked language modeling 从 SMILES 上学习分子 embedding",
        "<strong>超大训练规模</strong>：MIST-1.8B 使用 28 层、hidden size 2304、18 heads，训练约 2B 分子、116B tokens、17B masked tokens",
        "<strong>400+ 下游性质预测</strong>：预训练 encoder 后接两层 MLP 或专用 mixture task network，覆盖量子、热力学、生化、嗅觉、同位素半衰期和混合物性质",
        "<strong>Bayesian neural scaling</strong>：用带超参数惩罚项的缩放律选择 compute-optimal 模型和训练配置，减少开发大模型所需试验成本",
        "<strong>可解释表示分析</strong>：线性 probe 和 embedding 投影显示模型学到 Lipinski Rule of Five、芳香性/反芳香性、<span class=\"kb-math kb-math-inline\">\\pi</span>-bonding 等未显式标注的化学概念",
        "<strong>来源限制</strong>：任务给定 URL 是新闻页；可访问方法细节主要来自论文 <code>https://arxiv.org/html/2510.18900v1</code>，下文据此解读"
      ],
      "detail": "<h5>模型图示</h5>\n<p><img alt=\"MIST 总体框架\" src=\"https://ar5iv.labs.arxiv.org/html/2510.18900/assets/x1.png\" />\n<em>图：MIST 用 Smirk tokenized SMILES 训练 encoder-only Transformer，生成分子 embedding；微调阶段把 embedding 输入小型 task network，用于不同材料和分子性质预测任务。</em></p>\n<p><img alt=\"MIST 化学空间应用\" src=\"https://ar5iv.labs.arxiv.org/html/2510.18900/assets/x2.png\" />\n<em>图：MIST 在电解液筛选、嗅觉描述符、生成分子 Pareto front 等任务中的应用示意，展示 foundation model 在多个化学子域上的迁移能力。</em></p>\n<h5>算法核心流程</h5>\n<pre><code class=\"language-python\"># MIST 预训练：Smirk + masked language modeling\ntokenizer = SmirkTokenizer(\n    preserve_isotopes=True,\n    preserve_charge=True,\n    preserve_stereochemistry=True,\n    preserve_geometry=True,\n)\n\nencoder = RoBERTaPreLayerNormEncoder(\n    layers=28,              # MIST-1.8B\n    hidden_size=2304,\n    attention_heads=18,\n    max_sequence_length=2048,\n)\n\nfor smiles_batch in enamine_realspace_loader():\n    tokens = tokenizer(smiles_batch)\n    masked_tokens, mask_positions, labels = random_mask(tokens, p=0.15)\n\n    hidden = encoder(masked_tokens)\n    logits = lm_head(hidden[mask_positions])\n    loss = cross_entropy(logits, labels)\n\n    optimizer.zero_grad()\n    loss.backward()\n    optimizer.step()\n\n# 下游单分子性质微调\nfor task in property_tasks:\n    task_head = MLP(input_dim=encoder.hidden_size, hidden_layers=2)\n    for smiles, y in task.dataset:\n        z = encoder.pool(tokenizer(smiles))\n        y_pred = task_head(z)\n        loss = task.loss(y_pred, y)  # regression: MSE/MAE; classification: BCE/CE\n        update(encoder, task_head, loss)\n\n# 混合物性质预测：对每个组分编码后进入物理启发 task network\nz_components = [encoder.pool(tokenizer(s)) for s in mixture_smiles]\nprediction = mixture_network(z_components, mole_fractions)\n</code></pre>\n<h5>动机与背景</h5>\n<p>分子性质预测长期受限于标注数据稀缺。许多 QSAR、GNN 或小型 Transformer 在单个 benchmark 上表现不错，但遇到同位素、有机金属、混合物或嗅觉感知这类跨子域任务时，泛化能力会下降。MIST 的目标是训练一个覆盖更广化学空间的通用 encoder，使少量标签也能适配新任务。</p>\n<p>与 GP-MoLFormer 这种自回归生成模型不同，MIST 主要是 property prediction foundation model。它不是逐 token 生成下一个 SMILES，而是通过 masked language modeling 学习双向上下文表示。生成任务如果需要候选分子，MIST 常作为筛选器或性质预测器参与高通量设计流程，而不是直接作为 decoder 采样分子。</p>\n<h5>Smirk tokenizer：为什么不是普通 SMILES tokenization</h5>\n<p>普通 SMILES tokenizer 往往按原子、括号、键符号等局部规则切分，容易丢失或弱化核素、电子态、手性构型等细节。MIST 的 Smirk tokenizer 明确面向更宽的化学空间：它能保留 <code>[2H]</code>、<code>[13C]</code> 这类同位素信息，也能区分非四面体配位环境中的手性标签，例如 <code>@SP1</code> 与 <code>@SP3</code>。</p>\n<p>这对 MIST 的下游能力很关键。若 tokenizer 在输入层就把同位素或手性差异压平，Transformer 再大也难以恢复这些信息；Smirk 的作用是让模型在预训练阶段就看到结构、核素、电子和几何差异，从而为同位素半衰期、有机金属量子性质和混合物性质预测提供表示基础。</p>\n<h5>MLM 预训练目标</h5>\n<p>MIST 使用 masked language modeling。给定 token 序列 <span class=\"kb-math kb-math-inline\">x=(x_1,\\ldots,x_T)</span>，随机选择 mask 集合 <span class=\"kb-math kb-math-inline\">M</span>，把这些位置替换为 <code>[MASK]</code> 或扰动 token，模型根据双向上下文预测原 token：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{MLM}}\n=-\\sum_{i\\in M}\\log p_\\theta(x_i \\mid \\tilde{x}_{\\setminus M})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\tilde{x}</span> 是 mask 后的输入。与自回归模型只看左侧上下文不同，MIST 的 encoder 可以同时利用分子字符串两侧上下文，因此更适合作为全分子表征模型。微调时，encoder 输出的 pooled embedding <span class=\"kb-math kb-math-inline\">z=f_\\theta(x)</span> 进入任务头：</p>\n<div class=\"kb-math kb-math-display\">\\hat{y}=g_\\phi(z)</div>\n<p>回归任务通常最小化：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{reg}}=\\frac{1}{N}\\sum_{j=1}^{N}\\lVert y_j-\\hat{y}_j\\rVert_2^2</div>\n<p>分类任务则使用 binary cross entropy 或 cross entropy。论文中大多数普通任务头是两层 MLP；混合物任务使用专门的 mixture network，以便把组分 embedding 和摩尔分数结合起来。</p>\n<h5>模型规模与训练配置</h5>\n<p>论文重点报告两个基础模型：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th style=\"text-align: right;\">参数量</th>\n<th style=\"text-align: right;\">层数</th>\n<th style=\"text-align: right;\">Hidden size</th>\n<th style=\"text-align: right;\">Attention heads</th>\n<th style=\"text-align: right;\">分子数</th>\n<th style=\"text-align: right;\">总 tokens</th>\n<th style=\"text-align: right;\">Masked tokens</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>MIST-28M</td>\n<td style=\"text-align: right;\">28M</td>\n<td style=\"text-align: right;\">8</td>\n<td style=\"text-align: right;\">512</td>\n<td style=\"text-align: right;\">8</td>\n<td style=\"text-align: right;\">246M</td>\n<td style=\"text-align: right;\">12B</td>\n<td style=\"text-align: right;\">2B</td>\n</tr>\n<tr>\n<td>MIST-1.8B</td>\n<td style=\"text-align: right;\">1.8B</td>\n<td style=\"text-align: right;\">28</td>\n<td style=\"text-align: right;\">2304</td>\n<td style=\"text-align: right;\">18</td>\n<td style=\"text-align: right;\">2B</td>\n<td style=\"text-align: right;\">116B</td>\n<td style=\"text-align: right;\">17B</td>\n</tr>\n</tbody>\n</table></div>\n<p>预训练数据来自 Enamine REALSpace，偏向可合成有机分子。一个有意思的发现是：即便预训练数据本身不覆盖所有下游化学类型，MIST 在更复杂的同位素、有机金属和混合物任务上仍能从预训练受益。这说明模型学到的不是纯粹的训练集 ID，而是可迁移的 token-结构-性质关系。</p>\n<h5>Bayesian neural scaling：如何选大模型</h5>\n<p>训练 MIST-1.8B 之前，作者先训练大量较小模型拟合 scaling law。基础形式把 cross-entropy loss 写为参数量 <span class=\"kb-math kb-math-inline\">N</span> 与数据量 <span class=\"kb-math kb-math-inline\">D</span> 的函数：</p>\n<div class=\"kb-math kb-math-display\">L(N,D)=\\frac{A}{N^\\alpha}+\\frac{B}{D^\\beta}+E</div>\n<p>MIST 进一步加入超参数惩罚项，显式建模 learning rate、batch size、encoder shape 等偏离最优值的影响：</p>\n<div class=\"kb-math kb-math-display\">\\hat{L}(N,D,\\lambda)\n=\n\\left(\\frac{A}{N^\\alpha}+\\frac{B}{D^\\beta}+E\\right)\n\\times\n\\prod_i \\exp(P_i(\\lambda_i))</div>\n<p>其中：</p>\n<div class=\"kb-math kb-math-display\">P_i(\\lambda_i)=c_i\\left(\\ln\\lambda_i-\\ln\\lambda_{\\star,i}\\right)^2</div>\n<p>这个设计的直觉是：如果某个 learning rate 或架构比例偏离最优点，它会乘性地抬高预期 loss。用 Bayesian parameter estimation 拟合后，作者可以带着不确定性估计 compute-optimal frontier，减少盲目 grid search。论文报告这种带惩罚项的 scaling law 比不带惩罚项的版本有更好的预测质量。</p>\n<h5>下游任务机制</h5>\n<p>MIST 的微调范式很直接：将 SMILES 输入同一个预训练 encoder，取 pooled embedding，再接任务网络。对小样本性质预测，预训练 embedding 提供结构先验，使 MLP 不必从头学习化学语法和局部官能团规律。</p>\n<p>在电解液筛选中，MIST-28M 的多个微调头分别预测 HOMO/LUMO、donor number、Kamlet-Taft 参数、熔点/沸点等性质，然后高通量评估候选分子。论文报告用 8 张 A100 在 8 小时内评估 9000 万个分子，并筛出 63 个 Pareto-front 候选。</p>\n<p>在嗅觉任务中，MIST-1.8B 变体对 135 个 scent descriptors 做多标签分类。模型输出的 logit 相关性经层次聚类后出现符合人类理解的气味簇，例如 meat/roasted/savory 一类相关。这说明分子 embedding 不只服务数值性质，也能承载感知性质。</p>\n<h5>可解释性与化学概念</h5>\n<p>MIST 还用 linear probes 检查中间层是否编码化学规则。线性分类器可写作：</p>\n<div class=\"kb-math kb-math-display\">y_i=\\sigma(\\vec{f}_i\\cdot \\vec{x}+b_i)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\vec{x}</span> 是某层 hidden state，<span class=\"kb-math kb-math-inline\">y_i</span> 是某个 Lipinski Rule of Five 条件或其他二分类化学属性。若简单线性 probe 就能恢复这些规则，说明预训练 representation 中已经线性可分地包含相关化学概念。</p>\n<p>论文还用低维投影分析 MIST-1.8B embedding，发现与 <span class=\"kb-math kb-math-inline\">\\pi</span>-bonding、环计数、多环芳烃子类相关的方向，并观察到区分芳香/反芳香化合物的 banding pattern。这类证据支持 MIST 学到了一部分通用化学结构规律，而不只是背诵训练 token。</p>\n<h5>与 GP-MoLFormer 的区别</h5>\n<p>GP-MoLFormer 是 decoder-only 生成模型，擅长采样 SMILES、补全 scaffold、通过 pair-tuning 做性质优化。MIST 是 encoder-only 预测模型，擅长把分子编码成 embedding 并迁移到性质预测任务。两者可以组合：GP-MoLFormer 生成候选，MIST 快速预测多目标性质，最后再用实验或高精度模拟验证。</p>\n<div class=\"key-point\">💡 关键：MIST 的“400+ 性质预测”来自预训练 encoder + 下游任务头，而不是一个单一输出头同时预测所有性质；实际使用时需要按任务选择或微调对应 head。</div>",
      "quiz": {
        "q": "MIST 使用 Smirk tokenizer 的主要原因是什么？",
        "options": [
          "让 decoder 更快地逐 token 生成 SMILES",
          "在 token 层面保留核素、电子、几何和手性信息，支撑更广化学空间的性质预测",
          "把所有分子强制转换成同一种 scaffold",
          "替代下游任务中的 MLP 性质预测头"
        ],
        "answer": 1,
        "explain": "Smirk 的作用是在输入表示中保留普通 tokenization 容易弱化的化学细节，例如同位素和非四面体手性；这些信息对同位素、有机金属和混合物等任务很重要。"
      }
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
      "summary": "E(3)-EDM 提出首个直接在三维原子坐标与原子类型上联合扩散的 E(3) 等变分子生成模型，用等变 EGNN 学习去噪过程，解决了 3D 分子生成中旋转、平移、反射对称性和离散/连续变量联合建模的问题。",
      "keyPoints": [
        "<strong>联合生成 3D 坐标与原子特征</strong>：将分子表示为 <span class=\"kb-math kb-math-inline\">(\\mathbf{x}, \\mathbf{h})</span>，其中 <span class=\"kb-math kb-math-inline\">\\mathbf{x}</span> 是原子三维坐标，<span class=\"kb-math kb-math-inline\">\\mathbf{h}</span> 包含原子类型、形式电荷等特征",
        "<strong>E(3) 等变去噪网络</strong>：使用 EGNN 作为噪声预测器，坐标输出随旋转/反射等变，特征输出保持不变",
        "<strong>零质心坐标子空间</strong>：对坐标减去 center of gravity，使平移不变的概率建模可归一化，并避免采样链整体漂移",
        "<strong>噪声预测参数化</strong>：训练网络预测扩散噪声 <span class=\"kb-math kb-math-inline\">\\hat{\\boldsymbol{\\epsilon}}</span>，再由 <span class=\"kb-math kb-math-inline\">\\hat{\\boldsymbol{\\epsilon}}</span> 还原 <span class=\"kb-math kb-math-inline\">\\hat{\\mathbf{z}}_0</span>，优化比直接预测样本更稳定",
        "<strong>连续与离散特征统一处理</strong>：坐标用高斯扩散，类别特征用 one-hot 连续扰动并在 <span class=\"kb-math kb-math-inline\">t=0</span> 通过积分恢复类别似然",
        "<strong>可计算 likelihood</strong>：给出兼容坐标子空间、类别特征和电荷特征的变分下界推导",
        "<strong>分子大小先验</strong>：先从训练集的原子数分布采样 <span class=\"kb-math kb-math-inline\">n</span>，再条件于 <span class=\"kb-math kb-math-inline\">n</span> 生成对应大小的分子",
        "<strong>实验覆盖 QM9 与 GEOM-Drugs</strong>：在小分子和较大药物样分子上验证稳定性、有效性和训练效率"
      ],
      "detail": "<p><img alt=\"E(3)-EDM 总览\" src=\"https://ar5iv.labs.arxiv.org/html/2203.17003/assets/x1.png\" />\n<em>图 1：E(3)-EDM 从标准高斯噪声点云逐步去噪为带 3D 坐标和原子类型的分子；旋转输入分子不会改变其 likelihood。</em></p>\n<p><img alt=\"E(3)-EDM 扩散与去噪过程\" src=\"https://ar5iv.labs.arxiv.org/html/2203.17003/assets/x2.png\" />\n<em>图 2：训练时对真实分子加噪并让网络预测噪声；采样时从噪声开始迭代执行反向去噪。图像来自论文 ar5iv HTML，可访问来源为 <code>https://ar5iv.labs.arxiv.org/html/2203.17003</code>。</em></p>\n<pre><code class=\"language-python\"># E(3)-EDM 训练与采样伪代码\ndef train_edm(batch):\n    x0, h0 = batch.coords, batch.atom_features\n    n = x0.shape[0]\n\n    # 坐标建模在零质心子空间中，特征不做质心约束\n    x0 = x0 - x0.mean(axis=0, keepdims=True)\n    z0 = concat(x0, h0)\n\n    t = uniform_integer(1, T)\n    eps_x = gaussian_noise_like(x0)\n    eps_x = eps_x - eps_x.mean(axis=0, keepdims=True)\n    eps_h = gaussian_noise_like(h0)\n    eps = concat(eps_x, eps_h)\n\n    zt = alpha[t] * z0 + sigma[t] * eps\n    eps_hat = egnn_denoiser(zt, t, n)\n    eps_hat.coords -= eps_hat.coords.mean(axis=0, keepdims=True)\n\n    loss = mse(eps_hat, eps)\n    optimizer.step(loss)\n\n\ndef sample_edm():\n    n = sample_num_atoms_prior()\n    z = sample_standard_normal(n)\n    z.coords -= z.coords.mean(axis=0, keepdims=True)\n\n    for t in reversed(range(1, T + 1)):\n        eps_hat = egnn_denoiser(z, t, n)\n        z0_hat = (z - sigma[t] * eps_hat) / alpha[t]\n        z = sample_reverse_posterior(z, z0_hat, t)\n        z.coords -= z.coords.mean(axis=0, keepdims=True)\n\n    x, h = decode_positions_and_atom_types(z)\n    return build_molecule(x, h)\n</code></pre>\n<p><strong>动机与背景：为什么 3D 分子生成需要等变扩散？</strong></p>\n<p>分子不是普通向量或图像，而是存在于三维欧氏空间中的原子点云。同一个分子整体平移、旋转，甚至在不考虑手性的任务中反射后，化学意义应保持一致。早期 3D 生成方法常见两类路线：逐原子自回归模型需要人为规定原子顺序，采样慢且容易把局部决策误差累积到后续步骤；等变 normalizing flow 虽然可以保留精确 likelihood，但训练时要积分连续动力学，计算成本较高。E(3)-EDM 的核心选择是把扩散模型与 E(n) 等变 GNN 结合：用固定的前向加噪过程破坏分子结构，再训练等变网络学习反向去噪，从而避免原子顺序假设，并把几何对称性直接写入模型。</p>\n<p><strong>扩散变量：连续坐标和类别特征被拼成同一个去噪对象。</strong></p>\n<p>对每个分子，论文把原子坐标 <span class=\"kb-math kb-math-inline\">\\mathbf{x}\\in\\mathbb{R}^{n\\times 3}</span> 与原子特征 <span class=\"kb-math kb-math-inline\">\\mathbf{h}</span> 拼接为 <span class=\"kb-math kb-math-inline\">\\mathbf{z}=[\\mathbf{x},\\mathbf{h}]</span>。前向扩散采用 variance-preserving 形式：</p>\n<div class=\"kb-math kb-math-display\">q(\\mathbf{z}_t\\mid \\mathbf{z}_0)=\\mathcal{N}(\\mathbf{z}_t;\\alpha_t\\mathbf{z}_0,\\sigma_t^2\\mathbf{I})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\alpha_t</span> 控制信号保留量，<span class=\"kb-math kb-math-inline\">\\sigma_t</span> 控制噪声强度。坐标部分有一个额外约束：<span class=\"kb-math kb-math-inline\">\\sum_i \\mathbf{x}_i=0</span>。这是因为全空间中的平移不变密度无法归一化；把所有坐标投影到零质心子空间后，模型只需要学习相对几何关系。特征部分不受旋转和平移影响，因此可以直接加标准高斯噪声。对原子类型这类类别变量，模型使用 one-hot 表示并加连续噪声，最后在 <span class=\"kb-math kb-math-inline\">t=0</span> 的 likelihood 项中把连续区间积分回类别概率。</p>\n<p><strong>去噪网络：EGNN 让反向链天然满足 E(3) 等变。</strong></p>\n<p>EDM 使用 EGNN 预测噪声 <span class=\"kb-math kb-math-inline\">\\hat{\\boldsymbol{\\epsilon}}=\\phi_\\theta(\\mathbf{z}_t,t)</span>。典型 EGNN 层先根据节点特征和距离构造消息，再更新特征和坐标：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{m}_{ij}=\\phi_e\\left(\\mathbf{h}_i,\\mathbf{h}_j,\\|\\mathbf{x}_i-\\mathbf{x}_j\\|^2,a_{ij}\\right)</div>\n<div class=\"kb-math kb-math-display\">\\mathbf{x}_i^{\\ell+1}=\\mathbf{x}_i^\\ell+\\sum_{j\\neq i}\\frac{\\mathbf{x}_i^\\ell-\\mathbf{x}_j^\\ell}{\\|\\mathbf{x}_i^\\ell-\\mathbf{x}_j^\\ell\\|+1}\\phi_x(\\mathbf{m}_{ij})</div>\n<div class=\"kb-math kb-math-display\">\\mathbf{h}_i^{\\ell+1}=\\phi_h\\left(\\mathbf{h}_i^\\ell,\\sum_{j\\neq i}\\mathbf{m}_{ij}\\right)</div>\n<p>距离 <span class=\"kb-math kb-math-inline\">\\|\\mathbf{x}_i-\\mathbf{x}_j\\|^2</span> 对旋转和平移不变，坐标更新只沿相对向量方向移动，所以输入整体旋转后，输出坐标噪声会随之旋转；原子类型输出则不变。网络输出噪声后，通过</p>\n<div class=\"kb-math kb-math-display\">\\hat{\\mathbf{z}}_0=\\frac{\\mathbf{z}_t-\\sigma_t\\hat{\\boldsymbol{\\epsilon}}_\\theta(\\mathbf{z}_t,t)}{\\alpha_t}</div>\n<p>得到对干净分子的估计，再代入高斯后验 <span class=\"kb-math kb-math-inline\">p_\\theta(\\mathbf{z}_{t-1}\\mid \\mathbf{z}_t)</span>。训练目标可写成加权噪声回归：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_t=w(t)\\left\\|\\boldsymbol{\\epsilon}-\\hat{\\boldsymbol{\\epsilon}}_\\theta(\\mathbf{z}_t,t)\\right\\|_2^2</div>\n<p>论文也讨论了完整变分下界，但实践中采用类似 DDPM 的未加权 MSE 往往产生更好的样本质量。</p>\n<div class=\"key-point\">💡 关键：EDM 的“等变性”不是后处理得到的，而是由坐标子空间、各向同性高斯噪声、等变转移分布和 EGNN 噪声预测器共同保证的。</div>\n<p><strong>训练与采样流程：先采样原子数，再在零质心空间中生成点云。</strong></p>\n<p>训练时，模型从真实分子中采样时间步 <span class=\"kb-math kb-math-inline\">t</span>，按噪声日程生成 <span class=\"kb-math kb-math-inline\">\\mathbf{z}_t</span>，让 EGNN 预测噪声。采样时，模型先根据训练集统计的分子大小分布采样原子数 <span class=\"kb-math kb-math-inline\">n</span>，再从零质心标准高斯初始化 <span class=\"kb-math kb-math-inline\">\\mathbf{z}_T</span>，逐步执行 <span class=\"kb-math kb-math-inline\">T\\rightarrow 0</span> 的反向去噪。最后把坐标解码为 3D 构象，把 one-hot/电荷特征解码为离散原子属性，并用化学工具检查稳定性。</p>\n<p><strong>与传统 3D 分子生成方法的区别。</strong></p>\n<p>相比逐原子自回归方法，E(3)-EDM 一次性维护整套分子点云的全局状态，每一步去噪都能看到所有原子之间的相互作用，不需要人为规定生成顺序。相比等变 flow，扩散训练不需要求解连续 ODE，工程上更稳定，扩展到 GEOM-Drugs 这类更大药物样分子也更直接。相比只生成 2D 图的分子模型，EDM 的输出天然包含构象信息，因此更适合后续对接、构象分析和结构条件生成方法作为基础模块。DiffSBDD、TargetDiff 等后续 SBDD 模型本质上都沿用了这个“3D 坐标 + 类型联合扩散 + 等变去噪”的范式，只是把无条件分子生成扩展到了蛋白口袋条件生成。</p>",
      "quiz": {
        "q": "E(3)-EDM 为什么要在坐标扩散前减去分子的 center of gravity？",
        "options": [
          "为了让分子更容易满足 Lipinski 规则",
          "为了在零质心子空间中定义可归一化的平移不变坐标分布，并避免采样整体漂移",
          "为了把所有原子类型转换成连续变量",
          "为了让 EGNN 只能建模相邻化学键而不能建模长程相互作用"
        ],
        "answer": 1,
        "explain": "整体平移不改变分子，因此全空间中的平移不变密度不可归一化。把坐标限制到零质心子空间后，模型学习相对几何关系，反向采样也不会出现整体漂移。"
      }
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
      "summary": "DiffSBDD 将 E(3)-EDM 的 3D 等变扩散范式扩展到结构药物设计，把小分子配体生成建模为给定蛋白口袋的 SE(3) 等变条件去噪过程，并进一步用 inpainting 采样把同一个预训练模型用于 scaffold hopping、fragment growing 和性质优化。",
      "keyPoints": [
        "<strong>口袋条件生成</strong>：学习 <span class=\"kb-math kb-math-inline\">p_\\theta(\\text{ligand}\\mid\\text{pocket})</span>，在每个反向去噪步骤把固定蛋白口袋原子作为 3D 上下文输入",
        "<strong>配体坐标与类型联合扩散</strong>：配体原子坐标和原子特征同时加噪、同时去噪，最终生成带结合构象的小分子点云",
        "<strong>SE(3) 等变 EGNN</strong>：联合处理蛋白与配体节点，配体坐标可更新，蛋白口袋坐标保持固定",
        "<strong>反射敏感坐标更新</strong>：在 EGNN 坐标更新中加入 cross product 项，避免 O(3) 反射对称性破坏手性相关信息",
        "<strong>两种条件化路线</strong>：既训练显式 pocket-conditioned DDPM，也训练蛋白-配体联合分布 <span class=\"kb-math kb-math-inline\">p(\\text{pocket},\\text{ligand})</span> 并通过 inpainting 固定口袋",
        "<strong>通用 inpainting 采样</strong>：每个去噪步把固定原子替换为其前向加噪版本，可做口袋条件生成、scaffold hopping、scaffold elaboration、fragment growing/merging",
        "<strong>无需重训的性质优化</strong>：对候选分子做少步 noise/denoise，并结合简单进化搜索优化 QED、SA 或 docking score",
        "<strong>评估数据集</strong>：使用 CrossDocked 与 Binding MOAD，指标包括 Vina、QED、SA、Lipinski、diversity 和推理时间"
      ],
      "detail": "<p><img alt=\"DiffSBDD 口袋条件生成流程\" src=\"https://ar5iv.labs.arxiv.org/html/2210.13695/assets/x1.png\" />\n<em>图 1：DiffSBDD 在蛋白口袋条件下对配体原子坐标和特征执行前向扩散与反向去噪；蛋白作为固定 3D 上下文，配体从高斯噪声生成。</em></p>\n<p><img alt=\"DiffSBDD inpainting 替换采样\" src=\"https://ar5iv.labs.arxiv.org/html/2210.13695/assets/x2.png\" />\n<em>图 2：inpainting 采样在每个反向步骤把固定部分替换为对应时间步的前向加噪版本，从而保证最终样本保留指定片段或口袋。图像来自论文 ar5iv HTML，可访问来源为 <code>https://ar5iv.labs.arxiv.org/html/2210.13695</code>。</em></p>\n<pre><code class=\"language-python\"># DiffSBDD 条件训练与 inpainting 采样伪代码\ndef train_conditional_diffsbdd(ligand, pocket):\n    x_lig, h_lig = ligand.coords, ligand.atom_features\n    x_poc, h_poc = pocket.coords, pocket.atom_or_residue_features\n\n    system_com = center_of_mass(concat(x_lig, x_poc))\n    x_lig, x_poc = x_lig - system_com, x_poc - system_com\n\n    t = uniform_integer(1, T)\n    eps_x, eps_h = sample_ligand_noise(x_lig, h_lig)\n    zt_lig = alpha[t] * concat(x_lig, h_lig) + sigma[t] * concat(eps_x, eps_h)\n\n    # pocket 节点参与消息传递，但坐标不更新\n    eps_hat = se3_egnn_noise_predictor(\n        ligand_noisy=zt_lig,\n        pocket_fixed=(x_poc, h_poc),\n        t=t,\n        freeze_pocket_coords=True,\n    )\n    loss = mse(eps_hat, concat(eps_x, eps_h))\n    optimizer.step(loss)\n\n\ndef inpaint_sample(fixed_atoms, mask_generate):\n    z = sample_standard_normal_like(full_system_template)\n    for t in reversed(range(1, T + 1)):\n        z_generated = reverse_denoise_step(z, t)\n\n        # 对固定原子从真实结构执行同一时间步的前向加噪\n        z_fixed_t = forward_noise(fixed_atoms, t - 1)\n        z_fixed_t = align_center_of_mass(z_fixed_t, z_generated, mask=~mask_generate)\n\n        # 替换固定部分，生成部分保留模型预测\n        z = where(mask_generate, z_generated, z_fixed_t)\n\n        # 可选：在同一 t 附近来回重采样，让边界更一致\n        z = resample_back_and_forth(z, t)\n    return decode_ligand(z)\n</code></pre>\n<p><strong>动机与背景：从无条件 3D 分子生成到蛋白口袋条件生成。</strong></p>\n<p>E(3)-EDM 证明了扩散模型可以直接生成 3D 分子，但药物设计真正关心的是“给定靶点口袋，生成能放进并结合该口袋的小分子”。DiffSBDD 把这个任务定义为 3D 条件生成：输入蛋白结合口袋的原子或残基表示，输出配体的原子类型、三维坐标和结合构象。相比早期 voxel VAE，点云模型不需要把空间离散成体素，也避免了体素分辨率和计算量之间的矛盾；相比逐原子自回归 SBDD，扩散模型每一步都对完整配体点云去噪，能利用全局几何上下文，不依赖人为原子顺序。</p>\n<p><strong>条件扩散机制：口袋固定，配体去噪。</strong></p>\n<p>DiffSBDD 的条件模型把配体节点 <span class=\"kb-math kb-math-inline\">\\mathbf{z}^{L}=[\\mathbf{x}^{L},\\mathbf{h}^{L}]</span> 作为扩散变量，把蛋白口袋 <span class=\"kb-math kb-math-inline\">\\mathbf{z}^{P}=[\\mathbf{x}^{P},\\mathbf{h}^{P}]</span> 作为固定上下文。前向过程只对配体加噪：</p>\n<div class=\"kb-math kb-math-display\">q(\\mathbf{z}^{L}_t\\mid \\mathbf{z}^{L}_0)=\\mathcal{N}(\\mathbf{z}^{L}_t;\\alpha_t\\mathbf{z}^{L}_0,\\sigma_t^2\\mathbf{I})</div>\n<p>反向过程由条件 EGNN 参数化：</p>\n<div class=\"kb-math kb-math-display\">p_\\theta(\\mathbf{z}^{L}_{t-1}\\mid \\mathbf{z}^{L}_t,\\mathbf{z}^{P})\n=\\mathcal{N}\\left(\\mathbf{z}^{L}_{t-1};\\boldsymbol{\\mu}_\\theta(\\mathbf{z}^{L}_t,\\mathbf{z}^{P},t),\\tilde{\\sigma}_t^2\\mathbf{I}\\right)</div>\n<p>网络预测噪声 <span class=\"kb-math kb-math-inline\">\\hat{\\boldsymbol{\\epsilon}}_\\theta(\\mathbf{z}^{L}_t,\\mathbf{z}^{P},t)</span>，再还原 <span class=\"kb-math kb-math-inline\">\\hat{\\mathbf{z}}^{L}_0</span>。蛋白和配体节点共同进入消息传递，因此配体原子能看到口袋几何、元素类型和残基信息；但蛋白节点坐标不更新，避免模型在去噪过程中“移动靶点”。</p>\n<p><strong>SE(3) 等变与手性：为什么不能简单保持反射等变。</strong></p>\n<p>普通 EGNN 往往对 O(3) 等变，即旋转、平移和反射都一致。但药物分子和蛋白结构存在手性，镜像结构可能具有完全不同的生物活性。DiffSBDD 因此把目标设为 SE(3) 等变，只要求对旋转和平移一致，不强制对反射一致。论文在坐标更新中加入基于 cross product 的项：</p>\n<div class=\"kb-math kb-math-display\">\\Delta \\mathbf{x}_i\n=\\sum_j(\\mathbf{x}_i-\\mathbf{x}_j)\\phi_x(\\mathbf{m}_{ij})\n+\\sum_{j,k} \\left((\\mathbf{x}_i-\\mathbf{x}_j)\\times(\\mathbf{x}_i-\\mathbf{x}_k)\\right)\\phi_\\chi(\\mathbf{m}_{ij},\\mathbf{m}_{ik})</div>\n<p>cross product 在反射下会变号，因此能让模型区分互为镜像的局部几何。另一方面，平移仍通过 zero-CoM 处理：在 likelihood 和 denoising 前把系统质心移到零附近，反向采样时也防止整体漂移。</p>\n<div class=\"key-point\">💡 关键：DiffSBDD 的口袋条件不是一个全局向量标签，而是完整 3D 几何上下文；蛋白-配体、配体-配体、蛋白-蛋白消息共同决定每一步去噪方向。</div>\n<p><strong>联合分布与 inpainting：把条件化放进采样算法。</strong></p>\n<p>除了显式条件模型，DiffSBDD 还训练蛋白-配体联合分布 <span class=\"kb-math kb-math-inline\">p_\\theta(\\mathbf{z}^{P},\\mathbf{z}^{L})</span>。推理时，如果想固定口袋或固定某个配体片段，就不需要重新训练模型，而是在每个反向步骤做替换：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{z}_{t-1}\n=\\mathbf{m}\\odot \\mathbf{z}^{\\text{gen}}_{t-1}\n+(1-\\mathbf{m})\\odot \\tilde{\\mathbf{z}}^{\\text{fixed}}_{t-1}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{m}</span> 是生成区域 mask，<span class=\"kb-math kb-math-inline\">\\tilde{\\mathbf{z}}^{\\text{fixed}}_{t-1}\\sim q(\\mathbf{z}_{t-1}\\mid\\mathbf{z}^{\\text{fixed}}_0)</span> 是固定部分在该时间步的前向加噪样本。因为 <span class=\"kb-math kb-math-inline\">t\\rightarrow0</span> 时噪声方差趋近于零，最终样本会精确保留固定原子。这个设计让同一模型可以完成多种药物化学任务：保留核心药效团并换 scaffold、在已有 fragment 上外延、把两个 fragment 连接起来，或固定蛋白口袋生成新配体。</p>\n<p><strong>性质优化：把扩散链当作局部化学空间扰动器。</strong></p>\n<p>DiffSBDD 不直接在训练目标中优化 QED、SA 或 Vina，而是利用扩散模型的局部重构能力做后验探索。给定一个候选分子，先只加少量噪声到中间时间步 <span class=\"kb-math kb-math-inline\">t&#x27;</span>，再从 <span class=\"kb-math kb-math-inline\">t&#x27;</span> 去噪回 <span class=\"kb-math kb-math-inline\">0</span>，得到与原分子形状和口袋互补性相近的新候选。结合简单进化算法，就可以反复选择更高 QED、更好 SA 或更低 docking score 的样本。这个过程的优点是无需为每个性质重新构造数据集或训练专门模型；缺点是性质提升依赖采样策略和外部评价函数，而不是由模型 likelihood 直接保证。</p>\n<p><strong>与前代 SBDD 方法的区别。</strong></p>\n<p>3D-SBDD、Pocket2Mol、GraphBP 等方法大多逐原子放置新节点，前几步上下文很少，后续误差容易累积，且训练时看到的是真实前缀、采样时看到的是自生成前缀。DiffSBDD 用非自回归去噪链缓解这种训练-采样错配，每个步骤都在完整点云上调整所有待生成原子。与 TargetDiff 相比，DiffSBDD 的一个显著特色是强调“一个预训练扩散模型 + 采样时约束”的灵活性，尤其是 inpainting 和 noise/denoise 优化，使其不只用于 de novo ligand generation，也能覆盖实际药物发现中常见的局部改造任务。</p>",
      "quiz": {
        "q": "DiffSBDD 的 inpainting 采样为什么能保留指定 scaffold 或蛋白口袋？",
        "options": [
          "因为训练时为每一种 scaffold 单独训练了一个条件模型",
          "因为每个反向去噪步骤都会把固定区域替换为该区域的前向加噪版本，且最终噪声趋近于零",
          "因为模型只生成 SMILES，不生成三维坐标",
          "因为 docking score 被直接写入训练损失"
        ],
        "answer": 1,
        "explain": "inpainting 使用 mask 区分固定区域和生成区域。固定区域在每个时间步由真实结构前向加噪得到并替换回采样链，因此到 t=0 时会恢复为未扰动的指定结构。"
      }
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
      "summary": "TargetDiff 提出面向蛋白靶点的 3D 等变扩散模型，用非自回归方式联合生成配体原子坐标和离散原子类型，同时把生成模型的去噪不确定性和隐藏表征用于候选分子的亲和力排序与预测。",
      "keyPoints": [
        "<strong>目标感知 3D 生成</strong>：输入蛋白 binding site 原子集合，生成能占据口袋的配体原子坐标与原子类型",
        "<strong>非自回归扩散采样</strong>：整个配体点云一起从噪声去噪，避免逐原子生成的顺序偏置和 exposure bias",
        "<strong>坐标与原子类型双扩散</strong>：坐标采用高斯扩散，原子类型采用 categorical diffusion，分别拥有闭式前向分布和后验",
        "<strong>SE(3) 等变 GNN 参数化反向过程</strong>：蛋白与配体原子共同构图，边类型区分 protein-protein、ligand-ligand、protein-ligand，相互作用在 3D 空间中显式建模",
        "<strong>质心平移操作保证不变 likelihood</strong>：把蛋白原子 CoM 移到零，并用等变网络参数化 Markov transition，使复合物整体旋转和平移不改变 likelihood",
        "<strong>蛋白坐标固定、配体坐标更新</strong>：GNN 坐标更新使用 ligand mask，只移动待生成配体原子",
        "<strong>亲和力无监督特征</strong>：用 <span class=\"kb-math kb-math-inline\">t=0</span> 的一次前向推理得到原子类型分布熵和 hidden embedding，作为结合亲和力 ranking/prediction 信号",
        "<strong>CrossDocked2020 基准</strong>：训练使用筛选后的 100,000 个复合物，测试 100 个新蛋白口袋，并与 liGAN、AR、Pocket2Mol、GraphBP 对比"
      ],
      "detail": "<p><img alt=\"TargetDiff 模型总览\" src=\"https://ar5iv.labs.arxiv.org/html/2303.03543/assets/x1.png\" />\n<em>图 1：TargetDiff 的前向扩散逐步破坏配体坐标和原子类型，反向生成过程在蛋白口袋条件下恢复配体分布。</em></p>\n<p><img alt=\"TargetDiff 生成分子距离分布评估\" src=\"https://ar5iv.labs.arxiv.org/html/2303.03543/assets/x2.png\" />\n<em>图 2：TargetDiff 与基线在全原子距离和 C-C 距离分布上的对比；距离分布越接近真实分子，说明生成结构越符合化学几何。图像来自论文 ar5iv HTML，可访问来源为 <code>https://ar5iv.labs.arxiv.org/html/2303.03543</code>。</em></p>\n<pre><code class=\"language-python\"># TargetDiff 训练、采样与亲和力特征提取伪代码\ndef train_targetdiff(ligand, protein):\n    x0, v0 = ligand.coords, ligand.atom_type_onehot\n    xp, vp = protein.coords, protein.atom_features\n\n    # 平移到蛋白口袋 CoM 为零，蛋白在后续坐标更新中固定\n    xp_com = xp.mean(axis=0, keepdims=True)\n    x0, xp = x0 - xp_com, xp - xp_com\n\n    t = uniform_integer(1, T)\n    xt = gaussian_forward_noise(x0, t)       # 连续坐标扩散\n    vt = categorical_forward_noise(v0, t)    # 离散原子类型扩散\n\n    x0_hat, v0_hat, hidden = se3_gnn(\n        ligand_noisy=(xt, vt),\n        protein_context=(xp, vp),\n        t=t,\n        freeze_protein_coords=True,\n    )\n\n    loss_x = coordinate_kl_or_mse(x0_hat, x0, xt, t)\n    loss_v = categorical_kl(v0_hat, v0, vt, t)\n    optimizer.step(loss_x + lambda_v * loss_v)\n\n\ndef sample_targetdiff(protein):\n    n = sample_num_ligand_atoms(pocket_size=protein.size)\n    xt = standard_normal([n, 3])\n    vt = uniform_categorical([n, num_atom_types])\n\n    for t in reversed(range(1, T + 1)):\n        x0_hat, v0_hat, _ = se3_gnn((xt, vt), protein, t)\n        xt = sample_coordinate_posterior(xt, x0_hat, t)\n        vt = sample_categorical_posterior(vt, v0_hat, t)\n\n    molecule = openbabel_reconstruct_bonds(xt, argmax(vt))\n    return molecule\n\n\ndef affinity_features(protein, ligand):\n    # t=0 一次前向，不更新坐标分支，只读去噪类型分布和 hidden embedding\n    atom_type_prob, hidden = targetdiff_forward_t0(\n        protein, ligand, freeze_coordinate_update=True\n    )\n    entropy_score = entropy(atom_type_prob).mean()\n    return concat(entropy_score, pool(hidden))\n</code></pre>\n<p><strong>动机与背景：为什么靶点条件生成不能只靠自回归放原子？</strong></p>\n<p>靶点条件药物设计要求模型同时理解小分子内部几何和蛋白口袋的空间约束。voxel 生成模型可以把口袋和配体放进三维网格，但体素数随空间尺寸立方增长，且普通 3D CNN 不具备旋转等变性。Pocket2Mol、AR、GraphBP 等点云方法能显式建模原子坐标，却通常逐原子采样：前几个原子缺少上下文，后续生成又依赖已经采样出的局部结构，训练和推理分布不一致。TargetDiff 的核心改动是把配体作为完整 3D 点云进行扩散去噪，每一步都同时调整所有原子，使模型能在全局层面考虑“这个分子是否占满口袋、局部键长是否合理、原子类型是否匹配相互作用”。</p>\n<p><strong>扩散过程：坐标用高斯，类型用类别转移矩阵。</strong></p>\n<p>TargetDiff 把配体表示为 <span class=\"kb-math kb-math-inline\">M=[\\mathbf{x},\\mathbf{v}]</span>，其中 <span class=\"kb-math kb-math-inline\">\\mathbf{x}\\in\\mathbb{R}^{n\\times 3}</span> 是坐标，<span class=\"kb-math kb-math-inline\">\\mathbf{v}\\in\\{0,1\\}^{n\\times K}</span> 是原子类型 one-hot。坐标前向扩散为：</p>\n<div class=\"kb-math kb-math-display\">q(\\mathbf{x}_t\\mid \\mathbf{x}_{t-1})\n=\\mathcal{N}(\\mathbf{x}_t;\\sqrt{1-\\beta_t}\\mathbf{x}_{t-1},\\beta_t\\mathbf{I})</div>\n<p>原子类型前向扩散使用 categorical transition，把真实类别逐步混向均匀分布：</p>\n<div class=\"kb-math kb-math-display\">q(\\mathbf{v}_t\\mid \\mathbf{v}_{t-1})\n=\\mathrm{Cat}\\left(\\mathbf{v}_t;\\,(1-\\beta_t)\\mathbf{v}_{t-1}+\\beta_t/K\\right)</div>\n<p>因此任意时间步都可直接从 <span class=\"kb-math kb-math-inline\">\\mathbf{x}_0,\\mathbf{v}_0</span> 采样，且坐标后验和类别后验都有闭式形式。反向过程让网络预测 <span class=\"kb-math kb-math-inline\">\\hat{\\mathbf{x}}_0,\\hat{\\mathbf{v}}_0</span>，再代入后验得到 <span class=\"kb-math kb-math-inline\">p_\\theta(M_{t-1}\\mid M_t,P)</span>。</p>\n<p><strong>SE(3) 等变参数化：蛋白-配体复合物作为一张异质几何图。</strong></p>\n<p>蛋白口袋表示为 <span class=\"kb-math kb-math-inline\">P=\\{(\\mathbf{x}^P_i,\\mathbf{v}^P_i)\\}_{i=1}^{N_P}</span>，包含蛋白原子坐标、元素类型和氨基酸类型等特征。TargetDiff 将蛋白和配体原子放入同一图中，边特征标记连接属于 protein-protein、ligand-ligand 还是 protein-ligand。第 <span class=\"kb-math kb-math-inline\">\\ell</span> 层可概括为：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{m}_{ij}^{\\ell}=\\phi_m\\left(\\mathbf{h}_i^\\ell,\\mathbf{h}_j^\\ell,\\|\\mathbf{x}_i^\\ell-\\mathbf{x}_j^\\ell\\|^2,\\mathbf{e}_{ij},t\\right)</div>\n<div class=\"kb-math kb-math-display\">\\mathbf{h}_i^{\\ell+1}=\\phi_h\\left(\\mathbf{h}_i^\\ell,\\sum_j \\alpha_{ij}\\mathbf{m}_{ij}^{\\ell}\\right)</div>\n<div class=\"kb-math kb-math-display\">\\mathbf{x}_i^{\\ell+1}\n=\\mathbf{x}_i^\\ell+\\mathbb{1}[i\\in \\text{ligand}]\\cdot\n\\sum_j(\\mathbf{x}_i^\\ell-\\mathbf{x}_j^\\ell)\\phi_x(\\mathbf{m}_{ij}^{\\ell})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbb{1}[i\\in \\text{ligand}]</span> 是 ligand mask，保证蛋白坐标不被更新。因为消息只依赖距离和相对向量，整体旋转会让坐标输出同步旋转；整体平移通过把蛋白 CoM 移到零来处理。论文给出的命题是：若蛋白 CoM 被移到零且 Markov transition 由 SE(3) 等变网络参数化，则复合物的 likelihood 对全局平移和旋转不变。</p>\n<div class=\"key-point\">💡 关键：TargetDiff 的“target-aware”不是把蛋白序列编码成条件向量，而是让每个配体原子在每一层消息传递中都直接感知附近蛋白原子的 3D 几何和化学类型。</div>\n<p><strong>训练目标：坐标 KL/MSE 加类型 KL。</strong></p>\n<p>TargetDiff 可按变分下界训练。坐标部分是两个高斯后验之间的 KL：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\mathbf{x}}\n=D_{\\mathrm{KL}}\\left(\nq(\\mathbf{x}_{t-1}\\mid \\mathbf{x}_t,\\mathbf{x}_0)\n\\;\\|\\;\np_\\theta(\\mathbf{x}_{t-1}\\mid \\mathbf{x}_t,\\mathbf{v}_t,P)\n\\right)</div>\n<p>实践中也可使用未加权 MSE 直接回归 <span class=\"kb-math kb-math-inline\">\\mathbf{x}_0</span>。类型部分是类别分布 KL：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\mathbf{v}}\n=D_{\\mathrm{KL}}\\left(\nq(\\mathbf{v}_{t-1}\\mid \\mathbf{v}_t,\\mathbf{v}_0)\n\\;\\|\\;\np_\\theta(\\mathbf{v}_{t-1}\\mid \\mathbf{x}_t,\\mathbf{v}_t,P)\n\\right)</div>\n<p>最终损失为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}=\\mathcal{L}_{\\mathbf{x}}+\\lambda_{\\mathbf{v}}\\mathcal{L}_{\\mathbf{v}}</div>\n<p>采样时先根据相似口袋大小的训练分布采样配体原子数，从坐标高斯噪声和均匀原子类型开始迭代去噪。模型输出的是原子点云和类型，化学键仍由 OpenBabel 等工具根据距离与价态后处理推断；论文也指出把 bond generation 纳入扩散过程是后续改进方向。</p>\n<p><strong>亲和力排序：从去噪不确定性读出“是否像好 binder”。</strong></p>\n<p>TargetDiff 的一个额外贡献是把生成模型当作无监督特征提取器。给定一个蛋白-配体复合物，在 <span class=\"kb-math kb-math-inline\">t=0</span> 前向一次，冻结坐标更新分支，只更新 hidden embedding 并预测原子类型分布 <span class=\"kb-math kb-math-inline\">\\hat{\\mathbf{v}}</span>。直觉是：如果配体与口袋匹配良好，模型对各原子类型的预测应更确定，熵更低；如果几何或化学相互作用不合理，类型分布会更不确定。因此可以定义：</p>\n<div class=\"kb-math kb-math-display\">s_{\\mathrm{ent}}(M,P)=\\frac{1}{n}\\sum_{i=1}^{n}H(\\hat{\\mathbf{v}}_i)</div>\n<p>作为 ranking signal，也可以把最终 hidden embedding 池化后接线性层，增强监督亲和力预测模型。论文在 CrossDocked2020 和 PDBbind v2020 上展示了这种 unsupervised feature 对 ranking 和 prediction 的帮助。</p>\n<p><strong>实验解读与局限。</strong></p>\n<p>在 CrossDocked2020 评估中，TargetDiff 相比 liGAN、AR、GraphBP、Pocket2Mol 生成了更接近真实分子的键长/距离分布，并在更多测试口袋上获得更好的 Vina docking 表现。论文报告 TargetDiff 生成分子在 57% 的靶点上取得最优 median Vina energy，平均 58.1% 的样本比参考配体有更高预测亲和力。它的局限也很清楚：生成结果先是“原子点云”，键需要后处理推断，因此可能出现不理想环大小或合成可及性不如 Pocket2Mol 的情况。后续方法可以把键、片段或药效团约束纳入扩散变量，减少后处理误差。</p>",
      "quiz": {
        "q": "TargetDiff 相比逐原子自回归 SBDD 方法的主要优势是什么？",
        "options": [
          "它完全不需要蛋白口袋三维坐标",
          "它把整个配体点云作为一个整体去噪，减少生成顺序偏置并能同时利用全局口袋上下文",
          "它只优化 QED，因此不需要 docking 或亲和力评估",
          "它在扩散过程中直接生成蛋白序列而不是小分子"
        ],
        "answer": 1,
        "explain": "TargetDiff 采用非自回归扩散采样，每一步同时更新所有配体原子的坐标和类型；这避免了逐原子生成的顺序假设，并让模型在完整蛋白-配体几何图上建模相互作用。"
      }
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
      "summary": "Pocket2Mol 提出了一种 E(3)-等变的自回归 3D 分子生成器，在给定蛋白结合口袋后逐原子生成配体的坐标、元素类型和化学键，解决了早期 3D 口袋生成方法只建模原子密度、依赖 MCMC 采样且容易产生不真实键连结构的问题。",
      "keyPoints": [
        "<strong>口袋条件自回归生成</strong>：每一步从当前分子片段和蛋白口袋联合图中选择 frontier/focal atom，再生成新原子的相对坐标、元素和键类型",
        "<strong>E(3)-等变几何网络</strong>：使用 scalar/vector 特征、GVP/GVL 模块和向量神经元，让坐标预测随输入旋转平移正确变换",
        "<strong>可 tractable 的位置分布</strong>：用 focal atom 的向量表示直接参数化高斯混合分布，避免在 3D 连续空间中用 MCMC 搜索新原子位置",
        "<strong>联合预测化学键</strong>：在生成新原子后同时预测其与已有分子原子的键类型，把 no-bond 作为一类，减少后处理补键导致的三元环、畸变苯环等偏差",
        "<strong>局部几何注意力</strong>：element-and-bond predictor 对新原子邻域做消息传递，并用带几何 bias 的 scalar/vector attention 建模键之间的相容性",
        "<strong>训练方式</strong>：随机 mask 真实配体中的一部分原子，让模型从未 mask 的片段和口袋恢复 frontier、坐标、元素和键",
        "<strong>主要基准</strong>：在 CrossDocked 数据集上优于 CVAE 和 AR 基线，平均 Vina score、QED、SA、Lipinski 和生成速度都有优势"
      ],
      "detail": "<p><img alt=\"Pocket2Mol 生成流程\" src=\"https://arxiv.org/html/2205.07249v2/x1.png\" />\n<em>图 1：Pocket2Mol 的逐原子生成流程。左侧为蛋白口袋，右侧为当前分子片段；模型反复选择 frontier/focal atom、采样新原子位置、预测元素和键，直到没有 frontier。</em></p>\n<p><img alt=\"Pocket2Mol 键预测模块\" src=\"https://arxiv.org/html/2205.07249v2/x2.png\" />\n<em>图 2：element-and-bond predictor 的局部消息传递和注意力结构，用于预测新原子类型及其与已有原子的键类型。</em></p>\n<pre><code class=\"language-python\"># Pocket2Mol 自回归采样伪代码\nprotein_atoms = load_pocket_atoms()\nmol = empty_fragment()\n\nwhile True:\n    h_scalar, h_vector = equivariant_encoder(protein_atoms, mol)\n\n    if mol.is_empty():\n        frontier = predict_protein_frontier(h_scalar, h_vector, radius=4.0)\n    else:\n        frontier = predict_molecule_frontier(h_scalar, h_vector, mol)\n\n    if frontier.is_empty():\n        break\n\n    focal = sample(frontier)\n    delta_x = sample_gmm(position_predictor(h_scalar[focal], h_vector[focal]))\n    x_new = coord(focal) + delta_x\n\n    local_neighbors = knn(protein_atoms + mol.atoms, x_new)\n    atom_type = sample(element_predictor(x_new, local_neighbors))\n    bonds = sample_bond_types(bond_predictor(x_new, mol.atoms, local_neighbors))\n\n    if valid_valence(atom_type, bonds):\n        mol.add_atom(atom_type, x_new, bonds)\n</code></pre>\n<p><strong>动机与问题设定</strong></p>\n<p>Pocket2Mol 处理的是结构基础药物设计中的条件生成问题：输入蛋白质 3D 结合口袋 <span class=\"kb-math kb-math-inline\">P=\\{(a_i,\\mathbf{x}_i)\\}_{i=1}^{N_p}</span>，输出一个小分子图 <span class=\"kb-math kb-math-inline\">M=(V,E,\\mathbf{X})</span>，其中既要有合理的 3D 坐标，也要有化学上合理的元素和键。此前方法常见两类缺陷：SMILES/2D 图方法无法保证生成物真的适配 3D 口袋；3D 原子密度方法虽然能生成坐标，却往往忽略键类型，最后依赖 OpenBabel 等工具补键，容易产生不真实的小环或畸变芳香环。</p>\n<p>Pocket2Mol 的核心选择是把 3D 生成拆成一个局部自回归过程。当前已生成片段中的 frontier atom 表示仍可向外连接的位置；focal atom 是本轮选中的连接点；新原子坐标以 focal atom 为局部参考生成。这样模型不必一次性在整个口袋中预测完整分子，而是在局部几何和化学约束都相对清楚的条件下扩展分子。</p>\n<p><strong>E(3)-等变编码器</strong></p>\n<p>模型把蛋白口袋原子和当前分子片段合并成 KNN 图。节点包含原子元素、氨基酸类型、骨架/侧链标记、分子/蛋白标记、价键计数等 scalar 特征；边包含 RBF 编码距离、键类型、是否有价键等 scalar 特征；同时节点保留坐标向量，边保留单位方向向量作为 vector 特征。编码器用 GVP/GVL 风格的消息传递同时更新 scalar 和 vector 表示。</p>\n<p>等变性要求如果输入坐标做旋转平移 <span class=\"kb-math kb-math-inline\">\\mathbf{x}&#x27;=R\\mathbf{x}+\\mathbf{t}</span>，模型输出的相对坐标也应按同样旋转变化：</p>\n<div class=\"kb-math kb-math-display\">f_{\\theta}(R\\mathbf{X}+\\mathbf{t}) = R f_{\\theta}(\\mathbf{X})</div>\n<p>由于位置预测器直接使用 vector hidden state 生成相对坐标，Pocket2Mol 不需要人为构造局部球坐标系，也不需要通过采样距离约束再求解三维位置。</p>\n<p><strong>四类预测头与损失函数</strong></p>\n<p>frontier predictor 对每个候选原子输出是否还能扩展的概率：</p>\n<div class=\"kb-math kb-math-display\">p_i^{\\text{frontier}}=\\sigma(\\mathrm{GVMLP}(\\mathbf{h}_i))</div>\n<p>position predictor 以 focal atom 的表示为输入，输出新原子相对位移的高斯混合分布：</p>\n<div class=\"kb-math kb-math-display\">p(\\Delta \\mathbf{x}\\mid f)=\\sum_{k=1}^{K}\\pi_k(f)\\,\n\\mathcal{N}\\left(\\Delta \\mathbf{x};\\boldsymbol{\\mu}_k(f),\\operatorname{diag}(\\boldsymbol{\\sigma}_k^2(f))\\right)</div>\n<p>element-and-bond predictor 先在新位置附近收集 KNN 邻居，为新原子构造局部表示，再预测元素类别；同时对新原子与已有分子原子的边做分类，类别包括单键、双键、三键、芳香键和 no-bond。键预测注意力中的几何 bias 用来表达“两个键是否能同时存在”的局部相容性，例如一个原子已形成双键后，其剩余价态会限制其他键。</p>\n<p>训练时随机 mask 配体原子，未 mask 且连接到 mask 部分的原子作为 frontier，模型恢复被 mask 原子的坐标、元素和键。总体损失是四个监督项之和：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}=\n\\mathcal{L}_{\\text{frontier}}\n+\\mathcal{L}_{\\text{pos}}\n+\\mathcal{L}_{\\text{element}}\n+\\mathcal{L}_{\\text{bond}}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_{\\text{frontier}}</span> 是二元交叉熵，<span class=\"kb-math kb-math-inline\">\\mathcal{L}_{\\text{pos}}</span> 是真实相对坐标在 GMM 下的负对数似然，元素和键分别使用交叉熵。为了让模型学会“这里不该放原子”，元素分类还加入 Nothing 类，并从环境空间采样负位置。</p>\n<p><strong>与密度采样方法的区别</strong></p>\n<p>AR 基线先学习口袋条件下的 3D 原子密度，再用 MCMC 在连续空间寻找可能位置；Pocket2Mol 则让等变网络直接输出相对坐标分布，因此采样速度明显更快。论文在 CrossDocked 上报告生成 100 个有效分子时，Pocket2Mol 平均约 2503 秒，AR 约 19659 秒，速度差主要来自避免 MCMC 反复探索 3D 空间。</p>\n<p>更重要的是，Pocket2Mol 在生成坐标的同时生成键。论文的子结构分析指出，CVAE/AR 容易产生过多三元环或畸变环结构；Pocket2Mol 的环大小分布、键角和二面角分布更接近真实数据。这说明对结构基础生成而言，Vina/QED 等标量指标不足以判断分子是否可化学解释，必须同时约束生成过程中的键连结构。</p>\n<div class=\"key-point\">💡 关键：Pocket2Mol 的“高效”不是简单减少步骤，而是把连续 3D 位置搜索变成 focal atom 条件下的显式概率预测，同时把化学键放进生成循环，减少后处理误差。</div>",
      "quiz": {
        "q": "Pocket2Mol 为什么能比依赖 MCMC 的自回归 3D 生成方法更快？",
        "options": [
          "它完全不生成 3D 坐标，只输出 SMILES",
          "它用 focal atom 的等变向量表示直接参数化新原子相对坐标分布",
          "它固定所有分子的键长和键角，不需要神经网络预测",
          "它只在训练集分子中检索最相似配体"
        ],
        "answer": 1,
        "explain": "Pocket2Mol 的位置预测器输出相对坐标的高斯混合分布，可直接采样新原子位置；这避免了在连续 3D 空间中用 MCMC 反复搜索。"
      }
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
      "summary": "Apo2Mol 提出从 apo 未结合态口袋直接生成 3D 配体并同步预测 holo 结合态口袋构象的扩散框架，用实验解析的 apo-holo 结构对学习 ligand-induced fit，缓解了多数 SBDD 生成模型把蛋白口袋当作刚体模板的问题。",
      "keyPoints": [
        "<strong>动态口袋设定</strong>：输入 apo pocket，不假设已有 holo pocket；输出生成配体以及配体诱导后的 holo pocket 构象",
        "<strong>实验结构对数据集</strong>：基于 PLINDER/PDB 筛选 apo-holo-ligand 三元组，公开数据集说明包含 24,601 组 apo-holo 配对",
        "<strong>联合扩散过程</strong>：配体坐标和原子类型逐步加噪，蛋白口袋从 holo 状态沿 residue-level 变换插值到 apo 状态",
        "<strong>残基层口袋变换</strong>：不用直接预测每个蛋白原子坐标，而是预测 residue-level translation、rotation quaternion 和 side-chain chi angle update，保持蛋白局部结构合理",
        "<strong>层级复合图</strong>：构建 protein-ligand complex graph，包含 intra-ligand、ligand-residue、intra-residue、inter-residue 四类边",
        "<strong>SE(3)-等变消息传递</strong>：节点同时携带 invariant chemical context 和 equivariant 3D position，通过 attention-based GNN 捕获配体与口袋局部相互作用",
        "<strong>评测优势</strong>：在 apo 输入场景中平均 Vina min 优于 IPDiff、TargetDiff、Pocket2Mol、DecompDiff，并能生成与真实 apo-holo RMSD 分布相近的口袋变化"
      ],
      "detail": "<p><img alt=\"Apo2Mol 扩散总览\" src=\"https://arxiv.org/html/2511.14559v1/x2.png\" />\n<em>图 1：Apo2Mol 的前向和反向过程。前向过程把 holo pocket-ligand pair 破坏为 apo-like pocket 与噪声配体；反向过程从 apo pocket 出发同时恢复 holo pocket 和配体。</em></p>\n<p><img alt=\"Apo2Mol 框架结构\" src=\"https://arxiv.org/html/2511.14559v1/x3.png\" />\n<em>图 2：Apo2Mol 的层级图消息传递框架，用 SE(3)-等变 GNN 联合建模配体生成和口袋 refinement。</em></p>\n<blockquote>\n<p>来源说明：任务给定的 AAAI URL 为 <code>/article/view/37001</code>，实际可访问的 AAAI-26 PDF/页面在检索中对应 <code>/article/view/37138</code>，扩展版 arXiv 为 <code>https://arxiv.org/abs/2511.14559</code>。以下方法解读基于可访问的 AAAI/arXiv 内容与公开数据集说明。</p>\n</blockquote>\n<pre><code class=\"language-python\"># Apo2Mol 训练与采样伪代码\nfor apo_pocket, holo_pocket, ligand in apo_holo_ligand_dataset:\n    t = sample_time()\n\n    # 配体前向扩散：坐标加高斯噪声，原子类型做离散扩散\n    ligand_x_t = gaussian_noise(ligand.coords, t)\n    ligand_a_t = categorical_noise(ligand.atom_types, t)\n\n    # 口袋前向过程：把 holo 逐步插值到 apo\n    trans_t = interpolate_translation(holo_pocket, apo_pocket, t)\n    rot_t = slerp_quaternion(holo_pocket, apo_pocket, t)\n    chi_t = interpolate_chi_angles(holo_pocket, apo_pocket, t)\n    pocket_t = apply_residue_transforms(holo_pocket, trans_t, rot_t, chi_t)\n\n    complex_graph = build_hierarchical_graph(\n        pocket_t, ligand_x_t, ligand_a_t,\n        edge_types=[&quot;ligand&quot;, &quot;ligand-residue&quot;, &quot;intra-residue&quot;, &quot;inter-residue&quot;]\n    )\n\n    pred_ligand_x0, pred_ligand_atoms, pred_trans, pred_rot, pred_chi = model(\n        complex_graph, t\n    )\n\n    loss = (\n        ligand_position_loss(pred_ligand_x0, ligand.coords)\n        + ligand_type_kl(pred_ligand_atoms, ligand.atom_types)\n        + pocket_translation_mse(pred_trans)\n        + pocket_rotation_l1_and_unit_norm(pred_rot)\n        + pocket_chi_cosine_loss(pred_chi)\n    )\n    optimize(loss)\n\n# 推理：从 apo pocket 和随机配体噪声开始，反向积分/去噪\nligand_t = random_ligand_prior()\npocket_t = apo_pocket\nfor t in reversed(schedule):\n    graph_t = build_hierarchical_graph(pocket_t, ligand_t)\n    ligand_t, pocket_t = denoise_one_step(model, graph_t, t)\nreturn ligand_t, pocket_t\n</code></pre>\n<p><strong>为什么要从 apo 到 holo 联合建模</strong></p>\n<p>传统 pocket-based 3D molecule generation 通常使用 ligand-bound holo pocket 作为条件，默认蛋白结合位点刚性不变。但真实分子识别常有 induced fit：配体进入后，侧链旋转、局部 backbone 平移、甚至多个残基协同重排。对于新靶点，研究者更常拥有 apo 结构或预测结构，而不是高质量 holo 复合物；如果生成模型只会围绕 holo 模板设计，就会在真实应用中产生训练/测试错配。</p>\n<p>Apo2Mol 把目标定义为条件分布：</p>\n<div class=\"kb-math kb-math-display\">p_{\\theta}(M_{\\text{ligand}}, P_{\\text{holo}}\\mid P_{\\text{apo}})</div>\n<p>也就是说，模型不仅要生成分子 <span class=\"kb-math kb-math-inline\">M_{\\text{ligand}}</span>，还要预测该分子诱导后的结合态口袋 <span class=\"kb-math kb-math-inline\">P_{\\text{holo}}</span>。这使配体几何和口袋形变成为同一个反向生成过程中的耦合变量，而不是先生成配体、再单独做 docking 或结构松弛。</p>\n<p><strong>前向扩散：配体加噪，口袋沿 apo-holo 轨迹插值</strong></p>\n<p>对配体坐标，Apo2Mol 沿用 3D 扩散模型的高斯加噪：</p>\n<div class=\"kb-math kb-math-display\">q(\\mathbf{x}_t\\mid \\mathbf{x}_0)=\n\\mathcal{N}\\left(\\sqrt{\\bar{\\alpha}_t}\\mathbf{x}_0,\\,(1-\\bar{\\alpha}_t)\\mathbf{I}\\right)</div>\n<p>对配体原子类型，使用离散 categorical diffusion，把真实类别逐步破坏为噪声类别分布。与配体不同，口袋不从标准高斯先验采样，因为蛋白构象需要保持残基几何与化学合理性。论文先对 apo/holo pocket 做 RMSD alignment，再用 Kabsch 估计 residue-level translation/rotation，并提取 side-chain chi angle update。</p>\n<p>平移和 chi angle 用时间步插值，rotation 用 quaternion 的 spherical linear interpolation：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{q}_t=\\operatorname{Slerp}\\left(\\mathbf{q}_{\\text{holo}\\rightarrow\\text{apo}},\\,\\mathbf{I};\\,t\\right)\\otimes\\boldsymbol{\\epsilon}_t</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\boldsymbol{\\epsilon}_t</span> 是围绕单位四元数的小扰动，用于提升鲁棒性。这样 <span class=\"kb-math kb-math-inline\">t=0</span> 近似 holo，<span class=\"kb-math kb-math-inline\">t=1</span> 近似 apo；反向生成就是从 apo 端走回与配体匹配的 holo 端。</p>\n<p><strong>层级复合图和 SE(3)-等变消息传递</strong></p>\n<p>Apo2Mol 的图不是简单把所有原子混成一种 KNN 边，而是显式区分四类关系：配体内部边、配体-残基边、残基内部原子边、残基间边。这样做的作用是把小分子化学结构、配体-蛋白相互作用、残基内部刚性和残基间协同运动分开编码，避免模型把“配体成键”和“蛋白构象变化”混成同一种边更新。</p>\n<p>每个节点有 invariant feature <span class=\"kb-math kb-math-inline\">\\mathbf{h}_i</span> 和 equivariant coordinate/vector feature <span class=\"kb-math kb-math-inline\">\\mathbf{v}_i</span>。消息传递层可以概括为：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{h}_i^{(\\ell+1)} =\n\\mathbf{h}_i^{(\\ell)} +\n\\sum_{j\\in\\mathcal{N}(i)}\n\\phi_h(\\mathbf{h}_i^{(\\ell)}, \\mathbf{h}_j^{(\\ell)}, e_{ij}, \\|\\mathbf{x}_i-\\mathbf{x}_j\\|)</div>\n<div class=\"kb-math kb-math-display\">\\mathbf{x}_i^{(\\ell+1)} =\n\\mathbf{x}_i^{(\\ell)} +\n\\sum_{j\\in\\mathcal{N}(i)}\n(\\mathbf{x}_i-\\mathbf{x}_j)\\,\\phi_x(\\mathbf{h}_i^{(\\ell)}, \\mathbf{h}_j^{(\\ell)}, e_{ij})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\phi_h</span> 更新化学上下文，<span class=\"kb-math kb-math-inline\">\\phi_x</span> 输出沿相对方向的等变坐标更新。这个结构保证旋转输入复合物时，坐标更新也随之旋转，而 drug-likeness、原子类型等 invariant 输出不受全局朝向影响。</p>\n<p><strong>输出头与训练目标</strong></p>\n<p>配体侧直接输出去噪坐标 <span class=\"kb-math kb-math-inline\">\\hat{\\mathbf{x}}_0</span> 和原子类型分布 <span class=\"kb-math kb-math-inline\">\\hat{\\mathbf{a}}_0</span>。蛋白侧先用 SAGPooling 从 atom-level 表示聚合到 residue-level，再分别预测 residue translation、rotation quaternion 和 chi angle update。整体损失可写成：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}=\n\\lambda_x\\mathcal{L}_{\\text{lig-pos}}\n+\\lambda_a\\mathcal{L}_{\\text{lig-type}}\n+\\lambda_t\\mathcal{L}_{\\text{trans}}\n+\\lambda_r\\mathcal{L}_{\\text{rot}}\n+\\lambda_{\\chi}\\mathcal{L}_{\\chi}</div>\n<p>其中 ligand position 使用坐标误差，ligand atom type 使用 categorical KL；translation 用 MSE；rotation 用 L1 加单位范数正则，保证预测四元数仍在单位球附近；chi angle 用 cosine loss，避免角度周期性导致 <span class=\"kb-math kb-math-inline\">0</span> 和 <span class=\"kb-math kb-math-inline\">2\\pi</span> 被错误视为相距很远。</p>\n<p><strong>结果与局限</strong></p>\n<p>在 apo 输入评测中，Apo2Mol 的平均 Vina min 为 -6.79，优于 IPDiff 的 -6.40、DecompDiff 的 -6.37、TargetDiff 的 -5.19 和 Pocket2Mol 的 -3.30；High Affinity 达到 42.7%。在以 native holo pocket 评估配体质量的设置中，Apo2Mol 仍达到平均 Vina min -7.86 和 High Affinity 52.9%，说明从 apo 端生成并不只是拟合生成口袋本身，也能产生更有竞争力的配体。</p>\n<p>论文也指出生成 pocket 与真实 holo pocket 的 RMSD 分布仍存在一定 gap。这是合理的：从单个 apo 构象预测具体 ligand-induced holo 构象本身是多模态问题，同一 apo pocket 可能对应多个可行结合态。Apo2Mol 的贡献在于把这个多模态构象变化显式纳入生成模型，而不是把它留给后处理。</p>\n<div class=\"warn-box\">⚠️ 注意：Apo2Mol 相比 TargetDiff 的关键变化不是“把扩散网络换大”，而是改变了条件变量本身：模型输入的是 apo pocket，生成过程同时解决配体生成和口袋 refinement。</div>",
      "quiz": {
        "q": "Apo2Mol 为什么用 residue-level translation/rotation/chi angle 预测口袋变化，而不是直接预测所有蛋白原子坐标？",
        "options": [
          "因为模型不需要任何蛋白结构信息",
          "因为 residue-level 变换更容易保持蛋白局部几何和侧链物理合理性",
          "因为配体生成只依赖 SMILES 字符串",
          "因为四元数只能表示配体原子类型"
        ],
        "answer": 1,
        "explain": "直接预测全原子坐标容易破坏残基内部几何；Apo2Mol 用残基层平移、四元数旋转和 chi 角更新表达构象变化，更符合蛋白 pocket 的结构约束。"
      }
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
      "summary": "Genie 3 是一个全原子 SE(3)-等变蛋白结构扩散模型，通过把蛋白质视为带侧链分支的聚合物、在 single/pair latent 上做强耦合推理，并结合 binder 设计的搜索与迭代条件更新，在无条件生成、motif scaffolding 和 binder design 上推进了等变扩散模型的能力边界。",
      "keyPoints": [
        "<strong>全原子 SE(3)-等变扩散</strong>：不只生成 Cα/backbone，而是把侧链重原子纳入等变结构表示，用 branched polymer/frame tree 表达主链与侧链分支",
        "<strong>LatentTransformer 主干</strong>：single representation 与 pair representation 每层双向通信，pair 侧使用 triangular multiplicative update，single 侧使用 reduced IPA",
        "<strong>IPA 结构解码器</strong>：StructureNet 用 Invariant Point Attention、transition 和 backbone/frame update 逐层更新 residue frames，输出结构坐标",
        "<strong>序列头联合预测</strong>：公开代码包含从 single representation 到 20 种氨基酸 logits 的 SequenceNet，可服务 inverse design 或联合训练信号",
        "<strong>三类应用</strong>：官方仓库直接支持 unconditional generation、motif scaffolding 和 binder design 三套 CLI 工作流",
        "<strong>binder 推理增强</strong>：支持 beam search，用 ColabFold reward 在扩散 checkpoint 处筛选轨迹；也支持 iterative design，把前几轮成功界面的统计信息反馈到后续条件",
        "<strong>训练数据与评估</strong>：官方仓库列出 AlphaFold DB representatives、PiNDER 数据，评估使用 ESMFold/ColabFold、ProteinMPNN、FoldSeek clustering、自一致 RMSD、motif RMSD 和界面 PAE 等指标",
        "<strong>实验宣称</strong>：公开摘要称 Genie 3 在 binder design、motif scaffolding、unconditional generation 达到 SOTA，并在 Adaptyv Bio Nipah Competition 中设计出 Nipah Glycoprotein G 纳摩尔级 binder，实验成功率 12.5%"
      ],
      "detail": "<p><img alt=\"Genie 3 binder design demo\" src=\"https://raw.githubusercontent.com/aqlaboratory/genie3/main/assets/binder_design_demo.gif\" />\n<em>图：Genie 3 官方仓库提供的 binder design demo。bioRxiv 页面在当前环境触发 Cloudflare 校验，方法图未能直接读取；此处使用官方 GitHub 可访问资源作为图示来源。</em></p>\n<blockquote>\n<p>来源说明：任务给定的 bioRxiv URL <code>10.1101/2026.05.05.649431v1</code> 未能检索到对应记录；可访问公开来源显示 Genie 3 预印本 DOI 为 <code>10.64898/2026.05.01.722168v1</code>，题名为 <em>Fast and Ultra-Capable Protein Design: Advancing the Frontier Through Atomistic SE(3)-Equivariance with Genie 3</em>。正文页面受 Cloudflare 阻挡，因此下述解读综合官方 GitHub、作者页面摘要、检索摘要和公开代码结构。</p>\n</blockquote>\n<pre><code class=\"language-python\"># Genie 3 结构扩散与 binder 设计伪代码\nfor protein_or_complex in training_data:\n    frames_0, atom_coords_0, seq = featurize_all_atom_branched_polymer(protein_or_complex)\n    t = sample_timestep()\n    atom_coords_t = add_diffusion_noise(atom_coords_0, t)\n    single, pair, init_frames = embed(atom_coords_t, seq, t, conditions)\n\n    # LatentTransformer: single &lt;-&gt; pair 双向通信\n    for block in latent_transformer:\n        single = single + reduced_ipa(single, pair, mask)\n        pair = pair + single_to_pair(single)\n        pair = pair + triangle_multiplication_outgoing(pair)\n        pair = pair + triangle_multiplication_incoming(pair)\n        pair = pair_transition(pair)\n\n    # StructureNet: IPA + transition + frame update\n    frames = init_frames\n    for layer in structure_net:\n        single = single + ipa(single, pair, frames, mask)\n        single = structure_transition(single)\n        frames = compose(frames, backbone_or_branch_update(single))\n\n    pred_coords_0 = frames_to_all_atom_coords(frames)\n    seq_logits = sequence_head(single)\n    loss = coord_or_fape_loss(pred_coords_0, atom_coords_0) + sequence_ce(seq_logits, seq)\n    optimize(loss)\n\n# Binder design 推理\ndesigns = diffuse_conditioned_on_target(target_structure, hotspots_or_interface)\nif beam_search:\n    designs = keep_top_by_colabfold_reward(designs, checkpoints)\nif iterative_design:\n    interface_stats = summarize_successful_interfaces(previous_rounds)\n    designs = resample_with_updated_interface_condition(interface_stats)\n</code></pre>\n<p><strong>从 Genie/Genie 2 到 Genie 3：重新评估等变性的价值</strong></p>\n<p>早期 Genie 系列强调 SE(3)-等变扩散：输入结构旋转或平移时，模型输出的位移和坐标也按同一刚体变换变化。这类模型数据效率高、推理快，但常被认为在复杂 binder interface、全原子侧链和多 motif 约束上不如更重的全原子非等变或 hallucination 管线。Genie 3 的公开摘要把问题表述为 generation-hallucination gap：hallucination 方法直接优化 AlphaFold/ColabFold 等 oracle，成功率高但计算成本大；扩散生成快但复杂任务成功率不足。</p>\n<p>Genie 3 的回答是把等变建模推进到全原子层面，而不是放弃等变性。它将蛋白质表示为 branched polymer：主链是线性聚合物，侧链由残基 frame 派生出分支 frame。这样，结构生成不再只关心 Cα 或 backbone trace，而能把侧链原子和界面几何纳入同一个 SE(3)-一致的坐标系统。等变约束可写为：</p>\n<div class=\"kb-math kb-math-display\">\\hat{\\mathbf{X}}_0(R\\mathbf{X}_t+\\mathbf{t}, c, t)\n=R\\hat{\\mathbf{X}}_0(\\mathbf{X}_t,c,t)+\\mathbf{t}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{X}_t</span> 是带噪全原子坐标或 frame 表示，<span class=\"kb-math kb-math-inline\">c</span> 是 motif、target、hotspot/interface 等条件。这个性质减少了模型需要从数据中重新学习全局朝向不变性的负担。</p>\n<p><strong>LatentTransformer：single/pair 的紧耦合几何推理</strong></p>\n<p>公开代码显示，Genie 3 的 <code>LatentTransformerBlock</code> 维护两套表示：single <span class=\"kb-math kb-math-inline\">s_i</span> 表示每个 token/residue 的局部状态，pair <span class=\"kb-math kb-math-inline\">p_{ij}</span> 表示 residue pair 的相互关系。每层先用 reduced IPA 把 pair bias 注入 single，再把 single 通过线性投影回写到 pair：</p>\n<div class=\"kb-math kb-math-display\">p_{ij}\\leftarrow p_{ij}+W_p(W_i s_i+W_j s_j)</div>\n<p>随后 pair 侧执行 triangular multiplicative updates：</p>\n<div class=\"kb-math kb-math-display\">p_{ij}\\leftarrow p_{ij}\n+\\operatorname{TriMulOut}(p)_{ij}\n+\\operatorname{TriMulIn}(p)_{ij}\n+\\operatorname{PairTransition}(p_{ij})</div>\n<p>这类三角更新来自 AlphaFold/Evoformer 系列，直觉是让 <span class=\"kb-math kb-math-inline\">i</span>-<span class=\"kb-math kb-math-inline\">j</span> 的关系通过第三个 residue <span class=\"kb-math kb-math-inline\">k</span> 进行一致性校正。对 binder 和 motif scaffolding 来说，界面上的几何约束不是两两独立的：一个 hotspot、一个疏水 patch、一个 backbone 方向会共同约束多对残基关系，pair latent 的三角通信正是为这种高阶一致性服务。</p>\n<p>代码还支持 global tokens，用于在长链或复合物设计中携带全局上下文。作者公开摘要称模型能泛化到比训练长度更长的蛋白，这与 global token、pair communication 和等变局部 frame 表示共同相关。</p>\n<p><strong>IPA 结构解码器与全原子 frame 更新</strong></p>\n<p><code>StructureNet</code> 由多层 <code>StructureLayer</code> 组成，每层包含 Invariant Point Attention、StructureTransition 和 BackboneUpdate。IPA 的注意力分数同时使用 scalar query/key、pair bias 和点集距离项：</p>\n<div class=\"kb-math kb-math-display\">a_{ij}^{h}\n=\n\\frac{q_i^h\\cdot k_j^h}{\\sqrt{d}}\nb_{ij}^h\n-\\frac{1}{2}\\sum_m w_h\\left\\|T_i q_{i,m}^h-T_j k_{j,m}^h\\right\\|^2</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">T_i</span> 是 residue frame，点查询/键先在局部 frame 中生成，再变换到全局坐标计算距离。因为距离项对全局旋转平移不变，而 frame update 输出在局部坐标中组合，IPA 能在保持 SE(3)-一致性的同时让网络“看见”真实 3D 几何。</p>\n<p>Genie 3 的全原子性可以理解为：扩散变量不只是 backbone frame，而是通过 backbone 与 side-chain branch frame 共同决定全原子位置。训练目标可概括为去噪结构误差、局部 frame 对齐误差和序列预测误差的组合：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}\n=\n\\lambda_{\\text{coord}}\\|\\hat{\\mathbf{X}}_0-\\mathbf{X}_0\\|_2^2\n+\\lambda_{\\text{FAPE}}\\mathcal{L}_{\\text{FAPE}}\n+\\lambda_{\\text{seq}}\\operatorname{CE}(\\hat{\\mathbf{a}},\\mathbf{a})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_{\\text{FAPE}}</span> 用局部 frame 度量坐标误差，能减少全局刚体变换对损失的干扰；SequenceNet 则把 single representation 映射到氨基酸 logits。公开仓库的损失工具包含 FAPE/MSE，说明实现层面会同时关心坐标精度和 frame 一致性。</p>\n<p><strong>推理扩展：beam search 与 iterative design</strong></p>\n<p>Genie 3 不只给出一个 denoiser，还把真实设计工作流纳入采样。官方仓库的 binder design 配置支持 beam search：同时展开 <span class=\"kb-math kb-math-inline\">N</span> 条扩散轨迹，在若干 checkpoint 用 ColabFold reward 评估复合物，保留 top <span class=\"kb-math kb-math-inline\">N</span> 继续去噪。这相当于在生成过程中引入外部 oracle，但只在少数节点评估，而不是对每个序列做昂贵的持续优化。</p>\n<p>iterative design 则利用前几轮成功设计的共同界面信息更新条件。若 round 0 产生了一批通过过滤器的复合物，后续 round 可以提取 common interface 或按成功频率采样 interface residues，再把这些信息注入条件分布：</p>\n<div class=\"kb-math kb-math-display\">p_{\\theta}^{(r+1)}(\\mathbf{X}\\mid T, C_{r+1}),\\quad\nC_{r+1}=g(C_r,\\{\\text{successful interfaces}\\}_{0:r})</div>\n<p>这是一种 inference-time scaling：额外计算不是简单生成更多样本，而是把已发现的成功模式反馈给下一轮采样。对于 binder design，这比无记忆地增加采样数更有效，因为界面热点覆盖、binder pTM、interaction PAE 等过滤条件本身具有强几何约束。</p>\n<p><strong>评估与实验解读</strong></p>\n<p>官方仓库把三类任务拆开评估：无条件生成用 self-consistency RMSD 小于 2 Å 作为 in-silico success；motif scaffolding 同时检查整体 self-consistency 和 motif Cα/backbone/all-atom RMSD；binder design 使用 ColabFold 预测复合物，过滤条件包括 complex self-consistency RMSD、binder pTM、minimum interface PAE 和 hotspot coverage，并用 FoldSeek 聚类衡量多样性。</p>\n<p>公开摘要中最具代表性的湿实验结果是 Nipah Glycoprotein G binder：这是结构和生物物理表征较少的四聚体靶标，Genie 3 在 Adaptyv Bio Nipah Competition 中得到纳摩尔级 binder，成功率 12.5%。这说明该方法的价值不只在更低 RMSD 或更好 in-silico 指标，而在于把全原子几何推理、快速等变采样和 oracle-guided 搜索结合成可实际闭环的设计流程。</p>\n<div class=\"warn-box\">⚠️ 注意：当前环境无法直接读取 bioRxiv 正文，且任务元信息的 <code>paper_url</code> 与公开检索到的 DOI 不一致；因此本文对具体图号和论文内部超参数不做臆造，方法机制以官方仓库和公开摘要可核验信息为边界。</div>",
      "quiz": {
        "q": "Genie 3 中 LatentTransformer 的核心作用是什么？",
        "options": [
          "把蛋白结构转换成 SMILES 字符串",
          "让 single 表示和 pair 表示逐层双向通信，并用三角更新强化几何一致性",
          "只根据氨基酸频率随机采样序列",
          "在生成完成后用 OpenBabel 自动补全化学键"
        ],
        "answer": 1,
        "explain": "公开代码显示 LatentTransformer 先用 reduced IPA 更新 single，再将 single 信息写回 pair，并对 pair 做 triangular multiplicative update；这正是复杂 motif 和 binder interface 推理所需的高阶几何一致性机制。"
      }
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
      "summary": "Megalodon 提出一个面向 3D 分子生成的可扩展 Transformer 架构，把连续 3D 坐标与离散原子类型、键类型、形式电荷联合去噪，解决了许多几何生成模型“2D 图有效但 3D 构象质量差”的问题。它还把同一架构放到扩散与流匹配两种目标下比较，并通过混合时间噪声与自条件机制显著提升大分子有效生成和低能构象质量。",
      "keyPoints": [
        "<strong>多模态分子表示</strong>：同时生成坐标 <span class=\"kb-math kb-math-inline\">X</span>、原子类型 <span class=\"kb-math kb-math-inline\">H</span>、键类型 <span class=\"kb-math kb-math-inline\">E</span> 与形式电荷 <span class=\"kb-math kb-math-inline\">C</span>，而不是先生成点云再用 OpenBabel 推断化学键",
        "<strong>融合式 Invariant Transformer</strong>：把结构特征、原子特征、键特征分别嵌入后融合为 token，用多头注意力建模离散分子拓扑的全局依赖",
        "<strong>轻量等变结构更新层</strong>：Transformer 更新离散不变量，EGNN 距离更新与 cross-product 项更新 3D 坐标，使结构预测保持旋转/平移等变并增强手性相关几何表达",
        "<strong>扩散与流匹配统一评估</strong>：同一 Megalodon 架构分别训练为 diffusion 和 flow matching 版本，扩散版结构/能量更强，流匹配版推理步数更少、2D 稳定性更好",
        "<strong>混合时间噪声设计</strong>：连续坐标与离散图特征使用独立噪声时间 <span class=\"kb-math kb-math-inline\">t_{\\text{continuous}}</span>、<span class=\"kb-math kb-math-inline\">t_{\\text{discrete}}</span>，缓解传统单时间扩散中“前半程键特征几乎无信息”的训练浪费",
        "<strong>自条件外层包装</strong>：先预测一次 <span class=\"kb-math kb-math-inline\">x_{\\text{sc}}</span>，再把它与当前噪声状态融合后第二次预测，提升训练收敛和 3D 分子生成稳定性",
        "<strong>面向真实 3D 质量的评估</strong>：除了 atom stability、molecule stability、RDKit validity，还加入键角/二面角分布、条件构象 RMSD、xTB 能量等更贴近物理的指标",
        "<strong>大分子泛化提升</strong>：40M 参数版本在大分子设置下相对强基线生成最多 49 倍更多有效分子，并得到 2-10 倍更低的结构能量"
      ],
      "detail": "<h5>模型架构总览</h5>\n<p><img alt=\"Megalodon 架构示意图\" src=\"https://arxiv.org/html/2505.18392v1/x1.png\" />\n<em>图：Megalodon 的核心架构。分子被拆为 3D 坐标、原子类型、键类型和形式电荷；各模态分别嵌入后送入融合式 Invariant Transformer，离散头预测原子/键/电荷，结构头通过 EGNN 层更新坐标并细化键。任务给定 RSC 链接可访问到论文页面；更完整的方法图与公式可见 arXiv HTML: https://arxiv.org/html/2505.18392v1。</em></p>\n<h5>算法核心流程</h5>\n<pre><code class=\"language-python\"># Megalodon 联合连续/离散去噪伪代码\nfor batch in geom_drugs_loader:\n    X, H, E, C = batch.coords, batch.atom_types, batch.bond_types, batch.charges\n\n    # 1. 连续坐标与离散拓扑使用独立噪声时间\n    t_x = sample_time_distribution()\n    t_g = sample_time_distribution()\n\n    X_t = continuous_noise(X, t_x)          # Gaussian diffusion 或 FM interpolant\n    H_t = discrete_noise(H, t_g)            # atom type D3PM / DFM\n    E_t = discrete_noise(E, t_g)            # bond type D3PM / DFM\n    C_t = discrete_noise(C, t_g)            # formal charge D3PM / DFM\n\n    # 2. 自条件：先粗预测，再把预测残差注入输入\n    with torch.no_grad():\n        M_sc = megalodon(X_t, H_t, E_t, C_t, t_x, t_g)\n    X_in, H_in, E_in, C_in = residual_self_condition((X_t, H_t, E_t, C_t), M_sc)\n\n    # 3. 融合式 Transformer 更新离散表示，EGNN 结构层更新坐标\n    X_pred, H_logits, E_logits, C_logits = megalodon(X_in, H_in, E_in, C_in, t_x, t_g)\n\n    # 4. 联合连续与离散目标\n    loss_x = mse_or_flow_loss(X_pred, X, t_x)\n    loss_h = cross_entropy(H_logits, H)\n    loss_e = cross_entropy(E_logits, E)\n    loss_c = cross_entropy(C_logits, C)\n    loss = w_x * loss_x + w_h * loss_h + w_e * loss_e + w_c * loss_c\n\n    optimizer.zero_grad()\n    loss.backward()\n    optimizer.step()\n\n# 推理：从噪声坐标和离散先验开始，迭代反向去噪或解 ODE\nM_t = sample_prior(num_atoms)\nfor step in reverse_schedule:\n    M_t = megalodon_reverse_update(M_t, step)\nreturn sanitize_and_evaluate(M_t)\n</code></pre>\n<h5>动机与背景</h5>\n<p>3D 分子生成不是普通图生成：模型必须同时给出化学拓扑和三维构象。早期 3D 扩散模型常把原子坐标与原子类型作为主要生成对象，再依赖 OpenBabel 等工具从几何距离推断键；这会把模型错误、后处理偏差和评估偏差混在一起。后续方法开始直接生成键，但很多架构仍更偏几何消息传递，离散拓扑的长程组合模式建模不足，导致小分子指标不错、大分子或低能构象质量下降。</p>\n<p>Megalodon 的判断是：3D 分子生成的难点不是单纯“坐标去噪”，而是 <strong>连续几何与离散化学图之间要互相校正</strong>。原子类型和键决定可行局部几何，几何距离和角度又反过来帮助判断键/电荷是否合理。因此它用 Transformer 主干处理离散不变量，用等变层处理坐标，把两个部分反复耦合。</p>\n<h5>架构机制：Transformer 管拓扑，EGNN 管结构</h5>\n<p>每个分子记为：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{M} = (X, H, E, C)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">X \\in \\mathbb{R}^{N \\times 3}</span> 是原子坐标，<span class=\"kb-math kb-math-inline\">H</span> 是原子类型，<span class=\"kb-math kb-math-inline\">E</span> 是键类型邻接张量，<span class=\"kb-math kb-math-inline\">C</span> 是形式电荷。Megalodon 先分别嵌入结构特征、原子特征、键特征和电荷特征，再聚合为 Transformer token。融合式 Invariant Transformer 负责全局注意力：</p>\n<div class=\"kb-math kb-math-display\">Z&#x27; = \\text{MHA}(\\text{AdaLN}(Z, t)) + Z</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">t</span> 是噪声时间嵌入，AdaLN 让同一网络在不同噪声强度下改变归一化尺度和偏置。离散模态通过 MLP head 输出原子/键/电荷 logits；坐标不是由普通 MLP 直接回归，而是交给结构层更新：</p>\n<div class=\"kb-math kb-math-display\">x_i^{\\ell+1}\n= x_i^{\\ell}\n+ \\sum_{j \\ne i} (x_i^{\\ell}-x_j^{\\ell}) \\, \\phi_d(h_i, h_j, e_{ij}, d_{ij})\n+ \\sum_{j,k} \\big((x_i-x_j) \\times (x_i-x_k)\\big)\\phi_c(\\cdot)</div>\n<p>第一项类似 EGNN 的距离加权更新，天然保持平移/旋转等变；cross-product 项提供方向性几何信号，对三维构象、二面角和手性相关结构更有帮助。论文强调这个 cross-product 对性能很关键。</p>\n<h5>训练目标：连续坐标 + 离散图的共同去噪</h5>\n<p>连续坐标可以用扩散或流匹配来训练。用统一插值写法表示：</p>\n<div class=\"kb-math kb-math-display\">X_t = \\alpha_t X_0 + \\beta_t X_1</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">X_0</span> 是噪声样本，<span class=\"kb-math kb-math-inline\">X_1</span> 是真实数据。扩散版本使用余弦噪声日程和 DDPM 风格目标；流匹配版本学习把噪声分布推到数据分布的向量场，常写作预测终点或速度：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{X}\n= \\mathbb{E}_{t, X_t}\\left[\\lVert \\hat{X}_{1|t} - X_1\\rVert_2^2\\right]</div>\n<p>离散原子、键和电荷则用 D3PM/离散流匹配的交叉熵目标：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{disc}}\n= \\mathcal{L}_{H}^{\\text{CE}}\n+ \\mathcal{L}_{E}^{\\text{CE}}\n+ \\mathcal{L}_{C}^{\\text{CE}}</div>\n<p>总损失可概括为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}\n= \\lambda_X \\mathcal{L}_{X}\n+ \\lambda_H \\mathcal{L}_{H}^{\\text{CE}}\n+ \\lambda_E \\mathcal{L}_{E}^{\\text{CE}}\n+ \\lambda_C \\mathcal{L}_{C}^{\\text{CE}}</div>\n<div class=\"key-point\">💡 <strong>关键：</strong> Megalodon 的“混合”不是把两种模型简单串联，而是在同一反向生成过程中同时更新坐标和拓扑，并允许两类模态使用不同噪声时间，使模型学会“给定较清晰拓扑补结构”或“给定较清晰结构补拓扑”等更多互补场景。</div>\n<h5>为什么要分离连续时间和离散时间</h5>\n<p>论文指出，若坐标和离散图共用单一时间变量，采用数据先验的扩散目标会出现一个反直觉现象：在相当一部分时间区间里，键预测几乎总是“无键”，离散边特征对结构学习没有提供有效信息。只有当坐标误差已经很低时，键准确率才突然上升。这会削弱 2D 拓扑对 3D 结构的引导。</p>\n<p>Megalodon 因此采样两个时间：</p>\n<div class=\"kb-math kb-math-display\">t_{\\text{continuous}} \\sim p(t), \\qquad\nt_{\\text{discrete}} \\sim p(t)</div>\n<p>并分别用于坐标插值和离散 noising。这样训练集中会出现更多组合：清晰拓扑 + 噪声坐标、噪声拓扑 + 清晰坐标、两者都中等噪声等。模型不能只依赖某一个模态，而必须学习跨模态补全。</p>\n<h5>自条件机制</h5>\n<p>Megalodon 使用外层 wrapper 做 self-conditioning：</p>\n<div class=\"kb-math kb-math-display\">\\begin{aligned}\nx_{\\text{sc}} &amp;= \\text{model}(x_t) \\\\\nx_t&#x27; &amp;= \\text{MLP}([x_{\\text{sc}}, x_t]) + x_t \\\\\nx_{\\text{pred}} &amp;= \\text{model}(x_t&#x27;)\n\\end{aligned}</div>\n<p>对于 3D 分子，self-conditioning 分别作用在 <span class=\"kb-math kb-math-inline\">X,H,E,C</span> 上：结构分量用无偏置线性层，离散分量使用 raw logits 而不是 one-hot 结果。直觉上，第一次预测提供“模型认为最终分子大概在哪里”的草图，第二次预测再利用草图修正细节。</p>\n<h5>与 DiffSBDD/传统 3D 扩散模型的区别</h5>\n<p>传统基于扩散的 3D 分子生成通常强调等变 GNN 如何从噪声坐标恢复分子，离散拓扑要么被弱化，要么依赖后处理。Megalodon 的区别有三点：</p>\n<ul>\n<li>它把离散拓扑当作一等公民，用 Transformer 建模原子/键/电荷的全局依赖</li>\n<li>它在一个框架下同时比较 diffusion 与 flow matching，避免“架构变了、目标也变了”导致的归因不清</li>\n<li>它引入更偏物理的结构评估，尤其是能量和条件构象任务，而不只看 RDKit validity 或 atom stability</li>\n</ul>\n<p>实验上，论文报告 Megalodon 在 GEOM-Drugs 上提升 2D/3D 质量；40M 参数模型在大分子生成时相对先前最佳模型可产生最多 49 倍更多有效大分子，并且结构能量低 2-10 倍。Megalodon Quick/flow 类设置则展示了减少采样步数后的吞吐优势，说明该架构不仅能提升质量，也能配合更快的流式采样。</p>\n<h5>局限性</h5>\n<p>Megalodon 仍然保留全连接边特征，因此边存储和注意力相关计算会随原子数快速增长；大分子扩展仍受内存与二次/更高阶边建模成本限制。论文也承认 3D 分子生成基准本身仍不完善，特别是药物发现真正关心的可合成性、靶标结合、溶解性和毒性并未被这个无条件生成任务完全覆盖。</p>",
      "quiz": {
        "q": "Megalodon 为什么要为连续坐标和离散图特征采样不同的噪声时间？",
        "options": [
          "为了让模型在推理时完全跳过离散键预测",
          "为了增加跨模态噪声组合，使拓扑和几何能互相补全，而不是被单一时间日程绑定",
          "为了把所有离散变量转换成连续坐标后统一回归",
          "为了避免使用任何等变神经网络层"
        ],
        "answer": 1,
        "explain": "单一时间日程会让某些阶段的键特征几乎没有信息；分离时间后，模型会见到清晰拓扑配噪声坐标等多种组合，从而学习连续几何和离散拓扑的相互约束。"
      }
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
      "summary": "CoCoGraph 提出协作式约束图扩散模型，用“双边交换”在整个扩散轨迹中保持分子式和每个原子的价态不变，从机制上保证生成分子 100% 化学有效。它把化学规则硬编码进 noising/denoising 操作，让神经网络专注学习真实分子的结构模式，并据此生成了 820 万个合成候选分子数据库。",
      "keyPoints": [
        "<strong>约束离散图扩散</strong>：前向噪声不是随机删边/加边，而是选择两条键并交换端点，保持每个原子度数和分子式不变",
        "<strong>化学有效性由构造保证</strong>：每一步都满足价态、连通性和键重数约束，因此生成阶段不需要再用模型参数“学习”基础化学规则",
        "<strong>协作式双模型机制</strong>：扩散模型预测下一步应撤销的 double edge swap，时间模型估计当前图距离真实分子的归一化扩散进度",
        "<strong>自适应去噪进度</strong>：采样时用时间模型预测的进度替代固定时间步，并从整条轨迹中选择预测时间最小的分子作为输出",
        "<strong>轻量 GNN 架构</strong>：BASE 版约 53.4 万参数，FPS 版加入 Morgan fingerprint 后约 440 万参数，仍少于多数基线",
        "<strong>GuacaMol 基准表现</strong>：BASE/FPS 均达到 100% validity 和 99.9% uniqueness，FPS 的 KL divergence score 达 96.7%，优于 DiGress 和 JTVAE",
        "<strong>大规模生成与专家测试</strong>：生成 820 万个合成分子，冗余率约 7.1%；121 名有机化学受试者识别真实分子的总体准确率约 62%",
        "<strong>当前不是目标性质生成器</strong>：论文明确说明 CoCoGraph 现阶段主要生成“合理分子”，尚不能直接按用户指定性质优化"
      ],
      "detail": "<h5>论文与图示来源说明</h5>\n<p>任务给定的 Nature URL <code>s42256-026-00987-9</code> 未能稳定对应到可访问论文正文；可公开访问的论文与 PDF 指向题为 <em>A collaborative constrained graph diffusion model for the generation of realistic synthetic molecules</em> 的 Nature Machine Intelligence 文章，DOI 为 <code>10.1038/s42256-026-01229-5</code>，arXiv 版本为 https://arxiv.org/html/2505.16365v1。以下方法解读基于该 arXiv HTML、Nature PDF 公开文本和 URV/EurekAlert 新闻稿，YAML 中仍保留任务提供的原始 <code>paper_url</code>。</p>\n<p><img alt=\"CoCoGraph 协作约束图扩散示意图\" src=\"https://arxiv.org/html/2505.16365v1/x1.png\" />\n<em>图：CoCoGraph 的整体流程。前向过程通过 double edge swapping 扰乱真实分子；反向过程由扩散模型预测要撤销的换边操作，由时间模型估计当前图的去噪进度；采样时从随机有效图出发，沿协作去噪轨迹生成分子。</em></p>\n<h5>算法核心流程</h5>\n<pre><code class=\"language-python\"># CoCoGraph 训练与采样伪代码\nfor molecule in molecular_dataset:\n    G0 = mol_to_explicit_hydrogen_graph(molecule)\n    trajectory = [G0]\n\n    # 1. 前向 noising：只执行可行 double edge swap\n    for t in range(T(G0)):\n        candidates = feasible_des_quadruplets(trajectory[-1])\n        i, j, k, l = random_choice(candidates)\n        Gt = swap_edges(trajectory[-1], remove=[(i, j), (k, l)], add=[(i, k), (j, l)])\n        trajectory.append(Gt)\n\n    # 2. 训练扩散模型：预测反向要撤销的 DES、成键概率、断键概率\n    for t, Gt in enumerate(trajectory[1:], start=1):\n        target_swap = inverse_swap_that_returns_to(trajectory[t - 1])\n        q_logits, p_form, p_break = diffusion_model(Gt, t / T(G0))\n        loss_des = bce(q_logits, target_swap)\n        loss_form = bce(p_form, edges_to_form_against_G0)\n        loss_break = bce(p_break, edges_to_break_against_G0)\n\n        # 3. 训练时间模型：估计当前图离真实分子还有多远\n        t_pred = time_model(Gt)\n        loss_time = mse(t_pred, t / T(G0))\n\n        optimize(loss_des + loss_form + loss_break + loss_time)\n\n# 采样：给定分子式/度序列，从随机有效图开始\nG = sample_valid_graph_with_formula(formula)\nbest_G, best_tau = G, 1.0\nfor step in range(max_steps):\n    tau = time_model(G)\n    q = diffusion_model(G, tau)\n    swap = sample_feasible_des(q, G)\n    G = apply_des(G, swap)\n    if time_model(G) &lt; best_tau:\n        best_G, best_tau = G, time_model(G)\nreturn best_G\n</code></pre>\n<h5>动机与背景</h5>\n<p>分子图生成的核心难点是离散化学约束非常硬：碳、氮、氧、卤素等元素有特定价态，键重数不能任意增加，图还要保持连通。普通图扩散模型在前向过程里随机扰乱节点和边，反向模型需要同时学会“真实分子长什么样”和“哪些图根本不是分子”。这会浪费大量容量，并且生成后常要靠 RDKit 过滤无效结构。</p>\n<p>CoCoGraph 的设计更像把化学空间本身作为生成域：扩散轨迹从头到尾都限制在固定分子式和固定度序列的图空间里。模型不再学习“碳最多几价”这类规则，而是学习在合法图空间中，哪些换边路径更可能回到真实分子分布。</p>\n<h5>双边交换如何保证价态</h5>\n<p>前向 noising 的基本操作是 double edge swap (DES)。给定当前分子图 <span class=\"kb-math kb-math-inline\">G_t</span>，选择两条存在的边：</p>\n<div class=\"kb-math kb-math-display\">e_1=(i,j), \\qquad e_2=(k,l)</div>\n<p>然后删除它们，并创建交叉连接：</p>\n<div class=\"kb-math kb-math-display\">(i,j),(k,l) \\rightarrow (i,k),(j,l)</div>\n<p>每个参与原子都失去一条键并得到一条新键，因此原子度数不变；节点集合不变，因此分子式不变；若同时限制新键不超过三键并保持图连通，则每一步都仍是化学可行图。论文把可行操作写成：</p>\n<div class=\"kb-math kb-math-display\">[Q_t]_{ijkl}\n= \\frac{F_t(i,j,k,l)}\n{\\sum_{i&#x27;,j&#x27;,k&#x27;,l&#x27;} F_t(i&#x27;,j&#x27;,k&#x27;,l&#x27;)}</div>\n<p>其中：</p>\n<div class=\"kb-math kb-math-display\">F_t(i,j,k,l)=\n\\begin{cases}\n1, &amp; \\text{若删除 }(i,j),(k,l)\\text{ 并创建 }(i,k),(j,l)\\text{ 后仍为有效分子图}\\\\\n0, &amp; \\text{否则}\n\\end{cases}</div>\n<p>这个 <span class=\"kb-math kb-math-inline\">Q_t</span> 不是固定转移矩阵，因为哪些 DES 可行取决于当前图 <span class=\"kb-math kb-math-inline\">G_t</span>。反复执行 DES 后，图会逐渐走向具有固定度序列的最大熵 Molloy-Reed 分布，类似“保持原子价态不变的随机化”。</p>\n<div class=\"key-point\">💡 <strong>关键：</strong> CoCoGraph 的有效性来自采样空间约束，而不是事后过滤。只要初始图有效且每次 DES 可行，轨迹中的所有图都保留分子式、原子价态和连通性。</div>\n<h5>协作式 denoising：扩散模型 + 时间模型</h5>\n<p>反向生成需要选择哪个 DES 能让当前图更像真实分子。CoCoGraph 的扩散模型学习三个概率：</p>\n<div class=\"kb-math kb-math-display\">[Q_t^{-1}]_{ijkl}\n= \\Pr_{\\theta,\\theta_f,\\theta_b}\n\\big(\\text{select }(i,j)\\ \\&amp;\\ (k,l)\\mid G_t,t\\big)</div>\n<div class=\"kb-math kb-math-display\">[P_t^{\\text{form}}]_{ij}\n= \\Pr_{\\theta,\\theta_f}\\big((i,j)\\text{ exists}\\mid G_t,t\\big)</div>\n<div class=\"kb-math kb-math-display\">[P_t^{\\text{break}}]_{ij}\n= \\Pr_{\\theta,\\theta_b}\\big((i,j)\\text{ does not exist}\\mid G_t,t\\big)</div>\n<p>对应损失是 DES 选择、成键、断键三个二元交叉熵。例如 DES 目标：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{BCE-DES}}\n= -\\frac{1}{N_q}\n\\sum_{(i,j,k,l)}\n\\left[\ny_{ijkl}^{t-1}\\log [Q_t^{-1}]_{ijkl}\n+ (1-y_{ijkl}^{t-1})\\log(1-[Q_t^{-1}]_{ijkl})\n\\right]</div>\n<p>时间模型输入当前分子图、节点特征、边特征和图特征，输出 <span class=\"kb-math kb-math-inline\">t_{\\text{pred}}\\in[0,1]</span>，损失为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{MSE}}\n= (t_{\\text{pred}}-t_{\\text{real}})^2</div>\n<p>论文发现不同分子随机化速度差别很大，固定时间步不能准确反映“当前图离真实分子有多远”。时间模型因此在采样时为扩散模型提供更真实的进度信号，并在生成结束时选择整条轨迹中 <span class=\"kb-math kb-math-inline\">t_{\\text{pred}}</span> 最小的图作为输出，而不是盲目取最后一步。</p>\n<h5>模型架构与数据</h5>\n<p>BASE 版 CoCoGraph 使用 EnhancedGINE 消息传递层。扩散模型先处理节点、边、图级特征和时间，再对节点对组合进行预测：一个 feed-forward head 预测形成边的概率，另一个预测断开边的概率，外部再组合成 DES 选择概率。时间模型共享类似 GNN 主干，但把节点嵌入平均池化成图嵌入，再输出一个标量时间。</p>\n<p>FPS 版在 BASE 上加入 2048 维 Morgan fingerprint，经 1024/512/256 维前馈网络压缩后与图嵌入拼接。这样模型能显式感知子结构模式，参数量从 BASE 的约 53.4 万增加到约 440 万，但仍少于 JTVAE、DiGress 等常见基线。</p>\n<p>训练数据来自 PubChem、ChEMBL、ZINC、NIST 等数据库的 curated 分子。作者先用 RDKit canonicalize 和去重，再把 SMILES 转成显式氢分子图，并限制分子大小在 5-70 个原子；过滤后训练集规模约 167 万个分子。</p>\n<h5>结果与意义</h5>\n<p>在 GuacaMol 分布学习基准上，CoCoGraph BASE 和 FPS 都达到 100% validity、99.9% uniqueness，novelty 分别约 98.6% 和 98.5%。FPS 的 KL divergence score 为 96.7%，高于 DiGress 的 92.6% 和 JTVAE 的 47.3%。在额外 36 个 RDKit 描述符上，FPS 版对 DiGress 赢 23/36，对 JTVAE 赢 33/36，说明它不是只在标准 GuacaMol 指标上调优。</p>\n<p>由于模型轻量，作者生成了 820 万个合成分子，冗余率约 7.1%，并进行了专家“图灵测试”：121 名具有有机化学背景的参与者在真实/生成分子二选一中总体正确率约 62%；无硕博层级训练者约 59%。这不能证明生成分子完全不可区分，但说明很多候选分子对人类化学直觉已经相当可信。</p>\n<h5>局限性</h5>\n<p>CoCoGraph 每条扩散轨迹固定分子式和度序列。如果任务本身要求同时搜索分子式，就需要先有一个 formula seeding 过程。DES 还带来 <span class=\"kb-math kb-math-inline\">O(n^4)</span> 的候选四元组复杂度，尽管当前实现能在中端 GPU 上生成最多 70 原子的分子，但更大分子需要更高效的候选筛选。最后，CoCoGraph 还不是条件性质优化模型；论文把“按目标性质生成分子”列为后续方向。</p>",
      "quiz": {
        "q": "CoCoGraph 为什么能在生成过程中保持 100% 化学有效性？",
        "options": [
          "因为生成后用 RDKit 删除所有无效分子",
          "因为 double edge swap 每步保持节点集合和每个原子的度数，并只允许满足价态/连通性约束的交换",
          "因为模型只复制训练集中的真实分子",
          "因为时间模型直接预测分子的药物活性"
        ],
        "answer": 1,
        "explain": "DES 让每个参与原子失去一条键又得到一条键，分子式和价态不变；再加上可行性约束，轨迹始终位于有效分子图空间。"
      }
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
      "summary": "PropMolFlow 提出基于 geometry-complete SE(3)-equivariant flow matching 的性质引导 3D 分子生成方法，把目标性质编码成高维嵌入并注入原子标量特征，从而直接生成满足目标量子化学性质的分子。相比扩散式性质引导方法，它用更短的确定性流路径采样，在保持结构有效性的同时把推理步数从约 1000 步降到 100 步。",
      "keyPoints": [
        "<strong>基于 FlowMol 的条件生成扩展</strong>：从无条件 geometry-complete flow matching 扩展到 property-guided molecule generation",
        "<strong>完整分子模态建模</strong>：联合生成 3D 坐标 <span class=\"kb-math kb-math-inline\">X</span>、原子类型 <span class=\"kb-math kb-math-inline\">A</span>、形式电荷 <span class=\"kb-math kb-math-inline\">C</span> 与键阶 <span class=\"kb-math kb-math-inline\">E</span>，显式处理 bond order 和 charge",
        "<strong>SE(3)-GVP 架构</strong>：使用 geometric vector perceptron 更新节点标量、节点向量、坐标和边特征，保持旋转/平移等变并支持手性相关几何",
        "<strong>性质嵌入机制</strong>：把标量性质 <span class=\"kb-math kb-math-inline\">k</span> 经可选 Gaussian expansion 和 MLP 映射到与节点标量同维的 property embedding",
        "<strong>五种融合操作</strong>：系统比较 Concatenation、Sum、Multiply、Concatenate + Sum、Concatenate + Multiply，不同性质可选择不同最优嵌入方式",
        "<strong>联合 flow matching 损失</strong>：连续坐标用线性插值与终点预测损失，离散原子/电荷/键阶用带 mask token 的 CTMC 离散流匹配交叉熵",
        "<strong>QM9 六性质评估</strong>：针对 <span class=\"kb-math kb-math-inline\">\\alpha</span>、<span class=\"kb-math kb-math-inline\">\\Delta\\epsilon</span>、<span class=\"kb-math kb-math-inline\">\\epsilon_{\\text{HOMO}}</span>、<span class=\"kb-math kb-math-inline\">\\epsilon_{\\text{LUMO}}</span>、<span class=\"kb-math kb-math-inline\">\\mu</span>、<span class=\"kb-math kb-math-inline\">C_v</span> 进行条件生成",
        "<strong>DFT 验证闭环</strong>：不仅用 GVP/EGNN predictor 打分，还对筛选样本做 DFT 单点和结构弛豫，检查性质预测器偏差",
        "<strong>采样速度提升</strong>：ID 任务中使用 100 个 Euler 步，相比扩散基线 1000 步至少约 8 倍加速，并接近新闻报道所说的约 10 倍速度提升"
      ],
      "detail": "<h5>来源与方法图</h5>\n<p>任务给定链接是新闻页；可追溯到 Nature Computational Science 论文 <em>PropMolFlow: property-guided molecule generation with geometry-complete flow matching</em>，DOI 为 <code>10.1038/s43588-025-00946-y</code>，公开 arXiv 版本为 https://arxiv.org/html/2505.21469v4，代码仓库为 https://github.com/Liu-Group-UF/PropMolFlow。</p>\n<p><img alt=\"PropMolFlow 方法总览\" src=\"https://arxiv.org/html/2505.21469v4/x1.png\" />\n<em>图：PropMolFlow 的整体方法。分子图包含节点标量特征、节点坐标和边键阶；目标性质经 Gaussian expansion 与 MLP 形成 property embedding，再通过五种交互方式之一注入节点标量特征；联合 flow matching 同时更新坐标、原子类型、电荷和键阶。</em></p>\n<h5>算法核心流程</h5>\n<pre><code class=\"language-python\"># PropMolFlow 条件 flow matching 训练伪代码\nfor molecule, target_property in qm9_loader:\n    X1, A1, C1, E1 = molecule.coords, molecule.atom_types, molecule.charges, molecule.bond_orders\n    k = target_property\n\n    # 1. 性质编码：可选 Gaussian expansion + MLP\n    if use_gaussian_expansion:\n        gk = gaussian_expand(k, centers, width)\n    else:\n        gk = k\n    P = property_mlp(gk)\n\n    # 2. 构造连续与离散中间状态\n    t = uniform(0, 1)\n    X0 = sample_standard_gaussian_like(X1)\n    X_t = (1 - t) * X0 + t * X1\n    A_t = mask_or_data_interpolant(A1, t)\n    C_t = mask_or_data_interpolant(C1, t)\n    E_t = mask_or_data_interpolant(E1, t)\n\n    # 3. 将性质嵌入注入节点标量特征\n    node_scalar = combine([A_t, C_t], P, mode=&quot;sum/multiply/concat/concat_sum/concat_multiply&quot;)\n    graph_t = fully_connected_graph(X_t, node_scalar, E_t)\n\n    # 4. SE(3)-GVP denoiser 预测终点模态\n    X_hat, A_logits, C_logits, E_logits = gvp_denoiser(graph_t, t)\n\n    # 5. 联合损失：坐标回归 + 离散交叉熵\n    L_X = norm(X_hat - X1)\n    L_A = cross_entropy(A_logits, A1)\n    L_C = cross_entropy(C_logits, C1)\n    L_E = cross_entropy(E_logits, E1)\n    loss = 3.0 * L_X + 0.4 * L_A + 1.0 * L_C + 2.0 * L_E\n\n    optimizer.zero_grad()\n    loss.backward()\n    optimizer.step()\n\n# 推理：给定目标性质和原子数，用 100 步 Euler 积分生成分子\nstate = initialize_masked_discrete_and_gaussian_coords(num_atoms)\nfor t in torch.linspace(0, 1, 100):\n    pred = gvp_denoiser(condition_with_property(state, k), t)\n    state = euler_flow_update_or_ctmc_step(state, pred, t)\nreturn filter_by_stability_rdkit_posebusters_closed_shell(state)\n</code></pre>\n<h5>动机与背景</h5>\n<p>性质引导分子生成希望“先给需求，再找结构”：例如给定极化率、HOMO-LUMO gap、偶极矩或热容，让模型直接生成符合目标性质的 3D 分子。此前扩散模型在条件生成上表现强，但推理需要很多随机反向步；无条件 flow matching 采样更快，却还没有充分解决 property-guided 3D 分子生成。</p>\n<p>PropMolFlow 的核心思路是把 FlowMol 的 geometry-complete SE(3) 流匹配变成条件模型：不把性质只粗暴拼接到输入，而是先把标量性质变成与节点标量同维的嵌入，再让它与原子类型/电荷特征发生可选的加法、乘法或拼接交互。这样性质约束可以在每个 GVP 更新块中影响图结构和坐标演化。</p>\n<h5>联合 flow matching 目标</h5>\n<p>PropMolFlow 把分子表示为：</p>\n<div class=\"kb-math kb-math-display\">M = (X, A, C, E)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">X</span> 是连续原子坐标，<span class=\"kb-math kb-math-inline\">A</span> 是原子类型，<span class=\"kb-math kb-math-inline\">C</span> 是形式电荷，<span class=\"kb-math kb-math-inline\">E</span> 是键阶。整体目标是学习条件分布：</p>\n<div class=\"kb-math kb-math-display\">p_1(M \\mid k)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">k</span> 是目标性质。对连续坐标，采用线性 interpolant：</p>\n<div class=\"kb-math kb-math-display\">X_t = \\alpha_t X_0 + \\beta_t X_1,\n\\qquad \\alpha_t = 1-t,\\quad \\beta_t=t</div>\n<p>噪声端 <span class=\"kb-math kb-math-inline\">X_0</span> 来自标准高斯：</p>\n<div class=\"kb-math kb-math-display\">p_0(X)=\\prod_{i=1}^{N}\\mathcal{N}(X_0^i\\mid \\mathbf{0}, I_3)</div>\n<p>模型直接预测终点坐标 <span class=\"kb-math kb-math-inline\">\\hat{X}_{1|t}^{\\theta}</span>，坐标损失为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{X}\n= \\mathbb{E}_{t,p_t(X_t|X_0,X_1),\\pi(X_0,X_1)}\n\\left[\\lVert \\hat{X}_{1|t}^{\\theta}-X_1\\rVert\\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\pi(X_0,X_1)</span> 是 optimal transport coupling，用来减少随机初态和数据样本之间的交叉路径。</p>\n<h5>离散模态：CTMC + mask token</h5>\n<p>原子类型、电荷和键阶是离散变量，PropMolFlow 使用 continuous-time Markov chain (CTMC) 离散流匹配。以原子类型为例，状态空间增加一个 mask token <span class=\"kb-math kb-math-inline\">M</span>，条件路径为：</p>\n<div class=\"kb-math kb-math-display\">p_t(A_t^i \\mid A_0,A_1)\n= \\alpha_t \\delta(A_t^i,A_1^i)\n+ \\beta_t \\delta(A_t^i,M)</div>\n<p>离散训练目标是交叉熵：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{CE}}\n= \\mathbb{E}_{t,p_{t|1}(x_t|z),p_z}\n\\left[-\\log p_{1|t}^{\\theta}(x_1^i\\mid x_t)\\right]</div>\n<p>最终四个模态加权：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}\n= \\eta_X\\mathcal{L}_X\n+ \\eta_A\\mathcal{L}_A\n+ \\eta_C\\mathcal{L}_C\n+ \\eta_E\\mathcal{L}_E</div>\n<p>论文采用：</p>\n<div class=\"kb-math kb-math-display\">(\\eta_X,\\eta_A,\\eta_C,\\eta_E)=(3.0,0.4,1.0,2.0)</div>\n<p>这个权重体现了坐标和键阶对结构有效性的高影响，同时仍保留原子类型和形式电荷的离散监督。</p>\n<h5>性质嵌入与五种融合方式</h5>\n<p>给定标量性质值 <span class=\"kb-math kb-math-inline\">\\tau_k</span>，模型先构造 property embedding：</p>\n<div class=\"kb-math kb-math-display\">P = \\phi_{\\text{prop}}(k)</div>\n<p>如果启用 Gaussian expansion，则先把标量展开成多个高斯基函数响应：</p>\n<div class=\"kb-math kb-math-display\">f_k =\n\\phi_{\\text{GE}}\n\\left(\n\\left[\n\\exp\\left(\n-\\frac{(\\tau_k-(\\tau_{\\min}+n_g d))^2}{2d^2}\n\\right)\n\\right]_{0\\le n_g \\le (\\tau_{\\max}-\\tau_{\\min})/d}\n\\right)</div>\n<p>然后把 <span class=\"kb-math kb-math-inline\">P</span> 与节点标量特征 <span class=\"kb-math kb-math-inline\">[A_t,C_t]</span> 交互。五种候选包括：</p>\n<ul>\n<li><strong>Concatenation</strong>：<span class=\"kb-math kb-math-inline\">\\varphi_\\theta([A_t,C_t]\\oplus P)</span></li>\n<li><strong>Sum</strong>：<span class=\"kb-math kb-math-inline\">[A_t,C_t]+P</span></li>\n<li><strong>Multiply</strong>：<span class=\"kb-math kb-math-inline\">[A_t,C_t]\\odot(\\sigma(P)+0.5)</span>，乘子限制在 <span class=\"kb-math kb-math-inline\">[0.5,1.5]</span></li>\n<li><strong>Concatenate + Sum</strong>：先拼接映射回原维度，再加到节点标量</li>\n<li><strong>Concatenate + Multiply</strong>：先拼接映射回原维度，再作为乘性门控</li>\n</ul>\n<p>因为性质嵌入只作用在节点标量特征上，坐标向量不被直接破坏，所以 SE(3) 等变性仍由 GVP 主干保持。</p>\n<h5>GVP 结构更新</h5>\n<p>每个节点包含坐标 <span class=\"kb-math kb-math-inline\">x_i\\in\\mathbb{R}^3</span>、标量特征 <span class=\"kb-math kb-math-inline\">s_i=[a_i:c_i]</span> 和向量特征 <span class=\"kb-math kb-math-inline\">v_i\\in\\mathbb{R}^{c\\times 3}</span>。每个 update block 依次做消息生成、节点更新、坐标更新和边更新。一个简化写法是：</p>\n<div class=\"kb-math kb-math-display\">m_{i\\to j}^{(s)},m_{i\\to j}^{(v)}\n= \\psi_M\\left(\n[s_i^{(\\ell)}:e_{ij}^{(\\ell)}:d_{ij}^{(\\ell)}],\n\\left[v_i:\\frac{x_i^{(\\ell)}-x_j^{(\\ell)}}{d_{ij}^{(\\ell)}}\\right]\n\\right)</div>\n<div class=\"kb-math kb-math-display\">x_i^{(\\ell+1)}\n= x_i^{(\\ell)}\n+ \\psi_P(s_i^{(\\ell+1)},v_i^{(\\ell+1)})</div>\n<div class=\"kb-math kb-math-display\">e_{ij}^{(\\ell+1)}\n= \\text{LN}\\left(\ne_{ij}^{(\\ell)}\n+ \\text{MLP}(s_i^{(\\ell+1)},s_j^{(\\ell+1)},d_{ij}^{(\\ell+1)})\n\\right)</div>\n<p>GVP 中的 vector cross-product 让模型不是 E(3) reflection-equivariant，而是 SE(3)-equivariant，因此能表达镜像不等价的手性信息。</p>\n<h5>数据、评估与 DFT 校验</h5>\n<p>PropMolFlow 在修正后的 QM9 SDF 上训练，显式包含氢原子、键阶和形式电荷。作者发现原始分发版本中约 3 万个分子存在键阶或电荷不一致问题，因此重新修正为 charge-neutral、closed-shell、valency-consistent 数据，并拆分为训练、验证、测试以及与生成器 disjoint 的性质预测器训练集。</p>\n<p>条件生成评估覆盖六个 QM9 量子化学性质：极化率 <span class=\"kb-math kb-math-inline\">\\alpha</span>、HOMO-LUMO gap <span class=\"kb-math kb-math-inline\">\\Delta\\epsilon</span>、HOMO 能量 <span class=\"kb-math kb-math-inline\">\\epsilon_{\\text{HOMO}}</span>、LUMO 能量 <span class=\"kb-math kb-math-inline\">\\epsilon_{\\text{LUMO}}</span>、偶极矩 <span class=\"kb-math kb-math-inline\">\\mu</span>、热容 <span class=\"kb-math kb-math-inline\">C_v</span>。论文同时比较 EEGSDE、EquiFM、GeoLDM、GCDM、JODO 等基线。PropMolFlow 在 <span class=\"kb-math kb-math-inline\">\\alpha</span> 与 <span class=\"kb-math kb-math-inline\">\\Delta\\epsilon</span> 上取得最低 MAE，在其他性质上与 JODO 等强基线接近，同时在 molecule stability、RDKit validity、PoseBusters validity 等结构指标上表现强。</p>\n<p>速度方面，PropMolFlow 推理使用 100 个 Euler 步，而扩散基线通常使用 1000 步；论文报告相对 diffusion-based models 至少约 8 倍加速，相对 EquiFM 近 2 倍加速。新闻报道的“约 10 倍更快”可理解为这一数量级的采样步数/墙钟速度优势。</p>\n<div class=\"warn-box\">⚠️ <strong>注意：</strong> 性质指标不能只信同构架 predictor。论文专门用 Gaussian 16、B3LYP/6-31G(2df,p) 做 DFT 单点和结构弛豫，对比 Target、GVP 和 DFT，指出某些性质尤其对几何弛豫敏感。这是 PropMolFlow 相比许多只报告 predictor MAE 的工作更严谨的地方。</div>\n<h5>局限性</h5>\n<p>PropMolFlow 当前主要在 QM9 小分子上验证，最多 9 个重原子，离真实药物发现中的大分子、蛋白口袋条件和 ADMET 目标仍有距离。它支持单性质条件生成，多性质联合虽概念上直接，但性质相关性和权重冲突还没有系统解决。最后，flow matching 虽然比扩散快，但仍需多步 ODE/CTMC 积分；若要进一步提速，需要能跨越概率路径的 flow map 或蒸馏方法。</p>",
      "quiz": {
        "q": "PropMolFlow 中 Gaussian expansion 的主要作用是什么？",
        "options": [
          "把 3D 坐标转换成 2D 分子图",
          "把标量目标性质映射为平滑的高维表示，使性质条件更容易与节点标量特征交互",
          "在生成后过滤掉所有无效分子",
          "用随机噪声替代形式电荷和键阶"
        ],
        "answer": 1,
        "explain": "Gaussian expansion 用多个中心不同的高斯基函数编码目标性质，再经 MLP 得到 property embedding，比直接拼接单个标量更能表达性质值的局部差异。"
      }
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
      "summary": "Proteina-Complexa 提出了一套面向蛋白结合物与蛋白复合物设计的全原子生成框架，把部分潜变量流匹配生成模型与推理时搜索结合起来，解决了纯生成模型速度快但质量不稳、纯 hallucination/优化方法质量高但计算慢的问题。",
      "keyPoints": [
        "<strong>全原子共设计</strong>：同时生成 binder 的骨架、侧链原子坐标和氨基酸序列，减少 RFdiffusion 系列常见的后置 ProteinMPNN 序列重设计依赖",
        "<strong>部分潜变量表示</strong>：显式建模骨架 <span class=\"kb-math kb-math-inline\">C_\\alpha</span> 坐标，将侧链与序列压缩为固定维度 latent，使全原子建模在计算上可扩展",
        "<strong>基于 La-Proteina 的流匹配先验</strong>：先用自动编码器学习全原子蛋白的 latent，再训练 target-conditioned denoiser 在 <span class=\"kb-math kb-math-inline\">C_\\alpha + z</span> 空间中从噪声流向设计分布",
        "<strong>Teddymer 预训练数据</strong>：从 AlphaFold DB 等单体预测结构中挖掘 domain-domain 交互，构造大规模合成 binder-target pair，用于补足实验复合物数据不足",
        "<strong>推理时搜索</strong>：在采样轨迹中加入 Best-of-N、beam search 等 reward-guided search，对 ipAE、氢键、碰撞、界面质量等可计算指标做在线筛选",
        "<strong>多任务扩展</strong>：覆盖蛋白靶标 binder、小分子靶标 binder、motif scaffolding、酶设计、界面氢键优化与 fold class-guided generation",
        "<strong>大规模实验验证</strong>：NVIDIA 项目页报告对 127 个靶标筛选超过 100 万条设计序列，86/127 个靶标获得 on-design hit，覆盖率约 68%",
        "<strong>速度动机</strong>：Rosetta Commons 新闻页称其在定制蛋白设计中相对 RFdiffusion 运行快 30-60 倍，核心原因是潜变量生成空间与推理时搜索的结合"
      ],
      "detail": "<p><img alt=\"Proteina-Complexa 生成与推理时搜索总览\" src=\"https://arxiv.org/html/2603.27950v1/x1.png\" />\n<em>图：Proteina-Complexa 先做 target-conditioned partially latent binder generation，再将中间候选解码、与靶标共折叠/评估，并用 reward-guided search 保留高质量轨迹。来源：论文 HTML 图 1。</em></p>\n<p><img alt=\"Proteina-Complexa 模型架构\" src=\"https://arxiv.org/html/2603.27950v1/x5.png\" />\n<em>图：模型由自动编码器、target-conditioned denoiser 和 pair-biased Transformer 组成；骨架 <span class=\"kb-math kb-math-inline\">C_\\alpha</span> 坐标显式生成，序列与非 <span class=\"kb-math kb-math-inline\">C_\\alpha</span> 原子通过 latent 表示生成。来源：论文附录架构图。</em></p>\n<p>任务给出的 <code>paper_url</code> 是 Rosetta Commons 新闻页路径；可访问的技术来源包括 OpenReview/arXiv 预印本 <code>https://arxiv.org/html/2603.27950v1</code>、NVIDIA 项目页 <code>https://research.nvidia.com/labs/genair/proteina-complexa/</code>、官方博客 <code>https://developer.nvidia.com/blog/designing-protein-binders-using-the-generative-model-proteina-complexa/</code> 和代码仓库 <code>https://github.com/NVIDIA-BioNeMo/Proteina-Complexa</code>。下面的方法解读以预印本和 NVIDIA 官方材料为主。</p>\n<pre><code class=\"language-python\"># Proteina-Complexa 核心流程伪代码\n\n# 1. 训练全原子自动编码器：把序列和非 Cα 原子压缩到 latent\nfor protein in atomistic_protein_dataset:\n    ca_coords = protein.ca_coords                  # 显式三维骨架\n    sidechain_coords = protein.non_ca_atom_coords  # 侧链和其他原子\n    sequence = protein.sequence\n\n    q_z = encoder(ca_coords, sidechain_coords, sequence)\n    z = sample_gaussian(q_z.mean, q_z.log_scale)\n    pred_sequence, pred_atoms = decoder(ca_coords, z)\n\n    recon_loss = ce(pred_sequence, sequence) + mse(pred_atoms, sidechain_coords)\n    kl_loss = kl_divergence(q_z, standard_normal())\n    ae_loss = recon_loss + beta * kl_loss\n    update(encoder, decoder, ae_loss)\n\n# 2. 训练 target-conditioned flow model：在 (Cα, z) 空间学习从噪声到 binder\nfor target, binder in binder_target_pairs:\n    y_data = concat(binder.ca_coords, encoder_latent(binder))\n    y_noise = randn_like(y_data)\n    t = uniform(0, 1)\n    y_t = (1 - t) * y_noise + t * y_data\n    target_velocity = y_data - y_noise\n\n    pred_velocity = denoiser(y_t, t, target_structure=target)\n    fm_loss = mse(pred_velocity, target_velocity)\n    update(denoiser, fm_loss)\n\n# 3. 推理时搜索：生成多条轨迹，在线打分并保留高 reward 候选\nbeam = [sample_noise_state()]\nfor step in reversed(time_grid):\n    proposals = []\n    for state in beam:\n        for _ in range(branch_factor):\n            next_state = flow_step(denoiser, state, step, target)\n            partial_binder = decoder(next_state.ca_coords, next_state.latent)\n            complex_pose = cofold_or_score(partial_binder, target)\n            reward = score(ipae=complex_pose.ipae,\n                           hbonds=complex_pose.interface_hbonds,\n                           clashes=complex_pose.clashes,\n                           fold_confidence=complex_pose.confidence)\n            proposals.append((reward, next_state))\n    beam = top_k(proposals, k=beam_width)\n\nfinal_designs = decode_and_filter(beam)\n</code></pre>\n<p><strong>动机：把生成模型和结构预测反馈统一起来</strong></p>\n<p>蛋白 binder 设计长期存在两类路线：一类是 RFdiffusion 这样的条件生成模型，能从靶标表面快速生成结构，但候选质量受训练分布和单次采样影响；另一类是 BindCraft 式 hallucination/优化方法，利用结构预测模型的界面置信度反复优化序列，质量强但每个靶标需要大量迭代。Proteina-Complexa 的核心判断是：这两类方法不应分开，而应先训练一个强生成先验，再在推理阶段投入可变计算量做 reward-guided search。</p>\n<p><strong>部分潜变量流匹配：为什么不直接在所有原子上扩散</strong></p>\n<p>全原子蛋白设计的难点在于维度太高：每个残基不仅有 <span class=\"kb-math kb-math-inline\">C_\\alpha</span> 骨架，还有可变数量的侧链原子和离散氨基酸身份。如果直接在所有原子坐标和序列上做扩散/流匹配，计算和表示都会变重。Proteina-Complexa 采用部分潜变量表示：骨架 <span class=\"kb-math kb-math-inline\">C_\\alpha</span> 保持在三维空间中显式生成，序列与非 <span class=\"kb-math kb-math-inline\">C_\\alpha</span> 原子由自动编码器压缩为 per-residue latent <span class=\"kb-math kb-math-inline\">z</span>。自动编码器训练目标可概括为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{AE}}\n= \\mathbb{E}_{q_\\phi(z|x)}\n\\left[-\\log p_\\theta(s, x_{\\neg C_\\alpha}\\mid x_{C_\\alpha}, z)\\right]\n+ \\beta D_{\\mathrm{KL}}\\left(q_\\phi(z|x)\\,\\|\\,\\mathcal{N}(0,I)\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">s</span> 是序列，<span class=\"kb-math kb-math-inline\">x_{\\neg C_\\alpha}</span> 是侧链与其他非 <span class=\"kb-math kb-math-inline\">C_\\alpha</span> 原子坐标。直觉上，这相当于只把最关键的几何骨架放在显式坐标空间里搜索，而把局部化学细节交给 latent 表示和解码器恢复。</p>\n<p><strong>流匹配目标：学习从噪声到 binder 分布的速度场</strong></p>\n<p>在训练 denoiser 时，模型不是预测离散步骤的噪声，而是学习连续路径上的速度场。设 <span class=\"kb-math kb-math-inline\">y=(x_{C_\\alpha},z)</span> 表示 binder 的部分潜变量状态，<span class=\"kb-math kb-math-inline\">\\epsilon\\sim\\mathcal{N}(0,I)</span> 是噪声，线性插值路径为：</p>\n<div class=\"kb-math kb-math-display\">y_t = (1-t)\\epsilon + t y,\\quad t\\in[0,1]</div>\n<p>条件流匹配目标可写成：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{FM}}\n= \\mathbb{E}_{y,\\epsilon,t}\n\\left\\|v_\\theta(y_t,t,c_{\\text{target}}) - (y-\\epsilon)\\right\\|_2^2</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">c_{\\text{target}}</span> 是靶标结构、热点和任务条件。推理时从噪声初始化 <span class=\"kb-math kb-math-inline\">y_0</span>，沿学习到的速度场积分到 <span class=\"kb-math kb-math-inline\">y_1</span>，再由 decoder 还原完整序列和全原子结构。</p>\n<p><strong>Teddymer：用合成二聚体补足训练数据</strong></p>\n<p>真实高质量 binder-target 复合物数量有限，直接训练大模型容易受数据规模限制。Proteina-Complexa 引入 Teddymer：从大量计算预测的单体蛋白结构中识别 domain-domain interaction，构造合成 binder-target pair，再与 PDB、PLINDER 等实验/整理后的多聚体数据结合。这个数据策略的意义不是简单扩大样本数，而是让模型在预训练阶段见到更多界面几何、靶标表面类型和 binder fold 多样性。</p>\n<p><strong>推理时搜索：在连续 latent 空间中做“可计算奖励”优化</strong></p>\n<p>Proteina-Complexa 的关键差异在推理阶段。普通生成模型一次采样后再筛选；Complexa 在采样中间就解码多个候选，计算界面 reward，然后把高分分支保留下来继续生成。一个典型 reward 可以抽象为：</p>\n<div class=\"kb-math kb-math-display\">R(x)\n= w_{\\text{ipAE}}\\big(-\\mathrm{ipAE}(x)\\big)\n+ w_{\\text{HB}}\\mathrm{HBonds}(x)\n- w_{\\text{clash}}\\mathrm{Clash}(x)\n+ w_{\\text{conf}}\\mathrm{Confidence}(x)</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">\\mathrm{ipAE}</span> 表示界面预测对齐误差，氢键项鼓励极性界面，碰撞项惩罚不合理原子重叠。论文图中展示的 <code>f_ipAE</code>、<code>f_H-Bond</code> 等 reward 就是这类可插拔目标。这样做的直觉类似大模型 test-time compute scaling：对于难靶标投入更多搜索分支，而不是只依赖固定成本的一次前向生成。</p>\n<p><strong>与 RFdiffusion/RFdiffusion3 的差异</strong></p>\n<p>RFdiffusion 系列把 binder 设计建模为条件扩散，通常先生成骨架，再用 ProteinMPNN 或类似逆折叠模型补序列，最后用结构预测/界面指标筛选。RFdiffusion3 已经推进到全原子扩散，但仍以扩散采样为主。Proteina-Complexa 则把序列、骨架和侧链放进同一个部分潜变量生成框架，并把搜索过程前移到采样阶段：生成模型提供高质量先验，reward search 在推理时向目标性质偏置。NVIDIA/Rosetta 的 30-60 倍速度说法主要来自这种低维 latent 采样与中间剪枝，而不是把所有原子都逐步优化。</p>\n<p><strong>实验与应用边界</strong></p>\n<p>官方项目页报告，Proteina-Complexa 在 127-target panel 中对超过 100 万条设计进行了 multiplexed phage display 实验筛选，获得 86 个靶标的 on-design hit。项目页还报告它在 PDGFR、Nipah virus、肌肉萎缩相关受体、kinase mini-protein/peptide binder 和 carbohydrate binder 等案例上有湿实验验证。需要注意的是，新闻页和项目页强调的是大规模验证亮点；方法细节、消融和 in-silico benchmark 需要以 OpenReview/arXiv 预印本为准。</p>",
      "quiz": {
        "q": "Proteina-Complexa 相比纯生成式 binder 设计模型的核心改进是什么？",
        "options": [
          "只生成蛋白骨架，再完全依赖人工设计序列",
          "将流匹配生成先验与推理时 reward-guided search 结合，在采样过程中筛选高质量轨迹",
          "完全取消结构打分，只用序列语言模型预测结合能力",
          "把所有原子固定，只优化靶标构象"
        ],
        "answer": 1,
        "explain": "Proteina-Complexa 的关键是把部分潜变量流匹配生成模型和推理时搜索统一起来，用 ipAE、氢键、碰撞等 reward 在生成过程中保留更优分支。"
      }
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
      "summary": "ECFP 提出了一种基于 Morgan 圆形邻域扩展的分子指纹算法，通过迭代哈希每个原子的局部环境，把分子图编码为可快速比较的子结构特征集合，解决了虚拟筛选和 QSAR 中分子结构表示稀疏、可解释且高效的问题。",
      "keyPoints": [
        "<strong>圆形拓扑指纹</strong>：每个特征对应以某个原子为中心、给定半径内的 circular atom neighborhood",
        "<strong>Morgan 算法变体</strong>：不追求唯一原子编号，而是在固定迭代轮数内保留每一轮产生的 atom identifier",
        "<strong>三阶段生成流程</strong>：初始原子标识符分配 → 邻域迭代更新/哈希 → 重复特征去重或计数保留",
        "<strong>可配置原子不变量</strong>：常用原子序数、重原子邻居数、氢数、形式电荷、环成员关系，也可加入同位素、手性或药效团类别",
        "<strong>ECFP 命名按直径</strong>：ECFP4 表示最大直径 4、半径 2；ECFP6 表示最大直径 6、半径 3",
        "<strong>两类输出表示</strong>：稀疏整数 identifier 集合保留可解释性，固定长度 bit vector 便于 Tanimoto 相似度与机器学习输入",
        "<strong>哈希折叠会碰撞</strong>：将无限/超大虚拟 bit string 折叠到 1024/2048 位时可能让不同子结构落到同一 bit",
        "<strong>FCFP 变体</strong>：Functional-Class Fingerprints 用氢键供体/受体、芳香性、正负电荷等功能类别替代具体元素，增强药效团层面的泛化",
        "<strong>典型用途</strong>：高通量筛选命中分析、配体相似性搜索、化合物聚类、QSAR/QSPR、ADMET 预测和分子机器学习 baseline"
      ],
      "detail": "<p><img alt=\"ECFP 生成过程\" src=\"https://docs.chemaxon.com/latest/images/download/attachments/1806333/ecfp_generation.png\" />\n<em>图：ECFP 从一个分子出发，分别生成 diameter 0、2、4 的原子中心邻域，并将每个邻域映射为整数 identifier。来源：Chemaxon ECFP 文档。</em></p>\n<p><img alt=\"ECFP bit folding\" src=\"https://docs.chemaxon.com/latest/images/download/attachments/1806333/ecfp_folding.png\" />\n<em>图：ECFP 的 identifier list 可以通过哈希函数折叠成固定长度二进制向量；折叠会带来 bit collision。来源：Chemaxon ECFP 文档。</em></p>\n<p>原论文为 Rogers 和 Hahn 的 <em>Extended-Connectivity Fingerprints</em>，ACS DOI 为 <code>https://pubs.acs.org/doi/10.1021/ci100050t</code>；若 ACS 页面不可直接访问，可用 PubMed 摘要 <code>https://pubmed.ncbi.nlm.nih.gov/20426451/</code> 或公开教学 PDF <code>https://files.batistalab.com/teaching/attachments/chem584/ci100050t.pdf</code> 核对方法描述。</p>\n<pre><code class=\"language-python\"># ECFP / Morgan circular fingerprint 简化伪代码\ndef ecfp(mol, radius=2, n_bits=2048, use_counts=False):\n    # 1. 初始原子 identifier：由局部原子不变量哈希得到\n    ids = {}\n    for atom in mol.atoms:\n        invariants = (\n            atom.atomic_number,\n            atom.heavy_neighbor_count,\n            atom.hydrogen_count,\n            atom.formal_charge,\n            atom.is_in_ring,\n            atom.chirality_tag,      # 可选\n        )\n        ids[atom] = hash32(invariants)\n\n    feature_multiset = []\n    feature_multiset.extend(ids.values())  # diameter 0 / radius 0\n\n    # 2. 每轮把邻居 identifier 和键类型合并，扩大一个 bond 的感知半径\n    for r in range(1, radius + 1):\n        new_ids = {}\n        for atom in mol.atoms:\n            neighborhood = [(ids[atom], &quot;center&quot;)]\n            for bond, nbr in sorted(atom.neighbor_bonds(),\n                                    key=lambda x: (ids[x[1]], x[0].bond_order)):\n                neighborhood.append((ids[nbr], bond.bond_order, bond.is_aromatic))\n            new_ids[atom] = hash32(tuple(neighborhood))\n\n        ids = new_ids\n        feature_multiset.extend(ids.values())\n\n    # 3. 去重或保留计数；再折叠到固定长度 bit vector\n    if use_counts:\n        sparse_features = Counter(feature_multiset)\n    else:\n        sparse_features = set(feature_multiset)\n\n    bits = [0] * n_bits\n    for feature_id in sparse_features:\n        bits[feature_id % n_bits] = 1\n    return bits, sparse_features\n</code></pre>\n<p><strong>动机：把分子图变成适合筛选和学习的特征集合</strong></p>\n<p>传统子结构 key 指纹依赖预定义片段表，例如“是否有某个芳香环模式”“是否有某个官能团”。这类方法计算快，但只能识别设计者预先列出的模式，面对新颖结构或细微取代差异时表达能力有限。ECFP 的核心思路是让分子自己产生特征：每个非氢原子都作为中心，不断向外收集邻域信息，形成不同半径的局部子结构 identifier。这样得到的特征不是人工词表，而是由分子图拓扑和原子属性自动生成。</p>\n<p><strong>与 Morgan canonicalization 的关系</strong></p>\n<p>ECFP 源自 Morgan 算法，但目的不同。Morgan canonicalization 的目标是通过迭代更新原子标识符，最终给分子产生稳定唯一编号；中间结果通常会被丢弃。ECFP 则恰好保留这些中间结果，因为半径 0、1、2、3 的 atom identifier 分别对应越来越大的局部化学环境。原论文把这种差异概括为：ECFP 在预设迭代次数后停止，并把初始与每轮 identifier 收集成 fingerprint set。</p>\n<p><strong>初始 atom identifier：局部原子不变量</strong></p>\n<p>第一步给每个非氢原子分配整数 identifier。这个 identifier 不是随机编号，而是原子局部属性的哈希，例如：</p>\n<div class=\"kb-math kb-math-display\">h_i^{(0)}\n= H\\left(Z_i,\\; d_i,\\; H_i,\\; q_i,\\; r_i,\\; \\chi_i\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">Z_i</span> 是原子序数，<span class=\"kb-math kb-math-inline\">d_i</span> 是重原子邻居数或连接度，<span class=\"kb-math kb-math-inline\">H_i</span> 是连接氢数，<span class=\"kb-math kb-math-inline\">q_i</span> 是形式电荷，<span class=\"kb-math kb-math-inline\">r_i</span> 表示是否在环上，<span class=\"kb-math kb-math-inline\">\\chi_i</span> 是可选手性标记。不同实现的默认不变量略有差异，但原则一致：把局部化学身份编码进一个可比较的整数。</p>\n<p><strong>迭代更新：局部消息传递式的哈希</strong></p>\n<p>第 <span class=\"kb-math kb-math-inline\">k</span> 轮中，原子 <span class=\"kb-math kb-math-inline\">i</span> 收集上一轮自己的 identifier、所有邻居的 identifier 以及连接键类型，并按确定性规则排序后哈希：</p>\n<div class=\"kb-math kb-math-display\">h_i^{(k)}\n= H\\left(h_i^{(k-1)},\\;\\mathrm{sort}\\left\\{\n\\left(h_j^{(k-1)}, b_{ij}\\right): j\\in\\mathcal{N}(i)\n\\right\\}\\right)</div>\n<p>这个公式很像固定权重、不可学习的消息传递 GNN：每轮把邻居信息聚合到中心原子，半径扩大一个 bond。不同之处在于 ECFP 使用离散哈希而非神经网络参数，目标是产生稳定、快速、可解释的结构特征。</p>\n<p><strong>半径、直径与 ECFP4/ECFP6</strong></p>\n<p>化学文献常用 ECFP4、ECFP6 这样的名字，其中数字表示最大直径而不是半径。ECFP4 对应半径 2，捕捉中心原子两跳内的子结构；ECFP6 对应半径 3，包含更大局部环境。半径越大，结构表达越细，但特征数更多、碰撞概率更高，也更容易过拟合小数据集。</p>\n<p><strong>从 identifier set 到 bit vector</strong></p>\n<p>自然的 ECFP 表示是可变长度整数集合：</p>\n<div class=\"kb-math kb-math-display\">F(m)=\\bigcup_{k=0}^{R}\\left\\{h_i^{(k)}: i\\in V(m)\\right\\}</div>\n<p>为了输入传统机器学习模型或快速相似性搜索，常把它折叠到长度 <span class=\"kb-math kb-math-inline\">L</span> 的二进制向量：</p>\n<div class=\"kb-math kb-math-display\">b_j = \\mathbb{I}\\left[\\exists f\\in F(m),\\; j = f \\bmod L\\right]</div>\n<p>这种固定长度表示便于存储和批量计算，但 <span class=\"kb-math kb-math-inline\">f\\bmod L</span> 会导致碰撞：两个不同子结构可能落到同一 bit。常见 <span class=\"kb-math kb-math-inline\">L</span> 为 1024 或 2048；若任务需要解释具体子结构，保留 sparse identifier list 或 count vector 通常更稳妥。</p>\n<p><strong>相似度计算：Tanimoto/Jaccard</strong></p>\n<p>虚拟筛选中，ECFP 最常用 Tanimoto 相似度比较两个分子：</p>\n<div class=\"kb-math kb-math-display\">T(A,B)=\\frac{|A\\cap B|}{|A|+|B|-|A\\cap B|}</div>\n<p>若使用 bit vector，则 <span class=\"kb-math kb-math-inline\">|A\\cap B|</span> 对应两个 bitset 同时为 1 的位数。直觉上，两个分子共享越多局部圆形子结构，Tanimoto 越高。ECFP 的优势是这些共享特征能定位回原子中心邻域，因此比许多黑盒分子向量更容易解释 SAR。</p>\n<p><strong>为什么 ECFP 适合活性建模</strong></p>\n<p>ECFP 特征表示的是“精确的氢填充子结构”，不仅记录某个模式存在，也隐含某些位置没有额外取代。Rogers 和 Hahn 特别强调这一点：对于活性分析，缺少一个取代基有时和存在一个官能团同样重要。与用于子结构预筛的 path-based fingerprint 相比，ECFP 更偏向结构-活性关系建模，而不是保证 query substructure 的包含关系。</p>\n<p><strong>局限性</strong></p>\n<p>ECFP 不显式编码三维构象、构象柔性和蛋白环境，因此对构象决定的结合模式、立体位阻和诱导契合能力有限。哈希折叠会降低可解释性，bit collision 也会给小维度指纹带来噪声。现代 GNN 可以学习任务相关的连续表示，但 ECFP 仍然是药物发现中强基线，因为它便宜、稳定、无需训练，并且在中小规模数据上经常表现很好。</p>",
      "quiz": {
        "q": "ECFP 与标准 Morgan 原子编号算法最关键的区别是什么？",
        "options": [
          "ECFP 只使用三维坐标，不使用分子图拓扑",
          "ECFP 保留每轮迭代产生的局部 atom identifier，并在固定半径后停止",
          "ECFP 必须依赖人工预定义的子结构词表",
          "ECFP 只能表示蛋白质，不能表示小分子"
        ],
        "answer": 1,
        "explain": "Morgan canonicalization 追求最终唯一编号并丢弃中间值；ECFP 则把每一轮局部邻域 identifier 收集为分子指纹特征。"
      }
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
      "summary": "AutoDock 提出用预计算三维能量网格加随机全局搜索来自动预测小分子在蛋白结合位点中的构象与结合能，解决了早期分子对接中手工摆放配体、逐原子能量计算过慢和柔性配体搜索空间巨大的问题。",
      "keyPoints": [
        "<strong>网格化能量评估</strong>：AutoGrid 为每种配体原子类型预计算 receptor 周围三维 affinity map，使 docking 时能用插值快速估计相互作用能",
        "<strong>物理力场打分</strong>：早期 AutoDock 使用 van der Waals、静电、氢键等分子力场项；后续 AutoDock3/4 扩展为半经验结合自由能函数",
        "<strong>柔性配体搜索</strong>：配体构象由平移、旋转和可旋转键 torsion 共同定义，receptor 通常固定或只允许少量侧链柔性",
        "<strong>模拟退火起源</strong>：1990 年原始 AutoDock 用 Monte Carlo simulated annealing 在位姿空间中搜索低能构象",
        "<strong>多次独立运行与聚类</strong>：对同一 ligand 执行多次随机搜索，按能量排序并按 RMSD 聚类，用最低能且可重复的 cluster 作为候选 pose",
        "<strong>PDBQT 表示</strong>：输入文件包含原子坐标、部分电荷、AutoDock atom type 和 torsion tree 信息",
        "<strong>后续 LGA 演化</strong>：AutoDock 2/3/4 引入 genetic algorithm、Lamarckian genetic algorithm 和 Solis-Wets local search，但网格打分与构象搜索框架保持核心地位",
        "<strong>虚拟筛选影响</strong>：AutoDock 把蛋白-配体对接从专家交互建模推进到可批量运行的自动筛选流程"
      ],
      "detail": "<p><img alt=\"AutoDock grid map 示意图\" src=\"https://ics.uci.edu/~dock/manuals/autodock_manual/Using_AutoDock_305-11.gif\" />\n<em>图：AutoDock/AutoGrid 手册中的 grid map 示意图；网格包围受体活性位点，每个格点保存某类 probe atom 与 receptor 的势能。来源：AutoDock 3.0.5 官方手册镜像。</em></p>\n<p>任务 YAML 中的 <code>paper_url</code> 指向 <code>10.1002/jcc.540110311</code>，该 DOI 实际对应 Breneman 与 Wiberg 关于 electrostatic potential charges 的 JCC 论文，并非 AutoDock 原始论文。AutoDock 1990 原始引文通常为 Goodsell &amp; Olson, <em>Automated docking of substrates to proteins by simulated annealing</em>, Proteins 8:195-202, DOI <code>10.1002/prot.340080302</code>；方法细节还可从 Scripps AutoDock 4.2 手册 <code>https://autodocksuite.scripps.edu/wp-content/uploads/sites/31/2019/03/AutoDock4.2.6_UserGuide.pdf</code> 和 AutoDock 3.0.5 手册 <code>https://autodock.scripps.edu/wp-content/uploads/sites/56/2022/04/AutoDock3.0.5_UserGuide.pdf</code> 核对。</p>\n<pre><code class=\"language-python\"># AutoDock 经典流程伪代码：AutoGrid + simulated annealing docking\n\n# 1. 受体和配体准备\nreceptor = load_pdbqt(&quot;receptor.pdbqt&quot;)    # atom types, partial charges\nligand = load_pdbqt(&quot;ligand.pdbqt&quot;)        # torsion tree, rotatable bonds\ngrid_box = define_binding_site(center, size, spacing=0.375)\n\n# 2. AutoGrid：为每种 ligand atom type 预计算 receptor affinity map\nmaps = {}\nfor atom_type in ligand.atom_types:\n    maps[atom_type] = compute_3d_grid(\n        receptor=receptor,\n        probe_type=atom_type,\n        box=grid_box,\n        terms=[&quot;vdw&quot;, &quot;hbond&quot;, &quot;electrostatic&quot;, &quot;desolvation&quot;],\n    )\n\n# 3. AutoDock：在 pose 空间中搜索\nbest_poses = []\nfor run in range(num_runs):\n    pose = random_pose(\n        translation=grid_box.random_point(),\n        rotation=random_quaternion(),\n        torsions=random_torsion_angles(ligand),\n    )\n    temperature = initial_temperature\n\n    for cycle in range(num_annealing_cycles):\n        for step in range(max_steps_per_cycle):\n            proposal = perturb(pose,\n                               translation_step=0.2,\n                               rotation_step_degrees=5.0,\n                               torsion_step_degrees=5.0)\n            e_old = score_pose(ligand, pose, maps)\n            e_new = score_pose(ligand, proposal, maps)\n            delta = e_new - e_old\n\n            # Metropolis 接受准则：高温允许爬坡，低温趋向局部最小\n            if delta &lt; 0 or random() &lt; exp(-delta / temperature):\n                pose = proposal\n\n        temperature = cool(temperature)  # linear/geometric schedule\n\n    best_poses.append(local_minimize_if_enabled(pose))\n\nclusters = rmsd_cluster(best_poses, tolerance=2.0)\nranked = sort_by_energy_and_cluster_size(clusters)\n</code></pre>\n<p><strong>动机：把 docking 拆成“能量表查询 + 构象搜索”</strong></p>\n<p>蛋白-配体 docking 的理想目标是在所有平移、旋转、配体内旋转键、甚至 receptor 柔性自由度上找到结合自由能全局最小值。直接逐步计算每个 pose 中所有 receptor-ligand 原子对相互作用非常昂贵。AutoDock 的核心工程化拆解是：receptor 大多固定，因此 receptor 对某类 probe atom 的势能可以预先计算成三维网格；搜索时只需要把 ligand 每个原子的位置映射到网格并做插值求和。</p>\n<p><strong>AutoGrid：为什么网格能加速</strong></p>\n<p>对 ligand 中每个原子 <span class=\"kb-math kb-math-inline\">i</span>，其类型为 <span class=\"kb-math kb-math-inline\">t_i</span>，在 pose <span class=\"kb-math kb-math-inline\">p</span> 下坐标为 <span class=\"kb-math kb-math-inline\">\\mathbf{r}_i(p)</span>。AutoGrid 预先为类型 <span class=\"kb-math kb-math-inline\">t</span> 计算 map <span class=\"kb-math kb-math-inline\">M_t(\\mathbf{r})</span>，那么 docking 时的受体-配体相互作用可近似为：</p>\n<div class=\"kb-math kb-math-display\">E_{\\text{inter}}(p)\n= \\sum_{i\\in \\text{ligand}}\n\\mathrm{interp}\\left(M_{t_i}, \\mathbf{r}_i(p)\\right)\n+ \\sum_i q_i\\,\\mathrm{interp}\\left(M_{\\text{elec}}, \\mathbf{r}_i(p)\\right)\n+ \\sum_i \\mathrm{interp}\\left(M_{\\text{desolv}}, \\mathbf{r}_i(p)\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathrm{interp}</span> 通常是三线性插值。这样每次评分从 <span class=\"kb-math kb-math-inline\">O(N_{\\text{ligand}}N_{\\text{receptor}})</span> 降为接近 <span class=\"kb-math kb-math-inline\">O(N_{\\text{ligand}})</span>，使得 Monte Carlo、遗传算法等全局搜索可以执行成千上万次能量评估。</p>\n<p><strong>搜索空间：平移、旋转和 torsion tree</strong></p>\n<p>AutoDock 把 ligand pose 表示为：</p>\n<div class=\"kb-math kb-math-display\">x = \\left(\\mathbf{t},\\; \\mathbf{q},\\; \\tau_1,\\ldots,\\tau_m\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{t}</span> 是 ligand 中心平移，<span class=\"kb-math kb-math-inline\">\\mathbf{q}</span> 是四元数旋转，<span class=\"kb-math kb-math-inline\">\\tau_k</span> 是第 <span class=\"kb-math kb-math-inline\">k</span> 个可旋转键的二面角。这个表示把刚体位姿和内部柔性统一进一个向量；每次搜索 move 可以小幅改变平移、旋转或 torsion。原始 AutoDock 用 simulated annealing 在该空间中搜索，后续版本把全局搜索替换/增强为 GA、LGA 和局部搜索。</p>\n<p><strong>模拟退火：接受坏 move 以逃离局部最小</strong></p>\n<p>在每一步中，若 proposal 的能量更低则直接接受；若能量更高，也以 Metropolis 概率接受：</p>\n<div class=\"kb-math kb-math-display\">P(\\text{accept})\n= \\min\\left(1,\\exp\\left(-\\frac{E_{\\text{new}}-E_{\\text{old}}}{kT}\\right)\\right)</div>\n<p>高温时模型可以穿过能量障碍，探索多个结合口袋或 torsion 组合；降温后逐渐收敛到低能构象。AutoDock 手册中的 simulated annealing 参数包括 translation step、quaternion step、torsion step、初始温度、退火 cycles、每轮接受/拒绝上限等。</p>\n<p><strong>评分函数：从力场能到半经验结合自由能</strong></p>\n<p>原始 AutoDock 强调基于物理力场的相互作用能。AutoDock3/4 进一步把打分函数写成可拟合的结合自由能模型，常见形式为：</p>\n<div class=\"kb-math kb-math-display\">\\Delta G_{\\text{bind}}\n= W_{\\text{vdW}}\\sum_{ij}\\left(\\frac{A_{ij}}{r_{ij}^{12}}-\\frac{B_{ij}}{r_{ij}^{6}}\\right)\n+ W_{\\text{hbond}}\\sum_{ij}E(t)\n\\left(\\frac{C_{ij}}{r_{ij}^{12}}-\\frac{D_{ij}}{r_{ij}^{10}}\\right)</div>\n<div class=\"kb-math kb-math-display\">\\quad\n+ W_{\\text{elec}}\\sum_{ij}\\frac{q_i q_j}{\\epsilon(r_{ij})r_{ij}}\n+ W_{\\text{sol}}\\sum_{ij}(S_iV_j+S_jV_i)\n\\exp\\left(-\\frac{r_{ij}^2}{2\\sigma^2}\\right)\n+ W_{\\text{tor}}N_{\\text{tor}}</div>\n<p>前两项对应 Lennard-Jones 型范德华和方向性氢键，第三项是距离依赖介电中的静电项，第四项是去溶剂化项，最后一项惩罚配体可旋转键带来的构象熵损失。实际实现中，receptor-ligand 的许多 pairwise 项已经压缩进 grid maps；ligand 内部能量和 torsion penalty 则在 pose 评分时加入。</p>\n<p><strong>为什么要多次运行并聚类</strong></p>\n<p>对接能量面高度粗糙，单次随机搜索得到的最低能 pose 不一定可靠。AutoDock 因此通常执行多次独立 run，再按 RMSD 聚类。一个可信 pose 往往不只是能量低，还会在多个 run 中反复出现，形成较大的低能 cluster。这个实践把随机优化的不确定性转化为可诊断的输出：能量排名、cluster size、cluster 内 RMSD 都能帮助判断 pose 是否稳定。</p>\n<p><strong>与现代 docking 工具的关系</strong></p>\n<p>AutoDock Vina、AutoDock-GPU、ADFR 等后续工具在搜索算法、并行化和评分函数上有明显改进，但 AutoDock 的基本思想仍然清晰可见：准备标准化 receptor/ligand 表示，预计算或快速估计相互作用能，在高维 pose 空间中做启发式全局搜索，再用聚类和能量排序解释结果。这个框架也是后来大规模虚拟筛选工作流的基础。</p>\n<p><strong>局限性</strong></p>\n<p>经典 AutoDock 通常假设 receptor 刚性或只允许有限侧链柔性，因此难以处理强诱导契合、结合位点大构象变化和水网络重排。评分函数是近似的，<span class=\"kb-math kb-math-inline\">\\Delta G_{\\text{bind}}</span> 更适合 pose ranking 和富集筛选，不应直接等同于精确实验亲和力。质子化状态、金属配位、共价结合、糖类和高柔性配体也需要额外参数或专门协议。</p>",
      "quiz": {
        "q": "AutoDock 使用预计算 grid maps 的主要目的是什么？",
        "options": [
          "把蛋白序列翻译成氨基酸结构",
          "避免在每个候选 pose 中重复计算所有 receptor-ligand 原子对相互作用，从而加速能量评估",
          "保证所有 docking pose 都是真实晶体结构",
          "用深度学习模型替代物理力场"
        ],
        "answer": 1,
        "explain": "AutoGrid 预先计算受体周围每种 probe atom 的势能网格，AutoDock 搜索时只需插值求和，使大量 Monte Carlo 或遗传算法评分变得可行。"
      }
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
      "summary": "DeepDTA 提出用两个并行 1D-CNN 分支分别从药物 SMILES 字符串和蛋白质氨基酸序列中学习表示，再回归连续结合亲和力，解决传统 DTA 方法依赖手工相似度、3D 复合物结构或二分类标签的问题。",
      "keyPoints": [
        "<strong>双分支序列 CNN</strong>：药物用 SMILES 字符序列编码，靶点用蛋白质一级序列编码，两个分支结构对称但滤波器长度可不同",
        "<strong>无需 3D 结构输入</strong>：不需要蛋白-配体复合物结构、分子对接姿态或手工相似度矩阵，直接从 1D 原始序列学习",
        "<strong>字符级嵌入</strong>：SMILES 字符来自约 200 万 PubChem SMILES 的 64 类符号，蛋白字符来自约 55 万 UniProt 序列的 25 类氨基酸/符号",
        "<strong>固定长度处理</strong>：Davis 使用 SMILES 85、蛋白 1200 的最大长度；KIBA 使用 SMILES 100、蛋白 1000，超长截断、短序列补零",
        "<strong>CNN 配置</strong>：每个分支包含 3 个一维卷积层，滤波器数量为 32、64、96，随后做 max pooling",
        "<strong>融合回归头</strong>：药物表示与蛋白表示拼接后输入 1024、1024、512 个隐藏单元的全连接网络，最后输出亲和力预测值",
        "<strong>训练目标</strong>：把 DTA 视为连续值回归问题，用 MSE 损失和 Adam 优化器训练",
        "<strong>评测基准</strong>：在 Davis kinase 数据集和 KIBA kinase inhibitor 数据集上评估，指标包括 Concordance Index 和 MSE",
        "<strong>历史意义</strong>：成为后续 WideDTA、GraphDTA、Transformer-DTA 等序列/图融合 DTA 模型的重要基线"
      ],
      "detail": "<p><img alt=\"DeepDTA 架构图\" src=\"https://raw.githubusercontent.com/hkmztrk/DeepDTA/master/docs/figures/deepdta.PNG\" />\n<em>图：DeepDTA 官方代码仓库中的模型图。上分支处理蛋白序列，下分支处理药物 SMILES；两个 CNN 表示拼接后经全连接层输出亲和力。论文正文图见 OUP 页面，若出版社图片受限，可用官方 GitHub 图核对整体结构。</em></p>\n<pre><code class=\"language-python\"># DeepDTA 训练流程伪代码\nfor smiles, protein_seq, y in dataloader:\n    # 1. 字符级编码：未知/空白位置补 0，超长截断\n    x_d = pad_or_truncate(label_encode_smiles(smiles), max_smi_len)\n    x_p = pad_or_truncate(label_encode_protein(protein_seq), max_seq_len)\n\n    # 2. 嵌入成 dense vectors\n    e_d = Embedding(num_smiles_tokens=64, dim=128)(x_d)\n    e_p = Embedding(num_protein_tokens=25, dim=128)(x_p)\n\n    # 3. 两个 1D-CNN 分支提取局部模式\n    h_d = Conv1D(32)(e_d)\n    h_d = Conv1D(64)(h_d)\n    h_d = Conv1D(96)(h_d)\n    z_d = MaxPool1D(h_d)\n\n    h_p = Conv1D(32)(e_p)\n    h_p = Conv1D(64)(h_p)\n    h_p = Conv1D(96)(h_p)\n    z_p = MaxPool1D(h_p)\n\n    # 4. 药物-靶点联合表示与亲和力回归\n    z = concat([z_d, z_p])\n    z = Dropout(0.1)(ReLU(Dense(1024)(z)))\n    z = Dropout(0.1)(ReLU(Dense(1024)(z)))\n    z = ReLU(Dense(512)(z))\n    y_hat = Dense(1)(z)\n\n    loss = mean((y_hat - y) ** 2)\n    Adam(lr=0.001).step(loss)\n</code></pre>\n<p><strong>动机：从“是否相互作用”转向“结合有多强”</strong></p>\n<p>早期 DTI 模型常把药物-靶点关系建成二分类：一对药物和蛋白是否有相互作用。药物发现中的排序与剂量设计更需要连续亲和力，例如 <span class=\"kb-math kb-math-inline\">K_d</span>、<span class=\"kb-math kb-math-inline\">K_i</span>、<span class=\"kb-math kb-math-inline\">IC_{50}</span> 或 KIBA 分数。DeepDTA 明确把任务定义为回归：输入一个药物 <span class=\"kb-math kb-math-inline\">d</span> 和一个靶点 <span class=\"kb-math kb-math-inline\">t</span>，输出 <span class=\"kb-math kb-math-inline\">\\hat{y}=f_\\theta(d,t)</span>，尽量逼近真实亲和力 <span class=\"kb-math kb-math-inline\">y</span>。</p>\n<p><strong>输入表示：把 SMILES 和蛋白序列都当作可学习的字符序列</strong></p>\n<p>DeepDTA 没有使用 Morgan fingerprint、PubChem similarity、Smith-Waterman similarity 或 3D docking pose，而是先做字符级 label encoding：</p>\n<div class=\"kb-math kb-math-display\">x_d = [c_1,c_2,\\ldots,c_{L_d}], \\quad\nx_t = [a_1,a_2,\\ldots,a_{L_t}]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">c_i</span> 是 SMILES 字符编号，<span class=\"kb-math kb-math-inline\">a_i</span> 是氨基酸字符编号。随后通过嵌入层映射为 128 维 dense vectors：</p>\n<div class=\"kb-math kb-math-display\">E_d \\in \\mathbb{R}^{L_d \\times 128}, \\quad\nE_t \\in \\mathbb{R}^{L_t \\times 128}</div>\n<p>这个设计的直觉是：SMILES 中的局部字符片段可以对应环、支链、原子类型和键模式；蛋白序列中的局部氨基酸片段可以对应 motif 或局部理化环境。CNN 的滑动窗口正好适合捕获这类局部模式。</p>\n<p><strong>双 CNN 分支：局部模式提取与尺度差异</strong></p>\n<p>药物和蛋白虽然都被表示为 1D 序列，但字符表、长度分布和语义完全不同，因此 DeepDTA 分别设置两个 CNN block。每个 block 由三层一维卷积组成，滤波器数从 32 增加到 64、96：</p>\n<div class=\"kb-math kb-math-display\">H_d = \\mathrm{MaxPool}\\left(\\mathrm{CNN}_d(E_d)\\right), \\quad\nH_t = \\mathrm{MaxPool}\\left(\\mathrm{CNN}_t(E_t)\\right)</div>\n<p>论文对滤波器长度做交叉验证：化合物分支候选为 <span class=\"kb-math kb-math-inline\">[4,6,8]</span>，蛋白分支候选为 <span class=\"kb-math kb-math-inline\">[4,8,12]</span>。这反映了两类序列的局部语义尺度不同：SMILES 短片段往往就能表达化学子结构，而蛋白 motif 通常需要更长窗口。</p>\n<p><strong>融合与回归：先各自抽象，再联合建模</strong></p>\n<p>两个分支的输出被拼接为药物-靶点联合表示：</p>\n<div class=\"kb-math kb-math-display\">z_{d,t} = [H_d; H_t]</div>\n<p>随后经过三层全连接网络：</p>\n<div class=\"kb-math kb-math-display\">\\hat{y}_{d,t} = W_o \\, \\phi_3\\left(W_3 \\, \\phi_2\\left(W_2 \\, \\phi_1(W_1 z_{d,t})\\right)\\right)</div>\n<p>其中前两层隐藏单元数为 1024，第三层为 512，前两层后接 dropout 0.1。训练损失是均方误差：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\mathrm{MSE}}\n= \\frac{1}{n}\\sum_{i=1}^{n}(\\hat{y}_i-y_i)^2</div>\n<p>对于 Davis 数据集，论文把 <span class=\"kb-math kb-math-inline\">K_d</span> 从 nM 转为 pKd：</p>\n<div class=\"kb-math kb-math-display\">pK_d = -\\log_{10}\\left(\\frac{K_d}{10^9}\\right)</div>\n<p>例如 <span class=\"kb-math kb-math-inline\">K_d=10000</span> nM 对应 <span class=\"kb-math kb-math-inline\">pK_d=5</span>。这样可以把跨数量级的结合常数压缩到更适合回归的数值范围。</p>\n<p><strong>为什么 CNN 能工作，也为什么它后来被改进</strong></p>\n<p>DeepDTA 的关键贡献不是复杂网络结构，而是证明“只用 SMILES 和蛋白一级序列”也能在 DTA 回归上形成强基线。与 KronRLS、SimBoost 相比，它减少了相似度矩阵和手工网络特征的依赖；与 docking 相比，它不要求蛋白晶体结构。论文报告 combined CNN-CNN 模型在 KIBA 上取得 CI 0.863、MSE 0.194，优于 SimBoost 的 CI 0.836、MSE 0.222；在 Davis 上 MSE 也低于基线。</p>\n<p>局限也很清楚：SMILES 是分子图的一种线性化，CNN 不能天然理解同一分子的多种 SMILES 等价表示，也不显式使用键连通图、手性构象和蛋白三维口袋。因此 GraphDTA 后续把药物侧替换为分子图神经网络，DrugCLIP 等方法进一步使用 3D 结构和对比学习。DeepDTA 的价值在于建立了简洁、可复现、端到端的 DTA 表示学习起点。</p>",
      "quiz": {
        "q": "DeepDTA 相比使用 PubChem/Smith-Waterman 相似度矩阵的传统 DTA 方法，最核心的变化是什么？",
        "options": [
          "把连续亲和力回归改成了药物-靶点二分类",
          "用两个 1D-CNN 分支直接从 SMILES 和蛋白序列学习表示",
          "必须先通过分子对接得到蛋白-配体复合物结构",
          "只使用蛋白质序列，不输入药物信息"
        ],
        "answer": 1,
        "explain": "DeepDTA 的核心是端到端学习药物和靶点的 1D 序列表示，并用拼接后的联合表示回归亲和力；它不依赖手工相似度矩阵或 3D 对接姿态。"
      }
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
      "summary": "GraphDTA 将 DeepDTA 的药物 SMILES 字符 CNN 替换为分子图神经网络，用原子节点和化学键边直接学习药物结构表示，再与蛋白序列 CNN 表示融合回归结合亲和力，解决 SMILES 线性化丢失分子拓扑的问题。",
      "keyPoints": [
        "<strong>药物图表示</strong>：把 SMILES 转换为分子图，原子为节点、化学键为边，用图神经网络学习 graph-level drug embedding",
        "<strong>蛋白序列分支保留</strong>：蛋白仍采用字符编码、128 维嵌入和 3 层 1D-CNN，最大长度为 1000 residues",
        "<strong>四种 GNN 变体</strong>：系统比较 GCN、GAT、GIN、GAT-GCN 四类药物图编码器",
        "<strong>图级池化</strong>：GNN 输出节点表示后使用 global max pooling 得到整分子的向量表示",
        "<strong>融合回归结构</strong>：药物图表示与蛋白序列表示拼接，通过全连接层预测连续 DTA 分数",
        "<strong>训练目标一致</strong>：与 DeepDTA 一样使用 Davis 和 KIBA 数据集，将任务建模为亲和力回归并用 MSE 优化",
        "<strong>性能提升来自分子拓扑</strong>：在 Davis 和 KIBA 上多种 GNN 变体超过 DeepDTA/WideDTA 等 1D 药物表示基线",
        "<strong>可解释性分析</strong>：作者对 128 维药物潜变量做冗余分析，发现部分 latent variables 与已知 JoeLib 分子描述符相关",
        "<strong>局限明确</strong>：药物侧使用 2D 图拓扑，不显式建模 3D 构象、立体化学和蛋白口袋空间结构"
      ],
      "detail": "<p><img alt=\"GraphDTA 架构图\" src=\"https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/bioinformatics/37/8/10.1093_bioinformatics_btaa921/2/m_btaa921f1.jpeg?Expires=2147483647&amp;Key-Pair-Id=APKAIE5G5CRDK6RD3PGA&amp;Signature=wLz4aiPhUUkcyjGm6aOME~gRkxpzJiYjFgJD9eynI8QdjaPe4qJNiRe1nL43pF~t2m~YgIFEPVUW~L4xc-61gAmlDM~b87KU41M9aDgW93fgkE3eDxGKkBjrznbM4nlYhcmDtMPcahex6EyvGHZQf8sqeGemfotBDiPBg6ZHnJwfAfvz7BEClETcvujB7cpJIPYfjUcbThxGPFKPIz14qehZekSc9WCyncbJ3~BqE7gH6JvIw-RZ4jJ5eaSdklpnWjWvdzTs8yqy-aXtCoGEJsBUBilx-bt~Raw493Mye7NAhJ~TP6GlT~5ryaM-wZ0WvUD7EK~8u7eV6CnJghTV3A__\" />\n<em>图：GraphDTA 论文 Figure 1。左侧将 SMILES 转为分子图后用 GCN/GAT/GIN/GAT-GCN 学习药物表示；右侧用 1D-CNN 学习蛋白序列表示；两者拼接后回归亲和力。若 CDN 图片受限，可在论文 OUP 页面 Figure 1 查看同一图。</em></p>\n<pre><code class=\"language-python\"># GraphDTA 简化训练伪代码\nfor smiles, protein_seq, affinity in dataloader:\n    # 1. 药物侧：SMILES -&gt; RDKit molecule -&gt; PyG/DGL graph\n    graph = mol_from_smiles(smiles)\n    X = atom_features(graph)          # 节点特征，如原子类型、度、芳香性等\n    A = adjacency_with_bonds(graph)   # 分子键连通关系\n\n    # 2. 任选一种图编码器：GCN / GAT / GIN / GAT-GCN\n    H = X\n    for layer in drug_gnn_layers:\n        H = layer(H, A)\n        H = relu(H)\n    z_drug = global_max_pool(H)\n\n    # 3. 蛋白侧：字符编码 + embedding + 1D-CNN\n    x_protein = pad_or_truncate(label_encode(protein_seq), max_len=1000)\n    E = Embedding(num_tokens, 128)(x_protein)\n    P = Conv1D(...)(E)\n    P = Conv1D(...)(P)\n    P = Conv1D(...)(P)\n    z_protein = max_pool(P)\n\n    # 4. 联合回归\n    z = concat([z_drug, z_protein])\n    y_hat = MLP(z)\n    loss = mean((y_hat - affinity) ** 2)\n    optimizer.step(loss)\n</code></pre>\n<p><strong>动机：SMILES 是字符串，但分子本质上是图</strong></p>\n<p>DeepDTA 证明了端到端序列学习可以处理 DTA，但药物的 SMILES 表示存在一个结构性缺陷：SMILES 是分子图的线性遍历，同一分子可以有多种合法 SMILES，字符邻近不一定等价于化学邻近。GraphDTA 的核心判断是，药物侧应该直接使用分子图：</p>\n<div class=\"kb-math kb-math-display\">G = (V,E), \\quad v_i \\in V \\text{ 表示原子}, \\quad e_{ij}\\in E \\text{ 表示化学键}</div>\n<p>这样模型在消息传递时沿真实化学键传播信息，而不是沿 SMILES 字符位置传播。</p>\n<p><strong>药物图编码：从节点表示到分子表示</strong></p>\n<p>GraphDTA 比较了四种 GNN。以 GCN 为例，加入自连接后的规范化传播可写为：</p>\n<div class=\"kb-math kb-math-display\">H^{(\\ell+1)}\n= \\sigma\\left(\\tilde{D}^{-\\frac{1}{2}}\\tilde{A}\\tilde{D}^{-\\frac{1}{2}}\nH^{(\\ell)}W^{(\\ell)}\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\tilde{A}=A+I</span>，<span class=\"kb-math kb-math-inline\">\\tilde{D}</span> 是度矩阵，<span class=\"kb-math kb-math-inline\">H^{(0)}=X</span> 是原子特征矩阵。多层 GCN 后仍得到每个原子的节点级表示，需要通过全局池化得到分子级表示：</p>\n<div class=\"kb-math kb-math-display\">z_d = \\mathrm{GlobalMaxPool}\\left(H^{(L)}\\right)</div>\n<p>GAT 变体则让每个原子对邻居分配注意力权重：</p>\n<div class=\"kb-math kb-math-display\">\\alpha_{ij}\n= \\frac{\\exp\\left(\\mathrm{LeakyReLU}(a^\\top[Wh_i \\Vert Wh_j])\\right)}\n{\\sum_{k\\in \\mathcal{N}(i)} \\exp\\left(\\mathrm{LeakyReLU}(a^\\top[Wh_i \\Vert Wh_k])\\right)}</div>\n<div class=\"kb-math kb-math-display\">h_i&#x27; = \\sigma\\left(\\sum_{j\\in\\mathcal{N}(i)}\\alpha_{ij}Wh_j\\right)</div>\n<p>GIN 变体使用更强的邻域聚合：</p>\n<div class=\"kb-math kb-math-display\">h_i^{(\\ell+1)}\n= \\mathrm{MLP}^{(\\ell)}\\left((1+\\epsilon)h_i^{(\\ell)}\n+ \\sum_{j\\in\\mathcal{N}(i)}h_j^{(\\ell)}\\right)</div>\n<p>论文结果显示 GIN 在 Davis 上取得 CI 0.893、MSE 0.229；KIBA 上 GCN 和 GAT-GCN 的 MSE 可到 0.139，明显低于 1D 药物表示基线。</p>\n<p><strong>蛋白侧：沿用 DeepDTA 的序列卷积思想</strong></p>\n<p>GraphDTA 的主要改动在药物侧，蛋白侧基本沿用 DeepDTA/WideDTA 的序列 CNN：蛋白序列先做字符级 label encoding，截断或补零到 1000 个 residue，再映射到 128 维 embedding，经过三层 1D convolution 和 max pooling 得到 <span class=\"kb-math kb-math-inline\">z_t</span>。这使论文能更清楚地回答一个问题：如果只把药物表示从 SMILES-CNN 换成 molecular graph-GNN，DTA 性能是否会提升？</p>\n<p><strong>融合与损失：图表示和序列表示共同回归</strong></p>\n<p>最终预测仍然是简单而有效的 late fusion：</p>\n<div class=\"kb-math kb-math-display\">\\hat{y}_{d,t} = f_{\\mathrm{MLP}}\\left([z_d;z_t]\\right)</div>\n<p>训练损失为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}\n= \\frac{1}{N}\\sum_{(d,t,y)\\in\\mathcal{D}}\n\\left(f_{\\mathrm{MLP}}([z_d;z_t])-y\\right)^2</div>\n<p>这种设计把模型差异集中在药物编码器上：相同的蛋白编码器、相似的回归头和相同的数据集，让图结构表示的贡献更容易被验证。</p>\n<p><strong>为什么图表示带来提升</strong></p>\n<p>分子中的芳香环、羟基、胺基、卤素取代、支链连接等结构特征都由图拓扑自然表达。GNN 的消息传递相当于从每个原子出发逐步聚合邻居环境，和 ECFP 的圆形邻域思想有相似直觉，但 GNN 的聚合函数可学习、连续且可针对 DTA 任务优化。论文的后验分析还发现，药物 latent variables 与部分 JoeLib 分子描述符存在相关性，例如与脂肪族 OH 数量相关，说明图网络能自动抽象一些化学概念。</p>\n<p><strong>边界与后续发展</strong></p>\n<p>GraphDTA 仍然没有显式使用蛋白三维结构，也没有把蛋白残基建成结构图；药物侧也主要是 2D graph，难以区分依赖构象、立体化学或诱导契合的相互作用。这些不足推动了后续 DGraphDTA、结构感知 DTA、等变 GNN 和蛋白-配体 3D 复合物模型的发展。但在 DeepDTA 到现代结构模型之间，GraphDTA 是关键一步：它把“药物是图”这件事引入了 DTA 回归基线。</p>",
      "quiz": {
        "q": "GraphDTA 相比 DeepDTA 最核心的结构改动是什么？",
        "options": [
          "把蛋白序列分支改为分子对接打分函数",
          "把药物 SMILES 字符 CNN 改为基于分子图的 GNN 编码器",
          "完全去掉药物输入，只预测靶点活性",
          "把回归任务改为只判断是否结合的二分类任务"
        ],
        "answer": 1,
        "explain": "GraphDTA 的核心贡献是用分子图和 GCN/GAT/GIN 等 GNN 学习药物表示，保留蛋白序列 CNN 分支，再融合回归连续亲和力。"
      }
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
      "summary": "AttentiveFP 提出一种带注意力和 GRU 更新的分子图神经网络，在原子级消息传递和分子级读出两处学习可解释权重，从分子图自动生成面向药物发现任务的 neural fingerprint。",
      "keyPoints": [
        "<strong>分子图输入</strong>：原子为节点、化学键为边，节点特征包含元素、度、形式电荷、杂化、芳香性、氢数、手性等",
        "<strong>键特征参与首轮消息</strong>：邻居原子特征与键特征拼接，避免普通 GAT 只看节点而忽略化学键类型",
        "<strong>原子级注意力</strong>：每个中心原子对一跳邻居计算 attention weight，选择性聚合更相关的局部化学环境",
        "<strong>GRU 状态更新</strong>：用 GRUCell 将邻居上下文与中心原子旧表示融合，控制保留旧信息和吸收新信息的比例",
        "<strong>多层半径扩展</strong>：堆叠 <span class=\"kb-math kb-math-inline\">K</span> 个 attentive layers，类似可学习版 ECFP，从近邻逐步扩展到更大化学环境",
        "<strong>分子级注意力读出</strong>：构造 super node/star graph，通过 <span class=\"kb-math kb-math-inline\">T</span> 次注意力读出把原子表示聚合为 molecule fingerprint",
        "<strong>可解释性</strong>：attention 权重可视化能显示模型关注的原子、官能团或非局部分子内相互作用",
        "<strong>多任务适配</strong>：分类任务使用交叉熵，回归任务使用 MSE，可用于 ESOL、FreeSolv、HIV、BACE、Tox21、ClinTox 等分子性质/筛选任务",
        "<strong>工程实现广泛</strong>：官方 OpenDrugAI 仓库、PyTorch Geometric、DeepChem/DGL-LifeSci 均提供 AttentiveFP 实现"
      ],
      "detail": "<p><img alt=\"AttentiveFP 网络结构示意\" src=\"https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/bioinformatics/37/18/10.1093_bioinformatics_btab195/2/m_btab195f3.jpeg?Expires=2147483647&amp;Key-Pair-Id=APKAIE5G5CRDK6RD3PGA&amp;Signature=Q7gnHX6vwFFT99QDBxeDWsDi2UtLEOG5b-gsmsv8j-OJYdB~kNs6QBYFg7KzrL9hiV60-ORnirHE6rUK6XyE0vNtn5aEilcU1T9g0SGj3VaEDa4-GmIv3RZcI99mLS0TPDWdTzPLOuvlELQ2AxBxhs30Ziai5qedxMvNZxOHS6B8I8STsHZqHymTd3ynPJSN-90SyWBjEGzycM41ntsr8M8UYQVFM1aFNDjej3QD8L5pjsXwfILrjsp7hOk05V1Pap2QLf-WhWD-0pKVh54NUHwAd5BzNqjYPJeBP0-PsV86Cz95kEETdRTLwn6YfFQlp2QhIyTVlJCoySN5qhTMdw__\" />\n<em>图：FraGAT 论文 Figure 3 中复现的 Attentive FP 网络结构。原 ACS 论文页面在当前环境中受 403 限制，因此这里使用可访问的 OUP 图示和官方 OpenDrugAI 代码仓库核对：AttentiveFP 包含 node embedding network 与 graph embedding/readout network。</em></p>\n<p>可访问方法来源：\n- 原论文 DOI：https://pubs.acs.org/doi/10.1021/acs.jmedchem.9b00959\n- 官方实现：https://github.com/OpenDrugAI/AttentiveFP/blob/master/code/AttentiveFP/AttentiveLayers.py\n- PyTorch Geometric 实现：https://raw.githubusercontent.com/pyg-team/pytorch_geometric/master/torch_geometric/nn/models/attentive_fp.py</p>\n<pre><code class=\"language-python\"># AttentiveFP 核心机制伪代码\ndef attentivefp_forward(atom_features, bond_features, edge_index, graph_batch):\n    # 1. 初始原子投影\n    h = leaky_relu(atom_fc(atom_features))\n\n    # 2. 第 1 层：邻居原子特征与键特征拼接\n    for atom i:\n        messages = []\n        scores = []\n        for neighbor j in N(i):\n            m_ij = leaky_relu(neighbor_fc(concat(atom_features[j], bond_features[j, i])))\n            e_ij = leaky_relu(align_0(concat(h[i], m_ij)))\n            messages.append(attend_0(m_ij))\n            scores.append(e_ij)\n        alpha = softmax(scores)\n        context = elu(sum(alpha[j] * messages[j] for j in N(i)))\n        h[i] = relu(GRUCell(context, h[i]))\n\n    # 3. 后续 K-1 层：在 learned atom embeddings 上继续 attentive message passing\n    for layer in range(1, K):\n        for atom i:\n            e_ij = [leaky_relu(align_layer(concat(h[i], h[j]))) for j in N(i)]\n            alpha = softmax(e_ij)\n            context = elu(sum(alpha[j] * attend_layer(h[j]) for j in N(i)))\n            h[i] = relu(GRUCell_layer(context, h[i]))\n\n    # 4. 分子级 readout：super node 对所有原子做 T 次 attention + GRU 更新\n    g = sum_pool(h, graph_batch)\n    for t in range(T):\n        for molecule m:\n            scores = [leaky_relu(mol_align(concat(g[m], h[i]))) for i in atoms(m)]\n            beta = softmax(scores)\n            context = elu(sum(beta[i] * mol_attend(h[i]) for i in atoms(m)))\n            g[m] = relu(mol_GRUCell(context, g[m]))\n\n    return output_layer(dropout(g))\n</code></pre>\n<p><strong>动机：让神经指纹既强表达又能解释</strong></p>\n<p>传统 ECFP 通过固定哈希规则把原子邻域映射为离散指纹，稳定、快速、可解释，但不能针对具体任务学习“哪些邻域更重要”。早期 neural fingerprint 和 MPNN 能学习连续分子表示，却经常缺少清晰的关注位置。AttentiveFP 的设计目标是在分子图上学习指纹，同时把注意力权重暴露出来：模型不仅输出性质预测，还能显示哪些原子邻域对预测更关键。</p>\n<p><strong>分子图与特征：化学键不是附属信息</strong></p>\n<p>分子被建模为带属性的图：</p>\n<div class=\"kb-math kb-math-display\">G=(V,E,X,E_f)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">X_i</span> 是原子特征，<span class=\"kb-math kb-math-inline\">E_{ij}</span> 是键特征。官方实现中的 atom features 包括元素 one-hot、原子度、形式电荷、自由基电子数、杂化类型、芳香性、连接氢数和手性；bond features 包括单/双/三/芳香键、共轭、环内键和立体信息。首轮消息传递把邻居原子与键特征拼接：</p>\n<div class=\"kb-math kb-math-display\">m_{ij}^{(0)} = \\phi_m\\left([x_j; e_{ij}]\\right)</div>\n<p>这比只在节点之间做普通 GAT 更适合化学图，因为 C-C 单键、C=C 双键、芳香键和手性键会显著改变局部化学语义。</p>\n<p><strong>原子级 attention：可学习的局部邻域聚合</strong></p>\n<p>第 <span class=\"kb-math kb-math-inline\">\\ell</span> 层中，中心原子 <span class=\"kb-math kb-math-inline\">i</span> 对每个邻居 <span class=\"kb-math kb-math-inline\">j</span> 计算对齐分数：</p>\n<div class=\"kb-math kb-math-display\">s_{ij}^{(\\ell)}\n= \\mathrm{LeakyReLU}\\left(a_\\ell^\\top\n[h_i^{(\\ell)}; h_j^{(\\ell)}]\\right)</div>\n<p>然后在邻居集合上归一化：</p>\n<div class=\"kb-math kb-math-display\">\\alpha_{ij}^{(\\ell)}\n= \\frac{\\exp(s_{ij}^{(\\ell)})}\n{\\sum_{k\\in\\mathcal{N}(i)}\\exp(s_{ik}^{(\\ell)})}</div>\n<p>聚合上下文为：</p>\n<div class=\"kb-math kb-math-display\">c_i^{(\\ell)}\n= \\mathrm{ELU}\\left(\\sum_{j\\in\\mathcal{N}(i)}\n\\alpha_{ij}^{(\\ell)} W_\\ell h_j^{(\\ell)}\\right)</div>\n<p>注意力的直觉是：一个原子的所有邻居不应等权处理。例如在溶解度、毒性或活性预测中，极性官能团、芳香系统、带电中心或特定取代基可能比普通碳链更重要。</p>\n<p><strong>GRU 更新：控制“保留自身”和“吸收邻居”的比例</strong></p>\n<p>AttentiveFP 不直接用 <span class=\"kb-math kb-math-inline\">c_i</span> 覆盖节点表示，而是用 GRUCell 更新：</p>\n<div class=\"kb-math kb-math-display\">h_i^{(\\ell+1)}\n= \\mathrm{GRU}\\left(c_i^{(\\ell)}, h_i^{(\\ell)}\\right)</div>\n<p>GRU 的门控机制可以决定当前节点状态中多少来自上一层自身表示、多少来自邻居上下文。对分子图很有意义：某些原子身份本身很关键，不能被邻居平均淹没；同时多层传播又需要把远处取代基、环系统和非局部相互作用逐步纳入表示。</p>\n<p><strong>分子级 readout：用 super node 生成 neural fingerprint</strong></p>\n<p>原子表示学习完成后，AttentiveFP 不是简单平均所有节点，而是构造一个分子级 super node <span class=\"kb-math kb-math-inline\">s</span>，把所有原子连接到 <span class=\"kb-math kb-math-inline\">s</span>，形成 star graph。第 <span class=\"kb-math kb-math-inline\">t</span> 次读出时，分子表示 <span class=\"kb-math kb-math-inline\">g^{(t)}</span> 对原子 <span class=\"kb-math kb-math-inline\">i</span> 计算 attention：</p>\n<div class=\"kb-math kb-math-display\">\\beta_i^{(t)}\n= \\mathrm{softmax}_i\\left(\n\\mathrm{LeakyReLU}(b^\\top[g^{(t)}; h_i])\n\\right)</div>\n<div class=\"kb-math kb-math-display\">r^{(t)}\n= \\sum_i \\beta_i^{(t)} W_r h_i</div>\n<div class=\"kb-math kb-math-display\">g^{(t+1)} = \\mathrm{GRU}(r^{(t)}, g^{(t)})</div>\n<p>经过 <span class=\"kb-math kb-math-inline\">T</span> 次迭代后，<span class=\"kb-math kb-math-inline\">g^{(T)}</span> 就是 AttentiveFP 的分子指纹，可接线性层或 MLP 做分类/回归。这个 readout 让模型在分子层面再次决定“哪些原子更影响当前任务”，因此 attention visualization 可以映射回分子结构。</p>\n<p><strong>训练目标与虚拟筛选关系</strong></p>\n<p>AttentiveFP 本身是通用分子性质预测模型，不是专门的药物-蛋白配对模型。它常用于筛选相关的单分子任务，例如溶解度、毒性、BACE/HIV 活性、血脑屏障穿透等。对于回归任务：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\mathrm{reg}}\n= \\frac{1}{N}\\sum_i(\\hat{y}_i-y_i)^2</div>\n<p>对于多任务分类：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\mathrm{cls}}\n= -\\sum_{i=1}^{N}\\sum_{k=1}^{K} m_{ik}\n\\left[y_{ik}\\log \\hat{p}_{ik}\n+ (1-y_{ik})\\log(1-\\hat{p}_{ik})\\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">m_{ik}</span> 表示第 <span class=\"kb-math kb-math-inline\">i</span> 个样本在第 <span class=\"kb-math kb-math-inline\">k</span> 个任务上是否有标签。训练好的 AttentiveFP embedding 可作为虚拟筛选中的 ligand-side 表示，也可替换 GraphDTA 药物侧编码器，用更细粒度的 attention 和 bond-aware message passing 表达分子。</p>\n<p><strong>优势与局限</strong></p>\n<p>AttentiveFP 的优势是结构归纳偏置清楚：局部邻域聚合类似 ECFP，但 attention 和 GRU 是可学习的；分子级 readout 又能告诉使用者模型关注哪些原子。局限是它主要使用 2D 分子图，不能直接表示 3D 构象、蛋白口袋环境和诱导契合效应；attention 权重也不等于严格因果解释，只能作为模型内部证据的可视化线索。</p>",
      "quiz": {
        "q": "AttentiveFP 中分子级 super node/star graph readout 的主要作用是什么？",
        "options": [
          "把蛋白质序列截断到固定长度",
          "通过注意力从所有原子表示中迭代聚合出分子指纹",
          "把连续回归任务强制改成二分类任务",
          "用随机哈希替代所有可学习参数"
        ],
        "answer": 1,
        "explain": "AttentiveFP 在原子级消息传递后构造分子级 super node，对原子表示做注意力聚合并用 GRU 更新，最终得到可用于性质预测的 neural fingerprint。"
      }
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
      "detail": "<h3>整体架构示意图</h3>\n<p><img alt=\"DrugCLIP Training Pipeline\" src=\"https://arxiv.org/html/2310.06367v1/x1.png\" /></p>\n<p><em>图1：DrugCLIP 训练流程。分子构象由 RDKit 化学模拟生成，口袋数据通过 HomoAug 增强。每个训练迭代中，采样的 3D 分子和 3D 口袋表示通过对比目标进行学习。</em></p>\n<p><img alt=\"HomoAug Pipeline\" src=\"https://arxiv.org/html/2310.06367v1/x2.png\" /></p>\n<p><em>图2：HomoAug 数据增强流程。从 PDBBind 中的口袋蛋白出发，在 AlphaFold DB 中搜索同源蛋白，经 TM-align 结构对齐和相似度过滤后，将同源蛋白与原始配体组合为增强的口袋-配体对。</em></p>\n<h3>核心算法伪代码</h3>\n<p>```</p>"
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
      "summary": "DrugHash 在 DrugCLIP 的蛋白口袋-分子对比检索框架上加入跨模态二值哈希学习，把连续向量检索改造成汉明距离检索，解决十亿级分子库中连续嵌入存储大、排序慢的问题。",
      "keyPoints": [
        "将虚拟筛选继续建模为跨模态检索：给定蛋白口袋查询，从候选分子库中按相似度排序返回可能结合的配体。",
        "沿用 DrugCLIP/Uni-Mol 风格的蛋白口袋编码器和分子编码器，以 3D 原子类型与原子对距离作为输入。",
        "在 CLIP 式双向 InfoNCE 对比损失之外，引入跨模态哈希正则，使蛋白和分子连续嵌入靠近各自的二值码。",
        "训练阶段交替优化编码器参数与二值码：固定编码器时用 <code>sign</code> 得到二值码，固定二值码时反向传播更新编码器。",
        "推理阶段把分子库预编码为二值向量，用汉明距离完成检索；论文报告相对连续向量检索可获得 32x 级别存储节省和 3.5x 级别加速。",
        "来源说明：任务 YAML 中的 <code>2501.12345</code> 未对应到可访问 DrugHash 论文；本文依据可访问论文 <code>Hashing based Contrastive Learning for Virtual Screening</code>，arXiv:2407.19790 / AAAI 2025 页面整理。"
      ],
      "detail": "<h5>图示与来源</h5>\n<p><img alt=\"DrugHash 架构图\" src=\"https://arxiv.org/html/2407.19790v1/extracted/5760753/DrugHash.png\" /></p>\n<p><em>图：DrugHash 的双塔编码、对比学习和跨模态哈希目标。公开来源为 arXiv HTML: https://arxiv.org/html/2407.19790v1，论文页: https://arxiv.org/abs/2407.19790，AAAI 页面: https://ojs.aaai.org/index.php/AAAI/article/view/33873。</em></p>\n<h5>核心算法伪代码</h5>\n<pre><code class=\"language-python\"># DrugHash 训练与检索伪代码\n# 输入: n 个蛋白口袋-分子复合物 {(p_k, m_k)}\n# 编码器: E_p, E_m; 二值码长度 d; 温度 tau; 哈希权重 lambda_hash\n\nfor batch in dataloader:\n    # 1. 双塔 3D 编码\n    y_p = E_p(batch.pockets)      # shape: [B, d], real-valued\n    y_m = E_m(batch.molecules)    # shape: [B, d], real-valued\n\n    # 2. 固定当前编码器输出，生成二值目标码\n    b_p = sign(y_p)               # elements in {-1, +1}\n    b_m = sign(y_m)\n\n    # 3. CLIP 式批内对比学习\n    sim = cosine_similarity_matrix(y_p, y_m)\n    loss_p = cross_entropy(sim / tau, labels=range(B))       # pocket -&gt; molecule\n    loss_m = cross_entropy(sim.T / tau, labels=range(B))     # molecule -&gt; pocket\n    loss_c = 0.5 * (loss_p + loss_m)\n\n    # 4. 哈希正则：让连续嵌入靠近二值码\n    loss_hash = mean_squared_error(y_p, b_p) + mean_squared_error(y_m, b_m)\n    loss = loss_c + lambda_hash * loss_hash\n    loss.backward()\n    optimizer.step()\n\n# 离线: 预编码候选分子库\nmol_codes = {m_id: sign(E_m(mol)) for m_id, mol in molecular_library}\n\n# 在线: 给定口袋，用汉明距离排序\nquery_code = sign(E_p(query_pocket))\nscores = {m_id: -hamming_distance(query_code, code) for m_id, code in mol_codes.items()}\ntop_hits = sorted(scores, key=scores.get, reverse=True)[:k]\n</code></pre>\n<h5>方法机制</h5>\n<p>DrugHash 的出发点不是重新设计绑定能量函数，而是处理 DrugCLIP 之后仍然存在的工程瓶颈。DrugCLIP 已经把虚拟筛选从“每个蛋白-分子对跑一次模型/对接”改成“口袋向量和分子向量做检索”，但若每个分子保存 128 维浮点向量，十亿级数据库仍会带来 TB 级存储和大量浮点相似度排序。DrugHash 的关键判断是：筛选阶段更需要保序的近邻检索表示，而不一定需要完整浮点精度。</p>\n<p>编码器部分保持与 DrugCLIP 接近：蛋白口袋和分子分别由预训练 Uni-Mol/SE(3) Transformer 编码。原子类型初始化 token 表示，原子对欧氏距离经高斯核形成 pair representation，并作为自注意力偏置参与更新：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{q}_{ij}^{l+1}\n= \\mathbf{q}_{ij}^{l}\n+ \\left\\{\n\\frac{\\mathbf{Q}_{i}^{l,h}(\\mathbf{K}_{j}^{l,h})^\\top}{\\sqrt{d}}\n\\mid h \\in [1,H]\n\\right\\}</div>\n<div class=\"kb-math kb-math-display\">\\mathrm{Attention}(\\mathbf{Q}_i^{l,h}, \\mathbf{K}_j^{l,h}, \\mathbf{V}_j^{l,h})\n=\n\\mathrm{softmax}\\left(\n\\frac{\\mathbf{Q}_{i}^{l,h}(\\mathbf{K}_{j}^{l,h})^\\top}{\\sqrt{d}}\n+ \\mathbf{q}_{ij}^{l-1,h}\n\\right)\\mathbf{V}_{j}^{l,h}</div>\n<p>对于一个 batch 中的配对复合物，蛋白和分子编码为：</p>\n<div class=\"kb-math kb-math-display\">(\\mathbf{y}_k^p,\\mathbf{y}_k^m)=(E_p(p_k),E_m(m_k))</div>\n<p>对比学习仍使用双向 InfoNCE。相似度定义为余弦相似度：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{sim}(\\mathbf{y}_i^p,\\mathbf{y}_j^m)\n=\n\\frac{\\mathbf{y}_i^p(\\mathbf{y}_j^m)^\\top}\n{\\|\\mathbf{y}_i^p\\|\\|\\mathbf{y}_j^m\\|}</div>\n<p>蛋白到分子方向和分子到蛋白方向分别要求 batch 对角线上的真实复合物配对得分最高：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_k^p\n=\n-\\frac{1}{n}\\log\n\\frac{\\exp(\\mathrm{sim}(\\mathbf{y}_k^p,\\mathbf{y}_k^m)/\\tau)}\n{\\sum_i \\exp(\\mathrm{sim}(\\mathbf{y}_k^p,\\mathbf{y}_i^m)/\\tau)}</div>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_k^m\n=\n-\\frac{1}{n}\\log\n\\frac{\\exp(\\mathrm{sim}(\\mathbf{y}_k^p,\\mathbf{y}_k^m)/\\tau)}\n{\\sum_i \\exp(\\mathrm{sim}(\\mathbf{y}_i^p,\\mathbf{y}_k^m)/\\tau)}\n,\\qquad\n\\mathcal{L}_c=\\frac{1}{2}\\sum_{k=1}^{n}(\\mathcal{L}_k^p+\\mathcal{L}_k^m)</div>\n<p>DrugHash 的新增部分是把连续输出推向二值码。对蛋白和分子分别定义二值码：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{b}_k^p,\\mathbf{b}_k^m \\in \\{-1,1\\}^d</div>\n<p>哈希损失是连续嵌入到二值码的均方距离：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\mathrm{hash}}\n=\n\\frac{1}{nd}\n\\sum_{k=1}^{n}\n\\left(\n\\|\\mathbf{y}_k^p-\\mathbf{b}_k^p\\|_2^2\n+\n\\|\\mathbf{y}_k^m-\\mathbf{b}_k^m\\|_2^2\n\\right)</div>\n<p>总目标为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}=\\mathcal{L}_c+\\lambda\\mathcal{L}_{\\mathrm{hash}}</div>\n<p>这个正则一方面解决 <code>sign</code> 二值化不可导的问题：训练时让实值向量自然贴近 <span class=\"kb-math kb-math-inline\">-1/+1</span> 的角点，推理时再取符号；另一方面也起到容量约束作用，降低连续向量过拟合训练复合物的风险。论文消融中，加入哈希项后验证损失和 BEDROC 曲线更稳定，这也是二值码不仅更省、更快，还可能提升泛化的原因。</p>\n<p>推理时，DrugHash 将所有候选分子的编码离线转换为二值码：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{b}^{p}=\\mathrm{sign}(E_p(p)),\\qquad\nB_{D_m}=\\{\\mathrm{sign}(E_m(m_1)),\\mathrm{sign}(E_m(m_2)),\\ldots\\}</div>\n<p>随后把 <span class=\"kb-math kb-math-inline\">-1/+1</span> 码映射到 bit 表示，用汉明距离排序。相比浮点内积，二值码可以用位运算和 <code>popcount</code> 快速计算距离；相比 32-bit 浮点，1-bit 表示在同维度下理论存储压缩约 32 倍。对于 Enamine REAL 这类十亿级库，这种变化直接决定本地机器是否能承载候选库索引。</p>\n<p>与传统对接方法相比，DrugHash 不搜索每个分子的结合构象，也不显式预测结合能；与 DrugCLIP 相比，它没有改变“对比表征 + 检索”的核心范式，而是把检索表示从连续向量改为端到端学习的二值码。它的边界也很清楚：二值化可能损失细粒度排序信息，论文使用 128/256/512 等码长实验说明码长越大通常准确率越高，但存储和检索成本也同步上升。</p>",
      "quiz": {
        "q": "DrugHash 中跨模态哈希损失的主要作用是什么？",
        "options": [
          "直接预测蛋白-分子的结合自由能",
          "让连续蛋白/分子嵌入靠近二值码，从而支持汉明距离检索",
          "生成新的分子 3D 构象用于数据增强",
          "用监督分类器判断每个分子是否为活性分子"
        ],
        "answer": 1,
        "explain": "DrugHash 保留双塔对比学习，但额外约束连续嵌入接近 {-1,+1} 二值码；推理时取 sign 后用汉明距离进行快速筛选。"
      }
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
      "summary": "S²Drug 提出两阶段对比学习框架，先用大规模蛋白序列-配体数据预训练绑定感知的序列表征，再在 PDBBind 上用 residue-level gating 融合序列与 3D 口袋结构，并通过结合位点预测辅助任务提升虚拟筛选泛化能力。",
      "keyPoints": [
        "两阶段框架：ChemBL 上进行蛋白序列-配体对比预训练，PDBBind 上进行序列-结构融合微调。",
        "蛋白侧使用 ESM2 序列编码器，配体和口袋结构侧使用 Uni-Mol 结构编码器。",
        "设计 bilateral data sampling：蛋白侧做同源下采样和功能去重，配体侧做亲和力变异过滤、frequent hitter/PAINS 过滤。",
        "在微调阶段引入 residue-level gating，对每个口袋残基自适应融合序列 embedding 与结构 embedding。",
        "增加结合位点预测辅助任务，只用序列表示和配体 probe 注意力预测哪些残基属于 binding site，避免直接泄露结构标签。",
        "总目标由融合后的口袋-配体对比损失与 binding site prediction 的 BCE 损失组成，兼顾全局检索排序和局部口袋定位。"
      ],
      "detail": "<h5>图示与来源</h5>\n<p><img alt=\"S²Drug 两阶段框架图\" src=\"https://arxiv.org/html/2511.07006v1/x1.png\" /></p>\n<p><em>图：S²Drug 的两阶段序列-结构对比学习流程。公开来源为 arXiv HTML: https://arxiv.org/html/2511.07006v1；官方 AAAI 论文页和 PDF 分别为 https://ojs.aaai.org/index.php/AAAI/article/view/36997 与 https://ojs.aaai.org/index.php/AAAI/article/view/36997/40959。</em></p>\n<h5>核心算法伪代码</h5>\n<pre><code class=\"language-python\"># S²Drug 两阶段训练伪代码\n\n# Stage 1: sequence-ligand contrastive pretraining on ChemBL\nD0 = load_chembl_triplets()  # (protein_sequence, ligand, affinity)\nD = []\nfor P, L, affinity_records in D0:\n    if is_functional_duplicate(P):\n        continue\n    if affinity_std(log_values(affinity_records)) &gt;= delta:\n        continue\n    if is_frequent_hitter(L) or contains_pains_substructure(L):\n        continue\n    weight = homology_downweight(P) * ligand_rebalance_weight(L)\n    D.append((P, L, weight))\n\nfor batch in sample_with_weights(D):\n    h_p_seq = project(mean_pool(ESM2(batch.protein_sequences)))\n    h_l_3d = project(mean_pool(UniMolLigand(batch.ligands_3d)))\n    loss_pc = symmetric_infonce(h_p_seq, h_l_3d)\n    update(ESM2, UniMolLigand, loss_pc)\n\n# Stage 2: sequence-structure fusion finetuning on PDBBind\nfor batch in pdbbind_complexes:\n    # residue-level sequence representation\n    x_seq = ESM2(batch.full_sequences)  # [residue, d_s]\n\n    # atom-level pocket structure representation -&gt; residue pooling\n    z_atoms = UniMolPocket(batch.pocket_3d_atoms)\n    x_geo = masked_mean_pool_atoms_to_residues(z_atoms, batch.residue_atom_map)\n\n    # residue-level gating fusion\n    beta = sigmoid(MLP(concat(W_s(x_seq), W_g(x_geo))))\n    x_fused = beta * W_s(x_seq) + (1 - beta) * W_g(x_geo)\n    h_pocket = mean_pool(Transformer(x_fused over pocket residues))\n\n    # ligand structural embedding\n    h_ligand = mean_pool(UniMolLigand(batch.ligands_3d))\n\n    # main contrastive retrieval objective\n    loss_fc = symmetric_infonce(h_pocket, h_ligand)\n\n    # auxiliary binding-site prediction from sequence-only residue features\n    residue_prob = average_probe_attention(x_seq, probe_ligand_embeddings)\n    loss_bsp = binary_cross_entropy(residue_prob, batch.binding_site_labels)\n\n    loss = loss_fc + lambda_bsp * loss_bsp\n    update(all_trainable_modules, loss)\n\n# Inference: encode query pocket with fused sequence-structure representation,\n# precompute ligand embeddings, rank by cosine similarity.\n</code></pre>\n<h5>方法机制</h5>\n<p>S²Drug 关注 DrugCLIP/DrugHash 这一类结构检索模型的一个短板：它们主要利用口袋 3D 结构，而蛋白序列信息在虚拟筛选中没有被充分监督使用。序列数据规模远大于结构复合物数据，且蛋白语言模型已经能编码进化和功能语义；但若直接把 ChemBL 等蛋白-配体数据拿来训练，又会遇到蛋白同源冗余、功能重复、亲和力测定噪声和非特异性配体等问题。S²Drug 因此把训练拆成“序列预训练”和“序列-结构融合微调”两个阶段。</p>\n<p>第一阶段在大规模蛋白-配体亲和力三元组上训练。清洗策略从蛋白和配体两侧同时做采样控制。蛋白同源簇 <span class=\"kb-math kb-math-inline\">C_m^{hom}</span> 中的样本概率被下调为：</p>\n<div class=\"kb-math kb-math-display\">\\Pr(P_n)=\\frac{1}{|C_m^{hom}|^\\alpha},\\qquad \\alpha\\in(0,1]</div>\n<p>功能去重进一步按 UniProt/GO 等功能注释分组：</p>\n<div class=\"kb-math kb-math-display\">C_k^{fun}=\\{P_n\\mid \\phi(P_n)=\\phi_k\\}</div>\n<p>配体侧先检查同一蛋白-配体对在不同实验中的亲和力离散度：</p>\n<div class=\"kb-math kb-math-display\">\\sigma_n=\\mathrm{StdDev}(\\log a_n^1,\\ldots,\\log a_n^J)</div>\n<p>只保留 <span class=\"kb-math kb-math-inline\">\\sigma_n&lt;\\delta</span> 的稳定样本，并下调或移除频繁命中多个靶点的 promiscuous ligands。最终采样可写成：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{D}\n=\n\\mathrm{Sample}_{(P,L,a)\\sim\\mathcal{D}_0}\n\\left[\n\\Pr(P)\\cdot\n\\mathbb{I}_{\\mathrm{clean}(P,L,a)}\n\\cdot\nw_{\\mathrm{lig}}(L)\n\\right]</div>\n<p>预训练目标是让蛋白序列 embedding 和配体结构 embedding 在共享空间中对齐。蛋白序列由 ESM2 编码并做 mean pooling：</p>\n<div class=\"kb-math kb-math-display\">h_n^{p,s}=\\mathrm{MeanPool}(\\mathrm{Seq}^{p}(S(P_n)))</div>\n<p>配体由 Uni-Mol 结构编码器得到：</p>\n<div class=\"kb-math kb-math-display\">h_n^{l,g}=\\mathrm{MeanPool}(\\mathrm{Stru}^{l}(G(L_n)))</div>\n<p>二者经 MLP 投影后使用对称 InfoNCE。相似度为：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{sim}(h_n^{p,s},h_m^{l,g})\n=\n\\frac{\\langle h_n^{p,s},h_m^{l,g}\\rangle}\n{\\|h_n^{p,s}\\|\\|h_m^{l,g}\\|}</div>\n<p>预训练对比损失为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{pc}\n=\n-\\frac{1}{N}\\sum_{n=1}^{N}\n\\left[\n\\log\n\\frac{\\exp(\\mathrm{sim}(h_n^{p,s},h_n^{l,g})/\\tau)}\n{\\sum_{m=1}^{N}\\exp(\\mathrm{sim}(h_n^{p,s},h_m^{l,g})/\\tau)}\n+\n\\log\n\\frac{\\exp(\\mathrm{sim}(h_n^{p,s},h_n^{l,g})/\\tau)}\n{\\sum_{m=1}^{N}\\exp(\\mathrm{sim}(h_m^{p,s},h_n^{l,g})/\\tau)}\n\\right]</div>\n<p>第二阶段转向 PDBBind 这类有高分辨率口袋结构的数据。对每个口袋残基 <span class=\"kb-math kb-math-inline\">r_i</span>，S²Drug 将 Uni-Mol 产生的 atom-level 结构表示聚合成 residue-level 几何表示：</p>\n<div class=\"kb-math kb-math-display\">x^g_{n,i}\n=\n\\frac{1}{|r_i|}\n\\sum_{a\\in r_i}\\mathbb{I}_{a\\in r_i}\\cdot z_a</div>\n<p>然后用 gating 机制融合序列和结构：</p>\n<div class=\"kb-math kb-math-display\">\\beta_{n,i}\n=\n\\sigma\\left(\nW_\\beta^\\top[W_s x^s_{n,i}; W_g x^g_{n,i}]\n+b_\\beta\n\\right)</div>\n<div class=\"kb-math kb-math-display\">x^f_{n,i}\n=\n\\beta_{n,i}\\cdot W_sx^s_{n,i}\n+\n(1-\\beta_{n,i})\\cdot W_gx^g_{n,i}</div>\n<p>这个门控不是简单拼接，而是让每个残基按局部情况决定更依赖序列语义还是 3D 结构。例如保守功能残基可能由序列信息提供强先验，而口袋形状、空间邻近性和侧链构象则需要结构分支补充。</p>\n<p>辅助任务是结合位点预测。论文强调口袋并不一定是序列上的连续片段，而是蛋白折叠后在三维空间中聚集的一组残基。S²Drug 采样 <span class=\"kb-math kb-math-inline\">K</span> 个 ligand probes，用共享注意力投影计算残基与配体 probe 的相关性：</p>\n<div class=\"kb-math kb-math-display\">\\alpha_{n,i}^{k}\n=\n\\frac{\\exp(W_r x^s_{n,i}\\cdot W_l h_k^{l,g})}\n{\\sum_{i=1}^{I_n}\\exp(W_r x^s_{n,i}\\cdot W_l h_k^{l,g})}</div>\n<p>多个 probe 的平均值作为残基属于 binding site 的概率：</p>\n<div class=\"kb-math kb-math-display\">\\hat{y}_{n,i}\n=\n\\frac{1}{K}\\sum_{k=1}^{K}\\alpha_{n,i}^{k}</div>\n<p>训练使用逐残基 BCE：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{bsp}\n=\n-\\frac{1}{N}\n\\sum_{n=1}^{N}\\sum_{i=1}^{I_n}\n\\left[\ny_{n,i}\\log\\hat{y}_{n,i}\n+\n(1-y_{n,i})\\log(1-\\hat{y}_{n,i})\n\\right]</div>\n<p>主任务仍是融合口袋表示与配体表示的对比检索。微调阶段的最终目标为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{total}\n=\n\\mathcal{L}_{fc}\n+\n\\lambda\\mathcal{L}_{bsp}</div>\n<p>因此，S²Drug 与 DrugCLIP 的区别不只是“多加一个序列编码器”。它先用大规模序列-配体数据让序列分支学到 ligand-binding-aware 表征，再用残基层门控把序列和结构对齐到同一个口袋表示中，最后用 binding site prediction 把局部残基定位信号注入检索 embedding。这样做的实际价值是：当 3D 结构存在扰动、口袋定义不完整或新蛋白与训练复合物分布差异较大时，序列侧的进化和功能先验能提供额外约束。</p>",
      "quiz": {
        "q": "S²Drug 为什么要使用两阶段训练，而不是直接在 PDBBind 上训练序列-结构融合模型？",
        "options": [
          "因为 PDBBind 没有任何 3D 结构信息",
          "因为大规模序列-配体数据可先注入绑定偏好，随后小规模结构复合物用于精细融合和口袋定位",
          "因为 ESM2 只能处理分子图，不能处理蛋白序列",
          "因为结合位点预测任务不能与对比学习同时优化"
        ],
        "answer": 1,
        "explain": "第一阶段利用 ChemBL 等大规模数据学习蛋白序列与配体的绑定偏好；第二阶段再用 PDBBind 的结构信息进行 residue-level 融合，并加入结合位点预测辅助监督。"
      }
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
      "summary": "BindCLIP 将 CLIP 式口袋-配体对比学习与口袋条件扩散式 binding pose 生成联合训练，用生成任务提供原子级、姿态级监督，解决纯对比检索 embedding 对细粒度相互作用不敏感、容易依赖捷径特征的问题。",
      "keyPoints": [
        "继续采用虚拟筛选的双塔检索范式：口袋和配体编码到共享空间，推理阶段仍按 embedding 相似度或 ANN 检索排序。",
        "在对比学习之外加入 pocket-conditioned binding pose generation objective，通过扩散去噪重建结合态配体坐标。",
        "扩散去噪器只在训练阶段使用，推理阶段不参与筛选，因此不会破坏 DrugCLIP 类方法的高效检索优势。",
        "使用口袋和配体编码器的 atom-level embeddings 作为去噪器 FiLM 调制条件，让原子级相互作用信号反向塑造全局 embedding。",
        "引入 hard-negative augmentation：为每个正配体挖掘相似但经 Vina 过滤后较不可能强结合的困难负样本。",
        "设计 ligand-ligand anchoring regularizer，避免 hard negatives 在对比学习排斥力下坍缩到远离配体流形的无效区域。"
      ],
      "detail": "<h5>图示与来源</h5>\n<p><img alt=\"BindCLIP 框架图\" src=\"https://arxiv.org/html/2602.15236v1/materials/framework.jpg\" /></p>\n<p><em>图：BindCLIP 将口袋条件 binding pose 生成、CLIP 式对比学习和 hard-negative augmentation 组合成统一训练框架。公开来源为 arXiv HTML: https://arxiv.org/html/2602.15236v1，论文页: https://arxiv.org/abs/2602.15236。</em></p>\n<h5>核心算法伪代码</h5>\n<pre><code class=\"language-python\"># BindCLIP 联合训练伪代码\n# Encoders: f_pocket, f_ligand\n# Denoiser: phi_d, only used during training\n\nfor batch in pocket_ligand_complexes:\n    # Positive pairs with resolved binding pose\n    pockets = batch.pockets\n    ligands_unbound = rdkit_mmff_conformers(batch.ligands)\n    binding_pose = batch.ligand_bound_coordinates\n\n    # 1. Hard-negative mining / loading\n    hard_negs = []\n    for p_i, m_i in zip(pockets, batch.ligands):\n        candidates = nearest_neighbors_in_unimol_space(m_i, large_molecule_library)\n        candidates = filter_by_vina_score(candidates, pocket=p_i, positive=m_i)\n        hard_negs.append(candidates[:k])\n\n    # 2. Encode positives and hard negatives\n    z_p, H_p = f_pocket(pockets)             # global and atom-level pocket embeddings\n    z_m, H_m = f_ligand(ligands_unbound)     # global and atom-level ligand embeddings\n    z_hn, H_hn = f_ligand(hard_negs)\n\n    # 3. Hard-negative contrastive objective\n    loss_c_hn = pocket_side_infonce_with_extra_negatives(z_p, z_m, z_hn)\n    loss_c_hn += molecule_side_infonce(z_p, z_m)\n    loss_c_hn *= 0.5\n\n    # 4. Pocket-conditioned diffusion pose generation\n    t = uniform_integer(1, T)\n    x_t = add_gaussian_noise(binding_pose, t)\n    x0_hat, atom_type_hat = phi_d(x_t, pockets, t, condition=[H_p, H_m])\n    loss_d = mse(binding_pose, x0_hat) + lambda_type * cross_entropy(atom_type_hat, atom_types)\n\n    # 5. Ligand-ligand anchoring for hard negatives\n    loss_anchor = hinge_anchor(z_m, z_hn, in_batch_ligand_similarities=z_m @ z_m.T)\n\n    loss = loss_c_hn + lambda_d * loss_d + lambda_a * loss_anchor\n    update(f_pocket, f_ligand, phi_d, loss)\n\n# Inference: denoiser is discarded\nmol_index = build_ann_index({m: normalize(f_ligand(m).z) for m in library})\nquery = normalize(f_pocket(query_pocket).z)\nhits = mol_index.search(query, top_k=k)\n</code></pre>\n<h5>方法机制</h5>\n<p>BindCLIP 的核心批判是：DrugCLIP 类纯对比模型虽然高效，但全局 embedding 可能只捕捉粗粒度相关性，例如分子整体物化性质或训练集分布捷径，而不一定真正理解盐桥、供体/受体、羟基遮蔽等局部相互作用变化。虚拟筛选的排序问题恰恰依赖这些微小差异，因此仅让真实配对在 batch 对角线上相似是不够的。</p>\n<p>基础检索公式仍然与 CLIP/DrugCLIP 一致。给定口袋 <span class=\"kb-math kb-math-inline\">p</span> 和分子库 <span class=\"kb-math kb-math-inline\">\\mathcal{M}=\\{m_1,\\ldots,m_n\\}</span>，口袋编码器与分子编码器输出：</p>\n<div class=\"kb-math kb-math-display\">(z,H)=f(\\{(v_i,a_i)\\}_{i=0}^{N}),\\qquad\nz\\in\\mathbb{R}^{d},\\;H\\in\\mathbb{R}^{N\\times d}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">z</span> 是 <code>[CLS]</code> 全局 embedding，<span class=\"kb-math kb-math-inline\">H</span> 是 atom-level embeddings。推理打分使用余弦相似度：</p>\n<div class=\"kb-math kb-math-display\">s(p_i,m_j)\n=\n\\frac{z_{p_i}^{\\top}z_{m_j}}\n{\\|z_{p_i}\\|\\|z_{m_j}\\|}</div>\n<p>标准对比损失为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{p}\n=\n-\\frac{1}{B}\\sum_{i=1}^{B}\n\\log\n\\frac{\\exp(s(p_i,m_i)/\\tau)}\n{\\sum_{j=1}^{B}\\exp(s(p_i,m_j)/\\tau)}</div>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{m}\n=\n-\\frac{1}{B}\\sum_{i=1}^{B}\n\\log\n\\frac{\\exp(s(p_i,m_i)/\\tau)}\n{\\sum_{j=1}^{B}\\exp(s(p_j,m_i)/\\tau)}\n,\\qquad\n\\mathcal{L}_{c}=\\frac{1}{2}(\\mathcal{L}_{p}+\\mathcal{L}_{m})</div>\n<p>BindCLIP 的第一项创新是把 binding pose 生成作为训练期辅助监督。对复合物中的配体结合态坐标 <span class=\"kb-math kb-math-inline\">\\mathbf{x}^{(0)}\\in\\mathbb{R}^{N_m\\times3}</span>，扩散前向过程在时间步 <span class=\"kb-math kb-math-inline\">t</span> 加入高斯噪声得到 <span class=\"kb-math kb-math-inline\">\\mathbf{x}^{(t)}</span>。反向去噪器 <span class=\"kb-math kb-math-inline\">\\phi_{\\theta_d}</span> 根据噪声坐标、口袋、时间步以及编码器产生的 atom-level 条件 <span class=\"kb-math kb-math-inline\">(H_p,H_m)</span> 预测干净结合姿态：</p>\n<div class=\"kb-math kb-math-display\">\\hat{\\mathbf{x}}^{(0)}\n=\n\\phi_{\\theta_d}(\\mathbf{x}^{(t)},p,t,H_p,H_m)</div>\n<p>去噪器采用 SE(3)-equivariant block，以保持几何变换一致性。每一层中，来自口袋和配体编码器的 atom-level embeddings 被映射为 FiLM 参数，对隐藏状态做逐原子调制：</p>\n<div class=\"kb-math kb-math-display\">[\\gamma_{\\ell,i},\\beta_{\\ell,i}]\n=\ng_\\ell([H_p;H_m]_i)</div>\n<div class=\"kb-math kb-math-display\">h_{\\ell,i}\n=\n\\gamma_{\\ell,i}\\odot \\tilde{h}_{\\ell,i}\n+\\beta_{\\ell,i}</div>\n<p>扩散生成损失包含坐标重建和配体原子类型预测：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{d}\n=\n\\|\\mathbf{x}^{(0)}-\\hat{\\mathbf{x}}^{(0)}\\|_2^2\n+\n\\lambda_{\\mathrm{type}}\\mathrm{CE}(\\mathbf{v},\\hat{\\mathbf{v}})</div>\n<p>直觉上，如果 <span class=\"kb-math kb-math-inline\">(H_p,H_m)</span> 不包含氢键、疏水接触、排斥冲突等局部相互作用信息，去噪器就无法从 <span class=\"kb-math kb-math-inline\">\\mathbf{x}^{(t)}</span> 可靠恢复结合态坐标。因此，生成目标把“能否解释正确结合姿态”变成对编码器的监督信号。由于 Uni-Mol 的 <code>[CLS]</code> 全局 token 与 atom-level token 共享注意力和参数，优化 atom-level 条件也会间接塑造用于检索的全局 embedding。</p>\n<p>第二项创新是 hard-negative augmentation。对于正样本 <span class=\"kb-math kb-math-inline\">(p_i,m_i)</span>，BindCLIP 先在 Uni-Mol 分子 embedding 空间中找与 <span class=\"kb-math kb-math-inline\">m_i</span> 相似的候选，再用 AutoDock Vina 过滤掉 docking score 比正样本更好的候选，降低把潜在真阳性错当负样本的风险。口袋侧 InfoNCE 的分母因此加入额外困难负样本：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{p}^{HN}\n=\n-\\frac{1}{B}\\sum_{i=1}^{B}\n\\log\n\\frac{\\exp(s(p_i,m_i)/\\tau)}\n{\\sum_{j=1}^{B}\\exp(s(p_i,m_j)/\\tau)\n+\n\\sum_{j=1}^{B\\times k}\\exp(s(p_i,\\tilde{m}_j)/\\tau)}</div>\n<p>分子侧损失保持不变，组合为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{c}^{HN}\n=\n\\frac{1}{2}(\\mathcal{L}_{p}^{HN}+\\mathcal{L}_{m}^{HN})</div>\n<p>只加 hard negatives 也会带来问题：这些困难负样本总被当作负类排斥，可能被推到远离分子流形的区域，导致后续梯度失去信息。BindCLIP 因此加入 ligand-ligand anchoring regularizer。令 <span class=\"kb-math kb-math-inline\">s_i^{hard}</span> 表示正配体与其 hard negatives 中最高相似度，<span class=\"kb-math kb-math-inline\">\\bar{s}_i</span> 表示正配体与 batch 内其他随机配体的平均相似度，使用 hinge 约束：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{a}\n=\n\\sum_{i=1}^{B}\n\\max\\left(\n0,\\;\n\\mathrm{sg}(\\bar{s}_i)-s_i^{hard}+\\delta\n\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathrm{sg}</span> 是 stop-gradient。这个正则要求 hard negatives 不要比随机分子还离谱地远，保留“相似但不匹配”的训练价值；同时对比损失仍会把它们与目标口袋区分开。</p>\n<p>最终训练目标为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}(\\theta_p,\\theta_m,\\theta_d)\n=\n\\mathcal{L}_{c}^{HN}(\\theta_p,\\theta_m)\n+\n\\lambda_d\\mathcal{L}_{d}(\\theta_d,\\theta_p,\\theta_m)\n+\n\\lambda_a\\mathcal{L}_{a}(\\theta_m)</div>\n<p>推理阶段丢弃扩散去噪器，只保留 <span class=\"kb-math kb-math-inline\">f_{\\theta_p}</span> 和 <span class=\"kb-math kb-math-inline\">f_{\\theta_m}</span>。这使 BindCLIP 的部署成本接近 DrugCLIP：候选分子可离线预编码，在线只需编码查询口袋并做相似度检索。方法上的关键取舍是训练更重，但把姿态级生成监督蒸馏进检索 embedding，从而提高对 OOD 虚拟筛选和近似配体 analogue 排序的敏感性。</p>",
      "quiz": {
        "q": "BindCLIP 中扩散式 binding pose generation 的主要作用是什么？",
        "options": [
          "在推理时为每个候选分子生成最终 docking pose 后再排序",
          "作为训练期辅助目标，用姿态级监督塑造更关注相互作用的检索 embedding",
          "替代口袋编码器，使模型只输入配体结构",
          "把所有 hard negatives 合成为新的正样本"
        ],
        "answer": 1,
        "explain": "BindCLIP 的扩散去噪器只在训练中使用，通过重建结合态坐标和预测原子类型给 atom-level embeddings 提供细粒度监督；推理时仍使用双塔 embedding 检索。"
      }
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
      "summary": "CADG-DTA 将药物 SMILES 构造成原子级分子图、将蛋白 FASTA 构造成残基级接触图，再用双路 GNN 编码和 drug-target cross-attention 融合子结构交互，解决早期 DTA 模型只用序列或简单拼接特征而丢失拓扑交互信息的问题。",
      "keyPoints": [
        "<strong>双图输入</strong>：药物由 RDKit 从 SMILES 生成 atom-level graph，蛋白由 FASTA 经 PConsC4 contact map 生成 residue-level graph",
        "<strong>双路图编码器</strong>：药物图与蛋白图分别经过 GNN、graph pooling、MLP、BatchNorm 得到结构表征",
        "<strong>GNN 组合消融</strong>：公开图 3 对比 GAT_GAT、GAT_GIN、GIN_GAT、GIN_GIN，并用 MSE、CI、<span class=\"kb-math kb-math-inline\">r_m^2</span> 评估编码器选择",
        "<strong>交叉注意力融合</strong>：用 drug representation 和 protein representation 构造 <span class=\"kb-math kb-math-inline\">Q,K,V</span>，显式学习药物子结构与靶标残基子结构之间的匹配权重",
        "<strong>DTA 回归任务</strong>：输出连续 binding affinity，而不是 DTI 的二分类相互作用标签",
        "<strong>标准基准</strong>：在 Davis 和 KIBA 两个 DTA 数据集上评估，并与 DeepDTA、GraphDTA 一类序列/图模型对比",
        "<strong>解释性来源</strong>：cross-attention 权重可定位对预测贡献较大的药物原子团和蛋白残基区域",
        "<strong>来源限制</strong>：Springer 页面目前只公开摘要、图示、数据/代码链接；任务 full_name 中的“等变”未在可访问摘要和图注中体现为严格的 SE(3)/E(n) 等变网络"
      ],
      "detail": "<h5>论文与图示来源说明</h5>\n<p>任务给定论文为 Springer Pattern Analysis and Applications 文章，DOI <code>10.1007/s10044-026-01638-7</code>。截至本次读取，Springer 正文为订阅预览，公开可访问内容包括摘要、Fig. 1 至 Fig. 4、数据来源和代码链接；ResearchGate 预览也提供了 Fig. 1 图注。论文页面列出的代码仓库 <code>https://github.com/mtnrzna/CADG-DTA</code> 当前不可访问，因此下面的方法解读基于 Springer 摘要、公开图示和图注，并把推断性部分明确限定在架构层面。</p>\n<p><img alt=\"CADG-DTA 总体架构\" src=\"https://media.springernature.com/lw685/springer-static/image/art%3A10.1007%2Fs10044-026-01638-7/MediaObjects/10044_2026_1638_Fig1_HTML.png\" />\n<em>图：CADG-DTA 的公开 Fig. 1。上半部分展示从 SMILES/FASTA 到双图构造、双路编码、cross-attention 融合和 MLP 预测；下半部分展示药物图、蛋白接触图、编码器结构和 cross-attention 模块。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># CADG-DTA 简化训练流程\nfor smiles, fasta, affinity in dta_dataset:\n    # 1. 构图\n    drug_graph = rdkit_atom_graph(smiles)\n    contact_map = pconsc4_contact_prediction(fasta)\n    protein_graph = residue_graph(fasta, contact_map, threshold=0.5)\n\n    # 2. 双路图编码\n    H_d = drug_gnn(drug_graph.x, drug_graph.edge_index, drug_graph.edge_attr)\n    H_p = protein_gnn(protein_graph.x, protein_graph.edge_index, protein_graph.edge_attr)\n    z_d = batch_norm(mlp(graph_pool(H_d)))\n    z_p = batch_norm(mlp(graph_pool(H_p)))\n\n    # 3. 药物-蛋白交叉注意力\n    Q = linear_q(H_d)          # drug substructures as queries\n    K = linear_k(H_p)          # protein residues/substructures as keys\n    V = linear_v(H_p)          # protein values\n    A = softmax(Q @ K.T / sqrt(hidden_dim), dim=-1)\n    H_dp = A @ V               # drug-conditioned protein context\n\n    # 4. 融合和亲和力回归\n    fused = concat(graph_pool(H_dp), z_d, z_p)\n    y_hat = mlp_decoder(fused)\n    loss = mse(y_hat, affinity)\n    loss.backward()\n    optimizer.step()\n</code></pre>\n<h5>为什么从 GraphDTA 发展到双图交叉注意力</h5>\n<p>GraphDTA 的核心改进是把小分子从字符序列转为分子图，用图卷积捕捉原子邻接和局部官能团结构。但许多 DTA 模型仍把蛋白作为一维序列，或在编码后把 drug vector 与 target vector 直接拼接。这种做法能学习“这个分子”和“这个蛋白”的总体兼容性，却很难显式表达“哪个药物片段可能和哪个残基区域相关”。</p>\n<p>CADG-DTA 的设计把药物和蛋白都放到图空间中：药物图的节点是原子，蛋白图的节点是氨基酸残基，蛋白边来自 contact map。这样，模型输入不只是序列顺序，还包含化学键拓扑和残基空间邻近关系。对 DTA 来说，这一点很关键，因为结合亲和力通常由局部药效团、口袋残基、疏水/电荷互补和空间邻接共同决定。</p>\n<h5>双路 GNN 编码机制</h5>\n<p>对药物图 <span class=\"kb-math kb-math-inline\">G_D=(V_D,E_D)</span> 和蛋白图 <span class=\"kb-math kb-math-inline\">G_P=(V_P,E_P)</span>，GNN 层可以抽象为：</p>\n<div class=\"kb-math kb-math-display\">h_v^{(\\ell+1)}\n= \\phi\\left(\nh_v^{(\\ell)},\n\\operatorname{AGG}_{u\\in\\mathcal{N}(v)}\n\\psi(h_v^{(\\ell)},h_u^{(\\ell)},e_{uv})\n\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">h_v^{(\\ell)}</span> 是第 <span class=\"kb-math kb-math-inline\">\\ell</span> 层节点表示，<span class=\"kb-math kb-math-inline\">e_{uv}</span> 是键或接触边特征，<span class=\"kb-math kb-math-inline\">\\operatorname{AGG}</span> 可以是加和、均值或注意力加权。若编码器采用 GAT，邻居消息会带有注意力权重；若采用 GIN，模型更强调图同构判别能力。公开 Fig. 3 显示作者比较了 GAT/GAT、GAT/GIN、GIN/GAT、GIN/GIN 四种药物-蛋白编码器组合，说明 CADG-DTA 的性能并不只依赖 cross-attention，前端图编码器的归纳偏置同样影响 MSE、CI 和 <span class=\"kb-math kb-math-inline\">r_m^2</span>。</p>\n<p>图编码完成后，节点级表示通过 pooling 压缩为图级表示：</p>\n<div class=\"kb-math kb-math-display\">z_D = \\operatorname{Pool}(\\{h_i^D\\}_{i\\in V_D}), \\qquad\nz_P = \\operatorname{Pool}(\\{h_j^P\\}_{j\\in V_P})</div>\n<p>随后经过 MLP 和 BatchNorm。这个步骤的作用是把不同大小的分子图和蛋白图映射到统一维度，同时保留可用于下游交互建模的全局结构信息。</p>\n<h5>Cross-attention 融合：从“拼接两个向量”到“对齐两个子结构集合”</h5>\n<p>CADG-DTA 的核心不是简单计算 <span class=\"kb-math kb-math-inline\">z=[z_D;z_P]</span>，而是让药物节点/子结构对蛋白残基/子结构做交叉注意力。一个标准形式为：</p>\n<div class=\"kb-math kb-math-display\">Q = H_D W_Q,\\qquad K = H_P W_K,\\qquad V = H_P W_V</div>\n<div class=\"kb-math kb-math-display\">A_{ij}\n= \\frac{\\exp(q_i^\\top k_j/\\sqrt{d})}\n{\\sum_{j&#x27;}\\exp(q_i^\\top k_{j&#x27;}/\\sqrt{d})},\n\\qquad\nc_i=\\sum_j A_{ij}v_j</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">A_{ij}</span> 表示药物第 <span class=\"kb-math kb-math-inline\">i</span> 个原子环境对蛋白第 <span class=\"kb-math kb-math-inline\">j</span> 个残基环境的注意力强度。直觉上，模型不再只问“这个药物和这个蛋白是否匹配”，而是学习“这个药效团应该关注哪些残基区域”。这也解释了论文摘要中强调的 interpretability：注意力矩阵可以作为候选相互作用区域的软证据，虽然它不等价于真实物理接触。</p>\n<h5>亲和力预测与损失函数</h5>\n<p>DTA 是连续值回归。Davis 常用 <span class=\"kb-math kb-math-inline\">pK_d</span> 变换后的亲和力，KIBA 使用综合 KIBA score。训练目标通常是均方误差：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\mathrm{MSE}}\n= \\frac{1}{N}\\sum_{n=1}^{N}\n\\left(\\hat{y}_n-y_n\\right)^2</div>\n<p>评估时还会使用 concordance index (CI) 衡量排序一致性：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{CI}\n= \\frac{1}{Z}\\sum_{y_i&gt;y_j}\n\\left[\n\\mathbb{I}(\\hat{y}_i&gt;\\hat{y}_j)\n+ \\frac{1}{2}\\mathbb{I}(\\hat{y}_i=\\hat{y}_j)\n\\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">Z</span> 是可比较样本对数量。MSE 更关注数值误差，CI 更关注药物筛选排序是否正确；因此一个 DTA 模型需要同时在回归精度和排序能力上表现稳定。</p>\n<h5>蛋白图构造的意义和风险</h5>\n<p>CADG-DTA 用 PConsC4 从 FASTA 序列和序列比对结果预测 contact map，再按阈值过滤边。这个设计的优势是即使没有实验蛋白结构，也能构建残基级拓扑图；相比一维 CNN/RNN，模型可以把远距离但空间接近的残基连接起来。风险是 contact map 本身是预测结果，若蛋白家族同源序列不足或序列过短，接触图噪声会传递到 DTA 模型。</p>\n<div class=\"key-point\">💡 关键：CADG-DTA 的“结构信息”主要来自分子键图和蛋白接触图，而不是显式蛋白-配体三维复合物坐标。因此它比纯序列模型更结构化，但仍不同于基于 docking pose 或等变 3D GNN 的结合能模型。</div>\n<h5>与传统 DTA 模型的区别</h5>\n<p>DeepDTA 把 SMILES 和蛋白序列都视作字符串，用 CNN 提取局部 n-gram 模式；GraphDTA 把药物端换成图，但蛋白端多仍依赖序列编码。CADG-DTA 进一步把蛋白端也图化，并在融合层显式引入 drug-target cross-attention。这个变化把模型瓶颈从“各自编码后拼接”改为“在子结构集合之间建模相互作用”，更符合 DTA 的物理直觉。</p>\n<p>不过，cross-attention 不保证因果解释。注意力高的残基可能只是统计相关，也可能受数据偏差影响。因此它适合用于生成可检查的候选区域，而不应直接替代分子动力学、突变实验或结构生物学验证。</p>",
      "quiz": {
        "q": "CADG-DTA 相比只拼接药物向量和蛋白向量的 DTA 模型，最核心的改进是什么？",
        "options": [
          "把 DTA 回归任务改成了无监督聚类任务",
          "用 cross-attention 学习药物子结构与蛋白残基子结构之间的交互权重",
          "完全依赖蛋白-配体复合物的实验三维结构",
          "只使用蛋白序列，不再使用分子图"
        ],
        "answer": 1,
        "explain": "CADG-DTA 的关键在于双图编码后用交叉注意力对齐 drug/protein 子结构，使融合层能够建模局部交互，而不是只做全局向量拼接。"
      }
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
      "summary": "QSAR 将分子的结构、理化性质和取代基常数编码为可回归的描述符，用统计模型预测生物活性或 ADMET 端点，解决了早期药物优化只能依赖定性 SAR 经验而难以量化外推的问题。",
      "keyPoints": [
        "<strong>核心假设</strong>：结构相近且描述符相近的化合物，在相同实验端点上应具有可统计建模的活性趋势",
        "<strong>Hansch 分析</strong>：用疏水性 <span class=\"kb-math kb-math-inline\">\\log P</span> 或 <span class=\"kb-math kb-math-inline\">\\pi</span>、电子效应 <span class=\"kb-math kb-math-inline\">\\sigma</span>、位阻参数 <span class=\"kb-math kb-math-inline\">E_s</span> 解释 <span class=\"kb-math kb-math-inline\">\\log(1/C)</span> 等活性指标",
        "<strong>线性自由能关系来源</strong>：继承 Hammett 方程思想，把取代基电子效应从反应速率扩展到生物活性",
        "<strong>常见模型形式</strong>：多元线性回归是经典 QSAR 的起点，现代 QSAR 可替换为 PLS、Random Forest、SVM、XGBoost、GNN 等",
        "<strong>描述符工程</strong>：从分子量、LogP、极性表面积、氢键供受体、拓扑指数、指纹 bit 到 3D 场描述符都可作为输入",
        "<strong>验证比拟合更重要</strong>：必须报告训练/测试划分、交叉验证、外部验证、随机化检验和适用域",
        "<strong>ADMET 基础方法</strong>：ADMETlab、admetSAR、SwissADME 等平台本质上仍是在更大数据和更强模型上的 QSAR/QSPR/QSTR 系统",
        "<strong>元信息限制</strong>：任务给定 DOI <code>10.1021/ja01193a005</code> 实际对应 Wiener 1947 年拓扑指数论文，不是 Hansch QSAR 论文；Hansch/Fujita QSAR 的代表来源是 Nature 1962 <code>10.1038/194178b0</code> 与 JACS 1964 <code>10.1021/ja01062a035</code>"
      ],
      "detail": "<h5>论文与图示来源说明</h5>\n<p>任务给定链接 <code>https://pubs.acs.org/doi/10.1021/ja01193a005</code> 指向 Harry Wiener 的 <em>Structural Determination of Paraffin Boiling Points</em>，它对后来的拓扑描述符/QSPR 很重要，但不是 Hansch QSAR 的源论文。这里保留 YAML 原样，并以 Hansch、Maloney、Fujita、Muir 1962 年 Nature 论文 <code>https://www.nature.com/articles/194178b0</code> 和 Hansch、Fujita 1964 年 JACS 论文 <code>https://pubs.acs.org/doi/10.1021/ja01062a035</code> 作为 QSAR 方法来源。原始论文图示不稳定公开，因此下图引用的是 2025 年开放综述中的 QSAR workflow，用于说明现代 QSAR 流程。</p>\n<p><img alt=\"QSAR 建模流程\" src=\"https://mdpi-res.com/applsci/applsci-15-01206/article_deploy/html/images/applsci-15-01206-g001-550.jpg\" />\n<em>图：QSAR 从化合物库和生物活性测定出发，计算化学描述符，再用化学计量学/统计模型建立活性预测方程并验证。来源：Applied Sciences 2025 开放综述。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># 经典 QSAR / Hansch analysis 简化流程\ndef build_qsar_model(molecules, activity_values):\n    # activity 通常转为 pIC50、pKi 或 log(1/C)，方向越大表示越强\n    y = transform_activity(activity_values)\n\n    # 1. 数据清洗：同一端点、同一单位、同一实验机制\n    mols = standardize_structures(molecules)\n    y = remove_inconsistent_measurements(y)\n\n    # 2. 描述符计算：Hansch 时代是 pi/sigma/Es，现代可扩展为指纹和 2D/3D 描述符\n    X = []\n    for mol in mols:\n        descriptors = {\n            &quot;logP&quot;: calc_logp(mol),\n            &quot;sigma&quot;: hammett_sigma(mol.substituent),\n            &quot;Es&quot;: steric_constant(mol.substituent),\n            &quot;tpsa&quot;: calc_tpsa(mol),\n            &quot;fingerprint&quot;: ecfp_bits(mol),\n        }\n        X.append(vectorize(descriptors))\n\n    # 3. 划分、特征选择和回归\n    X_train, X_test, y_train, y_test = scaffold_or_random_split(X, y)\n    selected = select_features(X_train, y_train)\n    model = fit_regularized_linear_regression(X_train[:, selected], y_train)\n\n    # 4. 验证和适用域\n    report_cv_q2(model, X_train[:, selected], y_train)\n    report_external_metrics(model, X_test[:, selected], y_test)\n    define_applicability_domain(X_train[:, selected])\n    return model\n</code></pre>\n<h5>从 SAR 到 QSAR：把“取代基有利/不利”变成方程</h5>\n<p>传统 SAR 更像化学家的经验表：某个取代基提高活性，另一个取代基降低活性。它能指导局部优化，但难以回答“提高多少”“是否可以外推到新取代基”“疏水性和电子效应哪个更重要”。QSAR 的核心贡献是把结构变化转成数值变量，把活性转成可回归目标。</p>\n<p>Hansch 的经典设定通常使用：</p>\n<div class=\"kb-math kb-math-display\">y = \\log\\frac{1}{C}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">C</span> 是产生指定生物效应所需的浓度，例如 <span class=\"kb-math kb-math-inline\">IC_{50}</span>、<span class=\"kb-math kb-math-inline\">ED_{50}</span> 或类似端点。取倒数再取对数后，活性越强，<span class=\"kb-math kb-math-inline\">y</span> 越大；这让模型更接近线性自由能关系，也减少不同数量级浓度带来的尺度问题。</p>\n<h5>Hansch 方程的关键变量</h5>\n<p>早期 Hansch 分析把取代基效应拆成三类：</p>\n<div class=\"kb-math kb-math-display\">\\log\\frac{1}{C}\n= a(\\log P)^2 + b\\log P + \\rho\\sigma + \\delta E_s + c</div>\n<p>或用取代基疏水常数 <span class=\"kb-math kb-math-inline\">\\pi_X</span>：</p>\n<div class=\"kb-math kb-math-display\">\\pi_X = \\log P_X - \\log P_H</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\log P</span> 或 <span class=\"kb-math kb-math-inline\">\\pi</span> 描述疏水性，<span class=\"kb-math kb-math-inline\">\\sigma</span> 是 Hammett 取代基电子常数，<span class=\"kb-math kb-math-inline\">E_s</span> 表示位阻效应，<span class=\"kb-math kb-math-inline\">a,b,\\rho,\\delta,c</span> 是回归系数。二次项 <span class=\"kb-math kb-math-inline\">a(\\log P)^2</span> 很重要：很多生物活性随疏水性先升后降，因为化合物既要进入疏水环境，也不能因过度疏水而溶解性差、扩散差或非特异结合强。</p>\n<div class=\"key-point\">💡 关键：Hansch 方程不是简单说“越疏水越好”，而是允许存在最佳疏水性窗口。</div>\n<h5>最小二乘拟合与解释</h5>\n<p>给定描述符矩阵 <span class=\"kb-math kb-math-inline\">X\\in\\mathbb{R}^{n\\times p}</span> 和活性向量 <span class=\"kb-math kb-math-inline\">y</span>，经典 QSAR 用普通最小二乘或带正则项的回归：</p>\n<div class=\"kb-math kb-math-display\">\\hat{\\beta}\n= \\arg\\min_{\\beta}\n\\|y-X\\beta\\|_2^2</div>\n<p>若存在共线性或特征数接近样本数，常加入 Ridge/Lasso：</p>\n<div class=\"kb-math kb-math-display\">\\hat{\\beta}_{\\mathrm{ridge}}\n= \\arg\\min_{\\beta}\n\\left(\n\\|y-X\\beta\\|_2^2+\\lambda\\|\\beta\\|_2^2\n\\right)</div>\n<p>在 Hansch 分析中，系数本身可解释。例如 <span class=\"kb-math kb-math-inline\">\\rho&gt;0</span> 表示吸电子取代基可能提高活性，<span class=\"kb-math kb-math-inline\">\\delta&lt;0</span> 可能表示位阻增大不利于结合或转运。现代非线性 QSAR 的预测力往往更强，但可解释性通常不如这种显式方程。</p>\n<h5>数据前提：同一端点、同一机制、同一化学空间</h5>\n<p>QSAR 最容易失败的地方不是模型，而是数据。合理的 QSAR 数据集应该尽量满足：化合物属于相近化学系列或至少覆盖明确的化学空间；活性来自同一实验体系和同一单位；活性范围足够宽；端点机制一致。如果把不同 assay、不同物种、不同读数混在一起，模型可能只学到实验批次差异。</p>\n<p>因此建模前通常要做结构标准化、盐/溶剂去除、重复测量合并、单位统一和异常值检查。现代 ADMET QSAR 还会对 SMILES 做 canonicalization，并标记离子态、互变异构体和手性。</p>\n<h5>验证、随机化检验和适用域</h5>\n<p>一个高 <span class=\"kb-math kb-math-inline\">R^2</span> 只能说明训练集拟合好，不代表能预测新分子。常见验证指标包括：</p>\n<div class=\"kb-math kb-math-display\">R^2 = 1-\\frac{\\sum_i(y_i-\\hat{y}_i)^2}{\\sum_i(y_i-\\bar{y})^2}</div>\n<div class=\"kb-math kb-math-display\">Q^2_{\\mathrm{CV}}\n= 1-\\frac{\\sum_i(y_i-\\hat{y}_{i,\\mathrm{CV}})^2}{\\sum_i(y_i-\\bar{y})^2}</div>\n<p>外部测试集上的 RMSE/MAE/<span class=\"kb-math kb-math-inline\">R^2</span> 才更接近真实泛化。还需要做 Y-scrambling：随机打乱 <span class=\"kb-math kb-math-inline\">y</span> 后重新训练，如果模型仍能给出很高分数，说明原模型可能是偶然相关。</p>\n<p>适用域用于判断新分子是否落在训练化学空间内。线性 QSAR 常用 leverage：</p>\n<div class=\"kb-math kb-math-display\">h_i = x_i^\\top (X^\\top X)^{-1}x_i</div>\n<p>若新分子 <span class=\"kb-math kb-math-inline\">h_i</span> 很高，表示它在描述符空间中远离训练样本，即使模型给出数值预测，也应降低置信度。</p>\n<h5>与现代机器学习 QSAR 的关系</h5>\n<p>现代 QSAR 不再局限于 Hansch 方程。ECFP、MACCS、分子图、3D 构象描述符可以替代 <span class=\"kb-math kb-math-inline\">\\pi,\\sigma,E_s</span>，模型也可以从 MLR 换成 Random Forest、SVM、XGBoost、深度神经网络或 GNN。但它们仍遵循同一个范式：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{Activity\\ or\\ ADMET}\n= f(\\mathrm{molecular\\ representation})</div>\n<p>区别在于，经典 QSAR 强调少量可解释描述符和小样本线性关系；现代 QSAR 更强调大规模数据、非线性模型和自动特征学习。ADMET 预测尤其适合 QSAR，因为许多端点很难通过结构生物学直接计算，只能从已有实验数据中学习结构到性质的统计映射。</p>\n<h5>局限性</h5>\n<p>QSAR 的预测边界由训练数据决定。模型可能无法处理新骨架、新机制、不同实验条件或强构象效应；描述符也可能遗漏蛋白环境、代谢路径和反应性中间体。QSAR 最适合用于早期筛选、优先级排序和提出结构优化方向，而不是单独作为候选药物安全性或有效性的最终证据。</p>",
      "quiz": {
        "q": "经典 Hansch QSAR 方程中加入 logP 的二次项，主要是为了表达什么现象？",
        "options": [
          "活性一定随分子量线性增大",
          "疏水性通常存在最佳窗口，过低或过高都可能降低活性",
          "所有电子效应都可以忽略",
          "模型不需要外部验证"
        ],
        "answer": 1,
        "explain": "二次项允许活性-疏水性关系呈抛物线，反映化合物既需要足够疏水以穿膜或结合，也不能过度疏水导致溶解性和选择性问题。"
      }
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
      "summary": "ADMETlab 3.0 将多任务 DMPNN、RDKit 2D 描述符、端点规则、API 和不确定性估计整合为在线 ADMET 评估平台，在早期药物发现中一次性预测理化性质、药物化学、ADME、毒性和毒性团规则。",
      "keyPoints": [
        "<strong>覆盖 119 个特征/端点</strong>：包括 21 个理化性质、20 个药物化学属性、34 个 ADME 端点、36 个毒性端点和 8 类 toxicophore rules",
        "<strong>数据规模升级</strong>：NAR 论文报告整合超过 400,000 条高质量数据记录，是 ADMETlab 2.0 的约 1.5 倍",
        "<strong>模型核心 DMPNN-Des</strong>：用 Directed Message Passing Neural Network 学习分子图局部信息，并拼接 RDKit 2D 描述符补充全局理化信息",
        "<strong>多任务预测体系</strong>：部署 77 个预测模型，其中 59 个分类模型、18 个回归模型；另有可直接计算的规则和描述符",
        "<strong>训练策略</strong>：训练/验证/测试按 8:1:1 划分，使用 Adam 优化、Bayesian optimization 调参，并重复随机划分训练 5 次后选择最佳模型",
        "<strong>不确定性估计</strong>：回归模型使用 evidential deep learning，分类模型使用 Monte Carlo dropout，并给出高/低置信度判断",
        "<strong>工程化 API</strong>：提供 Molecule Wash 和离线批量预测接口，可返回 119 项结果、结构 SVG、taskid 和 CSV",
        "<strong>来源限制</strong>：任务 URL <code>admetmesh.scbdd.com</code> 是 ADMETlab 2.0 域名；当前 ADMETlab 3.0 官方入口为 <code>https://admetlab3.scbdd.com/</code>，论文为 Nucleic Acids Research 2024 Web Server 文章 <code>10.1093/nar/gkae236</code>"
      ],
      "detail": "<h5>论文与图示来源说明</h5>\n<p>ADMETlab 3.0 的可访问论文是 Fu 等人在 <em>Nucleic Acids Research</em> Web Server issue 发表的 <em>ADMETlab 3.0: an updated comprehensive online ADMET prediction platform enhanced with broader coverage, improved performance, API functionality and decision support</em>，DOI 为 <code>https://doi.org/10.1093/nar/gkae236</code>。任务 YAML 的 <code>paper_url</code> 指向 ADMETlab 2.0 域名，且年份写为 2025；这里保留 YAML 原样，方法解读基于 NAR 2024 论文和当前官方站点 <code>https://admetlab3.scbdd.com/</code>。</p>\n<p><img alt=\"ADMETlab 3.0 DMPNN-Des 与端点概览\" src=\"https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/nar/52/W1/10.1093_nar_gkae236/1/m_gkae236fig1.jpeg?Expires=2147483647&amp;Key-Pair-Id=APKAIE5G5CRDK6RD3PGA&amp;Signature=TpWHLdA4mbBuC8d6eJI025c2UxdKuo7bdSWrLuKS20BXCVPPcDu1Hqc01cplV7tTMtkweUnxmH7Q8UU8tBlOy4rxsI1VClkUBeOMs8aY15NbU5hkplsiuvC72kh1GQB9-FA5JlNbCFy974gLWKI0Qvy~ObP~tX3Qf7P2-ZCHTlZT-ubIb1s3RBw7lvpV0UE~480QDgkT38EsZuT0iiVXFT5n0u0JmrSj7U4rKDG54eoe9sNe3w9vekJRVspe1w4-MoWk1nlpnG98coZt0caxA3pmciFSXYaPnUFtOV71gCOJFdcn3teyAjdnMj77wiDgFXqsGSac1WhDKgbujnF1cw__\" />\n<em>图：ADMETlab 3.0 的 DMPNN-Des 框架和 ADMET profile 覆盖范围。输入分子被转成分子图和分子描述符，DMPNN readout 与 RDKit 2D descriptors 拼接后进入多任务前馈网络。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># ADMETlab 3.0 / DMPNN-Des 简化训练与预测流程\nfor smiles, endpoint_labels in admet_dataset:\n    # 1. 分子清洗和标准化\n    mol = molecule_wash(\n        smiles,\n        neutralize_salts=True,\n        remove_counterions=True,\n        canonicalize_smiles=True,\n        normalize_tautomer_and_charge=True,\n    )\n\n    # 2. 双表示：分子图 + RDKit 2D 描述符\n    graph = mol_to_directed_bond_graph(mol)\n    desc = rdkit_2d_descriptors(mol)\n\n    # 3. DMPNN bond-centered message passing\n    bond_states = init_bond_features(graph)\n    for step in range(T):\n        bond_states = directed_message_passing(graph, bond_states)\n    graph_readout = aggregate_bond_states_to_molecule(bond_states)\n\n    # 4. DMPNN-Des 融合与多任务预测\n    embedding = concat(graph_readout, desc)\n    predictions = feed_forward_heads(embedding)  # classification + regression endpoints\n\n    # 5. 多任务损失，缺失标签用 mask 跳过\n    loss = 0\n    for task in endpoints:\n        if endpoint_labels[task] is not None:\n            if task.is_classification:\n                loss += bce(predictions[task], endpoint_labels[task])\n            else:\n                loss += mse(predictions[task], endpoint_labels[task])\n    optimize(loss)\n\n# API 预测时返回 endpoint value、规则命中、经验判定和 uncertainty/confidence\n</code></pre>\n<h5>为什么 ADMET 平台仍然是 QSAR 的延伸</h5>\n<p>ADMETlab 3.0 的目标不是模拟完整人体药代动力学，而是用已知实验数据学习“结构到性质”的映射。这与 QSAR 的基本形式一致：</p>\n<div class=\"kb-math kb-math-display\">\\hat{y}_k = f_k(\\mathrm{molecule})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">k</span> 表示某个端点，例如 Caco-2 permeability、BBB penetration、CYP inhibition、hERG blocker、AMES mutagenicity 或 hepatotoxicity。区别在于，经典 QSAR 常用少量手工描述符和线性回归，ADMETlab 3.0 用大规模端点库、多任务 DMPNN 和规则引擎，把许多 ADMET/QSPR/QSTR 模型封装成一个服务。</p>\n<h5>DMPNN-Des：局部键消息传递加全局描述符</h5>\n<p>DMPNN 的特点是沿有向键而非原子做消息传递。对有向键 <span class=\"kb-math kb-math-inline\">u\\to v</span>，初始化隐藏状态可写为：</p>\n<div class=\"kb-math kb-math-display\">h_{uv}^{(0)} = \\tau(W_i [x_u, e_{uv}])</div>\n<p>第 <span class=\"kb-math kb-math-inline\">t</span> 轮更新时，消息来自进入 <span class=\"kb-math kb-math-inline\">u</span> 的其他键，通常排除反向边 <span class=\"kb-math kb-math-inline\">v\\to u</span>，以减少短环中的信息回流：</p>\n<div class=\"kb-math kb-math-display\">m_{uv}^{(t+1)}\n= \\sum_{w\\in\\mathcal{N}(u)\\setminus\\{v\\}}\nh_{wu}^{(t)}</div>\n<div class=\"kb-math kb-math-display\">h_{uv}^{(t+1)}\n= \\tau\\left(h_{uv}^{(0)} + W_m m_{uv}^{(t+1)}\\right)</div>\n<p>最终把 bond states 聚合为分子级 readout：</p>\n<div class=\"kb-math kb-math-display\">z_{\\mathrm{graph}} = \\operatorname{Readout}(\\{h_{uv}^{(T)}\\})</div>\n<p>ADMETlab 3.0 进一步拼接 RDKit 2D descriptors：</p>\n<div class=\"kb-math kb-math-display\">z = [z_{\\mathrm{graph}}; d_{\\mathrm{RDKit}}]</div>\n<p>这就是 DMPNN-Des。直觉上，DMPNN 擅长学习局部化学环境和键连接模式，RDKit 描述符则直接提供分子量、拓扑、形状、氢键、极性等全局特征。两者互补，能在很多 ADMET 端点上比单独 DMPNN 或 ADMETlab 2.0 的 MGA 模型更稳。</p>\n<h5>多任务学习和缺失标签</h5>\n<p>ADMET 数据天然稀疏：一个分子可能有 hERG 数据，但没有 CYP2D6 抑制数据；另一个分子可能有水溶性数据，但没有肝毒性数据。多任务训练通常用 mask 只对存在标签的端点计算损失：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}\n= \\sum_{k=1}^{K} m_k\n\\left(\n\\lambda_k^{\\mathrm{cls}}\\operatorname{BCE}(y_k,\\hat{p}_k)\n+ \\lambda_k^{\\mathrm{reg}}\\operatorname{MSE}(y_k,\\hat{y}_k)\n\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">m_k=1</span> 表示第 <span class=\"kb-math kb-math-inline\">k</span> 个端点有标签，否则跳过。多任务共享主干的好处是不同 ADMET 端点之间存在结构信息迁移，例如疏水性、极性和芳香性同时影响吸收、分布和毒性。</p>\n<h5>数据收集与端点覆盖</h5>\n<p>NAR 论文说明 ADMETlab 3.0 从 ChEMBL、PubChem、OCHEM 和文献中重新收集整理数据，经过去除有机金属、混合物、盐和 counterion，统一为 canonical SMILES。最终用于建模的数据超过 400,000 条，覆盖 77 个 ADMET 相关预测端点。</p>\n<p>平台层面报告 119 个特征/端点：21 个理化性质、20 个药物化学属性、34 个 ADME 端点、36 个毒性端点和 8 类 toxicophore rules。它不是每一项都由神经网络预测，其中一部分是 RDKit/Scopy 可直接计算的规则或描述符；真正训练部署的预测模型为 77 个。</p>\n<h5>训练、调参与评估</h5>\n<p>每个端点按 8:1:1 划分训练、验证和测试集。训练使用 Adam，超参数通过 Bayesian optimization 搜索。为降低随机划分噪声，每个训练过程重复 5 次，选择表现最好的模型进入在线平台。回归任务报告：</p>\n<div class=\"kb-math kb-math-display\">R^2,\\quad \\mathrm{RMSE}=\\sqrt{\\frac{1}{N}\\sum_i(y_i-\\hat{y}_i)^2},\\quad\n\\mathrm{MAE}=\\frac{1}{N}\\sum_i |y_i-\\hat{y}_i|</div>\n<p>分类任务报告：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{AUC},\\quad \\mathrm{ACC},\\quad \\mathrm{MCC}</div>\n<p>其中 Matthews correlation coefficient 更适合类别不平衡的毒性/安全性端点：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{MCC}\n= \\frac{TP\\cdot TN-FP\\cdot FN}\n{\\sqrt{(TP+FP)(TP+FN)(TN+FP)(TN+FN)}}</div>\n<p>论文比较 DMPNN-Des、DMPNN 和 ADMETlab 2.0 的 MGA。总体上，DMPNN/DMPNN-Des 在多数分类和回归端点上超过 MGA；DMPNN-Des 通常略优于纯 DMPNN，但会带来轻微计算开销。</p>\n<h5>不确定性估计：给预测加上置信度</h5>\n<p>ADMETlab 3.0 的重要新增功能是不确定性。回归端点使用 evidential deep learning，模型不只输出 <span class=\"kb-math kb-math-inline\">\\hat{y}</span>，还输出控制预测分布的参数，用于分解 epistemic uncertainty 和 aleatoric uncertainty。简化地说：</p>\n<div class=\"kb-math kb-math-display\">p(y\\mid x) = \\int p(y\\mid \\mu,\\sigma^2)\\,p(\\mu,\\sigma^2\\mid x)\\,d\\mu d\\sigma^2</div>\n<p>epistemic uncertainty 反映模型因为训练数据不足而不确定，aleatoric uncertainty 反映端点实验噪声或内在随机性。分类端点使用 Monte Carlo dropout，多次开启 dropout 前向传播得到概率分布：</p>\n<div class=\"kb-math kb-math-display\">\\hat{p}=\\frac{1}{S}\\sum_{s=1}^{S}p_s,\\qquad\nu=\\operatorname{Var}(\\{p_s\\}_{s=1}^{S})</div>\n<p>如果不确定性超过基于 Youden index 设定的阈值，API 会把预测标为低置信度。这个机制对虚拟筛选很实用：用户不仅看到“可能有毒/无毒”，还看到模型是否在该化学空间内有把握。</p>\n<h5>API 与工程实现</h5>\n<p>ADMETlab 3.0 用 Django 构建网站，API 由 Django Ninja 实现，并加入缓存以提高重复查询效率。API 的两个核心功能是 Molecule Wash 和 Off-website Batch Prediction。前者做标准化、片段处理、离子/同位素/立体化学处理，后者支持批量返回 119 项 ADMET 相关结果。</p>\n<p>对药物发现流程而言，API 比网页表单更关键：它允许研究者把 ADMET 预测接入生成模型、虚拟筛选、主动学习或 retrosynthesis pipeline。论文表 1 报告 ADMETlab 3.0 在 1000 个分子上的计算时间约 87 秒，明显快于 SwissADME、FAF-Drugs4、pkCSM、vNN-ADMET 等网页工具，同时比 ADMETlab 2.0 只慢很少，考虑到端点数增加，这是工程上可接受的折中。</p>\n<h5>局限性</h5>\n<p>ADMETlab 3.0 的输出仍是数据驱动 QSAR 预测。对于训练集中稀缺的新型骨架、反应性分子、金属配合物、强构象依赖端点或复杂体内药代过程，模型可能给出低置信度或错误预测。它适合早期筛选和候选排序，不应替代体外实验、体内 PK/毒理实验和机制验证。</p>",
      "quiz": {
        "q": "ADMETlab 3.0 中 DMPNN-Des 相比单独 DMPNN 的主要设计意图是什么？",
        "options": [
          "只使用文本序列，不再需要分子图",
          "把 DMPNN 学到的局部分子图表示与 RDKit 2D 全局描述符拼接，提高端点预测稳健性",
          "把所有 ADMET 端点都改为无监督聚类",
          "完全取消训练数据，只依赖手写规则"
        ],
        "answer": 1,
        "explain": "DMPNN 捕捉局部键和原子环境，RDKit 2D 描述符补充分子大小、拓扑、极性等全局信息，两者互补形成 DMPNN-Des。"
      }
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
      "summary": "HelixADMET 提出一个面向 ADMET 端点的三阶段迁移学习系统，用 2000 万无标注分子自监督预训练 GNN，再通过多任务监督学习和单端点微调提升对未见分子骨架的泛化能力。任务给定的 `paper_url` 未能对应到 HelixADMET 正文；本文方法依据可访问论文 `https://arxiv.org/abs/2205.08055` 和 OUP 论文图源。",
      "keyPoints": [
        "三阶段训练框架：Stage 1 自监督预训练、Stage 2 多任务监督迁移、Stage 3 每个 ADMET 端点单独微调",
        "大规模无标注数据：从 ZINC15 drug-like 子集抽取约 2000 万分子，用于学习通用化学图表示",
        "三类自监督任务：局部子图的节点/边掩码恢复、键长/键角几何预测、ECFP/MACCS 分子指纹预测",
        "多任务监督迁移：同时训练理化/ADMET 端点和辅助生物活性任务，扩大监督信号并缓解单端点标注稀缺",
        "独立端点微调：Stage 3 复制 backbone 和 head，学习率降低 10 倍，减少多任务干扰并保留预训练知识",
        "模型骨架组合：主模型使用 LiteGEM 与 GINE+ 图神经网络，系统中也保留 Random Forest 作为传统指纹模型补充",
        "端点覆盖全面：系统提供 52 个 ADMET 相关端点，覆盖理化性质、药物化学、吸收、分布、代谢、排泄和毒性",
        "泛化提升明确：论文报告在可比端点上相对已有 ADMET 系统整体提升约 4%，三阶段框架在 scaffold split 下平均 AUC 从 0.767 提升到 0.817"
      ],
      "detail": "<h5>图示与来源</h5>\n<p><img alt=\"HelixADMET 三阶段训练框架\" src=\"https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/bioinformatics/38/13/10.1093_bioinformatics_btac342/2/m_btac342f2.jpeg?Expires=2147483647&amp;Key-Pair-Id=APKAIE5G5CRDK6RD3PGA&amp;Signature=RI7l4~mIjJ4HwaGkY8x-~Qt6YqFhqzP7qPHeHGVKnau-sWpbsh4r9AxlIoIGQ~1W85iUye5cj6UTuUynMkYjsbJ5c7g3UI-PrRvx5P6F8isSXj2Ie5PX~Qwy3grXyObOnVEPwqTX7~eoOtheq-pDOHHQs0fajQR95F7XAdw-dmZDRrV4stIoRjqnLPjZQMy1t-RsVUgiL~I4VxnTgcCa9dYJrpfUaal2eUjK-pEGEaecMhJG-BQLU9hPugzZlWDJV8U~VjixVwPIIFG14FHENW8sp2wu7moRPW~vlhJktU~JzyF2GOKJe9DtyaZwv3LJHT9lP65EsFEfVi3AOF-Wkg__\" />\n<em>图：HelixADMET 的核心框架。前两阶段共享 GNN backbone，并在自监督任务和监督任务之间迁移知识；第三阶段为每个端点复制独立模型做单任务微调。</em></p>\n<h5>核心流程伪代码</h5>\n<pre><code class=\"language-python\"># HelixADMET 三阶段训练伪代码\nbackbone = GNNBackbone(model=&quot;LiteGEM or GINE+&quot;)\n\n# Stage 1: self-supervised pretraining on about 20M unlabeled molecules\nfor graph in zinc15_unlabeled_loader:\n    h = backbone(mask_subgraph(graph))\n    loss_node_edge = CE(atom_head(h), masked_atoms) + CE(bond_head(h), masked_bonds)\n    loss_geom = CE(length_head(h), bin(bond_lengths)) + CE(angle_head(h), bin(bond_angles))\n    loss_fp = BCE(fingerprint_head(h), concat(ecfp_bits, maccs_bits))\n    optimize(backbone, loss_node_edge + loss_geom + loss_fp)\n\n# Stage 2: multitask supervised transfer with auxiliary bioactivity tasks\nfor batch in mixed_labeled_loader:\n    h = backbone(batch.graph)\n    supervised_losses = []\n    for task in batch.available_tasks:\n        pred = task_heads[task](h)\n        supervised_losses.append(task_loss(pred, batch.labels[task]))\n    ssl_loss = optional_ssl_loss(backbone, batch.graph)\n    optimize([backbone, task_heads], mean(supervised_losses) + ssl_loss)\n\n# Stage 3: endpoint-specific fine-tuning\nendpoint_models = {}\nfor endpoint in admet_endpoints:\n    model = copy(backbone)\n    head = copy(task_heads[endpoint])\n    for batch in endpoint_loader(endpoint):\n        pred = head(model(batch.graph))\n        loss = task_loss(pred, batch.label)\n        optimize([model, head], loss, lr=stage2_lr / 10)\n    endpoint_models[endpoint] = (model, head)\n</code></pre>\n<h5>关键损失函数</h5>\n<p>HelixADMET 的图表示把分子写成 <span class=\"kb-math kb-math-inline\">G=(V,E)</span>，原子为节点、化学键为边。节点/边级 SSL 先随机掩码局部子图，再恢复被隐藏的原子和键属性：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{mask}}\n= \\sum_{v \\in V_m}\\mathrm{CE}(\\hat{x}_v,x_v)\n+ \\sum_{e \\in E_m}\\mathrm{CE}(\\hat{x}_e,x_e)</div>\n<p>几何级 SSL 把 RDKit 生成的键长和键角离散成 bins，让 2D GNN 在预训练阶段吸收部分 3D 构象规律：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{geom}}\n= \\sum_{(i,j)\\in E}\\mathrm{CE}(\\hat{b}_{ij},\\mathrm{bin}(d_{ij}))\n+ \\sum_{(i,j,k)}\\mathrm{CE}(\\hat{a}_{ijk},\\mathrm{bin}(\\theta_{ijk}))</div>\n<p>图级 SSL 预测传统化学指纹，把专家定义的局部结构和官能团知识压进图表示：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{fp}}\n= \\mathrm{BCE}(\\hat{\\mathbf{f}}_{\\text{ECFP}},\\mathbf{f}_{\\text{ECFP}})\n+ \\mathrm{BCE}(\\hat{\\mathbf{f}}_{\\text{MACCS}},\\mathbf{f}_{\\text{MACCS}})</div>\n<p>监督阶段则按任务类型选择分类或回归损失。对分类端点使用二元交叉熵，对连续端点使用均方误差，并在可用任务集合 <span class=\"kb-math kb-math-inline\">\\mathcal{T}</span> 上做多任务平均：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{sup}}\n= \\frac{1}{|\\mathcal{T}|}\\sum_{t\\in\\mathcal{T}}\n\\begin{cases}\n\\mathrm{BCE}(\\hat{y}_t,y_t), &amp; t\\text{ is classification}\\\\\n\\mathrm{MSE}(\\hat{y}_t,y_t), &amp; t\\text{ is regression}\n\\end{cases}</div>\n<h5>方法机制</h5>\n<p>HelixADMET 针对的是 ADMET 预测中的两个常见问题：单个端点标注数据少，以及训练集和候选药物之间经常存在 scaffold shift。传统 QSAR 或单任务 ML 模型常能在随机划分上表现不错，但遇到训练集中没有出现过的骨架时泛化下降。HelixADMET 通过先在无标注大规模化学空间上学习，再把相关 ADMET 与生物活性任务联合训练，试图让模型在端点标注稀缺时仍拥有更稳定的分子表示。</p>\n<p>Stage 1 的三层次 SSL 设计互补。节点/边掩码类似分子图版的 BERT MLM，迫使模型从局部上下文恢复化学类型；几何预测让模型学习键长、键角等物理约束；指纹预测则把 ECFP 与 MACCS 这类人工化学知识作为软标签注入。这样做的直觉是：ADMET 端点往往由局部官能团、整体理化性质和空间构象共同决定，单一掩码任务不足以覆盖全部因素。</p>\n<p>Stage 2 的多任务监督迁移是性能提升的主要来源之一。ADMET 端点之间存在相关性，例如膜通透性、logP、P-gp 相关端点和 BBBP 都受分子极性、尺寸、氢键特征影响；CYP 抑制/底物任务也与代谢稳定性相关。共享 backbone 可以让小样本端点从数据更充足的辅助生物活性任务中借到统计强度。</p>\n<p>Stage 3 反过来拆开模型，给每个端点单独微调。这一步避免一个端点的梯度继续干扰另一个端点，尤其适合 ADMET 里标签噪声、实验协议和物种来源差异较大的任务。学习率降低 10 倍是为了在任务适配和知识保持之间取平衡，避免单端点小数据把前两阶段学到的通用表示快速冲掉。</p>\n<p>论文消融显示，完整 Stage 1+2+3 在 random split 下平均 AUC 为 0.887，而只做 Stage 3 为 0.850；在更难的 scaffold split 下，完整框架为 0.817，只做 Stage 3 为 0.767。这说明方法的价值主要不在记忆相似分子，而在提升对新骨架候选药物的稳健性。</p>\n<div class=\"key-point\">💡 关键：HelixADMET 不是单一新 GNN 层的论文，而是把大规模自监督、多任务监督迁移、端点级微调和在线系统封装到 ADMET 场景中的工程化方法。</div>",
      "quiz": {
        "q": "HelixADMET 为什么要在多任务监督训练之后再做单端点微调？",
        "options": [
          "为了把所有端点的预测头合并成一个分类器",
          "为了消除 SMILES tokenization 带来的语法歧义",
          "为了让每个端点学习任务特异信息，并降低其他端点梯度的干扰",
          "为了在推理阶段重新生成 3D 构象"
        ],
        "answer": 2,
        "explain": "Stage 2 共享 backbone 有利于迁移相关任务知识，但 ADMET 端点存在实验协议和标签分布差异。Stage 3 独立微调每个端点，并使用更低学习率保留预训练知识。"
      }
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
      "summary": "MolBERT 把 BERT encoder 用于 SMILES 分子序列，并系统比较 MaskedLM、SMILES 等价判别和 RDKit 理化描述符回归三类预训练任务，证明化学相关辅助任务能显著改善虚拟筛选和 QSAR 表征。",
      "keyPoints": [
        "BERT-Base 分子编码器：12 层、12 个注意力头、768 hidden size，约 8500 万参数，用 SMILES 字符序列学习分子 embedding",
        "三类预训练任务：MaskedLM 预测被掩码 token，SMILES-Eq 判断两条 SMILES 是否表示同一分子，PhysChemPred 回归 200 个归一化 RDKit 描述符",
        "多任务损失简单：最终损失是启用任务损失的算术平均，便于做任务组合消融",
        "SMILES permutation：训练时可使用随机非规范 SMILES，降低模型对 canonicalization 人工规则的过拟合",
        "相对位置编码：固定训练序列长度为 128，但用 relative positional embeddings 支持推理时处理更长 SMILES",
        "预训练数据：使用 GuacaMol benchmark 中约 160 万个 ChEMBL 分子，最终模型训练 100 epochs",
        "下游评估：覆盖 RDKit 虚拟筛选 benchmark 的 69 个蛋白靶点，以及 MoleculeNet/ChemBench 中 ESOL、FreeSolv、Lipophilicity、BACE、BBBP、HIV 等 QSAR 任务",
        "关键结论：PhysChemPred 是最有效的辅助任务，MaskedLM + PhysChemPred 最优；加入 SMILES-Eq 在论文实验中反而略微降低性能"
      ],
      "detail": "<h5>图示与来源</h5>\n<p><img alt=\"MolBERT 预训练任务示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2011.13230/assets/figs/molbert_schematic-crop-smaller.png\" />\n<em>图：MolBERT 的论文 Figure 1，展示从 SMILES 输入到 BERT embedding，并接入 MaskedLM、SMILES-Eq 与 PhysChemPred 三个预训练头。论文 PDF 也可从 <code>https://ml4molecules.github.io/papers2020/ML4Molecules_2020_paper_74.pdf</code> 访问。</em></p>\n<h5>算法核心流程</h5>\n<pre><code class=\"language-python\"># MolBERT 预训练与下游使用伪代码\ntokenizer = SmilesTokenizer(vocab_size=42, max_length=128)\nencoder = BertBaseEncoder(layers=12, heads=12, hidden_size=768, relative_positions=True)\n\nfor smiles in guacamol_chEMBL_loader:\n    s1 = randomize_smiles(smiles) if use_permutation else canonical_smiles(smiles)\n    tokens = tokenizer(s1)\n    masked_tokens, mask_labels = mask_15_percent(tokens)\n\n    h_seq, h_cls = encoder(masked_tokens)\n    losses = []\n\n    if use_masked_lm:\n        logits = masked_lm_head(h_seq)\n        losses.append(cross_entropy(logits[mask_positions], mask_labels))\n\n    if use_smiles_eq:\n        s2, same_label = sample_equivalent_or_random_smiles(smiles)\n        pair_repr = encode_pair(encoder, tokenizer(s1), tokenizer(s2))\n        losses.append(cross_entropy(smiles_eq_head(pair_repr), same_label))\n\n    if use_physchem_pred:\n        descriptors = normalized_rdkit_descriptors(smiles, dim=200)\n        pred = physchem_head(h_cls)\n        losses.append(mean_squared_error(pred, descriptors))\n\n    loss = mean(losses)\n    loss.backward()\n    optimizer.step()\n\n# 下游：用 pooled embedding 做相似性检索、SVM，或接线性任务头微调\nembedding = encoder(tokenizer(query_smiles)).pooled_output\n</code></pre>\n<h5>关键损失函数</h5>\n<p>MaskedLM 沿用 BERT 的 token 恢复目标。给定被掩码位置集合 <span class=\"kb-math kb-math-inline\">M</span>，模型根据双向上下文预测真实 token：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{MLM}}\n= -\\sum_{i\\in M}\\log p_\\theta(s_i\\mid s_{\\setminus M})</div>\n<p>SMILES-Eq 把两条 SMILES 拼成 pair 输入，预测它们是否表示同一分子：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{Eq}}\n= -y\\log \\hat{y}-(1-y)\\log(1-\\hat{y})</div>\n<p>PhysChemPred 是最具化学归纳偏置的任务。RDKit 为每个分子计算 <span class=\"kb-math kb-math-inline\">D=200</span> 个描述符，模型用 pooled representation 回归归一化后的描述符向量：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{PhysChem}}\n= \\frac{1}{D}\\sum_{d=1}^{D}(\\hat{z}_d-z_d)^2</div>\n<p>多任务训练时，MolBERT 不引入复杂权重，而是取启用任务集合 <span class=\"kb-math kb-math-inline\">\\mathcal{T}</span> 的平均：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{total}}\n= \\frac{1}{|\\mathcal{T}|}\\sum_{t\\in\\mathcal{T}}\\mathcal{L}_t</div>\n<h5>方法机制</h5>\n<p>MolBERT 的出发点是：SMILES 是线性字符串，但同一分子可以有多种合法 SMILES，这会让标准语言模型同时学习化学规律和遍历规则。BERT 的双向上下文适合属性预测，因为分子表征不需要像生成模型那样只能看左侧前缀；每个 token 都可以同时感知左右邻域，最后用 pooled output 或 token-level output 形成分子 embedding。</p>\n<p>MaskedLM 让模型学习 SMILES 语法和局部上下文，例如括号、环闭合、芳香原子和键符号之间的依赖。但论文发现，单靠 MLM 不一定足够化学相关，因为它可能更关注字符串恢复而不是理化性质。PhysChemPred 直接要求 embedding 含有分子量、拓扑极性表面积、氢键供受体、logP 等 RDKit 描述符信息，因此更贴近虚拟筛选和 QSAR 的需求。</p>\n<p>SMILES-Eq 的设计动机是处理表示歧义：若两条不同 SMILES 对应同一个分子，模型应学到它们 embedding 的等价性。实验结果却显示，加入 SMILES-Eq 会略微但稳定地降低虚拟筛选表现。这说明“看起来合理”的辅助任务并不一定改善下游指标；pair 分类可能让模型过度关注随机化 SMILES 的表面差异，或与 PhysChem/MLM 目标产生梯度冲突。</p>\n<p>论文消融表明，PhysChemPred 单独带来的平均 BEDROC20 高于 MLM 单独；MaskedLM + PhysChemPred 是最佳组合之一，最终 100 epoch 的 MolBERT 在 RDKit 虚拟筛选 benchmark 上达到 AUROC 0.743、BEDROC20 0.344，超过 CDDD、RDKit descriptors 和 ECFC4。QSAR 中，接线性任务头微调的 MolBERT 在六个 MoleculeNet/ChemBench 数据集上均达到该表中的最佳表现。</p>\n<p>与手工指纹相比，MolBERT 的优势是可从上下文中学习连续表征，并能通过下游微调适配任务；与图神经网络相比，它避免了显式图消息传递，直接利用成熟 NLP Transformer 工具链。不过它仍依赖 SMILES 文本表示，不直接建模 3D 构象和反应条件，因此更适合作为快速分子表征基础模型，而不是完整药物设计系统。</p>\n<div class=\"key-point\">💡 关键：MolBERT 的核心贡献不是“把 BERT 套到 SMILES”本身，而是证明预训练任务选择会强烈影响分子 embedding 质量，尤其是化学描述符回归比纯文本 MLM 更能服务虚拟筛选。</div>",
      "quiz": {
        "q": "MolBERT 论文中最能提升虚拟筛选表现的辅助预训练信号是什么？",
        "options": [
          "只使用 MaskedLM 恢复被掩码 SMILES token",
          "使用 PhysChemPred 回归 RDKit 计算的理化描述符，并与 MaskedLM 组合",
          "把 BERT encoder 改成自回归 decoder",
          "在推理时枚举所有可能 SMILES 并投票"
        ],
        "answer": 1,
        "explain": "消融实验显示 PhysChemPred 对 BEDROC20 等虚拟筛选指标贡献最大，MaskedLM + PhysChemPred 是表现最好的组合之一；SMILES-Eq 在该实验中反而略降性能。"
      }
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
      "summary": "ChemBERTa 基于 RoBERTa/HuggingFace 在大规模 PubChem SMILES 上进行 masked language modeling 预训练，并系统评估预训练数据规模、tokenizer、SMILES/SELFIES 表示和注意力可视化对分子性质预测的影响。",
      "keyPoints": [
        "RoBERTa 分子编码器：使用 HuggingFace RoBERTa 实现，6 层、12 个注意力头，共 72 个 attention mechanisms",
        "大规模无标注语料：整理 7700 万条 PubChem unique SMILES，并以 100K、250K、1M、10M 子集研究数据规模效应",
        "MLM 预训练目标：随机掩码 15% token，用上下文恢复被掩码 token，学习化学字符串的上下文表示",
        "下游任务：在 MoleculeNet 的 BBBP、ClinTox、HIV、Tox21 等分类任务上微调，采用 scaffold split 和 ROC-AUC/PRC-AUC 指标",
        "Tokenizer 对比：默认使用 HuggingFace BPE，也比较 DeepChem 的 regex-based SmilesTokenizer",
        "表示对比：比较 SMILES 与 SELFIES，论文在 Tox21 SR-p53 上未观察到显著差异",
        "可解释性探索：使用 BertViz 分析注意力，发现部分 head 会关注官能团、芳香环、括号闭合等化学/语法结构",
        "实验结论克制：ChemBERTa 在部分任务接近但未全面超过 D-MPNN/RF/SVM 基线，主要贡献是证明 Transformer 预训练可扩展且具有研究价值"
      ],
      "detail": "<h5>图示与来源</h5>\n<p><img alt=\"ChemBERTa 预训练规模效果\" src=\"https://ar5iv.labs.arxiv.org/html/2010.09885/assets/img/scaling_2.png\" />\n<em>图：论文 Figure 1 显示从 100K 扩展到 10M PubChem SMILES 预训练数据时，BBBP、ClinTox 和 Tox21 的下游 AUC 改善趋势。</em></p>\n<p><img alt=\"ChemBERTa 注意力可视化\" src=\"https://ar5iv.labs.arxiv.org/html/2010.09885/assets/img/ketone_head_crop.png\" />\n<em>图：论文 Figure 2 的 ChemBERTa SMILES attention 示例，展示模型可在 token 层面关注羰基、括号等结构线索。</em></p>\n<h5>算法核心流程</h5>\n<pre><code class=\"language-python\"># ChemBERTa 预训练和微调伪代码\npubchem = load_unique_pubchem_smiles(total=77_000_000)\nsubsets = [100_000, 250_000, 1_000_000, 10_000_000]\n\nfor n in subsets:\n    train_smiles = sample_and_shuffle(pubchem, n)\n    tokenizer = train_or_load_tokenizer(type=&quot;BPE or SmilesTokenizer&quot;, vocab_size=52_000)\n    model = RoBERTaEncoder(num_layers=6, num_attention_heads=12, max_length=512)\n\n    for epoch in range(num_epochs(n)):\n        for smiles in batch(train_smiles):\n            tokens = tokenizer(smiles, max_length=512)\n            masked_tokens, labels = mask_15_percent(tokens)\n            logits = model(masked_tokens)\n            loss = cross_entropy(logits[mask_positions], labels[mask_positions])\n            loss.backward()\n            optimizer.step()\n\n    for task in [&quot;BBBP&quot;, &quot;ClinTox&quot;, &quot;HIV&quot;, &quot;Tox21&quot;]:\n        train, valid, test = scaffold_split(load_moleculenet(task), ratios=(0.8, 0.1, 0.1))\n        classifier = LinearHead(model.hidden_size, task.num_labels)\n        finetune(model, classifier, train, valid, early_stop_metric=&quot;ROC-AUC&quot;, max_epochs=25)\n        report_auc(model, classifier, test)\n</code></pre>\n<h5>关键损失函数</h5>\n<p>ChemBERTa 将分子表示为 token 序列 <span class=\"kb-math kb-math-inline\">x=(s_1,\\ldots,s_n)</span>。MLM 随机选择约 15% 的位置 <span class=\"kb-math kb-math-inline\">M</span>，让 RoBERTa encoder 根据双向上下文恢复原 token：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{MLM}}(\\theta)\n= -\\sum_{x\\in\\mathcal{D}}\\sum_{i\\in M(x)}\n\\log p_\\theta(s_i \\mid x_{\\setminus M})</div>\n<p>下游分类任务在 <code>[CLS]</code> 或 pooled representation <span class=\"kb-math kb-math-inline\">h_x</span> 上接线性分类器：</p>\n<div class=\"kb-math kb-math-display\">\\hat{y}=\\sigma(W h_x+b)</div>\n<p>二分类端点使用交叉熵微调：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{task}}\n= -y\\log\\hat{y}-(1-y)\\log(1-\\hat{y})</div>\n<h5>方法机制</h5>\n<p>ChemBERTa 的核心问题是：在分子性质预测中，能否像 NLP 一样先用海量无标注文本预训练 Transformer，再用少量标注数据微调？分子领域的标注实验昂贵，但 SMILES 字符串很容易从 PubChem 这类数据库中获得，因此 MLM 预训练是利用无标注化学结构的一条低门槛路径。</p>\n<p>与 MolBERT 更强调化学辅助任务不同，ChemBERTa 首版主要采用 RoBERTa 式 MLM，并把重点放在规模和工具链上。模型使用 6 层、12 头的 encoder，预训练输入最大长度 512，默认 BPE tokenizer 的最大词表为 52K。论文发布多个预训练模型到 HuggingFace model hub，也提供 DeepChem 教程，让研究者可以直接加载模型、做 masked prediction、可视化 attention 和微调 Tox21。</p>\n<p>预训练规模实验是 ChemBERTa 的关键证据。论文将 PubChem SMILES 划分成 100K、250K、1M、10M 子集，观察到更大预训练集通常带来更好的下游平均 AUC。10M 子集训练约 3 epochs，以避免过拟合；论文同时声明 77M 全量数据集公开，但首版实验没有完整训练全部 77M。</p>\n<p>Tokenizer 和分子字符串表示也是论文关心的问题。BPE 能把常见字符片段合并成子词，适合复用 NLP 基础设施；SmilesTokenizer 则用化学正则规则保留更明确的 SMILES token。论文在 PubChem-1M/Tox21 SR-p53 对比中发现 SmilesTokenizer 略优，但证据不足以得出普遍结论。SELFIES 理论上能保证生成有效分子，但在该属性预测实验里相对 SMILES 没有显著优势。</p>\n<p>ChemBERTa 的可解释性分析表明，某些注意力头会聚焦羰基、芳香环、括号闭合等结构线索。这不能证明模型已经拥有完整化学理解，但说明 SMILES 上的 Transformer attention 可以捕捉部分化学相关模式。对属性预测而言，这类 token-level 可视化比传统指纹更容易调试。</p>\n<p>局限也很明确：论文表 1 中，ChemBERTa 10M 在 BBBP、ClinTox、HIV 上未全面超过 D-MPNN、RF、SVM 等强基线，只在 Tox21 的 ROC-AUC 上有竞争力。首版 ChemBERTa 更像一个可扩展分子 Transformer baseline，而不是最终性能最强的药物发现模型；其后 ChemBERTa-2 才进一步引入多任务回归等更化学化的预训练目标。</p>\n<div class=\"key-point\">💡 关键：ChemBERTa 的价值在于把分子性质预测接入成熟 Transformer 预训练范式，并给出数据规模、tokenizer、表示和可解释性的一套系统基线。</div>",
      "quiz": {
        "q": "ChemBERTa 首版论文中，扩大 PubChem 预训练数据规模的主要观察是什么？",
        "options": [
          "数据越多，模型参数必须同步减少",
          "从 100K 扩展到 10M SMILES 通常改善 BBBP、ClinTox 和 Tox21 的下游 AUC",
          "SELFIES 在所有 MoleculeNet 任务上显著优于 SMILES",
          "无需微调即可直接超过所有 D-MPNN、RF 和 SVM 基线"
        ],
        "answer": 1,
        "explain": "论文 Figure 1 展示更大 PubChem 预训练子集带来更好的平均下游 AUC，但首版 ChemBERTa 并未全面超过所有传统和图神经网络基线。"
      }
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
      "summary": "Uni-Mol 提出首个面向药物设计的纯 3D 分子预训练框架，用同一类 3D Transformer 预训练分子模型和蛋白口袋模型，解决了传统 1D SMILES/2D 图模型难以直接输入和输出三维几何的问题。它把 3D 坐标恢复、掩码原子预测和下游 3D 任务统一到一个可微的表示学习框架中。",
      "keyPoints": [
        "<strong>双预训练模型</strong>：分子模型使用 209M 个分子 3D 构象预训练，口袋模型使用约 3M 个候选蛋白口袋预训练",
        "<strong>纯 3D 输入/输出</strong>：原子类型和三维坐标同时作为输入，模型通过 SE(3)-equivariant 坐标头直接输出更新后的 3D 坐标",
        "<strong>全连接 Transformer 骨架</strong>：不用局部半径图，而是让所有原子两两注意力交互以捕捉长程空间相互作用",
        "<strong>pair representation</strong>：用原子对欧氏距离和 pair-type aware Gaussian kernel 初始化原子对表示，并把它作为 attention bias 注入原子表示",
        "<strong>双向通信机制</strong>：atom-to-pair 用注意力中的 <span class=\"kb-math kb-math-inline\">QK^\\top</span> 更新 pair 表示，pair-to-atom 用 pair 表示影响 self-attention 权重",
        "<strong>两类核心预训练任务</strong>：Masked Atom Prediction 预测被遮蔽原子类型，3D Position Recovery 从加噪坐标恢复真实构象",
        "<strong>多下游适配</strong>：可用于分子性质预测、口袋性质预测、蛋白-配体结合姿态预测和分子构象生成",
        "<strong>实验覆盖广</strong>：论文报告在 MoleculeNet 14/15 个性质预测任务超过当时 SOTA，并在结合姿态和构象生成等 3D 任务上表现突出",
        "<strong>工程取舍明确</strong>：用近似标准 Transformer 的高效骨架实现 3D 建模，相比完整 SE(3)-Transformer 显著降低预训练成本"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"Uni-Mol 框架图\" src=\"https://github.com/deepmodeling/Uni-Mol/raw/main/unimol/figure/overview.png\" />\n<em>图：Uni-Mol 官方仓库中的框架示意。左侧是 209M 分子构象和 3M 候选口袋的预训练数据，中间是 3D Position Recovery 与 Masked Atom Prediction，右侧展示性质预测、构象生成、口袋性质预测和蛋白-配体复合物预测等下游任务。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Uni-Mol 预训练核心流程\nfor batch in pretraining_loader:\n    atom_type, coord, pair_type = batch.atom_type, batch.coord, batch.pair_type\n\n    # 1. 随机选原子，遮蔽原子类型并扰动坐标\n    masked = sample_mask(atom_type)\n    noisy_atom_type = bert_style_mask(atom_type, masked)\n    noisy_coord = coord.clone()\n    noisy_coord[masked] = coord[masked] + uniform_noise(radius=1.0)  # paper final setting\n\n    # 2. 用 pairwise distance 初始化 pair representation\n    dist = pairwise_euclidean_distance(noisy_coord)\n    pair_repr = gaussian_kernel(dist, pair_type)\n    atom_repr = atom_embedding(noisy_atom_type)\n\n    # 3. Transformer 中 pair-to-atom 与 atom-to-pair 交替通信\n    for layer in unimol_layers:\n        atom_repr, pair_repr = layer(atom_repr, pair_repr)\n\n    # 4. 多头预训练目标\n    atom_logits = atom_type_head(atom_repr[masked])\n    pred_coord = coord_head(atom_repr, pair_repr, noisy_coord)\n    pred_dist = pair_distance_head(pair_repr)\n\n    loss_atom = cross_entropy(atom_logits, atom_type[masked])\n    loss_coord = smooth_l1(pred_coord[masked], coord[masked])\n    loss_dist = smooth_l1(pred_dist, pairwise_euclidean_distance(coord))\n    loss_norm = representation_norm_regularizer(atom_repr, pair_repr)\n\n    loss = loss_atom + loss_coord + loss_dist + 0.01 * loss_norm\n    optimizer.step(loss)\n</code></pre>\n<h5>为什么需要纯 3D 预训练</h5>\n<p>传统分子表示学习通常把分子转成 SMILES 序列或 2D 分子图。SMILES 模型能利用 NLP 工具链，但同一分子有多种字符串写法，而且三维构象、口袋形状和配体姿态不是字符串中的显式变量。2D 图模型保留了拓扑关系，却通常只在局部邻接图上传播消息，长程空间作用和构象变化仍然需要额外特征或后处理。Uni-Mol 的目标是把三维坐标变成模型的一等公民：预训练时输入 3D 坐标，训练目标也要求恢复 3D 坐标，因此下游 3D 任务不再只是把几何当辅助标签。</p>\n<p>Uni-Mol 为分子和口袋分别训练两个同构模型。分子模型学习小分子构象空间，口袋模型学习蛋白结合位点的局部 3D 环境；二者可以独立用于性质预测，也可以在蛋白-配体任务中组合使用。这个设计避免把口袋和配体强行塞进同一数据分布，同时保留了统一的 3D backbone 与微调接口。</p>\n<h5>Backbone：用 pair representation 让 Transformer 看见三维空间</h5>\n<p>普通 Transformer 对输入 token 的排列不敏感，必须依赖 positional encoding 才能区分位置。3D 坐标不能直接用 NLP 中的离散位置编码，因为模型需要对全局平移和旋转不敏感。Uni-Mol 使用任意两原子 <span class=\"kb-math kb-math-inline\">i,j</span> 的欧氏距离 <span class=\"kb-math kb-math-inline\">d_{ij}=\\|\\mathbf{x}_i-\\mathbf{x}_j\\|_2</span>，再经过与原子对类型相关的 Gaussian kernel 得到 pair representation：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{q}^{0}_{ij}=\\mathrm{GaussianKernel}(d_{ij}, t_{ij})</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">t_{ij}</span> 表示原子对类型。由于距离在全局旋转和平移下不变，pair representation 能稳定描述 3D 空间关系。模型在每层同时维护 atom representation 和 pair representation，并让二者交互：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{q}^{l+1}_{ij}\n=\\mathbf{q}^{l}_{ij}\n+\\left\\{\\frac{\\mathbf{Q}^{l,h}_{i}(\\mathbf{K}^{l,h}_{j})^\\top}{\\sqrt d}\\mid h\\in[1,H]\\right\\}</div>\n<div class=\"kb-math kb-math-display\">\\mathrm{Attention}^{l,h}_{ij}\n=\\mathrm{softmax}\\left(\n\\frac{\\mathbf{Q}^{l,h}_{i}(\\mathbf{K}^{l,h}_{j})^\\top}{\\sqrt d}\n+q^{l-1,h}_{ij}\n\\right)\\mathbf{V}^{l,h}_{j}</div>\n<p>第一式是 atom-to-pair：注意力中的 query-key 相似度反过来更新原子对表示。第二式是 pair-to-atom：pair 表示作为 attention bias，让原子更新时显式感知 3D 距离关系。这样做比完整 SE(3)-Transformer 轻量得多，但仍能让注意力权重学习与距离矩阵和长程相互作用相关的模式。</p>\n<h5>坐标头：从 invariant 表示恢复 equivariant 坐标</h5>\n<p>pair representation 本身对全局旋转和平移不变，但坐标输出必须随输入坐标一起旋转和平移。Uni-Mol 用相对坐标向量 <span class=\"kb-math kb-math-inline\">\\mathbf{x}_i-\\mathbf{x}_j</span> 作为方向基，再用 pair representation 产生标量权重：</p>\n<div class=\"kb-math kb-math-display\">\\hat{\\mathbf{x}}_i\n=\\mathbf{x}_i+\\frac{1}{n}\\sum_{j=1}^{n}(\\mathbf{x}_i-\\mathbf{x}_j)c_{ij}</div>\n<div class=\"kb-math kb-math-display\">c_{ij}=\\mathrm{ReLU}(\\mathrm{Linear}(\\mathbf{q}^{L}_{ij}))</div>\n<p>直觉上，模型不是凭空输出一个绝对坐标，而是学习“每个邻居应该把当前原子往哪个相对方向推多少”。如果输入整体旋转，所有 <span class=\"kb-math kb-math-inline\">\\mathbf{x}_i-\\mathbf{x}_j</span> 同步旋转，输出也会同步旋转；如果输入整体平移，相对向量不变，输出会保持同样平移。这就是坐标头的 SE(3)-equivariant 性质。</p>\n<h5>预训练任务与损失</h5>\n<p>预训练阶段先随机污染分子或口袋：一部分原子类型被 mask，部分坐标被加噪。论文最终采用半径约 <span class=\"kb-math kb-math-inline\">1</span> Å 的坐标扰动设置。模型需要同时完成三个恢复目标：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\mathrm{atom}}\n=-\\sum_{i\\in\\mathcal{M}}\\log p_\\theta(a_i\\mid \\tilde{\\mathbf{a}},\\tilde{\\mathbf{x}})</div>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\mathrm{coord}}\n=\\sum_{i\\in\\mathcal{M}}\\mathrm{SmoothL1}(\\hat{\\mathbf{x}}_i,\\mathbf{x}_i)</div>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\mathrm{dist}}\n=\\sum_{i,j}\\mathrm{SmoothL1}(\\hat d_{ij},\\|\\mathbf{x}_i-\\mathbf{x}_j\\|_2)</div>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}\n=\\mathcal{L}_{\\mathrm{atom}}\n+\\mathcal{L}_{\\mathrm{coord}}\n+\\mathcal{L}_{\\mathrm{dist}}\n+\\lambda\\mathcal{L}_{\\mathrm{norm}}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{M}</span> 是被 mask 的原子集合，<span class=\"kb-math kb-math-inline\">\\mathcal{L}_{\\mathrm{norm}}</span> 是稳定混合精度训练的表示范数正则。Masked Atom Prediction 迫使模型从上下文识别化学局部结构，3D Position Recovery 迫使模型学习构象空间中的几何约束，Pair-distance Head 则补充了全局距离矩阵监督。</p>\n<h5>微调到性质、构象和 docking</h5>\n<p>对于非 3D 输出任务，例如分子性质、口袋可成药性或结合亲和力，Uni-Mol 使用 <code>[CLS]</code> 表示或原子表示平均池化，再接线性头微调。对于蛋白-配体结合任务，分子模型和口袋模型先分别编码配体与口袋，再把表示输入额外的 Uni-Mol decoder 预测配体重原子与口袋重原子之间的 pair-distance matrix；推理时可把预测距离矩阵当作 scoring function，通过反向传播直接优化配体坐标。</p>\n<p>这与传统 docking 工具的区别在于，Uni-Mol 学到的是数据驱动的口袋-配体空间兼容性，而不是完全依赖手工势能项和采样规则。论文也承认其 ligand conformation 物理约束还不如成熟 docking 工具完备，因此更适合把 Uni-Mol 的结合位置预测能力与物理/化学感知的构象采样结合使用。</p>\n<div class=\"key-point\">💡 关键：Uni-Mol 的核心不是“给 2D 图加一点 3D 特征”，而是让预训练目标本身要求模型从污染坐标中恢复三维分子结构，因此它能自然迁移到构象生成和结合姿态预测这类 3D 输出任务。</div>",
      "quiz": {
        "q": "Uni-Mol 为什么要维护 pair representation，并把它加入 self-attention？",
        "options": [
          "为了把 SMILES token 转换成 SELFIES token",
          "为了用旋转/平移不变的原子对距离信息影响原子注意力，同时保留全连接长程相互作用",
          "为了让模型只关注共价键相邻原子，降低到局部图卷积",
          "为了在预训练时跳过坐标恢复任务"
        ],
        "answer": 1,
        "explain": "pair representation 由原子对距离等 3D 信息初始化，对全局旋转和平移不变；它作为 attention bias 注入 Transformer，使原子更新能显式利用三维空间关系。"
      }
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
      "summary": "ChemBERTa-3 不是单一模型结构，而是一个集成 DeepChem、Ray、Hugging Face 和 MoleculeNet 的开源训练/微调/评测框架，解决化学基础模型难以复现、难以公平 benchmark、难以扩展到大规模预训练的问题。它用统一流水线训练并发布 c3-MoLFormer、ChemBERTa 等模型，强调开放权重、配置、数据拆分和部署流程。",
      "keyPoints": [
        "<strong>框架贡献为主</strong>：提供可复现的预训练、微调和 MoleculeNet benchmark 基础设施，而非只报告一个新网络",
        "<strong>DeepChem 集成</strong>：新增 ModularTorchModel，用模块化方式组合 tokenizer/featurizer、encoder、pretraining head 和 finetuning head",
        "<strong>分布式训练</strong>：用 Ray Dataset 与 Ray Train/Distributed Data Parallel 支持多 GPU、多节点数据并行训练",
        "<strong>模型覆盖面广</strong>：统一评测 RF、GCN、D-MPNN、InfoGraph、InfoMax3D、GROVER、ChemBERTa、MoLFormer 等架构",
        "<strong>预训练数据</strong>：框架围绕 ZINC20、PubChem 等大规模 SMILES 数据构建预训练集，微调使用 MoleculeNet 任务",
        "<strong>开放模型</strong>：官方仓库展示释放 c3-MoLFormer-1.1B、c3-MoLFormer-550M、c3-MoLFormer-100M 和 ChemBERTa-100M 等检查点",
        "<strong>标准化 scaffold split</strong>：指出 MoLFormer 既有论文的 scaffold split 与 DeepChem/MoleculeNet 实现不完全等价，导致历史横向比较存在偏差",
        "<strong>可迁移部署</strong>：论文在 AWS Ray 部署和本地 HPC 集群上测试训练，验证同一框架可跨云端和超算环境复现",
        "<strong>工程经验沉淀</strong>：讨论训练不稳定、超参搜索、数据加载、spot instance checkpoint 等实际构建化学基础模型时的关键细节"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"ChemBERTa-3 框架图\" src=\"https://github.com/deepforestsci/chemberta3/raw/main/results/images/Overview_chemberta3.png\" />\n<em>图：ChemBERTa-3 官方仓库中的框架总览。上方是预训练与微调数据，中间是 DeepChem 扩展和 Ray 分布式训练，右侧是 benchmark 统计发现与开放模型发布。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># ChemBERTa-3 训练与评测流水线伪代码\ndef chemberta3_pipeline(config):\n    # 1. 构建预训练数据\n    smiles = load_smiles_sources([&quot;ZINC20&quot;, &quot;PubChem&quot;])\n    ray_dataset = RayDeepChemDataset(smiles)\n    tokens_or_graphs = ray_dataset.map_batches(config.featurizer_or_tokenizer)\n\n    # 2. 选择模型与预训练目标\n    model = ModularTorchModel(\n        encoder=config.encoder,              # ChemBERTa / MoLFormer / GROVER / InfoGraph ...\n        pretraining_head=config.pretrain_head,\n        finetuning_head=None,\n    )\n\n    # 3. Ray + DDP 预训练\n    for batch in distributed_iterbatches(tokens_or_graphs):\n        outputs = model(batch)\n        loss = pretraining_loss(outputs, batch, objective=config.objective)\n        loss.backward()\n        ddp_allreduce_gradients(model)\n        optimizer.step()\n        checkpoint_if_needed(model)\n\n    # 4. 标准化 MoleculeNet 微调\n    results = {}\n    for task in moleculenet_tasks:\n        train, valid, test = deepchem_scaffold_split(task)\n        best = grid_search_finetune(\n            pretrained_model=model,\n            train=train,\n            valid=valid,\n            lr=[1e-4, 3e-5, 1e-6],\n            batch_size=[16, 32, 64, 128],\n            epochs=[50, 100, 150, 200, 500],\n        )\n        results[task.name] = evaluate(best, test, metric=task.metric)\n\n    return results\n</code></pre>\n<h5>从 ChemBERTa 到 ChemBERTa-3：任务从“训练一个模型”变成“复现整个生态”</h5>\n<p>ChemBERTa 和 ChemBERTa-2 的核心问题是：能否把 SMILES 当作化学语言，用 RoBERTa/BERT 风格的编码器通过 MLM 或 MTR 预训练，再迁移到 MoleculeNet 性质预测。ChemBERTa-3 的问题更工程化：当领域进入大模型阶段，单篇论文给出一个分数已经不够，社区需要可复现的数据处理、预训练脚本、微调拆分、超参搜索、分布式部署和可下载权重。</p>\n<p>因此 ChemBERTa-3 的主要贡献是框架化。论文正式发表在 RSC Digital Discovery；任务 YAML 中的 <code>paper_url</code> 指向早期 ChemBERTa 原始仓库，本文实际追溯使用了 ChemBERTa-3 官方仓库、RSC 论文页和 ChemRxiv 论文全文。这个来源差异很重要，因为 ChemBERTa-3 的方法重点已从“BERT loves chemistry”扩展为“开源化学基础模型训练基建”。</p>\n<h5>ModularTorchModel：把预训练和微调拆成可组合模块</h5>\n<p>传统 DeepChem <code>TorchModel</code> 更适合端到端监督任务，loss 通常从最终输出计算。ChemBERTa-3 引入 <code>ModularTorchModel</code>，允许从模型中间值计算 loss，因此同一个 encoder 可以挂不同的预训练头和微调头。例如 ChemBERTa/MoLFormer 使用 SMILES tokenizer 和 MLM head；InfoGraph 用图级与子结构表示的互信息目标；InfoMax3D 需要 2D 图和 3D 构象之间的互信息目标；GROVER 则使用图 transformer 的自监督消息传递任务。</p>\n<p>对于 MLM，给定 SMILES token 序列 <span class=\"kb-math kb-math-inline\">\\mathbf{x}</span> 和 mask 集合 <span class=\"kb-math kb-math-inline\">\\mathcal{M}</span>，预训练目标是：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\mathrm{MLM}}\n=-\\sum_{t\\in\\mathcal{M}}\\log p_\\theta(x_t\\mid \\mathbf{x}_{\\setminus\\mathcal{M}})</div>\n<p>对于多任务回归类化学描述符目标，可以写成：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\mathrm{MTR}}\n=\\frac{1}{K}\\sum_{k=1}^{K}(\\hat y_k-y_k)^2</div>\n<p>对于二分类或多标签 MoleculeNet 下游任务，微调 head 常用 BCE；对于回归任务使用 MSE/RMSE 选择模型：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\mathrm{BCE}}\n=-\\frac{1}{K}\\sum_{k=1}^{K}\n\\left[y_k\\log \\hat y_k+(1-y_k)\\log(1-\\hat y_k)\\right]</div>\n<div class=\"key-point\">💡 关键：ChemBERTa-3 的“算法”更像一套标准化训练协议。它让不同模型在同一数据拆分、同一 DeepChem API 和同一微调流程中比较，从而减少论文间 benchmark 不一致导致的假优势。</div>\n<h5>Ray + DeepChem：面向十亿级分子数据的训练流</h5>\n<p>ChemBERTa-3 把 Ray Dataset 包装成 DeepChem Dataset 的子类，使大规模 SMILES 数据可以继续使用 DeepChem 的 featurizer、<code>iterbatches()</code> 和模型 API。数据可以被分块 featurize 并保存为 NPZ，再由 Ray workers 并行读取。训练时，每个 DDP 进程持有一份模型副本，独立前向和反向传播；反向传播触发梯度同步后，各副本执行一致的参数更新：</p>\n<div class=\"kb-math kb-math-display\">\\nabla_\\theta\n=\\frac{1}{W}\\sum_{w=1}^{W}\\nabla_\\theta^{(w)}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">W</span> 是 worker 数。这个设计的直接收益是：同一份训练脚本能在 AWS spot instances 上运行，也能在本地 HPC 集群运行。论文报告本地 HPC 使用多节点多 GPU 环境做了重复训练，用于评估训练方差；AWS 侧则强调频繁 checkpoint 以对冲 spot instance 被回收的风险。</p>\n<h5>Benchmark：公平拆分比模型名字更重要</h5>\n<p>ChemBERTa-3 反复强调 scaffold split。分子性质预测中，随机拆分会让训练集和测试集共享相似骨架，容易高估泛化；scaffold split 按 Bemis-Murcko 骨架拆分，更接近药物发现中“新骨架外推”的难度。论文指出，既有 MoLFormer 结果与 ChemBERTa/ChemBERTa-2 的比较中，scaffold split 实现并不完全一致，因此历史分数不能直接横向相减。</p>\n<p>框架的微调流程使用 MoleculeNet 任务，常见分类任务包括 BACE、BBBP、Tox21、HIV、SIDER、ClinTox，回归任务包括 ESOL、FreeSolv、Lipo 等。论文附录列出超参搜索空间，例如学习率、batch size 和 epoch 数，并用验证集选择最优模型。对 c3-MoLFormer，论文表格报告了 BBBP 约 0.900 ROC-AUC、Tox21 约 0.830 ROC-AUC、ESOL 约 0.651 RMSE、Lipo 约 0.556 RMSE 等代表性结果；这些结果的意义在于展示框架可训练和可复现，而不是宣称所有任务都绝对压倒图模型。</p>\n<h5>与传统化学模型开发方式的区别</h5>\n<p>传统分子机器学习项目常把数据准备、模型定义、训练脚本、评测脚本和拆分逻辑写成项目私有代码，导致论文复现者很难判断性能差异来自模型、数据清洗、拆分还是调参。ChemBERTa-3 把这些易错环节显式纳入框架，并发布权重、配置和部署工作流，使研究者可以替换其中一个模块，例如换 tokenizer、换 encoder 或换预训练目标，而其他部分保持不变。</p>\n<p>这种设计也给出了一个实际判断：小规模时，图模型和 Transformer 都能达到有竞争力的分数；但当数据和训练规模扩大，SMILES Transformer 在工程上更容易扩展。论文没有否认图模型的化学归纳偏置，而是指出图预训练若要追上大规模语言模型式训练，也需要同等成熟的分布式和 benchmark 基础设施。</p>",
      "quiz": {
        "q": "ChemBERTa-3 最核心的贡献是什么？",
        "options": [
          "提出一种新的化学键类型编码，替代所有图神经网络",
          "提供统一开源的化学基础模型预训练、微调、分布式训练和标准化 benchmark 框架",
          "证明随机拆分一定比 scaffold split 更适合药物发现",
          "只发布一个闭源的 MoLFormer 权重"
        ],
        "answer": 1,
        "explain": "ChemBERTa-3 的重点是可复现基础设施：DeepChem 模块化模型、Ray 分布式训练、MoleculeNet 标准化评测和开放模型/配置，而不是单个新网络结构。"
      }
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
      "summary": "MolDeBERTa 提出基于 DeBERTaV2 的 SMILES 分子编码器，用 byte-level BPE 和 123M PubChem 分子进行大规模预训练，并用分子描述符、Morgan 指纹和对比学习目标把理化性质与子结构相似性直接注入表示空间。它针对 MLM 只学习 token 上下文、不显式对齐化学性质的问题，给出了一组 chemistry-informed 的自监督目标。",
      "keyPoints": [
        "<strong>现代 encoder 骨架</strong>：从 BERT/RoBERTa 系列升级到 DeBERTaV2，利用 disentangled attention 和更强的 encoder 表示能力",
        "<strong>byte-level BPE tokenizer</strong>：在 SMILES 字符串上训练 BPE，减少纯字符 tokenization 的序列长度和稀疏组合问题",
        "<strong>大规模 PubChem 预训练</strong>：系统比较 10M 与 123M SMILES 数据规模，是公开 SMILES encoder 中较大的预训练语料之一",
        "<strong>三种模型规模</strong>：tiny、small、base 三档架构，论文比较模型容量与预训练目标的交互影响",
        "<strong>五类预训练目标</strong>：MLM、MTR、MLC、contrastive MTR、contrastive MLC，其中 MLC 和两个 contrastive 目标强调子结构/性质归纳偏置",
        "<strong>MTR 目标</strong>：预测由 SMILES 确定性计算的分子理化描述符，让 <code>[CLS]</code> 表示靠近物性空间",
        "<strong>MLC 目标</strong>：预测 2048 维 Morgan fingerprint，显式学习半径 2 子结构是否存在",
        "<strong>对比学习目标</strong>：把同一分子的 SMILES 表示与描述符/指纹派生表示拉近，把不同分子的表示拉远",
        "<strong>MoleculeNet 验证</strong>：在 9 个下游任务上评估，官方摘要称整体 4/9 任务最佳，并在 7/9 任务超过 SMILES-based encoder",
        "<strong>可解释性分析</strong>：用梯度归因分析 ibuprofen 在 Delaney 溶解度和 Lipo 脂溶性任务中的原子重要性，检查表示是否符合化学直觉"
      ],
      "detail": "<h5>核心示意图与来源说明</h5>\n<p>原始 YAML 给出的 <code>10.1101</code> bioRxiv 链接在当前检索中没有作为可直接打开的页面返回；可访问来源为 bioRxiv DOI <code>https://doi.org/10.64898/2026.02.15.706011</code>、官方 GitHub <code>https://github.com/pcdslab/MolDeBERTa</code>、Hugging Face 模型集合 <code>https://huggingface.co/collections/SaeedLab/moldeberta</code>，以及作者上传到 ResearchGate 的全文。bioRxiv 图像端点在本环境返回 Cloudflare/403，因此这里用可复现文字图示表达论文框架。</p>\n<p><img alt=\"MolDeBERTa 官方仓库概览\" src=\"https://opengraph.githubassets.com/moldeberta/pcdslab/MolDeBERTa\" />\n<em>图：MolDeBERTa 官方 GitHub 仓库的公开预览图；论文图像端点不可直连时，正文下方用文字框架图复现其预训练与微调流程。</em></p>\n<pre><code class=\"language-text\">PubChem SMILES (10M / 123M)\n        │\n        ▼\nbyte-level BPE tokenizer\n        │\n        ▼\nDeBERTaV2 encoder: tiny / small / base\n        │\n        ├── MLM: masked token prediction\n        ├── MTR: RDKit-like physicochemical descriptor regression\n        ├── MLC: 2048-bit Morgan fingerprint multi-label classification\n        ├── contrastive MTR: align SMILES embedding with descriptor-derived target\n        └── contrastive MLC: align SMILES embedding with fingerprint-derived target\n        │\n        ▼\nMoleculeNet finetuning: BACE, BBBP, ClinTox, HIV, Tox21, Delaney, Lipo, Clearance, ...\n</code></pre>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># MolDeBERTa 预训练与微调伪代码\nfor smiles in pubchem_corpus:\n    tokens = byte_level_bpe.encode(smiles, max_length=128)\n    cls_repr, token_repr = deberta_v2_encoder(tokens)\n\n    if objective == &quot;mlm&quot;:\n        masked_tokens, labels = mask_tokens(tokens)\n        outputs = deberta_v2_encoder(masked_tokens)\n        loss = cross_entropy(outputs.masked_logits, labels)\n\n    elif objective == &quot;mtr&quot;:\n        descriptors = compute_physchem_descriptors(smiles)\n        pred = regression_head(cls_repr)\n        loss = mean_squared_error(pred, descriptors)\n\n    elif objective == &quot;mlc&quot;:\n        fingerprint = morgan_fingerprint(smiles, radius=2, n_bits=2048)\n        pred = multilabel_head(cls_repr)\n        loss = binary_cross_entropy_with_logits(pred, fingerprint)\n\n    elif objective in [&quot;contrastive_mtr&quot;, &quot;contrastive_mlc&quot;]:\n        target = compute_descriptors_or_fingerprint(smiles)\n        z_smiles = projection_head(cls_repr)\n        z_target = target_encoder_or_projection(target)\n        loss_ssl = supervised_loss_if_used(cls_repr, target)\n        loss_nce = info_nce(z_smiles, z_target, negatives=in_batch_targets)\n        loss = loss_ssl + loss_nce\n\n    optimizer.step(loss)\n\n# 下游任务\nfor task in moleculenet_tasks:\n    model = load_pretrained_moldeberta(best_checkpoint)\n    model.add_prediction_head(task.type)\n    finetune(model, task.train)\n    report(task.metric(model, task.test))\n</code></pre>\n<h5>动机：MLM 学语言，不一定学物性</h5>\n<p>SMILES encoder 的常见预训练目标是 MLM：遮住一部分 token，让模型根据上下文预测被遮住的字符或子词。这个目标能学习 SMILES 语法、局部官能团模式和长程括号/环闭合依赖，但它没有直接告诉模型“哪些结构会影响溶解度、脂溶性、清除率或毒性”。因此，MLM 学到的表示可能在 token 层面很强，却和下游物性空间不够对齐。</p>\n<p>MolDeBERTa 的设计思路是保留语言模型的可扩展性，同时把可由 SMILES 确定性计算的化学知识作为自监督信号。因为 RDKit 描述符和 Morgan 指纹不需要人工实验标签，仍然可以用于大规模无标签分子预训练。这样模型既从 SMILES 序列中学习上下文，也从目标函数中学习“表示应该保留哪些化学属性”。</p>\n<h5>DeBERTaV2 与 byte-level BPE</h5>\n<p>MolDeBERTa 使用 DeBERTaV2 encoder，而不是早期 ChemBERTa/MolBERT 常用的 BERT/RoBERTa。DeBERTa 的关键思想是 disentangled attention：把 token 内容表示和相对位置表示分开建模，注意力分数不只依赖内容-内容匹配，也能显式处理内容-位置关系。对 SMILES 来说，这有助于区分相同原子符号在不同环、支链和上下文中的角色。</p>\n<p>byte-level BPE 解决了纯字符级 SMILES tokenization 的两个问题。第一，字符级序列较长，括号、数字、芳香原子符号和多字符元素会被拆得很碎；第二，常见子结构片段无法作为稳定单元出现。BPE 会把高频字节片段合并成 token，使模型能更有效地表示常见化学片段，同时保留开放词表能力。</p>\n<h5>五类预训练目标</h5>\n<p>MLM 目标与常规语言模型一致：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\mathrm{MLM}}\n=-\\sum_{t\\in\\mathcal{M}}\\log p_\\theta(x_t\\mid \\mathbf{x}_{\\setminus\\mathcal{M}})</div>\n<p>MTR（Multi-Task Regression）让 <code>[CLS]</code> 表示预测 <span class=\"kb-math kb-math-inline\">n</span> 个理化描述符，论文中的核心形式为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\mathrm{MTR}}\n=\\frac{1}{n}\\sum_{i=1}^{n}(y_i-\\hat y_i)^2</div>\n<p>MLC（Multi-Label Classification）把每个分子映射为 2048 维 Morgan fingerprint，半径为 2。每一位表示某类局部子结构是否存在：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\mathrm{MLC}}\n=-\\frac{1}{K}\\sum_{k=1}^{K}\n\\left[\nf_k\\log \\sigma(\\hat f_k)\n+(1-f_k)\\log(1-\\sigma(\\hat f_k))\n\\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">K=2048</span>，<span class=\"kb-math kb-math-inline\">f_k\\in\\{0,1\\}</span>。这比 MLM 更直接地要求模型识别结构片段，尤其适合性质预测中常见的官能团和局部骨架模式。</p>\n<p>contrastive MTR/MLC 则进一步把 SMILES encoder 的表示与描述符/指纹目标表示对齐。设 <span class=\"kb-math kb-math-inline\">\\mathbf{z}_i</span> 是第 <span class=\"kb-math kb-math-inline\">i</span> 个 SMILES 的 <code>[CLS]</code> 投影，<span class=\"kb-math kb-math-inline\">\\mathbf{u}_i</span> 是同一分子的描述符或指纹投影，InfoNCE 可写为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\mathrm{NCE}}\n=-\\log\n\\frac{\\exp(\\mathrm{sim}(\\mathbf{z}_i,\\mathbf{u}_i)/\\tau)}\n{\\sum_{j=1}^{B}\\exp(\\mathrm{sim}(\\mathbf{z}_i,\\mathbf{u}_j)/\\tau)}</div>\n<p>这个目标的直觉是：同一分子的“语言表示”和“化学属性表示”应该靠近，不同分子应该分开。相比单纯回归或分类，对比学习更强调表示空间的相对几何结构。</p>\n<h5>数据规模、模型规模与下游迁移</h5>\n<p>MolDeBERTa 系统比较了 10M 和 123M PubChem SMILES。官方 GitHub 说明模型族包含 tiny、small、base 三种规模，以及五类预训练目标，因此组合出 30 个预训练变体。论文结论是，增大数据规模通常能提升多数下游任务，尤其在回归任务上可带来明显 RMSE 降低；但收益并不在所有任务上单调，因为部分任务在 10M 规模已能学到足够通用的上下文，额外数据可能带来冗余。</p>\n<p>下游评估覆盖 9 个 MoleculeNet 类任务，包括分类任务 BBBP、ClinTox、HIV、Tox21、BACE classification，以及回归任务 Delaney/ESOL、Lipo、Clearance、BACE regression。官方摘要称 MolDeBERTa 在 4/9 任务达到整体最佳，并在 7/9 任务超过 SMILES-based encoder；回归任务最多约 16% error reduction，分类任务最高约 2.2 ROC-AUC points 改善。</p>\n<h5>与 MolBERT/ChemBERTa 的区别</h5>\n<p>MolBERT 早期已经使用过理化性质辅助任务，ChemBERTa/ChemBERTa-2 系列则系统探索了 MLM、MTR 和数据规模。MolDeBERTa 的区别在于三点：第一，encoder 升级到 DeBERTaV2；第二，引入 byte-level BPE 而不是完全依赖字符级 token；第三，把 Morgan fingerprint 多标签预测与描述符/指纹对比学习纳入同一实验矩阵。也就是说，它不是只靠更多数据，而是同时调整 architecture、tokenizer 和 self-supervised objective。</p>\n<div class=\"warn-box\">⚠️ 注意：MolDeBERTa 仍然是 SMILES encoder，不直接输入 3D 坐标或分子图。它的“structure-informed”主要来自 Morgan fingerprints、描述符和对比目标，而不是像 Uni-Mol 那样显式建模三维坐标。</div>",
      "quiz": {
        "q": "MolDeBERTa 中 MLC 预训练目标的主要作用是什么？",
        "options": [
          "预测 2048 维 Morgan fingerprint，让模型显式学习分子局部子结构是否存在",
          "把所有 SMILES 转换成 3D 坐标并最小化 RMSD",
          "只预测被 mask 的 SMILES token，不引入任何化学先验",
          "用自回归方式生成下一个分子"
        ],
        "answer": 0,
        "explain": "MLC 使用 Morgan fingerprint 作为多标签监督信号，每一位对应局部子结构存在性，因此能把子结构归纳偏置直接注入 `[CLS]` 表示。"
      }
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
      "summary": "Boltz-2 在 Boltz-1/AlphaFold3 式协同折叠框架上加入亲和力预测模块与更强的结构可控性，解决了蛋白-配体复合物既要预测结合姿态、又要快速排序结合强弱的问题。它把结构扩散生成、置信度估计和亲和力回归/分类接到同一生物分子表示上，使单个 GPU 上约 20 秒级的虚拟筛选成为可能。",
      "keyPoints": [
        "<strong>联合任务</strong>：同时预测蛋白、DNA、RNA、小分子复合物结构，以及蛋白-配体的 binding likelihood 和连续亲和力数值",
        "<strong>AF3/Boltz-1 系主干</strong>：沿用 Atom Attention Encoder、MSA Module、PairFormer Module、recycling、扩散式结构模块和 confidence module",
        "<strong>亲和力模块</strong>：从结构模型产生的 trunk pair representation、预测坐标和蛋白-配体 pocket crop 中学习，输出二分类结合概率与连续亲和力",
        "<strong>亲和力监督</strong>：对同一 assay 内样本做 pairwise difference 监督，用 Huber loss 降低跨实验条件噪声，并用 focal loss 处理 binder/decoy 分类",
        "<strong>Activity-cliff sampler</strong>：按 assay 内亲和力四分位距加权采样，并把同一 assay 的多个化合物放进一个 batch，强调细微结构变化导致的大亲和力变化",
        "<strong>可控结构预测</strong>：支持实验方法 conditioning、用户距离/口袋约束、多链模板集成，以及可选 Boltz-steering 物理势修正",
        "<strong>动态与物理性增强</strong>：训练数据扩展到实验结构、分子动力学 ensemble 和 Boltz-1 自蒸馏结构，以改善构象多样性与物理合理性",
        "<strong>速度-精度权衡</strong>：论文报告其亲和力预测接近 FEP 类方法的相关性，同时计算效率提升 1000 倍量级；单配体推理约 20 秒",
        "<strong>来源限制</strong>：任务给定 <code>paper_url</code> 是二级介绍页；本文追溯使用作者技术报告、bioRxiv/官方仓库与可访问的架构图页面"
      ],
      "detail": "<h5>模型架构总览</h5>\n<p><img alt=\"Boltz-2 架构示意图\" src=\"https://rowansci.com/tools/cofolding/boltz2-arch.png\" />\n<em>图：Boltz-2 的端到端流程。输入序列、MSA、模板和小分子信息先进入 trunk；扩散结构模块从随机坐标反向去噪得到复合物结构；confidence module 与 affinity module 复用 trunk 表示并 stop-gradient 训练。该图来自 Rowan 对 Boltz-2 预印本 Figure 2 的转载；原始技术报告可访问于 https://jeremywohlwend.com/assets/boltz2.pdf，官方代码与权重位于 https://github.com/jwohlwend/boltz。</em></p>\n<h5>算法核心流程</h5>\n<pre><code class=\"language-python\"># Boltz-2 结构-亲和力联合推理与亲和力训练伪代码\n\n# === 结构模型预计算/推理 ===\nfor complex in protein_ligand_inputs:\n    features = featurize(\n        protein_sequence=complex.sequence,\n        ligand_smiles=complex.smiles,\n        msa=search_msa(complex.sequence),\n        templates=search_or_user_templates(complex.sequence),\n        constraints=complex.user_constraints,\n        experimental_method=complex.method_hint,\n    )\n\n    trunk_pair, trunk_single = boltz2_trunk(features, recycle=True)\n\n    x_t = sample_random_atom_coordinates(features.atoms)\n    for step in reverse_diffusion_schedule:\n        x0_hat = denoising_module(x_t, trunk_pair, trunk_single, step)\n        if use_boltz_steering:\n            x0_hat = apply_physics_potentials(\n                x0_hat,\n                clash_weight=True,\n                bond_geometry_weight=True,\n                template_or_distance_constraints=features.constraints,\n            )\n        x_t = diffusion_update(x_t, x0_hat, step)\n\n    structure = x_t\n    confidence = confidence_head(stop_gradient(trunk_pair), structure)\n\n    # 亲和力模块只在蛋白-配体任务上启用\n    pocket_crop = crop_ligand_and_nearby_protein_tokens(structure, complex.ligand)\n    affinity_pair = select_pair_features(trunk_pair, pocket_crop)\n    pred_affinity, pred_bind_logit = affinity_module(\n        stop_gradient(affinity_pair),\n        structure[pocket_crop],\n    )\n\n# === 亲和力模块训练 ===\nfor batch in activity_cliff_sampler(affinity_dataset, batch_size=5):\n    # batch 内样本来自同一个 assay，便于比较相对亲和力\n    pred_y, pred_logit = [], []\n    for complex in batch:\n        structure, trunk_pair = precomputed_or_run_structure_model(complex)\n        crop = affinity_cropper(structure, complex.ligand)\n        y_hat, logit = affinity_module(stop_gradient(trunk_pair[crop]), structure[crop])\n        pred_y.append(y_hat)\n        pred_logit.append(logit)\n\n    loss_abs = censor_aware_huber_absolute(pred_y, batch.affinity, batch.qualifier)\n    loss_diff = censor_aware_pairwise_huber(pred_y, batch.affinity, batch.qualifier)\n    loss_binary = focal_loss(pred_logit, batch.binary_label, gamma=1)\n    loss = 0.9 * loss_diff + 0.1 * loss_abs + loss_binary\n    optimizer.step(loss)\n</code></pre>\n<h5>动机与背景</h5>\n<p>AlphaFold3 和 Boltz-1 已经把“多生物分子协同折叠”推进到实用阶段，但药物发现里只知道复合物几何仍然不够。早期筛选和 lead optimization 更关心的是候选分子是否真的更强地结合靶点。传统 docking 速度快但排序噪声大；FEP/ABFE 更接近物理但计算昂贵，难以覆盖几十万到上亿规模的化合物库。Boltz-2 的核心定位就是把协同折叠模型的表征能力转化为亲和力预测信号，在速度与精度之间提供新的折中。</p>\n<p>给定的 <code>paper_url</code> 并不是论文页面，因此可访问来源需要追溯。作者技术报告题为 <em>Boltz-2: Towards Accurate and Efficient Binding Affinity Prediction</em>，公开 PDF 和 GitHub 仓库说明其权重、推理和训练代码以 MIT license 发布；Rowan 页面提供了可直接访问的 Figure 2 架构图。本文的方法级解读基于这些可访问来源，而不是任务中的二级新闻页。</p>\n<h5>架构机制：结构主干服务亲和力头</h5>\n<p>Boltz-2 的结构部分可以看作 AF3/Boltz-1 风格的协同折叠器。输入被整理成 token：蛋白/核酸残基、小分子原子、模板、MSA、方法标签和用户约束。trunk 用 Atom Attention Encoder、MSA Module 和 PairFormer Module 生成单体表示 <span class=\"kb-math kb-math-inline\">s_i</span> 与 pair 表示 <span class=\"kb-math kb-math-inline\">z_{ij}</span>：</p>\n<div class=\"kb-math kb-math-display\">(s, z) = \\text{Trunk}_{\\theta}\n(\\text{sequence}, \\text{MSA}, \\text{templates}, \\text{ligand}, \\text{constraints})</div>\n<p>扩散结构模块从随机坐标开始反向去噪：</p>\n<div class=\"kb-math kb-math-display\">x_{t-\\Delta t}\n= \\text{Update}\\left(x_t,\\;\n\\hat{x}_0 =\nD_{\\theta}(x_t, s, z, t)\n\\right)</div>\n<p>结构模型给亲和力模块提供两个关键信息：一是 co-folding 后的 pocket 几何，二是 trunk 的蛋白-配体 pair representation。亲和力模块不需要重新从 SMILES 和序列学习全部相互作用，而是利用结构模型已经学到的接触、构象和界面上下文：</p>\n<div class=\"kb-math kb-math-display\">\\hat{y},\\ \\hat{p}_{\\text{bind}}\n= A_{\\phi}\\left(\n\\text{stopgrad}(z_{\\text{pocket}}),\\ x_{\\text{pocket}}\n\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\hat{y}</span> 是连续亲和力预测，<span class=\"kb-math kb-math-inline\">\\hat{p}_{\\text{bind}}</span> 是二分类结合概率。图中 stop-gradient 的设计很关键：亲和力头可以复用结构表征，但训练亲和力数据时不直接破坏结构 trunk 的几何能力。</p>\n<h5>亲和力监督：为什么不直接回归所有 IC50/Ki</h5>\n<p>公开亲和力数据的噪声很大：不同实验室、底物浓度、assay 类型和读数单位都会改变数值。论文因此把绝对数值监督和同一 assay 内的相对差值监督结合起来。对精确标签 <span class=\"kb-math kb-math-inline\">s = &quot;=&quot;</span>，绝对值项可写为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{abs}}(y,\\hat{y},s)\n= \\text{Huber}(y,\\hat{y}; \\delta=0.5)</div>\n<p>对下界标签 <span class=\"kb-math kb-math-inline\">s = &quot;&gt;&quot;</span>，只有当模型预测低于报告下界时才惩罚：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{abs}}(y,\\hat{y},s)\n= \\text{Huber}(y,\\hat{y}; \\delta=0.5)\\cdot \\mathbf{1}[\\hat{y}&lt;y]</div>\n<p>更重要的是 pairwise difference loss。对同一 assay 内两个化合物，模型学习亲和力差：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{diff}}\n= \\text{Huber}\n\\left(\n(y_1-y_2),\\;(\\hat{y}_1-\\hat{y}_2);\\delta=0.5\n\\right)</div>\n<p>这样 assay 级偏移会在差分中被抵消，模型更关注“同一个靶点和同一种读数条件下，哪个类似物更强”。二分类 binder/decoy 使用 focal loss：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{binary}}\n= \\text{Focal}(\\text{logits}, \\gamma=1, \\alpha=\\lambda_{\\text{focal}})</div>\n<p>总目标为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{total}}\n= 0.9\\,\\mathcal{L}_{\\text{diff}}\n+ 0.1\\,\\mathcal{L}_{\\text{abs}}\n+ \\mathcal{L}_{\\text{binary}}</div>\n<div class=\"key-point\">💡 <strong>关键：</strong> Boltz-2 的亲和力模块不是简单“结构预测后再加一个打分器”。它把同一结构 trunk 的蛋白-配体表示、预测 pocket 几何和 assay 内差分监督合在一起，试图让模型学到 ligand series 内的活性排序。</div>\n<h5>采样器：把 activity cliff 放到训练中心</h5>\n<p>药物化学中常见 activity cliff：两个结构很相似的小分子，亲和力却相差很大。普通随机采样容易被 assay 数量、弱信号和重复 scaffold 淹没。Boltz-2 为连续亲和力数据定义 assay 级信息量：</p>\n<div class=\"kb-math kb-math-display\">\\text{IQR}_a\n= Q_{0.75}(\\{y_i\\}_{i\\in D_a})\n- Q_{0.25}(\\{y_i\\}_{i\\in D_a})</div>\n<p>采样概率按 <span class=\"kb-math kb-math-inline\">\\text{IQR}_a</span> 归一化：</p>\n<div class=\"kb-math kb-math-display\">p(a)\n= \\frac{\\text{IQR}_a}{\\sum_b \\text{IQR}_b}</div>\n<p>每个 batch 从同一个 assay 取 5 个蛋白-配体复合物，使 pairwise loss 有可比较的语义。对二分类数据，则先采样一个 binder，再从同一 assay 采样多个 decoy，减少“蛋白上下文不同导致的伪差异”。</p>\n<h5>Boltz-steering 与可控性</h5>\n<p>协同折叠模型常见问题是局部物理不合理：小分子键长/键角错误、手性中心翻转、芳香环非平面、界面 steric clash。Boltz-2 沿用 Boltz-1x 的 Boltz-steering 思路，在反向扩散时加入物理势或用户约束势，对结构更新施加额外引导：</p>\n<div class=\"kb-math kb-math-display\">\\hat{x}_0^{\\text{steered}}\n= \\hat{x}_0\n- \\eta \\nabla_x\n\\left(\n\\lambda_{\\text{clash}}E_{\\text{clash}}\n+ \\lambda_{\\text{bond}}E_{\\text{bond}}\n+ \\lambda_{\\text{template}}E_{\\text{template}}\n+ \\lambda_{\\text{dist}}E_{\\text{dist}}\n\\right)</div>\n<p>这不是训练一个新模型，而是在推理时改变反向扩散轨迹。好处是能减少明显物理错误，也能强制满足模板或距离约束；代价是推理更慢，且过强约束可能把模型推向局部不自然构象。</p>\n<h5>与 AlphaFold3、Boltz-1 和 FEP 的区别</h5>\n<p>与 AlphaFold3 相比，Boltz-2 的最大变化不是“再预测一个更漂亮的结构”，而是把 binding affinity 变成一级输出。AF3 的置信度可以告诉用户预测结构是否可信，但不直接回答某个 ligand 是否更强。Boltz-2 在 protein-ligand pocket 上学习连续和二分类亲和力信号，能用于虚拟筛选排序。</p>\n<p>与 Boltz-1 相比，Boltz-2 增强了结构主干、训练数据和可控性，并加入专门的亲和力模块。论文还使用分子动力学 ensemble 与自蒸馏数据来提升对局部动态的理解，使结构输出不只拟合静态晶体结构。</p>\n<p>与 FEP/ABFE 相比，Boltz-2 并不显式积分物理自由能路径，而是用神经网络从大量结构与活性数据中学习近似排序信号。因此它的优势是速度和规模：约 20 秒级别可让多 GPU/HPC worker 每天筛选大量化合物；局限是对 out-of-distribution 蛋白、异常化学、金属/水介导相互作用、构象大变化和 assay 偏差仍然敏感。实际药物发现中更合理的用法是先用 Boltz-2 缩小候选集，再用 FEP、MD 或实验验证最终 lead。</p>",
      "quiz": {
        "q": "Boltz-2 在亲和力预测中为什么强调同一 assay 内的 pairwise difference loss？",
        "options": [
          "因为它可以完全替代结构扩散模块",
          "因为同一 assay 内做差能部分抵消实验条件偏移，更适合学习类似物之间的活性排序",
          "因为它只需要负样本，不需要任何连续亲和力标签",
          "因为它会强制所有蛋白使用相同的结合口袋"
        ],
        "answer": 1,
        "explain": "IC50/Ki 等读数受 assay 条件影响很大；同一 assay 内的亲和力差更可比，能让模型关注化学结构变化带来的相对活性变化。"
      }
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
      "summary": "AlphaFold 2 提出了 Evoformer + Structure Module 的端到端蛋白结构预测框架，把 MSA 进化信息、残基对几何关系和 3D 等变结构更新合在一个可训练网络中，解决了无模板或弱模板蛋白难以达到原子级精度的问题。它用 FAPE、recycling、自蒸馏和置信度头把序列到全原子坐标的预测推到接近实验结构精度。",
      "keyPoints": [
        "<strong>输入统一建模</strong>：从氨基酸序列、MSA、pairing 信息和可用模板构建 MSA representation 与 pair representation",
        "<strong>Evoformer 主干</strong>：48 个 Evoformer block 在 MSA 轴和 residue-pair 图上反复交换信息，显式建模进化协变与几何一致性",
        "<strong>三角更新机制</strong>：triangle multiplicative update 与 triangle self-attention 用三元残基关系约束 pair representation，使距离矩阵更像可嵌入 3D 的结构",
        "<strong>Structure Module</strong>：把每个残基表示为一个 backbone rigid frame 加侧链 torsion angles，通过 Invariant Point Attention 迭代更新 3D 结构",
        "<strong>FAPE 损失</strong>：Frame Aligned Point Error 在每个局部残基坐标系下比较预测和真实原子位置，强调局部几何、手性和侧链相对取向",
        "<strong>Recycling</strong>：把预测结构、MSA 表示和 pair 表示回馈到同一个网络多轮 refinement，显著提升长程 packing 和复杂 fold 的准确率",
        "<strong>辅助目标</strong>：distogram cross-entropy、masked MSA BERT-like loss、pLDDT/pTM 置信度和 violation loss 共同稳定训练",
        "<strong>自蒸馏</strong>：用已训练模型为约 35 万条无标签 Uniclust 序列生成高置信结构，再与 PDB 数据混合训练",
        "<strong>CASP14 突破</strong>：在 CASP14 中多数目标达到接近实验结构精度，论文报告中位 backbone <span class=\"kb-math kb-math-inline\">r.m.s.d._{95}</span> 约 0.96 Å"
      ],
      "detail": "<h5>模型架构总览</h5>\n<p><img alt=\"AlphaFold 2 总体架构\" src=\"https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41586-021-03819-2/MediaObjects/41586_2021_3819_Fig1_HTML.png\" />\n<em>图 1：AlphaFold 2 的整体流程。序列经 genetic database search 得到 MSA，经 structure database search 得到模板；Evoformer 处理 MSA/pair 表示；Structure Module 输出 3D 结构并通过 recycling 回馈。来源：Nature 论文 Figure 1。</em></p>\n<p><img alt=\"AlphaFold 2 Evoformer 与 Structure Module\" src=\"https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41586-021-03819-2/MediaObjects/41586_2021_3819_Fig3_HTML.png\" />\n<em>图 2：Evoformer block、triangle update、Invariant Point Attention、residue gas 和 FAPE。来源：Nature 论文 Figure 3。</em></p>\n<h5>算法核心流程</h5>\n<pre><code class=\"language-python\"># AlphaFold 2 训练/推理核心伪代码\n\ndef alphafold2(sequence):\n    msa = search_sequence_databases(sequence)        # UniRef90, BFD, MGnify 等\n    templates = search_structure_templates(sequence) # HHSearch/PDB70 等\n\n    M = embed_msa(sequence, msa)          # [N_seq, N_res, c_m]\n    Z = embed_pair(sequence, templates)   # [N_res, N_res, c_z]\n    prev_structure = None\n\n    for recycle in range(num_recycles):\n        if prev_structure is not None:\n            Z = Z + embed_distogram(prev_structure)\n\n        # 1. Evoformer：MSA 和 pair representation 双向通信\n        for block in range(48):\n            M = row_attention_with_pair_bias(M, Z)\n            M = column_attention(M)\n            M = transition(M)\n            Z = Z + outer_product_mean(M)\n            Z = triangle_multiplicative_update(Z)\n            Z = triangle_self_attention(Z)\n            Z = transition(Z)\n\n        single = M[0]  # query sequence row\n\n        # 2. Structure Module：从残基 rigid frames 生成全原子坐标\n        frames = init_identity_backbone_frames(N_res)\n        for layer in range(8):\n            single = invariant_point_attention(single, Z, frames)\n            frames = update_backbone_frames(frames, single)\n            torsion_angles = predict_sidechain_angles(single)\n\n        coords = frames_and_torsions_to_all_atom(frames, torsion_angles)\n        prev_structure = coords\n\n    plddt = predict_plddt(single)\n    ptm = predict_ptm(Z)\n    relaxed_coords = amber_relax(coords)  # 主要去除局部几何违规\n    return relaxed_coords, plddt, ptm\n\n# 训练目标：FAPE + distogram CE + masked MSA CE + confidence/violation 等辅助项\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统蛋白结构预测主要走两条路：一类用物理能量函数搜索折叠构象，理论自然但搜索空间太大；另一类用进化协变和模板推断接触/距离，再用外部优化器拼成结构。AlphaFold 2 的判断是：蛋白折叠可以被表述为一个带 3D 几何约束的图推理问题，但网络必须在“序列家族的统计规律”和“单个蛋白的三维几何”之间反复通信。</p>\n<p>因此 AF2 不再先预测距离图再交给 Rosetta 式搜索，而是直接输出所有 heavy atoms 坐标。它把 MSA 看成 <span class=\"kb-math kb-math-inline\">N_{\\text{seq}}\\times N_{\\text{res}}</span> 的序列家族张量，把残基对看成 <span class=\"kb-math kb-math-inline\">N_{\\text{res}}\\times N_{\\text{res}}</span> 的图边张量，再用 Evoformer 将这两种表示融合。</p>\n<h5>Evoformer：MSA 与 pair 图的双向交换</h5>\n<p>设 MSA 表示为：</p>\n<div class=\"kb-math kb-math-display\">M \\in \\mathbb{R}^{N_{\\text{seq}}\\times N_{\\text{res}}\\times c_m}</div>\n<p>pair 表示为：</p>\n<div class=\"kb-math kb-math-display\">Z \\in \\mathbb{R}^{N_{\\text{res}}\\times N_{\\text{res}}\\times c_z}</div>\n<p>Evoformer 的关键是让 <span class=\"kb-math kb-math-inline\">M</span> 与 <span class=\"kb-math kb-math-inline\">Z</span> 形成闭环。MSA row attention 使用 pair 表示作为 attention bias，使同源序列中每个残基位置的更新受当前结构假设影响：</p>\n<div class=\"kb-math kb-math-display\">\\text{Attn}_{ij}\n\\propto\n\\text{softmax}\\left(\n\\frac{q_i^\\top k_j}{\\sqrt{d}} + b_{ij}(Z)\n\\right)</div>\n<p>随后 outer product mean 把 MSA 中的协变信息写回 pair representation：</p>\n<div class=\"kb-math kb-math-display\">Z_{ij}\n\\leftarrow\nZ_{ij}\n+ W\\left(\n\\frac{1}{N_{\\text{seq}}}\n\\sum_s\nM_{s,i} \\otimes M_{s,j}\n\\right)</div>\n<p>直觉上，如果两个残基在进化中协同突变，它们可能在三维结构中相互接触；但 AF2 不把这种统计量固定为人工特征，而是在每个 Evoformer block 内不断重新估计。</p>\n<h5>三角更新：让 pair 表示像真实 3D 几何</h5>\n<p>一个任意的残基对矩阵不一定能对应某个三维结构。真实几何必须满足三角一致性：若 <span class=\"kb-math kb-math-inline\">i</span> 接近 <span class=\"kb-math kb-math-inline\">k</span>，<span class=\"kb-math kb-math-inline\">k</span> 接近 <span class=\"kb-math kb-math-inline\">j</span>，则 <span class=\"kb-math kb-math-inline\">i</span> 与 <span class=\"kb-math kb-math-inline\">j</span> 的关系会受第三个点 <span class=\"kb-math kb-math-inline\">k</span> 约束。Evoformer 用两类操作注入这种归纳偏置：</p>\n<div class=\"kb-math kb-math-display\">Z_{ij}\n\\leftarrow\nZ_{ij}\n+ \\sum_k\n\\phi_{\\text{out}}(Z_{ik}, Z_{jk})\n+ \\sum_k\n\\phi_{\\text{in}}(Z_{ki}, Z_{kj})</div>\n<p>triangle multiplicative update 用两条边更新第三条边；triangle self-attention around starting/ending node 则让 <span class=\"kb-math kb-math-inline\">Z_{ij}</span> 在以 <span class=\"kb-math kb-math-inline\">i</span> 或 <span class=\"kb-math kb-math-inline\">j</span> 为中心的三角关系中聚合信息。这使网络能更早形成一个粗略结构假设，并在深层持续修正。</p>\n<h5>Structure Module：残基气体与 Invariant Point Attention</h5>\n<p>AF2 的 Structure Module 不直接把序列表示映射成一串坐标，而是把每个残基表示为一个自由漂浮的刚体 frame：</p>\n<div class=\"kb-math kb-math-display\">T_i = (R_i, t_i)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">R_i</span> 是旋转，<span class=\"kb-math kb-math-inline\">t_i</span> 是平移，主要描述 N-Cα-C backbone frame；侧链通过 <span class=\"kb-math kb-math-inline\">\\chi</span> torsion angles 放置。论文称这种表示为 residue gas，因为在模块内部多肽链约束可以暂时放松，各残基可以并行局部调整，最后再用 violation loss 和 Amber relaxation 修正几何违规。</p>\n<p>Invariant Point Attention (IPA) 把普通 attention 的 query/key/value 扩展到 3D 点。每个残基在自身局部坐标系中生成 query/key 点，再投影到全局坐标系比较距离：</p>\n<div class=\"kb-math kb-math-display\">a_{ij}\n\\propto\n\\text{softmax}_j\n\\left(\nq_i^\\top k_j\n+ b_{ij}\n- \\sum_p w_p\n\\left\\|\nT_i q_{i,p}^{\\text{point}}\n- T_j k_{j,p}^{\\text{point}}\n\\right\\|^2\n\\right)</div>\n<p>由于距离项对整体旋转和平移不变，IPA 可以在当前 3D 假设上做几何感知的注意力；而 frame update 在局部坐标系中应用，使整体结构更新对旋转/平移等变。</p>\n<h5>FAPE：局部坐标系下的全原子误差</h5>\n<p>AF2 的核心结构损失是 Frame Aligned Point Error。对每个参考 frame <span class=\"kb-math kb-math-inline\">k</span> 和每个原子 <span class=\"kb-math kb-math-inline\">i</span>，先把预测坐标 <span class=\"kb-math kb-math-inline\">x_i</span> 和真实坐标 <span class=\"kb-math kb-math-inline\">x_i^\\*</span> 都变换到对应 frame 的局部坐标系，再比较距离：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{FAPE}}\n= \\frac{1}{N_{\\text{frame}}N_{\\text{atom}}}\n\\sum_{k,i}\n\\min\\left(\n\\left\\|\nT_k^{-1}x_i - {T_k^\\*}^{-1}x_i^\\*\n\\right\\|_2,\\ d_{\\text{clamp}}\n\\right)</div>\n<p>FAPE 的好处是不会因为整体刚体旋转/平移而惩罚模型，却会强烈惩罚“相对某个残基局部坐标系的原子位置错误”。这让网络更重视侧链相互作用、局部手性和界面几何，而不仅是全局 RMSD。</p>\n<p>完整训练目标可以概括为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}\n= \\lambda_{\\text{FAPE}}\\mathcal{L}_{\\text{FAPE}}\n+ \\lambda_{\\text{dist}}\\mathcal{L}_{\\text{distogram}}\n+ \\lambda_{\\text{msa}}\\mathcal{L}_{\\text{maskedMSA}}\n+ \\lambda_{\\text{conf}}\\mathcal{L}_{\\text{pLDDT/pTM}}\n+ \\lambda_{\\text{viol}}\\mathcal{L}_{\\text{violation}}</div>\n<p>其中 distogram loss 监督 pair 表示中的距离分布，masked MSA loss 类似 BERT 预测被 mask 的 MSA token，置信度头学习 pLDDT 和 pTM，violation loss 在 fine-tuning 中减少肽键和局部立体化学错误。</p>\n<h5>Recycling 与自蒸馏</h5>\n<p>Recycling 是 AF2 从“单次预测器”变成“迭代 refinement 系统”的关键。网络一次输出结构后，会把结构的距离信息、MSA 表示和 pair 表示重新送回同一个 trunk：</p>\n<div class=\"kb-math kb-math-display\">(M^{r+1}, Z^{r+1}, X^{r+1})\n= f_{\\theta}(M^{r}, Z^{r}, X^{r})</div>\n<p>这种递归不是后处理优化，而是模型训练时就学习“看到自己上一次的结构假设后如何修正”。对于多结构域 packing、远程接触和难折叠目标，recycling 可以让粗结构逐步变成稳定预测。</p>\n<p>自蒸馏则解决 PDB 标注结构数量有限的问题。DeepMind 先训练初始 AF2，再给约 355,993 条 Uniclust30 序列预测结构，筛选高置信结果后与 PDB 数据混合训练最终模型。这样模型不仅学习实验结构，也学习自己在大规模无标签序列上的高置信归纳。</p>\n<h5>与传统方法的区别与局限</h5>\n<p>AF2 相比传统 contact/distance pipeline 的本质区别是端到端：网络内部已经形成结构假设并直接输出坐标，不需要外部采样器把距离约束折成三维结构。相比纯物理模拟，它不显式搜索折叠自由能景观，而是从 PDB、MSA 和自蒸馏数据中学习结构先验。</p>\n<p>局限也来自这个设定。AF2 主要面向单链或同源复合物，原版对异源复合物、蛋白-小分子、核酸、金属离子、构象 ensemble 和显式动力学支持有限；当 MSA 很浅、蛋白状态受配体/伙伴强烈诱导，或目标包含无序区域时，pLDDT/PAE 的不确定性需要被认真对待。</p>",
      "quiz": {
        "q": "AlphaFold 2 的 FAPE 损失为什么要在局部残基 frame 中比较原子坐标？",
        "options": [
          "为了让模型忽略所有侧链原子，只预测 Cα 坐标",
          "为了消除整体旋转/平移影响，同时强化原子相对局部残基取向的正确性",
          "为了把蛋白结构预测转化为纯序列分类问题",
          "为了避免使用任何 MSA 信息"
        ],
        "answer": 1,
        "explain": "FAPE 把预测和真实原子坐标都变换到局部 frame 后比较，因此对全局刚体变换不敏感，但会惩罚局部几何、侧链取向和手性错误。"
      }
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
      "summary": "AlphaFold 3 把 AlphaFold 2 的蛋白单链/蛋白复合物建模扩展为统一的多生物分子复合物结构预测，把 Pairformer 表征学习与原子坐标扩散模块结合，解决了蛋白、核酸、小分子、离子和修饰残基共同建模的问题。它不再依赖 AF2 的残基刚体 frame 和侧链 torsion 表示，而是直接在全原子坐标上去噪生成复合物结构。",
      "keyPoints": [
        "<strong>统一生物分子输入</strong>：支持蛋白质、DNA、RNA、小分子 ligand、离子、共价修饰和常见化学组分",
        "<strong>Token 体系泛化</strong>：聚合物按残基/核苷酸 token，小分子和非标准组分可按原子/化学组分 token 表示，以覆盖 PDB 中多类实体",
        "<strong>MSA 降权</strong>：相比 AF2 的 Evoformer，AF3 只用更小的 MSA processing block，随后丢弃 MSA 表示，把信息集中到 pair representation",
        "<strong>Pairformer 主干</strong>：48 个 Pairformer block 在 single/pair 表示上运行，保留三角乘法、三角注意力和 single attention with pair bias",
        "<strong>扩散结构模块</strong>：用 diffusion module 直接从噪声原子坐标生成结构，替代 AF2 的 Structure Module、residue gas 和显式等变 IPA",
        "<strong>多样本生成与排序</strong>：推理时对多个 model seeds 和 diffusion samples 生成候选结构，再用 confidence module 排名",
        "<strong>训练损失</strong>：扩散模块使用 weighted aligned MSE、bond loss 和 smooth LDDT；对 DNA/RNA/ligand 原子加权以平衡蛋白主导的数据分布",
        "<strong>性能范围</strong>：论文报告 AF3 在蛋白-配体、蛋白-核酸、RNA、修饰残基、蛋白-蛋白/抗体抗原等类别上整体超过专用基线",
        "<strong>重要边界</strong>：AF3 预测结构和置信度，不等价于亲和力、动力学 ensemble 或反应机制预测"
      ],
      "detail": "<h5>模型架构总览</h5>\n<p><img alt=\"AlphaFold 3 总体架构\" src=\"https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41586-024-07487-w/MediaObjects/41586_2024_7487_Fig1_HTML.png\" />\n<em>图 1：AF3 在多类生物分子复合物上的示例、基准结果和推理架构。输入序列/ligand/共价键信息经过模板、遗传搜索和 conformer generation 后进入 trunk，Pairformer 后接扩散模块和 confidence module。来源：Nature 论文 Figure 1。</em></p>\n<p><img alt=\"AlphaFold 3 Pairformer 与扩散模块\" src=\"https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41586-024-07487-w/MediaObjects/41586_2024_7487_Fig2_HTML.png\" />\n<em>图 2：AF3 的 Pairformer、Diffusion Module 和训练设置。扩散模块在训练时对同一个 trunk 输出并行生成多份随机旋转/平移与加噪样本，以较低成本扩大 diffusion 监督。来源：Nature 论文 Figure 2。</em></p>\n<h5>算法核心流程</h5>\n<pre><code class=\"language-python\"># AlphaFold 3 条件扩散结构预测伪代码\n\ndef alphafold3(entities):\n    # entities: proteins, DNA/RNA, ligands, ions, modified residues, covalent bonds\n    tokens, atom_graph = tokenize_biomolecular_complex(entities)\n    msa_features = genetic_search_for_polymer_chains(tokens)\n    template_features = template_search(tokens)\n    ligand_conformers = generate_small_molecule_conformers(tokens)\n\n    # 1. 输入嵌入与轻量 MSA/template 处理\n    single, pair = input_embedder(tokens, atom_graph, ligand_conformers)\n    pair = pair + template_module(template_features)\n    pair = pair + msa_module(msa_features, pair)  # AF3 中 MSA 模块明显变小\n\n    # 2. Pairformer 主干\n    for block in range(48):\n        pair = triangle_multiplication(pair)\n        pair = triangle_attention(pair)\n        pair = transition(pair)\n        single = attention_with_pair_bias(single, pair)\n        single = transition(single)\n\n    # 3. 扩散结构生成\n    candidates = []\n    for seed in model_seeds:\n        for sample in diffusion_samples:\n            x_t = sample_standard_normal_coordinates(atom_graph)\n            for t in inference_noise_schedule:\n                x0_hat = diffusion_module(\n                    noisy_coords=x_t,\n                    noise_level=t,\n                    input_features=tokens,\n                    single=single,\n                    pair=pair,\n                )\n                x_t = diffusion_denoising_step(x_t, x0_hat, t)\n            candidates.append(x_t)\n\n    # 4. 置信度排序\n    scores = confidence_module(stop_gradient(single), stop_gradient(pair), candidates)\n    return select_top_confidence(candidates, scores)\n\n\n# 训练 diffusion module\nfor complex in training_set:\n    single, pair = run_trunk_once(complex)\n    for replica in range(48):\n        x_gt_aug = random_rotate_translate(complex.atom_coords)\n        t = sample_noise_level()\n        x_noisy = x_gt_aug + t * normal_noise()\n        x_pred = diffusion_module(x_noisy, t, complex.features, single, pair)\n        loss = diffusion_loss(x_pred, x_gt_aug, complex.atom_weights, complex.bonds, t)\n    optimizer.step(mean(losses))\n</code></pre>\n<h5>动机与背景</h5>\n<p>AlphaFold 2 的架构高度适合标准蛋白：每个残基有 backbone frame，侧链由 torsion angles 表示，MSA 协变提供强信号。但多生物分子复合物并不满足这种规则结构。小分子 ligand 有任意图拓扑，核酸和修饰残基有不同化学几何，金属离子和共价修饰也很难塞进“氨基酸残基 frame + 侧链角”的模板。</p>\n<p>AF3 的核心变化是把结构生成问题改写为条件扩散：trunk 仍负责理解输入实体之间的关系，structure module 则不再使用蛋白专用的 frame/torsion，而是在所有原子坐标上直接学习去噪。这样同一个模型可以处理蛋白-蛋白、蛋白-核酸、蛋白-ligand、RNA、DNA、修饰蛋白等任务。</p>\n<h5>从 Evoformer 到 Pairformer：MSA 信息变成辅助输入</h5>\n<p>AF2 的 Evoformer 同时维护 MSA representation 和 pair representation；AF3 则大幅减少 MSA 处理。论文说明 AF3 的 MSA block 只有较少层，随后不再保留 MSA representation，信息主要写入 pair representation：</p>\n<div class=\"kb-math kb-math-display\">Z = Z + \\text{MSAModule}(M, Z)</div>\n<p>之后 Pairformer 在 single 表示 <span class=\"kb-math kb-math-inline\">s_i</span> 与 pair 表示 <span class=\"kb-math kb-math-inline\">z_{ij}</span> 上运行：</p>\n<div class=\"kb-math kb-math-display\">(s, z) = \\text{Pairformer}^{48}(s, z)</div>\n<p>一个 Pairformer block 可以概括为：</p>\n<div class=\"kb-math kb-math-display\">z_{ij} \\leftarrow z_{ij}\n+ \\text{TriMul}_{\\text{out}}(z)_{ij}\n+ \\text{TriMul}_{\\text{in}}(z)_{ij}\n+ \\text{TriAttn}_{\\text{start/end}}(z)_{ij}</div>\n<div class=\"kb-math kb-math-display\">s_i \\leftarrow s_i\n+ \\text{AttentionPairBias}(s_i,\\{s_j\\}, z_{ij})</div>\n<p>直觉上，Pairformer 仍然保留 AF2 的几何一致性归纳偏置，但把架构重心从“深度 MSA 推理”转向“所有实体 token 之间的 pair 图推理”。这对 ligand、离子和修饰残基尤其重要，因为它们没有像蛋白序列那样丰富的 MSA。</p>\n<h5>扩散模块：直接生成 raw atom coordinates</h5>\n<p>AF3 的 Diffusion Module 接收 noisy atom coordinates、输入 token 特征、single/pair 表示和噪声水平 <span class=\"kb-math kb-math-inline\">\\hat{t}</span>，输出去噪坐标：</p>\n<div class=\"kb-math kb-math-display\">\\hat{x}_0\n= D_{\\theta}(x_{\\hat{t}}, \\hat{t}, f_{\\text{input}}, s, z)</div>\n<p>训练时加噪可写为：</p>\n<div class=\"kb-math kb-math-display\">x_{\\hat{t}} = x_{\\text{GT}} + \\hat{t}\\,\\epsilon,\n\\qquad\n\\epsilon \\sim \\mathcal{N}(0, I)</div>\n<p>推理时则从随机坐标开始，沿噪声日程反复调用 diffusion module 去噪。论文补充材料中的采样更新可概括为：</p>\n<div class=\"kb-math kb-math-display\">\\delta_l = \\frac{x_l - \\hat{x}^{\\text{denoised}}_l}{\\hat{t}},\n\\qquad\nx_l \\leftarrow x_l^{\\text{noisy}} + \\eta\\,\\Delta t\\,\\delta_l</div>\n<p>AF3 的扩散模块不是显式 SE(3)-等变网络；它依靠随机旋转/平移增强、全局 alignment loss 和大量结构数据学习坐标分布。这样牺牲了一部分手工几何约束，但换来了对任意化学图更简单的表达。</p>\n<h5>扩散损失：aligned MSE + ligand/nucleic acid 加权 + bond/smooth-LDDT</h5>\n<p>由于整体结构可以任意旋转和平移，AF3 先把真实坐标刚体对齐到预测坐标：</p>\n<div class=\"kb-math kb-math-display\">\\{x_l^{\\text{GT-aligned}}\\}\n= \\text{weighted\\_rigid\\_align}\n\\left(\n\\{x_l^{\\text{GT}}\\}, \\{x_l\\}, \\{w_l\\}\n\\right)</div>\n<p>然后计算加权 MSE：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{MSE}}\n= \\frac{1}{3}\n\\operatorname{mean}_l\n\\left[\nw_l\n\\left\\|\nx_l - x_l^{\\text{GT-aligned}}\n\\right\\|_2^2\n\\right]</div>\n<p>权重对核酸和 ligand 原子上调，避免训练被蛋白原子数量主导：</p>\n<div class=\"kb-math kb-math-display\">w_l =\n1\n+ f_l^{\\text{is\\_dna}}\\alpha_{\\text{dna}}\n+ f_l^{\\text{is\\_rna}}\\alpha_{\\text{rna}}\n+ f_l^{\\text{is\\_ligand}}\\alpha_{\\text{ligand}}</div>\n<p>补充材料给出：</p>\n<div class=\"kb-math kb-math-display\">\\alpha_{\\text{dna}} = \\alpha_{\\text{rna}} = 5,\\qquad\n\\alpha_{\\text{ligand}} = 10</div>\n<p>对共价连接 ligand/glycan，fine-tuning 中加入 bond loss：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{bond}}\n=\n\\operatorname{mean}_{(l,m)\\in B}\n\\left(\n\\|x_l-x_m\\|_2\n-\n\\|x_l^{\\text{GT}}-x_m^{\\text{GT}}\\|_2\n\\right)^2</div>\n<p>最终 diffusion loss 为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{diffusion}}\n=\n\\frac{\\hat{t}^2+\\sigma_{\\text{data}}^2}\n{(\\hat{t}+\\sigma_{\\text{data}})^2}\n\\left(\n\\mathcal{L}_{\\text{MSE}}\n+ \\alpha_{\\text{bond}}\\mathcal{L}_{\\text{bond}}\n\\right)\n+ \\mathcal{L}_{\\text{smooth\\_lddt}}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\sigma_{\\text{data}}=16</span>，<span class=\"kb-math kb-math-inline\">\\alpha_{\\text{bond}}</span> 在常规训练为 0，在两个 fine-tuning 阶段为 1。这个目标让高噪声阶段学习全局构象，低噪声阶段学习局部键长、接触和立体化学。</p>\n<h5>训练与推理：多样本生成后用置信度排序</h5>\n<p>AF3 的训练包含 initial training 和两个 fine-tuning 阶段，crop size 从 384 token 增加到 640 和 768。为了提高 diffusion module 训练效率，论文在一次 trunk 前向后，生成多份随机旋转/平移和独立加噪的结构副本，并行训练 diffusion module。因为 diffusion module 比 trunk 便宜，这能显著增加坐标监督样本量。</p>\n<p>推理时 AF3 通常不是只生成一个结构。论文主结果中常用多个 model seeds，每个 seed 再产生多个 diffusion samples，最后按 confidence module 排名选择最可信候选。这个流程体现了扩散模型的分布式输出：对于不确定界面或柔性 ligand，多个样本可以探索不同构象，但最终交给用户的仍是按置信度排序的结构。</p>\n<h5>与 AlphaFold 2 的区别</h5>\n<p>AF2 的归纳偏置非常蛋白专用：残基刚体、侧链角、IPA、FAPE 都围绕氨基酸几何设计。AF3 则将“结构模块”抽象成对任意原子坐标的条件扩散，减少化学特例。它还降低了 MSA 在主干中的比重，因为 ligand、离子和许多修饰没有可比的进化序列信息。</p>\n<p>这种改变带来两个重要结果：一方面，AF3 可以处理几乎所有 PDB 中常见的分子类型，尤其是蛋白-配体和蛋白-核酸；另一方面，它的输出仍是静态结构预测，不直接提供结合自由能、动力学速率、反应路径或实验条件下的构象分布。对于药物发现，AF3 的 ligand pose 很有价值，但亲和力排序通常还需要 docking/FEP/MD/实验或 Boltz-2 这类专门 affinity 模块补充。</p>",
      "quiz": {
        "q": "AlphaFold 3 为什么用扩散模块替代 AlphaFold 2 的 Structure Module？",
        "options": [
          "为了只预测蛋白质单链，不再处理复合物",
          "为了直接在任意原子坐标上建模，避免蛋白专用的残基 frame 和侧链 torsion 表示限制",
          "为了完全删除 Pairformer 和 pair representation",
          "为了让模型输出结合自由能而不是结构"
        ],
        "answer": 1,
        "explain": "AF3 需要统一处理蛋白、核酸、小分子、离子和修饰残基；全原子扩散比 AF2 的蛋白专用 frame/torsion 结构模块更容易覆盖任意化学图。"
      }
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
      "summary": "YuelDesign 提出一个同时生成蛋白口袋构象和配体三维结构的双扩散框架，解决传统结构化药物生成模型把受体口袋视为刚体、难以表达 induced-fit 柔性变化的问题。它用 E3former 维持三维等变性，用 EDM 处理连续坐标、D3PM 处理离散原子类型，再通过后处理重建化学键。",
      "keyPoints": [
        "全原子口袋-配体联合建模：把口袋原子和小分子原子拼接成同一个三维坐标系统，而不是只固定蛋白、生成配体。",
        "E3former 主干：借鉴 AlphaFold/Evoformer 的序列、pair、triangle attention/multiplication 模块，但去掉 MSA，增加 E(3) 等变坐标头直接预测原子位移。",
        "双扩散策略：连续坐标使用 EDM 加噪/去噪，离散配体原子类型使用 D3PM 分类转移，从而同时优化几何位置和化学身份。",
        "口袋柔性编码：口袋定义为距配体任一原子 6 Å 内的蛋白残基，序列特征区分骨架、侧链和配体原子，pair 特征包含同残基标记和原子间距离。",
        "数据与泄漏控制：使用 Binding MOAD 蛋白-配体复合物，按 8:2 划分训练/测试，并用 BLASTp、TM-align、口袋 RMSD 和 RDKit Tanimoto 相似度过滤相似蛋白或配体。",
        "后处理化学约束：扩散后执行 bond reconstruction，缓解三维坐标独立生成导致的断裂分子和异常大环问题。",
        "评估维度：报告连接性、大环比例、QED、Lipinski RO5、SAS、validity、功能团分布、口袋 RMSD、MedusaDock/redocking 能量和相互作用保留情况。"
      ],
      "detail": "<p>来源说明：任务给出的 PubMed 链接对应 2025 年 bioRxiv 预印本记录；可访问全文还包括 PMC 上的 Science Advances 版本，论文页面列出代码仓库 <code>https://github.com/dokhlab/yuel_design</code> 与 <code>https://github.com/hust220/yuel_design</code>。以下方法解读以可访问全文和 PubMed 摘要为主。</p>\n<p><img alt=\"YuelDesign 工作流与 E3former 架构\" src=\"https://cdn.ncbi.nlm.nih.gov/pmc/blobs/4ec4/13060587/c5730b30d082/sciadv.aeb7045-f1.jpg\" />\n<em>图：YuelDesign 从口袋提取开始，对口袋-配体复合体进行联合加噪和去噪；E3former 用序列特征、pair 特征和等变坐标头同时更新原子类型与三维坐标。</em></p>\n<pre><code class=\"language-python\"># YuelDesign 训练与采样伪代码\nfor complex in Binding_MOAD:\n    pocket = residues_with_any_atom_within_6A(ligand)\n    x0 = concat_coordinates(pocket_atoms, ligand_atoms)\n    a0 = ligand_atom_types\n    seq_feat, pair_feat = build_atom_and_pair_features(pocket, ligand)\n\n    # 训练：连续坐标 EDM + 离散原子类型 D3PM\n    t = sample_time_step()\n    eps = normal_like(x0)\n    xt = alpha[t] * x0 + sigma[t] * eps\n    at = categorical_corrupt(a0, beta[t])\n\n    eps_hat, atom_logits, delta_x = E3former(xt, at, seq_feat, pair_feat, t)\n    loss = masked_mse(eps_hat, eps) + cross_entropy(atom_logits, a0)\n    update(loss)\n\nfor target_pocket in new_targets:\n    xT = gaussian_noise_for_pocket_and_ligand()\n    aT = random_atom_type_distribution()\n    for t in reversed(range(T)):\n        eps_hat, atom_logits, delta_x = E3former(xT, aT, features, t)\n        xT = edm_reverse_step(xT, eps_hat, t)\n        aT = d3pm_reverse_step(aT, atom_logits, t)\n    molecule = reconstruct_bonds(xT, aT)\n</code></pre>\n<p>YuelDesign 的关键动机是：配体结合时蛋白口袋并不是一个静止容器，侧链旋转、局部接触和口袋形状会随配体改变。DiffSBDD、PMDM 等 3D 分子扩散模型通常以固定口袋作为条件，只在口袋内生成配体坐标；这种做法容易错过 induced-fit 形成的新氢键、疏水接触或 π-π stacking。YuelDesign 反过来把口袋和配体放进同一个生成对象中，让蛋白侧链和配体一起经历扩散轨迹。</p>\n<p>连续坐标部分采用 EDM 风格的加噪过程。对原子坐标 <span class=\"kb-math kb-math-inline\">x_0</span>，前向过程写作：</p>\n<div class=\"kb-math kb-math-display\">x_t = \\alpha_t x_0 + \\sigma_t \\epsilon,\\quad \\epsilon \\sim \\mathcal{N}(0, I)</div>\n<p>训练目标是让 E3former 预测真实噪声，常用形式可概括为带 mask 的均方误差：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{coord} =\n\\left\\|M \\odot \\left(\\epsilon_\\theta(x_t, a_t, t, c)-\\epsilon\\right)\\right\\|_2^2</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">c</span> 表示口袋-配体条件特征，<span class=\"kb-math kb-math-inline\">M</span> 用于只在需要学习的原子或坐标上计算损失。离散原子类型不能直接加高斯噪声，因此使用 D3PM：前向过程用转移矩阵逐步扰动类别标签，反向网络输出每个位置的 atom-type logits，并用交叉熵或离散扩散的变分项训练：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{atom} = - \\sum_i \\log p_\\theta(a_{0,i}\\mid a_{t,i}, x_t, c, t)</div>\n<p>E3former 是把这两个扩散头连接起来的主干。它把每个原子当作 token，sequence features 存储原子类型、蛋白/配体身份、骨架/侧链标记；pair features 存储两原子是否同残基、欧氏距离等几何关系。每个 block 先用 sequence attention 和 transition 更新单原子表示，再用 outer product、triangle attention 和 triangle multiplication 更新两两关系。坐标头聚合相对方向向量，形式上可理解为：</p>\n<div class=\"kb-math kb-math-display\">\\Delta x_i = \\sum_{j\\ne i} w_{ij}\\frac{x_i-x_j}{\\|x_i-x_j\\|+\\varepsilon}</div>\n<p>因为只使用相对方向和基于 pair embedding 的权重，整体对平移和旋转保持 E(3) 等变：旋转输入会旋转输出位移，平移输入不会改变相对位移。这对三维结构生成很重要，否则模型可能学习到坐标系伪规律，而不是分子几何。</p>\n<p>生成流程从随机坐标和随机原子类别开始，逐步反向去噪。早期步骤决定粗略空间布局和口袋-配体相对位置，中后期步骤细化原子类型、键长、侧链微调和构象变化。论文还专门分析了 denoising trajectory，观察 atom type transitions、bond dynamics 和 conformational adjustments，说明模型不是一次性输出分子，而是在扩散轨迹中逐步稳定化结构。</p>\n<p>与传统刚性口袋生成相比，YuelDesign 的优势在于把“配体设计”和“口袋可适配性”放在同一个生成问题里。论文报告生成口袋相对 native pocket 的 median RMSD 约 1.8 Å，这个量级符合局部侧链调整而非大范围折叠变化；在 PTR1 等案例中，模型可保留关键 π-π interaction，同时产生新的 residue-ligand contacts。局限也很明确：扩散初期没有显式价键约束，容易出现小环或异常连接，需要 bond reconstruction 和后续化学过滤；分子越大，联合扩散维度越高，去噪误差也更容易积累。</p>",
      "quiz": {
        "q": "YuelDesign 为什么要同时扩散蛋白口袋和配体，而不是只把口袋作为固定条件？",
        "options": [
          "为了减少 E3former 的参数量",
          "为了显式建模配体结合诱导的口袋侧链和局部构象变化",
          "为了避免使用任何化学键重建步骤",
          "为了把所有原子类型都转换成连续变量"
        ],
        "answer": 1,
        "explain": "YuelDesign 的核心目标是处理 flexible protein pockets；联合生成口袋和配体可以让侧链调整、局部接触和配体几何在同一扩散轨迹中协同优化。"
      }
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
