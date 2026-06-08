/**
 * video_generation-data.js — 由 pipeline/build.py 于 2026-06-08 12:11:58 自动生成。
 * 源文件：content/aigc/video_generation.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "aigc",
    "topic_id": "video_generation",
    "topic_name": "视频生成 算法总结",
    "page_title": "视频生成 算法总结",
    "page_subtitle": "2026-06-08 版",
    "page_desc": "从GAN到扩散模型再到世界模型的视频生成技术演进，涵盖Sora、Kling等里程碑模型与时序一致性核心技术",
    "page_icon": "🎬",
    "hero_pills": [
      "Sora · Kling · 时序一致性"
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
        "id": "videogan",
        "x": 2016,
        "y": 1,
        "category": "gan_based"
      },
      {
        "id": "tgan",
        "x": 2017,
        "y": 1,
        "category": "gan_based"
      },
      {
        "id": "mocogan",
        "x": 2018,
        "y": 1,
        "category": "gan_based"
      },
      {
        "id": "svg",
        "x": 2018,
        "y": 2,
        "category": "vae_based"
      },
      {
        "id": "videogpt",
        "x": 2021,
        "y": 3,
        "category": "autoregressive"
      },
      {
        "id": "nuwa",
        "x": 2021.9,
        "y": 3,
        "category": "autoregressive"
      },
      {
        "id": "cogvideo",
        "x": 2022.4,
        "y": 3,
        "category": "autoregressive"
      },
      {
        "id": "nuwa_infinity",
        "x": 2022.6,
        "y": 3,
        "category": "autoregressive"
      },
      {
        "id": "svd",
        "x": 2023.9,
        "y": 4,
        "category": "diffusion_based"
      },
      {
        "id": "gen1",
        "x": 2023.2,
        "y": 4,
        "category": "diffusion_based"
      },
      {
        "id": "pika",
        "x": 2023.3,
        "y": 4,
        "category": "diffusion_based"
      },
      {
        "id": "gen2",
        "x": 2023.5,
        "y": 4,
        "category": "diffusion_based"
      },
      {
        "id": "lumiere",
        "x": 2024.1,
        "y": 4,
        "category": "diffusion_based"
      },
      {
        "id": "sora",
        "x": 2024.2,
        "y": 4,
        "category": "diffusion_based"
      },
      {
        "id": "veo",
        "x": 2024.4,
        "y": 4,
        "category": "diffusion_based"
      },
      {
        "id": "gen3",
        "x": 2024.5,
        "y": 4,
        "category": "diffusion_based"
      },
      {
        "id": "kling",
        "x": 2024.5,
        "y": 4,
        "category": "diffusion_based"
      },
      {
        "id": "cogvideox",
        "x": 2024.7,
        "y": 4,
        "category": "diffusion_based"
      },
      {
        "id": "hunyuanvideo",
        "x": 2024.12,
        "y": 4,
        "category": "diffusion_based"
      },
      {
        "id": "sora2",
        "x": 2024.12,
        "y": 4,
        "category": "diffusion_based"
      },
      {
        "id": "wan",
        "x": 2025.2,
        "y": 4,
        "category": "diffusion_based"
      },
      {
        "id": "seedance",
        "x": 2025.7,
        "y": 4,
        "category": "diffusion_based"
      },
      {
        "id": "pika25",
        "x": 2025.9,
        "y": 4,
        "category": "diffusion_based"
      },
      {
        "id": "gen4",
        "x": 2026.1,
        "y": 4,
        "category": "diffusion_based"
      },
      {
        "id": "kling3",
        "x": 2026.1,
        "y": 4,
        "category": "diffusion_based"
      },
      {
        "id": "veo3",
        "x": 2026.1,
        "y": 4,
        "category": "diffusion_based"
      },
      {
        "id": "seedance2",
        "x": 2026.2,
        "y": 4,
        "category": "diffusion_based"
      },
      {
        "id": "wan27",
        "x": 2026.3,
        "y": 4,
        "category": "diffusion_based"
      },
      {
        "id": "hunyuanvideo15",
        "x": 2026.3,
        "y": 4,
        "category": "diffusion_based"
      },
      {
        "id": "gwm1",
        "x": 2026.2,
        "y": 5,
        "category": "world_model"
      },
      {
        "id": "vjepa2",
        "x": 2026.3,
        "y": 5,
        "category": "world_model"
      }
    ],
    "edges": [
      {
        "from": "videogan",
        "to": "tgan",
        "label": "时序判别"
      },
      {
        "from": "videogan",
        "to": "mocogan",
        "label": "运动解耦"
      },
      {
        "from": "svg",
        "to": "videogpt",
        "label": "离散Token化"
      },
      {
        "from": "videogpt",
        "to": "nuwa",
        "label": "多任务统一"
      },
      {
        "from": "nuwa",
        "to": "nuwa_infinity",
        "label": "无限扩展"
      },
      {
        "from": "nuwa",
        "to": "cogvideo",
        "label": "中文理解"
      },
      {
        "from": "svd",
        "to": "sora",
        "label": "DiT架构"
      },
      {
        "from": "sora",
        "to": "sora2",
        "label": "物理增强"
      },
      {
        "from": "svd",
        "to": "lumiere",
        "label": "STUNet"
      },
      {
        "from": "lumiere",
        "to": "veo",
        "label": "高分辨率"
      },
      {
        "from": "veo",
        "to": "veo3",
        "label": "原生音视频"
      },
      {
        "from": "gen1",
        "to": "gen2",
        "label": "T2V能力"
      },
      {
        "from": "gen2",
        "to": "gen3",
        "label": "世界模型"
      },
      {
        "from": "gen3",
        "to": "gen4",
        "label": "世界一致性"
      },
      {
        "from": "cogvideo",
        "to": "cogvideox",
        "label": "3D VAE"
      },
      {
        "from": "svd",
        "to": "hunyuanvideo",
        "label": "开源优化"
      },
      {
        "from": "hunyuanvideo",
        "to": "hunyuanvideo15",
        "label": "GPU优化"
      },
      {
        "from": "svd",
        "to": "wan",
        "label": "MoE架构"
      },
      {
        "from": "wan",
        "to": "wan27",
        "label": "参数扩展"
      },
      {
        "from": "svd",
        "to": "kling",
        "label": "3D注意力"
      },
      {
        "from": "kling",
        "to": "kling3",
        "label": "4K音频"
      },
      {
        "from": "svd",
        "to": "seedance",
        "label": "时间线提示"
      },
      {
        "from": "seedance",
        "to": "seedance2",
        "label": "音视频同步"
      },
      {
        "from": "svd",
        "to": "pika",
        "label": "物理特效"
      },
      {
        "from": "pika",
        "to": "pika25",
        "label": "唇形同步"
      },
      {
        "from": "gen4",
        "to": "gwm1",
        "label": "物理仿真"
      }
    ],
    "milestones": [
      "svd",
      "sora",
      "veo3"
    ]
  },
  "algos": [
    {
      "id": "videogan",
      "num": 1,
      "name": "VideoGAN",
      "fullName": "视频生成对抗网络 (Video Generative Adversarial Network)",
      "year": "2016",
      "org": "MIT",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1609.02612",
      "projectUrl": "",
      "category": "gan_based",
      "motivation": "首次将GAN应用于视频生成，分解静态背景与动态前景",
      "summary": "VideoGAN 的核心目标是：首次将GAN应用于视频生成，分解静态背景与动态前景。",
      "keyPoints": [
        "核心动机：首次将GAN应用于视频生成，分解静态背景与动态前景",
        "代表机构：MIT"
      ],
      "detail": "<p>首次将GAN应用于视频生成，分解静态背景与动态前景</p>"
    },
    {
      "id": "mocogan",
      "num": 2,
      "name": "MoCoGAN",
      "fullName": "运动内容解耦GAN (Motion-Content Decomposed GAN)",
      "year": "2018",
      "org": "NEC Labs",
      "parent": "videogan",
      "paperUrl": "https://arxiv.org/abs/1707.04993",
      "projectUrl": "",
      "category": "gan_based",
      "motivation": "将潜在空间分解为内容和运动部分，实现解耦控制",
      "summary": "MoCoGAN 的核心目标是：将潜在空间分解为内容和运动部分，实现解耦控制。",
      "keyPoints": [
        "核心动机：将潜在空间分解为内容和运动部分，实现解耦控制",
        "演化来源：继承或改进自 videogan",
        "代表机构：NEC Labs"
      ],
      "detail": "<p>将潜在空间分解为内容和运动部分，实现解耦控制</p>"
    },
    {
      "id": "tgan",
      "num": 3,
      "name": "TGAN",
      "fullName": "时序生成对抗网络 (Temporal GAN)",
      "year": "2017",
      "org": "Preferred Networks",
      "parent": "videogan",
      "paperUrl": "https://arxiv.org/abs/1611.06624",
      "projectUrl": "",
      "category": "gan_based",
      "motivation": "引入时序判别器增强视频时序连贯性",
      "summary": "TGAN 的核心目标是：引入时序判别器增强视频时序连贯性。",
      "keyPoints": [
        "核心动机：引入时序判别器增强视频时序连贯性",
        "演化来源：继承或改进自 videogan",
        "代表机构：Preferred Networks"
      ],
      "detail": "<p>引入时序判别器增强视频时序连贯性</p>"
    },
    {
      "id": "svg",
      "num": 4,
      "name": "SVG",
      "fullName": "随机视频生成 (Stochastic Video Generation)",
      "year": "2018",
      "org": "DeepMind",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1802.07687",
      "projectUrl": "",
      "category": "vae_based",
      "motivation": "引入随机隐变量建模视频生成的不确定性",
      "summary": "SVG 的核心目标是：引入随机隐变量建模视频生成的不确定性。",
      "keyPoints": [
        "核心动机：引入随机隐变量建模视频生成的不确定性",
        "代表机构：DeepMind"
      ],
      "detail": "<p>引入随机隐变量建模视频生成的不确定性</p>"
    },
    {
      "id": "videogpt",
      "num": 5,
      "name": "VideoGPT",
      "fullName": "视频生成预训练Transformer (Video Generative Pre-trained Transformer)",
      "year": "2021",
      "org": "UC Berkeley",
      "parent": "svg",
      "paperUrl": "https://arxiv.org/abs/2104.10157",
      "projectUrl": "",
      "category": "autoregressive",
      "motivation": "将视频视为离散Token序列进行自回归预测",
      "summary": "VideoGPT 的核心目标是：将视频视为离散Token序列进行自回归预测。",
      "keyPoints": [
        "核心动机：将视频视为离散Token序列进行自回归预测",
        "演化来源：继承或改进自 svg",
        "代表机构：UC Berkeley"
      ],
      "detail": "<p>将视频视为离散Token序列进行自回归预测</p>"
    },
    {
      "id": "nuwa",
      "num": 6,
      "name": "NUWA",
      "fullName": "女娲多模态生成模型 (NUWA)",
      "year": "2021.11",
      "org": "Microsoft Research Asia",
      "parent": "videogpt",
      "paperUrl": "https://arxiv.org/abs/2111.12417",
      "projectUrl": "",
      "category": "autoregressive",
      "motivation": "统一文本、图像、视频生成的多任务框架",
      "summary": "NUWA 的核心目标是：统一文本、图像、视频生成的多任务框架。",
      "keyPoints": [
        "核心动机：统一文本、图像、视频生成的多任务框架",
        "演化来源：继承或改进自 videogpt",
        "代表机构：Microsoft Research Asia"
      ],
      "detail": "<p>统一文本、图像、视频生成的多任务框架</p>"
    },
    {
      "id": "nuwa_infinity",
      "num": 7,
      "name": "NUWA-Infinity",
      "fullName": "女娲无限生成模型 (NUWA-Infinity)",
      "year": "2022.07",
      "org": "Microsoft Research Asia",
      "parent": "nuwa",
      "paperUrl": "https://arxiv.org/abs/2207.09814",
      "projectUrl": "",
      "category": "autoregressive",
      "motivation": "自回归之上的自回归，突破固定分辨率和长度限制",
      "summary": "NUWA-Infinity 的核心目标是：自回归之上的自回归，突破固定分辨率和长度限制。",
      "keyPoints": [
        "核心动机：自回归之上的自回归，突破固定分辨率和长度限制",
        "演化来源：继承或改进自 nuwa",
        "代表机构：Microsoft Research Asia"
      ],
      "detail": "<p>自回归之上的自回归，突破固定分辨率和长度限制</p>"
    },
    {
      "id": "cogvideo",
      "num": 8,
      "name": "CogVideo",
      "fullName": "认知视频生成模型 (CogVideo)",
      "year": "2022.05",
      "org": "清华大学/智谱AI",
      "parent": "nuwa",
      "paperUrl": "https://arxiv.org/abs/2205.15868",
      "projectUrl": "",
      "category": "autoregressive",
      "motivation": "多帧速率层级训练，实现高质量文本到视频生成",
      "summary": "CogVideo 的核心目标是：多帧速率层级训练，实现高质量文本到视频生成。",
      "keyPoints": [
        "核心动机：多帧速率层级训练，实现高质量文本到视频生成",
        "演化来源：继承或改进自 nuwa",
        "代表机构：清华大学/智谱AI"
      ],
      "detail": "<p>多帧速率层级训练，实现高质量文本到视频生成</p>"
    },
    {
      "id": "svd",
      "num": 9,
      "name": "SVD",
      "fullName": "稳定视频扩散 (Stable Video Diffusion)",
      "year": "2023.11",
      "org": "Stability AI",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2311.15127",
      "projectUrl": "",
      "category": "diffusion_based",
      "motivation": "开源基线，三阶段训练，时序感知去闪烁解码器",
      "summary": "SVD 的核心目标是：开源基线，三阶段训练，时序感知去闪烁解码器。",
      "keyPoints": [
        "核心动机：开源基线，三阶段训练，时序感知去闪烁解码器",
        "代表机构：Stability AI"
      ],
      "detail": "<p>开源基线，三阶段训练，时序感知去闪烁解码器</p>"
    },
    {
      "id": "sora",
      "num": 10,
      "name": "Sora",
      "fullName": "Sora视频生成模型 (Sora)",
      "year": "2024.02",
      "org": "OpenAI",
      "parent": "svd",
      "paperUrl": "https://openai.com/index/video-generation-models-as-world-simulators/",
      "projectUrl": "",
      "category": "diffusion_based",
      "motivation": "时空补丁DiT架构，初步物理模拟能力",
      "summary": "Sora 的核心目标是：时空补丁DiT架构，初步物理模拟能力。",
      "keyPoints": [
        "核心动机：时空补丁DiT架构，初步物理模拟能力",
        "演化来源：继承或改进自 svd",
        "代表机构：OpenAI"
      ],
      "detail": "<p>时空补丁DiT架构，初步物理模拟能力</p>"
    },
    {
      "id": "sora2",
      "num": 11,
      "name": "Sora 2",
      "fullName": "Sora第二代 (Sora 2)",
      "year": "2024.12",
      "org": "OpenAI",
      "parent": "sora",
      "paperUrl": "https://openai.com/sora",
      "projectUrl": "",
      "category": "diffusion_based",
      "motivation": "1080p/60s生成，API转型，物理模拟增强",
      "summary": "Sora 2 的核心目标是：1080p/60s生成，API转型，物理模拟增强。",
      "keyPoints": [
        "核心动机：1080p/60s生成，API转型，物理模拟增强",
        "演化来源：继承或改进自 sora",
        "代表机构：OpenAI"
      ],
      "detail": "<p>1080p/60s生成，API转型，物理模拟增强</p>"
    },
    {
      "id": "gen1",
      "num": 12,
      "name": "Gen-1",
      "fullName": "Runway Gen-1 (Runway Gen-1)",
      "year": "2023.02",
      "org": "Runway",
      "parent": "svd",
      "paperUrl": "https://research.runwayml.com/gen1",
      "projectUrl": "",
      "category": "diffusion_based",
      "motivation": "视频到视频转换，风格迁移保持结构",
      "summary": "Gen-1 的核心目标是：视频到视频转换，风格迁移保持结构。",
      "keyPoints": [
        "核心动机：视频到视频转换，风格迁移保持结构",
        "演化来源：继承或改进自 svd",
        "代表机构：Runway"
      ],
      "detail": "<p>视频到视频转换，风格迁移保持结构</p>"
    },
    {
      "id": "gen2",
      "num": 13,
      "name": "Gen-2",
      "fullName": "Runway Gen-2 (Runway Gen-2)",
      "year": "2023.06",
      "org": "Runway",
      "parent": "gen1",
      "paperUrl": "https://research.runwayml.com/gen2",
      "projectUrl": "",
      "category": "diffusion_based",
      "motivation": "首次文本到视频和图像到视频能力",
      "summary": "Gen-2 提出了一种基于潜在扩散模型的视频合成框架，通过将视频分解为**结构表示**（单目深度估计）和**内容表示**（CLIP 图像嵌入），并结合时空联合训练与时序引导机制，实现了文本、图像、视频等多模态条件下的高质量视频生成与编辑。",
      "keyPoints": [
        "<strong>结构-内容解耦表示</strong>：将视频分解为结构信号（MiDaS 单目深度图，可控细节层级）和内容信号（CLIP 图像嵌入），分别通过拼接和交叉注意力注入扩散模型",
        "<strong>时空潜在扩散模型</strong>：在预训练图像 LDM（Stable Diffusion）的 UNet 中插入 1D 时序卷积和 1D 时序注意力层，实现图像-视频联合训练",
        "<strong>时序引导尺度 <span class=\"kb-math kb-math-inline\">\\omega_t</span></strong>：利用图像模型与视频模型的预测差异，通过类似 classifier-free guidance 的方式显式控制生成视频的时序一致性",
        "<strong>多模态条件支持</strong>：支持文本→图像 prior 映射、图像 CLIP 嵌入、深度图等多种条件输入，实现 text-to-video、image-to-video、video-to-video 等多种生成模式",
        "<strong>v-参数化</strong>：采用 v-prediction 替代 <span class=\"kb-math kb-math-inline\">\\epsilon</span>-prediction，显著改善视频样本的色彩一致性",
        "<strong>多阶段训练策略</strong>：从预训练 SD 出发，依次引入 CLIP 图像条件（15k步）→ 时序层（75k步）→ 结构条件（25k+10k步），使用 240M 图像 + 6.4M 视频片段",
        "<strong>用户研究验证</strong>：在 AMT 用户研究中，Gen-2 在 prompt 忠实度和时序一致性上均显著优于 Text2Live、SDEdit 等基线方法"
      ],
      "detail": "<p><img alt=\"Gen-2 方法总览\" src=\"https://ar5iv.labs.arxiv.org/html/2302.03011/assets/x2.png\" />\n<em>图：Gen-2 方法总览。输入视频通过 MiDaS 提取深度图作为结构表示 <span class=\"kb-math kb-math-inline\">s</span>，通过 CLIP 提取图像嵌入作为内容表示 <span class=\"kb-math kb-math-inline\">c</span>。结构表示经编码器后与噪声潜变量拼接输入 UNet，内容表示通过交叉注意力机制注入。文本条件通过 prior 网络映射为 CLIP 图像嵌入。</em></p>\n<p><img alt=\"时序扩展架构\" src=\"https://ar5iv.labs.arxiv.org/html/2302.03011/assets/x3.png\" />\n<em>图：时序扩展架构。在 UNet 的每个残差块中，2D 空间卷积后插入 1D 时序卷积（左）；在每个 2D 空间注意力块后插入 1D 时序注意力块（右）。图像被视为单帧视频，时序层仅对多帧视频激活。</em></p>\n<pre><code class=\"language-python\"># Gen-2 训练与推理伪代码\n# === 训练阶段 ===\n# 输入: 视频帧 x ∈ R^(n×3×H×W), 深度图 d = MiDaS(x)\n# 结构表示: 对深度图加噪控制细节层级\nx_s = alpha(t_s) * d + sigma(t_s) * epsilon   # t_s 控制结构细节\ns = Encoder(x_s)                                # 编码为潜在结构表示\n\n# 内容表示: CLIP 图像嵌入\nc = CLIP_image(x[0])                            # 取首帧的 CLIP 嵌入\n\n# 潜在编码\nz = Encoder_LDM(x)                              # z ∈ R^(n×4×H/8×W/8)\n\n# 前向扩散\nt ~ Uniform(0, T)\nz_t = alpha(t) * z + sigma(t) * epsilon\n\n# UNet 预测 (v-parameterization)\n# 结构 s 与 z_t 在通道维拼接; 内容 c 通过交叉注意力注入\nv_pred = UNet(concat(z_t, s), t, c)             # 含时序层的 UNet\nloss = ||v - v_pred||^2                          # v = alpha(t)*eps - sigma(t)*z\n\n# === 推理阶段 (含时序引导) ===\nfor t in reversed(timesteps):                    # DDIM 采样\n    mu_video = UNet_video(z_t, t, c=None, s)     # 视频模型无条件预测\n    mu_image = UNet_image(z_t, t, c=None, s)     # 图像模型逐帧预测\n    mu_cond  = UNet_video(z_t, t, c, s)           # 视频模型有条件预测\n\n    # 三项引导: 基础 + 时序引导 + 内容引导\n    mu_guided = mu_image \\\n        + omega_t * (mu_video - mu_image) \\       # 时序一致性控制\n        + omega   * (mu_cond - mu_video)           # 内容引导\n\n    z_{t-1} = DDIM_step(z_t, mu_guided)\n</code></pre>\n<p><strong>动机与背景：从图像扩散到视频合成的挑战</strong></p>\n<p>扩散模型在图像生成领域取得了突破性进展（DALL-E 2、Stable Diffusion、Imagen），但将其扩展到视频合成面临三大核心挑战：（1）视频数据的时序一致性要求模型理解帧间关系；（2）视频数据集规模远小于图像数据集，导致泛化能力不足；（3）视频的高维特性使得直接在像素空间建模计算代价极高。此前的方法如 Video Diffusion Models (VDM) 直接在像素空间操作，受限于分辨率和长度；而基于 GAN 或自回归模型的方法则难以保证生成质量和多样性。Gen-2 的核心洞察在于：<strong>视频可以被分解为与运动相关的\"结构\"和与外观相关的\"内容\"两个独立维度</strong>，通过分别控制这两个维度，可以实现灵活且高质量的视频合成。</p>\n<p><strong>核心机制一：结构与内容的解耦表示</strong></p>\n<p>Gen-2 的关键创新在于将条件信号分为结构表示 <span class=\"kb-math kb-math-inline\">s</span> 和内容表示 <span class=\"kb-math kb-math-inline\">c</span> 两个正交维度。<strong>结构表示</strong>采用 MiDaS 单目深度估计网络从输入视频中提取深度图，深度图天然编码了场景的几何布局和物体运动轨迹，同时对外观变化具有不变性。为了控制结构信息的细节层级，论文提出了一个巧妙的机制：对深度图施加扩散噪声，噪声时间步 <span class=\"kb-math kb-math-inline\">t_s</span> 越大，深度图细节越模糊，仅保留粗略的场景布局；<span class=\"kb-math kb-math-inline\">t_s = 0</span> 时保留完整深度细节。具体地，带噪深度图为：</p>\n<div class=\"kb-math kb-math-display\">x_s = \\alpha_{t_s} \\cdot d + \\sigma_{t_s} \\cdot \\epsilon, \\quad \\epsilon \\sim \\mathcal{N}(0, I)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">d</span> 为原始深度图，<span class=\"kb-math kb-math-inline\">\\alpha_{t_s}</span> 和 <span class=\"kb-math kb-math-inline\">\\sigma_{t_s}</span> 为扩散调度参数。编码后的结构表示 <span class=\"kb-math kb-math-inline\">s = \\mathcal{E}(x_s)</span> 在通道维度上与噪声潜变量 <span class=\"kb-math kb-math-inline\">z_t</span> 拼接，作为 UNet 的输入。<strong>内容表示</strong>则采用 CLIP 图像编码器提取的嵌入向量，通过交叉注意力机制注入 UNet 的每一层。对于文本条件输入，论文训练了一个类似 DALL-E 2 的 prior 网络，将 CLIP 文本嵌入映射为 CLIP 图像嵌入空间，从而统一了文本和图像两种条件输入的处理方式。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：结构-内容解耦使得用户可以独立控制\"视频中发生什么运动\"（结构）和\"视频看起来像什么\"（内容），例如保持原视频的运动轨迹但将场景风格从夏天变为冬天。</div>\n<p><strong>核心机制二：时空联合训练与时序引导</strong></p>\n<p>Gen-2 在预训练的图像 LDM（Stable Diffusion）基础上，通过插入时序层将其扩展为视频模型。具体地，在 UNet 的每个残差块中，2D 空间卷积后插入 1D 时序卷积（沿时间轴操作）；在每个 2D 空间注意力块后插入 1D 时序注意力块（帧间自注意力）。关键设计是：<strong>图像和视频共享所有空间层参数，时序层仅对多帧视频输入激活</strong>。这通过张量重排实现：形状为 <span class=\"kb-math kb-math-inline\">b \\times n \\times c \\times h \\times w</span> 的视频张量在空间层中被重排为 <span class=\"kb-math kb-math-inline\">(b \\cdot n) \\times c \\times h \\times w</span>（每帧独立处理），在时序层中被重排为 <span class=\"kb-math kb-math-inline\">(b \\cdot h \\cdot w) \\times c \\times n</span>（每个空间位置跨帧处理）。</p>\n<p>这种联合训练策略带来了一个独特的推理时控制能力——<strong>时序引导尺度 <span class=\"kb-math kb-math-inline\">\\omega_t</span></strong>。由于图像模型和视频模型共享参数，对同一输入，图像模型（逐帧独立预测）和视频模型（跨帧联合预测）会给出不同的去噪方向。类比 classifier-free guidance 的思想，论文将图像模型的预测视为\"无时序条件\"的基线，视频模型的预测视为\"有时序条件\"的增强，通过线性外推控制时序一致性强度：</p>\n<div class=\"kb-math kb-math-display\">\\tilde{\\mu}_\\theta(z_t, t, c, s) = \\mu^\\pi_\\theta(z_t, t, \\varnothing, s) + \\omega_t \\left(\\mu_\\theta(z_t, t, \\varnothing, s) - \\mu^\\pi_\\theta(z_t, t, \\varnothing, s)\\right) + \\omega \\left(\\mu_\\theta(z_t, t, c, s) - \\mu_\\theta(z_t, t, \\varnothing, s)\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mu^\\pi_\\theta</span> 为图像模型预测，<span class=\"kb-math kb-math-inline\">\\mu_\\theta</span> 为视频模型预测，<span class=\"kb-math kb-math-inline\">\\omega_t</span> 控制时序一致性，<span class=\"kb-math kb-math-inline\">\\omega</span> 为标准的内容引导尺度。实验表明，<span class=\"kb-math kb-math-inline\">\\omega_t</span> 较低时生成的视频具有\"手绘\"风格（帧间变化大），<span class=\"kb-math kb-math-inline\">\\omega_t</span> 较高时生成更平滑一致的视频。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：时序引导需要三次 UNet 前向传播（图像无条件、视频无条件、视频有条件），推理成本约为标准 classifier-free guidance 的 1.5 倍。</div>\n<p><strong>训练流程与工程细节</strong></p>\n<p>Gen-2 采用精心设计的多阶段训练策略：（1）从预训练 Stable Diffusion 出发，将条件从 CLIP 文本嵌入切换为 CLIP 图像嵌入，仅在图像上微调 15k 步；（2）引入时序卷积和时序注意力层，在图像（12.5% 概率采样）和视频上联合训练 75k 步，视频为 8 帧、间隔 4 帧、分辨率 448×256；（3）添加结构条件（固定 <span class=\"kb-math kb-math-inline\">t_s = 0</span>）训练 25k 步；（4）将 <span class=\"kb-math kb-math-inline\">t_s</span> 在 0-7 之间均匀采样，继续训练 10k 步。训练数据包括 240M 内部图像和 6.4M 视频片段。模型采用 v-parameterization（预测 <span class=\"kb-math kb-math-inline\">v = \\alpha_t \\epsilon - \\sigma_t z</span> 而非 <span class=\"kb-math kb-math-inline\">\\epsilon</span>），这对视频样本的色彩一致性至关重要。推理时使用 DDIM 采样器。</p>",
      "quiz": {
        "q": "Gen-2 中控制结构表示细节层级的机制是什么？",
        "options": [
          "调整 MiDaS 深度估计网络的分辨率参数",
          "对深度图施加不同程度的扩散噪声，通过噪声时间步 t_s 控制",
          "使用不同大小的卷积核对深度图进行模糊处理",
          "通过 CLIP 嵌入的维度裁剪控制信息量"
        ],
        "answer": 1,
        "explain": "论文通过对 MiDaS 深度图施加扩散噪声 x_s = α_{t_s}·d + σ_{t_s}·ε 来控制结构细节层级，t_s 越大噪声越多，深度图越模糊仅保留粗略布局，t_s=0 时保留完整细节。"
      }
    },
    {
      "id": "gen3",
      "num": 14,
      "name": "Gen-3 Alpha",
      "fullName": "Runway Gen-3 Alpha (Runway Gen-3 Alpha)",
      "year": "2024.06",
      "org": "Runway",
      "parent": "gen2",
      "paperUrl": "https://runwayml.com/research/introducing-gen-3-alpha",
      "projectUrl": "",
      "category": "diffusion_based",
      "motivation": "时空世界模型，全局物理一致性建模",
      "summary": "Gen-3 Alpha 是 Runway 推出的新一代视频生成基础模型，通过大规模视频-图像联合训练和时空世界模型架构，在保真度、时序一致性和运动表现上大幅超越 Gen-2，迈向通用世界模型（General World Models）的目标。",
      "keyPoints": [
        "<strong>多模态联合训练</strong>：在视频和图像上联合训练，统一支持 Text-to-Video、Image-to-Video、Text-to-Image 三种生成模式",
        "<strong>大规模训练基础设施</strong>：全新构建的大规模多模态训练基础设施，支撑更大参数量和更长序列的训练",
        "<strong>时间密集描述（Temporally Dense Captions）</strong>：训练时使用高描述性的时间密集标注，实现精细的时序控制和关键帧编排",
        "<strong>多种控制模式</strong>：支持 Motion Brush（运动笔刷）、Advanced Camera Controls（高级相机控制）、Director Mode（导演模式）等精细控制手段",
        "<strong>逼真人物生成</strong>：在人物表情、动作、手势和情感表达方面表现突出，支持多样化的叙事场景",
        "<strong>行业定制化</strong>：支持针对特定艺术风格和叙事需求的模型微调（Fine-tuning），与娱乐和媒体机构合作定制",
        "<strong>安全与溯源</strong>：集成 C2PA 内容溯源标准和自研视觉内容审核系统",
        "<strong>通用世界模型方向</strong>：定位为迈向 General World Models（GWM）的关键一步，目标是构建能理解和模拟真实世界动态的 AI 系统"
      ],
      "detail": "<h5>核心架构示意</h5>\n<p><img alt=\"Gen-3 Alpha 生成示例\" src=\"https://d3phaj0sisr2ct.cloudfront.net/site/videos/gen-3-alpha/gen-3-alpha-output-001.jpg\" />\n<em>图：Gen-3 Alpha 生成的视频帧示例——展示了模型在光影反射、人物细节和场景一致性方面的能力</em></p>\n<div class=\"warn-box\">⚠️ 注意：Gen-3 Alpha 未发布正式学术论文，以下技术分析基于 Runway 官方博客、General World Models 研究公告及公开的技术信息综合推断。</div>\n<h5>推测架构伪代码</h5>\n<pre><code class=\"language-python\"># Gen-3 Alpha 推测训练流程伪代码\n# 基于 Diffusion Transformer (DiT) 架构的视频生成\n\n# Stage 1: 视频-图像联合编码\nvideo_latent = VideoVAE.encode(video)          # 视频编码到潜空间 [B, T, C, H, W]\nimage_latent = VideoVAE.encode(image)          # 图像视为单帧视频 [B, 1, C, H, W]\ntext_emb = TextEncoder(temporally_dense_caption)  # 时间密集描述编码\n\n# Stage 2: 扩散过程 (Diffusion Transformer)\nnoise = torch.randn_like(video_latent)\nt = sample_timestep()\nnoisy_latent = scheduler.add_noise(video_latent, noise, t)\n\n# 时空注意力机制\nfor block in DiT_blocks:\n    # 空间自注意力 — 帧内像素关系\n    x = block.spatial_attention(noisy_latent)\n    # 时间自注意力 — 帧间时序一致性\n    x = block.temporal_attention(x)\n    # 文本交叉注意力 — 条件控制\n    x = block.cross_attention(x, text_emb)\n    x = block.ffn(x)\n\n# 预测噪声并优化\npred_noise = DiT(noisy_latent, t, text_emb)\nloss = MSE(pred_noise, noise)\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统视频生成模型面临三大核心挑战：<strong>时序一致性差</strong>（帧间闪烁、物体变形）、<strong>运动质量低</strong>（不自然的运动轨迹）、<strong>物理合理性不足</strong>（违反基本物理规律）。Runway 的前代产品 Gen-2 虽然在文本到视频生成领域取得了突破，但仍然在复杂相机运动和物体运动方面存在明显局限。</p>\n<p>2023 年 12 月，Runway 提出了 <strong>General World Models（通用世界模型）</strong> 的研究方向，其核心理念是：</p>\n<div class=\"key-point\">💡 关键：世界模型是一种构建环境内部表征并用其模拟未来事件的 AI 系统。通用世界模型的目标是表征和模拟真实世界中遇到的各种情境和交互，而非局限于游戏或驾驶等狭窄场景。</div>\n<p>Gen-3 Alpha 正是这一研究方向的首个重要成果——它不仅是一个视频生成工具，更是一个初步具备世界理解能力的基础模型。</p>\n<h5>核心技术机制</h5>\n<p><strong>1. 大规模视频-图像联合训练</strong></p>\n<p>Gen-3 Alpha 采用视频和图像的联合训练策略。这种多模态联合训练带来两个关键优势：</p>\n<ul>\n<li><strong>数据效率提升</strong>：图像数据量远大于高质量视频数据，联合训练使模型能从海量图像中学习丰富的视觉先验（纹理、光影、构图），再将这些知识迁移到视频生成中</li>\n<li><strong>统一表征空间</strong>：视频和图像共享同一潜空间表征，使得模型能够无缝支持 Text-to-Video、Image-to-Video 和 Text-to-Image 三种生成模式</li>\n</ul>\n<p>这一策略与 Stable Video Diffusion（SVD）等工作的思路一致，但 Gen-3 Alpha 在训练规模和数据质量上进行了大幅提升。</p>\n<p><strong>2. 时间密集描述（Temporally Dense Captions）</strong></p>\n<p>Gen-3 Alpha 训练的一个核心创新是使用 <strong>时间密集描述</strong>（temporally dense captions）。与传统的单句视频描述不同，时间密集描述为视频的不同时间段提供详细的文本标注：</p>\n<div class=\"kb-math kb-math-display\">\\text{Caption}(v) = \\{(t_i, c_i)\\}_{i=1}^{N}, \\quad t_i \\in [0, T]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">t_i</span> 是时间戳，<span class=\"kb-math kb-math-inline\">c_i</span> 是对应时刻的描述文本，<span class=\"kb-math kb-math-inline\">T</span> 是视频总时长。这种标注方式使模型能够：</p>\n<ul>\n<li>实现精确的<strong>关键帧控制</strong>：用户可以描述场景在不同时间点的状态变化</li>\n<li>支持<strong>想象性过渡</strong>：如\"镜头从蚂蚁特写拉远，展现远处的社区\"这样的复杂时序叙事</li>\n<li>理解<strong>电影术语</strong>：如 FPV（第一人称视角）、推拉镜头、航拍等专业摄影指令</li>\n</ul>\n<p><strong>3. 时空注意力机制</strong></p>\n<p>Gen-3 Alpha 的架构核心是基于 Diffusion Transformer（DiT）的时空注意力机制。推测其采用分离式时空注意力设计：</p>\n<div class=\"kb-math kb-math-display\">\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V</div>\n<ul>\n<li><strong>空间注意力</strong>：在每一帧内部建模像素间的空间关系，捕获场景结构和纹理细节</li>\n<li><strong>时间注意力</strong>：跨帧建模同一空间位置的时序演变，确保运动连贯性和物理一致性</li>\n<li><strong>交叉注意力</strong>：将文本条件注入生成过程，实现精确的语义控制</li>\n</ul>\n<p>这种设计使模型能够同时保证<strong>帧内质量</strong>和<strong>帧间一致性</strong>，是解决视频生成中\"闪烁\"和\"漂移\"问题的关键。</p>\n<p><strong>4. 多层次控制体系</strong></p>\n<p>Gen-3 Alpha 提供了从粗粒度到细粒度的多层次控制：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>控制模式</th>\n<th>功能描述</th>\n<th>控制粒度</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Text Prompt</td>\n<td>文本描述驱动生成</td>\n<td>全局语义</td>\n</tr>\n<tr>\n<td>Image-to-Video</td>\n<td>以参考图像为起始帧</td>\n<td>视觉风格+内容</td>\n</tr>\n<tr>\n<td>Motion Brush</td>\n<td>指定区域的运动方向和强度</td>\n<td>局部运动</td>\n</tr>\n<tr>\n<td>Advanced Camera Controls</td>\n<td>控制相机运动轨迹</td>\n<td>相机参数</td>\n</tr>\n<tr>\n<td>Director Mode</td>\n<td>综合场景编排</td>\n<td>多维度协同</td>\n</tr>\n</tbody>\n</table></div>\n<h5>与 Gen-2 的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>Gen-2</th>\n<th>Gen-3 Alpha</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>训练数据</td>\n<td>视频为主</td>\n<td>视频+图像联合训练</td>\n</tr>\n<tr>\n<td>训练基础设施</td>\n<td>常规规模</td>\n<td>全新大规模多模态训练基础设施</td>\n</tr>\n<tr>\n<td>标注方式</td>\n<td>常规视频描述</td>\n<td>时间密集描述（Temporally Dense Captions）</td>\n</tr>\n<tr>\n<td>人物生成</td>\n<td>表情和动作有限</td>\n<td>丰富的表情、手势和情感表达</td>\n</tr>\n<tr>\n<td>运动质量</td>\n<td>复杂运动易失败</td>\n<td>大幅改善运动合理性</td>\n</tr>\n<tr>\n<td>时序一致性</td>\n<td>存在闪烁和漂移</td>\n<td>显著提升帧间一致性</td>\n</tr>\n<tr>\n<td>控制能力</td>\n<td>基础文本控制</td>\n<td>多层次精细控制（Motion Brush、Camera Controls 等）</td>\n</tr>\n<tr>\n<td>定位</td>\n<td>视频生成工具</td>\n<td>迈向通用世界模型的基础模型</td>\n</tr>\n</tbody>\n</table></div>\n<h5>安全与责任</h5>\n<p>Gen-3 Alpha 在安全性方面引入了两项重要机制：</p>\n<ul>\n<li><strong>C2PA 内容溯源标准</strong>：为生成内容嵌入数字水印和元数据，确保 AI 生成内容可追溯、可验证</li>\n<li><strong>自研视觉内容审核系统</strong>：在生成管线中集成内容安全过滤，防止生成有害或不当内容</li>\n</ul>\n<div class=\"key-point\">💡 关键：Gen-3 Alpha 的核心贡献不在于提出全新的算法公式，而在于工程层面的系统性突破——通过大规模训练基础设施、高质量数据标注流程和精细化控制体系的协同优化，将视频生成质量推向新的高度，并首次将\"世界模型\"的概念从学术探索推进到产品级应用。</div>",
      "quiz": {
        "q": "Gen-3 Alpha 相比 Gen-2 的核心训练策略变化是什么？",
        "options": [
          "从 GAN 架构切换到扩散模型架构",
          "采用视频和图像联合训练，并使用时间密集描述标注",
          "将模型参数量缩小以提升推理速度",
          "放弃文本条件，改用纯图像条件生成"
        ],
        "answer": 1,
        "explain": "Gen-3 Alpha 的关键变化是在视频和图像上联合训练，并引入时间密集描述（temporally dense captions）实现精细时序控制，这是其在保真度、一致性和运动质量上大幅提升的核心原因。"
      }
    },
    {
      "id": "gen4",
      "num": 15,
      "name": "Gen-4",
      "fullName": "Runway Gen-4 (Runway Gen-4)",
      "year": "2026.01",
      "org": "Runway",
      "parent": "gen3",
      "paperUrl": "https://runwayml.com/gen-4",
      "projectUrl": "",
      "category": "diffusion_based",
      "motivation": "世界一致性，角色身份跨场景持久性",
      "summary": "Gen-4 的核心目标是：世界一致性，角色身份跨场景持久性。",
      "keyPoints": [
        "核心动机：世界一致性，角色身份跨场景持久性",
        "演化来源：继承或改进自 gen3",
        "代表机构：Runway"
      ],
      "detail": "<p>世界一致性，角色身份跨场景持久性</p>"
    },
    {
      "id": "pika",
      "num": 16,
      "name": "Pika",
      "fullName": "Pika视频生成 (Pika)",
      "year": "2023.04",
      "org": "Pika Labs",
      "parent": "svd",
      "paperUrl": "https://pika.art",
      "projectUrl": "",
      "category": "diffusion_based",
      "motivation": "Pikaffects物理特效，电影级镜头控制",
      "summary": "Pika 的核心目标是：Pikaffects物理特效，电影级镜头控制。",
      "keyPoints": [
        "核心动机：Pikaffects物理特效，电影级镜头控制",
        "演化来源：继承或改进自 svd",
        "代表机构：Pika Labs"
      ],
      "detail": "<p>Pikaffects物理特效，电影级镜头控制</p>"
    },
    {
      "id": "pika25",
      "num": 17,
      "name": "Pika 2.5",
      "fullName": "Pika 2.5 (Pika 2.5)",
      "year": "2025.11",
      "org": "Pika Labs",
      "parent": "pika",
      "paperUrl": "https://pika.art/blog/pika-2-5",
      "projectUrl": "",
      "category": "diffusion_based",
      "motivation": "实时唇形同步，自动音效生成",
      "summary": "Pika 2.5 的核心目标是：实时唇形同步，自动音效生成。",
      "keyPoints": [
        "核心动机：实时唇形同步，自动音效生成",
        "演化来源：继承或改进自 pika",
        "代表机构：Pika Labs"
      ],
      "detail": "<p>实时唇形同步，自动音效生成</p>"
    },
    {
      "id": "lumiere",
      "num": 18,
      "name": "Lumiere",
      "fullName": "光影视频生成 (Lumiere)",
      "year": "2024.01",
      "org": "Google Research",
      "parent": "svd",
      "paperUrl": "https://arxiv.org/abs/2401.12945",
      "projectUrl": "",
      "category": "diffusion_based",
      "motivation": "时空U-Net单次生成完整时长，全局运动一致性",
      "summary": "Lumiere 的核心目标是：时空U-Net单次生成完整时长，全局运动一致性。",
      "keyPoints": [
        "核心动机：时空U-Net单次生成完整时长，全局运动一致性",
        "演化来源：继承或改进自 svd",
        "代表机构：Google Research"
      ],
      "detail": "<p>时空U-Net单次生成完整时长，全局运动一致性</p>"
    },
    {
      "id": "cogvideox",
      "num": 19,
      "name": "CogVideoX",
      "fullName": "认知视频X (CogVideoX)",
      "year": "2024.08",
      "org": "智谱AI",
      "parent": "cogvideo",
      "paperUrl": "https://arxiv.org/abs/2408.06072",
      "projectUrl": "",
      "category": "diffusion_based",
      "motivation": "3D因果VAE，Expert Transformer架构",
      "summary": "CogVideoX 的核心目标是：3D因果VAE，Expert Transformer架构。",
      "keyPoints": [
        "核心动机：3D因果VAE，Expert Transformer架构",
        "演化来源：继承或改进自 cogvideo",
        "代表机构：智谱AI"
      ],
      "detail": "<p>3D因果VAE，Expert Transformer架构</p>"
    },
    {
      "id": "veo",
      "num": 20,
      "name": "Veo",
      "fullName": "Veo视频生成 (Veo)",
      "year": "2024.05",
      "org": "Google DeepMind",
      "parent": "lumiere",
      "paperUrl": "https://deepmind.google/technologies/veo/",
      "projectUrl": "",
      "category": "diffusion_based",
      "motivation": "高分辨率生成，增强可控性",
      "summary": "Veo 的核心目标是：高分辨率生成，增强可控性。",
      "keyPoints": [
        "核心动机：高分辨率生成，增强可控性",
        "演化来源：继承或改进自 lumiere",
        "代表机构：Google DeepMind"
      ],
      "detail": "<p>高分辨率生成，增强可控性</p>"
    },
    {
      "id": "veo3",
      "num": 21,
      "name": "Veo 3.1",
      "fullName": "Veo 3.1 (Veo 3.1)",
      "year": "2026.01",
      "org": "Google DeepMind",
      "parent": "veo",
      "paperUrl": "https://blog.google/technology/ai/google-veo-3-update/",
      "projectUrl": "",
      "category": "diffusion_based",
      "motivation": "原生4K/60fps音视频同步，Cinematic Anchor",
      "summary": "Veo 3.1 的核心目标是：原生4K/60fps音视频同步，Cinematic Anchor。",
      "keyPoints": [
        "核心动机：原生4K/60fps音视频同步，Cinematic Anchor",
        "演化来源：继承或改进自 veo",
        "代表机构：Google DeepMind"
      ],
      "detail": "<p>原生4K/60fps音视频同步，Cinematic Anchor</p>"
    },
    {
      "id": "hunyuanvideo",
      "num": 22,
      "name": "HunyuanVideo",
      "fullName": "混元视频 (HunyuanVideo)",
      "year": "2024.12",
      "org": "腾讯",
      "parent": "svd",
      "paperUrl": "https://github.com/Tencent/HunyuanVideo",
      "projectUrl": "",
      "category": "diffusion_based",
      "motivation": "开源SSTA-DiT架构，8.3B参数",
      "summary": "HunyuanVideo 的核心目标是：开源SSTA-DiT架构，8.3B参数。",
      "keyPoints": [
        "核心动机：开源SSTA-DiT架构，8.3B参数",
        "演化来源：继承或改进自 svd",
        "代表机构：腾讯"
      ],
      "detail": "<p>开源SSTA-DiT架构，8.3B参数</p>"
    },
    {
      "id": "hunyuanvideo15",
      "num": 23,
      "name": "HunyuanVideo 1.5",
      "fullName": "混元视频1.5 (HunyuanVideo 1.5)",
      "year": "2026.04",
      "org": "腾讯",
      "parent": "hunyuanvideo",
      "paperUrl": "https://github.com/Tencent/HunyuanVideo",
      "projectUrl": "",
      "category": "diffusion_based",
      "motivation": "消费级GPU优化，14GB VRAM可运行",
      "summary": "HunyuanVideo 1.5 的核心目标是：消费级GPU优化，14GB VRAM可运行。",
      "keyPoints": [
        "核心动机：消费级GPU优化，14GB VRAM可运行",
        "演化来源：继承或改进自 hunyuanvideo",
        "代表机构：腾讯"
      ],
      "detail": "<p>消费级GPU优化，14GB VRAM可运行</p>"
    },
    {
      "id": "wan",
      "num": 24,
      "name": "Wan",
      "fullName": "万象视频生成 (Wan)",
      "year": "2025.02",
      "org": "阿里巴巴",
      "parent": "svd",
      "paperUrl": "https://wavespeed.ai",
      "projectUrl": "",
      "category": "diffusion_based",
      "motivation": "MoE架构，首末帧引导技术",
      "summary": "Wan 的核心目标是：MoE架构，首末帧引导技术。",
      "keyPoints": [
        "核心动机：MoE架构，首末帧引导技术",
        "演化来源：继承或改进自 svd",
        "代表机构：阿里巴巴"
      ],
      "detail": "<p>MoE架构，首末帧引导技术</p>"
    },
    {
      "id": "wan27",
      "num": 25,
      "name": "Wan 2.7",
      "fullName": "万象2.7 (Wan 2.7)",
      "year": "2026.03",
      "org": "阿里巴巴",
      "parent": "wan",
      "paperUrl": "https://wavespeed.ai/blog/wan-2-7-launch",
      "projectUrl": "",
      "category": "diffusion_based",
      "motivation": "2.7B参数开源，混合专家扩展",
      "summary": "Wan 2.7 的核心目标是：2.7B参数开源，混合专家扩展。",
      "keyPoints": [
        "核心动机：2.7B参数开源，混合专家扩展",
        "演化来源：继承或改进自 wan",
        "代表机构：阿里巴巴"
      ],
      "detail": "<p>2.7B参数开源，混合专家扩展</p>"
    },
    {
      "id": "seedance",
      "num": 26,
      "name": "Seedance",
      "fullName": "即梦视频生成 (Seedance)",
      "year": "2025.08",
      "org": "字节跳动",
      "parent": "svd",
      "paperUrl": "https://dreamina.com",
      "projectUrl": "",
      "category": "diffusion_based",
      "motivation": "时间线提示，精确时间窗口动作控制",
      "summary": "Seedance 的核心目标是：时间线提示，精确时间窗口动作控制。",
      "keyPoints": [
        "核心动机：时间线提示，精确时间窗口动作控制",
        "演化来源：继承或改进自 svd",
        "代表机构：字节跳动"
      ],
      "detail": "<p>时间线提示，精确时间窗口动作控制</p>"
    },
    {
      "id": "seedance2",
      "num": 27,
      "name": "Seedance 2.0",
      "fullName": "即梦2.0 (Seedance 2.0)",
      "year": "2026.02",
      "org": "字节跳动",
      "parent": "seedance",
      "paperUrl": "https://dreamina.com/seedance",
      "projectUrl": "",
      "category": "diffusion_based",
      "motivation": "原生音视频同步，C2PA加密水印",
      "summary": "Seedance 2.0 的核心目标是：原生音视频同步，C2PA加密水印。",
      "keyPoints": [
        "核心动机：原生音视频同步，C2PA加密水印",
        "演化来源：继承或改进自 seedance",
        "代表机构：字节跳动"
      ],
      "detail": "<p>原生音视频同步，C2PA加密水印</p>"
    },
    {
      "id": "kling",
      "num": 28,
      "name": "Kling",
      "fullName": "可灵视频生成 (Kling)",
      "year": "2024.06",
      "org": "快手",
      "parent": "svd",
      "paperUrl": "https://kling.kuaishou.com",
      "projectUrl": "",
      "category": "diffusion_based",
      "motivation": "3D时空联合注意力，2分钟1080p生成",
      "summary": "Kling 的核心目标是：3D时空联合注意力，2分钟1080p生成。",
      "keyPoints": [
        "核心动机：3D时空联合注意力，2分钟1080p生成",
        "演化来源：继承或改进自 svd",
        "代表机构：快手"
      ],
      "detail": "<p>3D时空联合注意力，2分钟1080p生成</p>"
    },
    {
      "id": "kling3",
      "num": 29,
      "name": "Kling 3.0",
      "fullName": "可灵3.0 (Kling 3.0)",
      "year": "2026.01",
      "org": "快手",
      "parent": "kling",
      "paperUrl": "https://arxiv.org/abs/2512.16776",
      "projectUrl": "",
      "category": "diffusion_based",
      "motivation": "4K/60fps生成，Kling-Foley原生音频",
      "summary": "Kling-Omni 提出了一个基于 Diffusion Transformer (DiT) 与视觉语言模型 (VLM) 对齐的统一多模态视频生成与编辑框架，通过 Multi-modal Visual Language (MVL) 输入协议将生成、编辑、参考引导等任务统一到单一模型中，支持 4K/60fps 输出并原生集成音频生成（Kling-Foley），在参考生成和视频编辑任务上达到业界领先水平。",
      "keyPoints": [
        "<strong>统一架构</strong>：DiT 骨干网络与 VLM 对齐，通过共享嵌入空间实现视频生成、编辑、多模态参考引导等任务的统一建模",
        "<strong>MVL 输入协议</strong>：Multi-modal Visual Language 格式将文本、图像、视频等多模态输入编码为统一序列，消除任务间的输入格式差异",
        "<strong>渐进式分辨率训练</strong>：从 256px 到 4K 的多阶段渐进训练策略，结合 flow matching（v-prediction 参数化）作为生成范式",
        "<strong>一致性蒸馏</strong>：将多步扩散模型蒸馏为少步生成模型，大幅降低推理延迟",
        "<strong>NTK-aware RoPE</strong>：位置编码外推技术，支持训练时未见过的更长序列和更高分辨率",
        "<strong>级联超分辨率 DiT</strong>：专用超分模型实现 4K 分辨率和 60fps 帧率输出",
        "<strong>Kling-Foley 音频生成</strong>：原生集成视频到音频生成模块，实现视听一体化",
        "<strong>高效训练基础设施</strong>：弹性 Ulysses 并行、流水线感知 offloading、97% 有效训练时间比",
        "<strong>FP8 混合量化推理</strong>：覆盖 GEMM 和注意力模块的 FP8 量化，结合缓存机制实现约 2× 推理加速",
        "<strong>三层数据过滤体系</strong>：基础质量过滤 → 时序稳定性评估 → 跨模态对齐检测的系统化数据工程"
      ],
      "detail": "<p><img alt=\"Kling-Omni 整体架构图\" src=\"https://arxiv.org/html/2512.16776v1/x1.png\" />\n<em>图：Kling-Omni 整体架构。DiT 骨干与 VLM 对齐，接受 MVL 格式的多模态输入，统一处理生成、编辑、参考引导等任务。</em></p>\n<p><img alt=\"渐进式训练策略\" src=\"https://arxiv.org/html/2512.16776v1/x2.png\" />\n<em>图：渐进式分辨率训练流程，从低分辨率逐步提升至 4K，每阶段引入更复杂的任务和数据。</em></p>\n<pre><code class=\"language-python\"># Kling-Omni 核心训练流程伪代码\n# 1. MVL 输入编码\ndef encode_mvl_input(text, images, videos, edit_instructions):\n    &quot;&quot;&quot;将多模态输入统一编码为 MVL 序列&quot;&quot;&quot;\n    text_tokens = text_encoder(text)           # 文本编码\n    image_tokens = vae_encode(images)          # 图像 → latent tokens\n    video_tokens = vae_encode(videos)          # 视频 → latent tokens\n    # VLM 对齐：将所有模态映射到共享嵌入空间\n    unified_cond = vlm_align([text_tokens, image_tokens, video_tokens])\n    return unified_cond\n\n# 2. Flow Matching 训练 (v-prediction)\ndef train_step(dit_model, x_0, condition):\n    t = sample_timestep()                      # 采样时间步\n    noise = torch.randn_like(x_0)\n    x_t = (1 - t) * x_0 + t * noise           # 线性插值构造含噪样本\n    v_target = noise - x_0                     # v-prediction 目标\n    v_pred = dit_model(x_t, t, condition)      # DiT 预测速度场\n    loss = mse_loss(v_pred, v_target)\n    loss.backward()\n    optimizer.step()\n\n# 3. 一致性蒸馏 (少步推理)\ndef consistency_distill(teacher, student, x_0):\n    &quot;&quot;&quot;将多步 teacher 蒸馏为少步 student&quot;&quot;&quot;\n    t_n, t_n1 = sample_adjacent_timesteps()\n    x_tn = add_noise(x_0, t_n)\n    # Teacher: ODE 求解从 t_n 到 t_n+1\n    x_teacher = ode_solve(teacher, x_tn, t_n, t_n1)\n    # Student: 直接预测\n    x_student = student(x_tn, t_n)\n    loss = mse_loss(x_student, x_teacher.detach())\n    return loss\n\n# 4. 渐进式分辨率训练\nstages = [\n    {&quot;resolution&quot;: 256,  &quot;tasks&quot;: [&quot;t2v_basic&quot;]},\n    {&quot;resolution&quot;: 512,  &quot;tasks&quot;: [&quot;t2v&quot;, &quot;i2v&quot;]},\n    {&quot;resolution&quot;: 1024, &quot;tasks&quot;: [&quot;t2v&quot;, &quot;i2v&quot;, &quot;editing&quot;, &quot;reference&quot;]},\n    {&quot;resolution&quot;: 2048, &quot;tasks&quot;: [&quot;all_tasks&quot;]},\n    {&quot;resolution&quot;: 4096, &quot;tasks&quot;: [&quot;all_tasks + super_resolution&quot;]},\n]\nfor stage in stages:\n    train(model, stage[&quot;resolution&quot;], stage[&quot;tasks&quot;])\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统视频生成领域面临严重的任务碎片化问题：文本到视频（T2V）、图像到视频（I2V）、视频编辑、参考引导生成等任务通常需要独立的专家模型。这不仅增加了系统复杂度，还导致不同任务间的能力无法共享和协同。此外，现有方法在以下方面存在明显不足：\n- <strong>分辨率与帧率受限</strong>：大多数模型难以达到 4K/60fps 的高质量输出\n- <strong>多模态理解不足</strong>：缺乏对复杂多模态输入（多图参考、视频参考、编辑指令组合）的统一理解能力\n- <strong>音视频割裂</strong>：视频生成和音频生成通常是分离的流程</p>\n<p>Kling-Omni 的核心动机是构建一个\"通才型\"生成模型，用单一架构替代碎片化的专家模型群。</p>\n<h5>核心架构：DiT + VLM 对齐</h5>\n<p>Kling-Omni 的架构核心是一个 Diffusion Transformer (DiT)，与视觉语言模型 (VLM) 进行深度对齐。这种设计的关键创新在于：</p>\n<ol>\n<li>\n<p><strong>共享嵌入空间</strong>：VLM 将文本、图像、视频等不同模态的输入映射到统一的语义空间中，使 DiT 能够以一致的方式理解和处理各类条件信号。</p>\n</li>\n<li>\n<p><strong>MVL 输入协议</strong>：所有任务的输入被统一编码为 Multi-modal Visual Language 格式。例如，\"根据参考图像生成视频\"和\"编辑视频中的某个对象\"在 MVL 格式下具有相同的输入结构，只是条件内容不同。这使得模型无需为每个任务设计特定的输入处理逻辑。</p>\n</li>\n<li>\n<p><strong>条件注入机制</strong>：编码后的条件信号通过交叉注意力机制注入 DiT 的每一层，实现细粒度的条件控制。</p>\n</li>\n</ol>\n<div class=\"key-point\">💡 关键：MVL 协议的核心价值在于将\"任务类型\"从显式的架构差异转化为隐式的输入内容差异，从而实现真正的任务统一。</div>\n<h5>训练策略：渐进式多阶段训练</h5>\n<p>Kling-Omni 采用渐进式分辨率训练策略，从低分辨率逐步提升到高分辨率：</p>\n<ul>\n<li><strong>低分辨率阶段</strong>（256-512px）：模型学习基本的时空建模能力和语义理解</li>\n<li><strong>中分辨率阶段</strong>（512-1024px）：引入更复杂的任务（编辑、参考引导），模型学习跨模态对齐</li>\n<li><strong>高分辨率阶段</strong>（1024-2048px）：全任务训练，提升细节质量和时序一致性</li>\n<li><strong>超高分辨率阶段</strong>（4K）：通过级联超分辨率 DiT 实现最终的 4K/60fps 输出</li>\n</ul>\n<p>生成范式采用 <strong>Flow Matching</strong> 框架，使用 v-prediction 参数化。相比传统的 <span class=\"kb-math kb-math-inline\">\\epsilon</span>-prediction，v-prediction 在训练稳定性和生成质量上具有优势，其目标函数为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\mathbb{E}_{t, x_0, \\epsilon} \\left[ \\| v_\\theta(x_t, t, c) - ({\\epsilon} - x_0) \\|^2 \\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">x_t = (1-t) x_0 + t \\epsilon</span> 是线性插值构造的含噪样本，<span class=\"kb-math kb-math-inline\">c</span> 是条件信号。</p>\n<h5>一致性蒸馏与推理加速</h5>\n<p>为解决扩散模型推理步数多、延迟高的问题，Kling-Omni 采用一致性蒸馏（Consistency Distillation）技术：</p>\n<ul>\n<li><strong>Teacher 模型</strong>：完整的多步扩散模型，通过 ODE 求解器进行高质量采样</li>\n<li><strong>Student 模型</strong>：学习在更少的步数内直接映射到去噪结果</li>\n<li>蒸馏过程中，Student 被训练为在任意噪声水平上都能一步预测出与 Teacher 多步求解一致的结果</li>\n</ul>\n<p>推理端还结合了以下优化：\n- <strong>FP8 混合量化</strong>：大部分 GEMM 和自注意力模块量化为 FP8，量化/反量化操作融合进其他 kernel，实现零额外开销\n- <strong>条件缓存</strong>：对参考图像和视频的条件编码进行缓存，避免重复计算，实现约 2× 加速\n- <strong>混合并行推理</strong>：Ulysses 并行 + 张量并行，配合计算-通信重叠，隐藏大部分通信开销</p>\n<h5>位置编码外推：NTK-aware RoPE</h5>\n<p>为支持推理时生成比训练时更长的序列（更高分辨率或更多帧），Kling-Omni 采用 NTK-aware RoPE 位置编码。其核心思想是调整 RoPE 的基频参数，使模型能够在不重新训练的情况下外推到更长的序列：</p>\n<div class=\"kb-math kb-math-display\">\\text{RoPE}(x, m) = x \\cdot e^{im\\theta_k}, \\quad \\theta_k = \\beta^{-2k/d}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\beta</span> 是经过 NTK 感知调整的基频，<span class=\"kb-math kb-math-inline\">m</span> 是位置索引。通过适当增大 <span class=\"kb-math kb-math-inline\">\\beta</span>，高频分量的周期被拉长，从而避免在超出训练长度时出现位置编码冲突。</p>\n<h5>级联超分辨率与音频生成</h5>\n<p><strong>超分辨率</strong>：专用的超分 DiT 模型将基础分辨率输出提升至 4K/60fps。该模型以低分辨率视频作为条件输入，学习添加高频细节和时序插帧。</p>\n<p><strong>Kling-Foley 音频生成</strong>：原生集成的视频到音频生成模块，能够根据视频内容自动生成匹配的音效和环境音。这是 Kling-Omni 区别于其他视频生成模型的重要特性，实现了真正的视听一体化输出。</p>\n<h5>训练基础设施</h5>\n<p><img alt=\"训练流水线调度\" src=\"https://arxiv.org/html/2512.16776v1/x4.png\" />\n<em>图：Kling-Omni 的流水线调度。VAE/TE 的推理分布在数据并行和流水线并行维度上，采用交错 1F1B 调度。</em></p>\n<p>Kling-Omni 的训练基础设施实现了多项关键优化：</p>\n<ol>\n<li><strong>在线数据流水线</strong>：推理调度器将原始数据分配到 DP/PP 组，推理后由训练调度器重排以平衡负载</li>\n<li><strong>弹性 Ulysses 并行</strong>：微批次级别的动态 UP 度切换，在线自适应调度器异步确定每个微批次的并行度</li>\n<li><strong>两层 All-to-All 通信</strong>：节点内聚合 + 节点间交换，缓解 spine 交换机负载</li>\n<li><strong>MM-FlashAttention</strong>：支持任意跨模态 mask 和变长序列的打包版多模态 FlashAttention kernel</li>\n<li><strong>选择性重计算 + 流水线感知 offloading</strong>：将激活值卸载到 CPU，减少 GPU 显存占用</li>\n<li><strong>97% 有效训练时间比</strong>：自动故障检测（分钟级挂起检测）、亚分钟级重启、并行化 warmup</li>\n</ol>\n<h5>数据工程</h5>\n<p>数据系统覆盖跨模态（图像/文本/视频）和跨任务（I2V、V2V、编辑、参考生成）两个维度：</p>\n<ul>\n<li><strong>真实数据采集</strong>：大规模互联网数据挖掘，利用内部嵌入模型构建语义相关的跨模态样本</li>\n<li><strong>合成数据构造</strong>：专家模型驱动的合成流水线，包括自动逆向合成策略，构建保持时序一致性的参考-视频训练对</li>\n<li><strong>三层过滤体系</strong>：</li>\n<li>基础过滤：分辨率/时长阈值、帧级去重、音视频损坏检测、NSFW 过滤</li>\n<li>时序质量评估：模糊/抖动/压缩噪声检测、场景切换检测、低动作密度过滤</li>\n<li>跨模态对齐：视频-文本语义一致性、参考图像-目标视频保真度、编辑指令-执行结果对齐、人物身份一致性检查</li>\n</ul>\n<div class=\"warn-box\">⚠️ 注意：Kling-Omni 的核心创新不仅在于模型架构，更在于将生成、编辑、参考引导等任务通过 MVL 协议统一到单一模型中，并配合系统化的数据工程和高效训练基础设施实现了工业级部署。</div>",
      "quiz": {
        "q": "Kling-Omni 中 MVL (Multi-modal Visual Language) 输入协议的核心作用是什么？",
        "options": [
          "提升模型的参数效率，减少模型大小",
          "将不同任务的多模态输入统一编码为一致格式，消除任务间的输入差异",
          "替代 VAE 编码器，直接处理原始像素输入",
          "实现音频和视频的同步生成"
        ],
        "answer": 1,
        "explain": "MVL 协议将文本、图像、视频等多模态输入编码为统一序列格式，使得生成、编辑、参考引导等不同任务可以被同一个模型以一致的方式处理，这是 Kling-Omni 实现任务统一的关键设计。"
      }
    },
    {
      "id": "gwm1",
      "num": 30,
      "name": "GWM-1",
      "fullName": "通用世界模型1 (General World Model 1)",
      "year": "2026.02",
      "org": "Runway",
      "parent": "gen4",
      "paperUrl": "https://runwayml.com/research/introducing-general-world-models",
      "projectUrl": "",
      "category": "world_model",
      "motivation": "学习世界动力学，理解因果关系和物理规律",
      "summary": "GWM-1 的核心目标是：学习世界动力学，理解因果关系和物理规律。",
      "keyPoints": [
        "核心动机：学习世界动力学，理解因果关系和物理规律",
        "演化来源：继承或改进自 gen4",
        "代表机构：Runway"
      ],
      "detail": "<p>学习世界动力学，理解因果关系和物理规律</p>"
    },
    {
      "id": "vjepa2",
      "num": 31,
      "name": "V-JEPA 2",
      "fullName": "视频联合嵌入预测架构2 (Video Joint Embedding Predictive Architecture 2)",
      "year": "2026.03",
      "org": "Meta",
      "parent": "—",
      "paperUrl": "https://ai.meta.com/research/publications/",
      "projectUrl": "",
      "category": "world_model",
      "motivation": "自监督学习世界模型，机器人训练与仿真",
      "summary": "V-JEPA 2 的核心目标是：自监督学习世界模型，机器人训练与仿真。",
      "keyPoints": [
        "核心动机：自监督学习世界模型，机器人训练与仿真",
        "代表机构：Meta"
      ],
      "detail": "<p>自监督学习世界模型，机器人训练与仿真</p>"
    }
  ],
  "categories": {
    "gan_based": {
      "label": "GAN生成模型",
      "color": "#E74C3C"
    },
    "vae_based": {
      "label": "VAE变分编码",
      "color": "#9B59B6"
    },
    "autoregressive": {
      "label": "自回归模型",
      "color": "#3498DB"
    },
    "diffusion_based": {
      "label": "扩散模型",
      "color": "#2ECC71"
    },
    "world_model": {
      "label": "世界模型",
      "color": "#F39C12"
    }
  },
  "projectUrls": {}
};
