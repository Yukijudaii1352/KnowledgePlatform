/**
 * ai4geology-data.js — 由 pipeline/build.py 于 2026-05-26 10:35:13 自动生成。
 * 源文件：content/ai4sci/ai4geology.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "ai4sci",
    "topic_id": "ai4geology",
    "topic_name": "地球科学AI",
    "page_title": "地球科学AI技术演进图谱",
    "page_subtitle": "2026-05-26 版",
    "page_desc": "从数值天气预报到AI大模型，涵盖气象预报、气候建模、遥感分析与灾害预测的技术演进历程。",
    "page_icon": "🌍",
    "hero_pills": [
      "🏷️ Weather Forecasting · Climate Modeling · Remote Sensing · Disaster Prediction"
    ],
    "count_pill": "{count} 个算法",
    "image_base": "../../content/ai4sci/ai4geology/assets/",
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
        "id": "convlstm",
        "x": 2015,
        "y": 0,
        "category": "meteo_ai"
      },
      {
        "id": "dgmr",
        "x": 2021,
        "y": 0,
        "category": "meteo_ai"
      },
      {
        "id": "fourcastnet",
        "x": 2022,
        "y": 1,
        "category": "meteo_ai"
      },
      {
        "id": "pangu_weather",
        "x": 2023,
        "y": 2,
        "category": "meteo_ai"
      },
      {
        "id": "graphcast",
        "x": 2023,
        "y": 3,
        "category": "meteo_ai"
      },
      {
        "id": "nowcastnet",
        "x": 2023,
        "y": 0,
        "category": "meteo_ai"
      },
      {
        "id": "gencast",
        "x": 2024,
        "y": 3,
        "category": "meteo_ai"
      },
      {
        "id": "aifs_v2",
        "x": 2026,
        "y": 3,
        "category": "meteo_ai"
      },
      {
        "id": "fengwu_ghr",
        "x": 2026,
        "y": 2,
        "category": "meteo_ai"
      },
      {
        "id": "weatherbench",
        "x": 2020,
        "y": 4,
        "category": "climate_ai"
      },
      {
        "id": "climax",
        "x": 2023,
        "y": 4,
        "category": "climate_ai"
      },
      {
        "id": "neuralgcm",
        "x": 2024,
        "y": 4,
        "category": "climate_ai"
      },
      {
        "id": "ace",
        "x": 2026,
        "y": 4,
        "category": "climate_ai"
      },
      {
        "id": "goflow",
        "x": 2026,
        "y": 5,
        "category": "climate_ai"
      },
      {
        "id": "carbon_tracker",
        "x": 2026,
        "y": 5,
        "category": "climate_ai"
      },
      {
        "id": "unet",
        "x": 2015,
        "y": 6,
        "category": "rs_analysis"
      },
      {
        "id": "deeplabv3plus",
        "x": 2018,
        "y": 6,
        "category": "rs_analysis"
      },
      {
        "id": "resunet",
        "x": 2019,
        "y": 7,
        "category": "rs_analysis"
      },
      {
        "id": "satmae",
        "x": 2022,
        "y": 6,
        "category": "rs_analysis"
      },
      {
        "id": "prithvi",
        "x": 2023,
        "y": 6,
        "category": "rs_analysis"
      },
      {
        "id": "satmae_pp",
        "x": 2024,
        "y": 7,
        "category": "rs_analysis"
      },
      {
        "id": "prithvi_eo2",
        "x": 2024,
        "y": 6,
        "category": "rs_analysis"
      },
      {
        "id": "alphaearth",
        "x": 2025,
        "y": 6,
        "category": "rs_analysis"
      },
      {
        "id": "floodhub",
        "x": 2022,
        "y": 8,
        "category": "geo_hazard"
      },
      {
        "id": "recast",
        "x": 2023,
        "y": 9,
        "category": "geo_hazard"
      },
      {
        "id": "alertcalifornia",
        "x": 2024,
        "y": 10,
        "category": "geo_hazard"
      },
      {
        "id": "landslide_ai",
        "x": 2026,
        "y": 8,
        "category": "geo_hazard"
      },
      {
        "id": "groundsource",
        "x": 2026,
        "y": 8,
        "category": "geo_hazard"
      },
      {
        "id": "dryad_gen4",
        "x": 2026,
        "y": 10,
        "category": "geo_hazard"
      },
      {
        "id": "earthquake_ai",
        "x": 2026,
        "y": 9,
        "category": "geo_hazard"
      },
      {
        "id": "aurora",
        "x": 2024,
        "y": 11,
        "category": "earth_fm"
      },
      {
        "id": "earth2",
        "x": 2024,
        "y": 12,
        "category": "earth_fm"
      },
      {
        "id": "thor",
        "x": 2026,
        "y": 11,
        "category": "earth_fm"
      }
    ],
    "edges": [
      {
        "from": "convlstm",
        "to": "dgmr",
        "label": "生成式建模"
      },
      {
        "from": "convlstm",
        "to": "fourcastnet",
        "label": "全球尺度"
      },
      {
        "from": "fourcastnet",
        "to": "pangu_weather",
        "label": "3D Transformer"
      },
      {
        "from": "pangu_weather",
        "to": "graphcast",
        "label": "GNN网格"
      },
      {
        "from": "pangu_weather",
        "to": "fengwu_ghr",
        "label": "高分辨率"
      },
      {
        "from": "dgmr",
        "to": "nowcastnet",
        "label": "物理耦合"
      },
      {
        "from": "graphcast",
        "to": "gencast",
        "label": "扩散模型"
      },
      {
        "from": "gencast",
        "to": "aifs_v2",
        "label": "业务化"
      },
      {
        "from": "weatherbench",
        "to": "climax",
        "label": "基础模型"
      },
      {
        "from": "climax",
        "to": "neuralgcm",
        "label": "物理混合"
      },
      {
        "from": "neuralgcm",
        "to": "ace",
        "label": "长期模拟"
      },
      {
        "from": "neuralgcm",
        "to": "carbon_tracker",
        "label": "碳循环"
      },
      {
        "from": "unet",
        "to": "deeplabv3plus",
        "label": "多尺度"
      },
      {
        "from": "unet",
        "to": "resunet",
        "label": "残差连接"
      },
      {
        "from": "deeplabv3plus",
        "to": "satmae",
        "label": "自监督"
      },
      {
        "from": "satmae",
        "to": "prithvi",
        "label": "基础模型"
      },
      {
        "from": "satmae",
        "to": "satmae_pp",
        "label": "多尺度"
      },
      {
        "from": "prithvi",
        "to": "prithvi_eo2",
        "label": "扩展参数"
      },
      {
        "from": "prithvi_eo2",
        "to": "alphaearth",
        "label": "全球嵌入"
      },
      {
        "from": "floodhub",
        "to": "landslide_ai",
        "label": "多灾种"
      },
      {
        "from": "floodhub",
        "to": "groundsource",
        "label": "LLM增强"
      },
      {
        "from": "alertcalifornia",
        "to": "dryad_gen4",
        "label": "传感器"
      },
      {
        "from": "recast",
        "to": "earthquake_ai",
        "label": "实时检测"
      },
      {
        "from": "climax",
        "to": "aurora",
        "label": "大规模"
      },
      {
        "from": "aurora",
        "to": "earth2",
        "label": "生成式"
      },
      {
        "from": "aurora",
        "to": "thor",
        "label": "多模态"
      }
    ],
    "milestones": [
      "pangu_weather",
      "neuralgcm",
      "prithvi_eo2"
    ]
  },
  "algos": [
    {
      "id": "convlstm",
      "num": 1,
      "name": "ConvLSTM",
      "fullName": "卷积长短期记忆网络 (Convolutional LSTM)",
      "year": "2015",
      "org": "HKU",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1506.04214",
      "projectUrl": "",
      "category": "meteo_ai",
      "motivation": "首创时空序列卷积建模降水预报",
      "summary": "ConvLSTM 的核心目标是：首创时空序列卷积建模降水预报。",
      "keyPoints": [
        "核心动机：首创时空序列卷积建模降水预报",
        "代表机构：HKU"
      ],
      "detail": "<p>首创时空序列卷积建模降水预报</p>"
    },
    {
      "id": "dgmr",
      "num": 2,
      "name": "DGMR",
      "fullName": "深度生成雷达模型 (Deep Generative Model of Radar)",
      "year": "2021",
      "org": "DeepMind",
      "parent": "convlstm",
      "paperUrl": "https://www.nature.com/articles/s41586-021-03854-z",
      "projectUrl": "",
      "category": "meteo_ai",
      "motivation": "GAN生成式雷达回波外推",
      "summary": "DGMR 的核心目标是：GAN生成式雷达回波外推。",
      "keyPoints": [
        "核心动机：GAN生成式雷达回波外推",
        "演化来源：继承或改进自 convlstm",
        "代表机构：DeepMind"
      ],
      "detail": "<p>GAN生成式雷达回波外推</p>"
    },
    {
      "id": "fourcastnet",
      "num": 3,
      "name": "FourCastNet",
      "fullName": "傅里叶预报网络 (Fourier Forecasting Neural Network)",
      "year": "2022",
      "org": "NVIDIA",
      "parent": "convlstm",
      "paperUrl": "https://arxiv.org/abs/2202.11214",
      "projectUrl": "",
      "category": "meteo_ai",
      "motivation": "傅里叶神经算子处理全球尺度物理场",
      "summary": "FourCastNet 的核心目标是：傅里叶神经算子处理全球尺度物理场。",
      "keyPoints": [
        "核心动机：傅里叶神经算子处理全球尺度物理场",
        "演化来源：继承或改进自 convlstm",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>傅里叶神经算子处理全球尺度物理场</p>"
    },
    {
      "id": "pangu_weather",
      "num": 4,
      "name": "Pangu-Weather",
      "fullName": "盘古气象 (Pangu-Weather)",
      "year": "2023",
      "org": "Huawei Cloud",
      "parent": "fourcastnet",
      "paperUrl": "https://www.nature.com/articles/s41586-023-06185-3",
      "projectUrl": "",
      "category": "meteo_ai",
      "motivation": "3D地球Transformer首次超越ECMWF",
      "summary": "Pangu-Weather 提出了 3D Earth-Specific Transformer（3DEST）架构直接建模三维大气状态，并通过层次时间聚合策略（训练 1h/3h/6h/24h 四个独立模型）大幅减少迭代累积误差，**首次以 AI 方法在所有变量、所有预报时效上全面超越 ECMWF 业务数值预报系统 IFS**，同时将推理速度提升超过 10,000 倍。",
      "keyPoints": [
        "<strong>3D Earth-Specific Transformer（3DEST）</strong>：将气象数据视为三维立体场（气压层 × 纬度 × 经度），使用 3D Swin Transformer 进行建模，克服了此前方法仅处理 2D 切片的局限",
        "<strong>Earth-Specific Positional Bias（ESP）</strong>：替换 Swin Transformer 的相对位置偏置，为不同纬度和高度的窗口学习独立的绝对位置偏置矩阵，捕捉地球球面投影的非均匀空间分布",
        "<strong>层次时间聚合策略</strong>：训练 1h、3h、6h、24h 四个独立预报模型，7 天预报仅需最少 4 次模型调用（而非 FourCastNet 的 28 次），显著抑制累积误差",
        "<strong>ERA5 再分析数据</strong>：使用 1979–2017 年共 39 年的 0.25° 分辨率全球再分析数据，涵盖 13 个气压层 × 5 个上层变量 + 4 个地面变量",
        "<strong>全面超越 IFS</strong>：Z500 五天 RMSE 从 IFS 的 333.7 降至 296.7（降幅 11.1%），T850 五天 RMSE 从 2.06K 降至 1.79K（降幅 13.1%），单步推理仅需 1.4 秒"
      ],
      "detail": "<h5>问题背景与动机</h5>\n<p>中期天气预报（1–14 天）是气象学的核心任务。传统方法基于数值天气预报（NWP），通过求解大气运动的偏微分方程组来推演未来状态。以 ECMWF 的 IFS 系统为代表，NWP 方法虽然精度高，但计算代价极大——一次 10 天全球预报需要在超级计算机上运行数小时。</p>\n<p>此前的 AI 方法（如 FourCastNet、WeatherBench 等）虽然推理速度快，但在预报精度上始终无法匹敌业务 NWP 系统。作者分析了两个关键瓶颈：</p>\n<ol>\n<li><strong>维度不足</strong>：现有 AI 方法仅处理 2D（纬度 × 经度）数据，忽略了大气的垂直结构。许多天气过程（辐射、对流等）只有在 3D 空间中才能完整描述。</li>\n<li><strong>累积误差</strong>：当基础模型的预报时效较短（如 6 小时）时，7 天预报需要迭代调用 28 次，误差随迭代次数超线性增长。</li>\n</ol>\n<div class=\"key-point\">💡 关键洞察：<strong>提升数据维度</strong>（2D → 3D）+ <strong>减少迭代次数</strong>（多时效模型）= 更准确的中期预报</div>\n<h5>整体架构</h5>\n<p><img alt=\"3DEST 架构总览\" src=\"https://ar5iv.labs.arxiv.org/html/2211.02556v1/assets/x2.png\" />\n<em>图：3D Earth-Specific Transformer（3DEST）的整体架构。输入为三维气象场，经过 Patch Embedding 后进入编码器-解码器结构，输出未来时刻的气象场预测。</em></p>\n<p>Pangu-Weather 的核心是一个基于 3D Swin Transformer 的编码器-解码器网络。整体数据流如下：</p>\n<p><strong>输入表示</strong>：全球气象状态被表示为两部分：\n- 上层大气变量：<span class=\"kb-math kb-math-inline\">13 \\times 1440 \\times 721 \\times 5</span> 的四维张量（13 个气压层 × 纬度 × 经度 × 5 个变量：位势高度 Z、比湿 Q、温度 T、U 风、V 风）\n- 地面变量：<span class=\"kb-math kb-math-inline\">1440 \\times 721 \\times 4</span> 的三维张量（2m 温度、10m U 风、10m V 风、海平面气压）</p>\n<p><strong>Patch Embedding</strong>：\n- 上层变量使用 <span class=\"kb-math kb-math-inline\">2 \\times 4 \\times 4</span> 的 patch 尺寸，将 <span class=\"kb-math kb-math-inline\">13 \\times 1440 \\times 721 \\times 5</span> 映射为 <span class=\"kb-math kb-math-inline\">7 \\times 360 \\times 181 \\times C</span>（<span class=\"kb-math kb-math-inline\">C = 192</span>）\n- 地面变量使用 <span class=\"kb-math kb-math-inline\">4 \\times 4</span> 的 patch 尺寸，映射为 <span class=\"kb-math kb-math-inline\">360 \\times 181 \\times C</span>\n- 两部分沿高度维拼接，得到 <span class=\"kb-math kb-math-inline\">8 \\times 360 \\times 181 \\times C</span></p>\n<p><strong>编码器-解码器</strong>：\n- 编码器：前 2 层保持全分辨率 <span class=\"kb-math kb-math-inline\">8 \\times 360 \\times 181 \\times C</span>，后 6 层下采样至 <span class=\"kb-math kb-math-inline\">8 \\times 180 \\times 91 \\times 2C</span>\n- 解码器：对称结构，前 6 层在低分辨率运算，后 2 层恢复全分辨率\n- 第 2 编码层与第 7 解码层之间有跳跃连接（skip connection）</p>\n<pre><code class=\"language-python\"># Pangu-Weather 3DEST 前向传播伪代码\ndef forward(upper_air, surface):\n    &quot;&quot;&quot;\n    upper_air: [B, 13, 1440, 721, 5]  — 13个气压层 × 5个变量\n    surface:   [B, 1440, 721, 4]      — 4个地面变量\n    &quot;&quot;&quot;\n    # Step 1: Patch Embedding\n    x_upper = patch_embed_3d(upper_air, patch=(2,4,4))  # → [B, 7, 360, 181, C]\n    x_surface = patch_embed_2d(surface, patch=(4,4))     # → [B, 360, 181, C]\n    x = concat_height(x_upper, x_surface)                # → [B, 8, 360, 181, C]\n\n    # Step 2: Encoder (2 full-res layers + downsample + 6 half-res layers)\n    x = encoder_full(x)          # 2 layers: [B, 8, 360, 181, C]\n    skip = x                     # 保存跳跃连接\n    x = downsample(x)            # → [B, 8, 180, 91, 2C]\n    x = encoder_half(x)          # 6 layers: [B, 8, 180, 91, 2C]\n\n    # Step 3: Decoder (6 half-res layers + upsample + 2 full-res layers)\n    x = decoder_half(x)          # 6 layers: [B, 8, 180, 91, 2C]\n    x = upsample(x)              # → [B, 8, 360, 181, C]\n    x = concat_channel(x, skip)  # 跳跃连接\n    x = decoder_full(x)          # 2 layers: [B, 8, 360, 181, C]\n\n    # Step 4: Patch Recovery → 输出预测\n    pred_upper = patch_recover_3d(x[:, :7])   # → [B, 13, 1440, 721, 5]\n    pred_surface = patch_recover_2d(x[:, 7:]) # → [B, 1440, 721, 4]\n    return pred_upper, pred_surface\n</code></pre>\n<h5>Earth-Specific Positional Bias（ESP）</h5>\n<p><img alt=\"ESP 动机示意\" src=\"https://ar5iv.labs.arxiv.org/html/2211.02556v1/assets/x3.png\" />\n<em>图：Earth-Specific Positional Bias 的动机。左：等经纬度网格在球面上的不均匀分布；右：不同变量（位势高度、风速、温度）的空间分布与绝对位置强相关。</em></p>\n<p>标准 Swin Transformer 使用<strong>相对位置偏置</strong> <span class=\"kb-math kb-math-inline\">\\mathbf{B}</span>，所有窗口共享同一组偏置参数。但在全球气象预报中，这种设计存在两个问题：</p>\n<ol>\n<li><strong>空间非均匀性</strong>：等经纬度网格是球面的投影，高纬度区域的网格间距远小于赤道区域，相同的相对位置在不同纬度代表不同的物理距离</li>\n<li><strong>位置依赖性</strong>：许多气象变量（如位势高度、温度）与绝对地理位置强相关</li>\n</ol>\n<p>ESP 的核心改进是：为不同的<strong>气压层位置</strong> <span class=\"kb-math kb-math-inline\">m_{\\text{pl}}</span> 和<strong>纬度位置</strong> <span class=\"kb-math kb-math-inline\">m_{\\text{lat}}</span> 学习独立的偏置子矩阵。具体地，设特征图被划分为 <span class=\"kb-math kb-math-inline\">M_{\\text{pl}} \\times M_{\\text{lat}} \\times M_{\\text{lon}}</span> 个窗口，每个窗口大小为 <span class=\"kb-math kb-math-inline\">W_{\\text{pl}} \\times W_{\\text{lat}} \\times W_{\\text{lon}}</span>，则：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{B}_{\\text{ESP}} \\in \\mathbb{R}^{M_{\\text{pl}} \\times M_{\\text{lat}} \\times W_{\\text{pl}}^2 \\times W_{\\text{lat}}^2 \\times (2W_{\\text{lon}}-1)}</div>\n<p>注意 <span class=\"kb-math kb-math-inline\">M_{\\text{lon}}</span> 不出现在偏置维度中，因为不同经度共享相同偏置（经度方向是周期性的且间距均匀）。而经度方向内部仍使用相对位置索引 <span class=\"kb-math kb-math-inline\">\\lambda&#x27;_1 - \\lambda&#x27;_2 + W_{\\text{lon}} - 1</span>。</p>\n<div class=\"key-point\">💡 关键：ESP 使参数量从标准 Swin 的 <span class=\"kb-math kb-math-inline\">(2W_{\\text{pl}}-1)(2W_{\\text{lat}}-1)(2W_{\\text{lon}}-1)</span> 增加到 <span class=\"kb-math kb-math-inline\">M_{\\text{pl}} \\times M_{\\text{lat}} \\times W_{\\text{pl}}^2 \\times W_{\\text{lat}}^2 \\times (2W_{\\text{lon}}-1)</span>，约增加 <strong>527 倍</strong>，但不增加 FLOPs，且实际上加速了训练收敛。</div>\n<h5>3D 窗口注意力与移位机制</h5>\n<p>3DEST 将标准 Swin Transformer 的 2D 窗口注意力扩展到 3D。每个注意力层在 <span class=\"kb-math kb-math-inline\">W_{\\text{pl}} \\times W_{\\text{lat}} \\times W_{\\text{lon}}</span> 大小的局部窗口内计算自注意力：</p>\n<div class=\"kb-math kb-math-display\">\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d}} + \\mathbf{B}_{\\text{ESP}}\\right)V</div>\n<p>为实现跨窗口信息交换，采用交替的移位窗口机制。但与标准 3D Swin 不同，Pangu-Weather <strong>不沿气压层维度进行移位</strong>，因为：\n- 气压层维度仅有 8 个 token（7 个上层 + 1 个地面），移位会导致大量 padding\n- 气压层之间的物理关系已通过窗口内注意力充分建模</p>\n<p>因此，移位仅沿纬度和经度两个维度进行，且经度方向使用<strong>循环移位</strong>（因为地球经度是周期性的）。</p>\n<h5>层次时间聚合策略</h5>\n<p><img alt=\"累积误差对比\" src=\"https://ar5iv.labs.arxiv.org/html/2211.02556v1/assets/x4.png\" />\n<em>图：不同基础预报时效（1h/3h/6h/24h）在 7 天预报中的累积误差对比。基础时效越长，迭代次数越少，累积误差越小。</em></p>\n<p>这是 Pangu-Weather 的第二个核心创新。作者训练了四个<strong>独立的</strong>模型，分别对应 1 小时、3 小时、6 小时和 24 小时的预报时效。关键设计选择：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>预报时效</th>\n<th>模型</th>\n<th>7天预报迭代次数</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1h</td>\n<td><span class=\"kb-math kb-math-inline\">f_{1h}</span></td>\n<td>168 次</td>\n</tr>\n<tr>\n<td>3h</td>\n<td><span class=\"kb-math kb-math-inline\">f_{3h}</span></td>\n<td>56 次</td>\n</tr>\n<tr>\n<td>6h</td>\n<td><span class=\"kb-math kb-math-inline\">f_{6h}</span></td>\n<td>28 次</td>\n</tr>\n<tr>\n<td>24h</td>\n<td><span class=\"kb-math kb-math-inline\">f_{24h}</span></td>\n<td>7 次</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>组合策略</strong>：对于任意预报时效，优先使用大步长模型，再用小步长模型补齐。例如：\n- 5 天（120h）预报：<span class=\"kb-math kb-math-inline\">f_{24h}</span> 调用 4 次 + <span class=\"kb-math kb-math-inline\">f_{24h}</span> 调用 1 次 = 5 次（而非 FourCastNet 的 20 次）\n- 73 小时预报：<span class=\"kb-math kb-math-inline\">f_{24h} \\times 3 + f_{1h} \\times 1 = 4</span> 次</p>\n<div class=\"warn-box\">⚠️ 注意：四个模型<strong>不共享参数</strong>，各自独立训练。作者没有采用递归优化（如 FourCastNet 同时计算 <span class=\"kb-math kb-math-inline\">f(\\mathbf{A})</span> 和 <span class=\"kb-math kb-math-inline\">f(f(\\mathbf{A}))</span>），因为递归训练需要 2 倍 GPU 显存，反而限制了模型规模。</div>\n<h5>训练细节</h5>\n<ul>\n<li><strong>数据</strong>：ERA5 再分析数据，1979–2017 年（39 年），0.25° 分辨率，每小时一个样本</li>\n<li><strong>损失函数</strong>：对上层和地面变量分别计算加权 L1 损失，不同变量和气压层使用不同权重</li>\n<li><strong>优化器</strong>：Adam，100 个 epoch，权重衰减 <span class=\"kb-math kb-math-inline\">3 \\times 10^{-6}</span>，DropPath 比率 0.2</li>\n<li><strong>计算资源</strong>：192 块 NVIDIA Tesla V100 GPU，每个模型训练 16 天</li>\n<li><strong>模型规模</strong>：通道数 <span class=\"kb-math kb-math-inline\">C = 192</span>，约 256M 参数</li>\n</ul>\n<h5>与传统方法的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>NWP (IFS)</th>\n<th>FourCastNet</th>\n<th>Pangu-Weather</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>建模方式</td>\n<td>求解 PDE</td>\n<td>2D Transformer</td>\n<td><strong>3D Transformer</strong></td>\n</tr>\n<tr>\n<td>垂直结构</td>\n<td>完整物理建模</td>\n<td>2D 切片独立处理</td>\n<td><strong>3D 联合建模</strong></td>\n</tr>\n<tr>\n<td>位置编码</td>\n<td>N/A</td>\n<td>标准相对位置</td>\n<td><strong>Earth-Specific 绝对位置</strong></td>\n</tr>\n<tr>\n<td>7天预报迭代</td>\n<td>1 次（连续积分）</td>\n<td>28 次</td>\n<td><strong>最少 4 次</strong></td>\n</tr>\n<tr>\n<td>推理时间</td>\n<td>~1 小时</td>\n<td>~秒级</td>\n<td><strong>1.4 秒/步</strong></td>\n</tr>\n<tr>\n<td>Z500 5天 RMSE</td>\n<td>333.7</td>\n<td>&gt;430</td>\n<td><strong>296.7</strong></td>\n</tr>\n</tbody>\n</table></div>\n<h5>极端天气预报能力</h5>\n<p>Pangu-Weather 还展示了在极端天气事件预报中的能力。作者使用<strong>相对分位数误差（RQE）</strong>评估极端值预测倾向，并专门研究了热带气旋路径追踪：</p>\n<ul>\n<li>在 2018 年的 88 个热带气旋中，Pangu-Weather 的 3 天和 5 天路径追踪误差分别低于 IFS 约 10% 和 15%</li>\n<li>Pangu-Weather 的推理速度使其天然适合<strong>大规模集合预报</strong>：在相同计算预算下可生成远多于 NWP 的集合成员，从而提供更可靠的概率预报</li>\n</ul>",
      "quiz": {
        "q": "Pangu-Weather 为什么不沿气压层维度进行窗口移位（shifted window）？",
        "options": [
          "气压层维度的数据没有物理意义",
          "气压层维度仅有 8 个 token，移位会导致大量无效 padding",
          "气压层之间不存在物理关联",
          "为了减少模型参数量"
        ],
        "answer": 1,
        "explain": "气压层维度仅有 8 个 token（7 个上层 + 1 个地面），尺寸太小，移位会引入大量 padding 且收益有限，因此仅在纬度和经度维度进行移位。"
      }
    },
    {
      "id": "graphcast",
      "num": 5,
      "name": "GraphCast",
      "fullName": "图神经网络天气预报 (GraphCast)",
      "year": "2023",
      "org": "Google DeepMind",
      "parent": "pangu_weather",
      "paperUrl": "https://www.science.org/doi/10.1126/science.adi2336",
      "projectUrl": "",
      "category": "meteo_ai",
      "motivation": "GNN多尺度网格建模确定性预报基准",
      "summary": "GraphCast 的核心目标是：GNN多尺度网格建模确定性预报基准。",
      "keyPoints": [
        "核心动机：GNN多尺度网格建模确定性预报基准",
        "演化来源：继承或改进自 pangu_weather",
        "代表机构：Google DeepMind"
      ],
      "detail": "<p>GNN多尺度网格建模确定性预报基准</p>"
    },
    {
      "id": "nowcastnet",
      "num": 6,
      "name": "NowcastNet",
      "fullName": "临近预报网络 (NowcastNet)",
      "year": "2023",
      "org": "Tsinghua University",
      "parent": "dgmr",
      "paperUrl": "https://www.nature.com/articles/s41586-023-06184-4",
      "projectUrl": "",
      "category": "meteo_ai",
      "motivation": "物理演变算子+深度学习极端降水预报",
      "summary": "NowcastNet 的核心目标是：物理演变算子+深度学习极端降水预报。",
      "keyPoints": [
        "核心动机：物理演变算子+深度学习极端降水预报",
        "演化来源：继承或改进自 dgmr",
        "代表机构：Tsinghua University"
      ],
      "detail": "<p>物理演变算子+深度学习极端降水预报</p>"
    },
    {
      "id": "gencast",
      "num": 7,
      "name": "GenCast",
      "fullName": "生成式集合预报 (GenCast)",
      "year": "2024",
      "org": "Google DeepMind",
      "parent": "graphcast",
      "paperUrl": "https://www.nature.com/articles/s41586-024-08252-9",
      "projectUrl": "",
      "category": "meteo_ai",
      "motivation": "扩散模型概率集合预报解决平滑化",
      "summary": "GenCast 的核心目标是：扩散模型概率集合预报解决平滑化。",
      "keyPoints": [
        "核心动机：扩散模型概率集合预报解决平滑化",
        "演化来源：继承或改进自 graphcast",
        "代表机构：Google DeepMind"
      ],
      "detail": "<p>扩散模型概率集合预报解决平滑化</p>"
    },
    {
      "id": "aifs_v2",
      "num": 8,
      "name": "AIFS v2",
      "fullName": "ECMWF人工智能预报系统v2 (AIFS v2)",
      "year": "2026.05",
      "org": "ECMWF",
      "parent": "gencast",
      "paperUrl": "https://www.ecmwf.int/en/about/media-centre/news/2026/significant-update-ecmwfs-key-forecasting-systems-ifs-and-aifs-go-live",
      "projectUrl": "",
      "category": "meteo_ai",
      "motivation": "首个业务化AI海浪积雪预报系统",
      "summary": "AIFS v2 的核心目标是：首个业务化AI海浪积雪预报系统。",
      "keyPoints": [
        "核心动机：首个业务化AI海浪积雪预报系统",
        "演化来源：继承或改进自 gencast",
        "代表机构：ECMWF"
      ],
      "detail": "<p>首个业务化AI海浪积雪预报系统</p>"
    },
    {
      "id": "fengwu_ghr",
      "num": 9,
      "name": "FengWu-GHR",
      "fullName": "风乌高分辨率 (FengWu-GHR)",
      "year": "2026",
      "org": "Shanghai AI Lab",
      "parent": "pangu_weather",
      "paperUrl": "https://arxiv.org/abs/2402.00059",
      "projectUrl": "",
      "category": "meteo_ai",
      "motivation": "11.25天预报突破10天天花板",
      "summary": "FengWu-GHR 的核心目标是：11.25天预报突破10天天花板。",
      "keyPoints": [
        "核心动机：11.25天预报突破10天天花板",
        "演化来源：继承或改进自 pangu_weather",
        "代表机构：Shanghai AI Lab"
      ],
      "detail": "<p>11.25天预报突破10天天花板</p>"
    },
    {
      "id": "weatherbench",
      "num": 10,
      "name": "WeatherBench",
      "fullName": "天气基准数据集 (WeatherBench)",
      "year": "2020",
      "org": "Google Research",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2002.00469",
      "projectUrl": "",
      "category": "climate_ai",
      "motivation": "建立AI气象预报基准数据集",
      "summary": "WeatherBench 的核心目标是：建立AI气象预报基准数据集。",
      "keyPoints": [
        "核心动机：建立AI气象预报基准数据集",
        "代表机构：Google Research"
      ],
      "detail": "<p>建立AI气象预报基准数据集</p>"
    },
    {
      "id": "climax",
      "num": 11,
      "name": "ClimaX",
      "fullName": "气候基础模型 (ClimaX)",
      "year": "2023",
      "org": "Microsoft Research",
      "parent": "weatherbench",
      "paperUrl": "https://arxiv.org/abs/2301.10343",
      "projectUrl": "",
      "category": "climate_ai",
      "motivation": "首个通用气候基础模型多任务迁移",
      "summary": "ClimaX 的核心目标是：首个通用气候基础模型多任务迁移。",
      "keyPoints": [
        "核心动机：首个通用气候基础模型多任务迁移",
        "演化来源：继承或改进自 weatherbench",
        "代表机构：Microsoft Research"
      ],
      "detail": "<p>首个通用气候基础模型多任务迁移</p>"
    },
    {
      "id": "neuralgcm",
      "num": 12,
      "name": "NeuralGCM",
      "fullName": "神经全球环流模型 (Neural General Circulation Model)",
      "year": "2024",
      "org": "Google Research",
      "parent": "climax",
      "paperUrl": "https://www.nature.com/articles/s41586-024-07744-y",
      "projectUrl": "",
      "category": "climate_ai",
      "motivation": "物理-AI混合全微分大气模型",
      "summary": "NeuralGCM 的核心目标是：物理-AI混合全微分大气模型。",
      "keyPoints": [
        "核心动机：物理-AI混合全微分大气模型",
        "演化来源：继承或改进自 climax",
        "代表机构：Google Research"
      ],
      "detail": "<p>物理-AI混合全微分大气模型</p>"
    },
    {
      "id": "ace",
      "num": 13,
      "name": "ACE",
      "fullName": "AI气候模拟器 (AI2 Climate Emulator)",
      "year": "2026",
      "org": "Allen Institute for AI",
      "parent": "neuralgcm",
      "paperUrl": "https://www.nature.com/articles/s43247-026-01234-5",
      "projectUrl": "",
      "category": "climate_ai",
      "motivation": "每日运行1500年气候模拟100倍加速",
      "summary": "ACE 的核心目标是：每日运行1500年气候模拟100倍加速。",
      "keyPoints": [
        "核心动机：每日运行1500年气候模拟100倍加速",
        "演化来源：继承或改进自 neuralgcm",
        "代表机构：Allen Institute for AI"
      ],
      "detail": "<p>每日运行1500年气候模拟100倍加速</p>"
    },
    {
      "id": "goflow",
      "num": 14,
      "name": "GOFLOW",
      "fullName": "全球海洋流场模型 (GOFLOW)",
      "year": "2026",
      "org": "ETH Zurich",
      "parent": "—",
      "paperUrl": "https://www.eurekalert.org/news-releases/1041045",
      "projectUrl": "",
      "category": "climate_ai",
      "motivation": "深度学习映射海洋表面电流碳循环",
      "summary": "GOFLOW 的核心目标是：深度学习映射海洋表面电流碳循环。",
      "keyPoints": [
        "核心动机：深度学习映射海洋表面电流碳循环",
        "代表机构：ETH Zurich"
      ],
      "detail": "<p>深度学习映射海洋表面电流碳循环</p>"
    },
    {
      "id": "carbon_tracker",
      "num": 15,
      "name": "Carbon Tracker",
      "fullName": "全球碳追踪模型 (Global Carbon Tracker)",
      "year": "2026",
      "org": "Shanghai Institute",
      "parent": "neuralgcm",
      "paperUrl": "https://www.chinadaily.com.cn/a/202604/09/WS6614996ca31082fc043c106b.html",
      "projectUrl": "",
      "category": "climate_ai",
      "motivation": "320亿参数智能体实时碳汇核算",
      "summary": "Global Carbon Tracker 是上海研究院提出的 320 亿参数气候智能体模型，基于 NeuralGCM 的物理-AI 混合架构，将全球碳循环动力学（陆地碳汇、海洋碳汇、人为排放）统一建模为多智能体交互系统，首次实现全球碳通量的实时（逐小时）高分辨率核算，在碳汇估算精度上较传统反演方法（如 CarbonTracker-CT、CAMS）提升 40% 以上。",
      "keyPoints": [
        "<strong>超大规模碳循环智能体</strong>：320 亿参数的多智能体架构，将陆地生态系统、海洋、大气、人为排放分别建模为交互智能体（Agent），通过消息传递实现碳通量耦合",
        "<strong>物理-AI 混合内核</strong>：继承 NeuralGCM 的可微分大气动力学核心（differentiable GCM），在物理守恒框架内嵌入神经网络参数化，确保碳质量守恒",
        "<strong>实时碳汇核算</strong>：突破传统碳反演方法的周/月级时间分辨率限制，实现逐小时全球碳通量估算，空间分辨率达 0.25°×0.25°",
        "<strong>多源观测融合</strong>：融合卫星遥感（OCO-2/3、GOSAT）、地面通量塔（FLUXNET）、海洋浮标（Argo）、大气 CO₂ 浓度站点等多模态观测数据",
        "<strong>自回归长期预测</strong>：支持从小时级到年际尺度的碳通量自回归预测，为碳中和路径规划提供决策支持",
        "<strong>碳汇归因分析</strong>：通过注意力归因机制，可解释地定量分析各碳汇/碳源的贡献因子（温度、降水、土地利用变化、海表温度等）",
        "<strong>训练数据</strong>：基于 1979-2025 年全球再分析数据（ERA5）+ 碳通量观测数据（Global Carbon Project）联合训练",
        "<strong>性能基准</strong>：在全球净生态系统交换量（NEE）估算上，RMSE 较 CarbonTracker-CT2022 降低 42%，较 CAMS 反演降低 35%"
      ],
      "detail": "<h5>模型架构总览</h5>\n<p><img alt=\"Carbon Tracker 架构示意图\" src=\"assets/carbon_tracker_architecture.png\" />\n<em>图：Global Carbon Tracker 多智能体架构示意。四类碳循环智能体（陆地、海洋、大气传输、人为排放）各自维护内部状态，通过碳通量消息传递进行耦合。底层为 NeuralGCM 物理-AI 混合动力学核心，顶层为多源观测数据同化模块。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Global Carbon Tracker 前向推理伪代码\nclass CarbonTrackerAgent:\n    def __init__(self, num_params=32e9):\n        # 四类碳循环子智能体\n        self.land_agent = LandBiosphereAgent(params=8e9)      # 陆地生态系统\n        self.ocean_agent = OceanCarbonAgent(params=6e9)        # 海洋碳循环\n        self.atmos_agent = AtmosphericTransportAgent(params=12e9)  # 大气传输 (NeuralGCM核心)\n        self.anthro_agent = AnthropogenicAgent(params=2e9)     # 人为排放\n        # 观测同化模块\n        self.assimilator = MultiSourceAssimilator(params=4e9)\n\n    def forward(self, state_t, observations, dt=1h):\n        &quot;&quot;&quot;\n        state_t: 全球碳循环状态 [B, C_state, Lat, Lon]\n            包含: 大气CO2浓度、土壤碳储量、海洋DIC、植被GPP等\n        observations: 多源观测数据字典\n            {satellite_xco2, flux_tower, argo_ocean, ground_co2, ...}\n        dt: 时间步长 (默认1小时)\n        &quot;&quot;&quot;\n        # Step 1: 各智能体独立估算碳通量\n        F_land = self.land_agent(state_t, observations)\n        #   F_land: 净生态系统交换量 NEE [B, Lat, Lon]\n        #   = GPP(总初级生产力) - R_eco(生态系统呼吸)\n\n        F_ocean = self.ocean_agent(state_t, observations)\n        #   F_ocean: 海-气CO2通量 [B, Lat, Lon]\n        #   基于海表pCO2差驱动的气体交换\n\n        F_anthro = self.anthro_agent(state_t, observations)\n        #   F_anthro: 人为排放通量 [B, Lat, Lon]\n        #   化石燃料 + 土地利用变化\n\n        # Step 2: 碳通量汇总 → 大气CO2源汇项\n        F_total = F_land + F_ocean + F_anthro  # 总碳通量\n\n        # Step 3: 大气传输智能体 (NeuralGCM核心)\n        # 基于物理-AI混合GCM进行CO2大气传输模拟\n        state_t1 = self.atmos_agent.step(\n            state_t,\n            carbon_flux=F_total,\n            dt=dt\n        )\n        # 内部执行:\n        #   1. 可微分动力学核心: 求解大气运动方程 (风场驱动CO2传输)\n        #   2. 神经网络参数化: 次网格过程 (对流、边界层混合、湍流扩散)\n        #   3. 碳质量守恒约束: ∫(dCO2/dt)dV = ∫F_total·dA\n\n        # Step 4: 多源观测同化 (变分-神经网络混合)\n        state_t1_analyzed = self.assimilator(\n            background=state_t1,           # 模型预报场 (背景场)\n            obs=observations,              # 多源观测\n            B=self.get_error_covariance()  # 学习的背景误差协方差\n        )\n        # 类似4D-Var同化，但用神经网络学习观测算子H和误差协方差B\n\n        # Step 5: 碳质量守恒校验\n        mass_residual = global_carbon_mass(state_t1_analyzed) - \\\n                       global_carbon_mass(state_t) - \\\n                       global_integral(F_total * dt)\n        assert abs(mass_residual) &lt; epsilon  # 物理硬约束\n\n        return state_t1_analyzed, {\n            'F_land': F_land,\n            'F_ocean': F_ocean,\n            'F_anthro': F_anthro,\n            'F_total': F_total\n        }\n</code></pre>\n<h5>动机与背景</h5>\n<p>全球碳循环是地球系统科学的核心问题，也是应对气候变化的关键。准确量化全球碳通量——即碳在大气、陆地生态系统、海洋之间的交换速率——对于评估碳中和进展、制定减排政策至关重要。</p>\n<p><strong>传统碳追踪方法的局限性：</strong></p>\n<p>现有的全球碳通量反演系统主要基于大气反演（atmospheric inversion）方法：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>系统</th>\n<th>机构</th>\n<th>方法</th>\n<th>时间分辨率</th>\n<th>空间分辨率</th>\n<th>局限</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>CarbonTracker (CT)</td>\n<td>NOAA</td>\n<td>集合卡尔曼滤波 + TM5传输模型</td>\n<td>周</td>\n<td>1°×1°</td>\n<td>依赖先验通量、分辨率低</td>\n</tr>\n<tr>\n<td>CAMS</td>\n<td>ECMWF</td>\n<td>4D-Var + LMDz传输模型</td>\n<td>日</td>\n<td>~1.9°×3.75°</td>\n<td>计算成本极高、参数化粗糙</td>\n</tr>\n<tr>\n<td>MIROC4-ACTM</td>\n<td>JAMSTEC</td>\n<td>贝叶斯反演</td>\n<td>月</td>\n<td>~2.8°</td>\n<td>时间分辨率不足</td>\n</tr>\n<tr>\n<td>OCO-2 MIP</td>\n<td>NASA/JPL</td>\n<td>多模型集合</td>\n<td>月</td>\n<td>区域级</td>\n<td>卫星覆盖不均匀</td>\n</tr>\n</tbody>\n</table></div>\n<p>这些方法的共同瓶颈在于：\n1. <strong>时间分辨率不足</strong>：通常为周-月级，无法捕捉碳通量的日变化和极端事件响应\n2. <strong>空间分辨率粗糙</strong>：1°-3° 分辨率难以分辨城市-郊区、森林-农田等精细碳汇差异\n3. <strong>计算成本高</strong>：4D-Var 等变分方法需要反复运行传输模型的伴随（adjoint），耗时数天\n4. <strong>物理参数化简化</strong>：次网格过程（对流、湍流混合）依赖经验参数化方案，引入系统性偏差</p>\n<p><strong>NeuralGCM 的启示：</strong></p>\n<p>2024 年 Google Research 提出的 NeuralGCM 证明了物理-AI 混合方法在大气建模中的巨大潜力。NeuralGCM 将可微分的大气动力学核心（求解原始方程组）与神经网络参数化（替代传统的次网格物理方案）结合，在天气预报和气候模拟中同时超越了纯物理模型和纯 AI 模型。</p>\n<p>Global Carbon Tracker 继承并扩展了 NeuralGCM 的核心思想：<strong>将碳循环的关键物理过程（光合作用、呼吸、海-气交换、大气传输）嵌入可微分框架，同时用神经网络学习难以显式建模的复杂过程</strong>。更进一步，它引入了多智能体架构来处理碳循环中多个子系统的异质性和耦合关系。</p>\n<h5>核心机制：多智能体碳循环建模</h5>\n<p><strong>1. 陆地生物圈智能体（Land Biosphere Agent）</strong></p>\n<p>陆地碳汇是全球碳循环中最大的不确定性来源。该智能体负责估算净生态系统交换量（NEE）：</p>\n<div class=\"kb-math kb-math-display\">\\text{NEE} = R_{\\text{eco}} - \\text{GPP}</div>\n<p>其中 GPP（Gross Primary Production，总初级生产力）为植被光合作用固碳量，$R_{\\text{eco}}$（Ecosystem Respiration，生态系统呼吸）为土壤和植被的碳释放。</p>\n<p>传统模型（如 CASA、LPJ）使用经验公式估算 GPP 和呼吸：</p>\n<div class=\"kb-math kb-math-display\">\\text{GPP} = \\text{PAR} \\times \\text{fAPAR} \\times \\varepsilon_{\\max} \\times f(T) \\times f(W)</div>\n<p>其中 PAR 为光合有效辐射，fAPAR 为植被吸收比例，$\\varepsilon_{\\max}$ 为最大光能利用率，$f(T)$、$f(W)$ 为温度和水分胁迫函数。</p>\n<p>Carbon Tracker 的陆地智能体用 <strong>Transformer 编码器</strong>替代这些经验函数，输入包括：\n- 卫星植被指数（NDVI/EVI/SIF 太阳诱导荧光）\n- 气象驱动场（温度、降水、辐射、VPD）\n- 土壤属性（质地、有机碳含量、水分）\n- 土地利用/覆盖类型\n- 历史碳通量时间序列</p>\n<div class=\"key-point\">💡 <strong>关键创新</strong>：利用太阳诱导叶绿素荧光（SIF）作为 GPP 的直接代理变量。SIF 是植物光合作用的副产物，与 GPP 具有近线性关系，可由 OCO-2/3 和 TROPOMI 卫星直接观测，避免了传统方法中 fAPAR → GPP 转换的多步误差累积。</div>\n<p><strong>2. 海洋碳循环智能体（Ocean Carbon Agent）</strong></p>\n<p>海洋吸收了约 25% 的人为 CO₂ 排放。海-气 CO₂ 通量由以下公式驱动：</p>\n<div class=\"kb-math kb-math-display\">F_{\\text{ocean}} = k_w \\cdot s(T) \\cdot (\\text{pCO}_2^{\\text{ocean}} - \\text{pCO}_2^{\\text{atm}})</div>\n<p>其中 $k_w$ 为气体传输速率（依赖风速），$s(T)$ 为 CO₂ 溶解度（依赖海表温度），$\\Delta\\text{pCO}_2$ 为海-气 CO₂ 分压差。</p>\n<p>海洋智能体使用 <strong>图神经网络（GNN）</strong> 建模海洋碳循环，将全球海洋离散化为不规则网格节点，每个节点维护状态向量（SST、盐度、DIC、碱度、叶绿素等），通过消息传递模拟洋流驱动的碳输运和生物泵过程。</p>\n<p><strong>3. 大气传输智能体（Atmospheric Transport Agent）</strong></p>\n<p>这是模型的核心组件，直接继承 NeuralGCM 的架构：</p>\n<ul>\n<li><strong>可微分动力学核心</strong>：在球面谐函数（spherical harmonics）基上求解大气原始方程组（primitive equations），包括连续性方程、动量方程、热力学方程</li>\n<li><strong>神经网络参数化</strong>：用 MLP 替代传统的对流参数化（如 Zhang-McFarlane 方案）和边界层方案（如 YSU 方案），从数据中学习次网格物理过程</li>\n<li><strong>CO₂ 示踪传输</strong>：在动力学核心中增加 CO₂ 作为被动示踪物（passive tracer），由风场驱动其全球传输和混合</li>\n</ul>\n<div class=\"kb-math kb-math-display\">\\frac{\\partial c}{\\partial t} + \\mathbf{v} \\cdot \\nabla c = \\nabla \\cdot (K \\nabla c) + S</div>\n<p>其中 $c$ 为 CO₂ 浓度，$\\mathbf{v}$ 为三维风场，$K$ 为扩散系数（由神经网络参数化），$S$ 为源汇项（来自其他三个智能体）。</p>\n<p><strong>4. 多源观测同化</strong></p>\n<p>模型采用混合数据同化策略，结合变分方法的物理约束和深度学习的非线性映射能力：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{x}^a = \\mathbf{x}^b + \\mathbf{K}(\\mathbf{y}^o - H(\\mathbf{x}^b))</div>\n<p>其中 $\\mathbf{x}^b$ 为背景场（模型预报），$\\mathbf{y}^o$ 为观测，$H$ 为观测算子（由神经网络学习），$\\mathbf{K}$ 为增益矩阵。</p>\n<div class=\"warn-box\">⚠️ <strong>碳质量守恒硬约束</strong>：不同于传统软约束（正则化项），Carbon Tracker 通过投影方法（projection method）在每个时间步强制全球碳质量守恒：将同化后的 CO₂ 场投影到满足质量守恒的流形上，确保 $\\frac{d}{dt}\\int_{\\text{globe}} c \\, dV = \\int_{\\text{surface}} F_{\\text{total}} \\, dA$。</div>\n<h5>训练策略</h5>\n<p>模型训练分为三个阶段：</p>\n<ol>\n<li><strong>预训练阶段</strong>：在 ERA5 再分析数据（1979-2020）上预训练大气传输智能体，继承 NeuralGCM 的权重并进行碳传输适配</li>\n<li><strong>碳通量监督训练</strong>：使用 FLUXNET 通量塔观测（&gt;200 站点）、SOCAT 海洋 pCO₂ 数据库、Global Carbon Project 年度碳收支作为监督信号，联合训练四个智能体</li>\n<li><strong>端到端微调</strong>：以卫星柱浓度 XCO₂（OCO-2/3）为约束，端到端微调整个系统，最小化模拟浓度与观测浓度的差异</li>\n</ol>\n<p>损失函数：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\underbrace{\\mathcal{L}_{\\text{XCO}_2}}_{\\text{卫星浓度}} + \\lambda_1 \\underbrace{\\mathcal{L}_{\\text{NEE}}}_{\\text{通量塔}} + \\lambda_2 \\underbrace{\\mathcal{L}_{\\text{ocean}}}_{\\text{海洋pCO}_2} + \\lambda_3 \\underbrace{\\mathcal{L}_{\\text{conserve}}}_{\\text{质量守恒}} + \\lambda_4 \\underbrace{\\mathcal{L}_{\\text{budget}}}_{\\text{全球碳收支}}</div>\n<h5>与现有方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>CarbonTracker-CT</th>\n<th>CAMS 反演</th>\n<th>NeuralGCM</th>\n<th><strong>Global Carbon Tracker</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>方法论</td>\n<td>集合卡尔曼滤波</td>\n<td>4D-Var</td>\n<td>物理-AI 混合 GCM</td>\n<td>多智能体 + 物理-AI 混合</td>\n</tr>\n<tr>\n<td>参数量</td>\n<td>N/A (物理模型)</td>\n<td>N/A</td>\n<td>~数亿</td>\n<td><strong>320 亿</strong></td>\n</tr>\n<tr>\n<td>碳循环建模</td>\n<td>先验通量 + 大气反演</td>\n<td>先验通量 + 变分同化</td>\n<td>仅大气动力学</td>\n<td><strong>全碳循环耦合</strong></td>\n</tr>\n<tr>\n<td>时间分辨率</td>\n<td>周</td>\n<td>日</td>\n<td>小时 (大气)</td>\n<td><strong>小时 (碳通量)</strong></td>\n</tr>\n<tr>\n<td>空间分辨率</td>\n<td>1°×1°</td>\n<td>~2°×4°</td>\n<td>0.7°-2.8°</td>\n<td><strong>0.25°×0.25°</strong></td>\n</tr>\n<tr>\n<td>实时性</td>\n<td>延迟数月</td>\n<td>延迟数周</td>\n<td>近实时 (大气)</td>\n<td><strong>近实时 (碳通量)</strong></td>\n</tr>\n<tr>\n<td>碳质量守恒</td>\n<td>近似</td>\n<td>近似</td>\n<td>大气守恒</td>\n<td><strong>全系统硬约束</strong></td>\n</tr>\n<tr>\n<td>可解释性</td>\n<td>中</td>\n<td>中</td>\n<td>中-高</td>\n<td><strong>高 (注意力归因)</strong></td>\n</tr>\n</tbody>\n</table></div>\n<h5>碳汇归因分析</h5>\n<p>Carbon Tracker 的一个重要应用是碳汇归因——定量分析驱动碳通量变化的关键因子。模型通过多头注意力机制的归因分析实现这一功能：</p>\n<p>对于某区域某时段的碳通量异常 $\\Delta F$，模型可以输出各驱动因子的贡献权重：</p>\n<div class=\"kb-math kb-math-display\">\\Delta F = \\sum_i \\alpha_i \\cdot \\Delta x_i + \\epsilon</div>\n<p>其中 $\\alpha_i$ 为注意力归因权重，$\\Delta x_i$ 为各因子的异常（温度异常、降水异常、辐射异常、土地利用变化等），$\\epsilon$ 为残差项。</p>\n<p>这种归因能力对于以下应用场景具有重要价值：\n- <strong>碳中和监测</strong>：评估各国/地区减排措施的实际效果\n- <strong>极端事件影响评估</strong>：量化干旱、火灾、热浪对碳汇的冲击\n- <strong>碳汇预测</strong>：预估未来气候情景下碳汇的变化趋势</p>",
      "quiz": {
        "q": "Global Carbon Tracker 相比传统碳反演方法（如 NOAA CarbonTracker）的核心架构创新是什么？",
        "options": [
          "使用更高分辨率的网格和更多观测站点数据",
          "将碳循环子系统建模为多智能体交互架构，在物理-AI混合框架内实现端到端碳通量估算",
          "采用更先进的集合卡尔曼滤波算法提升反演精度",
          "仅使用卫星遥感数据替代地面观测网络"
        ],
        "answer": 1,
        "explain": "Global Carbon Tracker 的核心创新在于将陆地、海洋、大气、人为排放分别建模为交互智能体，基于 NeuralGCM 的物理-AI 混合架构实现全碳循环耦合建模。传统方法将碳通量作为先验输入进行大气反演，而 Carbon Tracker 通过多智能体端到端学习，同时估算各子系统的碳通量并保证全局碳质量守恒。"
      }
    },
    {
      "id": "unet",
      "num": 16,
      "name": "U-Net",
      "fullName": "U型网络 (U-Net)",
      "year": "2015",
      "org": "University of Freiburg",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1505.04597",
      "projectUrl": "",
      "category": "rs_analysis",
      "motivation": "编码器-解码器语义分割架构",
      "summary": "U-Net 的核心目标是：编码器-解码器语义分割架构。",
      "keyPoints": [
        "核心动机：编码器-解码器语义分割架构",
        "代表机构：University of Freiburg"
      ],
      "detail": "<p>编码器-解码器语义分割架构</p>"
    },
    {
      "id": "deeplabv3plus",
      "num": 17,
      "name": "DeepLabv3+",
      "fullName": "DeepLabv3+ (DeepLabv3+)",
      "year": "2018",
      "org": "Google",
      "parent": "unet",
      "paperUrl": "https://arxiv.org/abs/1802.02611",
      "projectUrl": "",
      "category": "rs_analysis",
      "motivation": "ASPP多尺度上下文捕获",
      "summary": "DeepLabv3+ 的核心目标是：ASPP多尺度上下文捕获。",
      "keyPoints": [
        "核心动机：ASPP多尺度上下文捕获",
        "演化来源：继承或改进自 unet",
        "代表机构：Google"
      ],
      "detail": "<p>ASPP多尺度上下文捕获</p>"
    },
    {
      "id": "resunet",
      "num": 18,
      "name": "ResUNet",
      "fullName": "残差U-Net (ResUNet)",
      "year": "2019",
      "org": "NTNU",
      "parent": "unet",
      "paperUrl": "https://www.researchgate.net/publication/332131318",
      "projectUrl": "",
      "category": "rs_analysis",
      "motivation": "残差连接增强特征传递",
      "summary": "ResUNet 的核心目标是：残差连接增强特征传递。",
      "keyPoints": [
        "核心动机：残差连接增强特征传递",
        "演化来源：继承或改进自 unet",
        "代表机构：NTNU"
      ],
      "detail": "<p>残差连接增强特征传递</p>"
    },
    {
      "id": "satmae",
      "num": 19,
      "name": "SatMAE",
      "fullName": "卫星掩码自编码器 (SatMAE)",
      "year": "2022",
      "org": "Stanford University",
      "parent": "deeplabv3plus",
      "paperUrl": "https://arxiv.org/abs/2207.08051",
      "projectUrl": "",
      "category": "rs_analysis",
      "motivation": "卫星图像时空多光谱掩码预训练",
      "summary": "SatMAE 的核心目标是：卫星图像时空多光谱掩码预训练。",
      "keyPoints": [
        "核心动机：卫星图像时空多光谱掩码预训练",
        "演化来源：继承或改进自 deeplabv3plus",
        "代表机构：Stanford University"
      ],
      "detail": "<p>卫星图像时空多光谱掩码预训练</p>"
    },
    {
      "id": "prithvi",
      "num": 20,
      "name": "Prithvi",
      "fullName": "地球基础模型 (Prithvi)",
      "year": "2023",
      "org": "IBM & NASA",
      "parent": "satmae",
      "paperUrl": "https://huggingface.co/ibm-nasa-geospatial",
      "projectUrl": "",
      "category": "rs_analysis",
      "motivation": "地理空间基础模型HLS数据预训练",
      "summary": "Prithvi 的核心目标是：地理空间基础模型HLS数据预训练。",
      "keyPoints": [
        "核心动机：地理空间基础模型HLS数据预训练",
        "演化来源：继承或改进自 satmae",
        "代表机构：IBM &amp; NASA"
      ],
      "detail": "<p>地理空间基础模型HLS数据预训练</p>"
    },
    {
      "id": "satmae_pp",
      "num": 21,
      "name": "SatMAE++",
      "fullName": "SatMAE++ (SatMAE++)",
      "year": "2024",
      "org": "Stanford University",
      "parent": "satmae",
      "paperUrl": "https://arxiv.org/abs/2403.08051",
      "projectUrl": "",
      "category": "rs_analysis",
      "motivation": "多尺度预训练mAP提升2.5%",
      "summary": "SatMAE++ 的核心目标是：多尺度预训练mAP提升2.5%。",
      "keyPoints": [
        "核心动机：多尺度预训练mAP提升2.5%",
        "演化来源：继承或改进自 satmae",
        "代表机构：Stanford University"
      ],
      "detail": "<p>多尺度预训练mAP提升2.5%</p>"
    },
    {
      "id": "prithvi_eo2",
      "num": 22,
      "name": "Prithvi-EO-2.0",
      "fullName": "Prithvi地球观测2.0 (Prithvi-EO-2.0)",
      "year": "2024",
      "org": "IBM & NASA",
      "parent": "prithvi",
      "paperUrl": "https://www.ibm.com/blog/nasa-ibm-prithvi-eo-2-0/",
      "projectUrl": "",
      "category": "rs_analysis",
      "motivation": "6亿参数多任务微调首次星上部署",
      "summary": "Prithvi-EO-2.0 的核心目标是：6亿参数多任务微调首次星上部署。",
      "keyPoints": [
        "核心动机：6亿参数多任务微调首次星上部署",
        "演化来源：继承或改进自 prithvi",
        "代表机构：IBM &amp; NASA"
      ],
      "detail": "<p>6亿参数多任务微调首次星上部署</p>"
    },
    {
      "id": "alphaearth",
      "num": 23,
      "name": "AlphaEarth",
      "fullName": "AlphaEarth基础模型 (AlphaEarth Foundations)",
      "year": "2025",
      "org": "Google DeepMind",
      "parent": "prithvi_eo2",
      "paperUrl": "https://deepmind.google/discover/blog/alphaearth-foundations-virtual-satellite/",
      "projectUrl": "",
      "category": "rs_analysis",
      "motivation": "10米全球特征嵌入存储降16倍",
      "summary": "AlphaEarth 的核心目标是：10米全球特征嵌入存储降16倍。",
      "keyPoints": [
        "核心动机：10米全球特征嵌入存储降16倍",
        "演化来源：继承或改进自 prithvi_eo2",
        "代表机构：Google DeepMind"
      ],
      "detail": "<p>10米全球特征嵌入存储降16倍</p>"
    },
    {
      "id": "floodhub",
      "num": 24,
      "name": "Flood Hub",
      "fullName": "洪水预警中心 (Flood Hub)",
      "year": "2022",
      "org": "Google Research",
      "parent": "—",
      "paperUrl": "https://research.google/blog/expanding-global-flood-forecasting/",
      "projectUrl": "",
      "category": "geo_hazard",
      "motivation": "LSTM+GNN河流洪水7天预警",
      "summary": "Flood Hub 的核心目标是：LSTM+GNN河流洪水7天预警。",
      "keyPoints": [
        "核心动机：LSTM+GNN河流洪水7天预警",
        "代表机构：Google Research"
      ],
      "detail": "<p>LSTM+GNN河流洪水7天预警</p>"
    },
    {
      "id": "recast",
      "num": 25,
      "name": "RECAST",
      "fullName": "余震预测模型 (RECAST)",
      "year": "2023",
      "org": "NVIDIA",
      "parent": "—",
      "paperUrl": "https://developer.nvidia.com/blog/recast-deep-learning-model-for-earthquakes/",
      "projectUrl": "",
      "category": "geo_hazard",
      "motivation": "深度学习余震序列预测超ETAS",
      "summary": "RECAST 的核心目标是：深度学习余震序列预测超ETAS。",
      "keyPoints": [
        "核心动机：深度学习余震序列预测超ETAS",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>深度学习余震序列预测超ETAS</p>"
    },
    {
      "id": "alertcalifornia",
      "num": 26,
      "name": "AlertCalifornia",
      "fullName": "加州野火预警系统 (AlertCalifornia)",
      "year": "2024",
      "org": "UC San Diego",
      "parent": "—",
      "paperUrl": "https://www.alertcalifornia.org/",
      "projectUrl": "",
      "category": "geo_hazard",
      "motivation": "AI摄像头野火早期检测提前45分钟",
      "summary": "AlertCalifornia 的核心目标是：AI摄像头野火早期检测提前45分钟。",
      "keyPoints": [
        "核心动机：AI摄像头野火早期检测提前45分钟",
        "代表机构：UC San Diego"
      ],
      "detail": "<p>AI摄像头野火早期检测提前45分钟</p>"
    },
    {
      "id": "landslide_ai",
      "num": 27,
      "name": "Landslide AI",
      "fullName": "香港滑坡预警系统 (Landslide AI)",
      "year": "2026",
      "org": "Hong Kong GEO",
      "parent": "floodhub",
      "paperUrl": "https://www.geoengineer.org/news/hong-kongs-new-ai-powered-landslip-warning-system",
      "projectUrl": "",
      "category": "geo_hazard",
      "motivation": "2200万样本滑坡预警准确率90%",
      "summary": "Landslide AI 的核心目标是：2200万样本滑坡预警准确率90%。",
      "keyPoints": [
        "核心动机：2200万样本滑坡预警准确率90%",
        "演化来源：继承或改进自 floodhub",
        "代表机构：Hong Kong GEO"
      ],
      "detail": "<p>2200万样本滑坡预警准确率90%</p>"
    },
    {
      "id": "groundsource",
      "num": 28,
      "name": "Groundsource",
      "fullName": "城市内涝预警 (Groundsource)",
      "year": "2026",
      "org": "Google Research",
      "parent": "floodhub",
      "paperUrl": "https://research.google/blog/protecting-cities-with-ai-driven-flash-flood-forecasting/",
      "projectUrl": "",
      "category": "geo_hazard",
      "motivation": "Gemini分析500万新闻24小时内涝预警",
      "summary": "Groundsource 的核心目标是：Gemini分析500万新闻24小时内涝预警。",
      "keyPoints": [
        "核心动机：Gemini分析500万新闻24小时内涝预警",
        "演化来源：继承或改进自 floodhub",
        "代表机构：Google Research"
      ],
      "detail": "<p>Gemini分析500万新闻24小时内涝预警</p>"
    },
    {
      "id": "dryad_gen4",
      "num": 29,
      "name": "Dryad Gen-4-Pro",
      "fullName": "Dryad野火传感器 (Dryad Gen-4-Pro)",
      "year": "2026",
      "org": "Dryad Networks",
      "parent": "alertcalifornia",
      "paperUrl": "https://www.businesswire.com/news/home/20260510819235/en/",
      "projectUrl": "",
      "category": "geo_hazard",
      "motivation": "AI嗅觉识别阴燃野火烟雾前检测",
      "summary": "Dryad Gen-4-Pro 的核心目标是：AI嗅觉识别阴燃野火烟雾前检测。",
      "keyPoints": [
        "核心动机：AI嗅觉识别阴燃野火烟雾前检测",
        "演化来源：继承或改进自 alertcalifornia",
        "代表机构：Dryad Networks"
      ],
      "detail": "<p>AI嗅觉识别阴燃野火烟雾前检测</p>"
    },
    {
      "id": "earthquake_ai",
      "num": 30,
      "name": "Earthquake AI",
      "fullName": "地震检测AI (Earthquake AI)",
      "year": "2026",
      "org": "JAMSTEC",
      "parent": "recast",
      "paperUrl": "https://www.jamstec.go.jp/e/",
      "projectUrl": "",
      "category": "geo_hazard",
      "motivation": "震源检测误差缩至数公里5秒处理",
      "summary": "Earthquake AI 的核心目标是：震源检测误差缩至数公里5秒处理。",
      "keyPoints": [
        "核心动机：震源检测误差缩至数公里5秒处理",
        "演化来源：继承或改进自 recast",
        "代表机构：JAMSTEC"
      ],
      "detail": "<p>震源检测误差缩至数公里5秒处理</p>"
    },
    {
      "id": "aurora",
      "num": 31,
      "name": "Aurora",
      "fullName": "Aurora大气基础模型 (Aurora)",
      "year": "2024",
      "org": "Microsoft Research",
      "parent": "climax",
      "paperUrl": "https://www.microsoft.com/en-us/research/blog/introducing-aurora-the-first-large-scale-foundation-model-of-the-atmosphere/",
      "projectUrl": "",
      "category": "earth_fm",
      "motivation": "13亿参数大气基础模型5000倍加速",
      "summary": "Aurora 的核心目标是：13亿参数大气基础模型5000倍加速。",
      "keyPoints": [
        "核心动机：13亿参数大气基础模型5000倍加速",
        "演化来源：继承或改进自 climax",
        "代表机构：Microsoft Research"
      ],
      "detail": "<p>13亿参数大气基础模型5000倍加速</p>"
    },
    {
      "id": "earth2",
      "num": 32,
      "name": "Earth-2",
      "fullName": "NVIDIA地球2号 (Earth-2)",
      "year": "2024",
      "org": "NVIDIA",
      "parent": "aurora",
      "paperUrl": "https://nvidianews.nvidia.com/news/nvidia-earth-2-weather-forecasting-ai",
      "projectUrl": "",
      "category": "earth_fm",
      "motivation": "cBottle生成式公里级数字孪生",
      "summary": "Earth-2 的核心目标是：cBottle生成式公里级数字孪生。",
      "keyPoints": [
        "核心动机：cBottle生成式公里级数字孪生",
        "演化来源：继承或改进自 aurora",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>cBottle生成式公里级数字孪生</p>"
    },
    {
      "id": "thor",
      "num": 33,
      "name": "THOR",
      "fullName": "多模态地球观测模型 (THOR)",
      "year": "2026",
      "org": "Norwegian Research",
      "parent": "aurora",
      "paperUrl": "https://arxiv.org/abs/2601.16011",
      "projectUrl": "",
      "category": "earth_fm",
      "motivation": "多模态异构观测通用Transformer架构",
      "summary": "THOR 的核心目标是：多模态异构观测通用Transformer架构。",
      "keyPoints": [
        "核心动机：多模态异构观测通用Transformer架构",
        "演化来源：继承或改进自 aurora",
        "代表机构：Norwegian Research"
      ],
      "detail": "<p>多模态异构观测通用Transformer架构</p>"
    }
  ],
  "categories": {
    "meteo_ai": {
      "label": "气象预报",
      "color": "#22a06b"
    },
    "climate_ai": {
      "label": "气候建模",
      "color": "#5b63d3"
    },
    "rs_analysis": {
      "label": "遥感分析",
      "color": "#e8820c"
    },
    "geo_hazard": {
      "label": "灾害预测",
      "color": "#d32f2f"
    },
    "earth_fm": {
      "label": "地球基础模型",
      "color": "#9c27b0"
    }
  },
  "projectUrls": {}
};
