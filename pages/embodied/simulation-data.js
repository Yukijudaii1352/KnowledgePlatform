/**
 * simulation-data.js — 由 pipeline/build.py 于 2026-05-13 14:56:44 自动生成。
 * 源文件：content/embodied/simulation.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "embodied",
    "topic_id": "simulation",
    "topic_name": "具身智能仿真",
    "page_title": "具身智能仿真技术演进图谱",
    "page_subtitle": "2026-05-13 版",
    "page_desc": "从早期物理引擎到GPU大规模并行仿真，再到生成式数字孪生的技术演进历程，涵盖Isaac Sim、MuJoCo、Genesis等核心平台与基准测试体系。",
    "page_icon": "🎮",
    "hero_pills": [
      "🏷️ Physics Engine · Sim2Real · Parallel Simulation"
    ],
    "count_pill": "{count} 个算法",
    "image_base": ""
  },
  "overview": [
    {
      "title": "待定",
      "body_html": "<p>待定。</p>"
    }
  ],
  "graph": {
    "nodes": [
      {
        "id": "gazebo",
        "x": 50,
        "y": 50,
        "category": "foundation"
      },
      {
        "id": "mujoco",
        "x": 150,
        "y": 60,
        "category": "foundation"
      },
      {
        "id": "vrep",
        "x": 180,
        "y": 50,
        "category": "foundation"
      },
      {
        "id": "pybullet",
        "x": 250,
        "y": 50,
        "category": "foundation"
      },
      {
        "id": "dm_control",
        "x": 300,
        "y": 60,
        "category": "foundation"
      },
      {
        "id": "brax",
        "x": 450,
        "y": 70,
        "category": "foundation"
      },
      {
        "id": "ai2thor",
        "x": 270,
        "y": 150,
        "category": "interactive"
      },
      {
        "id": "virtualhome",
        "x": 310,
        "y": 180,
        "category": "interactive"
      },
      {
        "id": "habitat",
        "x": 360,
        "y": 160,
        "category": "interactive"
      },
      {
        "id": "sapien",
        "x": 400,
        "y": 190,
        "category": "interactive"
      },
      {
        "id": "igibson",
        "x": 450,
        "y": 170,
        "category": "interactive"
      },
      {
        "id": "tdw",
        "x": 450,
        "y": 200,
        "category": "interactive"
      },
      {
        "id": "procthor",
        "x": 520,
        "y": 150,
        "category": "interactive"
      },
      {
        "id": "omnigibson",
        "x": 600,
        "y": 180,
        "category": "interactive"
      },
      {
        "id": "habitat_3",
        "x": 650,
        "y": 160,
        "category": "interactive"
      },
      {
        "id": "robosuite",
        "x": 400,
        "y": 280,
        "category": "benchmark"
      },
      {
        "id": "rlbench",
        "x": 400,
        "y": 310,
        "category": "benchmark"
      },
      {
        "id": "metaworld",
        "x": 400,
        "y": 330,
        "category": "benchmark"
      },
      {
        "id": "calvin",
        "x": 520,
        "y": 300,
        "category": "benchmark"
      },
      {
        "id": "maniskill3",
        "x": 650,
        "y": 290,
        "category": "benchmark"
      },
      {
        "id": "robocasa",
        "x": 650,
        "y": 320,
        "category": "benchmark"
      },
      {
        "id": "embodied_arena",
        "x": 800,
        "y": 300,
        "category": "benchmark"
      },
      {
        "id": "rbench",
        "x": 780,
        "y": 330,
        "category": "benchmark"
      },
      {
        "id": "isaac_gym",
        "x": 450,
        "y": 420,
        "category": "parallel"
      },
      {
        "id": "isaac_sim",
        "x": 600,
        "y": 420,
        "category": "parallel"
      },
      {
        "id": "mujoco_playground",
        "x": 730,
        "y": 450,
        "category": "parallel"
      },
      {
        "id": "newton",
        "x": 800,
        "y": 420,
        "category": "parallel"
      },
      {
        "id": "mo_playground",
        "x": 800,
        "y": 460,
        "category": "parallel"
      },
      {
        "id": "genesis",
        "x": 670,
        "y": 550,
        "category": "generative"
      },
      {
        "id": "embodied_gen",
        "x": 750,
        "y": 560,
        "category": "generative"
      },
      {
        "id": "gs_playground",
        "x": 820,
        "y": 570,
        "category": "generative"
      }
    ],
    "edges": [
      {
        "from": "mujoco",
        "to": "dm_control",
        "label": "标准化控制"
      },
      {
        "from": "mujoco",
        "to": "brax",
        "label": "可微分优化"
      },
      {
        "from": "mujoco",
        "to": "robosuite",
        "label": "模块化封装"
      },
      {
        "from": "mujoco",
        "to": "metaworld",
        "label": "多任务基准"
      },
      {
        "from": "mujoco",
        "to": "mujoco_playground",
        "label": "高速训练"
      },
      {
        "from": "vrep",
        "to": "rlbench",
        "label": "基准测试"
      },
      {
        "from": "ai2thor",
        "to": "procthor",
        "label": "程序化生成"
      },
      {
        "from": "habitat",
        "to": "habitat_3",
        "label": "社交协作"
      },
      {
        "from": "igibson",
        "to": "omnigibson",
        "label": "光追渲染"
      },
      {
        "from": "sapien",
        "to": "maniskill3",
        "label": "GPU并行"
      },
      {
        "from": "robosuite",
        "to": "robocasa",
        "label": "家庭场景"
      },
      {
        "from": "isaac_gym",
        "to": "isaac_sim",
        "label": "高保真化"
      },
      {
        "from": "isaac_gym",
        "to": "mo_playground",
        "label": "多目标优化"
      },
      {
        "from": "isaac_sim",
        "to": "newton",
        "label": "物理稳定性"
      },
      {
        "from": "genesis",
        "to": "embodied_gen",
        "label": "生成式构建"
      },
      {
        "from": "genesis",
        "to": "gs_playground",
        "label": "3DGS渲染"
      },
      {
        "from": "mujoco",
        "to": "isaac_gym",
        "label": "GPU加速"
      },
      {
        "from": "isaac_gym",
        "to": "genesis",
        "label": "统一求解器"
      }
    ],
    "milestones": [
      "mujoco",
      "isaac_gym",
      "genesis"
    ]
  },
  "algos": [
    {
      "id": "gazebo",
      "num": 1,
      "name": "Gazebo",
      "fullName": "Gazebo机器人仿真器 (Gazebo Robot Simulator)",
      "year": "2004",
      "org": "OSF",
      "parent": "—",
      "paperUrl": "https://robotics.usc.edu/publications/394/",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "开启开源3D多机器人仿真时代，ROS深度集成",
      "summary": "Gazebo 的核心目标是：开启开源3D多机器人仿真时代，ROS深度集成。",
      "keyPoints": [
        "核心动机：开启开源3D多机器人仿真时代，ROS深度集成",
        "代表机构：OSF"
      ],
      "detail": "<p>开启开源3D多机器人仿真时代，ROS深度集成</p>"
    },
    {
      "id": "mujoco",
      "num": 2,
      "name": "MuJoCo",
      "fullName": "多关节接触动力学引擎 (Multi-Joint dynamics with Contact)",
      "year": "2012",
      "org": "UW/DeepMind",
      "parent": "—",
      "paperUrl": "https://mujoco.org/",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "奠定模型预测控制与接触动力学仿真基础",
      "summary": "MuJoCo 的核心目标是：奠定模型预测控制与接触动力学仿真基础。",
      "keyPoints": [
        "核心动机：奠定模型预测控制与接触动力学仿真基础",
        "代表机构：UW/DeepMind"
      ],
      "detail": "<p>奠定模型预测控制与接触动力学仿真基础</p>"
    },
    {
      "id": "vrep",
      "num": 3,
      "name": "CoppeliaSim",
      "fullName": "CoppeliaSim仿真平台 (CoppeliaSim)",
      "year": "2013",
      "org": "Coppelia",
      "parent": "—",
      "paperUrl": "https://www.coppeliarobotics.com/",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "分布式控制架构，支持多种物理引擎集成",
      "summary": "CoppeliaSim 的核心目标是：分布式控制架构，支持多种物理引擎集成。",
      "keyPoints": [
        "核心动机：分布式控制架构，支持多种物理引擎集成",
        "代表机构：Coppelia"
      ],
      "detail": "<p>分布式控制架构，支持多种物理引擎集成</p>"
    },
    {
      "id": "pybullet",
      "num": 4,
      "name": "PyBullet",
      "fullName": "PyBullet物理引擎 (PyBullet Physics Engine)",
      "year": "2016",
      "org": "Bullet",
      "parent": "—",
      "paperUrl": "https://pybullet.org/",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "开源轻量级物理引擎，广泛用于Sim2Real",
      "summary": "PyBullet 的核心目标是：开源轻量级物理引擎，广泛用于Sim2Real。",
      "keyPoints": [
        "核心动机：开源轻量级物理引擎，广泛用于Sim2Real",
        "代表机构：Bullet"
      ],
      "detail": "<p>开源轻量级物理引擎，广泛用于Sim2Real</p>"
    },
    {
      "id": "dm_control",
      "num": 5,
      "name": "DM Control",
      "fullName": "DeepMind控制套件 (DeepMind Control Suite)",
      "year": "2018",
      "org": "DeepMind",
      "parent": "mujoco",
      "paperUrl": "https://arxiv.org/abs/1801.00690",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "标准化连续控制基准，统一奖励结构",
      "summary": "DM Control 的核心目标是：标准化连续控制基准，统一奖励结构。",
      "keyPoints": [
        "核心动机：标准化连续控制基准，统一奖励结构",
        "演化来源：继承或改进自 mujoco",
        "代表机构：DeepMind"
      ],
      "detail": "<p>标准化连续控制基准，统一奖励结构</p>"
    },
    {
      "id": "brax",
      "num": 6,
      "name": "Brax",
      "fullName": "Brax可微分引擎 (Brax Differentiable Engine)",
      "year": "2021",
      "org": "Google",
      "parent": "mujoco",
      "paperUrl": "https://arxiv.org/abs/2106.13281",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "JAX原生可微分引擎，支持梯度优化策略",
      "summary": "Brax 的核心目标是：JAX原生可微分引擎，支持梯度优化策略。",
      "keyPoints": [
        "核心动机：JAX原生可微分引擎，支持梯度优化策略",
        "演化来源：继承或改进自 mujoco",
        "代表机构：Google"
      ],
      "detail": "<p>JAX原生可微分引擎，支持梯度优化策略</p>"
    },
    {
      "id": "ai2thor",
      "num": 7,
      "name": "AI2-THOR",
      "fullName": "AI2交互式3D环境 (AI2-THOR Interactive 3D Environment)",
      "year": "2017",
      "org": "Allen AI",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1712.05474",
      "projectUrl": "",
      "category": "interactive",
      "motivation": "具身智能从静态数据转向交互式环境",
      "summary": "AI2-THOR 的核心目标是：具身智能从静态数据转向交互式环境。",
      "keyPoints": [
        "核心动机：具身智能从静态数据转向交互式环境",
        "代表机构：Allen AI"
      ],
      "detail": "<p>具身智能从静态数据转向交互式环境</p>"
    },
    {
      "id": "virtualhome",
      "num": 8,
      "name": "VirtualHome",
      "fullName": "虚拟家庭活动仿真 (VirtualHome)",
      "year": "2018",
      "org": "MIT",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1806.07011",
      "projectUrl": "",
      "category": "interactive",
      "motivation": "将家庭活动表示为可执行程序，训练逻辑理解",
      "summary": "VirtualHome 的核心目标是：将家庭活动表示为可执行程序，训练逻辑理解。",
      "keyPoints": [
        "核心动机：将家庭活动表示为可执行程序，训练逻辑理解",
        "代表机构：MIT"
      ],
      "detail": "<p>将家庭活动表示为可执行程序，训练逻辑理解</p>"
    },
    {
      "id": "habitat",
      "num": 9,
      "name": "Habitat 1.0",
      "fullName": "Habitat具身AI平台 (Habitat Platform)",
      "year": "2019",
      "org": "Meta AI",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1904.01201",
      "projectUrl": "",
      "category": "interactive",
      "motivation": "实现万帧级超高速渲染，加速大规模RL",
      "summary": "Habitat 1.0 的核心目标是：实现万帧级超高速渲染，加速大规模RL。",
      "keyPoints": [
        "核心动机：实现万帧级超高速渲染，加速大规模RL",
        "代表机构：Meta AI"
      ],
      "detail": "<p>实现万帧级超高速渲染，加速大规模RL</p>"
    },
    {
      "id": "sapien",
      "num": 10,
      "name": "SAPIEN",
      "fullName": "SAPIEN关节物体交互环境 (SAPIEN)",
      "year": "2020",
      "org": "UCSD",
      "parent": "—",
      "paperUrl": "https://sapien.ucsd.edu/",
      "projectUrl": "",
      "category": "interactive",
      "motivation": "专注关节物体交互，提供精细部件数据集",
      "summary": "SAPIEN 的核心目标是：专注关节物体交互，提供精细部件数据集。",
      "keyPoints": [
        "核心动机：专注关节物体交互，提供精细部件数据集",
        "代表机构：UCSD"
      ],
      "detail": "<p>专注关节物体交互，提供精细部件数据集</p>"
    },
    {
      "id": "igibson",
      "num": 11,
      "name": "iGibson",
      "fullName": "iGibson物体中心仿真 (iGibson)",
      "year": "2021",
      "org": "Stanford",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2108.03272",
      "projectUrl": "",
      "category": "interactive",
      "motivation": "以物体为中心的仿真，支持大规模家务任务",
      "summary": "iGibson 的核心目标是：以物体为中心的仿真，支持大规模家务任务。",
      "keyPoints": [
        "核心动机：以物体为中心的仿真，支持大规模家务任务",
        "代表机构：Stanford"
      ],
      "detail": "<p>以物体为中心的仿真，支持大规模家务任务</p>"
    },
    {
      "id": "tdw",
      "num": 12,
      "name": "ThreeDWorld",
      "fullName": "三维世界多模态平台 (ThreeDWorld)",
      "year": "2021",
      "org": "MIT-IBM",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2007.04954",
      "projectUrl": "",
      "category": "interactive",
      "motivation": "多模态平台，支持视觉与物理音频同步模拟",
      "summary": "ThreeDWorld 的核心目标是：多模态平台，支持视觉与物理音频同步模拟。",
      "keyPoints": [
        "核心动机：多模态平台，支持视觉与物理音频同步模拟",
        "代表机构：MIT-IBM"
      ],
      "detail": "<p>多模态平台，支持视觉与物理音频同步模拟</p>"
    },
    {
      "id": "procthor",
      "num": 13,
      "name": "ProcTHOR",
      "fullName": "ProcTHOR程序化场景生成 (ProcTHOR)",
      "year": "2022",
      "org": "Allen AI",
      "parent": "ai2thor",
      "paperUrl": "https://arxiv.org/abs/2206.06994",
      "projectUrl": "",
      "category": "interactive",
      "motivation": "实现一万个室内房屋场景的程序化自动生成",
      "summary": "ProcTHOR 的核心目标是：实现一万个室内房屋场景的程序化自动生成。",
      "keyPoints": [
        "核心动机：实现一万个室内房屋场景的程序化自动生成",
        "演化来源：继承或改进自 ai2thor",
        "代表机构：Allen AI"
      ],
      "detail": "<p>实现一万个室内房屋场景的程序化自动生成</p>"
    },
    {
      "id": "omnigibson",
      "num": 14,
      "name": "OmniGibson",
      "fullName": "OmniGibson全能仿真平台 (OmniGibson)",
      "year": "2023",
      "org": "Stanford",
      "parent": "igibson",
      "paperUrl": "https://arxiv.org/abs/2311.01014",
      "projectUrl": "",
      "category": "interactive",
      "motivation": "结合Omniverse光追渲染，支持千种家务活动",
      "summary": "OmniGibson 的核心目标是：结合Omniverse光追渲染，支持千种家务活动。",
      "keyPoints": [
        "核心动机：结合Omniverse光追渲染，支持千种家务活动",
        "演化来源：继承或改进自 igibson",
        "代表机构：Stanford"
      ],
      "detail": "<p>结合Omniverse光追渲染，支持千种家务活动</p>"
    },
    {
      "id": "habitat_3",
      "num": 15,
      "name": "Habitat 3.0",
      "fullName": "Habitat 3.0社交协作平台 (Habitat 3.0)",
      "year": "2024",
      "org": "Meta AI",
      "parent": "habitat",
      "paperUrl": "https://arxiv.org/abs/2310.13724",
      "projectUrl": "",
      "category": "interactive",
      "motivation": "从静态导航演进至社交人机协作",
      "summary": "Habitat 3.0 的核心目标是：从静态导航演进至社交人机协作。",
      "keyPoints": [
        "核心动机：从静态导航演进至社交人机协作",
        "演化来源：继承或改进自 habitat",
        "代表机构：Meta AI"
      ],
      "detail": "<p>从静态导航演进至社交人机协作</p>"
    },
    {
      "id": "robosuite",
      "num": 16,
      "name": "robosuite",
      "fullName": "robosuite模块化机器人学习框架 (robosuite)",
      "year": "2020",
      "org": "Stanford",
      "parent": "mujoco",
      "paperUrl": "https://arxiv.org/abs/2009.12293",
      "projectUrl": "",
      "category": "benchmark",
      "motivation": "模块化机器人学习框架，支持多种控制器",
      "summary": "robosuite 的核心目标是：模块化机器人学习框架，支持多种控制器。",
      "keyPoints": [
        "核心动机：模块化机器人学习框架，支持多种控制器",
        "演化来源：继承或改进自 mujoco",
        "代表机构：Stanford"
      ],
      "detail": "<p>模块化机器人学习框架，支持多种控制器</p>"
    },
    {
      "id": "rlbench",
      "num": 17,
      "name": "RLBench",
      "fullName": "RLBench机器人学习基准 (RLBench)",
      "year": "2020",
      "org": "Imperial",
      "parent": "vrep",
      "paperUrl": "https://arxiv.org/abs/1909.12271",
      "projectUrl": "",
      "category": "benchmark",
      "motivation": "提供100个手工任务，支持少样本学习测试",
      "summary": "RLBench 的核心目标是：提供100个手工任务，支持少样本学习测试。",
      "keyPoints": [
        "核心动机：提供100个手工任务，支持少样本学习测试",
        "演化来源：继承或改进自 vrep",
        "代表机构：Imperial"
      ],
      "detail": "<p>提供100个手工任务，支持少样本学习测试</p>"
    },
    {
      "id": "metaworld",
      "num": 18,
      "name": "MetaWorld",
      "fullName": "MetaWorld元学习基准 (MetaWorld)",
      "year": "2020",
      "org": "Berkeley",
      "parent": "mujoco",
      "paperUrl": "https://arxiv.org/abs/1910.10897",
      "projectUrl": "",
      "category": "benchmark",
      "motivation": "50个操作任务，评估元学习与多任务泛化",
      "summary": "MetaWorld 的核心目标是：50个操作任务，评估元学习与多任务泛化。",
      "keyPoints": [
        "核心动机：50个操作任务，评估元学习与多任务泛化",
        "演化来源：继承或改进自 mujoco",
        "代表机构：Berkeley"
      ],
      "detail": "<p>50个操作任务，评估元学习与多任务泛化</p>"
    },
    {
      "id": "calvin",
      "num": 19,
      "name": "CALVIN",
      "fullName": "CALVIN语言条件长程操作基准 (CALVIN)",
      "year": "2022",
      "org": "Freiburg",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2112.03227",
      "projectUrl": "",
      "category": "benchmark",
      "motivation": "语言条件长程操作，评估零样本指令泛化",
      "summary": "CALVIN 的核心目标是：语言条件长程操作，评估零样本指令泛化。",
      "keyPoints": [
        "核心动机：语言条件长程操作，评估零样本指令泛化",
        "代表机构：Freiburg"
      ],
      "detail": "<p>语言条件长程操作，评估零样本指令泛化</p>"
    },
    {
      "id": "maniskill3",
      "num": 20,
      "name": "ManiSkill3",
      "fullName": "ManiSkill3 GPU并行操作基准 (ManiSkill3)",
      "year": "2024",
      "org": "UCSD",
      "parent": "sapien",
      "paperUrl": "https://arxiv.org/abs/2410.00425",
      "projectUrl": "",
      "category": "benchmark",
      "motivation": "关节物体引擎支撑大规模并行操作基准",
      "summary": "ManiSkill3 的核心目标是：关节物体引擎支撑大规模并行操作基准。",
      "keyPoints": [
        "核心动机：关节物体引擎支撑大规模并行操作基准",
        "演化来源：继承或改进自 sapien",
        "代表机构：UCSD"
      ],
      "detail": "<p>关节物体引擎支撑大规模并行操作基准</p>"
    },
    {
      "id": "robocasa",
      "num": 21,
      "name": "RoboCasa",
      "fullName": "RoboCasa大规模家庭任务仿真 (RoboCasa)",
      "year": "2024",
      "org": "UT Austin",
      "parent": "robosuite",
      "paperUrl": "https://arxiv.org/abs/2406.02523",
      "projectUrl": "",
      "category": "benchmark",
      "motivation": "构建大规模家庭任务仿真，扩展环境多样性",
      "summary": "RoboCasa 的核心目标是：构建大规模家庭任务仿真，扩展环境多样性。",
      "keyPoints": [
        "核心动机：构建大规模家庭任务仿真，扩展环境多样性",
        "演化来源：继承或改进自 robosuite",
        "代表机构：UT Austin"
      ],
      "detail": "<p>构建大规模家庭任务仿真，扩展环境多样性</p>"
    },
    {
      "id": "embodied_arena",
      "num": 22,
      "name": "Embodied Arena",
      "fullName": "具身智能统一评估平台 (Embodied Arena)",
      "year": "2026.03",
      "org": "Community",
      "parent": "—",
      "paperUrl": "https://embodied-arena.com/",
      "projectUrl": "",
      "category": "benchmark",
      "motivation": "统一评估平台，覆盖30+模型在22个基准",
      "summary": "Embodied Arena 的核心目标是：统一评估平台，覆盖30+模型在22个基准。",
      "keyPoints": [
        "核心动机：统一评估平台，覆盖30+模型在22个基准",
        "代表机构：Community"
      ],
      "detail": "<p>统一评估平台，覆盖30+模型在22个基准</p>"
    },
    {
      "id": "rbench",
      "num": 23,
      "name": "RBench",
      "fullName": "RBench视频生成物理评估基准 (RBench)",
      "year": "2026.01",
      "org": "THU",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2601.15282",
      "projectUrl": "",
      "category": "benchmark",
      "motivation": "针对视频生成模型的物理真实性评估基准",
      "summary": "RBench 的核心目标是：针对视频生成模型的物理真实性评估基准。",
      "keyPoints": [
        "核心动机：针对视频生成模型的物理真实性评估基准",
        "代表机构：THU"
      ],
      "detail": "<p>针对视频生成模型的物理真实性评估基准</p>"
    },
    {
      "id": "isaac_gym",
      "num": 24,
      "name": "Isaac Gym",
      "fullName": "Isaac Gym GPU并行仿真 (Isaac Gym)",
      "year": "2021",
      "org": "NVIDIA",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2108.10470",
      "projectUrl": "",
      "category": "parallel",
      "motivation": "开创GPU全并行仿真范式，效率提升数千倍",
      "summary": "Isaac Gym 的核心目标是：开创GPU全并行仿真范式，效率提升数千倍。",
      "keyPoints": [
        "核心动机：开创GPU全并行仿真范式，效率提升数千倍",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>开创GPU全并行仿真范式，效率提升数千倍</p>"
    },
    {
      "id": "isaac_sim",
      "num": 25,
      "name": "Isaac Sim",
      "fullName": "Isaac Sim高保真工业仿真 (Isaac Sim)",
      "year": "2023",
      "org": "NVIDIA",
      "parent": "isaac_gym",
      "paperUrl": "https://arxiv.org/abs/2301.04195",
      "projectUrl": "",
      "category": "parallel",
      "motivation": "从纯并行训练演进至高保真工业仿真",
      "summary": "Isaac Sim 的核心目标是：从纯并行训练演进至高保真工业仿真。",
      "keyPoints": [
        "核心动机：从纯并行训练演进至高保真工业仿真",
        "演化来源：继承或改进自 isaac_gym",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>从纯并行训练演进至高保真工业仿真</p>"
    },
    {
      "id": "mujoco_playground",
      "num": 26,
      "name": "MuJoCo Playground",
      "fullName": "MuJoCo Playground高速Sim2Real框架 (MuJoCo Playground)",
      "year": "2025.02",
      "org": "DeepMind",
      "parent": "mujoco",
      "paperUrl": "https://arxiv.org/abs/2502.08844",
      "projectUrl": "",
      "category": "parallel",
      "motivation": "高速Sim2Real框架，分钟级完成策略训练",
      "summary": "MuJoCo Playground 的核心目标是：高速Sim2Real框架，分钟级完成策略训练。",
      "keyPoints": [
        "核心动机：高速Sim2Real框架，分钟级完成策略训练",
        "演化来源：继承或改进自 mujoco",
        "代表机构：DeepMind"
      ],
      "detail": "<p>高速Sim2Real框架，分钟级完成策略训练</p>"
    },
    {
      "id": "newton",
      "num": 27,
      "name": "Newton 1.0",
      "fullName": "Newton 1.0新一代物理引擎 (Newton 1.0)",
      "year": "2026.03",
      "org": "NVIDIA",
      "parent": "isaac_sim",
      "paperUrl": "https://nvidianews.nvidia.com/news/nvidia-cosmos-world-foundation-model-platform-physical-ai",
      "projectUrl": "",
      "category": "parallel",
      "motivation": "大幅提升接触密集型任务的仿真稳定性",
      "summary": "Newton 1.0 的核心目标是：大幅提升接触密集型任务的仿真稳定性。",
      "keyPoints": [
        "核心动机：大幅提升接触密集型任务的仿真稳定性",
        "演化来源：继承或改进自 isaac_sim",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>大幅提升接触密集型任务的仿真稳定性</p>"
    },
    {
      "id": "mo_playground",
      "num": 28,
      "name": "MO-Playground",
      "fullName": "MO-Playground多目标强化学习平台 (MO-Playground)",
      "year": "2026.03",
      "org": "PKU",
      "parent": "isaac_gym",
      "paperUrl": "https://arxiv.org/abs/2603.09237",
      "projectUrl": "",
      "category": "parallel",
      "motivation": "针对多目标强化学习的大规模并行化平台",
      "summary": "MO-Playground 的核心目标是：针对多目标强化学习的大规模并行化平台。",
      "keyPoints": [
        "核心动机：针对多目标强化学习的大规模并行化平台",
        "演化来源：继承或改进自 isaac_gym",
        "代表机构：PKU"
      ],
      "detail": "<p>针对多目标强化学习的大规模并行化平台</p>"
    },
    {
      "id": "genesis",
      "num": 29,
      "name": "Genesis",
      "fullName": "Genesis通用生成式物理引擎 (Genesis)",
      "year": "2024.12",
      "org": "CMU/MIT",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2412.17492",
      "projectUrl": "",
      "category": "generative",
      "motivation": "统一物理求解+生成式场景构建，43M FPS",
      "summary": "Genesis 的核心目标是：统一物理求解+生成式场景构建，43M FPS。",
      "keyPoints": [
        "核心动机：统一物理求解+生成式场景构建，43M FPS",
        "代表机构：CMU/MIT"
      ],
      "detail": "<p>统一物理求解+生成式场景构建，43M FPS</p>"
    },
    {
      "id": "embodied_gen",
      "num": 30,
      "name": "EmbodiedGen",
      "fullName": "EmbodiedGen生成式3D世界引擎 (EmbodiedGen)",
      "year": "2025.06",
      "org": "ByteDance",
      "parent": "genesis",
      "paperUrl": "https://arxiv.org/abs/2506.10600",
      "projectUrl": "",
      "category": "generative",
      "motivation": "从单张图片或文本生成交互式3D世界",
      "summary": "EmbodiedGen 的核心目标是：从单张图片或文本生成交互式3D世界。",
      "keyPoints": [
        "核心动机：从单张图片或文本生成交互式3D世界",
        "演化来源：继承或改进自 genesis",
        "代表机构：ByteDance"
      ],
      "detail": "<p>从单张图片或文本生成交互式3D世界</p>"
    },
    {
      "id": "gs_playground",
      "num": 31,
      "name": "GS-Playground",
      "fullName": "GS-Playground高通量光真实仿真器 (GS-Playground)",
      "year": "2026.04",
      "org": "THU",
      "parent": "genesis",
      "paperUrl": "https://arxiv.org/abs/2604.25459",
      "projectUrl": "",
      "category": "generative",
      "motivation": "引入3DGS技术，10k+ FPS超高性能渲染",
      "summary": "GS-Playground 的核心目标是：引入3DGS技术，10k+ FPS超高性能渲染。",
      "keyPoints": [
        "核心动机：引入3DGS技术，10k+ FPS超高性能渲染",
        "演化来源：继承或改进自 genesis",
        "代表机构：THU"
      ],
      "detail": "<p>引入3DGS技术，10k+ FPS超高性能渲染</p>"
    }
  ],
  "categories": {
    "foundation": {
      "label": "基础物理引擎",
      "color": "#22a06b"
    },
    "interactive": {
      "label": "交互式视觉仿真",
      "color": "#5b63d3"
    },
    "benchmark": {
      "label": "基准测试平台",
      "color": "#e8820c"
    },
    "parallel": {
      "label": "大规模并行仿真",
      "color": "#c9302c"
    },
    "generative": {
      "label": "生成式仿真",
      "color": "#9c27b0"
    }
  },
  "projectUrls": {}
};
