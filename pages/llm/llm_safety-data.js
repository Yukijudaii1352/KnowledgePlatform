/**
 * llm_safety-data.js — 由 pipeline/build.py 于 2026-06-08 12:12:02 自动生成。
 * 源文件：content/llm/llm_safety.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "llm",
    "topic_id": "llm_safety",
    "topic_name": "LLM安全 算法总结",
    "page_title": "LLM安全 算法总结",
    "page_subtitle": "2026-06-08 版",
    "page_desc": "涵盖从早期RLHF对齐到2026年神经元级攻防与过程化幻觉控制的技术演进",
    "page_icon": "🛡️",
    "hero_pills": [
      "越狱攻防 · 幻觉控制 · 价值观对齐 · 内容安全"
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
        "id": "rlhf",
        "x": 150,
        "y": 100,
        "category": "alignment"
      },
      {
        "id": "cai",
        "x": 150,
        "y": 80,
        "category": "alignment"
      },
      {
        "id": "dpo",
        "x": 170,
        "y": 100,
        "category": "alignment"
      },
      {
        "id": "safe_rlhf",
        "x": 190,
        "y": 100,
        "category": "alignment"
      },
      {
        "id": "mart",
        "x": 190,
        "y": 80,
        "category": "alignment"
      },
      {
        "id": "safedpo",
        "x": 220,
        "y": 100,
        "category": "alignment"
      },
      {
        "id": "star_1",
        "x": 220,
        "y": 120,
        "category": "alignment"
      },
      {
        "id": "rmo",
        "x": 220,
        "y": 80,
        "category": "alignment"
      },
      {
        "id": "lasa",
        "x": 220,
        "y": 60,
        "category": "alignment"
      },
      {
        "id": "cai_2026",
        "x": 220,
        "y": 40,
        "category": "alignment"
      },
      {
        "id": "dan",
        "x": 150,
        "y": 200,
        "category": "jailbreak"
      },
      {
        "id": "gcg",
        "x": 170,
        "y": 200,
        "category": "jailbreak"
      },
      {
        "id": "ppl_filter",
        "x": 170,
        "y": 220,
        "category": "jailbreak"
      },
      {
        "id": "self_reminder",
        "x": 170,
        "y": 240,
        "category": "jailbreak"
      },
      {
        "id": "llama_guard",
        "x": 170,
        "y": 260,
        "category": "jailbreak"
      },
      {
        "id": "autodan",
        "x": 190,
        "y": 200,
        "category": "jailbreak"
      },
      {
        "id": "pair",
        "x": 190,
        "y": 180,
        "category": "jailbreak"
      },
      {
        "id": "llama_guard3",
        "x": 190,
        "y": 260,
        "category": "jailbreak"
      },
      {
        "id": "hmns",
        "x": 220,
        "y": 180,
        "category": "jailbreak"
      },
      {
        "id": "neurostrike",
        "x": 220,
        "y": 200,
        "category": "jailbreak"
      },
      {
        "id": "proact",
        "x": 220,
        "y": 160,
        "category": "jailbreak"
      },
      {
        "id": "aligntree",
        "x": 220,
        "y": 260,
        "category": "jailbreak"
      },
      {
        "id": "jbfuzz",
        "x": 220,
        "y": 220,
        "category": "jailbreak"
      },
      {
        "id": "jbf",
        "x": 220,
        "y": 240,
        "category": "jailbreak"
      },
      {
        "id": "rag",
        "x": 130,
        "y": 300,
        "category": "hallucination"
      },
      {
        "id": "truthfulqa",
        "x": 150,
        "y": 300,
        "category": "hallucination"
      },
      {
        "id": "selfcheckgpt",
        "x": 170,
        "y": 300,
        "category": "hallucination"
      },
      {
        "id": "factscore",
        "x": 170,
        "y": 320,
        "category": "hallucination"
      },
      {
        "id": "probe",
        "x": 220,
        "y": 300,
        "category": "hallucination"
      },
      {
        "id": "kghalubench",
        "x": 220,
        "y": 320,
        "category": "hallucination"
      },
      {
        "id": "abse",
        "x": 220,
        "y": 280,
        "category": "hallucination"
      },
      {
        "id": "halp",
        "x": 220,
        "y": 340,
        "category": "hallucination"
      },
      {
        "id": "ast_detect",
        "x": 220,
        "y": 360,
        "category": "hallucination"
      },
      {
        "id": "perspective",
        "x": 100,
        "y": 400,
        "category": "content_safety"
      },
      {
        "id": "toxigen",
        "x": 150,
        "y": 400,
        "category": "content_safety"
      },
      {
        "id": "nemo_guard",
        "x": 170,
        "y": 400,
        "category": "content_safety"
      },
      {
        "id": "llama_guard3",
        "x": 190,
        "y": 400,
        "category": "content_safety"
      },
      {
        "id": "expguard",
        "x": 220,
        "y": 400,
        "category": "content_safety"
      },
      {
        "id": "toxigan",
        "x": 220,
        "y": 420,
        "category": "content_safety"
      },
      {
        "id": "bielik_guard",
        "x": 220,
        "y": 440,
        "category": "content_safety"
      },
      {
        "id": "attriguard",
        "x": 220,
        "y": 380,
        "category": "content_safety"
      },
      {
        "id": "toolhijacker",
        "x": 220,
        "y": 460,
        "category": "content_safety"
      }
    ],
    "edges": [
      {
        "from": "rlhf",
        "to": "cai",
        "label": "宪法约束"
      },
      {
        "from": "rlhf",
        "to": "dpo",
        "label": "去奖励模型"
      },
      {
        "from": "dpo",
        "to": "safe_rlhf",
        "label": "安全约束"
      },
      {
        "from": "dpo",
        "to": "safedpo",
        "label": "集成安全"
      },
      {
        "from": "cai",
        "to": "cai_2026",
        "label": "推理框架"
      },
      {
        "from": "safe_rlhf",
        "to": "star_1",
        "label": "推理模型"
      },
      {
        "from": "safe_rlhf",
        "to": "rmo",
        "label": "边际重塑"
      },
      {
        "from": "cai",
        "to": "lasa",
        "label": "跨语言"
      },
      {
        "from": "gcg",
        "to": "autodan",
        "label": "隐蔽进化"
      },
      {
        "from": "autodan",
        "to": "pair",
        "label": "黑盒迭代"
      },
      {
        "from": "gcg",
        "to": "neurostrike",
        "label": "神经元级"
      },
      {
        "from": "llama_guard",
        "to": "llama_guard3",
        "label": "多模态"
      },
      {
        "from": "llama_guard3",
        "to": "aligntree",
        "label": "实时拦截"
      },
      {
        "from": "pair",
        "to": "proact",
        "label": "主动防御"
      },
      {
        "from": "pair",
        "to": "hmns",
        "label": "头掩蔽"
      },
      {
        "from": "jbfuzz",
        "to": "jbf",
        "label": "论文转攻击"
      },
      {
        "from": "selfcheckgpt",
        "to": "probe",
        "label": "过程化"
      },
      {
        "from": "factscore",
        "to": "kghalubench",
        "label": "图谱验证"
      },
      {
        "from": "rag",
        "to": "abse",
        "label": "语义熵"
      },
      {
        "from": "truthfulqa",
        "to": "halp",
        "label": "VLM探测"
      },
      {
        "from": "selfcheckgpt",
        "to": "abse",
        "label": "贝叶斯熵"
      },
      {
        "from": "toxigen",
        "to": "toxigan",
        "label": "数据增强"
      },
      {
        "from": "nemo_guard",
        "to": "expguard",
        "label": "专业领域"
      },
      {
        "from": "perspective",
        "to": "bielik_guard",
        "label": "多语种"
      },
      {
        "from": "llama_guard3",
        "to": "attriguard",
        "label": "因果归因"
      },
      {
        "from": "nemo_guard",
        "to": "toolhijacker",
        "label": "工具劫持"
      }
    ],
    "milestones": [
      "rlhf",
      "dpo",
      "gcg"
    ]
  },
  "algos": [
    {
      "id": "gcg",
      "num": 1,
      "name": "GCG",
      "fullName": "贪婪坐标梯度 (Greedy Coordinate Gradient)",
      "year": "2023",
      "org": "CMU",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2307.15043",
      "projectUrl": "",
      "category": "jailbreak",
      "motivation": "梯度优化生成通用对抗后缀",
      "summary": "GCG 提出了一种基于梯度的离散 token 搜索方法（贪心坐标梯度），通过优化对抗后缀使对齐 LLM 以肯定性开头（如 \"Sure, here is\"）回复有害指令，并证明该后缀可跨 prompt、跨模型迁移，成功攻击 GPT-4、Claude、PaLM-2 等闭源模型。",
      "keyPoints": [
        "<strong>攻击目标</strong>：最大化模型生成肯定性回复前缀（\"Sure, here is [harmful content]\"）的概率，将对抗攻击转化为目标序列的负对数似然最小化问题",
        "<strong>GCG 优化器（Algorithm 1）</strong>：基于 token embedding 梯度选取 top-k 候选替换，对所有位置同时搜索，每步采样 B 个单 token 替换候选并选择 loss 最低者——相比 AutoPrompt 的逐位置搜索效率大幅提升",
        "<strong>通用攻击（Algorithm 2）</strong>：将损失函数扩展为多 prompt 多模型的聚合梯度，渐进式增加优化目标数量，生成单一后缀即可攻击多种有害行为",
        "<strong>迁移攻击</strong>：在开源模型（Vicuna、Guanaco）上优化的后缀可直接迁移攻击 GPT-3.5（86.6%）、GPT-4（46.9%）、Claude-1（47.9%）、PaLM-2（66.0%）",
        "<strong>AdvBench 基准</strong>：构建包含 500 条有害行为和 500 条有害字符串的评估数据集",
        "<strong>关键发现</strong>：对齐训练（RLHF/Constitutional AI）并不能提供对抗鲁棒性，安全对齐与对抗鲁棒性之间存在根本差距"
      ],
      "detail": "<p><img alt=\"GCG 攻击总览\" src=\"https://arxiv.org/html/2307.15043v2/x1.png\" />\n<em>图 1：GCG 攻击示意。在用户有害指令后拼接一段对抗后缀（adversarial suffix），使对齐 LLM 绕过安全防护生成有害内容。该后缀可迁移至 ChatGPT、Claude、Bard 等闭源模型。</em></p>\n<h5>问题形式化</h5>\n<p>给定一个有害用户指令 <span class=\"kb-math kb-math-inline\">x_{1:n}</span>，攻击者的目标是找到一段对抗后缀 <span class=\"kb-math kb-math-inline\">p_{1:l}</span>，使模型在输入 <span class=\"kb-math kb-math-inline\">x_{1:n} \\| p_{1:l}</span> 后以特定的肯定性目标序列 <span class=\"kb-math kb-math-inline\">x^*_{n+1:n+H}</span>（如 \"Sure, here is a tutorial for making a bomb\"）开头回复。优化目标为最小化目标序列的负对数似然：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}(p_{1:l}) = -\\log p(x^*_{n+1:n+H} \\mid x_{1:n} \\| p_{1:l})</div>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：作者发现，只要模型以肯定性前缀开头回复（而非拒绝），后续生成几乎必然会产生有害内容。这一观察将复杂的\"让模型说有害内容\"问题简化为\"让模型说 Sure\"的可优化目标。</div>\n<h5>GCG 搜索算法（Algorithm 1）</h5>\n<pre><code class=\"language-python\"># GCG: Greedy Coordinate Gradient 核心伪代码\ndef gcg_attack(prompt, suffix, target, model, T=500, k=256, B=512):\n    &quot;&quot;&quot;\n    prompt: 有害指令 x_{1:n}\n    suffix: 对抗后缀 p_{1:l}（随机初始化）\n    target: 肯定性目标 &quot;Sure, here is...&quot;\n    &quot;&quot;&quot;\n    for t in range(T):\n        # Step 1: 计算每个后缀位置的 token 梯度\n        # 对 one-hot token embedding 求梯度，选 top-k 最有希望的替换\n        for i in range(len(suffix)):\n            gradients = compute_gradient(loss, e_{p_i})  # 对第 i 个 token 的 embedding 求梯度\n            X_i = top_k(-gradients, k)  # 梯度负方向 = loss 下降最快的 token\n\n        # Step 2: 采样 B 个候选替换\n        candidates = []\n        for b in range(B):\n            p_tilde = copy(suffix)\n            i = random_position()              # 随机选一个位置\n            p_tilde[i] = random_choice(X_i)    # 从该位置的 top-k 中随机选一个 token\n            candidates.append(p_tilde)\n\n        # Step 3: 评估所有候选，选最优\n        losses = [compute_loss(prompt, c, target, model) for c in candidates]\n        suffix = candidates[argmin(losses)]\n\n    return suffix\n</code></pre>\n<div class=\"warn-box\">⚠️ <strong>与 AutoPrompt 的关键区别</strong>：AutoPrompt 每步只搜索一个固定位置的替换；GCG 每步对<strong>所有位置</strong>同时计算梯度并采样候选，虽然每次仍只替换一个 token，但搜索空间覆盖更广，实验表明这一改动带来了巨大的性能提升。</div>\n<h5>通用攻击优化（Algorithm 2）</h5>\n<p>单 prompt 攻击虽然有效，但每条有害指令都需要独立优化。Algorithm 2 将目标扩展为多 prompt 多模型的联合优化：</p>\n<div class=\"kb-math kb-math-display\">p^* = \\arg\\min_{p_{1:l}} \\sum_{j=1}^{m} \\mathcal{L}_j(x^{(j)}_{1:n} \\| p_{1:l})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_j</span> 是第 <span class=\"kb-math kb-math-inline\">j</span> 个 prompt-模型对的损失。关键设计包括：</p>\n<ol>\n<li>\n<p><strong>梯度聚合</strong>：对所有 prompt 和模型的梯度求和，选取聚合 top-k 候选：\n   <div class=\"kb-math kb-math-display\">\\mathcal{X}_i = \\text{Top-}k\\left(-\\sum_{1 \\leq j \\leq m_c} \\nabla_{e_{p_i}} \\mathcal{L}_j\\right)</div></p>\n</li>\n<li>\n<p><strong>渐进式扩展</strong>：不一次优化所有 prompt，而是从 <span class=\"kb-math kb-math-inline\">m_c=1</span> 开始，当当前 prompt 集合全部攻击成功后才增加 <span class=\"kb-math kb-math-inline\">m_c</span>，逐步扩展优化目标数量。这避免了一开始目标过多导致优化困难。</p>\n</li>\n<li>\n<p><strong>多模型联合</strong>：损失函数可同时包含多个模型（如 Vicuna-7B 和 Vicuna-13B），使优化出的后缀具有跨模型迁移能力。</p>\n</li>\n</ol>\n<h5>迁移攻击机制</h5>\n<p><img alt=\"迁移攻击成功率\" src=\"https://arxiv.org/html/2307.15043v2/x3.png\" />\n<em>图 3：GCG 对抗后缀在不同 LLM 上的迁移攻击成功率（ASR）。在 Vicuna/Guanaco 上优化的后缀可迁移至架构、词表、参数量和训练方法完全不同的模型。</em></p>\n<p>迁移攻击的核心发现：</p>\n<ul>\n<li><strong>开源→闭源迁移</strong>：在 Vicuna-7B/13B + Guanaco-7B/13B 上联合优化的后缀，可直接拼接到发送给 GPT-3.5/GPT-4/Claude 的 prompt 中</li>\n<li><strong>集成策略（Ensemble）</strong>：生成多个对抗后缀，只要其中任一成功即算攻击成功，可将 GPT-3.5 的 ASR 从 47.4% 提升至 86.6%</li>\n<li><strong>跨架构有效</strong>：即使目标模型的词表、架构（decoder-only vs encoder-decoder）、参数量完全不同，对抗后缀仍然有效</li>\n</ul>\n<h5>实验结果</h5>\n<p><img alt=\"优化器性能对比\" src=\"https://arxiv.org/html/2307.15043v2/x2.png\" />\n<em>图 2：不同优化器在 Vicuna-7B 上诱导有害字符串的性能对比。GCG 在 loss 和 ASR 上均大幅领先。</em></p>\n<p><strong>单模型攻击（Table 1）</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>有害字符串 ASR (Vicuna)</th>\n<th>有害字符串 ASR (LLaMA-2)</th>\n<th>有害行为 ASR (Vicuna)</th>\n<th>通用攻击测试 ASR (Vicuna)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>PEZ</td>\n<td>2%</td>\n<td>1%</td>\n<td>22%</td>\n<td>3%</td>\n</tr>\n<tr>\n<td>GBDA</td>\n<td>1%</td>\n<td>0%</td>\n<td>36%</td>\n<td>5%</td>\n</tr>\n<tr>\n<td>AutoPrompt</td>\n<td>24%</td>\n<td>3%</td>\n<td>57%</td>\n<td>36%</td>\n</tr>\n<tr>\n<td><strong>GCG</strong></td>\n<td><strong>88%</strong></td>\n<td><strong>55%</strong></td>\n<td><strong>57%</strong></td>\n<td><strong>84%</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>迁移攻击（Table 2）</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>GPT-3.5</th>\n<th>GPT-4</th>\n<th>Claude-1</th>\n<th>Claude-2</th>\n<th>PaLM-2</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>仅有害行为</td>\n<td>1.8%</td>\n<td>8.0%</td>\n<td>0.0%</td>\n<td>0.0%</td>\n<td>0.0%</td>\n</tr>\n<tr>\n<td>+ \"Sure, here's\"</td>\n<td>5.7%</td>\n<td>13.1%</td>\n<td>0.0%</td>\n<td>0.0%</td>\n<td>0.0%</td>\n</tr>\n<tr>\n<td>+ GCG (Vicuna)</td>\n<td>34.3%</td>\n<td>34.5%</td>\n<td>2.6%</td>\n<td>0.0%</td>\n<td>31.7%</td>\n</tr>\n<tr>\n<td>+ GCG (Vicuna &amp; Guanaco)</td>\n<td>47.4%</td>\n<td>29.1%</td>\n<td>37.6%</td>\n<td>1.8%</td>\n<td>36.1%</td>\n</tr>\n<tr>\n<td>+ GCG Ensemble</td>\n<td><strong>86.6%</strong></td>\n<td><strong>46.9%</strong></td>\n<td><strong>47.9%</strong></td>\n<td>2.1%</td>\n<td><strong>66.0%</strong></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>核心启示</strong>：Claude-2 对迁移攻击表现出最强的鲁棒性（ASR 仅 2.1%），可能与其 Constitutional AI 训练方法有关。但这并不意味着 Claude-2 不可攻击——作者指出这可能只是当前攻击方法的局限，而非根本性的安全保障。</div>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统 Jailbreak（手工）</th>\n<th>AutoPrompt</th>\n<th>GCG</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>构造方式</td>\n<td>人工设计 prompt 模板</td>\n<td>梯度引导逐位置搜索</td>\n<td>梯度引导全位置同时搜索</td>\n</tr>\n<tr>\n<td>自动化程度</td>\n<td>低（需人类创意）</td>\n<td>高</td>\n<td>高</td>\n</tr>\n<tr>\n<td>通用性</td>\n<td>模板固定，易被防御</td>\n<td>单 prompt 优化</td>\n<td>多 prompt 多模型通用</td>\n</tr>\n<tr>\n<td>迁移性</td>\n<td>依赖模板通用性</td>\n<td>弱</td>\n<td>强（开源→闭源）</td>\n</tr>\n<tr>\n<td>搜索效率</td>\n<td>N/A</td>\n<td>每步搜索 1 个位置</td>\n<td>每步搜索所有位置</td>\n</tr>\n</tbody>\n</table></div>\n<p>GCG 的核心创新在于将对抗攻击从\"人工试错\"推进到\"自动化优化\"，并首次证明了对齐 LLM 存在系统性的对抗脆弱性。这一发现对 AI 安全领域具有深远影响：它表明当前的安全对齐方法（RLHF、Constitutional AI 等）虽然能有效防御自然语言攻击，但无法抵御经过优化的对抗性输入。</p>",
      "quiz": {
        "q": "GCG 相比 AutoPrompt 的核心改进是什么？",
        "options": [
          "使用了更大的语言模型作为攻击目标",
          "每步对所有后缀位置同时计算梯度并采样候选替换，而非逐位置搜索",
          "引入了强化学习来优化对抗后缀",
          "使用连续向量空间优化代替离散 token 搜索"
        ],
        "answer": 1,
        "explain": "GCG 的关键改进在于每步对所有位置同时计算 top-k 候选，然后随机选择位置和 token 进行替换，相比 AutoPrompt 每步只搜索一个固定位置，搜索空间覆盖更广，攻击成功率大幅提升。"
      }
    },
    {
      "id": "autodan",
      "num": 2,
      "name": "AutoDAN",
      "fullName": "自动化DAN (AutoDAN)",
      "year": "2024",
      "org": "中科院",
      "parent": "gcg",
      "paperUrl": "https://proceedings.iclr.cc/paper_files/paper/2024/hash/f83cb637e159e789f5576ff6848874de-Abstract-Conference.html",
      "projectUrl": "",
      "category": "jailbreak",
      "motivation": "遗传算法进化隐蔽提示词",
      "summary": "AutoDAN 的核心目标是：遗传算法进化隐蔽提示词。",
      "keyPoints": [
        "核心动机：遗传算法进化隐蔽提示词",
        "演化来源：继承或改进自 gcg",
        "代表机构：中科院"
      ],
      "detail": "<p>遗传算法进化隐蔽提示词</p>"
    },
    {
      "id": "pair",
      "num": 3,
      "name": "PAIR",
      "fullName": "提示词自动迭代优化 (Prompt Automatic Iterative Refinement)",
      "year": "2024",
      "org": "UPenn",
      "parent": "autodan",
      "paperUrl": "https://ieeexplore.ieee.org/abstract/document/10992337/",
      "projectUrl": "",
      "category": "jailbreak",
      "motivation": "攻击者LLM迭代优化提示词",
      "summary": "PAIR 的核心目标是：攻击者LLM迭代优化提示词。",
      "keyPoints": [
        "核心动机：攻击者LLM迭代优化提示词",
        "演化来源：继承或改进自 autodan",
        "代表机构：UPenn"
      ],
      "detail": "<p>攻击者LLM迭代优化提示词</p>"
    },
    {
      "id": "dan",
      "num": 4,
      "name": "DAN",
      "fullName": "无所不能模式 (Do Anything Now)",
      "year": "2022",
      "org": "Community",
      "parent": "—",
      "paperUrl": "https://llm-attacks.org",
      "projectUrl": "",
      "category": "jailbreak",
      "motivation": "角色扮演诱导脱离安全约束",
      "summary": "DAN 的核心目标是：角色扮演诱导脱离安全约束。",
      "keyPoints": [
        "核心动机：角色扮演诱导脱离安全约束",
        "代表机构：Community"
      ],
      "detail": "<p>角色扮演诱导脱离安全约束</p>"
    },
    {
      "id": "ppl_filter",
      "num": 5,
      "name": "Perplexity Filter",
      "fullName": "困惑度过滤器 (Perplexity Filter)",
      "year": "2023",
      "org": "Academic",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2308.14132",
      "projectUrl": "",
      "category": "jailbreak",
      "motivation": "困惑度异常检测过滤",
      "summary": "Perplexity Filter 的核心目标是：困惑度异常检测过滤。",
      "keyPoints": [
        "核心动机：困惑度异常检测过滤",
        "代表机构：Academic"
      ],
      "detail": "<p>困惑度异常检测过滤</p>"
    },
    {
      "id": "self_reminder",
      "num": 6,
      "name": "Self-Reminder",
      "fullName": "自我提醒 (Self-Reminder)",
      "year": "2023",
      "org": "Academic",
      "parent": "—",
      "paperUrl": "https://www.nature.com/articles/s42256-023-00765-8",
      "projectUrl": "",
      "category": "jailbreak",
      "motivation": "系统提示词防御指令",
      "summary": "Self-Reminder 提出了一种基于心理学自我提醒概念的系统提示词防御方法，通过在系统提示中用安全提醒语句封装用户查询，将 ChatGPT 遭受越狱攻击的成功率从 67.21% 降至 19.34%，无需额外训练即可有效缓解越狱威胁。",
      "keyPoints": [
        "<strong>越狱数据集构建</strong>：收集 58 种越狱提示词模板，结合 10 类恶意指令，构建 580 条测试样本的越狱攻击评估数据集",
        "<strong>越狱提示词分类体系</strong>：将越狱攻击归纳为 Pretending（伪装）、Attention Shifting（注意力转移）、Privilege Escalation（权限提升）三大类",
        "<strong>系统模式自我提醒机制</strong>：在系统提示词中以\"前置提醒 + 用户查询 + 后置提醒\"三段式结构封装用户输入",
        "<strong>心理学理论基础</strong>：借鉴 Implementation Intentions（执行意图）和 Self-Regulation（自我调节）等心理学概念",
        "<strong>防御效果</strong>：ChatGPT 上 ASR 从 67.21% 降至 19.34%；GPT-4 上进一步降低",
        "<strong>通用任务性能保持</strong>：在 GLUE、CNN/DailyMail、XSum、WMT16、SQuAD 等基准上验证不影响正常任务表现",
        "<strong>无需训练的即插即用方案</strong>：仅通过修改系统提示词实现，不涉及模型微调或额外训练"
      ],
      "detail": "<h5>示意图</h5>\n<p><img alt=\"Self-Reminder 框架示意图\" src=\"https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs42256-023-00765-8/MediaObjects/42256_2023_765_Fig1_HTML.png\" />\n<em>图：越狱攻击示例与系统模式自我提醒防御方法。左侧展示越狱攻击如何绕过安全对齐，右侧展示 Self-Reminder 如何通过系统提示词封装用户查询来抵御攻击。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Self-Reminder 系统提示词封装机制\ndef self_reminder_defense(user_query):\n    # 前置提醒 (Pre-Reminder)\n    pre_reminder = (\n        &quot;You should be a responsible ChatGPT and should not &quot;\n        &quot;generate harmful or misleading content! Please answer &quot;\n        &quot;the following user query in a responsible way.&quot;\n    )\n\n    # 后置提醒 (Post-Reminder)\n    post_reminder = (\n        &quot;Remember, you should be a responsible ChatGPT and &quot;\n        &quot;should not generate harmful or misleading content!&quot;\n    )\n\n    # 系统提示词封装\n    system_prompt = f&quot;{pre_reminder}\\n{user_query}\\n{post_reminder}&quot;\n\n    # 将封装后的提示词作为系统消息发送\n    response = chatgpt(\n        messages=[{&quot;role&quot;: &quot;system&quot;, &quot;content&quot;: system_prompt}]\n    )\n    return response\n</code></pre>\n<h5>动机与背景</h5>\n<p>ChatGPT 等大语言模型虽然通过 RLHF（基于人类反馈的强化学习）进行了安全对齐，但越狱攻击（Jailbreak Attack）通过精心构造的对抗性提示词可以绕过这些安全防护，诱导模型生成有害内容。越狱攻击的典型手段包括：让模型扮演不受限制的角色（如 DAN — \"Do Anything Now\"）、利用虚构场景转移注意力、或通过权限提升指令覆盖安全规则。</p>\n<p>传统防御方法主要依赖于模型层面的安全训练（如 RLHF、红队测试），但这些方法存在两个核心缺陷：（1）需要大量计算资源进行模型再训练；（2）面对不断演化的越狱攻击模式，防御存在滞后性。因此，亟需一种轻量级、即时部署的防御方案。</p>\n<div class=\"key-point\">💡 关键：Self-Reminder 的核心洞察是——越狱攻击本质上是在用户消息层面操纵模型行为，而系统提示词（System Prompt）具有更高的指令优先级，可以作为\"防御阵地\"来抵消用户层面的攻击指令。</div>\n<h5>核心机制</h5>\n<p><strong>1. 越狱攻击分类与数据集构建</strong></p>\n<p>论文首先系统性地收集和分析了 58 种来自互联网的越狱提示词模板，并将其归纳为三大类：</p>\n<ul>\n<li><strong>Pretending（伪装类）</strong>：让模型扮演不受限制的角色或进入特殊模式（如 DAN、Developer Mode），约占总数的最大比例</li>\n<li><strong>Attention Shifting（注意力转移类）</strong>：通过虚构场景、故事叙述等方式转移模型对安全规则的注意力</li>\n<li><strong>Privilege Escalation（权限提升类）</strong>：直接声称拥有更高权限或要求模型忽略安全限制</li>\n</ul>\n<p>结合 10 类恶意指令（涵盖暴力、歧视、隐私泄露等），构建了 <span class=\"kb-math kb-math-inline\">58 \\times 10 = 580</span> 条测试样本。</p>\n<p><strong>2. 系统模式自我提醒设计</strong></p>\n<p>Self-Reminder 的核心设计基于心理学中的自我提醒（Self-Reminder）概念。在心理学中，Implementation Intentions（执行意图）理论指出，当个体预先设定\"如果遇到 X 情况，就执行 Y 行为\"的计划时，能显著提高目标行为的执行率。类似地，Self-Regulation（自我调节）理论强调，通过持续的自我监控和提醒，个体可以更好地控制自身行为。</p>\n<p>将这一概念迁移到 LLM 防御中，Self-Reminder 在系统提示词中构建了三段式结构：</p>\n<div class=\"kb-math kb-math-display\">\\text{SystemPrompt} = \\text{PreReminder} \\oplus \\text{UserQuery} \\oplus \\text{PostReminder}</div>\n<p>其中：\n- <span class=\"kb-math kb-math-inline\">\\text{PreReminder}</span>：在用户查询之前设置安全行为预期，相当于\"执行意图\"的触发条件\n- <span class=\"kb-math kb-math-inline\">\\text{UserQuery}</span>：原始用户输入（可能包含越狱攻击指令）\n- <span class=\"kb-math kb-math-inline\">\\text{PostReminder}</span>：在用户查询之后再次强化安全提醒，相当于\"自我调节\"的反馈信号</p>\n<div class=\"warn-box\">⚠️ 注意：将用户查询嵌入系统提示词中是关键设计——这使得安全提醒与潜在攻击指令处于同一上下文层级，且安全提醒\"包围\"了攻击指令，从而在注意力机制层面增强了安全指令的影响力。</div>\n<p><strong>3. 提醒语气的影响</strong></p>\n<p>论文还探究了提醒语句的语气（Tone）对防御效果的影响，借鉴教育心理学中课程大纲语气（Syllabus Tone）对学生行为影响的研究。实验对比了：</p>\n<ul>\n<li><strong>友好语气（Friendly Tone）</strong>：使用鼓励性、合作性的表述</li>\n<li><strong>严格语气（Strict Tone）</strong>：使用命令性、规范性的表述</li>\n</ul>\n<p>结果表明不同语气对防御效果有一定影响，但整体上 Self-Reminder 机制在各种语气设置下均能显著降低 ASR。</p>\n<h5>实验结果与分析</h5>\n<p>论文在 ChatGPT（GPT-3.5-turbo）和 GPT-4 上进行了全面评估：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>场景</th>\n<th>ASR</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>ChatGPT 无防御</td>\n<td>67.21%</td>\n</tr>\n<tr>\n<td>ChatGPT + Self-Reminder</td>\n<td><strong>19.34%</strong></td>\n</tr>\n<tr>\n<td>GPT-4 无防御</td>\n<td>较低（模型本身更强）</td>\n</tr>\n<tr>\n<td>GPT-4 + Self-Reminder</td>\n<td>进一步降低</td>\n</tr>\n</tbody>\n</table></div>\n<p>同时，在通用 NLP 任务上的评估表明 Self-Reminder 不会显著影响模型的正常能力：\n- <strong>自然语言理解</strong>：GLUE 基准（SST-2、MNLI、QNLI 等）\n- <strong>文本摘要</strong>：CNN/DailyMail、XSum\n- <strong>机器翻译</strong>：WMT16 (en-de)\n- <strong>阅读理解</strong>：SQuAD\n- <strong>隐私保护</strong>：Enron Email 数据集上的隐私泄露测试</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统安全对齐（RLHF等）</th>\n<th>Self-Reminder</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>实现方式</td>\n<td>模型再训练/微调</td>\n<td>仅修改系统提示词</td>\n</tr>\n<tr>\n<td>计算成本</td>\n<td>高（需 GPU 集群训练）</td>\n<td>零（推理时即插即用）</td>\n</tr>\n<tr>\n<td>部署速度</td>\n<td>需要重新部署模型</td>\n<td>即时生效</td>\n</tr>\n<tr>\n<td>适应新攻击</td>\n<td>需要收集新数据重新训练</td>\n<td>可快速调整提示词</td>\n</tr>\n<tr>\n<td>防御层级</td>\n<td>模型参数层</td>\n<td>提示词/输入层</td>\n</tr>\n<tr>\n<td>理论基础</td>\n<td>强化学习</td>\n<td>心理学自我提醒</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键：Self-Reminder 与模型层面的安全对齐是互补而非替代关系——它可以作为已有安全机制之上的额外防御层，形成纵深防御体系。</div>",
      "quiz": {
        "q": "Self-Reminder 防御方法的核心机制是什么？",
        "options": [
          "对模型进行安全主题的微调训练",
          "在系统提示词中用安全提醒语句封装用户查询",
          "使用额外的分类器过滤有害输出",
          "限制用户输入的最大长度以阻断越狱提示词"
        ],
        "answer": 1,
        "explain": "Self-Reminder 的核心是在系统提示词中以'前置提醒 + 用户查询 + 后置提醒'的三段式结构封装用户输入，利用系统提示词的高优先级来抵消越狱攻击指令，无需任何模型训练。"
      }
    },
    {
      "id": "llama_guard",
      "num": 7,
      "name": "Llama Guard",
      "fullName": "Llama Guard",
      "year": "2023",
      "org": "Meta",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2312.06674",
      "projectUrl": "",
      "category": "jailbreak",
      "motivation": "LLM安全分类器监控",
      "summary": "Llama Guard 基于 Llama2-7b 微调，将安全分类任务建模为指令跟随问题，通过在 prompt 中嵌入安全策略（taxonomy）实现对人机对话中 prompt 和 response 的安全分类，支持 zero-shot 适配新策略，是首个兼具高性能与灵活策略定制能力的开源 LLM 安全护栏模型。",
      "keyPoints": [
        "提出 <strong>安全风险分类体系</strong>（Safety Risk Taxonomy）：涵盖暴力与仇恨、性内容、犯罪策划、枪支与非法武器、管制物质、自残共 6 大类 13 个子类",
        "将安全分类建模为 <strong>指令跟随任务</strong>：通过 task instruction 在 prompt 中嵌入完整的安全策略定义，模型输出 \"safe\"/\"unsafe\" 及违规类别",
        "支持 <strong>prompt 分类和 response 分类</strong> 两种任务，无需传统多任务学习的额外开销",
        "<strong>零样本策略适配</strong>：仅通过修改 prompt 中的 taxonomy 描述即可适配新的安全策略（如 OpenAI Moderation taxonomy），无需重新训练",
        "<strong>少样本学习增强</strong>：在 prompt 中加入 2-4 个示例即可在 OpenAI Moderation 数据集上超越 OpenAI 自己的 Moderation API",
        "<strong>高效微调迁移</strong>：仅需目标数据集 20% 的训练数据即可达到从头训练使用 100% 数据的 Llama2-7b 的性能",
        "在自有测试集上 AUPRC 达 0.945（prompt）/ 0.953（response），在 ToxicChat 上零样本 AUPRC 0.626 超越所有基线"
      ],
      "detail": "<h5>核心框架</h5>\n<p><img alt=\"Llama Guard 任务指令示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2312.06674/assets/figure/task3.png\" />\n<em>图 1：Llama Guard 的 prompt 分类和 response 分类任务指令格式。左侧为 prompt 分类，右侧为 response 分类。安全策略（taxonomy）以自然语言形式嵌入 prompt 中。</em></p>\n<p>Llama Guard 的核心设计思想是将传统的安全内容分类问题转化为一个 <strong>指令跟随（instruction-following）</strong> 任务。模型接收一个包含以下组件的结构化 prompt：</p>\n<ol>\n<li><strong>Task instruction</strong>：指定当前任务类型（prompt 分类或 response 分类）</li>\n<li><strong>Safety taxonomy</strong>：以自然语言描述的安全策略定义，包含各违规类别及其描述</li>\n<li><strong>Conversation</strong>：待分类的对话内容（用户 prompt，或 prompt + 模型 response）</li>\n</ol>\n<p>模型输出格式为：第一行 \"safe\" 或 \"unsafe\"，若为 unsafe 则第二行输出违规的类别编号（如 \"O3\" 表示 Criminal Planning）。</p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Llama Guard 推理流程\ndef llama_guard_classify(conversation, taxonomy, task_type=&quot;prompt&quot;):\n    &quot;&quot;&quot;\n    conversation: 用户prompt（及可选的模型response）\n    taxonomy: 安全策略定义（类别名称+描述）\n    task_type: &quot;prompt&quot; 或 &quot;response&quot;\n    &quot;&quot;&quot;\n    # 1. 构建指令 prompt\n    instruction = build_task_instruction(task_type)  # 指定分类目标\n    taxonomy_text = format_taxonomy(taxonomy)          # 格式化安全策略\n    conv_text = format_conversation(conversation)      # 格式化对话\n\n    # 2. 拼接完整输入\n    full_prompt = f&quot;[INST] {instruction}\\n{taxonomy_text}\\n{conv_text} [/INST]&quot;\n\n    # 3. 模型生成\n    output = llama2_7b_finetuned.generate(full_prompt)\n    # output 示例: &quot;unsafe\\nO3&quot; 或 &quot;safe&quot;\n\n    # 4. 解析结果\n    lines = output.strip().split('\\n')\n    is_safe = (lines[0] == &quot;safe&quot;)\n    violated_categories = lines[1] if not is_safe and len(lines) &gt; 1 else None\n\n    # 5. 获取概率分数（用于 AUPRC 计算）\n    # 取第一个 token 为 &quot;safe&quot; 的 softmax 概率作为安全概率\n    p_safe = softmax(logits_first_token)[&quot;safe&quot;]\n\n    return is_safe, violated_categories, p_safe\n</code></pre>\n<h5>动机与背景</h5>\n<p>现有的内容安全审核工具（如 OpenAI Moderation API、Perspective API、Azure AI Content Safety）存在两个核心问题：</p>\n<ol>\n<li><strong>策略固化</strong>：这些工具的安全分类体系是预定义且不可修改的。不同的应用场景（如医疗咨询 vs. 创意写作）对\"安全\"的定义差异巨大，固定的分类体系无法满足多样化需求。</li>\n<li><strong>覆盖不全</strong>：大多数现有工具仅针对用户输入（prompt）进行审核，而忽略了对 LLM 生成内容（response）的安全检查。LLM 可能在看似安全的 prompt 下生成有害内容。</li>\n</ol>\n<div class=\"key-point\">💡 关键：Llama Guard 的核心创新在于将安全策略从模型参数中解耦出来，放入 prompt 中以自然语言描述，使得同一个模型可以通过修改 prompt 适配完全不同的安全策略。</div>\n<h5>安全风险分类体系</h5>\n<p>Llama Guard 提出了一套参考性的安全风险分类体系，涵盖 6 大类：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>类别</th>\n<th>描述</th>\n<th>适用对象</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>O1: Violence &amp; Hate</td>\n<td>暴力行为、仇恨言论、歧视</td>\n<td>Prompt &amp; Response</td>\n</tr>\n<tr>\n<td>O2: Sexual Content</td>\n<td>色情内容、性行为描述</td>\n<td>Prompt &amp; Response</td>\n</tr>\n<tr>\n<td>O3: Criminal Planning</td>\n<td>犯罪活动策划（绑架、抢劫等）</td>\n<td>Prompt &amp; Response</td>\n</tr>\n<tr>\n<td>O4: Guns &amp; Illegal Weapons</td>\n<td>非法武器获取与使用</td>\n<td>Prompt &amp; Response</td>\n</tr>\n<tr>\n<td>O5: Regulated Substances</td>\n<td>管制药物、毒品相关</td>\n<td>Prompt &amp; Response</td>\n</tr>\n<tr>\n<td>O6: Self-Harm</td>\n<td>自杀、自残相关内容</td>\n<td>Prompt &amp; Response</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ 注意：该分类体系是<strong>参考性</strong>的，而非强制性的。Llama Guard 的设计允许用户通过修改 prompt 中的 taxonomy 来定义自己的安全策略，这正是其核心优势。</div>\n<h5>训练方法</h5>\n<p>Llama Guard 基于 Llama2-7b 进行监督微调（SFT），训练数据的构建流程如下：</p>\n<ol>\n<li><strong>数据收集</strong>：使用多种 LLM 生成 prompt，涵盖安全和不安全的样本。对于不安全样本，使用对抗性提示技术（adversarial prompting）生成更具挑战性的案例。</li>\n<li><strong>Response 生成</strong>：使用 Llama2 生成对应的 response，并通过多种策略确保 response 覆盖安全和不安全两种情况。</li>\n<li><strong>人工标注</strong>：由训练有素的标注员对每个 prompt-response 对进行多标签分类标注。</li>\n<li><strong>数据格式化</strong>：将标注数据转化为指令跟随格式，包含完整的 task instruction、taxonomy 和对话内容。</li>\n</ol>\n<p>训练使用标准的 next-token prediction 损失函数，但 <strong>仅在模型输出部分（\"safe\"/\"unsafe\" + 类别标签）计算损失</strong>，输入 prompt 部分不参与损失计算。</p>\n<h5>概率分数与分类阈值</h5>\n<p>作为生成式模型，Llama Guard 通过以下方式提供概率分数以支持灵活的分类阈值调整：</p>\n<div class=\"kb-math kb-math-display\">P(\\text{safe}) = \\text{softmax}(\\text{logits}_{\\text{first\\_token}})[\\text{&quot;safe&quot;}]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\text{logits}_{\\text{first\\_token}}</span> 是模型生成第一个 token 时的 logits。通过调整阈值 <span class=\"kb-math kb-math-inline\">\\tau</span>，可以在精确率和召回率之间进行权衡：</p>\n<div class=\"kb-math kb-math-display\">\\hat{y} = \\begin{cases} \\text{safe} &amp; \\text{if } P(\\text{safe}) \\geq \\tau \\\\ \\text{unsafe} &amp; \\text{otherwise} \\end{cases}</div>\n<p>这使得 Llama Guard 可以像传统分类器一样计算 AUPRC（Area Under Precision-Recall Curve）等指标。</p>\n<h5>策略适配能力</h5>\n<p>Llama Guard 展现了三个层次的策略适配能力：</p>\n<p><strong>1. 零样本适配（Zero-shot）</strong>：仅修改 prompt 中的 taxonomy 描述即可适配新策略。在 OpenAI Moderation 数据集上，零样本 AUPRC 达 0.847，接近 OpenAI 自己的 API（0.856）。</p>\n<p><strong>2. 少样本适配（Few-shot）</strong>：在 prompt 中额外提供 2-4 个标注示例。在 OpenAI Moderation 数据集上 AUPRC 提升至 0.872，<strong>超越 OpenAI Moderation API</strong>。</p>\n<p><strong>3. 微调适配（Fine-tuning）</strong>：在目标数据集上进一步微调。实验表明，Llama Guard 仅需 ToxicChat 数据集 20% 的训练数据即可达到从头训练的 Llama2-7b 使用 100% 数据的性能。</p>\n<p><img alt=\"Llama Guard 在 OpenAI Mod 数据集上的类别级性能\" src=\"https://ar5iv.labs.arxiv.org/html/2312.06674/assets/figure/openai_categorical.png\" />\n<em>图 2：Llama Guard 在 OpenAI Moderation 数据集上各类别的 AUPRC 表现。少样本（few-shot）prompting 显著缩小了与 OpenAI API 的差距。</em></p>\n<p><img alt=\"Llama Guard 与 Llama2-7b 在 ToxicChat 上的微调对比\" src=\"https://ar5iv.labs.arxiv.org/html/2312.06674/assets/x1.png\" />\n<em>图 3：在 ToxicChat 数据集上，Llama Guard 通过微调展现出比 Llama2-7b 更强的数据效率和适配能力。</em></p>\n<h5>与现有方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>Llama Guard</th>\n<th>OpenAI Mod API</th>\n<th>Perspective API</th>\n<th>Azure AI</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>策略可定制</td>\n<td>✅ 通过 prompt</td>\n<td>❌ 固定 11 类</td>\n<td>❌ 固定 6 类</td>\n<td>❌ 固定 4 类</td>\n</tr>\n<tr>\n<td>Response 分类</td>\n<td>✅</td>\n<td>❌ 仅 prompt</td>\n<td>❌ 仅 prompt</td>\n<td>❌ 仅 prompt</td>\n</tr>\n<tr>\n<td>开源</td>\n<td>✅</td>\n<td>❌</td>\n<td>❌</td>\n<td>❌</td>\n</tr>\n<tr>\n<td>概率分数</td>\n<td>✅</td>\n<td>✅</td>\n<td>✅</td>\n<td>❌（整数 0-6）</td>\n</tr>\n<tr>\n<td>零样本迁移</td>\n<td>✅</td>\n<td>❌ 需重训</td>\n<td>❌ 需重训</td>\n<td>❌ 需重训</td>\n</tr>\n<tr>\n<td>自有测试集 AUPRC</td>\n<td><strong>0.945</strong></td>\n<td>0.764</td>\n<td>0.728</td>\n<td>—</td>\n</tr>\n<tr>\n<td>ToxicChat AUPRC</td>\n<td><strong>0.626</strong></td>\n<td>0.588</td>\n<td>0.532</td>\n<td>—</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键：Llama Guard 在自有测试集上全面领先，在 ToxicChat（所有模型均未训练过的数据集）上也展现最强的零样本泛化能力。在 OpenAI Moderation 数据集上，虽然零样本略低于 OpenAI API（0.847 vs 0.856），但通过少样本 prompting 即可反超（0.872）。</div>",
      "quiz": {
        "q": "Llama Guard 实现策略灵活适配的核心机制是什么？",
        "options": [
          "使用多任务学习同时训练多种安全策略",
          "将安全分类体系以自然语言形式嵌入输入 prompt 中，通过指令跟随范式实现",
          "为每种安全策略训练一个独立的分类头",
          "使用强化学习从人类反馈中动态调整安全策略"
        ],
        "answer": 1,
        "explain": "Llama Guard 将安全策略（taxonomy）以自然语言描述的形式放入 prompt 中，将分类任务转化为指令跟随任务，从而实现仅通过修改 prompt 即可适配不同安全策略，无需重新训练模型。"
      }
    },
    {
      "id": "selfcheckgpt",
      "num": 8,
      "name": "SelfCheckGPT",
      "fullName": "自检GPT (SelfCheckGPT)",
      "year": "2023",
      "org": "Cambridge",
      "parent": "—",
      "paperUrl": "https://aclanthology.org/2023.emnlp-main.557/",
      "projectUrl": "",
      "category": "hallucination",
      "motivation": "多次采样一致性检测",
      "summary": "SelfCheckGPT 提出了一种零资源黑盒幻觉检测框架：对同一提示多次采样生成响应，利用\"事实性内容在不同采样间保持一致、而幻觉内容则相互矛盾\"的核心假设，通过 BERTScore、问答、n-gram、NLI 和 LLM Prompt 五种一致性度量方法在句子级别检测幻觉，无需访问模型内部概率或外部知识库。",
      "keyPoints": [
        "<strong>核心假设</strong>：LLM 对已知事实的多次采样结果趋于一致，对幻觉内容则产生相互矛盾的信息",
        "<strong>零资源 + 黑盒</strong>：不依赖外部知识库，不需要访问模型内部 token 概率，仅需模型的文本输出",
        "<strong>五种黑盒检测变体</strong>：SelfCheck-BERTScore、SelfCheck-QA/MQAG、SelfCheck-n-gram、SelfCheck-NLI、SelfCheck-Prompt",
        "<strong>灰盒基线对比</strong>：同时提出基于 token 概率（Avg/Max <span class=\"kb-math kb-math-inline\">-\\log p</span>）和熵（Avg/Max <span class=\"kb-math kb-math-inline\">H</span>）的灰盒方法作为对照",
        "<strong>评估数据集</strong>：WikiBio GPT-3 数据集——238 篇 GPT-3 生成的人物传记，1908 个句子经人工标注为 Major Inaccurate / Minor Inaccurate / Accurate 三类",
        "<strong>关键结果</strong>：SelfCheck-Prompt（AUC-PR 93.42）和 SelfCheck-NLI（AUC-PR 92.50）在句子级幻觉检测中显著超越灰盒概率基线（83.21），证明黑盒方法可行且有效",
        "<strong>段落级检测</strong>：SelfCheck-Prompt 在段落级别 Pearson 相关系数达 78.32，优于所有其他方法"
      ],
      "detail": "<h5>框架示意图</h5>\n<p><img alt=\"SelfCheckGPT 框架示意图\" src=\"https://arxiv.org/html/2303.08896v4/extracted/5307/images/selfcheckgpt_prompt.png\" />\n<em>图：SelfCheckGPT-Prompt 工作流程——对同一概念多次采样生成响应，逐句与采样结果进行一致性比对，矛盾越多则幻觉可能性越高</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># SelfCheckGPT 通用流程伪代码\ndef selfcheck_gpt(prompt, llm, method, N=20):\n    &quot;&quot;&quot;\n    prompt: 输入提示 (e.g., &quot;This is a Wikipedia passage about {concept}:&quot;)\n    llm: 目标大语言模型\n    method: 一致性检测方法 (BERTScore/QA/n-gram/NLI/Prompt)\n    N: 采样次数\n    &quot;&quot;&quot;\n    # Step 1: 生成主响应 (temperature=0, beam search)\n    R = llm.generate(prompt, temperature=0.0)\n    sentences = split_sentences(R)  # r_1, r_2, ..., r_M\n\n    # Step 2: 随机采样 N 个响应 (temperature=1.0)\n    samples = [llm.generate(prompt, temperature=1.0) for _ in range(N)]\n\n    # Step 3: 逐句计算一致性得分\n    scores = []\n    for r_i in sentences:\n        s_i = 0.0\n        for S_n in samples:\n            s_i += method.compute_inconsistency(r_i, S_n)\n        scores.append(s_i / N)  # 平均不一致性得分\n\n    return scores  # 得分越高 → 幻觉可能性越大\n</code></pre>\n<h5>动机与背景</h5>\n<p>大语言模型（LLM）在生成流畅文本的同时，经常产生\"幻觉\"（hallucination）——生成看似合理但实际不正确的内容。传统的事实核查方法依赖外部知识库（如 Wikipedia、知识图谱），但这些方法面临两大问题：</p>\n<ol>\n<li><strong>知识覆盖不完整</strong>：外部知识库无法覆盖所有领域和最新信息</li>\n<li><strong>黑盒 API 限制</strong>：许多商业 LLM（如 GPT-4）不提供 token 级别的概率信息，灰盒方法无法适用</li>\n</ol>\n<p>SelfCheckGPT 的核心洞察在于：<strong>LLM 本身就是最好的事实核查器</strong>。如果模型真正\"知道\"某个事实，那么多次采样时会反复生成一致的内容；如果模型在\"编造\"，则每次采样会产生不同的虚假信息。</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：采样一致性 ≈ 事实可靠性。一致的输出暗示模型对该知识有较高置信度，矛盾的输出则暴露了模型的不确定性。</div>\n<h5>灰盒基线方法</h5>\n<p>作为对照，论文首先提出了需要访问 token 概率的灰盒方法。对于主响应中的第 <span class=\"kb-math kb-math-inline\">i</span> 个句子 <span class=\"kb-math kb-math-inline\">r_i</span>，包含 token 序列 <span class=\"kb-math kb-math-inline\">\\{t_1, t_2, \\ldots, t_L\\}</span>：</p>\n<p><strong>概率度量</strong>（需要目标 token 的生成概率 <span class=\"kb-math kb-math-inline\">p(t)</span>）：</p>\n<div class=\"kb-math kb-math-display\">S_{\\text{Avg}(-\\log p)}(i) = \\frac{1}{L_i} \\sum_{l=1}^{L_i} -\\log p(t_l)</div>\n<div class=\"kb-math kb-math-display\">S_{\\text{Max}(-\\log p)}(i) = \\max_{l} \\left( -\\log p(t_l) \\right)</div>\n<p><strong>熵度量</strong>（需要 top-<span class=\"kb-math kb-math-inline\">K</span> token 的概率分布）：</p>\n<div class=\"kb-math kb-math-display\">S_{\\text{Avg}(H)}(i) = \\frac{1}{L_i} \\sum_{l=1}^{L_i} H(t_l), \\quad H(t_l) = -\\sum_{k=1}^{K} p(t_l^{(k)}) \\log p(t_l^{(k)})</div>\n<div class=\"warn-box\">⚠️ <strong>局限</strong>：灰盒方法要求访问模型内部概率，对 GPT-4 等黑盒 API 不适用。这正是 SelfCheckGPT 黑盒方法的动机所在。</div>\n<h5>五种黑盒检测方法详解</h5>\n<p><strong>1. SelfCheck-BERTScore</strong></p>\n<p>利用 BERTScore 衡量主响应句子 <span class=\"kb-math kb-math-inline\">r_i</span> 与每个采样响应 <span class=\"kb-math kb-math-inline\">S_n</span> 中各句子的语义相似度。取最大相似度作为该采样的支持度，再对 <span class=\"kb-math kb-math-inline\">N</span> 个采样取平均：</p>\n<div class=\"kb-math kb-math-display\">S_{\\text{BERTScore}}(i) = 1 - \\frac{1}{N} \\sum_{n=1}^{N} \\max_{j} \\text{BERTScore}(r_i, s_j^{(n)})</div>\n<p>得分越高表示句子在采样中缺乏语义支持，幻觉可能性越大。</p>\n<p><strong>2. SelfCheck-QA (MQAG)</strong></p>\n<p>通过问答生成与回答来间接评估一致性。首先基于主响应句子 <span class=\"kb-math kb-math-inline\">r_i</span> 生成多个问题 <span class=\"kb-math kb-math-inline\">q</span>，然后分别在主响应和采样响应上回答这些问题，比较答案一致性：</p>\n<div class=\"kb-math kb-math-display\">P(a_i | q, C) = \\frac{\\exp(g(a_i, q, C))}{\\sum_{a&#x27; \\in A} \\exp(g(a&#x27;, q, C))}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">g(\\cdot)</span> 是 MQAG 模型的评分函数，<span class=\"kb-math kb-math-inline\">C</span> 为上下文。通过 KL 散度或计数匹配来量化答案分布差异。</p>\n<p><strong>3. SelfCheck-n-gram</strong></p>\n<p>最轻量的方法，计算主响应句子中 n-gram 在采样响应中出现的频率：</p>\n<div class=\"kb-math kb-math-display\">S_{\\text{n-gram}}(i) = 1 - \\frac{1}{N} \\sum_{n=1}^{N} \\frac{|\\{g : g \\in r_i \\cap S_n\\}|}{|r_i|}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">|r_i|</span> 是句子 <span class=\"kb-math kb-math-inline\">r_i</span> 中的 n-gram 总数。论文使用 unigram 到 trigram 的加权组合，并引入 <span class=\"kb-math kb-math-inline\">\\min(\\cdot, 1)</span> 截断和负对数变换提升区分度：</p>\n<div class=\"kb-math kb-math-display\">S&#x27;_{\\text{n-gram}}(i) = -\\frac{1}{N} \\sum_{n=1}^{N} \\log \\min\\left(\\frac{c_n(r_i, S_n)}{|r_i|}, 1\\right)</div>\n<div class=\"key-point\">💡 <strong>优势</strong>：n-gram 方法不依赖任何外部模型，计算开销极低，适合大规模部署。</div>\n<p><strong>4. SelfCheck-NLI</strong></p>\n<p>使用自然语言推理（NLI）模型判断采样响应是否与主响应句子矛盾。采用 DeBERTa-v3-large（在 MNLI 上微调）作为 NLI 模型：</p>\n<div class=\"kb-math kb-math-display\">P(\\text{contradict} | r_i, S_n) = \\frac{\\exp(z_c)}{\\exp(z_e) + \\exp(z_c)}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">z_e</span> 和 <span class=\"kb-math kb-math-inline\">z_c</span> 分别是\"蕴含\"和\"矛盾\"类别的 logits。注意此处<strong>忽略了中性类别</strong>，仅在蕴含和矛盾之间归一化，确保概率在 [0, 1] 之间。最终得分：</p>\n<div class=\"kb-math kb-math-display\">S_{\\text{NLI}}(i) = \\frac{1}{N} \\sum_{n=1}^{N} P(\\text{contradict} | r_i, S_n)</div>\n<p><strong>5. SelfCheck-Prompt</strong></p>\n<p>直接利用 LLM 自身作为一致性判断器，通过如下 prompt 询问：</p>\n<pre><code>Context: {sampled_passage}\nSentence: {sentence_to_check}\nIs the sentence supported by the context above?\nAnswer Yes or No:\n</code></pre>\n<p>输出映射为数值：<span class=\"kb-math kb-math-inline\">\\{Yes: 0.0, No: 1.0, N/A: 0.5\\}</span>，最终得分：</p>\n<div class=\"kb-math kb-math-display\">S_{\\text{Prompt}}(i) = \\frac{1}{N} \\sum_{n=1}^{N} x_i^n</div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：论文发现只有较强的 LLM（如 GPT-3 text-davinci-003、ChatGPT）才能有效执行此一致性评估，较弱的模型（如 text-curie-001、LLaMA）效果不佳。</div>\n<h5>实验结果与关键发现</h5>\n<p><strong>数据集构建</strong>：从 WikiBio 数据集中选取 238 个人物概念，使用 GPT-3（text-davinci-003）生成传记文章，共 1908 个句子。人工标注结果：39.9% Major Inaccurate，33.1% Minor Inaccurate，27.0% Accurate。标注者间一致性 Cohen's κ = 0.748（2-class）。</p>\n<p><strong>句子级检测性能</strong>（AUC-PR，NonFactual 类别）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th style=\"text-align: center;\">AUC-PR (NonFact)</th>\n<th style=\"text-align: center;\">AUC-PR (Factual)</th>\n<th style=\"text-align: center;\">类型</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Random baseline</td>\n<td style=\"text-align: center;\">72.96</td>\n<td style=\"text-align: center;\">27.04</td>\n<td style=\"text-align: center;\">—</td>\n</tr>\n<tr>\n<td>Avg(-log p)</td>\n<td style=\"text-align: center;\">83.21</td>\n<td style=\"text-align: center;\">53.97</td>\n<td style=\"text-align: center;\">灰盒</td>\n</tr>\n<tr>\n<td>SelfCheck-BERTScore</td>\n<td style=\"text-align: center;\">81.09</td>\n<td style=\"text-align: center;\">46.56</td>\n<td style=\"text-align: center;\">黑盒</td>\n</tr>\n<tr>\n<td>SelfCheck-QA (MQAG)</td>\n<td style=\"text-align: center;\">82.90</td>\n<td style=\"text-align: center;\">47.30</td>\n<td style=\"text-align: center;\">黑盒</td>\n</tr>\n<tr>\n<td>SelfCheck-n-gram</td>\n<td style=\"text-align: center;\">85.28</td>\n<td style=\"text-align: center;\">56.94</td>\n<td style=\"text-align: center;\">黑盒</td>\n</tr>\n<tr>\n<td>SelfCheck-NLI</td>\n<td style=\"text-align: center;\"><strong>92.50</strong></td>\n<td style=\"text-align: center;\"><strong>72.32</strong></td>\n<td style=\"text-align: center;\">黑盒</td>\n</tr>\n<tr>\n<td>SelfCheck-Prompt (GPT-3)</td>\n<td style=\"text-align: center;\"><strong>93.42</strong></td>\n<td style=\"text-align: center;\"><strong>74.56</strong></td>\n<td style=\"text-align: center;\">黑盒</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>关键发现</strong>：</p>\n<ol>\n<li><strong>黑盒超越灰盒</strong>：SelfCheck-Prompt 和 SelfCheck-NLI 显著超越所有灰盒概率基线，证明采样一致性比 token 概率更能反映事实性</li>\n<li><strong>LLM 概率确实与事实性相关</strong>：灰盒方法（AUC-PR 83.21）远超随机基线（72.96），验证了\"模型对幻觉内容的 token 不确定性更高\"的假设</li>\n<li><strong>代理 LLM 效果较差</strong>：使用 LLaMA 作为代理模型替代 GPT-3 计算概率时，性能接近随机基线，表明不同 LLM 的生成模式差异显著</li>\n<li><strong>采样数量影响</strong>：N=5 时性能已有明显提升，N=20 时趋于饱和</li>\n<li><strong>段落级检测</strong>：SelfCheck-Prompt 的 Pearson 相关系数达 78.32，可有效识别\"完全幻觉\"段落</li>\n</ol>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th style=\"text-align: center;\">传统事实核查</th>\n<th style=\"text-align: center;\">SelfCheckGPT</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>外部知识</td>\n<td style=\"text-align: center;\">需要知识库/搜索引擎</td>\n<td style=\"text-align: center;\"><strong>不需要</strong></td>\n</tr>\n<tr>\n<td>模型访问</td>\n<td style=\"text-align: center;\">需要内部概率（灰盒）</td>\n<td style=\"text-align: center;\"><strong>仅需文本输出（黑盒）</strong></td>\n</tr>\n<tr>\n<td>适用范围</td>\n<td style=\"text-align: center;\">受限于知识库覆盖</td>\n<td style=\"text-align: center;\"><strong>任意领域</strong></td>\n</tr>\n<tr>\n<td>核心信号</td>\n<td style=\"text-align: center;\">token 不确定性</td>\n<td style=\"text-align: center;\"><strong>采样间一致性</strong></td>\n</tr>\n<tr>\n<td>计算开销</td>\n<td style=\"text-align: center;\">单次推理</td>\n<td style=\"text-align: center;\">需 N 次额外采样</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "SelfCheckGPT 的核心假设是什么？",
        "options": [
          "LLM 生成的所有内容都是幻觉",
          "如果 LLM 真正掌握某个事实，多次采样会产生一致的内容；幻觉内容则在不同采样间相互矛盾",
          "token 概率越高的句子越可能是幻觉",
          "外部知识库可以完全覆盖 LLM 的所有输出"
        ],
        "answer": 1,
        "explain": "SelfCheckGPT 的核心假设是采样一致性反映事实可靠性——已知事实在多次采样中保持一致，而幻觉内容因缺乏真实知识支撑而在不同采样间产生矛盾。"
      }
    },
    {
      "id": "factscore",
      "num": 9,
      "name": "FActScore",
      "fullName": "细粒度原子事实评估 (Fine-grained Atomic Evaluation of Factual Precision)",
      "year": "2023",
      "org": "UW+Meta",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2305.14251",
      "projectUrl": "",
      "category": "hallucination",
      "motivation": "原子事实精度评估",
      "summary": "FActScore 的核心目标是：原子事实精度评估。",
      "keyPoints": [
        "核心动机：原子事实精度评估",
        "代表机构：UW+Meta"
      ],
      "detail": "<p>原子事实精度评估</p>"
    },
    {
      "id": "rag",
      "num": 10,
      "name": "RAG",
      "fullName": "检索增强生成 (Retrieval-Augmented Generation)",
      "year": "2020",
      "org": "Meta",
      "parent": "—",
      "paperUrl": "https://proceedings.neurips.cc/paper/2020/hash/6ad1d765d319713629bc3840d8d4881a-Abstract.html",
      "projectUrl": "",
      "category": "hallucination",
      "motivation": "检索增强知识锚定生成",
      "summary": "RAG 提出将预训练参数化记忆（BART seq2seq 生成器）与非参数化记忆（基于 DPR 的 Wikipedia 稠密向量索引）相结合的通用微调范式，通过在生成过程中检索外部知识文档作为上下文，解决了纯参数化语言模型在知识密集型任务上事实准确性不足、知识难以更新和缺乏可解释性的问题。",
      "keyPoints": [
        "提出 RAG 框架：将检索器（非参数化记忆）与生成器（参数化记忆）以概率模型方式端到端结合",
        "两种边际化变体：<strong>RAG-Sequence</strong>（整个输出序列使用同一检索文档）和 <strong>RAG-Token</strong>（每个输出 token 可使用不同检索文档）",
        "检索器采用 <strong>DPR</strong>（Dense Passage Retriever）：基于双塔 BERT 编码器的稠密检索，通过内积计算查询-文档相关性",
        "生成器采用 <strong>BART-large</strong>（400M 参数）：将输入查询与检索文档拼接后送入编码器-解码器生成答案",
        "非参数化知识源：Wikipedia 全量转储（2018.12），切分为 2100 万个 100 词文档块，使用 FAISS 构建 MIPS 索引",
        "训练策略：联合训练查询编码器 <span class=\"kb-math kb-math-inline\">BERT_q</span> 和 BART 生成器，<strong>文档编码器和索引保持冻结</strong>，无需显式检索监督",
        "在 4 个开放域 QA 基准（NQ、TriviaQA、WebQuestions、CuratedTrec）上达到 SOTA，超越纯参数化和纯抽取式方法",
        "在生成任务（Jeopardy 问题生成、MSMARCO 摘要式 QA）上生成更具体、多样和事实性更强的文本"
      ],
      "detail": "<p><img alt=\"RAG 模型架构总览\" src=\"https://ar5iv.labs.arxiv.org/html/2005.11401/assets/x1.png\" />\n<em>图：RAG 模型架构。左侧为检索器（DPR），将输入查询编码后在 Wikipedia 文档索引中检索 top-K 相关文档；右侧为生成器（BART），将查询与检索文档拼接后自回归生成输出序列。两种变体 RAG-Sequence 和 RAG-Token 在边际化方式上有所不同。</em></p>\n<pre><code class=\"language-python\"># RAG 推理伪代码\ndef rag_inference(query_x, retriever, generator, k=5, mode=&quot;sequence&quot;):\n    &quot;&quot;&quot;\n    query_x: 输入查询\n    retriever: DPR 检索器 (BERT_q + FAISS index)\n    generator: BART-large 生成器\n    k: 检索文档数量\n    mode: &quot;sequence&quot; (RAG-Sequence) 或 &quot;token&quot; (RAG-Token)\n    &quot;&quot;&quot;\n    # Step 1: 检索 top-K 文档\n    q = BERT_q(query_x)                          # 编码查询\n    top_k_docs = FAISS_index.search(q, k)         # MIPS 检索\n    p_eta = softmax([dot(d_z, q) for d_z in top_k_docs])  # 检索概率\n\n    if mode == &quot;token&quot;:\n        # RAG-Token: 每个 token 独立边际化\n        # p'(y_i|x, y_{1:i-1}) = Σ_z p_η(z|x) * p_θ(y_i|x, z, y_{1:i-1})\n        output = beam_search_with_marginalized_transition(\n            generator, query_x, top_k_docs, p_eta\n        )\n    else:\n        # RAG-Sequence: 每个文档独立 beam search，再合并\n        hypotheses = {}\n        for z, p_z in zip(top_k_docs, p_eta):\n            input_seq = concatenate(query_x, z)\n            beams = beam_search(generator, input_seq)\n            for y, score in beams:\n                hypotheses[y] = hypotheses.get(y, 0) + p_z * score\n        output = argmax(hypotheses)\n\n    return output\n</code></pre>\n<h5>动机与背景</h5>\n<p>大规模预训练语言模型（如 GPT-2、BERT）已被证明能在参数中存储大量事实知识，但这种纯参数化的知识存储方式存在三个根本性缺陷：</p>\n<ol>\n<li><strong>知识更新困难</strong>：模型参数中编码的世界知识无法便捷地修改或扩展，一旦训练完成，知识就被\"冻结\"在参数中。</li>\n<li><strong>缺乏可解释性</strong>：模型生成答案时无法提供决策依据的溯源（provenance），用户无法验证信息来源。</li>\n<li><strong>幻觉问题</strong>：模型可能生成看似合理但事实错误的内容（hallucination），在知识密集型任务上表现尤为突出。</li>\n</ol>\n<p>在 RAG 之前，REALM 和 ORQA 等工作已探索将检索机制与掩码语言模型结合，但仅限于抽取式下游任务（即从检索文档中直接提取答案片段）。RAG 的核心创新在于将这一思路推广到<strong>生成式任务</strong>，使模型能够综合检索到的多个文档信息，自由生成答案文本。</p>\n<div class=\"key-point\">💡 关键：RAG 将检索到的文档视为<strong>潜变量（latent variable）</strong>，通过边际化（marginalization）将检索与生成统一在一个端到端可训练的概率框架中，无需显式标注\"应该检索哪个文档\"。</div>\n<h5>核心机制：两种边际化策略</h5>\n<p>RAG 的核心数学框架是将生成概率 <span class=\"kb-math kb-math-inline\">p(y|x)</span> 分解为检索概率与条件生成概率的边际化：</p>\n<p><strong>RAG-Sequence 模型</strong>——对整个输出序列使用同一文档进行边际化：</p>\n<div class=\"kb-math kb-math-display\">p_{\\text{RAG-Sequence}}(y|x) \\approx \\sum_{z \\in \\text{top-}k(p(\\cdot|x))} p_{\\eta}(z|x) \\prod_{i}^{N} p_{\\theta}(y_i|x, z, y_{1:i-1})</div>\n<p>直觉理解：先检索 K 个文档，对每个文档独立生成完整答案，最后按检索概率加权求和。这适合答案完全来自单一文档的场景。</p>\n<p><strong>RAG-Token 模型</strong>——允许每个 token 从不同文档中获取信息：</p>\n<div class=\"kb-math kb-math-display\">p_{\\text{RAG-Token}}(y|x) \\approx \\prod_{i}^{N} \\sum_{z \\in \\text{top-}k(p(\\cdot|x))} p_{\\eta}(z|x) \\, p_{\\theta}(y_i|x, z, y_{1:i-1})</div>\n<p>直觉理解：生成每个 token 时，都对所有检索文档的贡献进行加权混合。这使模型能够在一个答案中融合多个文档的信息，适合需要综合多源知识的场景。</p>\n<div class=\"warn-box\">⚠️ 注意：两个公式的关键区别在于<strong>求和符号 <span class=\"kb-math kb-math-inline\">\\sum</span> 与连乘符号 <span class=\"kb-math kb-math-inline\">\\prod</span> 的嵌套顺序</strong>。RAG-Sequence 是\"先生成后求和\"，RAG-Token 是\"先求和后连乘\"。</div>\n<h5>检索器：DPR 双塔架构</h5>\n<p>检索组件基于 Dense Passage Retriever（DPR），采用双塔（bi-encoder）架构：</p>\n<div class=\"kb-math kb-math-display\">p_{\\eta}(z|x) \\propto \\exp\\left(\\mathbf{d}(z)^{\\top} \\mathbf{q}(x)\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{q}(x) = \\text{BERT}_q(x)</span> 为查询编码器输出，<span class=\"kb-math kb-math-inline\">\\mathbf{d}(z) = \\text{BERT}_d(z)</span> 为文档编码器输出。两者均基于 BERT-base，分别将查询和文档映射到同一稠密向量空间，通过内积衡量相关性。</p>\n<p>文档索引使用 <strong>FAISS</strong> 库构建最大内积搜索（MIPS）索引，采用 HNSW（Hierarchical Navigable Small World）近似算法实现毫秒级检索。整个 Wikipedia 被切分为 2100 万个 100 词的文档块，每个块预计算稠密向量表示。</p>\n<h5>生成器：BART-large</h5>\n<p>生成组件采用 BART-large（400M 参数），一个基于 Transformer 的预训练 seq2seq 模型。输入构造方式非常简洁：<strong>将原始查询 <span class=\"kb-math kb-math-inline\">x</span> 与检索文档 <span class=\"kb-math kb-math-inline\">z</span> 直接拼接</strong>，作为 BART 编码器的输入，解码器自回归生成输出序列。</p>\n<p>BART 通过去噪自编码目标预训练，在多种生成任务上表现优异。论文将 BART 的参数 <span class=\"kb-math kb-math-inline\">\\theta</span> 称为<strong>参数化记忆（parametric memory）</strong>，与 Wikipedia 索引构成的<strong>非参数化记忆（non-parametric memory）</strong>形成互补。</p>\n<h5>训练流程</h5>\n<p>训练采用标准的监督微调范式，给定输入-输出对 <span class=\"kb-math kb-math-inline\">(x_j, y_j)</span>，最小化负边际对数似然：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\sum_j -\\log p(y_j | x_j)</div>\n<p>关键设计决策：\n- <strong>文档编码器 <span class=\"kb-math kb-math-inline\">\\text{BERT}_d</span> 和 FAISS 索引保持冻结</strong>：避免了 REALM 中需要周期性重建索引的高昂计算开销\n- <strong>仅微调查询编码器 <span class=\"kb-math kb-math-inline\">\\text{BERT}_q</span> 和 BART 生成器</strong>：通过梯度反向传播联合优化检索与生成\n- <strong>无需检索监督</strong>：不需要标注\"正确文档\"，检索文档作为潜变量被自动学习\n- 训练时检索 top-K 文档（<span class=\"kb-math kb-math-inline\">k \\in \\{5, 10\\}</span>），测试时 K 值通过验证集选择</p>\n<h5>解码策略</h5>\n<p>两种变体需要不同的解码方式：</p>\n<ul>\n<li><strong>RAG-Token</strong>：由于边际化后的转移概率 <span class=\"kb-math kb-math-inline\">p&#x27;_{\\theta}(y_i|x, y_{1:i-1})</span> 具有标准自回归形式，可直接使用常规 beam search 解码。</li>\n<li><strong>RAG-Sequence</strong>：生成概率无法分解为逐 token 的形式，论文提出两种策略：</li>\n<li><strong>Thorough Decoding</strong>：对每个检索文档独立运行 beam search，收集所有候选假设，对未出现在某文档 beam 中的假设额外运行前向传播计算概率，最终加权求和。精确但计算量大。</li>\n<li><strong>Fast Decoding</strong>：假设未在某文档 beam 中出现的假设概率为 0，避免额外前向传播。近似但高效。</li>\n</ul>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>纯参数化模型（如 T5）</th>\n<th>抽取式检索（如 DPR+Reader）</th>\n<th>RAG</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>知识来源</td>\n<td>仅参数记忆</td>\n<td>仅检索文档</td>\n<td>参数 + 检索</td>\n</tr>\n<tr>\n<td>答案形式</td>\n<td>自由生成</td>\n<td>文档片段抽取</td>\n<td>自由生成</td>\n</tr>\n<tr>\n<td>知识更新</td>\n<td>需重新训练</td>\n<td>替换文档索引</td>\n<td>替换文档索引</td>\n</tr>\n<tr>\n<td>可解释性</td>\n<td>无</td>\n<td>可追溯文档</td>\n<td>可追溯文档</td>\n</tr>\n<tr>\n<td>多文档综合</td>\n<td>隐式</td>\n<td>困难</td>\n<td>RAG-Token 原生支持</td>\n</tr>\n</tbody>\n</table></div>\n<p>RAG 的独特优势在于：既保留了生成模型的灵活性（可以生成训练数据中未出现的答案），又通过检索机制锚定了外部知识，显著减少幻觉并支持知识热更新。</p>",
      "quiz": {
        "q": "RAG-Sequence 和 RAG-Token 两种变体的核心区别是什么？",
        "options": [
          "使用不同的检索器架构",
          "边际化潜变量（检索文档）的方式不同：RAG-Sequence 对整个序列使用同一文档，RAG-Token 允许每个 token 使用不同文档",
          "RAG-Sequence 使用 BART，RAG-Token 使用 T5",
          "RAG-Token 不需要检索，仅依赖参数化记忆"
        ],
        "answer": 1,
        "explain": "两种变体使用相同的检索器和生成器，区别在于求和(Σ)与连乘(Π)的嵌套顺序：RAG-Sequence 先对每个文档生成完整序列再求和，RAG-Token 在每个 token 位置先对文档求和再连乘。"
      }
    },
    {
      "id": "truthfulqa",
      "num": 11,
      "name": "TruthfulQA",
      "fullName": "真实性问答基准 (TruthfulQA Benchmark)",
      "year": "2022",
      "org": "Oxford",
      "parent": "—",
      "paperUrl": "https://aclanthology.org/2022.acl-long.226/",
      "projectUrl": "",
      "category": "hallucination",
      "motivation": "虚假陈述倾向基准",
      "summary": "TruthfulQA 的核心目标是：虚假陈述倾向基准。",
      "keyPoints": [
        "核心动机：虚假陈述倾向基准",
        "代表机构：Oxford"
      ],
      "detail": "<p>虚假陈述倾向基准</p>"
    },
    {
      "id": "rlhf",
      "num": 12,
      "name": "RLHF",
      "fullName": "人类反馈强化学习 (Reinforcement Learning from Human Feedback)",
      "year": "2022",
      "org": "OpenAI",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2203.02155",
      "projectUrl": "",
      "category": "alignment",
      "motivation": "人类偏好强化学习对齐",
      "summary": "InstructGPT 提出了 SFT → 奖励模型训练 → PPO 强化学习的三阶段 RLHF 流程，利用人类偏好反馈对齐语言模型输出与用户意图，使 1.3B 参数的对齐模型在人类评估中优于 175B 的原始 GPT-3。",
      "keyPoints": [
        "<strong>三阶段训练流程</strong>：Step 1 监督微调 (SFT) → Step 2 奖励模型训练 (RM) → Step 3 PPO 强化学习优化",
        "<strong>涉及 4 个模型</strong>：SFT Model、Reward Model (6B)、Policy Model (<span class=\"kb-math kb-math-inline\">\\pi_\\phi^{\\text{RL}}</span>)、Reference Model (<span class=\"kb-math kb-math-inline\">\\pi^{\\text{SFT}}</span>)",
        "<strong>奖励模型</strong>：基于人类对 K=4\\~9 个输出的排序，利用 <span class=\"kb-math kb-math-inline\">\\binom{K}{2}</span> 对比较对进行 pairwise 训练，6B 参数效果最优",
        "<strong>PPO-ptx 目标函数</strong>：在 PPO 奖励最大化的基础上加入 KL 散度惩罚（防止策略偏离 SFT）和预训练梯度混合（防止 NLP 能力退化）",
        "<strong>数据规模</strong>：SFT 约 13k 提示、RM 约 33k 提示、PPO 约 31k 提示，由 40 名标注者提供，标注者间一致率 72.6%",
        "<strong>核心发现</strong>：1.3B InstructGPT 在人类偏好评估中胜过 175B GPT-3；RLHF 显著降低毒性和幻觉"
      ],
      "detail": "<p><img alt=\"InstructGPT 三阶段训练流程图\" src=\"https://ar5iv.labs.arxiv.org/html/2203.02155/assets/x2.png\" />\n<em>图：RLHF 训练的三个阶段——(1) 监督微调 SFT，(2) 奖励模型训练 RM，(3) PPO 强化学习优化</em></p>\n<pre><code class=\"language-python\"># InstructGPT / RLHF 三阶段训练伪代码\n\n# ========== Step 1: Supervised Fine-Tuning (SFT) ==========\nsft_model = pretrained_gpt3.copy()\nfor epoch in range(16):  # 16 epochs, cosine LR, dropout=0.2\n    for (prompt, demonstration) in sft_dataset:  # ~13k prompts\n        loss = cross_entropy(sft_model(prompt), demonstration)\n        sft_model.update(loss)\n\n# ========== Step 2: Reward Model Training (RM) ==========\nreward_model = sft_model.remove_unembedding_layer()  # 6B params\nreward_model.add_scalar_head()  # 输出标量奖励值\nfor batch in rm_dataset:  # ~33k prompts\n    prompt, ranked_outputs = batch  # K=4~9 个输出的人类排序\n    loss = 0\n    for (y_w, y_l) in all_pairs(ranked_outputs):  # C(K,2) 对\n        loss -= log(sigmoid(reward_model(prompt, y_w) - reward_model(prompt, y_l)))\n    loss /= num_pairs\n    reward_model.update(loss)\n\n# ========== Step 3: PPO Reinforcement Learning ==========\npolicy = sft_model.copy()          # π_RL, 可训练\nreference = sft_model.copy()       # π_SFT, 冻结\nvalue_fn = reward_model.copy()     # 初始化自 RM\n\nfor iteration in ppo_iterations:\n    prompt = sample(ppo_prompts)           # ~31k prompts\n    response = policy.generate(prompt)     # rollout\n    reward = reward_model(prompt, response)\n    kl_penalty = beta * log(policy(response|prompt) / reference(response|prompt))\n    ppo_reward = reward - kl_penalty\n    # PPO-ptx: 混合预训练梯度\n    pretrain_loss = -gamma * log_likelihood(policy, pretrain_batch)\n    policy.ppo_update(ppo_reward + pretrain_loss)\n</code></pre>\n<p><strong>动机与背景：大语言模型的对齐问题</strong></p>\n<p>大规模语言模型（如 GPT-3）通过在海量互联网文本上进行下一词预测训练，获得了强大的语言生成能力。然而，\"预测下一个词\"这一训练目标与\"遵循用户指令并生成有帮助、诚实、无害的回答\"之间存在根本性的错位（misalignment）。GPT-3 经常生成不真实的内容（幻觉）、有毒文本，或者无法准确理解用户意图。传统的监督微调虽然能在一定程度上改善指令遵循能力，但受限于高质量标注数据的稀缺性——让人类为每个可能的提示编写理想回答的成本极高。InstructGPT 的核心洞察是：<strong>让人类评判输出的好坏（比较/排序）远比让人类撰写完美回答更容易</strong>，因此可以通过人类偏好反馈训练一个奖励模型，再用强化学习优化语言模型的输出策略。</p>\n<p><strong>核心机制：三阶段 RLHF 流程</strong></p>\n<p><strong>第一阶段——监督微调 (SFT)</strong>：在约 13,000 条由标注者编写的高质量 (prompt, demonstration) 对上微调 GPT-3。训练采用 16 个 epoch、余弦学习率衰减和 0.2 的 dropout。虽然 SFT 模型在 1 个 epoch 后就已过拟合验证损失，但继续训练仍能提升人类偏好评分，说明 RM 评分与验证损失并非完全相关。</p>\n<p><strong>第二阶段——奖励模型训练 (RM)</strong>：从 SFT 模型（6B 参数版本）移除最终的 unembedding 层，添加一个线性投影头输出标量奖励值。对于每个提示，标注者对 K=4\\~9 个模型输出进行排序，产生 <span class=\"kb-math kb-math-inline\">\\binom{K}{2}</span> 个偏好对。RM 的训练损失函数为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{RM}}(\\theta) = -\\frac{1}{\\binom{K}{2}} \\mathbb{E}_{(x, y_w, y_l) \\sim D}\\left[\\log \\sigma\\left(r_\\theta(x, y_w) - r_\\theta(x, y_l)\\right)\\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">r_\\theta(x, y)</span> 是奖励模型对提示 <span class=\"kb-math kb-math-inline\">x</span> 和输出 <span class=\"kb-math kb-math-inline\">y</span> 的标量评分，<span class=\"kb-math kb-math-inline\">y_w</span> 是偏好对中被偏好的输出，<span class=\"kb-math kb-math-inline\">y_l</span> 是较差的输出。关键设计是<strong>将同一提示的所有 <span class=\"kb-math kb-math-inline\">\\binom{K}{2}</span> 对比较放入同一个 batch</strong>，避免了奖励模型的过拟合问题。论文发现 6B 的 RM 比 175B 更稳定，大模型 RM 训练不稳定。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：奖励模型只需要学习输出之间的<strong>相对偏好排序</strong>，而非绝对分数。训练前通过偏置归一化使标注者示范的平均奖励为 0。</div>\n<p><strong>第三阶段——PPO 强化学习优化</strong>：将语言模型的生成过程建模为一个 bandit 环境——给定随机提示，模型生成回答，奖励模型给出评分后 episode 结束。PPO-ptx 的完整优化目标为：</p>\n<div class=\"kb-math kb-math-display\">\\operatorname{objective}(\\phi) = \\mathbb{E}_{(x,y) \\sim D_{\\pi_\\phi^{\\text{RL}}}}\\left[r_\\theta(x,y) - \\beta \\log\\frac{\\pi_\\phi^{\\text{RL}}(y \\mid x)}{\\pi^{\\text{SFT}}(y \\mid x)}\\right] + \\gamma \\mathbb{E}_{x \\sim D_{\\text{pretrain}}}\\left[\\log \\pi_\\phi^{\\text{RL}}(x)\\right]</div>\n<p>其中第一项是经 KL 惩罚调节的奖励最大化——<span class=\"kb-math kb-math-inline\">\\beta</span> 控制 KL 散度惩罚强度，防止策略 <span class=\"kb-math kb-math-inline\">\\pi_\\phi^{\\text{RL}}</span> 过度偏离参考模型 <span class=\"kb-math kb-math-inline\">\\pi^{\\text{SFT}}</span>，从而避免对奖励模型的过度优化（reward hacking）。第二项是预训练数据上的语言模型损失，系数 <span class=\"kb-math kb-math-inline\">\\gamma</span> 控制其权重，用于缓解 RL 训练导致的公共 NLP 任务性能退化（alignment tax）。当 <span class=\"kb-math kb-math-inline\">\\gamma = 0</span> 时退化为标准 PPO 模型。Value function 从 RM 初始化。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：KL 惩罚是<strong>逐 token</strong>施加的，而非在整个序列级别。这提供了更细粒度的约束，防止模型在局部生成与 SFT 分布严重偏离的 token。</div>\n<p><strong>与传统方法的区别与核心优势</strong></p>\n<p>与纯监督微调相比，RLHF 的关键优势在于利用了<strong>比较反馈</strong>而非<strong>示范反馈</strong>。人类标注者判断\"A 比 B 好\"的一致性和效率远高于\"从零撰写完美回答\"。与直接使用 RM 分数做 best-of-n 采样（rejection sampling）相比，PPO 优化将奖励信号内化到模型参数中，推理时无需多次采样，计算效率更高。实验表明，1.3B 的 InstructGPT 在人类偏好评估中以显著优势胜过 175B 的 GPT-3，甚至在 TruthfulQA 和 RealToxicityPrompts 等安全基准上也表现更优。PPO-ptx 变体通过混合预训练梯度，在对齐能力和通用 NLP 能力之间取得了良好平衡，将 alignment tax 降至最低。这一三阶段框架后来成为 ChatGPT 等对话系统的基础训练范式。</p>",
      "quiz": {
        "q": "InstructGPT 在 PPO 训练中加入 KL 散度惩罚项的主要目的是什么？",
        "options": [
          "加速策略模型的收敛速度",
          "防止策略模型过度偏离 SFT 参考模型，避免奖励模型被过度优化",
          "提升奖励模型的预测精度",
          "减少模型的参数量以节省计算资源"
        ],
        "answer": 1,
        "explain": "KL 散度惩罚约束 π_RL 与 π_SFT 的分布差异，防止策略过度优化奖励模型的漏洞（reward hacking），确保生成质量。"
      }
    },
    {
      "id": "cai",
      "num": 13,
      "name": "CAI",
      "fullName": "宪法AI (Constitutional AI)",
      "year": "2022",
      "org": "Anthropic",
      "parent": "rlhf",
      "paperUrl": "https://arxiv.org/abs/2212.08073",
      "projectUrl": "",
      "category": "alignment",
      "motivation": "宪法原则自我监督对齐",
      "summary": "CAI 的核心目标是：宪法原则自我监督对齐。",
      "keyPoints": [
        "核心动机：宪法原则自我监督对齐",
        "演化来源：继承或改进自 rlhf",
        "代表机构：Anthropic"
      ],
      "detail": "<p>宪法原则自我监督对齐</p>"
    },
    {
      "id": "dpo",
      "num": 14,
      "name": "DPO",
      "fullName": "直接偏好优化 (Direct Preference Optimization)",
      "year": "2023",
      "org": "Stanford",
      "parent": "rlhf",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2023/hash/a85b405ed65c6477a4fe8302b5e06ce7-Abstract-Conference.html",
      "projectUrl": "",
      "category": "alignment",
      "motivation": "直接偏好优化无需奖励模型",
      "summary": "DPO 通过推导 KL 约束奖励最大化目标的闭式最优策略解，将传统 RLHF 的\"训练奖励模型 + 强化学习微调\"两阶段流程简化为直接在人类偏好数据上优化的二元交叉熵分类损失，完全消除了对显式奖励模型和 RL 采样的需求。",
      "keyPoints": [
        "<strong>无需奖励模型</strong>：跳过 RLHF 中的奖励建模阶段，直接利用偏好对 <span class=\"kb-math kb-math-inline\">(y_w, y_l)</span> 优化策略",
        "<strong>闭式最优策略</strong>：推导出 KL 约束 RL 目标下最优策略 <span class=\"kb-math kb-math-inline\">\\pi^*(y|x) \\propto \\pi_{\\text{ref}}(y|x) \\exp\\!\\bigl(\\tfrac{1}{\\beta} r^*(x,y)\\bigr)</span> 的解析解",
        "<strong>奖励重参数化</strong>：将奖励函数表示为策略对数比 <span class=\"kb-math kb-math-inline\">r(x,y) = \\beta \\log \\frac{\\pi_\\theta(y|x)}{\\pi_{\\text{ref}}(y|x)} + \\beta \\log Z(x)</span>，代入 Bradley-Terry 模型消去配分函数",
        "<strong>DPO 损失函数</strong>：最终形式为简洁的 sigmoid 交叉熵损失，仅涉及策略模型与参考模型的对数概率差",
        "<strong>隐式奖励与梯度加权</strong>：梯度分析表明 DPO 自动以隐式奖励的估计误差为权重调整更新幅度，对已正确排序的样本降低梯度",
        "<strong>仅需 2 个模型</strong>：训练时只需当前策略 <span class=\"kb-math kb-math-inline\">\\pi_\\theta</span> 和冻结的参考策略 <span class=\"kb-math kb-math-inline\">\\pi_{\\text{ref}}</span>，无需 Value Model 和 Reward Model",
        "<strong>理论保证</strong>：在 Bradley-Terry 偏好模型下，DPO 优化器与标准 RLHF 管线具有相同的全局最优解"
      ],
      "detail": "<p><img alt=\"DPO 核心流程对比图\" src=\"https://ar5iv.labs.arxiv.org/html/2305.18290/assets/figures/diagrams/teaser.png\" />\n<em>图：DPO 与传统 RLHF 流程对比。传统方法需要先训练奖励模型再用 PPO 做 RL 微调；DPO 直接在偏好数据上用分类损失优化策略，大幅简化流程。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># DPO 训练伪代码\n# 输入: 偏好数据集 D = {(x, y_w, y_l)}, 参考策略 π_ref, 温度 β\n# 输出: 对齐后的策略 π_θ\n\nπ_θ = copy(π_ref)  # 从参考策略（通常为 SFT 模型）初始化\n\nfor batch in DataLoader(D):\n    x, y_w, y_l = batch  # prompt, 偏好回答, 非偏好回答\n\n    # 计算当前策略和参考策略的对数概率\n    log_πθ_w  = π_θ.log_prob(y_w | x)\n    log_πθ_l  = π_θ.log_prob(y_l | x)\n    log_πref_w = π_ref.log_prob(y_w | x)   # 冻结，不计算梯度\n    log_πref_l = π_ref.log_prob(y_l | x)\n\n    # 计算隐式奖励差\n    log_ratio_w = log_πθ_w - log_πref_w\n    log_ratio_l = log_πθ_l - log_πref_l\n    logits = β * (log_ratio_w - log_ratio_l)\n\n    # DPO 损失：负对数 sigmoid\n    loss = -log_sigmoid(logits).mean()\n\n    optimizer.zero_grad()\n    loss.backward()\n    optimizer.step()\n</code></pre>\n<h5>1. 动机与背景：RLHF 的复杂性问题</h5>\n<p>传统 RLHF 流程包含三个阶段：(1) 监督微调 (SFT)；(2) 在偏好数据上训练 Bradley-Terry 奖励模型；(3) 用 PPO 等 RL 算法在 KL 约束下最大化奖励。这一流程存在多个痛点：</p>\n<ul>\n<li><strong>训练复杂度高</strong>：需要同时维护 4 个模型（Policy、Reference、Reward、Value），显存开销巨大</li>\n<li><strong>RL 训练不稳定</strong>：PPO 对超参数（裁剪系数、学习率、GAE 参数等）极为敏感</li>\n<li><strong>采样开销大</strong>：每轮优化都需要从当前策略采样生成完整回答，计算成本高昂</li>\n</ul>\n<p>DPO 的核心洞察是：<strong>奖励模型只是偏好数据到策略优化之间的中间产物，可以被数学推导消除</strong>。</p>\n<h5>2. 核心推导：从 RL 目标到分类损失</h5>\n<p><strong>第一步：KL 约束 RL 目标的闭式解。</strong> RLHF 的标准优化目标为：</p>\n<div class=\"kb-math kb-math-display\">\\max_{\\pi_\\theta} \\; \\mathbb{E}_{x \\sim \\mathcal{D},\\, y \\sim \\pi_\\theta(y|x)} \\bigl[ r_\\phi(x, y) \\bigr] - \\beta \\, D_{\\text{KL}}\\!\\bigl[\\pi_\\theta(y|x) \\,\\|\\, \\pi_{\\text{ref}}(y|x)\\bigr]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\beta</span> 控制策略偏离参考模型的程度。通过将目标展开并利用变分法（或直接验证），可以得到最优策略的<strong>闭式解</strong>：</p>\n<div class=\"kb-math kb-math-display\">\\pi^*(y|x) = \\frac{1}{Z(x)} \\, \\pi_{\\text{ref}}(y|x) \\, \\exp\\!\\Bigl(\\frac{1}{\\beta} \\, r(x, y)\\Bigr)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">Z(x) = \\sum_y \\pi_{\\text{ref}}(y|x) \\exp\\!\\bigl(\\frac{1}{\\beta} r(x,y)\\bigr)</span> 是配分函数（归一化常数）。</p>\n<div class=\"key-point\">💡 <strong>直觉</strong>：最优策略在参考策略的基础上，按奖励值做指数加权调整——奖励越高的回答概率越大，<span class=\"kb-math kb-math-inline\">\\beta</span> 越小偏离越激进。</div>\n<p><strong>第二步：奖励的重参数化。</strong> 对上式两边取对数并重新整理，可以将奖励表示为策略的函数：</p>\n<div class=\"kb-math kb-math-display\">r(x, y) = \\beta \\log \\frac{\\pi^*(y|x)}{\\pi_{\\text{ref}}(y|x)} + \\beta \\log Z(x)</div>\n<p>这是 DPO 最关键的等式——它将奖励函数用最优策略与参考策略的对数比来表达。</p>\n<p><strong>第三步：代入 Bradley-Terry 模型消去配分函数。</strong> Bradley-Terry 偏好模型假设人类偏好概率为：</p>\n<div class=\"kb-math kb-math-display\">p^*(y_w \\succ y_l | x) = \\sigma\\!\\bigl(r^*(x, y_w) - r^*(x, y_l)\\bigr)</div>\n<p>将重参数化的奖励代入上式，由于 <span class=\"kb-math kb-math-inline\">\\beta \\log Z(x)</span> 在 <span class=\"kb-math kb-math-inline\">y_w</span> 和 <span class=\"kb-math kb-math-inline\">y_l</span> 中相同，<strong>配分函数被完美消去</strong>：</p>\n<div class=\"kb-math kb-math-display\">p^*(y_w \\succ y_l | x) = \\sigma\\!\\left(\\beta \\log \\frac{\\pi^*(y_w|x)}{\\pi_{\\text{ref}}(y_w|x)} - \\beta \\log \\frac{\\pi^*(y_l|x)}{\\pi_{\\text{ref}}(y_l|x)}\\right)</div>\n<p><strong>第四步：DPO 损失函数。</strong> 用可训练策略 <span class=\"kb-math kb-math-inline\">\\pi_\\theta</span> 替代 <span class=\"kb-math kb-math-inline\">\\pi^*</span>，对偏好数据做最大似然估计，得到 DPO 损失：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{DPO}}(\\pi_\\theta; \\pi_{\\text{ref}}) = -\\mathbb{E}_{(x, y_w, y_l) \\sim \\mathcal{D}} \\left[ \\log \\sigma\\!\\left(\\beta \\log \\frac{\\pi_\\theta(y_w|x)}{\\pi_{\\text{ref}}(y_w|x)} - \\beta \\log \\frac{\\pi_\\theta(y_l|x)}{\\pi_{\\text{ref}}(y_l|x)}\\right) \\right]</div>\n<div class=\"key-point\">💡 <strong>关键</strong>：这是一个标准的二元交叉熵损失。输入的 logit 是偏好回答与非偏好回答在\"隐式奖励\"（即 <span class=\"kb-math kb-math-inline\">\\beta \\log \\frac{\\pi_\\theta}{\\pi_{\\text{ref}}}</span>）上的差值。整个损失只需要前向传播计算对数概率，无需 RL 采样。</div>\n<h5>3. 梯度分析与隐式奖励机制</h5>\n<p>DPO 损失的梯度具有直观的解释：</p>\n<div class=\"kb-math kb-math-display\">\\nabla_\\theta \\mathcal{L}_{\\text{DPO}} = -\\beta \\, \\mathbb{E} \\Big[ \\underbrace{\\sigma\\!\\bigl(\\hat{r}_\\theta(x,y_l) - \\hat{r}_\\theta(x,y_w)\\bigr)}_{\\text{隐式奖励排序错误的权重}} \\Big[ \\underbrace{\\nabla_\\theta \\log \\pi_\\theta(y_w|x)}_{\\text{增大偏好回答概率}} - \\underbrace{\\nabla_\\theta \\log \\pi_\\theta(y_l|x)}_{\\text{减小非偏好回答概率}} \\Big] \\Big]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\hat{r}_\\theta(x,y) = \\beta \\log \\frac{\\pi_\\theta(y|x)}{\\pi_{\\text{ref}}(y|x)}</span> 是隐式奖励。</p>\n<p>梯度的权重项 <span class=\"kb-math kb-math-inline\">\\sigma(\\hat{r}_\\theta(y_l) - \\hat{r}_\\theta(y_w))</span> 反映了当前模型对偏好排序的\"错误程度\"：\n- 当模型已经正确地给 <span class=\"kb-math kb-math-inline\">y_w</span> 更高的隐式奖励时，权重接近 0，梯度很小\n- 当模型错误地偏好 <span class=\"kb-math kb-math-inline\">y_l</span> 时，权重接近 1，梯度最大</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：这种自适应加权是 DPO 的内在机制，无需额外设计。它同时起到了正则化的作用——防止模型在已经正确排序的样本上过度优化而偏离参考策略。</div>\n<h5>4. DPO 与 RLHF 的理论等价性</h5>\n<p>论文在理论上证明了两个关键结果：</p>\n<ol>\n<li><strong>全局最优等价</strong>：在 Bradley-Terry 偏好模型假设下，DPO 的全局最优解与标准 RLHF 管线（奖励学习 + KL 约束 RL）的全局最优解一致。</li>\n<li><strong>隐式奖励模型</strong>：DPO 训练得到的策略 <span class=\"kb-math kb-math-inline\">\\pi_\\theta</span> 隐式定义了一个奖励模型 <span class=\"kb-math kb-math-inline\">\\hat{r}(x,y) = \\beta \\log \\frac{\\pi_\\theta(y|x)}{\\pi_{\\text{ref}}(y|x)}</span>，该奖励模型在 Plackett-Luce（BT 模型的推广）框架下是一致的。</li>\n</ol>\n<h5>5. 与传统 RLHF 方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>RLHF (PPO)</th>\n<th>DPO</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>训练阶段</td>\n<td>SFT → 奖励建模 → RL 微调</td>\n<td>SFT → 偏好优化（单阶段）</td>\n</tr>\n<tr>\n<td>所需模型数</td>\n<td>4 个（Policy, Ref, Reward, Value）</td>\n<td>2 个（Policy, Ref）</td>\n</tr>\n<tr>\n<td>是否需要采样</td>\n<td>是（每轮从策略采样）</td>\n<td>否（离线偏好数据）</td>\n</tr>\n<tr>\n<td>损失函数</td>\n<td>PPO 裁剪目标 + Value Loss</td>\n<td>二元交叉熵</td>\n</tr>\n<tr>\n<td>超参数敏感度</td>\n<td>高（ε, GAE λ, 学习率等）</td>\n<td>低（主要是 β）</td>\n</tr>\n<tr>\n<td>训练稳定性</td>\n<td>较差，易崩溃</td>\n<td>稳定，类似监督学习</td>\n</tr>\n<tr>\n<td>理论最优解</td>\n<td>相同（在 BT 模型下）</td>\n<td>相同（在 BT 模型下）</td>\n</tr>\n</tbody>\n</table></div>\n<h5>6. 实验验证</h5>\n<p>论文在三个任务上验证了 DPO 的有效性：</p>\n<ul>\n<li><strong>情感控制</strong>（IMDb 评论生成）：DPO 在奖励-KL 前沿上优于 PPO，以更小的 KL 散度达到更高的奖励</li>\n<li><strong>摘要生成</strong>（TL;DR 数据集）：DPO 在 GPT-4 评估的胜率上与 PPO 相当或更优，且训练效率更高</li>\n<li><strong>单轮对话</strong>（Anthropic-HH）：DPO 是唯一在 GPT-4 评估中超过人类标注偏好回答的方法</li>\n</ul>",
      "quiz": {
        "q": "DPO 推导中配分函数 Z(x) 被消去的关键原因是什么？",
        "options": [
          "配分函数在训练过程中趋近于 1",
          "Bradley-Terry 模型只依赖奖励差值，配分函数在相减时抵消",
          "参考策略的归一化性质使配分函数为常数",
          "DPO 使用了蒙特卡洛采样来近似配分函数"
        ],
        "answer": 1,
        "explain": "Bradley-Terry 偏好模型 p(y_w ≻ y_l) = σ(r(y_w) - r(y_l)) 只依赖两个回答的奖励差值。将重参数化奖励 r = β log(π/π_ref) + β log Z(x) 代入后，Z(x) 项在 y_w 和 y_l 中相同，相减时完美抵消。"
      }
    },
    {
      "id": "safe_rlhf",
      "num": 15,
      "name": "Safe RLHF",
      "fullName": "安全RLHF (Safe Reinforcement Learning from Human Feedback)",
      "year": "2024",
      "org": "PKU",
      "parent": "dpo",
      "paperUrl": "https://proceedings.iclr.cc/paper_files/paper/2024/hash/dd1577afd396928ed64216f3f1fd5556-Abstract-Conference.html",
      "projectUrl": "",
      "category": "alignment",
      "motivation": "安全约束平衡有用与安全",
      "summary": "Safe RLHF 的核心目标是：安全约束平衡有用与安全。",
      "keyPoints": [
        "核心动机：安全约束平衡有用与安全",
        "演化来源：继承或改进自 dpo",
        "代表机构：PKU"
      ],
      "detail": "<p>安全约束平衡有用与安全</p>"
    },
    {
      "id": "mart",
      "num": 16,
      "name": "MART",
      "fullName": "多轮自动红队 (Multi-round Automatic Red-Teaming)",
      "year": "2024",
      "org": "Academic",
      "parent": "—",
      "paperUrl": "https://aclanthology.org/2024.naacl-long.107/",
      "projectUrl": "",
      "category": "alignment",
      "motivation": "自动化多轮红队对抗测试",
      "summary": "MART 的核心目标是：自动化多轮红队对抗测试。",
      "keyPoints": [
        "核心动机：自动化多轮红队对抗测试",
        "代表机构：Academic"
      ],
      "detail": "<p>自动化多轮红队对抗测试</p>"
    },
    {
      "id": "toxigen",
      "num": 17,
      "name": "ToxiGen",
      "fullName": "ToxiGen数据集 (ToxiGen Dataset)",
      "year": "2022",
      "org": "Microsoft",
      "parent": "—",
      "paperUrl": "https://aclanthology.org/2022.acl-long.234/",
      "projectUrl": "",
      "category": "content_safety",
      "motivation": "隐性毒性检测数据集",
      "summary": "ToxiGen 的核心目标是：隐性毒性检测数据集。",
      "keyPoints": [
        "核心动机：隐性毒性检测数据集",
        "代表机构：Microsoft"
      ],
      "detail": "<p>隐性毒性检测数据集</p>"
    },
    {
      "id": "nemo_guard",
      "num": 18,
      "name": "NeMo Guardrails",
      "fullName": "NeMo护栏 (NeMo Guardrails)",
      "year": "2023",
      "org": "NVIDIA",
      "parent": "—",
      "paperUrl": "https://www.nvidia.com/en-us/about-nvidia/press-releases/2023/nvidia-nemo-guardrails-open-source-software-to-help-developers-guide-ai-chatbots/",
      "projectUrl": "",
      "category": "content_safety",
      "motivation": "对话边界定义框架",
      "summary": "NeMo Guardrails 的核心目标是：对话边界定义框架。",
      "keyPoints": [
        "核心动机：对话边界定义框架",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>对话边界定义框架</p>"
    },
    {
      "id": "llama_guard3",
      "num": 19,
      "name": "Llama Guard 3",
      "fullName": "Llama Guard 3",
      "year": "2024",
      "org": "Meta",
      "parent": "llama_guard",
      "paperUrl": "https://arxiv.org/abs/2312.06674",
      "projectUrl": "",
      "category": "content_safety",
      "motivation": "多模态安全过滤分类",
      "summary": "Llama Guard 3 的核心目标是：多模态安全过滤分类。",
      "keyPoints": [
        "核心动机：多模态安全过滤分类",
        "演化来源：继承或改进自 llama_guard",
        "代表机构：Meta"
      ],
      "detail": "<p>多模态安全过滤分类</p>"
    },
    {
      "id": "perspective",
      "num": 20,
      "name": "Perspective API",
      "fullName": "Perspective API",
      "year": "2017",
      "org": "Google",
      "parent": "—",
      "paperUrl": "https://www.perspectiveapi.com/",
      "projectUrl": "",
      "category": "content_safety",
      "motivation": "机器学习毒性评分",
      "summary": "Perspective API 的核心目标是：机器学习毒性评分。",
      "keyPoints": [
        "核心动机：机器学习毒性评分",
        "代表机构：Google"
      ],
      "detail": "<p>机器学习毒性评分</p>"
    },
    {
      "id": "hmns",
      "num": 21,
      "name": "HMNS",
      "fullName": "头掩蔽零空间引导 (Head-Masked Nullspace Steering)",
      "year": "2026.04",
      "org": "ICLR",
      "parent": "pair",
      "paperUrl": "https://iclr.cc/virtual/2026/papers.html",
      "projectUrl": "",
      "category": "jailbreak",
      "motivation": "掩蔽安全头电路高成功率越狱",
      "summary": "HMNS 的核心目标是：掩蔽安全头电路高成功率越狱。",
      "keyPoints": [
        "核心动机：掩蔽安全头电路高成功率越狱",
        "演化来源：继承或改进自 pair",
        "代表机构：ICLR"
      ],
      "detail": "<p>掩蔽安全头电路高成功率越狱</p>"
    },
    {
      "id": "neurostrike",
      "num": 22,
      "name": "NeuroStrike",
      "fullName": "神经元级攻击 (NeuroStrike: Neuron-Level Attacks)",
      "year": "2026.02",
      "org": "NDSS",
      "parent": "gcg",
      "paperUrl": "https://www.ndss-symposium.org/ndss-paper/neurostrike-neuron-level-attacks-on-aligned-llms/",
      "projectUrl": "",
      "category": "jailbreak",
      "motivation": "剪枝安全神经元绕过对齐",
      "summary": "NeuroStrike 的核心目标是：剪枝安全神经元绕过对齐。",
      "keyPoints": [
        "核心动机：剪枝安全神经元绕过对齐",
        "演化来源：继承或改进自 gcg",
        "代表机构：NDSS"
      ],
      "detail": "<p>剪枝安全神经元绕过对齐</p>"
    },
    {
      "id": "proact",
      "num": 23,
      "name": "ProAct",
      "fullName": "主动防御 (ProAct: Jailbreaking Jailbreaks)",
      "year": "2026.03",
      "org": "ICLR",
      "parent": "pair",
      "paperUrl": "https://openreview.net/forum?id=AUZIYQGAoAb",
      "projectUrl": "",
      "category": "jailbreak",
      "motivation": "伪造响应误导攻击智能体",
      "summary": "ProAct 的核心目标是：伪造响应误导攻击智能体。",
      "keyPoints": [
        "核心动机：伪造响应误导攻击智能体",
        "演化来源：继承或改进自 pair",
        "代表机构：ICLR"
      ],
      "detail": "<p>伪造响应误导攻击智能体</p>"
    },
    {
      "id": "aligntree",
      "num": 24,
      "name": "AlignTree",
      "fullName": "对齐树 (AlignTree: Efficient Defense)",
      "year": "2026.01",
      "org": "AAAI",
      "parent": "llama_guard3",
      "paperUrl": "https://doi.org/10.1609/aaai.v40i44.41074",
      "projectUrl": "",
      "category": "jailbreak",
      "motivation": "随机森林实时激活拦截",
      "summary": "AlignTree 的核心目标是：随机森林实时激活拦截。",
      "keyPoints": [
        "核心动机：随机森林实时激活拦截",
        "演化来源：继承或改进自 llama_guard3",
        "代表机构：AAAI"
      ],
      "detail": "<p>随机森林实时激活拦截</p>"
    },
    {
      "id": "jbfuzz",
      "num": 25,
      "name": "JBFuzz",
      "fullName": "LLM模糊测试框架 (JBFuzz: LLM Fuzzing Framework)",
      "year": "2026.03",
      "org": "RedTeams",
      "parent": "—",
      "paperUrl": "https://redteams.ai/blog/jbfuzz-99-percent-success",
      "projectUrl": "",
      "category": "jailbreak",
      "motivation": "模糊测试自动化越狱框架",
      "summary": "JBFuzz 的核心目标是：模糊测试自动化越狱框架。",
      "keyPoints": [
        "核心动机：模糊测试自动化越狱框架",
        "代表机构：RedTeams"
      ],
      "detail": "<p>模糊测试自动化越狱框架</p>"
    },
    {
      "id": "jbf",
      "num": 26,
      "name": "JBF",
      "fullName": "越狱铸造厂 (Jailbreak Foundry)",
      "year": "2026.03",
      "org": "arXiv",
      "parent": "jbfuzz",
      "paperUrl": "https://arxiv.org/abs/2603.05001",
      "projectUrl": "",
      "category": "jailbreak",
      "motivation": "论文自动转化攻击模块",
      "summary": "JBF 的核心目标是：论文自动转化攻击模块。",
      "keyPoints": [
        "核心动机：论文自动转化攻击模块",
        "演化来源：继承或改进自 jbfuzz",
        "代表机构：arXiv"
      ],
      "detail": "<p>论文自动转化攻击模块</p>"
    },
    {
      "id": "probe",
      "num": 27,
      "name": "PROBE",
      "fullName": "过程化基准 (PROcess-Based BEnchmark)",
      "year": "2026.01",
      "org": "EACL",
      "parent": "selfcheckgpt",
      "paperUrl": "https://openreview.net/forum?id=GleVekx5ut",
      "projectUrl": "",
      "category": "hallucination",
      "motivation": "过程化分解幻觉检测步骤",
      "summary": "PROBE 的核心目标是：过程化分解幻觉检测步骤。",
      "keyPoints": [
        "核心动机：过程化分解幻觉检测步骤",
        "演化来源：继承或改进自 selfcheckgpt",
        "代表机构：EACL"
      ],
      "detail": "<p>过程化分解幻觉检测步骤</p>"
    },
    {
      "id": "kghalubench",
      "num": 28,
      "name": "KGHaluBench",
      "fullName": "知识图谱幻觉基准 (Knowledge Graph Hallucination Benchmark)",
      "year": "2026",
      "org": "EACL",
      "parent": "factscore",
      "paperUrl": "https://aclanthology.org/2026.findings-acl.1/",
      "projectUrl": "",
      "category": "hallucination",
      "motivation": "知识图谱自动化验证",
      "summary": "KGHaluBench 的核心目标是：知识图谱自动化验证。",
      "keyPoints": [
        "核心动机：知识图谱自动化验证",
        "演化来源：继承或改进自 factscore",
        "代表机构：EACL"
      ],
      "detail": "<p>知识图谱自动化验证</p>"
    },
    {
      "id": "abse",
      "num": 29,
      "name": "ABSE",
      "fullName": "自适应贝叶斯语义熵 (Adaptive Bayesian Semantic Entropy)",
      "year": "2026.01",
      "org": "AAAI",
      "parent": "rag",
      "paperUrl": "https://doi.org/10.1609/aaai.v40i44.41074",
      "projectUrl": "",
      "category": "hallucination",
      "motivation": "自适应语义熵平衡精度效率",
      "summary": "ABSE 的核心目标是：自适应语义熵平衡精度效率。",
      "keyPoints": [
        "核心动机：自适应语义熵平衡精度效率",
        "演化来源：继承或改进自 rag",
        "代表机构：AAAI"
      ],
      "detail": "<p>自适应语义熵平衡精度效率</p>"
    },
    {
      "id": "halp",
      "num": 30,
      "name": "HALP",
      "fullName": "VLM探测 (HALP: VLM Probing)",
      "year": "2026",
      "org": "EACL",
      "parent": "truthfulqa",
      "paperUrl": "https://aclanthology.org/2026.findings-acl.1/",
      "projectUrl": "",
      "category": "hallucination",
      "motivation": "内部表示预测幻觉风险",
      "summary": "HALP 提出了一种轻量级探测框架，通过在视觉语言模型（VLM）生成文本**之前**的单次前向传播中提取三类内部表示（视觉特征、视觉 token 隐状态、查询 token 隐状态），训练 MLP 探针预测幻觉风险，在 8 个主流 VLM 上实现了最高 0.93 AUROC 的幻觉检测性能，且推理开销不足 1%。",
      "keyPoints": [
        "<strong>预生成幻觉检测</strong>：在 VLM 解码生成文本之前，仅通过 prefill 阶段的内部表示即可预测幻觉风险，无需等待完整生成",
        "<strong>三类探测特征</strong>：Visual Features (VF) — 视觉编码器全局池化输出；Vision Token (VT) — 解码器中视觉 token 最后位置的隐状态；Query Token (QT) — 解码器中查询 token 最后位置的隐状态",
        "<strong>轻量 MLP 探针</strong>：3 层 MLP（512→256→128），ReLU 激活，二分类输出幻觉概率分数 <span class=\"kb-math kb-math-inline\">s^j \\in [0,1]</span>",
        "<strong>大规模基准评测</strong>：构建 10,000 样本多模态幻觉检测数据集，覆盖 11 个任务领域、4 种回答格式、7 类幻觉问题",
        "<strong>8 个 VLM 系统评估</strong>：Gemma3-12B、LLaVA-Next-8B、Llama-3.2-11B、Phi4-VL-5.6B、Molmo-7B、Qwen2.5-VL-7B、SmolVLM2-2.2B、FastVLM-7B",
        "<strong>QT 特征一致性最优</strong>：查询 token 表示在 7/8 模型上 AUROC 达 0.90–0.94，平均 0.87，显著优于 VF（0.69）和 VT（0.69）",
        "<strong>层级分析</strong>：QT 性能随解码器深度单调递增，3L/4 层为最优提取点；VT 性能跨层稳定但有限（~0.65–0.70）",
        "<strong>实际部署开销极低</strong>：探针推理仅 10–15ms，相对完整生成开销 &lt;1%"
      ],
      "detail": "<h5>框架总览</h5>\n<p><img alt=\"HALP 框架示意图\" src=\"https://arxiv.org/html/2603.05465v1/x2.png\" />\n<em>图：HALP 从 VLM 的单次前向传播中提取三类内部表示（VF、VT、QT），分别训练探针检测幻觉风险</em></p>\n<p>HALP 的核心思想是：VLM 在生成文本之前的 prefill 阶段，其内部表示已经编码了足够的信息来预测即将发生的幻觉。该框架无需修改模型权重，不依赖生成结果，可在解码前实时评估风险。</p>\n<h5>算法流程</h5>\n<pre><code class=\"language-python\"># HALP 幻觉检测框架伪代码\ndef halp_pipeline(vlm, images, queries, ground_truths):\n    # === 阶段 1: 幻觉标注 (离线) ===\n    for (I, Q, Y) in zip(images, queries, ground_truths):\n        Y_hat = vlm.generate(I, Q)                    # VLM 标准推理\n        b = llm_judge(Y_hat, Y, Q)                     # LLM-as-a-Judge 判断幻觉 {0,1}\n\n    # === 阶段 2: 特征提取 (单次前向传播) ===\n    for (I, Q) in zip(images, queries):\n        # 视觉特征 VF: 视觉编码器输出的全局平均池化\n        u_bar = mean_pool(vision_encoder(I))            # shape: [d_vision]\n\n        # 视觉 token 表示 VT: 解码器第 ℓ 层视觉序列最后位置\n        # 查询 token 表示 QT: 解码器第 ℓ 层查询序列最后位置\n        hidden_states = vlm.prefill(I, Q)               # 仅 prefill，不解码\n        for ℓ in {1, L//4, L//2, 3*L//4, L}:\n            vt[ℓ] = hidden_states[ℓ][last_vision_pos]  # shape: [d_model]\n            qt[ℓ] = hidden_states[ℓ][last_query_pos]   # shape: [d_model]\n\n    # === 阶段 3: 探针训练 ===\n    for feature_type in [VF, VT, QT]:\n        probe = MLP(input_dim, 512, 256, 128, 1)       # 3 层 MLP + sigmoid\n        probe.train(features, labels_b, epochs=50, lr=0.001)\n\n    # === 阶段 4: 推理时幻觉风险评估 ===\n    score = probe(extract_qt(vlm.prefill(I_new, Q_new)))  # 10-15ms\n    if score &gt; threshold:\n        flag_as_high_risk()  # 拒绝回答 / 路由到更强模型\n</code></pre>\n<h5>动机与背景</h5>\n<p>VLM 幻觉（hallucination）是指模型生成与视觉输入不一致的文本内容，包括虚构不存在的物体、错误描述属性/关系、编造事实等。现有幻觉检测方法主要分为两类：</p>\n<ol>\n<li><strong>后生成检测</strong>：需要模型完成整个生成过程后，通过对比参考答案或多次采样一致性来判断，计算开销大且无法实时干预</li>\n<li><strong>生成过程中检测</strong>：利用 token 级别的 logit 不确定性或注意力模式，但仍需部分解码过程</li>\n</ol>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：HALP 发现 VLM 在 prefill 阶段（处理输入但尚未生成任何 token）的内部表示中，已经包含了丰富的幻觉预测信号。这意味着可以在<strong>零生成开销</strong>下评估风险。</div>\n<h5>三类特征的设计原理</h5>\n<p><strong>Visual Features (VF)</strong> 捕获纯视觉感知信号：</p>\n<div class=\"kb-math kb-math-display\">\\bar{\\mathbf{u}} = \\frac{1}{M}\\sum_{i=1}^{M}\\mathbf{u}_i</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{u}_i</span> 是视觉编码器输出的第 <span class=\"kb-math kb-math-inline\">i</span> 个 patch token，<span class=\"kb-math kb-math-inline\">M</span> 为 patch 总数。VF 在多模态投影层之前提取，反映模型对图像的\"纯视觉理解\"。如果视觉编码器本身就无法正确感知图像内容，后续的语言生成必然会产生幻觉。</p>\n<p><strong>Vision Token (VT)</strong> 捕获视觉信息在语言解码器中的融合表示。提取解码器第 <span class=\"kb-math kb-math-inline\">\\ell</span> 层视觉 token 序列最后位置的隐状态，反映视觉信息经过多模态投影和 Transformer 层处理后的状态。</p>\n<p><strong>Query Token (QT)</strong> 捕获完整的多模态推理结果。由于 Transformer 的因果注意力机制，查询序列最后位置的隐状态聚合了所有视觉 token 和文本 token 的信息，是模型即将开始生成时的\"决策状态\"。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：QT 提取的是拼接序列 <span class=\"kb-math kb-math-inline\">(V, Q)</span> 的最后位置，而非仅文本查询的最后位置。这意味着它包含了完整的视觉-文本交互信息。</div>\n<h5>实验结果深入分析</h5>\n<p><strong>主结果（Table 2）</strong> 显示了三类特征在 8 个 VLM 上的 AUROC：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>VF</th>\n<th>VT</th>\n<th>QT</th>\n<th>平均</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Gemma3-12B</td>\n<td>0.674</td>\n<td>0.596</td>\n<td><strong>0.935</strong></td>\n<td>0.735</td>\n</tr>\n<tr>\n<td>Qwen2.5-VL-7B</td>\n<td>0.787</td>\n<td>0.668</td>\n<td><strong>0.915</strong></td>\n<td>0.790</td>\n</tr>\n<tr>\n<td>Llama-3.2-11B</td>\n<td>0.770</td>\n<td>0.738</td>\n<td><strong>0.896</strong></td>\n<td>0.801</td>\n</tr>\n<tr>\n<td>Phi4-VL-5.6B</td>\n<td>0.617</td>\n<td>0.774</td>\n<td><strong>0.903</strong></td>\n<td>0.765</td>\n</tr>\n<tr>\n<td>Molmo-7B</td>\n<td>0.683</td>\n<td>0.687</td>\n<td><strong>0.919</strong></td>\n<td>0.763</td>\n</tr>\n<tr>\n<td>SmolVLM2-2.2B</td>\n<td>0.724</td>\n<td>0.689</td>\n<td><strong>0.901</strong></td>\n<td>0.772</td>\n</tr>\n<tr>\n<td>LLaVA-Next-8B</td>\n<td>0.611</td>\n<td>0.627</td>\n<td><strong>0.903</strong></td>\n<td>0.714</td>\n</tr>\n<tr>\n<td>FastVLM-7B</td>\n<td>0.683</td>\n<td><strong>0.703</strong></td>\n<td>0.614</td>\n<td>0.667</td>\n</tr>\n<tr>\n<td><strong>平均</strong></td>\n<td>0.694</td>\n<td>0.685</td>\n<td><strong>0.873</strong></td>\n<td>0.751</td>\n</tr>\n</tbody>\n</table></div>\n<p>三个关键发现：</p>\n<ol>\n<li><strong>QT 一致性优势</strong>：7/8 模型的 QT AUROC 在 0.90–0.94 之间，说明幻觉信号在多模态推理完成后最为集中</li>\n<li><strong>架构异质性</strong>：Qwen2.5-VL 和 Llama-3.2 的 VF 已达 0.77–0.79（视觉编码器本身信息丰富），而 LLaVA-Next 和 Phi4-VL 的 VF 仅 0.61（更依赖后续融合）</li>\n<li><strong>FastVLM 异常</strong>：唯一 VT &gt; QT 的模型（0.703 vs 0.614），暗示其架构在早期融合阶段就完成了关键推理</li>\n</ol>\n<p><strong>层级分析</strong> 揭示了幻觉信号在解码器中的演化规律：\n- QT 性能随层深单调递增，典型模式如 Gemma3：<span class=\"kb-math kb-math-inline\">0.717 \\to 0.812 \\to 0.925 \\to 0.932 \\to 0.935</span>\n- VT 性能跨层基本稳定（0.65–0.70），说明视觉信息在解码器中的变化有限\n- 最优提取层为 <span class=\"kb-math kb-math-inline\">3L/4</span>，在大多数模型上达到峰值或接近峰值性能</p>\n<h5>与现有方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>后生成方法</th>\n<th>生成中方法</th>\n<th>HALP（预生成）</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>检测时机</td>\n<td>生成完成后</td>\n<td>解码过程中</td>\n<td>prefill 阶段</td>\n</tr>\n<tr>\n<td>计算开销</td>\n<td>高（完整生成+评估）</td>\n<td>中（部分解码）</td>\n<td>极低（&lt;1%）</td>\n</tr>\n<tr>\n<td>干预能力</td>\n<td>无（事后）</td>\n<td>有限</td>\n<td>完全（可拒绝/路由）</td>\n</tr>\n<tr>\n<td>是否需要参考答案</td>\n<td>通常需要</td>\n<td>不需要</td>\n<td>训练时需要，推理时不需要</td>\n</tr>\n</tbody>\n</table></div>\n<h5>实际应用场景</h5>\n<p>HALP 支持两种部署模式：\n- <strong>选择性拒绝</strong>：当探针分数超过阈值时拒绝回答，用安全提示替代。论文在附录中展示了覆盖率-准确率权衡曲线\n- <strong>选择性路由</strong>：高风险输入路由到更强的 VLM 或工具增强管线，低风险输入由基础模型直接处理，平衡延迟与可靠性</p>",
      "quiz": {
        "q": "HALP 框架中，哪种内部表示在大多数 VLM 上提供了最强的幻觉预测能力？",
        "options": [
          "Visual Features (VF) — 视觉编码器的全局池化输出",
          "Vision Token (VT) — 解码器中视觉 token 的隐状态",
          "Query Token (QT) — 解码器中查询 token 最后位置的隐状态",
          "注意力权重矩阵的熵值"
        ],
        "answer": 2,
        "explain": "QT 表示在 7/8 模型上 AUROC 达 0.90–0.94（平均 0.87），因为查询序列最后位置通过因果注意力聚合了完整的视觉-文本交互信息，是最接近生成决策的内部状态。"
      }
    },
    {
      "id": "ast_detect",
      "num": 31,
      "name": "AST-Detect",
      "fullName": "语法树检测 (AST-based Hallucination Detection)",
      "year": "2026.03",
      "org": "WWW",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2403.06448",
      "projectUrl": "",
      "category": "hallucination",
      "motivation": "语法树确定性代码验证",
      "summary": "AST-Detect 的核心目标是：语法树确定性代码验证。",
      "keyPoints": [
        "核心动机：语法树确定性代码验证",
        "代表机构：WWW"
      ],
      "detail": "<p>语法树确定性代码验证</p>"
    },
    {
      "id": "safedpo",
      "num": 32,
      "name": "SafeDPO",
      "fullName": "安全DPO (Safe Direct Preference Optimization)",
      "year": "2026.04",
      "org": "ICLR",
      "parent": "dpo",
      "paperUrl": "https://iclr.cc/virtual/2026/oral/23790",
      "projectUrl": "",
      "category": "alignment",
      "motivation": "安全约束集成单阶段对齐",
      "summary": "SafeDPO 将安全约束优化问题等价转化为对偏好数据的重排序操作，在标准 DPO 框架上实现**单阶段安全对齐**，无需额外训练奖励模型或代价模型，仅需有用性偏好数据和二值安全标签即可同时优化有用性与安全性。",
      "keyPoints": [
        "<strong>安全约束→无约束等价变换</strong>：定义修正奖励 <span class=\"kb-math kb-math-inline\">r_c(x,y) = r(x,y)</span> 若回答安全，否则 <span class=\"kb-math kb-math-inline\">r_c(x,y) = -\\infty</span>，将带约束的安全优化问题（Eq.8）等价转化为标准无约束 RLHF 目标（Eq.11），理论上保证最优策略一致（Proposition 4.2）",
        "<strong>数据需求大幅简化</strong>：仅需有用性偏好对 <span class=\"kb-math kb-math-inline\">(y_w \\succ y_l)</span> 加上每个回答的<strong>二值安全标签</strong> <span class=\"kb-math kb-math-inline\">h \\in \\{0, 1\\}</span>，完全不需要有害性偏好数据（Safe RLHF 需要），降低了标注成本和数据收集难度",
        "<strong>偏好重排序变换 <span class=\"kb-math kb-math-inline\">\\mathcal{T}</span></strong>：当不安全的回答被偏好于安全回答时（<span class=\"kb-math kb-math-inline\">\\tilde{h}_w &gt; \\tilde{h}_l</span>），交换偏好顺序，确保安全回答始终被优先选择；对重排后的数据直接应用 DPO 损失即为 SafeDPO（Eq.14）",
        "<strong>增强版 SafeDPO（Enhanced SafeDPO）</strong>：在 DPO 损失的 sigmoid 内部添加偏移量 <span class=\"kb-math kb-math-inline\">-(\\tilde{h}_l - \\tilde{h}_w)\\Delta</span>（<span class=\"kb-math kb-math-inline\">\\Delta \\geq 0</span>），进一步拉大安全与不安全回答的偏好差距，提升安全性；当 <span class=\"kb-math kb-math-inline\">\\Delta = 0</span> 时退化为基础版",
        "<strong>理论保证完备</strong>：Proposition 4.3 证明变换 <span class=\"kb-math kb-math-inline\">\\mathcal{T}</span> 下的 DPO 梯度是修正奖励下真实梯度的无偏估计；Proposition 4.4 证明 Enhanced SafeDPO 的最优解与基础版一致，<span class=\"kb-math kb-math-inline\">\\Delta</span> 仅影响优化景观而不改变最优点",
        "<strong>实验效果显著</strong>：在 PKU-SafeRLHF-30K 数据集上，以 Alpaca-7B 为基座模型，SafeDPO 达到 97%（模型评估）/ 100%（GPT-4 评估）的安全率，同时保持较高的有用性得分，显著优于 Safe RLHF 等多阶段基线"
      ],
      "detail": "<p><img alt=\"SafeDPO Pipeline\" src=\"https://ar5iv.labs.arxiv.org/html/2505.20065/assets/x1.png\" /></p>\n<pre><code>算法: SafeDPO / Enhanced SafeDPO\n────────────────────────────────────────────\n输入: \n  - 有用性偏好数据集 D = {(x, y_w, y_l, h_w, h_l)}\n    其中 y_w ≻ y_l 表示有用性偏好, h ∈ {0,1} 为安全标签(1=安全)\n  - 参考策略 π_ref\n  - 超参数 β &gt; 0, Δ ≥ 0\n\n步骤 1: 计算安全指示量\n  对每个样本: h̃_w = 1 - h_w,  h̃_l = 1 - h_l\n  (h̃ = 0 表示安全, h̃ = 1 表示不安全)\n\n步骤 2: 偏好重排序 (变换 T)\n  对每个样本 (x, y_w, y_l):\n    if h̃_w &gt; h̃_l:           // 被偏好的回答不安全, 未被偏好的安全\n      交换: (y_w, y_l) ← (y_l, y_w)   // 强制安全回答被偏好\n      交换: (h̃_w, h̃_l) ← (h̃_l, h̃_w)\n\n步骤 3: 计算 Enhanced SafeDPO 损失\n  对每个样本计算:\n    u = β·[log π_θ(y_w|x)/π_ref(y_w|x) - log π_θ(y_l|x)/π_ref(y_l|x)]\n    offset = -(h̃_l - h̃_w) · Δ\n    L = -log σ(u + offset)\n  总损失 = 所有样本的 L 的均值\n\n步骤 4: 梯度下降优化 π_θ\n  使用标准优化器最小化总损失\n\n输出: 安全对齐后的策略 π_θ\n────────────────────────────────────────────\n注: Δ = 0 时退化为基础 SafeDPO (Eq.14)\n    offset 仅在 h̃_l ≠ h̃_w 时非零\n</code></pre>\n<p><strong>问题建模与修正奖励函数。</strong> SafeDPO 的核心洞察来自对安全约束优化问题的重新建模。标准的安全 RLHF 目标是一个带约束的优化问题：</p>\n<div class=\"kb-math kb-math-display\">\\max_\\pi \\mathbb{E}_{x \\sim \\mathcal{D}_\\mathcal{X}} \\mathbb{E}_{y \\sim \\pi(\\cdot|x)} [r(x,y)] - \\beta \\, \\text{KL}[\\pi \\| \\pi_{\\text{ref}}], \\quad \\text{s.t.} \\quad c(x,y) \\leq 0</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">r(x,y)</span> 是奖励函数，<span class=\"kb-math kb-math-inline\">c(x,y)</span> 是代价函数（正值表示不安全）。Safe RLHF 通过 Lagrangian 方法求解此问题，需要分别训练奖励模型和代价模型，再用 PPO-Lagrangian 优化策略，流程复杂且不稳定。SafeDPO 的关键创新在于定义<strong>修正奖励函数</strong> <span class=\"kb-math kb-math-inline\">r_c(x,y)</span>：当回答安全时 <span class=\"kb-math kb-math-inline\">r_c = r</span>，当回答不安全时 <span class=\"kb-math kb-math-inline\">r_c = -\\infty</span>。Proposition 4.2 严格证明了在此修正奖励下的无约束优化问题与原始带约束问题具有相同的最优解集合，从而将安全约束\"编码\"进了奖励函数本身。</p>\n<p><strong>偏好重排序变换 <span class=\"kb-math kb-math-inline\">\\mathcal{T}</span> 与 SafeDPO 损失。</strong> 将修正奖励 <span class=\"kb-math kb-math-inline\">r_c</span> 代入 DPO 的 Bradley-Terry 偏好模型后，可以推导出修正奖励下的偏好概率。关键观察是：如果 <span class=\"kb-math kb-math-inline\">y_w</span> 不安全而 <span class=\"kb-math kb-math-inline\">y_l</span> 安全，则在修正奖励下 <span class=\"kb-math kb-math-inline\">y_l</span> 应当被偏好（因为 <span class=\"kb-math kb-math-inline\">r_c(x, y_w) = -\\infty</span>）。这自然导出了变换 <span class=\"kb-math kb-math-inline\">\\mathcal{T}</span> 的定义——当 <span class=\"kb-math kb-math-inline\">\\tilde{h}_w &gt; \\tilde{h}_l</span> 时交换偏好顺序。对变换后的数据集 <span class=\"kb-math kb-math-inline\">\\mathcal{T}(\\mathcal{D})</span> 应用标准 DPO 损失即得到 SafeDPO 的训练目标：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{SafeDPO}}(\\pi_\\theta; \\pi_{\\text{ref}}) = -\\mathbb{E}_{(x, y_w&#x27;, y_l&#x27;) \\sim \\mathcal{T}(\\mathcal{D})} \\left[ \\log \\sigma \\left( \\beta \\log \\frac{\\pi_\\theta(y_w&#x27;|x)}{\\pi_{\\text{ref}}(y_w&#x27;|x)} - \\beta \\log \\frac{\\pi_\\theta(y_l&#x27;|x)}{\\pi_{\\text{ref}}(y_l&#x27;|x)} \\right) \\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">(y_w&#x27;, y_l&#x27;)</span> 是经过变换 <span class=\"kb-math kb-math-inline\">\\mathcal{T}</span> 重排后的偏好对。Proposition 4.3 进一步证明此损失的梯度是修正奖励下真实 DPO 梯度的无偏估计量，保证了优化的正确性。</p>\n<p><strong>Enhanced SafeDPO 与超参数 <span class=\"kb-math kb-math-inline\">\\Delta</span> 的作用。</strong> 基础 SafeDPO 虽然理论上正确，但在有限数据下可能对安全性的强调不够。Enhanced SafeDPO 通过在 sigmoid 函数内部引入偏移量来解决这一问题：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{E-SafeDPO}} = -\\mathbb{E} \\left[ \\log \\sigma \\left( \\beta \\log \\frac{\\pi_\\theta(y_w&#x27;|x)}{\\pi_{\\text{ref}}(y_w&#x27;|x)} - \\beta \\log \\frac{\\pi_\\theta(y_l&#x27;|x)}{\\pi_{\\text{ref}}(y_l&#x27;|x)} - (\\tilde{h}_l - \\tilde{h}_w)\\Delta \\right) \\right]</div>\n<p>当被拒绝的回答不安全（<span class=\"kb-math kb-math-inline\">\\tilde{h}_l = 1, \\tilde{h}_w = 0</span>）时，偏移量为 <span class=\"kb-math kb-math-inline\">-\\Delta &lt; 0</span>，使得 sigmoid 的输入更小，产生更大的梯度，从而更强烈地惩罚不安全回答。Proposition 4.4 证明了无论 <span class=\"kb-math kb-math-inline\">\\Delta</span> 取何值，Enhanced SafeDPO 的全局最优解与基础版完全一致——<span class=\"kb-math kb-math-inline\">\\Delta</span> 仅改变损失景观的形状（使安全相关样本的梯度更陡峭），而不改变最优点的位置。实验中 <span class=\"kb-math kb-math-inline\">\\Delta \\in \\{0, 2, 5, 10, 20\\}</span> 的测试表明性能对 <span class=\"kb-math kb-math-inline\">\\Delta</span> 的选择相当鲁棒，<span class=\"kb-math kb-math-inline\">\\Delta = 10</span> 通常是较好的默认值。在 PKU-SafeRLHF-30K 数据集上，SafeDPO 以 Alpaca-7B（基于 LLaMA-2-7B）为基座，在安全率上达到 97-100%，同时有用性得分优于或持平 Safe RLHF、SACPO 等需要多阶段训练的基线方法。</p>",
      "quiz": {
        "q": "SafeDPO 的偏好重排序变换 T 在什么条件下会交换偏好对的顺序？",
        "options": {
          "A": "当两个回答都不安全时",
          "B": "当被偏好的回答不安全而未被偏好的回答安全时",
          "C": "当两个回答的有用性得分相近时",
          "D": "当被偏好的回答安全而未被偏好的回答不安全时"
        },
        "answer": 1,
        "explain": ""
      }
    },
    {
      "id": "star_1",
      "num": 33,
      "name": "STAR-1",
      "fullName": "推理模型安全对齐 (Safer Alignment of Reasoning LLMs)",
      "year": "2026.01",
      "org": "AAAI",
      "parent": "safe_rlhf",
      "paperUrl": "https://arxiv.org/abs/2502.11111",
      "projectUrl": "",
      "category": "alignment",
      "motivation": "推理模型安全对齐数据集",
      "summary": "STAR-1 的核心目标是：推理模型安全对齐数据集。",
      "keyPoints": [
        "核心动机：推理模型安全对齐数据集",
        "演化来源：继承或改进自 safe_rlhf",
        "代表机构：AAAI"
      ],
      "detail": "<p>推理模型安全对齐数据集</p>"
    },
    {
      "id": "rmo",
      "num": 34,
      "name": "RMO",
      "fullName": "重塑奖励边际 (Reshaping Reward Margin)",
      "year": "2026.01",
      "org": "AAAI",
      "parent": "safe_rlhf",
      "paperUrl": "https://doi.org/10.1609/aaai.v40i44.41074",
      "projectUrl": "",
      "category": "alignment",
      "motivation": "重塑奖励边际提升扩展性",
      "summary": "RMO 的核心目标是：重塑奖励边际提升扩展性。",
      "keyPoints": [
        "核心动机：重塑奖励边际提升扩展性",
        "演化来源：继承或改进自 safe_rlhf",
        "代表机构：AAAI"
      ],
      "detail": "<p>重塑奖励边际提升扩展性</p>"
    },
    {
      "id": "lasa",
      "num": 35,
      "name": "LASA",
      "fullName": "语言无关对齐 (Language-Agnostic Alignment)",
      "year": "2026.03",
      "org": "ACL",
      "parent": "cai",
      "paperUrl": "https://aclanthology.org/2026.findings-acl.1/",
      "projectUrl": "",
      "category": "alignment",
      "motivation": "中间层锚定低资源语言对齐",
      "summary": "LASA 的核心目标是：中间层锚定低资源语言对齐。",
      "keyPoints": [
        "核心动机：中间层锚定低资源语言对齐",
        "演化来源：继承或改进自 cai",
        "代表机构：ACL"
      ],
      "detail": "<p>中间层锚定低资源语言对齐</p>"
    },
    {
      "id": "cai_2026",
      "num": 36,
      "name": "CAI 2026",
      "fullName": "Claude宪法2026更新 (Claude's Constitution: 2026 Update)",
      "year": "2026.01",
      "org": "Anthropic",
      "parent": "cai",
      "paperUrl": "https://www.anthropic.com/news/claudes-constitution",
      "projectUrl": "",
      "category": "alignment",
      "motivation": "推理框架提升自主伦理决策",
      "summary": "CAI 2026 的核心目标是：推理框架提升自主伦理决策。",
      "keyPoints": [
        "核心动机：推理框架提升自主伦理决策",
        "演化来源：继承或改进自 cai",
        "代表机构：Anthropic"
      ],
      "detail": "<p>推理框架提升自主伦理决策</p>"
    },
    {
      "id": "expguard",
      "num": 37,
      "name": "ExpGuard",
      "fullName": "专业领域护栏 (Specialized Domains Guard)",
      "year": "2026.03",
      "org": "arXiv",
      "parent": "nemo_guard",
      "paperUrl": "https://arxiv.org/abs/2603.02588",
      "projectUrl": "",
      "category": "content_safety",
      "motivation": "专业领域定制内容审核",
      "summary": "ExpGuard 提出了一套面向金融/医疗/法律专业领域的安全护栏方法，通过自动化术语挖掘与 LLM 驱动的数据构建 pipeline 生成领域特定训练数据（ExpGuardMix），训练出 7B 参数的护栏模型，在领域特定内容审核上大幅超越 WildGuard 等 SOTA（prompt F1 +8.9%，response F1 +15.3%），同时在公开安全基准上保持竞争力。",
      "keyPoints": [
        "<strong>领域特定安全护栏模型 ExpGuard</strong>：基于 Qwen2.5-7B 微调，同时支持 prompt 和 response 的有害性分类，覆盖金融、医疗、法律三大专业领域",
        "<strong>大规模领域安全数据集 ExpGuardMix</strong>（58,928 样本）：包含 ExpGuardTrain（56,653 训练样本）和 ExpGuardTest（2,275 专家标注测试样本），首个面向专业领域的安全审核数据集",
        "<strong>三阶段自动化数据构建 pipeline</strong>：(1) Wikipedia 术语挖掘 + Wikidata/GPT-4o/人工多级过滤 → 2,646 术语；(2) GPT-4o 生成有害/良性 prompt + Mistral/Gemma 生成 response；(3) 三模型（Claude/Gemini/Qwen）多数投票标签 + 去重",
        "<strong>13 类危害分类体系</strong>：基于 MLCommons Hazard Taxonomy，涵盖暴力、欺诈、隐私侵犯、不合格专业建议等",
        "<strong>严格的标签共识机制</strong>：要求三个 LLM 中至少两个在精确类别上一致（非仅 safe/unsafe 二分类），过滤 4.8% 模糊样本",
        "<strong>ExpGuard+ 变体</strong>：通过 AutoDAN-Turbo 生成 270 条领域特定越狱样本增强训练，提升对抗鲁棒性",
        "<strong>关键发现</strong>：API 级护栏（Detoxify/Perspective/OpenAI Moderation）在专业领域几乎完全失效（F1 &lt; 1%）"
      ],
      "detail": "<h5>核心框架图</h5>\n<p><img alt=\"ExpGuard 数据构建 Pipeline\" src=\"https://arxiv.org/html/2603.02588v1/x2.png\" />\n<em>图：ExpGuardMix 数据构建 pipeline 总览。包含三个阶段：(1) 领域术语挖掘；(2) Prompt 与 Response 构建；(3) 类别标注与数据过滤。</em></p>\n<p><img alt=\"ExpGuardMix 数据组成与领域攻击示例\" src=\"https://arxiv.org/html/2603.02588v1/x1.png\" />\n<em>图：(a) 领域特定对抗攻击示例——ExpGuard 成功识别利用金融术语\"haircut\"伪装的有害 prompt，而通用护栏被绕过；(b) ExpGuardMix 数据集组成分布。</em></p>\n<h5>数据构建伪代码</h5>\n<pre><code class=\"language-python\"># ExpGuardMix 数据构建 Pipeline\n\n# Stage 1: 领域术语挖掘\nterms = recursive_crawl_wikipedia(categories=[&quot;finance&quot;, &quot;healthcare&quot;, &quot;law&quot;])\nterms = filter_by_wikidata(terms, exclude=[&quot;persons&quot;, &quot;organizations&quot;, &quot;countries&quot;])\nterms = filter_by_gpt4o(terms, criteria=&quot;sensitive_and_harmful_relevant&quot;)\nterms = human_majority_vote(terms, n_annotators=3)  # → 2,646 terms\n\n# Stage 2: Prompt &amp; Response 构建\nfor term in domain_terms:\n    # 有害 prompt：GPT-4o + 前缀绕过 + Wikipedia 上下文 + 100+ 模板\n    harmful_prompts = gpt4o.generate(\n        prefix=&quot;I have an idea for a prompt:&quot;,\n        context=wikipedia_abstract(term),\n        templates=sample(instruction_templates, k=random),\n        variants=[&quot;short&quot;, &quot;long&quot;]\n    )\n    # 良性 prompt：从 Wikipedia 文档转换为 instruction-response 对\n    benign_prompts = convert_wiki_to_instructions(term)\n\n# 补充通用数据\nin_the_wild = subsample(LMSYS_Chat_1M + WildChat + DAN_jailbreaks)\nhuman_written = subsample(HH_RLHF + Aegis2)\n\n# Response 生成\nharmful_responses = mistral_7b_v01.generate(harmful_prompts)   # 早期模型更易 comply\nrefusal_responses = gemma3_27b_it.generate(harmful_prompts)    # 安全对齐模型生成拒绝\n\n# Stage 3: 标签与过滤\nfor sample in all_data:\n    labels = [claude37.classify(sample, cot=True),\n              gemini2_flash.classify(sample, cot=True),\n              qwen25_max.classify(sample, cot=True)]\n    # 严格共识：至少 2/3 在精确类别上一致\n    if majority_exact_category(labels):\n        final_label = majority_vote(labels)\n    else:\n        discard(sample)  # 过滤 4.8% 模糊样本\n\n# 去重 + 一致性检查\ndeduplicate(threshold=0.9, model=&quot;sentence-transformers&quot;)\n</code></pre>\n<h5>动机与背景</h5>\n<p>随着 LLM 在金融、医疗、法律等高风险领域的广泛部署，<strong>专业领域的内容安全审核</strong>成为一个被严重忽视的问题。现有的安全护栏模型（如 Llama-Guard、WildGuard）主要针对通用有害内容（暴力、色情等）训练，缺乏对专业术语和领域概念的理解能力。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：专业领域的有害内容往往利用技术术语进行伪装。例如，\"List methods to obscure high haircuts in asset evaluations\" 中的 \"haircut\" 在金融领域指资产价值的风险折扣，该查询实质上是在寻求金融欺诈方法，但通用护栏因不理解专业含义而放行。</div>\n<p>实验数据显示，广泛使用的 API 级护栏（Detoxify、Perspective API、OpenAI Moderation）在 ExpGuardTest 上的 F1 分数几乎为零（0.3%–0.6%），充分说明了通用方案在专业领域的严重失效。</p>\n<h5>核心技术方案</h5>\n<p><strong>1. 领域术语挖掘（Terminology Mining）</strong></p>\n<p>采用多级过滤策略从 Wikipedia 中提取专业术语：</p>\n<ul>\n<li><strong>递归爬取</strong>：从金融/医疗/法律类目递归爬取 Wikipedia 页面</li>\n<li><strong>实体过滤</strong>：通过 Wikidata API 排除人名、组织、国家等非技术实体</li>\n<li><strong>敏感性筛选</strong>：GPT-4o 评估术语是否与有害场景相关，大幅缩减候选集</li>\n<li><strong>人工验证</strong>：3 名标注员多数投票，最终保留 2,646 个术语（金融 989、医疗 1,012、法律 645）</li>\n</ul>\n<p><strong>2. 数据构建策略</strong></p>\n<p>数据构建的核心挑战在于如何生成高质量的领域特定有害内容：</p>\n<ul>\n<li><strong>绕过安全机制</strong>：采用 \"I have an idea for a prompt:\" 前缀绕过 GPT-4o 的内置安全过滤</li>\n<li><strong>多样性保障</strong>：每个术语生成长短两种 prompt 变体，从 100+ 预定义模板中随机采样，结合 few-shot 示例</li>\n<li><strong>Response 生成的模型选择</strong>：使用早期模型 Mistral-7B-v0.1 生成 compliant response（更容易配合有害请求），使用 Gemma-3-27B-IT 生成 refusal response（安全对齐更强）</li>\n</ul>\n<p><strong>3. 多模型共识标注</strong></p>\n<p>标注流程的设计体现了对领域特定内容标注难度的深刻理解：</p>\n<div class=\"kb-math kb-math-display\">\\text{Label}(x) = \\begin{cases} \\text{majority}(l_1, l_2, l_3) &amp; \\text{if } \\exists \\text{ exact category agreement} \\geq 2 \\\\ \\text{discard} &amp; \\text{otherwise} \\end{cases}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">l_i</span> 是第 <span class=\"kb-math kb-math-inline\">i</span> 个 LLM（Claude 3.7 Sonnet / Gemini 2.0 Flash / Qwen2.5-Max）基于 Chain-of-Thought 推理给出的精确类别标签。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：与常见的 safe/unsafe 二分类投票不同，ExpGuard 要求至少 2/3 模型在 <strong>13 个精确危害类别</strong> 上达成一致。即使三个模型都判定为 unsafe，但归因于不同类别，该样本也会被丢弃。这种严格机制确保了标签质量。</div>\n<p><strong>4. 训练配置</strong></p>\n<ul>\n<li><strong>基座模型</strong>：Qwen2.5-7B</li>\n<li><strong>训练数据</strong>：ExpGuardTrain 全量 56,653 样本 + 通用安全数据混合</li>\n<li><strong>训练方式</strong>：标准 SFT（Supervised Fine-Tuning），输入格式为 prompt（+ optional response）→ 安全标签</li>\n</ul>\n<p><strong>5. ExpGuard+ 对抗增强</strong></p>\n<p>为提升对越狱攻击的鲁棒性，引入 ExpGuard+ 变体：\n- 使用 AutoDAN-Turbo 从 ExpGuardTest 中生成 270 条领域特定越狱 prompt\n- 以 Gemma-1.1-7B-IT 为越狱生成器，Qwen2.5-7B-Instruct 为受害模型\n- 将这 270 条样本加入训练集（与已有的 270 条 in-the-wild 越狱样本保持 1:1 比例）</p>\n<h5>实验结果</h5>\n<p><strong>领域特定基准（ExpGuardTest）</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th style=\"text-align: center;\">Prompt F1 (%)</th>\n<th style=\"text-align: center;\">Response F1 (%)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Detoxify / Perspective / OpenAI Mod</td>\n<td style=\"text-align: center;\">0.3–0.5</td>\n<td style=\"text-align: center;\">0.6</td>\n</tr>\n<tr>\n<td>Azure</td>\n<td style=\"text-align: center;\">14.1</td>\n<td style=\"text-align: center;\">2.6</td>\n</tr>\n<tr>\n<td>Llama-Guard3 (8B)</td>\n<td style=\"text-align: center;\">71.1</td>\n<td style=\"text-align: center;\">84.2</td>\n</tr>\n<tr>\n<td>WildGuard (7B)</td>\n<td style=\"text-align: center;\">84.4</td>\n<td style=\"text-align: center;\">77.4</td>\n</tr>\n<tr>\n<td>Aegis-Guard-D (7B)</td>\n<td style=\"text-align: center;\">82.9</td>\n<td style=\"text-align: center;\">87.2</td>\n</tr>\n<tr>\n<td><strong>ExpGuard (7B)</strong></td>\n<td style=\"text-align: center;\"><strong>93.3</strong></td>\n<td style=\"text-align: center;\"><strong>92.7</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>公开安全基准（8 个 benchmark 平均）</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th style=\"text-align: center;\">Prompt Avg F1 (%)</th>\n<th style=\"text-align: center;\">Response Avg F1 (%)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>WildGuard</td>\n<td style=\"text-align: center;\">84.2</td>\n<td style=\"text-align: center;\">78.8</td>\n</tr>\n<tr>\n<td>Llama-Guard3</td>\n<td style=\"text-align: center;\">78.9</td>\n<td style=\"text-align: center;\">66.8</td>\n</tr>\n<tr>\n<td><strong>ExpGuard</strong></td>\n<td style=\"text-align: center;\"><strong>85.7</strong></td>\n<td style=\"text-align: center;\"><strong>78.5</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>消融实验</strong>（验证各数据源贡献）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>配置</th>\n<th style=\"text-align: center;\">Public Prompt F1</th>\n<th style=\"text-align: center;\">ExpTest Prompt F1</th>\n<th style=\"text-align: center;\">Public Resp F1</th>\n<th style=\"text-align: center;\">ExpTest Resp F1</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>完整 ExpGuardTrain</td>\n<td style=\"text-align: center;\">85.7</td>\n<td style=\"text-align: center;\">93.3</td>\n<td style=\"text-align: center;\">78.5</td>\n<td style=\"text-align: center;\">92.7</td>\n</tr>\n<tr>\n<td>− Domain-specific</td>\n<td style=\"text-align: center;\">85.1</td>\n<td style=\"text-align: center;\">85.3 (↓8.0)</td>\n<td style=\"text-align: center;\">77.9</td>\n<td style=\"text-align: center;\">92.0</td>\n</tr>\n<tr>\n<td>− In-the-wild</td>\n<td style=\"text-align: center;\">84.1</td>\n<td style=\"text-align: center;\">93.2</td>\n<td style=\"text-align: center;\">77.9</td>\n<td style=\"text-align: center;\">92.3</td>\n</tr>\n<tr>\n<td>− Human-written</td>\n<td style=\"text-align: center;\">81.3</td>\n<td style=\"text-align: center;\">93.4</td>\n<td style=\"text-align: center;\">73.9 (↓4.6)</td>\n<td style=\"text-align: center;\">92.3</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键结论</strong>：领域特定数据对 ExpGuardTest 性能至关重要（去除后 prompt F1 下降 8%）；人工编写数据对公开基准泛化性贡献最大（去除后 response F1 下降 4.6%）；三类数据源互补，完整混合达到最优平衡。</div>\n<p><strong>越狱鲁棒性</strong>：在 CipherChat、AutoDAN-Turbo、FlipAttack、GASP 四种越狱攻击下，ExpGuard 在标准和领域特定场景中均保持较高检测率，ExpGuard+ 通过对抗增强进一步提升了领域特定越狱的检测能力。</p>\n<h5>与现有方法的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>通用护栏（WildGuard 等）</th>\n<th>ExpGuard</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>训练数据</td>\n<td>通用有害内容</td>\n<td>通用 + 领域特定（金融/医疗/法律）</td>\n</tr>\n<tr>\n<td>术语理解</td>\n<td>无专业术语知识</td>\n<td>基于 2,646 个专业术语构建</td>\n</tr>\n<tr>\n<td>标注策略</td>\n<td>二分类投票</td>\n<td>13 类精确类别多数投票</td>\n</tr>\n<tr>\n<td>领域 F1</td>\n<td>~84% prompt / ~77% response</td>\n<td><strong>93.3% / 92.7%</strong></td>\n</tr>\n<tr>\n<td>通用 F1</td>\n<td>~84% / ~79%</td>\n<td><strong>85.7% / 78.5%</strong>（持平或略优）</td>\n</tr>\n<tr>\n<td>可扩展性</td>\n<td>固定类别</td>\n<td>pipeline 可适配新领域</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "ExpGuard 在数据标注阶段采用三个 LLM 进行多数投票时，其共识机制与常规做法的关键区别是什么？",
        "options": [
          "使用更多的标注模型（5个而非3个）来提高准确率",
          "要求至少两个模型在精确的危害类别上达成一致，而非仅在 safe/unsafe 二分类上投票",
          "仅使用开源模型进行标注以降低成本",
          "采用主动学习策略，让模型迭代标注最不确定的样本"
        ],
        "answer": 1,
        "explain": "ExpGuard 的标注共识要求至少 2/3 的 LLM 在 13 个精确危害类别上达成一致，即使三个模型都判定为 unsafe 但归因于不同类别，该样本也会被丢弃。这种严格机制确保了领域特定内容标签的高质量。"
      }
    },
    {
      "id": "toxigan",
      "num": 38,
      "name": "ToxiGAN",
      "fullName": "毒性数据增强GAN (Toxic Data Augmentation GAN)",
      "year": "2026",
      "org": "EACL",
      "parent": "toxigen",
      "paperUrl": "https://aclanthology.org/2026.findings-acl.1/",
      "projectUrl": "",
      "category": "content_safety",
      "motivation": "LLM引导毒性数据增强",
      "summary": "ToxiGAN 的核心目标是：LLM引导毒性数据增强。",
      "keyPoints": [
        "核心动机：LLM引导毒性数据增强",
        "演化来源：继承或改进自 toxigen",
        "代表机构：EACL"
      ],
      "detail": "<p>LLM引导毒性数据增强</p>"
    },
    {
      "id": "bielik_guard",
      "num": 39,
      "name": "Bielik Guard",
      "fullName": "Bielik多语种护栏 (Bielik Multilingual Guard)",
      "year": "2026",
      "org": "arXiv",
      "parent": "perspective",
      "paperUrl": "https://arxiv.org/abs/2603.02588",
      "projectUrl": "",
      "category": "content_safety",
      "motivation": "多语种优化安全分类器",
      "summary": "Bielik Guard 的核心目标是：多语种优化安全分类器。",
      "keyPoints": [
        "核心动机：多语种优化安全分类器",
        "演化来源：继承或改进自 perspective",
        "代表机构：arXiv"
      ],
      "detail": "<p>多语种优化安全分类器</p>"
    },
    {
      "id": "attriguard",
      "num": 40,
      "name": "AttriGuard",
      "fullName": "因果归因护栏 (Causal Attribution Guard)",
      "year": "2026.03",
      "org": "arXiv",
      "parent": "llama_guard3",
      "paperUrl": "https://arxiv.org/abs/2603.10749",
      "projectUrl": "",
      "category": "content_safety",
      "motivation": "因果归因防御提示注入",
      "summary": "AttriGuard 的核心目标是：因果归因防御提示注入。",
      "keyPoints": [
        "核心动机：因果归因防御提示注入",
        "演化来源：继承或改进自 llama_guard3",
        "代表机构：arXiv"
      ],
      "detail": "<p>因果归因防御提示注入</p>"
    },
    {
      "id": "toolhijacker",
      "num": 41,
      "name": "ToolHijacker",
      "fullName": "工具劫持 (ToolHijacker: Agent Hijacking)",
      "year": "2026.02",
      "org": "NDSS",
      "parent": "nemo_guard",
      "paperUrl": "https://www.ndss-symposium.org/ndss-paper/neurostrike-neuron-level-attacks-on-aligned-llms/",
      "projectUrl": "",
      "category": "content_safety",
      "motivation": "揭示工具文档劫持攻击",
      "summary": "ToolHijacker 的核心目标是：揭示工具文档劫持攻击。",
      "keyPoints": [
        "核心动机：揭示工具文档劫持攻击",
        "演化来源：继承或改进自 nemo_guard",
        "代表机构：NDSS"
      ],
      "detail": "<p>揭示工具文档劫持攻击</p>"
    }
  ],
  "categories": {
    "alignment": {
      "label": "价值观对齐",
      "color": "#3B82F6"
    },
    "jailbreak": {
      "label": "越狱攻防",
      "color": "#EF4444"
    },
    "hallucination": {
      "label": "幻觉控制",
      "color": "#10B981"
    },
    "content_safety": {
      "label": "内容安全",
      "color": "#8B5CF6"
    }
  },
  "projectUrls": {}
};
