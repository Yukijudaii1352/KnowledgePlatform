/**
 * prompt_engineering-data.js — 由 pipeline/build.py 于 2026-06-15 09:55:58 自动生成。
 * 源文件：content/llm/prompt_engineering.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "llm",
    "topic_id": "prompt_engineering",
    "topic_name": "提示词工程",
    "page_title": "提示词工程 算法总结",
    "page_subtitle": "2026-06-15 版",
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
      "summary": "Few-shot 的核心目标是：通过少量示例激发模型上下文学习能力。",
      "keyPoints": [
        "核心动机：通过少量示例激发模型上下文学习能力",
        "代表机构：OpenAI"
      ],
      "detail": "<p>通过少量示例激发模型上下文学习能力</p>"
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
      "summary": "Zero-shot 的核心目标是：仅凭指令完成任务，无需示例。",
      "keyPoints": [
        "核心动机：仅凭指令完成任务，无需示例",
        "代表机构：OpenAI"
      ],
      "detail": "<p>仅凭指令完成任务，无需示例</p>"
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
      "summary": "ICL 的核心目标是：研究示例选择与顺序对性能的影响。",
      "keyPoints": [
        "核心动机：研究示例选择与顺序对性能的影响",
        "演化来源：继承或改进自 few_shot",
        "代表机构：Google/Stanford"
      ],
      "detail": "<p>研究示例选择与顺序对性能的影响</p>"
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
      "summary": "CoT 的核心目标是：通过中间推理步骤提升复杂推理能力。",
      "keyPoints": [
        "核心动机：通过中间推理步骤提升复杂推理能力",
        "演化来源：继承或改进自 few_shot",
        "代表机构：Google"
      ],
      "detail": "<p>通过中间推理步骤提升复杂推理能力</p>"
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
      "summary": "Self-Consistency 的核心目标是：多路径采样投票提升推理鲁棒性。",
      "keyPoints": [
        "核心动机：多路径采样投票提升推理鲁棒性",
        "演化来源：继承或改进自 cot",
        "代表机构：Google"
      ],
      "detail": "<p>多路径采样投票提升推理鲁棒性</p>"
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
      "summary": "Zero-shot CoT 的核心目标是：\"Let's think step by step\"激发推理。",
      "keyPoints": [
        "核心动机：\"Let's think step by step\"激发推理",
        "演化来源：继承或改进自 cot",
        "代表机构：东京大学/Google"
      ],
      "detail": "<p>\"Let's think step by step\"激发推理</p>"
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
      "summary": "Least-to-Most 的核心目标是：将复杂问题分解为子问题逐步求解。",
      "keyPoints": [
        "核心动机：将复杂问题分解为子问题逐步求解",
        "演化来源：继承或改进自 cot",
        "代表机构：Google"
      ],
      "detail": "<p>将复杂问题分解为子问题逐步求解</p>"
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
      "summary": "ReAct 的核心目标是：协同推理与行动调用外部工具。",
      "keyPoints": [
        "核心动机：协同推理与行动调用外部工具",
        "演化来源：继承或改进自 cot",
        "代表机构：Google/Princeton"
      ],
      "detail": "<p>协同推理与行动调用外部工具</p>"
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
      "summary": "ToT 的核心目标是：引入搜索算法探索与回溯思维路径。",
      "keyPoints": [
        "核心动机：引入搜索算法探索与回溯思维路径",
        "演化来源：继承或改进自 cot",
        "代表机构：Princeton/Google"
      ],
      "detail": "<p>引入搜索算法探索与回溯思维路径</p>"
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
      "summary": "PAL 的核心目标是：将推理转为可执行代码保证准确性。",
      "keyPoints": [
        "核心动机：将推理转为可执行代码保证准确性",
        "演化来源：继承或改进自 cot",
        "代表机构：CMU"
      ],
      "detail": "<p>将推理转为可执行代码保证准确性</p>"
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
      "summary": "Universal SC 的核心目标是：扩展自洽性至开放式任务。",
      "keyPoints": [
        "核心动机：扩展自洽性至开放式任务",
        "演化来源：继承或改进自 self_consistency",
        "代表机构：Google"
      ],
      "detail": "<p>扩展自洽性至开放式任务</p>"
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
      "summary": "GoT 的核心目标是：将思维建模为有向图支持聚合循环。",
      "keyPoints": [
        "核心动机：将思维建模为有向图支持聚合循环",
        "演化来源：继承或改进自 tot",
        "代表机构：ETH Zurich"
      ],
      "detail": "<p>将思维建模为有向图支持聚合循环</p>"
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
      "summary": "Self-Refine 的核心目标是：通过自我反馈迭代改进输出质量。",
      "keyPoints": [
        "核心动机：通过自我反馈迭代改进输出质量",
        "代表机构：CMU/Allen AI"
      ],
      "detail": "<p>通过自我反馈迭代改进输出质量</p>"
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
      "summary": "Reflexion 的核心目标是：语言反馈实现无梯度闭环学习。",
      "keyPoints": [
        "核心动机：语言反馈实现无梯度闭环学习",
        "演化来源：继承或改进自 self_refine",
        "代表机构：MIT/Northeastern"
      ],
      "detail": "<p>语言反馈实现无梯度闭环学习</p>"
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
      "summary": "APE 的核心目标是：利用LLM自动生成筛选最优指令。",
      "keyPoints": [
        "核心动机：利用LLM自动生成筛选最优指令",
        "代表机构：多伦多大学"
      ],
      "detail": "<p>利用LLM自动生成筛选最优指令</p>"
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
      "summary": "PromptBreeder 的核心目标是：进化算法实现提示词自我演化。",
      "keyPoints": [
        "核心动机：进化算法实现提示词自我演化",
        "演化来源：继承或改进自 ape",
        "代表机构：DeepMind"
      ],
      "detail": "<p>进化算法实现提示词自我演化</p>"
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
      "summary": "OPRO 的核心目标是：LLM作为优化器迭代提升提示词。",
      "keyPoints": [
        "核心动机：LLM作为优化器迭代提升提示词",
        "演化来源：继承或改进自 ape",
        "代表机构：Google DeepMind"
      ],
      "detail": "<p>LLM作为优化器迭代提升提示词</p>"
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
      "summary": "Causal-CoT 的核心目标是：因果分析消除幻觉提升逻辑严密性。",
      "keyPoints": [
        "核心动机：因果分析消除幻觉提升逻辑严密性",
        "演化来源：继承或改进自 cot",
        "代表机构：NeurIPS"
      ],
      "detail": "<p>因果分析消除幻觉提升逻辑严密性</p>"
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
      "summary": "Long-CoT 的核心目标是：长推理链在复杂任务中指数级增益。",
      "keyPoints": [
        "核心动机：长推理链在复杂任务中指数级增益",
        "演化来源：继承或改进自 cot",
        "代表机构：NeurIPS"
      ],
      "detail": "<p>长推理链在复杂任务中指数级增益</p>"
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
      "summary": "GRACE 的核心目标是：门控机制精炼指令压缩冗余信息。",
      "keyPoints": [
        "核心动机：门控机制精炼指令压缩冗余信息",
        "演化来源：继承或改进自 opro",
        "代表机构：NeurIPS"
      ],
      "detail": "<p>门控机制精炼指令压缩冗余信息</p>"
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
      "summary": "UniAPO 的核心目标是：首个多模态自动提示优化方法。",
      "keyPoints": [
        "核心动机：首个多模态自动提示优化方法",
        "演化来源：继承或改进自 opro",
        "代表机构：AAAI"
      ],
      "detail": "<p>首个多模态自动提示优化方法</p>"
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
      "summary": "PromptMix 的核心目标是：语义提示与多模态混合增强泛化能力。",
      "keyPoints": [
        "核心动机：语义提示与多模态混合增强泛化能力",
        "代表机构：Information Fusion"
      ],
      "detail": "<p>语义提示与多模态混合增强泛化能力</p>"
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
      "summary": "VCP 的核心目标是：视觉引导条件提示实现图文深度对齐。",
      "keyPoints": [
        "核心动机：视觉引导条件提示实现图文深度对齐",
        "演化来源：继承或改进自 promptmix",
        "代表机构：Expert Systems"
      ],
      "detail": "<p>视觉引导条件提示实现图文深度对齐</p>"
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
