/**
 * mm_sound-data.js — 由 pipeline/build.py 于 2026-06-16 17:00:18 自动生成。
 * 源文件：content/mm/mm_sound.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "multimodal",
    "topic_id": "mm_sound",
    "topic_name": "音频理解",
    "page_title": "音频理解 算法总结",
    "page_subtitle": "2026-06-16 版",
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
      "summary": "i-vector 提出了用一个低维全变分空间同时吸收说话人和信道变化的方法，把变长语音的 GMM 统计量压缩成固定长度身份向量，再交给 LDA/WCCN/PLDA 等后端去补偿信道并完成说话人验证。",
      "keyPoints": [
        "全变分建模：用单一矩阵 <span class=\"kb-math kb-math-inline\">T</span> 替代 JFA 中显式拆分的说话人子空间和信道子空间。",
        "固定长度表示：每段语音由 Baum-Welch 零阶/一阶统计量估计出一个低维 <span class=\"kb-math kb-math-inline\">w</span>，即 i-vector。",
        "核心生成式公式：<span class=\"kb-math kb-math-inline\">M(u)=m+T w(u)</span>，其中 <span class=\"kb-math kb-math-inline\">m</span> 是 UBM 均值超向量，<span class=\"kb-math kb-math-inline\">T</span> 是全变分矩阵，<span class=\"kb-math kb-math-inline\">w\\sim\\mathcal{N}(0,I)</span>。",
        "离线训练流程：训练 UBM-GMM，累积每段语音的充分统计量，用 EM 估计 <span class=\"kb-math kb-math-inline\">T</span>，再训练 LDA/WCCN/PLDA 后端。",
        "在线验证流程：注册语音和测试语音分别提取 i-vector，做长度归一化和会话补偿，用余弦或 PLDA 评分。",
        "关键转变：前端不再强行判断哪些维度是说话人、哪些维度是信道，而是把可变因素统一编码，把判别与补偿留给后端。",
        "历史影响：i-vector 成为深度说话人嵌入之前的主流框架，也为后来的 d-vector、x-vector 建立了“语音段级嵌入”的范式。"
      ],
      "detail": "<p><img alt=\"i-vector 提取流程\" src=\"https://speechprocessingbook.aalto.fi/_images/165126497.png\" />\n<em>图：i-vector 提取器用 UBM 后验计算 Baum-Welch 统计量，再结合全变分矩阵把高维统计量投影为低维 i-vector。</em></p>\n<pre><code class=\"language-python\"># i-vector 训练、提取与验证流程\n\n# ---------- 离线训练 ----------\nfeatures = extract_mfcc(all_training_audio)\nubm = train_gmm_ubm(features, num_components=C)\n\n# 每条训练语音都先被当作一个独立 session，用 UBM 统计其分量占有率和中心化一阶统计量\nstats = []\nfor utterance in training_utterances:\n    gamma = ubm.posterior(utterance.frames)\n    N = sum_t(gamma[t, c] for c in range(C))\n    F = sum_t(gamma[t, c] * utterance.frames[t] for c in range(C))\n    F_centered = F - N * ubm.means\n    stats.append((N, F_centered))\n\n# EM 估计全变分矩阵 T\nT = random_matrix(C * feature_dim, ivector_dim)\nfor iteration in range(num_em_iters):\n    posteriors = []\n    for N, F_centered in stats:\n        precision = I + T.T @ Sigma_inv @ N @ T\n        cov_w = inverse(precision)\n        mean_w = cov_w @ T.T @ Sigma_inv @ F_centered\n        posteriors.append((mean_w, cov_w + outer(mean_w, mean_w)))\n\n    for component in range(C):\n        A_c = sum(N_u[component] * Eww_u for (N_u, _), (_, Eww_u) in zip(stats, posteriors))\n        B_c = sum(F_u[component] @ Ew_u.T for (_, F_u), (Ew_u, _) in zip(stats, posteriors))\n        T[component] = B_c @ inverse(A_c)\n\n# 训练后端：LDA/WCCN/PLDA 或余弦评分参数\ntrain_ivectors = [extract_ivector(u, ubm, T) for u in labeled_training_utterances]\nbackend = train_backend(train_ivectors, speaker_labels)\n\n# ---------- 在线验证 ----------\nenroll_w = backend.transform(extract_ivector(enroll_audio, ubm, T))\ntest_w = backend.transform(extract_ivector(test_audio, ubm, T))\nscore = plda_or_cosine(enroll_w, test_w)\naccept = score &gt; threshold\n</code></pre>\n<h5>1. 从 JFA 到全变分空间</h5>\n<p>JFA 的基本想法是把 GMM 超向量拆成说话人项、信道项和残差项，例如：</p>\n<div class=\"kb-math kb-math-display\">M(u)=m+V y(s)+U x(u)+D z(s)</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">V</span> 试图只表示说话人变化，<span class=\"kb-math kb-math-inline\">U</span> 试图只表示信道或会话变化。i-vector 论文的关键观察是：这种前端拆分并不干净，JFA 的信道因子里也能保留明显的说话人信息。如果一个“信道子空间”本身已经可用于说话人判别，那么先验地把变化拆成两块反而可能损失信息。</p>\n<p>i-vector 因此把模型简化成：</p>\n<div class=\"kb-math kb-math-display\">M(u)=m+T w(u),\\qquad w(u)\\sim\\mathcal{N}(0,I)</div>\n<p>这个 <span class=\"kb-math kb-math-inline\">T</span> 被称为 total variability matrix，因为它同时覆盖说话人差异、录音通道、语音内容、噪声条件等所有能让语音段偏离 UBM 均值超向量的主要方向。前端只负责生成一个信息尽量完整的低维向量 <span class=\"kb-math kb-math-inline\">w</span>，后端再根据说话人标签学习哪些方向应该保留、哪些方向应该抑制。</p>\n<h5>2. Baum-Welch 统计量如何变成 i-vector</h5>\n<p>给定 UBM 的第 <span class=\"kb-math kb-math-inline\">c</span> 个高斯分量，语音 <span class=\"kb-math kb-math-inline\">u</span> 的零阶统计量 <span class=\"kb-math kb-math-inline\">N_c(u)</span> 表示该语音有多少帧“软分配”给该分量，一阶统计量 <span class=\"kb-math kb-math-inline\">F_c(u)</span> 是这些帧的加权特征和。中心化一阶统计量写作：</p>\n<div class=\"kb-math kb-math-display\">\\tilde{F}_c(u)=F_c(u)-N_c(u)m_c</div>\n<p>把所有分量拼接后，i-vector 的后验协方差和后验均值为：</p>\n<div class=\"kb-math kb-math-display\">C_u=\\left(I+T^\\top \\Sigma^{-1}N(u)T\\right)^{-1}</div>\n<div class=\"kb-math kb-math-display\">\\hat{w}(u)=C_uT^\\top\\Sigma^{-1}\\tilde{F}(u)</div>\n<p>直觉上，<span class=\"kb-math kb-math-inline\">\\tilde{F}(u)</span> 是这段语音相对 UBM 的“偏移证据”，<span class=\"kb-math kb-math-inline\">T^\\top\\Sigma^{-1}</span> 把高维偏移投影回低维全变分空间，<span class=\"kb-math kb-math-inline\">I+T^\\top\\Sigma^{-1}N(u)T</span> 则扮演后验精度矩阵。语音越长，<span class=\"kb-math kb-math-inline\">N(u)</span> 越大，观测证据越强，后验方差越小；短语音证据不足时，标准正态先验会把 <span class=\"kb-math kb-math-inline\">w</span> 拉回原点，避免过度相信噪声统计量。</p>\n<h5>3. 为什么 <span class=\"kb-math kb-math-inline\">T</span> 可以用 EM 训练</h5>\n<p>训练 <span class=\"kb-math kb-math-inline\">T</span> 时，<span class=\"kb-math kb-math-inline\">w(u)</span> 是隐变量，观测到的是 UBM 下的充分统计量。E-step 用当前 <span class=\"kb-math kb-math-inline\">T</span> 计算每段语音的 <span class=\"kb-math kb-math-inline\">\\mathbb{E}[w]</span> 和 <span class=\"kb-math kb-math-inline\">\\mathbb{E}[ww^\\top]</span>；M-step 在固定这些后验矩的情况下最大化期望似然。由于 UBM 协方差通常近似为块对角或对角形式，更新 <span class=\"kb-math kb-math-inline\">T</span> 可以按高斯分量分块求解：</p>\n<div class=\"kb-math kb-math-display\">A_c=\\sum_u N_c(u)\\mathbb{E}[w(u)w(u)^\\top],\\qquad\nB_c=\\sum_u \\tilde{F}_c(u)\\mathbb{E}[w(u)]^\\top</div>\n<div class=\"kb-math kb-math-display\">T_c=B_cA_c^{-1}</div>\n<p>这使得原本 <span class=\"kb-math kb-math-inline\">CF\\times R</span> 的大矩阵估计变成 <span class=\"kb-math kb-math-inline\">C</span> 个相对可控的线性问题。这里 <span class=\"kb-math kb-math-inline\">C</span> 是 UBM 高斯数，<span class=\"kb-math kb-math-inline\">F</span> 是声学特征维度，<span class=\"kb-math kb-math-inline\">R</span> 是 i-vector 维度；典型情况下 <span class=\"kb-math kb-math-inline\">CF</span> 可达数万，而 <span class=\"kb-math kb-math-inline\">R</span> 常取几百，因此低秩结构是可训练和可部署的关键。</p>\n<h5>4. 后端补偿是 i-vector 系统的另一半</h5>\n<p>原始 i-vector 并不是纯说话人向量，它仍混有通道、语音内容和噪声信息。论文路线的重点是“前端保留，后端消除”：LDA 最大化说话人间散度并压缩说话人内散度，WCCN 对说话人内协方差大的方向做白化或抑制，长度归一化让向量分布更接近 PLDA 的高斯假设。</p>\n<p>余弦评分的形式很直接：</p>\n<div class=\"kb-math kb-math-display\">\\operatorname{score}(w_1,w_2)=\\frac{w_1^\\top w_2}{\\|w_1\\|\\|w_2\\|}</div>\n<p>PLDA 则进一步假设补偿后的 i-vector 可分解为说话人隐变量和残差噪声，用同说话人与异说话人的似然比作为验证分数。这个后端设计解释了为什么 i-vector 能比 JFA 更灵活：JFA 在前端决定分解方式，i-vector 则让监督后端根据验证目标重新组织空间。</p>\n<h5>5. 方法边界与后续影响</h5>\n<p>i-vector 的优势在于稳定、数据需求相对可控、后端理论成熟，尤其适合传统电话信道和 NIST SRE 风格评测。但它的前端仍是无监督最大似然训练，<span class=\"kb-math kb-math-inline\">T</span> 的目标不是直接区分说话人；短语音条件下 Baum-Welch 统计量不稳定，向量会更受先验和噪声影响。x-vector 后来用监督分类训练的 TDNN 直接学习说话人判别嵌入，本质上就是把 i-vector 中“固定长度语音段表示”的思想换成了神经网络提取器。</p>\n<div class=\"key-point\">💡 关键：i-vector 的创新不只是一个公式，而是把说话人验证系统拆成“通用前端表示 + 判别式/概率式后端”的工程范式。</div>",
      "quiz": {
        "q": "i-vector 相比 JFA 的核心建模变化是什么？",
        "options": [
          "把所有语音帧直接输入 softmax 分类器",
          "用一个全变分空间统一建模说话人和信道变化，再由后端补偿",
          "只保留信道子空间并丢弃说话人子空间",
          "用动态时间规整替代 GMM-UBM"
        ],
        "answer": 1,
        "explain": "i-vector 不再在前端显式拆分说话人和信道子空间，而是用 T 矩阵提取统一低维表示，并在后端通过 LDA/WCCN/PLDA 等方法处理会话变化。"
      }
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
      "summary": "x-vector 提出了用 TDNN 帧级网络加统计池化层训练说话人分类器，并从中间段级层提取固定长度说话人嵌入的方法，解决了 i-vector 无监督前端判别性不足和对噪声增强利用不充分的问题。",
      "keyPoints": [
        "监督式嵌入：用说话人 ID 作为分类标签训练 DNN，使提取器直接优化说话人可分性。",
        "TDNN 帧级建模：前 5 层在有限时间上下文上抽取帧级说话人线索，最终输出 1500 维帧表示。",
        "统计池化：对整段帧级表示计算均值和标准差，把任意长度语音映射成固定 3000 维段级表示。",
        "x-vector 提取点：通常从 segment6 层的仿射输出提取 512 维嵌入，训练时保留 softmax，推理时丢弃分类层。",
        "数据增强：用混响、babble、音乐和噪声扩充训练集，使监督 DNN 学会忽略非说话人因素。",
        "后端兼容：提取的 x-vector 继续使用中心化、LDA、长度归一化和 PLDA 等 i-vector 生态中的成熟后端。",
        "实验结论：在 SITW 与 NIST SRE 2016 等测试上，增强训练的 x-vector 系统超过 acoustic i-vector 和 BNF i-vector 基线。"
      ],
      "detail": "<p><img alt=\"x-vector 系统的帧级与段级结构\" src=\"https://media.springernature.com/full/springer-static/image/art%3A10.1007%2Fs10772-023-10058-5/MediaObjects/10772_2023_10058_Fig1_HTML.png\" />\n<em>图：x-vector 系统族的典型分层结构：帧级 TDNN 提取局部特征，统计池化汇总为段级表示，再经全连接层输出说话人嵌入或分类结果。</em></p>\n<pre><code class=\"language-python\"># x-vector 训练、提取与验证流程\n\n# ---------- 训练 TDNN 说话人分类器 ----------\nfor features, speaker_id in minibatches(training_chunks):\n    # features: T x 24 filterbank 特征，chunk 通常约 2 到 4 秒\n    h1 = relu(tdnn(features, context=[-2, -1, 0, 1, 2], out_dim=512))\n    h2 = relu(tdnn(h1,       context=[-2, 0, 2],        out_dim=512))\n    h3 = relu(tdnn(h2,       context=[-3, 0, 3],        out_dim=512))\n    h4 = relu(affine(h3, out_dim=512))\n    h5 = relu(affine(h4, out_dim=1500))\n\n    mean = h5.mean(dim=&quot;time&quot;)\n    std = h5.std(dim=&quot;time&quot;)\n    pooled = concat(mean, std)       # 3000 维，和输入时长无关\n\n    segment6_affine = affine(pooled, out_dim=512)\n    segment6 = relu(segment6_affine)\n    segment7 = relu(affine(segment6, out_dim=512))\n    logits = affine(segment7, out_dim=num_training_speakers)\n\n    loss = cross_entropy(logits, speaker_id)\n    update_network(loss)\n\n# ---------- 提取 x-vector ----------\ndef extract_xvector(utterance):\n    h5 = forward_frame_layers(utterance)\n    pooled = concat(mean_over_time(h5), std_over_time(h5))\n    return segment6_affine_output(pooled)  # 常用 ReLU 前的 512 维输出\n\n# ---------- 验证后端 ----------\nenroll_x = length_norm(LDA(center(extract_xvector(enroll_audio))))\ntest_x = length_norm(LDA(center(extract_xvector(test_audio))))\nscore = PLDA(enroll_x, test_x)\naccept = score &gt; threshold\n</code></pre>\n<h5>1. 为什么要从 i-vector 转向监督 DNN</h5>\n<p>i-vector 的 UBM 和全变分矩阵主要由最大似然目标训练，并不直接知道“哪些差异能区分说话人”。x-vector 把前端训练改成说话人分类任务：输入一段语音，网络必须预测训练集中对应的 speaker ID。分类任务本身迫使隐藏层保留稳定的说话人属性，压低语音内容、噪声和通道条件等对类别无益的变化。</p>\n<p>这种做法也改变了数据增强的价值。对无监督 i-vector 来说，加入噪声/混响样本只是改变声学分布，不一定会让 <span class=\"kb-math kb-math-inline\">T</span> 学到更强的说话人判别方向；对监督 x-vector 来说，同一个说话人的增强样本共享标签，网络会被训练成在噪声和房间响应变化下仍输出同一类别，因此增强直接转化为鲁棒性。</p>\n<h5>2. TDNN 帧级层负责有限上下文建模</h5>\n<p>x-vector 的帧级部分是时延神经网络。论文中的前 3 个 TDNN 层使用稀疏时间拼接逐步扩大感受野：第一层看 <span class=\"kb-math kb-math-inline\">[t-2,t+2]</span>，第二层看 <span class=\"kb-math kb-math-inline\">\\{t-2,t,t+2\\}</span>，第三层看 <span class=\"kb-math kb-math-inline\">\\{t-3,t,t+3\\}</span>。叠加后，frame3 的总上下文约为 15 帧，能够覆盖短时音素和发音方式线索。</p>\n<p>frame4 和 frame5 不再扩大时间上下文，而是逐帧做非线性变换，并把维度提升到 1500。这样的设计把“局部时间模式提取”和“全局语音段聚合”分开：TDNN 层只负责每个时间点附近的声学模式，统计池化层再把整段语音的信息汇总起来。</p>\n<h5>3. 统计池化是变长到定长的核心接口</h5>\n<p>设 frame5 输出为 <span class=\"kb-math kb-math-inline\">\\mathbf{h}_1,\\ldots,\\mathbf{h}_T</span>，其中 <span class=\"kb-math kb-math-inline\">\\mathbf{h}_t\\in\\mathbb{R}^{1500}</span>。统计池化计算：</p>\n<div class=\"kb-math kb-math-display\">\\boldsymbol{\\mu}=\\frac{1}{T}\\sum_{t=1}^{T}\\mathbf{h}_t</div>\n<div class=\"kb-math kb-math-display\">\\boldsymbol{\\sigma}=\\sqrt{\\frac{1}{T}\\sum_{t=1}^{T}(\\mathbf{h}_t-\\boldsymbol{\\mu})^2}</div>\n<p>最终段级向量为 <span class=\"kb-math kb-math-inline\">[\\boldsymbol{\\mu};\\boldsymbol{\\sigma}]\\in\\mathbb{R}^{3000}</span>。均值描述整段语音的平均说话人特征，标准差描述这些特征在时间上的变化范围。只用最后一帧会丢掉大部分语音段信息，只用均值又会忽略韵律和发音稳定性差异，因此均值和标准差的拼接是一个简单但有效的全局描述。</p>\n<h5>4. x-vector 的提取位置与训练目标</h5>\n<p>网络训练时最后一层是 <span class=\"kb-math kb-math-inline\">N</span> 类 softmax，<span class=\"kb-math kb-math-inline\">N</span> 是训练说话人数。训练损失是标准交叉熵：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}=-\\log\\frac{\\exp(z_{y})}{\\sum_{s=1}^{N}\\exp(z_s)}</div>\n<p>完成训练后，softmax 层只作为训练约束，不参与验证。x-vector 通常从 segment6 层的仿射输出提取，而不是从最终 softmax 概率提取，因为概率维度绑定训练说话人集合，不能泛化到新说话人；仿射嵌入则保留了可迁移的连续判别特征。</p>\n<p>论文还强调了训练数据规模和增强策略。增强方式包括混响、babble、多种环境噪声和音乐叠加，形成“同一说话人、多种声学条件”的训练信号。网络因此学习到的不是某个固定录音环境，而是跨环境稳定的说话人线索。</p>\n<h5>5. 后端沿用 i-vector 体系但前端更判别</h5>\n<p>x-vector 的后端通常仍是中心化、LDA、长度归一化和 PLDA。LDA 把 512 维嵌入投影到更适合验证的低维空间，PLDA 估计同说话人和异说话人嵌入对的似然比。这个组合说明 x-vector 并不是完全抛弃传统说话人验证体系，而是用监督神经嵌入替换 i-vector 前端。</p>\n<p>与 d-vector 相比，x-vector 的统计池化显式针对变长文本无关说话人验证；与 i-vector 相比，它把“提取器训练目标”从无监督似然改成有监督 speaker classification。这个改变让 x-vector 更容易从大规模带 speaker ID 的数据和数据增强中获益，也解释了它后来成为 ECAPA-TDNN 等改进模型的直接基线。</p>\n<div class=\"key-point\">💡 关键：x-vector 的方法核心不是“某个 512 维向量”，而是 TDNN 帧级建模、统计池化、监督说话人分类和 PLDA 后端组成的一整套训练/验证接口。</div>",
      "quiz": {
        "q": "x-vector 中统计池化层的主要作用是什么？",
        "options": [
          "把 softmax 输出转换成说话人概率",
          "将变长帧级特征序列聚合成固定维度的段级表示",
          "用 PLDA 计算注册语音和测试语音的似然比",
          "随机混合噪声与混响以扩充训练集"
        ],
        "answer": 1,
        "explain": "统计池化对所有帧级输出计算均值和标准差，使任意长度语音都能变成固定 3000 维段级向量，后续全连接层才能提取 x-vector。"
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
      "summary": "ECAPA-TDNN 在 x-vector/TDNN 框架上引入 SE-Res2Net 多尺度块、多层特征聚合和通道相关注意力统计池化，使说话人嵌入同时利用更宽时间上下文、通道依赖和不同层级的说话人线索。",
      "keyPoints": [
        "继承 x-vector 主线：仍采用帧级 TDNN 特征提取、统计池化和段级说话人嵌入。",
        "SE-Res2Block：把 1D Res2Net 多尺度卷积和 Squeeze-and-Excitation 通道重标定合入 TDNN 帧级层。",
        "多尺度时间建模：Res2Net 在一个残差块内部拆分通道并层级连接，获得多种时间感受野。",
        "多层特征聚合：拼接多个 SE-Res2Block 的输出，再用 <span class=\"kb-math kb-math-inline\">1\\times1</span> Conv1D 融合，避免只依赖最后一层特征。",
        "通道相关注意力池化：每个通道学习自己的时间注意力权重，让不同说话人属性关注不同帧。",
        "全局上下文注入：SE 块和注意力池化都使用整段语音统计量，使局部帧特征能感知录音级条件。",
        "训练设置：论文使用 VoxCeleb2 训练，AAM-Softmax 分类损失，余弦距离和自适应 s-norm 评分。",
        "实验结果：ECAPA-TDNN 在 VoxCeleb1、VoxCeleb1-E/H 和 VoxSRC 2019 上显著优于强 TDNN/ResNet 基线。"
      ],
      "detail": "<p><img alt=\"ECAPA-TDNN 网络拓扑\" src=\"https://ar5iv.labs.arxiv.org/html/2005.07143/assets/images/full_ecapa.png\" />\n<em>图：ECAPA-TDNN 主体拓扑，包含初始 Conv1D、三个不同 dilation 的 SE-Res2Block、多层特征聚合、注意力统计池化、全连接嵌入层和 AAM-Softmax。</em></p>\n<p><img alt=\"ECAPA-TDNN 的 SE-Res2Block\" src=\"https://ar5iv.labs.arxiv.org/html/2005.07143/assets/images/se_block_ecapa.png\" />\n<em>图：SE-Res2Block 在残差分支内串联 <span class=\"kb-math kb-math-inline\">1\\times1</span> Conv1D、Res2 dilated Conv1D、<span class=\"kb-math kb-math-inline\">1\\times1</span> Conv1D 和 SE-Block。</em></p>\n<pre><code class=\"language-python\"># ECAPA-TDNN 训练与嵌入提取流程\n\n# 输入特征: 80 维 MFCC 或 log-mel 序列，形状 C_in x T\nfor features, speaker_id in minibatches(two_second_crops):\n    x0 = conv1d_relu_bn(features, channels=C, kernel=5, dilation=1)\n\n    # 带全局通道注意力的多尺度 TDNN 块\n    x1 = se_res2block(x0, channels=C, kernel=3, dilation=2, scale=8)\n    x2 = se_res2block(x1 + x0, channels=C, kernel=3, dilation=3, scale=8)\n    x3 = se_res2block(x2 + x1 + x0, channels=C, kernel=3, dilation=4, scale=8)\n\n    # Multi-layer Feature Aggregation (MFA)\n    multi_layer = concat([x1, x2, x3], dim=&quot;channel&quot;)  # 3C x T\n    frame_repr = conv1d_relu_bn(multi_layer, channels=1536, kernel=1)\n\n    # Channel-dependent attentive statistics pooling\n    alpha = channel_attention(frame_repr, global_mean_std(frame_repr))\n    mean = sum_t(alpha[:, t] * frame_repr[:, t])\n    std = sqrt(sum_t(alpha[:, t] * frame_repr[:, t] ** 2) - mean ** 2)\n    pooled = batch_norm(concat([mean, std]))\n\n    embedding = fc_bn(pooled, out_dim=192)\n    logits = aam_softmax(embedding, speaker_id, margin=0.2, scale=30)\n    loss = cross_entropy(logits, speaker_id)\n    update_network(loss)\n\n# 推理时取最终 FC 层 embedding，长度归一化后用 cosine 或 s-norm 后端评分\n</code></pre>\n<h5>1. ECAPA 为什么要改造 x-vector 的帧级层</h5>\n<p>原始 x-vector 的 TDNN 帧级层感受野有限，并且只把最后一层帧级输出送入统计池化。ECAPA-TDNN 的出发点是：说话人特征并不只存在于一种时间尺度或一种抽象层级中。短时音色、音素级发音习惯、韵律变化和录音级通道条件都可能帮助验证，因此网络需要更丰富的时间上下文和跨层信息通路。</p>\n<p>ECAPA 这个名字来自 Emphasized Channel Attention, Propagation and Aggregation。它强调三件事：用 SE 和通道相关池化建模 channel attention；用残差和求和连接传播中间特征；用 MFA 聚合多个层级的特征。相比只堆叠 TDNN 层，ECAPA 更像一个面向 1D 语音序列定制的 ResNet/Res2Net 变体。</p>\n<h5>2. SE-Res2Block：多尺度卷积加通道重标定</h5>\n<p>SE-Res2Block 的中间层使用 Res2Net 思想：把通道拆成若干组，后一组卷积接收前一组的输出，从而在同一个块内部形成层级残差路径。若通道组为 <span class=\"kb-math kb-math-inline\">\\mathbf{x}_1,\\ldots,\\mathbf{x}_s</span>，可抽象为：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{y}_1=\\mathbf{x}_1,\\qquad\n\\mathbf{y}_i=\\operatorname{Conv}_i(\\mathbf{x}_i+\\mathbf{y}_{i-1}),\\quad i=2,\\ldots,s</div>\n<p>这种结构让不同通道组拥有不同有效感受野，比单个 dilated Conv1D 更细粒度地捕获多尺度时间模式。ECAPA 的三个 SE-Res2Block 还使用不同 dilation，例如 <span class=\"kb-math kb-math-inline\">d=2,3,4</span>，进一步扩展可见时间范围。</p>\n<p>SE 部分负责用全局语音段统计量重标定通道。对帧级特征 <span class=\"kb-math kb-math-inline\">\\mathbf{h}_{c,t}</span>，先做 squeeze：</p>\n<div class=\"kb-math kb-math-display\">z_c=\\frac{1}{T}\\sum_{t=1}^{T}h_{c,t}</div>\n<p>再通过瓶颈 MLP 和 sigmoid 得到通道权重：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{s}=\\sigma(W_2\\delta(W_1\\mathbf{z}))</div>\n<p>最后做逐通道缩放 <span class=\"kb-math kb-math-inline\">\\tilde{\\mathbf{h}}_{c,t}=s_c\\mathbf{h}_{c,t}</span>。这使每个局部帧特征都能根据整段录音的全局条件调整强度，例如增强稳定说话人线索、弱化噪声敏感通道。</p>\n<h5>3. Propagation 与 Aggregation 的作用</h5>\n<p>ECAPA 不只取最后一个 SE-Res2Block 的输出。多层特征聚合把多个 block 的输出按通道拼接：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{H}_{\\text{MFA}}=[\\mathbf{H}_1;\\mathbf{H}_2;\\mathbf{H}_3]</div>\n<p>随后用 <span class=\"kb-math kb-math-inline\">1\\times1</span> Conv1D 将拼接后的 <span class=\"kb-math kb-math-inline\">3C</span> 通道融合到统一维度。浅层特征保留较多局部声学细节，深层特征更偏向抽象说话人属性；MFA 让池化层同时接触这些层级，而不是押注最后一层已经无损保留全部信息。</p>\n<p>Propagation 体现在残差连接上。论文还讨论了把每个 SE-Res2Block 的残差输入定义为此前所有块输出的和，而不是只连接前一层。这样做的好处是保持参数量稳定，同时让梯度和中间特征更容易流过整个 TDNN 主干。对说话人验证这种细粒度任务，丢失早期层的音色线索可能直接影响嵌入质量。</p>\n<h5>4. 通道相关注意力统计池化</h5>\n<p>普通 attentive statistics pooling 给每个时间帧一个注意力权重，所有通道共享同一组时间权重。ECAPA 认为不同通道可能响应不同类型的说话人属性，例如某些通道更关注元音稳定区，某些通道更关注辅音或瞬态发音。因此它使用通道相关的注意力权重：</p>\n<div class=\"kb-math kb-math-display\">e_{t,c}=\\mathbf{v}_c^\\top f(W\\mathbf{h}_t+\\mathbf{b})+k_c</div>\n<div class=\"kb-math kb-math-display\">\\alpha_{t,c}=\\frac{\\exp(e_{t,c})}{\\sum_{\\tau=1}^{T}\\exp(e_{\\tau,c})}</div>\n<p>每个通道的加权均值和标准差分别为：</p>\n<div class=\"kb-math kb-math-display\">\\mu_c=\\sum_{t=1}^{T}\\alpha_{t,c}h_{t,c}</div>\n<div class=\"kb-math kb-math-display\">\\sigma_c=\\sqrt{\\sum_{t=1}^{T}\\alpha_{t,c}h_{t,c}^{2}-\\mu_c^2}</div>\n<p>论文还把全局非加权均值和标准差拼接进注意力网络，使注意力不仅看局部帧 <span class=\"kb-math kb-math-inline\">\\mathbf{h}_t</span>，也看整段录音的上下文。这一点和 SE 块的思想一致：局部决策应受全局录音条件调制。</p>\n<h5>5. AAM-Softmax 与验证后端</h5>\n<p>ECAPA-TDNN 用加性角度间隔 softmax 训练说话人分类器。给定归一化嵌入和类别权重，目标类 logit 可写为：</p>\n<div class=\"kb-math kb-math-display\">z_y=s\\cos(\\theta_y+m)</div>\n<p>非目标类仍为 <span class=\"kb-math kb-math-inline\">z_j=s\\cos(\\theta_j)</span>。其中 <span class=\"kb-math kb-math-inline\">m</span> 是角度间隔，<span class=\"kb-math kb-math-inline\">s</span> 是缩放因子。这个损失迫使同一说话人的嵌入在角度空间更紧凑，不同说话人的嵌入角度间隔更大，天然适合后续余弦相似度评分。</p>\n<p>推理时，系统从最终全连接层提取 192 维嵌入，做长度归一化，并使用余弦距离；论文实验还使用 adaptive s-norm 稳定分数分布。ECAPA 的改进点主要集中在嵌入提取器本身，因此它能在不显著增加参数量的情况下超过 E-TDNN、较大 E-TDNN 和 ResNet 基线。</p>\n<div class=\"key-point\">💡 关键：ECAPA-TDNN 不是简单“给 x-vector 加注意力”，而是同时改造帧级块、跨层信息流和池化层，让通道、时间和层级三个维度都参与说话人嵌入学习。</div>",
      "quiz": {
        "q": "ECAPA-TDNN 中通道相关注意力统计池化相比普通统计池化的关键差异是什么？",
        "options": [
          "它完全取消了标准差，只保留均值",
          "它为每个通道学习不同的时间注意力权重，再计算加权均值和标准差",
          "它把所有帧裁剪成固定 2 秒长度后直接展平",
          "它只在 PLDA 后端中使用，不参与神经网络训练"
        ],
        "answer": 1,
        "explain": "ECAPA 的注意力池化让不同通道关注不同时间帧，并用这些通道相关权重计算加权统计量，因此能捕获更细粒度的说话人线索。"
      }
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
      "summary": "wav2vec 2.0 提出了在原始语音上进行自监督预训练的框架：先用卷积编码器得到连续 latent，再在 latent 空间掩码，用 Transformer 上下文表示去对比识别被掩码位置的量化语音单元，从而显著降低 ASR 对人工转写数据的依赖。",
      "keyPoints": [
        "<strong>端到端自监督语音预训练</strong>：直接从原始波形学习，预训练后用 CTC 在少量标注语音上微调",
        "<strong>连续输入、离散目标</strong>：Transformer 接收连续 latent 表示，训练目标是同一 latent 经 Gumbel-Softmax 产品量化后的离散向量",
        "<strong>掩码 latent 预测</strong>：在卷积特征序列上随机遮盖连续片段，而不是遮盖原始波形或 filterbank 特征",
        "<strong>对比学习目标</strong>：对每个被掩码时间步，从真实量化目标和同 utterance 采样的负例中识别正确目标",
        "<strong>码本多样性损失</strong>：通过最大化码本使用熵，避免少数 codeword 被过度使用",
        "<strong>低资源 ASR 效果突出</strong>：在 53k 小时无标注 LibriVox 预训练后，仅用 10 分钟标注数据可达 LibriSpeech test-clean/test-other 4.8/8.2 WER",
        "<strong>两阶段训练范式</strong>：无标注语音上预训练表征，有标注语音上冻结卷积编码器并用 CTC 微调识别头"
      ],
      "detail": "<h5>框架总览</h5>\n<p><img alt=\"wav2vec 2.0 框架图\" src=\"https://ar5iv.labs.arxiv.org/html/2006.11477/assets/x1.png\" />\n<em>图：wav2vec 2.0 同时学习上下文语音表示和离散语音单元；掩码后的 latent 进入 Transformer，未掩码的 latent 经量化器形成对比学习目标。</em></p>\n<pre><code class=\"language-python\"># wav2vec 2.0 预训练与微调伪代码\ndef wav2vec2_pretrain(raw_audio):\n    # 1. 原始波形 -&gt; 卷积特征，约 49 Hz，每帧步长约 20 ms\n    z = conv_feature_encoder(raw_audio)          # [T, d]\n\n    # 2. 生成 mask span，只遮盖 Transformer 输入，不遮盖量化目标\n    mask = sample_span_mask(T=len(z), p=0.065, span_len=10)\n    z_masked = z.clone()\n    z_masked[mask] = learned_mask_embedding\n\n    # 3. 上下文网络建模完整序列依赖\n    c = transformer_context_network(z_masked)    # [T, d]\n\n    # 4. 同一批 latent 经产品量化，作为被预测目标\n    q = gumbel_product_quantizer(z)              # [T, d_q]\n\n    # 5. 对每个 masked timestep 做对比分类\n    loss_m = 0.0\n    for t in masked_indices(mask):\n        positives = [q[t]]\n        negatives = sample_negatives(q, t, K=100, same_utterance=True)\n        candidates = positives + negatives\n        logits = [cosine(c[t], cand) / kappa for cand in candidates]\n        loss_m += cross_entropy(logits, target_index=0)\n\n    loss_d = codebook_diversity_loss(quantizer_probs)\n    return loss_m + alpha * loss_d\n\ndef wav2vec2_finetune(raw_audio, transcript):\n    z = conv_feature_encoder(raw_audio)\n    c = transformer_context_network(z)\n    logits = linear_ctc_head(c)\n    return ctc_loss(logits, transcript)\n</code></pre>\n<h5>1. 为什么在 latent 空间做掩码</h5>\n<p>wav2vec 2.0 的核心动机是解决语音标注昂贵的问题：ASR 需要大量转写文本，而无标注语音远多于标注语音。早期自监督语音方法已经证明“预测未来”或“预测离散语音单元”有效，但常见做法要么先离线学习量化器再训练上下文模型，要么把重建 filterbank 特征作为目标，容易把任务变成低层声学复原，而不是学习对识别有用的抽象结构。</p>\n<p>因此 wav2vec 2.0 把学习过程拆成两个角色但端到端联合训练：卷积编码器 <span class=\"kb-math kb-math-inline\">f: \\mathcal{X}\\mapsto\\mathcal{Z}</span> 从原始波形 <span class=\"kb-math kb-math-inline\">\\mathcal{X}</span> 得到 latent 序列 <span class=\"kb-math kb-math-inline\">\\mathbf{z}_1,\\dots,\\mathbf{z}_T</span>，Transformer <span class=\"kb-math kb-math-inline\">g:\\mathcal{Z}\\mapsto\\mathcal{C}</span> 在部分 latent 被替换成 mask embedding 的情况下输出上下文表示 <span class=\"kb-math kb-math-inline\">\\mathbf{c}_t</span>。关键是 <strong>Transformer 输入保持连续</strong>，这样不丢失细粒度声学信息；而 <strong>训练目标使用离散量化表示</strong>，这样避免模型只匹配说话人、信道、背景等过细节特征。</p>\n<p>论文的卷积特征编码器包含 7 个 temporal convolution block，通道数为 512，stride 为 <span class=\"kb-math kb-math-inline\">(5,2,2,2,2,2,2)</span>，kernel width 为 <span class=\"kb-math kb-math-inline\">(10,3,3,3,3,2,2)</span>。这会把 16 kHz 波形下采样到约 49 Hz，也就是相邻 latent 约 20 ms；每个 latent 的感受野约 25 ms。预训练时以概率 <span class=\"kb-math kb-math-inline\">p=0.065</span> 采样 mask span 起点，每段连续遮盖 <span class=\"kb-math kb-math-inline\">M=10</span> 个时间步，重叠后约 49% 的时间步被遮盖，平均遮盖片段约 299 ms。</p>\n<h5>2. 产品量化与 Gumbel-Softmax</h5>\n<p>量化模块把卷积输出 <span class=\"kb-math kb-math-inline\">\\mathbf{z}</span> 转换为离散目标 <span class=\"kb-math kb-math-inline\">\\mathbf{q}</span>。它使用产品量化：有 <span class=\"kb-math kb-math-inline\">G</span> 个 codebook，每个 codebook 有 <span class=\"kb-math kb-math-inline\">V</span> 个 entry，从每个 codebook 中选一个向量，拼接后再线性投影到目标维度。论文主要配置为 <span class=\"kb-math kb-math-inline\">G=2, V=320</span>，理论组合数为 <span class=\"kb-math kb-math-inline\">320^2=102{,}400</span> 个离散语音单元。</p>\n<p>Gumbel-Softmax 让离散选择可微。对第 <span class=\"kb-math kb-math-inline\">g</span> 个 codebook 的第 <span class=\"kb-math kb-math-inline\">v</span> 个 entry，选择概率为：</p>\n<div class=\"kb-math kb-math-display\">p_{g,v} =\n\\frac{\\exp((l_{g,v}+n_v)/\\tau)}\n{\\sum_{k=1}^{V}\\exp((l_{g,k}+n_k)/\\tau)}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">l_{g,v}</span> 是编码器输出映射得到的 logit，<span class=\"kb-math kb-math-inline\">n_v=-\\log(-\\log u)</span> 是 Gumbel 噪声，<span class=\"kb-math kb-math-inline\">u\\sim\\mathcal{U}(0,1)</span>，<span class=\"kb-math kb-math-inline\">\\tau</span> 是温度。前向传播用 hard argmax 选 codeword，反向传播用 soft 概率的梯度，这是 straight-through estimator 的典型用法。</p>\n<div class=\"key-point\">💡 关键：wav2vec 2.0 不把量化后的 <span class=\"kb-math kb-math-inline\">\\mathbf{q}</span> 送进 Transformer，而是只把 <span class=\"kb-math kb-math-inline\">\\mathbf{q}</span> 作为目标。论文消融显示，“连续输入 + 量化目标”优于“量化输入 + 量化目标”和“连续输入 + 连续目标”。</div>\n<h5>3. 对比学习目标如何工作</h5>\n<p>对每个被掩码时间步 <span class=\"kb-math kb-math-inline\">t</span>，Transformer 只能通过周围上下文产生 <span class=\"kb-math kb-math-inline\">\\mathbf{c}_t</span>。模型要从候选集合 <span class=\"kb-math kb-math-inline\">\\mathbf{Q}_t</span> 中找出真实量化目标 <span class=\"kb-math kb-math-inline\">\\mathbf{q}_t</span>，候选集合包含 1 个正例和 <span class=\"kb-math kb-math-inline\">K=100</span> 个从同一 utterance 其他掩码位置采样的负例。对比损失是：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{m}\n= -\\log\n\\frac{\\exp(\\operatorname{sim}(\\mathbf{c}_t,\\mathbf{q}_t)/\\kappa)}\n{\\sum_{\\tilde{\\mathbf{q}}\\sim\\mathbf{Q}_t}\n\\exp(\\operatorname{sim}(\\mathbf{c}_t,\\tilde{\\mathbf{q}})/\\kappa)}</div>\n<p>其中：</p>\n<div class=\"kb-math kb-math-display\">\\operatorname{sim}(\\mathbf{a},\\mathbf{b})\n= \\frac{\\mathbf{a}^{T}\\mathbf{b}}{\\|\\mathbf{a}\\|\\|\\mathbf{b}\\|}</div>\n<p><span class=\"kb-math kb-math-inline\">\\kappa=0.1</span> 是 contrastive temperature。这个目标比直接重建连续特征更难，因为模型必须利用音素、词形、局部上下文和长程依赖来排除负例；同时目标又不是人工标签，所以能在无转写语音上大规模训练。</p>\n<h5>4. 多样性损失防止码本坍缩</h5>\n<p>如果没有额外约束，模型可能只使用少数 codeword，使对比目标退化。wav2vec 2.0 加入 diversity loss，鼓励每个 codebook 的 entry 被均匀使用。整体预训练损失为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\mathcal{L}_m + \\alpha \\mathcal{L}_d</div>\n<p>论文中 <span class=\"kb-math kb-math-inline\">\\alpha=0.1</span>。对 <span class=\"kb-math kb-math-inline\">G</span> 个 codebook、每个 <span class=\"kb-math kb-math-inline\">V</span> 个 entry，若 <span class=\"kb-math kb-math-inline\">\\bar{p}_{g,v}</span> 表示 batch 内第 <span class=\"kb-math kb-math-inline\">g</span> 个 codebook 第 <span class=\"kb-math kb-math-inline\">v</span> 个 entry 的平均选择概率，则：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_d\n= \\frac{1}{GV}\\sum_{g=1}^{G}\\sum_{v=1}^{V}\n\\bar{p}_{g,v}\\log\\bar{p}_{g,v}</div>\n<p>这是负熵形式；最小化它等价于最大化平均分布的熵，使 codebook 覆盖更充分。直觉上，<span class=\"kb-math kb-math-inline\">\\mathcal{L}_m</span> 让每个时间步“可区分”，<span class=\"kb-math kb-math-inline\">\\mathcal{L}_d</span> 让整个离散空间“别塌缩”。</p>\n<h5>5. 微调阶段与传统 ASR 的连接</h5>\n<p>预训练后，wav2vec 2.0 丢弃量化训练头，在 Transformer 输出上接一个随机初始化线性层，用 CTC 进行 ASR 微调。LibriSpeech 设置中输出 vocabulary 是字符和 word boundary，微调时卷积特征编码器保持冻结，先只训练输出分类器，再更新 Transformer。论文还使用类似 SpecAugment 的时间和通道遮盖来缓解少量标注下的过拟合。</p>\n<p>这个范式与传统监督 ASR 的区别在于：监督 ASR 从一开始就用转写文本训练声学到字符/子词的映射；wav2vec 2.0 先用无标注音频学习“什么语音片段在上下文中合理”，再用少量文本标注把表征对齐到字词空间。因此它在低资源设置尤其有效。论文报告在 53.2k 小时 LibriVox 无标注数据上预训练 Large 模型，只用 10 分钟标注数据微调即可达到 4.8/8.2 WER；用完整 960 小时标注数据时达到 1.8/3.3 WER。</p>\n<h5>6. 与 vq-wav2vec / DiscreteBERT 的关键差异</h5>\n<p>vq-wav2vec 与 DiscreteBERT 更像“两步流水线”：先学离散单元，再训练上下文模型。wav2vec 2.0 把特征编码、量化和上下文建模放入同一个预训练目标中，量化器会随 ASR 有用的表示一起更新。同时，它把连续 latent 作为上下文模型输入，而不是把离散 token 当输入，这保留了更多声学细节。论文的量化消融中，“连续输入、量化目标”平均 WER 为 7.97，而“量化输入、量化目标”为 12.18，说明信息在输入端过早离散化会明显伤害表示学习。</p>",
      "quiz": {
        "q": "wav2vec 2.0 为什么采用“连续 latent 作为 Transformer 输入、量化 latent 作为训练目标”的设计？",
        "options": [
          "为了让模型完全避免使用卷积编码器",
          "为了保留输入端细粒度声学信息，同时让预测目标更抽象、更适合对比学习",
          "为了把 CTC 损失提前用于无标注预训练",
          "为了让负例必须来自不同语音样本"
        ],
        "answer": 1,
        "explain": "连续输入避免过早丢失声学信息，量化目标减少对说话人和信道等低层细节的直接重建，使模型更偏向学习对 ASR 有用的上下文语音结构。"
      }
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
      "summary": "Conformer 提出在 ASR 编码器中把 Transformer 的全局自注意力与 CNN 的局部卷积建模组合起来，用 Macaron 式双前馈层夹住 MHSA 和深度可分离卷积模块，解决纯 Transformer 局部模式不足、纯 CNN 全局依赖建模低效的问题。",
      "keyPoints": [
        "<strong>Conformer block</strong>：由半步残差 FFN、相对位置 MHSA、卷积模块、半步残差 FFN 和最终 LayerNorm 串联组成",
        "<strong>局部+全局联合建模</strong>：MHSA 负责内容相关的长程依赖，卷积模块负责相对位置局部相关和细粒度声学模式",
        "<strong>Macaron FFN 结构</strong>：两个 feed-forward module 分布在注意力/卷积前后，每个使用 <span class=\"kb-math kb-math-inline\">1/2</span> residual weight",
        "<strong>卷积模块设计</strong>：LayerNorm → pointwise convolution → GLU → 1D depthwise convolution → BatchNorm → Swish → pointwise convolution → Dropout",
        "<strong>相对位置编码</strong>：借鉴 Transformer-XL 的 relative sinusoidal positional encoding，增强对不同 utterance 长度的泛化",
        "<strong>Conformer-Transducer 实例化</strong>：在 LibriSpeech 上以 Conformer encoder + 单层 LSTM decoder + RNN-T/Transducer 训练",
        "<strong>高参数效率</strong>：10.3M、30.7M、118.8M 三档模型均优于同级强基线；118.8M 大模型在 test-clean/test-other 达到 2.1/4.3 WER，无 LM 时已很强"
      ],
      "detail": "<h5>架构总览</h5>\n<p><img alt=\"Conformer 编码器架构图\" src=\"https://ar5iv.labs.arxiv.org/html/2005.08100/assets/x1.png\" />\n<em>图：Conformer encoder 先做卷积下采样，再堆叠 N 个 Conformer block；每个 block 用两个半步 FFN 夹住 MHSA 和卷积模块。</em></p>\n<p><img alt=\"Conformer 卷积模块图\" src=\"https://ar5iv.labs.arxiv.org/html/2005.08100/assets/x2.png\" />\n<em>图：Conformer convolution module 使用 pointwise convolution + GLU 做通道门控，再用 1D depthwise convolution 捕获局部时间模式。</em></p>\n<pre><code class=\"language-python\"># Conformer encoder block 伪代码\ndef conformer_block(x):\n    # Macaron-style: 前置 FFN 只走半步 residual\n    x_tilde = x + 0.5 * feed_forward_module(x)\n\n    # 全局内容依赖：relative positional MHSA\n    x_att = x_tilde + mhsa_module(x_tilde, relative_positional_encoding=True)\n\n    # 局部时间模式：GLU + depthwise conv + BN + Swish\n    x_conv = x_att + convolution_module(x_att)\n\n    # 后置 FFN 仍然是半步 residual，最后做 layernorm\n    y = layer_norm(x_conv + 0.5 * feed_forward_module(x_conv))\n    return y\n\ndef convolution_module(x):\n    h = layer_norm(x)\n    h = pointwise_conv1d(h, out_channels=2 * d_model)\n    h = glu(h)                         # 门控线性单元\n    h = depthwise_conv1d(h, kernel_size=32)\n    h = batch_norm(h)\n    h = swish(h)\n    h = pointwise_conv1d(h, out_channels=d_model)\n    h = dropout(h, p=0.1)\n    return h\n\ndef conformer_transducer(features):\n    # 80-channel filterbank, 25 ms window, 10 ms stride\n    x = specaugment(features)\n    x = convolution_subsampling(x)      # 10 ms -&gt; 40 ms rate\n    for _ in range(num_encoder_layers):\n        x = conformer_block(x)\n    return transducer_loss(encoder=x, decoder=single_layer_lstm_decoder)\n</code></pre>\n<h5>1. 为什么 ASR 需要同时建模全局和局部</h5>\n<p>语音识别的输入是长时间序列。Transformer 的 self-attention 擅长让任意两个时间步直接交互，适合捕获跨音节、跨词甚至跨短语的上下文依赖；但它对局部平移等变性没有天然偏置，容易把短时声学模式的学习完全交给数据。CNN 则相反：卷积核在局部窗口内共享参数，天然适合捕获 formant 变化、音素边界、短时能量变化等局部模式，但要覆盖长距离依赖需要堆叠很多层或引入额外全局汇聚。</p>\n<p>Conformer 的设计目标不是简单把 CNN 和 Transformer 并排拼接，而是在一个 ASR encoder block 内让二者按顺序协作。论文的消融显示，卷积模块放在 MHSA 之后比放在 MHSA 之前或并行分支更好。这可以理解为：MHSA 先基于全局内容重新组织每个时间步的表示，卷积再在这个更语义化的局部邻域上提取相对位置模式。</p>\n<h5>2. Conformer block 的数学形式</h5>\n<p>对第 <span class=\"kb-math kb-math-inline\">i</span> 个 Conformer block，输入为 <span class=\"kb-math kb-math-inline\">x_i</span>，输出为 <span class=\"kb-math kb-math-inline\">y_i</span>。论文给出的 block 公式是：</p>\n<div class=\"kb-math kb-math-display\">\\begin{aligned}\n\\tilde{x}_i &amp;= x_i + \\frac{1}{2}\\mathrm{FFN}(x_i) \\\\\nx&#x27;_i &amp;= \\tilde{x}_i + \\mathrm{MHSA}(\\tilde{x}_i) \\\\\nx&#x27;&#x27;_i &amp;= x&#x27;_i + \\mathrm{Conv}(x&#x27;_i) \\\\\ny_i &amp;= \\mathrm{LayerNorm}\\left(x&#x27;&#x27;_i + \\frac{1}{2}\\mathrm{FFN}(x&#x27;&#x27;_i)\\right)\n\\end{aligned}</div>\n<p>这里的 <span class=\"kb-math kb-math-inline\">1/2</span> residual weight 来自 Macaron-Net。直觉上，一个标准 Transformer block 通常只有一个 FFN，而 Conformer 把 FFN 拆成前后两个“半步”更新：前一个 FFN 先做逐位置非线性变换，随后 MHSA 和 Conv 分别处理全局与局部交互，最后再用第二个 FFN 做逐位置整合。这种结构既增加了表达能力，又避免两个 FFN 残差叠加过强。</p>\n<h5>3. MHSA 模块：全局依赖与相对位置</h5>\n<p>Conformer 使用 multi-headed self-attention，并引入 Transformer-XL 风格的 relative sinusoidal positional encoding。ASR 中 utterance 长度差异很大，绝对位置编码会把模型绑定到训练时常见长度；相对位置编码让注意力更关注“两个声学帧相距多远”，这比“它们在整段语音中的绝对下标是多少”更符合语音序列的统计结构。</p>\n<p>在每个 attention head 中，标准注意力仍可写作：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{Attention}(Q,K,V)\n= \\mathrm{softmax}\\left(\\frac{QK^\\top}{\\sqrt{d_k}} + B_{\\mathrm{rel}}\\right)V</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">B_{\\mathrm{rel}}</span> 表示由相对位置信息产生的偏置或等价打分项。这个模块负责捕获远距离内容关系，例如当前音素的判定依赖后续上下文、同音词附近词形信息、长音频中的语速变化等。</p>\n<h5>4. 卷积模块：局部声学偏置</h5>\n<p>Conformer 的 convolution module 不是普通多层 CNN，而是轻量但有明确分工的局部建模单元。先用 pointwise convolution 把通道扩展到 <span class=\"kb-math kb-math-inline\">2d</span>，再经 GLU：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{GLU}(A,B)=A\\otimes\\sigma(B)</div>\n<p>GLU 相当于让模型学习“哪些通道在当前局部上下文中应该通过”。随后 1D depthwise convolution 沿时间轴对每个通道独立卷积，kernel size 在论文主模型中取 32，接着 BatchNorm 和 Swish 激活。depthwise convolution 的参数量远小于普通卷积，却保留了局部时间窗口的 inductive bias。</p>\n<div class=\"key-point\">💡 关键：论文消融中，移除 convolution block 会使 Conformer 大模型的 test-other WER 从 4.3 上升到 4.9；把 Macaron FFN 去掉也会变差，说明性能来自多个结构选择的组合，但卷积子块是最关键因素之一。</div>\n<h5>5. Conformer-Transducer 训练流程</h5>\n<p>论文把 Conformer 用在端到端 ASR 的 Transducer 框架中。输入是 80-channel filterbank，25 ms 窗口、10 ms 步长；先应用 SpecAugment，再经过 convolution subsampling，把帧率从 10 ms 降到 40 ms；之后堆叠多个 Conformer block。decoder 是单层 LSTM，训练目标是 RNN-T/Transducer loss，推理时可以配合外部 3 层 LSTM language model 做 shallow fusion。</p>\n<p>实验给出三档模型：Conformer(S) 10.3M 参数、16 层 encoder、144 维、4 个 attention heads；Conformer(M) 30.7M 参数、16 层 encoder、256 维、4 heads；Conformer(L) 118.8M 参数、17 层 encoder、512 维、8 heads。三者卷积核大小均为 32，decoder 均为单层 LSTM。优化器使用 Adam，<span class=\"kb-math kb-math-inline\">\\beta_1=0.9,\\beta_2=0.98,\\epsilon=10^{-9}</span>，并使用 Transformer learning-rate schedule 和 10k warmup。</p>\n<h5>6. 与 RNN-T、纯 Transformer、纯 CNN 的区别</h5>\n<p>RNN-T 是一种序列转录训练目标与解码框架，本身不限定 encoder 必须是 RNN；Conformer 可以看作把 RNN-T 中的 acoustic encoder 升级为局部+全局混合建模器。相比纯 Transformer encoder，Conformer 增加了局部卷积偏置和门控；相比纯 CNN encoder，Conformer 用 self-attention 直接获取全局上下文，而不依赖非常深的卷积堆叠或全局池化。</p>\n<p>在 LibriSpeech 上，Conformer(L) 不使用外部 LM 达到 test-clean/test-other 2.1/4.3 WER，使用 LM 后达到 1.9/3.9 WER。更重要的是参数效率：30.7M 的 Conformer(M) 已经超过 139M 参数的 Transformer Transducer 基线，10.3M 的 Conformer(S) 也优于同级 ContextNet(S)。这说明结构偏置对 ASR 的收益不只是更大模型带来的。</p>",
      "quiz": {
        "q": "Conformer block 中卷积模块放在 MHSA 之后的主要作用是什么？",
        "options": [
          "完全替代 self-attention，避免计算全局依赖",
          "在全局上下文重组后的表示上补充局部时间模式和相对位置声学偏置",
          "把 RNN-T 损失改写为 CTC 损失",
          "只用于降低输入 filterbank 的采样率"
        ],
        "answer": 1,
        "explain": "Conformer 先用 MHSA 建模全局内容交互，再用卷积模块捕获局部声学相关性；论文消融也显示这种顺序优于卷积在前或并行结构。"
      }
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
      "summary": "HuBERT 提出用离线 k-means 聚类产生帧级隐藏单元标签，再让 BERT 风格的语音模型只在被掩码区域预测这些伪标签，通过“聚类 → 掩码预测 → 再聚类”的迭代流程学习强语音表征。",
      "keyPoints": [
        "<strong>隐藏单元预测</strong>：用无监督聚类得到每帧离散 hidden unit，作为 BERT-like masked prediction 的目标",
        "<strong>masked-only loss</strong>：主要只在被遮盖帧上计算预测损失，避免模型仅复制低质量聚类标签",
        "<strong>离线 teacher / 在线 student 解耦</strong>：聚类标签离线生成，模型训练时不需要负例采样或在线量化器",
        "<strong>迭代聚类细化</strong>：第一轮用 MFCC 上的 100 类 k-means，后续用 HuBERT 中间层特征上的 500 类 k-means 生成更好目标",
        "<strong>沿用 wav2vec 2.0 骨干</strong>：7 层 CNN waveform encoder + Transformer/BERT encoder，Base/Large/X-Large 分别约 95M/317M/964M 参数",
        "<strong>可扩展到 cluster ensemble</strong>：可用多个 k-means 或 product k-means 目标做多任务式训练",
        "<strong>ASR 表现优于或持平 wav2vec 2.0</strong>：在 LibriSpeech/Libri-Light 多个标注规模下，HuBERT 匹配或超过 wav2vec 2.0，1B 模型在 test-other 上进一步降低 WER"
      ],
      "detail": "<h5>框架总览</h5>\n<p><img alt=\"HuBERT 框架图\" src=\"https://ar5iv.labs.arxiv.org/html/2106.07447/assets/figures/hubert_arch.png\" />\n<em>图：HuBERT 用声学单元发现系统生成帧级隐藏单元标签，并让 masked speech encoder 预测被遮盖位置的 cluster assignment。</em></p>\n<pre><code class=\"language-python\"># HuBERT 迭代预训练伪代码\ndef train_hubert(unlabeled_audio):\n    # Iteration 1: 用 MFCC 聚类生成初始 hidden units\n    mfcc = extract_mfcc(unlabeled_audio, dim=39)       # 13 + delta + delta-delta\n    z_iter1 = kmeans_predict(mfcc, num_clusters=100)\n\n    hubert_base_it1 = masked_prediction_train(\n        audio=unlabeled_audio,\n        targets=z_iter1,\n        mask_start_prob=0.08,\n        mask_span=10,\n        alpha=1.0,              # 只在 masked frames 上算损失\n    )\n\n    # Iteration 2: 用第一轮 HuBERT 中间层特征重新聚类\n    h6 = extract_transformer_layer(hubert_base_it1, unlabeled_audio, layer=6)\n    z_iter2 = minibatch_kmeans_predict(h6, num_clusters=500, sample_ratio=0.10)\n\n    hubert_base_it2 = masked_prediction_train(\n        audio=unlabeled_audio,\n        targets=z_iter2,\n        mask_start_prob=0.08,\n        mask_span=10,\n        alpha=1.0,\n    )\n\n    # Large / X-Large: 可用第二轮 Base 的第 9 层特征聚类标签继续训练\n    h9 = extract_transformer_layer(hubert_base_it2, unlabeled_audio, layer=9)\n    z_iter3 = minibatch_kmeans_predict(h9, num_clusters=500)\n    return masked_prediction_train(audio=unlabeled_audio, targets=z_iter3)\n</code></pre>\n<h5>1. HuBERT 要解决什么问题</h5>\n<p>语音自监督学习不像 NLP 那样天然有离散 token。文本 BERT 可以直接遮盖 word piece 并预测词表 id；语音是连续信号，一个 utterance 内有多个声音单元，没有预先词表，也没有明确音素边界。wav2vec 2.0 用在线量化器和对比学习绕过这个问题，但需要负例采样、Gumbel-Softmax 温度调度和码本多样性损失。</p>\n<p>HuBERT 的思路更直接：先用一个简单声学单元发现系统给每帧分配离散标签，即使这些标签很噪，只要它们在相似声音上保持一致，就足以驱动 masked prediction。模型看到的是被遮盖的连续语音特征，预测的是遮盖位置的 cluster id。这样训练目标变成普通分类交叉熵，不需要对比负例，也不需要在线学习量化码本。</p>\n<div class=\"key-point\">💡 关键：HuBERT 强调 target 的“consistency”比绝对正确性更重要。粗糙的 k-means 标签不一定等价于音素，但只要相似片段稳定落入相同 cluster，模型就能通过上下文学习语音结构。</div>\n<h5>2. 隐藏单元与 masked prediction 损失</h5>\n<p>设一段语音帧序列为：</p>\n<div class=\"kb-math kb-math-display\">X=[x_1,\\dots,x_T]</div>\n<p>离线聚类器 <span class=\"kb-math kb-math-inline\">h</span> 产生隐藏单元序列：</p>\n<div class=\"kb-math kb-math-display\">h(X)=Z=[z_1,\\dots,z_T],\\quad z_t\\in[C]</div>\n<p>设 <span class=\"kb-math kb-math-inline\">M\\subset[T]</span> 是被掩码时间步集合，<span class=\"kb-math kb-math-inline\">\\tilde{X}=r(X,M)</span> 表示把 <span class=\"kb-math kb-math-inline\">t\\in M</span> 的输入替换为 mask embedding 后的序列。HuBERT 模型 <span class=\"kb-math kb-math-inline\">f</span> 输出每个时间步上的 cluster 分布 <span class=\"kb-math kb-math-inline\">p_f(\\cdot\\mid\\tilde{X},t)</span>。masked loss 为：</p>\n<div class=\"kb-math kb-math-display\">L_m(f;X,M,Z)\n= \\sum_{t\\in M}\\log p_f(z_t\\mid\\tilde{X},t)</div>\n<p>unmasked loss <span class=\"kb-math kb-math-inline\">L_u</span> 对 <span class=\"kb-math kb-math-inline\">t\\notin M</span> 求和，最终损失写作：</p>\n<div class=\"kb-math kb-math-display\">L=\\alpha L_m+(1-\\alpha)L_u</div>\n<p>实际核心设置是 <span class=\"kb-math kb-math-inline\">\\alpha=1</span>，也就是只在被遮盖帧上计算损失。若 <span class=\"kb-math kb-math-inline\">\\alpha=0</span>，模型只需在可见帧上复现聚类器，训练会退化成模仿 noisy teacher；而 <span class=\"kb-math kb-math-inline\">\\alpha=1</span> 强迫模型同时解决两个问题：把未遮盖输入编码成有用声学表示，并利用长程上下文推断缺失位置的 hidden unit。</p>\n<h5>3. 模型结构：wav2vec 2.0 骨干，但目标更简单</h5>\n<p>HuBERT 继承 wav2vec 2.0 的基本骨干：7 层 512-channel CNN waveform encoder，stride 为 <span class=\"kb-math kb-math-inline\">[5,2,2,2,2,2,2]</span>，kernel width 为 <span class=\"kb-math kb-math-inline\">[10,3,3,3,3,2,2]</span>，在 16 kHz 音频上输出 20 ms 帧率的特征。随后用 Transformer/BERT encoder 处理被遮盖的特征序列。</p>\n<p>论文给出三档模型：Base 为 12 层 Transformer、768 维、8 heads、约 95M 参数；Large 为 24 层、1024 维、16 heads、约 317M 参数；X-Large 为 48 层、1280 维、16 heads、约 964M 参数。BERT encoder 输出 <span class=\"kb-math kb-math-inline\">o_t</span> 后，与 cluster embedding 做 cosine-softmax 分类：</p>\n<div class=\"kb-math kb-math-display\">p_f^{(k)}(c\\mid\\tilde{X},t)\n=\n\\frac{\n\\exp(\\operatorname{sim}(A^{(k)}o_t,e_c)/\\tau)\n}{\n\\sum_{c&#x27;=1}^{C}\n\\exp(\\operatorname{sim}(A^{(k)}o_t,e_{c&#x27;})/\\tau)\n}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">A^{(k)}</span> 是投影矩阵，<span class=\"kb-math kb-math-inline\">e_c</span> 是第 <span class=\"kb-math kb-math-inline\">c</span> 个 codeword embedding，<span class=\"kb-math kb-math-inline\">\\tau=0.1</span>。如果使用多个聚类器组成 ensemble，每个聚类器 <span class=\"kb-math kb-math-inline\">k</span> 可以有自己的投影头。</p>\n<h5>4. 迭代聚类为什么有效</h5>\n<p>第一轮 HuBERT 使用非常朴素的 teacher：在 39 维 MFCC 特征上做 100 类 k-means。这个 teacher 的标签质量不高，但足以提供粗粒度声学分组。训练出第一轮模型后，HuBERT 的中间层已经比 MFCC 更接近音素结构，于是第二轮改为提取第一轮 Base 模型第 6 层 Transformer 特征，再做 500 类 k-means，生成更细、更一致的目标。</p>\n<p>这种迭代可以概括为：</p>\n<div class=\"kb-math kb-math-display\">X \\xrightarrow{\\text{MFCC+k-means}} Z^{(1)}\n\\xrightarrow{\\text{masked prediction}} f^{(1)}\n\\xrightarrow{\\text{middle-layer features+k-means}} Z^{(2)}\n\\xrightarrow{\\text{masked prediction}} f^{(2)}</div>\n<p>Large 和 X-Large 训练时没有从 MFCC 重新开始，而是使用第二轮 Base HuBERT 第 9 层特征聚类出的标签，因此可以看作第三轮模型。论文分析显示，用 HuBERT 中间层特征聚类的 PNMI 明显高于 MFCC，并且第一轮模型第 6 层附近的聚类质量最好；这也解释了为什么“中间层特征再聚类”比直接用最终层更可靠。</p>\n<h5>5. cluster ensemble 与 product k-means</h5>\n<p>HuBERT 还讨论了多个聚类目标的扩展。若第 <span class=\"kb-math kb-math-inline\">k</span> 个聚类器产生目标序列 <span class=\"kb-math kb-math-inline\">Z^{(k)}</span>，masked loss 可写为：</p>\n<div class=\"kb-math kb-math-display\">L_m(f;X,\\{Z^{(k)}\\}_k,M)\n=\n\\sum_{t\\in M}\\sum_k\n\\log p_f^{(k)}(z_t^{(k)}\\mid\\tilde{X},t)</div>\n<p>这相当于用无监督聚类自动构造多任务学习：不同 cluster 数或不同特征子空间提供不同粒度的声学划分。例如 50 类 cluster 可能更接近元音/辅音等粗类别，500 类 cluster 则可能更接近子音素状态。product k-means 进一步把高维特征拆成多个子空间分别聚类，组合空间更大，但每个子任务仍是可控的分类问题。</p>\n<h5>6. 与 wav2vec 2.0 的关键区别</h5>\n<p>wav2vec 2.0 需要从候选集合中对比识别真实量化 latent，因此训练目标依赖负例采样和码本使用；HuBERT 则先离线产生 frame-level label，再做普通 masked classification。换句话说，wav2vec 2.0 的离散单元是在线学习出来的训练目标，HuBERT 的离散单元是离线 teacher 产生的伪标签。</p>\n<p>两者都强调“不要重建低层连续特征”，但路径不同：wav2vec 2.0 用 contrastive loss 避免逐点重建，HuBERT 用 noisy hidden units 和 masked-only loss 避免模型复制输入。HuBERT 的优势是训练目标简单稳定，且迭代聚类能逐步提升 teacher；代价是需要离线抽特征和 k-means 聚类流程。</p>\n<h5>7. 微调与效果</h5>\n<p>HuBERT 预训练后去掉 projection head，换成 CTC softmax 层进行 ASR 微调；微调时卷积 waveform encoder 保持冻结。论文在 LibriSpeech 960h 与 Libri-Light 60k 小时无标注语音上预训练，并在 10 分钟、1 小时、10 小时、100 小时和 960 小时标注设置上评估。</p>\n<p>结果上，HuBERT 在多种标注规模下匹配或超过 wav2vec 2.0。尤其在 10 分钟标注设置中，HuBERT Large 达到 test-clean/test-other 4.7/7.6 WER，X-Large 进一步达到 4.6/6.8；1B 参数模型相比 Large 在更困难的 dev-other/test-other 上分别有最高 19%/13% 相对 WER 降低。这说明 HuBERT 的离线聚类目标可以随模型规模和无标注数据量继续受益。</p>",
      "quiz": {
        "q": "HuBERT 为什么通常只在 masked frames 上计算预测损失？",
        "options": [
          "为了让模型更容易直接复制 k-means 标签",
          "为了避免使用 Transformer 编码器",
          "为了迫使模型根据上下文推断被遮盖位置，并降低对低质量聚类标签的机械模仿",
          "为了把所有 hidden units 合并成一个连续向量"
        ],
        "answer": 2,
        "explain": "若在未遮盖帧上也大量计算损失，模型可能只学习复现 noisy clustering teacher。masked-only loss 要求模型通过上下文预测不可见帧，从而学习声学表示和长程语音结构。"
      }
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
      "summary": "WavLM 在 HuBERT 的离线聚类伪标签预测框架上加入噪声/重叠语音模拟与门控相对位置偏置，使自监督语音模型不仅学习语音内容，还显式适配说话人识别、分离、增强和 diarization 等全栈语音任务。",
      "keyPoints": [
        "<strong>掩码语音去噪与预测</strong>：输入是带 mask 的噪声或重叠语音，目标仍是原始主说话人语音的离散伪标签",
        "<strong>继承 HuBERT 离线聚类目标</strong>：使用 MFCC 或 HuBERT 隐层表示的 k-means cluster id 作为 masked prediction target",
        "<strong>噪声/重叠语音模拟算法</strong>：在 batch 内随机抽取 secondary utterance 或 DNS noise，按随机能量比混入主语音的局部片段",
        "<strong>门控相对位置偏置</strong>：在 Transformer attention logits 中加入由当前 query 内容调节的 relative position bias",
        "<strong>大规模多场景预训练数据</strong>：Base+ 与 Large 使用约 94k 小时公开英文语音，包括 Libri-Light、GigaSpeech、VoxPopuli",
        "<strong>全栈语音处理定位</strong>：在 SUPERB、说话人验证、语音分离、说话人日志、ASR 等任务上验证通用表示能力"
      ],
      "detail": "<p><img alt=\"WavLM 模型架构\" src=\"https://ar5iv.labs.arxiv.org/html/2110.13900/assets/x1.png\" />\n<em>图：WavLM 的卷积特征编码器、掩码输入、Transformer 编码器与离散伪标签预测结构。核心变化不在输出头，而在输入扰动、去噪目标和 Transformer 位置建模。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># WavLM 掩码语音去噪与预测预训练\ndef wavlm_pretrain(batch_utterances, dns_noises, teacher_clusterer, model):\n    # 1. 用干净主语音生成 HuBERT 式离散伪标签\n    clean_units = teacher_clusterer(batch_utterances)  # z_t in {1, ..., C}\n\n    # 2. 随机把部分语音替换成噪声/重叠版本\n    corrupted = []\n    for u_pri in batch_utterances:\n        if bernoulli(p_mix):\n            if uniform(0, 1) &gt; p_noise:\n                u_sec = sample(batch_utterances)\n                ratio_db = uniform(-5, 5)\n            else:\n                u_sec = sample(dns_noises)\n                ratio_db = uniform(-5, 20)\n\n            # 混合长度不超过 50%，保证主说话人仍可辨认\n            span = sample_span(max_len=len(u_pri) // 2)\n            scale = energy_scale(u_pri, u_sec, ratio_db)\n            u_pri = mix_span(u_pri, u_sec, span, scale)\n        corrupted.append(u_pri)\n\n    # 3. 卷积特征提取 + 时间 mask\n    features = conv_feature_encoder(corrupted)\n    masked_features, mask_idx = apply_time_mask(features)\n\n    # 4. Transformer 编码，attention 中使用 gated relative position bias\n    hidden = model.transformer(masked_features)\n\n    # 5. 只在 masked 区域预测干净主语音的伪标签\n    loss = 0.0\n    for t in mask_idx:\n        loss += cross_entropy(model.unit_logits(hidden[t]), clean_units[t])\n    return loss / len(mask_idx)\n</code></pre>\n<h5>动机：从“识别内容”扩展到“理解复杂声场”</h5>\n<p>HuBERT 已经证明了离线聚类伪标签加 masked prediction 对 ASR 很有效，但它的预训练输入大多是单人、相对干净的语音，模型主要被迫恢复被遮挡的音素/词内容。真实语音处理远不止 ASR：说话人验证需要保留 speaker identity，diarization 要处理“谁在什么时候说话”，分离和增强则要求模型能从噪声或重叠说话人中抓住主信号。WavLM 的关键判断是：如果预训练阶段从不见重叠和噪声，模型很难自然获得这些非 ASR 能力。</p>\n<p>因此 WavLM 没有推翻 HuBERT 的目标，而是改变了输入和学习压力：伪标签仍来自原始主语音 <span class=\"kb-math kb-math-inline\">\\mathbf{u}</span>，当前网络看到的却是其扰动版本 <span class=\"kb-math kb-math-inline\">\\mathbf{u}&#x27;</span>。这等价于要求模型在噪声、背景声或第二说话人干扰下恢复主说话人的离散内容单元。相比单纯 masked speech prediction，这个目标把“内容建模”和“去噪/主说话人选择”绑定在一起。</p>\n<h5>核心目标：对扰动输入预测干净伪标签</h5>\n<p>WavLM 沿用 HuBERT 的 codeword softmax。设第 <span class=\"kb-math kb-math-inline\">L</span> 层 Transformer 在时刻 <span class=\"kb-math kb-math-inline\">t</span> 的输出为 <span class=\"kb-math kb-math-inline\">\\mathbf{h}_t^L</span>，第 <span class=\"kb-math kb-math-inline\">c</span> 个聚类中心嵌入为 <span class=\"kb-math kb-math-inline\">\\mathbf{e}_c</span>，则预测分布为：</p>\n<div class=\"kb-math kb-math-display\">p(c|\\mathbf{h}_t^L)=\n\\frac{\\exp(\\mathrm{sim}(\\mathbf{h}_t^L\\mathbf{W}^P,\\mathbf{e}_c)/\\tau)}\n{\\sum_{c&#x27;=1}^{C}\\exp(\\mathrm{sim}(\\mathbf{h}_t^L\\mathbf{W}^P,\\mathbf{e}_{c&#x27;})/\\tau)}</div>\n<p>预训练损失只作用在 mask 位置集合 <span class=\"kb-math kb-math-inline\">M</span> 上：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{mask}}=-\\sum_{t\\in M}\\log p(z_t|\\mathbf{h}_t^L)</div>\n<p>这里最重要的是 <span class=\"kb-math kb-math-inline\">z_t</span> 的来源：它来自干净主语音，而 <span class=\"kb-math kb-math-inline\">\\mathbf{h}_t^L</span> 来自扰动后的输入。也就是说，模型不是学习“重建混合语音中最显眼的成分”，而是学习“在复杂声场中跟踪主语音并恢复其离散语音单元”。这解释了为什么 WavLM 对说话人相关任务、分离任务和日志任务提升明显。</p>\n<h5>噪声/重叠语音模拟：让预训练任务具备声场难度</h5>\n<p>对每个被选中的主语音 <span class=\"kb-math kb-math-inline\">\\mathbf{u}^{\\text{pri}}</span>，WavLM 从当前 batch 或 DNS noise 集合中采样 secondary signal <span class=\"kb-math kb-math-inline\">\\mathbf{u}^{\\text{sec}}</span>，再随机采样混合长度 <span class=\"kb-math kb-math-inline\">l</span>、主语音起点 <span class=\"kb-math kb-math-inline\">s^{\\text{pri}}</span>、副语音起点 <span class=\"kb-math kb-math-inline\">s^{\\text{sec}}</span> 与能量比 <span class=\"kb-math kb-math-inline\">r</span>。论文将混合片段限制在原语音长度的 50% 以内，目的是让主说话人始终占优，避免“目标说话人是谁”变成不可辨别问题。</p>\n<p>混合缩放因子按主/副信号能量计算：</p>\n<div class=\"kb-math kb-math-display\">scl=\\sqrt{\\frac{E^{\\text{pri}}}{10^{r/10}E^{\\text{sec}}}}</div>\n<p>并将局部片段改写为：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{u}^{\\text{pri}}[s^{\\text{pri}}:s^{\\text{pri}}+l]\n\\leftarrow\n\\mathbf{u}^{\\text{pri}}[s^{\\text{pri}}:s^{\\text{pri}}+l]\n+scl\\cdot \\mathbf{u}^{\\text{sec}}[s^{\\text{sec}}:s^{\\text{sec}}+l]</div>\n<p>这个设计比普通 data augmentation 更强：增强不是为了让模型对噪声“不敏感”，而是让模型在训练目标中必须区分主语音、副说话人和背景噪声。也因此，WavLM 在 speech separation 和 diarization 中更像一个具备声源归因能力的通用前端。</p>\n<h5>门控相对位置偏置：让位置关系依赖语音内容</h5>\n<p>WavLM 的另一个结构改动是 gated relative position bias。普通相对位置偏置只根据 <span class=\"kb-math kb-math-inline\">i-j</span> 决定两个帧之间的距离影响；但语音中同样的时间距离在静音、元音、辅音、重叠段里作用不同。WavLM 用 query 产生 update/reset gate，使偏置由当前内容调节：</p>\n<div class=\"kb-math kb-math-display\">a_{ij}\\propto \\exp\\left(\\frac{\\mathbf{q}_i\\cdot\\mathbf{k}_j}{\\sqrt{d_k}}+r_{i-j}\\right)</div>\n<div class=\"kb-math kb-math-display\">g_i^{\\text{update}},g_i^{\\text{reset}}\n=\\sigma(\\mathbf{q}_i\\cdot\\mathbf{u}),\\sigma(\\mathbf{q}_i\\cdot\\mathbf{w})</div>\n<div class=\"kb-math kb-math-display\">\\tilde{r}_{i-j}=w\\,g_i^{\\text{reset}}d_{i-j},\\qquad\nr_{i-j}=d_{i-j}+g_i^{\\text{update}}\\tilde{r}_{i-j}+(1-g_i^{\\text{update}})d_{i-j}</div>\n<p>直观上，模型可以在“当前帧是静音”与“当前帧是有效语音”时采用不同的位置偏置，从而改善长序列语音中的局部/远程依赖建模。论文消融显示，这个结构改动尤其有利于 PR、ASR 等内容相关任务，而噪声/重叠建模则更直接改善说话人与复杂声场任务。</p>\n<h5>训练流程与模型规模</h5>\n<p>WavLM 的卷积特征编码器由 7 个 temporal convolution block 组成，stride 为 <span class=\"kb-math kb-math-inline\">(5,2,2,2,2,2,2)</span>，使每个输出约覆盖 25ms 音频并以 20ms 步长前进。Base 与 Base+ 使用 12 层 Transformer、768 hidden、8 heads，Large 使用 24 层 Transformer、1024 hidden、12 heads。Base+ 和 Large 在约 94k 小时混合公开数据上预训练，覆盖有声书、播客、YouTube、欧洲议会录音等多种声学场景。</p>\n<p>与 wav2vec 2.0 的 contrastive learning 相比，WavLM 的输出空间是离散伪标签，不需要构造负样本；与 HuBERT 相比，它的输入分布更接近真实多说话人/噪声场景，并且位置建模更灵活。WavLM 的贡献不只是“把数据做大”，而是把自监督目标从单一内容恢复扩展成“复杂声场中的主语音恢复”。</p>\n<div class=\"key-point\">💡 关键：WavLM 的目标标签来自干净主语音，输入来自混合/噪声语音。这一输入-目标不对称性，是它区别于普通 masked speech modeling 的核心。</div>",
      "quiz": {
        "q": "WavLM 中掩码语音去噪与预测的关键区别是什么？",
        "options": [
          "直接重建被 mask 的连续波形采样点",
          "用噪声/重叠语音作为输入，但预测干净主语音的离散伪标签",
          "只在无噪声 LibriSpeech 上训练更大的 Transformer",
          "通过 CTC 损失直接预测文本转录"
        ],
        "answer": 1,
        "explain": "WavLM 仍使用 HuBERT 式离散伪标签预测，但当前网络看到的是扰动后的输入，目标来自原始主语音，因此模型被迫学习去噪、主说话人跟踪和内容恢复。"
      }
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
      "summary": "SpeechGPT 将连续语音先离散化为 HuBERT unit，再把这些 unit 作为 LLaMA 扩展词表中的“语音 token”进行语言建模，解决了语音对话系统只能依赖 ASR/TTS 串联、难以在 LLM 内部原生处理语音输入输出的问题。",
      "keyPoints": [
        "<strong>离散语音 token 原生建模</strong>：用 HuBERT/mHuBERT + k-means 将语音转成 unit 序列，并去除相邻重复 unit",
        "<strong>扩展 LLaMA 词表</strong>：在文本 token 外追加 <span class=\"kb-math kb-math-inline\">K</span> 个 unit token，使同一个 decoder-only LLM 同时建模文本与语音 unit",
        "<strong>三组件架构</strong>：Discrete Unit Extractor 负责 speech-to-unit，LLaMA 负责跨模态理解与生成，Unit Vocoder 负责 unit-to-speech",
        "<strong>三阶段训练流水线</strong>：Modality-adaptation Pre-training → Cross-modal Instruction Fine-tuning → Chain-of-modality Instruction Fine-tuning",
        "<strong>SpeechInstruct 数据构造</strong>：利用 ASR/TTS 成对数据和 GPT-4 生成指令模板，构造跨模态 instruction-following 样本",
        "<strong>语音对话闭环</strong>：模型可接收文本或语音，输出文本或语音 unit，再通过多说话人 HiFi-GAN vocoder 合成语音"
      ],
      "detail": "<p><img alt=\"SpeechGPT 架构与训练数据构造\" src=\"https://ar5iv.labs.arxiv.org/html/2305.11000/assets/x2.png\" />\n<em>图：SpeechGPT 的主体框架。连续语音先经过离散 unit 提取器进入 LLaMA 扩展词表，输出语音时由 LLM 生成 unit 序列并交给 unit vocoder 合成波形。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># SpeechGPT 三阶段训练与推理流程\ndef extract_units(waveform, hubert, kmeans):\n    hidden = hubert(waveform)\n    units = kmeans.predict(hidden)          # frame-level cluster ids\n    return deduplicate_adjacent(units)      # remove repeated neighboring ids\n\ndef train_speechgpt(llama, speech_pairs, instruction_data, com_data):\n    # 扩展文本词表：新增 &lt;unit_0&gt; ... &lt;unit_K-1&gt;\n    llama.resize_vocab(additional_unit_tokens=K)\n\n    # Stage 1: modality-adaptation pre-training\n    for speech in speech_pairs.unlabeled_or_paired_speech:\n        unit_seq = extract_units(speech.waveform, hubert, kmeans)\n        loss = next_token_loss(llama, unit_seq)\n        update(llama, loss)\n\n    # Stage 2: cross-modal instruction fine-tuning\n    for sample in instruction_data:\n        # sample can be speech-&gt;text, text-&gt;speech, speech-&gt;speech, text-&gt;text\n        prompt_tokens, answer_tokens = serialize_multimodal_instruction(sample)\n        loss = response_only_loss(llama, prompt_tokens, answer_tokens)\n        update(llama, loss)\n\n    # Stage 3: chain-of-modality instruction-following\n    for sample in com_data:\n        # e.g. speech instruction -&gt; text reasoning/answer -&gt; speech response units\n        chain_prompt, chain_answer = serialize_chain_of_modality(sample)\n        loss = response_only_loss(llama, chain_prompt, chain_answer)\n        update(llama, loss)\n\ndef speech_dialogue(waveform_or_text, llama, vocoder):\n    prompt = to_text_or_unit_tokens(waveform_or_text)\n    output_tokens = llama.generate(prompt)\n    if contains_unit_tokens(output_tokens):\n        return vocoder(unit_tokens(output_tokens))\n    return detokenize_text(output_tokens)\n</code></pre>\n<h5>动机：摆脱 ASR-LLM-TTS 的硬级联</h5>\n<p>传统语音助手通常把语音交互拆成三段：ASR 把用户语音转文本，LLM 在文本空间生成回答，TTS 再把文本合成语音。这个范式工程上可行，但信息损失明显：ASR 会丢掉情绪、语调、停顿、说话风格等非文本线索，TTS 也只是把 LLM 的文本结果再包装成声音。SpeechGPT 的目标是让 LLM 直接“看见”和“说出”语音 token，而不是只处理 ASR 转录后的文本。</p>\n<p>连续波形长度很长、采样率高，不适合直接作为 decoder-only LLM 的 token 序列。SpeechGPT 的折中方案是借助 HuBERT 类自监督模型把语音压缩成离散 unit：这些 unit 比文本 token 更贴近声学和韵律，又比原始波形短得多，可以被 LLaMA 当作一种新 token 类型建模。这样，语音理解和语音生成都被统一成 next-token prediction。</p>\n<h5>离散 unit 表示与词表扩展</h5>\n<p>设 HuBERT/k-means 提取到的离散 unit 序列为：</p>\n<div class=\"kb-math kb-math-display\">U=(u_1,u_2,\\ldots,u_T),\\qquad u_i\\in\\{0,1,\\ldots,K-1\\}</div>\n<p>由于连续帧常常落在同一个聚类中心，SpeechGPT 会删除相邻重复 unit，降低序列长度并减少 vocoder 合成时的冗余。随后模型把 LLaMA 原词表 <span class=\"kb-math kb-math-inline\">V_{\\text{text}}</span> 扩展为：</p>\n<div class=\"kb-math kb-math-display\">V&#x27;=V_{\\text{text}}\\cup \\{ \\langle unit_0\\rangle,\\ldots,\\langle unit_{K-1}\\rangle \\}</div>\n<p>对应的 embedding 和 LM head 也追加新行：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{E}&#x27;=\n\\begin{bmatrix}\n\\mathbf{E}_{\\text{text}}\\\\\n\\mathbf{E}_{\\text{unit}}\n\\end{bmatrix},\\qquad\n\\mathbf{W}&#x27;_{\\text{lm}}=\n\\begin{bmatrix}\n\\mathbf{W}_{\\text{text}}\\\\\n\\mathbf{W}_{\\text{unit}}\n\\end{bmatrix}</div>\n<p>这个做法的意义在于架构最小化：不需要额外的 cross-attention adapter，也不需要把音频编码成连续 prefix embedding；语音 unit 和文本 token 在同一个自回归上下文中竞争下一个 token 概率。代价是模型必须通过训练学会 unit token 的统计规律，以及 unit 与文本语义之间的对齐关系。</p>\n<h5>三阶段训练：先学语音 token，再学跨模态指令</h5>\n<p>第一阶段是 modality-adaptation pre-training。LLaMA 原本只见过文本 token，新增 unit embedding 是随机初始化的；如果直接做指令微调，模型很难稳定生成合法 unit 序列。因此 SpeechGPT 先用大量语音 unit 序列做自回归建模：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{unit}}=-\\sum_{t=1}^{T}\\log p_\\theta(u_t|u_{&lt;t})</div>\n<p>这一步相当于把 LLaMA 适配成“语音 unit 语言模型”，让模型知道语音 token 的局部连续性、节奏和组合规律。它不是语音理解的全部，但为后续 speech-to-text、text-to-speech、speech-to-speech 指令学习提供了可生成的 unit 空间。</p>\n<p>第二阶段是 cross-modal instruction fine-tuning。论文构造 SpeechInstruct，把 ASR、TTS 等配对数据包成指令样本，例如“听这段语音并写出内容”“把这句话说出来”。训练时通常只对回答部分计算损失：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{inst}}=-\\sum_{t\\in \\mathcal{A}}\\log p_\\theta(y_t|y_{&lt;t},x)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">x</span> 是文本或语音 unit 形式的指令输入，<span class=\"kb-math kb-math-inline\">\\mathcal{A}</span> 是答案 token 位置集合。这个阶段把语音 unit 与文本语义对齐，使模型能完成 speech-to-text 和 text-to-speech 的基本转换，也能处理混合输入输出格式。</p>\n<p>第三阶段是 chain-of-modality instruction-following。它把跨模态任务组织成“语音输入 → 文本中间语义/回答 → 语音输出”一类链式样本，使模型学习在多轮对话中保持语义一致，并在需要时生成可由 vocoder 还原的 speech unit。这个阶段接近 ChatGPT 式对话微调，只是答案空间可以包含文本 token 与 unit token。</p>\n<h5>Unit vocoder：从离散语音 token 回到波形</h5>\n<p>SpeechGPT 输出语音时，LLM 生成的是 unit 序列而非声波。论文训练了多说话人 unit HiFi-GAN 来完成 unit-to-speech。生成器先用 lookup table 将 unit id 嵌入为连续向量，再经过转置卷积和残差块上采样；说话人 embedding 会拼接到每一帧，帮助模型合成指定或自然的说话人特征。判别器沿用 HiFi-GAN 的 Multi-Period Discriminator 与 Multi-Scale Discriminator，以提升周期性细节和整体音质。</p>\n<div class=\"warn-box\">⚠️ 注意：SpeechGPT 的“端到端语音对话”不是直接从波形到波形的单网络训练，而是以离散 unit 作为接口，把 speech tokenizer、LLM 和 vocoder 串成一个可训练/可推理的闭环。</div>\n<h5>与 AudioGPT 类工具编排路线的区别</h5>\n<p>AudioGPT 这类系统把 LLM 当任务规划器，具体 ASR、TTS、音频生成仍由外部专家模型完成；SpeechGPT 则把语音 unit 纳入 LLM 词表，让跨模态对齐发生在 LLM 的 token 空间内。前者更容易快速接入多种音频工具，后者更接近“一个模型内部完成语音-文本-语音对话”的方向。</p>\n<p>与直接连续语音 encoder 接 LLM 的方法相比，SpeechGPT 的优点是训练目标统一、实现简单、自回归生成天然支持 speech output；局限是离散 unit 会损失一部分细粒度声学信息，最终音质和韵律也受 unit extractor 与 vocoder 上限约束。因此它的贡献更偏向“语音 token 原生对话范式”，而不是最高保真语音合成系统。</p>",
      "quiz": {
        "q": "SpeechGPT 为什么要先进行 modality-adaptation pre-training？",
        "options": [
          "让 LLaMA 学会新增语音 unit token 的统计规律，避免直接指令微调时无法稳定生成语音 token",
          "替代 HuBERT 的 k-means 聚类过程",
          "训练一个新的 ASR 模型来生成文字转录",
          "冻结 LLaMA，只训练 HiFi-GAN 判别器"
        ],
        "answer": 0,
        "explain": "LLaMA 原始词表只包含文本 token，新增 unit token 没有可靠表示。第一阶段用语音 unit 序列做 next-token prediction，使模型先适应离散语音模态。"
      }
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
      "summary": "Qwen-Audio 用单一 Whisper-large-v2 初始化的音频编码器连接 Qwen-7B，并通过覆盖语音、自然声音、音乐和歌曲的层级 tag 多任务预训练，解决了音频大模型只能处理少数音频类型或依赖外部工具编排的问题。",
      "keyPoints": [
        "<strong>统一音频-语言架构</strong>：单个 audio encoder 处理多种音频，输出接入 Qwen-7B decoder-only LLM 生成文本答案",
        "<strong>Whisper encoder 初始化</strong>：音频编码器基于 Whisper-large-v2，输入 16kHz waveform 转 80-channel mel-spectrogram",
        "<strong>覆盖 30+ 音频任务</strong>：包含 ASR、S2TT、SRWT、speaker/emotion/language tasks、audio caption、scene/event、AQA、music QA 等",
        "<strong>层级 tag 多任务格式</strong>：用起始类型、音频语言、任务、输出语言、时间戳、输出指令等 tag 缓解 one-to-many 标签冲突",
        "<strong>SRWT 细粒度时间戳任务</strong>：引入 word-level timestamp prediction，提升音频 grounding、ASR 和音频问答能力",
        "<strong>两阶段训练</strong>：Qwen-Audio 多任务预训练时冻结 LLM 优化音频编码器；Qwen-Audio-Chat 指令微调时冻结音频编码器优化 LLM"
      ],
      "detail": "<p><img alt=\"Qwen-Audio 架构与多任务预训练框架\" src=\"https://arxiv.org/html/2311.07919v2/x3.png\" />\n<em>图：Qwen-Audio 的多任务输入格式与整体架构。音频经统一 encoder 得到表示，decoder 端通过层级 tag 指定任务、语言、时间戳需求和输出格式。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Qwen-Audio 多任务预训练与对话微调流程\ndef build_qwen_audio_sample(audio, task_meta, target_text):\n    tags = [\n        task_meta.start_tag,       # &lt;|startoftranscripts|&gt; or &lt;|startofanalysis|&gt;\n        task_meta.audio_language,  # &lt;|en|&gt;, &lt;|zh|&gt;, ..., or &lt;|unknown|&gt;\n        task_meta.task_tag,        # &lt;|transcribe|&gt;, &lt;|caption|&gt;, &lt;|question-answer|&gt;, ...\n        task_meta.text_language,   # output language\n        task_meta.timestamp_tag,   # &lt;|timestamps|&gt; or &lt;|notimestamps|&gt;\n        task_meta.output_instruction,\n    ]\n    return tags, target_text\n\ndef multitask_pretrain(audio_encoder, qwen_llm, training_sets):\n    freeze(qwen_llm)\n    unfreeze(audio_encoder)\n    for audio, task_meta, target_text in mix(training_sets):\n        mel = whisper_log_mel(audio, sample_rate=16000)\n        audio_repr = audio_encoder(mel)          # Whisper-large-v2 initialized encoder\n        tags, y = build_qwen_audio_sample(audio, task_meta, target_text)\n        loss = next_text_token_loss(qwen_llm, prefix=[audio_repr, tags], target=y)\n        update(audio_encoder, loss)\n\ndef supervised_chat_finetune(audio_encoder, qwen_llm, chat_data):\n    freeze(audio_encoder)\n    unfreeze(qwen_llm)\n    for audio_text_dialogue, answer in chat_data:\n        audio_repr = encode_optional_audio(audio_encoder, audio_text_dialogue)\n        prompt = serialize_multiturn_prompt(audio_text_dialogue, audio_repr)\n        loss = response_only_loss(qwen_llm, prompt, answer)\n        update(qwen_llm, loss)\n</code></pre>\n<h5>动机：从“语音模型”走向“通用音频理解模型”</h5>\n<p>在 Qwen-Audio 之前，很多音频-语言模型仍集中在语音识别、语音翻译或自然声音 caption 的单一子领域。工具编排路线如 AudioGPT 可以调度多个专家模型，但 LLM 本身并没有真正获得音频感知能力；而一些端到端模型又往往只支持语音或只支持自然声音。Qwen-Audio 的目标是训练一个统一 audio-language model，让同一个模型处理人声、环境声、音乐、歌曲等多种音频，并在不做 task-specific fine-tuning 的情况下完成多类 benchmark。</p>\n<p>困难不只在模型结构，而在多任务数据格式。不同数据集的标签粒度差异很大：ASR 是逐字转录，音频 caption 是自由文本，scene classification 是类别标签，music note analysis 是结构化音乐信息，QA 还带问题输入。如果直接混合训练，模型会遇到 one-to-many 干扰：同一段音频在不同任务下可以对应完全不同的文本输出。Qwen-Audio 的核心工程设计就是用层级 tag 明确“这次要做什么、用什么语言输出、是否需要时间戳、输出格式是什么”。</p>\n<h5>架构：单音频编码器连接 Qwen-7B</h5>\n<p>给定音频序列 <span class=\"kb-math kb-math-inline\">\\mathbf{a}</span> 和目标文本序列 <span class=\"kb-math kb-math-inline\">\\mathbf{x}=(x_1,\\ldots,x_T)</span>，Qwen-Audio 的训练目标是最大化条件 next-token probability：</p>\n<div class=\"kb-math kb-math-display\">\\max_{\\theta,\\phi}\\sum_{t=1}^{T}\n\\log P_{\\theta}(x_t|\\mathbf{x}_{&lt;t},\\mathrm{Encoder}_{\\phi}(\\mathbf{a}),\\mathbf{g})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\phi</span> 是音频编码器参数，<span class=\"kb-math kb-math-inline\">\\theta</span> 是 Qwen LLM 参数，<span class=\"kb-math kb-math-inline\">\\mathbf{g}</span> 是层级任务 tag 序列。等价的损失写作：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{audio-text}}\n=-\\sum_{t=1}^{T}\\log P_{\\theta}(x_t|\\mathbf{x}_{&lt;t},\\mathrm{Encoder}_{\\phi}(\\mathbf{a}),\\mathbf{g})</div>\n<p>音频编码器初始化自 Whisper-large-v2，包含 32 层 Transformer 和两个卷积下采样层，约 640M 参数。输入音频先重采样到 16kHz，再转成 80 通道 mel-spectrogram，窗口 25ms、hop 10ms；编码器输出后再经过 stride 2 pooling，使每个输出帧大约对应 40ms 原始音频。LLM 侧初始化自 Qwen-7B，32 层 decoder Transformer，hidden size 4096，约 7.7B 参数。</p>\n<h5>层级 tag：把多任务冲突显式条件化</h5>\n<p>Qwen-Audio 的 tag 设计借鉴 Whisper，但覆盖面更广。一个训练样本的 decoder 侧条件通常包含：</p>\n<ul>\n<li><strong>Transcription/Analysis 起始 tag</strong>：<code>&lt;|startoftranscripts|&gt;</code> 表示精确转录类任务，<code>&lt;|startofanalysis|&gt;</code> 表示分析、问答、caption 等任务</li>\n<li><strong>Audio Language tag</strong>：标记语音语言；如果是环境声或音乐等无语言音频，则使用 <code>&lt;|unknown|&gt;</code></li>\n<li><strong>Task tag</strong>：如 <code>&lt;|transcribe|&gt;</code>、<code>&lt;|translate|&gt;</code>、<code>&lt;|caption|&gt;</code>、<code>&lt;|analysis|&gt;</code>、<code>&lt;|question-answer|&gt;</code></li>\n<li><strong>Text Language tag</strong>：指定输出文本语言</li>\n<li><strong>Timestamp tag</strong>：<code>&lt;|timestamps|&gt;</code> 或 <code>&lt;|notimestamps|&gt;</code>，决定是否生成时间戳</li>\n<li><strong>Output instruction</strong>：进一步指定子任务和输出格式</li>\n</ul>\n<p>这个格式的价值在于把“同一音频对应多个可能标签”的歧义转化成条件生成问题。共享 tag 让相近任务共享能力，例如 ASR、翻译和 speech QA 都依赖语音内容识别；特定 tag 又能防止模型把 caption、分类标签和转录文本混在一起。相比只给 dataset id，这种层级条件更细，可以同时表达任务类别、语言和输出结构。</p>\n<h5>SRWT：用词级时间戳增强 grounding</h5>\n<p>论文特别强调 Speech Recognition with Word-level Timestamps (SRWT)。传统 Whisper 式时间戳多为句级或片段级，Qwen-Audio 要求在转录中交错预测每个词的开始和结束时间：</p>\n<div class=\"kb-math kb-math-display\">y=(\\langle t^{s}_1\\rangle,w_1,\\langle t^{e}_1\\rangle,\\ldots,\n\\langle t^{s}_n\\rangle,w_n,\\langle t^{e}_n\\rangle)</div>\n<p>这种目标让模型不仅知道“音频里说了什么”，还知道“每个语义单元何时出现”。论文的消融显示，加入 SRWT 不只改善 ASR，也提升自然声音/音乐问答等 grounding-based QA。这说明细粒度时间对齐是一种可迁移的音频理解能力：模型学会把文本 token 与音频时间位置绑定，后续回答“某个声音什么时候出现”“某句话从哪一秒开始”时更稳。</p>\n<h5>训练流程：先对齐音频编码器，再对齐对话行为</h5>\n<p>Qwen-Audio 的训练分为两个阶段。第一阶段是 multi-task pretraining：冻结 Qwen LLM，仅优化 audio encoder。这样做的目的很明确：保留 Qwen-7B 原有语言能力，让音频编码器学会产生 LLM 可消费的表示。训练数据覆盖 30+ 任务、8 种语言以及 speech、sound、music/song 三大音频类型，模型通过统一格式学习从音频到文本的条件生成。</p>\n<p>第二阶段得到 Qwen-Audio-Chat：冻结 audio encoder，仅优化 LLM，使用监督指令数据让模型适应多轮对话、人类意图和音频中心场景。这个阶段类似多模态 instruction tuning，不再主要解决“音频表示能否被读懂”，而是解决“模型如何按用户意图组织答案”。这也解释了论文中 Qwen-Audio 与 Qwen-Audio-Chat 的角色分工：前者是通用音频理解基座，后者是面向交互的聊天模型。</p>\n<h5>与 SpeechGPT / AudioGPT 的区别</h5>\n<p>相对 AudioGPT，Qwen-Audio 不是让 LLM 调用外部工具，而是端到端训练一个能直接感知音频表示的模型；相对 SpeechGPT，Qwen-Audio 没有把语音离散化为 unit 并生成语音 token，而是以连续音频 encoder 表示作为 LLM 条件，重点放在通用音频理解和文本输出。两者代表了 audio LLM 的两条路线：SpeechGPT 更强调语音输入输出闭环，Qwen-Audio 更强调跨音频类型的统一理解能力。</p>\n<div class=\"key-point\">💡 关键：Qwen-Audio 成功的核心不是“把 Whisper 接到 Qwen”这么简单，而是用大规模多任务数据和层级 tag 把不同音频任务的输出空间显式拆开，避免混合训练中的标签冲突。</div>",
      "quiz": {
        "q": "Qwen-Audio 使用层级 tag 多任务格式的主要目的是什么？",
        "options": [
          "减少音频编码器参数量",
          "把不同任务、语言、时间戳需求和输出格式显式条件化，缓解多数据集混训的 one-to-many 干扰",
          "让模型只支持 ASR 和语音翻译任务",
          "替代 Whisper 的 mel-spectrogram 输入"
        ],
        "answer": 1,
        "explain": "不同音频数据集的文本标签格式差异很大。层级 tag 将任务类型、语言、时间戳和输出格式作为条件输入，让共享学习与任务区分同时成立。"
      }
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
      "summary": "SALMONN 提出一个端到端通用听觉大模型，用 Whisper 语音编码器与 BEATs 音频编码器共同接入 Vicuna，让 LLM 能直接理解语音、环境声和音乐。它还提出 activation tuning，缓解音频指令微调后只会做 ASR/音频 caption 等训练任务、难以泛化到跨模态推理的问题。",
      "keyPoints": [
        "<strong>双听觉编码器</strong>：Whisper Encoder 捕获语音与转写相关信息，BEATs Encoder 捕获非语音音频事件语义，两者 50Hz 帧率对齐后拼接",
        "<strong>Window-level Q-Former</strong>：把变长音频帧按窗口压缩为可喂给 LLM 的 auditory tokens，兼顾长音频效率与时间单调对齐",
        "<strong>Vicuna + LoRA 适配</strong>：冻结 Whisper、BEATs 和 Vicuna 主体，只训练 Q-Former 与 Vicuna 自注意力中的 LoRA 适配器",
        "<strong>三阶段跨模态训练</strong>：ASR/AAC 预训练 → 多任务 instruction tuning → 少样本 activation tuning",
        "<strong>覆盖多类听觉任务</strong>：训练任务包括 ASR、语音翻译、音频 caption、音素识别、情感识别、音乐 caption、重叠语音识别、说话人验证和音频问答等",
        "<strong>显式研究跨模态涌现能力</strong>：评测未训练任务，如英语到德语/日语语音翻译、语音关键词抽取、spoken QA、slot filling、音频故事生成和 speech-audio co-reasoning",
        "<strong>activation tuning</strong>：用降低 LoRA scaling factor 后生成的少量长答案/故事样本再训练，恢复开放式跨模态指令跟随能力"
      ],
      "detail": "<p><img alt=\"SALMONN 模型架构图\" src=\"https://ar5iv.labs.arxiv.org/html/2310.13289/assets/x1.png\" />\n<em>图：SALMONN 通过 Whisper + BEATs 双编码器提取听觉特征，经 window-level Q-Former 压缩为 auditory tokens，并与文本指令一起送入带 LoRA 的 Vicuna 生成文本回答。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># SALMONN 训练与推理流程伪代码\ndef salmonn_forward(audio, text_prompt):\n    # 1. 冻结的双编码器提取互补听觉特征\n    speech_feat = whisper_encoder(audio)       # [T, d_w], speech-centric\n    audio_feat = beats_encoder(audio)          # [T, d_b], event/music-centric\n    joint_feat = concat([speech_feat, audio_feat], dim=-1)\n\n    # 2. 变长音频按窗口进入 Q-Former，减少 token 数并保持时间顺序\n    auditory_tokens = []\n    for window in split_into_windows(joint_feat, window_size=W):\n        q_tokens = window_level_qformer(learnable_queries, window)\n        auditory_tokens.extend(q_tokens)\n\n    # 3. 拼接听觉 token 与文本指令，交给带 LoRA 的 Vicuna\n    llm_inputs = [auditory_tokens, tokenize(text_prompt)]\n    response = vicuna_with_lora.generate(llm_inputs)\n    return response\n\ndef train_salmonn():\n    freeze(whisper_encoder, beats_encoder, vicuna_backbone)\n    trainable = [window_level_qformer, lora_adapters]\n\n    # Stage 1: cross-modal pre-training\n    optimize(trainable, data=[&quot;ASR&quot;, &quot;audio captioning&quot;], loss=next_token_ce)\n\n    # Stage 2: instruction tuning on speech/audio/music tasks\n    optimize(trainable, data=multi_task_instruction_data, loss=next_token_ce)\n\n    # Stage 3: activation tuning for emergent open-ended abilities\n    pseudo_stories = generate_with_discounted_lora_scaling(few_shot_audio)\n    optimize(trainable, data=pseudo_stories, loss=next_token_ce, steps=12)\n</code></pre>\n<h5>关键公式</h5>\n<p>双编码器先把同一段音频 <span class=\"kb-math kb-math-inline\">x</span> 映射到互补帧级表示，再沿特征维拼接：</p>\n<div class=\"kb-math kb-math-display\">H = [E_{\\text{Whisper}}(x); E_{\\text{BEATs}}(x)], \\quad H \\in \\mathbb{R}^{T \\times (d_w+d_b)}</div>\n<p>window-level Q-Former 用一组可学习查询 <span class=\"kb-math kb-math-inline\">Q</span> 对每个局部窗口 <span class=\"kb-math kb-math-inline\">H_i</span> 做跨注意力，得到可接入 LLM 的 auditory tokens：</p>\n<div class=\"kb-math kb-math-display\">Z = \\operatorname{Concat}_{i=1}^{\\lceil T/W \\rceil} \\operatorname{QFormer}_{\\phi}(Q, H_i)</div>\n<p>给定文本指令 <span class=\"kb-math kb-math-inline\">p</span> 与目标回答 <span class=\"kb-math kb-math-inline\">y_{1:N}</span>，SALMONN 仍按自回归语言建模优化：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{CE}} = -\\sum_{t=1}^{N}\\log P_{\\theta,\\phi}(y_t \\mid y_{&lt;t}, p, Z)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\theta</span> 主要对应 LoRA 参数，<span class=\"kb-math kb-math-inline\">\\phi</span> 对应 Q-Former；Whisper、BEATs 和 Vicuna 主体保持冻结。</p>\n<h5>方法解读：为什么需要 Whisper + BEATs</h5>\n<p>SALMONN 的问题设定不是单纯语音识别，而是让 LLM 获得 generic hearing abilities：同一个模型要能听懂人说话、背景环境声和音乐。只用 Whisper 会偏向语音转写和语音翻译，遇到非语音事件、音乐属性或语音与背景声共同推理时信息不足；只用 BEATs 又缺少足够强的语音识别与语言内容建模能力。因此论文把 Whisper Encoder 和 BEATs Encoder 并联，并利用二者相同的 50Hz 输出帧率做帧级拼接，让 LLM 的上游输入同时包含“说了什么”和“发生了什么声音”。</p>\n<p>这与 AudioGPT 一类工具编排系统的差异很关键：AudioGPT 是 LLM 调用外部专家模型，任务边界由模型注册表和 prompt 决定；SALMONN 则把听觉编码器、跨模态连接器和 LLM 接成单个端到端生成模型。端到端结构的收益是推理时不必先显式 ASR 或显式声音分类，也能处理 speech-audio co-reasoning，例如音频里有人用语音提问，同时背景声提供答案线索。</p>\n<h5>方法解读：window-level Q-Former 解决变长音频接入</h5>\n<p>音频和图像最大的差别是长度：图像编码器通常产生固定或近似固定数量的 patch tokens，而语音/音频帧会随时长线性增长，直接喂给 LLM 会导致 token 过长。SALMONN 没有对整段音频只压成固定数量 token，因为那会损失时间顺序和语音细节；它将拼接后的听觉帧切成窗口，对每个窗口分别用 Q-Former 的可学习查询做跨注意力压缩。</p>\n<p>这种设计有两个直觉优势。第一，窗口级压缩让输出 token 数随音频时长增长，但增长速度远低于原始帧序列，适合长音频。第二，每个窗口产生的 token 顺序仍与原始音频大体单调对应，这对 ASR、音素识别、重叠语音识别等依赖时间顺序的任务更友好。也就是说，Q-Former 不只是“降维层”，而是控制 LLM 可见听觉上下文粒度的关键接口。</p>\n<h5>方法解读：LoRA 与 task over-fitting</h5>\n<p>SALMONN 冻结 Vicuna 主体，只在注意力层的 query/value 矩阵上加 LoRA。参数高效微调降低了训练成本，也减少了破坏语言模型原有推理能力的风险；但论文发现，仅经过预训练和 instruction tuning 后，模型会出现 task over-fitting：即使 prompt 要求开放式问答或推理，模型也倾向输出训练集中最常见、最确定的任务格式，例如直接转写或生成 caption。</p>\n<p>论文把这个问题解释为跨模态训练诱导出的 intrinsic conditional LM 偏向了短、确定、低多样性的回答分布。形式上，当训练集中某些 prompt 类型 <span class=\"kb-math kb-math-inline\">p_k</span> 的样本更多、监督更确定时，优化目标会更强地提升这些任务的条件概率：</p>\n<div class=\"kb-math kb-math-display\">\\max_{\\theta,\\phi}\\sum_{p_k}\\sum_{(x,y)\\in D_k}\\log P_{\\theta,\\phi}(y \\mid x, p_k)</div>\n<p>测试时遇到未训练的新 prompt <span class=\"kb-math kb-math-inline\">p^\\*</span>，模型虽然有 Vicuna 的语言推理先验，但跨模态适配层学到的条件分布可能把音频输入解释成“熟悉任务”的证据，从而忽略指令。这解释了为什么模型能在训练任务上表现好，却无法稳定完成故事生成、spoken QA 或 speech-audio co-reasoning。</p>\n<h5>方法解读：activation tuning 的作用</h5>\n<p>activation tuning 的核心不是再堆大量标注数据，而是用很少样本“唤醒”被 instruction tuning 压住的开放式能力。论文先在测试时降低 LoRA scaling factor，使模型短暂摆脱对高频训练任务的强偏置，生成更长、更开放的故事式回答；再把这些回答作为 teacher-forcing 样本微调少量步数。实验中最终阶段只用了 12 条故事样本、12 个训练 step，就显著提高了 Story、SAC、SQQA 等任务的 following rate，同时基本保留 ASR 等 level-1 任务能力。</p>\n<div class=\"key-point\">💡 关键：SALMONN 的贡献不只是“双编码器接 LLM”，还在于指出音频指令微调会让模型过拟合常见听觉任务，并给出少样本 activation tuning 作为恢复跨模态涌现能力的实用办法。</div>",
      "quiz": {
        "q": "SALMONN 为什么采用 window-level Q-Former，而不是把整段音频一次性压成固定数量 token？",
        "options": [
          "为了让 Whisper 和 BEATs 的参数都参与全量微调",
          "为了在压缩变长音频的同时保留近似单调的时间对齐",
          "为了把音频先转换成离散文本再交给 Vicuna",
          "为了完全避免使用文本指令 prompt"
        ],
        "answer": 1,
        "explain": "window-level Q-Former 对局部时间窗口分别压缩，既减少 LLM 输入长度，又保留与原始音频顺序相关的时间分辨率，这对语音和长音频任务很重要。"
      }
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
      "summary": "LTU 将通用音频理解统一成 audio question answering，用 AST 音频编码器接入 Vicuna/LLaMA，并通过 OpenAQA-5M 与 perception-to-understanding curriculum 训练模型从声音感知走向开放式推理。它解决了传统音频模型只能输出固定标签、缺少解释与场景理解能力的问题。",
      "keyPoints": [
        "<strong>AST + Vicuna/LLaMA 架构</strong>：CAV-MAE 预训练并在 AudioSet-2M 微调的 AST 负责听觉感知，Vicuna/LLaMA-7B 负责语言生成与推理",
        "<strong>音频 token 接入方式</strong>：10 秒音频转 128 维 log-Mel fbank，切成 512 个 spectrogram patches，经 AST、频率池化与时间下采样得到 32 个音频 embedding",
        "<strong>LoRA 参数高效适配</strong>：冻结 LLaMA 主体，在 self-attention 的 key/query projection 加 LoRA，约 4.2M 可训练参数",
        "<strong>OpenAQA-5M 数据集</strong>：基于 8 个公开音频数据集构造 845K 音频、5.682M QA，其中 1.9M closed-ended、3.7M open-ended",
        "<strong>Audio Instruction Generation (AIG)</strong>：用音频事件、声学特征、caption、时间戳等文本元信息提示 GPT-3.5 生成开放式音频问答",
        "<strong>perception-to-understanding curriculum</strong>：先学客观封闭任务来绑定音频，再逐步加入 caption、时间分析和开放式理解任务",
        "<strong>无需预定义标签集</strong>：推理时用户直接问自然语言问题，模型生成自由文本答案，可覆盖分类、caption、解释、推断和场景理解"
      ],
      "detail": "<p><img alt=\"LTU 模型架构与示例\" src=\"https://ar5iv.labs.arxiv.org/html/2305.10790/assets/x1.png\" />\n<em>图：LTU 使用 AST 将音频 spectrogram 编码为一串音频 embedding，投影后与文本问题 embedding 拼接，送入带 LoRA 的 LLaMA/Vicuna 生成答案。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># LTU 的数据生成、课程训练与推理流程伪代码\ndef build_open_aqa(public_audio_datasets):\n    qa_pairs = []\n    for audio, metadata in public_audio_datasets:\n        # Closed-ended: 标签、声学特征、caption、时间戳等客观问题\n        qa_pairs += make_rule_based_closed_questions(metadata)\n\n        # Open-ended: GPT 只看元信息，不直接听音频，生成多样问题和答案\n        prompt = render_audio_instruction_generation_prompt(metadata)\n        qa_pairs += gpt35_generate_open_questions(prompt)\n    return qa_pairs\n\ndef ltu_forward(audio, question):\n    fbank = log_mel_filterbank(audio, n_mels=128, win_ms=25, hop_ms=10)\n    patches = split_spectrogram_to_patches(fbank, patch_size=(16, 16))\n    ast_tokens = ast_encoder(patches)          # 512 x 768\n    audio_tokens = temporal_downsample(mean_pool_freq(ast_tokens), target_len=32)\n    audio_tokens = projection(audio_tokens)    # 32 x 4096\n\n    text_tokens = vicuna_tokenizer(question)\n    return vicuna_lora.generate([audio_tokens, text_tokens])\n\ndef train_ltu(open_aqa):\n    freeze(llama_backbone)\n    # Stage 1: 只训 projection，让随机初始化的音频投影先对齐 LLM 空间\n    train(params=[projection], tasks=[&quot;classification&quot;, &quot;acoustic_features&quot;])\n    # Stage 2: 训练 AST + projection + LoRA，仍使用低层感知任务\n    train(params=[ast_encoder, projection, lora], tasks=[&quot;classification&quot;, &quot;acoustic_features&quot;])\n    # Stage 3: 加入全部 closed-ended QA\n    train(params=[ast_encoder, projection, lora], tasks=[&quot;closed_ended&quot;])\n    # Stage 4: 加入 closed-ended + open-ended，学习开放式理解和推理\n    train(params=[ast_encoder, projection, lora], tasks=[&quot;all_open_aqa&quot;])\n</code></pre>\n<h5>关键公式</h5>\n<p>LTU 首先把音频 <span class=\"kb-math kb-math-inline\">x</span> 变成固定长度的 32 个音频 token，并投影到 LLaMA 的 hidden size：</p>\n<div class=\"kb-math kb-math-display\">A = \\operatorname{Proj}(\\operatorname{Downsample}(\\operatorname{Pool}_{f}(\\operatorname{AST}(\\operatorname{Fbank}(x)))))</div>\n<p>给定音频 token <span class=\"kb-math kb-math-inline\">A</span>、问题 token <span class=\"kb-math kb-math-inline\">q</span> 和答案 <span class=\"kb-math kb-math-inline\">y_{1:N}</span>，训练目标是标准自回归交叉熵：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{LTU}} = -\\sum_{t=1}^{N}\\log P_{\\theta,\\phi}(y_t \\mid A, q, y_{&lt;t})</div>\n<p>LoRA 对冻结权重 <span class=\"kb-math kb-math-inline\">W</span> 加低秩增量，减少需要更新的 LLM 参数：</p>\n<div class=\"kb-math kb-math-display\">W&#x27; = W + \\frac{\\alpha}{r}BA,\\quad B\\in \\mathbb{R}^{d\\times r},\\ A\\in \\mathbb{R}^{r\\times k}</div>\n<h5>方法解读：把音频任务统一为问答</h5>\n<p>传统音频模型通常把音频映射到固定标签空间，例如 AudioSet 的 527 类事件。这类模型能“感知”声音，却很难回答“为什么这是紧急场景”“这个声音适合给什么视频配音”“前后两个声音的时间关系说明了什么”。LTU 的关键转变是把分类、caption、声学特征识别、时间分析和开放式推理全部转写成 <span class=\"kb-math kb-math-inline\">(audio, question, answer)</span> 三元组，模型不再输出固定类别 id，而是按用户问题生成自然语言答案。</p>\n<p>这个统一接口有两个直接收益。第一，封闭式任务仍然可以保留，因为“这段音频里有哪些声音事件？”就是一个普通问题；第二，开放式能力可以通过同一套自回归语言建模目标学习，不需要为每种推理任务新增分类头。也因此，LTU 推理时不要求用户给候选标签集，模型可以直接回答任意音频相关问题。</p>\n<h5>方法解读：AST 负责听，LLM 负责想</h5>\n<p>LTU 的音频侧选择 AST，而不是语音专用编码器。AST 把 log-Mel spectrogram 视为二维 patch 序列，先通过 CAV-MAE 自监督预训练，再在 AudioSet 上微调，适合捕捉环境声和通用声音事件。论文中 10 秒音频被处理成 <span class=\"kb-math kb-math-inline\">1024 \\times 128</span> 的时频图，再切成 512 个 <span class=\"kb-math kb-math-inline\">16\\times16</span> patch；AST 输出 512 个 768 维 embedding 后，经过频率平均池化和 2 倍时间下采样，形成 32 个按时间顺序排列的音频 token。</p>\n<p>这些音频 token 会投影到 4096 维，与 LLaMA/Vicuna 的文本 embedding 维度一致，然后直接拼到文本问题前。直觉上，AST 提供“听到了什么”的连续证据，Vicuna 提供“如何根据问题组织答案和推理”的语言能力。冻结 LLM 主体、只训练音频侧和 LoRA，使模型尽量保留 LLM 原有的语言推理与指令跟随能力，同时学会把音频 token 当作上下文条件使用。</p>\n<h5>方法解读：OpenAQA-5M 与 AIG</h5>\n<p>LTU 的训练数据不是重新采集音频，而是重标注 AudioSet、VGGSound、FSD50K、AudioCaps、FreeSound、Clotho、Sound Bible 等公开数据。closed-ended 部分由规则和已有标注构造，覆盖分类、声学特征、caption、时间戳分析等客观问题；open-ended 部分使用 Audio Instruction Generation：先把音频事件、声学特征、caption 和时间戳组织成文本元信息，再让 GPT-3.5 生成需要解释、推断、场景理解的问题与答案。</p>\n<p>这里有一个重要约束：GPT 生成 QA 时看的是元信息文本，不直接听音频；LTU 训练和推理时输入的是原始音频和问题，不输入那些元信息。这迫使 LTU 必须从音频本身学会恢复事件、时序和语义线索，而不是在推理时依赖外部标签。论文还保留了一部分“无法从音频确定”的问答，这能教模型在证据不足时拒绝过度推断，降低幻觉。</p>\n<h5>方法解读：从 perception 到 understanding 的课程</h5>\n<p>直接把开放式 QA 扔给一个还没学会听音频的 LLM，容易得到“靠语言常识乱答”的模型：问题越开放，模型越可能忽略音频条件。LTU 用四阶段课程训练解决这个问题。第一阶段只训练投影层，用分类和声学特征描述把随机初始化的音频投影拉进 LLM 空间；第二阶段开放 AST、投影和 LoRA，但仍聚焦低层感知任务；第三阶段加入全部 closed-ended QA；第四阶段才加入 closed-ended 和 open-ended 全量数据。</p>\n<div class=\"key-point\">💡 关键：closed-ended 任务在 LTU 中不是落后的分类残留，而是让模型学会“必须听音频才能答对”的锚点；开放式任务则在这个锚点上扩展解释、推断和场景理解。</div>",
      "quiz": {
        "q": "LTU 的 perception-to-understanding curriculum 为什么先训练 closed-ended 感知任务，再加入 open-ended 问答？",
        "options": [
          "因为 open-ended 问答只用于评测，不能参与训练",
          "因为先用客观答案约束模型关注音频，可减少早期靠语言先验幻觉作答",
          "因为 AST 只能输出固定标签，无法处理开放式问题",
          "因为 LoRA 只能在最后一个训练阶段被启用"
        ],
        "answer": 1,
        "explain": "论文指出开放式任务在训练初期过难，模型容易不看音频而靠语言能力作答；先学封闭式感知任务可以建立音频条件，再逐步过渡到理解与推理。"
      }
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
      "summary": "Qwen2-Audio 是 Qwen-Audio 的升级版大规模音频语言模型，用 Whisper-large-v3 初始化的音频编码器连接 Qwen-7B，并通过自然语言 prompt 预训练、SFT 和 DPO 提升多任务音频理解与语音交互能力。它将语音、声音、音乐和混合音频统一为文本生成问题，同时支持 Audio Analysis 与 Voice Chat 两种交互模式。",
      "keyPoints": [
        "<strong>8.2B 音频语言模型</strong>：由音频编码器与 Qwen-7B LLM 组成，总参数约 8.2B",
        "<strong>Whisper-large-v3 初始化音频编码器</strong>：输入音频重采样到 16kHz，转 128 通道 Mel spectrogram，25ms 窗、10ms hop，并用 stride=2 pooling 降低序列长度",
        "<strong>约 40ms 音频帧粒度</strong>：池化后每个编码器输出帧约对应原始音频 40ms，兼顾语音细节与 LLM 上下文成本",
        "<strong>自然语言 prompt 预训练</strong>：相对 Qwen-Audio 的层级标签，Qwen2-Audio 在预训练阶段直接使用自然语言任务提示，降低预训练和后训练格式差异",
        "<strong>三阶段训练流程</strong>：multi-task pre-training → supervised fine-tuning → direct preference optimization",
        "<strong>两种统一交互模式</strong>：Audio Analysis 允许音频+文本指令做离线分析，Voice Chat 支持纯语音自由对话，实际使用中无需系统 prompt 切换模式",
        "<strong>覆盖 13 个评测数据集与 AIR-Bench</strong>：任务包括 ASR、S2TT、SER、VSC，以及 speech/sound/music/mixed audio 的指令跟随评测"
      ],
      "detail": "<p><img alt=\"Qwen2-Audio 三阶段训练框架\" src=\"https://raw.githubusercontent.com/QwenLM/Qwen2-Audio/main/assets/framework.png\" />\n<em>图：Qwen2-Audio 的训练流程包含多任务预训练、监督微调和 DPO；中心模型由 Audio Encoder 与 QwenLM 组成，输入音频和自然语言指令后自回归生成文本。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Qwen2-Audio 训练与推理流程伪代码\ndef encode_audio(raw_waveform):\n    audio = resample(raw_waveform, target_sr=16000)\n    mel = log_mel_spectrogram(audio, n_mels=128, win_ms=25, hop_ms=10)\n    hidden = whisper_large_v3_initialized_encoder(mel)\n    hidden = pooling(hidden, stride=2)  # about one output frame per 40ms\n    return hidden\n\ndef qwen2_audio_forward(audio=None, text_prompt=None, history=None):\n    audio_tokens = encode_audio(audio) if audio is not None else []\n    prompt_tokens = qwen_tokenizer(text_prompt, history=history)\n    return qwen_7b.generate([audio_tokens, prompt_tokens])\n\ndef train_qwen2_audio():\n    # Stage 1: Multi-task pre-training with natural language prompts\n    for audio, prompt, answer in pretrain_data:\n        loss = next_token_ce(qwen2_audio_forward(audio, prompt), answer)\n        update(audio_encoder, qwen_lm, loss)\n\n    # Stage 2: SFT jointly trains Audio Analysis and Voice Chat formats\n    for conversation in curated_sft_data:\n        loss = supervised_chat_loss(conversation)\n        update(audio_encoder, qwen_lm, loss)\n\n    # Stage 3: DPO aligns outputs with preferred behavior\n    for x, y_win, y_lose in preference_triplets:\n        loss = dpo_loss(policy=qwen2_audio, reference=frozen_reference,\n                        x=x, y_win=y_win, y_lose=y_lose)\n        update(audio_encoder, qwen_lm, loss)\n</code></pre>\n<h5>关键公式</h5>\n<p>给定音频序列 <span class=\"kb-math kb-math-inline\">x</span>、文本 prompt <span class=\"kb-math kb-math-inline\">p</span> 与目标文本 <span class=\"kb-math kb-math-inline\">y_{1:N}</span>，Qwen2-Audio 的基础训练目标是最大化下一个文本 token 概率：</p>\n<div class=\"kb-math kb-math-display\">\\max_{\\theta,\\phi}\\sum_{t=1}^{N}\\log P_{\\theta,\\phi}(y_t \\mid y_{&lt;t}, p, E_{\\phi}(x))</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">E_{\\phi}</span> 是音频编码器，<span class=\"kb-math kb-math-inline\">\\theta</span> 是 Qwen LLM 参数。DPO 阶段使用偏好三元组 <span class=\"kb-math kb-math-inline\">(x, y_w, y_l)</span>，其中 <span class=\"kb-math kb-math-inline\">y_w</span> 是偏好回答，<span class=\"kb-math kb-math-inline\">y_l</span> 是较差回答：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{DPO}} =\n-\\mathbb{E}\\left[\n\\log \\sigma\\left(\n\\beta \\log \\frac{\\pi_{\\theta}(y_w\\mid x)}{\\pi_{\\text{ref}}(y_w\\mid x)}\n- \\beta \\log \\frac{\\pi_{\\theta}(y_l\\mid x)}{\\pi_{\\text{ref}}(y_l\\mid x)}\n\\right)\n\\right]</div>\n<p>这个目标直接提高偏好回答相对参考模型的概率，同时降低非偏好回答的相对概率。</p>\n<h5>方法解读：从 Qwen-Audio 到 Qwen2-Audio 的变化</h5>\n<p>Qwen-Audio 已经证明了统一音频-语言预训练的价值，但早期方案在任务描述上使用较复杂的层级标签，预训练格式与后续 instruction/chat 格式之间仍有差距。Qwen2-Audio 的核心改动之一，是在预训练阶段就用自然语言 prompt 描述任务，例如“识别这段语音”“为这段声音生成英文 caption”“判断说话者情绪”。这样模型在预训练时看到的输入形式更接近 SFT 和真实交互，后续指令跟随更自然。</p>\n<p>另一个升级是音频编码器初始化。Qwen2-Audio 使用 Whisper-large-v3 作为音频编码器初始化基础，输入处理为 16kHz、128 通道 Mel spectrogram，并通过 stride=2 pooling 将表示长度减半。Whisper-large-v3 带来强语音建模先验，池化后约 40ms 一个输出帧，既保留足够语音时间分辨率，又避免长音频让 Qwen-7B 的上下文被音频 token 过度占用。</p>\n<h5>方法解读：统一 Audio Analysis 与 Voice Chat</h5>\n<p>Qwen2-Audio 明确支持两种交互范式。Audio Analysis 更像文件分析：用户给一段语音、环境声、音乐或混合音频，再用文字或语音提出问题；Voice Chat 更像语音助手：用户可以只用语音与模型连续对话。论文强调两种模式在训练中联合建模，使用时不需要通过额外 system prompt 手动切换。</p>\n<p>这个设计的难点在于模型必须区分“音频内容本身”和“音频里携带的用户指令”。例如一段音频前半段是键盘声，后半段有人问“这是什么声音？”，模型需要把后半段识别为指令，把前半段当作被分析对象。Qwen2-Audio 通过混合音频、多轮对话、音频+文本指令的 SFT 数据，让模型学习在同一输入流中完成命令定位、音频理解和文本回答。</p>\n<h5>方法解读：三阶段训练如何配合</h5>\n<p>多任务预训练阶段负责建立广覆盖的音频-文本映射：ASR、语音翻译、声音分类/描述、音乐理解等任务都被写成自然语言 prompt 下的 next-token prediction。SFT 阶段则强调高质量交互样式，尤其是 Audio Analysis 和 Voice Chat 的对话格式、拒答边界、回答风格与复杂指令遵循。DPO 阶段进一步用偏好数据约束模型，让回答更符合人类对事实性、帮助性和行为规范的选择。</p>\n<p>从优化角度看，预训练让 <span class=\"kb-math kb-math-inline\">E_{\\phi}(x)</span> 能被 Qwen-7B 解释，SFT 让模型知道“用户想要什么形式的回答”，DPO 则在多个可行回答之间校正偏好顺序。与只做 ASR 或只做 caption 的模型相比，Qwen2-Audio 的训练目标始终是文本生成，因此同一个解码器可以输出转写、翻译、分类解释、场景分析和聊天回复。</p>\n<h5>方法解读：与 SALMONN/LTU 的区别</h5>\n<p>SALMONN 重点研究双编码器融合和 activation tuning，以激活跨模态涌现能力；LTU 重点通过 OpenAQA-5M 把通用音频任务统一为问答；Qwen2-Audio 则更偏工程化大规模训练与产品交互，将自然语言 prompt 预训练、双模式 SFT 和 DPO 放在同一训练框架中。它没有把模式切换暴露给用户，而是让模型从输入上下文中自动判断应该聊天、转写、翻译还是分析音频。</p>\n<div class=\"key-point\">💡 关键：Qwen2-Audio 的“升级版多任务音频理解”不只是模型更大或数据更多，而是把预训练任务格式、指令微调格式和偏好对齐目标统一到了自然语言交互空间。</div>",
      "quiz": {
        "q": "Qwen2-Audio 相比 Qwen-Audio，在预训练任务表达上最重要的变化是什么？",
        "options": [
          "完全移除文本 prompt，只保留音频输入",
          "用自然语言 prompt 替代复杂层级标签，缩小预训练与后训练的格式差异",
          "先把所有音频转写成文本，再丢弃原始音频特征",
          "只在语音识别数据上预训练，不再使用声音和音乐数据"
        ],
        "answer": 1,
        "explain": "技术报告指出 Qwen2-Audio 在预训练阶段用自然语言 prompts 替代 Qwen-Audio 的 hierarchical tags，从而提升泛化和指令跟随能力。"
      }
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
      "summary": "GPT-4o 提出了一个端到端训练的 omni 模型，把文本、图像、视频和音频统一进同一个神经网络中处理，解决了传统语音助手“ASR→LLM→TTS”级联系统延迟高、丢失语调/多说话人/背景声信息的问题。",
      "keyPoints": [
        "原生多模态输入输出：接收文本、音频、图像、视频的任意组合，并生成文本、音频和图像输出。",
        "端到端语音路径：用单一模型直接建模语音到语音，而不是把语音先转写成文本再送入语言模型。",
        "实时交互延迟：官方报告音频响应最快 232 ms，平均 320 ms，显著低于旧 Voice Mode 的秒级级联延迟。",
        "统一信息保留：模型可直接利用语气、停顿、笑声、唱歌、多说话人和背景音等非文本信息。",
        "系统级安全评估：System Card 对说话人识别、未授权声音生成、音频内容风险、文本/视觉风险和 Preparedness 风险进行了单独评估。"
      ],
      "detail": "<div class=\"img-wrap\"><img src=\"https://quickchart.io/graphviz?graph=digraph%20G%20%7Brankdir%3DLR%3Bnode%5Bshape%3Dbox%2Cstyle%3Drounded%5D%3BA%5Blabel%3D%22audio%2Fimage%2Ftext%2Fvideo%20input%22%5D%3BM%5Blabel%3D%22GPT-4o%5Cnend-to-end%20omni%20model%22%5D%3BO%5Blabel%3D%22text%2Faudio%2Fimage%20output%22%5D%3BA-%3EM-%3EO%3B%7D\" alt=\"GPT-4o 端到端全模态流程图\" loading=\"lazy\"><p class=\"img-caption\">▲ GPT-4o 端到端全模态流程图</p></div>\n<p><em>图：GPT-4o 的公开技术说明没有披露完整网络结构，上图抽象展示其核心范式：多模态输入和多模态输出由同一端到端模型处理。</em></p>\n<pre><code class=\"language-python\"># GPT-4o 实时多模态交互的抽象推理流程\nstate = ConversationState()\n\nwhile session.active:\n    audio_chunk = stream.read_audio()\n    video_frame = stream.read_video_optional()\n    text_event = stream.read_text_optional()\n\n    multimodal_context = encode_context(\n        audio=audio_chunk,\n        image_or_video=video_frame,\n        text=text_event,\n        history=state\n    )\n\n    # 同一个 omni 模型直接生成响应 token/音频单元，而不是先 ASR 再 TTS。\n    response_units = gpt4o.decode_stream(multimodal_context)\n\n    response_units = safety_filter(response_units)\n    stream.write_text_audio_or_image(response_units)\n    state.update(multimodal_context, response_units)\n</code></pre>\n<p>旧版 ChatGPT Voice Mode 的关键问题是级联误差和信息瓶颈。可以把它写成：</p>\n<div class=\"kb-math kb-math-display\">L_{\\text{pipeline}} = L_{\\text{ASR}} + L_{\\text{LLM}} + L_{\\text{TTS}} + L_{\\text{handoff}}</div>\n<p>其中 ASR 阶段只把语音压成文字，语气、情绪、重叠说话、环境音和用户插话时机都会被大幅削弱。GPT-4o 的公开说明强调它是“同一神经网络”处理输入和输出，因此更接近：</p>\n<div class=\"kb-math kb-math-display\">p_{\\theta}(y_{1:T}\\mid x_{\\text{text}}, x_{\\text{audio}}, x_{\\text{image}}, x_{\\text{video}})\n= \\prod_{t=1}^{T} p_{\\theta}(y_t \\mid y_{&lt;t}, E_{\\theta}(x_{\\text{text}},x_{\\text{audio}},x_{\\text{image}},x_{\\text{video}}))</div>\n<p>这里的重点不是某个公开的层数或注意力变体，而是训练目标把跨模态信号放进同一个条件生成问题里。对于语音任务，音频不再只是转写前端的输入，而是模型推理上下文的一部分；因此“用户是否在笑”“是否有第二个人插话”“背景里是否有狗叫或音乐”都可能影响响应策略。</p>\n<p>端到端语音还改变了解码目标。传统系统的中间表示是文本，最终再由 TTS 合成语音；GPT-4o 则可以直接生成带韵律的音频响应，使输出具备停顿、节奏、情绪和可打断性。用信息论直觉看，级联方式要求音频信号 <span class=\"kb-math kb-math-inline\">a</span> 先经过转写 <span class=\"kb-math kb-math-inline\">z=\\mathrm{ASR}(a)</span>，再做 <span class=\"kb-math kb-math-inline\">p(y\\mid z)</span>，而端到端方式直接估计 <span class=\"kb-math kb-math-inline\">p(y\\mid a,\\cdots)</span>，减少了中间瓶颈 <span class=\"kb-math kb-math-inline\">I(a;z) &lt; I(a;a)</span> 带来的信息损失。</p>\n<p>实时性来自两层设计：一是模型路径缩短，不需要三个模型顺序完成；二是推理按流式 chunk 增量更新上下文。官方发布页给出最快 232 ms、平均 320 ms 的音频响应时间，这使 GPT-4o 可以支持打断、快速纠正、实时翻译、多人会议问答等交互，而不是“录完一句、等待转写、等待生成、等待播报”的回合制体验。</p>\n<p>安全上，GPT-4o 不是简单开放任意音频生成。System Card 把语音能力带来的新风险单独列出，包括说话人识别、未授权声音生成、敏感属性推断和不允许的音频内容生成。方法层面的含义是：部署系统不仅包含主模型，还包含后训练拒答策略、安全分类器、产品层监控和受限音色策略；这些模块共同决定了语音端到端模型实际可用的行为边界。</p>\n<div class=\"key-point\">💡 关键：GPT-4o 的算法贡献不在公开一个新的 ASR 损失函数，而在把语音从“语言模型前置转写结果”提升为“语言模型原生条件信号”，从而同时改善延迟、韵律表达和多模态推理。</div>",
      "quiz": {
        "q": "GPT-4o 相比旧版 Voice Mode 的核心结构差异是什么？",
        "options": [
          "用一个端到端模型统一处理音频、视觉和文本输入输出",
          "只把 ASR 模型换成更大的 Whisper",
          "只在 TTS 阶段加入更自然的音色",
          "把语音全部先翻译成英文再推理"
        ],
        "answer": 0,
        "explain": "旧版 Voice Mode 是 ASR、文本 LLM、TTS 的级联；GPT-4o 的公开说明强调同一神经网络端到端处理文本、视觉和音频。"
      }
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
      "summary": "TagSpeech 提出双流语义/说话人编码器与交错数字时间锚，把“谁在何时说了什么”统一成 LLM 的结构化序列生成任务，解决多说话人 ASR 与 diarization 之间时间对齐弱、重叠语音易串行化的问题。",
      "keyPoints": [
        "任务统一：从原始会议语音直接生成转写、说话人标签和精确起止时间，显式覆盖 what、who、when。",
        "双流解耦编码器：语义流用 SOT 微调的 Zipformer 捕获内容和轮次切换，说话人流用 Auden-Voice 编码身份特征。",
        "交错数字时间锚：在语义流和说话人流中按相同间隔插入自然数 token，提供时间定位并同步两条流。",
        "XML 风格结构化输入输出：用 <code>&lt;text&gt;</code>、<code>&lt;spk&gt;</code> 等标签组织连续音频嵌入与生成目标，不改 LLM 词表。",
        "参数高效训练：冻结 Qwen-2.5-Instruct-7B、语义编码器和说话人编码器，仅训练两个投影器。",
        "实验表现：在 AMI-SDM 和 AliMeeting-Far 上显著优于 Gemini、Qwen-Omni 等端到端基线的 DER，并保持稳定的说话人数预测。"
      ],
      "detail": "<div class=\"img-wrap\"><img src=\"https://arxiv.org/html/2601.06896v1/x2.png\" alt=\"TagSpeech 总体架构图\" loading=\"lazy\"><p class=\"img-caption\">▲ TagSpeech 总体架构图</p></div>\n<p><em>图：TagSpeech 的 Figure 2。语义流和说话人流分别编码，再插入时间锚并送入冻结 LLM，最终生成带时间戳的结构化输出。</em></p>\n<pre><code class=\"language-python\"># TagSpeech 的核心训练样本构造\ndef build_tagspeech_input(waveform, m=8):\n    mel = log_mel(waveform)                         # [T, 80]\n    h_sem = semantic_zipformer_sot(mel)             # 内容/轮次流\n    h_spk = auden_voice_speaker_encoder(mel)        # 身份流\n\n    h_sem = projector_sem(h_sem)                    # -&gt; LLM hidden size\n    h_spk = projector_spk(h_spk)\n\n    z_sem = insert_numeric_anchors(h_sem, every=m)  # 1, 2, 3, ...\n    z_spk = insert_numeric_anchors(h_spk, every=m)\n\n    x_in = [&quot;&lt;text&gt;&quot;] + z_sem + [&quot;&lt;/text&gt;&quot;, &quot;&lt;spk&gt;&quot;] + z_spk + [&quot;&lt;/spk&gt;&quot;]\n    y = render_xml_target(segments=[\n        # (speaker_id, start_anchor, end_anchor, transcript)\n        (&quot;S1&quot;, 12, 18, &quot;we should start the meeting&quot;),\n        (&quot;S2&quot;, 16, 23, &quot;yes I agree&quot;)\n    ])\n    return x_in, y\n</code></pre>\n<p>方法的第一步是把多说话人会议从“级联任务”改写成一个结构化生成任务。传统管线通常先做 VAD/分段，再做说话人日志，再做 ASR，最后用启发式规则把文本对齐到说话人和时间；每一环都会放大前一环错误。TagSpeech 直接学习从波形 <span class=\"kb-math kb-math-inline\">\\mathbf{X}</span> 到目标序列 <span class=\"kb-math kb-math-inline\">\\mathbf{Y}=(y_1,\\dots,y_L)</span> 的映射，其中 token 同时包含文本、说话人标识和时间锚，因此评估指标可以直接覆盖 DER、cpWER/gWER 和 SCA。</p>\n<p>双编码器是为了避免语义和身份在同一表征空间里相互干扰。论文把 Mel 特征 <span class=\"kb-math kb-math-inline\">\\mathbf{M}\\in\\mathbb{R}^{T\\times 80}</span> 同时送入两个 Zipformer 结构：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{H}_{sem},\\mathbf{H}_{spk}\\in\\mathbb{R}^{T&#x27;\\times D_{enc}}</div>\n<p>语义编码器先经过 Serialized Output Training (SOT) 微调，把多个说话人的转写按时间顺序串联，并用说话人切换 token 标出轮次变化；这让编码器更擅长重叠语音和快速 turn-taking。说话人编码器则使用 Auden-Voice，预训练目标包括说话人识别、性别、年龄和情感识别，使其更偏向“谁在说话”而不是“说了什么”。</p>\n<p>两个流随后通过投影器进入 LLM 维度：</p>\n<div class=\"kb-math kb-math-display\">\\hat{\\mathbf{H}}_{sem}=P_{sem}(\\mathbf{H}_{sem}),\\quad\n\\hat{\\mathbf{H}}_{spk}=P_{spk}(\\mathbf{H}_{spk}),\\quad\nL=\\left\\lceil\\frac{T&#x27;}{k}\\right\\rceil</div>\n<p>投影器是两层 MLP 加时间下采样。这个设计把可训练参数限制在投影器里，避免在小规模会议数据上全量微调 LLM 或编码器导致过拟合，同时保留冻结 LLM 的结构化文本生成能力。</p>\n<p>时间锚是 TagSpeech 最关键的机制。设 <span class=\"kb-math kb-math-inline\">\\mathcal{A}\\subset\\mathcal{V}_{LLM}</span> 为自然数 token 集合，<span class=\"kb-math kb-math-inline\">\\mathcal{F}_{anc}(\\cdot;m)</span> 每隔 <span class=\"kb-math kb-math-inline\">m</span> 帧插入一个锚，包括序列首尾：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{Z}_{sem}=\\mathcal{F}_{anc}(\\hat{\\mathbf{H}}_{sem};m),\\quad\n\\mathbf{Z}_{spk}=\\mathcal{F}_{anc}(\\hat{\\mathbf{H}}_{spk};m)</div>\n<div class=\"kb-math kb-math-display\">L&#x27;=L+\\left\\lfloor\\frac{L}{m}\\right\\rfloor+1</div>\n<p>因为语义流和说话人流使用同一个确定性插入函数，编号相同的锚天然指向同一时间位置。与新增专用 <code>&lt;time=...&gt;</code> 词表不同，自然数 token 已在 LLM 词表中，成本低、可扩展，并利用 LLM 对数字顺序的已有建模能力。</p>\n<p>输入输出采用 XML 风格结构，形式为：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{X}_{in}=[\\mathbf{E}_{tag},\\mathbf{Z}_{sem},\\mathbf{E}_{tag},\\mathbf{Z}_{spk},\\mathbf{E}_{tag}]</div>\n<p>训练目标是标准自回归负对数似然：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}=-\\sum_{t=1}^{|\\mathbf{Y}|}\\log P(y_t\\mid y_{&lt;t},\\mathbf{X}_{in};\\Theta)</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">\\Theta</span> 只包含两个投影器。这个“冻结大模型 + 轻量投影器”的训练方式很适合会议数据：LLM 负责解析标签、生成结构化文本和做上下文推理，音频编码器负责把连续声学证据对齐到 LLM 可消费的嵌入。</p>\n<p>消融实验解释了为什么这三个设计缺一不可。单编码器版本，即使用 WavLM-Large，也会出现高失败率和说话人归属崩溃；这说明把内容和身份塞进同一条流不够稳。时间锚粒度呈 U 型：每帧都插入锚会破坏语义连续性，间隔过大又不能定位重叠语音；论文发现 8 帧约 1.28 秒附近取得较好折中。时间线索类型上，文本时间锚略强但 token 成本高，数字锚以 1 到 2 个 token 达到接近效果，更适合长会议。</p>\n<div class=\"key-point\">💡 关键：TagSpeech 不是简单“让 LLM 听音频”，而是给 LLM 提供两套解耦声学证据和一条共享时间坐标系，让结构化生成可以同时对齐内容、说话人和时间。</div>",
      "quiz": {
        "q": "TagSpeech 为什么要在语义流和说话人流中插入相同编号的数字时间锚？",
        "options": [
          "为了压缩音频特征长度",
          "为了让两条流共享显式时间坐标，辅助时间戳和重叠语音建模",
          "为了替代说话人编码器",
          "为了让 LLM 只输出数字而不输出文本"
        ],
        "answer": 1,
        "explain": "相同间隔和相同编号的锚把语义内容与说话人身份同步到同一时间轴，降低细粒度 diarization 的对齐难度。"
      }
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
      "summary": "Streaming SP-ASR 将目标说话人语音识别与目标说话人 VAD 融合到端到端流式模型中，用帧级“目标说话人是否在说话”的后验去门控 ASR 声学状态，解决混合语音中非目标说话人干扰和流式场景无法等待离线分段的问题。",
      "keyPoints": [
        "任务目标：给定混合语音流和目标说话人注册语音，只输出目标说话人的转写，非目标语音和静音应输出空。",
        "VAD 融合：引入目标说话人 VAD 分支预测帧级活动概率，并把该概率作为 ASR 编码状态的门控/注意力先验。",
        "流式约束：按 chunk 增量处理音频，避免依赖完整录音后的离线分离、日志或重排序。",
        "端到端训练：联合优化 ASR 识别损失与目标说话人活动检测损失，让识别和检测共享声学表征。",
        "与 TagSpeech 的关系：TagSpeech 解决多人会议的全局“谁在何时说了什么”，Streaming SP-ASR 更像面向一个指定目标说话人的低延迟在线子问题。",
        "可核验元信息：论文正式题名为 “End-to-end target speaker speech recognition with voice activity detection fusion”，发表于 Digital Signal Processing 174:105966，DOI 为 10.1016/j.dsp.2026.105966。"
      ],
      "detail": "<div class=\"img-wrap\"><img src=\"https://quickchart.io/graphviz?graph=digraph%20G%20%7Brankdir%3DLR%3Bnode%5Bshape%3Dbox%2Cstyle%3Drounded%5D%3BX%5Blabel%3D%22mixture%20audio%20chunk%22%5D%3BE%5Blabel%3D%22speaker%20enrollment%5Cnx-vector%2Fembedding%22%5D%3BEnc%5Blabel%3D%22streaming%20ASR%20encoder%22%5D%3BVAD%5Blabel%3D%22target-speaker%20VAD%5Cnframe%20posterior%22%5D%3BFuse%5Blabel%3D%22VAD%20fusion%5Cngated%20acoustic%20states%22%5D%3BDec%5Blabel%3D%22CTC%2FRNN-T%20decoder%5Cntarget%20transcript%22%5D%3BX-%3EEnc%3BE-%3EVAD%3BEnc-%3EVAD%3BVAD-%3EFuse%3BEnc-%3EFuse%3BFuse-%3EDec%3B%7D\" alt=\"Streaming SP-ASR 的 VAD 融合流程图\" loading=\"lazy\"><p class=\"img-caption\">▲ Streaming SP-ASR 的 VAD 融合流程图</p></div>\n<p><em>图：ScienceDirect 正文图没有公开稳定直链，这里用流程图抽象论文题名所指的核心方法：目标说话人 VAD 后验被融合进流式 ASR 解码。</em></p>\n<pre><code class=\"language-python\"># Streaming SP-ASR 的抽象在线解码流程\nspeaker_vec = speaker_encoder(enrollment_audio)\ncache = StreamingCache()\npartial = []\n\nfor chunk in audio_stream:\n    h, cache = streaming_encoder(chunk, cache)          # 只看当前块和有限左上下文\n    p_tvad = target_vad_head(h, speaker_vec)            # [frames], target-active posterior\n\n    # VAD fusion: 用目标活动概率抑制非目标帧，保留目标说话人声学证据。\n    h_target = h * p_tvad[:, None]\n\n    token_post = streaming_asr_decoder(h_target, cache)\n    partial.extend(prefix_beam_search(token_post))\n\n    if end_of_target_segment(p_tvad):\n        emit(stabilize(partial))\n        partial = []\n</code></pre>\n<p>目标说话人 ASR 的难点不是普通 ASR 的“听清楚”，而是“只听某个人”。输入是混合语音 <span class=\"kb-math kb-math-inline\">\\mathbf{X}_{1:T}</span> 和目标说话人注册语音 <span class=\"kb-math kb-math-inline\">\\mathbf{R}</span>，模型需要输出目标说话人的 token 序列 <span class=\"kb-math kb-math-inline\">\\mathbf{Y}</span>，同时对非目标说话人和静音保持空输出。若先做分离或 diarization，再做 ASR，离线系统可以利用完整上下文；但流式场景只能看到当前 chunk 和有限历史，错误分段会直接造成漏识别或把他人语音误转写给目标说话人。</p>\n<p>VAD 融合的核心是把“目标说话人是否活跃”显式变成 ASR 的条件变量。令编码器输出为 <span class=\"kb-math kb-math-inline\">\\mathbf{H}=(\\mathbf{h}_1,\\dots,\\mathbf{h}_T)</span>，目标说话人嵌入为 <span class=\"kb-math kb-math-inline\">\\mathbf{e}</span>，VAD 分支估计：</p>\n<div class=\"kb-math kb-math-display\">p_t = P(z_t=1\\mid \\mathbf{h}_t,\\mathbf{e})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">z_t=1</span> 表示第 <span class=\"kb-math kb-math-inline\">t</span> 帧属于目标说话人。最直接的融合方式是门控：</p>\n<div class=\"kb-math kb-math-display\">\\tilde{\\mathbf{h}}_t = p_t\\mathbf{h}_t</div>\n<p>也可以写成带残差的形式：</p>\n<div class=\"kb-math kb-math-display\">\\tilde{\\mathbf{h}}_t = \\mathbf{h}_t + \\gamma p_t W[\\mathbf{h}_t;\\mathbf{e}]</div>\n<p>直觉上，VAD 后验不是单独拿来切段，而是作为 ASR 的软先验：目标活跃概率高的帧被增强，非目标帧被压低。这样 ASR 解码器在重叠说话时仍能保留连续声学上下文，而不是被硬 VAD 边界切碎。</p>\n<p>训练目标通常由识别损失和活动检测损失组成：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\mathcal{L}_{asr}(\\mathbf{Y}, \\hat{\\mathbf{Y}}) + \\lambda\\mathcal{L}_{vad}(\\mathbf{z}, \\hat{\\mathbf{z}})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_{asr}</span> 可由 CTC、RNN-T 或流式 attention/CTC 组合实现，<span class=\"kb-math kb-math-inline\">\\mathcal{L}_{vad}</span> 是帧级二分类交叉熵。联合训练的价值在于共享 encoder 不只为 token 识别优化，也被迫学习“这帧是不是目标说话人”的判别边界；这比把一个外部 VAD 模型后处理到 ASR 输出上更一致。</p>\n<p>流式推理要求模型满足因果性或有限右看。对第 <span class=\"kb-math kb-math-inline\">n</span> 个 chunk，编码器只能使用：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{H}^{(n)} = f_{\\theta}(\\mathbf{X}^{(n)}, \\mathrm{cache}^{(n-1)})</div>\n<p>因此系统要在低延迟和稳定输出之间折中。若 VAD 太敏感，短暂重叠或噪声会触发错误转写；若 VAD 太保守，目标说话人的短词和插话会被漏掉。融合式设计比硬阈值切段更平滑，因为 <span class=\"kb-math kb-math-inline\">p_t</span> 可以作为连续权重参与解码，后续 prefix beam search 或 RNN-T state 仍能跨 chunk 保持上下文。</p>\n<p>与 TagSpeech 相比，Streaming SP-ASR 的输出空间更窄，但在线性更强。TagSpeech 面向多人会议全局结构化输出，需要同时恢复多个说话人的时间线；Streaming SP-ASR 面向一个给定目标说话人，关键是把 speaker embedding、目标 VAD 和 ASR 解码耦合起来。两者的共同点是都把说话人信息从后处理环节前移到模型内部，不再依赖“先识别文本、再猜是谁说的”的级联补丁。</p>\n<div class=\"warn-box\">⚠️ 注意：该 ScienceDirect 页面当前只稳定开放元数据，正文和原图没有可直接访问的公开 URL；上面的流程图是对论文题名、DOI 元数据和目标说话人 ASR/VAD 融合范式的算法化整理，而非逐像素复刻论文原图。</div>",
      "quiz": {
        "q": "Streaming SP-ASR 中融合目标说话人 VAD 的主要目的是什么？",
        "options": [
          "把所有非语音帧删除后再离线转写",
          "用目标说话人活动概率软门控 ASR 表征，抑制非目标说话人干扰",
          "替代目标说话人的注册语音",
          "把流式系统改成完整录音后的离线系统"
        ],
        "answer": 1,
        "explain": "VAD 融合把帧级目标活跃概率作为识别先验，帮助流式 ASR 在混合语音中只输出目标说话人的内容。"
      }
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
      "summary": "SpeakerLM 提出了面向 Speaker Diarization and Recognition (SDR) 的端到端多模态大语言模型，把“谁在什么时候说了什么”的识别、转写和说话人注册统一为一个自回归生成任务，解决了级联 SD+ASR 系统误差传播、重叠语音处理弱和无法联合优化的问题。",
      "keyPoints": [
        "<strong>首个面向 SDR 的 MLLM 框架</strong>：采用 audio encoder → audio projector → text LLM 的统一架构，同时输出说话人归属和转写文本",
        "<strong>灵活说话人注册机制</strong>：支持 No-Regist、Match-Regist、Over-Regist 三种条件，使模型既能匿名 diarization，也能输出已注册说话人的真实姓名",
        "<strong>双投影模态对齐</strong>：SenseVoice-large 编码多说话人音频，ERes2NetV2 提取注册说话人 embedding，二者分别映射到 Qwen2.5-7B-Instruct 的语言空间",
        "<strong>四阶段训练策略</strong>：先用 60 万小时 ASR 数据得到 SpeakerLM-ASR，再用模拟 SDR 数据对齐投影器，最后用真实 SDR 数据逐步解冻音频编码器和 LoRA 适配 LLM",
        "<strong>注册鲁棒性建模</strong>：Over-Regist 训练中随机加入 1 到 50 个冗余注册说话人，让模型学习抑制不在当前音频中的身份",
        "<strong>数据规模驱动性能</strong>：论文在 AliMeeting、AISHELL4、AISHELL5 等中文会议/车载场景中验证，训练数据扩大后端到端模型超越强级联基线"
      ],
      "detail": "<p><img alt=\"SpeakerLM 总体架构\" src=\"https://arxiv.org/html/2508.06372v2/x2.png\" />\n<em>图：SpeakerLM 的整体架构。输入音频经 SenseVoice-large 编码和 Transformer/CNN projector 对齐到 LLM 空间；注册说话人语音经 ERes2NetV2 提取 embedding 后由线性层投影，并与文本 token、音频 token 一起送入 Qwen2.5-7B-Instruct。</em></p>\n<h5>核心流程伪代码</h5>\n<pre><code class=\"language-python\"># SpeakerLM 端到端 SDR 推理与注册流程\ndef speakerlm_sdr(mixture_audio, registered_speakers=None, mode=&quot;no_regist&quot;):\n    # 1. 多说话人音频进入音频编码器\n    audio_hidden = SenseVoice_large_encoder(mixture_audio)\n    audio_tokens = audio_projector(audio_hidden)  # 2-layer Transformer + CNN alignment\n\n    # 2. 可选说话人注册：把姓名 token 和 speaker embedding 注入 LLM 上下文\n    registration_tokens = []\n    if mode in [&quot;match_regist&quot;, &quot;over_regist&quot;]:\n        for name, enroll_audio in registered_speakers:\n            name_tokens = tokenizer([&quot;&lt;start&gt;&quot;, name, &quot;&lt;end&gt;&quot;])\n            spk_embedding = ERes2NetV2(enroll_audio)\n            spk_token = speaker_projector(spk_embedding)\n            registration_tokens.extend([name_tokens, spk_token])\n\n    # 3. LLM 自回归生成结构化 SDR 输出\n    prompt = build_sdr_prompt(mode)\n    llm_input = concat(prompt, registration_tokens, audio_tokens)\n    transcript = Qwen2_5_7B_Instruct.generate(llm_input)\n    return parse_speaker_attributed_transcript(transcript)\n</code></pre>\n<h5>端到端 SDR 的建模动机</h5>\n<p>传统 SDR 通常把任务拆成 diarization、ASR、后处理对齐三个模块：先切分“谁说话”，再识别“说了什么”，最后把文本对齐到说话人。这种流水线在真实会议中很脆弱：diarization 边界错了会直接污染 ASR 归属，ASR 与说话人时间轴不一致会造成词级错配，重叠语音又会让单说话人分段假设失效。SpeakerLM 的关键判断是，SD 和 ASR 本来共享同一段声学证据，应该由一个模型联合解释，而不是先把信息压缩成互相不兼容的中间结果。</p>\n<p>在形式上，SpeakerLM 把输入音频 <span class=\"kb-math kb-math-inline\">x</span>、可选注册集合 <span class=\"kb-math kb-math-inline\">R</span> 和输出序列 <span class=\"kb-math kb-math-inline\">y</span> 组织成条件语言建模：</p>\n<div class=\"kb-math kb-math-display\">p_\\theta(y \\mid x, R)=\\prod_{t=1}^{T}p_\\theta(y_t \\mid y_{&lt;t}, f_{\\text{aud}}(x), f_{\\text{spk}}(R))</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">f_{\\text{aud}}</span> 是音频编码与投影后的 token 序列，<span class=\"kb-math kb-math-inline\">f_{\\text{spk}}</span> 是注册说话人姓名与 embedding 的联合表示，<span class=\"kb-math kb-math-inline\">y</span> 则是带说话人标签的转写文本。这个写法的意义在于：说话人边界、说话人身份和文本内容都通过同一个自回归目标反向影响模型参数，模型可以学习“这段声学片段像谁、应该对应哪一句话、是否有重叠”之间的联合结构。</p>\n<h5>模型结构：音频 token 与注册 speaker token 的统一上下文</h5>\n<p>SpeakerLM 没有把注册说话人当作后处理检索，而是把它们作为 LLM 上下文的一部分。多说话人混合音频先由 SenseVoice-large encoder 编码，随后用随机初始化的两层 Transformer projector 和 CNN 层做维度/时间对齐；注册语音则由冻结的 ERes2NetV2 speaker embedding extractor 提取说话人向量，再经单层线性 projector 映射到 LLM hidden size。注册姓名和 <code>&lt;start&gt;/&lt;end&gt;</code> 标记仍由冻结文本 tokenizer 编码。</p>\n<p>这种设计把三类信息放在同一生成空间：文本提示告诉模型任务和输出格式，音频 token 提供时序声学证据，speaker token 提供身份锚点。相比 SA-ASR 只假设“注册说话人刚好等于真实说话人”，SpeakerLM 在训练时显式暴露无注册、精确注册和过量注册三种情况，让 LLM 学会在没有姓名时生成匿名 speaker ID，在姓名可用时执行身份匹配，在注册池过大时忽略无关 embedding。</p>\n<h5>灵活注册机制的数学形式</h5>\n<p>论文把真实说话人数记为 <span class=\"kb-math kb-math-inline\">N_{gt}</span>，注册说话人数记为 <span class=\"kb-math kb-math-inline\">N_{rg}</span>，三种注册条件统一写成：</p>\n<div class=\"kb-math kb-math-display\">N_{rg}=\n\\begin{cases}\n0, &amp; \\text{No-Regist}\\\\\nN_{gt}, &amp; \\text{Match-Regist}\\\\\nN_{gt}+N_{ov}, &amp; \\text{Over-Regist}\n\\end{cases}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">N_{ov}&gt;0</span> 是冗余注册人数。No-Regist 对应传统 diarization：输出 <code>spk0</code>、<code>spk1</code> 这样的匿名标签；Match-Regist 对应已知参会人场景：模型要把语音段落直接归到 Alice、Bob 等真实姓名；Over-Regist 更接近产品部署：系统里可能预注册了几十个用户，但当前对话只出现少数人。训练时让 <span class=\"kb-math kb-math-inline\">N_{ov}</span> 在 1 到 50 间采样，本质上是在做 hard negative identity training，迫使模型不仅学习“像谁”，还学习“谁没有出现”。</p>\n<h5>四阶段训练为什么必要</h5>\n<p>SpeakerLM 的训练不是一次端到端全量微调，而是逐步解锁能力。Stage 1 只用 ASR 数据训练 SpeakerLM-ASR，并用 LoRA 适配 LLM，目的是先让系统具备强语音转写能力；Stage 2 冻结 LLM 和音频编码器，只在 5,000 小时模拟 SDR 数据上训练 projector，使音频 token 与文本生成空间先粗对齐；Stage 3 使用真实 SDR 数据，解冻音频编码器和 projector，让模型适应远场、混响、噪声、多人重叠等实际声学条件；Stage 4 再通过 LoRA 联合适配 LLM，使语言推理、声学证据和说话人 identity 表示进一步融合。</p>\n<div class=\"key-point\">💡 关键：SpeakerLM 的“端到端”不是从裸波形直接训练一个全新大模型，而是把成熟音频编码器、说话人 embedding 模型和指令 LLM 通过可训练 projector 组合起来，再用分阶段训练降低对齐难度。</div>\n<h5>与 ECAPA-TDNN/级联系统的区别</h5>\n<p>ECAPA-TDNN 一类说话人模型的核心产物是判别式 embedding，擅长“这两段语音是否同一人”或“这段语音属于哪个注册人”。SpeakerLM 继承的是 speaker embedding 的身份判别能力，但目标函数变成语言建模，输出也从固定类别/相似度变成结构化对话转写。相比 SD+ASR+LLM 的后处理范式，SpeakerLM 不需要等待 diarization 和 ASR 分别给出中间结果，也不会把 LLM 限制在纠错器角色；LLM 是主模型，直接消费声学 token 和 speaker token，并生成最终 SDR 序列。</p>\n<p>这种差异也解释了论文中的数据缩放现象：少量 SDR 数据下，端到端模型可能不如强级联系统稳定；但当真实和模拟 SDR 数据规模扩大后，联合建模可以减少模块边界误差，并在 out-of-domain 的 AISHELL5 车载噪声场景中保留更好的泛化能力。</p>",
      "quiz": {
        "q": "SpeakerLM 的 Over-Regist 机制主要解决什么问题？",
        "options": [
          "训练 ASR 模块识别更多语言",
          "在注册说话人多于实际发言人时，抑制未出现身份并保持正确说话人归属",
          "用更多注册语音提升音频采样率",
          "把 diarization 输出固定为单说话人文本"
        ],
        "answer": 1,
        "explain": "Over-Regist 让模型面对冗余注册 speaker embedding，学习选择当前音频中真实出现的身份，而不是简单假设注册集合与真实说话人集合完全匹配。"
      }
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
      "summary": "WavBench 提出了一个面向端到端 spoken dialogue models 的综合评测基准，用 Pro/Basic/Acoustic 三分框架同时考察复杂推理、口语化表达和副语言信息理解/生成，解决了现有语音对话评测过度沿用文本生成标准、忽视可听性和声学交互的问题。",
      "keyPoints": [
        "<strong>17,577 条、76.5 小时评测数据</strong>：覆盖文本认知任务、口语表达改写和声学交互三类能力",
        "<strong>三分评测框架</strong>：Pro subset 测高难推理的口语解释能力，Basic subset 测日常对话的自然口语表达，Acoustic set 测副语言理解与生成",
        "<strong>七个认知领域</strong>：Code、Creative Writing、Instruction Following、Logical Reasoning、Math、Common QA、Safety",
        "<strong>十类副语言属性</strong>：年龄、性别、口音、语言、音高、语速、音量、情绪、背景音、音乐",
        "<strong>显式与隐式声学交互</strong>：显式指令分别评估理解和生成，隐式对话要求模型从语音中主动推断风格并生成匹配回应",
        "<strong>LLM-as-judge 分层评分</strong>：口语表达用 Gemini 3 Pro Preview 给 1/3/5 分，声学理解/生成用标签准确率和 0-10 风格/内容评分"
      ],
      "detail": "<p><img alt=\"WavBench 声学交互样例\" src=\"https://arxiv.org/html/2602.12135v2/x3.png\" />\n<em>图：WavBench Acoustic Interaction Set 的样例，覆盖显式声学理解、显式声学生成和隐式多轮对话。</em></p>\n<h5>基准构建伪代码</h5>\n<pre><code class=\"language-python\"># WavBench 数据构建与评测流程\ndef build_and_evaluate_wavbench(seed_text_datasets, acoustic_labels, models):\n    # 1. 构造 Colloquial Expression Set\n    text_items = collect_from_15_sources(seed_text_datasets)\n    basic, pro = stratify_by_complexity(text_items)  # Basic: everyday; Pro: hard reasoning\n    spoken_scripts = qwen3_max_rewrite_for_listenability(basic + pro)\n    verified_scripts = human_verify(spoken_scripts)\n    speech_audio = IndexTTS2.synthesize(verified_scripts, prompts=SeedTTS_eval)\n    speech_audio = filter_by_whisper_wer(speech_audio, threshold=0.05)\n\n    # 2. 构造 Acoustic Interaction Set\n    dialogs = generate_dialog_scripts(acoustic_labels, modes=[&quot;explicit&quot;, &quot;implicit&quot;])\n    dialogs = verify_label_text_consistency(dialogs)\n    acoustic_audio = synthesize_with_attribute_control(dialogs)\n    acoustic_audio = filter_by_whisper_and_emotion2vec(acoustic_audio)\n    acoustic_audio = human_quality_check(acoustic_audio)\n\n    # 3. 评测端到端语音对话模型\n    results = {}\n    for model in models:\n        responses = model.respond_audio_to_audio(speech_audio + acoustic_audio)\n        results[model.name] = score_with_gemini_and_label_accuracy(responses)\n    return aggregate_by_subset(results)\n</code></pre>\n<h5>为什么普通语音基准不够</h5>\n<p>传统语音理解基准常把问题简化为 ASR 准确率、情绪分类、年龄/性别识别或文本问答正确率。这些任务可以分别衡量声学识别或语言推理，但无法回答一个关键问题：端到端语音对话模型能不能在“直接听、直接说”的场景中同时保持推理正确、表达自然和声音风格匹配？WavBench 的出发点是，现代 spoken dialogue model 已经不再只是 ASR+LLM+TTS 的流水线，模型会直接处理语音 token、生成语音响应，因此评测也必须覆盖音频交互的完整闭环。</p>\n<p>论文把能力拆成三个互补维度。Pro subset 不是只问难题，而是要求模型把复杂数学、代码、逻辑任务讲得适合被听懂；Basic subset 则强调日常对话里的 lexical appropriateness、linguistic naturalness 和 interactive rapport；Acoustic Interaction Set 进一步测试模型能否听出情绪、口音、音量、背景声等副语言信息，并在回答中复现或顺应这些信息。</p>\n<h5>Colloquial Expression Set：把文本任务转成“可听懂的推理”</h5>\n<p>Colloquial Expression Set 来自 15 个开源文本数据源，按七个认知领域组织，并分成 Basic 与 Pro 两档。Basic 侧重低到中等复杂度的日常交互，要求模型避免机械书面语；Pro 则保留高认知负载样本，例如多步数学、复杂代码逻辑和细粒度安全判断。WavBench 关心的不是“答案文本是否能写对”，而是“答案被朗读出来后用户是否能跟上”。</p>\n<p>这带来了一个不同于文本 benchmark 的约束：许多符号、表格、代码块在音频中不可直接消费。因此论文的生成流水线会把公式转写为自然语言步骤，把代码任务转成算法思路解释，把多选项逻辑题线性化为可听的比较叙述。可以把口语化质量抽象为：</p>\n<div class=\"kb-math kb-math-display\">S_{\\text{colloquial}} =\n\\mathbb{1}[\\text{task correct}]\n\\cdot g(\\text{lexicon}, \\text{syntax}, \\text{rapport}, \\text{context})</div>\n<p>其中任务失败直接得到最低分；只有在语义正确的前提下，才进一步比较词汇是否日常、句式是否短而自然、是否有确认/反问等互动感，以及情绪语境是否匹配。</p>\n<h5>Acoustic Interaction Set：显式指令和隐式对话共同测 EQ</h5>\n<p>Acoustic set 覆盖 9,915 条样本，副语言属性包括 speaker information、acoustic characteristics 和 background sound。显式理解任务会直接询问“Can you perceive my emotions?”，模型需要从输入语音预测标签；显式生成任务会要求“Please respond in a cheerful tone”，模型必须生成满足目标风格的语音；隐式对话则不在文本中给出声学标签，要求模型自己从语音中推断用户的情绪、语速、背景环境，并在内容和声音上共同回应。</p>\n<p>评测时，显式理解可写成常规准确率：</p>\n<div class=\"kb-math kb-math-display\">\\text{Acc}_{\\text{understand}}=\\frac{1}{N}\\sum_{i=1}^{N}\\mathbb{1}[\\hat{y}_i=y_i]</div>\n<p>显式生成先由 Gemini 3 Pro Preview 或专门判别器标注模型输出的副语言属性，再与目标标签比较；隐式对话则同时评分内容正确性 <span class=\"kb-math kb-math-inline\">s_i^{text}</span> 与声学风格一致性 <span class=\"kb-math kb-math-inline\">s_i^{audio}</span>，可概括为：</p>\n<div class=\"kb-math kb-math-display\">S_{\\text{implicit}}=\\frac{1}{N}\\sum_{i=1}^{N}\\frac{s_i^{text}+s_i^{audio}}{2}</div>\n<p>这个设计能暴露“会答题但不会说话”与“会模仿风格但内容漂移”的不同错误类型。</p>\n<h5>数据生成与质量控制</h5>\n<p>WavBench 并不是简单把文本题 TTS 一遍。Colloquial 部分先由 Qwen3-Max 做场景化口语改写，再由 5 名专家检查 11,000 个样本，剔除公式转写错误、代码逻辑错误、保留不适合语音的格式约束等问题；音频合成使用 IndexTTS2，并用 Seed-TTS-Eval 的 1,088 个英文提示音做 zero-shot voice cloning，最后用 Whisper-Large-V3 过滤 WER 超过 5% 的样本。</p>\n<p>Acoustic 部分则为不同属性选择不同合成控制策略：pitch/speed/volume 通过合成条件控制，gender/language 用 curated speaker prompts，age 用四年龄段参考声音，accent/emotion 用 GPT-4o-mini-TTS 风格指令，background audio/music 从 AudioCaps 与 MusicCaps 拼接。随后用 Whisper 过滤转写错误，用 Emotion2Vec 过滤低情绪置信度，再由 10 名专家做自然度和准确性检查。</p>\n<h5>评测发现与方法意义</h5>\n<p>论文评测了 Qwen3-Omni、Kimi-Audio、Mimo-Audio、Step-Audio-2-mini 和 GPT-4o Audio。结果显示 GPT-4o Audio 在 Basic 和 Pro 口语表达上领先，但 Pro 平均分也只有 58.23，说明复杂推理转成自然听觉解释仍未解决；显式声学理解里，语言和情绪通常较容易，而 pitch、volume、accent 等细粒度 prosody 更难；显式生成中 GPT-4o Audio 平均准确率达到 79.23%，但所有模型在复杂背景音生成上都低于 50%。隐式多轮对话还揭示一个更细的断点：模型的语义一致性可随多轮改善，但声学风格一致性显著下降。</p>\n<div class=\"key-point\">💡 关键：WavBench 的价值不是提出新模型，而是把端到端语音对话的评测目标从“听懂文字内容”推进到“听懂声音中的语义、情绪、场景，并用适合被听的方式回答”。</div>",
      "quiz": {
        "q": "WavBench 中 Pro subset 相比普通文本推理题的核心区别是什么？",
        "options": [
          "只测试 ASR 转写错误率",
          "要求模型在高难推理正确的同时，把解释改写成适合听觉理解的自然口语",
          "只用人工录制的环境声音做分类",
          "只评估模型是否能输出更长回答"
        ],
        "answer": 1,
        "explain": "Pro subset 关注复杂推理与口语可听性的结合，模型不仅要答对，还要把符号化、结构化逻辑转成用户能听懂的表达。"
      }
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
      "summary": "AUDITA 提出了一个由真实世界、人类撰写的音频问答审计基准，用 trivia/pyramidal audio questions、强干扰 MCQ 和 IRT 分析系统暴露当前音频大模型在非言语声学线索、长程时序依赖和实体级知识链接上的能力缺口。",
      "keyPoints": [
        "<strong>9,690 个音频问答样本</strong>：包含 6,460 个核心人类撰写题和 3,230 个外部参考题，覆盖 8,713 个唯一音频片段",
        "<strong>真实世界音频来源</strong>：Quizmasters、PAVEMENT、Audio-Packets 等公开 trivia/quizbowl 音频材料，避免合成场景和模板化问答",
        "<strong>六类可解释题目 taxonomy</strong>：Cultural Geography in Sound、Name The Music、Who's Who、Elements of Musical Works、Pop Culture and Media、Environmental and Acoustic Sound Recognition",
        "<strong>强干扰 MCQ 构造</strong>：每题 1 个正确答案和 3 个经人工验证的 AI 生成干扰项，干扰项按实体类型、年代、性别、风格等属性匹配",
        "<strong>人类与模型双基线</strong>：人类 free-form 平均 32.13%、MCQ 60.16%，模型平均仅 8.86% 和 15.65%",
        "<strong>IRT 审计分析</strong>：用 2PL Item Response Theory 同时估计题目难度 <span class=\"kb-math kb-math-inline\">b</span>、区分度 <span class=\"kb-math kb-math-inline\">a</span> 和被试能力 <span class=\"kb-math kb-math-inline\">\\theta</span>，定位高难且有诊断价值的音频题"
      ],
      "detail": "<p><img alt=\"AUDITA 人类-模型准确率差距\" src=\"https://quickchart.io/chart?width=760&amp;height=380&amp;c=%7Btype%3A%27bar%27%2Cdata%3A%7Blabels%3A%5B%27Free-form%20QA%27%2C%27Multiple-choice%20QA%27%5D%2Cdatasets%3A%5B%7Blabel%3A%27Humans%27%2Cdata%3A%5B32.13%2C60.16%5D%2CbackgroundColor%3A%27rgb%2854%2C162%2C235%29%27%7D%2C%7Blabel%3A%27Models%20avg%27%2Cdata%3A%5B8.86%2C15.65%5D%2CbackgroundColor%3A%27rgb%28255%2C99%2C132%29%27%7D%5D%7D%2Coptions%3A%7Bplugins%3A%7Btitle%3A%7Bdisplay%3Atrue%2Ctext%3A%27AUDITA%20human-model%20accuracy%20gap%20%28%25%29%27%7D%2Clegend%3A%7Bposition%3A%27bottom%27%7D%7D%2Cscales%3A%7By%3A%7BbeginAtZero%3Atrue%2Cmax%3A70%2Ctitle%3A%7Bdisplay%3Atrue%2Ctext%3A%27Accuracy%20%28%25%29%27%7D%7D%7D%7D%7D\" />\n<em>图：依据论文 human/model aggregate performance 表重绘的 AUDITA 审计结果。人类在 free-form 与 MCQ 两种设置下都显著领先模型，说明该基准主要暴露音频理解缺口而不是文本先验。</em></p>\n<h5>数据集构建与审计伪代码</h5>\n<pre><code class=\"language-python\"># AUDITA 构建与评测流程\ndef build_audita(raw_audio_question_sources, external_aqa_sets):\n    # 1. 抽取和对齐真实世界音频 trivia 题\n    triples = []\n    for source in raw_audio_question_sources:\n        clips, questions, answers = scrape_source(source)\n        aligned = align_audio_question_answer(clips, questions, answers)\n        triples.extend(aligned)\n\n    # 2. 规范化与分类\n    triples = normalize_formatting_and_answers(triples)\n    triples = assign_taxonomy_with_gpt4o_mini(triples, num_categories=6, num_subcategories=26)\n\n    # 3. 生成强干扰多选项\n    for item in triples:\n        entity_type = infer_answer_type(item.answer)\n        distractors = generate_plausible_distractors(item.answer, entity_type)\n        item.options = human_validate([item.answer] + distractors)\n\n    # 4. 加入外部参考集并进行人类/模型评测\n    benchmark = triples + filter_external_sets(external_aqa_sets)\n    human_matrix = collect_human_answers(benchmark, no_transcript=True, no_web=True)\n    model_matrix = evaluate_audio_language_models(benchmark, no_finetune=True)\n\n    # 5. 用 IRT 拟合能力、难度和区分度\n    irt = fit_2pl_irt(binary_correctness=[human_matrix, model_matrix])\n    return benchmark, irt\n</code></pre>\n<h5>为什么 AUDITA 要用 trivia 音频题</h5>\n<p>许多早期 AQA 数据集把问题建立在音频 caption、事件标签或合成场景上，模型可能通过题面模板、caption 语言先验或短促显著声学线索取得高分，而不一定真正理解音频。AUDITA 反其道而行之：核心题来自人类原本用于 quiz/trivia 的真实音频材料，问题往往要求从旋律、音色、角色声音、影视主题、环境声或逐步揭示的 pyramidal clues 中识别实体或答案。</p>\n<p>这类题的难点在于答案空间大、线索分散且经常跨越非言语声学和世界知识。例如“这段主题曲来自哪部电影”不能靠转录文本完成；“听出作曲家/演奏者/角色”需要把 timbre、melody、orchestration、voice identity 与文化知识对齐。论文因此把 AUDITA 定位为 audit benchmark：不是追求让模型拿高分，而是像听力审计一样揭示模型到底缺少哪类音频能力。</p>\n<h5>数据组织：核心人类题 + 外部参考题</h5>\n<p>AUDITA 共 9,690 个 QA，其中 6,460 个是核心 human-authored sources，3,230 个来自 OpenAQA 与 ClothoAQA 等外部参考集。核心部分进一步包括 4,138 个 Quizmasters trivia-style 问题，以及 2,322 个 pyramidal-style 问题（PAVEMENT 673、Audio-Packets 1,649）。论文保留外部数据不是为了稀释主任务，而是作为参照：外部数据往往更短、更偏 caption 或感知标签，能帮助说明 AUDITA 的人类-模型差距来自更强的推理和音频 grounding 要求。</p>\n<p>数据准备分三步：alignment 确保音频、问题、答案正确配对；normalization 清理编码、格式和答案别名；categorization 用 GPT-4o-mini 分到 6 个高层类别和 26 个子类。这个分类不仅便于统计，也服务于人类评测：参与者可以选择自己较熟悉的类别，避免把“完全不懂某领域 trivia”误判为音频不可解。</p>\n<h5>强干扰 MCQ：为什么模型会低于随机</h5>\n<p>AUDITA 同时提供 free-form 和 multiple-choice 两种评测。MCQ 并不是简单随机塞三个错误答案，而是先识别正确答案的语义类型，再生成属性匹配的干扰项。例如正确答案是音乐人时，干扰项要匹配性别、年代、流派并且是真实艺人；正确答案是演员时，干扰项要匹配年代、职业、性别、口音等。第二作者还会独立检查实体有效性、互异性和不可被轻易排除。</p>\n<p>因此 MCQ 的 25% 随机基线并不代表任务简单。论文报告模型平均 MCQ 只有 15.65%，低于四选一随机，并解释这不是选项位置坍缩，而是模型在强相似干扰项中系统性偏向“看起来合理但声学证据不支持”的答案。人类 MCQ 达到 60.16%，top 20% 人类参与者接近满分，说明低模型分主要来自音频 grounding 和实体链接失败。</p>\n<h5>IRT：把准确率拆成能力、难度和区分度</h5>\n<p>AUDITA 的核心分析工具是二参数逻辑 IRT。每个人类群体或模型被视为 respondent，能力为 <span class=\"kb-math kb-math-inline\">\\theta_j</span>；每道题有难度 <span class=\"kb-math kb-math-inline\">b_i</span> 和区分度 <span class=\"kb-math kb-math-inline\">a_i</span>。答对概率为：</p>\n<div class=\"kb-math kb-math-display\">P(y_{ij}=1\\mid \\theta_j,a_i,b_i)=\\sigma(a_i(\\theta_j-b_i))</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\sigma(\\cdot)</span> 是 logistic 函数。<span class=\"kb-math kb-math-inline\">b_i</span> 越大，题目越难；<span class=\"kb-math kb-math-inline\">a_i</span> 越大，题目越能区分强弱系统；<span class=\"kb-math kb-math-inline\">\\theta_j</span> 越高，被试越能答对高难题。论文用 respondent × item 的二值正确矩阵最大似然估计这些参数，并在同一潜在尺度上比较人类与模型。报告中人类 free-form 平均 <span class=\"kb-math kb-math-inline\">\\theta</span> 约为 0.05，而模型平均约为 -2.91；MCQ 中人类约 0.08，模型约 -2.45。</p>\n<p>这个分析比单纯准确率更有用：如果一道题所有人和模型都错，它可能只是过难；如果一道题弱模型也能靠文本猜对，它的区分度低；高区分度题才真正适合作为审计样本。AUDITA 还利用 IRT 暴露已有 AQA 数据集的常见问题，例如问题歧义、答案 underspecified、metadata/caption 泄漏、可不听音频直接回答等。</p>\n<h5>模型失败模式：不是只缺知识，而是声学和知识无法联合</h5>\n<p>论文把错误分为 knowledge-based、perceptual 和 audio-cue reasoning 三类。知识型错误占 78.23%，但这并不意味着音频无关：很多问题需要先从声音中定位实体线索，再调用世界知识完成答案。比如作曲家识别既需要听出旋律/配器，也需要把线索连到 Carl Orff 等实体；角色声音题既需要 voice identity，也需要角色知识。</p>\n<p>一个关键对照是 transcript-only 与 raw-audio 设置。模型用 raw audio + question 的准确率是 8.86%，而 transcript-only 只有 4.26%，text-only 几乎为 0。若任务主要靠文本或事实记忆，转录文本应该不低于原始音频；实际相反，说明非言语声学线索在许多题里不可替代。AUDITA 因而指出，下一代音频大模型不仅要更强 ASR，还要能把 timbre、rhythm、melody、background texture 和实体级知识共同建模。</p>\n<div class=\"warn-box\">⚠️ 注意：AUDITA 中人类 free-form 平均 32.13% 并不代表数据不可答，而是开放式音频 trivia 的答案空间极大且评分严格；MCQ 与 top human 结果表明这些题对熟练听者是可解的。</div>",
      "quiz": {
        "q": "AUDITA 为什么使用 IRT 而不只报告平均准确率？",
        "options": [
          "因为 IRT 可以把所有音频转成文本",
          "因为 IRT 能同时估计被试能力、题目难度和题目区分度，发现哪些题真正有诊断价值",
          "因为 IRT 会自动生成更多训练数据",
          "因为 IRT 可以避免人工评测"
        ],
        "answer": 1,
        "explain": "准确率默认每道题等权且同样有信息量；IRT 通过 \\(\\theta\\)、\\(b\\)、\\(a\\) 分离能力、难度和区分度，更适合审计模型在高难音频题上的真实缺口。"
      }
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
      "summary": "ViSQA 提出首个面向越南语 Spoken Question Answering 的可复现实验基准，把 UIT-ViQuAD 文本问答通过 TTS、ASR、答案重对齐和噪声增强转换为 spoken QA 数据。它解决了越南语缺少标准音频问答评测集、难以定量分析 ASR 错误如何传递到下游阅读理解的问题。",
      "keyPoints": [
        "<strong>越南语 SQA 基准</strong>：基于 UIT-ViQuAD 构造超过 13,000 个与 spoken inputs 对齐的问答样本",
        "<strong>可复现 TTS-ASR 流水线</strong>：用合成语音和 ASR 转写固定语言内容，隔离口音、录音设备和自发口语等不可控因素",
        "<strong>答案跨度重对齐</strong>：对 ASR transcript 中被替换、删除或位置漂移的答案进行 exact/normalized/nearby span matching，无法可靠对齐的样本会被过滤",
        "<strong>干净与噪声测试集</strong>：在 clean audio 外加入 torch-audiomentations 与 ESC-50 环境噪声，形成不同 WER 条件下的鲁棒性评估",
        "<strong>五个 Transformer 基线</strong>：比较 PhoBERT、mBERT、XLM-R、BARTPho、ViT5，覆盖 encoder-only span extraction 与 encoder-decoder generative QA",
        "<strong>ASR 错误诊断</strong>：ViT5 从文本输入的 EM 62.04% 降到 ASR transcript 的 36.30%，说明 moderate WER 会显著损害 QA",
        "<strong>spoken transcript 训练提升鲁棒性</strong>：在 ViSQA ASR 转写上训练后，ViT5 EM 从 36.30% 回升到 50.70%，mBERT EM 从 23.69% 提升到 46.18%"
      ],
      "detail": "<p><img alt=\"ViSQA 数据构造流水线\" src=\"https://journals.plos.org/plosone/article/figure/image?id=10.1371/journal.pone.0340771.g001&amp;size=large\" />\n<em>图：ViSQA 从 UIT-ViQuAD 文本 QA 出发，经 TTS 合成、ASR 转写、答案重对齐和噪声增强，得到可控的越南语 spoken QA benchmark。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># ViSQA 数据构造与答案跨度重对齐伪代码\ndef build_visqa(uit_viquad_validation):\n    examples = []\n    for passage, question, answers in uit_viquad_validation:\n        clean_audio = vietnamese_tts(passage)\n        clean_asr = google_speech_to_text(clean_audio)\n\n        noisy_audio = add_noise(\n            clean_audio,\n            effects=[&quot;reverb&quot;, &quot;bandpass&quot;, &quot;clipping&quot;],\n            environmental_sounds=&quot;ESC-50&quot;,\n        )\n        noisy_asr = google_speech_to_text(noisy_audio)\n\n        clean_span = align_answer_span(answers, clean_asr)\n        noisy_span = align_answer_span(answers, noisy_asr)\n\n        if clean_span is not None:\n            examples.append((clean_audio, clean_asr, question, clean_span))\n        if noisy_span is not None:\n            examples.append((noisy_audio, noisy_asr, question, noisy_span))\n    return examples\n\ndef align_answer_span(answer_texts, transcript):\n    candidates = []\n    for answer, original_start in answer_texts:\n        candidates += exact_matches(answer, transcript)\n        if not candidates:\n            norm_answer = normalize_whitespace(answer)\n            norm_transcript = normalize_whitespace(transcript)\n            for norm_pos in exact_matches(norm_answer, norm_transcript):\n                pos = map_to_original(norm_pos, transcript)\n                nearby = search_window(transcript, answer, center=pos, radius=50)\n                if nearby:\n                    candidates.append(nearby)\n        if candidates:\n            return closest_to_original_start(candidates, original_start)\n    return None\n\ndef evaluate_sqa(audio, question, mrc_model, asr_model):\n    transcript = asr_model.transcribe(audio)\n    return mrc_model.answer(context=transcript, question=question)\n</code></pre>\n<h5>关键公式</h5>\n<p>ViSQA 的核心不是提出新网络层，而是把 spoken QA 建成可诊断的受控数据生成过程。给定文本段落 <span class=\"kb-math kb-math-inline\">c</span>、问题 <span class=\"kb-math kb-math-inline\">q</span> 和原答案跨度 <span class=\"kb-math kb-math-inline\">a</span>，TTS-ASR 流水线可写成：</p>\n<div class=\"kb-math kb-math-display\">x = \\operatorname{TTS}(c), \\quad \\hat{c} = \\operatorname{ASR}(x), \\quad \\hat{a} = \\operatorname{Align}(a, \\hat{c})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\hat{c}</span> 是带 ASR 错误的 transcript，<span class=\"kb-math kb-math-inline\">\\hat{a}</span> 是在 transcript 中重新定位后的答案跨度。ASR 质量用 WER 衡量：</p>\n<div class=\"kb-math kb-math-display\">\\operatorname{WER} = \\frac{S + D + I}{N}</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">S,D,I</span> 分别表示 substitution、deletion、insertion 数量，<span class=\"kb-math kb-math-inline\">N</span> 是参考文本词数。QA 模型仍用 Exact Match 和 token-level F1 评估：</p>\n<div class=\"kb-math kb-math-display\">\\operatorname{F1} = \\frac{2 \\cdot P \\cdot R}{P + R}</div>\n<h5>方法解读：为什么从 UIT-ViQuAD 合成 spoken QA</h5>\n<p>越南语已有 UIT-ViQuAD、ViNewsQA、VIMQA 等文本阅读理解数据，但这些数据只评估干净文本，不回答一个更现实的问题：当用户面对的是语音内容，系统必须先 ASR 再做 QA 时，识别错误会怎样影响答案抽取。ViSQA 选择从 UIT-ViQuAD 的验证集出发，是因为这些样本有可用 gold answer 和 plausible answer，便于在 ASR transcript 中重新定位答案；而 UIT-ViQuAD test split 没有公开 ground-truth answers，不适合作为构造基础。</p>\n<p>这个设计牺牲了真实人声中的口音、停顿和 spontaneous speech 多样性，但换来了非常强的实验控制。论文明确把 ViSQA 定位为 controlled synthetic baseline：先固定语言内容，再系统改变 ASR 系统、噪声强度和训练输入类型。这样模型性能变化可以更可靠地归因于 transcription quality，而不是录音设备、说话人差异或标注噪声。</p>\n<h5>方法解读：答案重对齐是数据集可用性的关键</h5>\n<p>普通文本 QA 的答案是原 passage 中的字符跨度；但经过 TTS 和 ASR 后，<span class=\"kb-math kb-math-inline\">\\hat{c}</span> 不再逐字等于 <span class=\"kb-math kb-math-inline\">c</span>。ASR 可能把实体写错、删除量词、改变空白或断句，导致原来的 answer_start 在 transcript 中失效。如果不重新对齐，模型会看到“问题有答案，但标签指向错误位置”的训练样本，span extraction 模型会被严重污染。</p>\n<p>ViSQA 的对齐算法先尝试 exact substring match，再做 whitespace normalization 后匹配；如果仍失败，就把 normalized index 映射回原 transcript，并在估计位置周围 50 个字符窗口里搜索。只有能恢复 gold answer 或 plausible answer 的样本才保留。这个过滤步骤使数据集既保留 ASR 错误的真实影响，又避免把无答案或错标签样本混入训练。</p>\n<h5>方法解读：干净/噪声/不同 ASR 形成诊断矩阵</h5>\n<p>ViSQA 的评测不是单一排行榜，而是一个诊断矩阵。第一维是输入质量：clean audio 的 Google ASR、加噪后的 Google ASR，以及更高质量的 AssemblyAI ASR。第二维是训练方式：模型可以只在干净文本上训练，也可以在 spoken transcripts 上训练。第三维是模型结构：PhoBERT、mBERT、XLM-R 更偏 span extraction，BARTPho 和 ViT5 则是生成式 encoder-decoder。</p>\n<p>结果显示，文本训练模型迁移到 ASR transcript 会显著掉分，例如 ViT5 EM 从 62.04% 降到 36.30%。但当模型直接在 ViSQA spoken transcriptions 上训练，鲁棒性明显回升，ViT5 EM 可到 50.70%，mBERT EM 从 23.69% 到 46.18%。这说明 SQA 的瓶颈不是只有 ASR 前端，MRC 模型也必须暴露在 ASR 风格的噪声分布下。</p>\n<h5>方法解读：ViSQA 与端到端音频大模型的关系</h5>\n<p>与 LTU、SALMONN、Qwen2-Audio 这类直接接收音频 token 的 Audio-LLM 不同，ViSQA 采用传统 SQA pipeline：音频先进入 ASR，得到 transcript，再交给 MRC 模型。这个设置看似朴素，但它能精确测量错误传播：当 WER 从 11.02% 升到 15.83%，不同模型的 EM/F1 下降幅度可以被直接观察；当 Google STT 换成 AssemblyAI，ViT5 F1 从 73.10% 提升到 77.08%，也能说明转写质量对下游理解的边际价值。</p>\n<div class=\"key-point\">💡 关键：ViSQA 的贡献不在于一个更大的模型，而在于把“越南语语音内容 + 问题 + 答案跨度 + 可控 ASR 错误”变成可复现 benchmark，让低资源语言 SQA 的错误来源可以被拆开研究。</div>",
      "quiz": {
        "q": "ViSQA 为什么需要在 ASR transcript 上重新对齐答案跨度？",
        "options": [
          "因为 TTS 会随机改变问题文本，必须重新生成问题",
          "因为 ASR 错误会让原 passage 中的 answer_start 在 transcript 中失效",
          "因为 ViSQA 只评估音频分类，不需要原始答案",
          "因为 encoder-decoder 模型不能使用文本 transcript"
        ],
        "answer": 1,
        "explain": "SQA 模型实际读取的是 ASR transcript；如果答案跨度仍使用原文本位置，替换、删除和空白变化会造成标签错位，因此必须重新匹配或过滤。"
      }
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
      "summary": "Audio-Thinker 提出一个面向大型音频语言模型的强化学习框架，让模型先判断问题是否需要思考，再在 think/no-think 两种模式间自适应选择。它通过 ATAR、一致性奖励、思考质量奖励和 GRPO 优化，解决了音频问答中“强行 CoT 不一定有效”和“只看最终答案会训练出伪推理”的问题。",
      "keyPoints": [
        "<strong>自适应思考 prompt</strong>：模型先判断题目是否需要 reflective thinking，再输出 <code>&lt;think&gt;...&lt;/think&gt;&lt;answer&gt;...&lt;/answer&gt;</code> 或直接 <code>&lt;answer&gt;...&lt;/answer&gt;</code>",
        "<strong>GRPO 强化学习训练</strong>：以 Qwen2-Audio-7B-Instruct 和 Qwen2.5-Omni 为基础模型，每个问题采样多条回答并按组内归一化奖励更新",
        "<strong>Adaptive Think Accuracy Reward (ATAR)</strong>：区分 think-correct、think-wrong、no-think-correct、no-think-wrong 四种情况，鼓励简单题少想、困难题会想",
        "<strong>batch-level 行为平衡</strong>：根据 batch 中 Think 轨迹比例 <span class=\"kb-math kb-math-inline\">\\lambda</span> 动态调整 <span class=\"kb-math kb-math-inline\">\\gamma_{\\text{think}}</span> 与 <span class=\"kb-math kb-math-inline\">\\gamma_{\\text{nothink}}</span>，避免训练早期坍缩到单一模式",
        "<strong>Consistency Reward</strong>：用 Qwen3-8B-Base 判断思考过程与最终答案是否一致，降低“推理写 A、答案选 B”的不透明行为",
        "<strong>Think Reward</strong>：独立评价中间 reasoning quality，避免只因为最终答案正确就奖励错误或空洞的推理链",
        "<strong>AVQA 训练数据改造</strong>：从 AVQA 提取音频并把 video 问题改写为 audio 问题，构造 40,176 个音频-文本训练样本"
      ],
      "detail": "<p><img alt=\"Audio-Thinker 强化学习训练流水线\" src=\"https://arxiv.org/html/2508.08039v1/x3.png\" />\n<em>图：Audio-Thinker 上半部分是基于 GRPO 的 RL 训练流程，下半部分展示格式奖励、ATAR、一致性奖励和思考奖励的递进设计。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Audio-Thinker 的自适应思考与 GRPO 训练伪代码\ndef audio_thinker_rollout(audio, question, policy, group_size=8):\n    prompt = (\n        &quot;First decide whether this audio question requires reasoning. &quot;\n        &quot;If needed, answer with &lt;think&gt;...&lt;/think&gt;&lt;answer&gt;...&lt;/answer&gt;; &quot;\n        &quot;otherwise answer directly with &lt;answer&gt;...&lt;/answer&gt;.&quot;\n    )\n    return [policy.generate(audio, question, prompt, temperature=1.0)\n            for _ in range(group_size)]\n\ndef reward_response(response, gold_answer, batch_think_ratio, step, total_steps):\n    mode = parse_mode(response)                 # &quot;think&quot; or &quot;nothink&quot;\n    final_answer = parse_answer(response)\n    correct = match(final_answer, gold_answer)\n\n    gamma_think = exp(-batch_think_ratio * (1 - step / total_steps))\n    gamma_nothink = exp(-(1 - batch_think_ratio) * (1 - step / total_steps))\n\n    ra = adaptive_think_accuracy_reward(\n        mode=mode,\n        correct=correct,\n        gamma_think=gamma_think,\n        gamma_nothink=gamma_nothink,\n    )\n    rf = 1 if valid_format(response) else 0\n    rc = consistency_judge(response) if correct and mode == &quot;think&quot; else 1\n    rt = think_quality_judge(response) if mode == &quot;think&quot; else batch_mean_think_reward()\n    return ra * (1 + 0.5 * rc) + 0.5 * rf + rt\n\ndef train_with_grpo(policy, ref_policy, dataset):\n    for step, (audio, question, gold) in enumerate(dataset):\n        responses = audio_thinker_rollout(audio, question, policy)\n        rewards = [reward_response(r, gold, think_ratio(responses), step, T)\n                   for r in responses]\n        advantages = normalize(rewards)\n        loss = grpo_clipped_loss(policy, ref_policy, responses, advantages)\n        policy.update(loss)\n</code></pre>\n<h5>关键公式</h5>\n<p>ATAR 首先给四种行为设定基础偏好：think 且正确、think 且错误、no-think 且正确、no-think 且错误分别对应</p>\n<div class=\"kb-math kb-math-display\">R_{\\text{a},i}\\in\\{+1,0,+2,-1\\}</div>\n<p>为避免模型在训练早期只会一直思考或一直不思考，Audio-Thinker 按 batch 中 Think 轨迹比例 <span class=\"kb-math kb-math-inline\">\\lambda</span> 和训练进度 <span class=\"kb-math kb-math-inline\">steps/T</span> 设计软惩罚：</p>\n<div class=\"kb-math kb-math-display\">\\gamma_{\\text{think}}=e^{-\\lambda\\cdot(1-\\frac{steps}{T})},\\quad\n\\gamma_{\\text{nothink}}=e^{-(1-\\lambda)\\cdot(1-\\frac{steps}{T})}</div>\n<p>最终奖励把自适应准确性、格式、一致性和思考质量组合起来：</p>\n<div class=\"kb-math kb-math-display\">R = R_a \\times (1 + 0.5R_c) + 0.5R_f + R_t</div>\n<p>GRPO 对同一问题采样 <span class=\"kb-math kb-math-inline\">G</span> 个输出 <span class=\"kb-math kb-math-inline\">o_i</span>，用组内奖励归一化得到 advantage：</p>\n<div class=\"kb-math kb-math-display\">\\hat{A}_{i,t}=\\widetilde{R}_i=\\frac{R_i-\\operatorname{mean}(\\mathbf{R})}{\\operatorname{std}(\\mathbf{R})}</div>\n<p>再用 PPO 风格裁剪目标更新策略：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{J}_{\\text{GRPO}}(\\theta)=\n\\mathbb{E}\\left[\n\\frac{1}{G}\\sum_{i=1}^{G}\\frac{1}{|o_i|}\\sum_{t=1}^{|o_i|}\n\\left(\n\\min(\\rho_{i,t}\\hat{A}_{i,t}, \\operatorname{clip}(\\rho_{i,t},1-\\epsilon,1+\\epsilon)\\hat{A}_{i,t})\n-\\beta D_{\\text{KL}}(\\pi_{\\theta}\\Vert\\pi_{\\text{ref}})\n\\right)\n\\right]</div>\n<h5>方法解读：为什么“什么时候思考”比“总是 CoT”更重要</h5>\n<p>音频 QA 的问题难度差异很大：有些题只需要识别一个声音事件或语音中的显式事实，直接回答更稳；有些题需要把 spoken content、背景声、时序和常识联系起来，短答案会丢失推理路径。Audio-Thinker 的出发点是，强行让所有题都输出 CoT 既浪费 token，也可能在简单题上引入幻觉；完全不显式推理又会让困难题缺少中间结构。</p>\n<p>因此论文把“是否思考”本身变成策略学习的一部分。prompt 只是给模型提供 think/no-think 两种输出格式，真正决定行为的是 RL 奖励。prompt-only 方法在论文观察中对题目难度不敏感，no-thinking rate 难以随复杂度变化；Audio-Thinker 则用 ATAR 把简单题直接答对和困难题合理思考都纳入奖励信号。</p>\n<h5>方法解读：ATAR 如何避免模式坍缩</h5>\n<p>ATAR 的基础设计很直观：no-think 且正确奖励最高，说明模型不应把所有问题都拖进长推理；no-think 且错误惩罚最强，说明该思考时不能偷懒；think 且正确也有正奖励，think 且错误不奖励。问题在于，训练早期模型可能偶然发现某个模式短期收益高，于是不断重复 think 或 no-think，探索不足。</p>\n<p>batch-level soft penalty 解决的是这个探索-稳定性问题。若当前 batch 中 Think 比例 <span class=\"kb-math kb-math-inline\">\\lambda</span> 过高，<span class=\"kb-math kb-math-inline\">\\gamma_{\\text{think}}</span> 会降低 Think 轨迹的奖励，尤其压低错误 Think 的收益；反之如果 no-think 过多，<span class=\"kb-math kb-math-inline\">\\gamma_{\\text{nothink}}</span> 会压低 no-think 轨迹。随着训练步数接近 <span class=\"kb-math kb-math-inline\">T</span>，两个 <span class=\"kb-math kb-math-inline\">\\gamma</span> 逐渐趋向 1，模型从早期的行为平衡过渡到后期更依赖原始准确性奖励。</p>\n<h5>方法解读：只看最终答案会奖励伪推理</h5>\n<p>GRPO 或普通 accuracy reward 只关心最后选项是否正确，这会产生一个音频推理模型常见问题：模型在 <code>&lt;think&gt;</code> 中写出和最终答案不一致的理由，甚至 reasoning conclusion 指向选项 1，最终 <code>&lt;answer&gt;</code> 却输出选项 2；只要最终答案碰巧正确，训练就会强化这条坏轨迹。这种模型表面会“思考”，但 reasoning 对答案没有约束力。</p>\n<p>Audio-Thinker 增加 Consistency Reward 来检查思考与最终答案是否一致，并且对 no-think 样本默认给一致性分数 1，避免模型为了拿一致性奖励被迫输出无意义思考。更进一步，Think Reward 只评价中间思考质量，不看最终答案是否正确，用 Qwen3-8B-Base 给 0 到 1 的细粒度分数。这使奖励不仅问“答对了吗”，还问“推理有没有真的支撑答案”。</p>\n<h5>方法解读：与 SALMONN、Audio-Reasoner 和 R1-AQA 的区别</h5>\n<p>SALMONN 的核心是把 Whisper/BEATs 音频编码器接入 Vicuna，并用 activation tuning 恢复跨模态涌现能力；Audio-Reasoner 更强调结构化多阶段思考流程；R1-AQA 则探索把 GRPO 用到音频问答。Audio-Thinker 的差异在于，它不把 CoT 当作固定输出模板，而是把思考开关、最终答案、推理一致性和思考质量都放入奖励函数。</p>\n<p>这种设计更接近“按题目复杂度调节计算量”的推理策略。对简单音频问题，模型可以用 no-think 直接输出；对复杂问题，模型需要输出可检查的 reasoning，并让 reasoning 与最终答案一致。它把 Audio-LLM 的推理能力从“会写一段解释”推进到“知道什么时候解释、解释是否支撑答案”。</p>\n<div class=\"key-point\">💡 关键：Audio-Thinker 不是简单给音频 QA 加 CoT，而是用 RL 奖励学习 think/no-think 路由，并用一致性与思考质量奖励约束中间推理。</div>",
      "quiz": {
        "q": "Audio-Thinker 中 ATAR 的主要目的是什么？",
        "options": [
          "让所有音频问题都必须输出长篇 CoT",
          "根据答题正确性和 think/no-think 选择，引导模型按问题难度自适应思考",
          "替代 ASR 模块，直接把音频转换成文本 transcript",
          "只奖励最终答案格式，不检查答案是否正确"
        ],
        "answer": 1,
        "explain": "ATAR 将 think/no-think 与正确性组合成奖励，并用 batch-level 惩罚避免模式坍缩，从而让模型学习什么时候需要思考。"
      }
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
      "summary": "Audio Flamingo 3 提出一个 fully open 的大型音频语言模型，用统一的 AF-Whisper 音频编码器、Qwen2.5-7B、五阶段课程训练和 AF-Think 数据，提升语音、环境声、音乐、长音频和多轮多音频聊天中的理解与推理能力。它解决了此前 Audio-LLM 常依赖多编码器、长上下文弱、推理数据不足和开放性不足的问题。",
      "keyPoints": [
        "<strong>AF-Whisper 统一编码器</strong>：以 Whisper-large-v3 为基础，通过音频 captioning 训练统一表示 speech、sound、music，避免多编码器帧率不一致和训练不稳定",
        "<strong>30 秒滑窗长音频处理</strong>：音频重采样到 16kHz mono，转 128-channel mel spectrogram，AF-Whisper 以 50Hz 输出特征，再 stride-2 pooling",
        "<strong>Audio adaptor + Qwen2.5-7B</strong>：音频特征经 adaptor 投到 LLM embedding 空间，与文本指令共同作为 Qwen2.5-7B 的上下文",
        "<strong>四类核心数据</strong>：AudioSkills-XL 约 8M QA，LongAudio-XL 约 1.25M 长音频 QA，AF-Think 25 万+ 带短思考前缀 QA，AF-Chat 7.5 万多轮多音频对话",
        "<strong>五阶段课程训练</strong>：alignment pre-training → encoder tuning → full fine-tuning → context extension &amp; thinking → chat and voice fine-tuning",
        "<strong>按需思考能力</strong>：AF-Think 让模型在被提示时生成短、受控的 CoT-style reasoning，而不是对所有任务强制深度思考",
        "<strong>长音频和交互能力</strong>：支持最长约 10 分钟音频理解、multi-turn multi-audio chat，以及 streaming TTS 形式的 voice-to-voice 交互"
      ],
      "detail": "<p><img alt=\"Audio Flamingo 3 架构图\" src=\"https://research.nvidia.com/labs/adlr/images/af3/af3_arch.png\" />\n<em>图：AF3 由 AF-Whisper 音频编码器、audio adaptor、Qwen2.5-7B LLM 和 streaming TTS 组成，并通过五阶段课程逐步扩展音频理解、长上下文、思考与聊天能力。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Audio Flamingo 3 的训练与推理流程伪代码\ndef af3_encode_audio(waveform):\n    audio = resample_to_mono(waveform, sample_rate=16000)\n    windows = split(audio, window_seconds=30, overlap=False)\n    features = []\n    for chunk in windows:\n        mel = mel_spectrogram(chunk, n_mels=128, win_ms=25, hop_ms=10)\n        hidden = af_whisper(mel)           # 50 Hz, hidden size 1280\n        hidden = temporal_pool(hidden, stride=2)\n        features.append(hidden)\n    return concat(features, axis=&quot;time&quot;)\n\ndef af3_forward(audio_list, user_prompt, think=False):\n    audio_tokens = []\n    for audio in audio_list:\n        h_a = af3_encode_audio(audio)\n        audio_tokens.extend(audio_adaptor(h_a))\n\n    prompt = user_prompt + (&quot; Think before answering.&quot; if think else &quot;&quot;)\n    return qwen25_7b.generate([audio_tokens, tokenize(prompt)])\n\ndef train_af3():\n    # Stage 1: freeze AF-Whisper and LLM, train adaptor for audio-text alignment\n    train(params=[audio_adaptor], data=recognition_and_caption_data(max_audio=30))\n\n    # Stage 2: tune AF-Whisper + adaptor, keep LLM frozen\n    train(params=[af_whisper, audio_adaptor], data=recognition_and_caption_data(max_audio=30))\n\n    # Stage 3: full fine-tuning with AudioSkills-XL, context up to about 2.5 min\n    train(params=&quot;full_model&quot;, data=foundational_qa + audio_skills_xl)\n\n    # Stage 3.5: freeze original weights, add LoRA for long context and thinking\n    train(params=[llm_lora], data=stage3_mix + long_audio_xl + af_think)\n\n    # Stage 4: chat and voice fine-tuning with AF-Chat and streaming TTS\n    train(params=&quot;full_model&quot;, data=af_chat)\n</code></pre>\n<h5>关键公式</h5>\n<p>AF3 把音频 <span class=\"kb-math kb-math-inline\">A</span> 映射为可被 LLM 消化的 audio prompt。论文中的特征提取可简化为：</p>\n<div class=\"kb-math kb-math-display\">h_a = f_a(A),\\quad h_a \\in \\mathbb{R}^{N\\times d},\\quad d=1280</div>\n<p>audio adaptor 将 AF-Whisper 输出映射到文本 embedding 空间：</p>\n<div class=\"kb-math kb-math-display\">a = \\mathcal{A}(h_a)</div>\n<p>给定多个音频的 adapted tokens <span class=\"kb-math kb-math-inline\">a_{1:M}</span>、文本指令 <span class=\"kb-math kb-math-inline\">p</span> 和答案 <span class=\"kb-math kb-math-inline\">y_{1:T}</span>，训练目标仍是自回归 next-token prediction：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{AF3}} =\n-\\sum_{t=1}^{T}\\log P_{\\theta}(y_t \\mid y_{&lt;t}, p, a_{1:M})</div>\n<p>Stage 3.5 的 LoRA 适配可写成对冻结权重 <span class=\"kb-math kb-math-inline\">W</span> 加低秩增量：</p>\n<div class=\"kb-math kb-math-display\">W&#x27; = W + \\frac{\\alpha}{r}BA</div>\n<h5>方法解读：为什么 AF-Whisper 要统一 speech、sound、music</h5>\n<p>早期 Audio-LLM 常把语音、环境声和音乐交给不同编码器，例如语音用 Whisper，非语音用 BEATs 或 CLAP。这种多编码器方案有直接问题：输出帧率、特征维度和语义粒度不同，连接到 LLM 时需要额外对齐，长音频下也更容易出现训练不稳定。AF3 的判断是，基础音频智能不应在入口处先拆成三个模态，而应先学一个统一的高分辨率音频表征。</p>\n<p>AF-Whisper 从 Whisper-large-v3 出发，保留其强语音建模能力和 dense features，再通过 audio captioning 任务扩展到声音与音乐。训练 caption 时，样本的 transcript、ambient sound 描述和 music attributes 会被组织成自然语言描述；缺失的元信息由 AF2 或 Whisper-Large-v3 补全。这样编码器不仅听“说了什么”，也学习“背景发生什么”和“音乐属性是什么”。</p>\n<h5>方法解读：滑窗和 adaptor 如何接入 LLM</h5>\n<p>AF3 对输入音频做 16kHz mono 重采样，生成 128-channel mel spectrogram，并按 30 秒 non-overlapping sliding windows 处理。AF-Whisper 以 50Hz 输出特征，随后用 stride-2 pooling 降低时间长度。这个流程兼顾两点：足够高的时间分辨率可保留语音细节，滑窗又让长音频能分段进入编码器，而不会被 Whisper 固定上下文限制卡住。</p>\n<p>audio adaptor 的作用是把 <span class=\"kb-math kb-math-inline\">h_a</span> 变成 LLM 可读的 prompt embeddings。它不是独立任务头，而是跨模态接口：音频 token 与文本 instruction 一起进入 Qwen2.5-7B，由同一个 decoder 生成转写、分类、解释、长音频摘要或聊天回复。相比先 ASR 再 QA 的 pipeline，这种端到端接口能在答案生成时同时利用语音内容、非语音声景和音乐线索。</p>\n<h5>方法解读：数据集规模服务于不同能力</h5>\n<p>AF3 论文把数据构造作为核心贡献。AudioSkills-XL 用约 8M audio QA 扩展短音频技能，重点覆盖 sound/music/speech 的识别与推理；LongAudio-XL 用约 1.25M QA 补足 30 秒到 10 分钟音频，尤其加入长语音中的情绪变化、话题关系、因果、信息抽取、摘要和时间顺序理解；AF-Chat 提供 7.5 万个 multi-turn multi-audio 对话，让模型能在多段音频之间做比较和追踪上下文。</p>\n<p>AF-Think 则针对“推理型音频大模型”的一个关键矛盾：深度显式思考并不总是提高音频任务表现，复杂 CoT 后训练也可能低效。AF3 采用轻量方案，从 AudioSkills-XL 和 LongAudio-XL 的高质量 MCQ 样本中抽取子集，用 Gemini 2.0 Flash 在已知正确答案约束下生成短思考前缀，平均约 40 词。训练时只有带特殊后缀的 prompt 触发 thinking，因此模型获得按需思考，而不是默认冗长推理。</p>\n<h5>方法解读：五阶段课程如何逐步扩展能力</h5>\n<p>AF3 的五阶段课程把“先对齐、再扩能、再推理、最后聊天”拆开。Stage 1 冻结 AF-Whisper 和 LLM，只训练 adaptor，先解决音频特征与语言空间不匹配的问题。Stage 2 打开 AF-Whisper 与 adaptor，仍冻结 LLM，用识别和 captioning 数据强化基础听觉理解。Stage 3 全量微调，引入 AudioSkills-XL，把短音频的技能与推理能力推上去，并把上下文扩展到约 2.5 分钟。</p>\n<p>Stage 3.5 是 AF3 的关键过渡：加入 LongAudio-XL 和 AF-Think，并采用 LoRA-based training 冻结原始权重，只训练 LLM LoRA adapters。这让用户可以按需增强 reasoning 与 long-context，而不破坏基础模型。Stage 4 再用 AF-Chat 做聊天和 voice fine-tuning，使模型从单轮问答进入多轮、多音频、语音交互场景。这个顺序避免一开始就把长音频、聊天、推理全混在一起导致优化目标混乱。</p>\n<h5>方法解读：与 SALMONN/Audio Flamingo 2 的区别</h5>\n<p>SALMONN 证明了双编码器接 LLM 能获得通用听觉能力，但它仍显式拆分语音与非语音编码器；Audio Flamingo 2 提升了 audio understanding，但 AF3 进一步把统一编码器、开放数据、长音频和按需思考合到一个课程训练框架里。AF3 的重点不是单个模块替换，而是让架构、数据和训练顺序共同服务于“音频基础模型”。</p>\n<div class=\"key-point\">💡 关键：AF3 的“推理型音频大模型”能力来自三件事的组合：统一 AF-Whisper 表征减少模态割裂，AudioSkills-XL/LongAudio-XL/AF-Think 提供技能与推理监督，五阶段课程控制能力逐步注入。</div>",
      "quiz": {
        "q": "Audio Flamingo 3 中 Stage 3.5 的主要作用是什么？",
        "options": [
          "只训练 audio adaptor，完成最初的音频-文本空间对齐",
          "加入 LongAudio-XL 和 AF-Think，用 LoRA 扩展长上下文与按需思考能力",
          "完全移除 AF-Whisper，改用多个独立音频编码器",
          "只训练 streaming TTS，不更新音频理解模型"
        ],
        "answer": 1,
        "explain": "Stage 3.5 在 Stage 3 数据基础上加入 LongAudio-XL 和 AF-Think，并通过 LoRA 训练增强长音频理解和 CoT-style on-demand thinking。"
      }
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
      "summary": "UniAudio 2.0 提出 ReasoningCodec，将音频离散化为面向理解的 reasoning tokens 与面向高保真重建的 reconstruction tokens，从表示层解决统一音频理解和生成之间的冲突。它再用统一多流自回归 Transformer、功能分层专家和四阶段训练，把文本、语音、环境声、音乐的理解与生成放进同一个音频语言模型。",
      "keyPoints": [
        "<strong>ReasoningCodec 双分支 tokenizer</strong>：reasoning branch 产生文本对齐的高层感知/规划 token，reconstruction branch 产生多级重建 token",
        "<strong>低帧率 reasoning tokens</strong>：通过查询压缩与 RVQ 将连续音频特征压到约 5 Hz，降低 LLM 建模成本",
        "<strong>多专家 reconstruction tokens</strong>：融合 WavLM、Whisper 与 music SSL encoder，分别覆盖语音音素、环境声残差信息和音乐结构",
        "<strong>9 流输入表示</strong>：8 个音频 codebook stream 加 1 个文本 stream，通过 masked embedding summation 统一送入自回归模型",
        "<strong>功能分层自回归架构</strong>：底层音频理解专家、中层跨模态专家、上层音频生成专家，音频专家只更新音频位置",
        "<strong>四阶段训练</strong>：audio understanding warm-up → audio generation warm-up → audio-text pre-training → audio-text mid-training",
        "<strong>大规模训练语料</strong>：论文报告使用 100B text tokens 与 60B audio tokens，覆盖 speech、sound、music 的理解、生成、few-shot 与 zero-shot 任务"
      ],
      "detail": "<p><img alt=\"UniAudio 2.0 总体框架\" src=\"https://arxiv.org/html/2602.04683v2/x1.png\" />\n<em>图：UniAudio 2.0 的总体框架。模型先用 ReasoningCodec 得到音频离散 token，再用统一多流自回归模型同时处理文本与音频。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># UniAudio 2.0: ReasoningCodec + 多流自回归训练流程\ndef reasoning_codec(audio):\n    # 1) 高层 reasoning tokens：低帧率、文本对齐、服务理解与规划\n    h_reason = frozen_whisper_music_encoders(audio)\n    z = query_transformer(learnable_queries, h_reason, interleave_factor=5)\n    r = residual_vector_quantize(z, codebooks=8)\n\n    # 2) 多级 reconstruction tokens：服务声学细节和波形重建\n    h_ph = wavlm_encoder(audio)       # speech phone semantics\n    h_mu = music_ssl_encoder(audio)   # music structure\n    h_env = whisper_encoder(audio)    # sound/residual cues\n    h_env = film(h_env, condition=r)  # inject reasoning context\n    s = concat(vq_phone(h_ph), vq_music(h_mu), rvq_env(h_env))\n    return r, s\n\ndef pack_multistream(text_tokens=None, audio_tokens=None):\n    # streams 0..7 are audio codebooks; stream 8 is text.\n    X = []\n    for token in interleave(text_tokens, audio_tokens):\n        if token.is_text:\n            X.append([PAD] * 8 + [token.id])\n        else:\n            X.append(token.audio_codebooks + [PAD])\n    return X\n\ndef train_uniaudio2(batch):\n    r, s = reasoning_codec(batch.audio)\n    X = pack_multistream(batch.text, audio_tokens=merge(r, s))\n    H = audio_understanding_experts(X, update_mask=&quot;audio_only&quot;)\n    H = cross_modal_experts(H)\n    H = audio_generation_experts(H, update_mask=&quot;audio_only&quot;)\n    loss = lambda_text * text_next_token_loss(H, X)\n    loss += lambda_audio * stream_weighted_audio_loss(H, X)\n    update_all_trainable_parameters(loss)\n</code></pre>\n<h5>关键公式</h5>\n<p>ReasoningCodec 将音频 <span class=\"kb-math kb-math-inline\">x</span> 分解为两个互补离散流：</p>\n<div class=\"kb-math kb-math-display\">r=\\mathcal{T}_{r}(x), \\qquad s=\\mathcal{T}_{s}(x\\mid r), \\qquad \\hat{x}=\\mathcal{D}(s)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">r</span> 是 reasoning tokens，<span class=\"kb-math kb-math-inline\">s</span> 是 reconstruction tokens；波形只由 <span class=\"kb-math kb-math-inline\">s</span> 重建，避免把 reasoning token 迫成声学细节容器。多流 token 的嵌入用 masked summation 融合：</p>\n<div class=\"kb-math kb-math-display\">h_t=\\sum_{i=1}^{S}m_{t,i}E_i(x_{t,i}), \\qquad S=9</div>\n<p>音频专家只更新音频位置：</p>\n<div class=\"kb-math kb-math-display\">H&#x27;=H+M_{\\mathrm{aud}}\\odot(f(H)-H)</div>\n<p>最终训练目标把文本语言建模和音频多流建模加权合并：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\mathrm{AR}}\n=\\lambda_{\\mathrm{text}}\\mathcal{L}_{\\mathrm{text}}\n+\\lambda_{\\mathrm{audio}}\\mathcal{L}_{\\mathrm{audio}}</div>\n<h5>方法解读：为什么要拆成 reasoning token 和 reconstruction token</h5>\n<p>统一音频模型最难的矛盾是“理解”和“生成”需要的表示不同。音频理解希望 token 更接近文本语义：一句话的内容、事件类型、乐器、音色、节奏变化等最好被压缩成可推理的抽象表示；音频生成则需要足够多的声学细节，否则重建的波形会丢失音色、韵律、背景和音乐纹理。传统单一路径 codec 往往在这两端做折中，token 太细会让 LLM 上下文爆炸，token 太粗又会损害生成质量。</p>\n<p>ReasoningCodec 的做法是显式分工。Reasoning branch 用冻结音频编码器和 query transformer 产生低帧率 reasoning tokens，主要服务 ASR、caption、音频问答和层级生成规划；reconstruction branch 则用多专家特征和多级 VQ/RVQ 保留声学结构。这样，LLM 可以先在低成本 token 上形成“这段音频是什么、应该如何生成/回答”的抽象，再由 reconstruction tokens 和解码器承担波形保真。</p>\n<h5>方法解读：多流表示如何统一文本与音频</h5>\n<p>UniAudio 2.0 没有把音频 token 简单拼成一个超长序列，而是把每个时间步表示成 9 个 stream：前 8 个是音频 codebook，最后 1 个是文本。文本位置只激活文本 stream，音频位置只激活音频 stream，所有无效 stream 填 PAD。经过各 stream 独立 embedding 后，用 mask 求和得到单个隐藏向量，因此外层 Transformer 仍看到一个普通自回归序列。</p>\n<p>这种设计的好处是保留了音频 codec 的并行 codebook 结构，同时不必改造文本 LLM 的接口。对音频帧，模型可以用局部自回归解码器按 codebook 顺序预测 <span class=\"kb-math kb-math-inline\">x_{t,1:K}</span>；对文本 token，则继续使用标准 next-token prediction。换句话说，文本和音频共享主干时序，但预测头和损失函数按模态分开。</p>\n<h5>方法解读：功能分层专家为什么只更新音频位置</h5>\n<p>论文将 Transformer 主干分成音频理解专家、跨模态专家和音频生成专家。中间的 cross-modal experts 从预训练文本 LLM 初始化，用来保留语言知识和完成跨模态语义融合；底层/上层音频专家随机初始化，分别学习音频感知和音频生成能力。关键的 audio-only update 用 <span class=\"kb-math kb-math-inline\">M_{\\mathrm{aud}}</span> 遮罩保护文本位置，让音频专家不会破坏文本 token 的隐藏状态。</p>\n<p>这个细节对“统一”很重要：如果所有层都同时修改文本和音频位置，模型容易在大规模音频训练中遗忘原有语言能力；如果完全冻结 LLM，又难以获得强音频生成能力。音频-only 专家提供了一个折中：保留文本路径的可用性，同时给音频 token 分配足够的专门容量。</p>\n<h5>方法解读：四阶段训练如何降低联合优化难度</h5>\n<p>训练流程先分别 warm-up 理解和生成，再进行音频-文本联合预训练，最后用更长上下文和 auditory sentence 做 mid-training。前两个阶段相当于先让模型分别学会“听懂”和“发声/生成音频 token”；第三阶段把 text-only、audio-only、理解任务和生成任务混合起来，真正对齐两种模态；第四阶段扩展到更复杂的上下文和未见任务，提升 few-shot/zero-shot 泛化。</p>\n<p>论文中的加权损失也服务于这个目标。文本损失权重高于音频损失，用于减轻音频训练对语言能力的冲击；音频损失内部又对不同 codebook stream 设权重，使模型更重视高层语义 stream。整体上，UniAudio 2.0 的贡献不是单个模块，而是 tokenizer、输入表示、专家架构和训练配方共同配合，支撑“统一音频理解与生成模型”。</p>\n<div class=\"key-point\">💡 关键：UniAudio 2.0 把音频 token 设计从“压缩波形”提升到“同时服务推理抽象与声学重建”，这是它区别于 AudioGPT 式工具编排和早期统一音频生成模型的核心。</div>",
      "quiz": {
        "q": "UniAudio 2.0 中 ReasoningCodec 将音频拆成 reasoning tokens 与 reconstruction tokens 的主要目的是什么？",
        "options": [
          "让所有音频任务只使用文本 token，不再需要音频编码器",
          "把理解所需的文本对齐抽象与生成所需的声学细节分离，降低统一建模冲突",
          "用单个 codebook 取代 RVQ，从而减少所有训练阶段",
          "只提升 ASR 转写，不支持音频生成任务"
        ],
        "answer": 1,
        "explain": "reasoning tokens 面向高层感知和规划，reconstruction tokens 面向高保真波形重建；二者分工使同一自回归模型更容易同时做音频理解与生成。"
      }
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
      "summary": "Gemini 3.1 Audio 不是一篇公开方法论文，而是 Google Gemini 3.1 系列在 API 中暴露的原生音频输入、结构化音频理解和多模态推理能力。它把音频与文本、图像、视频、PDF 放在同一 `generateContent`/Live API 交互范式下，使转写、摘要、情绪识别、时间戳分析和跨模态问答都变成统一的内容生成任务。",
      "keyPoints": [
        "<strong>原生音频输入</strong>：Gemini 3.1 Pro Preview 官方模型页列出支持 Text、Image、Video、Audio、PDF 输入，输出为 Text",
        "<strong>长上下文多模态推理</strong>：<code>gemini-3.1-pro-preview</code> 标注 1,048,576 input token 与 65,536 output token 上限，适合长音频/视频材料分析",
        "<strong>音频理解任务统一为生成</strong>：官方音频文档覆盖音频描述、摘要、问答、转写、翻译、情绪检测、片段时间戳分析",
        "<strong>结构化输出</strong>：可通过 JSON schema 约束输出字段，例如 <code>summary</code>、<code>segments</code>、<code>timestamp</code>、<code>language</code>、<code>translation</code>、<code>emotion</code>",
        "<strong>离线分析与实时交互分层</strong>：<code>generateContent</code> 面向音频文件理解；实时语音/视频交互由 Live API 承担",
        "<strong>Gemini 3.1 Live 音频输出</strong>：Live API 文档说明 Gemini 3.1 live 模型支持 native audio output、<code>thinkingLevel</code> 和音频响应模式",
        "<strong>公开信息边界</strong>：Google 未公开完整音频编码器、融合层和训练损失细节，因此方法解读只能基于官方 API 行为和多模态模型通用机制推断"
      ],
      "detail": "<p><img alt=\"Gemini API 多模态能力示意\" src=\"https://ai.google.dev/static/site-assets/images/share-gemini-api-2.png\" />\n<em>图：Gemini API 官方分享图。Gemini 3.1 Audio 的公开形态主要是 API 能力，而非论文中的可复现实验架构。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Gemini 3.1 Audio 的公开 API 工作流抽象\ndef gemini_audio_understanding(audio_uri, user_instruction, schema=None):\n    request = {\n        &quot;model&quot;: &quot;gemini-3.1-pro-preview&quot;,\n        &quot;contents&quot;: [{\n            &quot;parts&quot;: [\n                {&quot;file_data&quot;: {&quot;file_uri&quot;: audio_uri, &quot;mime_type&quot;: infer_mime(audio_uri)}},\n                {&quot;text&quot;: user_instruction},\n            ]\n        }],\n    }\n    if schema is not None:\n        request[&quot;generation_config&quot;] = {\n            &quot;response_format&quot;: {&quot;text&quot;: {&quot;mime_type&quot;: &quot;application/json&quot;}},\n            &quot;response_schema&quot;: schema,\n        }\n\n    # Internally, Google does not disclose the exact encoder/fusion stack.\n    # Conceptually: audio frames -&gt; multimodal embeddings -&gt; Gemini decoder -&gt; text/JSON.\n    response = generate_content(request)\n    return parse_text_or_json(response)\n\ndef gemini_live_voice_session(audio_stream):\n    session = live_connect(\n        model=&quot;gemini-3.1-flash-live-preview&quot;,\n        config={\n            &quot;response_modalities&quot;: [&quot;AUDIO&quot;],\n            &quot;thinking_config&quot;: {&quot;thinking_level&quot;: &quot;low&quot;},\n        },\n    )\n    for pcm_chunk in audio_stream:\n        session.send_audio(pcm_chunk)\n        yield session.receive_audio_or_text()\n</code></pre>\n<h5>关键公式</h5>\n<p>公开 API 可抽象为条件生成问题。给定音频 <span class=\"kb-math kb-math-inline\">a</span>、文本指令 <span class=\"kb-math kb-math-inline\">p</span>、可选其他模态上下文 <span class=\"kb-math kb-math-inline\">m</span>，模型生成文本或 JSON token 序列 <span class=\"kb-math kb-math-inline\">y_{1:N}</span>：</p>\n<div class=\"kb-math kb-math-display\">P(y\\mid a,p,m)=\\prod_{t=1}^{N}P(y_t\\mid y_{&lt;t}, E_{\\mathrm{audio}}(a), E_{\\mathrm{text}}(p), E_{\\mathrm{mm}}(m))</div>\n<p>若要求结构化片段输出，可以把时间戳分段看成受 schema 约束的解码：</p>\n<div class=\"kb-math kb-math-display\">y = \\{(t_i, c_i, \\ell_i, e_i)\\}_{i=1}^{K},\n\\qquad\nt_i=[s_i,e_i],\\ c_i=\\text{segment text},\\ \\ell_i=\\text{language}</div>\n<p>对 Live API，延迟与推理深度存在工程权衡，可抽象为：</p>\n<div class=\"kb-math kb-math-display\">\\text{latency} \\approx T_{\\mathrm{encode}} + T_{\\mathrm{thinking}}(\\rho) + T_{\\mathrm{decode}},\n\\qquad \\rho\\in\\{\\text{minimal},\\text{low},\\text{medium},\\text{high}\\}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\rho</span> 对应官方 <code>thinkingLevel</code>，低档位通常服务低延迟语音交互，高档位服务更复杂推理。</p>\n<h5>方法解读：公开资料里的“原生音频理解”意味着什么</h5>\n<p>Gemini 3.1 Pro Preview 的官方模型页明确列出 Audio 是输入数据类型之一，且输出为 Text。这与传统 ASR→LLM 级联系统不同：用户不必先调用单独的语音识别模型，再把转写文本交给语言模型；同一个多模态请求可以同时包含音频文件和文本指令，模型直接输出摘要、问答、转写、翻译或结构化 JSON。公开文档没有披露底层是否仍包含专门音频编码器，但从 API 语义看，音频已经是 Gemini 内容生成接口的一等输入。</p>\n<p>音频理解文档列出的任务也说明 Gemini Audio 的目标不只是 ASR。它可以描述音频内容、回答关于音频的问题、做 speech-to-text、翻译、检测语音和音乐中的情绪、分析指定片段并给出时间戳。更重要的是，这些任务不需要切换模型头，而是通过自然语言 prompt 和可选 schema 控制输出格式，这与 GPT-4o 后的原生多模态交互路线一致。</p>\n<h5>方法解读：结构化输出让音频分析可工程化</h5>\n<p>官方示例把音频处理输出约束为 JSON schema，字段包含 <code>summary</code>、<code>segments</code>、<code>timestamp</code>、<code>content</code>、<code>language</code>、<code>translation</code> 和 <code>emotion</code>。这说明 Gemini Audio 的关键工程能力不是“能听懂一句话”这么简单，而是把非结构化音频转成下游系统可消费的数据结构。对会议、播客、客服录音或视频音轨来说，结构化输出可以直接进入搜索、质检、字幕、知识库或多轮问答系统。</p>\n<p>从建模角度看，schema 约束相当于把自由文本解码限制在一个合法语言中。模型仍然按自回归方式生成 token，但每个字段的语义由 prompt 和 schema 共同决定：<code>timestamp</code> 约束时间定位，<code>content</code> 承载转写或描述，<code>emotion</code> 承载分类标签，<code>translation</code> 承载跨语言映射。这种统一解码方式避免为每个音频任务维护单独分类头。</p>\n<h5>方法解读：离线 generateContent 与实时 Live API 的边界</h5>\n<p>官方音频文档强调 <code>generateContent</code> API 不面向实时转写；实时语音/视频交互应使用 Live API。这个边界很重要：离线音频分析可以容忍更高延迟，换取长上下文、复杂 schema、长文件处理和更充分推理；实时语音交互则要求流式收发、低延迟和可控推理深度。Gemini 3.1 Live 文档中的 <code>thinkingLevel</code> 正是为这种延迟/质量折中服务。</p>\n<p>因此，Gemini 3.1 Audio 更像一组原生音频能力的产品化接口，而不是单个学术算法。离线场景用 Pro/Flash 的 audio input 做多模态推理，实时场景用 Live API 发送音频流并接收 native audio output。二者共享 Gemini 3.1 的多模态推理能力，但暴露的系统约束不同。</p>\n<h5>方法解读：与级联音频系统的差异</h5>\n<p>传统音频助手常见流程是 ASR 先把声音变成文本，LLM 再对文本推理，必要时 TTS 再播报。这个流程在干净语音场景有效，但会丢失音色、情绪、音乐、背景声、重叠事件和时间定位等非文字信息。Gemini Audio 的接口允许用户直接问“这段音频哪里情绪变化明显”“第 02:10 后有什么背景声”“这段视频音轨里谁在插话”，这些问题不能只靠普通转写稳定解决。</p>\n<div class=\"key-point\">💡 关键：Gemini 3.1 Audio 的可见创新点在“统一 API 语义与多模态推理能力”，不是公开可复现的音频编码器论文。写入知识库时应把它标为官方能力文档精读，而不是伪造未公开训练细节。</div>",
      "quiz": {
        "q": "根据公开 Gemini API 文档，Gemini 3.1 Audio 相比 ASR→LLM 级联系统的主要工程优势是什么？",
        "options": [
          "只输出逐字转写，不能做摘要或情绪分析",
          "把音频、文本和其他模态放进统一内容生成接口，并可用 schema 约束结构化输出",
          "完全不需要 prompt，所有音频任务都自动判断",
          "只能用于实时转写，不能处理离线音频文件"
        ],
        "answer": 1,
        "explain": "官方文档展示了音频输入、文本指令和 JSON schema 共同驱动的转写、摘要、翻译、情绪和时间戳分析；这比简单 ASR 级联保留了更多音频上下文和输出控制能力。"
      }
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
      "summary": "Desta2.5-Audio 提出 self-generated cross-modal alignment，让作为骨干的 LLM 自己根据音频文本描述和随机 prompt 生成训练回答，再用这些回答训练音频-语言融合模型。它避免依赖任务专用 audio instruction tuning 数据，同时降低外部教师数据分布不匹配导致的灾难性遗忘。",
      "keyPoints": [
        "<strong>自生成跨模态对齐</strong>：用骨干 LLM 自己生成训练 target，保持回答风格和语义分布与原 LLM 一致",
        "<strong>DeSTA-AQA5M 数据集</strong>：由约 7,000 小时音频、50 个数据集生成约 5M audio-prompt-response triplets",
        "<strong>覆盖三类音频域</strong>：speech、environmental sound、music，支持语音内容、非语言线索、背景声与音乐理解",
        "<strong>模块化 LALM 架构</strong>：Whisper-large-v3 音频编码器 + 6 层 Q-Former 适配器 + Llama3.1-8B-Instruct",
        "<strong>多层声学特征读取</strong>：Q-Former 的 64 个 query attend 到 Whisper encoder 第 8/16/24/32 层，捕获多尺度声学信息",
        "<strong>参数高效训练</strong>：冻结音频模型与 LLM，仅训练模态适配器；论文报告总参数 8.8B、可训练参数 131M",
        "<strong>无需任务专用指令微调</strong>：训练目标来自通用音频描述和 prompt，而不是为每个 benchmark 人工构造指令数据",
        "<strong>强调数据构造质量</strong>：对比显示同模型自生成目标优于跨模型教师目标，后者可能因分布不匹配造成退化"
      ],
      "detail": "<p><img alt=\"DeSTA2.5-Audio 框架\" src=\"https://arxiv.org/html/2507.02768v1/x2.png\" />\n<em>图：DeSTA2.5-Audio 的左侧是自生成数据构造，右侧是冻结音频编码器/LLM、只训练 Q-Former 适配器的模型训练流程。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># DeSTA2.5-Audio: 自生成跨模态对齐\ndef build_desta_aqa(audio_dataset, backbone_llm):\n    triples = []\n    for audio, metadata in audio_dataset:\n        # speech/audio/music metadata -&gt; structured textual description\n        x_text = metadata_to_description(metadata)\n        for prompt in sample_prompts(domain=metadata.domain):\n            # The same LLM that will be used as backbone generates its own target.\n            y = backbone_llm.generate(text=f&quot;{x_text}\\n{prompt}&quot;,\n                                      temperature=0.05, top_p=1.0)\n            triples.append((audio, prompt, y))\n    return triples\n\ndef desta25_forward(audio, prompt):\n    whisper_hidden = whisper_large_v3(audio, layers=[8, 16, 24, 32])\n    q_features = []\n    for layer_hidden in whisper_hidden:\n        q_features.append(q_former(learned_queries, layer_hidden))\n    F = linear(weighted_sum(q_features))       # audio adapter output\n    E = llama_embed(prompt)                    # text prompt embeddings\n    A = concat(F, E)\n    return llama31_8b.generate(prefix=A)\n\ndef train_adapter(triples):\n    freeze(whisper_large_v3)\n    freeze(llama31_8b)\n    train(q_former, projection)\n    for audio, prompt, target in triples:\n        logits = desta25_forward(audio, prompt)\n        loss = next_token_cross_entropy(logits, target)\n        update(q_former, projection, loss)\n</code></pre>\n<h5>关键公式</h5>\n<p>Q-Former 从 Whisper 多层隐藏状态中抽取固定长度音频表示：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{f}^{(\\ell)}=\\mathrm{Q\\text{-}Former}(\\mathbf{Q}^{(\\ell)},\\mathbf{h}^{(\\ell)})\n\\in\\mathbb{R}^{N\\times d}</div>\n<p>多层特征经可学习权重融合并线性投影到 LLM 维度：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{F}=\\mathrm{Linear}\\left(\\sum_{\\ell}\\alpha^{(\\ell)}\\mathbf{f}^{(\\ell)}\\right)\n\\in\\mathbb{R}^{N\\times d&#x27;}</div>\n<p>文本 prompt 嵌入为 <span class=\"kb-math kb-math-inline\">\\mathbf{E}=\\mathrm{Embed}(\\mathbf{t})</span>，融合输入为：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{A}=[\\mathbf{F};\\mathbf{E}]</div>\n<p>自回归解码目标为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\mathrm{NLL}}\n=-\\sum_{i=1}^{|y|}\\log P_{\\theta}(y_i\\mid y_{&lt;i},\\mathbf{A})</div>\n<h5>方法解读：为什么“自生成”能缓解灾难性遗忘</h5>\n<p>许多 LALM 会用强教师模型或人工模板生成 audio instruction tuning 数据，再把这些数据喂给一个已有 LLM。问题是训练 target 的语言风格、推理粒度和偏好可能与骨干 LLM 原本的输出分布不同；当只用有限音频数据微调时，模型既要学习音频对齐，又被迫模仿陌生分布，容易牺牲原有语言能力。DeSTA2.5-Audio 的关键假设是：跨模态对齐时，答案分布应尽量由目标骨干 LLM 自己定义。</p>\n<p>具体做法是先把每段音频的 metadata 转成结构化文本描述 <span class=\"kb-math kb-math-inline\">x^{text}</span>，再随机抽取 prompt，让同一个 Llama3.1-8B-Instruct 生成回答 <span class=\"kb-math kb-math-inline\">y</span>。训练时把真实音频 <span class=\"kb-math kb-math-inline\">x^{audio}</span>、同一个 prompt 和自生成回答组成三元组。这样，模型需要学习的是“把音频编码成能替代文本描述的条件”，而不是同时学习一个外部教师的语言风格。</p>\n<h5>方法解读：Q-Former 适配器承担跨模态桥接</h5>\n<p>模型主体是典型模块化 LALM：Whisper-large-v3 提供强语音/音频表征，Llama3.1-8B-Instruct 提供语言推理和对话能力，中间由 6 层 Q-Former 负责把可变长音频帧压缩成固定数量的 query 表示。论文使用 64 个 query，并让它们 attend 到 Whisper encoder 的第 8、16、24、32 层，以便同时取到低层声学线索和高层语义线索。</p>\n<p>适配器输出 <span class=\"kb-math kb-math-inline\">\\mathbf{F}</span> 被投影到 LLM embedding 维度，再与 prompt embedding <span class=\"kb-math kb-math-inline\">\\mathbf{E}</span> 拼接。训练时冻结 Whisper 和 Llama，只更新 Q-Former 与投影层，因此总训练参数远小于全量微调。这种设计适合高校或资源受限环境：音频能力主要通过数据构造和适配器学习获得，而不是重训一个完整多模态基础模型。</p>\n<h5>方法解读：DeSTA-AQA5M 如何避免任务专用 instruction tuning</h5>\n<p>DeSTA-AQA5M 覆盖 speech、environmental sound、music 三个域，来自约 50 个数据集、7,000 小时音频，并通过 4,000 个 speech prompts 与 3,000 个 environmental/music prompts 生成约 5M 样本。它的目标不是为某个 benchmark 写死题型，而是让音频描述和用户 prompt 的组合覆盖足够多的听觉属性：语音内容、说话人状态、情绪、背景事件、乐器、音乐风格等。</p>\n<p>这使得训练目标更像“通用音频问答”而不是“分类器微调”。在推理时，如果输入是语音，系统还可通过轻量 VAD 判断是否启用 Whisper decoder 产生离线转写作为可选语言线索；如果是环境声或音乐，则主要依赖连续音频 embedding。这个条件分支让模型可以处理端到端音频对话，同时不把所有音频都强制转成转写文本。</p>\n<h5>方法解读：与 Qwen-Audio/Qwen2-Audio 路线的区别</h5>\n<p>Qwen-Audio 系列更强调大规模音频-语言预训练和多任务统一；DeSTA2.5-Audio 的重点则是“训练 target 从哪里来”。它不是主张更复杂的音频编码器，而是证明数据分布一致性对 LALM 至关重要：同骨干自生成目标通常比跨模型教师目标更稳，尤其能减少输出风格漂移、重复无意义 token 和复杂推理退化。</p>\n<p>因此，Desta2.5-Audio 适合作为端到端音频对话系统的一个实用训练范式：保留强文本 LLM，冻结大部分参数，用自生成音频问答数据训练桥接层，让模型把听到的内容转化为 LLM 原本擅长处理的内部条件。它的代价是上限仍受冻结 LLM 和 Whisper 表征影响，对强声学生成或超低延迟语音交互并不是完整解决方案。</p>\n<div class=\"key-point\">💡 关键：DeSTA2.5-Audio 的核心不是“用更强教师标注数据”，而是“让目标 LLM 自己定义训练答案分布”，再训练音频适配器去对齐这个分布。</div>",
      "quiz": {
        "q": "DeSTA2.5-Audio 为什么强调 self-generated cross-modal alignment？",
        "options": [
          "因为自生成目标能让音频适配器对齐骨干 LLM 原本的回答分布，减少跨模型数据不匹配和灾难性遗忘",
          "因为它完全不需要任何音频输入，只训练纯文本 LLM",
          "因为它把 Whisper 和 Llama 都全量微调，从而最大化参数更新",
          "因为它只处理音乐分类，不能处理语音或环境声"
        ],
        "answer": 0,
        "explain": "DeSTA2.5-Audio 让同一个骨干 LLM 生成训练 target，训练时只需学习音频条件到该分布的映射，避免外部教师风格与目标 LLM 不一致。"
      }
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
