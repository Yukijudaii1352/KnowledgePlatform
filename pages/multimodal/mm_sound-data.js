/**
 * mm_sound-data.js — 由 pipeline/build.py 于 2026-06-08 12:12:05 自动生成。
 * 源文件：content/mm/mm_sound.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "multimodal",
    "topic_id": "mm_sound",
    "topic_name": "音频理解",
    "page_title": "音频理解 算法总结",
    "page_subtitle": "2026-06-08 版",
    "page_desc": "从传统语音识别到端到端架构，再到多模态音频大模型的演进历程",
    "page_icon": "🎧",
    "hero_pills": [
      "ASR · Audio-LLM"
    ],
    "count_pill": "{count} 个算法",
    "image_base": "../../content/mm/mm_sound/assets/",
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
        "id": "ctc",
        "x": 100,
        "y": 100,
        "category": "foundation"
      },
      {
        "id": "rnn_t",
        "x": 200,
        "y": 100,
        "category": "foundation"
      },
      {
        "id": "conformer",
        "x": 450,
        "y": 200,
        "category": "asr"
      },
      {
        "id": "whisper",
        "x": 650,
        "y": 200,
        "category": "asr"
      },
      {
        "id": "wav2vec2",
        "x": 450,
        "y": 300,
        "category": "ssl_representation"
      },
      {
        "id": "hubert",
        "x": 500,
        "y": 300,
        "category": "ssl_representation"
      },
      {
        "id": "wavlm",
        "x": 550,
        "y": 300,
        "category": "ssl_representation"
      },
      {
        "id": "i_vector",
        "x": 200,
        "y": 400,
        "category": "speaker"
      },
      {
        "id": "d_vector",
        "x": 250,
        "y": 400,
        "category": "speaker"
      },
      {
        "id": "x_vector",
        "x": 350,
        "y": 400,
        "category": "speaker"
      },
      {
        "id": "ecapa_tdnn",
        "x": 450,
        "y": 400,
        "category": "speaker"
      },
      {
        "id": "audiogpt",
        "x": 650,
        "y": 500,
        "category": "audio_llm"
      },
      {
        "id": "speechgpt",
        "x": 650,
        "y": 520,
        "category": "audio_llm"
      },
      {
        "id": "qwen_audio",
        "x": 700,
        "y": 500,
        "category": "audio_llm"
      },
      {
        "id": "salmonn",
        "x": 750,
        "y": 480,
        "category": "audio_llm"
      },
      {
        "id": "ltu",
        "x": 800,
        "y": 480,
        "category": "audio_llm"
      },
      {
        "id": "qwen2_audio",
        "x": 750,
        "y": 520,
        "category": "audio_llm"
      },
      {
        "id": "gpt4o",
        "x": 750,
        "y": 540,
        "category": "audio_llm"
      },
      {
        "id": "tagspeech",
        "x": 880,
        "y": 200,
        "category": "frontier_2026"
      },
      {
        "id": "streaming_sp_asr",
        "x": 920,
        "y": 200,
        "category": "frontier_2026"
      },
      {
        "id": "speakerlm",
        "x": 900,
        "y": 400,
        "category": "frontier_2026"
      },
      {
        "id": "wavbench",
        "x": 900,
        "y": 300,
        "category": "frontier_2026"
      },
      {
        "id": "wavslm",
        "x": 920,
        "y": 320,
        "category": "frontier_2026"
      },
      {
        "id": "audita",
        "x": 920,
        "y": 460,
        "category": "frontier_2026"
      },
      {
        "id": "visqa",
        "x": 920,
        "y": 480,
        "category": "frontier_2026"
      },
      {
        "id": "audio_thinker",
        "x": 900,
        "y": 600,
        "category": "frontier_2026"
      },
      {
        "id": "audio_flamingo3",
        "x": 900,
        "y": 640,
        "category": "frontier_2026"
      },
      {
        "id": "uniaudio2",
        "x": 920,
        "y": 620,
        "category": "frontier_2026"
      },
      {
        "id": "gemini_audio",
        "x": 900,
        "y": 680,
        "category": "frontier_2026"
      },
      {
        "id": "desta_audio",
        "x": 920,
        "y": 660,
        "category": "frontier_2026"
      }
    ],
    "edges": [
      {
        "from": "ctc",
        "to": "rnn_t",
        "label": "流式输出"
      },
      {
        "from": "rnn_t",
        "to": "conformer",
        "label": "混合架构"
      },
      {
        "from": "conformer",
        "to": "whisper",
        "label": "大规模训练"
      },
      {
        "from": "whisper",
        "to": "tagspeech",
        "label": "多说话人"
      },
      {
        "from": "tagspeech",
        "to": "streaming_sp_asr",
        "label": "流式"
      },
      {
        "from": "wav2vec2",
        "to": "hubert",
        "label": "聚类伪标签"
      },
      {
        "from": "hubert",
        "to": "wavlm",
        "label": "去噪增强"
      },
      {
        "from": "wavlm",
        "to": "wavbench",
        "label": "评测"
      },
      {
        "from": "wavlm",
        "to": "wavslm",
        "label": "蒸馏"
      },
      {
        "from": "i_vector",
        "to": "d_vector",
        "label": "深度学习"
      },
      {
        "from": "d_vector",
        "to": "x_vector",
        "label": "TDNN架构"
      },
      {
        "from": "x_vector",
        "to": "ecapa_tdnn",
        "label": "注意力"
      },
      {
        "from": "ecapa_tdnn",
        "to": "speakerlm",
        "label": "LLM融合"
      },
      {
        "from": "audiogpt",
        "to": "qwen_audio",
        "label": "统一训练"
      },
      {
        "from": "qwen_audio",
        "to": "salmonn",
        "label": "双编码器"
      },
      {
        "from": "salmonn",
        "to": "ltu",
        "label": "语义理解"
      },
      {
        "from": "salmonn",
        "to": "audio_thinker",
        "label": "思维链"
      },
      {
        "from": "qwen_audio",
        "to": "qwen2_audio",
        "label": "升级版"
      },
      {
        "from": "qwen2_audio",
        "to": "audio_flamingo3",
        "label": "按需推理"
      },
      {
        "from": "qwen2_audio",
        "to": "uniaudio2",
        "label": "推理编码"
      },
      {
        "from": "qwen2_audio",
        "to": "desta_audio",
        "label": "跨模态"
      },
      {
        "from": "gpt4o",
        "to": "gemini_audio",
        "label": "低延迟"
      },
      {
        "from": "ltu",
        "to": "audita",
        "label": "审计"
      },
      {
        "from": "ltu",
        "to": "visqa",
        "label": "低资源"
      }
    ],
    "milestones": [
      "wav2vec2",
      "whisper",
      "audio_thinker"
    ]
  },
  "algos": [
    {
      "id": "ctc",
      "num": 1,
      "name": "CTC",
      "fullName": "连接时序分类 (Connectionist Temporal Classification)",
      "year": "2006",
      "org": "多伦多大学",
      "parent": "—",
      "paperUrl": "https://dl.acm.org/doi/10.1145/1143844.1143891",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "引入blank标签解决序列对齐",
      "summary": "CTC 在 RNN 输出层引入 **blank（空白）标签** 和 **多对一路径映射**，配合前向-后向动态规划算法高效计算标签序列概率，使网络能够直接从未分段的序列数据中学习，无需帧级对齐标注，成为语音识别、手写识别等序列标注任务的基础方法。",
      "keyPoints": [
        "<strong>Blank 标签机制</strong>：在原始标签集 $L$ 之外新增一个 blank 标签，输出层共 $|L|+1$ 个 softmax 单元，blank 用于表示\"不输出任何标签\"的时间步，解决了输入帧数远多于标签数的对齐问题。",
        "<strong>多对一映射 $\\mathcal{B}$</strong>：定义从逐帧输出路径 $\\pi$ 到标签序列 $\\mathbf{l}$ 的映射——先移除连续重复标签，再移除所有 blank。标签序列概率为所有映射到该序列的路径概率之和：$p(\\mathbf{l}|\\mathbf{x}) = \\sum_{\\pi \\in \\mathcal{B}^{-1}(\\mathbf{l})} p(\\pi|\\mathbf{x})$。",
        "<strong>前向-后向算法</strong>：通过在标签序列中插入 blank 构造扩展序列 $\\mathbf{l}'$（长度 $2|\\mathbf{l}|+1$），利用动态规划在 $O(T \\cdot |\\mathbf{l}'|)$ 时间内精确计算 $p(\\mathbf{l}|\\mathbf{x})$，避免了对指数级路径的暴力枚举。",
        "<strong>两种解码策略</strong>：Best Path Decoding（贪心取每帧最大概率输出，$O(T)$，近似）和 Prefix Search Decoding（基于前缀概率的精确搜索，利用 blank 概率阈值剪枝加速）。",
        "<strong>最大似然训练</strong>：目标函数为正确标签序列的负对数似然，梯度通过前向-后向变量直接计算并经 BPTT 反向传播到 RNN 参数。",
        "<strong>无需预分段</strong>：与传统 HMM-RNN 混合系统不同，CTC 完全端到端训练，不依赖帧级标注或预训练的对齐信息。",
        "<strong>实验验证</strong>：在 TIMIT 语音数据集上，BLSTM+CTC 达到 30.51% 标签错误率（LER），显著优于 HMM 基线（36.2%）和 Framewise RNN（35.5%），且无需外部语言模型。"
      ],
      "detail": "<h5>4.1 核心示意图</h5>\n<div class=\"img-wrap\"><img src=\"../../content/mm/mm_sound/assets/assets/ctc_figure1.png\" alt=\"CTC vs Framewise 输出对比\" loading=\"lazy\"><p class=\"img-caption\">▲ CTC vs Framewise 输出对比</p></div>\n<blockquote>\n<p><strong>图 1</strong>：Framewise 网络与 CTC 网络对语音信号分类的对比。上方为传统逐帧分类网络，需要预对齐的帧级标注，输出在音素边界处产生大量错误尖峰；下方为 CTC 网络，输出自然地将每个标签预测与序列中对应的语音段对齐，blank 标签（阴影区域）填充在标签之间，形成清晰的\"尖峰\"输出模式。</p>\n</blockquote>\n<div class=\"img-wrap\"><img src=\"../../content/mm/mm_sound/assets/assets/ctc_figure3_forward_backward.png\" alt=\"前向-后向算法示意图\" loading=\"lazy\"><p class=\"img-caption\">▲ 前向-后向算法示意图</p></div>\n<blockquote>\n<p><strong>图 3</strong>：前向-后向算法应用于标签序列 \"CAT\" 的示意图。纵轴为扩展标签序列 $\\mathbf{l}' = (\\text{blank}, C, \\text{blank}, A, \\text{blank}, T, \\text{blank})$，横轴为时间步。白色圆圈表示 blank，黑色圆圈表示标签。箭头表示允许的转移：每个节点可以自环（保持当前标签）、前进一步（到下一个标签/blank）、或跳过一个 blank 前进两步（仅当目标不是 blank 且与当前标签不同时）。</p>\n</blockquote>\n<h5>4.2 算法伪代码</h5>\n<pre><code>算法: CTC 前向算法 — 计算 p(l|x)\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n输入: 网络输出 y (T×|L'|), 目标标签序列 l (长度 S)\n输出: p(l|x)\n\n1.  构造扩展标签序列 l' = (blank, l₁, blank, l₂, ..., blank, lₛ, blank)\n    // 长度 S' = 2S + 1\n\n2.  初始化前向变量:\n    α(1, 1) = y(blank, 1)          // 第1个时间步输出 blank 的概率\n    α(1, 2) = y(l₁, 1)             // 第1个时间步输出第1个标签的概率\n    α(1, s) = 0,  ∀ s &gt; 2          // 其余位置不可达\n\n3.  FOR t = 2 TO T:\n4.      FOR s = 1 TO S':\n5.          // 基础情况: 自环 + 从前一个位置转移\n6.          α̂ = α(t-1, s) + α(t-1, s-1)\n\n7.          // 跳转情况: 若 l'_s ≠ blank 且 l'_s ≠ l'_{s-2}\n8.          IF s &gt; 2 AND l'_s ≠ blank AND l'_s ≠ l'_{s-2}:\n9.              α̂ = α̂ + α(t-1, s-2)\n\n10.         α(t, s) = α̂ × y(l'_s, t)   // 乘以当前时间步的输出概率\n\n11. RETURN p(l|x) = α(T, S') + α(T, S'-1)\n    // 最终可以在最后一个 blank 或最后一个标签处结束\n</code></pre>\n<pre><code>算法: CTC Best Path Decoding (贪心解码)\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n输入: 网络输出 y (T×|L'|)\n输出: 最可能标签序列 l*\n\n1.  FOR t = 1 TO T:\n2.      π*_t = argmax_k y(k, t)     // 每帧取概率最大的标签\n\n3.  RETURN l* = B(π*)               // 应用映射: 移除重复 → 移除 blank\n</code></pre>\n<pre><code>算法: CTC 训练 — 梯度计算\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n输入: 网络输出 y, 目标标签 l, 前向变量 α, 后向变量 β\n输出: 损失函数对网络输出的梯度\n\n1.  计算前向变量 α(t,s) 和后向变量 β(t,s)  // 使用前向-后向算法\n\n2.  FOR 每个时间步 t, 每个标签 k:\n3.      ∂(-ln p(l|x))/∂y(k,t) = y(k,t) - (1/p(l|x)) × Σ_{s∈lab(l,k)} α(t,s)·β(t,s)\n        // lab(l,k) 是 l' 中等于 k 的所有位置集合\n\n4.  通过 BPTT 将梯度反向传播到 RNN 参数\n</code></pre>\n<h5>4.3 方法细节深入</h5>\n<p><strong>1. 问题定义与动机</strong></p>\n<p>传统的序列标注方法（如 HMM 或逐帧分类 RNN）要求训练数据提供帧级对齐标注，即每个输入帧都需要对应一个标签。这在实际应用中代价极高——例如语音识别中，标注者需要精确标记每个音素的起止时间。CTC 的核心贡献在于将序列标注问题重新定义为：给定输入序列 $\\mathbf{x} = (x_1, \\ldots, x_T)$，直接预测标签序列 $\\mathbf{l} = (l_1, \\ldots, l_S)$，其中 $S \\leq T$，无需知道 $\\mathbf{l}$ 中每个标签对应 $\\mathbf{x}$ 的哪些帧。</p>\n<p><strong>2. Blank 标签与映射 $\\mathcal{B}$ 的设计</strong></p>\n<p>CTC 的关键创新是引入 blank 标签。网络在每个时间步 $t$ 输出 $|L|+1$ 维的 softmax 概率分布 $y_t$，其中额外的一维对应 blank。一条完整的路径 $\\pi = (\\pi_1, \\ldots, \\pi_T)$ 是长度为 $T$ 的标签序列（包含 blank）。</p>\n<p>映射 $\\mathcal{B}$ 的操作分两步：\n1. <strong>合并连续重复</strong>：如 <code>(a, a, blank, b, b)</code> → <code>(a, blank, b)</code>\n2. <strong>移除 blank</strong>：如 <code>(a, blank, b)</code> → <code>(a, b)</code></p>\n<p>这个设计巧妙地解决了两个问题：\n- <strong>长度不匹配</strong>：blank 吸收了多余的时间步\n- <strong>重复标签</strong>：如标签序列 <code>(a, a)</code> 可以通过 <code>(a, blank, a)</code> 路径表示，与 <code>(a)</code> 对应的 <code>(a, a)</code> 路径区分开</p>\n<p><strong>3. 前向-后向算法的精妙设计</strong></p>\n<p>直接枚举所有映射到 $\\mathbf{l}$ 的路径数量是指数级的。CTC 借鉴 HMM 的前向-后向算法思想，通过动态规划高效求解。</p>\n<p>关键步骤是构造<strong>扩展标签序列</strong> $\\mathbf{l}'$：在 $\\mathbf{l}$ 的首尾和每两个标签之间插入 blank。例如 $\\mathbf{l} = (C, A, T)$ 变为 $\\mathbf{l}' = (\\text{-}, C, \\text{-}, A, \\text{-}, T, \\text{-})$，长度从 $S$ 变为 $2S+1$。</p>\n<p>前向变量 $\\alpha(t, s)$ 表示：在时间步 $t$，所有映射到 $\\mathbf{l}$ 的前 $\\lfloor s/2 \\rfloor$ 个标签的路径的总概率。转移规则体现了 $\\mathcal{B}$ 映射的约束：</p>\n<ul>\n<li><strong>自环</strong>：$\\alpha(t-1, s) \\to \\alpha(t, s)$（重复当前标签/blank）</li>\n<li><strong>前进一步</strong>：$\\alpha(t-1, s-1) \\to \\alpha(t, s)$（从前一个位置转移）</li>\n<li><strong>跳过 blank</strong>：$\\alpha(t-1, s-2) \\to \\alpha(t, s)$（仅当 $l'<em s-2=\"s-2\">s \\neq \\text{blank}$ 且 $l'_s \\neq l'</em>$ 时允许，因为相同标签之间必须有 blank 分隔）</li>\n</ul>\n<p>后向变量 $\\beta(t, s)$ 对称定义，从序列末尾向前计算。</p>\n<p><strong>4. 解码策略对比</strong></p>\n<ul>\n<li><strong>Best Path Decoding</strong>：每帧独立取 argmax，再应用 $\\mathcal{B}$。计算简单（$O(T)$），但不保证找到最优标签序列——因为多条路径可能映射到同一标签序列，而最优路径不一定属于最优标签序列。</li>\n<li><strong>Prefix Search Decoding</strong>：维护一个前缀集合，逐步扩展。利用前向变量计算每个前缀的概率，通过 blank 概率阈值剪枝。理论上精确，但最坏情况为指数复杂度。论文观察到训练好的 CTC 网络输出具有\"尖峰\"特性（大部分时间步输出 blank），使得剪枝非常有效。</li>\n</ul>\n<p><strong>5. 实验设计与结果</strong></p>\n<p>论文在 TIMIT 语音数据集上验证 CTC，使用双向 LSTM（BLSTM）作为基础网络：\n- <strong>网络结构</strong>：前向和后向各 100 个 LSTM memory block，每个 block 含 1 个 cell + 3 个门，输出层 62 个单元（61 个音素 + 1 个 blank），总参数 114,662\n- <strong>训练配置</strong>：在线梯度下降，学习率 $10^{-4}$，动量 0.9，输入为 12 维 MFCC + 能量 + 一阶差分 = 26 维\n- <strong>核心结果</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>标签错误率 (LER)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>HMM (单高斯)</td>\n<td>36.2%</td>\n</tr>\n<tr>\n<td>Framewise BLSTM</td>\n<td>35.5%</td>\n</tr>\n<tr>\n<td><strong>CTC BLSTM</strong></td>\n<td><strong>30.51%</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>CTC 相比 Framewise 分类降低了约 5 个百分点的错误率，且无需帧级对齐标注。论文还发现 Prefix Search Decoding 与 Best Path Decoding 结果一致，表明网络输出的尖峰特性使贪心解码已足够准确。</p>\n<h5>4.4 关键公式</h5>\n<p><strong>路径概率（条件独立假设）：</strong></p>\n<div class=\"kb-math kb-math-display\">p(\\pi|\\mathbf{x}) = \\prod_{t=1}^{T} y_{\\pi_t}^t</div>\n<p>其中 $y_k^t$ 是网络在时间步 $t$ 输出标签 $k$ 的概率。</p>\n<p><strong>标签序列概率（对所有合法路径求和）：</strong></p>\n<div class=\"kb-math kb-math-display\">p(\\mathbf{l}|\\mathbf{x}) = \\sum_{\\pi \\in \\mathcal{B}^{-1}(\\mathbf{l})} p(\\pi|\\mathbf{x})</div>\n<p><strong>前向变量递推：</strong></p>\n<div class=\"kb-math kb-math-display\">\\alpha(t, s) = y_{l&#x27;_s}^t \\cdot \\begin{cases} \\alpha(t\\!-\\!1, s) + \\alpha(t\\!-\\!1, s\\!-\\!1) &amp; \\text{if } l&#x27;_s = \\text{blank 或 } l&#x27;_s = l&#x27;_{s-2} \\\\ \\alpha(t\\!-\\!1, s) + \\alpha(t\\!-\\!1, s\\!-\\!1) + \\alpha(t\\!-\\!1, s\\!-\\!2) &amp; \\text{otherwise} \\end{cases}</div>\n<p><strong>最终概率：</strong></p>\n<div class=\"kb-math kb-math-display\">p(\\mathbf{l}|\\mathbf{x}) = \\alpha(T, |\\mathbf{l}&#x27;|) + \\alpha(T, |\\mathbf{l}&#x27;|-1)</div>\n<p><strong>训练目标函数（最大似然）：</strong></p>\n<div class=\"kb-math kb-math-display\">\\mathcal{O}^{ML} = -\\sum_{(\\mathbf{x}, \\mathbf{z}) \\in S} \\ln p(\\mathbf{z}|\\mathbf{x})</div>\n<p><strong>梯度计算：</strong></p>\n<div class=\"kb-math kb-math-display\">\\frac{\\partial p(\\mathbf{l}|\\mathbf{x})}{\\partial y_k^t} = \\frac{1}{{y_k^t}^2} \\sum_{s \\in \\text{lab}(\\mathbf{l}, k)} \\alpha(t, s) \\cdot \\beta(t, s)</div>\n<p>其中 $\\text{lab}(\\mathbf{l}, k) = {s : l'_s = k}$ 是扩展标签序列中所有等于 $k$ 的位置集合。</p>",
      "quiz": {
        "q": "",
        "options": [],
        "answer": 0,
        "explain": ""
      }
    },
    {
      "id": "rnn_t",
      "num": 2,
      "name": "RNN-T",
      "fullName": "循环神经网络转录器 (RNN-Transducer)",
      "year": "2012",
      "org": "Google",
      "parent": "ctc",
      "paperUrl": "https://arxiv.org/abs/1211.3711",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "支持流式输出的序列转录",
      "summary": "RNN Transducer 在 CTC 的基础上引入预测网络（Prediction Network）来建模输出标签之间的依赖关系，将序列转录问题分解为编码器（Transcription Network）、解码器（Prediction Network）和联合网络（Joint Network）三个组件，实现了端到端、支持流式的序列到序列转录。",
      "keyPoints": [
        "<strong>三组件架构</strong>：Transcription Network（双向 LSTM 编码器）+ Prediction Network（单向 LSTM 解码器）+ Joint Network，三者协同完成序列转录",
        "<strong>对 CTC 的关键扩展</strong>：CTC 假设输出标签条件独立，RNN-T 通过 Prediction Network 显式建模输出间依赖，显著提升性能",
        "<strong>转导格（Transduction Lattice）</strong>：在 <span class=\"kb-math kb-math-inline\">T \\times (U+1)</span> 的格点上定义所有可能的对齐路径，水平移动对应消耗输入（输出 ∅），垂直移动对应发射标签",
        "<strong>联合网络设计</strong>：<span class=\"kb-math kb-math-inline\">h(k, t, u) = \\exp(f_t^k + g_u^k)</span>，将编码器和解码器的输出通过加法耦合后 softmax 归一化",
        "<strong>前向-后向算法训练</strong>：利用动态规划在格点上高效计算所有对齐路径的边际概率之和，实现精确的最大似然训练",
        "<strong>Beam Search 解码</strong>：在推理时使用宽度受限的束搜索，通过缓存 LSTM 隐状态加速计算",
        "<strong>实验验证</strong>：在 TIMIT 音素识别任务上，RNN-T 达到 20.4% PER，显著优于单独的 CTC（23.0%）和单独的预测网络（45.9%）"
      ],
      "detail": "<h5>模型架构总览</h5>\n<p><img alt=\"RNN-T 架构示意图\" src=\"assets/rnn_t_architecture.png\" />\n<em>图：RNN Transducer 的三组件架构——Transcription Network 编码输入序列，Prediction Network 建模已输出标签的依赖，Joint Network 融合两者产生输出分布。</em></p>\n<p><img alt=\"RNN-T 转导格\" src=\"assets/rnn_t_lattice.png\" />\n<em>图：转导格（Transduction Lattice）示意。每个格点 <span class=\"kb-math kb-math-inline\">(t, u)</span> 代表已消耗 <span class=\"kb-math kb-math-inline\">t</span> 个输入帧、已输出 <span class=\"kb-math kb-math-inline\">u</span> 个标签的状态。水平箭头表示输出空白符 ∅（前进输入），垂直箭头表示发射标签。红色路径为一条可能的对齐。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># RNN Transducer 前向算法伪代码\ndef forward_algorithm(x, y, F, G, joint):\n    &quot;&quot;&quot;\n    x: 输入序列, 长度 T\n    y: 目标输出序列, 长度 U\n    F: Transcription Network (encoder)\n    G: Prediction Network (decoder)\n    joint: Joint Network\n    &quot;&quot;&quot;\n    T, U = len(x), len(y)\n\n    # Step 1: 编码器前向传播（可并行处理整个输入序列）\n    f = F(x)                    # f[t] for t = 1..T, 维度 K+1\n\n    # Step 2: 解码器前向传播（自回归，依赖已输出标签）\n    g = G(y)                    # g[u] for u = 0..U, 维度 K+1\n\n    # Step 3: 联合网络计算输出分布\n    # 对每个格点 (t, u):\n    #   h(k, t, u) = exp(f[t][k] + g[u][k])\n    #   P(k | t, u) = h(k, t, u) / sum_k'(h(k', t, u))\n\n    # Step 4: 前向变量计算（动态规划）\n    alpha = zeros(T+1, U+1)     # α(t, u) = 所有到达 (t,u) 的路径概率之和\n    alpha[1][0] = 1\n    for t in range(1, T+1):\n        for u in range(0, U+1):\n            # 从左侧 (t-1, u) 通过输出 ∅ 到达\n            if t &gt; 1:\n                alpha[t][u] += alpha[t-1][u] * P(null | t-1, u)\n            # 从下方 (t, u-1) 通过输出 y[u] 到达\n            if u &gt; 0:\n                alpha[t][u] += alpha[t][u-1] * P(y[u] | t, u-1)\n\n    # Step 5: 序列概率 = α(T, U) * P(∅ | T, U)\n    loss = -log(alpha[T][U] * P(null | T, U))\n    return loss\n</code></pre>\n<pre><code class=\"language-python\"># RNN Transducer Beam Search 解码伪代码\ndef beam_search(x, F, G, joint, beam_width=W):\n    f = F(x)                            # 编码器输出\n    B = {([], G.init_state(), 0.0)}     # (已输出序列, LSTM隐状态, log概率)\n\n    for t in range(1, T+1):\n        B_new = {}\n        for (y_prefix, h_state, log_p) in B:\n            g_u, h_new = G.step(y_prefix[-1], h_state)  # 预测网络单步\n            probs = softmax(joint(f[t], g_u))            # 联合网络\n\n            # 选项1: 输出 ∅，前进到下一个输入帧\n            add_to(B_new, (y_prefix, h_new, log_p + log(probs[null])))\n\n            # 选项2: 输出某个标签 k\n            for k in top_k(probs, beam_width):\n                if k != null:\n                    add_to(B_new, (y_prefix + [k], h_new, log_p + log(probs[k])))\n\n        B = top_W(B_new, beam_width)    # 保留概率最高的 W 条路径\n\n    return best(B)\n</code></pre>\n<h5>动机与背景</h5>\n<p>序列到序列的转录（Sequence Transduction）是语音识别、手写识别等领域的核心问题。传统方法如 HMM 需要预定义状态拓扑和对齐，而端到端方法则试图直接从输入序列映射到输出序列。</p>\n<p><strong>CTC 的局限性</strong>：Graves 等人在 2006 年提出的 Connectionist Temporal Classification（CTC）是一种里程碑式的端到端方法，它通过引入空白符 ∅ 和多对一的对齐方式，解决了输入输出长度不等的问题。然而，CTC 有一个关键假设——<strong>输出标签在给定输入的条件下是相互独立的</strong>：</p>\n<div class=\"kb-math kb-math-display\">P(\\mathbf{y} | \\mathbf{x}) = \\prod_{u=1}^{U} P(y_u | \\mathbf{x})</div>\n<p>这意味着 CTC 无法利用输出标签之间的上下文信息（例如语音识别中，知道前一个音素是 /k/ 会大大提高下一个音素是 /æ/ 的概率）。</p>\n<p><strong>RNN-T 的解决方案</strong>：RNN Transducer 通过引入一个独立的 Prediction Network 来显式建模输出序列的先验分布，从而打破了 CTC 的条件独立假设。这使得模型能够同时利用声学信息（来自编码器）和语言信息（来自解码器），类似于传统语音识别系统中声学模型与语言模型的结合，但以端到端的方式实现。</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：RNN-T = CTC（处理输入-输出对齐）+ 语言模型（建模输出依赖），两者通过 Joint Network 无缝融合。</div>\n<h5>核心机制详解</h5>\n<p><strong>1. Transcription Network（编码器）</strong></p>\n<p>编码器 <span class=\"kb-math kb-math-inline\">\\mathcal{F}</span> 将长度为 <span class=\"kb-math kb-math-inline\">T</span> 的输入序列 <span class=\"kb-math kb-math-inline\">\\mathbf{x} = (x_1, \\ldots, x_T)</span> 映射为等长的隐表示序列 <span class=\"kb-math kb-math-inline\">\\mathbf{f} = (f_1, \\ldots, f_T)</span>。论文中使用<strong>双向 LSTM</strong>，使得每个 <span class=\"kb-math kb-math-inline\">f_t</span> 能捕获整个输入序列的上下文信息：</p>\n<div class=\"kb-math kb-math-display\">f_t = \\text{BiLSTM}(x_1, \\ldots, x_T)[t]</div>\n<p>编码器的输出 <span class=\"kb-math kb-math-inline\">f_t \\in \\mathbb{R}^{K+1}</span>，其中 <span class=\"kb-math kb-math-inline\">K</span> 是输出标签集大小（不含空白符），额外的一维对应空白符 ∅。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：使用双向 LSTM 意味着编码器需要看到完整输入才能产生输出，这在离线场景下没有问题，但在流式场景中需要替换为单向或分块（chunk）结构。后续的流式 RNN-T 工作正是针对这一点进行改进。</div>\n<p><strong>2. Prediction Network（解码器）</strong></p>\n<p>解码器 <span class=\"kb-math kb-math-inline\">\\mathcal{G}</span> 将已输出的标签序列 <span class=\"kb-math kb-math-inline\">\\hat{\\mathbf{y}} = (y_0, y_1, \\ldots, y_{u-1})</span> 映射为预测向量 <span class=\"kb-math kb-math-inline\">g_u</span>，其中 <span class=\"kb-math kb-math-inline\">y_0</span> 是特殊的起始符号。论文使用<strong>单向 LSTM</strong>：</p>\n<div class=\"kb-math kb-math-display\">g_u = \\text{LSTM}(y_0, y_1, \\ldots, y_{u-1})[u]</div>\n<p>解码器的输出 <span class=\"kb-math kb-math-inline\">g_u \\in \\mathbb{R}^{K+1}</span>，与编码器输出维度相同。</p>\n<p>关键特性：\n- 解码器<strong>仅依赖之前的输出标签</strong>，不接收任何输入序列的信息\n- 这使其本质上是一个<strong>条件语言模型</strong>，独立学习输出序列的统计规律\n- 在推理时，解码器可以增量式运行：每输出一个新标签，只需执行一步 LSTM 前向传播</p>\n<p><strong>3. Joint Network（联合网络）</strong></p>\n<p>Joint Network 是 RNN-T 最核心的创新。它将编码器和解码器的输出融合为一个联合概率分布。对于格点 <span class=\"kb-math kb-math-inline\">(t, u)</span> 上的标签 <span class=\"kb-math kb-math-inline\">k</span>：</p>\n<div class=\"kb-math kb-math-display\">h(k, t, u) = \\exp\\left(f_t^k + g_u^k\\right)</div>\n<div class=\"kb-math kb-math-display\">P(k \\mid t, u) = \\frac{h(k, t, u)}{\\sum_{k&#x27;=0}^{K} h(k&#x27;, t, u)}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">f_t^k</span> 是编码器在时间步 <span class=\"kb-math kb-math-inline\">t</span> 的第 <span class=\"kb-math kb-math-inline\">k</span> 维输出，<span class=\"kb-math kb-math-inline\">g_u^k</span> 是解码器在输出步 <span class=\"kb-math kb-math-inline\">u</span> 的第 <span class=\"kb-math kb-math-inline\">k</span> 维输出。</p>\n<div class=\"key-point\">💡 <strong>设计直觉</strong>：加法耦合 <span class=\"kb-math kb-math-inline\">f_t^k + g_u^k</span> 在 softmax 之前等价于对数域的乘法，即 <span class=\"kb-math kb-math-inline\">P(k|t,u) \\propto P_{\\text{acoustic}}(k|t) \\cdot P_{\\text{language}}(k|u)</span>。这与传统语音识别中声学得分和语言模型得分的对数线性插值异曲同工，但这里两个分量是联合训练的。</div>\n<p><strong>4. 转导格（Transduction Lattice）与对齐</strong></p>\n<p>RNN-T 的核心数据结构是一个 <span class=\"kb-math kb-math-inline\">T \\times (U+1)</span> 的转导格。格点 <span class=\"kb-math kb-math-inline\">(t, u)</span> 表示\"已处理 <span class=\"kb-math kb-math-inline\">t</span> 个输入帧，已输出 <span class=\"kb-math kb-math-inline\">u</span> 个标签\"的状态。从格点出发有两种转移：</p>\n<ul>\n<li><strong>水平移动</strong> <span class=\"kb-math kb-math-inline\">(t, u) \\to (t+1, u)</span>：输出空白符 ∅，概率为 <span class=\"kb-math kb-math-inline\">P(\\varnothing \\mid t, u)</span>，表示\"当前输入帧不产生新标签，前进到下一帧\"</li>\n<li><strong>垂直移动</strong> <span class=\"kb-math kb-math-inline\">(t, u) \\to (t, u+1)</span>：输出标签 <span class=\"kb-math kb-math-inline\">y_{u+1}</span>，概率为 <span class=\"kb-math kb-math-inline\">P(y_{u+1} \\mid t, u)</span>，表示\"在当前帧位置发射一个标签\"</li>\n</ul>\n<p>一条从 <span class=\"kb-math kb-math-inline\">(1, 0)</span> 到 <span class=\"kb-math kb-math-inline\">(T, U)</span> 的完整路径定义了一种输入-输出对齐方式。目标序列 <span class=\"kb-math kb-math-inline\">\\mathbf{y}</span> 的总概率是所有有效路径概率之和：</p>\n<div class=\"kb-math kb-math-display\">P(\\mathbf{y} \\mid \\mathbf{x}) = \\sum_{\\text{all valid paths}} \\prod_{\\text{transitions}} P(k \\mid t, u)</div>\n<h5>训练：前向-后向算法</h5>\n<p>直接枚举所有路径在计算上不可行（路径数量是指数级的）。RNN-T 使用类似 HMM 的前向-后向算法，通过动态规划高效计算。</p>\n<p><strong>前向变量</strong> <span class=\"kb-math kb-math-inline\">\\alpha(t, u)</span> 定义为所有从 <span class=\"kb-math kb-math-inline\">(1, 0)</span> 到 <span class=\"kb-math kb-math-inline\">(t, u)</span> 的路径概率之和：</p>\n<div class=\"kb-math kb-math-display\">\\alpha(t, u) = \\alpha(t-1, u) \\cdot P(\\varnothing \\mid t-1, u) + \\alpha(t, u-1) \\cdot P(y_u \\mid t, u-1)</div>\n<p>初始条件 <span class=\"kb-math kb-math-inline\">\\alpha(1, 0) = 1</span>，最终概率为 <span class=\"kb-math kb-math-inline\">P(\\mathbf{y} \\mid \\mathbf{x}) = \\alpha(T, U) \\cdot P(\\varnothing \\mid T, U)</span>。</p>\n<p><strong>后向变量</strong> <span class=\"kb-math kb-math-inline\">\\beta(t, u)</span> 类似地从终点向起点递推。前向和后向变量结合后，可以计算每个格点上每个转移的后验概率，从而得到损失函数对网络参数的梯度。</p>\n<p>训练损失为负对数似然：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = -\\ln P(\\mathbf{y} \\mid \\mathbf{x})</div>\n<p>整个前向-后向计算的时间复杂度为 <span class=\"kb-math kb-math-inline\">O(T \\cdot U \\cdot K)</span>，空间复杂度为 <span class=\"kb-math kb-math-inline\">O(T \\cdot U)</span>。</p>\n<h5>推理：Beam Search</h5>\n<p>推理时无法使用前向-后向算法（因为目标序列未知），而是采用 Beam Search。核心思想是维护一个大小为 <span class=\"kb-math kb-math-inline\">W</span> 的候选集合，在每个输入时间步扩展候选并剪枝。</p>\n<p>关键优化：由于 Prediction Network 的隐状态仅依赖已输出的标签序列，可以<strong>缓存每个候选前缀的 LSTM 隐状态</strong>。当候选扩展一个新标签时，只需从缓存的隐状态执行一步 LSTM 前向传播，避免了重复计算。</p>\n<p>论文还引入了<strong>长度归一化</strong>，将路径的对数概率除以输出长度，防止短序列被系统性地偏好。</p>\n<h5>与 CTC 及传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>HMM</th>\n<th>CTC</th>\n<th>RNN-T</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>端到端训练</td>\n<td>❌</td>\n<td>✅</td>\n<td>✅</td>\n</tr>\n<tr>\n<td>输出依赖建模</td>\n<td>通过语言模型（外部）</td>\n<td>❌（条件独立）</td>\n<td>✅（Prediction Network）</td>\n</tr>\n<tr>\n<td>需要预定义对齐</td>\n<td>✅</td>\n<td>❌</td>\n<td>❌</td>\n</tr>\n<tr>\n<td>流式推理潜力</td>\n<td>✅</td>\n<td>✅</td>\n<td>✅（编码器需改为单向）</td>\n</tr>\n<tr>\n<td>联合声学+语言建模</td>\n<td>分离式</td>\n<td>仅声学</td>\n<td>联合端到端</td>\n</tr>\n</tbody>\n</table></div>\n<p>在 TIMIT 音素识别实验中：\n- <strong>CTC 单独</strong>：23.0% PER（仅利用声学信息）\n- <strong>Prediction Network 单独</strong>：45.9% 错误率（仅利用语言信息，相当于音素级语言模型）\n- <strong>RNN-T 联合</strong>：20.4% PER（声学+语言信息融合，相对 CTC 降低 11.3%）</p>\n<p>这一结果有力地证明了 Prediction Network 对输出依赖的建模能够为声学模型提供互补信息。</p>\n<div class=\"key-point\">💡 <strong>历史意义</strong>：RNN-T 是现代端到端语音识别的奠基架构之一。Google 在 2019 年将其部署到手机端语音识别系统中，实现了首个完全在设备上运行的端到端语音识别模型。后续的 Transformer-Transducer、Conformer-Transducer 等工作均沿用了 RNN-T 的核心框架。</div>",
      "quiz": {
        "q": "RNN Transducer 相比 CTC 的核心改进是什么？",
        "options": [
          "使用了更深的编码器网络提升特征提取能力",
          "引入 Prediction Network 建模输出标签间的依赖关系",
          "采用注意力机制替代了固定的对齐方式",
          "使用了更高效的束搜索解码算法"
        ],
        "answer": 1,
        "explain": "RNN-T 的核心创新是在 CTC 框架上增加了 Prediction Network（类似语言模型），通过 Joint Network 将声学信息和语言信息融合，打破了 CTC 的输出条件独立假设。"
      }
    },
    {
      "id": "i_vector",
      "num": 3,
      "name": "i-vector",
      "fullName": "身份向量 (i-vector)",
      "year": "2011",
      "org": "蒙特利尔大学",
      "parent": "—",
      "paperUrl": "https://ieeexplore.ieee.org/document/5545402",
      "projectUrl": "",
      "category": "speaker",
      "motivation": "全变分空间因子分析",
      "summary": "i-vector 的核心目标是：全变分空间因子分析。",
      "keyPoints": [
        "核心动机：全变分空间因子分析",
        "代表机构：蒙特利尔大学"
      ],
      "detail": "<p>全变分空间因子分析</p>"
    },
    {
      "id": "d_vector",
      "num": 4,
      "name": "d-vector",
      "fullName": "深度向量 (d-vector)",
      "year": "2014",
      "org": "Google",
      "parent": "i_vector",
      "paperUrl": "https://ieeexplore.ieee.org/document/6854363",
      "projectUrl": "",
      "category": "speaker",
      "motivation": "DNN隐藏层说话人表征",
      "summary": "本文提出 **d-vector** 方法：训练一个 DNN 对说话人进行帧级分类，然后提取最后隐藏层的激活输出并取均值作为说话人表征（d-vector），在小内存文本相关说话人验证任务上取得了与 i-vector 系统可比的性能，且在噪声条件下更鲁棒，两者融合后 EER 相对降低 14%（干净）和 25%（噪声）。",
      "keyPoints": [
        "<strong>核心创新</strong>：首次提出 d-vector 概念——将 DNN 最后隐藏层的帧级输出经 L2 归一化后取均值，作为固定维度的说话人表征，开创了基于深度学习的说话人嵌入范式",
        "<strong>轻量级设计</strong>：整个 DNN 仅含 4 个隐藏层、每层 256 节点，约 600K 参数，与最小的 i-vector 基线系统（540K 参数）相当，适合端侧部署",
        "<strong>训练策略</strong>：采用 Maxout + Dropout 技术应对小数据集过拟合问题，前两层不使用 dropout，后两层 50% dropout",
        "<strong>噪声鲁棒性</strong>：d-vector 系统在噪声条件下性能退化更小，且在低 False Rejection 操作点优于 i-vector 系统",
        "<strong>互补融合</strong>：i-vector 与 d-vector 系统具有互补性，简单 sum fusion 即可带来显著提升（干净 14%、噪声 25% 相对 EER 降低）",
        "<strong>泛化能力</strong>：DNN 在开发集说话人上训练的隐藏层表征能够泛化到未见过的新说话人"
      ],
      "detail": "<h5>4.1 系统架构图</h5>\n<div class=\"img-wrap\"><img src=\"../../content/mm/mm_sound/assets/assets/d_vector_fig_p1_0.png\" alt=\"D-Vector DNN 架构\" loading=\"lazy\"><p class=\"img-caption\">▲ D-Vector DNN 架构</p></div>\n<p><strong>图 1</strong>：D-Vector 背景 DNN 模型架构。输入为 40 维 log filterbank 特征拼接上下文帧（左 30 帧 + 右 10 帧），经过 4 个隐藏层（每层 256 节点，使用 Maxout 池化，pool size=2），最后一层隐藏层的输出即为 d-vector 的来源。输出层为 softmax，维度等于开发集说话人数（496）。前两层不使用 dropout，后两层使用 50% dropout。</p>\n<h5>4.2 算法伪代码</h5>\n<pre><code>算法: D-Vector 说话人验证系统\n\n═══════════════════════════════════════════\n阶段一: 开发阶段 (Development)\n═══════════════════════════════════════════\n输入: 开发集语音数据 {(x_t, spk_id)}, 共 N_spk 个说话人\n输出: 训练好的 DNN 模型 θ\n\n1. 提取 40 维 log filterbank 特征\n2. 对每帧拼接上下文窗口 [t-30, ..., t, ..., t+10]\n3. 构建 Maxout DNN:\n   - 4 个隐藏层, 每层 256 节点\n   - Maxout pool size = 2\n   - 前 2 层: 无 dropout\n   - 后 2 层: 50% dropout\n   - 输出层: softmax, 维度 = N_spk\n4. 使用 SGD 训练, lr=0.001, 指数衰减(0.1/5M步)\n5. 损失函数: 交叉熵 (帧级说话人分类)\n\n═══════════════════════════════════════════\n阶段二: 注册阶段 (Enrollment)\n═══════════════════════════════════════════\n输入: 说话人 s 的注册语音集 X_s = {O_s1, ..., O_sn}\n输出: 说话人 s 的 d-vector 模型 v_s\n\nFOR 每条注册语音 O_si:\n    FOR 每帧 o_j ∈ O_si:\n        1. 拼接上下文 → 输入向量\n        2. 前向传播至最后隐藏层 → h_j\n        3. L2 归一化: h_j ← h_j / ||h_j||₂\n    END FOR\n    4. 帧级聚合: d_si = (1/m) Σ_j h_j   // 该语音的 d-vector\nEND FOR\n5. 说话人模型: v_s = (1/n) Σ_i d_si     // 多条语音取均值\n\n═══════════════════════════════════════════\n阶段三: 评估阶段 (Evaluation)\n═══════════════════════════════════════════\n输入: 测试语音 O_test, 声称身份 s, 阈值 τ\n输出: 接受/拒绝\n\n1. 提取测试语音的 d-vector: d_test (同注册流程)\n2. 计算余弦距离: score = cos(d_test, v_s)\n3. 判决: IF score &gt; τ THEN 接受 ELSE 拒绝\n</code></pre>\n<h5>4.3 方法详解</h5>\n<p><strong>动机与背景。</strong> 传统说话人验证系统基于 i-vector + PLDA 框架，其中 i-vector 通过联合因子分析（JFA）从 GMM-UBM 的充分统计量中提取低维说话人表征。然而，i-vector 系统在小内存场景下面临模型参数量大的挑战（即使最小配置也需要 540K 参数），且对噪声较为敏感。受 DNN 在语音识别领域的巨大成功启发，作者提出利用 DNN 强大的特征提取能力来直接建模说话人空间，将 DNN 隐藏层的输出作为一种新的说话人表征。</p>\n<p><strong>核心机制：从分类到表征。</strong> D-vector 方法的核心思想是\"训练时做分类，推理时取表征\"。在开发阶段，DNN 被训练为一个帧级说话人分类器，目标是将每帧语音映射到对应的说话人 ID。训练完成后，<strong>丢弃 softmax 输出层</strong>，仅保留最后隐藏层的输出作为说话人特征。选择最后隐藏层而非 softmax 层有两个原因：（1）可以裁剪输出层以减小运行时模型大小，且允许使用大量开发集说话人而不增加运行时 DNN 尺寸；（2）实验观察到最后隐藏层的输出对未见说话人具有更好的泛化能力。</p>\n<p><strong>DNN 架构与训练细节。</strong> 具体而言，DNN 采用 Maxout 架构配合 Dropout 正则化来应对小数据集的过拟合问题。Maxout 网络将每层的隐藏单元分成不重叠的组，每组通过 max pooling 操作生成单个激活值，这使得网络能够为每个单元优化激活函数。网络结构为 4 个隐藏层，每层 256 个节点，pool size 为 2。输入特征为 40 维 log filterbank 能量，拼接上下文窗口（左 30 帧 + 右 10 帧），总输入维度为 $40 \\times 41 = 1640$。输出层维度为 496（开发集说话人数）。训练在 DistBelief 分布式框架上完成，使用 ReLU 激活函数，学习率 0.001 并以指数方式衰减。最终模型仅约 600K 参数。</p>\n<p><strong>注册与评估流程。</strong> 注册阶段，对说话人的每条注册语音，将每帧通过 DNN 前向传播获取最后隐藏层输出，经 L2 归一化后在帧维度上取均值，得到该语音的 d-vector。多条注册语音的 d-vector 再取均值作为最终说话人模型。评估阶段，提取测试语音的 d-vector，与注册说话人的 d-vector 计算余弦距离，与阈值比较做出验证决策。值得注意的是，d-vector 系统的原始分数（raw scores）略优于 t-norm 归一化后的分数，这与 i-vector 系统相反，原因是 d-vector 的分数分布呈重尾分布而非正态分布。</p>\n<p><strong>实验结果与对比。</strong> 在\"OK Google\"文本相关验证任务上（646 说话人，496 训练 + 150 测试），d-vector 系统取得 4.54% EER（raw scores），而 i-vector 基线为 2.83% EER（t-norm）。虽然整体 EER 略逊，但 d-vector 在低 False Rejection 区域表现更优。在噪声条件下（babble noise, 10dB SNR），d-vector 系统的性能退化明显小于 i-vector 系统。两者的简单 sum fusion 在干净条件下取得 2.43% EER（相对 i-vector 降低 14%），在噪声条件下取得 3.42% EER（相对降低 25%），证明了两种方法的互补性。增加注册语音数量（从 4 条到 20 条）可持续提升两个系统的性能。</p>\n<h5>4.4 关键公式</h5>\n<p><strong>d-vector 提取（帧级聚合）：</strong></p>\n<div class=\"kb-math kb-math-display\">\\mathbf{d}_s = \\frac{1}{M} \\sum_{j=1}^{M} \\frac{\\mathbf{h}_j}{\\|\\mathbf{h}_j\\|_2}</div>\n<p>其中 $\\mathbf{h}_j$ 为第 $j$ 帧通过 DNN 最后隐藏层的输出向量，$M$ 为总帧数。先对每帧输出做 L2 归一化，再取均值。</p>\n<p><strong>余弦距离评分：</strong></p>\n<div class=\"kb-math kb-math-display\">\\text{score}(s, \\text{test}) = \\frac{\\mathbf{v}_s \\cdot \\mathbf{d}_{\\text{test}}}{\\|\\mathbf{v}_s\\| \\cdot \\|\\mathbf{d}_{\\text{test}}\\|}</div>\n<p>其中 $\\mathbf{v}<em _text_test=\"\\text{test\">s$ 为注册说话人的 d-vector 模型，$\\mathbf{d}</em>$ 为测试语音的 d-vector。}</p>\n<p><strong>Maxout 激活函数：</strong></p>\n<div class=\"kb-math kb-math-display\">h_i^{(l)} = \\max_{k \\in \\text{group}_i} z_k^{(l)}</div>\n<p>其中 $z_k^{(l)} = \\mathbf{w}_k^{(l)T} \\mathbf{x} + b_k^{(l)}$ 为第 $l$ 层第 $k$ 个线性单元的输出，每组（pool size=2）取最大值作为该组的激活输出。</p>\n<p><strong>DNN 训练目标（帧级交叉熵）：</strong></p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = -\\sum_{t} \\sum_{c=1}^{C} y_{t,c} \\log p_{t,c}</div>\n<p>其中 $y_{t,c}$ 为第 $t$ 帧的说话人标签 one-hot 编码，$p_{t,c}$ 为 softmax 输出的第 $c$ 个说话人的后验概率，$C=496$ 为开发集说话人总数。</p>",
      "quiz": {
        "q": "",
        "options": [],
        "answer": 0,
        "explain": ""
      }
    },
    {
      "id": "x_vector",
      "num": 5,
      "name": "x-vector",
      "fullName": "扩展向量 (x-vector)",
      "year": "2018",
      "org": "JHU",
      "parent": "d_vector",
      "paperUrl": "https://ieeexplore.ieee.org/document/8461375",
      "projectUrl": "",
      "category": "speaker",
      "motivation": "TDNN+统计池化嵌入",
      "summary": "x-vector 提出了基于 TDNN（时延神经网络）和统计池化层的说话人嵌入提取框架，并通过数据增强（加噪 + 混响）大幅提升了 DNN 嵌入在说话人识别任务上的鲁棒性和性能，全面超越了传统 i-vector 基线系统。",
      "keyPoints": [
        "<strong>TDNN 帧级特征提取</strong>：5 层时延神经网络逐步扩大时间上下文窗口（最终覆盖 15 帧），捕获短时说话人特征",
        "<strong>统计池化层</strong>：对帧级输出计算均值和标准差，将变长语音段映射为固定维度（3000 维）的段级表示",
        "<strong>x-vector 嵌入</strong>：从段级全连接层（segment6）的仿射变换输出提取 512 维嵌入向量，作为说话人表示",
        "<strong>说话人分类训练</strong>：以 softmax 交叉熵损失训练 DNN 区分训练集中的所有说话人，训练完成后丢弃分类层",
        "<strong>数据增强策略</strong>：3 倍增强（原始 + 2 份增强副本），包括 babble 噪声、音乐叠加、环境噪声、模拟混响四种方式",
        "<strong>PLDA 后端评分</strong>：提取的 x-vector 经 LDA 降维（150 维）、长度归一化后，使用 PLDA 进行说话人验证评分",
        "<strong>关键发现</strong>：数据增强对有监督训练的 DNN 提取器高度有效，但对无监督的 i-vector 提取器（UBM/T）无明显帮助",
        "<strong>评估基准</strong>：在 SITW Core 和 NIST SRE 2016 Cantonese 上全面超越 acoustic i-vector 和 BNF i-vector 基线"
      ],
      "detail": "<h5>架构总览</h5>\n<p>x-vector 系统的核心是一个 TDNN（Time-Delay Neural Network），它将变长语音输入映射为固定维度的说话人嵌入。整体流程分为三个阶段：<strong>帧级特征提取 → 统计池化聚合 → 段级嵌入生成</strong>。</p>\n<pre><code>输入: 24维滤波器组特征 (T帧)\n        │\n        ▼\n┌─────────────────────────────┐\n│  frame1: splice [t-2,t+2]   │  120→512, 上下文5帧\n│  frame2: splice {t-2,t,t+2} │  1536→512, 上下文9帧\n│  frame3: splice {t-3,t,t+3} │  1536→512, 上下文15帧\n│  frame4: {t}                 │  512→512\n│  frame5: {t}                 │  512→1500\n│         (所有层使用 ReLU)     │\n└─────────────┬───────────────┘\n              │ T个1500维帧级输出\n              ▼\n┌─────────────────────────────┐\n│     Statistics Pooling       │\n│  计算均值μ和标准差σ           │\n│  输出: [μ; σ] = 3000维       │\n└─────────────┬───────────────┘\n              │ 固定3000维\n              ▼\n┌─────────────────────────────┐\n│  segment6: 3000→512 (ReLU)  │ ← x-vector提取点\n│  segment7: 512→512  (ReLU)  │\n│  softmax:  512→N            │ ← 训练时使用,推理时丢弃\n└─────────────────────────────┘\n</code></pre>\n<p><em>图：x-vector TDNN 架构示意。帧级层逐步扩大时间上下文，统计池化层将变长帧序列聚合为固定维度表示，段级层生成最终嵌入。</em></p>\n<div class=\"key-point\">💡 <strong>关键</strong>：x-vector 从 segment6 层的<strong>仿射变换输出（非线性激活之前）</strong>提取，维度为 512。整个网络（不含 softmax 和 segment7）共 4.2M 参数。</div>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># x-vector 训练与提取流程\n\n# === 训练阶段 ===\n# 输入: 带说话人标签的语音数据集 {(x_i, y_i)}\n# x_i: 变长语音段的24维滤波器组特征序列\n# y_i: 说话人标签 (共N个说话人)\n\nfor epoch in range(num_epochs):\n    for chunk, speaker_label in training_data:\n        # chunk: ~3秒语音片段, shape = (T, 24)\n\n        # 1. 帧级TDNN前向传播\n        h = chunk                          # (T, 24)\n        h = ReLU(TDNN_frame1(h))           # (T, 512), ctx=5\n        h = ReLU(TDNN_frame2(h))           # (T, 512), ctx=9\n        h = ReLU(TDNN_frame3(h))           # (T, 512), ctx=15\n        h = ReLU(FC_frame4(h))             # (T, 512)\n        h = ReLU(FC_frame5(h))             # (T, 1500)\n\n        # 2. 统计池化\n        mean = h.mean(dim=0)               # (1500,)\n        std  = h.std(dim=0)                # (1500,)\n        pooled = concat(mean, std)         # (3000,)\n\n        # 3. 段级层 + 分类\n        seg6 = ReLU(FC_segment6(pooled))   # (512,)\n        seg7 = ReLU(FC_segment7(seg6))     # (512,)\n        logits = Softmax_layer(seg7)       # (N,)\n\n        # 4. 交叉熵损失优化\n        loss = CrossEntropy(logits, speaker_label)\n        loss.backward()\n        optimizer.step()\n\n# === 提取阶段 ===\ndef extract_xvector(utterance_features):\n    h = forward_through_frame_layers(utterance_features)\n    mean, std = statistics_pooling(h)\n    pooled = concat(mean, std)\n    x_vector = FC_segment6.affine(pooled)  # 仿射变换,无ReLU!\n    return x_vector  # 512维\n\n# === 后端评分 ===\n# x-vector → 中心化 → LDA(150维) → 长度归一化 → PLDA评分\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统说话人识别系统以 <strong>i-vector</strong> 为核心表示。i-vector 通过无监督方式（GMM-UBM + 全变量矩阵 T）将高维统计量投影到低维空间。虽然 i-vector 系统成熟稳定，但存在以下局限：</p>\n<ol>\n<li><strong>无监督训练</strong>：UBM 和 T 矩阵的训练不直接优化说话人区分目标，限制了表示的判别能力</li>\n<li><strong>数据利用效率低</strong>：i-vector 系统难以有效利用大规模训练数据，性能提升趋于饱和</li>\n<li><strong>依赖 ASR 辅助</strong>：最强的 i-vector 系统（BNF i-vector）需要 ASR DNN 提取瓶颈特征，引入了对转录数据的依赖，且 BNF 在非英语语言上的增益不稳定</li>\n</ol>\n<p>x-vector 的核心动机是：<strong>用有监督的 DNN 直接学习说话人判别性嵌入</strong>，同时保留 i-vector 生态中成熟的后端技术（PLDA、长度归一化、域适应等）。</p>\n<h5>核心机制详解</h5>\n<p><strong>1. TDNN 帧级特征提取</strong></p>\n<p>TDNN 的关键设计是<strong>稀疏时间上下文拼接</strong>。与标准 CNN 不同，TDNN 各层只在特定时间偏移处拼接输入，而非连续滑窗：</p>\n<ul>\n<li>frame1：拼接 <span class=\"kb-math kb-math-inline\">[t-2, t+2]</span> 共 5 帧，输入维度 <span class=\"kb-math kb-math-inline\">24 \\times 5 = 120</span></li>\n<li>frame2：拼接 <span class=\"kb-math kb-math-inline\">\\{t-2, t, t+2\\}</span> 共 3 个位置，输入维度 <span class=\"kb-math kb-math-inline\">512 \\times 3 = 1536</span></li>\n<li>frame3：拼接 <span class=\"kb-math kb-math-inline\">\\{t-3, t, t+3\\}</span> 共 3 个位置，输入维度 <span class=\"kb-math kb-math-inline\">512 \\times 3 = 1536</span></li>\n</ul>\n<p>通过层层叠加，frame3 的有效感受野达到 15 帧（约 200ms），足以捕获音素级和短时说话人特征。frame4 和 frame5 不再扩展上下文，仅做非线性变换，将维度从 512 提升到 1500。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：稀疏拼接策略在保持较大感受野的同时，大幅减少了参数量（相比全连接拼接所有帧）。</div>\n<p><strong>2. 统计池化层</strong></p>\n<p>统计池化是 x-vector 架构中最关键的创新之一。它解决了<strong>变长输入到固定维度输出</strong>的映射问题：</p>\n<div class=\"kb-math kb-math-display\">\\boldsymbol{\\mu} = \\frac{1}{T} \\sum_{t=1}^{T} \\mathbf{h}_t, \\quad \\boldsymbol{\\sigma} = \\sqrt{\\frac{1}{T} \\sum_{t=1}^{T} (\\mathbf{h}_t - \\boldsymbol{\\mu})^2}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{h}_t \\in \\mathbb{R}^{1500}</span> 是 frame5 在时刻 <span class=\"kb-math kb-math-inline\">t</span> 的输出。均值 <span class=\"kb-math kb-math-inline\">\\boldsymbol{\\mu}</span> 捕获平均说话人特性，标准差 <span class=\"kb-math kb-math-inline\">\\boldsymbol{\\sigma}</span> 捕获帧间变异性（如语速、韵律变化）。两者拼接后得到 3000 维的段级表示。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：统计池化使得后续的段级层可以\"看到\"整段语音的全局信息，这是从帧级处理到段级处理的关键转换点。</div>\n<p><strong>3. 段级层与嵌入提取</strong></p>\n<p>段级层由两个全连接层组成（segment6: 3000→512, segment7: 512→512），均使用 ReLU 激活。最终的 softmax 层输出 <span class=\"kb-math kb-math-inline\">N</span> 维概率分布（<span class=\"kb-math kb-math-inline\">N</span> 为训练说话人数量）。</p>\n<p>x-vector 的提取位置经过精心选择：<strong>segment6 的仿射变换输出（激活函数之前）</strong>。这一选择的直觉是：仿射变换的输出保留了更丰富的连续值信息，而 ReLU 会将负值截断为零，丢失部分判别信息。</p>\n<p><strong>4. 数据增强策略</strong></p>\n<p>数据增强是本文的核心贡献之一。采用 <strong>3 倍增强</strong>策略：保留原始\"干净\"训练集，再生成 2 份增强副本。每条录音随机选择以下一种增强方式：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>增强类型</th>\n<th>具体操作</th>\n<th>SNR 范围</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Babble</td>\n<td>随机选 3-7 个说话人语音叠加</td>\n<td>13-20 dB</td>\n</tr>\n<tr>\n<td>Music</td>\n<td>随机选 1 段音乐叠加</td>\n<td>5-15 dB</td>\n</tr>\n<tr>\n<td>Noise</td>\n<td>每秒间隔添加 MUSAN 噪声</td>\n<td>0-15 dB</td>\n</tr>\n<tr>\n<td>Reverb</td>\n<td>与模拟 RIR 卷积</td>\n<td>—</td>\n</tr>\n</tbody>\n</table></div>\n<p>噪声和音乐来自 MUSAN 数据集，RIR 来自 Ko et al. 的模拟房间脉冲响应，均为公开可用资源。</p>\n<div class=\"key-point\">💡 <strong>关键发现</strong>：数据增强对 DNN 提取器（有监督训练）效果显著，但对 i-vector 提取器（UBM/T，无监督训练）几乎无帮助。这是因为有监督训练能够学习到\"忽略噪声、关注说话人特征\"的判别能力，而无监督的最大似然训练无法从增强数据中获得这种判别性。</div>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>i-vector (acoustic)</th>\n<th>i-vector (BNF)</th>\n<th>x-vector</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>提取器训练方式</td>\n<td>无监督 (GMM-UBM + T)</td>\n<td>无监督 + ASR DNN</td>\n<td>有监督 (说话人分类)</td>\n</tr>\n<tr>\n<td>是否需要转录数据</td>\n<td>否</td>\n<td>是</td>\n<td>否（仅需说话人标签）</td>\n</tr>\n<tr>\n<td>数据增强对提取器的效果</td>\n<td>无效/不一致</td>\n<td>无效/不一致</td>\n<td>高度有效</td>\n</tr>\n<tr>\n<td>数据规模可扩展性</td>\n<td>有限</td>\n<td>有限</td>\n<td>高度可扩展</td>\n</tr>\n<tr>\n<td>参数量</td>\n<td>UBM+T 较大</td>\n<td>UBM+T+ASR DNN</td>\n<td>4.2M（紧凑）</td>\n</tr>\n<tr>\n<td>SITW EER（最优配置）</td>\n<td>7.45%</td>\n<td>6.09%</td>\n<td><strong>4.16%</strong></td>\n</tr>\n<tr>\n<td>SRE16 EER（最优配置）</td>\n<td>9.23%</td>\n<td>8.12%</td>\n<td><strong>5.71%</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>x-vector 的核心优势在于：\n1. <strong>仅需说话人标签</strong>，无需转录数据，适用于低资源语言\n2. <strong>数据增强高度有效</strong>，可通过廉价的增强策略大幅提升性能\n3. <strong>可扩展性强</strong>，加入 VoxCeleb 数据后性能持续提升（SITW EER 从 6.00% 降至 4.16%）\n4. <strong>与 i-vector 后端兼容</strong>，可直接复用 PLDA、s-norm 等成熟技术</p>",
      "quiz": {
        "q": "x-vector 系统中，统计池化层的主要作用是什么？",
        "options": [
          "对帧级特征进行降维以减少计算量",
          "将变长帧级特征序列聚合为固定维度的段级表示",
          "对输入特征进行数据增强以提升鲁棒性",
          "计算说话人之间的相似度得分"
        ],
        "answer": 1,
        "explain": "统计池化层对所有帧级输出计算均值和标准差，将任意长度T的帧序列映射为固定的3000维向量，是从帧级处理过渡到段级处理的关键机制。"
      }
    },
    {
      "id": "ecapa_tdnn",
      "num": 6,
      "name": "ECAPA-TDNN",
      "fullName": "通道注意力TDNN (ECAPA-TDNN)",
      "year": "2020",
      "org": "根特大学",
      "parent": "x_vector",
      "paperUrl": "https://arxiv.org/abs/2005.07143",
      "projectUrl": "",
      "category": "speaker",
      "motivation": "通道注意力与多尺度聚合",
      "summary": "ECAPA-TDNN 的核心目标是：通道注意力与多尺度聚合。",
      "keyPoints": [
        "核心动机：通道注意力与多尺度聚合",
        "演化来源：继承或改进自 x_vector",
        "代表机构：根特大学"
      ],
      "detail": "<p>通道注意力与多尺度聚合</p>"
    },
    {
      "id": "wav2vec2",
      "num": 7,
      "name": "wav2vec 2.0",
      "fullName": "自监督语音表征学习 (wav2vec 2.0)",
      "year": "2020",
      "org": "Facebook AI",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2006.11477",
      "projectUrl": "",
      "category": "ssl_representation",
      "motivation": "对比学习+掩码预测预训练",
      "summary": "wav2vec 2.0 的核心目标是：对比学习+掩码预测预训练。",
      "keyPoints": [
        "核心动机：对比学习+掩码预测预训练",
        "代表机构：Facebook AI"
      ],
      "detail": "<p>对比学习+掩码预测预训练</p>"
    },
    {
      "id": "conformer",
      "num": 8,
      "name": "Conformer",
      "fullName": "卷积增强Transformer (Conformer)",
      "year": "2020",
      "org": "Google",
      "parent": "rnn_t",
      "paperUrl": "https://arxiv.org/abs/2005.08100",
      "projectUrl": "",
      "category": "asr",
      "motivation": "CNN+Transformer混合架构",
      "summary": "Conformer 的核心目标是：CNN+Transformer混合架构。",
      "keyPoints": [
        "核心动机：CNN+Transformer混合架构",
        "演化来源：继承或改进自 rnn_t",
        "代表机构：Google"
      ],
      "detail": "<p>CNN+Transformer混合架构</p>"
    },
    {
      "id": "hubert",
      "num": 9,
      "name": "HuBERT",
      "fullName": "隐藏单元BERT (Hidden-Unit BERT)",
      "year": "2021",
      "org": "Facebook AI",
      "parent": "wav2vec2",
      "paperUrl": "https://arxiv.org/abs/2106.07447",
      "projectUrl": "",
      "category": "ssl_representation",
      "motivation": "离线聚类伪标签迭代训练",
      "summary": "HuBERT 的核心目标是：离线聚类伪标签迭代训练。",
      "keyPoints": [
        "核心动机：离线聚类伪标签迭代训练",
        "演化来源：继承或改进自 wav2vec2",
        "代表机构：Facebook AI"
      ],
      "detail": "<p>离线聚类伪标签迭代训练</p>"
    },
    {
      "id": "wavlm",
      "num": 10,
      "name": "WavLM",
      "fullName": "语音语言模型 (WavLM)",
      "year": "2022",
      "org": "Microsoft",
      "parent": "hubert",
      "paperUrl": "https://ieeexplore.ieee.org/document/9814838/",
      "projectUrl": "",
      "category": "ssl_representation",
      "motivation": "掩码语音去噪与预测框架",
      "summary": "WavLM 的核心目标是：掩码语音去噪与预测框架。",
      "keyPoints": [
        "核心动机：掩码语音去噪与预测框架",
        "演化来源：继承或改进自 hubert",
        "代表机构：Microsoft"
      ],
      "detail": "<p>掩码语音去噪与预测框架</p>"
    },
    {
      "id": "whisper",
      "num": 11,
      "name": "Whisper",
      "fullName": "大规模弱监督语音识别 (Whisper)",
      "year": "2023",
      "org": "OpenAI",
      "parent": "conformer",
      "paperUrl": "http://proceedings.mlr.press/v202/radford23a.html",
      "projectUrl": "",
      "category": "asr",
      "motivation": "68万小时弱监督多任务训练",
      "summary": "Whisper 通过在 68 万小时互联网弱监督音频-文本数据上进行多任务训练，构建了一个基于 Encoder-Decoder Transformer 的通用语音识别系统，实现了无需微调即可在多种语音任务和数据集上达到接近人类水平的鲁棒零样本性能。",
      "keyPoints": [
        "<strong>大规模弱监督预训练</strong>：从互联网收集 68 万小时多语言音频-文本对，覆盖 96 种语言，无需人工标注",
        "<strong>统一多任务格式</strong>：通过特殊 token 序列将语音识别、翻译、语言识别、语音活动检测和时间戳预测统一为单一序列到序列任务",
        "<strong>Encoder-Decoder Transformer 架构</strong>：音频编码器处理 80 通道 log-Mel 频谱图（30 秒窗口），文本解码器自回归生成输出 token",
        "<strong>零样本泛化能力</strong>：无需在目标数据集上微调，在多个基准上达到接近有监督 SOTA 的性能",
        "<strong>卓越的分布外鲁棒性</strong>：相比 LibriSpeech 训练的模型，在分布外数据集上平均降低 55.2% 的相对错误率",
        "<strong>模型规模系列</strong>：从 39M 到 1550M 参数的 5 个尺寸，性能随规模和数据量平滑提升"
      ],
      "detail": "<p><img alt=\"Whisper 多任务训练格式\" src=\"https://raw.githubusercontent.com/openai/whisper/main/approach.png\" />\n<em>图：Whisper 的多任务训练格式。所有任务通过一系列特殊 token 联合表示为解码器的输入/输出序列，包括语言标识、任务类型、时间戳和转录/翻译文本。</em></p>\n<pre><code class=\"language-python\"># Whisper 多任务训练与推理伪代码\ndef whisper_forward(audio_chunk, task=&quot;transcribe&quot;, language=&quot;en&quot;):\n    &quot;&quot;&quot;\n    audio_chunk: 30秒音频片段\n    task: &quot;transcribe&quot; | &quot;translate&quot; \n    language: 目标语言代码\n    &quot;&quot;&quot;\n    # 1. 音频编码\n    mel = log_mel_spectrogram(audio_chunk)  # -&gt; (80, 3000)\n    # 两层1D卷积下采样 (stride=2)\n    x = conv1(mel)  # GELU激活\n    x = conv2(x)    # -&gt; (d_model, 1500)\n    x = x + sinusoidal_position_embedding\n    encoder_out = transformer_encoder(x)  # N层Transformer编码器\n\n    # 2. 多任务解码 (自回归)\n    tokens = [SOT]  # &lt;|startoftranscript|&gt;\n    tokens.append(LANG_TOKEN[language])    # &lt;|en|&gt;\n    tokens.append(TASK_TOKEN[task])        # &lt;|transcribe|&gt; 或 &lt;|translate|&gt;\n\n    if has_timestamps:\n        tokens.append(NOTIMESTAMPS if no_ts else timestamp_token)\n\n    # 自回归生成\n    while tokens[-1] != EOT:  # &lt;|endoftranscript|&gt;\n        logits = transformer_decoder(tokens, encoder_out)\n        next_token = sample(logits)\n        tokens.append(next_token)\n\n    return decode_tokens(tokens)\n\n# 长音频推理：滑动窗口 + beam search\ndef transcribe_long_audio(audio, model):\n    segments = []\n    seek = 0\n    while seek &lt; len(audio):\n        chunk = audio[seek : seek + 30*16000]  # 30秒窗口\n        result = beam_search(model, chunk, \n                            beam_size=5,\n                            temperature_schedule=[0, 0.2, 0.4, 0.6, 0.8, 1.0])\n        segments.append(result)\n        # 根据预测的时间戳移动窗口\n        seek += result.end_timestamp * 16000\n    return merge_segments(segments)\n</code></pre>\n<p><strong>动机与背景</strong></p>\n<p>传统语音识别系统依赖于在特定数据集（如 LibriSpeech）上的有监督训练，虽然在基准测试中取得了优异成绩，但存在严重的<strong>分布外泛化问题</strong>——在训练分布之外的数据上性能急剧下降。例如，在 LibriSpeech 上达到人类水平的模型，在其他数据集上的错误率是人类的两倍。自监督预训练方法（如 wav2vec 2.0）虽然减少了对标注数据的需求，但仍需要微调步骤，且微调本身又引入了分布偏移问题。</p>\n<p>Whisper 的核心洞察是：<strong>互联网上已经存在海量的弱监督音频-文本配对数据</strong>（如视频字幕、播客转录等），通过直接在这些数据上训练，可以同时获得大规模数据的泛化优势和有监督学习的简洁性，无需复杂的自监督预训练-微调流水线。</p>\n<p><strong>核心机制</strong></p>\n<p><strong>1. 数据收集与处理</strong></p>\n<p>Whisper 从互联网收集音频-文本对，经过以下处理流程：</p>\n<ul>\n<li>使用现有语音识别系统检测音频语言，过滤掉机器生成的转录（通过检测与现有 ASR 输出的高重叠度）</li>\n<li>将音频-文本对分为三类：英语转录（43.8 万小时）、多语言转录（11.7 万小时）、X→英语翻译（12.5 万小时）</li>\n<li>对文本进行标准化处理，使用 Unicode 规范化和去除标点变体</li>\n</ul>\n<div class=\"key-point\">💡 关键：数据质量控制至关重要——通过过滤机器生成的伪标签，避免模型学习到其他 ASR 系统的错误模式。</div>\n<p><strong>2. 模型架构</strong></p>\n<p>Whisper 采用标准的 Encoder-Decoder Transformer 架构：</p>\n<ul>\n<li><strong>音频编码器</strong>：输入为 80 通道 log-Mel 频谱图（25ms 窗口，10ms 步长），先经过两层 1D 卷积（核大小 3，步长 2）将时间维度从 3000 降至 1500，再经过 <span class=\"kb-math kb-math-inline\">N</span> 层 Transformer 编码器块处理。使用正弦位置编码。</li>\n<li><strong>文本解码器</strong>：使用学习的位置编码，通过交叉注意力关注编码器输出，自回归生成 token 序列。</li>\n</ul>\n<p>模型提供 5 种规模：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>层数</th>\n<th>宽度</th>\n<th>注意力头</th>\n<th>参数量</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Tiny</td>\n<td>4</td>\n<td>384</td>\n<td>6</td>\n<td>39M</td>\n</tr>\n<tr>\n<td>Base</td>\n<td>6</td>\n<td>512</td>\n<td>8</td>\n<td>74M</td>\n</tr>\n<tr>\n<td>Small</td>\n<td>12</td>\n<td>768</td>\n<td>12</td>\n<td>244M</td>\n</tr>\n<tr>\n<td>Medium</td>\n<td>24</td>\n<td>1024</td>\n<td>16</td>\n<td>769M</td>\n</tr>\n<tr>\n<td>Large</td>\n<td>32</td>\n<td>1280</td>\n<td>20</td>\n<td>1550M</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>3. 多任务训练格式</strong></p>\n<p>所有任务通过特殊 token 序列统一表示：</p>\n<div class=\"kb-math kb-math-display\">\\text{&lt;|startoftranscript|&gt;} \\rightarrow \\text{&lt;|lang|&gt;} \\rightarrow \\text{&lt;|task|&gt;} \\rightarrow \\text{[&lt;|timestamps|&gt;]} \\rightarrow \\text{text tokens} \\rightarrow \\text{&lt;|endoftranscript|&gt;}</div>\n<ul>\n<li><strong>语言识别</strong>：预测 <code>&lt;|lang|&gt;</code> token（覆盖 99 种语言）</li>\n<li><strong>语音活动检测</strong>：若音频无语音，预测 <code>&lt;|nospeech|&gt;</code> token</li>\n<li><strong>转录 vs 翻译</strong>：通过 <code>&lt;|transcribe|&gt;</code> 或 <code>&lt;|translate|&gt;</code> token 切换</li>\n<li><strong>时间戳预测</strong>：特殊时间戳 token 表示 0-30 秒内每 20ms 的时间点</li>\n</ul>\n<div class=\"warn-box\">⚠️ 注意：这种多任务设计使得单一模型可以同时处理语音识别、翻译、语言识别和时间戳对齐，无需为每个任务训练单独的模型。</div>\n<p><strong>4. 训练细节</strong></p>\n<ul>\n<li>使用 AdamW 优化器，配合线性学习率预热（2048 步）和余弦退火</li>\n<li>数据增强：仅使用 SpecAugment（频率和时间掩码）</li>\n<li>BPE 分词器：英语使用 GPT-2 分词器（无进一步修改），多语言使用重新训练的分词器</li>\n<li>训练 <span class=\"kb-math kb-math-inline\">2^{20}</span> 次更新（约 2-3 个 epoch），batch size 256</li>\n</ul>\n<p><strong>5. 推理策略——长音频处理</strong></p>\n<p>由于模型仅处理 30 秒片段，长音频需要特殊策略：</p>\n<ul>\n<li>使用滑动窗口，根据模型预测的时间戳确定下一个窗口的起始位置</li>\n<li>采用 beam search（beam size=5）和温度调度：从贪心解码开始，若检测到重复或低置信度，逐步提高采样温度</li>\n<li>使用前一个窗口的最后几个 token 作为解码器的提示（prompt），保持上下文连贯性</li>\n</ul>\n<p><strong>与传统方法的对比</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统有监督 ASR</th>\n<th>自监督 (wav2vec 2.0)</th>\n<th>Whisper</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>预训练数据</td>\n<td>人工标注（千小时级）</td>\n<td>无标注音频（万小时级）</td>\n<td>弱监督配对（68万小时）</td>\n</tr>\n<tr>\n<td>是否需要微调</td>\n<td>—</td>\n<td>是</td>\n<td>否（零样本）</td>\n</tr>\n<tr>\n<td>分布外鲁棒性</td>\n<td>差</td>\n<td>中等</td>\n<td>优秀</td>\n</tr>\n<tr>\n<td>多语言支持</td>\n<td>通常单语</td>\n<td>有限</td>\n<td>96 种语言</td>\n</tr>\n<tr>\n<td>多任务能力</td>\n<td>单任务</td>\n<td>单任务</td>\n<td>识别+翻译+语言ID+时间戳</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键：Whisper 的核心优势不在于在某个特定基准上刷新 SOTA，而在于<strong>无需任何微调即可在广泛的任务和数据分布上保持稳定的高性能</strong>。在 LibriSpeech 上，Whisper 的 WER 为 2.5%（接近但未超越 SOTA），但在 12 个分布外数据集上平均比同等 LibriSpeech 性能的有监督模型降低 55.2% 的错误率。</div>\n<p><strong>关键公式</strong></p>\n<p>Whisper 的训练目标是标准的序列到序列交叉熵损失：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = -\\sum_{t=1}^{T} \\log P_\\theta(y_t \\mid y_{&lt;t}, \\mathbf{x})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{x}</span> 为编码器输出的音频表示，<span class=\"kb-math kb-math-inline\">y_t</span> 为第 <span class=\"kb-math kb-math-inline\">t</span> 个目标 token（包括特殊任务 token 和文本 token），<span class=\"kb-math kb-math-inline\">\\theta</span> 为模型参数。</p>\n<p>音频前端将原始波形转换为 log-Mel 频谱图：</p>\n<div class=\"kb-math kb-math-display\">\\text{Mel}(f) = \\log\\left(\\sum_k |X(k)|^2 \\cdot H_f(k)\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">X(k)</span> 为 STFT 系数，<span class=\"kb-math kb-math-inline\">H_f(k)</span> 为第 <span class=\"kb-math kb-math-inline\">f</span> 个 Mel 滤波器组的权重。</p>\n<p>模型性能与数据量的缩放关系（多语言场景）：</p>\n<div class=\"kb-math kb-math-display\">\\log(\\text{WER}) \\propto -\\frac{1}{2} \\log(\\text{hours of training data})</div>\n<p>即训练数据每增加 16 倍，WER 减半（在 Fleurs 数据集上 <span class=\"kb-math kb-math-inline\">R^2 = 0.83</span>）。</p>",
      "quiz": {
        "q": "Whisper 相比传统有监督语音识别模型的最核心优势是什么？",
        "options": [
          "在 LibriSpeech 上达到了最低的词错误率",
          "无需微调即可在分布外数据集上保持鲁棒的高性能",
          "使用了更大的 Transformer 模型架构",
          "采用了自监督预训练方法减少标注需求"
        ],
        "answer": 1,
        "explain": "Whisper 在 LibriSpeech 上的 WER(2.5%) 并非 SOTA，但其核心优势在于零样本泛化——在 12 个分布外数据集上比同等 LibriSpeech 性能的有监督模型平均降低 55.2% 的错误率，接近人类的鲁棒性水平。"
      }
    },
    {
      "id": "audiogpt",
      "num": 12,
      "name": "AudioGPT",
      "fullName": "音频GPT (AudioGPT)",
      "year": "2023",
      "org": "清华大学",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2304.12995",
      "projectUrl": "",
      "category": "audio_llm",
      "motivation": "任务编排器连接音频专家",
      "summary": "AudioGPT 提出了一种以 ChatGPT 为任务编排中枢、连接多个音频领域专家模型的多模态 AI 系统，通过\"模态转换→任务分析→模型分配→响应生成\"四阶段流水线，实现了对语音、音乐、音效和数字人等复杂音频任务的统一理解与生成。",
      "keyPoints": [
        "<strong>四阶段处理流水线</strong>：Modality Transformation → Task Analysis → Model Assignment → Response Generation，将用户自然语言/语音指令端到端转化为音频任务执行结果",
        "<strong>ChatGPT 作为任务编排器</strong>：利用 LLM 的语言理解与推理能力，解析用户意图、选择合适的音频基础模型并组织多轮对话上下文",
        "<strong>覆盖 4 大音频领域 16+ 任务</strong>：包括语音（ASR、TTS、语音增强、语音分离、风格迁移等）、音乐（文本生成音乐、歌唱合成等）、音效（文本生成音效、音频修复、声音事件检测等）、数字人（Talking Head 合成）",
        "<strong>集成多个 SOTA 音频基础模型</strong>：Whisper（ASR）、FastSpeech2（TTS）、GenerSpeech（风格迁移）、TF-GridNet（语音分离）、Make-An-Audio（音频生成）、GeneFace（数字人）等",
        "<strong>三维评估框架</strong>：从一致性（Consistency）、能力（Capability）、鲁棒性（Robustness）三个维度系统评估多模态 LLM 的任务理解与协作能力",
        "<strong>支持多轮对话与跨模态交互</strong>：通过上下文管理实现复杂的多步音频处理流程"
      ],
      "detail": "<p><img alt=\"AudioGPT 系统架构总览\" src=\"https://ar5iv.labs.arxiv.org/html/2304.12995/assets/x1.png\" />\n<em>图：AudioGPT 系统架构总览。整个系统分为四个阶段：模态转换、任务分析、模型分配和响应生成，以 ChatGPT 为核心编排器连接各音频基础模型。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># AudioGPT 四阶段处理流程伪代码\ndef audiogpt_pipeline(query_n, context_C):\n    &quot;&quot;&quot;\n    query_n = (q_d, {q_s1, ..., q_sk})  # 查询描述 + 相关资源\n    context_C: 多轮对话历史上下文\n    &quot;&quot;&quot;\n    # Stage 1: Modality Transformation (模态转换)\n    if is_audio(query_n.description):\n        q_d_prime = ASR(query_n.description)  # Whisper: 语音→文本\n    else:\n        q_d_prime = query_n.description       # 已是文本，直接使用\n    q_prime = (q_d_prime, query_n.resources)\n\n    # Stage 2: Task Analysis (任务分析)\n    task_family = TaskHandler(q_prime)         # 按 I/O 模态分类任务族\n    model_P, args_h = ChatGPT(               # LLM 选择模型 + 提取参数\n        PromptManager(task_family, q_d_prime),\n        context_C\n    )\n\n    # Stage 3: Model Assignment (模型分配)\n    output = model_P(query_n.resources, args_h)  # 执行选定的音频基础模型\n\n    # Stage 4: Response Generation (响应生成)\n    if output.modality == &quot;text&quot;:\n        response = ChatGPT.format(output)     # 文本输出由 LLM 组织语言\n    else:\n        response = output                     # 音频/视频直接返回\n    return response\n</code></pre>\n<h5>动机与背景</h5>\n<p>大型语言模型（LLM）如 ChatGPT 在自然语言处理领域展现了强大的理解与推理能力，但其本质上是文本模态的模型，无法直接处理音频信号。与此同时，音频领域已经涌现出大量高质量的基础模型（如 Whisper 用于语音识别、FastSpeech2 用于语音合成等），但这些模型各自独立、接口不统一，普通用户难以灵活组合使用。AudioGPT 的核心动机在于：<strong>能否让 ChatGPT 充当\"任务编排器\"，将用户的自然语言指令自动映射到合适的音频专家模型上，从而实现\"一句话完成复杂音频任务\"？</strong></p>\n<p>这一思路与同期的 HuggingGPT、Visual ChatGPT 等工作一脉相承，但 AudioGPT 专注于音频领域，面临独特挑战：(1) 音频任务种类繁多（语音、音乐、音效、数字人），需要覆盖广泛的任务族；(2) 音频的输入输出模态多样（文本↔音频、音频↔音频、文本↔视频等），任务分类更复杂；(3) 用户可能直接用语音而非文本下达指令，需要额外的模态转换环节。</p>\n<h5>核心机制：四阶段流水线</h5>\n<p>AudioGPT 的核心架构是一条四阶段处理流水线，每个阶段各司其职：</p>\n<p><strong>阶段一：模态转换（Modality Transformation）</strong></p>\n<p>用户输入的查询 <span class=\"kb-math kb-math-inline\">q_n = (q_n^{(d)}, \\{q_n^{(s_1)}, ..., q_n^{(s_k)}\\})</span> 包含查询描述和相关资源。如果查询描述是语音格式，系统首先调用 ASR 模型（Whisper）将其转换为文本：</p>\n<div class=\"kb-math kb-math-display\">q&#x27;_n = \\begin{cases} (q_n^{(d)}, \\{q_n^{(s_1)}, ..., q_n^{(s_k)}\\}) &amp; \\text{if } q_n^{(d)} \\text{ is text} \\\\ (\\mathcal{T}(q_n^{(d)}), \\{q_n^{(s_1)}, ..., q_n^{(s_k)}\\}) &amp; \\text{if } q_n^{(d)} \\text{ is audio} \\end{cases}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{T}</span> 为模态转换器（即 Whisper ASR）。这一步确保后续所有处理都基于统一的文本查询格式。</p>\n<p><strong>阶段二：任务分析（Task Analysis）</strong></p>\n<p>这是系统的\"大脑\"环节，由三个组件协作完成：</p>\n<ol>\n<li><strong>对话引擎（Dialogue Engine）</strong> <span class=\"kb-math kb-math-inline\">\\mathcal{D}</span>：管理多轮对话上下文 <span class=\"kb-math kb-math-inline\">C</span>，为 LLM 提供历史信息</li>\n<li><strong>任务处理器（Task Handler）</strong> <span class=\"kb-math kb-math-inline\">\\mathcal{H}</span>：根据查询资源的 I/O 模态类型，将任务分类到不同的任务族（如 Text→Audio、Audio→Audio、Audio→Text 等）</li>\n<li><strong>提示管理器（Prompt Manager）</strong> <span class=\"kb-math kb-math-inline\">\\mathcal{M}</span>：根据任务族生成结构化提示，引导 ChatGPT 选择具体的音频模型并提取任务参数</li>\n</ol>\n<p>整个过程可以形式化为：</p>\n<div class=\"kb-math kb-math-display\">(\\mathcal{P}_p, h_{\\mathcal{P}_p}) = \\mathcal{L}(\\mathcal{M}(\\mathcal{H}(q&#x27;_n), q&#x27;^{(d)}_n), C)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{P}_p</span> 是选定的音频基础模型，<span class=\"kb-math kb-math-inline\">h_{\\mathcal{P}_p}</span> 是对应的任务参数，<span class=\"kb-math kb-math-inline\">\\mathcal{L}</span> 代表 ChatGPT。</p>\n<div class=\"key-point\">💡 <strong>关键设计</strong>：任务处理器通过 I/O 模态分类（而非任务语义分类）来缩小模型候选范围，这大大降低了 LLM 的选择难度。例如，当输入是文本、期望输出是音频时，候选模型自动缩小到 TTS、文本生成音乐、文本生成音效等少数几个。</div>\n<p><strong>阶段三：模型分配（Model Assignment）</strong></p>\n<p>将选定模型 <span class=\"kb-math kb-math-inline\">\\mathcal{P}_p</span> 与相关资源绑定并执行：</p>\n<div class=\"kb-math kb-math-display\">o_{\\mathcal{P}_p} = \\mathcal{P}_p(\\{q_n^{(s_1)}, q_n^{(s_2)}, ..., q_n^{(s_k)}\\}, h_{\\mathcal{P}_p})</div>\n<p>这一步是实际的音频处理执行环节，调用具体的音频基础模型完成任务。</p>\n<p><strong>阶段四：响应生成（Response Generation）</strong></p>\n<p>根据输出模态的不同采取不同策略：\n- <strong>文本输出</strong>（如 ASR、声音事件检测）：将结果传回 ChatGPT，由其组织成自然语言回复\n- <strong>非文本输出</strong>（如音频、视频）：直接返回生成的媒体文件，并附上 ChatGPT 生成的文字说明</p>\n<div class=\"kb-math kb-math-display\">r_n = \\mathcal{L}(o_{\\mathcal{P}_p}, C)</div>\n<h5>支持的任务与模型矩阵</h5>\n<p>AudioGPT 覆盖了四大音频领域的 16+ 任务，每个任务对应一个 SOTA 基础模型：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>领域</th>\n<th>任务</th>\n<th>输入→输出</th>\n<th>基础模型</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>语音</td>\n<td>语音识别</td>\n<td>Audio→Text</td>\n<td>Whisper</td>\n</tr>\n<tr>\n<td>语音</td>\n<td>语音翻译</td>\n<td>Audio→Text</td>\n<td>MultiDecoder</td>\n</tr>\n<tr>\n<td>语音</td>\n<td>文本转语音</td>\n<td>Text→Audio</td>\n<td>FastSpeech2</td>\n</tr>\n<tr>\n<td>语音</td>\n<td>风格迁移</td>\n<td>Audio→Audio</td>\n<td>GenerSpeech</td>\n</tr>\n<tr>\n<td>语音</td>\n<td>语音增强</td>\n<td>Audio→Audio</td>\n<td>ConvTasNet</td>\n</tr>\n<tr>\n<td>语音</td>\n<td>语音分离</td>\n<td>Audio→Audio</td>\n<td>TF-GridNet</td>\n</tr>\n<tr>\n<td>音乐</td>\n<td>文本生成音乐</td>\n<td>Text→Audio</td>\n<td>Make-An-Audio</td>\n</tr>\n<tr>\n<td>音乐</td>\n<td>歌唱合成</td>\n<td>Text→Audio</td>\n<td>DiffSinger</td>\n</tr>\n<tr>\n<td>音效</td>\n<td>文本生成音效</td>\n<td>Text→Audio</td>\n<td>Make-An-Audio</td>\n</tr>\n<tr>\n<td>音效</td>\n<td>音频修复</td>\n<td>Audio→Audio</td>\n<td>Make-An-Audio</td>\n</tr>\n<tr>\n<td>音效</td>\n<td>声音提取</td>\n<td>Audio→Audio</td>\n<td>LASSNet</td>\n</tr>\n<tr>\n<td>音效</td>\n<td>声音事件检测</td>\n<td>Audio→Event</td>\n<td>Pyramid Transformer</td>\n</tr>\n<tr>\n<td>数字人</td>\n<td>Talking Head 合成</td>\n<td>Audio→Video</td>\n<td>GeneFace</td>\n</tr>\n</tbody>\n</table></div>\n<h5>评估框架</h5>\n<p>AudioGPT 提出了三维评估框架来系统评估多模态 LLM 系统：</p>\n<ol>\n<li><strong>一致性（Consistency）</strong>：评估 LLM 是否正确理解用户意图并选择了合适的模型。通过将用户查询同时输入 AudioGPT 和人工标注，比较模型选择的一致性</li>\n<li><strong>能力（Capability）</strong>：评估所选音频基础模型在具体任务上的执行质量，使用各任务领域的标准指标（如 WER、MOS、FAD 等）</li>\n<li><strong>鲁棒性（Robustness）</strong>：评估系统在语音输入（而非文本输入）场景下的稳定性，衡量 ASR 引入的噪声对后续任务分析的影响</li>\n</ol>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：论文指出了三个主要局限：(1) <strong>提示工程依赖</strong>——音频模型的提示描述需要专业知识，耗时且易错；(2) <strong>长度限制</strong>——ChatGPT 的 token 上限制约了多轮对话的深度；(3) <strong>能力瓶颈</strong>——系统整体能力受限于底层音频基础模型的精度。</div>\n<h5>与传统方法的区别</h5>\n<p>与传统的端到端多模态模型（如直接训练一个能处理所有音频任务的大模型）相比，AudioGPT 采用了<strong>模块化编排</strong>的设计哲学：</p>\n<ul>\n<li><strong>传统方法</strong>：训练单一大模型覆盖所有任务，需要海量多任务数据，且难以快速适配新任务</li>\n<li><strong>AudioGPT 方法</strong>：利用 LLM 作为\"胶水\"，将已有的 SOTA 专家模型灵活组合，新增任务只需注册新模型即可，无需重新训练</li>\n</ul>\n<p>这种设计使得 AudioGPT 能够快速集成最新的音频基础模型，保持各任务上的 SOTA 性能，同时通过 ChatGPT 的语言理解能力实现自然的人机交互。</p>",
      "quiz": {
        "q": "AudioGPT 在任务分析阶段，任务处理器（Task Handler）是如何对用户查询进行初步分类的？",
        "options": [
          "通过分析查询文本的语义关键词进行任务分类",
          "通过查询资源的输入/输出模态类型进行任务族分类",
          "通过计算查询与所有模型描述的相似度进行排序",
          "通过用户手动选择任务类别进行分类"
        ],
        "answer": 1,
        "explain": "论文明确指出 Task Handler 根据查询资源的 I/O 模态类型（如 Text→Audio、Audio→Audio 等）将任务分类到不同的任务族，从而缩小候选模型范围，再由 ChatGPT 在族内选择具体模型。"
      }
    },
    {
      "id": "speechgpt",
      "num": 13,
      "name": "SpeechGPT",
      "fullName": "语音GPT (SpeechGPT)",
      "year": "2023",
      "org": "复旦大学",
      "parent": "—",
      "paperUrl": "https://aclanthology.org/2023.findings-emnlp.1055/",
      "projectUrl": "",
      "category": "audio_llm",
      "motivation": "离散语音token原生对话",
      "summary": "SpeechGPT 的核心目标是：离散语音token原生对话。",
      "keyPoints": [
        "核心动机：离散语音token原生对话",
        "代表机构：复旦大学"
      ],
      "detail": "<p>离散语音token原生对话</p>"
    },
    {
      "id": "qwen_audio",
      "num": 14,
      "name": "Qwen-Audio",
      "fullName": "通义千问音频 (Qwen-Audio)",
      "year": "2023",
      "org": "阿里巴巴",
      "parent": "audiogpt",
      "paperUrl": "https://arxiv.org/abs/2311.07919",
      "projectUrl": "",
      "category": "audio_llm",
      "motivation": "统一音频-语言预训练",
      "summary": "Qwen-Audio 的核心目标是：统一音频-语言预训练。",
      "keyPoints": [
        "核心动机：统一音频-语言预训练",
        "演化来源：继承或改进自 audiogpt",
        "代表机构：阿里巴巴"
      ],
      "detail": "<p>统一音频-语言预训练</p>"
    },
    {
      "id": "salmonn",
      "num": 15,
      "name": "SALMONN",
      "fullName": "通用听觉大模型 (SALMONN)",
      "year": "2024",
      "org": "清华大学",
      "parent": "qwen_audio",
      "paperUrl": "https://proceedings.iclr.cc/paper_files/paper/2024/hash/476ab8f369e489c04187ba84f68cfa68-Abstract-Conference.html",
      "projectUrl": "",
      "category": "audio_llm",
      "motivation": "双编码器(Whisper+BEATs)",
      "summary": "SALMONN 的核心目标是：双编码器(Whisper+BEATs)。",
      "keyPoints": [
        "核心动机：双编码器(Whisper+BEATs)",
        "演化来源：继承或改进自 qwen_audio",
        "代表机构：清华大学"
      ],
      "detail": "<p>双编码器(Whisper+BEATs)</p>"
    },
    {
      "id": "ltu",
      "num": 16,
      "name": "LTU",
      "fullName": "听思理解 (Listen Think Understand)",
      "year": "2024",
      "org": "MIT",
      "parent": "salmonn",
      "paperUrl": "https://proceedings.iclr.cc/paper_files/paper/2024/hash/510d0935b543a29d686f93fa52d1c288-Abstract-Conference.html",
      "projectUrl": "",
      "category": "audio_llm",
      "motivation": "通用音频语义理解",
      "summary": "LTU 的核心目标是：通用音频语义理解。",
      "keyPoints": [
        "核心动机：通用音频语义理解",
        "演化来源：继承或改进自 salmonn",
        "代表机构：MIT"
      ],
      "detail": "<p>通用音频语义理解</p>"
    },
    {
      "id": "qwen2_audio",
      "num": 17,
      "name": "Qwen2-Audio",
      "fullName": "通义千问音频2 (Qwen2-Audio)",
      "year": "2024",
      "org": "阿里巴巴",
      "parent": "qwen_audio",
      "paperUrl": "https://arxiv.org/abs/2407.10759",
      "projectUrl": "",
      "category": "audio_llm",
      "motivation": "升级版多任务音频理解",
      "summary": "Qwen2-Audio 的核心目标是：升级版多任务音频理解。",
      "keyPoints": [
        "核心动机：升级版多任务音频理解",
        "演化来源：继承或改进自 qwen_audio",
        "代表机构：阿里巴巴"
      ],
      "detail": "<p>升级版多任务音频理解</p>"
    },
    {
      "id": "gpt4o",
      "num": 18,
      "name": "GPT-4o",
      "fullName": "GPT-4全能版 (GPT-4o)",
      "year": "2024",
      "org": "OpenAI",
      "parent": "—",
      "paperUrl": "https://openai.com/index/hello-gpt-4o",
      "projectUrl": "",
      "category": "audio_llm",
      "motivation": "原生多模态端到端语音",
      "summary": "GPT-4o 的核心目标是：原生多模态端到端语音。",
      "keyPoints": [
        "核心动机：原生多模态端到端语音",
        "代表机构：OpenAI"
      ],
      "detail": "<p>原生多模态端到端语音</p>"
    },
    {
      "id": "tagspeech",
      "num": 19,
      "name": "TagSpeech",
      "fullName": "标签语音 (TagSpeech)",
      "year": "2026.01",
      "org": "—",
      "parent": "whisper",
      "paperUrl": "https://arxiv.org/abs/2601.06896",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "端到端多说话人ASR与日志",
      "summary": "TagSpeech 的核心目标是：端到端多说话人ASR与日志。",
      "keyPoints": [
        "核心动机：端到端多说话人ASR与日志",
        "演化来源：继承或改进自 whisper",
        "代表机构：—"
      ],
      "detail": "<p>端到端多说话人ASR与日志</p>"
    },
    {
      "id": "streaming_sp_asr",
      "num": 20,
      "name": "Streaming SP-ASR",
      "fullName": "流式目标说话人ASR (Streaming SP-ASR)",
      "year": "2026.03",
      "org": "—",
      "parent": "tagspeech",
      "paperUrl": "https://www.sciencedirect.com/science/article/pii/S1051200426000862",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "VAD融合流式说话人识别",
      "summary": "Streaming SP-ASR 的核心目标是：VAD融合流式说话人识别。",
      "keyPoints": [
        "核心动机：VAD融合流式说话人识别",
        "演化来源：继承或改进自 tagspeech",
        "代表机构：—"
      ],
      "detail": "<p>VAD融合流式说话人识别</p>"
    },
    {
      "id": "speakerlm",
      "num": 21,
      "name": "SpeakerLM",
      "fullName": "说话人语言模型 (SpeakerLM)",
      "year": "2026",
      "org": "—",
      "parent": "ecapa_tdnn",
      "paperUrl": "https://ojs.aaai.org/index.php/AAAI/article/view/40745",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "MLLM端到端说话人识别",
      "summary": "SpeakerLM 的核心目标是：MLLM端到端说话人识别。",
      "keyPoints": [
        "核心动机：MLLM端到端说话人识别",
        "演化来源：继承或改进自 ecapa_tdnn",
        "代表机构：—"
      ],
      "detail": "<p>MLLM端到端说话人识别</p>"
    },
    {
      "id": "wavbench",
      "num": 22,
      "name": "Wavbench",
      "fullName": "语音基准 (Wavbench)",
      "year": "2026.02",
      "org": "—",
      "parent": "wavlm",
      "paperUrl": "https://arxiv.org/abs/2602.12135",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "端到端口语对话推理评测",
      "summary": "Wavbench 的核心目标是：端到端口语对话推理评测。",
      "keyPoints": [
        "核心动机：端到端口语对话推理评测",
        "演化来源：继承或改进自 wavlm",
        "代表机构：—"
      ],
      "detail": "<p>端到端口语对话推理评测</p>"
    },
    {
      "id": "audita",
      "num": 23,
      "name": "AUDITA",
      "fullName": "音频技能审计 (AUDITA)",
      "year": "2026.04",
      "org": "—",
      "parent": "ltu",
      "paperUrl": "https://arxiv.org/abs/2604.21766",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "非言语音频QA审计数据集",
      "summary": "AUDITA 的核心目标是：非言语音频QA审计数据集。",
      "keyPoints": [
        "核心动机：非言语音频QA审计数据集",
        "演化来源：继承或改进自 ltu",
        "代表机构：—"
      ],
      "detail": "<p>非言语音频QA审计数据集</p>"
    },
    {
      "id": "visqa",
      "num": 24,
      "name": "ViSQA",
      "fullName": "越南语音频问答 (ViSQA)",
      "year": "2026",
      "org": "—",
      "parent": "ltu",
      "paperUrl": "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0340771",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "低资源语言音频QA基准",
      "summary": "ViSQA 的核心目标是：低资源语言音频QA基准。",
      "keyPoints": [
        "核心动机：低资源语言音频QA基准",
        "演化来源：继承或改进自 ltu",
        "代表机构：—"
      ],
      "detail": "<p>低资源语言音频QA基准</p>"
    },
    {
      "id": "audio_thinker",
      "num": 25,
      "name": "Audio-Thinker",
      "fullName": "音频思考者 (Audio-Thinker)",
      "year": "2026",
      "org": "—",
      "parent": "salmonn",
      "paperUrl": "https://ojs.aaai.org/index.php/AAAI/article/view/40689",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "RL引导音频思维链推理",
      "summary": "Audio-Thinker 的核心目标是：RL引导音频思维链推理。",
      "keyPoints": [
        "核心动机：RL引导音频思维链推理",
        "演化来源：继承或改进自 salmonn",
        "代表机构：—"
      ],
      "detail": "<p>RL引导音频思维链推理</p>"
    },
    {
      "id": "audio_flamingo3",
      "num": 26,
      "name": "Audio Flamingo 3",
      "fullName": "音频火烈鸟3 (Audio Flamingo 3)",
      "year": "2026",
      "org": "—",
      "parent": "qwen2_audio",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/3babb6b453cb59d87cb58a1219ef914b-Abstract-Conference.html",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "按需推理统一音频编码",
      "summary": "Audio Flamingo 3 的核心目标是：按需推理统一音频编码。",
      "keyPoints": [
        "核心动机：按需推理统一音频编码",
        "演化来源：继承或改进自 qwen2_audio",
        "代表机构：—"
      ],
      "detail": "<p>按需推理统一音频编码</p>"
    },
    {
      "id": "uniaudio2",
      "num": 27,
      "name": "UniAudio 2.0",
      "fullName": "统一音频2.0 (UniAudio 2.0)",
      "year": "2026.02",
      "org": "—",
      "parent": "qwen2_audio",
      "paperUrl": "https://arxiv.org/abs/2602.04683",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "ReasoningCodec推理编码",
      "summary": "UniAudio 2.0 的核心目标是：ReasoningCodec推理编码。",
      "keyPoints": [
        "核心动机：ReasoningCodec推理编码",
        "演化来源：继承或改进自 qwen2_audio",
        "代表机构：—"
      ],
      "detail": "<p>ReasoningCodec推理编码</p>"
    },
    {
      "id": "gemini_audio",
      "num": 28,
      "name": "Gemini 3.1 Audio",
      "fullName": "Gemini音频理解 (Gemini 3.1 Audio)",
      "year": "2026.03",
      "org": "Google",
      "parent": "gpt4o",
      "paperUrl": "https://ai.google.dev/",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "原生音频理解sub-200ms",
      "summary": "Gemini 3.1 Audio 的核心目标是：原生音频理解sub-200ms。",
      "keyPoints": [
        "核心动机：原生音频理解sub-200ms",
        "演化来源：继承或改进自 gpt4o",
        "代表机构：Google"
      ],
      "detail": "<p>原生音频理解sub-200ms</p>"
    },
    {
      "id": "wavslm",
      "num": 29,
      "name": "WavSLM",
      "fullName": "单流语音语言模型 (WavSLM)",
      "year": "2026.03",
      "org": "—",
      "parent": "wavlm",
      "paperUrl": "https://arxiv.org/abs/2603.05299",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "WavLM蒸馏单流语音建模",
      "summary": "WavSLM 将预训练 WavLM 的前 6 层蒸馏为可流式单码本语音编解码器（FocalCodec-Stream），并将其余 7–24 层改造为因果语言模型骨干，在仅使用语音数据、无任何文本预训练的条件下，以 305M 参数实现了与 7B+ 文本预训练语音语言模型可比的语义与声学建模性能。",
      "keyPoints": [
        "<strong>单流离散表示</strong>：提出 FocalCodec-Stream，从 WavLM 第 6 层中间表示出发，通过压缩器 + 单码本 RVQ + 解压缩器生成 50 Hz 单流离散 token，端到端延迟仅 80 ms",
        "<strong>WavLM 权重复用</strong>：WavLM 第 7–24 层直接作为因果 SLM 骨干，仅需添加线性 LM 头即可完成自回归建模，无需从头训练 Transformer",
        "<strong>Next-Chunk Prediction</strong>：以 <span class=\"kb-math kb-math-inline\">C=4</span> 个 token 为一个 chunk 进行自回归预测，chunk 内部并行、chunk 间因果，兼顾建模质量与推理速度",
        "<strong>滑动窗口注意力</strong>：默认窗口大小 512 token（约 10 秒语音），支持长序列高效推理",
        "<strong>纯语音训练</strong>：仅使用 Libri-Light ~60k 小时语音数据，不依赖任何文本 LLM 预训练或文本数据",
        "<strong>三种变体</strong>：WavSLM-2k（305M）、WavSLM-4k（307M）、WavSLM-65k（370M），码本大小分别为 2048/4096/65536",
        "<strong>高效推理</strong>：WavSLM-4k 在单张 H100 上实现 RTF=5.8×，比 LLaMA-Mimi 8B（RTF=1.1×）快约 5 倍"
      ],
      "detail": "<h5>架构总览</h5>\n<p><img alt=\"WavSLM 架构图\" src=\"https://arxiv.org/html/2603.05299v1/x1.png\" />\n<em>图：WavSLM 整体框架。WavLM 前 6 层的中间表示经 FocalCodec-Stream 量化为单流离散 token，WavLM 第 7–24 层被改造为因果语言模型骨干进行 next-chunk prediction。</em></p>\n<p>WavSLM 的核心设计哲学是：<strong>将一个预训练好的自监督语音模型（WavLM）一分为二，前半部分变成编解码器，后半部分变成语言模型</strong>。这种设计避免了传统 SLM 中编解码器与语言模型各自独立训练再拼接的割裂问题，实现了从表示学习到语言建模的无缝过渡。</p>\n<h5>FocalCodec-Stream：可流式单码本语音编解码器</h5>\n<p>传统语音编解码器（如 EnCodec、SpeechTokenizer）通常使用多层 RVQ 产生多流 token，这给自回归建模带来了\"展平顺序\"或\"多流交织\"等复杂性。WavSLM 的关键洞察是：<strong>WavLM 的中间层表示（第 6 层）天然平衡了语义与声学信息</strong>，因此只需单个码本即可编码足够丰富的语音特征。</p>\n<p>FocalCodec-Stream 的流水线如下：</p>\n<pre><code>原始波形 → WavLM 层 1-6 (非因果) → 压缩器 (因果卷积, 下采样) → RVQ (单码本) → 解压缩器 (因果卷积, 上采样) → WavLM 层 7-24 (教师) → 重建损失\n</code></pre>\n<p>具体来说：</p>\n<ol>\n<li><strong>特征提取</strong>：WavLM 前 6 层以 50 Hz 提取中间表示 <span class=\"kb-math kb-math-inline\">\\mathbf{h}_6 \\in \\mathbb{R}^{T \\times D}</span></li>\n<li><strong>压缩器</strong>：因果卷积网络将 <span class=\"kb-math kb-math-inline\">\\mathbf{h}_6</span> 下采样并映射到低维空间</li>\n<li><strong>量化器</strong>：单码本向量量化（VQ），码本大小 <span class=\"kb-math kb-math-inline\">V \\in \\{2048, 4096, 65536\\}</span>，产生离散 token 序列 <span class=\"kb-math kb-math-inline\">\\mathbf{z} = (z_1, z_2, \\ldots, z_T)</span></li>\n<li><strong>解压缩器</strong>：因果卷积网络将量化后的表示上采样回原始维度</li>\n<li><strong>训练目标</strong>：最小化重建表示与 WavLM 第 7–24 层教师表示之间的余弦距离</li>\n</ol>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{codec}} = \\sum_{l=7}^{24} \\left(1 - \\frac{\\hat{\\mathbf{h}}_l \\cdot \\mathbf{h}_l}{\\|\\hat{\\mathbf{h}}_l\\| \\|\\mathbf{h}_l\\|}\\right)</div>\n<div class=\"key-point\">💡 <strong>关键设计</strong>：所有卷积均为因果卷积，确保编解码器可流式运行。在 50 Hz 帧率下，编码器引入的端到端延迟仅为 80 ms，满足实时交互需求。</p>\n<p>⚠️ <strong>为什么选第 6 层？</strong> 作者通过消融实验发现，WavLM 的浅层（1-3 层）偏重声学细节但语义不足，深层（10+ 层）语义丰富但声学信息已被抽象化。第 6 层恰好处于语义-声学信息的\"甜蜜点\"，单码本即可同时编码两类信息。</div>\n<h5>因果语言模型骨干</h5>\n<p>WavSLM 将 WavLM 的第 7–24 层（共 18 层 Transformer）直接改造为因果语言模型：</p>\n<ul>\n<li><strong>注意力掩码</strong>：将原始双向注意力替换为因果掩码（下三角矩阵），使模型只能看到当前及之前的 token</li>\n<li><strong>滑动窗口</strong>：默认窗口大小 <span class=\"kb-math kb-math-inline\">W=512</span> 个 token（约 10.24 秒语音），限制注意力范围以支持长序列</li>\n<li><strong>LM 头</strong>：在最后一层之上添加线性投影层 <span class=\"kb-math kb-math-inline\">\\mathbf{W} \\in \\mathbb{R}^{D \\times V}</span>，将隐藏状态映射到码本词汇表上的概率分布</li>\n</ul>\n<h5>Next-Chunk Prediction 训练</h5>\n<p>WavSLM 采用 next-chunk prediction 而非逐 token 预测，每次预测 <span class=\"kb-math kb-math-inline\">C=4</span> 个连续 token：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{SLM}} = -\\sum_{t=1}^{T/C} \\sum_{j=1}^{C} \\log p_\\theta\\left(z_{(t-1)C+j} \\mid z_{&lt;(t-1)C+j}\\right)</div>\n<pre><code class=\"language-python\"># WavSLM Next-Chunk Prediction 伪代码\ndef wavslm_forward(z_tokens, chunk_size=4, window_size=512):\n    &quot;&quot;&quot;\n    z_tokens: 离散 token 序列 [B, T], 由 FocalCodec-Stream 编码\n    &quot;&quot;&quot;\n    T = z_tokens.shape[1]\n\n    # 1. Token embedding (码本嵌入)\n    h = embedding(z_tokens)  # [B, T, D]\n\n    # 2. 通过 WavLM 层 7-24 (因果注意力 + 滑动窗口)\n    for layer in wavlm_layers[7:25]:\n        # 因果掩码: 只看当前及之前的 token\n        # 滑动窗口: 注意力范围限制在最近 window_size 个 token\n        causal_mask = build_sliding_window_mask(T, window_size)\n        h = layer(h, attention_mask=causal_mask)\n\n    # 3. LM 头预测下一个 token\n    logits = lm_head(h)  # [B, T, V]\n\n    # 4. Next-chunk prediction loss\n    # chunk 内部: 每个 token 可以看到同 chunk 内之前的 token\n    # chunk 之间: 严格因果\n    loss = cross_entropy(logits[:, :-1], z_tokens[:, 1:])\n\n    return loss\n\n# 推理时: 每次生成一个 chunk (4 个 token)\ndef wavslm_generate(prompt_tokens, num_chunks, temperature=0.8, top_k=30):\n    generated = prompt_tokens\n    for _ in range(num_chunks):\n        for j in range(chunk_size):  # chunk 内逐 token 生成\n            logits = wavslm_forward(generated)[:, -1]\n            logits = top_k_filtering(logits / temperature, k=top_k)\n            next_token = torch.multinomial(softmax(logits), 1)\n            generated = torch.cat([generated, next_token], dim=1)\n    return generated\n</code></pre>\n<div class=\"key-point\">💡 <strong>为什么用 chunk 而非逐 token？</strong> Chunk prediction 在推理时可以利用 chunk 内部的并行性加速生成。同时，chunk 大小 <span class=\"kb-math kb-math-inline\">C=4</span> 对应 80 ms 的语音片段，恰好与编解码器的延迟对齐，使整个系统的流式延迟保持一致。</div>\n<h5>训练配置</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>配置项</th>\n<th>值</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>训练数据</td>\n<td>Libri-Light ~60k 小时（纯语音）</td>\n</tr>\n<tr>\n<td>优化器</td>\n<td>AdamW, lr=1e-4, β=(0.9, 0.95)</td>\n</tr>\n<tr>\n<td>训练步数</td>\n<td>500k steps</td>\n</tr>\n<tr>\n<td>批大小</td>\n<td>~500k tokens/batch</td>\n</tr>\n<tr>\n<td>硬件</td>\n<td>单张 NVIDIA H100 GPU</td>\n</tr>\n<tr>\n<td>注意力窗口</td>\n<td>512 tokens（~10s）</td>\n</tr>\n<tr>\n<td>Chunk 大小</td>\n<td>4 tokens（80ms）</td>\n</tr>\n</tbody>\n</table></div>\n<h5>与传统方法的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统 SLM（如 LLaMA-Mimi）</th>\n<th>WavSLM</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>编解码器</strong></td>\n<td>独立训练的多流 RVQ 编解码器</td>\n<td>WavLM 蒸馏的单流单码本编解码器</td>\n</tr>\n<tr>\n<td><strong>语言模型</strong></td>\n<td>从文本 LLM 初始化（7B+）</td>\n<td>WavLM 层 7-24 直接改造（305M）</td>\n</tr>\n<tr>\n<td><strong>训练数据</strong></td>\n<td>语音 + 大规模文本预训练</td>\n<td>仅语音（~60k 小时）</td>\n</tr>\n<tr>\n<td><strong>Token 流</strong></td>\n<td>多流（需要交织/展平策略）</td>\n<td>单流（直接自回归）</td>\n</tr>\n<tr>\n<td><strong>推理速度</strong></td>\n<td>RTF ~1.1×（8B 参数）</td>\n<td>RTF ~5.8×（307M 参数）</td>\n</tr>\n</tbody>\n</table></div>\n<p>传统 SLM 的核心困难在于：语音的多流离散表示使得自回归建模变得复杂，需要设计专门的交织策略（如 delay pattern、interleaving）来处理多个码本流之间的依赖关系。WavSLM 通过将问题简化为单流建模，完全回避了这一难题，使得语音 LM 的训练和推理与文本 LM 一样简洁。</p>\n<h5>实验结果</h5>\n<p><strong>主要基准测试结果（SALMon + ZeroSpeech）：</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>参数量</th>\n<th>文本预训练</th>\n<th>Acoustic Consist.</th>\n<th>Alignment</th>\n<th>Spoken Content</th>\n<th><strong>Avg</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>TWIST</td>\n<td>1.3B</td>\n<td>✓</td>\n<td>64.2</td>\n<td>50.0</td>\n<td>54.6</td>\n<td>56.3</td>\n</tr>\n<tr>\n<td>SpiRit LM (Expressive)</td>\n<td>7B</td>\n<td>✓</td>\n<td>79.8</td>\n<td>56.5</td>\n<td>58.7</td>\n<td>65.0</td>\n</tr>\n<tr>\n<td>Moshi</td>\n<td>7B</td>\n<td>✓</td>\n<td>73.5</td>\n<td>50.0</td>\n<td>56.5</td>\n<td>60.0</td>\n</tr>\n<tr>\n<td>LLaMA-Mimi 8B</td>\n<td>8B</td>\n<td>✓</td>\n<td>75.3</td>\n<td>53.0</td>\n<td>61.5</td>\n<td>63.3</td>\n</tr>\n<tr>\n<td>SmolTolk</td>\n<td>8B</td>\n<td>✓</td>\n<td><strong>84.5</strong></td>\n<td><strong>59.5</strong></td>\n<td>61.1</td>\n<td>68.4</td>\n</tr>\n<tr>\n<td><strong>WavSLM-4k</strong></td>\n<td><strong>307M</strong></td>\n<td>✗</td>\n<td>84.7</td>\n<td>51.5</td>\n<td>60.3</td>\n<td><strong>69.5</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>语音生成评估：</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>UTMOS ↑</th>\n<th>Speaker Sim ↑</th>\n<th>PPL ↓</th>\n<th>RTF ↑</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>LLaMA-Mimi 1.3B</td>\n<td>3.55</td>\n<td>88.3</td>\n<td>173</td>\n<td>2.1</td>\n</tr>\n<tr>\n<td>LLaMA-Mimi 8B</td>\n<td>3.59</td>\n<td>90.1</td>\n<td><strong>136</strong></td>\n<td>1.1</td>\n</tr>\n<tr>\n<td>WavSLM-2k</td>\n<td><strong>3.71</strong></td>\n<td><strong>92.0</strong></td>\n<td>176</td>\n<td>5.8</td>\n</tr>\n<tr>\n<td><strong>WavSLM-4k</strong></td>\n<td>3.69</td>\n<td>91.6</td>\n<td>162</td>\n<td><strong>5.8</strong></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键发现</strong>：WavSLM-4k 以仅 307M 参数、无文本预训练的条件下，在 SALMon+ZeroSpeech 综合评分上达到 69.5，超越了所有 7B+ 文本预训练基线。在生成质量上，UTMOS 和说话人相似度均优于 LLaMA-Mimi 8B，且推理速度快 5 倍以上。</div>\n<p><strong>窗口与 Chunk 大小消融（WavSLM-4k）：</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Window</th>\n<th>Chunk</th>\n<th>Avg ↑</th>\n<th>UTMOS ↑</th>\n<th>Sim ↑</th>\n<th>PPL ↓</th>\n<th>RTF ↑</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>512</td>\n<td>4</td>\n<td><strong>69.5</strong></td>\n<td>3.69</td>\n<td>91.6</td>\n<td>162</td>\n<td>5.8</td>\n</tr>\n<tr>\n<td>1024</td>\n<td>4</td>\n<td><strong>69.5</strong></td>\n<td>3.69</td>\n<td>91.7</td>\n<td>151</td>\n<td>5.8</td>\n</tr>\n<tr>\n<td>2048</td>\n<td>4</td>\n<td>69.1</td>\n<td>3.70</td>\n<td>91.7</td>\n<td><strong>148</strong></td>\n<td>5.8</td>\n</tr>\n<tr>\n<td>512</td>\n<td>8</td>\n<td>68.6</td>\n<td>2.92</td>\n<td>90.0</td>\n<td>174</td>\n<td>10.9</td>\n</tr>\n<tr>\n<td>512</td>\n<td>16</td>\n<td>65.9</td>\n<td>1.97</td>\n<td>86.5</td>\n<td>181</td>\n<td>16.4</td>\n</tr>\n</tbody>\n</table></div>\n<p>增大窗口可略微提升语言建模指标（PPL 从 162 降至 148），但增大 chunk 会显著损害生成质量（UTMOS 从 3.69 降至 1.97），说明 chunk 大小应与编解码器的帧级粒度对齐。</p>",
      "quiz": {
        "q": "WavSLM 选择 WavLM 第 6 层作为编解码器与语言模型的分割点，主要原因是什么？",
        "options": [
          "第 6 层的计算量最小，有利于降低推理延迟",
          "第 6 层处于语义与声学信息的平衡点，单码本即可编码两类信息",
          "第 6 层之后的层数恰好是 18 层，与标准 GPT-2 架构一致",
          "第 6 层的隐藏维度最适合向量量化操作"
        ],
        "answer": 1,
        "explain": "WavLM 浅层偏重声学细节，深层偏重语义抽象。第 6 层恰好在两者之间取得平衡，使得单个码本就能同时保留足够的语义和声学信息，这是 WavSLM 单流设计成立的关键前提。"
      }
    },
    {
      "id": "desta_audio",
      "num": 30,
      "name": "Desta2.5-Audio",
      "fullName": "通用音频大模型 (Desta2.5-Audio)",
      "year": "2026",
      "org": "—",
      "parent": "qwen2_audio",
      "paperUrl": "https://ieeexplore.ieee.org/abstract/document/11447408/",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "自生成跨模态对齐",
      "summary": "Desta2.5-Audio 的核心目标是：自生成跨模态对齐。",
      "keyPoints": [
        "核心动机：自生成跨模态对齐",
        "演化来源：继承或改进自 qwen2_audio",
        "代表机构：—"
      ],
      "detail": "<p>自生成跨模态对齐</p>"
    }
  ],
  "categories": {
    "foundation": {
      "label": "奠基算法",
      "color": "#607D8B"
    },
    "ssl_representation": {
      "label": "自监督表征",
      "color": "#4CAF50"
    },
    "asr": {
      "label": "语音识别",
      "color": "#2196F3"
    },
    "speaker": {
      "label": "说话人识别",
      "color": "#9C27B0"
    },
    "audio_llm": {
      "label": "音频大语言模型",
      "color": "#FF9800"
    },
    "frontier_2026": {
      "label": "2026前沿",
      "color": "#E91E63"
    }
  },
  "projectUrls": {}
};
