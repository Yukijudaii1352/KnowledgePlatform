/**
 * navigation-data.js — 由 pipeline/build.py 于 2026-06-16 17:00:13 自动生成。
 * 源文件：content/embodied/navigation.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "embodied",
    "topic_id": "navigation",
    "topic_name": "导航与移动智能",
    "page_title": "导航与移动智能",
    "page_subtitle": "2026-06-16 版",
    "page_desc": "涵盖视觉导航、SLAM、目标导向导航与长程任务规划的具身智能核心技术，从经典几何方法到2026年VLA基础模型的完整演进",
    "page_icon": "🧭",
    "hero_pills": [
      "视觉导航",
      "3DGS-SLAM",
      "VLA基础模型",
      "LLM任务规划"
    ],
    "count_pill": "{count} 个算法",
    "image_base": "../../content/embodied/navigation/assets/",
    "overview_from_doc": true,
    "latest_overview_from_doc": true
  },
  "overview": [
    {
      "title": "",
      "body_html": "<h1>大模型系列11（1） - 具身智能导航篇</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/1984681938980734050\">https://zhuanlan.zhihu.com/p/1984681938980734050</a></li>\n<li>作者: Vision</li>\n</ul>\n<hr />\n<p>大模型系列11（1） - 具身智能导航篇</p>\n<h1>大模型系列11（1） - 具身智能导航篇</h1>\n<p>作者: Vision, 赞: 9</p>\n<hr />\n<h2>1. 引言</h2>\n<p>按<a href=\"https://zhuanlan.zhihu.com/p/670004790\">大模型系列00 - 前言</a>系列规划，这次来讲讲机器人领域的导航相关的技术发展状况。机器人导航技术作为机器人实现自主运动和任务执行的核心能力，近年来受到了学术界和工业界的广泛关注。导航不仅要求机器人能够在未知或部分已知的环境中准确定位和移动，还需要机器人理解人类指令、识别场景信息以及根据多模态数据进行决策 。本篇文章旨在综述机器人导航领域的整体发展，从最初的基于几何和传感器数据构建地图（例如 SLAM 方法）到近年来基于预训练模型和大规模多模态融合的端到端导航系统（如 LM-Nav 、NavGPT、NaVILA 、Uni-NaVid 、NaviLLM 、NavFoM 以及 TrackVLA ）进行详细讨论。文章首先介绍导航技术的定义、类型和研究意义，随后对不同方法的原理、优势以及典型代表进行比较分析，并探讨当前方法中存在的问题及未来发展趋势。</p>\n<hr />\n<h2>2. 机器人导航的定义与分类</h2>\n<p>机器人导航指的是机器人在未知或部分已知环境中，通过传感器获取环境信息、构建地图并规划路径，从而自主移动以达到预定目标的技术 。根据导航任务的目标和交互模式，导航主要可以划分为以下几类：</p>\n<ol>\n<li><strong>目标导航（Goal-oriented Navigation）</strong><br />\n   目标导航要求机器人根据预设的目标进行移动，典型案例包括点目标导航（PointNav）和语义目标导航（ObjectNav）。例如，ApexNav: Adaptive Exploration and Goal-Centric Semantic Fusion 通过目标中心语义融合实现对目标物体的高效识别和路径规划。</li>\n<li><strong>指令跟随导航（Instruction-following Navigation）</strong><br />\n   指令跟随导航要求机器人理解自然语言指令，并将其转化为具体的运动指令。此类任务通常涉及视觉、语言与动作间的紧密融合，如 Uni-NaVid 系统利用单目 RGB 视频和语言指令实现端到端动作预测。根据提供的论文内容，NaVid 这篇论文中，对于每一帧图像，都会生成instruction-queried visual token和instruction-agnostic visual tokens。当前帧和历史帧的token长度（instruction-agnostic tokens的数量）是不同的。具体来说，历史帧使用较少的instruction-agnostic tokens (4个)，而当前帧使用较多的instruction-agnostic tokens (64个)。这是因为当前帧是导航动作推理的主要依据，而历史帧提供导航进度的重要上下文。</li>\n<li><strong>对话导航（Dialogue-based Navigation）</strong><br />\n   对话导航是基于人机对话实现的导航。例如，在 CVDN（对话式视觉导航）任务中，机器人需要根据对话历史和实时指令进行路径规划和动态调整。</li>\n</ol>\n<p>此外，还有一些混合型导航任务，如目标搜索、物体定位与回答问题（如 3D 问答），它们都要求机器人在复杂场景下实现多任务协同。</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-66361a743fe7e878dbd5708c39af2df5_1440w.jpg\" /></p>\n<p>引用来自Uni-NaVid</p>\n<hr />\n<h2>3. 主要研究方法：传统几何方法与现代端到端方法</h2>\n<p>在机器人导航领域，研究方法大致可以分为传统几何方法与现代基于大模型的端到端方法两大类。</p>\n<h3>3.1 传统几何方法</h3>\n<p>传统方法主要依赖机器人自身传感器数据，通过构建环境的几何地图实现导航。这里熟悉自动驾驶和扫地机器人产品的同学应该都比较熟悉。除了定位外，更重要的是如何确定目的地，这会涉及到一些感知相关的检测定义任务。但由于其要求较高，比较难泛化。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-576c15380b12f6a07078d65224602f2b_1440w.jpg\" /></p>\n<h3>3.2 现代端到端方法</h3>\n<p>近几年，随着大规模数据和预训练模型的迅速发展，机器人导航研究逐步转向基于端到端学习和多模态融合的新方法。这类方法代表包括：</p>\n<ul>\n<li><strong>基于视觉-语言-动作（VLA）模型的方法</strong><br />\n  如 NaVILA: Visual-Language-Action Model Trained with Human Video Demonstrations 、Uni-NaVid 等方法利用预训练的视觉、语言模型，实现从 RGB 视频和自然语言指令直接输出动作的端到端导航。NaVILA 借助人类视频数据的直接训练，显著提升了在连续环境中的导航性能，展示了较高的鲁棒性和实时性。</li>\n<li><strong>大模型驱动的导航方法(zero-shot)</strong><br />\n  结合大型语言模型（LLM）和视觉模型的 LM-Nav（uc berkely的sergey levine） 、NavGPT 等方法通过大规模未标注数据的自监督训练，实现自然语言解析与路径规划的无缝对接。例如，NavGPT 纯粹依托 LLM 的推理能力，进行零样本的顺序动作预测，展示了在复杂场景下的强候选性。LM-Nav通过结合大型预训练模型，实现了一个新颖的具身导航系统，为机器人理解和执行自然语言指令开辟了新的途径。文章提出了3个步骤，第一，利用llm（gpt3）来从人类指令中提取关键的landmark，第二个，利用vlm（clip）来从众多图像中获取与文字相关的图像。第三个，利用vnm（自监督训练，输入current_obs_image, target_image, 输出相对距离）来输出到目标landmark的距离和方向。另外文章里也提到构建一个landmark-graph，来减少一些模型的错误和低效探索。</li>\n<li><strong>通用导航大模型</strong><br />\n  NaviLLM: A Large Language Model for Navigation 是首个通过统一架构整合多任务数据（包括 VLN、对话式导航、目标定位等）来训练的通用导航大模型，并在 CVDN、SOON、ScanQA 等任务上达到最新成果。此外，NavFoM 则面向跨载体（如无人机、四足机器人、车辆等）导航，展示了在多种机器人平台下的广泛适应性。</li>\n</ul>\n<p>下面通过表格对比传统几何方法与现代端到端方法的主要特点。</p>\n<h3>表格 1：传统几何方法与现代端到端导航方法比较</h3>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法类型</th>\n<th>优势</th>\n<th>劣势</th>\n<th>代表方法</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>传统几何方法</td>\n<td>地图构建精度高，成熟稳定</td>\n<td>对动态环境和弱纹理区域适应性较差；计算量大</td>\n<td>SLAM、Loop Closure</td>\n</tr>\n<tr>\n<td>现代端到端方法</td>\n<td>多模态融合，能直接理解自然语言指令，提高交互性；自适应性强</td>\n<td>模型推理速度要求高，需大量数据支撑；存在泛化问题</td>\n<td>NaVILA、LM-Nav、Uni-NaVid、NavGPT</td>\n</tr>\n</tbody>\n</table></div>\n<p><em>表格 1 展示了传统几何方法与端到端学习方法在优劣势上的直观对比</em></p>\n<h3>3.3 建图与端到端结合方法</h3>\n<p>传统模块化方法里会实时建立一些感知/认知图，这样会对机器人所在的全局环境有整体了解，方便传统方法全局最短路径规划。在端到端方法里，由于受限于算力，历史信息只能输入有限的历史观测信息，故有一些方法会利用端到端方法输出的结果实时构建一些闭环认知图，这样在循环调用大模型时，可以用一些更长的记忆信息来辅助改善一些instruction的信息，避免存在因为历史信息不足不断重复绕圈导航的低效率行为。比如CogNav: Cognitive Process Modeling for Object Goal Navigation with LLMs中构建3个图等</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-98ce070cf55485d2bf3c0b8b6dacab0b_1440w.jpg\" /></p>\n<p>引用自CogNav</p>\n<hr />\n<h2>4. 前沿进展与大模型导航技术</h2>\n<p>随着预训练大模型在多个领域的广泛应用，机器人导航技术也进入了一个崭新的阶段。当前最具代表性的前沿方向主要集中在以下几方面：</p>\n<h3>4.1 大模型赋能的通用导航</h3>\n<p>大模型可以无缝整合视觉、语言和动作信息，从而实现统一的导航策略。例如：</p>\n<ul>\n<li><strong>NaviLLM</strong><br />\n  NaviLLM: A Large Language Model for Navigation 利用大型语言模型进行模式转换，通过设计基于 schema 的指令，将多种任务（诸如视觉导航、物体定位、对话问答以及轨迹摘要）统一成文本生成问题，进而实现一体化训练。其在 CVDN、SOON、ScanQA 等任务中相较于传统方法提高了 29% 以上的成功率，为通用导航树立了新的标杆。</li>\n<li><strong>NavFoM（可以看看galbot系列vln paper）</strong><br />\n  NavFoM 面向不同实体（如四足机器人、无人机、车辆等）的跨载体导航问题，大规模数据训练使其在单摄像头和多摄像头模式下均取得显著提升，成功率分别从 51.8% 提升到 57.4% 及 56.3% 到 64.4%。</li>\n</ul>\n<h3>4.2 多模态融合与在线 token 合并策略</h3>\n<p>高效实时地处理连续视频数据是机器人导航的重要挑战。现代方法如 Uni-NaVid 结合了在线 token 合并策略，能够在保证推理速度达到 5 Hz 的同时，保持对环境信息的充分捕捉和理解。这种技术不仅提高了系统的实时响应能力，而且在多任务协同场景下表现突出。</p>\n<h3>4.3 视觉跟踪与目标中心语义融合</h3>\n<p>在动态环境中，机器人需要在不断变化的场景中保持对目标的追踪。TrackVLA: Embodied Visual Tracking in the Wild 通过联合目标识别和轨迹规划，实现了在高动态场景下对目标的稳定跟踪，并在 Gym-UnrealCV 等基准测试中取得最新成果。另外，ApexNav: Adaptive Exploration and Goal-Centric Semantic Fusion 则采用自适应探索策略与目标中心语义融合技术，在弱语义环境中切换为几何探索，有效降低了误识率和路径冗余问题。</p>\n<hr />\n<h2>5. 存在的问题与未来发展方向</h2>\n<p>尽管现代导航技术已经取得显著成果，但在实际应用中仍面临诸多挑战，主要包括：</p>\n<h3>5.1 感知与视野限制</h3>\n<ul>\n<li><strong>视野狭窄问题</strong><br />\n  许多系统（如基于单目 RGB 摄像头的系统）存在视野通常仅为 90° 的限制，这使得在复杂环境下容易发生遮挡和漏检问题，如 TrackVLA 提到的易受遮挡干扰情况。</li>\n<li><strong>跨楼层导航困难</strong><br />\n  如 ApexNav 的实验中指出，跨楼层任务失败率较高（13%以上），这主要因系统仅构建二维地图，难以捕捉垂直维度信息。</li>\n</ul>\n<h3>5.2 计算效率与实时性</h3>\n<ul>\n<li><strong>大模型推理延时</strong><br />\n  由于大规模预训练模型的计算量较大，如 LM-Nav 依赖 GPT-4 的推理能力在实时性上存在瓶颈问题，需要进一步改进算法和硬件加速以满足实时导航要求。</li>\n<li><strong>在线数据处理与存储</strong><br />\n  在连续视频数据流的处理上，如何高效压缩和整合历史信息仍是一大挑战。在线 token 合并等技术虽然取得了一定突破，但仍需针对更加多变的环境进行优化。</li>\n</ul>\n<h3>5.3 泛化能力与鲁棒性</h3>\n<ul>\n<li><strong>多场景适应能力不足</strong><br />\n  当前部分模型可能在训练数据覆盖不足的场景（如特定室内或动态环境）下表现不佳。大模型虽然具有较强泛化能力，但在解析复杂人机交互和新物体识别上仍存在难点。</li>\n<li><strong>误识与目标丢失问题</strong><br />\n  如部分系统在动态环境下会出现目标误识别或错误停止的情况，需进一步提升多帧融合与目标中心语义更新技术的稳定性。</li>\n</ul>\n<h3>表格 2：现有导航系统主要问题与改进方向</h3>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>问题类别</th>\n<th>存在的问题</th>\n<th>潜在的改进方向</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>感知问题</td>\n<td>视野狭窄、遮挡严重、跨楼层信息不足</td>\n<td>多摄像头融合、三维地图构建、传感器协同</td>\n</tr>\n<tr>\n<td>计算效率</td>\n<td>大模型推理耗时、实时性不足</td>\n<td>模型压缩、边缘计算、硬件加速</td>\n</tr>\n<tr>\n<td>泛化与鲁棒性</td>\n<td>新场景适应性不足、目标误识或丢失</td>\n<td>数据丰富、在线多帧融合、目标中心语义更新技术</td>\n</tr>\n</tbody>\n</table></div>\n<p><em>表格 2 直观展示了当前机器人导航系统在感知、计算效率和泛化能力上的主要问题及未来可能的改进方向</em></p>\n<hr />\n<h2>6. 结论与主要发现</h2>\n<p>本文详细回顾了机器人导航技术领域中从传统几何方法到现代端到端多模态融合方法的发展历程，并重点介绍了当前利用大模型赋能的方法，如 NaviLLM 、NavGPT、NaVILA 、Uni-NaVid 、NavFoM 和 TrackVLA 。这些方法不仅在任务成功率和效率上取得了显著进步，而且在多模态信息融合方面展示了强大的潜力。但同时，视野限制、计算延时与泛化能力不足等诸多问题仍然阻碍了其在真实环境中的广泛应用。</p>\n<p><strong>主要发现如下：</strong></p>\n<ul>\n<li>机器人导航的核心在于构建环境模型（如 SLAM）和高效的路径规划；</li>\n<li>现代端到端方法通过大模型与多模态数据融合实现了对自然语言指令的直接理解和路径规划，大大提升了导航交互性和任务效率；</li>\n<li>当前前沿工作（例如 NaviLLM 和 NavFoM）已实现跨任务、跨平台的通用导航，但对实时性、视野覆盖和动态环境下的鲁棒性仍有进一步改进空间；</li>\n<li>未来发展方向应聚焦于多摄像头信息融合、三维地图构建、硬件加速与在线数据处理等关键技术，实现更高泛化能力和稳定性的导航系统。</li>\n</ul>\n<hr />\n<h2>7. 参考文献</h2>\n<ol>\n<li>LM-Nav: Robotic Navigation with Large Pre-Trained Models of Language, Vision, and Action2</li>\n</ol>\n<p>作者：Dhruv Shah, Błażej Osiński, Sergey Levine, et al.<br />\n年份：2023 (发表于 CoRL)</p>\n<p>2.NavGPT: Explicit Reasoning in Vision-and-Language Navigation with Large Language Models1</p>\n<p>作者：Gengze Zhou, Yicong Hong, Qi Wu<br />\n年份：2023 (arXiv Preprint) / 2024 (AAAI)</p>\n<ol>\n<li>Towards Learning a Generalist Model for Embodied Navigation1</li>\n</ol>\n<p>作者：Duo Zheng, Shijia Huang, Lin Zhao, Yiwu Zhong, Liwei Wang<br />\n年份：2023 (arXiv Preprint) / 2024 (CVPR)</p>\n<ol>\n<li>Embodied navigation with multi-modal information: A survey from tasks to methodology2</li>\n</ol>\n<p>作者：Yuchen Wu, Pengcheng Zhang, Meiying Gu, Jin Zheng, Xiao Bai<br />\n年份：2024 (发表于 Information Fusion)</p>\n<ol>\n<li>NaVid: Video-based VLM Plans the Next Step for Vision-and-Language Navigation1</li>\n</ol>\n<p>作者：Jiazhao Zhang, Kunyu Wang, Rongtao Xu, Gengze Zhou, Yicong Hong, Xiaomeng Fang, Qi Wu, Zhizheng Zhang, He Wang<br />\n年份：2024 (发表于 Robotics: Science and Systems)</p>\n<ol>\n<li>NaVILA: Legged Robot Vision-Language-Action Model for Navigation1</li>\n</ol>\n<p>作者：An-Chieh Cheng, Yandong Ji, Zhaojing Yang, Zaitian Gong, Xueyan Zou, Jan Kautz, Erdem Biyik, Hongxu Yin, Sifei Liu, Xiaolong Wang<br />\n年份：2024 (arXiv Preprint)</p>\n<p>7.CogNav: Cognitive Process Modeling for Object Goal Navigation with LLMs1</p>\n<p>作者：Yihan Cao, Jiazhao Zhang, Zhinan Yu, Kai Xu 等<br />\n年份：2024 (arXiv Preprint) / 2025 (ICCV Accepted)</p>\n<p>8.Uni-NaVid: A Video-based Vision-Language-Action Model for Unifying Embodied Navigation Tasks1</p>\n<p>作者：Jiazhao Zhang, Kunyu Wang, Shaoan Wang, Minghan Li, Haoran Liu, Songlin Wei, Zhongyuan Wang, Zhizheng Zhang, He Wang<br />\n年份：2024 (arXiv Preprint) / 2025</p>\n<ol>\n<li>Embodied navigation2</li>\n</ol>\n<p>作者：Yunhao Liu, Li Liu, Yawen Zheng, Yunhuai Liu, Fan Dang, Ningbo Li, Ke Ma<br />\n年份：2025 (发表于 Science China Information Sciences, Vol. 68)</p>\n<ol>\n<li>ApexNav: An Adaptive Exploration Strategy for Zero-Shot Object Navigation with Target-centric Semantic Fusion1</li>\n</ol>\n<p>作者：Mingjie Zhang, Yuheng Du, Chengkai Wu, Jinni Zhou, Zhenchao Qi, Jun Ma, Boyu Zhou<br />\n年份：2025 (发表于 IEEE Robotics and Automation Letters)</p>\n<p>11.TrackVLA: Embodied Visual Tracking in the Wild2</p>\n<p>作者：Shaoan Wang, Jiazhao Zhang, Minghan Li, Jiahang Liu, Anqi Li, Kui Wu, Fangwei Zhong, Junzhi Yu, Zhizheng Zhang, He Wang<br />\n年份：2025 (arXiv Preprint)</p>\n<p>12.CityWalker: Learning Embodied Urban Navigation from Web-Scale Videos2</p>\n<p>作者：Xinhao Liu, Jintong Li, Yicheng Jiang, Niranjan Sujay, Zhicheng Yang, Juexiao Zhang, John Abanes, Jing Zhang, Chen Feng<br />\n年份：2025 (发表于 CVPR 2025)</p>\n<ol>\n<li>OMNINAV: A Unified Framework for Prospective Exploration and Visual-Language Navigation1</li>\n</ol>\n<p>作者：Xinda Xue, Junjun Hu, Minghua Luo, Shichao Xie, Zedong Chu 等<br />\n年份：2025 (arXiv Preprint)</p>\n<ol>\n<li>Embodied Navigation Foundation Model1</li>\n</ol>\n<p>作者：Jiazhao Zhang, Anqi Li, 等<br />\n年份：2025 (arXiv Preprint)</p>\n<hr />"
    }
  ],
  "latest_overview": [
    {
      "title": "",
      "body_html": "<h1>RSS’26最新！OmniNavBench：具身导航评测终于大一统了（上交&amp;无界动力）</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2038666063508923585\">https://zhuanlan.zhihu.com/p/2038666063508923585</a></li>\n<li>作者: 具身智能之心</li>\n</ul>\n<hr />\n<p>RSS’26最新！OmniNavBench：具身导航评测终于大一统了（上交&amp;无界动力）</p>\n<h1>RSS’26最新！OmniNavBench：具身导航评测终于大一统了（上交&amp;无界动力）</h1>\n<p>作者: 具身智能之心, 赞: 3</p>\n<h2><strong><em>01.</em>现有导航评测到底缺了什么？</strong></h2>\n<p>具身导航（Embodied Navigation）是具身智能的基石能力——让智能体在陌生环境中自主行动。从最初的视觉语言导航（VLN）和点目标导航（PointNav），到后来的物体目标导航（ObjectNav）、社交导航（SocialNav）、人类跟随（Human Following）和具身问答（EQA），任务类型越来越丰富。</p>\n<p>然而，一个关键矛盾正在浮现：<strong>算法越来越\"统一\"，评测却仍然\"孤立\"。</strong></p>\n<p>当前号称\"统一导航\"的模型（如 Uni-NaVid、OmniNav 等），在发布时往往需要在多个独立基准上分别测试——VLN 用 R2R，ObjectNav 用 HM3D-OVON，EQA 用 OpenEQA。这些基准之间没有任何交叉，每个评测只考察单一技能，完全无法验证一个关键问题：</p>\n<blockquote>\n<p><strong>当智能体需要在同一个任务中连续切换多种导航策略时，它还能正常工作吗？</strong></p>\n</blockquote>\n<p>更进一步，现有评测还存在两个系统性盲区：</p>\n<ul>\n<li><strong>行为真实性缺失</strong>：几乎所有基准都使用最短路径算法生成轨迹数据，这些\"完美路径\"缺少人类导航时天然的试探、犹豫和预判行为，导致模型学到的策略与真实部署场景严重脱节。</li>\n<li><strong>构型单一</strong>：评测通常只针对一种机器人形态（如轮式），无法预测同一算法在四足或人形机器人上的表现。</li>\n</ul>\n<p><strong>OmniNavBench 正是为解决这些问题而生。</strong></p>\n<blockquote>\n<p>原文链接：<a href=\"https://link.zhihu.com/?target=https%3A//mp.weixin.qq.com/s/JxPVGf6g6JdO42JIoyNO4w\">RSS’26最新！OmniNavBench：具身导航评测终于大一统了（上交&amp;无界动力）</a></p>\n</blockquote>\n<h3><strong>论文信息</strong></h3>\n<ul>\n<li><strong>论文标题</strong>：Beyond Isolation: A Unified Benchmark for General-Purpose Navigation</li>\n<li><strong>论文地址</strong>：<a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2605.09441\">https://arxiv.org/abs/2605.09441</a></li>\n<li><strong>项目主页</strong>：<a href=\"https://link.zhihu.com/?target=http%3A//omninavbench.cloud-ip.cc\">http://omninavbench.cloud-ip.cc</a></li>\n<li><strong>GitHub 代码库</strong>：<a href=\"https://link.zhihu.com/?target=https%3A//github.com/AutoLab-SAI-SJTU/OmniNavBench\">https://github.com/AutoLab-SAI-SJTU/OmniNavBench</a></li>\n</ul>\n<h2><strong><em>02.</em> OmniNavBench：一个怎样的基准？</strong></h2>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-a7918028a21f9b2280798a728ea85214_1440w.jpg\" /></p>\n<p>OmniNavBench 整体设计示意</p>\n<p>OmniNavBench 的核心理念可以用三个关键词概括：<strong>跨技能协同、跨构型泛化、人类级行为监督。</strong></p>\n<h3><strong>1）组合式指令： 在一个 episode 中串联多种导航技能</strong></h3>\n<p>与以往\"一个 episode 只测一个任务\"不同，OmniNavBench 构建了 组合式指令（Composite Instructions），每条指令至少包含两个异构子任务的有序组合。</p>\n<p>举个例子，一条典型指令可能是这样的：</p>\n<p><strong>\"跟随前方的人进入卧室；然后转身直行前往厨房，同时避开桌旁的女性；找到台面上的微波炉，告诉我旁边有几个锅。\"</strong></p>\n<p>这条指令一口气涉及了 <strong>Human Following → VLN → SocialNav（并行约束） → ObjectNav → EQA</strong>，智能体必须在时空上连续执行，不能各做各的。</p>\n<p>基准涵盖六种核心能力原语：</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-58fcb4e4d72984755dfe984714395140_1440w.jpg\" /></p>\n<p>子任务数量从 2 个到 4 个以上不等，形成从易到难的系统性难度梯度。</p>\n<h3><strong>2）多构型支持：同一指令，三种机器人</strong></h3>\n<p>OmniNavBench 构建于 NVIDIA Isaac Sim 之上，支持三种形态截然不同的机器人——轮式、四足、人形各一台：</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-15c93bc2e20c8849094fc9c2fdc49b45_1440w.jpg\" /></p>\n<p>同一个算法可以在三种构型上零修改地运行评测，直接暴露其对运动学差异和视角变化的泛化能力。平台同时支持 waypoint 级控制和速度指令级控制，并提供离散动作接口。</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-468c743d8a095a2614e84db3a9100bcf_1440w.jpg\" /></p>\n<p>三种机器人在不同场景中的视角</p>\n<h3><strong>3）人类遥操作轨迹：告别最短路径</strong></h3>\n<p>OmniNavBench 的 <strong>全部</strong>1,779 条专家轨迹均由人类遥操作采集，而非算法生成。轨迹平均长度 16.7 米，保留了人类导航时的试探性扫视、预判性避让等真实行为模式——这些细节恰恰是最短路径算法生成不出来的。</p>\n<p>研究表明，人类路径与最短路径在地标利用率等关键指标上存在显著差异（如 CityNav 中 36.3% vs 24.6%），这些行为细节对于训练鲁棒策略至关重要。</p>\n<h3><strong>4）大规模指令与场景</strong></h3>\n<p>在 1,779 条核心指令之上，借助 Qwen3-Max 生成了简洁版、第一人称版、详细版三种风格变体，总计 <strong>7,116 条</strong> 风格化指令，平均长度 42 词。场景方面，基准囊括 <strong>170 个场景</strong>——85 个 GRScenes 合成场景（家庭 + 商业）与 85 个 Matterport3D 真实世界扫描，覆盖从家居到办公的多种空间结构，支持跨域泛化评测。</p>\n<h2><strong><em>03.</em> 实验：现有\"统一\"模型的真实表现</strong></h2>\n<p>研究团队对四个代表性统一导航模型进行了零样本评测：<strong>PoliFormer</strong>（基于 Transformer 的强化学习）、<strong>Uni-NaVid</strong>（视觉-语言-动作生成）、<strong>MTU3D</strong>（导航与探索统一）和 <strong>OmniNav</strong>（共享连续 waypoint 抽象）。整体结果如下表所示，关键发现总结如下。</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-8e628784c6ac5a7152fd6929917217e0_1440w.jpg\" /></p>\n<p>SOTA 统一导航模型在三种机器人构型上的定量对比</p>\n<h3><strong>发现 1：全面的性能退化</strong></h3>\n<p>所有模型在 OmniNavBench 上的表现都远低于其在单任务基准上的声称水平。<strong>最高成功率仅 8.74%</strong>（OmniNav，Aliengo），大多数配置低于 2%。这种退化在三种构型上一致出现，说明这是一个根本性的能力缺陷，而非平台特异性问题。</p>\n<h3><strong>发现 2：子目标能完成，整体任务却失败</strong></h3>\n<p>Sub-Goal Completion（SGC）与 Success Rate（SR）之间的巨大落差极具启发性——Uni-NaVid 在 Aliengo 上 SGC 达到 44.54%，但 SR 仅有 1.96%。这意味着模型能在单个子任务上取得不错的进展，但 <strong>无法在一个连续 episode 中顺序执行多个异构任务。</strong>瓶颈不在单项技能，而在技能之间的衔接与切换。</p>\n<h3><strong>发现 3：导航到了目标附近，却不会停下来</strong></h3>\n<p>Oracle Success Rate（OSR）远高于 SR（如 Uni-NaVid：26.47% OSR vs 1.96% SR），说明智能体经常能物理上到达目标附近，但 <strong>无法正确发出终止信号</strong>——这是端到端导航在真实部署中的\"最后一厘米\"问题。</p>\n<h3><strong>发现 4：动态社交交互能力严重不足</strong></h3>\n<p>Human Follow Success（HFS）和 Human Follow Ratio（HFR）在所有配置中都偏低。最好的 HFS 为 45.16%（Uni-NaVid，Carter），但在足式机器人上急剧下降。Social Intrusion Index（SII）普遍偏高，表明智能体缺乏基本的社交距离意识。</p>\n<h3><strong>发现 5：对机器人构型高度敏感</strong></h3>\n<p>同一算法在不同构型上的表现差异巨大——OmniNav 在 Aliengo 上 SR 8.74%，在 Carter 上骤降至 1.96%，在人形 H1 上则直接归零。人形平台由于需要持续主动平衡，任何策略瑕疵都会被放大为摔倒（Fall Rate 60-80%），而非轮式平台上的温和停滞。</p>\n<h2><strong><em>04.</em> 指令风格的影响</strong></h2>\n<p>对 OmniNav 和 Uni-NaVid 的指令风格消融实验揭示了一个值得关注的现象：<strong>简洁版和第一人称版指令反而提升了成功率</strong>（如 OmniNav 从 8.74% 提升至 14.47%），而详细版表现持平或下降。这表明现有模型过拟合于特定句法模式，对语言多样性的泛化能力不足。</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-2b6bd05e3c29b67dcba33c649af39625_1440w.jpg\" /></p>\n<p>指令风格消融实验</p>\n<h2><strong><em>05.</em> 与现有基准的对比</strong></h2>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-9f5ccdaa353c20945f47b6689b766ae2_1440w.jpg\" /></p>\n<p>OmniNavBench 与现有导航基准的对比</p>\n<p>OmniNavBench 是目前唯一同时覆盖六种任务、支持跨构型评测、并基于人类专家轨迹构建的统一导航基准。</p>\n<h2><strong>总结与展望</strong></h2>\n<p>OmniNavBench 的实验结果传递了一个清晰的信号：<strong>当前号称\"统一\"的导航模型，在面对真正的跨技能、跨构型、长时程组合任务时，仍然存在根本性的能力缺口。</strong> 实验揭示了两个最关键的突破方向：</p>\n<ol>\n<li><strong>鲁棒的顺序任务进度追踪</strong>：模型需要在多步组合任务中可靠地追踪执行进度，实现技能间的流畅切换</li>\n<li><strong>可靠的终止决策</strong>：弥合\"到达目标\"与\"完成任务\"之间的鸿沟——导航到位了却不知道该停下来，是当前端到端导航最突出的\"最后一厘米\"问题</li>\n</ol>\n<p>更广泛地看，动态交互意识不足、构型适应性差、指令鲁棒性弱等问题同样亟待解决，这呼唤具备长时程推理能力的下一代通用导航智能体。</p>\n<h2>重磅！</h2>\n<p><strong><a href=\"https://link.zhihu.com/?target=https%3A//mp.weixin.qq.com/s/BtgU9JxEGL3yYusovl2Fkw\">全网首个！具身智能开源知识库来啦（技术/产业/投融资/上下游</a>）</strong></p>\n<h2>推荐阅读</h2>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//mp.weixin.qq.com/s/eW7-viOttqHarSnCLKQiRw\">我们用低成本的机械臂完成pi0/pi0.5/GR00T/世界模型等VLA任务～</a></p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//mp.weixin.qq.com/s/DqRSvmUS75MBY8zbXE20bQ\">VLA+RL方向首个系统教程来啦！Online RL/Offline RL/test time RL等～</a></p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//mp.weixin.qq.com/s/q42g5-dK-5CNliFEMlwQyw\">具身智能的WAM与世界模型一份完整指南～</a></p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//mp.weixin.qq.com/s/8XcrZ8jxQjyetLzQ1oBc-w\">一览具身智能的行业全局，从产品经理的角度出发！</a></p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//mp.weixin.qq.com/s/4K7QBk7ucXDvR-DLXk6DlA\">好用，高性价比！面向具身科研领域打造的轻量级机械臂</a></p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//mp.weixin.qq.com/s/x6p9VVtZXUdyBqVOnmUqcg\">VLA/VLA+触觉/VLA+RL/具身世界模型等！具身大脑+小脑算法与实战全栈路线来啦~</a></p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//mp.weixin.qq.com/s/foYf_g9PvFVDJG2jjQE_-A\">从零训练你的足式机器人！让你的足式机器人真正动起来~</a></p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//mp.weixin.qq.com/s/92oaQWQ18lNguDPgctIlSQ\">具身领域的目标导航到底是什么？有哪些主流方法？</a></p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//mp.weixin.qq.com/s/njFzj4OYGaKm0mDW1i6_uQ\">具身智能与传统机器人任务有什么区别？主流方案有哪些？</a></p>\n<h2>1v1 科研论文辅导来啦！</h2>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//mp.weixin.qq.com/s/RtB302pirMv6TMoGdX1MmQ\">重磅！具身智能之心论文辅导来啦（近20+方向，顶会/顶刊/SCI/EI/中文核心/申博等）</a></p>"
    }
  ],
  "graph": {
    "nodes": [
      {
        "id": "lsd-slam",
        "x": 100,
        "y": 150,
        "category": "slam"
      },
      {
        "id": "rtab-map",
        "x": 150,
        "y": 100,
        "category": "slam"
      },
      {
        "id": "orb-slam3",
        "x": 250,
        "y": 150,
        "category": "slam"
      },
      {
        "id": "sgs-slam",
        "x": 400,
        "y": 120,
        "category": "slam"
      },
      {
        "id": "neds-slam",
        "x": 500,
        "y": 100,
        "category": "slam"
      },
      {
        "id": "cg-slam",
        "x": 400,
        "y": 180,
        "category": "slam"
      },
      {
        "id": "gs3lam",
        "x": 500,
        "y": 140,
        "category": "slam"
      },
      {
        "id": "semgauss-slam",
        "x": 600,
        "y": 120,
        "category": "slam"
      },
      {
        "id": "opengs-slam",
        "x": 700,
        "y": 100,
        "category": "slam"
      },
      {
        "id": "sdd-slam",
        "x": 600,
        "y": 180,
        "category": "slam"
      },
      {
        "id": "resemgs-slam",
        "x": 800,
        "y": 110,
        "category": "slam"
      },
      {
        "id": "gts-slam",
        "x": 800,
        "y": 180,
        "category": "slam"
      },
      {
        "id": "cmp",
        "x": 120,
        "y": 280,
        "category": "visual_navigation"
      },
      {
        "id": "neural-slam",
        "x": 250,
        "y": 280,
        "category": "visual_navigation"
      },
      {
        "id": "vtnet",
        "x": 350,
        "y": 280,
        "category": "visual_navigation"
      },
      {
        "id": "vlmnav",
        "x": 800,
        "y": 280,
        "category": "visual_navigation"
      },
      {
        "id": "semexp",
        "x": 250,
        "y": 380,
        "category": "object_navigation"
      },
      {
        "id": "poni",
        "x": 350,
        "y": 380,
        "category": "object_navigation"
      },
      {
        "id": "cow",
        "x": 450,
        "y": 380,
        "category": "object_navigation"
      },
      {
        "id": "loat",
        "x": 600,
        "y": 360,
        "category": "object_navigation"
      },
      {
        "id": "goalvlm",
        "x": 700,
        "y": 380,
        "category": "object_navigation"
      },
      {
        "id": "ovsegdt",
        "x": 800,
        "y": 380,
        "category": "object_navigation"
      },
      {
        "id": "saycan",
        "x": 300,
        "y": 500,
        "category": "task_planning"
      },
      {
        "id": "code-as-policies",
        "x": 400,
        "y": 480,
        "category": "task_planning"
      },
      {
        "id": "llm-planner",
        "x": 400,
        "y": 520,
        "category": "task_planning"
      },
      {
        "id": "isr-llm",
        "x": 500,
        "y": 520,
        "category": "task_planning"
      },
      {
        "id": "fltrnn",
        "x": 600,
        "y": 520,
        "category": "task_planning"
      },
      {
        "id": "robohorizon",
        "x": 700,
        "y": 520,
        "category": "task_planning"
      },
      {
        "id": "castl",
        "x": 700,
        "y": 480,
        "category": "task_planning"
      },
      {
        "id": "llm-bt-planner",
        "x": 700,
        "y": 440,
        "category": "task_planning"
      },
      {
        "id": "openvla",
        "x": 400,
        "y": 630,
        "category": "vla_model"
      },
      {
        "id": "pi0",
        "x": 500,
        "y": 610,
        "category": "vla_model"
      },
      {
        "id": "openvla-2",
        "x": 700,
        "y": 630,
        "category": "vla_model"
      },
      {
        "id": "pi0-7",
        "x": 800,
        "y": 610,
        "category": "vla_model"
      },
      {
        "id": "gemini-robotics",
        "x": 700,
        "y": 670,
        "category": "vla_model"
      },
      {
        "id": "pokevla",
        "x": 700,
        "y": 590,
        "category": "vla_model"
      },
      {
        "id": "vla-an",
        "x": 800,
        "y": 670,
        "category": "vla_model"
      },
      {
        "id": "groot-n1",
        "x": 800,
        "y": 550,
        "category": "vla_model"
      }
    ],
    "edges": [
      {
        "from": "lsd-slam",
        "to": "orb-slam3",
        "label": "特征点法"
      },
      {
        "from": "orb-slam3",
        "to": "sgs-slam",
        "label": "3DGS革命"
      },
      {
        "from": "orb-slam3",
        "to": "cg-slam",
        "label": "不确定性"
      },
      {
        "from": "sgs-slam",
        "to": "neds-slam",
        "label": "神经编码"
      },
      {
        "from": "sgs-slam",
        "to": "gs3lam",
        "label": "抗遗忘"
      },
      {
        "from": "sgs-slam",
        "to": "semgauss-slam",
        "label": "稠密语义"
      },
      {
        "from": "semgauss-slam",
        "to": "opengs-slam",
        "label": "开放集"
      },
      {
        "from": "cg-slam",
        "to": "sdd-slam",
        "label": "动态场景"
      },
      {
        "from": "opengs-slam",
        "to": "resemgs-slam",
        "label": "实时一致"
      },
      {
        "from": "cg-slam",
        "to": "gts-slam",
        "label": "GICP融合"
      },
      {
        "from": "cmp",
        "to": "neural-slam",
        "label": "模块化"
      },
      {
        "from": "neural-slam",
        "to": "vtnet",
        "label": "Transformer"
      },
      {
        "from": "vtnet",
        "to": "vlmnav",
        "label": "VLM驱动"
      },
      {
        "from": "neural-slam",
        "to": "semexp",
        "label": "语义探索"
      },
      {
        "from": "semexp",
        "to": "poni",
        "label": "势函数"
      },
      {
        "from": "poni",
        "to": "cow",
        "label": "开放词汇"
      },
      {
        "from": "cow",
        "to": "loat",
        "label": "LLM常识"
      },
      {
        "from": "cow",
        "to": "goalvlm",
        "label": "VLM推理"
      },
      {
        "from": "goalvlm",
        "to": "ovsegdt",
        "label": "精确分割"
      },
      {
        "from": "saycan",
        "to": "code-as-policies",
        "label": "代码生成"
      },
      {
        "from": "saycan",
        "to": "llm-planner",
        "label": "动态规划"
      },
      {
        "from": "llm-planner",
        "to": "isr-llm",
        "label": "迭代精炼"
      },
      {
        "from": "isr-llm",
        "to": "fltrnn",
        "label": "双层验证"
      },
      {
        "from": "fltrnn",
        "to": "robohorizon",
        "label": "世界模型"
      },
      {
        "from": "isr-llm",
        "to": "castl",
        "label": "约束规范"
      },
      {
        "from": "code-as-policies",
        "to": "llm-bt-planner",
        "label": "行为树"
      },
      {
        "from": "openvla",
        "to": "pi0",
        "label": "跨具身"
      },
      {
        "from": "openvla",
        "to": "openvla-2",
        "label": "实时推理"
      },
      {
        "from": "pi0",
        "to": "pi0-7",
        "label": "可操控"
      },
      {
        "from": "openvla",
        "to": "gemini-robotics",
        "label": "高层推理"
      },
      {
        "from": "openvla",
        "to": "pokevla",
        "label": "轻量化"
      },
      {
        "from": "openvla",
        "to": "vla-an",
        "label": "垂直领域"
      },
      {
        "from": "pi0",
        "to": "groot-n1",
        "label": "双系统"
      },
      {
        "from": "vtnet",
        "to": "openvla",
        "label": "VLA统一"
      },
      {
        "from": "goalvlm",
        "to": "vlmnav",
        "label": "VLM导航"
      },
      {
        "from": "robohorizon",
        "to": "pi0-7",
        "label": "世界模型"
      },
      {
        "from": "opengs-slam",
        "to": "goalvlm",
        "label": "开放理解"
      }
    ],
    "milestones": [
      "orb-slam3",
      "saycan",
      "openvla"
    ]
  },
  "algos": [
    {
      "id": "lsd-slam",
      "num": 1,
      "name": "LSD-SLAM",
      "fullName": "大规模直接法单目SLAM (Large-Scale Direct Monocular SLAM)",
      "year": "2014",
      "org": "TUM",
      "parent": "—",
      "paperUrl": "https://vision.in.tum.de/research/vslam/lsdslam",
      "projectUrl": "",
      "category": "slam",
      "motivation": "半稠密直接法视觉SLAM",
      "summary": "LSD-SLAM 提出了一个完全直接法的单目 SLAM 系统，用图像灰度直接配准、半稠密逆深度滤波和 Sim(3) 关键帧位姿图，解决了单目系统在大尺度场景中既要实时建图又要校正尺度漂移的问题。",
      "keyPoints": [
        "<strong>直接法跟踪</strong>：不提取 ORB/SIFT 等关键点，直接最小化高梯度像素的光度误差来估计相机位姿",
        "<strong>半稠密地图</strong>：仅在有足够图像梯度的信息区域估计逆深度与方差，兼顾稠密几何表达和实时性",
        "<strong>概率深度滤波</strong>：通过多帧小基线 stereo 搜索不断更新每个像素的逆深度均值与不确定性",
        "<strong>关键帧地图</strong>：每个关键帧保存图像、半稠密逆深度图和深度方差，形成可复用的局部参考",
        "<strong>Sim(3) 约束</strong>：关键帧之间直接估计包含尺度的相似变换，使单目尺度漂移可以被显式检测和校正",
        "<strong>位姿图优化</strong>：将相邻关键帧与回环候选之间的 Sim(3) 约束放入图优化，得到全局一致的大尺度地图",
        "<strong>CPU 实时性</strong>：以半稠密区域和直接光度残差替代全像素稠密建模，可在普通 CPU 上实时运行"
      ],
      "detail": "<p><img alt=\"LSD-SLAM 直接法与关键点法对比\" src=\"https://cvg.cit.tum.de/_media/research/lsdslam/directvskp.png?w=1000&amp;tok=38dc9d\" />\n<em>图：TUM 项目页给出的直接法与关键点法对比。LSD-SLAM 利用边缘等高梯度像素，而不是只依赖角点附近的小块特征。</em></p>\n<pre><code class=\"language-python\"># LSD-SLAM 核心流程伪代码\ndef lsd_slam(monocular_video):\n    keyframes = []\n    pose_graph = Sim3PoseGraph()\n\n    for frame in monocular_video:\n        ref = select_current_keyframe(keyframes)\n\n        # 1. 直接法跟踪：只在半稠密像素上最小化光度误差\n        T_cr = direct_image_alignment(\n            image_ref=ref.image,\n            inv_depth=ref.inv_depth,\n            inv_depth_var=ref.inv_depth_var,\n            image_cur=frame.image,\n        )\n\n        # 2. 深度滤波：用小基线 stereo 更新参考关键帧的逆深度分布\n        update_inverse_depth_filter(ref, frame.image, T_cr)\n\n        # 3. 关键帧创建：视角变化或重叠下降时冻结当前深度图\n        if should_create_keyframe(frame, ref, T_cr):\n            new_kf = make_keyframe(frame)\n            initialize_depth_from_reference(new_kf, ref, T_cr)\n            keyframes.append(new_kf)\n\n            # 4. 对相邻/回环关键帧估计 Sim(3) 约束\n            for old_kf in find_candidates(new_kf, keyframes):\n                S = direct_sim3_alignment(new_kf, old_kf)\n                if is_consistent(S):\n                    pose_graph.add_edge(new_kf, old_kf, S)\n\n            # 5. 位姿图优化校正尺度漂移\n            pose_graph.optimize()\n\n    return pose_graph, keyframes\n</code></pre>\n<h5>动机与背景</h5>\n<p>在 LSD-SLAM 之前，单目 SLAM 主流路线多依赖特征点匹配，例如 PTAM 或 ORB 系列方法。这类方法在纹理丰富、角点明显的场景中很强，但会丢掉大量边缘和弱角点区域的信息；同时单目系统没有绝对尺度，长距离运行时会逐渐产生尺度漂移。另一方面，DTAM 这类直接稠密方法能利用更多像素，但计算量高，不适合大规模实时场景。</p>\n<p>LSD-SLAM 的关键取舍是“半稠密”：只在图像梯度足够大的像素上做直接跟踪和深度估计。这些像素提供稳定的光度约束，又远少于全图像素，因此可以在 CPU 上实时运行。系统不需要把每个像素都重建出来，而是把有几何信息的边缘、轮廓和纹理结构重建成半稠密点云。</p>\n<h5>直接法跟踪</h5>\n<p>给定参考关键帧 <span class=\"kb-math kb-math-inline\">K</span> 中一个半稠密像素 <span class=\"kb-math kb-math-inline\">p</span>、其逆深度 <span class=\"kb-math kb-math-inline\">d_p</span> 和当前帧位姿 <span class=\"kb-math kb-math-inline\">T</span>，系统先把该像素反投影到 3D，再投影到当前图像，直接比较灰度：</p>\n<div class=\"kb-math kb-math-display\">E(T)=\\sum_{p\\in\\Omega_D}\\rho\\left(\n\\frac{\\left(I_t(\\pi(T\\cdot \\pi^{-1}(p,d_p)))-I_K(p)\\right)^2}{\\sigma_p^2}\n\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\Omega_D</span> 是半稠密像素集合，<span class=\"kb-math kb-math-inline\">\\sigma_p^2</span> 来自深度和图像噪声传播，<span class=\"kb-math kb-math-inline\">\\rho</span> 是鲁棒核。直觉上，特征法先把图像压缩成离散描述子再匹配；LSD-SLAM 则把“当前帧应该长得像参考关键帧的重投影”作为优化目标，直接在像素强度上求位姿。</p>\n<h5>半稠密逆深度滤波</h5>\n<p>每个关键帧维护两张图：逆深度均值 <span class=\"kb-math kb-math-inline\">\\mu_{\\rho}</span> 和逆深度方差 <span class=\"kb-math kb-math-inline\">\\sigma_{\\rho}^2</span>。当新帧到来时，系统沿极线搜索匹配像素，得到一个新的逆深度观测，然后用类似贝叶斯滤波的方式更新分布。方差小的像素代表几何已经稳定，方差大的像素继续等待更多视角；如果一个观测与现有分布严重冲突，则会被鲁棒地降权。</p>\n<p>使用逆深度而不是深度本身，是因为单目小基线 stereo 对远处点的深度不确定性非常大，而逆深度在远处更加数值稳定。半稠密策略还会做边缘保持的空间正则化，让同一表面附近的逆深度估计更平滑，但避免跨过强边缘把不同物体混在一起。</p>\n<h5>Sim(3) 位姿图与尺度漂移校正</h5>\n<p>单目 SLAM 的特殊问题是尺度不可观。局部跟踪可以估计相对运动，但地图尺度会随时间漂移。LSD-SLAM 因此不只估计 SE(3) 刚体变换，还在关键帧之间估计 Sim(3)：</p>\n<div class=\"kb-math kb-math-display\">S =\n\\begin{bmatrix}\nsR &amp; t \\\\\n0 &amp; 1\n\\end{bmatrix},\n\\quad s&gt;0</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">s</span> 是关键帧间的尺度因子。每当系统创建新关键帧，就把它与相邻关键帧、候选回环关键帧做直接 Sim(3) 对齐，生成图约束。图优化会在全局传播这些约束，使回环处发现的尺度误差反馈到整条轨迹。</p>\n<div class=\"key-point\">💡 关键：LSD-SLAM 的“large-scale”并不是来自更稠密的地图，而是来自 Sim(3) 关键帧图。半稠密直接跟踪负责局部精度，Sim(3) 图优化负责长程一致性。</div>\n<h5>与传统特征 SLAM 的区别</h5>\n<p>LSD-SLAM 不依赖可重复检测的角点，因此在只有边缘、纹理连续但角点较少的场景中能利用更多图像信息。代价是它对光照一致性、曝光变化和运动模糊更敏感，因为核心残差直接来自像素强度。与后来的 ORB-SLAM3 相比，LSD-SLAM 的地图表达更密、可视化更直观，但缺少成熟的多传感器融合、Atlas 多地图管理和特征级重定位机制。</p>",
      "quiz": {
        "q": "LSD-SLAM 为什么在关键帧图中使用 Sim(3) 约束而不只使用 SE(3) 约束？",
        "options": [
          "为了把相机内参也一起优化",
          "为了显式估计并校正单目 SLAM 中累积的尺度漂移",
          "为了减少每个关键帧保存的半稠密深度点数量",
          "为了让系统可以直接处理 LiDAR 点云"
        ],
        "answer": 1,
        "explain": "单目 SLAM 没有绝对尺度，长时间运行会出现尺度漂移。Sim(3) 在旋转和平移之外包含尺度因子，适合把回环检测到的尺度误差放入位姿图优化。"
      }
    },
    {
      "id": "rtab-map",
      "num": 2,
      "name": "RTAB-MAP",
      "fullName": "实时外观建图 (Real-Time Appearance-Based Mapping)",
      "year": "2019",
      "org": "Laval University",
      "parent": "—",
      "paperUrl": "https://onlinelibrary.wiley.com/doi/abs/10.1002/rob.21831",
      "projectUrl": "",
      "category": "slam",
      "motivation": "外观闭环大规模长期在线SLAM",
      "summary": "RTAB-Map 将外观词袋闭环检测、图优化和 STM/WM/LTM 记忆管理组合成一个长期在线 SLAM 框架，解决了大规模运行时闭环检测和地图更新计算量随地图无限增长的问题。",
      "keyPoints": [
        "<strong>外观闭环检测</strong>：使用视觉词袋估计当前观测与历史位置的相似度，发现重访位置",
        "<strong>图式 SLAM 后端</strong>：节点保存传感器数据和里程计位姿，边表示邻接、闭环与近邻约束",
        "<strong>记忆管理机制</strong>：将节点划分为 Short-Term Memory、Working Memory、Long-Term Memory，以固定时间预算处理长期运行",
        "<strong>多传感器输入</strong>：支持 RGB-D、双目、2D LiDAR、3D LiDAR、外部 odometry、IMU 等组合",
        "<strong>ROS 工程化输出</strong>：直接发布 MapData、MapGraph、/map→/odom 校正、OctoMap、点云和 2D occupancy grid",
        "<strong>多会话建图</strong>：机器人重启或进入已有地图时，可通过闭环将新会话地图与旧地图对齐",
        "<strong>长期在线约束</strong>：当处理时间或工作记忆节点数超过阈值时，将低权重节点转入长期记忆，保持实时性"
      ],
      "detail": "<p><img alt=\"RTAB-Map ROS 主节点输入输出\" src=\"https://arxiv.org/html/2403.06341v1/x1.png\" />\n<em>图：RTAB-Map 的 rtabmap 主节点。外部 odometry、相机/LiDAR 数据同步后进入图式 SLAM，输出图、点云、OctoMap、2D 栅格和 map 到 odom 的校正。</em></p>\n<pre><code class=\"language-python\"># RTAB-Map 核心流程伪代码\ndef rtab_map(sensor_stream, odometry_stream):\n    graph = PoseGraph()\n    STM, WM, LTM = ShortTermMemory(), WorkingMemory(), LongTermMemory()\n\n    for synced_obs, odom in synchronize(sensor_stream, odometry_stream):\n        # 1. 创建节点：保存原始传感器、局部栅格、视觉词等\n        node = STM.create_node(obs=synced_obs, pose=odom.pose)\n        graph.add_neighbor_edge(previous_node(), node, odom.delta)\n\n        # 2. 与工作记忆中的节点做外观闭环和空间近邻检测\n        visual_words = extract_bow(node)\n        loop = detect_loop_closure(visual_words, WM)\n        proximity = detect_proximity(node, WM)\n\n        if loop.accepted:\n            graph.add_loop_edge(node, loop.node, loop.transform)\n        if proximity.accepted:\n            graph.add_proximity_edge(node, proximity.node, proximity.transform)\n\n        # 3. 图优化传播闭环误差\n        if loop.accepted or proximity.accepted:\n            graph.optimize()\n            recall_neighbors_from_LTM(loop.node, LTM, WM)\n\n        # 4. 根据时间/容量阈值做记忆管理\n        WM.add(node)\n        while update_time_too_high() or WM.too_large():\n            old = select_low_weight_old_node(WM)\n            WM.move_to_LTM(old, LTM)\n\n        # 5. 发布可导航地图\n        publish_map_graph(graph)\n        publish_occupancy_grid(assemble_local_grids(graph, WM))\n</code></pre>\n<h5>动机与背景</h5>\n<p>RTAB-Map 最初不是一个单纯的视觉里程计，而是为“长期在线建图”设计的外观闭环系统。普通图式 SLAM 随着节点越来越多，会在闭环检测、图优化和地图拼接上越来越慢；如果机器人要在建筑物、校园或工厂里持续运行，系统必须在固定时间预算内输出可用地图，而不是等全部历史节点都参与计算。</p>\n<p>论文扩展版强调 RTAB-Map 的工程目标：让同一个框架支持视觉 SLAM、LiDAR SLAM 以及混合传感器配置，并直接服务 ROS 导航。它把 odometry 作为外部输入，因此前端既可以是视觉里程计，也可以是 LiDAR scan matching、轮速计/IMU 融合或其他系统输出。</p>\n<h5>图结构与节点内容</h5>\n<p>RTAB-Map 的地图是一个位姿图。每个节点代表一个时间点或关键观测，保存 odometry 位姿、原始传感器数据、局部 occupancy grid、视觉词袋等信息。边分为三类：相邻边连接连续节点，闭环边连接外观上匹配的历史位置，近邻边连接空间上接近但未必由外观闭环触发的位置。</p>\n<p>当闭环或近邻约束加入图中时，后端执行图优化，把 odometry 漂移分配到整张图上。优化后系统重新组合局部栅格、点云或 OctoMap，并通过 <code>/map -&gt; /odom</code> 变换发布全局校正，使下游导航模块获得一致坐标系。</p>\n<h5>外观闭环与词袋检索</h5>\n<p>RTAB-Map 的核心闭环检测来自 appearance-based retrieval。当前图像被转换成视觉词集合 <span class=\"kb-math kb-math-inline\">W_t</span>，历史节点也保存各自的视觉词，系统计算当前观测属于历史位置的概率或相似度：</p>\n<div class=\"kb-math kb-math-display\">s(i,t)=\\text{sim}(W_i, W_t)</div>\n<p>相似度最高的候选不会直接成为闭环，还需要几何验证来估计相对变换。通过验证后，闭环边才会加入图中。这样可以降低重复纹理、光照变化或动态物体造成的误匹配风险。</p>\n<h5>STM / WM / LTM 记忆管理</h5>\n<p>RTAB-Map 最有辨识度的设计是记忆分层。Short-Term Memory 负责刚进入系统的新节点；Working Memory 包含当前可用于闭环检测、近邻检测和地图组装的活跃节点；Long-Term Memory 保存暂时被转出的旧节点。系统根据时间阈值 <code>Rtabmap/TimeThr</code> 或容量阈值 <code>Rtabmap/MemoryThr</code> 控制 WM 大小。</p>\n<p>节点是否留在 WM 由权重机制决定。反复被观察到、与邻近节点外观相似、对定位更有价值的位置权重较高；低权重且较老的节点会优先转入 LTM。当机器人重新进入某个旧区域并发生闭环时，闭环节点附近的 LTM 节点可以被召回到 WM，逐步恢复历史地图。</p>\n<div class=\"key-point\">💡 关键：RTAB-Map 并不是简单丢弃旧地图，而是在“实时计算预算”和“长期记忆”之间做动态交换。闭环会触发记忆召回，使系统既在线又能长期定位。</div>\n<h5>与传统视觉 SLAM 的区别</h5>\n<p>ORB-SLAM2 等系统强调特征跟踪、局部 BA 和稀疏地图，常常没有直接可用于导航的 2D/3D occupancy 输出。RTAB-Map 更像一个工程化 SLAM 中枢：前端 odometry 可替换，后端闭环与图优化稳定，输出直接适配导航栅格和点云。它的创新不在单个特征描述子，而在长期运行时的闭环、记忆管理和多传感器统一。</p>",
      "quiz": {
        "q": "RTAB-Map 中 Working Memory 转入 Long-Term Memory 的主要目的是什么？",
        "options": [
          "提高相机图像分辨率",
          "把闭环检测、图优化和地图组装限制在实时可处理规模内",
          "让所有历史节点永远参与每次匹配",
          "完全删除旧地图以节省磁盘空间"
        ],
        "answer": 1,
        "explain": "RTAB-Map 通过 STM/WM/LTM 控制活跃节点数量，使长期在线运行时每次更新仍能满足固定时间预算；旧节点可在闭环时从 LTM 召回。"
      }
    },
    {
      "id": "orb-slam3",
      "num": 3,
      "name": "ORB-SLAM3",
      "fullName": "多地图视觉惯性SLAM (Multi-Map Visual-Inertial SLAM)",
      "year": "2021",
      "org": "U.Zaragoza",
      "parent": "lsd-slam",
      "paperUrl": "https://ieeexplore.ieee.org/document/9440682",
      "projectUrl": "",
      "category": "slam",
      "motivation": "多传感器融合统一SLAM框架",
      "summary": "ORB-SLAM3 提出了首个支持单目/双目/RGB-D 相机与 IMU 融合的多地图视觉惯性 SLAM 系统，通过基于最大后验（MAP）估计的 IMU 初始化、改进召回率的位置识别算法和 Atlas 多地图架构，在所有传感器配置下实现了当时最高的定位精度与鲁棒性。",
      "keyPoints": [
        "<strong>统一多传感器框架</strong>：支持单目、双目、RGB-D 三种相机类型，以及纯视觉与视觉-惯性两种模式，共 6 种传感器配置",
        "<strong>抽象相机模型</strong>：将 SLAM 代码与相机模型解耦，支持针孔（pinhole）和鱼眼（fisheye）镜头，可通过提供投影/反投影/雅可比函数扩展新模型",
        "<strong>基于 MAP 估计的 IMU 初始化</strong>：摒弃传统代数求解方法，在纯视觉 SLAM 基础上通过惯性-only MAP 优化联合估计尺度、重力方向和 IMU 偏置，2 秒内达到 5% 尺度误差，15 秒收敛至 1%",
        "<strong>改进召回率的位置识别</strong>：将 DBoW2 的\"时间一致性→几何一致性\"流程改为\"几何一致性→局部一致性（3 个共视关键帧验证）\"，显著提升召回率",
        "<strong>Atlas 多地图系统</strong>：维护一组可能不连通的子地图，跟踪丢失时创建新地图，重访时无缝合并，实现增量式多会话 SLAM",
        "<strong>四类数据关联</strong>：短期（连续帧）、中期（局部共视区域）、长期（回环/重定位）、多地图（跨地图合并）",
        "<strong>实验精度</strong>：双目-惯性模式在 EuRoC 数据集上平均精度 3.5 cm，在 TUM-VI 数据集上达到 9 mm"
      ],
      "detail": "<p><img alt=\"ORB-SLAM3 系统架构图\" src=\"https://ar5iv.labs.arxiv.org/html/2007.11898v2/assets/x1.png\" />\n<em>图：ORB-SLAM3 系统总览。系统由 Atlas 数据结构和三个并行线程（Tracking、Local Mapping、Loop &amp; Map Merging）组成，支持纯视觉和视觉-惯性两种模式。</em></p>\n<pre><code class=\"language-python\"># ORB-SLAM3 核心流程伪代码\ndef orb_slam3_pipeline(sensor_stream, imu_stream=None):\n    atlas = Atlas()                          # 多地图管理器\n    active_map = atlas.create_new_map()      # 初始化活跃地图\n\n    for frame in sensor_stream:\n        # ===== Tracking Thread =====\n        # 1. ORB 特征提取 + 短期数据关联\n        features = extract_orb(frame)\n        pose = track_local_map(features, active_map)\n\n        if tracking_lost:\n            if imu_available and short_term_lost:\n                # IMU 预测位姿，投影地图点搜索匹配\n                pose = imu_predict_and_recover(imu_stream, active_map)\n            else:\n                # 长期丢失：创建新地图\n                active_map = atlas.create_new_map()\n                if imu_available:\n                    initialize_visual_inertial(active_map)\n                continue\n\n        if is_keyframe(frame):\n            KF = create_keyframe(frame, pose)\n            # ===== Local Mapping Thread =====\n            local_bundle_adjustment(KF, active_map)  # 局部 BA\n            if imu_available and not map_mature:\n                imu_initialization_refinement(active_map)  # 尺度/重力优化\n\n            # ===== Loop &amp; Map Merging Thread =====\n            Km = place_recognition(KF, atlas)  # DBoW2 + 几何验证\n            if Km is not None:\n                if Km.map == active_map:\n                    loop_closing(KF, Km, active_map)      # 回环校正\n                else:\n                    map_merging(KF, Km, atlas)             # 多地图合并\n</code></pre>\n<p><strong>动机与背景：从视觉里程计到完整 SLAM</strong></p>\n<p>传统视觉里程计（VO）系统仅利用最近几秒的观测进行位姿估计，一旦离开已观测区域便会产生不可逆的累积漂移。即使引入回环检测的 VO 系统，也仅通过位姿图优化进行粗粒度校正，无法充分利用中期数据关联（即对已建图但暂时离开视野的区域的重观测）。ORB-SLAM3 的核心动机是构建一个能够在算法所有阶段（跟踪、建图、回环、重定位）充分利用所有历史信息的完整 SLAM 系统。与前代 ORB-SLAM2 相比，ORB-SLAM3 新增了视觉-惯性紧耦合、多地图管理和改进的位置识别三大能力，使其能够在复杂真实环境中实现厘米级甚至毫米级定位精度。</p>\n<p><strong>核心机制一：基于 MAP 估计的视觉-惯性 SLAM</strong></p>\n<p>ORB-SLAM3 的视觉-惯性模块采用 IMU 预积分理论将高频 IMU 测量压缩为关键帧间的相对运动约束。给定关键帧 <span class=\"kb-math kb-math-inline\">i</span> 和 <span class=\"kb-math kb-math-inline\">j</span> 之间的 IMU 测量序列，预积分量定义为：</p>\n<div class=\"kb-math kb-math-display\">\\Delta \\mathbf{R}_{ij} = \\prod_{k=i}^{j-1} \\text{Exp}\\big((\\boldsymbol{\\omega}_k - \\mathbf{b}^g_i)\\Delta t\\big)</div>\n<div class=\"kb-math kb-math-display\">\\Delta \\mathbf{v}_{ij} = \\sum_{k=i}^{j-1} \\Delta \\mathbf{R}_{ik} \\cdot (\\mathbf{a}_k - \\mathbf{b}^a_i)\\Delta t</div>\n<div class=\"kb-math kb-math-display\">\\Delta \\mathbf{p}_{ij} = \\sum_{k=i}^{j-1} \\left[\\Delta \\mathbf{v}_{ik}\\Delta t + \\frac{1}{2}\\Delta \\mathbf{R}_{ik}(\\mathbf{a}_k - \\mathbf{b}^a_i)\\Delta t^2\\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\boldsymbol{\\omega}_k</span> 和 <span class=\"kb-math kb-math-inline\">\\mathbf{a}_k</span> 分别为陀螺仪和加速度计测量值，<span class=\"kb-math kb-math-inline\">\\mathbf{b}^g</span> 和 <span class=\"kb-math kb-math-inline\">\\mathbf{b}^a</span> 为对应偏置。视觉-惯性 BA 的目标函数联合优化关键帧位姿、速度、IMU 偏置和地图点位置：</p>\n<div class=\"kb-math kb-math-display\">\\min_{\\mathcal{X}} \\sum_{(i,j)\\in\\mathcal{K}} \\|\\mathbf{e}^{\\text{IMU}}_{ij}\\|^2_{\\boldsymbol{\\Sigma}^{\\text{IMU}}_{ij}} + \\sum_{(i,l)\\in\\mathcal{C}} \\rho_H\\left(\\|\\mathbf{e}^{\\text{proj}}_{il}\\|^2_{\\boldsymbol{\\Sigma}^{\\text{proj}}_{il}}\\right) + \\|\\mathbf{e}^{\\text{prior}}\\|^2_{\\boldsymbol{\\Sigma}^{\\text{prior}}}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{e}^{\\text{IMU}}_{ij}</span> 为 IMU 预积分残差，<span class=\"kb-math kb-math-inline\">\\mathbf{e}^{\\text{proj}}_{il}</span> 为视觉重投影误差，<span class=\"kb-math kb-math-inline\">\\rho_H</span> 为 Huber 鲁棒核函数，先验项编码被边缘化关键帧的信息。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：与之前 ORB-SLAM-VI 需要 15 秒才能获得首次尺度估计不同，ORB-SLAM3 的 IMU 初始化完全基于 MAP 估计——先用纯视觉 SLAM 构建初始地图，然后通过惯性-only 优化联合求解尺度因子 <span class=\"kb-math kb-math-inline\">s</span>、重力方向 <span class=\"kb-math kb-math-inline\">\\mathbf{R}_{wg}</span>、速度和偏置，仅需 2 秒即可达到 5% 尺度误差。之后在第 5 秒和第 15 秒分别执行视觉-惯性 BA 进一步精化，收敛至 1% 误差后地图标记为\"成熟\"（mature）。</div>\n<p><strong>核心机制二：改进召回率的位置识别</strong></p>\n<p>传统 DBoW2 位置识别要求候选关键帧在<strong>连续 3 帧</strong>中都被检测到（时间一致性），然后才进行几何验证。这种策略虽然保证了高精确率，但严重牺牲了召回率（仅 30-40%），导致回环检测延迟甚至遗漏。ORB-SLAM3 提出了一种新的验证流程：</p>\n<ol>\n<li><strong>DBoW2 查询</strong>：对每个新关键帧 <span class=\"kb-math kb-math-inline\">K_a</span>，查询 Atlas 数据库返回最相似的 3 个候选 <span class=\"kb-math kb-math-inline\">K_m</span>（排除共视关键帧）</li>\n<li><strong>局部窗口构建</strong>：以 <span class=\"kb-math kb-math-inline\">K_m</span> 及其共视关键帧和对应地图点构成局部窗口</li>\n<li><strong>3D 对齐变换</strong>：使用 RANSAC + Horn 算法从 3D-3D 匹配中计算对齐变换 <span class=\"kb-math kb-math-inline\">\\mathbf{T}_{am}</span>（纯单目为 <span class=\"kb-math kb-math-inline\">\\text{Sim}(3)</span>，其余为 <span class=\"kb-math kb-math-inline\">\\text{SE}(3)</span>）</li>\n<li><strong>引导匹配精化</strong>：利用 <span class=\"kb-math kb-math-inline\">\\mathbf{T}_{am}</span> 双向投影搜索更多匹配，非线性优化精化变换</li>\n<li><strong>共视关键帧验证</strong>：在活跃地图中搜索与 <span class=\"kb-math kb-math-inline\">K_a</span> 共视的 2 个关键帧，验证它们与局部窗口的匹配数是否超过阈值——<strong>无需等待后续帧</strong>，因为验证所需信息通常已在地图中</li>\n<li><strong>重力方向验证</strong>（视觉-惯性模式）：检查 pitch 和 roll 角是否在阈值内</li>\n</ol>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：关键创新在于将\"时间一致性\"替换为\"局部一致性\"——利用已有地图中的共视关键帧进行验证，而非等待未来帧。这使得位置识别可以在单帧触发后立即完成验证，显著提升了召回率和响应速度。</div>\n<p><strong>核心机制三：Atlas 多地图系统与无缝地图合并</strong></p>\n<p>Atlas 是 ORB-SLAM3 的核心数据结构，维护一组可能不连通的子地图。系统始终有一个\"活跃地图\"用于实时跟踪和建图。当跟踪丢失且短期 IMU 恢复失败时，系统创建新的活跃地图而非停止运行。当位置识别检测到当前关键帧与另一子地图中的关键帧匹配时，触发地图合并：</p>\n<ol>\n<li><strong>焊接窗口（Welding Window）组装</strong>：以匹配关键帧对 <span class=\"kb-math kb-math-inline\">(K_a, K_m)</span> 的共视关键帧和地图点构成焊接窗口，将 <span class=\"kb-math kb-math-inline\">M_a</span> 中的元素通过 <span class=\"kb-math kb-math-inline\">\\mathbf{T}_{ma}</span> 变换对齐到 <span class=\"kb-math kb-math-inline\">M_m</span> 坐标系</li>\n<li><strong>地图融合</strong>：在焊接窗口内搜索重复地图点并合并（保留 <span class=\"kb-math kb-math-inline\">M_m</span> 中的点，累积 <span class=\"kb-math kb-math-inline\">M_a</span> 点的所有观测），更新共视图和本质图</li>\n<li><strong>焊接窗口 BA</strong>：对焊接窗口内的关键帧和地图点执行局部 BA（视觉-惯性模式下包含 IMU 约束）</li>\n<li><strong>位姿图优化传播</strong>：通过本质图（Essential Graph）将校正传播到焊接窗口外的所有关键帧</li>\n<li><strong>全局 BA</strong>（可选）：在后台线程执行全局 Bundle Adjustment 进一步精化整个合并后的地图</li>\n</ol>\n<p>这种设计使得 ORB-SLAM3 能够在长时间运行中自然处理跟踪丢失、场景切换和重访等情况，实现真正的增量式多会话 SLAM。</p>\n<p><strong>与前代系统的关键区别</strong></p>\n<p>相比 ORB-SLAM2，ORB-SLAM3 的主要改进包括：（1）新增视觉-惯性紧耦合模式，通过 MAP 估计实现快速准确的 IMU 初始化；（2）Atlas 多地图架构替代单一地图，消除了跟踪丢失导致系统失败的问题；（3）改进的位置识别算法将召回率从 30-40% 大幅提升；（4）抽象相机接口支持鱼眼等非针孔模型。实验表明，在 EuRoC 数据集上，ORB-SLAM3 双目-惯性模式平均 ATE 为 3.5 cm，在 TUM-VI 数据集的手持快速运动场景下达到 9 mm，比同期最优系统精确 2-10 倍。</p>",
      "quiz": {
        "q": "ORB-SLAM3 的位置识别相比传统 DBoW2 方法，最关键的改进是什么？",
        "options": [
          "使用了更大的视觉词汇表来提升匹配精度",
          "将时间一致性验证替换为基于共视关键帧的局部一致性验证，提升召回率",
          "引入深度学习特征替代 ORB 描述子进行图像检索",
          "要求连续 5 帧而非 3 帧的时间一致性以提升精确率"
        ],
        "answer": 1,
        "explain": "ORB-SLAM3 的关键创新在于用局部一致性（利用地图中已有的共视关键帧验证）替代时间一致性（等待连续 3 帧触发），从而在保持 100% 精确率的同时显著提升召回率，加速回环检测和地图合并。"
      }
    },
    {
      "id": "sgs-slam",
      "num": 4,
      "name": "SGS-SLAM",
      "fullName": "语义高斯泼溅SLAM (Semantic Gaussian Splatting SLAM)",
      "year": "2024",
      "org": "ECCV 2024",
      "parent": "orb-slam3",
      "paperUrl": "https://link.springer.com/chapter/10.1007/978-3-031-72751-1_10",
      "projectUrl": "",
      "category": "slam",
      "motivation": "语义高斯泼溅多通道渲染",
      "summary": "SGS-SLAM 提出了首个基于 3D Gaussian Splatting 的语义视觉 SLAM 系统，通过 RGB、深度和语义通道的联合可微渲染优化，解决了 NeRF-SLAM 语义边界过平滑、渲染慢和物体级几何不清晰的问题。",
      "keyPoints": [
        "<strong>多通道高斯表示</strong>：每个 Gaussian 同时携带几何、颜色和语义颜色/标签通道，用同一 splatting 管线渲染 RGB、深度、语义图",
        "<strong>语义特征损失</strong>：把 2D 语义先验映射到 3D 场景，在 mapping loss 中联合优化，提升物体边缘和语义一致性",
        "<strong>直接高斯渲染跟踪</strong>：固定 3D Gaussian 地图，只优化当前相机位姿，使渲染图像、深度和语义与输入对齐",
        "<strong>语义引导关键帧选择</strong>：先用几何重叠筛选候选，再用语义 mIoU 去除语义重复视角，减少累积误差导致的错误重建",
        "<strong>不确定性加权关键帧</strong>：对较晚关键帧设置更高不确定性权重，缓解跟踪误差随时间累积对建图的影响",
        "<strong>物体级编辑能力</strong>：语义通道使系统能定位和操作特定物体高斯，作为下游场景编辑与对象级理解基础",
        "<strong>实时渲染优势</strong>：相比隐式 NeRF 体渲染，3DGS 的 rasterization 让语义、深度和颜色渲染更适合在线 SLAM"
      ],
      "detail": "<p><img alt=\"SGS-SLAM 系统示意\" src=\"https://arxiv.org/html/2402.03246v6/extracted/6021012/figures/abstract.png\" />\n<em>图：SGS-SLAM 将 RGB-D 和 2D 语义先验输入到 Gaussian Splatting 表示中，通过多通道可微渲染联合优化外观、几何和语义。</em></p>\n<pre><code class=\"language-python\"># SGS-SLAM 核心流程伪代码\ndef sgs_slam(rgbd_stream, semantic_stream):\n    gaussians = initialize_from_first_frame(rgbd_stream[0], semantic_stream[0])\n    keyframes = []\n\n    for frame, semantic in zip(rgbd_stream, semantic_stream):\n        # 1. Tracking：冻结高斯，只优化当前相机位姿\n        pose = constant_velocity_init()\n        for _ in range(num_tracking_iters):\n            rgb_hat, depth_hat, sem_hat, silhouette = render(gaussians, pose)\n            loss = visible(silhouette) * (\n                l_rgb(rgb_hat, frame.rgb)\n                + l_depth(depth_hat, frame.depth)\n                + l_semantic(sem_hat, semantic)\n            )\n            pose = update_pose(pose, loss)\n\n        # 2. Keyframe：几何重叠 + 语义差异选择有价值视角\n        if is_keyframe(frame, pose):\n            keyframes.append((frame, semantic, pose))\n        selected = semantic_guided_keyframe_selection(keyframes, frame, semantic)\n\n        # 3. Mapping：冻结位姿，优化高斯颜色/深度/语义通道\n        for kf in selected:\n            rgb_hat, depth_hat, sem_hat, silhouette = render(gaussians, kf.pose)\n            map_loss = l_rgb(rgb_hat, kf.rgb) + l_depth(depth_hat, kf.depth)\n            map_loss += l_semantic(sem_hat, kf.semantic)\n            gaussians = optimize_gaussians(gaussians, map_loss, weight=kf.uncertainty)\n\n        # 4. 对低覆盖区域补充新高斯\n        add_gaussians_where_silhouette_low(gaussians, frame, semantic, pose)\n\n    return gaussians, keyframes\n</code></pre>\n<h5>动机与背景</h5>\n<p>NeRF 系列 SLAM 用 MLP 表示场景，具有连续表面和新视角合成能力，但在线 SLAM 中体渲染代价高，并且 MLP 容易把物体边界过度平滑。语义 SLAM 更需要清晰的对象边界，因为导航、操作和场景编辑都依赖“这个高斯属于哪类物体”而不是只看 RGB 逼真度。</p>\n<p>SGS-SLAM 的关键观察是：3D Gaussian Splatting 的显式点状 primitives 可以直接增加新通道。标准 3DGS 渲染颜色和深度，SGS-SLAM 进一步给高斯增加语义通道，使语义图也通过前向 α-blending 被渲染出来，再与 2D 语义先验做监督。</p>\n<h5>多通道 Gaussian 表示</h5>\n<p>每个高斯可写成：</p>\n<div class=\"kb-math kb-math-display\">G_i=\\{\\mu_i, r_i, \\alpha_i, c_i, s_i\\}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mu_i</span> 是中心位置，<span class=\"kb-math kb-math-inline\">r_i</span> 是尺度或半径，<span class=\"kb-math kb-math-inline\">\\alpha_i</span> 是不透明度，<span class=\"kb-math kb-math-inline\">c_i</span> 是 RGB 颜色，<span class=\"kb-math kb-math-inline\">s_i</span> 是语义颜色或语义编码。渲染时，系统将高斯投影到图像平面，并按深度从近到远做前向合成：</p>\n<div class=\"kb-math kb-math-display\">\\hat{C}(p)=\\sum_i T_i(p)\\alpha_i(p)c_i,\\quad\n\\hat{S}(p)=\\sum_i T_i(p)\\alpha_i(p)s_i</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">T_i(p)=\\prod_{j&lt;i}(1-\\alpha_j(p))</span> 是前方高斯的透射率。RGB、深度和语义使用同一可微可见性结构，因此语义损失会影响高斯几何和可见性，不只是训练一个后处理分割器。</p>\n<h5>Tracking 与 Mapping 解耦</h5>\n<p>跟踪阶段固定 Gaussian 地图，只优化相机位姿。损失函数由可见区域上的 RGB、深度和语义残差组成：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{track} =\n\\lambda_c\\mathcal{L}_{rgb}\n+\\lambda_d\\mathcal{L}_{depth}\n+\\lambda_s\\mathcal{L}_{sem}</div>\n<p>系统只在 silhouette 足够大的像素上计算残差，避免尚未重建区域给位姿优化提供错误梯度。mapping 阶段则固定关键帧位姿，优化 Gaussian 的位置、颜色、不透明度和语义通道，并在低覆盖区域添加新高斯。</p>\n<h5>语义引导关键帧选择</h5>\n<p>普通 3DGS-SLAM 常按时间间隔或几何共视选择关键帧，容易反复优化语义高度重复的视角。SGS-SLAM 先估计当前帧与候选关键帧的几何 overlap，再计算语义图之间的 mIoU。若两个视角语义内容几乎相同，即便几何重叠高，也可能对优化贡献有限；系统更偏好几何相关但语义信息互补的关键帧。</p>\n<p>这个机制的直觉是：建图不仅要“看见同一块墙”，还要从不同语义布局中理解物体边界。语义差异较大的关键帧能补充对象级几何，减少因早期位姿误差或局部过拟合造成的错误重建。</p>\n<div class=\"key-point\">💡 关键：SGS-SLAM 把语义从后处理标签变成参与高斯优化的通道。语义损失反过来约束几何，提升物体级边界质量。</div>\n<h5>与 SemGauss-SLAM 的区别</h5>\n<p>SGS-SLAM 更强调语义颜色/标签通道的多通道渲染和语义引导关键帧选择；后续 SemGauss-SLAM 则把语义表示进一步改为 DINOv2 语义特征 embedding，并提出 semantic-informed bundle adjustment。两者都属于 3DGS 语义 SLAM，但 SGS-SLAM 是把 3DGS 带入语义 SLAM 的早期代表。</p>",
      "quiz": {
        "q": "SGS-SLAM 中语义引导关键帧选择的核心作用是什么？",
        "options": [
          "只保留语义图完全相同的关键帧以减少噪声",
          "结合几何重叠与语义差异，选择对物体级建图更有信息量的视角",
          "用语义分割结果替代所有 RGB 和深度监督",
          "把所有关键帧都转入长期记忆以降低显存"
        ],
        "answer": 1,
        "explain": "SGS-SLAM 先筛选几何相关视角，再避免语义高度重复的关键帧，从而提升语义边界和对象级几何优化质量。"
      }
    },
    {
      "id": "neds-slam",
      "num": 5,
      "name": "NEDS-SLAM",
      "fullName": "神经显式稠密语义SLAM (Neural Explicit Dense Semantic SLAM)",
      "year": "2024",
      "org": "IEEE RA-L",
      "parent": "sgs-slam",
      "paperUrl": "https://ieeexplore.ieee.org/document/10654515",
      "projectUrl": "",
      "category": "slam",
      "motivation": "神经显式稠密语义3DGS框架",
      "summary": "NEDS-SLAM 提出了一种基于 3D Gaussian Splatting 的稠密语义 SLAM 框架，通过**空间一致性特征融合（SCFF）**解决跨帧语义预测不一致问题，并引入**虚拟相机视角剪枝（VCVP）**策略移除浮空高斯体，在 Replica 数据集上实现了 PSNR 34.76、ATE 0.354cm 和 mIoU 90.78% 的 SOTA 性能。",
      "keyPoints": [
        "<strong>空间一致性特征融合（SCFF）</strong>：将 DINO 语义特征（384维）与 DepthAnything 空间特征融合，通过 CNN 压缩至 32 通道后经 MLP 编码为 3 维嵌入存储于每个高斯体中，解决逐帧语义预测的空间不一致性",
        "<strong>轻量编码器-解码器架构</strong>：MLP 编码器将 32 维特征压缩为 3 维语义属性嵌入高斯体，解码器将 3 维恢复至 32→384 维用于损失计算，实现高效语义表示",
        "<strong>虚拟相机视角剪枝（VCVP）</strong>：围绕焦点旋转 ±θ 生成 4 个虚拟相机视角，识别并移除仅在原始视角可见但在所有虚拟视角中不可见的离群高斯体（floaters）",
        "<strong>语义辅助跟踪</strong>：在相机位姿优化中引入语义渲染损失，利用语义一致性约束提升定位精度",
        "<strong>双数据集验证</strong>：在 Replica（合成）和 ScanNet（真实）数据集上全面评估渲染质量、定位精度和语义分割性能"
      ],
      "detail": "<p><img alt=\"NEDS-SLAM 系统总览\" src=\"https://ar5iv.labs.arxiv.org/html/2403.11679v3/assets/x1.png\" />\n<em>图1：NEDS-SLAM 系统框架总览。输入 RGB-D 流经过 SCFF 模块提取空间一致语义特征，编码为 3 维属性嵌入 3D 高斯体；跟踪模块联合优化颜色、深度和语义损失；建图模块通过 VCVP 剪枝离群高斯体并持续优化场景表示。</em></p>\n<pre><code class=\"language-python\"># NEDS-SLAM 核心流程伪代码\ndef neds_slam(rgb_stream, depth_stream):\n    gaussians = []  # 3D Gaussian map\n\n    for frame_t in rgb_stream:\n        rgb_t, depth_t = frame_t, depth_stream[t]\n\n        # === SCFF: 空间一致性特征融合 ===\n        f_dino = DINO_encoder(rgb_t)          # [H, W, 384] 语义特征\n        f_depth = DepthAnything(rgb_t)         # [H, W, C] 空间特征\n        f_fused = concat(f_dino, f_depth)      # 特征拼接\n        f_compressed = CNN(f_fused)            # [H, W, 384] → [H, W, 32]\n        f_semantic = MLP_encoder(f_compressed) # [H, W, 32] → [H, W, 3]\n\n        # === Tracking: 语义辅助位姿估计 ===\n        pose_t = optimize_pose(\n            gaussians, rgb_t, depth_t, f_semantic,\n            loss = L1_color + λ_d * L1_depth + λ_s * L1_semantic\n        )\n\n        # === Mapping: 高斯体优化与致密化 ===\n        gaussians = densify_and_optimize(\n            gaussians, rgb_t, depth_t, f_semantic, pose_t,\n            loss = (1-λ)*L1 + λ*SSIM + λ_d*L1_depth + λ_s*L1_semantic\n        )\n\n        # === VCVP: 虚拟相机视角剪枝 ===\n        if t % prune_interval == 0:\n            virtual_cams = generate_virtual_cameras(pose_t, theta=10°)\n            for g in gaussians:\n                visible_in_any_virtual = any(\n                    is_visible(g, vc) for vc in virtual_cams\n                )\n                if not visible_in_any_virtual and is_visible(g, pose_t):\n                    gaussians.remove(g)  # 移除 floater\n\n    return gaussians\n</code></pre>\n<p><strong>动机与背景：从隐式到显式的语义 SLAM 演进</strong></p>\n<p>传统的神经隐式 SLAM 方法（如 iMAP、NICE-SLAM、Co-SLAM）使用 NeRF 作为场景表示，虽然能实现稠密重建，但存在两个核心问题：（1）体渲染（volume rendering）的计算开销大，每条光线需要多次采样和 MLP 前向传播，限制了实时性能；（2）隐式表示难以高效地嵌入高维语义信息。近期，3D Gaussian Splatting（3DGS）以其显式的点云表示和高效的光栅化渲染，为 SLAM 提供了新的范式。SplaTAM、GS-SLAM 等工作已证明 3DGS 在 SLAM 中的优越性，但它们缺乏语义理解能力。NEDS-SLAM 正是在此基础上，首次将稠密语义建图与 3DGS-SLAM 深度融合，同时解决了语义一致性和几何质量两个关键挑战。</p>\n<p><strong>SCFF：解决跨帧语义预测的空间不一致性</strong></p>\n<p><img alt=\"SCFF 语义对比\" src=\"https://ar5iv.labs.arxiv.org/html/2403.11679v3/assets/x4.png\" />\n<em>图4：SCFF 效果对比。左：原始 DINO 特征（PCA 可视化）存在跨帧不一致；右：经 SCFF 融合后的特征在空间上更加一致。</em></p>\n<p>直接使用预训练视觉基础模型（如 DINOv2）提取的逐帧语义特征存在严重的<strong>空间不一致性</strong>问题——同一 3D 点在不同视角下的语义特征向量可能差异很大。这是因为 DINO 等模型是在单帧图像上独立推理的，缺乏多视角几何约束。NEDS-SLAM 的 SCFF 模块通过融合 DepthAnything 的深度感知空间特征来缓解这一问题。具体而言，DINO 提供丰富的语义信息但空间不稳定，DepthAnything 提供几何一致的空间特征但语义信息有限，两者互补融合后经 CNN 压缩至 32 通道。随后，一个轻量 MLP 编码器将 32 维特征进一步压缩为 3 维，作为每个 3D 高斯体的额外属性存储。这种极致压缩（384→3）不仅节省存储，还使语义信息能像颜色一样通过 3DGS 的 α-blending 进行可微渲染。在推理时，渲染得到的 3 维语义图通过 MLP 解码器恢复至 32→384 维，与原始 DINO 特征计算 L1 损失进行监督。消融实验表明，SCFF 将 mIoU 从 26.52% 提升至 40.81%（使用 DINO 特征聚类评估），验证了空间一致性对语义质量的关键作用。</p>\n<div class=\"key-point\">💡 <strong>关键设计</strong>：语义特征的 384→32→3 维压缩路径是精心设计的——直接从 384 压缩到 3 维会丢失过多信息，而 CNN 先做空间融合降维至 32，再由 MLP 做最终压缩，兼顾了信息保留和存储效率。</div>\n<p><strong>VCVP：基于虚拟视角的几何质量保障</strong></p>\n<p><img alt=\"VCVP 概念示意\" src=\"https://ar5iv.labs.arxiv.org/html/2403.11679v3/assets/x2.png\" />\n<em>图2：VCVP 核心思想。围绕焦点旋转生成虚拟相机，离群高斯体（红色）在虚拟视角中不可见，从而被识别并移除。</em></p>\n<p><img alt=\"VCVP 虚拟视图\" src=\"https://ar5iv.labs.arxiv.org/html/2403.11679v3/assets/x3.png\" />\n<em>图3：ScanNet 场景中 4 个虚拟相机视角的渲染结果，展示了不同旋转方向的观察效果。</em></p>\n<p>3DGS-SLAM 中一个常见问题是<strong>浮空高斯体（floaters）</strong>——这些高斯体位于相机前方的自由空间中，从当前视角看似乎合理，但实际上是优化过程中的伪影。它们会严重干扰后续帧的跟踪精度。VCVP 的核心思想优雅而直观：如果一个高斯体是真实场景表面的一部分，那么从略微不同的角度观察时它仍然应该可见；反之，如果它只是一个浮空伪影，稍微改变视角就会\"消失\"。</p>\n<p>具体实现上，VCVP 围绕当前相机的焦点（focal point，即光轴与场景的交点）分别在水平和垂直方向旋转 ±θ 角度，生成 4 个虚拟相机。对于每个高斯体，检查其是否落在任意虚拟相机的视锥内。若一个高斯体在原始视角可见但在所有 4 个虚拟视角中均不可见，则判定为离群体并移除。旋转角度 θ 是关键超参数——过小则无法有效检测 floaters，过大则可能误删合法高斯体。实验表明 θ=10° 是最佳选择，在该设置下 ATE 从无 VCVP 的 0.42cm 降至 0.22cm。</p>\n<p><img alt=\"VCVP 效果对比\" src=\"https://ar5iv.labs.arxiv.org/html/2403.11679v3/assets/x5.png\" />\n<em>图5：VCVP 剪枝效果。上：无 VCVP 时存在大量浮空高斯体；下：VCVP 有效移除了离群体，场景几何更加干净。</em></p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：VCVP 的虚拟相机围绕<strong>焦点</strong>而非<strong>相机中心</strong>旋转，这确保了虚拟视角仍然观察同一区域，只是角度略有不同。这与简单的相机平移有本质区别。</div>\n<p><strong>语义辅助跟踪与联合优化</strong></p>\n<p>NEDS-SLAM 的跟踪模块在传统的颜色和深度损失基础上，创新性地引入了语义渲染损失。跟踪损失函数定义为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{track}} = \\mathcal{L}_1^{\\text{color}} + \\lambda_d \\mathcal{L}_1^{\\text{depth}} + \\lambda_s \\mathcal{L}_1^{\\text{semantic}}</div>\n<p>其中语义损失 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_1^{\\text{semantic}}</span> 通过比较渲染的 3 维语义图与当前帧 SCFF 编码的语义特征计算。语义信息为位姿优化提供了额外的约束——即使在纹理贫乏或光照变化的区域，语义特征仍然能提供稳定的梯度信号。建图阶段的损失函数类似，但额外包含 SSIM 项以提升渲染质量：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{map}} = (1-\\lambda)\\mathcal{L}_1^{\\text{color}} + \\lambda \\mathcal{L}_{\\text{SSIM}} + \\lambda_d \\mathcal{L}_1^{\\text{depth}} + \\lambda_s \\mathcal{L}_1^{\\text{semantic}}</div>\n<p>在 Replica 数据集上，NEDS-SLAM 取得了 PSNR 34.76、SSIM 0.962、Depth L1 0.47cm 的渲染质量，ATE RMSE 仅 0.354cm，同时语义分割 mIoU 达到 90.78%（使用 GT 标签），全面超越了 SNI-SLAM（87.41%）等基于 NeRF 的语义 SLAM 方法。在真实场景 ScanNet 数据集上，平均 ATE RMSE 为 10.12cm，验证了方法的泛化能力。</p>\n<p><img alt=\"ScanNet 语义验证\" src=\"https://ar5iv.labs.arxiv.org/html/2403.11679v3/assets/x6.png\" />\n<em>图6：ScanNet 真实场景上的 SCFF 语义特征可视化，展示了方法在复杂真实环境中的语义一致性。</em></p>\n<p><strong>与现有方法的对比分析</strong></p>\n<p>相比基于 NeRF 的语义 SLAM（如 SNI-SLAM、DNS-SLAM），NEDS-SLAM 利用 3DGS 的显式表示和光栅化渲染实现了更高的渲染质量和更快的速度。相比其他 3DGS-SLAM（如 SplaTAM、GS-SLAM），NEDS-SLAM 是首个集成稠密语义建图的方法。VCVP 策略相比 SplaTAM 的简单透明度阈值剪枝更加鲁棒，因为它利用了多视角几何一致性而非单一统计量。SCFF 的特征融合策略也优于直接使用单一基础模型特征，通过互补融合显著提升了语义的空间一致性。</p>",
      "quiz": {
        "q": "NEDS-SLAM 中 VCVP（虚拟相机视角剪枝）策略的核心判断依据是什么？",
        "options": [
          "高斯体的透明度低于预设阈值",
          "高斯体在所有虚拟视角中均不可见但在原始视角可见",
          "高斯体的语义特征与周围高斯体不一致",
          "高斯体的深度值超出当前帧深度图范围"
        ],
        "answer": 1,
        "explain": "VCVP 通过围绕焦点旋转生成4个虚拟相机，若高斯体在原始视角可见但在所有虚拟视角中均不可见，则判定为浮空伪影并移除，利用的是多视角几何一致性原理。"
      }
    },
    {
      "id": "cg-slam",
      "num": 6,
      "name": "CG-SLAM",
      "fullName": "一致性高斯场SLAM (Consistent Gaussian Field SLAM)",
      "year": "2024",
      "org": "ECCV 2024",
      "parent": "orb-slam3",
      "paperUrl": "https://link.springer.com/chapter/10.1007/978-3-031-72698-9_6",
      "projectUrl": "",
      "category": "slam",
      "motivation": "不确定性感知一致3DGS建图",
      "summary": "CG-SLAM 提出面向 RGB-D SLAM 的一致性、不确定性感知 3D Gaussian 场，通过深度不确定性建模、尺度正则、深度一致性损失和 GPU 加速位姿求导，解决了直接套用 3DGS 到在线 SLAM 时几何不稳定和跟踪效率不足的问题。",
      "keyPoints": [
        "<strong>不确定性感知高斯场</strong>：为渲染图像和 Gaussian primitives 建模深度不确定性，筛除不稳定或低价值高斯",
        "<strong>α 深度与 median depth 对齐</strong>：约束体渲染深度和主导高斯深度一致，使高斯更贴合真实表面",
        "<strong>尺度正则化</strong>：抑制过度各向异性高斯，减少边缘处箭头状伪影和过拟合",
        "<strong>SLAM 专用 CUDA rasterizer</strong>：分析 3DGS 对相机位姿的导数，构建适合跟踪和建图解耦的 GPU 框架",
        "<strong>低不确定性跟踪</strong>：跟踪时优先使用稳定、信息量高的高斯，提升位姿优化速度和鲁棒性",
        "<strong>滑动窗口 BA</strong>：结合当前帧、最近关键帧和 NetVLAD 共视关键帧，联合优化位姿和场景表示",
        "<strong>多数据集验证</strong>：在 Replica、TUM RGB-D、ScanNet 上评估定位、重建、渲染和运行效率"
      ],
      "detail": "<p><img alt=\"CG-SLAM 系统流水线\" src=\"https://raw.githubusercontent.com/hjr37/open_access_assets/main/cg-slam/images/pipeline.png\" />\n<em>图：CG-SLAM 官方项目页流水线。RGB-D 序列被构造成带不确定性的 3D Gaussian field，渲染 RGB、深度、opacity 和 uncertainty，用于 mapping 与 tracking。</em></p>\n<pre><code class=\"language-python\"># CG-SLAM 核心流程伪代码\ndef cg_slam(rgbd_stream):\n    gaussians = initialize_dense_gaussians(rgbd_stream[0])\n    keyframes = []\n\n    for frame in rgbd_stream:\n        # 1. Tracking：只用低不确定性区域优化当前位姿\n        pose = constant_velocity_init()\n        for _ in range(track_iters):\n            rgb_hat, depth_hat, opacity, uncertainty = render_uncertain_gs(gaussians, pose)\n            mask = select_low_uncertainty_pixels(opacity, uncertainty)\n            loss = mask * (rgb_loss(rgb_hat, frame.rgb) + depth_loss(depth_hat, frame.depth))\n            pose = optimize_pose_lie_algebra(pose, loss)\n\n        # 2. Mapping：优化高斯并更新不确定性\n        if should_add_keyframe(frame, pose):\n            keyframes.append((frame, pose))\n            add_gaussians_on_unobserved_pixels(gaussians, frame, pose)\n\n        for kf in select_mapping_window(keyframes):\n            rgb_hat, depth_ab, depth_med, opacity, uncertainty = render_all(gaussians, kf.pose)\n            map_loss = rgb_loss(rgb_hat, kf.rgb)\n            map_loss += depth_loss(depth_ab, kf.depth)\n            map_loss += median_depth_alignment(depth_ab, depth_med)\n            map_loss += scale_regularization(gaussians)\n            gaussians = optimize_gaussians(gaussians, map_loss)\n\n        # 3. 剪除或降低高不确定性高斯的不透明度\n        update_gaussian_uncertainty(gaussians, keyframes)\n        suppress_unreliable_gaussians(gaussians)\n\n        # 4. 滑动窗口 BA 降低累计误差\n        sliding_bundle_adjustment(gaussians, keyframes)\n\n    return gaussians, keyframes\n</code></pre>\n<h5>动机与背景</h5>\n<p>3D Gaussian Splatting 的渲染非常快，但它最初服务于离线新视角合成，不天然保证几何可用于相机跟踪。高斯可以通过各向异性尺度和不透明度过拟合训练视角，看起来 RGB 很好，却不一定贴在真实表面上；一旦相机从新视角跟踪，这些漂浮或拉伸的 primitives 会给位姿优化错误梯度。</p>\n<p>CG-SLAM 的目标是把 3DGS 改造成“SLAM 可用”的场景表示。它保留 3DGS 的快速 rasterization，但增加几何稳定性约束和不确定性机制，让地图不仅能渲染，还能支撑连续位姿估计。</p>\n<h5>一致性 Gaussian 场</h5>\n<p>标准 3DGS 通过前向 α-blending 渲染颜色和深度：</p>\n<div class=\"kb-math kb-math-display\">\\hat{C}(p)=\\sum_i T_i(p)\\alpha_i(p)c_i,\\quad\n\\hat{D}_{ab}(p)=\\sum_i T_i(p)\\alpha_i(p)d_i</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\hat{D}_{ab}</span> 是 alpha-blending depth。CG-SLAM 进一步渲染 median depth <span class=\"kb-math kb-math-inline\">\\hat{D}_{med}</span>，即累计透射率第一次达到阈值时主导高斯的深度。若 <span class=\"kb-math kb-math-inline\">\\hat{D}_{ab}</span> 与 <span class=\"kb-math kb-math-inline\">\\hat{D}_{med}</span> 差异大，说明一个像素的深度由多个不一致高斯混合而来，几何表面不集中。</p>\n<p>因此 mapping loss 会加入深度一致性项：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{align}=\\left\\|\\hat{D}_{ab}-\\hat{D}_{med}\\right\\|_1</div>\n<p>这个损失迫使主要贡献高斯靠近传感器观测深度，减少“看似颜色正确、实际几何漂浮”的情况。</p>\n<h5>不确定性建模</h5>\n<p>CG-SLAM 把深度观测误差传播成 uncertainty map，并进一步给每个 Gaussian primitive 估计不确定性。一个高斯的不确定性来自它在多个关键帧中的 dominated pixels：如果这个高斯主导的像素深度与传感器深度长期不一致，它就不是可靠几何。</p>\n<p>高不确定性的高斯不会立刻被删除，而是先降低不透明度，让优化有机会修正；若持续不可靠，再被剪枝。跟踪阶段则优先使用低不确定性像素和低不确定性高斯，避免用伪影去估计相机运动。</p>\n<h5>尺度正则与各向异性控制</h5>\n<p>3DGS 的各向异性高斯很容易拉成长条来拟合训练图像边缘，但这种长条在新视角下会产生几何伪影。CG-SLAM 用 scale regularization 控制尺度比例：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{iso}=\\sum_i \\left\\|\\frac{\\max(s_i)}{\\min(s_i)}-\\eta\\right\\|_+</div>\n<p>公式表达的是直觉：允许高斯有一定各向异性，但不能无限拉伸。这样既保留 3DGS 对表面的拟合能力，又减少不稳定 primitives 对 tracking 的破坏。</p>\n<h5>跟踪、建图与滑动 BA</h5>\n<p>CG-SLAM 用 Lie algebra 表示位姿增量，在固定 Gaussian 场上直接优化相机位姿。建图阶段则固定或联合优化关键帧窗口内的高斯参数。滑动 BA 选取最近关键帧、当前帧和 NetVLAD 检索出的共视关键帧，共同降低累计误差。</p>\n<div class=\"warn-box\">⚠️ 注意：CG-SLAM 的重点不是加入语义，而是让 3DGS 在几何上足够稳定。后续 SDD-SLAM、GTS-SLAM 等方法往往把它作为 3DGS-SLAM 的几何基线，再加入动态语义或多传感器耦合。</div>",
      "quiz": {
        "q": "CG-SLAM 中深度不确定性模型的主要作用是什么？",
        "options": [
          "为每个高斯随机分配语义类别",
          "识别并降低不可靠高斯对跟踪和建图优化的影响",
          "把 RGB-D 输入转换为纯文本导航指令",
          "完全替代深度传感器"
        ],
        "answer": 1,
        "explain": "CG-SLAM 根据高斯主导像素与真实深度的偏差估计不确定性，跟踪时优先使用低不确定性区域，并在建图时抑制或剪枝不稳定高斯。"
      }
    },
    {
      "id": "gs3lam",
      "num": 7,
      "name": "GS3LAM",
      "fullName": "高斯语义泼溅SLAM (Gaussian Semantic Splatting SLAM)",
      "year": "2024",
      "org": "ACM MM 2024",
      "parent": "sgs-slam",
      "paperUrl": "https://dl.acm.org/doi/10.1145/3664647.3680739",
      "projectUrl": "",
      "category": "slam",
      "motivation": "自适应高斯扩展抗遗忘策略",
      "summary": "GS3LAM 的核心目标是：自适应高斯扩展抗遗忘策略。",
      "keyPoints": [
        "核心动机：自适应高斯扩展抗遗忘策略",
        "演化来源：继承或改进自 sgs-slam",
        "代表机构：ACM MM 2024"
      ],
      "detail": "<h4>系统架构总览</h4>\n<div class=\"img-wrap\"><img src=\"https://ar5iv.labs.arxiv.org/html/2603.27781/assets/x1.png\" alt=\"GS3LAM Pipeline\" loading=\"lazy\"><p class=\"img-caption\">▲ GS3LAM Pipeline</p></div>\n<p>GS3LAM 的整体流程如上图所示。系统接收 RGB-D 图像流和语义标签作为输入，维护一个全局语义高斯场 (SG-Field) 作为场景表示。每帧处理分为<strong>跟踪 (Tracking)</strong> 和<strong>建图 (Mapping)</strong> 两个阶段：跟踪阶段冻结 SG-Field 参数，仅优化相机位姿；建图阶段冻结位姿，优化高斯参数并扩展新高斯。两阶段通过累积不透明度掩码实现解耦，确保互不干扰。</p>\n<hr />\n<h4>1. 语义高斯场 (SG-Field) 表示与渲染</h4>\n<p><strong>核心思想</strong>：将语义信息直接嵌入 3D 高斯表示中，每个高斯 $G_i$ 由以下属性定义：</p>\n<div class=\"kb-math kb-math-display\">G_i = \\{\\mu_i, \\Sigma_i, o_i, c_i, f_i\\}</div>\n<p>其中 $\\mu_i \\in \\mathbb{R}^3$ 为中心位置，$\\Sigma_i$ 为协方差矩阵（由旋转四元数 $q$ 和缩放向量 $s$ 参数化），$o_i$ 为不透明度，$c_i$ 为球谐系数表示的颜色，$f_i \\in \\mathbb{R}^{N_{sem}}$ 为低维语义特征向量。</p>\n<p><strong>渲染过程</strong>：颜色、深度和语义特征均通过相同的 α-blending 光栅化管线渲染：</p>\n<div class=\"kb-math kb-math-display\">\\hat{C}(u) = \\sum_{i \\in \\mathcal{N}} c_i \\alpha_i \\prod_{j=1}^{i-1}(1-\\alpha_j), \\quad \\hat{D}(u) = \\sum_{i \\in \\mathcal{N}} d_i \\alpha_i \\prod_{j=1}^{i-1}(1-\\alpha_j)</div>\n<div class=\"kb-math kb-math-display\">\\hat{F}(u) = \\sum_{i \\in \\mathcal{N}} f_i \\alpha_i \\prod_{j=1}^{i-1}(1-\\alpha_j)</div>\n<p>其中 $\\alpha_i$ 由高斯的 2D 投影和不透明度计算得到，$d_i$ 为高斯中心沿相机光轴的深度。渲染得到的低维语义特征图 $\\hat{F}$ 通过一个轻量 CNN 解码器 $\\Phi$ 映射为 $K_{sem}$ 类语义概率图：</p>\n<div class=\"kb-math kb-math-display\">\\hat{S}(u) = \\text{softmax}(\\Phi(\\hat{F}(u)))</div>\n<p><strong>设计动机</strong>：直接在每个高斯上存储完整的 $K_{sem}$ 维语义向量会导致巨大的内存开销和优化困难（Replica 数据集有 101 个语义类别）。通过低维特征 + CNN 解码器的方式，既压缩了存储（$N_{sem} \\ll K_{sem}$），又利用 CNN 的空间感知能力在 2D 层面实现语义平滑和细节增强。更关键的是，语义损失通过反向传播会约束高斯的几何属性（位置、尺度、旋转），使高斯更好地对齐物体边缘——这是 SG-Field 相比纯几何高斯场的核心优势。</p>\n<hr />\n<h4>2. 深度自适应尺度正则化 (DSR)</h4>\n<div class=\"img-wrap\"><img src=\"https://ar5iv.labs.arxiv.org/html/2603.27781/assets/x5.png\" alt=\"DSR Ablation\" loading=\"lazy\"><p class=\"img-caption\">▲ DSR Ablation</p></div>\n<p><strong>问题分析</strong>：标准 3DGS 中高斯的尺度 $s$ 是自由优化的，容易出现两种病态情况：(1) 过大的高斯跨越物体边界，导致边缘模糊和语义-几何空间错位；(2) 过小的高斯无法有效覆盖表面，产生空洞。在 SLAM 场景中，由于增量式优化和有限视角，这些问题尤为严重。</p>\n<p><strong>方法</strong>：DSR 利用深度信息自适应地约束高斯尺度。对于每个像素 $u$，基于其深度值 $D(u)$ 计算该区域高斯尺度的统计量（均值 $\\mu_s$ 和标准差 $\\sigma_s$），然后通过两个正则化损失约束尺度在合理范围内：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{big} = \\max(0, s_i - (\\mu_s + 2\\sigma_s))</div>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{small} = \\max(0, (\\mu_s - 2\\sigma_s) - s_i)</div>\n<p>直觉上，远处物体对应的高斯应该有更大的尺度（因为单个像素覆盖更大的物理面积），近处物体则需要更精细的高斯。DSR 通过深度信息自适应地设定这个范围，而非使用全局固定阈值。</p>\n<p><strong>效果</strong>：如上图所示，没有 DSR 时场景边缘出现大量不规则高斯（左上），导致语义图边界模糊（左下）。加入 DSR 后高斯紧密贴合表面（右上），语义边界清晰（右下）。消融实验显示 DSR 提升 PSNR 1.17 dB，mIoU 提升 3.36%，跟踪误差降低 16%。</p>\n<hr />\n<h4>3. 随机采样关键帧建图 (RSKM)</h4>\n<div class=\"img-wrap\"><img src=\"https://ar5iv.labs.arxiv.org/html/2603.27781/assets/x6.png\" alt=\"RSKM Ablation\" loading=\"lazy\"><p class=\"img-caption\">▲ RSKM Ablation</p></div>\n<p><strong>问题分析</strong>：传统 3DGS-SLAM（如 SplaTAM）采用局部共视关键帧建图 (LCKM)，即每次建图时选择与当前帧共视程度最高的关键帧进行联合优化。这导致严重的优化偏差：共视频繁的区域被反复优化导致过拟合，共视稀疏的区域优化不足出现空洞。加入语义特征后，这种偏差被进一步放大，因为语义嵌入增加了优化的复杂度。</p>\n<p><strong>方法</strong>：RSKM 采用极其简单但有效的策略——以均匀概率 $p = 1/|K|$ 从全局关键帧池 $K$ 中随机采样关键帧参与建图优化。这确保了：</p>\n<ol>\n<li><strong>全局覆盖</strong>：每个关键帧被采样的期望次数相同，消除了空间偏差</li>\n<li><strong>抗遗忘</strong>：远离当前帧的区域也有机会被持续优化，缓解灾难性遗忘</li>\n<li><strong>收敛稳定</strong>：避免了共视密集区域的过度优化导致的振荡</li>\n</ol>\n<p><strong>效果</strong>：如上图所示，使用 RSKM（左）的渲染质量全局一致，而使用 LCKM（右）出现大量空洞和模糊。定量上，RSKM 提升 PSNR 5.49 dB，同时将渲染质量的方差降低 24.42 倍。</p>\n<hr />\n<h4>4. 跟踪与建图的解耦优化</h4>\n<p><strong>跟踪阶段</strong>：</p>\n<pre><code>输入: 当前帧 (I_t, D_t, S_t), 冻结的 SG-Field\n初始化: 恒速运动模型 T_t = T_{t-1} · (T_{t-2}^{-1} · T_{t-1})\n计算: M_obs = {u | Σα_i &gt; τ_obs}  // 累积不透明度掩码\nfor iter in 1..N_track:\n    渲染: (Ĉ_t, D̂_t, Ŝ_t) = Render(SG-Field, T_t)\n    L_track = M_obs · (λ_c·L1(Ĉ_t,I_t) + λ_d·L1(D̂_t,D_t) + λ_s·BCE(Ŝ_t,S_t))\n    更新: T_t ← T_t - η·∇L_track  // 仅优化位姿\n</code></pre>\n<p>$M_{obs}$ 掩码的关键作用是过滤掉尚未被高斯充分覆盖的区域（如新出现的场景部分），防止这些区域的不准确渲染干扰位姿估计。消融实验显示，去掉 $M_{obs}$ 后跟踪误差从 0.21 cm 暴增至 43.12 cm。</p>\n<p><strong>建图阶段</strong>：</p>\n<pre><code>输入: 关键帧集合 K, 当前帧, 冻结的位姿\n计算: M_unobs = {u | Σα_i &lt; τ_unobs}  // 未观测区域掩码\n// 高斯扩展: 仅在 M_unobs 区域添加新高斯\nfor u in M_unobs:\n    初始化新高斯: μ = BackProject(u, D(u), T)\n                   s = 基于深度的初始尺度\n                   f = 随机初始化语义特征\n// 联合优化: 当前帧 + RSKM采样的关键帧\nfor iter in 1..N_map:\n    采样关键帧 k ~ Uniform(K)\n    L_map = L_color + L_depth + L_semantic + λ_big·L_big + λ_small·L_small\n    更新: SG-Field参数 ← SGD(L_map)\n</code></pre>\n<p>其中颜色损失结合 L1 和 D-SSIM：$\\mathcal{L}<em dssim=\"dssim\">{color} = (1-\\lambda</em>|}) \\cdot |C - \\hat{C<em dssim=\"dssim\">1 + \\lambda</em>$} \\cdot \\mathcal{L}_{D-SSIM</p>\n<hr />\n<h4>5. 实验结果与分析</h4>\n<p><strong>渲染质量</strong> (Replica 数据集, 8 场景平均)：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>PSNR↑</th>\n<th>SSIM↑</th>\n<th>LPIPS↓</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Point-SLAM</td>\n<td>35.17</td>\n<td>0.975</td>\n<td>0.124</td>\n</tr>\n<tr>\n<td>GS-SLAM</td>\n<td>34.27</td>\n<td>0.975</td>\n<td>0.082</td>\n</tr>\n<tr>\n<td>SplaTAM</td>\n<td>34.11</td>\n<td>0.970</td>\n<td>0.100</td>\n</tr>\n<tr>\n<td><strong>GS3LAM</strong></td>\n<td><strong>36.26</strong></td>\n<td><strong>0.989</strong></td>\n<td><strong>0.052</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>跟踪精度</strong> (Replica, ATE RMSE↓ [cm])：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>Avg.</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Point-SLAM</td>\n<td>0.53</td>\n</tr>\n<tr>\n<td>GS-SLAM</td>\n<td>0.50</td>\n</tr>\n<tr>\n<td>SplaTAM</td>\n<td>0.36</td>\n</tr>\n<tr>\n<td><strong>GS3LAM</strong></td>\n<td><strong>0.37</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>GS3LAM 跟踪精度与 SplaTAM 持平（0.37 vs 0.36 cm），作者分析认为语义嵌入使高斯更关注边缘细节而非显著特征，对跟踪略有影响，但换来了显著的渲染和语义提升。</p>\n<p><strong>语义重建</strong> (Replica, mIoU↑ [%])：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>Room 0</th>\n<th>Room 1</th>\n<th>Room 2</th>\n<th>Office 0</th>\n<th>Avg.</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>NIDS-SLAM</td>\n<td>82.45</td>\n<td>84.08</td>\n<td>76.99</td>\n<td>85.94</td>\n<td>82.37</td>\n</tr>\n<tr>\n<td>SNI-SLAM</td>\n<td>88.42</td>\n<td>87.43</td>\n<td>86.16</td>\n<td>87.63</td>\n<td>87.41</td>\n</tr>\n<tr>\n<td><strong>GS3LAM</strong></td>\n<td><strong>96.83</strong></td>\n<td><strong>96.68</strong></td>\n<td><strong>96.40</strong></td>\n<td><strong>96.61</strong></td>\n<td><strong>96.63</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>渲染速度</strong>：Replica (1200×680) 达 109.12 FPS，ScanNet (640×480) 达 499.78 FPS，是 NeRF 方法的 36.86 倍。</p>\n<p><strong>消融实验</strong> (Replica Office 1)：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>配置</th>\n<th>PSNR↑</th>\n<th>ATE↓</th>\n<th>mIoU↑</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>w/o $M_{obs}$</td>\n<td>19.63</td>\n<td>43.12</td>\n<td>30.23</td>\n</tr>\n<tr>\n<td>w/o $M_{unobs}$</td>\n<td>39.10</td>\n<td>0.28</td>\n<td>90.44</td>\n</tr>\n<tr>\n<td>w/o DSR</td>\n<td>40.04</td>\n<td>0.25</td>\n<td>93.96</td>\n</tr>\n<tr>\n<td>w/o RSKM</td>\n<td>37.48</td>\n<td>0.29</td>\n<td>89.13</td>\n</tr>\n<tr>\n<td><strong>Full GS3LAM</strong></td>\n<td><strong>41.21</strong></td>\n<td><strong>0.21</strong></td>\n<td><strong>97.35</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>消融结果清晰展示了每个组件的贡献：$M_{obs}$ 对跟踪至关重要（去掉后 ATE 暴增 200 倍），RSKM 对渲染质量贡献最大（+3.73 dB），DSR 对语义精度有显著提升（+3.36%）。</p>\n<hr />"
    },
    {
      "id": "semgauss-slam",
      "num": 8,
      "name": "SemGauss-SLAM",
      "fullName": "稠密语义高斯SLAM (Dense Semantic Gaussian SLAM)",
      "year": "2025",
      "org": "IROS 2025",
      "parent": "sgs-slam",
      "paperUrl": "https://arxiv.org/abs/2501.semgauss",
      "projectUrl": "",
      "category": "slam",
      "motivation": "稠密语义高斯泼溅SLAM",
      "summary": "SemGauss-SLAM 在 3D Gaussian 中加入 DINOv2 初始化的语义特征 embedding，并用 feature-level loss 与 semantic-informed bundle adjustment 联合优化地图和位姿，解决了语义 3DGS-SLAM 的特征表达弱和累计漂移问题。",
      "keyPoints": [
        "<strong>语义特征高斯</strong>：每个 Gaussian 增加 16 通道 semantic feature embedding，而不是只存 RGB 或离散颜色标签",
        "<strong>DINOv2 初始化</strong>：用通用视觉特征提取器把 2D semantic features 传播到 3D Gaussian，提升语义收敛速度",
        "<strong>特征级监督</strong>：除语义交叉熵外，直接约束渲染语义特征与图像特征，提供更高层语义优化信号",
        "<strong>RGB-D 联合建图</strong>：mapping 同时优化 RGB、深度、语义标签和语义特征损失",
        "<strong>轻量跟踪损失</strong>：tracking 主要使用 RGB 和深度损失，只在高可见性区域优化当前帧位姿",
        "<strong>Semantic-informed BA</strong>：在共视帧之间 warp 语义特征、RGB 和深度，构造多视角一致性约束",
        "<strong>数据集验证</strong>：在 Replica 和 ScanNet 上评估 tracking、mapping、语义分割和 novel-view synthesis"
      ],
      "detail": "<p><img alt=\"SemGauss-SLAM 语义高斯表示\" src=\"https://arxiv.org/html/2403.07494v3/x1.png\" />\n<em>图：SemGauss-SLAM 将语义 feature embedding 融入 3D Gaussian 表示，并从新视角渲染高精度语义图。</em></p>\n<div class=\"warn-box\">⚠️ 依据限制：清单中的 <code>paper_url</code> 为 <code>https://arxiv.org/abs/2501.semgauss</code>，该地址疑似占位符；本文内容依据公开可访问的 SemGauss-SLAM arXiv 版本 <code>https://arxiv.org/abs/2403.07494</code>、IROS 2025 仓库信息和论文 HTML 图整理。</div>\n<pre><code class=\"language-python\"># SemGauss-SLAM 核心流程伪代码\ndef semgauss_slam(rgbd_stream):\n    feature_extractor = DINOv2FeatureExtractor()\n    classifier = pretrained_semantic_classifier()\n\n    first_features = feature_extractor(rgbd_stream[0].rgb)\n    gaussians = initialize_semantic_gaussians(rgbd_stream[0], first_features)\n    keyframes = []\n\n    for frame in rgbd_stream:\n        features = feature_extractor(frame.rgb)\n\n        # 1. Tracking：固定 Gaussian，只用可见区域 RGB/Depth 优化位姿\n        pose = constant_velocity_init()\n        for _ in range(track_iters):\n            rgb_hat, depth_hat, feat_hat, vis = render(gaussians, pose)\n            loss_track = visible(vis) * (\n                rgb_l1(rgb_hat, frame.rgb) + depth_l1(depth_hat, frame.depth)\n            )\n            pose = optimize_pose(pose, loss_track)\n\n        # 2. Mapping：优化 RGB、Depth、Semantic CE 和 Feature L1\n        label = classifier(features)\n        rgb_hat, depth_hat, feat_hat, vis = render(gaussians, pose)\n        sem_hat = classifier(feat_hat)\n        loss_map = rgb_ssim_l1(rgb_hat, frame.rgb)\n        loss_map += depth_l1(depth_hat, frame.depth)\n        loss_map += cross_entropy(sem_hat, label)\n        loss_map += l1(feat_hat, features)\n        gaussians = optimize_gaussians(gaussians, loss_map)\n\n        keyframes.append((frame, pose, features))\n\n        # 3. Semantic-informed BA：共视帧间做语义/RGB/深度一致性\n        covisible = select_covisible_keyframes(keyframes, pose)\n        semantic_informed_bundle_adjustment(gaussians, covisible)\n\n    return gaussians\n</code></pre>\n<h5>动机与背景</h5>\n<p>SGS-SLAM 证明了语义通道可以与 3DGS-SLAM 融合，但如果语义表示只是颜色或简单标签，它对开放场景和细粒度类别的表达能力有限。另一方面，NeRF 语义 SLAM 虽能学习隐式特征，但在线体渲染慢，且单帧约束容易在长期跟踪中积累漂移。</p>\n<p>SemGauss-SLAM 的核心改动是把每个 Gaussian 变成语义特征载体。它不只问“这个高斯是什么类别”，而是让高斯保存一个低维语义 embedding，渲染后再由分类器得到语义标签。这样保留了 3DGS 的高速显式渲染，又引入了 DINOv2 这类视觉基础模型的语义表达。</p>\n<h5>语义 Gaussian 表示</h5>\n<p>每个 Gaussian 可表示为：</p>\n<div class=\"kb-math kb-math-display\">G_i=\\{\\mu_i,r_i,c_i,\\alpha_i,f_i\\},\\quad f_i\\in\\mathbb{R}^{16}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">f_i</span> 是语义特征 embedding。系统用 DINOv2 从输入 RGB 中提取 2D 特征，并把这些特征按深度和相机位姿传播到 3D Gaussian，作为初始化。相比随机初始化语义特征，这种做法让优化从有语义结构的位置开始，能更快收敛。</p>\n<p>语义特征渲染与颜色渲染类似：</p>\n<div class=\"kb-math kb-math-display\">\\hat{F}(p)=\\sum_i T_i(p)\\alpha_i(p)f_i</div>\n<p>渲染得到的 <span class=\"kb-math kb-math-inline\">\\hat{F}</span> 输入预训练分类器，得到语义概率 <span class=\"kb-math kb-math-inline\">\\hat{Y}</span>。因此，一个像素的语义来自沿视线的多个高斯 feature blending，而不是后处理投票。</p>\n<h5>Loss 设计</h5>\n<p>mapping 使用多项损失联合优化：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{map}=\n\\lambda_c\\mathcal{L}_{rgb}\n+\\lambda_d\\mathcal{L}_{depth}\n+\\lambda_s\\mathcal{L}_{ce}\n+\\lambda_f\\|\\hat{F}-F\\|_1</div>\n<p><span class=\"kb-math kb-math-inline\">\\mathcal{L}_{ce}</span> 约束语义分类结果，<span class=\"kb-math kb-math-inline\">\\|\\hat{F}-F\\|_1</span> 则直接约束中间语义特征。特征级损失的好处是：即使最终标签相同，特征也会保留对象边缘、材质和局部上下文差异，为 3D 高斯优化提供比类别 ID 更丰富的梯度。</p>\n<p>tracking 阶段没有使用过重的语义损失，而是在高可见性区域用 RGB 和深度优化相机位姿。这是一个实时性取舍：语义用于让地图更好，位姿估计仍主要依赖几何和外观稳定信号。</p>\n<h5>Semantic-informed Bundle Adjustment</h5>\n<p>单帧 tracking/mapping 容易形成局部一致但全局漂移的地图。SemGauss-SLAM 因此加入 semantic-informed BA：选择共视关键帧，把某一帧渲染出的语义特征、RGB 和深度 warp 到另一帧，构造跨视角一致性约束：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{BA}=\n\\lambda_f\\|\\mathcal{W}(\\hat{F}_i,T_{ij})-\\hat{F}_j\\|_1\n+\\lambda_c\\|\\mathcal{W}(\\hat{C}_i,T_{ij})-\\hat{C}_j\\|_1\n+\\lambda_d\\|\\mathcal{W}(\\hat{D}_i,T_{ij})-\\hat{D}_j\\|_1</div>\n<p>这相当于把传统 BA 的多视角几何一致性扩展到语义特征空间。若两个视角看到同一物体，它们的语义 embedding 应当一致；不一致就会反向推动位姿和高斯参数调整。</p>\n<div class=\"key-point\">💡 关键：SemGauss-SLAM 的语义不是贴标签，而是进入 BA 约束。语义一致性成为减少 drift 的优化信号。</div>\n<h5>与 SGS-SLAM 的区别</h5>\n<p>SGS-SLAM 用多通道语义颜色把 3DGS 引入语义 SLAM；SemGauss-SLAM 进一步将语义表达升级为 DINOv2 feature embedding，并用 feature-level loss 与 semantic-informed BA 强化跨视角一致性。前者偏“语义通道渲染”，后者偏“语义特征场 + 多视角优化”。</p>",
      "quiz": {
        "q": "SemGauss-SLAM 为什么引入 feature-level loss，而不只使用语义交叉熵？",
        "options": [
          "为了完全去掉 RGB 和深度损失",
          "为了直接约束 DINOv2 中间语义特征，提供比类别标签更丰富的优化信号",
          "为了把所有高斯压缩成一个离散标签",
          "为了避免进行任何相机位姿优化"
        ],
        "answer": 1,
        "explain": "语义交叉熵只监督最终类别，feature-level loss 直接约束渲染特征与图像特征，使高斯语义表示获得更细粒度的语义和边界信息。"
      }
    },
    {
      "id": "opengs-slam",
      "num": 9,
      "name": "OpenGS-SLAM",
      "fullName": "开放集稠密语义SLAM (Open-Set Dense Semantic SLAM)",
      "year": "2025",
      "org": "ICRA 2025",
      "parent": "semgauss-slam",
      "paperUrl": "https://ieeexplore.ieee.org/document/11127983",
      "projectUrl": "",
      "category": "slam",
      "motivation": "开放集3DGS物体级场景理解",
      "summary": "OpenGS-SLAM 提出用**1维离散GS Label**替代传统高维语义特征嵌入来为3D高斯赋予语义，并设计了**Gaussian Voting Splatting**（标签感知α-blending投票）和**Confidence-based 2D Label Consensus**（置信度驱动的跨帧标签一致性机制），在不增加可微参数的前提下实现了开放词汇语义SLAM，渲染速度提升10倍、参数量减少2倍，同时语义分割精度达到SOTA水平。",
      "keyPoints": [
        "<strong>集成语义生成器</strong>：串联 RAM (Recognize Anything Model) → YOLO-World → SAM，实现零样本开放词汇2D语义分割，无需预定义类别",
        "<strong>GS Label 设计</strong>：为每个3D高斯附加1维离散标签属性（非可微），替代传统方法中的高维语义特征向量（如CLIP 512维），大幅降低存储与计算开销",
        "<strong>Gaussian Voting Splatting (GVS)</strong>：基于标签感知的α-blending投票机制渲染语义图，按标签分组累积不透明度并取最高票标签，无需梯度反传",
        "<strong>Confidence-based 2D Label Consensus</strong>：通过Full Match、Partial Match、Whole Match、New四种匹配模式，结合IoU阈值实现跨帧语义标签的一致性融合",
        "<strong>Input Confidence Update</strong>：利用渲染语义图与输入语义图的一致性动态调整输入置信度，抑制噪声帧的影响",
        "<strong>Part Label Decay</strong>：对部分匹配（Partial Match）中的旧标签施加置信度衰减，促进语义标签的自然更新",
        "<strong>Segmentation Counter Pruning</strong>：为每个高斯维护分割计数器，当高斯长期未被任何分割覆盖时将其剪枝，减少冗余",
        "<strong>实验结果</strong>：在Replica数据集上mIoU达61.91%（SAM 1.0）/ 72.40%（SAM 2），渲染速度约200 FPS，ATE仅0.16 cm"
      ],
      "detail": "<h5>系统总览</h5>\n<p><img alt=\"OpenGS-SLAM 系统架构\" src=\"assets/fig2_pipeline.png\" />\n<em>图：OpenGS-SLAM 系统流水线。左侧为集成语义生成器（RAM + YOLO-World + SAM），中间为Gaussian Voting Splatting渲染与场景更新，右侧为Confidence-based 2D Label Consensus模块。</em></p>\n<p><img alt=\"OpenGS-SLAM 效果展示\" src=\"assets/fig1_teaser.png\" />\n<em>图：OpenGS-SLAM 在Replica数据集上的开放词汇语义分割效果。支持任意文本查询的3D场景语义理解。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># OpenGS-SLAM 核心流程伪代码\ndef opengs_slam(rgb_stream, depth_stream):\n    gaussians = []  # 3D高斯集合，每个含 {μ, Σ, color, opacity, gs_label, confidence, seg_counter}\n\n    for frame_t in rgb_stream:\n        # ===== Step 1: 集成语义生成器 =====\n        tags = RAM(frame_t)                          # 识别图像中所有物体标签\n        bboxes = YOLO_World(frame_t, tags)           # 开放词汇目标检测\n        masks_2d = SAM(frame_t, bboxes)              # 生成精细分割掩码\n        # 每个mask关联一个语义标签 l_i 和初始置信度 c_i\n\n        # ===== Step 2: Gaussian Voting Splatting =====\n        rendered_semantic = gaussian_voting_render(gaussians, camera_pose_t)\n        # 对每个像素：按gs_label分组累积α-blending权重，投票选最高票标签\n\n        # ===== Step 3: Confidence-based 2D Label Consensus =====\n        for mask_input in masks_2d:\n            mask_rendered = find_matching_region(rendered_semantic, mask_input)\n            iou = compute_iou(mask_input, mask_rendered)\n\n            if iou &gt; τ_full:        # Full Match: 输入与渲染完全一致\n                update_confidence(mask_input, boost=True)\n            elif iou &gt; τ_partial:   # Partial Match: 部分重叠\n                apply_part_label_decay(old_labels)\n                assign_new_label_to_unmatched(mask_input)\n            elif iou &gt; τ_whole:     # Whole Match: 渲染区域被输入完全包含\n                merge_labels(mask_rendered → mask_input)\n            else:                   # New: 全新物体\n                assign_new_label(mask_input)\n\n        # ===== Step 4: 场景更新 =====\n        update_gs_labels(gaussians, masks_2d, confidence)\n\n        # ===== Step 5: Input Confidence Update =====\n        consistency = compare(rendered_semantic, masks_2d)\n        adjust_input_confidence(masks_2d, consistency)\n\n        # ===== Step 6: Segmentation Counter Pruning =====\n        for g in gaussians:\n            if g.seg_counter &gt; threshold:\n                prune(g)  # 移除长期未被分割覆盖的高斯\n\n    return gaussians\n</code></pre>\n<h5>方法详解</h5>\n<p><strong>1. 动机与背景：为什么需要新的语义SLAM方案？</strong></p>\n<p>现有的开放词汇语义3DGS-SLAM方法（如SemGauss-SLAM、SGS-SLAM等）普遍采用<strong>高维语义特征嵌入</strong>的方式为3D高斯附加语义信息——即为每个高斯存储一个高维向量（如CLIP的512维特征），并通过可微渲染和特征蒸馏进行优化。这种方案存在三个核心问题：</p>\n<ol>\n<li><strong>存储开销巨大</strong>：每个高斯额外存储数百维浮点向量，场景中数十万高斯导致参数量翻倍</li>\n<li><strong>渲染速度下降</strong>：高维特征需要参与α-blending的可微渲染，计算量显著增加</li>\n<li><strong>语义精度受限</strong>：特征蒸馏过程中的信息损失导致语义边界模糊</li>\n</ol>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：语义标签本质上是<strong>离散的类别信息</strong>，不需要连续的高维特征空间来表示。OpenGS-SLAM 的核心思想是：用一个1维整数标签（GS Label）直接表示语义类别，完全绕开特征嵌入和蒸馏。</div>\n<p><strong>2. 集成语义生成器（Integrated Semantic Generator）</strong></p>\n<p>OpenGS-SLAM 构建了一个三阶段的零样本语义分割流水线：</p>\n<ul>\n<li><strong>RAM (Recognize Anything Model)</strong>：输入RGB图像，输出图像中所有可识别物体的文本标签集合 <span class=\"kb-math kb-math-inline\">\\{t_1, t_2, ..., t_K\\}</span></li>\n<li><strong>YOLO-World</strong>：以RAM输出的标签作为开放词汇提示，进行目标检测，输出边界框 <span class=\"kb-math kb-math-inline\">\\{b_1, b_2, ..., b_M\\}</span></li>\n<li><strong>SAM (Segment Anything Model)</strong>：以边界框作为提示，生成像素级精细分割掩码 <span class=\"kb-math kb-math-inline\">\\{m_1, m_2, ..., m_M\\}</span></li>\n</ul>\n<p>每个分割掩码 <span class=\"kb-math kb-math-inline\">m_i</span> 关联一个语义标签 <span class=\"kb-math kb-math-inline\">l_i</span> 和初始置信度 <span class=\"kb-math kb-math-inline\">c_i</span>。这种级联设计使系统无需预定义类别列表即可处理任意场景。</p>\n<p><strong>3. GS Label：1维离散语义属性</strong></p>\n<p>与传统方法不同，OpenGS-SLAM 为每个3D高斯 <span class=\"kb-math kb-math-inline\">G_k</span> 附加一个<strong>1维整数属性</strong> <span class=\"kb-math kb-math-inline\">\\hat{l}_k</span>（GS Label）和对应的置信度 <span class=\"kb-math kb-math-inline\">\\hat{c}_k</span>：</p>\n<div class=\"kb-math kb-math-display\">G_k = \\{\\mu_k, \\Sigma_k, \\text{color}_k, \\alpha_k, \\hat{l}_k, \\hat{c}_k, \\text{seg\\_counter}_k\\}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\hat{l}_k \\in \\mathbb{Z}^+</span> 是离散标签ID，<span class=\"kb-math kb-math-inline\">\\hat{c}_k \\in [0, 1]</span> 是该标签的置信度。由于标签是离散的非可微属性，它<strong>不参与梯度反传</strong>，不影响几何和外观的优化过程。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：GS Label 的更新完全通过投票和规则驱动，而非梯度下降。这是与特征嵌入方法的根本区别。</div>\n<p><strong>4. Gaussian Voting Splatting (GVS)：标签感知的投票渲染</strong></p>\n<p>传统3DGS渲染通过α-blending混合颜色：</p>\n<div class=\"kb-math kb-math-display\">C(p) = \\sum_{i \\in \\mathcal{N}} c_i \\cdot \\alpha_i \\cdot \\prod_{j=1}^{i-1}(1 - \\alpha_j)</div>\n<p>但对于离散标签，直接混合没有意义（标签3和标签5的\"平均\"标签4毫无语义含义）。OpenGS-SLAM 提出<strong>Gaussian Voting Splatting</strong>：</p>\n<p>对像素 <span class=\"kb-math kb-math-inline\">p</span>，将所有影响该像素的高斯按其GS Label分组，累积每个标签的α-blending权重作为\"投票\"：</p>\n<div class=\"kb-math kb-math-display\">V_l(p) = \\sum_{i \\in \\mathcal{N}, \\hat{l}_i = l} \\alpha_i \\cdot \\prod_{j=1}^{i-1}(1 - \\alpha_j)</div>\n<p>最终该像素的渲染标签为获得最高投票的标签：</p>\n<div class=\"kb-math kb-math-display\">L(p) = \\arg\\max_l V_l(p)</div>\n<div class=\"key-point\">💡 <strong>直觉</strong>：想象每个高斯在渲染时对像素\"投票\"，票数等于其α-blending贡献权重。票数最多的标签胜出。这完全避免了连续特征的混合与蒸馏。</div>\n<p><strong>5. 场景语义更新（Scene Semantic Update）</strong></p>\n<p>当新帧的2D语义分割结果到来时，需要将其融合到3D高斯的GS Label中。对于被2D掩码 <span class=\"kb-math kb-math-inline\">m_i</span>（标签 <span class=\"kb-math kb-math-inline\">l_i</span>，置信度 <span class=\"kb-math kb-math-inline\">c_i</span>）覆盖的高斯 <span class=\"kb-math kb-math-inline\">G_k</span>：</p>\n<ul>\n<li>若 <span class=\"kb-math kb-math-inline\">c_i &gt; \\hat{c}_k</span>（输入置信度高于当前GS置信度），则更新：<span class=\"kb-math kb-math-inline\">\\hat{l}_k \\leftarrow l_i, \\hat{c}_k \\leftarrow c_i</span></li>\n<li>否则保持不变</li>\n</ul>\n<p>同时，被掩码覆盖的高斯的分割计数器重置为0：<span class=\"kb-math kb-math-inline\">\\text{seg\\_counter}_k \\leftarrow 0</span>。</p>\n<p><strong>6. Confidence-based 2D Label Consensus：跨帧标签一致性</strong></p>\n<p><img alt=\"标签共识机制\" src=\"assets/fig3_label_consensus.png\" />\n<em>图：四种标签匹配模式示意。Full Match（完全匹配）、Partial Match（部分匹配）、Whole Match（整体匹配）和New（新物体）。</em></p>\n<p>这是OpenGS-SLAM最精巧的设计之一。由于不同帧的2D分割器可能对同一物体产生不同的标签ID，需要一个机制来建立跨帧的标签对应关系。系统通过计算输入掩码与渲染语义图之间的IoU来判断匹配类型：</p>\n<p>设输入掩码为 <span class=\"kb-math kb-math-inline\">m_{\\text{in}}</span>（标签 <span class=\"kb-math kb-math-inline\">l_{\\text{in}}</span>），渲染语义图中与之重叠最大的区域为 <span class=\"kb-math kb-math-inline\">m_{\\text{ren}}</span>（标签 <span class=\"kb-math kb-math-inline\">l_{\\text{ren}}</span>）：</p>\n<div class=\"kb-math kb-math-display\">\\text{IoU} = \\frac{|m_{\\text{in}} \\cap m_{\\text{ren}}|}{|m_{\\text{in}} \\cup m_{\\text{ren}}|}</div>\n<p>根据IoU值和阈值 <span class=\"kb-math kb-math-inline\">\\tau_f, \\tau_p</span> 判断四种情况：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>匹配类型</th>\n<th>条件</th>\n<th>操作</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>Full Match</strong></td>\n<td><span class=\"kb-math kb-math-inline\">\\text{IoU} &gt; \\tau_f</span></td>\n<td>标签一致，提升置信度</td>\n</tr>\n<tr>\n<td><strong>Partial Match</strong></td>\n<td><span class=\"kb-math kb-math-inline\">\\tau_p &lt; \\text{IoU} &lt; \\tau_f</span></td>\n<td>部分重叠，旧标签衰减 + 新区域赋新标签</td>\n</tr>\n<tr>\n<td><strong>Whole Match</strong></td>\n<td><span class=\"kb-math kb-math-inline\">m_{\\text{ren}} \\subset m_{\\text{in}}</span> 且 IoU较低</td>\n<td>渲染区域被输入包含，合并为输入标签</td>\n</tr>\n<tr>\n<td><strong>New</strong></td>\n<td>IoU极低或无匹配</td>\n<td>全新物体，直接赋新标签</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>Part Label Decay</strong>（部分标签衰减）：在Partial Match中，对旧标签区域中未被新掩码覆盖的高斯施加置信度衰减：</p>\n<div class=\"kb-math kb-math-display\">\\hat{c}_k \\leftarrow \\hat{c}_k \\cdot \\gamma, \\quad \\gamma \\in (0, 1)</div>\n<p>这使得错误的旧标签会随时间逐渐被更可靠的新观测替代。</p>\n<p><strong>7. Input Confidence Update：动态输入质量评估</strong></p>\n<p>2D分割器的输出质量不稳定——某些帧可能因遮挡、运动模糊等产生噪声分割。OpenGS-SLAM 通过比较渲染语义图与输入语义图的一致性来动态调整输入置信度：</p>\n<ul>\n<li>若渲染结果与输入高度一致（Full Match多），说明当前3D模型已经很好地捕获了场景语义，输入的边际贡献较小</li>\n<li>若渲染结果与输入严重不一致，可能是输入噪声大，应降低其置信度</li>\n</ul>\n<p>这形成了一个自适应的反馈机制，使系统对噪声输入具有鲁棒性。</p>\n<p><strong>8. Segmentation Counter Pruning：语义感知的高斯剪枝</strong></p>\n<p>每个高斯维护一个分割计数器 <span class=\"kb-math kb-math-inline\">\\text{seg\\_counter}_k</span>。每次该高斯被渲染但未被任何2D分割掩码覆盖时，计数器递增。当计数器超过阈值时，该高斯被剪枝移除。</p>\n<div class=\"key-point\">💡 <strong>直觉</strong>：如果一个高斯反复出现在渲染视图中但从未被任何分割器\"认领\"，它很可能是浮动伪影（floater）或噪声点，应当被移除。这利用语义信息反过来提升了几何重建质量。</div>\n<p><strong>9. 与传统方法的核心区别</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>特征嵌入方法 (SemGauss等)</th>\n<th>OpenGS-SLAM</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>语义表示</td>\n<td>高维连续向量 (512D)</td>\n<td>1D离散标签</td>\n</tr>\n<tr>\n<td>渲染方式</td>\n<td>可微α-blending特征混合</td>\n<td>不可微投票机制</td>\n</tr>\n<tr>\n<td>优化方式</td>\n<td>梯度下降 + 特征蒸馏</td>\n<td>规则驱动 + 置信度更新</td>\n</tr>\n<tr>\n<td>额外参数</td>\n<td>~512×N</td>\n<td>~3×N (标签+置信度+计数器)</td>\n</tr>\n<tr>\n<td>渲染速度</td>\n<td>~20 FPS</td>\n<td>~200 FPS</td>\n</tr>\n<tr>\n<td>开放词汇查询</td>\n<td>运行时CLIP相似度计算</td>\n<td>预计算标签-文本映射</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "OpenGS-SLAM 中 Gaussian Voting Splatting 的核心思想是什么？",
        "options": [
          "将高维CLIP特征通过α-blending混合后解码为语义标签",
          "按GS Label分组累积α-blending权重，选择最高票标签作为像素语义",
          "对每个高斯的语义特征进行梯度下降优化以匹配2D标注",
          "使用transformer对所有高斯的语义特征进行全局注意力聚合"
        ],
        "answer": 1,
        "explain": "GVS将影响同一像素的高斯按其离散GS Label分组，累积各组的α-blending权重作为投票，最高票标签即为该像素的渲染语义。这完全避免了连续特征混合和梯度优化。"
      }
    },
    {
      "id": "sdd-slam",
      "num": 10,
      "name": "SDD-SLAM",
      "fullName": "语义驱动动态SLAM (Semantic-Driven Dynamic SLAM)",
      "year": "2025",
      "org": "IEEE RA-L",
      "parent": "cg-slam",
      "paperUrl": "https://ieeexplore.ieee.org/document/10966164",
      "projectUrl": "",
      "category": "slam",
      "motivation": "语义驱动动态场景高斯SLAM",
      "summary": "SDD-SLAM 将语义动态目标识别与 3D Gaussian Splatting SLAM 结合，在跟踪和建图中尽量只使用静态一致区域，解决动态物体干扰下位姿估计漂移和高斯地图污染的问题。",
      "keyPoints": [
        "<strong>动态场景目标</strong>：面向人员、车辆等动态物体会破坏静态世界假设的视觉 SLAM 场景",
        "<strong>语义驱动筛选</strong>：利用语义分割/检测先验区分潜在动态类别，并生成静态区域监督掩码",
        "<strong>动态一致性检查</strong>：结合观测与渲染地图的一致性识别真正运动区域，避免只按类别误删可用静态物体",
        "<strong>静态区域跟踪</strong>：位姿优化主要在静态掩码内计算 RGB-D/几何残差，降低动态前景对相机位姿的影响",
        "<strong>静态地图更新</strong>：mapping 时对动态区域降权、跳过或延迟更新，避免移动物体被固化成 3DGS 地图伪影",
        "<strong>继承 3DGS 优势</strong>：保留高斯显式表示的实时渲染和高保真地图能力",
        "<strong>公开资料限制</strong>：IEEE 页面可访问性有限，以下方法细节基于题目元信息、摘要索引和 3DGS 动态 SLAM 通用机制整理"
      ],
      "detail": "<p><img alt=\"3DGS-SLAM 基线流水线示意\" src=\"https://raw.githubusercontent.com/hjr37/open_access_assets/main/cg-slam/images/pipeline.png\" />\n<em>图：SDD-SLAM 原论文图在当前环境中未能公开获取。这里用其父系 CG-SLAM 的 3DGS-SLAM 流水线说明基础结构；SDD-SLAM 的核心是在该类跟踪/建图流程中加入语义驱动动态区域筛选。</em></p>\n<pre><code class=\"language-python\"># SDD-SLAM 核心流程伪代码（基于公开摘要与动态 3DGS-SLAM 机制整理）\ndef sdd_slam(rgbd_stream):\n    gaussians = initialize_static_gaussian_map(rgbd_stream[0])\n\n    for frame in rgbd_stream:\n        # 1. 语义先验：检测潜在动态类别\n        semantic_mask = semantic_segment(frame.rgb)\n        potential_dynamic = dynamic_category_mask(semantic_mask)\n\n        # 2. 动态一致性：比较当前观测与静态地图渲染\n        rgb_hat, depth_hat = render(gaussians, predicted_pose())\n        residual_mask = photometric_geometric_inconsistency(\n            frame.rgb, frame.depth, rgb_hat, depth_hat\n        )\n        dynamic_mask = refine_dynamic_mask(potential_dynamic, residual_mask)\n        static_mask = invert(dynamic_mask)\n\n        # 3. Tracking：只用静态区域优化相机位姿\n        pose = optimize_pose(\n            gaussians=gaussians,\n            observation=frame,\n            mask=static_mask,\n        )\n\n        # 4. Mapping：动态区域不写入或低权重写入\n        map_loss = static_mask * render_loss(gaussians, frame, pose)\n        gaussians = optimize_gaussian_map(gaussians, map_loss)\n        suppress_gaussians_in_dynamic_regions(gaussians, dynamic_mask, pose)\n\n    return gaussians\n</code></pre>\n<h5>动机与背景</h5>\n<p>大多数 3DGS-SLAM 系统默认世界静止：同一空间位置在不同帧中应该呈现一致颜色、深度和几何。如果画面中有人经过、车辆移动或机器人穿过拥挤区域，动态物体上的像素会同时破坏两件事：tracking 会把前景运动误解释成相机运动，mapping 会把移动物体写入静态高斯地图。</p>\n<p>传统动态 SLAM 常用特征剔除或语义掩码过滤动态点。SDD-SLAM 的挑战更高，因为 3DGS-SLAM 是渲染驱动的：错误动态区域不只是几个特征点，而会通过可微渲染优化影响高斯位置、尺度、不透明度和颜色，造成漂浮高斯或重复物体。</p>\n<h5>语义驱动动态掩码</h5>\n<p>SDD-SLAM 的“Semantic-Driven”强调用语义先验引导动态区域识别。给定输入帧，语义网络先给出每个像素的类别 <span class=\"kb-math kb-math-inline\">y_t(p)</span>。潜在动态类别集合 <span class=\"kb-math kb-math-inline\">\\mathcal{C}_{dyn}</span> 可定义初始掩码：</p>\n<div class=\"kb-math kb-math-display\">M^{prior}_t(p)=\\mathbb{1}[y_t(p)\\in\\mathcal{C}_{dyn}]</div>\n<p>但语义类别并不等于运动状态：停着的车可以是静态背景，站着的人也可能暂时不动。因此系统还需要结合当前观测与已有静态地图渲染的残差：</p>\n<div class=\"kb-math kb-math-display\">R_t(p)=\\lambda_c\\|I_t(p)-\\hat{I}_t(p)\\|_1+\\lambda_d\\|D_t(p)-\\hat{D}_t(p)\\|_1</div>\n<p>只有当语义先验和一致性残差共同指向异常时，像素才更可能被视为动态干扰。这能降低“按类别全删”的过度保守问题。</p>\n<h5>静态区域位姿估计</h5>\n<p>动态掩码得到后，位姿优化只在静态区域计算残差：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{track}=\n\\sum_p (1-M^{dyn}_t(p))\n\\left(\n\\lambda_c\\|I_t(p)-\\hat{I}_t(p)\\|_1\n+\\lambda_d\\|D_t(p)-\\hat{D}_t(p)\\|_1\n\\right)</div>\n<p>这个设计的直觉很直接：SLAM 要估计的是相机相对静态世界的运动，动态物体不应该参与坐标系定义。把动态像素从 tracking loss 中剔除，能减少前景运动对相机位姿的错误拉动。</p>\n<h5>动态区域建图抑制</h5>\n<p>mapping 阶段同样要避免动态物体污染 3DGS 地图。对于动态掩码覆盖区域，系统可以采用三类策略：不添加新高斯、降低已有高斯的不透明度或置信度、延迟到多帧确认静态后再更新。这样，高斯地图会趋向于表示长期静态背景，而不是把每一帧出现的行人都写成场景结构。</p>\n<div class=\"warn-box\">⚠️ 注意：由于 IEEE 原文和图在当前环境中未能展开，上述算法块保留为基于公开摘要、题名和父系 3DGS-SLAM 结构的精读整理；具体模块命名与阈值应以论文原文为准。</div>\n<h5>与 CG-SLAM 的关系</h5>\n<p>CG-SLAM 解决的是静态 RGB-D 场景中 3D Gaussian field 的几何稳定性；SDD-SLAM 面向动态场景，在此类 3DGS-SLAM 框架上加入语义动态区域处理。可以把 CG-SLAM 看成“稳定的静态高斯场”，SDD-SLAM 则把“哪些像素可用于静态场优化”变成核心问题。</p>",
      "quiz": {
        "q": "SDD-SLAM 在动态场景中引入语义掩码的主要目的是什么？",
        "options": [
          "让所有动态类别都被永久写入地图",
          "识别并降低动态区域在位姿估计和高斯建图中的影响",
          "用语义标签替代相机位姿",
          "只提升最终渲染图的颜色饱和度"
        ],
        "answer": 1,
        "explain": "动态物体会破坏静态世界假设。语义驱动掩码帮助系统在 tracking 和 mapping 中重点使用静态一致区域，从而减少漂移和地图伪影。"
      }
    },
    {
      "id": "resemgs-slam",
      "num": 11,
      "name": "ReSemGS-SLAM",
      "fullName": "实时语义高斯SLAM (Real-time Semantic Gaussian SLAM)",
      "year": "2026",
      "org": "KBS 2026",
      "parent": "opengs-slam",
      "paperUrl": "https://www.sciencedirect.com/science/article/pii/S0950705126007811",
      "projectUrl": "",
      "category": "slam",
      "motivation": "实时语义一致性感知3DGS",
      "summary": "ReSemGS-SLAM 面向实时语义 3DGS-SLAM，引入语义一致性感知来约束高斯标签/特征在多帧观测和渲染结果之间保持一致，解决开放或稠密语义高斯地图中速度、语义噪声和跨帧标签漂移难以兼顾的问题。",
      "keyPoints": [
        "<strong>实时语义 3DGS-SLAM</strong>：目标是在保持在线跟踪与建图低延迟的同时输出语义高斯地图",
        "<strong>语义一致性感知</strong>：利用当前语义观测与已有高斯地图渲染结果之间的一致性来决定更新、保留或降权",
        "<strong>高斯语义属性维护</strong>：每个 Gaussian 除几何/颜色外维护语义标签或语义特征与置信度",
        "<strong>渲染-观测闭环</strong>：先从地图渲染语义图，再与 2D 分割结果对齐，用一致性反馈更新 3D 语义",
        "<strong>继承 OpenGS-SLAM 思路</strong>：可理解为在开放/显式语义标签高斯地图上强化实时一致性更新",
        "<strong>Knowledge-Based Systems 2026</strong>：公开索引显示 DOI 为 <code>10.1016/j.knosys.2026.116055</code>，ScienceDirect PII 为 <code>S0950705126007811</code>",
        "<strong>依据限制说明</strong>：ScienceDirect 正文访问受限，以下细节基于公开索引、可访问图链和语义 3DGS-SLAM 方法脉络整理"
      ],
      "detail": "<p><img alt=\"ReSemGS-SLAM 论文图\" src=\"https://ars.els-cdn.com/content/image/1-s2.0-S0950705126007811-gr1_lrg.jpg\" />\n<em>图：Elsevier 图片直链可访问的 ReSemGS-SLAM 论文图。正文访问受限，因此以下解读聚焦公开可确认的实时语义一致性感知框架。</em></p>\n<pre><code class=\"language-python\"># ReSemGS-SLAM 核心流程伪代码（基于公开题名、图链和语义一致性机制整理）\ndef resemgs_slam(rgbd_stream):\n    gaussians = initialize_gaussians_with_semantic_state(rgbd_stream[0])\n\n    for frame in rgbd_stream:\n        # 1. 实时跟踪：用当前高斯地图估计相机位姿\n        pose = track_pose_with_rendered_rgbd(gaussians, frame)\n\n        # 2. 2D 语义观测\n        input_labels, input_conf = semantic_frontend(frame.rgb)\n\n        # 3. 从 3D 高斯地图渲染语义预测\n        rendered_labels, rendered_conf = semantic_render(gaussians, pose)\n\n        # 4. 一致性感知：比较输入语义与地图语义\n        consistency = compute_label_feature_consistency(\n            input_labels, rendered_labels, input_conf, rendered_conf\n        )\n\n        # 5. 高置信一致区域强化，冲突区域降权或延迟更新\n        update_semantic_gaussians(\n            gaussians,\n            frame=frame,\n            pose=pose,\n            labels=input_labels,\n            confidence=input_conf,\n            consistency=consistency,\n        )\n\n        # 6. 几何/颜色增量建图与轻量剪枝\n        optimize_visible_gaussians(gaussians, frame, pose, consistency)\n        prune_low_confidence_or_redundant_gaussians(gaussians)\n\n    return gaussians\n</code></pre>\n<h5>动机与背景</h5>\n<p>语义 3DGS-SLAM 的主要矛盾是实时性和语义一致性。若为每个高斯存储高维语义特征，渲染和优化会变慢；若只存离散标签，2D 分割器的噪声、跨帧类别别名和遮挡会导致同一物体在 3D 中被反复改名。OpenGS-SLAM 用 1D label 和 Gaussian Voting Splatting 降低成本，但仍需要可靠机制判断“当前帧的语义是否应该覆盖地图”。</p>\n<p>ReSemGS-SLAM 的题名明确强调 semantic consistency perception。其核心可理解为：把已有高斯地图渲染出的语义结果当作历史记忆，再与当前 2D 语义观测做一致性比较。语义更新不再是单帧覆盖，而是由跨帧一致性和置信度共同决定。</p>\n<h5>语义一致性感知</h5>\n<p>设当前 2D 语义前端输出标签 <span class=\"kb-math kb-math-inline\">Y_t(p)</span> 和置信度 <span class=\"kb-math kb-math-inline\">C_t(p)</span>，高斯地图在当前位姿下渲染出 <span class=\"kb-math kb-math-inline\">\\hat{Y}_t(p)</span> 和 <span class=\"kb-math kb-math-inline\">\\hat{C}_t(p)</span>。一个简单的一致性分数可写为：</p>\n<div class=\"kb-math kb-math-display\">\\kappa_t(p)=\\mathbb{1}[Y_t(p)=\\hat{Y}_t(p)]\\cdot C_t(p)\\hat{C}_t(p)</div>\n<p>当 <span class=\"kb-math kb-math-inline\">\\kappa_t</span> 高时，说明新观测与地图记忆一致，可以提升相关高斯语义置信度；当标签冲突但输入置信度低时，应避免立刻覆盖地图；当输入置信度高且连续多帧冲突时，可能意味着地图旧标签错误或场景发生变化，需要更新。</p>\n<h5>高斯语义状态更新</h5>\n<p>每个 Gaussian 可维护：</p>\n<div class=\"kb-math kb-math-display\">G_i=\\{\\mu_i,\\Sigma_i,c_i,\\alpha_i,l_i,q_i\\}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">l_i</span> 是语义标签或压缩语义状态，<span class=\"kb-math kb-math-inline\">q_i</span> 是语义置信度。更新规则不一定依赖梯度下降，而可以是置信度融合：</p>\n<div class=\"kb-math kb-math-display\">q_i \\leftarrow (1-\\beta)q_i+\\beta C_t(p)\\kappa_t(p)</div>\n<p>若输入标签与当前高斯标签一致，则增强置信度；若不一致，则根据冲突持续时间和输入质量决定衰减、延迟或替换。这类规则能防止单帧分割错误污染 3D 地图。</p>\n<h5>实时性设计</h5>\n<p>实时语义 SLAM 不能把所有高斯和所有历史帧都放入重优化。ReSemGS-SLAM 很可能采用可见高斯局部更新、低置信语义剪枝、冗余高斯合并或轻量 label rendering 等策略，把语义一致性计算限制在当前可见区域。这样，语义模块成为 tracking/mapping 的在线反馈，而不是离线全局优化。</p>\n<div class=\"warn-box\">⚠️ 注意：当前环境可确认论文题名、期刊、DOI、PII 和图链，但 ScienceDirect 正文未展开；具体模块名、阈值和实验数值应以论文原文为准。</div>\n<h5>与 OpenGS-SLAM 的关系</h5>\n<p>OpenGS-SLAM 强调用 1D GS Label 和 Gaussian Voting Splatting 代替高维特征蒸馏。ReSemGS-SLAM 的“semantic consistency perception”更关注标签更新是否可靠：它在快速语义渲染的基础上，增加跨帧一致性和置信度判断，目标是在实时运行中保持语义地图稳定。</p>",
      "quiz": {
        "q": "ReSemGS-SLAM 中语义一致性感知最可能解决的核心问题是什么？",
        "options": [
          "相机无法读取 RGB 图像",
          "2D 语义预测噪声导致 3D 高斯语义标签跨帧漂移",
          "3DGS 不能渲染颜色",
          "机器人只能在完全静态场景中停止"
        ],
        "answer": 1,
        "explain": "语义一致性感知通过比较当前语义观测和地图渲染语义，决定是否更新高斯语义状态，从而抑制单帧噪声和跨帧标签不一致。"
      }
    },
    {
      "id": "gts-slam",
      "num": 12,
      "name": "GTS-SLAM",
      "fullName": "GICP-3DGS紧耦合SLAM (GICP-3DGS Tightly-Coupled SLAM)",
      "year": "2026",
      "org": "MDPI Robotics",
      "parent": "cg-slam",
      "paperUrl": "https://www.mdpi.com/2624-8921/8/4/79",
      "projectUrl": "",
      "category": "slam",
      "motivation": "GICP+3DGS极端环境鲁棒SLAM",
      "summary": "GTS-SLAM 提出面向地下矿山等 GPS 拒止、低纹理、粉尘干扰环境的紧耦合 GICP + 3DGS 稠密 SLAM 框架，用协方差感知点云配准提供鲁棒位姿，用 3D Gaussian Splatting 后端提供高保真稠密地图。",
      "keyPoints": [
        "<strong>极端环境定位</strong>：目标场景是地下矿山、隧道巡检和智能矿车等弱纹理、低能见度、动态干扰环境",
        "<strong>GICP 前端</strong>：采用 Generalized ICP 做协方差感知点云配准，提升低纹理和粉尘条件下的位姿鲁棒性",
        "<strong>3DGS 后端</strong>：用概率式 3D Gaussian Splatting 构建稠密、可渲染地图，弥补传统点云/栅格地图视觉细节不足",
        "<strong>紧耦合设计</strong>：GICP 位姿估计与 3DGS 地图优化共享几何表示，而不是前后端完全割裂",
        "<strong>尺度正则与尺度对齐</strong>：约束高斯尺度和几何分布，使重建适合长隧道、矿道这类结构化空间",
        "<strong>关键帧因子图优化</strong>：用关键帧约束统一校正定位与地图，减少长距离运行累积漂移",
        "<strong>Compact-3DGS 压缩</strong>：通过紧凑高斯策略降低内存占用，满足车载/机器人实时运行需求"
      ],
      "detail": "<p><img alt=\"GTS-SLAM 系统图\" src=\"https://pub.mdpi-res.com/vehicles/vehicles-08-00079/article_deploy/html/images/vehicles-08-00079-g001.png\" />\n<em>图：GTS-SLAM 论文公开图片资源。MDPI 正文页面在当前环境中返回访问限制，但静态图片资源可访问。</em></p>\n<pre><code class=\"language-python\"># GTS-SLAM 核心流程伪代码\ndef gts_slam(rgbd_or_lidar_stream):\n    gaussian_map = initialize_compact_3dgs()\n    factor_graph = KeyframeFactorGraph()\n\n    for frame in rgbd_or_lidar_stream:\n        # 1. 从深度/LiDAR 构造点云和局部协方差\n        cloud = build_point_cloud(frame)\n        covariances = estimate_local_covariances(cloud)\n\n        # 2. GICP 前端估计相对位姿\n        T_pred = motion_model()\n        T_gicp = generalized_icp(\n            source=cloud,\n            target=render_or_extract_map_cloud(gaussian_map),\n            cov_src=covariances,\n            init=T_pred,\n        )\n\n        # 3. 关键帧因子图融合里程计/配准约束\n        if should_create_keyframe(frame, T_gicp):\n            kf = make_keyframe(frame, T_gicp)\n            factor_graph.add_gicp_factor(kf)\n            factor_graph.optimize()\n\n        # 4. 3DGS 后端：用优化后位姿更新稠密高斯地图\n        pose = factor_graph.current_pose()\n        loss = photometric_loss(gaussian_map, frame, pose)\n        loss += geometric_depth_loss(gaussian_map, frame, pose)\n        loss += scale_regularization(gaussian_map)\n        loss += scale_alignment(gaussian_map, cloud, pose)\n        gaussian_map = optimize_gaussians(gaussian_map, loss)\n\n        # 5. Compact-3DGS 压缩\n        gaussian_map = compact_prune_and_merge(gaussian_map)\n\n    return gaussian_map, factor_graph\n</code></pre>\n<h5>动机与背景</h5>\n<p>地下矿山和隧道对 SLAM 很不友好：GPS 不可用，视觉纹理弱，光照不均，粉尘和动态设备会干扰图像；单纯依赖特征点的视觉 SLAM 容易丢跟踪，单纯 LiDAR/点云 SLAM 又难提供可用于远程驾驶、检查和数字孪生的高保真视觉地图。</p>\n<p>GTS-SLAM 的思路是把几何鲁棒性和可渲染地图结合起来。前端使用 GICP 对点云进行协方差感知配准，后端用 3DGS 表示场景外观与几何，并通过因子图把关键帧约束统一起来。</p>\n<h5>GICP 前端</h5>\n<p>ICP 最小化点到点或点到面的距离，但没有充分表达局部表面不确定性。GICP 为源点和目标点都估计局部协方差，用 Mahalanobis 距离衡量配准误差：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{GICP}(T)=\n\\sum_i\ne_i^\\top\n\\left(C_i^s+R C_i^t R^\\top\\right)^{-1}\ne_i</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">e_i=p_i^t-Tp_i^s</span>，<span class=\"kb-math kb-math-inline\">C_i^s</span> 与 <span class=\"kb-math kb-math-inline\">C_i^t</span> 是源/目标点局部协方差，<span class=\"kb-math kb-math-inline\">T=[R,t]</span>。在矿道这类大平面、长走廊场景中，协方差信息能表达“沿平面方向不确定、法向更可靠”的几何结构，比普通点到点 ICP 更稳。</p>\n<h5>3DGS 后端与尺度约束</h5>\n<p>3DGS 后端维护一组高斯：</p>\n<div class=\"kb-math kb-math-display\">G_i=\\{\\mu_i,\\Sigma_i,c_i,\\alpha_i\\}</div>\n<p>给定关键帧位姿，系统渲染 RGB/深度并与观测比较，同时用尺度正则和尺度对齐避免高斯在长通道中发散。尺度正则控制单个高斯不过度拉伸；尺度对齐则让高斯分布与 GICP 前端看到的点云几何骨架一致。</p>\n<p>这种设计让 3DGS 不只是漂亮渲染器，而是与几何前端共享约束的地图后端。GICP 提供稳定位姿和几何骨架，3DGS 提供稠密外观、局部细节和新视角可视化。</p>\n<h5>关键帧因子图与紧耦合</h5>\n<p>GTS-SLAM 的“tight-coupled”体现在 GICP 和 3DGS 不是串行的一次性关系。GICP 前端输出的相对位姿成为因子图约束，优化后的关键帧位姿反过来用于 3DGS 建图；3DGS 地图也可以被渲染或提取成目标几何，支持后续 GICP 配准。</p>\n<p>关键帧因子图可写成：</p>\n<div class=\"kb-math kb-math-display\">\\min_{\\{T_k\\}}\n\\sum_{(i,j)\\in\\mathcal{E}}\n\\left\\|\n\\log\\left(Z_{ij}^{-1}T_i^{-1}T_j\\right)\n\\right\\|_{\\Omega_{ij}}^2</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">Z_{ij}</span> 是 GICP 或其他里程计给出的相对约束，<span class=\"kb-math kb-math-inline\">\\Omega_{ij}</span> 是信息矩阵。图优化用于减少长距离隧道运行中的累计误差。</p>\n<h5>Compact-3DGS</h5>\n<p>地下矿道是长序列、大场景，如果原样保留所有新增高斯，内存会快速膨胀。Compact-3DGS 通过删除低贡献高斯、合并冗余高斯或限制可见区域更新，使地图在保持渲染质量的同时满足实时和车载资源约束。</p>\n<div class=\"key-point\">💡 关键：GTS-SLAM 的核心不是“GICP 加一个渲染器”，而是让 GICP 的协方差几何约束和 3DGS 的可微稠密地图在关键帧因子图中互相支撑。</div>",
      "quiz": {
        "q": "GTS-SLAM 为什么选择 GICP 作为前端配准方法？",
        "options": [
          "GICP 可以利用点云局部协方差，在低纹理和结构化矿道环境中提供更稳健的几何配准",
          "GICP 会自动生成所有语义标签",
          "GICP 可以完全替代 3DGS 渲染",
          "GICP 只适用于纯文本输入"
        ],
        "answer": 0,
        "explain": "GICP 在误差项中考虑源点和目标点的局部协方差，比普通点到点 ICP 更能表达平面、走廊和弱纹理环境中的几何不确定性。"
      }
    },
    {
      "id": "cmp",
      "num": 13,
      "name": "CMP",
      "fullName": "认知建图与规划 (Cognitive Mapping and Planning)",
      "year": "2017",
      "org": "UCB/Google",
      "parent": "—",
      "paperUrl": "https://openaccess.thecvf.com/content_cvpr_2017/html/Gupta_Cognitive_Mapping_and_Planning_CVPR_2017_paper.html",
      "projectUrl": "",
      "category": "visual_navigation",
      "motivation": "可微认知地图+VIN端到端导航",
      "summary": "CMP 提出了一种端到端可微的 Mapper + Planner 架构，其中 Mapper 将第一人称视觉观测增量式地融合为自中心俯视图空间记忆（belief map），Planner 基于层级 Value Iteration Network 在该 belief map 上进行可微路径规划，解决了传统 SLAM 脆弱且不可微、端到端 RL 缺乏空间记忆的两大痛点。",
      "keyPoints": [
        "<strong>Mapper 架构</strong>：通过 CNN 将第一人称 RGB/深度图像映射为自中心俯视图 free space 预测，结合 ego-motion warp 和置信度加权融合，增量式构建多尺度空间 belief map",
        "<strong>可微 Warp 操作</strong>：利用双线性采样（bilinear sampling）根据 ego-motion 将上一时刻的 belief map 变换到当前坐标系，保持端到端可微性",
        "<strong>置信度加权更新</strong>：Mapper 同时输出 free space 预测 <span class=\"kb-math kb-math-inline\">f&#x27;_t</span> 和置信度 <span class=\"kb-math kb-math-inline\">c&#x27;_t</span>，通过加权平均公式融合历史与当前观测，类似 GRU 的门控机制",
        "<strong>层级 Value Iteration Network (VIN)</strong>：在多个空间尺度上执行 value iteration（卷积 + channel-wise max-pooling），以 <span class=\"kb-math kb-math-inline\">l \\cdot k</span> 次迭代覆盖 <span class=\"kb-math kb-math-inline\">l \\cdot 2^k</span> 步的规划范围",
        "<strong>端到端训练</strong>：整个系统通过 DAGGER（带 scheduled sampling 的模仿学习）训练，Mapper 无需显式地图监督，而是学习生成对 Planner 有用的表示",
        "<strong>两类导航任务</strong>：几何目标（PointGoal，到达指定坐标）和语义目标（ObjectGoal，找到指定类别物体），在 S3DIS 数据集的未见建筑上测试",
        "<strong>显著优于基线</strong>：在几何任务上 CMP（depth）达到 89.3% 成功率 / 73.7% SPL，超越 LSTM（88.5% / 69.1%）和 Reactive（62.2% / 52.0%）基线"
      ],
      "detail": "<h5>整体架构</h5>\n<p><img alt=\"CMP 整体架构\" src=\"https://ar5iv.labs.arxiv.org/html/1702.03920/assets/x1.png\" />\n<em>图 1：CMP 整体架构。Mapper 将第一人称图像转换为自中心俯视图 belief map，Planner 在 belief map 上通过 Value Iteration 输出动作策略。整个系统端到端可微。</em></p>\n<p><img alt=\"Mapper 网络结构\" src=\"https://ar5iv.labs.arxiv.org/html/1702.03920/assets/x2.png\" />\n<em>图 2：Mapper 的 CNN 架构。ResNet 编码器提取图像特征，经全连接层变换到俯视图空间，再通过上卷积解码器输出 free space 预测和置信度。</em></p>\n<p><img alt=\"层级 Planner 架构\" src=\"https://ar5iv.labs.arxiv.org/html/1702.03920/assets/x3.png\" />\n<em>图 3：层级 Planner 架构。在多个空间尺度上执行 value iteration（卷积 + max-pooling），从粗到细逐级规划，实现高效长程路径规划。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># CMP: Cognitive Mapping and Planning 核心流程\n# 初始化\nf_0 = zeros(H, W)  # belief map (free space)\nc_0 = zeros(H, W)  # confidence map\n\nfor t in range(1, T+1):\n    # === MAPPER ===\n    # 1. Warp: 根据 ego-motion 将上一步 belief 变换到当前坐标系\n    rho = compute_backward_flow(e_t)          # 解析计算 ego-motion 对应的光流\n    f_prev_warped = bilinear_sample(f_{t-1}, rho)  # 可微双线性采样\n    c_prev_warped = bilinear_sample(c_{t-1}, rho)\n\n    # 2. Observe: CNN 从当前图像预测俯视图 free space + 置信度\n    f_prime_t, c_prime_t = phi_CNN(I_t)       # ResNet encoder → FC → UpConv decoder\n\n    # 3. Update: 置信度加权融合\n    f_t = (f_prev_warped * c_prev_warped + f_prime_t * c_prime_t) / (c_prev_warped + c_prime_t)\n    c_t = c_prev_warped + c_prime_t\n\n    # === PLANNER (Hierarchical VIN) ===\n    # 多尺度 value iteration\n    for scale in range(K, -1, -1):  # 从最粗到最细\n        map_s = downsample(f_t, factor=2^scale)\n        goal_s = downsample(goal_map, factor=2^scale)\n        reward = compute_reward(map_s, goal_s)\n        value = zeros_like(map_s)\n        for i in range(l):  # l 次 value iteration\n            Q = conv3x3(value) + reward       # 卷积实现邻域值传播\n            value = channel_wise_max(Q)        # max-pooling 选最优动作\n        if scale &gt; 0:\n            value = center_crop_and_upsample(value)  # 传递到下一细尺度\n\n    # 从最细尺度的 value map 提取当前位置的动作\n    action_t = extract_policy(Q, robot_position)\n\n# 训练: DAGGER with scheduled sampling\n# 专家策略 = 图上最短路径; 逐步退火专家采样概率 (inverse sigmoid decay)\n</code></pre>\n<h5>动机与背景：为什么需要 CMP？</h5>\n<p>传统视觉导航方法分为两大阵营，各有致命缺陷。<strong>经典 SLAM + 路径规划</strong>方法（如 ORB-SLAM + A<em>）将问题分解为定位、建图、规划三个独立模块。这种方法依赖精确的几何重建，对传感器噪声、纹理缺失区域（如白墙）和动态环境极为脆弱。论文实验也验证了这一点：经典方法在使用 RGB 输入时 SPL 仅为 15.9%，因为纹理缺失的墙面无法被三角化重建，导致机器人直接撞上去。另一方面，</em><em>端到端深度强化学习</em>*方法（如 DQN/A3C 直接从像素到动作）虽然避免了显式建图的脆弱性，但缺乏空间记忆机制——纯反应式策略无法记住已探索区域，LSTM 的隐状态也难以编码复杂的空间拓扑结构。实验表明，反应式策略在训练环境上表现良好（记忆了布局），但在未见环境上成功率骤降至 8.2%。</p>\n<p>CMP 的核心洞察是：<strong>将空间记忆显式建模为自中心俯视图 belief map，同时保持整个系统端到端可微</strong>。这兼具了经典方法的空间推理能力和深度学习的鲁棒性与可学习性。</p>\n<h5>核心机制：Mapper 的三步更新</h5>\n<p>Mapper 的核心更新公式为：</p>\n<div class=\"kb-math kb-math-display\">f_t = U\\big(W(f_{t-1}, e_t),\\; \\phi(I_t)\\big)</div>\n<p>其中三个组件各司其职：</p>\n<p><strong>Warp 函数 <span class=\"kb-math kb-math-inline\">W</span></strong>：给定 ego-motion <span class=\"kb-math kb-math-inline\">e_t</span>（由动作产生的平移/旋转），解析计算一个 backward flow field <span class=\"kb-math kb-math-inline\">\\rho(e_t)</span>，将上一时刻的 belief map <span class=\"kb-math kb-math-inline\">f_{t-1}</span> 通过双线性采样变换到当前坐标系。关键设计是始终在<strong>机器人自中心坐标系</strong>下表示 belief map，而非全局坐标系。这大大简化了 CNN 的学习任务——网络只需预测\"正前方的 free space\"，而不需要处理任意旋转角度下的预测。双线性采样来自 Spatial Transformer Network，保证了梯度可以从 <span class=\"kb-math kb-math-inline\">f_t</span> 反传到 <span class=\"kb-math kb-math-inline\">f_{t-1}</span>。</p>\n<p><strong>观测函数 <span class=\"kb-math kb-math-inline\">\\phi</span></strong>：一个 ResNet-50 编码器 + 全连接层 + 上卷积解码器的 CNN。编码器在 2D 图像空间提取语义特征，全连接层完成从第一人称视角到俯视图的视角变换（这是一个非局部的几何变换，因此需要全连接层而非纯卷积），解码器上采样生成 free space 预测 <span class=\"kb-math kb-math-inline\">f&#x27;_t</span> 和置信度 <span class=\"kb-math kb-math-inline\">c&#x27;_t</span>。网络能利用语义线索（地板、墙壁、家具的外观和常见尺寸）来推断 free space，甚至对部分遮挡的区域也能做出合理预测。</p>\n<p><strong>更新函数 <span class=\"kb-math kb-math-inline\">U</span></strong>：采用解析的置信度加权平均：</p>\n<div class=\"kb-math kb-math-display\">f_t = \\frac{f_{t-1} \\cdot c_{t-1} + f&#x27;_t \\cdot c&#x27;_t}{c_{t-1} + c&#x27;_t}, \\quad c_t = c_{t-1} + c&#x27;_t</div>\n<p>这类似于 GRU 的更新门机制：置信度 <span class=\"kb-math kb-math-inline\">c&#x27;_t</span> 控制新观测对 belief 的影响权重。多次观测同一区域会累积置信度，使 belief 更加稳定；新探索区域的置信度低，容易被新观测覆盖。作者选择解析形式以保持架构简洁，但指出可替换为 LSTM 等更强表达力的函数。</p>\n<h5>层级 Value Iteration Planner</h5>\n<p>Planner 基于 Value Iteration Network (VIN)，其核心思想是将 value iteration 算法实现为深度卷积网络：每次 value iteration 对应一个 <span class=\"kb-math kb-math-inline\">3 \\times 3</span> 卷积（传播邻域值）加 channel-wise max-pooling（选择最优动作方向）。然而，原始 VIN 的规划步数等于网络深度，对于长程导航（32+ 步）计算和梯度传播都不可行。</p>\n<p>CMP 引入<strong>层级规划</strong>：将 belief map 下采样 <span class=\"kb-math kb-math-inline\">k</span> 倍，在粗尺度上执行 <span class=\"kb-math kb-math-inline\">l</span> 次 value iteration，然后中心裁剪、上采样到细尺度继续迭代。这样只需 <span class=\"kb-math kb-math-inline\">l \\cdot k</span> 次迭代就能覆盖 <span class=\"kb-math kb-math-inline\">l \\cdot 2^k</span> 步的规划范围，实现了指数级的效率提升。</p>\n<div class=\"key-point\">💡 <strong>关键创新</strong>：Planner 是<strong>学习</strong>得到的而非手工指定的。由于 belief map 是部分观测的（未探索区域的置信度为零），学习到的 Planner 能自然地处理不确定性——它知道哪些区域已观测、哪些未知，并据此做出探索-利用的权衡。</div>\n<h5>训练流程与端到端学习</h5>\n<p>整个 CMP 系统使用 <strong>DAGGER</strong>（Dataset Aggregation）进行模仿学习训练。专家策略通过在离散化的导航图上计算最短路径获得。训练采用 online DAGGER：每个 episode 中，以一定概率从专家策略或当前学习策略采样下一步动作，概率通过 inverse sigmoid decay 逐步退火。</p>\n<div class=\"warn-box\">⚠️ <strong>重要设计</strong>：Mapper 没有显式的地图重建监督。它不需要产生与 ground truth free space 匹配的地图，而是学习生成对 Planner 有用的表示。这意味着 Mapper 可能学会编码超越纯几何信息的语义特征（如\"这里看起来像走廊尽头，应该有门\"）。</div>\n<p>训练细节：ADAM 优化器，学习率 0.001 每 20K 迭代衰减 10 倍，共 60K 迭代。使用 ImageNet 预训练的 ResNet-50，深度图像通过 cross-modal distillation 从 RGB 模型迁移获得预训练权重。</p>\n<h5>实验结果与对比</h5>\n<p>在 S3DIS 数据集上，测试集为训练中完全未见的建筑楼层：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>几何任务成功率 (t=199)</th>\n<th>SPL</th>\n<th>语义任务成功率 (t=199)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Reactive (4帧, depth)</td>\n<td>62.2%</td>\n<td>52.0%</td>\n<td>32.1%</td>\n</tr>\n<tr>\n<td>LSTM (depth)</td>\n<td>88.5%</td>\n<td>69.1%</td>\n<td>29.3%</td>\n</tr>\n<tr>\n<td><strong>CMP (depth)</strong></td>\n<td><strong>89.3%</strong></td>\n<td><strong>73.7%</strong></td>\n<td><strong>51.0%</strong></td>\n</tr>\n<tr>\n<td>Classical (depth)</td>\n<td>90.7%</td>\n<td>80.6%</td>\n<td>43.9%</td>\n</tr>\n<tr>\n<td>Classical (RGB)</td>\n<td>17.7%</td>\n<td>15.9%</td>\n<td>22.5%</td>\n</tr>\n<tr>\n<td><strong>CMP (RGB)</strong></td>\n<td><strong>80.0%</strong></td>\n<td><strong>59.4%</strong></td>\n<td><strong>40.5%</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>CMP 在所有学习方法中表现最优。与经典方法相比，CMP 在 RGB 输入下优势巨大（59.4% vs 15.9% SPL），因为经典方法无法重建纹理缺失的表面。在 depth 输入下经典方法略优（依赖精确的深度传感器和完美位姿），但 CMP 加入更多训练数据（+6 个 Matterport3D 环境）后达到 82.3% SPL，超越经典方法。</p>",
      "quiz": {
        "q": "CMP 中 Mapper 的 belief map 始终在哪个坐标系下表示？这样设计的主要好处是什么？",
        "options": [
          "全局世界坐标系；方便多智能体共享地图",
          "机器人自中心坐标系；简化 CNN 的学习任务，只需预测当前视角下的 free space",
          "目标点坐标系；使 Planner 可以直接读取到目标的距离",
          "上一时刻坐标系；避免 ego-motion 累积误差"
        ],
        "answer": 1,
        "explain": "CMP 始终在机器人当前自中心坐标系下维护 belief map，这使得 CNN 只需学习从当前视角预测正前方的 free space，而不需要处理由累积 ego-motion 决定的任意世界坐标方向，大大降低了学习难度。"
      }
    },
    {
      "id": "neural-slam",
      "num": 14,
      "name": "Neural SLAM",
      "fullName": "主动神经SLAM (Active Neural SLAM)",
      "year": "2020",
      "org": "CMU",
      "parent": "cmp",
      "paperUrl": "https://arxiv.org/abs/2004.05155",
      "projectUrl": "",
      "category": "visual_navigation",
      "motivation": "模块化神经SLAM三层架构",
      "summary": "Active Neural SLAM（ANS）提出了一种模块化层次化的视觉导航架构，将端到端导航任务解耦为 **Neural SLAM 建图**、**Global Policy 全局规划** 和 **Local Policy 局部控制** 三个独立可训练模块，结合经典路径规划器（Fast Marching Method），在探索和 PointGoal 导航任务上大幅超越端到端基线，并赢得 Habitat Challenge 2019 冠军。",
      "keyPoints": [
        "<strong>模块化三层架构</strong>：Neural SLAM Module（建图+位姿估计）→ Global Policy（长期目标选择）→ Planner（FMM 最短路径）→ Local Policy（底层动作执行），各模块独立训练、可替换",
        "<strong>Neural SLAM 模块</strong>：包含 Mapper（RGB → 自中心 2D 占据地图，通过空间变换注册到全局地图）和 Pose Estimator（对比连续帧地图预测位姿修正，替代传统里程计）",
        "<strong>Global Policy</strong>：CNN 网络接收 <span class=\"kb-math kb-math-inline\">4 \\times G \\times G</span> 的地图张量（障碍物、已探索区域、当前位置、已访问区域），输出 <span class=\"kb-math kb-math-inline\">G \\times G</span> 空间中的长期目标点；使用 PPO 训练，奖励为覆盖面积增量",
        "<strong>Local Policy</strong>：基于 ResNet18 的循环网络，接收 RGB 观测和相对短期目标（距离+角度），通过模仿学习训练，将短期目标转化为底层导航动作",
        "<strong>Fast Marching Method 规划器</strong>：在预测地图上计算从当前位置到长期目标的最短路径，提取短期目标作为 Local Policy 的输入，桥接全局与局部决策",
        "<strong>真实噪声建模</strong>：基于 LoCoBot 实机数据采集，用高斯混合模型（GMM）分别拟合执行噪声和传感器噪声，注入 Habitat 仿真器实现 sim-to-real 对齐",
        "<strong>Exploration 任务</strong>：Gibson Val 上 94.8% 覆盖率 vs 最佳基线 78.9%；跨域迁移 Gibson→MP3D 达 52.1% vs 37.8%",
        "<strong>PointGoal 任务</strong>：Habitat Challenge 2019 冠军，RGB 赛道 SPL 0.805，RGB-D 赛道 SPL 0.948"
      ],
      "detail": "<h5>核心架构示意图</h5>\n<p><img alt=\"ANS 整体架构\" src=\"https://arxiv.org/html/2004.05155v2/extracted/3629058/figures/model.png\" />\n<em>图：Active Neural SLAM 整体架构。RGB 观测经 Neural SLAM 模块生成 2D 地图和位姿估计，Global Policy 在地图上选择长期目标，Planner 规划路径并提取短期目标，Local Policy 输出底层动作。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Active Neural SLAM 主循环伪代码\nInitialize: map m_0, pose x_0, global_goal g_long\n\nfor t in range(T):\n    # 1. Neural SLAM: 更新地图和位姿\n    s_t = get_rgb_observation()\n    x_t_sensor = get_sensor_pose()\n\n    # Mapper: RGB → egocentric 2D map → register to global map\n    p_t = Mapper(s_t)                          # 预测自中心占据地图 (2×V×V)\n    m_t = SpatialTransform(m_{t-1}, p_t, x_t)  # 注册到全局坐标系\n\n    # Pose Estimator: 对比连续帧地图修正位姿\n    dx_t = PoseEstimator(p_t, p_{t-1}, x_t_sensor - x_{t-1}_sensor)\n    x_t = x_{t-1} + dx_t                       # 修正后的全局位姿\n\n    # 2. Global Policy: 每 H 步选择长期目标\n    if t % H == 0:\n        map_input = [obstacle, explored, current_pos, visited]  # 4×G×G\n        g_long = GlobalPolicy(map_input)        # 输出 G×G 空间中的目标点\n\n    # 3. Planner: FMM 最短路径 → 短期目标\n    path = FastMarchingMethod(m_t, x_t, g_long)\n    g_short = path[short_term_distance]         # 提取短期目标\n\n    # 4. Local Policy: 短期目标 → 动作\n    rel_dist, rel_angle = relative_goal(x_t, g_short)\n    a_t = LocalPolicy(s_t, rel_dist, rel_angle) # 输出: forward/left/right\n    execute(a_t)\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统端到端（end-to-end）导航方法试图用单一神经网络直接从像素映射到动作。这种方法存在三个根本性问题：</p>\n<ol>\n<li><strong>样本效率低下</strong>：策略需要同时隐式学习建图、规划和控制，导致训练所需样本量巨大</li>\n<li><strong>泛化能力差</strong>：端到端策略容易过拟合训练环境的视觉外观，难以迁移到新场景</li>\n<li><strong>长程推理困难</strong>：RNN/LSTM 难以维持长时间步的空间记忆，导致智能体在大场景中反复访问已探索区域</li>\n</ol>\n<div class=\"key-point\">💡 关键：ANS 的核心洞察是——导航问题天然具有层次结构，应当将\"在哪里建图\"（感知）、\"去哪里\"（规划）和\"怎么去\"（控制）解耦为独立模块，各自用最适合的方式训练。</div>\n<h5>Neural SLAM 模块详解</h5>\n<p>Neural SLAM 模块由 <strong>Mapper</strong> 和 <strong>Pose Estimator</strong> 两个子模块组成，负责从 RGB 观测构建 2D 俯视占据地图。</p>\n<p><strong>Mapper</strong> 的处理流程：\n1. 输入 RGB 图像 <span class=\"kb-math kb-math-inline\">s_t \\in \\mathbb{R}^{3 \\times H \\times W}</span>（128×128）\n2. 通过 5 层反卷积网络预测自中心（egocentric）2D 占据地图 <span class=\"kb-math kb-math-inline\">p_t \\in [0,1]^{2 \\times V \\times V}</span>，两个通道分别表示障碍物概率和已探索概率\n3. 使用基于位姿估计的空间变换（Spatial Transformation），将自中心地图注册到全局地图坐标系</p>\n<p>地图更新采用加权平均：</p>\n<div class=\"kb-math kb-math-display\">m_t(i,j) = \\frac{m_{t-1}(i,j) \\cdot c_{t-1}(i,j) + \\hat{m}_t(i,j)}{c_{t-1}(i,j) + 1}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">c_{t-1}(i,j)</span> 是像素 <span class=\"kb-math kb-math-inline\">(i,j)</span> 被观测到的次数，<span class=\"kb-math kb-math-inline\">\\hat{m}_t</span> 是当前帧注册后的地图预测。这种聚合方式使地图随时间推移越来越精确。</p>\n<p><strong>Pose Estimator</strong> 的设计动机在于：真实机器人的里程计存在累积漂移，尤其在旋转动作中误差显著。Pose Estimator 接收连续两帧的自中心地图 <span class=\"kb-math kb-math-inline\">p_{t-1}, p_t</span> 和传感器位姿差 <span class=\"kb-math kb-math-inline\">\\Delta x&#x27;_t</span>，通过 3 层卷积 + 3 层全连接网络预测位姿修正量 <span class=\"kb-math kb-math-inline\">\\Delta \\hat{x}_t = (\\Delta \\hat{x}, \\Delta \\hat{y}, \\Delta \\hat{o})</span>。</p>\n<div class=\"warn-box\">⚠️ 注意：Pose Estimator 的输入是<strong>地图空间</strong>的特征对比，而非原始 RGB 图像。这使得位姿估计与视觉外观解耦，大幅提升了跨域泛化能力。</div>\n<h5>Global Policy 与 Planner</h5>\n<p>Global Policy 是一个 5 层 CNN，每 <span class=\"kb-math kb-math-inline\">H=25</span> 个时间步被调用一次。其输入是一个 <span class=\"kb-math kb-math-inline\">4 \\times G \\times G</span>（<span class=\"kb-math kb-math-inline\">G=240</span>）的张量，4 个通道分别编码：\n- 障碍物地图（0/1）\n- 已探索区域（0/1）<br />\n- 当前智能体位置（one-hot）\n- 历史访问区域（0/1）</p>\n<p>此外，智能体朝向通过 Embedding 层单独编码并注入全连接层。Global Policy 输出一个 <span class=\"kb-math kb-math-inline\">G \\times G</span> 的概率分布，采样得到长期目标坐标。</p>\n<p>训练使用 PPO，奖励函数为覆盖面积增量（<span class=\"kb-math kb-math-inline\">m^2</span>）乘以 0.02 的缩放系数。值得注意的是，Global Policy 的一个\"步\"对应底层 25 个时间步，因此 PPO 的 horizon=40 实际对应 1000 个底层步。</p>\n<p><strong>Fast Marching Method（FMM）规划器</strong> 是连接 Global Policy 和 Local Policy 的桥梁。给定当前位置和长期目标，FMM 在预测地图的可通行区域上计算最短路径，然后在路径上距当前位置一定距离处提取短期目标。这种设计的优势在于：</p>\n<ol>\n<li>利用经典算法的最优性保证，避免学习路径规划</li>\n<li>将长程导航分解为一系列短程目标跟踪问题</li>\n<li>短期目标始终在可达范围内，降低 Local Policy 的学习难度</li>\n</ol>\n<h5>Local Policy 与训练策略</h5>\n<p>Local Policy 基于 ResNet18 + GRU 循环网络，接收 RGB 观测和相对短期目标（离散化的距离和角度），输出三个动作之一：前进 25cm、左转 10°、右转 10°。</p>\n<div class=\"key-point\">💡 关键：Local Policy 使用<strong>模仿学习</strong>而非强化学习训练。训练数据通过在仿真器中用最短路径规划器生成专家轨迹获得。这种方式比 RL 收敛更快，且不依赖奖励工程。</div>\n<p><strong>三个模块的训练完全独立</strong>：\n- <strong>Neural SLAM</strong>：监督学习，使用仿真器提供的地面真值地图和位姿，损失 = 二元交叉熵（地图）+ MSE（位姿，系数 10000）\n- <strong>Global Policy</strong>：强化学习（PPO），72 个并行线程，每线程对应一个 Gibson 训练场景\n- <strong>Local Policy</strong>：模仿学习（二元交叉熵），专家策略由最短路径规划器提供</p>\n<p>这种独立训练策略带来两个重要优势：（1）避免了端到端训练中梯度传播困难的问题；（2）每个模块可以用最适合其任务性质的学习范式。</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>端到端 RL</th>\n<th>经典 SLAM + 规划</th>\n<th>ANS（本文）</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>建图</td>\n<td>隐式（RNN 记忆）</td>\n<td>几何方法（特征匹配）</td>\n<td>学习型 Mapper + Pose Estimator</td>\n</tr>\n<tr>\n<td>规划</td>\n<td>隐式（策略网络）</td>\n<td>A*/Dijkstra</td>\n<td>Global Policy（学习）+ FMM（经典）</td>\n</tr>\n<tr>\n<td>控制</td>\n<td>端到端策略</td>\n<td>PID 控制器</td>\n<td>Local Policy（学习）</td>\n</tr>\n<tr>\n<td>泛化</td>\n<td>差（过拟合外观）</td>\n<td>好（几何不变）</td>\n<td>好（模块化解耦）</td>\n</tr>\n<tr>\n<td>样本效率</td>\n<td>低</td>\n<td>N/A</td>\n<td>高（独立训练）</td>\n</tr>\n</tbody>\n</table></div>\n<p>ANS 的核心创新在于<strong>在学习型组件和经典算法之间找到最优平衡</strong>：需要从数据中学习的部分（视觉建图、目标选择、底层控制）使用神经网络，而有成熟解析解的部分（路径规划）直接使用经典算法。</p>\n<h5>实验结果亮点</h5>\n<p><strong>Exploration 任务</strong>（Gibson Val，1000 步）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>覆盖率 (%)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Frontier-Based Exploration (FBE)</td>\n<td>73.2</td>\n</tr>\n<tr>\n<td>RL + Occupancy Anticipation</td>\n<td>78.9</td>\n</tr>\n<tr>\n<td><strong>ANS (本文)</strong></td>\n<td><strong>94.8</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>消融实验</strong>关键发现：\n- 移除 Pose Estimator：覆盖率下降 3.2%（最大影响）\n- 用 FBE 替换 Global Policy：下降 2.3%\n- 移除 Local Policy（直接用规划器动作）：下降 0.7%</p>\n<p><strong>跨域泛化</strong>（Gibson 训练 → MP3D 测试）：ANS 52.1% vs 最佳基线 37.8%，展示了模块化架构的强泛化能力。</p>\n<p><strong>PointGoal 导航</strong>（Habitat Challenge 2019）：\n- RGB 赛道：SPL = 0.805（冠军）\n- RGB-D 赛道：SPL = 0.948（冠军）</p>",
      "quiz": {
        "q": "Active Neural SLAM 中，Pose Estimator 的输入是什么？",
        "options": [
          "连续两帧 RGB 图像和 IMU 读数",
          "连续两帧的自中心预测地图和传感器位姿差",
          "全局地图和当前 RGB 图像",
          "激光雷达点云和里程计数据"
        ],
        "answer": 1,
        "explain": "Pose Estimator 接收连续两帧的自中心占据地图 p_{t-1}、p_t 和传感器位姿差 Δx'_t，在地图空间而非图像空间进行位姿修正，这使其与视觉外观解耦，提升跨域泛化能力。"
      }
    },
    {
      "id": "vtnet",
      "num": 15,
      "name": "VTNet",
      "fullName": "视觉Transformer网络 (Visual Transformer Network)",
      "year": "2021",
      "org": "Georgia Tech",
      "parent": "neural-slam",
      "paperUrl": "https://arxiv.org/abs/2108.vtnet",
      "projectUrl": "",
      "category": "visual_navigation",
      "motivation": "Transformer建模导航时序依赖",
      "summary": "VTNet 提出了一种基于 Visual Transformer 的视觉表示学习方法，通过设计空间增强局部描述子和位置全局描述子两种空间感知特征，并利用 Transformer 编解码器融合物体实例与场景区域信息，结合基于最短路径的预训练策略，显著提升了 Object Goal Navigation 的成功率和路径效率。",
      "keyPoints": [
        "<strong>Visual Transformer (VT) 架构</strong>：设计编码器-解码器结构融合局部物体特征与全局场景特征，利用多头注意力机制建模所有检测实例之间及其与观测区域之间的关系",
        "<strong>空间增强局部描述子 (Spatial-Enhanced Local Descriptor)</strong>：基于 DETR 检测器提取物体实例特征，拼接归一化边界框、置信度、语义标签和目标类别 one-hot 向量，通过 MLP 融合为 <span class=\"kb-math kb-math-inline\">L \\in \\mathbb{R}^{N \\times d}</span>",
        "<strong>位置全局描述子 (Positional Global Descriptor)</strong>：使用 ResNet18 提取全局特征图，通过 <span class=\"kb-math kb-math-inline\">1 \\times 1</span> 卷积降维后添加 2D 正弦/余弦位置编码，形成 <span class=\"kb-math kb-math-inline\">G \\in \\mathbb{R}^{hw \\times d}</span> 作为解码器查询",
        "<strong>VT 预训练方案</strong>：利用 Dijkstra 最短路径算法生成最优动作指令，以交叉熵损失监督训练 VT，建立视觉表示与导航动作的强关联，解决 RL 弱奖励信号下 Transformer 难以训练的问题",
        "<strong>导航策略网络</strong>：采用 A3C + LSTM 架构，输入 VT 解码特征、前一动作和状态嵌入，输出动作分布和价值估计",
        "<strong>实验结果</strong>：在 AI2-Thor 上达到 72.2% 成功率和 0.449 SPL，分别超越 SOTA 方法 ORG+TPN 约 3.2% 和 0.046"
      ],
      "detail": "<h5>系统总览</h5>\n<p><img alt=\"VTNet 系统架构图\" src=\"https://ar5iv.labs.arxiv.org/html/2105.09447v1/assets/x2.png\" />\n<em>图：VTNet 整体架构。左侧为 Visual Transformer 视觉表示学习模块（包含空间增强局部描述子、位置全局描述子和 VT 编解码器），右侧为 A3C 导航策略网络。预训练阶段用 MLP 替代 LSTM 直接预测动作。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># VTNet 训练流程伪代码\n\n# ===== Stage 1: VT 预训练 (20 epochs) =====\nfor epoch in range(20):\n    for observation, optimal_action in training_data:\n        # 1. 空间增强局部描述子\n        instances = DETR(observation)  # N个检测结果, 每个含instance_feat ∈ R^d\n        spatial_feat = concat(norm_bbox, confidence, label, target_onehot)  # R^{N×8}\n        L = MLP(concat(instances.features, spatial_feat))  # R^{N×d}\n\n        # 2. 位置全局描述子\n        global_feat = ResNet18(observation)  # R^{h×w×D}\n        global_feat = Conv1x1(global_feat)  # R^{h×w×d}\n        G = global_feat + PositionalEncoding2D()  # R^{hw×d}\n\n        # 3. VT 编码器: 局部描述子自注意力\n        L_prime = TransformerEncoder(L)  # key/value = L\n\n        # 4. VT 解码器: 全局描述子查询局部描述子\n        visual_repr = TransformerDecoder(query=G, key=L_prime, value=L_prime)\n\n        # 5. 预训练损失\n        action_pred = MLP_pretrain(visual_repr)\n        loss = CrossEntropy(action_pred, optimal_action)\n        loss.backward()\n\n# ===== Stage 2: 导航策略训练 (6M episodes, 16 async agents) =====\nfor episode in range(6_000_000):\n    # A3C with LSTM\n    h_t = LSTM.init()\n    for t in range(max_steps):\n        visual_repr = VTNet(observation_t)  # 使用预训练的VT (lr=1e-5)\n        input_t = concat(visual_repr, prev_action_embed, h_t)\n        policy, value, h_t = A3C_LSTM(input_t)  # lr=1e-4\n        action = argmax(policy)\n        # reward: +5 成功, -0.001 每步惩罚\n</code></pre>\n<h5>动机与背景</h5>\n<p>Object Goal Navigation 要求智能体仅凭第一人称 RGB 图像在未知环境中找到指定类别的目标物体。此前方法存在两个关键问题：</p>\n<ol>\n<li><strong>视觉表示不充分</strong>：ORG（Du et al., 2020）仅选取每个类别中置信度最高的一个检测结果构建物体关系图，丢失了同类多实例信息，且易受假阳性影响。此外，ORG 从 Faster R-CNN 骨干网络第二层提取特征，并非特征金字塔中最具判别力的特征。</li>\n<li><strong>Transformer 训练困难</strong>：直接用 RL 的弱奖励信号训练深层 Transformer 极其困难，智能体倾向于在约 5 步后选择终止动作以减少惩罚。</li>\n</ol>\n<h5>核心机制详解</h5>\n<p><strong>1. 空间增强局部描述子</strong></p>\n<p>VTNet 使用 DETR 作为目标检测器，相比 Faster R-CNN 有两个优势：(a) DETR 解码器输出的特征已经嵌入了全局上下文信息，更具信息量；(b) DETR 特征经过解码器对齐，具有尺度鲁棒性。</p>\n<p>对每个检测到的物体实例，构建空间特征向量：</p>\n<div class=\"kb-math kb-math-display\">\\text{spatial}_i = [\\underbrace{x_1, y_1, x_2, y_2}_{\\text{归一化bbox}}, \\underbrace{c}_{\\text{置信度}}, \\underbrace{l}_{\\text{语义标签}}, \\underbrace{t}_{\\text{目标one-hot}}] \\in \\mathbb{R}^{8}</div>\n<p>然后将 DETR 实例特征与空间特征拼接，通过两层全连接网络（ReLU 激活）融合：</p>\n<div class=\"kb-math kb-math-display\">L = \\text{MLP}([\\text{instance\\_feat}; \\text{spatial}]) \\in \\mathbb{R}^{N \\times d}</div>\n<div class=\"key-point\">💡 <strong>关键</strong>：VTNet 保留<strong>所有</strong> <span class=\"kb-math kb-math-inline\">N</span> 个检测实例（而非每类仅取一个），使 Transformer 能够建模同类多实例之间的关系。</div>\n<p><strong>2. 位置全局描述子</strong></p>\n<p>使用 ImageNet 预训练的 ResNet18 提取全局特征图 <span class=\"kb-math kb-math-inline\">\\mathbb{R}^{h \\times w \\times D}</span>，通过 <span class=\"kb-math kb-math-inline\">1 \\times 1</span> 卷积降维至 <span class=\"kb-math kb-math-inline\">d</span> 维。为每个空间位置添加 2D 正弦/余弦位置编码：</p>\n<div class=\"kb-math kb-math-display\">PE_{2i}(u,v) = \\begin{cases} \\sin(u / 10000^{2i/d}), &amp; 0 &lt; i \\leq d/2 \\\\ \\sin(v / 10000^{2i/d}), &amp; d/2 &lt; i \\leq d \\end{cases}</div>\n<div class=\"kb-math kb-math-display\">PE_{2i+1}(u,v) = \\begin{cases} \\cos(u / 10000^{2i/d}), &amp; 0 &lt; i \\leq d/2 \\\\ \\cos(v / 10000^{2i/d}), &amp; d/2 &lt; i \\leq d \\end{cases}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">u, v</span> 为区域的行列索引。位置编码使每个全局特征对应观测图像的特定区域，为导航提供方向性信号——例如目标在视野右侧时应优先选择 RotateRight。</p>\n<p><strong>3. Visual Transformer 编解码器</strong></p>\n<ul>\n<li><strong>编码器</strong>：对局部描述子 <span class=\"kb-math kb-math-inline\">L</span> 执行多头自注意力，捕获所有检测实例之间的关系，输出编码后的 <span class=\"kb-math kb-math-inline\">L&#x27;</span>。</li>\n<li><strong>解码器</strong>：以位置全局描述子 <span class=\"kb-math kb-math-inline\">G</span> 为查询（query），编码后的局部描述子 <span class=\"kb-math kb-math-inline\">L&#x27;</span> 为键值（key/value），执行交叉注意力：</li>\n</ul>\n<div class=\"kb-math kb-math-display\">\\text{Attention}(G, L&#x27;) = \\text{softmax}\\left(\\frac{G \\cdot L&#x27;^T}{\\sqrt{d}}\\right) L&#x27;</div>\n<div class=\"warn-box\">⚠️ <strong>设计意图</strong>：编码器专注于物体间关系建模，解码器负责将物体信息与空间区域对齐。消融实验表明，这种功能分离优于将两种描述子混合输入同一模块。</div>\n<p><strong>4. VT 预训练方案</strong></p>\n<p>这是 VTNet 能够成功训练的关键。使用 Dijkstra 最短路径算法在训练环境中为每个（起点, 目标）对生成最优动作序列。预训练阶段：</p>\n<ul>\n<li>不使用 LSTM 和历史状态，仅基于当前帧的 VT 输出特征</li>\n<li>用 MLP 预测动作分布，以交叉熵损失监督：</li>\n</ul>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{vt} = \\text{CE}(a_t, \\hat{a})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">a_t</span> 为预测动作，<span class=\"kb-math kb-math-inline\">\\hat{a}</span> 为最优动作指令。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：预训练后的 VT 特征已与导航方向信号强关联（因为仅用 MLP 就能预测正确动作），这大幅降低了后续 RL 训练的难度。不使用预训练时，智能体完全无法学到有效策略。</div>\n<h5>实验与消融</h5>\n<p><strong>主实验（AI2-Thor, 22 类目标, 120 房间）</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>成功率 (%)</th>\n<th>SPL</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Random</td>\n<td>8.0</td>\n<td>0.036</td>\n</tr>\n<tr>\n<td>SAVN (2019)</td>\n<td>40.8</td>\n<td>0.161</td>\n</tr>\n<tr>\n<td>ORG (2020)</td>\n<td>65.3</td>\n<td>0.375</td>\n</tr>\n<tr>\n<td>ORG+TPN (2020)</td>\n<td>69.3</td>\n<td>0.394</td>\n</tr>\n<tr>\n<td>Baseline (DETR+ResNet, 无VT)</td>\n<td>62.6</td>\n<td>0.364</td>\n</tr>\n<tr>\n<td><strong>VTNet</strong></td>\n<td><strong>72.2</strong></td>\n<td><strong>0.449</strong></td>\n</tr>\n<tr>\n<td>VTNet+TPN</td>\n<td>73.5</td>\n<td>0.440</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>关键消融结论</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>变体</th>\n<th>成功率</th>\n<th>SPL</th>\n<th>说明</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>VTNet w/o global</td>\n<td>71.0</td>\n<td>0.432</td>\n<td>移除全局特征，性能下降</td>\n</tr>\n<tr>\n<td>VTNet w/o pe</td>\n<td>70.1</td>\n<td>0.411</td>\n<td>移除位置编码，空间信息缺失</td>\n</tr>\n<tr>\n<td>VTNet w/o decoder</td>\n<td>62.6</td>\n<td>0.365</td>\n<td>移除解码器直接拼接，退化为 Baseline</td>\n</tr>\n<tr>\n<td>VTNet w/o pretrain</td>\n<td>失败</td>\n<td>—</td>\n<td>无法收敛，智能体约 5 步即终止</td>\n</tr>\n<tr>\n<td>DETR vs Faster R-CNN</td>\n<td>72.2 vs 70.3</td>\n<td>0.449 vs 0.387</td>\n<td>DETR 特征更具信息量</td>\n</tr>\n</tbody>\n</table></div>\n<p><img alt=\"VTNet 导航案例对比\" src=\"https://ar5iv.labs.arxiv.org/html/2105.09447v1/assets/x3.png\" />\n<em>图：四种方法在测试环境中寻找 RemoteControl 的导航轨迹对比。VTNet 以最少步数成功到达目标（绿色轨迹），ORG 成功但步数更多，SAVN 和 Baseline 均失败（红色轨迹）。</em></p>\n<h5>与传统方法的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>ORG (Du et al., 2020)</th>\n<th>VTNet</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>检测器</td>\n<td>Faster R-CNN (第二层特征)</td>\n<td>DETR (解码器输出特征)</td>\n</tr>\n<tr>\n<td>实例选择</td>\n<td>每类仅取最高置信度</td>\n<td>保留所有 N 个检测结果</td>\n</tr>\n<tr>\n<td>特征融合</td>\n<td>图神经网络 (GNN)</td>\n<td>Transformer 编解码器</td>\n</tr>\n<tr>\n<td>全局特征</td>\n<td>直接拼接</td>\n<td>位置编码 + 解码器交叉注意力</td>\n</tr>\n<tr>\n<td>训练策略</td>\n<td>端到端 RL</td>\n<td>两阶段：VT 预训练 + RL 微调</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "VTNet 中预训练方案的核心作用是什么？",
        "options": [
          "提升 DETR 检测器在 AI2-Thor 数据集上的检测精度",
          "通过最短路径监督建立视觉表示与导航动作的关联，解决 RL 弱奖励下 Transformer 难以训练的问题",
          "利用 ImageNet 预训练权重初始化 ResNet18 全局特征提取器",
          "通过对比学习增强局部描述子与全局描述子之间的一致性"
        ],
        "answer": 1,
        "explain": "VTNet 使用 Dijkstra 最短路径生成最优动作指令，以交叉熵损失预训练 VT，使解码特征与导航方向信号强关联。消融实验表明不使用预训练时智能体完全无法学到有效策略。"
      }
    },
    {
      "id": "vlmnav",
      "num": 16,
      "name": "VLMnav",
      "fullName": "VLM导航框架 (VLM Navigation Framework)",
      "year": "2026",
      "org": "Stanford",
      "parent": "vtnet",
      "paperUrl": "https://arxiv.org/abs/2601.vlmnav",
      "projectUrl": "",
      "category": "visual_navigation",
      "motivation": "通用VLM直接驱动导航策略",
      "summary": "VLMnav 将视觉语言模型转化为零样本端到端导航策略，通过深度可达性分析生成离散可行动作、把动作投影到第一视角图像并让 VLM 选择，从而避免训练专用导航策略和复杂模块化语义地图规划。",
      "keyPoints": [
        "<strong>问题重写</strong>：把导航动作选择转化为 VLM 擅长的“看图回答选择题”",
        "<strong>零样本策略</strong>：不对 VLM 做导航数据微调，直接通过 prompt 驱动通用 VLM 选择动作",
        "<strong>RGB-D + Pose 输入</strong>：使用第一视角 RGB-D、机器人位姿和语言/图像目标作为输入",
        "<strong>可达性计算</strong>：利用深度图估计局部 navigability mask，生成不会撞障碍的候选极坐标动作",
        "<strong>探索偏置 Action Proposer</strong>：维护 explored/unexplored voxel map，优先提出指向未探索区域且视觉间距足够的动作",
        "<strong>视觉投影标注</strong>：把候选动作编号/箭头投影到 RGB 图像，让 VLM 在图像空间中理解动作含义",
        "<strong>分离终止判断</strong>：使用单独 VLM prompt 判断是否 stop，并要求连续两次 stop 以降低误停",
        "<strong>依据限制说明</strong>：清单 URL 疑似占位符；公开论文为 <code>End-to-End Navigation with Vision-Language Models: Transforming Spatial Reasoning into Question-Answering</code>，arXiv <code>2411.05755</code>"
      ],
      "detail": "<p><img alt=\"VLMnav 方法总览\" src=\"https://jirl-upenn.github.io/VLMnav/static/images/main.png\" />\n<em>图：VLMnav 项目页方法图。系统生成可导航动作、投影到第一视角图像，再由 VLM 根据目标和图像标注选择动作。</em></p>\n<div class=\"warn-box\">⚠️ 依据限制：清单中的 <code>paper_url</code> 为 <code>https://arxiv.org/abs/2601.vlmnav</code> 且机构写为 Stanford，当前公开可检索的 VLMnav 论文是 2024 arXiv / 2025 PMLR 版本，作者来自 UC Berkeley 和 University of Pennsylvania。以下内容基于该公开版本整理，YAML 元信息保持清单原样。</div>\n<pre><code class=\"language-python\"># VLMnav 核心流程伪代码\ndef vlmnav(goal, rgbd_stream, pose_stream, vlm):\n    voxel_map = VoxelMap()\n    stop_votes = 0\n\n    for rgbd, pose in zip(rgbd_stream, pose_stream):\n        # 1. 用深度估计局部可达区域\n        navigable = compute_navigability_mask(rgbd.depth)\n        polar_actions = farthest_collision_free_actions(navigable)\n\n        # 2. 更新 explored / unexplored voxel map\n        voxel_map.update(rgbd.depth, pose)\n\n        # 3. 动作提议：优先未探索方向，并保持动作之间视觉间距\n        actions = propose_actions_with_explore_bias(polar_actions, voxel_map)\n        if len(actions) == 0:\n            actions = [turn_around_action()]\n\n        # 4. 把动作编号投影到 RGB 图像\n        annotated = project_actions_to_image(rgbd.rgb, actions, pose)\n\n        # 5. VLM 选择动作\n        prompt = build_action_prompt(goal, actions)\n        action_id = vlm.choose(prompt, annotated)\n        execute(actions[action_id])\n\n        # 6. 单独终止 prompt，连续两次 stop 才结束\n        stop_prompt = build_termination_prompt(goal)\n        if vlm.should_stop(stop_prompt, rgbd.rgb):\n            stop_votes += 1\n        else:\n            stop_votes = 0\n        if stop_votes &gt;= 2:\n            break\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统视觉导航通常把系统拆成感知、建图、语义理解、全局规划、局部控制等模块。这样可解释但复杂，并且每个模块都可能需要任务特化训练。直接端到端策略则需要大量导航数据，泛化到新目标和新环境困难。</p>\n<p>VLMnav 的核心假设是：现代 VLM 已经具备一定空间和语义推理能力，但不擅长输出连续控制量。因此系统不让 VLM 直接回归坐标，而是先用几何模块生成可行动作集合，再把动作变成图像上的编号选择题。</p>\n<h5>可达性与动作生成</h5>\n<p>输入深度图后，系统估计机器人前方哪些像素对应可到达区域，并对每个方向计算无碰撞前进距离。动作被表示为极坐标：</p>\n<div class=\"kb-math kb-math-display\">a_i=(r_i,\\theta_i)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">r_i</span> 是可前进距离，<span class=\"kb-math kb-math-inline\">\\theta_i</span> 是相对航向角。这样，动作空间从连续控制变成有限候选集合 <span class=\"kb-math kb-math-inline\">\\mathcal{A}_t=\\{a_1,\\dots,a_K\\}</span>，VLM 只需选择一个编号。</p>\n<h5>探索偏置</h5>\n<p>VLM 本身不维护可靠的空间覆盖记忆，所以 VLMnav 使用一个轻量 top-down voxel map 标记 explored 与 unexplored。Action Proposer 会优先保留朝向未探索区域的动作，并要求动作之间有足够角度间距，避免图像上编号挤在一起导致 VLM 混淆。</p>\n<p>如果机器人卡在角落、没有可前进动作，系统加入特殊的 <code>turn around</code> 动作。这使得 VLM 不必自己推导复杂局部避障，只需在可行候选中做语义和探索权衡。</p>\n<h5>图像投影与 Prompt</h5>\n<p>候选动作被投影到第一视角 RGB 图像上，形成带编号的 annotated image。Prompt 要求 VLM 描述空间布局、制定高层计划，再输出动作编号。这个设计把“空间坐标推理”转换成“图像中哪个箭头更合理”的问题，符合 VLM 的视觉问答能力。</p>\n<p>对于图像目标导航，目标图像也会一起输入 VLM；对于语言目标导航，prompt 中写明目标类别或描述。VLMnav 因此能覆盖 ObjectNav 和 GOAT 这类目标可能是语言、图像或类别的任务。</p>\n<h5>终止机制</h5>\n<p>导航任务必须在接近目标时 stop。VLMnav 不使用低层 point-goal policy，因此需要单独判断终止。系统用没有动作箭头干扰的图像和独立 prompt 询问是否应该停止，并要求连续两次 stop 才真正结束，以减少看见相似物体但距离不够时的误停。</p>\n<div class=\"key-point\">💡 关键：VLMnav 不是让 VLM 做所有事情。几何模块负责“哪些动作可走”，VLM 负责“哪个可行动作最符合目标和语义布局”。</div>",
      "quiz": {
        "q": "VLMnav 为什么要先生成离散候选动作并投影到图像上，而不是让 VLM 直接输出连续坐标？",
        "options": [
          "因为 VLM 更擅长在视觉标注中做选择，连续几何坐标推理不稳定",
          "因为深度图无法用于判断障碍物",
          "因为导航任务不需要探索",
          "因为所有动作都必须由人工输入"
        ],
        "answer": 0,
        "explain": "VLMnav 用深度和位姿生成可行离散动作，再把动作标到图像中，让 VLM 以视觉问答方式选择，避免直接回归连续控制带来的空间推理误差。"
      }
    },
    {
      "id": "semexp",
      "num": 17,
      "name": "SemExp",
      "fullName": "语义探索 (Semantic Exploration)",
      "year": "2020",
      "org": "CMU",
      "parent": "neural-slam",
      "paperUrl": "https://proceedings.neurips.cc/paper/2020/hash/2c75cf2681788adaca63aa95ae028b22-Abstract.html",
      "projectUrl": "",
      "category": "object_navigation",
      "motivation": "语义探索目标位置预测",
      "summary": "SemExp 提出 Goal-Oriented Semantic Exploration，把目标导航拆成语义建图、学习式长程目标选择和确定性局部规划，解决端到端 ObjectNav 在未知环境中探索低效、缺乏语义先验和长程规划的问题。",
      "keyPoints": [
        "<strong>模块化 ObjectNav</strong>：由 Semantic Mapping、Goal-Oriented Semantic Policy、Local Policy 三个模块组成",
        "<strong>显式语义地图</strong>：维护 <span class=\"kb-math kb-math-inline\">K=C+2</span> 通道的 2D metric map，包含障碍、已探索区域和每个语义类别",
        "<strong>目标导向探索</strong>：高层策略根据语义地图和目标类别预测 long-term goal，而不是直接输出低层动作",
        "<strong>语义先验学习</strong>：通过 RL 学习物体共现与空间布局，例如电视更可能在客厅、床更可能在卧室",
        "<strong>确定性局部规划</strong>：用 analytical planner / Fast Marching Method 从当前位置走向 long-term goal",
        "<strong>Habitat ObjectNav 表现</strong>：在 Gibson/Habitat ObjectNav 中优于端到端和普通探索基线，并赢得 CVPR 2020 Habitat ObjectNav Challenge",
        "<strong>可迁移设计</strong>：模块边界与具体仿真域弱耦合，论文展示了向真实移动机器人迁移的能力"
      ],
      "detail": "<p><img alt=\"SemExp 模型总览\" src=\"https://raw.githubusercontent.com/devendrachaplot/Object-Goal-Navigation/master/docs/overview.jpg\" />\n<em>图：SemExp 官方 GitHub README 中的框架图。语义建图模块构建 episodic semantic map，高层语义策略选择 long-term goal，局部规划器执行低层动作。</em></p>\n<pre><code class=\"language-python\"># SemExp 核心流程伪代码\ndef semexp_objectnav(goal_category, rgbd_stream, pose_stream):\n    semantic_map = zeros(channels=C + 2)  # obstacles, explored, object categories\n    pose = initial_pose()\n\n    for obs, pose_reading in zip(rgbd_stream, pose_stream):\n        # 1. 语义建图：RGB-D + pose -&gt; 障碍、已探索、类别通道\n        semantic_seg = semantic_segmentation(obs.rgb)\n        point_cloud = backproject(obs.depth, pose_reading)\n        semantic_map = update_egocentric_to_global_map(\n            semantic_map, point_cloud, semantic_seg, pose_reading\n        )\n\n        # 2. 高层策略：根据地图和目标类别选择长程目标\n        long_term_goal = goal_oriented_semantic_policy(\n            semantic_map, goal_category, pose_reading\n        )\n\n        # 3. 局部规划：用确定性规划器走向长程目标\n        short_term_goal = fast_marching_planner(\n            obstacle_map=semantic_map[&quot;obstacle&quot;],\n            start=pose_reading.xy,\n            goal=long_term_goal,\n        )\n        action = local_policy(short_term_goal, pose_reading)\n        execute(action)\n\n        # 4. 发现目标并足够接近时停止\n        if target_visible_and_close(semantic_map, goal_category, pose_reading):\n            execute(&quot;stop&quot;)\n            break\n</code></pre>\n<h5>动机与背景</h5>\n<p>Object Goal Navigation 要求智能体在未知环境中找到某类物体，例如“chair”或“bed”。端到端 RL 直接从 RGB-D 输入到动作，容易学到局部反应式策略：看见目标就靠近，看不见就随机探索。问题在于大多数时间目标并不在视野里，智能体必须根据房间结构和物体共现先验做高效探索。</p>\n<p>SemExp 的核心主张是：ObjectNav 不应该完全隐式地记忆环境。显式语义地图能让策略知道哪里已经探索、哪里有障碍、哪里发现了哪些物体；学习式策略则负责从语义布局推断下一步该探索哪里。</p>\n<h5>语义地图表示</h5>\n<p>系统维护一个二维 metric semantic map：</p>\n<div class=\"kb-math kb-math-display\">m_t\\in\\mathbb{R}^{K\\times M\\times M},\\quad K=C+2</div>\n<p>其中前两个通道分别表示 obstacle 和 explored area，后 <span class=\"kb-math kb-math-inline\">C</span> 个通道分别表示语义类别。论文中每个 grid cell 对应物理世界中的小方格，RGB-D 观测通过相机位姿投影到全局地图中，语义分割结果写入对应类别通道。</p>\n<p>这种表示把历史观测压缩成结构化状态。高层策略不需要回看整段视频，而是读取当前地图、当前位置和目标类别，就能判断已探索区域边界、房间布局和可能目标位置。</p>\n<h5>Goal-Oriented Semantic Policy</h5>\n<p>高层策略的输出不是低层动作，而是 long-term goal <span class=\"kb-math kb-math-inline\">g_t</span>，即地图上的一个目标点。策略通过强化学习训练，奖励来自成功找到目标和路径效率。由于输入包含语义地图，它可以学到隐式常识：如果目标是“toilet”，优先探索像卫生间的区域；如果目标是“tv”，客厅相关线索更有价值。</p>\n<p>形式上，高层策略可写为：</p>\n<div class=\"kb-math kb-math-display\">g_t=\\pi_{\\theta}(m_t, x_t, c_{goal})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">x_t</span> 是当前位置，<span class=\"kb-math kb-math-inline\">c_{goal}</span> 是目标类别。策略学习的是“往哪里探索”，而不是“下一步左转还是右转”。</p>\n<h5>Local Policy 与规划</h5>\n<p>低层控制由确定性局部规划器完成。给定 obstacle map、当前位置和 long-term goal，系统使用 Fast Marching Method 或类似规划算法得到 short-term goal，再转换为 <code>move_forward</code>、<code>turn_left</code>、<code>turn_right</code>、<code>stop</code> 等离散动作。</p>\n<p>这种分层设计把困难拆开：学习模块处理语义先验和探索决策，经典规划模块处理避障和局部路径。相比端到端策略，它更样本高效，也更容易迁移到真实机器人，因为局部避障和地图坐标都有明确含义。</p>\n<h5>与 Neural SLAM 的关系</h5>\n<p>SemExp 继承了 Active Neural SLAM 的模块化思想：建图、全局策略、局部策略分离。但 Active Neural SLAM 主要面向空间探索，SemExp 把地图扩展为语义地图，并让全局策略以目标类别为条件选择探索点。它从“尽量探索未知区域”升级为“为了找到某类物体而探索最可能的位置”。</p>\n<div class=\"key-point\">💡 关键：SemExp 的优势来自显式语义记忆。它不要求策略在 RNN 隐状态里记住整栋房子，而是把空间、障碍和语义都写进地图，再学习如何利用这张图找目标。</div>",
      "quiz": {
        "q": "SemExp 中 Goal-Oriented Semantic Policy 输出的是什么？",
        "options": [
          "每一步的低层电机扭矩",
          "语义地图上的 long-term goal，由局部规划器再转换为导航动作",
          "完整的 RGB 图像重建",
          "每个物体的 3D Gaussian 参数"
        ],
        "answer": 1,
        "explain": "SemExp 的高层策略根据语义地图和目标类别预测长程目标点，低层局部规划器再负责避障并执行离散动作。"
      }
    },
    {
      "id": "poni",
      "num": 18,
      "name": "PONI",
      "fullName": "目标导航势函数 (Potential Functions for ObjectNav)",
      "year": "2022",
      "org": "UT Austin",
      "parent": "semexp",
      "paperUrl": "https://arxiv.org/abs/2202.poni",
      "projectUrl": "",
      "category": "object_navigation",
      "motivation": "势函数引导高效目标导航",
      "summary": "PONI 提出用监督学习得到的目标导航势函数来回答“应该去哪里找目标”，把 ObjectNav 中的语义搜索从昂贵的交互式强化学习改成基于被动语义地图的感知预测问题。",
      "keyPoints": [
        "<strong>三段式模块化导航</strong>：语义建图器构建 allocentric 语义地图，势函数网络选择长程目标，解析局部规划器执行移动。",
        "<strong>交互无关训练</strong>：势函数网络只用离线 top-down 语义地图训练，不需要在仿真器中用 RL 反复试错。",
        "<strong>双势函数设计</strong>：Area Potential 估计 frontier 背后可探索区域，Object Potential 估计 frontier 到目标实例成功区域的地理距离价值。",
        "<strong>frontier 上预测价值</strong>：只在已探索与未知区域边界上定义势函数，因为任意未知区域的可达路径都必须经过 frontier。",
        "<strong>UNet 编码-解码网络</strong>：共享语义地图编码器，分别输出 1 通道面积势函数和多类别目标势函数。",
        "<strong>训练成本优势</strong>：论文报告在 Gibson 与 Matterport3D 上达到或超过强 ObjectNav 基线，同时训练计算量相比 RL 搜索策略低得多。"
      ],
      "detail": "<h5>框架图</h5>\n<p><img alt=\"PONI 架构图\" src=\"https://ar5iv.labs.arxiv.org/html/2201.10029/assets/x2.jpg\" />\n<em>图：PONI 的三段式架构。语义建图器产生俯视语义地图，势函数网络预测 area/object potentials 并选取长程目标，局部策略用解析规划到达该目标。清单中的 <code>paper_url</code> 是占位符，实际公开论文为 arXiv:2201.10029。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># PONI: interaction-free ObjectNav\nsemantic_map = zeros_map()\nwhile not timeout:\n    rgb, depth, pose = observe()\n    semantic_map = update_allocentric_semantic_map(rgb, depth, pose)\n\n    # 势函数网络只负责“去哪里找”\n    area_pf, object_pf_all = potential_net(semantic_map)\n    object_pf = object_pf_all[goal_category]\n    frontier_mask = extract_frontiers(semantic_map)\n\n    score = lambda_area * area_pf + (1 - lambda_area) * object_pf\n    score = score * frontier_mask\n    long_term_goal = argmax(score)\n\n    # 局部移动不再学习，直接用地图上的最短路\n    path = fast_marching_method(semantic_map.obstacle_channel, long_term_goal)\n    action = deterministic_local_controller(path)\n    execute(action)\n\n    if goal_visible_and_near(goal_category):\n        execute(&quot;stop&quot;)\n        break\n</code></pre>\n<h5>方法拆解</h5>\n<p>ObjectNav 的困难不只是走到一个坐标，而是目标位置在开始时未知。SemExp 等模块化方法已经证明“显式语义地图 + 长程目标 + 局部规划”很有效，但长程目标采样策略仍靠 RL 交互学习。PONI 的关键判断是：找目标的高层搜索本质上是“从当前部分语义地图推断哪里更可能通向目标”的感知问题，因此可以用完整语义标注地图构造监督信号，而不是让智能体在环境里反复撞墙和探索。</p>\n<p>PONI 在 partial semantic map 的 frontier 上定义势函数。Area Potential 衡量一个 frontier 背后能带来多少新 free space，它提供早期探索驱动力；Object Potential 衡量从 frontier 到目标类别成功区域的 geodesic proximity，它提供语义搜索驱动力。可以把二者理解为探索与利用的组合：</p>\n<div class=\"kb-math kb-math-display\">P(x, c)=\\lambda P_{\\text{area}}(x)+(1-\\lambda)P_{\\text{obj}}(x,c)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">x</span> 是 frontier 位置，<span class=\"kb-math kb-math-inline\">c</span> 是目标类别。Object Potential 常按到最近目标成功区域的地理距离衰减：</p>\n<div class=\"kb-math kb-math-display\">P_{\\text{obj}}(x,c)=\\exp\\left(-\\frac{d_g(x,\\mathcal{G}_c)}{\\tau}\\right)</div>\n<p>直觉上，frontier 背后空间越大、离目标成功区越近，越值得去看。只在 frontier 上评分也降低了学习难度，因为已探索区域通常无需再次作为探索目标，未知区域又不能直接规划到达。</p>\n<p>训练数据来自 Gibson 和 Matterport3D 等数据集的 3D 语义标注投影。作者先得到完整俯视语义地图，再随机采样两点间最短路径，把路径附近的 patch 视为“已探索”，其余区域视为未知，由此构造 partial map。完整地图用于离线计算 area/object potential 的监督标签，模型输入 partial map，输出势函数图，损失是 frontier 像素上的均方误差。</p>\n<p>推理时，语义建图器使用 RGB-D、位姿和分割模型更新 top-down semantic map。势函数网络输出长程目标后，局部策略用 Fast Marching Method 在障碍地图上求最短路，再执行离散动作。这个设计刻意把“在哪里找”与“如何走过去”分离，使学习模块聚焦于语义搜索，几何避障交给确定性规划。</p>\n<p>与端到端 RL 相比，PONI 的优势是样本效率与可解释性：长程目标可视化为势函数热力图，失败时能判断是建图、分割、势函数还是局部规划出了问题。与普通 frontier-based exploration 相比，它不会盲目探索最近边界，而会利用“床旁有床头柜、马桶在卫生间、电视在客厅”等对象-房间与对象-对象先验。</p>\n<div class=\"key-point\">💡 关键：PONI 并不是学习完整导航策略，而是学习一个可插入模块化导航栈的“frontier 价值函数”。这让它继承 SemExp 式语义建图的泛化能力，同时避免 RL 长程探索训练的高成本。</div>",
      "quiz": {
        "q": "PONI 为什么只在 frontier 上定义势函数？",
        "options": [
          "因为 frontier 总是目标物体的真实位置",
          "因为任意未知区域的可达路径都必须经过 frontier，足以决定下一步探索方向",
          "因为局部规划器不能处理已探索区域",
          "因为语义分割模型只在 frontier 上输出类别"
        ],
        "answer": 1,
        "explain": "frontier 是已探索 free space 与未知区域的边界。目标未知时，去任意新区域都要先经过某个 frontier，因此在 frontier 上评分即可选择长程探索目标。"
      }
    },
    {
      "id": "cow",
      "num": 19,
      "name": "CoW",
      "fullName": "轮上CLIP (CLIP on Wheels)",
      "year": "2023",
      "org": "U.Washington",
      "parent": "poni",
      "paperUrl": "http://openaccess.thecvf.com/content/CVPR2023/html/Gadre_CoWs_on_Pasture_Baselines_and_Benchmarks_for_Language-Driven_Zero-Shot_Object_CVPR_2023_paper.html",
      "projectUrl": "",
      "category": "object_navigation",
      "motivation": "CLIP零样本开放词汇导航",
      "summary": "CoW 把开放词汇视觉模型接到移动机器人探索与建图栈上，提出 language-driven zero-shot object navigation 的一组强基线和 Pasture benchmark，用于评估机器人能否无导航训练地寻找自然语言描述的目标。",
      "keyPoints": [
        "<strong>L-ZSON 任务定义</strong>：目标不再只是固定类别标签，而是可包含属性、空间关系和罕见物体的自然语言描述。",
        "<strong>CoW 基线框架</strong>：探索策略负责获得多视角观测，开放词汇定位器判断目标是否在视野中，深度地图把目标置信度回投到可导航地图。",
        "<strong>多种定位器比较</strong>：评估 CLIP 全图/patch/gradient relevance、MDETR segmentation、OWL-ViT detection 等开放词汇目标定位方式。",
        "<strong>探索策略解耦</strong>：既测试不需训练的 frontier-based exploration，也测试 CLIP backbone + GRU 的学习式探索。",
        "<strong>Pasture benchmark</strong>：覆盖 uncommon objects、appearance descriptions、spatial descriptions、distractors、hidden objects 等更接近真实人类查询的场景。",
        "<strong>关键结论</strong>：简单 CoW 无需目标域导航训练，在部分设定中接近或超过需要大量训练的 ZSON 方法，但对复杂语言关系利用仍有限。"
      ],
      "detail": "<h5>框架图</h5>\n<p><img alt=\"CoW 框架图\" src=\"https://ar5iv.labs.arxiv.org/html/2203.10421/assets/x2.png\" />\n<em>图：CLIP on Wheels 概览。机器人一边探索，一边用开放词汇定位器判断语言目标是否在当前观测中；置信区域被回投到 top-down map 后作为导航目标。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># CoW: language-driven zero-shot object navigation\ntopdown_map = OccupancyMap(resolution=0.125)\ntarget_score_map = zeros_like(topdown_map)\n\nwhile not timeout:\n    rgb, depth, pose = observe()\n    topdown_map.integrate_depth(depth, pose)\n\n    # 开放词汇定位：CLIP / MDETR / OWL-ViT 等都可替换\n    relevance = object_localizer(rgb, text_goal)\n    mask = threshold(relevance)\n    points_3d = back_project(mask, depth, pose)\n    target_score_map.update_with_max(points_3d, relevance)\n\n    if max(target_score_map) &gt; confidence_threshold:\n        goal = argmax(target_score_map)\n    else:\n        goal = exploration_policy.select_frontier(topdown_map)\n\n    path = shortest_path(topdown_map, goal)\n    action = local_controller(path)\n    execute(action)\n\n    if close_to_projected_target(goal) and target_visible(rgb, text_goal):\n        execute(&quot;stop&quot;)\n        break\n</code></pre>\n<h5>方法拆解</h5>\n<p>CoW 的出发点是现实机器人用户不会只说“chair”或“plant”，而会说“brown mug on the table”“toy airplane”“plant near the dresser”。传统 ObjectNav 与多数 ZSON 设置把目标限制成固定类别，导致方法可以依赖训练集中见过的类嵌入或环境分布。CoW 将问题推进到 L-ZSON：目标由自由文本描述给出，机器人在测试时不应接受目标域导航训练。</p>\n<p>系统结构刻意简单：移动端只需要 RGB-D、位姿近似和一个可替换的开放词汇目标定位器。每一步，深度图被投影到地面平面形成占据地图；语言定位器在图像上输出目标相关区域；相关区域再借助深度回投到地图坐标，形成 target score map。若目标置信度足够高，机器人规划到最高分位置；否则继续执行探索策略。</p>\n<p>开放词汇定位是 CoW 的核心变量。CLIP 可以用“图像 patch 与文本嵌入相似度”给出局部相关性，也可以用 referring expression 模板让文本描述图像区域，例如“目标在图像左上角”。ViT 解释方法可用梯度 relevance 产生更像热力图的目标区域，MDETR 与 OWL-ViT 则直接提供文本条件检测或分割。统一到导航栈后，这些方法都变成二维 relevance mask：</p>\n<div class=\"kb-math kb-math-display\">s_i=\\cos\\left(f_{\\text{vision}}(r_i), f_{\\text{text}}(q)\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">r_i</span> 是图像区域或 patch，<span class=\"kb-math kb-math-inline\">q</span> 是语言目标。得分超过阈值的区域被认为可能包含目标，再通过深度回投进入地图。</p>\n<p>CoW 的探索模块也保持可替换。Frontier-based exploration 完全不需要训练，只朝已知 free space 与未知区域的边界移动；学习式探索用冻结 CLIP backbone、GRU 和 actor-critic 训练，尝试获得更好的视角覆盖。论文的重要发现是：在零样本设定下，强开放词汇定位器加简单探索已经很有竞争力，说明目标导航系统的瓶颈不总是端到端策略学习。</p>\n<p>Pasture benchmark 是论文的另一项贡献。它不是只测常见类别，而是加入罕见物体、带颜色/材质/大小属性的物体、带空间关系描述的目标、视觉 distractor 和隐藏目标。结果显示 CoW 对罕见物体和简单属性有一定能力，但对语言中的空间关系与隐藏关系利用不足，因为 CLIP 风格的相似度并不等价于可组合的关系推理。</p>\n<div class=\"warn-box\">⚠️ 注意：CoW 是一组基线与评测协议，不是单个固定网络。它的价值在于把开放词汇感知、探索策略和地图回投接口标准化，从而暴露“视觉语言定位能否真正驱动导航”的问题。</div>",
      "quiz": {
        "q": "CoW 中开放词汇定位器输出的图像相关性为什么需要回投到 top-down map？",
        "options": [
          "为了把语言描述翻译成固定类别编号",
          "为了把当前视角下的目标证据转成可规划的空间目标位置",
          "为了训练 CLIP 的图像编码器",
          "为了避免使用深度传感器"
        ],
        "answer": 1,
        "explain": "图像 relevance 只说明目标在当前画面哪里，机器人还需要地图坐标才能规划移动。CoW 用深度和位姿将高相关区域回投到 top-down map。"
      }
    },
    {
      "id": "loat",
      "num": 20,
      "name": "LOAT",
      "fullName": "LLM开放词汇目标导航 (LLM Open-vocabulary Object Navigation)",
      "year": "2025",
      "org": "arXiv",
      "parent": "cow",
      "paperUrl": "https://arxiv.org/abs/2501.loat",
      "projectUrl": "",
      "category": "object_navigation",
      "motivation": "LLM常识推理目标搜索先验",
      "summary": "LOAT 将 LLM 提供的通用物体常识与训练环境中学到的经验性物体亲和力动态融合，用亲和力权重激活语义地图或拓扑图，从而提升 ObjectNav 在新环境和未见目标上的搜索效率。",
      "keyPoints": [
        "<strong>双亲和力来源</strong>：Generalized Affinities Module 使用 LLM 判断目标与场景物体的语义相关性，Experiential Affinities Module 从训练经验中学习对象关系。",
        "<strong>动态融合模块</strong>：根据时间上下文、RNN 隐状态或历史轨迹调整两类亲和力的权重，而不是固定相信 LLM 或训练经验。",
        "<strong>文本嵌入解耦目标表示</strong>：用预训练文本嵌入表示目标与场景类别，避免只依赖固定 one-hot 类别节点。",
        "<strong>语义地图激活</strong>：在 metric map 中按语义通道加权，在 topological graph 中按节点内物体亲和力加权。",
        "<strong>低查询成本</strong>：LLM 常识可以在 episode 开始或离线预存，不需要每个导航步都调用大模型。",
        "<strong>跨策略集成</strong>：论文将 LOAT 接入 Habitat ObjectNav、ALFRED/FILM/Prompter 与 AI2-THOR 图导航策略，显示一致增益。"
      ],
      "detail": "<h5>框架图</h5>\n<p><img alt=\"LOAT 详细框架图\" src=\"https://arxiv.org/html/2403.09971v2/x2.png\" />\n<em>图：LOAT 由经验亲和力、LLM 通用亲和力与动态融合模块组成，输出的 affinity score 用于激活下游语义地图或图节点。清单中的 <code>paper_url</code> 为占位符，实际公开论文为 arXiv:2403.09971。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># LOAT: object affinities transfer for ObjectNav\nobject_names = semantic_map.visible_or_known_categories()\ntarget = goal_category\n\n# 1. 经验亲和力：从训练经验学习 query-key attention\ntarget_emb = text_encoder(target)\nobj_embs = [text_encoder(o) for o in object_names]\nq = W_q @ target_emb\nkeys = [W_k @ e for e in obj_embs]\nexp_aff = softmax([dot(q, k) / sqrt(d) for k in keys])\n\n# 2. 通用亲和力：LLM 离线/episode 初始判断哪些对象与目标相关\nbinary_rel = [LLM_related(target, o) for o in object_names]\ngen_aff = normalize(binary_rel)\n\n# 3. 动态融合：根据当前上下文调节两种来源\nalpha = fusion_net(history_state, explored_map, optional_env_context)\naff = alpha * gen_aff + (1 - alpha) * exp_aff\n\n# 4. 接入下游策略\nif policy_uses_metric_map:\n    activated_map = semantic_map * channel_weights(aff)\n    action = metric_policy(activated_map, target_emb)\nelse:\n    graph = activate_nodes(scene_graph, aff)\n    action = graph_policy(graph)\nexecute(action)\n</code></pre>\n<h5>方法拆解</h5>\n<p>ObjectNav 中“杯子可能在桌上或橱柜里”“毛巾可能在浴室架子上”这类对象关系非常关键。早期语义图或关系网络能从训练环境里学到这些亲和力，但会受数据分布约束：如果训练集中垃圾桶经常靠近布料，模型就可能在新房间找 cloth 时错误关注 garbage can。直接让 LLM 每一步规划又成本高，且 LLM 对具体房屋布局没有训练经验。LOAT 的设计目标就是把两者结合：训练经验提供场景特定偏好，LLM 提供更泛化的常识约束。</p>\n<p>Experiential Affinities Module 把目标类别作为 query，把地图中的对象类别作为 key，用缩放点积注意力建模训练经验中的对象关系：</p>\n<div class=\"kb-math kb-math-display\">a_i^{E}=\\operatorname{softmax}_i\\left(\\frac{(W_q e_t)^\\top(W_k e_i)}{\\sqrt{d}}\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">e_t</span> 是目标文本嵌入，<span class=\"kb-math kb-math-inline\">e_i</span> 是第 <span class=\"kb-math kb-math-inline\">i</span> 个场景对象文本嵌入。这个模块可学习，能捕获训练集中的常见同现、邻近和导航可达性模式。</p>\n<p>Generalized Affinities Module 则不要求 LLM 输出精确数值分数，而是让 LLM 给出二值相关判断，再归一化成注意力权重：</p>\n<div class=\"kb-math kb-math-display\">a_i^{G}=\\frac{\\mathbb{1}[\\text{LLM says } o_i \\text{ is related to } t]}{\\sum_j \\mathbb{1}[\\text{related}(o_j,t)]}</div>\n<p>二值化的好处是稳定。论文指出 LLM 对“给每个物体打 0-10 分”这类提示可能受措辞影响较大，但判断哪些对象语义相关相对可靠。</p>\n<p>Dynamic Fusion Module 负责在 <span class=\"kb-math kb-math-inline\">a^E</span> 与 <span class=\"kb-math kb-math-inline\">a^G</span> 之间调权：</p>\n<div class=\"kb-math kb-math-display\">a_i = \\alpha_t a_i^G + (1-\\alpha_t)a_i^E</div>\n<p><span class=\"kb-math kb-math-inline\">\\alpha_t</span> 由当前时间上下文、RNN hidden state、历史轨迹、探索区域等信息决定。直觉上，环境越陌生、目标越少见、训练经验越不可靠，就应提高 LLM 常识权重；在熟悉分布中，经验亲和力可以提供更细粒度的导航偏好。</p>\n<p>融合后的亲和力不直接输出动作，而是作为下游策略的输入增强。在 metric semantic map 中，LOAT 对每个语义通道做 channel-wise activation；在 topological graph 中，则对节点内对象的亲和力求平均后激活节点表示。这样 LOAT 可以接入已有 map-based 或 graph-based 导航策略，而不是重写整个导航系统。</p>\n<p>与 CoW 相比，LOAT 更强调“在哪里更可能找到目标”的常识先验，而不只是“当前图像里是否看见目标”。与 SayCan/LLM-Planner 相比，它不让 LLM 逐步生成动作计划，而是把 LLM 压缩成可缓存的对象关系权重，因此更适合高频闭环导航。</p>\n<div class=\"key-point\">💡 关键：LOAT 的本质是语义注意力迁移层。它把 LLM 常识与训练经验变成 map/graph 上的可微或可插拔权重，使原有 ObjectNav 策略更关注与目标相关的场景证据。</div>",
      "quiz": {
        "q": "LOAT 为什么不直接让 LLM 每一步输出导航动作？",
        "options": [
          "因为 LLM 无法处理任何自然语言目标",
          "因为逐步调用成本高且缺少场景经验，LOAT 更适合把 LLM 常识缓存成对象亲和力",
          "因为 ObjectNav 不需要语义推理",
          "因为下游策略不能读取语义地图"
        ],
        "answer": 1,
        "explain": "LOAT 的目标是低成本增强已有导航策略。它将 LLM 常识转为对象亲和力，并与经验亲和力融合，而不是在每个控制步调用 LLM。"
      }
    },
    {
      "id": "goalvlm",
      "num": 21,
      "name": "GoalVLM",
      "fullName": "VLM驱动目标导航 (VLM-driven Object Goal Navigation)",
      "year": "2026.03",
      "org": "arXiv",
      "parent": "cow",
      "paperUrl": "https://arxiv.org/abs/2603.18210",
      "projectUrl": "",
      "category": "object_navigation",
      "motivation": "VLM多智能体开放词汇导航",
      "summary": "GoalVLM 提出一个无需任务特定训练的多智能体开放词汇 ObjectNav 框架，把 SAM3 文本检测分割、深度投影 BEV 建图、VLM 空间推理和多智能体 frontier 分配结合起来寻找自由语言目标。",
      "keyPoints": [
        "<strong>多智能体开放词汇导航</strong>：多个 agent 共享融合 BEV 语义地图与 frontier 评分，减少重复探索。",
        "<strong>SAM3 零样本目标检测</strong>：用文本提示检测和分割目标，并通过多视角确认降低误检。",
        "<strong>Goal Projector</strong>：把图像检测 mask 通过校准深度反投影到 BEV 地图，获得可规划的目标位置。",
        "<strong>VLM 结构化推理链</strong>：用 scene captioning、room-type classification、perception gating、multi-frontier ranking 为 frontier 注入常识先验。",
        "<strong>BEV semantic mapping</strong>：每个 agent 从 RGB-D 观测生成体素 splatting，再切片为障碍、探索与语义热力图。",
        "<strong>GOAT-Bench 评估</strong>：在 val_unseen 的多子任务开放词汇目标链上，双智能体版本报告 55.8% subtask SR 和 18.3% SPL。"
      ],
      "detail": "<h5>框架图</h5>\n<p><img alt=\"GoalVLM 多智能体框架\" src=\"https://arxiv.org/html/2603.18210v1/x2.png\" />\n<em>图：GoalVLM 中每个智能体执行感知、VLM 推理、局部规划，并通过共享全局地图和分布式信念协议协调 frontier 分配。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># GoalVLM: decentralized multi-agent open-vocabulary ObjectNav\nshared_map = GlobalBEVMap()\nwhile episode_not_done:\n    for agent in agents:\n        rgb, depth, pose = agent.observe()\n        local_map = voxel_splat_to_bev(rgb, depth, pose)\n        shared_map.fuse(local_map)\n\n        detections = SAM3.detect_and_segment(rgb, text_goal)\n        if confirmed_by_multiview(detections):\n            goal_xy = GoalProjector.backproject(detections.mask, depth, pose)\n            selected_goal = shared_map.project_goal(goal_xy)\n        else:\n            frontiers = shared_map.extract_frontiers(agent.pose)\n            prompt_state = {\n                &quot;scene_caption&quot;: VLM.caption(rgb),\n                &quot;room_type&quot;: VLM.classify_room(rgb),\n                &quot;goal&quot;: text_goal,\n                &quot;frontiers&quot;: summarize(frontiers),\n            }\n            selected_goal = VLM.rank_frontiers(prompt_state)\n\n        local_path = FMM(shared_map.obstacles, agent.pose, selected_goal)\n        action = discretize_path_gradient(local_path)\n        agent.execute(action)\n\n        if agent.goal_reached(selected_goal) and detections:\n            agent.execute(&quot;stop&quot;)\n    shared_map.resolve_frontier_assignments(agents)\n</code></pre>\n<h5>方法拆解</h5>\n<p>GoalVLM 针对的是 GOAT-Bench 风格的开放词汇目标链：一个 episode 内要连续找到 5-7 个自由语言目标，且类别数远超传统 ObjectNav 固定集合。单机器人方法在大场景中探索慢，闭集多机器人方法又依赖预定义类别图。GoalVLM 用多智能体覆盖面积，用 VLM 常识给 frontier 排序，用 SAM3 解决开放词汇视觉定位。</p>\n<p>感知层先从 RGB-D 构造 BEV 语义地图。深度像素按相机内参反投影到 3D 点云，再经过相机高度和姿态变换进入全局坐标，最后用 voxel splatting 累积到俯视网格。障碍图来自可通行高度区间的体素切片；探索图记录哪些区域已观测；语义热图记录目标或场景类别证据。</p>\n<p>目标一旦被 SAM3 检测到，Goal Projector 会把分割 mask 中的深度点反投影到 BEV，取目标 centroid 或置信区域作为可规划坐标。这一步很重要：纯图像检测只能说“画面里有目标”，但导航必须知道地图上的目标位置。论文还特别讨论了非均匀 resize 下相机内参修正，否则 portrait 传感器会造成投影畸变，污染障碍图。</p>\n<p>如果尚未检测到目标，系统进入 VLM frontier reasoning。提示链先让 VLM 生成场景描述，再判断房间类型和目标相关性，随后对多个 candidate frontier 排名。例如目标是 microwave 时，厨房方向的 frontier 应比卧室方向更优。这个过程不是让 VLM 输出低层动作，而是只选择高层探索目标。</p>\n<p>多智能体协作通过共享地图和 frontier 分配实现。各 agent 上传局部 BEV 信息到全局地图，依据共享语义热力图、Bayesian value map 或 frontier score 分配不同探索区域。这样两个 agent 不会都走向同一 frontier，探索覆盖率提高。论文消融显示从双智能体降为单智能体会明显降低成功率，说明协作不是装饰模块。</p>\n<p>与 CoW 相比，GoalVLM 从单体开放词汇定位推进到多智能体、连续子任务和 VLM 空间推理；与 LOAT 相比，它不是离线对象亲和力激活，而是在线把视觉观察、房间判断和 frontier 候选交给 VLM 排序。代价是路径效率仍受 frontier 探索和局部规划影响，SPL 明显低于端到端强记忆策略。</p>\n<div class=\"warn-box\">⚠️ 注意：GoalVLM 的公开论文为 2026 年 arXiv 预印本，方法中提到 SAM3 与 SpaceOM 等组件；若这些外部模型版本更新，复现实验时需要固定模型接口与阈值。</div>",
      "quiz": {
        "q": "GoalVLM 中 Goal Projector 的主要作用是什么？",
        "options": [
          "把 BEV 地图翻译成自然语言",
          "把文本目标变成 one-hot 类别",
          "把图像中的目标检测 mask 结合深度反投影为 BEV 地图上的目标坐标",
          "训练多智能体通信协议"
        ],
        "answer": 2,
        "explain": "SAM3 的输出位于图像平面，机器人规划需要地图坐标。Goal Projector 使用深度和相机标定把检测结果投影到 BEV 地图。"
      }
    },
    {
      "id": "ovsegdt",
      "num": 22,
      "name": "OVSegDT",
      "fullName": "开放词汇分割Transformer (Open-Vocabulary Segmentation Transformer)",
      "year": "2026",
      "org": "CVPR 2026",
      "parent": "goalvlm",
      "paperUrl": "https://arxiv.org/abs/2604.ovsegdt",
      "projectUrl": "",
      "category": "object_navigation",
      "motivation": "分割Transformer精确目标识别",
      "summary": "OVSegDT 在 mapless transformer 导航策略中显式加入开放词汇目标二值 mask 编码器和辅助分割损失，并用熵自适应损失调制平衡模仿学习与强化学习，解决端到端开放词汇 ObjectNav 泛化差和训练切换脆弱的问题。",
      "keyPoints": [
        "<strong>目标 mask 作为策略输入</strong>：把开放词汇分割模型预测的目标二值 mask 编码后输入 transformer，提供精确空间线索。",
        "<strong>辅助语义分割目标</strong>：训练时额外预测语义分割，使 RGB 表征与目标 mask 表征更好解耦。",
        "<strong>Entropy-Adaptive Loss Modulation (EALM)</strong>：根据策略熵连续调节 DAgger imitation loss 与 PPO RL loss 的权重，避免人工阶段切换。",
        "<strong>轻量 mapless 策略</strong>：约 130M 参数，RGB-only，不依赖深度、里程计或大型 VLM 在线推理。",
        "<strong>开放词汇评测</strong>：在 HM3D-OVON 上面向 seen/unseen categories 评估，强调未见类别泛化。",
        "<strong>依据限制</strong>：清单 URL <code>2604.ovsegdt</code> 为占位符；可访问公开论文为 arXiv:2508.11479，标题为 “OVSegDT: Segmenting Transformer for Open-Vocabulary Object Goal Navigation”。"
      ],
      "detail": "<h5>框架图</h5>\n<p><img alt=\"OVSegDT 方法示意\" src=\"https://arxiv.org/html/2508.11479v1/x1.png\" />\n<em>图：OVSegDT 显式将目标二值 mask 与辅助语义分割监督接入 transformer 导航模型，提升开放词汇目标导航训练质量。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># OVSegDT: segmentation-aware transformer policy\nfor rollout in training_data:\n    rgb = rollout.rgb\n    goal_text = rollout.goal_text\n\n    # 冻结开放词汇编码器/分割器产生目标线索\n    rgb_emb = frozen_siglip_image_encoder(rgb)\n    text_emb = frozen_siglip_text_encoder(goal_text)\n    target_mask = open_vocab_segmenter(rgb, goal_text)  # binary mask\n    mask_emb = mask_encoder(target_mask)\n\n    tokens = fuse_tokens(rgb_emb, text_emb, mask_emb, action_history=rollout.prev_actions)\n    policy, value, seg_pred = transformer(tokens)\n\n    imitation_loss = dagger_ce(policy, rollout.expert_actions)\n    rl_loss = ppo_loss(policy, value, rollout.returns)\n    aux_loss = segmentation_loss(seg_pred, rollout.semantic_target)\n\n    entropy = policy_entropy(policy)\n    beta = entropy_adaptive_weight(entropy)\n    loss = beta * imitation_loss + (1 - beta) * rl_loss + lambda_seg * aux_loss\n    optimizer.step(loss)\n</code></pre>\n<h5>方法拆解</h5>\n<p>开放词汇 ObjectNav 的 mapless 策略常遇到两个问题。第一，目标由文本给出，单靠图像-文本全局 embedding 很难告诉策略目标在画面哪一块；第二，DAgger 与 PPO 混合训练通常需要手工设定阶段切换，切早了策略未学会基本行为，切晚了又难以从探索奖励中受益。OVSegDT 分别用目标 mask 编码器和 EALM 解决这两个问题。</p>\n<p>模型沿用 HM3D-OVON 相关工作中的 frozen SigLIP 图像与文本编码器作为基础表征。新增的 semantic branch 接收目标二值 mask：mask 可以来自训练时 ground truth 或推理时开放词汇分割器。Mask encoder 把像素级目标区域压缩成 token，与 RGB token、文本 token、历史动作等一起送入 transformer policy。这样策略无需从全局 embedding 中猜测“目标在哪里”，而能直接知道目标轮廓和屏幕位置。</p>\n<p>辅助分割损失的作用是让视觉表示保持空间语义敏感。若只优化导航动作，网络可能学到数据集偏置，例如某类目标通常出现在某个房间，而忽略当前画面中弱小但关键的目标像素。辅助分割目标迫使模型保留物体边界、可见区域和场景结构信息。总损失可写成：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}=\\beta(H)\\mathcal{L}_{\\text{DAgger}}+(1-\\beta(H))\\mathcal{L}_{\\text{PPO}}+\\lambda_{\\text{seg}}\\mathcal{L}_{\\text{seg}}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">H</span> 是策略熵，<span class=\"kb-math kb-math-inline\">\\beta(H)</span> 由 EALM 动态产生。策略高熵说明还不确定，更多依赖专家动作监督；策略低熵说明已有稳定行为，可增加 RL 项优化长程成功和路径效率。</p>\n<p>EALM 的关键不是提出新 RL 目标，而是去掉脆弱的训练日程手工切换。传统 DAgger-to-PPO 需要人为决定“第几步开始 RL”，但不同类别、场景和 mask 噪声下最佳切换点不同。用熵作为样本级信号后，模型可以对难样本继续模仿，对自信样本更多强化学习。</p>\n<p>与 CoW/GoalVLM 这类显式地图方法不同，OVSegDT 不构建环境地图，也不依赖深度和位姿。这让它部署成本低、推理快，但也意味着长程记忆主要压在 transformer 状态和历史 token 中。它适合强调 RGB-only 与轻量推理的场景，不适合需要精确全局几何可解释规划的设置。</p>\n<div class=\"key-point\">💡 关键：OVSegDT 的“Seg”不是后处理目标检测，而是把目标 mask 变成策略输入和训练监督，让开放词汇感知直接影响动作决策。</div>",
      "quiz": {
        "q": "OVSegDT 中 EALM 的主要目的是什么？",
        "options": [
          "用固定比例同时优化 DAgger 和 PPO",
          "根据策略熵动态平衡模仿学习和强化学习，避免手工阶段切换",
          "把 RGB 图像转换成深度图",
          "替代开放词汇分割模型"
        ],
        "answer": 1,
        "explain": "EALM 使用策略熵反映当前样本上的不确定性，高熵时偏向专家监督，低熵时增加 PPO 优化，从而连续调节训练信号。"
      }
    },
    {
      "id": "saycan",
      "num": 23,
      "name": "SayCan",
      "fullName": "语义接地机器人 (Do As I Can, Not As I Say)",
      "year": "2022",
      "org": "Google",
      "parent": "—",
      "paperUrl": "https://say-can.github.io/",
      "projectUrl": "",
      "category": "task_planning",
      "motivation": "LLM语义概率接地机器人技能",
      "summary": "SayCan 提出把 LLM 对“下一步是否有助于任务”的语义概率与机器人技能 value function 对“当前状态是否能执行”的 affordance 概率相乘，从而让语言模型生成既合理又可执行的长程机器人计划。",
      "keyPoints": [
        "<strong>Say + Can 双重接地</strong>：LLM 负责高层任务语义，机器人技能 value function 负责物理可执行性。",
        "<strong>候选技能约束解码</strong>：LLM 不自由生成任意句子，而是在预定义低层技能描述集合上打分。",
        "<strong>概率乘积选择动作</strong>：每一步选择 <span class=\"kb-math kb-math-inline\">p_{\\text{LM}}(\\text{skill}|\\text{instruction}) \\cdot p_{\\text{VF}}(\\text{success}|\\text{state},\\text{skill})</span> 最高的技能。",
        "<strong>迭代式计划生成</strong>：执行一个技能后，把结果追加到上下文，再重新评分下一步，直到选择 done。",
        "<strong>语言条件技能库</strong>：低层技能通过 BC-Z 行为克隆或 MT-Opt 强化学习训练，value function 作为 affordance 估计器。",
        "<strong>真实厨房机器人评估</strong>：在 101 个真实移动操作任务上验证长程抽象指令执行能力，并展示 affordance grounding 的必要性。"
      ],
      "detail": "<h5>框架图</h5>\n<p><img alt=\"SayCan 框架图\" src=\"https://ar5iv.labs.arxiv.org/html/2204.01691/assets/figures/vfs_llm_all.png\" />\n<em>图：SayCan 同时读取 LLM 对候选技能的任务相关性和 value function 对候选技能的可执行性，乘积得分最高的技能被执行。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># SayCan: choose useful AND feasible skills\ncontext = user_instruction\nstate = robot.observe()\n\nwhile True:\n    best_skill = None\n    best_score = -inf\n    for skill in skill_library:\n        say = LLM.score_next_step(context, skill.language_description)\n        can = value_function(skill, state)  # affordance / success probability\n        score = say * can\n        if score &gt; best_score:\n            best_skill, best_score = skill, score\n\n    if best_skill.name == &quot;done&quot;:\n        break\n\n    result = best_skill.policy.execute(state)\n    context += f&quot;\\nRobot did: {best_skill.language_description}&quot;\n    state = robot.observe()\n</code></pre>\n<h5>方法拆解</h5>\n<p>纯 LLM 知道很多日常任务步骤，但不知道当前机器人有什么技能、场景里有什么物体、某个动作此刻是否可行。例如“清理洒出的饮料”时，语言模型可能建议使用吸尘器；对人类文本世界合理，对没有吸尘器技能的移动操作机器人却不可执行。SayCan 的核心是将语言模型约束到机器人技能集合，并用 value function 过滤掉当前状态下不可行的技能。</p>\n<p>论文把每个低层技能 <span class=\"kb-math kb-math-inline\">c_i</span> 表示为自然语言描述、控制策略和 value function。LLM 输出该技能作为下一步对任务是否有帮助的概率 <span class=\"kb-math kb-math-inline\">p_{\\text{LM}}(c_i|I)</span>，value function 输出该技能在当前状态 <span class=\"kb-math kb-math-inline\">s</span> 下成功的概率 <span class=\"kb-math kb-math-inline\">p_{\\text{VF}}(c_i|s)</span>。SayCan 使用乘积作为最终得分：</p>\n<div class=\"kb-math kb-math-display\">\\operatorname{score}(c_i)=p_{\\text{LM}}(c_i|I)\\cdot p_{\\text{VF}}(c_i|s)</div>\n<p>这个公式的直觉很直接：只“会说”不够，动作必须对任务有用；只“能做”也不够，动作必须推进当前指令。乘积会惩罚任一侧很低的技能。</p>\n<p>SayCan 的规划不是一次性输出完整计划，而是闭环迭代。每执行一个技能，机器人重新观察环境，value function 重新评估可行性，LLM 上下文中也加入已执行步骤。这样它能处理状态依赖的任务顺序，例如先找到物体再拿起，先拿起再放置，完成后选择 done。</p>\n<p>低层技能由已有机器人学习方法训练。行为策略可来自 BC-Z，多任务 value function 可来自 MT-Opt。技能描述用语言嵌入条件化，因此同一个策略网络可以覆盖多种 pick/place/open/close/navigate 技能族。LLM 负责组合这些技能，而不直接输出连续控制。</p>\n<p>与 Code as Policies 相比，SayCan 更保守：它不让 LLM 生成任意程序，而是在封闭技能库上做概率选择，因此安全性和可执行性更容易控制。与传统符号规划相比，它无需完整手写 PDDL domain，而是把 LLM 的常识作为高层任务模型，把 value function 作为环境与机器人能力模型。</p>\n<div class=\"key-point\">💡 关键：SayCan 的创新不是“让 LLM 控机器人”，而是给 LLM 的每个候选动作加上当前机器人可执行性的概率门控。</div>",
      "quiz": {
        "q": "SayCan 选择下一步技能时为什么要把 LLM 分数和 value function 分数相乘？",
        "options": [
          "为了让计划更长",
          "为了同时要求技能对任务有用且在当前状态可执行",
          "为了训练语言模型参数",
          "为了把自然语言翻译成 PDDL"
        ],
        "answer": 1,
        "explain": "LLM 分数表示语义有用性，value function 表示物理可行性。乘积会过滤掉只合理但不可执行、或可执行但无关的技能。"
      }
    },
    {
      "id": "code-as-policies",
      "num": 24,
      "name": "Code as Policies",
      "fullName": "代码即策略 (Code as Policies)",
      "year": "2023",
      "org": "Google",
      "parent": "saycan",
      "paperUrl": "https://code-as-policies.github.io/",
      "projectUrl": "",
      "category": "task_planning",
      "motivation": "LLM代码生成表达行为逻辑",
      "summary": "Code as Policies 将自然语言指令翻译成可执行的机器人策略代码，让 LLM 通过 Python 控制流、函数组合和第三方库调用表达空间几何推理、反应式反馈循环和多步机器人行为。",
      "keyPoints": [
        "<strong>Language Model Programs (LMPs)</strong>：把 LLM 生成的 Python 程序作为策略，程序调用感知 API 和控制 API。",
        "<strong>少样本代码提示</strong>：提示中给出“指令注释 + 对应代码”示例，新指令由代码补全模型续写策略代码。",
        "<strong>层级代码生成</strong>：当主程序调用未定义函数时，递归提示 LLM 生成函数定义，形成可复用函数库。",
        "<strong>表达反馈循环</strong>：用 <code>if/while/for</code> 等代码结构表示“直到看见目标才移动”“如果检测到物体则停止”等闭环行为。",
        "<strong>空间几何能力</strong>：通过 NumPy、Shapely 等库进行坐标计算、形状生成、凸包和相对位置推理。",
        "<strong>跨机器人验证</strong>：在画图、桌面抓放、移动操作等多个真实机器人/仿真任务上展示无需额外训练的泛化。"
      ],
      "detail": "<h5>框架图</h5>\n<p><img alt=\"Code as Policies 框架\" src=\"https://ar5iv.labs.arxiv.org/html/2209.07753/assets/x1.png\" />\n<em>图：LLM 根据少样本示例把自然语言命令转成调用感知 API 与控制 API 的策略代码，并可递归生成缺失函数。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Code as Policies: generate and execute robot policy code\nprompt = build_prompt(examples=[\n    (&quot;# stack the blocks on the empty bowl&quot;, &quot;def policy(): ...&quot;),\n    (&quot;# move right until you see the apple&quot;, &quot;while not detect('apple'): ...&quot;),\n])\n\ncode = LLM.complete(prompt + f&quot;\\n# {user_instruction}\\n&quot;)\n\nwhile has_undefined_functions(code):\n    fn_name = next_undefined_function(code)\n    fn_prompt = build_function_prompt(fn_name, code, api_docs)\n    code += LLM.complete(fn_prompt)\n\nchecked_code = static_check(code, allowed_apis, allowed_imports)\npolicy_fn = sandbox_compile(checked_code)\npolicy_fn(perception_api, control_api)\n</code></pre>\n<h5>方法拆解</h5>\n<p>SayCan 用 LLM 在固定技能集合上选择动作，优点是可控，缺点是表达能力受技能库限制。Code as Policies 的问题意识是：很多机器人任务需要更细的逻辑，例如“把红块放到最左边的碗里”“沿对角线摆放物体”“看到目标前一直后退”。这些行为可以自然地写成程序，而不是离散技能序列。</p>\n<p>CaP 给 LLM 的不是普通文本规划提示，而是代码上下文。示例格式通常是自然语言命令作为注释，后面跟一段调用机器人 API 的 Python。新指令到来时，代码模型续写程序。生成的程序可以读取感知 API 输出，例如 <code>detect_objects()</code>、<code>get_obj_pos()</code>，再调用控制 API，例如 <code>pick_place()</code>、<code>move_to()</code>、<code>set_velocity()</code>。</p>\n<p>代码表示带来三个关键能力。第一，控制流：<code>while not detect_object(\"apple\")</code> 可表达反应式闭环，而不是一次性计划。第二，数值计算：程序可用坐标、距离、角度、插值和几何库处理“左边一点”“排成圆形”等模糊语言。第三，组合抽象：函数可封装常见子行为，在后续代码中复用。</p>\n<p>层级代码生成是 CaP 的重要工程设计。LLM 生成主策略时可能写出 <code>get_empty_bowl()</code> 或 <code>put_first_on_second()</code> 等未定义函数。系统检测未定义符号后，再以函数名、上下文和 API 文档为提示，让 LLM 补全函数体。这类似让模型自建一个小型策略库，论文也显示它提升了 HumanEval 与机器人代码生成表现。</p>\n<p>可以把生成策略形式化为：</p>\n<div class=\"kb-math kb-math-display\">\\pi_{\\theta}(a_t|o_{\\le t}, u) = \\operatorname{Exec}\\left(\\operatorname{LLM}(u,\\mathcal{E},\\mathcal{A})\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">u</span> 是用户指令，<span class=\"kb-math kb-math-inline\">\\mathcal{E}</span> 是少样本代码示例，<span class=\"kb-math kb-math-inline\">\\mathcal{A}</span> 是可用 API。LLM 输出程序，程序在运行时根据观测 <span class=\"kb-math kb-math-inline\">o_t</span> 调用控制 API 产生动作。</p>\n<p>CaP 的强项是可组合、可解释和数值精确；弱点是安全边界和 API 依赖。生成代码必须经过白名单、静态检查、沙箱执行和运行时异常处理，否则错误代码可能调用不允许的函数或产生危险参数。它适合已有稳定感知/控制原语的机器人栈，不适合直接替代低层控制学习。</p>\n<div class=\"key-point\">💡 关键：Code as Policies 把 LLM 的输出从“自然语言计划”提升为“可执行程序”，因此能表达循环、条件、函数和几何计算。</div>",
      "quiz": {
        "q": "Code as Policies 相比只生成自然语言步骤的主要优势是什么？",
        "options": [
          "代码能表达控制流、数值计算和 API 调用，可直接形成闭环策略",
          "代码不需要任何感知 API",
          "代码一定比所有学习策略安全",
          "代码会自动训练机器人低层控制器"
        ],
        "answer": 0,
        "explain": "CaP 的策略代码可以调用感知与控制 API，并用 if/while/函数/几何库表达复杂逻辑，这是纯自然语言步骤难以精确执行的。"
      }
    },
    {
      "id": "llm-planner",
      "num": 25,
      "name": "LLM-Planner",
      "fullName": "LLM规划器 (LLM Planner)",
      "year": "2023",
      "org": "arXiv",
      "parent": "saycan",
      "paperUrl": "https://arxiv.org/abs/2305.llmplanner",
      "projectUrl": "",
      "category": "task_planning",
      "motivation": "少样本提示动态调整任务计划",
      "summary": "LLM-Planner 用少量示例提示让 LLM 生成 ALFRED 等具身任务的高层计划，并通过检索相似示例、环境物体 logit bias 与失败触发的 grounded re-planning，使计划能随视觉环境反馈动态修正。",
      "keyPoints": [
        "<strong>高层计划 HLP</strong>：LLM 输出形如 <code>(GotoLocation, PickupObject, PutObject, ToggleObject)</code> 的高层动作序列，再交给低层执行器。",
        "<strong>少样本学习设定</strong>：只使用少量 paired training data，避免全量模仿学习对大量人工标注的依赖。",
        "<strong>kNN 示例检索</strong>：用冻结 BERT embedding 找到与当前任务最相似的 in-context examples，而不是随机拼接提示。",
        "<strong>物理接地提示</strong>：把当前已观察物体列表、已完成子目标和失败信息注入 prompt。",
        "<strong>logit bias 对齐物体名</strong>：对环境中已观察对象施加输出偏置，缓解“lamp/DeskLamp”“bin/GarbageCan”等命名差异。",
        "<strong>动态重规划</strong>：当前子目标失败或执行超时后，基于已完成计划前缀和观察对象重新生成剩余计划。"
      ],
      "detail": "<h5>框架图</h5>\n<p><img alt=\"LLM-Planner 框架\" src=\"https://ar5iv.labs.arxiv.org/html/2212.04088/assets/x1.png\" />\n<em>图：LLM-Planner 让 LLM 生成高层计划，并在执行期间用环境观察与失败反馈进行 grounded re-planning。清单中的 <code>paper_url</code> 是占位符，实际公开论文为 arXiv:2212.04088。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># LLM-Planner: few-shot high-level planning with grounded re-planning\nexamples = retrieve_knn_examples(task_instruction, small_training_set)\nobserved_objects = []\ncompleted_subgoals = []\n\nplan = LLM.generate_plan(\n    task=task_instruction,\n    examples=examples,\n    observed_objects=observed_objects,\n    completed=completed_subgoals,\n    logit_bias=objects_seen_bias(observed_objects),\n)\n\nk = 0\nwhile k &lt; len(plan):\n    subgoal = plan[k]\n    ok, new_objects = low_level_agent.execute(subgoal)\n    observed_objects.extend(new_objects)\n\n    if ok:\n        completed_subgoals.append(subgoal)\n        k += 1\n    elif failed_or_timeout(subgoal):\n        plan = LLM.generate_continuation(\n            task=task_instruction,\n            completed=completed_subgoals,\n            observed_objects=observed_objects,\n            examples=retrieve_knn_examples(task_instruction, small_training_set),\n        )\n        k = 0\n</code></pre>\n<h5>方法拆解</h5>\n<p>LLM-Planner 针对 ALFRED 这类需要导航、找物、交互和状态变化的长程任务。端到端模型需要大量示范才能学会高层顺序，而 LLM 已经从文本中学到“先找到土豆，再放进微波炉，再打开微波炉”这类常识。问题是，纯 LLM 计划容易提到环境中不存在的物体或坚持错误子目标，因此论文重点放在 few-shot prompting 与物理接地。</p>\n<p>提示结构包含任务说明、允许的高层动作集合、检索来的示例、当前测试任务和可选的环境信息。示例检索用 BERT embedding 的距离实现：当前任务“heat a potato”更应检索“cook an egg”而不是“clean a plate”。这降低了少样本设定下 prompt 空间的噪声。</p>\n<p>高层计划并不直接控制机器人，而是类似：</p>\n<pre><code class=\"language-text\">1. GotoLocation(CounterTop)\n2. PickupObject(Potato)\n3. GotoLocation(Microwave)\n4. PutObject(Potato, Microwave)\n5. ToggleObjectOn(Microwave)\n</code></pre>\n<p>低层 agent 负责把这些子目标映射到视觉导航和交互动作。论文中可接入 HLSM 等已有具身执行器，因此 LLM-Planner 是一个高层模块。</p>\n<p>Grounded re-planning 是核心闭环。当执行失败、长时间卡住或发现新对象时，LLM-Planner 把已完成子目标和观察到的对象列表加入 prompt，生成剩余计划。若寻找 cup 失败但看见 cabinet，LLM 可以基于常识改为打开 cabinet；若指令说 lamp 而环境标签是 DeskLamp，logit bias 可促使模型输出环境中真实对象名。</p>\n<p>相比 SayCan，LLM-Planner 更偏向“生成完整高层计划 + 必要时重规划”，而不是每一步在技能集合上用 affordance 乘积打分。相比 Code as Policies，它输出结构化高层动作而非任意 Python 代码，因此更容易和已有 ALFRED/HLSM 执行器对接。</p>\n<div class=\"warn-box\">⚠️ 注意：LLM-Planner 的 grounding 主要来自观察对象列表和执行失败信号，而不是连续几何地图。若低层执行器感知错误或无法报告对象，重规划质量会明显下降。</div>",
      "quiz": {
        "q": "LLM-Planner 中 kNN 示例检索的作用是什么？",
        "options": [
          "从少量训练集中选择与当前任务相似的 in-context examples，提高提示相关性",
          "为机器人计算最短路径",
          "训练新的视觉编码器",
          "替代低层动作执行器"
        ],
        "answer": 0,
        "explain": "LLM-Planner 用 BERT embedding 检索相似任务示例，让少样本 prompt 更贴近当前任务类型，从而提升高层计划质量。"
      }
    },
    {
      "id": "isr-llm",
      "num": 26,
      "name": "ISR-LLM",
      "fullName": "迭代自精炼LLM (Iterative Self-Refined LLM)",
      "year": "2024",
      "org": "ICRA 2024",
      "parent": "llm-planner",
      "paperUrl": "https://ieeexplore.ieee.org/document/10610065",
      "projectUrl": "",
      "category": "task_planning",
      "motivation": "生成-验证-修正迭代自精炼",
      "summary": "ISR-LLM 提出“翻译成 PDDL → LLM 生成计划 → 验证器反馈 → LLM 修正”的迭代自精炼框架，用验证反馈提高 LLM 长程顺序任务计划的可行性和正确性。",
      "keyPoints": [
        "<strong>三阶段流程</strong>：preprocessing 用 LLM translator 把自然语言转为 PDDL domain/problem，planning 用 LLM planner 生成动作序列，self-refinement 用 validator 迭代修正。",
        "<strong>两类验证器</strong>：LLM-based self-validator 成本低、通用；external validator 反馈更精确，但需要外部工具或定制实现。",
        "<strong>PDDL 中间表示</strong>：把任务、对象、前置条件和目标状态显式化，使验证与错误定位更系统。",
        "<strong>CoT 计划提示</strong>：在 planner 和 self-validator prompt 中引入 chain-of-thought 风格中间推理，改善复杂任务分解。",
        "<strong>错误驱动修正</strong>：验证器指出首个错误动作或整体错误原因，LLM planner 基于反馈生成新计划。",
        "<strong>多规划域评估</strong>：在 Cooking、Blocksworld、Ball Moving 等长程顺序规划域中，相比直接 LLM planning 提升成功率。"
      ],
      "detail": "<h5>框架图</h5>\n<p><img alt=\"ISR-LLM 框架图\" src=\"https://www.researchgate.net/figure/figure/Overview-of-the-proposed-ISR-LLM-framework-It-consists-of-three-steps-preprocessing_fig1_373450692/download\" />\n<em>图：ISR-LLM Figure 1 的公开预览/下载入口。论文图直链在 ResearchGate 与 IEEE 页面上受限；本精读依据 IEEE 元信息、arXiv:2308.13724 源文件和作者公开 PDF，源文件确认 Figure 1 为 preprocessing、planning、iterative self-refinement 三阶段框架。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># ISR-LLM: iterative self-refined planning\ndomain_pddl, problem_pddl = LLM_translator(natural_language_task, examples)\n\nplan = LLM_planner(\n    domain=domain_pddl,\n    problem=problem_pddl,\n    chain_of_thought=True,\n)\n\nfor i in range(max_refine_iters):\n    ok, feedback = validator.check(plan, domain_pddl, problem_pddl)\n    if ok:\n        return plan\n\n    plan = LLM_planner.refine(\n        domain=domain_pddl,\n        problem=problem_pddl,\n        previous_plan=plan,\n        validator_feedback=feedback,\n    )\n\nreturn plan  # 若仍未通过，返回最后一次计划并标记失败\n</code></pre>\n<h5>方法拆解</h5>\n<p>LLM 在长程任务规划中常犯两类错误：一是物理或逻辑不可行，例如没打开容器就取物，手里已有物体还继续抓取；二是目标不完整，例如完成前几个子目标后提前结束。ISR-LLM 不假设一次生成就正确，而是把规划变成可验证、可反馈、可修正的循环。</p>\n<p>第一阶段是 preprocessing。LLM translator 把自然语言任务转成 PDDL 表示，包括 objects、predicates、initial state 和 goal。PDDL 的作用不是让传统 planner 全权接管，而是提供形式化状态机，使后续 validator 能判断动作前置条件、状态变化和目标达成情况。相比纯自然语言上下文，PDDL 更容易暴露“这个动作在当前状态不能执行”的错误。</p>\n<p>第二阶段是 planning。LLM planner 读取 domain/problem PDDL，并结合 few-shot examples 和 CoT 提示生成动作序列。可以把初始计划表示为：</p>\n<div class=\"kb-math kb-math-display\">\\pi_0 = \\operatorname{LLM}_{\\text{plan}}(D_{\\text{PDDL}}, P_{\\text{PDDL}}, \\mathcal{E})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">D</span> 是 domain，<span class=\"kb-math kb-math-inline\">P</span> 是 problem，<span class=\"kb-math kb-math-inline\">\\mathcal{E}</span> 是示例和推理提示。</p>\n<p>第三阶段是 iterative self-refinement。验证器检查 <span class=\"kb-math kb-math-inline\">\\pi_t</span>，若发现错误则生成反馈 <span class=\"kb-math kb-math-inline\">f_t</span>，LLM planner 再基于反馈修正：</p>\n<div class=\"kb-math kb-math-display\">\\pi_{t+1}=\\operatorname{LLM}_{\\text{refine}}(D_{\\text{PDDL}}, P_{\\text{PDDL}}, \\pi_t, f_t)</div>\n<p>循环直到无错误或达到最大迭代次数。外部验证器通常能精确指出第几个动作违反了哪个前置条件，因此修正更有效；LLM self-validator 不需要额外工程，但反馈可能更粗糙。</p>\n<p>与 LLM-Planner 相比，ISR-LLM 更强调形式化验证与错误反馈，而不是只在执行失败后重规划。与 Code as Policies 相比，它不让 LLM 生成任意可执行程序，而是生成受 PDDL 约束的动作序列，更适合需要严谨前置条件和目标条件检查的任务规划域。</p>\n<div class=\"key-point\">💡 关键：ISR-LLM 的“自精炼”不是让模型反思一句话，而是用验证器把计划错误转成结构化反馈，再喂回 planner 生成修正版。</div>",
      "quiz": {
        "q": "ISR-LLM 中 PDDL 中间表示的主要作用是什么？",
        "options": [
          "替代所有 LLM 调用",
          "显式描述对象、状态、动作前置条件和目标，使验证器能系统检查计划错误",
          "把机器人视觉图像压缩成向量",
          "只用于论文排版"
        ],
        "answer": 1,
        "explain": "PDDL 将规划问题形式化，validator 可以据此检查动作是否满足前置条件、状态是否正确更新、目标是否达成。"
      }
    },
    {
      "id": "fltrnn",
      "num": 27,
      "name": "FLTRNN",
      "fullName": "忠实长程任务规划 (Faithful Long-Horizon Task Planning)",
      "year": "2024",
      "org": "ICRA 2024",
      "parent": "isr-llm",
      "paperUrl": "https://ieeexplore.ieee.org/document/10611663",
      "projectUrl": "",
      "category": "task_planning",
      "motivation": "LLM+推理网络双层忠实规划",
      "summary": "FLTRNN 针对 LLM 在复杂长程任务中忽略上下文规则的问题，提出语言化 RNN 结构，把任务分解、长短期记忆、Rule-CoT 和 memory graph 融入规划推理，以提升生成计划对规则和状态的忠实性。",
      "keyPoints": [
        "<strong>任务先分解再规划</strong>：先把长程目标拆成若干更简单子目标，再逐个求解并汇总计划。",
        "<strong>Language-Based RNN</strong>：用类似 RNN 的逐子任务循环，把长期任务信息和短期子任务上下文传递给 LLM。",
        "<strong>长短期记忆划分</strong>：总目标、初始计划和全局规则作为 long-term memory；当前子目标、示例、对象状态和细节作为 short-term memory。",
        "<strong>Rule-CoT</strong>：在动作生成中显式写出规则推理，如“柜子关闭，取物前必须打开”“一次只能拿一个物体”。",
        "<strong>Memory Graph</strong>：维护对象位置、状态和已完成目标，减少长上下文中遗漏约束。",
        "<strong>VirtualHome 评估</strong>：在家庭长程任务中比较 planning-only、planning-reasoning 和 FLTRNN，展示忠实性与成功率提升。"
      ],
      "detail": "<h5>框架图</h5>\n<p><img alt=\"FLTRNN 方法框架\" src=\"https://tannl.github.io/FLTRNN.github.io/Method_simple_9_00.png\" />\n<em>图：FLTRNN 作者项目页给出的框架示意。系统先拆分长程目标，再通过语言化 RNN 单元逐子目标规划，并结合规则推理与记忆管理。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># FLTRNN: faithful long-horizon planning with language-based RNN\nsubgoals = LLM_decompose(task_goal)\nlong_memory = {\n    &quot;total_goal&quot;: task_goal,\n    &quot;global_rules&quot;: action_rules,\n    &quot;initial_plan&quot;: subgoals,\n    &quot;completed_goals&quot;: [],\n}\nmemory_graph = build_memory_graph(initial_observation)\nfull_plan = []\n\nfor subgoal in subgoals:\n    short_memory = {\n        &quot;current_subgoal&quot;: subgoal,\n        &quot;retrieved_examples&quot;: select_examples(subgoal),\n        &quot;object_states&quot;: memory_graph.relevant_states(subgoal),\n    }\n\n    sub_plan = LLM_plan_with_rule_cot(long_memory, short_memory)\n    checked_plan = enforce_rule_thoughts(sub_plan, action_rules, memory_graph)\n    full_plan.extend(checked_plan)\n\n    memory_graph.update(checked_plan)\n    long_memory[&quot;completed_goals&quot;].append(subgoal)\n\nreturn aggregate_and_deduplicate(full_plan)\n</code></pre>\n<h5>方法拆解</h5>\n<p>长程家庭任务往往包含多个对象、容器状态和顺序约束。普通 in-context planning 把所有规则、示例和任务描述塞进一个长 prompt，模型容易在后半段忽略前文规则，产生“不忠实”计划。例如手里已有物体还继续 grab，容器是 closed 却直接 putin，或者重复打开已经打开的对象。FLTRNN 的目标是让 LLM 在长上下文下持续遵守规则。</p>\n<p>第一步是任务分解。若目标是“把 pancake 放进 microwave 并打开 microwave，同时把 cupcake 放进 stove 并打开 stove”，系统先拆成 microwave 子任务和 stove 子任务。这样每次规划只关注一个较短子目标，降低上下文长度和组合复杂度。</p>\n<p>第二步是 Language-Based RNN。它不是传统数值 RNN，而是把 RNN 的“长期状态 + 当前输入 + 输出更新状态”思想搬到语言提示中。长期记忆 <span class=\"kb-math kb-math-inline\">M_L</span> 包含总目标、已完成目标、全局动作规则和初始分解；短期记忆 <span class=\"kb-math kb-math-inline\">M_S^t</span> 包含当前子目标、相关示例和对象状态。每个子任务的 LLM 单元可写成：</p>\n<div class=\"kb-math kb-math-display\">p_t, M_L^{t+1}=\\operatorname{LLMCell}(M_L^t, M_S^t)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">p_t</span> 是当前子计划，<span class=\"kb-math kb-math-inline\">M_L^{t+1}</span> 更新已完成目标和关键状态。</p>\n<p>Rule-CoT 要求模型在动作前写出规则推理。比如在 <code>grab(chicken)</code> 前写出“chicken 在 fridge 内且 fridge closed，所以先 open(fridge)”；在第二次抓取前写出“手上已有物体，所以先 putback 或 putin”。这种显式推理让规则不只存在于 prompt 开头，而是在每个动作附近被重新激活。</p>\n<p>Memory Graph 负责保存对象位置和状态，如 <code>(cupcake, INSIDE, cabinet)</code>、<code>cabinet: closed</code>、<code>robot_hand: occupied</code>。规划完一个子任务后，图被更新；下一子任务检索相关状态进入 short-term memory。这样系统不必把所有历史原样塞进 prompt，而是把与当前子目标相关的状态结构化提取出来。</p>\n<p>与 ISR-LLM 相比，FLTRNN 不主要依赖外部 validator 的生成-验证-修正闭环，而是从 prompt 组织和记忆机制上提高一次生成的忠实性。它更像“规划前把长任务拆小，规划中用语言 RNN 保持状态，动作处用 Rule-CoT 重申约束”。实际系统仍可与验证器结合，但论文重点是记忆与分解结构。</p>\n<div class=\"key-point\">💡 关键：FLTRNN 解决的是长上下文规则遗忘问题。它把全局规则和当前子任务上下文分层管理，使 LLM 每一步都能看到最相关的约束。</div>",
      "quiz": {
        "q": "FLTRNN 中 long-term memory 与 short-term memory 的分工是什么？",
        "options": [
          "long-term memory 存当前图像，short-term memory 存模型参数",
          "long-term memory 存总目标、全局规则和完成进度，short-term memory 存当前子目标、相关示例和对象状态",
          "二者完全相同，只是名称不同",
          "short-term memory 只用于训练，不参与推理"
        ],
        "answer": 1,
        "explain": "FLTRNN 用长期记忆保持任务级约束和进度，用短期记忆聚焦当前子任务所需的示例与对象状态，从而减少长程规划中的规则遗漏。"
      }
    },
    {
      "id": "robohorizon",
      "num": 28,
      "name": "RoboHorizon",
      "fullName": "LLM辅助多视角世界模型 (LLM-Assisted Multi-View World Model)",
      "year": "2025",
      "org": "arXiv",
      "parent": "fltrnn",
      "paperUrl": "https://arxiv.org/abs/2501.06605",
      "projectUrl": "",
      "category": "task_planning",
      "motivation": "世界模型多视角长程规划",
      "summary": "RoboHorizon 提出 Recognize-Sense-Plan-Act 框架，把 LLM 生成的多阶段奖励、关键帧多视角表征和 Dreamer 风格世界模型结合起来，解决长程机器人操作中“任务分解难、奖励稀疏、视觉状态难压缩”的问题。",
      "keyPoints": [
        "RSPA 四阶段框架：Recognize 用 LLM 生成子任务描述与奖励代码，Sense 学习关键帧多视角表征，Plan 训练 RSSM 世界模型，Act 在想象轨迹中优化策略。",
        "LLM 不直接输出动作，而是把自然语言目标转为密集的多阶段奖励 <span class=\"kb-math kb-math-inline\">r_t^{(k)}</span>，为长程任务提供可学习的中间信号。",
        "KMV-MAE 利用演示中的关节速度和夹爪状态发现 key-horizon，并通过多视角遮蔽重建学习对关键状态敏感的视觉表示。",
        "RoboHorizon 世界模型继承 Dreamer/MWM 的 latent dynamics 思路，在冻结表征空间里预测未来 latent、reward 和 continuation。",
        "策略优化采用 DreamerV2 式 actor-critic，通过模型想象 rollout 计算 <span class=\"kb-math kb-math-inline\">\\lambda</span>-return，减少真实交互成本。",
        "实验覆盖 RLBench 与 FurnitureBench，重点验证长程多阶段操作、少奖励场景和多视角输入下的规划收益。"
      ],
      "detail": "<p><img alt=\"RoboHorizon 框架图\" src=\"https://arxiv.org/html/2501.06605v1/x2.png\" />\n<em>图：RoboHorizon 将 LLM 任务识别、关键视角感知、latent 世界模型和 actor-critic 控制串成 RSPA 闭环。</em></p>\n<pre><code class=\"language-python\"># RoboHorizon / RSPA 伪代码\ndef train_robohorizon(task_text, demos, env):\n    stages = llm_expand_task(task_text)                 # Recognize: 语言目标 -&gt; 多阶段动作语义\n    reward_fns = llm_generate_reward_code(stages)       # 为每个阶段生成状态奖励函数\n\n    keyframes = discover_key_horizons(demos)            # 关节近静止且夹爪状态变化附近\n    encoder = train_kmv_mae(demos, keyframes)           # Sense: 多视角遮蔽重建 + reward 预测\n\n    world_model = RSSM()\n    for batch in replay_buffer(env, reward_fns):\n        z = encoder(batch.multi_view_images)\n        loss_model = rssm_reconstruction_loss(world_model, z, batch.actions, batch.rewards)\n        update(world_model, loss_model)\n\n    actor, critic = init_actor_critic()\n    for _ in range(num_updates):\n        imagined = world_model.rollout(actor, horizon=H)\n        returns = lambda_return(imagined.rewards, imagined.values)\n        update(actor, -returns.mean())\n        update(critic, mse(critic(imagined.states), returns))\n    return actor\n</code></pre>\n<p>RoboHorizon 的核心动机是：长程操作任务通常需要多个中间里程碑，例如“打开抽屉、抓取物体、放到目标位置”。传统 RL 如果只用终点奖励，学习信号过稀疏；如果人工设计奖励，又需要大量任务工程。RoboHorizon 让 LLM 承担“语义分解器”和“奖励生成器”的角色：给定自然语言目标、机器人状态接口和 prompt 模板，LLM 先把任务扩写成多阶段 motion description，再把每个阶段翻译成可执行奖励代码。这样奖励可写成阶段加权形式：</p>\n<div class=\"kb-math kb-math-display\">r_t = \\sum_{k=1}^{K} \\alpha_k r_t^{(k)}(s_t, a_t, g_k),</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">g_k</span> 是第 <span class=\"kb-math kb-math-inline\">k</span> 个语义子目标，<span class=\"kb-math kb-math-inline\">\\alpha_k</span> 控制阶段权重。LLM 生成的奖励不是最终策略，因此系统仍通过 RL 和世界模型学习动作闭环，降低了语言模型直接控制机械臂时的安全和精度风险。</p>\n<p>Sense 阶段的关键是 KMV-MAE。它不是对所有视频帧平均建模，而是从演示中找出 key-horizon：当关节速度接近 0、夹爪状态保持或发生关键切换时，往往对应“接触、对齐、完成子步骤”的状态。多视角图像 <span class=\"kb-math kb-math-inline\">o_t^{1:V}</span> 经编码器得到 <span class=\"kb-math kb-math-inline\">z_t</span>，训练目标同时包含遮蔽视角重建和奖励/关键帧预测：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{KMV}} =\n\\mathcal{L}_{\\text{recon}}(\\hat{o}_t^{\\mathcal{M}}, o_t^{\\mathcal{M}})\n+ \\beta \\mathcal{L}_{\\text{key}}(\\hat{y}_t, y_t)\n+ \\gamma \\mathcal{L}_{\\text{reward}}(\\hat{r}_t, r_t).</div>\n<p>这个设计让表示既保留多视角几何信息，又偏向对长期规划有意义的状态变化，而不是只拟合像素细节。</p>\n<p>Plan 阶段使用 RSSM 式 latent dynamics。给定上一隐状态 <span class=\"kb-math kb-math-inline\">h_t</span>、随机状态 <span class=\"kb-math kb-math-inline\">z_t</span> 和动作 <span class=\"kb-math kb-math-inline\">a_t</span>，世界模型学习先验 <span class=\"kb-math kb-math-inline\">p(z_{t+1}\\mid h_t,a_t)</span>、后验 <span class=\"kb-math kb-math-inline\">q(z_{t+1}\\mid h_t,a_t,o_{t+1})</span>、奖励预测与 continuation 预测。典型目标可概括为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{wm}} =\n\\mathcal{L}_{\\text{obs}} + \\mathcal{L}_{\\text{reward}} + \\mathcal{L}_{\\text{cont}}\n+ \\mathrm{KL}\\left(q(z_t\\mid h_t,o_t)\\,\\|\\,p(z_t\\mid h_t)\\right).</div>\n<p>Act 阶段再在世界模型中想象未来轨迹，用 <span class=\"kb-math kb-math-inline\">\\lambda</span>-return 训练 actor 和 critic。与直接 model-free RL 相比，它把昂贵的真实环境交互转为 latent rollout；与只做视觉语言规划相比，它能在连续控制层面学习夹爪、关节和接触动态。RoboHorizon 的新意不在某个单独模块，而在把 LLM 奖励、关键多视角表征和 latent imagination 三者对齐到长程操作目标上。</p>\n<div class=\"key-point\">💡 关键：RoboHorizon 让 LLM 负责“任务语义与奖励结构”，让世界模型负责“可控动态与策略优化”，两者分工明确。</div>",
      "quiz": {
        "q": "RoboHorizon 中 LLM 的主要作用是什么？",
        "options": [
          "把自然语言任务分解为多阶段描述，并生成可执行奖励函数",
          "直接输出每个控制周期的机械臂关节角",
          "替代世界模型预测未来图像",
          "只用于给实验结果生成文字解释"
        ],
        "answer": 0,
        "explain": "RoboHorizon 使用 LLM 产生阶段化任务语义和奖励代码，连续动作仍由世界模型与 actor-critic 学习。"
      }
    },
    {
      "id": "castl",
      "num": 29,
      "name": "CASTL",
      "fullName": "约束即规范 (Constraints as Specifications Through LLM)",
      "year": "2025",
      "org": "ICRA 2025",
      "parent": "isr-llm",
      "paperUrl": "https://ieeexplore.ieee.org/document/11127555",
      "projectUrl": "",
      "category": "task_planning",
      "motivation": "自然语言约束转TAMP规范",
      "summary": "CASTL 提出用 LLM 将自然语言约束自动转成 TAMP 可执行规范，解决用户指令里“目标、禁忌、先后关系和全局规则”难以手工形式化的问题。",
      "keyPoints": [
        "将语言约束分为四类：attribute、eventual/goal、implication/action ordering、global/action blocking。",
        "输入包含 PDDL domain、环境 scene graph 和部分 problem specification，使 LLM 生成结果受已知对象、谓词和动作接口约束。",
        "多步提示链先解析对象属性和指代，再识别约束类型，最后分别生成 PDDL goal 或 Python constraint script。",
        "对 implication/global 约束采用自定义 planner API 生成 Python 脚本，并通过语法执行和语义一致性检查进行纠错。",
        "后端使用 SMT/PDDL/TAMP 求解器 IDTMP，把语言约束落到可验证的规划问题中。",
        "在 HouseChip、Kitchen、BlocksWorld 等任务上，完整 CASTL 比 one-step prompting 和 Subtask baseline 更稳定。"
      ],
      "detail": "<p><img alt=\"CASTL 方法对比图\" src=\"https://arxiv.org/html/2410.22225v1/x2.png\" />\n<em>图：CASTL 将自然语言约束拆成可求解的 PDDL 目标与 Python 约束脚本，而不是让 LLM 直接输出完整动作序列。</em></p>\n<pre><code class=\"language-python\"># CASTL 约束转 TAMP 伪代码\ndef castl_compile(user_constraints, pddl_domain, scene_graph, partial_problem):\n    resolved = llm_resolve_references(user_constraints, scene_graph)\n    typed_constraints = llm_classify_constraints(resolved)\n\n    problem = partial_problem.copy()\n    scripts = []\n    for c in typed_constraints:\n        if c.kind in [&quot;attribute&quot;, &quot;eventual&quot;]:\n            goal_literals = llm_generate_pddl_goal(c, pddl_domain, scene_graph)\n            problem.add_goal(goal_literals)\n        else:\n            script = llm_generate_python_constraint(c, planner_api=pddl_domain.api)\n            while not executes(script):\n                script = llm_repair_script(script, error_trace=last_error())\n            scripts.append(script)\n\n    planner = IDTMP(problem, domain=pddl_domain)\n    for script in scripts:\n        planner.load_constraint_script(script)\n    return planner.solve()\n</code></pre>\n<p>CASTL 的背景是 task and motion planning 本身需要严格的形式化输入，而真实用户更习惯说“不要经过厨房”“拿蓝色杯子前先打开柜门”“所有热物体都不能碰木桌”这类约束。直接让 LLM 生成计划会缺少可验证性，直接让用户写 PDDL 又不现实。CASTL 选择中间路线：LLM 负责编译 specification，传统规划器负责求解和验证。</p>\n<p>论文把约束分成四种，是因为不同约束对应不同后端表达。attribute 约束用于把“红色碗”“最左边的杯子”解析成对象集合；eventual/goal 约束可以直接写成 PDDL goal；implication 约束表达“若发生 A，则必须先/后发生 B”；global 约束表达整个轨迹都不能违反的规则。形式上，规划问题可以写成：</p>\n<div class=\"kb-math kb-math-display\">\\Pi = \\langle \\mathcal{O}, \\mathcal{A}, s_0, G, \\mathcal{C} \\rangle,</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">G</span> 是目标文字被编译出的 PDDL goal，<span class=\"kb-math kb-math-inline\">\\mathcal{C}</span> 是由 Python constraint script 表达的轨迹约束集合。规划器搜索动作序列 <span class=\"kb-math kb-math-inline\">\\tau=(a_1,\\ldots,a_T)</span>，要求 <span class=\"kb-math kb-math-inline\">\\tau\\models G</span> 且 <span class=\"kb-math kb-math-inline\">\\tau\\models \\mathcal{C}</span>。</p>\n<p>对非目标类约束，CASTL 让 LLM 生成调用 planner API 的 Python 脚本，而不是生成松散 JSON。原因是 action blocking、ordering、forall 等逻辑往往需要程序化检查，例如在 planner 扩展节点时阻止某个动作：</p>\n<pre><code class=\"language-python\">def _load_constraints(self, planner):\n    hot_objects = planner.get_objects_by_attribute(&quot;temperature&quot;, &quot;hot&quot;)\n    wood_surfaces = planner.get_objects_by_attribute(&quot;material&quot;, &quot;wood&quot;)\n    for obj in hot_objects:\n        for surface in wood_surfaces:\n            planner.block_expression_action(\n                action=&quot;place&quot;,\n                arguments={&quot;object&quot;: obj, &quot;target&quot;: surface},\n            )\n</code></pre>\n<p>训练/推理流程更接近“编译器流水线”而不是端到端学习：LLM 解析自然语言，生成候选规范；系统运行脚本并捕获语法错误；再用 LLM 做语义一致性检查，判断脚本是否真的覆盖用户约束；最后交给 IDTMP 求解。与 ISR-LLM 或 Code-as-Policies 类方法相比，CASTL 的优势是把 LLM 输出限定在 planner specification 层，保留 PDDL/TAMP 的可解释性和失败可诊断性。</p>\n<div class=\"warn-box\">⚠️ 注意：用户给出的 IEEE 链接可能需要访问权限；本精读依据公开 arXiv 版本与作者预印本整理，YAML 中仍保留原始 <code>paper_url</code>。</div>",
      "quiz": {
        "q": "CASTL 为什么不直接让 LLM 输出最终机器人动作序列？",
        "options": [
          "因为 CASTL 只处理视觉识别任务",
          "因为最终动作序列无法表达任何自然语言约束",
          "因为将语言编译成 PDDL/Python 规范后，可由 TAMP 求解器验证并搜索可行计划",
          "因为 PDDL domain 在 CASTL 中完全没有被使用"
        ],
        "answer": 2,
        "explain": "CASTL 的核心是把 LLM 放在规范生成层，让后端规划器负责可行性、几何约束和轨迹约束验证。"
      }
    },
    {
      "id": "llm-bt-planner",
      "num": 30,
      "name": "LLM-as-BT-Planner",
      "fullName": "LLM行为树规划器 (LLM as Behavior Tree Planner)",
      "year": "2025",
      "org": "ICRA 2025",
      "parent": "code-as-policies",
      "paperUrl": "https://ieeexplore.ieee.org/document/11128454",
      "projectUrl": "",
      "category": "task_planning",
      "motivation": "LLM生成可组合行为树",
      "summary": "LLM-as-BT-Planner 把 LLM 生成的机器人任务计划组织为行为树，使语言规划结果具备模块化、可复用、可恢复执行的结构，而不是一次性输出脆弱的线性动作列表。",
      "keyPoints": [
        "使用 Behavior Tree 表达机器人装配任务，节点包括 condition、action、sequence、fallback 等可组合控制结构。",
        "提出四种基于 in-context learning 的 BT 生成方式：one-step、iterative、human-in-the-loop、recursive。",
        "recursive 方案通过逐步展开未完成节点生成子树，降低一次性生成大树的结构错误。",
        "human-in-the-loop 方案允许人在中间检查和修复 BT，论文中表现出更高成功率。",
        "对 unit-tree generation 和 one-step BT generation 做监督微调，提升小模型输出结构合法性的概率。",
        "在 Franka Emika Panda 真实装配场景中验证，BT 的模块化和运行时 tick 机制有利于错误恢复。"
      ],
      "detail": "<p><img alt=\"LLM 递归生成行为树示意图\" src=\"https://arxiv.org/html/2409.10444v1/extracted/5855020/pic/pic/ws_generation_rec.drawio.png\" />\n<em>图：递归生成方法把复杂任务树拆成局部子树，逐步展开为可执行 Behavior Tree。</em></p>\n<pre><code class=\"language-python\"># LLM-as-BT-Planner 递归行为树生成伪代码\ndef generate_bt(task, domain_skills, examples):\n    root = Node(type=&quot;Goal&quot;, text=task)\n    frontier = [root]\n\n    while frontier:\n        node = frontier.pop()\n        prompt = build_prompt(node, domain_skills, examples, current_tree=root)\n        subtree = llm_generate_subtree(prompt)\n        subtree = parse_and_validate_bt(subtree)\n\n        replace(node, subtree)\n        for child in subtree.children:\n            if child.needs_expansion():\n                frontier.append(child)\n\n    while not executable(root):\n        error = bt_static_check(root)\n        root = llm_repair_tree(root, error)\n    return root\n</code></pre>\n<p>这篇工作的出发点是：LLM 很擅长把“装配齿轮组”这样的高层目标拆成语义步骤，但直接输出线性动作序列会丢失条件检查、失败回退和可复用子任务。Behavior Tree 用 tick 机制执行，每个节点返回 <code>SUCCESS</code>、<code>FAILURE</code> 或 <code>RUNNING</code>，天然适合机器人任务的局部失败恢复。一个 sequence 节点可形式化为：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{Seq}(c_1,\\ldots,c_n)=\n\\begin{cases}\n\\mathrm{FAILURE}, &amp; \\exists i,\\ c_i=\\mathrm{FAILURE}\\\\\n\\mathrm{RUNNING}, &amp; \\exists i,\\ c_i=\\mathrm{RUNNING}\\ \\land\\ \\forall j&lt;i,\\ c_j=\\mathrm{SUCCESS}\\\\\n\\mathrm{SUCCESS}, &amp; \\forall i,\\ c_i=\\mathrm{SUCCESS}.\n\\end{cases}</div>\n<p>LLM-as-BT-Planner 的方法不是单一 prompt，而是比较了多种生成范式。one-step 最简单：把任务、技能库和示例放进 prompt，让 LLM 一次性输出完整 XML/JSON 行为树；iterative 每次生成后用检查器反馈错误再修；human-in-the-loop 在中间让人类纠正语义或结构问题；recursive 则把大计划拆成待展开节点，逐步生成局部子树。递归策略的直觉是局部上下文更短、约束更清楚，LLM 更不容易破坏 BT 语法。</p>\n<p>监督微调部分把 BT 生成拆成两类数据：unit-tree generation 学习单个语义技能如何映射成小树，one-step generation 学习整棵树结构。优化目标本质仍是语言模型交叉熵：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{SFT}}(\\theta)=\n-\\sum_{t=1}^{T}\\log p_\\theta(y_t\\mid y_{&lt;t}, x),</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">x</span> 包含任务描述、技能定义和上下文示例，<span class=\"kb-math kb-math-inline\">y</span> 是 BT 序列化文本。论文观察到微调通常能提升“可解析/结构合法”的比例，但是否提升真实任务成功率还取决于底层技能接口、错误检测和环境反馈。</p>\n<p>与 Code-as-Policies 类方法相比，BT 输出不是任意 Python 程序，而是受限的控制结构。受限表示牺牲了一些表达自由度，但带来两个工程收益：第一，BT 的静态检查更容易，例如节点类型、孩子数量、技能名是否存在；第二，运行时可以在 condition 失败时局部回退，而不是整段代码异常退出。论文的真实机器人装配实验说明，LLM 负责语义组合，BT 负责执行控制，两者结合比线性 plan 更适合含接触和装配顺序的任务。</p>\n<div class=\"warn-box\">⚠️ 注意：用户给出的 IEEE 页面可能需要权限；本精读依据公开 arXiv 版本整理，YAML 中保留原始 <code>paper_url</code>。</div>",
      "quiz": {
        "q": "LLM-as-BT-Planner 使用 Behavior Tree 的核心好处是什么？",
        "options": [
          "把所有机器人动作离散化成单个 token",
          "让任务计划具备条件检查、组合复用和失败回退结构",
          "完全避免底层机器人技能库",
          "替代视觉感知模型完成目标检测"
        ],
        "answer": 1,
        "explain": "行为树通过 sequence/fallback/condition/action 节点组织执行逻辑，使 LLM 生成计划更容易验证和恢复。"
      }
    },
    {
      "id": "openvla",
      "num": 31,
      "name": "OpenVLA",
      "fullName": "开源视觉语言动作模型 (Open Vision-Language-Action Model)",
      "year": "2024",
      "org": "Stanford/UCB",
      "parent": "—",
      "paperUrl": "https://openvla.github.io/",
      "projectUrl": "",
      "category": "vla_model",
      "motivation": "开源7B参数VLA端到端控制",
      "summary": "OpenVLA 提出一个 7B 参数开源视觉-语言-动作模型，把多机器人演示数据中的图像、语言指令和连续动作统一到 autoregressive VLM 中，为端到端机器人控制提供可复现的强基线。",
      "keyPoints": [
        "基于 Prismatic VLM 和 Llama 2 语言模型，融合 DINOv2 与 SigLIP 视觉特征形成机器人可用视觉输入。",
        "使用 Open-X Embodiment 约 970k 条真实机器人演示训练，覆盖多机器人、多任务和多视角数据。",
        "将 7 维机器人动作离散化为语言模型词表中的 action token，由 LLM 自回归生成。",
        "训练目标是 next-token prediction，把语言建模、视觉理解和动作预测统一成同一个序列建模问题。",
        "以 7B 参数规模在多项任务上超过更大闭源 RT-2-X 55B，并支持 LoRA/量化微调。",
        "局限是离散自回归动作逐 token 解码较慢，难以天然适配高频连续控制。"
      ],
      "detail": "<p><img alt=\"OpenVLA 总览图\" src=\"https://arxiv.org/html/2406.09246v1/x1.png\" />\n<em>图：OpenVLA 将图像和语言输入送入 VLM，并把机器人动作作为特殊 token 自回归生成。</em></p>\n<pre><code class=\"language-python\"># OpenVLA 推理与训练伪代码\ndef train_openvla(batch):\n    image_tokens = prismatic_vision_encoder(batch.images)  # DINOv2 + SigLIP\n    prompt_tokens = tokenize(batch.language_instruction)\n    action_tokens = discretize_actions(batch.actions)      # 连续动作 -&gt; token bins\n    seq = concat(prompt_tokens, image_tokens, action_tokens)\n    loss = next_token_cross_entropy(model(seq[:-1]), seq[1:])\n    update(model, loss)\n\ndef act_openvla(obs_image, instruction):\n    z_img = prismatic_vision_encoder(obs_image)\n    tokens = tokenize(instruction)\n    y = autoregressive_decode(model, tokens, z_img, max_action_tokens=7)\n    action = denormalize(undiscretize(y))\n    return action\n</code></pre>\n<p>OpenVLA 的核心选择是把机器人控制写成 VLM 的序列预测问题。输入由图像 <span class=\"kb-math kb-math-inline\">o_t</span> 和语言指令 <span class=\"kb-math kb-math-inline\">\\ell</span> 组成，输出是动作 <span class=\"kb-math kb-math-inline\">a_t</span>。模型把连续动作的每个维度离散到若干 bin，再映射到词表 token，因此训练目标可写作：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{NTP}}(\\theta)=\n-\\sum_{i=1}^{m}\\log p_\\theta(y_i \\mid y_{&lt;i}, \\ell, o_t),</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">y_i</span> 是动作 token 序列。这个设计最大化复用了大语言模型的自回归能力：动作不再需要单独的 diffusion head 或回归头，而是作为“机器人语言”被生成。</p>\n<p>视觉部分采用 Prismatic VLM 路线，将 DINOv2 的空间/几何特征和 SigLIP 的语义对齐特征融合，再投影到 LLM token 空间。这样做的直觉是，机器人操作既需要知道“这是什么物体”，也需要知道“它在图像中的哪个位置、边缘和姿态如何”。融合视觉编码器比单一 CLIP 式特征更适合抓取、放置和接触任务。</p>\n<p>训练流程依赖大规模跨具身数据。Open-X Embodiment 中不同机器人动作维度、坐标系和控制频率并不完全一致，OpenVLA 通过归一化、动作维度适配和统一 token 化，把它们放进同一个 VLA 训练管线。推理时，模型接收当前 RGB 观测和语言目标，生成一段动作 token，再反离散化、反归一化为机器人控制命令。</p>\n<p>与 RT-1/RT-2 一类模型相比，OpenVLA 的重要意义是开源和可微调：社区可以检查数据处理、模型权重和微调策略，并在消费级 GPU 上用 LoRA 或量化适配新任务。但它也暴露了第一代 VLA 的典型瓶颈：动作 token 的自回归解码需要逐维输出，若每个控制周期都要生成多个 token，则延迟会成为真实机器人高频控制的限制。</p>\n<div class=\"key-point\">💡 关键：OpenVLA 的贡献不是发明新的控制器，而是把大规模 VLM 训练范式开放地迁移到机器人动作预测。</div>",
      "quiz": {
        "q": "OpenVLA 如何把连续机器人动作接入语言模型？",
        "options": [
          "把动作离散化为 action token，并用 next-token prediction 自回归生成",
          "只输出自然语言计划，不输出低层动作",
          "使用独立 MPC 求解器完全替代神经网络",
          "把每个动作维度转换成图像像素"
        ],
        "answer": 0,
        "explain": "OpenVLA 将连续动作归一化、离散化并映射到词表 token，使动作预测可由 LLM 的自回归损失训练。"
      }
    },
    {
      "id": "pi0",
      "num": 32,
      "name": "π0",
      "fullName": "π0基础模型 (π0 Foundation Model)",
      "year": "2024",
      "org": "Physical Intelligence",
      "parent": "openvla",
      "paperUrl": "https://physicalintelligence.company/blog/pi0",
      "projectUrl": "",
      "category": "vla_model",
      "motivation": "跨具身形态泛化VLA基础模型",
      "summary": "π0 提出面向通用机器人控制的 VLA flow model，用 PaliGemma 视觉语言骨干和连续动作 flow matching 头，在跨机器人数据上学习可高频执行的动作 chunk。",
      "keyPoints": [
        "使用 PaliGemma/Gemma 系列 VLM 作为语义骨干，并添加独立 action expert 预测连续动作。",
        "训练数据混合自有 7 类机器人配置、68 个任务、数万小时级机器人交互以及 Open-X Embodiment 数据。",
        "不把动作离散为 token，而是用 conditional flow matching 建模连续动作 chunk，适合高频控制。",
        "输入包含图像、语言、机器人本体状态和带噪动作块，输出动作速度场 <span class=\"kb-math kb-math-inline\">v_\\theta</span>。",
        "推理时从高斯噪声出发，用少量 Euler/ODE 去噪步生成未来动作序列，然后逐步执行。",
        "相比 OpenVLA，π0 更偏向“VLM 语义 + diffusion/flow 动作专家”的连续控制架构。"
      ],
      "detail": "<p><img alt=\"π0 模型架构图\" src=\"https://arxiv.org/html/2410.24164v1/x1.png\" />\n<em>图：π0 在视觉语言骨干旁加入 action expert，通过 flow matching 生成连续动作 chunk。</em></p>\n<pre><code class=\"language-python\"># π0 flow matching 动作生成伪代码\ndef train_pi0(batch):\n    obs_tokens = vlm_encode(batch.images, batch.language)\n    state_tokens = state_encoder(batch.proprio)\n    clean_actions = batch.action_chunk                 # shape: H x action_dim\n    eps = normal_like(clean_actions)\n    tau = uniform(0, 1)\n    noisy = tau * clean_actions + (1 - tau) * eps\n    target_velocity = clean_actions - eps\n    pred_velocity = action_expert(obs_tokens, state_tokens, noisy, tau)\n    loss = mse(pred_velocity, target_velocity)\n    update(vlm_and_action_expert, loss)\n\ndef infer_pi0(images, language, proprio, steps=10):\n    obs_tokens = vlm_encode(images, language, cache=True)\n    actions = sample_gaussian_action_chunk()\n    for k in range(steps):\n        tau = k / steps\n        v = action_expert(obs_tokens, state_encoder(proprio), actions, tau)\n        actions = actions + v / steps\n    return actions[0]  # 或执行整个 chunk 的前缀\n</code></pre>\n<p>π0 针对 OpenVLA 式离散自回归动作的瓶颈做了结构性改变。机器人控制的动作空间天然是连续的，并且每秒可能需要几十次控制更新；若每个动作都拆成多个 token 自回归生成，延迟和量化误差都会成为问题。π0 因此用条件 flow matching 学习从噪声到动作 chunk 的连续变换，把动作生成写成一个速度场：</p>\n<div class=\"kb-math kb-math-display\">A^\\tau = \\tau A + (1-\\tau)\\epsilon,\\quad\nu^\\star = A-\\epsilon,\\quad\n\\mathcal{L}_{\\text{FM}} =\n\\mathbb{E}_{A,\\epsilon,\\tau}\\left[\\|v_\\theta(A^\\tau, \\tau, o, \\ell, q)-u^\\star\\|_2^2\\right].</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">A</span> 是真实未来动作块，<span class=\"kb-math kb-math-inline\">\\epsilon\\sim\\mathcal{N}(0,I)</span>，<span class=\"kb-math kb-math-inline\">q</span> 是机器人本体状态。模型学习的不是直接回归单步动作，而是在不同噪声强度下预测把 noisy action 推向真实动作的速度。</p>\n<p>架构上，π0 把 VLM 和 action expert 分工：VLM 负责图像/语言理解，action expert 负责短时连续控制。注意力结构通常让图像和语言 token 作为条件，状态 token 和动作 token 在动作专家里交互。这样可以保留基础 VLM 的语义泛化能力，又避免让语言模型词表承担连续控制细节。</p>\n<p>推理时，π0 从随机动作块 <span class=\"kb-math kb-math-inline\">A^0</span> 出发，执行 <span class=\"kb-math kb-math-inline\">K</span> 步数值积分：</p>\n<div class=\"kb-math kb-math-display\">A^{\\tau+\\Delta\\tau} = A^\\tau + \\Delta\\tau\\,\nv_\\theta(A^\\tau,\\tau,o,\\ell,q).</div>\n<p>得到动作 chunk 后，控制器可以执行第一个动作或采用 receding horizon 执行前几步，再用新观测重新生成。与传统 imitation learning 中单步 L2 回归相比，flow matching 可以表达多峰动作分布；与 diffusion policy 相比，它接入了更强的视觉语言骨干和跨具身预训练数据。</p>\n<div class=\"key-point\">💡 关键：π0 的“基础模型”意义在于把机器人控制从离散 token 生成推进到可高频执行的连续 action flow。</div>",
      "quiz": {
        "q": "π0 为什么使用 flow matching 生成动作？",
        "options": [
          "为了把连续动作 token 化后逐字生成",
          "为了学习从噪声到连续动作 chunk 的速度场，适配高频控制",
          "为了只输出高层自然语言子任务",
          "为了完全取消视觉语言骨干"
        ],
        "answer": 1,
        "explain": "π0 将动作块视为连续变量，通过 flow matching 从噪声积分到动作序列，减少离散自回归控制的延迟和量化问题。"
      }
    },
    {
      "id": "openvla-2",
      "num": 33,
      "name": "OpenVLA-2",
      "fullName": "开源VLA第二代 (Open VLA Second Generation)",
      "year": "2026",
      "org": "Stanford",
      "parent": "openvla",
      "paperUrl": "https://openvla.github.io/v2",
      "projectUrl": "",
      "category": "vla_model",
      "motivation": "200ms实时精确动作推理",
      "summary": "OpenVLA-2 条目的公开链接在撰写时未能定位到稳定论文页；本精读按其“第二代 OpenVLA、实时动作推理”的元信息，结合公开 OpenVLA-OFT 资料解读其关键方向：从离散自回归动作转向并行、连续、chunked 的高频控制。",
      "keyPoints": [
        "依据受限：<code>https://openvla.github.io/v2</code> 未找到稳定公开论文内容，因此以下方法细节以 OpenVLA-OFT 公开论文/项目页为主要依据。",
        "OpenVLA-OFT 提出 optimized fine-tuning recipe，在 OpenVLA 基础上系统比较动作解码、动作表示和训练目标。",
        "核心变化包括 parallel decoding、action chunking、continuous action representation 和 L1 regression objective。",
        "LIBERO 上平均成功率从 OpenVLA 基线的约 76.5% 提升到约 97.1%，动作生成吞吐可提升约 26x。",
        "面向 ALOHA 双臂高频控制，OFT+ 使用 FiLM 增强语言条件，并支持 25Hz 控制。",
        "与第一代 OpenVLA 相比，重点从“开源 VLA 可用”推进到“低延迟、连续动作、真实机器人高频可部署”。"
      ],
      "detail": "<p><img alt=\"OpenVLA-OFT 总览图\" src=\"https://openvla-oft.github.io/static/images/openvla_oft_figure_1.jpeg\" />\n<em>图：OpenVLA-OFT 展示了对 OpenVLA 的并行连续动作微调路线，可作为 OpenVLA-2 元信息中实时推理方向的公开依据。</em></p>\n<pre><code class=\"language-python\"># OpenVLA-2 / OpenVLA-OFT 风格优化微调伪代码\ndef train_oft(batch, base_openvla):\n    visual_tokens = base_openvla.encode_vision(batch.images)\n    text_tokens = tokenize(batch.instruction)\n    h = base_openvla.forward_context(text_tokens, visual_tokens)\n\n    # 不再逐 token 自回归输出离散动作，而是并行预测连续动作 chunk\n    pred_chunk = parallel_action_head(h, chunk_size=H)\n    target_chunk = normalize(batch.action_chunk)\n    loss = l1(pred_chunk, target_chunk)\n    update(base_openvla, loss)\n\ndef act_realtime(obs, instruction):\n    h = encode_context_once(obs.images, instruction)\n    action_chunk = parallel_action_head(h)\n    return denormalize(action_chunk[:control_horizon])\n</code></pre>\n<p>第一代 OpenVLA 的成功来自“动作即 token”的统一建模，但这也带来两个工程问题：动作需要逐维自回归解码，且离散 bin 对精细控制有量化损失。OpenVLA-OFT 的结论是，若目标是 200ms 量级的实时精确控制，应该把动作头从语言 token 解码中解耦出来，改为并行预测连续动作块。一个简化目标可写成：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{OFT}} =\n\\frac{1}{H}\\sum_{h=1}^{H}\n\\left\\|\\hat{a}_{t+h} - a_{t+h}\\right\\|_1,</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">H</span> 是 action chunk 长度。L1 损失对异常值相对稳健，也避免了离散 token cross-entropy 与连续控制误差之间的不匹配。</p>\n<p>parallel decoding 的意义在于延迟。自回归 OpenVLA 需要按动作维度和 token 顺序循环：</p>\n<div class=\"kb-math kb-math-display\">p(y_{1:m}\\mid o,\\ell)=\\prod_{i=1}^{m}p(y_i\\mid y_{&lt;i},o,\\ell),</div>\n<p>而连续并行头直接预测 <span class=\"kb-math kb-math-inline\">\\hat{A}_{t:t+H}</span>。当 <span class=\"kb-math kb-math-inline\">H</span> 增大时，chunking 不只减少模型调用频率，还让模型利用未来动作的短时相关性，例如双臂同步、抓取前预对齐和放置后的撤离。</p>\n<p>如果把该条目理解为 OpenVLA 的“第二代路线”，它与 π0 的差别在于优化重点不同：π0 从一开始就采用 flow matching 动作专家；OpenVLA-OFT 更像在已有 OpenVLA VLM 权重和训练生态上做最小侵入式改造，把动作输出层、微调损失和语言调制方式换成更适合控制的形式。这使它保留 OpenVLA 的开源可微调优势，同时显著改善吞吐和真实机器人部署可行性。</p>\n<div class=\"warn-box\">⚠️ 注意：本文件保留 YAML 原始 <code>paper_url</code>；由于该 URL 未提供可稳定访问的论文内容，方法细节以公开 OpenVLA-OFT 论文和项目页作为可核验依据。</div>",
      "quiz": {
        "q": "OpenVLA-OFT 相比原始 OpenVLA 的关键优化是什么？",
        "options": [
          "继续用离散动作 token，但减少训练数据",
          "用并行动作头预测连续 action chunk，降低自回归解码延迟",
          "完全删除视觉编码器，只保留语言模型",
          "把机器人控制改成只输出 PDDL 计划"
        ],
        "answer": 1,
        "explain": "OFT 的核心是并行、连续、chunked 的动作输出和 L1 微调目标，使 OpenVLA 更适合实时精确控制。"
      }
    },
    {
      "id": "pi0-7",
      "num": 34,
      "name": "π0.7",
      "fullName": "π0.7可操控模型 (π0.7 Steerable Model)",
      "year": "2026.04",
      "org": "Physical Intelligence",
      "parent": "pi0",
      "paperUrl": "https://physicalintelligence.company/blog/pi-0-7",
      "projectUrl": "",
      "category": "vla_model",
      "motivation": "可操控基础模型涌现泛化",
      "summary": "π0.7 在 π0 的 VLA-flow 基础上加入可操控上下文、视频历史编码、高层子目标和世界模型生成的目标图像，使机器人基础模型能按策略、约束和中间目标被“引导”而不只是执行一句指令。",
      "keyPoints": [
        "采用约 5B 规模 VLA：Gemma3/PaliGemma 风格 VLM backbone、视频历史编码器和约 860M action expert。",
        "训练时把语言、任务元数据、成功/失败轨迹、控制模式、策略提示和子目标图像作为可组合上下文。",
        "使用 prompt component dropout，使模型在缺失部分上下文时仍能推理，并在有更多上下文时可被精细 steer。",
        "保留 π0 的连续动作 flow matching 与 action chunk 机制，支持低延迟控制。",
        "引入高层 policy/coaching 生成子任务指令，并可用轻量世界模型异步生成 subgoal image。",
        "数据覆盖演示、次优自主数据、RL 后训练策略、人类视频和互联网多模态数据，强调从多样行为中学习可控泛化。"
      ],
      "detail": "<p><img alt=\"π0.7 架构图\" src=\"https://arxiv.org/html/2604.15483v1/x1.png\" />\n<em>图：π0.7 将 VLM、历史记忆、上下文提示、世界模型子目标和 action expert 组合成可操控 VLA。</em></p>\n<pre><code class=\"language-python\"># π0.7 可操控推理伪代码\ndef act_pi07(obs_history, task, metadata=None, strategy=None):\n    context = build_prompt(\n        language=task,\n        metadata=metadata,\n        strategy=strategy,\n        control_mode=current_control_mode(),\n    )\n    memory = video_history_encoder(obs_history)\n\n    if needs_decomposition(task):\n        subtask = high_level_policy(context, memory)\n        context.add(subtask)\n\n    if needs_visual_subgoal(task):\n        subgoal_image = world_model_generate_goal(obs_history[-1], context)\n        context.add_image(subgoal_image)\n\n    action_chunk = flow_action_expert(\n        images=obs_history[-1].images,\n        memory=memory,\n        prompt=context,\n        proprio=obs_history[-1].proprio,\n    )\n    return action_chunk\n</code></pre>\n<p>π0.7 的问题意识是：一个基础机器人模型即使会完成许多任务，也未必容易被用户或上层系统“操控”。例如同样是清理台面，用户可能希望“先处理易碎物”“避免碰到左侧区域”“失败后换一种抓法”。π0.7 因此把条件从单句语言扩展到多种 context component，并把策略风格、任务元信息和子目标图像纳入模型输入。可以把策略写成条件分布：</p>\n<div class=\"kb-math kb-math-display\">\\pi_\\theta(A_t \\mid o_{\\le t}, q_t, \\ell, c_1,\\ldots,c_m),</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">c_i</span> 可以是 metadata、strategy prompt、control mode、subgoal image 或历史视频记忆。</p>\n<p>动作层仍延续 π0 的 flow matching。对未来动作块 <span class=\"kb-math kb-math-inline\">A</span>、噪声 <span class=\"kb-math kb-math-inline\">\\epsilon</span> 和时间 <span class=\"kb-math kb-math-inline\">\\tau</span>，模型训练速度场：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{FM}} =\n\\mathbb{E}\\left[\n\\left\\|v_\\theta(A^\\tau,\\tau,o_{\\le t},q_t,\\ell,c)- (A-\\epsilon)\\right\\|_2^2\n\\right],\n\\quad\nA^\\tau=\\tau A+(1-\\tau)\\epsilon.</div>\n<p>也就是说，π0.7 的新意不在抛弃连续动作流，而是在条件端让模型知道“应该以什么方式完成任务”。</p>\n<p>训练上，prompt component dropout 很关键。若总是在完整上下文下训练，模型会过度依赖某个强提示；若总是只给语言，又学不到可控性。随机丢弃一部分上下文等价于优化多条件边缘分布：</p>\n<div class=\"kb-math kb-math-display\">\\mathbb{E}_{M\\sim p(M)}\n\\left[\\mathcal{L}\\big(\\theta; \\{c_i: M_i=1\\}\\big)\\right],</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">M</span> 是上下文掩码。这样模型在部署时可以从纯语言模式平滑升级到带策略、带历史、带目标图像的精细操控模式。</p>\n<p>与 π0 相比，π0.7 更像“可编排的机器人基础模型”：高层 policy 可以生成子任务，世界模型可以给出视觉子目标，action expert 再执行连续控制。与传统 hierarchical planner 相比，它没有把每层完全硬编码，而是让上下文条件进入同一个 VLA 分布，因此可在新任务、新场景和新具身上出现组合泛化。</p>\n<div class=\"warn-box\">⚠️ 注意：用户给出的博客 URL 在当前环境下未稳定打开；本精读依据公开 arXiv 论文内容整理，并保留 YAML 原始 <code>paper_url</code>。</div>",
      "quiz": {
        "q": "π0.7 相比 π0 的主要新增能力是什么？",
        "options": [
          "把连续动作改回离散 token 自回归生成",
          "通过多种上下文、策略提示和子目标图像实现可操控泛化",
          "取消图像输入，只使用机器人本体状态",
          "只面向单一机械臂，不再支持跨具身数据"
        ],
        "answer": 1,
        "explain": "π0.7 保留 flow 动作生成，但扩展了条件上下文和高层子目标机制，使同一基础模型可被更细粒度地 steer。"
      }
    },
    {
      "id": "gemini-robotics",
      "num": 35,
      "name": "Gemini Robotics-ER",
      "fullName": "Gemini机器人具身推理 (Gemini Robotics Embodied Reasoning)",
      "year": "2026",
      "org": "Google",
      "parent": "openvla",
      "paperUrl": "https://deepmind.google/technologies/gemini/robotics/",
      "projectUrl": "",
      "category": "vla_model",
      "motivation": "高层空间推理任务编排",
      "summary": "Gemini Robotics-ER 将 Gemini 的多模态推理扩展到机器人场景，重点承担空间理解、任务分解、工具/动作编排和执行验证，而不是像 OpenVLA 或 π0 那样直接作为低层连续控制策略。",
      "keyPoints": [
        "公开资料主要来自 Google DeepMind Gemini Robotics 页面、ER 1.6 博客和 Gemini API 文档，形态更接近产品/技术发布而非传统论文。",
        "Gemini Robotics-ER 强调 embodied reasoning：多视角场景理解、空间关系、物体属性、可达性和任务约束推理。",
        "API 侧提供 <code>gemini-robotics-er-1.6-preview</code> 等模型，用于机器人上层 reasoning、plan generation 和 verification。",
        "典型使用方式是 ER 模型输出结构化计划、空间断言或工具调用，再由低层控制器/VLA/技能库执行。",
        "相比端到端 VLA，优势在开放世界推理、跨任务编排和解释性；短板是仍需要可靠的底层执行闭环。",
        "适合作为导航/操作系统中的高层任务编排器，与 SLAM、抓取、运动规划和 VLA policy 组合。"
      ],
      "detail": "<p><img alt=\"Gemini Robotics-ER 官方示例图\" src=\"https://ai.google.dev/static/gemini-api/docs/images/robotics/point-to-object.png\" />\n<em>图：Gemini Robotics-ER 文档示例展示了模型在机器人桌面场景中输出物体点位和标签，用作下游控制器/VLA 的结构化输入。</em></p>\n<pre><code class=\"language-python\"># Gemini Robotics-ER 高层编排伪代码\ndef embodied_reasoning_loop(task, camera_views, robot_state, skill_api):\n    scene = gemini_er.analyze(\n        images=camera_views,\n        text=f&quot;Describe objects, spatial relations, constraints for: {task}&quot;,\n        state=robot_state,\n    )\n    plan = gemini_er.generate_plan(\n        task=task,\n        scene=scene,\n        available_skills=skill_api.schema(),\n        output_format=&quot;json&quot;,\n    )\n\n    for step in plan[&quot;steps&quot;]:\n        if not gemini_er.check_precondition(step, scene, robot_state):\n            plan = gemini_er.replan(task, scene, failed_step=step)\n            continue\n        result = skill_api.execute(step[&quot;skill&quot;], step[&quot;arguments&quot;])\n        scene = gemini_er.verify_and_update(camera_views, result, task)\n    return gemini_er.judge_success(scene, task)\n</code></pre>\n<p>Gemini Robotics-ER 的定位更像 embodied reasoning model。输入是多视角图像、语言任务、可能的机器人状态和工具/技能描述，输出不是连续关节命令，而是空间理解、计划步骤和验证判断。可将系统分解为：</p>\n<div class=\"kb-math kb-math-display\">z_t = f_\\theta(o_t^{1:V}, \\ell, q_t),\\quad\np_t = g_\\theta(z_t, \\mathcal{S}),\\quad\na_t = \\mathrm{SkillExec}(p_t),</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{S}</span> 是可用技能集合，<span class=\"kb-math kb-math-inline\">p_t</span> 是结构化计划或工具调用，低层动作 <span class=\"kb-math kb-math-inline\">a_t</span> 由外部控制器执行。这种分层方式适合“先理解再执行”的开放任务，例如读仪表、比较多个物体位置、选择合适工具或规划跨房间操作顺序。</p>\n<p>空间推理是它与普通 VLM 的主要差异。机器人需要知道的不只是图像 caption，而是可行动的几何/关系判断：物体是否可达、遮挡是否会影响抓取、按钮是否在机械臂工作空间内、下一步是否会违反安全约束。可抽象为在场景图上推理：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{G}_t=(\\mathcal{V},\\mathcal{E}),\\quad\n\\mathcal{E}_{ij}=\\{\\text{left-of},\\text{inside},\\text{supporting},\\text{reachable}\\}.</div>\n<p>ER 模型根据多模态输入估计这些关系，并把它们转化为 plan precondition 和 postcondition。</p>\n<p>与 OpenVLA/π0 的端到端动作模型相比，Gemini Robotics-ER 的优势是高层泛化和可解释性：输出可以是 JSON plan、自然语言理由或工具调用，便于安全审计和人机协作。劣势是控制闭环依赖外部模块，如果 grasp skill、navigation stack 或 VLA policy 失败，ER 本身只能重新推理而不能保证低层轨迹可行。因此更合理的系统设计是把它放在 planner/verifier 层，而不是替代运动控制器。</p>\n<div class=\"warn-box\">⚠️ 注意：该条目公开来源不是单篇论文；本精读基于 Google DeepMind 官方 Gemini Robotics/ER 1.6 页面和 Gemini API 文档整理，保留 YAML 原始 <code>paper_url</code>。</div>",
      "quiz": {
        "q": "Gemini Robotics-ER 在机器人系统中最适合承担哪一层职责？",
        "options": [
          "直接以 1kHz 频率输出电机电流",
          "高层空间推理、任务分解、工具调用和执行验证",
          "只做图像压缩，不参与规划",
          "替代所有底层运动规划和控制模块"
        ],
        "answer": 1,
        "explain": "Gemini Robotics-ER 的公开定位是 embodied reasoning，更适合作为高层编排器，与底层技能或 VLA 控制器配合。"
      }
    },
    {
      "id": "pokevla",
      "num": 36,
      "name": "PokeVLA",
      "fullName": "轻量几何对齐VLA (Lightweight Geometry-Aligned VLA)",
      "year": "2026",
      "org": "arXiv",
      "parent": "openvla",
      "paperUrl": "https://arxiv.org/abs/2603.pokevla",
      "projectUrl": "",
      "category": "vla_model",
      "motivation": "1.22B轻量SEG几何对齐VLA",
      "summary": "PokeVLA 提出 1.22B 轻量 VLA，通过目标感知语义分割、多视角几何对齐和动作专家，把小模型做成更适合真实机器人部署的几何感知控制策略。",
      "keyPoints": [
        "YAML 中 <code>https://arxiv.org/abs/2603.pokevla</code> 疑似占位符；可访问公开论文为 arXiv:2604.20834，项目页为 <code>https://getterupper.github.io/PokeVLA</code>。",
        "模型规模约 1.22B，目标是 pocket-sized VLA，在资源受限硬件上减少推理成本。",
        "第一阶段预训练 PokeVLM，使用约 2.4M 多模态 embodied 样本学习空间 grounding、affordance 和 embodied reasoning。",
        "第二阶段 VL-action post-training 加入目标感知多视角语义学习、几何对齐模块和 action query/action expert。",
        "视觉编码结合 SigLIP、DINOv2、SAM-like dense features，并通过 VGGT 等几何基础模型对齐 wrist/base 多视角。",
        "在 LIBERO-Plus、跨任务迁移和真实 xArm7 双 RealSense 场景中展示优于 OpenVLA-OFT/VLA-Adapter 的泛化表现。"
      ],
      "detail": "<p><img alt=\"PokeVLA 架构图\" src=\"https://getterupper.github.io/PokeVLA/static/images/main.png\" />\n<em>图：PokeVLA 将紧凑 VLM、SEG token、多视角几何对齐和动作查询结合，形成轻量 VLA 控制器。</em></p>\n<pre><code class=\"language-python\"># PokeVLA 两阶段训练与推理伪代码\ndef pretrain_pokevlm(batch):\n    image_feat = siglip_dinov2_encoder(batch.images)\n    text_feat = language_encoder(batch.text)\n    seg_token = predict_seg_token(image_feat, text_feat)\n    loss = vlm_loss(image_feat, text_feat) + grounding_loss(seg_token, batch.masks)\n    update(pokevlm, loss)\n\ndef posttrain_action(batch):\n    base_feat = pokevlm.encode(batch.multi_view_images, batch.instruction)\n    geom_feat = geometry_align(base_feat, batch.camera_params)  # wrist/base 多视角对齐\n    seg_feat = goal_aware_segmentation(base_feat, batch.goal)\n    action_queries = init_action_queries(horizon=H)\n    pred_actions = action_expert(action_queries, geom_feat, seg_feat, batch.proprio)\n    loss = action_loss(pred_actions, batch.action_chunk)\n    update(pokevla, loss)\n</code></pre>\n<p>PokeVLA 的动机是对 OpenVLA 系列做“轻量化但不弱化几何”。大模型 VLA 有较强语义能力，但推理成本高；小模型若只压缩参数，又容易丢失抓取/放置所需的空间细节。PokeVLA 因此把问题拆成两个阶段：先训练紧凑 PokeVLM 保留 embodied 语义，再在动作阶段显式加入 segmentation 和 geometry alignment。</p>\n<p>其目标感知分割机制可以理解为让语言目标 <span class=\"kb-math kb-math-inline\">\\ell</span> 选择图像中的可操作区域。若视觉特征为 <span class=\"kb-math kb-math-inline\">F</span>，目标 token 为 <span class=\"kb-math kb-math-inline\">h_\\ell</span>，则 SEG token 产生 mask：</p>\n<div class=\"kb-math kb-math-display\">M = \\sigma(\\phi_{\\text{seg}}(F, h_\\ell)),</div>\n<p>动作头不只看全局图像 token，还看 <span class=\"kb-math kb-math-inline\">M</span> 指向的物体/区域。这对“拿红色杯子而不是蓝色杯子”“按右侧按钮”等目标歧义任务尤其重要。</p>\n<p>多视角几何对齐解决的是 wrist camera 与 base camera 的坐标不一致问题。PokeVLA 借助几何基础模型估计跨视角的空间对应，将不同相机特征投到更一致的几何空间：</p>\n<div class=\"kb-math kb-math-display\">\\tilde{F}^{v} = \\mathrm{Align}(F^{v}, \\Pi^{v}, D^{v}),\\quad\nF_{\\text{geo}}=\\mathrm{Fuse}_{v=1}^{V}(\\tilde{F}^{v}),</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\Pi^v</span> 表示相机投影/位姿信息，<span class=\"kb-math kb-math-inline\">D^v</span> 是深度或几何先验。这样 action expert 看到的是跨视角一致的操作目标，而不是互相割裂的 2D patch。</p>\n<p>与 OpenVLA-OFT 相比，PokeVLA 不只是换动作头或损失，而是在轻量模型里显式补上“看哪里”和“空间如何对齐”。与纯 diffusion/flow action model 相比，它更强调视觉 grounding 和几何结构先验。论文结果显示，这种设计在模型规模较小的情况下仍能保持较强的 LIBERO-Plus 与真实机器人迁移能力。</p>\n<div class=\"warn-box\">⚠️ 注意：原 YAML <code>paper_url</code> 疑似占位符；本精读依据可访问的 arXiv:2604.20834 与项目页整理，YAML 中保留原始链接以满足清单一致性。</div>",
      "quiz": {
        "q": "PokeVLA 在轻量化之外最强调的技术设计是什么？",
        "options": [
          "完全删除视觉模块，只保留语言提示",
          "目标感知语义分割和多视角几何对齐",
          "用 PDDL 规划器替代所有动作学习",
          "只在单摄像头、单任务环境中训练"
        ],
        "answer": 1,
        "explain": "PokeVLA 通过 SEG token 和几何对齐模块弥补小模型空间感知能力，使动作专家更可靠地定位目标和融合多视角。"
      }
    },
    {
      "id": "vla-an",
      "num": 37,
      "name": "VLA-AN",
      "fullName": "无人机导航VLA (VLA for Aerial Navigation)",
      "year": "2026",
      "org": "arXiv",
      "parent": "openvla",
      "paperUrl": "https://arxiv.org/abs/2604.vla-an",
      "projectUrl": "",
      "category": "vla_model",
      "motivation": "无人机专用98.1%成功率VLA",
      "summary": "VLA-AN 的核心目标是：无人机专用98.1%成功率VLA。",
      "keyPoints": [
        "核心动机：无人机专用98.1%成功率VLA",
        "演化来源：继承或改进自 openvla",
        "代表机构：arXiv"
      ],
      "detail": "<h3>系统总览</h3>\n<div class=\"img-wrap\"><img src=\"https://ar5iv.labs.arxiv.org/html/2512.15258/assets/x1.png\" alt=\"VLA-AN Overview\" loading=\"lazy\"><p class=\"img-caption\">▲ VLA-AN Overview</p></div>\n<p><em>图 1：VLA-AN 整体框架——从 3D-GS 数据集构建、三阶段训练到边端部署的完整流水线。</em></p>\n<hr />\n<h3>1. 模型架构</h3>\n<div class=\"img-wrap\"><img src=\"https://ar5iv.labs.arxiv.org/html/2512.15258/assets/x2.png\" alt=\"Model Architecture\" loading=\"lazy\"><p class=\"img-caption\">▲ Model Architecture</p></div>\n<p><em>图 2：VLA-AN 模型架构由四个核心组件构成：ViT 视觉编码器、MLP 投影器、LLM 语言模型和鲁棒动作模块。</em></p>\n<p>VLA-AN 将无人机导航建模为条件策略 <span class=\"kb-math kb-math-inline\">\\pi_{\\text{VLA-AN}}</span>，输入为自然语言指令 <span class=\"kb-math kb-math-inline\">L</span> 和当前观测 <span class=\"kb-math kb-math-inline\">O_t = \\{I^{rgb}_t, I^{depth}_t, p_t\\}</span>（其中 <span class=\"kb-math kb-math-inline\">p_t = (x, y, z, \\psi)</span> 为无人机 4D 位姿），输出为未来动作序列 <span class=\"kb-math kb-math-inline\">a_{1:T}</span>：</p>\n<div class=\"kb-math kb-math-display\">a_t = \\pi_{\\text{VLA-AN}}(L, I^{rgb}_t, I^{depth}_t)</div>\n<p><strong>关键设计决策</strong>：模型不直接预测低层电机指令，而是输出<strong>目标 3D 路点 + 期望偏航角</strong>。这一抽象层使得模型可以从异构机器人数据集（不同构型无人机、甚至人形/四足机器人）中学习导航知识，大幅提升数据利用效率，同时为下游安全约束留出接口。</p>\n<p>为维持任务一致性，系统引入时序比较模块评估任务完成状态：</p>\n<div class=\"kb-math kb-math-display\">s_t = f_{\\text{cmp}}(I^{rgb}_0, I^{rgb}_t, L), \\quad s_t \\in \\{0, 1\\}</div>\n<p>整体系统以状态机形式运行：<span class=\"kb-math kb-math-inline\">\\mathcal{S} = \\{\\text{IDLE}, \\text{NAVIGATING}, \\text{REPLANNING}, \\text{TASK\\_COMPLETE}\\}</span>，实现闭环自主协调。</p>\n<hr />\n<h3>2. 高保真混合数据集构建</h3>\n<p>传统仿真数据（mesh 渲染）与真实世界存在显著视觉域差距。VLA-AN 提出基于 <strong>3D 高斯泼溅（3D-GS）</strong> 的自动化数据生成管线：</p>\n<p><strong>阶段 I — 3D-GS 场景重建</strong>：采集覆盖室内（办公室、走廊）和室外（公园、街道）的视频流，转换为高质量 3D-GS 场景表示后导入 Unity。3D-GS 保留真实光照变化和连续几何细节，渲染效率高且逼真度远超传统 mesh。</p>\n<p><strong>阶段 II — 自动化轨迹生成与多模态数据采集</strong>：\n- <strong>任务定义与随机化</strong>：专家定义子任务元数据（语言指令、起终点），在合理范围内随机采样坐标增强多样性\n- <strong>运动学规划</strong>：基于梯度的轨迹规划器在复杂 3D 环境中生成参考轨迹，支持全体积空间（含 Z 轴）的无碰撞规划\n- <strong>多视角同步采集</strong>：无人机沿规划轨迹自主飞行，以 10 Hz 同步记录四视角（前/后/左/右）RGB 图像、深度图和 4D 位姿</p>\n<p><strong>阶段 III — 混合数据集</strong>：按比例混合三类数据：\n- <strong>3D-GS 数据</strong>：高视觉保真度，弥合 sim-to-real 域差距\n- <strong>Mesh 数据</strong>：高可编辑性，灵活调整光照/遮挡/目标物体，利用开源 mesh 数据集扩展视角覆盖\n- <strong>真实数据</strong>：直接来自真实世界的导航数据</p>\n<p>消融实验（表 2）显示：仅用 3D-GS 数据训练的模型在未见数据集上的表现与仅用真实数据训练的模型相当（物体导航 SR 95.8% vs 96.3%），而仅用 mesh 数据则显著退化（70.3%）。混合数据集达到最优（97.6%）。</p>\n<hr />\n<h3>3. 三阶段渐进式训练</h3>\n<pre><code>┌─────────────────────────────────────────────────────────┐\n│  Stage I: Grounding-Reasoning SFT (全参数微调)            │\n│  ├─ 数据: VQA + 空间定位 + 推理 + STEM + 多帧多视角      │\n│  ├─ 目标: 视觉理解 + 逻辑推理 + 空间关系建模              │\n│  └─ 能力: 自然语言理解、物理交互、空间布局解析             │\n├─────────────────────────────────────────────────────────┤\n│  Stage II: Navigation-Specific SFT                       │\n│  ├─ 数据: UAV导航数据 + 按比例混合VQA推理数据              │\n│  ├─ 目标: 3D路点规划 + 偏航预测 + 动态任务重规划           │\n│  └─ 能力: 保持Stage I推理能力 + 适应导航结构化知识         │\n├─────────────────────────────────────────────────────────┤\n│  Stage III: GRPO-based RFT (强化微调)                     │\n│  ├─ 策略: 每条指令采样多个响应, 组内归一化计算优势估计      │\n│  ├─ 奖励: 视觉推理(严格答案匹配) + 空间任务(IoU评估)      │\n│  └─ 目标: 纠正失败模式, 提升决策一致性和输出合规性         │\n└─────────────────────────────────────────────────────────┘\n</code></pre>\n<p>消融实验（表 3）关键发现：\n- Stage I 显著提升场景推理（87.2%）和空间定位（94.5%）\n- Stage II 单独使用在物体导航（95.3%）和长程导航（74.9%）上表现最佳\n- OpenVLA 和 π₀ 在任务微调时出现<strong>灾难性遗忘</strong>，丧失视觉-语言理解能力\n- 三阶段完整训练达到全面最优：场景推理 85.5%、空间定位 94.6%、物体导航 98.1%、长程导航 85.7%</p>\n<hr />\n<h3>4. 鲁棒动作模块（几何安全校正）</h3>\n<p>现有 VLA 模型（如 π₀ 使用 0.3B flow-matching action expert）依赖生成模型产生动作序列，推理噪声和偏差可能在狭窄环境中导致碰撞，对结构脆弱的无人机构成严重风险。</p>\n<p>VLA-AN 的动作模块工作流程：</p>\n<pre><code>输入: LLM输出的目标路点 + 当前深度图\n  │\n  ▼\n构建参考轨迹: 当前状态 → 目标状态\n  │\n  ▼\n碰撞检测: 轨迹是否与障碍物相交?\n  │\n  ├─ 否 → 直接执行轨迹\n  │\n  └─ 是 → 提取局部几何线索\n           │\n           ▼\n         将障碍物信息转换为表面锚点 + 斥力方向\n           │\n           ▼\n         生成可微分斥力梯度力, 即时调整轨迹\n           │\n           ▼\n         重新估计时间分配, 在安全约束下重构轨迹\n           │\n           ▼\n         输出无碰撞的控制动作\n</code></pre>\n<p><strong>伪代码</strong>：</p>\n<pre><code class=\"language-python\">def robust_action_module(waypoints, depth_map, current_state):\n    &quot;&quot;&quot;\n    VLA-AN 鲁棒动作模块\n    Args:\n        waypoints: LLM预测的3D目标路点序列 [(x,y,z,ψ), ...]\n        depth_map: 当前深度图 I_depth\n        current_state: 无人机当前4D位姿 (x,y,z,ψ)\n    Returns:\n        safe_trajectory: 无碰撞的可执行轨迹\n    &quot;&quot;&quot;\n    # Step 1: 构建参考轨迹\n    ref_trajectory = construct_trajectory(current_state, waypoints)\n\n    # Step 2: 从深度图提取局部障碍物信息\n    obstacle_points = extract_obstacles(depth_map)\n\n    # Step 3: 碰撞检测\n    intersections = detect_intersections(ref_trajectory, obstacle_points)\n\n    if not intersections:\n        return ref_trajectory  # 无碰撞, 直接执行\n\n    # Step 4: 几何安全校正\n    for collision_point in intersections:\n        # 将障碍物转换为表面锚点和斥力方向\n        anchor, repulsive_dir = compute_surface_anchor(\n            collision_point, obstacle_points\n        )\n        # 生成可微分斥力梯度力\n        repulsive_force = compute_repulsive_gradient(\n            ref_trajectory, anchor, repulsive_dir\n        )\n        # 即时调整轨迹\n        ref_trajectory = apply_gradient_correction(\n            ref_trajectory, repulsive_force\n        )\n\n    # Step 5: 重新估计时间分配, 保证动力学可行性\n    safe_trajectory = retiming_with_safety_constraints(ref_trajectory)\n\n    return safe_trajectory\n</code></pre>\n<p>该模块的核心优势在于：<strong>仅在检测到潜在碰撞时才从深度图提取障碍物信息</strong>，计算高效且响应迅速，消除了大型生成模型（如 π₀ 的 0.3B flow-matching expert）带来的推理延迟瓶颈。</p>\n<hr />\n<h3>5. 边端部署优化</h3>\n<div class=\"img-wrap\"><img src=\"https://ar5iv.labs.arxiv.org/html/2512.15258/assets/x7.png\" alt=\"Inference Optimization\" loading=\"lazy\"><p class=\"img-caption\">▲ Inference Optimization</p></div>\n<p><em>图 7：边端推理优化消融实验——各优化技术对推理时间的贡献。</em></p>\n<p>部署平台为 <strong>NVIDIA Jetson Orin NX 16GB</strong>（~100 TOPS，30W 功耗模式），集成后总增重仅约 <strong>80g</strong>。</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>优化策略</th>\n<th>效果</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Flash-Attention</td>\n<td>大幅降低注意力计算延迟</td>\n</tr>\n<tr>\n<td>FFN-RMSNorm 算子融合</td>\n<td>消除冗余算子执行</td>\n</tr>\n<tr>\n<td>KV-cache 预加载</td>\n<td>减少重复计算</td>\n</tr>\n<tr>\n<td>CUDA Graph 调度</td>\n<td>管理进程级并行，减少调度开销</td>\n</tr>\n<tr>\n<td>ViT 专项优化（SIMD 指令集 + 算子重排 + 内存访问优化）</td>\n<td>ViT 延迟从 2350ms 降至 120ms</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>总体推理加速</strong>：4100ms → 494ms（<strong>8.3× 加速，87.9% 延迟降低</strong>）。</p>\n<p>不同模型规模的解码速度（30W 模式）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>FLOPs</th>\n<th>解码速度 (s/token)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>7B-AWQ</td>\n<td>~1815.8 GFLOPs</td>\n<td>0.110</td>\n</tr>\n<tr>\n<td>3B-AWQ</td>\n<td>~946.7 GFLOPs</td>\n<td>0.051</td>\n</tr>\n<tr>\n<td>2B-AWQ</td>\n<td>~563.3 GFLOPs</td>\n<td>0.032</td>\n</tr>\n</tbody>\n</table></div>\n<p>闭环导航中采用<strong>异步图像传输 + 连续动作执行</strong>策略，实现 2-3 Hz 实时动作推理频率。</p>\n<hr />\n<h3>6. 实验结果</h3>\n<div class=\"img-wrap\"><img src=\"https://ar5iv.labs.arxiv.org/html/2512.15258/assets/x3.png\" alt=\"Benchmark Results\" loading=\"lazy\"><p class=\"img-caption\">▲ Benchmark Results</p></div>\n<p><em>图 3：VLA-AN 与 OpenVLA、π₀、Groot N1.5 在 8 类导航任务上的基准对比。</em></p>\n<div class=\"img-wrap\"><img src=\"https://ar5iv.labs.arxiv.org/html/2512.15258/assets/x6.png\" alt=\"Real-world Experiments\" loading=\"lazy\"><p class=\"img-caption\">▲ Real-world Experiments</p></div>\n<p><em>图 6：真实世界实验——包括物体导航、空间定位、场景推理、目标搜索和目标跟踪。</em></p>\n<p><strong>关键实验发现</strong>：</p>\n<ol>\n<li><strong>跨任务泛化</strong>：VLA-AN 在所有 8 类任务上均超越基线，物体导航平均 SR 超 98%</li>\n<li><strong>目标跟踪涌现能力</strong>：尽管跟踪样本仅占训练集 &lt;1%，模型仍达到 82.0% SR——源于导航训练隐式促进了任务重规划能力</li>\n<li><strong>真实世界部署</strong>：在两个不同 UAV 平台上验证，成功率与仿真相当；支持长程多步指令分解（如\"左转90度，然后右转朝向黄色柜子，最后找到时钟图标\"）</li>\n<li><strong>安全性优势</strong>：在狭窄走廊、密集森林等精确导航场景中，OpenVLA/π₀/Groot N1.5 频繁产生不安全运动导致失败，VLA-AN 的几何安全校正模块有效避免碰撞</li>\n</ol>"
    },
    {
      "id": "groot-n1",
      "num": 38,
      "name": "GR00T N1.6",
      "fullName": "NVIDIA通用机器人基础模型 (NVIDIA General Robot Foundation Model)",
      "year": "2026",
      "org": "NVIDIA",
      "parent": "pi0",
      "paperUrl": "https://developer.nvidia.com/project-groot",
      "projectUrl": "",
      "category": "vla_model",
      "motivation": "双系统规划+扩散动作架构",
      "summary": "GR00T N1.6 是 NVIDIA 面向通用人形/跨具身操作的开源 VLA 模型，把视觉语言基础模型与 diffusion/flow matching Transformer 动作头组合起来，用真实、合成和仿真数据训练可后训练适配的机器人基础策略。",
      "keyPoints": [
        "公开模型卡显示 GR00T N1.6-3B 是跨具身 VLA，输入语言、多视角图像和机器人本体状态，输出连续动作向量。",
        "架构由视觉/文本 Transformer 编码器和 flow matching DiT 动作头组成，动作头在本体状态与带噪动作上做 self-attention，并 cross-attend 到视觉语言特征。",
        "N1 系列论文提出双系统设计：System 2 VLM 负责语义理解，System 1 diffusion transformer 负责高频闭环动作生成。",
        "N1.6 使用 SigLIP2 视觉编码、T5 文本编码、按 embodiment ID 索引的 MLP state/action projector，并支持变数量相机视角。",
        "训练数据包含双臂、半人形、人形真实数据，以及 NVIDIA Isaac GR00T Blueprint 生成的合成/仿真数据。",
        "N1.6 模型卡说明其在连接器上有性能改进，并联合 flow matching 与 world-modeling 目标训练。"
      ],
      "detail": "<p><img alt=\"GR00T N1.6 模型架构图\" src=\"https://raw.githubusercontent.com/NVIDIA/Isaac-GR00T/main/media/model-architecture.png\" />\n<em>图：GR00T N1.6 使用视觉/文本编码器、embodiment-specific MLP 和 flow matching DiT 动作头生成连续控制。</em></p>\n<pre><code class=\"language-python\"># GR00T N1.6 flow matching VLA 伪代码\ndef train_groot_n16(batch):\n    image_tokens = siglip2_encoder(batch.camera_frames)      # 可变多视角拼接\n    text_tokens = t5_encoder(batch.instruction)\n    vl_tokens = concat(image_tokens, text_tokens)\n\n    q = state_mlp[batch.embodiment_id](pad(batch.proprio))\n    clean_actions = batch.action_chunk\n    eps = normal_like(clean_actions)\n    tau = uniform(0, 1)\n    noisy_actions = tau * clean_actions + (1 - tau) * eps\n\n    velocity = dit_action_head(\n        noisy_actions=noisy_actions,\n        proprio=q,\n        diffusion_step=tau,\n        context=vl_tokens,\n        embodiment=batch.embodiment_id,\n    )\n    loss_fm = mse(velocity, clean_actions - eps)\n    loss_wm = world_modeling_loss(batch)  # N1.6 模型卡提到的联合目标\n    update(model, loss_fm + lambda_wm * loss_wm)\n\ndef act_groot_n16(obs, instruction, embodiment_id, steps=K):\n    context = encode_vision_language(obs.frames, instruction)\n    actions = sample_gaussian_chunk()\n    for k in range(steps):\n        tau = k / steps\n        v = dit_action_head(actions, obs.proprio, tau, context, embodiment_id)\n        actions = actions + v / steps\n    return actions\n</code></pre>\n<p>GR00T N1 系列的核心思想是双系统 VLA：视觉语言模块承担 System 2 式语义理解，动作生成模块承担 System 1 式快速控制。N1.6 模型卡进一步明确了工程实现：RGB 相机帧经 SigLIP2 视觉 Transformer 编码，文本由 T5 编码；多视角图像 token 与语言 token 拼成上下文序列；机器人本体状态先按 embodiment ID 选择对应 MLP 投影，再进入动作头。</p>\n<p>动作头是 flow matching / diffusion transformer。训练时将真实动作块 <span class=\"kb-math kb-math-inline\">A_t</span> 与高斯噪声 <span class=\"kb-math kb-math-inline\">\\epsilon</span> 插值：</p>\n<div class=\"kb-math kb-math-display\">A_t^\\tau = \\tau A_t + (1-\\tau)\\epsilon,\\quad\n\\mathcal{L}_{\\text{FM}} =\n\\left\\|v_\\theta(A_t^\\tau,\\tau,q_t,\\phi_t,e)- (A_t-\\epsilon)\\right\\|_2^2,</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">q_t</span> 是本体状态，<span class=\"kb-math kb-math-inline\">\\phi_t</span> 是视觉语言 token，<span class=\"kb-math kb-math-inline\">e</span> 是具身 ID。推理时从噪声动作块开始，用 Euler 积分逐步还原连续动作。这与 π0 的动作流思想相近，但 GR00T N1.6 更强调人形/跨具身工程适配、可变多视角输入和 NVIDIA Isaac 数据生成生态。</p>\n<p>跨具身支持依赖 embodiment-specific projector。不同机器人自由度、状态维度和动作维度不同，N1.6 通过 padding 到统一最大长度，再用按 embodiment 索引的 MLP 编码状态和解码动作。形式上可以写作：</p>\n<div class=\"kb-math kb-math-display\">q_t = E_{e}(s_t),\\quad\n\\hat{A}_t = D_{e}(h_t),</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">E_e,D_e</span> 是第 <span class=\"kb-math kb-math-inline\">e</span> 个具身的状态/动作投影器。这样主干 DiT 可以共享跨机器人技能，而输入输出适配由小模块处理。</p>\n<p>数据侧，GR00T N1 论文提出“数据金字塔”：底部是大规模网络/人类视频，中间是合成与仿真轨迹，顶部是真实机器人演示。对无动作视频，系统可用 latent action 或 inverse dynamics 产生伪动作标签；对真实和仿真机器人轨迹，则使用真实动作或 IDM 标签训练。N1.6 模型卡还指出其训练混合包含真实采集数据和 Isaac GR00T Blueprint 生成的合成数据，并联合 world-modeling 目标，这说明它不只拟合动作，还在学习更稳定的动态/时序表示。</p>\n<p>与 OpenVLA 相比，GR00T N1.6 不把动作当语言 token 自回归生成，而是输出连续动作块；与 π0 相比，它更突出人形机器人和多具身部署栈，包括模型卡、Isaac GR00T 仓库、仿真数据和后训练适配流程。该条目特别需要注意路径：本文件写入 <code>groot-n1_detail.md</code>，未编辑历史错误路径 <code>groot-n1.md</code>。</p>",
      "quiz": {
        "q": "GR00T N1.6 的动作生成头主要采用什么机制？",
        "options": [
          "离散动作 token 的自回归语言建模",
          "flow matching / diffusion Transformer 对连续动作块去噪",
          "只输出自然语言计划，由人类执行",
          "固定查表控制，不使用神经网络"
        ],
        "answer": 1,
        "explain": "N1.6 模型卡明确描述了 diffusion transformer head，它通过 flow matching 从噪声动作迭代生成连续动作。"
      }
    }
  ],
  "categories": {
    "visual_navigation": {
      "label": "视觉导航",
      "color": "#3B82F6"
    },
    "slam": {
      "label": "同时定位与建图",
      "color": "#10B981"
    },
    "object_navigation": {
      "label": "目标导向导航",
      "color": "#F59E0B"
    },
    "task_planning": {
      "label": "长程任务规划",
      "color": "#8B5CF6"
    },
    "vla_model": {
      "label": "VLA基础模型",
      "color": "#EF4444"
    }
  },
  "projectUrls": {}
};
