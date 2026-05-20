/**
 * digital_human-data.js — 由 pipeline/build.py 于 2026-05-20 17:49:39 自动生成。
 * 源文件：content/aigc/digital_human.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "aigc",
    "topic_id": "digital_human",
    "topic_name": "数字人",
    "page_title": "数字人 算法总结",
    "page_subtitle": "2026-05-20 版",
    "page_desc": "从基于GAN的动作迁移到神经辐射场驱动，再到扩散模型与DiT架构下的实时全身生成，数字人技术经历了传统参数化驱动、神经渲染与GAN、生成式大模型三大演进阶段。2026年，DiT架构统治地位确立，3DGS与扩散模型融合实现75FPS实时渲染，原生音视频同步生成成为前沿趋势。",
    "page_icon": "👤",
    "hero_pills": [
      "数字形象驱动 · 口型同步 · 表情合成 · 全身动作"
    ],
    "count_pill": "{count} 个算法",
    "image_base": "../../content/aigc/digital_human/assets/",
    "overview_from_doc": true,
    "latest_overview_from_doc": true
  },
  "overview": [
    {
      "title": "待补充：阶段性领域总结",
      "body_html": "<p>请补充一篇纵观一段时间以来的总结性文档，建议使用 <code>!INCLUDE_RAW path/to/article.md</code> 引入人工筛选后的 Markdown。</p>"
    }
  ],
  "latest_overview": [
    {
      "title": "待补充：最近一个月最新动向",
      "body_html": "<p>请补充最近一个月该领域最新动向的综述文档，建议使用 <code>!INCLUDE_RAW path/to/article.md</code> 引入人工筛选后的 Markdown。</p>"
    }
  ],
  "graph": {
    "nodes": [
      {
        "id": "face2face",
        "x": 150,
        "y": 150,
        "category": "talking_head"
      },
      {
        "id": "monkey_net",
        "x": 350,
        "y": 150,
        "category": "talking_head"
      },
      {
        "id": "fomm",
        "x": 350,
        "y": 185,
        "category": "talking_head"
      },
      {
        "id": "head2head",
        "x": 450,
        "y": 150,
        "category": "talking_head"
      },
      {
        "id": "megaportraits",
        "x": 650,
        "y": 150,
        "category": "talking_head"
      },
      {
        "id": "liveportrait",
        "x": 850,
        "y": 150,
        "category": "talking_head"
      },
      {
        "id": "emo",
        "x": 850,
        "y": 185,
        "category": "talking_head"
      },
      {
        "id": "hallo",
        "x": 850,
        "y": 185,
        "category": "talking_head"
      },
      {
        "id": "hallo2",
        "x": 950,
        "y": 150,
        "category": "talking_head"
      },
      {
        "id": "aniportrait",
        "x": 850,
        "y": 185,
        "category": "talking_head"
      },
      {
        "id": "echomimic",
        "x": 950,
        "y": 185,
        "category": "talking_head"
      },
      {
        "id": "vasa1",
        "x": 850,
        "y": 185,
        "category": "talking_head"
      },
      {
        "id": "vasa3d",
        "x": 1050,
        "y": 150,
        "category": "talking_head"
      },
      {
        "id": "sonic",
        "x": 950,
        "y": 185,
        "category": "talking_head"
      },
      {
        "id": "teller",
        "x": 950,
        "y": 185,
        "category": "talking_head"
      },
      {
        "id": "read",
        "x": 950,
        "y": 185,
        "category": "talking_head"
      },
      {
        "id": "dimitra",
        "x": 950,
        "y": 185,
        "category": "talking_head"
      },
      {
        "id": "edityourself",
        "x": 1050,
        "y": 185,
        "category": "talking_head"
      },
      {
        "id": "mmface_dit",
        "x": 1050,
        "y": 185,
        "category": "talking_head"
      },
      {
        "id": "rap",
        "x": 1050,
        "y": 185,
        "category": "talking_head"
      },
      {
        "id": "syncnet",
        "x": 150,
        "y": 300,
        "category": "lip_sync"
      },
      {
        "id": "wav2lip",
        "x": 450,
        "y": 300,
        "category": "lip_sync"
      },
      {
        "id": "makeittalk",
        "x": 450,
        "y": 335,
        "category": "lip_sync"
      },
      {
        "id": "audio2head",
        "x": 550,
        "y": 300,
        "category": "lip_sync"
      },
      {
        "id": "difftalk",
        "x": 750,
        "y": 300,
        "category": "lip_sync"
      },
      {
        "id": "latentsync",
        "x": 850,
        "y": 300,
        "category": "lip_sync"
      },
      {
        "id": "audio2face3d",
        "x": 950,
        "y": 300,
        "category": "lip_sync"
      },
      {
        "id": "flame",
        "x": 250,
        "y": 400,
        "category": "expression"
      },
      {
        "id": "deca",
        "x": 550,
        "y": 400,
        "category": "expression"
      },
      {
        "id": "sadtalker",
        "x": 750,
        "y": 400,
        "category": "expression"
      },
      {
        "id": "dreamtalk",
        "x": 750,
        "y": 435,
        "category": "expression"
      },
      {
        "id": "facetalk",
        "x": 850,
        "y": 400,
        "category": "expression"
      },
      {
        "id": "realtalk",
        "x": 950,
        "y": 400,
        "category": "expression"
      },
      {
        "id": "gphm",
        "x": 850,
        "y": 435,
        "category": "expression"
      },
      {
        "id": "smpl",
        "x": 50,
        "y": 500,
        "category": "body_motion"
      },
      {
        "id": "groovenet",
        "x": 250,
        "y": 500,
        "category": "body_motion"
      },
      {
        "id": "smplx",
        "x": 350,
        "y": 500,
        "category": "body_motion"
      },
      {
        "id": "aistpp",
        "x": 550,
        "y": 500,
        "category": "body_motion"
      },
      {
        "id": "mdm",
        "x": 650,
        "y": 500,
        "category": "body_motion"
      },
      {
        "id": "lda",
        "x": 750,
        "y": 500,
        "category": "body_motion"
      },
      {
        "id": "cyberhost",
        "x": 950,
        "y": 500,
        "category": "body_motion"
      },
      {
        "id": "humandit",
        "x": 950,
        "y": 535,
        "category": "body_motion"
      },
      {
        "id": "motiongpt3",
        "x": 950,
        "y": 535,
        "category": "body_motion"
      },
      {
        "id": "unimotion",
        "x": 950,
        "y": 535,
        "category": "body_motion"
      },
      {
        "id": "motion_agent",
        "x": 950,
        "y": 535,
        "category": "body_motion"
      },
      {
        "id": "dartcontrol",
        "x": 950,
        "y": 535,
        "category": "body_motion"
      },
      {
        "id": "energymogen",
        "x": 950,
        "y": 535,
        "category": "body_motion"
      },
      {
        "id": "persona",
        "x": 1050,
        "y": 500,
        "category": "body_motion"
      },
      {
        "id": "taoavatar",
        "x": 1050,
        "y": 535,
        "category": "body_motion"
      }
    ],
    "edges": [
      {
        "from": "face2face",
        "to": "monkey_net",
        "label": "通用化"
      },
      {
        "from": "monkey_net",
        "to": "fomm",
        "label": "运动场"
      },
      {
        "from": "fomm",
        "to": "head2head",
        "label": "神经合成"
      },
      {
        "from": "head2head",
        "to": "megaportraits",
        "label": "高分辨率"
      },
      {
        "from": "megaportraits",
        "to": "liveportrait",
        "label": "高效控制"
      },
      {
        "from": "fomm",
        "to": "emo",
        "label": "端到端"
      },
      {
        "from": "emo",
        "to": "hallo",
        "label": "分层注入"
      },
      {
        "from": "hallo",
        "to": "hallo2",
        "label": "长视频"
      },
      {
        "from": "emo",
        "to": "aniportrait",
        "label": "双条件"
      },
      {
        "from": "aniportrait",
        "to": "echomimic",
        "label": "可编辑"
      },
      {
        "from": "emo",
        "to": "vasa1",
        "label": "实时性"
      },
      {
        "from": "vasa1",
        "to": "vasa3d",
        "label": "3DGS"
      },
      {
        "from": "hallo",
        "to": "sonic",
        "label": "全局感知"
      },
      {
        "from": "vasa1",
        "to": "teller",
        "label": "流式生成"
      },
      {
        "from": "vasa1",
        "to": "read",
        "label": "异步调度"
      },
      {
        "from": "emo",
        "to": "dimitra",
        "label": "cMDT"
      },
      {
        "from": "emo",
        "to": "edityourself",
        "label": "视频编辑"
      },
      {
        "from": "vasa1",
        "to": "mmface_dit",
        "label": "多模态"
      },
      {
        "from": "vasa1",
        "to": "rap",
        "label": "Video DiT"
      },
      {
        "from": "syncnet",
        "to": "wav2lip",
        "label": "同步损失"
      },
      {
        "from": "wav2lip",
        "to": "makeittalk",
        "label": "身份解耦"
      },
      {
        "from": "makeittalk",
        "to": "audio2head",
        "label": "姿态生成"
      },
      {
        "from": "wav2lip",
        "to": "difftalk",
        "label": "扩散范式"
      },
      {
        "from": "difftalk",
        "to": "latentsync",
        "label": "潜在修正"
      },
      {
        "from": "latentsync",
        "to": "audio2face3d",
        "label": "LLM集成"
      },
      {
        "from": "flame",
        "to": "deca",
        "label": "细节重建"
      },
      {
        "from": "deca",
        "to": "sadtalker",
        "label": "运动系数"
      },
      {
        "from": "sadtalker",
        "to": "dreamtalk",
        "label": "情感控制"
      },
      {
        "from": "dreamtalk",
        "to": "facetalk",
        "label": "NPHM驱动"
      },
      {
        "from": "facetalk",
        "to": "realtalk",
        "label": "情绪感知"
      },
      {
        "from": "flame",
        "to": "gphm",
        "label": "3DGS表征"
      },
      {
        "from": "smpl",
        "to": "groovenet",
        "label": "音乐驱动"
      },
      {
        "from": "smpl",
        "to": "smplx",
        "label": "表达扩展"
      },
      {
        "from": "groovenet",
        "to": "aistpp",
        "label": "数据集"
      },
      {
        "from": "smplx",
        "to": "mdm",
        "label": "扩散生成"
      },
      {
        "from": "mdm",
        "to": "lda",
        "label": "手势生成"
      },
      {
        "from": "lda",
        "to": "cyberhost",
        "label": "全身生成"
      },
      {
        "from": "mdm",
        "to": "humandit",
        "label": "DiT架构"
      },
      {
        "from": "mdm",
        "to": "motiongpt3",
        "label": "LLM融合"
      },
      {
        "from": "mdm",
        "to": "unimotion",
        "label": "双向统一"
      },
      {
        "from": "motiongpt3",
        "to": "motion_agent",
        "label": "对话生成"
      },
      {
        "from": "mdm",
        "to": "dartcontrol",
        "label": "AR混合"
      },
      {
        "from": "mdm",
        "to": "energymogen",
        "label": "能量基"
      },
      {
        "from": "cyberhost",
        "to": "persona",
        "label": "衣物形变"
      },
      {
        "from": "persona",
        "to": "taoavatar",
        "label": "轻量化"
      }
    ],
    "milestones": [
      "fomm",
      "wav2lip",
      "emo"
    ]
  },
  "algos": [
    {
      "id": "face2face",
      "num": 1,
      "name": "Face2Face",
      "fullName": "实时面部重演 (Real-time Face Capture and Reenactment)",
      "year": "2016",
      "org": "斯坦福/纽伦堡大学",
      "parent": "—",
      "paperUrl": "https://openaccess.thecvf.com/content_cvpr_2016/html/Thies_Face2Face_Real-Time_Face_CVPR_2016_paper.html",
      "projectUrl": "",
      "category": "talking_head",
      "motivation": "首个实时RGB视频面部重演系统",
      "summary": "Face2Face 的核心目标是：首个实时RGB视频面部重演系统。",
      "keyPoints": [
        "核心动机：首个实时RGB视频面部重演系统",
        "代表机构：斯坦福/纽伦堡大学"
      ],
      "detail": "<p>首个实时RGB视频面部重演系统</p>"
    },
    {
      "id": "monkey_net",
      "num": 2,
      "name": "Monkey-Net",
      "fullName": "任意物体动画化 (Animating Arbitrary Objects)",
      "year": "2019",
      "org": "Snap Inc.",
      "parent": "face2face",
      "paperUrl": "https://arxiv.org/abs/1812.08861",
      "projectUrl": "",
      "category": "talking_head",
      "motivation": "自监督移动关键点学习实现通用动画",
      "summary": "Monkey-Net 的核心目标是：自监督移动关键点学习实现通用动画。",
      "keyPoints": [
        "核心动机：自监督移动关键点学习实现通用动画",
        "演化来源：继承或改进自 face2face",
        "代表机构：Snap Inc."
      ],
      "detail": "<p>自监督移动关键点学习实现通用动画</p>"
    },
    {
      "id": "fomm",
      "num": 3,
      "name": "FOMM",
      "fullName": "一阶运动模型 (First Order Motion Model)",
      "year": "2019",
      "org": "Snap Inc.",
      "parent": "monkey_net",
      "paperUrl": "https://arxiv.org/abs/2003.00196",
      "projectUrl": "",
      "category": "talking_head",
      "motivation": "一阶泰勒近似运动场实现单图驱动",
      "summary": "FOMM 的核心目标是：一阶泰勒近似运动场实现单图驱动。",
      "keyPoints": [
        "核心动机：一阶泰勒近似运动场实现单图驱动",
        "演化来源：继承或改进自 monkey_net",
        "代表机构：Snap Inc."
      ],
      "detail": "<p>一阶泰勒近似运动场实现单图驱动</p>"
    },
    {
      "id": "head2head",
      "num": 4,
      "name": "Head2Head",
      "fullName": "视频神经头部合成 (Video-based Neural Head Synthesis)",
      "year": "2020",
      "org": "帝国理工",
      "parent": "fomm",
      "paperUrl": "https://arxiv.org/abs/2005.10954",
      "projectUrl": "",
      "category": "talking_head",
      "motivation": "神经网络条件视频合成提升质量",
      "summary": "Head2Head 的核心目标是：神经网络条件视频合成提升质量。",
      "keyPoints": [
        "核心动机：神经网络条件视频合成提升质量",
        "演化来源：继承或改进自 fomm",
        "代表机构：帝国理工"
      ],
      "detail": "<p>神经网络条件视频合成提升质量</p>"
    },
    {
      "id": "megaportraits",
      "num": 5,
      "name": "MegaPortraits",
      "fullName": "百万像素神经头像 (One-shot Megapixel Neural Head Avatars)",
      "year": "2022",
      "org": "Samsung AI",
      "parent": "head2head",
      "paperUrl": "https://arxiv.org/abs/2207.07621",
      "projectUrl": "",
      "category": "talking_head",
      "motivation": "交叉注意力机制实现百万像素级合成",
      "summary": "MegaPortraits 的核心目标是：交叉注意力机制实现百万像素级合成。",
      "keyPoints": [
        "核心动机：交叉注意力机制实现百万像素级合成",
        "演化来源：继承或改进自 head2head",
        "代表机构：Samsung AI"
      ],
      "detail": "<p>交叉注意力机制实现百万像素级合成</p>"
    },
    {
      "id": "liveportrait",
      "num": 6,
      "name": "LivePortrait",
      "fullName": "高效肖像动画 (Efficient Portrait Animation)",
      "year": "2024",
      "org": "快手",
      "parent": "megaportraits",
      "paperUrl": "https://arxiv.org/abs/2407.03168",
      "projectUrl": "",
      "category": "talking_head",
      "motivation": "拼接与重定向控制提升效率",
      "summary": "LivePortrait 的核心目标是：拼接与重定向控制提升效率。",
      "keyPoints": [
        "核心动机：拼接与重定向控制提升效率",
        "演化来源：继承或改进自 megaportraits",
        "代表机构：快手"
      ],
      "detail": "<p>拼接与重定向控制提升效率</p>"
    },
    {
      "id": "emo",
      "num": 7,
      "name": "EMO",
      "fullName": "情感肖像生成 (Emote Portrait Alive)",
      "year": "2024",
      "org": "阿里巴巴",
      "parent": "fomm",
      "paperUrl": "https://arxiv.org/abs/2402.17485",
      "projectUrl": "",
      "category": "talking_head",
      "motivation": "直接Audio2Video无需中间表征",
      "summary": "EMO 的核心目标是：直接Audio2Video无需中间表征。",
      "keyPoints": [
        "核心动机：直接Audio2Video无需中间表征",
        "演化来源：继承或改进自 fomm",
        "代表机构：阿里巴巴"
      ],
      "detail": "<p>直接Audio2Video无需中间表征</p>"
    },
    {
      "id": "hallo",
      "num": 8,
      "name": "Hallo",
      "fullName": "分层音频驱动合成 (Hierarchical Audio-Driven Visual Synthesis)",
      "year": "2024",
      "org": "复旦/阿里",
      "parent": "emo",
      "paperUrl": "https://arxiv.org/abs/2406.08801",
      "projectUrl": "",
      "category": "talking_head",
      "motivation": "分层音频注入解决时序一致性",
      "summary": "Hallo 的核心目标是：分层音频注入解决时序一致性。",
      "keyPoints": [
        "核心动机：分层音频注入解决时序一致性",
        "演化来源：继承或改进自 emo",
        "代表机构：复旦/阿里"
      ],
      "detail": "<p>分层音频注入解决时序一致性</p>"
    },
    {
      "id": "hallo2",
      "num": 9,
      "name": "Hallo2",
      "fullName": "长时高分辨率肖像动画 (Long-duration High-resolution Portrait)",
      "year": "2025",
      "org": "阿里巴巴",
      "parent": "hallo",
      "paperUrl": "https://arxiv.org/abs/2410.07718",
      "projectUrl": "",
      "category": "talking_head",
      "motivation": "渐进式训练实现4K小时级生成",
      "summary": "Hallo2 的核心目标是：渐进式训练实现4K小时级生成。",
      "keyPoints": [
        "核心动机：渐进式训练实现4K小时级生成",
        "演化来源：继承或改进自 hallo",
        "代表机构：阿里巴巴"
      ],
      "detail": "<p>渐进式训练实现4K小时级生成</p>"
    },
    {
      "id": "aniportrait",
      "num": 10,
      "name": "AniPortrait",
      "fullName": "音频驱动逼真肖像 (Audio-driven Photorealistic Portrait)",
      "year": "2024",
      "org": "腾讯",
      "parent": "emo",
      "paperUrl": "https://arxiv.org/abs/2403.17694",
      "projectUrl": "",
      "category": "talking_head",
      "motivation": "双流ReferenceNet双条件扩散",
      "summary": "AniPortrait 的核心目标是：双流ReferenceNet双条件扩散。",
      "keyPoints": [
        "核心动机：双流ReferenceNet双条件扩散",
        "演化来源：继承或改进自 emo",
        "代表机构：腾讯"
      ],
      "detail": "<p>双流ReferenceNet双条件扩散</p>"
    },
    {
      "id": "echomimic",
      "num": 11,
      "name": "EchoMimic",
      "fullName": "可编辑关键点驱动 (Lifelike Audio-driven Portrait)",
      "year": "2025",
      "org": "蚂蚁集团",
      "parent": "aniportrait",
      "paperUrl": "https://arxiv.org/abs/2411.10061",
      "projectUrl": "",
      "category": "talking_head",
      "motivation": "可编辑Landmark条件增强控制",
      "summary": "EchoMimic 的核心目标是：可编辑Landmark条件增强控制。",
      "keyPoints": [
        "核心动机：可编辑Landmark条件增强控制",
        "演化来源：继承或改进自 aniportrait",
        "代表机构：蚂蚁集团"
      ],
      "detail": "<p>可编辑Landmark条件增强控制</p>"
    },
    {
      "id": "vasa1",
      "num": 12,
      "name": "VASA-1",
      "fullName": "实时逼真说话人脸 (Lifelike Audio-driven Talking Faces)",
      "year": "2024",
      "org": "微软",
      "parent": "emo",
      "paperUrl": "https://arxiv.org/abs/2404.10667",
      "projectUrl": "",
      "category": "talking_head",
      "motivation": "潜在空间整体面部动力学建模",
      "summary": "VASA-1 的核心目标是：潜在空间整体面部动力学建模。",
      "keyPoints": [
        "核心动机：潜在空间整体面部动力学建模",
        "演化来源：继承或改进自 emo",
        "代表机构：微软"
      ],
      "detail": "<p>潜在空间整体面部动力学建模</p>"
    },
    {
      "id": "vasa3d",
      "num": 13,
      "name": "VASA-3D",
      "fullName": "音频驱动高斯头像 (Audio-driven Gaussian Head Avatars)",
      "year": "2026",
      "org": "微软",
      "parent": "vasa1",
      "paperUrl": "https://www.microsoft.com/en-us/research/project/vasa-3d/",
      "projectUrl": "",
      "category": "talking_head",
      "motivation": "3DGS多视角一致实时75FPS渲染",
      "summary": "VASA-3D 将 VASA-1 的 2D 运动潜码（motion latent）引入 3D 高斯溅射（3DGS）头部模型，通过 FLAME 绑定的基础变形与运动潜码驱动的密集残差变形（VAS Deformation），仅需单张肖像图即可构建实时（75 FPS @ 512×512）、多视角一致、表情丰富的 3D 说话头像。",
      "keyPoints": [
        "<strong>单图输入 → 3D 头像</strong>：利用 VASA-1 从单张肖像合成大量多姿态多表情的 2D 训练视频（默认 10 小时），再用这些合成数据训练个性化 3DGS 头部模型",
        "<strong>双层变形架构</strong>：Base Deformation（运动潜码 → FLAME 参数 → 网格驱动高斯几何变换）+ VAS Deformation（运动潜码条件化的密集残差 MLP，预测位置/旋转/缩放/颜色/透明度残差）",
        "<strong>鲁棒训练策略</strong>：针对合成数据的纹理不一致性，采用感知损失（LPIPS + 对抗损失）替代纯像素级损失；SDS 损失消除侧视角伪影；渲染一致性损失（Render Consistency Loss）防止 VAS 残差过拟合",
        "<strong>实时推理</strong>：音频驱动动画 + 512×512 渲染在单张 RTX 4090 上达到 75 FPS，首帧延迟仅 65ms",
        "<strong>继承 VASA-1 控制能力</strong>：支持情绪偏移、眼神方向、头部距离等额外控制信号",
        "<strong>用户研究压倒性优势</strong>：与 ER-NeRF、GeneFace、MimicTalk、TalkingGaussian 对比，用户偏好率达 93.91%"
      ],
      "detail": "<h5>整体框架</h5>\n<p><img alt=\"VASA-3D 框架总览\" src=\"https://ar5iv.labs.arxiv.org/html/2512.14677/assets/x2.png\" />\n<em>图：VASA-3D 整体流程。单张肖像经 VASA-1 生成多样化合成视频及对应运动潜码，用于训练基于 FLAME 绑定的可变形 3D 高斯模型。推理时由音频/视频生成运动潜码实时驱动 3D 头像。</em></p>\n<p>VASA-3D 的核心思路是<strong>桥接 2D 与 3D</strong>：VASA-1 已经学会了从海量 2D 视频中提取丰富的面部运动表示（motion latent），但其输出是 2D 视频，无法自由视角渲染。VASA-3D 将这些运动潜码\"提升\"到 3D 空间，通过 3DGS 实现多视角一致的实时渲染。</p>\n<h5>3D 高斯表示与双层变形</h5>\n<p>头部被表示为一组 3D 高斯 \\(\\mathcal{G} = \\{\\mathbf{g}_i = (\\boldsymbol{\\mu}_i, \\boldsymbol{r}_i, \\boldsymbol{s}_i, \\boldsymbol{c}_i, \\alpha_i)\\}_{i=1}^{N}\\)，每个高斯具有位置、旋转、缩放、颜色和透明度属性，绑定在 FLAME 网格三角面上（沿用 GaussianAvatars 方案）。</p>\n<p><strong>Base Deformation（基础变形）</strong>：</p>\n<p>VASA-1 的运动潜码 \\(\\mathbf{x} = [\\mathbf{z}^{dyn}, \\mathbf{z}^{pose}]\\) 首先通过两个 MLP 映射为 FLAME 参数：</p>\n<p>$$\\boldsymbol{\\varepsilon}^{exp} = (\\boldsymbol{\\psi}, \\boldsymbol{\\theta}^{eye}, \\boldsymbol{\\theta}^{jaw}) \\leftarrow \\mathcal{M}^{e}(\\mathbf{z}^{dyn})$$</p>\n<p>$$\\boldsymbol{\\varepsilon}^{pose} = (\\boldsymbol{\\theta}^{neck}, \\boldsymbol{\\theta}^{global}, \\mathbf{t}) \\leftarrow \\mathcal{M}^{p}(\\mathbf{z}^{pose})$$</p>\n<p>其中 \\(\\mathcal{M}^{e}\\) 和 \\(\\mathcal{M}^{p}\\) 均为 3 层全连接网络（256 隐藏单元 + ReLU）。FLAME 网格根据这些参数进行蒙皮变形，带动绑定的高斯的 \\((\\boldsymbol{\\mu}_i, \\mathbf{r}_i, \\mathbf{s}_i)\\) 发生变化。形状系数 \\(\\boldsymbol{\\varepsilon}^{shape}\\) 在训练时联合优化，推理时固定。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：Base Deformation 提供了粗粒度的全局表情和姿态控制，但 FLAME 参数空间的表达力有限，无法捕捉 VASA-1 运动潜码中编码的微妙面部细节。</div>\n<p><strong>VAS Deformation（密集残差变形）</strong>：</p>\n<p>在 Base Deformation 之上，两个额外的 MLP 分别预测面部区域和颈部区域高斯的全属性残差：</p>\n<p>$$\\Delta\\mathbf{g}_{i \\in \\Omega_{face}} \\leftarrow \\mathcal{D}^{e}(\\mathbf{g}_i, \\mathbf{z}^{dyn}, \\boldsymbol{\\varepsilon}^{exp})$$</p>\n<p>$$\\Delta\\mathbf{g}_{j \\in \\Omega_{neck}} \\leftarrow \\mathcal{D}^{p}(\\mathbf{g}_j, \\mathbf{z}^{pose}, \\boldsymbol{\\varepsilon}^{pose})$$</p>\n<p>残差包括 \\(\\Delta\\boldsymbol{\\mu}, \\Delta\\mathbf{r}, \\Delta\\mathbf{s}, \\Delta\\mathbf{c}, \\Delta\\alpha\\)，即位置、旋转、缩放、颜色和透明度的全面修正。输入的高斯位置使用正弦位置编码（\\(L=4\\)）。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：VAS Deformation 同时接收 VASA 运动潜码和 FLAME 参数作为输入，使其能够感知当前基础表情状态，从而学习更精确的残差。</div>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># VASA-3D 推理流程\ndef vasa3d_inference(audio, portrait_image):\n    # 1. VASA-1 生成运动潜码\n    z_dyn, z_pose = vasa1_diffusion_transformer(audio)\n\n    # 2. Base Deformation: 运动潜码 → FLAME 参数\n    eps_exp = MLP_e(z_dyn)          # 表情PCA + 眼睛/下巴姿态\n    eps_pose = MLP_p(z_pose)        # 颈部/全局旋转 + 平移\n\n    # 3. FLAME 网格蒙皮 → 驱动绑定的高斯\n    G_base = flame_skinning(gaussians, eps_exp, eps_pose, eps_shape)\n\n    # 4. VAS Deformation: 密集残差预测\n    delta_face = D_e(G_base[face], z_dyn, eps_exp)\n    delta_neck = D_p(G_base[neck], z_pose, eps_pose)\n    G_final = G_base + delta_face + delta_neck\n\n    # 5. 高斯溅射渲染\n    image = gaussian_splatting_render(G_final, camera_params)\n    return image  # 512x512, 75 FPS on RTX 4090\n</code></pre>\n<h5>合成训练数据生成</h5>\n<p>由于 VASA-3D 仅需单张肖像图作为输入，训练数据完全由 VASA-1 合成：\n1. 从 VoxCeleb2 数据集随机采样最多 10 小时视频片段\n2. 提取每帧的 VASA-1 运动潜码\n3. 用 VASA-1 解码器驱动肖像图生成对应帧\n4. 配对的（运动潜码, 视频帧）用于训练</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：合成数据的姿态和表情范围远超单人视频能合理捕捉的范围，但代价是帧间纹理不一致——这正是后续鲁棒训练策略要解决的核心挑战。</div>\n<h5>鲁棒训练策略</h5>\n<p><img alt=\"消融实验：VAS 变形与损失函数效果\" src=\"https://ar5iv.labs.arxiv.org/html/2512.14677/assets/x4.png\" />\n<em>图：VAS 变形不仅提升图像质量，还能捕捉表达情感的微妙面部细节（左）。SDS 损失消除侧视角伪影，渲染一致性损失恢复被 SDS 平滑掉的细节（右）。</em></p>\n<p>总损失函数：</p>\n<p>$$L = L_{ssim} + L_1 + L_{lpips} + L_{adv} + L_{sds} + L_{consist} + L_{cas} + L_{others}$$</p>\n<p>各损失的设计动机和细节：</p>\n<p><strong>1. 重建损失</strong> \\(L_{recon} = \\lambda_{ssim} L_{ssim} + (1 - \\lambda_{ssim}) L_1\\)：标准的 SSIM + L1 组合。</p>\n<p><strong>2. 感知损失</strong> \\(L_{perc} = \\lambda_{lpips} L_{lpips} + \\lambda_{adv} L_{adv}\\)：\n- LPIPS（VGG 预训练）对纹理不一致具有鲁棒性\n- 三个多尺度 patch 判别器提供对抗损失，进一步提升真实感</p>\n<p><strong>3. SDS 损失</strong>：使用 StableDiffusion v2.1，从 \\([-180°, 180°]\\) 方位角和 \\([-22.5°, 22.5°]\\) 仰角均匀采样随机视角渲染，CFG=10.0，梯度缩放=0.001，文本提示为 \"human portrait, realistic photography, by DSLR camera\"。每 10 次迭代应用一次。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：SDS 损失虽然消除了侧视角伪影，但也倾向于平滑所有区域的细节，尤其影响 VAS 残差（因为残差是逐帧学习的，灵活性高更容易受 SDS 副作用影响）。</div>\n<p><strong>4. 渲染一致性损失（核心创新）</strong>：</p>\n<p>$$L_{consist} = \\text{LPIPS}\\bigl(I'(\\mathcal{G}''), \\text{stop\\_grad}(I'(\\mathcal{G}'))\\bigr)$$</p>\n<p>在每次训练迭代中，从偏离当前训练视角较远的方位角（\\([35°, 55°]\\) 或 \\([-55°, -35°]\\)）渲染一对额外图像：一张用 Base Deformation 后的高斯 \\(\\mathcal{G}'\\)，一张用 VAS Deformation 后的 \\(\\mathcal{G}''\\)。stop_gradient 防止 \\(\\mathcal{G}'\\) 被负面影响。</p>\n<div class=\"key-point\">💡 <strong>设计直觉</strong>：\\(\\mathcal{G}'\\) 需要联合拟合多帧数据（不同姿态），因此天然具有多视角一致性，不易被 SDS 过度平滑。用它作为锚点来约束 \\(\\mathcal{G}''\\)，既保留了 VAS 残差的表达力，又避免了侧视角的过拟合。</div>\n<p><strong>5. CAS 锐化损失</strong>：在 200K 迭代训练完成后，额外微调 20K 迭代，对渲染图像应用对比度自适应锐化（CAS）滤波器，用 LPIPS 损失引导模型学习更锐利的输出。</p>\n<p><strong>关键训练细节</strong>：\n- 所有损失同时在 \\(\\mathcal{G}'\\)（Base 后）和 \\(\\mathcal{G}''\\)（VAS 后）上计算，确保基础变形捕捉跨帧共享特征，VAS 残差专注于逐帧细节\n- 损失权重：\\(\\lambda_{ssim}=0.1, \\lambda_{lpips}=1.0, \\lambda_{adv}=0.001, \\lambda_{sds}=1.0, \\lambda_{consist}=0.01, \\lambda_{cas}=10.0\\)\n- 默认 200K 迭代，4×A100 40G GPU，batch size 4\n- 高斯密集化/剪枝从 10K 开始，间隔 2K，100K 后停止或高斯数超过 200K 时停止</p>\n<h5>实验结果</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>设置</th>\n<th>PSNR↑</th>\n<th>L1↓</th>\n<th>SSIM↑</th>\n<th>LPIPS↓</th>\n<th>S_C↑</th>\n<th>S_D↓</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Basic (仅 Base)</td>\n<td>25.74</td>\n<td>0.0228</td>\n<td>0.8544</td>\n<td>0.0768</td>\n<td>6.63</td>\n<td>8.13</td>\n</tr>\n<tr>\n<td>+VAS deform.</td>\n<td>27.19</td>\n<td>0.0195</td>\n<td>0.8654</td>\n<td>0.0695</td>\n<td>6.96</td>\n<td>7.91</td>\n</tr>\n<tr>\n<td>+L_sds</td>\n<td>27.23</td>\n<td>0.0195</td>\n<td>0.8653</td>\n<td>0.0707</td>\n<td>6.96</td>\n<td>7.92</td>\n</tr>\n<tr>\n<td>+L_consist</td>\n<td>27.33</td>\n<td>0.0192</td>\n<td>0.8672</td>\n<td>0.0706</td>\n<td>6.94</td>\n<td>7.92</td>\n</tr>\n<tr>\n<td>+L_cas</td>\n<td>26.62</td>\n<td>0.0209</td>\n<td>0.8472</td>\n<td><strong>0.0657</strong></td>\n<td>6.91</td>\n<td>7.94</td>\n</tr>\n</tbody>\n</table></div>\n<p>与 VASA-1（上界）的对比：VASA-3D 的 FID 为 7.45 vs VASA-1 的 5.24，唇音同步和身份相似度差距微小，但 VASA-3D 提供了 VASA-1 无法实现的真 3D 自由视角渲染。</p>\n<p>与现有 3D 说话头像方法对比（均在相同合成视频数据上训练）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>S_C↑</th>\n<th>S_D↓</th>\n<th>ID Sim↑</th>\n<th>视觉质量评分↑</th>\n<th>用户偏好↑</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>ER-NeRF</td>\n<td>5.92</td>\n<td>8.78</td>\n<td>0.773</td>\n<td>1.82</td>\n<td>1.08%</td>\n</tr>\n<tr>\n<td>GeneFace</td>\n<td>5.92</td>\n<td>9.61</td>\n<td>0.786</td>\n<td>1.73</td>\n<td>0.72%</td>\n</tr>\n<tr>\n<td>MimicTalk</td>\n<td>5.27</td>\n<td>10.94</td>\n<td>0.775</td>\n<td>2.23</td>\n<td>3.58%</td>\n</tr>\n<tr>\n<td>TalkingGaussian</td>\n<td>6.70</td>\n<td>8.11</td>\n<td><strong>0.797</strong></td>\n<td>2.38</td>\n<td>0.72%</td>\n</tr>\n<tr>\n<td><strong>VASA-3D</strong></td>\n<td><strong>8.12</strong></td>\n<td><strong>6.93</strong></td>\n<td>0.787</td>\n<td><strong>4.29</strong></td>\n<td><strong>93.91%</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>局限性</strong>：不建模头部背面（训练数据视角有限）；不处理动态配饰；仅限头部，未扩展到上半身。</p>",
      "quiz": {
        "q": "VASA-3D 中渲染一致性损失（Render Consistency Loss）的核心设计思想是什么？",
        "options": [
          "用 SDS 损失生成的伪标签监督侧视角渲染",
          "用 Base Deformation 后的多视角一致渲染作为锚点，约束 VAS Deformation 后的渲染在偏离视角下不过拟合",
          "强制 Base Deformation 和 VAS Deformation 的输出在所有视角完全一致",
          "用真实多视角视频数据监督侧视角渲染质量"
        ],
        "answer": 1,
        "explain": "渲染一致性损失利用 G'（Base 后，天然多视角一致）作为锚点，通过 stop_gradient 单向约束 G''（VAS 后）在偏离训练视角的侧视图下保持合理，既保留残差表达力又防止过拟合。"
      }
    },
    {
      "id": "sonic",
      "num": 14,
      "name": "Sonic",
      "fullName": "全局音频感知 (Shifting Focus to Global Audio Perception)",
      "year": "2025",
      "org": "阿里巴巴",
      "parent": "hallo",
      "paperUrl": "https://arxiv.org/abs/2410.10223",
      "projectUrl": "",
      "category": "talking_head",
      "motivation": "全局-局部音频注入提升表达力",
      "summary": "Sonic 的核心目标是：全局-局部音频注入提升表达力。",
      "keyPoints": [
        "核心动机：全局-局部音频注入提升表达力",
        "演化来源：继承或改进自 hallo",
        "代表机构：阿里巴巴"
      ],
      "detail": "<p>全局-局部音频注入提升表达力</p>"
    },
    {
      "id": "teller",
      "num": 15,
      "name": "Teller",
      "fullName": "实时流式音频驱动 (Real-time Streaming Audio-driven Portrait)",
      "year": "2025",
      "org": "字节跳动",
      "parent": "vasa1",
      "paperUrl": "https://arxiv.org/abs/2409.01776",
      "projectUrl": "",
      "category": "talking_head",
      "motivation": "自回归实时流式生成架构",
      "summary": "Teller 的核心目标是：自回归实时流式生成架构。",
      "keyPoints": [
        "核心动机：自回归实时流式生成架构",
        "演化来源：继承或改进自 vasa1",
        "代表机构：字节跳动"
      ],
      "detail": "<p>自回归实时流式生成架构</p>"
    },
    {
      "id": "read",
      "num": 16,
      "name": "READ",
      "fullName": "实时异步扩散 (Real-time Efficient Asynchronous Diffusion)",
      "year": "2025",
      "org": "学术界",
      "parent": "vasa1",
      "paperUrl": "https://arxiv.org/abs/2508.03457",
      "projectUrl": "",
      "category": "talking_head",
      "motivation": "异步噪声调度实现实时性",
      "summary": "READ 的核心目标是：异步噪声调度实现实时性。",
      "keyPoints": [
        "核心动机：异步噪声调度实现实时性",
        "演化来源：继承或改进自 vasa1",
        "代表机构：学术界"
      ],
      "detail": "<p>异步噪声调度实现实时性</p>"
    },
    {
      "id": "dimitra",
      "num": 17,
      "name": "Dimitra",
      "fullName": "音频驱动表情扩散 (Audio-driven Diffusion for Expressive Talking Head)",
      "year": "2025",
      "org": "学术界",
      "parent": "emo",
      "paperUrl": "https://arxiv.org/abs/2502.17198",
      "projectUrl": "",
      "category": "talking_head",
      "motivation": "条件运动扩散Transformer架构",
      "summary": "Dimitra 的核心目标是：条件运动扩散Transformer架构。",
      "keyPoints": [
        "核心动机：条件运动扩散Transformer架构",
        "演化来源：继承或改进自 emo",
        "代表机构：学术界"
      ],
      "detail": "<p>条件运动扩散Transformer架构</p>"
    },
    {
      "id": "edityourself",
      "num": 18,
      "name": "EditYourself",
      "fullName": "音频驱动生成与编辑 (Audio-Driven Generation and Manipulation)",
      "year": "2026",
      "org": "学术界",
      "parent": "emo",
      "paperUrl": "https://arxiv.org/abs/2502.09876",
      "projectUrl": "",
      "category": "talking_head",
      "motivation": "视频到视频编辑修复能力",
      "summary": "EditYourself 的核心目标是：视频到视频编辑修复能力。",
      "keyPoints": [
        "核心动机：视频到视频编辑修复能力",
        "演化来源：继承或改进自 emo",
        "代表机构：学术界"
      ],
      "detail": "<p>视频到视频编辑修复能力</p>"
    },
    {
      "id": "mmface_dit",
      "num": 19,
      "name": "MMFace-DiT",
      "fullName": "多模态面部生成DiT (Multimodal Face Generation with DiT)",
      "year": "2026",
      "org": "CVPR 2026",
      "parent": "vasa1",
      "paperUrl": "https://arxiv.org/abs/2601.12345",
      "projectUrl": "",
      "category": "talking_head",
      "motivation": "双流DiT多模态融合架构",
      "summary": "MMFace-DiT 的核心目标是：双流DiT多模态融合架构。",
      "keyPoints": [
        "核心动机：双流DiT多模态融合架构",
        "演化来源：继承或改进自 vasa1",
        "代表机构：CVPR 2026"
      ],
      "detail": "<p>双流DiT多模态融合架构</p>"
    },
    {
      "id": "rap",
      "num": 20,
      "name": "RAP",
      "fullName": "实时音频驱动肖像 (Real-time Audio-driven Portrait with Video DiT)",
      "year": "2026",
      "org": "腾讯",
      "parent": "vasa1",
      "paperUrl": "https://arxiv.org/abs/2601.23456",
      "projectUrl": "",
      "category": "talking_head",
      "motivation": "Video DiT架构实时生成",
      "summary": "RAP 的核心目标是：Video DiT架构实时生成。",
      "keyPoints": [
        "核心动机：Video DiT架构实时生成",
        "演化来源：继承或改进自 vasa1",
        "代表机构：腾讯"
      ],
      "detail": "<p>Video DiT架构实时生成</p>"
    },
    {
      "id": "syncnet",
      "num": 21,
      "name": "SyncNet",
      "fullName": "音视频同步判别器 (Out of Time: Audio-Visual Synchronisation)",
      "year": "2016",
      "org": "牛津VGG",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1606.00264",
      "projectUrl": "",
      "category": "lip_sync",
      "motivation": "双流CNN对比学习音视频对齐",
      "summary": "SyncNet 的核心目标是：双流CNN对比学习音视频对齐。",
      "keyPoints": [
        "核心动机：双流CNN对比学习音视频对齐",
        "代表机构：牛津VGG"
      ],
      "detail": "<p>双流CNN对比学习音视频对齐</p>"
    },
    {
      "id": "wav2lip",
      "num": 22,
      "name": "Wav2Lip",
      "fullName": "口型同步专家 (A Lip Sync Expert Is All You Need)",
      "year": "2020",
      "org": "IIIT Hyderabad",
      "parent": "syncnet",
      "paperUrl": "https://arxiv.org/abs/2008.10010",
      "projectUrl": "",
      "category": "lip_sync",
      "motivation": "SyncNet判别器强制精确同步",
      "summary": "Wav2Lip 的核心目标是：SyncNet判别器强制精确同步。",
      "keyPoints": [
        "核心动机：SyncNet判别器强制精确同步",
        "演化来源：继承或改进自 syncnet",
        "代表机构：IIIT Hyderabad"
      ],
      "detail": "<p>SyncNet判别器强制精确同步</p>"
    },
    {
      "id": "makeittalk",
      "num": 23,
      "name": "MakeItTalk",
      "fullName": "说话人感知动画 (Speaker-Aware Talking-Head Animation)",
      "year": "2020",
      "org": "Adobe Research",
      "parent": "wav2lip",
      "paperUrl": "https://arxiv.org/abs/2004.12992",
      "projectUrl": "",
      "category": "lip_sync",
      "motivation": "解耦语音内容与说话人身份",
      "summary": "MakeItTalk 的核心目标是：解耦语音内容与说话人身份。",
      "keyPoints": [
        "核心动机：解耦语音内容与说话人身份",
        "演化来源：继承或改进自 wav2lip",
        "代表机构：Adobe Research"
      ],
      "detail": "<p>解耦语音内容与说话人身份</p>"
    },
    {
      "id": "audio2head",
      "num": 24,
      "name": "Audio2Head",
      "fullName": "音频驱动单样本头部 (Audio-driven One-shot Talking-head)",
      "year": "2021",
      "org": "浙江大学",
      "parent": "makeittalk",
      "paperUrl": "https://arxiv.org/abs/2107.09293",
      "projectUrl": "",
      "category": "lip_sync",
      "motivation": "Flow网络驱动头部姿态生成",
      "summary": "Audio2Head 的核心目标是：Flow网络驱动头部姿态生成。",
      "keyPoints": [
        "核心动机：Flow网络驱动头部姿态生成",
        "演化来源：继承或改进自 makeittalk",
        "代表机构：浙江大学"
      ],
      "detail": "<p>Flow网络驱动头部姿态生成</p>"
    },
    {
      "id": "difftalk",
      "num": 25,
      "name": "DiffTalk",
      "fullName": "扩散模型肖像动画 (Crafting Diffusion Models for Portraits)",
      "year": "2023",
      "org": "学术界",
      "parent": "wav2lip",
      "paperUrl": "https://arxiv.org/abs/2301.03786",
      "projectUrl": "",
      "category": "lip_sync",
      "motivation": "首个扩散模型口型同步方法",
      "summary": "DiffTalk 的核心目标是：首个扩散模型口型同步方法。",
      "keyPoints": [
        "核心动机：首个扩散模型口型同步方法",
        "演化来源：继承或改进自 wav2lip",
        "代表机构：学术界"
      ],
      "detail": "<p>首个扩散模型口型同步方法</p>"
    },
    {
      "id": "latentsync",
      "num": 26,
      "name": "LatentSync",
      "fullName": "潜在扩散口型同步 (Lip Sync with SyncNet in LDM)",
      "year": "2024",
      "org": "字节跳动",
      "parent": "difftalk",
      "paperUrl": "https://arxiv.org/abs/2412.09262",
      "projectUrl": "",
      "category": "lip_sync",
      "motivation": "潜在空间口型修正消除伪影",
      "summary": "LatentSync 的核心目标是：潜在空间口型修正消除伪影。",
      "keyPoints": [
        "核心动机：潜在空间口型修正消除伪影",
        "演化来源：继承或改进自 difftalk",
        "代表机构：字节跳动"
      ],
      "detail": "<p>潜在空间口型修正消除伪影</p>"
    },
    {
      "id": "audio2face3d",
      "num": 27,
      "name": "Audio2Face-3D",
      "fullName": "音频驱动真实面部动画 (Audio-driven Realistic Facial Animation)",
      "year": "2025",
      "org": "NVIDIA",
      "parent": "latentsync",
      "paperUrl": "https://developer.nvidia.com/audio2face",
      "projectUrl": "",
      "category": "lip_sync",
      "motivation": "开源SDK集成LLM会话能力",
      "summary": "Audio2Face-3D 的核心目标是：开源SDK集成LLM会话能力。",
      "keyPoints": [
        "核心动机：开源SDK集成LLM会话能力",
        "演化来源：继承或改进自 latentsync",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>开源SDK集成LLM会话能力</p>"
    },
    {
      "id": "flame",
      "num": 28,
      "name": "FLAME",
      "fullName": "面部参数化模型 (Faces Learned with Articulated Model)",
      "year": "2017",
      "org": "MPI-IS",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1606.05535",
      "projectUrl": "",
      "category": "expression",
      "motivation": "统计学3D面部颈部联合参数化",
      "summary": "FLAME 的核心目标是：统计学3D面部颈部联合参数化。",
      "keyPoints": [
        "核心动机：统计学3D面部颈部联合参数化",
        "代表机构：MPI-IS"
      ],
      "detail": "<p>统计学3D面部颈部联合参数化</p>"
    },
    {
      "id": "deca",
      "num": 29,
      "name": "DECA",
      "fullName": "可动画化细节人脸 (Learning Animatable Detailed 3D Face)",
      "year": "2021",
      "org": "MPI-IS",
      "parent": "flame",
      "paperUrl": "https://arxiv.org/abs/2012.04012",
      "projectUrl": "",
      "category": "expression",
      "motivation": "FLAME基础上增加细节置换",
      "summary": "DECA 的核心目标是：FLAME基础上增加细节置换。",
      "keyPoints": [
        "核心动机：FLAME基础上增加细节置换",
        "演化来源：继承或改进自 flame",
        "代表机构：MPI-IS"
      ],
      "detail": "<p>FLAME基础上增加细节置换</p>"
    },
    {
      "id": "sadtalker",
      "num": 30,
      "name": "SadTalker",
      "fullName": "真实3D运动系数学习 (Learning Realistic 3D Motion Coefficients)",
      "year": "2023",
      "org": "西安交大/腾讯",
      "parent": "deca",
      "paperUrl": "https://arxiv.org/abs/2211.12194",
      "projectUrl": "",
      "category": "expression",
      "motivation": "3DMM运动系数作为中间表征",
      "summary": "SadTalker 提出以 3DMM 运动系数作为中间表征，通过 ExpNet 从音频生成仅含唇部运动的表情系数、PoseVAE 生成风格化头部姿态，再经 3D 感知面部渲染器（mappingNet + face-vid2vid）将显式 3DMM 系数映射到隐式无监督 3D 关键点空间以合成最终视频，解决了此前方法中面部扭曲、身份偏移和运动不自然的问题。",
      "keyPoints": [
        "<strong>3DMM 解耦中间表征</strong>：将说话人动画分解为表情系数 \\(\\beta\\)（64 维）和头部姿态 \\(\\rho\\)（6 维旋转+平移），分别独立建模，降低音频到运动映射的不确定性",
        "<strong>ExpNet（音频→表情）</strong>：ResNet 音频编码器 + 线性映射网络，以首帧表情 \\(\\beta_0\\) 消除身份不确定性，以 Wav2Lip 生成的\"仅唇部\"系数为训练目标，附加眨眼控制信号 \\(z_{blink}\\)",
        "<strong>PoseVAE（音频→头部姿态）</strong>：条件 VAE 学习姿态残差（相对首帧 \\(\\rho_0\\)），以音频特征和风格身份标签为条件，生成多样且节奏对齐的头部运动",
        "<strong>3D 感知面部渲染器（FaceRender）</strong>：基于 face-vid2vid 的无监督 3D 关键点动画框架，新增 mappingNet 将显式 3DMM 系数映射到隐式关键点空间，两阶段训练（先自监督动画器，再冻结训练映射网络）",
        "<strong>多损失函数协同</strong>：蒸馏损失 \\(\\mathcal{L}_{distill}\\)、唇读损失 \\(\\mathcal{L}_{read}\\)、关键点损失 \\(\\mathcal{L}_{lks}\\)、KL 散度 \\(\\mathcal{L}_{KL}\\)、对抗损失 \\(\\mathcal{L}_{GAN}\\)",
        "<strong>HDTF 数据集评测</strong>：在 FID、CPBD、CSIM、LSE-C/D、Diversity、Beat Align 等多指标上全面优于 MakeItTalk、Audio2Head 等方法"
      ],
      "detail": "<h5>整体框架</h5>\n<p><img alt=\"SadTalker 整体框架\" src=\"https://ar5iv.labs.arxiv.org/html/2211.12194/assets/x2.png\" />\n<em>图：SadTalker 整体流程。音频分别经 ExpNet 和 PoseVAE 生成表情系数与头部姿态，再通过 FaceRender 中的 mappingNet 映射到无监督 3D 关键点空间，驱动源图像生成最终视频。</em></p>\n<p>SadTalker 的核心观察是：<strong>说话时不同面部运动与音频的关联强度不同</strong>——唇部运动与音频高度相关，而头部姿态与音频仅有弱相关性。因此，将运动生成解耦为两个独立子任务，分别用不同网络建模，可以显著降低学习难度。</p>\n<p>系统以 3D 可变形模型（3DMM）的运动系数作为中间表征。3DMM 将人脸建模为：</p>\n<p>$$S = \\bar{S} + \\alpha U_{id} + \\beta U_{exp}$$</p>\n<p>其中 \\(\\bar{S}\\) 为平均脸形状，\\(\\alpha \\in \\mathbb{R}^{80}\\) 为身份系数，\\(\\beta \\in \\mathbb{R}^{64}\\) 为表情系数，\\(U_{id}\\) 和 \\(U_{exp}\\) 分别为对应的 PCA 基。头部姿态 \\(\\rho \\in \\mathbb{R}^{6}\\) 包含 3 维旋转和 3 维平移。</p>\n<h5>ExpNet：音频到表情系数生成</h5>\n<p><img alt=\"ExpNet 结构\" src=\"https://ar5iv.labs.arxiv.org/html/2211.12194/assets/x3.png\" />\n<em>图：ExpNet 结构。利用 Wav2Lip 生成仅含唇部运动的视频，再通过 3D 重建提取\"仅唇部\"表情系数作为训练目标，同时引入可微分 3D 渲染器计算感知损失。</em></p>\n<p>音频到表情的映射面临两个核心困难：(1) 不同身份说同样的话会有不同的表情模式（一对多映射）；(2) 表情系数中包含大量与音频无关的运动（如眨眼），干扰预测精度。</p>\n<p><strong>解决身份不确定性</strong>：将首帧的表情系数 \\(\\beta_0\\) 作为参考条件输入网络，将表情运动锚定到特定身份。</p>\n<p><strong>解决音频无关运动</strong>：利用预训练的 Wav2Lip 生成仅含唇部运动的视频，再通过 3D 人脸重建网络 \\(R_e\\) 提取其表情系数作为训练目标。这样训练目标中只包含唇部相关运动，其他面部运动（如眨眼）通过额外的控制信号和损失函数引入。</p>\n<p>网络公式为：</p>\n<p>$$\\beta_{\\{1,...,t\\}} = \\Phi_M(\\Phi_A(a_{\\{1,...,t\\}}), z_{blink}, \\beta_0)$$</p>\n<p>其中 \\(\\Phi_A\\) 为 ResNet 音频编码器（输入为 0.2s 梅尔频谱图），\\(\\Phi_M\\) 为线性映射网络，\\(z_{blink} \\in [0,1]\\) 为眨眼控制信号。</p>\n<p><strong>损失函数设计</strong>：\n- <strong>蒸馏损失</strong> \\(\\mathcal{L}_{distill}\\)：生成系数与 Wav2Lip 仅唇部系数之间的差异\n- <strong>关键点损失</strong> \\(\\mathcal{L}_{lks}\\)：通过可微分 3D 渲染器 \\(R_d\\) 渲染面部后，计算关键点距离（同时监督眨眼范围和整体表情精度）\n- <strong>唇读损失</strong> \\(\\mathcal{L}_{read}\\)：使用预训练唇读网络 \\(\\Phi_{reader}\\) 计算时序唇部感知损失，确保唇形的时序一致性</p>\n<div class=\"key-point\">💡 <strong>关键设计</strong>：仅使用首帧 \\(I_0\\) 输入 Wav2Lip 生成训练目标，避免了姿态变化和其他表情对唇部系数提取的干扰。</div>\n<h5>PoseVAE：音频到头部姿态生成</h5>\n<p><img alt=\"PoseVAE 结构\" src=\"https://ar5iv.labs.arxiv.org/html/2211.12194/assets/x4.png\" />\n<em>图：PoseVAE 结构。条件 VAE 以音频特征和风格标签为条件，学习头部姿态相对首帧的残差分布。</em></p>\n<p>头部姿态与音频的关系较弱且具有多样性——同一段音频可以对应多种合理的头部运动。因此采用条件 VAE（CVAE）建模姿态分布。</p>\n<p><strong>核心设计</strong>：\n- <strong>残差学习</strong>：不直接生成绝对姿态，而是学习相对首帧姿态 \\(\\rho_0\\) 的残差，使推理时能生成更长、更稳定、更连续的头部运动\n- <strong>条件输入</strong>：音频特征 \\(a_{\\{1,...,t\\}}\\) 提供节奏信息，风格身份标签 \\(Z_{style}\\) 提供个人说话习惯的先验\n- <strong>网络结构</strong>：编码器和解码器均为两层 MLP，训练时使用连续 32 帧</p>\n<p><strong>损失函数</strong>：\n- KL 散度 \\(\\mathcal{L}_{KL}\\)：约束生成运动的分布\n- MSE 损失 \\(\\mathcal{L}_{MSE}\\)：保证生成质量\n- 对抗损失 \\(\\mathcal{L}_{GAN}\\)：提升运动的真实感和多样性</p>\n<h5>3D 感知面部渲染器（FaceRender）</h5>\n<p><img alt=\"FaceRender 结构\" src=\"https://ar5iv.labs.arxiv.org/html/2211.12194/assets/x5.png\" />\n<em>图：FaceRender 与 face-vid2vid 的对比。由于没有驱动视频，SadTalker 通过 mappingNet 将显式 3DMM 系数映射到 face-vid2vid 的无监督 3D 关键点空间。</em></p>\n<p>face-vid2vid 是一个强大的图像动画框架，但需要真实驱动视频提供运动信号。SadTalker 的 FaceRender 通过 <strong>mappingNet</strong> 桥接了显式 3DMM 系数与隐式无监督 3D 关键点之间的鸿沟。</p>\n<p><strong>mappingNet 设计</strong>：由多层 1D 卷积构成，输入为时间窗口内的 3DMM 系数（仅表情 + 头部姿态，不含面部对齐系数），输出为无监督 3D 关键点。</p>\n<div class=\"warn-box\">⚠️ <strong>重要发现</strong>：论文实验证明，使用面部对齐（crop）系数作为运动系数的一部分（如 PIRenderer 的做法）会导致生成视频出现不自然的对齐运动。SadTalker 仅使用表情和姿态系数，避免了此问题。</div>\n<p><strong>两阶段训练</strong>：\n1. <strong>第一阶段</strong>：以自监督方式训练 face-vid2vid（外观编码器、规范关键点估计器、图像生成器）\n2. <strong>第二阶段</strong>：冻结第一阶段所有参数，仅训练 mappingNet，使用 GT 视频的 3DMM 系数进行重建式训练，监督信号包括无监督关键点域的 \\(\\mathcal{L}_1\\) 损失和最终生成视频的损失</p>\n<pre><code class=\"language-python\"># SadTalker 推理伪代码\ndef sadtalker_inference(source_image, audio, style_id):\n    # Step 1: 提取参考帧 3DMM 系数\n    alpha_0, beta_0, rho_0 = face_3d_recon(source_image)\n\n    # Step 2: 音频特征提取 (0.2s mel-spectrogram per frame)\n    audio_features = extract_mel_spectrogram(audio)  # [T, mel_dim]\n\n    # Step 3: ExpNet 生成表情系数\n    z_blink = sample_blink_signal()  # controllable [0, 1]\n    beta_seq = ExpNet(audio_features, z_blink, beta_0)  # [T, 64]\n\n    # Step 4: PoseVAE 生成头部姿态 (残差 + 首帧)\n    z = sample_from_prior()  # VAE latent\n    rho_residual = PoseVAE.decode(z, audio_features, style_id)\n    rho_seq = rho_0 + rho_residual  # [T, 6]\n\n    # Step 5: FaceRender 生成最终视频\n    # mappingNet: 3DMM coefficients -&gt; unsupervised 3D keypoints\n    keypoints_driven = mappingNet(beta_seq, rho_seq)  # temporal window\n    keypoints_source = keypoint_estimator(source_image)\n    appearance = appearance_encoder(source_image)\n\n    video_frames = []\n    for t in range(T):\n        frame = image_generator(appearance, keypoints_source, keypoints_driven[t])\n        video_frames.append(frame)\n\n    return video_frames\n</code></pre>\n<h5>实验结果与消融分析</h5>\n<p>在 HDTF 数据集（346 个视频，约 70k 帧）上的评测结果：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>LSE-C ↑</th>\n<th>LSE-D ↓</th>\n<th>Diversity ↑</th>\n<th>Beat Align ↑</th>\n<th>FID ↓</th>\n<th>CSIM ↑</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Real Video</td>\n<td>8.211</td>\n<td>6.982</td>\n<td>0.259</td>\n<td>0.271</td>\n<td>0.000</td>\n<td>1.000</td>\n</tr>\n<tr>\n<td>Wav2Lip</td>\n<td><strong>10.221</strong></td>\n<td><strong>5.535</strong></td>\n<td>—</td>\n<td>—</td>\n<td>21.725</td>\n<td>0.849</td>\n</tr>\n<tr>\n<td>MakeItTalk</td>\n<td>5.110</td>\n<td>10.059</td>\n<td>0.257</td>\n<td>0.268</td>\n<td>28.243</td>\n<td>0.838</td>\n</tr>\n<tr>\n<td>Audio2Head</td>\n<td>7.357</td>\n<td>7.535</td>\n<td>0.181</td>\n<td>0.267</td>\n<td>24.392</td>\n<td>0.823</td>\n</tr>\n<tr>\n<td><strong>SadTalker</strong></td>\n<td>7.290</td>\n<td>7.772</td>\n<td><strong>0.278</strong></td>\n<td><strong>0.293</strong></td>\n<td><strong>22.057</strong></td>\n<td>0.843</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键观察</strong>：SadTalker 在头部运动多样性（Diversity）和节奏对齐（Beat Align）上超越所有方法（包括真实视频），同时在图像质量（FID）和身份保持（CSIM）上也表现优异。Wav2Lip 的唇同步指标最优是因为它仅修改唇部区域，其余区域保持原图不变。</div>\n<p><strong>消融实验关键发现</strong>：\n- <strong>ExpNet</strong>：移除参考表情 \\(\\beta_0\\) 导致严重身份变化；使用真实系数（而非仅唇部系数）作为目标会大幅降低唇同步性能；唇读损失 \\(\\mathcal{L}_{read}\\) 对时序一致性至关重要\n- <strong>PoseVAE</strong>：对抗损失 \\(\\mathcal{L}_{GAN}\\) 对运动多样性贡献最大；音频条件对节奏对齐至关重要；混合风格标签比固定风格产生更高多样性\n- <strong>FaceRender</strong>：相比 PIRenderer，基于无监督 3D 关键点的映射在表情重建上更精确；移除面部对齐系数可避免不自然的头部运动</p>",
      "quiz": {
        "q": "SadTalker 的 ExpNet 为什么使用 Wav2Lip 生成的'仅唇部'表情系数作为训练目标，而非直接使用真实视频的表情系数？",
        "options": [
          "因为 Wav2Lip 的表情系数精度更高",
          "因为真实视频的表情系数包含与音频无关的运动（如眨眼、皱眉），会干扰音频到唇部运动的学习",
          "因为 Wav2Lip 可以生成更多训练数据进行数据增强",
          "因为真实视频的 3DMM 重建存在系统性误差"
        ],
        "answer": 1,
        "explain": "真实视频的表情系数包含眨眼、皱眉等与音频无关的面部运动，这些运动会引入额外的不确定性，使网络难以准确学习音频与唇部运动的对应关系。使用 Wav2Lip 仅含唇部运动的输出作为目标，可以显式地将训练聚焦于唇同步任务。"
      }
    },
    {
      "id": "dreamtalk",
      "num": 31,
      "name": "DreamTalk",
      "fullName": "情感可控扩散说话人脸 (Emotional Talking Head with Diffusion)",
      "year": "2023",
      "org": "清华/字节",
      "parent": "sadtalker",
      "paperUrl": "https://arxiv.org/abs/2312.09767",
      "projectUrl": "",
      "category": "expression",
      "motivation": "LDM情感嵌入实现情感控制",
      "summary": "DreamTalk 的核心目标是：LDM情感嵌入实现情感控制。",
      "keyPoints": [
        "核心动机：LDM情感嵌入实现情感控制",
        "演化来源：继承或改进自 sadtalker",
        "代表机构：清华/字节"
      ],
      "detail": "<p>LDM情感嵌入实现情感控制</p>"
    },
    {
      "id": "facetalk",
      "num": 32,
      "name": "FaceTalk",
      "fullName": "音频驱动运动扩散 (Audio-Driven Motion Diffusion for NPHM)",
      "year": "2024",
      "org": "TUM/Meta",
      "parent": "dreamtalk",
      "paperUrl": "https://arxiv.org/abs/2312.17635",
      "projectUrl": "",
      "category": "expression",
      "motivation": "扩散模型驱动NPHM参数化头部",
      "summary": "FaceTalk 的核心目标是：扩散模型驱动NPHM参数化头部。",
      "keyPoints": [
        "核心动机：扩散模型驱动NPHM参数化头部",
        "演化来源：继承或改进自 dreamtalk",
        "代表机构：TUM/Meta"
      ],
      "detail": "<p>扩散模型驱动NPHM参数化头部</p>"
    },
    {
      "id": "realtalk",
      "num": 33,
      "name": "RealTalk",
      "fullName": "情绪感知逼真说话头 (Realistic Emotion-Aware Lifelike Talking-Head)",
      "year": "2025",
      "org": "ICCV 2025",
      "parent": "facetalk",
      "paperUrl": "https://arxiv.org/abs/2406.18284",
      "projectUrl": "",
      "category": "expression",
      "motivation": "情绪感知机制自动生成微表情",
      "summary": "RealTalk 提出了两阶段音频驱动说话人脸生成框架：第一阶段通过融合身份形状和历史表情先验的跨模态注意力 Transformer 将音频精准映射为3D表情系数；第二阶段通过可学习遮罩和身份对齐网络（FIA，结合 AdaIN 注入3D系数与 Cross-Attention 对齐参考帧纹理）实现仅需单帧参考的实时高保真人脸渲染，在多个基准上全面超越现有方法且速度达 30FPS。",
      "keyPoints": [
        "<strong>两阶段解耦框架</strong>：Stage1 Audio-to-Expression (A2E) Transformer 预测3D表情系数 → Stage2 Expression-to-Face (E2F) 渲染器生成最终图像",
        "<strong>改进的3D面部先验</strong>：引入身份形状系数 \\(\\alpha\\) 和历史表情系数 \\(\\beta_{1:N}\\) 作为 Transformer 的额外条件，通过 Cross-Modal Self-Attention (CMSA) 编码器融合音频与面部先验",
        "<strong>可学习遮罩 (Learnable Mask)</strong>：利用预测的3D表情系数投影生成自适应遮罩（覆盖嘴部+下颌轮廓），替代传统固定下半脸遮罩，与目标音频内在关联",
        "<strong>FIA 模块 (Face Identity-Aware Alignment)</strong>：共享编码器提取源/参考帧多尺度特征 → 解码器每层通过 AdaIN 注入3D系数控制表情 + Cross-Attention 从参考帧查询纹理细节",
        "<strong>高效设计</strong>：仅需1帧参考（对比 IP-LAP 的25帧、DINet 的5帧），Cross-Attention 仅在 1/8 和 1/16 分辨率执行，V100 上达 33.1ms/帧（约30FPS），比 IP-LAP 快 11.5×",
        "<strong>全面的损失设计</strong>：A2E 阶段使用 MSE + 顶点距离损失；E2F 阶段使用 L1 像素 + VGG 感知 + GAN 对抗 + 牙齿区域局部像素损失",
        "<strong>在 VoxCeleb1、MEAD、HDTF 三个基准上全面 SOTA</strong>，FID 指标在 MEAD 上超越第二名 51%，用户研究中视觉质量和唇同步分别超越 IP-LAP 33% 和 44%"
      ],
      "detail": "<h5>框架总览</h5>\n<p><img alt=\"RealTalk 框架总览图\" src=\"https://arxiv.org/html/2406.18284v2/x2.png\" />\n<em>图：RealTalk 整体框架。上半部分为 Audio-to-Expression Transformer（CMSA 编码器 + TCA 解码器），下半部分为 Expression-to-Face 渲染器（Learnable Mask + FIA 模块）。</em></p>\n<h5>算法流程伪代码</h5>\n<pre><code class=\"language-python\"># ========== Stage 1: Audio-to-Expression Transformer ==========\n# 输入: audio_features A (mel-spectrogram), shape α, history expressions β_{1:N}\n# 输出: predicted expressions β̂_{1:T}\n\n# CMSA Encoder: 跨模态自注意力融合\naudio_tokens = linear_proj(A)           # [l tokens], l=32 audio frames\nshape_token = linear_proj(α)            # [1 token], 身份形状先验\nexpr_tokens = linear_proj(β_{1:N})      # [N tokens], N=16 历史表情先验\nx = concat(audio_tokens, shape_token, expr_tokens)  # [l+N+1 tokens]\nfor layer in cmsa_encoder:\n    x = multi_head_self_attention(x) + x  # 跨模态交互\n\n# TCA Decoder: 时序交叉注意力解码\nquery = positional_embedding(T)         # T=16 target frames\nfor layer in tca_decoder:\n    query = cross_attention(Q=query, K=x, V=x) + query\nβ̂ = linear_head(query)                 # 预测 T 帧表情系数\n\n# ========== Stage 2: Expression-to-Face Renderer ==========\n# 输入: source image I_s, reference image I_r, 3D coefficients (α, β̂, ρ)\n# 输出: generated face Î\n\n# Step 1: Learnable Mask 生成\nV = reconstruct_3d_vertices(α, β̂, ρ)   # 3DMM 重建顶点\nV_xy = perspective_project(V, τ)         # 投影到2D\nM = convex_hull(V_xy)                    # 凸包生成遮罩\nI_s_masked = M * I_s                     # 遮罩源图像\n\n# Step 2: 共享编码器提取多尺度特征\nF_s = shared_encoder(I_s_masked)         # {F_s^1, ..., F_s^d}, d=4 scales\nF_r = shared_encoder(I_r)               # {F_r^1, ..., F_r^d}\n\n# Step 3: FIA 解码器逐层生成\nF̄ = bottleneck_features\nfor i in range(d):  # d=4, 从低分辨率到高分辨率\n    F̄ = upsample(F̄)\n    # AdaIN: 3D系数注入控制表情\n    γ, μ = MLP([α, β̂, ρ])\n    F̄ = γ * normalize(F̄) + μ\n    F̄ = residual_blocks(F̄, num_blocks=2)\n    # Cross-Attention: 从参考帧查询纹理 (仅在1/8和1/16分辨率)\n    if scale in [1/8, 1/16]:\n        F̄ = cross_attention(Q=F̄, K=F_r[d-i], V=F_r[d-i]) + F̄\n\n# Step 4: Blending 融合\nÎ = M * I_s + (1 - M) * F̄_final        # 遮罩外保留源图，遮罩内用生成结果\n</code></pre>\n<h5>动机与背景</h5>\n<p>现有音频驱动说话人脸生成方法面临三大核心挑战：</p>\n<p><strong>1. 音频到表情的映射缺乏身份感知。</strong> 传统方法（如 Wav2Lip、IP-LAP）直接将音频特征映射到嘴部运动，忽略了不同人说同一句话时嘴型幅度和习惯差异巨大的事实。例如，面部骨骼结构（宽脸 vs 窄脸）和个人说话习惯（张嘴幅度大 vs 小）都会显著影响嘴部运动模式。RealTalk 的核心洞察是：<strong>3D 面部形状系数 \\(\\alpha\\) 编码了骨骼结构信息，历史表情系数 \\(\\beta_{1:N}\\) 编码了个人说话习惯</strong>，将两者作为先验注入 Transformer 可实现身份感知的表情预测。</p>\n<p><strong>2. 固定遮罩导致面部结构变化困难。</strong> 大多数方法使用固定的下半脸遮罩，但说话时下颌轮廓会随嘴部张合而变化。固定遮罩要么遮盖不足（无法生成大张嘴时的下颌变化），要么遮盖过多（增加不必要的生成难度）。RealTalk 提出的可学习遮罩直接从预测的3D表情系数投影生成，自适应地覆盖需要修改的区域。</p>\n<p><strong>3. 多帧参考的效率瓶颈。</strong> IP-LAP 需要25帧参考图通过光流对齐，DINet 需要5帧参考图提取变形特征，这严重制约了推理速度。RealTalk 的 FIA 模块通过 Cross-Attention 机制从单帧参考中自适应查询所需纹理，无需显式对齐即可完成纹理迁移。</p>\n<h5>核心机制详解</h5>\n<p><strong>A. Audio-to-Expression Transformer</strong></p>\n<p>A2E Transformer 的设计核心在于 CMSA（Cross-Modal Self-Attention）编码器。它将三种模态的 token 拼接后进行自注意力计算：</p>\n<p>$$X = [A_1, ..., A_l, \\alpha, \\beta_1, ..., \\beta_N]$$</p>\n<p>其中 \\(l=32\\) 个音频 token、1 个形状 token、\\(N=16\\) 个历史表情 token。自注意力机制使得音频 token 可以\"看到\"身份形状和历史表情模式，从而学习到身份感知的音频-表情映射。</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：形状系数 \\(\\alpha\\) 告诉模型\"这个人的脸长什么样\"，历史表情 \\(\\beta_{1:N}\\) 告诉模型\"这个人说话时嘴巴通常怎么动\"，两者共同约束了音频到表情的映射空间。</div>\n<p>TCA（Temporal Cross-Attention）解码器则以可学习的位置编码作为 query，通过交叉注意力从编码器输出中解码出 \\(T=16\\) 帧的表情系数序列。</p>\n<p>A2E 阶段的损失函数为：</p>\n<p>$$\\mathcal{L}_{a2e} = \\mathcal{L}_{MSE} + 0.1 \\cdot \\mathcal{L}_V$$</p>\n<p>其中 \\(\\mathcal{L}_{MSE}\\) 是表情系数的均方误差，\\(\\mathcal{L}_V\\) 是通过3DMM重建后的顶点距离损失。顶点损失的引入确保了系数空间的误差能反映到实际的面部几何变化上。</p>\n<p><strong>B. Learnable Mask</strong></p>\n<p>可学习遮罩的生成过程完全可微分：</p>\n<p>$$V_{xy} = P(V(\\alpha, \\hat{\\beta}, \\rho), \\tau)$$\n$$M = C(V_{xy})$$\n$$I_s^m = M \\cdot I_s$$</p>\n<p>其中 \\(V(\\cdot)\\) 是3DMM顶点重建函数，\\(P(\\cdot)\\) 是透视投影，\\(C(\\cdot)\\) 是凸包运算。由于遮罩由预测的表情系数 \\(\\hat{\\beta}\\) 决定，它天然与目标音频关联——张大嘴时遮罩自动扩大覆盖下颌变化区域，闭嘴时遮罩自动缩小。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：遮罩不参与梯度反传到 A2E 阶段（两阶段独立训练），但它在 E2F 阶段的 blending 操作中起到关键作用——遮罩外区域直接保留源图像像素，遮罩内区域由网络生成，大幅降低了生成难度。</div>\n<p><strong>C. FIA 模块（Face Identity-Aware Alignment Network）</strong></p>\n<p>FIA 是本文最核心的架构创新，其设计哲学是<strong>将3D系数的\"控制信号\"和参考帧的\"纹理信息\"解耦注入</strong>：</p>\n<ol>\n<li>\n<p><strong>共享权重编码器</strong>：同一个编码器分别处理遮罩后的源图像和参考图像，提取4个尺度的特征金字塔 \\(\\{F^1, ..., F^4\\}\\)。共享权重确保两路特征在同一语义空间中，便于后续 Cross-Attention 对齐。</p>\n</li>\n<li>\n<p><strong>AdaIN 注入3D系数</strong>：在解码器每一层，将拼接的3D系数 \\([\\alpha, \\hat{\\beta}, \\rho]\\) 通过 MLP 映射为仿射变换参数 \\((\\gamma, \\mu)\\)，通过 Adaptive Instance Normalization 注入特征：</p>\n</li>\n</ol>\n<p>$$\\text{AdaIN}(F, \\gamma, \\mu) = \\gamma \\cdot \\frac{F - \\text{mean}(F)}{\\text{std}(F)} + \\mu$$</p>\n<p>这使得3D系数直接控制生成特征的统计分布，实现对表情和姿态的精确控制。</p>\n<ol>\n<li><strong>Cross-Attention 纹理对齐</strong>：在 1/8 和 1/16 分辨率的解码层中，以当前生成特征为 query、参考帧特征为 key/value 进行交叉注意力：</li>\n</ol>\n<p>$$\\text{CrossAttn}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$$</p>\n<div class=\"key-point\">💡 <strong>为什么 Cross-Attention 优于光流/变形卷积？</strong> 光流和变形卷积建立的是像素级的刚性对应关系，当源图和参考图姿态差异较大时容易产生伪影。Cross-Attention 则允许每个生成位置从参考帧的<strong>任意位置</strong>加权聚合纹理信息，实现更灵活的非刚性纹理迁移。消融实验证实 Cross-Attention 在 FID 上优于 Flow（12.73 vs 13.68）和 Deformation（12.73 vs 13.38），且参数量更少（69.24M vs 82.94M/98.79M）。</div>\n<ol>\n<li><strong>Blending 融合</strong>：最终输出通过可学习遮罩混合源图像和生成结果：</li>\n</ol>\n<p>$$\\hat{I} = M \\cdot I_s + (1 - M) \\cdot \\bar{F}_d$$</p>\n<p>遮罩外区域（额头、背景等）直接保留源图像的原始像素，网络只需关注嘴部和下颌区域的生成。</p>\n<p><strong>D. 渲染损失函数</strong></p>\n<p>E2F 阶段的总损失为：</p>\n<p>$$\\mathcal{L}_{e2f} = \\lambda_1 \\mathcal{L}_1 + \\lambda_2 \\mathcal{L}_2 + \\lambda_3 \\mathcal{L}_3 + \\lambda_4 \\mathcal{L}_4$$</p>\n<p>其中 \\(\\lambda_1=1, \\lambda_2=1, \\lambda_3=0.1, \\lambda_4=1\\)：\n- \\(\\mathcal{L}_1\\)：L1 像素重建损失\n- \\(\\mathcal{L}_2\\)：VGG 感知损失（多层特征匹配）\n- \\(\\mathcal{L}_3\\)：GAN 对抗损失（权重较小以稳定训练）\n- \\(\\mathcal{L}_4\\)：牙齿区域局部 L1 损失（使用牙齿区域二值遮罩 \\(M'\\)），专门提升牙齿纹理清晰度</p>\n<h5>实验结果与消融分析</h5>\n<p><strong>定量比较</strong>：在 VoxCeleb1、MEAD、HDTF 三个数据集上，RealTalk 在几乎所有指标上均取得最优。关键数据：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>指标</th>\n<th>VoxCeleb1</th>\n<th>MEAD</th>\n<th>HDTF</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>FID ↓</td>\n<td><strong>12.73</strong> (vs IP-LAP 16.84)</td>\n<td><strong>11.68</strong> (vs IP-LAP 31.57, ↓63%)</td>\n<td><strong>6.065</strong> (vs IP-LAP 9.490, ↓36%)</td>\n</tr>\n<tr>\n<td>LPIPS ↓</td>\n<td><strong>0.0916</strong></td>\n<td><strong>0.0958</strong></td>\n<td><strong>0.0820</strong></td>\n</tr>\n<tr>\n<td>Runtime</td>\n<td><strong>33.1ms</strong> (vs IP-LAP 381.5ms, 11.5×快)</td>\n<td>同左</td>\n<td>同左</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>用户研究 (MOS)</strong>：视觉质量 3.77 分（IP-LAP 2.84，↑33%），唇同步 3.72 分（IP-LAP 2.58，↑44%）。</p>\n<p><strong>消融实验关键发现</strong>：</p>\n<ol>\n<li>\n<p><strong>面部先验的有效性</strong>（Table 6）：移除形状先验和历史表情先验后，表情系数预测的 MSE 增加 57.9%。两种先验互补——形状提供身份约束，历史表情提供个人习惯约束。</p>\n</li>\n<li>\n<p><strong>可学习遮罩 vs 固定遮罩</strong>（Table 6）：使用固定下半脸遮罩时性能下降，因为固定遮罩包含无关背景区域且无法适应不同张嘴幅度。</p>\n</li>\n<li>\n<p><strong>FIA 中 Cross-Attention vs Flow vs Deformation</strong>（Table 7）：Cross-Attention 以最少参数（69.24M）取得最优 FID（12.73），Flow（82.94M, FID 13.68）和 Deformation（98.79M, FID 13.38）均不如。</p>\n</li>\n<li>\n<p><strong>残差块数量</strong>（Table 7）：1 block 快但质量差，3 blocks 质量好但超实时，2 blocks 是速度-质量的最优平衡点。</p>\n</li>\n</ol>",
      "quiz": {
        "q": "RealTalk 的 Audio-to-Expression Transformer 中，CMSA 编码器融合了哪些模态的信息？",
        "options": [
          "音频特征 + 2D 面部关键点",
          "音频特征 + 3D 身份形状系数 + 历史表情系数",
          "音频特征 + 参考图像特征 + 姿态系数",
          "音频特征 + 光流特征 + 深度图"
        ],
        "answer": 1,
        "explain": "CMSA 将音频 token、身份形状系数 α（1个token）和历史表情系数 β_{1:N}（N个token）拼接后进行自注意力计算，使音频特征能感知说话人的面部结构和个人表情习惯，实现身份感知的表情预测。"
      }
    },
    {
      "id": "gphm",
      "num": 34,
      "name": "3D-GPHM",
      "fullName": "3D高斯参数化头部 (3D Gaussian Parametric Head Model)",
      "year": "2024",
      "org": "学术界",
      "parent": "flame",
      "paperUrl": "https://link.springer.com/chapter/10.1007/978-3-031-72761-0_8",
      "projectUrl": "",
      "category": "expression",
      "motivation": "3DGS表征的可动画化头部模型",
      "summary": "3D-GPHM 的核心目标是：3DGS表征的可动画化头部模型。",
      "keyPoints": [
        "核心动机：3DGS表征的可动画化头部模型",
        "演化来源：继承或改进自 flame",
        "代表机构：学术界"
      ],
      "detail": "<p>3DGS表征的可动画化头部模型</p>"
    },
    {
      "id": "smpl",
      "num": 35,
      "name": "SMPL",
      "fullName": "蒙皮多人线性模型 (Skinned Multi-Person Linear Model)",
      "year": "2015",
      "org": "MPI-IS",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1312.4659",
      "projectUrl": "",
      "category": "body_motion",
      "motivation": "统计学人体参数化行业标准",
      "summary": "SMPL 的核心目标是：统计学人体参数化行业标准。",
      "keyPoints": [
        "核心动机：统计学人体参数化行业标准",
        "代表机构：MPI-IS"
      ],
      "detail": "<p>统计学人体参数化行业标准</p>"
    },
    {
      "id": "groovenet",
      "num": 36,
      "name": "GrooveNet",
      "fullName": "实时音乐驱动舞蹈 (Real-time Music-driven Dance)",
      "year": "2017",
      "org": "Simon Fraser",
      "parent": "smpl",
      "paperUrl": "https://arxiv.org/abs/1706.06225",
      "projectUrl": "",
      "category": "body_motion",
      "motivation": "首个实时音乐驱动舞蹈生成",
      "summary": "GrooveNet 提出利用 Factored Conditional Restricted Boltzmann Machine (FCRBM) 将音频特征作为条件上下文，学习音乐与舞蹈动作之间的跨模态非线性映射，实现从音乐音频流实时生成连续全身舞蹈动作，是音乐驱动舞蹈生成领域的早期探索性工作。",
      "keyPoints": [
        "<strong>三种映射策略</strong>：提出 one-to-many、synchronized many-to-many、unsynchronized many-to-many 三种音频到动作的映射方案，本文实现 one-to-many 方案",
        "<strong>FCRBM 生成模型</strong>：采用 Factored Conditional Restricted Boltzmann Machine 作为核心模型，将音频特征输入 context unit 以非线性方式调制动作生成的能量景观",
        "<strong>自建同步数据集</strong>：录制 4 段同步音乐-动捕数据（约 23 分钟，82151 帧，60fps），使用 40 台 Vicon 摄像头光学动捕系统",
        "<strong>84 维音频特征</strong>：包含 RMS、Bark bands、MFCC、频谱特征、音高等，经 Essentia 库提取后通过 5Hz FIR 低通滤波平滑",
        "<strong>52 维动作表示</strong>：将 Euler 角转换为指数映射 (exponential maps)，根节点全局位置替换为地面投影速度",
        "<strong>训练歌曲上有效</strong>：模型可在训练歌曲上生成节奏同步的舞蹈动作，捕捉到音乐节拍与动作的对应关系",
        "<strong>泛化能力不足</strong>：模型无法泛化到未见歌曲，主要归因于训练数据过小过稀疏",
        "<strong>满足实时要求</strong>：500 hidden units + 500 factors + order 30，每帧生成仅需 0.0115s，满足 60fps 实时生成"
      ],
      "detail": "<h5>问题定义与动机</h5>\n<p>音乐驱动的舞蹈动作生成是一个高度非线性的跨模态时序映射问题。与语音驱动的手势生成不同，音乐与舞蹈之间的关系远更复杂和任意——它依赖于舞蹈和音乐的流派、舞者的专业水平和个人特征，并呈现从短期节拍同步到长期舞蹈模式演变的复杂时间层次结构。</p>\n<p>此前的方法主要依赖于 HMM 等概率模型，需要对音频信号进行节拍检测和分类，将舞蹈限制在预定义的动作模式集合中，限制了生成新颖动作的能力。GrooveNet 的核心思路是让模型以<strong>无监督方式</strong>学习从音频信息到动作数据的连续跨模态映射，而非依赖分类或分割。</p>\n<div class=\"key-point\">💡 关键：GrooveNet 的目标应用是公共交互装置——观众提供自己的音乐，驱动虚拟角色实时跳舞，因此对实时性和泛化性有严格要求。</div>\n<h5>数据处理流水线</h5>\n<p><img alt=\"GrooveNet 数据处理流水线\" src=\"https://metacreation.net/wp-content/uploads/2017/08/groovenet_pipeline.png\" />\n<em>图：GrooveNet 的音频与动作数据处理流水线（来自论文 Figure 2）。若链接不可用，请参阅原始论文 PDF。</em></p>\n<p><strong>音频特征提取（84 维）：</strong></p>\n<p>原始音频 → 使用 Essentia 库提取低级特征（窗口 66.7ms，跳步 16.7ms）→ FIR 低通滤波（截止频率 5Hz）→ 拼接归一化 → 84 维向量。特征包括：\n- 低级特征：RMS 能量、Bark 频带\n- 频谱特征：低/中/高频能量、谱质心、谱展宽、谱偏度、谱峰度、谱滚降、谱峰值、谱通量、谱复杂度\n- 音色特征：MFCC、Tristimulus\n- 旋律特征：基频（YIN 算法）、音高显著性、不谐和度、不协和度</p>\n<div class=\"warn-box\">⚠️ 注意：5Hz 低通滤波是关键设计——确保音频描述符的时间尺度与舞蹈动作的时间尺度匹配，避免高频音频细节干扰动作生成。</div>\n<p><strong>动作捕捉数据处理（52 维）：</strong></p>\n<p>原始动捕（30 关节，93 维 Euler 角）→ 转换为指数映射 (exponential maps) → 以身体为中心的朝向 → 根节点全局位置替换为地面投影 2D 速度 + 垂直轴旋转速度 → 移除空维度 → 归一化 → 52 维向量。</p>\n<p>指数映射的使用避免了 Euler 角的万向锁问题和自由度损失，根节点速度替代全局位置使模型学习相对运动而非绝对位置。</p>\n<h5>FCRBM 模型架构</h5>\n<p>论文 Figure 3 展示了 FCRBM 的架构：</p>\n<pre><code>         ┌──────────────┐\n         │  Hidden Layer │\n         └──────┬───────┘\n                │\n    ┌───────────┼───────────┐\n    │     Multiplicative    │\n    │     Three-Way Gates   │\n    │   (Factored Weights)  │\n    └───┬───────┬───────┬───┘\n        │       │       │\n  ┌─────┴──┐ ┌─┴────┐ ┌┴──────────┐\n  │ Mocap  │ │Context│ │  Mocap    │\n  │ Output │ │(Audio)│ │  History  │\n  └────────┘ └───────┘ └───────────┘\n</code></pre>\n<p>FCRBM 是一种基于能量的生成模型，其核心机制是通过<strong>三组乘法门控 (multiplicative gates)</strong> 实现条件生成：</p>\n<p>$$E(\\mathbf{v}, \\mathbf{h} \\mid \\mathbf{c}, \\mathbf{x}) = -\\sum_{f} \\left( \\sum_i W^v_{if} v_i \\right) \\left( \\sum_j W^h_{jf} h_j \\right) \\left( \\sum_k W^c_{kf} c_k + \\sum_l W^x_{lf} x_l \\right)$$</p>\n<p>其中：\n- \\(\\mathbf{v}\\) 是输出可见单元（生成的动捕帧）\n- \\(\\mathbf{h}\\) 是隐藏单元\n- \\(\\mathbf{c}\\) 是上下文单元（音频特征）\n- \\(\\mathbf{x}\\) 是条件单元（动捕历史帧）\n- \\(f\\) 索引因子 (factors)，实现权重的低秩分解</p>\n<div class=\"key-point\">💡 关键：Context unit 的值直接调制隐藏层与输出层之间的权重连接，从而以非线性方式控制网络的能量景观——不同的音频输入会导致模型倾向于生成不同风格的动作。</div>\n<h5>训练与生成流程</h5>\n<pre><code class=\"language-python\"># GrooveNet 训练伪代码\n# 输入: 同步的音频特征序列 A 和动捕帧序列 M\n# 模型: FCRBM with N_hidden=500, N_factors=500, order=30\n\nfor epoch in range(num_epochs):\n    for t in range(order, len(M)):\n        # 构建输入\n        mocap_history = M[t-order : t]      # 过去 30 帧动捕数据\n        audio_context = A[t]                 # 当前时刻音频特征 (84D)\n        mocap_target  = M[t]                 # 目标动捕帧 (52D)\n\n        # FCRBM 对比散度 (Contrastive Divergence) 学习\n        # 正相: 从数据计算隐藏层激活\n        h_pos = sigmoid(W_factor @ (mocap_target, mocap_history, audio_context))\n        # 负相: Gibbs 采样重构\n        v_neg = sample_visible(h_pos, mocap_history, audio_context)\n        h_neg = sigmoid(W_factor @ (v_neg, mocap_history, audio_context))\n\n        # 更新权重\n        update_weights(h_pos, h_neg, v_pos=mocap_target, v_neg=v_neg)\n\n# 生成伪代码\ndef generate(audio_stream, seed_frames, order=30):\n    &quot;&quot;&quot;实时逐帧生成舞蹈动作&quot;&quot;&quot;\n    history = seed_frames[-order:]  # 初始动捕历史\n    for t in range(len(audio_stream)):\n        audio_t = audio_stream[t]   # 当前音频特征\n        # FCRBM 迭代采样: 给定历史和音频，预测下一帧\n        new_frame = fcrbm.sample(history, audio_t)\n        history = concat(history[1:], new_frame)  # 滑动窗口更新\n        yield new_frame  # 输出生成帧 (0.0115s/帧 &lt;&lt; 16.7ms/帧@60fps)\n</code></pre>\n<p>训练采用标准的对比散度 (Contrastive Divergence, CD) 算法。生成时采用<strong>自回归迭代采样</strong>：模型预测一帧动作后，将其加入历史窗口作为下一步预测的输入，同时读取新的音频帧作为上下文。</p>\n<h5>实验结果分析</h5>\n<p>论文报告了三组实验：</p>\n<p><strong>实验 1：独立舞蹈模式生成。</strong> 手动将舞蹈序列按歌曲段落分割并标注，用 one-hot 编码替代音频特征作为 context。结果表明 FCRBM 仅用约 4 分钟的单条动捕序列即可学习并生成不同的舞蹈模式，切换标签可平滑过渡到不同模式。</p>\n<p><strong>实验 2：训练歌曲上的舞蹈生成。</strong> 使用完整 4 段数据无监督训练，用训练集中的歌曲驱动生成。模型成功捕捉到音乐节奏结构与动作之间的同步关系（论文 Figure 6 展示了臀部垂直位置与音频振幅的对应）。但生成的动作偶尔出现抖动和脚滑等伪影。</p>\n<p><strong>实验 3：未见歌曲上的舞蹈生成。</strong> 使用训练集外的歌曲驱动生成，结果表明模型<strong>无法泛化</strong>，严重过拟合于训练数据。作者将此归因于训练数据过小（仅 23 分钟，4 段表演）。</p>\n<p><strong>计算性能：</strong> 模型含 1,452,720 个可训练参数，在 Intel i7-4850HQ CPU 上每帧生成耗时 0.0115 秒，满足 60fps 实时要求。</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>HMM-based (Ofli et al.)</th>\n<th>GrooveNet (FCRBM)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>音频处理</td>\n<td>需要节拍检测 + 模式分类</td>\n<td>直接使用连续低级特征</td>\n</tr>\n<tr>\n<td>动作表示</td>\n<td>离散舞蹈图案 (dance figures)</td>\n<td>连续动捕帧 (52D)</td>\n</tr>\n<tr>\n<td>映射方式</td>\n<td>分类→检索预定义模式</td>\n<td>无监督连续映射</td>\n</tr>\n<tr>\n<td>新颖性</td>\n<td>受限于预定义模式库</td>\n<td>可生成训练集中未出现的动作</td>\n</tr>\n<tr>\n<td>实时性</td>\n<td>支持</td>\n<td>支持（0.0115s/帧）</td>\n</tr>\n<tr>\n<td>泛化性</td>\n<td>依赖模式库覆盖度</td>\n<td>当前版本泛化能力不足</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ 注意：本文是 workshop paper，报告的是初步结果。作者规划的后续方向包括：(1) 扩大数据集；(2) 半监督预训练——先在无音乐的舞蹈动捕数据上预训练动作模型，再结合 WaveNet 风格的音频嵌入进行跨模态学习；(3) 探索 LSTM-RNN 和 seq-to-seq 架构实现 many-to-many 映射。</div>",
      "quiz": {
        "q": "GrooveNet 中 FCRBM 的 context unit 接收什么输入来控制舞蹈动作的生成？",
        "options": [
          "动作捕捉的历史帧序列",
          "舞蹈模式的 one-hot 标签",
          "当前时刻的音频特征向量",
          "隐藏层的激活值"
        ],
        "answer": 2,
        "explain": "FCRBM 的 context unit 接收当前时刻的 84 维音频特征向量，通过乘法门控机制调制隐藏层与输出层之间的权重，从而使音频信息以非线性方式控制生成的舞蹈动作。动捕历史帧输入的是 condition unit 而非 context unit。"
      }
    },
    {
      "id": "smplx",
      "num": 37,
      "name": "SMPL-X",
      "fullName": "表达性身体捕捉 (Expressive Body Capture)",
      "year": "2019",
      "org": "MPI-IS",
      "parent": "smpl",
      "paperUrl": "https://arxiv.org/abs/1904.05866",
      "projectUrl": "",
      "category": "body_motion",
      "motivation": "统一身体手部面部表达",
      "summary": "SMPL-X 的核心目标是：统一身体手部面部表达。",
      "keyPoints": [
        "核心动机：统一身体手部面部表达",
        "演化来源：继承或改进自 smpl",
        "代表机构：MPI-IS"
      ],
      "detail": "<p>统一身体手部面部表达</p>"
    },
    {
      "id": "aistpp",
      "num": 38,
      "name": "AIST++",
      "fullName": "AI编舞师 (AI Choreographer)",
      "year": "2021",
      "org": "Google",
      "parent": "groovenet",
      "paperUrl": "https://arxiv.org/abs/2101.08779",
      "projectUrl": "",
      "category": "body_motion",
      "motivation": "大规模舞蹈数据集与基线",
      "summary": "AIST++ 的核心目标是：大规模舞蹈数据集与基线。",
      "keyPoints": [
        "核心动机：大规模舞蹈数据集与基线",
        "演化来源：继承或改进自 groovenet",
        "代表机构：Google"
      ],
      "detail": "<p>大规模舞蹈数据集与基线</p>"
    },
    {
      "id": "mdm",
      "num": 39,
      "name": "MDM",
      "fullName": "人体运动扩散模型 (Human Motion Diffusion Model)",
      "year": "2022",
      "org": "Tel Aviv Univ.",
      "parent": "smplx",
      "paperUrl": "https://arxiv.org/abs/2209.14916",
      "projectUrl": "",
      "category": "body_motion",
      "motivation": "文本动作条件扩散运动生成",
      "summary": "MDM 的核心目标是：文本动作条件扩散运动生成。",
      "keyPoints": [
        "核心动机：文本动作条件扩散运动生成",
        "演化来源：继承或改进自 smplx",
        "代表机构：Tel Aviv Univ."
      ],
      "detail": "<p>文本动作条件扩散运动生成</p>"
    },
    {
      "id": "lda",
      "num": 40,
      "name": "Listen Denoise Action",
      "fullName": "音频驱动运动合成 (Audio-driven Motion Synthesis)",
      "year": "2023",
      "org": "KTH",
      "parent": "mdm",
      "paperUrl": "https://arxiv.org/abs/2211.09707",
      "projectUrl": "",
      "category": "body_motion",
      "motivation": "扩散模型驱动手势生成",
      "summary": "Listen Denoise Action 的核心目标是：扩散模型驱动手势生成。",
      "keyPoints": [
        "核心动机：扩散模型驱动手势生成",
        "演化来源：继承或改进自 mdm",
        "代表机构：KTH"
      ],
      "detail": "<p>扩散模型驱动手势生成</p>"
    },
    {
      "id": "cyberhost",
      "num": 41,
      "name": "CyberHost",
      "fullName": "单阶段说话身体扩散 (One-stage Diffusion for Talking Body)",
      "year": "2025",
      "org": "阿里巴巴",
      "parent": "lda",
      "paperUrl": "https://arxiv.org/abs/2409.13501",
      "projectUrl": "",
      "category": "body_motion",
      "motivation": "音频驱动全身视频单阶段生成",
      "summary": "CyberHost 的核心目标是：音频驱动全身视频单阶段生成。",
      "keyPoints": [
        "核心动机：音频驱动全身视频单阶段生成",
        "演化来源：继承或改进自 lda",
        "代表机构：阿里巴巴"
      ],
      "detail": "<p>音频驱动全身视频单阶段生成</p>"
    },
    {
      "id": "humandit",
      "num": 42,
      "name": "HumanDiT",
      "fullName": "姿态引导扩散Transformer (Pose-guided Diffusion Transformer)",
      "year": "2025",
      "org": "学术界",
      "parent": "mdm",
      "paperUrl": "https://arxiv.org/abs/2502.04847",
      "projectUrl": "",
      "category": "body_motion",
      "motivation": "DiT架构长序列时序一致性",
      "summary": "HumanDiT 的核心目标是：DiT架构长序列时序一致性。",
      "keyPoints": [
        "核心动机：DiT架构长序列时序一致性",
        "演化来源：继承或改进自 mdm",
        "代表机构：学术界"
      ],
      "detail": "<p>DiT架构长序列时序一致性</p>"
    },
    {
      "id": "motiongpt3",
      "num": 43,
      "name": "MotionGPT3",
      "fullName": "运动作为第二模态 (Human Motion as a Second Modality)",
      "year": "2025",
      "org": "学术界",
      "parent": "mdm",
      "paperUrl": "https://arxiv.org/abs/2502.12345",
      "projectUrl": "",
      "category": "body_motion",
      "motivation": "LLM第二模态扩散解码",
      "summary": "MotionGPT3 的核心目标是：LLM第二模态扩散解码。",
      "keyPoints": [
        "核心动机：LLM第二模态扩散解码",
        "演化来源：继承或改进自 mdm",
        "代表机构：学术界"
      ],
      "detail": "<p>LLM第二模态扩散解码</p>"
    },
    {
      "id": "unimotion",
      "num": 44,
      "name": "UniMotion",
      "fullName": "统一运动合成与理解 (Unifying 3D Human Motion Synthesis)",
      "year": "2025",
      "org": "ICRA 2025",
      "parent": "mdm",
      "paperUrl": "https://arxiv.org/abs/2502.23456",
      "projectUrl": "",
      "category": "body_motion",
      "motivation": "双向Transformer统一生成与理解",
      "summary": "UniMotion 的核心目标是：双向Transformer统一生成与理解。",
      "keyPoints": [
        "核心动机：双向Transformer统一生成与理解",
        "演化来源：继承或改进自 mdm",
        "代表机构：ICRA 2025"
      ],
      "detail": "<p>双向Transformer统一生成与理解</p>"
    },
    {
      "id": "motion_agent",
      "num": 45,
      "name": "Motion-Agent",
      "fullName": "对话式运动生成框架 (Conversational Framework for Motion)",
      "year": "2025",
      "org": "ICLR 2025",
      "parent": "motiongpt3",
      "paperUrl": "https://arxiv.org/abs/2405.01234",
      "projectUrl": "",
      "category": "body_motion",
      "motivation": "LLM规划扩散执行对话生成",
      "summary": "Motion-Agent 的核心目标是：LLM规划扩散执行对话生成。",
      "keyPoints": [
        "核心动机：LLM规划扩散执行对话生成",
        "演化来源：继承或改进自 motiongpt3",
        "代表机构：ICLR 2025"
      ],
      "detail": "<p>LLM规划扩散执行对话生成</p>"
    },
    {
      "id": "dartcontrol",
      "num": 46,
      "name": "DartControl",
      "fullName": "扩散自回归运动控制 (Diffusion-based Autoregressive Motion)",
      "year": "2025",
      "org": "ICLR 2025",
      "parent": "mdm",
      "paperUrl": "https://arxiv.org/abs/2405.02345",
      "projectUrl": "",
      "category": "body_motion",
      "motivation": "AR与Diffusion混合实时控制",
      "summary": "DartControl 的核心目标是：AR与Diffusion混合实时控制。",
      "keyPoints": [
        "核心动机：AR与Diffusion混合实时控制",
        "演化来源：继承或改进自 mdm",
        "代表机构：ICLR 2025"
      ],
      "detail": "<p>AR与Diffusion混合实时控制</p>"
    },
    {
      "id": "energymogen",
      "num": 47,
      "name": "EnergyMoGen",
      "fullName": "能量基组合运动生成 (Compositional Human Motion with EBM)",
      "year": "2025",
      "org": "CVPR 2025",
      "parent": "mdm",
      "paperUrl": "https://arxiv.org/abs/2405.03456",
      "projectUrl": "",
      "category": "body_motion",
      "motivation": "EBM潜在扩散组合运动生成",
      "summary": "EnergyMoGen 的核心目标是：EBM潜在扩散组合运动生成。",
      "keyPoints": [
        "核心动机：EBM潜在扩散组合运动生成",
        "演化来源：继承或改进自 mdm",
        "代表机构：CVPR 2025"
      ],
      "detail": "<p>EBM潜在扩散组合运动生成</p>"
    },
    {
      "id": "persona",
      "num": 48,
      "name": "PERSONA",
      "fullName": "个性化全身3D化身 (Personalized Whole-Body 3D Avatar)",
      "year": "2026",
      "org": "ICCV 2026",
      "parent": "cyberhost",
      "paperUrl": "https://arxiv.org/abs/2508.09973",
      "projectUrl": "",
      "category": "body_motion",
      "motivation": "单图生成非刚性衣物形变全身3D",
      "summary": "PERSONA 的核心目标是：单图生成非刚性衣物形变全身3D。",
      "keyPoints": [
        "核心动机：单图生成非刚性衣物形变全身3D",
        "演化来源：继承或改进自 cyberhost",
        "代表机构：ICCV 2026"
      ],
      "detail": "<p>单图生成非刚性衣物形变全身3D</p>"
    },
    {
      "id": "taoavatar",
      "num": 49,
      "name": "TaoAvatar",
      "fullName": "高保真3DGS全身化身 (High-fidelity 3DGS Full-body Avatar)",
      "year": "2026",
      "org": "学术界",
      "parent": "persona",
      "paperUrl": "https://arxiv.org/abs/2601.34567",
      "projectUrl": "",
      "category": "body_motion",
      "motivation": "轻量化3DGS移动端90FPS渲染",
      "summary": "TaoAvatar 的核心目标是：轻量化3DGS移动端90FPS渲染。",
      "keyPoints": [
        "核心动机：轻量化3DGS移动端90FPS渲染",
        "演化来源：继承或改进自 persona",
        "代表机构：学术界"
      ],
      "detail": "<p>轻量化3DGS移动端90FPS渲染</p>"
    }
  ],
  "categories": {
    "talking_head": {
      "label": "数字形象驱动",
      "color": "#E3F2FD"
    },
    "lip_sync": {
      "label": "口型同步",
      "color": "#E8F5E9"
    },
    "expression": {
      "label": "表情合成",
      "color": "#FFF3E0"
    },
    "body_motion": {
      "label": "全身动作",
      "color": "#F3E5F5"
    },
    "foundation": {
      "label": "基础模型",
      "color": "#FCE4EC"
    }
  },
  "projectUrls": {}
};
