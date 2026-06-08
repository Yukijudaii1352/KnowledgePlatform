/**
 * omni-data.js — 由 pipeline/build.py 于 2026-06-08 12:12:05 自动生成。
 * 源文件：content/mm/omni.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "multimodal",
    "topic_id": "omni",
    "topic_name": "Omni模型技术演进总结",
    "page_title": "Omni模型技术演进总结",
    "page_subtitle": "2026-06-08 版",
    "page_desc": "全模态统一处理技术的发展脉络，涵盖文本/图像/视频/音频的Any-to-Any交互",
    "page_icon": "🌐",
    "hero_pills": [
      "🏷️ Omni-Modal · Any-to-Any · Foundation Models"
    ],
    "count_pill": "{count} 个算法",
    "image_base": "../../content/mm/omni/assets/",
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
        "id": "ofa",
        "x": 100,
        "y": 100,
        "category": "unified_seq2seq"
      },
      {
        "id": "unified-io",
        "x": 120,
        "y": 100,
        "category": "unified_seq2seq"
      },
      {
        "id": "uni-perceiver-v2",
        "x": 200,
        "y": 100,
        "category": "unified_seq2seq"
      },
      {
        "id": "unival",
        "x": 220,
        "y": 100,
        "category": "unified_seq2seq"
      },
      {
        "id": "speecht5",
        "x": 100,
        "y": 150,
        "category": "unified_seq2seq"
      },
      {
        "id": "lauragpt",
        "x": 200,
        "y": 150,
        "category": "unified_seq2seq"
      },
      {
        "id": "unified-io-2",
        "x": 300,
        "y": 200,
        "category": "autoregressive"
      },
      {
        "id": "anygpt",
        "x": 300,
        "y": 250,
        "category": "autoregressive"
      },
      {
        "id": "emu3",
        "x": 320,
        "y": 250,
        "category": "autoregressive"
      },
      {
        "id": "chameleon",
        "x": 340,
        "y": 250,
        "category": "autoregressive"
      },
      {
        "id": "show-o",
        "x": 360,
        "y": 250,
        "category": "autoregressive"
      },
      {
        "id": "audiopalm",
        "x": 200,
        "y": 300,
        "category": "encoder_llm_decoder"
      },
      {
        "id": "qwen-audio",
        "x": 220,
        "y": 300,
        "category": "encoder_llm_decoder"
      },
      {
        "id": "next-gpt",
        "x": 200,
        "y": 350,
        "category": "encoder_llm_decoder"
      },
      {
        "id": "onellm",
        "x": 300,
        "y": 350,
        "category": "encoder_llm_decoder"
      },
      {
        "id": "imagebind",
        "x": 200,
        "y": 400,
        "category": "encoder_llm_decoder"
      },
      {
        "id": "meta-transformer",
        "x": 220,
        "y": 400,
        "category": "encoder_llm_decoder"
      },
      {
        "id": "languagebind",
        "x": 300,
        "y": 400,
        "category": "encoder_llm_decoder"
      },
      {
        "id": "codi",
        "x": 200,
        "y": 500,
        "category": "diffusion_fusion"
      },
      {
        "id": "codi-2",
        "x": 300,
        "y": 500,
        "category": "diffusion_fusion"
      },
      {
        "id": "omniflow",
        "x": 400,
        "y": 500,
        "category": "diffusion_fusion"
      },
      {
        "id": "gpt-4o",
        "x": 300,
        "y": 600,
        "category": "native_e2e"
      },
      {
        "id": "gemini-1.5",
        "x": 320,
        "y": 600,
        "category": "native_e2e"
      },
      {
        "id": "llama-4-scout",
        "x": 400,
        "y": 600,
        "category": "native_e2e"
      },
      {
        "id": "janus-pro",
        "x": 400,
        "y": 700,
        "category": "frontier_2026"
      },
      {
        "id": "minicpm-o",
        "x": 500,
        "y": 650,
        "category": "frontier_2026"
      },
      {
        "id": "qwen3.5-omni",
        "x": 520,
        "y": 650,
        "category": "frontier_2026"
      },
      {
        "id": "omni-diffusion",
        "x": 500,
        "y": 700,
        "category": "frontier_2026"
      },
      {
        "id": "nemotron-3-nano",
        "x": 540,
        "y": 650,
        "category": "frontier_2026"
      },
      {
        "id": "gpt-5.5-instant",
        "x": 560,
        "y": 650,
        "category": "frontier_2026"
      }
    ],
    "edges": [
      {
        "from": "ofa",
        "to": "unified-io",
        "label": "任务扩展"
      },
      {
        "from": "ofa",
        "to": "uni-perceiver-v2",
        "label": "视觉增强"
      },
      {
        "from": "ofa",
        "to": "unival",
        "label": "轻量化"
      },
      {
        "from": "unified-io",
        "to": "unified-io-2",
        "label": "自回归化"
      },
      {
        "from": "speecht5",
        "to": "audiopalm",
        "label": "LLM融合"
      },
      {
        "from": "speecht5",
        "to": "lauragpt",
        "label": "端到端"
      },
      {
        "from": "audiopalm",
        "to": "qwen-audio",
        "label": "规模扩展"
      },
      {
        "from": "anygpt",
        "to": "emu3",
        "label": "纯Token化"
      },
      {
        "from": "anygpt",
        "to": "chameleon",
        "label": "早期融合"
      },
      {
        "from": "chameleon",
        "to": "show-o",
        "label": "混合建模"
      },
      {
        "from": "chameleon",
        "to": "janus-pro",
        "label": "解耦编码"
      },
      {
        "from": "show-o",
        "to": "omni-diffusion",
        "label": "扩散统一"
      },
      {
        "from": "next-gpt",
        "to": "onellm",
        "label": "模态扩展"
      },
      {
        "from": "imagebind",
        "to": "meta-transformer",
        "label": "编码统一"
      },
      {
        "from": "imagebind",
        "to": "languagebind",
        "label": "语言中心"
      },
      {
        "from": "codi",
        "to": "codi-2",
        "label": "交错生成"
      },
      {
        "from": "codi-2",
        "to": "omniflow",
        "label": "修正流"
      },
      {
        "from": "gpt-4o",
        "to": "gemini-1.5",
        "label": "MoE架构"
      },
      {
        "from": "gpt-4o",
        "to": "minicpm-o",
        "label": "全双工"
      },
      {
        "from": "gpt-4o",
        "to": "nemotron-3-nano",
        "label": "智能体优化"
      },
      {
        "from": "gpt-4o",
        "to": "gpt-5.5-instant",
        "label": "可靠性强化"
      },
      {
        "from": "gemini-1.5",
        "to": "qwen3.5-omni",
        "label": "双核架构"
      },
      {
        "from": "gemini-1.5",
        "to": "llama-4-scout",
        "label": "开源MoE"
      }
    ],
    "milestones": [
      "ofa",
      "gpt-4o",
      "qwen3.5-omni"
    ]
  },
  "algos": [
    {
      "id": "ofa",
      "num": 1,
      "name": "OFA",
      "fullName": "统一架构模型 (One For All)",
      "year": "2022",
      "org": "阿里达摩院",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2202.03052",
      "projectUrl": "",
      "category": "unified_seq2seq",
      "motivation": "架构/模态/任务三统一的Seq2Seq",
      "summary": "OFA 的核心目标是：架构/模态/任务三统一的Seq2Seq。",
      "keyPoints": [
        "核心动机：架构/模态/任务三统一的Seq2Seq",
        "代表机构：阿里达摩院"
      ],
      "detail": "<p>架构/模态/任务三统一的Seq2Seq</p>"
    },
    {
      "id": "unified-io",
      "num": 2,
      "name": "Unified-IO",
      "fullName": "统一输入输出模型 (Unified-IO)",
      "year": "2022",
      "org": "Allen AI",
      "parent": "ofa",
      "paperUrl": "https://arxiv.org/abs/2206.08916",
      "projectUrl": "",
      "category": "unified_seq2seq",
      "motivation": "首个处理95种视觉语言任务",
      "summary": "Unified-IO 的核心目标是：首个处理95种视觉语言任务。",
      "keyPoints": [
        "核心动机：首个处理95种视觉语言任务",
        "演化来源：继承或改进自 ofa",
        "代表机构：Allen AI"
      ],
      "detail": "<p>首个处理95种视觉语言任务</p>"
    },
    {
      "id": "unified-io-2",
      "num": 3,
      "name": "Unified-IO 2",
      "fullName": "统一输入输出模型第二代 (Unified-IO 2)",
      "year": "2024",
      "org": "Allen AI",
      "parent": "unified-io",
      "paperUrl": "https://openaccess.thecvf.com/content/CVPR2024/html/Lu_Unified-IO_2_Scaling_Autoregressive_Multimodal_Models_with_Vision_Language_Audio_CVPR_2024_paper.html",
      "projectUrl": "",
      "category": "autoregressive",
      "motivation": "Any-to-Any自回归统一模型",
      "summary": "Unified-IO 2 的核心目标是：Any-to-Any自回归统一模型。",
      "keyPoints": [
        "核心动机：Any-to-Any自回归统一模型",
        "演化来源：继承或改进自 unified-io",
        "代表机构：Allen AI"
      ],
      "detail": "<p>Any-to-Any自回归统一模型</p>"
    },
    {
      "id": "uni-perceiver-v2",
      "num": 4,
      "name": "Uni-Perceiver v2",
      "fullName": "通用感知器第二代 (Uni-Perceiver v2)",
      "year": "2023",
      "org": "商汤/清华",
      "parent": "ofa",
      "paperUrl": "https://openaccess.thecvf.com/content/CVPR2023/html/Li_Uni-Perceiver_v2_A_Generalist_Model_for_Large-Scale_Vision_and_Vision-Language_CVPR_2023_paper.html",
      "projectUrl": "",
      "category": "unified_seq2seq",
      "motivation": "通用视觉-语言统一建模",
      "summary": "Uni-Perceiver v2 的核心目标是：通用视觉-语言统一建模。",
      "keyPoints": [
        "核心动机：通用视觉-语言统一建模",
        "演化来源：继承或改进自 ofa",
        "代表机构：商汤/清华"
      ],
      "detail": "<p>通用视觉-语言统一建模</p>"
    },
    {
      "id": "unival",
      "num": 5,
      "name": "UniVal",
      "fullName": "统一价值模型 (UniVal)",
      "year": "2023",
      "org": "Sorbonne",
      "parent": "ofa",
      "paperUrl": "https://arxiv.org/abs/2307.16184",
      "projectUrl": "",
      "category": "unified_seq2seq",
      "motivation": "四模态轻量统一模型",
      "summary": "UniVal 的核心目标是：四模态轻量统一模型。",
      "keyPoints": [
        "核心动机：四模态轻量统一模型",
        "演化来源：继承或改进自 ofa",
        "代表机构：Sorbonne"
      ],
      "detail": "<p>四模态轻量统一模型</p>"
    },
    {
      "id": "speecht5",
      "num": 6,
      "name": "SpeechT5",
      "fullName": "语音T5模型 (SpeechT5)",
      "year": "2022",
      "org": "Microsoft",
      "parent": "—",
      "paperUrl": "https://aclanthology.org/2022.acl-long.393/",
      "projectUrl": "",
      "category": "unified_seq2seq",
      "motivation": "语音-文本统一预训练框架",
      "summary": "SpeechT5 提出了一个统一的编码器-解码器预训练框架，通过共享的 Transformer 骨干网络和模态特定的前/后处理网络，将语音和文本任务统一为序列到序列的格式，并利用跨模态向量量化（Cross-Modal VQ）对齐语音与文本的隐空间表示，在 ASR、TTS、语音翻译、声音转换、语音增强和说话人识别等 6 项任务上均取得了显著提升。",
      "keyPoints": [
        "<strong>统一编码器-解码器架构</strong>：共享的 12 层 Transformer 编码器 + 6 层 Transformer 解码器，配合 6 个模态特定的前/后处理网络（speech/text 各 3 个），将所有语音-文本任务统一为 seq2seq 格式",
        "<strong>跨模态向量量化（Cross-Modal VQ）</strong>：利用共享码本将语音和文本的连续表示离散化，通过随机混合语音/文本的潜在单元实现跨模态对齐，作为编码器与解码器之间的信息瓶颈",
        "<strong>多任务预训练</strong>：联合使用语音 MLM 损失、语音 seq2seq 重建损失（L1 + BCE）、文本 MLM 损失和 VQ 多样性损失进行预训练",
        "<strong>预训练数据</strong>：LibriSpeech 960 小时语音 + LibriSpeech LM 文本语料（约 4000 万句）",
        "<strong>6 项下游任务全面验证</strong>：ASR（WER 5.8%）、TTS（MOS 3.65）、语音翻译（BLEU 35.30）、声音转换（MCD 5.87）、语音增强（WER 8.9%）、说话人识别",
        "<strong>消融实验</strong>：语音预训练贡献最大；联合语音-文本预训练对跨模态任务有显著增益；MLM 损失有助于语音表示学习"
      ],
      "detail": "<h5>框架总览</h5>\n<p><img alt=\"SpeechT5 框架总览\" src=\"https://ar5iv.labs.arxiv.org/html/2110.07205/assets/x1.png\" />\n<em>图 1：SpeechT5 框架示意图。所有语音-文本任务被统一为 speech/text → speech/text 的序列到序列格式，包括 ASR、TTS、ST、VC、SE 和 SID。</em></p>\n<p>SpeechT5 的核心思想来源于 NLP 领域的 T5（Text-to-Text Transfer Transformer）：<strong>将所有任务统一为同一种输入-输出格式</strong>。在语音领域，这意味着将 ASR（语音→文本）、TTS（文本→语音）、VC（语音→语音）、ST（语音→文本）等任务全部视为序列到序列的转换问题。</p>\n<div class=\"key-point\">💡 <strong>关键动机</strong>：此前的语音预训练工作（如 wav2vec 2.0、HuBERT）存在两个问题：(1) 仅使用语音数据预训练，忽略了文本信息对跨模态任务的重要性；(2) 仅预训练编码器，解码器未经预训练，不利于生成类任务。SpeechT5 同时解决了这两个问题。</div>\n<h5>模型架构</h5>\n<p>SpeechT5 由三部分组成：<strong>共享编码器-解码器骨干</strong> + <strong>模态特定前处理网络（Pre-net）</strong> + <strong>模态特定后处理网络（Post-net）</strong>。</p>\n<pre><code>输入 ──→ [Pre-net] ──→ [共享 Encoder (12L)] ──→ [Cross-Modal VQ] ──→ [共享 Decoder (6L)] ──→ [Post-net] ──→ 输出\n         ↑ 模态特定                                  ↑ 跨模态对齐                                ↑ 模态特定\n</code></pre>\n<p><strong>共享编码器-解码器</strong>：\n- 编码器：12 层 Transformer，隐藏维度 768，FFN 维度 3072，12 个注意力头（与 wav2vec 2.0 Base / HuBERT Base 编码器配置一致）\n- 解码器：6 层 Transformer，配置与编码器相同</p>\n<p><strong>6 个模态特定网络</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>网络</th>\n<th>结构</th>\n<th>功能</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>语音编码器 Pre-net</td>\n<td>7 层时序卷积（来自 wav2vec 2.0），512 通道，步长 (5,2,2,2,2,2,2)，核大小 (10,3,3,3,3,2,2)</td>\n<td>将原始波形下采样为特征序列</td>\n</tr>\n<tr>\n<td>语音解码器 Pre-net</td>\n<td>3 层全连接 + ReLU</td>\n<td>将 log Mel 滤波器组特征映射到隐空间</td>\n</tr>\n<tr>\n<td>语音解码器 Post-net</td>\n<td>线性层 + 5 层 1D 卷积（残差细化）+ 停止标记预测头</td>\n<td>从解码器输出生成 Mel 频谱</td>\n</tr>\n<tr>\n<td>文本编码器 Pre-net</td>\n<td>共享词嵌入矩阵</td>\n<td>将 token 索引映射为嵌入向量</td>\n</tr>\n<tr>\n<td>文本解码器 Pre-net</td>\n<td>共享词嵌入矩阵</td>\n<td>同上</td>\n</tr>\n<tr>\n<td>文本解码器 Post-net</td>\n<td>共享词嵌入矩阵（转置）</td>\n<td>将隐状态映射回词表概率</td>\n</tr>\n</tbody>\n</table></div>\n<h5>跨模态向量量化（Cross-Modal VQ）</h5>\n<p><img alt=\"跨模态向量量化示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2110.07205/assets/x2.png\" />\n<em>图 2：跨模态向量量化机制。通过共享码本将语音和文本的连续表示离散化，并随机混合两种模态的潜在单元。</em></p>\n<p>跨模态 VQ 是 SpeechT5 最核心的创新，其目标是<strong>在编码器和解码器之间建立一个统一的离散语义空间</strong>，使语音和文本共享相同的表示。</p>\n<p>具体流程如下：</p>\n<ol>\n<li><strong>编码器输出量化</strong>：将编码器的连续输出 <span class=\"kb-math kb-math-inline\">\\mathbf{u}_i</span> 通过最近邻搜索映射到码本 <span class=\"kb-math kb-math-inline\">\\mathbf{C}^K</span> 中的离散码：</li>\n</ol>\n<div class=\"kb-math kb-math-display\">\\mathbf{c}_i = \\arg\\min_j \\|\\mathbf{u}_i - \\mathbf{e}_j\\|_2</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{e}_j</span> 是码本中第 <span class=\"kb-math kb-math-inline\">j</span> 个可学习嵌入向量。</p>\n<ol>\n<li>\n<p><strong>乘积量化</strong>：使用 2 个码本，每个包含 <span class=\"kb-math kb-math-inline\">V = 100</span> 个条目，总共可表示 <span class=\"kb-math kb-math-inline\">V \\times V = 10000</span> 种离散状态，在表达能力和压缩率之间取得平衡。</p>\n</li>\n<li>\n<p><strong>随机混合</strong>：在预训练时，<strong>随机将一个 batch 中的语音和文本量化后的潜在单元进行混合</strong>，作为解码器的输入。这迫使解码器学会从统一的离散表示中恢复两种模态的信息，从而实现跨模态对齐。</p>\n</li>\n<li>\n<p><strong>多样性损失</strong>：为防止码本坍缩（只使用少数几个码），引入多样性损失最大化码本使用的熵：</p>\n</li>\n</ol>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_d = \\frac{1}{K}\\sum_{k=1}^{K} p_k \\log p_k</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">p_k</span> 是选择第 <span class=\"kb-math kb-math-inline\">k</span> 个码的平均概率。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：VQ 的梯度通过 straight-through estimator 传播，即前向传播使用离散码，反向传播时梯度直接复制到编码器输出。</div>\n<h5>预训练策略</h5>\n<pre><code class=\"language-python\"># SpeechT5 预训练伪代码\nfor step in range(500_000):\n    # 1. 采样语音和文本 batch\n    speech_batch = sample_speech(LibriSpeech_960h)\n    text_batch = sample_text(LibriSpeech_LM)\n\n    # 2. 语音分支：Masked Language Model + Seq2Seq\n    speech_hidden = speech_encoder_prenet(speech_batch.waveform)\n    speech_enc_out = shared_encoder(mask(speech_hidden))\n    speech_vq = cross_modal_vq(speech_enc_out)\n\n    # 语音 MLM：预测被遮蔽位置的语音特征\n    L_mlm_s = mlm_loss(speech_enc_out, speech_hidden)\n\n    # 语音 Seq2Seq：自回归重建 Mel 频谱\n    mel_pred = shared_decoder(speech_vq) -&gt; speech_decoder_postnet\n    L_1_s = L1_loss(mel_pred, target_mel)\n    L_bce_s = BCE_loss(stop_pred, stop_target)\n\n    # 3. 文本分支：Masked Language Model\n    text_hidden = text_encoder_prenet(text_batch.tokens)\n    text_enc_out = shared_encoder(mask(text_hidden))\n    text_vq = cross_modal_vq(text_enc_out)\n    text_pred = shared_decoder(text_vq) -&gt; text_decoder_postnet\n    L_mle_t = cross_entropy(text_pred, text_batch.tokens)\n\n    # 4. 多样性损失\n    L_d = diversity_loss(cross_modal_vq.codebook_usage)\n\n    # 5. 总损失\n    loss = L_mlm_s + L_1_s + L_bce_s + L_mle_t + 0.1 * L_d\n    optimizer.step(loss)\n</code></pre>\n<p>预训练的总损失函数为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\mathcal{L}_{mlm}^{s} + \\mathcal{L}_{1}^{s} + \\mathcal{L}_{bce}^{s} + \\mathcal{L}_{mle}^{t} + \\gamma \\mathcal{L}_{d}</div>\n<p>其中：\n- <span class=\"kb-math kb-math-inline\">\\mathcal{L}_{mlm}^{s}</span>：语音遮蔽语言模型损失，预测被遮蔽位置的语音特征\n- <span class=\"kb-math kb-math-inline\">\\mathcal{L}_{1}^{s}</span>：语音序列到序列的 L1 重建损失\n- <span class=\"kb-math kb-math-inline\">\\mathcal{L}_{bce}^{s}</span>：停止标记的二元交叉熵损失\n- <span class=\"kb-math kb-math-inline\">\\mathcal{L}_{mle}^{t}</span>：文本遮蔽语言模型的最大似然损失\n- <span class=\"kb-math kb-math-inline\">\\mathcal{L}_{d}</span>：VQ 多样性损失，<span class=\"kb-math kb-math-inline\">\\gamma = 0.1</span></p>\n<h5>训练配置</h5>\n<ul>\n<li><strong>预训练数据</strong>：LibriSpeech 960 小时语音 + LibriSpeech LM 文本语料</li>\n<li><strong>硬件</strong>：32 块 V100 GPU</li>\n<li><strong>优化器</strong>：Adam，学习率 <span class=\"kb-math kb-math-inline\">2 \\times 10^{-4}</span></li>\n<li><strong>预训练步数</strong>：500K 步，更新频率为 2</li>\n<li><strong>编码器初始化</strong>：语音编码器 Pre-net 使用 wav2vec 2.0 的卷积特征提取器初始化</li>\n</ul>\n<h5>微调与下游任务结果</h5>\n<p>预训练完成后，针对不同下游任务微调编码器-解码器骨干，同时替换相应的模态特定前/后处理网络。</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>任务</th>\n<th>数据集</th>\n<th>指标</th>\n<th>SpeechT5</th>\n<th>对比基线</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>ASR</td>\n<td>LibriSpeech 100h</td>\n<td>WER (test-other)</td>\n<td><strong>5.8%</strong></td>\n<td>wav2vec 2.0: 6.3%, HuBERT: 6.3%</td>\n</tr>\n<tr>\n<td>TTS</td>\n<td>LibriTTS</td>\n<td>MOS / CMOS</td>\n<td><strong>3.65 / +0.29</strong></td>\n<td>Baseline: 3.36</td>\n</tr>\n<tr>\n<td>VC</td>\n<td>CMU Arctic (clb→slt)</td>\n<td>MCD</td>\n<td><strong>5.87</strong></td>\n<td>VTN: 5.97</td>\n</tr>\n<tr>\n<td>ST</td>\n<td>MUST-C EN-FR</td>\n<td>BLEU</td>\n<td><strong>35.30</strong></td>\n<td>HuBERT init: 34.53</td>\n</tr>\n<tr>\n<td>SE</td>\n<td>WHAM!</td>\n<td>WER</td>\n<td><strong>8.9%</strong></td>\n<td>Baseline: 10.9%</td>\n</tr>\n</tbody>\n</table></div>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统方法</th>\n<th>SpeechT5</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>预训练范围</td>\n<td>仅编码器（wav2vec 2.0, HuBERT）</td>\n<td>编码器 + 解码器联合预训练</td>\n</tr>\n<tr>\n<td>模态</td>\n<td>单模态（仅语音）</td>\n<td>语音 + 文本联合</td>\n</tr>\n<tr>\n<td>任务适配</td>\n<td>每个任务独立模型</td>\n<td>统一框架，共享骨干</td>\n</tr>\n<tr>\n<td>跨模态对齐</td>\n<td>无显式对齐</td>\n<td>Cross-Modal VQ 实现隐式对齐</td>\n</tr>\n<tr>\n<td>生成能力</td>\n<td>解码器随机初始化</td>\n<td>解码器经过预训练，生成质量更高</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>消融实验关键发现</strong>：(1) 语音预训练对所有任务贡献最大；(2) 联合语音-文本预训练对跨模态任务（ASR、TTS）有显著增益；(3) 语音 MLM 损失有助于编码器学习更好的语音表示，移除后 TTS 的自然度反而提升（因为 MLM 主要服务于编码器而非解码器）。</div>",
      "quiz": {
        "q": "SpeechT5 中跨模态向量量化（Cross-Modal VQ）的核心作用是什么？",
        "options": [
          "将语音信号压缩为更短的序列以加速推理",
          "通过共享离散码本对齐语音和文本的隐空间表示，作为编码器与解码器的统一接口",
          "替代注意力机制实现编码器到解码器的信息传递",
          "为预训练提供自监督的离散标签"
        ],
        "answer": 1,
        "explain": "Cross-Modal VQ 通过共享码本将语音和文本的连续表示映射到同一离散空间，并随机混合两种模态的量化单元，迫使模型学习统一的跨模态表示，作为编码器和解码器之间的信息瓶颈。"
      }
    },
    {
      "id": "audiopalm",
      "num": 7,
      "name": "AudioPaLM",
      "fullName": "音频PaLM模型 (AudioPaLM)",
      "year": "2023",
      "org": "Google",
      "parent": "speecht5",
      "paperUrl": "https://arxiv.org/abs/2306.12925",
      "projectUrl": "",
      "category": "encoder_llm_decoder",
      "motivation": "融合PaLM与AudioLM能力",
      "summary": "AudioPaLM 的核心目标是：融合PaLM与AudioLM能力。",
      "keyPoints": [
        "核心动机：融合PaLM与AudioLM能力",
        "演化来源：继承或改进自 speecht5",
        "代表机构：Google"
      ],
      "detail": "<p>融合PaLM与AudioLM能力</p>"
    },
    {
      "id": "qwen-audio",
      "num": 8,
      "name": "Qwen-Audio",
      "fullName": "通义千问音频模型 (Qwen-Audio)",
      "year": "2023",
      "org": "阿里通义",
      "parent": "audiopalm",
      "paperUrl": "https://arxiv.org/abs/2311.07919",
      "projectUrl": "",
      "category": "encoder_llm_decoder",
      "motivation": "大规模音频-语言统一模型",
      "summary": "Qwen-Audio 的核心目标是：大规模音频-语言统一模型。",
      "keyPoints": [
        "核心动机：大规模音频-语言统一模型",
        "演化来源：继承或改进自 audiopalm",
        "代表机构：阿里通义"
      ],
      "detail": "<p>大规模音频-语言统一模型</p>"
    },
    {
      "id": "lauragpt",
      "num": 9,
      "name": "LauraGPT",
      "fullName": "劳拉GPT音频模型 (LauraGPT)",
      "year": "2023",
      "org": "阿里达摩院",
      "parent": "speecht5",
      "paperUrl": "https://arxiv.org/abs/2310.04673",
      "projectUrl": "",
      "category": "unified_seq2seq",
      "motivation": "端到端音频理解与生成",
      "summary": "LauraGPT 的核心目标是：端到端音频理解与生成。",
      "keyPoints": [
        "核心动机：端到端音频理解与生成",
        "演化来源：继承或改进自 speecht5",
        "代表机构：阿里达摩院"
      ],
      "detail": "<p>端到端音频理解与生成</p>"
    },
    {
      "id": "gpt-4o",
      "num": 10,
      "name": "GPT-4o",
      "fullName": "GPT-4全模态版 (GPT-4 Omni)",
      "year": "2024",
      "org": "OpenAI",
      "parent": "—",
      "paperUrl": "https://openai.com/index/hello-gpt-4o/",
      "projectUrl": "",
      "category": "native_e2e",
      "motivation": "原生端到端全模态交互",
      "summary": "GPT-4o 的核心目标是：原生端到端全模态交互。",
      "keyPoints": [
        "核心动机：原生端到端全模态交互",
        "代表机构：OpenAI"
      ],
      "detail": "<p>原生端到端全模态交互</p>"
    },
    {
      "id": "gemini-1.5",
      "num": 11,
      "name": "Gemini 1.5 Pro",
      "fullName": "Gemini 1.5专业版 (Gemini 1.5 Pro)",
      "year": "2024",
      "org": "Google",
      "parent": "gpt-4o",
      "paperUrl": "https://arxiv.org/abs/2403.05530",
      "projectUrl": "",
      "category": "native_e2e",
      "motivation": "稀疏MoE+200万token上下文",
      "summary": "Gemini 1.5 Pro 的核心目标是：稀疏MoE+200万token上下文。",
      "keyPoints": [
        "核心动机：稀疏MoE+200万token上下文",
        "演化来源：继承或改进自 gpt-4o",
        "代表机构：Google"
      ],
      "detail": "<p>稀疏MoE+200万token上下文</p>"
    },
    {
      "id": "codi",
      "num": 12,
      "name": "CoDi",
      "fullName": "可组合扩散模型 (Composable Diffusion)",
      "year": "2023",
      "org": "Microsoft",
      "parent": "—",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2023/hash/33edf072fe44f19079d66713a1831550-Abstract-Conference.html",
      "projectUrl": "",
      "category": "diffusion_fusion",
      "motivation": "可组合扩散Any-to-Any生成",
      "summary": "CoDi 的核心目标是：可组合扩散Any-to-Any生成。",
      "keyPoints": [
        "核心动机：可组合扩散Any-to-Any生成",
        "代表机构：Microsoft"
      ],
      "detail": "<p>可组合扩散Any-to-Any生成</p>"
    },
    {
      "id": "codi-2",
      "num": 13,
      "name": "CoDi-2",
      "fullName": "可组合扩散模型第二代 (CoDi-2)",
      "year": "2024",
      "org": "Microsoft",
      "parent": "codi",
      "paperUrl": "https://openaccess.thecvf.com/content/CVPR2024/html/Tang_CoDi-2_In-Context_Interleaved_and_Interactive_Any-to-Any_Generation_CVPR_2024_paper.html",
      "projectUrl": "",
      "category": "diffusion_fusion",
      "motivation": "上下文交错生成增强交互",
      "summary": "CoDi-2 的核心目标是：上下文交错生成增强交互。",
      "keyPoints": [
        "核心动机：上下文交错生成增强交互",
        "演化来源：继承或改进自 codi",
        "代表机构：Microsoft"
      ],
      "detail": "<p>上下文交错生成增强交互</p>"
    },
    {
      "id": "anygpt",
      "num": 14,
      "name": "AnyGPT",
      "fullName": "任意模态GPT (AnyGPT)",
      "year": "2024",
      "org": "复旦/上海AI Lab",
      "parent": "—",
      "paperUrl": "https://aclanthology.org/2024.findings-acl.521/",
      "projectUrl": "",
      "category": "autoregressive",
      "motivation": "离散Token统一处理所有模态",
      "summary": "AnyGPT 的核心目标是：离散Token统一处理所有模态。",
      "keyPoints": [
        "核心动机：离散Token统一处理所有模态",
        "代表机构：复旦/上海AI Lab"
      ],
      "detail": "<p>离散Token统一处理所有模态</p>"
    },
    {
      "id": "next-gpt",
      "num": 15,
      "name": "NExT-GPT",
      "fullName": "下一代GPT (NExT-GPT)",
      "year": "2023",
      "org": "NUS",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2309.05519",
      "projectUrl": "",
      "category": "encoder_llm_decoder",
      "motivation": "LLM+编码器+扩散解码器架构",
      "summary": "NExT-GPT 的核心目标是：LLM+编码器+扩散解码器架构。",
      "keyPoints": [
        "核心动机：LLM+编码器+扩散解码器架构",
        "代表机构：NUS"
      ],
      "detail": "<p>LLM+编码器+扩散解码器架构</p>"
    },
    {
      "id": "onellm",
      "num": 16,
      "name": "OneLLM",
      "fullName": "统一大语言模型 (OneLLM)",
      "year": "2024",
      "org": "上海AI Lab",
      "parent": "next-gpt",
      "paperUrl": "https://github.com/csuhan/OneLLM",
      "projectUrl": "",
      "category": "encoder_llm_decoder",
      "motivation": "8种模态统一映射对齐",
      "summary": "OneLLM 的核心目标是：8种模态统一映射对齐。",
      "keyPoints": [
        "核心动机：8种模态统一映射对齐",
        "演化来源：继承或改进自 next-gpt",
        "代表机构：上海AI Lab"
      ],
      "detail": "<p>8种模态统一映射对齐</p>"
    },
    {
      "id": "emu3",
      "num": 17,
      "name": "Emu3",
      "fullName": "Emu第三代 (Emu3)",
      "year": "2024",
      "org": "BAAI",
      "parent": "anygpt",
      "paperUrl": "https://baai.ac.cn/news/861",
      "projectUrl": "",
      "category": "autoregressive",
      "motivation": "纯Token预测统一图文视频生成",
      "summary": "Emu3 的核心目标是：纯Token预测统一图文视频生成。",
      "keyPoints": [
        "核心动机：纯Token预测统一图文视频生成",
        "演化来源：继承或改进自 anygpt",
        "代表机构：BAAI"
      ],
      "detail": "<p>纯Token预测统一图文视频生成</p>"
    },
    {
      "id": "chameleon",
      "num": 18,
      "name": "Chameleon",
      "fullName": "变色龙模型 (Chameleon)",
      "year": "2024",
      "org": "Meta FAIR",
      "parent": "anygpt",
      "paperUrl": "https://ai.meta.com/blog/meta-fair-research-new-release-june-2024/",
      "projectUrl": "",
      "category": "autoregressive",
      "motivation": "早期融合自回归统一架构",
      "summary": "Chameleon 的核心目标是：早期融合自回归统一架构。",
      "keyPoints": [
        "核心动机：早期融合自回归统一架构",
        "演化来源：继承或改进自 anygpt",
        "代表机构：Meta FAIR"
      ],
      "detail": "<p>早期融合自回归统一架构</p>"
    },
    {
      "id": "show-o",
      "num": 19,
      "name": "Show-o",
      "fullName": "展示-全模态 (Show-o)",
      "year": "2024",
      "org": "NUS",
      "parent": "chameleon",
      "paperUrl": "https://arxiv.org/abs/2408.12528",
      "projectUrl": "",
      "category": "autoregressive",
      "motivation": "自回归+离散扩散混合建模",
      "summary": "Show-o 的核心目标是：自回归+离散扩散混合建模。",
      "keyPoints": [
        "核心动机：自回归+离散扩散混合建模",
        "演化来源：继承或改进自 chameleon",
        "代表机构：NUS"
      ],
      "detail": "<p>自回归+离散扩散混合建模</p>"
    },
    {
      "id": "imagebind",
      "num": 20,
      "name": "ImageBind",
      "fullName": "图像绑定模型 (ImageBind)",
      "year": "2023",
      "org": "Meta",
      "parent": "—",
      "paperUrl": "https://ai.meta.com/blog/imagebind-six-modalities-binding-ai/",
      "projectUrl": "",
      "category": "encoder_llm_decoder",
      "motivation": "六模态统一嵌入空间",
      "summary": "ImageBind 的核心目标是：六模态统一嵌入空间。",
      "keyPoints": [
        "核心动机：六模态统一嵌入空间",
        "代表机构：Meta"
      ],
      "detail": "<p>六模态统一嵌入空间</p>"
    },
    {
      "id": "meta-transformer",
      "num": 21,
      "name": "Meta-Transformer",
      "fullName": "元Transformer (Meta-Transformer)",
      "year": "2023",
      "org": "上海AI Lab",
      "parent": "imagebind",
      "paperUrl": "https://arxiv.org/abs/2307.10802",
      "projectUrl": "",
      "category": "encoder_llm_decoder",
      "motivation": "12种模态单一编码器处理",
      "summary": "Meta-Transformer 的核心目标是：12种模态单一编码器处理。",
      "keyPoints": [
        "核心动机：12种模态单一编码器处理",
        "演化来源：继承或改进自 imagebind",
        "代表机构：上海AI Lab"
      ],
      "detail": "<p>12种模态单一编码器处理</p>"
    },
    {
      "id": "languagebind",
      "num": 22,
      "name": "LanguageBind",
      "fullName": "语言绑定模型 (LanguageBind)",
      "year": "2024",
      "org": "ICLR",
      "parent": "imagebind",
      "paperUrl": "https://arxiv.org/abs/2310.01852",
      "projectUrl": "",
      "category": "encoder_llm_decoder",
      "motivation": "语言中心N模态语义对齐",
      "summary": "LanguageBind 的核心目标是：语言中心N模态语义对齐。",
      "keyPoints": [
        "核心动机：语言中心N模态语义对齐",
        "演化来源：继承或改进自 imagebind",
        "代表机构：ICLR"
      ],
      "detail": "<p>语言中心N模态语义对齐</p>"
    },
    {
      "id": "janus-pro",
      "num": 23,
      "name": "Janus-Pro",
      "fullName": "Janus专业版 (Janus-Pro)",
      "year": "2025",
      "org": "DeepSeek",
      "parent": "chameleon",
      "paperUrl": "https://arxiv.org/abs/2501.17833",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "解耦视觉编码解决表征冲突",
      "summary": "Janus-Pro 的核心目标是：解耦视觉编码解决表征冲突。",
      "keyPoints": [
        "核心动机：解耦视觉编码解决表征冲突",
        "演化来源：继承或改进自 chameleon",
        "代表机构：DeepSeek"
      ],
      "detail": "<p>解耦视觉编码解决表征冲突</p>"
    },
    {
      "id": "minicpm-o",
      "num": 24,
      "name": "MiniCPM-o 4.5",
      "fullName": "MiniCPM全模态4.5版 (MiniCPM-o 4.5)",
      "year": "2026",
      "org": "OpenBMB",
      "parent": "gpt-4o",
      "paperUrl": "https://minicpm.vercel.app/blog/minicpm-o-2-6-en",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "全双工实时交互边端模型",
      "summary": "MiniCPM-o 4.5 的核心目标是：全双工实时交互边端模型。",
      "keyPoints": [
        "核心动机：全双工实时交互边端模型",
        "演化来源：继承或改进自 gpt-4o",
        "代表机构：OpenBMB"
      ],
      "detail": "<p>全双工实时交互边端模型</p>"
    },
    {
      "id": "qwen3.5-omni",
      "num": 25,
      "name": "Qwen3.5-Omni",
      "fullName": "通义千问3.5全模态版 (Qwen3.5-Omni)",
      "year": "2026",
      "org": "阿里通义",
      "parent": "gemini-1.5",
      "paperUrl": "https://qwen.ai/blog/qwen2.5-omni/",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "Thinker-Talker双核低延迟架构",
      "summary": "Qwen3.5-Omni 的核心目标是：Thinker-Talker双核低延迟架构。",
      "keyPoints": [
        "核心动机：Thinker-Talker双核低延迟架构",
        "演化来源：继承或改进自 gemini-1.5",
        "代表机构：阿里通义"
      ],
      "detail": "<p>Thinker-Talker双核低延迟架构</p>"
    },
    {
      "id": "omniflow",
      "num": 26,
      "name": "OmniFlow",
      "fullName": "全模态流模型 (OmniFlow)",
      "year": "2025",
      "org": "UCLA",
      "parent": "codi-2",
      "paperUrl": "https://openaccess.thecvf.com/content/CVPR2025/html/Li_OmniFlow_Any-to-Any_Generation_with_Multi-Modal_Rectified_Flows_CVPR_2025_paper.html",
      "projectUrl": "",
      "category": "diffusion_fusion",
      "motivation": "多模态修正流统一生成",
      "summary": "OmniFlow 的核心目标是：多模态修正流统一生成。",
      "keyPoints": [
        "核心动机：多模态修正流统一生成",
        "演化来源：继承或改进自 codi-2",
        "代表机构：UCLA"
      ],
      "detail": "<p>多模态修正流统一生成</p>"
    },
    {
      "id": "omni-diffusion",
      "num": 27,
      "name": "Omni-Diffusion",
      "fullName": "全模态扩散模型 (Omni-Diffusion)",
      "year": "2026",
      "org": "arXiv",
      "parent": "show-o",
      "paperUrl": "https://arxiv.org/abs/2603.06000",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "掩码离散扩散统一理解与生成",
      "summary": "Omni-Diffusion 的核心目标是：掩码离散扩散统一理解与生成。",
      "keyPoints": [
        "核心动机：掩码离散扩散统一理解与生成",
        "演化来源：继承或改进自 show-o",
        "代表机构：arXiv"
      ],
      "detail": "<p>掩码离散扩散统一理解与生成</p>"
    },
    {
      "id": "nemotron-3-nano",
      "num": 28,
      "name": "Nemotron 3 Nano",
      "fullName": "Nemotron 3纳米版 (Nemotron 3 Nano)",
      "year": "2026",
      "org": "NVIDIA",
      "parent": "gpt-4o",
      "paperUrl": "https://nvidianews.nvidia.com/news/nvidia-nemotron-3-nano-omni-open-multimodal-model",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "高吞吐音视频智能体推理",
      "summary": "Nemotron 3 Nano 的核心目标是：高吞吐音视频智能体推理。",
      "keyPoints": [
        "核心动机：高吞吐音视频智能体推理",
        "演化来源：继承或改进自 gpt-4o",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>高吞吐音视频智能体推理</p>"
    },
    {
      "id": "llama-4-scout",
      "num": 29,
      "name": "Llama 4 Scout",
      "fullName": "Llama 4侦察版 (Llama 4 Scout)",
      "year": "2025",
      "org": "Meta",
      "parent": "gemini-1.5",
      "paperUrl": "https://llama.meta.com/llama4-launch",
      "projectUrl": "",
      "category": "native_e2e",
      "motivation": "开源原生MoE全模态模型",
      "summary": "Llama 4 Scout 的核心目标是：开源原生MoE全模态模型。",
      "keyPoints": [
        "核心动机：开源原生MoE全模态模型",
        "演化来源：继承或改进自 gemini-1.5",
        "代表机构：Meta"
      ],
      "detail": "<p>开源原生MoE全模态模型</p>"
    },
    {
      "id": "gpt-5.5-instant",
      "num": 30,
      "name": "GPT-5.5 Instant",
      "fullName": "GPT-5.5即时版 (GPT-5.5 Instant)",
      "year": "2026",
      "org": "OpenAI",
      "parent": "gpt-4o",
      "paperUrl": "https://openai.com/gpt-5-5",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "强化可靠性与Agentic任务",
      "summary": "GPT-5.5 Instant 的核心目标是：强化可靠性与Agentic任务。",
      "keyPoints": [
        "核心动机：强化可靠性与Agentic任务",
        "演化来源：继承或改进自 gpt-4o",
        "代表机构：OpenAI"
      ],
      "detail": "<p>强化可靠性与Agentic任务</p>"
    }
  ],
  "categories": {
    "unified_seq2seq": {
      "label": "统一Seq2Seq",
      "color": "#3498db"
    },
    "autoregressive": {
      "label": "自回归生成",
      "color": "#27ae60"
    },
    "diffusion_fusion": {
      "label": "扩散模型融合",
      "color": "#9b59b6"
    },
    "encoder_llm_decoder": {
      "label": "编码器-LLM-解码器",
      "color": "#e67e22"
    },
    "native_e2e": {
      "label": "原生端到端",
      "color": "#e74c3c"
    },
    "frontier_2026": {
      "label": "2026前沿",
      "color": "#1abc9c"
    }
  },
  "projectUrls": {}
};
