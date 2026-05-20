/**
 * aigc_base-data.js — 由 pipeline/build.py 于 2026-05-20 17:14:03 自动生成。
 * 源文件：content/aigc/aigc_base.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "aigc",
    "topic_id": "aigc_base",
    "topic_name": "生成基础模型",
    "page_title": "生成基础模型技术演进图谱",
    "page_subtitle": "2026-05-20 版",
    "page_desc": "涵盖从自回归生成、扩散模型到流匹配（Flow Matching）的技术演进，系统梳理生成式 AI 的底层算法架构。",
    "page_icon": "🎨",
    "hero_pills": [
      "🏷️ Diffusion Models",
      "🏷️ Flow Matching",
      "🏷️ Autoregressive"
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
        "id": "vq-vae",
        "x": 100,
        "y": 400,
        "category": "gan_vae"
      },
      {
        "id": "stylegan",
        "x": 150,
        "y": 450,
        "category": "gan_vae"
      },
      {
        "id": "vqgan",
        "x": 200,
        "y": 400,
        "category": "gan_vae"
      },
      {
        "id": "ddpm",
        "x": 180,
        "y": 100,
        "category": "diffusion"
      },
      {
        "id": "score-sde",
        "x": 190,
        "y": 150,
        "category": "diffusion"
      },
      {
        "id": "ddim",
        "x": 210,
        "y": 80,
        "category": "diffusion"
      },
      {
        "id": "stable-diffusion",
        "x": 260,
        "y": 100,
        "category": "diffusion"
      },
      {
        "id": "dit",
        "x": 320,
        "y": 100,
        "category": "diffusion"
      },
      {
        "id": "consistency-model",
        "x": 330,
        "y": 150,
        "category": "diffusion"
      },
      {
        "id": "dit-moe",
        "x": 380,
        "y": 80,
        "category": "diffusion"
      },
      {
        "id": "dynamic-dit",
        "x": 440,
        "y": 90,
        "category": "diffusion"
      },
      {
        "id": "q-dit",
        "x": 450,
        "y": 120,
        "category": "diffusion"
      },
      {
        "id": "scott",
        "x": 460,
        "y": 150,
        "category": "diffusion"
      },
      {
        "id": "e-dit",
        "x": 500,
        "y": 90,
        "category": "diffusion"
      },
      {
        "id": "gpdit",
        "x": 510,
        "y": 60,
        "category": "diffusion"
      },
      {
        "id": "framedit",
        "x": 520,
        "y": 120,
        "category": "diffusion"
      },
      {
        "id": "neural-ode",
        "x": 120,
        "y": 200,
        "category": "flow_matching"
      },
      {
        "id": "flow-matching",
        "x": 260,
        "y": 200,
        "category": "flow_matching"
      },
      {
        "id": "rectified-flow",
        "x": 270,
        "y": 230,
        "category": "flow_matching"
      },
      {
        "id": "sd3",
        "x": 380,
        "y": 200,
        "category": "flow_matching"
      },
      {
        "id": "pyramidal-flow",
        "x": 500,
        "y": 200,
        "category": "flow_matching"
      },
      {
        "id": "energy-matching",
        "x": 510,
        "y": 230,
        "category": "flow_matching"
      },
      {
        "id": "dall-e",
        "x": 210,
        "y": 300,
        "category": "autoregressive"
      },
      {
        "id": "parti",
        "x": 270,
        "y": 300,
        "category": "autoregressive"
      },
      {
        "id": "llamagen",
        "x": 380,
        "y": 300,
        "category": "autoregressive"
      },
      {
        "id": "var",
        "x": 390,
        "y": 320,
        "category": "autoregressive"
      },
      {
        "id": "chameleon",
        "x": 380,
        "y": 350,
        "category": "unified"
      },
      {
        "id": "show-o",
        "x": 390,
        "y": 370,
        "category": "unified"
      },
      {
        "id": "transfusion",
        "x": 450,
        "y": 350,
        "category": "unified"
      },
      {
        "id": "unitok",
        "x": 460,
        "y": 370,
        "category": "unified"
      },
      {
        "id": "show-o2",
        "x": 470,
        "y": 380,
        "category": "unified"
      },
      {
        "id": "univid",
        "x": 520,
        "y": 360,
        "category": "unified"
      },
      {
        "id": "gpt-4o-native",
        "x": 530,
        "y": 350,
        "category": "unified"
      }
    ],
    "edges": [
      {
        "from": "vq-vae",
        "to": "vqgan",
        "label": "对抗训练"
      },
      {
        "from": "vq-vae",
        "to": "dall-e",
        "label": "离散化"
      },
      {
        "from": "ddpm",
        "to": "score-sde",
        "label": "连续框架"
      },
      {
        "from": "ddpm",
        "to": "ddim",
        "label": "确定性采样"
      },
      {
        "from": "ddpm",
        "to": "stable-diffusion",
        "label": "潜空间"
      },
      {
        "from": "ddpm",
        "to": "consistency-model",
        "label": "一步蒸馏"
      },
      {
        "from": "stable-diffusion",
        "to": "dit",
        "label": "Transformer化"
      },
      {
        "from": "dit",
        "to": "dit-moe",
        "label": "稀疏扩展"
      },
      {
        "from": "dit",
        "to": "dynamic-dit",
        "label": "动态计算"
      },
      {
        "from": "dit",
        "to": "q-dit",
        "label": "量化推理"
      },
      {
        "from": "dit",
        "to": "gpdit",
        "label": "视频因果"
      },
      {
        "from": "dit",
        "to": "framedit",
        "label": "矩阵注意力"
      },
      {
        "from": "dynamic-dit",
        "to": "e-dit",
        "label": "弹性宽度"
      },
      {
        "from": "consistency-model",
        "to": "scott",
        "label": "随机蒸馏"
      },
      {
        "from": "neural-ode",
        "to": "flow-matching",
        "label": "CNF框架"
      },
      {
        "from": "flow-matching",
        "to": "rectified-flow",
        "label": "直线轨迹"
      },
      {
        "from": "flow-matching",
        "to": "pyramidal-flow",
        "label": "金字塔训练"
      },
      {
        "from": "flow-matching",
        "to": "energy-matching",
        "label": "能量统一"
      },
      {
        "from": "rectified-flow",
        "to": "sd3",
        "label": "商业化"
      },
      {
        "from": "dall-e",
        "to": "parti",
        "label": "扩展"
      },
      {
        "from": "parti",
        "to": "llamagen",
        "label": "原生AR"
      },
      {
        "from": "llamagen",
        "to": "var",
        "label": "尺度预测"
      },
      {
        "from": "chameleon",
        "to": "show-o",
        "label": "混合建模"
      },
      {
        "from": "chameleon",
        "to": "transfusion",
        "label": "无缝集成"
      },
      {
        "from": "show-o",
        "to": "unitok",
        "label": "统一Token"
      },
      {
        "from": "show-o",
        "to": "show-o2",
        "label": "协同增强"
      },
      {
        "from": "unitok",
        "to": "univid",
        "label": "视频统一"
      },
      {
        "from": "transfusion",
        "to": "gpt-4o-native",
        "label": "原生多模态"
      },
      {
        "from": "vqgan",
        "to": "stable-diffusion",
        "label": "编码器"
      },
      {
        "from": "dit",
        "to": "sd3",
        "label": "MMDiT"
      }
    ],
    "milestones": [
      {
        "id": "ddpm",
        "label": "扩散范式奠基",
        "desc": "DDPM建立扩散模型与去噪分数匹配的统一框架，开启生成式AI新纪元"
      },
      {
        "id": "dit",
        "label": "Transformer化转型",
        "desc": "DiT用Transformer替换U-Net，验证扩散模型的可扩展性定律"
      },
      {
        "id": "gpt-4o-native",
        "label": "原生多模态智能",
        "desc": "GPT-4o实现文本、音频、图像的原生多模态实时交互生成"
      }
    ]
  },
  "algos": [
    {
      "id": "vq-vae",
      "num": 1,
      "name": "VQ-VAE",
      "fullName": "向量量化变分自编码器 (Vector Quantized VAE)",
      "year": "2017",
      "org": "DeepMind",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1711.00937",
      "projectUrl": "",
      "category": "gan_vae",
      "motivation": "引入离散向量量化表征学习",
      "summary": "VQ-VAE 通过在 VAE 的潜空间中引入**离散向量量化（Vector Quantization）**，将编码器输出映射到有限大小的码本（codebook）中最近的嵌入向量，从而学习到紧凑的离散表征；结合 straight-through 梯度估计器解决离散操作不可微的问题，并利用自回归先验（PixelCNN / WaveNet）在离散潜空间上建模，实现了高质量的图像、音频和视频生成。",
      "keyPoints": [
        "<strong>离散潜变量</strong>：不同于传统 VAE 使用连续高斯潜变量，VQ-VAE 维护一个包含 \\(K\\) 个嵌入向量的码本 \\(e \\in \\mathbb{R}^{K \\times D}\\)，编码器输出通过最近邻查找映射为离散码字索引。",
        "<strong>向量量化（VQ）</strong>：编码器输出 \\(z_e(x)\\) 通过 \\(z_q(x) = e_k, \\; k = \\arg\\min_j \\|z_e(x) - e_j\\|_2\\) 量化为码本中最近的向量，实现信息瓶颈。",
        "<strong>Straight-Through 梯度估计</strong>：前向传播使用量化后的 \\(z_q\\)，反向传播时将解码器对 \\(z_q\\) 的梯度直接复制给编码器输出 \\(z_e\\)，绕过不可微的 argmin 操作。",
        "<strong>三项损失函数</strong>：重建损失 + VQ 损失（码本向编码器输出靠拢）+ Commitment 损失（编码器输出向码本靠拢），其中 commitment 系数 \\(\\beta = 0.25\\)。",
        "<strong>自回归先验</strong>：训练后在离散潜空间上拟合 PixelCNN（图像）或 WaveNet（音频）作为先验分布，用于无条件采样生成。",
        "<strong>多模态验证</strong>：在图像（CIFAR-10、ImageNet）、音频（VCTK 语音）和视频（DeepMind Lab）上均取得与连续 VAE 可比甚至更优的性能。"
      ],
      "detail": "<h5>核心架构示意图</h5>\n<p><img alt=\"VQ-VAE Architecture\" src=\"https://ar5iv.labs.arxiv.org/html/1711.00937/assets/figures/Figure1_9.png\" /></p>\n<p><strong>图说明</strong>：左图展示 VQ-VAE 的整体架构。编码器将输入 \\(x\\) 编码为连续向量 \\(z_e(x)\\)，通过最近邻查找在离散码本（Embedding space）中选取最接近的嵌入向量 \\(z_q(x)\\)，传递给解码器重建输入。右图展示了嵌入空间的可视化：灰色点为码本向量，蓝色箭头表示 VQ 损失将码本向编码器输出拉近，红色箭头表示 commitment 损失将编码器输出向码本拉近。</p>\n<h5>算法伪代码</h5>\n<pre><code>Algorithm: VQ-VAE Training\n─────────────────────────────────────────────\nInput: 训练数据 x, 码本大小 K, 嵌入维度 D, commitment 系数 β\nOutput: 训练好的编码器 E, 解码器 G, 码本 e\n\n1. 初始化码本 e = {e_1, e_2, ..., e_K}, e_i ∈ ℝ^D\n2. 初始化编码器 E 和解码器 G 的参数\n\n3. for each mini-batch x do:\n4.   ── 编码 ──\n5.   z_e(x) = E(x)                          // 编码器输出连续向量\n6.\n7.   ── 向量量化 ──\n8.   for each spatial position i do:\n9.     k_i = argmin_j ‖z_e^(i)(x) − e_j‖₂  // 最近邻查找\n10.    z_q^(i)(x) = e_{k_i}                  // 用码本向量替换\n11.  end for\n12.\n13.  ── Straight-Through 梯度传递 ──\n14.  z_q(x) = z_e(x) + sg[z_q(x) − z_e(x)] // sg = stop-gradient\n15.  // 前向: z_q(x) = 量化值; 反向: 梯度直通到 z_e(x)\n16.\n17.  ── 解码与损失计算 ──\n18.  x̂ = G(z_q(x))                           // 解码器重建\n19.  L_recon = ‖x − x̂‖²₂                     // 重建损失\n20.  L_vq    = ‖sg[z_e(x)] − e‖²₂            // VQ 损失 (更新码本)\n21.  L_commit = ‖z_e(x) − sg[e]‖²₂           // Commitment 损失 (更新编码器)\n22.  L = L_recon + L_vq + β · L_commit\n23.\n24.  ── 参数更新 ──\n25.  更新 E, G 参数 (通过 L_recon + β·L_commit 的梯度)\n26.  更新码本 e (通过 L_vq 的梯度, 或使用 EMA 更新)\n27. end for\n</code></pre>\n<h5>方法细节</h5>\n<p><strong>1. 离散潜变量与向量量化</strong></p>\n<p>VQ-VAE 的核心创新在于将 VAE 的连续潜空间替换为离散潜空间。传统 VAE 通过重参数化技巧（reparameterization trick）从连续高斯分布中采样潜变量，而 VQ-VAE 则维护一个<strong>离散码本</strong>（codebook / embedding table） \\(e \\in \\mathbb{R}^{K \\times D}\\)，其中 \\(K\\) 是码本大小（通常为 512），\\(D\\) 是每个嵌入向量的维度。</p>\n<p>编码器将输入 \\(x\\) 映射为连续表征 \\(z_e(x) \\in \\mathbb{R}^{H' \\times W' \\times D}\\)（对于图像，\\(H', W'\\) 为空间分辨率下采样后的尺寸）。对于每个空间位置的 \\(D\\) 维向量，通过最近邻查找确定其对应的码字索引：</p>\n<p>$$k = \\arg\\min_j \\|z_e(x) - e_j\\|_2$$</p>\n<p>然后用对应的码本向量 \\(e_k\\) 替换编码器输出，得到量化后的表征 \\(z_q(x) = e_k\\)。这一操作将连续空间压缩为 \\(K\\) 个离散状态，形成了强有力的信息瓶颈。</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：离散表征天然避免了传统 VAE 中常见的\"后验坍缩\"（posterior collapse）问题——因为潜变量只能取有限个离散值，解码器无法忽略潜变量而仅依赖自身的自回归能力。</div>\n<p><strong>2. Straight-Through 梯度估计</strong></p>\n<p>向量量化中的 \\(\\arg\\min\\) 操作是不可微的，无法直接反向传播。VQ-VAE 采用 <strong>straight-through estimator</strong> 解决这一问题：在前向传播中使用量化后的 \\(z_q(x)\\)，但在反向传播时将解码器输入端的梯度 \\(\\nabla_{z_q} L\\) 直接复制到编码器输出 \\(z_e(x)\\)。</p>\n<p>实现上，这等价于：</p>\n<p>$$z_q(x) = z_e(x) + \\text{sg}[z_q(x) - z_e(x)]$$</p>\n<p>其中 \\(\\text{sg}[\\cdot]\\) 表示 stop-gradient 操作。前向计算时 \\(z_q(x)\\) 等于量化值，反向传播时梯度直接流向 \\(z_e(x)\\)。</p>\n<p>这一近似的合理性在于：编码器和解码器共享相同的 \\(D\\) 维空间，当码本足够密集时，\\(z_q(x)\\) 与 \\(z_e(x)\\) 之间的差异较小，梯度方向近似一致。</p>\n<p><strong>3. 损失函数设计</strong></p>\n<p>VQ-VAE 的总损失由三项组成：</p>\n<p>$$L = \\underbrace{\\|x - D(z_q(x))\\|_2^2}_{\\text{重建损失}} + \\underbrace{\\|\\text{sg}[z_e(x)] - e\\|_2^2}_{\\text{VQ 损失}} + \\underbrace{\\beta \\|z_e(x) - \\text{sg}[e]\\|_2^2}_{\\text{Commitment 损失}}$$</p>\n<ul>\n<li><strong>重建损失</strong>：衡量解码器输出与原始输入的差异，梯度通过 straight-through 传递给编码器和解码器。</li>\n<li><strong>VQ 损失</strong>（也称 codebook loss）：仅更新码本嵌入向量，使其向编码器输出靠拢。这本质上是字典学习中的 VQ 目标，等价于对码本做在线 k-means 更新。</li>\n<li><strong>Commitment 损失</strong>：仅更新编码器参数，防止编码器输出在嵌入空间中剧烈波动。系数 \\(\\beta\\) 控制编码器对当前码字的\"承诺\"程度，论文中发现 \\(\\beta \\in [0.1, 2.0]\\) 范围内结果稳健，默认取 \\(\\beta = 0.25\\)。</li>\n</ul>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：作者还提出了一种替代方案——使用<strong>指数移动平均（EMA）</strong>更新码本，此时无需 VQ 损失项，训练更稳定。EMA 更新规则为：\\(e_i \\leftarrow \\gamma e_i + (1-\\gamma) \\bar{z}_{e,i}\\)，其中 \\(\\bar{z}_{e,i}\\) 是被分配到第 \\(i\\) 个码字的所有编码器输出的均值。</div>\n<p><strong>4. 先验分布与生成采样</strong></p>\n<p>与传统 VAE 使用固定的标准正态先验不同，VQ-VAE 的先验分布 \\(p(z)\\) 是在训练完成后单独拟合的。由于潜变量是离散的（每个空间位置取 \\(K\\) 个值之一），可以用强大的自回归模型来建模这个离散分布：</p>\n<ul>\n<li><strong>图像</strong>：使用 <strong>PixelCNN</strong> 在 \\(H' \\times W'\\) 的离散潜码图上建模，捕获码字之间的空间依赖关系。</li>\n<li><strong>音频</strong>：使用 <strong>WaveNet</strong> 在一维离散潜码序列上建模。</li>\n</ul>\n<p>生成时，先从自回归先验中采样离散码字序列，再通过码本查找和解码器生成最终输出。这种两阶段方案使得 VQ-VAE 的潜空间利用率远高于传统 VAE。</p>\n<p><strong>5. 与传统方法的区别</strong></p>\n<p>与连续 VAE 相比，VQ-VAE 有三个关键优势：（1）离散表征更适合语言、推理等天然离散的任务；（2）避免了后验坍缩，因为解码器必须依赖离散码字才能重建输入；（3）可以利用强大的自回归先验在离散空间上建模，而非受限于简单的高斯先验。实验表明，VQ-VAE 在 CIFAR-10 上达到 4.67 bits/dim 的负对数似然（使用 PixelCNN 先验），与当时最优的连续 VAE 相当。在 ImageNet 128×128 上，VQ-VAE 的重建质量优于连续 VAE，且码本利用率接近 100%。在音频领域，VQ-VAE 能够将语音内容与说话人身份解耦到不同层级的潜变量中，实现语音风格迁移。</p>",
      "quiz": {
        "q": "VQ-VAE 中 straight-through estimator 的作用是什么？",
        "options": [
          "将连续潜变量离散化为码本索引",
          "在反向传播时将解码器对量化向量的梯度直接传递给编码器输出，绕过不可微的 argmin 操作",
          "用指数移动平均更新码本嵌入向量",
          "在训练时用 PixelCNN 先验替代均匀先验"
        ],
        "answer": 1,
        "explain": "argmin 量化操作不可微，straight-through estimator 在反向传播时将梯度从 z_q 直接复制到 z_e，使编码器可以接收来自重建损失的梯度信号进行更新。"
      }
    },
    {
      "id": "stylegan",
      "num": 2,
      "name": "StyleGAN",
      "fullName": "基于风格的生成对抗网络 (Style-Based GAN)",
      "year": "2019",
      "org": "NVIDIA",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1812.04948",
      "projectUrl": "",
      "category": "gan_vae",
      "motivation": "解耦风格控制与多尺度注入",
      "summary": "StyleGAN 提出了基于风格的生成器架构，通过映射网络将隐码映射到中间潜空间 \\(\\mathcal{W}\\)，并借助自适应实例归一化（AdaIN）在多个尺度注入风格，实现了对生成图像从粗到细的解耦控制，同时引入随机噪声输入实现细节级别的随机变化，在 FFHQ 1024² 人脸生成上取得了当时最优的 FID 4.40。",
      "keyPoints": [
        "<strong>映射网络（Mapping Network）</strong>：8 层 MLP 将输入隐码 \\(\\mathbf{z} \\in \\mathcal{Z}\\) 映射到中间潜空间 \\(\\mathbf{w} \\in \\mathcal{W}\\)（均为 512 维），解除了隐空间必须服从固定分布的约束",
        "<strong>基于风格的合成网络</strong>：以学习到的常量 \\(4 \\times 4 \\times 512\\) 作为输入，通过 18 层（分辨率 \\(4^2\\) 到 \\(1024^2\\)）逐步上采样合成图像，每层通过 AdaIN 注入风格",
        "<strong>自适应实例归一化（AdaIN）</strong>：将 \\(\\mathbf{w}\\) 经仿射变换得到缩放与偏移参数 \\((y_s, y_b)\\)，对特征图逐通道归一化后施加风格调制",
        "<strong>逐层噪声注入</strong>：每个卷积层后注入独立的高斯噪声（经可学习缩放因子），控制头发丝、毛孔等随机细节",
        "<strong>风格混合正则化（Mixing Regularization）</strong>：训练时以一定概率使用两个不同隐码生成的 \\(\\mathbf{w}_1, \\mathbf{w}_2\\)，在随机交叉点切换，防止相邻层风格关联",
        "<strong>多尺度风格控制</strong>：粗尺度（\\(4^2\\)–\\(8^2\\)）控制姿态/脸型，中尺度（\\(16^2\\)–\\(32^2\\)）控制五官/发型，细尺度（\\(64^2\\)–\\(1024^2\\)）控制颜色/微观结构",
        "<strong>解缠评估指标</strong>：提出感知路径长度（PPL）和线性可分性（Linear Separability）两个定量指标，证明 \\(\\mathcal{W}\\) 空间比 \\(\\mathcal{Z}\\) 空间更加解缠",
        "<strong>FFHQ 数据集</strong>：发布了包含 70,000 张 1024² 高质量人脸图像的新数据集"
      ],
      "detail": "<h5>架构总览</h5>\n<p><img alt=\"StyleGAN 架构对比图\" src=\"https://ar5iv.labs.arxiv.org/html/1812.04948/assets/x1.png\" />\n<em>图：(a) 传统生成器直接将隐码 z 输入网络；(b) StyleGAN 生成器通过映射网络 f 将 z 映射为 w，再经仿射变换 A 注入各层风格，同时每层接收独立噪声 B。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># StyleGAN 生成器前向传播伪代码\ndef StyleGenerator(z, noise_inputs):\n    # 1. 映射网络：z → w\n    w = MappingNetwork(z)          # 8层MLP, z ∈ R^512 → w ∈ R^512\n\n    # 2. 合成网络：从学习到的常量开始\n    x = learned_constant            # shape: 4×4×512\n\n    for layer_i in range(18):       # 分辨率 4² → 1024²\n        if layer_i &gt; 0 and layer_i % 2 == 0:\n            x = upsample(x)        # 双线性上采样\n\n        x = conv3x3(x)             # 卷积\n\n        # 3. 注入噪声（逐像素随机变化）\n        x = x + scale_i * noise_inputs[layer_i]  # scale_i 为可学习标量\n\n        # 4. AdaIN 风格注入\n        y_s, y_b = AffineTransform_i(w)           # 仿射变换 A\n        x = y_s * (x - mean(x)) / std(x) + y_b   # AdaIN\n\n    return to_rgb(x)\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统 GAN 生成器直接将隐码 \\(\\mathbf{z}\\) 通过输入层送入网络，这种设计存在两个根本问题：</p>\n<ol>\n<li>\n<p><strong>隐空间纠缠</strong>：输入隐码 \\(\\mathbf{z}\\) 必须服从固定先验分布（如高斯分布），而训练数据的真实因素分布可能与之不匹配。当数据中某些属性组合不存在时（如长发的男性极少），网络被迫将这些\"空洞\"映射到有效图像，导致隐空间发生弯曲和纠缠。</p>\n</li>\n<li>\n<p><strong>缺乏多尺度控制</strong>：所有语义信息都通过单一输入向量传递，网络必须自行学习如何在不同分辨率分配不同语义，缺乏显式的层级控制机制。</p>\n</li>\n</ol>\n<p>StyleGAN 的核心思路借鉴了风格迁移（Style Transfer）的成功经验：<strong>将\"风格\"理解为对特征统计量的调制</strong>，通过在每个卷积层独立注入风格参数，实现对生成过程的细粒度控制。</p>\n<h5>核心机制详解</h5>\n<p><strong>1. 映射网络 \\(f: \\mathcal{Z} \\rightarrow \\mathcal{W}\\)</strong></p>\n<p>映射网络是一个 8 层全连接网络（每层 512 维，使用 Leaky ReLU 激活），将归一化的输入隐码 \\(\\mathbf{z}\\) 映射到中间潜空间 \\(\\mathcal{W}\\)。这一设计的关键洞察是：</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：中间潜空间 \\(\\mathcal{W}\\) 不需要服从任何固定分布，因此可以更自由地学习数据的真实因素分布，从而实现更好的解缠。</div>\n<p>实验表明（Table 3），在 \\(\\mathcal{W}\\) 空间中的感知路径长度（PPL）显著低于 \\(\\mathcal{Z}\\) 空间（160.6 vs 415.3，端点度量），说明 \\(\\mathcal{W}\\) 空间更加线性和解缠。</p>\n<p><strong>2. 自适应实例归一化（AdaIN）</strong></p>\n<p>AdaIN 是风格注入的核心操作，其公式为：</p>\n<p>$$\\text{AdaIN}(\\mathbf{x}_i, \\mathbf{y}) = y_{s,i} \\frac{\\mathbf{x}_i - \\mu(\\mathbf{x}_i)}{\\sigma(\\mathbf{x}_i)} + y_{b,i}$$</p>\n<p>其中 \\(\\mathbf{x}_i\\) 是第 \\(i\\) 个特征图，\\(\\mu(\\mathbf{x}_i)\\) 和 \\(\\sigma(\\mathbf{x}_i)\\) 分别是其空间均值和标准差，\\(y_{s,i}\\) 和 \\(y_{b,i}\\) 是从 \\(\\mathbf{w}\\) 经学习到的仿射变换得到的缩放和偏移参数。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：AdaIN 的归一化步骤会\"擦除\"前一层传递的风格信息（特征统计量），使得每一层的风格只由当前注入的 \\(\\mathbf{w}\\) 决定。这是实现逐层独立风格控制的关键。</div>\n<p><strong>3. 随机噪声注入</strong></p>\n<p>在每个卷积层之后、AdaIN 之前，StyleGAN 注入独立的逐像素高斯噪声：</p>\n<p>$$\\mathbf{x}' = \\mathbf{x} + s_i \\cdot \\mathbf{n}_i$$</p>\n<p>其中 \\(\\mathbf{n}_i\\) 是与特征图空间尺寸相同的单通道噪声图，\\(s_i\\) 是可学习的逐通道缩放因子。</p>\n<p>这一设计的动机是：传统生成器必须从隐码中\"发明\"伪随机数来生成头发丝、毛孔等随机细节，这既浪费网络容量，又容易产生重复纹理。显式噪声输入让网络可以轻松生成这些随机变化，且实验表明噪声仅影响局部随机细节，不影响全局语义（如身份、姿态）。</p>\n<p><strong>4. 风格混合正则化</strong></p>\n<p>训练时，以给定概率（如 50%）使用两个随机隐码 \\(\\mathbf{z}_1, \\mathbf{z}_2\\) 分别映射为 \\(\\mathbf{w}_1, \\mathbf{w}_2\\)，在随机选择的交叉层之前使用 \\(\\mathbf{w}_1\\)，之后使用 \\(\\mathbf{w}_2\\)。这迫使网络学习将不同尺度的风格视为独立因素，防止相邻层之间的风格关联。</p>\n<h5>多尺度风格控制实验</h5>\n<p><img alt=\"StyleGAN 生成的高质量人脸\" src=\"https://ar5iv.labs.arxiv.org/html/1812.04948/assets/figures/Quality/seed5.jpg\" />\n<em>图：StyleGAN 在 FFHQ 数据集上生成的 1024² 高质量人脸样本。</em></p>\n<p>风格混合实验（论文 Figure 3）揭示了不同层级风格的语义含义：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>层级</th>\n<th>分辨率</th>\n<th>控制内容</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>粗尺度（Coarse）</td>\n<td>\\(4^2\\)–\\(8^2\\)</td>\n<td>姿态、脸型、眼镜、年龄</td>\n</tr>\n<tr>\n<td>中尺度（Middle）</td>\n<td>\\(16^2\\)–\\(32^2\\)</td>\n<td>五官细节、发型、眼睛开合</td>\n</tr>\n<tr>\n<td>细尺度（Fine）</td>\n<td>\\(64^2\\)–\\(1024^2\\)</td>\n<td>颜色方案（肤色/发色）、微观结构</td>\n</tr>\n</tbody>\n</table></div>\n<h5>定量评估</h5>\n<p><strong>FID 逐步改进</strong>（Table 1，FFHQ 1024²）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>配置</th>\n<th>FID ↓</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>(A) Progressive GAN 基线</td>\n<td>8.04</td>\n</tr>\n<tr>\n<td>(B) + 调优（双线性上采样等）</td>\n<td>5.25</td>\n</tr>\n<tr>\n<td>(C) + 映射网络 &amp; 风格注入</td>\n<td>4.85</td>\n</tr>\n<tr>\n<td>(D) + 移除传统输入</td>\n<td>4.88</td>\n</tr>\n<tr>\n<td>(E) + 噪声输入</td>\n<td>4.42</td>\n</tr>\n<tr>\n<td>(F) + 混合正则化</td>\n<td><strong>4.40</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>解缠度量</strong>（Table 3）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>PPL (端点) ↓</th>\n<th>线性可分性 ↓</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>传统生成器 \\(\\mathcal{Z}\\)</td>\n<td>415.3</td>\n<td>10.78</td>\n</tr>\n<tr>\n<td>风格生成器 \\(\\mathcal{W}\\)</td>\n<td>376.6</td>\n<td>3.61</td>\n</tr>\n<tr>\n<td>+ 噪声输入 \\(\\mathcal{W}\\)</td>\n<td><strong>160.6</strong></td>\n<td><strong>3.54</strong></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键</strong>：PPL 衡量潜空间的感知平滑度——在潜空间中微小移动导致的感知变化越小，说明空间越线性、越解缠。\\(\\mathcal{W}\\) 空间的 PPL 远低于 \\(\\mathcal{Z}\\) 空间，验证了映射网络的解缠效果。</div>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>传统 GAN（ProGAN）</th>\n<th>StyleGAN</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>输入方式</td>\n<td>隐码直接输入第一层</td>\n<td>学习到的常量输入 + 风格注入</td>\n</tr>\n<tr>\n<td>隐空间</td>\n<td>单一空间 \\(\\mathcal{Z}\\)（服从高斯）</td>\n<td>双空间 \\(\\mathcal{Z} \\rightarrow \\mathcal{W}\\)（\\(\\mathcal{W}\\) 无分布约束）</td>\n</tr>\n<tr>\n<td>风格控制</td>\n<td>隐式，不可分离</td>\n<td>显式，逐层独立注入</td>\n</tr>\n<tr>\n<td>随机细节</td>\n<td>网络自行从隐码生成</td>\n<td>显式噪声输入，与语义解耦</td>\n</tr>\n<tr>\n<td>解缠程度</td>\n<td>低（PPL 415.3）</td>\n<td>高（PPL 160.6）</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "StyleGAN 中 AdaIN 归一化步骤的关键作用是什么？",
        "options": [
          "加速训练收敛",
          "擦除前一层的风格信息，使每层风格可独立控制",
          "增加模型参数量以提升表达能力",
          "将特征图压缩到固定范围以防止梯度爆炸"
        ],
        "answer": 1,
        "explain": "AdaIN 的归一化步骤会移除特征图的均值和方差（即前一层传递的风格统计量），然后用当前层的风格参数重新调制，从而实现每层风格的独立控制。"
      }
    },
    {
      "id": "vqgan",
      "num": 3,
      "name": "VQGAN",
      "fullName": "向量量化生成对抗网络 (VQ-GAN)",
      "year": "2021",
      "org": "CompVis",
      "parent": "vq-vae",
      "paperUrl": "https://arxiv.org/abs/2012.09841",
      "projectUrl": "",
      "category": "gan_vae",
      "motivation": "结合对抗训练提升离散表征质量",
      "summary": "VQGAN 提出用感知损失与对抗训练替代传统 VQ-VAE 的 L2 重建损失来学习高质量离散码本，并在压缩后的离散潜空间上训练自回归 Transformer，从而首次实现了百万像素级高分辨率图像的高保真合成。",
      "keyPoints": [
        "<strong>两阶段框架</strong>：第一阶段训练 VQGAN（CNN 编码器-解码器 + 向量量化码本），第二阶段在离散码本索引上训练自回归 Transformer",
        "<strong>感知损失 + 对抗训练</strong>：用 LPIPS 感知损失和 Patch-based 判别器替代 L2 重建损失，显著提升码本表征质量",
        "<strong>自适应权重 \\(\\lambda\\)</strong>：根据重建损失与 GAN 损失对解码器最后一层梯度的比值，动态平衡两个损失项",
        "<strong>向量量化码本</strong>：将连续特征离散化为 \\(|\\mathcal{Z}|=1024\\) 个码本条目，大幅压缩序列长度",
        "<strong>条件生成</strong>：将条件信息（类别标签、分割图等）也编码为离散索引，拼接在目标序列前，实现 decoder-only 条件生成",
        "<strong>滑动窗口注意力</strong>：训练时裁剪局部 patch，推理时用滑动窗口方式生成超高分辨率图像"
      ],
      "detail": "<h5>整体架构</h5>\n<p><img alt=\"VQGAN 架构图\" src=\"https://ar5iv.labs.arxiv.org/html/2012.09841/assets/x2.png\" />\n<em>图：VQGAN 两阶段训练流程。左侧为 CNN-based VQGAN 学习离散码本，右侧为 Transformer 在码本索引序列上进行自回归建模。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># ========== 第一阶段：训练 VQGAN ==========\n# 输入：图像 x, 编码器 E, 解码器 G, 码本 Z, 判别器 D\nz_e = E(x)                          # 编码: x → 连续特征 z_e ∈ R^{h×w×n_z}\nz_q = quantize(z_e, Z)              # 量化: 每个空间位置找码本中最近邻\nx_hat = G(z_q)                      # 解码: z_q → 重建图像\n\n# 计算损失\nL_rec = LPIPS(x, x_hat)             # 感知重建损失 (非 L2)\nL_VQ  = ||sg[z_e] - z_q||^2         # 码本对齐损失\n      + β * ||z_e - sg[z_q]||^2     # 承诺损失 (commitment)\nL_GAN = -log(D(x)) - log(1 - D(x_hat))  # 对抗损失\n\n# 自适应权重\nλ = ∇_{G_L}[L_rec] / (∇_{G_L}[L_GAN] + 1e-6)\n\n# 总损失\nL_total = L_rec + L_VQ + λ * L_GAN\n\n# ========== 第二阶段：训练 Transformer ==========\n# 输入：预训练的 E 和码本 Z, Transformer T\nz_q = quantize(E(x), Z)             # 编码 + 量化\ns = codebook_indices(z_q)           # 转为索引序列 s ∈ {0,...,1023}^{h×w}\ns = raster_scan(s)                  # 展平为 1D 序列\n\n# 自回归训练\nfor i in range(len(s)):\n    p(s_i | s_{&lt;i}) = T(s_{&lt;i})     # 预测下一个码本索引\nL_transformer = -Σ log p(s_i | s_{&lt;i})  # 交叉熵损失\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统 Transformer 在图像生成领域面临一个核心矛盾：<strong>Transformer 擅长建模长程依赖和全局组合结构，但其自注意力机制的计算复杂度为 \\(O(n^2)\\)，无法直接处理高分辨率图像的像素序列</strong>。例如，一张 \\(256 \\times 256\\) 的图像展平后有 65536 个像素，远超 Transformer 的可行序列长度。</p>\n<p>此前的 VQ-VAE 通过向量量化将图像压缩为离散码本索引序列，但其使用简单的 L2 重建损失，导致码本表征质量有限——要么需要非常大的码本（序列仍然很长），要么重建质量差。VQGAN 的核心洞察是：<strong>通过引入感知损失和对抗训练，可以在更高压缩比下保持优秀的重建质量</strong>，从而让 Transformer 在足够短的序列上工作。</p>\n<h5>核心机制一：感知损失 + 对抗训练的码本学习</h5>\n<p>VQGAN 的第一阶段训练一个编码器 \\(E\\)、解码器 \\(G\\)（即生成器）和离散码本 \\(\\mathcal{Z} = \\{z_k\\}_{k=1}^{K}\\)。编码器将输入图像 \\(x \\in \\mathbb{R}^{H \\times W \\times 3}\\) 映射为连续特征图 \\(\\hat{z} = E(x) \\in \\mathbb{R}^{h \\times w \\times n_z}\\)，其中 \\(h = H/2^m\\)，\\(m\\) 为下采样次数。</p>\n<p><strong>向量量化</strong>过程将每个空间位置的特征向量替换为码本中最近的条目：</p>\n<p>$$z_{\\mathbf{q}} = \\mathbf{q}(\\hat{z}) := \\arg\\min_{z_k \\in \\mathcal{Z}} \\|\\hat{z}_{ij} - z_k\\|$$</p>\n<p>传统 VQ-VAE 的损失函数为：</p>\n<p>$$\\mathcal{L}_{\\text{VQ}}(E, G, \\mathcal{Z}) = \\|x - \\hat{x}\\|^2 + \\|\\text{sg}[E(x)] - z_{\\mathbf{q}}\\|_2^2 + \\beta\\|E(x) - \\text{sg}[z_{\\mathbf{q}}]\\|_2^2$$</p>\n<p>其中 \\(\\text{sg}[\\cdot]\\) 为 stop-gradient 操作。VQGAN 的关键改进是<strong>将 L2 重建损失替换为感知损失 (LPIPS)</strong>，并加入 <strong>patch-based 判别器</strong> \\(D\\)：</p>\n<p>$$\\mathcal{L} = \\underbrace{\\mathcal{L}_{\\text{rec}}}_{\\text{LPIPS 感知损失}} + \\underbrace{\\mathcal{L}_{\\text{VQ}}}_{\\text{码本损失}} + \\underbrace{\\lambda \\cdot \\mathcal{L}_{\\text{GAN}}}_{\\text{对抗损失}}$$</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：L2 损失倾向于产生模糊的重建结果，因为它惩罚的是逐像素差异。感知损失在预训练 VGG 特征空间中度量差异，更符合人类视觉感知；判别器则进一步迫使重建结果具有真实的纹理细节。两者结合使得即使在高压缩比（如 \\(16 \\times\\) 下采样）下，重建图像仍然清晰锐利。</div>\n<h5>核心机制二：自适应权重 \\(\\lambda\\)</h5>\n<p>重建损失和 GAN 损失的量级差异很大，直接加权会导致训练不稳定。VQGAN 提出了一种<strong>自适应权重机制</strong>，根据两个损失对解码器最后一层 \\(G_L\\) 的梯度大小动态调整：</p>\n<p>$$\\lambda = \\frac{\\nabla_{G_L}[\\mathcal{L}_{\\text{rec}}]}{\\nabla_{G_L}[\\mathcal{L}_{\\text{GAN}}] + \\delta}$$</p>\n<p>其中 \\(\\delta = 10^{-6}\\) 保证数值稳定。</p>\n<div class=\"key-point\">💡 <strong>设计直觉</strong>：当 GAN 损失的梯度远大于重建损失时，\\(\\lambda\\) 自动减小，抑制判别器对生成器的过度影响；反之则增大 GAN 损失的权重。这使得训练过程中两个损失项始终保持平衡，无需手动调参。</div>\n<h5>核心机制三：Transformer 自回归建模</h5>\n<p>第二阶段冻结 VQGAN 的编码器和码本，将图像编码为离散索引序列 \\(s \\in \\{0, \\dots, |\\mathcal{Z}|-1\\}^{h \\times w}\\)。将 2D 索引图按光栅扫描顺序展平为 1D 序列后，训练一个 GPT-2 风格的自回归 Transformer 建模其分布：</p>\n<p>$$p(s) = \\prod_{i} p(s_i \\mid s_{<i})$$</p>\n<p>训练目标为最大化数据表示的对数似然：</p>\n<p>$$\\mathcal{L}_{\\text{Transformer}} = \\mathbb{E}_{x \\sim p(x)}\\left[-\\log p(s)\\right]$$</p>\n<p><strong>条件生成</strong>的实现非常优雅：将条件信息 \\(c\\)（如语义分割图）也通过另一个 VQGAN 编码为索引序列 \\(r\\)，然后将 \\(r\\) 拼接在 \\(s\\) 前面作为前缀。Transformer 只需学习 \\(p(s_i \\mid s_{<i}, r)\\)，这种 \"decoder-only\" 策略无需修改模型架构。</p>\n<h5>高分辨率生成：滑动窗口策略</h5>\n<p><img alt=\"滑动注意力窗口\" src=\"https://ar5iv.labs.arxiv.org/html/2012.09841/assets/x3.png\" />\n<em>图：滑动窗口注意力机制示意。训练时在局部 patch 上训练，推理时通过滑动窗口逐步生成超高分辨率图像。</em></p>\n<p>当目标分辨率超过 Transformer 的最大序列长度时，VQGAN 采用<strong>滑动窗口</strong>策略：训练时裁剪图像为固定大小的 patch，推理时按滑动窗口方式逐块生成，每个窗口可以利用前面已生成区域作为上下文。这使得 VQGAN 能够生成百万像素级的图像。</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>离散化</th>\n<th>重建损失</th>\n<th>全局建模</th>\n<th>高分辨率</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>VQ-VAE</td>\n<td>✅ 向量量化</td>\n<td>L2</td>\n<td>PixelCNN (局部)</td>\n<td>❌</td>\n</tr>\n<tr>\n<td>VQ-VAE-2</td>\n<td>✅ 多尺度 VQ</td>\n<td>L2</td>\n<td>多尺度 PixelCNN</td>\n<td>部分</td>\n</tr>\n<tr>\n<td><strong>VQGAN</strong></td>\n<td>✅ 向量量化</td>\n<td><strong>LPIPS + GAN</strong></td>\n<td><strong>Transformer (全局)</strong></td>\n<td><strong>✅ 滑动窗口</strong></td>\n</tr>\n<tr>\n<td>DALL-E (dVAE)</td>\n<td>✅ Gumbel-Softmax</td>\n<td>ELBO</td>\n<td>Transformer</td>\n<td>✅</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：VQGAN 的核心贡献不是 Transformer 本身，而是<strong>通过改进离散化阶段的训练目标（感知损失 + GAN），使得 Transformer 能够在更短的序列上工作</strong>。这是一种\"卷积归纳偏置\"与\"Transformer 表达能力\"的互补结合。</div>",
      "quiz": {
        "q": "VQGAN 相比 VQ-VAE 的核心改进是什么？",
        "options": [
          "使用更大的码本尺寸来提升重建质量",
          "用感知损失和对抗训练替代 L2 重建损失，提升离散码本的表征质量",
          "将 PixelCNN 替换为 Transformer 进行自回归建模",
          "引入多尺度向量量化机制"
        ],
        "answer": 1,
        "explain": "VQGAN 的核心创新在于用 LPIPS 感知损失 + patch-based 判别器替代 L2 损失来训练编码器-解码器和码本，使得在更高压缩比下仍能保持高质量重建，从而让 Transformer 在更短的序列上高效建模。"
      }
    },
    {
      "id": "ddpm",
      "num": 4,
      "name": "DDPM",
      "fullName": "去噪扩散概率模型 (Denoising Diffusion Probabilistic Models)",
      "year": "2020",
      "org": "UC Berkeley",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2006.11239",
      "projectUrl": "",
      "category": "diffusion",
      "motivation": "建立扩散模型与去噪分数匹配的统一框架",
      "summary": "DDPM 提出了一种基于参数化马尔可夫链的去噪扩散概率模型，通过将反向去噪过程重参数化为**预测噪声**的简化目标，在图像生成任务上取得了当时最优的 FID 分数，并揭示了扩散模型与去噪分数匹配 (Denoising Score Matching) 及 Langevin 动力学之间的深层等价关系。",
      "keyPoints": [
        "<strong>前向扩散过程</strong>：通过 \\(T=1000\\) 步的马尔可夫链逐步向数据添加高斯噪声，直至信号完全退化为标准正态分布",
        "<strong>闭式采样公式</strong>：利用 \\(\\bar{\\alpha}_t\\) 的累积乘积，可以从 \\(x_0\\) 一步跳转到任意时刻 \\(x_t\\)，无需逐步模拟前向过程",
        "<strong>噪声预测重参数化</strong>：将反向过程的均值预测转化为噪声 \\(\\varepsilon\\) 的预测，极大简化了训练目标",
        "<strong>简化损失函数 \\(L_{\\text{simple}}\\)</strong>：去掉 ELBO 中的权重系数，直接最小化预测噪声与真实噪声的 MSE，实验证明效果更优",
        "<strong>U-Net 骨干网络</strong>：采用基于 Wide ResNet 的 U-Net 架构，使用 Group Normalization、Transformer 正弦位置编码表示时间步、16×16 分辨率处加入自注意力",
        "<strong>线性噪声调度</strong>：\\(\\beta\\) 从 \\(10^{-4}\\) 线性增长到 \\(0.02\\)，保证每步扩散量相对于数据尺度足够小",
        "<strong>与分数匹配的等价性</strong>：简化损失等价于多尺度去噪分数匹配目标，采样过程等价于 Langevin 动力学",
        "<strong>渐进式有损压缩解释</strong>：反向过程可视为自回归解码的推广，模型自然支持渐进式图像解码",
        "<strong>SOTA 结果</strong>：CIFAR10 上 IS=9.46、FID=3.17（当时最优）；256×256 LSUN 上质量媲美 ProgressiveGAN"
      ],
      "detail": "<h5>核心框架示意图</h5>\n<p><img alt=\"DDPM 前向与反向过程的概率图模型\" src=\"https://ar5iv.labs.arxiv.org/html/2006.11239/assets/x2.png\" />\n<em>图：DDPM 的有向图模型。上方为前向扩散过程 \\(q(x_t|x_{t-1})\\)，逐步向数据注入噪声；下方为反向去噪过程 \\(p_\\theta(x_{t-1}|x_t)\\)，由神经网络参数化，逐步恢复数据。</em></p>\n<h5>算法伪代码</h5>\n<p><strong>训练算法 (Algorithm 1)</strong>：</p>\n<pre><code class=\"language-python\"># DDPM 训练\nwhile not converged:\n    x_0 ~ q(x_0)                          # 从数据集采样\n    t ~ Uniform({1, ..., T})               # 随机采样时间步\n    ε ~ N(0, I)                            # 采样标准高斯噪声\n    # 计算简化损失并梯度下降\n    loss = || ε - ε_θ(√ᾱ_t · x_0 + √(1-ᾱ_t) · ε, t) ||²\n    θ ← θ - η · ∇_θ loss\n</code></pre>\n<p><strong>采样算法 (Algorithm 2)</strong>：</p>\n<pre><code class=\"language-python\"># DDPM 采样（反向去噪）\nx_T ~ N(0, I)                              # 从纯噪声开始\nfor t = T, T-1, ..., 1:\n    z ~ N(0, I) if t &gt; 1 else z = 0\n    x_{t-1} = 1/√α_t · (x_t - (1-α_t)/√(1-ᾱ_t) · ε_θ(x_t, t)) + σ_t · z\nreturn x_0\n</code></pre>\n<h5>1. 动机与背景：为什么需要扩散模型？</h5>\n<p>在 DDPM 之前，深度生成模型主要包括 GAN、VAE、Flow 和自回归模型。GAN 虽然生成质量高，但存在训练不稳定和模式坍塌问题；VAE 的生成质量受限于后验近似的精度；Flow 模型需要严格的可逆架构约束。</p>\n<p>扩散概率模型（Diffusion Probabilistic Models）最早由 Sohl-Dickstein 等人在 2015 年提出，其核心思想来自非平衡热力学：通过一个固定的前向过程逐步破坏数据结构，再学习一个反向过程来恢复数据。然而早期工作的生成质量远不及 GAN。DDPM 的关键贡献在于：通过精心设计的参数化方式和简化的训练目标，首次证明扩散模型能够生成高质量图像，同时揭示了其与去噪分数匹配之间的深层联系。</p>\n<h5>2. 前向扩散过程：如何系统地破坏数据？</h5>\n<p>前向过程定义为一个固定的马尔可夫链，逐步向数据 \\(x_0\\) 添加高斯噪声：</p>\n<p>$$q(x_t | x_{t-1}) = \\mathcal{N}(x_t;\\, \\sqrt{1-\\beta_t}\\, x_{t-1},\\, \\beta_t \\mathbf{I})$$</p>\n<p>其中 \\(\\beta_t \\in (0, 1)\\) 是预定义的噪声调度（variance schedule）。DDPM 使用从 \\(\\beta_1 = 10^{-4}\\) 到 \\(\\beta_T = 0.02\\) 的<strong>线性调度</strong>，共 \\(T = 1000\\) 步。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：由于高斯分布的可加性，可以直接从 \\(x_0\\) 一步计算任意时刻的 \\(x_t\\)：</div>\n<p>$$q(x_t | x_0) = \\mathcal{N}(x_t;\\, \\sqrt{\\bar{\\alpha}_t}\\, x_0,\\, (1-\\bar{\\alpha}_t)\\mathbf{I})$$</p>\n<p>其中 \\(\\alpha_t = 1 - \\beta_t\\)，\\(\\bar{\\alpha}_t = \\prod_{s=1}^{t} \\alpha_s\\)。这意味着：</p>\n<p>$$x_t = \\sqrt{\\bar{\\alpha}_t}\\, x_0 + \\sqrt{1-\\bar{\\alpha}_t}\\, \\varepsilon, \\quad \\varepsilon \\sim \\mathcal{N}(0, \\mathbf{I})$$</p>\n<p>当 \\(t\\) 足够大时，\\(\\bar{\\alpha}_T \\approx 0\\)，\\(x_T\\) 近似服从标准正态分布，数据信息几乎完全丢失。</p>\n<h5>3. 反向去噪过程：如何从噪声恢复数据？</h5>\n<p>反向过程同样建模为马尔可夫链，但由神经网络参数化：</p>\n<p>$$p_\\theta(x_{t-1} | x_t) = \\mathcal{N}(x_{t-1};\\, \\mu_\\theta(x_t, t),\\, \\sigma_t^2 \\mathbf{I})$$</p>\n<p><strong>噪声预测重参数化</strong>是 DDPM 最核心的设计。作者没有直接让网络预测 \\(\\mu_\\theta\\)，而是让网络预测添加的噪声 \\(\\varepsilon_\\theta(x_t, t)\\)，然后通过以下公式计算均值：</p>\n<p>$$\\mu_\\theta(x_t, t) = \\frac{1}{\\sqrt{\\alpha_t}} \\left( x_t - \\frac{1-\\alpha_t}{\\sqrt{1-\\bar{\\alpha}_t}}\\, \\varepsilon_\\theta(x_t, t) \\right)$$</p>\n<div class=\"key-point\">💡 <strong>直觉理解</strong>：网络的任务是\"看到一张加了噪声的图片 \\(x_t\\)，猜测其中的噪声成分 \\(\\varepsilon\\)\"。这比直接预测去噪后的图像更容易学习，因为噪声的统计特性（标准正态）是已知的。</div>\n<p>对于方差 \\(\\sigma_t^2\\)，DDPM 将其固定为 \\(\\beta_t\\)（或 \\(\\tilde{\\beta}_t = \\frac{1-\\bar{\\alpha}_{t-1}}{1-\\bar{\\alpha}_t}\\beta_t\\)），实验表明两种选择效果相近。</p>\n<h5>4. 简化损失函数：从 ELBO 到 \\(L_{\\text{simple}}\\)</h5>\n<p>标准的变分下界（ELBO）可以分解为多个 KL 散度项之和：</p>\n<p>$$L = \\mathbb{E}_q\\Big[-\\log p_\\theta(x_0|x_1) + \\sum_{t=2}^{T} D_{\\text{KL}}(q(x_{t-1}|x_t,x_0) \\| p_\\theta(x_{t-1}|x_t)) + D_{\\text{KL}}(q(x_T|x_0) \\| p(x_T))\\Big]$$</p>\n<p>将噪声预测参数化代入后，每个 KL 散度项都简化为预测噪声与真实噪声之间的加权 MSE。DDPM 进一步发现，<strong>去掉权重系数</strong>后的简化目标在实践中效果更好：</p>\n<p>$$L_{\\text{simple}} = \\mathbb{E}_{t, x_0, \\varepsilon}\\Big[\\|\\varepsilon - \\varepsilon_\\theta(\\sqrt{\\bar{\\alpha}_t}\\, x_0 + \\sqrt{1-\\bar{\\alpha}_t}\\, \\varepsilon,\\, t)\\|^2\\Big]$$</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：\\(L_{\\text{simple}}\\) 虽然不是严格的变分下界，但它对小 \\(t\\)（低噪声）的去噪任务赋予了更高权重，这恰好有利于生成质量。论文实验证实，使用 \\(L_{\\text{simple}}\\) 的 FID 分数优于使用完整加权 ELBO。</div>\n<h5>5. 与去噪分数匹配的等价关系</h5>\n<p>DDPM 揭示了一个深刻的联系：简化损失 \\(L_{\\text{simple}}\\) 本质上等价于<strong>多尺度去噪分数匹配</strong>（Denoising Score Matching）。具体而言，噪声预测网络 \\(\\varepsilon_\\theta(x_t, t)\\) 与数据分布的分数函数（score function）\\(\\nabla_{x_t} \\log q(x_t)\\) 之间存在如下关系：</p>\n<p>$$\\varepsilon_\\theta(x_t, t) \\approx -\\sqrt{1-\\bar{\\alpha}_t}\\, \\nabla_{x_t} \\log q(x_t)$$</p>\n<p>因此，DDPM 的采样过程可以理解为一种离散化的 <strong>Langevin 动力学</strong>：每一步去噪都沿着数据分布的梯度方向移动，同时注入适量随机噪声以保持多样性。这一发现将扩散模型与基于分数的生成模型（Score-based Generative Models）统一在同一框架下。</p>\n<h5>6. 网络架构与实验设置</h5>\n<p>DDPM 采用基于 PixelCNN++ 骨干的 <strong>U-Net</strong> 架构，具体设计包括：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>组件</th>\n<th>设计选择</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>基础架构</td>\n<td>U-Net（基于 Wide ResNet）</td>\n</tr>\n<tr>\n<td>归一化</td>\n<td>Group Normalization（替代 Weight Normalization）</td>\n</tr>\n<tr>\n<td>时间编码</td>\n<td>Transformer 正弦位置编码</td>\n</tr>\n<tr>\n<td>注意力机制</td>\n<td>16×16 分辨率处使用自注意力</td>\n</tr>\n<tr>\n<td>分辨率层级</td>\n<td>32×32 模型使用 4 级（32→4），256×256 模型使用 6 级</td>\n</tr>\n<tr>\n<td>正则化</td>\n<td>CIFAR10 使用 dropout=0.1</td>\n</tr>\n</tbody>\n</table></div>\n<p>时间步 \\(t\\) 通过正弦位置编码注入网络，使得同一组参数可以在所有时间步之间共享，网络能够根据 \\(t\\) 的大小自适应地调整去噪策略。</p>\n<p><strong>实验结果</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>数据集</th>\n<th>IS ↑</th>\n<th>FID ↓</th>\n<th>备注</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>CIFAR10 (无条件)</td>\n<td>9.46</td>\n<td><strong>3.17</strong></td>\n<td>当时 SOTA</td>\n</tr>\n<tr>\n<td>LSUN Bedroom 256</td>\n<td>—</td>\n<td>—</td>\n<td>质量媲美 ProgressiveGAN</td>\n</tr>\n<tr>\n<td>LSUN Church 256</td>\n<td>—</td>\n<td>—</td>\n<td>高质量无条件生成</td>\n</tr>\n<tr>\n<td>CelebA-HQ 256</td>\n<td>—</td>\n<td>—</td>\n<td>高保真人脸生成</td>\n</tr>\n</tbody>\n</table></div>\n<h5>7. 与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>GAN</th>\n<th>VAE</th>\n<th>Flow</th>\n<th>DDPM</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>训练稳定性</td>\n<td>差（对抗训练）</td>\n<td>好</td>\n<td>好</td>\n<td><strong>好（简单 MSE 损失）</strong></td>\n</tr>\n<tr>\n<td>生成质量</td>\n<td>高</td>\n<td>中</td>\n<td>中</td>\n<td><strong>高</strong></td>\n</tr>\n<tr>\n<td>模式覆盖</td>\n<td>差（模式坍塌）</td>\n<td>好</td>\n<td>好</td>\n<td><strong>好</strong></td>\n</tr>\n<tr>\n<td>似然评估</td>\n<td>不支持</td>\n<td>下界</td>\n<td>精确</td>\n<td><strong>下界</strong></td>\n</tr>\n<tr>\n<td>采样速度</td>\n<td>快（单步）</td>\n<td>快（单步）</td>\n<td>快（单步）</td>\n<td><strong>慢（T=1000 步）</strong></td>\n</tr>\n<tr>\n<td>架构约束</td>\n<td>需判别器</td>\n<td>编解码器</td>\n<td>可逆网络</td>\n<td><strong>无特殊约束</strong></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：DDPM 的主要局限在于采样速度——需要 1000 步迭代才能生成一张图片。这一问题后来被 DDIM、DPM-Solver 等加速采样方法以及 Latent Diffusion 等潜空间方法所缓解。</div>",
      "quiz": {
        "q": "DDPM 中简化损失函数 L_simple 的优化目标是什么？",
        "options": [
          "最小化生成图像与真实图像的像素级 MSE",
          "最小化预测噪声 ε_θ 与实际添加噪声 ε 之间的 MSE",
          "最大化反向过程的对数似然",
          "最小化前向过程与反向过程的 KL 散度"
        ],
        "answer": 1,
        "explain": "DDPM 将反向过程参数化为噪声预测网络，L_simple = E[||ε - ε_θ(x_t, t)||²]，即直接最小化网络预测的噪声与前向过程中实际添加的高斯噪声之间的均方误差。"
      }
    },
    {
      "id": "score-sde",
      "num": 5,
      "name": "Score-SDE",
      "fullName": "基于分数的随机微分方程 (Score-based SDE)",
      "year": "2020",
      "org": "Stanford",
      "parent": "ddpm",
      "paperUrl": "https://arxiv.org/abs/2011.13456",
      "projectUrl": "",
      "category": "diffusion",
      "motivation": "将扩散模型统一到连续时间SDE框架",
      "summary": "Score-SDE 提出了一个基于随机微分方程（SDE）的统一框架，将 SMLD（NCSN）和 DDPM 等离散扩散模型推广到连续时间设定，通过训练时间依赖的分数模型估计逆向 SDE，实现了灵活的采样策略（Predictor-Corrector 采样、概率流 ODE）和精确的似然计算，在 CIFAR-10 上取得了当时最优的 FID 2.20。",
      "keyPoints": [
        "<strong>统一框架</strong>：将 SMLD（Score Matching with Langevin Dynamics）和 DDPM（Denoising Diffusion Probabilistic Models）统一为连续时间 SDE 的离散化特例",
        "<strong>三种 SDE 变体</strong>：VE SDE（方差爆炸，对应 SMLD）、VP SDE（方差保持，对应 DDPM）、sub-VP SDE（方差有界，似然性能更优）",
        "<strong>连续时间分数匹配训练</strong>：通过加权去噪分数匹配目标（Eq 7）训练时间依赖的分数网络 \\(\\mathbf{s}_\\theta(\\mathbf{x}, t)\\)",
        "<strong>Predictor-Corrector (PC) 采样</strong>：将数值 SDE 求解器（Predictor）与基于分数的 MCMC 方法（Corrector，如 Langevin MCMC）结合，统一并改进了已有采样方法",
        "<strong>概率流 ODE</strong>：将逆向 SDE 转化为等价的确定性 ODE，支持快速自适应步长采样、精确似然计算和可逆的隐空间编码",
        "<strong>可控生成</strong>：通过无条件分数模型即可高效估计条件逆向 SDE，实现类别条件生成、图像修复和着色等任务",
        "<strong>SOTA 结果</strong>：CIFAR-10 无条件生成 FID 2.20（VE SDE + PC 采样），NLL 2.99 bits/dim（sub-VP SDE + 概率流 ODE）"
      ],
      "detail": "<p><img alt=\"Score-SDE 框架总览\" src=\"https://ar5iv.labs.arxiv.org/html/2011.13456/assets/x2.png\" />\n<em>图：Score-SDE 框架总览。通过前向 SDE 将数据逐步扩散为噪声，再通过逆向 SDE（或概率流 ODE）从噪声生成数据。分数函数 \\(\\nabla_\\mathbf{x}\\log p_t(\\mathbf{x})\\) 由神经网络估计。</em></p>\n<p><img alt=\"逆向 SDE 示意\" src=\"https://ar5iv.labs.arxiv.org/html/2011.13456/assets/x1.png\" />\n<em>图：求解逆向 SDE 即可得到基于分数的生成模型。前向 SDE 将数据变换为简单噪声分布，逆向过程需要每个时间步的分数函数。</em></p>\n<pre><code class=\"language-python\"># Score-SDE 训练与 PC 采样伪代码\n\n# === 训练阶段 ===\n# 训练时间依赖的分数模型 s_θ(x, t) ≈ ∇_x log p_t(x)\nfor each training step:\n    x_0 ~ p_data                          # 采样真实数据\n    t ~ Uniform(0, T)                     # 均匀采样时间\n    x_t ~ p_{0t}(x_t | x_0)              # 根据前向 SDE 转移核采样噪声数据\n    # 对于 VE SDE: x_t = x_0 + σ(t) * z,  z ~ N(0, I)\n    # 对于 VP SDE: x_t = √(ᾱ_t) * x_0 + √(1-ᾱ_t) * z\n    loss = λ(t) * ||s_θ(x_t, t) - ∇_{x_t} log p_{0t}(x_t|x_0)||²\n    optimizer.step(loss)\n\n# === Predictor-Corrector 采样 ===\nx_T ~ p_T (prior noise distribution)     # 从先验分布采样\nfor t in reversed(time_steps):            # 从 T 到 0\n    # Predictor: 数值 SDE 求解器（如 Euler-Maruyama / 逆扩散）\n    x_t = sde_solver_step(x_{t+Δt}, s_θ, t)\n    # Corrector: 基于分数的 MCMC（如 Langevin 动力学）\n    for j in range(n_corrector_steps):\n        z ~ N(0, I)\n        x_t = x_t + ε * s_θ(x_t, t) + √(2ε) * z\nreturn x_0\n</code></pre>\n<h5>动机与背景</h5>\n<p>在 Score-SDE 之前，基于分数的生成模型主要有两大流派：</p>\n<ol>\n<li><strong>SMLD / NCSN</strong>（Song &amp; Ermon, 2019）：使用多个递增的噪声尺度 \\(\\{\\sigma_i\\}_{i=1}^N\\) 对数据加噪，训练分数网络后用退火 Langevin 动力学采样。</li>\n<li><strong>DDPM</strong>（Ho et al., 2020）：使用固定的噪声调度 \\(\\{\\beta_i\\}_{i=1}^N\\)，通过去噪过程逐步恢复数据。</li>\n</ol>\n<p>这两类方法虽然都可以被理解为\"分数匹配 + 迭代去噪\"，但它们使用不同的噪声调度、不同的训练目标和不同的采样算法，缺乏统一的理论框架。此外，离散的噪声尺度数量 \\(N\\) 是一个需要手动调节的超参数，且采样步数与 \\(N\\) 绑定，限制了灵活性。</p>\n<p>Score-SDE 的核心洞察是：<strong>当噪声尺度数量 \\(N \\to \\infty\\) 时，这些离散加噪过程收敛到连续时间的随机微分方程（SDE）</strong>。这一视角不仅统一了两类方法，还打开了利用 SDE 理论工具的大门。</p>\n<h5>核心机制：前向与逆向 SDE</h5>\n<p><strong>前向 SDE</strong> 描述了数据到噪声的扩散过程：</p>\n<p>$$\\mathrm{d}\\mathbf{x} = \\mathbf{f}(\\mathbf{x}, t)\\mathrm{d}t + g(t)\\mathrm{d}\\mathbf{w}$$</p>\n<p>其中 \\(\\mathbf{f}(\\mathbf{x}, t)\\) 是漂移系数，\\(g(t)\\) 是扩散系数，\\(\\mathbf{w}\\) 是标准维纳过程。该 SDE 将数据分布 \\(p_0\\) 逐步转化为先验分布 \\(p_T\\)（通常为高斯分布）。</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：前向 SDE 不含可训练参数，完全由噪声调度预先确定。不同的噪声调度对应不同的 SDE。</div>\n<p><strong>逆向 SDE</strong>（Anderson, 1982）给出了从噪声到数据的生成过程：</p>\n<p>$$\\mathrm{d}\\mathbf{x} = \\left[\\mathbf{f}(\\mathbf{x}, t) - g(t)^2 \\nabla_\\mathbf{x}\\log p_t(\\mathbf{x})\\right]\\mathrm{d}t + g(t)\\mathrm{d}\\bar{\\mathbf{w}}$$</p>\n<p>其中 \\(\\bar{\\mathbf{w}}\\) 是逆向维纳过程，\\(\\nabla_\\mathbf{x}\\log p_t(\\mathbf{x})\\) 是时间 \\(t\\) 处边际分布的<strong>分数函数</strong>（score function）。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：逆向 SDE 的唯一未知量就是分数函数 \\(\\nabla_\\mathbf{x}\\log p_t(\\mathbf{x})\\)，这正是神经网络需要学习的目标。</div>\n<h5>三种 SDE 实例化</h5>\n<p>论文展示了 SMLD 和 DDPM 分别对应两种不同 SDE 的离散化，并提出了第三种变体：</p>\n<p><strong>1. VE SDE（方差爆炸，对应 SMLD/NCSN）：</strong></p>\n<p>$$\\mathrm{d}\\mathbf{x} = \\sqrt{\\frac{\\mathrm{d}[\\sigma^2(t)]}{\\mathrm{d}t}}\\,\\mathrm{d}\\mathbf{w}$$</p>\n<p>该 SDE 没有漂移项（\\(\\mathbf{f} = \\mathbf{0}\\)），仅有扩散项。随着 \\(t\\) 增大，过程的方差持续增长（\"爆炸\"）。</p>\n<p><strong>2. VP SDE（方差保持，对应 DDPM）：</strong></p>\n<p>$$\\mathrm{d}\\mathbf{x} = -\\frac{1}{2}\\beta(t)\\mathbf{x}\\,\\mathrm{d}t + \\sqrt{\\beta(t)}\\,\\mathrm{d}\\mathbf{w}$$</p>\n<p>该 SDE 包含一个将 \\(\\mathbf{x}\\) 向零收缩的漂移项，使得过程方差在初始分布为单位方差时保持为 1。</p>\n<p><strong>3. sub-VP SDE（方差有界，新提出）：</strong></p>\n<p>$$\\mathrm{d}\\mathbf{x} = -\\frac{1}{2}\\beta(t)\\mathbf{x}\\,\\mathrm{d}t + \\sqrt{\\beta(t)\\left(1 - e^{-2\\int_0^t \\beta(s)\\mathrm{d}s}\\right)}\\,\\mathrm{d}\\mathbf{w}$$</p>\n<p>sub-VP SDE 的方差在每个中间时间步都被 VP SDE 的方差所界定，在似然估计任务上表现更优。</p>\n<h5>训练目标：连续时间分数匹配</h5>\n<p>训练目标是 SMLD 和 DDPM 损失函数的连续推广：</p>\n<p>$$\\boldsymbol{\\theta}^* = \\arg\\min_{\\boldsymbol{\\theta}} \\mathbb{E}_t\\left\\{\\lambda(t)\\,\\mathbb{E}_{\\mathbf{x}(0)}\\mathbb{E}_{\\mathbf{x}(t)|\\mathbf{x}(0)}\\left[\\left\\|\\mathbf{s}_{\\boldsymbol{\\theta}}(\\mathbf{x}(t), t) - \\nabla_{\\mathbf{x}(t)}\\log p_{0t}(\\mathbf{x}(t)|\\mathbf{x}(0))\\right\\|_2^2\\right]\\right\\}$$</p>\n<p>其中 \\(t \\sim \\text{Uniform}(0, T)\\)，\\(\\lambda(t)\\) 为正权重函数。对于仿射漂移的 SDE（如 VE/VP），转移核 \\(p_{0t}(\\mathbf{x}(t)|\\mathbf{x}(0))\\) 为高斯分布，其分数有解析形式，训练可高效进行。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：当 \\(\\lambda(t) = g(t)^2\\) 时，训练目标等价于 ELBO（证据下界）的加权形式，可用于似然训练。</div>\n<h5>Predictor-Corrector 采样</h5>\n<p>PC 采样是 Score-SDE 的核心创新之一，将两类操作交替执行：</p>\n<ul>\n<li><strong>Predictor（预测器）</strong>：使用数值 SDE 求解器（如 Euler-Maruyama、逆扩散求解器、概率流 ODE 求解器）估计下一时间步的样本。</li>\n<li><strong>Corrector（校正器）</strong>：使用基于分数的 MCMC 方法（如 Langevin 动力学）校正当前样本的边际分布。</li>\n</ul>\n<p>这一框架统一了已有方法：SMLD 使用恒等预测器 + 退火 Langevin 校正器；DDPM 使用祖先采样预测器 + 恒等校正器。PC 采样通过组合两者，在相同计算量下显著提升了生成质量（CIFAR-10 FID 从 ~4.98 降至 ~2.20）。</p>\n<h5>概率流 ODE</h5>\n<p>论文证明，对于任意前向 SDE，存在一个确定性的常微分方程（ODE），其边际分布与 SDE 完全一致：</p>\n<p>$$\\mathrm{d}\\mathbf{x} = \\left[\\mathbf{f}(\\mathbf{x}, t) - \\frac{1}{2}g(t)^2\\nabla_\\mathbf{x}\\log p_t(\\mathbf{x})\\right]\\mathrm{d}t$$</p>\n<p>这一概率流 ODE 带来了多项独特能力：\n1. <strong>快速采样</strong>：可使用自适应步长 ODE 求解器（如 RK45），大幅减少函数评估次数\n2. <strong>精确似然计算</strong>：利用连续正则化流的瞬时变量公式，可精确计算 \\(\\log p_0(\\mathbf{x})\\)\n3. <strong>可逆编码</strong>：数据与隐空间之间的映射是确定性且可逆的，支持隐空间插值和数据操控</p>\n<p><img alt=\"概率流 ODE 快速采样\" src=\"https://ar5iv.labs.arxiv.org/html/2011.13456/assets/x3.png\" />\n<em>图：概率流 ODE 支持自适应步长的快速采样，同时保持与 SDE 采样相同的边际分布。</em></p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>SMLD/NCSN</th>\n<th>DDPM</th>\n<th>Score-SDE</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>时间设定</td>\n<td>离散（N 个噪声尺度）</td>\n<td>离散（N 步）</td>\n<td>连续（SDE）</td>\n</tr>\n<tr>\n<td>噪声调度</td>\n<td>手动设定 \\(\\sigma_i\\)</td>\n<td>手动设定 \\(\\beta_i\\)</td>\n<td>连续函数 \\(\\sigma(t)\\) 或 \\(\\beta(t)\\)</td>\n</tr>\n<tr>\n<td>采样方法</td>\n<td>退火 Langevin</td>\n<td>祖先采样</td>\n<td>PC 采样 / 概率流 ODE / 通用 SDE 求解器</td>\n</tr>\n<tr>\n<td>似然计算</td>\n<td>不支持</td>\n<td>仅 ELBO</td>\n<td>精确似然（通过概率流 ODE）</td>\n</tr>\n<tr>\n<td>采样步数</td>\n<td>与 N 绑定</td>\n<td>与 N 绑定</td>\n<td>灵活（自适应步长）</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>核心优势</strong>：Score-SDE 将离散模型统一到连续框架后，不仅继承了两类方法的优点，还解锁了概率流 ODE、精确似然计算、自适应采样等此前不可能的能力。</div>",
      "quiz": {
        "q": "Score-SDE 框架中，VE SDE 和 VP SDE 分别对应哪两种离散扩散模型？",
        "options": [
          "VE 对应 DDPM，VP 对应 SMLD",
          "VE 对应 SMLD/NCSN，VP 对应 DDPM",
          "VE 对应 VAE，VP 对应 GAN",
          "VE 和 VP 都对应 DDPM 的不同变体"
        ],
        "answer": 1,
        "explain": "VE SDE（方差爆炸）的离散化对应 SMLD/NCSN 的多尺度噪声扰动，VP SDE（方差保持）的离散化对应 DDPM 的噪声调度，这是论文的核心统一结论。"
      }
    },
    {
      "id": "ddim",
      "num": 6,
      "name": "DDIM",
      "fullName": "去噪扩散隐式模型 (Denoising Diffusion Implicit Models)",
      "year": "2021",
      "org": "Stanford",
      "parent": "ddpm",
      "paperUrl": "https://arxiv.org/abs/2010.02502",
      "projectUrl": "",
      "category": "diffusion",
      "motivation": "非马尔可夫确定性采样，压缩至20-100步",
      "summary": "DDIM 提出了一类非马尔可夫扩散过程，其训练目标与 DDPM 完全一致，但采样过程可以是确定性的，从而支持在远少于训练步数的情况下高质量生成图像，实现 10×–50× 的加速，同时获得语义有意义的隐空间。",
      "keyPoints": [
        "<strong>非马尔可夫前向过程</strong>：构造了一族参数化的非马尔可夫前向过程 \\(q_\\sigma(\\mathbf{x}_{1:T}|\\mathbf{x}_0)\\)，其边缘分布 \\(q_\\sigma(\\mathbf{x}_t|\\mathbf{x}_0)\\) 与 DDPM 完全相同",
        "<strong>统一采样公式</strong>：通过参数 \\(\\sigma\\) 控制采样随机性，\\(\\sigma=0\\) 为确定性 DDIM，特定 \\(\\sigma\\) 值恢复 DDPM",
        "<strong>确定性生成</strong>：当 \\(\\sigma=0\\) 时，生成过程从 \\(\\mathbf{x}_T\\) 到 \\(\\mathbf{x}_0\\) 完全确定，同一隐变量始终生成相同图像",
        "<strong>加速采样</strong>：利用时间步子序列 \\(\\tau \\subset [1,\\ldots,T]\\)，以 \\(S \\ll T\\) 步完成采样，无需重新训练",
        "<strong>隐空间语义性</strong>：确定性映射使隐空间具有语义插值能力，支持高层特征的平滑过渡",
        "<strong>训练目标不变</strong>：与 DDPM 使用完全相同的训练目标 \\(L_1\\)，已训练好的 DDPM 模型可直接用于 DDIM 采样",
        "<strong>与 Neural ODE 的联系</strong>：当步数趋于无穷时，DDIM 的确定性采样过程对应一个 Neural ODE"
      ],
      "detail": "<h5>核心框架图</h5>\n<p><img alt=\"DDPM 马尔可夫前向过程\" src=\"https://ar5iv.labs.arxiv.org/html/2010.02502/assets/x1.png\" />\n<img alt=\"DDIM 非马尔可夫前向过程\" src=\"https://ar5iv.labs.arxiv.org/html/2010.02502/assets/x2.png\" /></p>\n<p><em>图 1：左图为 DDPM 的马尔可夫前向过程，每一步仅依赖前一步；右图为 DDIM 的非马尔可夫前向过程，每一步同时依赖 \\(\\mathbf{x}_0\\) 和前一步，但边缘分布保持不变。</em></p>\n<p><img alt=\"加速采样图模型\" src=\"https://ar5iv.labs.arxiv.org/html/2010.02502/assets/x3.png\" /></p>\n<p><em>图 2：加速采样的图模型。通过选取时间步子序列 \\(\\tau=[1,3]\\)，跳过中间步骤直接生成，大幅减少采样步数。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># DDIM 采样算法\n# 输入：训练好的噪声预测网络 ε_θ，噪声调度 α_1:T，采样子序列 τ，随机性参数 η\n# 输出：生成样本 x_0\n\nimport torch\n\ndef ddim_sample(eps_model, alphas, tau, eta=0.0):\n    &quot;&quot;&quot;\n    eps_model: 训练好的噪声预测网络 ε_θ(x_t, t)\n    alphas:    累积噪声调度 α_t = ∏_{i=1}^{t} (1 - β_i)\n    tau:       采样时间步子序列，如 [1, 21, 41, ..., 981]\n    eta:       随机性控制参数，0=确定性DDIM，1=DDPM\n    &quot;&quot;&quot;\n    # 从标准高斯采样初始噪声\n    x = torch.randn_like(x_0_shape)  # x_T ~ N(0, I)\n\n    for i in reversed(range(len(tau))):\n        t = tau[i]\n        t_prev = tau[i-1] if i &gt; 0 else 0\n\n        alpha_t = alphas[t]\n        alpha_prev = alphas[t_prev] if t_prev &gt; 0 else 1.0\n\n        # 1. 预测噪声\n        eps_pred = eps_model(x, t)\n\n        # 2. 计算 σ_t（控制随机性）\n        sigma_t = eta * ((1 - alpha_prev) / (1 - alpha_t) * (1 - alpha_t / alpha_prev)).sqrt()\n\n        # 3. 预测 x_0\n        pred_x0 = (x - (1 - alpha_t).sqrt() * eps_pred) / alpha_t.sqrt()\n\n        # 4. 计算&quot;指向 x_t 方向&quot;的分量\n        dir_xt = (1 - alpha_prev - sigma_t**2).sqrt() * eps_pred\n\n        # 5. 随机噪声项\n        noise = torch.randn_like(x) if t_prev &gt; 0 else 0\n\n        # 6. DDIM 更新\n        x = alpha_prev.sqrt() * pred_x0 + dir_xt + sigma_t * noise\n\n    return x\n</code></pre>\n<h5>动机与背景</h5>\n<p>DDPM（Denoising Diffusion Probabilistic Models）在图像生成质量上取得了与 GAN 可比的效果，但其采样过程需要模拟完整的马尔可夫链（通常 \\(T=1000\\) 步），导致生成速度极慢——在单张 Nvidia 2080 Ti GPU 上生成 50,000 张 32×32 图像需要约 20 小时。这一瓶颈严重限制了扩散模型的实际应用。</p>\n<p>DDPM 采样慢的根本原因在于：其前向过程被定义为马尔可夫链，逆过程也必须逐步反转每一个时间步。然而，DDIM 的作者发现了一个关键洞察——<strong>DDPM 的训练目标 \\(L_1\\) 实际上只依赖于边缘分布 \\(q(\\mathbf{x}_t|\\mathbf{x}_0)\\)，而非联合分布 \\(q(\\mathbf{x}_{1:T}|\\mathbf{x}_0)\\)</strong>。这意味着存在无穷多种不同的前向过程（包括非马尔可夫的），它们共享相同的边缘分布，因此使用相同的训练目标。</p>\n<h5>核心机制：非马尔可夫前向过程</h5>\n<p><strong>1. DDPM 的边缘分布回顾</strong></p>\n<p>在 DDPM 中，前向过程的边缘分布为：</p>\n<p>$$q(\\mathbf{x}_t | \\mathbf{x}_0) = \\mathcal{N}(\\sqrt{\\alpha_t}\\,\\mathbf{x}_0,\\;(1-\\alpha_t)\\mathbf{I})$$</p>\n<p>其中 \\(\\alpha_t = \\prod_{i=1}^{t}(1-\\beta_i)\\) 是累积噪声调度参数。</p>\n<p><strong>2. 非马尔可夫前向过程的构造</strong></p>\n<p>DDIM 定义了一族由实数向量 \\(\\sigma \\in \\mathbb{R}_{\\geq 0}^T\\) 索引的推断分布：</p>\n<p>$$q_\\sigma(\\mathbf{x}_{1:T}|\\mathbf{x}_0) = q_\\sigma(\\mathbf{x}_T|\\mathbf{x}_0) \\prod_{t=2}^{T} q_\\sigma(\\mathbf{x}_{t-1}|\\mathbf{x}_t, \\mathbf{x}_0)$$</p>\n<p>其中：</p>\n<p>$$q_\\sigma(\\mathbf{x}_{t-1}|\\mathbf{x}_t, \\mathbf{x}_0) = \\mathcal{N}\\!\\left(\\sqrt{\\alpha_{t-1}}\\,\\mathbf{x}_0 + \\sqrt{1-\\alpha_{t-1}-\\sigma_t^2}\\cdot\\frac{\\mathbf{x}_t - \\sqrt{\\alpha_t}\\,\\mathbf{x}_0}{\\sqrt{1-\\alpha_t}},\\;\\sigma_t^2\\mathbf{I}\\right)$$</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：这个前向过程不再是马尔可夫的——\\(q_\\sigma(\\mathbf{x}_{t-1}|\\mathbf{x}_t, \\mathbf{x}_0)\\) 同时依赖于 \\(\\mathbf{x}_t\\) 和 \\(\\mathbf{x}_0\\)。但通过精心设计均值和方差的参数化，可以证明其边缘分布仍然满足 \\(q_\\sigma(\\mathbf{x}_t|\\mathbf{x}_0) = \\mathcal{N}(\\sqrt{\\alpha_t}\\,\\mathbf{x}_0, (1-\\alpha_t)\\mathbf{I})\\)，与 DDPM 完全一致。</div>\n<p><strong>3. 统一采样公式（核心公式）</strong></p>\n<p>由于训练目标不变，已训练好的噪声预测网络 \\(\\epsilon_\\theta\\) 可以直接复用。对应的生成过程更新规则为：</p>\n<p>$$\\mathbf{x}_{t-1} = \\underbrace{\\sqrt{\\alpha_{t-1}} \\cdot \\frac{\\mathbf{x}_t - \\sqrt{1-\\alpha_t}\\,\\epsilon_\\theta(\\mathbf{x}_t, t)}{\\sqrt{\\alpha_t}}}_{\\text{\"预测的 } \\mathbf{x}_0\\text{\"}} + \\underbrace{\\sqrt{1-\\alpha_{t-1}-\\sigma_t^2} \\cdot \\epsilon_\\theta(\\mathbf{x}_t, t)}_{\\text{\"指向 } \\mathbf{x}_t \\text{ 的方向\"}} + \\underbrace{\\sigma_t\\,\\epsilon_t}_{\\text{随机噪声}}$$</p>\n<p>这个公式由三个直观的部分组成：\n1. <strong>预测的 \\(\\mathbf{x}_0\\)</strong>：利用当前 \\(\\mathbf{x}_t\\) 和预测的噪声 \\(\\epsilon_\\theta\\) 估计原始干净图像\n2. <strong>指向 \\(\\mathbf{x}_t\\) 的方向</strong>：保持与当前噪声水平一致的方向分量\n3. <strong>随机噪声</strong>：由 \\(\\sigma_t\\) 控制的额外随机性</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：参数 \\(\\sigma_t\\) 控制了采样的随机性程度：\n- 当 \\(\\sigma_t = \\sqrt{(1-\\alpha_{t-1})/(1-\\alpha_t)} \\cdot \\sqrt{1-\\alpha_t/\\alpha_{t-1}}\\) 时，恢复 DDPM\n- 当 \\(\\sigma_t = 0\\) 时，采样过程完全确定，即 <strong>DDIM</strong>\n- 论文引入超参数 \\(\\eta \\in [0, 1]\\) 来统一控制：\\(\\sigma_t(\\eta) = \\eta \\cdot \\sqrt{(1-\\alpha_{t-1})/(1-\\alpha_t)} \\cdot \\sqrt{1-\\alpha_t/\\alpha_{t-1}}\\)</div>\n<h5>加速采样机制</h5>\n<p>DDIM 的另一个核心贡献是<strong>加速采样</strong>。由于训练目标只依赖边缘分布 \\(q(\\mathbf{x}_t|\\mathbf{x}_0)\\)，我们可以在采样时选择时间步的一个子序列 \\(\\tau = [\\tau_1, \\tau_2, \\ldots, \\tau_S]\\)（其中 \\(S \\ll T\\)），只在这些时间步上执行去噪更新。</p>\n<p>例如，当 \\(T=1000\\) 时，可以选取 \\(\\tau = [1, 21, 41, \\ldots, 981]\\)（共 50 步），将采样速度提升 20 倍。这一加速<strong>无需重新训练模型</strong>，因为每一步的去噪操作仍然使用相同的 \\(\\epsilon_\\theta\\)，只是跳过了中间时间步。</p>\n<p><img alt=\"采样步数与质量的关系\" src=\"https://ar5iv.labs.arxiv.org/html/2010.02502/assets/x8.png\" /></p>\n<p><em>图 3：采样时间与步数呈线性关系。DDIM 在 20-100 步即可达到与 1000 步 DDPM 可比的质量。</em></p>\n<h5>实验结果</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>数据集</th>\n<th>方法</th>\n<th>10 步</th>\n<th>20 步</th>\n<th>50 步</th>\n<th>100 步</th>\n<th>1000 步</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>CIFAR10</td>\n<td>DDIM (\\(\\eta=0\\))</td>\n<td>13.36</td>\n<td>6.84</td>\n<td>4.67</td>\n<td>4.16</td>\n<td>4.04</td>\n</tr>\n<tr>\n<td>CIFAR10</td>\n<td>DDPM (\\(\\eta=1\\))</td>\n<td>41.07</td>\n<td>18.36</td>\n<td>8.01</td>\n<td>5.78</td>\n<td>4.73</td>\n</tr>\n<tr>\n<td>CelebA</td>\n<td>DDIM (\\(\\eta=0\\))</td>\n<td>17.33</td>\n<td>13.73</td>\n<td>9.17</td>\n<td>6.53</td>\n<td>3.51</td>\n</tr>\n<tr>\n<td>CelebA</td>\n<td>DDPM (\\(\\eta=1\\))</td>\n<td>33.12</td>\n<td>26.03</td>\n<td>18.48</td>\n<td>13.93</td>\n<td>5.98</td>\n</tr>\n</tbody>\n</table></div>\n<p><em>表：CIFAR10 和 CelebA 上的 FID 分数（越低越好）。DDIM 在少步采样时显著优于 DDPM。</em></p>\n<p>关键发现：\n- <strong>少步采样优势显著</strong>：DDIM 100 步的 FID（4.16）已接近 DDPM 1000 步（4.73），实现 10× 加速\n- <strong>DDPM 在少步时严重退化</strong>：DDPM 10 步的 FID 高达 41.07，而 DDIM 仅为 13.36\n- <strong>CelebA 上 20 步 DDIM 的 FID（13.73）与 100 步 DDPM（13.93）相当</strong>，实现 5× 加速</p>\n<h5>确定性采样的独特优势</h5>\n<p><img alt=\"一致性采样\" src=\"https://ar5iv.labs.arxiv.org/html/2010.02502/assets/x10.png\" /></p>\n<p><em>图 4：DDIM 的一致性特性——相同的初始噪声 \\(\\mathbf{x}_T\\) 在不同采样步数下生成语义一致的图像。</em></p>\n<p>DDIM 的确定性采样（\\(\\sigma=0\\)）带来了 DDPM 不具备的独特优势：</p>\n<ol>\n<li>\n<p><strong>采样一致性</strong>：给定相同的 \\(\\mathbf{x}_T\\)，无论使用多少采样步数，DDIM 都生成语义相似的图像。这意味着可以先用少量步数快速预览，再用更多步数精细化。</p>\n</li>\n<li>\n<p><strong>语义隐空间插值</strong>：由于 \\(\\mathbf{x}_T\\) 到 \\(\\mathbf{x}_0\\) 的映射是确定性的，隐空间中的插值具有语义意义。</p>\n</li>\n</ol>\n<p><img alt=\"隐空间插值\" src=\"https://ar5iv.labs.arxiv.org/html/2010.02502/assets/figures/celeba-interp-line.png\" /></p>\n<p><em>图 5：CelebA 上 DDIM 隐空间的球面插值，展示了高层语义特征（姿态、表情、性别）的平滑过渡。</em></p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>DDPM</th>\n<th>DDIM</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>前向过程</td>\n<td>马尔可夫链</td>\n<td>非马尔可夫</td>\n</tr>\n<tr>\n<td>采样过程</td>\n<td>随机的</td>\n<td>可确定性</td>\n</tr>\n<tr>\n<td>最少采样步数</td>\n<td>\\(T\\)（通常 1000）</td>\n<td>\\(S \\ll T\\)（可低至 20-50）</td>\n</tr>\n<tr>\n<td>隐空间</td>\n<td>无语义结构</td>\n<td>语义可插值</td>\n</tr>\n<tr>\n<td>训练目标</td>\n<td>\\(L_1\\)</td>\n<td>相同的 \\(L_1\\)（无需重训）</td>\n</tr>\n<tr>\n<td>生成多样性</td>\n<td>每次不同</td>\n<td>同一 \\(\\mathbf{x}_T\\) 生成相同结果</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键</strong>：DDIM 不是一个新的训练方法，而是一个新的采样方法。任何已训练好的 DDPM 模型都可以直接使用 DDIM 采样，无需任何额外训练。这使得 DDIM 成为扩散模型加速采样的即插即用方案。</div>",
      "quiz": {
        "q": "DDIM 能够实现加速采样的根本原因是什么？",
        "options": [
          "使用了更高效的神经网络架构来预测噪声",
          "DDPM 的训练目标只依赖边缘分布 q(x_t|x_0)，允许使用非马尔可夫前向过程和时间步子序列",
          "通过蒸馏技术将大模型压缩为小模型",
          "采用了自适应步长的 ODE 求解器"
        ],
        "answer": 1,
        "explain": "DDPM 的去噪目标 L_1 仅依赖于边缘分布 q(x_t|x_0) 而非联合分布，因此可以构造非马尔可夫前向过程并在采样时使用时间步子序列，无需重新训练即可大幅减少采样步数。"
      }
    },
    {
      "id": "stable-diffusion",
      "num": 7,
      "name": "Stable Diffusion",
      "fullName": "稳定扩散模型 (Stable Diffusion)",
      "year": "2022",
      "org": "Stability AI",
      "parent": "ddpm",
      "paperUrl": "https://arxiv.org/abs/2112.10752",
      "projectUrl": "",
      "category": "diffusion",
      "motivation": "潜空间扩散（LDM）降低计算成本",
      "summary": "Latent Diffusion Models (LDM) 提出在预训练自编码器的低维潜空间中执行扩散过程，将感知压缩与生成学习解耦，在大幅降低训练和推理计算成本的同时保持甚至超越像素空间扩散模型的生成质量，并通过交叉注意力机制实现灵活的多模态条件生成。",
      "keyPoints": [
        "<strong>两阶段解耦训练</strong>：第一阶段训练自编码器进行感知压缩（去除高频细节冗余），第二阶段在压缩后的潜空间中训练扩散模型学习语义生成",
        "<strong>感知压缩自编码器</strong>：使用 KL 散度或 VQ 正则化的自编码器，将图像从像素空间 \\(x \\in \\mathbb{R}^{H \\times W \\times 3}\\) 编码到潜空间 \\(z \\in \\mathbb{R}^{h \\times w \\times c}\\)，下采样因子 \\(f = H/h\\)",
        "<strong>潜空间扩散模型</strong>：在低维潜空间中使用 U-Net 架构的去噪网络 \\(\\epsilon_\\theta(z_t, t)\\) 执行扩散过程，计算量相比像素空间大幅降低",
        "<strong>交叉注意力条件机制</strong>：通过在 U-Net 中引入交叉注意力层，将文本、语义图、布局等多模态条件 \\(y\\) 经领域特定编码器 \\(\\tau_\\theta(y)\\) 映射后注入生成过程",
        "<strong>下采样因子分析</strong>：系统研究了 \\(f \\in \\{1,2,4,8,16,32\\}\\) 的权衡，发现 \\(f=4\\) 和 \\(f=8\\) 在效率与质量间取得最佳平衡",
        "<strong>广泛的条件生成能力</strong>：支持文本到图像、布局到图像、语义合成、超分辨率、图像修复等多种任务",
        "<strong>无分类器引导（Classifier-Free Guidance）</strong>：结合无条件与条件预测增强生成质量，在文本到图像任务上显著提升 FID 和 IS"
      ],
      "detail": "<h5>模型架构总览</h5>\n<p><img alt=\"LDM 架构示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2112.10752/assets/x1.png\" />\n<em>图：Latent Diffusion Model 整体架构。左侧为感知压缩的自编码器（Encoder \\(\\mathcal{E}\\) / Decoder \\(\\mathcal{D}\\)），中间为潜空间中的扩散过程（Denoising U-Net），右侧为通过交叉注意力注入的条件信息。</em></p>\n<p><img alt=\"感知与语义压缩示意\" src=\"https://ar5iv.labs.arxiv.org/html/2112.10752/assets/img/generativevscompressive4.jpg\" />\n<em>图：数字图像中大部分比特对应感知上不可区分的细节（感知压缩），去除后仍保留语义结构（语义压缩）。LDM 先通过自编码器完成感知压缩，再在潜空间学习语义生成。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># === 阶段一：训练感知压缩自编码器 ===\n# 编码器 E 将图像 x 映射到潜空间 z = E(x)\n# 解码器 D 从潜空间重建图像 x̃ = D(z) = D(E(x))\n# 损失：L_autoencoder = L_rec(x, D(E(x))) + L_reg(z) + L_adv(D(E(x)))\n#   其中 L_reg 为 KL 散度或 VQ 正则化，L_adv 为 patch-based 对抗损失\n\n# === 阶段二：训练潜空间扩散模型 ===\n# 输入：预训练编码器 E（冻结），条件编码器 τ_θ\nfor each training step:\n    x, y = sample_data()           # x: 图像, y: 条件（文本/标签等）\n    z_0 = E(x)                     # 编码到潜空间（冻结）\n    t = uniform(1, T)              # 随机采样时间步\n    ε = sample_normal(0, I)        # 采样噪声\n    z_t = sqrt(ᾱ_t) * z_0 + sqrt(1 - ᾱ_t) * ε  # 前向加噪\n\n    # 条件去噪预测\n    ε_pred = ε_θ(z_t, t, τ_θ(y))  # U-Net + 交叉注意力\n    loss = ||ε - ε_pred||²         # 简化损失\n    optimizer.step(loss)\n\n# === 推理：从噪声生成图像 ===\nz_T = sample_normal(0, I)          # 从纯噪声开始\nfor t in reversed(range(1, T+1)):  # 可用 DDIM 加速\n    ε_pred = ε_θ(z_t, t, τ_θ(y))\n    z_{t-1} = denoise_step(z_t, ε_pred, t)  # DDPM/DDIM 更新\nx_gen = D(z_0)                     # 解码回像素空间\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统扩散模型（如 DDPM）直接在像素空间执行前向加噪和反向去噪过程。对于高分辨率图像（如 \\(512 \\times 512\\) 或更高），这意味着去噪网络需要在极高维空间中操作，导致：</p>\n<ol>\n<li><strong>训练成本极高</strong>：在像素空间训练高分辨率扩散模型需要数百 GPU 天</li>\n<li><strong>推理速度慢</strong>：每次生成需要数百步序列化去噪，每步都在高维空间计算</li>\n<li><strong>资源不可及</strong>：普通研究者难以复现和改进</li>\n</ol>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：图像中大量信息是感知上冗余的高频细节。生成模型不需要在原始像素空间学习这些细节——可以先压缩掉感知冗余，只在保留语义信息的低维空间中学习生成。</div>\n<h5>核心机制详解</h5>\n<p><strong>1. 感知压缩自编码器</strong></p>\n<p>第一阶段训练一个自编码器，将图像压缩到低维潜空间。编码器 \\(\\mathcal{E}\\) 将输入图像 \\(x \\in \\mathbb{R}^{H \\times W \\times 3}\\) 编码为潜表示 \\(z = \\mathcal{E}(x) \\in \\mathbb{R}^{h \\times w \\times c}\\)，解码器 \\(\\mathcal{D}\\) 从潜表示重建图像 \\(\\tilde{x} = \\mathcal{D}(z)\\)。</p>\n<p>训练目标结合了感知损失、正则化损失和对抗损失：</p>\n<p>$$\\mathcal{L}_{\\text{Autoencoder}} = \\min_{\\mathcal{E}, \\mathcal{D}} \\max_{\\psi} \\left( \\mathcal{L}_{\\text{rec}}(x, \\mathcal{D}(\\mathcal{E}(x))) - \\mathcal{L}_{\\text{adv}}(\\mathcal{D}(\\mathcal{E}(x)); \\psi) + \\log D_\\psi(x) + \\mathcal{L}_{\\text{reg}}(x; \\mathcal{E}, \\mathcal{D}) \\right)$$</p>\n<p>其中正则化项 \\(\\mathcal{L}_{\\text{reg}}\\) 有两种选择：\n- <strong>KL 正则化</strong>：对潜空间施加轻微的 KL 散度惩罚，使其接近标准正态分布\n- <strong>VQ 正则化</strong>：在解码器中使用向量量化层（类似 VQGAN）</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：与 VAE 不同，这里的正则化权重很小（KL 惩罚因子约 \\(10^{-6}\\)），目的是避免潜空间方差过大，而非强制匹配先验分布。这保证了重建质量的同时使潜空间足够规整以供扩散模型学习。</div>\n<p><strong>2. 潜空间扩散模型</strong></p>\n<p>在冻结的潜空间中，训练一个基于 U-Net 的去噪网络。核心损失函数为：</p>\n<p>$$\\mathcal{L}_{\\text{LDM}} := \\mathbb{E}_{\\mathcal{E}(x), \\epsilon \\sim \\mathcal{N}(0,1), t} \\left[ \\| \\epsilon - \\epsilon_\\theta(z_t, t) \\|_2^2 \\right]$$</p>\n<p>其中 \\(z_t\\) 是在时间步 \\(t\\) 对潜表示 \\(z_0 = \\mathcal{E}(x)\\) 加噪后的结果。由于潜空间维度远低于像素空间（例如 \\(f=8\\) 时空间维度缩小 64 倍），U-Net 的计算量大幅降低。</p>\n<p><strong>3. 交叉注意力条件机制</strong></p>\n<p>为实现灵活的条件生成，论文在 U-Net 的中间层引入交叉注意力机制。给定条件输入 \\(y\\)（文本、语义图、布局等），首先通过领域特定的编码器 \\(\\tau_\\theta\\) 将其映射为中间表示 \\(\\tau_\\theta(y) \\in \\mathbb{R}^{M \\times d_\\tau}\\)，然后通过交叉注意力与 U-Net 特征交互：</p>\n<p>$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d}}\\right) \\cdot V$$</p>\n<p>其中：</p>\n<p>$$Q = W_Q^{(i)} \\cdot \\varphi_i(z_t), \\quad K = W_K^{(i)} \\cdot \\tau_\\theta(y), \\quad V = W_V^{(i)} \\cdot \\tau_\\theta(y)$$</p>\n<ul>\n<li>\\(Q\\) 来自 U-Net 中间特征 \\(\\varphi_i(z_t)\\)（展平的空间特征）</li>\n<li>\\(K, V\\) 来自条件编码 \\(\\tau_\\theta(y)\\)</li>\n<li>\\(W_Q, W_K, W_V\\) 是可学习的投影矩阵</li>\n</ul>\n<p>条件生成的损失函数为：</p>\n<p>$$\\mathcal{L}_{\\text{LDM}} := \\mathbb{E}_{\\mathcal{E}(x), y, \\epsilon \\sim \\mathcal{N}(0,1), t} \\left[ \\| \\epsilon - \\epsilon_\\theta(z_t, t, \\tau_\\theta(y)) \\|_2^2 \\right]$$</p>\n<div class=\"key-point\">💡 <strong>设计优势</strong>：这种基于交叉注意力的条件机制是<strong>通用的</strong>——只需更换条件编码器 \\(\\tau_\\theta\\)，同一个 U-Net 架构就能处理文本（BERT/CLIP 编码器）、语义图（卷积编码器）、布局（边界框编码器）等不同模态的条件输入。</div>\n<p><strong>4. 下采样因子的权衡</strong></p>\n<p>论文系统分析了不同下采样因子 \\(f\\) 对生成质量和效率的影响：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th style=\"text-align: center;\">下采样因子</th>\n<th style=\"text-align: center;\">潜空间大小（256²输入）</th>\n<th style=\"text-align: left;\">特点</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style=\"text-align: center;\">\\(f=1\\)</td>\n<td style=\"text-align: center;\">\\(256 \\times 256\\)</td>\n<td style=\"text-align: left;\">等同像素空间扩散，训练极慢</td>\n</tr>\n<tr>\n<td style=\"text-align: center;\">\\(f=2\\)</td>\n<td style=\"text-align: center;\">\\(128 \\times 128\\)</td>\n<td style=\"text-align: left;\">压缩不足，训练仍然缓慢</td>\n</tr>\n<tr>\n<td style=\"text-align: center;\">\\(f=4\\)</td>\n<td style=\"text-align: center;\">\\(64 \\times 64\\)</td>\n<td style=\"text-align: left;\">✅ 效率与质量的最佳平衡点之一</td>\n</tr>\n<tr>\n<td style=\"text-align: center;\">\\(f=8\\)</td>\n<td style=\"text-align: center;\">\\(32 \\times 32\\)</td>\n<td style=\"text-align: left;\">✅ 效率与质量的最佳平衡点之一</td>\n</tr>\n<tr>\n<td style=\"text-align: center;\">\\(f=16\\)</td>\n<td style=\"text-align: center;\">\\(16 \\times 16\\)</td>\n<td style=\"text-align: left;\">质量开始下降</td>\n</tr>\n<tr>\n<td style=\"text-align: center;\">\\(f=32\\)</td>\n<td style=\"text-align: center;\">\\(8 \\times 8\\)</td>\n<td style=\"text-align: left;\">压缩过度，信息损失严重</td>\n</tr>\n</tbody>\n</table></div>\n<p>实验表明，\\(f=4\\) 和 \\(f=8\\) 在 ImageNet 上训练 2M 步后，FID 比像素空间扩散模型（\\(f=1\\)）低约 38 分，同时采样速度显著提升。</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th style=\"text-align: left;\">特性</th>\n<th style=\"text-align: left;\">像素空间扩散 (DDPM/ADM)</th>\n<th style=\"text-align: left;\">LDM (本文)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style=\"text-align: left;\">操作空间</td>\n<td style=\"text-align: left;\">高维像素空间</td>\n<td style=\"text-align: left;\">低维潜空间</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">计算成本</td>\n<td style=\"text-align: left;\">极高（数百 V100 天）</td>\n<td style=\"text-align: left;\">大幅降低（单 A100 可训练）</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">条件机制</td>\n<td style=\"text-align: left;\">分类器引导或拼接</td>\n<td style=\"text-align: left;\">通用交叉注意力</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">多模态条件</td>\n<td style=\"text-align: left;\">需要针对性设计</td>\n<td style=\"text-align: left;\">更换编码器即可</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">生成质量</td>\n<td style=\"text-align: left;\">高</td>\n<td style=\"text-align: left;\">相当或更优</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">推理速度</td>\n<td style=\"text-align: left;\">慢</td>\n<td style=\"text-align: left;\">快（潜空间维度低 + DDIM 加速）</td>\n</tr>\n</tbody>\n</table></div>\n<p>与 LSGM 等同样在潜空间训练扩散模型的方法不同，LDM <strong>分阶段独立训练</strong>自编码器和扩散模型，避免了联合训练中重建质量与先验学习之间的权衡难题。</p>\n<h5>实验结果</h5>\n<p>在无条件图像生成任务上，LDM 在 CelebA-HQ 256×256 上达到 FID=5.11 的新 SOTA；在 LSUN-Bedrooms 上达到 FID=2.95，接近 ADM 的 1.90。在文本到图像生成任务上（MS-COCO 256×256），LDM-KL-8 配合无分类器引导（\\(s=1.5\\)）达到 FID=12.63，IS=30.29，仅用 1.45B 参数即与 GLIDE（6B 参数）和 Make-A-Scene（4B 参数）持平。</p>",
      "quiz": {
        "q": "LDM 在潜空间而非像素空间执行扩散过程的核心优势是什么？",
        "options": [
          "潜空间的正态分布假设使扩散过程的数学推导更简洁",
          "去除感知冗余后在低维空间操作，大幅降低计算成本同时保持生成质量",
          "潜空间中的噪声分布更接近高斯分布，提升了去噪网络的预测精度",
          "潜空间编码天然包含语义信息，无需额外的条件机制即可实现条件生成"
        ],
        "answer": 1,
        "explain": "LDM 的核心思想是通过自编码器先去除图像中感知上冗余的高频细节（感知压缩），然后在压缩后的低维潜空间中训练扩散模型。这使得 U-Net 在远低于像素空间的维度上操作，计算量大幅降低，同时语义信息得以保留，生成质量不受损。"
      }
    },
    {
      "id": "dit",
      "num": 8,
      "name": "DiT",
      "fullName": "扩散Transformer (Diffusion Transformer)",
      "year": "2023",
      "org": "Meta & UC Berkeley",
      "parent": "stable-diffusion",
      "paperUrl": "https://arxiv.org/abs/2212.09748",
      "projectUrl": "",
      "category": "diffusion",
      "motivation": "用Transformer替换U-Net，验证扩展定律",
      "summary": "DiT 提出在潜空间扩散模型（LDM）框架中用 Transformer 替换 U-Net 作为去噪骨干网络，系统探索了条件注入策略和模型缩放规律，证明增加模型计算量（Gflops）可持续降低 FID，最终 DiT-XL/2 在 ImageNet 256×256 上以 FID=2.27 达到当时 SOTA。",
      "keyPoints": [
        "<strong>架构替换</strong>：在 LDM 潜空间上用 Vision Transformer（ViT）完全替换 U-Net，证明 Transformer 是扩散模型的有效骨干",
        "<strong>Patchify 机制</strong>：将潜空间表示切分为 patch 序列（patch size \\(p \\in \\{2, 4, 8\\}\\)），\\(p\\) 越小 token 数越多、Gflops 越高、质量越好",
        "<strong>4 种条件注入策略</strong>：In-context conditioning、Cross-attention、Adaptive LayerNorm（adaLN）、adaLN-Zero → <strong>adaLN-Zero 最优</strong>",
        "<strong>adaLN-Zero 创新</strong>：在 adaLN 基础上回归出额外的维度缩放参数 \\(\\alpha\\)，并将所有 \\(\\alpha\\) 初始化为零向量，使每个 DiT block 初始化时等价于恒等函数",
        "<strong>Scaling Law</strong>：模型 Gflops 与 FID 呈强负相关，增加模型计算量（增大模型或减小 patch size）均可持续提升生成质量",
        "<strong>4 种模型配置</strong>：DiT-S（33M）、DiT-B（130M）、DiT-L（458M）、DiT-XL（675M），层数 12→28，隐藏维度 384→1152",
        "<strong>SOTA 结果</strong>：DiT-XL/2 在 ImageNet 256×256 达到 FID=2.27，512×512 达到 FID=3.04，均为当时最优",
        "<strong>计算效率</strong>：DiT-XL/2 仅需 118.6 Gflops（256×256），远低于 ADM 的 1120 Gflops，但 FID 更优"
      ],
      "detail": "<h5>架构总览</h5>\n<p><img alt=\"DiT 架构总览图\" src=\"https://ar5iv.labs.arxiv.org/html/2212.09748/assets/x3.png\" />\n<em>图：DiT 整体架构。左侧为完整流程：输入潜空间经 Patchify 后送入 N 个 DiT Block，最终通过线性解码器输出噪声预测和方差预测。右侧展示了四种条件注入策略的 DiT Block 变体。</em></p>\n<p>DiT 的整体流程建立在 Latent Diffusion Model（LDM）框架之上：</p>\n<ol>\n<li><strong>编码</strong>：输入图像 \\(x \\in \\mathbb{R}^{H \\times W \\times 3}\\) 通过预训练 VAE 编码器压缩为潜空间表示 \\(z \\in \\mathbb{R}^{h \\times w \\times c}\\)（Stable Diffusion 的 VAE 将 256×256 图像编码为 32×32×4）</li>\n<li><strong>Patchify</strong>：将潜空间 \\(z\\) 切分为不重叠的 \\(p \\times p\\) patch，每个 patch 通过线性嵌入转为 \\(d\\) 维 token，加上标准 ViT 频率位置编码，得到长度为 \\(T = (h \\cdot w) / p^2\\) 的 token 序列</li>\n<li><strong>DiT Blocks</strong>：\\(N\\) 个 Transformer block 处理 token 序列，注入时间步 \\(t\\) 和类别标签 \\(c\\) 的条件信息</li>\n<li><strong>解码</strong>：最终 layer norm → 线性层将每个 token 解码为 \\(p \\times p \\times 2c\\) 的输出（噪声 \\(\\epsilon\\) 和对角协方差 \\(\\Sigma\\)），reshape 回空间维度</li>\n</ol>\n<p><img alt=\"Patchify 示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2212.09748/assets/x4.png\" />\n<em>图：不同 patch size 下的输入规格。patch size 越小，token 数越多，计算量越大。</em></p>\n<h5>条件注入策略</h5>\n<p>DiT 系统比较了四种将条件信息（时间步 \\(t\\) 和类别标签 \\(c\\)）注入 Transformer 的方式：</p>\n<pre><code class=\"language-python\"># 四种条件注入策略伪代码\n\n# 1. In-context conditioning：将 t, c 的 embedding 作为额外 token 拼接到序列中\ntokens = concat([t_embed, c_embed, patch_tokens])  # 序列长度 +2\noutput = transformer_block(tokens)\n\n# 2. Cross-attention：在 self-attention 后加 cross-attention 层\nx = self_attention(x) + x\nx = cross_attention(x, key_value=concat([t_embed, c_embed])) + x\nx = mlp(x) + x\n\n# 3. adaLN：用条件信息回归 LayerNorm 的 γ, β 参数\ngamma, beta = MLP(t_embed + c_embed)  # 回归 scale 和 shift\nx = gamma * LayerNorm(x) + beta       # 替代标准 LayerNorm\n\n# 4. adaLN-Zero（最优）：在 adaLN 基础上增加维度缩放 α，初始化为零\ngamma, beta, alpha = MLP(t_embed + c_embed)  # 额外回归 α\nx = alpha * attention(gamma * LayerNorm(x) + beta) + x  # α 初始化为零\n# 初始化时 α=0 → block 输出为零 → 整个 block 等价于恒等映射\n</code></pre>\n<p><img alt=\"条件策略对比\" src=\"https://ar5iv.labs.arxiv.org/html/2212.09748/assets/x5.png\" />\n<em>图：四种条件注入策略的 FID 训练曲线对比。adaLN-Zero 在所有模型尺寸下均表现最优。</em></p>\n<div class=\"key-point\">💡 <strong>关键</strong>：adaLN-Zero 的零初始化设计借鉴了 ResNet 中残差块零初始化的思想。在训练初期，每个 DiT block 等价于恒等函数，整个网络从\"什么都不做\"开始逐步学习去噪，这显著稳定了训练过程并提升了最终性能。</div>\n<h5>核心公式</h5>\n<p>DiT 的训练目标沿用标准扩散模型的去噪目标。给定干净潜变量 \\(z_0\\)，前向扩散过程为：</p>\n<p>$$z_t = \\sqrt{\\bar{\\alpha}_t} \\, z_0 + \\sqrt{1 - \\bar{\\alpha}_t} \\, \\epsilon, \\quad \\epsilon \\sim \\mathcal{N}(0, I)$$</p>\n<p>DiT 学习预测噪声 \\(\\epsilon_\\theta(z_t, t, c)\\) 和对角协方差 \\(\\Sigma_\\theta(z_t, t, c)\\)，训练损失为：</p>\n<p>$$\\mathcal{L} = \\mathbb{E}_{z_0, \\epsilon, t} \\left[ \\| \\epsilon - \\epsilon_\\theta(z_t, t, c) \\|^2 \\right]$$</p>\n<p>其中 \\(t\\) 和类别标签 \\(c\\) 通过 adaLN-Zero 机制注入。adaLN-Zero 的具体计算为：</p>\n<p>$$\\gamma, \\beta, \\alpha = \\text{MLP}(\\text{embed}(t) + \\text{embed}(c))$$</p>\n<p>$$\\text{adaLN-Zero}(h, c) = \\alpha \\odot \\text{Block}\\!\\left(\\gamma \\odot \\text{LayerNorm}(h) + \\beta\\right)$$</p>\n<p>其中 \\(\\alpha\\) 在初始化时为零向量，使得 \\(\\text{adaLN-Zero}(h, c) = 0\\)，整个残差块退化为恒等映射 \\(h + 0 = h\\)。</p>\n<h5>模型配置</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>层数 \\(N\\)</th>\n<th>隐藏维度 \\(d\\)</th>\n<th>注意力头数</th>\n<th>参数量（M）</th>\n<th>Gflops（p=4）</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>DiT-S</td>\n<td>12</td>\n<td>384</td>\n<td>6</td>\n<td>33</td>\n<td>1.4</td>\n</tr>\n<tr>\n<td>DiT-B</td>\n<td>12</td>\n<td>768</td>\n<td>12</td>\n<td>130</td>\n<td>5.6</td>\n</tr>\n<tr>\n<td>DiT-L</td>\n<td>24</td>\n<td>1024</td>\n<td>16</td>\n<td>458</td>\n<td>19.7</td>\n</tr>\n<tr>\n<td>DiT-XL</td>\n<td>28</td>\n<td>1152</td>\n<td>16</td>\n<td>675</td>\n<td>29.1</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：Gflops 随 patch size 变化显著。以 DiT-XL 为例，p=8 时仅 5.7 Gflops，p=4 时 29.1 Gflops，p=2 时 118.6 Gflops（256×256 输入）。</div>\n<h5>Scaling Law：Gflops 决定生成质量</h5>\n<p>DiT 的核心发现是<strong>模型计算量（Gflops）而非参数量是决定生成质量的关键因素</strong>：</p>\n<p><img alt=\"Gflops 与 FID 的关系\" src=\"https://ar5iv.labs.arxiv.org/html/2212.09748/assets/x8.png\" />\n<em>图：不同 DiT 配置在 400K 训练步后的 Gflops-FID 关系。Gflops 相近的不同配置（如 DiT-S/2 和 DiT-B/4）获得相似的 FID。</em></p>\n<p>这一发现有两个重要推论：</p>\n<ol>\n<li>\n<p><strong>固定模型大小，减小 patch size</strong>：参数量几乎不变（甚至略减），但 Gflops 增加，FID 显著下降。这说明增加 token 数量（即处理更细粒度的空间信息）本身就能提升质量。</p>\n</li>\n<li>\n<p><strong>固定 patch size，增大模型</strong>：Gflops 和参数量同时增加，FID 同样下降。更大的模型在相同训练计算预算下更高效——类似于 LLM 领域的 Chinchilla scaling law。</p>\n</li>\n</ol>\n<p><img alt=\"Scaling 曲线\" src=\"https://ar5iv.labs.arxiv.org/html/2212.09748/assets/x6.png\" />\n<em>图：上排为固定 patch size 增大模型的 FID 曲线；下排为固定模型大小减小 patch size 的 FID 曲线。两种缩放方式均持续提升性能。</em></p>\n<h5>与 U-Net 的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>U-Net（如 ADM）</th>\n<th>DiT</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>架构</td>\n<td>编码器-解码器 + 跳跃连接</td>\n<td>纯 Transformer，无层级结构</td>\n</tr>\n<tr>\n<td>空间处理</td>\n<td>多尺度特征图，逐层下/上采样</td>\n<td>单一分辨率 token 序列</td>\n</tr>\n<tr>\n<td>条件注入</td>\n<td>时间步通过 adaGN，类别通过 cross-attn</td>\n<td>统一的 adaLN-Zero</td>\n</tr>\n<tr>\n<td>归纳偏置</td>\n<td>强空间局部性（卷积）</td>\n<td>弱归纳偏置，依赖数据和规模</td>\n</tr>\n<tr>\n<td>可扩展性</td>\n<td>扩展方式不统一（宽度/深度/注意力头）</td>\n<td>直接复用 ViT 的成熟缩放策略</td>\n</tr>\n<tr>\n<td>计算效率</td>\n<td>ADM: 1120 Gflops</td>\n<td>DiT-XL/2: 118.6 Gflops（FID 更优）</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键</strong>：DiT 证明了扩散模型不依赖 U-Net 的归纳偏置也能达到甚至超越 SOTA，这为后续 Sora 等视频生成模型采用 Transformer 架构奠定了理论基础。</div>\n<h5>SOTA 结果</h5>\n<p>DiT-XL/2 经过 7M 步训练后，在 ImageNet 类条件生成上达到 SOTA：</p>\n<p><strong>ImageNet 256×256</strong>（使用 classifier-free guidance, cfg=1.50）：\n- <strong>FID-50K = 2.27</strong>（前最优 LDM: 3.60）\n- sFID = 4.60, IS = 278.24\n- Precision = 0.83, Recall = 0.57</p>\n<p><strong>ImageNet 512×512</strong>（cfg=1.50）：\n- <strong>FID-50K = 3.04</strong>（前最优 ADM-G+ADM-U: 3.85）\n- 仅需 524.6 Gflops，远低于 ADM 的 1983 Gflops</p>",
      "quiz": {
        "q": "DiT 的核心实验发现中，决定扩散模型生成质量的最关键因素是什么？",
        "options": [
          "模型的总参数量",
          "模型的计算量（Gflops）",
          "训练数据集的大小",
          "采样步数的多少"
        ],
        "answer": 1,
        "explain": "DiT 实验表明，Gflops 相近但参数量不同的配置（如 DiT-S/2 和 DiT-B/4）获得相似的 FID，而增加采样步数无法弥补模型计算量的不足，证明 Gflops 是决定生成质量的关键因素。"
      }
    },
    {
      "id": "consistency-model",
      "num": 9,
      "name": "Consistency Model",
      "fullName": "一致性模型 (Consistency Models)",
      "year": "2023",
      "org": "OpenAI",
      "parent": "ddpm",
      "paperUrl": "https://arxiv.org/abs/2303.01469",
      "projectUrl": "",
      "category": "diffusion",
      "motivation": "蒸馏为一步生成模型，极速推理",
      "summary": "Consistency Models 通过学习将概率流 ODE 轨迹上的任意点直接映射到轨迹起点（干净数据），实现**一步生成**，同时支持多步迭代提升质量和零样本图像编辑，在蒸馏模式下 CIFAR-10 单步 FID 达到 3.55，大幅超越此前所有蒸馏方法。",
      "keyPoints": [
        "<strong>自一致性约束</strong>：同一 PF ODE 轨迹上的所有 \\((x_t, t)\\) 对映射到相同的起点 \\(x_\\epsilon\\)，即 \\(f(x_t, t) = f(x_{t'}, t')\\)",
        "<strong>边界条件</strong>：\\(f(x_\\epsilon, \\epsilon) = x_\\epsilon\\)，通过 skip connection 参数化自动满足：\\(f_\\theta(x,t) = c_{\\text{skip}}(t) \\cdot x + c_{\\text{out}}(t) \\cdot F_\\theta(x,t)\\)",
        "<strong>两种训练模式</strong>：",
        "Consistency Distillation (CD)：从预训练扩散模型蒸馏，用 ODE solver 生成相邻时间步配对",
        "Consistency Training (CT)：无需预训练模型，用无偏 score 估计 \\(-\\frac{x_t - x}{t^2}\\) 独立训练",
        "<strong>EMA 目标网络</strong>：类似 DQN / MoCo，用指数移动平均维护目标网络 \\(\\theta^- \\leftarrow \\mu\\theta^- + (1-\\mu)\\theta\\)，稳定训练",
        "<strong>渐进式调度</strong>：CT 训练中逐步增大离散步数 \\(N\\) 和 EMA 衰减率 \\(\\mu\\)，平衡收敛速度与样本质量",
        "<strong>多步采样</strong>：交替执行去噪和加噪，用少量步数（2-3 步）显著提升生成质量",
        "<strong>零样本编辑</strong>：支持图像修复、上色、超分辨率、SDEdit 风格引导等，无需额外训练",
        "<strong>SOTA 结果</strong>：CIFAR-10 CD 单步 FID 3.55 / 两步 2.93；ImageNet 64×64 CD 单步 FID 6.20 / 两步 4.70"
      ],
      "detail": "<p><img alt=\"Consistency Model 核心示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2303.01469/assets/figures/scheme.jpg\" />\n<em>图：Consistency Model 将 PF ODE 轨迹上的任意点映射到同一起点 \\(x_\\epsilon\\)。同一条轨迹上的不同噪声水平 \\((x_t, t)\\) 和 \\((x_{t'}, t')\\) 经过一致性函数后得到相同的输出。</em></p>\n<h5>动机与背景</h5>\n<p>扩散模型（Diffusion Models）通过迭代去噪生成高质量样本，但推理时需要数十到数千步 ODE/SDE 求解，计算代价极高。现有加速方法分为两类：</p>\n<ol>\n<li><strong>快速采样器</strong>（DDIM、DPM-Solver 等）：减少采样步数但仍需 10+ 步</li>\n<li><strong>蒸馏方法</strong>（Progressive Distillation 等）：将多步知识压缩到少步模型，但质量损失明显</li>\n</ol>\n<p>Consistency Models 提出了一种全新范式：不是加速 ODE 求解，而是<strong>直接学习 ODE 轨迹的映射函数</strong>，从任意噪声水平一步跳到干净数据。</p>\n<h5>核心机制：一致性函数</h5>\n<p>扩散模型的前向过程将数据 \\(x\\) 逐步加噪为 \\(x_T \\sim \\mathcal{N}(0, T^2 I)\\)，其逆过程由概率流 ODE (PF ODE) 描述：</p>\n<p>$$\\frac{dx_t}{dt} = -t \\cdot s_\\phi(x_t, t)$$</p>\n<p>其中 \\(s_\\phi(x_t, t) \\approx \\nabla \\log p_t(x_t)\\) 是学习到的 score 函数。沿此 ODE 从 \\(x_T\\) 积分到 \\(x_\\epsilon\\) 即可生成样本。</p>\n<p><strong>一致性函数</strong> \\(f: (x_t, t) \\mapsto x_\\epsilon\\) 将轨迹上任意点直接映射到起点，满足自一致性：</p>\n<p>$$f(x_t, t) = f(x_{t'}, t') \\quad \\forall\\, t, t' \\in [\\epsilon, T]$$</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：一致性函数本质上是\"记住\"了整条 ODE 轨迹的终点。不管你从轨迹的哪个位置出发，它都能告诉你终点在哪里——这就绕过了逐步积分的过程。</div>\n<h5>参数化设计</h5>\n<p>为满足边界条件 \\(f(x_\\epsilon, \\epsilon) = x_\\epsilon\\)，采用 skip connection 参数化：</p>\n<p>$$f_\\theta(x, t) = c_{\\text{skip}}(t) \\cdot x + c_{\\text{out}}(t) \\cdot F_\\theta(x, t)$$</p>\n<p>其中 \\(c_{\\text{skip}}(\\epsilon) = 1\\)，\\(c_{\\text{out}}(\\epsilon) = 0\\)，确保 \\(t = \\epsilon\\) 时输出恒等。论文采用：</p>\n<p>$$c_{\\text{skip}}(t) = \\frac{\\sigma_{\\text{data}}^2}{(t - \\epsilon)^2 + \\sigma_{\\text{data}}^2}, \\quad c_{\\text{out}}(t) = \\frac{\\sigma_{\\text{data}}(t - \\epsilon)}{\\sqrt{\\sigma_{\\text{data}}^2 + t^2}}$$</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：\\(F_\\theta\\) 的骨干网络与标准扩散模型完全相同（如 U-Net），只是外层包了 skip connection。这意味着可以直接复用扩散模型的架构。</div>\n<h5>训练方法一：Consistency Distillation (CD)</h5>\n<p>将时间区间 \\([\\epsilon, T]\\) 离散化为 \\(t_1 = \\epsilon < t_2 < \\cdots < t_N = T\\)，利用预训练扩散模型的 ODE solver 生成相邻时间步的配对样本，然后强制一致性：</p>\n<pre><code class=\"language-python\"># Consistency Distillation 伪代码\n# 输入: 预训练 score 模型 s_φ, 数据集 D, 学习率 η, EMA 率 μ\nθ⁻ = θ  # 初始化目标网络\nfor x ~ D:\n    n ~ Uniform{1, 2, ..., N-1}\n    # 从数据加噪到 t_{n+1}\n    z ~ N(0, I)\n    x_{n+1} = x + t_{n+1} * z\n\n    # 用 ODE solver (Euler/Heun) 从 t_{n+1} 估计 t_n 处的点\n    x̂_n = x_{n+1} + (t_n - t_{n+1}) * Φ(x_{n+1}, t_{n+1}; s_φ)\n\n    # 一致性蒸馏损失: 两个点应映射到同一起点\n    loss = d(f_θ(x_{n+1}, t_{n+1}), f_{θ⁻}(x̂_n, t_n))\n\n    # 更新在线网络, EMA 更新目标网络\n    θ = θ - η * ∇loss\n    θ⁻ = stopgrad(μ * θ⁻ + (1-μ) * θ)\n</code></pre>\n<div class=\"key-point\">💡 <strong>为什么用 EMA 目标网络？</strong> 如果直接让 \\(f_\\theta\\) 同时作为在线网络和目标网络（即 \\(\\theta^- = \\theta\\)），梯度会互相干扰导致训练不稳定。EMA 提供了一个缓慢变化的\"锚点\"，类似 DQN 中的 target network 和 MoCo 中的 momentum encoder。</div>\n<h5>训练方法二：Consistency Training (CT)</h5>\n<p>CT 的关键洞察是：<strong>不需要预训练扩散模型</strong>。利用 score 函数的无偏估计：</p>\n<p>$$\\nabla \\log p_t(x_t) = -\\mathbb{E}\\left[\\frac{x_t - x}{t^2} \\,\\bigg|\\, x_t\\right]$$</p>\n<p>给定原始数据 \\(x\\) 和加噪样本 \\(x_t = x + t \\cdot z\\)，可以用 \\(-z/t\\) 作为 score 的无偏估计。这样就不再需要 ODE solver，而是直接用同一噪声 \\(z\\) 构造相邻时间步的配对：</p>\n<p>$$\\text{CT Loss} = \\mathbb{E}\\left[d\\left(f_\\theta(x + t_{n+1} z,\\, t_{n+1}),\\; f_{\\theta^-}(x + t_n z,\\, t_n)\\right)\\right]$$</p>\n<div class=\"key-point\">💡 <strong>CT 与 CD 的关系</strong>：当 \\(N \\to \\infty\\) 且使用 Euler solver 时，CD 损失与 CT 损失仅差一个高阶小量 \\(o(\\Delta t)\\)。CT 本质上是 CD 在无限细分极限下的\"免蒸馏\"版本。</div>\n<h5>渐进式 N 调度</h5>\n<p>CT 训练对离散步数 \\(N\\) 非常敏感：\n- <strong>小 \\(N\\)</strong>：低方差高偏差，收敛快但质量差\n- <strong>大 \\(N\\)</strong>：高方差低偏差，收敛慢但质量好</p>\n<p>论文提出<strong>渐进增大 \\(N\\)</strong>（类似课程学习），同时调整 EMA 率 \\(\\mu\\)，在训练过程中从粗到细逐步提升精度。</p>\n<h5>多步采样与零样本编辑</h5>\n<p><img alt=\"Consistency Model 生成效果\" src=\"https://ar5iv.labs.arxiv.org/html/2303.01469/assets/figures/teaser.jpg\" />\n<em>图：Consistency Model 在 LSUN 256×256 上的单步和多步生成效果</em></p>\n<p><strong>多步采样</strong>通过交替去噪-加噪实现质量提升：</p>\n<pre><code class=\"language-python\"># 多步一致性采样\ndef multistep_sample(f_θ, time_points=[T, τ₁, τ₂, ...]):\n    x = N(0, T² * I)          # 从纯噪声开始\n    x = f_θ(x, T)             # 第 1 步: 一步去噪\n    for τ in time_points[1:]:\n        z ~ N(0, I)\n        x = x + √(τ² - ε²) * z  # 重新加噪到 τ\n        x = f_θ(x, τ)            # 再次去噪\n    return x\n</code></pre>\n<p>这一机制也使零样本编辑成为可能：对于修复任务，在每次加噪后将已知区域替换为真实值；对于超分辨率，将低频信息注入。</p>\n<h5>距离函数选择</h5>\n<p>论文比较了三种距离函数 \\(d(\\cdot, \\cdot)\\)：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>距离函数</th>\n<th>CD (FID↓)</th>\n<th>CT (FID↓)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>\\(\\ell_2\\)</td>\n<td>3.96</td>\n<td>14.21</td>\n</tr>\n<tr>\n<td>\\(\\ell_1\\)</td>\n<td>3.78</td>\n<td>12.21</td>\n</tr>\n<tr>\n<td>LPIPS</td>\n<td><strong>3.55</strong></td>\n<td><strong>8.70</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>LPIPS（感知距离）显著优于像素级距离，因为它在特征空间中度量差异，更符合人类视觉感知。</p>\n<h5>与蒸馏方法的对比</h5>\n<p><img alt=\"蒸馏方法对比\" src=\"https://ar5iv.labs.arxiv.org/html/2303.01469/assets/figures/distillation_compare.jpg\" />\n<em>图：Consistency Distillation 与 Progressive Distillation 在不同采样步数下的 FID 对比</em></p>\n<p>CD 在所有采样步数下均大幅优于 Progressive Distillation (PD)：\n- 单步：CD 3.55 vs PD 8.34 (CIFAR-10)\n- 单步：CD 6.20 vs PD 15.39 (ImageNet 64×64)</p>",
      "quiz": {
        "q": "Consistency Model 的自一致性 (self-consistency) 约束指的是什么？",
        "options": [
          "模型在不同随机种子下生成相同的图像",
          "同一 PF ODE 轨迹上不同时间步的输入映射到相同的输出",
          "训练损失在不同 batch 之间保持一致",
          "在线网络和目标网络的参数始终相同"
        ],
        "answer": 1,
        "explain": "自一致性要求 f(x_t, t) = f(x_t', t')，即属于同一条 ODE 轨迹的任意两个点 (x_t, t) 和 (x_t', t') 经过一致性函数后得到相同的输出（轨迹起点 x_ε）。这是 Consistency Model 的核心训练目标。"
      }
    },
    {
      "id": "dit-moe",
      "num": 10,
      "name": "DiT-MoE",
      "fullName": "混合专家扩散Transformer (DiT with MoE)",
      "year": "2024",
      "org": "Meta",
      "parent": "dit",
      "paperUrl": "https://arxiv.org/abs/2407.11633",
      "projectUrl": "",
      "category": "diffusion",
      "motivation": "稀疏MoE扩展至160亿参数",
      "summary": "DiT-MoE 将稀疏混合专家（Sparse MoE）机制引入扩散 Transformer（DiT），通过共享专家路由和专家级负载均衡损失两大设计，在保持高效推理的同时将模型规模扩展至 16.5B 参数，在 ImageNet 基准上取得了 SOTA 的图像生成质量（256×256 FID=1.72，512×512 FID=1.80）。",
      "keyPoints": [
        "<strong>稀疏 MoE 替换 DiT 的 FFN 层</strong>：每个 Transformer Block 中的 MLP 被替换为 MoE 层，包含 \\(n\\) 个专家，每次仅激活 Top-\\(K\\) 个（通常 \\(K=2\\)），大幅增加参数量而不显著增加推理计算量",
        "<strong>共享专家路由（Shared Expert Routing）</strong>：设置 \\(n_s=2\\) 个共享专家始终被激活，捕获不同输入间的共性知识，减少路由专家间的冗余",
        "<strong>专家级负载均衡损失（Expert-level Balance Loss）</strong>：以专家粒度（而非 token 粒度）计算辅助损失，系数 \\(\\alpha=0.05\\)，有效缓解专家负载不均衡问题",
        "<strong>模型规模系列</strong>：从 S/2-8E2A（199M 参数）到 G/2-16E2A（16.5B 总参数，3.1B 激活参数），其中 Giant 模型是目前已知最大的类别条件扩散 Transformer",
        "<strong>路由分析发现</strong>：专家选择偏好空间位置和去噪时间步，对类别条件信息不敏感；深层 MoE 层的专家选择更分散均匀；早期去噪步骤专家选择更集中，后期更均匀",
        "<strong>合成数据增强</strong>：Giant 模型使用 SDXL 和 SD3 生成的 500 万张合成图像与真实数据以 1:5 比例混合训练"
      ],
      "detail": "<h5>模型架构总览</h5>\n<p><img alt=\"DiT-MoE 架构示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2407.11633/assets/x2.png\" />\n<em>图：DiT-MoE 架构。左侧为整体流程，右侧展示 MoE Block 内部结构——包含共享专家（始终激活）和路由专家（Top-K 选择），以及专家级负载均衡损失。</em></p>\n<p><img alt=\"DiT-MoE 生成样例\" src=\"https://ar5iv.labs.arxiv.org/html/2407.11633/assets/x1.png\" />\n<em>图：DiT-MoE 在不同分辨率下的高质量生成样例，展示了模型的强大生成能力。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># DiT-MoE 前向传播伪代码\ndef dit_moe_block(x, t, c, experts, shared_experts, router):\n    &quot;&quot;&quot;\n    x: 输入 token 序列 [B, N, D]  (N = (H/p)*(W/p) 个 patch token)\n    t: 时间步嵌入\n    c: 类别条件嵌入\n    experts: n 个路由专家 FFN\n    shared_experts: n_s 个共享专家 FFN\n    router: 门控网络 (线性层 D -&gt; n)\n    &quot;&quot;&quot;\n    # 1. 自注意力 + adaLN 调制\n    x = x + self_attention(adaLN(x, t, c))\n\n    # 2. 路由门控：计算每个 token 对每个专家的亲和度\n    gate_logits = router(x)                    # [B, N, n]\n    gate_scores = softmax(gate_logits, dim=-1) # [B, N, n]\n\n    # 3. Top-K 选择：每个 token 选择 K 个路由专家\n    topk_scores, topk_indices = topk(gate_scores, K)  # [B, N, K]\n    topk_scores = topk_scores / topk_scores.sum(dim=-1, keepdim=True)  # 归一化\n\n    # 4. 路由专家计算\n    routed_output = zeros_like(x)\n    for k in range(K):\n        expert_idx = topk_indices[:, :, k]\n        expert_out = experts[expert_idx](x)    # 选中的专家处理 token\n        routed_output += topk_scores[:, :, k:k+1] * expert_out\n\n    # 5. 共享专家计算（始终激活）\n    shared_output = sum(shared_expert(x) for shared_expert in shared_experts) / n_s\n\n    # 6. 合并输出\n    moe_output = routed_output + shared_output\n    x = x + moe_output\n\n    return x\n\n# 专家级负载均衡损失\ndef expert_balance_loss(gate_logits, topk_indices, n, alpha=0.05):\n    &quot;&quot;&quot;\n    以专家粒度计算负载均衡损失，鼓励所有专家被均匀使用\n    &quot;&quot;&quot;\n    # f_i: 专家 i 被选中的 token 比例\n    f = compute_expert_frequency(topk_indices, n)  # [n]\n    # P_i: 所有 token 对专家 i 的平均门控概率\n    P = gate_logits.softmax(dim=-1).mean(dim=(0, 1))  # [n]\n    # 负载均衡损失\n    L_balance = alpha * n * (f * P).sum()\n    return L_balance\n</code></pre>\n<h5>动机与背景</h5>\n<p>扩散 Transformer（DiT）已经在图像生成领域展现出卓越性能，但其密集架构面临一个根本矛盾：<strong>增加模型容量必然导致推理计算量等比例增长</strong>。在大语言模型领域，稀疏混合专家（Sparse MoE）已经成功解决了这一问题——通过条件计算，模型可以拥有数万亿参数但每次推理仅激活其中一小部分。</p>\n<p>然而，将 MoE 直接应用于 DiT 面临两个独特挑战：</p>\n<ol>\n<li><strong>扩散模型的多时间步特性</strong>：不同于 LLM 的单次前向传播，扩散模型需要在数百个去噪步骤中反复调用网络，每个步骤的输入分布差异显著，这对路由机制提出了更高要求。</li>\n<li><strong>视觉 token 的空间结构</strong>：图像 patch token 具有强烈的空间相关性，简单的 Top-K 路由可能导致专家间的严重负载不均衡。</li>\n</ol>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：DiT-MoE 的核心思想是——通过共享专家捕获跨输入的共性知识，让路由专家专注于学习差异化的特征表示，从而在不增加推理成本的前提下大幅提升模型容量。</div>\n<h5>核心机制详解</h5>\n<p><strong>1. MoE 层设计</strong></p>\n<p>DiT-MoE 将 DiT Block 中的标准 MLP（即 pointwise feedforward network）替换为 MoE 层。给定输入 token \\(x \\in \\mathbb{R}^D\\)，MoE 层的输出为：</p>\n<p>$$y = \\sum_{i=1}^{n} g_i \\cdot \\text{FFN}_i(x)$$</p>\n<p>其中 \\(g_i\\) 是门控网络为第 \\(i\\) 个专家分配的权重。门控网络通过线性映射 + Softmax 实现：</p>\n<p>$$g_i = \\text{Softmax}(W_g \\cdot x)_i$$</p>\n<p>为保持稀疏性，仅保留 Top-\\(K\\) 个专家的门控值，其余置零并重新归一化：</p>\n<p>$$\\tilde{g}_i = \\begin{cases} \\frac{g_i}{\\sum_{j \\in \\text{TopK}} g_j} & \\text{if } i \\in \\text{TopK} \\\\ 0 & \\text{otherwise} \\end{cases}$$</p>\n<p><strong>2. 共享专家路由（Shared Expert Routing）</strong></p>\n<p>这是 DiT-MoE 的第一个核心创新。在 \\(n\\) 个专家中，\\(n_s\\) 个被指定为<strong>共享专家</strong>，它们对所有输入 token 始终激活，不参与路由选择。最终输出为：</p>\n<p>$$y = \\underbrace{\\sum_{i=1}^{n_s} \\text{FFN}_i^{\\text{shared}}(x)}_{\\text{共享专家输出}} + \\underbrace{\\sum_{j=1}^{n - n_s} \\tilde{g}_j \\cdot \\text{FFN}_j^{\\text{routed}}(x)}_{\\text{路由专家输出}}$$</p>\n<div class=\"key-point\">💡 <strong>设计直觉</strong>：在标准 MoE 中，由于不同输入可能共享某些通用特征（如低频纹理、全局结构），多个路由专家可能学习到高度重复的表示。共享专家通过显式建模这些共性知识，释放路由专家去学习更加差异化、细粒度的特征，从而提升整体模型容量的利用效率。</div>\n<p>消融实验（下图）验证了 \\(n_s = 2\\) 是最优选择：</p>\n<p><img alt=\"消融实验\" src=\"https://ar5iv.labs.arxiv.org/html/2407.11633/assets/images/ablation.png\" />\n<em>图：共享专家数量和负载均衡损失类型的消融实验。(a) 共享专家数 \\(n_s=2\\) 时 FID 最优；(b) 专家级（expert-level）负载均衡损失优于 token 级。</em></p>\n<p><strong>3. 专家级负载均衡损失（Expert-level Balance Loss）</strong></p>\n<p>标准 MoE 中常用的 token 级负载均衡损失在扩散模型中效果不佳，因为视觉 token 的空间结构导致某些位置的 token 天然倾向于选择特定专家。DiT-MoE 提出以<strong>专家粒度</strong>计算负载均衡：</p>\n<p>$$\\mathcal{L}_{\\text{balance}} = \\alpha \\cdot n \\cdot \\sum_{i=1}^{n} f_i \\cdot P_i$$</p>\n<p>其中：\n- \\(f_i = \\frac{1}{T} \\sum_{t=1}^{T} \\mathbf{1}[\\text{expert } i \\in \\text{TopK}(x_t)]\\) 是专家 \\(i\\) 被选中的 token 比例\n- \\(P_i = \\frac{1}{T} \\sum_{t=1}^{T} g_i(x_t)\\) 是所有 token 对专家 \\(i\\) 的平均门控概率\n- \\(\\alpha = 0.05\\) 是平衡系数</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：与 token 级损失（鼓励每个 token 均匀选择专家）不同，专家级损失关注的是<strong>全局视角下每个专家的总负载是否均衡</strong>。这允许个别 token 对特定专家有强烈偏好（如空间位置特化），同时确保整体系统不会出现某些专家过载而其他专家闲置的情况。</div>\n<p><img alt=\"训练损失曲线\" src=\"https://ar5iv.labs.arxiv.org/html/2407.11633/assets/images/loss.png\" />\n<em>图：不同负载均衡损失的训练曲线对比。专家级损失（expert-level）收敛更快且最终损失更低。</em></p>\n<p><strong>4. 模型配置与命名规则</strong></p>\n<p>DiT-MoE 采用 <code>{Size}/{Patch}-{n}E{K}A</code> 的命名规则，例如 <code>XL/2-8E2A</code> 表示 XL 尺寸、patch size=2、8 个专家中激活 2 个。完整配置如下：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>层数</th>\n<th>隐藏维度</th>\n<th>注意力头</th>\n<th>总专家数</th>\n<th>激活专家数</th>\n<th>总参数</th>\n<th>激活参数</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>S/2-8E2A</td>\n<td>12</td>\n<td>384</td>\n<td>6</td>\n<td>8</td>\n<td>2</td>\n<td>199M</td>\n<td>33M</td>\n</tr>\n<tr>\n<td>B/2-8E2A</td>\n<td>12</td>\n<td>768</td>\n<td>12</td>\n<td>8</td>\n<td>2</td>\n<td>795M</td>\n<td>130M</td>\n</tr>\n<tr>\n<td>L/2-8E2A</td>\n<td>24</td>\n<td>1024</td>\n<td>16</td>\n<td>8</td>\n<td>2</td>\n<td>2.8B</td>\n<td>458M</td>\n</tr>\n<tr>\n<td>XL/2-8E2A</td>\n<td>28</td>\n<td>1152</td>\n<td>16</td>\n<td>8</td>\n<td>2</td>\n<td>4.1B</td>\n<td>1.5B</td>\n</tr>\n<tr>\n<td>G/2-16E2A</td>\n<td>40</td>\n<td>1536</td>\n<td>24</td>\n<td>16+16shared</td>\n<td>2</td>\n<td>16.5B</td>\n<td>3.1B</td>\n</tr>\n</tbody>\n</table></div>\n<h5>路由分析与专家特化</h5>\n<p>DiT-MoE 论文对路由机制进行了深入分析，揭示了扩散 MoE 中专家特化的独特模式：</p>\n<p><img alt=\"类别条件路由热力图\" src=\"https://ar5iv.labs.arxiv.org/html/2407.11633/assets/images/class.png\" />\n<em>图：不同类别条件下的专家选择频率热力图。专家路由对类别信息不敏感，不同类别的路由模式高度相似。</em></p>\n<p><img alt=\"空间位置路由热力图\" src=\"https://ar5iv.labs.arxiv.org/html/2407.11633/assets/images/patch.png\" />\n<em>图：不同空间位置的专家选择频率。浅层（MoE layer 0）专家与空间位置强相关，深层（MoE layer 9）趋于均匀分布。</em></p>\n<p><img alt=\"时间步路由热力图\" src=\"https://ar5iv.labs.arxiv.org/html/2407.11633/assets/images/step.png\" />\n<em>图：不同去噪时间步的专家选择频率。早期步骤（&lt;50）专家选择集中，后期步骤（&gt;100）趋于均匀。</em></p>\n<p>这些发现揭示了三个重要规律：\n1. <strong>空间特化优先于语义特化</strong>：专家更倾向于按空间位置分工，而非按图像类别分工，这与扩散模型主要学习局部去噪模式的直觉一致。\n2. <strong>层深度影响特化程度</strong>：浅层专家高度空间特化（类似于学习位置相关的纹理模式），深层专家选择更均匀（处理更全局的语义信息）。\n3. <strong>时间步影响路由集中度</strong>：早期去噪步骤（噪声大）需要更专注的处理，后期步骤（接近清晰图像）的处理更加通用。</p>\n<h5>与密集模型的性能对比</h5>\n<p>在 ImageNet 256×256 上，DiT-MoE-XL/2-8E2A 以仅 1.5B 激活参数取得 FID=1.72，显著超越：\n- DiT-XL/2（675M 参数，FID=2.27）\n- Large-DiT-3B（3B 参数，FID=2.10）\n- Large-DiT-7B（7B 参数，FID=2.28）\n- SiT-XL/2（FID=2.06）</p>\n<p>在 ImageNet 512×512 上，DiT-MoE-G/2-16E2A（16.5B 总参数，3.1B 激活参数）取得 FID=1.80，为当时该基准的 SOTA。</p>\n<div class=\"key-point\">💡 <strong>关键结论</strong>：DiT-MoE 证明了稀疏 MoE 在扩散模型中的巨大潜力——通过条件计算，可以在推理成本远低于同等密集模型的情况下，实现更优的生成质量。这为扩散模型的进一步扩展（scaling）指明了方向。</div>\n<h5>训练细节</h5>\n<ul>\n<li><strong>优化器</strong>：AdamW，学习率 \\(1 \\times 10^{-4}\\)，无权重衰减</li>\n<li><strong>批大小</strong>：1024</li>\n<li><strong>EMA 衰减率</strong>：0.9999</li>\n<li><strong>MoE 间隔</strong>：默认每层（\\(e=1\\)）均使用 MoE</li>\n<li><strong>Giant 模型数据增强</strong>：使用 SDXL 和 SD3 生成 500 万张合成图像，与真实 ImageNet 数据以 1:5 比例混合</li>\n<li><strong>采样</strong>：DDPM 250 步，classifier-free guidance scale=1.5</li>\n</ul>",
      "quiz": {
        "q": "DiT-MoE 中共享专家（Shared Expert）的主要设计目的是什么？",
        "options": [
          "减少模型总参数量以加速推理",
          "捕获不同输入间的共性知识，减少路由专家间的冗余表示",
          "替代 classifier-free guidance 提供类别条件信息",
          "在训练初期稳定路由网络的梯度更新"
        ],
        "answer": 1,
        "explain": "共享专家始终被激活以处理所有输入共有的通用特征（如低频纹理、全局结构），从而释放路由专家去学习更加差异化的细粒度表示，提升模型容量利用效率。消融实验表明 n_s=2 个共享专家时 FID 最优。"
      }
    },
    {
      "id": "dynamic-dit",
      "num": 11,
      "name": "Dynamic DiT",
      "fullName": "动态扩散Transformer (Dynamic Diffusion Transformer)",
      "year": "2025",
      "org": "Multiple Institutions",
      "parent": "dit",
      "paperUrl": "https://arxiv.org/abs/2410.03456",
      "projectUrl": "",
      "category": "diffusion",
      "motivation": "动态计算分配消除扩散冗余",
      "summary": "DyDiT 提出**时间步动态宽度 (TDW)** 和**空间动态Token (SDT)** 两种即插即用机制，通过轻量路由器在每个去噪步自适应调整Transformer的宽度（激活的注意力头和MLP通道数）与活跃Token数量，在 ImageNet 256×256 上以不到 DiT-XL 50% 的 FLOPs 达到 2.07 FID，实现 1.73× 实际加速。",
      "keyPoints": [
        "<strong>时间步动态宽度 (TDW)</strong>：基于 sigmoid 路由器，根据时间步嵌入动态激活/停用注意力头和 MLP 通道组，阈值 0.5 二值化",
        "<strong>空间动态Token (SDT)</strong>：token 路由器逐 token 预测是否跳过 MLP 块，仅作用于 MLP（非 MHSA），通过 gather/scatter 操作实现实际加速",
        "<strong>FLOPs 约束损失</strong>：\\(\\mathcal{L}_{\\text{FLOPs}} = \\left(\\frac{1}{B}\\sum_{t_b} \\frac{F_{\\text{dynamic}}^{t_b}}{F_{\\text{static}}} - \\lambda\\right)^2\\)，超参 \\(\\lambda\\) 控制目标 FLOPs 比率",
        "<strong>训练稳定化</strong>：warm-up 阶段保留完整 DiT 结构；magnitude 排序确保至少 1 个 head/channel 组始终激活",
        "<strong>极低微调成本</strong>：仅需预训练迭代次数的不到 3%（200K / 7M）即可适配动态架构",
        "<strong>核心结果</strong>：DyDiT-XL (\\(\\lambda=0.5\\)) 在 ImageNet 256×256 上 FID 2.07、FLOPs 57.88G（DiT-XL 为 118G），1.73× 实际推理加速"
      ],
      "detail": "<h5>动机与背景</h5>\n<p>扩散模型（Diffusion Models）通过迭代去噪生成高质量图像，但每一步都使用<strong>完全相同的网络架构和计算量</strong>，忽略了不同时间步和不同空间位置的计算需求差异。如下图所示，早期去噪步（高噪声）主要处理全局结构，后期步骤（低噪声）聚焦局部细节；同时图像中的平坦区域（如背景）相比纹理丰富区域需要更少的计算。</p>\n<p><img alt=\"DyDiT 动机分析\" src=\"https://ar5iv.labs.arxiv.org/html/2410.03456/assets/x1.png\" />\n<em>图1：不同时间步下注意力头和 MLP 通道的激活模式差异（上），以及不同空间位置的 token 重要性差异（下），揭示了扩散Transformer中存在的时间步和空间冗余。</em></p>\n<p>传统的模型压缩方法（剪枝、蒸馏）采用<strong>静态</strong>策略，对所有时间步和所有 token 施加相同的压缩比，无法适应扩散过程中动态变化的计算需求。DyDiT 的核心洞察是：<strong>不同去噪阶段和不同空间位置应分配不同的计算资源</strong>。</p>\n<h5>整体架构</h5>\n<p><img alt=\"DyDiT 架构总览\" src=\"https://ar5iv.labs.arxiv.org/html/2410.03456/assets/x2.png\" />\n<em>图2：DyDiT 架构总览。左侧为整体框架，右侧分别展示 TDW（时间步动态宽度）和 SDT（空间动态Token）的具体实现。</em></p>\n<p>DyDiT 在标准 DiT 的每个 Transformer 层中引入两个轻量路由模块：</p>\n<ol>\n<li><strong>TDW 路由器</strong>：接收时间步嵌入，输出 head mask 和 channel mask，控制 MHSA 和 MLP 的有效宽度</li>\n<li><strong>SDT 路由器</strong>：接收每个 token 的隐藏表示，输出 token mask，决定哪些 token 跳过当前 MLP 块</li>\n</ol>\n<h5>时间步动态宽度 (TDW) 机制</h5>\n<p>TDW 的核心思想是：<strong>不同时间步需要不同数量的注意力头和 MLP 通道</strong>。</p>\n<p>对于每个 Transformer 层，TDW 路由器是一个简单的线性层 + sigmoid 激活：</p>\n<p>$$\\mathbf{M}_{\\text{head}} = \\mathbb{1}\\left[\\sigma(\\mathbf{W}_{\\text{head}} \\cdot \\mathbf{e}_t) > 0.5\\right]$$</p>\n<p>$$\\mathbf{M}_{\\text{channel}} = \\mathbb{1}\\left[\\sigma(\\mathbf{W}_{\\text{channel}} \\cdot \\mathbf{e}_t) > 0.5\\right]$$</p>\n<p>其中 \\(\\mathbf{e}_t\\) 是时间步嵌入，\\(\\sigma\\) 是 sigmoid 函数，\\(\\mathbb{1}[\\cdot > 0.5]\\) 将连续值二值化为 0/1 mask。</p>\n<div class=\"key-point\">💡 <strong>关键设计</strong>：训练时使用 sigmoid 连续值保持梯度可传播；推理时以 0.5 为阈值硬二值化，实现真正的计算跳过。</div>\n<p><strong>MHSA 动态宽度</strong>：mask \\(\\mathbf{M}_{\\text{head}} \\in \\{0,1\\}^H\\) 控制 \\(H\\) 个注意力头的激活状态。被停用的 head 完全跳过 QKV 投影和注意力计算。</p>\n<p><strong>MLP 动态宽度</strong>：MLP 的隐藏维度被均匀分为 \\(G\\) 组，mask \\(\\mathbf{M}_{\\text{channel}} \\in \\{0,1\\}^G\\) 控制每组通道的激活。被停用的通道组跳过矩阵乘法。</p>\n<p><strong>训练稳定化</strong>：为防止路由器在训练初期产生极端 mask（全 0 或全 1），采用两个策略：\n1. <strong>Warm-up</strong>：训练初期所有 mask 设为全 1，保留完整 DiT 结构\n2. <strong>Magnitude 排序</strong>：按 sigmoid 输出值排序，确保至少 1 个 head 和 1 个 channel 组始终激活</p>\n<h5>空间动态Token (SDT) 机制</h5>\n<p>SDT 的核心思想是：<strong>图像中不同空间位置的 token 需要不同程度的处理</strong>。</p>\n<p>SDT 仅作用于 MLP 块（不影响 MHSA，因为注意力需要全局 token 交互）。对于每个 token \\(\\mathbf{x}_i\\)，token 路由器预测其是否应跳过当前 MLP 块：</p>\n<p>$$\\mathbf{M}_{\\text{token},i} = \\mathbb{1}\\left[\\sigma(\\mathbf{w}_{\\text{token}}^T \\cdot \\mathbf{x}_i) > 0.5\\right]$$</p>\n<p>被标记为跳过的 token 直接通过残差连接传递，不经过 MLP 计算。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：SDT 仅应用于 MLP 块而非 MHSA 块。这是因为自注意力机制需要所有 token 参与全局交互，跳过部分 token 会破坏注意力矩阵的完整性。</div>\n<p><strong>实际加速实现</strong>：通过 <code>gather</code> 操作收集活跃 token 形成紧凑张量，送入 MLP 计算后再通过 <code>scatter</code> 操作将结果放回原始位置，实现真正的 FLOPs 节省和实际加速。</p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># DyDiT 单层前向传播伪代码\ndef dydit_block_forward(x, t_emb):\n    &quot;&quot;&quot;\n    x: [B, N, D] token features\n    t_emb: [B, D_t] timestep embedding\n    &quot;&quot;&quot;\n    # === TDW: 时间步动态宽度 ===\n    head_mask = (sigmoid(W_head @ t_emb) &gt; 0.5)    # [B, H]\n    channel_mask = (sigmoid(W_channel @ t_emb) &gt; 0.5)  # [B, G]\n    # magnitude排序确保至少1个激活\n    head_mask = ensure_min_active(head_mask, min_k=1)\n    channel_mask = ensure_min_active(channel_mask, min_k=1)\n\n    # === MHSA with dynamic width ===\n    # 仅对激活的 head 计算 Q, K, V\n    active_heads = select(heads, head_mask)\n    attn_out = multi_head_attention(x, active_heads)  # 全部token参与\n    x = x + attn_out\n\n    # === SDT: 空间动态Token ===\n    token_mask = (sigmoid(w_token @ x) &gt; 0.5)  # [B, N]\n    active_idx = gather(token_mask)  # 收集活跃token索引\n\n    # === MLP with dynamic width + dynamic tokens ===\n    x_active = x[active_idx]  # gather: 仅取活跃token\n    active_channels = select(mlp_weights, channel_mask)\n    mlp_out = mlp_forward(x_active, active_channels)\n    x = scatter(x, active_idx, mlp_out)  # scatter: 放回原位\n\n    return x\n</code></pre>\n<h5>训练目标</h5>\n<p>整体训练损失由原始 DiT 去噪损失和 FLOPs 约束损失组成：</p>\n<p>$$\\mathcal{L} = \\mathcal{L}_{\\text{DiT}} + \\mathcal{L}_{\\text{FLOPs}}$$</p>\n<p>其中 FLOPs 约束损失为：</p>\n<p>$$\\mathcal{L}_{\\text{FLOPs}} = \\left(\\frac{1}{B}\\sum_{t_b: b \\in [1,B]} \\frac{F_{\\text{dynamic}}^{t_b}}{F_{\\text{static}}} - \\lambda\\right)^2$$</p>\n<p>\\(\\lambda\\) 是目标 FLOPs 比率超参数（如 0.5 表示目标为原始 FLOPs 的 50%）。动态 FLOPs \\(F_{\\text{dynamic}}^{t_b}\\) 根据三种 mask 计算：</p>\n<p>$$F_{\\text{dynamic}}^{t_b} = \\sum_{\\ell} \\left( f_{\\text{MHSA}}^{\\ell}(\\mathbf{M}_{\\text{head}}^{\\ell}) + f_{\\text{MLP}}^{\\ell}(\\mathbf{M}_{\\text{channel}}^{\\ell}, \\mathbf{M}_{\\text{token}}^{\\ell}) \\right)$$</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：FLOPs 损失是在 batch 内对不同时间步取平均后与目标比较，允许模型在不同时间步分配不同计算量，只要平均达标即可。</div>\n<h5>实验结果</h5>\n<p><strong>主实验（ImageNet 256×256）</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>Params (M)</th>\n<th>GFLOPs</th>\n<th>FID↓</th>\n<th>sFID↓</th>\n<th>IS↑</th>\n<th>Precision↑</th>\n<th>Recall↑</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>DiT-XL</td>\n<td>675</td>\n<td>118.0</td>\n<td>2.27</td>\n<td>4.60</td>\n<td>277.00</td>\n<td>0.83</td>\n<td>0.57</td>\n</tr>\n<tr>\n<td>DyDiT-XL (λ=0.7)</td>\n<td>678</td>\n<td>84.33</td>\n<td>2.12</td>\n<td>4.61</td>\n<td><strong>284.31</strong></td>\n<td>0.81</td>\n<td>0.60</td>\n</tr>\n<tr>\n<td>DyDiT-XL (λ=0.5)</td>\n<td>678</td>\n<td><strong>57.88</strong></td>\n<td><strong>2.07</strong></td>\n<td><strong>4.56</strong></td>\n<td>248.03</td>\n<td>0.80</td>\n<td><strong>0.61</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><img alt=\"FLOPs-FID 权衡曲线\" src=\"https://ar5iv.labs.arxiv.org/html/2410.03456/assets/x3.png\" />\n<em>图3：FLOPs 与 FID 的权衡关系。DyDiT 在各 FLOPs 水平下均优于静态模型和剪枝方法。</em></p>\n<p><strong>消融实验（Table 3 关键结论）</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>配置</th>\n<th>FID↓</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>仅 TDW</td>\n<td>20.93</td>\n</tr>\n<tr>\n<td>仅 SDT</td>\n<td>35.12</td>\n</tr>\n<tr>\n<td>TDW + SDT（完整 DyDiT）</td>\n<td><strong>16.94</strong></td>\n</tr>\n<tr>\n<td>随机 mask（对照）</td>\n<td>136.01</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键发现</strong>：TDW 和 SDT 具有强互补性——单独使用效果有限，组合后 FID 大幅下降。随机 mask 导致性能崩溃，验证了学习路由策略的必要性。</div>\n<p><strong>推理加速</strong>：DyDiT-XL (λ=0.5) 实现 <strong>1.73×</strong> 实际推理加速（基于 gather/scatter 的真实 wall-clock 时间测量，而非仅理论 FLOPs 减少）。</p>\n<p><strong>微调效率</strong>：DiT-XL 预训练 7,000,000 次迭代，DyDiT 仅需额外 200,000 次微调迭代（不到 3%）即可完成动态架构适配。</p>\n<p><img alt=\"DyDiT 生成可视化\" src=\"https://ar5iv.labs.arxiv.org/html/2410.03456/assets/x5.png\" />\n<em>图5：DyDiT 在不同时间步的动态计算分配可视化。早期步骤（高噪声）激活更多计算资源处理全局结构，后期步骤（低噪声）自适应减少计算量。</em></p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>静态剪枝/蒸馏</th>\n<th>DyDiT</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>压缩策略</td>\n<td>所有时间步和 token 统一压缩</td>\n<td>按时间步和空间位置动态分配</td>\n</tr>\n<tr>\n<td>适应性</td>\n<td>无（固定结构）</td>\n<td>路由器根据输入自适应决策</td>\n</tr>\n<tr>\n<td>训练成本</td>\n<td>通常需要完整重训练</td>\n<td>仅需 &lt;3% 额外微调</td>\n</tr>\n<tr>\n<td>加速方式</td>\n<td>理论 FLOPs 减少，实际加速有限</td>\n<td>gather/scatter 实现真实加速</td>\n</tr>\n<tr>\n<td>性能保持</td>\n<td>通常有明显性能下降</td>\n<td>FID 甚至优于原始模型（2.07 vs 2.27）</td>\n</tr>\n</tbody>\n</table></div>\n<h5>局限性</h5>\n<p>论文主要聚焦于<strong>图像生成</strong>任务，未探索在视频生成、3D 生成等其他扩散模型应用中的效果。此外，路由器的决策在不同硬件上的加速效果可能存在差异。</p>",
      "quiz": {
        "q": "DyDiT 的空间动态Token (SDT) 机制为什么仅应用于 MLP 块而不应用于 MHSA 块？",
        "options": [
          "因为 MLP 块的计算量远大于 MHSA 块",
          "因为自注意力需要所有 token 参与全局交互，跳过部分 token 会破坏注意力矩阵的完整性",
          "因为 MHSA 块已经通过 TDW 机制进行了动态宽度调整，无需再做 token 级优化",
          "因为 token 路由器无法处理 MHSA 块的多头结构"
        ],
        "answer": 1,
        "explain": "MHSA 的自注意力机制要求所有 token 相互计算注意力权重，跳过部分 token 会导致注意力矩阵不完整，影响全局信息聚合。因此 SDT 仅在不需要全局交互的 MLP 块中跳过冗余 token。"
      }
    },
    {
      "id": "q-dit",
      "num": 12,
      "name": "Q-DiT",
      "fullName": "量化扩散Transformer (Quantized DiT)",
      "year": "2025",
      "org": "Multiple Institutions",
      "parent": "dit",
      "paperUrl": "https://arxiv.org/abs/2406.09923",
      "projectUrl": "",
      "category": "diffusion",
      "motivation": "高精度后量化支持W6A8低比特推理",
      "summary": "Q-DiT 的核心目标是：高精度后量化支持W6A8低比特推理。",
      "keyPoints": [
        "核心动机：高精度后量化支持W6A8低比特推理",
        "演化来源：继承或改进自 dit",
        "代表机构：Multiple Institutions"
      ],
      "detail": "<p>高精度后量化支持W6A8低比特推理</p>"
    },
    {
      "id": "scott",
      "num": 13,
      "name": "SCott",
      "fullName": "随机一致性蒸馏 (Stochastic Consistency Distillation)",
      "year": "2025",
      "org": "Multiple Institutions",
      "parent": "consistency-model",
      "paperUrl": "https://arxiv.org/abs/2410.14297",
      "projectUrl": "",
      "category": "diffusion",
      "motivation": "提升少步采样质量的蒸馏技术",
      "summary": "SCott 将随机微分方程（SDE）求解器引入一致性蒸馏框架，通过控制噪声强度和多步 SDE 采样来释放教师模型的潜力，并结合 LoRA 判别器的对抗训练，仅用 2 步采样即可生成高质量图像，全面超越 LCM、InstaFlow 等同类加速方法。",
      "keyPoints": [
        "<strong>SDE 求解器替代 ODE</strong>：在一致性蒸馏（CD）中首次使用 SDE 求解器估计教师模型轨迹，理论证明其收敛性（Theorem 1），解决了 ODE 求解器离散化误差大的问题",
        "<strong>噪声强度控制</strong>：通过扩展逆时 SDE（ER-SDE）中的参数 \\(\\eta\\) 控制随机性强度，\\(\\eta \\to 0\\) 退化为 ODE，\\(\\eta = 1\\) 为标准逆时 SDE，实验最优 \\(\\eta = 1\\)",
        "<strong>多步 SDE 采样</strong>：在训练时从 \\(z_{t_n}\\) 到 \\(\\hat{z}_{t_m}\\) 使用 \\(h\\) 步 SDE 求解（默认 \\(h=3\\)），缩小离散化区间以降低误差",
        "<strong>LoRA 判别器 + GAN 损失</strong>：在预训练 U-Net 上附加 LoRA 层构建轻量判别器，融合时间步和文本条件，以对抗损失辅助少步采样的质量提升",
        "<strong>核心结果</strong>：MSCOCO-2017 5K 上 2 步 FID=21.9（LCM 为 27.4），MJHQ-5K 上 2 步 FID=24.9（LCM 为 37.2），4 步内性能持续提升"
      ],
      "detail": "<h5>框架总览</h5>\n<p><img alt=\"SCott 框架总览\" src=\"https://ar5iv.labs.arxiv.org/html/2403.01505/assets/x2.png\" />\n<em>图：SCott 训练框架。左侧为基于 SDE 求解器的一致性蒸馏，右侧为 LoRA 判别器的对抗训练。教师模型通过多步 SDE 采样从 \\(z_{t_n}\\) 生成 \\(\\hat{z}_{t_m}\\)，学生模型学习将 \\(z_{t_n}\\) 和 \\(\\hat{z}_{t_m}\\) 映射到一致的去噪结果。</em></p>\n<p><img alt=\"多步 SDE 采样示意\" src=\"https://ar5iv.labs.arxiv.org/html/2403.01505/assets/x3.png\" />\n<em>图：多步 SDE 求解器采样过程。通过将 \\([t_m, t_n]\\) 区间细分为 \\(h\\) 步，减小每步离散化误差。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># SCott 训练伪代码\n# 输入: 预训练教师模型 ε_teacher, 学生模型 f_θ, EMA模型 f_θ⁻, LoRA判别器 D_φ\n# 超参: η=1 (噪声强度), h=3 (SDE步数), λ_adv=0.4 (对抗权重)\n\nfor iteration in range(40000):\n    # 1. 采样时间步对 (t_n, t_m), 其中 t_m = t_{n-24}\n    n = uniform_sample(boundaries)  # 从时间步边界均匀采样\n    t_n, t_m = boundaries[n], boundaries[n - 24]\n\n    # 2. 采样噪声潜变量 z_{t_n}\n    x_0 = sample_from_dataset()\n    z_tn = alpha(t_n) * x_0 + sigma(t_n) * ε,  ε ~ N(0, I)\n\n    # 3. 多步 SDE 求解: z_{t_n} → ẑ_{t_m} (h=3 步)\n    z = z_tn\n    for step in range(h):\n        t_curr = t_n - step * (t_n - t_m) / h\n        t_next = t_n - (step + 1) * (t_n - t_m) / h\n        # ER-SDE 更新 (含噪声项 η·g(t)·dw̄)\n        score = ε_teacher(z, t_curr, c)  # 教师模型预测\n        z = sde_step(z, score, t_curr, t_next, η=1.0)\n    z_tm_hat = z\n\n    # 4. 一致性蒸馏损失\n    x_pred_n = f_θ(z_tn, t_n, c)      # 学生模型预测\n    x_pred_m = f_θ⁻(z_tm_hat, t_m, c)  # EMA 模型预测 (stop gradient)\n    L_cd = huber_loss(x_pred_n, x_pred_m)\n\n    # 5. 对抗损失 (LoRA 判别器)\n    L_adv = -D_φ(x_pred_n, c, t_n)  # 生成样本应被判为真\n    L_disc = D_φ(x_pred_n.detach(), c, t_n) - D_φ(x_real, c, t_n)  # 判别器损失\n\n    # 6. 总损失与更新\n    L_total = L_cd + λ_adv * L_adv\n    update(θ, L_total)\n    update(φ, L_disc)\n    ema_update(θ⁻, θ)\n</code></pre>\n<h5>动机与背景</h5>\n<p><strong>一致性蒸馏（CD）的瓶颈。</strong> 一致性模型（Consistency Model）通过学习概率流 ODE 轨迹上的一致性映射来实现少步生成。其蒸馏版本（CD）依赖教师扩散模型的 ODE 求解器来估计相邻时间步之间的映射目标。然而，ODE 求解器在大步长下存在显著的离散化误差，导致教师提供的监督信号不准确，最终限制了学生模型的生成质量。</p>\n<p><strong>为什么用 SDE 而非 ODE？</strong> 直觉上，SDE 求解器通过引入随机噪声项，可以在采样过程中\"探索\"更广泛的分布空间，从而提供更丰富的监督信号。SCott 的核心洞察是：虽然 SDE 采样路径不同于 ODE，但它们最终收敛到相同的边际分布，因此可以合法地用于一致性蒸馏。</p>\n<h5>核心机制详解</h5>\n<p><strong>1. 扩展逆时 SDE（ER-SDE）与噪声控制</strong></p>\n<p>标准扩散模型的前向过程为：</p>\n<p>$$dz_t = f(t)z_t \\, dt + g(t) \\, dw_t$$</p>\n<p>其逆时过程可以推广为一族 SDE（ER-SDE），由参数 \\(\\eta\\) 控制噪声强度：</p>\n<p>$$dz_t = \\left[ f(t)z_t - \\frac{1 + \\eta^2}{2} g^2(t) \\nabla_z \\log p_t(z_t) \\right] dt + \\eta \\, g(t) \\, d\\bar{w}_t$$</p>\n<p>其中 \\(\\eta = 0\\) 退化为概率流 ODE（即传统 CD 使用的方式），\\(\\eta = 1\\) 为标准逆时 SDE。关键性质是：<strong>对于任意 \\(\\eta \\geq 0\\)，ER-SDE 的边际分布 \\(p_t(z_t)\\) 保持不变</strong>。这意味着无论选择何种噪声强度，采样过程的边际分布始终正确。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：\\(\\eta\\) 的引入使得 CD 框架可以在确定性（ODE）和随机性（SDE）之间灵活切换。实验表明 \\(\\eta = 1\\)（完全随机）效果最佳，因为适度的随机性有助于缓解离散化误差的累积。</div>\n<p><strong>2. 收敛性保证（Theorem 1）</strong></p>\n<p>SCott 提供了理论保证：基于 SDE 求解器的一致性蒸馏在训练步数 \\(N \\to \\infty\\) 时收敛。具体地，对于一致性蒸馏损失：</p>\n<p>$$\\mathcal{L}_{CD}(\\theta, \\theta^-) = \\mathbb{E}\\left[ d\\left( f_\\theta(z_{t_n}, t_n, c), \\, f_{\\theta^-}(\\hat{z}_{t_m}, t_m, c) \\right) \\right]$$</p>\n<p>当 \\(N \\to \\infty\\) 时，\\(\\hat{z}_{t_m}\\) 的分布趋近于真实的条件分布 \\(p(z_{t_m} | z_{t_n})\\)，从而 \\(\\mathcal{L}_{CD} \\to 0\\)。这一结论对所有 \\(\\eta \\geq 0\\) 成立。</p>\n<p><strong>3. 多步 SDE 采样</strong></p>\n<p>单步 SDE 求解器在大时间间隔下误差较大。SCott 将区间 \\([t_m, t_n]\\) 等分为 \\(h\\) 个子区间，逐步求解：</p>\n<p>$$t_m = s_0 < s_1 < \\cdots < s_h = t_n$$</p>\n<p>每步使用一阶 SDE 求解器（Euler-Maruyama）更新。实验中 \\(h = 3\\) 步效果最佳（FID 从 \\(h=1\\) 的 27.2 降至 24.9）。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：多步采样仅在<strong>训练阶段</strong>使用，推理时学生模型仍然只需 1-4 步。这意味着训练成本增加（每次需调用教师模型 \\(h\\) 次），但推理效率不受影响。</div>\n<p><strong>4. LoRA 判别器与对抗训练</strong></p>\n<p>为进一步提升少步采样的视觉质量，SCott 引入了基于 LoRA 的轻量判别器：</p>\n<ul>\n<li><strong>架构</strong>：在预训练 U-Net 的注意力层上附加 LoRA 适配器（rank=64），冻结原始参数，仅训练 LoRA 权重</li>\n<li><strong>条件输入</strong>：同时接收时间步 \\(t\\) 和文本条件 \\(c\\)，帮助判别器在不同噪声水平下区分真假样本</li>\n<li><strong>输出</strong>：取 U-Net 中间特征的均值作为判别分数</li>\n</ul>\n<p>对抗损失采用非饱和 GAN 形式：</p>\n<p>$$\\mathcal{L}_{adv} = -\\mathbb{E}\\left[ D_\\phi(\\hat{x}_0, c, t) \\right]$$</p>\n<p>总训练目标为：</p>\n<p>$$\\mathcal{L} = \\mathcal{L}_{CD} + \\lambda_{adv} \\cdot \\mathcal{L}_{adv}, \\quad \\lambda_{adv} = 0.4$$</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：LoRA 判别器的参数量远小于完整 U-Net 判别器，但实验表明其效果更好（FID 21.9 vs 23.5），因为 LoRA 的低秩约束起到了正则化作用，防止判别器过拟合。</div>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>传统 CD (LCM)</th>\n<th>SCott</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>教师求解器</td>\n<td>ODE (DDIM/DPM++)</td>\n<td>SDE (ER-SDE)</td>\n</tr>\n<tr>\n<td>随机性</td>\n<td>无</td>\n<td>可控 (\\(\\eta\\) 参数)</td>\n</tr>\n<tr>\n<td>教师采样步数</td>\n<td>1 步</td>\n<td>\\(h\\) 步（默认 3）</td>\n</tr>\n<tr>\n<td>对抗训练</td>\n<td>无</td>\n<td>LoRA 判别器</td>\n</tr>\n<tr>\n<td>2 步 FID (COCO-2017)</td>\n<td>27.4</td>\n<td><strong>21.9</strong></td>\n</tr>\n<tr>\n<td>多样性 (Recall)</td>\n<td>0.8160</td>\n<td><strong>0.9114</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>SCott 相比 LCM 的核心优势在于：(1) SDE 求解器提供更准确的教师监督信号；(2) 随机性带来更高的生成多样性（Recall 从 0.816 提升至 0.911）；(3) 对抗训练弥补了少步采样的质量损失。</p>\n<h5>训练细节</h5>\n<ul>\n<li><strong>硬件</strong>：4 × NVIDIA A100 GPU</li>\n<li><strong>数据</strong>：LAION-Aesthetics 6+ 子集</li>\n<li><strong>训练量</strong>：40K 迭代，batch size = 40</li>\n<li><strong>学习率</strong>：模型 8e-6，判别器 2e-5</li>\n<li><strong>时间步跨度</strong>：\\(t_m = t_{n-24}\\)（在 1000 步离散化中跨 24 步）</li>\n<li><strong>EMA 衰减</strong>：0.95</li>\n</ul>",
      "quiz": {
        "q": "SCott 在一致性蒸馏中使用 SDE 求解器替代 ODE 求解器的理论基础是什么？",
        "options": [
          "SDE 求解器的计算速度比 ODE 求解器更快",
          "ER-SDE 族对任意噪声强度 η 保持相同的边际分布，因此可合法用于一致性蒸馏",
          "SDE 求解器不需要教师模型的梯度信息",
          "SDE 求解器可以跳过中间时间步直接生成最终图像"
        ],
        "answer": 1,
        "explain": "ER-SDE 的关键性质是：无论 η 取何值，采样过程的边际分布 p_t(z_t) 保持不变。这保证了 SDE 求解器产生的目标与 ODE 一样合法，同时随机性有助于降低离散化误差。"
      }
    },
    {
      "id": "e-dit",
      "num": 14,
      "name": "E-DiT",
      "fullName": "弹性扩散Transformer (Elastic Diffusion Transformer)",
      "year": "2026",
      "org": "Multiple Institutions",
      "parent": "dynamic-dit",
      "paperUrl": "https://arxiv.org/abs/2602.13993",
      "projectUrl": "",
      "category": "diffusion",
      "motivation": "弹性宽度调整优化推理效率",
      "summary": "E-DiT 为每个 DiT block 引入轻量级路由器（Router），在推理时**自适应地跳过冗余 block 并动态缩减 MLP 宽度**，结合 block 级特征缓存机制，在 Qwen-Image、FLUX 和 Hunyuan3D-3.0 上实现约 2× 加速且几乎无质量损失。",
      "keyPoints": [
        "<strong>轻量路由器（Router）</strong>：每个 DiT block 配备一个参数量极小的路由器，基于输入 latent 和时间步条件，预测该 block 的跳过概率 \\(p_g\\) 和 MLP 最优宽度比 \\(p_w\\)",
        "<strong>Block 跳过机制</strong>：路由器输出经 Sigmoid 后通过 Straight-Through Estimator（STE）二值化（阈值 \\(\\tau=0.5\\)），实现端到端可微的 block 级跳过决策",
        "<strong>MLP 弹性宽度缩减</strong>：从候选集 \\(\\{1/4, 1/2, 3/4, 1\\}\\) 中选择最优 MLP 宽度比，训练时用 activation masking 保持梯度流，推理时直接矩阵切片",
        "<strong>联合训练目标</strong>：性能损失 \\(\\mathcal{L}_{\\text{perf}}\\)（flow-matching）+ 效率损失 \\(\\mathcal{L}_{\\text{eff}}\\)（gating + width 正则），权重 \\(\\lambda=1\\)，从全容量预训练权重初始化",
        "<strong>Block 级特征缓存</strong>：推理时对\"边界区域\"（\\(p_g \\in [\\tau, \\tau+\\delta]\\)）的 block 复用缓存残差 \\(\\Delta\\)，最多连续复用 \\(K\\) 步，无需额外训练",
        "<strong>广泛验证</strong>：在 2D 图像（Qwen-Image、FLUX）和 3D 资产（Hunyuan3D-3.0）三大模型上均取得约 2× 加速，质量指标几乎无下降"
      ],
      "detail": "<p><img alt=\"E-DiT 整体框架\" src=\"https://ar5iv.labs.arxiv.org/html/2602.13993/assets/x1.png\" />\n<em>图 1：E-DiT 整体框架。每个 DiT block 配备轻量路由器，动态决定 block 跳过与 MLP 宽度缩减；推理时结合 block 级特征缓存进一步消除冗余计算。</em></p>\n<p><img alt=\"E-DiT 路由器架构与训练细节\" src=\"https://ar5iv.labs.arxiv.org/html/2602.13993/assets/x2.png\" />\n<em>图 2：路由器架构细节。路由器接收 block 输入特征，经时间步条件 LayerNorm 调制后，通过线性层映射到隐藏维度 \\(H_r\\)，再分别输出 gating head（1 维）和 width head（4 维）。</em></p>\n<pre><code class=\"language-python\"># E-DiT 推理伪代码\ndef e_dit_inference(x, t, blocks, routers, cache, delta, K, tau):\n    &quot;&quot;&quot;\n    x: 输入 latent [B, N, D]\n    t: 时间步\n    blocks: DiT block 列表\n    routers: 对应路由器列表\n    cache: 每个 block 的缓存残差 {block_id: (Delta, reuse_count)}\n    delta: 边界区域宽度\n    K: 最大连续复用次数\n    tau: 跳过阈值 (默认 0.5)\n    &quot;&quot;&quot;\n    for i, (block, router) in enumerate(zip(blocks, routers)):\n        # Step 1: 路由器预测\n        p_g, p_w = router(x, t)  # p_g: 跳过概率, p_w: 宽度分布\n\n        # Step 2: Block 跳过决策\n        if p_g &gt; tau + delta:\n            # 高置信跳过 → 直接 skip\n            continue\n        elif p_g &gt; tau and cache[i].reuse_count &lt; K:\n            # 边界区域 → 复用缓存残差\n            x = x + cache[i].Delta\n            cache[i].reuse_count += 1\n            continue\n        else:\n            # 执行该 block\n            width_ratio = select_width(p_w)  # argmax 选择 {1/4,1/2,3/4,1}\n            Delta = block.forward(x, t, width_ratio)  # MLP 矩阵切片\n            x = x + Delta\n            # 更新缓存\n            cache[i] = Cache(Delta=Delta, reuse_count=0)\n\n    return x\n</code></pre>\n<p><strong>动机与背景：为什么需要自适应加速？</strong></p>\n<p>扩散 Transformer（DiT）在图像、视频和 3D 生成领域展现了卓越的生成能力，但其计算代价极高——以 Qwen-Image 为例，单次生成需要 2431ms。传统加速方法如剪枝（pruning）和蒸馏（distillation）采用<strong>固定计算容量</strong>，即对所有输入样本和所有去噪时间步施加相同的压缩策略。然而，E-DiT 的作者通过实验观察到一个关键现象：DiT 的生成过程存在<strong>显著且样本依赖的稀疏性</strong>——不同输入样本在不同时间步下，各 block 的计算冗余程度差异巨大。例如，简单的纯色背景区域可能只需少量 block 参与计算，而复杂纹理区域则需要更多 block 的完整计算。这种稀疏性的<strong>输入依赖性</strong>使得固定策略无法同时兼顾效率和质量。</p>\n<p><strong>核心机制：路由器设计与双维度弹性</strong></p>\n<p>E-DiT 的核心创新在于为每个 DiT block 设计了一个极轻量的路由器（Router），其参数量仅占原 block 的约 0.1%。路由器的输入是当前 block 的输入特征 \\(\\mathbf{h} \\in \\mathbb{R}^{B \\times N \\times D}\\)，经过<strong>时间步条件 LayerNorm 调制</strong>（与 DiT 中的 adaLN 机制一致）后，通过一个线性层映射到隐藏维度 \\(H_r\\)，再经全局平均池化（Global Average Pooling）压缩空间维度，最终分出两个预测头：</p>\n<ol>\n<li><strong>Gating Head</strong>（block 跳过）：输出 1 维标量，经 Sigmoid 得到跳过概率 \\(p_g \\in [0,1]\\)。训练时通过 STE（Straight-Through Estimator）将其二值化为 \\(g \\in \\{0, 1\\}\\)：</li>\n</ol>\n<p>$$g = \\begin{cases} 1 & \\text{if } p_g > \\tau \\\\ 0 & \\text{otherwise} \\end{cases}, \\quad \\frac{\\partial \\mathcal{L}}{\\partial p_g} = \\frac{\\partial \\mathcal{L}}{\\partial g}$$</p>\n<p>当 \\(g=1\\) 时整个 block 被跳过，输出直接等于输入。</p>\n<ol>\n<li><strong>Width Head</strong>（MLP 宽度选择）：输出 4 维向量，经 Softmax 得到候选宽度比 \\(\\{1/4, 1/2, 3/4, 1\\}\\) 的概率分布。训练时采用 <strong>activation masking</strong> 策略——始终用完整 MLP 前向传播，但将超出所选宽度的激活值置零，从而保持梯度可微：</li>\n</ol>\n<p>$$\\text{MLP}_{\\text{masked}}(\\mathbf{x}) = (\\mathbf{x} \\cdot \\mathbf{W}_1) \\odot \\mathbf{m}_r \\cdot \\mathbf{W}_2$$</p>\n<p>其中 \\(\\mathbf{m}_r \\in \\{0,1\\}^{d_{\\text{ff}}}\\) 是由所选宽度比 \\(r\\) 决定的二值掩码，前 \\(r \\cdot d_{\\text{ff}}\\) 维为 1，其余为 0。推理时则直接对权重矩阵做切片（slicing），只计算前 \\(r \\cdot d_{\\text{ff}}\\) 列/行，实现真正的计算节省。</p>\n<div class=\"key-point\">💡 <strong>关键设计</strong>：训练时的 activation masking 与推理时的 matrix slicing 在数学上等价，但前者保持了完整的计算图以支持反向传播，后者则实现了真正的 FLOPs 节省。</div>\n<p><strong>训练策略：效率-质量联合优化</strong></p>\n<p>E-DiT 的训练损失由两部分组成：</p>\n<p>$$\\mathcal{L} = \\mathcal{L}_{\\text{perf}} + \\lambda \\cdot \\mathcal{L}_{\\text{eff}}$$</p>\n<p>其中 \\(\\mathcal{L}_{\\text{perf}}\\) 是标准的 flow-matching 损失（即预测速度场的 MSE），保证生成质量；\\(\\mathcal{L}_{\\text{eff}}\\) 是效率正则项，进一步分解为：</p>\n<p>$$\\mathcal{L}_{\\text{eff}} = \\mathcal{L}_{\\text{gating}} + \\mathcal{L}_{\\text{width}}$$</p>\n<p>$$\\mathcal{L}_{\\text{gating}} = \\max\\left(0, \\rho_g - \\frac{1}{L}\\sum_{i=1}^{L} p_g^{(i)}\\right)^2$$</p>\n<p>$$\\mathcal{L}_{\\text{width}} = \\max\\left(0, \\rho_w - \\frac{1}{L}\\sum_{i=1}^{L} \\mathbb{E}[r^{(i)}]\\right)^2$$</p>\n<p>这里 \\(\\rho_g\\) 和 \\(\\rho_w\\) 分别是目标跳过率和目标宽度缩减率。注意损失采用 <strong>hinge 形式</strong>（\\(\\max(0, \\cdot)\\)），即只在实际效率未达目标时才产生梯度，避免过度压缩。实验中 \\(\\lambda=1\\)。</p>\n<div class=\"warn-box\">⚠️ <strong>关键发现</strong>：从<strong>全容量预训练权重</strong>初始化（即所有路由器初始化为\"不跳过、全宽度\"）远优于随机初始化。这确保了训练初期模型保持原始生成质量，路由器在此基础上逐步学习哪些计算可以安全移除。</div>\n<p><strong>推理优化：Block 级特征缓存</strong></p>\n<p>在推理阶段，E-DiT 引入了一个<strong>无需额外训练</strong>的 block 级特征缓存机制。核心观察是：路由器预测的跳过概率 \\(p_g\\) 在阈值附近（即\"边界区域\" \\(p_g \\in [\\tau, \\tau+\\delta]\\)）的 block，其计算贡献较小但非零。对于这些 block，E-DiT 不是简单跳过，而是<strong>复用上一次该 block 被完整执行时的残差输出</strong> \\(\\Delta = \\text{Block}(\\mathbf{x}) - \\mathbf{x}\\)：</p>\n<p>$$\\mathbf{x}_{\\text{out}} = \\mathbf{x}_{\\text{in}} + \\Delta_{\\text{cached}}$$</p>\n<p>每个 block 最多连续复用 \\(K\\) 次缓存，超过后强制重新计算。消融实验表明，边界宽度 \\(\\delta\\) 比最大复用次数 \\(K\\) 对性能影响更大——\\(\\delta\\) 过大会引入过多近似误差，而适中的 \\(\\delta\\)（如 0.1-0.15）能在几乎不损失质量的前提下进一步提升 10-15% 的速度。</p>\n<p><strong>实验结果与路由器行为分析</strong></p>\n<p>E-DiT 在三个大规模生成模型上验证了有效性：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>原始延迟</th>\n<th>E-DiT 延迟</th>\n<th>加速比</th>\n<th>质量变化</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Qwen-Image (base)</td>\n<td>2431ms</td>\n<td>1627ms</td>\n<td>1.49×</td>\n<td>GenEval 0.74→0.73</td>\n</tr>\n<tr>\n<td>Qwen-Image (turbo)</td>\n<td>2431ms</td>\n<td>1283ms</td>\n<td>1.89×</td>\n<td>GenEval 0.74→0.72</td>\n</tr>\n<tr>\n<td>FLUX</td>\n<td>715ms</td>\n<td>374ms</td>\n<td>1.91×</td>\n<td>GenEval 0.76→0.75</td>\n</tr>\n<tr>\n<td>Hunyuan3D-3.0</td>\n<td>5012ms</td>\n<td>2587ms</td>\n<td>1.94×</td>\n<td>Chamfer ↑0.002</td>\n</tr>\n</tbody>\n</table></div>\n<p>路由器行为分析揭示了有趣的模式：（1）<strong>首尾 block 几乎从不被跳过</strong>，表明它们承担了关键的特征编码和输出映射功能；（2）<strong>中间 block 的跳过率随时间步变化</strong>，早期去噪步（高噪声）倾向于保留更多 block，后期步（低噪声/细节精修）则跳过更多；（3）<strong>不同输入样本的跳过模式差异显著</strong>，验证了自适应策略的必要性。</p>\n<p><img alt=\"路由器行为可视化\" src=\"https://ar5iv.labs.arxiv.org/html/2602.13993/assets/x5.png\" />\n<em>图 3：路由器在不同时间步和不同输入下的 block 跳过/宽度决策热力图，展示了 E-DiT 的自适应特性。</em></p>",
      "quiz": {
        "q": "E-DiT 在训练时对 MLP 宽度缩减采用 activation masking 而非直接矩阵切片，主要原因是什么？",
        "options": [
          "activation masking 计算速度更快",
          "保持完整计算图以支持反向传播梯度流",
          "activation masking 能减少显存占用",
          "直接矩阵切片会导致数值不稳定"
        ],
        "answer": 1,
        "explain": "训练时需要梯度回传到路由器的 width head，直接切片会截断计算图。activation masking 保留了完整的前向路径，仅将未选中维度的激活置零，数学上与切片等价但保持了可微性。"
      }
    },
    {
      "id": "gpdit",
      "num": 15,
      "name": "GPDiT",
      "fullName": "生成预训练自回归扩散Transformer (Generative Pre-trained Autoregressive DiT)",
      "year": "2026",
      "org": "Multiple Institutions",
      "parent": "dit",
      "paperUrl": "https://arxiv.org/abs/2510.12345",
      "projectUrl": "",
      "category": "diffusion",
      "motivation": "帧间因果注意力提升视频连贯性",
      "summary": "GPDiT 提出了一种帧级自回归扩散 Transformer 框架，通过因果注意力机制保证时序一致性，并创新性地将扩散前向过程重新解释为复平面上的旋转操作，从而以无参数方式注入时间步信息（替代 adaLN-Zero，节省约 28% 参数），在视频生成、视频表征和少样本学习任务上均展现出强竞争力。",
      "keyPoints": [
        "核心动机：帧间因果注意力提升视频连贯性",
        "演化来源：继承或改进自 dit",
        "代表机构：Multiple Institutions"
      ],
      "detail": "<h5>整体框架</h5>\n<p><img alt=\"GPDiT 框架总览\" src=\"https://ar5iv.labs.arxiv.org/html/2505.07344/assets/x2.png\" /></p>\n<p><em>图 2：GPDiT 框架。左：推理流程——逐帧自回归生成，每步以前序干净帧为条件扩散去噪当前帧；中：GPDiT Block 结构——用旋转式时间条件化替代 adaLN-Zero，用因果注意力替代双向注意力；右：扩散前向过程的旋转解释——数据与噪声在复平面上通过无参数旋转演化。</em></p>\n<p>GPDiT 的核心设计理念是将自回归建模（Autoregressive）与扩散模型（Diffusion）在连续潜空间中统一。与离散 token 的自回归方法（如 VideoPoet、OmniTokenizer）不同，GPDiT 直接在连续潜空间中操作，避免了量化损失。具体而言，视频被 WanVAE 编码器压缩（每 4 帧→1 个潜表示），然后模型以帧为单位进行自回归：给定已生成的干净帧序列 $c_1, c_2, \\ldots, c_{i-1}$，通过扩散过程生成下一帧 $c_i$。训练目标为标准的噪声预测损失：</p>\n<p>$$\\mathcal{L}(\\theta) = \\mathbb{E}_{t \\sim U[0,1],\\, \\epsilon \\sim \\mathcal{N}(0,I),\\, x \\sim p_{\\text{data}}} \\left\\| \\epsilon_\\theta(n_i, t \\mid c_{<i}) - \\epsilon^t \\right\\|^2$$</p>\n<h5>因果注意力机制</h5>\n<p><img alt=\"因果注意力变体\" src=\"https://ar5iv.labs.arxiv.org/html/2505.07344/assets/x3.png\" /></p>\n<p><em>图 3：两种因果注意力变体。(a)(c) 标准因果注意力（OF2）：干净帧之间互相关注；(b)(d) 轻量因果注意力（OF）：去除干净帧间注意力。$c_i$ 和 $n_i$ 分别表示干净帧和噪声帧。</em></p>\n<p><strong>标准因果注意力（OF2）</strong>：每个噪声帧 $n_i$ 仅关注之前的干净帧 $c_{&lt;i}$ 和自身，而干净帧之间也互相关注。这保证了时序因果性，同时允许干净上下文帧之间充分交互以提取丰富的条件信息。该设计天然兼容 KV 缓存，在推理时可显著加速长视频生成。</p>\n<p><strong>轻量因果注意力（OF）</strong>：标准因果注意力的主要问题是训练时需要维护噪声序列的干净副本用于注意力计算，导致内存和计算成本翻倍；推理时 KV 缓存随 token 累积不断膨胀。轻量变体利用视频数据的空间冗余性，去除干净帧之间的注意力计算。在标准设计中，注意力计算可分解为三部分：干净帧间注意力 $\\mathcal{O}(\\frac{1}{2}F^2)$、噪声帧与干净帧间注意力 $\\mathcal{O}(\\frac{1}{2}F^2)$、噪声帧自注意力 $\\mathcal{O}(F)$。轻量变体去除第一项后，额外开销从 $\\mathcal{O}(F^2)$ 降至 $\\mathcal{O}(F)$。实验表明，OF 在生成质量上与 OF2 相当（UCF-101 FVD: 216 vs 214），但在表征任务上 OF2 更优（干净帧交互增强了特征表达能力）。</p>\n<h5>旋转式时间条件化</h5>\n<p>传统 DiT 使用 adaLN-Zero（自适应层归一化）通过 MLP 将时间步嵌入注入每个 Transformer 块，这占据了模型约 28% 的参数量。GPDiT 提出了一种完全无参数的替代方案。</p>\n<p>其核心思想是将方差保持（VP）扩散前向过程重新解释为复平面上的旋转。定义旋转角 $\\theta_t$：</p>\n<p>$$\\cos\\theta_t = \\sqrt{\\bar{\\alpha}_t}, \\quad \\sin\\theta_t = \\sqrt{1 - \\bar{\\alpha}_t}$$</p>\n<p>将干净样本 $x_0$ 和噪声 $\\epsilon$ 堆叠为二维向量，前向过程即为正交旋转：</p>\n<p>$$\\begin{pmatrix} x_t^{(0)} \\\\ x_t^{(1)} \\end{pmatrix} = \\underbrace{\\begin{pmatrix} \\cos\\theta_t & \\sin\\theta_t \\\\ -\\sin\\theta_t & \\cos\\theta_t \\end{pmatrix}}_{R(\\theta_t)} \\begin{pmatrix} x_0 \\\\ \\epsilon \\end{pmatrix}$$</p>\n<p>其中 $x_t^{(0)}$ 是通常的扩散样本，$x_t^{(1)}$ 是其正交伴随。模型被训练为从 $x_t^{(0)}$ 预测 $x_t^{(1)}$。关键创新在于：对每个 Transformer 块的输入施加角度为 $\\theta_t$ 的反向旋转，即可高效地注入时间步信息，无需任何额外参数。其他条件（如文本、图像）仍通过标准方式（token 拼接或交叉注意力）注入。</p>\n<pre><code># GPDiT 推理伪代码\ndef gpdit_inference(initial_frames, num_generate, model, scheduler):\n    &quot;&quot;&quot;帧级自回归扩散推理&quot;&quot;&quot;\n    clean_frames = encode(initial_frames)  # WanVAE 编码\n\n    for i in range(num_generate):\n        # 初始化噪声帧\n        n_i = sample_noise()  # ~ N(0, I)\n\n        # 扩散去噪循环\n        for t in reversed(scheduler.timesteps):\n            theta_t = compute_rotation_angle(t)  # θ_t from noise schedule\n\n            # 对输入施加旋转式时间条件化（替代 adaLN-Zero）\n            rotated_input = apply_rotation(n_i, theta_t)\n\n            # 因果注意力：n_i 仅关注 clean_frames 和自身\n            noise_pred = model(rotated_input, context=clean_frames)\n\n            # 去噪步\n            n_i = scheduler.step(noise_pred, t, n_i)\n\n        # 将去噪结果加入干净帧序列（支持 KV 缓存）\n        clean_frames.append(n_i)\n\n    return decode(clean_frames)  # WanVAE 解码\n</code></pre>\n<h5>模型配置与训练</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>参数量</th>\n<th>训练数据</th>\n<th>训练策略</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>GPDiT-B</td>\n<td>80M</td>\n<td>UCF-101</td>\n<td>400k iter, lr=1e-4, batch=96</td>\n</tr>\n<tr>\n<td>GPDiT-H</td>\n<td>2.0B</td>\n<td>LAION-Aesthetic + 混合图像视频</td>\n<td>200k warmup(图像) + 200k(混合)</td>\n</tr>\n<tr>\n<td>GPDiT-H-LONG</td>\n<td>2.0B</td>\n<td>24M 纯视频</td>\n<td>续训 150k iter, lr=2e-5, 17-45帧</td>\n</tr>\n</tbody>\n</table></div>\n<p>GPDiT-H 的训练分三阶段：(1) 200k 迭代的无条件图像预训练（LAION-Aesthetic，batch=960）；(2) 200k 迭代的图像-视频混合训练（等比采样，视频每 3 帧采样裁剪为 17 帧片段）；(3) 150k 迭代的纯视频续训（可变长度 17-45 帧）。视频潜表示由 WanVAE 压缩（4 帧→1 个潜表示）。</p>\n<h5>实验结果</h5>\n<p><img alt=\"视频生成结果\" src=\"https://ar5iv.labs.arxiv.org/html/2505.07344/assets/x4.png\" /></p>\n<p><em>图 4：基于 MovieGenBench 数据集的 13 帧条件生成后续 16 帧的视频生成结果。</em></p>\n<p><strong>零样本视频生成（Table 2）</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>数据集</th>\n<th>模型</th>\n<th>FID↓</th>\n<th>FVD↓</th>\n<th>IS↑</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>MSRVTT</td>\n<td>SnapVideo (3.9B)</td>\n<td>8.5</td>\n<td>110</td>\n<td>-</td>\n</tr>\n<tr>\n<td>MSRVTT</td>\n<td><strong>GPDiT-H (2.0B)</strong></td>\n<td><strong>7.4</strong></td>\n<td><strong>68</strong></td>\n<td>-</td>\n</tr>\n<tr>\n<td>UCF-101</td>\n<td>PixelDance (1.5B)</td>\n<td>49.4</td>\n<td>243</td>\n<td>42.1</td>\n</tr>\n<tr>\n<td>UCF-101</td>\n<td><strong>GPDiT-H-LONG (2.0B)</strong></td>\n<td><strong>7.9</strong></td>\n<td><strong>218</strong></td>\n<td><strong>66.6</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>GPDiT-H 在 MSRVTT 上以 2B 参数实现了 FVD=68，大幅超越 SnapVideo（3.9B, FVD=110）。在 UCF-101 上，GPDiT-H-LONG 达到 FVD=218、IS=66.6。</p>\n<p><strong>UCF-101 训练对比（Table 3）</strong>：GPDiT-B（仅 80M 参数）在 UCF-101 上达到 FVD=214（OF2）/216（OF），与 FAR（130M, FVD=194）等更大模型相当，验证了框架的参数效率。</p>\n<p><strong>视频表征</strong>：通过线性探测实验评估特征质量。OF2 变体显著优于 OF，表明干净帧间的注意力交互增强了表征能力。GPDiT-H 在开放域数据上训练后，在 UCF-101 分类任务上展现了良好的泛化表征能力。</p>\n<p><strong>少样本学习</strong>：仅用 20 个视频序列（每个由 3 对任务特定图像对采样生成）进行监督微调，GPDiT 即可完成人体检测、图像上色、Canny 边缘重建和风格迁移等任务，展示了强大的下游迁移能力。</p>",
      "quiz": {
        "q": "",
        "options": [],
        "answer": 0,
        "explain": ""
      }
    },
    {
      "id": "framedit",
      "num": 16,
      "name": "FrameDiT",
      "fullName": "帧扩散Transformer (Frame Diffusion Transformer)",
      "year": "2026",
      "org": "Multiple Institutions",
      "parent": "dit",
      "paperUrl": "https://arxiv.org/abs/2603.09721",
      "projectUrl": "",
      "category": "diffusion",
      "motivation": "矩阵注意力机制高效生成长视频",
      "summary": "FrameDiT 提出 **矩阵注意力（Matrix Attention）** 机制，将每帧视为一个矩阵整体计算帧间时序相似度，以 \\(O(T^2 N_{qk}D + TND)\\) 的复杂度替代传统逐 token 时序注意力的 \\(O(T^2N)\\)，在保持全局时序感受野的同时大幅降低计算开销，实现高质量长视频生成。",
      "keyPoints": [
        "<strong>核心问题</strong>：视频 DiT 中时序注意力的效率瓶颈——Full 3D Attention 复杂度 \\(O(T^2N^2)\\) 不可扩展，Local Factorized Attention 虽降至 \\(O(T^2N + TN^2)\\) 但仅在相同空间位置做时序关联，无法捕捉大幅运动",
        "<strong>矩阵注意力（Matrix Attention）</strong>：将每帧所有空间 token 视为一个矩阵，通过行权重矩阵 \\(U\\) 将 \\(N\\) 个空间 token 压缩为 \\(N_{qk}\\) 行，利用 Frobenius 内积计算帧级相似度",
        "<strong>FrameDiT-G（Global）</strong>：用矩阵注意力直接替换 DiT 中的时序注意力，仅保留全局帧级建模",
        "<strong>FrameDiT-H（Hybrid）</strong>：并行运行局部时序注意力与全局矩阵注意力两个分支，通过拼接+线性投影融合（而非 softmax 门控，因其存在梯度消失问题）",
        "<strong>即插即用集成</strong>：冻结预训练 DiT 参数，仅训练新增的矩阵注意力模块，可直接集成到 Latte、OpenSora 等现有架构",
        "<strong>高效长视频扩展</strong>：在 128 帧生成任务中，FrameDiT-H 仅增加约 5% 的计算开销，而 Full 3D Attention 增加超过 200%",
        "<strong>SOTA 性能</strong>：在 UCF-101、Sky Time-lapse、Taichi-HD、FaceForensics 四个数据集上均取得最优 FVD；在 VBench 文本到视频基准上显著提升动态程度（Dynamic Degree 从 42.50 提升至 70.83）"
      ],
      "detail": "<h5>架构总览</h5>\n<p><img alt=\"FrameDiT 架构示意图\" src=\"https://arxiv.org/html/2603.09721v1/x2.png\" />\n<em>图：(a) 标准 Local Factorized Attention 仅在相同空间位置做时序关联；(b) FrameDiT-G 用矩阵注意力替换时序注意力；(c) FrameDiT-H 并行融合局部与全局两个分支。</em></p>\n<p><img alt=\"Matrix Attention 机制详解\" src=\"https://arxiv.org/html/2603.09721v1/x1.png\" />\n<em>图：Matrix Attention 的核心思想——将每帧视为矩阵，通过行权重矩阵压缩后计算帧级 Frobenius 内积相似度。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Matrix Attention 核心伪代码\n# 输入: Z = [z^1, z^2, ..., z^T], 每帧 z^t ∈ R^{N×D}\n# 参数: U ∈ R^{N×N_qk} (行权重矩阵), W_Q, W_K, W_V, B_Q, B_K\n\n# Step 1: 构造 Q/K/V\nU_norm = softmax(U, dim=0)          # 沿空间维度归一化, R^{N×N_qk}\nfor t in range(T):\n    Q[t] = U_norm.T @ Z[t] @ W_Q + B_Q   # R^{N_qk × D}\n    K[t] = U_norm.T @ Z[t] @ W_K + B_K   # R^{N_qk × D}\n    V[t] = Z[t] @ W_V                      # R^{N × D}, 不压缩\n\n# Step 2: 计算帧级相似度 (Frobenius 内积)\nfor i in range(T):\n    for j in range(T):\n        S[i,j] = frobenius_inner_product(Q[i], K[j]) / sqrt(N_qk * D)\n    alpha[i] = softmax(S[i, :])       # 帧级注意力权重\n\n# Step 3: 加权聚合\nfor i in range(T):\n    O[i] = sum(alpha[i,j] * V[j] for j in range(T))  # R^{N × D}\n\n# FrameDiT-H: 并行融合\nO_local = local_temporal_attention(Z)   # 标准逐token时序注意力\nO_global = matrix_attention(Z)          # 上述矩阵注意力\nO_fused = Linear(concat(O_local, O_global, dim=-1))  # 拼接+线性投影\n</code></pre>\n<h5>动机与背景：视频时序注意力的效率困境</h5>\n<p>视频扩散 Transformer（Video DiT）通常采用 <strong>空间-时序分离</strong> 的注意力设计。给定视频潜在表示 \\(Z \\in \\mathbb{R}^{T \\times N \\times D}\\)（\\(T\\) 帧，每帧 \\(N\\) 个空间 token，维度 \\(D\\)），现有方案面临两难：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方案</th>\n<th>时序复杂度</th>\n<th>全局感受野</th>\n<th>代表方法</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Full 3D Attention</td>\n<td>\\(O(T^2 N^2)\\)</td>\n<td>✅</td>\n<td>CogVideoX</td>\n</tr>\n<tr>\n<td>Local Factorized</td>\n<td>\\(O(T^2 N + T N^2)\\)</td>\n<td>❌</td>\n<td>Latte, OpenSora</td>\n</tr>\n<tr>\n<td><strong>Matrix Attention</strong></td>\n<td>\\(O(T^2 N_{qk} D + TND)\\)</td>\n<td>✅</td>\n<td><strong>FrameDiT</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>Full 3D Attention</strong> 将所有 \\(T \\times N\\) 个 token 展平后做全局自注意力，计算量随帧数和分辨率的平方增长，对长视频完全不可行。</p>\n<p><strong>Local Factorized Attention</strong>（如 Latte、OpenSora 采用）将空间和时序注意力完全解耦：时序注意力仅在 <strong>相同空间位置</strong> 的 token 之间计算。这意味着位置 \\((x, y)\\) 处的 token 只能\"看到\"其他帧中 \\((x, y)\\) 处的 token。当视频中存在大幅运动（如物体从画面左侧移动到右侧）时，运动前后的语义对应关系被完全切断。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：FrameDiT 的核心思想是——时序注意力不需要在 token 级别精确匹配，而应在 <strong>帧级别</strong> 建模整体时序关系。一帧的\"语义摘要\"可以通过对所有空间 token 的加权聚合来获得。</div>\n<h5>核心机制：矩阵注意力（Matrix Attention）</h5>\n<p><strong>标准向量注意力</strong> 中，Q/K/V 都是向量，相似度通过点积计算。<strong>矩阵注意力</strong> 的核心创新是将每帧的 Q/K 保持为 <strong>矩阵</strong> 形式，用 Frobenius 内积替代点积。</p>\n<p><strong>Step 1：行权重压缩构造 Q/K</strong></p>\n<p>对每帧 \\(z^t \\in \\mathbb{R}^{N \\times D}\\)，通过可学习的行权重矩阵 \\(U \\in \\mathbb{R}^{N \\times N_{qk}}\\) 将 \\(N\\) 个空间 token 压缩为 \\(N_{qk}\\) 行：</p>\n<p>$$Q^t = U^\\top z^t W_Q + B_Q \\in \\mathbb{R}^{N_{qk} \\times D}$$</p>\n<p>$$K^t = U^\\top z^t W_K + B_K \\in \\mathbb{R}^{N_{qk} \\times D}$$</p>\n<p>其中 \\(U\\) 经过 softmax 归一化（沿空间维度），使得每一行是所有空间 token 的凸组合。这相当于学习了 \\(N_{qk}\\) 个\"帧摘要视角\"，每个视角关注帧内不同的空间区域。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：V 矩阵 <strong>不做压缩</strong>，保持 \\(V^t = z^t W_V \\in \\mathbb{R}^{N \\times D}\\)，确保输出保留完整的空间分辨率。</div>\n<p><strong>Step 2：Frobenius 内积计算帧级相似度</strong></p>\n<p>两帧 \\(i, j\\) 之间的相似度通过矩阵的 Frobenius 内积计算：</p>\n<p>$$s(Q^i, K^j) = \\frac{\\langle Q^i, K^j \\rangle_F}{\\sqrt{N_{qk} \\cdot D}} = \\frac{\\text{tr}((Q^i)^\\top K^j)}{\\sqrt{N_{qk} \\cdot D}}$$</p>\n<p>Frobenius 内积等价于将矩阵展平为向量后做点积，但保留了矩阵结构的语义——它衡量两帧在 \\(N_{qk}\\) 个\"摘要视角\"上的整体一致性。归一化因子 \\(\\sqrt{N_{qk} \\cdot D}\\) 类比标准注意力中的 \\(\\sqrt{d_k}\\)。</p>\n<p><strong>Step 3：帧级注意力聚合</strong></p>\n<p>$$\\alpha_{ij} = \\text{softmax}_j\\left(s(Q^i, K^j)\\right)$$</p>\n<p>$$O^i = \\sum_{j=1}^{T} \\alpha_{ij} V^j \\in \\mathbb{R}^{N \\times D}$$</p>\n<p>注意输出 \\(O^i\\) 是一个 <strong>矩阵</strong>（而非向量），保持了完整的空间结构。每帧的输出是所有帧 V 矩阵的加权和，权重由帧级相似度决定。</p>\n<p><strong>多头机制</strong>：沿列维度 \\(D\\) 将 Q/K/V 矩阵切分为 \\(h\\) 个头，每个头独立计算矩阵注意力后拼接。</p>\n<p><strong>复杂度分析</strong>：\n- Q/K 构造：\\(O(T \\cdot N \\cdot N_{qk} \\cdot D)\\)\n- 相似度计算：\\(O(T^2 \\cdot N_{qk} \\cdot D)\\)\n- 聚合：\\(O(T^2 \\cdot N \\cdot D)\\)（但 \\(\\alpha\\) 是标量，实际为广播乘法）\n- 总计：\\(O(T^2 N_{qk} D + TND)\\)，当 \\(N_{qk} \\ll N\\) 时远优于 \\(O(T^2 N)\\)</p>\n<h5>FrameDiT-G vs FrameDiT-H：两种集成策略</h5>\n<p><strong>FrameDiT-G（Global Only）</strong>：直接用矩阵注意力 <strong>替换</strong> DiT 块中的时序注意力。每个 DiT 块的结构变为：空间自注意力 → 矩阵注意力（时序） → FFN。优点是简洁高效，缺点是完全丢失了 token 级的精细时序对应。</p>\n<p><strong>FrameDiT-H（Hybrid Parallel）</strong>：保留原始局部时序注意力，<strong>并行</strong> 添加矩阵注意力分支。两个分支的输出通过拼接后线性投影融合：</p>\n<p>$$O = \\text{Linear}\\left(\\text{Concat}(O_{\\text{local}}, O_{\\text{global}})\\right)$$</p>\n<div class=\"warn-box\">⚠️ <strong>设计选择</strong>：论文尝试了 softmax 门控融合（\\(O = \\sigma(g) \\cdot O_{\\text{local}} + (1-\\sigma(g)) \\cdot O_{\\text{global}}\\)），但发现 softmax 门控存在梯度消失问题，导致训练不稳定。拼接+线性投影的方式更为稳定且效果更好。</div>\n<p><strong>训练策略</strong>：冻结预训练 DiT 的所有参数，仅训练新增的矩阵注意力模块参数（\\(U, W_Q, W_K, W_V, B_Q, B_K\\) 及融合层）。这使得 FrameDiT 可以作为即插即用模块集成到任何现有视频 DiT 中。</p>\n<h5>关键消融实验与结果</h5>\n<p><strong>U 矩阵归一化方式</strong>（Table 4）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>归一化</th>\n<th>UCF-101 FVD ↓</th>\n<th>Sky FVD ↓</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>None</td>\n<td>207.2</td>\n<td>57.1</td>\n</tr>\n<tr>\n<td>L1</td>\n<td>194.1</td>\n<td>50.5</td>\n</tr>\n<tr>\n<td>L2</td>\n<td>192.5</td>\n<td>49.8</td>\n</tr>\n<tr>\n<td><strong>Softmax</strong></td>\n<td><strong>170.1</strong></td>\n<td><strong>39.5</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>Softmax 归一化效果最佳，因为它确保 \\(U\\) 的每列是空间 token 的概率分布，具有明确的\"加权摘要\"语义。</p>\n<p><strong>压缩维度 \\(N_{qk}\\) 的影响</strong>（Table 5）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>\\(N_{qk}\\)</th>\n<th>UCF-101 FVD ↓</th>\n<th>Sky FVD ↓</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>195.2</td>\n<td>52.3</td>\n</tr>\n<tr>\n<td>16</td>\n<td>182.7</td>\n<td>45.1</td>\n</tr>\n<tr>\n<td><strong>64</strong></td>\n<td><strong>170.1</strong></td>\n<td><strong>39.5</strong></td>\n</tr>\n<tr>\n<td>256</td>\n<td>173.8</td>\n<td>41.2</td>\n</tr>\n</tbody>\n</table></div>\n<p>\\(N_{qk} = 64\\) 为最优值。值得注意的是，即使 \\(N_{qk} = 1\\)（每帧仅用一个标量表示帧级相似度），性能仍优于基线 Latte（FVD 357.4），说明帧级时序建模本身就是有效的。</p>\n<p><strong>主要定量结果</strong>（256×256 分辨率，16 帧，类别条件生成）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>UCF-101 FVD ↓</th>\n<th>Sky FVD ↓</th>\n<th>Taichi FVD ↓</th>\n<th>Face FVD ↓</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Latte</td>\n<td>357.4</td>\n<td>98.5</td>\n<td>247.0</td>\n<td>35.9</td>\n</tr>\n<tr>\n<td>FrameDiT-G</td>\n<td>213.5</td>\n<td>56.8</td>\n<td>143.2</td>\n<td>22.1</td>\n</tr>\n<tr>\n<td><strong>FrameDiT-H</strong></td>\n<td><strong>170.1</strong></td>\n<td><strong>39.5</strong></td>\n<td><strong>95.5</strong></td>\n<td><strong>16.6</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>文本到视频（VBench 基准，集成到 OpenSora）</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>Quality Score ↑</th>\n<th>Dynamic Degree ↑</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>OpenSora</td>\n<td>80.18</td>\n<td>42.50</td>\n</tr>\n<tr>\n<td>+ FrameDiT-G</td>\n<td>81.02</td>\n<td>62.78</td>\n</tr>\n<tr>\n<td>+ <strong>FrameDiT-H</strong></td>\n<td><strong>81.69</strong></td>\n<td><strong>70.83</strong></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键发现</strong>：FrameDiT 最显著的提升在于 <strong>动态程度</strong>（Dynamic Degree 从 42.50 → 70.83），说明帧级全局时序注意力有效解决了局部注意力无法捕捉大幅运动的问题。</div>\n<p><img alt=\"长视频扩展性\" src=\"https://arxiv.org/html/2603.09721v1/x3.png\" />\n<em>图：随帧数增加（16→128），FrameDiT 的计算开销增长远低于 Full 3D Attention，同时保持优异的生成质量。</em></p>",
      "quiz": {
        "q": "FrameDiT 的 Matrix Attention 中，V 矩阵为什么不像 Q/K 一样通过行权重矩阵 U 进行压缩？",
        "options": [
          "V 矩阵压缩会导致梯度消失",
          "V 矩阵不参与相似度计算，压缩没有意义",
          "为了保持输出的完整空间分辨率，V 需要保留所有 N 个空间 token",
          "V 矩阵的维度已经足够小，不需要压缩"
        ],
        "answer": 2,
        "explain": "Q/K 压缩是为了高效计算帧级相似度（标量），而 V 的加权聚合结果需要作为每帧的输出（R^{N×D}），必须保留完整的 N 个空间 token 以维持空间分辨率。"
      }
    },
    {
      "id": "neural-ode",
      "num": 17,
      "name": "Neural ODE",
      "fullName": "神经常微分方程 (Neural Ordinary Differential Equations)",
      "year": "2018",
      "org": "University of Toronto",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1806.07366",
      "projectUrl": "",
      "category": "flow_matching",
      "motivation": "连续深度模型为流匹配奠定数学基础",
      "summary": "Neural ODE 将残差网络的离散层推广为由常微分方程定义的连续深度变换，通过伴随方法（adjoint method）实现常数级内存的梯度计算，并由此衍生出连续归一化流（CNF）和不规则时间序列建模等新范式，为连续时间生成模型奠定了数学基础。",
      "keyPoints": [
        "<strong>核心思想</strong>：将残差网络 \\(h_{t+1} = h_t + f(h_t, \\theta_t)\\) 推广为连续形式 \\(\\frac{dh(t)}{dt} = f(h(t), t, \\theta)\\)，用黑盒 ODE 求解器替代固定的离散层",
        "<strong>伴随灵敏度方法（Adjoint Sensitivity Method）</strong>：反向传播时不存储中间激活值，而是反向求解一个增广 ODE，实现 \\(O(1)\\) 内存复杂度",
        "<strong>连续归一化流（Continuous Normalizing Flows, CNF）</strong>：利用瞬时变量替换公式（instantaneous change of variables），将 Normalizing Flow 的离散变换推广为连续变换，避免了对网络架构的限制（无需可逆或瓶颈结构）",
        "<strong>不规则时间序列建模</strong>：通过 ODE-RNN 结构处理任意时间间隔的观测数据，用隐状态的连续演化替代固定步长的 RNN",
        "<strong>自适应计算</strong>：ODE 求解器根据问题复杂度自动调节评估步数，简单区域用少量步数、复杂区域用更多步数",
        "<strong>实验验证</strong>：在监督学习（MNIST）、密度估计（CNF）和时间序列（螺旋线重建）三个场景下验证了方法的有效性"
      ],
      "detail": "<p><img alt=\"Neural ODE 核心概念对比图\" src=\"https://ar5iv.labs.arxiv.org/html/1806.07366/assets/x1.png\" />\n<em>图：左——残差网络定义离散的有限变换序列；中——ODE 网络定义一个由向量场指定的连续变换；右——连续归一化流可以自由穿越等密度面，而离散流不行。</em></p>\n<h5>动机与背景</h5>\n<p>深度残差网络（ResNet）的核心更新规则为：</p>\n<p>$$h_{t+1} = h_t + f(h_t, \\theta_t)$$</p>\n<p>这本质上是一个欧拉离散化的 ODE。当层数趋于无穷、步长趋于零时，这一离散动力系统自然过渡到连续动力系统：</p>\n<p>$$\\frac{dh(t)}{dt} = f(h(t), t, \\theta)$$</p>\n<p>传统深度网络面临的问题是：（1）内存消耗随层数线性增长（需存储所有中间激活值用于反向传播）；（2）层数和步长是超参数，需要人工调节；（3）Normalizing Flow 要求每层变换必须可逆且雅可比行列式易于计算，严重限制了网络架构设计。</p>\n<p>Neural ODE 通过将网络视为连续动力系统，一举解决了上述三个问题。</p>\n<h5>伴随灵敏度方法——O(1) 内存反向传播</h5>\n<p>Neural ODE 的核心技术贡献是利用伴随灵敏度方法计算损失函数对参数的梯度。</p>\n<p><img alt=\"伴随方法计算图\" src=\"https://ar5iv.labs.arxiv.org/html/1806.07366/assets/x2.png\" />\n<em>图：ODE 求解器的反向模式微分。通过反向求解增广 ODE 来计算梯度，无需存储前向过程的中间状态。</em></p>\n<p>给定损失函数 \\(L(z(t_1))\\)，其中 \\(z(t_1) = z(t_0) + \\int_{t_0}^{t_1} f(z(t), t, \\theta)\\,dt\\)，需要计算 \\(\\frac{dL}{d\\theta}\\)。</p>\n<p><strong>定义伴随状态（adjoint）</strong>为损失对隐状态的梯度：</p>\n<p>$$a(t) = -\\frac{\\partial L}{\\partial z(t)}$$</p>\n<p>伴随状态满足另一个 ODE：</p>\n<p>$$\\frac{da(t)}{dt} = -a(t)^T \\frac{\\partial f(z(t), t, \\theta)}{\\partial z}$$</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：伴随方法的核心思想是\"不存储，而是重新计算\"。前向求解得到 \\(z(t_1)\\) 后，反向时从 \\(t_1\\) 到 \\(t_0\\) 同时求解三个量：（1）隐状态 \\(z(t)\\) 的反向重建；（2）伴随状态 \\(a(t)\\) 的演化；（3）参数梯度 \\(\\frac{dL}{d\\theta}\\) 的累积。三者组成一个<strong>增广 ODE</strong>，一次反向求解即可得到所有梯度。</div>\n<p>参数梯度通过以下积分计算：</p>\n<p>$$\\frac{dL}{d\\theta} = -\\int_{t_1}^{t_0} a(t)^T \\frac{\\partial f(z(t), t, \\theta)}{\\partial \\theta}\\,dt$$</p>\n<p>这一方法的内存复杂度为 \\(O(1)\\)（不随\"层数\"即积分步数增长），而传统的通过求解器反向传播（backprop through solver）内存复杂度为 \\(O(L)\\)，其中 \\(L\\) 为求解器步数。</p>\n<pre><code class=\"language-python\"># Neural ODE 前向与反向传播伪代码\n# === 前向传播 ===\ndef forward(z0, t0, t1, f, theta):\n    # 调用黑盒 ODE 求解器\n    z_t1 = ode_solve(f, z0, t0, t1, theta)\n    return z_t1\n\n# === 反向传播（伴随方法）===\ndef backward(z_t1, t0, t1, f, theta, dL_dz_t1):\n    # 定义增广动力学\n    def augmented_dynamics(aug_state, t):\n        z, a, _ = aug_state          # 隐状态, 伴随, 参数梯度\n        dz_dt = f(z, t, theta)       # 原始动力学\n        da_dt = -a @ df_dz(z, t)     # 伴随动力学\n        dtheta_dt = -a @ df_dtheta(z, t)  # 参数梯度累积\n        return (dz_dt, da_dt, dtheta_dt)\n\n    # 初始条件：从 t1 反向积分到 t0\n    aug_init = (z_t1, dL_dz_t1, zeros_like(theta))\n    z_t0, a_t0, dL_dtheta = ode_solve(\n        augmented_dynamics, aug_init, t1, t0  # 反向积分\n    )\n    return dL_dtheta, a_t0  # 参数梯度 和 对初始状态的梯度\n</code></pre>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：伴随方法要求 ODE 求解器是可逆的（即从 \\(z(t_1)\\) 可以精确恢复 \\(z(t_0)\\)）。实际实现中，数值误差可能导致反向重建的 \\(z(t)\\) 与前向不完全一致，论文通过额外的检查点策略来缓解这一问题。</div>\n<h5>连续归一化流（CNF）</h5>\n<p>传统 Normalizing Flow 通过一系列可逆变换将简单分布映射到复杂分布，密度变化遵循变量替换公式：</p>\n<p>$$\\ln p(z_1) = \\ln p(z_0) - \\ln \\left|\\det \\frac{\\partial f}{\\partial z_0}\\right|$$</p>\n<p>这要求每一层变换的雅可比行列式可以高效计算，极大限制了网络设计。</p>\n<p>Neural ODE 提出了<strong>瞬时变量替换公式</strong>：当变换由连续动力学 \\(\\frac{dz}{dt} = f(z, t)\\) 定义时，对数概率密度的变化率为：</p>\n<p>$$\\frac{\\partial \\ln p(z(t))}{\\partial t} = -\\text{tr}\\left(\\frac{\\partial f}{\\partial z(t)}\\right)$$</p>\n<div class=\"key-point\">💡 <strong>关键优势</strong>：这里只需要计算雅可比矩阵的<strong>迹（trace）</strong>而非<strong>行列式（determinant）</strong>。迹的计算复杂度为 \\(O(D)\\)（\\(D\\) 为维度），而行列式为 \\(O(D^3)\\)。更重要的是，\\(f\\) 不再需要满足可逆性约束，可以使用任意神经网络架构。</div>\n<p>通过 Hutchinson 迹估计器，迹的计算可以进一步降低为 \\(O(1)\\) 次向量-雅可比积：</p>\n<p>$$\\text{tr}\\left(\\frac{\\partial f}{\\partial z}\\right) = \\mathbb{E}_{p(\\epsilon)}\\left[\\epsilon^T \\frac{\\partial f}{\\partial z} \\epsilon\\right]$$</p>\n<p>其中 \\(\\epsilon\\) 为满足 \\(\\mathbb{E}[\\epsilon] = 0\\)、\\(\\text{Cov}(\\epsilon) = I\\) 的随机向量。</p>\n<h5>不规则时间序列建模</h5>\n<p>对于观测时间不均匀的时间序列数据 \\(\\{(z_{t_0}, t_0), (z_{t_1}, t_1), \\ldots, (z_{t_N}, t_N)\\}\\)，传统 RNN 难以自然处理不等间距的时间步。</p>\n<p>Neural ODE 提出的 ODE-RNN 方法：\n1. 用 RNN 编码器在每个观测时刻更新隐状态\n2. 在两个观测时刻之间，用 ODE 求解器连续演化隐状态\n3. 隐状态的演化自然适应任意时间间隔</p>\n<p>结合变分自编码器（VAE）框架，可以构建 Latent ODE 模型：先用 ODE-RNN 编码器推断初始潜变量分布 \\(q(z_0 | \\{x_i, t_i\\})\\)，再用 ODE 解码器从 \\(z_0\\) 生成任意时刻的预测。</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>ResNet（离散）</th>\n<th>Neural ODE（连续）</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>深度</td>\n<td>固定层数 \\(L\\)</td>\n<td>连续，由求解器自适应决定</td>\n</tr>\n<tr>\n<td>内存（反向传播）</td>\n<td>\\(O(L)\\)</td>\n<td>\\(O(1)\\)（伴随方法）</td>\n</tr>\n<tr>\n<td>参数量</td>\n<td>每层独立参数</td>\n<td>所有\"层\"共享参数</td>\n</tr>\n<tr>\n<td>归一化流架构限制</td>\n<td>需可逆 + 行列式可算</td>\n<td>任意架构，只需算迹</td>\n</tr>\n<tr>\n<td>时间序列</td>\n<td>固定步长</td>\n<td>自然处理不规则时间间隔</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>总结</strong>：Neural ODE 的核心贡献不仅是一个新模型，更是一种<strong>新范式</strong>——将深度学习与微分方程理论深度融合。它启发了后续大量工作，包括 Neural SDE、Neural CDE、FFJORD 等，成为连续时间深度学习的奠基性工作。</div>",
      "quiz": {
        "q": "Neural ODE 使用伴随方法进行反向传播的主要优势是什么？",
        "options": [
          "加快前向传播的计算速度",
          "实现 O(1) 内存复杂度，不需要存储前向过程的中间激活值",
          "使模型参数量减少到常数级别",
          "保证 ODE 求解器的数值精度不受步长影响"
        ],
        "answer": 1,
        "explain": "伴随方法通过反向求解增广 ODE 来计算梯度，避免了存储前向求解过程中所有中间状态，将内存复杂度从 O(L) 降低到 O(1)。"
      }
    },
    {
      "id": "flow-matching",
      "num": 18,
      "name": "Flow Matching",
      "fullName": "流匹配 (Flow Matching)",
      "year": "2022",
      "org": "Meta",
      "parent": "neural-ode",
      "paperUrl": "https://arxiv.org/abs/2210.02747",
      "projectUrl": "",
      "category": "flow_matching",
      "motivation": "基于CNF的通用框架支持高效模拟训练",
      "summary": "Flow Matching 提出了一种无需模拟 ODE 的连续归一化流（CNF）训练方法，通过回归条件概率路径的向量场实现高效训练，并引入最优传输（OT）概率路径使生成轨迹更直、采样更快、质量更优。",
      "keyPoints": [
        "<strong>Flow Matching (FM) 目标</strong>：直接回归生成目标概率路径 \\(p_t\\) 的向量场 \\(u_t(x)\\)，无需昂贵的 ODE 模拟或似然计算",
        "<strong>Conditional Flow Matching (CFM)</strong>：将不可计算的边际 FM 目标分解为可解析计算的条件形式，通过 Theorem 1 证明两者梯度完全等价",
        "<strong>高斯条件概率路径族</strong>：统一框架涵盖 VP-SDE、VE-SDE 等扩散路径以及最优传输路径",
        "<strong>最优传输（OT）概率路径</strong>：条件向量场 \\(u_t(x|x_1) = x_1 - (1-\\sigma_{\\min})x_0\\) 不依赖时间，产生直线轨迹",
        "<strong>统一 Diffusion 与 Flow</strong>：证明 Score Matching（扩散模型）是 Flow Matching 在特定概率路径下的特例",
        "<strong>实验优势</strong>：OT 路径在 NLL 和 FID 上均优于 Diffusion 路径，训练收敛更快，采样所需 ODE 步数（NFE）更少"
      ],
      "detail": "<h5>1. 连续归一化流（CNF）基础</h5>\n<p>连续归一化流的核心思想是通过一个时间依赖的向量场 \\(v_t: \\mathbb{R}^d \\to \\mathbb{R}^d\\) 定义一个流（flow）\\(\\phi_t\\)：</p>\n<p>$$\\frac{d}{dt}\\phi_t(x) = v_t(\\phi_t(x)), \\quad \\phi_0(x) = x$$</p>\n<p>流 \\(\\phi_t\\) 将初始分布 \\(p_0\\)（通常为标准高斯 \\(\\mathcal{N}(0, I)\\)）推前（pushforward）为时刻 \\(t\\) 的分布。当 \\(t=1\\) 时，\\(p_1\\) 应近似数据分布 \\(q\\)。概率密度的演化遵循<strong>连续性方程</strong>：</p>\n<p>$$\\frac{\\partial p_t}{\\partial t} + \\text{div}(p_t v_t) = 0$$</p>\n<p>这意味着：给定一个概率路径 \\(p_t\\)，存在（不唯一的）向量场 \\(v_t\\) 生成它；反之，给定向量场 \\(v_t\\)，它唯一确定一条概率路径。传统 CNF 训练需要通过 ODE 求解器模拟整条轨迹来计算似然，计算代价极高且梯度估计有偏。</p>\n<h5>2. Flow Matching 目标与 Conditional Flow Matching</h5>\n<p><strong>FM 目标</strong>（不可直接计算）：</p>\n<p>$$\\mathcal{L}_{\\text{FM}}(\\theta) = \\mathbb{E}_{t \\sim \\mathcal{U}[0,1],\\, x \\sim p_t(x)} \\|v_\\theta(t, x) - u_t(x)\\|^2$$</p>\n<p>其中 \\(u_t(x)\\) 是生成概率路径 \\(p_t\\) 的目标向量场。问题在于边际分布 \\(p_t(x) = \\int p_t(x|x_1)q(x_1)dx_1\\) 和边际向量场 \\(u_t(x)\\) 都涉及对数据分布 \\(q\\) 的不可解积分。</p>\n<p><strong>CFM 目标</strong>（核心突破）：</p>\n<p>$$\\mathcal{L}_{\\text{CFM}}(\\theta) = \\mathbb{E}_{t \\sim \\mathcal{U}[0,1],\\, x_1 \\sim q(x_1),\\, x \\sim p_t(x|x_1)} \\|v_\\theta(t, x) - u_t(x|x_1)\\|^2$$</p>\n<div class=\"key-point\">💡 <strong>关键 Theorem 1</strong>：在温和条件下，\\(\\nabla_\\theta \\mathcal{L}_{\\text{CFM}}(\\theta) = \\nabla_\\theta \\mathcal{L}_{\\text{FM}}(\\theta)\\)。即两个目标关于参数 \\(\\theta\\) 的梯度完全等价，而 CFM 中的条件向量场 \\(u_t(x|x_1)\\) 有解析形式，可以高效采样和计算。</div>\n<p><strong>证明直觉</strong>：展开两个损失函数，\\(\\|v_\\theta - u\\|^2 = \\|v_\\theta\\|^2 - 2\\langle v_\\theta, u \\rangle + \\|u\\|^2\\)。对 \\(\\theta\\) 求梯度时 \\(\\|u\\|^2\\) 项消失；而交叉项 \\(\\langle v_\\theta, u_t(x|x_1) \\rangle\\) 在对 \\(q(x_1)\\) 积分后恰好等于 \\(\\langle v_\\theta, u_t(x) \\rangle\\)（由边际向量场的定义保证），因此两个梯度相等。</p>\n<h5>3. 高斯条件概率路径</h5>\n<p>选择条件分布为高斯形式：</p>\n<p>$$p_t(x|x_1) = \\mathcal{N}\\big(x \\mid \\mu_t(x_1),\\, \\sigma_t(x_1)^2 I\\big)$$</p>\n<p>边界条件要求 \\(p_0(x|x_1) \\approx \\mathcal{N}(0, I)\\)（纯噪声），\\(p_1(x|x_1) \\approx \\mathcal{N}(x_1, \\sigma_{\\min}^2 I)\\)（集中在数据点附近）。</p>\n<p>对应的仿射流映射为 \\(\\psi_t(x) = \\sigma_t(x_1) x + \\mu_t(x_1)\\)，条件向量场的解析形式为：</p>\n<p>$$u_t(x|x_1) = \\frac{\\sigma_t'(x_1)}{\\sigma_t(x_1)}\\big(x - \\mu_t(x_1)\\big) + \\mu_t'(x_1)$$</p>\n<p>通过不同的 \\(\\mu_t, \\sigma_t\\) 选择，可以恢复多种已知框架：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>路径类型</th>\n<th>\\(\\mu_t(x_1)\\)</th>\n<th>\\(\\sigma_t\\)</th>\n<th>特点</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>VP-SDE (Diffusion)</td>\n<td>\\(\\alpha_t x_1\\)</td>\n<td>\\(\\sqrt{1-\\alpha_t^2}\\)</td>\n<td>弯曲轨迹，等价于 DDPM</td>\n</tr>\n<tr>\n<td>VE-SDE (Diffusion)</td>\n<td>\\(x_1\\)</td>\n<td>\\(\\sigma_{\\max}^{1-t}\\sigma_{\\min}^t\\)</td>\n<td>弯曲轨迹</td>\n</tr>\n<tr>\n<td><strong>OT 路径</strong></td>\n<td>\\(tx_1\\)</td>\n<td>\\(1-(1-\\sigma_{\\min})t\\)</td>\n<td><strong>直线轨迹</strong></td>\n</tr>\n</tbody>\n</table></div>\n<h5>4. Diffusion 路径 vs OT 路径</h5>\n<p>这是论文最重要的对比。两种路径的条件向量场形式差异巨大：</p>\n<p><strong>Diffusion 路径</strong>的条件向量场依赖复杂的调度函数 \\(\\alpha_t, \\beta_t\\)，产生弯曲的流轨迹。</p>\n<p><strong>OT 路径</strong>的条件向量场极其简洁：</p>\n<p>$$u_t(x|x_1) = x_1 - (1-\\sigma_{\\min})x_0$$</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：OT 条件向量场<strong>不依赖时间 \\(t\\)</strong>，仅由端点 \\(x_0, x_1\\) 决定。这意味着条件流的轨迹是从 \\(x_0\\) 到 \\(x_1\\) 的直线，ODE 求解器可以用更大步长而不损失精度。</div>\n<p><img alt=\"Diffusion 路径产生弯曲轨迹\" src=\"https://ar5iv.labs.arxiv.org/html/2210.02747/assets/figures/2d_traj/2d_traj_diff.png\" />\n<em>图：Diffusion 路径的流轨迹——从噪声到数据的路径弯曲，需要更多 ODE 步数</em></p>\n<p><img alt=\"OT 路径产生近似直线轨迹\" src=\"https://ar5iv.labs.arxiv.org/html/2210.02747/assets/figures/2d_traj/2d_traj_ot.png\" />\n<em>图：OT 路径的流轨迹——近似直线，采样效率大幅提升</em></p>\n<h5>5. 训练与采样算法</h5>\n<pre><code class=\"language-python\"># Algorithm: Conditional Flow Matching with OT Paths - Training\n# ─────────────────────────────────────────────────────────────\n# Input: dataset D, neural network v_θ, σ_min ≈ 1e-5\n# Output: trained v_θ\n\nfor step in range(num_steps):\n    x_1 = sample_data(D)                              # 数据样本\n    x_0 = torch.randn_like(x_1)                       # 噪声样本 ~ N(0, I)\n    t = torch.rand(batch_size)                         # 时间步 ~ U(0, 1)\n\n    # OT 插值：沿直线从 x_0 走到 x_1\n    x_t = (1 - (1 - sigma_min) * t) * x_0 + t * x_1\n\n    # 条件向量场目标（不依赖 t！）\n    target = x_1 - (1 - sigma_min) * x_0\n\n    # 回归损失\n    loss = ||v_theta(t, x_t) - target||^2\n    loss.backward()\n    optimizer.step()\n</code></pre>\n<pre><code class=\"language-python\"># Algorithm: CFM Sampling (Euler method)\n# ─────────────────────────────────────────\n# Input: trained v_θ, number of steps N\n\nx = torch.randn(shape)          # x_0 ~ N(0, I)\ndt = 1.0 / N\nfor k in range(N):\n    t = k / N\n    x = x + v_theta(t, x) * dt  # Euler 积分\n# x ≈ 数据样本\n\n# 注：OT 路径由于轨迹近似直线，即使 N=10~20 也能获得高质量样本\n# 更高阶求解器（如 RK45, Dopri5）可进一步减少步数\n</code></pre>\n<h5>6. 与 Diffusion Models 的统一关系</h5>\n<p>Flow Matching 框架统一了多种生成模型：</p>\n<ul>\n<li><strong>Score Matching / Diffusion</strong>：当选择扩散概率路径时，FM 的条件向量场与去噪得分匹配（DSM）的目标等价，差一个时间依赖的缩放因子。具体地，扩散模型学习的得分函数 \\(\\nabla_x \\log p_t(x)\\) 与 FM 的向量场 \\(v_t(x)\\) 通过连续性方程相关联。</li>\n<li><strong>Rectified Flow</strong>（Liu et al., 2022）：独立同期工作，提出了类似的 OT 路径直线插值思想。</li>\n<li><strong>Stochastic Interpolants</strong>（Albergo &amp; Vanden-Eijnden, 2022）：从随机插值角度得到类似结论。</li>\n</ul>\n<div class=\"warn-box\">⚠️ <strong>关键区别</strong>：FM 框架更通用，适用于任意高斯概率路径族，不局限于扩散过程。它提供了一个统一视角来理解和设计不同的生成模型。</div>\n<h5>7. 实验结果</h5>\n<p><img alt=\"训练过程中 NLL 和 FID 的变化曲线\" src=\"https://ar5iv.labs.arxiv.org/html/2210.02747/assets/x9.png\" />\n<em>图：ImageNet 64×64 上的训练曲线。FM w/ OT（蓝色）收敛最快，最终 NLL 和 FID 均最优</em></p>\n<p>论文在 CIFAR-10 和 ImageNet 32/64/128/256 上进行了全面实验：</p>\n<ul>\n<li><strong>NLL（负对数似然）</strong>：FM w/ OT 在所有数据集上取得最优 NLL（如 CIFAR-10 上 2.99 bpd，优于 Score Matching 的 3.16 和 FM w/ Diffusion 的 3.10）</li>\n<li><strong>FID（生成质量）</strong>：FM w/ OT 的 FID 优于 FM w/ Diffusion 和 Score Matching</li>\n<li><strong>训练效率</strong>：OT 路径收敛速度约为 Diffusion 路径的 2 倍</li>\n<li><strong>采样效率</strong>：OT 路径仅需 10–20 NFE 即可达到 Diffusion 路径 100+ NFE 的质量</li>\n</ul>\n<p><img alt=\"ImageNet 64×64 生成样本（FM w/ OT）\" src=\"https://ar5iv.labs.arxiv.org/html/2210.02747/assets/figures/imagenet64/imagenet64_fm_ot.png\" />\n<em>图：FM w/ OT 在 ImageNet 64×64 上的生成样本</em></p>",
      "quiz": {
        "q": "Flow Matching 中 Conditional Flow Matching (CFM) 目标相比 FM 目标的核心优势是什么？",
        "options": [
          "CFM 使用了更强的神经网络架构，拟合能力更强",
          "CFM 将不可计算的边际向量场分解为可解析计算的条件向量场，且与 FM 梯度等价",
          "CFM 引入了对抗训练机制，提升了生成质量",
          "CFM 通过蒸馏预训练模型减少了计算量"
        ],
        "answer": 1,
        "explain": "FM 目标中的边际分布 p_t(x) 和边际向量场 u_t(x) 涉及对数据分布的不可解积分，无法直接计算。CFM 通过条件分解将问题转化为回归解析可计算的条件向量场 u_t(x|x_1)，Theorem 1 证明两者梯度完全等价，因此 CFM 在不损失任何信息的前提下实现了高效训练。"
      }
    },
    {
      "id": "rectified-flow",
      "num": 19,
      "name": "Rectified Flow",
      "fullName": "矫正流 (Rectified Flow)",
      "year": "2022",
      "org": "UT Austin",
      "parent": "flow-matching",
      "paperUrl": "https://arxiv.org/abs/2209.03003",
      "projectUrl": "",
      "category": "flow_matching",
      "motivation": "重流技术直线化轨迹实现一步生成",
      "summary": "Rectified Flow 提出通过学习沿直线路径传输的 ODE 模型，并引入\"矫正（Reflow）\"操作迭代拉直传输轨迹，使得仅需一步 Euler 积分即可完成高质量生成，为 Flow Matching 框架下的少步/一步生成奠定了理论与实践基础。",
      "keyPoints": [
        "<strong>直线路径回归</strong>：以线性插值 \\(X_t = (1-t)X_0 + tX_1\\) 为中间状态，用最小二乘回归速度场 \\(v_\\theta(X_t, t) \\approx X_1 - X_0\\)，训练目标与 Flow Matching / DDPM 连续形式等价",
        "<strong>矫正（Reflow）操作</strong>：用已学 ODE 生成新耦合 \\((Z_0, Z_1)\\) 替换原始独立耦合，迭代训练使轨迹越来越直，理论证明凸传输代价单调不增",
        "<strong>一步蒸馏（Distillation）</strong>：在轨迹充分拉直后，用 ODE 生成的 \\((Z_0, Z_1)\\) 对训练一步映射网络 \\(f_\\theta(Z_0) \\approx Z_1\\)，实现单步生成",
        "<strong>理论保证</strong>：证明 Reflow 单调降低直线度指标 \\(S(v)\\) 与凸传输代价，极限收敛至最优传输映射",
        "<strong>统一框架</strong>：同一方法无需修改即可处理生成建模（\\(\\pi_0\\) 为高斯）、图像翻译（\\(\\pi_0, \\pi_1\\) 均为复杂分布）、域适应等任务",
        "<strong>实验验证</strong>：CIFAR-10 上 3-Rectified + Distill 实现 FID 5.21 的单步生成；LSUN Bedroom、CelebA-HQ 等数据集上均展示了有效性"
      ],
      "detail": "<h5>核心框架示意</h5>\n<p><img alt=\"Rectified Flow 总览\" src=\"https://ar5iv.labs.arxiv.org/html/2209.03003v2/assets/figs/teaser.png\" />\n<em>图 1：Rectified Flow 总览。左：从独立耦合出发学习 ODE 传输；中：Reflow 迭代拉直轨迹；右：轨迹拉直后可用极少步甚至一步 Euler 积分完成生成。</em></p>\n<p><img alt=\"Rectified Flow 方法示意\" src=\"https://ar5iv.labs.arxiv.org/html/2209.03003v2/assets/figs/illustration.png\" />\n<em>图 2：方法示意。(a) 初始独立耦合的直线路径会交叉，速度场需要在交叉处取平均，导致弯曲轨迹；(b) Reflow 后路径不再交叉，ODE 轨迹趋于直线。</em></p>\n<p><img alt=\"2D 演示\" src=\"https://ar5iv.labs.arxiv.org/html/2209.03003v2/assets/figs/2d_demo.png\" />\n<em>图 3：2D 合成数据上的可视化。随着 Reflow 轮次增加，传输路径从交叉弯曲逐步变为平行直线，一步采样质量显著提升。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># ===== Algorithm 1: 训练 Rectified Flow =====\n# 输入: 源分布 π₀, 目标分布 π₁, 耦合 π (初始为独立耦合 π₀⊗π₁)\n# 输出: 速度场网络 v_θ\n\nfor iteration in range(N):\n    X0 ~ π₀;  X1 ~ π₁          # 从耦合 π 中采样\n    t ~ Uniform(0, 1)           # 随机时间步\n    Xt = (1 - t) * X0 + t * X1  # 线性插值\n    loss = || v_θ(Xt, t) - (X1 - X0) ||²  # 最小二乘损失\n    optimizer.step(loss)\n\n# ===== Algorithm 2: Reflow (矫正) =====\n# 输入: 已训练的 v_θ, 源分布 π₀\n# 输出: 新耦合 (Z0, Z1)\n\npairs = []\nfor i in range(M):\n    Z0 ~ π₀\n    Z1 = ODE_solve(v_θ, Z0, t=0→1, steps=100)  # 用多步 Euler 求解\n    pairs.append((Z0, Z1))\n# 用新耦合 pairs 重新训练 → 得到更直的 v_θ'\n\n# ===== Algorithm 3: 一步蒸馏 =====\n# 输入: 充分矫正后的 v_θ\n# 输出: 一步生成网络 f_θ\n\nfor iteration in range(K):\n    Z0 ~ π₀\n    Z1 = ODE_solve(v_θ, Z0, t=0→1, steps=100)\n    loss = || f_θ(Z0) - Z1 ||²  # MSE 蒸馏\n    optimizer.step(loss)\n</code></pre>\n<h5>动机与背景</h5>\n<p>扩散模型（Diffusion Models）和基于分数的生成模型（Score-based Models）在图像生成领域取得了巨大成功，但它们的采样过程通常需要数百甚至上千步 ODE/SDE 求解，计算开销极大。Flow Matching [Lipman et al., 2022] 提出了一种 simulation-free 的训练范式，通过回归条件速度场来学习 ODE 流，但其生成的 ODE 轨迹仍然可能弯曲，导致少步采样时质量急剧下降。</p>\n<div class=\"key-point\">💡 关键：弯曲轨迹的根源在于<strong>路径交叉</strong>——当不同数据对 \\((X_0, X_1)\\) 和 \\((X_0', X_1')\\) 的线性插值路径在某个时刻 \\(t\\) 处交叉时，速度场 \\(v(x, t)\\) 必须在交叉点对多个方向取条件期望，导致学到的轨迹偏离任何一条直线。</div>\n<p>Rectified Flow 的核心洞察是：<strong>如果传输路径是不交叉的直线，那么一步 Euler 积分就能精确模拟 ODE</strong>，因为直线上的速度恒为常数 \\(X_1 - X_0\\)。因此，关键问题转化为：如何消除路径交叉，使轨迹尽可能直？</p>\n<h5>核心机制：直线路径回归与矫正</h5>\n<p><strong>1. 直线路径回归</strong></p>\n<p>给定源分布 \\(\\pi_0\\)（如标准高斯）和目标分布 \\(\\pi_1\\)（如图像分布）的一个耦合 \\(\\pi\\)，Rectified Flow 定义如下 ODE：</p>\n<p>$$\n\\frac{dZ_t}{dt} = v_\\pi(Z_t, t), \\quad t \\in [0, 1]\n$$</p>\n<p>其中速度场 \\(v_\\pi\\) 通过求解最小二乘问题获得：</p>\n<p>$$\n\\min_v \\int_0^1 \\mathbb{E}_{(X_0, X_1) \\sim \\pi} \\left[ \\| v(X_t, t) - (X_1 - X_0) \\|^2 \\right] dt\n$$</p>\n<p>这里 \\(X_t = (1-t)X_0 + tX_1\\) 是线性插值。该损失的最优解是条件期望：</p>\n<p>$$\nv_\\pi(x, t) = \\mathbb{E}[X_1 - X_0 \\mid X_t = x]\n$$</p>\n<div class=\"warn-box\">⚠️ 注意：这个训练目标在形式上与 Flow Matching [Lipman et al., 2022]、Conditional Flow Matching [Tong et al., 2023] 以及 DDPM 的连续时间形式完全等价。Rectified Flow 的独特贡献不在于训练目标本身，而在于对直线路径的几何解释以及矫正操作。</div>\n<p><strong>2. 矫正（Reflow）操作</strong></p>\n<p>初始独立耦合 \\(\\pi^0 = \\pi_0 \\otimes \\pi_1\\) 下，不同数据对的线性插值路径几乎必然交叉。矫正操作通过以下迭代消除交叉：</p>\n<ul>\n<li><strong>第 \\(k\\) 轮</strong>：用当前速度场 \\(v^k\\) 从 \\(Z_0 \\sim \\pi_0\\) 出发求解 ODE 得到 \\(Z_1^k\\)</li>\n<li>构造新耦合 \\(\\pi^{k+1} = (Z_0, Z_1^k)\\)</li>\n<li>用新耦合重新训练速度场 \\(v^{k+1}\\)</li>\n</ul>\n<p>由于 ODE 解的唯一性，新耦合 \\((Z_0, Z_1^k)\\) 的传输路径天然不交叉（确定性映射的轨迹不会相交）。因此每轮矫正都会减少路径交叉，使轨迹更直。</p>\n<p><strong>理论保证</strong>：论文证明了两个关键定理：</p>\n<p>定理 1（传输代价单调不增）：对任意凸代价函数 \\(c\\)，</p>\n<p>$$\n\\mathbb{E}_{\\pi^{k+1}}[c(X_1 - X_0)] \\leq \\mathbb{E}_{\\pi^k}[c(X_1 - X_0)]\n$$</p>\n<p>定理 2（直线度单调改善）：定义直线度指标</p>\n<p>$$\nS(v) = \\mathbb{E}\\left[\\int_0^1 \\| v(Z_t, t) - (Z_1 - Z_0) \\|^2 dt\\right]\n$$</p>\n<p>则 \\(S(v^{k+1}) \\leq S(v^k)\\)，即每轮矫正使轨迹更接近直线。</p>\n<p>这两个定理的证明核心依赖于 Jensen 不等式：ODE 确定性映射消除了条件期望中的方差项，从而降低了代价。</p>\n<p><strong>3. 一步蒸馏</strong></p>\n<p>经过 2-3 轮 Reflow 后，轨迹已经足够直，此时可以进一步蒸馏为一步模型。蒸馏的训练目标非常简单：</p>\n<p>$$\n\\min_\\theta \\mathbb{E}_{Z_0 \\sim \\pi_0} \\left[ \\| f_\\theta(Z_0) - Z_1 \\|^2 \\right]\n$$</p>\n<p>其中 \\(Z_1\\) 由充分矫正后的 ODE 生成。由于轨迹已近似直线，\\(Z_0 \\to Z_1\\) 的映射接近确定性，蒸馏损失的方差很小，因此一步模型能够高质量地逼近多步 ODE。</p>\n<h5>训练与推理流程</h5>\n<p><strong>训练流程</strong>分为三个阶段：</p>\n<ol>\n<li><strong>1-Rectified Flow 训练</strong>：使用独立耦合 \\(\\pi_0 \\otimes \\pi_1\\)，训练速度场 \\(v_\\theta\\)。网络架构采用与 DDPM 相同的 U-Net，Adam 优化器，学习率 \\(2 \\times 10^{-4}\\)，batch size 128，训练 800K 迭代。</li>\n<li><strong>Reflow</strong>：用已训练模型生成 1M 个 \\((Z_0, Z_1)\\) 对（100 步 Euler），用新耦合重新训练模型。可重复 1-2 次。</li>\n<li><strong>蒸馏（可选）</strong>：用矫正后的 ODE 生成数据对，训练一步映射网络，200K 迭代。</li>\n</ol>\n<p><strong>推理流程</strong>：</p>\n<ul>\n<li><strong>多步采样</strong>：从 \\(Z_0 \\sim \\mathcal{N}(0, I)\\) 出发，用 \\(N\\) 步 Euler 方法求解 ODE：\\(Z_{t+\\Delta t} = Z_t + \\Delta t \\cdot v_\\theta(Z_t, t)\\)</li>\n<li><strong>一步生成</strong>（蒸馏后）：直接计算 \\(Z_1 = f_\\theta(Z_0)\\)</li>\n</ul>\n<div class=\"key-point\">💡 关键：Reflow 的核心价值在于——即使不做蒸馏，矫正后的模型也能用极少的 Euler 步数（如 2-5 步）获得接近多步采样的质量，因为轨迹已经足够直。</div>\n<h5>与 Flow Matching 及扩散模型的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>扩散模型 (DDPM/Score SDE)</th>\n<th>Flow Matching</th>\n<th>Rectified Flow</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>训练目标</td>\n<td>预测噪声 \\(\\epsilon\\) 或分数 \\(\\nabla \\log p_t\\)</td>\n<td>回归条件速度场</td>\n<td>回归直线方向 \\(X_1 - X_0\\)（等价于 FM）</td>\n</tr>\n<tr>\n<td>采样路径</td>\n<td>弯曲（SDE/ODE 求解）</td>\n<td>可能弯曲</td>\n<td>通过 Reflow 迭代拉直</td>\n</tr>\n<tr>\n<td>少步采样</td>\n<td>需要专门的加速方法（DDIM 等）</td>\n<td>质量随步数下降</td>\n<td>Reflow 后少步即可保持质量</td>\n</tr>\n<tr>\n<td>一步生成</td>\n<td>需额外蒸馏（Consistency Model 等）</td>\n<td>不直接支持</td>\n<td>Reflow + 蒸馏自然支持</td>\n</tr>\n<tr>\n<td>理论保证</td>\n<td>收敛到数据分布</td>\n<td>收敛到数据分布</td>\n<td>额外保证传输代价单调不增</td>\n</tr>\n<tr>\n<td>任务通用性</td>\n<td>主要用于生成</td>\n<td>主要用于生成</td>\n<td>统一处理生成、翻译、域适应</td>\n</tr>\n</tbody>\n</table></div>\n<p>Rectified Flow 的核心创新不在训练目标（与 FM 等价），而在于 <strong>Reflow 矫正操作</strong>这一独特的后处理/迭代机制，它提供了一条从\"任意耦合\"到\"近似最优传输\"的系统化路径，并在理论上保证了单调改善。</p>\n<h5>实验结果</h5>\n<p><strong>CIFAR-10 无条件生成</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>FID ↓</th>\n<th>NFE (步数)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>DDPM [Ho et al., 2020]</td>\n<td>3.17</td>\n<td>1000</td>\n</tr>\n<tr>\n<td>Score SDE [Song et al., 2020]</td>\n<td>2.20</td>\n<td>2000</td>\n</tr>\n<tr>\n<td>EDM [Karras et al., 2022]</td>\n<td>1.97</td>\n<td>35</td>\n</tr>\n<tr>\n<td>Flow Matching [Lipman et al., 2022]</td>\n<td>6.35</td>\n<td>142</td>\n</tr>\n<tr>\n<td>1-Rectified Flow</td>\n<td>6.18</td>\n<td>110</td>\n</tr>\n<tr>\n<td>2-Rectified Flow</td>\n<td>4.85</td>\n<td>110</td>\n</tr>\n<tr>\n<td><strong>3-Rectified + Distill</strong></td>\n<td><strong>5.21</strong></td>\n<td><strong>1</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><img alt=\"CIFAR-10 FID vs NFE\" src=\"https://ar5iv.labs.arxiv.org/html/2209.03003v2/assets/figs/cifar10_uncond_fid_nfe.png\" />\n<em>图 4：CIFAR-10 上 FID 与采样步数的关系。Reflow 轮次越多，少步采样的 FID 越低。</em></p>\n<p><strong>Euler 步数与 FID 的权衡</strong>（消融实验）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Euler 步数</th>\n<th>1-Rectified FID</th>\n<th>2-Rectified FID</th>\n<th>3-Rectified FID</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>25.3</td>\n<td>12.1</td>\n<td>5.21</td>\n</tr>\n<tr>\n<td>2</td>\n<td>15.7</td>\n<td>7.8</td>\n<td>4.12</td>\n</tr>\n<tr>\n<td>5</td>\n<td>8.9</td>\n<td>5.5</td>\n<td>3.85</td>\n</tr>\n<tr>\n<td>10</td>\n<td>6.8</td>\n<td>5.0</td>\n<td>3.72</td>\n</tr>\n<tr>\n<td>100</td>\n<td>6.18</td>\n<td>4.85</td>\n<td>3.68</td>\n</tr>\n</tbody>\n</table></div>\n<p>该消融清晰展示了 Reflow 的核心效果：<strong>更多轮矫正 = 更直的轨迹 = 更少的步数即可达到相同质量</strong>。3-Rectified 仅需 1 步即可达到 1-Rectified 需要 100 步才能达到的水平。</p>\n<p><strong>图像翻译</strong>：Rectified Flow 无需修改即可用于无配对图像翻译（Photo→Monet、Horse→Zebra 等），展示了框架的通用性。</p>\n<p><img alt=\"图像翻译结果\" src=\"https://ar5iv.labs.arxiv.org/html/2209.03003v2/assets/figs/i2i_main.png\" />\n<em>图 5：无配对图像翻译结果。Rectified Flow 在风格迁移和物种转换任务上均产生高质量结果。</em></p>",
      "quiz": {
        "q": "Rectified Flow 中 Reflow（矫正）操作的核心作用是什么？",
        "options": [
          "改变网络架构使其更适合一步生成",
          "通过 ODE 生成新耦合替换原始耦合，迭代消除路径交叉使轨迹趋于直线",
          "引入对抗训练损失提升生成图像的感知质量",
          "增大训练数据量以提升模型泛化能力"
        ],
        "answer": 1,
        "explain": "Reflow 用已学 ODE 的确定性映射构造新耦合 (Z₀, Z₁)，由于 ODE 解的唯一性，新耦合的路径天然不交叉，从而使下一轮训练的轨迹更直，理论证明传输代价单调不增。"
      }
    },
    {
      "id": "sd3",
      "num": 20,
      "name": "SD3",
      "fullName": "Stable Diffusion 3 (MMDiT)",
      "year": "2024",
      "org": "Stability AI",
      "parent": "rectified-flow",
      "paperUrl": "https://stability.ai/news/stable-diffusion-3-research-paper",
      "projectUrl": "",
      "category": "flow_matching",
      "motivation": "MMDiT架构结合Rectified Flow商业化",
      "summary": "SD3 的核心目标是：MMDiT架构结合Rectified Flow商业化。",
      "keyPoints": [
        "核心动机：MMDiT架构结合Rectified Flow商业化",
        "演化来源：继承或改进自 rectified-flow",
        "代表机构：Stability AI"
      ],
      "detail": "<p>MMDiT架构结合Rectified Flow商业化</p>"
    },
    {
      "id": "pyramidal-flow",
      "num": 21,
      "name": "Pyramidal Flow",
      "fullName": "金字塔流匹配 (Pyramidal Flow Matching)",
      "year": "2026",
      "org": "Multiple Institutions",
      "parent": "flow-matching",
      "paperUrl": "https://arxiv.org/abs/2410.05954",
      "projectUrl": "",
      "category": "flow_matching",
      "motivation": "金字塔式联合训练高效视频生成",
      "summary": "Pyramidal Flow Matching 提出在去噪轨迹的不同阶段使用不同空间分辨率（空间金字塔）、对自回归历史帧使用渐增分辨率压缩（时间金字塔），用单一 2B 参数模型统一完成视频内容生成与超分辨率，仅需 20.7k A100 GPU 小时即可训练出生成 768p、24fps、10 秒视频的模型，质量超越 CogVideoX-5B 和 Gen-3 Alpha。",
      "keyPoints": [
        "<strong>空间金字塔流匹配</strong>：将去噪轨迹分为 \\(K\\) 个分辨率阶段，早期在低分辨率生成粗结构，后期在全分辨率精细化，通过分段流（piecewise flow）统一训练",
        "<strong>Renoising 策略</strong>：阶段间跳转时先上采样再添加噪声，保持概率路径连续性，替代传统级联扩散的多模型设计",
        "<strong>时间金字塔条件</strong>：对自回归生成的历史帧按时间远近使用递减分辨率表示，越早的帧分辨率越低，token 数减少 \\(1/4^K\\) 倍",
        "<strong>位置编码双策略</strong>：空间金字塔使用外推（extrapolation）位置编码，时间金字塔使用内插（interpolation）位置编码",
        "<strong>架构</strong>：基于 SD3 的 MM-DiT（2B 参数）+ 3D VAE（8×8×8 时空压缩）+ 全序列因果注意力",
        "<strong>效率</strong>：训练仅需 20.7k A100h（对比 Open-Sora 1.2 超 2 倍计算量），VBench 质量分 84.74 超越所有对比方法"
      ],
      "detail": "<h5>核心框架图</h5>\n<p><img alt=\"Pyramidal Flow Matching 框架概览\" src=\"https://ar5iv.labs.arxiv.org/html/2410.05954/assets/x1.png\" />\n<em>图：左侧为空间金字塔——去噪轨迹被分为多个分辨率阶段，早期在低分辨率操作；右侧为时间金字塔——历史帧按时间远近使用递减分辨率作为条件。</em></p>\n<p><img alt=\"空间金字塔去噪轨迹\" src=\"https://ar5iv.labs.arxiv.org/html/2410.05954/assets/x2.png\" />\n<em>图：(a) 标准流匹配在全分辨率下操作所有去噪步骤；(b) 空间金字塔流匹配将轨迹分为多个分辨率阶段，大部分计算在低分辨率完成。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Pyramidal Flow Matching — 训练伪代码\n# K: 金字塔阶段数, s_k: 第k阶段下采样因子, [t_k, t_{k+1}]: 第k阶段时间区间\n\nfor x_1 in dataloader:                          # x_1: 干净视频/图像\n    k = uniform_sample(0, K)                     # 随机采样一个金字塔阶段\n    t = uniform_sample(t_k, t_{k+1})             # 在该阶段时间区间内采样时间步\n    x_0 = sample_noise(shape=x_1.shape)          # 采样高斯噪声\n\n    # 构建第k阶段的插值样本（低分辨率）\n    x_1_down = spatial_downsample(x_1, factor=s_k)\n    x_0_down = spatial_downsample(x_0, factor=s_k)\n\n    # 分段线性插值\n    alpha_t = (t_{k+1} - t) / (t_{k+1} - t_k)\n    beta_t  = (t - t_k) / (t_{k+1} - t_k)\n    x_t_k = alpha_t * x_0_down + beta_t * x_1_down\n\n    # 目标速度场\n    u_t_k = (x_1_down - x_0_down) / (t_{k+1} - t_k)\n\n    # 训练损失\n    loss = ||v_theta(x_t_k, t) - u_t_k||^2\n    loss.backward()\n    optimizer.step()\n</code></pre>\n<pre><code class=\"language-python\"># Pyramidal Flow Matching — 推理伪代码（含 Renoising）\n\nx = sample_noise(resolution=r_0)                 # 从最低分辨率噪声开始\n\nfor k in range(K):                               # 遍历每个金字塔阶段\n    # 在第k阶段的分辨率下进行ODE求解\n    for t in linspace(t_k, t_{k+1}, steps=N_k):\n        x = x + v_theta(x, t) * dt              # Euler/中点法积分\n\n    if k &lt; K - 1:                                # 非最后阶段，需要 renoising\n        x_up = spatial_upsample(x, factor=s_{k+1}/s_k)  # 上采样到下一阶段分辨率\n        epsilon = sample_noise(shape=x_up.shape)\n        # 重加噪：混合上采样结果和新噪声\n        x = (1 - t_{k+1}) * epsilon + t_{k+1} * x_up\n\nreturn x                                         # 最终全分辨率视频\n</code></pre>\n<h5>动机与背景</h5>\n<p>视频扩散模型的核心瓶颈在于计算成本：全序列扩散需要在<strong>每个去噪步骤</strong>都处理全分辨率的所有视频帧，注意力计算量为 \\(O(T^2 N^2)\\)（\\(T\\) 为帧数，\\(N\\) 为每帧 token 数）。</p>\n<div class=\"key-point\">💡 关键观察：去噪早期阶段的样本包含大量噪声，信息量极低，仅包含粗粒度的空间结构。在这些阶段使用全分辨率处理是严重的计算浪费。</div>\n<p>传统的级联扩散模型（如 Imagen Video）虽然利用了多分辨率思想，但需要为每个分辨率训练独立模型，存在三个问题：(1) 模型间无法共享知识；(2) 需要分别训练和调优多个模型；(3) 级联推理时误差会逐级累积。</p>\n<h5>空间金字塔流匹配：核心机制</h5>\n<p><strong>Flow Matching 基础</strong>：Flow Matching 通过学习速度场 \\(v_\\theta(x_t, t)\\) 建模从噪声 \\(p_0 = \\mathcal{N}(0, I)\\) 到数据 \\(p_1\\) 的概率路径。标准线性插值为：</p>\n<p>$$x_t = (1-t) \\cdot x_0 + t \\cdot x_1, \\quad t \\in [0, 1]$$</p>\n<p>训练目标为：</p>\n<p>$$\\mathcal{L}_{FM} = \\mathbb{E}_{t, x_0, x_1} \\| v_\\theta(x_t, t) - (x_1 - x_0) \\|^2$$</p>\n<p><strong>金字塔分段流</strong>：将时间区间 \\([0, 1]\\) 分为 \\(K\\) 个阶段 \\([t_0, t_1], [t_1, t_2], \\ldots, [t_{K-1}, t_K]\\)，每个阶段在不同空间分辨率 \\(r_1 < r_2 < \\ldots < r_K\\) 上操作。在第 \\(k\\) 阶段，流被定义在下采样后的空间上：</p>\n<p>$$x_t^{(k)} = \\frac{t_{k+1} - t}{t_{k+1} - t_k} \\cdot \\text{Down}(x_0, s_k) + \\frac{t - t_k}{t_{k+1} - t_k} \\cdot \\text{Down}(x_1, s_k)$$</p>\n<p>其中 \\(s_k\\) 为下采样因子。对应的目标速度场为：</p>\n<p>$$u_t^{(k)} = \\frac{\\text{Down}(x_1, s_k) - \\text{Down}(x_0, s_k)}{t_{k+1} - t_k}$$</p>\n<div class=\"key-point\">💡 关键设计：所有阶段共享同一个模型 \\(v_\\theta\\)，通过时间步 \\(t\\) 和阶段标识 \\(k\\) 区分不同分辨率阶段。这实现了跨分辨率的知识共享——低分辨率阶段学到的结构知识可迁移到高分辨率阶段。</div>\n<p><strong>统一训练目标</strong>：</p>\n<p>$$\\mathcal{L} = \\sum_{k=1}^{K} \\mathbb{E}_{t \\sim \\mathcal{U}[t_{k-1}, t_k]} \\left\\| v_\\theta(x_t^{(k)}, t) - u_t^{(k)} \\right\\|^2$$</p>\n<p>训练时每次迭代均匀采样一个阶段 \\(k\\)，在该阶段的时间区间内采样 \\(t\\)，计算对应分辨率下的损失。</p>\n<p><strong>Renoising 推理策略</strong>：推理时从低分辨率阶段跳转到高分辨率阶段需要 renoising 操作：</p>\n<ol>\n<li>在第 \\(k\\) 阶段完成 ODE 积分，得到 \\(\\hat{x}_{t_{k+1}}^{(k)}\\)</li>\n<li>上采样到下一阶段分辨率：\\(\\tilde{x} = \\text{Up}(\\hat{x}_{t_{k+1}}^{(k)})\\)</li>\n<li>添加噪声以匹配新阶段的噪声水平：</li>\n</ol>\n<p>$$x_{t_{k+1}}^{(k+1)} = (1 - t_{k+1}) \\cdot \\epsilon + t_{k+1} \\cdot \\tilde{x}, \\quad \\epsilon \\sim \\mathcal{N}(0, I)$$</p>\n<div class=\"warn-box\">⚠️ 注意：Renoising 是连接不同分辨率阶段的关键。它确保上采样后的样本分布与下一阶段起始分布一致，避免分辨率跳变导致的伪影。这与级联扩散模型中需要独立训练超分辨率模型形成鲜明对比。</div>\n<h5>时间金字塔条件：自回归效率优化</h5>\n<p><img alt=\"时间金字塔条件\" src=\"https://ar5iv.labs.arxiv.org/html/2410.05954/assets/x3.png\" />\n<em>图：(a) 时间金字塔对历史帧按时间远近使用递减分辨率；(b) 空间金字塔使用外推位置编码，时间金字塔使用内插位置编码。</em></p>\n<p>在自回归视频生成中，模型需要以历史帧为条件预测未来帧。传统方法将所有历史帧以全分辨率输入，计算量随视频长度线性增长。</p>\n<div class=\"key-point\">💡 关键观察：越早的历史帧与当前生成帧的关联越弱，主要提供高层语义信息（场景布局、运动趋势），而非精细外观细节。</div>\n<p>因此，对历史帧采用渐增分辨率的金字塔压缩：</p>\n<p>$$\\underbrace{\\ldots \\to \\text{Down}(x^{i-2}, 2^{k+1}) \\to \\text{Down}(x^{i-1}, 2^k)}_{\\text{历史帧条件（分辨率递增）}} \\to \\hat{x}^i_t \\text{（当前生成帧）}$$</p>\n<p>越早的帧使用更大的下采样因子。设有 \\(T\\) 个历史帧分布在 \\(K\\) 个分辨率层级，大部分帧在最低分辨率 \\(1/2^K\\) 下计算，训练 token 数减少至 \\(1/4^K\\)。</p>\n<p><strong>训练技巧</strong>：\n- 对历史帧添加强度在 \\([0, 1/3]\\) 均匀采样的噪声，缓解自回归误差累积\n- 推理时直接使用已生成的干净帧作为条件</p>\n<p><strong>位置编码双策略</strong>：\n- <strong>空间金字塔</strong>：使用<strong>外推</strong>（extrapolation）——低分辨率阶段使用位置编码子集，高分辨率阶段外推到更多位置，捕获更精细细节\n- <strong>时间金字塔</strong>：使用<strong>内插</strong>（interpolation）——将低分辨率帧的位置编码内插到与全分辨率空间对齐，确保语义一致性</p>\n<h5>架构与实现</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>组件</th>\n<th>设计选择</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>基础架构</td>\n<td>MM-DiT（SD3 Medium），2B 参数</td>\n</tr>\n<tr>\n<td>注意力</td>\n<td>全序列注意力 + 逐块因果注意力（blockwise causal）</td>\n</tr>\n<tr>\n<td>VAE</td>\n<td>3D VAE，时空压缩 8×8×8（类 MAGVIT-v2）</td>\n</tr>\n<tr>\n<td>金字塔阶段</td>\n<td>\\(K=3\\)（3 个分辨率级别）</td>\n</tr>\n<tr>\n<td>训练</td>\n<td>图像-视频联合训练，Patch n' Pack 长度均衡</td>\n</tr>\n<tr>\n<td>推理</td>\n<td>原生支持 T2V 和 I2V（无需额外微调）</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键：得益于金字塔表示大幅减少 token 数量，本方法可以使用<strong>全序列注意力</strong>（而非分解的时空注意力），这对捕获时空关联至关重要。逐块因果注意力确保每个 token 只能 attend 到当前帧及之前的帧，支持自回归生成。</div>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>全序列扩散</th>\n<th>级联扩散</th>\n<th>Pyramidal Flow</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>模型数量</td>\n<td>1</td>\n<td>多个（每个分辨率一个）</td>\n<td><strong>1</strong></td>\n</tr>\n<tr>\n<td>早期阶段分辨率</td>\n<td>全分辨率</td>\n<td>低分辨率</td>\n<td><strong>低分辨率</strong></td>\n</tr>\n<tr>\n<td>知识共享</td>\n<td>—</td>\n<td>✗</td>\n<td><strong>✓</strong></td>\n</tr>\n<tr>\n<td>训练复杂度</td>\n<td>\\(O(T^2N^2)\\)</td>\n<td>多个 \\(O(T^2N^2)\\)</td>\n<td><strong>\\(O(T^2N^2/16^K)\\)</strong></td>\n</tr>\n<tr>\n<td>VBench 质量分</td>\n<td>—</td>\n<td>—</td>\n<td><strong>84.74</strong></td>\n</tr>\n</tbody>\n</table></div>\n<h5>实验亮点</h5>\n<ul>\n<li><strong>VBench 质量分 84.74</strong>，超越 Gen-3 Alpha（84.11）、CogVideoX-5B（82.75），且仅使用公开数据</li>\n<li><strong>训练成本 20.7k A100h</strong>，Open-Sora 1.2 需超过 2 倍计算量且质量更差</li>\n<li>消融实验：空间金字塔实现约 <strong>3 倍 FID 收敛加速</strong>；时间金字塔在相同训练步数下视觉质量和时间一致性远优于全序列基线</li>\n<li>语义分较低（69.62），主要因粗粒度合成 caption，可通过更精确视频描述改善</li>\n</ul>",
      "quiz": {
        "q": "Pyramidal Flow Matching 在推理时从低分辨率阶段跳转到高分辨率阶段时，使用了什么关键策略？",
        "options": [
          "直接对低分辨率结果进行双线性插值上采样",
          "使用独立训练的超分辨率模型进行放大",
          "先上采样再添加适量噪声（Renoising），保持概率路径连续性",
          "在高分辨率下从头重新开始去噪过程"
        ],
        "answer": 2,
        "explain": "Renoising 策略先将低分辨率结果上采样，再添加与当前时间步匹配的噪声，确保跨分辨率跳转时分布连续，避免伪影。这是单一模型替代级联多模型的关键。"
      }
    },
    {
      "id": "energy-matching",
      "num": 22,
      "name": "Energy Matching",
      "fullName": "能量匹配 (Energy Matching)",
      "year": "2026",
      "org": "Multiple Institutions",
      "parent": "flow-matching",
      "paperUrl": "https://arxiv.org/abs/2410.06789",
      "projectUrl": "",
      "category": "flow_matching",
      "motivation": "统一流匹配与能量模型兼具显式似然",
      "summary": "Energy Matching 提出将流匹配（Flow Matching）中的速度场参数化为标量能量函数的梯度场，从而在保留流匹配高效训练优势的同时，赋予模型**显式似然计算**能力，实现了流匹配与能量模型（EBM）的统一框架。",
      "keyPoints": [
        "<strong>保守速度场设计</strong>：将速度场约束为标量能量函数的负梯度 \\(v_\\theta(x,t) = -\\nabla_x E_\\theta(x,t)\\)，保证无旋（curl-free）性质",
        "<strong>显式似然计算</strong>：利用保守场的特殊结构，将连续正规化流（CNF）的对数似然中的散度项简化为能量函数的拉普拉斯算子 \\(\\Delta E_\\theta\\)，避免了昂贵的 Hutchinson 迹估计",
        "<strong>流匹配训练目标</strong>：沿用条件流匹配（Conditional Flow Matching）的回归损失进行训练，无需 MCMC 采样或对抗训练",
        "<strong>能量函数的双重角色</strong>：既作为生成模型的速度场驱动 ODE 采样，又作为能量模型提供归一化的概率密度",
        "<strong>高效拉普拉斯计算</strong>：通过 Hutchinson-Laplacian 估计器或精确对角 Hessian 计算，实现可扩展的似然评估",
        "<strong>统一框架</strong>：将流匹配、能量模型和连续正规化流纳入同一理论体系，三者共享同一组参数"
      ],
      "detail": "<h5>核心框架示意图</h5>\n<p>Energy Matching 的核心思想可以用以下概念图理解：模型学习一个依赖时间的标量能量函数 \\(E_\\theta(x, t)\\)，其梯度场驱动从噪声分布 \\(p_0 = \\mathcal{N}(0, I)\\) 到数据分布 \\(p_1 = p_{\\text{data}}\\) 的确定性传输。由于速度场是保守的，整个传输路径对应一个势能景观的梯度下降，天然支持概率密度的精确计算。</p>\n<pre><code>┌─────────────────────────────────────────────────────────┐\n│                  Energy Matching 框架                     │\n│                                                          │\n│   噪声 p₀=N(0,I)  ──── ODE: dx/dt = -∇ₓE_θ(x,t) ────▶ 数据 p₁  │\n│        t=0                                          t=1  │\n│                                                          │\n│   ┌──────────────┐    ┌──────────────┐                   │\n│   │  Flow Matching│    │  Energy-Based │                  │\n│   │  (训练目标)   │    │  Model (似然) │                  │\n│   │  min ||v-u||² │    │  p(x)∝e^{-E} │                  │\n│   └──────┬───────┘    └──────┬───────┘                   │\n│          │                   │                            │\n│          └───── 统一于 E_θ(x,t) ─────┘                   │\n│                                                          │\n│   似然计算: log p₁(x) = log p₀(x₀) + ∫₀¹ ΔE_θ(xₜ,t)dt │\n└─────────────────────────────────────────────────────────┘\n</code></pre>\n<p><em>图：Energy Matching 统一框架。标量能量函数 \\(E_\\theta\\) 同时服务于流匹配训练和显式似然计算。</em></p>\n<h5>算法伪代码</h5>\n<p><strong>训练算法</strong>：</p>\n<pre><code class=\"language-python\"># Energy Matching 训练\n# E_θ: 标量能量网络 (输入 x∈R^d, t∈[0,1], 输出标量)\nwhile not converged:\n    x_1 ~ p_data(x)                           # 从数据分布采样\n    x_0 ~ N(0, I)                              # 从噪声分布采样\n    t ~ Uniform(0, 1)                          # 随机采样时间步\n    x_t = (1-t) * x_0 + t * x_1               # 线性插值（OT 路径）\n    u_t = x_1 - x_0                            # 条件速度场目标\n    v_t = -∇_x E_θ(x_t, t)                    # 能量梯度作为速度场\n    loss = || v_t - u_t ||²                    # 条件流匹配损失\n    θ ← θ - η · ∇_θ loss\n</code></pre>\n<p><strong>采样算法</strong>：</p>\n<pre><code class=\"language-python\"># Energy Matching 采样（ODE 求解）\nx_0 ~ N(0, I)                                 # 从噪声开始\nfor t in linspace(0, 1, N_steps):\n    v = -∇_x E_θ(x_t, t)                      # 计算能量梯度\n    x_{t+dt} = x_t + v * dt                   # Euler 步进\nreturn x_1                                     # 生成样本\n</code></pre>\n<p><strong>似然计算算法</strong>：</p>\n<pre><code class=\"language-python\"># Energy Matching 显式似然计算\n# 给定数据点 x_1，计算 log p(x_1)\nx_1 = data_point\n# 反向 ODE 求解: 从 t=1 到 t=0\nx_t = x_1\nlog_det = 0\nfor t in linspace(1, 0, N_steps):\n    v = -∇_x E_θ(x_t, t)\n    laplacian = Δ_x E_θ(x_t, t)               # 拉普拉斯算子（散度）\n    x_{t-dt} = x_t - v * dt\n    log_det += laplacian * dt                  # 累积对数行列式变化\nx_0 = x_t\nlog_p = log N(x_0; 0, I) + log_det            # 最终似然\n</code></pre>\n<h5>1. 动机与背景：为什么需要 Energy Matching？</h5>\n<p><strong>流匹配的局限性</strong>：流匹配（Flow Matching）通过学习速度场 \\(v_\\theta(x, t)\\) 驱动 ODE 将噪声映射到数据，训练简单高效。然而，标准流匹配的速度场是一个<strong>无约束的向量场</strong>，计算模型的对数似然需要求解：</p>\n<p>$$\\log p_1(x_1) = \\log p_0(x_0) - \\int_0^1 \\nabla \\cdot v_\\theta(x_t, t)\\, dt$$</p>\n<p>其中散度项 \\(\\nabla \\cdot v_\\theta = \\text{Tr}(\\partial v_\\theta / \\partial x)\\) 对于高维数据的计算代价极高（需要 \\(d\\) 次反向传播或使用 Hutchinson 迹估计器引入方差）。这使得流匹配模型在需要精确密度估计的任务（如异常检测、模型选择、半监督学习）中受限。</p>\n<p><strong>能量模型的局限性</strong>：传统能量模型（EBM）定义 \\(p(x) \\propto \\exp(-E_\\theta(x))\\)，天然提供能量景观，但面临<strong>配分函数不可计算</strong>的根本困难。训练通常依赖对比散度（Contrastive Divergence）或分数匹配等方法，需要昂贵的 MCMC 采样，且训练不稳定。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：如果将流匹配的速度场约束为某个标量函数的梯度（即保守场），就能同时获得流匹配的训练便利性和能量模型的密度估计能力。</div>\n<h5>2. 核心机制：保守速度场与能量参数化</h5>\n<p>Energy Matching 的核心设计是将速度场参数化为标量能量函数的<strong>负梯度</strong>：</p>\n<p>$$v_\\theta(x, t) = -\\nabla_x E_\\theta(x, t)$$</p>\n<p>其中 \\(E_\\theta: \\mathbb{R}^d \\times [0,1] \\to \\mathbb{R}\\) 是一个输出标量的神经网络。这一约束带来了深刻的数学性质：</p>\n<p><strong>保守场的无旋性</strong>：由于 \\(v_\\theta\\) 是标量函数的梯度，其旋度恒为零：</p>\n<p>$$\\nabla \\times v_\\theta = \\nabla \\times (-\\nabla_x E_\\theta) = 0$$</p>\n<p>这意味着速度场是<strong>无旋的（irrotational）</strong>，对应的流没有\"旋转\"分量，所有传输路径都沿着势能景观的梯度方向。</p>\n<p><strong>散度的简化</strong>：对于保守速度场，散度等于能量函数的<strong>负拉普拉斯算子</strong>：</p>\n<p>$$\\nabla \\cdot v_\\theta(x, t) = -\\nabla \\cdot \\nabla_x E_\\theta(x, t) = -\\Delta_x E_\\theta(x, t)$$</p>\n<p>其中 \\(\\Delta_x = \\sum_{i=1}^d \\frac{\\partial^2}{\\partial x_i^2}\\) 是拉普拉斯算子。这将散度从一个 \\(d\\)-维向量场的迹计算，简化为一个标量函数的二阶导数之和。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：虽然拉普拉斯算子仍然涉及 \\(d\\) 个二阶偏导数，但相比一般向量场的 Jacobian 迹，它具有更好的结构性质，可以利用 Hutchinson 估计器的改进版本高效近似。</div>\n<h5>3. 似然计算：从 ODE 到精确密度</h5>\n<p>利用连续正规化流（CNF）的瞬时变量替换公式，Energy Matching 模型的对数似然为：</p>\n<p>$$\\log p_1(x_1) = \\log p_0(x_0) + \\int_0^1 \\Delta_x E_\\theta(x_t, t)\\, dt$$</p>\n<p>其中 \\(x_0\\) 是将 \\(x_1\\) 通过反向 ODE 传输到 \\(t=0\\) 的结果。与标准 CNF 相比：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>散度计算</th>\n<th>计算复杂度</th>\n<th>方差</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>标准 CNF</td>\n<td>\\(\\text{Tr}(\\partial v / \\partial x)\\)</td>\n<td>\\(O(d)\\) 次反向传播</td>\n<td>—</td>\n</tr>\n<tr>\n<td>Hutchinson 估计</td>\n<td>\\(\\epsilon^T (\\partial v / \\partial x) \\epsilon\\)</td>\n<td>\\(O(1)\\) 次反向传播</td>\n<td>高</td>\n</tr>\n<tr>\n<td><strong>Energy Matching</strong></td>\n<td>\\(\\Delta E_\\theta = \\sum_i \\partial^2 E / \\partial x_i^2\\)</td>\n<td>结构化二阶导</td>\n<td>低</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键优势</strong>：Energy Matching 的拉普拉斯算子可以通过以下方式高效计算：\n1. <strong>Hutchinson-Laplacian 估计</strong>：\\(\\Delta E \\approx \\mathbb{E}_\\epsilon[\\epsilon^T \\nabla^2 E \\cdot \\epsilon]\\)，只需一次 Hessian-向量积\n2. <strong>精确对角 Hessian</strong>：对于特定网络架构，可以精确计算 \\(\\partial^2 E / \\partial x_i^2\\) 的对角元素</div>\n<h5>4. 训练流程：流匹配目标的能量版本</h5>\n<p>训练目标直接沿用条件流匹配（CFM）的框架。给定数据点 \\(x_1 \\sim p_{\\text{data}}\\) 和噪声 \\(x_0 \\sim \\mathcal{N}(0, I)\\)，构造线性插值路径：</p>\n<p>$$x_t = (1-t) x_0 + t x_1$$</p>\n<p>条件速度场目标为 \\(u_t(x | x_0, x_1) = x_1 - x_0\\)，训练损失为：</p>\n<p>$$\\mathcal{L}_{\\text{EM}}(\\theta) = \\mathbb{E}_{t, x_0, x_1} \\left[ \\left\\| \\nabla_x E_\\theta(x_t, t) + (x_1 - x_0) \\right\\|^2 \\right]$$</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：这个损失函数与标准流匹配完全一致，唯一的区别是速度场被约束为能量函数的梯度。这意味着：\n- 训练代价与标准流匹配几乎相同（仅多一次梯度计算）\n- 不需要 MCMC 采样（与传统 EBM 训练的根本区别）\n- 不需要对抗训练（与 GAN 的区别）</div>\n<h5>5. 网络架构：标量能量网络设计</h5>\n<p>Energy Matching 的能量网络 \\(E_\\theta(x, t)\\) 需要输出一个标量值，同时其梯度场需要具有足够的表达能力。典型设计包括：</p>\n<ul>\n<li><strong>基础架构</strong>：采用类似 U-Net 或 Transformer 的骨干网络，但最终输出层改为全局池化 + 线性层，输出单个标量</li>\n<li><strong>时间条件</strong>：通过正弦位置编码或自适应归一化（AdaLN）注入时间信息</li>\n<li><strong>梯度计算</strong>：利用自动微分（<code>torch.autograd.grad</code>）计算 \\(\\nabla_x E_\\theta\\)，确保梯度可以反向传播</li>\n</ul>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：将向量场输出的网络改为标量输出会降低模型的表达能力（保守场是所有向量场的子集）。Energy Matching 通过增加网络宽度或深度来补偿这一限制，并在实验中验证了生成质量不会显著下降。</div>\n<h5>6. 与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>Flow Matching</th>\n<th>EBM</th>\n<th>Energy Matching</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>训练方式</td>\n<td>回归损失</td>\n<td>MCMC / 对比散度</td>\n<td>回归损失</td>\n</tr>\n<tr>\n<td>显式似然</td>\n<td>需要昂贵的迹估计</td>\n<td>配分函数不可计算</td>\n<td>✅ 高效拉普拉斯</td>\n</tr>\n<tr>\n<td>采样方式</td>\n<td>ODE 求解</td>\n<td>MCMC / Langevin</td>\n<td>ODE 求解</td>\n</tr>\n<tr>\n<td>速度场约束</td>\n<td>无约束</td>\n<td>—</td>\n<td>保守场（无旋）</td>\n</tr>\n<tr>\n<td>能量景观</td>\n<td>无</td>\n<td>✅</td>\n<td>✅</td>\n</tr>\n<tr>\n<td>训练稳定性</td>\n<td>✅ 稳定</td>\n<td>❌ 不稳定</td>\n<td>✅ 稳定</td>\n</tr>\n</tbody>\n</table></div>\n<p>Energy Matching 的核心优势在于<strong>同时具备</strong>流匹配的训练效率和能量模型的密度估计能力，代价是将速度场限制为保守场，牺牲了部分表达能力。</p>",
      "quiz": {
        "q": "Energy Matching 将速度场约束为保守场（能量函数的梯度）的主要好处是什么？",
        "options": [
          "加速 ODE 求解器的收敛速度",
          "将似然计算中的散度简化为拉普拉斯算子，实现高效的显式密度估计",
          "消除训练过程中对数据增强的需求",
          "使模型能够处理离散数据分布"
        ],
        "answer": 1,
        "explain": "保守场的散度等于标量能量函数的拉普拉斯算子（∇·v = -ΔE），相比一般向量场的 Jacobian 迹计算，结构更简单，可高效计算，从而实现显式似然评估。"
      }
    },
    {
      "id": "dall-e",
      "num": 23,
      "name": "DALL-E",
      "fullName": "DALL-E",
      "year": "2021",
      "org": "OpenAI",
      "parent": "vq-vae",
      "paperUrl": "https://arxiv.org/abs/2102.12092",
      "projectUrl": "",
      "category": "autoregressive",
      "motivation": "大规模自回归文本转图像零样本生成",
      "summary": "DALL-E 提出了一种两阶段方法：先用离散变分自编码器（dVAE）将图像压缩为离散 token，再用 120 亿参数的自回归 Transformer 联合建模文本和图像 token，在 2.5 亿图文对上训练后实现了强大的零样本文本到图像生成能力。",
      "keyPoints": [
        "<strong>两阶段训练框架</strong>：Stage 1 训练 dVAE 将 256×256 图像压缩为 32×32 的离散 token 网格（codebook 大小 8192）；Stage 2 训练 120 亿参数稀疏 Transformer 自回归建模 256 个文本 BPE token + 1024 个图像 token 的联合序列",
        "<strong>离散 VAE（dVAE）</strong>：使用 Gumbel-Softmax 松弛实现离散 token 的可微采样，避免了 VQ-VAE 中的直通估计器（straight-through estimator），codebook 利用率更高",
        "<strong>稀疏注意力机制</strong>：图像 token 之间采用行注意力、列注意力和卷积注意力的稀疏模式，大幅降低了长序列的计算复杂度",
        "<strong>CLIP 重排序</strong>：推理时生成 512 个候选样本，使用 CLIP 对比模型按文本-图像匹配度排序，选择最佳结果",
        "<strong>零样本泛化</strong>：在 MS-COCO 上零样本评估，人类评估者 90% 的情况下更偏好 DALL-E 的生成结果（相比之前在该数据集上训练的方法）",
        "<strong>大规模数据驱动</strong>：在从互联网收集的 2.5 亿图文对上训练，证明了数据规模和模型规模对文本到图像生成的关键作用"
      ],
      "detail": "<h5>整体架构</h5>\n<p>DALL-E 的核心思想是将文本到图像生成问题转化为序列建模问题。通过 dVAE 将图像离散化后，文本和图像可以统一表示为 token 序列，从而利用 Transformer 的强大序列建模能力。</p>\n<p><img alt=\"dVAE 重建效果对比\" src=\"https://ar5iv.labs.arxiv.org/html/2102.12092/assets/dvae_rec.png\" />\n<em>图：原始图像（上）与 dVAE 重建图像（下）的对比。编码器将空间分辨率下采样 8 倍，使用 8192 大小的 codebook 来减轻信息损失。</em></p>\n<h5>训练目标</h5>\n<p>整体训练目标是最大化图像 $x$、文本 $y$ 和图像 token $z$ 联合分布的证据下界（ELB）：</p>\n<p>$$\\ln p_{\\theta,\\psi}(x, y) \\geq \\mathbb{E}_{z \\sim q_\\phi(z|x)} \\left[ \\ln p_\\theta(x | y, z) - \\beta \\cdot D_{KL}(q_\\phi(z|x) \\| p_\\psi(z|y)) \\right]$$</p>\n<p>其中：\n- $q_\\phi(z|x)$：dVAE 编码器，将图像编码为离散 token 的分布\n- $p_\\theta(x|y,z)$：dVAE 解码器，从 token 重建图像\n- $p_\\psi(z|y)$：自回归 Transformer 先验，根据文本预测图像 token\n- $\\beta = 6.6$：KL 散度的权重系数</p>\n<h5>Stage 1：dVAE 训练</h5>\n<pre><code>算法：dVAE 训练过程\n输入：RGB 图像 x ∈ R^{256×256×3}\n输出：训练好的编码器 q_φ 和解码器 p_θ\n\n1. 编码器将图像映射到 32×32 网格，每个位置输出 8192 维 logits\n2. 使用 Gumbel-Softmax 松弛进行可微采样：\n   - 对 logits 加 Gumbel 噪声后取 softmax\n   - 温度 τ 从 1 退火到 1/16\n3. 采样得到的 soft one-hot 向量与 codebook 嵌入相乘得到连续表示\n4. 解码器从连续表示重建图像\n5. 优化 ELB = E_q[ln p_θ(x|z)] - β·KL(q_φ(z|x) || uniform(1/8192))\n   - 重建损失：对 logistic 分布的对数似然\n   - KL 正则：鼓励编码分布接近均匀分布\n</code></pre>\n<p><strong>关键设计选择：</strong>\n- <strong>Gumbel-Softmax vs Straight-Through</strong>：Gumbel-Softmax 提供了更平滑的梯度，避免了 VQ-VAE 中 straight-through estimator 的梯度偏差问题\n- <strong>大 codebook（K=8192）</strong>：相比 VQ-VAE 常用的 512，更大的 codebook 能保留更多图像细节\n- <strong>温度退火</strong>：训练初期使用较高温度（τ=1）保证梯度流动，后期降低温度（τ=1/16）使分布更接近离散</p>\n<h5>Stage 2：稀疏 Transformer 训练</h5>\n<pre><code>算法：自回归 Transformer 训练\n输入：文本 token y (最多256个BPE token)，图像 token z (1024个)\n输出：训练好的 Transformer 先验 p_ψ\n\n1. 将文本 token 和图像 token 拼接为长度 1280 的序列\n2. 使用 64 层稀疏 Transformer 自回归建模：\n   - 文本→文本：标准因果注意力\n   - 图像→文本：全注意力（每个图像 token 可看到所有文本 token）\n   - 图像→图像：稀疏注意力（行/列/卷积模式交替）\n3. 最大化自回归对数似然：\n   ln p_ψ(y, z) = Σ_i ln p_ψ(token_i | token_{&lt;i})\n</code></pre>\n<p><strong>稀疏注意力模式（3 种交替使用）：</strong>\n- <strong>行注意力（Row attention）</strong>：每个图像 token 关注同一行的所有 token\n- <strong>列注意力（Column attention）</strong>：每个图像 token 关注同一列的所有 token\n- <strong>卷积注意力（Convolutional attention）</strong>：每个图像 token 关注局部 3×3 窗口内的 token</p>\n<p>这种稀疏模式将注意力复杂度从 $O(n^2)$ 降低到 $O(n\\sqrt{n})$，使得处理 1024 个图像 token 变得可行。</p>\n<h5>推理与 CLIP 重排序</h5>\n<p><img alt=\"MS-COCO 生成对比\" src=\"https://ar5iv.labs.arxiv.org/html/2102.12092/assets/coco_cmp_v2.jpg\" />\n<em>图：DALL-E 与先前方法在 MS-COCO 文本描述上的生成效果对比。DALL-E 的每个样本是 512 个候选中由 CLIP 排序选出的最佳结果。</em></p>\n<pre><code>算法：推理过程\n输入：文本描述 y\n输出：生成图像 x*\n\n1. 将文本编码为 BPE token 序列\n2. 使用 Transformer 自回归采样 512 组图像 token\n3. 对每组图像 token，通过 dVAE 解码器生成 512 张候选图像\n4. 使用预训练的 CLIP 模型计算每张图像与文本的匹配分数\n5. 选择 CLIP 分数最高的图像作为最终输出 x*\n</code></pre>\n<h5>模型规模与训练细节</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>组件</th>\n<th>参数量</th>\n<th>关键配置</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>dVAE 编码器</td>\n<td>~40M</td>\n<td>ResNet blocks, 32×32 输出, K=8192</td>\n</tr>\n<tr>\n<td>dVAE 解码器</td>\n<td>~40M</td>\n<td>ResNet blocks, 256×256 输出</td>\n</tr>\n<tr>\n<td>Transformer</td>\n<td>12B</td>\n<td>64 层, 62 个注意力头, d=3968</td>\n</tr>\n<tr>\n<td>总计</td>\n<td>~12B</td>\n<td>250M 图文对训练</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>训练配置：</strong>\n- 优化器：Adam（β₁=0.9, β₂=0.96）\n- dVAE 训练：3M 步，学习率 1×10⁻⁴\n- Transformer 训练：分布式训练，混合精度（16-bit）\n- 数据：2.5 亿互联网图文对（类似 JFT-300M 规模）</p>\n<h5>实验结果</h5>\n<p><strong>MS-COCO 零样本评估：</strong>\n- 人类评估：90% 的情况下评估者更偏好 DALL-E 的生成结果（对比 DF-GAN 等在 COCO 上训练的方法）\n- FID 分数：约 27.5（零样本，无需在 COCO 上训练）\n- 展现了强大的组合泛化能力：能将未见过的概念组合生成合理图像</p>\n<p><strong>零样本能力展示：</strong>\n- 概念组合：如\"鳄梨形状的扶手椅\"\n- 文字渲染：能在图像中生成指定文字（如霓虹灯标志）\n- 风格迁移：如\"以梵高风格画的城市天际线\"\n- 图像到图像翻译：如\"将照片转为素描\"</p>",
      "quiz": {
        "q": "",
        "options": [],
        "answer": 0,
        "explain": ""
      }
    },
    {
      "id": "parti",
      "num": 24,
      "name": "Parti",
      "fullName": "Parti",
      "year": "2022",
      "org": "Google",
      "parent": "dall-e",
      "paperUrl": "https://arxiv.org/abs/2206.10789",
      "projectUrl": "",
      "category": "autoregressive",
      "motivation": "扩展自回归模型实现复杂文本渲染",
      "summary": "Parti 将文本到图像生成视为序列到序列问题，使用 ViT-VQGAN 将图像编码为离散 token 序列，再通过 encoder-decoder Transformer 自回归生成图像 token，并证明了将模型从 350M 扩展到 20B 参数可以持续提升生成质量，在 MS-COCO 上取得了零样本 FID 7.23 和微调 FID 3.22 的当时最优结果。",
      "keyPoints": [
        "<strong>序列到序列框架</strong>：将文本到图像生成建模为\"翻译\"任务，文本 token 为源序列（最长 128 token），图像 token 为目标序列（32×32 = 1024 token）",
        "<strong>两阶段架构</strong>：第一阶段用 ViT-VQGAN（8192 码本）将 256×256 图像编码为离散 token；第二阶段用 encoder-decoder Transformer 自回归生成图像 token",
        "<strong>模型扩展</strong>：训练了 350M、750M、3B、20B 四个规模的模型，证明自回归模型在文本到图像任务上具有清晰的 scaling 优势",
        "<strong>Classifier-Free Guidance (CFG)</strong>：在自回归模型中实现无分类器引导，通过随机丢弃文本条件并在推理时线性组合有/无条件 logits",
        "<strong>CoCa 重排序</strong>：生成 16 个候选图像后，用 CoCa 模型按图文匹配分数选择最佳结果",
        "<strong>超分辨率级联</strong>：使用两级 WDSR 超分网络将 256×256 图像逐步提升至 512×512 和 1024×1024",
        "<strong>PartiPrompts (P2) 基准</strong>：提出包含 1600 条英文提示的评测基准，覆盖 12 个类别和 11 种挑战维度",
        "<strong>大规模分布式训练</strong>：20B 模型使用 GSPMD 在 TPUv4 上实现 16 级流水线并行 + 64 路数据并行"
      ],
      "detail": "<h5>整体架构</h5>\n<p><img alt=\"Parti 架构图\" src=\"https://ar5iv.labs.arxiv.org/html/2206.10789/assets/figures/parti.jpg\" />\n<em>图：Parti 整体架构。文本经 Transformer 编码器编码，图像经 ViT-VQGAN 编码为离散 token 序列，Transformer 解码器自回归生成图像 token，最后由 ViT-VQGAN 解码器重建图像。</em></p>\n<p><img alt=\"Parti 生成示例\" src=\"https://ar5iv.labs.arxiv.org/html/2206.10789/assets/figures/teaser.jpg\" />\n<em>图：Parti-20B 生成的高质量图像示例，展示了对复杂文本提示的理解能力。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># ========== 第一阶段：ViT-VQGAN 图像 Tokenizer（预训练，冻结） ==========\n# 编码器 E (30M 参数), 解码器 G (600M 参数), 码本 Z (8192 entries)\nz_e = E(image)                          # ViT 编码: 256×256 → 连续特征\nz_q = quantize(z_e, Z)                  # 向量量化: 找码本最近邻\ntokens = codebook_indices(z_q)          # 转为索引序列: 32×32 = 1024 tokens\nimage_hat = G(z_q)                      # 解码重建（训练时用）\n\n# ========== 第二阶段：Encoder-Decoder Transformer ==========\n# 文本编码器 Enc, 图像解码器 Dec\ntext_tokens = tokenize(text_prompt)     # SentencePiece 分词, 最长 128 tokens\ntext_features = Enc(text_tokens)        # Transformer 编码器\n\n# 自回归生成图像 token\nimage_tokens = []\nfor i in range(1024):                   # 32×32 = 1024 步\n    logits = Dec(image_tokens, text_features)  # 交叉注意力 + 因果自注意力\n\n    # Classifier-Free Guidance\n    logits_cond = logits                        # 有条件 logits\n    logits_uncond = Dec(image_tokens, NULL)     # 无条件 logits (文本=空)\n    logits_final = logits_uncond + w * (logits_cond - logits_uncond)  # w=3.0\n\n    next_token = sample(logits_final)   # Top-k 采样\n    image_tokens.append(next_token)\n\n# 解码 + 超分辨率\nimage_256 = G(lookup(Z, image_tokens))  # ViT-VQGAN 解码: tokens → 256×256\nimage_512 = WDSR_15M(image_256)         # 超分: 256→512\nimage_1024 = WDSR_30M(image_512)        # 超分: 512→1024\n\n# ========== CoCa 重排序 ==========\ncandidates = [generate() for _ in range(16)]  # 生成 16 个候选\nscores = [CoCa.score(text, img) for img in candidates]\nbest_image = candidates[argmax(scores)]       # 选图文匹配最高的\n</code></pre>\n<h5>动机与背景</h5>\n<p>文本到图像生成领域在 2022 年经历了快速发展，DALL-E、CogView 等自回归模型和 GLIDE、DALL-E 2、Imagen 等扩散模型相继涌现。然而，<strong>自回归模型在文本到图像任务上的 scaling 行为尚未被充分探索</strong>。在自然语言处理中，GPT-3 等工作已经证明了自回归模型随参数量增长的持续性能提升，但这一规律是否适用于跨模态的图像生成任务仍是开放问题。</p>\n<p>此前的自回归文本到图像模型（如 DALL-E、CogView）通常将文本和图像 token 拼接为单一序列，使用 decoder-only Transformer 建模。Parti 的核心洞察是：<strong>将文本到图像生成重新建模为序列到序列（seq2seq）翻译问题</strong>，类似于机器翻译中将源语言\"翻译\"为目标语言。这种 encoder-decoder 架构天然适合处理输入（文本）和输出（图像）长度不对称的场景，并且可以直接借鉴 NLP 领域成熟的 scaling 策略。</p>\n<h5>核心机制一：ViT-VQGAN 图像 Tokenizer</h5>\n<p>Parti 使用经过微调的 ViT-VQGAN 作为图像 tokenizer，将 \\(256 \\times 256\\) 的图像编码为 \\(32 \\times 32 = 1024\\) 个离散 token，码本大小为 8192。相比原始 ViT-VQGAN，Parti 做了一个关键修改：<strong>移除了 sigmoid 激活函数和 logit-Laplace 损失</strong>，改用标准的 L2 重建损失，发现这在大规模训练中更加稳定。</p>\n<p>编码器仅有 30M 参数（推理时冻结），而解码器有 600M 参数，这种不对称设计反映了\"编码容易、解码难\"的直觉——从离散 token 重建高质量图像比将图像压缩为 token 更具挑战性。</p>\n<p>$$\\text{Image} \\xrightarrow{E_{\\text{ViT}}} z_e \\xrightarrow{\\text{Quantize}} z_q = \\arg\\min_{z_k \\in \\mathcal{Z}} \\|z_e - z_k\\| \\xrightarrow{\\text{Index}} s \\in \\{0, \\dots, 8191\\}^{1024}$$</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：图像 tokenizer 的质量是整个系统的瓶颈。无论 Transformer 多强大，它只能在 tokenizer 所能表达的视觉空间内生成图像。Parti 使用 600M 参数的 ViT 解码器（而非传统 CNN 解码器）来确保从离散 token 到像素的重建质量。</div>\n<h5>核心机制二：Encoder-Decoder Transformer</h5>\n<p><img alt=\"解码器注意力模式\" src=\"https://ar5iv.labs.arxiv.org/html/2206.10789/assets/x1.png\" />\n<em>图：Parti 解码器中的卷积形状稀疏注意力掩码。每个 token 只关注同行及上方的 token，模拟了 2D 图像的局部结构。</em></p>\n<p>Parti 的核心是一个 encoder-decoder Transformer，其中：</p>\n<ul>\n<li><strong>编码器</strong>处理文本 token（最长 128 个），使用双向自注意力</li>\n<li><strong>解码器</strong>自回归生成图像 token（1024 个），使用因果自注意力 + 交叉注意力</li>\n</ul>\n<p>20B 模型的具体配置为：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>组件</th>\n<th>层数</th>\n<th>隐藏维度</th>\n<th>注意力头数</th>\n<th>参数量</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>编码器</td>\n<td>16</td>\n<td>4096</td>\n<td>64</td>\n<td>~2B</td>\n</tr>\n<tr>\n<td>解码器</td>\n<td>64</td>\n<td>4096</td>\n<td>64</td>\n<td>~18B</td>\n</tr>\n</tbody>\n</table></div>\n<p>解码器中使用了<strong>卷积形状的稀疏注意力掩码</strong>（Conv-shaped Masked Sparse Attention）：在因果注意力的基础上，每个 token 不仅关注之前的所有 token，还特别关注同一行和上方行的 token。这种设计利用了图像 token 的 2D 空间结构，在不增加计算量的情况下引入了局部归纳偏置。</p>\n<div class=\"key-point\">💡 <strong>设计直觉</strong>：图像 token 按光栅扫描顺序排列为 1D 序列，但它们本质上具有 2D 空间关系。卷积形状的注意力掩码让模型在生成每个 token 时能更好地利用空间邻域信息，类似于 CNN 的局部感受野，但保持了 Transformer 的灵活性。</div>\n<h5>核心机制三：Classifier-Free Guidance (CFG)</h5>\n<p>Parti 在自回归模型中实现了 Classifier-Free Guidance，这是提升生成质量的关键技术。训练时以 10% 的概率随机将文本输入替换为空序列，使模型同时学习有条件和无条件分布。推理时，对每一步的 logits 进行线性组合：</p>\n<p>$$\\ell_{\\text{final}} = \\ell_{\\text{uncond}} + w \\cdot (\\ell_{\\text{cond}} - \\ell_{\\text{uncond}})$$</p>\n<p>其中 \\(w\\) 为引导权重（guidance scale），Parti 使用 \\(w = 3.0\\)。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：与扩散模型中对连续噪声预测应用 CFG 不同，自回归模型中的 CFG 作用于离散 token 的 logits 空间。这意味着引导权重不能设得太大（扩散模型常用 7.5-15），否则会导致 logits 分布过于尖锐，生成退化。Parti 发现 \\(w = 3.0\\) 是最优值。</div>\n<p>CFG 的引入带来了显著的 FID 提升。在微调阶段，Parti 额外使用 LAION-400M 数据集进行带 CFG 的训练，使零样本 FID 从约 10+ 降至 7.23。</p>\n<h5>核心机制四：模型扩展（Scaling）</h5>\n<p><img alt=\"Scaling 对比\" src=\"https://ar5iv.labs.arxiv.org/html/2206.10789/assets/x5.png\" />\n<em>图：不同规模 Parti 模型在相同提示下的生成效果对比，展示了 scaling 带来的质量提升。</em></p>\n<p>Parti 训练了四个规模的模型，清晰展示了自回归模型在文本到图像任务上的 scaling 优势：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>参数量</th>\n<th>零样本 FID ↓</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Parti-350M</td>\n<td>350M</td>\n<td>14.10</td>\n</tr>\n<tr>\n<td>Parti-750M</td>\n<td>750M</td>\n<td>10.71</td>\n</tr>\n<tr>\n<td>Parti-3B</td>\n<td>3B</td>\n<td>8.10</td>\n</tr>\n<tr>\n<td>Parti-20B</td>\n<td>20B</td>\n<td><strong>7.23</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>微调后，Parti-20B 进一步达到 <strong>FID 3.22</strong>，为当时 MS-COCO 256×256 的最优结果。</p>\n<p>20B 模型的训练使用了 Google 的 GSPMD 框架在 TPUv4 集群上进行：\n- <strong>16 级流水线并行</strong>（将模型层分配到不同设备）\n- <strong>64 路数据并行</strong>（共 1024 个 TPUv4 芯片）\n- 优化器：Adafactor，精度：bfloat16\n- 批量大小 8192，训练 450K 步</p>\n<div class=\"key-point\">💡 <strong>关键发现</strong>：随着模型规模增大，Parti 在多个维度上持续改善——不仅 FID 分数下降，生成图像的细节丰富度、文本理解准确度、物体组合能力都显著提升。这与 NLP 中观察到的 scaling law 一致，表明自回归模型在跨模态生成中同样受益于规模扩展。</div>\n<h5>训练数据与文本编码器预训练</h5>\n<p>Parti 使用了三个大规模数据集的组合：\n- <strong>LAION-400M</strong>：公开的网络图文对数据集\n- <strong>FIT400M</strong>：内部的图文对数据集\n- <strong>JFT-4B</strong>：大规模图像分类数据集，使用 SimVLM 模型为每张图像生成文本描述</p>\n<p>文本编码器并非从零训练，而是经过两阶段预训练：\n1. 在 C4 数据集上进行 BERT 风格的掩码语言建模\n2. 在图文对数据上进行对比学习</p>\n<p>这种预训练策略使文本编码器具备了更强的语义理解能力，尤其是对复杂、长文本提示的处理。</p>\n<h5>已知局限性</h5>\n<p>论文详细分析了 Parti 的 13 类典型失败模式：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>失败类型</th>\n<th>描述</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>颜色溢出</td>\n<td>一个物体的颜色泄漏到相邻物体</td>\n</tr>\n<tr>\n<td>特征融合</td>\n<td>多个物体的属性错误混合</td>\n</tr>\n<tr>\n<td>计数失败</td>\n<td>超过 7 个物体时计数不可靠</td>\n</tr>\n<tr>\n<td>空间关系</td>\n<td>\"左/右\"等方位词几乎随机</td>\n</tr>\n<tr>\n<td>否定/缺失</td>\n<td>忽略\"没有\"\"不含\"等否定表达</td>\n</tr>\n<tr>\n<td>文本渲染</td>\n<td>生成的图内文字常有拼写错误</td>\n</tr>\n<tr>\n<td>实体解耦</td>\n<td>难以将多个属性正确分配给多个物体</td>\n</tr>\n<tr>\n<td>视觉先验</td>\n<td>过度依赖训练数据中的常见搭配</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：这些局限性中的许多（如计数、空间关系、否定理解）至今仍是文本到图像模型的共性挑战，反映了当前模型在组合性推理能力上的根本不足。</div>\n<h5>与同期方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>类型</th>\n<th>参数量</th>\n<th>零样本 FID ↓</th>\n<th>图像分辨率</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>DALL-E</td>\n<td>自回归</td>\n<td>12B</td>\n<td>27.50</td>\n<td>256×256</td>\n</tr>\n<tr>\n<td>CogView</td>\n<td>自回归</td>\n<td>4B</td>\n<td>27.10</td>\n<td>256×256</td>\n</tr>\n<tr>\n<td>GLIDE</td>\n<td>扩散</td>\n<td>5B</td>\n<td>12.24</td>\n<td>256×256</td>\n</tr>\n<tr>\n<td>Make-A-Scene</td>\n<td>自回归</td>\n<td>4B</td>\n<td>11.84</td>\n<td>256×256</td>\n</tr>\n<tr>\n<td>DALL-E 2</td>\n<td>扩散</td>\n<td>5.5B</td>\n<td>10.39</td>\n<td>256×256</td>\n</tr>\n<tr>\n<td>Imagen</td>\n<td>扩散</td>\n<td>3B</td>\n<td>7.27</td>\n<td>256×256</td>\n</tr>\n<tr>\n<td><strong>Parti-20B</strong></td>\n<td><strong>自回归</strong></td>\n<td><strong>20B</strong></td>\n<td><strong>7.23</strong></td>\n<td><strong>256×256</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>Parti 是当时首个在零样本 FID 上与扩散模型（Imagen）持平的自回归模型，证明了自回归方法在文本到图像生成中的竞争力。</p>",
      "quiz": {
        "q": "Parti 相比 DALL-E 等先前自回归文本到图像模型的核心架构区别是什么？",
        "options": [
          "使用更大的图像码本（8192 vs 8192），提升图像重建质量",
          "采用 encoder-decoder Transformer 将文本到图像建模为序列到序列翻译问题，而非 decoder-only 拼接",
          "使用扩散模型替代自回归解码，提升生成多样性",
          "引入多尺度向量量化，在不同分辨率上分别生成图像 token"
        ],
        "answer": 1,
        "explain": "DALL-E 将文本和图像 token 拼接为单一序列用 decoder-only Transformer 建模，而 Parti 采用 encoder-decoder 架构，编码器处理文本、解码器自回归生成图像 token，这种 seq2seq 框架更适合输入输出长度不对称的跨模态生成任务，并可直接借鉴 NLP 的 scaling 策略。"
      }
    },
    {
      "id": "llamagen",
      "num": 25,
      "name": "LlamaGen",
      "fullName": "LlamaGen",
      "year": "2024",
      "org": "ByteDance",
      "parent": "parti",
      "paperUrl": "https://arxiv.org/abs/2406.06525",
      "projectUrl": "",
      "category": "autoregressive",
      "motivation": "验证原生自回归模型的可扩展性",
      "summary": "LlamaGen 证明了**不做任何视觉特化修改**的原生 Llama 架构（next-token prediction）即可实现高质量图像生成：通过改进的图像 tokenizer（低维码本 + 大码本 + \\(\\ell_2\\)-归一化）和标准 Llama Transformer（RMSNorm / SwiGLU / 2D-RoPE），在 ImageNet 256×256 类条件生成上以 FID 2.18 超越 DiT-XL/2（FID 2.27），并可无缝复用 LLM 生态的 vLLM 推理加速（326%–414% 提速）。",
      "keyPoints": [
        "<strong>图像 Tokenizer 改进</strong>：基于 VQGAN 编码器-解码器架构，引入三项关键设计——码本向量 \\(\\ell_2\\)-归一化、低维码本嵌入（8-dim vs 传统 256-dim）、大码本容量（16384 codes），将 rFID 从 8.30 降至 2.19（ds16）/ 0.94（ds16@384），码本利用率达 97%",
        "<strong>原生 Llama 架构</strong>：直接复用 Llama 的 RMSNorm 预归一化、SwiGLU 激活、2D Rotary Position Embedding，<strong>不使用 AdaLN</strong> 等视觉特化模块，模型规模从 111M 到 3.1B",
        "<strong>类条件生成</strong>：类别嵌入作为 prefilling token，next-token prediction 生成图像 token 序列；LlamaGen-3B 在 ImageNet 256×256 上 FID=2.18，超越 DiT-XL/2（FID=2.27）和 LDM-4（FID=3.60）",
        "<strong>文本条件生成</strong>：使用 FLAN-T5 XL 编码文本 + MLP 投影为 prefilling embedding，两阶段训练（50M LAION-COCO 256² → 10M 高质量内部数据 512²）",
        "<strong>Classifier-Free Guidance（CFG）</strong>：训练时随机丢弃条件，推理时 \\(\\ell_g = \\ell_u + s(\\ell_c - \\ell_u)\\) 融合无条件/有条件 logits",
        "<strong>LLM 推理加速直接复用</strong>：vLLM（PagedAttention + KV-Cache）对 111M–1.4B 模型实现 326%–414% 加速",
        "<strong>Scaling Law 验证</strong>：模型从 B→3B 持续降低 FID，但受限于 ImageNet 仅 1M 图像，3B 后边际收益递减"
      ],
      "detail": "<h5>整体框架</h5>\n<p><img alt=\"LlamaGen 整体框架\" src=\"https://ar5iv.labs.arxiv.org/html/2406.06525/assets/x1.png\" />\n<em>图 1：LlamaGen 整体流程——图像经 VQGAN tokenizer 离散化为 token 序列，由 Llama Transformer 以 next-token prediction 方式自回归生成，最后由 tokenizer decoder 重建图像。</em></p>\n<p>LlamaGen 的核心思想极为简洁：<strong>将图像视为离散 token 序列，直接套用 LLM 的 next-token prediction 范式</strong>。整个系统由两个组件构成：</p>\n<ol>\n<li><strong>Image Tokenizer</strong>：将 \\(H \\times W\\) 的图像编码为 \\(\\frac{H}{f} \\times \\frac{W}{f}\\) 的离散 token 网格（\\(f\\) 为下采样率），然后按光栅扫描顺序展平为一维序列。</li>\n<li><strong>Autoregressive Transformer</strong>：标准 Llama 架构，以条件嵌入（类别 / 文本）作为 prefix token，逐个预测后续图像 token。</li>\n</ol>\n<h5>Image Tokenizer 的关键改进</h5>\n<p>论文对传统 VQGAN tokenizer 做了三项针对性改进，显著提升了重建质量和码本利用率：</p>\n<p><strong>（1）码本向量 \\(\\ell_2\\)-归一化</strong>：对编码器输出 \\(z_e\\) 和码本向量 \\(e_k\\) 均做 \\(\\ell_2\\)-归一化后再进行最近邻查找。这使得量化过程等价于在单位超球面上的余弦相似度匹配，避免了码本坍塌（codebook collapse）问题。</p>\n<p><strong>（2）低维码本嵌入</strong>：将码本向量维度从传统的 256 降至 8。实验表明（Table 2a），维度从 256→32→8 时，rFID 从 3.04→2.34→2.19，PSNR 从 19.96→20.53→20.79，码本利用率从 20.9%→82.0%→97.0%。低维空间中最近邻搜索更高效，码本向量分布更均匀。</p>\n<p><strong>（3）大码本容量</strong>：将码本大小从 1024 扩大到 16384。更大的码本提供更精细的量化粒度，rFID 从 3.02（4096）降至 2.19（16384）。</p>\n<p>Tokenizer 的训练损失为：</p>\n<p>$$\\mathcal{L}_{\\text{AE}} = \\ell_2(x, \\hat{x}) + \\mathcal{L}_{\\text{P}}(x, \\hat{x}) + \\lambda_{\\text{G}} \\mathcal{L}_{\\text{G}}(\\hat{x})$$</p>\n<p>其中 \\(\\ell_2\\) 为像素重建损失，\\(\\mathcal{L}_{\\text{P}}\\) 为 LPIPS 感知损失，\\(\\mathcal{L}_{\\text{G}}\\) 为 PatchGAN 对抗损失。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：离散 tokenizer 的重建质量（rFID 0.59 @ds8）已可媲美连续 VAE（SD-VAE rFID 0.74），说明<strong>离散表示不再是自回归图像生成的瓶颈</strong>。</div>\n<h5>Llama 架构与条件注入</h5>\n<pre><code class=\"language-python\"># LlamaGen 自回归生成伪代码\nclass LlamaGen(nn.Module):\n    def __init__(self, vocab_size=16384, dim=1280, n_layers=36, n_heads=20):\n        # 标准 Llama 架构：RMSNorm + SwiGLU + 2D-RoPE\n        self.tok_embed = nn.Embedding(vocab_size, dim)\n        self.layers = [LlamaBlock(dim, n_heads) for _ in range(n_layers)]\n        self.norm = RMSNorm(dim)\n        self.head = nn.Linear(dim, vocab_size)  # next-token prediction head\n\n    def generate(self, condition_embed, max_len=576):\n        &quot;&quot;&quot;\n        condition_embed: 类别嵌入 或 FLAN-T5 文本特征经 MLP 投影\n        &quot;&quot;&quot;\n        tokens = [condition_embed]  # prefilling token\n        for i in range(max_len):\n            x = self.forward(tokens)          # Transformer forward\n            logits = self.head(x[:, -1])      # 取最后位置的 logits\n            # Classifier-Free Guidance\n            logits = logits_uncond + cfg_scale * (logits_cond - logits_uncond)\n            next_token = sample(logits, top_k, top_p, temperature)\n            tokens.append(next_token)\n        return tokens[1:]  # 去掉条件 token\n</code></pre>\n<p><strong>模型配置</strong>（Table 1）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>参数量</th>\n<th>层数</th>\n<th>隐藏维度</th>\n<th>注意力头数</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>LlamaGen-B</td>\n<td>111M</td>\n<td>12</td>\n<td>768</td>\n<td>12</td>\n</tr>\n<tr>\n<td>LlamaGen-L</td>\n<td>343M</td>\n<td>24</td>\n<td>1024</td>\n<td>16</td>\n</tr>\n<tr>\n<td>LlamaGen-XL</td>\n<td>775M</td>\n<td>36</td>\n<td>1280</td>\n<td>20</td>\n</tr>\n<tr>\n<td>LlamaGen-XXL</td>\n<td>1.4B</td>\n<td>48</td>\n<td>1536</td>\n<td>24</td>\n</tr>\n<tr>\n<td>LlamaGen-3B</td>\n<td>3.1B</td>\n<td>24</td>\n<td>3200</td>\n<td>32</td>\n</tr>\n</tbody>\n</table></div>\n<p>论文刻意<strong>不使用 AdaLN</strong>（DiT 中将条件信息注入到 LayerNorm 的 scale/shift 参数中），而是将条件嵌入直接作为序列前缀。这一设计使模型结构与 LLM 完全一致，可无缝复用 LLM 的训练和推理基础设施。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：2D-RoPE 是唯一的\"视觉适配\"——将 1D 旋转位置编码扩展为 2D，使模型感知图像 token 的空间位置关系。但这一修改不改变模型架构本身。</div>\n<h5>Classifier-Free Guidance 在 AR 模型中的应用</h5>\n<p>CFG 最初为扩散模型设计，LlamaGen 将其适配到自回归框架：训练时以 10% 概率将条件嵌入替换为空嵌入（null embedding），推理时对每个 token 的 logit 进行引导：</p>\n<p>$$\\ell_g = \\ell_u + s \\cdot (\\ell_c - \\ell_u)$$</p>\n<p>其中 \\(\\ell_c\\) 为有条件 logit，\\(\\ell_u\\) 为无条件 logit，\\(s\\) 为引导强度。实验表明 CFG 对 AR 模型同样有效：LlamaGen-L 在 cfg=2.0 时 FID 从约 15（无 CFG）降至 3.07。</p>\n<h5>Scaling 行为与 SOTA 对比</h5>\n<p><img alt=\"Scaling Law\" src=\"https://ar5iv.labs.arxiv.org/html/2406.06525/assets/figure/fid_scaling_law_cfg.png\" />\n<em>图 2(b)：使用 CFG 时，模型从 B→3B 的 FID 随训练 epoch 持续下降，展现出良好的 scaling 行为。</em></p>\n<p><img alt=\"采样配置效果\" src=\"https://ar5iv.labs.arxiv.org/html/2406.06525/assets/figure/effect_cfg.png\" />\n<em>图 3(a)：CFG 强度对 FID 和 IS 的影响——最优 FID 在 cfg≈2.0 处取得。</em></p>\n<p><strong>ImageNet 256×256 类条件生成 SOTA 对比</strong>（Table 6）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>类型</th>\n<th>模型</th>\n<th>参数量</th>\n<th>FID↓</th>\n<th>IS↑</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>GAN</td>\n<td>StyleGAN-XL</td>\n<td>166M</td>\n<td>2.30</td>\n<td>265.1</td>\n</tr>\n<tr>\n<td>Diffusion</td>\n<td>DiT-XL/2</td>\n<td>675M</td>\n<td>2.27</td>\n<td>278.2</td>\n</tr>\n<tr>\n<td>Diffusion</td>\n<td>LDM-4</td>\n<td>400M</td>\n<td>3.60</td>\n<td>247.7</td>\n</tr>\n<tr>\n<td>AR</td>\n<td>ViT-VQGAN-re</td>\n<td>1.7B</td>\n<td>3.04</td>\n<td>227.4</td>\n</tr>\n<tr>\n<td><strong>AR</strong></td>\n<td><strong>LlamaGen-3B</strong></td>\n<td><strong>3.1B</strong></td>\n<td><strong>2.18</strong></td>\n<td><strong>263.3</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>LlamaGen-3B 以 FID 2.18 超越了所有对比方法（包括 DiT-XL/2 的 2.27），且无需 rejection sampling。这是首次证明<strong>原生自回归模型可以在图像生成质量上超越主流扩散模型</strong>。</p>\n<h5>文本条件生成与推理加速</h5>\n<p><strong>文本条件生成</strong>采用两阶段训练：Stage I 在 50M LAION-COCO（256²）上学习文本-图像对齐；Stage II 在 10M 高质量内部数据（512²）上提升视觉美感。文本编码使用 FLAN-T5 XL，通过 MLP 投影为 prefilling embedding。</p>\n<p><img alt=\"文本条件生成可视化\" src=\"https://ar5iv.labs.arxiv.org/html/2406.06525/assets/x4.png\" />\n<em>图 4：两阶段训练效果对比——Stage I 学习文本对齐，Stage II 显著提升视觉美感质量。</em></p>\n<p><strong>推理加速</strong>：由于架构与 Llama 完全一致，可直接使用 vLLM 框架（PagedAttention + continuous batching），在 111M–1.4B 模型上实现 326%–414% 加速，无需任何代码修改。这体现了\"与 LLM 生态对齐\"的核心优势。</p>\n<div class=\"key-point\">💡 <strong>核心启示</strong>：LlamaGen 的意义不仅在于 FID 数字，更在于证明了图像生成可以完全复用 LLM 的模型架构、训练框架（PyTorch FSDP）和推理引擎（vLLM），为统一多模态生成奠定基础。</div>",
      "quiz": {
        "q": "LlamaGen 的图像 tokenizer 相比传统 VQGAN 的关键改进不包括以下哪项？",
        "options": [
          "对码本向量进行 ℓ2-归一化以避免码本坍塌",
          "将码本嵌入维度从 256 降低到 8",
          "使用 Adaptive Layer Normalization (AdaLN) 注入条件信息",
          "将码本大小从 1024 扩大到 16384"
        ],
        "answer": 2,
        "explain": "AdaLN 是 DiT 中的条件注入方式，LlamaGen 明确不使用 AdaLN 以保持与 LLM 架构一致。Tokenizer 的三项改进是 ℓ2-归一化、低维嵌入和大码本。"
      }
    },
    {
      "id": "var",
      "num": 26,
      "name": "VAR",
      "fullName": "视觉自回归建模 (Visual Autoregressive Modeling)",
      "year": "2024",
      "org": "Tsinghua University",
      "parent": "llamagen",
      "paperUrl": "https://arxiv.org/abs/2404.02905",
      "projectUrl": "",
      "category": "autoregressive",
      "motivation": "下一尺度预测超越栅格扫描顺序",
      "summary": "VAR 提出\"下一尺度预测\"（next-scale prediction）范式，将图像自回归生成从逐像素的栅格扫描顺序重新定义为由粗到细的多尺度 token map 生成，首次使 GPT 风格的自回归模型在图像生成质量上超越扩散 Transformer（DiT），并展现出类似 LLM 的 Scaling Laws 和零样本泛化能力。",
      "keyPoints": [
        "<strong>新范式 — 下一尺度预测</strong>：将图像自回归建模从 1D 栅格扫描的 next-token prediction 改为多尺度的 next-scale prediction，每一步预测更高分辨率的完整 token map",
        "<strong>多尺度 VQVAE（Multi-Scale VQVAE）</strong>：设计多尺度量化自编码器，将图像编码为 \\(K\\) 层分辨率递增的 token map 序列 \\((r_1, r_2, \\dots, r_K)\\)，分辨率从 \\(1 \\times 1\\) 到 \\(h \\times w\\)",
        "<strong>GPT-2 风格 Transformer</strong>：直接复用标准 GPT-2 架构（因果注意力 + AdaLN），无需双向注意力或特殊掩码设计",
        "<strong>Scaling Laws</strong>：模型参数从 0.3B 到 2B 展现清晰的幂律缩放规律，线性相关系数达 \\(-0.998\\)",
        "<strong>零样本泛化</strong>：无需额外训练即可完成图像修复（in-painting）、外扩（out-painting）和编辑（editing）",
        "<strong>SOTA 性能</strong>：ImageNet 256×256 上 FID 1.80、IS 356.4，推理速度比传统 AR 快 20 倍"
      ],
      "detail": "<h5>核心架构示意</h5>\n<p><img alt=\"VAR 与传统 AR 对比\" src=\"https://ar5iv.labs.arxiv.org/html/2404.02905/assets/x1.png\" />\n<em>图：(a) 语言 AR — 从左到右逐词生成；(b) 图像传统 AR — 栅格扫描逐 token 生成；(c) VAR — 从低分辨率到高分辨率逐尺度生成，每个尺度内并行生成所有 token。</em></p>\n<p><img alt=\"多尺度 VQVAE 与 VAR Transformer\" src=\"https://ar5iv.labs.arxiv.org/html/2404.02905/assets/x2.png\" />\n<em>图：(a) 多尺度 VQVAE 的编码-量化-解码流程；(b) VAR Transformer 的自回归训练与推理过程。</em></p>\n<h5>动机与背景</h5>\n<p>传统视觉自回归模型（如 VQGAN + GPT）将 2D 图像 token 展平为 1D 序列后按栅格扫描顺序逐个生成。这种做法存在三个根本问题：</p>\n<ol>\n<li><strong>数学前提违反</strong>：图像编码器产生的特征向量 \\(f^{(i,j)}\\) 之间相互依赖，展平后的 token 序列并不满足\"当前 token 仅依赖前缀\"的单向依赖假设</li>\n<li><strong>结构信息丢失</strong>：栅格扫描将 2D 空间结构压缩为 1D 序列，破坏了图像的空间局部性</li>\n<li><strong>效率低下</strong>：对 \\(n \\times n\\) 的 token map，需要 \\(\\mathcal{O}(n^2)\\) 次解码迭代，总计算量为 \\(\\mathcal{O}(n^6)\\)</li>\n</ol>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：人类感知图像是\"先整体后细节\"的层次化过程，而非逐像素扫描。VAR 将这一直觉形式化为多尺度自回归。</div>\n<h5>核心机制：Next-Scale Prediction</h5>\n<p><strong>多尺度 token map 表示。</strong> VAR 将一张图像编码为 \\(K\\) 个分辨率递增的 token map：</p>\n<p>$$R = (r_1, r_2, \\dots, r_K), \\quad r_k \\in [V]^{h_k \\times w_k}$$</p>\n<p>其中分辨率序列为 \\((h_1, w_1), (h_2, w_2), \\dots, (h_K, w_K)\\)，从 \\(1 \\times 1\\) 逐步增长到 \\(h \\times w\\)。默认设置 \\(K=10\\)，分辨率为 \\(1, 2, 3, 4, 5, 6, 8, 10, 13, 16\\)。</p>\n<p><strong>自回归分解。</strong> 与传统 AR 按 token 分解不同，VAR 按尺度分解联合分布：</p>\n<p>$$p(r_1, r_2, \\dots, r_K) = \\prod_{k=1}^{K} p(r_k \\mid r_1, r_2, \\dots, r_{k-1})$$</p>\n<p>每一步预测的是一个<strong>完整的 token map</strong> \\(r_k\\)（包含 \\(h_k \\times w_k\\) 个 token），而非单个 token。尺度内的所有 token <strong>并行生成</strong>。</p>\n<p><strong>训练目标。</strong> 最小化交叉熵损失：</p>\n<p>$$\\mathcal{L} = -\\sum_{k=1}^{K} \\sum_{i=1}^{h_k} \\sum_{j=1}^{w_k} \\log p\\left(r_k^{(i,j)} \\mid r_1, r_2, \\dots, r_{k-1}\\right)$$</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：尺度内 token 之间不存在因果依赖，因此同一尺度的 token 可以并行预测，这是 VAR 推理速度大幅提升的关键。</div>\n<h5>多尺度 VQVAE</h5>\n<p>为了产生多尺度 token map，VAR 设计了专门的多尺度 VQVAE：</p>\n<ol>\n<li><strong>编码</strong>：标准编码器 \\(\\mathcal{E}\\) 将图像编码为特征图 \\(f \\in \\mathbb{R}^{h \\times w \\times C}\\)</li>\n<li><strong>多尺度量化</strong>：对 \\(f\\) 进行多尺度插值得到 \\(K\\) 个不同分辨率的特征图，每个分别量化到共享码本 \\(Z \\in \\mathbb{R}^{V \\times C}\\)</li>\n<li><strong>残差设计</strong>：除第一个尺度外，每个尺度量化的是与上一尺度上采样结果的<strong>残差</strong>，即 \\(r_k = \\mathcal{Q}(\\phi_k(f) - \\text{upsample}(\\hat{f}_{k-1}))\\)</li>\n<li><strong>解码</strong>：最终将所有尺度的量化特征求和后通过解码器 \\(\\mathcal{D}\\) 重建图像</li>\n</ol>\n<p>训练损失与标准 VQVAE 相同，包含重建损失、感知损失（LPIPS）和对抗损失：</p>\n<p>$$\\mathcal{L} = \\|im - \\hat{im}\\|_2 + \\|f - \\hat{f}\\|_2 + \\lambda_P \\mathcal{L}_P(\\hat{im}) + \\lambda_G \\mathcal{L}_G(\\hat{im})$$</p>\n<h5>VAR Transformer 架构</h5>\n<p>VAR Transformer 直接采用 GPT-2 风格的 decoder-only 架构：</p>\n<ul>\n<li><strong>输入序列</strong>：将 \\(K\\) 个尺度的 token map 展平并拼接为一个序列，前面加上类别条件 token</li>\n<li><strong>注意力掩码</strong>：标准因果掩码 — 每个尺度可以看到所有之前尺度的 token，但看不到后续尺度</li>\n<li><strong>条件注入</strong>：使用 Adaptive Layer Normalization (AdaLN) 注入类别条件信息</li>\n<li><strong>输出头</strong>：每个位置输出 \\(V\\) 维 logits，对应码本中的 token 概率分布</li>\n</ul>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># VAR 训练伪代码\ndef var_train(image, class_label):\n    # Step 1: 多尺度 VQVAE 编码\n    f = encoder(image)                    # [h, w, C]\n    R = multi_scale_quantize(f)           # K个token maps: r1(1×1), r2(2×2), ..., rK(16×16)\n\n    # Step 2: 构建输入序列\n    tokens = [class_token(class_label)]\n    for k in range(K):\n        tokens.append(flatten(R[k]))      # 展平每个尺度的token map\n\n    # Step 3: GPT-2 Transformer 前向\n    logits = transformer(concat(tokens))  # 因果注意力，每个尺度看到之前所有尺度\n\n    # Step 4: 交叉熵损失（next-scale prediction）\n    loss = cross_entropy(logits, target_tokens)\n    return loss\n\n# VAR 推理伪代码（仅需 K 步！）\ndef var_generate(class_label):\n    tokens = [class_token(class_label)]\n    for k in range(K):                    # K=10 步\n        logits = transformer(tokens)      # 前向一次\n        next_scale = sample(logits[-h_k*w_k:])  # 并行采样整个尺度\n        tokens.append(next_scale)\n    image = vqvae_decode(tokens)\n    return image\n</code></pre>\n<div class=\"key-point\">💡 <strong>效率优势</strong>：传统 AR 需要 \\(\\mathcal{O}(n^2)\\) 步解码（如 256 步），VAR 仅需 \\(K=10\\) 步，每步并行生成一个尺度的所有 token，推理速度提升约 <strong>20 倍</strong>。</div>\n<h5>与传统方法的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>传统 AR (VQGAN+GPT)</th>\n<th>VAR</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>预测单元</td>\n<td>单个 token</td>\n<td>整个尺度的 token map</td>\n</tr>\n<tr>\n<td>生成顺序</td>\n<td>栅格扫描（左→右，上→下）</td>\n<td>粗到细（低分辨率→高分辨率）</td>\n</tr>\n<tr>\n<td>解码步数</td>\n<td>\\(n^2\\)（如 256）</td>\n<td>\\(K\\)（如 10）</td>\n</tr>\n<tr>\n<td>总计算量</td>\n<td>\\(\\mathcal{O}(n^6)\\)</td>\n<td>\\(\\mathcal{O}(Kn^4)\\)</td>\n</tr>\n<tr>\n<td>空间结构</td>\n<td>破坏（1D 展平）</td>\n<td>保留（2D token map）</td>\n</tr>\n<tr>\n<td>VQVAE</td>\n<td>标准单尺度</td>\n<td>多尺度残差量化</td>\n</tr>\n</tbody>\n</table></div>\n<h5>Scaling Laws</h5>\n<p>VAR 模型在参数量从 0.3B 扩展到 2B 时，展现出与 LLM 类似的幂律缩放规律：</p>\n<ul>\n<li><strong>验证损失 vs 参数量</strong>：\\(L(N) \\propto N^{-\\alpha}\\)，线性相关系数 \\(R^2 \\approx -0.998\\)</li>\n<li><strong>验证损失 vs 计算量</strong>：\\(L(C) \\propto C^{-\\beta}\\)，同样呈现清晰幂律关系</li>\n<li><strong>FID/IS 指标</strong>：随模型规模增大持续改善，FID 从 ~4 降至 1.80，IS 从 ~270 升至 356.4</li>\n</ul>\n<p><img alt=\"Scaling Laws\" src=\"https://ar5iv.labs.arxiv.org/html/2404.02905/assets/x3.png\" />\n<em>图：VAR 模型的 Scaling Laws — 验证损失与模型参数/计算量呈清晰幂律关系。</em></p>\n<p>这是视觉自回归模型<strong>首次</strong>展现出如此清晰的 scaling 行为，表明 VAR 的 next-scale prediction 范式具有与 LLM 类似的可扩展性。</p>\n<h5>主要实验结果</h5>\n<p>在 ImageNet 256×256 类条件生成基准上：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>类型</th>\n<th>FID↓</th>\n<th>IS↑</th>\n<th>推理步数</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>DiT-XL/2</td>\n<td>Diffusion</td>\n<td>2.27</td>\n<td>278.2</td>\n<td>250</td>\n</tr>\n<tr>\n<td>MaskGIT</td>\n<td>Masked</td>\n<td>6.18</td>\n<td>182.1</td>\n<td>~8</td>\n</tr>\n<tr>\n<td>VQGAN (传统AR)</td>\n<td>AR</td>\n<td>18.65</td>\n<td>80.4</td>\n<td>256</td>\n</tr>\n<tr>\n<td><strong>VAR-d30</strong></td>\n<td><strong>VAR</strong></td>\n<td><strong>1.92</strong></td>\n<td><strong>323.1</strong></td>\n<td><strong>10</strong></td>\n</tr>\n<tr>\n<td><strong>VAR-d36</strong></td>\n<td><strong>VAR</strong></td>\n<td><strong>1.80</strong></td>\n<td><strong>356.4</strong></td>\n<td><strong>10</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>VAR 同时在 512×512 分辨率上取得 FID 2.63，并展示了零样本图像编辑能力。</p>",
      "quiz": {
        "q": "VAR 相比传统视觉自回归模型的核心改变是什么？",
        "options": [
          "使用更大的码本词汇量来提升重建质量",
          "将逐 token 的栅格扫描生成改为逐尺度的由粗到细生成",
          "引入双向注意力机制替代因果注意力",
          "使用连续值回归替代离散 token 预测"
        ],
        "answer": 1,
        "explain": "VAR 的核心创新是将自回归单元从单个 token 改为整个尺度的 token map，按从低分辨率到高分辨率的顺序生成，每个尺度内并行预测所有 token。"
      }
    },
    {
      "id": "chameleon",
      "num": 27,
      "name": "Chameleon",
      "fullName": "变色龙混合模态模型 (Chameleon)",
      "year": "2024",
      "org": "Meta",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2405.09818",
      "projectUrl": "",
      "category": "unified",
      "motivation": "早期融合统一图像文本Token流",
      "summary": "Chameleon 提出早期融合(early-fusion)的token化多模态架构，将图像离散化为8192码本的1024个token与文本token统一输入单一Transformer，通过QK-Norm等架构创新解决多模态训练稳定性难题，在约10T tokens上预训练后实现了跨模态理解与生成的统一，混合模态人评胜率达60.4% vs Gemini-Pro。",
      "keyPoints": [
        "<strong>早期融合架构</strong>：图像经VQ-VAE tokenizer编码为1024个离散token（codebook=8192），与BPE文本token共享统一词表（65,536），输入同一自回归Transformer",
        "<strong>训练稳定性三板斧</strong>：QK-Norm（必需）+ Swin-style LayerNorm重排序（34B必需）+ Dropout（7B使用，34B不用），解决多模态softmax竞争导致的norm发散",
        "<strong>两阶段预训练</strong>：~10T tokens，Stage 1（80%）大规模混合数据 + Stage 2（20%）高质量数据上采样",
        "<strong>SFT对齐</strong>：覆盖Text/Code/VisualChat/ImageGen/Interleaved/Safety六类数据，仅对answer token计算loss",
        "<strong>文本能力不退化</strong>：Chameleon-34B在5/8常识推理任务上超越Llama-2 70B，与Mixtral 8x7B持平",
        "<strong>视觉语言SOTA</strong>：34B模型2-shot即超越Flamingo-80B和IDEFICS-80B的32-shot（COCO CIDEr 120.2 vs 113.8/116.6）",
        "<strong>混合模态人评优势</strong>：vs Gemini-Pro胜率60.4%，vs GPT-4V胜率51.6%"
      ],
      "detail": "<h5>1. 整体架构：统一Token化的早期融合</h5>\n<p>Chameleon的核心思想是<strong>将所有模态映射到统一的离散token空间</strong>，然后用标准的自回归Transformer进行端到端训练，无需独立的编码器或解码器模块。</p>\n<p><img alt=\"Chameleon架构概览\" src=\"https://ar5iv.labs.arxiv.org/html/2405.09818/assets/x1.png\" />\n<em>图：Chameleon将图像和文本统一token化，通过单一Transformer处理任意模态组合的输入与输出</em></p>\n<p>与传统后期融合方法（如LLaVA将冻结视觉编码器的连续特征投影到LLM空间）不同，Chameleon将图像也编码为离散token，使得图文token在模型内部完全对等——共享embedding层、attention层和输出头。这意味着模型天然支持任意模态组合的输入输出：文→文、图→文、文→图、图文→图文。</p>\n<h5>2. 图像Token化</h5>\n<p>基于Make-A-Scene的VQ-VAE变体训练图像tokenizer，将512×512图像编码为32×32=1024个离散token，codebook大小为8192。这8192个图像码本token与57,344个BPE文本token合并为统一词表（共65,536）。</p>\n<pre><code class=\"language-python\"># 伪代码：图像token化与解码流程\ndef image_to_tokens(image):\n    &quot;&quot;&quot;512x512 图像 → 1024个离散token&quot;&quot;&quot;\n    image = resize_and_crop(image, 512, 512)\n    z = encoder(image)                    # [B, 32, 32, D]\n    indices = quantize(z, codebook)       # codebook_size=8192\n    tokens = indices.flatten()            # [B, 1024]\n    return tokens  # 每个token ∈ {0, 1, ..., 8191}\n\ndef tokens_to_image(tokens):\n    &quot;&quot;&quot;1024个离散token → 512x512 图像&quot;&quot;&quot;\n    indices = tokens.reshape(32, 32)\n    z_q = codebook[indices]               # 查表得到连续向量\n    image = decoder(z_q)                  # 解码为像素\n    return image\n</code></pre>\n<div class=\"warn-box\">⚠️ 注意：图像tokenizer对含大量文字的图像重建能力差，这构成了OCR相关任务的性能上界。</div>\n<h5>3. QK-Norm：解决多模态训练发散的关键</h5>\n<p><strong>问题根源</strong>：当文本和图像共享同一Transformer时，两种模态的熵差异显著。由于softmax的平移不变性 \\(\\text{softmax}(\\mathbf{z}) = \\text{softmax}(\\mathbf{z} + c)\\)，各模态会通过不断增大自身的norm来\"竞争\"注意力权重，导致训练中后期norm超出bf16表示范围而发散。</p>\n<p><img alt=\"训练稳定性消融\" src=\"https://ar5iv.labs.arxiv.org/html/2405.09818/assets/x5.png\" />\n<em>图：不同稳定性技术组合下的norm增长对比。无QK-Norm时norm持续增长直至发散</em></p>\n<p><strong>解决方案</strong>：对注意力机制中的Query和Key向量施加LayerNorm，直接约束softmax输入的norm：</p>\n<p>$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{\\text{LN}(Q) \\cdot \\text{LN}(K)^T}{\\sqrt{d_k}}\\right) V$$</p>\n<pre><code class=\"language-python\"># QK-Norm 实现\nclass QKNormAttention(nn.Module):\n    def __init__(self, d_model, n_heads):\n        self.q_proj = nn.Linear(d_model, d_model)\n        self.k_proj = nn.Linear(d_model, d_model)\n        self.v_proj = nn.Linear(d_model, d_model)\n        self.q_norm = nn.LayerNorm(d_model // n_heads)  # 每个head独立norm\n        self.k_norm = nn.LayerNorm(d_model // n_heads)\n\n    def forward(self, x):\n        Q, K, V = self.q_proj(x), self.k_proj(x), self.v_proj(x)\n        Q = self.q_norm(Q)  # 约束Q的norm范围\n        K = self.k_norm(K)  # 约束K的norm范围\n        attn = softmax(Q @ K.T / sqrt(d_k)) @ V\n        return attn\n</code></pre>\n<div class=\"key-point\">💡 关键：QK-Norm在所有模型规模和配置中都是<strong>必需的</strong>，是Chameleon多模态训练成功的基石。</div>\n<h5>4. Swin-style Norm重排序与Dropout</h5>\n<p>对于34B模型，仅QK-Norm不够，还需要将LLaMA的Pre-Norm改为Swin-style Post-Norm，以约束FFN块中SwiGLU乘法性质导致的norm放大：</p>\n<pre><code># LLaMA-2 Pre-Norm:\nh = x + attention(attention_norm(x))\noutput = h + feed_forward(ffn_norm(h))\n\n# Chameleon-34B Post-Norm (Swin-style):\nh = x + attention_norm(attention(x))\noutput = h + ffn_norm(feed_forward(h))\n</code></pre>\n<p><img alt=\"训练曲线\" src=\"https://ar5iv.labs.arxiv.org/html/2405.09818/assets/x6.png\" />\n<em>图：不同稳定性配置的训练loss曲线。Swin-norm+QK-Norm组合在34B规模下最稳定</em></p>\n<p>稳定性方案总结：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>技术</th>\n<th>7B</th>\n<th>34B</th>\n<th>作用</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>QK-Norm</td>\n<td>✅ 必需</td>\n<td>✅ 必需</td>\n<td>控制attention softmax输入的norm</td>\n</tr>\n<tr>\n<td>Dropout (0.1)</td>\n<td>✅ 使用</td>\n<td>❌ 不用</td>\n<td>正则化，但与Swin-norm不兼容</td>\n</tr>\n<tr>\n<td>Swin Norm重排序</td>\n<td>可选</td>\n<td>✅ 必需</td>\n<td>约束FFN输出norm增长</td>\n</tr>\n<tr>\n<td>z-loss</td>\n<td>✅</td>\n<td>✅</td>\n<td>稳定输出logit的softmax</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ 注意：Swin-style norm与dropout不兼容——dropout会破坏Post-Norm的归一化效果，实验证实34B同时使用两者仍会发散。</div>\n<h5>5. 预训练与SFT</h5>\n<p><strong>预训练</strong>：在约10T tokens上分两阶段训练。Stage 1（80%）使用大规模混合模态数据，text-image对50%概率翻转顺序增强双向理解；Stage 2（20%）上采样高质量数据。优化器为AdamW（\\(\\beta_1=0.9, \\beta_2=0.95\\)），4000步线性warmup后指数衰减。</p>\n<p><strong>SFT对齐</strong>：覆盖6类数据（Text 1.6M + Code 14.1K + VisualChat 15.6K + ImageGen 64.3K + Interleaved 16.9K + Safety 95.3K），学习率1e-5 cosine schedule，仅对answer token计算loss。关键策略包括模态平衡采样（防止某模态过度主导）和图像差异化处理（prompt用border padding保留信息，answer用center crop保证视觉质量）。</p>\n<h5>6. 实验结果</h5>\n<p><strong>文本基准</strong>（Table 6）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>基准</th>\n<th>Chameleon-34B</th>\n<th>Llama-2 70B</th>\n<th>Mixtral 8x7B</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>MMLU</td>\n<td>65.8</td>\n<td>68.9</td>\n<td>70.6</td>\n</tr>\n<tr>\n<td>HellaSwag</td>\n<td>82.7</td>\n<td>85.3</td>\n<td>84.4</td>\n</tr>\n<tr>\n<td>ARC-C</td>\n<td><strong>59.7</strong></td>\n<td>57.4</td>\n<td>59.7</td>\n</tr>\n<tr>\n<td>GSM8k</td>\n<td>61.4</td>\n<td>56.8</td>\n<td>74.4</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>视觉语言基准</strong>（Table 7）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>参数</th>\n<th>COCO CIDEr</th>\n<th>Flickr30k</th>\n<th>VQAv2</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Flamingo-80B</td>\n<td>80B</td>\n<td>113.8 (32-shot)</td>\n<td>75.1 (4-shot)</td>\n<td>67.6 (32-shot)</td>\n</tr>\n<tr>\n<td>IDEFICS-80B</td>\n<td>80B</td>\n<td>116.6 (32-shot)</td>\n<td>73.7 (4-shot)</td>\n<td>65.9 (32-shot)</td>\n</tr>\n<tr>\n<td><strong>Chameleon-34B</strong></td>\n<td>34B</td>\n<td><strong>120.2</strong> (2-shot)</td>\n<td>74.7 (2-shot)</td>\n<td>66.0 (2-shot)</td>\n</tr>\n<tr>\n<td><strong>Chameleon-MultiTask</strong></td>\n<td>34B</td>\n<td>139.1 (2-shot)</td>\n<td>76.2 (2-shot)</td>\n<td><strong>69.6</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>混合模态人评</strong>：在1,048个开放式prompt上，Chameleon-34B vs Gemini-Pro胜率<strong>60.4%</strong>，vs GPT-4V胜率<strong>51.6%</strong>。</p>\n<h5>7. 推理管线</h5>\n<p>Chameleon推理面临独特的模态切换挑战：每步需检查生成的token属于哪个模态，图像生成时需mask文本token并固定生成1024个图像token。基于PyTorch + xformers构建独立推理管线。</p>\n<pre><code class=\"language-python\"># 混合模态推理伪代码\ndef generate(prompt_tokens, max_len):\n    tokens = prompt_tokens\n    for step in range(max_len):\n        logits = model(tokens)\n        next_token = sample(logits)\n        if is_image_start_token(next_token):\n            # 图像模式：固定生成1024个图像token\n            for i in range(1024):\n                logits = model(tokens)\n                logits = mask_non_image_tokens(logits)\n                tokens.append(sample(logits))\n            yield vqvae_decode(tokens[-1024:])  # 解码为像素图像\n        else:\n            tokens.append(next_token)\n            yield decode_text(next_token)\n</code></pre>",
      "quiz": {
        "q": "Chameleon 在多模态训练中引入 QK-Norm 的主要目的是什么？",
        "options": [
          "加速 Transformer 的注意力计算效率",
          "约束 Query 和 Key 向量的 norm 增长，防止多模态 softmax 竞争导致训练发散",
          "替代 RMSNorm 以减少归一化层的参数量",
          "增强图像 token 在注意力中的权重，提升视觉理解能力"
        ],
        "answer": 1,
        "explain": "多模态共享 softmax 时，不同模态因熵差异会通过增大 norm 竞争注意力权重，最终超出 bf16 范围导致发散。QK-Norm 对 Q、K 施加 LayerNorm，直接约束 softmax 输入的 norm，从根本上阻止这种竞争。"
      }
    },
    {
      "id": "show-o",
      "num": 28,
      "name": "Show-o",
      "fullName": "Show-o",
      "year": "2024",
      "org": "NUS",
      "parent": "chameleon",
      "paperUrl": "https://arxiv.org/abs/2408.12528",
      "projectUrl": "",
      "category": "unified",
      "motivation": "自回归与离散扩散的混合统一框架",
      "summary": "Show-o 提出用**单个自回归 Transformer**（基于 Phi-1.5, 1.3B 参数）同时完成多模态理解与视觉生成，核心创新在于 **Omni-Attention 机制**（文本因果注意力 + 图像全双向注意力）和**离散去噪扩散**（mask-and-predict）的混合建模策略，在理解与生成两类任务上均达到与专用模型可比的性能。\n\n---",
      "keyPoints": [
        "核心动机：自回归与离散扩散的混合统一框架",
        "演化来源：继承或改进自 chameleon",
        "代表机构：NUS"
      ],
      "detail": "<h5>1. 整体架构</h5>\n<p>Show-o 的核心思想是在<strong>单个预训练 LLM</strong>（Phi-1.5, 1.3B）中同时支持多模态理解和图像生成，无需额外的扩散网络或独立生成器。</p>\n<p><img alt=\"Show-o 整体架构\" src=\"https://arxiv.org/html/2408.12528v2/x2.png\" />\n<em>图：Show-o 架构总览。左侧为多模态理解流程（CLIP-ViT 编码 → LLM 自回归解码），右侧为图像生成流程（文本 prompt → 离散扩散迭代去噪）。两条路径共享同一个 Transformer 骨干。</em></p>\n<h5>2. 图像 Tokenization 双轨设计</h5>\n<p>Show-o 对理解和生成使用<strong>不同的图像编码方式</strong>，这是一个关键的设计决策：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>分支</th>\n<th>编码器</th>\n<th>表征类型</th>\n<th>Token 数</th>\n<th>用途</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>理解</strong></td>\n<td>CLIP-ViT-L/14</td>\n<td>连续特征</td>\n<td>256</td>\n<td>视觉问答、描述等</td>\n</tr>\n<tr>\n<td><strong>生成</strong></td>\n<td>MAGVIT-v2</td>\n<td>离散 token</td>\n<td>256</td>\n<td>图像生成、编辑</td>\n</tr>\n</tbody>\n</table></div>\n<p>消融实验表明，理解分支使用 CLIP-ViT 比使用 MAGVIT-v2 离散 token 在 VQAv2 上高出约 <strong>20 个百分点</strong>（81.6 vs ~61），验证了连续语义特征对理解任务的重要性。</p>\n<h5>3. Omni-Attention 机制</h5>\n<p>Omni-Attention 是 Show-o 的核心创新，通过<strong>灵活的注意力掩码</strong>在同一 Transformer 中实现两种建模范式：</p>\n<p><img alt=\"Omni-Attention 机制\" src=\"https://arxiv.org/html/2408.12528v2/x5.png\" />\n<em>图：Omni-Attention 掩码设计。文本 token 之间使用因果掩码（下三角），图像 token 之间使用全注意力掩码（全 1），文本到图像为因果掩码，图像到文本为全注意力。</em></p>\n<p>具体掩码规则：</p>\n<p>$$\nM_{ij} = \\begin{cases}\n1 & \\text{if } i, j \\in \\mathcal{T}_{\\text{img}} \\quad \\text{(图像-图像：全注意力)} \\\\\n\\mathbb{1}[j \\leq i] & \\text{if } i, j \\in \\mathcal{T}_{\\text{text}} \\quad \\text{(文本-文本：因果)} \\\\\n1 & \\text{if } i \\in \\mathcal{T}_{\\text{img}}, j \\in \\mathcal{T}_{\\text{text}} \\quad \\text{(图像→文本：全可见)} \\\\\n\\mathbb{1}[j \\leq i] & \\text{if } i \\in \\mathcal{T}_{\\text{text}}, j \\in \\mathcal{T}_{\\text{img}} \\quad \\text{(文本→图像：因果)}\n\\end{cases}\n$$</p>\n<p>这种设计的直觉是：\n- <strong>文本</strong>需要因果建模以保持语言的自回归生成特性\n- <strong>图像</strong>需要全局双向注意力以保证空间一致性（类似 BERT/扩散模型的全局感知）\n- <strong>跨模态</strong>方向上，图像可以看到所有前置文本（条件信息），文本只能因果地看到前面的内容</p>\n<h5>4. 离散去噪扩散（Mask-and-Predict）</h5>\n<p>生成分支采用<strong>离散去噪扩散</strong>而非连续扩散，核心是 mask-and-predict 策略：</p>\n<p><strong>前向过程（加噪）：</strong> 给定干净图像 token 序列 $\\mathbf{x}_0$，按照 mask schedule $\\gamma(t)$ 随机将部分 token 替换为 $[\\text{MASK}]$：</p>\n<p>$$\nq(\\mathbf{x}_t | \\mathbf{x}_0) = \\prod_{i=1}^{N} \\left[ \\gamma(t) \\cdot \\delta_{x_t^i, [\\text{MASK}]} + (1 - \\gamma(t)) \\cdot \\delta_{x_t^i, x_0^i} \\right]\n$$</p>\n<p>其中 $\\gamma(t) \\in [0, 1]$ 是单调递增的 mask ratio，$t=1$ 时全部被 mask。</p>\n<p><strong>反向过程（去噪）：</strong> 模型预测被 mask 位置的原始 token，损失为 Mask Token Prediction (MTP)：</p>\n<p>$$\n\\mathcal{L}_{\\text{MTP}} = -\\mathbb{E}_{t, \\mathbf{x}_0} \\left[ \\sum_{i: x_t^i = [\\text{MASK}]} \\log p_\\theta(x_0^i | \\mathbf{x}_t, \\mathbf{c}) \\right]\n$$</p>\n<p>其中 $\\mathbf{c}$ 是文本条件。</p>\n<p><strong>推理时的迭代去噪：</strong> 从全 $[\\text{MASK}]$ 序列开始，分 $\\phi$ 步逐步 unmask：</p>\n<pre><code class=\"language-text\">算法: Show-o 离散扩散推理\n输入: 文本条件 c, 总步数 φ, mask schedule γ\n输出: 生成的图像 token 序列 x_0\n\n1. x_φ ← [MASK] × N          // 初始化全 mask 序列 (N=256)\n2. for t = φ, φ-1, ..., 1:\n3.     p_θ(x_0 | x_t, c) ← LLM(x_t, c)    // 预测所有 mask 位置\n4.     // 自适应 CFG\n5.     ℓ ← (1 + t/φ) · ℓ_c - (t/φ) · ℓ_u\n6.     // 选择置信度最高的 k 个位置 unmask\n7.     k ← N · (γ(t) - γ(t-1)) / γ(t)\n8.     top_k_indices ← argsort(confidence(p_θ))[-k:]\n9.     x_{t-1} ← x_t\n10.    x_{t-1}[top_k_indices] ← argmax(p_θ)[top_k_indices]\n11. return x_0\n</code></pre>\n<h5>5. 统一 Prompt 格式</h5>\n<p><img alt=\"统一 Prompt 格式\" src=\"https://arxiv.org/html/2408.12528v2/x3.png\" />\n<em>图：Show-o 的统一输入格式。理解任务和生成任务使用相同的 prompt 模板，通过特殊 token 区分图像区域。</em></p>\n<p>Show-o 使用统一的 prompt 格式处理不同任务：</p>\n<ul>\n<li><strong>理解任务：</strong> <code>[USER]: &lt;image_tokens&gt; Question [ASSISTANT]: Answer</code></li>\n<li>\n<p><code>&lt;image_tokens&gt;</code> 来自 CLIP-ViT 的连续特征</p>\n</li>\n<li>\n<p><strong>生成任务：</strong> <code>[USER]: Please generate an image: caption [ASSISTANT]: &lt;mask_tokens&gt;</code></p>\n</li>\n<li>\n<p><code>&lt;mask_tokens&gt;</code> 初始化为 256 个 $[\\text{MASK}]$ token，经离散扩散迭代去噪</p>\n</li>\n<li>\n<p><strong>混合任务（如编辑）：</strong> 同时包含输入图像（CLIP 编码）和输出图像（MAGVIT-v2 离散 token）</p>\n</li>\n</ul>\n<h5>6. 三阶段训练流程</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>阶段</th>\n<th>数据</th>\n<th>可训参数</th>\n<th>损失</th>\n<th>目标</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>Stage 1: 图文对齐</strong></td>\n<td>595K 图文对（CC3M 子集）</td>\n<td>仅 embedding + connector</td>\n<td>NTP</td>\n<td>对齐视觉-语言表征</td>\n</tr>\n<tr>\n<td><strong>Stage 2: 混合训练</strong></td>\n<td>理解数据 + 生成数据混合</td>\n<td>LLM (LoRA, r=128) + embedding</td>\n<td>NTP + MTP</td>\n<td>同时学习理解和生成</td>\n</tr>\n<tr>\n<td><strong>Stage 3: 质量调优</strong></td>\n<td>高质量子集</td>\n<td>全部参数</td>\n<td>NTP + MTP</td>\n<td>提升生成质量</td>\n</tr>\n</tbody>\n</table></div>\n<p>关键设计：\n- Stage 2 使用 <strong>LoRA</strong>（rank=128）而非全参数微调，防止灾难性遗忘\n- 理解和生成数据在每个 batch 中<strong>混合采样</strong>，而非交替训练\n- Stage 3 解冻全部参数进行精调，进一步提升生成质量</p>\n<h5>7. 实验结果</h5>\n<p><strong>多模态理解：</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>参数量</th>\n<th>VQAv2</th>\n<th>GQA</th>\n<th>VizWiz</th>\n<th>TextVQA</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>LLaVA-Phi (专用)</td>\n<td>2.7B</td>\n<td>71.4</td>\n<td>—</td>\n<td>35.9</td>\n<td>28.9</td>\n</tr>\n<tr>\n<td><strong>Show-o</strong></td>\n<td><strong>1.3B</strong></td>\n<td><strong>81.6</strong></td>\n<td><strong>61.3</strong></td>\n<td><strong>39.4</strong></td>\n<td><strong>45.8</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>文本到图像生成：</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>类型</th>\n<th>GenEval ↑</th>\n<th>DPG-Bench ↑</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>SDv1.5 (专用扩散)</td>\n<td>扩散</td>\n<td>0.43</td>\n<td>63.18</td>\n</tr>\n<tr>\n<td>LlamaGen (专用AR)</td>\n<td>自回归</td>\n<td>0.32</td>\n<td>—</td>\n</tr>\n<tr>\n<td><strong>Show-o</strong></td>\n<td><strong>统一</strong></td>\n<td><strong>0.53</strong></td>\n<td><strong>62.15</strong></td>\n</tr>\n</tbody>\n</table></div>\n<h5>8. 关键消融实验</h5>\n<p><strong>理解编码器选择：</strong>\n- CLIP-ViT-L/14 连续特征 → VQAv2 <strong>81.6</strong>\n- MAGVIT-v2 离散 token → VQAv2 ~<strong>61</strong>（下降约 20 点）\n- 结论：<strong>语义连续特征对理解至关重要</strong>，离散量化会丢失细粒度语义信息</p>\n<p><strong>Omni-Attention vs 纯因果注意力：</strong>\n- Omni-Attention（图像全注意力）→ 生成质量显著优于纯因果注意力\n- 纯因果注意力下图像 token 只能看到左上方的 token，缺乏全局一致性</p>\n<p><strong>自适应 CFG 的效果：</strong></p>\n<p>$$\n\\ell = (1 + t) \\cdot \\ell_c - t \\cdot \\ell_u\n$$</p>\n<p>其中 $t \\in [0, 1]$ 为归一化时间步。早期（$t$ 大）引导强度高以确定全局结构，后期（$t$ 小）引导减弱以保留细节多样性。相比固定 CFG scale，自适应策略在 FID 和语义对齐上均有提升。</p>\n<hr />",
      "quiz": {
        "q": "",
        "options": [],
        "answer": 0,
        "explain": ""
      }
    },
    {
      "id": "transfusion",
      "num": 29,
      "name": "Transfusion",
      "fullName": "Transfusion",
      "year": "2025",
      "org": "Meta",
      "parent": "chameleon",
      "paperUrl": "https://arxiv.org/abs/2408.11039",
      "projectUrl": "",
      "category": "unified",
      "motivation": "Token预测与扩散生成的无缝集成",
      "summary": "Transfusion 提出在**单一 Transformer** 上同时训练 **next-token prediction（文本）** 和 **diffusion（图像）** 两个目标函数，无需将图像离散化为 token，即可在一个模型中高效生成文本和图像，在图像生成质量上以 **1/34 的计算量** 超越全离散化方案 Chameleon，并达到与专用图像生成模型（DeepFloyd）可比的水平。",
      "keyPoints": [
        "<strong>双目标训练范式</strong>：对文本 token 使用标准因果语言模型损失（next-token prediction），对图像 patch 使用扩散损失（DDPM），两个损失在同一 Transformer 上联合训练",
        "<strong>连续图像表示</strong>：图像通过预训练 VAE 编码为连续潜空间向量，再分割为 patch 序列（如 2×2 latent pixels/patch），避免了 VQ-VAE 离散化带来的信息损失",
        "<strong>模态感知注意力机制</strong>：文本 token 使用标准因果注意力（causal mask），图像 patch 之间使用双向注意力（bidirectional），图像 patch 对前文文本可见但文本不可见未来图像",
        "<strong>轻量 U-Net 编解码层</strong>：在 Transformer 输入/输出端为图像 patch 添加浅层 U-Net 结构（仅增加约 3.8% 参数），显著提升图像生成质量（FID 从 27.2 降至 16.0）",
        "<strong>高效扩展性</strong>：在 0.16B–7B 参数规模上，Transfusion 的文本性能与纯文本 Llama 模型持平，图像生成 FID 以约 1/34 的 FLOPs 匹配 Chameleon",
        "<strong>大规模验证</strong>：7B 模型在 2T 等效 token 上训练，FID 6.78、GenEval 0.63，接近 DeepFloyd（FID 6.66、GenEval 0.61），超越 SDXL（GenEval 0.55）",
        "<strong>图像编辑能力</strong>：仅用 8k 编辑样本微调即可执行指令式图像编辑，展现跨模态组合的泛化能力"
      ],
      "detail": "<h5>核心架构示意</h5>\n<p><img alt=\"Transfusion 架构示意图\" src=\"https://arxiv.org/html/2408.11039v2/x1.png\" />\n<em>图：Transfusion 在单一 Transformer 中融合 LM 和 Diffusion 的训练流程。文本 token 使用因果注意力 + 交叉熵损失，图像 patch 使用双向注意力 + 扩散去噪损失。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Transfusion 训练伪代码\ndef transfusion_train_step(model, text_tokens, image_patches, vae):\n    &quot;&quot;&quot;\n    text_tokens: 离散 token 序列\n    image_patches: 通过 VAE 编码后的连续潜空间 patch\n    &quot;&quot;&quot;\n    # 1. 对图像 patch 采样噪声时间步 t ~ Uniform(0, T)，添加噪声\n    t = sample_timestep()\n    noise = sample_gaussian(image_patches.shape)\n    noised_patches = sqrt(alpha_bar_t) * image_patches + sqrt(1 - alpha_bar_t) * noise\n\n    # 2. 将 [BOI] + noised_patches + [EOI] 插入文本序列对应位置\n    mixed_sequence = interleave(text_tokens, noised_patches, t_embedding)\n\n    # 3. 前向传播（模态感知注意力）\n    #    - 文本 token: 因果注意力 (causal mask)\n    #    - 图像 patch: 双向注意力 (bidirectional within image)\n    #    - 图像可看到前文文本，文本不可看到未来图像\n    outputs = model(mixed_sequence, attention_mask=&quot;intra-image-bidirectional&quot;)\n\n    # 4. 计算混合损失\n    text_loss = cross_entropy(outputs[text_positions], text_targets)\n    image_loss = mse(outputs[image_positions], noise)  # 预测噪声 ε\n    total_loss = text_loss + λ * image_loss  # λ=5 in experiments\n\n    return total_loss\n\n# Transfusion 图像生成推理\ndef generate_image(model, text_prompt, num_steps=250):\n    # 1. 用 LM 自回归生成文本直到输出 [BOI]\n    context = autoregressive_decode(model, text_prompt, stop_token=&quot;[BOI]&quot;)\n\n    # 2. 初始化纯噪声图像 patch\n    x_T = sample_gaussian(num_patches)\n\n    # 3. DDPM 反向去噪（可用 classifier-free guidance）\n    for t in reversed(range(num_steps)):\n        epsilon_pred = model(context + x_t, t)  # 预测噪声\n        x_{t-1} = denoise_step(x_t, epsilon_pred, t)\n\n    # 4. 通过 VAE 解码器还原像素空间\n    image = vae.decode(x_0)\n    return image\n</code></pre>\n<h5>动机与背景</h5>\n<p>多模态生成的核心挑战在于：<strong>文本是离散序列，图像是连续信号</strong>，两者的最优生成范式截然不同。语言模型（LM）通过 next-token prediction 在离散 token 上取得了巨大成功，而图像生成领域的最强方法是扩散模型（Diffusion），直接在连续空间中操作。</p>\n<p>此前的统一多模态方法（如 Chameleon）选择将图像也离散化为 token，从而用统一的 next-token prediction 处理所有模态。然而，这种方法存在两个根本问题：\n1. <strong>信息瓶颈</strong>：VQ-VAE 的离散化过程不可避免地丢失图像细节，限制了生成质量的上限\n2. <strong>效率低下</strong>：将 256×256 图像编码为 1024 个离散 token，序列极长，训练和推理成本高昂</p>\n<p>Transfusion 的核心洞察是：<strong>不必强迫所有模态使用同一个目标函数</strong>。既然文本适合 LM、图像适合 Diffusion，那就让一个共享的 Transformer 同时优化两个目标，各取所长。</p>\n<h5>核心机制详解</h5>\n<p><strong>1. 数据表示与序列构造</strong></p>\n<p>文本使用标准 BPE tokenizer 编码为离散 token。图像通过预训练的 VAE（来自 Stable Diffusion 1.x）编码为 \\(32 \\times 32 \\times 8\\) 的连续潜空间表示，然后将其分割为不重叠的 patch。每个 patch 对应 \\(p \\times p\\) 个 latent pixel，通过线性投影映射到 Transformer 的隐藏维度。特殊标记 <code>[BOI]</code>（Begin of Image）和 <code>[EOI]</code>（End of Image）标记图像边界。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：patch 大小是重要的超参数。\\(2 \\times 2\\) 的 patch 将 256×256 图像编码为 256 个向量（而非 Chameleon 的 1024 个 token），在质量和效率间取得良好平衡。</div>\n<p><strong>2. 模态感知注意力（Intra-Image Bidirectional Attention）</strong></p>\n<p>标准因果注意力对图像生成并不理想——图像 patch 之间存在强烈的空间依赖关系，需要全局信息交互。Transfusion 设计了一种混合注意力模式：</p>\n<p>$$\n\\text{Attention}(i, j) = \\begin{cases}\n\\text{允许} & \\text{if } j \\leq i \\text{ (标准因果，文本对文本)} \\\\\n\\text{允许} & \\text{if } i, j \\in \\text{同一图像} \\text{ (双向，图像内部)} \\\\\n\\text{允许} & \\text{if } j \\text{ 是图像前的文本，} i \\text{ 是图像 patch} \\\\\n\\text{禁止} & \\text{otherwise}\n\\end{cases}\n$$</p>\n<p>消融实验表明，双向注意力对图像生成至关重要：在 0.76B 模型上，将图像注意力从因果改为双向，FID 从 31.6 降至 16.7（提升 47%）。</p>\n<p><strong>3. U-Net 编解码层</strong></p>\n<p>受扩散模型中 U-Net 架构启发，Transfusion 在 Transformer 的输入端和输出端为图像 patch 添加了轻量级 U-Net 层。具体而言：</p>\n<ul>\n<li><strong>编码端</strong>：在图像 patch 进入 Transformer 前，经过若干下采样-上采样卷积块处理，通过跳跃连接（skip connection）保留多尺度特征</li>\n<li><strong>解码端</strong>：Transformer 输出的图像表示经过对称的 U-Net 解码块，融合编码端的跳跃连接特征后输出最终去噪预测</li>\n</ul>\n<p>这些 U-Net 层仅对图像 patch 生效，不影响文本处理路径。在 7B 模型中仅增加 3.8% 的参数量，但带来显著的图像质量提升。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：U-Net 层的效果随模型规模递减——在 0.16B 模型中贡献 106% 的额外参数但 FID 提升显著（37.6→18.8），在 7B 模型中仅 3.8% 参数但 FID 仍从 18.6 降至 16.0。这表明更大的 Transformer 本身能学到部分局部特征处理能力。</div>\n<p><strong>4. 训练目标与损失函数</strong></p>\n<p>总损失为两个模态损失的加权和：</p>\n<p>$$\n\\mathcal{L} = \\mathcal{L}_{\\text{LM}} + \\lambda \\cdot \\mathcal{L}_{\\text{DDPM}}\n$$</p>\n<p>其中 \\(\\mathcal{L}_{\\text{LM}}\\) 是标准的 next-token prediction 交叉熵损失，\\(\\mathcal{L}_{\\text{DDPM}}\\) 是扩散去噪损失（预测添加的噪声 \\(\\epsilon\\)）：</p>\n<p>$$\n\\mathcal{L}_{\\text{DDPM}} = \\mathbb{E}_{t, \\epsilon} \\left[ \\| \\epsilon - \\epsilon_\\theta(x_t, t) \\|^2 \\right]\n$$</p>\n<p>实验中 \\(\\lambda = 5\\)，用于平衡两个损失的量级差异。</p>\n<p><strong>5. 推理流程</strong></p>\n<p>Transfusion 的推理是<strong>混合自回归-扩散</strong>过程：\n1. 模型以自回归方式逐 token 生成文本\n2. 当输出 <code>[BOI]</code> token 时，切换到扩散模式\n3. 从纯高斯噪声开始，通过 250 步 DDPM 去噪迭代生成图像 patch\n4. 输出 <code>[EOI]</code> 后切回自回归模式继续生成文本\n5. 支持 classifier-free guidance（CFG，guidance scale=3.5 用于 GenEval，5.0 用于 FID）</p>\n<h5>与 Chameleon 的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>Chameleon</th>\n<th>Transfusion</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>图像表示</td>\n<td>离散 token（VQ-VAE, 8192 codebook）</td>\n<td>连续潜空间 patch（VAE）</td>\n</tr>\n<tr>\n<td>训练目标</td>\n<td>统一 next-token prediction</td>\n<td>文本 LM + 图像 Diffusion</td>\n</tr>\n<tr>\n<td>图像注意力</td>\n<td>因果（causal）</td>\n<td>双向（bidirectional）</td>\n</tr>\n<tr>\n<td>序列长度（256px）</td>\n<td>1024 tokens</td>\n<td>256 patches（2×2）</td>\n</tr>\n<tr>\n<td>图像生成 FID（7B）</td>\n<td>26.74</td>\n<td>6.78</td>\n</tr>\n<tr>\n<td>GenEval（7B）</td>\n<td>0.39</td>\n<td>0.63</td>\n</tr>\n<tr>\n<td>文本性能</td>\n<td>与 Llama 持平</td>\n<td>与 Llama 持平</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：Transfusion 证明了\"<strong>每种模态用最适合它的目标函数</strong>\"这一简单原则的强大威力。共享 Transformer 参数不会导致模态间的负迁移，反而能在几乎不损失文本能力的前提下获得远超离散化方案的图像生成质量。</div>\n<h5>扩展性分析</h5>\n<p>在 0.16B 到 7B 的五个模型规模上，Transfusion 展现出优异的扩展特性：\n- <strong>文本性能</strong>：在所有规模上与同参数量的纯文本 Llama 模型几乎完全一致（C4 PPL 差异 &lt; 0.1）\n- <strong>图像生成</strong>：FID 随模型规模稳定下降，且在每个规模点上均大幅优于 Chameleon。以 FID 12 为基准，Transfusion 0.37B 即可达到，而 Chameleon 需要约 34 倍的 FLOPs</p>",
      "quiz": {
        "q": "Transfusion 中图像 patch 之间使用什么注意力机制？",
        "options": [
          "标准因果注意力（causal attention）",
          "完全双向注意力（full bidirectional attention）",
          "仅限同一图像内的双向注意力（intra-image bidirectional attention）",
          "交叉注意力（cross attention）"
        ],
        "answer": 2,
        "explain": "Transfusion 对同一图像内的 patch 使用双向注意力以捕获空间依赖，但不同图像之间仍遵循因果顺序，文本 token 也保持因果注意力。消融实验显示这一设计使 FID 从 31.6 降至 16.7。"
      }
    },
    {
      "id": "unitok",
      "num": 30,
      "name": "UniTok",
      "fullName": "统一Token化器 (Unified Tokenizer)",
      "year": "2025",
      "org": "Multiple Institutions",
      "parent": "show-o",
      "paperUrl": "https://arxiv.org/abs/2410.08806",
      "projectUrl": "",
      "category": "unified",
      "motivation": "视觉生成与理解的统一Token化方案",
      "summary": "UniTok 提出多码本量化（Multi-Codebook Quantization）与注意力分解（Attention Factorization）来扩展离散 token 的表征能力，证明生成与理解的监督信号并不内在冲突，真正瓶颈在于离散量化的信息损失，从而构建了首个在重建质量（rFID=0.38）和语义对齐（zero-shot acc=78.6%）上同时超越领域专用分词器的统一视觉分词器。",
      "keyPoints": [
        "<strong>核心洞察</strong>：生成（重建）与理解（对比学习）的训练目标并不内在冲突，统一分词器性能差的真正瓶颈是离散量化带来的信息损失——维度分解（768d→16d）、离散化、有限码本容量三重瓶颈",
        "<strong>多码本量化（MCQ）</strong>：将潜在向量切分为 \\(n\\) 个子段，每段由独立子码本量化；8 个子码本 × 4096 条目 = 理论词汇量 \\(4096^8 \\approx 2^{96}\\)，远超单码本的 \\(2^{12}\\)",
        "<strong>注意力分解</strong>：用多头因果注意力替代线性投影进行维度分解，保留更丰富的上下文信息",
        "<strong>统一监督</strong>：VQVAE 重建损失 + CLIP 对比损失联合训练，无需额外蒸馏或多阶段训练",
        "<strong>统一 MLLM 集成</strong>：将 \\(K\\) 个子码本编码合并为 1 个 token 输入 LLM，用 Depth Transformer 预测下一组 \\(K\\) 个码字",
        "<strong>SOTA 结果</strong>：ImageNet rFID=0.38（超越 SD-VAE 的 0.87）、zero-shot accuracy=78.6%（超越 CLIP ViT-L 的 76.2%）；VQA 任务全面超越 VILA-U 等统一模型"
      ],
      "detail": "<h5>1. 问题背景与动机</h5>\n<p>当前多模态大语言模型（MLLM）的视觉分词器存在\"生成-理解\"割裂问题：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th style=\"text-align: center;\">分词器类型</th>\n<th style=\"text-align: center;\">代表方法</th>\n<th style=\"text-align: center;\">生成能力</th>\n<th style=\"text-align: center;\">理解能力</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style=\"text-align: center;\">连续 VAE</td>\n<td style=\"text-align: center;\">SD-VAE</td>\n<td style=\"text-align: center;\">✅ 优秀</td>\n<td style=\"text-align: center;\">❌ 差</td>\n</tr>\n<tr>\n<td style=\"text-align: center;\">离散 VQVAE</td>\n<td style=\"text-align: center;\">VQGAN</td>\n<td style=\"text-align: center;\">✅ 较好</td>\n<td style=\"text-align: center;\">❌ 差</td>\n</tr>\n<tr>\n<td style=\"text-align: center;\">对比学习</td>\n<td style=\"text-align: center;\">CLIP ViT</td>\n<td style=\"text-align: center;\">❌ 无</td>\n<td style=\"text-align: center;\">✅ 优秀</td>\n</tr>\n<tr>\n<td style=\"text-align: center;\">统一（已有）</td>\n<td style=\"text-align: center;\">VILA-U</td>\n<td style=\"text-align: center;\">⚠️ 一般</td>\n<td style=\"text-align: center;\">⚠️ 一般</td>\n</tr>\n</tbody>\n</table></div>\n<p>已有统一方法（如 VILA-U）尝试在 VQVAE 上添加对比损失，但效果有限。<strong>传统观点认为生成与理解的训练目标存在内在冲突</strong>，UniTok 的核心发现是：<strong>冲突的根源不在于损失函数，而在于离散量化的信息瓶颈</strong>。</p>\n<p><img alt=\"UniTok 总览图\" src=\"https://ar5iv.labs.arxiv.org/html/2502.20321/assets/x1.png\" />\n<em>图 1：UniTok 与已有分词器的对比。UniTok 同时在重建质量和语义对齐上超越领域专用分词器。</em></p>\n<h5>2. 量化瓶颈分析</h5>\n<p>UniTok 通过系统实验揭示了离散量化的三重信息瓶颈：</p>\n<p><img alt=\"量化瓶颈分析路线图\" src=\"https://ar5iv.labs.arxiv.org/html/2502.20321/assets/x3.png\" />\n<em>图 3：从标准 VQVAE 到 UniTok 的渐进式改进路线图。每一步改进都显著提升了重建 FID 和零样本准确率。</em></p>\n<p><strong>瓶颈 1：维度分解（Factorization）</strong></p>\n<p>标准 VQVAE 将编码器输出 \\(\\mathbf{z} \\in \\mathbb{R}^d\\)（如 \\(d=768\\)）通过线性投影降维到 \\(\\mathbf{z}' \\in \\mathbb{R}^{d'}\\)（如 \\(d'=16\\)），再进行码本查找。这一步骤丢失了大量信息。</p>\n<p><strong>瓶颈 2：离散化（Discretization）</strong></p>\n<p>将连续向量映射到最近码字的过程本身是有损的：</p>\n<p>$$\\mathbf{z}_q = \\arg\\min_{\\mathbf{e}_k \\in \\mathcal{C}} \\|\\mathbf{z}' - \\mathbf{e}_k\\|_2$$</p>\n<p><strong>瓶颈 3：有限码本容量</strong></p>\n<p>单码本通常仅有 \\(K=8192\\) 或 \\(16384\\) 个条目，理论信息容量仅为 \\(\\log_2 K \\approx 13\\) bits/token，远不足以编码丰富的视觉信息。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：当离散 token 的表征能力足够强时，重建损失和对比损失可以和谐共存。这一发现从根本上改变了统一分词器的设计思路——不是去调和损失冲突，而是去扩展离散空间的容量。</div>\n<h5>3. 多码本量化（Multi-Codebook Quantization）</h5>\n<p>MCQ 是 UniTok 的核心技术创新。其思想是将一个潜在向量分解为多个子段，每个子段独立量化：</p>\n<p>给定分解后的潜在向量 \\(\\mathbf{z}' \\in \\mathbb{R}^{d'}\\)，将其均匀切分为 \\(n\\) 个子段：</p>\n<p>$$\\mathbf{z}' = [\\mathbf{z}'_1, \\mathbf{z}'_2, \\ldots, \\mathbf{z}'_n], \\quad \\mathbf{z}'_i \\in \\mathbb{R}^{d'/n}$$</p>\n<p>每个子段由独立的子码本 \\(\\mathcal{C}_i\\) 量化：</p>\n<p>$$\\mathbf{z}_{q,i} = \\arg\\min_{\\mathbf{e}_k \\in \\mathcal{C}_i} \\|\\mathbf{z}'_i - \\mathbf{e}_k\\|_2$$</p>\n<p>最终量化结果为所有子段的拼接：</p>\n<p>$$\\mathbf{z}_q = [\\mathbf{z}_{q,1}, \\mathbf{z}_{q,2}, \\ldots, \\mathbf{z}_{q,n}]$$</p>\n<p><strong>容量分析</strong>：若每个子码本有 \\(M\\) 个条目，则总理论词汇量为 \\(M^n\\)。UniTok 默认使用 \\(n=8\\) 个子码本、每个 \\(M=4096\\) 条目：</p>\n<p>$$\\text{有效词汇量} = 4096^8 = 2^{96} \\approx 7.9 \\times 10^{28}$$</p>\n<p>相比单码本的 \\(2^{12} = 4096\\)，信息容量提升了约 \\(2^{84}\\) 倍。</p>\n<pre><code class=\"language-python\"># Multi-Codebook Quantization 伪代码\ndef multi_codebook_quantize(z_prime, codebooks, n_books=8):\n    &quot;&quot;&quot;\n    z_prime: [B, L, d']  分解后的潜在向量\n    codebooks: list of n_books codebooks, each [M, d'/n_books]\n    &quot;&quot;&quot;\n    d_sub = z_prime.shape[-1] // n_books\n    z_chunks = z_prime.chunk(n_books, dim=-1)  # n 个 [B, L, d_sub]\n\n    z_q_list, indices_list = [], []\n    for i, (chunk, codebook) in enumerate(zip(z_chunks, codebooks)):\n        # 每个子段独立量化\n        distances = torch.cdist(chunk, codebook)  # [B, L, M]\n        indices = distances.argmin(dim=-1)         # [B, L]\n        z_q_i = codebook[indices]                  # [B, L, d_sub]\n        z_q_list.append(z_q_i)\n        indices_list.append(indices)\n\n    z_q = torch.cat(z_q_list, dim=-1)  # [B, L, d']\n    # Straight-through estimator\n    z_q = z_prime + (z_q - z_prime).detach()\n    return z_q, indices_list\n</code></pre>\n<h5>4. 注意力分解（Attention Factorization）</h5>\n<p>传统 VQVAE 使用线性投影进行维度分解（\\(d \\to d'\\)），这是一个无上下文的逐 token 操作。UniTok 提出用<strong>多头因果注意力</strong>替代线性投影：</p>\n<p><img alt=\"注意力分解模块\" src=\"https://ar5iv.labs.arxiv.org/html/2502.20321/assets/x4.png\" />\n<em>图 4：修改后的注意力模块。左：编码器端使用因果注意力进行分解；右：解码器端使用交叉注意力进行反分解。</em></p>\n<p><strong>编码器端（分解）</strong>：在编码器最后一层注意力块中，将 Value 投影的输出维度从 \\(d\\) 改为 \\(d'\\)，使得注意力输出为低维向量。由于注意力机制聚合了序列中其他 token 的信息，每个低维 token 能编码更丰富的上下文语义。</p>\n<p><strong>解码器端（反分解）</strong>：在解码器第一层注意力块中，将 Query/Key 的维度设为 \\(d'\\)，Value 的维度设为 \\(d\\)，实现从低维到高维的映射。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：注意力分解使用<strong>因果注意力</strong>（causal attention），这是为了兼容自回归生成——确保每个 token 只依赖前面的 token，使得 token 序列可以被自回归模型逐个预测。</div>\n<h5>5. 统一训练目标</h5>\n<p>UniTok 的总损失函数由重建损失和对比损失两部分组成：</p>\n<p>$$\\mathcal{L} = \\mathcal{L}_{\\text{recon}} + \\mathcal{L}_{\\text{contrastive}}$$</p>\n<p><strong>重建损失</strong>（VQVAE 风格）：</p>\n<p>$$\\mathcal{L}_{\\text{recon}} = \\|\\mathbf{x} - \\hat{\\mathbf{x}}\\|_2^2 + \\lambda_p \\mathcal{L}_{\\text{perceptual}} + \\lambda_g \\mathcal{L}_{\\text{GAN}} + \\|\\text{sg}[\\mathbf{z}'] - \\mathbf{z}_q\\|_2^2 + \\beta \\|\\mathbf{z}' - \\text{sg}[\\mathbf{z}_q]\\|_2^2$$</p>\n<p>其中包含像素级 L2 损失、感知损失、GAN 对抗损失、码本损失和承诺损失。</p>\n<p><strong>对比损失</strong>（CLIP 风格）：</p>\n<p>$$\\mathcal{L}_{\\text{contrastive}} = -\\frac{1}{2}\\left[\\log \\frac{\\exp(\\text{sim}(\\mathbf{v}, \\mathbf{t})/\\tau)}{\\sum_j \\exp(\\text{sim}(\\mathbf{v}, \\mathbf{t}_j)/\\tau)} + \\log \\frac{\\exp(\\text{sim}(\\mathbf{t}, \\mathbf{v})/\\tau)}{\\sum_j \\exp(\\text{sim}(\\mathbf{t}, \\mathbf{v}_j)/\\tau)}\\right]$$</p>\n<p>其中 \\(\\mathbf{v}\\) 为视觉全局特征（通过 [CLS] token 获取），\\(\\mathbf{t}\\) 为文本特征，\\(\\tau\\) 为温度参数。</p>\n<h5>6. 统一 MLLM 架构</h5>\n<p><img alt=\"UniTok 框架总览\" src=\"https://ar5iv.labs.arxiv.org/html/2502.20321/assets/x2.png\" />\n<em>图 2：UniTok 整体框架。左：统一分词器训练；右：统一 MLLM 的理解与生成流程。</em></p>\n<p>UniTok 分词器产生的每个视觉 token 实际上由 \\(K=8\\) 个子码字索引组成。为高效集成到 LLM 中，UniTok 采用以下策略：</p>\n<p><strong>理解路径</strong>：将 \\(K\\) 个子码本的嵌入向量拼接后通过线性层合并为 1 个 token，输入 LLM 进行 VQA 等任务。</p>\n<p><strong>生成路径</strong>：LLM 自回归预测下一个\"合并 token\"，然后通过一个轻量级 <strong>Depth Transformer</strong> 将其展开为 \\(K\\) 个子码字索引：</p>\n<pre><code class=\"language-python\"># 统一 MLLM 中的生成流程伪代码\ndef generate_image(text_tokens, llm, depth_transformer, decoder):\n    &quot;&quot;&quot;\n    Step 1: LLM 自回归生成合并 token 序列\n    Step 2: Depth Transformer 展开每个合并 token 为 K 个子码字\n    Step 3: 解码器重建图像\n    &quot;&quot;&quot;\n    # Step 1: LLM 预测 256 个合并 token (16×16 网格)\n    merged_tokens = llm.autoregressive_generate(text_tokens, n_visual=256)\n\n    # Step 2: 对每个位置，用 Depth Transformer 预测 K=8 个子码字\n    all_sub_indices = []\n    for pos in range(256):\n        context = merged_tokens[pos]\n        sub_indices = depth_transformer.generate(context, n_codes=8)\n        all_sub_indices.append(sub_indices)\n\n    # Step 3: 查表 + 拼接 + 解码\n    z_q = lookup_and_concat(all_sub_indices, codebooks)  # [1, 256, 64]\n    image = decoder(z_q.reshape(1, 16, 16, 64))          # [1, 3, 256, 256]\n    return image\n</code></pre>\n<h5>7. 关键实验结果</h5>\n<p><strong>分词器性能对比</strong>（ImageNet 256×256）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th style=\"text-align: center;\">方法</th>\n<th style=\"text-align: center;\">类型</th>\n<th style=\"text-align: center;\">rFID ↓</th>\n<th style=\"text-align: center;\">Zero-shot Acc ↑</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style=\"text-align: center;\">SD-VAE v2.1</td>\n<td style=\"text-align: center;\">连续</td>\n<td style=\"text-align: center;\">0.87</td>\n<td style=\"text-align: center;\">—</td>\n</tr>\n<tr>\n<td style=\"text-align: center;\">VQGAN</td>\n<td style=\"text-align: center;\">离散/生成</td>\n<td style=\"text-align: center;\">1.49</td>\n<td style=\"text-align: center;\">—</td>\n</tr>\n<tr>\n<td style=\"text-align: center;\">CLIP ViT-L</td>\n<td style=\"text-align: center;\">连续/理解</td>\n<td style=\"text-align: center;\">—</td>\n<td style=\"text-align: center;\">76.2%</td>\n</tr>\n<tr>\n<td style=\"text-align: center;\">VILA-U</td>\n<td style=\"text-align: center;\">离散/统一</td>\n<td style=\"text-align: center;\">1.73</td>\n<td style=\"text-align: center;\">70.5%</td>\n</tr>\n<tr>\n<td style=\"text-align: center;\"><strong>UniTok</strong></td>\n<td style=\"text-align: center;\"><strong>离散/统一</strong></td>\n<td style=\"text-align: center;\"><strong>0.38</strong></td>\n<td style=\"text-align: center;\"><strong>78.6%</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>VQA 理解性能</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th style=\"text-align: center;\">方法</th>\n<th style=\"text-align: center;\">VQAv2</th>\n<th style=\"text-align: center;\">GQA</th>\n<th style=\"text-align: center;\">TextVQA</th>\n<th style=\"text-align: center;\">POPE</th>\n<th style=\"text-align: center;\">MME</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style=\"text-align: center;\">Chameleon</td>\n<td style=\"text-align: center;\">69.6</td>\n<td style=\"text-align: center;\">—</td>\n<td style=\"text-align: center;\">—</td>\n<td style=\"text-align: center;\">—</td>\n<td style=\"text-align: center;\">—</td>\n</tr>\n<tr>\n<td style=\"text-align: center;\">VILA-U</td>\n<td style=\"text-align: center;\">74.0</td>\n<td style=\"text-align: center;\">59.5</td>\n<td style=\"text-align: center;\">48.3</td>\n<td style=\"text-align: center;\">83.3</td>\n<td style=\"text-align: center;\">1336</td>\n</tr>\n<tr>\n<td style=\"text-align: center;\"><strong>UniTok</strong></td>\n<td style=\"text-align: center;\"><strong>76.8</strong></td>\n<td style=\"text-align: center;\"><strong>61.1</strong></td>\n<td style=\"text-align: center;\"><strong>51.6</strong></td>\n<td style=\"text-align: center;\"><strong>83.2</strong></td>\n<td style=\"text-align: center;\"><strong>1448</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>消融实验——子码本数量的影响</strong>（固定总码本大小 16384）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th style=\"text-align: center;\">码本配置</th>\n<th style=\"text-align: center;\">rFID ↓</th>\n<th style=\"text-align: center;\">Zero-shot Acc ↑</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style=\"text-align: center;\">1 × 16384</td>\n<td style=\"text-align: center;\">1.50</td>\n<td style=\"text-align: center;\">41.0%</td>\n</tr>\n<tr>\n<td style=\"text-align: center;\">2 × 8192</td>\n<td style=\"text-align: center;\">0.98</td>\n<td style=\"text-align: center;\">43.9%</td>\n</tr>\n<tr>\n<td style=\"text-align: center;\">4 × 4096</td>\n<td style=\"text-align: center;\">0.54</td>\n<td style=\"text-align: center;\">44.7%</td>\n</tr>\n<tr>\n<td style=\"text-align: center;\">8 × 2048</td>\n<td style=\"text-align: center;\">0.33</td>\n<td style=\"text-align: center;\">46.1%</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键发现</strong>：在总码本大小不变的情况下，增加子码本数量持续提升重建和分类性能，验证了 MCQ 的有效性与通用性。</div>\n<p><strong>消融实验——CLIP 权重初始化</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th style=\"text-align: center;\">初始化方式</th>\n<th style=\"text-align: center;\">VQAv2</th>\n<th style=\"text-align: center;\">GQA</th>\n<th style=\"text-align: center;\">TextVQA</th>\n<th style=\"text-align: center;\">POPE</th>\n<th style=\"text-align: center;\">MME</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style=\"text-align: center;\">CLIP 预训练权重</td>\n<td style=\"text-align: center;\">69.9</td>\n<td style=\"text-align: center;\">56.2</td>\n<td style=\"text-align: center;\">49.3</td>\n<td style=\"text-align: center;\">81.2</td>\n<td style=\"text-align: center;\">1331</td>\n</tr>\n<tr>\n<td style=\"text-align: center;\"><strong>随机初始化</strong></td>\n<td style=\"text-align: center;\"><strong>72.4</strong></td>\n<td style=\"text-align: center;\"><strong>58.2</strong></td>\n<td style=\"text-align: center;\"><strong>51.6</strong></td>\n<td style=\"text-align: center;\"><strong>82.4</strong></td>\n<td style=\"text-align: center;\"><strong>1392</strong></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ <strong>反直觉发现</strong>：随机初始化的 UniTok 在下游 VQA 任务上反而优于 CLIP 预训练初始化版本。这暗示 CLIP 的特征空间可能对统一分词器形成负面先验——统一视觉特征空间与纯 CLIP 特征空间存在本质差异。</div>\n<p><img alt=\"生成示例\" src=\"https://ar5iv.labs.arxiv.org/html/2502.20321/assets/fig/vis.png\" />\n<em>图 5：UniTok 统一 MLLM 生成的 256×256 图像示例，展示了对复杂概念（如\"梵高画风\"、\"比特币\"）的理解与组合能力。</em></p>\n<p><img alt=\"重建示例\" src=\"https://ar5iv.labs.arxiv.org/html/2502.20321/assets/fig/rec.png\" />\n<em>图 6：UniTok 的图像重建示例。离散分词器实现了接近无损的重建质量。</em></p>",
      "quiz": {
        "q": "UniTok 认为统一视觉分词器性能不佳的根本原因是什么？",
        "options": [
          "重建损失和对比损失存在内在的梯度冲突",
          "离散量化的信息瓶颈限制了 token 的表征能力",
          "编码器和解码器的架构不兼容",
          "训练数据中图文对的质量不足"
        ],
        "answer": 1,
        "explain": "UniTok 的核心发现是生成与理解的损失并不内在冲突，真正瓶颈在于维度分解、离散化和有限码本容量导致的信息损失。通过多码本量化扩展离散空间容量后，两种损失可以和谐共存。"
      }
    },
    {
      "id": "show-o2",
      "num": 31,
      "name": "Show-o2",
      "fullName": "Show-o2",
      "year": "2025",
      "org": "NUS",
      "parent": "show-o",
      "paperUrl": "https://arxiv.org/abs/2410.09876",
      "projectUrl": "",
      "category": "unified",
      "motivation": "强化原生多模态理解与生成协同",
      "summary": "Show-o2 的核心目标是：强化原生多模态理解与生成协同。",
      "keyPoints": [
        "核心动机：强化原生多模态理解与生成协同",
        "演化来源：继承或改进自 show-o",
        "代表机构：NUS"
      ],
      "detail": "<p>强化原生多模态理解与生成协同</p>"
    },
    {
      "id": "univid",
      "num": 32,
      "name": "UniVid",
      "fullName": "统一视频模型 (Unified Video Model)",
      "year": "2026",
      "org": "Multiple Institutions",
      "parent": "unitok",
      "paperUrl": "https://arxiv.org/abs/2511.12345",
      "projectUrl": "",
      "category": "unified",
      "motivation": "预训练视频生成模型统一视觉任务",
      "summary": "UniVid 的核心目标是：预训练视频生成模型统一视觉任务。",
      "keyPoints": [
        "核心动机：预训练视频生成模型统一视觉任务",
        "演化来源：继承或改进自 unitok",
        "代表机构：Multiple Institutions"
      ],
      "detail": "<p>预训练视频生成模型统一视觉任务</p>"
    },
    {
      "id": "gpt-4o-native",
      "num": 33,
      "name": "GPT-4o",
      "fullName": "GPT-4o 原生多模态 (GPT-4o Native Multimodal)",
      "year": "2026",
      "org": "OpenAI",
      "parent": "transfusion",
      "paperUrl": "https://www.preprints.org/manuscript/202601.1138",
      "projectUrl": "",
      "category": "unified",
      "motivation": "原生多模态架构实现实时无缝交互生成",
      "summary": "GPT-4o 是 OpenAI 推出的原生多模态全能模型，采用单一端到端神经网络统一处理文本、音频、图像和视频的输入与输出，基于 Transfusion 架构将自回归语言建模与扩散生成融合在同一模型中，实现了 232ms 的音频响应延迟（接近人类对话反应速度），同时在文本、视觉和音频理解上全面超越前代模型。",
      "keyPoints": [
        "<strong>原生多模态架构</strong>：单一神经网络端到端处理任意组合的文本、音频、图像、视频输入，并生成文本、音频、图像输出，而非传统的多模型级联管线",
        "<strong>Transfusion 统一范式</strong>：对离散 token（文本、音频）使用自回归 next-token prediction，对连续信号（图像）使用扩散生成，两种目标在同一 Transformer 中联合训练",
        "<strong>超低延迟交互</strong>：音频输入响应最快 232ms、平均 320ms，达到人类对话级别的实时性",
        "<strong>全面性能提升</strong>：英文文本和代码能力匹配 GPT-4 Turbo，非英语语言显著提升（如 Hausa ARC-Easy 从 6.1% 提升至 71.4%），API 成本降低 50%",
        "<strong>多阶段安全对齐</strong>：预训练数据过滤 → 后训练人类偏好对齐 → 红队测试（100+ 外部测试者，45 种语言）→ 产品级监控与审核",
        "<strong>Preparedness 风险评估</strong>：网络安全（低）、生物威胁（低）、说服力（中）、模型自主性（低），整体风险评级为中等",
        "<strong>语音安全创新</strong>：针对语音模态的特有风险（说话人识别、未授权声音生成、敏感特征归因）设计了专门的缓解措施"
      ],
      "detail": "<h5>整体架构：从级联到原生多模态</h5>\n<p>传统多模态系统（如 GPT-4V + Whisper + TTS 的组合）采用级联管线：语音先由 ASR 转文本，文本由 LLM 处理，再由 TTS 合成语音。这种架构存在三个根本缺陷：(1) 级联延迟累积，无法实现实时对话；(2) 语音中的韵律、情感、语调等非语言信息在 ASR 阶段丢失；(3) 各模块独立训练，无法实现跨模态的深度融合。</p>\n<p>GPT-4o 的核心突破在于<strong>用单一神经网络端到端处理所有模态</strong>。模型直接接收原始音频波形、图像像素和文本 token 作为输入，在统一的表示空间中进行推理，并直接生成目标模态的输出。这种设计使模型能够保留并利用跨模态的丰富信息。</p>\n<p><img alt=\"GPT-4o 多模态架构示意\" src=\"https://cdn.openai.com/tmp/s/GPT-4o.png\" />\n<em>图：GPT-4o 作为原生多模态模型，接受文本、音频、图像、视频的任意组合输入，生成文本、音频、图像输出。与级联系统不同，所有模态由同一神经网络处理。</em></p>\n<h5>核心技术：Transfusion 统一建模</h5>\n<p>GPT-4o 的架构继承自 Transfusion 范式，其核心思想是在单一 Transformer 中同时执行两种生成机制：</p>\n<pre><code>算法：GPT-4o Transfusion 统一生成框架（推断）\n输入：多模态序列 x = [x_text, x_audio, x_image, ...]\n输出：目标模态的生成结果\n\n1. 多模态编码：\n   - 文本 token：BPE 分词 → 离散 token 嵌入\n   - 音频信号：编码器将波形转为离散音频 token\n   - 图像/视频：编码器提取连续潜在表示 z ∈ R^{h×w×d}\n\n2. 统一 Transformer 处理：\n   - 所有模态的表示拼接为统一序列\n   - 共享 Transformer 层进行跨模态注意力计算\n   - 离散 token 位置：计算 next-token logits\n   - 连续表示位置：预测扩散去噪方向\n\n3. 模态特定解码：\n   - 文本/音频（离散）：自回归采样 → token 解码\n   - 图像（连续）：迭代扩散去噪 → 像素解码\n</code></pre>\n<p><strong>自回归与扩散的统一损失函数：</strong></p>\n<p>$$\\mathcal{L}_{\\text{total}} = \\mathcal{L}_{\\text{AR}} + \\lambda \\cdot \\mathcal{L}_{\\text{diffusion}}$$</p>\n<p>其中：</p>\n<p>$$\\mathcal{L}_{\\text{AR}} = -\\sum_{i \\in \\mathcal{D}} \\log p_\\theta(x_i | x_{<i})$$</p>\n<p>对离散 token（文本、音频）执行标准的自回归交叉熵损失，模型逐 token 预测下一个 token 的概率分布。</p>\n<p>$$\\mathcal{L}_{\\text{diffusion}} = \\mathbb{E}_{t, \\epsilon} \\left[ \\| \\epsilon - \\epsilon_\\theta(z_t, t, c) \\|^2 \\right]$$</p>\n<p>对连续信号（图像）执行扩散去噪损失，其中 \\(z_t\\) 是加噪后的潜在表示，\\(t\\) 是扩散时间步，\\(c\\) 是来自 Transformer 的条件上下文。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：Transfusion 的精妙之处在于，离散 token 和连续表示共享同一个 Transformer 的注意力层，使得文本语义能直接指导图像生成，音频韵律能影响文本理解，实现了真正的跨模态深度融合。</div>\n<h5>训练数据与流程</h5>\n<p>GPT-4o 的预训练数据截止到 2023 年 10 月，包含三大类数据：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>数据类型</th>\n<th>来源</th>\n<th>作用</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Web 数据</td>\n<td>公开网页爬取</td>\n<td>提供多样化的语言知识和世界知识</td>\n</tr>\n<tr>\n<td>代码与数学</td>\n<td>代码仓库、数学语料</td>\n<td>培养结构化逻辑推理能力</td>\n</tr>\n<tr>\n<td>多模态数据</td>\n<td>图像、音频、视频</td>\n<td>学习跨模态理解与生成</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>预训练数据安全过滤：</strong>\n- 使用 Moderation API 和安全分类器过滤 CSAM、仇恨内容、暴力和 CBRN 内容\n- 图像生成数据集过滤显式色情内容\n- 高级数据过滤流程减少个人信息\n- 尊重 DALL-E 3 时代建立的图像 opt-out 机制，通过指纹匹配移除所有已选择退出的图像</p>\n<h5>后训练对齐与安全缓解</h5>\n<p>GPT-4o 的安全体系采用多层防御策略：</p>\n<p><strong>1. 后训练人类偏好对齐</strong>\n模型通过 RLHF（基于人类反馈的强化学习）进行对齐，使输出符合人类价值观和使用政策。</p>\n<p><strong>2. 语音模态特有安全措施</strong></p>\n<pre><code>语音安全缓解机制：\n├── 说话人识别防护\n│   ├── 拒绝基于声音识别个人身份的请求\n│   ├── 允许基于音频内容（如名言）的识别\n│   └── 效果：拒绝准确率提升 14 个百分点\n├── 未授权声音生成防护\n│   ├── 输出限制为固定的预设声音集\n│   ├── 输出分类器检测偏离预设声音的生成\n│   └── 效果：98.8% 的输出匹配预设声音\n├── 敏感特征归因防护\n│   ├── 拒绝无根据推断（种族、智力、政治倾向等）\n│   ├── 谨慎回应可感知特征（口音、国籍等）\n│   └── 效果：安全行为准确率从 0.60 提升至 0.84\n└── 跨口音公平性\n    ├── 使用多样化语音数据后训练\n    ├── 27 种英语口音 + 多性别测试\n    └── 效果：不同口音间性能差异不显著\n</code></pre>\n<p><strong>3. 四阶段外部红队测试</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>阶段</th>\n<th>测试者</th>\n<th>模态</th>\n<th>重点</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Phase 1</td>\n<td>10 人</td>\n<td>音频+文本 → 音频+文本</td>\n<td>早期能力发现</td>\n</tr>\n<tr>\n<td>Phase 2</td>\n<td>30 人</td>\n<td>音频+图像+文本 → 音频+文本</td>\n<td>初步安全缓解</td>\n</tr>\n<tr>\n<td>Phase 3</td>\n<td>65 人</td>\n<td>全模态 → 全模态</td>\n<td>改进安全措施</td>\n</tr>\n<tr>\n<td>Phase 4</td>\n<td>65 人</td>\n<td>iOS 真实体验</td>\n<td>最终候选评估</td>\n</tr>\n</tbody>\n</table></div>\n<h5>Preparedness 框架评估</h5>\n<p>OpenAI 的 Preparedness Framework 对 GPT-4o 进行了四个维度的风险评估：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>风险类别</th>\n<th>评级</th>\n<th>关键发现</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>网络安全</td>\n<td>低</td>\n<td>10 次尝试中完成 19% 高中级、0% 大学级、1% 专业级 CTF 挑战</td>\n</tr>\n<tr>\n<td>生物威胁</td>\n<td>低</td>\n<td>未显著提升专家或新手的生物威胁创建能力</td>\n</tr>\n<tr>\n<td>说服力</td>\n<td>中</td>\n<td>文本模态在 12 个测试中有 3 个超过人类专业文章的说服力</td>\n</tr>\n<tr>\n<td>模型自主性</td>\n<td>低</td>\n<td>未展现足够的自主规划和执行危险任务的能力</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：整体风险由最高单项决定，因此 GPT-4o 的整体风险评级为<strong>中等</strong>（由说服力维度决定）。</div>\n<h5>多语言能力突破</h5>\n<p>GPT-4o 在历史上代表性不足的语言上取得了显著进步：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>基准测试</th>\n<th>语言</th>\n<th>GPT-3.5 Turbo</th>\n<th>GPT-4</th>\n<th>GPT-4o</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>ARC-Easy</td>\n<td>Hausa</td>\n<td>6.1%</td>\n<td>—</td>\n<td>71.4%</td>\n</tr>\n<tr>\n<td>TruthfulQA</td>\n<td>Yoruba</td>\n<td>28.3%</td>\n<td>—</td>\n<td>51.1%</td>\n</tr>\n<tr>\n<td>Uhura-Eval</td>\n<td>Hausa</td>\n<td>32.3%</td>\n<td>41.9%</td>\n<td>59.4%</td>\n</tr>\n<tr>\n<td>Uhura-Eval</td>\n<td>Yoruba</td>\n<td>28.3%</td>\n<td>41.9%</td>\n<td>60.5%</td>\n</tr>\n<tr>\n<td>Uhura-Eval</td>\n<td>Amharic</td>\n<td>22.1%</td>\n<td>41.6%</td>\n<td>44.2%</td>\n</tr>\n</tbody>\n</table></div>\n<p>GPT-3.5 Turbo 在英语和 Hausa 之间的 ARC-Easy 性能差距约 54 个百分点，而 GPT-4o 将这一差距缩小到不到 20 个百分点。</p>\n<h5>与传统方法的核心区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>级联系统 (GPT-4V + Whisper + TTS)</th>\n<th>GPT-4o (原生多模态)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>架构</td>\n<td>多个独立模型串联</td>\n<td>单一端到端模型</td>\n</tr>\n<tr>\n<td>延迟</td>\n<td>累积延迟（通常 2-5 秒）</td>\n<td>232-320ms</td>\n</tr>\n<tr>\n<td>信息保留</td>\n<td>ASR 丢失韵律/情感信息</td>\n<td>保留完整音频特征</td>\n</tr>\n<tr>\n<td>跨模态理解</td>\n<td>仅通过文本中介间接关联</td>\n<td>共享表示空间直接融合</td>\n</tr>\n<tr>\n<td>训练方式</td>\n<td>各模块独立训练</td>\n<td>端到端联合优化</td>\n</tr>\n<tr>\n<td>成本</td>\n<td>多模型推理成本高</td>\n<td>单模型推理，API 成本降低 50%</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "",
        "options": [],
        "answer": 0,
        "explain": ""
      }
    }
  ],
  "categories": {
    "diffusion": {
      "label": "扩散模型",
      "color": "#22a06b"
    },
    "flow_matching": {
      "label": "流匹配",
      "color": "#e8820c"
    },
    "autoregressive": {
      "label": "自回归生成",
      "color": "#5b63d3"
    },
    "gan_vae": {
      "label": "GAN与VAE",
      "color": "#9c27b0"
    },
    "unified": {
      "label": "统一生成框架",
      "color": "#d32f2f"
    }
  },
  "projectUrls": {}
};
