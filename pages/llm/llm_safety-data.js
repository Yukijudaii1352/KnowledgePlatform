/**
 * llm_safety-data.js — 由 pipeline/build.py 于 2026-06-15 17:41:33 自动生成。
 * 源文件：content/llm/llm_safety.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "llm",
    "topic_id": "llm_safety",
    "topic_name": "LLM安全 算法总结",
    "page_title": "LLM安全 算法总结",
    "page_subtitle": "2026-06-15 版",
    "page_desc": "涵盖从早期RLHF对齐到2026年神经元级攻防与过程化幻觉控制的技术演进",
    "page_icon": "🛡️",
    "hero_pills": [
      "越狱攻防 · 幻觉控制 · 价值观对齐 · 内容安全"
    ],
    "count_pill": "{count} 个算法",
    "image_base": "",
    "overview_from_doc": true,
    "latest_overview_from_doc": true
  },
  "overview": [
    {
      "title": "",
      "body_html": "<h1>报告分享 | 大语言模型安全和隐私研究综述</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/18444847767\">https://zhuanlan.zhihu.com/p/18444847767</a></li>\n<li>作者: 爱学习的猴先生</li>\n</ul>\n<hr />\n<p>报告分享 | 大语言模型安全和隐私研究综述</p>\n<h1>报告分享 | 大语言模型安全和隐私研究综述</h1>\n<p>作者: 爱学习的猴先生, 赞: 3</p>\n<blockquote>\n<p>大语言模型的强大能力和广泛应用引发了大量的相关研究，尤其是其在安全和隐私方面所带来的问题。本报告以 2024 年发表在《High-Confidence Computing》期刊上的一篇综述论文为核心，介绍大语言模型安全和隐私研究概况。</p>\n</blockquote>\n<h2>1 背景和动机</h2>\n<p>大型语言模型（Large Language Model，LLM）是具有大量参数且执行预训练任务（例如，掩码语言建模和自回归预测）的语言模型，它通过对来自大量文本数据的语义和概率进行建模，来理解和处理人类语言。例如 ChatGPT 和 Bard，已经彻底改变了自然语言的理解和生成，它们拥有深厚的语言理解能力、文本生成能力、上下文意识和解决问题的能力，广泛应用于搜索引擎、客户支持、翻译等诸多领域。</p>\n<p>有许多 LLM 在 2023 年开发并发布，非常受欢迎。著名的例子包括 OpenAI 的 <a href=\"https://link.zhihu.com/?target=https%3A//cdn.openai.com/papers/gpt-4.pdf\">ChatGPT</a>，MetaAI 的 <a href=\"https://link.zhihu.com/?target=https%3A//ai.meta.com/blog/large-language-model-llama-meta-ai/\">LLaMA</a>，Databtick 的 <a href=\"https://link.zhihu.com/?target=https%3A//www.databricks.com/blog/2023/04/12/dolly-first-open-commercially-viable-instruction-tuned-llm\">Dolly</a>。LLM 在安全界越来越受欢迎，截至 2023 年 2 月一项研究报告称，GPT-3 在一个代码存储库中发现了 213 个安全漏洞（只有 4 个被证明是假阳性）。相比之下，市场上领先的商业工具只检测到了 99 个漏洞。最近，一些由 LLM 驱动的安全论文出现在了著名的会议上。例如 2023 年的 S&amp;P 会议，<a href=\"https://link.zhihu.com/?target=https%3A//doi.org/10.1109/SP46215.2023.10179324\">Pearce H.等人</a>进行了一项商用 LLM 的调查，表明大模型能够成功解决安全漏洞环境下的代码合成场景。2024 年的 NDSS 会议，<a href=\"https://link.zhihu.com/?target=https%3A//doi.org/10.1145/3597503.3639121\">Fuzz4All 工具</a>展示了使用 LLM 对输入数据的生成和变异，创新了一种自动提示技术和模糊测试循环。</p>\n<p>这些显著的初步尝试促使深入研究三个与安全相关的关键研究问题：</p>\n<ul>\n<li>问题 1：LLM 如何对不同领域的安全和隐私产生积极影响？</li>\n<li>问题 2：LLM 会对网络安全领域产生哪些潜在的风险？</li>\n<li>问题 3：LLM 自身有哪些漏洞和弱点，如何抵御这些威胁？</li>\n</ul>\n<p>为了全面解决这些问题，综述进行了细致的文献回顾，收集了 281 篇关于 LLM 与安全和隐私相关的论文。将这些论文分为三组</p>\n<ul>\n<li>The Good：那些强调 LLM 有利于安全的文献</li>\n<li>The Bad：那些探索利用 LLM 破环安全的文献</li>\n<li>The Ugly：那些关注讨论 LLM 自身漏洞的文献</li>\n</ul>\n<h2>2 大语言模型</h2>\n<p>大语言模型代表了语言模型的演变，最初的语言模型在本质上是基于统计学的，为计算语言学奠定了基础，Transformer 的出现大大增加了它们的规模。这些模型在大量的数据集上经过了广泛的训练，以理解和产生模仿人类语言的文本，由此在自然语言处理领域取得了许多实质性的进展。根据<a href=\"https://link.zhihu.com/?target=https%3A//doi.org/10.1145/3649506\">Yang 等人</a>的研究，一个 LLM 应该至少有 4 个关键特征。</p>\n<ol>\n<li>理解能力。模型应该展示对自然语言文本的深刻理解，能够提取信息并执行各种语言相关的任务（如翻译）。</li>\n<li>提示生成。模型应该有能力在提示时生成类似于人类习惯的文本。</li>\n<li>上下文意识。模型应该通过考虑领域专业知识等因素来表现出上下文意识。</li>\n<li>问题决策。模型应该擅长利用文本段落中下信息来解决问题和做出决策。</li>\n</ol>\n<p>此外，该研究还整理了大语言模型的发展演化树，根据时间轴进行了阶段划分，按模型采用的不同框架进行颜色标记，同时还区分了开源和闭源项目，标注了发布机构，如图 1 所示。</p>\n<p>https://arxiv.org/abs/2304.13712 (二维码自动识别)</p>\n<p>越来越多的大语言模型相继发布，相应地出现了对不同模型的能力测评，下列是比较主流的开源测评榜单：</p>\n<ul>\n<li><a href=\"https://link.zhihu.com/?target=https%3A//huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard%23/\">Open LLM Leaderboard</a>：由 Hugging Face 发布的评测榜单，主要针对英文的开源大型语言模型和聊天机器人进行跟踪、排名和评估，旨在提供一个标准化的方法来评估和比较不同开源模型的性能。</li>\n<li><a href=\"https://link.zhihu.com/?target=https%3A//lmarena.ai/%3Fleaderboard\">Chatbot Arena LLM Leaderboard</a>：由 LMSYS 组织发布的一个大语言模型评测排行榜，通过众包的方式对大模型进行匿名评测，然后由一个或多个匿名的大模型同时返回结果，最终形成不同的大模型众包的评测结果。</li>\n<li><a href=\"https://link.zhihu.com/?target=https%3A//cevalbenchmark.com/static/leaderboard_zh.html\">C-Eval</a>：一个全面的中文基础模型评估套件，由上海交通大学、清华大学和爱丁堡大学合作开发，评估中文环境下的高级知识和推理能力，包含了 13948 个多项选择题，涵盖了 52 个不同的学科和四个难度级别。</li>\n</ul>\n<h2>3 文献综述</h2>\n<p>大语言模型在不同的领域都具有深远的影响，综述深入探讨其在安全和隐私环境下发挥的角色，围绕<code>Good</code>，<code>Bad</code>和<code>Ugly</code>三类进行全面的文献回顾。在谷歌学术上收集的相关论文，数量和时间分布如图 2 所示。大部分论文发表在 2023 年，每月发表的论文数量呈持续上升驱动。</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-4a509fec2cca1d5b8676dfba601cb8c6_1440w.jpg\" /></p>\n<p>图2 相关文献分布</p>\n<p><em>发现 1：大多数研究人员倾向于使用 LLM 来支持安全，LLM 对安全社区的贡献积极（用于漏洞检测）大于消极（制作攻击工具）。</em></p>\n<h3>3.1 The Good</h3>\n<p>代码安全。大语言模型可以跨越多种编程语言和不同代码片段，利用其高级语言理解能力来检查代码相关的文本，在整个代码安全生命周期重扮演关键角色，包括程序编写、测试用例生成、执行监控。</p>\n<p><strong>程序编写方面</strong></p>\n<ul>\n<li>Sandoval 等人的研究发现学生程序员在 LLM 协助下编写的代码没有引入新的安全风险。</li>\n<li>SVEN 方案利用连续提示词来控制 LLM 生成安全的代码。</li>\n<li>SALLM 涉及一个由安全数据集、评估环境和新指标组成的框架，用于系统评估 LLM 生成安全代码的能力。</li>\n<li>......</li>\n</ul>\n<p><strong>测试用例生成方面</strong></p>\n<ul>\n<li>Libro 涉及一个使用 LLM 自动生成测试用例以重现软件安全漏洞的框架。</li>\n<li>FuzzGPT 方案旨在为深度学习库进行模糊测试，通过使用历史错误来触发程序启动 LLM，解决边缘情况测试的需求。</li>\n<li>Fuzz4All 方案利用 LLM 作为输入生成器和变异引擎，为各种编程语言创建多样化且真实的输入。</li>\n<li>......</li>\n</ul>\n<p><strong>执行监控方面</strong></p>\n<ul>\n<li>LATTE 是一种由 LLM 驱动的新型静态二进制污点分析方法，超越了现有的最先进技术，在真实固件中发现了 37 个新的错误。</li>\n<li>KARTAL 利用 LLM 进行 Web 应用程序漏洞检测，每秒可进行 539 次预测。</li>\n<li>Pentest GPT 是一种自动化渗透测试工具，它利用 LLM 固有的领域知识来解决渗透测试的各个子任务，从而显著提高任务完成率</li>\n<li>Apiiro 是一个使用 LLM 的恶意代码分析工具，结合了专有代码分析、概率采样等方法以识别潜在恶意代码。</li>\n<li>......</li>\n</ul>\n<p><em>发现 2：大多数研究人员得出结论，基于 LLM 的方法优于传统方法，常有的问题是检测结果往往出现较高的误报和漏报。</em></p>\n<p>数据安全。大语言模型在数据安全领域也有许多贡献，提供了保护敏感信息的多种方法，包括数据完整性，确保数据在整个生命周期内不被破坏；数据可靠性，确保数据的准确；数据机密性，防止未经授权的访问和泄露；数据可追溯性，涉及监控数据访问和使用情况。</p>\n<p><strong>数据完整性方面</strong></p>\n<ul>\n<li>Liu 等人尝试使用 LLM 制定针对减轻勒索软件攻击的网络安全政策，建议将 GPT 纳入数据治理、风险和合规政策的制定中。</li>\n<li>Amine 等人引入了一种基于 LLM 的监控框架，应用于自动驾驶的有限状态机策略和用于对象操作的学习策略。</li>\n<li>HuntGPT 是一种基于 LLM 的网络异常检测入侵检测系统，它在提高用户理解和交互方面有一定效果。</li>\n<li>......</li>\n</ul>\n<p><strong>数据可靠性方面</strong></p>\n<ul>\n<li>Takashi 等人建议使用 ChatGPT 来检测包含网络钓鱼内容的网站，实验结果显示出良好的性能，具有很高的准确率和召回率。</li>\n<li>Fredrik 等人评估了四种大语言模型检测网络钓鱼电子邮件中恶意意图的能力，发现它们甚至超过了人类的检测，尽管有时准确度略低。</li>\n<li>IPSDM 模型可以有效识别网络钓鱼和垃圾邮件，在对不平衡和平衡数据集中的电子邮件进行分类方面表现出色。</li>\n<li>......</li>\n</ul>\n<p><strong>数据机密性方面</strong></p>\n<ul>\n<li>Arpita 等人使用 LLM 通过将文本数据中的识别信息替换为通用标记来保护隐私。</li>\n<li>Hyeokdong 等人探索使用 ChatGPT 实现加密，最终保护数据机密性。</li>\n<li>......</li>\n</ul>\n<p><strong>数据可追溯性方面</strong></p>\n<ul>\n<li>Scanlon 等人探讨了 ChatGPT 如何帮助分析操作系统文件，以及如何检查内存转储以检测可疑活动或攻击模式。</li>\n<li>Sladić 等人提出，可以使用像 ChatGPT 这样的生成模型来创建逼真的蜜罐来欺骗人类攻击者。</li>\n<li>Li 等人提出了第一个水印技术来保护基于大型语言模型的代码生成 API 免受远程模仿攻击。</li>\n<li>......</li>\n</ul>\n<p><em>发现 3：大语言模型在数据保护方面表现出色，超越了当前的解决方案，ChatGPT 的多功能性和有效性使其成为各种安全相关任务的首选。</em></p>\n<h3>3.2 The Bad</h3>\n<p>综述根据攻击在系统基础设施中的位置将攻击分为五类，分别是硬件级攻击、操作系统级攻击、软件级攻击、网络级攻击和用户级攻击。如图 3 所示，上色的框表示已被证明可以使用 LLM 执行的攻击，灰色的框表示不能使用 LLM 执行的攻击。</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-ad18426881df8c52b4db27d0ef614032_1440w.jpg\" /></p>\n<p>图3 网络攻击分类</p>\n<p><strong>硬件级攻击</strong></p>\n<ul>\n<li>Yaman 探索了 LLM 技术在开发旁道分析方法中的应用，该研究评估了基于 LLM 的方法在 AES 旁道分析和深度学习加速器旁道分析有效。</li>\n<li>......</li>\n</ul>\n<p><strong>操作系统级攻击</strong></p>\n<ul>\n<li>Andreas 等人建立了一个反馈循环，通过 SSH 将 LLM 连接到易受攻击的虚拟机，允许 LLM 分析机器的状态、识别漏洞并提出具体的攻击策略，然后在虚拟机内自动执行。</li>\n<li>......</li>\n</ul>\n<p><strong>软件级攻击</strong></p>\n<ul>\n<li>Mika 等人提出了一个概念验证，其中 ChatGPT 被用于分发恶意软件，同时避免被发现。</li>\n<li>Antonio Monje 等人演示了如何诱骗 ChatGPT 快速生成勒索软件。</li>\n<li>Marcus Botacin 探索了不同的编码策略（例如，生成整个恶意软件、创建恶意软件功能），并研究了 LLM 重写恶意软件代码的能力。</li>\n<li>......</li>\n</ul>\n<p><strong>网络级攻击</strong></p>\n<ul>\n<li>Julian Hazell 通过使用 ChatGPT 为 600 多名英国国会议员生成逼真且经济高效的网络钓鱼消息，展示了鱼叉式网络钓鱼活动的可扩展性。</li>\n<li>Wang 等人讨论了传统防御在 LLM 时代如何失败，验证码涉及扭曲的字母和数字，很难检测依赖文本和语音的聊天机器人。</li>\n<li>Tyson 等人研究了修改 ChatGPT 的输入如何影响生成的电子邮件的内容，使其更具说服力。</li>\n<li>......</li>\n</ul>\n<p><strong>用户级攻击</strong></p>\n<ul>\n<li>错误信息。LLM 生成的内容更难检测，并且可能使用更具欺骗性的风格，可能造成更大的危害。Canyu Chen 等人提出了 LLM 生成的错误信息的分类方法和验证方法。</li>\n<li>社会工程学。Stabb 等人的研究 强调了训练有素的 LLM 能够从文本中推断出个人属性，例如位置、收入和性别，他们还揭示了这些模型如何从看似良性的查询中提取个人信息。</li>\n<li>学术不端行为。不负责任地使用 LLM 可能会导致与科学不端行为相关的问题，这些问题源于 LLM 生成原创、连贯文本的能力。Kavita Kumari 等人提出了 DEMASQ，这是一种精确的 ChatGPT 生成内容检测器。</li>\n<li>网络欺诈。FraudGPT 可以创建与银行相关的欺诈电子邮件，暗示内容中存在恶意链接，它还可以列出经常被攻击的网站或服务。网络犯罪工具 WormGPT 提供无限字符支持和聊天记忆保留等功能，该工具在机密数据集上进行了训练，重点关注恶意软件相关数据和欺诈相关数据。</li>\n</ul>\n<p><em>发现 4：与其他攻击相比用户级攻击最为普遍，目前 LLM 还不具备对操作系统级或硬件级功能的访问。</em></p>\n<h3>3.3 The Ugly</h3>\n<p>综述深入探讨与 LLM 自身存在的普遍威胁和漏洞，并研究大语言模型背景下的具体风险挑战和防御措施，如图 4 所示。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-1fc6514e3a531811b2082977d857a817_1440w.jpg\" /></p>\n<p>图4 针对LLM的风险与防御分类</p>\n<p><strong>针对 LLM 的风险</strong></p>\n<ul>\n<li>\n<p>内在风险</p>\n</li>\n<li>\n<p>对抗性攻击。有意操纵或欺骗机器学习模型的技术和策略，目的是利用模型行为中的漏洞。</p>\n</li>\n<li>\n<p>数据投毒。攻击者通过向训练数据集注入恶意数据来影响训练过程，引入漏洞或偏差，危及模型的输出结果。Alexander 等人表明，即使只有 100 个投毒示例，LLM 也会在各种任务中产生一致的负面结果或有缺陷的输出。</p>\n</li>\n<li>\n<p>后门攻击。攻击者恶意操纵训练数据和模型处理，将隐藏的后门漏洞嵌入到模型中，与投毒的区别在于后门在遇到触发器时产生特定行为或响应。Yao 等人提出了一种双向后门，它将触发机制与提示词微调相结合。</p>\n</li>\n<li>\n<p>推理攻击。通过对模型进行特定查询或观察来获取有关机器学习模型或其训练数据的敏感信息。</p>\n</li>\n<li>\n<p>属性推理。Robin 等人首次全面检查了预训练的 LLM 从文本推断个人信息的能力，该研究使用真实的 Reddit 个人资料数据集，表明当前的 LLM 可以高精度地推断各种个人信息（例如位置、收入、性别）。</p>\n</li>\n<li>\n<p>成员推理。在给定对模型和特定数据记录的白盒/黑盒访问的情况下，确定数据记录是否是模型训练数据集的一部分。各种研究通过分析标签、确定阈值、开发通用公式等方法探索各种成员推理攻击。</p>\n</li>\n<li>\n<p>提取攻击。攻击者试图从机器学习模型或其相关数据中提取敏感信息或见解。与推理攻击不同之处在于，提取攻击旨在直接获取特定资源（例如模型梯度、训练数据）或机密信息。Truong 等人的工作可在无需访问原始模型数据即可复制模型的能力。</p>\n</li>\n<li>\n<p>偏见和不公平利用。模型表现出偏见结果或歧视行为。Urman 等人发现遵守政府的审查指导方针可能会产生偏见。Huang 等人发现在 LLM 生成的代码中也可能存在偏差。</p>\n</li>\n<li>\n<p>指令调优攻击。基于指令的微调是一种机器学习技术，提供明确的指令或示例来训练和调整特定任务的语言模型，这类攻击旨在通过指令微调利用 LLM 中的漏洞或限制。</p>\n</li>\n<li>\n<p>越狱攻击。绕过安全功能解锁通常受安全协议限制的功能。MASTERKEY 采用了一种基于时间的方法来剖析防御，并演示了概念验证攻击。Cao 等人开发了 RA-LLM，这是一种降低对抗和越狱提示成功率的方法，无需重新训练或访问模型参数。</p>\n</li>\n<li>提示注入。描述了一种操作 LLM 行为以引发意外且可能有害的响应的方法，这种技术可以绕过模型的安全措施。大量研究已经能够自动化识别提示中的语义并保留有效载荷的过程，He 等人探索了利用在大量数据集上训练的 LLM 来缓解此类攻击的转变。</li>\n<li>拒绝服务。一种网络攻击，旨在耗尽计算资源，造成延迟或使资源不可用，攻击者使用故意构建的提示来降低模型的可用性。Shumailov 等人证明了在 LLM 领域进行海绵攻击的可能性，最大化能耗和延迟提高 10 到 200 倍，引起了自动驾驶汽车领域的关注。</li>\n</ul>\n<p><em>发现 5：关于模型提取、参数提取等攻击仍然主要是在理论层面，LLM 中参数的规模使得这些传统方法复杂化，甚至不可行。</em></p>\n<ul>\n<li>\n<p>非内在风险</p>\n</li>\n<li>\n<p>远程代码执行。这类攻击通常不直接适用于 LLM，但如果 LLM 集成在 Web 服务中，并且该服务的底层基础架构或代码中存在远程代码执行漏洞，则可能会导致 LLM 环境受到损害。</p>\n</li>\n<li>\n<p>侧信道。在实际部署场景中，LLM 可能容易受到某些侧信道攻击。Edoardo 等人引入了隐私侧信道攻击，这些攻击利用系统级组件（例如数据过滤、输出监控）以比独立模型高得多的速率提取私人信息。</p>\n</li>\n<li>\n<p>供应链漏洞。LLM 应用程序生命周期中可能因使用易受攻击的组件或服务而产生的风险，例如第三方数据集、预训练模型和插件。一些用于增强 LLM 功能的插件，包括网络搜索、文本分析等，可能被用于窃取聊天记录、访问个人信息。</p>\n</li>\n</ul>\n<p><strong>针对 LLM 的防御</strong></p>\n<p><em>架构防御</em></p>\n<ul>\n<li>Li 等人发现，与较小的模型相比，使用适当的非标准超参数，可以更有效地以差异隐私方式训练具有较大参数大小的语言模型。</li>\n<li>Zhu 等人和 Li 等人发现，具有较大容量的 LLM（例如具有更大参数大小的 LLM）通常表现出对对抗性攻击的增强的鲁棒性。</li>\n<li>Zafar 等人旨在通过知识图谱增强 LLM 的推理能力，从而建立对人工智能的信任。</li>\n<li>......</li>\n</ul>\n<p><em>训练防御</em></p>\n<p>LLM 训练的核心组件包括模型架构、训练数据和优化方法。</p>\n<ul>\n<li>语料库清理。从网络收集的原始语料库充满了多种问题，一般处理流程包括：语言识别、去毒化、去偏见、去识别化和去重复。</li>\n<li>优化方法。指导 LLM 从训练数据中学习，鼓励或惩罚相应的行为。安全对齐是一种新兴的学习范式，使用对齐良好的附加模型或人工注释来指导 LLM 行为，证明对道德对齐非常有效。</li>\n</ul>\n<p><em>推理防御</em></p>\n<p>LLM 提供服务时接收用户的提示并生成完整的句子作为响应，在这种交互模式下的防御措施一般包括提示指令的预处理，检测有问题的查询事件，以及生成的响应后处理以确保它们遵守道德准则。</p>\n<ul>\n<li>\n<p>指令预处理</p>\n</li>\n<li>\n<p>Jain 等人和 Kirchenbauer 等人评估了多种针对越狱攻击的基线预处理方法，包括重新标记和释义。</p>\n</li>\n<li>Li 等人提出通过首先屏蔽输入标记，然后用其他 LLM 预测屏蔽的标记来净化指令，预测的标记将作为纯化的指令。</li>\n<li>Wei 等人和 Mo 等人证明在指令中插入预定义的防御演示可以有效防御 LLM 的越狱攻击。</li>\n<li>\n<p>......</p>\n</li>\n<li>\n<p>异常检测</p>\n</li>\n<li>\n<p>Xi 等人从掩码敏感度的角度区分了正常指令和中毒指令。</p>\n</li>\n<li>Shao 等人根据文本相关性识别可疑单词。</li>\n<li>Wang 等人根据多代之间的语义一致性检测对抗性示例.</li>\n<li>\n<p>......</p>\n</li>\n<li>\n<p>生成后处理</p>\n</li>\n<li>\n<p>Chen 等人提出通过与多个模型候选者进行比较来减轻生成的毒性。</p>\n</li>\n<li>Helbling 等人结合了单独的 LLM 来识别生成答案的有害性。</li>\n<li>......</li>\n</ul>\n<p><em>发现 6：明显缺乏模型架构对 LLM 安全性影响的研究，同时安全指令微调是一个相对较新的方向，值得进一步研究和关注。</em></p>\n<h2>4 未来方向</h2>\n<p><strong>将 LLM 用于特定的机器学习任务。</strong> LLM 可以有效地取代传统的机器学习方法，在这种情况下，如果传统的机器学习方法可以用于特定的安全应用（无论是攻击性还是防御性），那么 LLM 也极有可能用于解决这一特定挑战。</p>\n<p><strong>取代人类的努力。</strong> LLM 有潜力在进攻性和防御性安全应用中取代人类的努力。例如，传统上依赖于人为干预的社会工程任务现在可以使用 LLM 技术有效地执行。</p>\n<p><strong>修改传统机器学习攻击应对 LLM。</strong> LLM 中的许多安全漏洞都是传统机器学习场景中发现的漏洞的扩展。也就是说，LLM 仍然是深度神经网络的一个专门的立场，继承了常见的漏洞，例如对抗性攻击和指令调整攻击。</p>\n<p><strong>调整传统机器学习防御应对 LLM。</strong> 传统上用于缓解漏洞的对策也可用于解决这些安全问题。例如，现有的努力利用传统的隐私增强技术（例如零知识证明、差异隐私和联合学习）来应对 LLM 带来的隐私挑战。</p>\n<p><strong>解决 LLM 中特定攻击的挑战。</strong> 实施模型提取或参数提取攻击存在一些挑战例如，LLM 参数的规模巨大、私有所有权和强大 LLM 的机密性。</p>\n<h2>学习笔记</h2>\n<p>大语言模型能力确实很强，本人也有很多时候需要依靠模型提高工作效率，但是使用的时间越长也越能感受到模型的能力范围有限。由于模型本身参数规模大，且模型架构复杂，进行系统地安全性分析将持续成为难点。多数现有研究表明，无法使用模型一步到位，通常要设计某个框架流程，对模型生成的内容提炼筛选。不知道为什么，还是有种炼丹的感觉。最后，附上文献引用和 DOI 链接：</p>\n<blockquote>\n<p>Yao Y, Duan J, Xu K, et al. A survey on large language model (llm) security and privacy: The good, the bad, and the ugly[J]. High-Confidence Computing, 2024: 100211.</p>\n</blockquote>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//doi.org/10.1016/j.hcc.2024.100211\">https://doi.org/10.1016/j.hcc.2024.100211</a></p>"
    }
  ],
  "latest_overview": [
    {
      "title": "",
      "body_html": "<h1>LLM Safety 最新论文推介 - 2026.5.19</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2040063906102629281\">https://zhuanlan.zhihu.com/p/2040063906102629281</a></li>\n<li>作者: ydyjya</li>\n</ul>\n<hr />\n<p>LLM Safety 最新论文推介 - 2026.5.19</p>\n<h1>LLM Safety 最新论文推介 - 2026.5.19</h1>\n<p>作者: ydyjya, 赞: 4</p>\n<blockquote>\n<p>该系列将定期更新arxiv上有关Safety的paper，将会不定时更新，旨在帮助为LLM Safety领域的研究者推送最新的研究进展，并进行快速了解🫡。 此外，我们也将会在GitHub上维护我们有关Safety的Repo，该Repo将会更新LLM Safety的经典Paper以及其他的资料，并且同步更新最新的Paper信息，地址⬇️</p>\n</blockquote>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//github.com/ydyjya/Awesome-LLM-Safety\">😍Awesome-LLM-Safety😍</a></p>\n<h3>1. Hidden State Poisoning Attacks against Mamba-based Language Models</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> IDLab-T2K, Ghent University-imec<br />\n<strong>Author:</strong> Alexandre Le Mercier, Chris Develder, Thomas Demeester<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Hidden State Poisoning&amp;Mamba&amp;Robustness</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2601.01972\">https://arxiv.org/abs/2601.01972</a></p>\n<p><strong>摘要</strong>: 像 Mamba 这样的状态空间模型（SSM）以线性时间复杂度为基于 Transformer 的语言模型提供了高效替代方案。然而，它们的对抗鲁棒性仍然严重缺乏探索。本文研究一种现象：特定的短输入短语会在这类模型中诱发部分遗忘效应，即通过不可逆地覆盖其隐藏状态中的信息来造成影响，本文将其称为隐藏状态投毒攻击（HiSPA）。我们的基准 ROBENCH-25 能够评估模型在遭受 HiSPA 时的信息检索能力，并确认 SSM 对这类攻击的脆弱性。即使是近期的 Jamba-1.7-Mini SSM-Transformer（一个 52B 混合模型），在某些 HiSPA 触发器下也会在 ROBENCH-25 上崩溃，而纯 Transformer 不会。我们还观察到，与纯 Transformer 不同，HiSPA 触发器会显著削弱 Jamba 模型在流行的 OPEN-PROMPT-INJECTIONS 基准上的表现。我们进一步表明，理论和实证发现可扩展到 Mamba-2，并分析了一个基于 Mamba-2 的混合模型（Nemotron-3-Nano）。最后，我们的可解释性研究揭示了 Mamba 隐藏层在 HiSPA 期间的模式，这些模式可用于构建 HiSPA 缓解系统。复现实验的完整代码和数据可在 <a href=\"https://link.zhihu.com/?target=https%3A//anonymous.4open.science/r/hispa_anonymous-5DB0\">https://anonymous.4open.science/r/hispa_anonymous-5DB0</a> 获取。</p>\n<h3>2. Evaluating Prompt Injection Defenses for Educational LLM Tutors: Security-Usability-Latency Trade-offs</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Lumytics<br />\n<strong>Author:</strong> Alexandre Cristovao Maiorano<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Prompt Injection&amp;Guardrails&amp;Educational AI</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.06669\">https://arxiv.org/abs/2605.06669</a></p>\n<p><strong>摘要</strong>: 教育型 LLM 导师面临一个核心的 AI 对齐挑战：它们必须遵循用户意图，同时保持教学约束和安全策略。我们提出一种在该场景中评估提示注入防御的方法，表明护栏设计在对抗鲁棒性、良性任务可用性和响应延迟之间存在明确权衡。我们评估了一个面向特定领域的多层保护流水线，该流水线结合确定性模式过滤器、结构验证、上下文沙箱和会话级行为检查。在包含 480 个查询（369 个注入、111 个良性）的受控留出基准上，该流水线达到 46.34% 的绕过率、0.00% 的误报率和 2.50 ms 的平均延迟，这一运行点优先保证教学可用性（零误报），同时保持可度量的抗攻击能力。我们提供了一个可复现的基准协议，用于在相同条件下进行头对头比较，包括分层 bootstrap 置信区间、配对 McNemar 显著性检验，以及在同一划分和统一 instrumentation 下对 Prompt Guard 与 NeMo Guardrails 的直接评估。结果揭示了操作层面的权衡：NeMo 达到 0% 绕过率，但误报率为 16.22%、延迟为 1.3 秒；Prompt Guard 的绕过率为 38.48%，误报率为 3.60%。该框架支持在不同机构风险和可用性要求下，对 AI 教学系统的护栏选择进行基于证据的决策。</p>\n<h3>3. When Routine Chats Turn Toxic: Unintended Long-Term State Poisoning in Personalized Agents</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> The Hong Kong Polytechnic University<br />\n<strong>Author:</strong> Xiaoyu Xu, Minxin Du, Qipeng Xie, Haobin Ke, Qingqing Ye, Haibo Hu<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Agent Memory&amp;State Poisoning&amp;Personalized Agents</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.06731\">https://arxiv.org/abs/2605.06731</a></p>\n<p><strong>摘要</strong>: 个性化 LLM 代理维护跨会话的持久状态，以支持长周期协作。然而，这种持久性引入了一种微妙但关键的安全漏洞：常规的用户-代理交互可能逐渐重塑代理的长期状态，在不经意间削弱未来的确认边界、扩大工具使用默认设置，并随时间推移升级自主行为。我们将这种风险形式化为非预期长期状态投毒。为系统研究它，我们引入了非预期长期状态投毒基准（ULSPB），这是一个双语基准，包含 350 个设置，覆盖五类辅助场景、七种交互模式、24 轮常规交互，以及匹配的单次注入对应项。此外，我们定义了危害分数（HS），这是一种以状态为中心的度量，用于量化授权漂移、工具使用升级和不受检查的自主性。在 OpenClaw 上使用四个骨干 LLM 的实验表明，虽然单次注入通常有效，但仅常规对话本身也能显著污染长期状态，主要破坏以内存为中心的 artifacts。用真实世界用户交互播种的评估确认，这种风险并非合成提示的人为产物。为缓解该威胁，我们提出 StateGuard，这是一种轻量级的执行后防御，在写回边界审计状态差异，并选择性回滚危险编辑。在所有被评估模型上，StateGuard 将 HS 降至接近零，并降低假阴性率；在安全优先的写回防御下，它具有可接受的较高假阳性率和很小的开销。</p>\n<h3>4. Membership Inference Attacks on Vision-Language-Action Models</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> University of Massachusetts Amherst<br />\n<strong>Author:</strong> Yuefeng Peng, Mingzhe Li, Kejing Xia, Renhao Zhang, Amir Houmansadr<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Membership Inference&amp;Vision-Language-Action&amp;Privacy</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.07088\">https://arxiv.org/abs/2605.07088</a></p>\n<p><strong>摘要</strong>: 成员推断攻击（MIA）已在大型语言模型（LLM）和视觉语言模型（VLM）中得到广泛研究，但其对视觉-语言-动作（VLA）模型的影响仍基本未被探索。VLA 模型在若干重要方面不同于标准 LLM 和 VLM：它们通常在相对较小的具身数据集上进行多个 epoch 的微调，在受约束且结构化的动作空间中运行，并暴露可被观察为可执行行为和时间相关轨迹的动作输出。这些特征表明，成员推断存在一个不同且可能更有信息量的攻击面。在本文中，我们首次系统研究针对 VLA 系统的 MIA。我们形式化了 VLA 模型的两种成员推断设置：针对单个转移样本的样本级推断，以及针对完整具身演示的轨迹级推断。我们进一步在多种访问制度下开发了一组攻击方法，包括严格黑盒访问。我们的攻击同时利用经典 MIA 信号（如 token likelihood）和 VLA 特有信号（如可观察动作误差和时间运动模式）。在多个 VLA 基准和代表性 VLA 模型上，这些攻击取得了很强的推断性能，显示 VLA 模型高度易受成员推断影响。值得注意的是，仅基于生成动作的黑盒攻击也能获得强性能，突显了已部署具身 AI 系统的实际隐私风险。我们的发现揭示了机器人和具身 AI 中此前较少被研究的隐私风险，并强调需要为 VLA 模型开展专门的隐私评估与防御。</p>\n<h3>5. Demystifying and Detecting Agentic Workflow Injection Vulnerabilities in GitHub Actions</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Huazhong University of Science and Technology<br />\n<strong>Author:</strong> Shenao Wang, Xinyi Hou, Zhao Liu, Yanjie Zhao, Xiao Cheng, Quanchen Zou, Xiangzheng Zhang, Haoyu Wang<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Prompt Injection&amp;GitHub Actions&amp;Agentic Workflows</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.07135\">https://arxiv.org/abs/2605.07135</a></p>\n<p><strong>摘要</strong>: GitHub Actions 越来越多地被用于部署面向仓库任务的 LLM 代理，例如 issue 分流、pull-request 审查、代码修改和发布辅助。这些代理式工作流将传统 CI/CD 自动化扩展为具备代理能力的系统，但也创造了新的注入攻击面。本文提出 Agentic Workflow Injection（AWI），这是一类工作流级注入缺陷，其中不受信任的 GitHub 事件上下文（如 issue 正文、pull-request 描述或评论）被纳入代理提示或代理消费的输入，并通过代理工具或下游工作流逻辑转化为受攻击者影响的行为。我们识别了两种核心 AWI 模式：Prompt-to-Agent（P2A），即不受信任内容到达代理提示边界；以及 Prompt-to-Script（P2S），即攻击者影响通过模型或代理派生输出传播到后续脚本。我们首次对 GitHub Actions 中的 AWI 进行了系统研究。我们刻画了 1,033 个真实世界 AI 辅助 action，并提取 AWI 特定的污点规范，包括提示边界、派生输出、代理能力和访问控制接口。基于这些规范，我们设计了 TAINTAWI，这是一种污点分析工具，用于跟踪从不受信任事件上下文到代理提示输入和安全敏感工作流 sink 的流。将 TAINTAWI 应用于来自 10,792 个仓库的 13,392 个真实世界代理式工作流后，我们报告了 519 个潜在 AWI 漏洞，其中 496 个在我们的威胁模型下被确认可利用，精度为 95.6%。其中 343 个是此前未知的零日漏洞。我们优先披露了 187 个零日案例，收到 26 个维护者回应，截至撰写时已有 24 个案例被接受或修复。</p>\n<h3>6. MIPIAD: Multilingual Indirect Prompt Injection Attack Defense with Qwen-TF-IDF Hybrid and Meta-Ensemble Learning</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Bangladesh University of Engineering and Technology<br />\n<strong>Author:</strong> Al Muhit Muhtadi, Mostafa Rifat Tazwar<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Prompt Injection&amp;Multilingual&amp;Ensemble Learning</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.07269\">https://arxiv.org/abs/2605.07269</a></p>\n<p><strong>摘要</strong>: 间接提示注入仍然是检索增强和工具使用型 LLM 系统中的持续弱点，而在多语言场景中，这一问题更难刻画。我们提出 MIPIAD，这是一个在英语和孟加拉语上评估的防御框架，结合了通过 LoRA 从 Qwen2.5-1.5B 微调得到的序列分类器（XLPID）、TF-IDF 词汇特征，以及通过 late fusion、stacking 和 gradient boosting 进行验证调优的集成。该框架在一个由 BIPIA 模板构建的合成基准上评估，覆盖 email、table、QA、abstract 和 code 五类任务，包含超过 143 万个生成样本，并且训练与测试划分使用互斥的攻击类别。在实验中，词汇信号表现出意外的强度（TF-IDF+SVM 的 F1=0.77），混合 XLPID+TF-IDF 集成取得最佳总体 F1（0.9205），而 Boosting Ensemble 取得最佳 AUROC（0.9378）。相较于单独的神经模型，集成方法持续缩小英语-孟加拉语的跨语言差距。该流水线被设计为可扩展：NLLB-200 支持 200 多种语言，XLPID 的多语言骨干无需架构变化即可重新定向到其他语言；当前实证验证仅限于英语和孟加拉语。</p>\n<h3>7. Sparse Autoencoders as Plug-and-Play Firewalls for Adversarial Attack Detection in VLMs</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Magellan Technology Research Institute<br />\n<strong>Author:</strong> Hao Wang, Yiqun Sun, Pengfei Wei, Lawrence B. Hsieh, Daisuke Kawahara<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Vision-Language Models&amp;Adversarial Detection&amp;Sparse Autoencoders</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.07447\">https://arxiv.org/abs/2605.07447</a></p>\n<p><strong>摘要</strong>: 视觉语言模型（VLM）发展迅速，并日益部署于真实世界应用中，尤其是在基于代理的系统兴起之后。然而，其安全性受到的关注相对有限。即使是最新的专有和开放权重 VLM，也仍然高度易受对抗攻击影响，使下游应用暴露于显著风险之下。在这项工作中，我们提出一种新颖且轻量的对抗攻击检测框架，该框架基于稀疏自编码器（SAE），称为 SAEgis。通过在预训练 VLM 中插入 SAE 模块并使用标准重构目标训练它，我们发现学习到的稀疏潜在特征自然捕获了与攻击相关的信号。这些特征能够可靠地区分输入图像是否被对抗扰动，即使面对此前未见过的样本也是如此。大量实验表明，SAEgis 在域内、跨域和跨攻击设置下都取得了强性能，尤其是在跨域泛化方面相较现有基线有显著提升。此外，结合多个层的信号可进一步提高鲁棒性和稳定性。据我们所知，这是首个探索 SAE 作为 VLM 对抗攻击检测即插即用机制的工作。我们的方法不需要额外的对抗训练，引入的开销极小，并为提升真实世界 VLM 系统安全性提供了一种实用方法。</p>\n<h3>8. Safe, or Simply Incapable? Rethinking Safety Evaluation for Phone-Use Agents</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Tencent Hunyuan<br />\n<strong>Author:</strong> Zhengyang Tang, Yi Zhang, Chenxin Li, Xin Lai, Pengyuan Lyu, Yiduo Guo, Weinong Wang, Junyi Li, Yang Ding, Huawen Shen, Zhengyao Fang, Xingran Zhou, Liang Wu, Fei Tang, Sunqi Fan, Shangpin Peng, Zheng Ruan, Anran Zhang, Benyou Wang, Chengquan Zhang, Han Hu<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: LLM Agents&amp;Phone-Use Agents&amp;Safety Evaluation</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.07630\">https://arxiv.org/abs/2605.07630</a></p>\n<p><strong>摘要</strong>: 当一个手机使用代理避免造成伤害时，这说明它是安全的，还是仅仅说明它没有能力行动？现有评估往往无法区分。避免有害结果可能是因为代理识别出风险并选择了安全动作，也可能是因为它未能理解屏幕或执行任何相关动作。这些情形有不同原因，也需要不同修复方式，但当前基准经常将它们合并到任务成功、拒绝或最终有害结果之下。我们用 PHONESAFETY 解决这一问题，这是一个包含 700 个安全关键时刻的基准，来自 130 多个 app 的真实手机交互。每个实例都隔离出风险时刻的下一步决策，并提出一个简单问题：模型是采取安全动作、采取不安全动作，还是未能做出任何有用行为？我们在该框架下评估了八个代表性手机使用代理。结果揭示了两个主要模式。首先，更强的一般手机使用能力并不可靠地意味着在风险时刻有更安全的选择。普通 app 任务表现更好的模型，并不总是在下一步动作至关重要时表现得更安全。其次，未能做出任何有用行为更像是一种能力信号，而不是安全信号：它集中出现在视觉和操作要求更高的设置中，并且在评估协议改变时保持稳定。跨模型来看，失败可分为两种反复出现的模式：模型能够行动却做出错误选择的场景中的不安全选择，以及更高视觉和操作要求屏幕中的无行动能力。总体而言，无害结果不足以作为安全证据。评估手机使用代理需要将不安全判断与无法行动区分开来。</p>\n<h3>9. CyBiasBench: Benchmarking Bias in LLM Agents for Cyber-Attack Scenarios</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Chung-Ang University<br />\n<strong>Author:</strong> Taein Lim, Seongyong Ju, Munhyeok Kim, Hyunjun Kim, Hoki Kim<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: LLM Agents&amp;Bias&amp;Cybersecurity</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.07830\">https://arxiv.org/abs/2605.07830</a></p>\n<p><strong>摘要</strong>: 大型语言模型（LLM）正越来越多地作为自主代理部署于进攻性网络安全中。在本文中，我们揭示了一个有趣现象：不同代理表现出不同的攻击模式。具体而言，每个代理都有攻击选择偏置，无论提示如何变化，都会不成比例地将精力集中在一小部分攻击家族上。为系统量化这种行为，我们引入 CyBiasBench，这是一个包含 630 个会话的综合基准，在三个目标和四种提示条件下评估五个代理，覆盖十个攻击家族。我们识别出代理之间明确的偏置，不同代理具有不同的主导攻击家族，其攻击家族分配分布的熵水平也不同。这种偏置更适合被刻画为代理的一种特质，而不是与攻击成功率相关的因素。此外，我们的实验揭示了偏置动量效应，即代理会抵抗与其偏置相冲突的攻击家族显式引导。这种被迫的分布转移并不会带来可度量的攻击性能提升。为确保可复现性并促进未来研究，我们发布了交互式结果仪表盘 <a href=\"https://link.zhihu.com/?target=https%3A//trustworthyai.co.kr/CyBiasBench/%25EF%25BC%258C%25E4%25BB%25A5%25E5%258F%258A%25E5%258C%2585%25E5%2590%25AB%25E8%2581%259A%25E5%2590%2588%25E4%25BC%259A%25E8%25AF%259D%25E7%25BA%25A7%25E7%25BB%259F%25E8%25AE%25A1%25E5%2592%258C%25E5%25AE%258C%25E6%2595%25B4%25E8%25AF%2584%25E4%25BC%25B0%25E8%2584%259A%25E6%259C%25AC%25E7%259A%2584%25E5%25A4%258D%25E7%258E%25B0%25E5%25AE%259E%25E9%25AA%258C\">https://trustworthyai.co.kr/CyBiasBench/，以及包含聚合会话级统计和完整评估脚本的复现实验</a> artifact，地址为 <a href=\"https://link.zhihu.com/?target=https%3A//github.com/Harry24k/CyBiasBench%25E3%2580%2582\">https://github.com/Harry24k/CyBiasBench。</a></p>\n<h3>10. GLiGuard: Schema-Conditioned Classification for LLM Safeguard</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Fastino Labs<br />\n<strong>Author:</strong> Urchade Zaratiana, Mary Newhauser, George Hurn-Maloney, Ash Lewis<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Guardrails&amp;Content Moderation&amp;Classification</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.07982\">https://arxiv.org/abs/2605.07982</a></p>\n<p><strong>摘要</strong>: 确保大型语言模型输出安全且符合策略，需要能够跨多个安全维度扩展的实时内容审核。然而，最先进的护栏模型依赖 7B 到 27B 参数的自回归解码器，将本质上是分类的问题重新表述为顺序文本生成，这一设计选择带来了高延迟，并且难以扩展到多方面评估。在这项工作中，我们介绍 GLiGuard，这是一个 0.3B 参数的 schema 条件化双向编码器，由 GLiNER2 改造而来，用于 LLM 内容审核。核心思想是将任务定义和标签语义作为结构化 token schema 直接编码到输入序列中，从而在一次非自回归前向传播中同时评估提示安全、响应安全、拒绝检测、14 个细粒度危害类别和 11 种越狱策略。这种 schema 条件化设计允许在推理时直接在输入 schema 中组合受支持的任务和标签块。在九个成熟安全基准上，尽管 GLiGuard 比 7B 到 27B 解码器式护栏小 23 到 90 倍，其 F1 分数仍具有竞争力，同时吞吐量最高提升 16 倍、延迟最高降低 17 倍。这些结果表明，紧凑的双向编码器能够接近大得多的护栏模型的准确率，同时大幅降低推理成本。代码和模型可在 <a href=\"https://link.zhihu.com/?target=https%3A//github.com/fastino-ai/GLiGuard\">https://github.com/fastino-ai/GLiGuard</a> 获取。</p>\n<h3>11. Insider Attacks in Multi-Agent LLM Consensus Systems</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Department of Computer Science, Tulane University<br />\n<strong>Author:</strong> Xiaolin Sun, Zixuan Liu, Yibin Hu, Zizhan Zheng<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Multi-Agent Systems&amp;Insider Attacks&amp;Consensus</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.08268\">https://arxiv.org/abs/2605.08268</a></p>\n<p><strong>摘要</strong>: 大型语言模型（LLM）正越来越多地部署在多代理系统中，在这些系统中，代理通过自然语言通信以共同解决任务。这类系统中的一个关键能力是共识形成，即代理迭代交换消息并更新决策，以达到共同结果。然而，大多数现有多代理 LLM 框架假设所有参与代理都与系统目标一致。在实践中，恶意内部人可能作为群组中的合法成员参与，同时追求隐藏的对抗目标。在这项工作中，我们研究多代理 LLM 共识系统中的内部人操纵。我们将该问题形式化为一个顺序决策任务，其中恶意代理试图延迟或阻止良性代理之间达成一致。为使攻击优化可处理，我们提出一个基于世界模型的框架，学习良性代理潜在行为状态上的代理动态，然后使用基于该学习模型的强化学习训练攻击者。初步结果表明，与直接恶意提示基线相比，训练出的攻击者能更有效地降低良性共识率并延长分歧。这些结果表明，将潜在世界模型与强化学习结合，是语言型多代理系统中自适应内部人攻击的一个有前景方向。</p>\n<h3>12. Mitigating Many-shot Jailbreak Attacks with One Single Demonstration</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Nanyang Technological University<br />\n<strong>Author:</strong> Kejia Chen, Jiawen Zhang, Boheng Li, Pengcheng Li<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Jailbreak&amp;Many-Shot Attacks&amp;Inference-Time Defense</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.08277\">https://arxiv.org/abs/2605.08277</a></p>\n<p><strong>摘要</strong>: 多样本越狱（MSJ）通过在有害查询之前放置许多有害问答示例，使经过安全对齐的语言模型回答有害查询。我们研究为什么这种攻击会随着示例数量增加而变强。经验上，我们发现 MSJ 会诱导渐进式激活漂移：随着添加更多有害示例，固定有害查询的表示会一步步远离安全对齐区域。理论上，我们表明这种漂移可被解释为隐式恶意微调：以 N 个有害示例为条件会诱导类似 SGD 的更新，等价于在对应的 N 个有害样本上进行优化。这一视角将攻击机制转化为防御原则。我们在推理时追加一个固定的一样本安全示例，该示例诱导一个反向的安全导向更新，并恢复拒绝行为。由此得到的方法无需修改模型参数，也无需部署时白盒访问，即可提高模型对 MSJ 的鲁棒性。代码可在 <a href=\"https://link.zhihu.com/?target=https%3A//github.com/Thecommonirin/SafeEnd\">https://github.com/Thecommonirin/SafeEnd</a> 获取。</p>\n<h3>13. Sanity Checks for Long-Form Hallucination Detection</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Los Alamos National Laboratory<br />\n<strong>Author:</strong> Geigh Zollicoffer, Hongli Zhan, Manish Bhattarai<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Hallucination&amp;Reasoning Traces&amp;Detection</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.08346\">https://arxiv.org/abs/2605.08346</a></p>\n<p><strong>摘要</strong>: 大型语言模型的幻觉检测方法越来越多地作用于思维链推理轨迹，但尚不清楚它们是在评估推理本身，还是仅仅利用最终答案的表面相关特征。我们引入一种受控不变性方法，通过两个 oracle 测试揭示这一区别：FORCE 在保留推理轨迹的同时，用真实答案替换每个响应的最终答案；REMOVE 则在保持轨迹完整的同时去除答案宣布步骤。这揭示了它们的预测能力是否来自答案级 artifact，而不是来自中间推理的结构或有效性。我们进一步表明，一旦这些 artifact 被控制，有效检测并不一定需要复杂的学习表示：TRACT 是一个建立在词汇轨迹特征上的轻量评分器，包括 hedging 趋势、步骤长度动态和跨响应词汇收敛；它具有强鲁棒性，并且在未扰动轨迹上与现有基线竞争或优于它们。这些发现表明，当前面向推理的幻觉检测的核心挑战并非轨迹中缺少信号，而是未能将信号与终点线索隔离开来。</p>\n<h3>14. The Attacker in the Mirror: Breaking Self-Consistency in Safety via Anchored Bipolicy Self-Play</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Department of Computer Science, University of Oxford<br />\n<strong>Author:</strong> Gabriele La Malfa, Emanuele La Malfa, Saar Cohen, Jie M. Zhang, Michael Luck, Michael Wooldridge, Elizabeth Black<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Red Teaming&amp;Self-Play&amp;Safety Alignment</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.08427\">https://arxiv.org/abs/2605.08427</a></p>\n<p><strong>摘要</strong>: 自博弈红队是提升 AI 安全的一种既有方法，其中同一模型的不同实例在零和博弈中扮演攻击者和防御者，即攻击者尝试越狱防御者；如果自博弈收敛到纳什均衡，则在该博弈设置下模型被保证安全响应。尽管由同一模型扮演两个角色所强制的参数共享提高了稳定性和性能，但它引入了根本性的理论和架构限制。我们表明，可达到的纳什均衡集合对应于一大类行为，包括平凡的始终拒绝策略和 oracle 式防御者，从而限制了实际适用性。随后我们表明，当攻击者和防御者共享并更新同一个基础模型时，动态会坍缩为自一致性，因此攻击不会对防御者施加对抗压力。作为回应，我们提出 Anchored Bipolicy Self-Play，它在冻结基础模型之上训练不同的角色特定 LoRA 适配器，从而在通过显式角色分离保持对抗压力的同时维持稳定优化。相对于标准自博弈，我们展示了最高 100 倍的参数效率提升，并且相比自博弈微调模型在安全性上有持续改进。我们在 Qwen2.5-{3B, 7B,14B}-IT 模型上使用广泛采用的安全基准进行评估，显示鲁棒性提升且不损失推理能力。交叉博弈实验进一步表明，我们的攻击者和防御者模型在对抗防御和安全性方面优于自博弈。</p>\n<h3>15. A Single Neuron Is Sufficient to Bypass Safety Alignment in Large Language Models</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Apple<br />\n<strong>Author:</strong> Hamid Kazemi, Atoosa Chegini, Maria Safi<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Alignment&amp;Neurons&amp;Jailbreak</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.08513\">https://arxiv.org/abs/2605.08513</a></p>\n<p><strong>摘要</strong>: 语言模型中的安全对齐通过两个机制上不同的系统运作：拒绝神经元控制有害知识是否被表达，概念神经元编码有害知识本身。通过分别靶向每个系统中的单个神经元，我们在横跨两个模型家族、参数规模从 1.7B 到 70B 的七个模型上，在无需任何训练或提示工程的情况下，展示了两个方向的失败：通过抑制在显式有害请求上绕过安全，以及通过放大从无害提示中诱导有害内容。我们的发现表明，安全对齐并非鲁棒地分布在模型权重中，而是由单个神经元介导；这些神经元各自都在因果上足以控制拒绝行为，抑制任何一个被识别出的拒绝神经元都会在多样化有害请求上绕过安全对齐。内容警告：本文包含有害内容示例，包括自伤、性内容和其他冒犯性语言，仅严格用于研究和评估目的。</p>\n<h3>16. Source or It Didn’t Happen: A Multi-Agent Framework for Citation Hallucination Detection</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> University of Massachusetts Amherst<br />\n<strong>Author:</strong> Mingzhe Li, Zhiqiang Lin, Shiqing Ma<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Hallucination&amp;Citation Verification&amp;Multi-Agent Systems</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.08583\">https://arxiv.org/abs/2605.08583</a></p>\n<p><strong>摘要</strong>: 大型语言模型越来越多地用于科学写作，但它们可能伪造看似可信却无法通过书目验证的引用式参考文献。现有检测器常常将验证简化为二元的找到/未找到决策，并依赖脆弱解析或不完整检索，几乎不给审计者提供字段级信号。我们将引用幻觉检测重新表述为与分类体系对齐的字段级裁决，并引入一个包含 12 个代码的分类体系，覆盖 REAL、POTENTIAL 和 HALLUCINATED 引用。基于该分类体系，我们构建 CITETRACER，这是一个级联式多代理检测器，可从 PDF 和 BibTeX 中提取结构化引用，通过缓存查找、URL 获取、学术连接器和网络搜索检索证据，应用确定性字段匹配，并将模糊案例路由到类别专家裁判。我们发布了一个包含 2,450 条合成引用的基准，这些引用由真实种子经受控 LLM 变异构建，并配对来自 ICLR 2026 和匿名会议 desk-rejected 投稿的 957 条真实世界伪造引用。CITETRACER 在合成基准上达到 97.1% 准确率，REAL、POTENTIAL 和 HALLUCINATED 的类别级 F1 分别为 97.0、95.8 和 98.5，并且在真实世界集合上无需 abstain 即检测出 97.1% 的伪造。代码：<a href=\"https://link.zhihu.com/?target=https%3A//github.com/aaFrostnova/CiteTracer%25E3%2580%2582\">https://github.com/aaFrostnova/CiteTracer。</a></p>\n<h3>17. PAAC: Privacy-Aware Agentic Device-Cloud Collaboration</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Purdue University<br />\n<strong>Author:</strong> Liangqi Yuan, Wenzhi Fang, Shiqiang Wang, Christopher G. Brinton<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Privacy&amp;LLM Agents&amp;Device-Cloud Collaboration</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.08646\">https://arxiv.org/abs/2605.08646</a></p>\n<p><strong>摘要</strong>: 大型语言模型（LLM）代理面临一种结构性张力：云端代理提供强推理能力但会暴露用户数据，而端侧代理保护隐私却牺牲总体能力。现有端云设计将这一边界视为计算拆分，而不是适合代理式工作负载的信任边界；现有脱敏器也迫使系统在策略灵活性与工具调用所需的结构保真度之间做取舍。在这项工作中，我们开发 PAAC，这是一个隐私感知的代理式框架，它将 planner-executor 分解与端云边界对齐，使角色专门化本身成为隐私机制。云端代理在 typed placeholder token 上推理，这些 token 保留每个敏感值的推理角色，同时丢弃其内容；端侧代理识别敏感 span，并将每一步执行结果蒸馏为紧凑的关键发现。脱敏将端侧 LLM 限制为只提出应遮蔽哪些 span，而确定性注册表执行所有替换和反向替换，使动作可直接在设备上执行。在严格隐私设置下的三个代理式基准上，PAAC 主导了隐私与准确率的 Pareto 前沿，平均准确率提升 15-36%，平均泄露相较最先进端云基线降低 2-6 倍，在固定实体分类体系之外的隐私目标上提升最为明显。我们还在横跨数学、科学和金融等 10 个领域的 17 个额外基准上发现了一致改进。</p>\n<h3>18. Why Do Aligned LLMs Remain Jailbreakable: Refusal-Escape Directions, Operator-Level Sources and Safety-Utility Trade-off</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Institute of Computing Technology, Chinese Academy of Sciences<br />\n<strong>Author:</strong> Yu Chen, Yuanhao Liu, Qi Cao<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Jailbreak&amp;Refusal&amp;Safety-Utility Trade-off</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.08878\">https://arxiv.org/abs/2605.08878</a></p>\n<p><strong>摘要</strong>: 经过对齐的大型语言模型（LLM）仍然容易受到越狱攻击。近期机制研究已经识别出与越狱成功相关的潜在特征和表示转移，但仍留下一个更根本的问题：为什么对齐后的 LLM 仍然可被越狱，模型中的哪些结构性脆弱性使这成为可能？我们通过连续输入变换视角研究这一问题。我们的理论发现是，对齐模型仍可能表现出拒绝逃逸方向（RED）：围绕有害输入的局部扰动方向会在保留模型对有害语义解释的同时，将模型行为从拒绝转移为回答。从这一视角看，越狱不仅是成功的离散提示构造，也可被理解为沿 RED 连续扰动有害输入所诱导的拒绝到回答的行为转变。随后我们证明，RED 可以精确分解为模型算子结构中算子级来源的贡献，并识别出归一化、残差连线和终端来源这些在解析上受约束的算子级来源。为了消除 RED，共享表达模块（self-attention 和 MLP）必须在保留支持良性响应机制的同时，消除这些解析受约束来源的贡献。这些竞争要求产生了有条件的安全-效用权衡。跨多个模型和攻击方法的实验从两个互补视角实证分析 RED，并显示新增 token 维度可以暴露 RED，而成功越狱表现出大体与终端来源贡献对齐的拒绝到回答转移。</p>\n<h3>19. LLM-Agnostic Semantic Representation Attack</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> School of Electronics and Information, Northwestern Polytechnical University<br />\n<strong>Author:</strong> Jiawei Lian, Jianhong Pan, Lefan Wang, Yi Wang, Tairan Huang, Shaohui Mei, Lap-Pui Chau<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Jailbreak&amp;Semantic Representation&amp;Adversarial Attack</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.08898\">https://arxiv.org/abs/2605.08898</a></p>\n<p><strong>摘要</strong>: 大型语言模型（LLM）越来越多地采用对齐技术来防止有害输出。尽管有这些保护措施，攻击者仍可通过构造对抗提示绕过它们。主流 token 级优化方法主要依赖于优化精确的肯定模板（例如“Sure, here is…”）。然而，这些范式经常遇到瓶颈，例如次优收敛、提示自然性受损和较差的跨模型泛化。为解决这些限制，我们提出 Semantic Representation Attack（SRA），这是一种新颖的、与 LLM 无关的范式，从根本上将对抗目标从精确文本目标重新概念化为恶意语义表示。在理论上，我们建立了语义 Coherence-Convergence Relationship，并推导出 Cross-Model Semantic Generalization 界，证明保持语义连贯性可同时保证白盒语义收敛和黑盒可迁移性。在技术上，我们通过 Semantic Representation Heuristic Search（SRHS）算法实现该框架，该算法在增量离散 token chunk 扩展过程中保持对抗提示的可解释性和结构连贯性。大量评估表明，我们的框架在 26 个开源 LLM 上取得 99.71% 的平均攻击成功率，并具有强可迁移性和隐蔽性。代码可在 <a href=\"https://link.zhihu.com/?target=https%3A//github.com/JiaweiLian/SRA.git\">https://github.com/JiaweiLian/SRA.git</a> 获取。</p>\n<h3>20. ShadowMerge: A Novel Poisoning Attack on Graph-Based Agent Memory via Relation-Channel Conflicts</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Beijing University of Posts and Telecommunications<br />\n<strong>Author:</strong> Yang Luo, Zifeng Kang, Tiantian Ji, Xinran Liu, Yong Liu, Shuyu Li, Lingyun Peng<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Agent Memory&amp;Poisoning&amp;Graph Memory</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.09033\">https://arxiv.org/abs/2605.09033</a></p>\n<p><strong>摘要</strong>: 基于图的代理记忆因其在结构化长期回忆和多跳推理方面的优势，正越来越多地被 LLM 代理采用。尽管有这些优势，基于图的代理记忆也引入了新的攻击面：攻击者可以构造一个被提取进图记忆的投毒关系，并在之后被检索出来以影响后续代理行为。然而，该攻击面在现有代理记忆投毒安全研究中仍未被探索，因为现有攻击主要针对扁平文本记录，并且在基于图的代理记忆中无效，这是因为恶意关系常常无法被提取、合并进目标 anchor 邻域，或被受害查询检索到。本文提出 SHADOWMERGE，这是一种针对基于图的代理记忆的新型投毒攻击，利用关系通道冲突。其核心洞见是，投毒关系可以与良性证据共享相同 anchor 和关系通道，但携带冲突值。这里，anchor 是由查询激活的实体，关系通道是图证据被合并和检索所通过的规范化关系类型。为实现这一洞见，我们设计 AIR，这是一个将冲突转化为普通交互的流水线，使其能够被图记忆系统提取、合并和检索。我们在广泛使用的记忆框架 Mem0 以及三个公共真实世界数据集 PubMedQA、WebShop 和 ToolEmu 上评估 SHADOWMERGE。SHADOWMERGE 达到 93.8% 的平均 ASR，相比最佳基线绝对提升 50.3 个百分点，同时对无关良性任务影响可忽略。进一步机制研究证明，SHADOWMERGE 克服了现有代理记忆投毒攻击的全部三个限制。防御分析进一步显示，现有代表性输入侧防御不足以缓解 SHADOWMERGE。我们已负责任地向受影响的图记忆供应商披露发现，并在 <a href=\"https://link.zhihu.com/?target=https%3A//anonymous.4open.science/status/ShadowMerge-033C\">https://anonymous.4open.science/status/ShadowMerge-033C</a> 开源 SHADOWMERGE。</p>\n<h3>21. BiAxisAudit: A Novel Framework to Evaluate LLM Bias Across Prompt Sensitivity and Response-Layer Divergence</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Nanyang Technological University, Singapore<br />\n<strong>Author:</strong> Jialing Gan, Junhao Dong, Songze Li<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Bias&amp;Audit&amp;Prompt Sensitivity</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.09041\">https://arxiv.org/abs/2605.09041</a></p>\n<p><strong>摘要</strong>: 大型语言模型的偏见审计正日益受到自愿治理框架（如 NIST AI RMF）和具有约束力的监管制度（如 EU AI Act）的影响。因此，基准可靠性本身已成为一种安全属性。然而，现有基准常常把偏见简化为由固定提示格式和单一表层标签得到的一个标量，留下两个供应商无需修改任何模型权重即可利用的盲点。这些盲点在结构上相互独立（修正一个不会约束另一个），并且在实践中相互叠加而不是抵消。跨提示来看，保持含义不变的格式变化会使固定陈述池上的偏见认可度变化超过 0.7。在单个响应内部，离散的 Selection 和自由文本 Elaboration 可以表达相反立场，因此干净的聚合结果可能掩盖广泛的内部不一致（一种“抵消陷阱”）。因此，在八个 LLM 上，selection-only 与 elaboration-only 排名几乎不相关（Spearman ρ=0.238, p=0.570）：LLaMA3-70B 在 selection-only 下排名中游，却在同一响应的 elaboration-only 下排名最高。我们引入 BIAXISAUDIT，这是一种协议，为每个偏见分数配对两个正交轴上的可靠性估计。跨提示轴在任务格式、视角、角色和情感的因子网格下呈现每个陈述，将偏见报告为分布而非点估计。响应内轴应用 Split Coding，将 Selection 和 Elaboration 恢复为独立信号，并用 Inconsistency Rate 和 Divergence Net Imbalance 量化。在八个 LLM、每个模型 80,200 个编码响应上，仅任务格式就解释了与模型选择同等规模的偏见分数方差；合并审计中 63.6% 的偏见信号（每模型最高 85.2%）只出现在一个编码层，提示维度交互超过主效应，这些共同排除了任何单轴报告作为可靠审计的可能。同一工具还可区分真实偏见降低和由跨层再分配造成的表观降低：一些提示配置同时降低 BER 和 IR，而另一些只抑制 selection 层分数，保留 elaboration 层偏见，这是单标量审计无法检测的模式。</p>\n<h3>22. Single-Configuration Attack Success Rate Is Not Enough: Jailbreak Evaluations Should Report Distributional Attack Success</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> University of Warwick<br />\n<strong>Author:</strong> Carsten Maple<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Jailbreak&amp;Evaluation&amp;Attack Success Rate</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.09070\">https://arxiv.org/abs/2605.09070</a></p>\n<p><strong>摘要</strong>: 许多越狱攻击研究论文只报告有限数量参数设置下的攻击成功率，尽管可使用的参数设置组合很多。此外，当新的越狱论文发布时，它们经常将结果与现有攻击的单一配置进行基准比较。本文作为立场论文认为，这些实践从根本上不足以刻画参数化越狱攻击所构成的威胁，也不足以比较攻击。大多数越狱攻击暴露多个内部参数、系统提示模板、对话轮次、cipher dispersion、teaching shots，而 ASR 会随这些参数显著变化。只报告最佳配置会丢弃防御者真正需要的两类信息：该性能在变体空间中有多典型，以及选择单个变体会遗漏多少攻击面。我们为越狱攻击提出两个新度量：Variant Sensitivity Measure（VSM）和 Union Coverage（UC）。VSM 量化最佳报告 ASR 与测试变体空间平均 ASR 的偏离程度，UC 是所有测试配置中导致不安全响应的提示总比例。我们用两个攻击家族和三个开源目标模型实证展示这些度量的重要性。对于具有三个系统提示模板的 PAIR 攻击，最佳单模板（Authority Endorsement）在 Mistral-7B 上达到 69% ASR（VSM=0.425, UC=88%），在 Qwen30.6B 上达到 75% ASR（VSM=0.312, UC=93%）。对于 Mistral-7B 上的 bijection learning，最佳变体达到 81% ASR，而所有 36 个测试变体的并集覆盖了 HarmBench-100 的 100% 提示，完整空间 VSM 为 0.803，确认标题性能将典型表现夸大了五倍。我们主张，分布式报告、在 ASR 旁发布 VSM，并在计算允许范围内尽可能完整枚举变体覆盖，应成为参数化越狱评估的新最低标准。</p>\n<h3>23. THE ART OF THE JAILBREAK: FORMULATING JAIL-BREAK ATTACKS FOR LLM SECURITY BEYOND BINARY SCORING</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Department of Computer Science, University of Texas at El Paso<br />\n<strong>Author:</strong> Ismail Hossain, Tanzim Ahad, Md Jahangir Alam, Sai Puppala, Syed Bahauddin Alam, Sajedul Talukder<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Jailbreak&amp;Red Teaming&amp;Evaluation</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.09225\">https://arxiv.org/abs/2605.09225</a></p>\n<p><strong>摘要</strong>: 越狱攻击，即通过纯语言操纵绕过 LLM 对齐的对抗提示，构成了日益增长的运行安全威胁，但该领域缺乏用于系统生成、分类和评估它们的大规模、可复现基础设施。本文用三个紧密集成的贡献填补这一空白。（1）大规模组合式越狱数据集。我们从 JailBreakV-28K 中抽取 125 个有害种子提示，并应用 912 个真实场景组合策略，构建了 114,000 个对抗提示语料。不同于将越狱视为无差别集合的先前数据集，我们的数据集中每个提示都通过六模型多数投票流水线分配到 14 个网络安全攻击类别之一（如恶意软件、钓鱼、权限提升），并按每个攻击类别中的有效性对策略排序，从而首次实现基于具体对抗目标的原则性策略选择。（2）自动化越狱生成。我们在该数据集的 Moderate 和 Optimal 子集上对类别感知生成器 LLM 进行指令微调，使模型能在推理时从简单有害种子自主合成多样、流畅的越狱提示，无需模板、无需梯度搜索。我们的生成器困惑度为 24-39，而 AutoDAN 和 AmpleGCG 为 40-140，并具有 0.29-0.51 Mal 的安全过滤逃逸率（LlamaPromptGuard-2-86M），说明大规模组合式微调可实现可控、可扩展的红队测试，用于在真实对抗条件下评估 LLM 表层安全。（3）OPTIMUS：一种二维、无需训练的越狱评估器。我们引入 OPTIMUS，这是一个连续度量 J(S,H)，共同捕获原始有害种子与越狱提示之间的语义相似性（S）以及越狱本身的有害概率（H），并通过校准惩罚函数组合。不同于仅依赖二元攻击成功率（ASR）或微调分类器的先前工作，OPTIMUS 不需要任务特定训练，能泛化到演化中的攻击策略，并揭示 ASR 完全折叠掉的连续“stealth-optimal”区域（S*≈0.57, H*≈0.43）。跨 114,000 个提示的实验验证了 OPTIMUS 分数能够区分 Weak、Moderate 和 Optimal 越狱，并为防御者提供二元评估无法提供的类别级优先级证据。</p>\n<h3>24. BadDLM: Backdooring Diffusion Language Models with Diverse Targets</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> National University of Singapore<br />\n<strong>Author:</strong> Shengfang Zhai, Xiaoyang Ji, Yuling Shi, Haoran Gao, Fanyu Meng, Yan Zeng, Yuejian Fang, Yinpeng Dong, Jiaheng Zhang<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Backdoor&amp;Diffusion Language Models&amp;Poisoning</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.09397\">https://arxiv.org/abs/2605.09397</a></p>\n<p><strong>摘要</strong>: 扩散语言模型（DLM）最近作为自回归（AR）语言模型的替代建模范式出现，支持并行生成和双向上下文建模。然而，它们的安全影响，尤其是对后门攻击的脆弱性，仍未得到充分探索。我们提出 BadDLM，这是一个统一框架，用于研究针对 DLM 的多目标后门攻击。我们引入一种触发器感知训练目标，强调投毒样本中与目标相关的位置，并在理论上证明该目标等价于在诱导的前向 masking 分布下训练。不同于通常操纵下一 token 预测的自回归模型后门，这一刻画表明 BadDLM 可以通过利用前向 masking 过程植入后门。我们在不同目标层级上实例化 BadDLM：概念注入（BadDLMConcept）、语义属性引导（BadDLMAttribute）、对齐绕过（BadDLMAlign）和代码 payload 注入（BadDLMPayload）。在主流开源 DLM 上的实验显示，BadDLM 在多样目标上取得强攻击效果，同时基本保持良性效用，并且对为 AR 后门设计的防御仍然有效。我们的发现暴露了扩散式语言生成中的一类新安全风险，并呼吁针对 DLM 去噪动态设计防御。警告：本文可能包含具有冒犯性和有害潜力的模型响应。</p>\n<h3>25. MemPrivacy: Privacy-Preserving Personalized Memory Management for Edge-Cloud Agents</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> MemTensor (Shanghai) Technology Co., Ltd.<br />\n<strong>Author:</strong> Yining Chen, Jihao Zhao, Bo Tang, Haofen Wang, Yue Zhang, Fei Huang, Feiyu Xiong, Zhiyu Li<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Privacy&amp;Agent Memory&amp;Edge-Cloud Agents</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.09530\">https://arxiv.org/abs/2605.09530</a></p>\n<p><strong>摘要</strong>: 随着由 LLM 驱动的代理越来越多地部署在端云环境中，个性化记忆已成为长期适应和以用户为中心交互的关键使能因素。然而，云辅助记忆管理会暴露敏感用户信息，而现有隐私保护方法通常依赖激进遮蔽，移除任务相关语义，从而降低记忆效用和个性化质量。为应对这一挑战，我们提出 MemPrivacy，它在端侧设备上识别隐私敏感 span，用语义结构化、类型感知的 placeholder 替换它们以供云侧记忆处理，并在需要时在本地恢复原始值。通过将隐私保护与语义破坏解耦，MemPrivacy 在保留有效记忆形成和检索所需信息的同时，最小化敏感数据暴露。我们还构建了 MemPrivacy-Bench 用于系统评估，该数据集覆盖 200 个用户和超过 155k 个隐私实例，并引入四级隐私分类体系以支持可配置保护策略。实验表明，MemPrivacy 在隐私信息抽取方面表现强劲，显著超过 GPT-5.2 和 Gemini-3.1-Pro 等强通用模型，同时降低推理延迟。在多个广泛使用的记忆系统上，MemPrivacy 将效用损失限制在 1.6% 以内，优于基线遮蔽策略。总体而言，MemPrivacy 为端云代理在隐私保护与个性化记忆效用之间提供了有效平衡，使安全、实用且对用户透明的部署成为可能。</p>\n<h3>26. Trust Me, Import This: Dependency Steering Attacks via Malicious Agent Skills</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> National Yang Ming Chiao Tung University<br />\n<strong>Author:</strong> Yiyong Liu, Michael Backes<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Supply Chain&amp;Agent Skills&amp;Dependency Steering</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.09594\">https://arxiv.org/abs/2605.09594</a></p>\n<p><strong>摘要</strong>: 由 LLM 驱动的编码代理越来越多地做出软件供应链决策。它们生成 import、推荐包并编写安装命令。先前工作表明，这些系统可能幻觉出不存在的包名，攻击者可以将其注册为恶意包。本文表明，这一风险并不只是被动的模型失败；它可以通过持久化的 Skill artifact 被主动诱导。我们引入 Dependency Steering，这是一种攻击范式，其中恶意 Skill 会在良性编码任务中将编码代理偏向攻击者控制的包。该攻击不需要修改模型权重、训练数据或用户提示。为构造真实攻击，我们设计了一种 Skill 级优化方法，搜索局部语义编辑，在保持原始 Skill 表面用途的同时增加目标包生成。跨多个面向编码的 LLM 和编程基准，Dependency Steering 达到高目标幻觉率，能够跨模型和任务领域迁移，并且难以被被评估的 Skill 扫描器和基于 LLM 的审计器检测。我们的结果表明，持久化代理指令构成了一个尚未充分探索的软件供应链攻击面。</p>\n<h3>27. MonitoringBench: Semi-Automated Red-Teaming for Agent Monitoring</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Redwood Research<br />\n<strong>Author:</strong> Monika Jotautaite<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Red Teaming&amp;Agent Monitoring&amp;Coding Agents</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.09684\">https://arxiv.org/abs/2605.09684</a></p>\n<p><strong>摘要</strong>: 我们引入一种红队方法，揭示编码代理监控器更难捕捉的攻击，表明当前实践可能不足以引出攻击并高估监控器性能。我们识别出当前红队测试的三个挑战。第一，攻击生成中的模式坍缩，我们通过一种新的攻击分类体系来扩大覆盖。第二，构思-执行差距：前沿 LLM 可以提出强攻击想法或执行它们，但不能一次性同时完成。我们通过将攻击构造分解为策略生成、执行和事后轨迹细化来缓解这一点。第三，人工 elicitation 难以扩展，我们用半自动红队流水线解决。将其应用于 BashArena（一个面向工具使用编码代理的 AI control 设置）后，该流水线产生 MonitoringBench，这是一个包含 2,644 条攻击轨迹的基准，用于评估监控器能力和失效模式。我们的流水线产生更多样且更强的攻击：Opus-4.5 监控器的捕获率从仅 elicited 的 Opus 攻击上的 94.9% 降至我们最佳细化攻击上的 60.3%，若干中等能力监控器下降更大。针对三个开发监控器优化的攻击能够泛化到十个留出监控器，捕获率通常随监控器能力提升而上升。使用该基准，我们提供当前监控器能力快照，并发现前沿监控器常能检测可疑动作，却会被说服或未能适当校准可疑分数，这提示了可处理的改进路径。MonitoringBench 同时提供当前工具使用监控器的静态基准，以及随着代理和监控器改进而刷新评估的可复用方法。</p>\n<h3>28. CalBench: Evaluating Coordination-Privacy Trade-offs in Multi-Agent LLMs</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Stanford University<br />\n<strong>Author:</strong> Chelsea Zou<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Multi-Agent Systems&amp;Privacy&amp;Coordination</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.09823\">https://arxiv.org/abs/2605.09823</a></p>\n<p><strong>摘要</strong>: 我们引入 CalBench，这是一个用于通过日历调度评估多代理协调的受控评估环境。在 CalBench 中，N 个代理各自管理一个包含既有承诺的私有日历，并且必须协调安排一系列 M 个新到会议，同时最小化干扰成本。由于代理只能观察自己的日历，成功调度需要跨私有信息边界通信。每个场景都生成有 oracle 解，从而能够通过 realized-to-optimal cost 精确衡量协调质量，并提供分布式约束优化（DCOP）基线，以便在相同私有信息约束下公平比较。CalBench 支持在多代理设置中精确验证任务成功、通信效率和公平性（干扰成本分布）。我们的环境还专门研究隐私保护型协调。CalBench 为日历条目添加不同敏感程度的私有语义上下文，并测量代理在协商期间是否泄露任务无关的私有信息。不同于单个强代理常可替代群体的多代理基准，CalBench 本质上是去中心化的：没有代理能访问另一个代理的私有日历，但代理仍必须就共享会议调度达成相互一致的决策。因此，CalBench 为研究多代理系统中的协调协议、通信效率、协商策略、公平性和隐私泄露提供了实用且可验证的环境。所有轨迹和数据可在托管排行榜 <a href=\"https://link.zhihu.com/?target=http%3A//35.91.104.98%3A8000/leaderboard\">http://35.91.104.98:8000/leaderboard</a> 获取。任务引擎可在 <a href=\"https://link.zhihu.com/?target=https%3A//github.com/bosonphoton/calbench\">https://github.com/bosonphoton/calbench</a> 获取。</p>\n<h3>29. Usability as a Weapon: Attacking the Safety of LLM-Based Code Generation via Usability Requirements</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> National Key Lab for Novel Software Technology, Nanjing University<br />\n<strong>Author:</strong> Yue Li, Xiao Li, Hao Wu, Yue Zhang, Yechao Zhang, Yating Liu, Fengyuan Xu, Sheng Zhong<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Code Generation&amp;Security&amp;Reward Hacking</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.10133\">https://arxiv.org/abs/2605.10133</a></p>\n<p><strong>摘要</strong>: 大型语言模型（LLM）越来越多地用于自动化软件开发，因此它们保持安全编码实践的能力至关重要。然而在实践中，许多安全需求是隐式或未充分指定的，而可用性需求则是显式且高信号的。这种不对称促使我们研究可用性压力作为实际攻击面：现实的可用性导向需求（例如新功能、性能约束或简洁性要求）可能导致编码 LLM 满足显式可用性目标，同时悄悄丢弃隐式安全约束，这是一种 reward hacking。我们将该威胁形式化为 UPAttack，并提出 U-SPLOIT，这是一个自动化框架，用于构造 UPAttack：（i）选择模型最初安全的任务；（ii）通过在功能、实现、权衡三个向量上识别不安全替代方案的可用性奖励来合成可用性压力；（iii）通过现有测试用例和动态生成的 exploit payload 验证安全回归。跨 75 个种子场景（25 个 CWE × 3 个案例）、多种语言（Python、C 和 JavaScript），U-SPLOIT 在多个最先进模型（例如 GPT-5.2-chat 和 Gemini-3-Flash-Preview）上达到最高 98.1% 的攻击成功率。</p>\n<h3>30. EditRisk-Bench: Benchmarking Safety Risks of Knowledge-Intensive Reasoning under Malicious Knowledge Editing</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> School of Computer Science<br />\n<strong>Author:</strong> Qinghua Mao<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Knowledge Editing&amp;Safety Risks&amp;Reasoning</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.10146\">https://arxiv.org/abs/2605.10146</a></p>\n<p><strong>摘要</strong>: 大型语言模型（LLM）越来越依赖知识编辑来支持知识密集型推理，但这种灵活性也引入了关键安全风险：对手可以注入恶意或误导性知识，破坏下游推理并导致有害结果。现有知识编辑基准主要关注编辑有效性，缺乏统一框架来系统评估被编辑知识对推理行为的安全影响。为填补这一空白，我们提出 EditRisk-Bench，这是一个用于系统评估恶意知识编辑下知识密集型推理安全风险的基准。不同于主要强调编辑成功、泛化和局部性的先前基准，EditRisk-Bench 关注注入知识如何影响下游推理行为和可靠性。它在统一评估框架中整合多样恶意场景，包括错误信息、偏见和安全违规，以及多层级知识密集型推理任务和代表性编辑策略，用于衡量攻击有效性、推理正确性和副作用。对开源和闭源 LLM 的大量实验表明，恶意知识编辑可以可靠地诱导错误或不安全推理，同时基本保持一般能力，使这类风险难以检测。我们进一步识别出影响这些风险的若干关键因素，包括编辑规模、知识特征和推理复杂度。EditRisk-Bench 为理解和缓解 LLM 知识编辑中的安全风险提供了可扩展测试平台。</p>\n<h3>31. Re-Triggering Safeguards within LLMs for Jailbreak Detection</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Xidian University<br />\n<strong>Author:</strong> Zheng Lin, Zhenxing Niu, Haoxuan Ji, Yuzhe Huang, Haichang Gao<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Jailbreak&amp;Detection&amp;Safeguards</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.10611\">https://arxiv.org/abs/2605.10611</a></p>\n<p><strong>摘要</strong>: 本文提出一种面向大型语言模型（LLM）的越狱提示检测方法，用于防御越狱攻击。尽管近期 LLM 配备了内置保护机制，攻击者仍然可以构造绕过这些机制的越狱提示。我们认为此类越狱提示本质上是脆弱的，因此引入一种嵌入扰动方法来重新激活 LLM 内部的保护机制。不同于旨在作为独立解决方案的既有防御方法，我们的方法通过重新触发内部防御机制与 LLM 自身保护协同工作。此外，通过广泛分析，我们全面理解扰动效应，并开发高效搜索算法，以识别适合有效越狱检测的扰动。大量实验表明，我们的方法可在白盒和黑盒设置下有效防御最先进越狱攻击，并且即使面对自适应攻击也保持鲁棒。</p>\n<h3>32. MATRA: Modeling the Attack Surface of Agentic AI Systems - OpenClaw Case Study</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> KU Leuven<br />\n<strong>Author:</strong> Tim Van hamme, Thomas Vissers, Lieven Desmet, Javier Carnerero-Cano, Mario Fritz, Emil C. Lupu, Dinil Mon Divakaran<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: LLM Agents&amp;Threat Modeling&amp;Risk Assessment</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.10763\">https://arxiv.org/abs/2605.10763</a></p>\n<p><strong>摘要</strong>: LLM 正越来越多地作为自主代理部署，并可访问工具、数据库和外部服务，但不同行业的实践者缺乏系统方法来评估已知威胁类别如何转化为特定代理部署中的具体风险。我们提出 MATRA，这是一个面向代理式 AI 系统的实用威胁建模框架，它调整成熟的风险评估方法，系统评估已知 LLM 威胁如何转化为部署特定风险。MATRA 从基于资产的影响评估开始，并利用攻击树确定这些影响在系统架构中发生的可能性。我们在使用 OpenClaw 的个人 AI 代理部署上展示 MATRA，量化网络沙箱和最小权限访问等架构控制如何通过限制成功注入的爆炸半径来降低风险。该工作已被 DeMeSSAI 2026 接收展示。</p>\n<h3>33. LITMUS: Benchmarking Behavioral Jailbreaks of LLM Agents in Real OS Environments</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Nanjing University of Aeronautics and Astronautics<br />\n<strong>Author:</strong> Project Page<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: LLM Agents&amp;Behavioral Jailbreak&amp;OS Security</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.10779\">https://arxiv.org/abs/2605.10779</a></p>\n<p><strong>摘要</strong>: 基于 LLM 的自主代理在真实操作系统环境中的迅速扩散，引入了一类超越传统内容安全的全新安全风险：行为越狱，即对手诱导代理执行具有不可逆物理后果的危险 OS 级操作。现有基准要么只在语义输出层评估安全，遗漏物理层危害，要么无法隔离测试案例，使早期运行污染后续运行。我们提出 LITMUS（LLM-agents In-OS Testing for Measuring Unsafe Subversion），通过语义-物理双重验证机制和 OS 级状态回滚设计同时解决这两个缺口。LITMUS 包含 819 个高风险测试案例，组织为一个有害种子子集和六个攻击扩展子集，覆盖越狱说话、技能注入和实体包装三类对抗范式，并包含一个完全自动化的多代理评估框架，可在对话层和 OS 级物理层独立判断代理行为。跨多个前沿代理的评估揭示三点一致发现：（1）当前代理在真实 OS 环境中缺乏针对危险指令的有效安全意识，强模型如 Claude Sonnet 4.6 仍执行 40.64% 的高风险操作；（2）代理普遍存在执行幻觉，即口头拒绝请求但危险操作已在系统层完成，这是所有既有纯语义评估框架都看不见的现象；（3）我们设计的技能注入和实体包装攻击成功率高，暴露出代理对恶意技能干扰和指令混淆的显著脆弱性。LITMUS 提供了首个用于真实 OS 环境中可复现、物理落地的 LLM 代理行为安全评估标准化平台。</p>\n<h3>34. Engineering Robustness into Personal Agents with the AI Workflow Store</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Columbia University and Google<br />\n<strong>Author:</strong> Roxana Geambasu, Mariana Raykova, Pierre Tholoniat, Trishita Tiwari, Lillian Tsai, Wen Zhang<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: LLM Agents&amp;Robustness&amp;Software Engineering</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.10907\">https://arxiv.org/abs/2605.10907</a></p>\n<p><strong>摘要</strong>: AI 代理的主导范式是“即时”循环，即代理在收到用户提示后的数秒或数分钟内合成计划并执行动作。我们认为，这一范式绕过了严谨的软件工程流程，如迭代设计、严格测试、对抗评估、分阶段部署等，而这些流程造就了我们今天使用的相对可靠和安全的系统。由于专注于快速实时合成，AI 代理是否实际上是在向用户交付临时原型，而不是适合高风险场景的系统？本文主张有必要将严谨的软件工程流程整合进代理循环，以产生生产级、强化且受确定性约束的代理工作流，从而显著优于即时合成可能产生的脆弱且易受攻击结果。这样做可能需要额外计算和时间；如果如此，我们必须通过在广泛用户社区中复用来摊销严谨性的成本。我们设想一个 AI Workflow Store，由经过强化且可复用的工作流组成，代理可以调用它们，相比临时拼接的工具链具有高得多的可靠性和安全性。我们概述了这一愿景的研究挑战，并认为它们源于更广泛的灵活性-鲁棒性张力，需要超越“即时”范式才能有效处理。</p>\n<h3>35. Few-Shot Truly Benign DPO Attack for Jailbreaking LLMs</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Yonsei University<br />\n<strong>Author:</strong> Sangyeon Yoon<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Jailbreak&amp;DPO&amp;Fine-Tuning</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.10998\">https://arxiv.org/abs/2605.10998</a></p>\n<p><strong>摘要</strong>: 微调 API 使前沿 LLM 易于定制，但也可能在微调期间削弱安全对齐。尽管先前工作表明良性监督微调（SFT）可降低拒绝行为，已部署微调流水线正越来越多地支持基于偏好的目标，其安全风险仍理解不足。我们表明，直接偏好优化（DPO）引入了更强且更难审计的失败模式。我们提出一种真正良性的 DPO 攻击，仅使用 10 个无害偏好对，这是 OpenAI 微调服务接受的最小数据规模。每个偏好对包含一个良性提示、一个正常有帮助答案作为 preferred response，以及一个拒绝作为 dispreferred response。不同于先前良性微调攻击，我们的数据没有可疑行为：它几乎无法与合法用户希望减少过度拒绝的微调请求区分，因此仅从请求本身几乎无法推断有害意图。然而，由于 DPO 直接优化模型偏好有帮助答案而非拒绝，这一看似良性的目标会广泛抑制拒绝行为，并迁移到微调数据之外的有害提示。跨支持 DPO 微调的 OpenAI 模型，该攻击在 GPT-4o、GPT-4.1、GPT-4.1-mini 和 GPT-4.1-nano 上分别达到 59.13%、70.20%、54.80% 和 81.73% 的攻击成功率，成本仅为 1.7、1.7、0.3 和 0.1 美元。此外，在没有最低数据要求的开放权重模型上，我们发现即使单个良性偏好对也能产生这种效应。免责声明：本文包含部分读者可能觉得 disturbing 或 offensive 的内容，包括仇恨或暴力性质内容。</p>\n<h3>36. MT-JailBench: A Modular Benchmark for Understanding Multi-Turn Jailbreak Attacks</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> UC Berkeley<br />\n<strong>Author:</strong> N. Benjamin Erichson et al.<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Jailbreak&amp;Multi-Turn&amp;Benchmark</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.11002\">https://arxiv.org/abs/2605.11002</a></p>\n<p><strong>摘要</strong>: 多轮越狱利用大型语言模型积累并作用于对话上下文的能力。攻击者不直接陈述有害请求，而是逐步将对话引向不安全答案。近期方法展示了这一风险，但通常作为黑盒流水线评估，具有不同预算、裁判、重试规则和策略生成程序。因此，报告收益究竟来自更强攻击机制还是不同实验条件往往不清楚。我们引入 MT-JailBench，这是一个在固定条件下基准测试多轮越狱的模块化评估框架。MT-JailBench 将每个攻击实现为五个交互模块：评估函数、攻击策略、提示生成、提示细化和流程控制。这一设计支持跨攻击方法公平比较，并进行组件级分析以理解攻击成功的驱动因素。使用 MT-JailBench，我们发现资源预算和评估函数是主要混杂因素：控制轮次、重试、交互、采样策略和裁判会显著改变攻击排名。在组件层面，提示生成解释了大部分性能变化，细化和流程控制提供中等增益。我们还发现显式动态策略生成并不总是必要；从固定策略中随机采样可以媲美更复杂的多样化机制。最后，重组最佳组件得到一种强攻击配置，超过其来源攻击并能泛化到多样目标 LLM。MT-JailBench 因此提供了比较多轮越狱、理解组件影响并指导更强红队评估的模块化框架。</p>\n<h3>37. The Authorization-Execution Gap Is a Major Safety and Security Problem in Open-World Agents</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Nanjing University of Posts and Telecommunications<br />\n<strong>Author:</strong> Baoyuan Wu<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: LLM Agents&amp;Authorization&amp;Execution Safety</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.11003\">https://arxiv.org/abs/2605.11003</a></p>\n<p><strong>摘要</strong>: 这篇立场论文认为，授权-执行鸿沟（AEG）是开放世界代理中的重大安全与安保问题。AEG 指委托人意图授权的内容与开放世界代理最终执行的内容之间的偏离。由于这类代理会跨工具、持久状态和多代理交接自主行动，即使很小的授权偏离也可能造成难以或无法撤销的伤害。我们认为，许多观察到的代理失败可追溯到 AEG 的三个结构来源：委托级不完整、通道级腐化和组合级碎片化。同一观察到的失败可能来自这些来源中的任意一个。若不识别来源，仅针对症状的防御无法解决根因。因此，代理安全与安保应强调面向来源的诊断和防御。由于 AEG 的结构来源在执行期间动态产生，这一路径必然要求在执行中应用授权完整性检查，而不是仅依赖一次性前置过滤或事后审计。对 NeurIPS 而言，其含义是开放世界代理论文不仅应报告任务成功或抗攻击性等结果级指标，也应报告过程级证据，说明 AEG 在执行期间何处被检测、约束，并归因到结构来源。</p>\n<h3>38. AgentShield: Deception-based Compromise Detection for Tool-using LLM Agents</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> University of Kurdistan Hewler<br />\n<strong>Author:</strong> Yassin H. Rassul, Tarik A. Rashid<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Prompt Injection&amp;Compromise Detection&amp;LLM Agents</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.11026\">https://arxiv.org/abs/2605.11026</a></p>\n<p><strong>摘要</strong>: 工具使用型 LLM 代理针对间接提示注入（IPI）的防御存在两个结构性弱点。第一，它们都试图阻止攻击，而不是检测漏网的 compromise。第二，它们只在英语中评估，使库尔德语和阿拉伯语等低资源语言用户缺乏经过测试的保护。本文用 AgentShield 填补两个空白。AgentShield 是一种基于欺骗的检测框架，在代理工具接口中放置三层陷阱：虚假工具、虚假凭证和 allowlisted 参数。同一陷阱触发同时作为自监督分类器的高精度标签。遵循攻击者隐藏指令的 LLM 代理几乎总会触碰其中一个陷阱，从而给出实时 compromise 信号，并为训练下游检测器提供零误报标签，无需人工标注。跨 176 个跨语言攻击提示、来自三个提供商的四个 LLM，并且由于现代 LLM 自身已拒绝大多数 IPI 尝试（攻击成功率≤10%），AgentShield 的任务是捕捉真正漏过的攻击。在商业模型上，它捕获 90.7%-100% 的成功攻击，同时在 485 个正常使用测试上零误报。它在系统性自适应攻击评估中对商业模型保持零逃逸，自监督分类器无需重训即可跨模型和语言迁移。</p>\n<h3>39. Portable Agent Memory: A Protocol for Provenance-Verified Memory Transfer Across Heterogeneous LLM Agents</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Microsoft Corporation<br />\n<strong>Author:</strong> Santhosh Kumar Ravindran<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Agent Memory&amp;Provenance&amp;Interoperability</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.11032\">https://arxiv.org/abs/2605.11032</a></p>\n<p><strong>摘要</strong>: 大型语言模型（LLM）代理会积累有价值的操作上下文，包括学习到的偏好、事实知识、过程技能和任务状态，但这些记忆仍锁定在供应商特定运行时中，造成脆弱性、供应商锁定以及跨会话的灾难性知识损失。我们提出 Portable Agent Memory，这是一种开放协议，用于在异构 LLM 系统之间序列化、传输和重新水合代理记忆，并提供密码学完整性保证。Portable Agent Memory 引入五组件记忆模型 M=(E,S,P,W,I)，覆盖情节、语义、过程、工作和身份记忆；Merkle-DAG provenance 结构支持防篡改验证；能力范围访问 token 支持细粒度授权；抗注入 re-hydration 流水线防御由记忆媒介引发的提示注入攻击。在 Claude、GPT-4 和 Gemini 的试点研究中，Portable Agent Memory 达到 0.83-0.92 的 Transfer Continuity Score，而无记忆基线为 0.28-0.45，证明结构化可移植记忆能显著保留跨模型边界的代理能力。我们发布了完整 Python SDK，包含 54 个通过测试。</p>\n<h3>40. Sequential Behavioral Watermarking for LLM Agents</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Department of Computer Science<br />\n<strong>Author:</strong> Hyeseon An, Shinwoo Park, Dongsu Kim, Yo-Sub Han<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Watermarking&amp;LLM Agents&amp;Provenance</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.11036\">https://arxiv.org/abs/2605.11036</a></p>\n<p><strong>摘要</strong>: 基于 LLM 的代理通过一系列可执行决策行动，但其轨迹几乎不能证明是哪一个代理或策略生成了它们，使得仅凭观察到的行为难以确立 provenance、所有权和未授权复用。这促使我们将水印信号直接嵌入代理行为，而不仅是生成文本，因为文本水印无法捕获定义代理执行的动作级决策。近期代理水印方法通过将水印从生成文本移动到行为选择来解决这一空白。然而，它们将每个动作步骤视为独立试验，忽略轨迹结构，并在轨迹被扰动、截断或缺乏可靠对齐观察时变得脆弱。我们提出 SeqWM，这是一个顺序行为水印框架，将信号嵌入历史条件化转移模式，并以位置无关方式相对于随机密钥基线验证轨迹。跨多样代理基准和 LLM 骨干的实验显示，SeqWM 在保持代理效用的同时持续实现可靠检测，并在基于轮次索引的行为水印崩溃的轨迹损坏场景下保持鲁棒。</p>\n<h3>41. The Granularity Mismatch in Agent Security: Argument-Level Provenance Solves Enforcement and Isolates the LLM Reasoning Bottleneck</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> King Abdullah University of Science and Technology<br />\n<strong>Author:</strong> Linfeng Fan<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: LLM Agents&amp;Provenance&amp;Tool Security</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.11039\">https://arxiv.org/abs/2605.11039</a></p>\n<p><strong>摘要</strong>: 工具使用型 LLM 代理必须在处理不受信任的网页、邮件、文件和 API 输出的同时发出有特权的工具调用。现有防御通常以整个工具调用为粒度调解信任，在混合信任工作流中造成脆弱选择：允许外部内容影响调用并冒被劫持目的地或命令的风险，或隔离调用并阻断良性的检索后执行行为。本文关键观察是，间接提示注入的危险不在于不受信任内容出现在上下文中，而在于它决定了带有权限的参数。我们提出 PACT（Provenance-Aware Capability Contracts），这是一个运行时监控器，为工具参数分配语义角色，跨 replanning 步骤跟踪值 provenance，并检查每个参数来源是否满足其角色特定信任合约。在 oracle provenance 下，PACT 在混合信任诊断套件上实现 100% 效用和 100% 安全，而扁平调用级监控器会产生误报或漏报。在五个模型的完整 AgentDojo 部署中，PACT 在三个最强模型上达到 100% 安全，同时恢复 38.1-46.4% 效用，在相同安全水平下比 CaMeL 高 8-16 个百分点。消融显示，语义角色和跨步骤 provenance 都是必要的。PACT 将代理安全重构为权限绑定，并将剩余部署瓶颈隔离到 provenance 推断和合约合成。</p>\n<h3>42. Red-Teaming Agent Execution Contexts: Open-World Security Evaluation on OpenClaw</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> City University of Hong Kong<br />\n<strong>Author:</strong> Hongwei Yao, Yiming Liu, Yiling He, Bingrun Yang<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Red Teaming&amp;Execution Context&amp;LLM Agents</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.11047\">https://arxiv.org/abs/2605.11047</a></p>\n<p><strong>摘要</strong>: 代理式语言模型系统越来越依赖可变执行上下文，包括文件、记忆、工具、技能和辅助 artifacts，从而产生超越显式用户提示的安全风险。本文提出 DeepTrap，这是一个用于发现 OpenClaw 中上下文漏洞的自动化框架。DeepTrap 将对抗性上下文操纵形式化为黑盒轨迹级优化问题，在风险实现、良性任务保持和隐蔽性之间进行平衡。它结合风险条件化评估、多目标轨迹评分、奖励引导 beam search 和基于反思的深度探测，识别高价值受损上下文。我们构建了包含 42 个案例的基准，覆盖六类漏洞和七个操作场景，并用攻击与效用评分评估九个目标模型。结果显示，上下文 compromise 可在保持面向用户任务完成的同时诱导显著不安全行为，说明只看最终响应的评估是不充分的。研究结果强调需要面向执行的代理式 AI 系统安全评估。代码发布于 <a href=\"https://link.zhihu.com/?target=https%3A//github.com/ZJUICSR/DeepTrap%25E3%2580%2582\">https://github.com/ZJUICSR/DeepTrap。</a></p>\n<h3>43. ExploitGym: Can AI Agents Turn Security Vulnerabilities into Real Attacks?</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Max Planck Institute for Security and Privacy<br />\n<strong>Author:</strong> Zhun Wang, Milad Nasr, Elie Bursztein, Jingxuan He<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Cybersecurity&amp;Exploitation&amp;AI Agents</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.11086\">https://arxiv.org/abs/2605.11086</a></p>\n<p><strong>摘要</strong>: AI 代理能力快速增长，可能显著重塑网络安全，因此迫切需要严格评估。一个关键能力是 exploitation：将尚不是攻击的漏洞转化为具体安全影响，例如未授权文件访问或代码执行。Exploitation 尤其具有挑战性，因为它需要低层程序推理（如内存布局）、运行时适应和长时程持续推进。同时，它本质上具有双重用途，既支持防御工作流，也降低进攻门槛。尽管其重要且具有诊断价值，exploitation 仍评估不足。为填补空白，我们引入 ExploitGym，这是一个大规模、多样、真实的 AI 代理 exploitation 能力基准。给定触发漏洞的程序输入，ExploitGym 要求代理逐步将其扩展为可工作的 exploit。该基准包含 898 个实例，来自三个领域的真实世界漏洞：用户空间程序、Google V8 JavaScript 引擎和 Linux 内核。我们改变每个实例应用的安全保护，以隔离其对代理性能的影响。所有配置都封装在可复现容器环境中。评估显示，虽然 exploitation 仍然困难，前沿模型可成功利用非平凡比例的漏洞。例如，最强配置 Anthropic Claude Mythos Preview 和 OpenAI GPT-5.5 分别为 157 和 120 个实例生成可工作 exploit。值得注意的是，即使启用广泛使用的防御，模型仍保持非平凡成功率。这些结果确立 ExploitGym 作为 exploitation 有效测试平台，并突显能力日益增强的 AI 代理带来的网络安全风险。</p>\n<h3>44. How Does Differential Privacy Affect Social Bias in LLMs? A Systematic Evaluation</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> University of Arkansas<br />\n<strong>Author:</strong> Eduardo Tenorio, Karuna Bhaila, Xintao Wu<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Differential Privacy&amp;Bias&amp;Fairness</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.11195\">https://arxiv.org/abs/2605.11195</a></p>\n<p><strong>摘要</strong>: 在网络规模语料上训练的大型语言模型（LLM）可能记忆敏感训练数据，带来显著隐私风险。差分隐私（DP）作为一种原则性框架，可在训练期间限制单个数据点的影响，但差分隐私与 LLM 社会偏见之间的关系仍理解不足。为研究这一点，我们对使用 DP-SGD 训练的预训练 LLM 进行社会偏见系统评估，将 DP 模型与非 DP 基线在四种互补范式下比较：句子评分、文本补全、表格分类和问答。我们发现，DP 在句子评分任务中降低偏见，其中偏见通过受控 likelihood 比较测量，但这一改进并不能泛化到所有任务。结果揭示了 logit 级偏见与输出级偏见之间的差异。此外，降低记忆并不必然减少不公平性，凸显了评估 LLM 公平性时进行多范式评估的重要性。</p>\n<h3>45. Continuous Discovery of Vulnerabilities in LLM Serving Systems with Fuzzing</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> University of Maryland<br />\n<strong>Author:</strong> Yunze Zhao, Yibo Zhao, Yuchen Zhang, Zaoxing Liu, Michelle L. Mazurek<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Fuzzing&amp;LLM Serving&amp;Vulnerabilities</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.11202\">https://arxiv.org/abs/2605.11202</a></p>\n<p><strong>摘要</strong>: LLM 推理与服务系统已成为安全关键基础设施；然而，它们最令人担忧的许多失败来自服务层，而非仅来自模型行为。现代推理引擎结合 KV cache、batching、prefix sharing、speculative decoding、adapters 和多租户调度，产生只有在真实并发工作负载下才出现、且标准模型、安全和 API 测试会漏掉的共享状态行为。我们提出 GRIEF，这是一个用于 LLM 推理引擎的 greybox fuzzer，将定时多请求轨迹视为一等输入，使用轻量 oracle 检测崩溃、挂起、性能病态和静默输出污染，并通过带 log-probability 检查的受控 replay 确认可复现服务层失败。在 vLLM 和 SGLang 的早期活动中，GRIEF 发现 15 个漏洞，其中 10 个由引擎开发者确认，包括 2 个 CVE，涵盖 KV-cache 隔离失败、跨请求性能干扰，以及崩溃或活性 bug。这些结果表明，并发、缓存和状态复用可在没有畸形输入或显式服务器错误的情况下诱发静默跨请求污染、noisy-neighbor 拒绝服务和延迟崩溃，使并发服务行为成为 LLM 基础设施的一等安全与可靠性边界。</p>\n<h3>46. Comment and Control: Hijacking Agentic Workflows via Context-Grounded Evolution</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Wyze Labs<br />\n<strong>Author:</strong> Neil Fendley, Zhengyu Liu, Aonan Guan, Jiacheng Zhong, Yinzhi Cao<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Agentic Workflows&amp;Prompt Injection&amp;Workflow Hijacking</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.11229\">https://arxiv.org/abs/2605.11229</a></p>\n<p><strong>摘要</strong>: GitHub Actions 和 n8n 等自动化平台正越来越多地采用所谓代理式工作流，将大型语言模型（LLM）代理集成到代码审查和数据同步等任务中。虽然这为开发者带来便利，但也暴露出新风险：对手可以控制并构造某些输入（如 GitHub issue 评论）来操纵 LLM 代理执行不想要的动作，例如凭证外泄和任意命令执行。据我们所知，此前没有学术工作研究代理式工作流中的此类风险。一方面，现有工作流分析方法通过静态、路径不敏感分析检测经典注入漏洞，无法推理可行的代理调用路径或运行时代理行为。另一方面，先前越狱研究假设 LLM 输入完全可控，而代理式工作流设置只允许对手基于工作流模板控制提示的一部分，即可利用性受到代理运行时能力和限制约束。本文设计首个检测与利用框架 JAW，通过一种称为 Context-Grounded Evolution 的新方法劫持自动化平台上的代理式工作流。核心思想是在混合程序分析得到的上下文下演化代理式工作流输入以实现劫持。JAW 通过三类分析生成上下文：静态路径可行性分析识别可行代理调用路径和触发它们所需输入约束；动态 prompt-provenance 分析确定输入如何被转换并嵌入 LLM 上下文；能力分析识别代理运行时可用动作和限制。随后，JAW 迭代合成和细化由这些上下文约束的 payload 以实现端到端利用。对 GitHub workflows 和 n8n 模板的评估显示，4,174 个 GitHub workflows 和 8 个 n8n 模板可被成功劫持，例如泄露用户凭证。发现覆盖 15 个广泛使用的 GitHub Actions，包括 Claude Code、Gemini CLI、Qwen CLI 和 Cursor CLI 的官方 GitHub Actions，以及两个官方 n8n 节点。作者已向受影响供应商负责任披露，并收到来自 GitHub、Google 和 Anthropic 等的确认、修复和 bug bounty。</p>\n<h3>47. Context-Aware Spear Phishing: Generative AI-Enabled Attacks Against Individuals via Public Social Media Data</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> The University of Texas at Arlington<br />\n<strong>Author:</strong> Elham Pourabbas Vafa, Sayak Saha Roy, Shirin Nilizadeh<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Phishing&amp;Generative AI&amp;Social Media</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.11268\">https://arxiv.org/abs/2605.11268</a></p>\n<p><strong>摘要</strong>: 我们展示公开可用的社交媒体数据和生成式 AI（GenAI）如何被滥用，以自动化并扩展高度个性化、上下文感知的鱼叉式钓鱼活动。只需极少攻击者努力，每个目标少量公开活动就足以让 GenAI 模型提取兴趣和上下文线索，生成模仿目标风格、同时绕过通用内容审核保护的有说服力消息。我们引入一个模块化框架，结合多模态信号提取、沟通风格画像，以及跨七种策略的攻击类型实例化：诱饵、恐吓软件、蜜罐、尾随、冒充、quid pro quo 和个性化情绪利用。我们开展大规模多模型评估，覆盖数千封生成邮件和八个安全相关标准，并与真实世界钓鱼邮件语料比较。GenAI 生成邮件表现出显著更高的个性化、上下文 grounding 和说服杠杆。重要的是，补充用户研究证实这些结果，显示 LLM 生成攻击在八个维度上一贯优于 APWG eCrimeX 邮件，同时在人类收件人中引发更低怀疑。最后，我们测量并分析现有 proactive、prompt-level 防御机制（包括自适应机制）的行为，以及两种互补防御方法：策略增强的 SOTA safeguard 模型和 system-instruction chain-of-thought moderation。我们记录这些防御如何响应上下文化和自适应攻击提示，强调需要明确考虑大规模上下文化滥用的平台级保护。</p>\n<h3>49. Under the Hood of SKILL.md: Semantic Supply-chain Attacks on AI Agent Skill Registry</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Department of Computer Science, University of Maryland - College Park<br />\n<strong>Author:</strong> Shoumik Saha, Kazem Faghih, Soheil Feizi<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Supply Chain&amp;Agent Skills&amp;Semantic Attacks</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.11418\">https://arxiv.org/abs/2605.11418</a></p>\n<p><strong>摘要</strong>: 自主 AI 代理越来越多地通过 Agent Skills 扩展能力：这些是模块化文件系统包，其 SKILL.md 文件描述代理何时以及如何使用它们。虽然这种设计支持可扩展、按需能力扩展，但也引入了语义供应链风险，其中自然语言元数据和指令会影响哪些技能被接纳、展示、选择和加载。我们使用真实 ClawHub 技能和现实注册机制，研究 Agent Skill 生命周期中三个面向注册表阶段的仅 SKILL.md 攻击。在 Discovery 阶段，短文本触发器可操纵基于 embedding 的检索并提升对抗技能可见性，最高达到 86% pairwise win rate 和 80% Top-10 placement。在 Selection 阶段，仅描述 framing 会使代理偏向功能等价的对抗变体，平均在 77.6% 的配对试验中被选择。在 Governance 阶段，语义规避策略使恶意技能在 36.5%-100% 的案例中避免被阻断判定。总体而言，结果表明 SKILL.md 不是被动文档，而是操作性文本，会塑造代理发现、信任和使用哪些第三方能力。代码：<a href=\"https://link.zhihu.com/?target=http%3A//github.com/ShoumikSaha/agent-skill-security\">http://github.com/ShoumikSaha/agent-skill-security</a>。</p>\n<h3>50. Can a Single Message Paralyze the AI Infrastructure? The Rise of AbO-DDoS Attacks through Targeted Mobius Injection</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> The Hong Kong Polytechnic University, HKUST (GZ)<br />\n<strong>Author:</strong>Zi Liang , Ronghua Li , Yanyun Wang , Qingqing Ye , Haibo Hu<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: DDoS&amp;LLM Agents&amp;Prompt Injection</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.11442\">https://arxiv.org/abs/2605.11442</a></p>\n<p><strong>摘要</strong>: 大型语言模型（LLM）代理已成为关键中介，编排人类用户与广泛数字服务和 LLM 基础设施之间的复杂交互。尽管先前研究广泛审视了孤立 LLM 和代理的安全性，但代理作为用户-代理-服务链中的破坏性“枢纽”所带来的系统性风险仍基本被忽视。在这项工作中，我们通过引入 Mobius Injection 暴露一种新威胁范式，这是一种复杂攻击，可将自主代理武器化为“僵尸节点”，发起我们定义的 Agent-based and -Oriented DDoS（AbO-DDoS）攻击。通过利用代理逻辑中名为 Semantic Closure 的结构性漏洞，对手可以通过单个文本注入诱导代理组件持续递归执行。我们证明，该攻击异常轻量、能躲避传统 DDoS 监控器和当代 AI 安全过滤器，并且高度可配置，允许对特定环境或模型提供商进行精准打击。为评估真实影响，我们在三种代表性 claw-style 代理和三种主流编码代理上开展大量实验，并集成 12 个前沿专有或开放权重 LLM。结果显示，Mobius Injection 在多样任务上取得显著攻击成功，使单节点调用放大最高达到 51.0 倍，多节点 p95 延迟膨胀最高达到 229.1 倍。攻击性能随投毒节点数量呈超线性增长。为缓解 Mobius Injection，我们提出使用 Agent Component Energy（ACE）Analysis 的主动防御机制，通过测量代理组件图中的异常能量检测恶意递归触发。本文预计将成为快速演化的 AI 代理式基础设施安全的关键警示。</p>\n<h3>51. FLOWSTEER: Prompt-Only Workflow Steering Exposes Planning-Time Vulnerabilities in Multi-Agent LLM Systems</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Yunnan University<br />\n<strong>Author:</strong> Fanxiao Li, Jiaying Wu, Tingchao Fu, Natasha Jaques, Wei Zhou, Min-Yen Kan<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Multi-Agent Systems&amp;Workflow Steering&amp;Planning-Time Security</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.11514\">https://arxiv.org/abs/2605.11514</a></p>\n<p><strong>摘要</strong>: 由大型语言模型驱动的多代理系统越来越多地采用 planner-executor 架构，规划器会把提示转化为子任务、角色、依赖关系和路由路径。这种灵活性支持自适应协作，但也在工作流形成阶段暴露攻击面：提示可以在不修改多代理系统基础设施的情况下塑造代理组织。本文从社会影响角度研究该风险，通过探测工作流来识别高影响子任务和恶意信号传播路径。分析揭示了两个漏洞：工作流位置可放大或抑制恶意信号，而 sycophantic framing 会使下游代理更可能转发该信号。作者将这些发现转化为 FLOWSTEER，这是一种仅依赖提示的工作流 steering 攻击，把漏洞先验转化为一个精心构造的提示。FLOWSTEER 将恶意信号与有影响力的任务组件对齐，并引导 replanning 生成能保持传播的依赖关系。实验显示，FLOWSTEER 相比朴素提示最高可使恶意成功率提升 55%，可跨多代理设置迁移，并且在黑盒拓扑推断下仍有效。由于 FLOWSTEER 偏置的是生成工作流的规划信号，只检查生成后工作流的多代理防御保护有限。因此作者提出 FLOWGUARD，这是一种输入侧防御，可在保持提示效用的同时最高降低 34% 的恶意成功率。结果表明，工作流形成是多代理 LLM 系统新的安全前沿，也打开了从规划时安全视角研究代理协作如何被攻击和防御的方向。</p>\n<h3>52. When Emotion Becomes Trigger: Emotion-style dynamic Backdoor Attack Parasitising Large Language Models</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> School of Cyber Science and Engineering, Sichuan University, Chengdu, China<br />\n<strong>Author:</strong> Ziyu Liu, Tao Li, Tianjie Ni, Xiaolong Lan, Wengang Ma, Tao Yang, Guohua Wang, Junjiang He<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Backdoor&amp;Emotion Trigger&amp;Large Language Models</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.11612\">https://arxiv.org/abs/2605.11612</a></p>\n<p><strong>摘要</strong>: 大型语言模型微调中广泛存在后门脆弱性。多数后门投毒方法主要在 token 层面操作，缺乏更深层的语义操纵，因此隐蔽性受限；同时，先前攻击依赖单一固定触发器诱导有害输出，这类静态触发器容易被检测，且干净微调会削弱触发器与目标之间的关联。通过因果验证，作者观察到情绪并不直接绑定到单个词，而是通过语气作为整体风格因素发挥作用。在 LLM 表示空间中，情绪可与语义解耦，并相对原始中性文本形成独立簇。因此，作者将情绪因素视为后门触发器，提出寄生式情绪风格动态后门攻击 Paraesthesia。该方法将带有情绪触发器的样本混入干净数据并微调模型，使模型在推理阶段遇到情绪化输入时生成预定义攻击响应。Paraesthesia 包括情绪风格的量化与重写两个部分。作者在指令跟随生成和分类任务上评估方法，实验显示 Paraesthesia 在两类任务和四个不同模型上均达到约 99% 攻击成功率，同时保持模型的干净效用。</p>\n<h3>53. Safety Context Injection: Inference-Time Safety Alignment via Static Filtering and Agentic Analysis</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Faculty of Data Science, City University of Macau<br />\n<strong>Author:</strong> Zhenhao Xu, Wenhan Chang, Yichuan Chen, Yuxin Fang, Junhao Liu, Tianqing Zhu<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Inference-Time Alignment&amp;Safety Guardrails&amp;Agentic Defense</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.11664\">https://arxiv.org/abs/2605.11664</a></p>\n<p><strong>摘要</strong>: 大型推理模型（LRM）提升了复杂任务表现，但也使部署时安全控制更困难。在黑盒设置中，防御者无法修改模型权重，只能在推理时干预。这带来三个实践挑战：有害意图可能被教育或角色扮演框架隐藏；深度安全分析会引入非平凡延迟；长对抗上下文会稀释简单过滤器依赖的局部线索。这些挑战可能暴露一种表面上的思考-输出鸿沟，即模型在推理时显得谨慎，但最终仍产生不安全答案。为解决该问题，作者提出 Safety Context Injection（SCI），这是一个推理时框架，将安全评估与任务生成分离，并把结构化外部风险报告作为注入的安全上下文前置给受保护模型。该框架包含两个互补变体：Static Model Filtering（SMF），一种轻量单通道护栏，适合快速部署；Dynamic Agents Filtering（DAF），一种基于代理循环的分析器，可对模糊或长上下文攻击迭代收集并综合证据。在 AdvBench 和 GPTFuzz 上，覆盖基础模型与推理模型以及五类越狱家族，两种变体都降低了攻击成功率和毒性。SMF 提供低延迟选择，DAF 则在有害意图被语义伪装或分散在长上下文中时更有效。</p>\n<h3>54. Robust LLM Unlearning Against Relearning Attacks: The Minor Components in Representations Matter</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Shanghai University of Finance and Economics<br />\n<strong>Author:</strong> Zeguan Xiao, Xuanzhe Xu, Yun Chen, Yong Wang, Jian Yang, Yanqing Hu, Guanhua Chen<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Unlearning&amp;Relearning Attacks&amp;Representation Geometry</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.11685\">https://arxiv.org/abs/2605.11685</a></p>\n<p><strong>摘要</strong>: 大型语言模型的 unlearning 旨在无需昂贵重训的情况下移除特定数据影响，以应对隐私、版权和安全问题。然而，近期研究揭示了一个关键漏洞：被 unlearn 的模型会通过 relearning 攻击快速恢复“遗忘”的知识，这对开放权重模型尤其构成严重安全担忧。本文从表示几何角度研究这种脆弱性的根本机制。作者发现，现有 unlearning 方法主要沿主导成分优化，使次要成分基本保持不变。关键在于，在 relearning 攻击期间，主导成分中的修改容易被逆转，从而实现快速知识恢复，而次要成分对这种逆转表现出更强抵抗力。作者进一步从表示的谱结构出发提供理论分析解释这些观察。基于这一洞见，作者提出 Minor Component Unlearning（MCU），一种显式针对表示中次要成分的新型 unlearning 方法。通过将 unlearning 效果集中在这些天然鲁棒的方向上，该方法显著提升了对 relearning 攻击的抵抗力。三个数据集上的大量实验验证了该方法，相比包括 sharpness-aware minimization 在内的最先进方法取得显著改进。</p>\n<h3>55. Persona-Conditioned Adversarial Prompting: Multi-Identity Red-Teaming for Adversarial Discovery and Mitigation</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> IBM Research<br />\n<strong>Author:</strong> Anisa Halimi, Cristian Morasso, Muhammad Zaid Hameed, Douglas Leith<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Red Teaming&amp;Persona Conditioning&amp;Jailbreak</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.11730\">https://arxiv.org/abs/2605.11730</a></p>\n<p><strong>摘要</strong>: 面向 LLM 的自动红队测试常常只发现狭窄攻击切片，遗漏多样真实威胁，并为安全微调产生不足数据。本文提出 Persona-Conditioned Adversarial Prompting（PCAP），将对抗搜索条件化在多样攻击者 persona（如医生、学生、恶意行为者）和策略集合上，以探索现实攻击场景。通过并行运行 persona 条件化搜索，PCAP 可在不同上下文中发现可迁移越狱，并通过自动元数据跟踪生成丰富防御数据集。在 GPT-OSS 120B 上，PCAP 将攻击成功率从 57% 提升到 97%，同时产生 2-6 倍更多样的提示，覆盖多种真实世界场景。关键的是，用 PCAP 生成数据微调轻量适配器可显著提升模型鲁棒性（recall 从 0.36 到 0.99，F1 从 0.53 到 0.96），且误报很少，展示了从漏洞发现到自动化对齐的实用闭环方法。</p>\n<h3>56. IPI-proxy: An Intercepting Proxy for Red-Teaming Web-Browsing AI Agents Against Indirect Prompt Injection</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Vulcan Research, AIFT<br />\n<strong>Author:</strong> Chia-Pei (Janet) Chen, Kentaroh Toyoda, Anita Lai, Alex Leung<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Indirect Prompt Injection&amp;Web Agents&amp;Red Teaming</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.11868\">https://arxiv.org/abs/2605.11868</a></p>\n<p><strong>摘要</strong>: Web 浏览型 AI 代理越来越多地在企业场景中部署，并受限于严格的获批域名白名单，但对手仍可通过在这些域名服务的 HTML 页面中嵌入隐藏指令来影响代理。现有红队资源无法覆盖这一场景：提示注入基准通常提供代理无法访问的预构建对抗页面，而通用 LLM 扫描器探测的是模型 API 而非检索内容。本文提出 IPI-proxy，一个用于红队测试 Web 浏览代理抵抗间接提示注入（IPI）的开源工具包。其核心是一个拦截代理，可在传输过程中重写来自白名单域名的真实 HTTP 响应，嵌入来自统一库的 payload；该库包含从 BIPIA、InjecAgent、AgentDojo、Tensor Trust、WASP 和 LLMail-Inject 六个已发布基准中提取并去重的 820 条攻击字符串。基于 YAML 的测试 harness 可独立参数化 payload 集、嵌入技术（HTML 注释、不可见 CSS 或 LLM 生成语义文本）和 HTML 插入位置，从而无需 mock 页面或沙箱环境即可进行参数扫掠评估。配套的 exfiltration tracker 记录成功回调。IPI-proxy 弥合了静态基准与真实部署之间的差距，为 AI 安全团队提供了可复现基底，用于在攻击者实际利用的同一检索表面上测量并强化 Web 浏览代理。</p>\n<h3>57. BadSKP: Backdoor Attacks on Knowledge Graph-Enhanced LLMs with Soft Prompts</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Ministry of Education Key Lab for Intelligent Networks and Network Security, Xi’an Jiaotong University<br />\n<strong>Author:</strong> Xiaoting Lyu, Yufei Han, Hangwei Qian, Haoyuan Yu, Xiang Ao, Bin Wang, Chenxu Wang, Xiaobo Ma, Wei Wang<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Backdoor&amp;Knowledge Graph&amp;Soft Prompts</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.11996\">https://arxiv.org/abs/2605.11996</a></p>\n<p><strong>摘要</strong>: 近期知识图谱增强的大型语言模型不再只通过文本增强知识，而是通过图神经网络将检索到的子图编码为连续 soft prompt，引入一个与标准文本接口并行运作的图条件通道。然而，现有后门攻击大多针对文本通道，其对这种双通道架构的有效性尚不清楚。作者表明，该架构产生了鲁棒性差距：能够轻易攻破文本知识图谱提示系统的文本通道后门攻击，在基于 soft prompt 的对应系统上大幅失效。作者通过语义锚定解释这一差距，即图派生 soft prompt 会将驱动生成的隐藏状态偏向与查询一致的语义，并抑制表层恶意指令。由于这种锚定效应本身由图通道诱导，操纵图级表示的攻击者也可反过来将其重定向到对抗语义。为展示该风险，作者提出 BadSKP，这是一种针对图到 prompt 接口的后门攻击，采用多阶段优化策略：构造对抗目标嵌入，优化投毒节点嵌入以引导诱导出的 soft prompt，并用流畅的对抗节点属性近似优化表示。两个 soft-prompt 知识图谱增强 LLM 和四个数据集上的实验显示，BadSKP 在冻结和 trojaned 设置下均取得高攻击成功率，而纯文本攻击即使面对基于困惑度的防御也仍不可靠。</p>\n<h3>58. SkillSafetyBench: Evaluating Agent Safety under Skill-Facing Attack Surfaces</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Peking University<br />\n<strong>Author:</strong> Chang Jin, Qiaosheng Zhang<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Agent Skills&amp;Safety Evaluation&amp;Attack Surfaces</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.12015\">https://arxiv.org/abs/2605.12015</a></p>\n<p><strong>摘要</strong>: 可复用技能正成为扩展大型语言模型代理的常见接口，它们把过程性指导与文件、工具、记忆和执行环境访问打包在一起。然而，这种模块化引入了现有安全评估大多遗漏的攻击面：即使用户请求是良性的，任务相关技能材料或本地 artifacts 也可能将代理引向不安全动作。作者提出 SkillSafetyBench，一个可运行基准，用于评估这类由技能媒介引发的安全失败。SkillSafetyBench 包含 155 个对抗案例，覆盖 47 个任务、6 个风险领域和 30 个安全类别，每个案例都用特定规则验证器评估。使用多个 CLI 代理和模型后端的实验显示，局部非用户攻击可持续诱导不安全行为，并在不同领域、攻击方法和 scaffold-model 配对之间表现出不同失败模式。研究表明，代理安全不仅取决于模型级对齐，也取决于代理如何解释技能、信任工作流上下文，以及通过可执行环境行动。</p>\n<h3>59. PRIVACYSIM: Evaluating LLM Simulation of User Privacy Behavior</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> University of Southern California<br />\n<strong>Author:</strong> James Flemings, Murali Annvaram<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Privacy Simulation&amp;User Behavior&amp;LLM Evaluation</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.12147\">https://arxiv.org/abs/2605.12147</a></p>\n<p><strong>摘要</strong>: 大型语言模型越来越多地用于模拟人类行为，但它们模拟个体隐私决策的能力尚不清楚。本文研究一组核心用户 persona 属性是否能驱动 LLM 模拟个体级隐私行为。作者引入 PRIVACYSIM，这是一个评估套件，将 LLM 对用户隐私行为的模拟与 1,000 名用户的真实回答比较。这些用户来自五项已发表的隐私用户研究，覆盖 LLM 医疗咨询、对话代理和聊天机器人。基于这些研究，作者假设三类 persona 面向可能预测隐私决策：人口统计信息、过往经历和陈述的隐私态度。作者将九个前沿 LLM 条件化在这三类面向的不同子集上，并测量模型对数据共享场景的响应与用户真实响应匹配的频率。发现包括：隐私 persona 条件化相比无 persona 条件化持续提升模拟质量，但最强模型也只有 40.4% 准确率，仍远不能忠实模拟个体隐私决策；用户陈述的隐私态度本身可能不是最佳预测变量，因为它常与实际隐私行为不一致；具有高 AI/聊天机器人经验但低陈述隐私态度的用户最难模拟。PRIVACYSIM 是理解并提升 LLM 模拟用户隐私决策能力的第一步。</p>\n<h3>60. Reconstruction of Personally Identifiable Information from Supervised Finetuned Models</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Northeastern University<br />\n<strong>Author:</strong> Sae Furukawa, Alina Oprea<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Privacy&amp;PII Reconstruction&amp;Supervised Finetuning</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.12264\">https://arxiv.org/abs/2605.12264</a></p>\n<p><strong>摘要</strong>: 监督微调已成为将具有广泛预训练知识的大型语言模型适配到领域特定、指令跟随任务的主要方法之一。由指令-响应对组成的 SFT 数据集常包含用户提供的信息，其中可能有个人身份信息（PII）等敏感数据，引发隐私担忧。本文首次研究从 SFT 模型重构 PII 的问题。作者构建了敏感领域中的多轮、以用户为中心的问答数据集，特别是医疗和法律场景，并纳入 PII 以支持真实泄露评估。基于这些数据集，作者评估具有不同微调数据集知识水平的对手在多大程度上可推断 SFT 使用者的敏感信息。在重构设置中，作者提出 COVA，一种用于前缀攻击下重构 PII 的新解码算法，持续优于现有抽取方法。结果显示，即使攻击者只有部分知识，也能显著提高重构成功率，而泄露程度在不同 PII 类型之间差异很大。</p>\n<h3>61. Attacks and Mitigations for Distributed Governance of Agentic AI under Byzantine Adversaries</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Northeastern University<br />\n<strong>Author:</strong> Matthew D. Laws, Alina Oprea, Cristina Nita-Rotaru<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Agentic AI Governance&amp;Byzantine Adversaries&amp;Access Control</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.12364\">https://arxiv.org/abs/2605.12364</a></p>\n<p><strong>摘要</strong>: 代理式 AI 治理是代理式 AI 基础设施的关键组件，用于确保代理遵循其所有者的通信与交互策略，并防御恶意代理攻击。最先进方案 SAGA 假设存在逻辑集中信任点 Provider，作为用户和代理信息仓库并主动执行策略。虽然 SAGA 能防护恶意代理，但如果 Provider 本身恶意偏离协议，它仍会被破坏，从而削弱身份与访问控制基础设施安全。私有云和公有云部署都可能受到内部威胁，进一步增加 Provider compromise 风险。本文分析 compromised Provider 可发起的攻击，考虑不同系统组件和现实部署，识别并执行若干具有破坏性的具体攻击，包括削弱代理可归因性、提取私有数据或绕过访问控制。作者随后提出三类保护 Provider 的方案，在安全性与性能之间提供不同权衡，包括完全拜占庭鲁棒架构 SAGABFT、阈值签名/分布式证明方向以及更轻量的部署方案。研究表明，代理治理系统不能依赖单一集中信任点，而需要可审计、抗拜占庭和部署可行的信任分布机制。</p>\n<h3>62. Scalable Token-Level Hallucination Detection in Large Language Models</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Hong Kong University of Science and Technology<br />\n<strong>Author:</strong> Rui Min<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Hallucination&amp;Token-Level Detection&amp;Large Language Models</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.12384\">https://arxiv.org/abs/2605.12384</a></p>\n<p><strong>摘要</strong>: 本文关注大型语言模型中的可扩展 token 级幻觉检测。相较只对整个回答给出是否幻觉的全局判断，token 级检测可以定位具体不可靠片段，更适合辅助下游审查、引用验证和交互式修正。论文提出一种面向长文本输出的检测框架，旨在在保持可扩展性的同时识别局部 hallucinated token 或 span，并分析模型置信度、上下文一致性和生成轨迹中的信号如何支持细粒度判断。实验表明，细粒度检测能够比句子级或回答级指标提供更高分辨率的错误定位，并在实际 LLM 输出审计中更具操作价值。该工作强调，面向可靠性的幻觉防御需要从“是否有错”的粗粒度评估转向“哪里出错、为何出错”的可定位检测。</p>\n<h3>63. TextSeal: A Localized LLM Watermark for Provenance &amp; Distillation Protection</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> FAIR, Meta Superintelligence Labs<br />\n<strong>Author:</strong> Tom Sander, Hongyan Chang, Sylvestre-Alvise Rebuffi, Tomas Soucek, Tuan Tran, Valeriu Lacatusu, Alexandre Mourachko, Surya Parimi, Christophe Ropers, Rashel Moritz, Vanessa Stark, Hady Elsahar, Pierre Fernandez<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Watermarking&amp;Provenance&amp;Distillation Protection</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.12456\">https://arxiv.org/abs/2605.12456</a></p>\n<p><strong>摘要</strong>: 本文介绍 TextSeal，一种面向大型语言模型的先进水印。基于 Gumbel-max sampling，TextSeal 引入双密钥生成以恢复输出多样性，并结合 entropy-weighted scoring 和 multi-region localization 提升检测能力。它支持 speculative decoding 和 multi-token prediction 等服务优化，且不增加推理开销。TextSeal 在检测强度上严格优于 SynthID-text 等基线，并对 dilution 具有鲁棒性，即使在人类/AI 混合严重的文档中也能保持有信心的局部检测。该方案在理论上是 distortion-free 的，推理基准评估确认其保持下游性能；一项多语言人类评估（6,000 次 A/B 比较，5 种语言）显示没有可感知的质量差异。除 provenance 检测外，TextSeal 还具有“radioactive”属性：其水印信号可通过模型蒸馏迁移，使未经授权使用水印输出训练的学生模型也可被检测。</p>\n<h3>64. BackFlush: Knowledge-Free Backdoor Detection and Elimination with Watermark Preservation in Large Language Models</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Drone Lab, Indian Institute of Technology Mandi, India<br />\n<strong>Author:</strong> Jagadeesh Rachapudi, Ritali Vatsi, Pranav Singh, Praful Hambarde, Amit Shukla<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Backdoor Detection&amp;Watermark Preservation&amp;Unlearning</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.12529\">https://arxiv.org/abs/2605.12529</a></p>\n<p><strong>摘要</strong>: 近期大型语言模型面临后门攻击风险，攻击者可在训练或模型编辑期间加入恶意触发器，使模型在特定输入模式下产生有害输出，同时保持正常输入上的干净性能。合法水印作为所有权签名，也使用类似的触发器-载荷机制，这造成一个关键挑战：如何在不破坏水印完整性的情况下检测并消除未知后门。现有防御通常需要触发器或 payload 先验知识、依赖干净参考模型，或牺牲模型效用且不保留水印。本文提出 BackFlush 及其变体，这是一个用于检测和消除后门同时保留水印的统一框架。作者建立两个观察：Backdoor Flushing Phenomenon，即注入并 unlearn 辅助数据可消除既有后门；以及 Backdoor Susceptibility Amplification，即后门模型更容易被二次后门注入，从而支持常数时间检测。BackFlush 使用 Rotation-based Parameter Editing（RoPE）Unlearning，通过旋转嵌入在保留水印的同时消除后门。跨多种触发器类型和架构的评估显示，BackFlush 可达到约 1% 攻击成功率、约 99% 干净准确率，并保留水印能力。</p>\n<h3>65. Persona-Conditioned Adversarial Prompting (PCAP): Multi-Identity Red-Teaming for Enhanced Adversarial Prompt Discovery</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> IBM Research<br />\n<strong>Author:</strong> Cristian Morasso, Anisa Halimi, Muhammad Zaid Hameed, Douglas Leith<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Red Teaming&amp;Persona Conditioning&amp;Adversarial Prompts</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.12565\">https://arxiv.org/abs/2605.12565</a></p>\n<p><strong>摘要</strong>: 本文提出 Persona-Conditioned Adversarial Prompting（PCAP），将对抗提示搜索条件化在多种攻击者身份和策略上，以发现更贴近真实场景的攻击提示。传统自动红队测试容易集中在少数攻击切片，既遗漏多样威胁，也无法生成足够丰富的安全微调数据。PCAP 通过并行探索不同 persona（如专家、学生、恶意用户等）下的攻击路径，生成具有上下文差异和迁移性的越狱提示，并保留用于防御数据构建的元数据。实验显示，PCAP 能显著提高攻击发现率和提示多样性；用其生成的数据训练轻量适配器可提升模型鲁棒性，并保持较低误报。该方法提供了从多身份攻击发现到自动化缓解的闭环红队流程。</p>\n<h3>66. Large Language Models for Agentic NetOps and AIOps: Architectures, Evaluation, and Safety</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Lancaster University<br />\n<strong>Author:</strong> Muhammad Bilal<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Agentic NetOps&amp;AIOps&amp;Operational Safety</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.12729\">https://arxiv.org/abs/2605.12729</a></p>\n<p><strong>摘要</strong>: 本文综述大型语言模型在代理式 NetOps 和 AIOps 中的架构、评估和安全问题。随着 LLM 从问答工具转向能够检索证据、调用工具、提出变更并执行受控动作的代理，网络和运维任务也从静态分析转向工作流式操作。作者围绕自治层级、工具范围、证据轨迹和 assurance contracts 组织相关文献。这些合约规定代理可观察、可建议和可执行的内容，以及任何动作前必须通过的检查。文献显示，运维可靠性主要不来自模型本身，而来自围绕模型的机制：类型化工具接口、具 provenance 和 freshness 感知的检索、显式预算与停止规则、最小权限访问，以及代理无法绕过的写边界验证门。作者还主张评估应超越静态问答，转向工作流中心评估，包括轨迹质量、有界工具使用、安全 proposal 生成、沙箱 replay，以及带 rollback-aware scoring 的 canary trials。论文最后讨论当代理接近操作控制面时突出的安全、隐私和治理风险，如通过运维 artifacts 的提示注入、检索投毒、遥测完整性攻击、过度授权和弱审计性。</p>\n<h3>67. CoT-Guard: Small Models for Strong Monitoring</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> University of Illinois Urbana-Champaign<br />\n<strong>Author:</strong> Nirav Diwan, Han Wang, Berkcan Kapusuzoglu, Ramin Moradi, Supriyo Chakraborty, Giri Iyengar, Sambit Sahu, Huan Zhang, Gang Wang<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Chain-of-Thought&amp;Monitoring&amp;Hidden Objectives</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.12746\">https://arxiv.org/abs/2605.12746</a></p>\n<p><strong>摘要</strong>: 监控推理模型的 chain-of-thought（CoT）是检测代码生成任务中隐蔽不当行为（隐藏目标）的有前景方法。虽然大模型如 GPT-5 和 Gemini-3-Flash 可作为有效 CoT 监控器，但推理轨迹长且 API 成本高，部署昂贵，因此需要更小更便宜的替代方案。作者发现，当前小模型（4B-8B）即使能访问 CoT，也难以检测隐藏目标，并经常将其误归因于用户查询。为解决该问题，作者提出结合监督微调和强化学习的 post-training 流水线：SFT 通过从强监控器蒸馏检测行为来缩小域内任务差距，RL 则在困难且微妙构造的隐藏目标上训练，以提升域外监控泛化。评估采用现实威胁模型：第三方 LLM router 通过提示操纵或代码操纵攻击，将隐藏目标注入代码生成请求。作者还提出四个对强监控器也具挑战性的新任务。最终得到的 CoT-Guard 是一个 4B 参数监控器，在提示和代码操纵攻击下取得更强泛化，G-Mean2 达 75%，超过 GPT-5.4、GPT-5-mini 和 Qwen3-32B，并接近 Gemini-3-Flash。</p>\n<h3>68. Persona-Model Collapse in Emergent Misalignment</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> TELUS Digital Research Hub<br />\n<strong>Author:</strong> Davi Bastos Costa<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Emergent Misalignment&amp;Persona Collapse&amp;Fine-Tuning</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.12850\">https://arxiv.org/abs/2605.12850</a></p>\n<p><strong>摘要</strong>: 在包含有害内容的狭窄数据上微调大型语言模型，会在无关提示上产生广泛失调行为，这一现象被称为 emergent misalignment。作者提出 emergent misalignment 涉及 persona-model collapse，即模型内部模拟、区分和保持一致角色的能力退化。论文用两个行为指标检验该假设：moral susceptibility（S）和 moral robustness（R），它们基于模型在 persona role-play 下的 Moral Foundations Questionnaire 响应的跨 persona 和 persona 内变异计算，分别形式化模型区分角色的能力与模拟特定角色时的一致性。作者评估四个前沿模型的三种变体：base、微调为输出不安全代码、以及匹配的输出安全代码控制组。四个模型中，不安全微调使 S 平均飙升 55%，并使 R 平均下降 65%；安全控制组则基本保持 S 并只造成部分 R 损失，显示这些效应特异于诱发 emergent misalignment 的微调。结合无条件响应向量向量尺度上限饱和等现象，结果为 emergent misalignment 涉及 persona-model collapse 提供了行为证据。</p>\n<h3>69. Do Skill Descriptions Tell the Truth? Detecting Undisclosed Security Behaviors in Code-Backed LLM Skills</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Unknown<br />\n<strong>Author:</strong> Wenhui He, Yue Li, Bang Fu, Huan Xing, Xing Fan, ZeHua Zhang, Baoning Niu<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Agent Skills&amp;Security Behaviors&amp;Static Analysis</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.12875\">https://arxiv.org/abs/2605.12875</a></p>\n<p><strong>摘要</strong>: LLM 生态中的程序化技能由自然语言描述和可执行实现文件组成。用户和 LLM 依赖描述来理解技能范围，但实现可能执行描述未说明的安全相关操作，例如访问凭证、网络通信或命令执行。本文研究描述-实现不一致：实现是否超出描述声明的安全相关范围。作者手动分析 920 个真实世界程序化技能，并构建 11 类安全属性分类体系。基于该体系，作者构建 SKILLSCOPE，从实现中生成源码级安全属性图（SPG），并进行 LLM 辅助一致性检查。SPG 节点保留源码级代码模式，而非抽象分类标签，从而为检查保留细粒度证据。在 4,556 个程序化技能和双盲人工审查上，SKILLSCOPE 识别不一致的 precision 为 84.8%、recall 为 96.5%。确认的不一致影响 9.4% 技能，而描述较粗但实现细节仍在声明范围内的案例占 24.3%。消融实验确认 SPG 和 taxonomy 均有贡献：移除 taxonomy 会将 precision 从 87.8% 降至 72.3%，移除 SPG 会将 recall 从 94.7% 降至 79.0%。</p>\n<h3>70. Adaptive Steering and Remasking for Safe Generation in Diffusion Language Models</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Department of Computer Science<br />\n<strong>Author:</strong> Yo-Sub Han, Yejin Lee<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Diffusion Language Models&amp;Safe Generation&amp;Inference-Time Defense</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.13043\">https://arxiv.org/abs/2605.13043</a></p>\n<p><strong>摘要</strong>: 扩散语言模型通过迭代去噪和双向 refinement 生成文本，是自回归语言模型的有前景替代方案。然而，这种迭代生成范式也引入了独特安全漏洞：中间去噪步骤生成的有害 token 会通过后续 refinement 传播，最终诱导不安全输出。既有修复尝试要么无法生成安全输出，要么生成安全但低质量的输出。本文提出一种基于去噪过程逐步干预的推理时防御框架，在不损害输出质量的情况下提升安全性。核心组件是 contrastive safety direction（SGD），一种捕获有害与安全生成之间语义边界的潜在方向。作者用 SGD 在每个去噪步骤评估生成 token 与有害语义的对齐程度。当检测到有害对齐时，方法会重新 mask 对应 token，并以自适应 steering 恢复去噪过程，steering 强度根据估计的有害程度调节。作为即插即用模块，该方法无需额外微调，可直接纳入现成扩散模型。实验显示，该方法将越狱成功率降至 0.64%，同时保持接近原模型的生成质量。</p>\n<h3>71. No Attack Required: Semantic Fuzzing for Specification Violations in Agent Skills</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> University of California, Los Angeles<br />\n<strong>Author:</strong> Ying Li, Hongbo Wen, Yanju Chen, Hanzhi Liu, Yuan Tian, Yu Feng<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Agent Skills&amp;Semantic Fuzzing&amp;Specification Violations</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.13044\">https://arxiv.org/abs/2605.13044</a></p>\n<p><strong>摘要</strong>: LLM 代理可能在常规用户请求下静默删除文档、泄露凭证或转账，并不是因为代理受到攻击，而是因为其调用的技能违反了自身声明的安全规则。作者将其称为 specification violations：良性输入导致技能突破自身规范中的自然语言护栏，通常是因为护栏语义未针对自主执行定义，或实现静默忽略了文档化约束。这些违规对静态分析器、传统 fuzzers 和提示注入防御都不可见，却破坏了用户安装技能时信任的契约。作者提出 SEFZ，一个目标导向语义 fuzzing 框架，可自动发现代理技能中的规范违规。SEFZ 将每条护栏转化为带注释执行轨迹上的可达性目标，将违规检查归约为确定性图查询。基于 LLM 的 mutator 生成良性输入，其轨迹在 multi-armed bandit 指导下逐步接近违规模式，奖励信号来自目标接近度。在最大公共代理技能市场的 402 个真实技能上，SEFZ 在 120 个技能（29.9%）中发现规范违规，包括 26 个此前未知且可利用的已部署技能护栏违规。六类反复出现的规范陷阱解释了大部分失败，提示了更安全技能设计原则。</p>\n<h3>72. Model-Agnostic Lifelong LLM Safety via Externalized Attack-Defense Co-Evolution</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> City University of Hong Kong<br />\n<strong>Author:</strong> Xiaozhe Zhang, Chaozhuo Li, Hui Liu, Shaocheng Yan, Bingyu Yan, Qiwei Ye, Haoliang Li<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Lifelong Safety&amp;Attack-Defense Co-Evolution&amp;Model-Agnostic Defense</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.13411\">https://arxiv.org/abs/2605.13411</a></p>\n<p><strong>摘要</strong>: 大型语言模型仍易受可诱导有害输出的对抗提示影响。现有安全范式通常把红队测试和 post-training 耦合在封闭、策略中心的循环中，使攻击发现快速饱和，限制新失败模式暴露，同时使防御低效、僵硬且难以跨受害模型迁移。为此，作者提出 EvoSafety，一个围绕持久、可检查、可复用外部结构构建的 LLM 安全框架。对红队测试，EvoSafety 为攻击策略配备对抗技能库，使其在饱和后可通过简单扩展库持续探测漏洞，并支持对抗向量演化。对防御学习，EvoSafety 用带记忆检索的轻量辅助防御模型替代模型特定安全微调，从而实现高效、可迁移且模型无关的安全改进，并可仅通过记忆更新增强鲁棒性。通过一次训练，防御策略可在 Steer 和 Guard 两种模式下运行：前者激活受害模型内在防御机制，后者直接过滤有害输入。大量实验显示 EvoSafety 优势明显：Guard 模式下达到 99.61% 防御成功率，以 Qwen3Guard-8B 37.5% 的参数量超过其 14.13%，同时保持良性查询推理性能。</p>\n<h3>73. Sleeper Channels and Provenance Gates: Persistent Prompt Injection in Always-on Autonomous AI Agents</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Independent Research<br />\n<strong>Author:</strong> Narek Maloyan, Dmitry Namiot<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Persistent Prompt Injection&amp;Provenance Gates&amp;Autonomous Agents</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.13471\">https://arxiv.org/abs/2605.13471</a></p>\n<p><strong>摘要</strong>: Always-on AI 代理（如 OpenClaw、Hermes Agent）作为单个持久进程在所有者身份下运行，将消息、记忆、自写技能、调度和 shell 折叠进一个权限边界。这种配置打开了作者称为 sleeper channels 的攻击面：一个表面上的不受信任输入会作为记忆、技能、计划任务或文件系统补丁持久化，并在攻击者不在场时通过另一个表面触发。该类别由两个独立轴定义：持久化 substrate 和 firing-separation。作者通过 OpenClaw 固定提交端到端演示 confused-deputy cron 攻击。防御分为 D1、D2、D3，D2 在七个命名部署不变量下具有 soundness theorem。D2 基于 canonical action-instance digest 和一次性所有者 attestation，可抵御 paraphrase laundering、多输入授权复用和 replay。配套 artifact 提供 gate、对 vendored source 的静态审计，以及围绕 cron 路径实现十个 mediation hooks 中五个的运行时适配器。</p>\n<h3>74. Towards the Next Frontier of LLMs, Training on Private Data: A Cross-Domain Benchmark for Federated Fine-Tuning</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Sherpa.ai<br />\n<strong>Author:</strong> Sherpa.ai<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Federated Fine-Tuning&amp;Private Data&amp;LLM Adaptation</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.13936\">https://arxiv.org/abs/2605.13936</a></p>\n<p><strong>摘要</strong>: 大型语言模型近期成功很大程度上由海量公共数据推动，但 LLM 发展的下一个前沿位于公共数据之外。世界上许多最有价值的信息是私有的，尤其在医疗和金融等强监管领域，数据包含患者历史或客户通信。释放这些数据可能带来重大飞跃，使 LLM 具备更深领域专长和更强真实世界效用。然而，这些数据分布在不同机构中，并受隐私、监管和组织壁垒约束，无法共享；且机构数据通常非独立同分布，在人群特征、数据模态、文档模式和任务标签分布上不同。本文展示一种通过跨数据孤岛联邦协作释放私有分布式机构数据进行 LLM 适配的实用方法。基于 Sherpa.ai Federated Learning 平台，框架允许节点在不交换私有数据的情况下共同微调共享 LLM。作者通过医疗和金融跨领域基准评估该方法，使用 MedQA、MedMCQA、FPB 和 FiQA-SA 四个闭式问答与分类数据集，并在反映机构数据异质性的 non-IID 设置下比较 LoRA、QLoRA 和 IA3 三种 PEFT 策略。结果显示，联邦微调接近集中训练并优于孤立单机构学习；从 Green AI 角度看，QLoRA 和 IA3 在有限精度损失下提升效率，支持 federated PEFT 作为无法共享数据场景中适配 LLM 的可行路径。</p>\n<h3>75. AgentTrap: Measuring Runtime Trust Failures in Third-Party Agent Skills</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> University of Southern California<br />\n<strong>Author:</strong> Haomin Zhuang, Yue Huang<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Agent Skills&amp;Runtime Trust&amp;Supply Chain</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.13940\">https://arxiv.org/abs/2605.13940</a></p>\n<p><strong>摘要</strong>: 第三方技能正成为 LLM 代理的包生态。它们将自然语言指令、辅助脚本、模板、文档和服务配置打包为可复用工作流。技能很有用，但也引入新的安全问题：恶意技能不需要要求模型执行明显有害动作，而可把有害行为伪装为常规工作流的一部分，依赖代理以高价值权限和有限人工监督执行该工作流。作者提出 AgentTrap，一个动态基准，用于评估 LLM 代理是否能在使用第三方技能时抵抗恶意运行时行为。AgentTrap 包含 141 个任务：91 个恶意任务和 50 个良性实用任务，覆盖基于代理技能供应链威胁的 16 个安全影响维度。每个任务中，代理收到普通用户请求，在安装了可能包含恶意工作流元素的技能下运行，并在沙箱环境中执行。AgentTrap 随后评判完整轨迹，包括攻击成功、被阻断或拒绝、攻击未触发和无攻击证据等结果。核心发现是，最有信息量的失败不是简单越狱；模型常常完成可见用户任务，同时把技能引入的不安全副作用当作正常工作流。这说明需要对用户实际委托工作的具体 model-framework-workspace 环境进行运行时评估。</p>\n<h3>76. Mistletoe: Stealthy Acceleration-Collapse Attacks on Speculative Decoding</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Harbin Institute of Technology, Shenzhen<br />\n<strong>Author:</strong> Shuoyang Sun, Chang Dai, Hao Fang, Kuofeng Gao, Xinhao Zhong, Yi Sun, Fan Mo, Shu-Tao Xia, Bin Chen<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Speculative Decoding&amp;Inference Security&amp;Acceleration Collapse</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.14005\">https://arxiv.org/abs/2605.14005</a></p>\n<p><strong>摘要</strong>: Speculative decoding 已成为加速大型语言模型推理的常用技术，它先草拟多个候选 token，再用目标模型并行验证。然而，其效率高度依赖平均接受长度 τ，即每个验证步骤保留下来的 draft token 数。本文识别出基于模型的 speculative decoding 中一个新的机制级漏洞：drafter 被训练来近似目标模型分布，但这种近似不可避免地不完美。drafter-target mismatch 创造了隐藏攻击面，小扰动可保持目标模型可见行为，同时显著降低 draft-token 可接受性。作者提出 MISTLETOE，一种隐蔽的 speculative decoding 加速坍塌攻击。MISTLETOE 直接攻击接受机制，联合优化降低 drafter-target 一致性的 degradation 目标和约束目标模型输出分布的语义保持目标。为解决两个目标冲突，作者引入 null-space projection，将 degradation 梯度从局部语义保持方向投影出去，以在最小语义漂移下抑制 draft 接受。多种 speculative decoding 系统上的实验显示，MISTLETOE 显著降低平均接受长度、摧毁加速并降低平均 token throughput，同时保持输出质量和困惑度。该工作表明，speculative decoding 引入了超出现有输出鲁棒性的机制级攻击面，需要更鲁棒的 LLM 加速系统设计。</p>\n<h3>77. Measuring and Mitigating Toxicity in Large Language Models: A Comprehensive Replication Study</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> University of Illinois Chicago<br />\n<strong>Author:</strong> Mokshit Surana, Archit Rathod, Akshaj Kurra Satishkumar<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Toxicity&amp;Mitigation&amp;Replication Study</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.14087\">https://arxiv.org/abs/2605.14087</a></p>\n<p><strong>摘要</strong>: 在网络规模语料上训练的大型语言模型会吸收训练数据中的有毒模式，导致“toxic degeneration”，即无害提示也可能触发有害输出。这对真实部署构成显著风险，因此需要在保持模型效用的同时确保安全的缓解策略。本文进行综合复现实验，评估 DExperts（Decoding-time Experts）这一推理时缓解技术的有效性，它无需重训模型即可引导生成。研究分为三个系统阶段：首先用 RealToxicityPrompts 在标准 GPT-2 模型上建立基线毒性测量；随后实现并评估 DExperts 缓解显式毒性；最后用对抗性 ToxiGen 数据集压力测试其对隐式仇恨言论的表现。结果确认，DExperts 在显式毒性基准上达到近乎完美的安全率（100%），但面对对抗性隐式仇恨言论时表现脆弱，安全率降至 98.5%。此外，作者量化了关键权衡：该方法引入约 10 倍延迟惩罚（每次生成从 0.2 秒到 2.0 秒），给实时部署带来挑战。研究强调显式与隐式毒性缓解之间的鲁棒性缺口，并指出需要能泛化到多样仇恨言论模式且计算成本不过高的方法。</p>\n<h3>78. ProtoMedAgent: Multimodal Clinical Interpretability via Privacy-Aware Agentic Workflows</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> School of Computing and Communications, Lancaster University<br />\n<strong>Author:</strong> Alvaro Lopez Pellicer, Plamen Angelov, Marwan Bukhari, Yi Li, Eduardo Soares, Jemma Kerns<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Clinical AI&amp;Interpretability&amp;Privacy</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.14113\">https://arxiv.org/abs/2605.14113</a></p>\n<p><strong>摘要</strong>: 可解释原型网络为临床诊断提供有吸引力的基于案例的推理，但其原始连续输出缺乏医疗文档所需的语义结构。通过标准 RAG 弥合这一差距经常触发“retrieval sycophancy”，即 LLM 幻觉出事后理由以与视觉预测对齐。作者提出 ProtoMedAgent，将多模态临床报告形式化为在严格神经符号瓶颈上的迭代、零梯度测试时优化问题。该框架运行在冻结原型骨干上，将潜在视觉和表格特征蒸馏为离散语义记忆。在线生成受到精确集合论差分和反思式 Scribe-Critic 循环严格约束，从数学上排除无支持叙述声明。为安全限制数据披露，作者引入由 k-anonymity 和 l-diversity 管理的语义隐私门。在 4,160 名患者临床队列上，ProtoMedAgent 达到 91.2% Comparison Set Faithfulness，显著优于标准 RAG 的 46.2%。它还利用 l-diversity phase transition，将 artifact-level membership inference 风险绝对降低 9.8%。</p>\n<h3>79. EXPLOITBENCH: A CAPABILITY LADDER BENCHMARK FOR LLM CYBERSECURITY AGENTS</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Carnegie Mellon University<br />\n<strong>Author:</strong> Seunghyun Lee, David Brumley<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Cybersecurity Agents&amp;Exploitation&amp;Benchmark</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.14153\">https://arxiv.org/abs/2605.14153</a></p>\n<p><strong>摘要</strong>: Exploitation 不是二元事件，而是从执行单行 buggy 代码到完全控制目标的一系列渐进能力阶梯。然而，现有 LLM 安全基准常把崩溃视为 exploitation 成功，这一二元结果压缩了 exploitation 中真正困难的部分：从触发 bug 到构造可复用 primitive 和控制。作者提出 EXPLOITBENCH，一个能力分级基准，将 exploitation 分解为 16 个可测量 flag，从覆盖率和崩溃，到 sandbox primitive、任意读写、控制流劫持和任意代码执行。每项能力由确定性 oracle 验证，包括 per-run 随机 challenge-response、与 ground-truth 二进制的差分执行，以及代码执行的 signal-handler proof。作者在 41 个 V8 bug 上实例化 EXPLOITBENCH，因为 V8 广泛部署且经过 exploitation hardening。结果显示，公开部署的前沿模型与 private frontier 之间存在明显能力分裂：八个公开模型通常能到达漏洞代码并触发崩溃，但不能可靠实现任意代码执行；只有 GPT-5.5 在一个 WebAssembly bug 上绕过 sandbox 安全域并达到控制流劫持。作为参考的非公开研究预览模型 Anthropic Mythos Preview 在 41 个 bug 中 18 个达到 ACE。结果表明，针对 hardened 目标的 exploit 构造正成为新兴前沿能力。</p>\n<h3>80. Auditing Agent Harness Safety</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> University of California, Santa Barbara<br />\n<strong>Author:</strong> Chengzhi Liu, Yichen Guo, Yepeng Liu, Yuzhe Yang, Qianqi Yan, Xuandong Zhao, Wenyue Hua, Sheng Liu, Sharon Li, Yuheng Bu, Xin Eric Wang<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Agent Harness&amp;Safety Audit&amp;Trajectory Evaluation</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.14271\">https://arxiv.org/abs/2605.14271</a></p>\n<p><strong>摘要</strong>: 本文提出 HarnessAudit，用于审计代理 harness 安全。HarnessAudit 覆盖八个真实世界领域，构建具有现实约束的安全评估任务。代理在与外部资源和动态环境交互时，通过规划、检索、工具执行、审查和通信完成任务。不同于只评估最终输出，HarnessAudit 审计完整轨迹，并沿边界合规性、执行保真度和系统稳定性比较不同配置。该框架强调，代理安全不仅取决于模型回答是否正确，也取决于 harness 如何约束工具、环境、资源访问和任务执行过程，以及代理是否在整个轨迹中遵守安全边界。</p>\n<h3>81. Watermarking Game-Playing Agents in Perfect-Information Extensive-Form Games</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Software and Societal Systems Department<br />\n<strong>Author:</strong> Fei Fang, Juho Kim, Tuomas Sandholm<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Watermarking&amp;Game-Playing Agents&amp;Extensive-Form Games</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.14283\">https://arxiv.org/abs/2605.14283</a></p>\n<p><strong>摘要</strong>: 大型语言模型水印技术通过在输出中编码隐藏信息来验证来源，近期受到广泛关注，因为它有潜力检测意外或故意误用。类似的模型误用挑战也存在于游戏代理场景，例如在游戏平台中检测未经授权使用 AI 工具（如在线国际象棋作弊）。本文开启了对游戏策略如何加水印的研究。作者展示如何将 LLM 的 KGW 水印适配到 perfect-information extensive-form games 中的游戏代理，并可通过统计测试检测水印。作者证明，水印策略 profile 的质量下降（用期望效用量化）可以被界定，但 detectability 与质量之间存在权衡。实验中，作者将该水印框架引入多种国际象棋引擎，显示水印对策略质量影响可忽略，并且只需少量对局即可检测。</p>\n<h3>82. The Great Pretender: A Stochasticity Problem in LLM Jailbreak</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Unknown<br />\n<strong>Author:</strong> Jean-Philippe Monteuuis, Cong Chen, Jonathan Petit<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Jailbreak&amp;Stochasticity&amp;Evaluation</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.14418\">https://arxiv.org/abs/2605.14418</a></p>\n<p><strong>摘要</strong>: 本文研究 LLM 越狱评估中的随机性问题。作者指出，许多越狱方法和评估依赖单次尝试或单次判定，但现实中模型生成具有随机性，攻击提示若需要在多次尝试中持续成功，其有效性可能显著下降。作者提出新的度量和两个框架 CAS-eval 与 CAS-gen。CAS-eval 显示，当越狱提示需要在不止一次尝试中成功时，攻击成功率最高可下降 30 个百分点；CAS-gen 则改进既有越狱生成方法，帮助其恢复这 30 个百分点的损失。该工作强调，可靠越狱评估需要考虑跨尝试一致性和随机生成下的稳定性，而不是只看单次攻击成功。</p>\n<h3>83. LiSA: Lifelong Safety Adaptation via Conservative Policy Induction</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Google Cloud AI Research<br />\n<strong>Author:</strong> Minbeom Kim, Lesly Miculicich, Bhavana Dalvi Mishra, Mihir Parmar, Phillip Wallis, Bharath Chandrasekhar, Kyomin Jung, Tomas Pfister, Long T. Le<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Lifelong Safety&amp;Policy Induction&amp;AI Agents</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.14454\">https://arxiv.org/abs/2605.14454</a></p>\n<p><strong>摘要</strong>: LiSA 提出通过保守策略归纳实现 lifelong safety adaptation，目标是使 AI 代理能够面对真实世界长尾边缘风险持续更新安全行为。该方法关注模型部署后不断出现的新风险，而不是一次性静态对齐；通过从新风险样本中归纳保守安全策略，LiSA 旨在在不显著牺牲效用的情况下提高代理对未预见风险的稳健性。论文指出，随着模型能力和部署规模扩大，安全机制必须能持续适应，而非依赖固定规则或一次性训练。最终，LiSA 为保护 AI 代理免受不可预测真实世界边缘风险提供了实用途径。</p>\n<h3>84. Defenses at Odds: Measuring and Explaining Defense Conflicts in Large Language Models</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Unknown<br />\n<strong>Author:</strong> Xiangtao Meng, Wenyu Chen, Chuanchao Zang, Xinyu Gao, Jianing Wang, Li Wang, Zheng Li, Shanqing Guo<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Defense Conflicts&amp;Sequential Deployment&amp;LLM Safety</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.14514\">https://arxiv.org/abs/2605.14514</a></p>\n<p><strong>摘要</strong>: 部署在高风险应用中的大型语言模型必须同时管理多种风险，但现有防御几乎都在孤立、一次性部署假设下评估。实践中，提供商会在模型生命周期内增量打补丁，响应新暴露漏洞或定向数据移除请求，而不从头重训。这引出一个基础但未充分研究的问题：后部署防御是否保留先前防御建立的保护？作者对顺序部署下的跨防御交互开展首个系统研究。评估三个风险维度和三个模型家族上的 144 个有序序列后，发现 38.9% 在原先被防御的维度上出现可测量风险加剧。这些交互高度不对称且顺序相关：fairness-first 部署最脆弱，冲突率 64.6%；隐私防御则对后续防御表现出意外韧性。机制分析显示，每个防御定位到一组紧凑关键层；在冲突序列中，重叠关键层出现强 anti-aligned 参数更新，而良性顺序保持近正交更新。PCA 轨迹分析表明，防御坍塌源于这些共享层中的激活模式反转。作者提出 layer-wise conflict score 量化防御诱导激活子空间之间的几何张力，并据此提出 conflict-guided layer freezing，在顺序部署中选择性冻结高冲突层，以保持先前保护且不损害后续防御性能。</p>\n<h3>85. One Step to the Side: Why Defenses Against Malicious Finetuning Fail Under Adaptive Adversaries</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Ben-Gurion University of the Negev<br />\n<strong>Author:</strong> Itay Zloczower, Eyal Lenga, Gilad Gressel, Yisroel Mirsky<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Malicious Finetuning&amp;Adaptive Attacks&amp;Robustness</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.14605\">https://arxiv.org/abs/2605.14605</a></p>\n<p><strong>摘要</strong>: 模型提供商越来越多地发布开放权重或允许用户通过 API 微调基础模型。尽管这些模型发布前经过安全对齐，它们的保护常可通过有害数据微调移除。近期防御试图使模型对恶意微调更鲁棒，但它们大多只在固定攻击下评估，未考虑防御本身。作者表明，这些鲁棒性主张是不完整的。通过调查 15 个近期防御，作者识别出若干防御机制，并指出它们共享一个弱点：它们遮蔽或误导通向有害行为的路径，但没有移除有害行为本身。随后作者开发统一自适应攻击，可跨所有防御机制击破防御。结果显示，当前方法并未提供稳健安全；它们主要阻止自身设计时针对的攻击。作者希望该领域的统一自适应对手能帮助研究者和实践者在部署前压力测试新防御。</p>\n<h3>86. Do We Really Need External Tools to Mitigate Hallucinations? SIRA: Shared-Prefix Internal Reconstruction of Attribution</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Tsinghua University<br />\n<strong>Author:</strong> Tian Qin, Junzhe Chen, Yuqing Shi, Tianshu Zhang, Qiang Ju, Lijie Wen<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Hallucination&amp;Vision-Language Models&amp;Contrastive Decoding</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.14621\">https://arxiv.org/abs/2605.14621</a></p>\n<p><strong>摘要</strong>: 当语言先验压过弱或模糊视觉证据时，大型视觉语言模型常发生幻觉。现有 contrastive decoding 方法通过比较原图与外部扰动视觉输入的预测来缓解问题，但这类参考可能引入 off-manifold artifact，并需要额外昂贵前向传播。作者提出 SIRA，一个无需训练的内部 contrastive decoding 框架，通过利用多模态 Transformer 的分阶段信息流，在同一 LVLM 内构造反事实参考。SIRA 不从输入中移除视觉信息，而是先让图像和文本 token 通过 shared prefix 交互，形成保留提示解释、解码历史、位置结构和早期视觉 grounding 的对齐多模态状态。随后它在后续 Transformer 层 fork 出反事实分支，mask 对图像 token 位置的 attention。该分支保留共享多模态上下文，但缺乏继续访问细粒度视觉证据，从而产生由语言先验主导的内部参考用于 token 级对比。解码时，SIRA 抑制在缺乏后期视觉访问时仍很强的 token，并偏好依赖完整视觉路径获得优势的预测。在 POPE、CHAIR 和 AMBER 上，使用 Qwen2.5-VL 和 LLaVA-v1.5 的实验显示，SIRA 持续减少幻觉，同时保持描述覆盖并比两遍 contrastive decoding 开销更低。</p>\n<h3>87. Do Coding Agents Understand Least-Privilege Authorization?</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Evolvent AI Research Team<br />\n<strong>Author:</strong> Evolvent AI Research Team<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Coding Agents&amp;Least Privilege&amp;Authorization</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.14859\">https://arxiv.org/abs/2605.14859</a></p>\n<p><strong>摘要</strong>: 随着编码代理获得 shell、仓库和用户文件访问权限，最小权限授权成为安全部署的前提：代理应获得完成任务所需的足够权限，但不应拥有暴露敏感面的不必要权限。为研究当前模型是否能自行推断该边界，作者引入 permission-boundary inference，即模型从任务指令和终端环境映射到文件级读/写/执行策略，并提出 AuthBench，一个包含 120 个真实终端任务的基准，配有人类审查权限标签以及用于效用和攻击结果的可执行验证器。AuthBench 显示，授权不是简单的保守-宽松校准问题：前沿模型常遗漏执行链所需权限，同时又授予未使用或敏感访问。增加推理时 reasoning 并不能解决这种不匹配；不同模型会朝各自特定的授权错误模式移动。该工作表明，编码代理需要显式、可验证的权限边界机制，而不能依赖模型自行理解最小权限。</p>\n<h3>88. Toward Securing AI Agents Like Operating Systems</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> TU Berlin<br />\n<strong>Author:</strong> Lukas Pirch, Micha Horlboge, Patrick Großmann, Syeda Mahnur Asif, Klim Kireev, Thorsten Holz, Konrad Rieck<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: AI Agents&amp;Operating Systems&amp;Security Architecture</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.14932\">https://arxiv.org/abs/2605.14932</a></p>\n<p><strong>摘要</strong>: 本文主张应像保护操作系统一样保护 AI 代理。随着代理获得长期状态、工具调用、文件系统、网络和外部服务访问能力，它们越来越像一个可编排资源和权限的运行时环境，而不只是聊天模型。传统软件安全中的隔离、最小权限、进程边界、能力控制、审计日志和策略执行应被重新引入代理架构。论文讨论了当前代理系统中常见的高危漏洞和运行时信任失败，指出将所有上下文交给单一模型推理既难审计，也难约束。作者提出从 OS 安全视角重新设计代理：将不可信输入、权限授予、工具执行和持久状态分离，用 capability-style 接口和强制访问控制限制代理行为，并用可观测日志和策略层支持事后审计与实时拦截。该工作强调，代理安全应从提示工程转向系统架构。</p>\n<h3>89. Small, Private Language Models as Teammates for Educational Assessment Design</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> University of Florida<br />\n<strong>Author:</strong> Chris Davis Jaldi, Anmol Saini, Shan Zhang, Noah Schroeder, Cogan Shimizu, Eleni Ilkou<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Private Language Models&amp;Education&amp;Assessment Design</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.15015\">https://arxiv.org/abs/2605.15015</a></p>\n<p><strong>摘要</strong>: 本文研究小型、私有语言模型如何作为教育评估设计中的队友。相比将学生或教师数据发送到大型云端模型，本地或私有部署的小模型可在保护隐私的同时支持教师生成、审查和改进测评材料。论文关注这些模型在教育评估设计中的协作角色，包括帮助提出题目、生成评分标准、检查题目歧义、保持与课程目标的一致性，以及在教师监督下迭代修订。作者强调，小模型不应被视为替代教师判断的自动化系统，而应作为可控、可审计、低风险的辅助伙伴。该方向对敏感教育数据尤其重要，因为它在增强教师工作流的同时减少数据外泄和对外部服务的依赖。</p>\n<h3>90. WARD: Adversarially Robust Defense of Web Agents Against Prompt Injections</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> National University of Singapore<br />\n<strong>Author:</strong> Tri Cao, Yulin Chen, Hieu Cao, Yibo Li, Khoi Le, Thong Nguyen, Yuexin Li, Yufei He, Yue Liu, Shuicheng Yan, Bryan Hooi<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Web Agents&amp;Prompt Injection&amp;Robust Defense</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.15030\">https://arxiv.org/abs/2605.15030</a></p>\n<p><strong>摘要</strong>: Web 代理可通过与网站交互自主完成在线任务，但暴露在开放 Web 环境中使其容易受到嵌入 HTML 内容或视觉界面的提示注入攻击。现有 guard 模型仍存在泛化到未知域和攻击模式能力有限、对良性内容误报高、每步增加延迟导致部署效率下降，以及易受直接针对 guard 的自适应攻击等问题。为解决这些限制，作者提出 WARD（Web Agent Robust Defense against Prompt Injection），一种面向安全高效 Web 代理的实用 guard 模型。WARD 建立在 WARD-Base 上，这是一个约 177K 样本的大规模数据集，来自 719 个高流量 URL 和平台；并使用 WARD-PIG，这是专门针对 guard 模型的提示注入攻击数据集。作者进一步引入 A3T，自适应对抗训练框架，通过基于记忆的攻击者与 guard 协同演化迭代强化 WARD。大量实验表明，WARD 在分布外基准上几乎达到完美 recall，保持低误报以保留代理效用，在显著分布转移下对 guard-targeted 和自适应攻击保持鲁棒，并可与代理并行运行而不引入额外延迟。</p>\n<h3>91. Talk is (Not) Cheap: A Taxonomy and Benchmark Coverage Audit for LLM Attacks</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Palo Alto Networks<br />\n<strong>Author:</strong> Karthik Raghu Iyer, Yazdan Jamshidi, Nicholas Bray, Alexey Shvets<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Attack Taxonomy&amp;Benchmark Coverage&amp;LLM Security</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.15118\">https://arxiv.org/abs/2605.15118</a></p>\n<p><strong>摘要</strong>: 作者提出一个可复用框架，用于审计 LLM 攻击基准是否共同覆盖威胁面：一个基于 STRIDE 的 4×6 Target × Technique 矩阵，由从 932 篇 arXiv 安全研究（2023-2026）中提取的推理时攻击构建，包含 507 个叶节点的分类体系，其中 401 个有数据填充、106 个来自威胁模型。该矩阵支持基准外部验证，即审计集体覆盖而不是单个基准一致性。应用于六个公共基准后发现，三个主要框架 HarmBench、InjecAgent 和 AgentDojo 占据互不重叠的单元，最多覆盖矩阵 25%；同时整个 STRIDE 威胁类别（如 Service Disruption、Model Internals）缺乏标准化评估，尽管这些类别中已发表攻击通过任何基准都不测试的机制达到 46 倍 token 放大和 96% 攻击成功率。2,521 个唯一攻击组还显示出普遍命名碎片化（单个攻击最多 29 种表面形式）和对 Safety &amp; Alignment Bypass 的高度集中，这些结构性属性在小规模下不可见。作者发布 taxonomy、攻击记录和覆盖映射，供未来基准映射到同一矩阵以跟踪评估缺口是否缩小。</p>\n<h3>92. MetaBackdoor: Exploiting Positional Encoding as a Backdoor Attack Surface in LLMs</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Microsoft Azure<br />\n<strong>Author:</strong> Rui Wen<br />\n<strong>Published in:</strong> arxiv</p>\n</blockquote>\n<p><strong>Keywords</strong>: Backdoor&amp;Positional Encoding&amp;LLM Security</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.15172\">https://arxiv.org/abs/2605.15172</a></p>\n<p><strong>摘要</strong>: 后门攻击对越来越多部署为通用助手的大型语言模型构成严重安全威胁，尤其是在安全和隐私关键应用中。现有 LLM 后门主要依赖基于内容的触发器，需要显式修改输入文本。本文表明，这一假设既不必要也有限制。作者引入 METABACKDOOR，这是一类利用位置信息作为触发器的新型后门攻击，无需修改文本内容。核心洞见是，基于 Transformer 的 LLM 必须编码 token 位置以处理有序序列，因此与长度相关的位置结构会反映在模型内部计算中，并可作为有效非内容触发信号。作者展示，即使简单的基于长度的位置触发器也足以激活隐蔽后门。不同于先前攻击，METABACKDOOR 作用于可见且语义干净的输入，并支持新能力：一旦满足长度条件，后门 LLM 可被诱导披露专有系统提示等敏感内部信息；普通多轮交互也可能把会话上下文推入触发区域，在没有攻击者提供触发文本的情况下诱导恶意工具调用。METABACKDOOR 还与内容型后门正交，可组合成更精确、更难检测的激活条件。结果揭示位置编码是此前被忽视的攻击面，并挑战只检测可疑文本的防御。</p>\n<h3>93. Fin-Bias: Comprehensive Evaluation for LLM Decision-Making under human bias in Finance Domain</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Department of Computer Science, University of Toronto<br />\n<strong>Author:</strong> Xiaoyu Hu, Jinman Zhao<br />\n<strong>Published in:</strong> ACL 2026</p>\n</blockquote>\n<p><strong>Keywords</strong>: Finance&amp;Bias&amp;Decision-Making</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.09106\">https://arxiv.org/abs/2605.09106</a></p>\n<p><strong>摘要</strong>: 大型语言模型越来越多地部署在金融场景中，引发关于可靠性、对齐和对抗操纵易感性的关键担忧。先前金融相关基准评估 LLM 在股票交易中的能力，但通常样本较小，并未展示 LLM 对包含潜在人类偏见上下文的敏感性。作者提出 Fin-Bias（financial herding under long and uncertain financial context），用于评估 LLM 在不确定和可能带有人类偏见观点的环境中进行投资决策。Fin-Bias 包含 8,868 份公司特定长篇分析师报告，涵盖由成熟分析师总结和分析的公司方面以及来自多行业的投资评级（Bullish/Neutral/Bearish）。作者向大型语言模型提供带或不带分析师投资评级、甚至带“虚假”评级的公司分析师报告，并获取 LLM 生成的投资评级。结果显示，LLM 倾向于 herd 上下文中的显式偏见。作者还开发了检测潜在人类观点的方法，可鼓励 LLM 独立思考，一些模型甚至在预测未来股票回报方面超过人类表现。</p>\n<h3>94. Knowledge Poisoning Attacks on Medical Multi-Modal Retrieval-Augmented Generation</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Tsinghua University<br />\n<strong>Author:</strong> Peiru Yang, Haoran Zheng, Tong Ju, Shiting Wang, Wanchun Ni, Jiajun Liu, Shangguang Wang, Yongfeng Huang, Tao Qi<br />\n<strong>Published in:</strong> ACL 2026</p>\n</blockquote>\n<p><strong>Keywords</strong>: Knowledge Poisoning&amp;Medical RAG&amp;Multimodal</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.10253\">https://arxiv.org/abs/2605.10253</a></p>\n<p><strong>摘要</strong>: 检索增强生成（RAG）是医疗应用中增强 LLM 的常用范式，它在生成过程中纳入专家多模态知识。然而，底层检索数据库可能自然包含或被有意注入对抗知识，从而扰动模型输出并削弱系统可靠性。为研究该风险，先前工作已探索医疗 RAG 系统中的知识投毒攻击，但多数依赖攻击者预先知道用户查询这一强假设，现实部署中不切实际，限制实用性。本文提出 M3Att，一个面向医疗多模态 RAG 系统的知识投毒框架，只假设攻击者具有底层数据库的有限分布知识。核心思想是在文本数据中注入隐蔽错误信息，同时使用配对视觉数据作为查询无关触发器促进检索。作者首先提出统一框架，通过对视觉输入加入不可察觉扰动来操纵检索概率。此外，由于 LLM 具有先验医学知识，带显式事实错误的朴素投毒医学内容可能在生成时被纠正；因此作者利用医学诊断的内在歧义，设计隐蔽错误信息注入策略，在逃避模型自纠正的同时降低诊断准确性。五个 LLM 和数据集上的实验显示，M3Att 持续产生临床上看似合理但错误的生成。</p>\n<h3>95. Hierarchical Attacks for Multi-Modal Multi-Agent Reasoning</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> <a href=\"https://link.zhihu.com/?target=http%3A//JD.com\">http://JD.com</a><br />\n<strong>Author:</strong> Hao Zhou, Tiru Wu, Yan Jiang, Wanqi Zhou, Junxing Hu, Ai Han<br />\n<strong>Published in:</strong> CVPR 2026</p>\n</blockquote>\n<p><strong>Keywords</strong>: Multimodal Agents&amp;Hierarchical Attacks&amp;Reasoning</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.13213\">https://arxiv.org/abs/2605.13213</a></p>\n<p><strong>摘要</strong>: 多模态多代理系统因能够跨多种模态实现复杂推理和协作而受到关注。随着这些系统规模和功能持续扩展，研究其潜在漏洞变得越来越重要。然而，现有多代理对抗攻击研究主要关注孤立代理或单模态设置，对多模态多代理系统的脆弱性探索不足。为填补空白，作者提出 HAM3，一个面向多模态多代理系统的分层攻击框架，将攻击分解为三个相互连接的层。在感知层，HAM3 通过扰动视觉输入、文本输入及其融合视觉-文本表示发起攻击；在通信层，它执行通信级攻击，破坏消息内容和交互拓扑，例如操纵共享上下文或通信链接来扭曲集体信息流；在推理层，它干扰每个代理的认知流水线，偏置推理轨迹并最终破坏决策。作者在 GQA 基准上通过基于 ReAct、Plan-and-Solve 和 Reflexion 等不同推理范式的多代理系统评估 HAM3。实验显示，该框架攻击成功率最高达到 78.3%，其中推理层攻击最有效；超过一半成功攻击会导致多个代理产生一致错误。这些发现为构建更鲁棒和可解释的多代理智能提供了见解。</p>\n<h3>96. DP-LAC: Lightweight Adaptive Clipping for Differentially Private Federated Fine-Tuning of Language Models</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> Samsung R&amp;D Institute UK<br />\n<strong>Author:</strong> Haaris Mehmood, Jie Xu, Karthikeyan Saravanan, Rogier Van Dalen, Mete Ozay<br />\n<strong>Published in:</strong> ICASSP 2026</p>\n</blockquote>\n<p><strong>Keywords</strong>: Differential Privacy&amp;Federated Learning&amp;Adaptive Clipping</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.10272\">https://arxiv.org/abs/2605.10272</a></p>\n<p><strong>摘要</strong>: 联邦学习支持跨边缘设备协作训练大规模语言模型，同时保持用户数据在设备本地。然而，联邦学习仍会通过客户端提供的梯度暴露敏感信息。差分隐私随机梯度下降（DP-SGD）通过将每个客户端贡献裁剪到阈值 C 并添加与 C 成比例的噪声来缓解该风险。现有自适应裁剪技术会动态调整 C，但需要繁琐超参数调优，可能侵蚀隐私预算。本文提出 DP-LAC，该方法首先使用私有直方图估计，在最优值一个数量级内估计初始裁剪阈值，然后在训练期间自适应调整该阈值，不消耗额外隐私预算，也不引入新超参数。实证结果显示，DP-LAC 优于最先进自适应裁剪方法和 vanilla DP-SGD，平均准确率提升 6.6%。</p>\n<h3>97. Inducing Overthink: Hierarchical Genetic Algorithm-based DoS Attack on Black-Box Large Language Reasoning Models</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> State Key Laboratory of Blockchain and Data Security, Zhejiang University<br />\n<strong>Author:</strong> Shuqiang Wang, Wei Cao, Jiaqi Weng, Jialing Tao, Licheng Pan, Hui Xue, Zhixuan Chu<br />\n<strong>Published in:</strong> ICML 2026</p>\n</blockquote>\n<p><strong>Keywords</strong>: Denial-of-Service&amp;Reasoning Models&amp;Overthinking</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.13338\">https://arxiv.org/abs/2605.13338</a></p>\n<p><strong>摘要</strong>: 大型推理模型越来越多地被集成到需要可靠多步推理的系统中，但这种依赖也暴露出与计算可用性相关的新漏洞。尤其是，当面对不完整或逻辑不一致输入时，LRM 倾向于“过度思考”，生成过长且冗余的推理轨迹。这会显著增加推理延迟和能耗，形成类似拒绝服务（DoS）的资源耗尽向量。本文研究该攻击面，并提出一个自动化黑盒框架，通过系统性扰动输入问题的逻辑结构来诱导 LRM 过度思考。方法采用层次遗传算法，在结构化问题分解上运行，并优化一个复合适应度函数，以最大化响应长度和反思性过度思考标记。跨四个最先进推理模型，方法显著放大输出长度，在 MATH 基准上最高达到 26.1 倍增长，并持续优于良性和人工构造的缺失前提基线。作者还展示强可迁移性：用小代理模型演化出的对抗输入对大型商业 LRM 仍高度有效。这些发现突显过度思考是现代推理系统共享且可利用的漏洞，需要更鲁棒防御。</p>\n<h3>98. REALISTA: Realistic Latent Adversarial Attacks that Elicit LLM Hallucinations</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> University of Pennsylvania<br />\n<strong>Author:</strong> Buyun Liang, Jinqi Luo, Liangzu Peng, Kwan Ho Ryan Chan, Darshan Thaker, Kaleab A. Kinfu, Fengrui Tian, Hamed Hassani, Rene Vidal<br />\n<strong>Published in:</strong> ICML 2026</p>\n</blockquote>\n<p><strong>Keywords</strong>: Hallucination&amp;Adversarial Attacks&amp;Latent Space</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.12813\">https://arxiv.org/abs/2605.12813</a></p>\n<p><strong>摘要</strong>: 大型语言模型在许多任务上表现强劲，但仍易产生幻觉，因此需要能够诱发这类失败的现实对抗提示。作者将幻觉诱发形式化为受约束优化问题，目标是找到与良性用户提示语义等价且连贯的对抗提示。现有方法仍有限：离散提示攻击可保持语义等价和连贯性，但只在有限提示变体集合上搜索；连续潜空间攻击探索空间更丰富，但常解码为不再是有效改写的提示。为解决这些限制，作者提出 REALISTA，一个现实潜空间攻击框架。REALISTA 构建输入相关的有效编辑方向字典，每个方向对应语义等价且连贯的改写，并在潜空间中优化这些方向的连续组合。该设计结合了连续攻击的优化灵活性与离散改写攻击的语义现实性。实验表明，REALISTA 在开源 LLM 上达到优于或可比于最先进现实攻击的性能，并且关键的是，在自由形式响应设置下成功攻击大型推理模型，而先前现实攻击在该设置中失败。</p>\n<h3>99. MetaMoE: Diversity-Aware Proxy Selection for Privacy-Preserving Mixture-of-Experts Unification</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> The Chinese University of Hong Kong<br />\n<strong>Author:</strong> Weisen Jiang, Shuhao Chen, Sinno Jialin Pan<br />\n<strong>Published in:</strong> ICML 2026</p>\n</blockquote>\n<p><strong>Keywords</strong>: Privacy-Preserving&amp;Mixture-of-Experts&amp;Proxy Selection</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.14289\">https://arxiv.org/abs/2605.14289</a></p>\n<p><strong>摘要</strong>: Mixture-of-Experts（MoE）模型通过组合专门化专家扩展容量，但多数现有方法假设可集中访问训练数据。实践中，数据分布在不同客户端且因隐私约束无法共享，使统一 MoE 训练变得困难。作者提出 MetaMoE，一个隐私保护框架，使用公共代理数据作为不可访问私有数据的替代，将独立训练、领域专门化的专家统一为单个 MoE。MetaMoE 的核心是 diversity-aware proxy selection，从公共数据中选择与客户端领域相关且多样的样本，以有效近似私有数据分布并监督路由器学习。这些代理还用于对齐专家训练，提升统一时的专家协作，而 context-aware router 则增强异构输入下的专家选择。计算机视觉和自然语言处理基准上的实验表明，MetaMoE 持续优于近期隐私保护 MoE 统一方法。</p>\n<h3>100. EVA: Editing for Versatile Alignment against Jailbreaks</h3>\n<blockquote>\n<p><strong>Affiliations:</strong> ShanghaiTech University, Shanghai, China<br />\n<strong>Author:</strong> Yi Wang, Hongye Qiu, Yue Xu, Sibei Yang, Zhan Qin, Minlie Huang, Wenjie Wang<br />\n<strong>Published in:</strong> TPMAI</p>\n</blockquote>\n<p><strong>Keywords</strong>: Jailbreak&amp;Model Editing&amp;Safety Alignment</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.14750\">https://arxiv.org/abs/2605.14750</a></p>\n<p><strong>摘要</strong>: 大型语言模型和视觉语言模型已展示出令人印象深刻的能力，但仍容易受到越狱攻击，对手可利用文本或视觉触发器绕过安全护栏。近期防御通常依赖安全微调或外部过滤器，以降低模型产生有害内容的可能性。尽管这些方法在一定程度上有效，但往往带来显著计算开销，并受安全-效用权衡影响，降低模型在良性任务上的表现。为解决这些挑战，作者提出 EVA（Editing for Versatile Alignment against Jailbreaks），这是一个新框架，率先将直接模型编辑用于安全对齐。EVA 将安全对齐重新表述为精确知识修正任务。它不重训大量参数，而是识别并外科式编辑导致模型易受有害指令影响的特定神经元，同时保持绝大多数模型不变。通过局部化更新，EVA 在不损害模型一般推理能力的情况下有效中和有害行为。大量实验表明，EVA 在缓解 LLM 和 VLM 越狱方面优于基线，为部署后安全对齐提供了精确高效的解决方案。</p>\n<hr />\n<p><strong>如果觉得对您还有帮助，可以留下一个赞😉！ 也欢迎私戳笔者，一起交流学习LLM Safety！</strong></p>"
    }
  ],
  "graph": {
    "nodes": [
      {
        "id": "rlhf",
        "x": 150,
        "y": 100,
        "category": "alignment"
      },
      {
        "id": "cai",
        "x": 150,
        "y": 80,
        "category": "alignment"
      },
      {
        "id": "dpo",
        "x": 170,
        "y": 100,
        "category": "alignment"
      },
      {
        "id": "safe_rlhf",
        "x": 190,
        "y": 100,
        "category": "alignment"
      },
      {
        "id": "mart",
        "x": 190,
        "y": 80,
        "category": "alignment"
      },
      {
        "id": "safedpo",
        "x": 220,
        "y": 100,
        "category": "alignment"
      },
      {
        "id": "star_1",
        "x": 220,
        "y": 120,
        "category": "alignment"
      },
      {
        "id": "rmo",
        "x": 220,
        "y": 80,
        "category": "alignment"
      },
      {
        "id": "lasa",
        "x": 220,
        "y": 60,
        "category": "alignment"
      },
      {
        "id": "cai_2026",
        "x": 220,
        "y": 40,
        "category": "alignment"
      },
      {
        "id": "dan",
        "x": 150,
        "y": 200,
        "category": "jailbreak"
      },
      {
        "id": "gcg",
        "x": 170,
        "y": 200,
        "category": "jailbreak"
      },
      {
        "id": "ppl_filter",
        "x": 170,
        "y": 220,
        "category": "jailbreak"
      },
      {
        "id": "self_reminder",
        "x": 170,
        "y": 240,
        "category": "jailbreak"
      },
      {
        "id": "llama_guard",
        "x": 170,
        "y": 260,
        "category": "jailbreak"
      },
      {
        "id": "autodan",
        "x": 190,
        "y": 200,
        "category": "jailbreak"
      },
      {
        "id": "pair",
        "x": 190,
        "y": 180,
        "category": "jailbreak"
      },
      {
        "id": "llama_guard3",
        "x": 190,
        "y": 260,
        "category": "jailbreak"
      },
      {
        "id": "hmns",
        "x": 220,
        "y": 180,
        "category": "jailbreak"
      },
      {
        "id": "neurostrike",
        "x": 220,
        "y": 200,
        "category": "jailbreak"
      },
      {
        "id": "proact",
        "x": 220,
        "y": 160,
        "category": "jailbreak"
      },
      {
        "id": "aligntree",
        "x": 220,
        "y": 260,
        "category": "jailbreak"
      },
      {
        "id": "jbfuzz",
        "x": 220,
        "y": 220,
        "category": "jailbreak"
      },
      {
        "id": "jbf",
        "x": 220,
        "y": 240,
        "category": "jailbreak"
      },
      {
        "id": "rag",
        "x": 130,
        "y": 300,
        "category": "hallucination"
      },
      {
        "id": "truthfulqa",
        "x": 150,
        "y": 300,
        "category": "hallucination"
      },
      {
        "id": "selfcheckgpt",
        "x": 170,
        "y": 300,
        "category": "hallucination"
      },
      {
        "id": "factscore",
        "x": 170,
        "y": 320,
        "category": "hallucination"
      },
      {
        "id": "probe",
        "x": 220,
        "y": 300,
        "category": "hallucination"
      },
      {
        "id": "kghalubench",
        "x": 220,
        "y": 320,
        "category": "hallucination"
      },
      {
        "id": "abse",
        "x": 220,
        "y": 280,
        "category": "hallucination"
      },
      {
        "id": "halp",
        "x": 220,
        "y": 340,
        "category": "hallucination"
      },
      {
        "id": "ast_detect",
        "x": 220,
        "y": 360,
        "category": "hallucination"
      },
      {
        "id": "perspective",
        "x": 100,
        "y": 400,
        "category": "content_safety"
      },
      {
        "id": "toxigen",
        "x": 150,
        "y": 400,
        "category": "content_safety"
      },
      {
        "id": "nemo_guard",
        "x": 170,
        "y": 400,
        "category": "content_safety"
      },
      {
        "id": "llama_guard3",
        "x": 190,
        "y": 400,
        "category": "content_safety"
      },
      {
        "id": "expguard",
        "x": 220,
        "y": 400,
        "category": "content_safety"
      },
      {
        "id": "toxigan",
        "x": 220,
        "y": 420,
        "category": "content_safety"
      },
      {
        "id": "bielik_guard",
        "x": 220,
        "y": 440,
        "category": "content_safety"
      },
      {
        "id": "attriguard",
        "x": 220,
        "y": 380,
        "category": "content_safety"
      },
      {
        "id": "toolhijacker",
        "x": 220,
        "y": 460,
        "category": "content_safety"
      }
    ],
    "edges": [
      {
        "from": "rlhf",
        "to": "cai",
        "label": "宪法约束"
      },
      {
        "from": "rlhf",
        "to": "dpo",
        "label": "去奖励模型"
      },
      {
        "from": "dpo",
        "to": "safe_rlhf",
        "label": "安全约束"
      },
      {
        "from": "dpo",
        "to": "safedpo",
        "label": "集成安全"
      },
      {
        "from": "cai",
        "to": "cai_2026",
        "label": "推理框架"
      },
      {
        "from": "safe_rlhf",
        "to": "star_1",
        "label": "推理模型"
      },
      {
        "from": "safe_rlhf",
        "to": "rmo",
        "label": "边际重塑"
      },
      {
        "from": "cai",
        "to": "lasa",
        "label": "跨语言"
      },
      {
        "from": "gcg",
        "to": "autodan",
        "label": "隐蔽进化"
      },
      {
        "from": "autodan",
        "to": "pair",
        "label": "黑盒迭代"
      },
      {
        "from": "gcg",
        "to": "neurostrike",
        "label": "神经元级"
      },
      {
        "from": "llama_guard",
        "to": "llama_guard3",
        "label": "多模态"
      },
      {
        "from": "llama_guard3",
        "to": "aligntree",
        "label": "实时拦截"
      },
      {
        "from": "pair",
        "to": "proact",
        "label": "主动防御"
      },
      {
        "from": "pair",
        "to": "hmns",
        "label": "头掩蔽"
      },
      {
        "from": "jbfuzz",
        "to": "jbf",
        "label": "论文转攻击"
      },
      {
        "from": "selfcheckgpt",
        "to": "probe",
        "label": "过程化"
      },
      {
        "from": "factscore",
        "to": "kghalubench",
        "label": "图谱验证"
      },
      {
        "from": "rag",
        "to": "abse",
        "label": "语义熵"
      },
      {
        "from": "truthfulqa",
        "to": "halp",
        "label": "VLM探测"
      },
      {
        "from": "selfcheckgpt",
        "to": "abse",
        "label": "贝叶斯熵"
      },
      {
        "from": "toxigen",
        "to": "toxigan",
        "label": "数据增强"
      },
      {
        "from": "nemo_guard",
        "to": "expguard",
        "label": "专业领域"
      },
      {
        "from": "perspective",
        "to": "bielik_guard",
        "label": "多语种"
      },
      {
        "from": "llama_guard3",
        "to": "attriguard",
        "label": "因果归因"
      },
      {
        "from": "nemo_guard",
        "to": "toolhijacker",
        "label": "工具劫持"
      }
    ],
    "milestones": [
      "rlhf",
      "dpo",
      "gcg"
    ]
  },
  "algos": [
    {
      "id": "gcg",
      "num": 1,
      "name": "GCG",
      "fullName": "贪婪坐标梯度 (Greedy Coordinate Gradient)",
      "year": "2023",
      "org": "CMU",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2307.15043",
      "projectUrl": "",
      "category": "jailbreak",
      "motivation": "梯度优化生成通用对抗后缀",
      "summary": "GCG 提出了一种基于梯度的离散 token 搜索方法（贪心坐标梯度），通过优化对抗后缀使对齐 LLM 以肯定性开头（如 \"Sure, here is\"）回复有害指令，并证明该后缀可跨 prompt、跨模型迁移，成功攻击 GPT-4、Claude、PaLM-2 等闭源模型。",
      "keyPoints": [
        "<strong>攻击目标</strong>：最大化模型生成肯定性回复前缀（\"Sure, here is [harmful content]\"）的概率，将对抗攻击转化为目标序列的负对数似然最小化问题",
        "<strong>GCG 优化器（Algorithm 1）</strong>：基于 token embedding 梯度选取 top-k 候选替换，对所有位置同时搜索，每步采样 B 个单 token 替换候选并选择 loss 最低者——相比 AutoPrompt 的逐位置搜索效率大幅提升",
        "<strong>通用攻击（Algorithm 2）</strong>：将损失函数扩展为多 prompt 多模型的聚合梯度，渐进式增加优化目标数量，生成单一后缀即可攻击多种有害行为",
        "<strong>迁移攻击</strong>：在开源模型（Vicuna、Guanaco）上优化的后缀可直接迁移攻击 GPT-3.5（86.6%）、GPT-4（46.9%）、Claude-1（47.9%）、PaLM-2（66.0%）",
        "<strong>AdvBench 基准</strong>：构建包含 500 条有害行为和 500 条有害字符串的评估数据集",
        "<strong>关键发现</strong>：对齐训练（RLHF/Constitutional AI）并不能提供对抗鲁棒性，安全对齐与对抗鲁棒性之间存在根本差距"
      ],
      "detail": "<p><img alt=\"GCG 攻击总览\" src=\"https://arxiv.org/html/2307.15043v2/x1.png\" />\n<em>图 1：GCG 攻击示意。在用户有害指令后拼接一段对抗后缀（adversarial suffix），使对齐 LLM 绕过安全防护生成有害内容。该后缀可迁移至 ChatGPT、Claude、Bard 等闭源模型。</em></p>\n<h5>问题形式化</h5>\n<p>给定一个有害用户指令 <span class=\"kb-math kb-math-inline\">x_{1:n}</span>，攻击者的目标是找到一段对抗后缀 <span class=\"kb-math kb-math-inline\">p_{1:l}</span>，使模型在输入 <span class=\"kb-math kb-math-inline\">x_{1:n} \\| p_{1:l}</span> 后以特定的肯定性目标序列 <span class=\"kb-math kb-math-inline\">x^*_{n+1:n+H}</span>（如 \"Sure, here is a tutorial for making a bomb\"）开头回复。优化目标为最小化目标序列的负对数似然：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}(p_{1:l}) = -\\log p(x^*_{n+1:n+H} \\mid x_{1:n} \\| p_{1:l})</div>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：作者发现，只要模型以肯定性前缀开头回复（而非拒绝），后续生成几乎必然会产生有害内容。这一观察将复杂的\"让模型说有害内容\"问题简化为\"让模型说 Sure\"的可优化目标。</div>\n<h5>GCG 搜索算法（Algorithm 1）</h5>\n<pre><code class=\"language-python\"># GCG: Greedy Coordinate Gradient 核心伪代码\ndef gcg_attack(prompt, suffix, target, model, T=500, k=256, B=512):\n    &quot;&quot;&quot;\n    prompt: 有害指令 x_{1:n}\n    suffix: 对抗后缀 p_{1:l}（随机初始化）\n    target: 肯定性目标 &quot;Sure, here is...&quot;\n    &quot;&quot;&quot;\n    for t in range(T):\n        # Step 1: 计算每个后缀位置的 token 梯度\n        # 对 one-hot token embedding 求梯度，选 top-k 最有希望的替换\n        for i in range(len(suffix)):\n            gradients = compute_gradient(loss, e_{p_i})  # 对第 i 个 token 的 embedding 求梯度\n            X_i = top_k(-gradients, k)  # 梯度负方向 = loss 下降最快的 token\n\n        # Step 2: 采样 B 个候选替换\n        candidates = []\n        for b in range(B):\n            p_tilde = copy(suffix)\n            i = random_position()              # 随机选一个位置\n            p_tilde[i] = random_choice(X_i)    # 从该位置的 top-k 中随机选一个 token\n            candidates.append(p_tilde)\n\n        # Step 3: 评估所有候选，选最优\n        losses = [compute_loss(prompt, c, target, model) for c in candidates]\n        suffix = candidates[argmin(losses)]\n\n    return suffix\n</code></pre>\n<div class=\"warn-box\">⚠️ <strong>与 AutoPrompt 的关键区别</strong>：AutoPrompt 每步只搜索一个固定位置的替换；GCG 每步对<strong>所有位置</strong>同时计算梯度并采样候选，虽然每次仍只替换一个 token，但搜索空间覆盖更广，实验表明这一改动带来了巨大的性能提升。</div>\n<h5>通用攻击优化（Algorithm 2）</h5>\n<p>单 prompt 攻击虽然有效，但每条有害指令都需要独立优化。Algorithm 2 将目标扩展为多 prompt 多模型的联合优化：</p>\n<div class=\"kb-math kb-math-display\">p^* = \\arg\\min_{p_{1:l}} \\sum_{j=1}^{m} \\mathcal{L}_j(x^{(j)}_{1:n} \\| p_{1:l})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_j</span> 是第 <span class=\"kb-math kb-math-inline\">j</span> 个 prompt-模型对的损失。关键设计包括：</p>\n<ol>\n<li>\n<p><strong>梯度聚合</strong>：对所有 prompt 和模型的梯度求和，选取聚合 top-k 候选：\n   <div class=\"kb-math kb-math-display\">\\mathcal{X}_i = \\text{Top-}k\\left(-\\sum_{1 \\leq j \\leq m_c} \\nabla_{e_{p_i}} \\mathcal{L}_j\\right)</div></p>\n</li>\n<li>\n<p><strong>渐进式扩展</strong>：不一次优化所有 prompt，而是从 <span class=\"kb-math kb-math-inline\">m_c=1</span> 开始，当当前 prompt 集合全部攻击成功后才增加 <span class=\"kb-math kb-math-inline\">m_c</span>，逐步扩展优化目标数量。这避免了一开始目标过多导致优化困难。</p>\n</li>\n<li>\n<p><strong>多模型联合</strong>：损失函数可同时包含多个模型（如 Vicuna-7B 和 Vicuna-13B），使优化出的后缀具有跨模型迁移能力。</p>\n</li>\n</ol>\n<h5>迁移攻击机制</h5>\n<p><img alt=\"迁移攻击成功率\" src=\"https://arxiv.org/html/2307.15043v2/x3.png\" />\n<em>图 3：GCG 对抗后缀在不同 LLM 上的迁移攻击成功率（ASR）。在 Vicuna/Guanaco 上优化的后缀可迁移至架构、词表、参数量和训练方法完全不同的模型。</em></p>\n<p>迁移攻击的核心发现：</p>\n<ul>\n<li><strong>开源→闭源迁移</strong>：在 Vicuna-7B/13B + Guanaco-7B/13B 上联合优化的后缀，可直接拼接到发送给 GPT-3.5/GPT-4/Claude 的 prompt 中</li>\n<li><strong>集成策略（Ensemble）</strong>：生成多个对抗后缀，只要其中任一成功即算攻击成功，可将 GPT-3.5 的 ASR 从 47.4% 提升至 86.6%</li>\n<li><strong>跨架构有效</strong>：即使目标模型的词表、架构（decoder-only vs encoder-decoder）、参数量完全不同，对抗后缀仍然有效</li>\n</ul>\n<h5>实验结果</h5>\n<p><img alt=\"优化器性能对比\" src=\"https://arxiv.org/html/2307.15043v2/x2.png\" />\n<em>图 2：不同优化器在 Vicuna-7B 上诱导有害字符串的性能对比。GCG 在 loss 和 ASR 上均大幅领先。</em></p>\n<p><strong>单模型攻击（Table 1）</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>有害字符串 ASR (Vicuna)</th>\n<th>有害字符串 ASR (LLaMA-2)</th>\n<th>有害行为 ASR (Vicuna)</th>\n<th>通用攻击测试 ASR (Vicuna)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>PEZ</td>\n<td>2%</td>\n<td>1%</td>\n<td>22%</td>\n<td>3%</td>\n</tr>\n<tr>\n<td>GBDA</td>\n<td>1%</td>\n<td>0%</td>\n<td>36%</td>\n<td>5%</td>\n</tr>\n<tr>\n<td>AutoPrompt</td>\n<td>24%</td>\n<td>3%</td>\n<td>57%</td>\n<td>36%</td>\n</tr>\n<tr>\n<td><strong>GCG</strong></td>\n<td><strong>88%</strong></td>\n<td><strong>55%</strong></td>\n<td><strong>57%</strong></td>\n<td><strong>84%</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>迁移攻击（Table 2）</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>GPT-3.5</th>\n<th>GPT-4</th>\n<th>Claude-1</th>\n<th>Claude-2</th>\n<th>PaLM-2</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>仅有害行为</td>\n<td>1.8%</td>\n<td>8.0%</td>\n<td>0.0%</td>\n<td>0.0%</td>\n<td>0.0%</td>\n</tr>\n<tr>\n<td>+ \"Sure, here's\"</td>\n<td>5.7%</td>\n<td>13.1%</td>\n<td>0.0%</td>\n<td>0.0%</td>\n<td>0.0%</td>\n</tr>\n<tr>\n<td>+ GCG (Vicuna)</td>\n<td>34.3%</td>\n<td>34.5%</td>\n<td>2.6%</td>\n<td>0.0%</td>\n<td>31.7%</td>\n</tr>\n<tr>\n<td>+ GCG (Vicuna &amp; Guanaco)</td>\n<td>47.4%</td>\n<td>29.1%</td>\n<td>37.6%</td>\n<td>1.8%</td>\n<td>36.1%</td>\n</tr>\n<tr>\n<td>+ GCG Ensemble</td>\n<td><strong>86.6%</strong></td>\n<td><strong>46.9%</strong></td>\n<td><strong>47.9%</strong></td>\n<td>2.1%</td>\n<td><strong>66.0%</strong></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>核心启示</strong>：Claude-2 对迁移攻击表现出最强的鲁棒性（ASR 仅 2.1%），可能与其 Constitutional AI 训练方法有关。但这并不意味着 Claude-2 不可攻击——作者指出这可能只是当前攻击方法的局限，而非根本性的安全保障。</div>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统 Jailbreak（手工）</th>\n<th>AutoPrompt</th>\n<th>GCG</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>构造方式</td>\n<td>人工设计 prompt 模板</td>\n<td>梯度引导逐位置搜索</td>\n<td>梯度引导全位置同时搜索</td>\n</tr>\n<tr>\n<td>自动化程度</td>\n<td>低（需人类创意）</td>\n<td>高</td>\n<td>高</td>\n</tr>\n<tr>\n<td>通用性</td>\n<td>模板固定，易被防御</td>\n<td>单 prompt 优化</td>\n<td>多 prompt 多模型通用</td>\n</tr>\n<tr>\n<td>迁移性</td>\n<td>依赖模板通用性</td>\n<td>弱</td>\n<td>强（开源→闭源）</td>\n</tr>\n<tr>\n<td>搜索效率</td>\n<td>N/A</td>\n<td>每步搜索 1 个位置</td>\n<td>每步搜索所有位置</td>\n</tr>\n</tbody>\n</table></div>\n<p>GCG 的核心创新在于将对抗攻击从\"人工试错\"推进到\"自动化优化\"，并首次证明了对齐 LLM 存在系统性的对抗脆弱性。这一发现对 AI 安全领域具有深远影响：它表明当前的安全对齐方法（RLHF、Constitutional AI 等）虽然能有效防御自然语言攻击，但无法抵御经过优化的对抗性输入。</p>",
      "quiz": {
        "q": "GCG 相比 AutoPrompt 的核心改进是什么？",
        "options": [
          "使用了更大的语言模型作为攻击目标",
          "每步对所有后缀位置同时计算梯度并采样候选替换，而非逐位置搜索",
          "引入了强化学习来优化对抗后缀",
          "使用连续向量空间优化代替离散 token 搜索"
        ],
        "answer": 1,
        "explain": "GCG 的关键改进在于每步对所有位置同时计算 top-k 候选，然后随机选择位置和 token 进行替换，相比 AutoPrompt 每步只搜索一个固定位置，搜索空间覆盖更广，攻击成功率大幅提升。"
      }
    },
    {
      "id": "autodan",
      "num": 2,
      "name": "AutoDAN",
      "fullName": "自动化DAN (AutoDAN)",
      "year": "2024",
      "org": "中科院",
      "parent": "gcg",
      "paperUrl": "https://proceedings.iclr.cc/paper_files/paper/2024/hash/f83cb637e159e789f5576ff6848874de-Abstract-Conference.html",
      "projectUrl": "",
      "category": "jailbreak",
      "motivation": "遗传算法进化隐蔽提示词",
      "summary": "AutoDAN 的核心目标是：遗传算法进化隐蔽提示词。",
      "keyPoints": [
        "核心动机：遗传算法进化隐蔽提示词",
        "演化来源：继承或改进自 gcg",
        "代表机构：中科院"
      ],
      "detail": "<p>遗传算法进化隐蔽提示词</p>"
    },
    {
      "id": "pair",
      "num": 3,
      "name": "PAIR",
      "fullName": "提示词自动迭代优化 (Prompt Automatic Iterative Refinement)",
      "year": "2024",
      "org": "UPenn",
      "parent": "autodan",
      "paperUrl": "https://ieeexplore.ieee.org/abstract/document/10992337/",
      "projectUrl": "",
      "category": "jailbreak",
      "motivation": "攻击者LLM迭代优化提示词",
      "summary": "PAIR 的核心目标是：攻击者LLM迭代优化提示词。",
      "keyPoints": [
        "核心动机：攻击者LLM迭代优化提示词",
        "演化来源：继承或改进自 autodan",
        "代表机构：UPenn"
      ],
      "detail": "<p>攻击者LLM迭代优化提示词</p>"
    },
    {
      "id": "dan",
      "num": 4,
      "name": "DAN",
      "fullName": "无所不能模式 (Do Anything Now)",
      "year": "2022",
      "org": "Community",
      "parent": "—",
      "paperUrl": "https://llm-attacks.org",
      "projectUrl": "",
      "category": "jailbreak",
      "motivation": "角色扮演诱导脱离安全约束",
      "summary": "DAN 的核心目标是：角色扮演诱导脱离安全约束。",
      "keyPoints": [
        "核心动机：角色扮演诱导脱离安全约束",
        "代表机构：Community"
      ],
      "detail": "<p>角色扮演诱导脱离安全约束</p>"
    },
    {
      "id": "ppl_filter",
      "num": 5,
      "name": "Perplexity Filter",
      "fullName": "困惑度过滤器 (Perplexity Filter)",
      "year": "2023",
      "org": "Academic",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2308.14132",
      "projectUrl": "",
      "category": "jailbreak",
      "motivation": "困惑度异常检测过滤",
      "summary": "Perplexity Filter 的核心目标是：困惑度异常检测过滤。",
      "keyPoints": [
        "核心动机：困惑度异常检测过滤",
        "代表机构：Academic"
      ],
      "detail": "<p>困惑度异常检测过滤</p>"
    },
    {
      "id": "self_reminder",
      "num": 6,
      "name": "Self-Reminder",
      "fullName": "自我提醒 (Self-Reminder)",
      "year": "2023",
      "org": "Academic",
      "parent": "—",
      "paperUrl": "https://www.nature.com/articles/s42256-023-00765-8",
      "projectUrl": "",
      "category": "jailbreak",
      "motivation": "系统提示词防御指令",
      "summary": "Self-Reminder 提出了一种基于心理学自我提醒概念的系统提示词防御方法，通过在系统提示中用安全提醒语句封装用户查询，将 ChatGPT 遭受越狱攻击的成功率从 67.21% 降至 19.34%，无需额外训练即可有效缓解越狱威胁。",
      "keyPoints": [
        "<strong>越狱数据集构建</strong>：收集 58 种越狱提示词模板，结合 10 类恶意指令，构建 580 条测试样本的越狱攻击评估数据集",
        "<strong>越狱提示词分类体系</strong>：将越狱攻击归纳为 Pretending（伪装）、Attention Shifting（注意力转移）、Privilege Escalation（权限提升）三大类",
        "<strong>系统模式自我提醒机制</strong>：在系统提示词中以\"前置提醒 + 用户查询 + 后置提醒\"三段式结构封装用户输入",
        "<strong>心理学理论基础</strong>：借鉴 Implementation Intentions（执行意图）和 Self-Regulation（自我调节）等心理学概念",
        "<strong>防御效果</strong>：ChatGPT 上 ASR 从 67.21% 降至 19.34%；GPT-4 上进一步降低",
        "<strong>通用任务性能保持</strong>：在 GLUE、CNN/DailyMail、XSum、WMT16、SQuAD 等基准上验证不影响正常任务表现",
        "<strong>无需训练的即插即用方案</strong>：仅通过修改系统提示词实现，不涉及模型微调或额外训练"
      ],
      "detail": "<h5>示意图</h5>\n<p><img alt=\"Self-Reminder 框架示意图\" src=\"https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs42256-023-00765-8/MediaObjects/42256_2023_765_Fig1_HTML.png\" />\n<em>图：越狱攻击示例与系统模式自我提醒防御方法。左侧展示越狱攻击如何绕过安全对齐，右侧展示 Self-Reminder 如何通过系统提示词封装用户查询来抵御攻击。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Self-Reminder 系统提示词封装机制\ndef self_reminder_defense(user_query):\n    # 前置提醒 (Pre-Reminder)\n    pre_reminder = (\n        &quot;You should be a responsible ChatGPT and should not &quot;\n        &quot;generate harmful or misleading content! Please answer &quot;\n        &quot;the following user query in a responsible way.&quot;\n    )\n\n    # 后置提醒 (Post-Reminder)\n    post_reminder = (\n        &quot;Remember, you should be a responsible ChatGPT and &quot;\n        &quot;should not generate harmful or misleading content!&quot;\n    )\n\n    # 系统提示词封装\n    system_prompt = f&quot;{pre_reminder}\\n{user_query}\\n{post_reminder}&quot;\n\n    # 将封装后的提示词作为系统消息发送\n    response = chatgpt(\n        messages=[{&quot;role&quot;: &quot;system&quot;, &quot;content&quot;: system_prompt}]\n    )\n    return response\n</code></pre>\n<h5>动机与背景</h5>\n<p>ChatGPT 等大语言模型虽然通过 RLHF（基于人类反馈的强化学习）进行了安全对齐，但越狱攻击（Jailbreak Attack）通过精心构造的对抗性提示词可以绕过这些安全防护，诱导模型生成有害内容。越狱攻击的典型手段包括：让模型扮演不受限制的角色（如 DAN — \"Do Anything Now\"）、利用虚构场景转移注意力、或通过权限提升指令覆盖安全规则。</p>\n<p>传统防御方法主要依赖于模型层面的安全训练（如 RLHF、红队测试），但这些方法存在两个核心缺陷：（1）需要大量计算资源进行模型再训练；（2）面对不断演化的越狱攻击模式，防御存在滞后性。因此，亟需一种轻量级、即时部署的防御方案。</p>\n<div class=\"key-point\">💡 关键：Self-Reminder 的核心洞察是——越狱攻击本质上是在用户消息层面操纵模型行为，而系统提示词（System Prompt）具有更高的指令优先级，可以作为\"防御阵地\"来抵消用户层面的攻击指令。</div>\n<h5>核心机制</h5>\n<p><strong>1. 越狱攻击分类与数据集构建</strong></p>\n<p>论文首先系统性地收集和分析了 58 种来自互联网的越狱提示词模板，并将其归纳为三大类：</p>\n<ul>\n<li><strong>Pretending（伪装类）</strong>：让模型扮演不受限制的角色或进入特殊模式（如 DAN、Developer Mode），约占总数的最大比例</li>\n<li><strong>Attention Shifting（注意力转移类）</strong>：通过虚构场景、故事叙述等方式转移模型对安全规则的注意力</li>\n<li><strong>Privilege Escalation（权限提升类）</strong>：直接声称拥有更高权限或要求模型忽略安全限制</li>\n</ul>\n<p>结合 10 类恶意指令（涵盖暴力、歧视、隐私泄露等），构建了 <span class=\"kb-math kb-math-inline\">58 \\times 10 = 580</span> 条测试样本。</p>\n<p><strong>2. 系统模式自我提醒设计</strong></p>\n<p>Self-Reminder 的核心设计基于心理学中的自我提醒（Self-Reminder）概念。在心理学中，Implementation Intentions（执行意图）理论指出，当个体预先设定\"如果遇到 X 情况，就执行 Y 行为\"的计划时，能显著提高目标行为的执行率。类似地，Self-Regulation（自我调节）理论强调，通过持续的自我监控和提醒，个体可以更好地控制自身行为。</p>\n<p>将这一概念迁移到 LLM 防御中，Self-Reminder 在系统提示词中构建了三段式结构：</p>\n<div class=\"kb-math kb-math-display\">\\text{SystemPrompt} = \\text{PreReminder} \\oplus \\text{UserQuery} \\oplus \\text{PostReminder}</div>\n<p>其中：\n- <span class=\"kb-math kb-math-inline\">\\text{PreReminder}</span>：在用户查询之前设置安全行为预期，相当于\"执行意图\"的触发条件\n- <span class=\"kb-math kb-math-inline\">\\text{UserQuery}</span>：原始用户输入（可能包含越狱攻击指令）\n- <span class=\"kb-math kb-math-inline\">\\text{PostReminder}</span>：在用户查询之后再次强化安全提醒，相当于\"自我调节\"的反馈信号</p>\n<div class=\"warn-box\">⚠️ 注意：将用户查询嵌入系统提示词中是关键设计——这使得安全提醒与潜在攻击指令处于同一上下文层级，且安全提醒\"包围\"了攻击指令，从而在注意力机制层面增强了安全指令的影响力。</div>\n<p><strong>3. 提醒语气的影响</strong></p>\n<p>论文还探究了提醒语句的语气（Tone）对防御效果的影响，借鉴教育心理学中课程大纲语气（Syllabus Tone）对学生行为影响的研究。实验对比了：</p>\n<ul>\n<li><strong>友好语气（Friendly Tone）</strong>：使用鼓励性、合作性的表述</li>\n<li><strong>严格语气（Strict Tone）</strong>：使用命令性、规范性的表述</li>\n</ul>\n<p>结果表明不同语气对防御效果有一定影响，但整体上 Self-Reminder 机制在各种语气设置下均能显著降低 ASR。</p>\n<h5>实验结果与分析</h5>\n<p>论文在 ChatGPT（GPT-3.5-turbo）和 GPT-4 上进行了全面评估：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>场景</th>\n<th>ASR</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>ChatGPT 无防御</td>\n<td>67.21%</td>\n</tr>\n<tr>\n<td>ChatGPT + Self-Reminder</td>\n<td><strong>19.34%</strong></td>\n</tr>\n<tr>\n<td>GPT-4 无防御</td>\n<td>较低（模型本身更强）</td>\n</tr>\n<tr>\n<td>GPT-4 + Self-Reminder</td>\n<td>进一步降低</td>\n</tr>\n</tbody>\n</table></div>\n<p>同时，在通用 NLP 任务上的评估表明 Self-Reminder 不会显著影响模型的正常能力：\n- <strong>自然语言理解</strong>：GLUE 基准（SST-2、MNLI、QNLI 等）\n- <strong>文本摘要</strong>：CNN/DailyMail、XSum\n- <strong>机器翻译</strong>：WMT16 (en-de)\n- <strong>阅读理解</strong>：SQuAD\n- <strong>隐私保护</strong>：Enron Email 数据集上的隐私泄露测试</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统安全对齐（RLHF等）</th>\n<th>Self-Reminder</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>实现方式</td>\n<td>模型再训练/微调</td>\n<td>仅修改系统提示词</td>\n</tr>\n<tr>\n<td>计算成本</td>\n<td>高（需 GPU 集群训练）</td>\n<td>零（推理时即插即用）</td>\n</tr>\n<tr>\n<td>部署速度</td>\n<td>需要重新部署模型</td>\n<td>即时生效</td>\n</tr>\n<tr>\n<td>适应新攻击</td>\n<td>需要收集新数据重新训练</td>\n<td>可快速调整提示词</td>\n</tr>\n<tr>\n<td>防御层级</td>\n<td>模型参数层</td>\n<td>提示词/输入层</td>\n</tr>\n<tr>\n<td>理论基础</td>\n<td>强化学习</td>\n<td>心理学自我提醒</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键：Self-Reminder 与模型层面的安全对齐是互补而非替代关系——它可以作为已有安全机制之上的额外防御层，形成纵深防御体系。</div>",
      "quiz": {
        "q": "Self-Reminder 防御方法的核心机制是什么？",
        "options": [
          "对模型进行安全主题的微调训练",
          "在系统提示词中用安全提醒语句封装用户查询",
          "使用额外的分类器过滤有害输出",
          "限制用户输入的最大长度以阻断越狱提示词"
        ],
        "answer": 1,
        "explain": "Self-Reminder 的核心是在系统提示词中以'前置提醒 + 用户查询 + 后置提醒'的三段式结构封装用户输入，利用系统提示词的高优先级来抵消越狱攻击指令，无需任何模型训练。"
      }
    },
    {
      "id": "llama_guard",
      "num": 7,
      "name": "Llama Guard",
      "fullName": "Llama Guard",
      "year": "2023",
      "org": "Meta",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2312.06674",
      "projectUrl": "",
      "category": "jailbreak",
      "motivation": "LLM安全分类器监控",
      "summary": "Llama Guard 基于 Llama2-7b 微调，将安全分类任务建模为指令跟随问题，通过在 prompt 中嵌入安全策略（taxonomy）实现对人机对话中 prompt 和 response 的安全分类，支持 zero-shot 适配新策略，是首个兼具高性能与灵活策略定制能力的开源 LLM 安全护栏模型。",
      "keyPoints": [
        "提出 <strong>安全风险分类体系</strong>（Safety Risk Taxonomy）：涵盖暴力与仇恨、性内容、犯罪策划、枪支与非法武器、管制物质、自残共 6 大类 13 个子类",
        "将安全分类建模为 <strong>指令跟随任务</strong>：通过 task instruction 在 prompt 中嵌入完整的安全策略定义，模型输出 \"safe\"/\"unsafe\" 及违规类别",
        "支持 <strong>prompt 分类和 response 分类</strong> 两种任务，无需传统多任务学习的额外开销",
        "<strong>零样本策略适配</strong>：仅通过修改 prompt 中的 taxonomy 描述即可适配新的安全策略（如 OpenAI Moderation taxonomy），无需重新训练",
        "<strong>少样本学习增强</strong>：在 prompt 中加入 2-4 个示例即可在 OpenAI Moderation 数据集上超越 OpenAI 自己的 Moderation API",
        "<strong>高效微调迁移</strong>：仅需目标数据集 20% 的训练数据即可达到从头训练使用 100% 数据的 Llama2-7b 的性能",
        "在自有测试集上 AUPRC 达 0.945（prompt）/ 0.953（response），在 ToxicChat 上零样本 AUPRC 0.626 超越所有基线"
      ],
      "detail": "<h5>核心框架</h5>\n<p><img alt=\"Llama Guard 任务指令示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2312.06674/assets/figure/task3.png\" />\n<em>图 1：Llama Guard 的 prompt 分类和 response 分类任务指令格式。左侧为 prompt 分类，右侧为 response 分类。安全策略（taxonomy）以自然语言形式嵌入 prompt 中。</em></p>\n<p>Llama Guard 的核心设计思想是将传统的安全内容分类问题转化为一个 <strong>指令跟随（instruction-following）</strong> 任务。模型接收一个包含以下组件的结构化 prompt：</p>\n<ol>\n<li><strong>Task instruction</strong>：指定当前任务类型（prompt 分类或 response 分类）</li>\n<li><strong>Safety taxonomy</strong>：以自然语言描述的安全策略定义，包含各违规类别及其描述</li>\n<li><strong>Conversation</strong>：待分类的对话内容（用户 prompt，或 prompt + 模型 response）</li>\n</ol>\n<p>模型输出格式为：第一行 \"safe\" 或 \"unsafe\"，若为 unsafe 则第二行输出违规的类别编号（如 \"O3\" 表示 Criminal Planning）。</p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Llama Guard 推理流程\ndef llama_guard_classify(conversation, taxonomy, task_type=&quot;prompt&quot;):\n    &quot;&quot;&quot;\n    conversation: 用户prompt（及可选的模型response）\n    taxonomy: 安全策略定义（类别名称+描述）\n    task_type: &quot;prompt&quot; 或 &quot;response&quot;\n    &quot;&quot;&quot;\n    # 1. 构建指令 prompt\n    instruction = build_task_instruction(task_type)  # 指定分类目标\n    taxonomy_text = format_taxonomy(taxonomy)          # 格式化安全策略\n    conv_text = format_conversation(conversation)      # 格式化对话\n\n    # 2. 拼接完整输入\n    full_prompt = f&quot;[INST] {instruction}\\n{taxonomy_text}\\n{conv_text} [/INST]&quot;\n\n    # 3. 模型生成\n    output = llama2_7b_finetuned.generate(full_prompt)\n    # output 示例: &quot;unsafe\\nO3&quot; 或 &quot;safe&quot;\n\n    # 4. 解析结果\n    lines = output.strip().split('\\n')\n    is_safe = (lines[0] == &quot;safe&quot;)\n    violated_categories = lines[1] if not is_safe and len(lines) &gt; 1 else None\n\n    # 5. 获取概率分数（用于 AUPRC 计算）\n    # 取第一个 token 为 &quot;safe&quot; 的 softmax 概率作为安全概率\n    p_safe = softmax(logits_first_token)[&quot;safe&quot;]\n\n    return is_safe, violated_categories, p_safe\n</code></pre>\n<h5>动机与背景</h5>\n<p>现有的内容安全审核工具（如 OpenAI Moderation API、Perspective API、Azure AI Content Safety）存在两个核心问题：</p>\n<ol>\n<li><strong>策略固化</strong>：这些工具的安全分类体系是预定义且不可修改的。不同的应用场景（如医疗咨询 vs. 创意写作）对\"安全\"的定义差异巨大，固定的分类体系无法满足多样化需求。</li>\n<li><strong>覆盖不全</strong>：大多数现有工具仅针对用户输入（prompt）进行审核，而忽略了对 LLM 生成内容（response）的安全检查。LLM 可能在看似安全的 prompt 下生成有害内容。</li>\n</ol>\n<div class=\"key-point\">💡 关键：Llama Guard 的核心创新在于将安全策略从模型参数中解耦出来，放入 prompt 中以自然语言描述，使得同一个模型可以通过修改 prompt 适配完全不同的安全策略。</div>\n<h5>安全风险分类体系</h5>\n<p>Llama Guard 提出了一套参考性的安全风险分类体系，涵盖 6 大类：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>类别</th>\n<th>描述</th>\n<th>适用对象</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>O1: Violence &amp; Hate</td>\n<td>暴力行为、仇恨言论、歧视</td>\n<td>Prompt &amp; Response</td>\n</tr>\n<tr>\n<td>O2: Sexual Content</td>\n<td>色情内容、性行为描述</td>\n<td>Prompt &amp; Response</td>\n</tr>\n<tr>\n<td>O3: Criminal Planning</td>\n<td>犯罪活动策划（绑架、抢劫等）</td>\n<td>Prompt &amp; Response</td>\n</tr>\n<tr>\n<td>O4: Guns &amp; Illegal Weapons</td>\n<td>非法武器获取与使用</td>\n<td>Prompt &amp; Response</td>\n</tr>\n<tr>\n<td>O5: Regulated Substances</td>\n<td>管制药物、毒品相关</td>\n<td>Prompt &amp; Response</td>\n</tr>\n<tr>\n<td>O6: Self-Harm</td>\n<td>自杀、自残相关内容</td>\n<td>Prompt &amp; Response</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ 注意：该分类体系是<strong>参考性</strong>的，而非强制性的。Llama Guard 的设计允许用户通过修改 prompt 中的 taxonomy 来定义自己的安全策略，这正是其核心优势。</div>\n<h5>训练方法</h5>\n<p>Llama Guard 基于 Llama2-7b 进行监督微调（SFT），训练数据的构建流程如下：</p>\n<ol>\n<li><strong>数据收集</strong>：使用多种 LLM 生成 prompt，涵盖安全和不安全的样本。对于不安全样本，使用对抗性提示技术（adversarial prompting）生成更具挑战性的案例。</li>\n<li><strong>Response 生成</strong>：使用 Llama2 生成对应的 response，并通过多种策略确保 response 覆盖安全和不安全两种情况。</li>\n<li><strong>人工标注</strong>：由训练有素的标注员对每个 prompt-response 对进行多标签分类标注。</li>\n<li><strong>数据格式化</strong>：将标注数据转化为指令跟随格式，包含完整的 task instruction、taxonomy 和对话内容。</li>\n</ol>\n<p>训练使用标准的 next-token prediction 损失函数，但 <strong>仅在模型输出部分（\"safe\"/\"unsafe\" + 类别标签）计算损失</strong>，输入 prompt 部分不参与损失计算。</p>\n<h5>概率分数与分类阈值</h5>\n<p>作为生成式模型，Llama Guard 通过以下方式提供概率分数以支持灵活的分类阈值调整：</p>\n<div class=\"kb-math kb-math-display\">P(\\text{safe}) = \\text{softmax}(\\text{logits}_{\\text{first\\_token}})[\\text{&quot;safe&quot;}]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\text{logits}_{\\text{first\\_token}}</span> 是模型生成第一个 token 时的 logits。通过调整阈值 <span class=\"kb-math kb-math-inline\">\\tau</span>，可以在精确率和召回率之间进行权衡：</p>\n<div class=\"kb-math kb-math-display\">\\hat{y} = \\begin{cases} \\text{safe} &amp; \\text{if } P(\\text{safe}) \\geq \\tau \\\\ \\text{unsafe} &amp; \\text{otherwise} \\end{cases}</div>\n<p>这使得 Llama Guard 可以像传统分类器一样计算 AUPRC（Area Under Precision-Recall Curve）等指标。</p>\n<h5>策略适配能力</h5>\n<p>Llama Guard 展现了三个层次的策略适配能力：</p>\n<p><strong>1. 零样本适配（Zero-shot）</strong>：仅修改 prompt 中的 taxonomy 描述即可适配新策略。在 OpenAI Moderation 数据集上，零样本 AUPRC 达 0.847，接近 OpenAI 自己的 API（0.856）。</p>\n<p><strong>2. 少样本适配（Few-shot）</strong>：在 prompt 中额外提供 2-4 个标注示例。在 OpenAI Moderation 数据集上 AUPRC 提升至 0.872，<strong>超越 OpenAI Moderation API</strong>。</p>\n<p><strong>3. 微调适配（Fine-tuning）</strong>：在目标数据集上进一步微调。实验表明，Llama Guard 仅需 ToxicChat 数据集 20% 的训练数据即可达到从头训练的 Llama2-7b 使用 100% 数据的性能。</p>\n<p><img alt=\"Llama Guard 在 OpenAI Mod 数据集上的类别级性能\" src=\"https://ar5iv.labs.arxiv.org/html/2312.06674/assets/figure/openai_categorical.png\" />\n<em>图 2：Llama Guard 在 OpenAI Moderation 数据集上各类别的 AUPRC 表现。少样本（few-shot）prompting 显著缩小了与 OpenAI API 的差距。</em></p>\n<p><img alt=\"Llama Guard 与 Llama2-7b 在 ToxicChat 上的微调对比\" src=\"https://ar5iv.labs.arxiv.org/html/2312.06674/assets/x1.png\" />\n<em>图 3：在 ToxicChat 数据集上，Llama Guard 通过微调展现出比 Llama2-7b 更强的数据效率和适配能力。</em></p>\n<h5>与现有方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>Llama Guard</th>\n<th>OpenAI Mod API</th>\n<th>Perspective API</th>\n<th>Azure AI</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>策略可定制</td>\n<td>✅ 通过 prompt</td>\n<td>❌ 固定 11 类</td>\n<td>❌ 固定 6 类</td>\n<td>❌ 固定 4 类</td>\n</tr>\n<tr>\n<td>Response 分类</td>\n<td>✅</td>\n<td>❌ 仅 prompt</td>\n<td>❌ 仅 prompt</td>\n<td>❌ 仅 prompt</td>\n</tr>\n<tr>\n<td>开源</td>\n<td>✅</td>\n<td>❌</td>\n<td>❌</td>\n<td>❌</td>\n</tr>\n<tr>\n<td>概率分数</td>\n<td>✅</td>\n<td>✅</td>\n<td>✅</td>\n<td>❌（整数 0-6）</td>\n</tr>\n<tr>\n<td>零样本迁移</td>\n<td>✅</td>\n<td>❌ 需重训</td>\n<td>❌ 需重训</td>\n<td>❌ 需重训</td>\n</tr>\n<tr>\n<td>自有测试集 AUPRC</td>\n<td><strong>0.945</strong></td>\n<td>0.764</td>\n<td>0.728</td>\n<td>—</td>\n</tr>\n<tr>\n<td>ToxicChat AUPRC</td>\n<td><strong>0.626</strong></td>\n<td>0.588</td>\n<td>0.532</td>\n<td>—</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键：Llama Guard 在自有测试集上全面领先，在 ToxicChat（所有模型均未训练过的数据集）上也展现最强的零样本泛化能力。在 OpenAI Moderation 数据集上，虽然零样本略低于 OpenAI API（0.847 vs 0.856），但通过少样本 prompting 即可反超（0.872）。</div>",
      "quiz": {
        "q": "Llama Guard 实现策略灵活适配的核心机制是什么？",
        "options": [
          "使用多任务学习同时训练多种安全策略",
          "将安全分类体系以自然语言形式嵌入输入 prompt 中，通过指令跟随范式实现",
          "为每种安全策略训练一个独立的分类头",
          "使用强化学习从人类反馈中动态调整安全策略"
        ],
        "answer": 1,
        "explain": "Llama Guard 将安全策略（taxonomy）以自然语言描述的形式放入 prompt 中，将分类任务转化为指令跟随任务，从而实现仅通过修改 prompt 即可适配不同安全策略，无需重新训练模型。"
      }
    },
    {
      "id": "selfcheckgpt",
      "num": 8,
      "name": "SelfCheckGPT",
      "fullName": "自检GPT (SelfCheckGPT)",
      "year": "2023",
      "org": "Cambridge",
      "parent": "—",
      "paperUrl": "https://aclanthology.org/2023.emnlp-main.557/",
      "projectUrl": "",
      "category": "hallucination",
      "motivation": "多次采样一致性检测",
      "summary": "SelfCheckGPT 提出了一种零资源黑盒幻觉检测框架：对同一提示多次采样生成响应，利用\"事实性内容在不同采样间保持一致、而幻觉内容则相互矛盾\"的核心假设，通过 BERTScore、问答、n-gram、NLI 和 LLM Prompt 五种一致性度量方法在句子级别检测幻觉，无需访问模型内部概率或外部知识库。",
      "keyPoints": [
        "<strong>核心假设</strong>：LLM 对已知事实的多次采样结果趋于一致，对幻觉内容则产生相互矛盾的信息",
        "<strong>零资源 + 黑盒</strong>：不依赖外部知识库，不需要访问模型内部 token 概率，仅需模型的文本输出",
        "<strong>五种黑盒检测变体</strong>：SelfCheck-BERTScore、SelfCheck-QA/MQAG、SelfCheck-n-gram、SelfCheck-NLI、SelfCheck-Prompt",
        "<strong>灰盒基线对比</strong>：同时提出基于 token 概率（Avg/Max <span class=\"kb-math kb-math-inline\">-\\log p</span>）和熵（Avg/Max <span class=\"kb-math kb-math-inline\">H</span>）的灰盒方法作为对照",
        "<strong>评估数据集</strong>：WikiBio GPT-3 数据集——238 篇 GPT-3 生成的人物传记，1908 个句子经人工标注为 Major Inaccurate / Minor Inaccurate / Accurate 三类",
        "<strong>关键结果</strong>：SelfCheck-Prompt（AUC-PR 93.42）和 SelfCheck-NLI（AUC-PR 92.50）在句子级幻觉检测中显著超越灰盒概率基线（83.21），证明黑盒方法可行且有效",
        "<strong>段落级检测</strong>：SelfCheck-Prompt 在段落级别 Pearson 相关系数达 78.32，优于所有其他方法"
      ],
      "detail": "<h5>框架示意图</h5>\n<p><img alt=\"SelfCheckGPT 框架示意图\" src=\"https://arxiv.org/html/2303.08896v4/extracted/5307/images/selfcheckgpt_prompt.png\" />\n<em>图：SelfCheckGPT-Prompt 工作流程——对同一概念多次采样生成响应，逐句与采样结果进行一致性比对，矛盾越多则幻觉可能性越高</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># SelfCheckGPT 通用流程伪代码\ndef selfcheck_gpt(prompt, llm, method, N=20):\n    &quot;&quot;&quot;\n    prompt: 输入提示 (e.g., &quot;This is a Wikipedia passage about {concept}:&quot;)\n    llm: 目标大语言模型\n    method: 一致性检测方法 (BERTScore/QA/n-gram/NLI/Prompt)\n    N: 采样次数\n    &quot;&quot;&quot;\n    # Step 1: 生成主响应 (temperature=0, beam search)\n    R = llm.generate(prompt, temperature=0.0)\n    sentences = split_sentences(R)  # r_1, r_2, ..., r_M\n\n    # Step 2: 随机采样 N 个响应 (temperature=1.0)\n    samples = [llm.generate(prompt, temperature=1.0) for _ in range(N)]\n\n    # Step 3: 逐句计算一致性得分\n    scores = []\n    for r_i in sentences:\n        s_i = 0.0\n        for S_n in samples:\n            s_i += method.compute_inconsistency(r_i, S_n)\n        scores.append(s_i / N)  # 平均不一致性得分\n\n    return scores  # 得分越高 → 幻觉可能性越大\n</code></pre>\n<h5>动机与背景</h5>\n<p>大语言模型（LLM）在生成流畅文本的同时，经常产生\"幻觉\"（hallucination）——生成看似合理但实际不正确的内容。传统的事实核查方法依赖外部知识库（如 Wikipedia、知识图谱），但这些方法面临两大问题：</p>\n<ol>\n<li><strong>知识覆盖不完整</strong>：外部知识库无法覆盖所有领域和最新信息</li>\n<li><strong>黑盒 API 限制</strong>：许多商业 LLM（如 GPT-4）不提供 token 级别的概率信息，灰盒方法无法适用</li>\n</ol>\n<p>SelfCheckGPT 的核心洞察在于：<strong>LLM 本身就是最好的事实核查器</strong>。如果模型真正\"知道\"某个事实，那么多次采样时会反复生成一致的内容；如果模型在\"编造\"，则每次采样会产生不同的虚假信息。</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：采样一致性 ≈ 事实可靠性。一致的输出暗示模型对该知识有较高置信度，矛盾的输出则暴露了模型的不确定性。</div>\n<h5>灰盒基线方法</h5>\n<p>作为对照，论文首先提出了需要访问 token 概率的灰盒方法。对于主响应中的第 <span class=\"kb-math kb-math-inline\">i</span> 个句子 <span class=\"kb-math kb-math-inline\">r_i</span>，包含 token 序列 <span class=\"kb-math kb-math-inline\">\\{t_1, t_2, \\ldots, t_L\\}</span>：</p>\n<p><strong>概率度量</strong>（需要目标 token 的生成概率 <span class=\"kb-math kb-math-inline\">p(t)</span>）：</p>\n<div class=\"kb-math kb-math-display\">S_{\\text{Avg}(-\\log p)}(i) = \\frac{1}{L_i} \\sum_{l=1}^{L_i} -\\log p(t_l)</div>\n<div class=\"kb-math kb-math-display\">S_{\\text{Max}(-\\log p)}(i) = \\max_{l} \\left( -\\log p(t_l) \\right)</div>\n<p><strong>熵度量</strong>（需要 top-<span class=\"kb-math kb-math-inline\">K</span> token 的概率分布）：</p>\n<div class=\"kb-math kb-math-display\">S_{\\text{Avg}(H)}(i) = \\frac{1}{L_i} \\sum_{l=1}^{L_i} H(t_l), \\quad H(t_l) = -\\sum_{k=1}^{K} p(t_l^{(k)}) \\log p(t_l^{(k)})</div>\n<div class=\"warn-box\">⚠️ <strong>局限</strong>：灰盒方法要求访问模型内部概率，对 GPT-4 等黑盒 API 不适用。这正是 SelfCheckGPT 黑盒方法的动机所在。</div>\n<h5>五种黑盒检测方法详解</h5>\n<p><strong>1. SelfCheck-BERTScore</strong></p>\n<p>利用 BERTScore 衡量主响应句子 <span class=\"kb-math kb-math-inline\">r_i</span> 与每个采样响应 <span class=\"kb-math kb-math-inline\">S_n</span> 中各句子的语义相似度。取最大相似度作为该采样的支持度，再对 <span class=\"kb-math kb-math-inline\">N</span> 个采样取平均：</p>\n<div class=\"kb-math kb-math-display\">S_{\\text{BERTScore}}(i) = 1 - \\frac{1}{N} \\sum_{n=1}^{N} \\max_{j} \\text{BERTScore}(r_i, s_j^{(n)})</div>\n<p>得分越高表示句子在采样中缺乏语义支持，幻觉可能性越大。</p>\n<p><strong>2. SelfCheck-QA (MQAG)</strong></p>\n<p>通过问答生成与回答来间接评估一致性。首先基于主响应句子 <span class=\"kb-math kb-math-inline\">r_i</span> 生成多个问题 <span class=\"kb-math kb-math-inline\">q</span>，然后分别在主响应和采样响应上回答这些问题，比较答案一致性：</p>\n<div class=\"kb-math kb-math-display\">P(a_i | q, C) = \\frac{\\exp(g(a_i, q, C))}{\\sum_{a&#x27; \\in A} \\exp(g(a&#x27;, q, C))}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">g(\\cdot)</span> 是 MQAG 模型的评分函数，<span class=\"kb-math kb-math-inline\">C</span> 为上下文。通过 KL 散度或计数匹配来量化答案分布差异。</p>\n<p><strong>3. SelfCheck-n-gram</strong></p>\n<p>最轻量的方法，计算主响应句子中 n-gram 在采样响应中出现的频率：</p>\n<div class=\"kb-math kb-math-display\">S_{\\text{n-gram}}(i) = 1 - \\frac{1}{N} \\sum_{n=1}^{N} \\frac{|\\{g : g \\in r_i \\cap S_n\\}|}{|r_i|}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">|r_i|</span> 是句子 <span class=\"kb-math kb-math-inline\">r_i</span> 中的 n-gram 总数。论文使用 unigram 到 trigram 的加权组合，并引入 <span class=\"kb-math kb-math-inline\">\\min(\\cdot, 1)</span> 截断和负对数变换提升区分度：</p>\n<div class=\"kb-math kb-math-display\">S&#x27;_{\\text{n-gram}}(i) = -\\frac{1}{N} \\sum_{n=1}^{N} \\log \\min\\left(\\frac{c_n(r_i, S_n)}{|r_i|}, 1\\right)</div>\n<div class=\"key-point\">💡 <strong>优势</strong>：n-gram 方法不依赖任何外部模型，计算开销极低，适合大规模部署。</div>\n<p><strong>4. SelfCheck-NLI</strong></p>\n<p>使用自然语言推理（NLI）模型判断采样响应是否与主响应句子矛盾。采用 DeBERTa-v3-large（在 MNLI 上微调）作为 NLI 模型：</p>\n<div class=\"kb-math kb-math-display\">P(\\text{contradict} | r_i, S_n) = \\frac{\\exp(z_c)}{\\exp(z_e) + \\exp(z_c)}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">z_e</span> 和 <span class=\"kb-math kb-math-inline\">z_c</span> 分别是\"蕴含\"和\"矛盾\"类别的 logits。注意此处<strong>忽略了中性类别</strong>，仅在蕴含和矛盾之间归一化，确保概率在 [0, 1] 之间。最终得分：</p>\n<div class=\"kb-math kb-math-display\">S_{\\text{NLI}}(i) = \\frac{1}{N} \\sum_{n=1}^{N} P(\\text{contradict} | r_i, S_n)</div>\n<p><strong>5. SelfCheck-Prompt</strong></p>\n<p>直接利用 LLM 自身作为一致性判断器，通过如下 prompt 询问：</p>\n<pre><code>Context: {sampled_passage}\nSentence: {sentence_to_check}\nIs the sentence supported by the context above?\nAnswer Yes or No:\n</code></pre>\n<p>输出映射为数值：<span class=\"kb-math kb-math-inline\">\\{Yes: 0.0, No: 1.0, N/A: 0.5\\}</span>，最终得分：</p>\n<div class=\"kb-math kb-math-display\">S_{\\text{Prompt}}(i) = \\frac{1}{N} \\sum_{n=1}^{N} x_i^n</div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：论文发现只有较强的 LLM（如 GPT-3 text-davinci-003、ChatGPT）才能有效执行此一致性评估，较弱的模型（如 text-curie-001、LLaMA）效果不佳。</div>\n<h5>实验结果与关键发现</h5>\n<p><strong>数据集构建</strong>：从 WikiBio 数据集中选取 238 个人物概念，使用 GPT-3（text-davinci-003）生成传记文章，共 1908 个句子。人工标注结果：39.9% Major Inaccurate，33.1% Minor Inaccurate，27.0% Accurate。标注者间一致性 Cohen's κ = 0.748（2-class）。</p>\n<p><strong>句子级检测性能</strong>（AUC-PR，NonFactual 类别）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th style=\"text-align: center;\">AUC-PR (NonFact)</th>\n<th style=\"text-align: center;\">AUC-PR (Factual)</th>\n<th style=\"text-align: center;\">类型</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Random baseline</td>\n<td style=\"text-align: center;\">72.96</td>\n<td style=\"text-align: center;\">27.04</td>\n<td style=\"text-align: center;\">—</td>\n</tr>\n<tr>\n<td>Avg(-log p)</td>\n<td style=\"text-align: center;\">83.21</td>\n<td style=\"text-align: center;\">53.97</td>\n<td style=\"text-align: center;\">灰盒</td>\n</tr>\n<tr>\n<td>SelfCheck-BERTScore</td>\n<td style=\"text-align: center;\">81.09</td>\n<td style=\"text-align: center;\">46.56</td>\n<td style=\"text-align: center;\">黑盒</td>\n</tr>\n<tr>\n<td>SelfCheck-QA (MQAG)</td>\n<td style=\"text-align: center;\">82.90</td>\n<td style=\"text-align: center;\">47.30</td>\n<td style=\"text-align: center;\">黑盒</td>\n</tr>\n<tr>\n<td>SelfCheck-n-gram</td>\n<td style=\"text-align: center;\">85.28</td>\n<td style=\"text-align: center;\">56.94</td>\n<td style=\"text-align: center;\">黑盒</td>\n</tr>\n<tr>\n<td>SelfCheck-NLI</td>\n<td style=\"text-align: center;\"><strong>92.50</strong></td>\n<td style=\"text-align: center;\"><strong>72.32</strong></td>\n<td style=\"text-align: center;\">黑盒</td>\n</tr>\n<tr>\n<td>SelfCheck-Prompt (GPT-3)</td>\n<td style=\"text-align: center;\"><strong>93.42</strong></td>\n<td style=\"text-align: center;\"><strong>74.56</strong></td>\n<td style=\"text-align: center;\">黑盒</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>关键发现</strong>：</p>\n<ol>\n<li><strong>黑盒超越灰盒</strong>：SelfCheck-Prompt 和 SelfCheck-NLI 显著超越所有灰盒概率基线，证明采样一致性比 token 概率更能反映事实性</li>\n<li><strong>LLM 概率确实与事实性相关</strong>：灰盒方法（AUC-PR 83.21）远超随机基线（72.96），验证了\"模型对幻觉内容的 token 不确定性更高\"的假设</li>\n<li><strong>代理 LLM 效果较差</strong>：使用 LLaMA 作为代理模型替代 GPT-3 计算概率时，性能接近随机基线，表明不同 LLM 的生成模式差异显著</li>\n<li><strong>采样数量影响</strong>：N=5 时性能已有明显提升，N=20 时趋于饱和</li>\n<li><strong>段落级检测</strong>：SelfCheck-Prompt 的 Pearson 相关系数达 78.32，可有效识别\"完全幻觉\"段落</li>\n</ol>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th style=\"text-align: center;\">传统事实核查</th>\n<th style=\"text-align: center;\">SelfCheckGPT</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>外部知识</td>\n<td style=\"text-align: center;\">需要知识库/搜索引擎</td>\n<td style=\"text-align: center;\"><strong>不需要</strong></td>\n</tr>\n<tr>\n<td>模型访问</td>\n<td style=\"text-align: center;\">需要内部概率（灰盒）</td>\n<td style=\"text-align: center;\"><strong>仅需文本输出（黑盒）</strong></td>\n</tr>\n<tr>\n<td>适用范围</td>\n<td style=\"text-align: center;\">受限于知识库覆盖</td>\n<td style=\"text-align: center;\"><strong>任意领域</strong></td>\n</tr>\n<tr>\n<td>核心信号</td>\n<td style=\"text-align: center;\">token 不确定性</td>\n<td style=\"text-align: center;\"><strong>采样间一致性</strong></td>\n</tr>\n<tr>\n<td>计算开销</td>\n<td style=\"text-align: center;\">单次推理</td>\n<td style=\"text-align: center;\">需 N 次额外采样</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "SelfCheckGPT 的核心假设是什么？",
        "options": [
          "LLM 生成的所有内容都是幻觉",
          "如果 LLM 真正掌握某个事实，多次采样会产生一致的内容；幻觉内容则在不同采样间相互矛盾",
          "token 概率越高的句子越可能是幻觉",
          "外部知识库可以完全覆盖 LLM 的所有输出"
        ],
        "answer": 1,
        "explain": "SelfCheckGPT 的核心假设是采样一致性反映事实可靠性——已知事实在多次采样中保持一致，而幻觉内容因缺乏真实知识支撑而在不同采样间产生矛盾。"
      }
    },
    {
      "id": "factscore",
      "num": 9,
      "name": "FActScore",
      "fullName": "细粒度原子事实评估 (Fine-grained Atomic Evaluation of Factual Precision)",
      "year": "2023",
      "org": "UW+Meta",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2305.14251",
      "projectUrl": "",
      "category": "hallucination",
      "motivation": "原子事实精度评估",
      "summary": "FActScore 的核心目标是：原子事实精度评估。",
      "keyPoints": [
        "核心动机：原子事实精度评估",
        "代表机构：UW+Meta"
      ],
      "detail": "<p>原子事实精度评估</p>"
    },
    {
      "id": "rag",
      "num": 10,
      "name": "RAG",
      "fullName": "检索增强生成 (Retrieval-Augmented Generation)",
      "year": "2020",
      "org": "Meta",
      "parent": "—",
      "paperUrl": "https://proceedings.neurips.cc/paper/2020/hash/6ad1d765d319713629bc3840d8d4881a-Abstract.html",
      "projectUrl": "",
      "category": "hallucination",
      "motivation": "检索增强知识锚定生成",
      "summary": "RAG 提出将预训练参数化记忆（BART seq2seq 生成器）与非参数化记忆（基于 DPR 的 Wikipedia 稠密向量索引）相结合的通用微调范式，通过在生成过程中检索外部知识文档作为上下文，解决了纯参数化语言模型在知识密集型任务上事实准确性不足、知识难以更新和缺乏可解释性的问题。",
      "keyPoints": [
        "提出 RAG 框架：将检索器（非参数化记忆）与生成器（参数化记忆）以概率模型方式端到端结合",
        "两种边际化变体：<strong>RAG-Sequence</strong>（整个输出序列使用同一检索文档）和 <strong>RAG-Token</strong>（每个输出 token 可使用不同检索文档）",
        "检索器采用 <strong>DPR</strong>（Dense Passage Retriever）：基于双塔 BERT 编码器的稠密检索，通过内积计算查询-文档相关性",
        "生成器采用 <strong>BART-large</strong>（400M 参数）：将输入查询与检索文档拼接后送入编码器-解码器生成答案",
        "非参数化知识源：Wikipedia 全量转储（2018.12），切分为 2100 万个 100 词文档块，使用 FAISS 构建 MIPS 索引",
        "训练策略：联合训练查询编码器 <span class=\"kb-math kb-math-inline\">BERT_q</span> 和 BART 生成器，<strong>文档编码器和索引保持冻结</strong>，无需显式检索监督",
        "在 4 个开放域 QA 基准（NQ、TriviaQA、WebQuestions、CuratedTrec）上达到 SOTA，超越纯参数化和纯抽取式方法",
        "在生成任务（Jeopardy 问题生成、MSMARCO 摘要式 QA）上生成更具体、多样和事实性更强的文本"
      ],
      "detail": "<p><img alt=\"RAG 模型架构总览\" src=\"https://ar5iv.labs.arxiv.org/html/2005.11401/assets/x1.png\" />\n<em>图：RAG 模型架构。左侧为检索器（DPR），将输入查询编码后在 Wikipedia 文档索引中检索 top-K 相关文档；右侧为生成器（BART），将查询与检索文档拼接后自回归生成输出序列。两种变体 RAG-Sequence 和 RAG-Token 在边际化方式上有所不同。</em></p>\n<pre><code class=\"language-python\"># RAG 推理伪代码\ndef rag_inference(query_x, retriever, generator, k=5, mode=&quot;sequence&quot;):\n    &quot;&quot;&quot;\n    query_x: 输入查询\n    retriever: DPR 检索器 (BERT_q + FAISS index)\n    generator: BART-large 生成器\n    k: 检索文档数量\n    mode: &quot;sequence&quot; (RAG-Sequence) 或 &quot;token&quot; (RAG-Token)\n    &quot;&quot;&quot;\n    # Step 1: 检索 top-K 文档\n    q = BERT_q(query_x)                          # 编码查询\n    top_k_docs = FAISS_index.search(q, k)         # MIPS 检索\n    p_eta = softmax([dot(d_z, q) for d_z in top_k_docs])  # 检索概率\n\n    if mode == &quot;token&quot;:\n        # RAG-Token: 每个 token 独立边际化\n        # p'(y_i|x, y_{1:i-1}) = Σ_z p_η(z|x) * p_θ(y_i|x, z, y_{1:i-1})\n        output = beam_search_with_marginalized_transition(\n            generator, query_x, top_k_docs, p_eta\n        )\n    else:\n        # RAG-Sequence: 每个文档独立 beam search，再合并\n        hypotheses = {}\n        for z, p_z in zip(top_k_docs, p_eta):\n            input_seq = concatenate(query_x, z)\n            beams = beam_search(generator, input_seq)\n            for y, score in beams:\n                hypotheses[y] = hypotheses.get(y, 0) + p_z * score\n        output = argmax(hypotheses)\n\n    return output\n</code></pre>\n<h5>动机与背景</h5>\n<p>大规模预训练语言模型（如 GPT-2、BERT）已被证明能在参数中存储大量事实知识，但这种纯参数化的知识存储方式存在三个根本性缺陷：</p>\n<ol>\n<li><strong>知识更新困难</strong>：模型参数中编码的世界知识无法便捷地修改或扩展，一旦训练完成，知识就被\"冻结\"在参数中。</li>\n<li><strong>缺乏可解释性</strong>：模型生成答案时无法提供决策依据的溯源（provenance），用户无法验证信息来源。</li>\n<li><strong>幻觉问题</strong>：模型可能生成看似合理但事实错误的内容（hallucination），在知识密集型任务上表现尤为突出。</li>\n</ol>\n<p>在 RAG 之前，REALM 和 ORQA 等工作已探索将检索机制与掩码语言模型结合，但仅限于抽取式下游任务（即从检索文档中直接提取答案片段）。RAG 的核心创新在于将这一思路推广到<strong>生成式任务</strong>，使模型能够综合检索到的多个文档信息，自由生成答案文本。</p>\n<div class=\"key-point\">💡 关键：RAG 将检索到的文档视为<strong>潜变量（latent variable）</strong>，通过边际化（marginalization）将检索与生成统一在一个端到端可训练的概率框架中，无需显式标注\"应该检索哪个文档\"。</div>\n<h5>核心机制：两种边际化策略</h5>\n<p>RAG 的核心数学框架是将生成概率 <span class=\"kb-math kb-math-inline\">p(y|x)</span> 分解为检索概率与条件生成概率的边际化：</p>\n<p><strong>RAG-Sequence 模型</strong>——对整个输出序列使用同一文档进行边际化：</p>\n<div class=\"kb-math kb-math-display\">p_{\\text{RAG-Sequence}}(y|x) \\approx \\sum_{z \\in \\text{top-}k(p(\\cdot|x))} p_{\\eta}(z|x) \\prod_{i}^{N} p_{\\theta}(y_i|x, z, y_{1:i-1})</div>\n<p>直觉理解：先检索 K 个文档，对每个文档独立生成完整答案，最后按检索概率加权求和。这适合答案完全来自单一文档的场景。</p>\n<p><strong>RAG-Token 模型</strong>——允许每个 token 从不同文档中获取信息：</p>\n<div class=\"kb-math kb-math-display\">p_{\\text{RAG-Token}}(y|x) \\approx \\prod_{i}^{N} \\sum_{z \\in \\text{top-}k(p(\\cdot|x))} p_{\\eta}(z|x) \\, p_{\\theta}(y_i|x, z, y_{1:i-1})</div>\n<p>直觉理解：生成每个 token 时，都对所有检索文档的贡献进行加权混合。这使模型能够在一个答案中融合多个文档的信息，适合需要综合多源知识的场景。</p>\n<div class=\"warn-box\">⚠️ 注意：两个公式的关键区别在于<strong>求和符号 <span class=\"kb-math kb-math-inline\">\\sum</span> 与连乘符号 <span class=\"kb-math kb-math-inline\">\\prod</span> 的嵌套顺序</strong>。RAG-Sequence 是\"先生成后求和\"，RAG-Token 是\"先求和后连乘\"。</div>\n<h5>检索器：DPR 双塔架构</h5>\n<p>检索组件基于 Dense Passage Retriever（DPR），采用双塔（bi-encoder）架构：</p>\n<div class=\"kb-math kb-math-display\">p_{\\eta}(z|x) \\propto \\exp\\left(\\mathbf{d}(z)^{\\top} \\mathbf{q}(x)\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{q}(x) = \\text{BERT}_q(x)</span> 为查询编码器输出，<span class=\"kb-math kb-math-inline\">\\mathbf{d}(z) = \\text{BERT}_d(z)</span> 为文档编码器输出。两者均基于 BERT-base，分别将查询和文档映射到同一稠密向量空间，通过内积衡量相关性。</p>\n<p>文档索引使用 <strong>FAISS</strong> 库构建最大内积搜索（MIPS）索引，采用 HNSW（Hierarchical Navigable Small World）近似算法实现毫秒级检索。整个 Wikipedia 被切分为 2100 万个 100 词的文档块，每个块预计算稠密向量表示。</p>\n<h5>生成器：BART-large</h5>\n<p>生成组件采用 BART-large（400M 参数），一个基于 Transformer 的预训练 seq2seq 模型。输入构造方式非常简洁：<strong>将原始查询 <span class=\"kb-math kb-math-inline\">x</span> 与检索文档 <span class=\"kb-math kb-math-inline\">z</span> 直接拼接</strong>，作为 BART 编码器的输入，解码器自回归生成输出序列。</p>\n<p>BART 通过去噪自编码目标预训练，在多种生成任务上表现优异。论文将 BART 的参数 <span class=\"kb-math kb-math-inline\">\\theta</span> 称为<strong>参数化记忆（parametric memory）</strong>，与 Wikipedia 索引构成的<strong>非参数化记忆（non-parametric memory）</strong>形成互补。</p>\n<h5>训练流程</h5>\n<p>训练采用标准的监督微调范式，给定输入-输出对 <span class=\"kb-math kb-math-inline\">(x_j, y_j)</span>，最小化负边际对数似然：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\sum_j -\\log p(y_j | x_j)</div>\n<p>关键设计决策：\n- <strong>文档编码器 <span class=\"kb-math kb-math-inline\">\\text{BERT}_d</span> 和 FAISS 索引保持冻结</strong>：避免了 REALM 中需要周期性重建索引的高昂计算开销\n- <strong>仅微调查询编码器 <span class=\"kb-math kb-math-inline\">\\text{BERT}_q</span> 和 BART 生成器</strong>：通过梯度反向传播联合优化检索与生成\n- <strong>无需检索监督</strong>：不需要标注\"正确文档\"，检索文档作为潜变量被自动学习\n- 训练时检索 top-K 文档（<span class=\"kb-math kb-math-inline\">k \\in \\{5, 10\\}</span>），测试时 K 值通过验证集选择</p>\n<h5>解码策略</h5>\n<p>两种变体需要不同的解码方式：</p>\n<ul>\n<li><strong>RAG-Token</strong>：由于边际化后的转移概率 <span class=\"kb-math kb-math-inline\">p&#x27;_{\\theta}(y_i|x, y_{1:i-1})</span> 具有标准自回归形式，可直接使用常规 beam search 解码。</li>\n<li><strong>RAG-Sequence</strong>：生成概率无法分解为逐 token 的形式，论文提出两种策略：</li>\n<li><strong>Thorough Decoding</strong>：对每个检索文档独立运行 beam search，收集所有候选假设，对未出现在某文档 beam 中的假设额外运行前向传播计算概率，最终加权求和。精确但计算量大。</li>\n<li><strong>Fast Decoding</strong>：假设未在某文档 beam 中出现的假设概率为 0，避免额外前向传播。近似但高效。</li>\n</ul>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>纯参数化模型（如 T5）</th>\n<th>抽取式检索（如 DPR+Reader）</th>\n<th>RAG</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>知识来源</td>\n<td>仅参数记忆</td>\n<td>仅检索文档</td>\n<td>参数 + 检索</td>\n</tr>\n<tr>\n<td>答案形式</td>\n<td>自由生成</td>\n<td>文档片段抽取</td>\n<td>自由生成</td>\n</tr>\n<tr>\n<td>知识更新</td>\n<td>需重新训练</td>\n<td>替换文档索引</td>\n<td>替换文档索引</td>\n</tr>\n<tr>\n<td>可解释性</td>\n<td>无</td>\n<td>可追溯文档</td>\n<td>可追溯文档</td>\n</tr>\n<tr>\n<td>多文档综合</td>\n<td>隐式</td>\n<td>困难</td>\n<td>RAG-Token 原生支持</td>\n</tr>\n</tbody>\n</table></div>\n<p>RAG 的独特优势在于：既保留了生成模型的灵活性（可以生成训练数据中未出现的答案），又通过检索机制锚定了外部知识，显著减少幻觉并支持知识热更新。</p>",
      "quiz": {
        "q": "RAG-Sequence 和 RAG-Token 两种变体的核心区别是什么？",
        "options": [
          "使用不同的检索器架构",
          "边际化潜变量（检索文档）的方式不同：RAG-Sequence 对整个序列使用同一文档，RAG-Token 允许每个 token 使用不同文档",
          "RAG-Sequence 使用 BART，RAG-Token 使用 T5",
          "RAG-Token 不需要检索，仅依赖参数化记忆"
        ],
        "answer": 1,
        "explain": "两种变体使用相同的检索器和生成器，区别在于求和(Σ)与连乘(Π)的嵌套顺序：RAG-Sequence 先对每个文档生成完整序列再求和，RAG-Token 在每个 token 位置先对文档求和再连乘。"
      }
    },
    {
      "id": "truthfulqa",
      "num": 11,
      "name": "TruthfulQA",
      "fullName": "真实性问答基准 (TruthfulQA Benchmark)",
      "year": "2022",
      "org": "Oxford",
      "parent": "—",
      "paperUrl": "https://aclanthology.org/2022.acl-long.226/",
      "projectUrl": "",
      "category": "hallucination",
      "motivation": "虚假陈述倾向基准",
      "summary": "TruthfulQA 的核心目标是：虚假陈述倾向基准。",
      "keyPoints": [
        "核心动机：虚假陈述倾向基准",
        "代表机构：Oxford"
      ],
      "detail": "<p>虚假陈述倾向基准</p>"
    },
    {
      "id": "rlhf",
      "num": 12,
      "name": "RLHF",
      "fullName": "人类反馈强化学习 (Reinforcement Learning from Human Feedback)",
      "year": "2022",
      "org": "OpenAI",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2203.02155",
      "projectUrl": "",
      "category": "alignment",
      "motivation": "人类偏好强化学习对齐",
      "summary": "InstructGPT 提出了 SFT → 奖励模型训练 → PPO 强化学习的三阶段 RLHF 流程，利用人类偏好反馈对齐语言模型输出与用户意图，使 1.3B 参数的对齐模型在人类评估中优于 175B 的原始 GPT-3。",
      "keyPoints": [
        "<strong>三阶段训练流程</strong>：Step 1 监督微调 (SFT) → Step 2 奖励模型训练 (RM) → Step 3 PPO 强化学习优化",
        "<strong>涉及 4 个模型</strong>：SFT Model、Reward Model (6B)、Policy Model (<span class=\"kb-math kb-math-inline\">\\pi_\\phi^{\\text{RL}}</span>)、Reference Model (<span class=\"kb-math kb-math-inline\">\\pi^{\\text{SFT}}</span>)",
        "<strong>奖励模型</strong>：基于人类对 K=4\\~9 个输出的排序，利用 <span class=\"kb-math kb-math-inline\">\\binom{K}{2}</span> 对比较对进行 pairwise 训练，6B 参数效果最优",
        "<strong>PPO-ptx 目标函数</strong>：在 PPO 奖励最大化的基础上加入 KL 散度惩罚（防止策略偏离 SFT）和预训练梯度混合（防止 NLP 能力退化）",
        "<strong>数据规模</strong>：SFT 约 13k 提示、RM 约 33k 提示、PPO 约 31k 提示，由 40 名标注者提供，标注者间一致率 72.6%",
        "<strong>核心发现</strong>：1.3B InstructGPT 在人类偏好评估中胜过 175B GPT-3；RLHF 显著降低毒性和幻觉"
      ],
      "detail": "<p><img alt=\"InstructGPT 三阶段训练流程图\" src=\"https://ar5iv.labs.arxiv.org/html/2203.02155/assets/x2.png\" />\n<em>图：RLHF 训练的三个阶段——(1) 监督微调 SFT，(2) 奖励模型训练 RM，(3) PPO 强化学习优化</em></p>\n<pre><code class=\"language-python\"># InstructGPT / RLHF 三阶段训练伪代码\n\n# ========== Step 1: Supervised Fine-Tuning (SFT) ==========\nsft_model = pretrained_gpt3.copy()\nfor epoch in range(16):  # 16 epochs, cosine LR, dropout=0.2\n    for (prompt, demonstration) in sft_dataset:  # ~13k prompts\n        loss = cross_entropy(sft_model(prompt), demonstration)\n        sft_model.update(loss)\n\n# ========== Step 2: Reward Model Training (RM) ==========\nreward_model = sft_model.remove_unembedding_layer()  # 6B params\nreward_model.add_scalar_head()  # 输出标量奖励值\nfor batch in rm_dataset:  # ~33k prompts\n    prompt, ranked_outputs = batch  # K=4~9 个输出的人类排序\n    loss = 0\n    for (y_w, y_l) in all_pairs(ranked_outputs):  # C(K,2) 对\n        loss -= log(sigmoid(reward_model(prompt, y_w) - reward_model(prompt, y_l)))\n    loss /= num_pairs\n    reward_model.update(loss)\n\n# ========== Step 3: PPO Reinforcement Learning ==========\npolicy = sft_model.copy()          # π_RL, 可训练\nreference = sft_model.copy()       # π_SFT, 冻结\nvalue_fn = reward_model.copy()     # 初始化自 RM\n\nfor iteration in ppo_iterations:\n    prompt = sample(ppo_prompts)           # ~31k prompts\n    response = policy.generate(prompt)     # rollout\n    reward = reward_model(prompt, response)\n    kl_penalty = beta * log(policy(response|prompt) / reference(response|prompt))\n    ppo_reward = reward - kl_penalty\n    # PPO-ptx: 混合预训练梯度\n    pretrain_loss = -gamma * log_likelihood(policy, pretrain_batch)\n    policy.ppo_update(ppo_reward + pretrain_loss)\n</code></pre>\n<p><strong>动机与背景：大语言模型的对齐问题</strong></p>\n<p>大规模语言模型（如 GPT-3）通过在海量互联网文本上进行下一词预测训练，获得了强大的语言生成能力。然而，\"预测下一个词\"这一训练目标与\"遵循用户指令并生成有帮助、诚实、无害的回答\"之间存在根本性的错位（misalignment）。GPT-3 经常生成不真实的内容（幻觉）、有毒文本，或者无法准确理解用户意图。传统的监督微调虽然能在一定程度上改善指令遵循能力，但受限于高质量标注数据的稀缺性——让人类为每个可能的提示编写理想回答的成本极高。InstructGPT 的核心洞察是：<strong>让人类评判输出的好坏（比较/排序）远比让人类撰写完美回答更容易</strong>，因此可以通过人类偏好反馈训练一个奖励模型，再用强化学习优化语言模型的输出策略。</p>\n<p><strong>核心机制：三阶段 RLHF 流程</strong></p>\n<p><strong>第一阶段——监督微调 (SFT)</strong>：在约 13,000 条由标注者编写的高质量 (prompt, demonstration) 对上微调 GPT-3。训练采用 16 个 epoch、余弦学习率衰减和 0.2 的 dropout。虽然 SFT 模型在 1 个 epoch 后就已过拟合验证损失，但继续训练仍能提升人类偏好评分，说明 RM 评分与验证损失并非完全相关。</p>\n<p><strong>第二阶段——奖励模型训练 (RM)</strong>：从 SFT 模型（6B 参数版本）移除最终的 unembedding 层，添加一个线性投影头输出标量奖励值。对于每个提示，标注者对 K=4\\~9 个模型输出进行排序，产生 <span class=\"kb-math kb-math-inline\">\\binom{K}{2}</span> 个偏好对。RM 的训练损失函数为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{RM}}(\\theta) = -\\frac{1}{\\binom{K}{2}} \\mathbb{E}_{(x, y_w, y_l) \\sim D}\\left[\\log \\sigma\\left(r_\\theta(x, y_w) - r_\\theta(x, y_l)\\right)\\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">r_\\theta(x, y)</span> 是奖励模型对提示 <span class=\"kb-math kb-math-inline\">x</span> 和输出 <span class=\"kb-math kb-math-inline\">y</span> 的标量评分，<span class=\"kb-math kb-math-inline\">y_w</span> 是偏好对中被偏好的输出，<span class=\"kb-math kb-math-inline\">y_l</span> 是较差的输出。关键设计是<strong>将同一提示的所有 <span class=\"kb-math kb-math-inline\">\\binom{K}{2}</span> 对比较放入同一个 batch</strong>，避免了奖励模型的过拟合问题。论文发现 6B 的 RM 比 175B 更稳定，大模型 RM 训练不稳定。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：奖励模型只需要学习输出之间的<strong>相对偏好排序</strong>，而非绝对分数。训练前通过偏置归一化使标注者示范的平均奖励为 0。</div>\n<p><strong>第三阶段——PPO 强化学习优化</strong>：将语言模型的生成过程建模为一个 bandit 环境——给定随机提示，模型生成回答，奖励模型给出评分后 episode 结束。PPO-ptx 的完整优化目标为：</p>\n<div class=\"kb-math kb-math-display\">\\operatorname{objective}(\\phi) = \\mathbb{E}_{(x,y) \\sim D_{\\pi_\\phi^{\\text{RL}}}}\\left[r_\\theta(x,y) - \\beta \\log\\frac{\\pi_\\phi^{\\text{RL}}(y \\mid x)}{\\pi^{\\text{SFT}}(y \\mid x)}\\right] + \\gamma \\mathbb{E}_{x \\sim D_{\\text{pretrain}}}\\left[\\log \\pi_\\phi^{\\text{RL}}(x)\\right]</div>\n<p>其中第一项是经 KL 惩罚调节的奖励最大化——<span class=\"kb-math kb-math-inline\">\\beta</span> 控制 KL 散度惩罚强度，防止策略 <span class=\"kb-math kb-math-inline\">\\pi_\\phi^{\\text{RL}}</span> 过度偏离参考模型 <span class=\"kb-math kb-math-inline\">\\pi^{\\text{SFT}}</span>，从而避免对奖励模型的过度优化（reward hacking）。第二项是预训练数据上的语言模型损失，系数 <span class=\"kb-math kb-math-inline\">\\gamma</span> 控制其权重，用于缓解 RL 训练导致的公共 NLP 任务性能退化（alignment tax）。当 <span class=\"kb-math kb-math-inline\">\\gamma = 0</span> 时退化为标准 PPO 模型。Value function 从 RM 初始化。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：KL 惩罚是<strong>逐 token</strong>施加的，而非在整个序列级别。这提供了更细粒度的约束，防止模型在局部生成与 SFT 分布严重偏离的 token。</div>\n<p><strong>与传统方法的区别与核心优势</strong></p>\n<p>与纯监督微调相比，RLHF 的关键优势在于利用了<strong>比较反馈</strong>而非<strong>示范反馈</strong>。人类标注者判断\"A 比 B 好\"的一致性和效率远高于\"从零撰写完美回答\"。与直接使用 RM 分数做 best-of-n 采样（rejection sampling）相比，PPO 优化将奖励信号内化到模型参数中，推理时无需多次采样，计算效率更高。实验表明，1.3B 的 InstructGPT 在人类偏好评估中以显著优势胜过 175B 的 GPT-3，甚至在 TruthfulQA 和 RealToxicityPrompts 等安全基准上也表现更优。PPO-ptx 变体通过混合预训练梯度，在对齐能力和通用 NLP 能力之间取得了良好平衡，将 alignment tax 降至最低。这一三阶段框架后来成为 ChatGPT 等对话系统的基础训练范式。</p>",
      "quiz": {
        "q": "InstructGPT 在 PPO 训练中加入 KL 散度惩罚项的主要目的是什么？",
        "options": [
          "加速策略模型的收敛速度",
          "防止策略模型过度偏离 SFT 参考模型，避免奖励模型被过度优化",
          "提升奖励模型的预测精度",
          "减少模型的参数量以节省计算资源"
        ],
        "answer": 1,
        "explain": "KL 散度惩罚约束 π_RL 与 π_SFT 的分布差异，防止策略过度优化奖励模型的漏洞（reward hacking），确保生成质量。"
      }
    },
    {
      "id": "cai",
      "num": 13,
      "name": "CAI",
      "fullName": "宪法AI (Constitutional AI)",
      "year": "2022",
      "org": "Anthropic",
      "parent": "rlhf",
      "paperUrl": "https://arxiv.org/abs/2212.08073",
      "projectUrl": "",
      "category": "alignment",
      "motivation": "宪法原则自我监督对齐",
      "summary": "CAI 的核心目标是：宪法原则自我监督对齐。",
      "keyPoints": [
        "核心动机：宪法原则自我监督对齐",
        "演化来源：继承或改进自 rlhf",
        "代表机构：Anthropic"
      ],
      "detail": "<p>宪法原则自我监督对齐</p>"
    },
    {
      "id": "dpo",
      "num": 14,
      "name": "DPO",
      "fullName": "直接偏好优化 (Direct Preference Optimization)",
      "year": "2023",
      "org": "Stanford",
      "parent": "rlhf",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2023/hash/a85b405ed65c6477a4fe8302b5e06ce7-Abstract-Conference.html",
      "projectUrl": "",
      "category": "alignment",
      "motivation": "直接偏好优化无需奖励模型",
      "summary": "DPO 通过推导 KL 约束奖励最大化目标的闭式最优策略解，将传统 RLHF 的\"训练奖励模型 + 强化学习微调\"两阶段流程简化为直接在人类偏好数据上优化的二元交叉熵分类损失，完全消除了对显式奖励模型和 RL 采样的需求。",
      "keyPoints": [
        "<strong>无需奖励模型</strong>：跳过 RLHF 中的奖励建模阶段，直接利用偏好对 <span class=\"kb-math kb-math-inline\">(y_w, y_l)</span> 优化策略",
        "<strong>闭式最优策略</strong>：推导出 KL 约束 RL 目标下最优策略 <span class=\"kb-math kb-math-inline\">\\pi^*(y|x) \\propto \\pi_{\\text{ref}}(y|x) \\exp\\!\\bigl(\\tfrac{1}{\\beta} r^*(x,y)\\bigr)</span> 的解析解",
        "<strong>奖励重参数化</strong>：将奖励函数表示为策略对数比 <span class=\"kb-math kb-math-inline\">r(x,y) = \\beta \\log \\frac{\\pi_\\theta(y|x)}{\\pi_{\\text{ref}}(y|x)} + \\beta \\log Z(x)</span>，代入 Bradley-Terry 模型消去配分函数",
        "<strong>DPO 损失函数</strong>：最终形式为简洁的 sigmoid 交叉熵损失，仅涉及策略模型与参考模型的对数概率差",
        "<strong>隐式奖励与梯度加权</strong>：梯度分析表明 DPO 自动以隐式奖励的估计误差为权重调整更新幅度，对已正确排序的样本降低梯度",
        "<strong>仅需 2 个模型</strong>：训练时只需当前策略 <span class=\"kb-math kb-math-inline\">\\pi_\\theta</span> 和冻结的参考策略 <span class=\"kb-math kb-math-inline\">\\pi_{\\text{ref}}</span>，无需 Value Model 和 Reward Model",
        "<strong>理论保证</strong>：在 Bradley-Terry 偏好模型下，DPO 优化器与标准 RLHF 管线具有相同的全局最优解"
      ],
      "detail": "<p><img alt=\"DPO 核心流程对比图\" src=\"https://ar5iv.labs.arxiv.org/html/2305.18290/assets/figures/diagrams/teaser.png\" />\n<em>图：DPO 与传统 RLHF 流程对比。传统方法需要先训练奖励模型再用 PPO 做 RL 微调；DPO 直接在偏好数据上用分类损失优化策略，大幅简化流程。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># DPO 训练伪代码\n# 输入: 偏好数据集 D = {(x, y_w, y_l)}, 参考策略 π_ref, 温度 β\n# 输出: 对齐后的策略 π_θ\n\nπ_θ = copy(π_ref)  # 从参考策略（通常为 SFT 模型）初始化\n\nfor batch in DataLoader(D):\n    x, y_w, y_l = batch  # prompt, 偏好回答, 非偏好回答\n\n    # 计算当前策略和参考策略的对数概率\n    log_πθ_w  = π_θ.log_prob(y_w | x)\n    log_πθ_l  = π_θ.log_prob(y_l | x)\n    log_πref_w = π_ref.log_prob(y_w | x)   # 冻结，不计算梯度\n    log_πref_l = π_ref.log_prob(y_l | x)\n\n    # 计算隐式奖励差\n    log_ratio_w = log_πθ_w - log_πref_w\n    log_ratio_l = log_πθ_l - log_πref_l\n    logits = β * (log_ratio_w - log_ratio_l)\n\n    # DPO 损失：负对数 sigmoid\n    loss = -log_sigmoid(logits).mean()\n\n    optimizer.zero_grad()\n    loss.backward()\n    optimizer.step()\n</code></pre>\n<h5>1. 动机与背景：RLHF 的复杂性问题</h5>\n<p>传统 RLHF 流程包含三个阶段：(1) 监督微调 (SFT)；(2) 在偏好数据上训练 Bradley-Terry 奖励模型；(3) 用 PPO 等 RL 算法在 KL 约束下最大化奖励。这一流程存在多个痛点：</p>\n<ul>\n<li><strong>训练复杂度高</strong>：需要同时维护 4 个模型（Policy、Reference、Reward、Value），显存开销巨大</li>\n<li><strong>RL 训练不稳定</strong>：PPO 对超参数（裁剪系数、学习率、GAE 参数等）极为敏感</li>\n<li><strong>采样开销大</strong>：每轮优化都需要从当前策略采样生成完整回答，计算成本高昂</li>\n</ul>\n<p>DPO 的核心洞察是：<strong>奖励模型只是偏好数据到策略优化之间的中间产物，可以被数学推导消除</strong>。</p>\n<h5>2. 核心推导：从 RL 目标到分类损失</h5>\n<p><strong>第一步：KL 约束 RL 目标的闭式解。</strong> RLHF 的标准优化目标为：</p>\n<div class=\"kb-math kb-math-display\">\\max_{\\pi_\\theta} \\; \\mathbb{E}_{x \\sim \\mathcal{D},\\, y \\sim \\pi_\\theta(y|x)} \\bigl[ r_\\phi(x, y) \\bigr] - \\beta \\, D_{\\text{KL}}\\!\\bigl[\\pi_\\theta(y|x) \\,\\|\\, \\pi_{\\text{ref}}(y|x)\\bigr]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\beta</span> 控制策略偏离参考模型的程度。通过将目标展开并利用变分法（或直接验证），可以得到最优策略的<strong>闭式解</strong>：</p>\n<div class=\"kb-math kb-math-display\">\\pi^*(y|x) = \\frac{1}{Z(x)} \\, \\pi_{\\text{ref}}(y|x) \\, \\exp\\!\\Bigl(\\frac{1}{\\beta} \\, r(x, y)\\Bigr)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">Z(x) = \\sum_y \\pi_{\\text{ref}}(y|x) \\exp\\!\\bigl(\\frac{1}{\\beta} r(x,y)\\bigr)</span> 是配分函数（归一化常数）。</p>\n<div class=\"key-point\">💡 <strong>直觉</strong>：最优策略在参考策略的基础上，按奖励值做指数加权调整——奖励越高的回答概率越大，<span class=\"kb-math kb-math-inline\">\\beta</span> 越小偏离越激进。</div>\n<p><strong>第二步：奖励的重参数化。</strong> 对上式两边取对数并重新整理，可以将奖励表示为策略的函数：</p>\n<div class=\"kb-math kb-math-display\">r(x, y) = \\beta \\log \\frac{\\pi^*(y|x)}{\\pi_{\\text{ref}}(y|x)} + \\beta \\log Z(x)</div>\n<p>这是 DPO 最关键的等式——它将奖励函数用最优策略与参考策略的对数比来表达。</p>\n<p><strong>第三步：代入 Bradley-Terry 模型消去配分函数。</strong> Bradley-Terry 偏好模型假设人类偏好概率为：</p>\n<div class=\"kb-math kb-math-display\">p^*(y_w \\succ y_l | x) = \\sigma\\!\\bigl(r^*(x, y_w) - r^*(x, y_l)\\bigr)</div>\n<p>将重参数化的奖励代入上式，由于 <span class=\"kb-math kb-math-inline\">\\beta \\log Z(x)</span> 在 <span class=\"kb-math kb-math-inline\">y_w</span> 和 <span class=\"kb-math kb-math-inline\">y_l</span> 中相同，<strong>配分函数被完美消去</strong>：</p>\n<div class=\"kb-math kb-math-display\">p^*(y_w \\succ y_l | x) = \\sigma\\!\\left(\\beta \\log \\frac{\\pi^*(y_w|x)}{\\pi_{\\text{ref}}(y_w|x)} - \\beta \\log \\frac{\\pi^*(y_l|x)}{\\pi_{\\text{ref}}(y_l|x)}\\right)</div>\n<p><strong>第四步：DPO 损失函数。</strong> 用可训练策略 <span class=\"kb-math kb-math-inline\">\\pi_\\theta</span> 替代 <span class=\"kb-math kb-math-inline\">\\pi^*</span>，对偏好数据做最大似然估计，得到 DPO 损失：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{DPO}}(\\pi_\\theta; \\pi_{\\text{ref}}) = -\\mathbb{E}_{(x, y_w, y_l) \\sim \\mathcal{D}} \\left[ \\log \\sigma\\!\\left(\\beta \\log \\frac{\\pi_\\theta(y_w|x)}{\\pi_{\\text{ref}}(y_w|x)} - \\beta \\log \\frac{\\pi_\\theta(y_l|x)}{\\pi_{\\text{ref}}(y_l|x)}\\right) \\right]</div>\n<div class=\"key-point\">💡 <strong>关键</strong>：这是一个标准的二元交叉熵损失。输入的 logit 是偏好回答与非偏好回答在\"隐式奖励\"（即 <span class=\"kb-math kb-math-inline\">\\beta \\log \\frac{\\pi_\\theta}{\\pi_{\\text{ref}}}</span>）上的差值。整个损失只需要前向传播计算对数概率，无需 RL 采样。</div>\n<h5>3. 梯度分析与隐式奖励机制</h5>\n<p>DPO 损失的梯度具有直观的解释：</p>\n<div class=\"kb-math kb-math-display\">\\nabla_\\theta \\mathcal{L}_{\\text{DPO}} = -\\beta \\, \\mathbb{E} \\Big[ \\underbrace{\\sigma\\!\\bigl(\\hat{r}_\\theta(x,y_l) - \\hat{r}_\\theta(x,y_w)\\bigr)}_{\\text{隐式奖励排序错误的权重}} \\Big[ \\underbrace{\\nabla_\\theta \\log \\pi_\\theta(y_w|x)}_{\\text{增大偏好回答概率}} - \\underbrace{\\nabla_\\theta \\log \\pi_\\theta(y_l|x)}_{\\text{减小非偏好回答概率}} \\Big] \\Big]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\hat{r}_\\theta(x,y) = \\beta \\log \\frac{\\pi_\\theta(y|x)}{\\pi_{\\text{ref}}(y|x)}</span> 是隐式奖励。</p>\n<p>梯度的权重项 <span class=\"kb-math kb-math-inline\">\\sigma(\\hat{r}_\\theta(y_l) - \\hat{r}_\\theta(y_w))</span> 反映了当前模型对偏好排序的\"错误程度\"：\n- 当模型已经正确地给 <span class=\"kb-math kb-math-inline\">y_w</span> 更高的隐式奖励时，权重接近 0，梯度很小\n- 当模型错误地偏好 <span class=\"kb-math kb-math-inline\">y_l</span> 时，权重接近 1，梯度最大</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：这种自适应加权是 DPO 的内在机制，无需额外设计。它同时起到了正则化的作用——防止模型在已经正确排序的样本上过度优化而偏离参考策略。</div>\n<h5>4. DPO 与 RLHF 的理论等价性</h5>\n<p>论文在理论上证明了两个关键结果：</p>\n<ol>\n<li><strong>全局最优等价</strong>：在 Bradley-Terry 偏好模型假设下，DPO 的全局最优解与标准 RLHF 管线（奖励学习 + KL 约束 RL）的全局最优解一致。</li>\n<li><strong>隐式奖励模型</strong>：DPO 训练得到的策略 <span class=\"kb-math kb-math-inline\">\\pi_\\theta</span> 隐式定义了一个奖励模型 <span class=\"kb-math kb-math-inline\">\\hat{r}(x,y) = \\beta \\log \\frac{\\pi_\\theta(y|x)}{\\pi_{\\text{ref}}(y|x)}</span>，该奖励模型在 Plackett-Luce（BT 模型的推广）框架下是一致的。</li>\n</ol>\n<h5>5. 与传统 RLHF 方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>RLHF (PPO)</th>\n<th>DPO</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>训练阶段</td>\n<td>SFT → 奖励建模 → RL 微调</td>\n<td>SFT → 偏好优化（单阶段）</td>\n</tr>\n<tr>\n<td>所需模型数</td>\n<td>4 个（Policy, Ref, Reward, Value）</td>\n<td>2 个（Policy, Ref）</td>\n</tr>\n<tr>\n<td>是否需要采样</td>\n<td>是（每轮从策略采样）</td>\n<td>否（离线偏好数据）</td>\n</tr>\n<tr>\n<td>损失函数</td>\n<td>PPO 裁剪目标 + Value Loss</td>\n<td>二元交叉熵</td>\n</tr>\n<tr>\n<td>超参数敏感度</td>\n<td>高（ε, GAE λ, 学习率等）</td>\n<td>低（主要是 β）</td>\n</tr>\n<tr>\n<td>训练稳定性</td>\n<td>较差，易崩溃</td>\n<td>稳定，类似监督学习</td>\n</tr>\n<tr>\n<td>理论最优解</td>\n<td>相同（在 BT 模型下）</td>\n<td>相同（在 BT 模型下）</td>\n</tr>\n</tbody>\n</table></div>\n<h5>6. 实验验证</h5>\n<p>论文在三个任务上验证了 DPO 的有效性：</p>\n<ul>\n<li><strong>情感控制</strong>（IMDb 评论生成）：DPO 在奖励-KL 前沿上优于 PPO，以更小的 KL 散度达到更高的奖励</li>\n<li><strong>摘要生成</strong>（TL;DR 数据集）：DPO 在 GPT-4 评估的胜率上与 PPO 相当或更优，且训练效率更高</li>\n<li><strong>单轮对话</strong>（Anthropic-HH）：DPO 是唯一在 GPT-4 评估中超过人类标注偏好回答的方法</li>\n</ul>",
      "quiz": {
        "q": "DPO 推导中配分函数 Z(x) 被消去的关键原因是什么？",
        "options": [
          "配分函数在训练过程中趋近于 1",
          "Bradley-Terry 模型只依赖奖励差值，配分函数在相减时抵消",
          "参考策略的归一化性质使配分函数为常数",
          "DPO 使用了蒙特卡洛采样来近似配分函数"
        ],
        "answer": 1,
        "explain": "Bradley-Terry 偏好模型 p(y_w ≻ y_l) = σ(r(y_w) - r(y_l)) 只依赖两个回答的奖励差值。将重参数化奖励 r = β log(π/π_ref) + β log Z(x) 代入后，Z(x) 项在 y_w 和 y_l 中相同，相减时完美抵消。"
      }
    },
    {
      "id": "safe_rlhf",
      "num": 15,
      "name": "Safe RLHF",
      "fullName": "安全RLHF (Safe Reinforcement Learning from Human Feedback)",
      "year": "2024",
      "org": "PKU",
      "parent": "dpo",
      "paperUrl": "https://proceedings.iclr.cc/paper_files/paper/2024/hash/dd1577afd396928ed64216f3f1fd5556-Abstract-Conference.html",
      "projectUrl": "",
      "category": "alignment",
      "motivation": "安全约束平衡有用与安全",
      "summary": "Safe RLHF 的核心目标是：安全约束平衡有用与安全。",
      "keyPoints": [
        "核心动机：安全约束平衡有用与安全",
        "演化来源：继承或改进自 dpo",
        "代表机构：PKU"
      ],
      "detail": "<p>安全约束平衡有用与安全</p>"
    },
    {
      "id": "mart",
      "num": 16,
      "name": "MART",
      "fullName": "多轮自动红队 (Multi-round Automatic Red-Teaming)",
      "year": "2024",
      "org": "Academic",
      "parent": "—",
      "paperUrl": "https://aclanthology.org/2024.naacl-long.107/",
      "projectUrl": "",
      "category": "alignment",
      "motivation": "自动化多轮红队对抗测试",
      "summary": "MART 的核心目标是：自动化多轮红队对抗测试。",
      "keyPoints": [
        "核心动机：自动化多轮红队对抗测试",
        "代表机构：Academic"
      ],
      "detail": "<p>自动化多轮红队对抗测试</p>"
    },
    {
      "id": "toxigen",
      "num": 17,
      "name": "ToxiGen",
      "fullName": "ToxiGen数据集 (ToxiGen Dataset)",
      "year": "2022",
      "org": "Microsoft",
      "parent": "—",
      "paperUrl": "https://aclanthology.org/2022.acl-long.234/",
      "projectUrl": "",
      "category": "content_safety",
      "motivation": "隐性毒性检测数据集",
      "summary": "ToxiGen 的核心目标是：隐性毒性检测数据集。",
      "keyPoints": [
        "核心动机：隐性毒性检测数据集",
        "代表机构：Microsoft"
      ],
      "detail": "<p>隐性毒性检测数据集</p>"
    },
    {
      "id": "nemo_guard",
      "num": 18,
      "name": "NeMo Guardrails",
      "fullName": "NeMo护栏 (NeMo Guardrails)",
      "year": "2023",
      "org": "NVIDIA",
      "parent": "—",
      "paperUrl": "https://www.nvidia.com/en-us/about-nvidia/press-releases/2023/nvidia-nemo-guardrails-open-source-software-to-help-developers-guide-ai-chatbots/",
      "projectUrl": "",
      "category": "content_safety",
      "motivation": "对话边界定义框架",
      "summary": "NeMo Guardrails 的核心目标是：对话边界定义框架。",
      "keyPoints": [
        "核心动机：对话边界定义框架",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>对话边界定义框架</p>"
    },
    {
      "id": "llama_guard3",
      "num": 19,
      "name": "Llama Guard 3",
      "fullName": "Llama Guard 3",
      "year": "2024",
      "org": "Meta",
      "parent": "llama_guard",
      "paperUrl": "https://arxiv.org/abs/2312.06674",
      "projectUrl": "",
      "category": "content_safety",
      "motivation": "多模态安全过滤分类",
      "summary": "Llama Guard 3 的核心目标是：多模态安全过滤分类。",
      "keyPoints": [
        "核心动机：多模态安全过滤分类",
        "演化来源：继承或改进自 llama_guard",
        "代表机构：Meta"
      ],
      "detail": "<p><img alt=\"Llama Guard 3 Vision 框架图\" src=\"https://arxiv.org/html/2411.10414v1/extracted/6003144/figures/llama_guard_3_11B_vision_figure.png\" /></p>\n<p>图源：Meta 的 Llama Guard 3 Vision 公开论文页面。manifest 中的 <code>paper_url</code> 指向 Llama Guard 系列早期论文；多模态 Llama Guard 3 Vision 的公开页面用于补足图示和方法细节。</p>\n<pre><code class=\"language-text\">Algorithm: Llama Guard 3 style multimodal safety classification\nInput:\n  taxonomy T, safety policy P\n  conversation C = [(role_i, text_i, optional image_i)]\n  mode in {prompt_classification, response_classification}\nOutput:\n  label in {safe, unsafe}, violated_categories\n\n1. Serialize P and T as natural-language safety instructions.\n2. Select the target span:\n   - prompt mode: user multimodal message\n   - response mode: assistant response under the same context\n3. Render text turns and image tokens into the vision-language model input.\n4. Generate a compact classification answer:\n   first token: safe or unsafe\n   following tokens: category ids when unsafe\n5. Optionally calibrate with token probabilities or deployment threshold.\n6. If unsafe, block, route to review, or ask the application model to refuse.\n</code></pre>\n<p>Llama Guard 3 的核心不是给每个风险类别单独训练一个传统分类器，而是把安全规范写进模型输入，让模型按“阅读政策后判案”的方式输出标签。这样做的好处是策略文本可以较自然地表达复杂边界，例如同样出现武器、医学或自残词汇时，教育、新闻、紧急求助和明确执行伤害之间需要不同判定。</p>\n<p>多模态版本把图像也纳入判别。prompt classification 关注用户是否正在用图片和文字组合提出危险请求；response classification 则关注助手最终回复是否真的泄露了危险步骤、隐私或其他受限内容。论文的一个重要经验是，输入端过滤对对抗扰动更敏感，因为攻击者只要让守卫误判请求为安全即可；输出端过滤要看到模型实际说了什么，通常更贴近最终风险。</p>\n<p>训练数据采用人工与合成混合构建。公开论文描述了 prompt-image 对和 prompt-response-image 样本两条数据线，并用统一 taxonomy 标注安全类别。监督微调让模型学习生成 <code>safe</code>、<code>unsafe</code> 与类别编号，而不是输出长篇解释，这降低了部署解析成本，也便于与网关、日志和审计系统集成。</p>\n<p>从系统设计看，Llama Guard 3 更适合作为“安全网关中的一个判别节点”，而不是唯一防线。实际部署通常还需要上游策略路由、下游人工复核、敏感场景白名单以及异常日志分析。尤其在多语言、多图、视频或领域专有内容中，需要重新评估阈值和错误类型。</p>"
    },
    {
      "id": "perspective",
      "num": 20,
      "name": "Perspective API",
      "fullName": "Perspective API",
      "year": "2017",
      "org": "Google",
      "parent": "—",
      "paperUrl": "https://www.perspectiveapi.com/",
      "projectUrl": "",
      "category": "content_safety",
      "motivation": "机器学习毒性评分",
      "summary": "Perspective API 的核心目标是：机器学习毒性评分。",
      "keyPoints": [
        "核心动机：机器学习毒性评分",
        "代表机构：Google"
      ],
      "detail": "<p><img alt=\"Perspective 模型卡评估图\" src=\"https://raw.githubusercontent.com/conversationai/perspectiveapi/main/model-cards/auc_wipd.png\" /></p>\n<p>图源：Perspective API 官方 GitHub model cards，用于展示模型评估和公平性相关分析。</p>\n<pre><code class=\"language-text\">Algorithm: Perspective style moderation scoring\nInput:\n  text comment x\n  requested attributes A = {TOXICITY, INSULT, THREAT, ...}\n  moderation policy thresholds tau_a\nOutput:\n  scores s_a and product action\n\n1. Normalize and tokenize x according to the deployed text model.\n2. For each attribute a in A:\n     compute score s_a = model_a(x), where s_a is in [0, 1].\n3. Return API response with summaryScore for each attribute.\n4. Product layer applies rules:\n     if s_THREAT &gt; tau_THREAT: send to urgent review\n     else if s_TOXICITY &gt; tau_hide: collapse or queue\n     else if s_TOXICITY &gt; tau_warn: show author warning\n     else: publish normally\n5. Store feedback and moderation outcomes for later calibration.\n</code></pre>\n<p>Perspective 的方法可以理解为“属性化内容评分”。它不直接回答“这条评论是否应该删除”，而是回答“这条评论像不像某类不良内容”。这种拆分让同一个模型服务能够支持不同社区：新闻评论区可能选择更高的删除阈值，游戏聊天可能更重视实时限流，教育产品则可能把高分内容优先送人工复核。</p>\n<p>模型训练依赖大量带有人类标注的评论样本。对于每个属性，标注者判断文本是否包含攻击、侮辱、威胁或其他模式，分类模型学习从文本特征到属性分数的映射。生产系统通常还会提供反馈接口，让平台把误报、漏报和人工处置结果回流到评估和后续模型迭代中。</p>\n<p>阈值是 Perspective 落地的关键。较低阈值能捕获更多问题评论，但会增加误伤，尤其是身份词、引用脏话、讨论歧视议题或受害者自述时；较高阈值更保守，但可能放过隐晦攻击。成熟部署会分属性设置阈值，并把“隐藏”“折叠”“提示作者修改”“人工审核”拆成不同动作。</p>\n<p>从 LLM 安全角度看，Perspective 代表了早期但仍实用的“外部文本风险评分器”范式。它不能理解完整多轮对话意图，也不适合判断复杂越狱链条；但在日志清洗、用户生成内容预筛、开放评论风险热度监控等环节，仍是很典型的轻量安全组件。</p>"
    },
    {
      "id": "hmns",
      "num": 21,
      "name": "HMNS",
      "fullName": "头掩蔽零空间引导 (Head-Masked Nullspace Steering)",
      "year": "2026.04",
      "org": "ICLR",
      "parent": "pair",
      "paperUrl": "https://iclr.cc/virtual/2026/papers.html",
      "projectUrl": "",
      "category": "jailbreak",
      "motivation": "掩蔽安全头电路高成功率越狱",
      "summary": "HMNS 的核心目标是：掩蔽安全头电路高成功率越狱。",
      "keyPoints": [
        "核心动机：掩蔽安全头电路高成功率越狱",
        "演化来源：继承或改进自 pair",
        "代表机构：ICLR"
      ],
      "detail": "<p><img alt=\"HMNS 方法总览\" src=\"https://arxiv.org/html/2604.10326v1/2604.10326v1/HMNS_image.jpg\" /></p>\n<p>图源：<code>Jailbreaking the Matrix: Nullspace Steering for Controlled Model Subversion</code> 公开论文页面。</p>\n<pre><code class=\"language-text\">Algorithm: Head-Masked Nullspace Steering\nInput:\n  aligned model M with L layers and H attention heads\n  calibration prompts D_safe, D_refusal\n  intervention budget K, attempts T\nOutput:\n  controlled generation trace for safety evaluation\n\n1. For each layer l and head h:\n     ablate or mask head h on calibration prompts.\n     measure output distribution shift, e.g. KL(p_base || p_ablated).\n2. Select top-K heads S_l that most affect refusal/default behavior.\n3. For each affected layer l:\n     build head write matrix M_l = [W^O_{l,h}: h in S_l].\n     compute a unit vector u_l in the nullspace of M_l^T.\n4. For attempt t = 1..T:\n     set alpha_t = lambda * (1 + 0.1 * (t - 1)).\n     during generation, add delta_l = alpha_t * RMS(a_l) * u_l.\n     decode with fixed sampling policy.\n     if the safety evaluator marks the run successful, stop.\n5. Record heads, perturbation norms, and generation outcome.\n</code></pre>\n<p>HMNS 的核心数学约束是让干预方向落在被屏蔽安全头写入子空间的正交补中。若 <code>M_l</code> 表示若干安全头的输出投影矩阵，方法寻找 <code>u_l</code> 使 <code>M_l^T u_l ≈ 0</code>，再把 <code>δ_l = α RMS(a_l) u_l</code> 加到残差流。这样做的直觉是：不直接沿着已经被安全头控制的方向硬推，而是在这些方向“看不见”的空间里改变后续计算。</p>\n<p>定位安全头时，论文使用类似因果追踪的思路：比较原模型和消融某个 head 后的输出分布，KL 变化越大，说明该 head 对当前安全行为越关键。与纯梯度后缀攻击不同，这一步依赖模型内部结构，因而攻击能力更强但威胁模型也更苛刻，需要白盒访问权。</p>\n<p>闭环部分让 HMNS 不只是一次性向量注入。若某轮仍出现拒答，算法会继续尝试并调节扰动强度，有时还会重估相关电路。这个设计说明机制级安全并非静态开关：同一模型在不同 prompt、不同层、不同采样设置下，拒答电路可能有变化。</p>\n<p>从防御角度，HMNS 的价值在于暴露“安全行为局部化”的风险。如果安全对齐主要由少量头或少量方向承担，攻击者一旦获得权重和推理控制，就可能绕开这些局部机制。更稳健的方案应让安全约束分布到更多层、更多头和训练目标中，并对推理时激活篡改做完整性检查。</p>"
    },
    {
      "id": "neurostrike",
      "num": 22,
      "name": "NeuroStrike",
      "fullName": "神经元级攻击 (NeuroStrike: Neuron-Level Attacks)",
      "year": "2026.02",
      "org": "NDSS",
      "parent": "gcg",
      "paperUrl": "https://www.ndss-symposium.org/ndss-paper/neurostrike-neuron-level-attacks-on-aligned-llms/",
      "projectUrl": "",
      "category": "jailbreak",
      "motivation": "剪枝安全神经元绕过对齐",
      "summary": "NeuroStrike 的核心目标是：剪枝安全神经元绕过对齐。",
      "keyPoints": [
        "核心动机：剪枝安全神经元绕过对齐",
        "演化来源：继承或改进自 gcg",
        "代表机构：NDSS"
      ],
      "detail": "<p><img alt=\"NeuroStrike 框架图\" src=\"https://arxiv.org/html/2509.11864v1/x1.png\" /></p>\n<p>图源：NeuroStrike 公开论文页面；manifest 中的 NDSS 页面作为正式论文入口。</p>\n<pre><code class=\"language-text\">Algorithm: NeuroStrike-style safety neuron analysis\nInput:\n  aligned model M\n  benign set B, safety-sensitive set S\n  neuron score threshold z\nOutput:\n  ranked safety neuron set N_safe and evaluation report\n\n1. Run M on B and S, collecting MLP neuron activations by layer.\n2. For each neuron n:\n     compute mean activation on S and B.\n     compute normalized difference score, e.g. z-score(n).\n3. Select N_safe = {n | z-score(n) &gt; z}.\n4. White-box evaluation:\n     apply an inference-time mask to selected neurons.\n     measure refusal rate, harmful compliance rate, and utility.\n5. Transfer study:\n     compare selected neuron patterns across related models.\n     train or evaluate prompt generators against surrogate models.\n6. Report attack success and utility degradation under controlled benchmarks.\n</code></pre>\n<p>NeuroStrike 的技术重点是把“安全对齐”落到神经元粒度观察。对齐训练会让模型学会在某些输入上拒答、规避或改写回答，这些行为可以在 MLP 激活中留下统计差异。通过比较安全敏感样本和普通样本的激活均值，研究者能够给每个神经元打分，找出对拒答行为贡献突出的候选集合。</p>\n<p>白盒版本的攻击在推理阶段屏蔽这些候选神经元，相当于做局部功能剪枝。论文报告这类干预可以只影响很小比例的神经元，却显著改变安全行为，这说明至少在某些模型和训练设置中，安全特征存在可定位的稀疏载体。对防御者而言，这既是可解释性线索，也是完整性风险。</p>\n<p>黑盒版本更强调迁移性。攻击者无法直接改闭源模型权重时，可以在开源同族或相近模型上找安全神经元规律，再利用这些规律训练提示生成器或选择攻击策略。它不是证明闭源权重被直接剪枝，而是证明“安全机制的可迁移弱点”可能通过替代模型被利用。</p>\n<p>防御上，最直接的结论是不要让安全能力只依赖少数可剪枝单元。可以通过多任务安全训练、跨层正则、随机化冗余安全表征、推理时激活范围检测、模型文件签名和可信执行环境来降低风险。评测也不应只看正常推理，还应包含结构扰动和局部屏蔽压力测试。</p>"
    },
    {
      "id": "proact",
      "num": 23,
      "name": "ProAct",
      "fullName": "主动防御 (ProAct: Jailbreaking Jailbreaks)",
      "year": "2026.03",
      "org": "ICLR",
      "parent": "pair",
      "paperUrl": "https://openreview.net/forum?id=AUZIYQGAoAb",
      "projectUrl": "",
      "category": "jailbreak",
      "motivation": "伪造响应误导攻击智能体",
      "summary": "ProAct 的核心目标是：伪造响应误导攻击智能体。",
      "keyPoints": [
        "核心动机：伪造响应误导攻击智能体",
        "演化来源：继承或改进自 pair",
        "代表机构：ICLR"
      ],
      "detail": "<p><img alt=\"ProAct 公开论文页面\" src=\"https://openreview.net/pdf?id=AUZIYQGAoAb\" /></p>\n<p>图源：OpenReview 公开论文 PDF。该链接用于定位论文中的框架图和方法说明。</p>\n<pre><code class=\"language-text\">Algorithm: ProAct-style defense against iterative jailbreak agents\nInput:\n  target model M\n  incoming prompt p_t\n  attack detector D\n  proactive response generator G\n  normal safety policy P\nOutput:\n  response r_t to the client or attacking loop\n\n1. Receive p_t and recent interaction history H.\n2. Estimate whether H belongs to an automated jailbreak optimization loop:\n     attack_score = D(H, p_t).\n3. If attack_score is below threshold:\n     return M(p_t) under normal safety policy P.\n4. Otherwise:\n     infer which feedback signal the attacker is optimizing.\n     construct r_decoy = G(H, p_t), a response that distorts the reward signal.\n5. Return r_decoy to the attack loop.\n6. Continue monitoring whether the attacker drifts, stops, or escalates.\n</code></pre>\n<p>PAIR 类攻击的基本结构是闭环优化：攻击模型提出一个候选 prompt，目标模型给出回复，评估器判断是否成功，攻击模型再根据评估结果改写下一轮 prompt。ProAct 的切入点是第三步以前的反馈链路。只要能让攻击器相信错误的候选方向有效或无效，它的搜索轨迹就会偏离真正的漏洞区域。</p>\n<p>这种思路和传统内容过滤不同。传统过滤器通常在目标模型输出后判断是否违规；ProAct 则把“攻击者也在学习”当作威胁模型的一部分，主动改变攻击者看到的数据分布。对自动化智能体来说，反馈就是训练信号；反馈被污染后，后续 prompt 生成也会被污染。</p>\n<p>ProAct 的实现需要两个模块：攻击循环识别器和诱饵响应生成器。识别器可以利用多轮相似度、显式评分话术、攻击模板痕迹、异常重试频率等信号；生成器则要保证诱饵内容本身不泄露受限信息，同时足以影响攻击器或 judge 的判断。这使它更像“主动欺骗式防御”，而不是普通拒答。</p>\n<p>安全边界也很清楚：ProAct 不能替代底层安全对齐。若攻击者不依赖自动 judge，或者把每轮结果交给真人分析，伪造反馈的收益会变小。实际部署时，它更适合与 Llama Guard、输出过滤、速率限制、账号风控和异常会话聚类共同使用。</p>"
    },
    {
      "id": "aligntree",
      "num": 24,
      "name": "AlignTree",
      "fullName": "对齐树 (AlignTree: Efficient Defense)",
      "year": "2026.01",
      "org": "AAAI",
      "parent": "llama_guard3",
      "paperUrl": "https://doi.org/10.1609/aaai.v40i44.41074",
      "projectUrl": "",
      "category": "jailbreak",
      "motivation": "随机森林实时激活拦截",
      "summary": "AlignTree 的核心目标是：随机森林实时激活拦截。",
      "keyPoints": [
        "核心动机：随机森林实时激活拦截",
        "演化来源：继承或改进自 llama_guard3",
        "代表机构：AAAI"
      ],
      "detail": "<p><img alt=\"AlignTree 框架图\" src=\"https://arxiv.org/html/2511.12217v1/x1.png\" /></p>\n<p>图源：AlignTree 公开论文页面；manifest 中 DOI 页面作为条目元信息保留。</p>\n<pre><code class=\"language-text\">Algorithm: AlignTree inference-time defense\nInput:\n  aligned model M\n  training prompts D_safe, D_unsafe\n  layers L*, token positions I*\n  risk threshold tau\nOutput:\n  generation with online safety intervention\n\nTraining:\n1. Run M on D_safe and D_unsafe, collect hidden states x_i^(l).\n2. Compute a refusal or safety direction r* from class-conditional means.\n3. For selected layers and positions:\n     compute linear score s_linear = &lt;x_i^(l), r*&gt; / ||r*||.\n     train RBF-SVM to capture nonlinear harmful features.\n4. Train a Random Forest on concatenated linear and SVM scores.\n\nInference:\n5. During generation, collect current hidden states.\n6. Build the same feature vector.\n7. risk = RandomForest.predict_proba(features).\n8. If risk &gt; tau, interrupt or redirect generation; otherwise continue.\n</code></pre>\n<p>AlignTree 的第一类信号来自“拒答方向”。这类方法假设安全拒答和不安全顺从在隐藏空间中存在可分方向，可以用两类样本均值差近似。对某层激活 <code>x_i^(l)</code>，投影分数 <code>s = &lt;x_i^(l), r*&gt; / ||r*||</code> 表示当前生成状态更接近拒答侧还是顺从侧。</p>\n<p>第二类信号由 SVM 捕获。线性方向对简单分界有效，但越狱行为可能表现为非线性组合，例如某些层的特征单独看不异常，组合起来才危险。RBF-SVM 为每层或关键 token 位置提供一个非线性风险分数，补足单一方向投影的表达能力。</p>\n<p>最终随机森林把多个浅层信号合成一个稳定判别器。随机森林适合这里的原因是训练快、推理便宜、对特征尺度不太敏感，并能提供特征重要性。相比再部署一个大模型 guard，它的运行成本低得多，适合在每个生成步骤附近做在线判断。</p>\n<p>从产品角度，AlignTree 的防御动作可以比“封禁整条请求”更细。系统可以在风险升高时提前终止当前生成，改写为安全拒答，或者将会话转入更严格的 guard pipeline。这种内部激活防御也有局限：它需要白盒访问目标模型，且对模型版本、层结构和微调方式比较敏感。</p>"
    },
    {
      "id": "jbfuzz",
      "num": 25,
      "name": "JBFuzz",
      "fullName": "LLM模糊测试框架 (JBFuzz: LLM Fuzzing Framework)",
      "year": "2026.03",
      "org": "RedTeams",
      "parent": "—",
      "paperUrl": "https://redteams.ai/blog/jbfuzz-99-percent-success",
      "projectUrl": "",
      "category": "jailbreak",
      "motivation": "模糊测试自动化越狱框架",
      "summary": "JBFuzz 的核心目标是：模糊测试自动化越狱框架。",
      "keyPoints": [
        "核心动机：模糊测试自动化越狱框架",
        "代表机构：RedTeams"
      ],
      "detail": "<p><img alt=\"JBFuzz 框架图\" src=\"https://arxiv.org/html/2503.08990v1/x1.png\" /></p>\n<p>图源：JBFuzz 公开论文页面；manifest 中博客链接是对应公开介绍入口。</p>\n<pre><code class=\"language-text\">Algorithm: JBFuzz-style LLM fuzzing loop\nInput:\n  target model API M\n  seed prompt templates S\n  mutation operator Mutate\n  lightweight evaluator Eval\n  selection policy Select\n  query budget B\nOutput:\n  successful test cases and coverage statistics\n\n1. Initialize corpus C = S with weights or scores.\n2. For step = 1..B:\n     seed = Select(C)\n     candidate = Mutate(seed)\n     response = M(candidate)\n     score = Eval(candidate, response)\n     if score indicates policy violation:\n         save candidate and response as a finding.\n         add candidate to C with higher priority.\n     else if candidate explores a novel region:\n         add candidate to C with neutral or low priority.\n     update selection weights from observed outcomes.\n3. Deduplicate findings and report ASR, queries, time, and examples for review.\n</code></pre>\n<p>JBFuzz 的关键抽象来自传统 fuzzing：不试图一次构造完美攻击，而是持续变异输入并用反馈保留有价值样本。对 LLM 来说，输入空间是自然语言，变异不能像二进制 fuzzing 那样随意翻 bit，因此论文使用更语义保持的同义替换和模板扰动，让候选仍然可被模型理解。</p>\n<p>选择策略决定测试预算花在哪里。随机选择简单但浪费；加权随机、UCB 或 EXP3 会把更多查询分配给历史上更容易产生发现的模板，同时仍保留探索新模板的概率。这个设计让 JBFuzz 不只是批量 prompt 列表，而是一个带反馈的搜索系统。</p>\n<p>轻量评估器是效率核心。若每个候选都调用 GPT-4 级 judge，成本和延迟会限制 fuzzing 规模。JBFuzz 使用 embedding 加分类器的方式近似判断回复是否违规，再把高风险发现交给更严格复核。这样可以把大量低价值候选快速筛掉。</p>\n<p>在防御工作流里，JBFuzz 更适合作为“持续压力测试工具”。它产生的发现应进入人工归因、策略修订和模型回归测试，而不是直接当作真实用户攻击统计。为了避免扩散风险，报告中应脱敏或抽象化具体攻击文本，只保留可复现的内部测试编号和安全标签。</p>"
    },
    {
      "id": "jbf",
      "num": 26,
      "name": "JBF",
      "fullName": "越狱铸造厂 (Jailbreak Foundry)",
      "year": "2026.03",
      "org": "arXiv",
      "parent": "jbfuzz",
      "paperUrl": "https://arxiv.org/abs/2603.05001",
      "projectUrl": "",
      "category": "jailbreak",
      "motivation": "论文自动转化攻击模块",
      "summary": "JBF 的核心目标是：论文自动转化攻击模块。",
      "keyPoints": [
        "核心动机：论文自动转化攻击模块",
        "演化来源：继承或改进自 jbfuzz",
        "代表机构：arXiv"
      ],
      "detail": "<p><img alt=\"Jailbreak Foundry 架构图\" src=\"https://raw.githubusercontent.com/OpenSQZ/Jailbreak-Foundry/main/images/jbf_architecture.jpg\" /></p>\n<p>图源：Jailbreak Foundry 官方 GitHub 仓库。manifest 中 arXiv URL 保持为输入元信息；公开仓库和论文用于补足方法细节。</p>\n<pre><code class=\"language-text\">Algorithm: Jailbreak Foundry paper-to-module workflow\nInput:\n  paper P, optional official code R\n  JBF attack interface contract C\n  benchmark suite E\nOutput:\n  runnable attack module A and reproducibility report\n\n1. Planner reads P and extracts:\n     threat model, prompt construction, optimization loop,\n     hyperparameters, stopping criteria, and judge assumptions.\n2. If R exists, map official implementation to JBF abstractions.\n3. Coder implements A with standard methods:\n     initialize(), generate_attack(), query_target(), update(), finalize().\n4. Auditor checks that A matches P and C:\n     required parameters, deterministic seeds, logging, and failure handling.\n5. Run A on E with fixed victim models and safety evaluator.\n6. Report ASR, query cost, runtime, reproduced gaps, and deviations from paper.\n</code></pre>\n<p>JBF 的核心问题是 jailbreak 研究的可复现性。许多论文都有自己的 prompt 格式、目标模型版本、过滤器、成功判据和后处理逻辑，导致 ASR 不能直接横向比较。JBF-LIB 通过统一攻击生命周期接口，把这些差异压到模块内部，让外部评测器以一致方式调度。</p>\n<p>JBF-FORGE 关注从论文到代码的转化。规划器先把自然语言方法拆成结构化计划，例如是否需要优化循环、是否依赖 judge、是否有种子库、是否需要多轮目标模型调用。编码器再把计划落到框架接口中，审计器检查遗漏和不一致。这降低了安全团队复现新论文的手工成本。</p>\n<p>JBF-EVAL 解决评测口径问题。它固定数据集、victim model、judge、预算和日志格式，使“某攻击在某模型上成功”变成可追踪实验记录。对于防御者，统一基准比单篇论文数字更有价值，因为它能揭示哪些攻击只在原设定有效，哪些攻击跨模型稳定。</p>\n<p>需要注意，JBF 不是鼓励公开扩散攻击细节的产品工具，而是面向受控红队和研究复现的框架。实际组织内部使用时，应对攻击模块、日志样本和成功 prompt 做访问控制，并把复现结果接入修复流程，而不是仅仅追求更高 ASR。</p>"
    },
    {
      "id": "probe",
      "num": 27,
      "name": "PROBE",
      "fullName": "过程化基准 (PROcess-Based BEnchmark)",
      "year": "2026.01",
      "org": "EACL",
      "parent": "selfcheckgpt",
      "paperUrl": "https://openreview.net/forum?id=GleVekx5ut",
      "projectUrl": "",
      "category": "hallucination",
      "motivation": "过程化分解幻觉检测步骤",
      "summary": "PROBE 的核心目标是：过程化分解幻觉检测步骤。",
      "keyPoints": [
        "核心动机：过程化分解幻觉检测步骤",
        "演化来源：继承或改进自 selfcheckgpt",
        "代表机构：EACL"
      ],
      "detail": "<p><img alt=\"PROBE 公开论文页面\" src=\"https://openreview.net/pdf?id=GleVekx5ut\" /></p>\n<p>图源：OpenReview 公开论文 PDF。若 PDF 中包含框架图，可从该页面定位原始图示。</p>\n<pre><code class=\"language-text\">Algorithm: PROBE-style process-based hallucination detection\nInput:\n  question q\n  model answer y\n  evidence corpus C\n  process labels or evaluators E\nOutput:\n  final hallucination score and per-step diagnosis\n\n1. Decompose y into atomic factual claims c_1..c_n.\n2. For each claim c_i:\n     retrieve candidate evidence passages e_i from C.\n     classify relation r_i in {supported, contradicted, not_enough_info}.\n     record confidence and evidence provenance.\n3. Aggregate claim-level labels:\n     hallucination_score = weighted fraction of contradicted or unsupported claims.\n4. Evaluate intermediate steps separately:\n     claim segmentation quality,\n     retrieval recall,\n     entailment accuracy,\n     final aggregation accuracy.\n5. Return final label and an error trace for model or pipeline debugging.\n</code></pre>\n<p>PROBE 的基本动机是：一个幻觉检测系统由多个子问题组成。如果最终判断错了，可能是没有把答案拆成正确的事实单元，可能是证据没找全，也可能是 NLI 判定器误把相关证据当成支持。只给最终 accuracy 会掩盖这些错误来源，导致研究者难以改进系统。</p>\n<p>过程化分解使 benchmark 更像调试器。对每个 atomic claim，系统需要给出证据和支持关系；这样就可以分别计算 claim extraction、retrieval 和 verification 的指标。一个检测器即使最终 F1 高，也可能依赖脆弱捷径；PROBE 的分步标签能揭示这种情况。</p>\n<p>与 SelfCheckGPT 相比，PROBE 不只看同一模型多次采样之间是否自相矛盾。自一致性适合无外部知识时的弱监督信号，但它无法判断模型一致地编造事实的情况。PROBE 引入证据和过程标签后，更适合知识密集型问答和 RAG 场景。</p>\n<p>在工程部署中，PROBE 式评测能指导组件优先级。例如如果错误主要来自 retrieval recall，应该改索引、切分和召回；如果错误主要来自 entailment，应该换 judge 或加入领域规则；如果错误来自 aggregation，则需要更细的 claim 权重和不确定性处理。</p>"
    },
    {
      "id": "kghalubench",
      "num": 28,
      "name": "KGHaluBench",
      "fullName": "知识图谱幻觉基准 (Knowledge Graph Hallucination Benchmark)",
      "year": "2026",
      "org": "EACL",
      "parent": "factscore",
      "paperUrl": "https://aclanthology.org/2026.findings-acl.1/",
      "projectUrl": "",
      "category": "hallucination",
      "motivation": "知识图谱自动化验证",
      "summary": "KGHaluBench 的核心目标是：知识图谱自动化验证。",
      "keyPoints": [
        "核心动机：知识图谱自动化验证",
        "演化来源：继承或改进自 factscore",
        "代表机构：EACL"
      ],
      "detail": "<p><img alt=\"KGHaluBench 框架图\" src=\"https://arxiv.org/html/2602.19643v1/Figures/KGHaluBench_Framework6.png\" /></p>\n<p>图源：KGHaluBench 公开论文页面；manifest 中 ACL 页面作为条目元信息保留。</p>\n<pre><code class=\"language-text\">Algorithm: KGHaluBench question generation and verification\nInput:\n  knowledge graph G = (E, R, F)\n  entity sampling policy pi\n  target LLM M\n  verifier V\nOutput:\n  weighted accuracy and hallucination metrics\n\n1. Sample entity e and relations or attributes from G.\n2. Estimate difficulty from entity popularity and graph statistics.\n3. Generate a natural-language question q whose answer is grounded in G.\n4. Query target model: y = M(q).\n5. If y is an abstention:\n     score as abstained, not hallucinated.\n6. Run entity-level verification:\n     check whether required entities appear or are semantically matched.\n7. Run fact-level verification:\n     decompose y into facts and test support against KG-derived evidence.\n8. Aggregate results with difficulty weights:\n     report weighted accuracy, hallucination rate, and abstention behavior.\n</code></pre>\n<p>KGHaluBench 的生成侧依赖知识图谱的结构化优势。图谱中实体、关系和属性天然给出可验证事实，因此可以系统性地产生问题，而不是手工收集零散问答。通过控制实体流行度、关系数量和问题组合，benchmark 能覆盖热门知识与长尾知识。</p>\n<p>验证侧分两层。实体级过滤先判断回答是否提到了正确实体，避免后续事实验证被明显错位的对象污染；事实级验证再判断具体断言是否被图谱或图谱派生证据支持。公开论文还描述了用 NLI 模型、小型 LLM 和少量专家判定组合的流水线，以平衡速度与可靠性。</p>\n<p>难度加权是 KGHaluBench 区别于普通事实问答基准的重要点。热门实体更容易被模型记住，简单平均会高估模型真实知识覆盖。将实体流行度和图谱统计纳入权重后，长尾问题对指标的贡献更合理，能更好反映模型在知识广度和深度上的可靠性。</p>\n<p>它与 FactScore 的关系在于都强调事实单元级评估，但 KGHaluBench 更依赖知识图谱自动构造问题和证据。FactScore 常用于长文本生成事实分解，KGHaluBench 则更像一个受控知识压力测试平台，可以系统追踪哪些实体族、关系类型和难度区间最容易触发幻觉。</p>"
    },
    {
      "id": "abse",
      "num": 29,
      "name": "ABSE",
      "fullName": "自适应贝叶斯语义熵 (Adaptive Bayesian Semantic Entropy)",
      "year": "2026.01",
      "org": "AAAI",
      "parent": "rag",
      "paperUrl": "https://doi.org/10.1609/aaai.v40i44.41074",
      "projectUrl": "",
      "category": "hallucination",
      "motivation": "自适应语义熵平衡精度效率",
      "summary": "ABSE 的核心目标是：自适应语义熵平衡精度效率。",
      "keyPoints": [
        "核心动机：自适应语义熵平衡精度效率",
        "演化来源：继承或改进自 rag",
        "代表机构：AAAI"
      ],
      "detail": "<p><img alt=\"ABSE 方法示意图\" src=\"https://arxiv.org/html/2603.22812v1/2603.22812v1/figures/teaser-1.png\" /></p>\n<p>图源：<code>Efficient Hallucination Detection: Adaptive Bayesian Estimation of Semantic Entropy with Guided Semantic Exploration</code> 公开论文页面。</p>\n<pre><code class=\"language-text\">Algorithm: Adaptive Bayesian Semantic Entropy\nInput:\n  prompt x, generator M\n  semantic equivalence classifier C\n  variance threshold tau\n  max sample budget B\nOutput:\n  estimated semantic entropy H and hallucination decision\n\n1. Initialize a Dirichlet-style posterior over semantic clusters.\n2. For n = 1..B:\n     sample answer y_n from M(x), or guided variant y'_n.\n     assign y_n to semantic cluster c_n using C.\n     update posterior counts, with importance weight if guided.\n     estimate cluster probabilities p(c | x).\n     compute semantic entropy H = - sum_c p(c | x) log p(c | x).\n     compute posterior variance Var(H).\n     if Var(H) &lt; tau:\n         break.\n3. Return H and flag hallucination if H exceeds deployment threshold.\n</code></pre>\n<p>语义熵的直觉是：如果模型真正知道答案，多次采样虽然措辞不同，但语义应集中在少数等价类；如果模型不确定，采样会分散到多个互相矛盾的答案簇。ABSE 继承这个思想，但不再固定采样次数，而是估计“当前 entropy 估计有多可靠”。</p>\n<p>贝叶斯部分把每个语义簇的概率当作后验分布，而不是只用频数点估计。每新增一个样本，后验均值会更新，后验方差会下降。当方差已经低于阈值时，继续采样带来的收益很小，算法提前停止；当答案簇仍不稳定时，算法继续投入预算。</p>\n<p>Guided Semantic Exploration 解决另一个问题：普通采样可能长时间重复高概率答案，错过低概率但语义不同的候选。方法在生成过程中选择关键 token 位置，替换为 top-k 替代 token 并继续生成，再用重要性权重校正由引导分布带来的偏差。这样可以更快发现隐藏的语义分歧。</p>\n<p>在 RAG 系统里，ABSE 可以作为“回答置信度后验估计器”。对证据充分、答案稳定的问题，它很快停止；对证据冲突或模型知识不足的问题，它会看到更高语义熵并触发检索增强、拒答或人工复核。实际落地要校准两个阈值：后验方差停止阈值和语义熵风险阈值。</p>"
    },
    {
      "id": "halp",
      "num": 30,
      "name": "HALP",
      "fullName": "VLM探测 (HALP: VLM Probing)",
      "year": "2026",
      "org": "EACL",
      "parent": "truthfulqa",
      "paperUrl": "https://aclanthology.org/2026.findings-acl.1/",
      "projectUrl": "",
      "category": "hallucination",
      "motivation": "内部表示预测幻觉风险",
      "summary": "HALP 提出了一种轻量级探测框架，通过在视觉语言模型（VLM）生成文本**之前**的单次前向传播中提取三类内部表示（视觉特征、视觉 token 隐状态、查询 token 隐状态），训练 MLP 探针预测幻觉风险，在 8 个主流 VLM 上实现了最高 0.93 AUROC 的幻觉检测性能，且推理开销不足 1%。",
      "keyPoints": [
        "<strong>预生成幻觉检测</strong>：在 VLM 解码生成文本之前，仅通过 prefill 阶段的内部表示即可预测幻觉风险，无需等待完整生成",
        "<strong>三类探测特征</strong>：Visual Features (VF) — 视觉编码器全局池化输出；Vision Token (VT) — 解码器中视觉 token 最后位置的隐状态；Query Token (QT) — 解码器中查询 token 最后位置的隐状态",
        "<strong>轻量 MLP 探针</strong>：3 层 MLP（512→256→128），ReLU 激活，二分类输出幻觉概率分数 <span class=\"kb-math kb-math-inline\">s^j \\in [0,1]</span>",
        "<strong>大规模基准评测</strong>：构建 10,000 样本多模态幻觉检测数据集，覆盖 11 个任务领域、4 种回答格式、7 类幻觉问题",
        "<strong>8 个 VLM 系统评估</strong>：Gemma3-12B、LLaVA-Next-8B、Llama-3.2-11B、Phi4-VL-5.6B、Molmo-7B、Qwen2.5-VL-7B、SmolVLM2-2.2B、FastVLM-7B",
        "<strong>QT 特征一致性最优</strong>：查询 token 表示在 7/8 模型上 AUROC 达 0.90–0.94，平均 0.87，显著优于 VF（0.69）和 VT（0.69）",
        "<strong>层级分析</strong>：QT 性能随解码器深度单调递增，3L/4 层为最优提取点；VT 性能跨层稳定但有限（~0.65–0.70）",
        "<strong>实际部署开销极低</strong>：探针推理仅 10–15ms，相对完整生成开销 &lt;1%"
      ],
      "detail": "<h5>框架总览</h5>\n<p><img alt=\"HALP 框架示意图\" src=\"https://arxiv.org/html/2603.05465v1/x2.png\" />\n<em>图：HALP 从 VLM 的单次前向传播中提取三类内部表示（VF、VT、QT），分别训练探针检测幻觉风险</em></p>\n<p>HALP 的核心思想是：VLM 在生成文本之前的 prefill 阶段，其内部表示已经编码了足够的信息来预测即将发生的幻觉。该框架无需修改模型权重，不依赖生成结果，可在解码前实时评估风险。</p>\n<h5>算法流程</h5>\n<pre><code class=\"language-python\"># HALP 幻觉检测框架伪代码\ndef halp_pipeline(vlm, images, queries, ground_truths):\n    # === 阶段 1: 幻觉标注 (离线) ===\n    for (I, Q, Y) in zip(images, queries, ground_truths):\n        Y_hat = vlm.generate(I, Q)                    # VLM 标准推理\n        b = llm_judge(Y_hat, Y, Q)                     # LLM-as-a-Judge 判断幻觉 {0,1}\n\n    # === 阶段 2: 特征提取 (单次前向传播) ===\n    for (I, Q) in zip(images, queries):\n        # 视觉特征 VF: 视觉编码器输出的全局平均池化\n        u_bar = mean_pool(vision_encoder(I))            # shape: [d_vision]\n\n        # 视觉 token 表示 VT: 解码器第 ℓ 层视觉序列最后位置\n        # 查询 token 表示 QT: 解码器第 ℓ 层查询序列最后位置\n        hidden_states = vlm.prefill(I, Q)               # 仅 prefill，不解码\n        for ℓ in {1, L//4, L//2, 3*L//4, L}:\n            vt[ℓ] = hidden_states[ℓ][last_vision_pos]  # shape: [d_model]\n            qt[ℓ] = hidden_states[ℓ][last_query_pos]   # shape: [d_model]\n\n    # === 阶段 3: 探针训练 ===\n    for feature_type in [VF, VT, QT]:\n        probe = MLP(input_dim, 512, 256, 128, 1)       # 3 层 MLP + sigmoid\n        probe.train(features, labels_b, epochs=50, lr=0.001)\n\n    # === 阶段 4: 推理时幻觉风险评估 ===\n    score = probe(extract_qt(vlm.prefill(I_new, Q_new)))  # 10-15ms\n    if score &gt; threshold:\n        flag_as_high_risk()  # 拒绝回答 / 路由到更强模型\n</code></pre>\n<h5>动机与背景</h5>\n<p>VLM 幻觉（hallucination）是指模型生成与视觉输入不一致的文本内容，包括虚构不存在的物体、错误描述属性/关系、编造事实等。现有幻觉检测方法主要分为两类：</p>\n<ol>\n<li><strong>后生成检测</strong>：需要模型完成整个生成过程后，通过对比参考答案或多次采样一致性来判断，计算开销大且无法实时干预</li>\n<li><strong>生成过程中检测</strong>：利用 token 级别的 logit 不确定性或注意力模式，但仍需部分解码过程</li>\n</ol>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：HALP 发现 VLM 在 prefill 阶段（处理输入但尚未生成任何 token）的内部表示中，已经包含了丰富的幻觉预测信号。这意味着可以在<strong>零生成开销</strong>下评估风险。</div>\n<h5>三类特征的设计原理</h5>\n<p><strong>Visual Features (VF)</strong> 捕获纯视觉感知信号：</p>\n<div class=\"kb-math kb-math-display\">\\bar{\\mathbf{u}} = \\frac{1}{M}\\sum_{i=1}^{M}\\mathbf{u}_i</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{u}_i</span> 是视觉编码器输出的第 <span class=\"kb-math kb-math-inline\">i</span> 个 patch token，<span class=\"kb-math kb-math-inline\">M</span> 为 patch 总数。VF 在多模态投影层之前提取，反映模型对图像的\"纯视觉理解\"。如果视觉编码器本身就无法正确感知图像内容，后续的语言生成必然会产生幻觉。</p>\n<p><strong>Vision Token (VT)</strong> 捕获视觉信息在语言解码器中的融合表示。提取解码器第 <span class=\"kb-math kb-math-inline\">\\ell</span> 层视觉 token 序列最后位置的隐状态，反映视觉信息经过多模态投影和 Transformer 层处理后的状态。</p>\n<p><strong>Query Token (QT)</strong> 捕获完整的多模态推理结果。由于 Transformer 的因果注意力机制，查询序列最后位置的隐状态聚合了所有视觉 token 和文本 token 的信息，是模型即将开始生成时的\"决策状态\"。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：QT 提取的是拼接序列 <span class=\"kb-math kb-math-inline\">(V, Q)</span> 的最后位置，而非仅文本查询的最后位置。这意味着它包含了完整的视觉-文本交互信息。</div>\n<h5>实验结果深入分析</h5>\n<p><strong>主结果（Table 2）</strong> 显示了三类特征在 8 个 VLM 上的 AUROC：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>VF</th>\n<th>VT</th>\n<th>QT</th>\n<th>平均</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Gemma3-12B</td>\n<td>0.674</td>\n<td>0.596</td>\n<td><strong>0.935</strong></td>\n<td>0.735</td>\n</tr>\n<tr>\n<td>Qwen2.5-VL-7B</td>\n<td>0.787</td>\n<td>0.668</td>\n<td><strong>0.915</strong></td>\n<td>0.790</td>\n</tr>\n<tr>\n<td>Llama-3.2-11B</td>\n<td>0.770</td>\n<td>0.738</td>\n<td><strong>0.896</strong></td>\n<td>0.801</td>\n</tr>\n<tr>\n<td>Phi4-VL-5.6B</td>\n<td>0.617</td>\n<td>0.774</td>\n<td><strong>0.903</strong></td>\n<td>0.765</td>\n</tr>\n<tr>\n<td>Molmo-7B</td>\n<td>0.683</td>\n<td>0.687</td>\n<td><strong>0.919</strong></td>\n<td>0.763</td>\n</tr>\n<tr>\n<td>SmolVLM2-2.2B</td>\n<td>0.724</td>\n<td>0.689</td>\n<td><strong>0.901</strong></td>\n<td>0.772</td>\n</tr>\n<tr>\n<td>LLaVA-Next-8B</td>\n<td>0.611</td>\n<td>0.627</td>\n<td><strong>0.903</strong></td>\n<td>0.714</td>\n</tr>\n<tr>\n<td>FastVLM-7B</td>\n<td>0.683</td>\n<td><strong>0.703</strong></td>\n<td>0.614</td>\n<td>0.667</td>\n</tr>\n<tr>\n<td><strong>平均</strong></td>\n<td>0.694</td>\n<td>0.685</td>\n<td><strong>0.873</strong></td>\n<td>0.751</td>\n</tr>\n</tbody>\n</table></div>\n<p>三个关键发现：</p>\n<ol>\n<li><strong>QT 一致性优势</strong>：7/8 模型的 QT AUROC 在 0.90–0.94 之间，说明幻觉信号在多模态推理完成后最为集中</li>\n<li><strong>架构异质性</strong>：Qwen2.5-VL 和 Llama-3.2 的 VF 已达 0.77–0.79（视觉编码器本身信息丰富），而 LLaVA-Next 和 Phi4-VL 的 VF 仅 0.61（更依赖后续融合）</li>\n<li><strong>FastVLM 异常</strong>：唯一 VT &gt; QT 的模型（0.703 vs 0.614），暗示其架构在早期融合阶段就完成了关键推理</li>\n</ol>\n<p><strong>层级分析</strong> 揭示了幻觉信号在解码器中的演化规律：\n- QT 性能随层深单调递增，典型模式如 Gemma3：<span class=\"kb-math kb-math-inline\">0.717 \\to 0.812 \\to 0.925 \\to 0.932 \\to 0.935</span>\n- VT 性能跨层基本稳定（0.65–0.70），说明视觉信息在解码器中的变化有限\n- 最优提取层为 <span class=\"kb-math kb-math-inline\">3L/4</span>，在大多数模型上达到峰值或接近峰值性能</p>\n<h5>与现有方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>后生成方法</th>\n<th>生成中方法</th>\n<th>HALP（预生成）</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>检测时机</td>\n<td>生成完成后</td>\n<td>解码过程中</td>\n<td>prefill 阶段</td>\n</tr>\n<tr>\n<td>计算开销</td>\n<td>高（完整生成+评估）</td>\n<td>中（部分解码）</td>\n<td>极低（&lt;1%）</td>\n</tr>\n<tr>\n<td>干预能力</td>\n<td>无（事后）</td>\n<td>有限</td>\n<td>完全（可拒绝/路由）</td>\n</tr>\n<tr>\n<td>是否需要参考答案</td>\n<td>通常需要</td>\n<td>不需要</td>\n<td>训练时需要，推理时不需要</td>\n</tr>\n</tbody>\n</table></div>\n<h5>实际应用场景</h5>\n<p>HALP 支持两种部署模式：\n- <strong>选择性拒绝</strong>：当探针分数超过阈值时拒绝回答，用安全提示替代。论文在附录中展示了覆盖率-准确率权衡曲线\n- <strong>选择性路由</strong>：高风险输入路由到更强的 VLM 或工具增强管线，低风险输入由基础模型直接处理，平衡延迟与可靠性</p>",
      "quiz": {
        "q": "HALP 框架中，哪种内部表示在大多数 VLM 上提供了最强的幻觉预测能力？",
        "options": [
          "Visual Features (VF) — 视觉编码器的全局池化输出",
          "Vision Token (VT) — 解码器中视觉 token 的隐状态",
          "Query Token (QT) — 解码器中查询 token 最后位置的隐状态",
          "注意力权重矩阵的熵值"
        ],
        "answer": 2,
        "explain": "QT 表示在 7/8 模型上 AUROC 达 0.90–0.94（平均 0.87），因为查询序列最后位置通过因果注意力聚合了完整的视觉-文本交互信息，是最接近生成决策的内部状态。"
      }
    },
    {
      "id": "ast_detect",
      "num": 31,
      "name": "AST-Detect",
      "fullName": "语法树检测 (AST-based Hallucination Detection)",
      "year": "2026.03",
      "org": "WWW",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2403.06448",
      "projectUrl": "",
      "category": "hallucination",
      "motivation": "语法树确定性代码验证",
      "summary": "AST-Detect 的核心目标是：语法树确定性代码验证。",
      "keyPoints": [
        "核心动机：语法树确定性代码验证",
        "代表机构：WWW"
      ],
      "detail": "<p><img alt=\"AST-Detect 框架图\" src=\"https://arxiv.org/html/2601.19106v1/x1.png\" /></p>\n<p>图源：<code>Detecting and Correcting Hallucinations in LLM-Generated Code via Deterministic AST Analysis</code> 公开论文页面。manifest 中 <code>paper_url</code> 保持输入元信息。</p>\n<pre><code class=\"language-text\">Algorithm: AST-based code hallucination detection\nInput:\n  generated Python code c\n  library knowledge base KB from introspection\nOutput:\n  diagnostics and corrected code c'\n\n1. Parse c into AST T.\n2. Traverse T to collect:\n     imports and aliases,\n     defined variables and functions,\n     call sites,\n     attribute accesses,\n     keyword arguments.\n3. For each call node:\n     resolve module or object from imports and aliases.\n     check whether function or method exists in KB.\n     check whether keyword arguments match the true signature.\n4. For identifiers:\n     check whether each name is defined, imported, or built-in.\n5. Emit deterministic diagnostics with AST node locations.\n6. Apply local fixes when unambiguous:\n     add missing import, correct API name, remove invalid keyword.\n7. Re-parse c' and rerun checks.\n</code></pre>\n<p>AST-Detect 的关键是把代码幻觉看作可静态验证的结构冲突。LLM 生成的代码常常语法正确，却引用了不存在的 API 或参数。这类错误不一定需要运行程序才能发现，只要知道目标库真实暴露了哪些符号、签名和参数，就能在 AST 层定位。</p>\n<p>相较字符串匹配，AST 提供了作用域和语法角色。比如同样的 token 可能是变量名、函数名、属性名或字符串内容；AST 能区分这些位置，降低误报。它还可以处理别名导入，例如 <code>import pandas as pd</code> 后把 <code>pd.DataFrame(...)</code> 解析回 pandas 的真实 API。</p>\n<p>知识库由库 introspection 动态生成，避免手写规则快速过期。对 Python 生态而言，可以读取模块成员、函数签名、类方法和默认参数，再把它们组织成可查询表。检测时只需解析代码和查表，因此速度远低于执行测试或调用大模型复审。</p>\n<p>修复阶段采取保守策略。若错误有单一明确修复，例如缺失标准导入或参数名拼写近似，可以自动改写 AST；若存在多个可能意图，则应报告诊断而不是猜测。这个设计保持了高 precision，也符合生产环境对代码自动修改的审慎要求。</p>"
    },
    {
      "id": "safedpo",
      "num": 32,
      "name": "SafeDPO",
      "fullName": "安全DPO (Safe Direct Preference Optimization)",
      "year": "2026.04",
      "org": "ICLR",
      "parent": "dpo",
      "paperUrl": "https://iclr.cc/virtual/2026/oral/23790",
      "projectUrl": "",
      "category": "alignment",
      "motivation": "安全约束集成单阶段对齐",
      "summary": "SafeDPO 将安全约束优化问题等价转化为对偏好数据的重排序操作，在标准 DPO 框架上实现**单阶段安全对齐**，无需额外训练奖励模型或代价模型，仅需有用性偏好数据和二值安全标签即可同时优化有用性与安全性。",
      "keyPoints": [
        "<strong>安全约束→无约束等价变换</strong>：定义修正奖励 <span class=\"kb-math kb-math-inline\">r_c(x,y) = r(x,y)</span> 若回答安全，否则 <span class=\"kb-math kb-math-inline\">r_c(x,y) = -\\infty</span>，将带约束的安全优化问题（Eq.8）等价转化为标准无约束 RLHF 目标（Eq.11），理论上保证最优策略一致（Proposition 4.2）",
        "<strong>数据需求大幅简化</strong>：仅需有用性偏好对 <span class=\"kb-math kb-math-inline\">(y_w \\succ y_l)</span> 加上每个回答的<strong>二值安全标签</strong> <span class=\"kb-math kb-math-inline\">h \\in \\{0, 1\\}</span>，完全不需要有害性偏好数据（Safe RLHF 需要），降低了标注成本和数据收集难度",
        "<strong>偏好重排序变换 <span class=\"kb-math kb-math-inline\">\\mathcal{T}</span></strong>：当不安全的回答被偏好于安全回答时（<span class=\"kb-math kb-math-inline\">\\tilde{h}_w &gt; \\tilde{h}_l</span>），交换偏好顺序，确保安全回答始终被优先选择；对重排后的数据直接应用 DPO 损失即为 SafeDPO（Eq.14）",
        "<strong>增强版 SafeDPO（Enhanced SafeDPO）</strong>：在 DPO 损失的 sigmoid 内部添加偏移量 <span class=\"kb-math kb-math-inline\">-(\\tilde{h}_l - \\tilde{h}_w)\\Delta</span>（<span class=\"kb-math kb-math-inline\">\\Delta \\geq 0</span>），进一步拉大安全与不安全回答的偏好差距，提升安全性；当 <span class=\"kb-math kb-math-inline\">\\Delta = 0</span> 时退化为基础版",
        "<strong>理论保证完备</strong>：Proposition 4.3 证明变换 <span class=\"kb-math kb-math-inline\">\\mathcal{T}</span> 下的 DPO 梯度是修正奖励下真实梯度的无偏估计；Proposition 4.4 证明 Enhanced SafeDPO 的最优解与基础版一致，<span class=\"kb-math kb-math-inline\">\\Delta</span> 仅影响优化景观而不改变最优点",
        "<strong>实验效果显著</strong>：在 PKU-SafeRLHF-30K 数据集上，以 Alpaca-7B 为基座模型，SafeDPO 达到 97%（模型评估）/ 100%（GPT-4 评估）的安全率，同时保持较高的有用性得分，显著优于 Safe RLHF 等多阶段基线"
      ],
      "detail": "<p><img alt=\"SafeDPO Pipeline\" src=\"https://ar5iv.labs.arxiv.org/html/2505.20065/assets/x1.png\" /></p>\n<pre><code>算法: SafeDPO / Enhanced SafeDPO\n────────────────────────────────────────────\n输入: \n  - 有用性偏好数据集 D = {(x, y_w, y_l, h_w, h_l)}\n    其中 y_w ≻ y_l 表示有用性偏好, h ∈ {0,1} 为安全标签(1=安全)\n  - 参考策略 π_ref\n  - 超参数 β &gt; 0, Δ ≥ 0\n\n步骤 1: 计算安全指示量\n  对每个样本: h̃_w = 1 - h_w,  h̃_l = 1 - h_l\n  (h̃ = 0 表示安全, h̃ = 1 表示不安全)\n\n步骤 2: 偏好重排序 (变换 T)\n  对每个样本 (x, y_w, y_l):\n    if h̃_w &gt; h̃_l:           // 被偏好的回答不安全, 未被偏好的安全\n      交换: (y_w, y_l) ← (y_l, y_w)   // 强制安全回答被偏好\n      交换: (h̃_w, h̃_l) ← (h̃_l, h̃_w)\n\n步骤 3: 计算 Enhanced SafeDPO 损失\n  对每个样本计算:\n    u = β·[log π_θ(y_w|x)/π_ref(y_w|x) - log π_θ(y_l|x)/π_ref(y_l|x)]\n    offset = -(h̃_l - h̃_w) · Δ\n    L = -log σ(u + offset)\n  总损失 = 所有样本的 L 的均值\n\n步骤 4: 梯度下降优化 π_θ\n  使用标准优化器最小化总损失\n\n输出: 安全对齐后的策略 π_θ\n────────────────────────────────────────────\n注: Δ = 0 时退化为基础 SafeDPO (Eq.14)\n    offset 仅在 h̃_l ≠ h̃_w 时非零\n</code></pre>\n<p><strong>问题建模与修正奖励函数。</strong> SafeDPO 的核心洞察来自对安全约束优化问题的重新建模。标准的安全 RLHF 目标是一个带约束的优化问题：</p>\n<div class=\"kb-math kb-math-display\">\\max_\\pi \\mathbb{E}_{x \\sim \\mathcal{D}_\\mathcal{X}} \\mathbb{E}_{y \\sim \\pi(\\cdot|x)} [r(x,y)] - \\beta \\, \\text{KL}[\\pi \\| \\pi_{\\text{ref}}], \\quad \\text{s.t.} \\quad c(x,y) \\leq 0</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">r(x,y)</span> 是奖励函数，<span class=\"kb-math kb-math-inline\">c(x,y)</span> 是代价函数（正值表示不安全）。Safe RLHF 通过 Lagrangian 方法求解此问题，需要分别训练奖励模型和代价模型，再用 PPO-Lagrangian 优化策略，流程复杂且不稳定。SafeDPO 的关键创新在于定义<strong>修正奖励函数</strong> <span class=\"kb-math kb-math-inline\">r_c(x,y)</span>：当回答安全时 <span class=\"kb-math kb-math-inline\">r_c = r</span>，当回答不安全时 <span class=\"kb-math kb-math-inline\">r_c = -\\infty</span>。Proposition 4.2 严格证明了在此修正奖励下的无约束优化问题与原始带约束问题具有相同的最优解集合，从而将安全约束\"编码\"进了奖励函数本身。</p>\n<p><strong>偏好重排序变换 <span class=\"kb-math kb-math-inline\">\\mathcal{T}</span> 与 SafeDPO 损失。</strong> 将修正奖励 <span class=\"kb-math kb-math-inline\">r_c</span> 代入 DPO 的 Bradley-Terry 偏好模型后，可以推导出修正奖励下的偏好概率。关键观察是：如果 <span class=\"kb-math kb-math-inline\">y_w</span> 不安全而 <span class=\"kb-math kb-math-inline\">y_l</span> 安全，则在修正奖励下 <span class=\"kb-math kb-math-inline\">y_l</span> 应当被偏好（因为 <span class=\"kb-math kb-math-inline\">r_c(x, y_w) = -\\infty</span>）。这自然导出了变换 <span class=\"kb-math kb-math-inline\">\\mathcal{T}</span> 的定义——当 <span class=\"kb-math kb-math-inline\">\\tilde{h}_w &gt; \\tilde{h}_l</span> 时交换偏好顺序。对变换后的数据集 <span class=\"kb-math kb-math-inline\">\\mathcal{T}(\\mathcal{D})</span> 应用标准 DPO 损失即得到 SafeDPO 的训练目标：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{SafeDPO}}(\\pi_\\theta; \\pi_{\\text{ref}}) = -\\mathbb{E}_{(x, y_w&#x27;, y_l&#x27;) \\sim \\mathcal{T}(\\mathcal{D})} \\left[ \\log \\sigma \\left( \\beta \\log \\frac{\\pi_\\theta(y_w&#x27;|x)}{\\pi_{\\text{ref}}(y_w&#x27;|x)} - \\beta \\log \\frac{\\pi_\\theta(y_l&#x27;|x)}{\\pi_{\\text{ref}}(y_l&#x27;|x)} \\right) \\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">(y_w&#x27;, y_l&#x27;)</span> 是经过变换 <span class=\"kb-math kb-math-inline\">\\mathcal{T}</span> 重排后的偏好对。Proposition 4.3 进一步证明此损失的梯度是修正奖励下真实 DPO 梯度的无偏估计量，保证了优化的正确性。</p>\n<p><strong>Enhanced SafeDPO 与超参数 <span class=\"kb-math kb-math-inline\">\\Delta</span> 的作用。</strong> 基础 SafeDPO 虽然理论上正确，但在有限数据下可能对安全性的强调不够。Enhanced SafeDPO 通过在 sigmoid 函数内部引入偏移量来解决这一问题：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{E-SafeDPO}} = -\\mathbb{E} \\left[ \\log \\sigma \\left( \\beta \\log \\frac{\\pi_\\theta(y_w&#x27;|x)}{\\pi_{\\text{ref}}(y_w&#x27;|x)} - \\beta \\log \\frac{\\pi_\\theta(y_l&#x27;|x)}{\\pi_{\\text{ref}}(y_l&#x27;|x)} - (\\tilde{h}_l - \\tilde{h}_w)\\Delta \\right) \\right]</div>\n<p>当被拒绝的回答不安全（<span class=\"kb-math kb-math-inline\">\\tilde{h}_l = 1, \\tilde{h}_w = 0</span>）时，偏移量为 <span class=\"kb-math kb-math-inline\">-\\Delta &lt; 0</span>，使得 sigmoid 的输入更小，产生更大的梯度，从而更强烈地惩罚不安全回答。Proposition 4.4 证明了无论 <span class=\"kb-math kb-math-inline\">\\Delta</span> 取何值，Enhanced SafeDPO 的全局最优解与基础版完全一致——<span class=\"kb-math kb-math-inline\">\\Delta</span> 仅改变损失景观的形状（使安全相关样本的梯度更陡峭），而不改变最优点的位置。实验中 <span class=\"kb-math kb-math-inline\">\\Delta \\in \\{0, 2, 5, 10, 20\\}</span> 的测试表明性能对 <span class=\"kb-math kb-math-inline\">\\Delta</span> 的选择相当鲁棒，<span class=\"kb-math kb-math-inline\">\\Delta = 10</span> 通常是较好的默认值。在 PKU-SafeRLHF-30K 数据集上，SafeDPO 以 Alpaca-7B（基于 LLaMA-2-7B）为基座，在安全率上达到 97-100%，同时有用性得分优于或持平 Safe RLHF、SACPO 等需要多阶段训练的基线方法。</p>",
      "quiz": {
        "q": "SafeDPO 的偏好重排序变换 T 在什么条件下会交换偏好对的顺序？",
        "options": {
          "A": "当两个回答都不安全时",
          "B": "当被偏好的回答不安全而未被偏好的回答安全时",
          "C": "当两个回答的有用性得分相近时",
          "D": "当被偏好的回答安全而未被偏好的回答不安全时"
        },
        "answer": 1,
        "explain": ""
      }
    },
    {
      "id": "star_1",
      "num": 33,
      "name": "STAR-1",
      "fullName": "推理模型安全对齐 (Safer Alignment of Reasoning LLMs)",
      "year": "2026.01",
      "org": "AAAI",
      "parent": "safe_rlhf",
      "paperUrl": "https://arxiv.org/abs/2502.11111",
      "projectUrl": "",
      "category": "alignment",
      "motivation": "推理模型安全对齐数据集",
      "summary": "STAR-1 的核心目标是：推理模型安全对齐数据集。",
      "keyPoints": [
        "核心动机：推理模型安全对齐数据集",
        "演化来源：继承或改进自 safe_rlhf",
        "代表机构：AAAI"
      ],
      "detail": "<p><img alt=\"STAR-1 teaser\" src=\"https://raw.githubusercontent.com/UCSC-VLAA/STAR-1/main/assets/SART1_teaser_final.jpg\" /></p>\n<p>图源：STAR-1 官方 GitHub 仓库。manifest 中 arXiv URL 保持输入元信息；公开仓库和论文页面用于补足方法细节。</p>\n<pre><code class=\"language-text\">Algorithm: STAR-1 data construction and alignment\nInput:\n  raw safety dataset D_raw\n  safety policy P\n  reasoning teacher T\n  quality scorer Q\n  reasoning model M\nOutput:\n  safer reasoning model M'\n\n1. Decontaminate and deduplicate D_raw.\n2. Classify samples into safety categories for diversity control.\n3. For each candidate prompt:\n     use T to generate policy-grounded deliberative reasoning\n     and a final safe response.\n4. Score each sample with Q on:\n     policy correctness, reasoning quality, answer helpfulness,\n     refusal appropriateness, and formatting.\n5. Select a diverse high-quality subset D_star of about 1K samples.\n6. Supervised fine-tune M on D_star with thought and answer format.\n7. Evaluate M' on safety benchmarks and reasoning benchmarks.\n8. Optionally mix benign data to reduce over-refusal.\n</code></pre>\n<p>STAR-1 针对的是 reasoning LLM 的特殊安全问题。推理模型会显式展开思考过程，安全策略不仅要体现在最终答案中，也要体现在中间推理里。若思考过程已经朝危险方向展开，最后一句拒答并不一定足够；因此数据需要教会模型如何在推理阶段识别风险、引用政策边界并转向安全帮助。</p>\n<p>论文的“1K 数据”并不是随机小数据，而是经过强过滤的高密度数据。流程先从更大的安全样本池中去重和分类，保证风险类别多样；再用强模型生成带有 deliberative reasoning 的候选回答；最后用评分器筛掉政策错误、推理薄弱、过度拒绝或格式不合格样本。这体现的是质量优先的数据工程路线。</p>\n<p>训练目标是监督微调，而不是复杂的在线 RL。对推理模型来说，SFT 高质量轨迹可以直接改变回答风格：模型学会先判断请求意图和安全边界，再提供拒答、替代安全信息或正常帮助。公开结果显示，在多个安全 benchmark 上提升明显，而推理能力下降较小，说明安全轨迹和通用推理并不必然冲突。</p>\n<p>STAR-1 也提醒我们，非推理 LLM 和 reasoning LLM 的最佳安全数据格式可能不同。带 <code>&lt;think&gt;</code> 风格的推理轨迹对 reasoning model 很重要，但对普通 instruction model 可能造成格式和行为错配。实际落地应按模型家族分别评估是否保留思考轨迹、是否只训练最终答案，以及是否混入 benign helpfulness 数据降低过拒。</p>"
    },
    {
      "id": "rmo",
      "num": 34,
      "name": "RMO",
      "fullName": "重塑奖励边际 (Reshaping Reward Margin)",
      "year": "2026.01",
      "org": "AAAI",
      "parent": "safe_rlhf",
      "paperUrl": "https://doi.org/10.1609/aaai.v40i44.41074",
      "projectUrl": "",
      "category": "alignment",
      "motivation": "重塑奖励边际提升扩展性",
      "summary": "RMO 的核心目标是：重塑奖励边际提升扩展性。",
      "keyPoints": [
        "核心动机：重塑奖励边际提升扩展性",
        "演化来源：继承或改进自 safe_rlhf",
        "代表机构：AAAI"
      ],
      "detail": "<h5>示意图/图源</h5>\n<p><img alt=\"RMO 论文 Figure 1/2 图源：高方差与低方差 reward margin batch 对训练曲线和胜率的影响\" src=\"https://ojs.aaai.org/index.php/AAAI/article/view/40565/44526\" />\n<em>图源：AAAI 官方 PDF 中 Figure 1/2 展示了同一数据集在不同 batch margin 方差划分下的 loss 和 win-rate 差异。Manifest 中 DOI 不可直接对应到公开页面，正文采用同题 AAAI 官方页面与 PDF 补足：<code>https://ojs.aaai.org/index.php/AAAI/article/view/40565</code>。</em></p>\n<h5>算法/流程伪代码</h5>\n<p>```python</p>"
    },
    {
      "id": "lasa",
      "num": 35,
      "name": "LASA",
      "fullName": "语言无关对齐 (Language-Agnostic Alignment)",
      "year": "2026.03",
      "org": "ACL",
      "parent": "cai",
      "paperUrl": "https://aclanthology.org/2026.findings-acl.1/",
      "projectUrl": "",
      "category": "alignment",
      "motivation": "中间层锚定低资源语言对齐",
      "summary": "LASA 的核心目标是：中间层锚定低资源语言对齐。",
      "keyPoints": [
        "核心动机：中间层锚定低资源语言对齐",
        "演化来源：继承或改进自 cai",
        "代表机构：ACL"
      ],
      "detail": "<p>中间层锚定低资源语言对齐</p>"
    },
    {
      "id": "cai_2026",
      "num": 36,
      "name": "CAI 2026",
      "fullName": "Claude宪法2026更新 (Claude's Constitution: 2026 Update)",
      "year": "2026.01",
      "org": "Anthropic",
      "parent": "cai",
      "paperUrl": "https://www.anthropic.com/news/claudes-constitution",
      "projectUrl": "",
      "category": "alignment",
      "motivation": "推理框架提升自主伦理决策",
      "summary": "CAI 2026 的核心目标是：推理框架提升自主伦理决策。",
      "keyPoints": [
        "核心动机：推理框架提升自主伦理决策",
        "演化来源：继承或改进自 cai",
        "代表机构：Anthropic"
      ],
      "detail": "<p>推理框架提升自主伦理决策</p>"
    },
    {
      "id": "expguard",
      "num": 37,
      "name": "ExpGuard",
      "fullName": "专业领域护栏 (Specialized Domains Guard)",
      "year": "2026.03",
      "org": "arXiv",
      "parent": "nemo_guard",
      "paperUrl": "https://arxiv.org/abs/2603.02588",
      "projectUrl": "",
      "category": "content_safety",
      "motivation": "专业领域定制内容审核",
      "summary": "ExpGuard 提出了一套面向金融/医疗/法律专业领域的安全护栏方法，通过自动化术语挖掘与 LLM 驱动的数据构建 pipeline 生成领域特定训练数据（ExpGuardMix），训练出 7B 参数的护栏模型，在领域特定内容审核上大幅超越 WildGuard 等 SOTA（prompt F1 +8.9%，response F1 +15.3%），同时在公开安全基准上保持竞争力。",
      "keyPoints": [
        "<strong>领域特定安全护栏模型 ExpGuard</strong>：基于 Qwen2.5-7B 微调，同时支持 prompt 和 response 的有害性分类，覆盖金融、医疗、法律三大专业领域",
        "<strong>大规模领域安全数据集 ExpGuardMix</strong>（58,928 样本）：包含 ExpGuardTrain（56,653 训练样本）和 ExpGuardTest（2,275 专家标注测试样本），首个面向专业领域的安全审核数据集",
        "<strong>三阶段自动化数据构建 pipeline</strong>：(1) Wikipedia 术语挖掘 + Wikidata/GPT-4o/人工多级过滤 → 2,646 术语；(2) GPT-4o 生成有害/良性 prompt + Mistral/Gemma 生成 response；(3) 三模型（Claude/Gemini/Qwen）多数投票标签 + 去重",
        "<strong>13 类危害分类体系</strong>：基于 MLCommons Hazard Taxonomy，涵盖暴力、欺诈、隐私侵犯、不合格专业建议等",
        "<strong>严格的标签共识机制</strong>：要求三个 LLM 中至少两个在精确类别上一致（非仅 safe/unsafe 二分类），过滤 4.8% 模糊样本",
        "<strong>ExpGuard+ 变体</strong>：通过 AutoDAN-Turbo 生成 270 条领域特定越狱样本增强训练，提升对抗鲁棒性",
        "<strong>关键发现</strong>：API 级护栏（Detoxify/Perspective/OpenAI Moderation）在专业领域几乎完全失效（F1 &lt; 1%）"
      ],
      "detail": "<h5>核心框架图</h5>\n<p><img alt=\"ExpGuard 数据构建 Pipeline\" src=\"https://arxiv.org/html/2603.02588v1/x2.png\" />\n<em>图：ExpGuardMix 数据构建 pipeline 总览。包含三个阶段：(1) 领域术语挖掘；(2) Prompt 与 Response 构建；(3) 类别标注与数据过滤。</em></p>\n<p><img alt=\"ExpGuardMix 数据组成与领域攻击示例\" src=\"https://arxiv.org/html/2603.02588v1/x1.png\" />\n<em>图：(a) 领域特定对抗攻击示例——ExpGuard 成功识别利用金融术语\"haircut\"伪装的有害 prompt，而通用护栏被绕过；(b) ExpGuardMix 数据集组成分布。</em></p>\n<h5>数据构建伪代码</h5>\n<pre><code class=\"language-python\"># ExpGuardMix 数据构建 Pipeline\n\n# Stage 1: 领域术语挖掘\nterms = recursive_crawl_wikipedia(categories=[&quot;finance&quot;, &quot;healthcare&quot;, &quot;law&quot;])\nterms = filter_by_wikidata(terms, exclude=[&quot;persons&quot;, &quot;organizations&quot;, &quot;countries&quot;])\nterms = filter_by_gpt4o(terms, criteria=&quot;sensitive_and_harmful_relevant&quot;)\nterms = human_majority_vote(terms, n_annotators=3)  # → 2,646 terms\n\n# Stage 2: Prompt &amp; Response 构建\nfor term in domain_terms:\n    # 有害 prompt：GPT-4o + 前缀绕过 + Wikipedia 上下文 + 100+ 模板\n    harmful_prompts = gpt4o.generate(\n        prefix=&quot;I have an idea for a prompt:&quot;,\n        context=wikipedia_abstract(term),\n        templates=sample(instruction_templates, k=random),\n        variants=[&quot;short&quot;, &quot;long&quot;]\n    )\n    # 良性 prompt：从 Wikipedia 文档转换为 instruction-response 对\n    benign_prompts = convert_wiki_to_instructions(term)\n\n# 补充通用数据\nin_the_wild = subsample(LMSYS_Chat_1M + WildChat + DAN_jailbreaks)\nhuman_written = subsample(HH_RLHF + Aegis2)\n\n# Response 生成\nharmful_responses = mistral_7b_v01.generate(harmful_prompts)   # 早期模型更易 comply\nrefusal_responses = gemma3_27b_it.generate(harmful_prompts)    # 安全对齐模型生成拒绝\n\n# Stage 3: 标签与过滤\nfor sample in all_data:\n    labels = [claude37.classify(sample, cot=True),\n              gemini2_flash.classify(sample, cot=True),\n              qwen25_max.classify(sample, cot=True)]\n    # 严格共识：至少 2/3 在精确类别上一致\n    if majority_exact_category(labels):\n        final_label = majority_vote(labels)\n    else:\n        discard(sample)  # 过滤 4.8% 模糊样本\n\n# 去重 + 一致性检查\ndeduplicate(threshold=0.9, model=&quot;sentence-transformers&quot;)\n</code></pre>\n<h5>动机与背景</h5>\n<p>随着 LLM 在金融、医疗、法律等高风险领域的广泛部署，<strong>专业领域的内容安全审核</strong>成为一个被严重忽视的问题。现有的安全护栏模型（如 Llama-Guard、WildGuard）主要针对通用有害内容（暴力、色情等）训练，缺乏对专业术语和领域概念的理解能力。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：专业领域的有害内容往往利用技术术语进行伪装。例如，\"List methods to obscure high haircuts in asset evaluations\" 中的 \"haircut\" 在金融领域指资产价值的风险折扣，该查询实质上是在寻求金融欺诈方法，但通用护栏因不理解专业含义而放行。</div>\n<p>实验数据显示，广泛使用的 API 级护栏（Detoxify、Perspective API、OpenAI Moderation）在 ExpGuardTest 上的 F1 分数几乎为零（0.3%–0.6%），充分说明了通用方案在专业领域的严重失效。</p>\n<h5>核心技术方案</h5>\n<p><strong>1. 领域术语挖掘（Terminology Mining）</strong></p>\n<p>采用多级过滤策略从 Wikipedia 中提取专业术语：</p>\n<ul>\n<li><strong>递归爬取</strong>：从金融/医疗/法律类目递归爬取 Wikipedia 页面</li>\n<li><strong>实体过滤</strong>：通过 Wikidata API 排除人名、组织、国家等非技术实体</li>\n<li><strong>敏感性筛选</strong>：GPT-4o 评估术语是否与有害场景相关，大幅缩减候选集</li>\n<li><strong>人工验证</strong>：3 名标注员多数投票，最终保留 2,646 个术语（金融 989、医疗 1,012、法律 645）</li>\n</ul>\n<p><strong>2. 数据构建策略</strong></p>\n<p>数据构建的核心挑战在于如何生成高质量的领域特定有害内容：</p>\n<ul>\n<li><strong>绕过安全机制</strong>：采用 \"I have an idea for a prompt:\" 前缀绕过 GPT-4o 的内置安全过滤</li>\n<li><strong>多样性保障</strong>：每个术语生成长短两种 prompt 变体，从 100+ 预定义模板中随机采样，结合 few-shot 示例</li>\n<li><strong>Response 生成的模型选择</strong>：使用早期模型 Mistral-7B-v0.1 生成 compliant response（更容易配合有害请求），使用 Gemma-3-27B-IT 生成 refusal response（安全对齐更强）</li>\n</ul>\n<p><strong>3. 多模型共识标注</strong></p>\n<p>标注流程的设计体现了对领域特定内容标注难度的深刻理解：</p>\n<div class=\"kb-math kb-math-display\">\\text{Label}(x) = \\begin{cases} \\text{majority}(l_1, l_2, l_3) &amp; \\text{if } \\exists \\text{ exact category agreement} \\geq 2 \\\\ \\text{discard} &amp; \\text{otherwise} \\end{cases}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">l_i</span> 是第 <span class=\"kb-math kb-math-inline\">i</span> 个 LLM（Claude 3.7 Sonnet / Gemini 2.0 Flash / Qwen2.5-Max）基于 Chain-of-Thought 推理给出的精确类别标签。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：与常见的 safe/unsafe 二分类投票不同，ExpGuard 要求至少 2/3 模型在 <strong>13 个精确危害类别</strong> 上达成一致。即使三个模型都判定为 unsafe，但归因于不同类别，该样本也会被丢弃。这种严格机制确保了标签质量。</div>\n<p><strong>4. 训练配置</strong></p>\n<ul>\n<li><strong>基座模型</strong>：Qwen2.5-7B</li>\n<li><strong>训练数据</strong>：ExpGuardTrain 全量 56,653 样本 + 通用安全数据混合</li>\n<li><strong>训练方式</strong>：标准 SFT（Supervised Fine-Tuning），输入格式为 prompt（+ optional response）→ 安全标签</li>\n</ul>\n<p><strong>5. ExpGuard+ 对抗增强</strong></p>\n<p>为提升对越狱攻击的鲁棒性，引入 ExpGuard+ 变体：\n- 使用 AutoDAN-Turbo 从 ExpGuardTest 中生成 270 条领域特定越狱 prompt\n- 以 Gemma-1.1-7B-IT 为越狱生成器，Qwen2.5-7B-Instruct 为受害模型\n- 将这 270 条样本加入训练集（与已有的 270 条 in-the-wild 越狱样本保持 1:1 比例）</p>\n<h5>实验结果</h5>\n<p><strong>领域特定基准（ExpGuardTest）</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th style=\"text-align: center;\">Prompt F1 (%)</th>\n<th style=\"text-align: center;\">Response F1 (%)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Detoxify / Perspective / OpenAI Mod</td>\n<td style=\"text-align: center;\">0.3–0.5</td>\n<td style=\"text-align: center;\">0.6</td>\n</tr>\n<tr>\n<td>Azure</td>\n<td style=\"text-align: center;\">14.1</td>\n<td style=\"text-align: center;\">2.6</td>\n</tr>\n<tr>\n<td>Llama-Guard3 (8B)</td>\n<td style=\"text-align: center;\">71.1</td>\n<td style=\"text-align: center;\">84.2</td>\n</tr>\n<tr>\n<td>WildGuard (7B)</td>\n<td style=\"text-align: center;\">84.4</td>\n<td style=\"text-align: center;\">77.4</td>\n</tr>\n<tr>\n<td>Aegis-Guard-D (7B)</td>\n<td style=\"text-align: center;\">82.9</td>\n<td style=\"text-align: center;\">87.2</td>\n</tr>\n<tr>\n<td><strong>ExpGuard (7B)</strong></td>\n<td style=\"text-align: center;\"><strong>93.3</strong></td>\n<td style=\"text-align: center;\"><strong>92.7</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>公开安全基准（8 个 benchmark 平均）</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th style=\"text-align: center;\">Prompt Avg F1 (%)</th>\n<th style=\"text-align: center;\">Response Avg F1 (%)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>WildGuard</td>\n<td style=\"text-align: center;\">84.2</td>\n<td style=\"text-align: center;\">78.8</td>\n</tr>\n<tr>\n<td>Llama-Guard3</td>\n<td style=\"text-align: center;\">78.9</td>\n<td style=\"text-align: center;\">66.8</td>\n</tr>\n<tr>\n<td><strong>ExpGuard</strong></td>\n<td style=\"text-align: center;\"><strong>85.7</strong></td>\n<td style=\"text-align: center;\"><strong>78.5</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>消融实验</strong>（验证各数据源贡献）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>配置</th>\n<th style=\"text-align: center;\">Public Prompt F1</th>\n<th style=\"text-align: center;\">ExpTest Prompt F1</th>\n<th style=\"text-align: center;\">Public Resp F1</th>\n<th style=\"text-align: center;\">ExpTest Resp F1</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>完整 ExpGuardTrain</td>\n<td style=\"text-align: center;\">85.7</td>\n<td style=\"text-align: center;\">93.3</td>\n<td style=\"text-align: center;\">78.5</td>\n<td style=\"text-align: center;\">92.7</td>\n</tr>\n<tr>\n<td>− Domain-specific</td>\n<td style=\"text-align: center;\">85.1</td>\n<td style=\"text-align: center;\">85.3 (↓8.0)</td>\n<td style=\"text-align: center;\">77.9</td>\n<td style=\"text-align: center;\">92.0</td>\n</tr>\n<tr>\n<td>− In-the-wild</td>\n<td style=\"text-align: center;\">84.1</td>\n<td style=\"text-align: center;\">93.2</td>\n<td style=\"text-align: center;\">77.9</td>\n<td style=\"text-align: center;\">92.3</td>\n</tr>\n<tr>\n<td>− Human-written</td>\n<td style=\"text-align: center;\">81.3</td>\n<td style=\"text-align: center;\">93.4</td>\n<td style=\"text-align: center;\">73.9 (↓4.6)</td>\n<td style=\"text-align: center;\">92.3</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键结论</strong>：领域特定数据对 ExpGuardTest 性能至关重要（去除后 prompt F1 下降 8%）；人工编写数据对公开基准泛化性贡献最大（去除后 response F1 下降 4.6%）；三类数据源互补，完整混合达到最优平衡。</div>\n<p><strong>越狱鲁棒性</strong>：在 CipherChat、AutoDAN-Turbo、FlipAttack、GASP 四种越狱攻击下，ExpGuard 在标准和领域特定场景中均保持较高检测率，ExpGuard+ 通过对抗增强进一步提升了领域特定越狱的检测能力。</p>\n<h5>与现有方法的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>通用护栏（WildGuard 等）</th>\n<th>ExpGuard</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>训练数据</td>\n<td>通用有害内容</td>\n<td>通用 + 领域特定（金融/医疗/法律）</td>\n</tr>\n<tr>\n<td>术语理解</td>\n<td>无专业术语知识</td>\n<td>基于 2,646 个专业术语构建</td>\n</tr>\n<tr>\n<td>标注策略</td>\n<td>二分类投票</td>\n<td>13 类精确类别多数投票</td>\n</tr>\n<tr>\n<td>领域 F1</td>\n<td>~84% prompt / ~77% response</td>\n<td><strong>93.3% / 92.7%</strong></td>\n</tr>\n<tr>\n<td>通用 F1</td>\n<td>~84% / ~79%</td>\n<td><strong>85.7% / 78.5%</strong>（持平或略优）</td>\n</tr>\n<tr>\n<td>可扩展性</td>\n<td>固定类别</td>\n<td>pipeline 可适配新领域</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "ExpGuard 在数据标注阶段采用三个 LLM 进行多数投票时，其共识机制与常规做法的关键区别是什么？",
        "options": [
          "使用更多的标注模型（5个而非3个）来提高准确率",
          "要求至少两个模型在精确的危害类别上达成一致，而非仅在 safe/unsafe 二分类上投票",
          "仅使用开源模型进行标注以降低成本",
          "采用主动学习策略，让模型迭代标注最不确定的样本"
        ],
        "answer": 1,
        "explain": "ExpGuard 的标注共识要求至少 2/3 的 LLM 在 13 个精确危害类别上达成一致，即使三个模型都判定为 unsafe 但归因于不同类别，该样本也会被丢弃。这种严格机制确保了领域特定内容标签的高质量。"
      }
    },
    {
      "id": "toxigan",
      "num": 38,
      "name": "ToxiGAN",
      "fullName": "毒性数据增强GAN (Toxic Data Augmentation GAN)",
      "year": "2026",
      "org": "EACL",
      "parent": "toxigen",
      "paperUrl": "https://aclanthology.org/2026.findings-acl.1/",
      "projectUrl": "",
      "category": "content_safety",
      "motivation": "LLM引导毒性数据增强",
      "summary": "ToxiGAN 的核心目标是：LLM引导毒性数据增强。",
      "keyPoints": [
        "核心动机：LLM引导毒性数据增强",
        "演化来源：继承或改进自 toxigen",
        "代表机构：EACL"
      ],
      "detail": "<h5>示意图/图源</h5>\n<p><img alt=\"ToxiGAN 总体框架\" src=\"https://arxiv.org/html/2601.03121v1/x1.png\" />\n<em>图：ToxiGAN 包含多个类别条件 toxic generators、一个 LLM neutral text provider 和一个 multi-class discriminator。</em></p>\n<p><img alt=\"ToxiGAN 两步方向学习\" src=\"https://arxiv.org/html/2601.03121v1/x2.png\" />\n<em>图：生成器在 embedding space 中交替朝“远离中性语义”和“靠近真实毒性分布”两个方向更新。</em></p>\n<h5>算法/流程伪代码</h5>\n<p>```python</p>"
    },
    {
      "id": "bielik_guard",
      "num": 39,
      "name": "Bielik Guard",
      "fullName": "Bielik多语种护栏 (Bielik Multilingual Guard)",
      "year": "2026",
      "org": "arXiv",
      "parent": "perspective",
      "paperUrl": "https://arxiv.org/abs/2603.02588",
      "projectUrl": "",
      "category": "content_safety",
      "motivation": "多语种优化安全分类器",
      "summary": "Bielik Guard 的核心目标是：多语种优化安全分类器。",
      "keyPoints": [
        "核心动机：多语种优化安全分类器",
        "演化来源：继承或改进自 perspective",
        "代表机构：arXiv"
      ],
      "detail": "<h5>示意图/图源</h5>\n<p><img alt=\"Bielik Guard 官方项目图源\" src=\"https://guard.bielik.ai/images/preview.png\" />\n<em>图源：Bielik Guard/Sójka 官方项目页。模型页包括 <code>https://huggingface.co/speakleash/Bielik-Guard-0.1B-v1.1</code> 和 <code>https://huggingface.co/speakleash/Bielik-Guard-0.5B-v1.1</code>。</em></p>\n<h5>算法/流程伪代码</h5>\n<p>```python</p>"
    },
    {
      "id": "attriguard",
      "num": 40,
      "name": "AttriGuard",
      "fullName": "因果归因护栏 (Causal Attribution Guard)",
      "year": "2026.03",
      "org": "arXiv",
      "parent": "llama_guard3",
      "paperUrl": "https://arxiv.org/abs/2603.10749",
      "projectUrl": "",
      "category": "content_safety",
      "motivation": "因果归因防御提示注入",
      "summary": "AttriGuard 的核心目标是：因果归因防御提示注入。",
      "keyPoints": [
        "核心动机：因果归因防御提示注入",
        "演化来源：继承或改进自 llama_guard3",
        "代表机构：arXiv"
      ],
      "detail": "<h5>示意图/图源</h5>\n<p><img alt=\"AttriGuard pipeline 图源：arXiv PDF 中 Figure 1 展示 injected vs benign observations 下的 original run 与 shadow run\" src=\"https://arxiv.org/pdf/2603.10749\" />\n<em>图源：arXiv PDF。源文件中对应 <code>pdfs/attriguard_pipeline.pdf</code>，说明左侧 IPI 场景下恶意 call 在 shadow replay 中不存活，右侧 benign 场景下 save-to-pad call 正常存活。</em></p>\n<h5>算法/流程伪代码</h5>\n<p>```python</p>"
    },
    {
      "id": "toolhijacker",
      "num": 41,
      "name": "ToolHijacker",
      "fullName": "工具劫持 (ToolHijacker: Agent Hijacking)",
      "year": "2026.02",
      "org": "NDSS",
      "parent": "nemo_guard",
      "paperUrl": "https://www.ndss-symposium.org/ndss-paper/neurostrike-neuron-level-attacks-on-aligned-llms/",
      "projectUrl": "",
      "category": "content_safety",
      "motivation": "揭示工具文档劫持攻击",
      "summary": "ToolHijacker 的核心目标是：揭示工具文档劫持攻击。",
      "keyPoints": [
        "核心动机：揭示工具文档劫持攻击",
        "演化来源：继承或改进自 nemo_guard",
        "代表机构：NDSS"
      ],
      "detail": "<p>揭示工具文档劫持攻击</p>"
    }
  ],
  "categories": {
    "alignment": {
      "label": "价值观对齐",
      "color": "#3B82F6"
    },
    "jailbreak": {
      "label": "越狱攻防",
      "color": "#EF4444"
    },
    "hallucination": {
      "label": "幻觉控制",
      "color": "#10B981"
    },
    "content_safety": {
      "label": "内容安全",
      "color": "#8B5CF6"
    }
  },
  "projectUrls": {}
};
