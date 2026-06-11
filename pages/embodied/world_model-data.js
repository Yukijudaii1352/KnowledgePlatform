/**
 * world_model-data.js — 由 pipeline/build.py 于 2026-06-11 12:39:17 自动生成。
 * 源文件：content/embodied/world_model.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "embodied",
    "topic_id": "world_model",
    "topic_name": "世界模型",
    "page_title": "世界模型 算法总结",
    "page_subtitle": "2026-06-11 版",
    "page_desc": "从早期状态空间模型到生成式视频世界模型，涵盖物理世界建模、时空预测与基于模型的规划的完整演化历程。",
    "page_icon": "🌍",
    "hero_pills": [
      "物理仿真",
      "时空预测"
    ],
    "count_pill": "{count} 个算法",
    "image_base": "",
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
        "id": "world_models",
        "x": 2018.03,
        "y": 0,
        "category": "ssm"
      },
      {
        "id": "planet",
        "x": 2019.06,
        "y": 0,
        "category": "ssm"
      },
      {
        "id": "dreamerv1",
        "x": 2019.12,
        "y": 0,
        "category": "ssm"
      },
      {
        "id": "dreamerv2",
        "x": 2020.1,
        "y": 0,
        "category": "ssm"
      },
      {
        "id": "dreamerv3",
        "x": 2023.01,
        "y": 0,
        "category": "ssm"
      },
      {
        "id": "dreamer4",
        "x": 2025.09,
        "y": 0,
        "category": "ssm"
      },
      {
        "id": "jepa",
        "x": 2022.06,
        "y": 1,
        "category": "predictive"
      },
      {
        "id": "ijepa",
        "x": 2023.06,
        "y": 1,
        "category": "predictive"
      },
      {
        "id": "vjepa",
        "x": 2024.04,
        "y": 1,
        "category": "predictive"
      },
      {
        "id": "vjepa2",
        "x": 2025.06,
        "y": 1,
        "category": "predictive"
      },
      {
        "id": "vjepa21",
        "x": 2026.02,
        "y": 1,
        "category": "predictive"
      },
      {
        "id": "videogpt",
        "x": 2021.04,
        "y": 2,
        "category": "generative"
      },
      {
        "id": "teco",
        "x": 2023.07,
        "y": 2,
        "category": "generative"
      },
      {
        "id": "gaia1",
        "x": 2023.1,
        "y": 2,
        "category": "generative"
      },
      {
        "id": "genie",
        "x": 2024.02,
        "y": 2,
        "category": "generative"
      },
      {
        "id": "sora",
        "x": 2024.02,
        "y": 2,
        "category": "generative"
      },
      {
        "id": "genie2",
        "x": 2024.12,
        "y": 2,
        "category": "generative"
      },
      {
        "id": "gaia3",
        "x": 2026.03,
        "y": 2,
        "category": "generative"
      },
      {
        "id": "deltaworld",
        "x": 2026.04,
        "y": 2,
        "category": "generative"
      },
      {
        "id": "worldreel",
        "x": 2026.03,
        "y": 2,
        "category": "generative"
      },
      {
        "id": "occsora",
        "x": 2026.02,
        "y": 2,
        "category": "generative"
      },
      {
        "id": "astra",
        "x": 2026.01,
        "y": 2,
        "category": "generative"
      },
      {
        "id": "interaction_networks",
        "x": 2016.12,
        "y": 3,
        "category": "physics"
      },
      {
        "id": "vin",
        "x": 2017.12,
        "y": 3,
        "category": "physics"
      },
      {
        "id": "hnn",
        "x": 2019.12,
        "y": 3,
        "category": "physics"
      },
      {
        "id": "lnn",
        "x": 2020.03,
        "y": 3,
        "category": "physics"
      },
      {
        "id": "gns",
        "x": 2020.07,
        "y": 3,
        "category": "physics"
      },
      {
        "id": "roboscape",
        "x": 2026.01,
        "y": 3,
        "category": "physics"
      },
      {
        "id": "newton",
        "x": 2026.03,
        "y": 3,
        "category": "physics"
      },
      {
        "id": "mbpo",
        "x": 2019.12,
        "y": 4,
        "category": "planning"
      },
      {
        "id": "simple",
        "x": 2020.04,
        "y": 4,
        "category": "planning"
      },
      {
        "id": "muzero",
        "x": 2020.12,
        "y": 4,
        "category": "planning"
      },
      {
        "id": "tdmpc",
        "x": 2022.06,
        "y": 4,
        "category": "planning"
      },
      {
        "id": "iris",
        "x": 2023.05,
        "y": 4,
        "category": "planning"
      },
      {
        "id": "tdmpc2",
        "x": 2024.05,
        "y": 4,
        "category": "planning"
      },
      {
        "id": "jumpy_wm",
        "x": 2026.02,
        "y": 4,
        "category": "planning"
      },
      {
        "id": "rlvr_world",
        "x": 2026.01,
        "y": 4,
        "category": "planning"
      },
      {
        "id": "unidrive_wm",
        "x": 2026.01,
        "y": 5,
        "category": "embodied"
      },
      {
        "id": "resim",
        "x": 2026.02,
        "y": 5,
        "category": "embodied"
      },
      {
        "id": "navthinker",
        "x": 2026.03,
        "y": 5,
        "category": "embodied"
      },
      {
        "id": "gen1",
        "x": 2026.04,
        "y": 5,
        "category": "embodied"
      },
      {
        "id": "xwam",
        "x": 2026.04,
        "y": 5,
        "category": "embodied"
      },
      {
        "id": "vagen",
        "x": 2026.03,
        "y": 5,
        "category": "embodied"
      },
      {
        "id": "mindjourney",
        "x": 2026.03,
        "y": 5,
        "category": "embodied"
      },
      {
        "id": "chatvla2",
        "x": 2026.03,
        "y": 5,
        "category": "embodied"
      }
    ],
    "edges": [
      {
        "from": "world_models",
        "to": "planet",
        "label": "引入RSSM"
      },
      {
        "from": "planet",
        "to": "dreamerv1",
        "label": "潜在想象"
      },
      {
        "from": "dreamerv1",
        "to": "dreamerv2",
        "label": "离散潜变量"
      },
      {
        "from": "dreamerv2",
        "to": "dreamerv3",
        "label": "跨域通用"
      },
      {
        "from": "dreamerv3",
        "to": "dreamer4",
        "label": "规模扩展"
      },
      {
        "from": "jepa",
        "to": "ijepa",
        "label": "图像掩码"
      },
      {
        "from": "ijepa",
        "to": "vjepa",
        "label": "视频扩展"
      },
      {
        "from": "vjepa",
        "to": "vjepa2",
        "label": "机器人规划"
      },
      {
        "from": "vjepa2",
        "to": "vjepa21",
        "label": "规模提升"
      },
      {
        "from": "videogpt",
        "to": "teco",
        "label": "时空一致"
      },
      {
        "from": "videogpt",
        "to": "gaia1",
        "label": "驾驶场景"
      },
      {
        "from": "videogpt",
        "to": "genie",
        "label": "交互环境"
      },
      {
        "from": "videogpt",
        "to": "sora",
        "label": "物理直觉"
      },
      {
        "from": "genie",
        "to": "genie2",
        "label": "3D实时"
      },
      {
        "from": "gaia1",
        "to": "gaia3",
        "label": "长尾场景"
      },
      {
        "from": "genie2",
        "to": "deltaworld",
        "label": "增量编码"
      },
      {
        "from": "sora",
        "to": "worldreel",
        "label": "几何一致"
      },
      {
        "from": "sora",
        "to": "occsora",
        "label": "占据栅格"
      },
      {
        "from": "sora",
        "to": "astra",
        "label": "自回归去噪"
      },
      {
        "from": "interaction_networks",
        "to": "vin",
        "label": "视觉输入"
      },
      {
        "from": "interaction_networks",
        "to": "hnn",
        "label": "能量守恒"
      },
      {
        "from": "hnn",
        "to": "lnn",
        "label": "约束系统"
      },
      {
        "from": "vin",
        "to": "gns",
        "label": "GNN模拟"
      },
      {
        "from": "gns",
        "to": "roboscape",
        "label": "物理先验"
      },
      {
        "from": "gns",
        "to": "newton",
        "label": "物理引擎"
      },
      {
        "from": "mbpo",
        "to": "simple",
        "label": "样本效率"
      },
      {
        "from": "mbpo",
        "to": "muzero",
        "label": "MCTS搜索"
      },
      {
        "from": "muzero",
        "to": "tdmpc",
        "label": "TD+MPC"
      },
      {
        "from": "muzero",
        "to": "iris",
        "label": "Trans建模"
      },
      {
        "from": "tdmpc",
        "to": "tdmpc2",
        "label": "可扩展性"
      },
      {
        "from": "tdmpc2",
        "to": "jumpy_wm",
        "label": "跳跃动力学"
      },
      {
        "from": "iris",
        "to": "rlvr_world",
        "label": "RL微调"
      },
      {
        "from": "gaia3",
        "to": "unidrive_wm",
        "label": "统一架构"
      },
      {
        "from": "gaia3",
        "to": "resim",
        "label": "闭环仿真"
      },
      {
        "from": "vjepa21",
        "to": "navthinker",
        "label": "社交导航"
      },
      {
        "from": "vjepa21",
        "to": "gen1",
        "label": "通用操作"
      },
      {
        "from": "vjepa21",
        "to": "vagen",
        "label": "VLM推理"
      },
      {
        "from": "vjepa21",
        "to": "mindjourney",
        "label": "空间推理"
      },
      {
        "from": "vjepa21",
        "to": "chatvla2",
        "label": "开放世界"
      },
      {
        "from": "worldreel",
        "to": "xwam",
        "label": "动作建模"
      },
      {
        "from": "dreamerv3",
        "to": "vjepa",
        "label": "预测表征"
      },
      {
        "from": "jepa",
        "to": "genie",
        "label": "生成架构"
      },
      {
        "from": "gns",
        "to": "roboscape",
        "label": "具身场景"
      },
      {
        "from": "dreamerv3",
        "to": "iris",
        "label": "世界模型RL"
      }
    ],
    "milestones": [
      "dreamerv3",
      "jepa",
      "genie2"
    ]
  },
  "algos": [
    {
      "id": "world_models",
      "num": 1,
      "name": "World Models",
      "fullName": "世界模型 (World Models)",
      "year": "2018.03",
      "org": "Google Brain",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1803.10122",
      "projectUrl": "",
      "category": "ssm",
      "motivation": "首次展示智能体可在自身生成的梦境中学习策略",
      "summary": "World Models 的核心目标是：首次展示智能体可在自身生成的梦境中学习策略。",
      "keyPoints": [
        "核心动机：首次展示智能体可在自身生成的梦境中学习策略",
        "代表机构：Google Brain"
      ],
      "detail": "<p>首次展示智能体可在自身生成的梦境中学习策略</p>"
    },
    {
      "id": "planet",
      "num": 2,
      "name": "PlaNet",
      "fullName": "深度规划网络 (Deep Planning Network)",
      "year": "2019.06",
      "org": "Google DeepMind",
      "parent": "world_models",
      "paperUrl": "https://proceedings.mlr.press/v97/hafner19a.html",
      "projectUrl": "",
      "category": "ssm",
      "motivation": "引入RSSM循环状态空间模型实现像素级规划",
      "summary": "PlaNet 的核心目标是：引入RSSM循环状态空间模型实现像素级规划。",
      "keyPoints": [
        "核心动机：引入RSSM循环状态空间模型实现像素级规划",
        "演化来源：继承或改进自 world_models",
        "代表机构：Google DeepMind"
      ],
      "detail": "<p>引入RSSM循环状态空间模型实现像素级规划</p>"
    },
    {
      "id": "dreamerv1",
      "num": 3,
      "name": "DreamerV1",
      "fullName": "梦想家V1 (Dream to Control)",
      "year": "2019.12",
      "org": "Google DeepMind",
      "parent": "planet",
      "paperUrl": "https://arxiv.org/abs/1912.01603",
      "projectUrl": "",
      "category": "ssm",
      "motivation": "通过潜在想象进行行为学习的Actor-Critic框架",
      "summary": "DreamerV1 的核心目标是：通过潜在想象进行行为学习的Actor-Critic框架。",
      "keyPoints": [
        "核心动机：通过潜在想象进行行为学习的Actor-Critic框架",
        "演化来源：继承或改进自 planet",
        "代表机构：Google DeepMind"
      ],
      "detail": "<p>通过潜在想象进行行为学习的Actor-Critic框架</p>"
    },
    {
      "id": "dreamerv2",
      "num": 4,
      "name": "DreamerV2",
      "fullName": "梦想家V2 (Mastering Atari)",
      "year": "2020.10",
      "org": "Google DeepMind",
      "parent": "dreamerv1",
      "paperUrl": "https://arxiv.org/abs/2010.02193",
      "projectUrl": "",
      "category": "ssm",
      "motivation": "引入离散潜在变量首次在Atari达到人类水平",
      "summary": "DreamerV2 的核心目标是：引入离散潜在变量首次在Atari达到人类水平。",
      "keyPoints": [
        "核心动机：引入离散潜在变量首次在Atari达到人类水平",
        "演化来源：继承或改进自 dreamerv1",
        "代表机构：Google DeepMind"
      ],
      "detail": "<p>引入离散潜在变量首次在Atari达到人类水平</p>"
    },
    {
      "id": "dreamerv3",
      "num": 5,
      "name": "DreamerV3",
      "fullName": "梦想家V3 (Mastering Diverse Domains)",
      "year": "2023.01",
      "org": "Google DeepMind",
      "parent": "dreamerv2",
      "paperUrl": "https://arxiv.org/abs/2301.04104",
      "projectUrl": "",
      "category": "ssm",
      "motivation": "固定超参数实现跨领域通用性首次在MC收集钻石",
      "summary": "DreamerV3 的核心目标是：固定超参数实现跨领域通用性首次在MC收集钻石。",
      "keyPoints": [
        "核心动机：固定超参数实现跨领域通用性首次在MC收集钻石",
        "演化来源：继承或改进自 dreamerv2",
        "代表机构：Google DeepMind"
      ],
      "detail": "<p>固定超参数实现跨领域通用性首次在MC收集钻石</p>"
    },
    {
      "id": "dreamer4",
      "num": 6,
      "name": "Dreamer 4",
      "fullName": "梦想家4 (Scalable World Models)",
      "year": "2025.09",
      "org": "Google DeepMind",
      "parent": "dreamerv3",
      "paperUrl": "https://arxiv.org/abs/2509.24527",
      "projectUrl": "",
      "category": "ssm",
      "motivation": "扩展模型规模增强长时程记忆与复杂任务想象",
      "summary": "Dreamer 4 的核心目标是：扩展模型规模增强长时程记忆与复杂任务想象。",
      "keyPoints": [
        "核心动机：扩展模型规模增强长时程记忆与复杂任务想象",
        "演化来源：继承或改进自 dreamerv3",
        "代表机构：Google DeepMind"
      ],
      "detail": "<p>扩展模型规模增强长时程记忆与复杂任务想象</p>"
    },
    {
      "id": "jepa",
      "num": 7,
      "name": "JEPA",
      "fullName": "联合嵌入预测架构 (Joint Embedding Predictive Architecture)",
      "year": "2022.06",
      "org": "Meta AI",
      "parent": "—",
      "paperUrl": "https://openreview.net/forum?id=BZ5a_v_S_s",
      "projectUrl": "",
      "category": "predictive",
      "motivation": "预测潜在表征而非像素避免建模噪声",
      "summary": "JEPA 的核心目标是：预测潜在表征而非像素避免建模噪声。",
      "keyPoints": [
        "核心动机：预测潜在表征而非像素避免建模噪声",
        "代表机构：Meta AI"
      ],
      "detail": "<p>预测潜在表征而非像素避免建模噪声</p>"
    },
    {
      "id": "ijepa",
      "num": 8,
      "name": "I-JEPA",
      "fullName": "图像JEPA (Image-JEPA)",
      "year": "2023.06",
      "org": "Meta AI",
      "parent": "jepa",
      "paperUrl": "https://arxiv.org/abs/2301.08243",
      "projectUrl": "",
      "category": "predictive",
      "motivation": "通过掩码块预测学习强语义特征训练效率高",
      "summary": "I-JEPA 的核心目标是：通过掩码块预测学习强语义特征训练效率高。",
      "keyPoints": [
        "核心动机：通过掩码块预测学习强语义特征训练效率高",
        "演化来源：继承或改进自 jepa",
        "代表机构：Meta AI"
      ],
      "detail": "<p>通过掩码块预测学习强语义特征训练效率高</p>"
    },
    {
      "id": "vjepa",
      "num": 9,
      "name": "V-JEPA",
      "fullName": "视频JEPA (Video-JEPA)",
      "year": "2024.04",
      "org": "Meta AI",
      "parent": "ijepa",
      "paperUrl": "https://arxiv.org/abs/2404.08471",
      "projectUrl": "",
      "category": "predictive",
      "motivation": "扩展至视频域学习时空特征理解物理运动",
      "summary": "V-JEPA 的核心目标是：扩展至视频域学习时空特征理解物理运动。",
      "keyPoints": [
        "核心动机：扩展至视频域学习时空特征理解物理运动",
        "演化来源：继承或改进自 ijepa",
        "代表机构：Meta AI"
      ],
      "detail": "<p>扩展至视频域学习时空特征理解物理运动</p>"
    },
    {
      "id": "vjepa2",
      "num": 10,
      "name": "V-JEPA 2",
      "fullName": "视频JEPA 2 (V-JEPA 2)",
      "year": "2025.06",
      "org": "Meta AI",
      "parent": "vjepa",
      "paperUrl": "https://arxiv.org/abs/2506.09985",
      "projectUrl": "",
      "category": "predictive",
      "motivation": "增强时空推理应用于机器人规划任务",
      "summary": "V-JEPA 2 的核心目标是：增强时空推理应用于机器人规划任务。",
      "keyPoints": [
        "核心动机：增强时空推理应用于机器人规划任务",
        "演化来源：继承或改进自 vjepa",
        "代表机构：Meta AI"
      ],
      "detail": "<p>增强时空推理应用于机器人规划任务</p>"
    },
    {
      "id": "vjepa21",
      "num": 11,
      "name": "V-JEPA 2.1",
      "fullName": "视频JEPA 2.1 (Understanding Physical World)",
      "year": "2026.02",
      "org": "Meta AI",
      "parent": "vjepa2",
      "paperUrl": "https://ai.meta.com/blog/v-jepa-2-1-physical-world/",
      "projectUrl": "",
      "category": "predictive",
      "motivation": "扩展至20亿参数实现80%零样本抓取成功率",
      "summary": "V-JEPA 2.1 的核心目标是：扩展至20亿参数实现80%零样本抓取成功率。",
      "keyPoints": [
        "核心动机：扩展至20亿参数实现80%零样本抓取成功率",
        "演化来源：继承或改进自 vjepa2",
        "代表机构：Meta AI"
      ],
      "detail": "<p>扩展至20亿参数实现80%零样本抓取成功率</p>"
    },
    {
      "id": "videogpt",
      "num": 12,
      "name": "VideoGPT",
      "fullName": "视频GPT (VideoGPT)",
      "year": "2021.04",
      "org": "UC Berkeley",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2104.10157",
      "projectUrl": "",
      "category": "generative",
      "motivation": "利用VQ-VAE和Transformer自回归生成视频",
      "summary": "VideoGPT 的核心目标是：利用VQ-VAE和Transformer自回归生成视频。",
      "keyPoints": [
        "核心动机：利用VQ-VAE和Transformer自回归生成视频",
        "代表机构：UC Berkeley"
      ],
      "detail": "<p>利用VQ-VAE和Transformer自回归生成视频</p>"
    },
    {
      "id": "teco",
      "num": 13,
      "name": "TECO",
      "fullName": "时序一致Transformer (Temporally Consistent Transformer)",
      "year": "2023.07",
      "org": "Google Research",
      "parent": "videogpt",
      "paperUrl": "http://proceedings.mlr.press/v202/yan23b.html",
      "projectUrl": "",
      "category": "generative",
      "motivation": "弱瓶颈潜在表示解决长视频时空一致性",
      "summary": "TECO 的核心目标是：弱瓶颈潜在表示解决长视频时空一致性。",
      "keyPoints": [
        "核心动机：弱瓶颈潜在表示解决长视频时空一致性",
        "演化来源：继承或改进自 videogpt",
        "代表机构：Google Research"
      ],
      "detail": "<p>弱瓶颈潜在表示解决长视频时空一致性</p>"
    },
    {
      "id": "gaia1",
      "num": 14,
      "name": "GAIA-1",
      "fullName": "自动驾驶生成式AI (Generative AI for Autonomy)",
      "year": "2023.10",
      "org": "Wayve",
      "parent": "videogpt",
      "paperUrl": "https://arxiv.org/abs/2309.17080",
      "projectUrl": "",
      "category": "generative",
      "motivation": "9B参数模型预测驾驶场景理解交通规则",
      "summary": "GAIA-1 的核心目标是：9B参数模型预测驾驶场景理解交通规则。",
      "keyPoints": [
        "核心动机：9B参数模型预测驾驶场景理解交通规则",
        "演化来源：继承或改进自 videogpt",
        "代表机构：Wayve"
      ],
      "detail": "<p>9B参数模型预测驾驶场景理解交通规则</p>"
    },
    {
      "id": "genie",
      "num": 15,
      "name": "Genie",
      "fullName": "精灵 (Generative Interactive Environments)",
      "year": "2024.02",
      "org": "Google DeepMind",
      "parent": "videogpt",
      "paperUrl": "https://arxiv.org/abs/2402.15391",
      "projectUrl": "",
      "category": "generative",
      "motivation": "从无标注视频学习生成式交互环境",
      "summary": "Genie 的核心目标是：从无标注视频学习生成式交互环境。",
      "keyPoints": [
        "核心动机：从无标注视频学习生成式交互环境",
        "演化来源：继承或改进自 videogpt",
        "代表机构：Google DeepMind"
      ],
      "detail": "<p>从无标注视频学习生成式交互环境</p>"
    },
    {
      "id": "sora",
      "num": 16,
      "name": "Sora",
      "fullName": "空 (Sora)",
      "year": "2024.02",
      "org": "OpenAI",
      "parent": "videogpt",
      "paperUrl": "https://openai.com/research/video-generation-models-as-world-simulators",
      "projectUrl": "",
      "category": "generative",
      "motivation": "展现对重力碰撞等物理规律的直觉理解",
      "summary": "Sora 的核心目标是：展现对重力碰撞等物理规律的直觉理解。",
      "keyPoints": [
        "核心动机：展现对重力碰撞等物理规律的直觉理解",
        "演化来源：继承或改进自 videogpt",
        "代表机构：OpenAI"
      ],
      "detail": "<p>展现对重力碰撞等物理规律的直觉理解</p>"
    },
    {
      "id": "genie2",
      "num": 17,
      "name": "Genie 2",
      "fullName": "精灵2 (Large-scale Foundation World Model)",
      "year": "2024.12",
      "org": "Google DeepMind",
      "parent": "genie",
      "paperUrl": "https://deepmind.google/discover/blog/genie-2-a-large-scale-foundation-world-model/",
      "projectUrl": "",
      "category": "generative",
      "motivation": "11B参数支持实时3D环境生成与交互",
      "summary": "Genie 2 的核心目标是：11B参数支持实时3D环境生成与交互。",
      "keyPoints": [
        "核心动机：11B参数支持实时3D环境生成与交互",
        "演化来源：继承或改进自 genie",
        "代表机构：Google DeepMind"
      ],
      "detail": "<p>11B参数支持实时3D环境生成与交互</p>"
    },
    {
      "id": "gaia3",
      "num": 18,
      "name": "GAIA-3",
      "fullName": "自动驾驶生成式AI 3 (GAIA-3)",
      "year": "2026.03",
      "org": "Wayve",
      "parent": "gaia1",
      "paperUrl": "https://wayve.ai/news/series-d-funding-1-2-billion/",
      "projectUrl": "",
      "category": "generative",
      "motivation": "生成极端长尾场景助力伦敦L4级测试",
      "summary": "GAIA-3 的核心目标是：生成极端长尾场景助力伦敦L4级测试。",
      "keyPoints": [
        "核心动机：生成极端长尾场景助力伦敦L4级测试",
        "演化来源：继承或改进自 gaia1",
        "代表机构：Wayve"
      ],
      "detail": "<p>生成极端长尾场景助力伦敦L4级测试</p>"
    },
    {
      "id": "deltaworld",
      "num": 19,
      "name": "DeltaWorld",
      "fullName": "增量世界 (Efficient World Modeling with Delta Tokens)",
      "year": "2026.04",
      "org": "ETH Zurich",
      "parent": "genie2",
      "paperUrl": "https://arxiv.org/abs/2604.04913",
      "projectUrl": "",
      "category": "generative",
      "motivation": "仅编码帧间差异计算量降低2000倍",
      "summary": "DeltaWorld 的核心目标是：仅编码帧间差异计算量降低2000倍。",
      "keyPoints": [
        "核心动机：仅编码帧间差异计算量降低2000倍",
        "演化来源：继承或改进自 genie2",
        "代表机构：ETH Zurich"
      ],
      "detail": "<p>仅编码帧间差异计算量降低2000倍</p>"
    },
    {
      "id": "worldreel",
      "num": 20,
      "name": "WorldReel",
      "fullName": "世界卷轴 (4D Video via Consistent Geometry)",
      "year": "2026.03",
      "org": "SenseTime",
      "parent": "sora",
      "paperUrl": "https://arxiv.org/abs/2603.worldreel",
      "projectUrl": "",
      "category": "generative",
      "motivation": "几何一致性建模解决视频生成幻觉问题",
      "summary": "WorldReel 的核心目标是：几何一致性建模解决视频生成幻觉问题。",
      "keyPoints": [
        "核心动机：几何一致性建模解决视频生成幻觉问题",
        "演化来源：继承或改进自 sora",
        "代表机构：SenseTime"
      ],
      "detail": "<p>几何一致性建模解决视频生成幻觉问题</p>"
    },
    {
      "id": "occsora",
      "num": 21,
      "name": "OccSora",
      "fullName": "占据空 (4D Occupancy Generation)",
      "year": "2026.02",
      "org": "Tsinghua University",
      "parent": "sora",
      "paperUrl": "https://ieeexplore.ieee.org/abstract/document/11511396/",
      "projectUrl": "",
      "category": "generative",
      "motivation": "利用4D占据栅格提供几何稳定环境",
      "summary": "OccSora 的核心目标是：利用4D占据栅格提供几何稳定环境。",
      "keyPoints": [
        "核心动机：利用4D占据栅格提供几何稳定环境",
        "演化来源：继承或改进自 sora",
        "代表机构：Tsinghua University"
      ],
      "detail": "<p>利用4D占据栅格提供几何稳定环境</p>"
    },
    {
      "id": "astra",
      "num": 22,
      "name": "Astra",
      "fullName": "星辰 (Autoregressive Denoising World Model)",
      "year": "2026.01",
      "org": "Tsinghua/Kuaishou",
      "parent": "sora",
      "paperUrl": "https://arxiv.org/abs/2512.08931",
      "projectUrl": "",
      "category": "generative",
      "motivation": "自回归流与扩散去噪确保长时序物理连贯",
      "summary": "Astra 的核心目标是：自回归流与扩散去噪确保长时序物理连贯。",
      "keyPoints": [
        "核心动机：自回归流与扩散去噪确保长时序物理连贯",
        "演化来源：继承或改进自 sora",
        "代表机构：Tsinghua/Kuaishou"
      ],
      "detail": "<p>自回归流与扩散去噪确保长时序物理连贯</p>"
    },
    {
      "id": "interaction_networks",
      "num": 23,
      "name": "IN",
      "fullName": "交互网络 (Interaction Networks)",
      "year": "2016.12",
      "org": "DeepMind",
      "parent": "—",
      "paperUrl": "https://proceedings.neurips.cc/paper/2016/hash/3147da8ab4a0437c15ef51a5cc7f2dc4-Abstract.html",
      "projectUrl": "",
      "category": "physics",
      "motivation": "通过对象关系图建模实现物理系统推理",
      "summary": "IN 的核心目标是：通过对象关系图建模实现物理系统推理。",
      "keyPoints": [
        "核心动机：通过对象关系图建模实现物理系统推理",
        "代表机构：DeepMind"
      ],
      "detail": "<p>通过对象关系图建模实现物理系统推理</p>"
    },
    {
      "id": "vin",
      "num": 24,
      "name": "VIN",
      "fullName": "视觉交互网络 (Visual Interaction Networks)",
      "year": "2017.12",
      "org": "DeepMind",
      "parent": "interaction_networks",
      "paperUrl": "https://proceedings.neurips.cc/paper/7040-visual-interaction-networks",
      "projectUrl": "",
      "category": "physics",
      "motivation": "从原始视频中学习物理模拟器",
      "summary": "VIN 的核心目标是：从原始视频中学习物理模拟器。",
      "keyPoints": [
        "核心动机：从原始视频中学习物理模拟器",
        "演化来源：继承或改进自 interaction_networks",
        "代表机构：DeepMind"
      ],
      "detail": "<p>从原始视频中学习物理模拟器</p>"
    },
    {
      "id": "hnn",
      "num": 25,
      "name": "HNN",
      "fullName": "哈密顿神经网络 (Hamiltonian Neural Networks)",
      "year": "2019.12",
      "org": "Google Brain",
      "parent": "interaction_networks",
      "paperUrl": "https://proceedings.neurips.cc/paper/2019/hash/26cd8ecadce0d4efd6cc8a8725cbd1f8-Abstract.html",
      "projectUrl": "",
      "category": "physics",
      "motivation": "引入哈密顿力学确保能量守恒",
      "summary": "HNN 的核心目标是：引入哈密顿力学确保能量守恒。",
      "keyPoints": [
        "核心动机：引入哈密顿力学确保能量守恒",
        "演化来源：继承或改进自 interaction_networks",
        "代表机构：Google Brain"
      ],
      "detail": "<p>引入哈密顿力学确保能量守恒</p>"
    },
    {
      "id": "lnn",
      "num": 26,
      "name": "LNN",
      "fullName": "拉格朗日神经网络 (Lagrangian Neural Networks)",
      "year": "2020.03",
      "org": "MIT",
      "parent": "hnn",
      "paperUrl": "https://arxiv.org/abs/2003.04630",
      "projectUrl": "",
      "category": "physics",
      "motivation": "基于拉格朗日力学处理复杂约束系统",
      "summary": "LNN 提出用神经网络直接参数化拉格朗日量 \\(L(q, \\dot{q})\\)，通过欧拉-拉格朗日方程推导运动方程，解决了哈密顿神经网络 (HNN) 必须依赖正则坐标的限制，使物理先验神经网络能够处理任意坐标系下的复杂约束系统。",
      "keyPoints": [
        "<strong>拉格朗日参数化</strong>：用神经网络学习系统的拉格朗日量 <span class=\"kb-math kb-math-inline\">L(q, \\dot{q})</span>，而非直接学习动力学映射",
        "<strong>任意坐标兼容</strong>：不要求正则坐标 <span class=\"kb-math kb-math-inline\">(q, p)</span>，可直接使用广义坐标 <span class=\"kb-math kb-math-inline\">(q, \\dot{q})</span>，适用范围远超 HNN",
        "<strong>欧拉-拉格朗日约束</strong>：通过 <span class=\"kb-math kb-math-inline\">\\frac{d}{dt}\\frac{\\partial L}{\\partial \\dot{q}} - \\frac{\\partial L}{\\partial q} = 0</span> 将物理守恒律硬编码进网络结构",
        "<strong>二阶自动微分</strong>：利用深度学习框架的自动微分计算 Hessian <span class=\"kb-math kb-math-inline\">\\frac{\\partial^2 L}{\\partial \\dot{q}^2}</span> 及混合偏导数",
        "<strong>拉格朗日图网络 (LGN)</strong>：将方法扩展到 PDE 系统，通过图网络对拉格朗日密度求和建模连续场",
        "<strong>实验验证</strong>：在双摆、相对论粒子、1D 波动方程三个任务上展示了长时程能量守恒与坐标无关性优势"
      ],
      "detail": "<p><img alt=\"LNN 核心框架图\" src=\"https://ar5iv.labs.arxiv.org/html/2003.04630/assets/new_lnn_figv3_fat.png\" />\n<em>图：LNN 核心思想示意。物理学家用拉格朗日量描述双摆等物理系统的动力学（黑色）。普通神经网络在长时间预测中因误差累积而失败（红色），而 LNN 通过学习拉格朗日量并利用物理约束推导运动方程，实现精确的长期预测（蓝色）。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Lagrangian Neural Network 前向推理\n# 输入: 广义坐标 q, 广义速度 q_dot\n# 输出: 广义加速度 q_ddot\n\ndef lnn_forward(q, q_dot, lagrangian_nn):\n    &quot;&quot;&quot;通过欧拉-拉格朗日方程计算加速度&quot;&quot;&quot;\n    # 1. 神经网络预测拉格朗日量\n    L = lagrangian_nn(q, q_dot)  # L: scalar\n\n    # 2. 计算所需的偏导数（自动微分）\n    dL_dq = grad(L, q)           # ∂L/∂q\n    dL_dq_dot = grad(L, q_dot)   # ∂L/∂q̇\n\n    # 3. 计算 Hessian 和混合偏导\n    H = jacobian(dL_dq_dot, q_dot)  # ∂²L/∂q̇² (Hessian)\n    J = jacobian(dL_dq_dot, q)      # ∂²L/∂q∂q̇ (混合项)\n\n    # 4. 通过欧拉-拉格朗日方程求解加速度\n    # q̈ = H⁻¹ [∂L/∂q - (∂²L/∂q∂q̇) q̇]\n    q_ddot = solve(H, dL_dq - J @ q_dot)\n\n    return q_ddot\n\n# 训练循环\nfor (q, q_dot, q_ddot_true) in dataset:\n    q_ddot_pred = lnn_forward(q, q_dot, lagrangian_nn)\n    loss = MSE(q_ddot_pred, q_ddot_true)\n    optimizer.step(loss)\n</code></pre>\n<h5>动机与背景</h5>\n<p>物理系统的动力学建模是科学计算的核心问题。传统方法直接用神经网络拟合状态到状态的映射 <span class=\"kb-math kb-math-inline\">\\dot{x} = f_\\theta(x)</span>，虽然短期预测准确，但由于缺乏物理约束，长时间积分后会严重违反能量守恒等基本物理定律。</p>\n<p><strong>哈密顿神经网络 (HNN)</strong> 率先引入物理先验，通过学习哈密顿量 <span class=\"kb-math kb-math-inline\">H(q, p)</span> 并利用哈密顿方程 <span class=\"kb-math kb-math-inline\">\\dot{q} = \\frac{\\partial H}{\\partial p},\\ \\dot{p} = -\\frac{\\partial H}{\\partial q}</span> 来保证能量守恒。然而 HNN 有一个关键限制：<strong>它要求输入必须是正则坐标 <span class=\"kb-math kb-math-inline\">(q, p)</span></strong>，其中 <span class=\"kb-math kb-math-inline\">p</span> 是正则动量。在许多实际问题中（如机器人关节角度、传感器读数），我们获得的是广义坐标和广义速度 <span class=\"kb-math kb-math-inline\">(q, \\dot{q})</span>，而非正则动量。从 <span class=\"kb-math kb-math-inline\">\\dot{q}</span> 到 <span class=\"kb-math kb-math-inline\">p</span> 的转换本身就需要知道系统的拉格朗日量，形成了鸡生蛋的困境。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：拉格朗日力学与哈密顿力学在物理上等价，但拉格朗日形式直接使用 <span class=\"kb-math kb-math-inline\">(q, \\dot{q})</span> 作为状态变量，天然兼容任意广义坐标，无需正则变换。</div>\n<h5>核心机制：欧拉-拉格朗日方程驱动的神经网络</h5>\n<p>LNN 的核心思想极为优雅：用一个神经网络 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_\\theta</span> 参数化拉格朗日量，然后通过经典力学的欧拉-拉格朗日方程自动推导出运动方程。</p>\n<p><strong>拉格朗日量</strong>定义为动能减去势能：</p>\n<div class=\"kb-math kb-math-display\">L(q, \\dot{q}) = T(\\dot{q}) - V(q)</div>\n<p><strong>欧拉-拉格朗日方程</strong>给出系统的运动方程：</p>\n<div class=\"kb-math kb-math-display\">\\frac{d}{dt}\\frac{\\partial L}{\\partial \\dot{q}} - \\frac{\\partial L}{\\partial q} = 0</div>\n<p>将全导数展开，可以得到加速度的显式表达：</p>\n<div class=\"kb-math kb-math-display\">\\ddot{q} = \\left(\\frac{\\partial^2 L}{\\partial \\dot{q}^2}\\right)^{-1} \\left[\\frac{\\partial L}{\\partial q} - \\left(\\frac{\\partial^2 L}{\\partial q \\partial \\dot{q}}\\right) \\dot{q}\\right]</div>\n<p>这个公式是 LNN 的核心计算步骤。其中：\n- <span class=\"kb-math kb-math-inline\">\\frac{\\partial^2 L}{\\partial \\dot{q}^2}</span> 是拉格朗日量对广义速度的 <strong>Hessian 矩阵</strong>，对应系统的广义质量矩阵\n- <span class=\"kb-math kb-math-inline\">\\frac{\\partial^2 L}{\\partial q \\partial \\dot{q}}</span> 是<strong>混合偏导数</strong>，捕捉坐标与速度之间的耦合（如科里奥利力）\n- <span class=\"kb-math kb-math-inline\">\\frac{\\partial L}{\\partial q}</span> 包含广义力的信息</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：Hessian 矩阵 <span class=\"kb-math kb-math-inline\">\\frac{\\partial^2 L}{\\partial \\dot{q}^2}</span> 必须可逆。对于合理的物理系统，这等价于要求广义质量矩阵正定，这在物理上总是成立的。</div>\n<h5>自动微分的关键作用</h5>\n<p>LNN 的实现高度依赖现代深度学习框架的<strong>自动微分</strong>能力。具体来说，需要计算：</p>\n<ol>\n<li><strong>一阶梯度</strong> <span class=\"kb-math kb-math-inline\">\\frac{\\partial L}{\\partial q}</span> 和 <span class=\"kb-math kb-math-inline\">\\frac{\\partial L}{\\partial \\dot{q}}</span>：标准反向传播</li>\n<li><strong>二阶导数</strong> <span class=\"kb-math kb-math-inline\">\\frac{\\partial^2 L}{\\partial \\dot{q}^2}</span>：对一阶梯度再次求导（Hessian）</li>\n<li><strong>混合二阶导数</strong> <span class=\"kb-math kb-math-inline\">\\frac{\\partial^2 L}{\\partial q \\partial \\dot{q}}</span>：交叉偏导数</li>\n</ol>\n<p>这些高阶导数在 JAX 等框架中可以通过嵌套的 <code>grad</code> 和 <code>jacobian</code> 调用高效计算。论文使用 JAX 实现，利用其函数式自动微分特性。</p>\n<h5>与 HNN 的核心区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>HNN</th>\n<th>LNN</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>学习目标</td>\n<td>哈密顿量 <span class=\"kb-math kb-math-inline\">H(q, p)</span></td>\n<td>拉格朗日量 <span class=\"kb-math kb-math-inline\">L(q, \\dot{q})</span></td>\n</tr>\n<tr>\n<td>输入坐标</td>\n<td>正则坐标 <span class=\"kb-math kb-math-inline\">(q, p)</span></td>\n<td>任意广义坐标 <span class=\"kb-math kb-math-inline\">(q, \\dot{q})</span></td>\n</tr>\n<tr>\n<td>运动方程</td>\n<td>哈密顿方程（一阶ODE）</td>\n<td>欧拉-拉格朗日方程（二阶ODE）</td>\n</tr>\n<tr>\n<td>坐标限制</td>\n<td>必须正则变换</td>\n<td><strong>无限制</strong></td>\n</tr>\n<tr>\n<td>约束系统</td>\n<td>困难</td>\n<td>自然处理</td>\n</tr>\n<tr>\n<td>计算代价</td>\n<td>一阶导数</td>\n<td>二阶导数（Hessian）</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键优势</strong>：在相对论粒子实验中，HNN 在非正则坐标下完全失败（轨迹发散），而 LNN 在同样的任意坐标下仍能准确学习动力学。这验证了坐标无关性是 LNN 的核心优势。</div>\n<h5>拉格朗日图网络：扩展到 PDE 系统</h5>\n<p>论文进一步提出了<strong>拉格朗日图网络 (Lagrangian Graph Networks, LGN)</strong>，将 LNN 的思想扩展到偏微分方程（PDE）描述的连续系统。</p>\n<p>核心思想是将连续场离散化为图上的节点，每个节点的<strong>拉格朗日密度</strong> <span class=\"kb-math kb-math-inline\">\\mathcal{L}_i</span> 由其局部邻域决定：</p>\n<div class=\"kb-math kb-math-display\">L_{\\text{total}} = \\sum_i \\mathcal{L}_\\theta(q_i, \\dot{q}_i, q_{\\mathcal{N}(i)})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{N}(i)</span> 是节点 <span class=\"kb-math kb-math-inline\">i</span> 的邻居集合。这种设计使得 LNN 可以建模波动方程等连续物理系统，同时保持平移不变性和守恒律。</p>\n<p><img alt=\"双摆实验结果\" src=\"https://ar5iv.labs.arxiv.org/html/2003.04630/assets/x1.png\" />\n<em>图：双摆任务实验结果对比。LNN 和基线模型在短期动力学建模上表现相似，但在能量守恒方面 LNN 显著优于无物理先验的基线。</em></p>\n<p><img alt=\"相对论粒子实验\" src=\"https://ar5iv.labs.arxiv.org/html/2003.04630/assets/x4.png\" />\n<em>图：相对论粒子任务。(a) HNN 在非正则坐标下失败；(b) HNN 在正则坐标下成功；(c) LNN 在任意坐标下均成功，验证了坐标无关性优势。</em></p>",
      "quiz": {
        "q": "与哈密顿神经网络 (HNN) 相比，拉格朗日神经网络 (LNN) 的核心优势是什么？",
        "options": [
          "训练速度更快，因为只需一阶导数",
          "能够在任意广义坐标下工作，无需正则坐标变换",
          "网络参数量更少，更容易收敛",
          "可以直接预测系统能量，无需积分"
        ],
        "answer": 1,
        "explain": "LNN 基于拉格朗日力学，直接使用广义坐标 (q, q̇) 作为输入，而 HNN 要求正则坐标 (q, p)。这使得 LNN 能处理无法轻易获得正则动量的复杂约束系统。"
      }
    },
    {
      "id": "gns",
      "num": 27,
      "name": "GNS",
      "fullName": "图网络模拟器 (Learning to Simulate)",
      "year": "2020.07",
      "org": "DeepMind",
      "parent": "vin",
      "paperUrl": "https://proceedings.mlr.press/v119/sanchez-gonzalez20a.html",
      "projectUrl": "",
      "category": "physics",
      "motivation": "利用GNN模拟流体刚体可变形材料",
      "summary": "GNS 的核心目标是：利用GNN模拟流体刚体可变形材料。",
      "keyPoints": [
        "核心动机：利用GNN模拟流体刚体可变形材料",
        "演化来源：继承或改进自 vin",
        "代表机构：DeepMind"
      ],
      "detail": "<p>利用GNN模拟流体刚体可变形材料</p>"
    },
    {
      "id": "roboscape",
      "num": 28,
      "name": "Roboscape",
      "fullName": "机器人场景 (Physics-informed Embodied World Model)",
      "year": "2026.01",
      "org": "Tsinghua University",
      "parent": "gns",
      "paperUrl": "https://arxiv.org/abs/2601.roboscape",
      "projectUrl": "",
      "category": "physics",
      "motivation": "引入物理先验提升机器人场景预测准确性",
      "summary": "Roboscape 的核心目标是：引入物理先验提升机器人场景预测准确性。",
      "keyPoints": [
        "核心动机：引入物理先验提升机器人场景预测准确性",
        "演化来源：继承或改进自 gns",
        "代表机构：Tsinghua University"
      ],
      "detail": "<p>引入物理先验提升机器人场景预测准确性</p>"
    },
    {
      "id": "newton",
      "num": 29,
      "name": "Newton 1.0",
      "fullName": "牛顿物理引擎 (Newton Physics Engine)",
      "year": "2026.03",
      "org": "NVIDIA",
      "parent": "gns",
      "paperUrl": "https://blogs.nvidia.com/blog/2026/04/gtc26-robots/",
      "projectUrl": "",
      "category": "physics",
      "motivation": "开源物理引擎实现精确刚体流体动力学",
      "summary": "Newton 1.0 的核心目标是：开源物理引擎实现精确刚体流体动力学。",
      "keyPoints": [
        "核心动机：开源物理引擎实现精确刚体流体动力学",
        "演化来源：继承或改进自 gns",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>开源物理引擎实现精确刚体流体动力学</p>"
    },
    {
      "id": "mbpo",
      "num": 30,
      "name": "MBPO",
      "fullName": "基于模型的策略优化 (Model-Based Policy Optimization)",
      "year": "2019.12",
      "org": "UC Berkeley",
      "parent": "—",
      "paperUrl": "https://proceedings.neurips.cc/paper/2019/hash/5faf461eff3099671ad63c6f3f094f7f-Abstract.html",
      "projectUrl": "",
      "category": "planning",
      "motivation": "短步长模型生成数据极大提升样本效率",
      "summary": "MBPO 提出从真实数据状态出发、利用学习到的动力学模型进行短步长分支 rollout 来生成训练数据，并给出了基于模型误差和 rollout 长度的单调改进理论保证，在连续控制任务上实现了比无模型方法快一个数量级的样本效率，同时保持了相当的渐近性能。",
      "keyPoints": [
        "<strong>分支 rollout 机制</strong>：从真实经验回放池中采样状态，用学习到的模型执行 <span class=\"kb-math kb-math-inline\">k</span> 步短 rollout，而非从初始状态分布开始长 rollout，有效控制模型误差累积",
        "<strong>单调改进理论保证</strong>：Theorem 4.1 给出模型下策略回报与真实回报的下界关系；Theorem 4.2 证明分支 rollout 的误差随 <span class=\"kb-math kb-math-inline\">k</span> 线性增长而非随 <span class=\"kb-math kb-math-inline\">1/(1-\\gamma)</span> 二次增长",
        "<strong>概率集成模型</strong>：使用多个概率神经网络（输出高斯分布的均值和方差）组成的集成模型作为动力学模型，同时捕获认知不确定性和随机不确定性",
        "<strong>高梯度更新比</strong>：短 rollout 生成的大量模型数据使得每个真实环境步可执行 20–40 次策略梯度更新（远高于纯无模型方法的稳定上限）",
        "<strong>基于 SAC 的策略优化</strong>：在模型生成数据上使用 Soft Actor-Critic 进行策略学习，继承其最大熵框架的探索优势",
        "<strong>模型泛化分析</strong>：实验表明训练数据越多，模型对策略分布偏移的敏感度越低（<span class=\"kb-math kb-math-inline\">\\mathrm{d}\\epsilon_{m&#x27;}/\\mathrm{d}\\epsilon_\\pi</span> 递减），为使用更长 rollout 提供了实践依据"
      ],
      "detail": "<h5>动机与背景</h5>\n<p>基于模型的强化学习（MBRL）通过学习环境动力学模型来提升样本效率，但长期以来面临一个核心困境：<strong>模型误差在多步预测中会指数级累积</strong>，导致策略在模型中被\"利用\"（model exploitation），学到的策略在真实环境中表现很差。</p>\n<p>传统的 Dyna 风格方法从初始状态分布开始做完整 episode 的模型 rollout，误差随 horizon 长度急剧放大。而纯无模型方法（如 SAC、PPO）虽然渐近性能好，但需要大量真实交互样本。MBPO 的核心问题是：<strong>能否找到一种\"恰到好处\"的模型使用方式，既利用模型提升效率，又不被模型误差拖累？</strong></p>\n<h5>理论框架：单调改进下界</h5>\n<p>MBPO 的理论基础建立在策略改进下界之上。首先定义关键符号：</p>\n<ul>\n<li><span class=\"kb-math kb-math-inline\">\\eta[\\pi]</span>：策略 <span class=\"kb-math kb-math-inline\">\\pi</span> 在<strong>真实环境</strong>中的期望回报</li>\n<li><span class=\"kb-math kb-math-inline\">\\hat{\\eta}[\\pi]</span>：策略 <span class=\"kb-math kb-math-inline\">\\pi</span> 在<strong>学习到的模型</strong>中的期望回报</li>\n<li><span class=\"kb-math kb-math-inline\">\\epsilon_m = \\max_t \\mathbb{E}_{s \\sim \\pi_t} [D_{\\mathrm{TV}}(p(s&#x27;|s,a) \\| \\hat{p}(s&#x27;|s,a))]</span>：模型误差（TV 距离）</li>\n<li><span class=\"kb-math kb-math-inline\">\\epsilon_\\pi = \\max_t \\mathbb{E}_{s \\sim d_{\\pi_D}^t} [D_{\\mathrm{TV}}(\\pi \\| \\pi_D)]</span>：策略偏移</li>\n</ul>\n<p><strong>Theorem 4.1（模型下的单调改进）</strong>：</p>\n<div class=\"kb-math kb-math-display\">\\eta[\\pi] \\geq \\hat{\\eta}[\\pi] - C(\\epsilon_m, \\epsilon_\\pi)</div>\n<p>其中惩罚项 <span class=\"kb-math kb-math-inline\">C</span> 同时依赖模型误差 <span class=\"kb-math kb-math-inline\">\\epsilon_m</span> 和策略偏移 <span class=\"kb-math kb-math-inline\">\\epsilon_\\pi</span>。这意味着：只要模型足够准确且策略更新幅度受控，在模型中改进策略就能保证在真实环境中也改进。</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：该 bound 将\"信任模型的程度\"量化为两个可控量——模型精度和策略变化幅度。</div>\n<p><strong>Theorem 4.2（分支 rollout 的更紧下界）</strong>：</p>\n<p>对于从真实数据分布 <span class=\"kb-math kb-math-inline\">d_{\\pi_D}</span> 出发、在模型中执行 <span class=\"kb-math kb-math-inline\">k</span> 步的分支 rollout：</p>\n<div class=\"kb-math kb-math-display\">\\eta[\\pi] \\geq \\hat{\\eta}_k^{\\mathrm{branch}}[\\pi] - 2r_{\\max}\\left[\\frac{\\gamma^{k+1}\\epsilon_\\pi}{(1-\\gamma)^2} + \\frac{\\gamma^k + 2}{1-\\gamma}\\epsilon_\\pi + \\frac{k}{1-\\gamma}(\\epsilon_m + 2\\epsilon_\\pi)\\right]</div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：bound 中有两个竞争因素——随 <span class=\"kb-math kb-math-inline\">k</span> 指数衰减的项（来自真实数据的\"锚定\"效应）和随 <span class=\"kb-math kb-math-inline\">k</span> 线性增长的项（模型误差累积）。这意味着存在一个最优的 rollout 长度 <span class=\"kb-math kb-math-inline\">k^*</span>，在理论上平衡了模型利用与误差控制。</div>\n<h5>模型泛化的实证分析</h5>\n<p>理论 bound 在字面意义上取最大值时 <span class=\"kb-math kb-math-inline\">k=0</span>（即完全不用模型），这是因为分析对模型泛化能力做了最悲观的假设。论文通过实验发现：</p>\n<p><img alt=\"模型泛化分析\" src=\"https://ar5iv.labs.arxiv.org/html/1906.08253/assets/x1.png\" />\n<em>图 1：(a) 模型误差随策略偏移的变化——训练数据越多，误差增长越慢；(b) 模型误差对策略偏移的局部导数 <span class=\"kb-math kb-math-inline\">\\mathrm{d}\\epsilon_{m&#x27;}/\\mathrm{d}\\epsilon_\\pi</span> 随训练数据量递减，说明模型泛化能力随数据增加而增强。</em></p>\n<p>实验表明模型误差对策略偏移的敏感度可以用线性近似：</p>\n<div class=\"kb-math kb-math-display\">\\hat{\\epsilon}_{m&#x27;}(\\epsilon_\\pi) \\approx \\epsilon_m + \\epsilon_\\pi \\cdot \\frac{\\mathrm{d}\\epsilon_{m&#x27;}}{\\mathrm{d}\\epsilon_\\pi}</div>\n<p>当 <span class=\"kb-math kb-math-inline\">\\mathrm{d}\\epsilon_{m&#x27;}/\\mathrm{d}\\epsilon_\\pi &lt; 2</span> 时（实验中训练数据充足时成立），这比理论中悲观的 <span class=\"kb-math kb-math-inline\">\\epsilon_m + 2\\epsilon_\\pi</span> 上界更紧，使得更长的 rollout 在实践中变得可行。</p>\n<h5>算法：实用 MBPO</h5>\n<pre><code class=\"language-python\"># Algorithm 2: Model-Based Policy Optimization (MBPO)\n初始化策略 π_φ, 环境回放池 D_env, 模型回放池 D_model\nfor N epochs:\n    # 1. 训练动力学模型\n    在 D_env 上通过最大似然训练模型集成 p_θ\n\n    for E environment steps:\n        # 2. 真实环境交互\n        用 π_φ 在环境中执行动作, 将 (s, a, r, s') 加入 D_env\n\n        # 3. 模型分支 rollout\n        for M model rollouts:\n            从 D_env 中均匀采样状态 s_t\n            从 s_t 出发, 用 π_φ 在模型 p_θ 中执行 k 步 rollout\n            将生成的 (s, a, r, s') 加入 D_model\n\n        # 4. 策略优化（高更新比）\n        for G gradient updates:  # G = 20~40, 远高于无模型方法\n            φ ← φ - λ_π · ∇̂_φ J_π(φ, D_model)\n</code></pre>\n<div class=\"key-point\">💡 <strong>关键设计</strong>：即使 rollout 长度 <span class=\"kb-math kb-math-inline\">k</span> 很短（甚至 <span class=\"kb-math kb-math-inline\">k=1</span>），通过执行大量（<span class=\"kb-math kb-math-inline\">M</span> 次）短 rollout，仍可生成足够多的模型数据来支撑高频策略更新。这是 MBPO 能做到每个环境步 20–40 次梯度更新的关键。</div>\n<h5>核心机制详解</h5>\n<p><strong>1. 概率集成动力学模型</strong></p>\n<p>模型由 <span class=\"kb-math kb-math-inline\">B</span> 个独立的概率神经网络组成（论文中 <span class=\"kb-math kb-math-inline\">B=7</span>，每次 rollout 随机选 5 个），每个网络输出下一状态的高斯分布参数：</p>\n<div class=\"kb-math kb-math-display\">\\hat{p}_{\\theta_b}(s_{t+1} | s_t, a_t) = \\mathcal{N}(\\mu_{\\theta_b}(s_t, a_t),\\; \\Sigma_{\\theta_b}(s_t, a_t))</div>\n<ul>\n<li><strong>随机不确定性</strong>（aleatoric）：由每个网络输出的方差 <span class=\"kb-math kb-math-inline\">\\Sigma_{\\theta_b}</span> 捕获</li>\n<li><strong>认知不确定性</strong>（epistemic）：由集成中不同网络预测的分歧捕获</li>\n</ul>\n<p>训练损失为负对数似然：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}(\\theta_b) = -\\sum_{(s,a,s&#x27;) \\in \\mathcal{D}_{\\text{env}}} \\log \\hat{p}_{\\theta_b}(s&#x27; | s, a)</div>\n<p><strong>2. 分支 rollout 与数据混合</strong></p>\n<p>与传统 Dyna 从初始状态分布 rollout 不同，MBPO 从 <span class=\"kb-math kb-math-inline\">\\mathcal{D}_{\\text{env}}</span> 中均匀采样真实状态作为 rollout 起点。这保证了：\n- rollout 起始状态分布接近真实策略的状态访问分布\n- 短步长 rollout 的状态不会偏离真实分布太远\n- 模型只需在真实数据附近的局部区域保持准确</p>\n<p><strong>3. 与传统方法的关键区别</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>rollout 起点</th>\n<th>rollout 长度</th>\n<th>数据用途</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Dyna / SLBO</td>\n<td>初始状态分布</td>\n<td>完整 episode</td>\n<td>策略训练</td>\n</tr>\n<tr>\n<td>MVE / STEVE</td>\n<td>真实数据</td>\n<td>短</td>\n<td>值函数目标改进</td>\n</tr>\n<tr>\n<td><strong>MBPO</strong></td>\n<td><strong>真实数据</strong></td>\n<td><strong>短（1–15步）</strong></td>\n<td><strong>策略训练</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>MBPO 结合了两个优势：从真实数据出发（控制分布偏移）+ 用模型数据直接训练策略（比仅改进值目标更充分利用模型）。</p>\n<h5>实验结果</h5>\n<p><img alt=\"训练曲线\" src=\"https://ar5iv.labs.arxiv.org/html/1906.08253/assets/x2.png\" />\n<em>图 2：MBPO 与五个基线在 MuJoCo 连续控制任务上的学习曲线。MBPO 在 Ant 任务上 30 万步达到 SAC 300 万步的性能，样本效率提升约 10 倍。</em></p>\n<p>关键实验发现：</p>\n<ul>\n<li><strong>样本效率</strong>：MBPO 在所有任务上比 SAC 快约 10 倍，在 Hopper 和 Walker2d 上分别仅需 14 分钟和 40 分钟的等效实时仿真</li>\n<li><strong>渐近性能</strong>：与最优无模型方法（SAC）相当，远超纯模型方法（PETS 在高维 Ant 任务上失败）</li>\n<li><strong>消融实验</strong>：</li>\n<li>仅提高无模型 SAC 的梯度更新比（不用模型数据）无法匹配 MBPO，证明模型数据确实有帮助</li>\n<li>固定 <span class=\"kb-math kb-math-inline\">k=1</span> 的单步 rollout 已能获得大部分收益，验证了理论分析中\"短 rollout 最优\"的结论</li>\n<li>模型足够准确支持 200 步 rollout，但用于策略优化时短 rollout 效果更好；500 步 rollout 则误差过大</li>\n</ul>\n<p><img alt=\"消融实验\" src=\"https://ar5iv.labs.arxiv.org/html/1906.08253/assets/x3.png\" />\n<em>图 3：消融实验——无模型高更新比、不同 rollout 长度、值展开对比。单步 rollout 提供了一个难以超越的强基线。</em></p>",
      "quiz": {
        "q": "MBPO 中分支 rollout 从哪里采样起始状态？",
        "options": [
          "从环境的初始状态分布中采样",
          "从真实经验回放池中均匀采样已访问过的状态",
          "从模型生成的虚拟状态中采样",
          "从当前策略的在线轨迹末端状态采样"
        ],
        "answer": 1,
        "explain": "MBPO 的核心设计是从真实经验回放池 D_env 中均匀采样状态作为模型 rollout 的起点（Algorithm 2 第 7 行），这保证了 rollout 起始分布接近真实数据分布，从而控制模型误差累积。"
      }
    },
    {
      "id": "simple",
      "num": 31,
      "name": "SimPLe",
      "fullName": "模拟策略学习 (Simulated Policy Learning)",
      "year": "2020.04",
      "org": "Google Research",
      "parent": "mbpo",
      "paperUrl": "https://arxiv.org/abs/1903.00374",
      "projectUrl": "",
      "category": "planning",
      "motivation": "在Atari 100k展示极高样本效率",
      "summary": "SimPLe 的核心目标是：在Atari 100k展示极高样本效率。",
      "keyPoints": [
        "核心动机：在Atari 100k展示极高样本效率",
        "演化来源：继承或改进自 mbpo",
        "代表机构：Google Research"
      ],
      "detail": "<p>在Atari 100k展示极高样本效率</p>"
    },
    {
      "id": "muzero",
      "num": 32,
      "name": "MuZero",
      "fullName": "无模型零 (MuZero)",
      "year": "2020.12",
      "org": "DeepMind",
      "parent": "mbpo",
      "paperUrl": "https://www.nature.com/articles/s41586-020-03051-4",
      "projectUrl": "",
      "category": "planning",
      "motivation": "学习对价值奖励策略有用的潜在动力学",
      "summary": "MuZero 的核心目标是：学习对价值奖励策略有用的潜在动力学。",
      "keyPoints": [
        "核心动机：学习对价值奖励策略有用的潜在动力学",
        "演化来源：继承或改进自 mbpo",
        "代表机构：DeepMind"
      ],
      "detail": "<p>学习对价值奖励策略有用的潜在动力学</p>"
    },
    {
      "id": "tdmpc",
      "num": 33,
      "name": "TD-MPC",
      "fullName": "时序差分模型预测控制 (TD-MPC)",
      "year": "2022.06",
      "org": "UC San Diego",
      "parent": "muzero",
      "paperUrl": "https://arxiv.org/abs/2203.04955",
      "projectUrl": "",
      "category": "planning",
      "motivation": "结合TD学习与MPC无需显式重建损失",
      "summary": "TD-MPC 的核心目标是：结合TD学习与MPC无需显式重建损失。",
      "keyPoints": [
        "核心动机：结合TD学习与MPC无需显式重建损失",
        "演化来源：继承或改进自 muzero",
        "代表机构：UC San Diego"
      ],
      "detail": "<p>结合TD学习与MPC无需显式重建损失</p>"
    },
    {
      "id": "iris",
      "num": 34,
      "name": "IRIS",
      "fullName": "内部语音想象 (Imagination with auto-Regression)",
      "year": "2023.05",
      "org": "Google DeepMind",
      "parent": "muzero",
      "paperUrl": "https://openreview.net/forum?id=vhFu1Acb0xb",
      "projectUrl": "",
      "category": "planning",
      "motivation": "Transformer作为世界模型2小时达人类水平",
      "summary": "IRIS 的核心目标是：Transformer作为世界模型2小时达人类水平。",
      "keyPoints": [
        "核心动机：Transformer作为世界模型2小时达人类水平",
        "演化来源：继承或改进自 muzero",
        "代表机构：Google DeepMind"
      ],
      "detail": "<p>Transformer作为世界模型2小时达人类水平</p>"
    },
    {
      "id": "tdmpc2",
      "num": 35,
      "name": "TD-MPC2",
      "fullName": "时序差分模型预测控制2 (TD-MPC2)",
      "year": "2024.05",
      "org": "UC San Diego",
      "parent": "tdmpc",
      "paperUrl": "https://proceedings.iclr.cc/paper_files/paper/2024/hash/cf73d57b6dcda32b293df7c2d5341f49-Abstract-Conference.html",
      "projectUrl": "",
      "category": "planning",
      "motivation": "可扩展鲁棒的连续控制世界模型",
      "summary": "TD-MPC2 的核心目标是：可扩展鲁棒的连续控制世界模型。",
      "keyPoints": [
        "核心动机：可扩展鲁棒的连续控制世界模型",
        "演化来源：继承或改进自 tdmpc",
        "代表机构：UC San Diego"
      ],
      "detail": "<p>可扩展鲁棒的连续控制世界模型</p>"
    },
    {
      "id": "jumpy_wm",
      "num": 36,
      "name": "Jumpy WM",
      "fullName": "跳跃式世界模型 (Compositional Planning with Jumpy WM)",
      "year": "2026.02",
      "org": "DeepMind",
      "parent": "tdmpc2",
      "paperUrl": "https://icml.cc/Conferences/2026",
      "projectUrl": "",
      "category": "planning",
      "motivation": "跳跃式动力学解决长程规划误差累积",
      "summary": "Jumpy WM 的核心目标是：跳跃式动力学解决长程规划误差累积。",
      "keyPoints": [
        "核心动机：跳跃式动力学解决长程规划误差累积",
        "演化来源：继承或改进自 tdmpc2",
        "代表机构：DeepMind"
      ],
      "detail": "<p>跳跃式动力学解决长程规划误差累积</p>"
    },
    {
      "id": "rlvr_world",
      "num": 37,
      "name": "RLVR-World",
      "fullName": "RL微调世界模型 (Training World Models with RL)",
      "year": "2026.01",
      "org": "Tsinghua University",
      "parent": "iris",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/4ec03ed08a3fcb59e1c815b5598beff1-Abstract-Datasets_and_Benchmarks_Track.html",
      "projectUrl": "",
      "category": "planning",
      "motivation": "利用RL微调提升多步预测因果连贯性",
      "summary": "RLVR-World 的核心目标是：利用RL微调提升多步预测因果连贯性。",
      "keyPoints": [
        "核心动机：利用RL微调提升多步预测因果连贯性",
        "演化来源：继承或改进自 iris",
        "代表机构：Tsinghua University"
      ],
      "detail": "<p>利用RL微调提升多步预测因果连贯性</p>"
    },
    {
      "id": "unidrive_wm",
      "num": 38,
      "name": "UniDrive-WM",
      "fullName": "统一驾驶世界模型 (Unified Driving World Model)",
      "year": "2026.01",
      "org": "UC Berkeley",
      "parent": "gaia3",
      "paperUrl": "https://arxiv.org/abs/2601.04453",
      "projectUrl": "",
      "category": "embodied",
      "motivation": "统一理解规划生成支持多摄像头一致性",
      "summary": "UniDrive-WM 的核心目标是：统一理解规划生成支持多摄像头一致性。",
      "keyPoints": [
        "核心动机：统一理解规划生成支持多摄像头一致性",
        "演化来源：继承或改进自 gaia3",
        "代表机构：UC Berkeley"
      ],
      "detail": "<p>统一理解规划生成支持多摄像头一致性</p>"
    },
    {
      "id": "resim",
      "num": 39,
      "name": "ReSim",
      "fullName": "可靠仿真 (Reliable World Simulation)",
      "year": "2026.02",
      "org": "University of Tübingen",
      "parent": "gaia3",
      "paperUrl": "https://proceedings.neurips.cc/paper/2026/resim",
      "projectUrl": "",
      "category": "embodied",
      "motivation": "丰富驾驶日志生成高保真闭环仿真环境",
      "summary": "ReSim 的核心目标是：丰富驾驶日志生成高保真闭环仿真环境。",
      "keyPoints": [
        "核心动机：丰富驾驶日志生成高保真闭环仿真环境",
        "演化来源：继承或改进自 gaia3",
        "代表机构：University of Tübingen"
      ],
      "detail": "<p>丰富驾驶日志生成高保真闭环仿真环境</p>"
    },
    {
      "id": "navthinker",
      "num": 40,
      "name": "NavThinker",
      "fullName": "导航思考者 (Social Navigation via World Models)",
      "year": "2026.03",
      "org": "Zhejiang University",
      "parent": "vjepa21",
      "paperUrl": "https://arxiv.org/abs/2603.15359",
      "projectUrl": "",
      "category": "embodied",
      "motivation": "深度特征空间前瞻思考降低碰撞率",
      "summary": "NavThinker 的核心目标是：深度特征空间前瞻思考降低碰撞率。",
      "keyPoints": [
        "核心动机：深度特征空间前瞻思考降低碰撞率",
        "演化来源：继承或改进自 vjepa21",
        "代表机构：Zhejiang University"
      ],
      "detail": "<p>深度特征空间前瞻思考降低碰撞率</p>"
    },
    {
      "id": "gen1",
      "num": 41,
      "name": "GEN-1",
      "fullName": "通用具身模型1 (Scaling Embodied Foundation Models)",
      "year": "2026.04",
      "org": "Generalist AI",
      "parent": "vjepa21",
      "paperUrl": "https://generalistai.com/blog/apr-02-2026-gen-1-scaling-embodied-foundation-models-to-mastery/",
      "projectUrl": "",
      "category": "embodied",
      "motivation": "原生交互基础模型任务成功率达99%",
      "summary": "GEN-1 通过在 50 万小时真实世界交互数据上大规模预训练（不含机器人数据），结合后训练、强化学习与推理时技术（Harmonic Reasoning），使具身基础模型首次在多项灵巧操作任务上达到 99% 成功率、约 3 倍于 SOTA 的完成速度，并展现出训练分布外的即兴恢复能力，仅需约 1 小时机器人数据即可适配新任务。",
      "keyPoints": [
        "<strong>Scaling Law 延续</strong>：延续 GEN-0 发现的机器人学习 Scaling Law，通过进一步扩大数据（50 万+ 小时）和计算规模，将性能从\"演示级\"推至\"商用级\"",
        "<strong>精通三要素定义</strong>：提出 Mastery = Reliability（可靠性 99%+）+ Speed（~3× SOTA）+ Improvisation（即兴恢复智能），作为具身模型评估框架",
        "<strong>无机器人数据预训练</strong>：基础模型完全使用低成本可穿戴设备采集的人类活动数据预训练，无需遥操作或仿真数据",
        "<strong>极致数据效率</strong>：每个任务仅需约 1 小时机器人数据微调；相比 GEN-0 可用 10× 更少的任务数据达到同等性能",
        "<strong>系统级创新</strong>：涵盖预训练效率提升、后训练技术、经验学习（RL）、多模态人类引导、推理时 Harmonic Reasoning 等多项技术",
        "<strong>6 项任务验证</strong>：汽车零件分拣、T 恤折叠、扫地机器人维修、积木打包、纸箱折叠、手机包装，均达到 99%+ 成功率",
        "<strong>速度突破</strong>：纸箱折叠 12.1 秒（SOTA 34 秒，2.8× 提速）；手机包装 15.5 秒（2.8× 提速）",
        "<strong>即兴恢复行为</strong>：模型展现训练分布外的创造性恢复策略（重新抓取、利用外部灵巧性、双手协作等）",
        "<strong>对齐问题前瞻</strong>：指出具身模型的涌现行为既是优势也是风险，需要发展具身 AI 对齐方法"
      ],
      "detail": "<h5>核心框架示意</h5>\n<div class=\"warn-box\">⚠️ 注意：GEN-1 以技术博客形式发布，未提供传统论文中的模型架构图。以下基于文中描述整理其系统框架。</div>\n<pre><code>┌─────────────────────────────────────────────────────────┐\n│                    GEN-1 系统架构                         │\n├─────────────────────────────────────────────────────────┤\n│                                                         │\n│  ┌──────────────┐    ┌──────────────┐                   │\n│  │ 预训练数据引擎 │    │  任务适配数据  │                   │\n│  │ 50万+小时     │    │  ~1小时/任务   │                   │\n│  │ 可穿戴设备    │    │  机器人数据    │                   │\n│  │ (无机器人数据) │    │              │                   │\n│  └──────┬───────┘    └──────┬───────┘                   │\n│         │                   │                           │\n│         ▼                   ▼                           │\n│  ┌──────────────────────────────────┐                   │\n│  │     大规模多模态基础模型           │                   │\n│  │  (预训练 → 后训练 → RL微调)       │                   │\n│  └──────────────┬───────────────────┘                   │\n│                 │                                       │\n│                 ▼                                       │\n│  ┌──────────────────────────────────┐                   │\n│  │     推理时系统 (Harmonic Reasoning)│                   │\n│  │  + 多模态人类引导                  │                   │\n│  │  + 实时动作输出                    │                   │\n│  └──────────────┬───────────────────┘                   │\n│                 │                                       │\n│                 ▼                                       │\n│         实时机器人控制                                    │\n│   (可靠性 99% | 速度 3× | 即兴恢复)                      │\n└─────────────────────────────────────────────────────────┘\n</code></pre>\n<h5>性能对比伪代码</h5>\n<pre><code class=\"language-python\"># GEN-1 训练与部署流程概览\n# Phase 1: 预训练（无机器人数据）\npretrain_data = collect_wearable_data(hours=500_000)  # 可穿戴设备采集人类活动\nfoundation_model = pretrain(\n    data=pretrain_data,\n    modality=&quot;multimodal&quot;,  # 视觉 + 本体感觉 + 语言\n    robot_data=None  # 关键：预训练不使用任何机器人数据\n)\n\n# Phase 2: 后训练 + RL\nmodel = post_train(foundation_model, techniques=[\n    &quot;compute_efficiency_optimization&quot;,  # 预训练计算效率曲线偏移\n    &quot;reinforcement_learning&quot;,           # 从经验中学习\n    &quot;multimodal_human_guidance&quot;,        # 多模态人类引导\n])\n\n# Phase 3: 任务适配（仅需 ~1 小时机器人数据）\nfor task in [&quot;box_folding&quot;, &quot;phone_packing&quot;, &quot;tshirt_folding&quot;, ...]:\n    task_data = collect_robot_data(task, hours=1)  # 极少量任务数据\n    task_model = finetune(model, task_data)\n    # GEN-1: 10x less data than GEN-0 for comparable performance\n\n# Phase 4: 推理时增强\ndeployed_model = apply_inference_techniques(\n    task_model,\n    harmonic_reasoning=True,  # 新型推理时技术\n    real_time=True            # 实时动作输出\n)\n\n# 结果对比\n# Task          | No Pretrain | GEN-0 | GEN-1\n# Vacuum Repair |     2%      |  50%  |  99%\n# Box Folding   |    13%      |  81%  |  99%\n# Phone Packing |    42%      |  62%  |  99%\n# Average       |    19%      |  64%  |  99%\n</code></pre>\n<h5>动机与背景</h5>\n<p>GEN-1 的核心动机源于具身基础模型从\"可演示\"到\"可商用\"的跨越需求。此前的 GEN-0 首次证明了机器人学习中 Scaling Law 的存在——随着预训练数据和计算量的增加，所有零样本任务的性能同步提升。然而，GEN-0 的平均成功率仅为 64%，远未达到商业部署的门槛。</p>\n<p>这一进程与大语言模型（LLM）的发展轨迹高度平行：GPT-2 展示了多任务学习的可扩展路径但难以商用，GPT-3 通过规模扩展使 Scaling Law 延续并在特定任务（如广告文案）上实现经济价值。类似地，GEN-1 通过进一步扩展 GEN-0 的基础，使简单物理任务首次跨越商用性能阈值。</p>\n<div class=\"key-point\">💡 关键洞察：GEN-1 的预训练数据完全来自人类佩戴低成本可穿戴设备进行日常活动的记录，而非昂贵的遥操作数据或仿真数据。这提供了一个存在性证明——无需大规模遥操作或仿真数据集，仅通过人类活动预训练即可达到高水平的任务精通。</div>\n<h5>核心机制：精通（Mastery）三要素</h5>\n<p>GEN-1 将\"精通\"定义为三个维度的综合：</p>\n<p><strong>1. 可靠性（Reliability）</strong></p>\n<p>传统工业机器人通过精确控制和严格约束环境实现可靠性，但这种方式无法泛化。端到端机器人学习模型长期以来难以达到高可靠性。GEN-1 在 6 项任务上实现了 99%+ 的成功率：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>任务</th>\n<th>无预训练</th>\n<th>GEN-0</th>\n<th>GEN-1</th>\n<th>连续成功次数</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>汽车零件分拣</td>\n<td>—</td>\n<td>—</td>\n<td>99%+</td>\n<td>50+ (1小时)</td>\n</tr>\n<tr>\n<td>T恤折叠</td>\n<td>—</td>\n<td>—</td>\n<td>99%+</td>\n<td>86次连续</td>\n</tr>\n<tr>\n<td>扫地机维修</td>\n<td>2%</td>\n<td>50%</td>\n<td>99%</td>\n<td>200+次连续</td>\n</tr>\n<tr>\n<td>积木打包</td>\n<td>—</td>\n<td>—</td>\n<td>99%+</td>\n<td>1800+次连续</td>\n</tr>\n<tr>\n<td>纸箱折叠</td>\n<td>13%</td>\n<td>81%</td>\n<td>99%</td>\n<td>200+次连续</td>\n</tr>\n<tr>\n<td>手机包装</td>\n<td>42%</td>\n<td>62%</td>\n<td>99%</td>\n<td>100+次连续</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>2. 速度（Speed）</strong></p>\n<p>速度提升并非简单加快电机转速。随着速度增加，世界不再是准静态的：速度项增大、摩擦动力学变化、运动模糊加剧，对精度、反应性和推理提出更高要求。GEN-1 的速度突破来自多个因素：</p>\n<ul>\n<li><strong>经验学习（RL）</strong>：模型通过强化学习自主发现更快的完成策略</li>\n<li><strong>Harmonic Reasoning</strong>：新型推理时技术，优化实时决策</li>\n<li><strong>预训练数据优势</strong>：可穿戴设备采集的数据包含人类以自然速度完成各种任务的记录，相比遥操作数据更流畅、更快速（遥操作受限于力反馈缺失、延迟和视野问题）</li>\n</ul>\n<p>具体速度对比：\n- 纸箱折叠：GEN-1 12.1 秒 vs SOTA 34 秒（GEN-0 和 π₀ 在相同纸箱上均约 34 秒），<strong>2.8× 提速</strong>\n- 手机包装：GEN-1 15.5 秒 vs GEN-0，<strong>2.8× 提速</strong></p>\n<div class=\"key-point\">💡 关键：GEN-1 的任务完成速度可以超过演示数据中的速度，说明模型通过 RL 学会了比人类示范更高效的策略。</div>\n<p><strong>3. 即兴恢复智能（Improvisational Intelligence）</strong></p>\n<p>这是 GEN-1 最具突破性的能力维度。在非结构化环境中，机器人必须能够创造性地即兴解决意外情况。GEN-1 展现的训练分布外恢复行为包括：</p>\n<ul>\n<li>垫圈被碰落后：可选择放下重新抓取、部分插入缝隙利用外部灵巧性重新抓取、或使用另一只手进行双手协作重新抓取</li>\n<li>大型可变形物体出现异常构型时：模型自主找到恢复路径</li>\n<li>这些行为直接贡献于从意外长尾事件中恢复</li>\n</ul>\n<p>正如 William James（现代心理学奠基人）所述：<strong>智能是通过不同手段达到相同目标的能力</strong>。即兴恢复智能不仅使机器人能在非结构化环境中工作，还反过来提升了通用模型的可靠性和速度。</p>\n<h5>数据引擎与预训练范式</h5>\n<p>GEN-1 的数据策略是其核心竞争优势之一：</p>\n<pre><code>传统方法:  遥操作数据(昂贵/难扩展) → 任务特定模型 → 窄泛化\nGEN-1方法: 可穿戴设备数据(低成本/可扩展) → 通用基础模型 → 少量机器人数据微调\n</code></pre>\n<ul>\n<li><strong>预训练数据</strong>：50 万+ 小时高保真物理交互数据，来自人类佩戴可穿戴设备进行数百万种活动</li>\n<li><strong>预训练中无机器人数据</strong>：模型在适配新任务时，同时首次适配该机器人形态和该任务</li>\n<li><strong>任务适配</strong>：仅需约 1 小时机器人数据</li>\n<li><strong>数据效率提升</strong>：GEN-1 可用 GEN-0 的 1/10 任务数据达到同等性能</li>\n</ul>\n<div class=\"warn-box\">⚠️ 注意：此前超过 90% 成功率的通用机器人模型依赖大规模遥操作数据集，成本高且难以扩展。GEN-1 证明了基于可穿戴设备的预训练路线可以达到更高性能，这对整个领域的数据采集范式具有重要启示。</div>\n<h5>系统级设计</h5>\n<p>GEN-1 不仅是一个模型，更准确地说是一个<strong>系统</strong>。类似于前沿 LLM 聊天机器人和 API，系统级组件在推理和模型调用层面显著提升了性能：</p>\n<ol>\n<li><strong>预训练效率</strong>：通过计算效率曲线偏移（shifting the curve），在相同计算量下获得更高的预训练智能</li>\n<li><strong>后训练技术</strong>：包括理论 RL 基础和多模态人类引导</li>\n<li><strong>推理时技术</strong>：Harmonic Reasoning——一种新型分页注意力机制，支持实时推理</li>\n<li><strong>分布式训练基础设施</strong>：重新设计以支持 PB 级物理交互数据作为一等公民</li>\n<li><strong>硬件协同</strong>：设计新硬件，在新地理区域部署数千个机器人手以获取多样化物理活动数据</li>\n</ol>\n<h5>与相关工作的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统工业机器人</th>\n<th>PaLM-E / RT-2 (VLA)</th>\n<th>π₀</th>\n<th>GEN-0</th>\n<th><strong>GEN-1</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>泛化能力</td>\n<td>极低（硬编码）</td>\n<td>中等</td>\n<td>中等</td>\n<td>高</td>\n<td><strong>高</strong></td>\n</tr>\n<tr>\n<td>可靠性</td>\n<td>高（受限环境）</td>\n<td>低-中</td>\n<td>中</td>\n<td>64%</td>\n<td><strong>99%</strong></td>\n</tr>\n<tr>\n<td>速度</td>\n<td>高（受限任务）</td>\n<td>慢</td>\n<td>~34s(折箱)</td>\n<td>~34s(折箱)</td>\n<td><strong>~12s(折箱)</strong></td>\n</tr>\n<tr>\n<td>即兴能力</td>\n<td>无</td>\n<td>有限</td>\n<td>有限</td>\n<td>有限</td>\n<td><strong>显著</strong></td>\n</tr>\n<tr>\n<td>数据需求</td>\n<td>编程</td>\n<td>大量遥操作</td>\n<td>大量遥操作</td>\n<td>~10h/任务</td>\n<td><strong>~1h/任务</strong></td>\n</tr>\n<tr>\n<td>预训练数据</td>\n<td>无</td>\n<td>互联网数据</td>\n<td>遥操作</td>\n<td>可穿戴设备</td>\n<td><strong>可穿戴设备(50万h)</strong></td>\n</tr>\n</tbody>\n</table></div>\n<h5>局限性与展望</h5>\n<p>GEN-1 并非没有局限：\n- 并非所有尝试的任务都能达到 99%+ 成功率\n- 某些任务在实际部署中可能需要更高的成功率或速度\n- 当前主要验证的是\"简单物理任务\"的精通</p>\n<p>但 Scaling Law 的延续意味着：每一代新模型都将解锁更多更复杂任务的精通能力。此外，GEN-1 提出了具身 AI 对齐的前瞻性思考——随着模型能力增强，涌现行为（如未经训练的恢复动作）既是优势也可能是风险，需要发展精确引导模型行为的对齐方法。</p>",
      "quiz": {
        "q": "GEN-1 的预训练数据主要来源是什么？",
        "options": [
          "大规模机器人遥操作数据",
          "物理仿真环境生成的合成数据",
          "人类佩戴低成本可穿戴设备采集的活动数据",
          "互联网视频和图像数据"
        ],
        "answer": 2,
        "explain": "GEN-1 的预训练数据完全来自人类佩戴可穿戴设备进行日常活动的记录（50万+小时），不包含任何机器人数据。这是其核心创新之一，证明了无需昂贵的遥操作数据即可达到高水平任务精通。"
      }
    },
    {
      "id": "xwam",
      "num": 42,
      "name": "X-WAM",
      "fullName": "统一4D世界动作建模 (Unified 4D World Action Modeling)",
      "year": "2026.04",
      "org": "Stanford/NVIDIA",
      "parent": "worldreel",
      "paperUrl": "https://arxiv.org/abs/2604.26694v2",
      "projectUrl": "",
      "category": "embodied",
      "motivation": "统一4D合成与动作执行异步噪声采样",
      "summary": "X-WAM 的核心目标是：统一4D合成与动作执行异步噪声采样。",
      "keyPoints": [
        "核心动机：统一4D合成与动作执行异步噪声采样",
        "演化来源：继承或改进自 worldreel",
        "代表机构：Stanford/NVIDIA"
      ],
      "detail": "<p>统一4D合成与动作执行异步噪声采样</p>"
    },
    {
      "id": "vagen",
      "num": 43,
      "name": "Vagen",
      "fullName": "视觉智能体生成 (Reinforcing World Model Reasoning)",
      "year": "2026.03",
      "org": "Peking University",
      "parent": "vjepa21",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/fc6688d75adde86b9df910769c1d02e3-Abstract-Conference.html",
      "projectUrl": "",
      "category": "embodied",
      "motivation": "显式视觉状态推理强化VLM世界建模",
      "summary": "VAGEN 提出将 VLM 智能体训练为显式的世界模型（World Model），通过状态估计（State Estimation）和转移预测（Transition Modeling）两种推理策略增强多轮视觉决策能力，并设计了 WorldModeling Reward 与 Bi-Level GAE 机制实现细粒度的奖励塑形与信用分配，在 Qwen2.5-VL-3B 上超越 GPT-5 等大规模闭源模型。",
      "keyPoints": [
        "<strong>POMDP 建模</strong>：将多轮视觉智能体任务形式化为部分可观测马尔可夫决策过程，每轮接收图像观测并输出动作",
        "<strong>5 种推理策略</strong>：NoThink、FreeThink、StateEstimation、TransitionModeling、WorldModeling（前两者组合），通过结构化 <code>&lt;think&gt;</code> 标签控制推理内容",
        "<strong>VAGEN-Base 训练框架</strong>：基于 PPO 的多轮 RL 训练，关键创新为 Observation Token Masking——将图像 token 排除在策略梯度之外",
        "<strong>WorldModeling Reward</strong>：利用 LLM-as-a-Judge 评估智能体的状态估计与转移预测质量，提供密集的推理质量奖励信号",
        "<strong>Bi-Level GAE</strong>：两层优势估计机制——先在 turn 级别用 <span class=\"kb-math kb-math-inline\">\\gamma_{\\text{turn}}</span> 计算每轮优势，再在 token 级别用 <span class=\"kb-math kb-math-inline\">\\gamma_{\\text{token}}</span> 向回传播，解决稀疏奖励下的信用分配问题",
        "<strong>视觉状态表征研究</strong>：对比自然语言、符号化、结构化三种表征格式，发现最优格式依赖于任务特性",
        "<strong>6 个评测环境</strong>：Sokoban、FrozenLake、PrimitiveSkill（4 子任务）、Navigation（2 子任务）、SVG Reconstruction，覆盖规划、操控、导航、推理",
        "<strong>VAGEN-Full（3B）得分 0.82</strong>，超越 GPT-5（0.75）、Claude 4.5 Sonnet（0.64）等闭源模型"
      ],
      "detail": "<h5>框架总览</h5>\n<p><img alt=\"VAGEN 框架总览与五种推理策略\" src=\"https://ar5iv.labs.arxiv.org/html/2510.16907/assets/x1.png\" />\n<em>图 1：VAGEN 框架。左侧展示多轮交互流程（观测→推理→动作→环境反馈），右侧展示五种推理策略的结构化输出格式。WorldModeling 策略同时包含 <code>&lt;observation&gt;</code>（状态估计）和 <code>&lt;prediction&gt;</code>（转移预测）字段。</em></p>\n<p><img alt=\"VAGEN-Base 多轮 RL 训练流程\" src=\"https://ar5iv.labs.arxiv.org/html/2510.16907/assets/x2.png\" />\n<em>图 2：VAGEN-Base 训练流程。智能体在环境中执行多轮交互生成轨迹，通过 PPO 优化策略，其中 Observation Token Masking 确保只对动作 token 计算策略梯度。</em></p>\n<p><img alt=\"Bi-Level GAE 与 Token-Level GAE 对比\" src=\"https://ar5iv.labs.arxiv.org/html/2510.16907/assets/x3.png\" />\n<em>图 3：标准 Token-Level GAE（左）将稀疏的终端奖励逐 token 回传；Bi-Level GAE（右）先在 turn 级别分配奖励（紫色箭头），再在 token 级别传播（橙色箭头），实现层次化信用分配。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># VAGEN-Full 多轮 RL 训练框架伪代码\ndef vagen_full_training(env, policy_vlm, critic, llm_judge):\n    for iteration in range(N_iterations):\n        # === Rollout 阶段 ===\n        trajectories = []\n        for episode in range(batch_size):\n            obs = env.reset()  # 初始图像观测\n            trajectory = []\n            for turn in range(max_turns):\n                # 智能体生成结构化输出：&lt;think&gt;&lt;observation&gt;...&lt;/observation&gt;&lt;prediction&gt;...&lt;/prediction&gt;...&lt;/think&gt;&lt;answer&gt;action&lt;/answer&gt;\n                response = policy_vlm.generate(obs, strategy=&quot;WorldModeling&quot;)\n                action = parse_action(response)\n                obs_belief = parse_observation(response)   # 状态估计 ŝ_t\n                pred_belief = parse_prediction(response)   # 转移预测 ŝ_{t+1}\n\n                next_obs, task_reward, done = env.step(action)\n\n                # WorldModeling Reward: LLM-as-Judge 评估推理质量\n                gt_state = env.get_ground_truth_state()\n                gt_next_state = env.get_ground_truth_state()\n                r_reason = β_s * judge_match(obs_belief, gt_state) \\\n                         + β_w * judge_match(pred_belief, gt_next_state)\n\n                r_turn = r_reason + r_format + task_reward\n                trajectory.append((obs, response, action, r_turn, next_obs))\n                obs = next_obs\n                if done: break\n            trajectories.append(trajectory)\n\n        # === Bi-Level GAE 优势估计 ===\n        for traj in trajectories:\n            # 第一层：Turn-Level GAE\n            turn_advantages = compute_turn_gae(\n                rewards=[t.r_turn for t in traj],\n                values=critic.evaluate(traj),\n                gamma=gamma_turn, lambda_=lambda_turn\n            )\n            # 第二层：Token-Level GAE（以 turn advantage 初始化末尾 token）\n            token_advantages = []\n            for t, turn_adv in enumerate(turn_advantages):\n                token_advs = compute_token_gae(\n                    kl_penalties=compute_kl(traj[t].response),\n                    values=critic.token_values(traj[t]),\n                    gamma=gamma_token, lambda_=lambda_token,\n                    terminal_advantage=turn_adv  # 关键：用 turn 级优势初始化\n                )\n                token_advantages.extend(token_advs)\n\n        # === PPO 优化（带 Observation Token Masking）===\n        for epoch in range(K_epochs):\n            # 仅对 action tokens 计算策略梯度，mask 掉 observation tokens\n            ratio = policy_vlm.prob(actions) / old_policy.prob(actions)\n            clipped = clip(ratio, 1-ε, 1+ε)\n            loss = -min(ratio * token_advantages, clipped * token_advantages)\n            loss = loss * action_token_mask  # Observation Token Masking\n            policy_vlm.update(loss)\n</code></pre>\n<h5>方法详解</h5>\n<p><strong>1. 动机与问题定义：多轮视觉智能体的推理瓶颈</strong></p>\n<p>当前 VLM（视觉语言模型）在单轮视觉问答任务上表现出色，但在需要多轮交互的智能体任务中（如推箱子、机器人操控、迷宫导航）表现显著下降。论文将这一问题归因于两个核心缺陷：（1）VLM 缺乏对视觉状态的显式推理能力——它们不会主动\"描述当前看到了什么\"以及\"执行动作后世界会变成什么样\"；（2）现有 RL 训练方法（如 GRPO、标准 PPO）无法有效处理多轮交互中的信用分配问题——稀疏的终端奖励难以指导中间每一步的决策质量。</p>\n<p>VAGEN 的核心洞察是：<strong>让 VLM 像世界模型一样思考</strong>。具体来说，在每轮决策前，智能体需要显式地完成两项推理任务：<strong>状态估计</strong>（State Estimation，用自然语言描述当前观测到的环境状态 <span class=\"kb-math kb-math-inline\">\\hat{s}_t</span>）和<strong>转移预测</strong>（Transition Modeling，预测执行动作后环境将变成什么状态 <span class=\"kb-math kb-math-inline\">\\hat{s}_{t+1}</span>）。这种设计受到认知科学中\"内部世界模型\"概念的启发——人类在行动前会在脑中模拟动作的后果。</p>\n<p><strong>2. 核心机制：结构化推理策略与 VAGEN-Base</strong></p>\n<p>论文设计了 5 种推理策略来系统性地研究不同推理深度的影响。所有策略都通过结构化的 XML 标签控制输出格式：</p>\n<ul>\n<li><strong>NoThink</strong>：直接输出动作，不进行任何推理（<code>&lt;answer&gt;action&lt;/answer&gt;</code>）</li>\n<li><strong>FreeThink</strong>：在 <code>&lt;think&gt;</code> 标签中自由推理，类似 Chain-of-Thought</li>\n<li><strong>StateEstimation</strong>：在 <code>&lt;think&gt;</code> 中必须包含 <code>&lt;observation&gt;</code> 字段，描述当前视觉状态</li>\n<li><strong>TransitionModeling</strong>：在 <code>&lt;think&gt;</code> 中必须包含 <code>&lt;prediction&gt;</code> 字段，预测下一状态</li>\n<li><strong>WorldModeling</strong>：同时包含 <code>&lt;observation&gt;</code> 和 <code>&lt;prediction&gt;</code>，完整的世界建模</li>\n</ul>\n<div class=\"key-point\">💡 <strong>关键发现</strong>：StateEstimation 在导航任务中表现最佳（理解当前位置是关键），TransitionModeling 在操控任务中表现最佳（预测物体运动是关键），而 WorldModeling 在所有任务上都表现稳定且最优。</div>\n<p>VAGEN-Base 的训练框架基于 PPO，但引入了一个关键创新——<strong>Observation Token Masking</strong>。在多轮交互中，轨迹由交替出现的观测 token（图像编码）和动作 token（模型生成）组成。由于观测 token 不是由智能体策略生成的，对其计算策略梯度在理论上是错误的，且冗长的观测序列会主导梯度权重分布。因此，VAGEN 在计算 PPO 损失时将所有观测 token 的 mask 设为 0，仅对动作 token 进行优化。</p>\n<p><strong>3. WorldModeling Reward：基于 LLM 裁判的推理质量奖励</strong></p>\n<p>为了监督智能体的世界建模推理质量，VAGEN 引入了 WorldModeling Reward。其核心思路是：从环境中获取真实状态信息（如 Sokoban 中玩家/箱子/目标的 2D 坐标），然后评估智能体在 <code>&lt;observation&gt;</code> 和 <code>&lt;prediction&gt;</code> 中的描述与真实状态的匹配程度。</p>\n<p>论文最初尝试使用 CLIP 计算图文相似度作为奖励，但发现 CLIP 对细粒度的空间和几何细节不够敏感。最终采用 <strong>LLM-as-a-Judge</strong> 方案：将智能体的推理文本和真实状态文本一起输入 LLM，由 LLM 直接判断匹配程度（二元判断或提取结构化信息后进行 F1 评分）。每轮的推理奖励定义为：</p>\n<div class=\"kb-math kb-math-display\">r^{\\text{reason}}_t = \\beta_s \\cdot \\mathcal{I}_{\\text{SE}}(\\hat{s}_t, s_t) + \\beta_w \\cdot \\mathcal{I}_{\\text{TM}}(\\hat{s}_{t+1}, s_{t+1})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{I}</span> 为匹配得分函数，<span class=\"kb-math kb-math-inline\">\\beta_s, \\beta_w</span> 为奖励系数（默认均为 0.5）。</p>\n<p><strong>4. Bi-Level GAE：层次化信用分配</strong></p>\n<p>标准 GAE 在多轮交互中面临严重的信用分配问题：稀疏的终端奖励需要跨越数十个 turn、数百个 token 进行回传，信号极度衰减。VAGEN 提出 <strong>Bi-Level GAE</strong>，将优势估计分解为两个层次：</p>\n<p><strong>Turn 级别</strong>（外层）：将每轮的复合奖励 <span class=\"kb-math kb-math-inline\">r_t = r^{\\text{reason}}_t + r^{\\text{format}}_t + R(s_t, a_t)</span> 作为该轮的即时奖励，使用 critic 在每轮动作末尾的价值估计计算 TD 误差：</p>\n<div class=\"kb-math kb-math-display\">\\delta^{\\text{turn}}_t = r_t + \\gamma_{\\text{turn}} V_\\phi(\\bar{\\tau}_{\\leq a_{t+1}}) - V_\\phi(\\bar{\\tau}_{\\leq a_t})</div>\n<p>然后通过标准 GAE 递推计算 turn 级优势：<span class=\"kb-math kb-math-inline\">A^{\\text{turn}}_t = \\delta^{\\text{turn}}_t + \\gamma_{\\text{turn}} \\lambda_{\\text{turn}} A^{\\text{turn}}_{t+1}</span>。</p>\n<p><strong>Token 级别</strong>（内层）：在每个 turn 内部，以 KL 惩罚作为 token 级奖励，计算 token 级 TD 误差和优势。<strong>关键连接</strong>：每个 turn 最后一个 token 的优势被初始化为该 turn 的 turn 级优势 <span class=\"kb-math kb-math-inline\">A^{\\text{turn}}_t</span>，从而将 turn 级别的反馈注入 token 级别并向前传播。</p>\n<div class=\"warn-box\">⚠️ <strong>与传统方法的区别</strong>：Vanilla PPO 不做 observation masking 导致训练失败；GRPO 因场景变化导致轨迹多样性过高，需要不可承受的样本量；Turn-level PPO 对同一 turn 内所有 token 使用均匀优势估计，无法区分各 token 的贡献。Bi-Level GAE 同时解决了这三个问题。</div>\n<p><strong>5. 消融实验与关键发现</strong></p>\n<p>消融实验揭示了两个组件的互补性：Bi-Level GAE 单独使用时提升显著但不稳定（对奖励稀疏性和准确性敏感）；WorldModeling Reward 单独使用时一致性提升但受限于粗粒度的轨迹级信用分配。两者结合的 VAGEN-Full 在所有任务上都是最稳定且表现最优的方法。特别值得注意的是，在 PrimitiveSkill 任务上，VAGEN-Base 和 VAGEN-Full 的训练准确率相近，但 VAGEN-Full 的测试准确率显著更高，表明世界建模推理增强了泛化能力。</p>",
      "quiz": {
        "q": "VAGEN 中 Bi-Level GAE 的 token 级优势估计是如何与 turn 级优势关联的？",
        "options": [
          "将所有 turn 级优势求平均后作为每个 token 的优势",
          "每个 turn 最后一个 token 的优势被初始化为该 turn 的 turn 级优势，然后向前传播",
          "token 级优势独立计算，与 turn 级优势相加得到最终优势",
          "使用 turn 级优势对 token 级优势进行归一化"
        ],
        "answer": 1,
        "explain": "Bi-Level GAE 的关键连接机制是将每个 turn 最后一个 action token 的优势初始化为预先计算好的 turn 级优势 A^turn_t，然后通过 token 级 GAE 的反向递推将该信号传播到 turn 内所有 token，实现层次化的信用分配。"
      }
    },
    {
      "id": "mindjourney",
      "num": 44,
      "name": "MindJourney",
      "fullName": "心智旅程 (Test-time Scaling with World Models)",
      "year": "2026.03",
      "org": "Shanghai Jiao Tong University",
      "parent": "vjepa21",
      "paperUrl": "https://proceedings.neurips.cc/paper/2026/mindjourney",
      "projectUrl": "",
      "category": "embodied",
      "motivation": "推理阶段利用世界模型增强空间推理",
      "summary": "MindJourney 的核心目标是：推理阶段利用世界模型增强空间推理。",
      "keyPoints": [
        "核心动机：推理阶段利用世界模型增强空间推理",
        "演化来源：继承或改进自 vjepa21",
        "代表机构：Shanghai Jiao Tong University"
      ],
      "detail": "<p>推理阶段利用世界模型增强空间推理</p>"
    },
    {
      "id": "chatvla2",
      "num": 45,
      "name": "ChatVLA-2",
      "fullName": "对话视觉语言动作2 (Open-world Reasoning VLA)",
      "year": "2026.03",
      "org": "Fudan University",
      "parent": "vjepa21",
      "paperUrl": "https://proceedings.neurips.cc/paper/2026/chatvla2",
      "projectUrl": "",
      "category": "embodied",
      "motivation": "保留VLM能力扩展开放世界具身推理",
      "summary": "ChatVLA-2 的核心目标是：保留VLM能力扩展开放世界具身推理。",
      "keyPoints": [
        "核心动机：保留VLM能力扩展开放世界具身推理",
        "演化来源：继承或改进自 vjepa21",
        "代表机构：Fudan University"
      ],
      "detail": "<p>保留VLM能力扩展开放世界具身推理</p>"
    }
  ],
  "categories": {
    "ssm": {
      "label": "状态空间世界模型",
      "color": "#22a06b"
    },
    "predictive": {
      "label": "预测表征学习",
      "color": "#1f77b4"
    },
    "generative": {
      "label": "生成式世界模型",
      "color": "#ff7f0e"
    },
    "physics": {
      "label": "物理世界建模",
      "color": "#9467bd"
    },
    "planning": {
      "label": "基于模型的规划",
      "color": "#d62728"
    },
    "embodied": {
      "label": "具身智能应用",
      "color": "#17becf"
    }
  },
  "projectUrls": {}
};
