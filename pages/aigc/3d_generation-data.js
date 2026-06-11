/**
 * 3d_generation-data.js — 由 pipeline/build.py 于 2026-06-11 14:19:36 自动生成。
 * 源文件：content/aigc/3d_generation.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "aigc",
    "topic_id": "3d_generation",
    "topic_name": "3D生成",
    "page_title": "3D生成 技术演进",
    "page_subtitle": "2026-05-12 版",
    "page_desc": "概述3D生成技术从NeRF神经辐射场、3D Gaussian Splatting到扩散模型及原生3D大模型的发展历程，涵盖文生3D、图生3D、纹理生成与3D资产生产四大方向。",
    "page_icon": "🧊",
    "hero_pills": [
      "🏷️ Text-to-3D · NeRF · 3DGS · Diffusion · LRM"
    ],
    "count_pill": "32 个算法",
    "image_base": "../../content/aigc/3d_generation/assets/",
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
        "id": "nerf",
        "x": 2020,
        "y": 100,
        "category": "representation"
      },
      {
        "id": "mip_nerf",
        "x": 2021,
        "y": 90,
        "category": "representation"
      },
      {
        "id": "instant_ngp",
        "x": 2022,
        "y": 80,
        "category": "representation"
      },
      {
        "id": "plenoxels",
        "x": 2022,
        "y": 110,
        "category": "representation"
      },
      {
        "id": "3dgs",
        "x": 2023,
        "y": 70,
        "category": "representation"
      },
      {
        "id": "hgs",
        "x": 2026,
        "y": 60,
        "category": "representation"
      },
      {
        "id": "dreamfusion",
        "x": 2022,
        "y": 200,
        "category": "optimization"
      },
      {
        "id": "magic3d",
        "x": 2022.5,
        "y": 190,
        "category": "optimization"
      },
      {
        "id": "fantasia3d",
        "x": 2023,
        "y": 210,
        "category": "optimization"
      },
      {
        "id": "prolificdreamer",
        "x": 2023.5,
        "y": 200,
        "category": "optimization"
      },
      {
        "id": "luciddreamer",
        "x": 2023.8,
        "y": 190,
        "category": "optimization"
      },
      {
        "id": "zero123",
        "x": 2023,
        "y": 300,
        "category": "feed_forward"
      },
      {
        "id": "one2345",
        "x": 2023.3,
        "y": 310,
        "category": "feed_forward"
      },
      {
        "id": "mvdream",
        "x": 2024,
        "y": 290,
        "category": "feed_forward"
      },
      {
        "id": "wonder3d",
        "x": 2024.3,
        "y": 300,
        "category": "feed_forward"
      },
      {
        "id": "lrm",
        "x": 2024,
        "y": 320,
        "category": "feed_forward"
      },
      {
        "id": "instant3d",
        "x": 2024.3,
        "y": 330,
        "category": "feed_forward"
      },
      {
        "id": "ilrm",
        "x": 2026,
        "y": 310,
        "category": "feed_forward"
      },
      {
        "id": "vgg_t3",
        "x": 2026.2,
        "y": 320,
        "category": "feed_forward"
      },
      {
        "id": "4d_lrm",
        "x": 2025.8,
        "y": 340,
        "category": "feed_forward"
      },
      {
        "id": "yonosplat",
        "x": 2026.4,
        "y": 300,
        "category": "feed_forward"
      },
      {
        "id": "texture",
        "x": 2023,
        "y": 400,
        "category": "texture"
      },
      {
        "id": "text2tex",
        "x": 2023.5,
        "y": 410,
        "category": "texture"
      },
      {
        "id": "trellis2",
        "x": 2025.8,
        "y": 400,
        "category": "texture"
      },
      {
        "id": "hunyuan3d_21",
        "x": 2026.2,
        "y": 410,
        "category": "texture"
      },
      {
        "id": "dragtex",
        "x": 2026.4,
        "y": 420,
        "category": "texture"
      },
      {
        "id": "ar3dr1",
        "x": 2026,
        "y": 500,
        "category": "native_3d"
      },
      {
        "id": "vist3a",
        "x": 2026.2,
        "y": 510,
        "category": "native_3d"
      },
      {
        "id": "lyra",
        "x": 2026.4,
        "y": 520,
        "category": "native_3d"
      },
      {
        "id": "hunyuan3d_3",
        "x": 2026.3,
        "y": 490,
        "category": "native_3d"
      },
      {
        "id": "seed3d_2",
        "x": 2026.5,
        "y": 500,
        "category": "native_3d"
      },
      {
        "id": "rodin_gen2",
        "x": 2026.6,
        "y": 510,
        "category": "native_3d"
      }
    ],
    "edges": [
      {
        "from": "nerf",
        "to": "mip_nerf",
        "label": "抗锯齿"
      },
      {
        "from": "nerf",
        "to": "instant_ngp",
        "label": "哈希加速"
      },
      {
        "from": "nerf",
        "to": "plenoxels",
        "label": "去神经网络"
      },
      {
        "from": "instant_ngp",
        "to": "3dgs",
        "label": "显式高斯"
      },
      {
        "from": "3dgs",
        "to": "hgs",
        "label": "消除伪影"
      },
      {
        "from": "nerf",
        "to": "dreamfusion",
        "label": "SDS蒸馏"
      },
      {
        "from": "dreamfusion",
        "to": "magic3d",
        "label": "两阶段"
      },
      {
        "from": "dreamfusion",
        "to": "fantasia3d",
        "label": "解耦几何"
      },
      {
        "from": "dreamfusion",
        "to": "prolificdreamer",
        "label": "VSD改进"
      },
      {
        "from": "prolificdreamer",
        "to": "luciddreamer",
        "label": "ISM匹配"
      },
      {
        "from": "zero123",
        "to": "one2345",
        "label": "快速重建"
      },
      {
        "from": "zero123",
        "to": "mvdream",
        "label": "多视图"
      },
      {
        "from": "mvdream",
        "to": "wonder3d",
        "label": "跨域扩散"
      },
      {
        "from": "zero123",
        "to": "lrm",
        "label": "大模型"
      },
      {
        "from": "lrm",
        "to": "instant3d",
        "label": "稀疏视图"
      },
      {
        "from": "lrm",
        "to": "ilrm",
        "label": "迭代细化"
      },
      {
        "from": "ilrm",
        "to": "vgg_t3",
        "label": "TTT扩展"
      },
      {
        "from": "lrm",
        "to": "4d_lrm",
        "label": "4D动态"
      },
      {
        "from": "ilrm",
        "to": "yonosplat",
        "label": "单模型"
      },
      {
        "from": "texture",
        "to": "text2tex",
        "label": "渐进式"
      },
      {
        "from": "text2tex",
        "to": "trellis2",
        "label": "PBR材质"
      },
      {
        "from": "trellis2",
        "to": "hunyuan3d_21",
        "label": "质量提升"
      },
      {
        "from": "hunyuan3d_21",
        "to": "dragtex",
        "label": "交互编辑"
      },
      {
        "from": "luciddreamer",
        "to": "ar3dr1",
        "label": "强化学习"
      },
      {
        "from": "luciddreamer",
        "to": "vist3a",
        "label": "视频蒸馏"
      },
      {
        "from": "vist3a",
        "to": "lyra",
        "label": "自蒸馏"
      },
      {
        "from": "instant3d",
        "to": "hunyuan3d_3",
        "label": "原生分辨率"
      },
      {
        "from": "hunyuan3d_3",
        "to": "seed3d_2",
        "label": "DiT架构"
      },
      {
        "from": "seed3d_2",
        "to": "rodin_gen2",
        "label": "拓扑优化"
      }
    ],
    "milestones": [
      {
        "id": "nerf",
        "title": "NeRF开创神经隐式表示",
        "year": "2020",
        "desc": "提出神经辐射场概念，利用MLP和体渲染实现照片级新视角合成，开启神经渲染时代"
      },
      {
        "id": "dreamfusion",
        "title": "DreamFusion打通2D到3D",
        "year": "2022",
        "desc": "提出分数蒸馏采样(SDS)，利用2D扩散模型先验优化3D表示，开创文生3D现代范式"
      },
      {
        "id": "3dgs",
        "title": "3DGS革新实时渲染",
        "year": "2023",
        "desc": "显式3D高斯泼溅实现100+FPS实时渲染，取代NeRF成为2026年主流表征方法"
      }
    ]
  },
  "algos": [
    {
      "id": "nerf",
      "num": 1,
      "name": "NeRF",
      "fullName": "神经辐射场 (Neural Radiance Fields)",
      "year": "2020",
      "org": "UC Berkeley",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2003.08934",
      "projectUrl": "",
      "category": "representation",
      "motivation": "MLP+体渲染实现连续隐式表示",
      "summary": "NeRF 的核心目标是：MLP+体渲染实现连续隐式表示。",
      "keyPoints": [
        "核心动机：MLP+体渲染实现连续隐式表示",
        "代表机构：UC Berkeley"
      ],
      "detail": "<p>MLP+体渲染实现连续隐式表示</p>"
    },
    {
      "id": "mip_nerf",
      "num": 2,
      "name": "Mip-NeRF",
      "fullName": "抗锯齿神经辐射场 (Mip-NeRF)",
      "year": "2021",
      "org": "Google Research",
      "parent": "nerf",
      "paperUrl": "https://arxiv.org/abs/2103.13415",
      "projectUrl": "",
      "category": "representation",
      "motivation": "集成位置编码解决多尺度渲染",
      "summary": "Mip-NeRF 的核心目标是：集成位置编码解决多尺度渲染。",
      "keyPoints": [
        "核心动机：集成位置编码解决多尺度渲染",
        "演化来源：继承或改进自 nerf",
        "代表机构：Google Research"
      ],
      "detail": "<p>集成位置编码解决多尺度渲染</p>"
    },
    {
      "id": "instant_ngp",
      "num": 3,
      "name": "Instant-NGP",
      "fullName": "即时神经图形基元 (Instant Neural Graphics Primitives)",
      "year": "2022",
      "org": "NVIDIA",
      "parent": "nerf",
      "paperUrl": "https://arxiv.org/abs/2201.05989",
      "projectUrl": "",
      "category": "representation",
      "motivation": "哈希编码将训练加速1000倍",
      "summary": "Instant-NGP 的核心目标是：哈希编码将训练加速1000倍。",
      "keyPoints": [
        "核心动机：哈希编码将训练加速1000倍",
        "演化来源：继承或改进自 nerf",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>哈希编码将训练加速1000倍</p>"
    },
    {
      "id": "plenoxels",
      "num": 4,
      "name": "Plenoxels",
      "fullName": "光场体素 (Plenoxels)",
      "year": "2022",
      "org": "UC Berkeley",
      "parent": "nerf",
      "paperUrl": "https://arxiv.org/abs/2112.05131",
      "projectUrl": "",
      "category": "representation",
      "motivation": "稀疏体素+球谐函数无需神经网络",
      "summary": "Plenoxels 的核心目标是：稀疏体素+球谐函数无需神经网络。",
      "keyPoints": [
        "核心动机：稀疏体素+球谐函数无需神经网络",
        "演化来源：继承或改进自 nerf",
        "代表机构：UC Berkeley"
      ],
      "detail": "<p>稀疏体素+球谐函数无需神经网络</p>"
    },
    {
      "id": "3dgs",
      "num": 5,
      "name": "3D-GS",
      "fullName": "3D高斯泼溅 (3D Gaussian Splatting)",
      "year": "2023",
      "org": "INRIA",
      "parent": "instant_ngp",
      "paperUrl": "https://arxiv.org/abs/2308.04079",
      "projectUrl": "",
      "category": "representation",
      "motivation": "显式高斯实现100+FPS实时渲染",
      "summary": "3D-GS 的核心目标是：显式高斯实现100+FPS实时渲染。",
      "keyPoints": [
        "核心动机：显式高斯实现100+FPS实时渲染",
        "演化来源：继承或改进自 instant_ngp",
        "代表机构：INRIA"
      ],
      "detail": "<p>显式高斯实现100+FPS实时渲染</p>"
    },
    {
      "id": "hgs",
      "num": 6,
      "name": "HGS",
      "fullName": "硬高斯泼溅 (Hard Gaussian Splatting)",
      "year": "2026.01",
      "org": "AAAI",
      "parent": "3dgs",
      "paperUrl": "https://arxiv.org/abs/2601.05000",
      "projectUrl": "",
      "category": "representation",
      "motivation": "解决模糊和针状伪影问题",
      "summary": "HGS 的核心目标是：解决模糊和针状伪影问题。",
      "keyPoints": [
        "核心动机：解决模糊和针状伪影问题",
        "演化来源：继承或改进自 3dgs",
        "代表机构：AAAI"
      ],
      "detail": "<p>解决模糊和针状伪影问题</p>"
    },
    {
      "id": "dreamfusion",
      "num": 7,
      "name": "DreamFusion",
      "fullName": "梦境融合 (DreamFusion)",
      "year": "2022",
      "org": "Google Research",
      "parent": "nerf",
      "paperUrl": "https://arxiv.org/abs/2209.14988",
      "projectUrl": "",
      "category": "optimization",
      "motivation": "提出SDS Loss开创文生3D范式",
      "summary": "DreamFusion 的核心目标是：提出SDS Loss开创文生3D范式。",
      "keyPoints": [
        "核心动机：提出SDS Loss开创文生3D范式",
        "演化来源：继承或改进自 nerf",
        "代表机构：Google Research"
      ],
      "detail": "<p>提出SDS Loss开创文生3D范式</p>"
    },
    {
      "id": "magic3d",
      "num": 8,
      "name": "Magic3D",
      "fullName": "魔法3D (Magic3D)",
      "year": "2022",
      "org": "NVIDIA",
      "parent": "dreamfusion",
      "paperUrl": "https://arxiv.org/abs/2211.10440",
      "projectUrl": "",
      "category": "optimization",
      "motivation": "两阶段粗到精提升分辨率",
      "summary": "Magic3D 提出了一种两阶段粗到细（coarse-to-fine）的文本到3D生成框架，第一阶段使用基于哈希网格的神经辐射场在低分辨率下快速建立粗糙几何，第二阶段切换为可微分光栅化的纹理网格并借助潜在扩散模型在高分辨率下精细优化，在比 DreamFusion 快 2 倍的同时显著提升了生成质量。",
      "keyPoints": [
        "<strong>两阶段场景表示</strong>：粗阶段采用 Instant NGP 哈希网格编码 + 体渲染（64×64），细阶段采用 DMTet 可变形四面体网格 + 可微光栅化（512×512）",
        "<strong>两阶段扩散先验</strong>：粗阶段使用 eDiff-I 基础扩散模型（像素空间，64×64），细阶段使用 Stable Diffusion 潜在扩散模型（潜空间 64×64，对应图像 512×512）",
        "<strong>SDS 损失扩展</strong>：将 DreamFusion 的 Score Distillation Sampling 扩展到潜在扩散模型，通过链式法则引入编码器梯度 <span class=\"kb-math kb-math-inline\">\\partial z / \\partial x</span>",
        "<strong>高效稀疏表示</strong>：利用八叉树空间跳跃和密度体素剪枝加速体渲染，MLP 预测法线代替有限差分以降低计算开销",
        "<strong>密度到 SDF 转换</strong>：通过减去非零常数将粗阶段密度场转换为 SDF，实现从神经场到网格的无缝初始化",
        "<strong>可控3D生成</strong>：支持 DreamBooth 个性化、基于 prompt 的编辑和图像风格迁移",
        "<strong>性能</strong>：总优化时间 40 分钟（8×A100），比 DreamFusion 快 2 倍，用户偏好率 61.7%"
      ],
      "detail": "<h5>框架总览</h5>\n<p><img alt=\"Magic3D 两阶段框架\" src=\"https://ar5iv.labs.arxiv.org/html/2211.10440/assets/figs/overview.png\" />\n<em>图：Magic3D 的两阶段粗到细优化框架。第一阶段使用低分辨率扩散先验优化稀疏神经辐射场；第二阶段将其转换为纹理网格，使用高分辨率潜在扩散模型进行精细优化。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Magic3D 两阶段优化伪代码\n\n# ========== Stage 1: Coarse (Neural Field) ==========\n# 场景模型: Instant NGP hash grid + 两个单层MLP (albedo/density + normals)\n# 扩散先验: eDiff-I base model (64×64 像素空间)\ninit_occupancy_grid(resolution=256^3, value=20)\n\nfor iter in range(5000):\n    camera = sample_random_camera()\n    x = render_volume(hash_grid, camera, resolution=64)  # 体渲染\n    t = sample_timestep()\n    epsilon = sample_noise()\n    x_t = add_noise(x, epsilon, t)\n\n    # SDS 梯度 (Eq. 1)\n    eps_pred = diffusion_model(x_t, text_embed, t)\n    grad_SDS = w(t) * (eps_pred - epsilon) * dx/dtheta\n    update(hash_grid, grad_SDS)\n\n    if iter % 10 == 0:\n        update_occupancy_grid(decay=0.6)\n\n# ========== Stage 2: Fine (Textured Mesh) ==========\n# 场景模型: DMTet mesh + neural color field\n# 扩散先验: Stable Diffusion LDM (latent 64×64 → image 512×512)\nsdf = density_field - constant  # 密度→SDF转换\nmesh = marching_tetrahedra(sdf, deformations)\ntexture = coarse_color_field  # 继承粗阶段颜色场\n\nfor iter in range(3000):\n    camera = sample_random_camera(zoom_in=True)  # 增大焦距\n    x = rasterize(mesh, texture, camera, resolution=512)  # 可微光栅化\n    z = LDM_encoder(x)  # 编码到潜空间\n    t = sample_timestep()\n    epsilon = sample_noise()\n    z_t = add_noise(z, epsilon, t)\n\n    # LDM SDS 梯度 (Eq. 2)\n    eps_pred = LDM(z_t, text_embed, t)\n    grad_SDS = w(t) * (eps_pred - epsilon) * dz/dx * dx/dtheta\n\n    # 更新 SDF 值 s_i、顶点偏移 Δv_i 和纹理\n    update(mesh_sdf, mesh_deform, texture, grad_SDS)\n\n    # 面法线平滑正则化\n    smooth_loss = angular_diff_adjacent_faces(mesh)\n    update(mesh, smooth_loss)\n</code></pre>\n<h5>动机与背景</h5>\n<p>DreamFusion 首次证明了利用预训练 2D 扩散模型的先验知识，通过 Score Distillation Sampling (SDS) 损失优化 3D 场景表示的可行性。然而，DreamFusion 存在两个关键限制：</p>\n<ol>\n<li><strong>分辨率瓶颈</strong>：其扩散模型（Imagen base model）仅在 64×64 分辨率下操作，无法生成高分辨率几何和纹理</li>\n<li><strong>计算效率低</strong>：基于 Mip-NeRF 360 的大型全局 MLP 进行体渲染计算昂贵且内存密集，难以扩展到高分辨率图像</li>\n</ol>\n<p>Magic3D 的核心思想是：<strong>将问题分解为两个阶段，每个阶段使用最适合其需求的场景表示和扩散先验</strong>。</p>\n<h5>核心机制详解</h5>\n<p><strong>1. Score Distillation Sampling (SDS)</strong></p>\n<p>SDS 的核心思想是利用预训练扩散模型作为评判者，引导 3D 场景的优化。给定场景参数 <span class=\"kb-math kb-math-inline\">\\theta</span>，渲染函数 <span class=\"kb-math kb-math-inline\">g(\\theta)</span> 生成图像 <span class=\"kb-math kb-math-inline\">x</span>，SDS 梯度为：</p>\n<div class=\"kb-math kb-math-display\">\\nabla_{\\theta}\\mathcal{L}_{\\text{SDS}}(\\phi, g(\\theta)) = \\mathbb{E}_{t,\\epsilon}\\left[w(t)(\\epsilon_{\\phi}(x_t; y, t) - \\epsilon)\\frac{\\partial x}{\\partial \\theta}\\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\epsilon_{\\phi}</span> 是扩散模型的噪声预测网络，<span class=\"kb-math kb-math-inline\">y</span> 是文本嵌入，<span class=\"kb-math kb-math-inline\">w(t)</span> 是权重函数。直觉上，SDS 梯度将渲染图像\"推向\"扩散模型认为在给定文本条件下概率密度高的区域。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：SDS 不需要对扩散模型本身进行反向传播（U-Net 梯度被截断），只需要其预测的噪声方向来指导场景参数的更新。</div>\n<p><strong>2. 潜在扩散模型的 SDS 扩展</strong></p>\n<p>在细阶段，Magic3D 使用 Stable Diffusion（一种潜在扩散模型 LDM）。LDM 在潜空间 <span class=\"kb-math kb-math-inline\">z</span> 而非像素空间 <span class=\"kb-math kb-math-inline\">x</span> 上操作，因此 SDS 梯度需要通过编码器的链式法则：</p>\n<div class=\"kb-math kb-math-display\">\\nabla_{\\theta}\\mathcal{L}_{\\text{SDS}}(\\phi, g(\\theta)) = \\mathbb{E}_{t,\\epsilon}\\left[w(t)(\\epsilon_{\\phi}(z_t; y, t) - \\epsilon)\\frac{\\partial z}{\\partial x}\\frac{\\partial x}{\\partial \\theta}\\right]</div>\n<div class=\"key-point\">💡 <strong>关键</strong>：尽管输出图像分辨率为 512×512，扩散模型的计算仍在 64×64 的潜空间进行，计算量的增加主要来自高分辨率图像的渲染梯度 <span class=\"kb-math kb-math-inline\">\\partial x / \\partial \\theta</span> 和编码器梯度 <span class=\"kb-math kb-math-inline\">\\partial z / \\partial x</span>。</div>\n<p><strong>3. 粗阶段：哈希网格神经场</strong></p>\n<p>粗阶段采用 Instant NGP 的多分辨率哈希网格编码替代 Mip-NeRF 360 的大型 MLP，大幅降低计算成本。具体设计包括：</p>\n<ul>\n<li><strong>双 MLP 架构</strong>：一个单层 MLP 预测 albedo 和密度，另一个预测法线。使用 MLP 直接预测法线而非通过有限差分估计，显著减少计算开销</li>\n<li><strong>稀疏加速</strong>：维护 256³ 分辨率的占用网格，每 10 次迭代更新（衰减因子 0.6），构建八叉树进行空间跳跃</li>\n<li><strong>环境贴图</strong>：使用极小的 MLP（隐藏维度 16）建模背景，学习率降低 10 倍，防止模型将物体信息\"泄漏\"到背景中</li>\n</ul>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：MLP 预测的法线在体渲染中不需要严格对齐等值面法线，因为体渲染中粒子的朝向是连续位置上的属性。精确法线在细阶段的真实表面渲染中自然获得。</div>\n<p><strong>4. 细阶段：可变形四面体网格</strong></p>\n<p>细阶段使用 DMTet（Deformable Marching Tetrahedra）表示 3D 形状：</p>\n<ul>\n<li><strong>几何表示</strong>：在四面体网格 <span class=\"kb-math kb-math-inline\">(V_T, T)</span> 的每个顶点 <span class=\"kb-math kb-math-inline\">\\mathbf{v}_i</span> 上存储 SDF 值 <span class=\"kb-math kb-math-inline\">s_i \\in \\mathbb{R}</span> 和顶点偏移 <span class=\"kb-math kb-math-inline\">\\Delta\\mathbf{v}_i \\in \\mathbb{R}^3</span></li>\n<li><strong>网格提取</strong>：通过可微分 Marching Tetrahedra 算法从 SDF 提取表面网格</li>\n<li><strong>纹理表示</strong>：使用粗阶段的神经颜色场作为体积纹理</li>\n<li><strong>初始化</strong>：将粗阶段的密度场减去非零常数转换为初始 SDF</li>\n</ul>\n<p>关键优化技巧：\n- <strong>焦距放大</strong>：渲染时增大焦距以放大物体细节，这是恢复高频细节的关键步骤\n- <strong>面平滑正则化</strong>：对网格相邻面的法线角度差异进行正则化，在高方差的 SDS 梯度监督下保持几何平滑\n- <strong>可微抗锯齿</strong>：使用可微抗锯齿将前景物体与预训练的环境贴图背景合成</p>\n<h5>与 DreamFusion 的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方面</th>\n<th>DreamFusion</th>\n<th>Magic3D</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>场景表示</td>\n<td>Mip-NeRF 360 (全局MLP)</td>\n<td>Stage1: Hash Grid; Stage2: DMTet Mesh</td>\n</tr>\n<tr>\n<td>扩散先验</td>\n<td>Imagen (64×64)</td>\n<td>Stage1: eDiff-I (64×64); Stage2: Stable Diffusion (512×512)</td>\n</tr>\n<tr>\n<td>渲染方式</td>\n<td>体渲染</td>\n<td>Stage1: 体渲染; Stage2: 可微光栅化</td>\n</tr>\n<tr>\n<td>优化分辨率</td>\n<td>64×64</td>\n<td>64×64 → 512×512</td>\n</tr>\n<tr>\n<td>法线计算</td>\n<td>有限差分</td>\n<td>MLP 直接预测</td>\n</tr>\n<tr>\n<td>输出格式</td>\n<td>NeRF (不可直接用于图形引擎)</td>\n<td>纹理网格 (可直接导入标准图形软件)</td>\n</tr>\n<tr>\n<td>优化时间</td>\n<td>~1.5 小时</td>\n<td>~40 分钟</td>\n</tr>\n</tbody>\n</table></div>\n<h5>可控生成扩展</h5>\n<p>Magic3D 还展示了三种可控生成能力：</p>\n<ol>\n<li><strong>DreamBooth 个性化</strong>：用少量目标图像微调 eDiff-I 和 LDM，将特定实例绑定到 [V] 标识符，然后在 3D 优化中使用包含 [V] 的 prompt</li>\n<li><strong>Prompt 编辑</strong>：三阶段流程——(a) 用基础 prompt 训练粗模型 → (b) 修改 prompt 并用 LDM 微调 NeRF → (c) 用修改后的 prompt 优化网格。可修改纹理或几何</li>\n<li><strong>图像风格迁移</strong>：将参考图像作为扩散模型的条件输入，通过调节文本引导权重和联合引导权重控制风格强度</li>\n</ol>",
      "quiz": {
        "q": "Magic3D 在细阶段（Stage 2）选择纹理网格而非继续使用神经辐射场的主要原因是什么？",
        "options": [
          "纹理网格的表达能力比神经辐射场更强",
          "可微光栅化在高分辨率下比体渲染更高效，能在合理的内存和计算预算内渲染 512×512 图像",
          "神经辐射场无法表示 SDF，不兼容 Marching Tetrahedra 算法",
          "潜在扩散模型只能处理网格渲染的图像，不支持体渲染输出"
        ],
        "answer": 1,
        "explain": "体渲染需要沿光线密集采样并逐点评估神经网络，在 512×512 分辨率下内存和计算开销过大；而可微光栅化的计算量随分辨率增长更为温和，是高分辨率优化的合适选择。"
      }
    },
    {
      "id": "fantasia3d",
      "num": 9,
      "name": "Fantasia3D",
      "fullName": "幻想3D (Fantasia3D)",
      "year": "2023",
      "org": "Alibaba",
      "parent": "dreamfusion",
      "paperUrl": "https://arxiv.org/abs/2303.13873",
      "projectUrl": "",
      "category": "optimization",
      "motivation": "解耦几何与外观学习PBR材质",
      "summary": "Fantasia3D 提出将文本到3D生成中的几何与外观**解耦建模**：几何阶段利用 DMTet 混合表示配合法线图编码进行 SDS 优化，外观阶段引入 PBR（BRDF）材质模型实现逼真渲染，生成的3D资产可直接导入图形引擎进行重光照、编辑和物理仿真。",
      "keyPoints": [
        "<strong>解耦设计</strong>：将几何建模与外观建模分为两个独立阶段，分别优化，避免耦合学习导致的质量退化",
        "<strong>混合场景表示</strong>：采用 DMTet（Deep Marching Tetrahedra）作为几何表示，兼具隐式灵活性与显式网格的高效渲染",
        "<strong>法线图编码驱动几何</strong>：将渲染的法线图（而非着色图像）作为 Stable Diffusion 的输入，利用扩散模型对法线分布的先验知识指导几何优化",
        "<strong>PBR 材质建模</strong>：引入空间可变 BRDF（漫反射 <span class=\"kb-math kb-math-inline\">k_d</span>、粗糙度/金属度 <span class=\"kb-math kb-math-inline\">k_{rm}</span>、法线扰动 <span class=\"kb-math kb-math-inline\">k_n</span>），通过 MLP 预测材质参数并用物理渲染方程生成图像",
        "<strong>粗到细几何策略</strong>：几何优化分两阶段，先用大权重 <span class=\"kb-math kb-math-inline\">\\omega(t)=\\sigma^2</span> 获取整体形状，后切换 <span class=\"kb-math kb-math-inline\">w(t)=\\sigma^2\\sqrt{1-\\sigma^2}</span> 精细化细节",
        "<strong>用户引导生成</strong>：支持以自定义3D形状初始化 DMTet，实现可控生成",
        "<strong>图形引擎兼容</strong>：输出带 PBR 材质的标准网格，可直接用于 Blender 等引擎的重光照、编辑与物理仿真"
      ],
      "detail": "<h5>整体框架</h5>\n<p><img alt=\"Fantasia3D 几何建模流程\" src=\"https://ar5iv.labs.arxiv.org/html/2303.13873/assets/x3.png\" />\n<em>图：Fantasia3D 几何建模阶段。DMTet 提取的网格渲染为法线图和 mask，编码后送入预训练 Stable Diffusion 计算 SDS 损失，梯度回传更新 MLP Ψ 的参数。</em></p>\n<p><img alt=\"Fantasia3D 外观建模流程\" src=\"https://ar5iv.labs.arxiv.org/html/2303.13873/assets/x4.png\" />\n<em>图：Fantasia3D 外观建模阶段。MLP Γ 预测每个表面点的 BRDF 材质参数，通过物理渲染方程生成彩色图像，再经 SDS 损失优化材质网络。</em></p>\n<p>Fantasia3D 的核心思想是将文本到3D生成解耦为<strong>几何建模</strong>和<strong>外观建模</strong>两个独立阶段，分别使用不同的网络和优化策略。</p>\n<h5>预备知识：SDS 损失与 DMTet</h5>\n<p><strong>Score Distillation Sampling (SDS)</strong> 是 DreamFusion 提出的核心技术，利用预训练的文本到图像扩散模型作为先验来指导3D生成。其梯度公式为：</p>\n<div class=\"kb-math kb-math-display\">\\nabla_\\theta \\mathcal{L}_{\\text{SDS}}(\\phi, x) = \\mathbb{E}\\left[w(t)\\left(\\hat{\\epsilon}_\\phi(z_t^x; y, t) - \\epsilon\\right)\\frac{\\partial z^x}{\\partial x}\\frac{\\partial x}{\\partial \\theta}\\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\hat{\\epsilon}_\\phi</span> 是预训练扩散模型的噪声预测，<span class=\"kb-math kb-math-inline\">z_t^x</span> 是对渲染图像 <span class=\"kb-math kb-math-inline\">x</span> 的潜变量添加噪声后的结果，<span class=\"kb-math kb-math-inline\">y</span> 是文本提示，<span class=\"kb-math kb-math-inline\">w(t)</span> 是与时间步相关的权重函数。</p>\n<p><strong>DMTet（Deep Marching Tetrahedra）</strong> 是一种混合3D表示，在规则四面体网格的每个顶点 <span class=\"kb-math kb-math-inline\">v_i</span> 上存储 SDF 值 <span class=\"kb-math kb-math-inline\">s_i</span> 和位移 <span class=\"kb-math kb-math-inline\">\\Delta v_i</span>，通过 Marching Tetrahedra 算法提取显式三角网格：</p>\n<div class=\"kb-math kb-math-display\">s_i, \\Delta v_i = \\Psi(\\beta(v_i); \\theta)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\Psi</span> 是带 hash-grid 位置编码 <span class=\"kb-math kb-math-inline\">\\beta</span> 的 MLP，<span class=\"kb-math kb-math-inline\">\\theta</span> 为可学习参数。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：DMTet 的优势在于既能通过可微分的 Marching Tetrahedra 实现端到端梯度传播，又能输出高质量的显式三角网格，直接兼容传统图形管线。</div>\n<h5>几何建模阶段</h5>\n<p>几何建模的核心创新是<strong>使用法线图编码作为扩散模型的输入</strong>，而非传统的着色图像。具体流程：</p>\n<ol>\n<li><strong>网格提取</strong>：MLP <span class=\"kb-math kb-math-inline\">\\Psi</span> 预测四面体顶点的 SDF 值和位移，通过 Marching Tetrahedra 提取三角网格</li>\n<li><strong>法线图渲染</strong>：从随机采样的相机视角，通过可微分光栅化渲染法线图 <span class=\"kb-math kb-math-inline\">I_n</span> 和二值 mask <span class=\"kb-math kb-math-inline\">I_m</span></li>\n<li><strong>图像组合</strong>：将法线图与 mask 组合为 RGB 图像 <span class=\"kb-math kb-math-inline\">I_g = I_n \\odot I_m</span></li>\n<li><strong>SDS 优化</strong>：将 <span class=\"kb-math kb-math-inline\">I_g</span> 编码到潜空间，计算 SDS 损失并回传梯度更新 <span class=\"kb-math kb-math-inline\">\\Psi</span> 的参数</li>\n</ol>\n<p>SDS 梯度对几何参数 <span class=\"kb-math kb-math-inline\">\\theta</span> 的更新公式：</p>\n<div class=\"kb-math kb-math-display\">\\nabla_\\theta \\mathcal{L}_{\\text{SDS}}(\\phi, x) = \\mathbb{E}\\left[w(t)\\left(\\hat{\\epsilon}_\\phi(z_t^x; y, t) - \\epsilon\\right)\\frac{\\partial x}{\\partial \\theta}\\frac{\\partial z^x}{\\partial x}\\right]</div>\n<div class=\"key-point\">💡 <strong>为什么用法线图？</strong> 法线图的值域为 <span class=\"kb-math kb-math-inline\">(-1, 1)</span>，恰好与潜空间扩散所需的数据范围对齐。更重要的是，训练 Stable Diffusion 的 LAION-5B 数据集中包含大量法线图数据，使得扩散模型天然具备处理法线图的能力。实验表明，使用着色图像替代法线图会导致几何扭曲。</div>\n<p><strong>粗到细策略</strong>：几何优化分两阶段调整 SDS 权重函数：\n- <strong>粗阶段</strong>：<span class=\"kb-math kb-math-inline\">w(t) = \\sigma^2</span>，鼓励大范围形状变化，快速建立整体轮廓\n- <strong>细阶段</strong>：<span class=\"kb-math kb-math-inline\">w(t) = \\sigma^2\\sqrt{1-\\sigma^2}</span>，抑制大幅更新，精细化表面细节</p>\n<h5>外观建模阶段</h5>\n<p>几何固定后，进入外观建模阶段。Fantasia3D 引入<strong>物理渲染（PBR）材质模型</strong>，使用 MLP <span class=\"kb-math kb-math-inline\">\\Gamma</span> 预测每个表面点的空间可变 BRDF 参数：</p>\n<div class=\"kb-math kb-math-display\">(k_d, k_{rm}, k_n) = \\Gamma(\\beta(p); \\gamma)</div>\n<p>其中：\n- <span class=\"kb-math kb-math-inline\">k_d \\in \\mathbb{R}^3</span>：漫反射颜色\n- <span class=\"kb-math kb-math-inline\">k_{rm} \\in \\mathbb{R}^2</span>：粗糙度 <span class=\"kb-math kb-math-inline\">r</span> 和金属度 <span class=\"kb-math kb-math-inline\">m</span>\n- <span class=\"kb-math kb-math-inline\">k_n \\in \\mathbb{R}^3</span>：切空间法线扰动，增强表面光照细节</p>\n<p>镜面反射项由金属度和漫反射计算：<span class=\"kb-math kb-math-inline\">k_s = (1-m) \\cdot 0.04 + m \\cdot k_d</span></p>\n<p><strong>渲染方程</strong>采用标准的 Cook-Torrance BRDF 模型：</p>\n<div class=\"kb-math kb-math-display\">L(p, \\omega) = L_d(p) + L_s(p, \\omega)</div>\n<div class=\"kb-math kb-math-display\">L_d(p) = k_d(1-m)\\int_{\\Omega} L_i(p, \\omega_i)(\\omega_i \\cdot n_p)\\,\\mathrm{d}\\omega_i</div>\n<div class=\"kb-math kb-math-display\">L_s(p, \\omega) = \\int_{\\Omega} \\frac{DFG}{4(\\omega \\cdot n_p)(\\omega_i \\cdot n_p)} L_i(p, \\omega_i)(\\omega_i \\cdot n_p)\\,\\mathrm{d}\\omega_i</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">D</span> 为 GGX 法线分布函数（由粗糙度 <span class=\"kb-math kb-math-inline\">r</span> 参数化），<span class=\"kb-math kb-math-inline\">F</span> 为 Fresnel 项，<span class=\"kb-math kb-math-inline\">G</span> 为遮蔽-阴影项。入射光 <span class=\"kb-math kb-math-inline\">L_i</span> 由现成的环境贴图提供，半球积分通过 split-sum 方法高效计算。</p>\n<p>渲染得到的彩色图像 <span class=\"kb-math kb-math-inline\">x = \\{L(p, \\omega)\\}</span> 送入 Stable Diffusion 计算 SDS 损失，梯度回传更新材质网络 <span class=\"kb-math kb-math-inline\">\\Gamma</span> 的参数 <span class=\"kb-math kb-math-inline\">\\gamma</span>。</p>\n<div class=\"warn-box\">⚠️ <strong>外观阶段的权重调度</strong>：为避免颜色过饱和，外观建模采用不同的权重策略——早期使用 <span class=\"kb-math kb-math-inline\">w(t) = \\sigma^2\\sqrt{1-\\sigma^2}</span>，后期切换为 <span class=\"kb-math kb-math-inline\">w(t) = 1/\\sigma^2</span>。</div>\n<h5>纹理导出与后处理</h5>\n<p>训练完成后，通过 xatlas 生成 UV 映射，将 MLP 预测的材质参数采样为标准2D纹理贴图。为消除纹理接缝，采用 <strong>UV edge padding</strong> 技术扩展 UV 岛边界并填充空白区域。</p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Fantasia3D 训练流程伪代码\n\n# ===== 阶段 1: 几何建模 =====\n# 初始化 DMTet 四面体网格（椭球或用户提供的形状）\n# MLP Ψ: 预测 SDF 值和顶点位移\nfor iteration in geometry_iterations:\n    # 随机采样 24 个相机视角\n    cameras = sample_cameras(n=24)\n\n    # DMTet 提取三角网格\n    sdf, delta_v = Ψ(hash_encode(vertices))\n    mesh = marching_tetrahedra(sdf, vertices + delta_v)\n\n    # 可微分光栅化渲染法线图 + mask\n    normal_map, mask = rasterize(mesh, cameras)\n    I_g = normal_map * mask  # 组合为 RGB 图像\n\n    # 编码到潜空间，计算 SDS 损失\n    z = encode(I_g)\n    loss = SDS_loss(z, text_prompt, w=coarse_or_fine_weight(t))\n\n    # 更新几何网络\n    loss.backward()\n    optimizer_Ψ.step()  # lr = 1e-3\n\n# ===== 阶段 2: 外观建模 =====\n# 冻结几何，初始化材质 MLP Γ\nfor iteration in appearance_iterations:\n    cameras = sample_cameras(n=24)\n\n    # 预测 BRDF 材质参数\n    kd, krm, kn = Γ(hash_encode(surface_points))\n\n    # PBR 渲染（Cook-Torrance BRDF + 环境光照）\n    color_image = pbr_render(mesh, kd, krm, kn, env_map, cameras)\n\n    # SDS 损失优化材质\n    z = encode(color_image)\n    loss = SDS_loss(z, text_prompt, w=appearance_weight(t))\n\n    loss.backward()\n    optimizer_Γ.step()  # lr = 1e-2\n\n# ===== 导出 =====\n# UV 展开 + 纹理采样 + edge padding\nuv_map = xatlas_unwrap(mesh)\ntexture_maps = sample_material_to_uv(Γ, uv_map)\nexport(mesh, texture_maps)  # 可导入 Blender\n</code></pre>\n<h5>与现有方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>DreamFusion</th>\n<th>Magic3D</th>\n<th>Fantasia3D</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>3D 表示</td>\n<td>NeRF</td>\n<td>NeRF → DMTet</td>\n<td>DMTet</td>\n</tr>\n<tr>\n<td>几何/外观</td>\n<td>耦合</td>\n<td>耦合</td>\n<td><strong>解耦</strong></td>\n</tr>\n<tr>\n<td>材质模型</td>\n<td>简单着色</td>\n<td>简单着色</td>\n<td><strong>PBR (BRDF)</strong></td>\n</tr>\n<tr>\n<td>网格提取</td>\n<td>困难</td>\n<td>支持</td>\n<td><strong>原生支持</strong></td>\n</tr>\n<tr>\n<td>重光照/编辑</td>\n<td>✗</td>\n<td>有限</td>\n<td><strong>✓</strong></td>\n</tr>\n<tr>\n<td>物理仿真</td>\n<td>✗</td>\n<td>✗</td>\n<td><strong>✓</strong></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>核心优势</strong>：Fantasia3D 是首个在文本到3D任务中引入完整 PBR 材质管线的方法，生成的资产可直接用于下游图形应用（重光照、材质编辑、物理仿真），而非仅作为\"观赏品\"。</div>\n<h5>实现细节</h5>\n<ul>\n<li><strong>网络架构</strong>：<span class=\"kb-math kb-math-inline\">\\Psi</span> 为 3 层 MLP（32 隐藏单元），<span class=\"kb-math kb-math-inline\">\\Gamma</span> 为 2 层 MLP（32 隐藏单元），均使用 hash-grid 位置编码</li>\n<li><strong>训练配置</strong>：8× NVIDIA RTX 3090，几何阶段约 15 分钟，外观阶段约 16 分钟</li>\n<li><strong>优化器</strong>：AdamW，几何学习率 <span class=\"kb-math kb-math-inline\">1 \\times 10^{-3}</span>，外观学习率 <span class=\"kb-math kb-math-inline\">1 \\times 10^{-2}</span></li>\n<li><strong>每次迭代采样 24 个相机视角</strong>进行渲染</li>\n</ul>\n<h5>消融实验关键发现</h5>\n<ol>\n<li><strong>解耦 vs 耦合</strong>：将几何和材质耦合到同一网络联合学习会导致生成失败，验证了解耦设计的必要性</li>\n<li><strong>法线图 vs 着色图像</strong>：用着色图像替代法线图进行几何优化会产生扭曲的几何形状</li>\n<li><strong>粗到细策略</strong>：去除粗到细的权重调度会导致几何细节不足</li>\n</ol>",
      "quiz": {
        "q": "Fantasia3D 在几何建模阶段使用什么作为 Stable Diffusion 的输入？",
        "options": [
          "PBR 渲染的彩色图像",
          "渲染的法线图与 mask 的组合",
          "深度图",
          "SDF 体素网格的切片"
        ],
        "answer": 1,
        "explain": "Fantasia3D 将 DMTet 提取网格渲染的法线图与二值 mask 组合为 RGB 图像，编码后送入 Stable Diffusion 计算 SDS 损失。法线图的值域 (-1,1) 与潜空间数据范围对齐，且 LAION-5B 训练数据中包含法线图，使扩散模型能有效处理。"
      }
    },
    {
      "id": "prolificdreamer",
      "num": 10,
      "name": "ProlificDreamer",
      "fullName": "高产梦想家 (ProlificDreamer)",
      "year": "2023",
      "org": "Tsinghua University",
      "parent": "dreamfusion",
      "paperUrl": "https://arxiv.org/abs/2305.16213",
      "projectUrl": "",
      "category": "optimization",
      "motivation": "变分分数蒸馏VSD解决过平滑",
      "summary": "ProlificDreamer 的核心目标是：变分分数蒸馏VSD解决过平滑。",
      "keyPoints": [
        "核心动机：变分分数蒸馏VSD解决过平滑",
        "演化来源：继承或改进自 dreamfusion",
        "代表机构：Tsinghua University"
      ],
      "detail": "<p>变分分数蒸馏VSD解决过平滑</p>"
    },
    {
      "id": "luciddreamer",
      "num": 11,
      "name": "LucidDreamer",
      "fullName": "清醒梦境 (LucidDreamer)",
      "year": "2023",
      "org": "KAIST",
      "parent": "prolificdreamer",
      "paperUrl": "https://arxiv.org/abs/2311.11284",
      "projectUrl": "",
      "category": "optimization",
      "motivation": "区间分数匹配ISM提升保真度",
      "summary": "LucidDreamer 的核心目标是：区间分数匹配ISM提升保真度。",
      "keyPoints": [
        "核心动机：区间分数匹配ISM提升保真度",
        "演化来源：继承或改进自 prolificdreamer",
        "代表机构：KAIST"
      ],
      "detail": "<p>区间分数匹配ISM提升保真度</p>"
    },
    {
      "id": "zero123",
      "num": 12,
      "name": "Zero-1-to-3",
      "fullName": "零样本视角合成 (Zero-1-to-3)",
      "year": "2023",
      "org": "Columbia University",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2303.11328",
      "projectUrl": "",
      "category": "feed_forward",
      "motivation": "注入相机参数实现单图新视角",
      "summary": "Zero-1-to-3 的核心目标是：注入相机参数实现单图新视角。",
      "keyPoints": [
        "核心动机：注入相机参数实现单图新视角",
        "代表机构：Columbia University"
      ],
      "detail": "<p>注入相机参数实现单图新视角</p>"
    },
    {
      "id": "one2345",
      "num": 13,
      "name": "One-2-3-45",
      "fullName": "单图45秒重建 (One-2-3-45)",
      "year": "2023",
      "org": "Stanford University",
      "parent": "zero123",
      "paperUrl": "https://arxiv.org/abs/2306.16928",
      "projectUrl": "",
      "category": "feed_forward",
      "motivation": "多视图生成+快速网格重建",
      "summary": "One-2-3-45 的核心目标是：多视图生成+快速网格重建。",
      "keyPoints": [
        "核心动机：多视图生成+快速网格重建",
        "演化来源：继承或改进自 zero123",
        "代表机构：Stanford University"
      ],
      "detail": "<p>多视图生成+快速网格重建</p>"
    },
    {
      "id": "mvdream",
      "num": 14,
      "name": "MVDream",
      "fullName": "多视图梦境 (MVDream)",
      "year": "2024",
      "org": "ByteDance",
      "parent": "zero123",
      "paperUrl": "https://arxiv.org/abs/2308.16512",
      "projectUrl": "",
      "category": "feed_forward",
      "motivation": "多视图注意力解决Janus问题",
      "summary": "MVDream 的核心目标是：多视图注意力解决Janus问题。",
      "keyPoints": [
        "核心动机：多视图注意力解决Janus问题",
        "演化来源：继承或改进自 zero123",
        "代表机构：ByteDance"
      ],
      "detail": "<p>多视图注意力解决Janus问题</p>"
    },
    {
      "id": "wonder3d",
      "num": 15,
      "name": "Wonder3D",
      "fullName": "神奇3D (Wonder3D)",
      "year": "2024",
      "org": "HKU",
      "parent": "mvdream",
      "paperUrl": "https://arxiv.org/abs/2310.15008",
      "projectUrl": "",
      "category": "feed_forward",
      "motivation": "跨域扩散生成一致多视图",
      "summary": "Wonder3D 的核心目标是：跨域扩散生成一致多视图。",
      "keyPoints": [
        "核心动机：跨域扩散生成一致多视图",
        "演化来源：继承或改进自 mvdream",
        "代表机构：HKU"
      ],
      "detail": "<p>跨域扩散生成一致多视图</p>"
    },
    {
      "id": "lrm",
      "num": 16,
      "name": "LRM",
      "fullName": "大规模重建模型 (Large Reconstruction Model)",
      "year": "2024",
      "org": "Adobe Research",
      "parent": "zero123",
      "paperUrl": "https://arxiv.org/abs/2311.04400",
      "projectUrl": "",
      "category": "feed_forward",
      "motivation": "Transformer单图5秒预测NeRF",
      "summary": "LRM 的核心目标是：Transformer单图5秒预测NeRF。",
      "keyPoints": [
        "核心动机：Transformer单图5秒预测NeRF",
        "演化来源：继承或改进自 zero123",
        "代表机构：Adobe Research"
      ],
      "detail": "<p>Transformer单图5秒预测NeRF</p>"
    },
    {
      "id": "instant3d",
      "num": 17,
      "name": "Instant3D",
      "fullName": "即时3D (Instant3D)",
      "year": "2024",
      "org": "Tencent",
      "parent": "lrm",
      "paperUrl": "https://arxiv.org/abs/2311.06214",
      "projectUrl": "",
      "category": "feed_forward",
      "motivation": "稀疏视图+LRM快速前馈生成",
      "summary": "Instant3D 的核心目标是：稀疏视图+LRM快速前馈生成。",
      "keyPoints": [
        "核心动机：稀疏视图+LRM快速前馈生成",
        "演化来源：继承或改进自 lrm",
        "代表机构：Tencent"
      ],
      "detail": "<p>稀疏视图+LRM快速前馈生成</p>"
    },
    {
      "id": "ilrm",
      "num": 18,
      "name": "iLRM",
      "fullName": "迭代大规模重建 (Iterative LRM)",
      "year": "2026.03",
      "org": "CVPR",
      "parent": "lrm",
      "paperUrl": "https://arxiv.org/abs/2604.16000",
      "projectUrl": "",
      "category": "feed_forward",
      "motivation": "迭代细化机制生成3DGS",
      "summary": "iLRM 的核心目标是：迭代细化机制生成3DGS。",
      "keyPoints": [
        "核心动机：迭代细化机制生成3DGS",
        "演化来源：继承或改进自 lrm",
        "代表机构：CVPR"
      ],
      "detail": "<p>迭代细化机制生成3DGS</p>"
    },
    {
      "id": "vgg_t3",
      "num": 19,
      "name": "VGG-T³",
      "fullName": "测试时训练重建 (VGG-T³)",
      "year": "2026.02",
      "org": "arXiv",
      "parent": "ilrm",
      "paperUrl": "https://arxiv.org/abs/2602.23361",
      "projectUrl": "",
      "category": "feed_forward",
      "motivation": "TTT线性扩展58秒千图重建",
      "summary": "VGG-T³ 的核心目标是：TTT线性扩展58秒千图重建。",
      "keyPoints": [
        "核心动机：TTT线性扩展58秒千图重建",
        "演化来源：继承或改进自 ilrm",
        "代表机构：arXiv"
      ],
      "detail": "<p>TTT线性扩展58秒千图重建</p>"
    },
    {
      "id": "4d_lrm",
      "num": 20,
      "name": "4D-LRM",
      "fullName": "4D大规模重建 (4D-LRM)",
      "year": "2025.12",
      "org": "arXiv",
      "parent": "lrm",
      "paperUrl": "https://arxiv.org/abs/2512.04000",
      "projectUrl": "",
      "category": "feed_forward",
      "motivation": "首个大规模4D动态重建模型",
      "summary": "4D-LRM 的核心目标是：首个大规模4D动态重建模型。",
      "keyPoints": [
        "核心动机：首个大规模4D动态重建模型",
        "演化来源：继承或改进自 lrm",
        "代表机构：arXiv"
      ],
      "detail": "<p>首个大规模4D动态重建模型</p>"
    },
    {
      "id": "yonosplat",
      "num": 21,
      "name": "YoNoSplat",
      "fullName": "单模型前馈3DGS (YoNoSplat)",
      "year": "2026.04",
      "org": "ICLR",
      "parent": "ilrm",
      "paperUrl": "https://openreview.net/forum?id=yono2026",
      "projectUrl": "",
      "category": "feed_forward",
      "motivation": "毫秒级任意视图重建",
      "summary": "YoNoSplat 的核心目标是：毫秒级任意视图重建。",
      "keyPoints": [
        "核心动机：毫秒级任意视图重建",
        "演化来源：继承或改进自 ilrm",
        "代表机构：ICLR"
      ],
      "detail": "<p>毫秒级任意视图重建</p>"
    },
    {
      "id": "texture",
      "num": 22,
      "name": "TEXTure",
      "fullName": "文本纹理 (TEXTure)",
      "year": "2023",
      "org": "Technion",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2302.01721",
      "projectUrl": "",
      "category": "texture",
      "motivation": "迭代投影涂色生成无缝纹理",
      "summary": "TEXTure 的核心目标是：迭代投影涂色生成无缝纹理。",
      "keyPoints": [
        "核心动机：迭代投影涂色生成无缝纹理",
        "代表机构：Technion"
      ],
      "detail": "<p>迭代投影涂色生成无缝纹理</p>"
    },
    {
      "id": "text2tex",
      "num": 23,
      "name": "Text2Tex",
      "fullName": "文本转纹理 (Text2Tex)",
      "year": "2023",
      "org": "Stanford University",
      "parent": "texture",
      "paperUrl": "https://arxiv.org/abs/2303.11396",
      "projectUrl": "",
      "category": "texture",
      "motivation": "渐进式策略确保全局一致性",
      "summary": "Text2Tex 的核心目标是：渐进式策略确保全局一致性。",
      "keyPoints": [
        "核心动机：渐进式策略确保全局一致性",
        "演化来源：继承或改进自 texture",
        "代表机构：Stanford University"
      ],
      "detail": "<p>渐进式策略确保全局一致性</p>"
    },
    {
      "id": "trellis2",
      "num": 24,
      "name": "TRELLIS 2",
      "fullName": "微软TRELLIS 2 (TRELLIS 2)",
      "year": "2025.12",
      "org": "Microsoft Research",
      "parent": "text2tex",
      "paperUrl": "https://trellis2.app/",
      "projectUrl": "",
      "category": "texture",
      "motivation": "O-Voxel原生PBR材质生成",
      "summary": "TRELLIS 2 的核心目标是：O-Voxel原生PBR材质生成。",
      "keyPoints": [
        "核心动机：O-Voxel原生PBR材质生成",
        "演化来源：继承或改进自 text2tex",
        "代表机构：Microsoft Research"
      ],
      "detail": "<p>O-Voxel原生PBR材质生成</p>"
    },
    {
      "id": "hunyuan3d_21",
      "num": 25,
      "name": "Hunyuan3D 2.1",
      "fullName": "混元3D 2.1 (Hunyuan3D 2.1)",
      "year": "2026.03",
      "org": "Tencent",
      "parent": "trellis2",
      "paperUrl": "https://github.com/tencent/Hunyuan3D-2",
      "projectUrl": "",
      "category": "texture",
      "motivation": "78%盲测胜率高质量纹理",
      "summary": "Hunyuan3D 2.1 的核心目标是：78%盲测胜率高质量纹理。",
      "keyPoints": [
        "核心动机：78%盲测胜率高质量纹理",
        "演化来源：继承或改进自 trellis2",
        "代表机构：Tencent"
      ],
      "detail": "<p>78%盲测胜率高质量纹理</p>"
    },
    {
      "id": "dragtex",
      "num": 26,
      "name": "Dragtex",
      "fullName": "拖拽纹理编辑 (Dragtex)",
      "year": "2026.02",
      "org": "IEEE",
      "parent": "hunyuan3d_21",
      "paperUrl": "https://ieeexplore.ieee.org/document/11368713",
      "projectUrl": "",
      "category": "texture",
      "motivation": "基于点的交互式纹理编辑",
      "summary": "Dragtex 的核心目标是：基于点的交互式纹理编辑。",
      "keyPoints": [
        "核心动机：基于点的交互式纹理编辑",
        "演化来源：继承或改进自 hunyuan3d_21",
        "代表机构：IEEE"
      ],
      "detail": "<p>基于点的交互式纹理编辑</p>"
    },
    {
      "id": "ar3dr1",
      "num": 27,
      "name": "AR3DR1",
      "fullName": "强化学习3D生成 (AR3DR1)",
      "year": "2026.03",
      "org": "CVPR",
      "parent": "luciddreamer",
      "paperUrl": "https://arxiv.org/abs/2603.15000",
      "projectUrl": "",
      "category": "native_3d",
      "motivation": "high-GRPO分层RL优化生成",
      "summary": "AR3DR1 的核心目标是：high-GRPO分层RL优化生成。",
      "keyPoints": [
        "核心动机：high-GRPO分层RL优化生成",
        "演化来源：继承或改进自 luciddreamer",
        "代表机构：CVPR"
      ],
      "detail": "<p>high-GRPO分层RL优化生成</p>"
    },
    {
      "id": "vist3a",
      "num": 28,
      "name": "VIST3A",
      "fullName": "视频蒸馏3D (VIST3A)",
      "year": "2026.04",
      "org": "ICLR",
      "parent": "luciddreamer",
      "paperUrl": "https://iclr.cc/virtual/2026/poster/25432",
      "projectUrl": "",
      "category": "native_3d",
      "motivation": "视频生成器缝合3D重建",
      "summary": "VIST3A 的核心目标是：视频生成器缝合3D重建。",
      "keyPoints": [
        "核心动机：视频生成器缝合3D重建",
        "演化来源：继承或改进自 luciddreamer",
        "代表机构：ICLR"
      ],
      "detail": "<p>视频生成器缝合3D重建</p>"
    },
    {
      "id": "lyra",
      "num": 29,
      "name": "Lyra",
      "fullName": "视频扩散自蒸馏 (Lyra)",
      "year": "2026.04",
      "org": "ICLR",
      "parent": "vist3a",
      "paperUrl": "https://iclr.cc/virtual/2026/poster/lyra",
      "projectUrl": "",
      "category": "native_3d",
      "motivation": "视频扩散自蒸馏到3DGS",
      "summary": "Lyra 的核心目标是：视频扩散自蒸馏到3DGS。",
      "keyPoints": [
        "核心动机：视频扩散自蒸馏到3DGS",
        "演化来源：继承或改进自 vist3a",
        "代表机构：ICLR"
      ],
      "detail": "<p>视频扩散自蒸馏到3DGS</p>"
    },
    {
      "id": "hunyuan3d_3",
      "num": 30,
      "name": "Hunyuan3D 3.0",
      "fullName": "混元3D 3.0 (Hunyuan3D 3.0)",
      "year": "2026.04",
      "org": "Tencent",
      "parent": "instant3d",
      "paperUrl": "https://github.com/tencent/Hunyuan3D-3",
      "projectUrl": "",
      "category": "native_3d",
      "motivation": "1536³原生分辨率36亿体素",
      "summary": "Hunyuan3D 3.0 的核心目标是：1536³原生分辨率36亿体素。",
      "keyPoints": [
        "核心动机：1536³原生分辨率36亿体素",
        "演化来源：继承或改进自 instant3d",
        "代表机构：Tencent"
      ],
      "detail": "<p>1536³原生分辨率36亿体素</p>"
    },
    {
      "id": "seed3d_2",
      "num": 31,
      "name": "Seed3D 2.0",
      "fullName": "豆包3D 2.0 (Seed3D 2.0)",
      "year": "2026.04",
      "org": "ByteDance",
      "parent": "hunyuan3d_3",
      "paperUrl": "https://www.bytedance.com/seed3d",
      "projectUrl": "",
      "category": "native_3d",
      "motivation": "DiT+URDF工业级资产输出",
      "summary": "Seed3D 2.0 的核心目标是：DiT+URDF工业级资产输出。",
      "keyPoints": [
        "核心动机：DiT+URDF工业级资产输出",
        "演化来源：继承或改进自 hunyuan3d_3",
        "代表机构：ByteDance"
      ],
      "detail": "<p>DiT+URDF工业级资产输出</p>"
    },
    {
      "id": "rodin_gen2",
      "num": 32,
      "name": "Rodin Gen-2",
      "fullName": "Rodin二代 (Rodin Gen-2)",
      "year": "2026.04",
      "org": "Microsoft",
      "parent": "seed3d_2",
      "paperUrl": "https://microsoft.com/rodin",
      "projectUrl": "",
      "category": "native_3d",
      "motivation": "100亿参数四边形拓扑生成",
      "summary": "Rodin Gen-2 的核心目标是：100亿参数四边形拓扑生成。",
      "keyPoints": [
        "核心动机：100亿参数四边形拓扑生成",
        "演化来源：继承或改进自 seed3d_2",
        "代表机构：Microsoft"
      ],
      "detail": "<p>100亿参数四边形拓扑生成</p>"
    }
  ],
  "categories": {
    "representation": {
      "label": "3D表征奠基",
      "color": "#3b82f6"
    },
    "optimization": {
      "label": "基于优化的生成",
      "color": "#8b5cf6"
    },
    "feed_forward": {
      "label": "前馈快速生成",
      "color": "#10b981"
    },
    "texture": {
      "label": "纹理生成",
      "color": "#f59e0b"
    },
    "native_3d": {
      "label": "原生3D生成",
      "color": "#ef4444"
    }
  },
  "projectUrls": {}
};
