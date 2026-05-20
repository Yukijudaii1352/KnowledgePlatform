/**
 * model_compression-data.js — 由 pipeline/build.py 于 2026-05-20 17:45:11 自动生成。
 * 源文件：content/infra/model_compression.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "infra",
    "topic_id": "model_compression",
    "topic_name": "模型压缩",
    "page_title": "模型压缩算法总结",
    "page_subtitle": "2026-05-20 版",
    "page_desc": "综述量化、剪枝、蒸馏与稀疏化部署的技术演进，涵盖从经典压缩范式到2026年最新前沿进展。",
    "page_icon": "🗜️",
    "hero_pills": [
      "🏷️ Quantization · Pruning · Distillation · Sparse Inference"
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
        "id": "qat",
        "x": 2018,
        "y": 100,
        "category": "quantization"
      },
      {
        "id": "gptq",
        "x": 2023,
        "y": 100,
        "category": "quantization"
      },
      {
        "id": "smoothquant",
        "x": 2023,
        "y": 130,
        "category": "quantization"
      },
      {
        "id": "awq",
        "x": 2024,
        "y": 100,
        "category": "quantization"
      },
      {
        "id": "abq_llm",
        "x": 2025,
        "y": 100,
        "category": "quantization"
      },
      {
        "id": "spinquant",
        "x": 2025,
        "y": 130,
        "category": "quantization"
      },
      {
        "id": "efficientqat",
        "x": 2025,
        "y": 160,
        "category": "quantization"
      },
      {
        "id": "lottery_ticket",
        "x": 2019,
        "y": 250,
        "category": "pruning"
      },
      {
        "id": "movement_pruning",
        "x": 2020,
        "y": 250,
        "category": "pruning"
      },
      {
        "id": "sparsegpt",
        "x": 2023,
        "y": 250,
        "category": "pruning"
      },
      {
        "id": "saap",
        "x": 2026,
        "y": 250,
        "category": "pruning"
      },
      {
        "id": "replaceme",
        "x": 2026,
        "y": 280,
        "category": "pruning"
      },
      {
        "id": "vitcop",
        "x": 2026,
        "y": 220,
        "category": "pruning"
      },
      {
        "id": "hinton_kd",
        "x": 2015,
        "y": 400,
        "category": "distillation"
      },
      {
        "id": "distilbert",
        "x": 2019,
        "y": 400,
        "category": "distillation"
      },
      {
        "id": "tinybert",
        "x": 2020,
        "y": 400,
        "category": "distillation"
      },
      {
        "id": "minillm",
        "x": 2024,
        "y": 400,
        "category": "distillation"
      },
      {
        "id": "activeprune",
        "x": 2026,
        "y": 400,
        "category": "distillation"
      },
      {
        "id": "longformer",
        "x": 2020,
        "y": 550,
        "category": "sparsity_deploy"
      },
      {
        "id": "bigbird",
        "x": 2020,
        "y": 580,
        "category": "sparsity_deploy"
      },
      {
        "id": "nm_sparsity",
        "x": 2021,
        "y": 550,
        "category": "sparsity_deploy"
      },
      {
        "id": "permllm",
        "x": 2026,
        "y": 550,
        "category": "sparsity_deploy"
      },
      {
        "id": "gigamoe",
        "x": 2026,
        "y": 520,
        "category": "sparsity_deploy"
      },
      {
        "id": "hierasparse",
        "x": 2026,
        "y": 580,
        "category": "sparsity_deploy"
      }
    ],
    "edges": [
      {
        "from": "qat",
        "to": "smoothquant",
        "label": "离群值优化"
      },
      {
        "from": "qat",
        "to": "efficientqat",
        "label": "效率提升"
      },
      {
        "from": "gptq",
        "to": "awq",
        "label": "激活感知"
      },
      {
        "from": "gptq",
        "to": "spinquant",
        "label": "旋转变换"
      },
      {
        "from": "gptq",
        "to": "sparsegpt",
        "label": "跨域迁移"
      },
      {
        "from": "awq",
        "to": "abq_llm",
        "label": "任意比特"
      },
      {
        "from": "lottery_ticket",
        "to": "movement_pruning",
        "label": "动态剪枝"
      },
      {
        "from": "movement_pruning",
        "to": "replaceme",
        "label": "深度剪枝"
      },
      {
        "from": "sparsegpt",
        "to": "saap",
        "label": "结构感知"
      },
      {
        "from": "saap",
        "to": "vitcop",
        "label": "多模态协同"
      },
      {
        "from": "hinton_kd",
        "to": "distilbert",
        "label": "预训练蒸馏"
      },
      {
        "from": "distilbert",
        "to": "tinybert",
        "label": "多层蒸馏"
      },
      {
        "from": "tinybert",
        "to": "minillm",
        "label": "LLM蒸馏"
      },
      {
        "from": "minillm",
        "to": "activeprune",
        "label": "主动学习"
      },
      {
        "from": "longformer",
        "to": "bigbird",
        "label": "随机注意力"
      },
      {
        "from": "bigbird",
        "to": "hierasparse",
        "label": "分层稀疏"
      },
      {
        "from": "nm_sparsity",
        "to": "permllm",
        "label": "通道排列"
      },
      {
        "from": "nm_sparsity",
        "to": "gigamoe",
        "label": "MoE结合"
      }
    ],
    "milestones": [
      {
        "id": "hinton_kd",
        "year": 2015,
        "description": "奠定知识蒸馏理论基础，开创模型压缩新范式"
      },
      {
        "id": "gptq",
        "year": 2023,
        "description": "首个支持LLM的高效后训练量化，推动大模型压缩普及"
      },
      {
        "id": "permllm",
        "year": 2026,
        "description": "可学习稀疏模式，标志N:M稀疏进入软件定义时代"
      }
    ]
  },
  "algos": [
    {
      "id": "qat",
      "num": 1,
      "name": "QAT",
      "fullName": "量化感知训练 (Quantization-Aware Training)",
      "year": "2018",
      "org": "Google",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1712.05877",
      "projectUrl": "",
      "category": "quantization",
      "motivation": "引入伪量化节点模拟训练中量化误差",
      "summary": "QAT 提出了一套完整的量化感知训练框架：在训练前向传播中插入模拟量化（fake quantization）节点来模拟定点推理的精度损失，配合 Batch Normalization 折叠和 Straight-Through Estimator 反向传播，使得量化后的模型可以在纯整数算术硬件上高效推理，同时将精度损失控制在极小范围内。",
      "keyPoints": [
        "<strong>仿射量化方案</strong>：采用 \\(r = S(q - Z)\\) 的非对称量化映射，权重和激活量化为 8-bit 整数，bias 量化为 32-bit 整数",
        "<strong>纯整数推理</strong>：矩阵乘法完全在整数域完成，唯一的浮点操作是一个预计算的定点乘数 \\(M = S_1 S_2 / S_3\\)，通过定点乘法实现",
        "<strong>模拟量化训练（Fake Quantization）</strong>：前向传播中插入 fake_quant 节点模拟量化误差，反向传播使用 STE（Straight-Through Estimator）直通梯度",
        "<strong>量化范围确定</strong>：权重使用逐层 min/max，激活使用 EMA（指数移动平均）跟踪运行范围",
        "<strong>BN 折叠量化</strong>：训练时模拟推理阶段的 BN 折叠效果，对折叠后的等效权重进行量化",
        "<strong>训练 Warmup</strong>：训练初期（50K~2M 步）禁用激活量化，先让网络收敛到合理范围再引入量化噪声",
        "<strong>实验覆盖广泛</strong>：在 ResNet、InceptionV3、MobileNet 上验证，涵盖分类（ImageNet）、检测（COCO）、人脸检测等任务"
      ],
      "detail": "<p><img alt=\"QAT 量化感知训练流程\" src=\"https://arxiv.org/html/1712.05877v1/extracted/figures/training_graph.png\" />\n<em>图：QAT 训练与推理流程对比。训练时在浮点权重/激活后插入 fake_quant 节点模拟量化；推理时将权重直接量化为整数，所有计算在整数域完成。</em></p>\n<pre><code class=\"language-python\"># QAT 核心训练流程伪代码 (Algorithm 1)\n# Phase 1: 构建训练图\nfloat_graph = build_model()                    # 构建浮点模型\nfor layer in float_graph.layers:\n    # 在权重后插入 fake_quant 节点\n    layer.weight = fake_quantize(layer.weight, n_bits=8)\n    # 在激活后插入 fake_quant 节点\n    layer.activation = fake_quantize(layer.activation, n_bits=8)\n\n# Phase 2: 训练（前向模拟量化，反向 STE）\nfor step in range(total_steps):\n    if step &lt; warmup_steps:\n        disable_activation_quantization()       # 初期禁用激活量化\n    else:\n        enable_activation_quantization()\n    loss = forward_with_fake_quant(batch)\n    loss.backward()                             # STE: 梯度直通 fake_quant 节点\n    optimizer.step()\n\n# Phase 3: 导出推理图\nfor layer in float_graph.layers:\n    layer.weight = quantize_to_int8(layer.weight)  # 真正量化为整数\n    layer.bn = fold_into_weight(layer.bn)           # BN 折叠\n# 推理时所有计算在 int8/int32 域完成\n</code></pre>\n<p><strong>动机与背景</strong></p>\n<p>深度神经网络在移动端和嵌入式设备上的部署面临两大挑战：（1）模型体积大，内存受限；（2）浮点运算慢，能耗高。量化（Quantization）将 32-bit 浮点参数压缩为 8-bit 或更低位宽的整数，可以同时解决存储和计算效率问题。然而，直接对训练好的模型进行 Post-Training Quantization（PTQ）往往导致显著的精度损失，尤其是对 MobileNet 等轻量模型。QAT 的核心思想是：<strong>在训练过程中就模拟量化带来的精度损失，让模型学会适应量化噪声</strong>。</p>\n<p><strong>核心机制一：仿射量化方案</strong></p>\n<p>论文采用仿射（非对称）量化，将实数值 \\(r\\) 映射到整数 \\(q\\)：</p>\n<p>$$r = S(q - Z)$$</p>\n<p>其中 \\(S\\)（scale）和 \\(Z\\)（zero-point）由数据范围决定：</p>\n<p>$$S = \\frac{r_{\\max} - r_{\\min}}{q_{\\max} - q_{\\min}}, \\quad Z = \\text{round}\\left(q_{\\min} - \\frac{r_{\\min}}{S}\\right)$$</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：zero-point \\(Z\\) 是整数，确保实数 0.0 可以被精确表示为某个量化值。这对 ReLU 激活（大量零值）和 zero-padding 至关重要，避免了系统性偏差。</div>\n<p>权重量化到 \\([-127, 127]\\)（int8，排除 -128 以保持对称性），激活量化到 \\([0, 255]\\)（uint8，因 ReLU 后非负）。</p>\n<p><strong>核心机制二：纯整数矩阵乘法</strong></p>\n<p>两个量化矩阵相乘时，展开仿射映射后得到：</p>\n<p>$$q_3^{(i,k)} \\approx Z_3 + M \\sum_{j=1}^{N} \\left(q_1^{(i,j)} - Z_1\\right)\\left(q_2^{(j,k)} - Z_2\\right)$$</p>\n<p>其中 \\(M = \\frac{S_1 \\cdot S_2}{S_3}\\) 是唯一需要浮点的部分。论文的关键洞察是：\\(M\\) 总在 \\((0, 1)\\) 区间内，可以表示为 \\(M = 2^{-n} M_0\\)，其中 \\(M_0 \\in [0.5, 1)\\) 用定点整数乘法实现，\\(2^{-n}\\) 用位移实现。这样<strong>整个推理过程完全在整数域完成</strong>。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：Bias 使用 int32 量化，其 scale 为 \\(S_{\\text{bias}} = S_1 \\cdot S_2\\)，zero-point 为 0。由于累加器本身就是 int32，bias 加法无额外开销。</div>\n<p><strong>核心机制三：模拟量化训练（Fake Quantization）</strong></p>\n<p>训练时不真正将权重转为整数，而是在浮点域模拟量化-反量化过程：</p>\n<p>$$\\text{clamp}(r; a, b) = \\min(\\max(r, a), b)$$</p>\n<p>$$s = \\frac{b - a}{n - 1}$$</p>\n<p>$$q(r; a, b, n) = \\left\\lfloor \\frac{\\text{clamp}(r; a, b) - a}{s} \\right\\rceil \\cdot s + a$$</p>\n<p>其中 \\(a, b\\) 是量化范围，\\(n\\) 是量化级数（8-bit 时 \\(n = 2^8 = 256\\)），\\(\\lfloor \\cdot \\rceil\\) 表示四舍五入。这个操作将浮点值\"snap\"到最近的量化格点上，模拟了量化引入的舍入误差。</p>\n<p>反向传播时，由于 round 操作不可导，使用 <strong>Straight-Through Estimator（STE）</strong>：在 \\([a, b]\\) 范围内梯度直通（即 \\(\\frac{\\partial q}{\\partial r} = 1\\)），范围外梯度为零（clamp 的效果）。</p>\n<p><strong>量化范围确定策略</strong>：\n- <strong>权重</strong>：每层使用当前 batch 的 \\(\\min(w)\\) 和 \\(\\max(w)\\)，训练中动态更新\n- <strong>激活</strong>：使用 EMA 跟踪运行统计量的范围，平滑因子接近 1（如 0.999），避免单 batch 异常值影响</p>\n<p><strong>核心机制四：Batch Normalization 折叠</strong></p>\n<p>推理时 BN 层会被折叠进卷积权重以减少计算。训练时必须模拟这一折叠效果，否则训练和推理的量化行为不一致。折叠后的等效权重为：</p>\n<p>$$w_{\\text{fold}} = \\frac{\\gamma \\cdot w}{\\sqrt{\\text{EMA}(\\sigma_B^2) + \\epsilon}}$$</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：分母使用的是 BN 的 EMA 统计量（而非当前 batch 统计量），这样折叠后的权重变化更平滑，有利于训练稳定性。训练时对 \\(w_{\\text{fold}}\\) 进行 fake quantization，确保量化行为与推理一致。</div>\n<p><strong>训练 Warmup 策略</strong></p>\n<p>论文发现，在训练初期直接引入量化噪声会导致收敛困难。因此采用延迟量化策略：\n- 前 50K~2M 步（视模型大小而定）仅做正常浮点训练\n- 之后再开启激活的 fake quantization\n- 权重量化通常从一开始就启用（因为权重分布相对稳定）</p>\n<p><strong>实验结果与对比</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>任务</th>\n<th>Float 精度</th>\n<th>Int8 精度</th>\n<th>精度损失</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>ResNet-50</td>\n<td>ImageNet Top-1</td>\n<td>76.4%</td>\n<td>74.9%</td>\n<td>-1.5%</td>\n</tr>\n<tr>\n<td>ResNet-150</td>\n<td>ImageNet Top-1</td>\n<td>78.8%</td>\n<td>76.7%</td>\n<td>-2.1%</td>\n</tr>\n<tr>\n<td>InceptionV3 (ReLU6)</td>\n<td>ImageNet Top-1</td>\n<td>78.4%</td>\n<td>75.4%</td>\n<td>-3.0%</td>\n</tr>\n<tr>\n<td>InceptionV3 (ReLU6, 7-bit)</td>\n<td>ImageNet Top-1</td>\n<td>78.4%</td>\n<td>75.0%</td>\n<td>-3.4%</td>\n</tr>\n<tr>\n<td>MobileNet SSD (DM=100%)</td>\n<td>COCO mAP</td>\n<td>22.1</td>\n<td>21.7</td>\n<td>-1.8%</td>\n</tr>\n<tr>\n<td>MobileNet SSD (DM=50%)</td>\n<td>COCO mAP</td>\n<td>16.7</td>\n<td>16.6</td>\n<td>-0.6%</td>\n</tr>\n</tbody>\n</table></div>\n<p>与同期方法对比（ResNet-50 ImageNet Top-1）：BWN 68.7%、TWN 72.5%、INQ 74.8%、FGQ 70.8%，本文方法 <strong>74.9%</strong> 在 8-bit 量化中达到最优。</p>\n<p><strong>延迟收益</strong>：在 Qualcomm Snapdragon 835 上，量化 MobileNet 在相同延迟预算下精度提升约 <strong>10%</strong>（LITTLE 核心，33ms 实时约束下）。COCO 检测任务中延迟降低高达 <strong>50%</strong>（370ms → 272ms，big 核心）。人脸检测中实现约 <strong>2× 加速</strong>，25% DM 模型从 23fps 提升到 36fps 达到实时。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：论文主张不应仅关注\"给定模型的量化精度损失\"，而应关注<strong>延迟-精度权衡曲线</strong>。量化后可以使用更大的模型在相同延迟下获得更高精度，这比单纯比较同一模型的精度损失更有实际意义。</div>\n<p><strong>与传统 PTQ 方法的区别</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>Post-Training Quantization (PTQ)</th>\n<th>QAT（本文）</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>训练开销</td>\n<td>无需重训练</td>\n<td>需要完整训练流程</td>\n</tr>\n<tr>\n<td>精度损失</td>\n<td>较大（尤其轻量模型）</td>\n<td>极小</td>\n</tr>\n<tr>\n<td>BN 处理</td>\n<td>推理时直接折叠</td>\n<td>训练时模拟折叠后量化</td>\n</tr>\n<tr>\n<td>范围确定</td>\n<td>校准集统计</td>\n<td>EMA 动态跟踪</td>\n</tr>\n<tr>\n<td>适用场景</td>\n<td>大模型、精度不敏感</td>\n<td>轻量模型、精度敏感</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "QAT 训练中使用 Straight-Through Estimator (STE) 的原因是什么？",
        "options": [
          "加速训练收敛",
          "round 操作不可导，STE 让梯度在量化范围内直通以实现反向传播",
          "减少模型参数量",
          "避免 Batch Normalization 折叠带来的数值不稳定"
        ],
        "answer": 1,
        "explain": "fake quantization 中的 round 操作导数几乎处处为零，无法传递梯度。STE 在量化范围 [a,b] 内将梯度直通（视为恒等映射），范围外梯度置零，从而使训练可以正常进行。"
      }
    },
    {
      "id": "gptq",
      "num": 2,
      "name": "GPTQ",
      "fullName": "生成式预训练量化 (GPTQ)",
      "year": "2023",
      "org": "ISTA",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2210.17323",
      "projectUrl": "",
      "category": "quantization",
      "motivation": "基于Hessian的二阶近似实现极速PTQ",
      "summary": "GPTQ 的核心目标是：基于Hessian的二阶近似实现极速PTQ。",
      "keyPoints": [
        "核心动机：基于Hessian的二阶近似实现极速PTQ",
        "代表机构：ISTA"
      ],
      "detail": "<p>基于Hessian的二阶近似实现极速PTQ</p>"
    },
    {
      "id": "awq",
      "num": 3,
      "name": "AWQ",
      "fullName": "激活感知权重量化 (AWQ)",
      "year": "2024",
      "org": "MIT",
      "parent": "gptq",
      "paperUrl": "https://arxiv.org/abs/2306.00978",
      "projectUrl": "",
      "category": "quantization",
      "motivation": "保护1%显著权重通过激活感知缩放",
      "summary": "AWQ 通过观察激活分布识别 1% 的关键权重通道，利用 per-channel scaling（而非混合精度）在量化前放大这些通道的有效位宽，仅需网格搜索一个超参 $\\alpha$ 即可在 INT3/INT4 下取得优于 GPTQ 的精度，且天然泛化到指令微调模型和视觉语言模型。",
      "keyPoints": [
        "<strong>核心观察</strong>：LLM 权重中存在约 1% 的 salient channels，其重要性由<strong>激活幅度</strong>（而非权重幅度）决定；跳过这 1% 的量化即可大幅恢复精度（OPT-6.7B INT3 PPL 从 43.2 降至 13.0）",
        "<strong>关键创新</strong>：用 per-channel scaling $\\mathbf{s} = \\mathbf{s}_X^\\alpha$ 在量化前放大 salient channels，等价地缩小量化相对误差，避免了混合精度的硬件不友好问题",
        "<strong>无需训练</strong>：不依赖反向传播或逐层重建，仅在校准集上测量平均激活幅度 + 网格搜索 $\\alpha \\in [0,1]$（grid size=20），极度数据高效（16 条序列即可）",
        "<strong>泛化性强</strong>：不过拟合校准集分布，跨域 PPL 仅增 0.5-0.6（GPTQ 增 2.3-4.9）；首次成功量化 VLM（OpenFlamingo-9B、LLaVA-13B）",
        "<strong>系统加速</strong>：TinyChat 推理引擎在 INT4 下实现 3.2-3.3× speedup over HF FP16；Llama-2-70B 可部署在单块 Jetson Orin 64GB 上"
      ],
      "detail": "<h5>方法概览</h5>\n<p><img alt=\"AWQ 方法示意图\" src=\"https://arxiv.org/html/2306.00978v2/x1.png\" /></p>\n<p><strong>Figure 1</strong>：左图为直接 RTN 量化（PPL=43.2），中图为保留 1% salient weights 为 FP16（PPL=13.0，但硬件不友好），右图为 AWQ per-channel scaling 方案（PPL 接近混合精度，且硬件友好）。</p>\n<h5>算法伪代码</h5>\n<pre><code>Algorithm: AWQ — Activation-aware Weight Quantization\nInput: 预训练权重 W ∈ R^{c_o × c_i}, 校准集激活 X ∈ R^{c_i × T}\nOutput: 量化后权重 Q(W')\n\n1. 计算每通道激活均值: s_X(j) = mean(|X[j,:]|)   // j = 1..c_i\n2. 网格搜索最优 α:\n   for α in linspace(0, 1, 20):\n       s = s_X^α                          // per-channel scaling factor\n       W' = W · diag(s)                    // 放大 salient channels\n       X' = diag(s⁻¹) · X                 // 等价缩小输入（数学恒等）\n       loss(α) = ||Q(W') · X' - W · X||   // 量化误差（MSE）\n3. α* = argmin loss(α)\n4. s* = s_X^{α*}\n5. 返回 Q(W · diag(s*))，推理时输入乘 diag(s*⁻¹) 或融合到前层\n</code></pre>\n<h5>数学推导</h5>\n<p><strong>量化误差分析</strong>：对权重组 $\\mathbf{w}$，量化函数为：</p>\n<p>$$Q(\\mathbf{w}) = \\Delta \\cdot \\text{Round}\\!\\left(\\frac{\\mathbf{w}}{\\Delta}\\right), \\quad \\Delta = \\frac{\\max(|\\mathbf{w}|)}{2^{N-1}}$$</p>\n<p>输出误差为 $\\text{Err}(Q(\\mathbf{w})) = \\Delta \\cdot \\text{RoundErr}!\\left(\\frac{\\mathbf{w}}{\\Delta}\\right) \\cdot \\mathbf{x}$。</p>\n<p><strong>Scaling 的作用</strong>：对第 $j$ 个输入通道乘以缩放因子 $s_j &gt; 1$，权重变为 $w_j \\cdot s_j$，输入变为 $x_j / s_j$（数学恒等变换）。量化误差变为：</p>\n<p>$$\\text{Err}(w_j \\cdot s_j) \\cdot \\frac{x_j}{s_j} \\approx \\frac{\\Delta}{s_j} \\cdot \\text{RoundErr} \\cdot x_j$$</p>\n<p>即 salient channel 的量化误差被缩小了 $s_j$ 倍。但 $s_j$ 过大会增大 $\\Delta$（因为 $\\max(|\\mathbf{w}|)$ 变大），损害非 salient channels。因此需要搜索最优 $\\alpha$：</p>\n<p>$$\\alpha^* = \\arg\\min_{\\alpha \\in [0,1]} \\; \\mathcal{L}(\\alpha) = \\left\\| Q\\!\\left(\\mathbf{W} \\cdot \\text{diag}(\\mathbf{s}_X^\\alpha)\\right) \\left(\\text{diag}(\\mathbf{s}_X^{-\\alpha}) \\cdot \\mathbf{X}\\right) - \\mathbf{W}\\mathbf{X} \\right\\|$$</p>\n<p><strong>Weight Clipping</strong>：在 scaling 基础上，进一步对权重做 clipping 以缩小 $\\Delta$：</p>\n<p>$$\\Delta' = \\frac{\\text{clip}(\\max(|\\mathbf{w}|), \\; \\beta)}{2^{N-1}}, \\quad \\beta < \\max(|\\mathbf{w}|)$$</p>\n<p>Clipping 牺牲离群值精度换取整体更小的量化步长。</p>\n<h5>与 GPTQ 的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>AWQ</th>\n<th>GPTQ</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>核心思路</strong></td>\n<td>激活感知 per-channel scaling</td>\n<td>基于 Hessian 的逐列权重重建</td>\n</tr>\n<tr>\n<td><strong>是否需要反向传播</strong></td>\n<td>❌ 不需要</td>\n<td>❌ 不需要（但需要逐层矩阵分解）</td>\n</tr>\n<tr>\n<td><strong>校准数据量</strong></td>\n<td>极少（16 条序列即可）</td>\n<td>较多（128-192 条序列）</td>\n</tr>\n<tr>\n<td><strong>过拟合风险</strong></td>\n<td>低（仅测量激活均值）</td>\n<td>高（重建过拟合校准集分布）</td>\n</tr>\n<tr>\n<td><strong>跨域泛化</strong></td>\n<td>PPL 仅增 0.5-0.6</td>\n<td>PPL 增 2.3-4.9</td>\n</tr>\n<tr>\n<td><strong>VLM/指令微调支持</strong></td>\n<td>✅ 首次成功</td>\n<td>⚠️ 泛化性差</td>\n</tr>\n<tr>\n<td><strong>INT3 LLaMA-7B PPL</strong></td>\n<td>6.35</td>\n<td>8.81（需 reorder 降至 6.53）</td>\n</tr>\n<tr>\n<td><strong>INT4 LLaMA-65B PPL</strong></td>\n<td>3.62</td>\n<td>3.66</td>\n</tr>\n<tr>\n<td><strong>推理加速</strong></td>\n<td>3.2-3.3× (TinyChat)</td>\n<td>需额外 kernel 支持</td>\n</tr>\n</tbody>\n</table></div>\n<h5>关键实验结果</h5>\n<p><strong>语言模型量化</strong>（WikiText-2 PPL↓）：\n- INT4-g128 LLaMA-65B：AWQ <strong>3.62</strong> vs GPTQ 3.66 vs RTN 3.67（FP16=3.53）\n- INT3-g128 Llama-2-70B：AWQ <strong>3.74</strong> vs GPTQ 3.88 vs RTN 3.98（FP16=3.32）\n- AWQ 在所有模型规模（7B-70B）和所有位宽（INT3/INT4）上一致优于 GPTQ</p>\n<p><strong>视觉语言模型</strong>（OpenFlamingo-9B COCO CIDEr↑）：\n- INT4-g128 32-shot：AWQ <strong>80.53</strong> vs RTN 77.13 vs GPTQ 74.98（FP16=81.70）\n- AWQ 将量化退化从 -4.57 降至 <strong>-1.17</strong>，实现 4× 压缩近乎无损</p>\n<p><strong>系统效率</strong>：\n- TinyChat INT4 推理：3.2-3.3× speedup over HF FP16\n- Llama-2-13B 在笔记本 RTX 4070 (8GB) 上达到 30 tokens/s\n- Llama-2-70B 可部署在 NVIDIA Jetson Orin (64GB)</p>\n<p><img alt=\"AWQ 校准效率与泛化性\" src=\"https://arxiv.org/html/2306.00978v2/x6.png\" /></p>\n<p><strong>Figure 6</strong>：左图显示 AWQ 仅需 16 条序列即可达到 GPTQ 192 条序列的精度；右图显示 AWQ 跨域校准仅增 0.5-0.6 PPL，而 GPTQ 增 2.3-4.9。</p>",
      "quiz": {
        "q": "AWQ 确定 salient weights 的依据是什么？",
        "options": {
          "A": "权重的 L2 范数大小",
          "B": "对应输入激活通道的平均幅度",
          "C": "权重梯度的大小",
          "D": "Hessian 矩阵的对角元素"
        },
        "answer": 1,
        "explain": ""
      }
    },
    {
      "id": "smoothquant",
      "num": 4,
      "name": "SmoothQuant",
      "fullName": "平滑量化 (SmoothQuant)",
      "year": "2023",
      "org": "MIT/NVIDIA",
      "parent": "qat",
      "paperUrl": "http://proceedings.mlr.press/v202/xiao23c.html",
      "projectUrl": "",
      "category": "quantization",
      "motivation": "将激活量化难度平滑转移至权重",
      "summary": "SmoothQuant 的核心目标是：将激活量化难度平滑转移至权重。",
      "keyPoints": [
        "核心动机：将激活量化难度平滑转移至权重",
        "演化来源：继承或改进自 qat",
        "代表机构：MIT/NVIDIA"
      ],
      "detail": "<p>将激活量化难度平滑转移至权重</p>"
    },
    {
      "id": "abq_llm",
      "num": 5,
      "name": "ABQ-LLM",
      "fullName": "任意比特量化 (Arbitrary-Bit Quantization)",
      "year": "2025",
      "org": "中科大",
      "parent": "awq",
      "paperUrl": "https://ojs.aaai.org/index.php/AAAI/article/view/34385",
      "projectUrl": "",
      "category": "quantization",
      "motivation": "实现任意比特量化推理加速",
      "summary": "ABQ-LLM 的核心目标是：实现任意比特量化推理加速。",
      "keyPoints": [
        "核心动机：实现任意比特量化推理加速",
        "演化来源：继承或改进自 awq",
        "代表机构：中科大"
      ],
      "detail": "<p>实现任意比特量化推理加速</p>"
    },
    {
      "id": "spinquant",
      "num": 6,
      "name": "SpinQuant",
      "fullName": "旋转量化 (SpinQuant)",
      "year": "2025",
      "org": "Meta",
      "parent": "gptq",
      "paperUrl": "https://proceedings.iclr.cc/paper_files/paper/2025/hash/e5b1c0d4866f72393c522c8a00eed4eb-Abstract-Conference.html",
      "projectUrl": "",
      "category": "quantization",
      "motivation": "学习旋转矩阵减少量化误差",
      "summary": "SpinQuant 提出在 Transformer 的四个旋转不变位置插入可学习的正交旋转矩阵，通过 Cayley SGD 在 Stiefel 流形上优化旋转参数以消除激活/权重中的离群值，使 W4A4KV4 量化在 LLaMA-2 7B 上仅损失 2.9 个百分点精度，大幅超越 SmoothQuant、LLM-QAT 和 QuaRot 等方法。",
      "keyPoints": [
        "<strong>旋转不变性</strong>：识别 Transformer 中 4 个可插入正交旋转矩阵且不改变全精度输出的位置（残差流 \\(R_1\\)、注意力头 \\(R_2\\)、Query/Key \\(R_3\\)、FFN 下投影 \\(R_4\\)）",
        "<strong>随机旋转方差大</strong>：不同随机旋转矩阵导致量化后零样本推理精度差异高达 13 个百分点",
        "<strong>Cayley SGD 优化</strong>：在 Stiefel 流形上用 Cayley 变换优化 \\(R_1, R_2\\)，仅需 100 次迭代、800 个 WikiText2 样本、约 1.3 小时（7B 模型，单 A100）",
        "<strong>极低额外参数</strong>：优化的旋转矩阵仅占模型权重的 0.26%，且可吸收进相邻权重矩阵，无推理开销（\\(R_3, R_4\\) 使用在线 Hadamard 变换）",
        "<strong>兼容 GPTQ</strong>：可与 GPTQ 权重量化联合使用，进一步提升精度",
        "<strong>SOTA 结果</strong>：W4A4KV4 下 LLaMA-2 7B 仅 2.9pt gap（vs LLM-QAT 22pt, SmoothQuant 27pt）；LLaMA-3 70B 仅 4.4pt gap"
      ],
      "detail": "<h5>核心框架图</h5>\n<p><img alt=\"SpinQuant 旋转位置示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2405.16406v3/assets/x1.png\" />\n<em>图：SpinQuant 在 Transformer 块中的四个旋转插入位置。\\(R_1\\) 作用于残差流，\\(R_2\\) 作用于注意力输出，\\(R_3\\) 作用于 Q/K 向量，\\(R_4\\) 作用于 FFN 下投影层输入。其中 \\(R_1, R_2\\) 可吸收进权重矩阵（离线），\\(R_3, R_4\\) 需在线计算（使用高效 Hadamard 变换）。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># SpinQuant 旋转矩阵优化流程\n# 输入: 预训练LLM权重 W, 校准集 D (800 samples from WikiText2)\n# 输出: 优化后的旋转矩阵 R1, R2\n\n# Step 1: 初始化旋转矩阵为随机 Hadamard 矩阵\nR1 = random_hadamard(D_token, D_token)       # 残差流旋转\nR2 = {l: random_hadamard(D_head, D_head)      # 每层每头的注意力旋转\n       for l in range(num_layers)}\nR3 = hadamard(D_head)                         # Q/K 旋转 (固定, 在线)\nR4 = hadamard(D_intermediate)                 # FFN 旋转 (固定, 在线)\n\n# Step 2: 将 R1, R2 吸收进权重 (不改变全精度输出)\nW_rotated = absorb_rotations(W, R1, R2)\n\n# Step 3: Cayley SGD 优化 (在 Stiefel 流形上)\nfor iteration in range(100):\n    # 前向传播: 对旋转后的权重和激活进行量化\n    loss = 0\n    for batch in calibration_loader(D):\n        # 量化权重和激活 (仅量化激活用于优化, 权重量化交给GPTQ)\n        output = quantized_forward(W_rotated, batch, R3, R4)\n        loss += cross_entropy(output, batch.labels)\n\n    # 计算梯度并用 Cayley 变换更新\n    grad = compute_gradient(loss, R1, R2)\n    # Cayley 更新: R' = (I + η/2 · A)^{-1} (I - η/2 · A) R\n    # 其中 A = grad @ R^T - R @ grad^T (反对称矩阵)\n    R1 = cayley_update(R1, grad_R1, lr=1.5 * (1 - iteration/100))\n    R2 = cayley_update(R2, grad_R2, lr=1.5 * (1 - iteration/100))\n\n    # 重新吸收旋转进权重\n    W_rotated = absorb_rotations(W, R1, R2)\n\n# Step 4: 最终量化 (可选配合 GPTQ)\nmodel_quantized = quantize(W_rotated, method=&quot;RTN_or_GPTQ&quot;, bits=4)\n</code></pre>\n<h5>动机与背景</h5>\n<p><strong>离群值问题</strong>：LLM 的激活和权重中存在少量极端离群值（outliers），这些值拉伸了量化范围，导致大部分正常值只能使用很少的有效比特表示，造成严重的量化误差。例如，直接对 LLaMA-2 7B 进行 W4A4 RTN 量化，零样本精度从 66.9% 暴跌至 37.1%。</p>\n<p><strong>随机旋转的局限</strong>：QuIP 和 QuaRot 等工作发现，对权重/激活矩阵乘以随机正交矩阵可以统计性地\"打散\"离群值，使分布更均匀。然而 SpinQuant 的关键发现是：<strong>不同的随机旋转矩阵之间存在巨大的性能差异</strong>——在 LLaMA-2 7B W4A4KV4 设置下，100 个随机种子的零样本精度范围从约 53% 到 66%，差距高达 13 个百分点。这意味着随机选择旋转矩阵是一种\"碰运气\"的做法。</p>\n<h5>核心机制：四个旋转位置</h5>\n<p>SpinQuant 系统性地识别了 Transformer 中四个满足<strong>旋转不变性</strong>的位置，即插入正交矩阵 \\(R\\)（满足 \\(RR^T = I\\)）后不改变全精度网络的输出：</p>\n<p><strong>\\(R_1\\) — 残差流旋转（Residual Rotation）</strong></p>\n<p>在每个 Transformer 块的残差连接处插入旋转。由于 RMSNorm 对旋转不变（\\(\\text{RMSNorm}(Rx) = R \\cdot \\text{RMSNorm}(x)\\)），可以将 \\(R_1\\) 吸收进相邻的线性层权重中：</p>\n<p>$$W'_{\\text{proj}} = W_{\\text{proj}} \\cdot R_1^T, \\quad W'_{\\text{out}} = R_1 \\cdot W_{\\text{out}}$$</p>\n<p>这样 \\(R_1\\) 不引入任何推理开销。\\(R_1\\) 的维度为 \\(D_{\\text{token}} \\times D_{\\text{token}}\\)（如 LLaMA-2 7B 为 4096×4096）。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：\\(R_1\\) 同时改变了输入到注意力层和 FFN 层的激活分布，以及所有投影矩阵的权重分布，是影响最大的旋转位置。</div>\n<p><strong>\\(R_2\\) — 注意力头内旋转（MHSA Rotation）</strong></p>\n<p>在每个注意力头的 Value 投影和 Output 投影之间插入逐头旋转矩阵。由于 \\(V \\cdot R_2^T\\) 和 \\(R_2 \\cdot W_O\\) 可以分别吸收进 \\(W_V\\) 和 \\(W_O\\)，同样无推理开销。维度为 \\(D_{\\text{head}} \\times D_{\\text{head}}\\)（如 128×128），每层独立学习。</p>\n<p><strong>\\(R_3\\) — Query/Key Hadamard 旋转</strong></p>\n<p>对 Query 和 Key 向量在每个头内施加 Hadamard 变换。由于 RoPE 位置编码的存在，\\(R_3\\) 无法吸收进权重（RoPE 对非对角旋转不不变），必须在线计算。但 Hadamard 变换的计算复杂度仅为 \\(O(d \\log d)\\)，开销极小。</p>\n<p><strong>\\(R_4\\) — FFN 下投影 Hadamard 旋转</strong></p>\n<p>在 FFN 的 Gate/Up 投影输出与 Down 投影输入之间插入 Hadamard 变换。由于 SiLU 激活函数的非线性，\\(R_4\\) 同样无法吸收进权重，需在线计算。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：\\(R_1, R_2\\) 通过 Cayley SGD 优化学习；\\(R_3, R_4\\) 保持为固定的 Hadamard 矩阵（在线高效计算）。这种设计平衡了优化效果和推理效率。</div>\n<h5>Cayley SGD 优化</h5>\n<p>旋转矩阵必须保持正交性（\\(RR^T = I\\)），这意味着优化空间是 <strong>Stiefel 流形</strong>而非欧氏空间。SpinQuant 采用 Cayley SGD 方法：</p>\n<ol>\n<li>计算欧氏梯度 \\(\\nabla_R \\mathcal{L}\\)</li>\n<li>构造反对称矩阵 \\(A = \\nabla_R \\mathcal{L} \\cdot R^T - R \\cdot (\\nabla_R \\mathcal{L})^T\\)</li>\n<li>通过 Cayley 变换更新：</li>\n</ol>\n<p>$$R' = \\left(I + \\frac{\\eta}{2} A\\right)^{-1} \\left(I - \\frac{\\eta}{2} A\\right) R$$</p>\n<p>这保证了更新后的 \\(R'\\) 仍然是正交矩阵。整个优化过程：\n- 学习率从 1.5 线性衰减到 0\n- 仅 100 次迭代，800 个 WikiText2 校准样本\n- LLaMA-2 7B 约 1.25 小时（8×A100），LLaMA-3 8B 约 1.39 小时\n- 从不同随机种子初始化，优化后的结果方差极小</p>\n<h5>与 GPTQ 的协同</h5>\n<p>SpinQuant 发现一个重要的实践技巧：当同时量化权重和激活时，应<strong>仅针对激活量化误差优化旋转矩阵</strong>（即在 W16A4 设置下优化），然后再用 GPTQ 处理权重量化误差。这种分工策略比同时优化两者效果更好，因为 GPTQ 已经能很好地处理权重量化误差，而旋转矩阵更擅长处理激活分布的不均匀性。</p>\n<h5>实验结果亮点</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>设置</th>\n<th>模型</th>\n<th>SpinQuant</th>\n<th>QuaRot</th>\n<th>LLM-QAT</th>\n<th>FP</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>W4A4KV4</td>\n<td>LLaMA-2 7B</td>\n<td>64.0</td>\n<td>62.5</td>\n<td>44.9</td>\n<td>66.9</td>\n</tr>\n<tr>\n<td>W4A4KV4</td>\n<td>LLaMA-2 13B</td>\n<td>66.9</td>\n<td>66.2</td>\n<td>—</td>\n<td>68.3</td>\n</tr>\n<tr>\n<td>W4A4KV4</td>\n<td>LLaMA-2 70B</td>\n<td>71.2</td>\n<td>70.3</td>\n<td>—</td>\n<td>72.9</td>\n</tr>\n<tr>\n<td>W4A4KV4</td>\n<td>LLaMA-3 8B</td>\n<td>65.2</td>\n<td>63.3</td>\n<td>43.2</td>\n<td>69.6</td>\n</tr>\n<tr>\n<td>W4A4KV4</td>\n<td>LLaMA-3 70B</td>\n<td>69.3</td>\n<td>65.1</td>\n<td>—</td>\n<td>74.5</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键</strong>：SpinQuant 在最具挑战性的 W4A4KV4 设置下，将 LLaMA-2 7B 与全精度的差距缩小到仅 2.9 个百分点，而 LLM-QAT 差距为 22 个百分点，SmoothQuant 差距为 27 个百分点。在 LLaMA-3 70B 上，SpinQuant 将差距从 QuaRot 的 9.4pt 缩小到 5.2pt。</div>\n<h5>各旋转位置的贡献（消融实验）</h5>\n<ul>\n<li><strong>无旋转</strong>：W4A4KV4 精度仅约 38%（几乎不可用）</li>\n<li><strong>仅 \\(R_1\\)</strong>：精度大幅提升，是最重要的单一旋转位置</li>\n<li><strong>\\(R_1 + R_2\\)</strong>：进一步改善注意力层的量化质量</li>\n<li><strong>\\(R_1 + R_2 + R_3 + R_4\\)</strong>（全部）：达到最佳效果</li>\n<li><strong>Cayley 优化 vs 随机</strong>：优化后的旋转比最佳随机旋转（100 种子中最好的）还要好，且方差极小</li>\n</ul>",
      "quiz": {
        "q": "SpinQuant 中为什么 R3（Query/Key 旋转）不能像 R1 那样吸收进权重矩阵？",
        "options": [
          "因为 R3 的维度太大，无法存储",
          "因为 RoPE 位置编码的存在使得旋转无法与权重合并",
          "因为 Query 和 Key 需要不同的旋转矩阵",
          "因为注意力分数的 softmax 操作对旋转不不变"
        ],
        "answer": 1,
        "explain": "RoPE 对每个位置施加不同的旋转，与 R3 不可交换，因此 R3 无法被吸收进 W_Q/W_K 权重中，必须在推理时在线计算。"
      }
    },
    {
      "id": "efficientqat",
      "num": 7,
      "name": "EfficientQAT",
      "fullName": "高效量化感知训练 (EfficientQAT)",
      "year": "2025",
      "org": "北大",
      "parent": "qat",
      "paperUrl": "https://aclanthology.org/2025.acl-long.498/",
      "projectUrl": "",
      "category": "quantization",
      "motivation": "显著降低大模型量化训练资源消耗",
      "summary": "EfficientQAT 的核心目标是：显著降低大模型量化训练资源消耗。",
      "keyPoints": [
        "核心动机：显著降低大模型量化训练资源消耗",
        "演化来源：继承或改进自 qat",
        "代表机构：北大"
      ],
      "detail": "<p>显著降低大模型量化训练资源消耗</p>"
    },
    {
      "id": "lottery_ticket",
      "num": 8,
      "name": "Lottery Ticket",
      "fullName": "彩票假设 (Lottery Ticket Hypothesis)",
      "year": "2019",
      "org": "MIT",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1803.03635",
      "projectUrl": "",
      "category": "pruning",
      "motivation": "发现网络中存在可训练稀疏子网络",
      "summary": "彩票假设提出：随机初始化的稠密网络中存在稀疏子网络（\"中奖彩票\"），这些子网络在使用**原始初始化权重**单独训练时，能以不超过原网络的迭代次数达到相当甚至更优的测试精度，从而揭示了初始化与网络结构的深层耦合关系。",
      "keyPoints": [
        "<strong>彩票假设定义</strong>：稠密随机初始化的前馈网络包含稀疏子网络（winning tickets），单独训练可匹配原网络精度且训练时间相当",
        "<strong>基于幅值的非结构化剪枝</strong>：训练后按权重绝对值大小剪枝，保留幅值最大的连接",
        "<strong>权重回卷（Weight Rewinding）</strong>：剪枝后将存活连接的权重重置为训练前的原始初始化值 \\(\\theta_0\\)，而非保留训练后的值",
        "<strong>迭代剪枝（Iterative Pruning）</strong>：多轮\"训练→剪枝→回卷\"循环，每轮剪去 \\(p^{1/n}\\%\\) 存活权重，比一次性剪枝找到更小的 winning tickets",
        "<strong>初始化的关键性</strong>：随机重新初始化相同结构的子网络无法复现 winning ticket 的性能，证明特定初始化是成功的关键",
        "<strong>实验覆盖</strong>：在 Lenet/MNIST 和 Conv-2/4/6/CIFAR10 上验证，winning tickets 通常仅为原网络 10-20% 的参数量",
        "<strong>学习率敏感性</strong>：在较深网络中，需要学习率预热（warmup）才能成功找到 winning tickets"
      ],
      "detail": "<p><img alt=\"Lottery Ticket 核心实验结果\" src=\"https://ar5iv.labs.arxiv.org/html/1803.03635/assets/x1.png\" />\n<em>图：不同剪枝比例下 winning tickets（实线）与随机稀疏子网络（虚线）的 early-stopping 迭代次数（左）和测试精度（右）对比。Winning tickets 在大幅剪枝后仍能保持甚至超越原网络性能。</em></p>\n<p><img alt=\"网络架构\" src=\"https://ar5iv.labs.arxiv.org/html/1803.03635/assets/x2.png\" />\n<em>图：论文中测试的网络架构，包括 Lenet（全连接）和 Conv-2/4/6（卷积，VGG 变体）。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Lottery Ticket 迭代剪枝算法\n# 输入：网络 f(x; θ)，剪枝轮数 n，总剪枝比例 p%\n# 输出：winning ticket 子网络 f(x; m ⊙ θ_0)\n\nθ_0 = random_init()           # Step 1: 随机初始化\nm = ones(|θ_0|)               # 初始 mask 全为 1\n\nfor round in range(n):\n    θ_j = train(f, m ⊙ θ_0)  # Step 2: 用当前 mask 和原始初始化训练至收敛\n    # Step 3: 按幅值剪枝，每轮剪去存活权重的 p^(1/n)%\n    scores = abs(θ_j) * m\n    threshold = percentile(scores[scores &gt; 0], p ** (1/n))\n    m = m * (scores &gt;= threshold).float()\n    # Step 4: 权重回卷至 θ_0（不保留训练后的权重）\n\n# 最终输出：f(x; m ⊙ θ_0) 即为 winning ticket\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统神经网络剪枝（如 Han et al., 2015; LeCun et al., 1990）已经证明训练好的网络可以在不损失精度的情况下减少 90% 以上的参数。然而，这些方法的标准流程是\"先训练大网络→剪枝→微调\"，剪枝后的稀疏网络依赖训练后的权重作为微调起点。一个自然的问题是：<strong>能否直接从头训练这些小网络？</strong> 当时的经验表明这是困难的——随机初始化的小网络通常无法达到大网络的精度（Li et al., 2016; Han et al., 2015 均有类似观察）。</p>\n<p>彩票假设对这一现象给出了全新的解释：问题不在于小网络本身缺乏容量，而在于<strong>初始化</strong>。稠密网络之所以容易训练，是因为它包含了大量可能的子网络，其中某些子网络恰好获得了\"幸运\"的初始化——这些就是\"中奖彩票\"。</p>\n<h5>核心机制详解</h5>\n<p><strong>形式化定义。</strong> 考虑稠密网络 \\(f(x; \\theta)\\)，初始参数 \\(\\theta = \\theta_0 \\sim \\mathcal{D}_\\theta\\)。通过 SGD 训练后在第 \\(j\\) 次迭代达到最小验证损失 \\(l\\)，测试精度为 \\(a\\)。现在考虑带掩码的子网络 \\(f(x; m \\odot \\theta)\\)，其中 \\(m \\in \\{0,1\\}^{|\\theta|}\\)，初始化为 \\(m \\odot \\theta_0\\)。彩票假设预测存在掩码 \\(m\\) 使得：</p>\n<p>$$j' \\leq j \\quad (\\text{训练时间相当}), \\quad a' \\geq a \\quad (\\text{精度相当}), \\quad \\|m\\|_0 \\ll |\\theta| \\quad (\\text{参数更少})$$</p>\n<p>这一假设的关键在于三个条件同时满足：子网络不仅更小，而且训练速度不慢、精度不低。</p>\n<p><strong>权重回卷的重要性。</strong> 与传统剪枝方法保留训练后权重不同，彩票假设的核心操作是将存活连接的权重<strong>重置为原始初始化值</strong> \\(\\theta_0\\)。这一设计的目的是验证：特定的初始化（而非训练后的权重）才是 winning ticket 成功的根本原因。实验证实，如果对同一子网络结构使用新的随机初始化 \\(\\theta_0' \\sim \\mathcal{D}_\\theta\\)，性能将显著下降，说明结构本身不足以解释 winning ticket 的成功。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：Winning ticket 的成功源于初始化权重与网络结构的特定组合，而非单纯的网络拓扑。这意味着\"哪些连接被保留\"和\"这些连接的初始值是什么\"同等重要。</div>\n<p><strong>一次性剪枝 vs 迭代剪枝。</strong> 一次性剪枝（one-shot）直接训练一次后剪去 \\(p\\%\\) 的权重。迭代剪枝（iterative pruning）将这一过程分为 \\(n\\) 轮，每轮剪去存活权重的 \\(p^{1/n}\\%\\)。例如，若目标剪枝率为 \\(p = 90\\%\\)，分 \\(n = 10\\) 轮，则每轮剪去约 \\(90^{0.1}\\% \\approx 79.4\\%\\) 的存活权重（即保留约 20.6%）。迭代剪枝的优势在于每轮的剪枝决策基于更精确的权重重要性估计，因此能找到更小的 winning tickets。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：迭代剪枝的计算成本很高——需要反复训练网络 \\(n\\) 次以上。这也是该方法的主要局限之一，使其难以直接扩展到 ImageNet 等大规模任务。</div>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方面</th>\n<th>传统剪枝（Han et al., 2015）</th>\n<th>彩票假设</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>目标</strong></td>\n<td>压缩已训练模型</td>\n<td>发现可从头训练的稀疏子网络</td>\n</tr>\n<tr>\n<td><strong>剪枝后权重</strong></td>\n<td>保留训练后的权重，继续微调</td>\n<td>回卷至原始初始化 \\(\\theta_0\\)</td>\n</tr>\n<tr>\n<td><strong>训练流程</strong></td>\n<td>训练→剪枝→微调</td>\n<td>训练→剪枝→回卷→从头训练</td>\n</tr>\n<tr>\n<td><strong>核心发现</strong></td>\n<td>训练后的网络可压缩</td>\n<td>稠密网络中存在可训练的稀疏子网络</td>\n</tr>\n<tr>\n<td><strong>初始化角色</strong></td>\n<td>不关注</td>\n<td>核心——特定初始化是成功关键</td>\n</tr>\n</tbody>\n</table></div>\n<h5>主要实验发现</h5>\n<p>论文在 Lenet（全连接，MNIST）和 Conv-2/4/6（卷积，CIFAR10）上进行了系统实验：</p>\n<ol>\n<li><strong>Winning tickets 普遍存在</strong>：在所有测试架构中，均能找到仅占原网络 10-20% 参数的 winning tickets，且测试精度不低于原网络。</li>\n<li><strong>Winning tickets 学习更快</strong>：在剪枝比例适中时，winning tickets 不仅精度更高，而且收敛速度更快（early-stopping 迭代次数更少）。</li>\n<li><strong>随机重初始化失败</strong>：将 winning ticket 的结构保留但随机重新初始化权重后，性能大幅下降，证明初始化的关键作用。</li>\n<li><strong>迭代剪枝优于一次性剪枝</strong>：迭代剪枝能在更高压缩率下找到有效的 winning tickets。</li>\n<li><strong>学习率敏感性</strong>：在 Conv-4/6 等较深网络中，使用较大学习率时需要 warmup 策略才能成功找到 winning tickets。</li>\n</ol>",
      "quiz": {
        "q": "在彩票假设的实验中，剪枝后对存活连接的权重进行什么操作？",
        "options": [
          "保留训练后的权重值，直接进行推理",
          "将权重重置为原始随机初始化值 θ_0，重新训练",
          "将权重全部设为零，重新训练",
          "用新的随机值重新初始化权重，重新训练"
        ],
        "answer": 1,
        "explain": "彩票假设的核心操作是'权重回卷'——将存活连接的权重重置为训练前的原始初始化值 θ_0，而非保留训练后的权重或重新随机初始化。实验证明正是这些特定的初始化值使得 winning ticket 能够成功训练。"
      }
    },
    {
      "id": "movement_pruning",
      "num": 9,
      "name": "Movement Pruning",
      "fullName": "运动剪枝 (Movement Pruning)",
      "year": "2020",
      "org": "HuggingFace",
      "parent": "lottery_ticket",
      "paperUrl": "https://proceedings.neurips.cc/paper/2020/hash/eae15aabaa768ae4a5993a8a4f4fa6e4-Abstract.html",
      "projectUrl": "",
      "category": "pruning",
      "motivation": "微调中根据权重趋势动态剪枝",
      "summary": "Movement Pruning 的核心目标是：微调中根据权重趋势动态剪枝。",
      "keyPoints": [
        "核心动机：微调中根据权重趋势动态剪枝",
        "演化来源：继承或改进自 lottery_ticket",
        "代表机构：HuggingFace"
      ],
      "detail": "<p>微调中根据权重趋势动态剪枝</p>"
    },
    {
      "id": "sparsegpt",
      "num": 10,
      "name": "SparseGPT",
      "fullName": "稀疏GPT (SparseGPT)",
      "year": "2023",
      "org": "ISTA",
      "parent": "gptq",
      "paperUrl": "https://arxiv.org/abs/2301.00774",
      "projectUrl": "",
      "category": "pruning",
      "motivation": "首个支持千亿参数模型一键剪枝",
      "summary": "SparseGPT 提出了一种基于近似二阶信息的高效逐层剪枝方法，首次实现了对 OPT-175B / BLOOM-176B 等千亿参数大语言模型的一次性（one-shot）剪枝，在单张 A100 GPU 上约 4 小时即可将模型压缩至 50–60% 非结构化稀疏度，且几乎无精度损失。",
      "keyPoints": [
        "<strong>逐层稀疏重建问题</strong>：将全局剪枝分解为逐层最小化 \\(\\|\\mathbf{W}\\mathbf{X} - (\\mathbf{M} \\odot \\hat{\\mathbf{W}})\\mathbf{X}\\|_F^2\\)，避免端到端反向传播",
        "<strong>基于 OBS 的列式贪心剪枝</strong>：按列顺序逐一剪枝，每次利用 Hessian 逆的闭式解更新未剪枝权重以补偿误差",
        "<strong>部分更新（Partial Updates）</strong>：仅更新尚未处理的列子集 \\(U\\)，将更新限制在\"未来\"权重上，保证已剪枝列不被回改",
        "<strong>Hessian 同步</strong>：所有行共享同一 Hessian 逆矩阵 \\((\\mathbf{H}_U)^{-1}\\)，通过 Gaussian Elimination 递推更新，单步 \\(O(d^2)\\)，总复杂度 \\(O(d_{\\text{col}}^3)\\)",
        "<strong>自适应掩码选择</strong>：以 \\(B_s = 128\\) 列为一块，在块内按 OBS 误差排序选择 \\(p\\%\\) 最小权重剪枝，兼顾全局与局部最优",
        "<strong>半结构化 n:m 稀疏</strong>：令 \\(B_s = m\\)（如 \\(m=4\\) 对应 2:4 模式），天然适配 NVIDIA Ampere 硬件加速",
        "<strong>联合稀疏化 + 量化</strong>：在同一遍扫描中同时执行剪枝与权重量化（Eq. 7），50% 稀疏 + 4-bit 优于等存储量的 GPTQ 3-bit",
        "<strong>规模效应</strong>：模型越大越容易剪枝——OPT-175B 在 50% 稀疏度下 ZeroShot 平均精度甚至略高于稠密基线"
      ],
      "detail": "<h5>示意图</h5>\n<p><img alt=\"SparseGPT sparsity-perplexity trade-off on OPT-175B\" src=\"https://arxiv.org/html/2301.00774v4/extracted/5005954/figs/opt-175b.png\" />\n<em>图：OPT-175B 在不同稀疏度下的 WikiText2 困惑度对比。Magnitude Pruning 在 10% 稀疏度即崩溃，SparseGPT 可达 60% 稀疏度仍保持接近稠密基线的困惑度。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># SparseGPT 核心算法（单层）\n# 输入: 权重 W ∈ R^{d_row × d_col}, Hessian H = 2·X·X^T, 目标稀疏度 p%\n# 输出: 稀疏化后的权重 Ŵ\n\nH_inv = cholesky(inverse(H))  # Cholesky 分解 H^{-1}，O(d_col^3)\nE = zeros(d_row, B)           # 误差缓存\n\nfor i in range(0, d_col, B):           # B: lazy batch size (e.g. 128)\n    for j in range(i, i + B, B_s):     # B_s: mask selection block (e.g. 128)\n        # === 自适应掩码选择 ===\n        # 对 W[:, j:j+B_s] 中每个权重计算 OBS 误差 w_jk^2 / [H_inv]_{jk,jk}\n        # 选择误差最小的 p% 权重设为 0 → 得到掩码 M[:, j:j+B_s]\n\n        for k in range(j, j + B_s):    # 逐列处理\n            # === 剪枝 + 权重更新 ===\n            if M[:, k] == 0:           # 该列被剪枝\n                err = W[:, k] / H_inv[k, k]\n            else:\n                err = 0\n            W[:, k] = M[:, k] * W[:, k]  # 应用掩码\n            E[:, k - i] = err\n            # 更新后续列: W[:, k+1:i+B] -= err · H_inv[k, k+1:i+B]\n            W[:, k+1:i+B] -= err.unsqueeze(1) * H_inv[k, k+1:i+B].unsqueeze(0)\n\n    # === Lazy batch 更新 ===\n    # 将累积误差传播到所有未处理列\n    W[:, i+B:] -= E @ H_inv[i:i+B, i+B:]\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统剪枝方法（如 Magnitude Pruning、Lottery Ticket 等）依赖大量重训练（retraining）来恢复精度，而 GPT 规模模型的训练成本极其高昂（OPT-175B 训练需数千 GPU 天），使得这些方法在实践中不可行。</p>\n<p>已有的后训练（post-training）剪枝方法如 AdaPrune 基于 Optimal Brain Surgeon（OBS）框架，虽然不需要重训练，但其复杂度为 \\(O(d_{\\text{row}} \\cdot d_{\\text{col}}^3)\\)——对于 GPT-175B 中 \\(d = 12288\\) 的线性层，单层需约 \\(10^{13}\\) 次运算，完全不可扩展。</p>\n<p>SparseGPT 的核心贡献在于：<strong>将 OBS 剪枝的复杂度从 \\(O(d_{\\text{row}} \\cdot d_{\\text{col}}^3)\\) 降至 \\(O(d_{\\text{col}}^3 + d_{\\text{row}} \\cdot d_{\\text{col}}^2)\\)</strong>，使千亿参数模型的剪枝在单 GPU 上成为可能。</p>\n<h5>核心机制详解</h5>\n<p><strong>1. 逐层稀疏重建问题</strong></p>\n<p>SparseGPT 将全局剪枝分解为独立的逐层子问题。对于每一层，目标是找到稀疏掩码 \\(\\mathbf{M}\\) 和更新后的权重 \\(\\hat{\\mathbf{W}}\\)，最小化：</p>\n<p>$$\\min_{\\mathbf{M}, \\hat{\\mathbf{W}}} \\|\\mathbf{W}\\mathbf{X} - (\\mathbf{M} \\odot \\hat{\\mathbf{W}})\\mathbf{X}\\|_F^2$$</p>\n<p>其中 \\(\\mathbf{X}\\) 是该层的输入激活（通过少量校准数据前向传播获得）。定义 Hessian \\(\\mathbf{H} = 2\\mathbf{X}\\mathbf{X}^T\\)，问题等价于：</p>\n<p>$$\\min_{\\mathbf{M}, \\hat{\\mathbf{W}}} \\|\\mathbf{W} - \\mathbf{M} \\odot \\hat{\\mathbf{W}}\\|_{\\mathbf{H}}^2$$</p>\n<div class=\"key-point\">💡 关键：联合优化掩码和权重是 NP-hard 问题，SparseGPT 通过贪心列式处理将其转化为一系列可解的子问题。</div>\n<p><strong>2. OBS 闭式更新</strong></p>\n<p>当决定剪枝第 \\(j\\) 列时，OBS 给出最优的权重补偿公式：</p>\n<p>$$\\boldsymbol{\\delta}_j = -\\frac{w_j}{[\\mathbf{H}^{-1}]_{jj}} \\cdot \\mathbf{H}^{-1}_{:,j}$$</p>\n<p>即将第 \\(j\\) 列权重置零后，按 Hessian 逆的第 \\(j\\) 列方向对所有其他权重进行补偿更新，更新幅度与 \\(w_j / [\\mathbf{H}^{-1}]_{jj}\\) 成正比。对应的剪枝误差为：</p>\n<p>$$\\varepsilon_j = \\frac{w_j^2}{[\\mathbf{H}^{-1}]_{jj}}$$</p>\n<p><strong>3. 部分更新与 Hessian 同步</strong></p>\n<p>SparseGPT 的关键洞察是：<strong>不需要更新所有权重，只需更新尚未处理的列</strong>。定义 \\(U_j\\) 为第 \\(j\\) 步时尚未处理的列集合，则：</p>\n<ul>\n<li>更新限制在 \\(U_j\\) 上仍然是 \\(U_j\\) 范围内的最优解</li>\n<li>所有行的 \\(U_j\\) 相同 → 可共享同一个 \\((\\mathbf{H}_{U_j})^{-1}\\)</li>\n<li>\\(U_{j+1} = U_j \\setminus \\{j\\}\\)，对应的逆矩阵可通过 Gaussian Elimination 在 \\(O(|U_j|^2)\\) 内递推更新</li>\n</ul>\n<div class=\"warn-box\">⚠️ 注意：这一\"Hessian 同步\"是 SparseGPT 相比传统 OBS 的核心加速来源——将 \\(d_{\\text{row}}\\) 次独立的 \\(O(d_{\\text{col}}^3)\\) Hessian 求逆合并为一次共享的 \\(O(d_{\\text{col}}^3)\\) 递推序列。</div>\n<p><strong>4. 自适应掩码选择</strong></p>\n<p>固定列顺序的贪心策略可能导致次优掩码。SparseGPT 引入分块自适应机制：</p>\n<ul>\n<li>将 \\(d_{\\text{col}}\\) 列分为大小 \\(B_s = 128\\) 的块</li>\n<li>在每个块内，根据 OBS 误差 \\(w_{ij}^2 / [\\mathbf{H}^{-1}]_{jj}\\) 选择误差最小的 \\(p\\%\\) 权重剪枝</li>\n<li>块间按固定顺序处理，块内自适应选择</li>\n</ul>\n<p>这在全局最优（\\(B_s = d_{\\text{col}}\\)，计算不可行）和纯贪心（\\(B_s = 1\\)）之间取得了良好平衡。</p>\n<p><strong>5. 半结构化稀疏与联合量化</strong></p>\n<p>对于 n:m 半结构化稀疏（如 NVIDIA 的 2:4 模式），只需设置 \\(B_s = m\\)，在每 \\(m\\) 个连续权重中保留 \\(n\\) 个。</p>\n<p>联合量化通过修改误差公式实现：</p>\n<p>$$\\mathbf{E}_{:,j} = \\frac{\\mathbf{W}_{:,j} - \\mathbf{M}_{:,j} \\cdot \\text{quant}(\\mathbf{W}_{:,j})}{[\\mathbf{H}^{-1}]_{jj}}$$</p>\n<p>在同一遍列扫描中同时完成剪枝和量化，无额外计算开销。</p>\n<h5>关键实验结果</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>方法</th>\n<th>稀疏度</th>\n<th>ZeroShot 平均精度</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>OPT-175B</td>\n<td>Dense</td>\n<td>0%</td>\n<td>70.29</td>\n</tr>\n<tr>\n<td>OPT-175B</td>\n<td>Magnitude</td>\n<td>50%</td>\n<td>31.10（崩溃）</td>\n</tr>\n<tr>\n<td>OPT-175B</td>\n<td><strong>SparseGPT</strong></td>\n<td><strong>50%</strong></td>\n<td><strong>70.52</strong></td>\n</tr>\n<tr>\n<td>OPT-175B</td>\n<td>SparseGPT</td>\n<td>4:8</td>\n<td>69.62</td>\n</tr>\n<tr>\n<td>OPT-175B</td>\n<td>SparseGPT</td>\n<td>2:4</td>\n<td>69.11</td>\n</tr>\n</tbody>\n</table></div>\n<p>核心发现：\n- <strong>Magnitude Pruning 在所有规模上均崩溃</strong>，而 SparseGPT 在 50% 稀疏度下精度甚至略优于稠密基线\n- <strong>规模效应显著</strong>：OPT-2.7B 约损失 1 点困惑度，OPT-66B 几乎无损，OPT-175B 反而略有提升\n- OPT-175B 可达 <strong>60% 稀疏度</strong>仍保持合理困惑度；Magnitude Pruning 在 10% 即崩溃\n- <strong>50% 稀疏 + 4-bit 量化</strong>优于等存储量的 GPTQ 3-bit（OPT-175B: 8.29 vs 8.68 困惑度）\n- 2:4 半结构化在最大模型上仅增加 0.39 困惑度\n- <strong>后层更敏感</strong>：跳过最后 1/3 层的 2:4 剪枝效果最佳</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>Magnitude Pruning</th>\n<th>AdaPrune (OBS)</th>\n<th>SparseGPT</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>需要重训练</td>\n<td>通常需要</td>\n<td>否</td>\n<td>否</td>\n</tr>\n<tr>\n<td>单层复杂度</td>\n<td>\\(O(d)\\)</td>\n<td>\\(O(d_{\\text{row}} \\cdot d_{\\text{col}}^3)\\)</td>\n<td>\\(O(d_{\\text{col}}^3 + d_{\\text{row}} \\cdot d_{\\text{col}}^2)\\)</td>\n</tr>\n<tr>\n<td>175B 模型可行性</td>\n<td>✅（但精度崩溃）</td>\n<td>❌（内存/时间不可行）</td>\n<td>✅（~4h, 单 A100）</td>\n</tr>\n<tr>\n<td>精度（50% 稀疏）</td>\n<td>崩溃</td>\n<td>N/A</td>\n<td>接近无损</td>\n</tr>\n<tr>\n<td>支持 n:m 稀疏</td>\n<td>否</td>\n<td>否</td>\n<td>✅</td>\n</tr>\n<tr>\n<td>支持联合量化</td>\n<td>否</td>\n<td>否</td>\n<td>✅</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "SparseGPT 相比传统 OBS 剪枝方法的核心加速来源是什么？",
        "options": [
          "使用更小的校准数据集减少 Hessian 计算量",
          "所有行共享同一 Hessian 逆矩阵，通过递推更新避免重复求逆",
          "用 Magnitude 代替 OBS 误差进行掩码选择",
          "将逐层问题转化为全局优化问题"
        ],
        "answer": 1,
        "explain": "SparseGPT 的关键洞察是所有行的未处理列集合 U_j 相同，因此可共享同一个 (H_{U_j})^{-1}，通过 Gaussian Elimination 递推更新，将复杂度从 O(d_row·d_col³) 降至 O(d_col³ + d_row·d_col²)。"
      }
    },
    {
      "id": "saap",
      "num": 11,
      "name": "SAAP",
      "fullName": "结构感知自适应剪枝 (SAAP)",
      "year": "2026",
      "org": "IEEE",
      "parent": "sparsegpt",
      "paperUrl": "https://ieeexplore.ieee.org/abstract/document/11360603/",
      "projectUrl": "",
      "category": "pruning",
      "motivation": "维持LLM理解能力的结构感知剪枝",
      "summary": "SAAP 的核心目标是：维持LLM理解能力的结构感知剪枝。",
      "keyPoints": [
        "核心动机：维持LLM理解能力的结构感知剪枝",
        "演化来源：继承或改进自 sparsegpt",
        "代表机构：IEEE"
      ],
      "detail": "<p>维持LLM理解能力的结构感知剪枝</p>"
    },
    {
      "id": "replaceme",
      "num": 12,
      "name": "ReplaceMe",
      "fullName": "深度剪枝替换 (ReplaceMe)",
      "year": "2026",
      "org": "NeurIPS",
      "parent": "movement_pruning",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/1c10d0c087c14689628124bbc8fa69f6-Abstract-Conference.html",
      "projectUrl": "",
      "category": "pruning",
      "motivation": "深度剪枝与Transformer块线性化",
      "summary": "ReplaceMe 的核心目标是：深度剪枝与Transformer块线性化。",
      "keyPoints": [
        "核心动机：深度剪枝与Transformer块线性化",
        "演化来源：继承或改进自 movement_pruning",
        "代表机构：NeurIPS"
      ],
      "detail": "<p>深度剪枝与Transformer块线性化</p>"
    },
    {
      "id": "vitcop",
      "num": 13,
      "name": "ViTCoP",
      "fullName": "视觉文本协同剪枝 (ViTCoP)",
      "year": "2026",
      "org": "arXiv",
      "parent": "saap",
      "paperUrl": "https://arxiv.org/abs/2601.17818",
      "projectUrl": "",
      "category": "pruning",
      "motivation": "视觉与文本语义协同加速多模态",
      "summary": "ViTCoP 的核心目标是：视觉与文本语义协同加速多模态。",
      "keyPoints": [
        "核心动机：视觉与文本语义协同加速多模态",
        "演化来源：继承或改进自 saap",
        "代表机构：arXiv"
      ],
      "detail": "<p>视觉与文本语义协同加速多模态</p>"
    },
    {
      "id": "hinton_kd",
      "num": 14,
      "name": "Hinton KD",
      "fullName": "知识蒸馏 (Knowledge Distillation)",
      "year": "2015",
      "org": "Google",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1503.02531",
      "projectUrl": "",
      "category": "distillation",
      "motivation": "引入Soft Targets和温度系数T",
      "summary": "Hinton KD 的核心目标是：引入Soft Targets和温度系数T。",
      "keyPoints": [
        "核心动机：引入Soft Targets和温度系数T",
        "代表机构：Google"
      ],
      "detail": "<p>引入Soft Targets和温度系数T</p>"
    },
    {
      "id": "distilbert",
      "num": 15,
      "name": "DistilBERT",
      "fullName": "蒸馏BERT (DistilBERT)",
      "year": "2019",
      "org": "HuggingFace",
      "parent": "hinton_kd",
      "paperUrl": "https://arxiv.org/abs/1910.01108",
      "projectUrl": "",
      "category": "distillation",
      "motivation": "预训练阶段三重损失蒸馏保留97%性能",
      "summary": "DistilBERT 的核心目标是：预训练阶段三重损失蒸馏保留97%性能。",
      "keyPoints": [
        "核心动机：预训练阶段三重损失蒸馏保留97%性能",
        "演化来源：继承或改进自 hinton_kd",
        "代表机构：HuggingFace"
      ],
      "detail": "<p>预训练阶段三重损失蒸馏保留97%性能</p>"
    },
    {
      "id": "tinybert",
      "num": 16,
      "name": "TinyBERT",
      "fullName": "微型BERT (TinyBERT)",
      "year": "2020",
      "org": "华为",
      "parent": "distilbert",
      "paperUrl": "https://aclanthology.org/2020.findings-emnlp.372/",
      "projectUrl": "",
      "category": "distillation",
      "motivation": "两阶段蒸馏涵盖嵌入中间预测层",
      "summary": "TinyBERT 的核心目标是：两阶段蒸馏涵盖嵌入中间预测层。",
      "keyPoints": [
        "核心动机：两阶段蒸馏涵盖嵌入中间预测层",
        "演化来源：继承或改进自 distilbert",
        "代表机构：华为"
      ],
      "detail": "<p>两阶段蒸馏涵盖嵌入中间预测层</p>"
    },
    {
      "id": "minillm",
      "num": 17,
      "name": "MiniLLM",
      "fullName": "最小化LLM (MiniLLM)",
      "year": "2024",
      "org": "微软",
      "parent": "tinybert",
      "paperUrl": "https://arxiv.org/abs/2306.08543",
      "projectUrl": "",
      "category": "distillation",
      "motivation": "反向KL散度蒸馏大语言模型",
      "summary": "MiniLLM 的核心目标是：反向KL散度蒸馏大语言模型。",
      "keyPoints": [
        "核心动机：反向KL散度蒸馏大语言模型",
        "演化来源：继承或改进自 tinybert",
        "代表机构：微软"
      ],
      "detail": "<p>反向KL散度蒸馏大语言模型</p>"
    },
    {
      "id": "activeprune",
      "num": 18,
      "name": "ActivePrune",
      "fullName": "主动剪枝蒸馏 (ActivePrune)",
      "year": "2026",
      "org": "EACL",
      "parent": "minillm",
      "paperUrl": "https://aclanthology.org/2026.findings-eacl.229/",
      "projectUrl": "",
      "category": "distillation",
      "motivation": "结合数据剪枝与蒸馏的主动学习",
      "summary": "ActivePrune 的核心目标是：结合数据剪枝与蒸馏的主动学习。",
      "keyPoints": [
        "核心动机：结合数据剪枝与蒸馏的主动学习",
        "演化来源：继承或改进自 minillm",
        "代表机构：EACL"
      ],
      "detail": "<p>结合数据剪枝与蒸馏的主动学习</p>"
    },
    {
      "id": "longformer",
      "num": 19,
      "name": "Longformer",
      "fullName": "长文档Transformer (Longformer)",
      "year": "2020",
      "org": "Allen AI",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2004.05150",
      "projectUrl": "",
      "category": "sparsity_deploy",
      "motivation": "局部窗口+全局注意力实现线性复杂度",
      "summary": "Longformer 的核心目标是：局部窗口+全局注意力实现线性复杂度。",
      "keyPoints": [
        "核心动机：局部窗口+全局注意力实现线性复杂度",
        "代表机构：Allen AI"
      ],
      "detail": "<p>局部窗口+全局注意力实现线性复杂度</p>"
    },
    {
      "id": "bigbird",
      "num": 20,
      "name": "BigBird",
      "fullName": "大鸟 (BigBird)",
      "year": "2020",
      "org": "Google",
      "parent": "longformer",
      "paperUrl": "https://proceedings.neurips.cc/paper/2020/hash/c8512d142a2d849725f31a9a7a361ab9-Abstract.html",
      "projectUrl": "",
      "category": "sparsity_deploy",
      "motivation": "引入随机注意力块保持全图连通",
      "summary": "BigBird 的核心目标是：引入随机注意力块保持全图连通。",
      "keyPoints": [
        "核心动机：引入随机注意力块保持全图连通",
        "演化来源：继承或改进自 longformer",
        "代表机构：Google"
      ],
      "detail": "<p>引入随机注意力块保持全图连通</p>"
    },
    {
      "id": "nm_sparsity",
      "num": 21,
      "name": "N:M Sparsity",
      "fullName": "N:M细粒度稀疏 (N:M Sparsity)",
      "year": "2021",
      "org": "NVIDIA",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2102.04010",
      "projectUrl": "",
      "category": "sparsity_deploy",
      "motivation": "硬件原生2:4稀疏兼顾精度与加速",
      "summary": "N:M Sparsity 的核心目标是：硬件原生2:4稀疏兼顾精度与加速。",
      "keyPoints": [
        "核心动机：硬件原生2:4稀疏兼顾精度与加速",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>硬件原生2:4稀疏兼顾精度与加速</p>"
    },
    {
      "id": "permllm",
      "num": 22,
      "name": "PermLLM",
      "fullName": "可学习排列LLM (PermLLM)",
      "year": "2026",
      "org": "NeurIPS",
      "parent": "nm_sparsity",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/1d3fe3adb016edebc4fa615c25d22cb0-Abstract-Conference.html",
      "projectUrl": "",
      "category": "sparsity_deploy",
      "motivation": "可学习通道排列优化N:M稀疏精度",
      "summary": "PermLLM 发现手工设计的通道排列指标与实际剪枝损失几乎不相关，转而将排列矩阵参数化为可学习的 Sinkhorn 双随机矩阵，配合 block-wise 分解和 STE 梯度传递，端到端学习最优通道排列，在 LLaMA/Qwen 等模型的 2:4 和 4:8 稀疏下大幅超越现有通道排列方法（如 LLaMA-3.1 8B 2:4 PPL 从 21.09 降至 14.03）。",
      "keyPoints": [
        "<strong>核心发现</strong>：手工排列指标（最大化保留权重重要性之和）与实际剪枝损失的 Spearman 相关系数仅 0.09–0.28，说明现有启发式排列策略本质上是在错误的代理目标上优化",
        "<strong>可微排列学习</strong>：将排列矩阵松弛为双随机矩阵（Sinkhorn 归一化），前向用 Hungarian 算法硬化为真排列矩阵，反向用 STE 穿透离散操作传梯度",
        "<strong>Block-wise 分解</strong>：将 $C_{in} \\times C_{in}$ 排列矩阵分解为 $N_B$ 个 $B \\times B$ 块对角矩阵，参数量从 $O(C_{in}^2)$ 降至 $O(C_{in} \\cdot B)$，Hungarian 复杂度从 $O(C_{in}^3)$ 降至 $O(C_{in} \\cdot B^2)$",
        "<strong>即插即用</strong>：PermLLM 可与任意 N:M 剪枝指标（Wanda、RIA）组合，仅需 128 条校准样本、约 2.5 小时（7B/4×GPU）即可完成排列学习",
        "<strong>高效部署</strong>：设计 CUDA kernel 实现 block-wise 排列，相比 PyTorch 原生实现加速 84×，排列开销可忽略"
      ],
      "detail": "<h5>问题动机</h5>\n<p><img alt=\"Figure 1: 手工排列指标与实际剪枝损失的对比\" src=\"https://ar5iv.labs.arxiv.org/html/2510.10136/assets/x1.png\" /></p>\n<p><strong>Figure 1</strong>：对同一层的不同通道排列，手工指标 Score $S$（保留权重重要性之和）最高的排列（左图）实际剪枝损失反而最大；而 Score 较低的排列（右图）实际损失最小。这说明最大化 $S$ 是一个错误的代理目标。</p>\n<h5>方法概览</h5>\n<p><img alt=\"Figure 2: PermLLM 框架\" src=\"https://ar5iv.labs.arxiv.org/html/2510.10136/assets/x2.png\" /></p>\n<p><strong>Figure 2</strong>：PermLLM 整体流程。对每个线性层：(1) 学习 block-wise 排列矩阵 $P_B$；(2) 对权重施加排列 $W \\cdot P_B$；(3) 基于剪枝指标生成 N:M mask $M$；(4) 最小化稀疏输出与稠密输出的距离。</p>\n<h5>Sinkhorn 可微排列</h5>\n<p><strong>核心思想</strong>：排列矩阵 $P \\in {0,1}^{n \\times n}$ 是离散的，无法直接求梯度。PermLLM 将其松弛为双随机矩阵（每行每列之和均为 1 的非负矩阵），通过 Sinkhorn 归一化实现：</p>\n<p>$$\\hat{P} = \\text{Sinkhorn}(W_P, \\tau) \\quad \\text{where} \\quad W_P \\in \\mathbb{R}^{n \\times n} \\text{ is learnable}$$</p>\n<p>Sinkhorn 迭代过程：\n1. 初始化：$S^{(0)} = \\exp(W_P / \\tau)$（温度 $\\tau$ 控制软硬程度）\n2. 行归一化：$S^{(l)} = S^{(l-1)} \\oslash (S^{(l-1)} \\mathbf{1} \\mathbf{1}^\\top)$\n3. 列归一化：$S^{(l)} = S^{(l)} \\oslash (\\mathbf{1} \\mathbf{1}^\\top S^{(l)})$\n4. 重复 $L$ 次（默认 $L=5$），得到软排列 $\\hat{P}$</p>\n<p><strong>前向硬化</strong>：用 Hungarian 算法从 $\\hat{P}$ 提取最优硬排列 $P^* = \\text{Hungarian}(\\hat{P})$</p>\n<p><strong>反向 STE</strong>：$\\nabla_{W_P} \\mathcal{L} = \\nabla_{\\hat{P}} \\mathcal{L}$（梯度直接穿透 Hungarian 操作传给软排列）</p>\n<p><strong>温度退火</strong>：$\\tau$ 从 1 线性衰减到 0.1，使训练初期探索充分、后期逼近离散解。</p>\n<h5>Block-wise 排列</h5>\n<p>全排列矩阵 $P \\in \\mathbb{R}^{C_{in} \\times C_{in}}$ 参数量和 Hungarian 复杂度过高（如 $C_{in}=4096$）。PermLLM 将其分解为块对角结构：</p>\n<p>$$P_B = \\text{diag}(P_1, P_2, \\ldots, P_{N_B}), \\quad N_B = C_{in} / B$$</p>\n<p>每个 $P_i \\in \\mathbb{R}^{B \\times B}$，默认 $B=64$。这意味着排列只在每个大小为 $B$ 的通道块内进行，跨块通道顺序不变。</p>\n<p><strong>复杂度对比</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th></th>\n<th>参数量</th>\n<th>Hungarian 复杂度</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>全排列</td>\n<td>$C_{in}^2$</td>\n<td>$O(C_{in}^3)$</td>\n</tr>\n<tr>\n<td>Block-wise</td>\n<td>$C_{in} \\times B$</td>\n<td>$O(C_{in} \\cdot B^2)$</td>\n</tr>\n</tbody>\n</table></div>\n<p>当 $B=64, C_{in}=4096$：参数从 16.8M 降至 262K（64×），复杂度从 $O(10^{10})$ 降至 $O(10^6)$。</p>\n<h5>Mask 生成与 STE</h5>\n<p>给定排列后的权重 $W \\cdot P_B^*$ 和剪枝指标（如 Wanda: $|w_{ij}| \\cdot |x_j|_2$），计算重要性分数 $S$。</p>\n<p><strong>前向</strong>：在每个 M 元素组内，用 argmax 选择 top-N 生成硬 mask $M^*$</p>\n<p><strong>反向</strong>：用 softmax 近似 argmax 以传递梯度：</p>\n<p>$$\\hat{M}_{ij} = \\frac{\\exp(S_{ij} / t)}{\\sum_{k \\in \\text{group}} \\exp(S_{ik} / t)}$$</p>\n<p>STE 使得梯度可以从 mask 传回排列矩阵参数。</p>\n<h5>损失函数</h5>\n<p>逐层优化，最小化稀疏层输出与稠密层输出的余弦距离：</p>\n<p>$$\\mathcal{L} = 1 - \\cos(Y_{\\text{dense}}, \\; Y_{\\text{sparse}})$$</p>\n<p>其中 $Y_{\\text{sparse}} = (M^<em> \\odot (W \\cdot P_B^</em>)) \\cdot X$，$Y_{\\text{dense}} = W \\cdot X$。</p>\n<h5>算法伪代码</h5>\n<pre><code>Algorithm: PermLLM — Learnable Channel Permutation for N:M Sparsity\nInput: 预训练权重 W ∈ R^{C_out × C_in}, 校准集输入 X, \n       block_size B=64, Sinkhorn iter L=5, τ: 1→0.1\nOutput: 最优排列 P*_B, 稀疏 mask M*\n\n1. 初始化 W_P ∈ R^{N_B × B × B} (N_B = C_in/B 个块)\n2. for each training step:\n   a. Sinkhorn 归一化:\n      for each block i = 1..N_B:\n          P̂_i = Sinkhorn(W_P[i], τ)      // 软双随机矩阵\n          P*_i = Hungarian(P̂_i)           // 硬排列矩阵\n      P*_B = diag(P*_1, ..., P*_NB)\n   b. 排列权重: W_perm = W · P*_B\n   c. 计算重要性: S = metric(W_perm, X)   // e.g., Wanda\n   d. 生成 mask:\n      前向: M* = argmax_N:M(S)            // 硬 mask\n      反向: M̂ = softmax_N:M(S/t)          // 软 mask (STE)\n   e. 稀疏输出: Y_sparse = (M* ⊙ W_perm) · X\n   f. 损失: L = 1 - cos(W·X, Y_sparse)\n   g. 反向传播: ∇W_P via STE through Hungarian and argmax\n   h. 更新 W_P (AdamW, lr ∈ {1e-3, 5e-3})\n   i. 线性衰减 τ\n3. 返回 P*_B, M*\n</code></pre>\n<h5>实验结果</h5>\n<p><strong>主要结果（WikiText-2 PPL，↓ 更好）</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>稀疏度</th>\n<th>Wanda</th>\n<th>Wanda+CP</th>\n<th>PermLLM_Wanda</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>LLaMA-2 7B</td>\n<td>2:4</td>\n<td>12.03</td>\n<td>12.02</td>\n<td><strong>11.07</strong></td>\n</tr>\n<tr>\n<td>LLaMA-2 13B</td>\n<td>2:4</td>\n<td>9.54</td>\n<td>9.37</td>\n<td><strong>8.85</strong></td>\n</tr>\n<tr>\n<td>LLaMA-3.1 8B</td>\n<td>2:4</td>\n<td>15.82</td>\n<td>21.09</td>\n<td><strong>14.03</strong></td>\n</tr>\n<tr>\n<td>Qwen-2.5 7B</td>\n<td>2:4</td>\n<td>13.10</td>\n<td>12.83</td>\n<td><strong>11.63</strong></td>\n</tr>\n</tbody>\n</table></div>\n<ul>\n<li>Wanda+CP 使用手工排列指标（最大化保留权重重要性之和），在 LLaMA-3.1 上反而严重恶化（21.09 vs 15.82），验证了手工指标的不可靠性</li>\n<li>PermLLM 在所有模型和稀疏度设置下均一致优于基线</li>\n<li>与 RIA 指标组合同样有效：LLaMA-2 7B 2:4 PPL 从 11.49 降至 10.75</li>\n</ul>\n<p><strong>部署效率</strong>：自定义 CUDA kernel 实现 block-wise 排列，相比 PyTorch 原生 <code>index_select</code> 加速 <strong>84×</strong>（0.01ms vs 0.84ms per layer），额外延迟可忽略。</p>\n<p><strong>训练开销</strong>：128 条 C4 校准样本，序列长度 1024，LLaMA-2 7B 在 4×A100 上约 2.5 小时。</p>",
      "quiz": {
        "q": "",
        "options": [],
        "answer": 0,
        "explain": ""
      }
    },
    {
      "id": "gigamoe",
      "num": 23,
      "name": "GigaMoE",
      "fullName": "十亿像素MoE (GigaMoE)",
      "year": "2026",
      "org": "AAAI",
      "parent": "nm_sparsity",
      "paperUrl": "https://ojs.aaai.org/index.php/AAAI/article/view/38810",
      "projectUrl": "",
      "category": "sparsity_deploy",
      "motivation": "稀疏引导MoE高效十亿像素检测",
      "summary": "GigaMoE 的核心目标是：稀疏引导MoE高效十亿像素检测。",
      "keyPoints": [
        "核心动机：稀疏引导MoE高效十亿像素检测",
        "演化来源：继承或改进自 nm_sparsity",
        "代表机构：AAAI"
      ],
      "detail": "<p>稀疏引导MoE高效十亿像素检测</p>"
    },
    {
      "id": "hierasparse",
      "num": 24,
      "name": "HieraSparse",
      "fullName": "分层稀疏注意力 (HieraSparse)",
      "year": "2026",
      "org": "arXiv",
      "parent": "bigbird",
      "paperUrl": "https://arxiv.org/abs/2604.16864",
      "projectUrl": "",
      "category": "sparsity_deploy",
      "motivation": "分层半结构化稀疏KV注意力",
      "summary": "HieraSparse 的核心目标是：分层半结构化稀疏KV注意力。",
      "keyPoints": [
        "核心动机：分层半结构化稀疏KV注意力",
        "演化来源：继承或改进自 bigbird",
        "代表机构：arXiv"
      ],
      "detail": "<p>分层半结构化稀疏KV注意力</p>"
    }
  ],
  "categories": {
    "quantization": {
      "label": "量化技术",
      "color": "#22a06b"
    },
    "pruning": {
      "label": "剪枝技术",
      "color": "#5b63d3"
    },
    "distillation": {
      "label": "知识蒸馏",
      "color": "#e8820c"
    },
    "sparsity_deploy": {
      "label": "稀疏化与部署",
      "color": "#d32f2f"
    }
  },
  "projectUrls": {}
};
