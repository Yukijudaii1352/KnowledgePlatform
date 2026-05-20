/**
 * text2image-data.js — 由 pipeline/build.py 于 2026-05-20 16:56:25 自动生成。
 * 源文件：content/aigc/text2image.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "aigc",
    "topic_id": "text2image",
    "topic_name": "text2image",
    "page_title": "文生图技术演进",
    "page_subtitle": "2026-05-20 版",
    "page_desc": "从GAN到扩散模型，从Stable Diffusion到FLUX.1的文生图技术全景演进",
    "page_icon": "🎨",
    "hero_pills": [
      "🏷️ Diffusion Models · GAN · Transformer · Flow Matching · AIGC"
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
        "id": "stackgan",
        "x": 100,
        "y": 100,
        "category": "gan_era"
      },
      {
        "id": "attngan",
        "x": 200,
        "y": 100,
        "category": "gan_era"
      },
      {
        "id": "stylegan",
        "x": 300,
        "y": 100,
        "category": "gan_era"
      },
      {
        "id": "vqvae",
        "x": 100,
        "y": 200,
        "category": "vae_discrete"
      },
      {
        "id": "vqgan",
        "x": 400,
        "y": 200,
        "category": "vae_discrete"
      },
      {
        "id": "llamagen",
        "x": 800,
        "y": 200,
        "category": "vae_discrete"
      },
      {
        "id": "ddpm",
        "x": 400,
        "y": 300,
        "category": "diffusion_foundation"
      },
      {
        "id": "ddim",
        "x": 450,
        "y": 280,
        "category": "diffusion_foundation"
      },
      {
        "id": "score_sde",
        "x": 450,
        "y": 320,
        "category": "diffusion_foundation"
      },
      {
        "id": "clip",
        "x": 500,
        "y": 300,
        "category": "diffusion_foundation"
      },
      {
        "id": "ldm",
        "x": 600,
        "y": 400,
        "category": "sd_evolution"
      },
      {
        "id": "sd_v2",
        "x": 650,
        "y": 400,
        "category": "sd_evolution"
      },
      {
        "id": "controlnet",
        "x": 700,
        "y": 380,
        "category": "sd_evolution"
      },
      {
        "id": "ip_adapter",
        "x": 700,
        "y": 420,
        "category": "sd_evolution"
      },
      {
        "id": "sdxl",
        "x": 750,
        "y": 400,
        "category": "sd_evolution"
      },
      {
        "id": "sd3",
        "x": 850,
        "y": 400,
        "category": "sd_evolution"
      },
      {
        "id": "flux_1",
        "x": 900,
        "y": 400,
        "category": "sd_evolution"
      },
      {
        "id": "lumina_mgpt",
        "x": 950,
        "y": 200,
        "category": "frontier_2026"
      },
      {
        "id": "npp",
        "x": 950,
        "y": 220,
        "category": "frontier_2026"
      },
      {
        "id": "infinitystar",
        "x": 1000,
        "y": 200,
        "category": "frontier_2026"
      },
      {
        "id": "argen_dexion",
        "x": 1000,
        "y": 220,
        "category": "frontier_2026"
      },
      {
        "id": "nextstep_1",
        "x": 1000,
        "y": 240,
        "category": "frontier_2026"
      },
      {
        "id": "tlcm",
        "x": 850,
        "y": 500,
        "category": "frontier_2026"
      },
      {
        "id": "dit_air",
        "x": 920,
        "y": 480,
        "category": "frontier_2026"
      },
      {
        "id": "pixart_alpha",
        "x": 900,
        "y": 500,
        "category": "frontier_2026"
      },
      {
        "id": "sana",
        "x": 950,
        "y": 500,
        "category": "frontier_2026"
      },
      {
        "id": "mm_r1",
        "x": 980,
        "y": 440,
        "category": "frontier_2026"
      },
      {
        "id": "vinci",
        "x": 1020,
        "y": 440,
        "category": "frontier_2026"
      },
      {
        "id": "lmfusion",
        "x": 1000,
        "y": 460,
        "category": "frontier_2026"
      },
      {
        "id": "unigen",
        "x": 1040,
        "y": 460,
        "category": "frontier_2026"
      }
    ],
    "edges": [
      {
        "from": "stackgan",
        "to": "attngan",
        "label": "注意力增强"
      },
      {
        "from": "attngan",
        "to": "stylegan",
        "label": "风格控制"
      },
      {
        "from": "vqvae",
        "to": "vqgan",
        "label": "感知增强"
      },
      {
        "from": "vqgan",
        "to": "llamagen",
        "label": "自回归统一"
      },
      {
        "from": "ddpm",
        "to": "ddim",
        "label": "加速采样"
      },
      {
        "from": "ddpm",
        "to": "score_sde",
        "label": "理论统一"
      },
      {
        "from": "ddpm",
        "to": "ldm",
        "label": "潜空间迁移"
      },
      {
        "from": "ldm",
        "to": "sd_v2",
        "label": "编码器升级"
      },
      {
        "from": "sd_v2",
        "to": "sdxl",
        "label": "级联增强"
      },
      {
        "from": "sdxl",
        "to": "sd3",
        "label": "MMDiT引入"
      },
      {
        "from": "sd3",
        "to": "flux_1",
        "label": "流匹配巅峰"
      },
      {
        "from": "ldm",
        "to": "controlnet",
        "label": "空间控制"
      },
      {
        "from": "ldm",
        "to": "ip_adapter",
        "label": "图像提示"
      },
      {
        "from": "llamagen",
        "to": "lumina_mgpt",
        "label": "多模态扩展"
      },
      {
        "from": "llamagen",
        "to": "npp",
        "label": "预测策略"
      },
      {
        "from": "lumina_mgpt",
        "to": "infinitystar",
        "label": "时空统一"
      },
      {
        "from": "llamagen",
        "to": "argen_dexion",
        "label": "解码器增强"
      },
      {
        "from": "llamagen",
        "to": "nextstep_1",
        "label": "连续Token"
      },
      {
        "from": "ldm",
        "to": "tlcm",
        "label": "一致性加速"
      },
      {
        "from": "sd3",
        "to": "dit_air",
        "label": "架构优化"
      },
      {
        "from": "sd3",
        "to": "pixart_alpha",
        "label": "训练高效"
      },
      {
        "from": "pixart_alpha",
        "to": "sana",
        "label": "线性注意力"
      },
      {
        "from": "flux_1",
        "to": "mm_r1",
        "label": "偏好对齐"
      },
      {
        "from": "mm_r1",
        "to": "vinci",
        "label": "推理增强"
      },
      {
        "from": "flux_1",
        "to": "lmfusion",
        "label": "理解生成统一"
      },
      {
        "from": "lmfusion",
        "to": "unigen",
        "label": "多任务统一"
      }
    ],
    "milestones": [
      {
        "id": "clip",
        "label": "跨模态语义对齐基石"
      },
      {
        "id": "ldm",
        "label": "潜空间扩散开创开源生态"
      },
      {
        "id": "flux_1",
        "label": "流匹配与大规模Transformer成熟"
      }
    ]
  },
  "algos": [
    {
      "id": "stackgan",
      "num": 1,
      "name": "StackGAN",
      "fullName": "条件增强文生图 (StackGAN)",
      "year": "2017",
      "org": "百度/Rutgers",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1612.03242",
      "projectUrl": "",
      "category": "gan_era",
      "motivation": "两阶段生成与条件增强",
      "summary": "StackGAN 的核心目标是：两阶段生成与条件增强。",
      "keyPoints": [
        "核心动机：两阶段生成与条件增强",
        "代表机构：百度/Rutgers"
      ],
      "detail": "<p>两阶段生成与条件增强</p>"
    },
    {
      "id": "attngan",
      "num": 2,
      "name": "AttnGAN",
      "fullName": "注意力文生图 (AttnGAN)",
      "year": "2018",
      "org": "微软",
      "parent": "stackgan",
      "paperUrl": "https://arxiv.org/abs/1711.10485",
      "projectUrl": "",
      "category": "gan_era",
      "motivation": "单词级注意力与DAMSM",
      "summary": "AttnGAN 的核心目标是：单词级注意力与DAMSM。",
      "keyPoints": [
        "核心动机：单词级注意力与DAMSM",
        "演化来源：继承或改进自 stackgan",
        "代表机构：微软"
      ],
      "detail": "<p>单词级注意力与DAMSM</p>"
    },
    {
      "id": "stylegan",
      "num": 3,
      "name": "StyleGAN",
      "fullName": "风格生成网络 (StyleGAN)",
      "year": "2019",
      "org": "NVIDIA",
      "parent": "attngan",
      "paperUrl": "https://arxiv.org/abs/1812.04948",
      "projectUrl": "",
      "category": "gan_era",
      "motivation": "映射网络与AdaIN风格注入",
      "summary": "StyleGAN 的核心目标是：映射网络与AdaIN风格注入。",
      "keyPoints": [
        "核心动机：映射网络与AdaIN风格注入",
        "演化来源：继承或改进自 attngan",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>映射网络与AdaIN风格注入</p>"
    },
    {
      "id": "vqvae",
      "num": 4,
      "name": "VQ-VAE",
      "fullName": "矢量量化变分自编码器 (VQ-VAE)",
      "year": "2017",
      "org": "DeepMind",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1711.00937",
      "projectUrl": "",
      "category": "vae_discrete",
      "motivation": "可学习码本将图像离散化",
      "summary": "VQ-VAE 的核心目标是：可学习码本将图像离散化。",
      "keyPoints": [
        "核心动机：可学习码本将图像离散化",
        "代表机构：DeepMind"
      ],
      "detail": "<p>可学习码本将图像离散化</p>"
    },
    {
      "id": "vqgan",
      "num": 5,
      "name": "VQ-GAN",
      "fullName": "矢量量化生成网络 (VQ-GAN)",
      "year": "2020",
      "org": "海德堡大学",
      "parent": "vqvae",
      "paperUrl": "https://arxiv.org/abs/2012.09841",
      "projectUrl": "",
      "category": "vae_discrete",
      "motivation": "CNN归纳偏置与Transformer建模",
      "summary": "VQ-GAN 的核心目标是：CNN归纳偏置与Transformer建模。",
      "keyPoints": [
        "核心动机：CNN归纳偏置与Transformer建模",
        "演化来源：继承或改进自 vqvae",
        "代表机构：海德堡大学"
      ],
      "detail": "<p>CNN归纳偏置与Transformer建模</p>"
    },
    {
      "id": "ddpm",
      "num": 6,
      "name": "DDPM",
      "fullName": "去噪扩散概率模型 (DDPM)",
      "year": "2020",
      "org": "UC Berkeley",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2006.11239",
      "projectUrl": "",
      "category": "diffusion_foundation",
      "motivation": "确立去噪扩散范式",
      "summary": "DDPM 的核心目标是：确立去噪扩散范式。",
      "keyPoints": [
        "核心动机：确立去噪扩散范式",
        "代表机构：UC Berkeley"
      ],
      "detail": "<p>确立去噪扩散范式</p>"
    },
    {
      "id": "ddim",
      "num": 7,
      "name": "DDIM",
      "fullName": "去噪扩散隐式模型 (DDIM)",
      "year": "2020",
      "org": "Stanford",
      "parent": "ddpm",
      "paperUrl": "https://arxiv.org/abs/2010.02502",
      "projectUrl": "",
      "category": "diffusion_foundation",
      "motivation": "非马尔可夫加速采样",
      "summary": "DDIM 的核心目标是：非马尔可夫加速采样。",
      "keyPoints": [
        "核心动机：非马尔可夫加速采样",
        "演化来源：继承或改进自 ddpm",
        "代表机构：Stanford"
      ],
      "detail": "<p>非马尔可夫加速采样</p>"
    },
    {
      "id": "score_sde",
      "num": 8,
      "name": "Score SDE",
      "fullName": "基于分数的SDE (Score SDE)",
      "year": "2020",
      "org": "Stanford",
      "parent": "ddpm",
      "paperUrl": "https://arxiv.org/abs/2011.13456",
      "projectUrl": "",
      "category": "diffusion_foundation",
      "motivation": "统一SDE理论框架",
      "summary": "Score SDE 的核心目标是：统一SDE理论框架。",
      "keyPoints": [
        "核心动机：统一SDE理论框架",
        "演化来源：继承或改进自 ddpm",
        "代表机构：Stanford"
      ],
      "detail": "<p>统一SDE理论框架</p>"
    },
    {
      "id": "clip",
      "num": 9,
      "name": "CLIP",
      "fullName": "对比语言图像预训练 (CLIP)",
      "year": "2021",
      "org": "OpenAI",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2103.00020",
      "projectUrl": "",
      "category": "diffusion_foundation",
      "motivation": "大规模跨模态语义对齐",
      "summary": "CLIP 的核心目标是：大规模跨模态语义对齐。",
      "keyPoints": [
        "核心动机：大规模跨模态语义对齐",
        "代表机构：OpenAI"
      ],
      "detail": "<p>大规模跨模态语义对齐</p>"
    },
    {
      "id": "ldm",
      "num": 10,
      "name": "LDM/SD v1.5",
      "fullName": "潜在扩散模型 (Latent Diffusion)",
      "year": "2022",
      "org": "CompVis/Stability AI",
      "parent": "ddpm",
      "paperUrl": "https://arxiv.org/abs/2112.10752",
      "projectUrl": "",
      "category": "sd_evolution",
      "motivation": "潜空间扩散降低计算成本",
      "summary": "LDM/SD v1.5 的核心目标是：潜空间扩散降低计算成本。",
      "keyPoints": [
        "核心动机：潜空间扩散降低计算成本",
        "演化来源：继承或改进自 ddpm",
        "代表机构：CompVis/Stability AI"
      ],
      "detail": "<p>潜空间扩散降低计算成本</p>"
    },
    {
      "id": "sd_v2",
      "num": 11,
      "name": "SD v2.0",
      "fullName": "Stable Diffusion v2.0",
      "year": "2022.11",
      "org": "Stability AI",
      "parent": "ldm",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "sd_evolution",
      "motivation": "OpenCLIP编码器升级",
      "summary": "SD v2.0 的核心目标是：OpenCLIP编码器升级。",
      "keyPoints": [
        "核心动机：OpenCLIP编码器升级",
        "演化来源：继承或改进自 ldm",
        "代表机构：Stability AI"
      ],
      "detail": "<p>OpenCLIP编码器升级</p>"
    },
    {
      "id": "sdxl",
      "num": 12,
      "name": "SDXL",
      "fullName": "Stable Diffusion XL",
      "year": "2023",
      "org": "Stability AI",
      "parent": "sd_v2",
      "paperUrl": "https://arxiv.org/abs/2307.01952",
      "projectUrl": "",
      "category": "sd_evolution",
      "motivation": "Base+Refiner级联架构",
      "summary": "SDXL 的核心目标是：Base+Refiner级联架构。",
      "keyPoints": [
        "核心动机：Base+Refiner级联架构",
        "演化来源：继承或改进自 sd_v2",
        "代表机构：Stability AI"
      ],
      "detail": "<p>Base+Refiner级联架构</p>"
    },
    {
      "id": "sd3",
      "num": 13,
      "name": "SD3",
      "fullName": "Stable Diffusion 3",
      "year": "2024.02",
      "org": "Stability AI",
      "parent": "sdxl",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "sd_evolution",
      "motivation": "MMDiT架构与整流流",
      "summary": "SD3 的核心目标是：MMDiT架构与整流流。",
      "keyPoints": [
        "核心动机：MMDiT架构与整流流",
        "演化来源：继承或改进自 sdxl",
        "代表机构：Stability AI"
      ],
      "detail": "<p>MMDiT架构与整流流</p>"
    },
    {
      "id": "flux_1",
      "num": 14,
      "name": "FLUX.1",
      "fullName": "FLUX.1流匹配模型 (FLUX.1)",
      "year": "2024.08",
      "org": "Black Forest Labs",
      "parent": "sd3",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "sd_evolution",
      "motivation": "12B流匹配Transformer",
      "summary": "FLUX.1 的核心目标是：12B流匹配Transformer。",
      "keyPoints": [
        "核心动机：12B流匹配Transformer",
        "演化来源：继承或改进自 sd3",
        "代表机构：Black Forest Labs"
      ],
      "detail": "<p>12B流匹配Transformer</p>"
    },
    {
      "id": "controlnet",
      "num": 15,
      "name": "ControlNet",
      "fullName": "可控条件网络 (ControlNet)",
      "year": "2023",
      "org": "Stanford",
      "parent": "ldm",
      "paperUrl": "https://arxiv.org/abs/2302.05543",
      "projectUrl": "",
      "category": "sd_evolution",
      "motivation": "零卷积引入空间控制",
      "summary": "ControlNet 通过将预训练扩散模型（Stable Diffusion）的编码器权重克隆为可训练副本，并以**零卷积（Zero Convolution）**连接原始网络与副本，实现了在保留大模型生成能力的同时，精确注入边缘图、深度图、人体姿态等多种空间条件控制信号。",
      "keyPoints": [
        "<strong>零卷积机制</strong>：使用权重和偏置均初始化为零的 1×1 卷积层连接原始网络与训练副本，训练初始阶段输出恒为零，确保不向预训练模型注入有害噪声",
        "<strong>锁定副本架构</strong>：将预训练模型的编码器（locked copy）完整克隆为可训练副本（trainable copy），通过零卷积将副本输出加回原始网络的跳跃连接",
        "<strong>条件编码器</strong>：4 层卷积网络（4×4 kernel, 2×2 stride, 通道数 16→32→64→128, ReLU 激活），将 512×512 条件图像压缩为 64×64 特征图",
        "<strong>突然收敛现象</strong>：由于零卷积的保护，模型在约 6K 步时突然学会遵循条件，而非渐进式学习",
        "<strong>50% Prompt Dropout</strong>：训练时以 50% 概率将文本提示替换为空字符串，增强模型直接从条件图像识别语义的能力",
        "<strong>CFG Resolution Weighting</strong>：推理时对不同分辨率的 ControlNet 连接施加权重 \\(w_i = 64 / h_i\\)，消除 Classifier-Free Guidance 引起的伪影",
        "<strong>多 ControlNet 组合</strong>：多个 ControlNet 的输出可直接相加到 Stable Diffusion 模型中，实现多条件联合控制",
        "<strong>支持 8 种以上条件类型</strong>：Canny 边缘、HED 边界、M-LSD 直线、深度图、法线图、语义分割、人体姿态、用户涂鸦等"
      ],
      "detail": "<p><img alt=\"ControlNet 基本结构\" src=\"https://ar5iv.labs.arxiv.org/html/2302.05543/assets/x2.png\" />\n<em>图 2：(a) 原始神经网络块；(b) 加入 ControlNet 后的结构。可训练副本通过两组零卷积与原始锁定块相连。</em></p>\n<p><img alt=\"ControlNet 与 Stable Diffusion U-Net 的连接方式\" src=\"https://ar5iv.labs.arxiv.org/html/2302.05543/assets/x3.png\" />\n<em>图 3：ControlNet 连接到 Stable Diffusion U-Net 编码器的完整架构。SD 编码器的 12 个块和 1 个中间块被完整克隆，条件图像经 4 层卷积编码后输入可训练副本。</em></p>\n<pre><code class=\"language-python\"># ControlNet 训练与推理伪代码\n# === 训练阶段 ===\n# 初始化：克隆 SD 编码器权重 → trainable_copy\n#         创建零卷积层（weight=0, bias=0）→ zero_conv_in, zero_conv_out\n# 条件编码器 E: 4层Conv(4×4, stride=2) + ReLU, channels: 16→32→64→128\n\nfor batch in dataloader:\n    image, prompt, condition = batch          # condition: Canny/depth/pose 等\n    # 50% prompt dropout\n    if random() &lt; 0.5:\n        prompt = &quot;&quot;\n\n    z = VAE_encode(image)                     # 编码到潜空间 64×64\n    t = sample_timestep()\n    noise = sample_noise()\n    z_t = add_noise(z, noise, t)\n\n    c_f = E(condition)                        # 条件编码: 512×512 → 64×64\n\n    # Locked SD encoder (frozen)\n    h_locked = SD_encoder(z_t, t, prompt)     # 原始特征\n\n    # ControlNet (trainable copy)\n    h_ctrl = trainable_copy(z_t + zero_conv_in(c_f), t, prompt)\n    h_ctrl_out = zero_conv_out(h_ctrl)        # 各层输出经零卷积\n\n    # 将 ControlNet 输出加到 SD decoder 的跳跃连接\n    noise_pred = SD_decoder(h_locked + h_ctrl_out, t, prompt)\n\n    loss = MSE(noise_pred, noise)\n    loss.backward()                           # 仅更新 trainable_copy + zero_conv\n\n# === 推理阶段 (CFG Resolution Weighting) ===\n# 对每个连接层 i，施加权重 w_i = 64 / h_i (h_i 为该层特征图高度)\n# 条件引导: noise_pred = noise_uncond + β_cfg * (noise_cond - noise_uncond)\n</code></pre>\n<p><strong>动机与背景：为什么需要 ControlNet？</strong></p>\n<p>大规模文本到图像扩散模型（如 Stable Diffusion）虽然能生成高质量图像，但仅依靠文本提示难以精确控制生成图像的空间结构。例如，用户可能希望生成的图像严格遵循特定的边缘轮廓、人体姿态或深度布局。传统的微调方法（如直接 fine-tune 整个模型）在数据量有限时容易导致过拟合和灾难性遗忘，破坏预训练模型学到的丰富语义知识。ControlNet 的核心目标是：<strong>在不破坏预训练大模型能力的前提下，高效地学习新的空间条件控制</strong>。</p>\n<p><strong>核心机制：零卷积为何如此关键？</strong></p>\n<p>ControlNet 的核心创新在于<strong>零卷积（Zero Convolution）</strong>的设计。对于一个预训练的神经网络块 \\(\\mathcal{F}(\\cdot; \\Theta)\\)，ControlNet 创建其可训练副本 \\(\\mathcal{F}(\\cdot; \\Theta_c)\\)，并通过两组零卷积层 \\(\\mathcal{Z}(\\cdot; \\Theta_{z1})\\) 和 \\(\\mathcal{Z}(\\cdot; \\Theta_{z2})\\) 连接。零卷积是 1×1 卷积层，其权重和偏置在训练开始时均初始化为零。完整的前向传播公式为：</p>\n<p>$$y_c = \\mathcal{F}(x; \\Theta) + \\mathcal{Z}\\big(\\mathcal{F}(x + \\mathcal{Z}(c; \\Theta_{z1}); \\Theta_c); \\Theta_{z2}\\big)$$</p>\n<p>在训练的第一步，由于 \\(\\mathcal{Z}\\) 的输出恒为零，因此 \\(y_c = \\mathcal{F}(x; \\Theta)\\)，即 ControlNet 的加入对原始模型的输出<strong>完全没有影响</strong>。这一特性至关重要——它意味着无论训练数据的质量如何，模型都不会在初始阶段被随机噪声破坏。论文的消融实验证实，如果将零卷积替换为标准高斯随机初始化的卷积层，预训练模型的能力会被立即摧毁，即使经过长时间训练也无法完全恢复。</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：零卷积就像一个\"安全阀\"——训练开始时完全关闭（输出为零），随着梯度更新逐渐打开，让条件信号以可控的速度流入预训练网络。</div>\n<p><strong>训练与推理流程</strong></p>\n<p>在 Stable Diffusion 的具体应用中，ControlNet 克隆了 U-Net 编码器的全部 12 个 Transformer 块和 1 个中间块（共 13 个块），参数量约为原始 SD 模型的一半。条件图像（如 Canny 边缘图）首先通过一个轻量级的 4 层卷积编码器 \\(\\mathcal{E}(\\cdot)\\) 从 512×512 压缩到 64×64 的特征图，与潜空间表示的分辨率对齐。训练损失为标准的噪声预测 MSE：</p>\n<p>$$\\mathcal{L} = \\mathbb{E}_{z_0, t, c_t, c_f, \\epsilon \\sim \\mathcal{N}(0,1)} \\left[ \\| \\epsilon - \\epsilon_\\theta(z_t, t, c_t, c_f) \\|_2^2 \\right]$$</p>\n<p>其中 \\(c_t\\) 为文本提示，\\(c_f\\) 为条件特征图。训练时采用 50% 的 prompt dropout 策略（将 \\(c_t\\) 替换为空字符串），迫使模型学会直接从条件图像中识别语义内容（如从 Canny 边缘推断物体类别），而非完全依赖文本描述。</p>\n<p>推理阶段，ControlNet 与 Classifier-Free Guidance (CFG) 结合使用。然而，直接应用 CFG 会导致低分辨率特征层的引导信号过强，产生伪影。论文提出了 <strong>CFG Resolution Weighting</strong> 策略：对第 \\(i\\) 个连接层施加权重 \\(w_i = 64 / h_i\\)（\\(h_i\\) 为该层特征图的高度），使得高分辨率层（64×64）权重为 1，低分辨率层（8×8）权重为 8，有效平衡了不同尺度的控制强度。</p>\n<p><strong>与传统方法的区别和优势</strong></p>\n<p>与 HyperNetwork、Adapter 等轻量级微调方法相比，ControlNet 保留了预训练编码器的完整结构，因此能够学习更复杂的空间条件映射。消融实验表明，仅使用单层卷积连接的 ControlNet-lite 变体在处理复杂条件（如语义分割图）时效果显著下降。与全量微调相比，ControlNet 仅增加约 23% 的 GPU 显存和 34% 的训练时间，且由于锁定了原始模型权重，完全避免了灾难性遗忘的风险。此外，多个独立训练的 ControlNet 可以通过简单地将输出相加来实现多条件组合控制，无需联合训练。</p>\n<p><img alt=\"多种条件控制效果\" src=\"https://ar5iv.labs.arxiv.org/html/2302.05543/assets/imgs/qua.jpg\" />\n<em>图 7：ControlNet 在无文本提示情况下，仅通过不同类型的条件图像（Canny、HED、深度、法线、分割、姿态等）控制 Stable Diffusion 的生成结果。</em></p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：ControlNet 的\"突然收敛\"现象（约 6K 步时模型突然学会遵循条件）是零卷积保护机制的直接结果——模型在前期保持稳定输出，直到零卷积层的参数积累到足够大的值，条件信号才突然\"涌入\"网络。</div>",
      "quiz": {
        "q": "ControlNet 中零卷积（Zero Convolution）的核心作用是什么？",
        "options": [
          "减少模型参数量，提升训练效率",
          "在训练初始阶段确保 ControlNet 不向预训练模型注入有害噪声",
          "替代标准卷积以提升图像生成质量",
          "将条件图像从高分辨率压缩到低分辨率"
        ],
        "answer": 1,
        "explain": "零卷积的权重和偏置初始化为零，使得训练开始时 ControlNet 分支的输出恒为零，从而保护预训练模型不受随机初始化噪声的破坏。"
      }
    },
    {
      "id": "ip_adapter",
      "num": 16,
      "name": "IP-Adapter",
      "fullName": "图像提示适配器 (IP-Adapter)",
      "year": "2023",
      "org": "腾讯",
      "parent": "ldm",
      "paperUrl": "https://arxiv.org/abs/2308.06721",
      "projectUrl": "",
      "category": "sd_evolution",
      "motivation": "解耦图像提示控制",
      "summary": "IP-Adapter 的核心目标是：解耦图像提示控制。",
      "keyPoints": [
        "核心动机：解耦图像提示控制",
        "演化来源：继承或改进自 ldm",
        "代表机构：腾讯"
      ],
      "detail": "<p>解耦图像提示控制</p>"
    },
    {
      "id": "llamagen",
      "num": 17,
      "name": "LlamaGen",
      "fullName": "自回归图像生成 (LlamaGen)",
      "year": "2024",
      "org": "北大/港大",
      "parent": "vqgan",
      "paperUrl": "https://arxiv.org/abs/2406.06525",
      "projectUrl": "",
      "category": "vae_discrete",
      "motivation": "纯Llama架构图像生成",
      "summary": "LlamaGen 的核心目标是：纯Llama架构图像生成。",
      "keyPoints": [
        "核心动机：纯Llama架构图像生成",
        "演化来源：继承或改进自 vqgan",
        "代表机构：北大/港大"
      ],
      "detail": "<p>纯Llama架构图像生成</p>"
    },
    {
      "id": "lumina_mgpt",
      "num": 18,
      "name": "Lumina-mGPT",
      "fullName": "多模态自回归生成 (Lumina-mGPT)",
      "year": "2026.03",
      "org": "上海AI Lab",
      "parent": "llamagen",
      "paperUrl": "IJCV 2026",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "灵活多模态自回归",
      "summary": "Lumina-mGPT 的核心目标是：灵活多模态自回归。",
      "keyPoints": [
        "核心动机：灵活多模态自回归",
        "演化来源：继承或改进自 llamagen",
        "代表机构：上海AI Lab"
      ],
      "detail": "<p>灵活多模态自回归</p>"
    },
    {
      "id": "npp",
      "num": 19,
      "name": "Next Patch Prediction",
      "fullName": "下一块预测 (NPP)",
      "year": "2026.02",
      "org": "北大",
      "parent": "llamagen",
      "paperUrl": "AAAI 2026",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "扩展自回归预测策略",
      "summary": "Next Patch Prediction 的核心目标是：扩展自回归预测策略。",
      "keyPoints": [
        "核心动机：扩展自回归预测策略",
        "演化来源：继承或改进自 llamagen",
        "代表机构：北大"
      ],
      "detail": "<p>扩展自回归预测策略</p>"
    },
    {
      "id": "infinitystar",
      "num": 20,
      "name": "InfinityStar",
      "fullName": "统一时空自回归 (InfinityStar)",
      "year": "2026.01",
      "org": "上海AI Lab",
      "parent": "lumina_mgpt",
      "paperUrl": "NeurIPS 2025",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "统一时空自回归建模",
      "summary": "InfinityStar 的核心目标是：统一时空自回归建模。",
      "keyPoints": [
        "核心动机：统一时空自回归建模",
        "演化来源：继承或改进自 lumina_mgpt",
        "代表机构：上海AI Lab"
      ],
      "detail": "<p>统一时空自回归建模</p>"
    },
    {
      "id": "argen_dexion",
      "num": 21,
      "name": "ARGen-Dexion",
      "fullName": "增强视觉解码器 (ARGen-Dexion)",
      "year": "2026",
      "org": "字节跳动",
      "parent": "llamagen",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "视觉解码器架构增强",
      "summary": "ARGen-Dexion 的核心目标是：视觉解码器架构增强。",
      "keyPoints": [
        "核心动机：视觉解码器架构增强",
        "演化来源：继承或改进自 llamagen",
        "代表机构：字节跳动"
      ],
      "detail": "<p>视觉解码器架构增强</p>"
    },
    {
      "id": "nextstep_1",
      "num": 22,
      "name": "NextStep-1",
      "fullName": "连续Token自回归 (NextStep-1)",
      "year": "2026",
      "org": "阿里巴巴",
      "parent": "llamagen",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "大规模连续Token生成",
      "summary": "NextStep-1 的核心目标是：大规模连续Token生成。",
      "keyPoints": [
        "核心动机：大规模连续Token生成",
        "演化来源：继承或改进自 llamagen",
        "代表机构：阿里巴巴"
      ],
      "detail": "<p>大规模连续Token生成</p>"
    },
    {
      "id": "tlcm",
      "num": 23,
      "name": "TLCM",
      "fullName": "训练高效一致性模型 (TLCM)",
      "year": "2024.06",
      "org": "清华",
      "parent": "ldm",
      "paperUrl": "https://arxiv.org/abs/2406.05768",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "训练高效潜一致性",
      "summary": "TLCM 的核心目标是：训练高效潜一致性。",
      "keyPoints": [
        "核心动机：训练高效潜一致性",
        "演化来源：继承或改进自 ldm",
        "代表机构：清华"
      ],
      "detail": "<p>训练高效潜一致性</p>"
    },
    {
      "id": "dit_air",
      "num": 24,
      "name": "DiT-AIR",
      "fullName": "高效扩散Transformer (DiT-AIR)",
      "year": "2025.03",
      "org": "腾讯",
      "parent": "sd3",
      "paperUrl": "https://arxiv.org/abs/2503.10618",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "重审DiT架构效率",
      "summary": "DiT-AIR 的核心目标是：重审DiT架构效率。",
      "keyPoints": [
        "核心动机：重审DiT架构效率",
        "演化来源：继承或改进自 sd3",
        "代表机构：腾讯"
      ],
      "detail": "<p>重审DiT架构效率</p>"
    },
    {
      "id": "pixart_alpha",
      "num": 25,
      "name": "PixArt-α",
      "fullName": "高效文生图 (PixArt-α)",
      "year": "2024",
      "org": "华为",
      "parent": "sd3",
      "paperUrl": "https://arxiv.org/abs/2310.00426",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "高效DiT训练策略",
      "summary": "PixArt-α 的核心目标是：高效DiT训练策略。",
      "keyPoints": [
        "核心动机：高效DiT训练策略",
        "演化来源：继承或改进自 sd3",
        "代表机构：华为"
      ],
      "detail": "<p>高效DiT训练策略</p>"
    },
    {
      "id": "sana",
      "num": 26,
      "name": "SANA",
      "fullName": "高分辨率线性注意力 (SANA)",
      "year": "2024",
      "org": "NVIDIA",
      "parent": "pixart_alpha",
      "paperUrl": "https://arxiv.org/abs/2410.10629",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "线性注意力高分辨率",
      "summary": "SANA 的核心目标是：线性注意力高分辨率。",
      "keyPoints": [
        "核心动机：线性注意力高分辨率",
        "演化来源：继承或改进自 pixart_alpha",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>线性注意力高分辨率</p>"
    },
    {
      "id": "mm_r1",
      "num": 27,
      "name": "MM-R1",
      "fullName": "统一多模态生成 (MM-R1)",
      "year": "2026.02",
      "org": "北大",
      "parent": "flux_1",
      "paperUrl": "AAAI 2026",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "GRPO偏好对齐减少畸变",
      "summary": "MM-R1 的核心目标是：GRPO偏好对齐减少畸变。",
      "keyPoints": [
        "核心动机：GRPO偏好对齐减少畸变",
        "演化来源：继承或改进自 flux_1",
        "代表机构：北大"
      ],
      "detail": "<p>GRPO偏好对齐减少畸变</p>"
    },
    {
      "id": "vinci",
      "num": 28,
      "name": "Vinci",
      "fullName": "深度思考文生图 (Vinci)",
      "year": "2026.01",
      "org": "浙大",
      "parent": "mm_r1",
      "paperUrl": "NeurIPS 2025",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "QA奖励增强逻辑推理",
      "summary": "Vinci 的核心目标是：QA奖励增强逻辑推理。",
      "keyPoints": [
        "核心动机：QA奖励增强逻辑推理",
        "演化来源：继承或改进自 mm_r1",
        "代表机构：浙大"
      ],
      "detail": "<p>QA奖励增强逻辑推理</p>"
    },
    {
      "id": "lmfusion",
      "num": 29,
      "name": "LMFusion",
      "fullName": "语言模型融合生成 (LMFusion)",
      "year": "2026",
      "org": "Meta",
      "parent": "flux_1",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "理解与生成统一骨干",
      "summary": "LMFusion 的核心目标是：理解与生成统一骨干。",
      "keyPoints": [
        "核心动机：理解与生成统一骨干",
        "演化来源：继承或改进自 flux_1",
        "代表机构：Meta"
      ],
      "detail": "<p>理解与生成统一骨干</p>"
    },
    {
      "id": "unigen",
      "num": 30,
      "name": "UniGen",
      "fullName": "统一生成框架 (UniGen)",
      "year": "2026",
      "org": "Google",
      "parent": "lmfusion",
      "paperUrl": "—",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "多任务统一生成",
      "summary": "UniGen 的核心目标是：多任务统一生成。",
      "keyPoints": [
        "核心动机：多任务统一生成",
        "演化来源：继承或改进自 lmfusion",
        "代表机构：Google"
      ],
      "detail": "<p>多任务统一生成</p>"
    }
  ],
  "categories": {
    "gan_era": {
      "label": "对抗生成时代",
      "color": "#8B5CF6"
    },
    "vae_discrete": {
      "label": "离散化与VAE",
      "color": "#F59E0B"
    },
    "diffusion_foundation": {
      "label": "扩散模型奠基",
      "color": "#10B981"
    },
    "sd_evolution": {
      "label": "SD系列演进",
      "color": "#3B82F6"
    },
    "frontier_2026": {
      "label": "2026前沿探索",
      "color": "#EF4444"
    }
  },
  "projectUrls": {}
};
