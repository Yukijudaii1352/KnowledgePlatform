/**
 * prompt_engineering-data.js — 由 pipeline/build.py 于 2026-06-16 17:00:17 自动生成。
 * 源文件：content/llm/prompt_engineering.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "llm",
    "topic_id": "prompt_engineering",
    "topic_name": "提示词工程",
    "page_title": "提示词工程 算法总结",
    "page_subtitle": "2026-06-16 版",
    "page_desc": "系统性梳理从基础Prompt设计到思维链(CoT)、自动化提示优化及2026年最新前沿技术的演进脉络。",
    "page_icon": "✍️",
    "hero_pills": [
      "Prompt设计 · 思维链 · 提示优化"
    ],
    "count_pill": "{count} 个算法",
    "image_base": "",
    "overview_from_doc": true,
    "latest_overview_from_doc": true
  },
  "overview": [
    {
      "title": "",
      "body_html": "<h1>提示词工程（Prompt Engineering）：从构建到自动优化 ——技术发展阶段、趋势（类综述）（内附十八篇提示词工程相关论文链接）</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/1961509068817532548\">https://zhuanlan.zhihu.com/p/1961509068817532548</a></li>\n<li>作者: Alongsin</li>\n</ul>\n<hr />\n<p>提示词工程（Prompt Engineering）：从构建到自动优化 ——技术发展阶段、趋势（类综述）（内附十八篇提示词工程相关论文链接）</p>\n<h1>提示词工程（Prompt Engineering）：从构建到自动优化 ——技术发展阶段、趋势（类综述）（内附十八篇提示词工程相关论文链接）</h1>\n<p>作者: Alongsin, 赞: 6</p>\n<blockquote>\n<p>十八篇提示词工程相关论文链接在文末。</p>\n</blockquote>\n<h2>一、提示词工程越来越重要</h2>\n<p>随着大型语言模型（LLMs）能力爆炸式增长，人们发现<strong>提示词设直接决定模型输出的可靠性、可控性与效率</strong>。正确的提示既能把“通用”模型瞬间变成领域专家，也能显著减少后处理与微调的成本。</p>\n<h2>二、提示词构建的基础概念（技术+通俗解释 + 示例）</h2>\n<h3>1) System / Role / Instruction（系统、角色、指令）</h3>\n<ul>\n<li>把模型的行为约束写入不同层次（system message、assistant role、user instruction），以形成长短期上下文与权限分层。</li>\n<li>简单来说，就是相当于给模型发一张“工作说明书”（system），再给一个“扮演角色”（role），然后问问题（user）。</li>\n<li>\n<p>示例：</p>\n</li>\n<li>\n<p>System: “你是一个法律助理，只能引用法律条文并且每条答案需列出来源和条款号。”</p>\n</li>\n<li>User: “请说明合同解除的四种法定情形并列举示例。”</li>\n</ul>\n<h3>2) Zero-shot / Few-shot / k-shot（零样例／少样例）</h3>\n<ul>\n<li>零样例直接给任务描述；few-shot 在上下文中插入示例（exemplars），帮助模型“在上下文中学习”任务格式与风格。</li>\n<li>简单来说就是，不给演示 vs 给几条示范答案让模型模仿。</li>\n<li>\n<p>示例（few-shot）：</p>\n</li>\n<li>\n<p>示例1: Q: “把句子改成被动语态” →A: “原句被转换后……”</p>\n</li>\n<li>给出3个示范后再发真实问题，模型更可能按示例格式输出。</li>\n</ul>\n<h3>3) Prompt Template（模板化）</h3>\n<ul>\n<li>把提示词分为模板变量（task, context, examples, constraints），便于程序化地对大量输入批量生成 prompt。</li>\n<li>简单表述：把常用 prompt 做成可插槽的表格，方便复用。</li>\n<li>\n<p>示例：</p>\n</li>\n<li>\n<p>模板：<code>[ROLE]你是{role}。请将下面文本翻译为{lang}：{text}</code></p>\n</li>\n</ul>\n<h3>4) Constraint / Output Format / Safety（约束与格式）</h3>\n<ul>\n<li>在prompt中强制输出格式、token限制、验证步骤或禁用主题以控制风险和对齐。</li>\n<li>简单说：告诉模型“只给三点、每点不超过两句话、JSON格式返回”。</li>\n<li>\n<p>示例：</p>\n</li>\n<li>\n<p>“请用JSON返回：{“summary”:“”, “key_points”:[“”,“”], “confidence”:0.0}”</p>\n</li>\n</ul>\n<h2>三、启发与推理类提示（让模型“像人一样思考”）</h2>\n<h3>1) Chain-of-Thought（CoT，链式思维）</h3>\n<ul>\n<li>通过促使模型“把中间推理步骤写出来”，模型在复杂推理、数学题与逻辑题上准确率大幅提升。</li>\n<li>简单来说就是让模型“把脑子里想到的过程也写出来”，而不是只写结论。</li>\n<li>\n<p>示例：</p>\n</li>\n<li>\n<p>“请显示你的所有推理步骤，然后给出最终答案。”</p>\n</li>\n</ul>\n<p>（注：CoT 是目前常见的基础技巧，适用于需要显式演算或分步推理的问题）</p>\n<h3>2) Self-Consistency / 多样化抽样</h3>\n<ul>\n<li>运行多次带 CoT 的生成并对多个解答进行合并/多数投票，以提升可靠性与鲁棒性。</li>\n<li>多次让模型“思考”，然后选出现频率最高的答案。</li>\n<li>\n<p>示例：</p>\n</li>\n<li>\n<p>对一道数学题进行20次生成，选择最常出现的结果作为最终答案。</p>\n</li>\n</ul>\n<h3>3) Tree of Thoughts（ToT，思想树）</h3>\n<ul>\n<li>将推理空间从线性链（CoT）扩展到“树”结构，模型在每个节点生成多个“thoughts（部分解）”，并进行价值评估与回溯搜索，从而做策略性探索。实验证明在特定复杂问题上能显著超越 CoT。</li>\n<li>这个方法不是沿一条思路走到头，而是在各个可能的想法之间分叉、比较、回退，像人做复杂问题时的“思路搜索”。</li>\n<li>\n<p>示例（简化）：</p>\n</li>\n<li>\n<p>问题：设计一个3步策略让机器人从A到B避开障碍。</p>\n</li>\n<li>步骤：模型先提出3个可行子计划（分支），对每个子计划继续展开下一级备选，然后用“价值提示”评估哪些分支更优，最终选择最稳健的路径。</li>\n</ul>\n<h3>4) Layer-of-Thoughts（LoT，分层思维/层次约束）</h3>\n<ul>\n<li>LoT 提出用<strong>层级约束与检索</strong>（constraint hierarchies）对候选回答进行分层过滤与精炼，以增强解释性与检索式任务的准确度。该方向已被近期论文提出并用于结构化检索与多轮交互场景。</li>\n<li>把“想法”分层：先横向列出候选，再垂直用规则一层层筛，最后输出被筛选过的最佳答案。</li>\n<li>\n<p>示例：</p>\n</li>\n<li>\n<p>场景：医学问答：层1 生成诊断候选；层2 用证据检索比对每个候选；层3 输出带证据链的诊断结论。</p>\n</li>\n</ul>\n<h3>5) BloomWise（认知启发式提示）</h3>\n<ul>\n<li>BloomWise 是一种受认知心理学启发的提示方法，强调“引导模型如何思考而非直接告诉结论”，并把解题过程分成更接近人类高阶认知的步骤以提高数学/逻辑题的可解释性与准确性。</li>\n<li>不告诉模型“答案是什么”，而是教它“用什么思路去找答案”——类似教学生解题方法而不是直接给答案。</li>\n<li>\n<p>示例：</p>\n</li>\n<li>\n<p>数学题：先要求模型“识别变量与约束”，再要求“列出可能的策略”，最后逐一检验策略。</p>\n</li>\n</ul>\n<h2>四、示例驱动与示范策略（如何通过示例提升表现）</h2>\n<h3>1) Auto-Demo Prompting（自动示范）</h3>\n<ul>\n<li>在 batch prompting 场景中，Auto-Demo 利用批处理中前面问题的“模型输出”作为后续问题的示范，从而形成“在线 few-shot”的效果，以缓解批处理时上下文长度增加导致的性能退化。该方法桥接了 batch prompting 与 few-shot 的优势。</li>\n<li>也就是说在一组问题里，先把模型自己做过的好例子当示范给后面的问题看，让模型“自举”表现更好。</li>\n<li>\n<p>示例：</p>\n</li>\n<li>\n<p>批量批改作文：先让模型批改第一篇作文并输出评分与理由，把该输出作为示范再给第二篇，逐步提高一致性。</p>\n</li>\n</ul>\n<h3>2) Demonstration Selection（示例选择）</h3>\n<ul>\n<li>从候选示例池中选择与当前输入最相关或能最大提升任务指标的示例（基于向量相似度、困惑度或策略搜索）通常要优于随机示例。</li>\n<li>不是随便放示范，而是选“和当前问题最像”的几个示范。</li>\n<li>\n<p>示例：</p>\n</li>\n<li>\n<p>用语义向量检索最相似的示范问答，放在 prompt 前部作为 few-shot exemplars。</p>\n</li>\n</ul>\n<h2>五、自动化 / 优化类方法（APO：Automatic Prompt Optimization）</h2>\n<blockquote>\n<p>这部分是近几年研究热点：从手工设计转向自动搜索、优化与学习 prompt。</p>\n</blockquote>\n<p>在早期，提示工程（Prompt Engineering）主要依赖“直觉 + 人工测试”——写一句提示，看看模型回答如何。但随着任务复杂化（尤其是在多轮对话、推理或决策场景中），研究者意识到：<strong>提示也需要被科学地评估、诊断与优化</strong>。</p>\n<p>这个部分是提示词工程研究中比较<strong>前沿</strong>也比较<strong>抽象</strong>的部分。它的关键在于<strong>让模型自动学习怎么写更好的提示词。</strong></p>\n<p>到了这个阶段，我们不再用手工改 prompt，而是让模型或算法自动试、自动改、自动评估，像「提示词的 A/B 测试系统」。</p>\n<h3>优化类方法：</h3>\n<h3>1. AMPO（Automatic Multi-Branched Prompt Optimization）</h3>\n<p><strong>核心思想：</strong> 自动为复杂任务生成多个风格分支（branches），并通过表现反馈筛掉差的、保留优的。</p>\n<h3>🔹场景示例：</h3>\n<blockquote>\n<p>你想让模型写<strong>产品营销文案</strong>，要求能适配不同受众（比如学生、职场人、家长）。 <br />\n人工做法是自己写 3 个不同语气的 prompt。 <br />\nAMPO 则会自动生成这些“风格分支”，并评估哪个版本效果最好。</p>\n</blockquote>\n<h3>🔹实际过程：</h3>\n<ul>\n<li><strong>初始 prompt：</strong></li>\n</ul>\n<blockquote>\n<p>“请为一款智能手表写一段推广文案。”</p>\n</blockquote>\n<ul>\n<li><strong>AMPO 自动生成的三个分支：</strong></li>\n</ul>\n<blockquote>\n<p><strong>Branch A（学生版）</strong>：“请用轻松、潮流的语气介绍这款智能手表，强调学习和健身功能。”<br />\n<strong>Branch B（职场版）</strong>：“请用专业、简洁的语气撰写产品介绍，突出时间管理和健康监测。”<br />\n<strong>Branch C（家长版）</strong>：“请用亲切、温和的语气撰写文案，强调安全定位与健康提醒。”</p>\n</blockquote>\n<ul>\n<li><strong>系统自动生成内容并评估指标（如点击率预测模型、情感得分等）</strong>。</li>\n</ul>\n<blockquote>\n<p>结果：Branch B 的内容在多维评估中表现最佳。</p>\n</blockquote>\n<ul>\n<li><strong>最终输出：</strong></li>\n</ul>\n<blockquote>\n<p>“AMPO 选择并融合最佳分支（B），输出优化后的统一 prompt： <code>请用专业但友好的语气，撰写一款兼顾健康监测与学习提醒功能的智能手表推广文案。</code>”</p>\n</blockquote>\n<p><strong>💡效果：</strong> 模型能自动学会“不同受众 → 不同语气”，最后合成为表现最优版本。</p>\n<h3>2. StablePrompt（稳定强化学习优化）</h3>\n<p><strong>核心思想：</strong> 把 prompt 调优当作强化学习问题，通过试错优化，确保模型输出稳定、鲁棒。</p>\n<h3>🔹场景示例：</h3>\n<blockquote>\n<p>任务：你要让模型回答“技术面试问题”，并且始终保持专业、简洁、不跑题。 <br />\n问题：模型有时回答太长、有时偏题。</p>\n</blockquote>\n<h3>🔹实际过程：</h3>\n<ul>\n<li><strong>初始 prompt：</strong></li>\n</ul>\n<blockquote>\n<p>“你是面试官，请回答以下技术问题。” <br />\n模型回答：内容太啰嗦或重复。</p>\n</blockquote>\n<ul>\n<li><strong>StablePrompt 系统流程：</strong></li>\n</ul>\n<blockquote>\n<p>系统会尝试不同版本的提示（如添加“限字数”、“结构要求”）。<br />\n通过“奖励模型”打分（比如：答案是否简洁、是否包含核心技术点）。<br />\n使用强化学习算法（如 APPO）更新 prompt 版本。<br />\n训练 10~20 轮后收敛到最优 prompt。</p>\n</blockquote>\n<ul>\n<li><strong>最终学习到的优化 prompt：</strong></li>\n</ul>\n<blockquote>\n<p>“你是面试官。请在 80 字内回答以下技术问题，只解释核心原理，不列出清单或背景。”</p>\n</blockquote>\n<ul>\n<li><strong>结果对比：</strong></li>\n</ul>\n<blockquote>\n<p>优化前回答： “在面试中，常见的问题包括……（500字）”<br />\n优化后回答： “哈希表通过键映射实现O(1)查找，冲突通过链地址法或开放定址解决。”</p>\n</blockquote>\n<p><strong>💡效果：</strong> 让模型的输出更一致、更稳定，不因任务或随机性而偏离目标。</p>\n<h3>3. CriSPO（Critique–Suggestion Guided Prompt Optimization）</h3>\n<p><strong>核心思想：</strong> 模型自动扮演“审稿人”，先批评 prompt，再提出修改建议，最后自我改进。</p>\n<h3>🔹场景示例：</h3>\n<blockquote>\n<p>任务：你希望模型总结新闻内容，但发现它有时太笼统、没重点。</p>\n</blockquote>\n<h3>🔹实际过程：</h3>\n<ul>\n<li><strong>初始 prompt：</strong></li>\n</ul>\n<blockquote>\n<p>“请帮我总结下面这篇新闻。”</p>\n</blockquote>\n<ul>\n<li><strong>模型输出：</strong></li>\n</ul>\n<blockquote>\n<p>“这篇新闻讲述了科技领域的新发展。”（太模糊）</p>\n</blockquote>\n<ul>\n<li><strong>CriSPO 自动触发批评模块：</strong></li>\n</ul>\n<blockquote>\n<p>批评 (Critique)： “输出缺乏关键事实，未提及新闻主体与事件背景。”<br />\n建议 (Suggestion)： “在 prompt 中明确要求提取‘谁、做了什么、影响是什么’。”</p>\n</blockquote>\n<p><strong>自动改进后的 prompt：</strong></p>\n<blockquote>\n<p>“请总结下面的新闻内容，重点包括：①新闻主体；②关键事件；③影响或结果，每项不超过15字。”</p>\n</blockquote>\n<ul>\n<li><strong>新输出：</strong></li>\n</ul>\n<blockquote>\n<p>“苹果发布首款量子芯片，推动AI算力革新。”</p>\n</blockquote>\n<p><strong>💡效果：</strong> 模型能自动找到 prompt 的问题，并改出更高质量版本。 就像“写作教练”帮助学生改作文一样。</p>\n<h3>4. StraGo（Strategic Guidance Prompting）</h3>\n<p><strong>核心思想：</strong> 给模型“策略层指导”，而不是简单地让它完成任务。 它会先规划、再行动，逐层生成结果。</p>\n<h3>🔹场景示例：</h3>\n<blockquote>\n<p>任务：生成一个<strong>公司品牌重塑方案</strong>。 问题：普通 prompt 容易一次性吐出杂乱答案。</p>\n</blockquote>\n<h3>🔹实际过程：</h3>\n<ul>\n<li><strong>普通 prompt：</strong></li>\n</ul>\n<blockquote>\n<p>“帮我写一个公司品牌重塑计划。” → 输出：一堆散乱的建议（改Logo、改口号、改广告…）</p>\n</blockquote>\n<ul>\n<li><strong>StraGo 提示结构：</strong></li>\n</ul>\n<blockquote>\n<p><strong>策略层提示：</strong> “先分三个阶段（诊断、定位、执行）规划品牌重塑策略。”<br />\n<strong>执行层提示：</strong> “在每个阶段下，列出3个关键行动步骤。”</p>\n</blockquote>\n<ul>\n<li><strong>生成结果：</strong></li>\n</ul>\n<blockquote>\n<p>阶段一：品牌诊断 → 调研消费者印象 / 分析旧口号 / 评估视觉系统<br />\n阶段二：品牌定位 → 制定新核心价值 / 设计语气调性 / 选择传播渠道<br />\n阶段三：执行 → 试投放广告 / 收集反馈 / 监测ROI</p>\n</blockquote>\n<p><strong>💡效果：</strong> StraGo 让 prompt 像“策略地图”，引导模型分阶段输出，逻辑清晰、可执行。</p>\n<h3>5. Meta-Prompting（元提示）</h3>\n<p><strong>核心思想：</strong> 让模型自己写 prompt，也让它自己评估、修正。 即“模型做自己的提示工程师”。</p>\n<h3>🔹场景示例：</h3>\n<blockquote>\n<p>任务：你发现模型在“生成论文摘要”时经常啰嗦。 你想让模型帮你生成一个更有效的 prompt，让它自己纠正问题。</p>\n</blockquote>\n<h3>🔹实际过程：</h3>\n<ul>\n<li><strong>指令：</strong></li>\n</ul>\n<blockquote>\n<p>“以下 prompt 导致模型输出太长。请你作为提示工程师，重新设计一个更简洁的 prompt，并说明修改理由。 Prompt: ‘请总结以下论文内容。’”</p>\n</blockquote>\n<ul>\n<li><strong>模型输出（优化后的 prompt 与说明）：</strong></li>\n</ul>\n<pre><code>新 Prompt:\n   “请在100字内总结以下论文，仅包含研究目的、方法和主要结论。”\n\n   修改理由:\n   - 增加了字数限制，避免冗长。\n   - 指定结构（目的-方法-结论），确保摘要紧凑。\n</code></pre>\n<ul>\n<li><strong>验证：</strong></li>\n</ul>\n<blockquote>\n<p>原输出：300字，内容重复。<br />\n新输出： “本文研究AI提示优化，通过自动搜索与评估策略提升任务表现。”</p>\n</blockquote>\n<p><strong>💡效果：</strong> 模型能“教自己怎么被问”，形成 prompt 自我改进循环。</p>\n<h3>6. Auto-Demo Prompting（自动示范提示）</h3>\n<p><strong>核心思想：</strong> 让模型在一批任务中用<strong>自己的好答案</strong>当作后续任务的示范。</p>\n<h3>🔹场景示例：</h3>\n<blockquote>\n<p>任务：你要用模型批量改写新闻标题。 问题：模型风格不统一，有的太夸张、有的太平淡。</p>\n</blockquote>\n<h3>🔹实际过程：</h3>\n<ul>\n<li><strong>前几条生成结果：</strong></li>\n</ul>\n<blockquote>\n<p>输入1：“AI公司融资10亿” → 模型输出：“AI独角兽获10亿融资，加速布局全球。” ✅（高质量）<br />\n输入2：“新能源车销量创新高” → 模型输出：“新能源车火爆！销量再创新纪录。” ❌（太口语）</p>\n</blockquote>\n<ul>\n<li><strong>Auto-Demo 系统操作：</strong></li>\n</ul>\n<blockquote>\n<p>把“高质量答案”自动选为示范样本。<br />\n接下来的 prompt 自动包含这条示范：<br />\n<strong>示例：</strong> <br />\n输入：<br />\nAI公司融资10亿 输出：AI独角兽获10亿融资，加速布局全球。 --- 现在请改写以下标题，保持相同语气风格： 输入：新能源车销量创新高</p>\n</blockquote>\n<ul>\n<li><strong>结果：</strong></li>\n</ul>\n<blockquote>\n<p>“新能源车销量再创新高，智能出行迎来爆发期。”</p>\n</blockquote>\n<p><strong>💡效果：</strong> 模型“学习自己最好的例子”，逐步风格统一、质量提升。</p>\n<h2>📘 图示</h2>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>思想</th>\n<th>自动动作</th>\n<th>最典型应用</th>\n<th>示例关键词</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>AMPO</td>\n<td>多分支搜索</td>\n<td>自动分支生成 + 筛选</td>\n<td>文案、翻译、客服多风格</td>\n<td>“学生/职场/家长版文案”</td>\n</tr>\n<tr>\n<td>StablePrompt</td>\n<td>强化学习</td>\n<td>用奖励稳定Prompt表现</td>\n<td>面试问答、客服机器人</td>\n<td>“简洁稳定输出”</td>\n</tr>\n<tr>\n<td>CriSPO</td>\n<td>批评-建议循环</td>\n<td>模型自我批评再改写</td>\n<td>摘要、问答、教学任务</td>\n<td>“总结太模糊 → 自动精炼”</td>\n</tr>\n<tr>\n<td>StraGo</td>\n<td>策略分层</td>\n<td>规划式生成</td>\n<td>项目策划、写作</td>\n<td>“分阶段输出”</td>\n</tr>\n<tr>\n<td>Meta-Prompting</td>\n<td>模型写Prompt</td>\n<td>自我评估与再设计</td>\n<td>优化现有任务Prompt</td>\n<td>“AI教AI怎么问问题”</td>\n</tr>\n<tr>\n<td>Auto-Demo</td>\n<td>在线示范</td>\n<td>用前例教后例</td>\n<td>批处理任务</td>\n<td>“自举式few-shot”</td>\n</tr>\n</tbody>\n</table></div>\n<h2>六、软提示（Soft Prompting）与隐性引导（Implicit Prompting）</h2>\n<h3>1、什么是软提示（Soft Prompting）</h3>\n<p><strong>概念</strong>： 传统的提示（prompt）是显式文本提示，例如“请写一首诗”或“解释一下量子力学”。而“软提示（Soft Prompt）”并非文字，而是<strong>一组在向量空间中训练出来的嵌入（embedding tokens）</strong>。这些向量代表了“提示的语义”或“任务指令”的潜在信息，模型通过学习这些隐式向量，从而无需人类语言就能“理解”任务。</p>\n<p><strong>通俗一点</strong>： 想象你在教AI“写诗”，而不是告诉它“请写一首诗”，你直接把过去你喜欢的诗、风格、主题都变成一组“数字气味”。AI嗅到这种气味，就知道“哦，我要写诗了”。</p>\n<h3>2、软提示的三种主要类型与案例</h3>\n<h3>1️⃣ 连续软提示（Continuous Soft Prompts）</h3>\n<p><strong>原理</strong>：</p>\n<blockquote>\n<p>直接在模型的embedding层中加入一段可学习的连续向量作为提示，不使用显式语言。</p>\n</blockquote>\n<p><strong>示例</strong>：</p>\n<blockquote>\n<p>假设我们希望让模型生成正式的会议纪要。</p>\n</blockquote>\n<ul>\n<li>显式提示版本：</li>\n</ul>\n<blockquote>\n<p>“请帮我写一份关于产品发布会的会议纪要，要求语言正式、简洁。”</p>\n</blockquote>\n<ul>\n<li>软提示版本： 系统内部嵌入的向量（不可见）代表：</li>\n</ul>\n<blockquote>\n<p>“正式语气”<br />\n“结构化表达”<br />\n“会议摘要风格”</p>\n</blockquote>\n<p>结果就是，当你只输入会议内容要点时，模型自动输出符合纪要体裁的文本，无需显式告诉它“写成会议纪要”。</p>\n<p>这就像你训练一位助理，只要你说“昨天开会内容”，他立刻懂得你想要“纪要格式”，因为他已经“感受”过那种风格。</p>\n<h3>2️⃣ 前缀微调（Prefix Tuning）</h3>\n<p><strong>原理</strong>：</p>\n<blockquote>\n<p>在模型输入的最前端插入一段可训练的软提示（向量前缀），而保持原始模型参数不变。这是一种轻量级的模型定制方式。</p>\n</blockquote>\n<p><strong>示例</strong>：</p>\n<blockquote>\n<p>你有一个大型通用语言模型，希望它专门擅长写财经新闻。<br />\n做法： 通过前缀微调训练一段“财经风格前缀向量”，模型输入任何与经济相关的主题时，都会自动以财经新闻体输出。<br />\n输入： “中国央行下调利率0.25个百分点。”<br />\n输出：“【金融快讯】据央行最新消息，今日宣布下调基准利率0.25个百分点，市场普遍解读为稳增长信号。”</p>\n</blockquote>\n<p>这就像给AI说“你现在是经济记者”，哪怕输入的内容很普通，它也会自动带上记者口吻。</p>\n<h3>3️⃣ P-Tuning / Prompt Tuning（提示向量调优）</h3>\n<p><strong>原理</strong>：</p>\n<blockquote>\n<p>让模型学习一组特定任务下最优的提示向量（通常比Prefix Tuning更灵活），可以快速适配不同任务。</p>\n</blockquote>\n<p><strong>示例</strong>：</p>\n<blockquote>\n<p>假设要让模型更擅长心理学问答。</p>\n</blockquote>\n<ul>\n<li>显式提示：</li>\n</ul>\n<blockquote>\n<p>“你是一名心理学专家，请回答以下问题：bulabulabulabula……”</p>\n</blockquote>\n<ul>\n<li>软提示（P-Tuning）版： 模型经过若干心理学问答样本的训练后，自动学会一组隐藏向量表示“心理咨询语境”。</li>\n</ul>\n<blockquote>\n<p>当用户输入： “我最近总觉得焦虑，睡不着觉。” <br />\n模型直接回应： “听起来你近期承受了不少压力。可以告诉我最近发生了什么事吗？”</p>\n</blockquote>\n<p>此时会发现，无需显式告诉它“请用咨询师语气”，它会自动应用咨询师语气。P-Tuning相当于教AI“读空气”——哪怕没看到字面指令，它也自动知道当前要怎么说话、扮演谁。</p>\n<h3>3、隐性引导（Implicit Prompting）</h3>\n<p><strong>概念</strong>： 与“软提示”不同，“隐性引导”更侧重<strong>通过上下文、结构或示例潜移默化地引导模型</strong>产生某种风格或逻辑。</p>\n<p><strong>示例与解释</strong>：</p>\n<h3>1️⃣ 格式暗示（Format Hints）</h3>\n<blockquote>\n<p>输入：</p>\n</blockquote>\n<pre><code>Q: 太阳为什么会发光？\n  A:\n  Q: 植物为什么需要阳光？\n  A:\n</code></pre>\n<p>模型在看到这种问答结构后，哪怕你没写“请以问答形式回答”，也会自动遵循格式。</p>\n<h3>2️⃣ 情绪暗示（Affective Hints）</h3>\n<blockquote>\n<p>输入：</p>\n</blockquote>\n<pre><code>用户：今天真糟糕。\n  助理：（语气温柔，安慰的口吻）\n</code></pre>\n<p>模型会自动切换到“安慰风格”的回答。</p>\n<h3>3️⃣ 逻辑暗示（Reasoning Hints）</h3>\n<blockquote>\n<p>输入：</p>\n</blockquote>\n<pre><code>让我们一步步思考：\n</code></pre>\n<p>模型看到这句，就会自动进入推理模式（这一机制最早在 <em>Chain-of-Thought</em> 提示中被发现）。</p>\n<h3>4、软提示与隐性引导的融合趋势</h3>\n<p>最近一段时间的研究（如 <strong>Meta-Prompting、Dark Prompt、LoT Prompting</strong>）正尝试把软提示与隐性引导结合：</p>\n<blockquote>\n<p>一方面使用<strong>训练好的向量提示（soft tokens）</strong>，<br />\n一方面通过<strong>上下文布局、任务结构</strong>进行隐性约束。</p>\n</blockquote>\n<p><strong>案例</strong>： 在BloomWise模型中，研究者让AI观察一组“专家间讨论示例”（隐性引导），同时在底层加上“推理偏好向量”（软提示）。结果模型在开放问答中不仅推理更连贯，还显得“像一个专家群体在商量结论”。</p>\n<h3>🌟 为什么软提示重要？</h3>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>对比维度</th>\n<th>传统提示</th>\n<th>软提示 / 隐性提示</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>表达形式</td>\n<td>文字</td>\n<td>数值向量 / 上下文结构</td>\n</tr>\n<tr>\n<td>可见性</td>\n<td>显式</td>\n<td>隐式</td>\n</tr>\n<tr>\n<td>泛化能力</td>\n<td>较低</td>\n<td>高，可跨任务迁移</td>\n</tr>\n<tr>\n<td>学习成本</td>\n<td>人工手工撰写</td>\n<td>机器自动优化</td>\n</tr>\n<tr>\n<td>应用场景</td>\n<td>一次性任务</td>\n<td>长期模型适配、隐性风格控制</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>一句话</strong>：</p>\n<blockquote>\n<p>软提示就像是“给AI做潜意识调教”，让它在不需要文字指令的情况下，自动明白你的意图。</p>\n</blockquote>\n<h2>七、评估、稳健性与偏差修正</h2>\n<h3>1️⃣ 稳健性（Robustness）</h3>\n<p><strong>含义</strong>： Prompt在不同场景、语气、语法变化下，仍能保持一致、可靠的输出。</p>\n<p><strong>评估方式</strong>：</p>\n<blockquote>\n<p>输入扰动测试（Text Perturbation）<br />\n多语言一致性（Cross-Lingual Consistency）<br />\n模糊命令鲁棒性（Fuzzy Instruction Robustness）</p>\n</blockquote>\n<p><strong>案例</strong>： Prompt “请解释牛顿第三定律”。</p>\n<ul>\n<li>中文问法：</li>\n</ul>\n<blockquote>\n<p>“说说牛顿第三定律的含义。”</p>\n</blockquote>\n<ul>\n<li>英文问法：</li>\n</ul>\n<blockquote>\n<p>“Explain Newton’s third law.”</p>\n</blockquote>\n<ul>\n<li>模糊问法：</li>\n</ul>\n<blockquote>\n<p>“牛顿第三个说的那个定律是啥来着？”</p>\n</blockquote>\n<p>一个稳健Prompt能在三种输入下都生成科学一致的答案。</p>\n<h3>2️⃣ 偏差修正（Bias Mitigation）</h3>\n<p><strong>核心问题</strong>： 语言模型会继承语料中的偏见（性别、文化、地域等），而Prompt可能放大或引导这种偏差。</p>\n<p><strong>解决方案</strong>：</p>\n<blockquote>\n<p>引入<strong>公平性约束提示（Fairness Constraint Prompts）</strong><br />\n加入<strong>多元视角反例（Counterfactual Examples）</strong><br />\n利用<strong>Auto-Demo Prompting</strong>动态平衡不同语境。</p>\n</blockquote>\n<p><strong>案例</strong>： 任务：生成职业形象描述。</p>\n<ul>\n<li>原Prompt：</li>\n</ul>\n<blockquote>\n<p>“描述一名护士的一天。” 模型输出：女性形象。</p>\n</blockquote>\n<ul>\n<li>修正后Prompt：</li>\n</ul>\n<blockquote>\n<p>“描述一名护士（性别不限）的一天，强调专业性与工作内容。” 输出变得中性、专业。</p>\n</blockquote>\n<p>提示词就像相机镜头，偏光会影响照片。偏差修正，就是装上“中性滤镜”，让AI更公平地看世界。</p>\n<h2>评估与优化的未来方向</h2>\n<p>未来Prompt评估与修正的趋势是<strong>自动化 + 自反性（self-reflective）</strong>：</p>\n<blockquote>\n<p>模型自己评估自己（Self-Evaluation Prompts）；<br />\n模型自动对比不同版本的提示效果；<br />\n融合人类反馈（RLHF）进行多维权衡（准确性、风格、伦理）。</p>\n</blockquote>\n<p><strong>前沿探索</strong>：</p>\n<blockquote>\n<p><strong>Auto-Demo Prompting</strong>：模型自动生成更优示例来训练自身。<br />\n<strong>Meta-Prompting</strong>：用Prompt指导模型如何写Prompt。<br />\n<strong>Multi-Objective Optimization</strong>：同时优化“正确率、风格一致性、伦理安全性”。</p>\n</blockquote>\n<h3>🌟 小结：提示优化的“三代阶段”</h3>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>阶段</th>\n<th>特征</th>\n<th>代表技术</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>第一代</td>\n<td>人工撰写与调试</td>\n<td>基础Prompt Engineering</td>\n</tr>\n<tr>\n<td>第二代</td>\n<td>自动生成与策略优化</td>\n<td>AMPO, StraGo, MinorityPrompt</td>\n</tr>\n<tr>\n<td>第三代</td>\n<td>自评、自修正与稳健性增强</td>\n<td>CriSPO, StablePrompt, Meta-Prompting</td>\n</tr>\n</tbody>\n</table></div>\n<blockquote>\n<p><strong>一句话总结：</strong> 过去我们靠“写好提示”让AI聪明； 现在我们让AI自己“学会写好提示”，变得既聪明又稳健。</p>\n</blockquote>\n<h2>八、工程化建议与实际工作流（把学术技术落地）</h2>\n<ol>\n<li><strong>分层设计 Prompt Template</strong>：System → Role → Instruction → Examples → Constraints（模块化便于自动化优化）</li>\n<li><strong>先人为设计，再自动搜索</strong>：先用专家设计 base prompt，再用 AMPO / StablePrompt / Meta-Prompting 等自动化方法精调。</li>\n<li><strong>多策略并行测试</strong>：对同一任务并行测试 CoT、ToT、LoT、Auto-Demo 等策略，结合 self-consistency 做模型投票融合。</li>\n<li><strong>指标化评估</strong>：建立自动化的评估集（包括常见例、失败例、对抗例、少数例）并用精确度/鲁棒性/一致性等指标度量改动效果。</li>\n<li><strong>安全与治理</strong>：把安全规则写成 prompt constraint，并在每次模型输出前后做过滤与二次验证（尤其在敏感领域）。</li>\n</ol>\n<h2>九、将来趋势</h2>\n<ul>\n<li>提示词的<strong>自动化与结构化</strong>会继续走向体系化（更多 meta / hierarchical / graph-of-thought 框架）。</li>\n<li>混合方法（软提示 + in-context exemplar + tree/graph 思维 + 自动搜索）将成为主流。</li>\n<li>对<strong>稀有样本生成</strong>与<strong>提示鲁棒性</strong>的研究会成为聚焦点（如 MinorityPrompt、StablePrompt 等方向）。</li>\n</ul>\n<h2>十、一些关键术语</h2>\n<ul>\n<li>Chain-of-Thought（CoT）：“把中间步骤写出来” → 示例：“先列举所有可能的拆解，再逐个计算，最后给结果。”</li>\n<li>Tree of Thoughts（ToT）：“分叉探索+评估+回溯” → 示例：多分支写出三条方案，分别评分并回溯选择最优。</li>\n<li>Layer-of-Thoughts（LoT）：分层约束检索→ 示例：先生成候选，再按证据层筛选。</li>\n<li>Auto-Demo：用批次中前面条目的模型输出做示范 → 示例：在批量问答里把前几条模型“自生成的好答案”当示范给后面的条目。</li>\n<li>AMPO：自动生成并维护多分支 prompt → 示例：遇到多模式输入时，AMPO 为每种模式生成专门分支并优化。</li>\n<li>StablePrompt：RL-based 稳定 prompt tuning → 示例：用 APPO 在问答任务上学到稳定 prefix。</li>\n<li>CriSPO、StraGo、SAMMO 等：分别代表“批评—建议驱动优化”、“战略性引导优化”、和“结构感知多目标元提示优化工具”（企业/开源工具链趋于成熟）。</li>\n</ul>\n<h2>参考（选读、代表性文献与资源）</h2>\n<ul>\n<li>Layer-of-Thoughts Prompting (LoT): Leveraging LLM-Based Retrieval with Constraint Hierarchies</li>\n</ul>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2410.12153\">https://arxiv.org/abs/2410.12153</a></p>\n<p>思想层提示（LoT）</p>\n<ul>\n<li>BloomWise: Enhancing Problem-Solving capabilities of Large Language Models using Bloom’s-Taxonomy-Inspired Prompts</li>\n</ul>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2410.04094\">https://arxiv.org/abs/2410.04094</a></p>\n<p>BloomWise，鼓励模型从简单到复杂，从记忆认识到逻辑分析，专注于数学和推理</p>\n<ul>\n<li>Dialectical Behavior Therapy Approach to LLM Prompting</li>\n</ul>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2410.07768\">https://arxiv.org/abs/2410.07768</a></p>\n<p>DBT塑造对话</p>\n<ul>\n<li>Using Prompts to Guide Large Language Models in Imitating a Real Person’s Language Style</li>\n</ul>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2410.03848\">https://arxiv.org/abs/2410.03848</a></p>\n<p>模仿真人语言风格</p>\n<ul>\n<li>Unlocking Structured Thinking in Language Models with Cognitive Prompting</li>\n</ul>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2410.02953\">https://arxiv.org/abs/2410.02953</a></p>\n<p>结构化认知、推理</p>\n<ul>\n<li>Can Language Models Take A Hint? Prompting for Controllable Contextualized Commonsense Inference</li>\n</ul>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2410.02202\">https://arxiv.org/abs/2410.02202</a></p>\n<p>情境化常识推理</p>\n<ul>\n<li>AMPO: Automatic Multi-Branched Prompt Optimization</li>\n</ul>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2410.08696\">https://arxiv.org/abs/2410.08696</a></p>\n<ul>\n<li>StraGo: Harnessing Strategic Guidance for Prompt Optimization</li>\n</ul>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2410.08601\">https://arxiv.org/abs/2410.08601</a></p>\n<ul>\n<li>MinorityPrompt: Text to Minority Image Generation via Prompt Optimization</li>\n</ul>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2410.07838\">https://arxiv.org/abs/2410.07838</a></p>\n<ul>\n<li>StablePrompt: Automatic Prompt Tuning using Reinforcement Learning for Large Language Models</li>\n</ul>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2410.07652\">https://arxiv.org/abs/2410.07652</a></p>\n<ul>\n<li>CriSPO: Multi-Aspect Critique-Suggestion-guided Automatic Prompt Optimization for Text Generation</li>\n</ul>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2410.02748\">https://arxiv.org/abs/2410.02748</a></p>\n<ul>\n<li>Auto-Demo Prompting: Leveraging Generated Outputs as Demonstrations for Enhanced Batch Prompting</li>\n</ul>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2410.01724\">https://arxiv.org/abs/2410.01724</a></p>\n<ul>\n<li>Meta-Prompting: Enhancing Language Models with Task-Agnostic Scaffolding</li>\n</ul>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2401.12954\">https://arxiv.org/abs/2401.12954</a></p>\n<ul>\n<li>Think Beyond Size: Dynamic Prompting for More Effective Reasoning</li>\n</ul>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2410.08130\">https://arxiv.org/abs/2410.08130</a></p>\n<ul>\n<li>Teaching-Inspired Integrated Prompting Framework: A Novel Approach for Enhancing Reasoning in Large Language Models</li>\n</ul>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2410.08068\">https://arxiv.org/abs/2410.08068</a></p>\n<ul>\n<li>OneNet: A Fine-Tuning Free Framework for Few-Shot Entity Linking via Large Language Model Prompting</li>\n</ul>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2410.07549\">https://arxiv.org/abs/2410.07549</a></p>\n<ul>\n<li>Salient Information Prompting to Steer Content in Prompt-based Abstractive Summarization</li>\n</ul>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2410.02741\">https://arxiv.org/abs/2410.02741</a></p>\n<p>摘要提示，提示词压缩</p>\n<ul>\n<li>Prompt Compression for Large Language Models: A Survey</li>\n</ul>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2410.12388\">https://arxiv.org/abs/2410.12388</a></p>\n<p>硬提示方法和软提示方法</p>"
    }
  ],
  "latest_overview": [
    {
      "title": "",
      "body_html": "<h1>2026年提示词工程进阶策略：Expert Panel、Compression Protocol、ReAct与四层框架</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2035846499507160429\">https://zhuanlan.zhihu.com/p/2035846499507160429</a></li>\n<li>作者: deepseek</li>\n</ul>\n<hr />\n<p>2026年提示词工程进阶策略：Expert Panel、Compression Protocol、ReAct与四层框架</p>\n<h1>2026年提示词工程进阶策略：Expert Panel、Compression Protocol、ReAct与四层框架</h1>\n<p>作者: deepseek, 赞: 0</p>\n<blockquote>\n<p>基于 ReAct、Chain-of-Thought、Lost in the Middle 与 Anthropic 的 prompt engineering / context engineering 公开资料，系统梳理 2026 年提示词工程里最有价值的四类进阶策略。</p>\n<p><strong>难度</strong>：⭐⭐⭐⭐ | <strong>类型</strong>：方法论梳理 + 实战模板 | <strong>更新日期</strong>：2026-05-06 | <strong>预计阅读时间</strong>：18 - 25 分钟</p>\n<p><strong>适合读者</strong>：AI 应用开发者、Agent 设计者、提示词工程实践者</p>\n<p><strong>一句话结论</strong>：提示词工程没有消失，只是重点从“把一句话写漂亮”转向了“把任务上下文、约束、工具循环和验收标准设计清楚”。</p>\n<p><strong>事实边界</strong>：文中涉及 ReAct、Chain-of-Thought 与长上下文位置偏差的部分，分别基于公开论文 ReAct</p>\n<blockquote>\n<p>[1]</p>\n</blockquote>\n<p>、Chain-of-Thought Prompting</p>\n<blockquote>\n<p>[2]</p>\n</blockquote>\n<p>与 Lost in the Middle</p>\n<blockquote>\n<p>[3]</p>\n</blockquote>\n<p>。关于 prompt engineering 与 context engineering 的关系，则以 Anthropic 的公开工程文章和文档为主要参考。文中的 <strong>Expert Panel</strong> 与 <strong>Compression Protocol</strong> 是便于讨论的工程化称呼，不是统一的学术标准术语。</p>\n</blockquote>\n<p>过去几年，提示词工程常被理解成措辞优化：换一种口气、加一个角色、把一句要求写得更像模板。这类做法在简单任务里仍然有效，但到了 Agent、工具调用、长上下文、RAG 和多轮协作场景，结果差异更多来自三项基础工作：成功标准是否明确，上下文是否经过筛选与组织，系统是否知道何时停止。</p>\n<p>Anthropic 在 prompt engineering overview</p>\n<blockquote>\n<p>[4]</p>\n</blockquote>\n<p>中先强调了一个前提：开始调 prompt 之前，应先准备清晰的成功标准、可重复的评测方式，以及一版能运行的初稿。随后在 context engineering</p>\n<blockquote>\n<p>[5]</p>\n</blockquote>\n<p>文章里，又把范围扩展到系统指令、工具、历史消息、检索结果、运行状态与长期记忆。把这两层放在一起看，当前更关键的工作不是寻找“更厉害的句子”，而是判断哪些信息必须进入上下文、哪些信息适合在运行时按需取用、哪些动作需要被循环验证。</p>\n<p>下文聚焦四类高频且误用率也很高的策略：多角色评审、关键信息锚点、ReAct 工具循环，以及四层诊断框架。它们分别处理不同问题，不是四个互相替代的按钮。</p>\n<h2>读完后，你应该能做四件事</h2>\n<ol>\n<li>区分哪些方法有论文出处，哪些只是工程实践里的便捷称呼。</li>\n<li>判断一个任务更适合直接写清规格，还是应该引入多角色评审、压缩锚点或 ReAct 循环。</li>\n<li>用四层框架定位当前 prompt 的真正故障点，而不是反复改句子。</li>\n<li>把旧 prompt 改写成带成功标准、约束、上下文来源与停止规则的版本。</li>\n</ol>\n<h2>1. 先把“2026 年的提示词工程”说清楚</h2>\n<h3>1.1 这不是一套新学派，而是工作重心变了</h3>\n<p>“2026 年的提示词工程”不是说行业突然出现了四个统一流派，而是说工程重点已经从单句写法转到更完整的系统设计。简单任务里，措辞仍然重要；但任务一旦需要多轮交互、外部工具或长上下文，问题就不再只是“这句话够不够像专家”，而是模型到底拿到了什么材料、这些材料排在什么位置、哪些约束被明确标成了不能违反。</p>\n<p>按这个视角回看，很多旧困惑会更容易定位。比如“为什么 prompt 改了十版还不稳”，原因往往不是还没找到最合适的那句话，而是没有定义成功标准，或者上下文里塞进了太多低信号信息。</p>\n<h3>1.2 哪些名字来自论文，哪些只是工程归纳</h3>\n<p>文中涉及的来源层级并不相同，先区分清楚会更稳妥：</p>\n<p>把命名边界讲清楚，不是为了吹毛求疵，而是为了防止误引用。ReAct 可以直接回到论文语境；Expert Panel 与 Compression Protocol 更适合作为工作中的“便利标签”。</p>\n<h3>1.3 长上下文变大了，不等于每个 token 都会被公平利用</h3>\n<p>Lost in the Middle</p>\n<blockquote>\n<p>[6]</p>\n</blockquote>\n<p>讨论的是一个很务实的问题：模型虽然能接收更长的输入，但并不意味着它会稳定利用长输入里的每一部分。论文在多文档问答与键值检索任务中发现，当相关信息出现在上下文中部时，性能常常低于出现在开头或结尾时的情况。这个结论来自论文中的实验设置与评测模型，不宜粗暴外推成“所有模型在所有长上下文场景都一样差”，但足够说明一个工程事实：<strong>上下文长度增加，不会自动带来等比例的信息利用率。</strong></p>\n<p>Anthropic 的 context engineering 文章把这个现象进一步翻译成工程语言：上下文是有限资源，应当争取用尽量少但尽量高信号的 token 去完成任务。这里的“少”不是盲目缩短，而是避免让低价值背景、重复工具输出和陈旧历史消息挤占注意力预算。</p>\n<h3>1.4 调 prompt 之前，先准备三样东西</h3>\n<p>Anthropic 的 prompt engineering 概览给出的前提可以直接借用：</p>\n<ol>\n<li>先定义成功标准，不然“改好了没有”根本没法判定。</li>\n<li>先准备一套可重复的评测方式，不然每次试出来的结果都只是印象分。</li>\n<li>先有一版能工作的初稿，再针对失败模式迭代，而不是从空白页上幻想最佳写法。</li>\n</ol>\n<p>如果这三样东西都没有，继续堆技巧通常只会放大噪音。后面四个策略都建立在这个前提上。</p>\n<p>还有一个边界条件：不是每一种失败都应该靠 prompt engineering 解决。延迟、成本、工具返回质量、模型能力上限，有时更适合通过换模型、改工具设计或调整系统架构来处理。把这些问题都压回 prompt，本身就是误诊。</p>\n<h2>2. 策略一：Expert Panel（多角色评审）</h2>\n<h3>2.1 它要解决的不是“专家感”，而是“取舍暴露不充分”</h3>\n<p>让模型扮演“资深专家”很常见，但单一角色经常会给出一种表面稳重、实际保守的答案：每个方案都讲两句优点，最后落回“要结合业务场景综合判断”。这类回答在逻辑上未必有错，却很难拿来做决策，因为它没有把关键冲突及其代价展开。</p>\n<p>现实里的技术评审不是把所有正确的话都说一遍，而是把互相冲突的目标摊开来谈。性能与安全、交付速度与长期维护、短期收益与治理成本，本来就不可能同时最优。Expert Panel 的作用，是用不同角色的评价函数强行把这种冲突显性化。</p>\n<h3>2.2 哪些场景适合，哪些场景不值得加</h3>\n<p>可以压成一句话：<strong>当问题的核心是取舍，而不是检索事实时，才值得引入多角色。</strong></p>\n<h3>2.3 一版更稳的写法</h3>\n<p>不要只写“请模拟三位专家讨论”。决定效果的是角色之间的评价维度差异，以及他们是否必须回应彼此的冲突点。</p>\n<pre><code>你将模拟一次技术评审会，参与者有三位：\n\n1.架构负责人：优先关注系统复杂度、可扩展性、迁移成本\n2.安全负责人：优先关注攻击面、权限边界、审计能力\n3.业务负责人：优先关注交付周期、用户影响、回报速度\n\n请围绕以下问题展开讨论：\n{问题}\n\n要求：\n-每个角色先给出自己的推荐方案\n-明确指出最担心的代价是什么\n-至少回应一位其他角色的分歧点\n-最后给出综合建议：推荐什么、不推荐什么、成立前提是什么\n\n输出格式：\n【角色】\n-推荐：\n-主要收益：\n-主要代价：\n-对其他角色的回应：\n\n【综合结论】\n-最终建议：\n-成立前提：\n-哪类团队不适合：\n</code></pre>\n<p>这段模板的关键不在“有三个人”，而在三件事：每个角色有不同 KPI、角色之间必须回应分歧、综合结论要写出成立前提。缺少其中任一条，输出都可能重新滑回“都可以”。</p>\n<h3>2.4 怎么判断它真的起作用了</h3>\n<p>Expert Panel 写完以后，可以用下面 3 个信号做快速验收：</p>\n<ol>\n<li>输出里是否真的出现了互相冲突的优先级，而不是换措辞重复同一观点。</li>\n<li>综合结论是否同时写出了“推荐什么”和“不推荐什么”。</li>\n<li>最终建议是否附带前提条件，而不是抽象地说“视情况而定”。</li>\n</ol>\n<p>如果这三条都不满足，问题通常不在模型，而在角色设计没有拉开差异。</p>\n<h3>2.5 它的代价与常见误用</h3>\n<p>Expert Panel 的收益是把权衡讲透，代价则是 token 成本、响应时延和输出长度都会增加。常见误用主要有三个：</p>\n<ol>\n<li>角色高度同质，例如“架构师 A、架构师 B、架构师 C”。这不会制造分歧，只会制造重复。</li>\n<li>人设写得很花，评价函数却很空。模型不需要口头禅和生平故事，它需要的是不同的目标函数。</li>\n<li>把辩论原样交给最终用户。在不少场景里，Expert Panel 更适合做中间分析层，用户需要的是整理过的结论。</li>\n</ol>\n<h2>3. 策略二：Compression Protocol（关键信息锚点）</h2>\n<h3>3.1 它不是“把 prompt 变短”，而是“把硬信息变硬”</h3>\n<p>“压缩”这个词常被误解成删字数。问题不在于 prompt 长，而在于重要信息和次要信息混在一起，导致模型不知道哪些内容不能丢。这里所说的 Compression Protocol，是把任务目标、成功标准、硬约束、禁止事项、输出要求、停止条件压成结构化锚点，并在必要时于长上下文中重复放置最关键的一两条。</p>\n<p>Anthropic 的 context engineering 文章强调了两个与此直接相关的原则：系统提示应该清楚、直接，并尽量保持“最小但充分”的信息量；few-shot 示例也应该挑代表性的 canonical examples，而不是把所有边缘情况都塞进去。这和 Compression Protocol 的目标一致，都是为了减少信息稀释。</p>\n<h3>3.2 什么内容应该进入核心区，什么内容应该退出去</h3>\n<p>建议优先压缩这几类会直接改变模型行为的信息：</p>\n<ol>\n<li>任务目标。</li>\n<li>成功标准。</li>\n<li>硬约束与禁止事项。</li>\n<li>输出格式与目标受众。</li>\n<li>停止条件与未知处理规则。</li>\n</ol>\n<p>相反，下面这些内容通常不该挤进核心区：背景故事、解释性铺垫、并不影响行为的风格偏好、重复但没有新增约束的信息。长背景不是绝对不能保留，但更适合被放在次级上下文，或改成运行时按需取用。</p>\n<h3>3.3 一份可直接改写旧 prompt 的模板</h3>\n<pre><code>【任务】\n输出一份面向CTO的故障复盘摘要，控制在500字内。\n\n【成功标准】\n-说清事故原因、影响范围、临时止血措施、后续修复项\n-不编造监控数据\n-风格直接，不做情绪化表述\n\n【硬约束】\n-只使用提供的日志、工单与监控结论\n-不得补充未确认的根因\n-如果证据不足，明确写“尚未确认”\n\n【输出格式】\n1.事故概述\n2.已确认事实\n3.尚待确认项\n4.后续动作\n\n【停止规则】\n-证据足够时直接输出\n-关键信息缺失且无法从资料补齐时，提出一个澄清问题\n</code></pre>\n<p>这里最有价值的不是“最后再重复一遍任务”这种技巧本身，而是前面的结构化分层。只有当上下文已经很长、关键信息容易被冲掉时，重复锚点才有实际意义；如果上下文本来就短，重复反而会制造冗余。</p>\n<h3>3.4 怎么评估压缩有没有做对</h3>\n<p>可以用 4 个问题快速复盘：</p>\n<ol>\n<li>如果只允许保留 5 行，哪 5 行最不能丢？</li>\n<li>硬约束是不是独立成块，而不是埋在背景段落里？</li>\n<li>成功标准能不能被评测脚本或人工审阅直接验证？</li>\n<li>删除一段背景说明后，任务是否仍能稳定完成，或者这些信息是否已经被其他约束覆盖？</li>\n</ol>\n<p>如果第四条答不上来，往往说明这段背景其实还没被提炼成真正的约束。</p>\n<h3>3.5 它和 compaction、总结、口号式写法有什么区别</h3>\n<p>Compression Protocol 不等于 Anthropic 在 context engineering 文里提到的 compaction。Compaction 更偏向长任务中的上下文压缩与续航，是把已有上下文总结后继续推进；Compression Protocol 说的是在系统提示或任务说明层面，如何把硬信息写成高信号结构。两者有关，但不是一回事。</p>\n<p>另一个常见误区是把压缩写成命令口号：全大写、很多 MUST、连续重复三遍。如果约束本身仍然模糊，再强烈的语气也不会让模型更清楚。起作用的是具体、可验证的条件，而不是情绪化的重音。</p>\n<h2>4. 策略三：ReAct 循环（Reason + Act）</h2>\n<h3>4.1 ReAct 适合“需要观察世界再继续”的任务</h3>\n<p>ReAct</p>\n<blockquote>\n<p>[7]</p>\n</blockquote>\n<p>的核心不是“多写一点思考过程”，而是让推理与行动交替发生：先基于当前证据提出下一步假设，再去检索、查询或调用工具，然后根据 observation 回来修正判断。论文把 reasoning traces 与 task-specific actions 放进同一条轨道，价值在于减少闭门猜测。</p>\n<p>它与 Chain-of-Thought</p>\n<blockquote>\n<p>[8]</p>\n</blockquote>\n<p>的区别也需要更严格地区分。CoT 关注的是把中间推理步骤展开；ReAct 关注的是把推理和外部行动交错起来。两者不是互斥关系，也不能简单理解成“CoT 不用工具、ReAct 才用工具”。更准确的说法是：<strong>CoT 更偏向一次性展开推理，ReAct 更偏向边思考、边观察、边修正。</strong></p>\n<h3>4.2 工程上不需要把内心独白全部展示给用户</h3>\n<p>ReAct 的工程价值在于交替式决策，不在于向用户公开一长串内部推理。生产环境里更稳的做法通常是：对内保留必要的推理空间，对外只暴露行动日志、进度摘要、关键信息增量和最终结论。这样既便于调试，也不会把大量中间猜测直接暴露给用户。</p>\n<p>一个实用模板如下：</p>\n<pre><code>你是一个会使用工具的分析助手。\n\n处理复杂任务时，按以下循环工作：\n1.Thought：基于当前证据，给出下一步最值得验证的假设\n2.Action：执行一个最小必要动作（检索、查询、调用工具）\n3.Observation：记录返回结果里与任务相关的事实\n4.NextStep：判断是继续、改道，还是停止\n\n规则：\n-一次只做一个最有信息增量的动作\n-如果已有证据足够回答，就停止，不要继续调用工具\n-如果关键数据缺失且工具拿不到，再向用户提问\n-无法验证的部分要显式标注未知\n</code></pre>\n<h3>4.3 一个更贴近真实系统的例子</h3>\n<p>假设你在做一个带检索的客服助手，用户反馈“同样的问题今天和昨天回答不一致”。这类问题很难靠一次性 prompt 解决，因为首先要知道差异来自哪里。</p>\n<p>用 ReAct 的思路，排查过程会更像这样：</p>\n<ol>\n<li><strong>Thought</strong>：先判断差异来自检索结果变化，还是系统 prompt 漂移。</li>\n<li><strong>Action</strong>：查看最近两次请求的召回片段和系统配置版本。</li>\n<li><strong>Observation</strong>：系统 prompt 没变，但召回片段发生了替换。</li>\n<li><strong>Next Step</strong>：继续检查召回排序逻辑、索引更新时间，或缓存策略是否变化。</li>\n</ol>\n<p>这类场景里，ReAct 的价值不在于显得“更聪明”，而在于让系统按证据推进，而不是凭第一反应下结论。</p>\n<h3>4.4 停止规则写不清，ReAct 就会退化成成本黑洞</h3>\n<p>ReAct 最常见的失败不是“不够主动”，而是“循环过头”。一个能上线的 ReAct 工作流，至少要提前定义三件事：</p>\n<ol>\n<li><strong>何时停止搜索</strong>：证据已足够支持结论时停止。</li>\n<li><strong>何时向用户提问</strong>：只有关键缺失信息会改变答案时才问。</li>\n<li><strong>何时承认未知</strong>：拿不到证据时明确标注，而不是继续碰运气。</li>\n</ol>\n<p>判断 ReAct 是否健康，可以看三个指标：动作是否都能解释信息增量、无效工具调用是否在下降、最终输出里未知项是否被老实标注。若第三点做不到，这个循环就还没有真正收敛。</p>\n<h2>5. 策略四：四层框架，把“坏在哪里”先找出来</h2>\n<p>很多 prompt 调不好的根本原因，是团队连问题出在哪一层都没分清。有人一直改措辞，有人一直堆示例，有人一直换角色设定，但故障点可能并不在写法，而在目标定义、上下文供给或业务意图。</p>\n<p>把问题拆成四层以后，定位会清楚很多：</p>\n<h3>5.1 规格层通常比写法层更值得先查</h3>\n<p>很多团队的第一反应是改句子。比如把“帮我优化首页”换成“请作为资深前端工程师深入优化首页性能和体验”。这种改写有时会改善风格，但如果“优化”到底意味着加载更快、转化率更高、无障碍更好还是交互更稳，本来就没定义清楚，那么模型仍然是在猜。</p>\n<p>更稳的规格至少要回答 5 个问题：目标对象是谁、输出长什么样、绝对不能做什么、什么条件算完成、证据不足时应该怎么办。只要这些没写清，继续在写法层折腾，通常不会带来决定性收益。</p>\n<h3>5.2 上下文层，是今天最容易被低估的故障源</h3>\n<p>在真实系统里，模型输入从来不只是 prompt 文本，还包括检索片段、工具返回值、消息历史、系统状态、用户权限、缓存结果与中间记忆。这里任何一环变脏，都会让最终输出漂移。</p>\n<p>这也是 context engineering 值得单独成章的原因。你提供的信息不是越多越好；越多只意味着更高的注意力竞争。工程上的难点不是“能不能塞得下”，而是“哪些信息值得留下”。</p>\n<h3>5.3 一个常用的排查顺序</h3>\n<pre><code>Step1：规格层\n-成功标准明确吗？\n-不允许做什么写清了吗？\n-输出格式和边界条件能验收吗？\n\nStep2：意图层\n-用户表面需求背后，真正想解决什么？\n-多个目标冲突时，谁优先？\n\nStep3：上下文层\n-模型拿到的信息够不够？\n-有没有噪音、过期资料或低质量召回？\n-重要信息放在了容易被看到的位置吗？\n\nStep4：写法层\n-指令有没有歧义？\n-分节是不是太散？\n-示例是否真的代表目标输出？\n</code></pre>\n<p>多数情况下，排到第二层或第三层，问题就已经露出来了。也正因为如此，很多“prompt 失效”其实不是写法失败，而是规格和上下文失败。</p>\n<h3>5.4 症状到修复动作的映射</h3>\n<p>落地排查时，可以先把典型症状和修复方向连起来：</p>\n<h2>6. 四个策略怎么接成一条工作流</h2>\n<p>假设你要做一个面向企业研发团队的故障分析助手，更合理的落地顺序通常是这样的：</p>\n<ol>\n<li><strong>先用四层框架写规格</strong>。定义目标、边界、成功标准与未知处理规则。</li>\n<li><strong>再用 Compression Protocol 压实核心指令</strong>。把任务、约束、输出与停止条件整理成高信号结构。</li>\n<li><strong>需要查日志、查监控、查工单时，引入 ReAct</strong>。让模型基于 observation 持续修正下一步动作。</li>\n<li><strong>遇到取舍型问题时，再叠加 Expert Panel</strong>。例如“这次故障优先补缓存、补熔断还是重构依赖治理”。</li>\n</ol>\n<p>这四步背后的逻辑很简单：先定义什么算完成，再决定哪些信息必须进入上下文，再决定什么时候需要循环观察，最后才决定是否需要制造多视角冲突。</p>\n<p>同样的顺序也适用于完全不同的场景。比如做一套面向内容团队的“事实核查与改写助手”时，可以这样落地：</p>\n<ol>\n<li><strong>先写规格</strong>。定义输出要同时满足事实准确、语气克制、保留原意；禁止补充未核实结论。</li>\n<li><strong>再压缩锚点</strong>。把可用资料、引用规则、输出格式、未知处理方式整理成高信号区块。</li>\n<li><strong>需要查资料时走 ReAct</strong>。让系统逐条核对来源、记录 observation，再判断是否继续查证。</li>\n<li><strong>遇到风格与准确性的冲突时，再引入 Expert Panel</strong>。例如让“事实核查角色”和“编辑角色”分别指出删改风险与可读性问题，最后再合并结论。</li>\n</ol>\n<p>这个例子和故障分析的共同点，不在领域，而在顺序：先定完成标准，再定上下文，再定循环，再定是否需要多视角冲突。</p>\n<h2>7. 一份可以直接重写旧 prompt 的最小骨架</h2>\n<p>许多旧 prompt 无需推倒重来，先改成下面这版骨架，再按任务特点叠加策略即可：</p>\n<pre><code>##Goal\n[最终要交付什么]\n\n##SuccessCriteria\n-[满足什么条件才算完成]\n\n##Constraints\n-[绝对不能违反的边界]\n\n##AvailableContext\n-[模型可使用的信息来源]\n\n##Output\n-[输出格式、长度、对象]\n\n##StopRules\n-[何时停止、何时追问、何时承认未知]\n</code></pre>\n<p>这份骨架的价值，在于它把“好 prompt”从玄学拆成几个明确字段。等这几个字段稳定以后，再决定是否叠加 Expert Panel、Compression Protocol 或 ReAct，通常比一开始就堆技巧更稳。</p>\n<h3>7.1 别只看方法名，也要算实施代价</h3>\n<p>四种策略都有效，但没有一种是零成本的。更稳妥的做法，是把代价和观察指标一起写进评测表。</p>\n<p>如果一个策略的代价已经明显高于收益，最合理的决定往往不是继续微调，而是先退回更简单的方案。</p>\n<h2>8. 读完后，先做这两道练习</h2>\n<h3>练习一：给一个旧 prompt 做四层诊断</h3>\n<p>拿你团队里一个“不算坏，但始终不稳”的 prompt，先不要急着改字句，只回答四个问题：</p>\n<ol>\n<li>它的成功标准是否可验证？</li>\n<li>它真正服务的业务意图是什么？</li>\n<li>模型当前能拿到哪些信息，哪些是噪音？</li>\n<li>只有到第四步时，再看写法是否有歧义。</li>\n</ol>\n<p>如果前三步还没答清，就不该先改句子。</p>\n<h3>练习二：把长 prompt 压成锚点结构</h3>\n<p>找一段你们正在使用的长系统提示词，只保留任务目标、成功标准、硬约束、输出要求与停止规则，再看删掉的背景里有没有不能丢的信息。这个练习的目的不是盲目缩短，而是区分“看起来重要”和“会改变行为”。</p>\n<h2>9. 60 秒选型表：眼前该先用哪一招</h2>\n<p>经验上，如果已经连续改了三轮写法，结果还是不稳，就先停下来，回到规格层和上下文层重新审题。</p>\n<h2>10. 结语：提示词工程的重点已转向系统输入设计</h2>\n<p>2026 年的提示词工程可以概括成一句话：写法仍然重要，但它更像最后一段优化；主要差距已经转移到成功标准、上下文组织、工具循环与故障诊断方式上。</p>\n<p>这也解释了为什么许多旧经验会失灵。过去，一段措辞精巧的提示词常常就能把任务拉起来；现在系统一旦变成 Agent、多轮对话、长上下文、检索增强，决定结果的往往已经不是那一段话本身，而是它背后的上下文配置、工具边界与停止规则。</p>\n<p>更值得持续打磨的，不是“神 prompt 收藏夹”，而是下面这四种能力：</p>\n<ol>\n<li>需要取舍时，主动制造视角冲突，而不是期待模型自己暴露权衡。</li>\n<li>需要长上下文时，把关键约束压成高信号锚点，而不是把所有背景一股脑塞进去。</li>\n<li>需要外部证据时，让模型边查边修正，而不是一次性猜完。</li>\n<li>结果不稳定时，先判断问题出在哪一层，再决定改写法还是改系统。</li>\n</ol>\n<p>走到这一步，提示词工程讨论的重点才从“写话术”转向“做系统”。</p>\n<h2>延伸阅读</h2>\n<ul>\n<li>ReAct: Synergizing Reasoning and Acting in Language Models</li>\n</ul>\n<blockquote>\n<p>[9]\n- Chain-of-Thought Prompting Elicits Reasoning in Large Language Models</p>\n<p>[10]\n- Lost in the Middle: How Language Models Use Long Contexts</p>\n<p>[11]\n- Effective context engineering for AI agents | Anthropic</p>\n<p>[12]\n- Prompt engineering overview | Anthropic Docs</p>\n<p>[13]</p>\n</blockquote>\n<h3>引用链接</h3>\n<p>[1]ReAct: <em><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2210.03629\">https://arxiv.org/abs/2210.03629</a></em></p>\n<p>[2]Chain-of-Thought Prompting: <em><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2201.11903\">https://arxiv.org/abs/2201.11903</a></em></p>\n<p>[3]Lost in the Middle: <em><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2307.03172\">https://arxiv.org/abs/2307.03172</a></em></p>\n<p>[4]prompt engineering overview: <em><a href=\"https://link.zhihu.com/?target=https%3A//platform.claude.com/docs/en/docs/build-with-claude/prompt-engineering/overview\">https://platform.claude.com/docs/en/docs/build-with-claude/prompt-engineering/overview</a></em></p>\n<p>[5]context engineering: <em><a href=\"https://link.zhihu.com/?target=https%3A//www.anthropic.com/engineering/effective-context-engineering-for-ai-agents\">https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents</a></em></p>\n<p>[6]Lost in the Middle: <em><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2307.03172\">https://arxiv.org/abs/2307.03172</a></em></p>\n<p>[7]ReAct: <em><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2210.03629\">https://arxiv.org/abs/2210.03629</a></em></p>\n<p>[8]Chain-of-Thought: <em><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2201.11903\">https://arxiv.org/abs/2201.11903</a></em></p>\n<p>[9]ReAct: Synergizing Reasoning and Acting in Language Models: <em><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2210.03629\">https://arxiv.org/abs/2210.03629</a></em></p>\n<p>[10]Chain-of-Thought Prompting Elicits Reasoning in Large Language Models: <em><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2201.11903\">https://arxiv.org/abs/2201.11903</a></em></p>\n<p>[11]Lost in the Middle: How Language Models Use Long Contexts: <em><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2307.03172\">https://arxiv.org/abs/2307.03172</a></em></p>\n<p>[12]Effective context engineering for AI agents | Anthropic: <em><a href=\"https://link.zhihu.com/?target=https%3A//www.anthropic.com/engineering/effective-context-engineering-for-ai-agents\">https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents</a></em></p>\n<p>[13]Prompt engineering overview | Anthropic Docs: <em><a href=\"https://link.zhihu.com/?target=https%3A//platform.claude.com/docs/en/docs/build-with-claude/prompt-engineering/overview\">https://platform.claude.com/docs/en/docs/build-with-claude/prompt-engineering/overview</a></em></p>"
    }
  ],
  "graph": {
    "nodes": [
      {
        "id": "few_shot",
        "x": 100,
        "y": 100,
        "category": "basic"
      },
      {
        "id": "zero_shot",
        "x": 100,
        "y": 150,
        "category": "basic"
      },
      {
        "id": "icl",
        "x": 200,
        "y": 100,
        "category": "basic"
      },
      {
        "id": "cot",
        "x": 250,
        "y": 200,
        "category": "reasoning"
      },
      {
        "id": "self_consistency",
        "x": 300,
        "y": 240,
        "category": "reasoning"
      },
      {
        "id": "zero_shot_cot",
        "x": 350,
        "y": 180,
        "category": "reasoning"
      },
      {
        "id": "least_to_most",
        "x": 350,
        "y": 220,
        "category": "reasoning"
      },
      {
        "id": "react",
        "x": 380,
        "y": 260,
        "category": "reasoning"
      },
      {
        "id": "tot",
        "x": 450,
        "y": 200,
        "category": "reasoning"
      },
      {
        "id": "pal",
        "x": 450,
        "y": 240,
        "category": "reasoning"
      },
      {
        "id": "universal_sc",
        "x": 480,
        "y": 280,
        "category": "reasoning"
      },
      {
        "id": "got",
        "x": 550,
        "y": 200,
        "category": "reasoning"
      },
      {
        "id": "self_refine",
        "x": 350,
        "y": 300,
        "category": "optimization"
      },
      {
        "id": "reflexion",
        "x": 400,
        "y": 300,
        "category": "optimization"
      },
      {
        "id": "ape",
        "x": 450,
        "y": 340,
        "category": "optimization"
      },
      {
        "id": "promptbreeder",
        "x": 500,
        "y": 360,
        "category": "optimization"
      },
      {
        "id": "opro",
        "x": 550,
        "y": 340,
        "category": "optimization"
      },
      {
        "id": "causal_cot",
        "x": 650,
        "y": 380,
        "category": "frontier_2026"
      },
      {
        "id": "ncots",
        "x": 650,
        "y": 420,
        "category": "frontier_2026"
      },
      {
        "id": "long_cot",
        "x": 650,
        "y": 460,
        "category": "frontier_2026"
      },
      {
        "id": "grace",
        "x": 700,
        "y": 400,
        "category": "frontier_2026"
      },
      {
        "id": "uniapo",
        "x": 720,
        "y": 440,
        "category": "frontier_2026"
      },
      {
        "id": "promptmix",
        "x": 750,
        "y": 380,
        "category": "frontier_2026"
      },
      {
        "id": "vcp",
        "x": 800,
        "y": 380,
        "category": "frontier_2026"
      }
    ],
    "edges": [
      {
        "from": "few_shot",
        "to": "icl",
        "label": "示例优化"
      },
      {
        "from": "few_shot",
        "to": "cot",
        "label": "引入推理步骤"
      },
      {
        "from": "cot",
        "to": "self_consistency",
        "label": "多路径投票"
      },
      {
        "from": "cot",
        "to": "zero_shot_cot",
        "label": "零样本激发"
      },
      {
        "from": "cot",
        "to": "least_to_most",
        "label": "问题分解"
      },
      {
        "from": "cot",
        "to": "react",
        "label": "行动协同"
      },
      {
        "from": "cot",
        "to": "tot",
        "label": "树状搜索"
      },
      {
        "from": "cot",
        "to": "pal",
        "label": "代码执行"
      },
      {
        "from": "self_consistency",
        "to": "universal_sc",
        "label": "开放任务"
      },
      {
        "from": "tot",
        "to": "got",
        "label": "图状建模"
      },
      {
        "from": "self_refine",
        "to": "reflexion",
        "label": "语言反馈"
      },
      {
        "from": "ape",
        "to": "promptbreeder",
        "label": "进化算法"
      },
      {
        "from": "ape",
        "to": "opro",
        "label": "迭代优化"
      },
      {
        "from": "cot",
        "to": "causal_cot",
        "label": "因果推理"
      },
      {
        "from": "tot",
        "to": "ncots",
        "label": "神经搜索"
      },
      {
        "from": "cot",
        "to": "long_cot",
        "label": "长链缩放"
      },
      {
        "from": "opro",
        "to": "grace",
        "label": "门控压缩"
      },
      {
        "from": "opro",
        "to": "uniapo",
        "label": "多模态"
      },
      {
        "from": "promptmix",
        "to": "vcp",
        "label": "视觉条件"
      }
    ],
    "milestones": [
      "few_shot",
      "cot",
      "opro"
    ]
  },
  "algos": [
    {
      "id": "few_shot",
      "num": 1,
      "name": "Few-shot",
      "fullName": "少样本提示 (Few-shot Prompting)",
      "year": "2020",
      "org": "OpenAI",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2005.14165",
      "projectUrl": "",
      "category": "basic",
      "motivation": "通过少量示例激发模型上下文学习能力",
      "summary": "Few-shot Prompting 在 GPT-3 论文中被系统化为一种“只在输入上下文中给少量示例、不更新参数”的任务适配方式，解决了传统微调依赖大量标注样本和梯度更新的问题。",
      "keyPoints": [
        "使用任务描述加 <span class=\"kb-math kb-math-inline\">K</span> 个输入-输出示例作为上下文，直接让自回归语言模型续写答案",
        "GPT-3 以 175B 参数规模验证少样本上下文学习随模型规模增强",
        "评估范式明确区分 Fine-tuning、Zero-shot、One-shot、Few-shot",
        "所有测试任务均不进行梯度更新，任务规范完全由自然语言和示例文本给出",
        "在翻译、问答、完形填空、SuperGLUE、LAMBADA、简单算术等任务上展示跨任务泛化",
        "局限包括上下文长度受限、示例选择敏感、部分推理和稳健性任务仍明显落后"
      ],
      "detail": "<p><img alt=\"GPT-3 评估范式对比图\" src=\"https://ar5iv.labs.arxiv.org/html/2005.14165/assets/figures/eval_strategies.png\" />\n<em>图：GPT-3 论文 Figure 2.1，对比 Fine-tuning、Zero-shot、One-shot 与 Few-shot 的测试时输入方式。图源：ar5iv / arXiv。</em></p>\n<pre><code class=\"language-python\"># Few-shot prompting 推理伪代码\ndef few_shot_predict(lm, task_description, demonstrations, query, k):\n    prompt = task_description.strip() + &quot;\\n\\n&quot;\n    for x_i, y_i in demonstrations[:k]:\n        prompt += f&quot;Input: {x_i}\\nOutput: {y_i}\\n\\n&quot;\n    prompt += f&quot;Input: {query}\\nOutput:&quot;\n    return lm.generate(prompt, stop=[&quot;\\n&quot;])\n</code></pre>\n<p>Few-shot 的核心不是“用少量样本训练模型”，而是把少量样本作为输入条件。给定任务描述 <span class=\"kb-math kb-math-inline\">d</span>、示例集合 <span class=\"kb-math kb-math-inline\">\\{(x_i,y_i)\\}_{i=1}^{K}</span> 和测试样本 <span class=\"kb-math kb-math-inline\">x_\\*</span>，模型直接估计：</p>\n<div class=\"kb-math kb-math-display\">p_\\theta(y_\\* \\mid d, x_1,y_1,\\ldots,x_K,y_K,x_\\*)</div>\n<p>这里的 <span class=\"kb-math kb-math-inline\">\\theta</span> 在测试时保持不变，因此适配过程发生在 Transformer 的前向传播和注意力模式中，而不是参数空间中。GPT-3 论文将这种能力称为 in-context learning 的一种表现：预训练阶段形成的模式识别能力被测试时的文本示例临时调动起来。</p>\n<p>方法设计的关键是“格式对齐”。示例不仅提供标签，还提供任务的输入输出 schema、答案风格、标签空间和隐含约束。例如情感分类中，示例会告诉模型标签只能是 <code>Positive</code> 或 <code>Negative</code>；翻译任务中，示例会告诉模型输入输出语言边界。示例数量 <span class=\"kb-math kb-math-inline\">K</span> 增加时，模型获得更多任务结构信号，但也会消耗上下文窗口并引入坏示例干扰。</p>\n<p>与传统 fine-tuning 相比，Few-shot Prompting 的优势是部署成本低：同一个底座模型可以通过不同 prompt 切换任务，不需要为每个任务维护独立权重。代价是它把优化问题转移到了 prompt 设计上，示例的代表性、顺序、格式和长度都会影响输出；当任务需要精确规则、长链推理或罕见标签时，少量示例未必足以稳定约束模型行为。</p>\n<div class=\"key-point\">💡 关键：Few-shot 的“学习”发生在上下文内，模型参数不变；示例越像一个清晰的小型任务说明书，模型越容易把续写分布收缩到正确答案空间。</div>",
      "quiz": {
        "q": "Few-shot Prompting 与传统监督微调的核心区别是什么？",
        "options": [
          "Few-shot 在测试时更新全部模型参数",
          "Few-shot 通过上下文示例指定任务，测试时不做梯度更新",
          "Few-shot 必须使用奖励模型筛选答案",
          "Few-shot 只适用于分类任务"
        ],
        "answer": 1,
        "explain": "Few-shot Prompting 将少量示例放入 prompt 中作为条件信息，模型权重保持冻结。"
      }
    },
    {
      "id": "zero_shot",
      "num": 2,
      "name": "Zero-shot",
      "fullName": "零样本提示 (Zero-shot Prompting)",
      "year": "2020",
      "org": "OpenAI",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2005.14165",
      "projectUrl": "",
      "category": "basic",
      "motivation": "仅凭指令完成任务，无需示例",
      "summary": "Zero-shot Prompting 让语言模型只依赖自然语言指令和待处理输入完成任务，解决了没有示例或标注样本时如何快速调用预训练能力的问题。",
      "keyPoints": [
        "只提供任务描述和测试输入，不提供输入-输出示例",
        "测试时无微调、无梯度更新、无任务专属参数",
        "GPT-3 论文将 Zero-shot 作为与 One-shot、Few-shot、Fine-tuning 并列的评估范式",
        "性能依赖预训练中积累的任务知识、指令理解能力和模型规模",
        "通常弱于 Few-shot，但成本最低、上下文占用最小、任务切换最快",
        "对模糊任务、非标准标签空间和复杂推理任务更容易产生格式偏差或误解"
      ],
      "detail": "<p><img alt=\"GPT-3 零样本与少样本评估范式\" src=\"https://ar5iv.labs.arxiv.org/html/2005.14165/assets/figures/eval_strategies.png\" />\n<em>图：GPT-3 论文 Figure 2.1，Zero-shot 面板展示只用任务说明和当前输入进行预测。图源：ar5iv / arXiv。</em></p>\n<pre><code class=\"language-python\"># Zero-shot prompting 推理伪代码\ndef zero_shot_predict(lm, instruction, query):\n    prompt = f&quot;{instruction.strip()}\\n\\nInput: {query}\\nOutput:&quot;\n    answer = lm.generate(prompt, stop=[&quot;\\n&quot;])\n    return normalize(answer)\n</code></pre>\n<p>Zero-shot 的条件分布可以写为：</p>\n<div class=\"kb-math kb-math-display\">p_\\theta(y_\\* \\mid d, x_\\*)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">d</span> 是自然语言任务说明，<span class=\"kb-math kb-math-inline\">x_\\*</span> 是测试输入。与 Few-shot 相比，条件中没有 <span class=\"kb-math kb-math-inline\">(x_i,y_i)</span> 示例，因此模型必须从指令文本本身推断任务目标、输出格式和标签空间。它本质上是在调用预训练阶段已经吸收的知识和模式，而不是在上下文中学习新映射。</p>\n<p>这一范式的动机非常直接：很多真实任务没有现成示例，或者用户只愿意用一句话表达需求。Zero-shot 把任务接口压缩成“说明 + 输入”，让一个通用模型能在翻译、摘要、问答、分类、改写等任务之间直接切换。GPT-3 论文的重要观察是，随着模型规模扩大，Zero-shot 能力也会平滑提升，但在不少任务上仍明显低于带示例的 Few-shot。</p>\n<p>设计 Zero-shot prompt 时，指令必须承担更多约束功能。它需要说明角色、目标、输出格式、边界条件和禁止行为，例如“只输出一个标签”“用 JSON 返回”“如果无法判断则回答 Unknown”。如果指令省略这些约束，模型会按最可能的自然文本续写，可能给出解释、补充背景或使用与评测脚本不匹配的答案格式。</p>\n<p>与 Few-shot 的区别在于，Zero-shot 的失败更常来自“任务解释错误”，而 Few-shot 的失败更常来自“示例选择或模式泛化错误”。因此 Zero-shot 通常适合开放生成、常见任务和低成本批量调用；当标签空间罕见、格式严格或推理链较长时，加入示例、思维链或自洽投票通常更稳。</p>\n<div class=\"warn-box\">⚠️ 注意：Zero-shot 不是“模型不知道任务也能做”，而是“用户不提供示例”；模型仍依赖预训练中已有的语言和任务知识。</div>",
      "quiz": {
        "q": "Zero-shot Prompting 最依赖 prompt 中的哪类信息？",
        "options": [
          "梯度更新次数",
          "任务说明和输出约束",
          "训练集随机种子",
          "奖励模型打分"
        ],
        "answer": 1,
        "explain": "Zero-shot 没有示例可参考，模型主要依靠自然语言任务说明判断应执行什么以及如何输出。"
      }
    },
    {
      "id": "icl",
      "num": 3,
      "name": "ICL",
      "fullName": "上下文学习 (In-Context Learning)",
      "year": "2021",
      "org": "Google/Stanford",
      "parent": "few_shot",
      "paperUrl": "https://arxiv.org/abs/2110.04541",
      "projectUrl": "",
      "category": "basic",
      "motivation": "研究示例选择与顺序对性能的影响",
      "summary": "ICL 指模型在不更新参数的情况下利用当前上下文中的任务信号完成新输入；该论文从预训练样本切分角度解释了模型为什么偏好同一上下文内的依赖，并提出用 kNN-Pretraining 改善这种归纳偏置。",
      "keyPoints": [
        "分析预训练文本被切成固定长度 example 后带来的 in-context inductive bias",
        "理论上说明模型更容易建模同一训练 example 内片段之间的依赖，而跨 example 依赖被削弱",
        "将 ICL 现象与预训练 example 设计联系起来，而不只看推理时 prompt 模板",
        "提出 kNN-Pretraining：把语义相关但非相邻的句子放入同一预训练 example",
        "在 Natural Questions closed-book QA 和 SentEval 相似度任务上展示增益",
        "启发后续示例检索、示例排序、上下文构造等 prompt engineering 方法"
      ],
      "detail": "<p><img alt=\"ICL 归纳偏置与 kNN-Pretraining 效果\" src=\"https://ar5iv.labs.arxiv.org/html/2110.04541/assets/x1.png\" />\n<em>图：论文 Figure 1，展示少量 kNN-Pretraining 对 closed-book QA 的提升。图源：ar5iv / arXiv。</em></p>\n<pre><code class=\"language-python\"># kNN-Pretraining 风格的上下文构造伪代码\ndef build_pretraining_example(anchor_sentence, corpus, encoder, max_len):\n    neighbors = knn_search(\n        query=encoder(anchor_sentence),\n        index=[encoder(s) for s in corpus],\n        k=K,\n    )\n    packed = [anchor_sentence]\n    for sent in neighbors:\n        if token_len(packed + [sent]) &lt;= max_len:\n            packed.append(sent)\n    return concatenate(packed)\n</code></pre>\n<p>论文关注的不是单个 prompt 技巧，而是 ICL 的来源：语言模型在预训练时看到的是一个个长度有限的连续文本块。若两个文本片段出现在同一个训练 example 中，Transformer 的自注意力和语言建模损失可以直接学习它们之间的条件依赖；若它们被切到不同 example，中间没有共同上下文，模型只能通过参数中的统计记忆间接连接。</p>\n<p>可以用一个抽象式子表达这种差异：同一上下文中的片段 <span class=\"kb-math kb-math-inline\">a,b</span> 允许模型直接估计 <span class=\"kb-math kb-math-inline\">p_\\theta(b \\mid a, c)</span>，而不同 example 中的片段只能通过全局参数近似相关性。论文将这种训练机制称为一种 in-context bias，它有利于语言建模，却可能让需要整合语料中分散证据的 NLU 任务受限。</p>\n<p>kNN-Pretraining 的思路是改变“哪些文本被放在同一个 example”。给定一个 anchor 句子，用语义检索找到近邻句子，再把这些非相邻但相关的句子打包到同一个预训练样本中。这样模型在训练时就能通过上下文直接看到跨文档或跨位置的语义关系，从而强化“在上下文里对齐相关证据”的能力。</p>\n<p>对 prompt engineering 的启发是：ICL 不只是“多放几个例子”，而是要让上下文中的片段形成有用依赖。推理时的示例选择、示例顺序、标签分布和测试输入相似度，都会改变模型可见的条件结构；预训练时的 example 设计则决定模型多大程度上习惯利用这些结构。</p>\n<div class=\"key-point\">💡 关键：ICL 的表现由两层因素共同决定：预训练阶段模型是否学会利用同一上下文内的依赖，推理阶段 prompt 是否把有用依赖组织进上下文。</div>",
      "quiz": {
        "q": "该论文解释 ICL 归纳偏置时最强调哪一点？",
        "options": [
          "模型必须通过反向传播学习每个新任务",
          "同一预训练 example 内的片段依赖比跨 example 依赖更容易被建模",
          "示例越随机越能提升上下文学习",
          "上下文学习只由模型参数量决定"
        ],
        "answer": 1,
        "explain": "论文指出常规 chunking 会让模型偏向同一上下文内的信息整合，kNN-Pretraining 正是利用这一偏置。"
      }
    },
    {
      "id": "cot",
      "num": 4,
      "name": "CoT",
      "fullName": "思维链 (Chain-of-Thought)",
      "year": "2022.01",
      "org": "Google",
      "parent": "few_shot",
      "paperUrl": "https://proceedings.neurips.cc/paper/2022/hash/9d5609613524ecf4f15af0f7b31abca4-Abstract-Conference.html",
      "projectUrl": "",
      "category": "reasoning",
      "motivation": "通过中间推理步骤提升复杂推理能力",
      "summary": "Chain-of-Thought Prompting 在少样本示例中加入自然语言中间推理步骤，使大模型先生成推理链再给答案，解决了标准 prompt 在多步算术、常识和符号推理上容易直接跳错的问题。",
      "keyPoints": [
        "将 few-shot 示例从“问题-答案”扩展为“问题-推理步骤-答案”",
        "不训练新模型、不修改参数，只改变 prompt 中示例答案的结构",
        "在算术、常识、符号推理任务上显著优于标准 few-shot prompting",
        "推理能力随模型规模涌现，小模型往往无法稳定受益",
        "PaLM 540B 配合 8 个 CoT 示例在 GSM8K 等任务上取得强结果",
        "为后续 Self-Consistency、Zero-shot CoT、Least-to-Most、ReAct、ToT 等方法奠定基础"
      ],
      "detail": "<p><img alt=\"Chain-of-Thought Prompting 示例图\" src=\"https://ar5iv.labs.arxiv.org/html/2201.11903/assets/x1.png\" />\n<em>图：CoT 论文 Figure 1，展示标准 prompting 与带中间推理步骤的 prompting 对比。图源：ar5iv / arXiv。</em></p>\n<pre><code class=\"language-python\"># Chain-of-Thought prompting 推理伪代码\ndef cot_predict(lm, cot_examples, question):\n    prompt = &quot;&quot;\n    for q_i, rationale_i, answer_i in cot_examples:\n        prompt += f&quot;Q: {q_i}\\nA: {rationale_i} The answer is {answer_i}.\\n\\n&quot;\n    prompt += f&quot;Q: {question}\\nA:&quot;\n    completion = lm.generate(prompt)\n    rationale, answer = split_rationale_and_final_answer(completion)\n    return answer, rationale\n</code></pre>\n<p>CoT 的关键变量是推理链 <span class=\"kb-math kb-math-inline\">r</span>。标准 prompting 直接建模 <span class=\"kb-math kb-math-inline\">p_\\theta(y \\mid x)</span>，而 CoT 让模型先生成中间步骤再生成答案：</p>\n<div class=\"kb-math kb-math-display\">p_\\theta(y,r \\mid x, D_{\\text{cot}})\n= p_\\theta(r \\mid x, D_{\\text{cot}})\\,p_\\theta(y \\mid x,r,D_{\\text{cot}})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">D_{\\text{cot}}</span> 是带推理步骤的少样本示例。这个分解把隐式计算外化为文本，使模型可以把多步问题拆成更短的局部推断，例如先提取数字关系、再执行算术、最后汇总答案。</p>\n<p>CoT 的设计非常轻量：同样的问题、同样的模型，只把示例答案从短标签改成“解释 + 最终答案”。这种结构给模型两个信号：第一，答案之前应该展开推理；第二，推理步骤的粒度应该与示例相似。它不是保证推理正确的形式化证明，但会显著降低模型从问题直接跳到答案时的压缩负担。</p>\n<p>论文的重要发现是规模效应。对较小模型，要求生成推理链可能只是增加无用文本；对足够大的模型，推理链提供了可利用的计算轨迹，使复杂任务性能大幅提升。这解释了为什么 CoT 常被视为大模型能力涌现的代表现象之一。</p>\n<p>与传统符号求解器相比，CoT 不需要显式写规则或程序，通用性强；但它的推理链仍是模型生成的自然语言，可能出现看似合理但计算错误的步骤。因此后续方法通常在 CoT 之上加入多路径采样、投票、工具执行或搜索机制来提升可靠性。</p>\n<div class=\"warn-box\">⚠️ 注意：CoT 提高的是“生成中间计算轨迹”的概率，不等于验证了轨迹的逻辑正确性。</div>",
      "quiz": {
        "q": "CoT Prompting 的主要改动是什么？",
        "options": [
          "在测试时微调模型参数",
          "在示例答案中加入中间推理步骤",
          "删除所有 few-shot 示例",
          "用外部搜索引擎替代模型生成"
        ],
        "answer": 1,
        "explain": "CoT 的核心是在 prompt 示例中展示推理过程，让模型按类似格式先推理再回答。"
      }
    },
    {
      "id": "self_consistency",
      "num": 5,
      "name": "Self-Consistency",
      "fullName": "自洽性 (Self-Consistency)",
      "year": "2022.03",
      "org": "Google",
      "parent": "cot",
      "paperUrl": "https://arxiv.org/abs/2203.11171",
      "projectUrl": "",
      "category": "reasoning",
      "motivation": "多路径采样投票提升推理鲁棒性",
      "summary": "Self-Consistency 用多次采样的 CoT 推理路径替代贪心解码，并对最终答案投票，解决了单条推理链偶然出错导致答案不稳的问题。",
      "keyPoints": [
        "将 CoT 的 greedy decoding 改为随机采样多条 reasoning paths",
        "对每条推理链抽取 final answer，再选择出现最一致的答案",
        "近似边缘化中间推理路径，而不是信任单一路径",
        "在 GSM8K、SVAMP、AQuA、StrategyQA、ARC-challenge 等任务上显著提升",
        "与模型训练无关，是纯解码策略，可叠加在 CoT prompt 上",
        "代价是多次采样带来更高推理成本，并依赖答案抽取规则"
      ],
      "detail": "<p><img alt=\"Self-Consistency 三步流程\" src=\"https://ar5iv.labs.arxiv.org/html/2203.11171/assets/x1.png\" />\n<em>图：论文 Figure 1，展示 CoT prompt、多路径采样和最终答案聚合三步。图源：ar5iv / arXiv。</em></p>\n<pre><code class=\"language-python\"># Self-Consistency 解码伪代码\ndef self_consistency(lm, cot_prompt, question, n_samples, temperature):\n    votes = {}\n    traces = []\n    for _ in range(n_samples):\n        completion = lm.generate(\n            cot_prompt + f&quot;\\nQ: {question}\\nA:&quot;,\n            temperature=temperature,\n        )\n        rationale, answer = parse_final_answer(completion)\n        traces.append((rationale, answer))\n        votes[answer] = votes.get(answer, 0) + 1\n    best_answer = max(votes, key=votes.get)\n    return best_answer, traces\n</code></pre>\n<p>Self-Consistency 的直觉是：复杂问题通常存在多条不同但等价的解题路线，错误路线之间不一定收敛到同一个错误答案，而正确路线更可能汇聚到同一最终答案。于是与其用贪心解码找单条最高概率推理链，不如采样多个 <span class=\"kb-math kb-math-inline\">r</span>，再边缘化掉 <span class=\"kb-math kb-math-inline\">r</span>：</p>\n<div class=\"kb-math kb-math-display\">p(a \\mid x) = \\sum_r p_\\theta(a,r \\mid x)\n\\approx \\sum_{m=1}^{M} \\mathbf{1}[a_m=a]</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">M</span> 是采样次数，<span class=\"kb-math kb-math-inline\">a_m</span> 是第 <span class=\"kb-math kb-math-inline\">m</span> 条推理链抽取出的最终答案。最终选择 <span class=\"kb-math kb-math-inline\">\\arg\\max_a \\text{count}(a)</span>。这使决策从“哪条完整文本概率最高”变为“哪个答案被多种推理路径支持最多”。</p>\n<p>与普通 CoT 相比，Self-Consistency 只改变解码和聚合。Prompt 仍是 CoT prompt，模型也不需要额外训练；关键参数是采样温度、样本数和答案解析函数。温度过低会得到高度相似的路径，投票收益有限；温度过高会生成噪声路径，增加解析错误。</p>\n<p>它的强项是封闭答案空间的推理任务，例如数字答案、多选题、是非题。对于开放式生成，标准 Self-Consistency 会遇到“答案无法精确匹配”的问题：同义表达、列表顺序、长文本摘要都很难用正则或字符串投票处理。这也直接推动了 Universal Self-Consistency 等后续方法。</p>\n<div class=\"key-point\">💡 关键：Self-Consistency 不是让模型反思，而是用采样近似“多条推理路径对同一答案的边缘支持”。</div>",
      "quiz": {
        "q": "Self-Consistency 相比普通 CoT 的核心变化是什么？",
        "options": [
          "训练一个新的验证器模型",
          "采样多条推理链并对最终答案聚合投票",
          "只使用零样本指令",
          "把自然语言推理全部替换成 Python"
        ],
        "answer": 1,
        "explain": "Self-Consistency 通过多路径采样降低单条推理链错误的影响，最终选择最一致的答案。"
      }
    },
    {
      "id": "zero_shot_cot",
      "num": 6,
      "name": "Zero-shot CoT",
      "fullName": "零样本思维链 (Zero-shot CoT)",
      "year": "2022.05",
      "org": "东京大学/Google",
      "parent": "cot",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2022/hash/8bb0d291acd4acf06ef112099c16f326-Abstract-Conference.html",
      "projectUrl": "",
      "category": "reasoning",
      "motivation": "\"Let's think step by step\"激发推理",
      "summary": "Zero-shot CoT 通过在问题后加入 “Let's think step by step” 一类通用触发语，在没有任何示例的情况下诱导模型生成推理链，解决了 CoT 依赖人工少样本推理示例的问题。",
      "keyPoints": [
        "使用任务无关的触发语激发逐步推理，不需要 few-shot CoT 示例",
        "通常采用两阶段 prompting：先生成 reasoning，再用第二个 prompt 抽取最终答案",
        "与标准 Zero-shot 相比，在算术、符号、常识推理任务上明显更强",
        "与 Few-shot CoT 相比，人工 prompt 成本更低，但稳定性通常更弱",
        "触发语可变，论文测试了多种类似模板",
        "仍依赖模型规模和答案抽取，生成的推理链可能合理但错误"
      ],
      "detail": "<p><img alt=\"Zero-shot CoT 输入输出对比\" src=\"https://ar5iv.labs.arxiv.org/html/2205.11916/assets/x1.png\" />\n<em>图：论文 Figure 1，对比标准 Few-shot、Few-shot CoT、标准 Zero-shot 与 Zero-shot CoT。图源：ar5iv / arXiv。</em></p>\n<pre><code class=\"language-python\"># Zero-shot CoT 两阶段推理伪代码\ndef zero_shot_cot(lm, question):\n    reasoning_prompt = f&quot;Q: {question}\\nA: Let's think step by step.&quot;\n    reasoning = lm.generate(reasoning_prompt)\n\n    extraction_prompt = (\n        f&quot;Q: {question}\\n&quot;\n        f&quot;A: Let's think step by step. {reasoning}\\n&quot;\n        &quot;Therefore, the answer (arabic numerals) is&quot;\n    )\n    final_answer = lm.generate(extraction_prompt, stop=[&quot;\\n&quot;])\n    return normalize(final_answer), reasoning\n</code></pre>\n<p>Zero-shot CoT 可以看作在普通 zero-shot 条件分布里加入一个推理模式触发器 <span class=\"kb-math kb-math-inline\">t</span>：</p>\n<div class=\"kb-math kb-math-display\">p_\\theta(y,r \\mid x,t), \\quad t=\\text{``Let&#x27;s think step by step&#x27;&#x27;}</div>\n<p>这个短语的作用不是提供具体知识，而是改变输出分布的格式先验：模型更倾向于续写一段分步分析，而不是直接给出短答案。对于需要多步计算的问题，这相当于为模型争取了额外的文本计算空间。</p>\n<p>论文提出两阶段流程是因为第一阶段生成的文本常包含推理和答案，格式不一定适合自动评测。第二阶段把原问题、推理文本和答案抽取指令重新交给模型，让它输出标准化答案。这个设计牺牲了一次额外调用，换来更稳定的最终答案解析。</p>\n<p>Zero-shot CoT 与 Few-shot CoT 的差别在于示例来源。Few-shot CoT 用人工构造的推理示例规定任务格式和推理粒度；Zero-shot CoT 只用通用触发语，依赖模型内部已经学到的“逐步解释”模式。因此它更便宜、更通用，但在任务特定格式、复杂符号规则或需要精确约束时不如精心设计的少样本 CoT 稳。</p>\n<div class=\"warn-box\">⚠️ 注意：触发“逐步思考”会增加可解释文本，但也可能增加冗长错误；在高风险任务中仍需要验证、工具执行或多路径投票。</div>",
      "quiz": {
        "q": "Zero-shot CoT 中第二阶段 prompting 的主要目的是什么？",
        "options": [
          "训练模型记住推理链",
          "从第一阶段生成的推理中抽取格式化最终答案",
          "随机打乱示例顺序",
          "减少模型参数量"
        ],
        "answer": 1,
        "explain": "Zero-shot CoT 第一阶段生成推理，第二阶段通常用于把推理结果转成可评测的最终答案。"
      }
    },
    {
      "id": "least_to_most",
      "num": 7,
      "name": "Least-to-Most",
      "fullName": "由易到难提示 (Least-to-Most Prompting)",
      "year": "2022.05",
      "org": "Google",
      "parent": "cot",
      "paperUrl": "https://arxiv.org/abs/2205.10625",
      "projectUrl": "",
      "category": "reasoning",
      "motivation": "将复杂问题分解为子问题逐步求解",
      "summary": "Least-to-Most Prompting 先让模型把复杂问题分解成更简单的子问题，再按顺序求解并把前序答案传给后续步骤，解决了普通 CoT 在“测试题比示例更难”时泛化不足的问题。",
      "keyPoints": [
        "两阶段流程：problem decomposition 与 sequential subproblem solving",
        "分解和求解都通过 few-shot prompting 完成，不需要微调",
        "后一个子问题的 prompt 会包含前面子问题及其答案",
        "针对 easy-to-hard generalization，比普通 CoT 更适合组合泛化",
        "在 SCAN、符号操作、数学推理等任务中显著提升",
        "可与 CoT 结合：每个子问题内部仍可生成短推理链"
      ],
      "detail": "<p><img alt=\"Least-to-Most 两阶段流程\" src=\"https://ar5iv.labs.arxiv.org/html/2205.10625/assets/figures/ltm-pull-fig_new.png\" />\n<em>图：论文 Figure 1，展示先分解问题、再按子问题顺序求解的流程。图源：ar5iv / arXiv。</em></p>\n<pre><code class=\"language-python\"># Least-to-Most prompting 伪代码\ndef least_to_most(lm, decomposition_prompt, solving_prompt, problem):\n    subquestions = lm.generate(\n        decomposition_prompt + f&quot;\\nProblem: {problem}\\nSubproblems:&quot;\n    )\n    context = f&quot;Problem: {problem}\\n&quot;\n    answers = []\n    for q in parse_subquestions(subquestions):\n        prompt = solving_prompt + &quot;\\n&quot; + context + f&quot;Q: {q}\\nA:&quot;\n        a = lm.generate(prompt)\n        answers.append((q, a))\n        context += f&quot;Q: {q}\\nA: {a}\\n&quot;\n    return answers[-1][1], answers\n</code></pre>\n<p>普通 CoT 假设示例中的推理模式可以直接迁移到测试题，但当测试题需要更多组合步骤时，模型可能学到的是“示例长度附近的解法”。Least-to-Most 把问题显式拆成一串更小的目标，让每次调用都只处理当前可控难度的子任务。</p>\n<p>流程可以写成：</p>\n<div class=\"kb-math kb-math-display\">q_{1:n} \\sim p_\\theta(\\text{subquestions} \\mid x), \\quad\na_i \\sim p_\\theta(a_i \\mid x, q_1,a_1,\\ldots,q_i)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">q_{1:n}</span> 是分解出的子问题，<span class=\"kb-math kb-math-inline\">a_i</span> 是第 <span class=\"kb-math kb-math-inline\">i</span> 个子问题答案。关键是求解第 <span class=\"kb-math kb-math-inline\">i</span> 个子问题时，模型能看到 <span class=\"kb-math kb-math-inline\">a_{&lt;i}</span>，所以复杂依赖被转化成逐步累积的状态。</p>\n<p>这种设计的优势在组合任务上尤其明显。例如 SCAN 这类指令映射任务要求模型把短规则组合成长动作序列；普通 CoT 示例如果都很短，模型不一定能 extrapolate 到长序列。Least-to-Most 则把长指令拆成局部片段，逐步构造最终输出。</p>\n<p>与 CoT 的区别在于，CoT 主要控制“答案内部要写推理步骤”，Least-to-Most 控制“问题外部要先规划子问题结构”。前者是一条连续推理链，后者是显式课程式求解；当问题天然可分解时，Least-to-Most 更容易复用前序中间结果，也更便于人工检查失败发生在哪个子问题。</p>\n<div class=\"key-point\">💡 关键：Least-to-Most 的核心不是让推理更长，而是让每一步更简单，并让上下文保存已解决的中间状态。</div>",
      "quiz": {
        "q": "Least-to-Most Prompting 最核心的两步是什么？",
        "options": [
          "采样多条答案并多数投票",
          "先分解复杂问题，再顺序求解子问题",
          "把答案翻译成 Python 并执行",
          "训练奖励模型筛选 prompt"
        ],
        "answer": 1,
        "explain": "Least-to-Most 通过 decomposition 和 sequential solving 将难题变成一串依赖前序答案的简单子问题。"
      }
    },
    {
      "id": "react",
      "num": 8,
      "name": "ReAct",
      "fullName": "推理行动协同 (ReAct)",
      "year": "2022.10",
      "org": "Google/Princeton",
      "parent": "cot",
      "paperUrl": "https://arxiv.org/abs/2210.03629",
      "projectUrl": "",
      "category": "reasoning",
      "motivation": "协同推理与行动调用外部工具",
      "summary": "ReAct 让语言模型交替生成 Thought、Action 和 Observation，把内部推理与外部工具或环境交互结合起来，解决了纯 CoT 容易幻觉、纯行动策略缺少任务规划的问题。",
      "keyPoints": [
        "统一 Reasoning traces 与 task-specific actions",
        "轨迹格式通常为 Thought → Action → Observation 的循环",
        "Action 可调用 Wikipedia API、搜索接口、网页环境或文本游戏环境",
        "Thought 用于分解目标、跟踪状态、修正计划和整合观察",
        "在 HotpotQA、Fever、ALFWorld、WebShop 等任务上优于只推理或只行动基线",
        "轨迹可解释性强，适合调试 agent 失败原因"
      ],
      "detail": "<p><img alt=\"ReAct 与标准 prompting、CoT、Act-only 对比\" src=\"https://ar5iv.labs.arxiv.org/html/2210.03629/assets/x1.png\" />\n<em>图：论文 Figure 1，对比 Standard、CoT、Act-only 与 ReAct 在问答和环境任务中的轨迹。图源：ar5iv / arXiv。</em></p>\n<pre><code class=\"language-python\"># ReAct agent 推理-行动循环伪代码\ndef react_agent(lm, tools, task, examples, max_steps=8):\n    trajectory = format_examples(examples) + f&quot;\\nQuestion: {task}\\n&quot;\n    for _ in range(max_steps):\n        thought_action = lm.generate(trajectory + &quot;Thought:&quot;)\n        thought, action = parse_thought_and_action(thought_action)\n        trajectory += f&quot;Thought: {thought}\\nAction: {action}\\n&quot;\n\n        if action.name == &quot;Finish&quot;:\n            return action.argument, trajectory\n\n        observation = tools[action.name](*action.arguments)\n        trajectory += f&quot;Observation: {observation}\\n&quot;\n    return &quot;No answer&quot;, trajectory\n</code></pre>\n<p>ReAct 的状态可以写为 <span class=\"kb-math kb-math-inline\">s_t=(x,\\tau_{&lt;t})</span>，其中 <span class=\"kb-math kb-math-inline\">x</span> 是任务输入，<span class=\"kb-math kb-math-inline\">\\tau_{&lt;t}</span> 是已经产生的 thought/action/observation 轨迹。模型在每一步生成：</p>\n<div class=\"kb-math kb-math-display\">(\\text{thought}_t,\\text{action}_t) \\sim p_\\theta(\\cdot \\mid x,\\tau_{&lt;t})</div>\n<p>Action 执行后得到外部观察 <span class=\"kb-math kb-math-inline\">o_t</span>，再追加到上下文中。这样模型不必完全依赖参数记忆回答事实问题，也不必在没有语言规划的情况下盲目探索环境。</p>\n<p>纯 CoT 的缺陷是封闭世界：模型只能基于已有知识和上下文推理，遇到事实缺口时容易编造。ReAct 通过 Action 把推理链接到外部信息源，例如先搜索实体，再查找页面，再根据观察更新下一步检索。Thought 的作用是决定“下一步查什么”和“观察意味着什么”。</p>\n<p>纯行动方法的缺陷是缺少显式状态抽象。ReAct 的 Thought 能记录目标、已完成步骤、失败原因和替代计划。例如环境返回“物品不在当前位置”时，模型可以在 Thought 中修正路线，而不是继续重复无效动作。</p>\n<p>从 prompt engineering 角度看，ReAct 的关键是少样本轨迹示范。示例不只给最终答案，还展示可用动作名、动作参数格式、观察如何进入上下文、何时调用 <code>Finish</code>。这使模型学会一个可执行协议，而不是仅学会回答风格。</p>\n<div class=\"key-point\">💡 关键：ReAct 把语言模型从“只会续写答案”变成“能维护轨迹并调用环境反馈的控制器”。</div>",
      "quiz": {
        "q": "ReAct 中 Observation 的作用是什么？",
        "options": [
          "替代语言模型参数",
          "把外部工具或环境返回的信息写回轨迹，供后续推理使用",
          "保存训练梯度",
          "随机选择下一个示例"
        ],
        "answer": 1,
        "explain": "Observation 是 Action 执行后的外部反馈，ReAct 将其追加到上下文中以支持下一步 Thought 和 Action。"
      }
    },
    {
      "id": "tot",
      "num": 9,
      "name": "ToT",
      "fullName": "思维树 (Tree of Thoughts)",
      "year": "2023",
      "org": "Princeton/Google",
      "parent": "cot",
      "paperUrl": "https://proceedings.neurips.cc/paper/2023/hash/271db9922b8d1f4dd7aaef84ed5ac703-Abstract.html",
      "projectUrl": "",
      "category": "reasoning",
      "motivation": "引入搜索算法探索与回溯思维路径",
      "summary": "Tree of Thoughts 将中间推理步骤建模为树节点，用语言模型生成、评估并搜索多个思维分支，解决了 CoT 单路径推理无法系统探索和回溯的问题。",
      "keyPoints": [
        "将 thought 定义为可作为中间步骤的连贯语言片段",
        "状态表示为输入加已生成 thought 序列 <span class=\"kb-math kb-math-inline\">s=[x,z_{1:i}]</span>",
        "四个核心设计：thought decomposition、generation、evaluation、search",
        "支持 BFS、DFS 等显式搜索策略和回溯",
        "语言模型既可生成候选 thought，也可作为启发式评估器",
        "在 Game of 24、Creative Writing、Mini Crosswords 等任务上展示优势"
      ],
      "detail": "<p><img alt=\"Tree of Thoughts 框架图\" src=\"https://ar5iv.labs.arxiv.org/html/2305.10601/assets/x1.png\" />\n<em>图：论文 Figure 1，对比输入输出、CoT、自洽 CoT 与 ToT 的问题求解结构。图源：ar5iv / arXiv。</em></p>\n<pre><code class=\"language-python\"># ToT-BFS 简化伪代码\ndef tot_bfs(lm, problem, depth, branch, beam):\n    frontier = [State(problem=problem, thoughts=[])]\n    for t in range(depth):\n        candidates = []\n        for state in frontier:\n            thoughts = generate_thoughts(lm, state, k=branch)\n            for z in thoughts:\n                next_state = state.extend(z)\n                score = evaluate_state(lm, next_state)\n                candidates.append((score, next_state))\n        frontier = [s for _, s in sorted(candidates, reverse=True)[:beam]]\n    return select_best_solution(lm, frontier)\n</code></pre>\n<p>ToT 把问题求解写成搜索问题。每个节点是一个 partial solution：</p>\n<div class=\"kb-math kb-math-display\">s_i = [x, z_1, z_2, \\ldots, z_i]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">x</span> 是原问题，<span class=\"kb-math kb-math-inline\">z_i</span> 是第 <span class=\"kb-math kb-math-inline\">i</span> 个 thought。模型不再一次性生成完整答案，而是在每个状态上生成若干候选 thought，再用评估函数估计这些状态离成功有多近。</p>\n<p>论文将 ToT 的实例化拆成四个问题。第一，如何把任务过程分成 thought 粒度，例如 Game of 24 中一步算式就是一个 thought。第二，如何生成候选 thought，可以独立采样或按 prompt 提议多个候选。第三，如何评估状态，可以让模型打分、投票或判断可行性。第四，使用哪种搜索策略，例如 BFS 保留 top-<span class=\"kb-math kb-math-inline\">b</span> 状态，DFS 在低分时回溯。</p>\n<p>与 Self-Consistency 相比，ToT 不只是采样多条完整推理链后投票，而是在中间层面就进行选择。错误分支可以提前剪枝，有希望的分支可以继续展开。这种 lookahead 和 backtracking 对组合搜索任务尤其重要，因为早期一个错误步骤会导致后续全部无效。</p>\n<p>ToT 的代价是推理调用次数显著增加，并且需要为任务定义 thought 粒度和评估 prompt。它更适合高价值、可分步搜索、可评估中间状态的任务；对于简单问答，普通 CoT 或 Self-Consistency 往往更便宜。</p>\n<div class=\"key-point\">💡 关键：ToT 把 prompt 从“线性续写”升级为“语言模型驱动的启发式搜索”。</div>",
      "quiz": {
        "q": "ToT 相比普通 CoT 的关键增强是什么？",
        "options": [
          "只输出最终答案",
          "维护多个 thought 分支并用搜索策略选择和回溯",
          "禁止模型生成中间步骤",
          "只依赖监督微调"
        ],
        "answer": 1,
        "explain": "ToT 将中间推理表示为树节点，通过生成、评估和搜索探索多条候选路径。"
      }
    },
    {
      "id": "pal",
      "num": 10,
      "name": "PAL",
      "fullName": "程序辅助语言模型 (PAL)",
      "year": "2023",
      "org": "CMU",
      "parent": "cot",
      "paperUrl": "https://proceedings.mlr.press/v202/gao23f.html",
      "projectUrl": "",
      "category": "reasoning",
      "motivation": "将推理转为可执行代码保证准确性",
      "summary": "PAL 让语言模型把自然语言问题转成可执行程序，再由 Python 解释器完成计算，解决了 CoT 会写出合理推理但算错或执行不精确的问题。",
      "keyPoints": [
        "Program-aided Language Models 将中间推理表示为代码",
        "LLM 负责理解问题、分解变量和生成程序，解释器负责执行",
        "最终答案来自程序运行结果，而不是模型直接口算",
        "在 13 个算术和符号推理任务上评估，尤其适合精确计算",
        "使用 Codex 等具备代码能力的模型生成 Python",
        "与 CoT 互补：自然语言推理可读，程序执行更可靠"
      ],
      "detail": "<p><img alt=\"PAL 与 CoT 对比图\" src=\"https://ar5iv.labs.arxiv.org/html/2211.10435/assets/x1.png\" />\n<em>图：论文 Figure 1，对比 CoT 的自然语言推理和 PAL 的 Python 程序执行流程。图源：ar5iv / arXiv。</em></p>\n<pre><code class=\"language-python\"># PAL 推理伪代码\ndef pal_solve(lm, prompt_examples, question, python_executor):\n    prompt = prompt_examples + f&quot;\\n# Question: {question}\\n&quot;\n    prompt += &quot;# Write a Python program to solve it.\\n&quot;\n    program = lm.generate(prompt, stop=[&quot;\\n\\n# Question:&quot;])\n    result = python_executor.run(program, entrypoint=&quot;solution&quot;)\n    return result, program\n</code></pre>\n<p>PAL 的核心分解是：</p>\n<div class=\"kb-math kb-math-display\">c \\sim p_\\theta(c \\mid x, D_{\\text{PAL}}), \\quad y = \\operatorname{Exec}(c)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">c</span> 是模型生成的程序，<span class=\"kb-math kb-math-inline\">\\operatorname{Exec}</span> 是外部解释器。模型不再承担所有推理和计算，只负责把语言问题翻译成程序化步骤；精确算术、循环、条件和符号操作交给解释器执行。</p>\n<p>CoT 在复杂算术上常见失败是“思路看起来对，但某一步算错”。PAL 把这些易错步骤落到代码里，例如把人数、价格、日期写成变量，再用表达式计算。只要程序语义正确，解释器会稳定给出同一结果，不会像语言模型那样在多位数计算上随机漂移。</p>\n<p>Prompt 的示例需要展示从题目到代码的映射风格：如何命名变量、如何写注释、如何把最终结果赋给 <code>answer</code> 或从 <code>solution()</code> 返回。示例越清楚，模型越容易生成可执行且结构化的程序。这里的“推理链”仍然存在，只是从自然语言句子变成了代码语句。</p>\n<p>PAL 的边界也很清楚：如果模型误解题意，解释器只能精确执行错误程序；如果执行环境不安全或库不可用，也会带来工程风险。因此实际系统中通常需要沙箱、超时、依赖白名单和异常回退。</p>\n<div class=\"key-point\">💡 关键：PAL 不要求语言模型自己算得更准，而是让模型把问题交给更适合精确执行的符号工具。</div>",
      "quiz": {
        "q": "PAL 中 Python 解释器主要承担什么职责？",
        "options": [
          "生成自然语言题目",
          "执行模型生成的程序并产出最终答案",
          "训练语言模型参数",
          "筛选 few-shot 示例顺序"
        ],
        "answer": 1,
        "explain": "PAL 由 LLM 生成程序，解释器执行程序，因此最终答案来自可执行代码的运行结果。"
      }
    },
    {
      "id": "universal_sc",
      "num": 11,
      "name": "Universal SC",
      "fullName": "通用自洽性 (Universal Self-Consistency)",
      "year": "2023.11",
      "org": "Google",
      "parent": "self_consistency",
      "paperUrl": "https://arxiv.org/abs/2311.17311",
      "projectUrl": "",
      "category": "reasoning",
      "motivation": "扩展自洽性至开放式任务",
      "summary": "Universal Self-Consistency 用语言模型直接从多个候选回答中选择最一致的一个，解决了标准 Self-Consistency 依赖答案抽取、难以处理开放式生成的问题。",
      "keyPoints": [
        "先采样多个候选响应，再用 LLM 进行 consistency-based selection",
        "不需要正则抽取最终答案，也不要求候选格式完全一致",
        "适用于数学推理、代码生成、长上下文摘要、开放式问答等任务",
        "在可抽取答案的数学任务上接近标准 Self-Consistency",
        "在摘要和 TruthfulQA 等开放任务上提供标准 SC 无法直接使用的聚合方式",
        "局限包括候选顺序偏置、长上下文理解压力和“最一致不等于最好”"
      ],
      "detail": "<p><img alt=\"Universal Self-Consistency 工作流\" src=\"https://ar5iv.labs.arxiv.org/html/2311.17311/assets/figs/usc.png\" />\n<em>图：论文 Figure 1，展示采样多个候选回答并由 LLM 选择最一致响应的流程。图源：ar5iv / arXiv。</em></p>\n<pre><code class=\"language-python\"># Universal Self-Consistency 伪代码\ndef universal_self_consistency(lm, task_prompt, x, n_samples):\n    candidates = []\n    for _ in range(n_samples):\n        candidates.append(lm.generate(task_prompt + format_input(x), temperature=0.7))\n\n    selection_prompt = build_selection_prompt(\n        x=x,\n        candidates=candidates,\n        criterion=&quot;Choose the response that is most consistent with the others.&quot;,\n    )\n    chosen_index = lm.generate(selection_prompt)\n    return candidates[parse_index(chosen_index)], candidates\n</code></pre>\n<p>标准 Self-Consistency 的聚合依赖 <span class=\"kb-math kb-math-inline\">a_m=\\operatorname{extract}(y_m)</span>，即从每条推理链中抽取一个可比较的短答案。开放式任务中这个函数很难定义：两个摘要可能都正确但措辞不同，两个实体列表可能部分重叠，代码也可能有不同实现。USC 直接把候选 <span class=\"kb-math kb-math-inline\">y_{1:M}</span> 交给模型判断：</p>\n<div class=\"kb-math kb-math-display\">j^\\* = \\operatorname{LLMSelect}(x, y_1,\\ldots,y_M; \\text{consistency})</div>\n<p>然后输出 <span class=\"kb-math kb-math-inline\">y_{j^\\*}</span>。这把“答案规范化和投票”的手工规则替换为模型自己的语义一致性判断。</p>\n<p>USC 的动机是，判断候选之间哪一个最符合多数语义，通常比从零生成更容易。候选集中往往已经包含高质量答案，选择器只需要比较它们共享的事实、推理结论或内容覆盖。对于数学题，它可以近似标准 SC；对于开放问答，它可以选择实体覆盖最一致的候选；对于摘要，它可以偏向信息更完整或与多数内容一致的摘要。</p>\n<p>方法的一个重要工程点是 selection prompt。候选需要编号，顺序最好随机化或多次重排以减轻位置偏置；标准可以是“most consistent”，也可以针对任务改成“most detailed”“most truthful”等。论文也指出任务特定选择标准可能进一步提升摘要等任务。</p>\n<p>USC 的失败模式来自 LLM-as-judge 本身：长候选太多会超过上下文或削弱比较能力；多数一致也可能意味着多数候选共享同一个错误；候选顺序和表述风格可能影响选择。因此 USC 更像一个通用聚合框架，而不是完美验证器。</p>\n<div class=\"key-point\">💡 关键：USC 的泛化点在于不再要求答案可被规则抽取，而是让模型在语义层面做一致性选择。</div>",
      "quiz": {
        "q": "Universal Self-Consistency 解决了标准 Self-Consistency 的哪类主要限制？",
        "options": [
          "无法进行梯度更新",
          "开放式回答难以用规则抽取并精确投票",
          "不能采样多个候选",
          "只能使用小模型"
        ],
        "answer": 1,
        "explain": "USC 让 LLM 直接选择最一致候选，避免为每个开放式任务手写答案抽取和匹配规则。"
      }
    },
    {
      "id": "got",
      "num": 12,
      "name": "GoT",
      "fullName": "思维图 (Graph of Thoughts)",
      "year": "2024",
      "org": "ETH Zurich",
      "parent": "tot",
      "paperUrl": "https://ojs.aaai.org/index.php/AAAI/article/view/29720",
      "projectUrl": "",
      "category": "reasoning",
      "motivation": "将思维建模为有向图支持聚合循环",
      "summary": "Graph of Thoughts 将中间思维从线性链或树扩展为有向图，使模型能生成、聚合、评分、筛选并循环改写 thought，解决了 ToT 难以表达多分支合并和复杂工作流的问题。",
      "keyPoints": [
        "将 thought 表示为图中的顶点，将操作依赖表示为有向边",
        "支持 Generate、Aggregate、Score、KeepBest 等 thought transformation",
        "比 CoT、Self-Consistency、ToT 更自然地表达分支合并和循环 refinement",
        "引入 Graph Reasoning State / controller 思路来调度图执行",
        "在排序、集合交集、关键词计数、文档合并等任务中验证",
        "目标是在质量、成本和延迟之间获得更灵活的 tradeoff"
      ],
      "detail": "<p><img alt=\"Graph of Thoughts 与其他 prompting 策略对比\" src=\"https://ar5iv.labs.arxiv.org/html/2308.09687/assets/x1.png\" />\n<em>图：论文 Figure 1，对比 GoT 与 IO、CoT、Self-Consistency、ToT 等提示策略。图源：ar5iv / arXiv。</em></p>\n<pre><code class=\"language-python\"># Graph of Thoughts 调度伪代码\ndef run_got(lm, graph_plan, input_data):\n    graph = ThoughtGraph()\n    graph.add_node(&quot;input&quot;, value=input_data)\n\n    for op in graph_plan:\n        parents = graph.get_nodes(op.inputs)\n        if op.type == &quot;Generate&quot;:\n            children = generate_thoughts(lm, parents, n=op.n)\n            graph.add_children(parents, children)\n        elif op.type == &quot;Aggregate&quot;:\n            merged = aggregate_thoughts(lm, parents)\n            graph.add_node(op.output, merged, parents=parents)\n        elif op.type == &quot;Score&quot;:\n            graph.attach_scores(score_thoughts(lm, parents))\n        elif op.type == &quot;KeepBest&quot;:\n            graph.keep_top_k(parents, k=op.k)\n    return graph.best_output()\n</code></pre>\n<p>GoT 把推理过程表示为有向图 <span class=\"kb-math kb-math-inline\">G=(V,E)</span>。每个顶点 <span class=\"kb-math kb-math-inline\">v \\in V</span> 是一个 thought，可以是部分答案、候选列表、摘要片段或中间分析；边 <span class=\"kb-math kb-math-inline\">e \\in E</span> 表示某个 thought transformation 的输入输出依赖。这样，多个 thought 可以被聚合成一个新 thought，一个 thought 也可以被多次扩展或回到前面步骤重新 refinement。</p>\n<p>ToT 的结构是树，适合“从一个状态分裂出多个候选，再继续向下搜索”。但许多任务需要合并：例如把长列表切块排序后再合并，把多个文档摘要融合成一个摘要，把多个候选解的优点整合。树结构表达合并很别扭，图结构则可以把 Aggregate 作为一等操作。</p>\n<p>GoT 的操作层使 prompt workflow 更像可编排程序。Generate 负责产生候选，Score 负责评价候选，KeepBest 做剪枝，Aggregate 负责融合多个候选。不同任务可以复用这些算子，只替换 prompt 模板和图计划。例如排序任务可以“分块生成排序结果 → 聚合 → 再评分修正”。</p>\n<p>与 ReAct 的工具调用不同，GoT 的重点不是外部环境反馈，而是组织 LLM 自身的多次生成与选择。它牺牲一些实现复杂度，换来更强的工作流表达能力；当任务需要多轮合并、改写和筛选时，这种图式结构比线性 CoT 更稳定。</p>\n<div class=\"key-point\">💡 关键：GoT 的创新在于允许 thought 之间多对一、一对多和循环依赖，把 prompt reasoning 从搜索树升级为可编排图。</div>",
      "quiz": {
        "q": "GoT 相比 ToT 最重要的结构扩展是什么？",
        "options": [
          "完全移除中间 thought",
          "允许多个 thought 聚合成新 thought，并支持图式依赖",
          "只保留一条贪心路径",
          "要求所有任务都调用外部搜索引擎"
        ],
        "answer": 1,
        "explain": "GoT 将思维组织为有向图，因此可以表达分支、合并、评分、筛选和循环改写等复杂流程。"
      }
    },
    {
      "id": "self_refine",
      "num": 13,
      "name": "Self-Refine",
      "fullName": "自我精炼 (Self-Refine)",
      "year": "2023.03",
      "org": "CMU/Allen AI",
      "parent": "—",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2023/hash/91edff07232fb1b55a505a9e9f6c0ff3-Abstract-Conference.html",
      "projectUrl": "",
      "category": "optimization",
      "motivation": "通过自我反馈迭代改进输出质量",
      "summary": "Self-Refine 让同一个语言模型先生成初稿，再给自己的输出写反馈，并基于反馈迭代改写，解决了单次生成难以一次达到高质量的问题。",
      "keyPoints": [
        "三个核心阶段：initial generation、feedback、refine",
        "使用同一个底座 LLM 完成生成、反馈和改写，不需要额外训练",
        "迭代直到达到固定轮数或模型判断无需继续修改",
        "反馈需要具体指出缺陷，refine 需要保留优点并修复问题",
        "在对话、代码优化、约束生成、情感反转、缩写生成等任务上评估",
        "适合开放式生成质量优化，但不能保证每轮都单调变好"
      ],
      "detail": "<p><img alt=\"Self-Refine 高层流程图\" src=\"https://ar5iv.labs.arxiv.org/html/2303.17651/assets/x1.png\" />\n<em>图：论文 Figure 1，展示同一模型生成输出、生成反馈并迭代精炼的流程。图源：ar5iv / arXiv。</em></p>\n<pre><code class=\"language-python\"># Self-Refine 迭代伪代码\ndef self_refine(lm, task_input, max_iters=3):\n    y = lm.generate(build_initial_prompt(task_input))\n    history = []\n    for t in range(max_iters):\n        feedback = lm.generate(build_feedback_prompt(task_input, y, history))\n        if is_satisfied(feedback):\n            break\n        y_new = lm.generate(build_refine_prompt(task_input, y, feedback))\n        history.append((y, feedback, y_new))\n        y = y_new\n    return y, history\n</code></pre>\n<p>Self-Refine 的迭代可以写成：</p>\n<div class=\"kb-math kb-math-display\">y_0 = \\mathcal{M}(x), \\quad\nfb_t = \\mathcal{M}(x,y_t), \\quad\ny_{t+1} = \\mathcal{M}(x,y_t,fb_t)</div>\n<p>其中同一个模型 <span class=\"kb-math kb-math-inline\">\\mathcal{M}</span> 同时扮演作者、评论者和编辑。它不依赖人工反馈，也不需要训练奖励模型；所有改进都通过 prompt 中的自反馈文本完成。</p>\n<p>该方法的动机来自开放式生成的常见现象：第一次回答可能方向正确但有遗漏、约束违反、代码低效或表达不清。直接要求模型“再试一次”不一定有效，因为缺少明确改写目标；Self-Refine 先生成反馈，把问题显式列出来，再让模型根据反馈修订。</p>\n<p>反馈质量是核心。好的 feedback 应该具体、可执行，例如指出“没有满足长度约束”“代码复杂度仍是 <span class=\"kb-math kb-math-inline\">O(n^2)</span>”“回答没有覆盖用户第二个要求”。如果反馈只是泛泛地说“需要更好”，refine 阶段很难稳定改进。论文也通过消融说明反馈步骤本身对性能很重要。</p>\n<p>Self-Refine 与 Self-Consistency 的方向不同：Self-Consistency 并行采样多个候选后选择，Self-Refine 串行改进同一个候选。前者适合封闭答案投票，后者适合开放式质量打磨。实际系统中也可以组合：先采样多个初稿，再分别 refine，最后用选择器挑选。</p>\n<div class=\"warn-box\">⚠️ 注意：Self-Refine 没有外部真值校验，模型可能把正确内容改坏；高风险任务应加入测试、规则检查或人类审核。</div>",
      "quiz": {
        "q": "Self-Refine 的 feedback 阶段主要作用是什么？",
        "options": [
          "为模型参数计算梯度",
          "指出当前输出的具体问题，为下一轮改写提供目标",
          "随机删除上下文",
          "替代最终答案输出"
        ],
        "answer": 1,
        "explain": "Self-Refine 依靠模型生成的具体反馈指导 refine 阶段修复初稿问题。"
      }
    },
    {
      "id": "reflexion",
      "num": 14,
      "name": "Reflexion",
      "fullName": "反思学习 (Reflexion)",
      "year": "2023.03",
      "org": "MIT/Northeastern",
      "parent": "self_refine",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2023/hash/1b44b878bb782e6954cd888628510e90-Abstract-Conference.html",
      "projectUrl": "",
      "category": "optimization",
      "motivation": "语言反馈实现无梯度闭环学习",
      "summary": "Reflexion 把失败轨迹、环境反馈和模型自我批评压缩成自然语言记忆，让同一个大模型在不更新参数的情况下，通过下一轮上下文逐步改进决策。",
      "keyPoints": [
        "将强化学习式的试错闭环改写为“执行-评估-反思-重试”的语言闭环",
        "不做梯度更新，改用 episodic memory 保存反思文本作为下一次尝试的上下文",
        "由 Actor 产生动作轨迹，Evaluator 给出成功信号或分数，Self-Reflection 模块生成可执行的改进建议",
        "适合有明确外部反馈的任务，如代码生成、交互式决策、问答和工具使用",
        "反思文本起到“语义梯度”的作用，指出上一轮失败原因和下一轮策略",
        "主要风险是反思质量依赖模型自身判断，错误反思会被记忆放大"
      ],
      "detail": "<p><img alt=\"Reflexion 闭环流程图\" src=\"https://raw.githubusercontent.com/noahshinn/reflexion/main/figures/reflexion_rl.png\" />\n<em>图源：Reflexion 官方 GitHub，展示 Actor、Evaluator、Self-Reflection 与记忆之间的闭环。</em></p>\n<pre><code class=\"language-python\"># Reflexion 推理-反思循环伪代码\ndef reflexion_solve(task, actor, evaluator, reflector, max_trials=5, memory_size=3):\n    memory = []\n    for trial in range(max_trials):\n        trajectory = actor.generate(task=task, reflections=memory)\n        score, feedback = evaluator(trajectory)\n        if score == &quot;success&quot;:\n            return trajectory.final_answer\n\n        reflection = reflector.generate(\n            task=task,\n            failed_trajectory=trajectory,\n            feedback=feedback,\n            prior_reflections=memory,\n        )\n        memory = (memory + [reflection])[-memory_size:]\n    return trajectory.final_answer\n</code></pre>\n<p>Reflexion 的核心不是让模型“多想一遍”，而是把任务反馈转写成后续可复用的语言状态。传统强化学习会把奖励信号用于参数更新；Reflexion 则把奖励、错误、轨迹和诊断合成为一段反思文字，再放回 prompt。这样模型在下一轮看到的不是裸任务，而是“任务 + 过去失败原因 + 应避免的策略”。</p>\n<p>Actor、Evaluator、Self-Reflection 三个角色可以由同一个 LLM 扮演，也可以由不同模型或外部环境承担。Actor 负责产生动作序列；Evaluator 只需要给出可判定反馈，例如单元测试是否通过、答案是否正确、游戏是否成功；Reflector 将这些反馈转换成更高层的策略建议。系统成功的关键在于反思要足够具体，例如指出哪个假设错了、遗漏了哪个约束、下一轮应该先验证什么。</p>\n<p>从算法角度看，Reflexion 是一种上下文级的信用分配。失败不是直接变成一个标量惩罚，而是被解释为可读的因果线索。记忆长度通常需要受限，因为过多反思会污染上下文并消耗 token；论文中的设置更接近短期经验缓冲区，而不是永久知识库。</p>\n<p>它与 Self-Refine 的区别在于反馈来源和循环粒度。Self-Refine 通常针对单个输出做局部修改；Reflexion 面向跨 episode 的任务尝试，把完整轨迹和环境反馈纳入下一轮策略。在工具使用或代码任务中，这种跨轮记忆尤其有效，因为失败信号往往来自真实执行结果，而不是模型自评。</p>",
      "quiz": {
        "q": "Reflexion 为什么可以被称为无梯度学习？",
        "options": [
          "它完全不使用模型输出",
          "它通过自然语言反思更新上下文，而不是更新模型参数",
          "它只训练一个额外分类器",
          "它要求人工手写所有反馈"
        ],
        "answer": 1,
        "explain": "Reflexion 将失败反馈写入短期记忆，下一轮通过 prompt 条件化行为，参数本身不发生梯度更新。"
      }
    },
    {
      "id": "ape",
      "num": 15,
      "name": "APE",
      "fullName": "自动提示工程师 (Automatic Prompt Engineer)",
      "year": "2023",
      "org": "多伦多大学",
      "parent": "—",
      "paperUrl": "https://openreview.net/forum?id=92gvk82DE-",
      "projectUrl": "",
      "category": "optimization",
      "motivation": "利用LLM自动生成筛选最优指令",
      "summary": "APE 将自然语言指令视为可搜索的“程序”，让 LLM 根据少量输入输出示例生成候选 prompt，再用目标模型执行结果打分筛选最优指令。",
      "keyPoints": [
        "将 prompt engineering 形式化为 natural language program synthesis 和黑盒优化问题。",
        "使用 LLM 作为 proposal model，根据 demonstrations 生成一批候选 instruction。",
        "支持 forward generation、reverse generation 和针对任务的 customized prompt proposal。",
        "使用 execution accuracy、目标答案 log probability 或任务指标作为 score function。",
        "通过多阶段子集评估和 top-<span class=\"kb-math kb-math-inline\">k</span> 过滤降低候选 prompt 评估成本。",
        "可选 iterative Monte Carlo search：保留高分候选，再让 LLM 生成语义相近变体。",
        "在 Instruction Induction、BIG-Bench Instruction Induction、Zero-shot CoT 与 TruthfulQA 等设置中验证自动指令搜索的有效性。"
      ],
      "detail": "<p><img alt=\"APE 自动提示工程师工作流\" src=\"https://ar5iv.labs.arxiv.org/html/2211.01910/assets/x1.png\" />\n<em>图：APE 工作流。LLM 生成候选指令，目标模型执行并打分，保留高分候选，必要时继续重采样相似指令。</em></p>\n<pre><code class=\"language-python\"># Automatic Prompt Engineer (APE) 伪代码\ndef ape(demos, proposer_llm, target_llm, score_fn, rounds=1, keep_ratio=0.2):\n    # demos: 少量 (input, output) 示例\n    candidates = proposer_llm.sample_instructions(demos)\n\n    for _ in range(rounds):\n        scored = []\n        for instruction in candidates:\n            # 先用小子集快速估计，候选足够好时再扩大评估集\n            subset = sample_eval_subset(demos)\n            predictions = [\n                target_llm.generate(prompt=instruction, input=x)\n                for x, y in subset\n            ]\n            score = score_fn(predictions, [y for x, y in subset])\n            scored.append((score, instruction))\n\n        scored.sort(reverse=True)\n        survivors = [inst for score, inst in scored[:max(1, int(len(scored) * keep_ratio))]]\n\n        # iterative APE: 围绕高分指令生成语义相近候选；默认可只做一轮\n        candidates = survivors + proposer_llm.resample_similar_instructions(survivors)\n\n    return best_by_full_validation(candidates, demos, target_llm, score_fn)\n</code></pre>\n<p>APE 的核心抽象是 <span class=\"kb-math kb-math-inline\">instruction\\ as\\ program</span>：一个 prompt 不只是自然语言提示，而是控制目标模型 <span class=\"kb-math kb-math-inline\">M</span> 执行任务的程序。给定样本 <span class=\"kb-math kb-math-inline\">(x,y)</span>，目标是搜索指令 <span class=\"kb-math kb-math-inline\">i</span>，使模型在 <span class=\"kb-math kb-math-inline\">i+x</span> 条件下输出 <span class=\"kb-math kb-math-inline\">y</span> 的期望分数最大：\n<div class=\"kb-math kb-math-display\">i^*=\\arg\\max_i\\mathbb{E}_{(x,y)\\sim D}\\left[s\\left(M(i,x),y\\right)\\right].</div>\n由于 <span class=\"kb-math kb-math-inline\">i</span> 是离散自然语言文本，且多数 API 模型无法提供梯度，APE 采用 generate-and-rank 的黑盒优化路线。</p>\n<p>候选生成阶段让 LLM 扮演 inference model。forward mode 会把若干输入输出示例放在 prompt 中，让模型补全“这些样例遵循什么指令”；reverse mode 则使用 infilling 模型，把缺失的 instruction 作为空槽反推出来。两者的共同点是利用大模型的归纳能力，把无限大的自然语言搜索空间压缩成一个较小但质量较高的候选池。</p>\n<p>评估阶段是 APE 与“只让模型猜一个 prompt”的分界线。论文讨论了两类典型 score：execution accuracy 直接比较预测与目标输出，适合分类、转换、简短问答；log probability 计算目标答案在候选指令下的条件似然，能给低质量候选提供更细粒度信号。对 TruthfulQA 等任务，score 也可以替换为任务自带的自动评估器。</p>\n<p>为了控制成本，APE 不要求每个候选都在完整训练集上执行。它先用小子集快速淘汰低分候选，再把更多预算分配给高分候选，最后只对少量候选做完整验证。这一设计很实际：prompt 搜索的主要成本不是生成文本，而是反复调用目标模型执行候选指令。</p>\n<p>iterative APE 进一步把搜索做成局部 Monte Carlo 过程：过滤出高分候选后，让 LLM 生成语义相近但措辞不同的变体，再继续评估。论文发现迭代能改善候选池整体质量，但最高分指令往往在初始生成中已经出现，因此默认 APE 可以保持简单的一轮生成加筛选。</p>\n<p>与 soft prompt tuning 或 AutoPrompt 相比，APE 不优化连续向量或离散 token 模板，而是直接搜索人类可读的自然语言指令。这让它适合黑盒 LLM、API 模型和需要可解释 prompt 的场景；代价是它容易受验证集覆盖面、候选池多样性和 score function 偏差影响。如果验证集太窄，APE 可能学到只对少数示例有效的“投机式”指令。</p>",
      "quiz": {
        "q": "APE 中 score function 的主要作用是什么？",
        "options": [
          "衡量候选指令在目标模型上的实际任务表现并排序",
          "直接修改目标模型参数",
          "替代输入输出示例，生成训练数据标签",
          "把自然语言 prompt 转换成连续 soft prompt"
        ],
        "answer": 0,
        "explain": "APE 的核心是生成候选后执行并打分，score function 决定哪些指令被保留、重采样或最终选中。"
      }
    },
    {
      "id": "promptbreeder",
      "num": 16,
      "name": "PromptBreeder",
      "fullName": "提示词繁殖 (PromptBreeder)",
      "year": "2023.09",
      "org": "DeepMind",
      "parent": "ape",
      "paperUrl": "https://arxiv.org/abs/2309.16797",
      "projectUrl": "",
      "category": "optimization",
      "motivation": "进化算法实现提示词自我演化",
      "summary": "PromptBreeder 将提示词和“如何变异提示词的提示词”一起放入进化循环，让任务 prompt 与 mutation prompt 共同演化，自动产生更适配任务的指令。",
      "keyPoints": [
        "使用遗传算法维护 prompt population，而不是一次性生成候选",
        "每个个体通常包含 task prompt 与 mutation prompt",
        "task prompt 决定模型如何解题，mutation prompt 决定下一代如何改写 task prompt",
        "通过随机训练批次上的任务表现作为 fitness",
        "采用锦标赛选择、交叉、变异和自指式变异提升多样性",
        "相比 APE，更强调长期搜索和元提示词的自我改进"
      ],
      "detail": "<p><img alt=\"PromptBreeder 总览\" src=\"https://arxiv.org/html/2309.16797/x1.png\" />\n<em>图源：arXiv HTML Figure 1，展示 population、task prompt、mutation prompt 与评估循环。</em></p>\n<pre><code class=\"language-python\"># PromptBreeder 进化式提示优化伪代码\ndef promptbreeder(task, init_prompts, init_mutators, evaluate, generations=20):\n    population = [(p, m) for p in init_prompts for m in init_mutators]\n    for _ in range(generations):\n        fitness = {unit: evaluate(task_prompt=unit[0], batch=sample_batch(task))\n                   for unit in population}\n        parents = tournament_select(population, fitness)\n\n        children = []\n        for prompt, mutator in parents:\n            new_prompt = llm_generate(mutator, prompt, task.description)\n            new_mutator = maybe_mutate_mutator(mutator, task.description)\n            children.append((new_prompt, new_mutator))\n\n        population = elitism(population, children, fitness)\n    return best_unit(population, evaluate)[0]\n</code></pre>\n<p>PromptBreeder 的新意在于把优化器的一部分也文本化。普通 prompt 搜索只优化 task prompt；PromptBreeder 还让 mutation prompt 参与进化。也就是说，系统不仅在学“怎样提示模型做这个任务”，还在学“怎样生成更好的提示改写”。这构成了一个自指式的元优化循环。</p>\n<p>每一代的 fitness 来自任务验证批次。为了控制成本，论文使用随机 batch 估计 prompt 表现，再通过锦标赛选择保留高分个体。变异算子可以直接改写 task prompt，也可以改写 mutation prompt；后者会改变后续搜索的方向，使搜索策略本身逐渐适配任务域。</p>\n<p>这种方法特别适合 prompt 空间高度非凸、难以手工枚举的场景。进化算法保留了多个候选分支，避免过早收敛到单一措辞；而 LLM 生成的变异又比字符级或词级随机扰动更语义化，通常能产生仍然可读、可执行的候选 prompt。</p>\n<p>PromptBreeder 的代价是评估成本高于单轮 APE，并且需要设计 population size、选择压力、变异比例等超参数。它的优势在于长期自适应：如果初始 prompt 较弱，只要评估信号足够可靠，系统仍可能通过多代变异找到任务专用指令。</p>",
      "quiz": {
        "q": "PromptBreeder 与普通候选 prompt 搜索最主要的区别是什么？",
        "options": [
          "它只使用人工写好的 prompt",
          "它同时进化任务提示词和用于变异提示词的元提示词",
          "它必须微调目标语言模型",
          "它不需要任何任务评分"
        ],
        "answer": 1,
        "explain": "PromptBreeder 的个体包含 task prompt 和 mutation prompt，后者让搜索策略本身也能进化。"
      }
    },
    {
      "id": "opro",
      "num": 17,
      "name": "OPRO",
      "fullName": "提示优化 (OPRO)",
      "year": "2024",
      "org": "Google DeepMind",
      "parent": "ape",
      "paperUrl": "https://proceedings.iclr.cc/paper_files/paper/2024/hash/3339f19c5fcee3ad74502947a32be9e6-Abstract-Conference.html",
      "projectUrl": "",
      "category": "optimization",
      "motivation": "LLM作为优化器迭代提升提示词",
      "summary": "OPRO 把历史候选解和分数写进 meta-prompt，让 LLM 根据“哪些方案得分高”继续提出更好的解，从而把语言模型本身用作黑盒优化器。",
      "keyPoints": [
        "用自然语言描述优化问题、历史解和对应分数",
        "LLM 读取优化轨迹后生成下一批候选解或候选 prompt",
        "每轮用外部目标函数评估新候选，再把结果追加回 meta-prompt",
        "适用于数学优化，也适用于任务 prompt 的自动改写",
        "在 GSM8K、BBH 等任务上可找到超过人工 prompt 的指令",
        "成败取决于历史排序呈现、探索约束、评价噪声和上下文长度"
      ],
      "detail": "<p><img alt=\"OPRO 工作流示意图\" src=\"https://arxiv.org/html/2309.03409v3/x3.png\" />\n<em>图源：arXiv HTML Figure 2，展示 LLM 根据历史解-分数对迭代生成新解。</em></p>\n<pre><code class=\"language-python\"># OPRO 黑盒优化伪代码\ndef opro_optimize(problem_description, initial_solutions, optimizer_llm, objective, rounds=10):\n    history = [(objective(sol), sol) for sol in initial_solutions]\n    for _ in range(rounds):\n        meta_prompt = render_meta_prompt(\n            problem=problem_description,\n            scored_solutions=sorted(history, reverse=True),\n            instruction=&quot;Propose new solutions with higher scores.&quot;,\n        )\n        proposals = optimizer_llm.generate_list(meta_prompt)\n        for sol in proposals:\n            history.append((objective(sol), sol))\n        history = keep_top_and_diverse(history, limit=50)\n    return max(history, key=lambda pair: pair[0])[1]\n</code></pre>\n<p>OPRO 的基本假设是：LLM 不只会执行 prompt，也能从历史样本中归纳“什么样的解更好”。当 meta-prompt 中列出若干候选解及其分数后，模型会倾向于模仿高分解的结构，同时尝试新的变体。这把优化过程转化为上下文学习，而不是显式梯度下降。</p>\n<p>用于 prompt 优化时，候选解就是自然语言指令，目标函数通常是验证集准确率。每轮 LLM 看到过去 prompt 的得分，生成更可能提升指标的新 prompt；外部评估器再给出真实分数。与 APE 的一次性 generate-and-rank 相比，OPRO 明确利用了历史轨迹，具有迭代爬坡能力。</p>\n<p>meta-prompt 的组织方式很关键。高分样本通常按分数排序展示，以便模型学习趋势；同时需要保留一定低分或多样样本，避免搜索过早塌缩。候选解数量、温度、历史窗口大小都会影响探索与利用的平衡。</p>\n<p>OPRO 的强项是通用：只要能把目标函数评价结果写成文本，它就能尝试优化。但它不是数学意义上有收敛保证的优化器；上下文长度限制、评价噪声、分数泄漏和验证集过拟合都会影响最终 prompt。实际使用时通常要配合独立测试集确认泛化。</p>",
      "quiz": {
        "q": "OPRO 中 LLM 扮演的核心角色是什么？",
        "options": [
          "仅作为固定分类器",
          "读取历史解和分数后提出新的候选解",
          "直接反向传播更新目标模型",
          "删除低分样本以外的所有上下文"
        ],
        "answer": 1,
        "explain": "OPRO 把优化轨迹写进 meta-prompt，让 LLM 基于历史表现生成下一轮候选。"
      }
    },
    {
      "id": "causal_cot",
      "num": 18,
      "name": "Causal-CoT",
      "fullName": "因果思维链 (Causal CoT)",
      "year": "2026.01",
      "org": "NeurIPS",
      "parent": "cot",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/b7870bd43b2d133a1ed95582ae5d82a4-Abstract-Conference.html",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "因果分析消除幻觉提升逻辑严密性",
      "summary": "Causal-CoT 用因果充分性与必要性评估 CoT 中每个推理步骤的真实贡献，通过反事实 rollout 保留既能支撑答案又不可替代的步骤，从而压缩冗余推理并减少幻觉。",
      "keyPoints": [
        "针对普通 CoT 的两类问题：步骤不足导致结论缺证据，步骤冗余导致过度推理与 token 浪费。",
        "引入 Probability of Sufficiency (PS)、Probability of Necessity (PN) 和 Probability of Necessary and Sufficient Cause (PNS) 描述推理链与步骤的因果贡献。",
        "先做 chain-level PS 判断整条 CoT 是否足以得到正确答案，再做 node-level PN/PNS 判断单个步骤是否不可替代。",
        "通过 counterfactual intervention 替换或移除步骤，并让 rollout model 生成后续链条来估计该步骤的必要性。",
        "用阈值 <span class=\"kb-math kb-math-inline\">\\alpha</span> 剪枝低 PNS 步骤，得到 compact CoT，再用于 in-context learning 或 supervised fine-tuning。",
        "论文在 GSM-8K、MATH-500、AIME、CommonsenseQA 等数学与常识推理基准上报告了更短推理链和更高/相近准确率。"
      ],
      "detail": "<p><img alt=\"Causal-CoT 因果优化框架\" src=\"https://arxiv.org/html/2506.09853v3/x3.png\" />\n<em>图：Causal Optimization Framework for CoT Reasoning。初始 CoT 经 PS/PNS 评估、反事实干预和剪枝后形成 compact CoT，并用于 ICL 或 SFT。</em></p>\n<pre><code class=\"language-python\"># Sufficient and Necessary Optimization of CoT 伪代码\ndef causal_cot_optimize(S_init, q, y, alpha, rollout_model, validator, k):\n    # PS: 先确认完整链条是否足以得到正确答案\n    y_hat = rollout_answer(S_init, q)\n    if y_hat != y:\n        return S_init  # 单次运行不剪枝；实践中可重采样更充分的 CoT\n\n    S_final = []\n    S_current = list(S_init)\n\n    for step_index, s_t in enumerate(S_current):\n        prefix = S_final + S_current[len(S_final):step_index]\n\n        # 对当前步骤做反事实替换/删除，再 rollout 后续步骤\n        scores = []\n        for _ in range(k):\n            s_alt = generate_alternative(prefix, s_t)\n            S_counterfactual = rollout_model.continue_chain(\n                question=q,\n                prefix=prefix + [s_alt],\n            )\n            # validator 判断反事实链是否仍能保持正确、连贯和逻辑完整\n            scores.append(validator(S_counterfactual, answer=y))\n\n        pns = 1.0 - sum(scores) / k\n        if pns &gt; alpha:\n            S_final.append(s_t)   # 替换后会坏，说明原步骤必要，保留\n        else:\n            pass                  # 替换后仍可行，说明原步骤冗余，剪掉\n\n    return S_final\n</code></pre>\n<p>普通 CoT 把推理过程写成线性文本，但线性文本无法保证每一步都真正支撑最终答案。论文把问题拆成两个因果标准：充分性要求整条推理链足以推出答案；必要性要求某个中间步骤一旦被替换或移除，答案或逻辑完整性就会受损。前者防止“跳步”，后者防止“过度解释”。</p>\n<p>论文用 Pearl 因果框架重写这些概念。对推理链 <span class=\"kb-math kb-math-inline\">S=(s_1,\\dots,s_n)</span>，PS 衡量把 <span class=\"kb-math kb-math-inline\">S</span> 作为干预插入后是否能把错误答案变为正确答案：\n<div class=\"kb-math kb-math-display\">\\mathrm{PS}(S,q)=P(A_{\\mathrm{do}(S)}=y\\mid A\\ne y,\\bar{S},q).</div>\n对具体步骤 <span class=\"kb-math kb-math-inline\">s_t</span>，PN 衡量把该步骤替换为错误或替代步骤 <span class=\"kb-math kb-math-inline\">\\bar{s}_t</span>，并重新生成后续步骤 <span class=\"kb-math kb-math-inline\">s&#x27;_{&gt;t}</span> 后，正确答案是否被破坏：\n<div class=\"kb-math kb-math-display\">\\mathrm{PN}(S,s_t,q)=P(A_{\\mathrm{do}(s_{&lt;t},\\bar{s}_t,s&#x27;_{&gt;t})}\\ne y\\mid A=y,S,q).</div>\nPNS 则关注“原链正确且反事实链错误”的联合事件：\n<div class=\"kb-math kb-math-display\">\\mathrm{PNS}(S,s_t,q)=P(A_S=y,\\;A_{S&#x27;}\\ne y).</div></p>\n<p>直接最大化完整 PNS 很昂贵，因此方法采用两阶段近似。第一阶段把 chain-level PS 近似为二值：如果当前 CoT 产生正确答案，则 <span class=\"kb-math kb-math-inline\">\\mathrm{PS}=1</span>，否则不对它做必要性剪枝，并可通过重复采样寻找更充分的链。第二阶段在 <span class=\"kb-math kb-math-inline\">\\mathrm{PS}=1</span> 的链上逐节点估计 PN/PNS，只保留对正确推理有因果贡献的步骤。</p>\n<p>PNS 的估计依赖反事实 rollout。对于每个步骤 <span class=\"kb-math kb-math-inline\">s_t</span>，系统构造一个与原步骤语义分离的替代步骤 <span class=\"kb-math kb-math-inline\">\\bar{s}_t</span>，再让 rollout model 从前缀和替代步骤继续生成后续链 <span class=\"kb-math kb-math-inline\">S^{(i)}</span>。validation model <span class=\"kb-math kb-math-inline\">V</span> 不只检查最终答案，还检查推理是否连贯、逻辑是否完整。论文用 Monte Carlo 形式估计：\n<div class=\"kb-math kb-math-display\">\\mathrm{PNS}(S,s_t,q)\\approx 1-\\frac{1}{k}\\sum_{i=1}^{k}V(S^{(i)}).</div>\n如果替换后大多数 rollout 仍然被验证为有效，说明原步骤不是必要条件，可以剪掉；如果替换后经常失败，原步骤的 PNS 高，应保留。</p>\n<p>这与常见的 CoT 压缩不同。简单压缩通常按长度、困惑度或句子重要性删减文本，可能删掉对最终答案关键但表面不显著的步骤；Causal-CoT 则通过“干预后答案是否仍成立”来判断必要性。它也不同于 self-consistency：self-consistency 汇总多条链的答案，Causal-CoT 要重构一条更短、更因果忠实的链，并把这些 compact CoT 用作 ICL 示例或 SFT 数据。</p>\n<div class=\"warn-box\">⚠️ 注意：Causal-CoT 的收益依赖 validator 和 rollout model 的可靠性。如果验证器只看最终答案而忽略中间逻辑，PNS 会把“碰巧答对”的反事实链误判为有效，从而过度剪枝。</div>",
      "quiz": {
        "q": "Causal-CoT 中某个步骤的 PNS 高通常意味着什么？",
        "options": [
          "该步骤被反事实替换后推理更容易失败，因此它对正确答案具有必要贡献",
          "该步骤越长越好，应无条件保留所有长步骤",
          "该步骤与问题无关，可以直接删除",
          "该步骤只提高输出格式，不影响推理结果"
        ],
        "answer": 0,
        "explain": "PNS 近似为 1 减去反事实链仍有效的比例；值高说明替换后多数 rollout 不能维持正确和连贯推理。"
      }
    },
    {
      "id": "ncots",
      "num": 19,
      "name": "NCoTS",
      "fullName": "神经思维链搜索 (Neural CoT Search)",
      "year": "2026.01",
      "org": "arXiv",
      "parent": "tot",
      "paperUrl": "https://arxiv.org/abs/2601.11340",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "搜索最优推理路径减少冗余提升准确率",
      "summary": "NCoTS 将大语言模型的推理过程重新建模为**最优思维策略的动态搜索问题**，在每个推理决策点通过双因子启发式函数（路径潜力 + 推理进度）评估候选推理算子，实现了准确率提升 3.5% 同时生成长度缩减 22% 的帕累托改进。",
      "keyPoints": [
        "<strong>推理路径规划瓶颈</strong>：揭示当前大推理模型（LRM）缺乏前瞻性，在关键决策点无法战略性地选择推理方向，导致陷入冗余的次优路径",
        "<strong>推理算子（Reasoning Operators）</strong>：定义思维 token 集合 <span class=\"kb-math kb-math-inline\">O = \\{\\text{Wait}, \\text{So}, \\text{Then}, \\ldots\\}</span> 作为推理方向的控制信号，不同算子一致性地触发不同思维模式",
        "<strong>四阶段搜索框架</strong>：暂停生成（Pause）→ 前瞻模拟（Lookahead）→ 启发式评估（Heuristic）→ 概率选择（Selection）",
        "<strong>双因子启发式函数</strong>：路径潜力估计器 <span class=\"kb-math kb-math-inline\">\\mathcal{H}_{\\text{pot}}</span>（通过 KL 散度从教师模型策略蒸馏）+ 进度估计器 <span class=\"kb-math kb-math-inline\">\\mathcal{H}_{\\text{prog}}</span>（MSE 回归预测推理完成比例）",
        "<strong>复合评分</strong>：<span class=\"kb-math kb-math-inline\">S(o) = \\mathcal{H}_{\\text{pot}}(h_t, o) + \\lambda \\cdot \\mathcal{H}_{\\text{prog}}(h&#x27;_{t,o})</span>，加法组合兼顾正确性与效率",
        "<strong>极低开销</strong>：仅增加 0.0017% 参数量，仅在约 3% 的 token 位置（步骤分隔符处）激活搜索",
        "<strong>与现有方法兼容</strong>：可与 AdaptThink 等推理效率方法叠加使用，效果进一步提升"
      ],
      "detail": "<h5>核心框架图</h5>\n<p><img alt=\"NCoTS 框架总览\" src=\"https://ar5iv.labs.arxiv.org/html/2601.11340/assets/x2.png\" />\n<em>图：NCoTS 框架总览。(a) 路径潜力估计器通过策略蒸馏从教师模型获取高层规划能力；(b) 进度估计器预测推理完成比例；(c) 四阶段搜索流程在每个决策点评估候选算子并选择最优方向。</em></p>\n<p><img alt=\"推理动机与路径规划重要性\" src=\"https://ar5iv.labs.arxiv.org/html/2601.11340/assets/x1.png\" />\n<em>图：(a) 传统 CoT 的规划瓶颈——模型在关键分叉点缺乏前瞻；(b) 来自强教师模型的稀疏引导 token 仅占总输出约 3%，却带来平均 6.2% 的准确率提升，证实路径规划是核心瓶颈。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># NCoTS 核心搜索流程伪代码\ndef ncots_generate(model, prompt, operators, H_pot, H_prog, λ, τ):\n    &quot;&quot;&quot;\n    model:     基础推理模型 (如 DeepSeek-R1-Distill-Qwen-7B)\n    operators: 推理算子集合 O = {&quot;Wait&quot;, &quot;So&quot;, &quot;Then&quot;, ...}\n    H_pot:     路径潜力估计器 (KL散度策略蒸馏训练)\n    H_prog:    进度估计器 (MSE回归训练)\n    λ:         进度权重超参数\n    τ:         softmax温度参数\n    &quot;&quot;&quot;\n    tokens = []\n    while not is_finished(tokens):\n        next_token = model.generate_next(prompt + tokens)\n        tokens.append(next_token)\n\n        if next_token == STEP_DELIMITER:  # 检测到 &quot;\\n\\n&quot; 步骤分隔符\n            # ── Phase 1: Pause Generation ──\n            # 暂停标准自回归生成\n\n            # ── Phase 2: Lookahead Simulation ──\n            scores = {}\n            h_t = model.get_hidden_state(tokens)\n            for o in operators:\n                # 将算子 o 追加到 KV cache，获取前瞻隐藏状态\n                h_prime = model.forward_one_token(tokens + [o])\n\n                # ── Phase 3: Heuristic Evaluation ──\n                pot  = H_pot(h_t, o)        # 路径潜力 (正确概率)\n                prog = H_prog(h_prime)      # 进度估计 (完成比例)\n                scores[o] = pot + λ * prog  # 加法复合评分\n\n            # ── Phase 4: Probabilistic Selection ──\n            probs = softmax([scores[o] / τ for o in operators])\n            best_op = sample(operators, probs)\n            tokens.append(best_op)\n\n    return tokens\n</code></pre>\n<h5>动机与背景</h5>\n<p>当前的大推理模型（如 DeepSeek-R1、QwQ）通过链式思维（CoT）在数学、逻辑和编程任务上取得了显著进展。然而，这些模型在生成推理步骤时是<strong>逐步顺序生成的，缺乏对整体推理路径的前瞻规划</strong>。这导致模型经常陷入次优的推理路径，产生大量冗余的反思和重复步骤。</p>\n<div class=\"key-point\">💡 关键发现：论文通过实验揭示，来自强教师模型（如 DeepSeek-R1）的稀疏引导 token 仅占总输出的约 3%，却能带来平均 6.2% 的准确率提升。这证明<strong>推理模型的核心瓶颈不在于计算能力，而在于路径规划能力</strong>。</div>\n<h5>推理解空间的量化表征</h5>\n<p>论文首先对推理解空间进行了系统的量化分析。通过在每个决策点随机采样不同的推理算子，生成大量不同的推理路径，并绘制\"平均长度 vs 平均准确率\"的密度热力图：</p>\n<p><img alt=\"推理解空间可视化\" src=\"https://ar5iv.labs.arxiv.org/html/2601.11340/assets/x3.png\" />\n<em>图：推理解空间的密度热力图。原始模型输出（Original）左上方区域的存在证实了\"更准确且更简洁\"的优越路径确实存在。</em></p>\n<p>这一分析揭示了四个关键洞察：\n1. <strong>优越路径存在</strong>：确实存在同时比标准输出更准确、更简洁的推理路径\n2. <strong>路径稀疏性</strong>：这些优越路径在解空间中是稀疏的，随机搜索难以高效找到\n3. <strong>准确率-长度负相关</strong>：更简洁的路径往往更准确，冗余步骤反而降低性能\n4. <strong>搜索的必要性</strong>：需要有引导的搜索策略而非随机探索</p>\n<h5>核心机制：四阶段搜索框架</h5>\n<p>NCoTS 的核心思想是在推理过程的每个<strong>决策点</strong>（即步骤分隔符 <code>\\n\\n</code> 出现的位置）进行主动的路径搜索：</p>\n<p><strong>阶段 1：暂停生成（Pause Generation）</strong></p>\n<p>标准生成过程在检测到步骤分隔符时立即暂停。步骤分隔符是推理步骤之间的自然边界（通常为 <code>\\n\\n</code>），代表模型即将选择下一个推理方向的关键时刻。</p>\n<p><strong>阶段 2：前瞻模拟（Lookahead Simulation）</strong></p>\n<p>在决策点，系统枚举所有候选推理算子 <span class=\"kb-math kb-math-inline\">O = \\{o_1, o_2, \\ldots, o_K\\}</span>。每个算子对应一个\"思维 token\"，如 \"Wait\"（触发反思）、\"So\"（推进推导）、\"Then\"（引入新步骤）等。对每个候选算子 <span class=\"kb-math kb-math-inline\">o</span>，将其追加到当前 KV cache 中执行一步前向传播，获取前瞻隐藏状态：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{h}&#x27;_{t,o} = \\mathcal{M}\\big([x, y_{&lt;t}, o]\\big), \\quad \\forall o \\in O</div>\n<div class=\"key-point\">💡 关键：论文发现推理算子与后续思维模式之间存在强对应关系——\"Wait\" 一致性地引导反思步骤，\"Then\" 触发顺序推进，\"Alternatively\" 引入替代方案。这种对应关系使得仅通过一步前瞻即可有效预测后续推理方向。</div>\n<p><img alt=\"算子与思维模式的对应关系\" src=\"https://ar5iv.labs.arxiv.org/html/2601.11340/assets/x4.png\" />\n<em>图：Sankey 图展示推理算子（思维 token）与后续思维模式的强对应关系。</em></p>\n<p><strong>阶段 3：启发式评估（Heuristic Evaluation）</strong></p>\n<p>对每个候选算子，使用<strong>双因子启发式函数</strong>进行评分：</p>\n<p><strong>因子 1：路径潜力估计器 <span class=\"kb-math kb-math-inline\">\\mathcal{H}_{\\text{pot}}</span></strong></p>\n<p>评估选择某个算子后最终得到正确答案的概率。实现为一个线性投影层，将当前隐藏状态映射为算子集合上的 logits。训练方式为<strong>策略蒸馏</strong>：以强教师模型（如 DeepSeek-R1）在算子集合上的概率分布 <span class=\"kb-math kb-math-inline\">P_T</span> 为目标，最小化 KL 散度：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{pot}} = \\mathbb{E}_{h_t \\sim \\mathcal{D}} \\left[ D_{\\text{KL}} \\Big( P_T(h_t) \\;\\big\\|\\; \\mathcal{H}_{\\text{pot}}(h_t) \\Big) \\right]</div>\n<p>这一设计将教师模型的战略规划能力迁移到搜索过程中，充当\"正确性指南针\"。</p>\n<p><strong>因子 2：进度估计器 <span class=\"kb-math kb-math-inline\">\\mathcal{H}_{\\text{prog}}</span></strong></p>\n<p>预测当前推理的完成比例，用于<strong>惩罚冗余路径、奖励高效路径</strong>。实现为一个线性回归头，将隐藏状态映射为标量。对于长度为 <span class=\"kb-math kb-math-inline\">L</span> 的完整推理路径中第 <span class=\"kb-math kb-math-inline\">k</span> 个 token，训练标签为归一化进度 <span class=\"kb-math kb-math-inline\">l_k = k / L</span>，使用均方误差损失：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{prog}} = \\mathbb{E}_{(h_k, l_k) \\sim \\mathcal{D}} \\left[ \\left\\| \\mathcal{H}_{\\text{prog}}(h_k) - l_k \\right\\|^2 \\right]</div>\n<p>通过最大化估计进度，搜索算法偏好能显著推进推理状态的算子，有效惩罚冗长或循环的步骤。</p>\n<p><img alt=\"进度估计器预测 vs 真实进度\" src=\"https://ar5iv.labs.arxiv.org/html/2601.11340/assets/x5.png\" />\n<em>图：进度估计器的预测值与真实进度的对比。指数平滑后的预测轨迹与真实进度高度吻合。</em></p>\n<div class=\"warn-box\">⚠️ 注意：进度估计器采用 token 级别的密集监督训练，不仅在决策点处有效，在推理路径的任意位置都能提供可靠的进度预测。</div>\n<p><strong>复合评分函数</strong></p>\n<p>两个因子通过<strong>加法</strong>组合为复合评分：</p>\n<div class=\"kb-math kb-math-display\">S(o) = \\underbrace{\\mathcal{H}_{\\text{pot}}(h_t, o)}_{\\text{路径潜力}} + \\lambda \\cdot \\underbrace{\\mathcal{H}_{\\text{prog}}(h&#x27;_{t,o})}_{\\text{推理进度}}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\lambda</span> 是控制简洁性偏好的超参数。这一设计确保：\n- 高潜力（更可能正确）的路径获得高分\n- 在潜力相近时，进度更高（更接近完成）的路径被优先选择\n- <span class=\"kb-math kb-math-inline\">\\lambda</span> 越大，模型越倾向于选择简洁的推理路径</p>\n<p><strong>阶段 4：概率选择（Probabilistic Selection）</strong></p>\n<p>为保持多样性并避免局部最优，将评分转化为概率分布后采样：</p>\n<div class=\"kb-math kb-math-display\">P_{\\text{search}}(o | h_t) = \\frac{\\exp(S(o) / \\tau)}{\\sum_{o&#x27; \\in O} \\exp(S(o&#x27;) / \\tau)}</div>\n<p>最终算子通过 <span class=\"kb-math kb-math-inline\">o^* \\sim P_{\\text{search}}</span> 采样选出。温度参数 <span class=\"kb-math kb-math-inline\">\\tau</span> 控制探索-利用平衡。</p>\n<h5>效率度量与实验结果</h5>\n<p>论文提出了效率度量指标 <span class=\"kb-math kb-math-inline\">\\eta</span>，同时考虑准确率提升和长度缩减：</p>\n<div class=\"kb-math kb-math-display\">\\eta = \\left(\\frac{\\text{Acc}_{\\text{method}}}{\\text{Acc}_{\\text{base}}}\\right)^2 \\cdot \\frac{\\text{Len}_{\\text{base}}}{\\text{Len}_{\\text{method}}}</div>\n<p>准确率的权重更高（平方项），体现\"正确性优先\"的设计理念。</p>\n<p><strong>主要实验结果</strong>（基于 DeepSeek-R1-Distill-Qwen 系列）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型规模</th>\n<th>平均准确率提升</th>\n<th>平均长度缩减</th>\n<th>平均 <span class=\"kb-math kb-math-inline\">\\eta</span></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1.5B</td>\n<td>+4.0%</td>\n<td>-22.3%</td>\n<td>1.595</td>\n</tr>\n<tr>\n<td>7B</td>\n<td>+3.5%</td>\n<td>-22.6%</td>\n<td>1.524</td>\n</tr>\n</tbody>\n</table></div>\n<p>亮点结果：\n- GSM8K (1.5B)：长度缩减超过 <strong>50%</strong>，同时准确率提升 2.4%\n- AMC23 (7B)：准确率大幅提升 <strong>7.5%</strong>，长度缩减 12%\n- 在所有基准上 <span class=\"kb-math kb-math-inline\">\\eta</span> 均为最高，显著优于 Budget Forcing、AdaptThink 等基线</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>传统 CoT</th>\n<th>Tree of Thoughts (ToT)</th>\n<th>NCoTS</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>搜索粒度</td>\n<td>无搜索</td>\n<td>完整推理路径级</td>\n<td>步骤级（决策点）</td>\n</tr>\n<tr>\n<td>计算开销</td>\n<td>无额外开销</td>\n<td>多次完整生成</td>\n<td>仅 0.0017% 参数增加</td>\n</tr>\n<tr>\n<td>是否需要外部评估</td>\n<td>否</td>\n<td>需要外部评估器/投票</td>\n<td>内置轻量启发式头</td>\n</tr>\n<tr>\n<td>训练需求</td>\n<td>无</td>\n<td>无（提示工程）</td>\n<td>需蒸馏训练两个小型线性头</td>\n</tr>\n<tr>\n<td>推理效率</td>\n<td>基线</td>\n<td>显著增加（多路并行）</td>\n<td>减少约 22%</td>\n</tr>\n<tr>\n<td>选择策略</td>\n<td>贪心解码</td>\n<td>外部评估排序</td>\n<td>概率采样（softmax + 温度）</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "NCoTS 的路径潜力估计器（Path Potential Estimator）的训练目标是什么？",
        "options": [
          "最小化预测进度与真实进度之间的均方误差",
          "最小化学生模型与教师模型在算子分布上的 KL 散度",
          "最大化推理路径最终得到正确答案的奖励信号",
          "最小化新旧策略概率比的裁剪目标函数"
        ],
        "answer": 1,
        "explain": "路径潜力估计器通过策略蒸馏训练，以强教师模型在推理算子集合上的概率分布为目标，最小化 KL 散度将教师的战略规划能力迁移到搜索过程中。"
      }
    },
    {
      "id": "long_cot",
      "num": 20,
      "name": "Long-CoT",
      "fullName": "长思维链缩放 (Long-CoT Scaling)",
      "year": "2026.01",
      "org": "NeurIPS",
      "parent": "cot",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/f3b336ac87912786ef2d72238058cb4f-Abstract-Conference.html",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "长推理链在复杂任务中指数级增益",
      "summary": "Long-CoT 证明并实证展示：在图连通性这类必须逐步传播信息的推理任务上，把测试时计算预算用于一条更长的思维链，可能比生成大量短思维链再投票具有指数级优势。",
      "keyPoints": [
        "将测试时计算明确区分为并行缩放和顺序缩放：前者生成多条短回答并用 best-of-n 或 majority vote 聚合，后者让模型在单条 CoT 中持续推进多步推理。",
        "构造 <span class=\"kb-math kb-math-inline\">(s,t_1,t_2)</span>-connectivity 图连通性任务：给定边列表和三个节点，保证 <span class=\"kb-math kb-math-inline\">s</span> 只与 <span class=\"kb-math kb-math-inline\">t_1,t_2</span> 中一个相连，模型必须找出可达目标。",
        "给出基于 transformer 表达能力的理论分离：多项式长度 CoT 可以实现 BFS 等多项式时间算法，而多项式数量的 <span class=\"kb-math kb-math-inline\">O(1)</span> 长度 CoT 在复杂性假设下仍无法解决连通性。",
        "提出 Vertex Query Model (VQM/RVQM) 抽象：把 CoT 每一步视为一次局部邻域查询，用 two-path 和 bridge graph 得到更细粒度的顺序与并行差距。",
        "在 bridge graph 中证明并行缩放需要 <span class=\"kb-math kb-math-inline\">\\exp(\\Omega(d))</span> 条独立短链才能把成功率提升到常数水平，而一条足够长的顺序链可以沿图结构逐层推进。",
        "实验覆盖从头训练的小型 transformer、DeepSeek-R1-Distill-Qwen-32B 以及 AIME2024 等设置，趋势一致支持长 CoT 在串行依赖任务上的价值。"
      ],
      "detail": "<p><img alt=\"Long-CoT 并行与顺序缩放对比\" src=\"https://github.com/seyedparsa/let-me-think/raw/main/figures/figure1.png\" />\n<em>图：论文和官方代码仓库给出的 Figure 1。横轴是单条 CoT 的顺序长度预算，纵轴是独立 CoT 数量，可以看到减少少量顺序预算往往需要大幅增加并行样本数才能补偿。</em></p>\n<pre><code class=\"language-python\"># Long-CoT 顺序缩放与并行缩放的核心流程抽象\ndef solve_connectivity_with_test_time_scaling(graph, s, t1, t2, mode, seq_budget, parallel_budget):\n    targets = {t1, t2}\n\n    def one_long_cot():\n        frontier = [s]\n        visited = {s}\n        trace = []\n        while frontier and len(trace) &lt; seq_budget:\n            v = frontier.pop()\n            trace.append(v)\n            if v in targets:\n                return v, trace\n            for u in graph.neighbors(v):\n                if u not in visited:\n                    visited.add(u)\n                    frontier.append(u)\n        return guess(t1, t2), trace\n\n    def one_short_cot():\n        trace = local_or_random_walk(graph, start=s, max_steps=seq_budget)\n        answer = extract_target_if_seen(trace, targets) or guess(t1, t2)\n        return answer, trace\n\n    if mode == &quot;sequential&quot;:\n        return one_long_cot()\n\n    votes = []\n    for _ in range(parallel_budget):\n        answer, trace = one_short_cot()\n        if verifies_path(trace, s, answer, graph):\n            return answer, trace      # best-of-n: 找到可验证证据就采用\n        votes.append(answer)\n    return majority_vote(votes), None # majority: 短链没有足够证据时只能靠统计聚合\n</code></pre>\n<p>这篇论文的核心不是提出一个新的提示模板，而是给 Long-CoT 一个可分析的计算视角。作者把测试时计算分成两类：并行缩放用 <span class=\"kb-math kb-math-inline\">N</span> 条互不通信的短推理链提高覆盖率，顺序缩放用一条更长的 CoT 把中间状态不断传递下去。对于每一步都依赖前一步发现的任务，这两类预算并不等价，因为短链之间不能共享已经探索到的节点、分支判断或局部证据。</p>\n<p>论文选择图连通性作为最小但足够有代表性的串行推理任务。标准 <span class=\"kb-math kb-math-inline\">(s,t)</span>-connectivity 在不可达时缺少短证书，因此作者改用 <span class=\"kb-math kb-math-inline\">(s,t_1,t_2)</span>-connectivity：保证 <span class=\"kb-math kb-math-inline\">s</span> 恰好和两个候选目标中的一个连通。这样正确答案总能由一条路径证明，CoT 可以自然写成从 <span class=\"kb-math kb-math-inline\">s</span> 出发的节点序列或 DFS 轨迹。输入边被随机排序，节点 ID 也被随机置换，模型不能依靠表面位置捷径，只能逐步恢复图结构。</p>\n<p>理论部分先给出极端情形的分离。在 <span class=\"kb-math kb-math-inline\">TC^0 \\not\\supseteq L</span> 的复杂性假设下，常数长度 CoT 的 bounded-depth transformer 落在低阶电路类中；即便并行采样多项式条，再做 majority vote，本质上仍不足以解决连通性。相反，多项式长度 CoT 可以模拟多项式时间算法，例如 BFS，因此存在常数 <span class=\"kb-math kb-math-inline\">c&gt;0</span>，长度不超过 <span class=\"kb-math kb-math-inline\">n^c</span> 的一条 CoT 可以解决任意规模为 <span class=\"kb-math kb-math-inline\">n</span> 的连通性实例。</p>\n<p>为了更贴近真实 CoT 长度预算，作者又提出 Vertex Query Model。VQM 把一次 CoT 推理抽象成一次邻域查询 <span class=\"kb-math kb-math-inline\">N_G(v)=\\{u:\\exists(v,u)\\in E\\}</span>，即模型在当前已知节点附近继续探索。two-path 图说明如果路径长为 <span class=\"kb-math kb-math-inline\">L</span>，少于 <span class=\"kb-math kb-math-inline\">(L-2)/2</span> 次查询的算法正确率只能是 <span class=\"kb-math kb-math-inline\">1/2</span>，而 <span class=\"kb-math kb-math-inline\">L-1</span> 次查询足以确定答案。bridge graph 更强：每层交叉点都要求做连续分支选择，短链每次都重新开始，优势会随深度指数衰减。</p>\n<p>论文中的关键结论可以概括为：</p>\n<div class=\"kb-math kb-math-display\">\\Pr[\\text{parallel succeeds}]\n\\le \\frac{1}{2} + \\exp\\left(-\\Omega(d)\\right),\n\\quad\nN_{\\text{parallel}} \\ge \\exp(\\Omega(d))</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">d</span> 是 bridge graph 深度。直觉上，一条长链可以把每层选择的结果保留下来，并在下一层继续使用；多条短链虽然总 token 数可能相近，但每条链都独立丢失了前面未完成的探索状态，所以很难补偿串行依赖。</p>\n<p>实验流程也服务于这个观点。作者训练模型生成 Shortest-Path、Path CoT 和 DFS CoT，并分别用 decision criterion 与 evidence criterion 评估答案和路径证据；并行聚合则使用 majority decision 或 best-of-n。结果显示，只要问题确实需要跨越多层图结构，增加单条 CoT 的长度会出现明显阈值效应，而增加短链数量只能缓慢改善，甚至在低顺序预算区间几乎无效。</p>\n<div class=\"key-point\">💡 关键：Long-CoT 的结论不等于“所有任务都应该无限拉长 CoT”。它说明的是，当任务包含不可压缩的串行依赖时，顺序计算和并行采样不是简单可替代关系，提示工程和推理系统应优先保证一条链有足够预算走完整个依赖路径。</div>",
      "quiz": {
        "q": "Long-CoT 论文中，为什么 bridge graph 会放大长 CoT 相对多条短 CoT 的优势？",
        "options": [
          "因为 bridge graph 的节点标签按答案顺序排列，长 CoT 更容易记忆标签",
          "因为每个交叉点的选择依赖前面已经走到的位置，短 CoT 无法继承连续探索状态",
          "因为 majority vote 会强制所有短 CoT 输出相同路径",
          "因为长 CoT 在训练时使用了更多模型参数"
        ],
        "answer": 1,
        "explain": "bridge graph 的难点是连续局部分支选择。长 CoT 能把前面探索到的状态传递到下一步，而互相独立的短链需要反复重新探索，因此并行数量要指数级增长。"
      }
    },
    {
      "id": "grace",
      "num": 21,
      "name": "GRACE",
      "fullName": "门控精炼压缩 (GRACE)",
      "year": "2026.01",
      "org": "NeurIPS",
      "parent": "opro",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/7f9a44cb707ede42a659ad85d940dd55-Abstract-Conference.html",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "门控机制精炼指令压缩冗余信息",
      "summary": "GRACE 提出 Gated Refinement 与 Adaptive Compression 两个互补机制，通过有控制地丢弃有害或冗余信息，解决自动提示优化中更新不稳定、候选搜索低效和局部最优停滞的问题。",
      "keyPoints": [
        "面向黑盒 LLM 的自动提示优化，不依赖目标模型梯度或内部状态，只通过训练集、验证集和优化器 LLM 迭代改写自然语言 prompt。",
        "Feedback Regulation Gate 同时采样成功样本和失败样本，让失败反馈提供改进方向，让成功样本约束更新幅度，避免过度纠偏和语义漂移。",
        "Update Rejection Gate 在验证集上比较当前 prompt 与候选 prompt，只接受带来验证性能提升的更新，把有害更新直接阻断。",
        "Adaptive Compression 在连续 <span class=\"kb-math kb-math-inline\">K</span> 次候选被拒后触发，将当前 prompt 中冗长、重复、过度具体的规则压缩成更抽象的任务关键概念。",
        "以“信息损失”换取泛化：门控丢弃噪声更新，压缩丢弃局部最优中积累的实例特化细节，形成局部精炼和全局重构的循环。",
        "在 11 个任务、3 类领域上评测，覆盖 BBH、医学领域任务和通用 NLP 任务；相对已有自动提示优化方法分别取得 4.7%、4.4%、2.7% 的平均相对提升，并用约 25% 的 prompt 生成预算达到更好结果。"
      ],
      "detail": "<p><img alt=\"GRACE 方法框架\" src=\"https://github.com/Eric8932/GRACE/raw/main/images/method.png\" />\n<em>图：官方代码仓库中的方法图。左侧是传统扩展与选择范式，右侧是 GRACE 的反馈调节门、更新拒绝门和自适应压缩循环。</em></p>\n<pre><code class=\"language-python\"># GRACE 论文 Algorithm 1 的简化伪代码\ndef grace(P0, D_train, D_val, optimizer_llm, evaluator, T, K):\n    P = P0\n    best_P = P0\n    reject_counter = 0\n\n    for t in range(T):\n        # Gated Refinement: 用成功样本调节失败反馈\n        successes, failures = partition_by_score(D_train, prompt=P, evaluator=evaluator)\n        batch = sample(successes) + sample(failures)\n        P_candidate = optimizer_llm.generate(\n            current_prompt=P,\n            update_batch=batch,\n            meta_prompt=&quot;fix failures while preserving successful patterns&quot;,\n        )\n\n        # Update Rejection Gate: 只接受验证集更优的候选\n        if score(P_candidate, D_val, evaluator) &gt; score(P, D_val, evaluator):\n            P = P_candidate\n            reject_counter = 0\n        else:\n            reject_counter += 1\n\n        # Adaptive Compression: 连续停滞时压缩并抽象 prompt\n        if reject_counter == K:\n            P = optimizer_llm.generate(\n                current_prompt=P,\n                meta_prompt=&quot;remove redundancy and abstract case-specific rules&quot;,\n            )\n            reject_counter = 0\n\n        if score(P, D_val, evaluator) &gt; score(best_P, D_val, evaluator):\n            best_P = P\n\n    return best_P\n</code></pre>\n<p>GRACE 继承了 OPRO/APO/PromptAgent 这类“用 LLM 优化 prompt”的黑盒设置：给定初始 prompt <span class=\"kb-math kb-math-inline\">P_0</span>、训练样本、验证样本、目标模型 <span class=\"kb-math kb-math-inline\">B</span> 和优化器模型 <span class=\"kb-math kb-math-inline\">O</span>，目标是在离散自然语言空间中找到让目标任务得分最高的 prompt。论文将目标写成：</p>\n<div class=\"kb-math kb-math-display\">P^*=\\arg\\max_{P\\in S} f_B(P,D)\n=\\arg\\max_{P\\in S}\\sum_{(a_i,q_i)\\in D} f(p_B(a_i\\mid P,q_i)).</div>\n<p>传统反思式 APO 往往只看失败样本，把错误分析当作“文本梯度”。这个信号很强，但也容易偏：如果某一批失败样本包含偶然模式，优化器会把 prompt 改得过于具体，导致原本能做对的样本被破坏。GRACE 的反馈调节门把训练集按当前 prompt 的表现分成成功集 <span class=\"kb-math kb-math-inline\">S_t</span> 与失败集 <span class=\"kb-math kb-math-inline\">F_t</span>，再构造更新批次 <span class=\"kb-math kb-math-inline\">B_t=S&#x27;_t\\cup F&#x27;_t</span>，候选更新为：</p>\n<div class=\"kb-math kb-math-display\">P_t^c \\sim p_O(P\\mid P_t,B_t,m_1).</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">m_1</span> 明确要求优化器“修复失败，同时保留成功模式”。这相当于给文本梯度加入一个正则项：失败样本提供方向，成功样本限制步长和语义边界。论文的直觉是，真正有用的更新不应只解释错误，还必须不破坏已经有效的任务理解。</p>\n<p>第二道门是更新拒绝门。即使候选 prompt 由平衡样本生成，它仍可能包含冗余、冲突或过度具体的规则。因此 GRACE 不直接采用候选，而是在验证集上做二选一：</p>\n<div class=\"kb-math kb-math-display\">P_{t+1}=\\arg\\max_{P\\in\\{P_t,P_t^c\\}} f_B(P,D_{val}).</div>\n<p>如果候选没有提升，更新被拒绝，信息流被阻断。这个设计牺牲了部分探索速度，但显著降低了 prompt 行为突变的风险，也解释了为什么 GRACE 每轮只生成一个候选仍能比大量候选搜索更高效。</p>\n<p>自适应压缩处理另一个常见问题：prompt 优化前几轮能快速提升，随后大量规则堆积，新增内容从通用原则变成实例特化补丁，优化进入局部最优。GRACE 在连续 <span class=\"kb-math kb-math-inline\">K</span> 次拒绝后触发压缩：</p>\n<div class=\"kb-math kb-math-display\">P_{t+1}\\sim p_O(P\\mid P_t,m_2),\n\\quad\n\\sum_{j=t-K+1}^{t} \\mathbf{1}[P_j=P_{j-1}]=K.</div>\n<p><span class=\"kb-math kb-math-inline\">m_2</span> 要求优化器合并或删除重复元素，并把具体条件、记忆化措辞和窄规则抽象为更一般的任务指导。这与信息瓶颈思想一致：保留任务相关信息，压缩无关或有害细节。压缩后的 prompt 不只是变短，而是重置了后续 gated refinement 的起点，使优化可以从另一个更泛化的局部区域继续前进。</p>\n<div class=\"key-point\">💡 关键：GRACE 的“loss”不是性能损失，而是主动的信息损失。反馈调节、更新拒绝和压缩都在丢弃信息，但丢弃的是不稳定更新、验证集无效更新和局部最优中积累的冗余细节。</div>",
      "quiz": {
        "q": "GRACE 中 Adaptive Compression 主要在什么情况下触发？",
        "options": [
          "每次候选 prompt 在训练集上得分提升时",
          "当连续 K 次候选更新被拒绝，说明优化可能停滞时",
          "当优化器 LLM 的上下文窗口不足以放入训练集时",
          "当 prompt 长度短于初始 prompt 时"
        ],
        "answer": 1,
        "explain": "GRACE 使用 rejection counter 检测停滞。连续 K 次没有验证集提升时，压缩当前 prompt 以去除冗余和过度具体内容，从而逃离局部最优。"
      }
    },
    {
      "id": "uniapo",
      "num": 22,
      "name": "UniAPO",
      "fullName": "统一多模态提示优化 (UniAPO)",
      "year": "2026.02",
      "org": "AAAI",
      "parent": "opro",
      "paperUrl": "https://ojs.aaai.org/index.php/AAAI/article/view/40151",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "首个多模态自动提示优化方法",
      "summary": "UniAPO 提出首个统一的多模态自动提示优化框架，用 EM 式 E/M 两步解耦反馈建模与 prompt 精炼，并通过短长期记忆缓解视觉 token 膨胀和过程级监督不足。",
      "keyPoints": [
        "将自动提示优化从文本扩展到文本、图像、视频统一场景，目标是在同一框架下优化 MLLM 的任务 prompt。",
        "使用多角色冻结 MLLM 系统：任务模型 <span class=\"kb-math kb-math-inline\">L_T</span>、反馈模型 <span class=\"kb-math kb-math-inline\">L_F</span>、prompt 优化模型 <span class=\"kb-math kb-math-inline\">L_P</span> 和演化模型 <span class=\"kb-math kb-math-inline\">L_E</span>。",
        "采用 EM-inspired 优化：E-step 生成并更新反馈记忆，M-step 利用反馈和 prompt 记忆生成新 prompt。",
        "Feedback Memory <span class=\"kb-math kb-math-inline\">M_F^t</span> 保存历史反馈，解决多模态错误样本太长、无法全部塞入上下文的问题。",
        "Prompt Memory <span class=\"kb-math kb-math-inline\">M_P^t</span> 保存历史 prompt 及验证分数，提供过程级监督，避免只依赖当前错误反馈造成不稳定更新。",
        "E-step 结合当前错误集的短期反馈、从历史中检索的长期反馈、演化融合和过滤机制，获得有效反馈 <span class=\"kb-math kb-math-inline\">F_{t+1}</span>。",
        "M-step 结合当前反馈生成短期 prompt，再用 top-k 历史高分 prompt 作为长期过程指导，通过演化融合和 beam search 延长优化视野。",
        "在文本分类/生成、图像分类、视频分类和视频关键词抽取上评测，UniAPO 在 GPT-4o 与 QwenVL2.5-72B 设置下均相对 Vanilla、CoT、EvoPrompt、ERM 等基线取得稳定提升。"
      ],
      "detail": "<p><img alt=\"UniAPO 动机与 EM 式优化框架\" src=\"https://www.catalyzex.com/_next/image?q=75&amp;url=https%3A%2F%2Ffigures.semanticscholar.org%2F13c6c22e41bf029ecd5e3a4d9f2ac27afe1c0392%2F2-Figure1-1.png&amp;w=640\" />\n<em>图：UniAPO 论文 Figure 1 的公开图像版本。左侧显示朴素多模态 APO 的视觉 token 膨胀和监督不清，右侧展示 E-step/M-step、反馈记忆与 prompt 记忆的闭环。</em></p>\n<pre><code class=\"language-python\"># UniAPO 的 EM-inspired 多模态 prompt 优化伪代码\ndef uniapo(simple_prompt, D_train, D_dev, LT, LF, LP, LE, T, beam_size, top_k):\n    P0 = LP.refine_initial_prompt(simple_prompt)\n    feedback_memory = []\n    prompt_memory = [(P0, evaluate(LT, P0, D_dev))]\n    beams = [P0]\n\n    for t in range(T):\n        new_prompts = []\n        for P_t in beams:\n            # E-step: 反馈建模，缓解视觉 token 膨胀\n            errors = collect_errors(LT, P_t, D_train)\n            clusters = dbscan_cluster(errors, encoder=&quot;BGE-m3&quot;)\n            F_short = LF.generate_feedback(P_t, clusters)\n            F_long = retrieve_relevant_feedback(F_short, feedback_memory)\n            F_candidate = LE.merge_feedback(F_short, F_long)\n            F_t1 = filter_feedback(F_candidate, errors, P_t, LT)\n            feedback_memory.append(F_t1)\n\n            # M-step: prompt 精炼，引入 outcome-level 与 process-level 双监督\n            positives = sample_successes(D_train, errors)\n            P_short = LP.optimize_prompt(P_t, F_t1, positives)\n            P_long = top_k_prompts(prompt_memory, k=top_k)\n            P_next = LE.evolve_prompt(P_short, P_long)\n            score = evaluate(LT, P_next, D_dev)\n            prompt_memory.append((P_next, score))\n            new_prompts.append((P_next, score))\n\n        beams = [p for p, _ in top_b(prompt_memory, b=beam_size)]\n\n    return best_prompt(prompt_memory)\n</code></pre>\n<p>UniAPO 的出发点是：文本 APO 的“错误样本 -&gt; 反馈 -&gt; 改写 prompt”闭环，直接搬到多模态任务会同时遇到两个问题。第一是视觉 token 膨胀，一张高分辨率图像或一段短视频就可能消耗大量上下文，导致反馈模型无法同时读取足够多的当前错误和历史错误。第二是过程级监督不足，传统 APO 主要用当前输出对错作为 outcome-level 信号，很少利用“哪些历史 prompt 曾经有效、优化路径为何有效”这类过程信息。</p>\n<p>论文把这两个纠缠的问题拆成 EM-inspired 的两步。E-step 负责在当前 prompt 下估计更可靠的反馈变量，M-step 负责在反馈和历史 prompt 指导下更新 prompt。整体写作：</p>\n<div class=\"kb-math kb-math-display\">(F_{t+1},M_F^{t+1})\n=\\mathrm{E\\mbox{-}Step}(D_{error}^t,M_F^t;L_F,L_E),</div>\n<div class=\"kb-math kb-math-display\">(P_{t+1},M_P^{t+1})\n=\\mathrm{M\\mbox{-}Step}(F_{t+1},M_P^t,P_t;L_P,L_E).</div>\n<p>这里的 EM 不是严格概率模型求解，而是一个工程化分解：先让反馈变得更充分、更干净，再让 prompt 更新受到当前反馈和历史成功轨迹的双重约束。</p>\n<p>E-step 的关键是短长期反馈记忆。短期反馈来自当前错误集 <span class=\"kb-math kb-math-inline\">D_{error}^t</span>，但当前错误本身也可能太长，所以 UniAPO 先用 BGE-m3 表征和 DBSCAN 聚类，把相似失败归为簇，再分块生成聚类级反馈：</p>\n<div class=\"kb-math kb-math-display\">F_{short}^{t+1}=L_F(P_t,\\mathrm{Clustering}(D_{error}^t)).</div>\n<p>长期反馈不直接把整个 <span class=\"kb-math kb-math-inline\">M_F^t</span> 全塞进上下文，而是用 <span class=\"kb-math kb-math-inline\">F_{short}^{t+1}</span> 作为查询，从反馈记忆中检索语义相关的历史记录：</p>\n<div class=\"kb-math kb-math-display\">F_{long}^{t+1}=\\mathrm{Retrieval}(F_{short}^{t+1},M_F^t).</div>\n<p>随后演化模型 <span class=\"kb-math kb-math-inline\">L_E</span> 融合短期和长期反馈，过滤器只保留确实能修复当前错误的建议，得到最终 <span class=\"kb-math kb-math-inline\">F_{t+1}</span>。这种设计把“长历史”压缩成与当前失败相关的可操作反馈，避免多模态上下文被原始图像/视频错误样本淹没。</p>\n<p>M-step 则把监督信号分成 outcome-level 和 process-level。outcome-level 来自刚生成的 <span class=\"kb-math kb-math-inline\">F_{t+1}</span>，由 <span class=\"kb-math kb-math-inline\">L_P</span> 改写当前 prompt，生成短期候选：</p>\n<div class=\"kb-math kb-math-display\">P_{short}^{t+1}=L_P(P_t,F_{t+1},\\mathrm{Sample}(D_{train}-D_{error}^t)).</div>\n<p>这里加入成功样本是为了防止只围绕当前失败过拟合。process-level 来自 prompt memory：UniAPO 选取历史上在开发集表现最好的 top-k prompt，形成长期提示指导 <span class=\"kb-math kb-math-inline\">P_{long}^{t+1}=\\mathrm{TopK}(M_P^t,k)</span>。最后 <span class=\"kb-math kb-math-inline\">L_E</span> 像演化交叉一样融合短期候选与长期优秀策略，得到 <span class=\"kb-math kb-math-inline\">P_{t+1}</span>，并把它连同开发集分数加入 <span class=\"kb-math kb-math-inline\">M_P</span>。</p>\n<p>与 OPRO/APO 这类文本优化器相比，UniAPO 的主要增量在于“记忆不是简单历史拼接”。反馈记忆解决的是多模态 token 过长导致的反馈不足，prompt 记忆解决的是只看当前结果导致的过程监督缺失。二者配合后，系统既能对最近错误快速响应，又能被历史高质量 prompt 拉回稳定方向，适合视频关键词抽取、图像分类、文本生成等异构任务。</p>\n<div class=\"key-point\">💡 关键：UniAPO 的统一性来自角色和流程统一，而不是把所有模态压成相同输入。不同模态仍由 MLLM 处理，优化层只维护反馈、prompt、验证分数和检索/演化机制。</div>",
      "quiz": {
        "q": "UniAPO 中 Prompt Memory 的主要作用是什么？",
        "options": [
          "缓存所有原始图片和视频 token，避免重新编码",
          "保存历史高分 prompt，为 M-step 提供过程级监督和长期优化方向",
          "替代任务模型 LT 直接输出最终答案",
          "把多模态输入转换成纯文本数据集"
        ],
        "answer": 1,
        "explain": "Prompt Memory 记录历史 prompt 及其开发集分数，M-step 通过 Top-K 选出高质量历史 prompt，作为过程级监督来稳定和引导当前 prompt 更新。"
      }
    },
    {
      "id": "promptmix",
      "num": 23,
      "name": "PromptMix",
      "fullName": "提示混合增强 (PromptMix)",
      "year": "2026.03",
      "org": "Information Fusion",
      "parent": "—",
      "paperUrl": "https://www.sciencedirect.com/science/article/pii/S1566253526000655",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "语义提示与多模态混合增强泛化能力",
      "summary": "PromptMix 提出一种由 LLM 辅助的视觉语言模型提示学习框架，通过语义提示进化、模态无关共享表示和跨注意力适配器，缓解小样本工业识别中的过拟合、提示表达不足和跨模态对齐不稳问题。",
      "keyPoints": [
        "面向真实工程视觉识别：重点处理标注稀缺、缺陷形态细微、类间差异容易混淆的低数据场景",
        "LLM 语义增强：为类别生成细粒度自然语言描述，并经冻结文本编码器得到局部语义 <span class=\"kb-math kb-math-inline\">T_{local}</span> 与全局语义 <span class=\"kb-math kb-math-inline\">T_{global}</span>",
        "MASR：构建 Modality-Agnostic Shared Representation，减少预训练数据与目标工业数据之间的分布差异",
        "LAPE：利用 LLM-Aided Prompt Evolution 将外部语义融入可学习上下文提示，迭代改进提示表达",
        "CAA：通过 Cross-Attentive Adapter 对文本与图像分支进行跨模态融合，提升低样本条件下的鲁棒性",
        "多损失训练：联合分类损失、提示进化/对齐相关损失与教师分布蒸馏，使 student 预测接近更稳定的 teacher 分布",
        "实验覆盖七个数据集：包含六个公开工业基准和一个自建工业数据集，验证 base-to-novel 与 few-shot 泛化"
      ],
      "detail": "<p><img alt=\"PromptMix 框架图\" src=\"https://ars.els-cdn.com/content/image/1-s2.0-S1566253526000655-gr1_lrg.jpg\" />\n<em>图：PromptMix 的整体流程。LLM 生成类别描述，MASR 产生共享表示，LAPE 进化文本提示，CAA 对图像与文本分支做跨注意力适配。</em></p>\n<pre><code class=\"language-python\"># PromptMix 训练流程伪代码\ndef train_promptmix(vlm, class_names, train_loader, llm, teacher):\n    freeze(vlm.text_encoder, vlm.image_encoder)\n    prompts = init_learnable_context(class_names)          # X_prompt + class token\n    adapters = init_cross_attentive_adapters()\n    masr = init_modality_agnostic_shared_representation()\n\n    llm_prompts = {\n        c: llm.generate_description(c, domain=&quot;industrial recognition&quot;)\n        for c in class_names\n    }\n    llm_tokens = tokenize(llm_prompts)\n    t_local, t_global = vlm.text_encoder(llm_tokens).token_features_and_mean()\n\n    for images, labels in train_loader:\n        r_text, r_vision = masr(prompts, images)\n        evolved_prompt = LAPE(\n            base_prompt=prompts,\n            llm_local=t_local,\n            llm_global=t_global,\n            shared_text=r_text,\n        )\n\n        text_feat = vlm.text_encoder(evolved_prompt)\n        image_feat = vlm.image_encoder(images, visual_prompt=r_vision)\n        fused_text, fused_image = adapters.cross_attend(text_feat, image_feat)\n\n        student_logits = cosine_classifier(fused_image, fused_text)\n        with no_grad():\n            teacher_logits = teacher(images, class_names)\n\n        loss = (\n            ce_loss(student_logits, labels)\n            + lambda_pil * prompt_image_language_loss(fused_image, fused_text)\n            + lambda_prl * prompt_refinement_loss(evolved_prompt, t_global)\n            + lambda_kd * kl_divergence(student_logits, teacher_logits)\n        )\n        update(prompts, adapters, masr, loss)\n\n    return prompts, adapters, masr\n</code></pre>\n<p>PromptMix 的直接动机是 CLIP 类视觉语言模型在低样本工业场景中容易出现两类失败：一是可学习 prompt 只由少量样本驱动，容易记住训练域的表面纹理；二是类别名或模板句过短，无法表达“焊缝细黑沟槽”“轻微划痕”这类细粒度语义。论文因此不把 LLM 只当作离线文字扩写器，而是把 LLM 描述、可学习 prompt、图像特征放入同一个可训练融合流程中。</p>\n<p>在语义侧，LLM 根据类别和任务上下文生成更具判别性的描述 <span class=\"kb-math kb-math-inline\">T_{LLM}</span>，再通过冻结的文本编码器得到 token 级局部语义 <span class=\"kb-math kb-math-inline\">T_{local}</span> 与平均池化后的全局语义 <span class=\"kb-math kb-math-inline\">T_{global}</span>。局部语义适合描述部件、形状、颜色和缺陷模式，全局语义提供类别级概念锚点；这比直接使用 “a photo of a class” 更能覆盖工业图像中的细微差异。</p>\n<p>MASR 的作用是建立模态无关共享表示。图中可以看到 MASR 同时向文本 prompt 编码器与图像 prompt 编码器提供 <span class=\"kb-math kb-math-inline\">R_t</span> 与 <span class=\"kb-math kb-math-inline\">R_v</span>，直觉上是在可学习 prompt 前先构造一个跨模态共享的潜在空间。这样做的意义是降低 CLIP 预训练分布与目标工业数据分布之间的落差，避免文本分支只学到自然图像语义、视觉分支只响应目标域噪声。</p>\n<p>LAPE 是 PromptMix 的提示进化核心。它不是简单把 LLM 输出拼接到模板里，而是让 Prompt Evolution 模块在 <span class=\"kb-math kb-math-inline\">T_{local}</span>、<span class=\"kb-math kb-math-inline\">T_{global}</span>、当前 prompt 表示之间进行迭代更新，并用提示相关损失约束更新方向。可以把整体目标概括为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} =\n\\mathcal{L}_{CE}\n+ \\lambda_{PIL}\\mathcal{L}_{PIL}\n+ \\lambda_{PRL}\\mathcal{L}_{PRL}\n+ \\lambda_{KD}\\mathcal{L}_{KD}.</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_{CE}</span> 负责监督分类，<span class=\"kb-math kb-math-inline\">\\mathcal{L}_{PIL}</span> 与 <span class=\"kb-math kb-math-inline\">\\mathcal{L}_{PRL}</span> 约束图文提示交互和提示进化质量，<span class=\"kb-math kb-math-inline\">\\mathcal{L}_{KD}</span> 让 student 的预测分布向 teacher 分布靠近。这个组合目标的核心不是追求更复杂的分类头，而是让提示、图像和文本三类信号在低样本下保持一致。</p>\n<p>CAA 负责最后的跨模态适配。图中 Text Adapter 与 Image Adapter 接收文本信号、图像信号和多模态信号，通过交互后输出 <span class=\"kb-math kb-math-inline\">T_{TA}</span> 与 <span class=\"kb-math kb-math-inline\">V_{IA}</span>，再计算 student 预测 <span class=\"kb-math kb-math-inline\">P_{student}</span>。相比只调文本 prompt 的 CoOp 式方法，PromptMix 同时让视觉侧与文本侧参与适配；相比只做特征 adapter 的方法，它又保留了 LLM 语义对类别边界的指导。</p>\n<p>推理时，训练好的 prompt、MASR 和 adapter 被固定，输入图像经图像编码器与图像适配器得到视觉特征，类别侧使用进化后的文本提示得到文本原型，再以图文相似度完成分类。因此 PromptMix 的优势主要体现在需要从少量标注中泛化到新类别或新工业场景时：LLM 语义提供更宽的概念覆盖，MASR 降低域偏移，CAA 让两种模态在任务相关维度上重新对齐。</p>",
      "quiz": {
        "q": "PromptMix 中 LAPE 的主要作用是什么？",
        "options": [
          "利用 LLM 语义迭代增强和细化可学习文本提示",
          "把所有图像转换为纯文本描述后再分类",
          "替代 CLIP 的文本编码器和图像编码器",
          "只用 BM25 检索类别相关文档"
        ],
        "answer": 0,
        "explain": "LAPE 即 LLM-Aided Prompt Evolution，核心是把 LLM 生成的局部/全局语义注入可学习 prompt，并约束提示进化过程。"
      }
    },
    {
      "id": "vcp",
      "num": 24,
      "name": "VCP",
      "fullName": "视觉条件提示 (Visual Conditional Prompts)",
      "year": "2026.04",
      "org": "Expert Systems",
      "parent": "promptmix",
      "paperUrl": "https://www.sciencedirect.com/science/article/pii/S0957417426009905",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "视觉引导条件提示实现图文深度对齐",
      "summary": "VCP 通过视觉特征生成实例相关的条件提示，并与语义条件提示和上下文提示融合，使视觉语言模型在未见类别上获得更细粒度的图文对齐。",
      "keyPoints": [
        "公开 arXiv 版本对应 MuGCP：多模态互指导条件提示学习",
        "使用多模态大模型生成 Semantic Conditional Prompts，补充类别语义",
        "Attention Mutual-Guidance 模块从视觉特征中生成 Visual Conditional Prompts",
        "Multi-Prompt Fusion 同时融合语义提示、视觉提示和可学习上下文提示",
        "文本增强与一致性损失提升未见类别和跨域泛化",
        "重点解决固定 prompt 无法适配每张图像实例的问题"
      ],
      "detail": "<p><img alt=\"MuGCP / VCP 框架图\" src=\"https://arxiv.org/html/2507.08410v1/extracted/6614324/OverView5.png\" />\n<em>图源：arXiv HTML framework figure，展示 SCP、VCP、AMG 与 MPF 的整体流程。</em></p>\n<pre><code class=\"language-python\"># VCP / MuGCP 条件提示学习伪代码\ndef vcp_forward(image, class_names, clip_model, mllm, amg, mpf):\n    visual_tokens = clip_model.encode_image_tokens(image)\n    semantic_prompts = mllm.generate_semantic_conditional_prompts(class_names)\n\n    visual_prompts = amg(\n        visual_tokens=visual_tokens,\n        semantic_prompts=semantic_prompts,\n    )\n    fused_prompts = mpf.combine(\n        context_prompts=learnable_context_tokens(),\n        semantic_prompts=semantic_prompts,\n        visual_prompts=visual_prompts,\n    )\n\n    image_feature = clip_model.encode_image(image, prompts=visual_prompts)\n    text_features = clip_model.encode_text(class_names, prompts=fused_prompts)\n    logits = similarity(image_feature, text_features)\n    return logits\n</code></pre>\n<p>传统 prompt learning 常用一组全局可学习上下文 token，同一类别或同一任务共享同一 prompt。这种方式对训练类有效，但对未见类别和分布偏移不够灵活。VCP 的核心是让 prompt 条件化于当前图像实例：不同图像可以触发不同视觉提示，从而捕捉姿态、局部区域、背景和细粒度属性差异。</p>\n<p>SCP 和 VCP 分别提供两种条件信息。SCP 来自多模态大模型或语言知识，强调类别语义、属性和常识；VCP 来自视觉编码器内部特征，强调当前图像中实际出现的视觉证据。二者互补：语义提示告诉模型应该看什么，视觉提示告诉模型这张图像实际支持什么。</p>\n<p>AMG 模块负责互指导。它不是单向地把文本加到图像或把图像加到文本，而是在跨层、跨模态特征之间建立注意力交互，使语义提示和视觉提示共同调整。这样可以减少文本描述与图像区域错配的问题。</p>\n<p>MPF 将可学习上下文提示、语义条件提示和视觉条件提示融合后送入 CLIP 类编码器。训练中再配合文本增强和一致性损失，约束不同增强视角下预测稳定。相比 PromptMix 偏重语义属性混合，VCP 更强调实例级视觉条件化，因此对细粒度分类和跨域泛化更有意义。</p>",
      "quiz": {
        "q": "VCP 相比固定上下文 prompt 的核心优势是什么？",
        "options": [
          "可以根据当前图像实例生成视觉条件提示",
          "完全不需要图像编码器",
          "只依赖类别名称，不使用视觉特征",
          "把所有类别合并成一个标签"
        ],
        "answer": 0,
        "explain": "VCP 利用图像特征产生实例相关提示，使图文对齐能随输入图像动态变化。"
      }
    }
  ],
  "categories": {
    "basic": {
      "label": "基础提示技术",
      "color": "#4A90E2"
    },
    "reasoning": {
      "label": "推理增强技术",
      "color": "#50E3C2"
    },
    "optimization": {
      "label": "自动化与提示优化",
      "color": "#F5A623"
    },
    "frontier_2026": {
      "label": "2026年前沿进展",
      "color": "#D0021B"
    }
  },
  "projectUrls": {}
};
