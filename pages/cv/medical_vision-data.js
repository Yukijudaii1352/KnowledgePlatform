/**
 * medical_vision-data.js — 由 pipeline/build.py 于 2026-06-16 17:00:10 自动生成。
 * 源文件：content/cv/medical_vision.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "cv",
    "topic_id": "medical_vision",
    "topic_name": "医学影像算法演进",
    "page_title": "医学影像算法演进",
    "page_subtitle": "2026-06-16 版",
    "page_desc": "从U-Net到SAM 2，梳理医学分割、CT/MRI分析、病理识别与诊断辅助的技术发展脉络，涵盖经典架构到2026年Mamba与视觉语言模型的最新进展",
    "page_icon": "🏥",
    "hero_pills": [
      "🏷️ Medical AI · Segmentation · CT/MRI · Pathology · Diagnostic"
    ],
    "count_pill": "{count} 个算法",
    "image_base": "",
    "overview_from_doc": true,
    "latest_overview_from_doc": true
  },
  "overview": [
    {
      "title": "",
      "body_html": "<h1>[CV - Medical 3D Image Analysis - 2021] 医学3D计算机视觉（上）</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/575605789\">https://zhuanlan.zhihu.com/p/575605789</a></li>\n<li>作者: Pascal算法摆渡人</li>\n</ul>\n<hr />\n<p>[CV - Medical 3D Image Analysis - 2021] 医学3D计算机视觉（上）</p>\n<h1>[CV - Medical 3D Image Analysis - 2021] 医学3D计算机视觉（上）</h1>\n<p>作者: Pascal算法摆渡人, 赞: 11</p>\n<p>Hi，大家好！我是Pascal_M。</p>\n<p>主要分享 CV 的过往<strong>历史</strong>中经典模型文献和<strong>现在</strong>正在创造的新模型文献，当然过往与现在对比阅读会发现新的体会和不一样的认识角度。</p>\n<p>希望大家以一种轻松心态来看过往的模型，一定是不尽人如意。但文献中提出宝贵想法是我们再次阅读动力，也是我们看到解决问题过程中出现的困难和不确定性。</p>\n<hr />\n<p>今天主要看的是2021年发布的，关于医学3D计算机视觉综述文献（中文）</p>\n<p>标题：医学3D计算机视觉：研究进展和挑战</p>\n<p>时间：2020</p>\n<h2>1 医学3D数据模态及数据库</h2>\n<p>在医学诊断影像中，CT和MRI可以说是医学3D成像中两种最常见的影像模态。</p>\n<p>CT是利用X射线多次扫描(如螺旋扫描)后利用计算机重建算法构成立体成像，常见部位包括胸部CT，腹部CT和脑部CT等。使用显影剂可以拍摄增强CT，对于一些医学诊断更加有利。目前一些部位可以使用低剂量(low-dose)CT来获得足够好的成像，可以大幅降低病人的辐射暴露风险，因此肺癌早期筛查的推荐方式是低剂量CT (The National Lung Screening Trial Research Team，2011)。</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-99ed153bb155f5d36395d1d903fd527c_1440w.jpg\" /></p>\n<p>MRI通过射频脉冲激发人体内氢质子采集k-space原始数据，并通过计算方法复原出人眼可以理解的3D图像。直观地说，MRI不使用放射线，因此对人体的损伤较小，但通常需要较长的成像时间。MRI常用于软组织成像，如脑部、膝部等。另外，基于磁共振成像可以开发多种功能性磁共振成像(functional MRI)用来观测脑部活动。</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-35023d81b9bc68898913cd740beb87e9_1440w.jpg\" /></p>\n<p>基于CT和MRI，都可以配合正电子放射断层成像(positron emission tomography，PET)(Petersen等，2010)，开发出PET-CT和PET-MRI等技术，以观测全身代谢，是用来肿瘤诊断(如肿瘤转移)的一种常用成像手段。</p>\n<p>上述成像方法形成的原始医学3D数据是基于体素的，符合卷积的归纳偏置先验，因此常常使用卷积神经网络(convolutional neural network, CNN)来分析。</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>数据库</th>\n<th>数据模态</th>\n<th>主要任务</th>\n<th>数据量</th>\n<th>数据库描述</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>LIDC-IDRI(the lung image database consortium image collection)(Armato III等，2011)</td>\n<td>CT</td>\n<td>分类分割检测</td>\n<td>1018套标注数据</td>\n<td>大规模肺结节数据集，包含4位医生对胸部CT的疑似病灶标注，每套CT包含1~23个结节标注，包括病灶检测、病灶3D分割、良恶性判断、征象(如毛刺、钙化等)。</td>\n</tr>\n<tr>\n<td>BraTS (Menze等，2015)</td>\n<td>MRI</td>\n<td>分割</td>\n<td>274套标注数据110套测试数据</td>\n<td>BraTS 2012-2019挑战赛，系列脑组织脑肿瘤分割数据集，其中使用较广泛的是BraTS 2015数据集。每个病例包含FLAIR，T1，T2和T1C这4个模态，以及对应的脑组织和脑部病灶(包括肿瘤)分割。江宗康等人(2020)提供了BraTS数据集及MRI脑肿瘤图像分割的研究综述。</td>\n</tr>\n<tr>\n<td>LUNA16 (Setio等，2017)</td>\n<td>CT</td>\n<td>检测</td>\n<td>888套标注数据</td>\n<td>大规模肺结节检测数据集，是LIDC-IDRI的子集，挑选了病灶较为显著、符合结节标准的胸部CT和病灶标注。</td>\n</tr>\n<tr>\n<td>VoxelMorph (Balakrishnan等，2018)</td>\n<td>MRI</td>\n<td>配准</td>\n<td>合计7829套数据</td>\n<td>大规模多中心数据集，由作者搜集8个公开数据集整理而成，其用于学习配准的配对数据由该数据集添加形变生成。</td>\n</tr>\n<tr>\n<td>DeepLesion (Yan等，2018)</td>\n<td>CT</td>\n<td>检测 弱分割分类</td>\n<td>32 120套标注数据(关键帧)</td>\n<td>大规模通用病灶检测数据集，包含全身各种部位CT中带有标注的关键帧及其上下30 mm的相邻帧。除了病灶检测标注外，提供了病灶的RECIST(response evaluation criteria in solid tumors)标注(即病灶的长径短径)，可以用来生成弱标注的病灶分割。每张关键帧包含1~3个标注。后续数据集增添了部分分类标签。</td>\n</tr>\n<tr>\n<td>LiTS (the liver tumor segmentation benchmark) (Bilic等，2019)</td>\n<td>CT</td>\n<td>分割</td>\n<td>131套标注数据  70套测试数据</td>\n<td>LiTS 2017挑战赛，肝脏肝癌分割数据集，包含标注了肝脏和肝癌区域3D分割的腹部CT。另有部分临床信息。</td>\n</tr>\n<tr>\n<td>MSD(medical segmentation decathlon) (Simpson等，2019)</td>\n<td>MRI  CT</td>\n<td>分割</td>\n<td>合计 1 746套标注数据 888套测试数据</td>\n<td>大规模医学3D数据分割数据集，包含多种模态(MRI和CT)、各种部位、各种数据规模的10个医学3D数据分割数据集。该数据集也是一个持续进行的挑战赛，要求参赛者使用一套不需要人工调整参数的算法来完成多套数据的建模。</td>\n</tr>\n<tr>\n<td>KiTS (Heller等，2019)</td>\n<td>CT</td>\n<td>分割</td>\n<td>210套标注数据 90套测试数据</td>\n<td>KiTS 2019挑战赛，肾脏肾癌分割数据集，包含标注了肾脏和肾癌区域3D分割的腹部增强CT。另有部分临床信息。</td>\n</tr>\n<tr>\n<td>fastMRI (Knoll等，2020)</td>\n<td>MRI</td>\n<td>成像重建</td>\n<td>1594套配对数据</td>\n<td>大规模膝部MRI成像重构数据集，将低质量的MRI图像(降采样k-space)重构成高质量的MRI(全采样k-space)。除了已经重建好的配对MRI数据(DICOM格式)外，该数据集还包含了原始的k-space数据。该数据也是一个持续进行的挑战赛，后续还增加了大规模的脑部MRI数据。</td>\n</tr>\n<tr>\n<td>IntrA (Yang等，2020b)</td>\n<td>3D网格(mesh)</td>\n<td>分类 分割</td>\n<td>1 909套标注数据</td>\n<td>颅内动脉瘤数据集，整理了由医生手动分割的血管及动脉瘤的分割，每个分割经过手工清洗后转换成了3D网格(计算机图形学的基本格式)，因此该数据集可以使用基于点云、网格和体素的深度学习方法来处理。</td>\n</tr>\n<tr>\n<td>RibFrac (RibFrac Team，2020)</td>\n<td>CT</td>\n<td>检测 分割 分类</td>\n<td>500套标注数据 120套测试数据</td>\n<td>RibFrac 2020挑战赛，肋骨骨折检测、分割和检测数据集，包含标注了肋骨骨折病灶像素级3D分割的胸部CT，并经由专家给出骨折类型。可以用来开发3D检测、实例分割和分类算法。挑战赛评估检测和分类性能。</td>\n</tr>\n</tbody>\n</table></div>\n<h2>2 医学3D视觉任务</h2>\n<h3>1）分类</h3>\n<p>在医学影像学诊断中，从良恶性风险诊断，到各种征象的判断，分类通常是临床医生日常进行的高频任务。</p>\n<p>例如：以肺癌诊断为例，医生通常需要判断相关病灶的风险，此外还需要根据病灶大小、病灶征象(毛刺、磨玻璃等)和病灶位置(是否位于肺门旁)等综合决定病人的治疗方案(随访、手术或放化疗等)。</p>\n<p>在医学影像的任务中，分类任务往往是多标签分类，即尝试对于同一个实体打上不同语义层面的标签。</p>\n<ul>\n<li>这些标签可以根据放射医生的手工标注(Armato III等, 2011)，如良恶性风险、征象；</li>\n<li>这些标签也可以基于一些更加深入的医学检查，如病理分析(Zhao等，2018)和基因检测(Zhao等，2019)等。</li>\n</ul>\n<h3>2）分割</h3>\n<p>医学影像的分割是指对医学影像中的每个体素/像素赋予语义，通常分为器官分割(区分肝脏、气管和冠脉等)和异常分割(区分肝癌、肺结节和冠脉钙化等)。</p>\n<p>这些像素(或体素)级别的模型输出可以作为后续算法模型的重要构成；</p>\n<p>且一些场景下，分割结果本身就直接有用，如术前规划的可视化、放化疗的危及器官(organs at risk)分割(Tang等，2019)等。</p>\n<p>值得一提的是，由于医学影像中前景往往没有过多重叠，因此大部分医学影像分割采用的是语义分割(semantic segmentation)而非实例分割(instance segmentation)。</p>\n<h3>3）检测</h3>\n<p>医学影像检测指的是从较大的视觉范围内定位出单个或多个感兴趣区域(region of interest, ROI)。</p>\n<p>检测任务是放射科医生日常阅片的核心内容之一，如肺结节检测(Setio等，2017)。</p>\n<p>在实际的医学筛查和诊断中，只有检测往往不够，还需要伴随后续的分类、分割等任务才可能完成临床实践中的医学诊断报告。</p>\n<p>针对小目标分割，先检测后分割(类似实例分割)也是一种行之有效的简单策略(Tang等，2019)。</p>\n<h3>4）配准</h3>\n<p>医学影像的配准是医学影像成像和展示中的常见问题，主要指的是将两个结构、纹理等相似的医学影像中各个像素相匹配。</p>\n<p>配准在很多医学场景是很实用的核心问题，例如针对随访的病人，如何将多次检查自动匹配以节约临床医生的时间，并便于后续的量化测量(体积、密度的变化)。</p>\n<p>医学影像配准的研究方法中，一个代表性的方法是VoxelMorph (Balakrishnan等，2018)，其将配准问题归约成利用深度神经网络预测两幅(2D或3D)图像之间形变的问题，并借鉴了空间形变网络(Jaderberg等，2015)的思路将之变成一个端到端可微分、无监督的学习框架。</p>\n<h3>5） 成像重建</h3>\n<p>如何在不降低成像质量的前提下减少病人检查的剂量和负担，如计算机断层成像的辐射量、磁共振所需的检查时间，一直是医学成像中的核心研究问题。</p>\n<p>由于深度学习等人工智能技术的兴起，数据驱动的方法可以利用数据先验，形成快速、准确的医学影像重建。</p>\n<p>这类医学影像成像的研究可以视为计算摄影学在医学影像领域的延伸，如fastMRI (Knoll等，2020)结合人工智能技术，使用更少的成像时间获得更高质量的MRI成像，探索MRI成像中压缩感知(compressed sensing)以外的计算方法。更多研究可以参考Wang等人(2018)的相关成果。</p>\n<hr />\n<p>未完，期待下一期</p>\n<hr />\n<h2>医学领域</h2>\n<h3>分类</h3>\n<p><a href=\"https://zhuanlan.zhihu.com/p/543414666\">Pascal：[CV - Application(Image Classification)] 生物医学图像分类- 识别COVID-19</a></p>\n<h3>分割</h3>\n<p>综述</p>\n<p><a href=\"https://zhuanlan.zhihu.com/p/573663632\">Pascal：[CV - Image Segmentation - 2021] 医学图像分割U-Net网络应用综述（上）</a></p>\n<p><a href=\"https://zhuanlan.zhihu.com/p/574835363\">Pascal：[CV - Image Segmentation - 2021] 医学图像分割U-Net网络应用综述（下）</a></p>\n<p>解决方法</p>\n<p><a href=\"https://zhuanlan.zhihu.com/p/529797602\">Pascal：[CV - Image Segmentation]图像分割FCN模型 - 语义分割端对端开篇之作</a></p>\n<p><a href=\"https://zhuanlan.zhihu.com/p/530317701\">Pascal：[CV - 图像分割 ]生物医学图像语义分割 U-Net模型</a></p>\n<p><a href=\"https://zhuanlan.zhihu.com/p/531950955\">Pascal：[CV - 3D图像分割 ]生物医学立体图像分割3D U-Net模型</a></p>\n<p><a href=\"https://zhuanlan.zhihu.com/p/535996961\">Pascal：[CV - Scene Parsing]场景解析PSPNet模型 - ILSVRC 2016 语义分割/场景解析获胜者</a></p>\n<p><a href=\"https://zhuanlan.zhihu.com/p/531427276\">Pascal：[CV - 图像分割]生物医学图像语义分割 Swin-Unet模型</a></p>\n<p><a href=\"https://zhuanlan.zhihu.com/p/543157738\">Pascal：[CV - Image Segmentation]语义分割U-Net++模型 - 生物医学图像语义分割</a></p>\n<p><a href=\"https://zhuanlan.zhihu.com/p/544115917\">Pascal：[CV - Image Segmentation]图像分割U-Net3+模型 - 生物医学图像语义分割</a></p>"
    }
  ],
  "latest_overview": [
    {
      "title": "",
      "body_html": "<h1>CVPR 2026 医学图像特辑 | MRI/PET/脑影像</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2047979520477639713\">https://zhuanlan.zhihu.com/p/2047979520477639713</a></li>\n<li>作者: 清风等雨</li>\n</ul>\n<hr />\n<p>CVPR 2026 医学图像特辑 | MRI/PET/脑影像</p>\n<h1>CVPR 2026 医学图像特辑 | MRI/PET/脑影像</h1>\n<p>作者: 清风等雨, 赞: 6</p>\n<h2>写在前面</h2>\n<p>作为计算机视觉领域的重要国际会议，CVPR 2026 延续了较高的投稿规模与竞争强度。根据 CVPR 2026 官方公布的数据，本届会议共收到 16,092 篇有效投稿，其中 4,089 篇论文被接收为主会论文，整体录用率约为 25.4%；另有 956 篇论文被收录为 findings。我们在此基础上进一步整理出与医学图像处理相关的文献，共计主会论文 156 篇、findings 论文 67 篇，并按照数据类型与任务方向划分为 10 个类别。当前部分聚焦于“MRI/PET/脑影像”方向。</p>\n<h2>正文</h2>\n<h3>1. GenTract: Generative Global Tractography</h3>\n<p><strong>问题</strong>：脑白质纤维束追踪中，局部 tractography 依赖逐步跟随局部纤维方向，容易产生误差累积和高假阳性，尤其在低分辨率或噪声 dMRI 中更明显；而传统 全局 tractography 虽然利用全局一致性，但通常需要复杂优化，计算开销大，且可能陷入次优解或无法生成完整 tractogram。</p>\n<p><strong>动机</strong>：作者希望跳出传统“逐步追踪”或“全局优化”的范式，将 tractography 重新建模为条件生成任务，直接从 dMRI 的全局信息生成完整、解剖上合理的 streamlines，从而兼顾全局建模能力、鲁棒性和推理效率。</p>\n<p><strong>核心贡献</strong>：提出 GenTract，这是首个用于 全局 tractography 的生成模型；它将 tractography 表述为在整幅 dMRI/fODF 条件下采样 streamlines 的任务，并比较了 扩散-based 与 流匹配 两类生成范式在该任务中的表现。</p>\n<p><strong>方法</strong>：GenTract 首先从整幅 dMRI 或 fODF 中提取全局条件 embedding，用于表示个体脑部白质结构信息。随后从高斯噪声出发，生成模型并行预测单条 streamline 的所有 3D 坐标，而不是像 局部 methods 一样逐点推进。大量生成的 streamlines 被组合成最终 tractogram。由于该过程不依赖 seeding mask，也不执行逐步局部追踪，因此可以减少操作依赖性和误差传播；同时，全局条件输入使模型在噪声和低分辨率场景下具有更好的鲁棒性。</p>\n<h3>2. Duala: Dual-Level Alignment of Subjects and Stimuli for Cross-Subject fMRI Decoding</h3>\n<p><strong>问题</strong>：跨受试者 fMRI 视觉解码希望用少量新受试者数据实现图像检索或重建，但不同人的脑响应差异显著，而且 NSD 等数据集中不同受试者看到的具体图像大多并不相同。现有 微调 方法容易破坏预训练阶段学到的图像-脑信号对应关系，导致语义边界模糊和跨受试者对齐失败。</p>\n<p><strong>动机</strong>：作者认为性能下降主要来自两个层面：stimulus-level inconsistency，即新受试者 微调 后视觉刺激的语义结构被破坏；subject-level misalignment，即不同受试者的脑响应分布难以直接对齐。作者希望同时解决刺激语义保持和受试者分布适配两个问题。</p>\n<p><strong>核心贡献</strong>：提出 Duala，一个 dual-level 对齐 框架，用于少量 fMRI 数据条件下的跨受试者视觉解码。Duala 在 stimulus level 设计 语义 preservation 机制，在 subject level 设计 分布 perturbation 机制，从而同时维持视觉语义结构和适应个体脑响应差异。</p>\n<p><strong>方法</strong>：在 stimulus level，Duala 使用 语义 对齐损失 增强同一受试者内部不同语义类别的可分性，并使用 relational 一致性损失 保留跨受试者的类别关系结构，避免 微调 后语义边界变模糊。在 subject level，Duala 引入 covariance-driven 分布 perturbation，对新受试者特征进行扰动建模，以捕获全局差异和个体特异变化。两类对齐共同作用，使模型能够在约一小时 fMRI 数据条件下完成更稳定的 image-to-brain retrieval 和视觉重建。</p>\n<h3>3. Continual Learning for fMRI-Based Brain Disorder Diagnosis via Functional Connectivity Matrices Generative Replay</h3>\n<p><strong>问题</strong>：fMRI-based brain disorder 诊断 通常使用 Functional 连通性（FC）matrices 表示脑区间功能连接，但现有诊断模型多在单站点或一次性多站点数据上训练。真实临床中，不同机构的数据往往按时间顺序到达，模型需要持续学习新站点数据，同时不能遗忘旧站点知识。直接保存旧站点患者数据又受到隐私限制，因此需要 privacy-friendly 持续学习 方法。</p>\n<p><strong>动机</strong>：作者希望针对 FC matrices 这种图结构医学数据，构建一个能够跨站点持续学习的框架，通过生成式 replay 替代真实旧数据回放，并结合知识蒸馏减少 灾难性遗忘。</p>\n<p><strong>核心贡献</strong>：提出 FORGE（Functional 连通性 Replay with 图 rEpresentation），这是面向 跨站点 fMRI 诊断 的 持续学习 框架。其核心包括 FCM-VAE，一个专门为 FC matrices 设计的 结构感知 生成模型；dual-level 知识蒸馏，用于对齐分类 logits 与 图 representations；以及 层级式 contextual bandit 采样，用于高效选择 replay samples。</p>\n<p><strong>方法</strong>：首先，将每个受试者的 rs-fMRI 数据按照 AAL-116 atlas 划分为 116 个脑区，并计算 ROI 间 Pearson correlation，得到 116×116 FC matrix，再将其构建为功能连接图。FORGE 在每个站点训练结束后，使用 FCM-VAE 学习该站点患者和对照组的 FC matrix 分布。FCM-VAE 采用 图 transformer 编码器、局部 adjacency encoding、spectral positional encoding 和 low-rank 解码器，以捕获 FC 网络的拓扑结构与低秩性质。当新站点数据到来时，模型不访问旧站点原始数据，而是从 FCM-VAE 生成合成 FC matrices 作为 replay samples。当前学生模型同时学习新站点数据和生成 replay 数据，并通过 dual-level distillation 匹配旧教师模型的 logits 与 图-level embeddings。层级 contextual bandit 机制进一步自适应选择最有价值的 replay 样本，提高学习效率并缓解遗忘。</p>\n<h3>4. EMAD: Evidence-Centric Grounded Multimodal Diagnosis for Alzheimer’s Disease</h3>\n<p><strong>问题</strong>：Alzheimer’s Disease 诊断需要综合 3D sMRI、认知测试、遗传信息、CSF 生物标志物、人口统计学变量等多模态证据。然而许多现有 AI 模型只输出类别或风险分数，缺乏临床推理过程，也不能将诊断结论明确绑定到具体证据和脑部解剖结构。这在 AD 诊断中尤其重要，因为医生需要知道模型依据哪些临床指标和哪些脑区变化作出判断。</p>\n<p><strong>动机</strong>：作者希望构建一个 证据中心化 多模态 vision-language 框架，使模型不仅预测 AD 诊断和置信度，还能生成结构化诊断报告，并将每一句结论逐级 grounded 到 临床 evidence 和 3D brain anatomy，提升诊断透明度与临床可解释性。</p>\n<p><strong>核心贡献</strong>：提出 EMAD，一个用于 AD 的 grounded 多模态 诊断 框架。核心包括 Sentence-Evidence-Anatomy（SEA）Grounding 机制、GTX-Distill grounding transfer 策略，以及 Executable-Rule GRPO 强化学习微调。SEA 将报告句子链接到临床证据，再将证据定位到 3D MRI 解剖结构；GTX-Distill 降低 密集 grounding 标注 成本；Executable-Rule GRPO 用可执行规则奖励约束报告结构、NIA-AA 一致性和推理-诊断一致性。</p>\n<p><strong>方法</strong>：EMAD 输入患者的 3D sMRI 和结构化/半结构化临床变量，包括人口统计学、认知测试、APOE genotype、CSF 生物标志物 等。模型首先通过 多模态 编码器 分别编码影像与临床数据，再用 bidirectional cross-attention 融合 对两类信息进行对齐和融合，随后由 causal language 模型 生成结构化 AD 诊断报告。SEA Grounding head 建立两级证据链：sentence-to-evidence grounding 将报告中的每句话对应到具体 临床 evidence phrases；evidence-to-anatomy grounding 则根据证据条件，在 3D MRI 中定位相关脑结构。由于人工标注完整 grounding 成本高，GTX-Distill 使用少量有监督数据训练 teacher grounder，再将其 grounding 分布蒸馏给 student。最后，Executable-Rule GRPO 使用规则化奖励强化模型，使输出符合结构化报告格式、NIA-AA 诊断逻辑和 生物标志物 阈值要求。</p>\n<h3>5. Prospective Dynamic 3D MRI Reconstruction via Latent-Space Motion Tracking from Single Measurement</h3>\n<p><strong>问题</strong>：MRI-guided radiotherapy 和介入治疗需要在采集过程中快速重建 3D 动态图像并估计患者运动，但 prospective 重建 只能利用当前时间窗口内的 ultra-稀疏 测量，例如 single-shot k-space 测量，同时还受到严格延迟要求限制。传统 retrospective 重建 可以聚合多帧数据，但无法满足实时 prospective 场景；现有在线方法又常依赖线性运动模型或离散先验，难以表达复杂非线性生理运动。</p>\n<p><strong>动机</strong>：作者希望利用 retrospective 重建 学到的 患者特异 运动 先验，在在线阶段只优化低维 latent representation，从而从单次超稀疏测量中快速估计当前 运动 state，实现低延迟、高保真的动态 3D MRI 重建。</p>\n<p><strong>核心贡献</strong>：提出 PDMR（Prospective Dynamic MRI 重建），这是一个基于 latent-space 运动 跟踪 的 prospective 3D MRI 重建 框架。其核心是离线学习一个低维、非线性的 形变 vector field（DVF）运动 流形，并通过 tri-plane representation 构建 几何-aware 流形 mapping 网络，使在线阶段只需优化低维 latent vector 即可快速恢复当前 3D DVF。</p>\n<p><strong>方法</strong>：PDMR 采用 运动-compensated 重建 思路，将动态 MRI 分解为静态 template image 和时间相关 DVF。离线 retrospective 阶段，模型利用完整动态测量学习 患者特异 latent 运动 流形，并通过 tri-plane mapping 网络 将低维 latent code 映射为高分辨率 3D DVF，从而捕获全局解剖结构和局部细节运动。在线 prospective 阶段，当前只获得 ultra-稀疏 single 测量，PDMR 固定已学习的 运动 流形 和 template，只优化一个低维 latent vector，使投影后的重建结果与当前 k-space 测量 匹配。由于搜索空间被压缩到低维 latent space，模型能够在少量迭代中完成当前时刻的 运动 估计 和 3D 重建。</p>\n<h3>6. IEBGL: An Interpretability-Enhanced Brain Graph Learning Framework with LLM-Instructed Topology and Literature-Augmented Semantics</h3>\n<p><strong>问题</strong>：rs-fMRI brain 图 learning 通常将脑区作为节点、功能连接作为边，用 GNN 进行 depression 或 autism 等脑疾病诊断。但现有方法主要依赖影像相关性构图，节点特征缺少脑区功能、病理和认知语义，邻接矩阵也缺少医学知识约束，导致模型虽然能分类，但生物学解释性和临床可理解性不足。</p>\n<p><strong>动机</strong>：作者希望将 LLM 和医学文献知识引入 brain 图 construction，使脑图不仅包含 functional 连通性，还能编码脑区语义和疾病相关拓扑先验，从而同时提升分类性能和解释性。</p>\n<p><strong>核心贡献</strong>：提出 IEBGL（可解释性-Enhanced Brain 图 Learning），包含两个核心模块：LLM-Instructed Topological 重建（LITR）和 Literature-Augmented 语义 聚合（LASA）。LITR 利用 LLM 对脑区功能、解剖和病理关系进行推理，指导 连通性 拓扑 细化；LASA 从 depression/autism 相关 生物医学 literature 中聚合语义信息，增强脑区 节点 representations。最终使用 图 Bi-directional Mamba 网络（GBMN）完成疾病诊断。</p>\n<p><strong>方法</strong>：对于每个受试者，IEBGL 首先基于 rs-fMRI time series 计算 Pearson correlation，构建初始 FC 图。LITR 为每个脑区设计结构化 cognitive foundation prompts，询问其解剖功能、结构异常和疾病相关表现，并将 LLM 生成的脑区关系嵌入为拓扑先验；随后通过 图 autoencoder 和 masked 对比学习 重构并 refine 原始 functional 连通性。LASA 则检索并编码大量疾病相关文献，将与脑区相关的医学语义聚合到节点特征中。增强后的 图 同时包含 imaging 连通性、LLM-instructed 拓扑 和 literature-augmented 语义，再输入 GBMN 进行分类。模型还可以将异常连接与相关医学文献对应起来，提供可解释诊断依据。</p>\n<h3>7. Can Natural Image Autoencoders Compactly Tokenize fMRI Volumes for Long-Range Dynamics Modeling?</h3>\n<p><strong>问题</strong>：fMRI 是高维 4D spatiotemporal signal，长程脑活动动态建模非常困难。ROI-based 方法计算高效，但强依赖脑区划分，会丢失细粒度 3D 空间结构；体素-based 方法直接处理 4D volume，保留更多空间和时间信息，但显存和计算开销巨大，通常只能处理很短的时间窗口，难以捕获几十秒尺度的 long-range temporal dynamics。</p>\n<p><strong>动机</strong>：作者提出一个反直觉问题：自然图像上预训练的 2D autoencoder 是否可以作为 fMRI volume tokenizer？如果能把每个 3D fMRI volume 压缩为极少量连续 tokens，就可以用普通 Transformer 在有限显存下处理更长时间序列。</p>\n<p><strong>核心贡献</strong>：提出 TABLeT（Two-dimensionally Autoencoded Brain Latent Transformer），使用预训练 2D natural image Deep Compression Autoencoder（DCAE）将每个 3D fMRI volume 压缩为紧凑 continuous tokens。论文展示每个 3D volume 可被压缩为约 27 个 tokens，从而显著降低序列长度和显存需求；同时提出 自监督 masked token modeling 预训练 TABLeT，提升下游任务表现。</p>\n<p><strong>方法</strong>：TABLeT 将 3D fMRI 帧 分别按 矢状位、轴位、冠状位 等方向切成 2D 切片，并将每个 切片 输入冻结的 2D DCAE 得到 latent tokens。随后将不同方向和切片的 tokens 重新排列、拼接和压缩，形成每个 3D volume 的紧凑 token set。对于一个 fMRI time series，所有时间点的 volume tokens 组成长序列，并输入 Transformer 编码器 进行 spatiotemporal modeling。模型可用于 demographic attribute 预测、ADHD 诊断 等任务。进一步地，作者在 tokenized fMRI 上使用 masked token modeling 进行自监督预训练，使模型学习脑活动动态的上下文补全能力，再迁移到下游任务。</p>\n<h3>8. Toward Generalizable Whole Brain Representations with High-Resolution Light-Sheet Data</h3>\n<p><strong>问题</strong>：Light-sheet fluorescence microscopy（LSFM）结合组织透明化和全脑标记技术，可以在亚细胞分辨率下获得完整小鼠脑 3D 数据，但这类数据体量巨大，真实应用中可达 petabyte scale。现有计算方法和视觉模型难以在 whole-brain LSFM 数据上泛化，尤其在不同 cell-type markers、脑区和细胞形态差异下，object 检测/分类 模型性能不稳定。领域内也缺少大规模公开 基准 来推动 foundation 模型 发展。</p>\n<p><strong>动机</strong>：作者希望构建一个高分辨率 whole mouse brain LSFM 基准，用于评估和推动可泛化的 3D 生物显微图像表征学习，使模型能够跨 细胞类型、脑区和形态分布进行细胞检测。</p>\n<p><strong>核心贡献</strong>：提出 CANVAS，第一个也是目前最大的 whole-brain LSFM 基准 数据集，包含 intact mouse brain 的高分辨率 3D LSFM volumes、六种 neuronal/immune cell-type markers、细胞中心点标注和公开 leaderboard。六类标记包括 NeuN、cFos、PV、TH、Iba1 和 GFAP，覆盖神经元、活化细胞、抑制性神经元、儿茶酚胺相关细胞、小胶质细胞和星形胶质细胞等不同形态类型。</p>\n<p><strong>方法</strong>：CANVAS 使用 SmartSPIM 等 LSFM 平台采集完整小鼠脑或半脑的大体积图像，每个 volume 包含约 1,600–1,850 个 z-切片，每张切片约 7,000×10,000 像素，压缩后单体积仍有数十到上百 GB。作者为每个 marker 选择多个 ROI，并提供训练与测试细胞 centroid 标注，用于 whole-brain cell 检测 基准。论文进一步评估现有 检测/分类 基线，发现它们在跨 marker 和跨脑区泛化时表现显著下降，说明 LSFM 数据中的细胞形态、密度、背景和解剖位置差异要求新的 可扩展 representation learning 与 domain-general foundation 模型。</p>\n<h3>9. MRI Contrast Enhancement Kinetics World Model</h3>\n<p><strong>问题</strong>：临床 对比度-enhanced MRI 需要注射造影剂，存在风险、成本和流程负担；同时实际采集通常只有固定且稀疏的时间点，信息效率低。若直接训练生成模型从 non-对比度 MRI 生成 对比度-enhanced sequence，由于缺少未观测时间点监督，模型容易出现两类问题：空间上 overfit 到无关特征导致 content distortion，时间上无法学习连续 对比度 agent kinetics，产生 temporal discontinuities。</p>\n<p><strong>动机</strong>：作者希望构建 MRI 对比度 Enhancement Kinetics World 模型（MRI CEKWorld），仅基于 non-对比度 MRI 模拟人体内造影剂增强动力学，并生成任意时间点的 对比度-enhanced MRI，从而实现 对比度-free、连续、高时间分辨率的增强动态建模。</p>\n<p><strong>核心贡献</strong>：首次提出 MRI CEKWorld，并提出 SpatioTemporal 一致性 Learning（STCL）解决稀疏时间监督问题。STCL 包含 Latent 对齐 Learning（LAL）和 Latent Difference Learning（LDL）：LAL 构建 患者特异 template，约束各时间点的内容与同一患者的稳定解剖结构对齐；LDL 在 latent space 中插值未观测时间点，并约束相邻点的二阶差分平滑，以学习连续 kinetics law。</p>\n<p><strong>方法</strong>：MRI CEKWorld 输入 non-对比度 MRI 和时间条件，生成对应时刻的 对比度-enhanced image sequence。LAL 利用同一患者在增强过程中解剖结构应保持一致这一空间规律，在 latent space 中计算不同时刻特征的 covariance/statistical relationships，并聚合成 患者级 template。每个生成时间点的 latent feature 都被约束与该 template 保持等距一致，从而减少器官错位和结构变形。LDL 则利用增强曲线应平滑演化的时间规律，在稀疏采样帧之间插入 virtual intermediate time points，构造 密集 latent sequence，并对相邻时间点的二阶差分施加平滑约束，抑制突变。二者结合，使模型既保持患者特异解剖真实感，也学习连续造影剂动力学。</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-720dfc16111b22e8347ed4f20b1c9209_1440w.jpg\" /></p>\n<h3>10. Modeling the Brain’s Grammar: ROI-Guided fMRI Pretraining for Transferable and Interpretable Vision Decoding</h3>\n<p><strong>问题</strong>：fMRI visual decoding 需要从脑活动中重建或识别视觉刺激。现有 跨受试者 fMRI 预训练 方法常将 fMRI 当作 1D/2D patch 序列，或用 受试者特异 adapters 对齐到一个 unstructured 共享 feature space。这些方法忽略了大脑视觉系统的功能组织：不同 ROIs 具有专门视觉功能，ROI 内和 ROI 间存在冗余、层级和协同关系。缺少 ROI-level 结构会影响少样本迁移、抗噪性和神经科学可解释性。</p>\n<p><strong>动机</strong>：作者希望围绕大脑 intrinsic functional 架构 进行 fMRI 预训练，把每个 ROI 视作具有功能语义的 token，学习跨被试共享的“brain grammar”。这样模型不仅可以提升 vision decoding 的 transfer performance，还能量化不同 ROI 对视觉重建任务的贡献，并揭示视觉层级结构。</p>\n<p><strong>核心贡献</strong>：提出 ROITok，一个 ROI-guided fMRI 预训练 框架。核心包括 稀疏 ROI Context 融合，用 masked ROI tokens 学习 ROI-level visual representations 和 inter-regional functional synergy；以及受 Matryoshka Representation Learning（MRL）启发的 embedding compression scheme，使早期 tokens 优先编码最重要视觉成分，后续 tokens 逐步补充更细粒度细节。ROITok 支持单 ROI 或多 ROI decoding，并在 NSD 和 GOD 数据集上表现出良好迁移性能、抗高层噪声能力和可解释性。</p>\n<p><strong>方法</strong>：ROITok 首先使用标准 atlas 或 functional localizer 将 fMRI 信号划分为多个视觉相关 ROIs，例如早期视觉区 V1/V2 和高级视觉区域。每个 subject 的每个 ROI 都由特定 linear ROI embedder 映射为共享维度的 ROI token。预训练时，稀疏 ROI Context 融合 随机 mask 部分 ROI tokens，并要求模型从剩余 ROI 上下文中恢复视觉语义表示，从而学习不同脑区之间的冗余与互补关系。编码器采用低显存的 残差 MLP，并通过 MRL-inspired compression 将输出 embedding 排列为由粗到细的信息层级。下游视觉解码时，ROITok 可将单个或多个 ROI tokens 输入 扩散-先验 或 IP-Adapter 等生成模块进行图像重建。由于每个 token 对应明确脑区，模型还能分析不同 ROI 的贡献和相关性，展示从低级视觉特征到高级语义区域的层级组织。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-42d4df7c1f70c25d1d75ba5168bbbce8_1440w.jpg\" /></p>\n<h3>11. PGR-Net: Prior-Guided ROI Reasoning Network for Brain Tumor MRI Segmentation</h3>\n<p><strong>问题</strong>：Brain 肿瘤 MRI 分割 对临床诊断、术前规划、肿瘤体积测量和放疗靶区勾画非常重要。但脑肿瘤在 MRI 体数据中通常只占很小一部分空间，存在严重 spatial sparsity 和 前景-背景 imbalance。现有分割网络往往在大面积健康组织和背景区域上进行冗余计算，并且大多默认肿瘤空间分布均匀，忽略了临床数据中肿瘤发生位置和尺度的统计先验，导致定位稳定性和计算效率不足。</p>\n<p><strong>动机</strong>：作者观察到 BraTS 等脑肿瘤数据中的 病灶 centers 和 ROI 分布并不是随机的，而是存在可统计建模的空间规律。作者希望将这种 data-driven spatial 先验 显式引入分割网络，让模型从训练早期就获得全局 ROI guidance，并在 编码器、解码器 和 skip connections 中持续强化对高置信肿瘤候选区域的关注。</p>\n<p><strong>核心贡献</strong>：提出 PGR-Net（先验-Guided ROI Reasoning 网络），一个显式 ROI-aware 的脑肿瘤 MRI 分割框架。方法首先从训练集构建 ROI 先验 template set，建模肿瘤中心分布和尺度特征；随后设计 层级式 Top-K ROI decision mechanism，在多层 编码器 中逐步选择最可能的 病灶 candidate regions；并提出 WinGS-ROI（Windowed Gaussian–Spatial Decay ROI）模块，用 multi-window Gaussian templates 和 spatial decay function 生成中心增强的 ROI guidance maps。网络主体采用 windowed RetNet 主干网络，以较低参数量获得稳定定位和分割性能。</p>\n<p><strong>方法</strong>：PGR-Net 先对训练集中肿瘤 mask 的 连通分量 进行统计，提取 ROI center、scale ratio 和代表性 分布 peaks，形成可泛化的空间先验模板。推理和训练过程中，网络根据这些模板生成多个候选 ROI window，并通过 层级式 Top-K 机制在不同 编码器 stage 逐层筛选高置信病灶区域。WinGS-ROI 对每个候选窗口构造 Gaussian-enhanced guidance map，并在 ROI 边界处引入 spatial decay，避免硬裁剪带来的不连续。得到的 ROI guidance 分别作用于 编码器 特征选择、skip feature 传播和 解码器 重建，使模型在全流程中保持 region-aware attention。最后，windowed RetNet 用 retention mechanism 提供高效局部-全局建模，在减少背景冗余计算的同时提高 Whole 肿瘤、肿瘤 Core 和 Enhancing 肿瘤 的分割精度。</p>\n<h3>12. Breaking the Continuum: Discrete Distribution Learning for Structural MRI Reconstruction</h3>\n<p><strong>问题</strong>：Undersampled MRI 重建 是 ill-posed inverse problem，可能存在多个解剖上合理的重建结果。现有 扩散 / score-based 生成式 重建 多假设图像位于连续平滑流形上，通过长步 去噪 逐渐恢复图像，但 structural MRI 具有明确边界、低个体差异和一致拓扑等离散结构先验。纯连续生成模型容易过度平滑解剖边界，削弱组织分界和临床可解释性；而纯离散结构推理又难保证纹理细节和 k-space 物理一致性。</p>\n<p><strong>动机</strong>：作者希望打破“连续流形”这一默认假设，把 MRI 解剖结构看作具有 cluster-like discrete 语义 的分布。通过先生成多个离散 解剖感知 hypotheses，再用轻量连续 细化 做物理和纹理修正，可以同时保持解剖拓扑清晰和 k-space fidelity。</p>\n<p><strong>核心贡献</strong>：提出 DiCoS（Discrete–Continuous Synthesis），一个面向 structural MRI 重建 的生成式重建框架。它包括 Discrete 先验 网络（DPN），用于一次 coarse-to-fine 生成多个 解剖感知 candidate reconstructions；Dual-domain Balanced Scoring（DBS），从 image-domain fidelity 和 k-space 一致性 两方面自适应评分候选；以及 Micro 扩散 Cycles（MDC），用少量 score-guided 细化 增强纹理真实感，同时不破坏全局拓扑。论文在 fastMRI knee 和 brain 数据集 上展示更锐利边界和更好的 解剖 一致性。</p>\n<p><strong>方法</strong>：DiCoS 在每个推理步骤中首先由 DPN 生成 K 个完整图像候选，每个候选代表一种离散解剖结构假设。随后，每个候选进入 MDC 模块，执行少量 扩散 corrector steps，用预训练 score-based SDE 先验 细化局部纹理和高频细节。为了选择最可靠的结果，DBS 同时评估候选在 image domain 中是否符合解剖与视觉先验，以及在 k-space domain 中是否满足采样测量一致性；并通过轻量 sequential 聚合 将两个域的证据逐步融合。最终模型不是沿单条连续 去噪 轨迹 被动收敛，而是在多个离散结构假设中进行 reasoning、scoring 和 细化，从而得到更具语义一致性的 MRI 重建。</p>\n<h3>13. GraPHFormer: A Multimodal Graph Persistent Homology Transformer for the Analysis of Neuroscience Morphologies</h3>\n<p><strong>问题</strong>：Neuronal and glial 形态 中包含分支模式、路径长度、半径、空间布局和拓扑结构等关键信息，可反映神经发育、脑区差异和疾病状态。现有方法通常单独使用 图-based representation 或 拓扑-based representation：前者能捕获骨架树的局部几何和分支结构，但容易遗漏全局拓扑不变量；后者如 持久同调 / TMD 能稳定总结整体形态，但会丢失细粒度结构属性。两类视角没有被充分联合建模。</p>\n<p><strong>动机</strong>：作者希望把神经形态骨架的 图 视图 和 topological persistence 视图 融合到一个统一表示空间中。通过 CLIP-风格 对比学习，可以让 tree 图 编码器 和 persistence image 编码器 互相对齐，使模型同时学习局部几何细节与全局拓扑模式。</p>\n<p><strong>核心贡献</strong>：提出 GraPHFormer，一个 多模态 图 持久同调 transformer。它构建三通道 persistence image：unweighted TMD-风格 density、persistence-weighted density 和 radius-weighted density，分别编码空间拓扑密度、拓扑显著性和半径信息；视觉分支使用 DINOv2-ViT-S 处理 persistence images，图分支使用 TreeLSTM 编码 skeleton 图；两者通过 symmetric InfoNCE 损失 对齐到共享 embedding space。论文还提出 persistence-space augmentations，如 birth-death jittering、persistence scaling 和 radius perturbation。</p>\n<p><strong>方法</strong>：GraPHFormer 首先将神经元或胶质细胞 skeleton 图 转换为 persistent diagram，再栅格化为 RGB persistence image，其中不同通道携带不同拓扑和几何属性。同时，原始 skeleton tree 被保留为 图 输入，节点包含位置、半径、分支等属性。训练时，vision 编码器 和 图 编码器 分别输出 embedding，并通过 CLIP 式对比学习最大化同一细胞 图-image pair 的相似度、最小化非对应样本相似度。这样得到的联合表示既保留 TDA 的全局稳定形态描述，又保留 图 的局部结构细节。下游可用 冻结 embeddings 进行 k-NN 分类或监督训练，用于 neuronal 形态 基准、glial 形态 discrimination 和发育/退行性变化分析。</p>\n<h3>14. Uni-Encoder Meets Multi-Encoders: Representation Before Fusion for Brain Tumor Segmentation with Missing Modalities</h3>\n<p><strong>问题</strong>：多模态 MRI brain 肿瘤 分割 依赖 FLAIR、T1ce、T1、T2 等模态的互补信息，但临床中经常缺失一个或多个模态，导致 分割 performance 明显下降。现有方法要么通过 模态 synthesis / distillation 试图补全缺失模态，但难恢复细节且流程复杂；要么采用多 CNN 编码器 和后端 融合 利用可用模态，但局部感受野限制了 跨模态 complementarity modeling，也难同时捕获全局语义、细粒度结构和模态特异信息。</p>\n<p><strong>动机</strong>：作者希望将 representation learning 与 分割 解耦：先用单一 ViT Uni-编码器 通过 masked self-supervision 学到对缺失模态鲁棒的统一全局表示；再在分割阶段加入 模态特异 CNN Multi-编码器，补充高分辨率、多尺度、细粒度结构。这样可以同时利用 ViT 的跨模态语义建模能力和 CNN 的局部细节优势。</p>\n<p><strong>核心贡献</strong>：提出 UniME（Uni-编码器 Meets Multi-编码器），一个 two-stage 异质 框架，用于 missing-模态 brain 肿瘤 分割。Stage 1 使用 masked image modeling 预训练单一 ViT Uni-编码器，通过 模态-level masking 和 patch-level masking 学习 unified representation，并结合 learnable positional embeddings、3D RoPE 和 register tokens 增强空间先验与鲁棒性。Stage 2 添加并行 模态特异 CNN Multi-编码器，提取高分辨率多尺度特征，并与 Uni-编码器 全局 representation 融合；同时使用 layer-wise learning rate decay 保留预训练语义知识。方法在 BraTS 2023 和 BraTS 2024 的 incomplete 多模态 setting 中优于已有方法。</p>\n<p><strong>方法</strong>：Stage 1 中，输入多模态 MRI volume 会随机遮蔽部分模态和部分 patch，确保模型学习在任意非空模态子集下恢复表示。ViT Uni-编码器 采用 3D patch tokenizer，并将多模态沿 channel 维度堆叠，使序列长度可控；轻量 auxiliary 解码器 仅用于 预训练 重建，预训练后丢弃，使表示学习保持 编码器-centric。Stage 2 中，预训练 Uni-编码器 提供全局语义和跨模态互补表示；每个可用模态再通过对应 CNN Multi-编码器 提取细粒度局部结构。Cross-level skip connections 将 CNN 细节注入 Uni-编码器 语义特征，权重-共享 解码器 为不同模态分支生成预测并稳定梯度流。最终模型能在任意缺失模态组合下完成 WT、TC、ET 等脑肿瘤区域分割。</p>\n<h3>15. Virtual Nodes Guided Dynamic Graph Neural Network for Brain Tumor Segmentation with Missing Modalities</h3>\n<p><strong>问题</strong>：Brain 肿瘤 分割 依赖 T1、T1c、T2、FLAIR 等多模态 MRI 的互补信息，但临床中经常缺失部分模态。为每种模态组合训练 customized 模型 成本随模态数指数增长；现有 unified methods 往往通过 模态 dropout、distillation 或 missing-模态 synthesis 处理缺失，但结构化 CNN/Transformer 的计算路径固定，难以自然适应任意可用模态组合，也可能受到 missing 模态 interference 影响。</p>\n<p><strong>动机</strong>：作者希望用 图 formulation 替代固定结构建模：把每个可用 MRI 模态看作一个节点，缺失模态对应缺失节点或边。图网络天然支持动态连接，因此可以根据模态可用性调整信息流；同时引入 模态特异 virtual 节点 作为补充信息源，弥补缺失模态造成的信息损失。</p>\n<p><strong>核心贡献</strong>：提出一个 图-based one-stage 框架，用于 missing-模态 brain 肿瘤 分割。方法引入 zero-initialized 模态特异 virtual 节点，用于捕获 模态-invariant supplementary features；设计 dynamic 边 connection strategy，根据模态可用性动态调整 邻接矩阵，使信息从 existing 节点 单向流向 missing-模态 virtual 节点，保留有益信息流并减少缺失干扰；同时使用 异质 权重 matrices 提升 GAT 对多模态场景的适应能力。该方法可作为 即插即用 模块集成到现有系统，并在 BraTS-2018 与 BraTS-2020 的不完整模态组合上取得强结果。</p>\n<p><strong>方法</strong>：每个 MRI 模态先通过 模态特异 编码器 提取特征，并被表示为 图 中的 basic 节点。对于缺失或潜在模态，模型维护对应的 virtual 节点，这些节点初始化为零或可学习补偿表示。训练和推理时，dynamic 边 connection 根据当前可用模态组合构造邻接矩阵：可用模态之间进行正常 消息传递，而缺失模态相关的 virtual 节点 主要从已有节点接收信息，不向已有节点传播不可靠噪声。异质 GAT update 为不同模态关系使用不同权重矩阵，使 T1、T1c、T2、FLAIR 间的互补关系被区别建模。图融合后的特征再送入 解码器 输出 WT、TC、ET 等肿瘤区域分割。</p>\n<h3>16. Cross-domain Dual-stream Feature Disentanglement for Brain Disorder Prediction with Sparsely Labeled PET</h3>\n<p><strong>问题</strong>：PET 对 Alzheimer’s disease、Parkinson’s disease 等脑疾病早期诊断非常重要，但 PET 标注需要核医学专家，带标签 PET 数据稀缺。利用标注更充足的 MRI 进行 跨模态 域适配 可以帮助 PET 分类，但 MRI 与 PET 的成像机制不同：MRI 反映结构病理，PET 反映功能/代谢异常。传统 全局 对齐 或将 分类-relevant features 强行对齐，可能破坏各模态中真正具有诊断价值的 模态特异 病理 cues。</p>\n<p><strong>动机</strong>：作者认为，在 跨模态 brain disorder 预测 中，不应盲目对齐所有特征；应当区分 分类-relevant critical regions 和 分类-irrelevant / non-critical regions。关键病变相关区域应保留并融合模态特异判别信息，非关键区域则可以进行 拓扑-weighted 对齐，以减少域差异并保留脑结构一致性。</p>\n<p><strong>核心贡献</strong>：提出 DSDA（Dual-Stream feature 解耦 and 对齐），一个面向 sparsely 已标注 PET 的 跨域 dual-stream 框架。它动态评估并显式解耦分类相关关键脑区与非关键脑区；对 non-critical regions 使用 拓扑-weighted feature 对齐，提取稳健 domain-invariant features；对 critical regions 使用 high-置信度 feature 融合，融合 MRI 结构病理和 PET 功能代谢线索。实验在 ADNI、AIBL 和 PPMI 数据集上达到 SOTA。</p>\n<p><strong>方法</strong>：DSDA 在半监督 域适配 setting 下训练，源域为 已标注 MRI，目标域包含少量 已标注 PET 和大量 未标注 PET。模型首先根据分类监督和脑区贡献动态识别 critical 节点 / regions，以及主要用于保持脑结构完整性的 non-critical 节点。对于 non-critical stream，模型利用脑区拓扑关系加权对齐 MRI 与 PET 特征，使共享结构信息在跨模态间更一致；对于 critical stream，模型避免强行对齐，而是使用 high-置信度 feature 融合 将源域 MRI 中可靠的结构病理信息和目标域 PET 中的代谢异常信息结合起来。最终分类器基于这两路特征进行脑疾病预测，在减少 domain discrepancy 的同时保留 模态特异 discriminative signals。</p>\n<h3>17. Bridging Brain and Semantics: A Hierarchical Framework for Semantically Enhanced fMRI-to-Video Reconstruction</h3>\n<p><strong>问题</strong>：从 fMRI signals 重建视频需要同时恢复空间内容和时间动态，但 fMRI 信号本身低信噪比、时间分辨率低，并且与视频的 rich 语义 之间存在显著 语义 gap。现有 fMRI-to-视频 重建 方法通常只将 fMRI embedding 对齐到 text / image 语义空间，忽略 action concepts、object categories 等视频特有语义，也通常只依赖当前 stimulus 进行孤立重建，没有利用先前见过数据中的 先验 knowledge，导致生成视频语义不一致或对象错误。</p>\n<p><strong>动机</strong>：作者受到人脑 dual-pathway processing 的启发，希望把 bottom-up sensory 语义 extraction 与 top-down memory integration 结合起来。换言之，模型应先从当前 fMRI 中提取更完整的多维语义，再从历史记忆中检索相关语义知识来补充和修正重建条件。</p>\n<p><strong>核心贡献</strong>：提出 CINENEURON，一个用于 semantically enhanced fMRI-to-视频 重建 的 层级式 框架。它包含两个协同阶段：Bottom-Up 语义 Enrichment 将 fMRI 映射到同时包含 text 语义、image contents、action concepts 和 object categories 的丰富语义空间；Top-Down Memory Integration 通过 Mixture-of-Memories（MoM）从 previously seen data 中动态检索相关 多模态 memories，并与当前 fMRI embedding 融合。论文在 cc2017 和 CineBrain 两个 fMRI-to-视频 基准 上超越现有方法。</p>\n<p><strong>方法</strong>：第一阶段，作者使用多个异构预训练 编码器 从视频刺激中提取多种语义监督，包括文本描述、图像内容、动作概念和对象类别。Brain 模型 学习将 noisy fMRI signals 映射到这些综合语义 embedding space，使 fMRI 表征不仅包含静态画面语义，也包含动作与类别信息。第二阶段，MoM 构建一个 memory pool，保存历史样本的 text、image、action 等 embeddings。对于当前 fMRI embedding，模态-aware router 动态分配不同 memory 模态 的权重，并通过 weighted similarity 检索最相关的 memory entries。随后，模型将检索到的 memories 与当前 fMRI embedding 融合，形成更语义完整、带有先验知识的条件表示，再送入 视频 解码器 生成 temporally consistent 且 语义 coherent 的视频。</p>\n<h3>18. fMRI-LM: Towards a Universal Foundation Model for Language-Aligned fMRI Understanding</h3>\n<p><strong>问题</strong>：现有 fMRI deep learning 模型大多面向具体任务，如疾病诊断、表型预测或 masked 预测，需要 任务特异 tuning，缺少跨数据集和跨任务的统一语义接口。BrainLM、Brain-JEPA 等 fMRI foundation 模型 虽能学习神经表征，但仍主要依赖 neural-only 目标函数，缺乏语言 grounding。另一方面，fMRI 通常没有自然的 paired text captions，限制了将 LLM / MLLM 扩展到脑成像理解。</p>\n<p><strong>动机</strong>：作者希望构建一个 language-aligned universal fMRI foundation 模型，将 fMRI 信号转化为 LLM 可理解的 discrete tokens，并利用结构化 fMRI-text descriptors 弥补缺少自然 fMRI-text pairs 的问题。核心思想是：把 functional 连通性、functional gradients、ICA 组成部分 和 图 指标 等低层脑功能组织转换为文本描述，作为连接神经信号与语言语义的桥梁。</p>\n<p><strong>核心贡献</strong>：提出 fMRI-LM，一个三阶段 fMRI-language foundation 框架。Stage 1 训练 neural tokenizer，将 fMRI 映射为与语言空间一致的离散 tokens；Stage 2 调整 pretrained LLM，使其联合建模 fMRI tokens 和 text tokens，并能进行 temporal 预测 与 fMRI-conditioned text 生成；Stage 3 通过 多任务、multi-paradigm 指令微调，使模型具备高级语义理解能力。作者还构建 large descriptive corpus，将 fMRI imaging-derived features 转换为结构化文本描述。fMRI-LM 在多个 基准 上表现出强 零样本、少样本 和 LoRA-高效 适配 能力。</p>\n<p><strong>方法</strong>：fMRI-LM 首先将 4D fMRI parcellate 为 ROI-level time series，例如 cortical 和 subcortical ROIs。Tokenizer 由 Transformer 编码器 和 vector quantizer 组成，将 fMRI 序列映射为离散 codebook tokens，并通过 重建 损失、domain adversarial 损失 和 contrastive 对齐损失 使其接近 LLM text embedding space。为了获得语言监督，作者为每个 fMRI 样本生成多类 descriptors：functional 连通性、functional 梯度、图-theoretical 指标 和 ICA-derived measures，并转为标准化文本。随后，pretrained LLM 学习同时预测 fMRI tokens 和这些 text descriptors。最后，模型在疾病、认知、表型等多种任务上做 指令微调，使 fMRI 输入能通过自然语言问答或描述生成的形式完成统一理解。</p>\n<h3>19. Virtual Full-stack Scanning of Brain MRI via Imputing Any Quantised Code</h3>\n<p><strong>问题</strong>：Brain MRI 通常包含多种 采集 模态，如 T1、T2、PD、FLAIR、T1Gd 等，每种模态强调不同解剖或病理信息。但临床中由于扫描时间、成本、造影剂风险、运动伪影和协议差异，很难为每位患者采集完整 full-stack 模态。现有 MRI 补全 方法常依赖全局条件，如 binary 模态 indicators 或 learnable 模态 queries，难以表达 MRI 中 region-level 跨模态 variability；另一类 模态特异 模块 又参数量大，随着模态数增加扩展性差。</p>\n<p><strong>动机</strong>：作者希望把 any-to-any MRI 模态 补全 重新表述为 region-level full-stack code 预测。与其直接像素级生成每个缺失模态，不如先学习完整 MRI 模态集合的紧凑量化表示，再从不完整输入预测这些 full-stack codes，从而获得更细粒度、统一且可扩展的缺失模态补全。</p>\n<p><strong>核心贡献</strong>：提出 CodeBrain，一个用于 virtual full-stack scanning 的 unified brain MRI 补全 框架。CodeBrain 采用两阶段训练：第一阶段学习完整 MRI 模态 set 的 compact representation，将其分解为 模态-agnostic common features 和 region-level scalar-quantised full-stack codes，并能通过解码重建完整模态；第二阶段训练 投影 编码器，从 incomplete 模态 预测 full-stack code map，并通过 grading-based design 适配多种 补全 scenarios。实验在 IXI 和 BraTS 2023 上显示，CodeBrain 超越五种 SOTA 方法，并且补全模态可提升下游 brain 肿瘤 分割。</p>\n<p><strong>方法</strong>：Stage 1 中，CodeBrain 输入完整 MRI 模态集合，编码器 提取共享解剖结构特征，同时将各区域的跨模态特异信息编码为 scalar-quantised codes，例如 (32 \\times 32) region-level code map。解码器 将 common features 与 full-stack codes 结合，重建所有 MRI 模态。Stage 2 中，给定任意不完整模态组合，投影 编码器 学习预测完整 full-stack code map；grading-based 损失 根据不同缺失模式和预测难度约束 code quality。推理时，模型先从可用模态预测 full-stack codes，再与 模态-agnostic features 一起解码出缺失模态。由于条件是区域级量化 codes，而非全局二值标签，CodeBrain 能更好捕获局部组织与病灶在不同模态间的变化关系。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-c1a646f35d1f27bbaa68817667e158d8_1440w.jpg\" /></p>\n<h3>20. Adaptive Anisotropic Gaussian Splatting for Multi-contrast MRI Arbitrary-Scale Super-Resolution with Anatomy Guidance</h3>\n<p><strong>问题</strong>：Multi-对比度 MRI arbitrary-scale SR 需要从低分辨率 目标 对比度 和高分辨率 参考 对比度 恢复任意尺度 HR 目标 image。INR-based 方法能建模连续坐标到像素强度的映射，但存在 spectral bias，倾向于先学习低频内容，难以恢复解剖边界、细小组织结构等高频细节；同时离散 latent grid 的插值类似低通滤波，会进一步削弱高频信息。多对比 MRI 中还存在 参考 与 目标 对比度 之间的解剖一致但强度差异明显的问题。</p>\n<p><strong>动机</strong>：作者希望用 2D Gaussian Splatting 替代 INR 的直接坐标回归，把高频解剖恢复转化为更平滑的 Gaussian 参数 优化。各向异性 Gaussian kernels 可以在边界处变窄捕捉高频，在均匀区域变宽表示低频，从而更适合 MRI 解剖结构建模。</p>\n<p><strong>核心贡献</strong>：提出 GaussM2ASR（Gaussian Multi-对比度 MRI Arbitrary-scale Super-分辨率），一个面向 multi-对比度 MRI arbitrary-scale SR 的 2DGS 框架。方法包含三个 anatomy-guided 模块：Structure 先验 Modulation 融合（SPMF）用于用 参考 image 的统计结构先验增强 目标 features；Anatomy-Guided Dual-Domain Cross Attention（AG-DDCA）联合 spatial-frequency modeling；Anatomy-Guided Gaussian Parametrizer（AGGP）使用 梯度-based 稀疏 attention 将 Gaussian centers 聚焦到关键解剖结构。实验表明，GaussM2ASR 在恢复 fine 解剖 details 方面优于 INR-based SOTA。</p>\n<p><strong>方法</strong>：GaussM2ASR 不直接学习 (I=f(x,y))，而是预测一组 各向异性 2D Gaussian kernels 的参数，包括 center、covariance、opacity 和 intensity / gray value，并通过 Gaussian splatting 渲染 HR 目标。SPMF 首先从 HR 参考 中提取结构统计先验，用于增强 LR 目标 features 并抑制背景区域干扰。AG-DDCA 在空间分支中对齐 目标-参考 解剖结构，在频域分支中强化高频边界线索，使网络学习在边界区域使用窄 Gaussian、在均匀区域使用宽 Gaussian。AGGP 根据 参考 梯度 生成 top-T 稀疏 mask，引导 Gaussian centers 分布在器官边缘、组织交界和病灶结构附近。最终，模型可以在任意 scale 下输出更锐利的 MRI SR 结果。</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-6db94a4140f394c2e7fdf24c578181bd_1440w.jpg\" /></p>\n<h2>findings</h2>\n<ol>\n<li>An Interpretable Alzheimer’s Disease Diagnosis Model via Gray Matter Attention-Guided Counterfactual Reasoning</li>\n<li>PHATE-Net: Differentiable Pseudotime Learning for Trustworthy Disease Trajectories in PET</li>\n<li>BLEG: LLM Functions as Powerful fMRI Graph-Enhancer for Brain Network Analysis</li>\n<li>M3D-BFS: a Multi-stage Dynamic Fusion Strategy for Sample-Adaptive Multi-Modal Brain Network Analysis</li>\n<li>Multimodal Decoupled Dynamic Graph Learning for Brain Disease Diagnosis</li>\n<li>Modality-Aware and Anatomical Vector-Quantized Autoencoding for Multimodal Brain MRI</li>\n<li>Anatomy-Aware Adaptive Feature Perturbation Framework for Semi-Supervised MRI Segmentation</li>\n<li>MHMamba: Multi-Head Mamba for 3D Brain Tumor Segmentation</li>\n<li>Volumetrically Consistent Implicit Atlas Learning via Neural Diffeomorphic Flow for Placenta MRI</li>\n<li>Deep-to-Shallow Knowledge Transfer: Multi-Scale Self-Distillation with Bidirectional Aware for 3D Brain Segmentation</li>\n<li>Personalized Functional Brain Network Modeling with Adaptive Auto-Weighted Learning for Automatic Brain Disorder Diagnosis</li>\n<li>M4Fuse: Lightweight State-Space MoE with a Cross-Scale Gating Bridge for Brain Tumor Segmentation</li>\n</ol>"
    }
  ],
  "graph": {
    "nodes": [
      {
        "id": "unet",
        "x": 100,
        "y": 100,
        "category": "foundation"
      },
      {
        "id": "vnet",
        "x": 160,
        "y": 100,
        "category": "foundation"
      },
      {
        "id": "google_dr",
        "x": 160,
        "y": 350,
        "category": "diagnostic"
      },
      {
        "id": "chexnet",
        "x": 220,
        "y": 350,
        "category": "diagnostic"
      },
      {
        "id": "attention_mil",
        "x": 300,
        "y": 350,
        "category": "diagnostic"
      },
      {
        "id": "unet_pp",
        "x": 300,
        "y": 220,
        "category": "segmentation"
      },
      {
        "id": "attention_unet",
        "x": 300,
        "y": 260,
        "category": "segmentation"
      },
      {
        "id": "segresnet",
        "x": 300,
        "y": 180,
        "category": "segmentation"
      },
      {
        "id": "hovernet",
        "x": 380,
        "y": 350,
        "category": "diagnostic"
      },
      {
        "id": "nnu_net",
        "x": 450,
        "y": 220,
        "category": "segmentation"
      },
      {
        "id": "transunet",
        "x": 530,
        "y": 220,
        "category": "segmentation"
      },
      {
        "id": "swin_unet",
        "x": 530,
        "y": 260,
        "category": "segmentation"
      },
      {
        "id": "clam",
        "x": 530,
        "y": 350,
        "category": "diagnostic"
      },
      {
        "id": "medsam",
        "x": 680,
        "y": 480,
        "category": "foundation_model"
      },
      {
        "id": "medsam_v1",
        "x": 680,
        "y": 520,
        "category": "foundation_model"
      },
      {
        "id": "cihm",
        "x": 820,
        "y": 220,
        "category": "segmentation"
      },
      {
        "id": "deco_mamba",
        "x": 820,
        "y": 260,
        "category": "segmentation"
      },
      {
        "id": "mamba_sam",
        "x": 820,
        "y": 440,
        "category": "foundation_model"
      },
      {
        "id": "medsam2",
        "x": 820,
        "y": 480,
        "category": "foundation_model"
      },
      {
        "id": "uvas",
        "x": 820,
        "y": 300,
        "category": "segmentation"
      },
      {
        "id": "medversa",
        "x": 820,
        "y": 520,
        "category": "foundation_model"
      },
      {
        "id": "uclif",
        "x": 820,
        "y": 560,
        "category": "foundation_model"
      }
    ],
    "edges": [
      {
        "from": "unet",
        "to": "vnet",
        "label": "扩展至3D"
      },
      {
        "from": "unet",
        "to": "unet_pp",
        "label": "密集连接"
      },
      {
        "from": "unet",
        "to": "attention_unet",
        "label": "引入注意力"
      },
      {
        "from": "unet",
        "to": "transunet",
        "label": "Transformer"
      },
      {
        "from": "unet_pp",
        "to": "nnu_net",
        "label": "自动配置"
      },
      {
        "from": "vnet",
        "to": "segresnet",
        "label": "VAE正则化"
      },
      {
        "from": "transunet",
        "to": "swin_unet",
        "label": "纯Transformer"
      },
      {
        "from": "swin_unet",
        "to": "cihm",
        "label": "Mamba替代"
      },
      {
        "from": "cihm",
        "to": "deco_mamba",
        "label": "解码器优化"
      },
      {
        "from": "attention_mil",
        "to": "clam",
        "label": "聚类约束"
      },
      {
        "from": "medsam",
        "to": "medsam_v1",
        "label": "视频式3D"
      },
      {
        "from": "medsam_v1",
        "to": "medsam2",
        "label": "性能提升"
      },
      {
        "from": "medsam",
        "to": "mamba_sam",
        "label": "Mamba融合"
      },
      {
        "from": "medsam2",
        "to": "medversa",
        "label": "通用化"
      },
      {
        "from": "nnu_net",
        "to": "cihm",
        "label": "高效架构"
      },
      {
        "from": "medsam",
        "to": "medsam2",
        "label": "迭代升级"
      },
      {
        "from": "transunet",
        "to": "cihm",
        "label": "线性复杂度"
      },
      {
        "from": "clam",
        "to": "hovernet",
        "label": "细胞级分析"
      }
    ],
    "milestones": [
      {
        "id": "unet",
        "reason": "开创医学分割深度学习时代，U型对称结构成为标准范式"
      },
      {
        "id": "nnu_net",
        "reason": "证明系统配置比单纯架构创新更重要，自配置框架引领实用化"
      },
      {
        "id": "medsam",
        "reason": "医学影像通用分割基础模型，开启医学AI大模型时代"
      }
    ]
  },
  "algos": [
    {
      "id": "unet",
      "num": 1,
      "name": "U-Net",
      "fullName": "U-Net: 医学图像分割的卷积网络 (U-Net: Convolutional Networks for Biomedical Image Segmentation)",
      "year": "2015",
      "org": "弗莱堡大学",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1505.04597",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "U型对称结构与跳跃连接开创医学分割深度学习范式",
      "summary": "U-Net 提出了一种对称的编码器-解码器全卷积网络，通过跳跃连接将浅层高分辨率特征与深层语义特征融合，配合重叠切片策略和弹性形变数据增强，在极少标注样本下实现了精确的生物医学图像分割。\n\n---",
      "keyPoints": [
        "U型对称架构：收缩路径（编码器）逐层提取语义 + 扩展路径（解码器）逐层恢复分辨率，共23层卷积",
        "跳跃连接（Skip Connections）：将编码器高分辨率特征裁剪后与解码器拼接（crop+concat），兼顾上下文与定位",
        "重叠切片策略（Overlap-Tile）：通过镜像填充和重叠patch实现任意大图像的无缝分割",
        "加权损失函数：预计算权重图 <span class=\"kb-math kb-math-inline\">w(\\mathbf{x}) = w_c(\\mathbf{x}) + w_0 \\cdot \\exp(-(d_1+d_2)^2/2\\sigma^2)</span>，强制学习相邻细胞间的分离边界",
        "弹性形变数据增强：在3×3网格上随机位移+双三次插值，模拟组织真实形变，极大扩充训练多样性",
        "训练策略：SGD + 高动量(0.99)、batch size=1、He初始化，NVidia Titan GPU训练仅需10小时",
        "结果：ISBI 2012 EM分割 warping error 0.000353（第一名）；ISBI 2015 细胞追踪 PhC-U373 IOU 92%、DIC-HeLa IOU 77.5%（均第一）"
      ],
      "detail": "<h5>核心架构图</h5>\n<p><img alt=\"U-Net 架构图\" src=\"https://lmb.informatik.uni-freiburg.de/people/ronneber/u-net/u-net-architecture.png\" />\n<em>图：U-Net 网络架构。左侧为收缩路径（编码器），右侧为扩展路径（解码器），灰色箭头为跳跃连接（copy and crop）。蓝色方块表示多通道特征图，白色方块表示复制的特征图。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># U-Net 前向传播与训练伪代码\nclass UNet:\n    def __init__(self):\n        # Encoder (contracting path)\n        self.enc1 = DoubleConv(1, 64)       # 572→568→564\n        self.enc2 = DoubleConv(64, 128)     # 280→276→272\n        self.enc3 = DoubleConv(128, 256)    # 136→132→128\n        self.enc4 = DoubleConv(256, 512)    # 64→60→56\n        self.bottleneck = DoubleConv(512, 1024)  # 28→24→20\n\n        # Decoder (expansive path)\n        self.up4 = UpBlock(1024, 512)\n        self.up3 = UpBlock(512, 256)\n        self.up2 = UpBlock(256, 128)\n        self.up1 = UpBlock(128, 64)\n        self.final = Conv1x1(64, n_classes)\n\n    def forward(self, x):\n        # Encoder: extract multi-scale features\n        e1 = self.enc1(x)\n        e2 = self.enc2(max_pool_2x2(e1))\n        e3 = self.enc3(max_pool_2x2(e2))\n        e4 = self.enc4(max_pool_2x2(e3))\n        b  = self.bottleneck(max_pool_2x2(e4))\n\n        # Decoder: upsample + skip connection (crop &amp; concat)\n        d4 = self.up4(b, center_crop(e4))\n        d3 = self.up3(d4, center_crop(e3))\n        d2 = self.up2(d3, center_crop(e2))\n        d1 = self.up1(d2, center_crop(e1))\n\n        return self.final(d1)  # 1×1 conv → pixel-wise classification\n\n# 训练循环\nfor each image, label in training_set:\n    patch = extract_overlap_tile_patch(image)  # 572×572\n    weight_map = compute_weight_map(label)\n    pred = unet.forward(patch)\n    loss = weighted_pixel_cross_entropy(pred, label, weight_map)\n    sgd_update(loss, momentum=0.99)\n</code></pre>\n<h5>动机与背景</h5>\n<p>生物医学图像分割面临两大核心挑战：<strong>(1)</strong> 标注数据极度稀缺（通常仅数十张带标注图像）；<strong>(2)</strong> 需要像素级精确定位，尤其是相邻细胞的边界分离。</p>\n<p>此前的主流方法是 Ciresan et al. 的滑动窗口方法——对每个像素取其周围patch送入分类网络。该方法有两个致命缺陷：\n- <strong>速度极慢</strong>：相邻patch高度重叠导致大量冗余计算\n- <strong>上下文与定位的矛盾</strong>：大patch提供上下文但定位模糊，小patch定位精确但缺乏语义</p>\n<div class=\"key-point\">💡 关键：U-Net的核心洞察是——不需要在上下文和定位之间做取舍，通过跳跃连接可以<strong>同时获得两者</strong>。</div>\n<h5>核心机制详解</h5>\n<p><strong>1. 收缩路径（Contracting Path / 编码器）</strong></p>\n<p>遵循典型CNN结构，每个层级包含：\n- 两个 3×3 卷积（valid，无padding）+ ReLU\n- 一个 2×2 max pooling（stride=2）下采样\n- 通道数翻倍：64 → 128 → 256 → 512 → 1024</p>\n<p>每次下采样使空间分辨率减半，感受野倍增，逐步从局部纹理到全局语义。</p>\n<p><strong>2. 扩展路径（Expansive Path / 解码器）</strong></p>\n<p>对称地恢复分辨率：\n- 2×2 上卷积（up-convolution / transposed convolution），通道数减半\n- 与编码器对应层特征进行 <strong>center crop + channel concatenation</strong>\n- 两个 3×3 卷积 + ReLU</p>\n<p><strong>3. 跳跃连接的设计选择</strong></p>\n<p>为什么用 <strong>拼接（concat）</strong> 而非 <strong>相加（add）</strong>？</p>\n<p>拼接保留了编码器和解码器特征的完整独立信息，通道数翻倍后由后续卷积自主学习融合策略。相加则隐式假设两组特征在同一表示空间中对齐，约束更强、信息损失更大。</p>\n<p>裁剪（crop）是因为 valid convolution 导致每层特征图尺寸缩小，编码器特征图比解码器对应层更大，需要中心裁剪对齐。</p>\n<p><strong>4. 重叠切片策略（Overlap-Tile）</strong></p>\n<p>对于超出GPU显存的大图像：</p>\n<div class=\"kb-math kb-math-display\">\\text{overlap} = \\frac{\\text{input\\_size} - \\text{output\\_size}}{2} = \\frac{572 - 388}{2} = 92 \\text{ pixels}</div>\n<ul>\n<li>相邻patch重叠92像素，仅取中心388×388区域作为有效输出</li>\n<li>图像边界使用镜像填充（mirror padding）补充上下文</li>\n<li>拼接后实现完整图像的无缝分割</li>\n</ul>\n<p><strong>5. 加权损失函数</strong></p>\n<div class=\"kb-math kb-math-display\">w(\\mathbf{x}) = w_c(\\mathbf{x}) + w_0 \\cdot \\exp\\left(-\\frac{(d_1(\\mathbf{x}) + d_2(\\mathbf{x}))^2}{2\\sigma^2}\\right)</div>\n<ul>\n<li><span class=\"kb-math kb-math-inline\">w_c(\\mathbf{x})</span>：类别频率平衡权重，补偿前景/背景不均衡</li>\n<li><span class=\"kb-math kb-math-inline\">d_1(\\mathbf{x})</span>：像素到最近细胞边界的距离</li>\n<li><span class=\"kb-math kb-math-inline\">d_2(\\mathbf{x})</span>：像素到第二近细胞边界的距离</li>\n<li><span class=\"kb-math kb-math-inline\">w_0 = 10</span>，<span class=\"kb-math kb-math-inline\">\\sigma \\approx 5</span> 像素</li>\n</ul>\n<div class=\"warn-box\">⚠️ 注意：使用 <span class=\"kb-math kb-math-inline\">d_1 + d_2</span> 而非仅 <span class=\"kb-math kb-math-inline\">d_1</span> 的关键在于——只有当像素同时靠近<strong>两个不同细胞</strong>时（即位于细胞间隙），<span class=\"kb-math kb-math-inline\">d_1+d_2</span> 才会很小，权重才会很高。这精确地将学习压力聚焦在最难分割的接触区域。</div>\n<p><strong>6. 弹性形变数据增强</strong></p>\n<p>这是论文最重要的实践创新之一：\n- 在粗糙的 3×3 网格点上采样随机位移向量（标准差 σ=10 像素）\n- 通过双三次插值（bicubic interpolation）生成逐像素的平滑位移场\n- 对图像和标注同时施加相同形变</p>\n<p>该方法模拟了生物组织的真实弹性变形，使网络对形态变异具有不变性，在仅有~30张训练图像时效果尤为显著。</p>\n<h5>训练细节与设计决策</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>超参数</th>\n<th>值</th>\n<th>设计理由</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Batch size</td>\n<td>1</td>\n<td>使用大patch(572×572)充分利用GPU显存</td>\n</tr>\n<tr>\n<td>Momentum</td>\n<td>0.99</td>\n<td>高动量补偿batch size=1的梯度噪声</td>\n</tr>\n<tr>\n<td>权重初始化</td>\n<td>He: <span class=\"kb-math kb-math-inline\">\\mathcal{N}(0, \\sqrt{2/N})</span></td>\n<td>适配ReLU激活，防止梯度消失</td>\n</tr>\n<tr>\n<td>无padding</td>\n<td>Valid conv</td>\n<td>避免边界伪影，每个输出像素有完整上下文</td>\n</tr>\n<tr>\n<td>最终层</td>\n<td>1×1卷积</td>\n<td>将64维特征映射到类别数，参数高效</td>\n</tr>\n</tbody>\n</table></div>\n<h5>实验结果</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>数据集</th>\n<th>指标</th>\n<th>U-Net</th>\n<th>次优方法</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>ISBI 2012 EM Segmentation</td>\n<td>Warping Error ↓</td>\n<td><strong>0.000353</strong></td>\n<td>0.000420</td>\n</tr>\n<tr>\n<td>ISBI 2012 EM Segmentation</td>\n<td>Rand Error ↓</td>\n<td><strong>0.0382</strong></td>\n<td>0.0611</td>\n</tr>\n<tr>\n<td>ISBI 2015 Cell Tracking (PhC-U373)</td>\n<td>IOU ↑</td>\n<td><strong>92%</strong></td>\n<td>83%</td>\n</tr>\n<tr>\n<td>ISBI 2015 Cell Tracking (DIC-HeLa)</td>\n<td>IOU ↑</td>\n<td><strong>77.5%</strong></td>\n<td>46%</td>\n</tr>\n</tbody>\n</table></div>\n<p>分割速度：512×512 图像不到1秒（NVidia Titan GPU）。</p>\n<h5>与前序工作的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方面</th>\n<th>滑动窗口(Ciresan 2012)</th>\n<th>FCN(Long 2015)</th>\n<th>U-Net</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>推理方式</td>\n<td>逐像素patch分类</td>\n<td>全图全卷积</td>\n<td>全图全卷积</td>\n</tr>\n<tr>\n<td>速度</td>\n<td>极慢（冗余计算）</td>\n<td>快</td>\n<td>快</td>\n</tr>\n<tr>\n<td>多尺度融合</td>\n<td>无</td>\n<td>相加（sum）</td>\n<td>拼接（concat）</td>\n</tr>\n<tr>\n<td>解码器</td>\n<td>无</td>\n<td>简单上采样</td>\n<td>对称扩展路径</td>\n</tr>\n<tr>\n<td>小样本适应</td>\n<td>差</td>\n<td>一般</td>\n<td>优（弹性形变）</td>\n</tr>\n<tr>\n<td>边界处理</td>\n<td>无</td>\n<td>无</td>\n<td>加权损失</td>\n</tr>\n</tbody>\n</table></div>\n<hr />",
      "quiz": {
        "q": "U-Net 权重图公式中同时使用 d1 和 d2（到最近和次近细胞边界的距离）的主要目的是什么？",
        "options": [
          "增大所有边界像素的损失权重，提升整体边界精度",
          "仅对两个细胞之间的狭窄间隙赋予高权重，强制学习细胞分离",
          "平衡前景与背景的类别不均衡问题",
          "减少距离计算的复杂度，用两个距离近似形态学操作"
        ],
        "answer": 1,
        "explain": "d1+d2 仅在像素同时靠近两个不同细胞时才很小（即位于细胞间隙），此时指数项接近 w0=10，赋予极高权重。单个细胞边界处 d2 很大，权重不会显著增加。这精确地将学习压力聚焦在相邻细胞的接触/分离区域。"
      }
    },
    {
      "id": "vnet",
      "num": 2,
      "name": "V-Net",
      "fullName": "V-Net: 体积医学图像分割的全卷积网络 (V-Net: Fully Convolutional Neural Networks for Volumetric Medical Image Segmentation)",
      "year": "2016",
      "org": "Fausto Milletari",
      "parent": "unet",
      "paperUrl": "https://arxiv.org/abs/1606.04797",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "首个3D体积分割网络引入Dice Loss解决类别不平衡",
      "summary": "V-Net 提出了基于 3D 卷积的端到端编码器-解码器网络架构，并引入基于 Dice 系数的损失函数，解决了体积医学图像分割中前景/背景严重不平衡的问题，实现了对 MRI 前列腺的高精度自动分割。",
      "keyPoints": [
        "<strong>3D 编码器-解码器架构</strong>：将 U-Net 的 2D 结构扩展为全 3D 卷积网络，直接处理体积数据而非逐切片分割",
        "<strong>残差学习模块</strong>：每个阶段内部使用残差连接（类似 ResNet），加速收敛并提升梯度传播",
        "<strong>跳跃连接（Skip Connection）</strong>：编码器特征通过跳跃连接传递到解码器对应层，保留细粒度空间信息",
        "<strong>Dice-based 损失函数</strong>：提出基于 Dice 系数的可微分损失函数，无需手动设定类别权重即可处理严重类别不平衡",
        "<strong>随机非线性形变数据增强</strong>：使用密集位移场对训练数据进行随机弹性形变，大幅扩充有限的医学影像训练集",
        "<strong>PROMISE 2012 前列腺分割挑战</strong>：在 50 例训练 / 30 例测试的 MRI 数据集上验证，Dice 达到 0.869"
      ],
      "detail": "<h5>核心架构图</h5>\n<p><img alt=\"V-Net 网络架构\" src=\"https://ar5iv.labs.arxiv.org/html/1606.04797/assets/x1.png\" />\n<em>图：V-Net 编码器-解码器架构。左侧为压缩路径（编码器），右侧为解压路径（解码器），水平箭头表示跳跃连接。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># V-Net 前向传播伪代码\ndef vnet_forward(volume_128x128x64):\n    # === 编码器（压缩路径）===\n    # Stage 1: 1个5x5x5 conv + residual, 16 channels\n    x1 = conv3d_5x5x5(volume, out_ch=16)\n    x1 = x1 + input_repeated  # residual connection\n    x1 = PReLU(x1)\n\n    # Downsampling: 2x2x2 conv, stride 2\n    down1 = conv3d_2x2x2_stride2(x1, out_ch=32)\n\n    # Stage 2: 2个5x5x5 conv + residual, 32 channels\n    x2 = residual_block(down1, n_convs=2)\n    down2 = conv3d_2x2x2_stride2(x2, out_ch=64)\n\n    # Stage 3: 3个5x5x5 conv + residual, 64 channels\n    x3 = residual_block(down2, n_convs=3)\n    down3 = conv3d_2x2x2_stride2(x3, out_ch=128)\n\n    # Stage 4: 3个5x5x5 conv + residual, 128 channels\n    x4 = residual_block(down3, n_convs=3)\n    down4 = conv3d_2x2x2_stride2(x4, out_ch=256)\n\n    # Stage 5 (bottleneck): 3个5x5x5 conv + residual, 256 channels\n    x5 = residual_block(down4, n_convs=3)\n\n    # === 解码器（解压路径）===\n    # Upsampling: 2x2x2 deconv, stride 2\n    up4 = deconv3d_2x2x2_stride2(x5, out_ch=128)\n    up4 = concat(up4, x4)  # skip connection\n    d4 = residual_block(up4, n_convs=3)\n\n    up3 = deconv3d_2x2x2_stride2(d4, out_ch=64)\n    up3 = concat(up3, x3)\n    d3 = residual_block(up3, n_convs=3)\n\n    up2 = deconv3d_2x2x2_stride2(d3, out_ch=32)\n    up2 = concat(up2, x2)\n    d2 = residual_block(up2, n_convs=2)\n\n    up1 = deconv3d_2x2x2_stride2(d2, out_ch=16)\n    up1 = concat(up1, x1)\n    d1 = residual_block(up1, n_convs=1)\n\n    # 输出: 1x1x1 conv → softmax\n    output = conv3d_1x1x1(d1, out_ch=2)\n    return softmax(output)\n</code></pre>\n<h5>动机与背景</h5>\n<p>医学影像中的体积分割（如 MRI 前列腺分割）面临两大核心挑战：</p>\n<ol>\n<li>\n<p><strong>2D 方法的局限性</strong>：传统方法逐切片处理 3D 数据，丢失了切片间的空间连续性信息。虽然 U-Net 在 2D 医学图像分割中取得了巨大成功，但直接将其应用于体积数据需要逐层处理再拼接，效率低且无法利用 3D 上下文。</p>\n</li>\n<li>\n<p><strong>类别不平衡问题</strong>：在前列腺 MRI 中，前景体素（前列腺区域）仅占整个体积的很小比例，背景体素占绝对多数。使用标准交叉熵损失时，网络倾向于预测所有体素为背景以最小化损失，导致分割性能极差。</p>\n</li>\n</ol>\n<div class=\"key-point\">💡 关键：V-Net 同时解决了这两个问题——用 3D 卷积处理空间连续性，用 Dice 损失处理类别不平衡。</div>\n<h5>核心机制详解</h5>\n<p><strong>1. 3D 编码器-解码器架构</strong></p>\n<p>V-Net 采用对称的编码器-解码器结构，整体分为压缩路径（左侧）和解压路径（右侧）：</p>\n<ul>\n<li>\n<p><strong>压缩路径</strong>：包含 5 个阶段，每阶段由 1-3 个 <span class=\"kb-math kb-math-inline\">5 \\times 5 \\times 5</span> 卷积层组成。阶段间通过 <span class=\"kb-math kb-math-inline\">2 \\times 2 \\times 2</span> 步长为 2 的卷积实现下采样，分辨率逐步减半，通道数逐步加倍（16→32→64→128→256）。</p>\n</li>\n<li>\n<p><strong>解压路径</strong>：同样 5 个阶段，使用 <span class=\"kb-math kb-math-inline\">2 \\times 2 \\times 2</span> 反卷积（步长 2）进行上采样，分辨率逐步恢复。每个阶段接收来自编码器对应层的跳跃连接特征。</p>\n</li>\n<li>\n<p><strong>残差连接</strong>：每个阶段内部，输入通过卷积层处理后与原始输入相加（element-wise addition），形成残差学习。这确保了每个阶段学习的是残差函数而非完整映射，加速了收敛。</p>\n</li>\n</ul>\n<div class=\"warn-box\">⚠️ 注意：V-Net 使用 PReLU（Parametric ReLU）而非标准 ReLU 作为激活函数，且在卷积后不使用 Batch Normalization。</div>\n<p><strong>2. Dice-based 损失函数</strong></p>\n<p>这是 V-Net 最重要的贡献之一。Dice 系数定义为两个集合的重叠度量：</p>\n<div class=\"kb-math kb-math-display\">D = \\frac{2 \\sum_{i}^{N} p_i g_i}{\\sum_{i}^{N} p_i^2 + \\sum_{i}^{N} g_i^2}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">p_i \\in [0,1]</span> 是网络对第 <span class=\"kb-math kb-math-inline\">i</span> 个体素的预测概率，<span class=\"kb-math kb-math-inline\">g_i \\in \\{0,1\\}</span> 是对应的真实标签。</p>\n<p>损失函数定义为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = 1 - D</div>\n<p>其梯度为：</p>\n<div class=\"kb-math kb-math-display\">\\frac{\\partial D}{\\partial p_j} = 2 \\left[ \\frac{g_j \\left(\\sum_{i}^{N} p_i^2 + \\sum_{i}^{N} g_i^2\\right) - 2p_j \\left(\\sum_{i}^{N} p_i g_i\\right)}{\\left(\\sum_{i}^{N} p_i^2 + \\sum_{i}^{N} g_i^2\\right)^2} \\right]</div>\n<div class=\"key-point\">💡 关键：Dice 损失的核心优势在于它天然地对前景和背景的相对比例不敏感。无论前景占 1% 还是 50%，Dice 系数都在 [0,1] 范围内衡量重叠质量，无需人工设定类别权重。</div>\n<p><strong>3. 数据增强策略</strong></p>\n<p><img alt=\"数据增强示意\" src=\"https://ar5iv.labs.arxiv.org/html/1606.04797/assets/x3.png\" />\n<em>图：随机非线性形变数据增强。左侧为原始切片，右侧为形变后的切片。</em></p>\n<p>V-Net 使用基于密集位移场的随机弹性形变进行数据增强：\n- 在 <span class=\"kb-math kb-math-inline\">2 \\times 2 \\times 2</span> 的稀疏控制点网格上生成随机位移\n- 通过 B-spline 插值得到密集的位移场\n- 同时对图像和标注进行相同的非线性变换\n- 每个训练迭代中实时生成新的形变，等效于无限量的训练数据</p>\n<h5>训练与推理流程</h5>\n<p><strong>训练配置</strong>：\n- 输入尺寸：<span class=\"kb-math kb-math-inline\">128 \\times 128 \\times 64</span> 体素\n- 批量大小：2（受 GPU 显存限制）\n- 优化器：SGD，动量 0.99，初始学习率 0.0001，每 25K 迭代衰减 10 倍\n- 训练时长：约 48 小时 / 30K 迭代\n- 预处理：N4 偏置场校正 + 重采样至 <span class=\"kb-math kb-math-inline\">1 \\times 1 \\times 1.5</span> mm 分辨率</p>\n<p><strong>推理速度</strong>：对一个新体积的分割仅需约 1 秒。</p>\n<h5>实验结果</h5>\n<p>在 PROMISE 2012 前列腺分割挑战赛上的对比结果：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>Avg. Dice</th>\n<th>Avg. Hausdorff (mm)</th>\n<th>Challenge Score</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>V-Net + Dice loss</strong></td>\n<td><strong>0.869 ± 0.033</strong></td>\n<td><strong>5.71 ± 1.20</strong></td>\n<td><strong>82.39</strong></td>\n</tr>\n<tr>\n<td>V-Net + logistic loss</td>\n<td>0.739 ± 0.088</td>\n<td>10.55 ± 5.38</td>\n<td>63.30</td>\n</tr>\n<tr>\n<td>Imorphics (第一名)</td>\n<td>0.879 ± 0.044</td>\n<td>5.935 ± 2.14</td>\n<td>84.36</td>\n</tr>\n<tr>\n<td>ScrAutoProstate</td>\n<td>0.874 ± 0.036</td>\n<td>5.58 ± 1.49</td>\n<td>83.49</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键发现：Dice 损失相比标准多项式逻辑损失带来了巨大提升（Dice 从 0.739 → 0.869），验证了其在类别不平衡场景下的有效性。V-Net 性能接近当时的最优方法（Imorphics），但后者使用了更复杂的多阶段流程。</div>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>U-Net (2D)</th>\n<th>V-Net (3D)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>输入维度</td>\n<td>2D 切片</td>\n<td>3D 体积</td>\n</tr>\n<tr>\n<td>卷积核</td>\n<td>3×3</td>\n<td>5×5×5</td>\n</tr>\n<tr>\n<td>阶段内连接</td>\n<td>无（直接堆叠）</td>\n<td>残差连接</td>\n</tr>\n<tr>\n<td>下采样</td>\n<td>Max Pooling</td>\n<td>步长为 2 的卷积</td>\n</tr>\n<tr>\n<td>损失函数</td>\n<td>加权交叉熵</td>\n<td>Dice 系数损失</td>\n</tr>\n<tr>\n<td>数据增强</td>\n<td>2D 弹性形变</td>\n<td>3D 弹性形变（密集位移场）</td>\n</tr>\n</tbody>\n</table></div>\n<p>V-Net 的主要创新在于：(1) 用可学习的卷积下采样替代不可学习的池化操作；(2) 引入残差学习加速深层 3D 网络的训练；(3) 提出 Dice 损失彻底解决类别不平衡问题，避免了手动调整损失权重的繁琐过程。</p>",
      "quiz": {
        "q": "V-Net 提出的 Dice 损失函数相比标准交叉熵损失的核心优势是什么？",
        "options": [
          "计算速度更快，减少训练时间",
          "天然处理类别不平衡，无需手动设定前景/背景权重",
          "梯度更稳定，不会出现梯度消失",
          "可以同时优化多个分割目标"
        ],
        "answer": 1,
        "explain": "Dice 损失直接优化预测与真实标注的重叠度，其计算方式使得前景/背景比例不影响损失值范围，因此无需像加权交叉熵那样手动设定类别权重来平衡不同类别的贡献。"
      }
    },
    {
      "id": "google_dr",
      "num": 3,
      "name": "Google DR",
      "fullName": "Google糖尿病视网膜病变检测 (Development and Validation of a Deep Learning Algorithm for Detection of Diabetic Retinopathy)",
      "year": "2016",
      "org": "Google Health",
      "parent": "—",
      "paperUrl": "https://jamanetwork.com/journals/jama/fullarticle/2588763",
      "projectUrl": "",
      "category": "diagnostic",
      "motivation": "眼底影像DR检测达眼科专家水平开启AI筛查应用",
      "summary": "本文使用 Inception-v3 深度学习模型，在 128,175 张由 54 名眼科医生标注的视网膜眼底照片上训练，实现了对可转诊糖尿病视网膜病变（referable DR）的自动检测，在 EyePACS-1 和 Messidor-2 两个临床验证集上分别取得 AUC 0.991 和 0.990 的优异性能，达到甚至超越眼科专家水平。",
      "keyPoints": [
        "<strong>骨干网络</strong>：采用 Google 提出的 Inception-v3 架构，利用多尺度卷积模块（Inception Module）高效提取视网膜病变特征",
        "<strong>大规模专家标注</strong>：128,175 张视网膜眼底照片，每张由 3–7 名美国执业眼科医生独立标注，以多数投票作为参考标准",
        "<strong>临床级验证</strong>：在两个独立验证集上评估——EyePACS-1（9,963 张，AUC=0.991）和 Messidor-2（1,748 张，AUC=0.990）",
        "<strong>双任务检测</strong>：同时检测可转诊糖尿病视网膜病变（moderate NPDR 及以上）和糖尿病黄斑水肿（DME）",
        "<strong>双操作点设计</strong>：提供高灵敏度（≥97.5%）和高特异度（≥98%）两个临床操作点，适配不同筛查场景",
        "<strong>迁移学习</strong>：在 ImageNet 预训练权重基础上微调，有效解决医学影像领域标注数据相对不足的问题"
      ],
      "detail": "<h5>核心架构示意图</h5>\n<p><img alt=\"Inception-v3 网络架构概览\" src=\"https://ar5iv.labs.arxiv.org/html/1512.00567/assets/x1.png\" />\n<em>图：Inception-v3 网络整体架构（来源：Szegedy et al., 2016）。本文基于该架构，将最后的分类层替换为 DR 二分类输出，在 128,175 张眼科专家标注的视网膜眼底照片上端到端微调。</em></p>\n<blockquote>\n<p>📌 <strong>注</strong>：原论文发表于 JAMA，其图片受版权保护。上图为 Inception-v3 原始论文的架构示意。完整的 DR 检测流程为：视网膜眼底照片 → 预处理（299×299） → Inception-v3 特征提取 → 全局平均池化 → 全连接层 → sigmoid → 可转诊 DR 概率输出。</p>\n</blockquote>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Google DR Detection 训练与推理流程伪代码\n\n# === 模型构建 ===\nmodel = InceptionV3(pretrained=&quot;imagenet&quot;)\n# 替换最后全连接层: 2048 -&gt; 1 (二分类: referable DR vs. not)\nmodel.fc = Linear(2048, 1)\nactivation = Sigmoid()\n\n# === 数据标注流程 ===\ndef create_reference_standard(image, ophthalmologists):\n    &quot;&quot;&quot;每张图像由多名眼科医生独立标注，多数投票决定标签&quot;&quot;&quot;\n    grades = [doc.grade(image) for doc in ophthalmologists]  # 3-7名医生\n    # 按ICDR量表: 0=无DR, 1=轻度, 2=中度, 3=重度, 4=增殖性\n    majority_grade = majority_vote(grades)\n    referable_dr = (majority_grade &gt;= 2)  # 中度及以上为可转诊\n    return referable_dr\n\n# === 数据预处理与增强 ===\ndef preprocess(image):\n    image = resize(image, (299, 299))          # Inception-v3 标准输入尺寸\n    image = normalize(image)                    # 像素归一化\n    if training:\n        image = random_crop(image)              # 随机裁剪\n        image = random_horizontal_flip(image)   # 水平翻转\n        image = random_vertical_flip(image)     # 垂直翻转（眼底图像无固定方向）\n        image = color_augmentation(image,       # 颜色扰动\n                    brightness=0.1, saturation=0.1, hue=0.05)\n    return image\n\n# === 训练循环 ===\noptimizer = SGD(model.parameters(), lr=initial_lr, momentum=0.9)\n\nfor epoch in range(num_epochs):\n    for batch_images, batch_labels in train_loader:\n        # batch_labels: 0/1 (non-referable / referable DR)\n        images = preprocess(batch_images)\n        logits = model(images)                          # (B, 1)\n        probs = sigmoid(logits)                         # (B, 1)\n        loss = binary_cross_entropy(probs, batch_labels)\n        optimizer.zero_grad()\n        loss.backward()\n        optimizer.step()\n\n    # 学习率衰减策略\n    adjust_learning_rate(optimizer, epoch)\n\n    # 在验证集上评估\n    val_auc = compute_auc(model, val_loader)\n\n# === 推理与操作点选择 ===\ndef predict(image, operating_point=&quot;high_sensitivity&quot;):\n    prob = sigmoid(model(preprocess(image)))\n    if operating_point == &quot;high_sensitivity&quot;:\n        threshold = 0.5   # 灵敏度 ≥ 97.5%\n    elif operating_point == &quot;high_specificity&quot;:\n        threshold = 0.9   # 特异度 ≥ 98%\n    return prob &gt;= threshold, prob\n</code></pre>\n<h5>动机与背景</h5>\n<p>糖尿病视网膜病变（Diabetic Retinopathy, DR）是全球工作年龄人群致盲的首要原因。全球约有 4.15 亿糖尿病患者，其中约三分之一存在不同程度的 DR，且大量患者因缺乏定期眼底筛查而延误治疗。早期发现和及时治疗可以将 DR 导致的严重视力丧失风险降低 95% 以上。</p>\n<p>然而，DR 筛查面临严峻的人力瓶颈：\n- 眼底照片的判读需要经过专业训练的眼科医生\n- 在印度等发展中国家，眼科医生与患者比例严重不足（约 1:70,000）\n- 即使在发达国家，约 50% 的糖尿病患者未能接受推荐的年度眼底检查\n- 人工判读存在观察者间变异性，不同医生对同一张眼底照片的诊断可能不一致</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：本文的核心动机是构建一个能在大规模筛查场景中替代或辅助眼科医生的自动化 DR 检测系统，通过深度学习实现高灵敏度、高特异度的诊断，从而扩大 DR 筛查的覆盖面，尤其惠及医疗资源匮乏地区。</div>\n<h5>核心机制详解</h5>\n<p><strong>1. Inception-v3 骨干网络</strong></p>\n<p>本文选择 Inception-v3 作为特征提取器。Inception 架构的核心思想是<strong>多尺度并行卷积</strong>：在同一层内同时使用 <span class=\"kb-math kb-math-inline\">1 \\times 1</span>、<span class=\"kb-math kb-math-inline\">3 \\times 3</span>、<span class=\"kb-math kb-math-inline\">5 \\times 5</span>（分解为两个 <span class=\"kb-math kb-math-inline\">3 \\times 3</span>）等不同尺寸的卷积核，再将输出沿通道维度拼接。这种设计使网络能够同时捕获不同尺度的特征——对于 DR 检测尤为重要，因为视网膜病变的形态跨越多个尺度：</p>\n<ul>\n<li><strong>微动脉瘤</strong>（Microaneurysms）：极小的点状病变（~20-100μm），需要细粒度特征</li>\n<li><strong>出血斑</strong>（Hemorrhages）：中等尺度的斑块状病变</li>\n<li><strong>新生血管</strong>（Neovascularization）：大范围的血管异常增生</li>\n<li><strong>硬性渗出</strong>（Hard Exudates）：黄白色脂质沉积</li>\n</ul>\n<p>Inception-v3 相比前代改进包括：（1）将 <span class=\"kb-math kb-math-inline\">5 \\times 5</span> 卷积分解为两个 <span class=\"kb-math kb-math-inline\">3 \\times 3</span> 卷积以降低计算量；（2）将 <span class=\"kb-math kb-math-inline\">n \\times n</span> 卷积分解为 <span class=\"kb-math kb-math-inline\">1 \\times n</span> 和 <span class=\"kb-math kb-math-inline\">n \\times 1</span> 的非对称卷积；（3）引入辅助分类器和标签平滑正则化。模型输入尺寸为 <span class=\"kb-math kb-math-inline\">299 \\times 299</span>，最终全局平均池化后输出 2048 维特征向量。</p>\n<p><strong>2. 大规模专家标注体系</strong></p>\n<p>本文在标注质量上投入了巨大努力，这是该工作区别于一般深度学习研究的关键特色：</p>\n<ul>\n<li><strong>标注团队</strong>：54 名美国执业眼科医生和高年资眼科住院医师</li>\n<li><strong>标注标准</strong>：基于国际临床糖尿病视网膜病变（ICDR）分级量表</li>\n<li>Grade 0：无 DR</li>\n<li>Grade 1：轻度非增殖性 DR（Mild NPDR）</li>\n<li>Grade 2：中度非增殖性 DR（Moderate NPDR）→ <strong>可转诊</strong></li>\n<li>Grade 3：重度非增殖性 DR（Severe NPDR）→ <strong>可转诊</strong></li>\n<li>Grade 4：增殖性 DR（PDR）→ <strong>可转诊</strong></li>\n<li><strong>多轮标注</strong>：训练集每张图像由 3–7 名医生标注；验证集每张图像由 7–8 名医生标注，以多数投票作为参考标准</li>\n<li><strong>质量控制</strong>：对标注者进行一致性评估，剔除一致性过低的标注者</li>\n</ul>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：参考标准的质量直接决定了模型性能的上限。本文通过多名专家多数投票构建参考标准，比单一专家标注更加可靠，但也意味着模型学习的是\"专家共识\"而非绝对真实的病理状态。</div>\n<p><strong>3. 损失函数与训练策略</strong></p>\n<p>对于可转诊 DR 的二分类任务，使用标准的二元交叉熵损失：</p>\n<div class=\"kb-math kb-math-display\">L(X, y) = -[y \\log p(Y=1|X) + (1-y) \\log p(Y=0|X)]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">p(Y=1|X)</span> 是模型预测图像包含可转诊 DR 的概率。</p>\n<p>训练策略包括：\n- <strong>迁移学习</strong>：从 ImageNet 预训练权重初始化，端到端微调所有层\n- <strong>数据增强</strong>：随机裁剪、水平/垂直翻转、颜色扰动（亮度、饱和度、色调）\n- <strong>正则化</strong>：Dropout、权重衰减\n- <strong>集成学习</strong>：训练多个模型取预测概率的平均值，提高鲁棒性</p>\n<p><strong>4. 双操作点临床设计</strong></p>\n<p>不同于一般的分类任务使用固定阈值，本文为临床应用设计了两个操作点：</p>\n<ul>\n<li><strong>高灵敏度操作点</strong>：优先保证不漏诊，适用于大规模筛查场景</li>\n<li>EyePACS-1：灵敏度 97.5%，特异度 93.4%</li>\n<li>Messidor-2：灵敏度 96.1%，特异度 93.9%</li>\n<li><strong>高特异度操作点</strong>：优先减少误诊，适用于需要高确信度的场景</li>\n<li>EyePACS-1：灵敏度 87.0%，特异度 98.5%</li>\n<li>Messidor-2：灵敏度 87.0%，特异度 98.5%</li>\n</ul>\n<p>这种设计体现了深度学习模型在临床部署中的灵活性——通过调整决策阈值，可以在灵敏度和特异度之间权衡，适配不同的临床需求。</p>\n<h5>训练与推理流程</h5>\n<p><strong>训练阶段</strong>：\n1. <strong>数据准备</strong>：128,175 张视网膜眼底照片，来自 EyePACS 和其他三家眼科医院，按患者划分训练/验证集，确保无患者重叠\n2. <strong>标注获取</strong>：每张图像由 3–7 名眼科医生按 ICDR 量表独立标注 DR 等级和是否存在 DME\n3. <strong>预处理</strong>：图像缩放至 <span class=\"kb-math kb-math-inline\">299 \\times 299</span>，归一化，训练时施加数据增强\n4. <strong>模型训练</strong>：Inception-v3 在 ImageNet 预训练后端到端微调，使用 SGD 优化器\n5. <strong>模型选择</strong>：在验证集上选择 AUC 最高的模型</p>\n<p><strong>推理阶段</strong>：\n1. 输入 <span class=\"kb-math kb-math-inline\">299 \\times 299</span> 的视网膜眼底照片\n2. 通过 Inception-v3 提取 2048 维特征\n3. 全连接层 + sigmoid 输出可转诊 DR 概率\n4. 根据选定的操作点（高灵敏度/高特异度）确定诊断结果</p>\n<p><strong>评估方法</strong>：\n- <strong>主要指标</strong>：AUC（ROC 曲线下面积），不依赖特定阈值\n- <strong>操作点指标</strong>：灵敏度、特异度，在特定阈值下评估\n- <strong>与专家对比</strong>：将模型性能与 8 名眼科医生在相同验证集上的表现进行比较，模型的 ROC 曲线位于大多数眼科医生操作点的上方</p>\n<h5>与先前工作的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方面</th>\n<th>传统机器学习方法</th>\n<th>先前深度学习方法</th>\n<th><strong>Google DR (本文)</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>特征提取</td>\n<td>手工设计特征（SIFT, 形态学等）</td>\n<td>CNN 自动学习</td>\n<td><strong>Inception-v3 自动学习</strong></td>\n</tr>\n<tr>\n<td>训练数据量</td>\n<td>数百至数千张</td>\n<td>数千至数万张</td>\n<td><strong>128,175 张</strong></td>\n</tr>\n<tr>\n<td>标注质量</td>\n<td>单一标注者</td>\n<td>单一/少量标注者</td>\n<td><strong>54 名眼科医生，多数投票</strong></td>\n</tr>\n<tr>\n<td>验证规模</td>\n<td>小规模（&lt;500 张）</td>\n<td>中等规模</td>\n<td><strong>两个独立验证集（共 11,711 张）</strong></td>\n</tr>\n<tr>\n<td>EyePACS-1 AUC</td>\n<td>~0.85–0.90</td>\n<td>~0.93–0.95</td>\n<td><strong>0.991</strong></td>\n</tr>\n<tr>\n<td>Messidor-2 AUC</td>\n<td>~0.85–0.90</td>\n<td>~0.93–0.95</td>\n<td><strong>0.990</strong></td>\n</tr>\n<tr>\n<td>临床对比</td>\n<td>无</td>\n<td>无</td>\n<td><strong>超越多数眼科医生</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>本文的关键贡献在于：（1）首次在大规模、高质量标注数据上训练深度学习 DR 检测模型；（2）在两个独立临床验证集上达到眼科专家水平；（3）为深度学习在医学影像诊断中的临床应用树立了方法论标杆——严格的参考标准构建、独立验证集评估、与专家的直接对比。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：本文的成功不仅在于 Inception-v3 的强大特征提取能力，更在于其严谨的临床研究设计——大规模多专家标注、独立验证集、与临床医生的直接对比。这种\"深度学习 + 临床验证\"的范式深刻影响了后续所有医学影像 AI 研究的评估标准，也推动了 FDA 等监管机构对 AI 辅助诊断工具的审批框架建设（2018 年 IDx-DR 成为首个获 FDA 批准的自主 AI 诊断系统）。</div>",
      "quiz": {
        "q": "本文在构建糖尿病视网膜病变检测的参考标准时，采用了什么策略来确保标注质量？",
        "options": [
          "使用单一资深眼科专家的标注作为金标准",
          "每张图像由多名眼科医生独立标注，以多数投票作为参考标准",
          "使用荧光素血管造影（FFA）的客观检查结果作为金标准",
          "通过自动化算法预标注后由医生审核确认"
        ],
        "answer": 1,
        "explain": "本文的一个核心创新是标注体系的设计：训练集每张图像由 3-7 名美国执业眼科医生独立标注，验证集每张由 7-8 名医生标注，最终以多数投票决定参考标准。这种多专家共识机制比单一标注者更可靠，有效降低了个体标注者的主观偏差，但也意味着参考标准反映的是'专家共识'而非绝对病理真相。"
      }
    },
    {
      "id": "chexnet",
      "num": 4,
      "name": "CheXNet",
      "fullName": "CheXNet: 胸片肺炎检测的放射科医生级深度学习 (CheXNet: Radiologist-Level Pneumonia Detection on Chest X-Rays with Deep Learning)",
      "year": "2017",
      "org": "斯坦福大学",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1711.05225",
      "projectUrl": "",
      "category": "diagnostic",
      "motivation": "121层DenseNet在胸片肺炎检测达放射科医生水平",
      "summary": "CheXNet 基于 DenseNet-121 构建端到端的胸部 X 光疾病检测模型，在肺炎检测任务上以 F1=0.435 超越放射科医生平均水平（F1=0.387），并在 ChestX-ray14 数据集全部 14 类胸部疾病上取得了当时的最优 AUROC。",
      "keyPoints": [
        "<strong>骨干网络</strong>：采用 121 层 DenseNet（DenseNet-121）作为特征提取器，利用密集连接缓解梯度消失、增强特征复用",
        "<strong>数据集</strong>：使用当时最大的公开胸部 X 光数据集 ChestX-ray14（112,120 张图像，30,805 名患者，14 类病理标签）",
        "<strong>迁移学习</strong>：在 ImageNet 预训练权重基础上微调，仅替换最后的全连接层适配目标任务",
        "<strong>肺炎检测</strong>：二分类任务，F1=0.435 显著高于 4 位放射科医生平均 F1=0.387（95% CI 差值不含 0）",
        "<strong>多病种扩展</strong>：将输出层扩展为 14 维 sigmoid，使用多标签二元交叉熵损失，在所有 14 类上超越先前 SOTA",
        "<strong>可解释性</strong>：通过类激活映射（CAM）生成热力图，定位 X 光中与诊断最相关的区域"
      ],
      "detail": "<h5>核心架构示意图</h5>\n<p><img alt=\"CheXNet 架构示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1711.05225/assets/x1.png\" />\n<em>图 1：CheXNet 是一个 121 层卷积神经网络，输入胸部 X 光图像，输出各病理的概率。在肺炎检测任务上，CheXNet 超越了放射科医生的平均表现。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># CheXNet 训练与推理流程伪代码\n\n# === 模型构建 ===\nmodel = DenseNet121(pretrained=&quot;imagenet&quot;)\n# 替换最后全连接层: 1024 -&gt; C (C=1 肺炎检测, C=14 多病种)\nmodel.classifier = Linear(1024, C)\n# 输出层后接 sigmoid 激活\nactivation = Sigmoid()\n\n# === 数据预处理 ===\ndef preprocess(image):\n    image = resize(image, (224, 224))\n    image = normalize(image, mean=IMAGENET_MEAN, std=IMAGENET_STD)\n    if training:\n        image = random_horizontal_flip(image)\n    return image\n\n# === 训练循环 ===\noptimizer = Adam(model.parameters(), lr=0.001)\nscheduler = ReduceLROnPlateau(optimizer, factor=10, patience=1)\n\nfor epoch in range(num_epochs):\n    for batch_X, batch_y in train_loader:\n        logits = model(preprocess(batch_X))        # (B, C)\n        probs = sigmoid(logits)                     # (B, C)\n        loss = binary_cross_entropy(probs, batch_y) # 多标签BCE\n        optimizer.zero_grad()\n        loss.backward()\n        optimizer.step()\n\n    val_loss = evaluate(model, val_loader)\n    scheduler.step(val_loss)  # 验证损失不降时衰减学习率\n\n# === 推理 + CAM 可视化 ===\ndef predict_and_visualize(image, class_c):\n    features = model.features(image)        # 最后卷积层特征图 f_k\n    weights = model.classifier.weight[c]    # 类别 c 对应权重 w_{c,k}\n    cam = sum(w_ck * f_k for w_ck, f_k in zip(weights, features))\n    cam = upsample(cam, image.size)         # 上采样到原图尺寸\n    return sigmoid(model(image)), overlay(image, cam)\n</code></pre>\n<h5>动机与背景</h5>\n<p>肺炎是全球主要致死疾病之一，每年导致大量患者死亡。胸部 X 光是最常见的影像检查手段（全球每年约 20 亿次），但其诊断高度依赖放射科医生的专业经验。研究表明，即使是经验丰富的放射科医生，在肺炎诊断上的观察者间一致性也较低——胸部 X 光上肺炎的表现可能与多种其他疾病重叠（如肺癌、肺水肿），且影像本身存在模糊性。更关键的是，世界卫生组织估计全球约三分之二的人口缺乏放射诊断服务，即使有设备也缺乏能解读影像的专家。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：CheXNet 的核心动机是构建一个能达到甚至超越放射科医生水平的自动化胸部 X 光诊断系统，从而缓解全球放射科医生短缺的问题。</div>\n<h5>核心机制详解</h5>\n<p><strong>1. DenseNet-121 骨干网络</strong></p>\n<p>CheXNet 选择 DenseNet-121 作为骨干网络。DenseNet 的核心设计是<strong>密集连接（Dense Connectivity）</strong>：在每个 Dense Block 内，每一层都接收前面所有层的特征图作为输入。形式化地，第 <span class=\"kb-math kb-math-inline\">\\ell</span> 层的输出为：</p>\n<div class=\"kb-math kb-math-display\">x_\\ell = H_\\ell([x_0, x_1, \\ldots, x_{\\ell-1}])</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">[x_0, x_1, \\ldots, x_{\\ell-1}]</span> 表示前面所有层输出的通道拼接，<span class=\"kb-math kb-math-inline\">H_\\ell</span> 是 BN-ReLU-Conv 的复合函数。这种设计带来三个优势：（1）缓解梯度消失，因为梯度可以通过短路连接直接回传；（2）增强特征复用，减少参数冗余；（3）121 层的深度提供了足够的表达能力。模型在 ImageNet 上预训练后，最后的全连接层被替换以适配胸部 X 光任务。</p>\n<p><strong>2. 损失函数设计</strong></p>\n<p>对于<strong>肺炎二分类</strong>任务，使用标准的二元交叉熵损失：</p>\n<div class=\"kb-math kb-math-display\">L(X, y) = -[y \\log p(Y=1|X) + (1-y) \\log p(Y=0|X)]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">p(Y=1|X)</span> 是模型预测图像含有肺炎的概率。</p>\n<p>对于<strong>14 类多病种分类</strong>的扩展，损失函数变为各类别二元交叉熵之和：</p>\n<div class=\"kb-math kb-math-display\">L(X, \\mathbf{y}) = \\sum_{c=1}^{14} [-y_c \\log p(Y_c=1|X) - (1-y_c) \\log p(Y_c=0|X)]</div>\n<p>这里每个类别独立计算，允许一张图像同时标注多种疾病（多标签分类），输出层使用逐元素 sigmoid 而非 softmax。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：多标签分类与多类分类不同——前者各类别独立，一张图可同时有多种疾病；后者各类互斥。CheXNet 使用 sigmoid + BCE 而非 softmax + CE，这是医学影像多病种检测的标准做法。</div>\n<p><strong>3. 类激活映射（CAM）可解释性</strong></p>\n<p>为了让模型的预测具有临床可解释性，CheXNet 使用 CAM 技术生成热力图。设 <span class=\"kb-math kb-math-inline\">f_k</span> 为最后一个卷积层的第 <span class=\"kb-math kb-math-inline\">k</span> 个特征图，<span class=\"kb-math kb-math-inline\">w_{c,k}</span> 为全连接层中特征图 <span class=\"kb-math kb-math-inline\">k</span> 到类别 <span class=\"kb-math kb-math-inline\">c</span> 的权重，则类别 <span class=\"kb-math kb-math-inline\">c</span> 的激活映射为：</p>\n<div class=\"kb-math kb-math-display\">M_c = \\sum_k w_{c,k} \\cdot f_k</div>\n<p>将 <span class=\"kb-math kb-math-inline\">M_c</span> 上采样到原图尺寸并叠加，即可可视化模型\"关注\"的区域。下图展示了 CheXNet 在多种疾病上的 CAM 可视化结果：</p>\n<p><img alt=\"CAM 可视化示例\" src=\"https://ar5iv.labs.arxiv.org/html/1711.05225/assets/cams/00002846_013_classPneumonia_label1.jpg\" />\n<em>图 2(a)：多灶性社区获得性肺炎患者。模型正确检测到左下肺和右上肺的气腔病变，从而做出肺炎诊断。</em></p>\n<h5>训练与推理流程</h5>\n<p><strong>训练阶段</strong>：\n1. <strong>数据准备</strong>：ChestX-ray14 数据集按患者划分为训练集（28,744 患者 / 98,637 图像）、验证集（1,672 患者 / 6,351 图像）和测试集（389 患者 / 420 图像），确保无患者重叠\n2. <strong>预处理</strong>：图像缩放至 <span class=\"kb-math kb-math-inline\">224 \\times 224</span>，按 ImageNet 均值/标准差归一化，训练时随机水平翻转增强\n3. <strong>优化</strong>：使用 Adam 优化器，初始学习率 0.001，当验证损失停滞时学习率衰减 10 倍\n4. <strong>模型选择</strong>：选择验证集上损失最低的模型权重</p>\n<p><strong>推理阶段</strong>：\n1. 输入 <span class=\"kb-math kb-math-inline\">224 \\times 224</span> 的胸部 X 光图像\n2. 通过 DenseNet-121 提取特征\n3. 全连接层 + sigmoid 输出各疾病概率\n4. 可选：通过 CAM 生成热力图辅助临床解释</p>\n<p><strong>评估方法</strong>：\n- 肺炎检测：使用 F1 分数，与 4 位放射科医生交叉比较（每位医生 / 模型分别以其他 4 个标注为 ground truth，取平均 F1）\n- 多病种分类：使用 per-class AUROC，与 Wang et al. (2017) 和 Yao et al. (2017) 的 SOTA 结果比较</p>\n<h5>与先前工作的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方面</th>\n<th>Wang et al. (2017)</th>\n<th>Yao et al. (2017)</th>\n<th><strong>CheXNet</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>骨干网络</td>\n<td>多种 CNN（AlexNet, VGG, ResNet 等）</td>\n<td>DenseNet + LSTM</td>\n<td><strong>DenseNet-121</strong></td>\n</tr>\n<tr>\n<td>标签建模</td>\n<td>独立分类</td>\n<td>利用标签间统计依赖</td>\n<td><strong>独立多标签 BCE</strong></td>\n</tr>\n<tr>\n<td>最优类数</td>\n<td>1/14 类 SOTA</td>\n<td>13/14 类 SOTA</td>\n<td><strong>14/14 类 SOTA</strong></td>\n</tr>\n<tr>\n<td>肺炎 AUROC</td>\n<td>0.633</td>\n<td>0.713</td>\n<td><strong>0.7680</strong></td>\n</tr>\n<tr>\n<td>与医生对比</td>\n<td>无</td>\n<td>无</td>\n<td><strong>F1 显著超越（p&lt;0.05）</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>CheXNet 的关键优势在于：（1）DenseNet-121 的密集连接提供了更强的特征表达；（2）ImageNet 预训练 + 端到端微调的简洁流程避免了复杂的多阶段训练；（3）首次在肺炎检测上与放射科医生进行了严格的统计对比。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：尽管方法相对简洁（预训练 DenseNet + 微调），CheXNet 的成功表明在医学影像领域，大规模数据 + 强骨干网络 + 迁移学习的组合可以达到专家级性能，这一范式深刻影响了后续的医学影像 AI 研究。</div>",
      "quiz": {
        "q": "CheXNet 在多病种分类任务中，输出层使用 sigmoid 而非 softmax 的主要原因是什么？",
        "options": [
          "sigmoid 的计算效率比 softmax 更高",
          "一张胸部 X 光可能同时存在多种疾病，各类别需要独立预测",
          "sigmoid 能产生更大的梯度，加速训练收敛",
          "softmax 无法与二元交叉熵损失配合使用"
        ],
        "answer": 1,
        "explain": "胸部 X 光的多病种检测是多标签分类问题，一张图像可同时包含多种疾病。sigmoid 对每个类别独立输出概率，允许多个类别同时为正；而 softmax 强制所有类别概率之和为 1，隐含各类互斥的假设，不适用于此场景。"
      }
    },
    {
      "id": "attention_mil",
      "num": 5,
      "name": "Attention MIL",
      "fullName": "注意力多实例学习 (Attention-based Deep Multiple Instance Learning)",
      "year": "2018",
      "org": "阿姆斯特丹大学",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1802.04712",
      "projectUrl": "",
      "category": "diagnostic",
      "motivation": "可学习注意力权重聚合实例特征解决WSI弱监督",
      "summary": "Attention MIL 的核心目标是：可学习注意力权重聚合实例特征解决WSI弱监督。",
      "keyPoints": [
        "核心动机：可学习注意力权重聚合实例特征解决WSI弱监督",
        "代表机构：阿姆斯特丹大学"
      ],
      "detail": "<h3>架构图</h3>\n<p>论文Figure 6展示了三种MIL架构的对比：</p>\n<p><img alt=\"MIL架构对比\" src=\"https://ar5iv.labs.arxiv.org/html/1802.04712/assets/x1.png\" /></p>\n<blockquote>\n<p>Figure 6: (a) Instance-based：先打分再聚合；(b) Embedding-based：先聚合再分类；(c) <strong>Attention-based（本文）</strong>：用可学习的attention权重聚合嵌入。</p>\n</blockquote>\n<h3>Attention计算伪代码</h3>\n<p>```python</p>"
    },
    {
      "id": "unet_pp",
      "num": 6,
      "name": "U-Net++",
      "fullName": "U-Net++: 嵌套U型医学图像分割架构 (UNet++: A Nested U-Net Architecture for Medical Image Segmentation)",
      "year": "2018",
      "org": "亚利桑那州立大学",
      "parent": "unet",
      "paperUrl": "https://arxiv.org/abs/1807.10165",
      "projectUrl": "",
      "category": "segmentation",
      "motivation": "嵌套密集跳跃连接减少编码解码器特征差距",
      "summary": "UNet++ 通过在编码器与解码器之间引入**嵌套密集跳跃连接（Nested Dense Skip Pathways）**，逐步弥合编码器与解码器特征图之间的语义鸿沟，并结合**深度监督（Deep Supervision）**实现模型剪枝与精度提升，在多项医学图像分割任务上显著超越 U-Net。",
      "keyPoints": [
        "<strong>嵌套密集跳跃连接</strong>：用密集卷积块替代 U-Net 的简单跳跃连接，使编码器特征在融合前逐步接近解码器的语义层级",
        "<strong>深度监督机制</strong>：在多个语义层级输出分割图，支持\"精确模式\"（多分支平均）和\"快速模式\"（单分支剪枝）",
        "<strong>模型剪枝能力</strong>：UNet++ L3 可减少 32.2% 推理时间，IoU 仅下降 0.6 个百分点",
        "<strong>损失函数</strong>：二元交叉熵（BCE）与 Dice 系数的组合损失",
        "<strong>4 个医学分割基准</strong>：细胞核（显微镜）、结肠息肉（RGB 视频）、肝脏（CT）、肺结节（CT 3D）",
        "<strong>性能提升</strong>：相比 U-Net 平均 IoU 提升 3.9 个百分点，相比 wide U-Net 提升 3.4 个百分点",
        "<strong>参数量可控</strong>：UNet++ (9.04M) 与 wide U-Net (9.13M) 参数量相当，性能增益来自架构设计而非参数增加"
      ],
      "detail": "<h5>核心架构示意图</h5>\n<p><img alt=\"UNet++ 架构总览\" src=\"https://ar5iv.labs.arxiv.org/html/1807.10165/assets/fig_nabla_net.png\" />\n<em>图：(a) UNet++ 整体架构——黑色为原始 U-Net 骨架，绿色/蓝色为嵌套密集跳跃连接，红色为深度监督分支；(b) 第一条跳跃路径的特征流详解；(c) 深度监督下的模型剪枝示意。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># UNet++ 前向传播伪代码\n# 编码器：逐层下采样\nfor i in range(depth):  # i = 0,1,2,3,4\n    x[i][0] = encoder_block(x[i-1][0])  # 下采样 + 卷积\n\n# 嵌套密集跳跃连接 + 解码器\nfor j in range(1, depth):       # 密集块列索引\n    for i in range(depth - j):  # 行索引\n        # 收集同一跳跃路径上所有先前节点的输出\n        concat_features = [x[i][k] for k in range(j)]\n        # 加上下层节点的上采样输出\n        up = upsample(x[i+1][j-1])\n        concat_features.append(up)\n        x[i][j] = conv_block(concatenate(concat_features))\n\n# 深度监督：对顶层各列节点输出分割图\noutputs = [sigmoid(conv1x1(x[0][j])) for j in range(1, depth)]\n# 精确模式：平均所有输出；快速模式：选择某一分支\nfinal = average(outputs)  # accurate mode\n</code></pre>\n<h5>动机与背景</h5>\n<p>U-Net 是医学图像分割的经典基线，其核心设计是<strong>跳跃连接（Skip Connection）</strong>——将编码器的高分辨率特征直接拼接到解码器对应层级。然而，这种\"直连\"方式存在一个根本问题：<strong>编码器浅层特征（低级纹理/边缘）与解码器深层特征（高级语义）之间存在巨大的语义鸿沟</strong>。直接融合语义不匹配的特征图会增加优化器的学习难度，导致分割精度受限。</p>\n<p>在医学影像场景中，分割精度的要求远高于自然图像——例如肺结节边缘的毛刺状形态（spiculation）可能是恶性指标，微小的分割误差就可能影响临床诊断。因此，需要一种能更精细恢复目标细节的架构。</p>\n<h5>核心机制：嵌套密集跳跃连接</h5>\n<p>UNet++ 的核心创新是用<strong>密集卷积块（Dense Convolution Block）</strong>替代 U-Net 中的简单跳跃连接。网络中的每个节点 <span class=\"kb-math kb-math-inline\">X^{i,j}</span> 用二维索引标识：<span class=\"kb-math kb-math-inline\">i</span> 表示编码器的下采样层级，<span class=\"kb-math kb-math-inline\">j</span> 表示该跳跃路径上的卷积层索引。</p>\n<p>节点输出的计算公式为：</p>\n<div class=\"kb-math kb-math-display\">x^{i,j} = \\begin{cases}\n\\mathcal{H}(x^{i-1,j}), &amp; j = 0 \\\\\n\\mathcal{H}\\left(\\left[\\left[x^{i,k}\\right]_{k=0}^{j-1},\\; \\mathcal{U}(x^{i+1,j-1})\\right]\\right), &amp; j &gt; 0\n\\end{cases}</div>\n<p>其中：\n- <span class=\"kb-math kb-math-inline\">\\mathcal{H}(\\cdot)</span> 表示卷积 + 激活函数操作\n- <span class=\"kb-math kb-math-inline\">\\mathcal{U}(\\cdot)</span> 表示上采样操作\n- <span class=\"kb-math kb-math-inline\">[\\cdot]</span> 表示沿通道维度的拼接（concatenation）</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：当 <span class=\"kb-math kb-math-inline\">j=0</span> 时，节点就是原始编码器层；当 <span class=\"kb-math kb-math-inline\">j&gt;0</span> 时，节点接收<strong>同一跳跃路径上所有先前节点的输出</strong>（密集连接，类似 DenseNet）以及<strong>下层路径上采样后的语义特征</strong>。这种设计使得编码器特征在到达解码器之前，经过逐步的语义丰富化处理，从而缩小与解码器特征的语义差距。</div>\n<p>具体来说：\n- <span class=\"kb-math kb-math-inline\">j=0</span> 的节点仅接收编码器前一层的输入（即原始 U-Net 的编码器节点）\n- <span class=\"kb-math kb-math-inline\">j=1</span> 的节点接收 2 个输入：同层编码器特征 + 下层上采样特征\n- <span class=\"kb-math kb-math-inline\">j&gt;1</span> 的节点接收 <span class=\"kb-math kb-math-inline\">j+1</span> 个输入：同一路径上前 <span class=\"kb-math kb-math-inline\">j</span> 个节点的输出 + 下层上采样特征</p>\n<p>这种<strong>渐进式特征融合</strong>使得最终传递给解码器的特征图在语义上已经与解码器特征高度相似，优化器面临的是一个更简单的学习任务。</p>\n<h5>深度监督与模型剪枝</h5>\n<p>UNet++ 在顶层（<span class=\"kb-math kb-math-inline\">i=0</span>）的每个密集块输出节点 <span class=\"kb-math kb-math-inline\">\\{x^{0,j} \\mid j \\in \\{1,2,3,4\\}\\}</span> 上都附加了 <span class=\"kb-math kb-math-inline\">1 \\times 1</span> 卷积 + Sigmoid 的分割头，实现深度监督。损失函数为 BCE 与 Dice 系数的组合：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}(Y, \\hat{Y}) = -\\frac{1}{N}\\sum_{b=1}^{N}\\left(\\frac{1}{2} \\cdot Y_b \\cdot \\log \\hat{Y}_b + \\frac{2 \\cdot Y_b \\cdot \\hat{Y}_b}{Y_b + \\hat{Y}_b}\\right)</div>\n<p>其中第一项为加权 BCE，第二项为 Dice 系数。该损失同时施加在 4 个语义层级上。</p>\n<p>深度监督带来两种推理模式：\n- <strong>精确模式（Accurate Mode）</strong>：将 4 个分支的分割图取平均，获得最佳精度\n- <strong>快速模式（Fast Mode）</strong>：仅选择某一分支输出，丢弃其余子网络，实现模型剪枝</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：剪枝能力是 UNet++ 相比 U-Net 的独特优势。实验表明 UNet++ L3（保留前 3 个分支）可减少 32.2% 推理时间，IoU 仅下降 0.6 个百分点。</div>\n<h5>与 U-Net 的核心区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>U-Net</th>\n<th>UNet++</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>跳跃连接</td>\n<td>编码器直连解码器</td>\n<td>嵌套密集卷积块逐步过渡</td>\n</tr>\n<tr>\n<td>语义鸿沟</td>\n<td>编码器/解码器特征语义差异大</td>\n<td>通过密集块逐步缩小语义差距</td>\n</tr>\n<tr>\n<td>监督方式</td>\n<td>仅最终输出层</td>\n<td>多层级深度监督</td>\n</tr>\n<tr>\n<td>模型剪枝</td>\n<td>不支持</td>\n<td>支持按层级剪枝，灵活权衡速度与精度</td>\n</tr>\n<tr>\n<td>梯度流</td>\n<td>单路径</td>\n<td>密集连接改善梯度传播</td>\n</tr>\n</tbody>\n</table></div>\n<h5>实验验证</h5>\n<p>在 4 个医学分割数据集上的 IoU (%) 结果：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>架构</th>\n<th>参数量</th>\n<th>细胞核</th>\n<th>结肠息肉</th>\n<th>肝脏</th>\n<th>肺结节</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>U-Net</td>\n<td>7.76M</td>\n<td>90.77</td>\n<td>30.08</td>\n<td>76.62</td>\n<td>71.47</td>\n</tr>\n<tr>\n<td>Wide U-Net</td>\n<td>9.13M</td>\n<td>90.92</td>\n<td>30.14</td>\n<td>76.58</td>\n<td>73.38</td>\n</tr>\n<tr>\n<td>UNet++ w/o DS</td>\n<td>9.04M</td>\n<td>92.63</td>\n<td>33.45</td>\n<td>79.70</td>\n<td>76.44</td>\n</tr>\n<tr>\n<td><strong>UNet++ w/ DS</strong></td>\n<td><strong>9.04M</strong></td>\n<td><strong>92.52</strong></td>\n<td><strong>32.12</strong></td>\n<td><strong>82.90</strong></td>\n<td><strong>77.21</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><img alt=\"分割结果定性对比\" src=\"https://ar5iv.labs.arxiv.org/html/1807.10165/assets/fig-prediction_comparison.png\" />\n<em>图：U-Net、Wide U-Net 与 UNet++ 在息肉、肝脏、细胞核数据集上的分割结果对比。</em></p>\n<p><img alt=\"模型剪枝效果\" src=\"https://ar5iv.labs.arxiv.org/html/1807.10165/assets/fig_inference_time.png\" />\n<em>图：UNet++ 不同剪枝级别下的复杂度、推理速度与精度权衡。</em></p>\n<p>深度监督对多尺度目标（如息肉、肝脏）效果尤为显著，因为多分支平均本质上是一种多尺度集成策略。</p>",
      "quiz": {
        "q": "UNet++ 相比 U-Net 的核心架构改进是什么？",
        "options": [
          "使用更深的编码器网络提取更丰富的语义特征",
          "用嵌套密集跳跃连接替代简单跳跃连接，逐步缩小编码器与解码器的语义差距",
          "引入注意力机制对跳跃连接特征进行加权",
          "使用空洞卷积扩大感受野以捕获多尺度信息"
        ],
        "answer": 1,
        "explain": "UNet++ 的核心创新是在跳跃路径上插入密集卷积块，使编码器特征在融合前逐步接近解码器的语义层级，而非直接拼接语义不匹配的特征图。"
      }
    },
    {
      "id": "attention_unet",
      "num": 7,
      "name": "Attention U-Net",
      "fullName": "注意力U-Net: 学习关注胰腺位置 (Attention U-Net: Learning Where to Look for the Pancreas)",
      "year": "2018",
      "org": "帝国理工学院",
      "parent": "unet",
      "paperUrl": "https://arxiv.org/abs/1804.03999",
      "projectUrl": "",
      "category": "segmentation",
      "motivation": "注意力门机制自动聚焦目标区域抑制背景噪声",
      "summary": "Attention U-Net 在标准 U-Net 的跳跃连接中嵌入 Attention Gate (AG) 模块，利用解码器粗粒度语义信息作为门控信号，自动抑制无关背景区域的特征响应，在仅增加约 8% 参数的条件下显著提升腹部 CT 器官（尤其是胰腺）分割精度。",
      "keyPoints": [
        "<strong>Attention Gate (AG) 模块</strong>：在每个跳跃连接处插入 AG，用解码器上采样前的粗尺度特征作为门控信号，对编码器特征进行空间注意力加权",
        "<strong>Additive Attention 机制</strong>：采用加性注意力（非点积），通过 1×1×1 卷积将编码器特征和门控信号映射到中间空间后相加，再经 ReLU + 1×1 卷积 + Sigmoid 得到注意力系数",
        "<strong>Grid Attention（非全局向量）</strong>：门控信号保留空间维度，是逐像素的网格信号而非单一全局向量，提供更精细的空间选择能力",
        "<strong>Sigmoid 替代 Softmax</strong>：使用 Sigmoid 归一化注意力系数，避免 Softmax 导致的过度稀疏激活，实验表明收敛更稳定",
        "<strong>Deep Supervision</strong>：在多尺度中间层添加辅助损失，确保各尺度注意力单元均能学习到语义判别信息",
        "<strong>Sorensen-Dice Loss</strong>：使用 Dice 损失训练，对类别不平衡更鲁棒（胰腺仅占腹部体积 ~0.5%）",
        "<strong>端到端可训练</strong>：AG 参数通过标准反向传播更新，无需硬注意力的采样策略，训练简单",
        "<strong>实验验证</strong>：CT-150 数据集胰腺 DSC 从 0.814 提升至 0.840（p=0.005），CT-82 (NIH-TCIA) 数据集同样有效"
      ],
      "detail": "<p><img alt=\"Attention U-Net 架构图\" src=\"https://ar5iv.labs.arxiv.org/html/1804.03999/assets/figure1_b.png\" />\n<em>图：Attention U-Net 整体架构。AG 模块嵌入在每个跳跃连接与解码器拼接之前，利用粗尺度门控信号过滤编码器特征。</em></p>\n<p><img alt=\"Attention Gate 模块示意\" src=\"https://ar5iv.labs.arxiv.org/html/1804.03999/assets/figure1_a.png\" />\n<em>图：Attention Gate 内部结构。输入特征 x^l 和门控信号 g 分别通过 1×1×1 卷积映射后相加，经 ReLU → 1×1 卷积 → Sigmoid 输出注意力图 α。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Attention Gate 前向计算\ndef attention_gate(x_l, g, W_x, W_g, psi, b_g, b_psi):\n    &quot;&quot;&quot;\n    x_l: 编码器第 l 层跳跃连接特征 [B, F_l, D, H, W]\n    g:   解码器门控信号（上一层上采样前） [B, F_g, D', H', W']\n    &quot;&quot;&quot;\n    # 1. 线性映射到中间空间 F_int（1×1×1 卷积）\n    theta_x = conv1x1(x_l, W_x)        # [B, F_int, D, H, W]\n    phi_g = conv1x1(g, W_g) + b_g      # [B, F_int, D', H', W']\n\n    # 2. x 下采样到与 g 相同分辨率后逐元素相加\n    theta_x_down = downsample(theta_x)  # 匹配 g 的空间尺寸\n    q_att = relu(theta_x_down + phi_g)  # [B, F_int, D', H', W']\n\n    # 3. 通过 ψ 映射到单通道 + Sigmoid\n    q_att = conv1x1(q_att, psi) + b_psi # [B, 1, D', H', W']\n    alpha = sigmoid(q_att)               # 注意力系数 ∈ (0, 1)\n\n    # 4. 上采样 α 到 x_l 分辨率，逐元素加权\n    alpha_up = upsample(alpha)           # [B, 1, D, H, W]\n    x_hat = x_l * alpha_up              # 门控后的特征\n    return x_hat\n</code></pre>\n<h5>动机与背景</h5>\n<p>标准 U-Net 通过跳跃连接将编码器各层特征直接拼接到解码器对应层，虽然保留了高分辨率细节，但同时也引入了大量<strong>无关背景区域的特征响应</strong>。对于腹部 CT 分割等任务，目标器官（如胰腺）仅占整个图像体积的极小比例（~0.5%），大量背景特征的传递不仅浪费计算资源，还可能干扰分割决策，导致假阳性。</p>\n<p>传统解决方案包括：(1) 级联多阶段模型（先定位再精细分割），增加了流水线复杂度；(2) 外部器官定位模块，需要额外训练。Attention U-Net 提出了一种<strong>轻量级、端到端</strong>的解决方案——在跳跃连接处嵌入可学习的注意力门控。</p>\n<h5>核心机制：Attention Gate</h5>\n<p>AG 的核心思想是利用<strong>解码器已有的粗粒度语义信息</strong>（门控信号 <span class=\"kb-math kb-math-inline\">g</span>）来指导编码器特征（<span class=\"kb-math kb-math-inline\">x^l</span>）的筛选。其数学形式为 additive attention：</p>\n<div class=\"kb-math kb-math-display\">q_{att}^l = \\psi^T \\sigma_1(W_x^T x_i^l + W_g^T g_i + b_g) + b_\\psi</div>\n<div class=\"kb-math kb-math-display\">\\alpha_i^l = \\sigma_2(q_{att}^l(x_i^l, g_i; \\Theta_{att}))</div>\n<p>其中：\n- <span class=\"kb-math kb-math-inline\">W_x \\in \\mathbb{R}^{F_l \\times F_{int}}</span>，<span class=\"kb-math kb-math-inline\">W_g \\in \\mathbb{R}^{F_g \\times F_{int}}</span>：将输入特征和门控信号映射到 <span class=\"kb-math kb-math-inline\">F_{int}</span> 维中间空间\n- <span class=\"kb-math kb-math-inline\">\\psi \\in \\mathbb{R}^{F_{int} \\times 1}</span>：将中间表示压缩为单通道注意力图\n- <span class=\"kb-math kb-math-inline\">\\sigma_1</span>：ReLU 激活函数\n- <span class=\"kb-math kb-math-inline\">\\sigma_2</span>：<strong>Sigmoid</strong> 激活函数（而非 Softmax）</p>\n<div class=\"key-point\">💡 <strong>关键设计选择</strong>：使用 Sigmoid 而非 Softmax 归一化注意力系数。Softmax 在图像分割场景中会导致过度稀疏（因为要在所有空间位置上竞争），而 Sigmoid 允许多个空间位置同时获得高注意力值，更适合分割任务中目标可能占据连续区域的特点。</div>\n<h5>Grid Attention vs. 全局注意力</h5>\n<p>与图像描述（image captioning）任务中使用单一全局向量作为 query 不同，Attention U-Net 采用<strong>网格注意力</strong>：门控信号 <span class=\"kb-math kb-math-inline\">g</span> 保留了空间维度，是一个与特征图同尺度的张量。这意味着：</p>\n<ol>\n<li>注意力计算是<strong>逐像素</strong>的，不同空间位置可以有不同的门控强度</li>\n<li>门控信号聚合了<strong>多个成像尺度</strong>的信息（因为解码器逐层融合了从粗到细的语义）</li>\n<li>随着解码器层级加深，门控信号的空间分辨率逐渐提高，实现从粗到细的注意力精化</li>\n</ol>\n<h5>反向传播中的梯度调制</h5>\n<p>AG 不仅在前向传播中过滤特征，还在反向传播中自动调制梯度：</p>\n<div class=\"kb-math kb-math-display\">\\frac{\\partial(\\hat{x}_i^l)}{\\partial(\\Phi^{l-1})} = \\alpha_i^l \\frac{\\partial(f(x_i^{l-1};\\Phi^{l-1}))}{\\partial(\\Phi^{l-1})} + \\frac{\\partial(\\alpha_i^l)}{\\partial(\\Phi^{l-1})} x_i^l</div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：第一项表明背景区域（<span class=\"kb-math kb-math-inline\">\\alpha \\approx 0</span>）的梯度被自动抑制，使得浅层参数主要根据前景相关区域更新，加速收敛并减少过拟合。</div>\n<h5>训练流程与实现细节</h5>\n<ul>\n<li><strong>3D 模型</strong>：采用 3D U-Net 架构捕获体积上下文，输入尺寸 160×160×96</li>\n<li><strong>优化器</strong>：Adam，小批量 2-4 样本</li>\n<li><strong>数据增强</strong>：仿射变换、轴向翻转、随机裁剪</li>\n<li><strong>归一化</strong>：Batch Normalization + 输入强度线性缩放至 N(0,1)</li>\n<li><strong>AG 初始化</strong>：参数初始化使得初始时 AG 通过所有位置的特征（α≈1），训练过程中逐渐学习聚焦</li>\n<li><strong>Deep Supervision</strong>：在中间尺度添加辅助分割头，确保各层 AG 都能获得有效监督信号</li>\n</ul>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>标准 U-Net</th>\n<th>级联方法</th>\n<th>Attention U-Net</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>跳跃连接</td>\n<td>直接拼接</td>\n<td>直接拼接</td>\n<td>AG 过滤后拼接</td>\n</tr>\n<tr>\n<td>定位机制</td>\n<td>无</td>\n<td>外部定位网络</td>\n<td>内置 AG 自动定位</td>\n</tr>\n<tr>\n<td>训练阶段</td>\n<td>单阶段</td>\n<td>多阶段</td>\n<td>单阶段端到端</td>\n</tr>\n<tr>\n<td>额外参数</td>\n<td>—</td>\n<td>整个定位网络</td>\n<td>仅 +8%</td>\n</tr>\n<tr>\n<td>推理时间</td>\n<td>0.167s</td>\n<td>2× 以上</td>\n<td>0.179s</td>\n</tr>\n</tbody>\n</table></div>\n<p>实验表明，即使将 U-Net 参数量增加到与 Attention U-Net 相同（6.44M vs 6.40M），均匀分配额外参数的效果（DSC 0.821）仍不如 AG 方式（DSC 0.840），证明 AG 的注意力机制本身而非单纯增加容量带来了性能提升。</p>",
      "quiz": {
        "q": "Attention U-Net 中 Attention Gate 使用 Sigmoid 而非 Softmax 作为注意力归一化函数的主要原因是什么？",
        "options": [
          "Sigmoid 计算速度更快，减少推理延迟",
          "Softmax 在空间位置间竞争导致过度稀疏，不适合分割任务中目标占据连续区域的场景",
          "Sigmoid 的梯度更大，有利于深层网络的梯度传播",
          "Softmax 需要额外的温度超参数调节，增加训练难度"
        ],
        "answer": 1,
        "explain": "Softmax 要求所有空间位置的注意力系数之和为 1，导致激活过度稀疏；而 Sigmoid 允许多个位置同时获得高权重，更适合分割任务中前景区域连续分布的特点，实验也表明 Sigmoid 带来更好的训练收敛。"
      }
    },
    {
      "id": "segresnet",
      "num": 8,
      "name": "SegResNet",
      "fullName": "SegResNet: 自编码器正则化的3D脑肿瘤分割 (3D MRI Brain Tumor Segmentation using Autoencoder Regularization)",
      "year": "2018",
      "org": "NVIDIA",
      "parent": "vnet",
      "paperUrl": "https://arxiv.org/abs/1810.11654",
      "projectUrl": "",
      "category": "segmentation",
      "motivation": "VAE正则化分支增强3D分割模型泛化能力",
      "summary": "SegResNet 提出了一种基于编码器-解码器结构的 3D 语义分割网络，通过在编码器端引入残差连接（ResBlock）+ Group Normalization 以及附加的变分自编码器（VAE）分支作为正则化手段，在有限标注数据下显著提升了 3D 脑肿瘤分割精度，赢得了 BraTS 2018 挑战赛冠军。",
      "keyPoints": [
        "<strong>编码器-解码器非对称架构</strong>：编码器更深更重（多层 ResBlock），解码器更轻量（单层 ResBlock），降低计算开销",
        "<strong>Group Normalization 替代 Batch Normalization</strong>：在 batch size=1 的 3D 医学图像场景下保持稳定的归一化效果",
        "<strong>残差连接（Pre-activation ResBlock）</strong>：采用 GN → ReLU → Conv → GN → ReLU → Conv + 恒等跳跃连接，缓解深层网络退化",
        "<strong>VAE 正则化分支</strong>：编码器输出经全连接层压缩为 128 维隐变量，通过 VAE 解码器重建输入图像，KL 散度约束隐空间分布",
        "<strong>复合损失函数</strong>：<span class=\"kb-math kb-math-inline\">L = L_{\\text{Dice}} + 0.1 \\cdot L_{\\text{L2}} + 0.1 \\cdot L_{\\text{KL}}</span>，Dice loss 主导分割，L2+KL 来自 VAE 分支",
        "<strong>测试时增强（TTA）与模型集成</strong>：8 种轴翻转 TTA + 10 模型集成，进一步提升约 1% Dice",
        "<strong>BraTS 2018 冠军</strong>：测试集 Dice 分别为 ET=0.7664, WT=0.8839, TC=0.8154"
      ],
      "detail": "<h5>网络架构总览</h5>\n<p><img alt=\"SegResNet 架构图\" src=\"https://ar5iv.labs.arxiv.org/html/1810.11654/assets/x1.png\" />\n<em>图 1：SegResNet 网络架构。左侧为编码器-解码器分割路径，右侧为 VAE 正则化分支。编码器由多组 ResBlock 构成，解码器通过上采样+跳跃连接恢复分辨率，VAE 分支将编码器特征压缩到 128 维隐空间后重建输入图像。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># SegResNet 前向传播伪代码\ndef forward(x):\n    # === Encoder ===\n    # x: [B, 4, D, H, W]  (4通道MRI输入)\n    x = Conv3d_1x1x1(x)  # 初始卷积 + Spatial Dropout(0.2)\n\n    encoder_features = []\n    for stage in encoder_stages:  # 每个stage: ResBlocks + Stride-2 Conv下采样\n        x = ResBlock(x) * num_blocks[stage]  # GN→ReLU→Conv→GN→ReLU→Conv + skip\n        encoder_features.append(x)\n        x = Conv3d_stride2(x)  # 下采样, 通道数翻倍: 32→64→128→256\n\n    # === Decoder (分割路径) ===\n    for stage in decoder_stages:\n        x = Upsample(x, scale=2)  # 最近邻/三线性上采样\n        x = Conv3d_1x1x1(x)       # 通道数减半\n        x = x + encoder_features[stage]  # 跳跃连接(逐元素加)\n        x = ResBlock(x)\n\n    seg_output = Conv3d_1x1x1(x)  # → [B, 3, D, H, W]\n    seg_output = Sigmoid(seg_output)\n\n    # === VAE Branch (仅训练时) ===\n    z_mean, z_logvar = FC(encoder_features[-1])  # 压缩到128维\n    z = z_mean + exp(0.5*z_logvar) * N(0,1)      # 重参数化采样\n    recon = VAE_Decoder(z)  # 上采样重建 → [B, 4, D, H, W]\n\n    L_dice = DiceLoss(seg_output, labels)\n    L_l2 = MSE(recon, x_input)\n    L_kl = KL_divergence(z_mean, z_logvar)\n    loss = L_dice + 0.1 * L_l2 + 0.1 * L_kl\n\n    return seg_output, loss\n</code></pre>\n<h5>动机与背景</h5>\n<p>脑肿瘤分割是神经影像分析中的关键任务，BraTS 挑战赛要求从多模态 3D MRI（T1、T1c、T2、FLAIR）中分割出三个嵌套的肿瘤子区域：增强肿瘤核心（ET）、全肿瘤（WT）和肿瘤核心（TC）。传统方法面临两大挑战：</p>\n<ol>\n<li><strong>3D 卷积的 GPU 显存瓶颈</strong>：3D 体积数据远大于 2D 图像，batch size 通常只能设为 1，导致 Batch Normalization 统计量不稳定</li>\n<li><strong>标注数据稀缺</strong>：BraTS 2018 仅有 285 例训练数据，深层网络容易过拟合</li>\n</ol>\n<div class=\"key-point\">💡 关键：SegResNet 的核心洞察是——用 Group Normalization 解决小 batch 问题，用 VAE 分支作为隐式数据增强/正则化手段，迫使编码器学习更具泛化性的特征表示。</div>\n<h5>核心机制详解</h5>\n<p><strong>1. 编码器：残差块 + Group Normalization</strong></p>\n<p>编码器采用 pre-activation 残差块设计，每个 ResBlock 的结构为：</p>\n<div class=\"kb-math kb-math-display\">\\text{ResBlock}(x) = x + \\text{Conv}_{3\\times3\\times3}\\big(\\text{ReLU}(\\text{GN}(\\text{Conv}_{3\\times3\\times3}(\\text{ReLU}(\\text{GN}(x)))))\\big)</div>\n<p>其中 Group Normalization 将通道分为 8 组（每组 <span class=\"kb-math kb-math-inline\">C/8</span> 个通道），在每组内独立计算均值和方差进行归一化。与 Batch Normalization 不同，GN 的统计量不依赖 batch 内的其他样本，因此在 batch size=1 时仍然稳定。</p>\n<p>编码器共 4 个分辨率阶段，特征通道数依次为 32→64→128→256，每个阶段包含 1-4 个 ResBlock（越深越多），通过 stride=2 的卷积实现下采样。</p>\n<p><strong>2. 解码器：轻量设计 + 跳跃连接</strong></p>\n<p>解码器的设计哲学是<strong>非对称</strong>——比编码器更浅更轻。每个阶段仅包含一个 ResBlock，通过上采样（最近邻插值或三线性插值）+ 1×1×1 卷积调整通道数后，与编码器对应层的特征进行<strong>逐元素相加</strong>（而非 U-Net 的通道拼接）。</p>\n<div class=\"warn-box\">⚠️ 注意：使用加法而非拼接的跳跃连接可以减少参数量和显存占用，这在 3D 场景中尤为重要。作者发现增加网络宽度（更多通道数）比增加深度更能提升性能。</div>\n<p><strong>3. VAE 正则化分支</strong></p>\n<p>这是 SegResNet 最独特的设计。在训练阶段，编码器的最终输出被送入一个额外的 VAE 分支：</p>\n<ul>\n<li><strong>编码</strong>：通过全连接层将高维特征压缩为 128 维的均值 <span class=\"kb-math kb-math-inline\">\\mu</span> 和方差 <span class=\"kb-math kb-math-inline\">\\sigma^2</span></li>\n<li><strong>采样</strong>：使用重参数化技巧 <span class=\"kb-math kb-math-inline\">z = \\mu + \\sigma \\cdot \\epsilon, \\quad \\epsilon \\sim \\mathcal{N}(0, 1)</span></li>\n<li><strong>解码</strong>：将 <span class=\"kb-math kb-math-inline\">z</span> 通过全连接层映射回空间特征图，再经过上采样卷积重建原始 4 通道 MRI 输入</li>\n</ul>\n<p>VAE 分支的损失包含两项：</p>\n<div class=\"kb-math kb-math-display\">L_{\\text{L2}} = \\frac{1}{N} \\|x_{\\text{input}} - x_{\\text{recon}}\\|^2</div>\n<div class=\"kb-math kb-math-display\">L_{\\text{KL}} = \\frac{1}{N} \\sum (\\mu^2 + \\sigma^2 - \\log \\sigma^2 - 1)</div>\n<div class=\"key-point\">💡 关键：VAE 分支在推理时被完全丢弃，不增加推理开销。它的作用是在训练时迫使编码器学习一个能够重建输入图像的紧凑表示，这相当于一种隐式的正则化——编码器不仅要提取对分割有用的特征，还要保留足够的图像信息用于重建。作者发现 VAE 分支不仅提升了性能，还使得不同随机初始化下的训练结果更加稳定一致。</div>\n<p><strong>4. 损失函数设计</strong></p>\n<p>总损失为三项加权和：</p>\n<div class=\"kb-math kb-math-display\">L = L_{\\text{Dice}} + 0.1 \\cdot L_{\\text{L2}} + 0.1 \\cdot L_{\\text{KL}}</div>\n<p>其中 Dice Loss 定义为：</p>\n<div class=\"kb-math kb-math-display\">L_{\\text{Dice}} = 1 - \\frac{2 \\sum_i p_i g_i}{\\sum_i p_i^2 + \\sum_i g_i^2}</div>\n<p><span class=\"kb-math kb-math-inline\">p_i</span> 为预测概率，<span class=\"kb-math kb-math-inline\">g_i</span> 为真实标签。Dice Loss 天然适合处理类别不平衡问题（肿瘤区域远小于背景），而 VAE 损失的权重 0.1 是经验性选择，确保正则化不会主导训练。</p>\n<h5>训练与推理细节</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>配置项</th>\n<th>值</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>优化器</td>\n<td>Adam, 初始 lr=1e-4</td>\n</tr>\n<tr>\n<td>学习率调度</td>\n<td><span class=\"kb-math kb-math-inline\">\\alpha = \\alpha_0 \\cdot (1 - e/N_e)^{0.9}</span>, 多项式衰减</td>\n</tr>\n<tr>\n<td>训练轮数</td>\n<td>300 epochs</td>\n</tr>\n<tr>\n<td>Batch size</td>\n<td>1</td>\n</tr>\n<tr>\n<td>输入裁剪</td>\n<td>160×192×128 随机裁剪</td>\n</tr>\n<tr>\n<td>L2 正则化</td>\n<td>权重 1e-5</td>\n</tr>\n<tr>\n<td>Dropout</td>\n<td>Spatial dropout 0.2（仅编码器首层卷积后）</td>\n</tr>\n<tr>\n<td>数据增强</td>\n<td>随机强度偏移(±0.1 std)、缩放(0.9-1.1)、三轴翻转(p=0.5)</td>\n</tr>\n<tr>\n<td>训练时间</td>\n<td>单 V100 约 2 天，DGX-1 (8×V100) 约 6 小时</td>\n</tr>\n<tr>\n<td>推理时间</td>\n<td>单 V100 约 0.4 秒/例</td>\n</tr>\n</tbody>\n</table></div>\n<h5>实验结果</h5>\n<p><img alt=\"分割示例\" src=\"https://ar5iv.labs.arxiv.org/html/1810.11654/assets/x2.png\" />\n<em>图 2：典型分割结果。绿色=全肿瘤(WT)，红色+黄色=肿瘤核心(TC)，黄色=增强肿瘤(ET)。预测结果与真实标注高度吻合。</em></p>\n<p><strong>BraTS 2018 验证集结果（66 例）：</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>Dice-ET</th>\n<th>Dice-WT</th>\n<th>Dice-TC</th>\n<th>HD-ET</th>\n<th>HD-WT</th>\n<th>HD-TC</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>单模型</td>\n<td>0.8145</td>\n<td>0.9042</td>\n<td>0.8596</td>\n<td>3.80</td>\n<td>4.48</td>\n<td>8.28</td>\n</tr>\n<tr>\n<td>单模型+TTA</td>\n<td>0.8173</td>\n<td>0.9068</td>\n<td>0.8602</td>\n<td>3.82</td>\n<td>4.41</td>\n<td>6.84</td>\n</tr>\n<tr>\n<td>10模型集成</td>\n<td>0.8233</td>\n<td>0.9100</td>\n<td>0.8668</td>\n<td>3.93</td>\n<td>4.52</td>\n<td>6.85</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>BraTS 2018 测试集结果（191 例，冠军方案）：</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>Dice-ET</th>\n<th>Dice-WT</th>\n<th>Dice-TC</th>\n<th>HD-ET</th>\n<th>HD-WT</th>\n<th>HD-TC</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>10模型集成</td>\n<td>0.7664</td>\n<td>0.8839</td>\n<td>0.8154</td>\n<td>3.77</td>\n<td>5.90</td>\n<td>4.81</td>\n</tr>\n</tbody>\n</table></div>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>对比维度</th>\n<th>U-Net</th>\n<th>SegResNet</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>归一化方式</td>\n<td>Batch Normalization</td>\n<td>Group Normalization（适配 batch=1）</td>\n</tr>\n<tr>\n<td>跳跃连接</td>\n<td>通道拼接（concat）</td>\n<td>逐元素相加（add），更省显存</td>\n</tr>\n<tr>\n<td>编解码对称性</td>\n<td>对称</td>\n<td>非对称（编码器更重）</td>\n</tr>\n<tr>\n<td>正则化</td>\n<td>标准 dropout</td>\n<td>VAE 分支 + spatial dropout</td>\n</tr>\n<tr>\n<td>维度</td>\n<td>2D</td>\n<td>原生 3D</td>\n</tr>\n</tbody>\n</table></div>\n<p>作者在讨论中还提到了多项负面实验结果：(1) 使用 batch size=8 + BatchNorm 因需缩小裁剪尺寸反而降低性能；(2) 更复杂的数据增强（直方图匹配、仿射变换）未带来额外提升；(3) CRF 后处理效果不稳定；(4) 增加网络深度无益，但增加宽度（通道数）持续有效。</p>",
      "quiz": {
        "q": "SegResNet 中 VAE 分支的主要作用是什么？",
        "options": [
          "在推理时生成新的训练样本以扩充数据集",
          "作为训练时的正则化手段，迫使编码器学习更具泛化性的特征表示",
          "替代 Dice Loss 作为主要的分割监督信号",
          "在推理时对分割结果进行后处理优化"
        ],
        "answer": 1,
        "explain": "VAE 分支仅在训练时使用，推理时被丢弃。它通过要求编码器输出能够重建原始输入图像的特征，起到隐式正则化作用，防止编码器在有限数据上过拟合，并使训练更加稳定。"
      }
    },
    {
      "id": "hovernet",
      "num": 9,
      "name": "HoVer-Net",
      "fullName": "HoVer-Net: 同时分割与分类的细胞核实例分割 (HoVer-Net: Simultaneous Segmentation and Classification of Nuclei in Multi-Tissue Histology Images)",
      "year": "2019",
      "org": "华威大学",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1812.06499",
      "projectUrl": "",
      "category": "diagnostic",
      "motivation": "水平垂直距离图同时实现细胞核分割与分类",
      "summary": "HoVer-Net 提出利用**水平和垂直距离图（HoVer Maps）**编码每个核像素到其所属实例质心的归一化距离，通过 Sobel 梯度算子提取实例边界并结合 marker-controlled watershed 实现精准的细胞核实例分割，同时通过专用分类分支完成核类型预测，在多个病理图像数据集上取得 SOTA 性能。",
      "keyPoints": [
        "<strong>三分支解码架构</strong>：Nuclear Pixel (NP) 分支预测前景/背景、HoVer 分支回归水平和垂直距离图、Nuclear Classification (NC) 分支预测核类型",
        "<strong>HoVer Maps 表示</strong>：将每个核像素到其实例质心的水平/垂直距离归一化到 <span class=\"kb-math kb-math-inline\">[-1, 1]</span>，使不同实例间产生显著的像素值跳变",
        "<strong>Sobel 梯度后处理</strong>：对 HoVer Maps 施加 Sobel 算子提取梯度，高梯度区域标识实例边界，结合 marker-controlled watershed 完成实例分割",
        "<strong>多项损失函数</strong>：HoVer 分支使用 MSE + 梯度 MSE（<span class=\"kb-math kb-math-inline\">\\lambda_b=2</span>），NP 分支使用 BCE + Dice，NC 分支使用 CE + Dice，共 6 项损失联合优化",
        "<strong>Preact-ResNet50 编码器</strong>：移除最后一个残差组的 stride 并使用空洞卷积，将降采样因子从 32 降至 8，保留更多空间细节",
        "<strong>CoNSeP 数据集</strong>：新提出的结直肠核分割与表型数据集，包含 24,319 个标注核，涵盖 7 种核类型",
        "<strong>实例级分类</strong>：通过对实例内所有像素的 NC 分支预测取多数投票，将像素级分类转换为实例级分类",
        "<strong>SOTA 性能</strong>：在 Kumar（PQ=0.597）、CoNSeP（PQ=0.547）、CPM-17（PQ=0.697）数据集上均达到最优"
      ],
      "detail": "<h5>整体流程</h5>\n<p><img alt=\"HoVer-Net 整体流程图\" src=\"https://ar5iv.labs.arxiv.org/html/1812.06499/assets/pipeline2.png\" />\n<em>图：HoVer-Net 从输入图像到最终实例分割与分类的完整流程。上方为网络三分支输出，下方为基于 Sobel 梯度的后处理 pipeline。</em></p>\n<h5>网络架构</h5>\n<p><img alt=\"HoVer-Net 网络架构\" src=\"https://ar5iv.labs.arxiv.org/html/1812.06499/assets/network.png\" />\n<em>图：HoVer-Net 编码器-解码器架构。(a) Pre-activated 残差单元；(b) Dense 解码单元；(c) 完整网络结构，包含共享编码器和三个独立解码分支。</em></p>\n<pre><code class=\"language-python\"># HoVer-Net 前向推理 + 后处理伪代码\nimport numpy as np\nfrom scipy.ndimage import sobel\nfrom skimage.segmentation import watershed\n\n# ====== 网络前向传播 ======\ndef hovernet_forward(image):\n    &quot;&quot;&quot;\n    输入: image (270×270×3)\n    编码器: Preact-ResNet50 (stride 8, 最后一组用 atrous conv)\n    &quot;&quot;&quot;\n    features = preact_resnet50_encoder(image)  # 多尺度特征\n\n    # 三个解码分支 (输出 80×80)\n    np_map = NP_decoder(features)    # 核像素概率图, sigmoid → [0,1]\n    hover_h = HoVer_decoder_h(features)  # 水平距离图, tanh → [-1,1]\n    hover_v = HoVer_decoder_v(features)  # 垂直距离图, tanh → [-1,1]\n    nc_map = NC_decoder(features)    # 核类型概率图, softmax → K类\n\n    return np_map, hover_h, hover_v, nc_map\n\n# ====== 后处理 Pipeline ======\ndef post_process(np_map, hover_h, hover_v, nc_map, h=0.5, k=0.4):\n    # Step 1: Sobel 梯度计算\n    grad_h = sobel(hover_h, axis=1)  # 水平方向 Sobel\n    grad_v = sobel(hover_v, axis=0)  # 垂直方向 Sobel\n    S_m = np.maximum(np.abs(grad_h), np.abs(grad_v))  # 取最大梯度\n\n    # Step 2: 生成 markers\n    fg_mask = (np_map &gt; h).astype(int)       # τ(q, h): 前景阈值\n    boundary = (S_m &gt; k).astype(int)          # τ(S_m, k): 边界阈值\n    markers = np.clip(fg_mask - boundary, 0, 1)  # σ(τ(q,h) - τ(S_m,k))\n    markers = label_connected_components(markers)  # 连通域标记\n\n    # Step 3: 能量景观\n    E = (1 - boundary) * fg_mask  # E = [1 - τ(S_m, k)] * τ(q, h)\n\n    # Step 4: Marker-controlled watershed\n    instances = watershed(-E, markers=markers, mask=fg_mask)\n\n    # Step 5: 实例级分类 (多数投票)\n    for inst_id in np.unique(instances):\n        if inst_id == 0: continue\n        mask = (instances == inst_id)\n        pixel_classes = nc_map[mask].argmax(axis=-1)\n        majority_class = np.bincount(pixel_classes).argmax()\n        # 赋予该实例 majority_class 类型\n\n    return instances\n</code></pre>\n<h5>动机与背景</h5>\n<p>在计算病理学中，<strong>细胞核的实例分割与分类</strong>是组织分析的基础任务。传统方法面临两大核心挑战：</p>\n<ol>\n<li><strong>实例分割难题</strong>：语义分割方法（如 FCN、U-Net）只能区分前景/背景，无法分离紧密相邻的核。现有实例分割方法（如基于距离变换的 watershed）在密集核区域容易产生过分割或欠分割。</li>\n<li><strong>分割与分类脱节</strong>：大多数方法将分割和分类作为两个独立步骤，缺乏信息共享，导致分类精度受限。</li>\n</ol>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：HoVer-Net 的核心创新在于——不同实例的 HoVer Map 值在边界处会产生<strong>符号突变</strong>（例如左侧核的右边缘 hover_h ≈ +1，右侧核的左边缘 hover_h ≈ -1），这种突变可以被 Sobel 梯度算子精确捕获，从而自然地分离相邻实例。</div>\n<h5>HoVer Maps 的设计原理</h5>\n<p><img alt=\"HoVer Maps 可视化\" src=\"https://ar5iv.labs.arxiv.org/html/1812.06499/assets/x1.png\" />\n<em>图：水平和垂直距离图的预测结果。箭头标示了相邻核之间的显著像素值跳变，这些跳变被 Sobel 算子捕获后用于分离实例。</em></p>\n<p>对于属于核实例 <span class=\"kb-math kb-math-inline\">i</span> 的每个像素 <span class=\"kb-math kb-math-inline\">(x, y)</span>，HoVer Maps 定义为：</p>\n<div class=\"kb-math kb-math-display\">p_x(x, y) = \\frac{x - \\bar{x}_i}{N_{x,i}}, \\quad p_y(x, y) = \\frac{y - \\bar{y}_i}{N_{y,i}}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\bar{x}_i, \\bar{y}_i</span> 是实例 <span class=\"kb-math kb-math-inline\">i</span> 的质心坐标，<span class=\"kb-math kb-math-inline\">N_{x,i}, N_{y,i}</span> 是归一化因子（实例在对应方向上的最大距离），确保值域为 <span class=\"kb-math kb-math-inline\">[-1, 1]</span>。背景像素的 HoVer 值设为 0。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：HoVer Maps 与距离变换的关键区别在于——距离变换只编码到边界的距离（标量），而 HoVer Maps 编码到质心的<strong>有方向</strong>距离（向量），这使得相邻核的边界处产生方向性突变，更利于分离。</div>\n<h5>多项损失函数设计</h5>\n<p>总损失函数为六项加权和：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\lambda_a L_a + \\lambda_b L_b + \\lambda_c L_c + \\lambda_d L_d + \\lambda_e L_e + \\lambda_f L_f</div>\n<p>各项含义：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>损失项</th>\n<th>分支</th>\n<th>公式</th>\n<th>作用</th>\n<th>权重</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><span class=\"kb-math kb-math-inline\">L_a</span></td>\n<td>HoVer</td>\n<td>MSE(预测距离图, GT距离图)</td>\n<td>回归水平/垂直距离</td>\n<td><span class=\"kb-math kb-math-inline\">\\lambda_a=1</span></td>\n</tr>\n<tr>\n<td><span class=\"kb-math kb-math-inline\">L_b</span></td>\n<td>HoVer</td>\n<td>MSE(预测梯度, GT梯度)</td>\n<td><strong>强制梯度结构正确</strong>，确保边界处跳变</td>\n<td><span class=\"kb-math kb-math-inline\">\\lambda_b=2</span></td>\n</tr>\n<tr>\n<td><span class=\"kb-math kb-math-inline\">L_c</span></td>\n<td>NP</td>\n<td>BCE(预测前景, GT前景)</td>\n<td>二分类前景/背景</td>\n<td><span class=\"kb-math kb-math-inline\">\\lambda_c=1</span></td>\n</tr>\n<tr>\n<td><span class=\"kb-math kb-math-inline\">L_d</span></td>\n<td>NP</td>\n<td>Dice Loss</td>\n<td>缓解前景/背景类别不平衡</td>\n<td><span class=\"kb-math kb-math-inline\">\\lambda_d=1</span></td>\n</tr>\n<tr>\n<td><span class=\"kb-math kb-math-inline\">L_e</span></td>\n<td>NC</td>\n<td>CE(预测类型, GT类型)</td>\n<td>多分类核类型</td>\n<td><span class=\"kb-math kb-math-inline\">\\lambda_e=1</span></td>\n</tr>\n<tr>\n<td><span class=\"kb-math kb-math-inline\">L_f</span></td>\n<td>NC</td>\n<td>Dice Loss</td>\n<td>缓解核类型间的类别不平衡</td>\n<td><span class=\"kb-math kb-math-inline\">\\lambda_f=1</span></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键</strong>：<span class=\"kb-math kb-math-inline\">L_b</span>（梯度 MSE）是本文的独特贡献——它直接约束预测的 HoVer Maps 在实例边界处产生正确的梯度跳变，实验表明加入 <span class=\"kb-math kb-math-inline\">L_b</span> 后 SQ（Segmentation Quality）显著提升，说明该损失对精确分割边界至关重要。<span class=\"kb-math kb-math-inline\">\\lambda_b=2</span> 的较高权重也反映了这一设计意图。</div>\n<h5>编码器设计细节</h5>\n<p>HoVer-Net 使用 <strong>Preact-ResNet50</strong> 作为编码器骨干，但做了关键修改：</p>\n<ul>\n<li>原始 ResNet50 的降采样因子为 32×，对于细胞核这样的小目标会丢失过多空间信息</li>\n<li>移除最后一个残差组（conv5_x）的 stride-2 下采样，改用 <strong>空洞卷积（dilation rate=2）</strong>保持感受野</li>\n<li>最终降采样因子降为 <strong>8×</strong>，输入 270×270 → 特征图约 34×34</li>\n<li>三个解码分支通过上采样恢复到 80×80 的输出分辨率</li>\n</ul>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>距离变换 + Watershed</th>\n<th>DCAN (边界检测)</th>\n<th>Mask R-CNN</th>\n<th><strong>HoVer-Net</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>实例分离信号</td>\n<td>到边界的距离</td>\n<td>预测边界</td>\n<td>区域提议</td>\n<td>HoVer 梯度跳变</td>\n</tr>\n<tr>\n<td>密集核处理</td>\n<td>易过分割</td>\n<td>边界不连续导致欠分割</td>\n<td>提议框重叠问题</td>\n<td><strong>梯度自然分离</strong></td>\n</tr>\n<tr>\n<td>分类能力</td>\n<td>无</td>\n<td>无</td>\n<td>有（但两阶段）</td>\n<td><strong>端到端联合</strong></td>\n</tr>\n<tr>\n<td>后处理复杂度</td>\n<td>简单</td>\n<td>简单</td>\n<td>复杂（NMS等）</td>\n<td>中等（Sobel+WS）</td>\n</tr>\n<tr>\n<td>Kumar PQ</td>\n<td>0.443 (DIST)</td>\n<td>0.492 (DCAN)</td>\n<td>0.509</td>\n<td><strong>0.597</strong></td>\n</tr>\n<tr>\n<td>CPM-17 PQ</td>\n<td>0.504 (DIST)</td>\n<td>0.545 (DCAN)</td>\n<td>0.674</td>\n<td><strong>0.697</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>HoVer-Net 在三个数据集上的 PQ 指标均超越所有对比方法，特别是在 CPM-17 上 PQ 达到 0.697，比第二名 Mask R-CNN（0.674）高出 2.3 个百分点。</p>",
      "quiz": {
        "q": "HoVer-Net 中 HoVer Maps 的核心作用是什么？",
        "options": [
          "编码每个核像素到最近边界的距离，用于生成分水岭的能量景观",
          "编码每个核像素到其所属实例质心的归一化水平/垂直距离，利用相邻实例间的梯度跳变分离核",
          "编码每个核像素的分类概率，用于区分不同类型的细胞核",
          "编码每个核像素到图像中心的距离，用于感受野自适应调整"
        ],
        "answer": 1,
        "explain": "HoVer Maps 将每个核像素到其实例质心的水平/垂直距离归一化到[-1,1]，不同实例边界处会产生显著的值跳变（如从+1突变到-1），Sobel算子捕获这些跳变后即可精确分离相邻核实例。这与距离变换（选项A）的关键区别在于HoVer Maps编码的是有方向的到质心距离，而非到边界的标量距离。"
      }
    },
    {
      "id": "nnu_net",
      "num": 10,
      "name": "nnU-Net",
      "fullName": "nnU-Net: 自配置深度学习医学图像分割方法 (nnU-Net: a self-configuring method for deep learning-based biomedical image segmentation)",
      "year": "2020",
      "org": "德国癌症研究中心",
      "parent": "unet_pp",
      "paperUrl": "https://www.nature.com/articles/s41592-020-01008-z",
      "projectUrl": "",
      "category": "segmentation",
      "motivation": "自配置框架证明系统配置比单纯架构创新更重要",
      "summary": "nnU-Net 提出了一个自适应的医学图像分割框架，通过系统化的规则驱动（固定参数、基于规则的参数、经验参数）自动配置预处理、网络架构拓扑、训练策略和推理流程，使标准 U-Net 架构在无需人工干预的情况下，在 Medical Segmentation Decathlon 等多个基准上超越大量定制化方法。",
      "keyPoints": [
        "<strong>自适应框架设计</strong>：将所有设计决策分为三类——固定参数（如 Leaky ReLU、Instance Norm）、基于规则的参数（如网络拓扑、patch size）、经验参数（如后处理、模型选择），实现全自动配置",
        "<strong>三种 U-Net 配置</strong>：2D U-Net、3D U-Net、3D U-Net Cascade（级联），自动根据数据集特性选择最优配置或集成",
        "<strong>动态网络拓扑</strong>：根据数据集的中位图像形状和体素间距，自动计算 patch size、网络深度、特征图通道数和池化操作",
        "<strong>自适应预处理</strong>：CT 数据使用全局统计量裁剪+归一化，其他模态使用逐图像 z-score 归一化；各向异性数据智能重采样",
        "<strong>训练策略</strong>：Dice + Cross-Entropy 联合损失、Adam 优化器（lr=3×10⁻⁴）、自动学习率衰减与早停",
        "<strong>丰富的数据增强</strong>：旋转、缩放、弹性变形、gamma 校正、镜像翻转，3D 各向异性数据退化为 2D 逐层增强",
        "<strong>鲁棒推理流程</strong>：滑窗预测（中心加权）、测试时增强（镜像）、5 折交叉验证集成",
        "<strong>自动后处理</strong>：基于连通域分析自动移除小连通分量",
        "<strong>Medical Segmentation Decathlon 冠军</strong>：在 7 个高度异质的医学分割任务上取得当时最优成绩"
      ],
      "detail": "<p><img alt=\"nnU-Net 框架总览\" src=\"https://raw.githubusercontent.com/MIC-DKFZ/nnUNet/master/documentation/assets/nnU-Net_overview.png\" />\n<em>图：nnU-Net 框架总览——从数据集指纹提取到自动配置预处理、网络拓扑、训练和推理的完整流程</em></p>\n<h5>算法核心流程</h5>\n<pre><code class=\"language-python\"># nnU-Net 自适应配置伪代码\ndef nnunet_pipeline(dataset):\n    # Step 1: 数据集指纹提取\n    fingerprint = extract_fingerprint(dataset)  # 图像形状、体素间距、强度分布、类别比例\n\n    # Step 2: 自适应预处理\n    if modality == 'CT':\n        data = clip_to_percentile(data, 0.5, 99.5)  # 全局统计量裁剪\n        data = z_score_normalize(data, global_mean, global_std)\n    else:\n        data = z_score_normalize(data, per_image_mean, per_image_std)\n    data = resample_to_target_spacing(data, target_spacing)\n\n    # Step 3: 动态网络拓扑配置\n    patch_size = compute_patch_size(median_shape, gpu_memory)\n    network_depth = determine_depth(patch_size)  # 每轴池化直到特征图 ≤ 某阈值\n\n    # Step 4: 训练三个模型\n    for config in [UNet2D, UNet3D, UNetCascade]:\n        for fold in range(5):  # 5折交叉验证\n            model = build_unet(config, network_depth, patch_size)\n            train(model, loss=DiceCE, optimizer=Adam(lr=3e-4))\n\n    # Step 5: 自动选择最优模型/集成\n    best = select_best_ensemble(cross_val_results)\n\n    # Step 6: 推理 + 后处理\n    prediction = sliding_window_inference(best, test_data, overlap=0.5)\n    prediction = apply_tta(prediction)  # 测试时镜像增强\n    prediction = postprocess(prediction)  # 连通域分析\n    return prediction\n</code></pre>\n<h5>动机与背景</h5>\n<p>医学图像分割面临一个核心挑战：<strong>数据集之间的巨大差异性</strong>。不同的成像模态（CT、MRI）、不同的解剖结构（脑肿瘤、肝脏、海马体）、不同的图像尺寸和体素间距，使得没有一套固定的超参数能适用于所有任务。传统方法通常针对每个特定任务进行大量手动调参和架构设计，这不仅耗时，而且难以推广。</p>\n<p>nnU-Net 的核心洞察是：<strong>相比于复杂的架构创新，系统化的非架构层面的工程优化（预处理、训练策略、推理技巧）往往更为重要</strong>。论文证明，一个精心配置的标准 U-Net 可以在不修改架构的前提下，超越大量使用注意力机制、残差连接、密集连接等复杂架构的方法。</p>\n<h5>核心机制详解</h5>\n<p><strong>1. 三类参数的设计哲学</strong></p>\n<p>nnU-Net 将所有需要决策的参数分为三类：</p>\n<ul>\n<li><strong>固定参数（Blueprint Parameters）</strong>：在所有数据集上保持不变的设计选择，如使用 Leaky ReLU（负斜率 0.01）、Instance Normalization、Adam 优化器等。这些是经过大量实验验证的\"最佳实践\"。</li>\n<li><strong>基于规则的参数（Rule-based Parameters）</strong>：根据数据集属性通过确定性规则自动推导的参数，如网络拓扑、patch size、重采样策略等。</li>\n<li><strong>经验参数（Empirical Parameters）</strong>：需要通过实验比较才能确定的参数，如最终选择哪个模型配置、是否使用后处理等。</li>\n</ul>\n<div class=\"key-point\">💡 关键：这种分层设计使得 nnU-Net 在保持自动化的同时，避免了对每个参数都进行昂贵的搜索。</div>\n<p><strong>2. 动态网络拓扑配置</strong></p>\n<p>网络拓扑的自动配置是 nnU-Net 最核心的技术之一。给定一个数据集，配置流程如下：</p>\n<ol>\n<li>\n<p><strong>确定目标体素间距</strong>：对于各向同性数据，使用训练集的中位体素间距；对于各向异性数据（最低分辨率轴的间距 &gt; 最高分辨率轴间距的 3 倍），低分辨率轴的间距取中位值与第 10 百分位值中较低的那个。</p>\n</li>\n<li>\n<p><strong>确定 Patch Size</strong>：从中位重采样后图像形状出发，在 GPU 显存约束（约 5GB per sample）下，通过迭代增大 patch 的各轴尺寸来最大化 patch size。</p>\n</li>\n<li>\n<p><strong>确定池化策略与网络深度</strong>：沿每个轴进行池化，直到该轴的特征图尺寸降至某个阈值以下。对于各向异性数据，低分辨率轴的池化次数少于高分辨率轴，从而适配不同轴的分辨率差异。</p>\n</li>\n<li>\n<p><strong>确定特征图通道数</strong>：初始通道数为 32（3D）或 30（2D），每次下采样后翻倍，上限为 320（3D）或 512（2D）。</p>\n</li>\n</ol>\n<div class=\"kb-math kb-math-display\">\\text{channels}_l = \\min(\\text{base\\_channels} \\times 2^l, \\text{max\\_channels})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">l</span> 为网络层级。</p>\n<p><strong>3. 三种 U-Net 配置</strong></p>\n<ul>\n<li><strong>2D U-Net</strong>：对 3D 数据逐层（slice-by-slice）处理，适用于各向异性严重的数据集（如层间距远大于层内分辨率）。</li>\n<li><strong>3D U-Net</strong>：直接处理 3D patch，能捕获三维空间上下文，但受限于 GPU 显存，patch 可能无法覆盖完整图像。</li>\n<li><strong>3D U-Net Cascade</strong>：两阶段级联方法。第一阶段在降采样的全分辨率图像上训练 3D U-Net 获得粗分割；第二阶段在原始分辨率上训练第二个 3D U-Net，将第一阶段的粗分割作为额外输入通道进行精细化。</li>\n</ul>\n<div class=\"warn-box\">⚠️ 注意：U-Net Cascade 仅在 3D U-Net 的 patch 无法覆盖完整图像时才启用，否则 3D U-Net 已经能获取足够的全局上下文。</div>\n<p><strong>4. 自适应预处理</strong></p>\n<p>预处理策略根据成像模态自动调整：</p>\n<ul>\n<li><strong>CT 数据</strong>：由于 CT 值具有物理意义（Hounsfield 单位），使用<strong>全局统计量</strong>进行归一化。首先收集所有训练样本中前景区域的强度值，裁剪到 <span class=\"kb-math kb-math-inline\">[0.5\\%, 99.5\\%]</span> 百分位范围，然后使用全局均值和标准差进行 z-score 归一化。</li>\n<li><strong>非 CT 数据（MRI 等）</strong>：由于不同扫描仪和协议导致强度分布差异巨大，使用<strong>逐图像</strong> z-score 归一化。</li>\n</ul>\n<p>重采样策略同样自适应：\n- 各向同性数据：所有轴使用三阶样条插值\n- 各向异性数据：高分辨率轴使用三阶样条，低分辨率轴使用最近邻插值（避免引入伪影）\n- 分割标签始终使用最近邻插值</p>\n<p><strong>5. 训练策略</strong></p>\n<p>损失函数采用 Dice Loss 与 Cross-Entropy Loss 的加权和：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\mathcal{L}_{Dice} + \\mathcal{L}_{CE}</div>\n<p>其中 Dice Loss 定义为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{Dice} = -\\frac{2}{|K|} \\sum_{k \\in K} \\frac{\\sum_{i \\in I} u_{ik} v_{ik}}{\\sum_{i \\in I} u_{ik} + \\sum_{i \\in I} v_{ik}}</div>\n<p><span class=\"kb-math kb-math-inline\">u_{ik}</span> 为 softmax 预测概率，<span class=\"kb-math kb-math-inline\">v_{ik}</span> 为 one-hot 真值，<span class=\"kb-math kb-math-inline\">I</span> 为像素集合，<span class=\"kb-math kb-math-inline\">K</span> 为类别集合。</p>\n<p>训练细节：\n- <strong>优化器</strong>：Adam，初始学习率 <span class=\"kb-math kb-math-inline\">3 \\times 10^{-4}</span>\n- <strong>Epoch 定义</strong>：每 250 个 batch 为一个 epoch\n- <strong>学习率调度</strong>：监控训练损失的指数移动平均，若 30 个 epoch 内未改善超过 <span class=\"kb-math kb-math-inline\">5 \\times 10^{-3}</span>，学习率除以 5\n- <strong>早停</strong>：验证损失 60 个 epoch 内未改善且学习率已降至 <span class=\"kb-math kb-math-inline\">10^{-6}</span> 以下时停止训练\n- <strong>前景采样</strong>：强制每个 batch 中超过 1/3 的样本包含至少一个前景类别</p>\n<p><strong>6. 数据增强</strong></p>\n<p>采用丰富的在线数据增强策略：\n- 随机旋转、随机缩放、随机弹性变形\n- Gamma 校正增强、镜像翻转\n- 对于各向异性 3D 数据（patch 最长边 &gt; 最短边的 2 倍），退化为 2D 逐层增强\n- U-Net Cascade 第二阶段：对输入的粗分割应用随机形态学操作（腐蚀、膨胀、开运算、闭运算）和随机移除连通分量，防止过度依赖第一阶段结果</p>\n<p><strong>7. 推理与后处理</strong></p>\n<p>推理采用多重策略提升鲁棒性：</p>\n<ul>\n<li><strong>滑窗预测</strong>：patch 间重叠 50%，使用高斯权重使中心区域权重高于边缘（因为网络在 patch 边缘精度较低）</li>\n<li><strong>测试时增强（TTA）</strong>：沿所有有效轴进行镜像翻转，每个体素最多聚合 64 次预测（3D U-Net 中心区域）</li>\n<li><strong>交叉验证集成</strong>：使用 5 折交叉验证的 5 个模型进行集成预测</li>\n<li><strong>模型集成</strong>：自动尝试所有两两模型组合（2D+3D、2D+Cascade、3D+Cascade），选择交叉验证 Dice 最高的组合</li>\n<li><strong>后处理</strong>：对训练集标签进行连通域分析，若某类别在所有样本中都只有一个连通分量，则在预测中自动移除该类别的多余连通分量</li>\n</ul>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统方法</th>\n<th>nnU-Net</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>架构设计</td>\n<td>针对每个任务设计专用架构（注意力、残差等）</td>\n<td>使用标准 U-Net，自动配置拓扑</td>\n</tr>\n<tr>\n<td>预处理</td>\n<td>手动选择归一化和重采样策略</td>\n<td>根据模态和数据集属性自动决定</td>\n</tr>\n<tr>\n<td>超参数</td>\n<td>大量手动调参或网格搜索</td>\n<td>规则驱动的自动配置</td>\n</tr>\n<tr>\n<td>泛化性</td>\n<td>通常只针对单一任务优化</td>\n<td>一套框架适配所有医学分割任务</td>\n</tr>\n<tr>\n<td>推理</td>\n<td>简单前向传播</td>\n<td>滑窗+TTA+集成的多重鲁棒策略</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键启示：nnU-Net 的成功证明了在医学图像分割中，<strong>系统化的工程优化比架构创新更重要</strong>。这一发现深刻影响了后续医学图像分析领域的研究范式。</div>",
      "quiz": {
        "q": "nnU-Net 在处理 CT 数据和 MRI 数据时，归一化策略的核心区别是什么？",
        "options": [
          "CT 使用 min-max 归一化，MRI 使用 z-score 归一化",
          "CT 使用全局统计量的 z-score 归一化，MRI 使用逐图像的 z-score 归一化",
          "CT 不需要归一化，MRI 使用直方图均衡化",
          "CT 和 MRI 都使用相同的逐图像 z-score 归一化"
        ],
        "answer": 1,
        "explain": "CT 值具有物理意义（HU 单位），不同样本间可比较，因此使用全局统计量归一化；MRI 强度因扫描仪和协议不同而差异巨大，需逐图像独立归一化。"
      }
    },
    {
      "id": "transunet",
      "num": 11,
      "name": "TransUNet",
      "fullName": "TransUNet: Transformer增强医学图像分割 (TransUNet: Transformers Make Strong Encoders for Medical Image Segmentation)",
      "year": "2021",
      "org": "约翰霍普金斯大学",
      "parent": "unet",
      "paperUrl": "https://arxiv.org/abs/2102.04306",
      "projectUrl": "",
      "category": "segmentation",
      "motivation": "首个Transformer+U-Net混合架构捕捉全局上下文",
      "summary": "TransUNet 提出了首个将 Vision Transformer 与 U-Net 结构融合的医学图像分割框架，通过 CNN-Transformer 混合编码器捕获全局上下文，并借助级联上采样器（CUP）与多尺度跳跃连接恢复精细空间细节，在多器官分割和心脏分割任务上取得了当时的最优性能。",
      "keyPoints": [
        "<strong>CNN-Transformer 混合编码器</strong>：先用 ResNet-50 提取多尺度特征图，再将 CNN 特征图切分为 patch 序列送入 12 层 ViT，兼顾局部纹理与全局语义",
        "<strong>级联上采样器（Cascaded Upsampler, CUP）</strong>：由多个\"2× 上采样 + 3×3 卷积 + ReLU\"块级联组成，逐步将 Transformer 编码的低分辨率特征恢复至原始分辨率",
        "<strong>U-Net 式跳跃连接</strong>：在 CUP 的 1/2、1/4、1/8 三个分辨率尺度上引入跳跃连接，将 CNN 编码器的高分辨率特征与上采样特征融合，显著提升边界精度",
        "<strong>基准数据集</strong>：Synapse 多器官 CT 分割（8 类器官，30 例腹部 CT）和 ACDC 心脏 MRI 分割（LV/RV/MYO，100 例）",
        "<strong>ImageNet 预训练</strong>：所有 Transformer 和 ResNet-50 骨干均使用 ImageNet-21k 预训练权重初始化",
        "<strong>性能</strong>：Synapse 数据集上 DSC 77.48%（224×224 输入）/ 84.36%（512×512 输入），ACDC 数据集上 DSC 89.71%，均超越同期 CNN 方法"
      ],
      "detail": "<h5>架构总览</h5>\n<p><img alt=\"TransUNet 架构图\" src=\"https://ar5iv.labs.arxiv.org/html/2102.04306/assets/x1.png\" />\n<em>图：TransUNet 整体框架。(a) Transformer 层结构（MSA + MLP + 残差连接）；(b) 完整的 TransUNet 架构，包含 CNN-Transformer 混合编码器、级联上采样器（CUP）和多尺度跳跃连接。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># TransUNet 前向传播伪代码\ndef forward(x):\n    # x: [B, C, H, W], 例如 [B, 3, 224, 224]\n\n    # ===== 编码阶段 =====\n    # Step 1: CNN 特征提取 (ResNet-50 前三个 stage)\n    f1 = resnet_stage1(x)    # [B, 64,  H/2,  W/2]   — 1/2 分辨率\n    f2 = resnet_stage2(f1)   # [B, 256, H/4,  W/4]   — 1/4 分辨率\n    f3 = resnet_stage3(f2)   # [B, 512, H/8,  W/8]   — 1/8 分辨率\n\n    # Step 2: Patch Embedding (在 CNN 特征图上切 1×1 patch)\n    # 将 f3 展平为序列: [B, (H/16)*(W/16), D]\n    z0 = linear_proj(flatten(f3)) + pos_embedding  # [B, N, D], N=196, D=768\n\n    # Step 3: Transformer 编码 (12 层)\n    for l in range(L):\n        z = z + MSA(LayerNorm(z))     # 多头自注意力 + 残差\n        z = z + MLP(LayerNorm(z))     # 前馈网络 + 残差\n    # z_L: [B, N, D]\n\n    # ===== 解码阶段 (CUP) =====\n    # Step 4: reshape 回 2D 特征图\n    h = reshape(z_L, [B, D, H/16, W/16])  # [B, 768, 14, 14]\n\n    # Step 5: 级联上采样 + 跳跃连接\n    h = upsample_block(h)                  # → [B, 512, 28, 28]  (1/8)\n    h = concat(h, f3) → conv              # 跳跃连接 @ 1/8\n    h = upsample_block(h)                  # → [B, 256, 56, 56]  (1/4)\n    h = concat(h, f2) → conv              # 跳跃连接 @ 1/4\n    h = upsample_block(h)                  # → [B, 128, 112, 112] (1/2)\n    h = concat(h, f1) → conv              # 跳跃连接 @ 1/2\n    h = upsample_block(h)                  # → [B, 64, 224, 224]  (1/1)\n\n    # Step 6: 分割头\n    output = conv_1x1(h)                   # [B, num_classes, H, W]\n    return output\n</code></pre>\n<h5>动机与背景</h5>\n<p>医学图像分割是临床诊断和治疗规划的基础任务。U-Net 凭借对称编码器-解码器结构和跳跃连接成为事实标准，但其核心构建块——卷积操作——具有固有的局部感受野限制，难以显式建模长程依赖关系。这在面对器官形状、纹理和大小存在较大个体差异的场景时尤为突出，例如腹部多器官分割中的胰腺（形状高度不规则）和胆囊（大小变化大）。</p>\n<p>Vision Transformer (ViT) 通过全局自注意力机制天然具备长程依赖建模能力，但直接将 ViT 用于分割存在严重问题：ViT 将输入视为 1D 序列，在所有阶段都聚焦于全局上下文建模，输出的特征分辨率极低（如 14×14），缺乏精细的空间定位信息。简单的上采样无法有效恢复这些细节，导致分割结果粗糙。</p>\n<div class=\"key-point\">💡 <strong>核心洞察</strong>：Transformer 擅长全局语义建模但缺乏空间细节，CNN 擅长提取局部纹理但缺乏全局视野——TransUNet 通过混合架构将两者优势互补。</div>\n<h5>CNN-Transformer 混合编码器</h5>\n<p>TransUNet 的编码器分为两部分：</p>\n<p><strong>1. CNN 特征提取器</strong>：使用 ResNet-50 的前三个 stage 作为特征提取器，将输入图像 <span class=\"kb-math kb-math-inline\">\\mathbf{x} \\in \\mathbb{R}^{H \\times W \\times C}</span> 逐步降采样，生成 1/2、1/4、1/8 分辨率的多尺度特征图。这些中间特征图保留了丰富的局部纹理和边界信息，将在解码阶段通过跳跃连接被复用。</p>\n<p><strong>2. Transformer 编码器</strong>：在 CNN 特征图（1/8 分辨率，经 ResNet-50 stage3 后进一步处理到 1/16）上进行 patch embedding。不同于原始 ViT 直接在原图上切 16×16 的 patch，TransUNet 在 CNN 特征图上切 1×1 的 patch，这等效于在原图上使用 16×16 的感受野。每个 patch 通过线性投影映射到 <span class=\"kb-math kb-math-inline\">D</span> 维嵌入空间，并加上可学习的位置编码：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{z}_0 = [\\mathbf{x}_p^1 \\mathbf{E};\\, \\mathbf{x}_p^2 \\mathbf{E};\\, \\cdots;\\, \\mathbf{x}_p^N \\mathbf{E}] + \\mathbf{E}_{pos}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{E} \\in \\mathbb{R}^{(P^2 \\cdot C) \\times D}</span> 为投影矩阵，<span class=\"kb-math kb-math-inline\">\\mathbf{E}_{pos} \\in \\mathbb{R}^{N \\times D}</span> 为位置编码，<span class=\"kb-math kb-math-inline\">N = \\frac{HW}{P^2}</span> 为序列长度。</p>\n<p>随后，嵌入序列经过 <span class=\"kb-math kb-math-inline\">L=12</span> 层 Transformer 编码器，每层包含多头自注意力（MSA）和多层感知机（MLP），均带有 LayerNorm 和残差连接：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{z}&#x27;_\\ell = \\text{MSA}(\\text{LN}(\\mathbf{z}_{\\ell-1})) + \\mathbf{z}_{\\ell-1}</div>\n<div class=\"kb-math kb-math-display\">\\mathbf{z}_\\ell = \\text{MLP}(\\text{LN}(\\mathbf{z}&#x27;_\\ell)) + \\mathbf{z}&#x27;_\\ell</div>\n<p>选择混合编码器而非纯 Transformer 的原因有二：（1）CNN 中间层提供了解码阶段所需的高分辨率特征；（2）实验表明混合编码器性能优于纯 Transformer 编码器（DSC 71.29% vs 67.86%）。</p>\n<h5>级联上采样器（CUP）与跳跃连接</h5>\n<p>Transformer 编码器输出 <span class=\"kb-math kb-math-inline\">\\mathbf{z}_L \\in \\mathbb{R}^{\\frac{HW}{P^2} \\times D}</span>，首先 reshape 为 2D 特征图 <span class=\"kb-math kb-math-inline\">\\frac{H}{P} \\times \\frac{W}{P} \\times D</span>（如 14×14×768）。</p>\n<p><strong>CUP</strong> 由多个上采样块级联组成，每个块依次执行：2× 双线性上采样 → 3×3 卷积 → ReLU。通过 4 个这样的块，特征图从 14×14 逐步恢复到 224×224。</p>\n<p><strong>跳跃连接</strong> 在 CUP 的前三个上采样步骤中引入，分别在 1/8（28×28）、1/4（56×56）、1/2（112×112）三个分辨率尺度上，将 CNN 编码器对应层的特征图与上采样特征拼接后通过卷积融合。这一设计直接借鉴了 U-Net 的核心思想。</p>\n<div class=\"warn-box\">⚠️ <strong>关键消融发现</strong>：跳跃连接的数量对性能影响显著。0 个跳跃连接（即 R50-ViT-CUP）DSC 为 71.29%，1 个跳跃连接提升至约 74%，3 个跳跃连接达到 77.48%。小器官（主动脉、胆囊、胰腺）的提升尤为明显，因为这些器官更依赖精细的边界信息。</div>\n<h5>与传统方法的对比</h5>\n<p>论文通过系统的消融实验揭示了各组件的贡献：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>配置</th>\n<th>编码器</th>\n<th>解码器</th>\n<th>跳跃连接</th>\n<th>DSC (%)</th>\n<th>HD (mm)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>ViT-None</td>\n<td>ViT</td>\n<td>直接上采样</td>\n<td>无</td>\n<td>61.50</td>\n<td>39.61</td>\n</tr>\n<tr>\n<td>ViT-CUP</td>\n<td>ViT</td>\n<td>CUP</td>\n<td>无</td>\n<td>67.86</td>\n<td>36.11</td>\n</tr>\n<tr>\n<td>R50-ViT-CUP</td>\n<td>R50+ViT</td>\n<td>CUP</td>\n<td>无</td>\n<td>71.29</td>\n<td>32.87</td>\n</tr>\n<tr>\n<td><strong>TransUNet</strong></td>\n<td><strong>R50+ViT</strong></td>\n<td><strong>CUP</strong></td>\n<td><strong>3 个</strong></td>\n<td><strong>77.48</strong></td>\n<td><strong>31.69</strong></td>\n</tr>\n<tr>\n<td>R50-U-Net</td>\n<td>R50</td>\n<td>U-Net 解码器</td>\n<td>有</td>\n<td>74.68</td>\n<td>36.87</td>\n</tr>\n<tr>\n<td>R50-AttnUNet</td>\n<td>R50</td>\n<td>AttnUNet 解码器</td>\n<td>注意力门控</td>\n<td>75.57</td>\n<td>36.97</td>\n</tr>\n</tbody>\n</table></div>\n<p>从表中可以看出：（1）CUP 比直接上采样提升 6.36% DSC；（2）混合编码器比纯 ViT 再提升 3.43%；（3）跳跃连接带来最后 6.19% 的关键提升，使 TransUNet 超越所有纯 CNN 方法。</p>\n<h5>训练细节</h5>\n<ul>\n<li><strong>优化器</strong>：SGD，学习率 0.01，动量 0.9，权重衰减 1e-4</li>\n<li><strong>输入分辨率</strong>：默认 224×224，patch size 16×16，序列长度 196</li>\n<li><strong>预训练</strong>：ViT 和 ResNet-50 均使用 ImageNet-21k 预训练</li>\n<li><strong>数据增强</strong>：随机旋转和翻转</li>\n<li><strong>推理</strong>：3D 体积逐切片推理，2D 预测堆叠重建 3D 结果</li>\n<li><strong>硬件</strong>：单张 NVIDIA RTX 2080Ti</li>\n</ul>\n<h5>其他消融发现</h5>\n<ul>\n<li><strong>输入分辨率</strong>：从 224×224 提升到 512×512，DSC 从 77.48% 提升至 84.36%（+6.88%），但计算代价显著增加</li>\n<li><strong>Patch 大小</strong>：patch size 从 32→16→8，DSC 从 76.99%→77.48%→77.83%，更小的 patch（更长的序列）使 Transformer 能编码更复杂的依赖关系</li>\n<li><strong>模型规模</strong>：Large 模型（24 层，D=1024）比 Base 模型（12 层，D=768）DSC 高约 1%（78.52% vs 77.48%）</li>\n<li><strong>跳跃连接中的 Transformer</strong>：在 1/8 分辨率的跳跃连接中加入轻量 Transformer，额外提升 1.4% DSC</li>\n</ul>",
      "quiz": {
        "q": "TransUNet 相比直接使用 ViT 进行分割（ViT-None）的核心改进是什么？",
        "options": [
          "使用更大的 Transformer 模型（Large 替代 Base）",
          "引入 CNN-Transformer 混合编码器 + 级联上采样器 + U-Net 式跳跃连接",
          "将 patch size 从 16 减小到 8 以获得更长的序列",
          "使用更高分辨率的 512×512 输入图像"
        ],
        "answer": 1,
        "explain": "TransUNet 的三大核心改进是：(1) 用 ResNet-50 + ViT 混合编码器替代纯 ViT，保留多尺度 CNN 特征；(2) 用级联上采样器（CUP）替代直接上采样，逐步恢复分辨率；(3) 引入 U-Net 式跳跃连接融合高分辨率特征。这三者共同将 DSC 从 61.50% 提升至 77.48%。"
      }
    },
    {
      "id": "swin_unet",
      "num": 12,
      "name": "Swin-Unet",
      "fullName": "Swin-Unet: 纯Transformer医学图像分割 (Swin-Unet: Unet-like Pure Transformer for Medical Image Segmentation)",
      "year": "2021",
      "org": "微软亚研/慕尼黑工大",
      "parent": "transunet",
      "paperUrl": "https://arxiv.org/abs/2105.05537",
      "projectUrl": "",
      "category": "segmentation",
      "motivation": "移动窗口机制实现纯Transformer的U型医学分割",
      "summary": "Swin-Unet 提出了首个**纯 Transformer** 的 U 形编解码架构用于医学图像分割，通过在编码器中使用 Swin Transformer 的移位窗口自注意力进行层级特征提取，并设计对称的 **Patch Expanding Layer** 实现上采样解码，在 Synapse 多器官 CT 和 ACDC 心脏 MRI 数据集上超越了 CNN 及 CNN-Transformer 混合方法。",
      "keyPoints": [
        "<strong>纯 Transformer U 形架构</strong>：编码器、瓶颈层、解码器全部基于 Swin Transformer block，不依赖任何卷积操作",
        "<strong>Patch Expanding Layer</strong>：与 Patch Merging 对称的上采样模块，通过线性层将特征维度扩展至 <span class=\"kb-math kb-math-inline\">2C^2</span>，再 reshape 实现 2× 空间分辨率上采样",
        "<strong>移位窗口自注意力（W-MSA / SW-MSA）</strong>：在固定窗口内计算自注意力以降低计算复杂度，交替使用移位窗口建立跨窗口连接",
        "<strong>Skip Connection</strong>：编码器多尺度特征与解码器对应层级特征拼接后通过线性层融合",
        "<strong>ImageNet-22K 预训练</strong>：编码器使用 Swin Transformer Tiny 的 ImageNet-22K 预训练权重初始化，解码器随机初始化",
        "<strong>实验基准</strong>：Synapse 多器官 CT（DSC 79.13% / HD 21.55mm）、ACDC 心脏 MRI（DSC 90.00%）"
      ],
      "detail": "<p><img alt=\"Swin-Unet 整体架构图\" src=\"https://ar5iv.labs.arxiv.org/html/2105.05537/assets/images/Swin-unet.png\" />\n<em>图 1：Swin-Unet 架构，由编码器（Patch Embedding + Swin Transformer Blocks + Patch Merging）、瓶颈层、解码器（Swin Transformer Blocks + Patch Expanding）和跳跃连接组成</em></p>\n<p><img alt=\"Swin Transformer Block 结构\" src=\"https://ar5iv.labs.arxiv.org/html/2105.05537/assets/images/swin_block.png\" />\n<em>图 2：Swin Transformer Block 内部结构，连续两个 block 分别使用 W-MSA 和 SW-MSA</em></p>\n<pre><code class=\"language-python\"># Swin-Unet 前向传播伪代码\ndef swin_unet_forward(x):\n    # x: (B, H, W, 1) 医学图像输入，224×224\n\n    # === Patch Embedding ===\n    tokens = patch_embed(x, patch_size=4)  # (B, H/4*W/4, C), C=96\n\n    # === Encoder: 3 stages ===\n    skip_features = []\n    for stage in [stage1, stage2, stage3]:\n        tokens = swin_transformer_blocks(tokens)  # 2× Swin Blocks (W-MSA + SW-MSA)\n        skip_features.append(tokens)\n        tokens = patch_merging(tokens)  # 2× downsample, dim → 2×dim\n\n    # === Bottleneck ===\n    tokens = swin_transformer_blocks(tokens)  # 2× Swin Blocks at lowest resolution\n\n    # === Decoder: 3 stages (symmetric) ===\n    for stage in [stage1, stage2, stage3]:\n        tokens = patch_expanding(tokens)  # 2× upsample, dim → dim/2\n        tokens = concat(tokens, skip_features.pop())  # skip connection\n        tokens = linear_projection(tokens)  # fuse concatenated features\n        tokens = swin_transformer_blocks(tokens)  # 2× Swin Blocks\n\n    # === Final Patch Expanding (4×) + Segmentation Head ===\n    tokens = patch_expanding_4x(tokens)  # restore to H×W resolution\n    output = linear_classifier(tokens)  # (B, H, W, num_classes)\n    return output\n</code></pre>\n<p><strong>动机与背景</strong></p>\n<p>医学图像分割长期由 U-Net 及其 CNN 变体主导。CNN 的局部感受野限制了对远距离空间依赖关系的建模能力，而这种全局上下文对于器官形状和位置关系的理解至关重要。TransUNet 等工作尝试将 Transformer 引入编码器，但仍依赖 CNN 解码器进行上采样。Swin-Unet 的核心动机是：<strong>能否构建一个完全不依赖卷积的纯 Transformer 分割网络，同时保持 U-Net 的多尺度编解码优势？</strong></p>\n<p><strong>核心机制：Swin Transformer Block 与移位窗口</strong></p>\n<p>Swin-Unet 的基本计算单元是 Swin Transformer Block，每个 block 包含一个窗口多头自注意力（W-MSA 或 SW-MSA）、LayerNorm 和 MLP。标准 ViT 的全局自注意力计算复杂度为 <span class=\"kb-math kb-math-inline\">\\mathcal{O}(n^2)</span>（<span class=\"kb-math kb-math-inline\">n</span> 为 token 总数），而 W-MSA 将特征图划分为 <span class=\"kb-math kb-math-inline\">M \\times M</span>（默认 <span class=\"kb-math kb-math-inline\">M=7</span>）的不重叠窗口，在每个窗口内独立计算自注意力，复杂度降至 <span class=\"kb-math kb-math-inline\">\\mathcal{O}(M^2 \\cdot n)</span>，对 <span class=\"kb-math kb-math-inline\">n</span> 为线性。连续两个 block 交替使用常规窗口和移位窗口：</p>\n<div class=\"kb-math kb-math-display\">\\hat{z}^l = \\text{W-MSA}(\\text{LN}(z^{l-1})) + z^{l-1}</div>\n<div class=\"kb-math kb-math-display\">z^l = \\text{MLP}(\\text{LN}(\\hat{z}^l)) + \\hat{z}^l</div>\n<div class=\"kb-math kb-math-display\">\\hat{z}^{l+1} = \\text{SW-MSA}(\\text{LN}(z^l)) + z^l</div>\n<div class=\"kb-math kb-math-display\">z^{l+1} = \\text{MLP}(\\text{LN}(\\hat{z}^{l+1})) + \\hat{z}^{l+1}</div>\n<p>其中 SW-MSA 通过将窗口偏移 <span class=\"kb-math kb-math-inline\">\\lfloor M/2 \\rfloor</span> 像素，使相邻窗口的 token 能够交互，从而在不增加计算量的前提下建立跨窗口的信息流动。这种设计是 Swin-Unet 能够高效建模全局上下文的关键。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：移位窗口机制的精妙之处在于——它用两次线性复杂度的局部注意力，等效实现了一次全局注意力的信息传播效果。</div>\n<p><strong>编码器的层级下采样：Patch Merging</strong></p>\n<p>编码器由 3 个 stage 组成，每个 stage 包含若干 Swin Transformer Block，stage 之间通过 Patch Merging 层进行 2× 空间下采样。Patch Merging 将相邻 <span class=\"kb-math kb-math-inline\">2 \\times 2</span> 位置的 token 拼接为一个 token（通道维度变为 <span class=\"kb-math kb-math-inline\">4C</span>），再通过线性层降维至 <span class=\"kb-math kb-math-inline\">2C</span>。这样，经过 3 次 Patch Merging 后，特征图分辨率从 <span class=\"kb-math kb-math-inline\">\\frac{H}{4} \\times \\frac{W}{4}</span> 逐步降至 <span class=\"kb-math kb-math-inline\">\\frac{H}{32} \\times \\frac{W}{32}</span>，通道数从 <span class=\"kb-math kb-math-inline\">C</span> 增至 <span class=\"kb-math kb-math-inline\">8C</span>。</p>\n<p><strong>解码器的核心创新：Patch Expanding Layer</strong></p>\n<p>Patch Expanding 是 Swin-Unet 最重要的设计贡献，它是 Patch Merging 的对称逆操作。具体地，对于输入特征 <span class=\"kb-math kb-math-inline\">\\mathbb{R}^{\\frac{H}{s} \\times \\frac{W}{s} \\times C_{\\text{in}}}</span>，Patch Expanding 首先通过线性层将通道维度扩展至 <span class=\"kb-math kb-math-inline\">2C_{\\text{in}}</span>，然后执行 reshape 操作将通道维度的信息重新排列到空间维度，实现 2× 上采样，输出为 <span class=\"kb-math kb-math-inline\">\\mathbb{R}^{\\frac{H}{s/2} \\times \\frac{W}{s/2} \\times C_{\\text{in}}/2}</span>。这一设计完全避免了转置卷积或双线性插值等 CNN 操作，保持了架构的纯 Transformer 特性。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：最终恢复到原始分辨率时使用的是 4× Patch Expanding（而非 2×），因为 Patch Embedding 阶段已将分辨率降低了 4 倍。</div>\n<p><strong>跳跃连接与预训练策略</strong></p>\n<p>与 U-Net 类似，Swin-Unet 在编码器和解码器的对应层级之间建立跳跃连接。编码器的多尺度特征与 Patch Expanding 上采样后的解码器特征在通道维度上拼接，再通过线性层将通道数恢复。这种设计有效缓解了深层语义信息与浅层空间细节之间的信息鸿沟。</p>\n<p>训练策略上，Swin-Unet 采用 Swin Transformer Tiny 配置（<span class=\"kb-math kb-math-inline\">C=96</span>，层数 <span class=\"kb-math kb-math-inline\">[2,2,6,2]</span>，头数 <span class=\"kb-math kb-math-inline\">[3,6,12,24]</span>），编码器和瓶颈层使用 ImageNet-22K 预训练权重初始化，解码器随机初始化。实验表明，ImageNet 预训练对医学图像分割性能至关重要——在 Synapse 数据集上，预训练使 DSC 从约 72% 提升至 79.13%。训练使用 SGD 优化器，学习率 0.05，batch size 24，共 150 个 epoch，输入分辨率 224×224。</p>\n<p><strong>与传统方法的对比</strong></p>\n<p>相比 TransUNet（CNN 编码器 + Transformer + CNN 解码器），Swin-Unet 完全移除了卷积操作，证明纯 Transformer 架构在医学图像分割中的可行性。相比标准 ViT，Swin Transformer 的移位窗口机制将计算复杂度从二次降至线性，使得处理高分辨率医学图像成为可能。在 Synapse 数据集上，Swin-Unet（DSC 79.13%）超越了 TransUNet（77.48%）和 AttnUNet（75.57%），在 ACDC 数据集上达到 90.00% DSC。</p>",
      "quiz": {
        "q": "Swin-Unet 解码器中 Patch Expanding Layer 的核心操作是什么？",
        "options": [
          "使用转置卷积进行 2× 上采样",
          "通过线性层扩展通道维度，再 reshape 将通道信息重排到空间维度实现上采样",
          "使用双线性插值进行上采样后接 1×1 卷积降维",
          "将相邻 2×2 token 拼接后通过线性层降维"
        ],
        "answer": 1,
        "explain": "Patch Expanding 先用线性层将通道维度扩展至 2C，再通过 reshape 将多余通道重排为空间像素，实现纯 Transformer 的 2× 上采样。选项 D 描述的是编码器中的 Patch Merging（下采样）操作。"
      }
    },
    {
      "id": "clam",
      "num": 13,
      "name": "CLAM",
      "fullName": "CLAM: 聚类约束注意力多实例学习 (Data-efficient and weakly supervised computational pathology on whole-slide images)",
      "year": "2021",
      "org": "哈佛医学院",
      "parent": "attention_mil",
      "paperUrl": "https://www.nature.com/articles/s41551-020-00682-w",
      "projectUrl": "",
      "category": "diagnostic",
      "motivation": "聚类约束的注意力机制实现WSI弱监督高效分类",
      "summary": "CLAM 提出了聚类约束注意力多实例学习框架，在只有 slide-level 标签的情况下完成全切片图像分类、ROI 热力图解释和多类别亚型诊断。它用 class-specific attention 聚合 WSI patch 特征，并用高/低注意力 patch 的伪标签做实例级聚类约束，缓解弱监督 WSI 学习中监督信号稀疏的问题。",
      "keyPoints": [
        "<strong>弱监督 WSI 处理</strong>：不需要 ROI 标注或像素级标注，只用整张切片诊断标签训练。",
        "<strong>Patch 特征预提取</strong>：先做组织区域分割与 patch 切块，再用 ImageNet 预训练 CNN 编码每个 patch。",
        "<strong>多分支注意力 MIL</strong>：为每个诊断类别学习独立 attention branch，生成 class-specific slide representation。",
        "<strong>聚类约束</strong>：用高注意力 patch 作为正证据、低注意力 patch 作为负证据，训练实例级聚类分类器。",
        "<strong>多类别亚型诊断</strong>：相比传统二分类 MIL，CLAM 直接支持 RCC、NSCLC 等多类别 subtyping。",
        "<strong>可解释热力图</strong>：把预测类别的 attention score 映射回 WSI 空间，生成诊断相关区域热力图。",
        "<strong>数据效率</strong>：在较少 slide-level 标签下仍能保持高 AUC，尤其优于 max-pooling MIL 和 same-label patch 训练。"
      ],
      "detail": "<h5>4.1 核心示意图</h5>\n<p><img alt=\"CLAM 弱监督 WSI 框架\" src=\"https://cdn.ncbi.nlm.nih.gov/pmc/blobs/b98d/8711640/cb8bbd942cd9/nihms-1723086-f0002.jpg\" />\n<em>图：CLAM 从 WSI 组织区域切 patch，预训练 CNN 编码 patch，注意力网络聚合为 slide representation，并用高/低注意力 patch 训练实例级聚类分支。</em></p>\n<h5>4.2 算法伪代码</h5>\n<pre><code class=\"language-python\"># CLAM 训练流程伪代码\nfor slide, y_slide in dataloader:\n    patches = tile_tissue_regions(slide)\n    H = pretrained_cnn(patches)              # [K, D], K 个 patch 特征\n\n    A = class_specific_attention(H)          # [N_class, K]\n    M = softmax(A, dim=1) @ H                # [N_class, D]\n    logits = classifier(M)                   # slide-level logits\n    loss_slide = cross_entropy(logits, y_slide)\n\n    # in-the-class branch: 最高注意力为正证据，最低注意力为负证据\n    top_idx = topk(A[y_slide], B)\n    bottom_idx = bottomk(A[y_slide], B)\n    inst_x = concat(H[top_idx], H[bottom_idx])\n    inst_y = concat(ones(B), zeros(B))\n    loss_patch = smooth_top1_svm(instance_head[y_slide](inst_x), inst_y)\n\n    # 多类别互斥任务中，可把其他类别分支的高注意力 patch 当作 false positive 负证据\n    loss = c1 * loss_slide + c2 * loss_patch\n    loss.backward()\n    optimizer.step()\n</code></pre>\n<h5>4.3 方法解读</h5>\n<p>CLAM 的背景问题是 WSI 的标注粒度和计算规模不匹配：一张 WSI 可能有数十万 patch，但训练标签通常只有整张切片的诊断结果。传统 MIL 的 max pooling 只让最高分实例参与梯度，same-label 方法又把 slide 标签强行赋给所有 patch，导致大量噪声标签。CLAM 选择 embedding-based MIL：先把 patch 编码为特征，再用可学习注意力做集合聚合。</p>\n<p>核心注意力聚合可写成：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{h}_{\\text{slide}, i}=\\sum_{k=1}^{K} a_{i,k}\\mathbf{h}_k</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">i</span> 表示类别分支，<span class=\"kb-math kb-math-inline\">K</span> 是 patch 数量，<span class=\"kb-math kb-math-inline\">a_{i,k}</span> 是第 <span class=\"kb-math kb-math-inline\">i</span> 类 attention branch 对第 <span class=\"kb-math kb-math-inline\">k</span> 个 patch 的归一化权重。这样每个类别都有自己的“证据视角”：同一张 WSI 中，被腺癌分支关注的区域和被鳞癌分支关注的区域可以不同。</p>\n<p>CLAM 的关键增量是实例级聚类约束。由于没有 patch label，模型从自己的 attention 中构造伪标签：ground-truth 类别分支的 top-<span class=\"kb-math kb-math-inline\">B</span> patch 视为该类正证据，bottom-<span class=\"kb-math kb-math-inline\">B</span> patch 视为负证据；如果任务类别互斥，其他类别分支的 top-<span class=\"kb-math kb-math-inline\">B</span> patch 还可被视为 false positive 负证据。这个辅助任务迫使 patch feature space 把“强诊断证据”和“非诊断证据”拉开。</p>\n<p>训练损失由 slide-level 分类损失和 patch-level 聚类损失组成：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{total}}=c_1\\mathcal{L}_{\\text{slide}}+c_2\\mathcal{L}_{\\text{patch}}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_{\\text{slide}}</span> 通常是交叉熵，<span class=\"kb-math kb-math-inline\">\\mathcal{L}_{\\text{patch}}</span> 使用 smooth top-1 SVM loss。论文选择 margin-style 的实例损失，是因为 attention 伪标签不可避免有噪声；带 margin 的损失比直接交叉熵更不容易过拟合错误伪标签。</p>\n<p>推理时，CLAM 对所有 tissue patch 计算 attention score 和 slide logits。预测类别对应的 attention score 会被归一化为 percentile 后映射回原始 WSI 坐标，形成 heatmap。这个热力图不是显式分割模型输出，但在病理诊断中可作为“模型依赖哪些形态学区域”的解释工具。</p>\n<div class=\"key-point\">💡 关键：CLAM 不是简单把 Attention MIL 用到病理图像，而是在 attention 选出的代表性 patch 上加入实例级可分性约束，让弱监督训练从“一个 slide 标签”获得更多可用梯度。</div>\n<h5>4.4 与传统方法的区别</h5>\n<p>相比 max-pooling MIL，CLAM 不只依赖单个最强 patch，而是通过 attention 加权聚合多个诊断区域；相比 mean pooling，CLAM 不会让背景和无关组织等权参与 slide 表示；相比 patch-level same-label 训练，CLAM 不会把全片标签强加给所有 patch。它的代价是需要先离线提取 patch 特征，并且 attention 伪标签仍可能在早期训练阶段出错，因此聚类约束更适合与稳健的 slide-level loss 共同优化。</p>",
      "quiz": {
        "q": "CLAM 中实例级聚类约束的主要作用是什么？",
        "options": [
          "用像素级标注训练一个额外的分割头",
          "把高/低注意力 patch 构造成伪标签，增强 patch 特征空间的可分性",
          "用 NMS 合并多个 WSI 预测框",
          "把所有 patch 的 slide 标签都改成独立 patch 标签"
        ],
        "answer": 1,
        "explain": "CLAM 没有 patch-level 真值标签，因此利用 attention 选出的 top/bottom patch 构造伪监督，约束诊断证据和负证据在特征空间中分离。"
      }
    },
    {
      "id": "medsam",
      "num": 14,
      "name": "MedSAM",
      "fullName": "MedSAM: 医学影像万物分割 (Segment Anything in Medical Images)",
      "year": "2024",
      "org": "哈佛/麻省总医院",
      "parent": "—",
      "paperUrl": "https://www.nature.com/articles/s41467-024-44824-z",
      "projectUrl": "",
      "category": "foundation_model",
      "motivation": "157万医学图像训练的通用分割基础模型",
      "summary": "MedSAM 在包含 160 万张医学图像-掩码对、覆盖 11 种成像模态和 30 余种癌症类型的大规模数据集上微调 SAM（Segment Anything Model），构建了首个真正意义上的通用医学图像分割基础模型，在多种模态和解剖结构上均显著优于原始 SAM 及专用模型。",
      "keyPoints": [
        "<strong>大规模医学数据集构建</strong>：收集并整理了约 1,570,263 张医学图像-掩码对，覆盖 CT、MRI、内窥镜、皮肤镜、X 光、超声、眼底、病理等 11 种成像模态",
        "<strong>覆盖广泛的解剖结构</strong>：涵盖 30 余种癌症类型和多种器官/组织的分割任务",
        "<strong>基于 SAM 的微调策略</strong>：采用 ViT-B 图像编码器 + 提示编码器（Bounding Box）+ 掩码解码器的三组件架构，在医学数据上端到端微调",
        "<strong>损失函数设计</strong>：使用 Dice Loss 与交叉熵损失的无权重组合，兼顾区域重叠与像素级精度",
        "<strong>轻量高效</strong>：整体仅 93.74M 参数，推理时单张图像分割仅需数秒",
        "<strong>广泛的基准评估</strong>：在 86 个内部验证任务和 60 个外部验证任务上进行了全面评估，DSC 指标全面领先原始 SAM",
        "<strong>开源生态</strong>：模型权重、训练代码和数据集均已开源，促进社区复现与扩展"
      ],
      "detail": "<p><img alt=\"MedSAM 整体框架图\" src=\"https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41467-024-44824-z/MediaObjects/41467_2024_44824_Fig1_HTML.png\" />\n<em>图：MedSAM 的整体框架。左侧展示了覆盖 11 种成像模态的大规模训练数据集；右侧展示了基于 SAM 架构的三组件模型（图像编码器、提示编码器、掩码解码器）</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># MedSAM 训练流程伪代码\n# 1. 数据准备：收集 1.57M 医学图像-掩码对，覆盖 11 种模态\n# 2. 模型初始化：加载 SAM ViT-B 预训练权重\n\nmodel = SAM(\n    image_encoder=ViT_B(patch_size=16, img_size=1024),  # ~89.67M params\n    prompt_encoder=PromptEncoder(embed_dim=256),          # ~0.006M params\n    mask_decoder=MaskDecoder(num_heads=8, depth=2)        # ~4.06M params\n)\nmodel.load_pretrained(&quot;sam_vit_b.pth&quot;)\n\noptimizer = AdamW(model.parameters(), lr=1e-4, weight_decay=0.01)\nscheduler = LinearWarmup(optimizer, warmup_period=250)\n\nfor epoch in range(num_epochs):\n    for (image, mask, bbox) in dataloader:\n        # 图像编码\n        image_embedding = model.image_encoder(image)  # [B, 256, 64, 64]\n\n        # 提示编码（使用 bounding box 作为提示）\n        sparse_embed, dense_embed = model.prompt_encoder(bbox)\n\n        # 掩码解码\n        pred_mask, iou_pred = model.mask_decoder(\n            image_embedding, sparse_embed, dense_embed\n        )\n\n        # 损失计算：Dice Loss + Cross-Entropy Loss\n        loss = dice_loss(pred_mask, mask) + ce_loss(pred_mask, mask)\n\n        loss.backward()\n        optimizer.step()\n        scheduler.step()\n</code></pre>\n<h5>动机与背景</h5>\n<p>医学图像分割是临床诊断、手术规划和疗效评估的基础任务。然而，传统方法面临两大核心挑战：</p>\n<ol>\n<li>\n<p><strong>模态碎片化</strong>：医学影像涵盖 CT、MRI、超声、X 光、内窥镜、病理切片等多种模态，每种模态的成像原理、分辨率和对比度差异巨大。传统做法是为每种模态甚至每种任务训练专用模型，导致开发成本极高。</p>\n</li>\n<li>\n<p><strong>标注稀缺性</strong>：医学图像标注需要专业医师参与，成本高昂且耗时。单一任务的标注数据往往有限，难以训练出泛化能力强的模型。</p>\n</li>\n</ol>\n<p>Meta AI 提出的 SAM（Segment Anything Model）在自然图像上展现了强大的零样本分割能力，但直接应用于医学图像时性能显著下降。这是因为医学图像与自然图像在成像特性上存在本质差异——医学图像通常对比度低、边界模糊、目标尺度变化大，且包含自然图像中不存在的特殊结构（如肿瘤、血管、器官边界等）。</p>\n<div class=\"key-point\">💡 关键：MedSAM 的核心思路是\"用大规模医学数据弥合领域鸿沟\"——通过在覆盖广泛模态的医学数据上微调 SAM，使其获得医学图像的领域知识，同时保留 SAM 原有的通用分割能力。</div>\n<h5>核心架构设计</h5>\n<p>MedSAM 继承了 SAM 的三组件架构，并在医学数据上进行端到端微调：</p>\n<p><strong>1. 图像编码器（Image Encoder）</strong></p>\n<p>采用 ViT-B（Vision Transformer Base）作为骨干网络，包含 12 个 Transformer 块，参数量约 89.67M。输入图像统一缩放至 <span class=\"kb-math kb-math-inline\">1024 \\times 1024</span> 分辨率，经过 patch embedding（patch size = 16）后生成 <span class=\"kb-math kb-math-inline\">64 \\times 64</span> 的特征图。</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{F} = \\text{ViT-B}(\\mathbf{I}), \\quad \\mathbf{F} \\in \\mathbb{R}^{256 \\times 64 \\times 64}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{I} \\in \\mathbb{R}^{3 \\times 1024 \\times 1024}</span> 为输入图像（灰度图像复制为三通道）。</p>\n<p><strong>2. 提示编码器（Prompt Encoder）</strong></p>\n<p>MedSAM 专注于 <strong>Bounding Box 提示</strong>，这是因为在医学场景中，框选目标区域是最自然、最高效的交互方式。提示编码器将 bounding box 的左上角和右下角坐标编码为稀疏嵌入向量：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{p}_{\\text{sparse}} = \\text{PE}(x_1, y_1) + \\mathbf{e}_{\\text{top-left}} + \\text{PE}(x_2, y_2) + \\mathbf{e}_{\\text{bottom-right}}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\text{PE}</span> 为位置编码函数，<span class=\"kb-math kb-math-inline\">\\mathbf{e}</span> 为可学习的角点类型嵌入。提示编码器参数量极小（约 6K），但在引导分割中起关键作用。</p>\n<p><strong>3. 掩码解码器（Mask Decoder）</strong></p>\n<p>采用轻量级的两层 Transformer 解码器，结合图像嵌入和提示嵌入生成最终的分割掩码。解码器使用交叉注意力机制融合图像特征与提示信息：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{M} = \\text{MaskDecoder}(\\mathbf{F}, \\mathbf{p}_{\\text{sparse}}, \\mathbf{p}_{\\text{dense}})</div>\n<p>解码器输出分割掩码和对应的 IoU 预测分数，参数量约 4.06M。</p>\n<div class=\"warn-box\">⚠️ 注意：与原始 SAM 支持点、框、文本等多种提示不同，MedSAM 仅使用 bounding box 提示。这一设计选择基于实验发现——在医学场景中，bounding box 提示比点提示更稳定、更符合临床工作流。</div>\n<h5>损失函数设计</h5>\n<p>MedSAM 使用 Dice Loss 和交叉熵损失（Cross-Entropy Loss）的无权重线性组合：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\mathcal{L}_{\\text{Dice}} + \\mathcal{L}_{\\text{CE}}</div>\n<p>其中 Dice Loss 定义为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{Dice}} = 1 - \\frac{2 \\sum_{i} p_i g_i + \\epsilon}{\\sum_{i} p_i + \\sum_{i} g_i + \\epsilon}</div>\n<p>交叉熵损失定义为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{CE}} = -\\frac{1}{N} \\sum_{i} \\left[ g_i \\log(p_i) + (1 - g_i) \\log(1 - p_i) \\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">p_i</span> 为预测概率，<span class=\"kb-math kb-math-inline\">g_i</span> 为真实标签，<span class=\"kb-math kb-math-inline\">\\epsilon</span> 为平滑项。</p>\n<div class=\"key-point\">💡 关键：Dice Loss 直接优化区域重叠度（DSC），对类别不平衡天然鲁棒；交叉熵损失提供像素级的梯度信号，有助于精细边界学习。两者互补，是医学图像分割中的经典组合。</div>\n<h5>大规模数据集构建</h5>\n<p>MedSAM 的核心竞争力之一在于其训练数据的规模和多样性：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>详情</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>总样本量</strong></td>\n<td>~1,570,263 张图像-掩码对</td>\n</tr>\n<tr>\n<td><strong>成像模态</strong></td>\n<td>CT、MRI、内窥镜、皮肤镜、X 光、超声、眼底、病理、乳腺 X 光、OCT 等 11 种</td>\n</tr>\n<tr>\n<td><strong>解剖覆盖</strong></td>\n<td>30+ 种癌症类型，涵盖脑、胸、腹、骨盆等多个解剖区域</td>\n</tr>\n<tr>\n<td><strong>数据来源</strong></td>\n<td>整合多个公开数据集和私有数据集</td>\n</tr>\n<tr>\n<td><strong>3D 数据处理</strong></td>\n<td>CT/MRI 等 3D 数据按切片提取为 2D 图像</td>\n</tr>\n</tbody>\n</table></div>\n<p>数据预处理流程包括：\n- 所有图像统一缩放至 <span class=\"kb-math kb-math-inline\">1024 \\times 1024</span>\n- 灰度图像复制为三通道 RGB\n- CT 图像进行窗宽窗位调整后归一化至 [0, 255]\n- 从分割掩码自动生成 bounding box 提示（训练时添加 0-20 像素随机扰动以增强鲁棒性）</p>\n<h5>训练策略</h5>\n<ul>\n<li><strong>优化器</strong>：AdamW，学习率 <span class=\"kb-math kb-math-inline\">1 \\times 10^{-4}</span>，权重衰减 0.01</li>\n<li><strong>学习率调度</strong>：线性预热（250 步）</li>\n<li><strong>批大小</strong>：每 GPU 批大小为 2，使用多 GPU 分布式训练</li>\n<li><strong>训练硬件</strong>：4 × NVIDIA A100 80GB GPU</li>\n<li><strong>训练时长</strong>：未明确给出具体 epoch 数，但训练至收敛</li>\n<li><strong>全参数微调</strong>：图像编码器、提示编码器和掩码解码器均参与微调</li>\n</ul>\n<h5>与原始 SAM 的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>对比维度</th>\n<th>SAM</th>\n<th>MedSAM</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>训练数据</strong></td>\n<td>SA-1B（11M 自然图像，1B 掩码）</td>\n<td>~1.57M 医学图像-掩码对，11 种模态</td>\n</tr>\n<tr>\n<td><strong>提示类型</strong></td>\n<td>点、框、文本、掩码</td>\n<td>仅 Bounding Box</td>\n</tr>\n<tr>\n<td><strong>目标域</strong></td>\n<td>自然图像通用分割</td>\n<td>医学图像通用分割</td>\n</tr>\n<tr>\n<td><strong>医学图像 DSC</strong></td>\n<td>较低（平均约 60-70%）</td>\n<td>显著提升（平均约 80-85%+）</td>\n</tr>\n<tr>\n<td><strong>临床适用性</strong></td>\n<td>需要大量人工修正</td>\n<td>可直接辅助临床标注</td>\n</tr>\n</tbody>\n</table></div>\n<h5>实验结果亮点</h5>\n<p>MedSAM 在 86 个内部验证任务和 60 个外部验证任务上进行了全面评估：</p>\n<ul>\n<li><strong>全面超越原始 SAM</strong>：在几乎所有模态和任务上，MedSAM 的 DSC 均显著高于默认 SAM（ViT-B）</li>\n<li><strong>跨模态泛化</strong>：在训练中未见过的特定子任务上也展现出良好的泛化能力</li>\n<li><strong>与专用模型竞争</strong>：在多个任务上达到或超过针对特定任务训练的专用模型性能</li>\n<li><strong>NSD 指标优异</strong>：归一化表面距离（NSD）指标同样表现优秀，表明边界分割精度高</li>\n</ul>",
      "quiz": {
        "q": "MedSAM 相比原始 SAM 的核心改进策略是什么？",
        "options": [
          "修改了 ViT 架构，增加了医学图像专用的注意力模块",
          "在大规模多模态医学图像数据集上对 SAM 进行端到端微调",
          "使用了更大的 ViT-H 编码器以提升特征提取能力",
          "引入了文本提示来描述医学目标的语义信息"
        ],
        "answer": 1,
        "explain": "MedSAM 的核心策略是在约 157 万张覆盖 11 种模态的医学图像-掩码对上对 SAM（ViT-B）进行端到端微调，而非修改模型架构。这种'数据驱动的领域适配'方法使模型获得了医学图像的领域知识。"
      }
    },
    {
      "id": "medsam_v1",
      "num": 15,
      "name": "MedSAM-Video",
      "fullName": "MedSAM视频分割版本 (Medical SAM 2: Segment medical images as video via Segment Anything Model 2)",
      "year": "2024.08",
      "org": "哈佛/麻省总医院",
      "parent": "medsam",
      "paperUrl": "https://arxiv.org/abs/2408.00874",
      "projectUrl": "",
      "category": "foundation_model",
      "motivation": "将3D扫描视为视频序列实现体积自动分割",
      "summary": "MedSAM-2 将 3D 医学图像和 2D 医学图像流统一建模为“视频”，复用 SAM 2 的视频记忆机制完成跨切片/跨图像分割。它进一步提出 confidence memory bank 和 weighted pick-up，让一次提示能传播到后续切片或相似 2D 图像，解决医学分割中逐切片交互成本高的问题。",
      "keyPoints": [
        "<strong>医学图像即视频</strong>：把 CT/MRI 等 3D 扫描的连续切片视为时序帧，把 2D 图像集合视为可传播的 image flow。",
        "<strong>基于 SAM 2</strong>：继承 image encoder、prompt encoder、memory encoder、memory attention、mask decoder 的视频分割管线。",
        "<strong>Confidence Memory Bank</strong>：推理时优先保留高置信预测和用户提示帧，减少错误 mask 进入记忆库带来的漂移。",
        "<strong>Weighted Pick-up</strong>：根据当前图像与记忆图像的相似度加权读取 memory，而不是对所有 memory 等权融合。",
        "<strong>One-Prompt Segmentation</strong>：一次 prompt 不只服务一张图，还能迁移到同任务的其他 2D 医学图像。",
        "<strong>多任务评估</strong>：覆盖白细胞、视杯、视网膜血管、下颌骨、冠状动脉、肾肿瘤、肝肿瘤、腹部器官等 2D/3D 任务。"
      ],
      "detail": "<h5>4.1 核心示意图</h5>\n<p><img alt=\"MedSAM-2 框架\" src=\"https://arxiv.org/html/2408.00874v1/extracted/5769329/medsam2face.png\" />\n<em>图：MedSAM-2 基于 SAM 2，把 3D 医学图像和 2D 图像流视为视频，通过 confidence memory bank 与 weighted pick-up 做记忆增强分割。</em></p>\n<h5>4.2 算法伪代码</h5>\n<pre><code class=\"language-python\"># MedSAM-2 推理伪代码\ndef medsam2_segment(frames, prompt_frame, prompt):\n    memory_bank = []\n    outputs = {}\n\n    for t, image in enumerate(frames):\n        image_emb = image_encoder(image)\n\n        if t == prompt_frame:\n            prompt_emb = prompt_encoder(prompt)\n            mask, score, obj_ptr = mask_decoder(image_emb, prompt_emb)\n        else:\n            picked = weighted_pickup(image_emb, memory_bank)\n            conditioned = memory_attention(image_emb, picked)\n            mask, score, obj_ptr = mask_decoder(conditioned, prompt_emb=None)\n\n        outputs[t] = mask\n        if is_confident(score) and is_diverse(image_emb, memory_bank):\n            memory_bank = update_confidence_bank(memory_bank, image_emb, mask, obj_ptr, score)\n\n    return outputs\n</code></pre>\n<h5>4.3 方法解读</h5>\n<p>SAM 2 的核心能力是 promptable video object segmentation：用户在某一帧给出点、框或 mask，模型把对象通过 memory attention 传播到后续帧。MedSAM-2 的观察是，3D 医学体数据的相邻切片在解剖结构上连续，和视频帧的时间连续性高度相似。因此，3D 分割可以转化为“给某个切片一个 prompt，然后沿切片轴跟踪同一目标”。</p>\n<p>基础数据流包括五步：首先每张切片进入 image encoder 得到 dense embedding；用户提示帧进入 prompt encoder；mask decoder 输出当前帧 mask 和对象指针；memory encoder 把预测 mask 与图像特征写入 memory；后续帧通过 memory attention 读取历史对象信息。其直觉公式可以写成：</p>\n<div class=\"kb-math kb-math-display\">\\tilde{\\mathbf{z}}_t=\\text{MemoryAttention}(\\mathbf{z}_t,\\mathcal{M}_{t-1})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{z}_t</span> 是当前切片特征，<span class=\"kb-math kb-math-inline\">\\mathcal{M}_{t-1}</span> 是历史记忆，<span class=\"kb-math kb-math-inline\">\\tilde{\\mathbf{z}}_t</span> 是融合对象记忆后的特征。mask decoder 在 <span class=\"kb-math kb-math-inline\">\\tilde{\\mathbf{z}}_t</span> 上预测当前切片掩码。</p>\n<p>MedSAM-2 对原始 SAM 2 的重要修改是 memory selection。SAM 2 更偏向按时间顺序维护 memory；医学体数据中，一旦某些切片预测错了，错误 mask 会继续污染后续传播。confidence memory bank 改成优先保留高置信、低噪声、且与已有记忆不重复的样本，降低误差累积。</p>\n<p>Weighted pick-up 进一步解决“哪些 memory 对当前切片最有用”的问题。对当前图像 embedding 与 memory embedding 计算相似度，再对 memory value 加权融合：</p>\n<div class=\"kb-math kb-math-display\">w_j=\\frac{\\exp(\\text{sim}(\\mathbf{z}_t,\\mathbf{m}_j))}{\\sum_k \\exp(\\text{sim}(\\mathbf{z}_t,\\mathbf{m}_k))}\n,\\qquad\n\\mathbf{m}^{*}_t=\\sum_j w_j\\mathbf{m}_j</div>\n<p>这个设计使非相邻但外观相似的切片也能被选中，尤其适合病灶形态在若干切片后重新出现、或 2D 图像之间没有严格时间顺序的场景。</p>\n<div class=\"warn-box\">⚠️ 注意：MedSAM-2 的“一次提示”能力依赖同一器官/病灶在序列或图像集合中的外观一致性。跨模态、极端形变或低对比度边界仍可能需要额外交互提示纠偏。</div>\n<h5>4.4 与 MedSAM/SAM 的区别</h5>\n<p>MedSAM 主要是 2D 医学图像交互分割，通常每张图都要 prompt；SAM 2 支持视频，但不是为医学领域设计。MedSAM-2 的变化在于把医学体数据转成视频任务，并让记忆库更适合医学图像：置信优先减少错误传播，相似度加权减少无关帧干扰。相比逐切片运行 2D SAM，这种方式能利用切片间连续性，显著降低 3D 标注和分割交互成本。</p>",
      "quiz": {
        "q": "MedSAM-2 为什么要引入 confidence memory bank？",
        "options": [
          "为了把所有历史切片都永久保存下来",
          "为了优先保留高置信且多样的记忆，减少错误 mask 传播",
          "为了替代 image encoder，直接从文本生成 mask",
          "为了只处理单张 2D 图像，不处理 3D 序列"
        ],
        "answer": 1,
        "explain": "医学切片传播容易累积错误，confidence memory bank 通过置信度和多样性筛选记忆，降低噪声模板对后续切片的影响。"
      }
    },
    {
      "id": "cihm",
      "num": 16,
      "name": "CIHM",
      "fullName": "CIHM: 上下文洞察混合Mamba (Context-Insight Hybrid Mamba for efficient medical image segmentation)",
      "year": "2026.04",
      "org": "中科院/清华大学",
      "parent": "swin_unet",
      "paperUrl": "https://www.researchgate.net/publication/380012345",
      "projectUrl": "",
      "category": "segmentation",
      "motivation": "并行Mamba与CNN分支参数减少345倍",
      "summary": "CIHM 提出一个轻量级混合 Mamba 医学分割网络，用并行 SSM/Mamba 分支建模长程上下文，用 T-shaped CNN 分支补足局部中心细节。它通过 CiMC layer 与 MRDB 多尺度桥接模块，在 ISIC、Synapse、DSB18 等任务上保持竞争性能，同时相对 U-Mamba 大幅减少参数量。",
      "keyPoints": [
        "<strong>CiMC layer</strong>：Context-insight Mamba-CNN layer，核心单元由 SSM/Mamba 分支和 CNN 分支并行组成。",
        "<strong>长程上下文建模</strong>：SSM 分支以线性复杂度捕获远距离依赖，避免 Transformer 的二次复杂度。",
        "<strong>局部细节增强</strong>：CNN 分支采用 T-shaped convolution，强调 patch center 附近的边界和纹理。",
        "<strong>MRDB 模块</strong>：Multiscale Refining Detail Bridge 用 dense multiplication 与 concatenation 融合多尺度上下文。",
        "<strong>轻量化目标</strong>：公开摘要报告其参数量较 U-Net 减少约 40 倍、较 U-Mamba 减少约 345 倍。",
        "<strong>医学分割基准</strong>：在 ISIC2017、ISIC2018、Synapse、DSB18 上验证皮肤病灶、腹部器官、细胞核等场景。"
      ],
      "detail": "<h5>4.1 核心示意图</h5>\n<p><img alt=\"CIHM 框架图\" src=\"https://media.springernature.com/lw1200/springer-static/image/art%3A10.1007%2Fs44267-026-00113-5/MediaObjects/44267_2026_113_Fig1_HTML.png\" />\n<em>图：CIHM 的整体网络与核心模块示意。正式可检索版本见 Visual Intelligence DOI: 10.1007/s44267-026-00113-5；用户给定 ResearchGate 链接更像占位符。</em></p>\n<h5>4.2 算法伪代码</h5>\n<pre><code class=\"language-python\"># CIHM 编码-解码分割伪代码\ndef cihm_forward(x):\n    skips = []\n    for stage in encoder_stages:\n        # CiMC: SSM/Mamba 分支 + CNN 分支并行\n        z_global = mamba_ssm_branch(stage.norm(x))\n        z_local = tshaped_conv_branch(x)\n        x = fuse(z_global, z_local)\n        skips.append(x)\n        x = downsample(x)\n\n    # MRDB: 多尺度细节桥接\n    bridge = mrdb(skips)\n\n    for stage in decoder_stages:\n        x = upsample(x)\n        x = concat(x, bridge.pop(), skips.pop())\n        x = cimh_decoder_block(x)\n\n    return segmentation_head(x)\n</code></pre>\n<h5>4.3 方法解读</h5>\n<p>医学分割模型通常在两类能力之间取舍：CNN 擅长边界、纹理和局部结构，但感受野有限；Transformer 擅长全局关系，但自注意力的 <span class=\"kb-math kb-math-inline\">O(N^2)</span> 复杂度不适合高分辨率医学图像。CIHM 选择 Mamba/SSM 作为全局分支，因为 selective state space model 可以以近似线性复杂度处理长序列特征。</p>\n<p>CiMC layer 的思想是“并行互补”而不是串行堆叠。给定输入特征 <span class=\"kb-math kb-math-inline\">\\mathbf{X}</span>，SSM 分支负责上下文语义：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{Z}_{\\text{ctx}}=\\text{SSM}(\\text{Norm}(\\mathbf{X}))</div>\n<p>CNN 分支负责局部中心洞察：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{Z}_{\\text{local}}=\\text{TConv}(\\mathbf{X})</div>\n<p>最后两路特征融合得到输出：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{Y}=\\phi([\\mathbf{Z}_{\\text{ctx}},\\mathbf{Z}_{\\text{local}}])</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">[\\cdot]</span> 表示通道拼接或融合，<span class=\"kb-math kb-math-inline\">\\phi</span> 表示轻量投影。这样设计的直觉是：Mamba 分支看“器官/病灶在全局图像中的位置和关系”，CNN 分支看“当前局部边缘到底在哪里”。</p>\n<p>MRDB 用于弥补轻量网络中跨尺度信息不足的问题。U-Net 类结构依靠 skip connection 恢复空间细节，但简单拼接可能只是把低层纹理直接送回解码器。MRDB 通过密集乘法和拼接，让不同尺度之间产生交互，强化小目标边界、薄结构和病灶内部纹理。</p>\n<p>训练和推理上，CIHM 仍是标准 encoder-decoder segmentation：输入 2D 医学图像，输出每像素类别概率；损失可按任务使用 Dice、BCE 或 Cross Entropy。它的创新不在训练范式，而在网络块设计：用更小参数量同时覆盖全局依赖和局部细节。</p>\n<div class=\"key-point\">💡 关键：CIHM 的“轻”不是简单减通道，而是把昂贵全局建模换成线性 SSM，并让 CNN 只补最必要的局部中心信息。</div>\n<h5>4.4 与 Swin-UNet/U-Mamba 的区别</h5>\n<p>Swin-UNet 依靠窗口注意力降低 Transformer 成本，但仍需要 attention map 和窗口划分；U-Mamba 将 Mamba 引入 U-Net，但公开摘要显示参数量仍显著高于 CIHM。CIHM 更强调模块级轻量化：CiMC 并行双分支减少冗余，MRDB 在桥接层聚合多尺度细节，整体更适合资源受限的医学分割部署。</p>",
      "quiz": {
        "q": "CIHM 中 CiMC layer 的核心设计是什么？",
        "options": [
          "只使用窗口自注意力替代所有卷积",
          "并行使用 SSM/Mamba 分支建模长程上下文和 CNN 分支提取局部细节",
          "把 3D CT 切片全部转换成文本 token",
          "只保留 U-Net 的最后一层 skip connection"
        ],
        "answer": 1,
        "explain": "CiMC layer 的核心是 Mamba/SSM 与 CNN 并行互补：前者捕获全局上下文，后者通过 T-shaped convolution 强化局部中心结构。"
      }
    },
    {
      "id": "deco_mamba",
      "num": 17,
      "name": "Deco-Mamba",
      "fullName": "Deco-Mamba: 解码器端Mamba优化 (Decoding Matters: Efficient Mamba-Based Decoder with Distribution-Aware Deep Supervision)",
      "year": "2026.03",
      "org": "研究机构",
      "parent": "cihm",
      "paperUrl": "https://arxiv.org/abs/2603.12547",
      "projectUrl": "",
      "category": "segmentation",
      "motivation": "解码器端VSSM与共注意力门深度监督优化",
      "summary": "Deco-Mamba 提出了一种以解码器为中心的 CNN-Mamba 混合 U-Net 架构，通过跨注意力门控（CAG）、视觉状态空间模型块（VSSMB）和可变形残差块（DRB）三级级联解码，并引入基于窗口化 KL 散度的多尺度分布对齐（MSDA）深度监督损失，在多个医学图像分割基准上取得了 SOTA 性能。",
      "keyPoints": [
        "<strong>编码器</strong>：PVT-V2 Transformer + 7×7 CNN 并行双分支，分别捕获全局语义和局部纹理",
        "<strong>解码器三级级联模块</strong>：CAG（跨注意力门控）→ VSSMB（多方向 SSM 扫描）→ DRB（可变形卷积残差块），逐步完成特征选择、长程建模和细节恢复",
        "<strong>CAG 跨注意力门控</strong>：双向注意力（编码器→解码器 + 解码器→编码器）+ 通道注意力，替代传统单向注意力门",
        "<strong>VSSMB</strong>：基于 Mamba 的线性复杂度状态空间模型，4 方向扫描（左→右、右→左、上→下、下→上）捕获全局依赖",
        "<strong>DRB 可变形残差块</strong>：利用可变形卷积的自适应感受野恢复 SSM 丢失的空间细节",
        "<strong>MSDA 损失</strong>：窗口化 KL 散度 + 边界加权的多尺度分布对齐深度监督，替代传统像素级深度监督",
        "<strong>两个变体</strong>：Deco-Mamba-V0（PVT-V2-B0，9.67M 参数）和 Deco-Mamba-V1（PVT-V2-B2，46.93M 参数）",
        "<strong>实验覆盖</strong>：Synapse（8 类）、BTCV（13 类）、ACDC（心脏）、ISIC17/18（皮肤）、GlaS（腺体）、MoNuSeg（核）共 7 个数据集"
      ],
      "detail": "<h5>架构总览</h5>\n<p><img alt=\"Deco-Mamba 架构图\" src=\"https://arxiv.org/html/2603.12547v1/x1.png\" />\n<em>图：Deco-Mamba 整体架构。左侧为 PVT+CNN 双分支编码器，右侧为四级 CAG→VSSMB→DRB 级联解码器，底部展示 MSDA 多尺度分布对齐监督。</em></p>\n<p>Deco-Mamba 采用经典的 U-Net 对称结构，但将设计重心从编码器转移到解码器。编码器使用预训练的 PVT-V2 提取多尺度语义特征，同时并行一个 7×7 大核 CNN 分支保留局部纹理细节。解码器由四个级联阶段组成，每个阶段依次执行三个操作：<strong>特征选择</strong>（CAG）、<strong>全局建模</strong>（VSSMB）和<strong>细节恢复</strong>（DRB）。</p>\n<h5>动机与背景</h5>\n<p>传统医学图像分割方法大多采用\"编码器中心\"的设计哲学——将最强的建模能力集中在编码器（如 ViT、Swin Transformer），而解码器仅做简单的上采样和跳跃连接拼接。这导致两个问题：</p>\n<ol>\n<li><strong>语义鸿沟</strong>：编码器深层特征与浅层特征之间存在巨大的语义差距，简单拼接无法有效融合</li>\n<li><strong>细节丢失</strong>：上采样过程中空间细节逐步退化，边界模糊</li>\n</ol>\n<p>Deco-Mamba 的核心洞察是：<strong>解码器才是决定分割精度的关键瓶颈</strong>。因此，它在解码器中引入了三种互补的机制来分别解决特征选择、长程依赖建模和空间细节恢复问题。</p>\n<h5>编码器：PVT + CNN 双分支</h5>\n<p>编码器由两个并行分支组成：</p>\n<ul>\n<li><strong>PVT-V2 分支</strong>：使用预训练的 Pyramid Vision Transformer V2，输出四个尺度的特征图 <span class=\"kb-math kb-math-inline\">\\{E_i^T\\}_{i=1}^{4}</span>，分辨率分别为 <span class=\"kb-math kb-math-inline\">H/4 \\times W/4</span> 到 <span class=\"kb-math kb-math-inline\">H/32 \\times W/32</span></li>\n<li><strong>CNN 分支</strong>：单层 7×7 大核卷积 + BatchNorm + ReLU，输出 <span class=\"kb-math kb-math-inline\">E^C</span>，保留输入图像的局部纹理和边缘信息</li>\n</ul>\n<p>两个分支的特征在每个解码器阶段通过 CAG 进行自适应融合。</p>\n<h5>CAG：跨注意力门控</h5>\n<p>CAG 是解码器每个阶段的第一个模块，负责从编码器跳跃连接中选择性地提取有用信息。与传统注意力门（AG）仅计算单向注意力不同，CAG 采用<strong>双向交叉注意力</strong>：</p>\n<div class=\"kb-math kb-math-display\">\\alpha_{e \\to d} = \\sigma\\big(W_1 \\cdot \\text{ReLU}(W_e \\cdot E + W_d \\cdot D + b)\\big)</div>\n<div class=\"kb-math kb-math-display\">\\alpha_{d \\to e} = \\sigma\\big(W_2 \\cdot \\text{ReLU}(W_d&#x27; \\cdot D + W_e&#x27; \\cdot E + b&#x27;)\\big)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">E</span> 为编码器特征，<span class=\"kb-math kb-math-inline\">D</span> 为解码器特征。双向注意力分别生成两个门控权重，然后通过加权融合：</p>\n<div class=\"kb-math kb-math-display\">F_{\\text{fused}} = \\alpha_{e \\to d} \\odot E + \\alpha_{d \\to e} \\odot D</div>\n<p>融合后还经过<strong>通道注意力</strong>（全局平均池化 → FC → ReLU → FC → Sigmoid）进一步优化通道权重分配。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：双向注意力让编码器和解码器特征互相\"审视\"对方，比单向门控更能弥合语义鸿沟。</div>\n<h5>VSSMB：视觉状态空间模型块</h5>\n<p>CAG 输出的融合特征送入 VSSMB 进行全局依赖建模。VSSMB 基于 Mamba 的选择性状态空间模型（S6），核心是将 2D 特征图展平为 1D 序列后进行状态空间递推：</p>\n<div class=\"kb-math kb-math-display\">h_t = \\bar{A} h_{t-1} + \\bar{B} x_t, \\quad y_t = C h_t</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\bar{A} = \\exp(\\Delta A)</span>，<span class=\"kb-math kb-math-inline\">\\bar{B} = (\\Delta A)^{-1}(\\exp(\\Delta A) - I) \\cdot \\Delta B</span> 为离散化后的状态转移矩阵。</p>\n<p>为了克服 1D 扫描的方向偏差，VSSMB 采用<strong>四方向扫描</strong>策略（左→右、右→左、上→下、下→上），四个方向的输出通过求和融合：</p>\n<div class=\"kb-math kb-math-display\">Y = \\sum_{d=1}^{4} \\text{SSM}_d(\\text{scan}_d(X))</div>\n<div class=\"key-point\">💡 <strong>关键</strong>：Mamba 的线性复杂度 <span class=\"kb-math kb-math-inline\">O(N)</span> 相比 Transformer 的 <span class=\"kb-math kb-math-inline\">O(N^2)</span> 在高分辨率医学图像上具有显著的效率优势，而多方向扫描弥补了序列模型在 2D 空间建模上的不足。</div>\n<h5>DRB：可变形残差块</h5>\n<p>VSSMB 虽然能捕获全局依赖，但 SSM 的序列化处理会丢失部分空间细节。DRB 使用<strong>可变形卷积</strong>来恢复这些细节：</p>\n<div class=\"kb-math kb-math-display\">y(p) = \\sum_{k=1}^{K} w_k \\cdot x(p + p_k + \\Delta p_k) \\cdot \\Delta m_k</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\Delta p_k</span> 和 <span class=\"kb-math kb-math-inline\">\\Delta m_k</span> 分别是学习到的偏移量和调制权重。可变形卷积能够自适应地调整采样位置，聚焦于器官边界等关键区域。DRB 采用残差连接，确保梯度流畅传播。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：消融实验表明，将可变形卷积替换为标准卷积、Involution 或动态卷积都会导致性能下降，说明自适应空间采样对细节恢复至关重要。</div>\n<h5>MSDA：多尺度分布对齐损失</h5>\n<p>MSDA 是本文提出的新型深度监督策略，核心思想是用<strong>分布级别</strong>的对齐替代传统的<strong>像素级别</strong>监督。</p>\n<p><strong>第一步：窗口化 KL 散度。</strong> 在每个解码器尺度 <span class=\"kb-math kb-math-inline\">s</span>，将预测图和标签图划分为 <span class=\"kb-math kb-math-inline\">K \\times K</span> 的窗口，在每个窗口内计算归一化直方图，然后用 KL 散度度量分布差异：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{KL}}^{(s)}(h,w) = \\sum_{b=1}^{B} \\hat{q}_{h,w}^{(s)}(b) \\log \\frac{\\hat{q}_{h,w}^{(s)}(b)}{\\hat{p}_{h,w}^{(s)}(b) + \\epsilon}</div>\n<p><strong>第二步：边界加权。</strong> 通过 Laplacian 算子检测标签边界区域，对边界附近的窗口赋予更高权重：</p>\n<div class=\"kb-math kb-math-display\">W_{h,w}^{(s)} = \\gamma \\cdot \\mathbb{1}\\big[\\text{Lap}(Y_{\\downarrow s})(h,w) &gt; 0\\big]</div>\n<p><strong>第三步：多尺度聚合。</strong> 不同解码器阶段的损失按递增权重聚合：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{multi}} = \\sum_{s=1}^{S} \\lambda_s \\mathcal{L}_{\\text{dist}}^{(s)}, \\quad \\lambda_1 &lt; \\lambda_2 &lt; \\cdots &lt; \\lambda_S</div>\n<p><strong>最终损失</strong>：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{total}} = \\mathcal{L}_{\\text{dice}} + \\mathcal{L}_{\\text{multi}}</div>\n<div class=\"key-point\">💡 <strong>关键</strong>：传统深度监督强迫低分辨率层产生像素级预测，反而损害边界精度。MSDA 通过分布对齐提供\"软\"监督，既保证区域一致性又增强边界敏感性。消融实验中，MSDA 将 DSC 从 83.84（仅 Dice）提升至 85.07，同时 HD95 从 14.94 降至 14.72。</div>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Deco-Mamba 前向传播伪代码\ndef forward(x):\n    # === 编码器 ===\n    E_T = PVT_V2(x)          # {E1_T, E2_T, E3_T, E4_T} 多尺度 Transformer 特征\n    E_C = CNN_7x7(x)          # 局部纹理特征\n\n    # === 解码器（4 个阶段，从深到浅）===\n    D = E_T[4]                 # 最深层特征作为初始解码器输入\n    for s in [4, 3, 2, 1]:\n        D = Upsample(D)       # 上采样\n        # 阶段 1: 跨注意力门控\n        F = CAG(encoder=E_T[s], decoder=D, cnn=E_C)\n        # 阶段 2: 全局依赖建模\n        F = VSSMB(F)           # 4 方向 Mamba 扫描\n        # 阶段 3: 细节恢复\n        D = DRB(F)             # 可变形卷积残差块\n\n        # MSDA 监督（训练时）\n        pred_s = SegHead(D)\n        L_dist[s] = BoundaryWeighted_KL(pred_s, label_downsampled[s])\n\n    # === 损失 ===\n    L_total = DiceLoss(pred_1, label) + sum(lambda_s * L_dist[s])\n    return pred_1, L_total\n</code></pre>\n<h5>实验结果</h5>\n<p>Deco-Mamba 在 7 个医学图像分割基准上进行了全面评估：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>数据集</th>\n<th>指标</th>\n<th>Deco-Mamba-V0</th>\n<th>Deco-Mamba-V1</th>\n<th>对比最优</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Synapse (8类)</td>\n<td>DSC↑ / HD95↓</td>\n<td>83.16 / 15.89</td>\n<td><strong>85.07 / 14.72</strong></td>\n<td>PAG-TransYnet: 83.43/15.82</td>\n</tr>\n<tr>\n<td>ACDC (心脏)</td>\n<td>DSC↑</td>\n<td>85.14</td>\n<td><strong>86.01</strong></td>\n<td>Cascaded-MERIT: 85.67</td>\n</tr>\n<tr>\n<td>ISIC18 (皮肤)</td>\n<td>DSC↑</td>\n<td><strong>最优</strong></td>\n<td>次优</td>\n<td>—</td>\n</tr>\n<tr>\n<td>MoNuSeg (核)</td>\n<td>DSC↑</td>\n<td>次优</td>\n<td><strong>最优</strong></td>\n<td>+4.46% vs Swin-UMamba</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>效率亮点</strong>：Deco-Mamba-V0 仅 9.67M 参数 / 9.73 GFLOPs，性能却超越 147M+ 参数的 MERIT 系列，体现了解码器中心设计的参数效率。</div>\n<h5>消融实验关键发现</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>消融项</th>\n<th>DSC</th>\n<th>HD95</th>\n<th>结论</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>完整模型</td>\n<td><strong>85.07</strong></td>\n<td><strong>14.72</strong></td>\n<td>—</td>\n</tr>\n<tr>\n<td>去除 CNN 分支</td>\n<td>84.07</td>\n<td>18.92</td>\n<td>CNN 分支对细节保留至关重要</td>\n</tr>\n<tr>\n<td>去除 VSSMB</td>\n<td>83.51</td>\n<td>15.96</td>\n<td>SSM 全局建模不可或缺</td>\n</tr>\n<tr>\n<td>CAG → AG</td>\n<td>82.98</td>\n<td>15.69</td>\n<td>双向注意力优于单向</td>\n</tr>\n<tr>\n<td>CAG → CBAM</td>\n<td>84.01</td>\n<td>16.19</td>\n<td>CAG 仍优于通道+空间注意力</td>\n</tr>\n<tr>\n<td>DRB → 标准卷积</td>\n<td>84.53</td>\n<td>16.18</td>\n<td>可变形卷积的自适应采样更优</td>\n</tr>\n<tr>\n<td>仅 Dice 损失</td>\n<td>83.84</td>\n<td>14.94</td>\n<td>MSDA 提升 +1.23 DSC</td>\n</tr>\n<tr>\n<td>Dice + 传统深度监督</td>\n<td>84.24</td>\n<td>15.89</td>\n<td>MSDA 在 DSC 和 HD95 上均更优</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "Deco-Mamba 中 MSDA 损失使用窗口化 KL 散度而非像素级交叉熵进行深度监督，主要原因是什么？",
        "options": [
          "KL 散度的计算速度比交叉熵更快",
          "窗口化 KL 散度能捕获局部区域的分布一致性，避免低分辨率层产生粗糙像素级预测",
          "KL 散度对类别不平衡问题更鲁棒",
          "窗口化操作可以减少 GPU 显存占用"
        ],
        "answer": 1,
        "explain": "传统深度监督强迫低分辨率层产生像素级预测，反而损害边界精度。MSDA 通过窗口化 KL 散度提供分布级别的软监督，既保证区域比例一致性又增强边界敏感性。"
      }
    },
    {
      "id": "mamba_sam",
      "num": 18,
      "name": "Mamba-SAM",
      "fullName": "Mamba-SAM: 混合Mamba与SAM架构 (A Hybrid Mamba-SAM Architecture for Efficient 3D Medical Image Segmentation)",
      "year": "2026.02",
      "org": "研究机构",
      "parent": "medsam",
      "paperUrl": "https://arxiv.org/abs/2602.00650",
      "projectUrl": "",
      "category": "foundation_model",
      "motivation": "Mamba高效编码结合SAM零样本能力达0.906 Dice",
      "summary": "Mamba-SAM 提出两种参数高效策略将 Mamba 状态空间模型与冻结 SAM 结合：双分支交叉注意力融合架构（0.906 Dice）和 3D Adapter 注入架构（TP_MFGC，0.880 Dice / 4.77 FPS），在 ACDC 心脏 MRI 分割任务上以极少可训练参数达到与 UNet++ 相当的性能。",
      "keyPoints": [
        "<strong>双分支架构 (MambaSAM-Base)</strong>：冻结 SAM ViT-B 编码器（~90M 参数不动）并行一个可训练 VMamba 编码器，通过 Cross-Branch Attention (CBA) 融合两路特征",
        "<strong>Adapter 架构 (TP_MFGC)</strong>：在冻结 SAM ViT 每个 block 后插入 TP-Mamba 适配器，从三正交平面（Axial/Coronal/Sagittal）建模 3D 上下文",
        "<strong>Multi-Frequency Gated Convolution (MFGC)</strong>：用 3D DCT 变换在频域增强局部特征表示，替代标准 3D CNN 路径",
        "<strong>参数效率</strong>：双分支仅训练 ~24M/113M 参数（21%），TP-Mamba (LoRA) 训练参数更少，VRAM 仅需 1.9GB",
        "<strong>线性复杂度优势</strong>：Mamba 的 \\<span class=\"kb-math kb-math-inline\">O(N)\\</span> 复杂度使 3D adapter 推理速度达 4.77 FPS，远超 2D 逐片方式的 2.78 FPS",
        "<strong>ACDC 数据集</strong>：150 例心脏 MRI，分割 RV/Myo/LV 三类结构，MambaSAM-Base 在 Myo (0.910) 和 LV (0.971) 上超越所有基线"
      ],
      "detail": "<h5>动机与背景</h5>\n<p>SAM 在自然图像分割上表现卓越，但直接应用于医学图像面临三大挑战：(1) <strong>领域鸿沟</strong>——医学图像（如 MRI）的灰度、纹理特征与自然图像差异巨大；(2) <strong>2D 限制</strong>——SAM 仅处理 2D 切片，无法建模体积上下文；(3) <strong>计算成本</strong>——全量微调 SAM 的 ~90M 参数代价高昂。传统 Transformer 的 \\<span class=\"kb-math kb-math-inline\">O(N^2)\\</span> 复杂度在处理 3D 高分辨率医学体积时更是瓶颈。Mamba SSM 以其选择性状态更新机制和 \\<span class=\"kb-math kb-math-inline\">O(N)\\</span> 线性复杂度，为高效建模长序列依赖提供了理想方案。</p>\n<h5>架构 1：双分支 MambaSAM</h5>\n<pre><code class=\"language-python\"># Dual-Branch MambaSAM 伪代码\ndef dual_branch_mamba_sam(X_slice):\n    # 分支1: 冻结SAM编码器 (通用特征)\n    F_sam = frozen_sam_vit_b(X_slice)  # [H/16, W/16, 768]\n\n    # 分支2: 可训练VMamba编码器 (领域特征)\n    F_mamba = trainable_vmamba(X_slice)  # [H/16, W/16, 384]\n\n    # Cross-Branch Attention 融合\n    Q = F_mamba @ W_q  # VMamba特征作Query\n    K = F_sam @ W_k    # SAM特征作Key\n    V = F_sam @ W_v    # SAM特征作Value\n    F_cba = softmax(Q @ K.T / sqrt(d_k)) @ V\n\n    # 残差连接 + 解码\n    F_fused = F_sam + F_cba\n    mask = cnn_decoder(F_fused)  # [H, W, N_classes]\n    return mask\n</code></pre>\n<p><strong>CBA 融合机制的设计直觉</strong>：VMamba 分支学习了医学领域特有的细粒度纹理（如心肌边界），将其作为 Query 去\"查询\"SAM 通用特征中的相关语义信息。这种设计让领域特定细节引导通用知识的检索，而非简单拼接。融合公式为：</p>\n<div class=\"kb-math kb-math-display\">F_{cba} = \\text{softmax}\\left(\\frac{(F_{mamba}W_q)(F_{sam}W_k)^T}{\\sqrt{d_k}}\\right)(F_{sam}W_v)</div>\n<div class=\"kb-math kb-math-display\">F_{fused} = F_{sam} + F_{cba}</div>\n<div class=\"key-point\">💡 关键：VMamba 作为 Query 端意味着\"领域专家提问，通用模型回答\"，这比反向设计更有效，因为医学特征知道该关注什么。</div>\n<p>解码器对比：论文测试了 CNN 解码器（转置卷积）和 IFA 解码器（基于 MLP 的连续坐标解码）。实验表明简单 CNN 解码器效果更优（0.906 vs 0.893 Dice），说明在此场景下简单方案更稳健。</p>\n<h5>架构 2：3D Adapter TP-Mamba-SAM</h5>\n<pre><code class=\"language-python\"># TP-Mamba Adapter 注入伪代码\ndef tp_mamba_adapter(F_in, depth_slices):\n    # 降维 + 重塑为伪3D体积\n    V = reshape_to_3d(linear_down(F_in))  # [D_adapter]\n\n    # 局部路径: 3D CNN (或MFGC替代)\n    F_local = mfgc_block(V)  # 空间+频域联合分析\n\n    # 全局路径: 三正交平面Mamba扫描\n    F_axial = mamba_block(flatten_axial(V))    # HW平面\n    F_coronal = mamba_block(flatten_coronal(V))  # DH平面  \n    F_sagittal = mamba_block(flatten_sagittal(V)) # DW平面\n    F_global = fuse(F_axial, F_coronal, F_sagittal)\n\n    # 融合 + 升维\n    F_adapter = linear_up(F_local + F_global)\n    return F_in + F_adapter  # 残差注入frozen SAM\n</code></pre>\n<p><strong>TP-Mamba 的三平面设计</strong>：将 3D 体积沿三个正交方向展开为序列，分别用 Mamba 块建模长程依赖。由于 Mamba 的线性复杂度，处理这些长序列的计算开销远低于 3D Transformer。每个 Mamba 块使用选择性状态更新：</p>\n<div class=\"kb-math kb-math-display\">h_t = \\bar{A} h_{t-1} + \\bar{B} x_t, \\quad y_t = C h_t</div>\n<p>其中 \\<span class=\"kb-math kb-math-inline\">\\bar{A}, \\bar{B}, C\\</span> 均为输入依赖（selective），使模型能动态决定保留或遗忘哪些信息。适配器以残差方式注入：\\<span class=\"kb-math kb-math-inline\">F_{out} = F_{in} + F_{adapter}\\</span>，不改变冻结 SAM 的原始计算图。</p>\n<p>可选地，LoRA 可应用于冻结 MSA 层的 Q/K/V 投影，进一步微调注意力机制本身。实验显示 LoRA 对 TP-Mamba 至关重要：Dice 从 0.679 提升至 0.796。</p>\n<h5>MFGC 模块：频域增强</h5>\n<p>MFGC 是本文的重要创新，用 3D 离散余弦变换 (DCT) 将特征转换到频域分析：</p>\n<div class=\"kb-math kb-math-display\">X_i^{s,k} = \\sum_{d,h,w} (X_i^s)_{:,d,h,w} \\cdot D_{d,h,w}^{z_k, u_k, v_k}</div>\n<p>其中 DCT 基函数为：</p>\n<div class=\"kb-math kb-math-display\">D_{d,h,w}^{z_k,u_k,v_k} = \\cos\\left(\\frac{\\pi}{D_s}(z_k+\\frac{1}{2})d\\right) \\cdot \\cos\\left(\\frac{\\pi}{H_s}(u_k+\\frac{1}{2})h\\right) \\cdot \\cos\\left(\\frac{\\pi}{W_s}(v_k+\\frac{1}{2})w\\right)</div>\n<p>频域系数经门控机制与空间特征融合：</p>\n<div class=\"kb-math kb-math-display\">X_{out}^s = \\text{Gate}(X_{spatial}^s, X_{freq}^s) = \\sigma(W_g \\cdot [X_{spatial}^s; X_{freq}^s]) \\odot X_{spatial}^s + (1 - \\sigma(\\cdot)) \\odot X_{freq}^s</div>\n<div class=\"key-point\">💡 关键：医学图像中的组织边界和纹理在频域有独特特征（如心肌的规则纹理对应特定频率成分）。MFGC 通过门控机制选择性融合空间域和频域信息，比纯空间卷积能捕获更丰富的结构特征。</div>\n<h5>训练细节</h5>\n<ul>\n<li><strong>损失函数</strong>：\\<span class=\"kb-math kb-math-inline\">\\mathcal{L}_{total} = \\mathcal{L}_{Dice} + \\mathcal{L}_{CE}\\</span></li>\n<li><strong>优化器</strong>：AdamW，学习率 \\<span class=\"kb-math kb-math-inline\">1\\text{-}2 \\times 10^{-4}\\</span>，余弦退火 + 线性预热</li>\n<li><strong>数据预处理</strong>：MONAI pipeline，重采样至 1.5mm 各向同性，强度归一化至 [0,1]（0.5-99.5 百分位裁剪），随机裁剪 96×96×16 (3D) 或 96×96 (2D)</li>\n<li><strong>数据划分</strong>：70% 训练 / 15% 验证 / 15% 测试（按患者划分）</li>\n<li><strong>硬件</strong>：Google Colab Pro+ (H100/A100/L4)，AMP + 梯度裁剪（max norm 1.0）</li>\n</ul>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>Full Fine-tune SAM</th>\n<th>UNet++</th>\n<th>Mamba-SAM (双分支)</th>\n<th>TP_MFGC (Adapter)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>可训练参数</td>\n<td>~90M+</td>\n<td>~36M</td>\n<td>~24M (21%)</td>\n<td>~24M (20%)</td>\n</tr>\n<tr>\n<td>3D 上下文</td>\n<td>❌</td>\n<td>❌</td>\n<td>❌ (2D逐片)</td>\n<td>✅ (三平面Mamba)</td>\n</tr>\n<tr>\n<td>推理速度</td>\n<td>慢</td>\n<td>中</td>\n<td>2.78 FPS</td>\n<td><strong>4.77 FPS</strong></td>\n</tr>\n<tr>\n<td>Mean Dice</td>\n<td>—</td>\n<td>0.907</td>\n<td><strong>0.906</strong></td>\n<td>0.880</td>\n</tr>\n<tr>\n<td>VRAM</td>\n<td>&gt;20GB</td>\n<td>~8GB</td>\n<td>11.57GB</td>\n<td>12.99GB</td>\n</tr>\n</tbody>\n</table></div>\n<h5>实验结果详细分析</h5>\n<p><strong>Table 1 - ACDC 测试集定量结果：</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>RV Dice</th>\n<th>Myo Dice</th>\n<th>LV Dice</th>\n<th>Mean Dice</th>\n<th>Mean HD95 (mm)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>UNet++</td>\n<td>0.898</td>\n<td>0.871</td>\n<td>0.952</td>\n<td>0.907</td>\n<td>2.88</td>\n</tr>\n<tr>\n<td>Attention UNet</td>\n<td>0.878</td>\n<td>0.858</td>\n<td>0.947</td>\n<td>0.894</td>\n<td>3.91</td>\n</tr>\n<tr>\n<td>AutoSAM (CNN)</td>\n<td>0.888</td>\n<td>0.860</td>\n<td>0.942</td>\n<td>0.897</td>\n<td>6.60</td>\n</tr>\n<tr>\n<td>MambaUNet</td>\n<td>0.835</td>\n<td>0.789</td>\n<td>0.918</td>\n<td>0.847</td>\n<td>4.58</td>\n</tr>\n<tr>\n<td>SwinUNet</td>\n<td>0.572</td>\n<td>0.607</td>\n<td>0.782</td>\n<td>0.654</td>\n<td>17.18</td>\n</tr>\n<tr>\n<td><strong>MambaSAM-Base</strong></td>\n<td>0.836</td>\n<td><strong>0.910</strong></td>\n<td><strong>0.971</strong></td>\n<td><strong>0.906</strong></td>\n<td>7.53</td>\n</tr>\n<tr>\n<td>MambaSAM (IFA Dec)</td>\n<td>0.871</td>\n<td>0.874</td>\n<td>0.934</td>\n<td>0.893</td>\n<td>9.35</td>\n</tr>\n<tr>\n<td><strong>TP_MFGC</strong></td>\n<td>0.868</td>\n<td>0.680</td>\n<td>0.897</td>\n<td>0.880</td>\n<td>32.39</td>\n</tr>\n<tr>\n<td>TP-Mamba (LoRA)</td>\n<td>0.758</td>\n<td>0.769</td>\n<td>0.860</td>\n<td>0.796</td>\n<td>8.54</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>Table 2 - 效率对比：</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>Mean Dice</th>\n<th>FPS/Volume</th>\n<th>Max VRAM (GB)</th>\n<th>Total Params (M)</th>\n<th>Trainable (M)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>MambaSAM-Base</td>\n<td>0.906</td>\n<td>2.78</td>\n<td>11.57</td>\n<td>113.55</td>\n<td>23.88 (~21%)</td>\n</tr>\n<tr>\n<td>TP_MFGC</td>\n<td>0.880</td>\n<td>4.77</td>\n<td>12.99</td>\n<td>118.55</td>\n<td>23.72 (~20%)</td>\n</tr>\n<tr>\n<td>TP-Mamba (LoRA)</td>\n<td>0.796</td>\n<td>—</td>\n<td>1.90</td>\n<td>—</td>\n<td>极少</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ 注意：TP_MFGC 虽然 Dice 较高（0.880），但 HD95 异常差（32.39mm），表明其在边界定位精度上存在严重问题，可能与 3D 上下文聚合时的空间对齐有关，论文将此列为未来需调查的问题。</div>\n<p><strong>关键发现</strong>：\n1. <strong>MambaSAM-Base 在 Myo 和 LV 上超越所有基线</strong>（包括 UNet++），说明 SAM 通用形状先验 + Mamba 细粒度纹理学习的互补性极强\n2. <strong>LoRA 对 Adapter 方案至关重要</strong>：TP-Mamba 从 0.679 提升到 0.796 Dice，证明仅靠 adapter 不足以充分利用冻结骨干\n3. <strong>CNN 解码器优于 IFA 解码器</strong>（0.906 vs 0.893），简单方案在此场景更稳健\n4. <strong>Mamba 线性复杂度的速度优势</strong>：TP_MFGC 达 4.77 FPS（单次 3D 前向传播），双分支 2D 逐片仅 2.78 FPS\n5. <strong>RV 分割仍是难点</strong>：所有模型在 RV 上表现最差，MambaSAM-Base RV Dice 仅 0.836，低于 UNet++ 的 0.898</p>\n<h5>局限性与未来方向</h5>\n<ul>\n<li>仅在 ACDC 单一数据集验证，跨数据集/跨模态泛化能力未知</li>\n<li>TP_MFGC 的 HD95 异常（32.39mm）需深入调查边界定位失败原因</li>\n<li>计算资源限制未能完成知识蒸馏实验（将高精度双分支蒸馏为轻量学生模型）</li>\n<li>双分支架构仍为 2D 逐片处理，未充分利用体积连续性</li>\n<li>未来可探索多模态文本引导分割、跨数据集评估</li>\n</ul>",
      "quiz": {
        "q": "在 Mamba-SAM 双分支架构的 Cross-Branch Attention 中，VMamba 特征作为 Query 而 SAM 特征作为 Key/Value 的设计意图是什么？",
        "options": [
          "减少计算量，因为 VMamba 特征维度更低",
          "让领域特定特征引导从通用模型中检索相关语义信息",
          "防止冻结 SAM 编码器的梯度回传",
          "使 VMamba 分支能够直接复制 SAM 的输出特征"
        ],
        "answer": 1,
        "explain": "VMamba 学习了医学领域特有细节，作为 Query 端能精准定位需要从 SAM 通用特征中提取的相关信息，实现'专家提问、通用模型回答'的知识融合范式。"
      }
    },
    {
      "id": "medsam2",
      "num": 19,
      "name": "MedSAM2",
      "fullName": "MedSAM2: 3D医学影像与视频分割 (MedSAM2: Segment Anything in 3D Medical Images and Videos)",
      "year": "2026.04",
      "org": "哈佛/麻省总医院",
      "parent": "medsam_v1",
      "paperUrl": "https://arxiv.org/abs/2504.03600",
      "projectUrl": "",
      "category": "foundation_model",
      "motivation": "88.84%Dice性能减少85%标注成本",
      "summary": "MedSAM2 将 SAM2 的视频分割范式迁移到医学领域，将 3D 医学图像视为视频序列，通过在中间切片给定 bounding box 提示后双向传播分割，结合 45.5 万+ 3D 图像-掩码对和 7.6 万视频帧的大规模微调，实现了跨模态（CT/MRI/PET/超声/内窥镜）的高精度交互式分割，并通过人在回路标注管线将标注时间减少 85% 以上。",
      "keyPoints": [
        "<strong>统一框架</strong>：将 3D 医学图像（CT/MRI/PET）视为视频序列，复用 SAM2 的记忆注意力机制实现切片间传播，统一处理 3D 体积数据和真实医学视频（超声心动图、内窥镜）",
        "<strong>大规模训练数据</strong>：收集 455K+ 3D 图像-掩码对 + 76K 视频帧，涵盖 CT（363K）、MRI（77K）、PET（15K）、超声（19K）、内窥镜（56K）五种模态",
        "<strong>高效交互范式</strong>：仅需在中间切片绘制一个 bounding box，模型自动双向传播到整个 3D 体积或视频序列",
        "<strong>人在回路标注管线</strong>：3 轮迭代（标注→微调→再标注），CT 病灶标注从 525.9 秒降至 74.3 秒（减少 85%+），超声心动图从 102.3 秒/帧降至 8.4 秒/帧（减少 92%）",
        "<strong>基于 SAM2.1-Tiny 微调</strong>：~39M 参数（Hiera encoder 28M + 其余 10.9M），双学习率策略（encoder 3e-5，其余 5e-5），Focal + Dice 联合损失",
        "<strong>多平台部署</strong>：3D Slicer 插件、终端、JupyterLab、Colab、Gradio 五种部署方式",
        "<strong>SOTA 性能</strong>：CT 器官 88.84% DSC、CT 病灶 86.68%、MRI 器官 87.06%、MRI 病灶 88.37%、PET 87.22%、超声心动图左心室 96.13%、息肉视频 92.22%"
      ],
      "detail": "<h5>4.1 核心架构示意图</h5>\n<p><img alt=\"MedSAM2 整体框架\" src=\"https://arxiv.org/html/2504.03600v1/extracted/6336905/main-imgs/fig1.png\" />\n<em>图 1：MedSAM2 整体框架。(a) 数据收集与标注流程；(b) 模型架构——将 3D 医学图像视为视频，在关键切片给定 bbox 提示后通过记忆机制双向传播；(c) 人在回路标注管线；(d) 多平台部署方案。</em></p>\n<p><img alt=\"MedSAM2 分割结果\" src=\"https://arxiv.org/html/2504.03600v1/extracted/6336905/main-imgs/fig2.png\" />\n<em>图 2：MedSAM2 在 CT/MRI/PET/超声/内窥镜等多模态任务上的分割结果可视化。</em></p>\n<p><img alt=\"人在回路标注效率\" src=\"https://arxiv.org/html/2504.03600v1/extracted/6336905/main-imgs/fig3.png\" />\n<em>图 3：人在回路标注管线的效率提升——经过 3 轮迭代，标注时间大幅减少。</em></p>\n<h5>4.2 算法伪代码</h5>\n<pre><code class=\"language-python\"># MedSAM2 推理流程伪代码\ndef medsam2_inference(volume_3d, bbox, mid_slice_idx):\n    &quot;&quot;&quot;\n    volume_3d: 3D医学图像 [D, H, W] 或视频 [T, H, W, 3]\n    bbox: 用户在中间切片上绘制的bounding box [x1, y1, x2, y2]\n    mid_slice_idx: 提示所在的切片/帧索引\n    &quot;&quot;&quot;\n    # Step 1: 预处理 — 将3D体积视为视频序列\n    frames = preprocess(volume_3d)  # → [N, 3, 512, 512]\n\n    # Step 2: 图像编码 — Hiera encoder + FPN neck\n    multi_scale_feats = {}\n    for i, frame in enumerate(frames):\n        multi_scale_feats[i] = hiera_encoder(frame)  # 4-stage hierarchical features\n\n    # Step 3: 提示编码 — 在中间切片编码bbox\n    prompt_embed = prompt_encoder(bbox)  # bbox → dense + sparse embeddings\n\n    # Step 4: 中间切片分割 — mask decoder\n    memory_bank = MemoryBank(max_frames=8)\n    mid_feat = memory_attention(multi_scale_feats[mid_slice_idx], memory_bank)\n    mask_mid = mask_decoder(mid_feat, prompt_embed)  # [1, 128, 128] → upsample to [512, 512]\n    memory_bank.add(mid_slice_idx, mid_feat, mask_mid)\n\n    # Step 5: 双向传播 — 从中间切片向两端传播\n    masks = {mid_slice_idx: mask_mid}\n\n    # 正向传播: mid → end\n    for i in range(mid_slice_idx + 1, len(frames)):\n        feat_i = memory_attention(multi_scale_feats[i], memory_bank)  # cross-attend to memory\n        mask_i = mask_decoder(feat_i, prompt_embed=None)  # 无需额外提示\n        memory_bank.add(i, feat_i, mask_i)\n        masks[i] = mask_i\n\n    # 反向传播: mid → start\n    memory_bank.reset()\n    memory_bank.add(mid_slice_idx, mid_feat, mask_mid)\n    for i in range(mid_slice_idx - 1, -1, -1):\n        feat_i = memory_attention(multi_scale_feats[i], memory_bank)\n        mask_i = mask_decoder(feat_i, prompt_embed=None)\n        memory_bank.add(i, feat_i, mask_i)\n        masks[i] = mask_i\n\n    return stack_masks(masks)  # [D, H, W] binary segmentation\n</code></pre>\n<pre><code class=\"language-python\"># MedSAM2 训练流程伪代码\ndef medsam2_train():\n    model = load_pretrained(&quot;SAM2.1-Tiny&quot;)  # 39M params\n\n    # 双学习率策略\n    optimizer = AdamW([\n        {&quot;params&quot;: model.image_encoder.parameters(), &quot;lr&quot;: 3e-5},   # 28M params\n        {&quot;params&quot;: model.other_modules.parameters(), &quot;lr&quot;: 5e-5},   # 10.9M params\n    ], betas=(0.9, 0.999), weight_decay=0.01)\n\n    for epoch in range(70):\n        for batch in dataloader:  # batch_size=8/GPU, 8 consecutive slices per sample\n            images, gt_masks, bboxes = batch  # [B, 8, 3, 512, 512]\n\n            # 模拟bbox提示: 从GT标注生成，加0-10像素随机扰动\n            noisy_bboxes = add_perturbation(bboxes, max_shift=10)\n\n            # 前向传播: 中间帧提示 + 双向传播\n            pred_masks = model(images, noisy_bboxes, mid_idx=4)\n\n            # 联合损失: Focal Loss + Dice Loss (权重 20:1)\n            loss = 20 * focal_loss(pred_masks, gt_masks) + dice_loss(pred_masks, gt_masks)\n\n            loss.backward()\n            optimizer.step()\n</code></pre>\n<h5>4.3 方法详解</h5>\n<p><strong>动机与背景</strong></p>\n<p>医学图像分割是临床诊断和治疗规划的基础任务，但传统方法面临两大挑战：(1) 3D 医学图像（CT/MRI/PET）需要逐切片标注，耗时且昂贵；(2) 不同模态和解剖结构需要训练不同的专用模型。SAM（Segment Anything Model）虽然在自然图像上表现出色，但直接应用于医学图像效果不佳，且仅支持 2D 分割。SAM2 引入了视频分割能力，通过记忆注意力机制在帧间传播分割结果，这一特性恰好可以用于 3D 医学图像——将连续切片视为视频帧。</p>\n<div class=\"key-point\">💡 <strong>核心洞察</strong>：3D 医学图像的连续切片之间具有天然的空间连续性，与视频帧之间的时间连续性高度类似。SAM2 的记忆传播机制可以直接复用于切片间传播。</div>\n<p><strong>模型架构</strong></p>\n<p>MedSAM2 基于 SAM2.1-Tiny 架构，包含四个核心组件：</p>\n<p><strong>① 图像编码器（Image Encoder）— 28M 参数</strong></p>\n<p>采用 Hiera（Hierarchical Vision Transformer）作为骨干网络，具有四阶段架构：\n- 阶段配置：layers = {1, 2, 7, 2}，共 12 层\n- 输入分辨率从 SAM2 原始的 <span class=\"kb-math kb-math-inline\">3 \\times 1024 \\times 1024</span> 降至 <span class=\"kb-math kb-math-inline\">3 \\times 512 \\times 512</span>，更适合医学图像的典型尺寸，同时降低计算开销\n- 在第 5、7、9 层引入<strong>全局注意力块</strong>（global attention blocks），捕获长距离依赖关系\n- 顶部接 FPN（Feature Pyramid Network）颈部网络，提取多尺度特征</p>\n<p><strong>② 记忆注意力模块（Memory Attention）</strong></p>\n<p>这是实现切片间传播的核心机制：\n- 包含 <strong>4 层 Transformer</strong>，每层同时具有自注意力和交叉注意力\n- 使用 <strong>RoPE（Rotary Position Embedding）</strong> 进行 2D 空间编码，特征尺寸为 <span class=\"kb-math kb-math-inline\">32 \\times 32</span>\n- 维护一个<strong>记忆库（Memory Bank）</strong>，存储最近 8 帧的特征和掩码信息\n- 当前帧的特征通过交叉注意力机制与记忆库中的历史信息交互，从而利用空间连续性</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：记忆库固定为 8 帧，这意味着对于非常长的序列（如数百帧的超声视频），早期帧的信息会被逐渐遗忘，可能导致跟踪漂移。</div>\n<p><strong>③ 提示编码器（Prompt Encoder）</strong></p>\n<p>将用户输入的 bounding box 坐标转换为嵌入向量，引导分割过程。仅在关键切片（中间切片）使用提示，后续切片通过记忆传播自动分割。</p>\n<p><strong>④ 掩码解码器（Mask Decoder）</strong></p>\n<ul>\n<li>通过<strong>跳跃连接</strong>整合图像编码器多个尺度的特征</li>\n<li>输出分辨率为 <span class=\"kb-math kb-math-inline\">128 \\times 128</span>，通过双线性插值上采样至 <span class=\"kb-math kb-math-inline\">512 \\times 512</span></li>\n</ul>\n<p><strong>训练策略</strong></p>\n<p>训练采用了多项精心设计的策略：</p>\n<p><em>数据平衡采样</em>：由于不同模态数据量差异巨大（CT 363K vs PET 15K），对少数模态进行过采样——MRI ×3、PET ×40、视频 ×40。</p>\n<p><em>双学习率微调</em>：图像编码器使用较低学习率 <span class=\"kb-math kb-math-inline\">3.0 \\times 10^{-5}</span> 以保留预训练特征，其余组件使用较高学习率 <span class=\"kb-math kb-math-inline\">5.0 \\times 10^{-5}</span> 以快速适应医学领域特性。</p>\n<p><em>数据增强</em>：随机水平翻转、仿射变换、颜色抖动、随机灰度转换。视频数据额外进行 2× 和 4× 的帧采样率增强。</p>\n<p><em>Bbox 提示模拟</em>：从专家标注生成 bounding box，并加入 0-10 像素的随机扰动，模拟真实使用场景中的不精确提示。</p>\n<p><em>训练规模</em>：batch size 8/GPU，每样本 8 个连续切片/帧，3 个计算节点（各 4 张 H100 GPU），共训练 70 个 epoch，耗时 4 天。</p>\n<p><strong>人在回路标注管线</strong></p>\n<p>这是 MedSAM2 的重要应用创新，采用 3 轮迭代策略：</p>\n<ol>\n<li><strong>第 1 轮</strong>：放射科医生使用初始 MedSAM2 模型辅助标注，生成初始标注数据集</li>\n<li><strong>第 2 轮</strong>：用第 1 轮数据微调模型（学习率减半，6 个 epoch），再用改进模型辅助标注</li>\n<li><strong>第 3 轮</strong>：用累积数据继续微调（15 个 epoch），最终模型辅助完成剩余标注</li>\n</ol>\n<p>效率提升（以 CT 病灶标注为例）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>轮次</th>\n<th>标注时间/例</th>\n<th>相比纯手动</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>纯手动</td>\n<td>525.9 秒</td>\n<td>—</td>\n</tr>\n<tr>\n<td>第 1 轮</td>\n<td>215.3 秒</td>\n<td>-59%</td>\n</tr>\n<tr>\n<td>第 2 轮</td>\n<td>131.7 秒</td>\n<td>-75%</td>\n</tr>\n<tr>\n<td>第 3 轮</td>\n<td>74.3 秒</td>\n<td><strong>-86%</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>与传统方法的区别</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>nnU-Net</th>\n<th>SAM/MedSAM</th>\n<th>SAM2 原版</th>\n<th><strong>MedSAM2</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>交互方式</td>\n<td>全自动</td>\n<td>2D bbox/点</td>\n<td>视频 bbox</td>\n<td>3D bbox 传播</td>\n</tr>\n<tr>\n<td>3D 支持</td>\n<td>✅ 原生</td>\n<td>❌ 逐切片</td>\n<td>⚠️ 未针对医学优化</td>\n<td>✅ 切片传播</td>\n</tr>\n<tr>\n<td>跨模态</td>\n<td>❌ 需重训</td>\n<td>✅</td>\n<td>✅</td>\n<td>✅</td>\n</tr>\n<tr>\n<td>视频支持</td>\n<td>❌</td>\n<td>❌</td>\n<td>✅</td>\n<td>✅</td>\n</tr>\n<tr>\n<td>医学优化</td>\n<td>✅</td>\n<td>部分</td>\n<td>❌</td>\n<td>✅</td>\n</tr>\n</tbody>\n</table></div>\n<p>MedSAM2 相比 SAM2.1 原版在医学任务上的优势主要来自：(1) 大规模医学数据微调；(2) 输入分辨率从 1024 降至 512 更适合医学图像；(3) 人在回路标注管线持续改进模型。</p>\n<p><strong>局限性</strong></p>\n<ul>\n<li>仅支持 bounding box 提示，对管状结构（血管、气道）效果有限</li>\n<li>固定 8 帧记忆库，长序列可能出现跟踪漂移</li>\n<li>推理需要 GPU 支持，限制了边缘部署场景</li>\n</ul>\n<h5>4.4 核心公式</h5>\n<p><strong>联合损失函数</strong></p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = 20 \\cdot \\mathcal{L}_{\\text{focal}} + \\mathcal{L}_{\\text{dice}}</div>\n<p>其中 Focal Loss 用于处理前景/背景的类别不平衡问题：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{focal}} = -\\alpha_t (1 - p_t)^\\gamma \\log(p_t)</div>\n<p>Dice Loss 直接优化区域重叠度：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{dice}} = 1 - \\frac{2 \\sum_i p_i g_i}{\\sum_i p_i + \\sum_i g_i}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">p_i</span> 为预测概率，<span class=\"kb-math kb-math-inline\">g_i</span> 为真实标签。Focal Loss 权重设为 20，远高于 Dice Loss，强调对困难样本（边界区域）的关注。</p>\n<p><strong>评估指标</strong></p>\n<p>Dice Similarity Coefficient (DSC)：</p>\n<div class=\"kb-math kb-math-display\">\\text{DSC} = \\frac{2|P \\cap G|}{|P| + |G|}</div>\n<p>Normalized Surface Distance (NSD)，边界容差 <span class=\"kb-math kb-math-inline\">\\tau = 2\\text{mm}</span>：</p>\n<div class=\"kb-math kb-math-display\">\\text{NSD} = \\frac{|\\{p \\in \\partial P : d(p, \\partial G) \\leq \\tau\\}| + |\\{g \\in \\partial G : d(g, \\partial P) \\leq \\tau\\}|}{|\\partial P| + |\\partial G|}</div>\n<div class=\"key-point\">💡 <strong>关键设计选择</strong>：20:1 的 Focal-Dice 损失权重比是经验性的，Focal Loss 的高权重确保模型在边界和小目标区域获得足够的梯度信号，而 Dice Loss 保证整体区域重叠度。</div>",
      "quiz": {
        "q": "MedSAM2 将 3D 医学图像视为视频序列进行分割，其核心传播机制依赖于以下哪个组件？",
        "options": [
          "Feature Pyramid Network (FPN) 的多尺度特征融合",
          "Memory Attention 模块中的交叉注意力与记忆库机制",
          "Prompt Encoder 对 bounding box 的编码传递",
          "Mask Decoder 的跳跃连接结构"
        ],
        "answer": 1,
        "explain": "MedSAM2 的切片间传播依赖 Memory Attention 模块——它通过 4 层 Transformer 的交叉注意力机制，让当前帧特征与记忆库中存储的历史帧特征和掩码交互，从而实现从提示切片向其他切片的双向传播。"
      }
    },
    {
      "id": "uvas",
      "num": 20,
      "name": "UVAS",
      "fullName": "UVAS: 无监督视觉异常分割 (Unsupervised Visual Anomaly Segmentation)",
      "year": "2026.04",
      "org": "ICLR 2026",
      "parent": "—",
      "paperUrl": "https://openreview.net/forum?id=uvas2026",
      "projectUrl": "",
      "category": "segmentation",
      "motivation": "无监督异常发现解决长尾病变标注稀缺问题",
      "summary": "UVAS 将病理发现建模为相对健康组织的低概率异常区域，Screener 用密集自监督特征和密度估计在无标注 CT 上学习“正常性”。它不依赖病灶类别标签，目标是发现长尾、稀有或未标注病变，缓解医学异常分割中监督标签覆盖不足的问题。",
      "keyPoints": [
        "<strong>给定链接为占位符</strong>：<code>uvas2026</code> 不是有效 OpenReview ID；可检索 ICLR 2026 主源是 “Modeling the Density of Pixel-level Self-supervised Embeddings for Unsupervised Pathology Segmentation in Medical CT”。",
        "<strong>模型名 Screener</strong>：OpenReview TL;DR 描述其为 fully self-supervised pathology segmentation model for medical CT images。",
        "<strong>UVAS 问题设定</strong>：假设病理区域相对健康解剖结构稀有，通过正常特征密度低来定位异常。",
        "<strong>密集自监督特征</strong>：用 DenseVICReg 等 dense SSL 学习像素/体素级表征，避免依赖 ImageNet 或有监督医学预训练。",
        "<strong>密度建模</strong>：在 dense embedding 空间中估计正常分布，对低似然区域生成 anomaly score map。",
        "<strong>遮罩不变条件特征</strong>：使用 learned, masking-invariant dense features 作为 conditioning variables，替代手工位置编码。",
        "<strong>大规模无标注训练</strong>：OpenReview 摘要报告训练使用超过 30,000 个无标注 3D CT volume，并在 4 个含 1,820 扫描的测试集上评估。"
      ],
      "detail": "<h5>4.1 核心示意图</h5>\n<p><img alt=\"Screener / UVAS 框架图\" src=\"https://figures.semanticscholar.org/cc920ae3dcd2e300cc4691dc5da77aba10107155/2-Figure1-1.png\" />\n<em>图：Screener 的密集自监督特征与条件密度建模流程。该图来自可公开访问的 Semantic Scholar figure CDN，对应 Screener/UVAS 论文图示。</em></p>\n<h5>4.2 算法伪代码</h5>\n<pre><code class=\"language-python\"># UVAS / Screener 推理伪代码\ndef screener_infer(ct_volume):\n    # 1. 提取密集自监督特征\n    dense_feat = dense_ssl_encoder(ct_volume)       # [D, H, W, C]\n\n    # 2. 生成遮罩不变条件变量，表示局部解剖和上下文\n    cond_feat = conditioning_encoder(mask_aug(ct_volume))\n\n    # 3. 用正常数据训练得到的密度模型估计每个位置的 log likelihood\n    logp = density_model.log_prob(dense_feat, cond=cond_feat)\n\n    # 4. 低似然位置即异常候选\n    anomaly_score = -logp\n    anomaly_map = postprocess(anomaly_score)\n    return threshold_or_rank(anomaly_map)\n</code></pre>\n<h5>4.3 方法解读</h5>\n<p>监督医学分割的弱点在异常检测上尤其明显：公共数据集通常只标注少数常见病灶，临床上却存在大量长尾异常、偶发病变和组合病理。UVAS 的出发点是“不知道异常类别也要能发现异常”，因此它不学习某个具体病灶的分类边界，而是学习正常 CT 的密集特征分布。</p>\n<p>基本评分可以写成负对数似然：</p>\n<div class=\"kb-math kb-math-display\">s(\\mathbf{x}_{p})=-\\log p_{\\theta}(\\mathbf{z}_{p}\\mid \\mathbf{c}_{p})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{x}_{p}</span> 是位置 <span class=\"kb-math kb-math-inline\">p</span> 的局部影像，<span class=\"kb-math kb-math-inline\">\\mathbf{z}_{p}</span> 是 dense SSL encoder 输出的像素/体素级特征，<span class=\"kb-math kb-math-inline\">\\mathbf{c}_{p}</span> 是条件变量。若某个位置的表征在正常数据分布下概率很低，则 anomaly score <span class=\"kb-math kb-math-inline\">s</span> 高，被视为病理候选区域。</p>\n<p>早期 UVAS 方法常用有监督预训练特征或手工位置编码。Screener 的第一项改进是 dense self-supervised learning：让模型在无标注 CT 上学习局部结构和上下文一致性，避免自然图像特征和医学体数据之间的域差异。第二项改进是 learned masking-invariant conditioning：通过遮罩增强迫使条件变量不依赖病灶本身，而更多表达正常解剖上下文，从而避免密度模型把异常也解释成“正常条件”。</p>\n<p>训练流程可分为两阶段。第一阶段训练 dense descriptor，使相同解剖位置或增强视图的特征稳定，不同位置有区分度；第二阶段在这些 dense feature 上训练条件密度模型，例如 flow/Glow 类可逆模型。推理时不需要病灶标签，只输出每个位置的异常分数，再通过阈值、连通域或 top-k 体素生成分割结果。</p>\n<div class=\"warn-box\">⚠️ 注意：UVAS 不是万能病灶分割器。它对“训练集中罕见、统计上异常”的区域敏感，但对正常变异、扫描伪影、金属伪影或训练集中已频繁出现的慢性改变可能产生误报或漏报。</div>\n<h5>4.4 与监督分割的区别</h5>\n<p>传统 nnU-Net/UNETR 学的是 <span class=\"kb-math kb-math-inline\">p(y\\mid x)</span>：需要每类病灶的 mask 标签，泛化到未见病种时能力有限。UVAS 学的是 <span class=\"kb-math kb-math-inline\">p(z\\mid c)</span>：只要求大量无标注正常或混合 CT，检测低概率区域。它牺牲了病种语义分类能力，换来对未知异常和低标注场景的适应性，因此更适合作为筛查、预标注或低样本微调的前置模型。</p>",
      "quiz": {
        "q": "UVAS/Screener 为什么适合长尾病变发现？",
        "options": [
          "它为每一种病灶都训练一个有监督分类头",
          "它学习正常 dense feature 的条件密度，把低似然区域视为异常候选",
          "它只检测 COCO 数据集中的 80 个类别",
          "它通过 NMS 合并检测框而不是输出分割图"
        ],
        "answer": 1,
        "explain": "UVAS 不依赖具体病灶类别标签，而是用正常特征分布的低似然定位异常，因此更适合未标注或长尾病理发现。"
      }
    },
    {
      "id": "medversa",
      "num": 21,
      "name": "MedVersa",
      "fullName": "MedVersa: 通用医学影像基础模型 (MedVersa: a generalist foundation model for diverse medical imaging tasks)",
      "year": "2026",
      "org": "MGH/哈佛大学",
      "parent": "medsam2",
      "paperUrl": "https://ai.nejm.org/doi/abs/10.1056/AIoa2500595",
      "projectUrl": "",
      "category": "foundation_model",
      "motivation": "多任务通用医学影像基础模型支持报告生成",
      "summary": "MedVersa 提出以 LLM 为核心编排器的通用医学影像基础模型，通过动态任务协议（DTP）让 LLM 自主决定是否调用检测/分割等视觉模块，在 9 类医学影像任务上以单一模型实现 SOTA，并在放射科报告生成中 71% 的 AI 报告达到或超越人类水平。",
      "keyPoints": [
        "<strong>三组件架构</strong>：多模态输入协调器（Multimodal Input Coordinator）+ LLM 编排器（LLM Orchestrator）+ 视觉任务模块（Vision Modules: DET/2DSEG/3DSEG）",
        "<strong>动态任务协议（DTP）</strong>：LLM 通过生成 <code>&lt;DET&gt;</code>、<code>&lt;2DSEG&gt;</code>、<code>&lt;3DSEG&gt;</code> 等特殊标记自主决定是否调用视觉模块，无需预定义任务路由",
        "<strong>域感知小批量梯度下降</strong>：按任务类型 × 影像模态分组构建 minibatch，解决多模态多任务联合训练的优化冲突",
        "<strong>参照图像指令微调（Referring Image Instruction Tuning）</strong>：使用 <code>&lt;img0&gt;v0&lt;/img0&gt;</code> 标记支持多图输入与纵向对比",
        "<strong>大规模训练数据</strong>：91 个公开数据集，约 2900 万训练实例，覆盖 2D/3D 多种影像模态",
        "<strong>9 类任务统一</strong>：报告生成、分类、检测、2D 分割、3D 分割、VQA、区域描述、纵向对比、开放式问答",
        "<strong>报告生成 SOTA</strong>：BLEU-4 达 17.8、RadCliQ 2.71（findings），大幅超越 MAIRA（BLEU-4 12.5）和 Med-PaLM M",
        "<strong>通用学习增益</strong>：通用训练比专项训练平均提升 6.4%，证明跨任务知识迁移的有效性",
        "<strong>临床验证</strong>：放射科医师盲评中 71% 的 AI 报告与人类报告临床等效或更优"
      ],
      "detail": "<p><img alt=\"MedVersa 架构总览\" src=\"https://arxiv.org/html/2405.07988v2/x1.png\" />\n<em>图：MedVersa 整体架构。左侧为多模态输入协调器将图像/文本统一编码；中间 LLM 编排器生成文本并通过特殊标记触发视觉模块；右侧为检测、2D 分割、3D 分割三个专用视觉模块。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># MedVersa 推理流程伪代码\ndef medversa_inference(images, text_instruction):\n    # 1. 多模态输入协调器\n    if images.ndim == 3:  # 2D 图像\n        vis_features = swin_transformer_2d(images)        # [B, C, H, W]\n    else:                  # 3D 体积\n        vis_features = unet3d_encoder(images)              # [B, C, D, H, W]\n\n    vis_tokens = adaptive_avg_pool(vis_features, output_size=9)  # 固定 9 个 token\n    vis_tokens = linear_proj(layer_norm(vis_tokens))             # → [B, 9, 4096]\n\n    text_tokens = llama_tokenizer(text_instruction)\n    # 多图场景: &quot;&lt;img0&gt;v0&lt;/img0&gt; &lt;img1&gt;v1&lt;/img1&gt; 请对比两次检查&quot;\n    input_seq = interleave(vis_tokens, text_tokens)  # 图文交错\n\n    # 2. LLM 编排器 (LLaMA-2-Chat + LoRA)\n    output_tokens = llm_orchestrator(input_seq)  # 自回归生成\n\n    # 3. 动态任务协议 — LLM 自主决定是否调用视觉模块\n    results = parse_text(output_tokens)\n\n    if &quot;&lt;DET&gt;&quot; in output_tokens:\n        det_embeddings = extract_embeddings(output_tokens, &quot;&lt;DET&gt;&quot;)\n        # 检测头: LayerNorm → Linear(4096→256) → ReLU → LayerNorm → Linear(256→4)\n        bboxes = detection_head(det_embeddings)  # [x1, y1, x2, y2]\n        results[&quot;detection&quot;] = bboxes\n\n    if &quot;&lt;2DSEG&gt;&quot; in output_tokens:\n        seg_embedding = extract_embeddings(output_tokens, &quot;&lt;2DSEG&gt;&quot;)\n        # 2D 分割: ResNet18 编码器 + UNet 解码器, 条件注入 seg_embedding\n        mask_2d = segmentation_2d(images, seg_embedding)\n        results[&quot;segmentation_2d&quot;] = mask_2d\n\n    if &quot;&lt;3DSEG&gt;&quot; in output_tokens:\n        seg_embedding = extract_embeddings(output_tokens, &quot;&lt;3DSEG&gt;&quot;)\n        # 3D 分割: 3D UNet, 条件注入 seg_embedding\n        mask_3d = segmentation_3d(images, seg_embedding)\n        results[&quot;segmentation_3d&quot;] = mask_3d\n\n    return results\n</code></pre>\n<pre><code class=\"language-python\"># 域感知小批量梯度下降 (Domain-Aware Minibatch GD)\ntask_groups = [&quot;captioning&quot;, &quot;classification&quot;, &quot;detection&quot;, \n               &quot;segmentation&quot;, &quot;vqa&quot;, &quot;region_caption&quot;, &quot;longitudinal&quot;]\nmodality_types = [&quot;CXR&quot;, &quot;CT&quot;, &quot;MRI&quot;, &quot;dermoscopy&quot;, &quot;pathology&quot;, ...]\n\nfor iteration in training_loop:\n    modality = random.choice(modality_types)          # 随机选影像模态\n    task = random.choice(tasks_for(modality))          # 选该模态下的任务\n    batch = sample_batch(task, modality)               # 同任务同模态 minibatch\n\n    if task in [&quot;captioning&quot;, &quot;vqa&quot;, &quot;classification&quot;]:\n        loss = cross_entropy(llm_output, target)\n    elif task == &quot;detection&quot;:\n        loss = cross_entropy(llm_output, target) + regression_loss(bboxes, gt_bboxes)\n    elif task == &quot;segmentation&quot;:\n        loss = focal_loss(pred_mask, gt_mask) + dice_loss(pred_mask, gt_mask)\n\n    loss.backward()\n    optimizer.step()  # AdamW + cosine schedule\n</code></pre>\n<h5>动机与背景</h5>\n<p>现有医学影像基础模型存在两个核心局限：（1）<strong>任务覆盖不全</strong>——大多数模型仅支持视觉-语言任务（如报告生成、VQA），无法执行检测和分割等视觉中心任务；（2）<strong>模态单一</strong>——通常只处理 2D 图像或特定影像类型。临床实践中，放射科医师需要在同一工作流中完成阅片、定位病灶、分割器官、撰写报告等多种任务，且需处理 X 光、CT、MRI、皮肤镜等多种模态。MedVersa 的目标是构建一个<strong>单一模型覆盖所有这些任务</strong>的通用基础模型。</p>\n<h5>核心机制：LLM 作为编排器</h5>\n<p>MedVersa 的关键创新在于将 LLM 从\"文本生成器\"提升为\"任务编排器\"。传统多任务模型需要预定义任务路由（如根据输入类型选择不同的 head），而 MedVersa 让 LLM <strong>在生成过程中自主决定</strong>是否需要调用视觉模块：</p>\n<ul>\n<li>当 LLM 判断需要定位病灶时，它会在输出中生成 <code>&lt;DET&gt;</code> 标记</li>\n<li>当需要分割时，生成 <code>&lt;2DSEG&gt;</code> 或 <code>&lt;3DSEG&gt;</code> 标记</li>\n<li>当只需文本回答时，直接输出自然语言</li>\n</ul>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：这种设计使得 MedVersa 能够处理<strong>复合任务</strong>——例如\"描述这张 CT 中的异常并分割出病灶区域\"，LLM 会同时生成文本描述和 <code>&lt;3DSEG&gt;</code> 标记，一次推理完成多个子任务。</div>\n<h5>多模态输入协调器</h5>\n<p>协调器负责将异构输入统一为 LLM 可处理的 token 序列：</p>\n<ol>\n<li><strong>视觉编码器</strong>：2D 图像使用 Swin Transformer-Base（ImageNet 预训练，4 阶段，窗口大小 7，patch 大小 4，初始特征维度 128）；3D 体积使用 3D UNet 编码器</li>\n<li><strong>自适应池化</strong>：无论输入分辨率如何，统一池化为 <strong>9 个视觉 token</strong>，大幅减少序列长度</li>\n<li><strong>线性投影适配器</strong>：<code>AdaptiveAvgPool → LayerNorm → Linear(→4096)</code>，将视觉 token 对齐到 LLM 的嵌入空间（4096 维，与 LLaMA-2 一致）</li>\n<li><strong>多图支持</strong>：通过 <code>&lt;img0&gt;v0&lt;/img0&gt;</code> 格式标记不同图像，支持纵向对比（如前后两次 CT 对比）</li>\n</ol>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：2D 和 3D 使用<strong>不同的线性投影器</strong>，因为两种模态的特征分布差异显著。</div>\n<h5>视觉任务模块</h5>\n<p>三个轻量级专用模块，由 LLM 的特殊标记触发：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模块</th>\n<th>架构</th>\n<th>输入</th>\n<th>输出</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>检测（DET）</td>\n<td>LayerNorm → Linear(4096→256) → ReLU → LayerNorm → Linear(256→4)</td>\n<td><code>&lt;DET&gt;</code> 嵌入</td>\n<td>归一化边界框 <span class=\"kb-math kb-math-inline\">[x_1, y_1, x_2, y_2]</span></td>\n</tr>\n<tr>\n<td>2D 分割（2DSEG）</td>\n<td>ResNet18 编码器 + UNet 解码器</td>\n<td>原始图像 + <code>&lt;2DSEG&gt;</code> 嵌入</td>\n<td>像素级分割掩码</td>\n</tr>\n<tr>\n<td>3D 分割（3DSEG）</td>\n<td>3D UNet</td>\n<td>原始体积 + <code>&lt;3DSEG&gt;</code> 嵌入</td>\n<td>体素级分割掩码</td>\n</tr>\n</tbody>\n</table></div>\n<p>检测模块特别精巧：对于多类检测，LLM 会为每个类别分别生成 <code>&lt;DET&gt;</code> 或 <code>&lt;NODET&gt;</code> 标记，其中 <code>&lt;NODET&gt;</code> 表示该类别不存在。只有 <code>&lt;DET&gt;</code> 对应的嵌入才会被送入检测头。</p>\n<h5>域感知小批量梯度下降</h5>\n<p>多任务多模态联合训练面临严重的<strong>梯度冲突</strong>问题——不同任务的损失函数量级和梯度方向差异大。MedVersa 的解决方案：</p>\n<ol>\n<li><strong>按任务分组</strong>：将训练数据分为 7 个任务组（报告生成、分类、检测、分割、VQA、区域描述、纵向对比）</li>\n<li><strong>按模态细分</strong>：每个任务组内再按影像模态（CXR、CT、MRI 等）细分</li>\n<li><strong>同质 minibatch</strong>：每个 minibatch 只包含<strong>同一任务 + 同一模态</strong>的样本</li>\n<li><strong>任务特定损失</strong>：</li>\n<li>视觉-语言任务：交叉熵损失</li>\n<li>检测：交叉熵 + 回归损失</li>\n<li>分割：Focal Loss + Dice Loss（等权重）</li>\n</ol>\n<div class=\"key-point\">💡 <strong>关键</strong>：这种策略确保每次梯度更新都是\"纯净\"的——不会因为混合不同任务/模态的样本而产生相互抵消的梯度。</div>\n<h5>训练配置</h5>\n<ul>\n<li><strong>LLM 骨干</strong>：LLaMA-2-Chat，使用 <strong>LoRA</strong>（rank=16, alpha=16）微调，优于全参数训练</li>\n<li><strong>优化器</strong>：AdamW + 余弦学习率调度</li>\n<li><strong>数据规模</strong>：91 个公开数据集，约 2900 万训练实例</li>\n<li><strong>图像预处理</strong>：随机裁剪（50%~100%）→ resize 至 224×224；分割任务使用随机翻转增强；3D 数据沿随机轴翻转</li>\n</ul>\n<h5>与现有方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>Med-PaLM M</th>\n<th>MAIRA</th>\n<th>LLaVA-Med</th>\n<th><strong>MedVersa</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>视觉-语言任务</td>\n<td>✅</td>\n<td>✅</td>\n<td>✅</td>\n<td>✅</td>\n</tr>\n<tr>\n<td>检测</td>\n<td>❌</td>\n<td>❌</td>\n<td>❌</td>\n<td>✅</td>\n</tr>\n<tr>\n<td>2D/3D 分割</td>\n<td>❌</td>\n<td>❌</td>\n<td>❌</td>\n<td>✅</td>\n</tr>\n<tr>\n<td>多图对比</td>\n<td>❌</td>\n<td>❌</td>\n<td>❌</td>\n<td>✅</td>\n</tr>\n<tr>\n<td>动态任务路由</td>\n<td>❌</td>\n<td>❌</td>\n<td>❌</td>\n<td>✅（DTP）</td>\n</tr>\n<tr>\n<td>报告生成 BLEU-4</td>\n<td>—</td>\n<td>12.5</td>\n<td>—</td>\n<td><strong>17.8</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>MedVersa 的核心优势在于<strong>统一性</strong>：不是简单地将多个专用模型拼接，而是通过 LLM 编排器实现了真正的端到端多任务推理。实验表明，通用训练策略比专项训练平均提升 6.4%，说明不同任务之间存在正向知识迁移。</p>",
      "quiz": {
        "q": "MedVersa 中 LLM 编排器如何决定是否调用视觉分割模块？",
        "options": [
          "根据输入图像的模态类型自动路由到对应模块",
          "通过预定义的任务分类器判断输入属于哪类任务",
          "LLM 在自回归生成过程中输出特殊标记（如 <2DSEG>）来触发对应模块",
          "用户必须在输入指令中显式指定需要调用的模块"
        ],
        "answer": 2,
        "explain": "MedVersa 的动态任务协议（DTP）让 LLM 在生成文本的过程中自主决定是否输出 <DET>、<2DSEG>、<3DSEG> 等特殊标记，这些标记的隐层嵌入会被提取并传递给对应的视觉模块，无需预定义路由或用户显式指定。"
      }
    },
    {
      "id": "uclif",
      "num": 22,
      "name": "UCLIF",
      "fullName": "UCLIF: 3D胸部CT自监督基础模型 (A Self-Supervised Foundation Model Based on Three-Dimensional Chest CT Scans)",
      "year": "2026",
      "org": "研究机构",
      "parent": "—",
      "paperUrl": "https://pubs.rsna.org/doi/abs/10.1148/rycan.250360",
      "projectUrl": "",
      "category": "foundation_model",
      "motivation": "3D胸部CT自监督预训练优于自然图像迁移",
      "summary": "UCLIF 提出了一种基于对比掩码图像建模（Contrastive Masked Image Modeling, CMIM）的 3D 胸部 CT 自监督基础模型，利用 33,901 例三维胸部 CT 进行预训练，在肺癌组织亚型分类、癌症分期、生存预测和复发预测四项临床任务中均显著优于自然图像预训练和单肿瘤区域预训练方案。",
      "keyPoints": [
        "<strong>大规模 3D CT 预训练数据</strong>：收集 33,901 例三维胸部 CT 扫描（1958–2019 年），构建目前最大规模的肺癌 CT 自监督预训练数据集",
        "<strong>对比掩码图像建模（CMIM）</strong>：融合对比学习（Contrastive Learning）与掩码图像建模（Masked Image Modeling）两种自监督范式，同时捕获全局语义和局部结构特征",
        "<strong>统一基础模型架构</strong>：单一预训练模型通过微调即可适配四种不同的肺癌临床任务，无需针对每个任务从头训练",
        "<strong>四项下游临床任务</strong>：组织学亚型分类（腺癌/大细胞癌/鳞癌）、TNM 癌症分期（I–IV 期）、生存预测（1/3/5 年）、复发预测",
        "<strong>多中心评估</strong>：656 名患者（均龄 68.55 岁，450 名男性），以组织病理、TNM 分期和随访结局作为参考标准",
        "<strong>显著优于基线</strong>：DeLong 检验 <span class=\"kb-math kb-math-inline\">P &lt; .001</span>，亚型分类 AUC 0.82–0.96，分期 AUC 0.91–0.99，生存预测 AUC 0.90–0.97，复发预测 AUC 0.95",
        "<strong>对比实验</strong>：与自然图像预训练（ImageNet）、单肿瘤区域预训练及主流深度学习/机器学习算法进行全面比较"
      ],
      "detail": "<h5>核心框架示意图</h5>\n<pre><code>┌─────────────────────────────────────────────────────────────────────┐\n│                    UCLIF 预训练框架 (CMIM)                          │\n│                                                                     │\n│  ┌──────────────┐     ┌──────────────────────────────────────────┐  │\n│  │  3D 胸部 CT  │     │         对比掩码图像建模 (CMIM)           │  │\n│  │  33,901 例   │────▶│                                          │  │\n│  │ (1958-2019)  │     │  ┌─────────────┐   ┌─────────────────┐  │  │\n│  └──────────────┘     │  │ 对比学习分支 │   │ 掩码建模分支    │  │  │\n│                       │  │             │   │                 │  │  │\n│                       │  │ View₁ ──┐   │   │ Mask patches ──┐│  │  │\n│                       │  │         ├──▶│   │                ├┤  │  │\n│                       │  │ View₂ ──┘   │   │ Reconstruct ──┘│  │  │\n│                       │  │             │   │                 │  │  │\n│                       │  │  L_contrast │   │   L_reconstruct │  │  │\n│                       │  └──────┬──────┘   └────────┬────────┘  │  │\n│                       │         └────────┬──────────┘           │  │\n│                       │                  ▼                      │  │\n│                       │         L_total = L_contrast            │  │\n│                       │                + λ · L_reconstruct      │  │\n│                       └──────────────────────────────────────────┘  │\n│                                          │                          │\n│                                  预训练编码器                        │\n│                                          │                          │\n│                    ┌─────────┬───────────┼───────────┬────────┐    │\n│                    ▼         ▼           ▼           ▼        ▼    │\n│              ┌──────────┐┌────────┐┌──────────┐┌────────┐         │\n│              │ 亚型分类 ││ 分期   ││ 生存预测 ││ 复发   │         │\n│              │ 微调头   ││ 微调头 ││ 微调头   ││ 微调头 │         │\n│              └──────────┘└────────┘└──────────┘└────────┘         │\n└─────────────────────────────────────────────────────────────────────┘\n</code></pre>\n<p><em>图：UCLIF 两阶段训练框架——先通过 CMIM 在大规模 3D CT 上自监督预训练，再针对四项下游临床任务微调</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># UCLIF: Contrastive Masked Image Modeling (CMIM) 预训练伪代码\n\n# ===== 阶段一：自监督预训练 =====\nencoder = 3DEncoder()          # 3D 视觉编码器 (如 3D ViT / 3D ResNet)\nprojector = ProjectionHead()   # 对比学习投影头\ndecoder = MIMDecoder()         # 掩码重建解码器\n\nfor ct_volume in pretrain_dataset:  # 33,901 个 3D 胸部 CT\n    # --- 对比学习分支 ---\n    view1 = augment_3d(ct_volume)   # 3D 数据增强 (旋转/翻转/裁剪/强度变换)\n    view2 = augment_3d(ct_volume)\n    z1 = projector(encoder(view1))\n    z2 = projector(encoder(view2))\n    L_contrast = contrastive_loss(z1, z2)  # InfoNCE / NT-Xent\n\n    # --- 掩码图像建模分支 ---\n    masked_volume, mask = random_mask_3d(ct_volume, ratio=0.75)\n    features = encoder(masked_volume)\n    reconstructed = decoder(features)\n    L_reconstruct = mse_loss(reconstructed[mask], ct_volume[mask])\n\n    # --- 联合优化 ---\n    L_total = L_contrast + λ * L_reconstruct\n    optimizer.step(L_total)\n\n# ===== 阶段二：下游任务微调 =====\nfor task in [subtype_cls, staging_cls, survival_pred, recurrence_pred]:\n    task_head = TaskHead(task)\n    model = encoder + task_head   # 冻结或微调编码器\n    for ct, label in task.train_data:\n        pred = model(ct)\n        loss = task.loss_fn(pred, label)  # CE / Cox / BCE\n        optimizer.step(loss)\n</code></pre>\n<h5>动机与背景</h5>\n<p>医学影像深度学习长期面临<strong>标注数据稀缺</strong>的困境。肺癌是全球致死率最高的恶性肿瘤之一，CT 影像是其筛查和诊断的主要手段。然而，传统方法通常依赖 ImageNet 预训练的 2D 模型进行迁移学习，存在两个根本性缺陷：（1）<strong>域差距</strong>——自然图像与医学 CT 在纹理、灰度分布和语义结构上差异巨大；（2）<strong>维度损失</strong>——将 3D CT 体数据切片为 2D 图像丢失了关键的空间上下文信息（如肿瘤的三维形态、与周围组织的空间关系）。</p>\n<p>此外，已有的医学影像自监督方法多聚焦于<strong>单一肿瘤区域</strong>（如仅裁剪肿瘤 ROI 进行预训练），忽略了肿瘤周围微环境（peritumoral region）和全肺解剖结构中蕴含的丰富诊断信息。UCLIF 的核心动机在于：<strong>利用大规模完整 3D 胸部 CT 进行自监督预训练，让模型同时学习全局解剖语义和局部病灶特征，从而构建一个统一的肺癌影像基础模型</strong>。</p>\n<h5>核心机制：对比掩码图像建模（CMIM）</h5>\n<p>UCLIF 的技术核心是 <strong>Contrastive Masked Image Modeling (CMIM)</strong>，它创新性地将两种互补的自监督学习范式融合为统一的预训练目标：</p>\n<p><strong>1. 对比学习分支（Contrastive Learning）</strong></p>\n<p>对比学习通过拉近同一样本不同增强视图的表征、推远不同样本表征来学习<strong>全局语义特征</strong>。对于 3D CT 数据，增强策略包括随机 3D 旋转、翻转、弹性形变、随机裁剪和强度变换等。对比损失通常采用 InfoNCE 形式：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{contrast}} = -\\log \\frac{\\exp(\\text{sim}(z_i, z_j) / \\tau)}{\\sum_{k=1}^{2N} \\mathbb{1}_{[k \\neq i]} \\exp(\\text{sim}(z_i, z_k) / \\tau)}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">z_i, z_j</span> 为同一 CT 的两个增强视图的投影表征，<span class=\"kb-math kb-math-inline\">\\tau</span> 为温度参数，<span class=\"kb-math kb-math-inline\">\\text{sim}(\\cdot)</span> 为余弦相似度。该分支使编码器学会区分不同患者的 CT 影像，捕获与疾病状态相关的全局判别特征。</p>\n<p><strong>2. 掩码图像建模分支（Masked Image Modeling）</strong></p>\n<p>受 MAE (Masked Autoencoders) 启发，MIM 分支随机遮蔽输入 3D CT 体积中一定比例（通常 60%–75%）的 patch，要求编码器仅基于可见 patch 重建被遮蔽区域：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{reconstruct}} = \\frac{1}{|\\mathcal{M}|} \\sum_{p \\in \\mathcal{M}} \\| \\hat{x}_p - x_p \\|^2</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{M}</span> 为被遮蔽 patch 集合，<span class=\"kb-math kb-math-inline\">\\hat{x}_p</span> 和 <span class=\"kb-math kb-math-inline\">x_p</span> 分别为重建值和原始值。该分支迫使模型学习<strong>局部结构特征</strong>——包括肺实质纹理、血管走行、肿瘤边界等细粒度解剖信息。</p>\n<p><strong>3. 联合优化</strong></p>\n<p>两个分支共享同一个 3D 编码器，通过加权联合损失进行端到端优化：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{total}} = \\mathcal{L}_{\\text{contrast}} + \\lambda \\cdot \\mathcal{L}_{\\text{reconstruct}}</div>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：对比学习擅长学习\"这是什么\"（全局语义），掩码建模擅长学习\"长什么样\"（局部结构）。CMIM 的融合使预训练编码器同时具备全局判别力和局部感知力，这对于肺癌多任务预测至关重要——亚型分类依赖局部纹理特征，分期和生存预测则需要综合全局信息。</div>\n<h5>预训练数据与编码器</h5>\n<p>UCLIF 使用 <strong>33,901 例三维胸部 CT 扫描</strong>进行预训练，数据采集时间跨越 1958 年至 2019 年，来源于多中心数据集。这一规模远超此前的医学影像自监督工作（通常仅使用数百至数千例）。大规模多样化的预训练数据确保模型能够学习到不同扫描协议、设备参数和患者群体下的鲁棒特征表示。</p>\n<p>编码器采用 3D 架构以充分利用 CT 的体积信息。参考文献中包含 ResNet（He et al., CVPR 2016）和 DenseNet（Huang et al., CVPR 2017），表明 UCLIF 可能基于 3D ResNet 或类似的 3D CNN 骨干网络，也可能采用 3D Vision Transformer 架构。</p>\n<h5>下游任务微调与评估</h5>\n<p>预训练完成后，UCLIF 编码器通过添加任务特定的分类/回归头进行微调，覆盖四项核心临床任务：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>任务</th>\n<th>类别</th>\n<th>评估指标</th>\n<th>UCLIF 性能</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>组织亚型分类</td>\n<td>腺癌 / 大细胞癌 / 鳞癌</td>\n<td>AUC</td>\n<td>0.96 / 0.82 / 0.93</td>\n</tr>\n<tr>\n<td>癌症分期</td>\n<td>I / II / III / IV 期</td>\n<td>AUC</td>\n<td>0.95 / 0.99 / 0.92 / 0.91</td>\n</tr>\n<tr>\n<td>生存预测</td>\n<td>1 / 3 / 5 年</td>\n<td>AUC</td>\n<td>0.97 / 0.90 / 0.90</td>\n</tr>\n<tr>\n<td>复发预测</td>\n<td>二分类</td>\n<td>AUC</td>\n<td>0.95</td>\n</tr>\n</tbody>\n</table></div>\n<p>评估在 <strong>656 名患者</strong>（均龄 68.55 ± 10.01 岁，450 名男性）的多中心数据集上进行，参考标准包括组织病理学诊断、TNM 分期和临床随访结局。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：大细胞肺癌的 AUC 相对较低（0.82），可能因为该亚型在数据集中占比较小且影像学特征与其他亚型存在重叠。</div>\n<h5>与传统方法的对比</h5>\n<p>UCLIF 的核心优势体现在三个维度的对比中：</p>\n<ol>\n<li>\n<p><strong>vs. 自然图像预训练（ImageNet Transfer）</strong>：ImageNet 预训练的 2D 模型无法捕获 3D 空间信息，且自然图像与 CT 的域差距导致迁移效果有限。UCLIF 在所有任务上显著优于该基线（DeLong 检验 <span class=\"kb-math kb-math-inline\">P &lt; .001</span>）。</p>\n</li>\n<li>\n<p><strong>vs. 单肿瘤区域预训练</strong>：仅在裁剪的肿瘤 ROI 上预训练会丢失肿瘤周围微环境和全肺解剖信息。UCLIF 使用完整胸部 CT 预训练，能够学习更全面的特征表示。</p>\n</li>\n<li>\n<p><strong>vs. 主流深度学习/机器学习算法</strong>：包括从头训练的 CNN、传统影像组学（Radiomics）+ 机器学习管线等。UCLIF 的自监督预训练提供了更强的特征初始化，在标注数据有限时优势尤为明显。</p>\n</li>\n</ol>\n<div class=\"key-point\">💡 <strong>关键启示</strong>：该工作验证了医学影像领域\"域内大规模自监督预训练 &gt; 域外有监督预训练\"的重要假设，为构建专科化医学影像基础模型提供了有力证据。</div>",
      "quiz": {
        "q": "UCLIF 的 CMIM 预训练策略融合了哪两种自监督学习范式？",
        "options": [
          "生成对抗学习与知识蒸馏",
          "对比学习与掩码图像建模",
          "自回归预测与旋转预测",
          "对比学习与图像着色"
        ],
        "answer": 1,
        "explain": "CMIM (Contrastive Masked Image Modeling) 将对比学习（学习全局语义判别特征）与掩码图像建模（学习局部结构重建特征）融合为统一的预训练目标，使编码器同时具备全局判别力和局部感知力。"
      }
    }
  ],
  "categories": {
    "foundation": {
      "label": "奠基架构",
      "color": "#22a06b"
    },
    "segmentation": {
      "label": "医学分割",
      "color": "#5b63d3"
    },
    "diagnostic": {
      "label": "诊断辅助",
      "color": "#e8820c"
    },
    "foundation_model": {
      "label": "医学大模型",
      "color": "#d32f2f"
    }
  },
  "projectUrls": {}
};
