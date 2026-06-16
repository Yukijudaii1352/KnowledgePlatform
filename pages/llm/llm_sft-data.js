/**
 * llm_sft-data.js — 由 pipeline/build.py 于 2026-06-16 17:00:17 自动生成。
 * 源文件：content/llm/llm_sft.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "llm",
    "topic_id": "llm_sft",
    "topic_name": "LLM监督微调 算法总结",
    "page_title": "LLM监督微调 算法总结",
    "page_subtitle": "2026-06-16 版",
    "page_desc": "概述从指令微调到参数高效微调(LoRA/QLoRA)的技术演进，涵盖经典方法与2026年最新进展",
    "page_icon": "🎯",
    "hero_pills": [
      "指令微调 · 参数高效微调 · LoRA系列 · 2026前沿"
    ],
    "count_pill": "{count} 个算法",
    "image_base": "",
    "overview_from_doc": true,
    "latest_overview_from_doc": true
  },
  "overview": [
    {
      "title": "",
      "body_html": "<h1>训练方法(2) | 监督微调 SFT / LoRA (with code)</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2034286003767218701\">https://zhuanlan.zhihu.com/p/2034286003767218701</a></li>\n<li>作者: 一起来学重点论</li>\n</ul>\n<hr />\n<p>训练方法(2) | 监督微调 SFT / LoRA (with code)</p>\n<h1>训练方法(2) | 监督微调 SFT / LoRA (with code)</h1>\n<p>作者: 一起来学重点论, 赞: 7</p>\n<blockquote>\n<p><strong>TL; DR</strong>：预训练 vs SFT → Full SFT处理流程 → PEFT 三大流派 → LoRA → Colab T4 实战</p>\n</blockquote>\n<p>本文是<strong>MLSys 菜狗自学笔记</strong>的一篇，也可在<a href=\"https://link.zhihu.com/?target=https%3A//zoey-cheng.github.io/MLSys-Learning-Notes/\">[个人网站]</a>上<a href=\"https://link.zhihu.com/?target=https%3A//zoey-cheng.github.io/MLSys-Learning-Notes/03_%25E8%25AE%25AD%25E7%25BB%2583%25E6%2596%25B9%25E6%25B3%2595/03_02_SFT.html\">[在线阅读]</a>。其他系列也在缓慢更新中 ~</p>\n<ul>\n<li><strong>[Quick Ref for 手写code]</strong>：mini-lora-sft ｜ <a href=\"https://link.zhihu.com/?target=https%3A//github.com/Zoey-Cheng/MLSys-Learning-Notes/blob/main/code/05_mini_lora_sft.ipynb\">ipynb</a> ｜ <a href=\"https://link.zhihu.com/?target=https%3A//drive.google.com/file/d/1NrDWiGrWPoRrk2yszFXIkDe-DeyKW7B0/view%3Fusp%3Ddrive_link\">Colab</a></li>\n<li><strong>[面试点]</strong>：Tokenize, Reshape, Lora? <br />\n  手写还没遇到过，而且可能我简历没什么SFT🤔总之感觉不是高频面试点</li>\n</ul>\n<h2><strong>前言</strong></h2>\n<p>pretrain出来的 base model 是\"有知识但不会聊天\"的状态——给它一句 <code>\"你好\"</code>，它会按训练分布往下续写 <code>\"你好，今天天气不错。我们来聊聊...\"</code>，并不理解\"用户在和我对话、我应该回答\"。要把它变成 ChatGPT / Qwen-Instruct 那种能听指令的助手，下一步靠 <strong>SFT (Supervised Fine-Tuning)</strong>。</p>\n<p>这篇笔记的范围：</p>\n<ul>\n<li>不展开模型结构和模型训练的通用流程，想回顾可以看<br />\n<a href=\"https://zhuanlan.zhihu.com/p/28364382951\">模型基础(1) | Transformer 架构详解:以 LLaMA 为例 (with code手写)</a><br />\n<a href=\"https://zhuanlan.zhihu.com/p/2033923074630870192\">训练方法(1) | 预训练pretrain流程 (with code)</a></li>\n<li>不展开并行 / 显存切分等训练策略</li>\n</ul>\n<p>只关心 SFT 自己特有的事，按数据流向走：</p>\n<ul>\n<li>Full SFT 特殊的数据准备、tokenize 扩展、模型结构修改</li>\n<li>PEFT 微调和 LoRA</li>\n</ul>\n<h2><strong>1. SFT 在训练里的位置</strong></h2>\n<p>LLM 训练经典三阶段：</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-0502df929d80285f39c6fb78e9c13377_1440w.jpg\" /></p>\n<p>SFT 是中间层，承上启下：</p>\n<ul>\n<li>在 base 之上把\"会语言\"训成\"会答题\"</li>\n<li>在 RLHF 之下提供一个能听话的初始模型——直接对未对齐 base 做 RLHF 很难收敛</li>\n</ul>\n<h3><strong>1.1 SFT 想要的</strong></h3>\n<p>SFT 不教模型新的世界知识（那是 Pretrain 的事），只教<strong>怎么把已有的知识按用户期望的方式表达出来</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>能力</th>\n<th>例子</th>\n<th>数据怎么体现</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>指令遵从</td>\n<td>用户说\"翻译\"就翻译，不会跑偏去续写</td>\n<td>大量 (instruction, output) 对</td>\n</tr>\n<tr>\n<td>格式输出</td>\n<td>让你列点就列点、要 JSON 给 JSON、要代码用 markdown</td>\n<td>response 中显式包含目标格式</td>\n</tr>\n<tr>\n<td>多轮一致性</td>\n<td>后一轮能正确引用前一轮内容，\"它\"指代什么不混</td>\n<td>ShareGPT / WildChat 等多轮对话数据</td>\n</tr>\n<tr>\n<td>拒绝有害请求</td>\n<td>用户问怎么造毒品，模型礼貌拒绝</td>\n<td>对齐数据集（HH-RLHF、Constitutional 等）</td>\n</tr>\n<tr>\n<td>思维链 CoT</td>\n<td>复杂问题先一步步推理，再给最终答案</td>\n<td>reasoning 数据集（含 Let's think...）</td>\n</tr>\n<tr>\n<td>风格 / 语气</td>\n<td>客服模型的礼貌、专家的严谨、角色扮演的人设</td>\n<td>风格化 response</td>\n</tr>\n</tbody>\n</table></div>\n<h3><strong>1.2 SFT vs Pretrain 差异</strong></h3>\n<p>模型结构、loss 函数都一样（自回归 + 交叉熵，参考 <a href=\"https://zhuanlan.zhihu.com/p/2033923074630870192\">训练方法(1) | 预训练pretrain流程 (with code)</a>，区别在<strong>数据怎么组织 / loss 算哪一段 / 学习率多大</strong>这三点。</p>\n<p><strong>[数据格式对比]</strong></p>\n<pre><code>Pretrain:\n  input_ids: [t_0, t_1, t_2, ..., t_n]\n  labels:    [t_0, t_1, t_2, ..., t_n]                          ← 整段都算 loss\n\nSFT:\n  input_ids: [&lt;bos&gt;, p_1, ..., p_k, r_1, ..., r_m, &lt;eos&gt;]\n                     └─ prompt ─┘  └─ response ─┘\n  labels:    [-100,  -100, ..., -100, r_1, ..., r_m, &lt;eos&gt;]    ← 仅 response 算 loss\n</code></pre>\n<p><code>-100</code> 是 PyTorch <code>CrossEntropyLoss</code> 的默认 <code>ignore_index</code>，标签为 -100 的位置直接跳过不算。</p>\n<p><strong>[为什么 prompt 不算 loss]</strong></p>\n<p>直觉：模型\"读问题\"时不需要被惩罚——prompt 是用户给的，不是模型生成的，强迫模型预测 prompt 文本是浪费容量、还会损害模型自由组织答案的能力。SFT 的核心 trick 就是<strong>只让模型为自己产出的部分（response）负责</strong>。</p>\n<p><strong>[为什么学习率差一个量级]</strong></p>\n<p>Pretrain 是从随机权重出发，要大 lr 把权重快速推到合理位置。SFT 是在已经训好的权重上小幅调整，lr 太大会<strong>灾难性遗忘</strong>：模型把预训练学到的世界知识丢了，只剩 SFT 数据里那点东西。所以 SFT 用 1e-5 ~ 5e-5（仍然是 warmup + cosine decay）。</p>\n<h2><strong>2. Full SFT 处理流程</strong></h2>\n<p>大厂用开源训自家业务模型的 SFT 阶段基本都是 <strong>全量微调 (Full SFT)</strong>，也就是更新模型的全部权重。因为算力管够、效果上限最高，资源紧时才退到 PEFT。</p>\n<p>这一节参考了最近工作中看到的一些SFT任务，按 Full SFT 自己的处理流程走：</p>\n<pre><code>原始数据 ──→ (ChatML) 模板 ──→ tokenize 扩展 ──→ 模型结构适配 ──→ 训练 (mask + 冻结)\n              §2.1             §2.2              §2.3              §2.4\n</code></pre>\n<h3><strong>2.1 数据处理: ChatML 模板</strong></h3>\n<p><strong>[原始数据形态]</strong></p>\n<p>最简单的单轮形式：</p>\n<pre><code>{&quot;question&quot;: &quot;什么是大语言模型？&quot;, &quot;answer&quot;: &quot;大语言模型 (LLM) 是基于 Transformer 架构的...&quot;}\n</code></pre>\n<p>多轮对话形式（ShareGPT 风格，OpenAI 通用格式）：</p>\n<pre><code>{\n  &quot;conversations&quot;: [\n    {&quot;from&quot;: &quot;human&quot;, &quot;value&quot;: &quot;你好&quot;},\n    {&quot;from&quot;: &quot;gpt&quot;,   &quot;value&quot;: &quot;你好！我可以帮你做什么？&quot;},\n    {&quot;from&quot;: &quot;human&quot;, &quot;value&quot;: &quot;推荐一本书&quot;},\n    {&quot;from&quot;: &quot;gpt&quot;,   &quot;value&quot;: &quot;推荐《深度学习》...&quot;}\n  ]\n}\n</code></pre>\n<p>业界常用 SFT 数据集（SFT 阶段质量比数量重要得多）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>数据集</th>\n<th>规模</th>\n<th>备注</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Alpaca / Alpaca-GPT4</td>\n<td>52K</td>\n<td>self-instruct 鼻祖</td>\n</tr>\n<tr>\n<td>ShareGPT</td>\n<td>~90K</td>\n<td>用户和 ChatGPT 真实对话</td>\n</tr>\n<tr>\n<td>OpenHermes</td>\n<td>~1M</td>\n<td>高质量混合</td>\n</tr>\n<tr>\n<td>BAAI Infinity-Instruct</td>\n<td>~9M</td>\n<td>中英文 + 多任务</td>\n</tr>\n<tr>\n<td>LIMA</td>\n<td>1K</td>\n<td>实验质量胜过数量的极端例子</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>[ChatML 模板：把对话拼成单条文本]</strong></p>\n<p>要让模型理解\"谁在说话\"，需要在原始对话外面加一层模板。现在主流的是 <strong>ChatML</strong>（OpenAI 提出，Qwen / 多数开源模型采用）：</p>\n<pre><code>&lt;|im_start|&gt;system\nYou are a helpful assistant.&lt;|im_end|&gt;\n&lt;|im_start|&gt;user\n什么是大语言模型？&lt;|im_end|&gt;\n&lt;|im_start|&gt;assistant\n大语言模型 (LLM) 是基于 Transformer 架构的...&lt;|im_end|&gt;\n</code></pre>\n<p><code>&lt;|im_start|&gt;</code> / <code>&lt;|im_end|&gt;</code> 是预先<strong>加进 tokenizer</strong> 的特殊 token，每个固定占 1 个 token id，用来明确<strong>角色边界</strong>——让 attention / loss 能正确 mask、让模型理解 user / assistant / system 的分界。</p>\n<p><strong>[业务模型的自定义模板]</strong></p>\n<p>ChatML 是通用对话的标准模板，业务上常要在它基础上扩展或替换——§2.2 讲的\"自定义 token\"是 token 粒度的扩展，这里是<strong>整段模板结构</strong>的扩展。常见需求：</p>\n<ul>\n<li><strong>System 固定指令</strong>：在 system 段塞固定 prefix，锚定身份和风格</li>\n<li><strong>角色扩展</strong>：Agent 引入 <code>&lt;|tool|&gt;</code> / <code>&lt;|critic|&gt;</code> / <code>&lt;|planner|&gt;</code> 等新角色，loss 可按角色选择性 mask</li>\n<li><strong>领域 wrapper</strong>：代码用 <code>&lt;|code_start|&gt;</code>、多模态用 <code>&lt;|vision_start|&gt;</code>、CoT 用 <code>&lt;|think|&gt;</code> 标推理段</li>\n</ul>\n<p>原则：<strong>尽量靠 ChatML 改、不要完全自创</strong>——base 已经见过 ChatML、下游推理框架（vLLM、HF <code>apply_chat_template</code>）开箱即用；自创格式会让 SFT 收敛慢、推理侧也得手写适配。</p>\n<p>工程上一般训练框架（如 veomni等）都会开放tokenize模板自定义入口，按规定的接口改就行。</p>\n<h3><strong>2.2 Tokenizer 扩展</strong></h3>\n<p>预训练 tokenizer 面向纯文本，词表里没有 <code>&lt;|im_start|&gt;</code> / <code>&lt;|im_end|&gt;</code>、没有\"角色\"概念。SFT 阶段往 tokenizer 里加新的特殊 token，分两类。</p>\n<p><strong>[ChatML 标准类]</strong></p>\n<p>通用对话所必需的：</p>\n<ul>\n<li>角色边界：<code>&lt;|im_start|&gt;</code> / <code>&lt;|im_end|&gt;</code> / <code>&lt;|user|&gt;</code> / <code>&lt;|assistant|&gt;</code> / <code>&lt;|system|&gt;</code></li>\n<li>工具调用：<code>&lt;tool_call&gt;</code> / <code>&lt;/tool_call&gt;</code> / <code>&lt;tool_response&gt;</code> 等</li>\n</ul>\n<p><strong>[业务自定义类（extend）]</strong></p>\n<p>按下游场景额外加的 token，常见的几种：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>场景</th>\n<th>自定义 token 例子</th>\n<th>用途</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>客服 / 业务</td>\n<td>&lt;</td>\n<td>product_id</td>\n</tr>\n<tr>\n<td>多模态边界</td>\n<td>&lt;</td>\n<td>image_pad</td>\n</tr>\n<tr>\n<td>Agent / 工具</td>\n<td>&lt;</td>\n<td>tool_start</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>[为什么必须是单个 token]</strong></p>\n<p>如果让 tokenizer 把 <code>&lt;|im_start|&gt;</code> 拆成多个subword，模型每次要\"组装\"一个边界标记，attention mask 也无法精确对齐到边界。所以这些都要作为 <strong>single special token</strong> 加进去。</p>\n<p><strong>[工程实现]</strong></p>\n<pre><code>tokenizer.add_special_tokens({\n    &quot;additional_special_tokens&quot;: [\n        &quot;&lt;|im_start|&gt;&quot;, &quot;&lt;|im_end|&gt;&quot;,          # ChatML 标准\n        &quot;&lt;|product_id|&gt;&quot;, &quot;&lt;|order_id|&gt;&quot;,      # 业务自定义\n    ]\n})\n# 词表大小从 V 涨到 V + k\n</code></pre>\n<p>加完之后还要让模型端跟上——这是下一步要处理的事。</p>\n<h3><strong>2.3 模型结构适配</strong></h3>\n<p>tokenizer 加了新 token 后，模型端要相应处理。最直接受影响的是 <strong>embedding 矩阵</strong>和 <strong>lm_head</strong>——它们都是按\"词表大小 × hidden_layer\" 形状存的。</p>\n<p><strong>[基础场景：开源 base + ChatML resize]</strong></p>\n<pre><code>model.resize_token_embeddings(len(tokenizer))\n# embedding / lm_head 形状 [V, d] → [V+k, d]\n# 新行用现有 embedding 的均值初始化（peft / hf 默认）\n# SFT loss 把这些新 token 学到合理的语义位置\n</code></pre>\n<blockquote>\n<p>现代发布的 base model（Qwen2.5-Base、Llama-3-Base 等）通常已经在预训练阶段就<strong>预留好</strong> ChatML 特殊 token 的位置，SFT 时不用 resize——这是最省事的做法。只有用更老的 base（GPT-2 类）或者业务想加自定义 token 时，才需要扩词表 + resize。</p>\n</blockquote>\n<p><strong>[进阶场景：业务自定义结构]</strong></p>\n<p>业务方未必直接拿最基础的开源 base 做 SFT，有时候也会修改结构，比如先在开源模型上做<strong>结构化剪枝 + 恢复训练</strong>，或者通过其他改造得到一个定制基座，再用这个去 SFT。</p>\n<p>预训练框架（Megatron / NeMo / veomni 等）一般都用 <strong>config 文件</strong>描述实际结构（layer 数、hidden dim、head 数等），不一定是标准开源值。SFT 流程从 config 读模型实际形状即可：</p>\n<ul>\n<li><code>resize_token_embeddings</code> 走的是 model 实际形状（hf 默认行为），自动对齐到改造后的维度；不要硬编码标准 transformer 的 d</li>\n<li>新 token 行的初始化均值是基于<strong>当前</strong>的 V 行（已经反映改造后的语义），不要从原始开源模型里拷贝高维向量再截断（语义会错）</li>\n</ul>\n<h3><strong>2.4 full SFT训练</strong></h3>\n<p>数据 / token / 模型都准备好之后，SFT 训练的 forward / loss / optimizer 流程和 Pretrain 几乎一样——区别只在两件事：<strong>labels mask 怎么算</strong>、要不要<strong>冻结部分参数</strong>省显存。</p>\n<p><strong>[labels mask（核心）]</strong></p>\n<p>把 ChatML 文本走一遍 tokenizer 得到 input_ids，再构造 labels。<strong>关键：response 起点之前的全部置 -100</strong>：</p>\n<pre><code>拼完的文本:\n&lt;|im_start|&gt;user\\n什么是 LLM？&lt;|im_end|&gt;\\n&lt;|im_start|&gt;assistant\\nLLM 是...&lt;|im_end|&gt;\n\n       │ tokenize\n       ▼\n\ninput_ids:   [im_start, user, \\n, &quot;什&quot;, &quot;么&quot;, &quot;是&quot;, &quot; LLM&quot;, &quot;?&quot;, im_end, \\n,\n              im_start, assistant, \\n, &quot;LLM&quot;, &quot; 是&quot;, &quot;...&quot;, im_end]\n\n       │ 构造 labels\n       ▼\n\nlabels:      [-100,    -100, -100, -100, -100, -100, -100, -100, -100, -100,\n              -100,    -100,    -100,\n              ↑─────── 整个 prompt + ChatML 控制 token 都不算 ───────↑\n\n              &quot;LLM&quot;,  &quot; 是&quot;,  &quot;...&quot;,   im_end]\n              ↑──────── 只有 assistant 的回答参与 loss ────────↑\n</code></pre>\n<p>实现：trl 提供 <code>DataCollatorForCompletionOnlyLM</code>，给它 <code>response_template = \"&lt;|im_start|&gt;assistant\\n\"</code>，它会自动定位 response 起点、把前面所有 labels 设为 -100。</p>\n<blockquote>\n<p><strong>collator</strong> 就是 dataloader 里把多条样本组装成一个 batch 的小工具——负责 padding、生成 attention_mask、构造 labels 等。SFT collator 多了一步：按模板找 response 起点、把前面 mask 成 -100。</p>\n</blockquote>\n<p><strong>[多轮对话：每轮 assistant 都参与 loss]</strong></p>\n<pre><code>input_ids:  &lt;im_start&gt;user &quot;你好&quot; &lt;im_end&gt; &lt;im_start&gt;assistant &quot;你好！&quot; &lt;im_end&gt;\n            &lt;im_start&gt;user &quot;推荐一本书&quot; &lt;im_end&gt; &lt;im_start&gt;assistant &quot;推荐《...》&quot; &lt;im_end&gt;\n\nlabels:     -100 ...prompt 1...           &quot;你好！&quot; &lt;im_end&gt;\n            -100 ...prompt 2...           &quot;推荐《...》&quot; &lt;im_end&gt;\n            ↑ user / 控制 token 都 mask   ↑ 每段 assistant 都参与 loss\n</code></pre>\n<p>trl 的 collator 支持双模板（<code>instruction_template</code> + <code>response_template</code>），自动按 user/assistant 对扫描整条序列做 mask。</p>\n<p><strong>[自定义模板 → 自定义 mask]</strong></p>\n<p>如果 §2.1 / §2.2 里加了业务自己的角色或 token，labels mask 也要跟着扩展。比如 Agent 模型加了 <code>&lt;|tool|&gt;</code> 和 <code>&lt;|critic|&gt;</code> 角色后，常见 mask 规则：</p>\n<ul>\n<li><code>&lt;|tool|&gt;</code> 段是工具的真实输出、不是模型生成的，要全部 mask 成 -100（同 user）</li>\n<li><code>&lt;|critic|&gt;</code> 段如果是另一个模型给的反馈，也 mask</li>\n<li>只让 assistant 段（外加 <code>&lt;|action|&gt;</code> / <code>&lt;|think|&gt;</code> 这些模型自己产出的）参与 loss</li>\n</ul>\n<p>trl 的双模板 collator 不够用时，业务通常自己写衍生的 collator——按角色 token 分段扫描，按角色配置查 mask 规则。</p>\n<p><strong>[冻结部分参数：Full SFT 的简化变体]</strong></p>\n<p>Full SFT 还有一种常见的简化变体——<strong>只训部分层 / 部分参数</strong>，剩余冻结。比起更新全部参数省显存，但本质上仍然在原参数空间里改：</p>\n<ul>\n<li><strong>冻结浅层 / 只训高层</strong>：浅层学的是通用语言特征（语法、tokenization 行为），高层学任务相关行为。SFT 主要想改高层，浅层冻住能省一半显存</li>\n<li><strong>只训特定模块</strong>：比如只训 lm_head（极端，只能学输出风格）、只训 FFN（FFN 是参数大头，但不动 attn 会限制能力）</li>\n</ul>\n<p>实现极简——遍历 <code>model.named_parameters()</code>，对要冻的模块设 <code>requires_grad = False</code> 就行，不需要任何额外 PEFT 库。</p>\n<p>显存收益比 PEFT 弱——梯度和 optimizer state 还是按\"未冻结部分的参数量\"算，且模型 weight 要全量加载。但实现成本极低、不引入新模块，是 Full SFT 显存吃紧时的常用补丁。</p>\n<p><strong>[一个具体例子：Qwen-VL 系 SFT 的多阶段冻结]</strong></p>\n<p>VLM 的训练通常分多阶段，每阶段冻什么不一样——这是工业级\"冻结部分参数\"的典型样板：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>阶段</th>\n<th>冻结</th>\n<th>训练</th>\n<th>目的</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Stage 1 (alignment)</td>\n<td>LLM + ViT</td>\n<td>projector</td>\n<td>学视觉到语言空间的对齐</td>\n</tr>\n<tr>\n<td>Stage 2 (vision SFT)</td>\n<td>LLM</td>\n<td>ViT + projector</td>\n<td>适配领域图像</td>\n</tr>\n<tr>\n<td>Stage 3 (full SFT)</td>\n<td>不冻</td>\n<td>全部</td>\n<td>端到端联合微调</td>\n</tr>\n</tbody>\n</table></div>\n<h2><strong>3. 从全量到 PEFT</strong></h2>\n<h3><strong>3.1 全量 SFT 的资源压力</strong></h3>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>项目</th>\n<th>含义</th>\n<th>7B 模型 占显存（混合精度）</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Model weight</td>\n<td>参数本身</td>\n<td>14 GB（bf16）</td>\n</tr>\n<tr>\n<td>Gradient</td>\n<td>每个参数的梯度</td>\n<td>14 GB（bf16）</td>\n</tr>\n<tr>\n<td>Optimizer state</td>\n<td>AdamW 的 m, v (fp32)</td>\n<td>56 GB（每参数 8 byte）</td>\n</tr>\n<tr>\n<td>Activation</td>\n<td>forward 中间值</td>\n<td>几 GB ~ 十几 GB</td>\n</tr>\n<tr>\n<td>合计</td>\n<td></td>\n<td>~100 GB（单卡 A100 80G 装不下）</td>\n</tr>\n</tbody>\n</table></div>\n<p>SFT 数据量小、计算时间不算瓶颈，<strong>显存才是</strong>——这就是 PEFT 的根本动机：不是为了快，是为了在小卡上跑得动。</p>\n<h3><strong>3.2 PEFT 的核心思想</strong></h3>\n<p><strong>[什么是\"低秩\"]</strong></p>\n<p>矩阵的\"秩 (rank)\"是它包含的独立信息维度。一个 <img alt=\"d \\times d\" src=\"https://www.zhihu.com/equation?tex=d+%5Ctimes+d\" /> 的矩阵理论上有 d^2 个自由参数，但如果它的秩只有 <img alt=\"r（r \\ll d）\" src=\"https://www.zhihu.com/equation?tex=r%EF%BC%88r+%5Cll+d%EF%BC%89\" /> ，那它实际上可以分解成两个细矩阵的乘积：</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-77538f6f13528a354c34ff0d99c45490_1440w.jpg\" /></p>\n<p><img alt=\"\\Delta W\" src=\"https://www.zhihu.com/equation?tex=%5CDelta+W\" /> 是低秩的\"就是说：微调带来的权重改动虽然形状是 <img alt=\"d \\times d\" src=\"https://www.zhihu.com/equation?tex=d+%5Ctimes+d\" /> ，但实际只有 r 维有效自由度，可以用两个细矩阵表示。</p>\n<p><strong>[LoRA 的关键观察]</strong></p>\n<blockquote>\n<p><strong>微调时</strong> <img alt=\"\\Delta W = W_{\\text{finetuned}} - W_{\\text{pretrained}} \" src=\"https://www.zhihu.com/equation?tex=%5CDelta+W+%3D+W_%7B%5Ctext%7Bfinetuned%7D%7D+-+W_%7B%5Ctext%7Bpretrained%7D%7D+\" /> <strong>的奇异值衰减很快</strong>——也就是说 <img alt=\"\\Delta W\" src=\"https://www.zhihu.com/equation?tex=%5CDelta+W\" /> 是低秩的。</p>\n</blockquote>\n<p>直觉：Pretrain 已经把\"会语言、有世界知识\"这件大事做完了；SFT 只是叠加一个\"按格式回答\"的行为约束，这个约束在数学上表现为低秩 <img alt=\"\\Delta W\" src=\"https://www.zhihu.com/equation?tex=%5CDelta+W\" /> 。</p>\n<p>如果 <img alt=\" \\Delta W\" src=\"https://www.zhihu.com/equation?tex=+%5CDelta+W\" /> 真的低秩，那直接训整个 <img alt=\"W\" src=\"https://www.zhihu.com/equation?tex=W\" /> 就是浪费。<strong>Parameter-Efficient Fine-Tuning (PEFT)</strong> 的统一思想就是：冻结绝大多数预训练参数，只训<strong>少量新增</strong>或<strong>少量选定</strong>的参数，达到与全量相当的效果。</p>\n<h3><strong>3.3 PEFT 三大流派</strong></h3>\n<p>按\"在哪里加少量参数\"，PEFT 分三个流派——<strong>Prompt / Adapter / LoRA</strong>。</p>\n<p>各家都是 冻结主模型 + 只训少量参数，差别在新参数加在哪、是什么形式、推理时有无开销：</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-4b3a2461f820b533f143128dbae46b20_1440w.jpg\" /><img alt=\"\" src=\"https://pic3.zhimg.com/v2-ceba902205713325bd5bcdedaa5665c0_1440w.jpg\" /></p>\n<p>下面 3.4 / 3.5 简单过一下 Prompt 和 Adapter，<strong>LoRA 单独放 §4 展开</strong>。</p>\n<h3><strong>3.4 Prompt 类：输入侧软提示</strong></h3>\n<p>把原 Transformer 完全冻结，只在输入侧（或每层 attention 的 K/V）注入一段可训练的 virtual token——不对应任何真实词汇，是直接学出来的连续向量（\"soft\" prompt）。代表方法：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>加在哪</th>\n<th>备注</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Soft Prompt</td>\n<td>输入层</td>\n<td>拼一段可训练 embedding 到序列前</td>\n</tr>\n<tr>\n<td>Prefix Tuning</td>\n<td>每层 attn 的 K/V</td>\n<td>表达力比 Soft 强</td>\n</tr>\n<tr>\n<td>P-Tuning V1 / V2</td>\n<td>V1 输入层 / V2 每层</td>\n<td>早期工作</td>\n</tr>\n</tbody>\n</table></div>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-3d5e5c722eda3654e55f1f39b3465995_1440w.jpg\" /></p>\n<p>新增参数 0.01% ~ 3%、实现极简。但<strong>小模型效果差</strong>，且推理时序列变长更慢——工业上基本被 LoRA 取代，主要在 100B+ 大模型 + 极致省显存场景偶尔出现。</p>\n<h3><strong>3.5 Adapter 类：block 内插小模块</strong></h3>\n<blockquote>\n<p>《Parameter-Efficient Transfer Learning for NLP》Houlsby et al. 2019 <a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/1902.00751\">https://arxiv.org/abs/1902.00751</a></p>\n</blockquote>\n<p>每个 Transformer block 内插入两个 Adapter——attention 之后一个、FFN 之后一个，主模型冻结，只训 Adapter。新增参数 0.5% ~ 8%。Adapter 内部是<strong>带残差的瓶颈 MLP</strong>：</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-f0ac7b4fc3c1d3dcbdde5366e54dd73e_1440w.jpg\" /></p>\n<p><strong>致命缺点</strong>：每个 block 多两次小矩阵乘 + 中间非线性 → <strong>无法吸收进原权重</strong>，推理永久多开销。这是它后来被 LoRA 取代的根本原因。</p>\n<h2><strong>4. LoRA：资源紧时的首选</strong></h2>\n<blockquote>\n<p>《LoRA: Low-Rank Adaptation of Large Language Models》Microsoft 2021 <a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2106.09685\">https://arxiv.org/abs/2106.09685</a></p>\n</blockquote>\n<p><strong>LoRA 不是工业级 SFT 的首选</strong>——大厂训自家 instruct 模型用的还是 Full SFT。LoRA 真正的舞台是<strong>资源受限的 SFT 场景</strong>。</p>\n<p>我问楼上做预训练同学说，还以为lora用的挺多的。答：大多是穷学生用的ovo</p>\n<p>但因为这类用户基数大、生态成熟，LoRA 也算是 PEFT 里被讨论最多的，在面试里也是小重点。</p>\n<h3><strong>4.1 模块结构</strong></h3>\n<p>LoRA 模块本身就是 <strong>两个连续的 Linear 层（中间没有非线性激活）</strong>：</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-d3308db6db00b4e2a4bb0bcf9cea1cb6_1440w.jpg\" /></p>\n<p>参数：</p>\n<ul>\n<li><img alt=\"A \\in \\mathbb{R}^{r \\times d_{\\text{in}}}\" src=\"https://www.zhihu.com/equation?tex=A+%5Cin+%5Cmathbb%7BR%7D%5E%7Br+%5Ctimes+d_%7B%5Ctext%7Bin%7D%7D%7D\" /> ：初始化用高斯分布</li>\n<li><img alt=\"B \\in \\mathbb{R}^{d_{\\text{out}} \\times r}\" src=\"https://www.zhihu.com/equation?tex=B+%5Cin+%5Cmathbb%7BR%7D%5E%7Bd_%7B%5Ctext%7Bout%7D%7D+%5Ctimes+r%7D\" /> ：初始化为全 0</li>\n<li>串起来 <img alt=\"BA \\in \\mathbb{R}^{d_{\\text{out}} \\times d_{\\text{in}}}\" src=\"https://www.zhihu.com/equation?tex=BA+%5Cin+%5Cmathbb%7BR%7D%5E%7Bd_%7B%5Ctext%7Bout%7D%7D+%5Ctimes+d_%7B%5Ctext%7Bin%7D%7D%7D\" /> ，等价于一个新的 Linear 层</li>\n</ul>\n<p><strong>LoRA 故意不加中间非线性</strong>—— <img alt=\"BA\" src=\"https://www.zhihu.com/equation?tex=BA\" /> 在数学上就是一个矩阵，可以<strong>合并回原</strong> <img alt=\"W\" src=\"https://www.zhihu.com/equation?tex=W\" /> （这是 LoRA 干掉 Adapter / Prefix 的关键）。</p>\n<p>LoRA 不替换原 Linear、也不串联，而是<strong>并联</strong>——一条 W₀ 主路 + 一条 BA 修正路，两路相加。<strong>单层计算公式</strong>：</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-f8082d42405482d922c55b980d6d5431_1440w.jpg\" /></p>\n<p>其中 <img alt=\"\\Delta W = \\frac{\\alpha}{r} BA\" src=\"https://www.zhihu.com/equation?tex=%5CDelta+W+%3D+%5Cfrac%7B%5Calpha%7D%7Br%7D+BA\" /> 就是 LoRA 学到的\"权重残差\"。</p>\n<p>由于 B 初始化为 0，<strong>训练第 0 步</strong> <img alt=\" \\Delta W = 0\" src=\"https://www.zhihu.com/equation?tex=+%5CDelta+W+%3D+0\" /> ，模型行为和原 base 完全一致；之后 B 通过反向传播更新，逐步学到 task-specific 修正。</p>\n<p>部署时把两路合并：</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-c572c19c091c11de2d328e6f7f9b40e9_1440w.jpg\" /></p>\n<p>纯加法、 <img alt=\"W'\" src=\"https://www.zhihu.com/equation?tex=W%27\" /> 形状和 <img alt=\"W_0\" src=\"https://www.zhihu.com/equation?tex=W_0\" /> 完全一样，推理流程和原模型也一样：</p>\n<pre><code>model = model.merge_and_unload()  # W' = W₀ + (α/r)·BA, 丢弃 (A, B)\n</code></pre>\n<p>合完后可以直接用 vLLM / TGI / llama.cpp 部署，<strong>零额外推理开销</strong>。</p>\n<blockquote>\n<p><strong>多 LoRA 同时挂载</strong>：合并的线性叠加性允许同时挂载多个 LoRA： <img alt=\"W' = W_0 + \\sum_i \\frac{\\alpha_i}{r_i} B_i A_i\" src=\"https://www.zhihu.com/equation?tex=W%27+%3D+W_0+%2B+%5Csum_i+%5Cfrac%7B%5Calpha_i%7D%7Br_i%7D+B_i+A_i\" /> 。一份基座 + N 个 LoRA 同时服务，是当前多任务 LLM serving 的主流方案。</p>\n</blockquote>\n<h3><strong>4.2 设计细节</strong></h3>\n<p><strong>[初始化：A 高斯、B 零]</strong></p>\n<p>A 高斯随机、B 全零的组合是为了<strong>让第 0 步</strong> <img alt=\"\\Delta W = 0\" src=\"https://www.zhihu.com/equation?tex=%5CDelta+W+%3D+0\" /> ，模型从预训练权重平滑出发。其他组合都不行：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>初始化</th>\n<th>问题</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>双零</td>\n<td>对称失效，梯度无法打破对称</td>\n</tr>\n<tr>\n<td>双高斯</td>\n<td>第 0 步 ΔW 是非零随机扰动，等于一开始就破坏预训练权重</td>\n</tr>\n<tr>\n<td>A=0, B=高斯</td>\n<td>数学等价但实验效果差（前向梯度流不对称影响优化轨迹）</td>\n</tr>\n</tbody>\n</table></div>\n<blockquote>\n<p>详见 <em>The Impact of Initialization on LoRA Finetuning Dynamics</em> <a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2406.08447\">The Impact of Initialization on LoRA Finetuning Dynamics</a></p>\n</blockquote>\n<p><strong>[r 和 α：表达力 vs 力度]</strong></p>\n<ul>\n<li><strong>r（rank）</strong>：A 和 B 中间的瓶颈维度，决定旁路的表达自由度。r 越大表达能力越强，但参数量 / 显存也跟着大</li>\n<li><strong>α（alpha）</strong>：缩放因子，控制旁路在最终输出里的力度。α 越大修正越激进</li>\n</ul>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>任务难度</th>\n<th>r 推荐</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>简单（领域适配 / 格式调整）</td>\n<td>4</td>\n</tr>\n<tr>\n<td>普通（通用 SFT）</td>\n<td>8</td>\n</tr>\n<tr>\n<td>难（多语言 / 长 context / 数学推理）</td>\n<td>16~32</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>为什么两个超参共存</strong>：保持 <img alt=\"\\alpha/r\" src=\"https://www.zhihu.com/equation?tex=%5Calpha%2Fr\" /> 不变（α 跟着 r 翻倍）→ 旁路作用力不变 → r 改变时 lr 不需要重调。<strong>工程惯例</strong> <img alt=\"\\alpha = 2r\" src=\"https://www.zhihu.com/equation?tex=%5Calpha+%3D+2r\" /> （r=8 → α=16）。先固定 α/r=2，调 lr；效果不行再动 α/r 比值。</p>\n<p><strong>[改哪些层：Q / K / V / O 怎么选]</strong></p>\n<p>LoRA 论文 Table 5 在 GPT-3 175B 上做了消融实验（<strong>同样的可训练参数预算</strong>下比较）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>target_modules</th>\n<th>r</th>\n<th>结论</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>单 W_q 或单 W_k</td>\n<td>8</td>\n<td>较差，K 单独尤其差</td>\n</tr>\n<tr>\n<td>W_q + W_v</td>\n<td>4</td>\n<td>接近全配置</td>\n</tr>\n<tr>\n<td>W_q + W_k + W_v + W_o</td>\n<td>2</td>\n<td>最优，但和 q+v 几乎打平</td>\n</tr>\n</tbody>\n</table></div>\n<p>两个关键结论：</p>\n<ol>\n<li><strong>种类比秩重要</strong>：与其调大 r，不如把预算分给更多种类的矩阵（q+v r=4 ≈ qkvo r=2）</li>\n<li><strong>K 单独最差</strong>：单独训 W_k 收益最小，推荐组合至少包含 W_v</li>\n</ol>\n<p>不同场景的工程惯例：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>场景</th>\n<th>target_modules</th>\n<th>说明</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>资源紧（论文）</td>\n<td>[\"q_proj\", \"v_proj\"]</td>\n<td>最经典配置，参数最少</td>\n</tr>\n<tr>\n<td>attention 全开</td>\n<td>[\"q_proj\", \"k_proj\", \"v_proj\", \"o_proj\"]</td>\n<td>attn 4 个 Linear 都加，比 q+v 稳一点</td>\n</tr>\n<tr>\n<td>资源够</td>\n<td>\"all-linear\"</td>\n<td>attn 4 + FFN 3 = 7 个 Linear。FFN 占 block 参数 2/3，加上效果普遍更好</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>别加 LayerNorm / Embedding / lm_head</strong>——LoRA 设计就是给 Linear 用的；Embedding 太大、lm_head 直接出概率分布会改变模型输出行为。</p>\n<p><strong>[基座 + adapter 分离存储]</strong></p>\n<p>LoRA 训完后基座 W_0 和增量 (A, B) <strong>分开保存</strong>——这是多任务部署最大的工程便利。Llama-7B + r=8, q+v 的体量：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>存的什么</th>\n<th>大小</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>全量 SFT 后的模型</td>\n<td>14 GB（bf16）</td>\n</tr>\n<tr>\n<td>LoRA adapter</td>\n<td>~8 MB（4.2M 参数）</td>\n</tr>\n<tr>\n<td>基座 W₀（共享）</td>\n<td>14 GB（一次就好）</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>N 个下游任务只需 1 份基座 + N 份小 adapter</strong>，存储成本下降两个数量级。</p>\n<h3><strong>4.3 显存收益</strong></h3>\n<p>LoRA 的杀手锏不是 forward 算量节省，而是<strong>反向 + 优化器状态的显存大幅下降</strong>——原 W_0 完全冻结，只有 A 和 B 需要梯度和 Adam 状态。这就是单卡 24 GB 也能跑 7B LoRA 的原因。</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>项目</th>\n<th>全量 SFT (7B)</th>\n<th>LoRA q+v (4.2M trainable)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Model weight</td>\n<td>14 GB（bf16）</td>\n<td>14 GB（bf16，全冻结）</td>\n</tr>\n<tr>\n<td>Gradient</td>\n<td>14 GB</td>\n<td>~0.008 GB</td>\n</tr>\n<tr>\n<td>Adam m + v (fp32)</td>\n<td>56 GB</td>\n<td>~0.034 GB</td>\n</tr>\n<tr>\n<td>额外训练开销</td>\n<td>70 GB</td>\n<td>~0.04 GB</td>\n</tr>\n</tbody>\n</table></div>\n<p>forward 算量近似不变——加在 Q/K/V 三个矩阵、r=8, E=4096 时 LoRA 多算的部分相对原 forward &lt; 0.4%，可忽略。</p>\n<h2><strong>5. 实战：mini LoRA SFT</strong></h2>\n<blockquote>\n<p>参考知乎 <a href=\"https://zhuanlan.zhihu.com/p/650197598\">《深入浅出 LoRA》</a> 第四节的 peft 微调流程，针对 Colab T4 GPU 整理成可直接跑的版本。完整 ipynb 见 <a href=\"https://link.zhihu.com/?target=https%3A//github.com/Zoey-Cheng/MLSys-Learning-Notes/blob/main/code/05_mini_lora_sft.ipynb\">05_mini_lora_sft.ipynb</a> ｜ <a href=\"https://link.zhihu.com/?target=https%3A//drive.google.com/file/d/1NrDWiGrWPoRrk2yszFXIkDe-DeyKW7B0/view%3Fusp%3Ddrive_link\">Colab</a>（T4 实测 ~3.5 min 跑通）</p>\n</blockquote>\n<h3><strong>5.1 扩词表 + 适配结构</strong></h3>\n<p><strong>模型</strong>：Qwen2.5-0.5B——T4 16GB 装得下、ChatML 特殊 token 预训练就预留好了。</p>\n<pre><code>import torch\nfrom transformers import AutoTokenizer, AutoModelForCausalLM\n\nMODEL_PATH = &quot;Qwen/Qwen2.5-0.5B&quot;\ntokenizer = AutoTokenizer.from_pretrained(MODEL_PATH, trust_remote_code=True)\n\n# T4 不支持 bf16 必须 fp16; attn 走 eager (HF 默认实现, 见下方说明)\nmodel = AutoModelForCausalLM.from_pretrained(\n    MODEL_PATH,\n    torch_dtype=torch.float16,\n    attn_implementation=&quot;eager&quot;,\n    device_map=&quot;auto&quot;,\n)\n</code></pre>\n<blockquote>\n<p><strong><code>attn_implementation</code> 三个选项</strong>：</p>\n</blockquote>\n<ul>\n<li><code>\"eager\"</code>：PyTorch 原生 <code>Q@K^T → softmax → @V</code>，最朴素最慢但<strong>任何 GPU 都能跑</strong></li>\n<li><code>\"sdpa\"</code>：PyTorch 2.0+ <code>scaled_dot_product_attention</code>，会自动选 backend；Ampere+ 上等价 FlashAttn</li>\n<li><code>\"flash_attention_2\"</code>：显式调 FlashAttn2 库，<strong>需要 Ampere+ (sm_80+) GPU</strong>，T4 (sm_75) 用不了</li>\n</ul>\n<p>T4 上保险起见用 <code>eager</code>。</p>\n<p><strong>词表扩展 + reshape</strong>：</p>\n<p>Qwen 的 ChatML 系列 token (<code>&lt;|im_start|&gt;</code> / <code>&lt;|im_end|&gt;</code> 等) 在预训练就预留好了，直接用就行；但业务往往要加自定义 token（§2.2 的 <code>&lt;|product_id|&gt;</code> 等），或者用的 base 没预留 ChatML 时也得手动加——两种情况都走同一套 <code>add_special_tokens</code> + <code>resize_token_embeddings</code>：</p>\n<pre><code>extra_tokens = [\n    &quot;&lt;|product_id|&gt;&quot;, &quot;&lt;|order_id|&gt;&quot;,         # 业务自定义\n    # &quot;&lt;|im_start|&gt;&quot;, &quot;&lt;|im_end|&gt;&quot;,            # 如果 base 没预留 ChatML, 也加这里\n]\nn_added = tokenizer.add_special_tokens({&quot;additional_special_tokens&quot;: extra_tokens})\nprint(f&quot;加了 {n_added} 个新 token, 词表 V → V+{n_added}&quot;)\n\n# n_added 为 0 时 resize 是 no-op；但显式判断更清晰\nif n_added &gt; 0:\n    # embedding / lm_head [V, d] → [V+k, d], 新行用现有 embedding 均值初始化\n    model.resize_token_embeddings(len(tokenizer))\n</code></pre>\n<p><strong>训练前置三件套</strong>：</p>\n<pre><code>model.gradient_checkpointing_enable()    # 省显存: 不存中间激活, backward 时重算\nmodel.enable_input_require_grads()       # 让 embedding 输出 require_grad, 否则 LoRA 收不到梯度\nmodel.config.use_cache = False           # 训练时关 KV cache (和 checkpoint 冲突, 推理前改回 True)\n</code></pre>\n<h3><strong>5.2 LoRA 配置</strong></h3>\n<pre><code>from peft import get_peft_model, LoraConfig, TaskType\n\npeft_config = LoraConfig(\n    task_type=TaskType.CAUSAL_LM,\n    inference_mode=False,\n    r=8,\n    lora_alpha=16,                          # α = 2r 工程惯例\n    lora_dropout=0.1,\n    target_modules=[&quot;q_proj&quot;, &quot;v_proj&quot;],    # T4 资源紧；够就 &quot;all-linear&quot;\n)\nmodel = get_peft_model(model, peft_config)\nmodel.print_trainable_parameters()\n# trainable params: ~1M, all params: ~500M, trainable%: ~0.2%\n</code></pre>\n<h3><strong>5.3 数据 + 自定义 collator</strong></h3>\n<p>模拟小数据集 + 手写 <strong>response-only mask collator</strong>（§2.4 的 mask 规则）：</p>\n<pre><code>from datasets import Dataset\n\nraw = [\n    {&quot;question&quot;: &quot;什么是 LLM？&quot;, &quot;answer&quot;: &quot;LLM 是基于 Transformer 的大语言模型...&quot;},\n    {&quot;question&quot;: &quot;1+1=?&quot;,        &quot;answer&quot;: &quot;1+1=2&quot;},\n    # 实际业务从 jsonl 加载\n]\ndataset = Dataset.from_list(raw).map(lambda e: {\n    &quot;text&quot;: (f&quot;&lt;|im_start|&gt;user\\n{e['question']}&lt;|im_end|&gt;\\n&quot;\n             f&quot;&lt;|im_start|&gt;assistant\\n{e['answer']}&lt;|im_end|&gt;&quot;)\n})\n\nASSIST_START = &quot;&lt;|im_start|&gt;assistant\\n&quot;\nassist_ids = tokenizer.encode(ASSIST_START, add_special_tokens=False)\n\ndef collator(batch, max_len=512):\n    enc = tokenizer([b[&quot;text&quot;] for b in batch],\n                    padding=True, truncation=True, max_length=max_len,\n                    return_tensors=&quot;pt&quot;)\n    labels = enc[&quot;input_ids&quot;].clone()\n    for i, ids in enumerate(enc[&quot;input_ids&quot;]):\n        # 找 &quot;assistant\\n&quot; 起点；之前全部 mask 成 -100\n        for j in range(len(ids) - len(assist_ids) + 1):\n            if ids[j:j+len(assist_ids)].tolist() == assist_ids:\n                labels[i, :j+len(assist_ids)] = -100\n                break\n        labels[i, enc[&quot;attention_mask&quot;][i] == 0] = -100   # padding 也 mask\n    return {**enc, &quot;labels&quot;: labels}\n</code></pre>\n<h3><strong>5.4 训练</strong></h3>\n<pre><code>from transformers import Trainer, TrainingArguments\n\ntraining_args = TrainingArguments(\n    output_dir=&quot;./out&quot;,\n    learning_rate=1e-5,                   # §1.2 lr 区间\n    warmup_ratio=0.03,\n    lr_scheduler_type=&quot;cosine&quot;,\n    num_train_epochs=3,\n    per_device_train_batch_size=2,        # T4 16GB, 0.5B + LoRA 大概 2~4\n    gradient_accumulation_steps=8,        # 等效 batch=16\n    fp16=True,                            # T4 必须 fp16, 不是 bf16\n    max_grad_norm=1.0,                    # fp16 防爆\n    logging_steps=5,\n    save_steps=50,\n    report_to=&quot;none&quot;,\n    remove_unused_columns=False,          # 必须关, 否则 Trainer 会删掉 collator 要用的 &quot;text&quot; 列\n)\n\ntrainer = Trainer(\n    model=model,\n    train_dataset=dataset,\n    args=training_args,\n    data_collator=collator,\n)\ntrainer.train()\ntrainer.save_model(&quot;./out/adapter&quot;)       # 只存 LoRA，几 MB\n</code></pre>\n<h3><strong>5.5 训完合并 + 推理</strong></h3>\n<p>部署时合回基座（合并公式 §4.1）：</p>\n<pre><code>from peft import PeftModel\n\nbase = AutoModelForCausalLM.from_pretrained(MODEL_PATH, torch_dtype=torch.float16)\nbase.resize_token_embeddings(len(tokenizer))    # 基座也要 resize 到扩展后的 V+k\nmodel = PeftModel.from_pretrained(base, &quot;./out/adapter&quot;)\nmodel = model.merge_and_unload()                # W' = W₀ + (α/r)·BA\nmodel.save_pretrained(&quot;./out/merged&quot;)\ntokenizer.save_pretrained(&quot;./out/merged&quot;)\n</code></pre>\n<p>合完后是普通 HF 模型，推理 0 额外开销。</p>"
    }
  ],
  "latest_overview": [
    {
      "title": "",
      "body_html": "<h1>论文分享 | 大语言模型 最新进展</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2025879216579781437\">https://zhuanlan.zhihu.com/p/2025879216579781437</a></li>\n<li>作者: 智荐阁</li>\n</ul>\n<hr />\n<p>论文分享 | 大语言模型 最新进展</p>\n<h1>论文分享 | 大语言模型 最新进展</h1>\n<p>作者: 智荐阁, 赞: 2</p>\n<h2>论文分享 | 大语言模型 最新进展</h2>\n<blockquote>\n<p>我们从2026-04-01到2026-04-10的192篇文章中精选出10篇优秀的工作分享给读者，主要研究方向包括：<strong>大模型推理的准确率与效率权衡, 大模型驱动的动态假新闻检测与推理评测, 大模型诗歌生成与评测, 大模型在长周期金融建模任务中的端到端能力评估, 通信增强的参数高效大模型微调, 少数民族语言大模型评测, LLM大规模临床信息抽取的可验证性与信任度, 高效稀疏中型大语言模型的训练与推理（Token Efficiency in Mid-Scale LLMs）, 大模型需求到架构自动生成与评测, 阿拉伯语大模型自适应与推理提升</strong></p>\n</blockquote>\n<ol>\n<li>Gemma 4, Phi-4, and Qwen3: Accuracy-Efficiency Tradeoffs in Dense and MoE Reasoning Language Models</li>\n<li>LiveFact: A Dynamic, Time-Aware Benchmark for LLM-Driven Fake News Detection</li>\n<li>POEMetric: The Last Stanza of Humanity</li>\n<li>FrontierFinance: A Long-Horizon Computer-Use Benchmark of Real-World Financial Tasks</li>\n<li>TalkLoRA: Communication-Aware Mixture of Low-Rank Adaptation for Large Language Models</li>\n<li>GaelEval: Benchmarking LLM Performance for Scottish Gaelic</li>\n<li>A Multi-Stage Validation Framework for Trustworthy Large-scale Clinical Information Extraction using Large Language Models</li>\n<li>JoyAI-LLM Flash: Advancing Mid-Scale LLMs with Token Efficiency</li>\n<li>Benchmarking Requirement-to-Architecture Generation with Hybrid Evaluation</li>\n<li>State-of-the-Art Arabic Language Modeling with Sparse MoE Fine-Tuning and Chain-of-Thought Distillation</li>\n</ol>\n<h3>Gemma 4, Phi-4, and Qwen3: Accuracy-Efficiency Tradeoffs in Dense and MoE Reasoning Language Models</h3>\n<blockquote>\n<p>Authors: Md Motaleb Hossen Manik, Ge Wang<br />\n Affiliations: Rensselaer Polytechnic Institute</p>\n</blockquote>\n<p><a href=\"https://link.zhihu.com/?target=http%3A//arxiv.org/abs/2604.07035v1\">http://arxiv.org/abs/2604.07035v1</a></p>\n<h3>论文摘要</h3>\n<p>Mixture-of-experts (MoE) language models are often expected to offer better quality-efficiency tradeoffs than dense models because only a subset of parameters is activated per token, but the practical value of that advantage depends on end-to-end behavior under realistic inference constraints. We present a controlled empirical benchmark of seven recent reasoning-oriented instruction-tuned models spanning dense and MoE designs, namely Gemma-4-E2B, Gemma-4-E4B, Gemma-4-26B-A4B, Phi-4-mini-reasoning, Phi-4-reasoning, Qwen3-8B, and Qwen3-30B-A3B, evaluated on four benchmarks – ARC-Challenge, GSM8K, Math Level 1-3, and TruthfulQA MC1 – under three prompting strategies: zero-shot, chain-of-thought, and few-shot chain-of-thought. The study covers 8,400 total model-dataset-prompt evaluations and records accuracy, latency, peak GPU memory usage (VRAM), and an approximate floating-point operations (FLOPs)-per-token proxy. Across the weighted multi-task summary, Gemma-4-E4B with few-shot chain-of-thought achieved the best overall result, reaching weighted accuracy 0.675 with mean VRAM 14.9 GB, while Gemma-4-26B-A4B was close in accuracy at 0.663 but substantially more memory intensive at 48.1 GB. At the task level, Gemma models dominated ARC and Math, Phi models were strongest on TruthfulQA, and GSM8K showed the largest prompt sensitivity, including a sharp drop for Phi-4-reasoning from 0.67 under chain-of-thought to 0.11 under few-shot chain-of-thought. These results show that sparse activation alone does not guarantee the best practical operating point: observed accuracy-efficiency tradeoffs depend jointly on architecture, prompting protocol, and task composition. We release a reproducible benchmark pipeline, aggregated results, and paired statistical analyses to support deployment-oriented evaluation of reasoning LLMs under real resource constraints.</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-724a37f3324b27865387baf1dbaa8797_1440w.jpg\" /></p>\n<p><strong>论文简评</strong>: 本论文动机在于系统性评估近期开源大模型（包括Gemma 4、Phi-4、Qwen3等，涵盖密集和MoE架构）在推理任务下的准确率与效率权衡。作者采用统一的硬件和推理流程，对七个模型在四个推理基准（科学、数学、真伪判断等）与三种提示策略（零样本、链式思考、少样本链式思考）下进行全面实验，记录准确率、延迟、显存和近似算力消耗。实验发现，Gemma-4-E4B模型在准确率和效率上表现最佳，MoE模型在某些任务和提示下优于密集模型，但稀疏激活并非总能带来最优部署效果。论文最终发布了可复现的评测流程和统计分析，强调多维度、部署导向的大模型评估方法。</p>\n<h3>LiveFact: A Dynamic, Time-Aware Benchmark for LLM-Driven Fake News Detection</h3>\n<blockquote>\n<p>Authors: Cheng Xu, Changhong Jin, Yingjie Niu, Nan Yan, Yuke Mei, Shuhao Guan, Liming Chen, M-Tahar Kechadi<br />\n Affiliations: University College Dublin; Georgia Institute of Technology; Dalian University of Technology; Bebxy</p>\n</blockquote>\n<p><a href=\"https://link.zhihu.com/?target=http%3A//arxiv.org/abs/2604.04815v1\">http://arxiv.org/abs/2604.04815v1</a></p>\n<h3>论文摘要</h3>\n<p>The rapid development of Large Language Models (LLMs) has transformed fake news detection and fact-checking tasks from simple classification to complex reasoning. However, evaluation frameworks have not kept pace. Current benchmarks are static, making them vulnerable to benchmark data contamination (BDC) and ineffective at assessing reasoning under temporal uncertainty. To address this, we introduce LiveFact a continuously updated benchmark that simulates the real-world “fog of war” in misinformation detection. LiveFact uses dynamic, temporal evidence sets to evaluate models on their ability to reason with evolving, incomplete information rather than on memorized knowledge. We propose a dual-mode evaluation: Classification Mode for final verification and Inference Mode for evidence-based reasoning, along with a component to monitor BDC explicitly. Tests with 22 LLMs show that open-source Mixture-of-Experts models, such as Qwen3-235B-A22B, now match or outperform proprietary state-of-the-art systems. More importantly, our analysis finds a significant “reasoning gap.” Capable models exhibit epistemic humility by recognizing unverifiable claims in early data slices-an aspect traditional static benchmarks overlook. LiveFact sets a sustainable standard for evaluating robust, temporally aware AI verification.</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-c1ef160a502a25f4e95d11b730302cb6_1440w.jpg\" /></p>\n<p><strong>论文简评</strong>: 本论文提出了LiveFact，一个动态、时间敏感的大模型假新闻检测基准，旨在解决当前静态评测方法无法有效衡量LLM推理能力和易受数据污染（BDC）影响的问题。LiveFact通过每月自动更新新闻事件、构建时间切片证据集、采用双模式评测（分类与推理），以及显式集成语义敏感放大器（SSA）框架监控数据污染，全面模拟真实世界信息演化与不确定性。实验覆盖22种主流LLM，发现开源Mixture-of-Experts（MoE）模型已可与甚至超越闭源SOTA系统，并首次量化了模型的“推理鸿沟”——即高能力模型能在证据不全时展现出“认知谦逊”，而传统静态基准无法捕捉。LiveFact为假新闻检测领域提供了更可持续、真实和严谨的评测标准。</p>\n<h3>POEMetric: The Last Stanza of Humanity</h3>\n<blockquote>\n<p>Authors: Bingru Li, Han Wang, Hazel Wilkinson<br />\n Affiliations: University of Birmingham; University of Trento</p>\n</blockquote>\n<p><a href=\"https://link.zhihu.com/?target=http%3A//arxiv.org/abs/2604.03695v1\">http://arxiv.org/abs/2604.03695v1</a></p>\n<h3>论文摘要</h3>\n<p>Large Language Models (LLMs) can compose poetry, but how far are they from human poets? In this paper, we introduce POEMetric, the first comprehensive framework for poetry evaluation, examining 1) basic instruction-following abilities in generating poems according to a certain form and theme, 2) advanced abilities of showing creativity, lexical diversity, and idiosyncrasy, evoking emotional resonance, and using imagery and literary devices, and 3) general appraisal of the overall poem quality and estimation of authorship. We curated a human poem dataset - 203 English poems of 7 fixed forms annotated with meter, rhyme patterns and themes - and experimented with 30 LLMs for poetry generation based on the same forms and themes of the human data, totaling 6,090 LLM poems. Based on POEMetric, we assessed the performance of both human poets and LLMs through rule-based evaluation and LLM-as-a-judge, whose results were validated by human experts. Results show that, though the top model achieved high form accuracy (4.26 out of 5.00, with Gemini-2.5-Pro as a judge; same below) and theme alignment (4.99), all models failed to reach the same level of advanced abilities as human poets, who achieved unparalleled creativity (4.02), idiosyncrasy (3.95), emotional resonance (4.06), and skillful use of imagery (4.49) and literary devices (4.67). Humans also defeated the best-performing LLM in overall poem quality (4.22 vs. 3.20). As such, poetry generation remains a formidable challenge for LLMs. Data and codes are released at <a href=\"https://link.zhihu.com/?target=https%3A//github.com/Bingru-Li/POEMetric\">https://github.com/Bingru-Li/POEMetric</a>.</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-05670eeff7be82d37640d04f351a6bee_1440w.jpg\" /></p>\n<p><strong>论文简评</strong>: 本论文关注大语言模型（LLMs）在诗歌生成方面与人类诗人之间的差距，提出了首个面向诗歌生成的全面评测框架POEMetric，涵盖形式遵循、主题契合、创造力、词汇多样性、个性化、情感共鸣、意象与修辞等10个维度。作者构建并注释了包含203首英文诗的人类诗歌数据集，并基于同样的诗歌体裁和主题，生成了30个主流LLM的共6090首诗歌，通过规则算法、LLM判官和人类专家三重验证进行评测。实验结果显示，顶尖模型虽在形式和主题准确性上接近人类，但在创造力、情感表达和个性等高级能力上仍明显落后，人类诗歌在整体质量和独特性上具有不可替代的优势，表明诗歌生成仍是LLM面临的重要挑战。论文同时公开了数据与代码，促进后续研究。</p>\n<h3>FrontierFinance: A Long-Horizon Computer-Use Benchmark of Real-World Financial Tasks</h3>\n<blockquote>\n<p>Authors: Michael Krumdick, Varshini Reddy, Shivani Chaudhary, William Day, Maarij Ahmed, Hayan Haqqi, Muhammad Ahsen Fahim, Hanzallah Amjad, Ahmad Orakzai, Aqsa Gul, Chris Tanner<br />\n Affiliations: Kensho Technologies; S&amp;P Global; MIT</p>\n</blockquote>\n<p><a href=\"https://link.zhihu.com/?target=http%3A//arxiv.org/abs/2604.05912v1\">http://arxiv.org/abs/2604.05912v1</a></p>\n<h3>论文摘要</h3>\n<p>As concerns surrounding AI-driven labor displacement intensify in knowledge-intensive sectors, existing benchmarks fail to measure performance on tasks that define practical professional expertise. Finance, in particular, has been identified as a domain with high AI exposure risk, yet lacks robust benchmarks to track real-world developments. This gap is compounded by the absence of clear accountability mechanisms in current Large Language Model (LLM) deployments. To address this, we introduce FrontierFinance, a long-horizon benchmark of 25 complex financial modeling tasks across five core finance models, requiring an average of over 18 hours of skilled human labor per task to complete. Developed with financial professionals, the benchmark reflects industry-standard financial modeling workflows and is paired with detailed rubrics for structured evaluation. We engage human experts to define the tasks, create rubrics, grade LLMs, and perform the tasks themselves as human baselines. We demonstrate that our human experts both receive higher scores on average, and are more likely to provide client-ready outputs than current state-of-the-art systems.</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-fc0c1dd819a33f3abda8ccac3c076040_1440w.jpg\" /></p>\n<h3><strong>论文简评</strong>: 该论文提出了FrontierFinance，一个针对现实金融建模任务的长周期大模型能力评测基准，旨在弥补现有短周期、低复杂度benchmark无法反映专业金融领域真实需求的不足。作者与金融专家合作设计了25个覆盖五类核心金融模型的任务，并为每项任务制定了细致的打分标准，确保结果具备可复现性和行业相关性。实验中，GPT-5.4、Opus 4.6等模型展现出极高的速度优势（平均不到1小时完成任务），但在输出质量和结构一致性方面远低于人类专家（平均分分别为70.9%、61.8%，人类为77.2%），且常出现难以修正的错误。论文还验证了基于详细rubric的LLM裁判评估方案，发现其与人类专家分数相关性显著提升。整体结果显示，大模型虽能快速生成方向正确的初步结果，但距离专业金融建模的标准和可靠性仍有明显差距，FrontierFinance为后续模型进步和实用性评估提供了重要参考。</h3>\n<h3>TalkLoRA: Communication-Aware Mixture of Low-Rank Adaptation for Large Language Models</h3>\n<blockquote>\n<p>Authors: Lin Mu, Haiyang Wang, Li Ni, Lei Sang, Zhize Wu, Peiquan Jin, Yiwen Zhang<br />\n Affiliations: Anhui University; Hefei University; University of Science and Technology of China</p>\n</blockquote>\n<p><a href=\"https://link.zhihu.com/?target=http%3A//arxiv.org/abs/2604.06291v1\">http://arxiv.org/abs/2604.06291v1</a></p>\n<h3>论文摘要</h3>\n<p>Low-Rank Adaptation (LoRA) enables parameter-efficient fine-tuning of Large Language Models (LLMs), and recent Mixture-of-Experts (MoE) extensions further enhance flexibility by dynamically combining multiple LoRA experts. However, existing MoE-augmented LoRA methods assume that experts operate independently, often leading to unstable routing, expert dominance. In this paper, we propose \\textbf{TalkLoRA}, a communication-aware MoELoRA framework that relaxes this independence assumption by introducing expert-level communication prior to routing. TalkLoRA equips low-rank experts with a lightweight Talking Module that enables controlled information exchange across expert subspaces, producing a more robust global signal for routing. Theoretically, we show that expert communication smooths routing dynamics by mitigating perturbation amplification while strictly generalizing existing MoELoRA architectures. Empirically, TalkLoRA consistently outperforms vanilla LoRA and MoELoRA across diverse language understanding and generation tasks, achieving higher parameter efficiency and more balanced expert routing under comparable parameter budgets. These results highlight structured expert communication as a principled and effective enhancement for MoE-based parameter-efficient adaptation. Code is available at <a href=\"https://link.zhihu.com/?target=https%3A//github.com/why0129/TalkLoRA\">https://github.com/why0129/TalkLoRA</a>.</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-617c546cb0b8bd66912ef526d8a403f5_1440w.jpg\" /></p>\n<p><strong>论文简评</strong>: TalkLoRA针对Mixture-of-Experts (MoE)与LoRA结合的参数高效微调方法中，专家之间独立导致路由不稳定和专家垄断的问题，提出在路由前引入专家间通信的“Talking Module”，以实现专家特征的协同与信息交换。该方法通过理论分析证明通信机制提升模型表达能力并缓解路由扰动放大，实验上在多项语言理解和生成任务中，TalkLoRA在相近参数预算下比LoRA和MoELoRA表现更优，参数效率和专家负载均衡性显著提升。整体上，TalkLoRA展示了结构化专家通信在MoE类大模型微调中的有效性和鲁棒性。</p>\n<h3>GaelEval: Benchmarking LLM Performance for Scottish Gaelic</h3>\n<blockquote>\n<p>Authors: Peter Devine, William Lamb, Beatrice Alex, Ignatius Ezeani, Dawn Knight, Mícheál J. Ó Meachair, Paul Rayson, Martin Wynne<br />\n Affiliations: University of Edinburgh; Lancaster University; University of Cardiff; Dublin City University; University of Oxford</p>\n</blockquote>\n<p><a href=\"https://link.zhihu.com/?target=http%3A//arxiv.org/abs/2604.02135v1\">http://arxiv.org/abs/2604.02135v1</a></p>\n<h3>论文摘要</h3>\n<p>Multilingual large language models (LLMs) often exhibit emergent ‘shadow’ capabilities in languages without official support, yet their performance on these languages remains uneven and under-measured. This is particularly acute for morphosyntactically rich minority languages such as Scottish Gaelic, where translation benchmarks fail to capture structural competence. We introduce GaelEval, the first multi-dimensional benchmark for Gaelic, comprising: (i) an expert-authored morphosyntactic MCQA task; (ii) a culturally grounded translation benchmark and (iii) a large-scale cultural knowledge Q&amp;A task. Evaluating 19 LLMs against a fluent-speaker human baseline (<img alt=\"n=30\" src=\"https://www.zhihu.com/equation?tex=n%3D30\" />), we find that Gemini 3 Pro Preview achieves <img alt=\"83.3\\%\" src=\"https://www.zhihu.com/equation?tex=83.3%5C%25\" /> accuracy on the linguistic task, surpassing the human baseline (<img alt=\"78.1\\%\" src=\"https://www.zhihu.com/equation?tex=78.1%5C%25\" />). Proprietary models consistently outperform open-weight systems, and in-language (Gaelic) prompting yields a small but stable advantage (+<img alt=\"2.4\\%\" src=\"https://www.zhihu.com/equation?tex=2.4%5C%25\" />). On the cultural task, leading models exceed <img alt=\"90\\%\" src=\"https://www.zhihu.com/equation?tex=90%5C%25\" /> accuracy, though most systems perform worse under Gaelic prompting and absolute scores are inflated relative to the manual benchmark. Overall, GaelEval reveals that frontier models achieve above-human performance on several dimensions of Gaelic grammar, demonstrates the effect of Gaelic prompting and shows a consistent performance gap favouring proprietary over open-weight models.</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-e0b5af7ef0b71da426cd350370445996_1440w.jpg\" /></p>\n<p><strong>论文简评</strong>: 该论文针对苏格兰盖尔语这样缺乏官方支持和评测资源的少数民族语言，提出了首个多维评测基准GaelEval，涵盖形态句法选择题、文化相关翻译和文化知识问答三项任务。作者系统评测了19个大模型，并与30名流利母语者基线对比，发现Gemini 3 Pro Preview在语言学任务上超越了人类基线，封闭模型整体优于开源模型，并且盖尔语提示有小幅稳定提升。文化任务中顶级模型准确率超90%，但绝对分数被高估。实验结果表明，前沿大模型在盖尔语语法维度已达到或超过人类水平，GaelEval有效揭示了少数民族语言模型能力及提示方式、模型类型差异，为低资源语言评测提供了新工具与基准。</p>\n<h3>A Multi-Stage Validation Framework for Trustworthy Large-scale Clinical Information Extraction using Large Language Models</h3>\n<blockquote>\n<p>Authors: Maria Mahbub, Gregory M. Dams, Josh Arnold, Caitlin Rizy, Sudarshan Srinivasan, Elliot M. Fielstein, Minu A. Aghevli, Kamonica L. Craig, Elizabeth M. Oliva, Joseph Erdos, Jodie Trafton, Ioana Danciu<br />\n Affiliations: Oak Ridge National Laboratory; Department of Veterans Affairs; Vanderbilt University Medical Center; VA Maryland Health Care System; VA Desert Pacific Healthcare Network; VA Connecticut Health Care System; Yale School of Medicine</p>\n</blockquote>\n<p><a href=\"https://link.zhihu.com/?target=http%3A//arxiv.org/abs/2604.06028v1\">http://arxiv.org/abs/2604.06028v1</a></p>\n<h3>论文摘要</h3>\n<p>Large language models (LLMs) show promise for extracting clinically meaningful information from unstructured health records, yet their translation into real-world settings is constrained by the lack of scalable and trustworthy validation approaches. Conventional evaluation methods rely heavily on annotation-intensive reference standards or incomplete structured data, limiting feasibility at population scale. We propose a multi-stage validation framework for LLM-based clinical information extraction that enables rigorous assessment under weak supervision. The framework integrates prompt calibration, rule-based plausibility filtering, semantic grounding assessment, targeted confirmatory evaluation using an independent higher-capacity judge LLM, selective expert review, and external predictive validity analysis to quantify uncertainty and characterize error modes without exhaustive manual annotation. We applied this framework to extraction of substance use disorder (SUD) diagnoses across 11 substance categories from 919,783 clinical notes. Rule-based filtering and semantic grounding removed 14.59% of LLM-positive extractions that were unsupported, irrelevant, or structurally implausible. For high-uncertainty cases, the judge LLM’s assessments showed substantial agreement with subject matter expert review (Gwet’s AC1=0.80). Using judge-evaluated outputs as references, the primary LLM achieved an F1 score of 0.80 under relaxed matching criteria. LLM-extracted SUD diagnoses also predicted subsequent engagement in SUD specialty care more accurately than structured-data baselines (AUC=0.80). These findings demonstrate that scalable, trustworthy deployment of LLM-based clinical information extraction is feasible without annotation-intensive evaluation.</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-1a8e2272ab49f1ae11639659b120268d_1440w.jpg\" /></p>\n<p><strong>论文简评</strong>: 本论文关注于如何在缺乏高质量人工标注数据的情况下，验证大规模临床文本中由大语言模型（LLM）抽取的信息的可信度。作者提出了一个多阶段验证框架，结合了提示工程、规则过滤、语义对齐、独立Judge LLM评估、专家复核和外部预测有效性分析。该方法应用于近百万条临床笔记中的药物滥用诊断抽取，显著提升了抽取结果的精确性和可信度，Judge LLM与专家评审一致性高（Gwet’s AC1=0.80），最终LLM抽取结果在下游预测任务上优于结构化数据基线（AUC=0.80）。整体上，该框架为LLM在医疗信息抽取领域的大规模部署提供了可行、可扩展且无需大量人工标注的验证方案。</p>\n<h3>JoyAI-LLM Flash: Advancing Mid-Scale LLMs with Token Efficiency</h3>\n<blockquote>\n<p>Authors: Aichen Cai, Anmeng Zhang, Anyu Li, Bo Zhang, Bohua Cai, Chang Li, Changjian Jiang, Changkai Lu, Chao Xue, Chaocai Liang, Cheng Zhang, Dongkai Liu, Fei Wang, Guoqiang Huang, Haijian Ke, Han Lin, Hao Wang, Ji Miao, Jiacheng Zhang, Jialong Shi, Jifeng Zhu, Jingjing Qian, Junhui Luo, Junwu Xiong, Lam So, Liang Huang, Ming Ke, Mingyang Li, Panfeng Shi, Peng Hao, Qi Wang, Qian Lai, Qiaoqiao Yuan, Qingyu Yin, Qiong Cao, Qixiang Wang, Rongcheng Bian, Rongduo Han, Shaoqiang Zheng, Shi Hu, Shi Suo, Shijie Ren, Shijin Zhang, Shiying Fan, Shuai Xie, Tianyi Zhang, Wei Liu, Wentao Tan, Xianghan Meng, Xiaodong He, Xing Pan, Xiran Wang, Xuyang Peng, Ya Zhang, Yang Liu, Yangyang Duan, Yanxu Chen, Yicheng Gong, Yidan Huang, Yifei Liu, Yinhao Bai, Yongqiang Liu, Yuesong Zhang, Yuqi Zhang, Zerui Xie, Zhenfang Wang, Zhennan Shen, Zheyuan Liu, Zhuwei Zeng<br />\n Affiliations: <a href=\"https://link.zhihu.com/?target=http%3A//JD.com\">http://JD.com</a></p>\n</blockquote>\n<p><a href=\"https://link.zhihu.com/?target=http%3A//arxiv.org/abs/2604.03044v2\">http://arxiv.org/abs/2604.03044v2</a></p>\n<h3>论文摘要</h3>\n<p>We introduce JoyAI-LLM Flash, an efficient Mixture-of-Experts (MoE) language model designed to redefine the trade-off between strong performance and token efficiency in the sub-50B parameter regime. JoyAI-LLM Flash is pretrained on a massive corpus of 20 trillion tokens and further optimized through a rigorous post-training pipeline, including supervised fine-tuning (SFT), Direct Preference Optimization (DPO), and large-scale reinforcement learning (RL) across diverse environments. To improve token efficiency, JoyAI-LLM Flash strategically balances \\emph{thinking} and \\emph{non-thinking} cognitive modes and introduces FiberPO, a novel RL algorithm inspired by fibration theory that decomposes trust-region maintenance into global and local components, providing unified multi-scale stability control for LLM policy optimization. To enhance architectural sparsity, the model comprises 48B total parameters while activating only 2.7B parameters per forward pass, achieving a substantially higher sparsity ratio than contemporary industry leading models of comparable scale. To further improve inference throughput, we adopt a joint training-inference co-design that incorporates dense Multi-Token Prediction (MTP) and Quantization-Aware Training (QAT). We release the checkpoints for both JoyAI-LLM-48B-A3B Base and its post-trained variants on Hugging Face to support the open-source community.</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-86944d62c6e183916d01c6752285fb2a_1440w.jpg\" /></p>\n<p><strong>论文简评</strong>: 本文提出了JoyAI-LLM Flash，一种参数规模为48B、稀疏激活仅2.7B参数的Mixture-of-Experts（MoE）大语言模型，旨在提升中型LLM的Token效率与推理吞吐。动机在于现有中型模型在准确性与推理速度间存在权衡，且推理Token消耗过高，计算成本大。方法上，作者构建了纯注意力+MLP路由的MoE架构，并通过大规模多阶段预训练（20万亿Token）、多任务精调、Direct Preference Optimization（DPO）、创新的FiberPO强化学习等多步骤优化Token利用率与能力。实验结果显示，JoyAI-LLM Flash在数学、代码、长上下文理解等多项评测中，Token效率和推理速度优于同类SOTA模型（如Qwen、GLM），并支持多种量化部署。该模型权重已开源，推动了高效中型大模型的发展。</p>\n<h3>Benchmarking Requirement-to-Architecture Generation with Hybrid Evaluation</h3>\n<blockquote>\n<p>Authors: Minxiao Li, Shuying Yan, Li Zhang, Yang Liu, Fang Liu<br />\n Affiliations: Beihang University</p>\n</blockquote>\n<p><a href=\"https://link.zhihu.com/?target=http%3A//arxiv.org/abs/2604.06683v1\">http://arxiv.org/abs/2604.06683v1</a></p>\n<h3>论文摘要</h3>\n<p>Recently, Large Language Models (LLMs) have demonstrated significant potential in automating software engineering tasks. Generating software architecture designs from requirement documents is a crucial step in software development. However, there is currently a lack of functional datasets tailored for this task. To bridge this gap, we introduce R2ABench (Requirement-To-Architecture Benchmark), a novel benchmark comprising diverse real-world software projects paired with comprehensive Product Requirements Documents (PRDs) and expert-curated PlantUML reference diagrams. Furthermore, we propose a multi-dimensional, hybrid evaluation framework that assesses generated diagrams across three complementary layers: Structural Graph Metrics, Multi-dimensional Scoring, and Architecture Anti-pattern Detection. Using this framework, we conducted a comprehensive empirical study evaluating state-of-the-art models and agentic workflows. Our study shows that LLMs show strong syntactic validity and robust entity extraction but fundamentally struggle with relational reasoning, leading to structurally fragmented architectures. Code-specialized models partially alleviate this limitation, while agent frameworks introduce significant instability rather than consistent improvements. R2ABench provides a robust and standardized foundation for advancing LLM-driven software architecture generation.</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-a7f65f87490f12e34a2066857790da96_1440w.jpg\" /></p>\n<p><strong>论文简评</strong>: 本论文关注大语言模型（LLM）如何自动将真实软件需求文档（PRD）转化为系统架构图，并指出目前缺乏适用于该任务的功能性数据集和系统性评测方法。为此，作者提出了R2ABench数据集，涵盖多领域真实项目的PRD及专家标注的PlantUML参考架构图，并设计了三层次的混合评测框架，分别从结构图指标、多维语义评分和架构反模式检测等方面综合评估生成结果。实验系统性分析了多种主流大模型和智能体框架，发现LLM在实体抽取和语法正确性上表现较好，但在组件关系建模和全局结构推理方面仍有明显短板，智能体框架未能带来稳定增益。R2ABench为大模型驱动的软件架构生成研究提供了标准化的评测基础和数据资源。</p>\n<h3>State-of-the-Art Arabic Language Modeling with Sparse MoE Fine-Tuning and Chain-of-Thought Distillation</h3>\n<blockquote>\n<p>Authors: Navan Preet Singh, Anurag Garikipati, Ahmed Abulkhair, Jyani Akshay Jagdishbhai, Atul Yaduvanshi, Amarendra Chaudhary, Madalina Ciobanu, Qingqing Mao, Ritankar Das<br />\n Affiliations: Forta, Houston, TX; Incept Labs, Houston, TX; Titan Holdings, San Francisco, CA</p>\n</blockquote>\n<p><a href=\"https://link.zhihu.com/?target=http%3A//arxiv.org/abs/2604.06421v1\">http://arxiv.org/abs/2604.06421v1</a></p>\n<h3>论文摘要</h3>\n<p>This paper introduces Arabic-DeepSeek-R1, an application-driven open-source Arabic LLM that leverages a sparse MoE backbone to address the digital equity gap for under-represented languages, and establishes a new SOTA across the entire Open Arabic LLM Leaderboard (OALL). Our four-phase CoT distillation scheme integrates Arabic-specific linguistic verification and regional ethical norms into a 372M-token, contamination-controlled 80⁄20 Arabic-English training mixture. Arabic-DeepSeek-R1 achieves the highest average score across the seven-benchmark OALL suite while establishing SOTA or near-SOTA, including dominant results on grammar-focused MadinahQA (surpassing both GPT-5.1 and the OALL leader by substantial margins), safety-oriented AraTrust, multi-ability AlGhafa, and retrieval-augmented ALRAGE. Our results indicate that the combination of sparse MoE architecture, culturally-informed CoT distillation with explicit Arabic linguistic checks, and strategic bilingual data curation enables an open-source adapted model to systematically outperform the proprietary frontier system GPT-5.1 on the majority of benchmarks evaluating comprehensive language-specific tasks: the first such demonstration for Arabic LLMs. These findings indicate that much of Arabic’s performance deficit in current LLM ecosystems stems from under-specialization rather than architectural limitations, and that parameter-efficient adaptation of open reasoning models can yield breakthrough SOTA performance without industrial-scale pretraining costs. Arabic-DeepSeek-R1 establishes a validated and replicable framework for sovereign and domain-specific language technologies, demonstrating that strategic, culturally-grounded adaptation of sparse MoE backbones offers a viable and cost-effective pathway to achieving record-breaking performance across standardized benchmarks for low-resource languages. <strong>论文简评</strong>: 本文针对阿拉伯语在大语言模型领域的数字鸿沟和表现不足问题，提出了Arabic-DeepSeek-R1，一种基于稀疏专家混合（MoE）架构并结合四阶段链式思维（CoT）蒸馏的开源阿拉伯语大模型。作者通过80/20阿拉伯语-英语高质量数据混合、严格的数据污染控制及融入阿拉伯语特有的语言和伦理校验，有效提升了模型在七项权威阿拉伯语基准（OALL）上的表现。实验结果显示，该模型在OALL平均分上首次超越了开源和专有（GPT-5.1）系统，在语法、文化安全性、多任务理解等任务上表现突出，验证了稀疏MoE架构与面向文化的CoT蒸馏结合数据策略可为低资源语言带来高效、低成本的突破性性能提升。</p>\n<hr />\n<p>我们欢迎您在评论区中留下宝贵的建议！包括但不限于：</p>\n<ul>\n<li>可以提出推文中论文简评的不足！</li>\n<li>可以分享最近更值得推荐的论文并给出理由！</li>\n</ul>"
    }
  ],
  "graph": {
    "nodes": [
      {
        "id": "flan",
        "x": 100,
        "y": 50,
        "category": "instruction"
      },
      {
        "id": "t0",
        "x": 150,
        "y": 80,
        "category": "instruction"
      },
      {
        "id": "instructgpt",
        "x": 200,
        "y": 50,
        "category": "instruction"
      },
      {
        "id": "self_instruct",
        "x": 250,
        "y": 80,
        "category": "instruction"
      },
      {
        "id": "alpaca",
        "x": 300,
        "y": 100,
        "category": "instruction"
      },
      {
        "id": "adapter",
        "x": 50,
        "y": 150,
        "category": "peft"
      },
      {
        "id": "prefix_tuning",
        "x": 120,
        "y": 170,
        "category": "peft"
      },
      {
        "id": "prompt_tuning",
        "x": 150,
        "y": 190,
        "category": "peft"
      },
      {
        "id": "p_tuning",
        "x": 130,
        "y": 150,
        "category": "peft"
      },
      {
        "id": "p_tuning_v2",
        "x": 180,
        "y": 150,
        "category": "peft"
      },
      {
        "id": "lora",
        "x": 180,
        "y": 240,
        "category": "peft"
      },
      {
        "id": "adalora",
        "x": 280,
        "y": 220,
        "category": "peft"
      },
      {
        "id": "qlora",
        "x": 300,
        "y": 250,
        "category": "peft"
      },
      {
        "id": "dora",
        "x": 350,
        "y": 230,
        "category": "peft"
      },
      {
        "id": "galore",
        "x": 350,
        "y": 270,
        "category": "peft"
      },
      {
        "id": "vera",
        "x": 380,
        "y": 250,
        "category": "peft"
      },
      {
        "id": "flan_t5",
        "x": 300,
        "y": 50,
        "category": "multitask"
      },
      {
        "id": "selective_reflection",
        "x": 450,
        "y": 80,
        "category": "frontier"
      },
      {
        "id": "llamoco",
        "x": 450,
        "y": 50,
        "category": "frontier"
      },
      {
        "id": "lora_e2",
        "x": 480,
        "y": 230,
        "category": "frontier"
      },
      {
        "id": "sfed_lora",
        "x": 500,
        "y": 260,
        "category": "frontier"
      },
      {
        "id": "bladelora",
        "x": 450,
        "y": 220,
        "category": "frontier"
      },
      {
        "id": "lora2",
        "x": 480,
        "y": 280,
        "category": "frontier"
      }
    ],
    "edges": [
      {
        "from": "flan",
        "to": "t0",
        "label": "提示工程"
      },
      {
        "from": "flan",
        "to": "instructgpt",
        "label": "引入RLHF"
      },
      {
        "from": "flan",
        "to": "self_instruct",
        "label": "自举生成"
      },
      {
        "from": "self_instruct",
        "to": "alpaca",
        "label": "低成本复现"
      },
      {
        "from": "flan",
        "to": "flan_t5",
        "label": "扩展任务"
      },
      {
        "from": "adapter",
        "to": "prefix_tuning",
        "label": "连续优化"
      },
      {
        "from": "prefix_tuning",
        "to": "prompt_tuning",
        "label": "简化结构"
      },
      {
        "from": "prefix_tuning",
        "to": "p_tuning",
        "label": "嵌入替代"
      },
      {
        "from": "p_tuning",
        "to": "p_tuning_v2",
        "label": "跨规模"
      },
      {
        "from": "adapter",
        "to": "lora",
        "label": "低秩分解"
      },
      {
        "from": "lora",
        "to": "adalora",
        "label": "动态秩"
      },
      {
        "from": "lora",
        "to": "qlora",
        "label": "量化压缩"
      },
      {
        "from": "lora",
        "to": "dora",
        "label": "权重分解"
      },
      {
        "from": "lora",
        "to": "galore",
        "label": "梯度投影"
      },
      {
        "from": "lora",
        "to": "vera",
        "label": "共享矩阵"
      },
      {
        "from": "self_instruct",
        "to": "selective_reflection",
        "label": "数据筛选"
      },
      {
        "from": "flan_t5",
        "to": "llamoco",
        "label": "代码优化"
      },
      {
        "from": "dora",
        "to": "lora_e2",
        "label": "正则优化"
      },
      {
        "from": "lora",
        "to": "sfed_lora",
        "label": "联邦适配"
      },
      {
        "from": "adalora",
        "to": "bladelora",
        "label": "剪枝加速"
      },
      {
        "from": "lora",
        "to": "lora2",
        "label": "多尺度"
      }
    ],
    "milestones": [
      "flan",
      "lora",
      "instructgpt"
    ]
  },
  "algos": [
    {
      "id": "flan",
      "num": 1,
      "name": "FLAN",
      "fullName": "指令微调 (Finetuned Language Models)",
      "year": "2021.09",
      "org": "Google Research",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2109.01652",
      "projectUrl": "",
      "category": "instruction",
      "motivation": "将60+任务转为指令模板实现零样本泛化",
      "summary": "FLAN 提出了大规模指令微调：把 60+ 已有 NLP 数据集改写成自然语言指令模板后继续微调 137B 预训练语言模型，解决纯提示式零样本推理在未见任务上不稳定、难以理解任务意图的问题。",
      "keyPoints": [
        "使用 137B LaMDA-PT 作为基座，将其通过多任务自然语言指令监督微调成 FLAN",
        "聚合 62 个公开文本数据集，并按任务类型划分为 12 个 task clusters",
        "每个数据集人工编写 10 个自然语言模板，其中部分模板会“反转任务”以增加格式和目标多样性",
        "采用按任务簇留一的评估方式：评估某类任务时，训练阶段移除同类任务簇，确保是真正的跨任务零样本泛化",
        "对分类任务追加 <code>OPTIONS</code> 后缀显式列出候选标签，缓解自由生成模型在类别概率归一化上的不稳定",
        "训练时限制每个数据集最多 30k 样本，并使用 examples-proportional mixing 与 3k mixing-rate cap 平衡大/小数据集",
        "消融显示成功依赖三个因素：指令模板本身、足够多的任务簇、足够大的模型规模"
      ],
      "detail": "<p><img alt=\"FLAN 指令微调与零样本评估示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2109.01652/assets/x1.png\" />\n<em>图：FLAN 先在多种任务的自然语言指令格式上微调，再直接迁移到训练时未见过的任务类型；下方柱状图展示了 NLI、阅读理解、闭卷问答等任务上相对 GPT-3 的零样本提升。</em></p>\n<p>FLAN 的核心问题设定不是“如何让模型记住某个下游任务”，而是“如何让模型学会把自然语言描述当成任务接口”。GPT-3 这类大模型在 few-shot 情况下可以从示例中推断格式，但 zero-shot 时没有示例，模型只能依赖提示语和预训练分布。如果提示格式不像预训练文本，或者任务本身不是自然续写形式，例如 NLI、阅读理解、结构化到文本，模型就容易不知道输出什么。FLAN 的做法是把大量已有监督任务统一转成“指令 + 输入 -&gt; 目标输出”的语言建模问题，让模型在参数中学习“读懂任务描述并执行”的能力。</p>\n<pre><code class=\"language-python\"># FLAN 指令微调的核心流程\nclusters = group_datasets_by_task_type(datasets_62)  # 12 个任务簇\n\nfor eval_cluster in clusters:\n    train_datasets = [d for d in datasets_62 if cluster(d) != eval_cluster]\n    model = initialize_from_lamda_pt_137b()\n\n    for step in range(30_000):\n        dataset = sample_with_examples_proportional_mixing(\n            train_datasets,\n            max_examples_per_dataset=30_000,\n            mixing_rate_cap=3_000,\n        )\n        example = sample(dataset)\n        template = random_choice(templates[dataset])  # 每个数据集约 10 个模板\n        prompt, target = verbalize_as_instruction(example, template)\n\n        if is_classification(dataset):\n            prompt += &quot;\\nOPTIONS: &quot; + format_label_options(dataset.labels)\n\n        loss = -log_prob(model, target, condition=prompt)\n        model.update(loss, optimizer=&quot;Adafactor&quot;, lr=3e-5)\n\n    evaluate_zero_shot(model, held_out_cluster=eval_cluster)\n</code></pre>\n<p>训练目标仍然是标准的条件语言建模损失，只是训练样本经过模板化后显式带有任务说明。若第 <span class=\"kb-math kb-math-inline\">i</span> 个样本包含指令模板 <span class=\"kb-math kb-math-inline\">t_i</span>、输入 <span class=\"kb-math kb-math-inline\">x_i</span>、目标输出 <span class=\"kb-math kb-math-inline\">y_i</span>，FLAN 优化的是：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{FLAN}}(\\theta)\n= - \\sum_{(t_i,x_i,y_i) \\sim \\mathcal{D}_{\\text{mix}}}\n\\log p_\\theta(y_i \\mid t_i, x_i)</div>\n<p>这里真正关键的是 <span class=\"kb-math kb-math-inline\">\\mathcal{D}_{\\text{mix}}</span> 的构造。论文没有只把同一类任务堆在一起做多任务微调，而是把 NLI、阅读理解、闭卷问答、翻译、情感分析、结构化生成等任务放入同一混合分布。这样模型不能只记住单一标签空间，而必须从自然语言模板中识别“当前要做什么”。每个数据集的多个模板也很重要：如果同一任务只使用固定模板，模型可能学到模板捷径；模板多样化迫使模型把语义指令而不是字面格式作为条件。</p>\n<div class=\"key-point\">💡 关键：FLAN 的泛化评估不是简单的留出数据集，而是留出整个任务簇。例如评估 NLI 时，训练阶段会移除 NLI 以及与其过近的 paraphrase 任务，避免模型通过相似任务泄漏获得能力。</div>\n<p>分类任务的 <code>OPTIONS</code> 机制是一个很实用的细节。decoder-only LM 天然生成自由文本，若用候选答案的语言模型概率做 rank classification，某个标签可能因为同义表达过多而被稀释，例如 “yes” 的语义有很多表达方式，单个 token 的概率并不等于类别概率。FLAN 在提示末尾显式列出可选类别，使模型知道输出空间被限制到这些选项，从而把“开放生成”更接近“条件分类”。这不是改变架构，而是通过提示协议把分类头的作用转移到语言接口中。</p>\n<p>与传统 pretrain-finetune 相比，FLAN 不为每个任务训练专用头，也不要求下游任务提供训练集；与纯 prompting 相比，它又不是完全依赖人工 prompt engineering，而是用监督信号把“遵循指令”写入模型参数。论文的 Figure 2 将 FLAN 放在两者之间：它保留预训练语言模型的通用性，同时借助多任务监督让模型更适合在推理时接受自然语言任务描述。</p>\n<p>消融结果解释了为什么这套方法在 2021 年显得重要。第一，增加训练任务簇通常会提升未见任务簇性能，说明 FLAN 学到的是跨任务的指令执行能力，而不是孤立任务技巧。第二，模型规模不足时指令微调甚至可能伤害泛化，因为小模型容量会被训练任务本身占满；在 68B/137B 量级上，模型才有足够容量同时记住任务和抽象出指令遵循能力。第三，去掉自然语言指令、只保留输入输出或数据集名，效果明显下降，说明提升并非普通多任务微调即可解释。</p>\n<p>FLAN 的限制也来自它的设计边界：它主要依赖已有公开 NLP 数据集改写，因此任务覆盖仍受传统 benchmark 分布限制；它没有直接使用人类偏好或安全约束来优化回答质量；对于“本来就是语言续写”的 commonsense/coreference 类任务，指令带来的增益较小。这些限制后来分别被更大规模的 Flan Collection、Self-Instruct 式合成指令、以及 InstructGPT/RLHF 路线继续推进。</p>",
      "quiz": {
        "q": "FLAN 中按任务簇留一评估的主要目的是什么？",
        "options": [
          "减少训练所需显存，使 137B 模型可以单卡训练",
          "确保评估任务类型在指令微调阶段未出现，从而衡量跨任务零样本泛化",
          "让每个数据集都只使用一个固定模板，降低模板方差",
          "把分类任务全部改成无监督聚类任务"
        ],
        "answer": 1,
        "explain": "FLAN 评估某个任务簇时会从训练混合中移除该簇及过近任务，避免同类型任务泄漏，使结果更能反映模型是否学会遵循未见任务的自然语言指令。"
      }
    },
    {
      "id": "t0",
      "num": 2,
      "name": "T0",
      "fullName": "多任务提示训练 (T0)",
      "year": "2021.10",
      "org": "BigScience",
      "parent": "flan",
      "paperUrl": "https://arxiv.org/abs/2110.08207",
      "projectUrl": "",
      "category": "instruction",
      "motivation": "PromptSource大规模提示训练",
      "summary": "T0 提出了**多任务提示训练**（Multitask Prompted Training）范式：在 T5+LM（11B）上使用 PromptSource 工具为 62 个数据集编写的多样化自然语言提示模板进行大规模多任务微调，使模型在从未见过的 4 类 held-out 任务上展现出强大的零样本泛化能力，在 9/11 个评估数据集上匹配或超越 GPT-3（175B）。",
      "keyPoints": [
        "<strong>基座模型</strong>：T5+LM（11B 参数），即在 T5 encoder-decoder 基础上额外进行 LM 适配训练（100K 步 language modeling）的版本",
        "<strong>PromptSource (P3)</strong>：开源提示模板开发环境，为 170+ 数据集编写了 2,073 个提示模板，每个模板将原始样本映射为自然语言输入-输出对",
        "<strong>训练规模</strong>：12 大任务类别、62 个训练数据集，每个数据集最多采样 500K 条，使用所有可用提示模板（平均 8.03 个/数据集）",
        "<strong>三个模型变体</strong>：T0（39 训练集）、T0+（49 训练集，加入 GPT-3 评估集）、T0++（55 训练集，加入 SuperGLUE）",
        "<strong>评估方式</strong>：Rank Classification——对每个候选答案计算对数似然，选最高者，避免了生成式评估的不稳定性",
        "<strong>核心发现</strong>：T0 在 NLI、共指消解、句子补全、词义消歧 4 类 held-out 任务上零样本超越 GPT-3；T0++ 在 BIG-bench 上超越 6 倍大的模型",
        "<strong>消融结论</strong>：增加每个数据集的提示数量可同时提升中位数性能和降低方差；增加训练数据集数量可提升中位数但不一定降低方差",
        "<strong>与 FLAN 对比</strong>：T0 仅 11B 参数，在多数任务上匹配或超越 137B 的 FLAN，体现了 encoder-decoder 架构和多样化提示的优势"
      ],
      "detail": "<h5>核心框架图</h5>\n<p><img alt=\"T0 多任务提示训练总览\" src=\"https://ar5iv.labs.arxiv.org/html/2110.08207/assets/x1.png\" />\n<em>图 1：T0 方法总览。左侧展示了多任务提示训练过程：将多个 NLP 数据集通过提示模板转换为统一的文本到文本格式进行训练。右侧展示了零样本评估：对未见任务使用新的提示模板直接推理。</em></p>\n<p><img alt=\"PromptSource 提示模板示例\" src=\"https://ar5iv.labs.arxiv.org/html/2110.08207/assets/x2.png\" />\n<em>图 2：PromptSource 中的提示模板示例。同一个数据集（如 IMDB）可以有多种不同措辞的提示模板，增加训练多样性。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># T0 多任务提示训练流程\n# 第一阶段：提示模板构建\nfor dataset in all_datasets:  # 62 个训练数据集\n    for template in PromptSource.get_templates(dataset):  # 平均 8.03 个模板/数据集\n        # 每个模板定义: input_template, target_template, answer_choices\n        # 例如 IMDB 情感分类:\n        #   input: &quot;{review}\\nIs this review positive or negative?&quot;\n        #   target: &quot;positive&quot; / &quot;negative&quot;\n        prompted_examples = template.apply(dataset.examples)\n        training_pool.add(prompted_examples)\n\n# 第二阶段：多任务微调\nmodel = load_pretrained(&quot;T5-LM-XL-11B&quot;)  # T5 + 100K步LM适配\nfor step in range(max_steps):\n    batch = sample_batch(training_pool, max_per_dataset=500_000)\n    # 标准 seq2seq 交叉熵损失\n    loss = cross_entropy(model.generate(batch.inputs), batch.targets)\n    optimizer.step(loss)  # Adafactor, lr=1e-3\n\n# 第三阶段：零样本评估 (Rank Classification)\nfor task in held_out_tasks:  # NLI, 共指消解, 句子补全, WSD\n    for example in task.test_set:\n        scores = []\n        for choice in answer_choices:\n            # 计算每个候选答案的对数似然（按 token 长度归一化）\n            score = model.log_likelihood(input=example.prompt, target=choice)\n            score /= len(tokenize(choice))  # 长度归一化\n            scores.append(score)\n        prediction = answer_choices[argmax(scores)]\n</code></pre>\n<h5>方法详解</h5>\n<p><strong>1. 动机与背景</strong></p>\n<p>大规模语言模型（如 GPT-3）展示了通过 in-context learning 实现少样本/零样本泛化的能力，但这种能力高度依赖模型规模——GPT-3 需要 175B 参数。T0 的核心问题是：<strong>能否通过显式的多任务提示训练，让远小于 GPT-3 的模型也获得强大的零样本泛化能力？</strong></p>\n<p>传统多任务学习的局限在于：(1) 不同任务的格式差异大，难以统一；(2) 缺乏足够多样的任务描述方式。T0 通过<strong>自然语言提示模板</strong>同时解决了这两个问题——所有任务统一为 text-to-text 格式，且每个任务有多种不同措辞的提示，迫使模型理解任务语义而非记忆特定格式。</p>\n<p><strong>2. PromptSource 与 P3 数据集</strong></p>\n<p>PromptSource 是本工作的核心基础设施，它是一个基于 Streamlit 的交互式开发环境，允许研究者为 Hugging Face Datasets 中的数据集编写 Jinja2 模板。每个模板包含：</p>\n<ul>\n<li><strong>输入模板</strong>（input template）：将数据集字段映射为自然语言问题</li>\n<li><strong>目标模板</strong>（target template）：定义期望的输出格式</li>\n<li><strong>答案选项</strong>（answer choices）：用于 rank classification 的候选集</li>\n<li><strong>元数据标注</strong>：包括是否为\"原始任务\"提示、指标选择等</li>\n</ul>\n<div class=\"key-point\">💡 <strong>关键创新</strong>：模板的多样性不仅体现在措辞变化，还包括<strong>非原始任务提示</strong>。例如，为情感分类数据集编写\"生成一条具有该情感的评论\"这样的反向提示。实验证明这些非原始任务提示也能提升泛化性能。</div>\n<p>最终的 Public Pool of Prompts (P3) 包含 170+ 数据集的 2,073 个提示模板，其中 T0 训练使用了 62 个数据集对应的子集。</p>\n<p><strong>3. 训练策略与模型选择</strong></p>\n<p>T0 选择 T5+LM 作为基座模型而非纯 decoder 模型，有两个关键原因：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = -\\sum_{t=1}^{T} \\log P_\\theta(y_t | y_{&lt;t}, \\mathbf{x})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{x}</span> 是经提示模板转换后的输入序列，<span class=\"kb-math kb-math-inline\">y</span> 是目标序列。Encoder-decoder 架构允许输入序列通过双向注意力充分编码，而目标序列通过自回归生成——这比纯 decoder 的单向注意力更适合理解复杂的提示指令。</p>\n<p>训练超参数：\n- 序列长度：输入 1024 tokens，目标 256 tokens\n- 优化器：Adafactor，学习率 <span class=\"kb-math kb-math-inline\">1 \\times 10^{-3}</span>\n- 每个数据集最多采样 500K 条（防止大数据集主导训练）\n- 所有数据集混合后统一采样</p>\n<div class=\"warn-box\">⚠️ <strong>重要细节</strong>：T5+LM 并非原始 T5，而是在 T5 的 span corruption 预训练之后，额外进行了 100K 步的标准语言模型训练（LM adaptation）。Lester et al. (2021) 发现这一步对下游 prompt-based 方法至关重要。</div>\n<p><strong>4. 评估方法：Rank Classification</strong></p>\n<p>零样本评估采用 rank classification 而非自由生成：</p>\n<div class=\"kb-math kb-math-display\">\\hat{y} = \\arg\\max_{c \\in \\mathcal{C}} \\frac{1}{|c|} \\sum_{t=1}^{|c|} \\log P_\\theta(c_t | c_{&lt;t}, \\mathbf{x})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{C}</span> 是预定义的候选答案集合，<span class=\"kb-math kb-math-inline\">|c|</span> 是候选答案的 token 长度。长度归一化防止模型偏向短答案。这种方法比自由生成更稳定，且与 GPT-3 的评估方式一致，便于公平比较。</p>\n<p><strong>5. 主要实验结果</strong></p>\n<p><img alt=\"T0 vs GPT-3 主要结果\" src=\"https://ar5iv.labs.arxiv.org/html/2110.08207/assets/x4.png\" />\n<em>图 4：T0 与 GPT-3 在 held-out 任务上的零样本性能对比。每个点代表一个提示模板的性能，箱线图展示了跨模板的分布。</em></p>\n<p>核心发现：\n- <strong>T0 (11B) vs GPT-3 (175B)</strong>：在 9/11 个 held-out 数据集上，T0 的中位数性能匹配或超越 GPT-3，尽管参数量仅为后者的 1/16\n- <strong>T0++ 在 BIG-bench</strong>：在 14 个 BIG-bench 任务中，T0++ 超越了参数量为其 6 倍的语言模型基线\n- <strong>GPT-3 的脆弱性</strong>：在 RTE 上用 10 个不同提示评估 GPT-3，除原始提示外其余 9 个接近随机猜测（中位数 52.96%），而 T0 对提示措辞明显更鲁棒</p>\n<p><strong>6. 消融实验</strong></p>\n<p><img alt=\"提示数量消融\" src=\"https://ar5iv.labs.arxiv.org/html/2110.08207/assets/x6.png\" />\n<em>图 6：增加每个数据集的训练提示数量的效果。更多提示带来更高的中位数性能和更低的四分位距。</em></p>\n<p>两个关键消融维度：\n- <strong>提示数量 <span class=\"kb-math kb-math-inline\">p</span></strong>：从 <span class=\"kb-math kb-math-inline\">p=1</span> 增加到 <span class=\"kb-math kb-math-inline\">p=5.7</span>（平均），8/11 数据集中位数提升，7/11 数据集方差下降。进一步加入非原始任务提示（<span class=\"kb-math kb-math-inline\">p=8.03</span>），9/11 中位数提升，8/11 方差下降\n- <strong>数据集数量 <span class=\"kb-math kb-math-inline\">d</span></strong>：从 39（T0）到 49（T0+）到 55（T0++），中位数持续提升但方差不一定下降</p>\n<p><strong>7. 与 FLAN 的关键差异</strong></p>\n<p>T0 与同期工作 FLAN (Wei et al., 2021) 方法相似但有两个关键区别：\n1. <strong>架构</strong>：T0 使用 encoder-decoder (11B)，FLAN 使用 decoder-only (137B)。T0 以 1/12 的参数量在多数任务上匹配 FLAN\n2. <strong>提示多样性</strong>：T0 的提示在长度和创意上更多样（如 Quora 问题对的管理员角色扮演提示），这可能解释了为何 T0 中增加提示数量有效而 FLAN 中无效</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：FLAN 发现 8B 模型经多任务提示训练后性能反而下降，而 T0 发现 3B 模型就能受益。作者将此归因于 encoder-decoder 架构的 masked language modeling 预训练和更多样化的提示设计。</div>",
      "quiz": {
        "q": "T0 在零样本评估时采用 Rank Classification 而非自由生成的主要原因是什么？",
        "options": [
          "自由生成的计算成本过高",
          "通过对候选答案计算归一化对数似然进行排序，评估更稳定且与 GPT-3 评估方式一致",
          "encoder-decoder 架构不支持自由生成",
          "Rank Classification 可以利用更多的训练数据"
        ],
        "answer": 1,
        "explain": "Rank Classification 通过计算每个预定义候选答案的长度归一化对数似然来选择最佳答案，避免了自由生成中格式不匹配、输出不可控等问题，且与 GPT-3 的评估方式一致，便于公平比较。"
      }
    },
    {
      "id": "instructgpt",
      "num": 3,
      "name": "InstructGPT",
      "fullName": "指令GPT (InstructGPT)",
      "year": "2022.03",
      "org": "OpenAI",
      "parent": "flan",
      "paperUrl": "https://arxiv.org/abs/2203.02155",
      "projectUrl": "",
      "category": "instruction",
      "motivation": "引入RLHF框架对齐人类偏好",
      "summary": "InstructGPT 提出了面向真实用户指令的三阶段 RLHF 训练框架：先用人工示范做监督微调，再用人工偏好训练奖励模型，最后用 PPO 优化策略，从而解决大语言模型“会续写但不一定会按用户意图行动”的对齐问题。",
      "keyPoints": [
        "三阶段流程：Supervised Fine-Tuning (SFT) → Reward Model (RM) → PPO Reinforcement Learning",
        "数据来自标注员编写 prompts、OpenAI API Playground 用户 prompts、人工示范回答与人工排序比较",
        "SFT 阶段把 GPT-3 微调为初始指令跟随策略，是后续 RLHF 的 warm start",
        "RM 阶段输入 prompt-response，输出标量奖励，并通过 pairwise ranking loss 学习人类偏好",
        "PPO 阶段把语言生成视为 bandit 环境，用 RM 分数作为奖励更新策略模型",
        "使用相对 SFT/reference policy 的 KL penalty，抑制策略为了骗过奖励模型而偏离可读语言分布",
        "提出 PPO-ptx：在 PPO 更新中混入预训练语言建模梯度，以降低 public NLP benchmarks 上的 alignment tax",
        "实验显示 1.3B InstructGPT 在人工偏好上可优于 175B GPT-3，说明对齐训练能比单纯扩大规模更直接改善用户体验"
      ],
      "detail": "<p><img alt=\"InstructGPT 三阶段 RLHF 流程图\" src=\"https://ar5iv.labs.arxiv.org/html/2203.02155/assets/x2.png\" />\n<em>图：InstructGPT 方法包含收集示范并训练 SFT、收集多回答排序并训练 RM、再用 PPO 针对 RM 奖励优化策略三个阶段。蓝色箭头表示对应数据用于训练模型。</em></p>\n<p>InstructGPT 的出发点是语言建模目标和用户意图之间存在错位。预训练 GPT-3 优化的是“给定前文预测下一个 token”，它可能生成流畅但不真实、不安全、没有完成任务的文本；而用户希望模型 helpful、honest、harmless。单纯把模型做大不会自动把目标函数从“拟合互联网文本”变成“按照用户指令完成任务”。InstructGPT 因此将目标重新定义为：在真实 prompt 分布上，让输出更符合人工标注者对好回答的偏好。</p>\n<pre><code class=\"language-python\"># InstructGPT / RLHF 训练骨架\nbase = load_pretrained_gpt3()\n\n# Step 1: supervised fine-tuning from demonstrations\nD_sft = collect_labeler_demonstrations(prompts)\npi_sft = finetune_lm(base, D_sft)  # prompt -&gt; labeler-written answer\n\n# Step 2: reward modeling from ranked comparisons\nD_rm = []\nfor prompt in sampled_prompts:\n    candidates = sample_outputs([pi_sft, other_policies], prompt, k=4)\n    ranking = labelers_rank(candidates)\n    D_rm.extend(pairwise_preferences(prompt, ranking))\nreward_model = train_pairwise_rm(D_rm)\n\n# Step 3: PPO policy optimization against the reward model\npi = initialize_from(pi_sft)\nreference = freeze(pi_sft)\nfor batch_prompts in ppo_prompt_stream:\n    responses = pi.generate(batch_prompts, temperature=1.0)\n    rm_reward = reward_model(batch_prompts, responses)\n    kl_penalty = beta * logprob_ratio(pi, reference, batch_prompts, responses)\n    reward = rm_reward - kl_penalty\n    ppo_update(policy=pi, reward=reward, clip_ratio=0.2)\n\n    if use_ptx:\n        lm_update(pi, pretraining_tokens, weight=gamma)\n</code></pre>\n<p>奖励模型训练把人工排序拆成成对偏好。对于同一个 prompt <span class=\"kb-math kb-math-inline\">x</span>，若标注者更偏好回答 <span class=\"kb-math kb-math-inline\">y_w</span> 而不是 <span class=\"kb-math kb-math-inline\">y_l</span>，奖励模型 <span class=\"kb-math kb-math-inline\">r_\\theta(x,y)</span> 应该给 <span class=\"kb-math kb-math-inline\">y_w</span> 更高分。论文使用 logistic pairwise loss：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{RM}}(\\theta)\n= -\\mathbb{E}_{(x,y_w,y_l) \\sim D}\n\\left[\\log \\sigma\\left(r_\\theta(x,y_w)-r_\\theta(x,y_l)\\right)\\right]</div>\n<p>这个损失的直觉很直接：它不要求人类给出绝对分数，只要求比较两个候选谁更好。这样能把主观的“更有帮助、更诚实、更少有害”转化为可学习的相对顺序。论文还提到对同一 prompt 的多个 completion 不应简单打散重复训练，因为比较样本高度相关，奖励模型容易一轮内过拟合；实际训练中使用 6B RM，是因为更大的 175B RM 虽可能验证损失更低，但训练和作为 value function 初始化都更不稳定。</p>\n<p>PPO 阶段不是让模型无限最大化 RM 分数，而是在奖励中加入相对 SFT 策略的 KL 约束。带预训练混合项时，目标可写成：</p>\n<div class=\"kb-math kb-math-display\">\\max_\\phi\\;\\mathbb{E}_{(x,y)\\sim \\pi_\\phi}\n\\left[r_\\theta(x,y) - \\beta \\log \\frac{\\pi_\\phi(y\\mid x)}{\\pi_{\\text{SFT}}(y\\mid x)}\\right]\n+ \\gamma\\,\\mathbb{E}_{x\\sim D_{\\text{pretrain}}}\n\\left[\\log \\pi_\\phi(x)\\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\pi_\\phi</span> 是正在优化的 policy，<span class=\"kb-math kb-math-inline\">\\pi_{\\text{SFT}}</span> 是冻结参考模型，<span class=\"kb-math kb-math-inline\">\\beta</span> 控制偏离参考策略的代价，<span class=\"kb-math kb-math-inline\">\\gamma</span> 控制预训练分布保持项。KL 项解决的是 reward hacking 与分布漂移：如果只看 RM 分数，策略可能生成奖励模型喜欢但人类并不真正喜欢的异常文本；KL penalty 把优化限制在 SFT 模型附近，让回答仍保持自然语言质量和基本能力。</p>\n<div class=\"warn-box\">⚠️ 注意：InstructGPT 中的 RL 环境近似为单步 bandit。prompt 给定后，策略生成完整 response，RM 对整个 response 给一个标量奖励，episode 随即结束；这不同于机器人控制中每步都有外部环境状态转移的经典 RL。</div>\n<p>PPO-ptx 是论文中很重要但常被忽略的工程设计。RLHF 会让模型更符合标注者偏好，但也可能牺牲部分公开 NLP benchmark 能力，这被称为 alignment tax。论文发现，在每个 PPO minibatch 中额外加入来自 GPT-3 预训练语料的语言建模梯度，可以缓解 SQuAD、DROP、HellaSwag、翻译等任务的性能回退，而不显著损害人工偏好得分。换言之，PPO 负责“向人类偏好移动”，预训练梯度负责“不要忘掉通用语言能力”。</p>\n<p>与 FLAN/T0 这类公开任务指令微调相比，InstructGPT 的关键差异在于优化信号来自真实用户分布和人类偏好，而不是传统 NLP 数据集的标准答案。FLAN 教模型理解“任务说明”，InstructGPT 则进一步教模型什么样的回答更被人类认为有用、真实、合适。论文也直接比较了在 API prompt 分布上微调 FLAN/T0 风格数据的模型，发现它们不如 InstructGPT 受标注者偏好，说明 benchmark 指令数据与真实产品 prompt 分布之间存在明显差距。</p>\n<p>这套框架仍然有边界。模型对齐的是特定标注者和研究团队的偏好，而不是抽象的全人类价值；奖励模型可能放大标注规范中的偏差，例如过度奖励 hedging 导致回答不够直接；复杂约束、多语言、代码、错误前提等场景仍会失败。但 InstructGPT 的方法论影响很大：它把“对齐”拆成可执行的数据闭环，即收集示范、收集偏好、训练奖励、受约束地优化策略，成为后续 ChatGPT/RLHF 系列方法的基础模板。</p>",
      "quiz": {
        "q": "InstructGPT 在 PPO 阶段加入相对 SFT/reference policy 的 KL penalty，主要是为了什么？",
        "options": [
          "让奖励模型完全不参与训练，只保留监督微调",
          "限制策略偏离参考模型过远，降低 reward hacking 和语言分布漂移风险",
          "把所有用户 prompt 转换成分类标签",
          "强制模型参数量小于 1.3B"
        ],
        "answer": 1,
        "explain": "PPO 直接最大化 RM 分数可能产生异常但高分的回答；KL penalty 将新策略约束在 SFT/reference policy 附近，使偏好优化更稳定。"
      }
    },
    {
      "id": "self_instruct",
      "num": 4,
      "name": "Self-Instruct",
      "fullName": "自指令 (Self-Instruct)",
      "year": "2022.12",
      "org": "University of Washington",
      "parent": "flan",
      "paperUrl": "https://arxiv.org/abs/2212.10560",
      "projectUrl": "",
      "category": "instruction",
      "motivation": "利用模型自身生成指令数据迭代微调",
      "summary": "Self-Instruct 提出用语言模型自身生成“指令、输入、输出”三元组，再过滤并回灌微调原模型的自举框架，解决人工指令数据昂贵、规模和多样性不足的问题。",
      "keyPoints": [
        "从 175 个人工编写 seed tasks 启动，每个 seed task 包含 1 条指令和 1 个输入输出实例",
        "迭代采样任务池中的示例作为 in-context demonstrations，让 vanilla GPT-3 生成新任务指令",
        "对新指令先判断是否为分类任务，因为分类与非分类任务需要不同的实例生成顺序",
        "非分类任务使用 input-first：先生成输入字段，再生成对应输出",
        "分类任务使用 output-first：先生成候选类别/标签，再按标签条件生成输入，缓解类别分布偏斜",
        "过滤规则包括 ROUGE-L 相似度阈值 0.7、排除图像/图片等 LM 无法处理关键词、去重、移除输入相同但输出冲突的实例、移除过长/过短和输出重复输入的样本",
        "在 GPT-3 案例中生成 52,445 条指令和 82,439 个实例，并用多种 prompt 模板做监督微调",
        "在 Super-NaturalInstructions 上相对 vanilla GPT-3 获得约 33.1% 绝对提升，接近使用私有人工数据训练的 InstructGPT-001"
      ],
      "detail": "<p><img alt=\"Self-Instruct 自举生成流程图\" src=\"https://ar5iv.labs.arxiv.org/html/2212.10560/assets/x2.png\" />\n<em>图：Self-Instruct 从少量 seed tasks 出发，循环执行指令生成、任务类型识别、实例生成和过滤，再把高质量生成任务加入任务池，最终用于微调原语言模型。</em></p>\n<p>Self-Instruct 的核心动机是：指令微调已经被 FLAN、T0、InstructGPT 证明有效，但高质量指令数据本身成为瓶颈。人工编写任务需要创造力和领域知识，公开 instruction datasets 又常偏向传统 NLP benchmark，例如分类、抽取、问答，难以覆盖真实用户会提出的开放任务。Self-Instruct 的假设是，大语言模型虽然还不擅长稳定遵循指令，但已经具备生成多样任务描述和示例的能力；可以先让模型创造监督数据，再用这些数据反过来训练模型遵循指令。</p>\n<pre><code class=\"language-python\"># Self-Instruct 核心伪代码\nseed_tasks = load_175_human_written_tasks()\ntask_pool = list(seed_tasks)\ngenerated_tasks = []\n\nwhile not enough_instruction_data(task_pool):\n    exemplars = sample(seed_tasks, k=6) + sample(generated_tasks, k=2)\n    new_instructions = lm_generate_instructions(exemplars)\n\n    for instruction in new_instructions:\n        if max_rouge_l(instruction, task_pool) &gt;= 0.7:\n            continue\n        if contains_unservable_keywords(instruction, [&quot;image&quot;, &quot;picture&quot;, &quot;graph&quot;]):\n            continue\n\n        is_classification = lm_classify_task_type(instruction)\n\n        if is_classification:\n            labels = lm_generate_labels(instruction)\n            instances = []\n            for label in labels:\n                x = lm_generate_input_conditioned_on_label(instruction, label)\n                instances.append((instruction, x, label))\n        else:\n            x = lm_generate_input(instruction)\n            y = lm_generate_output(instruction, x)\n            instances = [(instruction, x, y)]\n\n        instances = filter_invalid_or_duplicate_instances(instances)\n        if instances:\n            task_pool.append((instruction, instances))\n            generated_tasks.append((instruction, instances))\n\nfinetune_examples = format_with_multiple_templates(task_pool)\nmodel = supervised_finetune(original_lm, finetune_examples)\n</code></pre>\n<p>论文把 instruction data 形式化为一组任务 <span class=\"kb-math kb-math-inline\">T</span>。每个任务由自然语言指令 <span class=\"kb-math kb-math-inline\">I</span> 定义，并带有若干输入输出实例 <span class=\"kb-math kb-math-inline\">(x_j, y_j)</span>。微调时将指令和输入拼成 prompt，让模型生成目标输出：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{SI}}(\\theta)\n= - \\sum_{(I,x,y)\\sim \\mathcal{D}_{\\text{self}}}\n\\log p_\\theta(y \\mid \\text{format}(I,x))</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">\\mathcal{D}_{\\text{self}}</span> 不是人工完整标注数据，而是通过模型自举得到的合成集合。为了提高格式鲁棒性，论文没有固定一种拼接方式，而是随机使用多种模板：可以带或不带 <code>Task:</code>、<code>Input:</code>、<code>Output:</code> 前缀，也可以调整换行数量。这个细节对应真实使用场景：用户不会总按同一种模板下指令，所以训练时也不应把模型绑定到单一格式。</p>\n<p>最有设计感的是实例生成阶段区分分类与非分类任务。对于非分类任务，input-first 很自然：先让模型构造输入，再让模型解这个输入。比如“写一封道歉邮件”可以先生成收件场景，再生成邮件正文。但分类任务若也 input-first，模型容易生成偏向某一标签的输入，例如语法纠错任务总生成正确句子，情感分类任务总生成明显正面文本。output-first 先列出标签，再按每个标签反推输入，使类别覆盖更平衡，也让生成数据对分类边界更有监督价值。</p>\n<div class=\"key-point\">💡 关键：Self-Instruct 不是简单“让模型多生成点文本”，而是把任务创建拆成 instruction generation、task type identification、instance generation、filtering 四个可控阶段，每一阶段都针对合成数据常见失败模式设置约束。</div>\n<p>过滤阶段决定了合成数据能否用于训练。ROUGE-L &lt; 0.7 的阈值用于避免新指令和已有任务过于相似；关键词过滤排除需要视觉、图表等纯文本 LM 无法可靠处理的任务；实例级过滤去掉完全重复样本、同一输入对应多个冲突输出的样本、输出只是重复输入的样本，以及长度异常样本。这些规则看似朴素，但它们把自举过程从“递归污染”拉回到可用范围：即使单条生成不完美，只要整体数据格式正确、任务多样、错误不过度集中，监督微调仍能学到指令遵循模式。</p>\n<p>在 GPT-3 实验中，Self-Instruct 从 175 个 seed tasks 扩展到 52,445 条指令和 82,439 个实例。人工质量检查显示，指令有效率较高，但实例输出完全正确的比例明显低于指令有效率，说明合成数据有噪声。论文的结果有一个重要启示：指令微调并不要求每条数据都像人工标注一样完美；只要数据足够多样，并且大部分样本提供了合理的“指令-输入-输出”结构，模型就能显著提升对新指令的响应能力。</p>\n<p>与传统 self-training 相比，Self-Instruct 的不同之处在于它不是给某个固定任务的无标签样本打伪标签，而是从零生成任务定义本身。它也不同于 FLAN：FLAN 主要重写已有 benchmark，Self-Instruct 让模型创造新任务，因此更可能覆盖用户导向、非标准 NLP 的指令空间。它与 InstructGPT 的关系则是互补的：Self-Instruct 降低了获取大规模指令监督的成本，而 InstructGPT 通过人类偏好进一步优化回答质量；论文也指出后续可以用更强模型或人工/RM 对 Self-Instruct 输出做质量提升。</p>\n<p>Self-Instruct 的主要风险是自举偏差。生成任务来自模型自身，因此会继承模型的知识盲区、格式偏好和安全问题；过滤规则多为启发式，难以保证 factual correctness；如果迭代过深且缺少外部质量信号，任务池可能逐渐被低质量模式污染。尽管如此，它给后续 Alpaca、synthetic instruction tuning 等工作提供了清晰范式：少量人工种子 + 大模型生成 + 自动过滤 + SFT，可以快速构造可用的指令跟随数据。</p>",
      "quiz": {
        "q": "Self-Instruct 为什么对分类任务采用 output-first 实例生成？",
        "options": [
          "为了先生成标签，再按标签生成输入，从而减少类别分布偏斜",
          "为了完全跳过输入生成，只训练模型输出空字符串",
          "为了让 ROUGE-L 分数必然大于 0.7",
          "为了把所有非分类任务都转换成图像识别任务"
        ],
        "answer": 0,
        "explain": "分类任务若先生成输入，模型容易偏向某个常见标签；output-first 先枚举类别并按类别构造输入，有助于形成更均衡的监督样本。"
      }
    },
    {
      "id": "alpaca",
      "num": 5,
      "name": "Alpaca",
      "fullName": "羊驼 (Alpaca)",
      "year": "2023.03",
      "org": "Stanford University",
      "parent": "self_instruct",
      "paperUrl": "https://github.com/tatsu-lab/stanford_alpaca",
      "projectUrl": "",
      "category": "instruction",
      "motivation": "低成本(<$600)训练高性能指令模型",
      "summary": "Alpaca 基于 Meta 的 LLaMA 7B 模型，利用改进的 Self-Instruct 方法从 OpenAI text-davinci-003 自动生成 52K 条指令跟随数据进行监督微调（SFT），以不到 600 美元的总成本（数据生成 <\\$500 + 训练 <\\$100）训练出在指令跟随能力上与 text-davinci-003 表现相当的开源模型，开创了\"用强模型蒸馏弱模型\"的低成本指令微调范式。",
      "keyPoints": [
        "<strong>基座模型</strong>：基于 Meta LLaMA 7B 进行全参数监督微调（SFT），不涉及 RLHF",
        "<strong>数据生成</strong>：改进 Self-Instruct 流程，使用 text-davinci-003 从 175 条人工种子指令扩展生成 52K 条指令-输出对",
        "<strong>极低成本</strong>：数据生成 &lt;\\$500（OpenAI API 调用），模型训练 &lt;\\$100（4×A100 训练 3 小时），总计 &lt;\\$600",
        "<strong>Self-Instruct 关键改进</strong>：(1) 教师模型从 davinci 升级为 text-davinci-003；(2) 批量解码一次生成 20 条指令；(3) 去除分类/非分类任务区分；(4) 每条指令仅生成单个输出实例",
        "<strong>数据格式</strong>：三元组结构 <code>{instruction, input, output}</code>，约 40% 样本包含额外 input 上下文",
        "<strong>训练配置</strong>：HuggingFace Transformers + FSDP，LR=2e-5，epochs=3，batch_size=128，max_length=512",
        "<strong>评估结果</strong>：在 Self-Instruct 评估集上，Alpaca 7B 以 90:89 的胜率与 text-davinci-003 持平",
        "<strong>开源贡献</strong>：发布了完整的数据生成代码、52K 训练数据、微调代码和模型权重（以 LLaMA 差分形式）"
      ],
      "detail": "<p><img alt=\"Alpaca 训练流程图\" src=\"https://crfm.stanford.edu/static/img/posts/2023-03-13-alpaca/alpaca_main.jpg\" />\n<em>图：Alpaca 训练流程总览——从 175 条种子指令出发，通过 text-davinci-003 生成 52K 指令数据，再微调 LLaMA 7B 得到 Alpaca 模型。总成本不到 600 美元。</em></p>\n<p><img alt=\"指令数据动词-宾语分布\" src=\"https://raw.githubusercontent.com/tatsu-lab/stanford_alpaca/main/assets/parse_analysis.png\" />\n<em>图：52K 指令数据的动词-宾语分布（内圈为根动词，外圈为直接宾语），展示了 Alpaca 训练数据覆盖了极为多样的任务类型。</em></p>\n<pre><code class=\"language-python\"># Alpaca 数据生成与训练流程伪代码\n\n# ===== 阶段一：改进的 Self-Instruct 数据生成 =====\nseed_instructions = load(&quot;seed_tasks.jsonl&quot;)  # 175 条人工编写的种子指令\n\ngenerated_data = []\nwhile len(generated_data) &lt; 52000:\n    # 从种子池 + 已生成数据中采样 in-context examples\n    examples = sample(seed_instructions + generated_data, k=3)\n\n    # 关键改进：批量生成，一次请求生成 20 条新指令（大幅降低 API 成本）\n    prompt = format_prompt(examples, num_to_generate=20)\n    new_instructions = text_davinci_003(prompt, temperature=1.0, top_p=1.0)\n\n    # 过滤：ROUGE-L 相似度 &gt; 0.7 的重复指令被丢弃\n    for inst in new_instructions:\n        if rouge_l(inst, existing_instructions) &lt; 0.7:\n            # 每条指令仅生成单个输出（简化自 Self-Instruct 的多实例）\n            output = text_davinci_003(format_output_prompt(inst))\n            generated_data.append({\n                &quot;instruction&quot;: inst.instruction,\n                &quot;input&quot;: inst.input,       # 约 40% 非空\n                &quot;output&quot;: output\n            })\n\nsave(&quot;alpaca_data.json&quot;, generated_data)  # 最终 52,002 条\n\n# ===== 阶段二：监督微调 LLaMA 7B =====\nmodel = LLaMA_7B()\ndata = load(&quot;alpaca_data.json&quot;)\n\n# 两种 prompt 模板（根据是否有 input 字段选择）\nPROMPT_WITH_INPUT = &quot;&quot;&quot;Below is an instruction that describes a task, \\\npaired with an input that provides further context. \\\nWrite a response that appropriately completes the request.\n\n### Instruction:\n{instruction}\n\n### Input:\n{input}\n\n### Response:&quot;&quot;&quot;\n\nPROMPT_WITHOUT_INPUT = &quot;&quot;&quot;Below is an instruction that describes a task. \\\nWrite a response that appropriately completes the request.\n\n### Instruction:\n{instruction}\n\n### Response:&quot;&quot;&quot;\n\n# HuggingFace + FSDP 分布式训练\ntrain(model, data,\n      lr=2e-5, epochs=3, batch_size=128,\n      max_length=512, warmup_ratio=0.03,\n      lr_scheduler=&quot;cosine&quot;, weight_decay=0,\n      fsdp=&quot;full_shard auto_wrap&quot;,\n      gradient_accumulation_steps=8)  # 4×A100, 每卡 batch=4\n# 训练耗时约 3 小时\n</code></pre>\n<h5>动机与背景</h5>\n<p>2023 年初，以 ChatGPT 和 text-davinci-003 为代表的指令跟随模型展现了强大的能力，但学术界面临两大困境：</p>\n<ol>\n<li><strong>模型不可及</strong>：OpenAI、Anthropic 等公司的指令模型均为闭源，学术研究者无法深入研究其内部机制、安全性和偏见问题。即使 Meta 发布了 LLaMA 基座模型，但缺乏高质量指令数据和微调方案使其无法直接用于指令跟随任务。</li>\n<li><strong>成本高昂</strong>：训练一个具备类似能力的模型通常需要大量人工标注数据（如 InstructGPT 使用了数万条人工标注）和大规模计算资源，这对大多数学术实验室来说是不可承受的。</li>\n</ol>\n<p>Alpaca 的核心洞察在于：<strong>结合开源基座模型（LLaMA）和自动化数据生成（改进的 Self-Instruct），可以极低成本复现商业级指令模型的核心能力</strong>。这一思路直接催生了后续大量开源指令模型的涌现。</p>\n<h5>核心机制：改进的 Self-Instruct 数据生成</h5>\n<p>Alpaca 对原始 Self-Instruct（Wang et al., 2022）方法进行了四项关键改进：</p>\n<p><strong>1. 更强的教师模型</strong></p>\n<p>原始 Self-Instruct 使用 <code>davinci</code>（GPT-3 175B 基础版本）生成指令和输出，而 Alpaca 升级为 <code>text-davinci-003</code>（经过 RLHF 对齐的 InstructGPT）。text-davinci-003 生成的指令更加多样、输出更加准确和自然，这是数据质量提升的最关键因素。</p>\n<p><strong>2. 激进的批量解码</strong></p>\n<p>原始 Self-Instruct 每次 API 调用仅生成少量指令，而 Alpaca 将批量大小提升至<strong>一次生成 20 条指令</strong>。这一改进将数据生成成本从原始方法的数千美元降低至不到 500 美元，同时由于 text-davinci-003 的强大能力，数据多样性并未受到明显影响。</p>\n<p><strong>3. 流程简化</strong></p>\n<ul>\n<li>去除了分类任务与非分类任务的区分，统一处理所有指令类型</li>\n<li>每条指令仅生成 1 个输出实例（而非原始的 2-3 个），进一步降低成本</li>\n<li>重新设计了 prompt 模板（<code>prompt.txt</code>），更明确地指导 text-davinci-003 生成高质量指令</li>\n</ul>\n<p><strong>4. 数据格式设计</strong></p>\n<p>每条数据包含三个字段：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>字段</th>\n<th>说明</th>\n<th>示例</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>instruction</code></td>\n<td>任务描述（52K 条各不相同）</td>\n<td>\"Summarize the following article\"</td>\n</tr>\n<tr>\n<td><code>input</code></td>\n<td>可选的任务上下文（约 40% 非空）</td>\n<td>[一段文章内容]</td>\n</tr>\n<tr>\n<td><code>output</code></td>\n<td>text-davinci-003 生成的回答</td>\n<td>[摘要内容]</td>\n</tr>\n</tbody>\n</table></div>\n<p>这种设计使模型能够处理纯指令（如\"写一首诗\"）和带上下文的指令（如\"总结以下文章\"）两种场景。</p>\n<h5>训练细节</h5>\n<p>Alpaca 的训练采用标准的监督微调（SFT）范式，关键配置如下：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>超参数</th>\n<th>LLaMA-7B</th>\n<th>LLaMA-13B</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Batch size</td>\n<td>128</td>\n<td>128</td>\n</tr>\n<tr>\n<td>Learning rate</td>\n<td>2e-5</td>\n<td>1e-5</td>\n</tr>\n<tr>\n<td>Epochs</td>\n<td>3</td>\n<td>5</td>\n</tr>\n<tr>\n<td>Max length</td>\n<td>512</td>\n<td>512</td>\n</tr>\n<tr>\n<td>Weight decay</td>\n<td>0</td>\n<td>0</td>\n</tr>\n<tr>\n<td>Warmup ratio</td>\n<td>0.03</td>\n<td>0.03</td>\n</tr>\n<tr>\n<td>LR scheduler</td>\n<td>cosine</td>\n<td>cosine</td>\n</tr>\n</tbody>\n</table></div>\n<p>训练使用了 <strong>FSDP（Fully Sharded Data Parallel）</strong> 进行分布式训练，在 4 张 A100 80GB GPU 上通过梯度累积（<code>gradient_accumulation_steps=8</code>，每卡 batch=4）实现等效 batch size 128。整个训练过程仅需约 3 小时。</p>\n<div class=\"key-point\">💡 <strong>Prompt 模板设计</strong>：Alpaca 使用了两种 prompt 模板——一种用于有 <code>input</code> 的样本（约 40%），另一种用于无 <code>input</code> 的样本（约 60%）。这种区分使模型在训练时能学会处理两种不同的指令格式。推理时，用户可根据任务类型选择合适的模板。</div>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>InstructGPT / ChatGPT</th>\n<th>Self-Instruct (原始)</th>\n<th><strong>Alpaca</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>数据来源</td>\n<td>人工标注（数万条）</td>\n<td>davinci 自动生成（~52K）</td>\n<td><strong>text-davinci-003 自动生成（52K）</strong></td>\n</tr>\n<tr>\n<td>数据成本</td>\n<td>极高（人工标注）</td>\n<td>~数千美元</td>\n<td><strong>&lt;\\$500</strong></td>\n</tr>\n<tr>\n<td>训练方法</td>\n<td>SFT + RLHF</td>\n<td>SFT（GPT-3 175B）</td>\n<td><strong>SFT（LLaMA 7B）</strong></td>\n</tr>\n<tr>\n<td>基座模型</td>\n<td>GPT-3 175B（闭源）</td>\n<td>GPT-3 175B（闭源）</td>\n<td><strong>LLaMA 7B（开源）</strong></td>\n</tr>\n<tr>\n<td>训练成本</td>\n<td>极高</td>\n<td>极高</td>\n<td><strong>&lt;\\$100</strong></td>\n</tr>\n<tr>\n<td>开源程度</td>\n<td>完全闭源</td>\n<td>部分开源（数据+代码）</td>\n<td><strong>完全开源（数据+代码+权重差分）</strong></td>\n</tr>\n</tbody>\n</table></div>\n<h5>评估与局限性</h5>\n<p>在 Self-Instruct 评估集（252 条指令）上的盲评中，5 位作者对 Alpaca 7B 与 text-davinci-003 的输出进行成对比较，结果为 <strong>90:89</strong>（Alpaca 胜 90 次，text-davinci-003 胜 89 次），两者基本持平。这一结果令人惊讶，因为 Alpaca 仅有 7B 参数且未经 RLHF。</p>\n<p>然而，作者明确指出 Alpaca 存在以下重要局限：</p>\n<ul>\n<li><strong>幻觉（Hallucination）</strong>：Alpaca 的幻觉问题比 text-davinci-003 更为严重，会自信地编造不存在的事实</li>\n<li><strong>毒性（Toxicity）</strong>：模型可能生成有害、有偏见的内容</li>\n<li><strong>刻板印象（Stereotypes）</strong>：模型可能强化社会刻板印象</li>\n<li><strong>评估局限</strong>：Self-Instruct 评估集规模小（252 条）且不够多样，无法全面反映模型能力</li>\n</ul>\n<div class=\"warn-box\">⚠️ <strong>重要提醒</strong>：Alpaca 仅使用了 SFT 而未进行 RLHF 或安全对齐，因此<strong>不适合直接部署到生产环境</strong>。作者发布 Alpaca 的目的是推动学术研究，而非提供可商用的产品。</div>\n<h5>历史影响</h5>\n<p>Alpaca 的发布（2023 年 3 月 13 日）是开源 LLM 社区的里程碑事件，其核心贡献在于：</p>\n<ol>\n<li><strong>证明了可行性</strong>：首次公开证明\"小模型 + 少量高质量指令数据 = 接近商业模型表现\"</li>\n<li><strong>降低了门槛</strong>：将指令微调的成本从数万美元降至数百美元，使几乎所有研究者都能参与</li>\n<li><strong>催生了生态</strong>：直接启发了 Vicuna、Koala、Dolly、WizardLM、Baize 等大量后续工作，形成了\"用强模型蒸馏弱模型\"的研究范式</li>\n<li><strong>推动了数据开源</strong>：52K 训练数据的开源使社区能够研究指令数据的质量、多样性和偏见问题</li>\n</ol>",
      "quiz": {
        "q": "Alpaca 相比原始 Self-Instruct 方法的关键改进是什么？",
        "options": [
          "使用 RLHF 替代 SFT 进行训练",
          "将教师模型从 davinci 升级为 text-davinci-003，并采用批量解码降低成本",
          "使用人工标注数据替代自动生成数据",
          "将基座模型从 7B 扩展到 175B 参数"
        ],
        "answer": 1,
        "explain": "Alpaca 的核心改进在于使用经过 RLHF 对齐的 text-davinci-003 替代基础 davinci 模型生成数据（提升数据质量），并通过一次生成 20 条指令的批量解码策略将数据生成成本从数千美元降至不到 500 美元。Alpaca 仍使用 SFT 训练，未使用 RLHF。"
      }
    },
    {
      "id": "adapter",
      "num": 6,
      "name": "Adapter",
      "fullName": "适配器 (Adapter)",
      "year": "2019.06",
      "org": "Google Research",
      "parent": "—",
      "paperUrl": "http://proceedings.mlr.press/v97/houlsby19a.html",
      "projectUrl": "",
      "category": "peft",
      "motivation": "插入瓶颈层实现模块化迁移学习",
      "summary": "Adapter 在冻结预训练 Transformer 主干的前提下，为每个下游任务插入小型瓶颈模块，解决了多任务/多客户场景中“每个任务都保存一整份微调模型”的参数浪费问题。",
      "keyPoints": [
        "在每个 Transformer 层中插入两个 Adapter：一个位于多头注意力投影之后，一个位于前馈网络投影之后。",
        "Adapter 使用瓶颈结构：先将隐藏维度从 <span class=\"kb-math kb-math-inline\">d</span> 降到 <span class=\"kb-math kb-math-inline\">m</span>，经过非线性激活后再升回 <span class=\"kb-math kb-math-inline\">d</span>。",
        "原始预训练网络参数保持冻结；每个任务只训练 Adapter、LayerNorm 参数和最终分类头。",
        "Adapter 内部带残差连接，并采用近似恒等初始化，使新模块在训练初期尽量不破坏预训练表示。",
        "每个 Adapter 的参数量为 <span class=\"kb-math kb-math-inline\">2md+d+m</span>，通过设置 <span class=\"kb-math kb-math-inline\">m \\ll d</span> 将每任务新增参数控制在很小范围。",
        "论文在 BERT 上验证了 26 个文本任务；在 GLUE 上接近全量微调性能，仅增加约 3.6% 每任务参数，而全量微调需要训练 100% 参数。"
      ],
      "detail": "<p><img alt=\"Adapter 在 Transformer 中的插入位置\" src=\"https://ar5iv.labs.arxiv.org/html/1902.00751/assets/x2.png\" />\n<img alt=\"Adapter 瓶颈模块结构\" src=\"https://ar5iv.labs.arxiv.org/html/1902.00751/assets/x3.png\" />\n<em>图：论文 Figure 2 的两个面板。左图展示 Adapter 被插入到 Transformer 子层之后；右图展示降维、非线性、升维和内部残差组成的瓶颈模块。</em></p>\n<p>Adapter 的核心动机是把“任务特定能力”和“通用预训练能力”分离。标准 fine-tuning 会为每个任务复制并更新整个 BERT，这在任务数量增加时线性增加存储和部署成本；Adapter 则把 BERT 主干当成共享基础设施，只为每个任务追加一组小模块。这样新增任务不需要重新访问旧任务数据，也不会覆盖旧任务参数，适合云服务、多租户或持续加入任务的场景。</p>\n<p>在 Transformer 层内，论文不是只在顶层加一个小头，而是让任务特定参数能够影响每一层的中间激活。设某个子层输出为 <span class=\"kb-math kb-math-inline\">s</span>，Adapter 近似可写成：</p>\n<div class=\"kb-math kb-math-display\">A(s)=s+W_{\\text{up}} f(W_{\\text{down}}s+b_{\\text{down}})+b_{\\text{up}},</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">W_{\\text{down}}\\in\\mathbb{R}^{m\\times d}</span>，<span class=\"kb-math kb-math-inline\">W_{\\text{up}}\\in\\mathbb{R}^{d\\times m}</span>，<span class=\"kb-math kb-math-inline\">m</span> 是瓶颈维度。内部残差项 <span class=\"kb-math kb-math-inline\">s+\\cdots</span> 很关键：如果升维/降维投影初始化接近零，Adapter 初始时接近恒等函数，原始 BERT 的表示分布不会被突然扰动，训练更稳定。</p>\n<p>在论文采用的集成方式中，Adapter 放在每个子层投影之后、加外部 residual 和 LayerNorm 之前。用简化符号表示，一个 Transformer block 可以写成：</p>\n<div class=\"kb-math kb-math-display\">u = \\mathrm{LayerNorm}(h + A_{\\text{attn}}(\\mathrm{MHA}(h))),</div>\n<div class=\"kb-math kb-math-display\">h&#x27; = \\mathrm{LayerNorm}(u + A_{\\text{ffn}}(\\mathrm{FFN}(u))).</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">\\mathrm{MHA}</span>、<span class=\"kb-math kb-math-inline\">\\mathrm{FFN}</span> 和主干中的大部分权重被冻结，只有 <span class=\"kb-math kb-math-inline\">A_{\\text{attn}}</span>、<span class=\"kb-math kb-math-inline\">A_{\\text{ffn}}</span>、LayerNorm 的缩放/偏置以及任务头被更新。LayerNorm 参数单独训练虽然也很省参数，但论文发现仅调 LayerNorm 表达能力不足；Adapter 提供了更强的任务特定非线性变换。</p>\n<p>参数效率来自瓶颈层。一个 Adapter 的参数量包括降维矩阵、升维矩阵和两个 bias：</p>\n<div class=\"kb-math kb-math-display\">\\#\\theta_{\\text{adapter}} = md + dm + m + d = 2md + d + m.</div>\n<p>当 <span class=\"kb-math kb-math-inline\">m\\ll d</span> 时，新增参数相对原始 Transformer 的注意力和前馈层很小。论文将 Adapter size 作为主要超参，使用约 0.5% 到 8% 的原模型参数即可覆盖性能/存储折中。直觉上，较小的 <span class=\"kb-math kb-math-inline\">m</span> 相当于限制任务更新只能经过低秩瓶颈，避免为每个任务重写完整表示空间。</p>\n<p>训练流程可以概括为：冻结预训练 BERT，随机初始化每个任务的 Adapter 和头部，随后只在这些任务参数上反向传播。伪代码如下：</p>\n<pre><code class=\"language-python\"># Adapter tuning for one downstream task\nbert = load_pretrained_bert()\nfreeze(bert.backbone_weights)\n\nfor layer in bert.transformer_layers:\n    layer.attn_adapter = BottleneckAdapter(d_hidden=d, bottleneck=m)\n    layer.ffn_adapter = BottleneckAdapter(d_hidden=d, bottleneck=m)\n    layer.layer_norm_params.requires_grad = True\n\nclassifier = TaskHead(d, num_labels)\ntrainable = adapters + layer_norm_params + classifier.parameters()\n\nfor batch in downstream_data:\n    h = bert.embeddings(batch.input_ids)\n    for layer in bert.transformer_layers:\n        attn_out = layer.self_attention(h)          # frozen weights\n        h = layer.norm1(h + layer.attn_adapter(attn_out))\n        ffn_out = layer.feed_forward(h)             # frozen weights\n        h = layer.norm2(h + layer.ffn_adapter(ffn_out))\n    logits = classifier(h[:, 0])\n    loss = cross_entropy(logits, batch.labels)\n    update(trainable, loss)\n</code></pre>\n<p>与传统 fine-tuning 相比，Adapter 的行为更像“给冻结网络增加可插拔的任务补丁”。全量微调直接改动原模型参数，任务之间互不兼容；Adapter 保留共享主干，同一输入可以通过不同任务 Adapter 得到不同决策。与只微调顶层相比，Adapter 的优势是它分布在所有层，能逐层调整表示，但每次调整又受瓶颈限制，不会像全量微调那样产生大规模任务副本。</p>\n<div class=\"key-point\">💡 关键：Adapter 不是简单地“少训练一些层”，而是把任务更新重新参数化为许多小型残差瓶颈模块；它用结构约束换取参数效率和模块化部署能力。</div>",
      "quiz": {
        "q": "Adapter 采用瓶颈结构的主要目的是什么？",
        "options": [
          "让每个任务只新增少量可训练参数，同时仍能在各层调整表示",
          "让模型在推理时跳过 Transformer 的注意力计算",
          "将 BERT 的词表替换为任务专用词表",
          "避免使用 LayerNorm，因为 LayerNorm 会破坏迁移学习"
        ],
        "answer": 0,
        "explain": "瓶颈维度 m 远小于隐藏维度 d，使每层 Adapter 的参数量约为 2md+d+m；它保留逐层调节能力，但避免为每个任务复制完整模型。"
      }
    },
    {
      "id": "prefix_tuning",
      "num": 7,
      "name": "Prefix-Tuning",
      "fullName": "前缀调优 (Prefix-Tuning)",
      "year": "2021.05",
      "org": "Stanford University",
      "parent": "adapter",
      "paperUrl": "https://arxiv.org/abs/2101.00190",
      "projectUrl": "",
      "category": "peft",
      "motivation": "优化连续前缀向量引导生成",
      "summary": "Prefix-Tuning 冻结预训练语言模型，只学习一段连续的任务前缀向量，让后续 token 像关注“虚拟 token”一样关注该前缀，从而以极少参数完成生成任务适配。",
      "keyPoints": [
        "将任务特定信息表示为连续 prefix，而不是离散人工 prompt 或完整模型权重更新。",
        "冻结 GPT-2/BART 等预训练模型参数 <span class=\"kb-math kb-math-inline\">\\phi</span>，只优化前缀矩阵 <span class=\"kb-math kb-math-inline\">P_\\theta</span>。",
        "对自回归 LM，prefix 被放在输入序列之前；对 encoder-decoder 模型，prefix 可分别作用于 encoder 和 decoder。",
        "prefix 不是普通词嵌入，而是每层 Transformer 可访问的激活/键值式连续参数，后续 token 可通过注意力读取它。",
        "训练时使用 MLP 对前缀重参数化以稳定优化，训练结束后丢弃 MLP，只保存最终 prefix。",
        "在表格到文本和摘要任务上，约 0.1% 参数即可接近全量微调；低数据和外推场景中通常优于 fine-tuning。"
      ],
      "detail": "<p><img alt=\"Prefix-Tuning 与 Fine-Tuning 对比\" src=\"https://ar5iv.labs.arxiv.org/html/2101.00190/assets/x1.png\" />\n<img alt=\"Prefix-Tuning 在自回归和编码器-解码器模型中的示意\" src=\"https://ar5iv.labs.arxiv.org/html/2101.00190/assets/x2.png\" />\n<em>图：论文 Figure 1 展示 fine-tuning 需要为每个任务保存整份模型，而 prefix-tuning 只保存任务 prefix；Figure 2 展示 prefix 激活如何接入自回归 LM 和 encoder-decoder 架构。</em></p>\n<p>Prefix-Tuning 的出发点是：生成式模型已经在预训练中学到丰富语言能力，下游任务并不一定需要修改所有权重；真正需要的是一个能“引导”模型行为的任务条件。离散 prompt 可以做到这一点，但人工设计不稳定、表达能力受词表限制；Prefix-Tuning 把 prompt 放到连续空间中学习，使它既像 prompt 一样作为条件，又能通过梯度吸收完整训练集信号。</p>\n<p>设输入为 <span class=\"kb-math kb-math-inline\">x</span>，输出序列为 <span class=\"kb-math kb-math-inline\">y</span>，预训练模型参数为 <span class=\"kb-math kb-math-inline\">\\phi</span>。标准 fine-tuning 优化 <span class=\"kb-math kb-math-inline\">\\phi</span>，而 Prefix-Tuning 固定 <span class=\"kb-math kb-math-inline\">\\phi</span>，只优化 <span class=\"kb-math kb-math-inline\">\\theta</span>：</p>\n<div class=\"kb-math kb-math-display\">\\theta^* = \\arg\\max_\\theta \\sum_{(x,y)} \\log p_\\phi(y \\mid x; P_\\theta).</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">P_\\theta</span> 是任务前缀，不对应真实词表 token。它的作用不是直接输出答案，而是改变后续 token 的注意力上下文：后续位置在计算 hidden state 时能 attend 到 prefix，就像序列前面真的存在一串“虚拟示例/指令”。</p>\n<p>论文给出的形式化递推可以简化为：</p>\n<div class=\"kb-math kb-math-display\">h_i =\n\\begin{cases}\nP_\\theta[i,:], &amp; i \\in \\mathsf{P}_{\\text{idx}}, \\\\\n\\mathrm{LM}_\\phi(z_i, h_{&lt;i}), &amp; \\text{otherwise}.\n\\end{cases}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathsf{P}_{\\text{idx}}</span> 表示 prefix 的位置集合，<span class=\"kb-math kb-math-inline\">z</span> 是由 prefix、输入和输出拼接而成的序列。对于自回归模型，可理解为 <span class=\"kb-math kb-math-inline\">z=[\\textsc{Prefix};x;y]</span>；对于 encoder-decoder 模型，论文使用类似 <span class=\"kb-math kb-math-inline\">z=[\\textsc{Prefix};x;\\textsc{Prefix}^{\\prime};y]</span> 的形式，使 encoder 侧和 decoder 侧都获得任务条件。</p>\n<p>直接优化完整 <span class=\"kb-math kb-math-inline\">P_\\theta</span> 在实验中对学习率和初始化敏感，因此论文使用重参数化：</p>\n<div class=\"kb-math kb-math-display\">P_\\theta[i,:] = \\mathrm{MLP}_\\theta(P&#x27;_\\theta[i,:]).</div>\n<p>训练时优化较小的 <span class=\"kb-math kb-math-inline\">P&#x27;_\\theta</span> 和 MLP 参数，通过 MLP 映射到实际 prefix 激活维度；训练完成后，只保存展开后的 <span class=\"kb-math kb-math-inline\">P_\\theta</span>，丢弃 MLP。这个设计的直觉类似用一个平滑的生成器约束 prefix 空间，避免早期随机 prefix 直接扰乱深层注意力状态。</p>\n<p>核心训练伪代码如下：</p>\n<pre><code class=\"language-python\"># Prefix-Tuning for conditional generation\nlm = load_pretrained_lm()        # GPT-2 for table-to-text, BART for summarization\nfreeze(lm.parameters())\n\nP_prime = init_prefix(length=L, dim=k)\nmlp = PrefixMLP(input_dim=k, output_dim=lm_hidden_or_kv_dim)\n\nfor batch in train_data:\n    P = mlp(P_prime)             # produce prefix activations for all layers/positions\n    loss = 0.0\n    for x, y in batch:\n        states = inject_prefix(lm, x, P)\n        loss += negative_log_likelihood(lm, y, states)\n    update([P_prime, mlp.parameters()], loss)\n\nP_final = mlp(P_prime)\nsave(P_final)                   # discard reparameterization MLP for inference\n</code></pre>\n<p>与 Adapter 相比，Prefix-Tuning 更少触碰模型内部结构。Adapter 在每层插入新的残差模块，直接改变激活；Prefix-Tuning 保持 Transformer 层不变，只在注意力上下文中提供可学习前缀，让原模型利用已有注意力机制自行传播任务信息。因此它通常比 Adapter 更省参数，也更容易为不同用户或任务并行切换：同一个冻结 LM 加载不同 prefix 即可服务不同任务。</p>\n<p>与全量 fine-tuning 相比，Prefix-Tuning 的归纳偏置更强。它不能任意改写模型权重，只能通过前缀调节生成轨迹，这限制了过拟合，也解释了论文中低数据和未见主题外推表现较好的现象。代价是 prefix 的位置、长度、初始化和重参数化会影响效果；如果任务需要深度改变模型知识或输出空间，单纯 prefix 可能不如全量微调灵活。</p>\n<div class=\"key-point\">💡 关键：Prefix-Tuning 学的不是自然语言提示词，而是一组可被 Transformer 注意力读取的连续控制向量；它把“任务适配”转化为“学习如何条件化冻结语言模型”。</div>",
      "quiz": {
        "q": "Prefix-Tuning 训练完成后通常只需要保存什么？",
        "options": [
          "完整微调后的语言模型参数",
          "最终 prefix 参数 P_theta，而不是训练时使用的重参数化 MLP",
          "人工编写的离散 prompt 文本",
          "每个训练样本对应的一套独立 prefix"
        ],
        "answer": 1,
        "explain": "论文使用 MLP 重参数化来稳定训练，但推理时只保留生成后的 prefix；预训练 LM 参数始终冻结并在任务间共享。"
      }
    },
    {
      "id": "prompt_tuning",
      "num": 8,
      "name": "Prompt Tuning",
      "fullName": "提示调优 (Prompt Tuning)",
      "year": "2021.09",
      "org": "Google Research",
      "parent": "prefix_tuning",
      "paperUrl": "https://aclanthology.org/2021.emnlp-main.243/",
      "projectUrl": "",
      "category": "peft",
      "motivation": "仅调优输入向量匹配全量微调性能",
      "summary": "Prompt Tuning 将下游任务适配简化为只学习输入端的软提示向量，在冻结 T5 主模型的情况下，通过模型规模提升逐渐逼近全量模型微调性能。",
      "keyPoints": [
        "冻结整个预训练 T5，只在输入前拼接 <span class=\"kb-math kb-math-inline\">k</span> 个可训练 soft prompt token。",
        "soft prompt 不是离散词 ID，而是独立的连续嵌入参数 <span class=\"kb-math kb-math-inline\">\\theta_P</span>，可通过反向传播学习。",
        "所有任务按照 T5 的 text-to-text 框架处理，分类标签也被建模为要生成的文本序列 <span class=\"kb-math kb-math-inline\">Y</span>。",
        "条件概率从 <span class=\"kb-math kb-math-inline\">\\Pr_\\theta(Y|X)</span> 变为 <span class=\"kb-math kb-math-inline\">\\Pr_{\\theta;\\theta_P}(Y|[P;X])</span>，但 <span class=\"kb-math kb-math-inline\">\\theta</span> 保持冻结。",
        "相比 Prefix-Tuning，不在每层维护 prefix 激活，也不需要任务专用输出层，参数量更低。",
        "论文显示 Prompt Tuning 随模型规模变强；在十亿级以上 T5 上缩小与 model tuning 的差距，并支持 prompt ensembling 与更好的域外鲁棒性。"
      ],
      "detail": "<p><img alt=\"Prompt Tuning 随模型规模逼近 Model Tuning\" src=\"https://ar5iv.labs.arxiv.org/html/2104.08691/assets/x1.png\" />\n<img alt=\"Prompt Tuning 与 Model Tuning 的服务方式对比\" src=\"https://ar5iv.labs.arxiv.org/html/2104.08691/assets/x2.png\" />\n<em>图：论文 Figure 1 展示 prompt tuning 在大模型上接近 model tuning；Figure 2 展示 prompt tuning 只需为每个任务保存小型 prompt，可复用同一个冻结 T5。</em></p>\n<p>Prompt Tuning 的关键判断是：当语言模型足够大时，模型内部已经具备完成任务所需的大部分能力，下游训练更像是在寻找一个合适的条件入口，而不是重写模型参数。人工 prompt design 依赖离散词和人工试错，few-shot prompt 又受上下文长度限制；Prompt Tuning 让 prompt 变成可学习嵌入，既保留冻结模型的部署优势，又能利用完整标注数据学习任务条件。</p>\n<p>在 T5 的 text-to-text 框架下，输入是一串 token <span class=\"kb-math kb-math-inline\">X</span>，输出标签或答案被表示为 token 序列 <span class=\"kb-math kb-math-inline\">Y</span>。没有 soft prompt 时，模型计算：</p>\n<div class=\"kb-math kb-math-display\">\\Pr_\\theta(Y \\mid X).</div>\n<p>Prompt Tuning 在输入前拼接一段 prompt <span class=\"kb-math kb-math-inline\">P=\\{p_1,p_2,\\ldots,p_k\\}</span>，但这些 <span class=\"kb-math kb-math-inline\">p_i</span> 的表示不再来自冻结词表，而是单独可训练的 <span class=\"kb-math kb-math-inline\">\\theta_P</span>。新的条件生成目标为：</p>\n<div class=\"kb-math kb-math-display\">\\Pr_{\\theta;\\theta_P}(Y \\mid [P;X]), \\quad \\theta \\text{ frozen}.</div>\n<p>训练时只更新 <span class=\"kb-math kb-math-inline\">\\theta_P</span>。若 T5 隐藏维度为 <span class=\"kb-math kb-math-inline\">d</span>、prompt 长度为 <span class=\"kb-math kb-math-inline\">k</span>，每个任务新增参数约为 <span class=\"kb-math kb-math-inline\">k\\times d</span>。论文 Figure 2 举例说明，T5-XXL 全量任务副本需要 110 亿参数，而 prompt 长度为 5 时每任务只需 20,480 个 prompt 参数，参数差距达到五个数量级以上。更常用的实验默认配置包含 LM adaptation、prompt length 100 和 class-label 初始化。</p>\n<p>核心训练伪代码如下：</p>\n<pre><code class=\"language-python\"># Prompt Tuning on frozen T5\nmodel = load_pretrained_t5()\nfreeze(model.parameters())\n\nsoft_prompt = Parameter(shape=(prompt_length, model.d_model))\noptimizer = Adafactor([soft_prompt])\n\nfor batch in train_data:\n    x_embed = model.embed(batch.input_ids)\n    prompt = soft_prompt.expand(batch_size=len(batch))\n    encoder_input = concat(prompt, x_embed, dim=&quot;sequence&quot;)\n    logits = model.generate_logits_from_embeddings(\n        encoder_input=encoder_input,\n        decoder_labels=batch.target_ids,\n    )\n    loss = sequence_cross_entropy(logits, batch.target_ids)\n    update([soft_prompt], loss)\n\nsave(soft_prompt)               # one small tensor per task\n</code></pre>\n<p>Prompt Tuning 与 Prefix-Tuning 的差别在于“控制信号进入模型的位置”。Prefix-Tuning 学习每层可用的 prefix 激活，通常需要为多层 key/value 或 hidden state 准备前缀；Prompt Tuning 只在输入嵌入层前拼接一段软向量，让冻结 Transformer 自己把这段条件向上传播。因此 Prompt Tuning 的参数量更低、实现更简单，但它更依赖模型本身的规模和预训练适配性。</p>\n<p>论文中特别强调 scale：小模型中，只训练 prompt 往往难以追上全量微调，因为冻结模型容量不足以把少量输入向量解释成复杂任务行为；随着 T5 参数规模增大，模型更会“听 prompt”，prompt tuning 与 model tuning 的差距逐渐消失。这个结论解释了为什么 Prompt Tuning 在大模型时代比在小模型时代更有吸引力。</p>\n<p>另一个实践细节是 LM adaptation。T5 原始 span corruption 预训练目标与后续条件生成/分类标签生成存在不匹配，论文发现对 T5.1.1 做额外语言模型目标适配能提高 prompt tuning 的稳定性。直觉上，冻结模型无法通过下游训练修正自身目标偏差，所以必须确保冻结模型已经适合被 prompt 条件化；否则 soft prompt 可能学到的是绕开预训练目标的“补丁”，而不是清晰的任务描述。</p>\n<p>Prompt Tuning 还天然支持 prompt ensembling。传统模型集成要保存并运行多份大模型；Prompt Tuning 可以在同一个冻结 T5 上加载多个 soft prompt，对同一输入做多次条件化，再投票或平均输出。这样集成成本主要来自多个小 prompt，而不是多个模型副本，适合服务端多任务和多版本部署。</p>\n<div class=\"key-point\">💡 关键：Prompt Tuning 的最小化假设是“任务知识可以压缩到输入嵌入前缀中”；当模型足够大且足够会遵循条件时，这个假设可以接近全量微调效果。</div>",
      "quiz": {
        "q": "Prompt Tuning 与 Prefix-Tuning 的一个核心区别是什么？",
        "options": [
          "Prompt Tuning 只学习输入端 soft prompt，而 Prefix-Tuning 通常学习多层 prefix 激活",
          "Prompt Tuning 会更新全部 T5 参数，而 Prefix-Tuning 不更新任何参数",
          "Prompt Tuning 只能使用人工离散词，不能通过反向传播优化",
          "Prompt Tuning 必须为每个任务保存一整份模型副本"
        ],
        "answer": 0,
        "explain": "Prompt Tuning 把可训练参数限制在输入嵌入前缀；Prefix-Tuning 的控制信号通常进入每层激活/注意力缓存，因此参数和结构更复杂。"
      }
    },
    {
      "id": "p_tuning",
      "num": 9,
      "name": "P-Tuning",
      "fullName": "P调优 (P-Tuning)",
      "year": "2021",
      "org": "Tsinghua University",
      "parent": "prefix_tuning",
      "paperUrl": "https://arxiv.org/abs/2103.10385",
      "projectUrl": "",
      "category": "peft",
      "motivation": "连续嵌入替代离散提示优化",
      "summary": "P-Tuning 提出用可训练的连续提示向量与离散模板拼接，解决人工离散 Prompt 对措辞高度敏感、离散搜索难以直接利用梯度的问题。它把 Prompt 选择从离散 token 搜索转成连续参数优化，并用轻量 Prompt Encoder 建模提示向量之间的依赖。",
      "keyPoints": [
        "将离散 Prompt 中的部分位置替换或拼接为连续提示向量 <code>[P]</code>，由反向传播直接学习。",
        "使用 Prompt Encoder 将可训练提示参数映射到输入 embedding，论文实验了 LSTM、MLP 和直接 embedding 三类实现。",
        "连续提示可以和原始离散模板同时使用，离散模板提供语义锚点，连续向量提供可优化的任务适配空间。",
        "支持两种设置：冻结语言模型只训练提示，或在 SuperGLUE 等任务上联合微调语言模型和提示。",
        "在 LAMA 知识探测和 SuperGLUE NLU 上验证，重点展示了对人工 Prompt 方差的稳定化以及对 AutoPrompt、PET 等离散提示方法的性能提升。",
        "作为 PEFT 早期代表，它仍主要作用在输入层，提示容量受序列长度约束，这也是 P-Tuning v2 后续引入深层提示的直接原因。"
      ],
      "detail": "<p><img alt=\"P-Tuning 连续提示优化示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2103.10385/assets/x2.png\" />\n<em>图：论文 Figure 2 对比了离散 Prompt 搜索与 P-Tuning。离散搜索只能根据最终 reward 改 token，连续提示和 Prompt Encoder 则可以通过任务损失端到端优化。</em></p>\n<p>P-Tuning 的动机来自一个很具体的问题：人工离散 Prompt 在预训练语言模型上并不稳定。同一个知识探测问题，只要把模板中的一个词换掉，LAMA 上的 Precision@1 就可能大幅波动。AutoPrompt 一类方法尝试搜索更好的离散 token，但搜索空间仍是离散的，优化信号无法像普通神经网络参数那样顺畅地反传到每个候选 token。P-Tuning 的核心转折是把 Prompt 的一部分从词表 token 放宽为连续向量，让提示本身成为可微参数。</p>\n<p>形式上，给定输入文本 <span class=\"kb-math kb-math-inline\">x</span>、标签 <span class=\"kb-math kb-math-inline\">y</span>、预训练语言模型 <span class=\"kb-math kb-math-inline\">M_\\theta</span> 和一组连续提示参数 <span class=\"kb-math kb-math-inline\">P = \\{p_1, \\ldots, p_m\\}</span>，P-Tuning 不再只构造硬模板，例如 <code>The capital of [X] is [MASK]</code>，而是在模板中插入若干 <code>[P]</code> 槽位。每个槽位通过 Prompt Encoder <span class=\"kb-math kb-math-inline\">g_\\phi</span> 映射到语言模型可接受的 embedding：</p>\n<div class=\"kb-math kb-math-display\">h_i = g_\\phi(p_i), \\quad \\tilde{x} = [h_1, \\ldots, h_a, e(x), h_{a+1}, \\ldots, h_m, e(\\text{[MASK]})]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">e(\\cdot)</span> 是预训练模型原本的词嵌入层，<span class=\"kb-math kb-math-inline\">h_i</span> 是连续提示向量。训练目标仍然是任务条件概率或分类交叉熵，例如在 masked LM 形式下最大化正确 verbalizer token 的概率：</p>\n<div class=\"kb-math kb-math-display\">\\max_{P,\\phi} \\sum_{(x,y)\\in\\mathcal{D}} \\log p_{M_\\theta}\\big(v(y) \\mid \\tilde{x}; P, \\phi\\big)</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">v(y)</span> 是标签对应的 verbalizer token。若语言模型冻结，则只更新 <span class=\"kb-math kb-math-inline\">P</span> 和 <span class=\"kb-math kb-math-inline\">\\phi</span>；若采用联合微调，则 <span class=\"kb-math kb-math-inline\">\\theta</span> 也参与更新。</p>\n<p>Prompt Encoder 是这篇论文区别于简单 soft prompt 的关键实现细节。直接把每个 <code>[P]</code> 当作独立 embedding 会让提示槽位彼此缺少结构约束，尤其当提示被插入到句子中间时，多个提示向量之间的顺序关系很重要。论文尝试用 LSTM 或 MLP 作为 <span class=\"kb-math kb-math-inline\">g_\\phi</span>，让一串连续提示先经过轻量网络再送入 PLM。直觉上，这相当于让 Prompt 不只是若干孤立参数，而是一段可学习的“隐式句子”。实验里 LSTM 和 MLP 通常比直接优化 embedding 更稳定，说明 Prompt Encoder 的结构偏置确实能缓解连续提示的优化难度。</p>\n<p>P-Tuning 不是完全抛弃离散 Prompt，而是经常把连续提示与人工模板拼接使用。这个选择很务实：离散模板保留任务语义，比如“capital of”暗示知识关系；连续向量则负责补偿模板措辞带来的不稳定性，并在训练集中学习更适合当前模型的隐藏提示。对 LAMA 这类知识探测任务，模型可以冻结，只训练连续提示来读取预训练模型中已有的事实知识；对 SuperGLUE 这类下游 NLU，论文也允许连续提示与模型参数一起微调，使提示成为任务输入重写的一部分。</p>\n<p>与 Prefix Tuning 相比，P-Tuning v1 更关注 NLU 和知识探测中的输入模板稳定性，而不是在生成模型每一层注入前缀状态。它的优点是实现简单、参数少、和 BERT/GPT 等不同 PLM 兼容；局限也很明确：连续提示主要插入输入层，因此提示对深层表示的影响是间接的，容量也受最大输入长度限制。这个局限解释了为什么后来的 P-Tuning v2 会把连续提示扩展到 Transformer 的每一层。</p>\n<pre><code class=\"language-python\"># P-Tuning 核心训练逻辑\ninitialize prompt_slots P = [p_1, ..., p_m]\ninitialize prompt_encoder g_phi  # LSTM, MLP, or identity\n\nfor batch in dataset:\n    x, y = batch\n    hard_template = build_discrete_template(x)          # e.g. &quot;The capital of [X] is [MASK]&quot;\n    soft_prompt = g_phi(P)                              # continuous prompt embeddings\n    input_embeds = insert_soft_prompt(hard_template, soft_prompt)\n\n    logits = pretrained_lm(input_embeds)\n    target = verbalizer(y)                              # label word or task target\n    loss = cross_entropy(logits_at_mask_or_head(logits), target)\n\n    # Frozen setting: update only P and g_phi.\n    # Finetuning setting: update P, g_phi, and optionally LM parameters.\n    loss.backward()\n    optimizer.step()\n</code></pre>\n<div class=\"key-point\">💡 关键：P-Tuning 的“连续”并不是让输出标签连续化，而是让输入侧的提示槽位连续化。这样 Prompt 可以像普通神经网络参数一样被梯度优化，同时仍可借助离散模板表达任务语义。</div>",
      "quiz": {
        "q": "P-Tuning 相比人工离散 Prompt 的核心优势是什么？",
        "options": [
          "把所有语言模型参数都压缩成低秩矩阵",
          "把提示的一部分变成可训练连续向量，从而能用反向传播优化并降低模板措辞敏感性",
          "在推理阶段搜索所有可能的离散模板",
          "完全取消 verbalizer 并只使用分类头"
        ],
        "answer": 1,
        "explain": "P-Tuning 的关键是连续提示向量和 Prompt Encoder，优化对象从离散 token 选择变成可微参数，因此能缓解人工模板不稳定问题。"
      }
    },
    {
      "id": "p_tuning_v2",
      "num": 10,
      "name": "P-Tuning v2",
      "fullName": "P调优v2 (P-Tuning v2)",
      "year": "2022.05",
      "org": "Tsinghua University",
      "parent": "p_tuning",
      "paperUrl": "https://aclanthology.org/2022.acl-short.8/",
      "projectUrl": "",
      "category": "peft",
      "motivation": "跨规模通用NLU任务适配",
      "summary": "P-Tuning v2 将连续提示从输入 embedding 层扩展到 Transformer 的每一层，解决早期 prompt tuning 在中小模型和序列标注任务上不够通用的问题。它用很少的任务特定参数接近全量微调，并把 prompt tuning 改造成适用于分类、抽取式问答、NER、SRL 等 NLU 任务的通用基线。",
      "keyPoints": [
        "采用 Deep Prompt Tuning：在不同 Transformer 层加入可训练连续提示，而不是只在输入层前拼接 soft prompt。",
        "冻结预训练语言模型主体，只训练每层 prompt、可选重参数化模块和任务头，任务特定参数约为全量参数的 0.1%-3%。",
        "解决两个普适性缺口：小于 10B 的常用模型上 prompt tuning 表现不足，以及抽取式 QA、NER、SRL 等序列标注任务难以使用 verbalizer。",
        "将 prompt 作为 prefix token 注入层内表示，使深层 prompt 对最终预测有更直接影响，并提升提示容量。",
        "关键实现细节包括 prompt length 选择、按任务决定是否使用 MLP 重参数化、多任务初始化、使用分类头替代 verbalizer。",
        "论文在 SuperGLUE、NER、抽取式 QA、语义角色标注等任务上验证，覆盖 BERT-large、RoBERTa-large、DeBERTa-xlarge、GLM 2B/10B 等规模。"
      ],
      "detail": "<p><img alt=\"P-Tuning v2 深层提示结构图\" src=\"https://ar5iv.labs.arxiv.org/html/2110.07602/assets/x2.png\" />\n<em>图：论文 Figure 2 展示了从输入层 Prompt Tuning 到 P-Tuning v2 的变化。橙色块是可训练 prompt embedding，蓝色块是冻结预训练模型产生或存储的表示。</em></p>\n<p>P-Tuning v2 的问题意识比 P-Tuning v1 更明确：早期 prompt tuning 虽然省参数，但并没有真正替代 fine-tuning。第一，Lester 等工作观察到 prompt tuning 往往要在 10B 以上模型才接近全量微调，而大量实际部署仍使用 100M 到 1B 级别模型。第二，传统 prompt tuning 依赖 <code>[MASK]</code> 或 verbalizer，把分类标签映射成词表 token；这种范式适合句级分类，却很难自然处理每个 token 都要预测标签的 NER、抽取式 QA、语义角色标注等任务。</p>\n<p>P-Tuning v2 的核心机制是“深层提示”。如果只在输入层插入 <span class=\"kb-math kb-math-inline\">m</span> 个 soft prompt，提示对后续预测的影响需要穿过所有 Transformer 层，容量也受输入长度限制。P-Tuning v2 在每一层 <span class=\"kb-math kb-math-inline\">l</span> 放置独立的连续提示 <span class=\"kb-math kb-math-inline\">P^{(l)}</span>，并把它们作为 prefix token 参与该层计算。用注意力的键值表示可以写成：</p>\n<div class=\"kb-math kb-math-display\">\\tilde{K}^{(l)} = [P_K^{(l)}; K^{(l)}], \\quad\n\\tilde{V}^{(l)} = [P_V^{(l)}; V^{(l)}]</div>\n<div class=\"kb-math kb-math-display\">\\text{Attn}^{(l)}(Q, K, V) = \\text{softmax}\\left(\\frac{Q(\\tilde{K}^{(l)})^\\top}{\\sqrt{d}}\\right)\\tilde{V}^{(l)}</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">[\\cdot;\\cdot]</span> 表示沿序列维拼接。预训练权重保持冻结，梯度只更新每层的 <span class=\"kb-math kb-math-inline\">P_K^{(l)}, P_V^{(l)}</span> 以及任务头。因为 prompt 被放到更靠近输出的层，模型不需要完全依赖输入层的间接传播，深层表示可以更直接地被任务参数调节。</p>\n<p>论文特别强调 P-Tuning v2 的贡献不只是“多加 prompt”，而是把 prompt tuning 适配到 NLU 的一整套工程选择。重参数化方面，早期方法常用 MLP 把低维提示参数映射到真正的层内提示，但论文发现 MLP 的收益依任务而定：RTE、CoNLL04 这类数据上有帮助，BoolQ、CoNLL12 上可能收益很小甚至负面。Prompt length 也不是越长越好：简单分类任务通常偏好短 prompt，困难序列标注任务往往需要更长 prompt。多任务学习不是必需组件，但可以先在多个任务上学习共享提示初始化，再为单任务调优。</p>\n<p>另一个关键改动是分类头。P-Tuning v1 和许多 prompt 方法使用 verbalizer，把标签映射到自然语言词，例如 positive/negative 或 yes/no。P-Tuning v2 认为在 full-data NLU 设置里 verbalizer 不是必要条件，而且在序列标注上不兼容。因此它可以像 BERT fine-tuning 一样在 token 或句子表示上接随机初始化分类头。这个选择降低了 prompt 方法的形式约束，让同一套深层 prompt 机制能覆盖句级分类、token 分类和 span 预测。</p>\n<p>从训练流程看，P-Tuning v2 与全量微调的最大差别是参数更新范围。输入文本仍经过冻结的 embedding 和 Transformer 主体；每层 attention 或 hidden state 计算时额外读入任务特定 prompt；最后由任务头输出标签。优化目标仍是标准监督损失：</p>\n<div class=\"kb-math kb-math-display\">\\min_{\\Theta_P,\\Theta_h}\\sum_{(x,y)\\in\\mathcal{D}} \\mathcal{L}\\big(h_{\\Theta_h}(F_{\\theta,\\Theta_P}(x)), y\\big), \\quad \\theta \\text{ frozen}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\Theta_P</span> 是所有层的 prompt 参数，<span class=\"kb-math kb-math-inline\">\\Theta_h</span> 是任务头，<span class=\"kb-math kb-math-inline\">\\theta</span> 是冻结的预训练模型。这样每个任务只需要保存 prompt 和 head，而不是复制整套模型权重。</p>\n<p>与 P-Tuning v1 相比，v2 的本质变化是从“输入重写”变成“层内控制”。v1 适合用连续向量修补离散模板的不稳定性，但容量有限；v2 则把提示分布到网络深层，允许任务信息在不同抽象层级介入。与全量微调相比，它牺牲了一部分可调自由度，但显著减少训练显存、存储和多任务部署成本；与 adapter 相比，它不一定增加完整的前馈模块，而是通过 prefix/prompt 状态调节注意力或层表示。</p>\n<pre><code class=\"language-python\"># P-Tuning v2 简化伪代码\nfreeze(pretrained_transformer)\ninitialize layer_prompts = {layer: (P_key[layer], P_value[layer]) for layer in layers}\ninitialize task_head\n\nfor batch in dataset:\n    x, y = batch\n    hidden = embedding_layer(x)\n\n    for layer in pretrained_transformer.layers:\n        Q, K, V = layer.project_attention(hidden)\n        K_tilde = concat(layer_prompts[layer].P_key, K, dim=&quot;sequence&quot;)\n        V_tilde = concat(layer_prompts[layer].P_value, V, dim=&quot;sequence&quot;)\n        hidden = layer.forward_with_prefixed_kv(Q, K_tilde, V_tilde, hidden)\n\n    logits = task_head(hidden)  # sentence-level or token-level\n    loss = task_loss(logits, y)\n    loss.backward()\n\n    # update prompts and task_head only; backbone remains frozen\n    optimizer.step()\n</code></pre>\n<div class=\"warn-box\">⚠️ 注意：P-Tuning v2 的“v2”不是简单增加 Prompt 长度，而是改变 Prompt 注入位置。每层 prompt 让任务参数直接作用于深层表示，这是它能覆盖中小模型和 hard sequence labeling 的主要原因。</div>",
      "quiz": {
        "q": "P-Tuning v2 为什么比输入层 Prompt Tuning 更适合序列标注和中小规模模型？",
        "options": [
          "它把所有模型权重都解冻，因此表达能力等同全量微调",
          "它在每个 Transformer 层加入连续提示，提高任务容量并让提示更直接影响深层表示",
          "它只使用人工离散模板，因此不需要训练数据",
          "它通过低秩矩阵合并权重，完全不需要额外序列位置"
        ],
        "answer": 1,
        "explain": "P-Tuning v2 的核心是 deep prompt tuning：每层都有可训练 prompt，容量和作用路径都强于只在输入层拼接 soft prompt。"
      }
    },
    {
      "id": "lora",
      "num": 11,
      "name": "LoRA",
      "fullName": "低秩适配 (Low-Rank Adaptation)",
      "year": "2022.01",
      "org": "Microsoft",
      "parent": "adapter",
      "paperUrl": "https://arxiv.org/abs/2106.09685",
      "projectUrl": "",
      "category": "peft",
      "motivation": "低秩分解消除推理延迟大幅减少显存",
      "summary": "LoRA 提出冻结预训练权重，只训练权重增量的低秩分解矩阵，解决全量微调在大模型上训练显存、任务存储和部署切换成本过高的问题。由于低秩增量可以在推理前合并回原权重，LoRA 相比传统 adapter 不引入额外推理延迟。",
      "keyPoints": [
        "对预训练权重 <span class=\"kb-math kb-math-inline\">W_0</span> 保持冻结，把任务更新 <span class=\"kb-math kb-math-inline\">\\Delta W</span> 约束为低秩分解 <span class=\"kb-math kb-math-inline\">BA</span>。",
        "只训练两个小矩阵 <span class=\"kb-math kb-math-inline\">A\\in\\mathbb{R}^{r\\times k}</span> 和 <span class=\"kb-math kb-math-inline\">B\\in\\mathbb{R}^{d\\times r}</span>，其中 <span class=\"kb-math kb-math-inline\">r\\ll\\min(d,k)</span>。",
        "前向计算为 <span class=\"kb-math kb-math-inline\">h = W_0x + \\frac{\\alpha}{r}BAx</span>，训练结束可合并为 <span class=\"kb-math kb-math-inline\">W&#x27;=W_0 + \\frac{\\alpha}{r}BA</span>。",
        "初始化采用 <span class=\"kb-math kb-math-inline\">A</span> 随机高斯、<span class=\"kb-math kb-math-inline\">B</span> 为零，使训练开始时 <span class=\"kb-math kb-math-inline\">\\Delta W=0</span>，模型初始行为与原始预训练模型一致。",
        "论文主要在 Transformer attention 的 <span class=\"kb-math kb-math-inline\">W_q</span> 和 <span class=\"kb-math kb-math-inline\">W_v</span> 上注入 LoRA，实验也讨论不同矩阵选择和 rank 的影响。",
        "相比 full fine-tuning，LoRA 每个任务只保存很小的低秩模块；相比 adapter，线性低秩增量可合并进权重，不增加在线推理深度。",
        "在 RoBERTa、DeBERTa、GPT-2、GPT-3 175B 上验证，展示了接近或超过全量微调的质量，并显著减少可训练参数和优化器显存。"
      ],
      "detail": "<p><img alt=\"LoRA 低秩重参数化示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2106.09685/assets/x1.png\" />\n<em>图：论文 Figure 1 展示 LoRA 的重参数化。冻结原权重 <span class=\"kb-math kb-math-inline\">W_0</span>，旁路训练低秩矩阵 <span class=\"kb-math kb-math-inline\">A</span> 和 <span class=\"kb-math kb-math-inline\">B</span>，二者乘积构成任务增量。</em></p>\n<p>LoRA 的出发点是大模型微调的部署现实：如果每个下游任务都复制一份完整模型，GPT-3 175B 这类模型会带来巨大的存储、加载和优化器状态成本。传统 adapter 通过插入小模块减少训练参数，但会增加网络深度，在线推理时仍要额外执行 adapter 计算。Prefix/prompt tuning 不改权重，但会占用序列长度，并且在某些任务上优化不稳定。LoRA 选择直接作用于权重更新本身：不学习完整 <span class=\"kb-math kb-math-inline\">\\Delta W</span>，只学习一个低秩近似。</p>\n<p>对任意线性层，原始前向是 <span class=\"kb-math kb-math-inline\">h=W_0x</span>，其中 <span class=\"kb-math kb-math-inline\">W_0\\in\\mathbb{R}^{d\\times k}</span>。全量微调会让 <span class=\"kb-math kb-math-inline\">W_0</span> 变成 <span class=\"kb-math kb-math-inline\">W_0+\\Delta W</span>，而 <span class=\"kb-math kb-math-inline\">\\Delta W</span> 与 <span class=\"kb-math kb-math-inline\">W_0</span> 同形，参数量很大。LoRA 假设任务适配所需的权重变化具有低“内在秩”，因此令：</p>\n<div class=\"kb-math kb-math-display\">\\Delta W = BA, \\quad B\\in\\mathbb{R}^{d\\times r}, \\quad A\\in\\mathbb{R}^{r\\times k}, \\quad r\\ll\\min(d,k)</div>\n<p>前向计算变为：</p>\n<div class=\"kb-math kb-math-display\">h = W_0x + \\frac{\\alpha}{r}BAx</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\alpha/r</span> 是缩放因子，用来让不同 rank 下的更新幅度更稳定。若 <span class=\"kb-math kb-math-inline\">d=k=12288</span> 且 <span class=\"kb-math kb-math-inline\">r=8</span>，完整 <span class=\"kb-math kb-math-inline\">\\Delta W</span> 需要约 1.5 亿个参数，而 LoRA 只需要 <span class=\"kb-math kb-math-inline\">2\\times12288\\times8</span> 量级的参数，差距非常大。</p>\n<p>初始化设计是 LoRA 稳定性的一个细节。论文将 <span class=\"kb-math kb-math-inline\">A</span> 用随机高斯初始化，将 <span class=\"kb-math kb-math-inline\">B</span> 初始化为零，因此 <span class=\"kb-math kb-math-inline\">BA=0</span>，训练第一步前模型行为完全等同于原预训练模型。这个设计避免了刚插入 LoRA 模块时扰乱模型输出。训练过程中，梯度只更新 <span class=\"kb-math kb-math-inline\">A</span> 和 <span class=\"kb-math kb-math-inline\">B</span>，冻结的 <span class=\"kb-math kb-math-inline\">W_0</span> 不产生梯度，也不需要保存 Adam 的一阶和二阶优化器状态，从而降低显存。</p>\n<p>LoRA 在 Transformer 中可以应用到任何 dense matrix，包括 self-attention 的 <span class=\"kb-math kb-math-inline\">W_q,W_k,W_v,W_o</span> 以及 MLP 层。论文为了简洁和效率，很多实验主要把 LoRA 加到 query 和 value 投影上，即 <span class=\"kb-math kb-math-inline\">W_q</span> 与 <span class=\"kb-math kb-math-inline\">W_v</span>。这样做的直觉是注意力的查询和值直接影响信息选择和信息写入，对任务行为的调节很敏感；同时不必在所有矩阵上都增加低秩旁路，可以保持参数量极低。参数量通常可近似为 <span class=\"kb-math kb-math-inline\">n\\cdot r(d+k)</span>，其中 <span class=\"kb-math kb-math-inline\">n</span> 是注入 LoRA 的矩阵数量。</p>\n<p>LoRA 的部署优势来自线性可合并性。训练时为了清晰和高效，通常保留旁路计算 <span class=\"kb-math kb-math-inline\">W_0x + BAx</span>。推理前可以显式计算 <span class=\"kb-math kb-math-inline\">W&#x27;=W_0 + \\frac{\\alpha}{r}BA</span>，然后像普通线性层一样执行 <span class=\"kb-math kb-math-inline\">W&#x27;x</span>。因此 LoRA 不增加推理层数、不占用额外 token 位置，也不需要像 adapter 一样在每层多跑一个瓶颈 MLP。切换任务时，只需卸载当前任务的 <span class=\"kb-math kb-math-inline\">BA</span> 增量并加载另一个任务的低秩增量，主模型权重仍可共享。</p>\n<p>从方法边界看，LoRA 不是声称所有任务更新都天然低秩，而是提供一个可调的秩约束。当 <span class=\"kb-math kb-math-inline\">r</span> 增大并覆盖更多权重矩阵时，LoRA 的表达能力逐步接近全量微调；当 <span class=\"kb-math kb-math-inline\">r</span> 很小时，它成为强参数约束的高效适配器。论文的实验和 rank-deficiency 分析表明，许多语言模型适配任务确实不需要满秩更新，较小 rank 就能达到很强效果。这解释了 LoRA 为什么能在 GPT-2、GPT-3、RoBERTa、DeBERTa 上同时兼顾质量和效率。</p>\n<pre><code class=\"language-python\"># LoRA 注入到一个线性层的核心逻辑\nclass LoRALinear:\n    def __init__(self, W0, rank, alpha):\n        self.W0 = freeze(W0)                         # pretrained weight, no gradients\n        self.A = normal(shape=(rank, W0.in_dim))      # trainable\n        self.B = zeros(shape=(W0.out_dim, rank))      # trainable, starts with zero update\n        self.scale = alpha / rank\n\n    def forward(self, x):\n        base = self.W0 @ x\n        delta = self.B @ (self.A @ x)\n        return base + self.scale * delta\n\n    def merge_for_inference(self):\n        return self.W0 + self.scale * (self.B @ self.A)\n</code></pre>\n<div class=\"key-point\">💡 关键：LoRA 的参数高效性来自低秩约束，推理高效性来自可合并的线性结构。训练时是旁路，部署时可以变回普通权重矩阵。</div>",
      "quiz": {
        "q": "",
        "options": [],
        "answer": 0,
        "explain": ""
      }
    },
    {
      "id": "adalora",
      "num": 12,
      "name": "AdaLoRA",
      "fullName": "自适应低秩适配 (AdaLoRA)",
      "year": "2023.03",
      "org": "Georgia Tech",
      "parent": "lora",
      "paperUrl": "https://arxiv.org/abs/2303.10512",
      "projectUrl": "",
      "category": "peft",
      "motivation": "SVD动态分配参数预算优化性能",
      "summary": "AdaLoRA 提出用 SVD 形式重参数化 LoRA 增量矩阵，并根据奇异值三元组的重要性动态分配全局 rank 预算，解决标准 LoRA 对所有层/矩阵均匀分配参数导致预算浪费的问题。",
      "keyPoints": [
        "将低秩更新从 LoRA 的两矩阵乘积改写为 SVD-like 形式 <span class=\"kb-math kb-math-inline\">\\Delta W=P\\Lambda Q</span>，用可训练奇异值向量控制每个增量矩阵的有效 rank。",
        "通过正交约束让 <span class=\"kb-math kb-math-inline\">P</span> 与 <span class=\"kb-math kb-math-inline\">Q</span> 更接近左右奇异向量，避免每轮显式计算高维 SVD。",
        "以“奇异值 + 对应左右向量”的 triplet 为剪枝单元，只把低重要性的奇异值置零，保留向量以便后续恢复。",
        "设计 sensitivity-based importance score，将 <span class=\"kb-math kb-math-inline\">|w\\nabla_w \\mathcal{L}|</span>、指数滑动平均和不确定性估计组合起来衡量 triplet 对任务损失的贡献。",
        "使用 global budget scheduler：先用略高于目标的初始预算探索，再按 schedule 逐步降到目标预算，最后冻结预算分布继续微调。",
        "论文在 DeBERTaV3-base、BART-large 上覆盖 GLUE、SQuAD、XSum、CNN/DailyMail，重点验证低预算场景下 AdaLoRA 优于均匀 rank 的 LoRA/Adapter。"
      ],
      "detail": "<p><img alt=\"AdaLoRA 中不同权重矩阵重要性差异\" src=\"https://ar5iv.labs.arxiv.org/html/2303.10512/assets/x1.png\" />\n<img alt=\"AdaLoRA 中不同层重要性差异\" src=\"https://ar5iv.labs.arxiv.org/html/2303.10512/assets/x2.png\" />\n<em>图：论文 Figure 1 展示在相同参数预算下，选择不同权重矩阵或不同层进行 LoRA 微调会得到明显不同的 MNLI-m 表现；这正是 AdaLoRA 要解决的“均匀 rank 分配不合理”问题。</em></p>\n<pre><code class=\"language-python\"># AdaLoRA 核心训练流程（按论文 Algorithm 1 简化）\ninitialize P_i, Lambda_i, Q_i for every adapted weight W_i\ninitialize total rank budget b_t with a warmup -&gt; cubic decay -&gt; final budget schedule\n\nfor step in range(total_steps):\n    batch = sample_minibatch(dataset)\n    loss = task_loss(model(batch)) + lambda_reg * orthogonal_regularizer(P, Q)\n    loss.backward()\n\n    # 1. 估计每个可训练参数的敏感性\n    for parameter w in {P_i, Lambda_i, Q_i}:\n        sensitivity[w] = abs(w * grad(w))\n        ema_sensitivity[w] = beta1 * ema_sensitivity[w] + (1 - beta1) * sensitivity[w]\n        uncertainty[w] = beta2 * uncertainty[w] + (1 - beta2) * abs(sensitivity[w] - ema_sensitivity[w])\n        importance[w] = ema_sensitivity[w] * uncertainty[w]\n\n    # 2. 聚合到每个 SVD triplet：lambda_j 及其对应的 P[:, j], Q[j, :]\n    for triplet in all_svd_triplets:\n        score[triplet] = aggregate_importance(lambda_j, P_col_j, Q_row_j)\n\n    optimizer.step()\n\n    # 3. 按当前全局预算 b_t 保留 top-b_t 个 triplet，其余仅 mask 掉奇异值\n    active_triplets = topk(score, k=b_t(step))\n    mask_singular_values(Lambda, active_triplets)\n\nreturn frozen_base_model + learned_adalora_parameters\n</code></pre>\n<p>LoRA 的基本假设是下游任务的权重增量 <span class=\"kb-math kb-math-inline\">\\Delta W</span> 具有低内在秩，因此对一个预训练矩阵 <span class=\"kb-math kb-math-inline\">W_0</span> 只学习 <span class=\"kb-math kb-math-inline\">\\Delta W=BA</span>，前向形式可写为 <span class=\"kb-math kb-math-inline\">h=W_0x+BAx</span>。问题在于标准 LoRA 通常为每个被适配矩阵指定同一个 rank <span class=\"kb-math kb-math-inline\">r</span>，等价于假设所有层、所有投影矩阵都同等重要。AdaLoRA 的 Figure 1 直接反驳了这个假设：在同样 0.28M 可训练参数下，FFN 矩阵比部分 attention projection 更有效，上层也明显比底层更值得分配预算。因此，AdaLoRA 不是单纯“减少参数”，而是把有限参数从低收益位置转移到高收益位置。</p>\n<p>AdaLoRA 的关键重参数化是把每个增量矩阵写成近似 SVD：</p>\n<div class=\"kb-math kb-math-display\">\\Delta W_i=P_i\\Lambda_iQ_i,</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">P_i\\in\\mathbb{R}^{d_1\\times r}</span>、<span class=\"kb-math kb-math-inline\">Q_i\\in\\mathbb{R}^{r\\times d_2}</span>，<span class=\"kb-math kb-math-inline\">\\Lambda_i</span> 是对角奇异值矩阵或向量。相比直接对 <span class=\"kb-math kb-math-inline\">\\Delta W_i</span> 做精确 SVD 后截断，AdaLoRA 让 <span class=\"kb-math kb-math-inline\">P_i,\\Lambda_i,Q_i</span> 参与梯度训练，并用正交正则近似奇异向量性质：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{R}(P_i,Q_i)=\\lVert P_i^\\top P_i-I\\rVert_F^2+\\lVert Q_iQ_i^\\top-I\\rVert_F^2.</div>\n<p>这个设计的直觉是：如果 <span class=\"kb-math kb-math-inline\">P_i</span> 与 <span class=\"kb-math kb-math-inline\">Q_i</span> 足够正交，那么按奇异值大小或重要性剪掉某些方向时，增量矩阵的扰动更接近真正的低秩截断，而不会像普通 LoRA 的 doublet 剪枝那样因为方向相关而产生剧烈不稳定。</p>\n<p>预算分配的粒度不是单个参数，而是 triplet：第 <span class=\"kb-math kb-math-inline\">j</span> 个奇异值 <span class=\"kb-math kb-math-inline\">\\lambda_{i,j}</span>、对应的左向量 <span class=\"kb-math kb-math-inline\">P_i[:,j]</span> 和右向量 <span class=\"kb-math kb-math-inline\">Q_i[j,:]</span>。AdaLoRA 为每个可训练参数估计一阶敏感性：</p>\n<div class=\"kb-math kb-math-display\">s^{(t)}(w)=\\left|w^{(t)}\\nabla_w\\mathcal{L}^{(t)}\\right|.</div>\n<p>它表示如果把参数 <span class=\"kb-math kb-math-inline\">w</span> 移除，对当前损失可能造成多大影响。由于 mini-batch 噪声会让 <span class=\"kb-math kb-math-inline\">s^{(t)}</span> 抖动，论文进一步用指数滑动平均得到平滑敏感性 <span class=\"kb-math kb-math-inline\">\\bar{s}^{(t)}</span>，并用局部偏差估计不确定性 <span class=\"kb-math kb-math-inline\">\\bar{u}^{(t)}</span>，最终可写成类似 <span class=\"kb-math kb-math-inline\">I(w)=\\bar{s}^{(t)}(w)\\bar{u}^{(t)}(w)</span> 的参数级重要性。triplet 级分数再把 <span class=\"kb-math kb-math-inline\">\\lambda</span>、<span class=\"kb-math kb-math-inline\">P</span> 列、<span class=\"kb-math kb-math-inline\">Q</span> 行的重要性聚合，例如：</p>\n<div class=\"kb-math kb-math-display\">I_{i,j}=I(\\lambda_{i,j})+\\frac{1}{d_1}\\sum_p I(P_i[p,j])+\\frac{1}{d_2}\\sum_q I(Q_i[j,q]).</div>\n<p>然后保留全局 top-<span class=\"kb-math kb-math-inline\">b_t</span> 个 triplet，其余只将对应奇异值 mask 为 0。</p>\n<div class=\"key-point\">💡 关键：AdaLoRA 剪的是 <span class=\"kb-math kb-math-inline\">\\Lambda</span> 中的奇异值，而不是删除 <span class=\"kb-math kb-math-inline\">P</span> 与 <span class=\"kb-math kb-math-inline\">Q</span> 的整列/整行。这样一个早期被误判为不重要的方向仍然能继续接收梯度并在后续步骤恢复，训练稳定性比硬删除 LoRA doublet 更好。</div>\n<p>全局预算调度器控制当前总 rank <span class=\"kb-math kb-math-inline\">b_t</span>。训练初期预算略高于最终预算，让模型先探索更多方向；经过 warmup 后，预算按类似三次曲线逐步衰减：</p>\n<div class=\"kb-math kb-math-display\">b_t=b_T+(b_0-b_T)\\left(1-\\frac{t-t_i}{t_f-t_i}\\right)^3,</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">b_0</span> 是初始预算，<span class=\"kb-math kb-math-inline\">b_T</span> 是目标预算，<span class=\"kb-math kb-math-inline\">t_i</span> 是开始剪枝前的 warmup 步数，<span class=\"kb-math kb-math-inline\">t_f</span> 是预算固定前的结束步数。最后阶段不再重新分配 rank，只在已选出的预算结构上继续微调。这个流程把“哪些层值得更高 rank”作为训练中动态学习出的结构，而不是由人工在训练前指定。</p>\n<p>与传统 LoRA 相比，AdaLoRA 的优势来自两点叠加。第一，它把 rank 从静态超参数变成跨层共享的可调资源，适合预算极低、各模块重要性差异很大的场景。第二，它用 SVD-like 参数化降低 rank 调整的破坏性，使剪枝更接近“删除低贡献奇异方向”而非“任意删除低秩因子”。代价是训练逻辑更复杂，需要维护重要性统计、mask 和预算 schedule；但推理阶段仍可把有效增量合并回权重矩阵，不引入额外推理层。</p>",
      "quiz": {
        "q": "AdaLoRA 相比标准 LoRA 的核心改动是什么？",
        "options": [
          "把所有 LoRA rank 固定为更大的同一个值",
          "用 SVD-like 增量参数化并按重要性动态分配全局 rank 预算",
          "只微调 LayerNorm 和 bias 参数",
          "把 LoRA adapter 改成额外的串行 MLP 模块"
        ],
        "answer": 1,
        "explain": "AdaLoRA 的核心是用 PΛQ 表示增量，并根据 triplet 重要性剪奇异值，从而把预算分配给更关键的层和矩阵。"
      }
    },
    {
      "id": "qlora",
      "num": 13,
      "name": "QLoRA",
      "fullName": "量化低秩适配 (QLoRA)",
      "year": "2023.05",
      "org": "University of Washington",
      "parent": "lora",
      "paperUrl": "https://arxiv.org/abs/2305.14314",
      "projectUrl": "",
      "category": "peft",
      "motivation": "4-bit量化实现单卡微调65B模型",
      "summary": "QLoRA 提出在冻结的 4-bit 量化大模型上反向传播到 LoRA adapter，并结合 NF4、Double Quantization 与 Paged Optimizer，把 65B 模型微调压缩到单张 48GB GPU，同时接近 16-bit 微调效果。",
      "keyPoints": [
        "冻结预训练基座权重并以 4-bit NormalFloat 存储，仅训练插入到线性层中的 LoRA 参数。",
        "前向/反向计算时把 4-bit 权重临时 dequantize 到 BF16 做矩阵乘法，梯度只更新 LoRA adapter，不更新量化基座。",
        "提出 NF4 数据类型：针对近似零均值正态分布的神经网络权重，用分位数量化构造 4-bit codebook。",
        "提出 Double Quantization：再次量化第一层量化所需的 scale/absmax 常数，平均节省约 0.37 bit/parameter。",
        "使用 Paged Optimizer 借助 NVIDIA Unified Memory，把 optimizer state 在 GPU/CPU 间分页，缓解长序列和 gradient checkpointing 带来的显存尖峰。",
        "经验结论强调 LoRA 应用于所有 transformer 线性层，而不仅是 query/value projection，才能更稳定地恢复 16-bit 性能。",
        "论文用 QLoRA 微调超过 1000 个模型，覆盖 LLaMA/T5、7B 到 65B、8 个 instruction datasets，并产出 Guanaco 系列聊天模型。"
      ],
      "detail": "<p><img alt=\"QLoRA 微调框架与显存对比\" src=\"https://ar5iv.labs.arxiv.org/html/2305.14314/assets/x1.png\" />\n<em>图：论文 Figure 1 对比 full finetuning、LoRA 与 QLoRA 的显存结构。QLoRA 的核心变化是把 frozen transformer 压到 4-bit，并用 paged optimizer 管理训练时显存峰值。</em></p>\n<pre><code class=\"language-python\"># QLoRA 核心训练流程（概念伪代码）\nW_fp16 = load_pretrained_llm()\n\n# 1. 分块量化基座权重：NF4 存储权重，Double Quantization 存储量化常数\nfor block in chunks(W_fp16, block_size=64):\n    c1 = absmax(block)\n    W_nf4_block = quantize_to_nf4(block / c1)\nstore(W_nf4, quantize_fp8(c1))\nfreeze(W_nf4)\n\n# 2. 在所有目标线性层插入 LoRA adapter\nfor linear_layer in transformer.linear_layers:\n    linear_layer.add_lora_adapter(rank=r, dtype=&quot;bf16&quot;)\n\n# 3. 训练时只更新 LoRA；4-bit 权重只在计算时临时反量化\nfor batch in dataloader:\n    for quantized_linear in model.layers:\n        W_bf16 = double_dequant(quantized_linear.W_nf4, quantized_linear.quantized_scales)\n        y = x @ W_bf16 + lora_scale * (x @ A @ B)\n    loss = cross_entropy(y, labels)\n    loss.backward()              # gradient flows through W_bf16 into LoRA path\n    paged_adamw.step(lora_params_only)\n    paged_adamw.zero_grad()\n</code></pre>\n<p>QLoRA 解决的是一个非常具体的训练瓶颈：大模型全参微调不仅要存权重，还要存梯度、optimizer state 和激活。论文指出，常规 16-bit 微调 LLaMA 65B 需要超过 780GB GPU 显存；而仅靠 LoRA 虽然减少了可训练参数，但基座权重仍然以高精度常驻显存。QLoRA 的策略是把“模型容量”与“可训练参数”拆开：容量来自冻结的 4-bit 基座模型，任务适配能力来自小规模 BF16 LoRA adapter。</p>\n<p>基础的 LoRA 线性层可写成：</p>\n<div class=\"kb-math kb-math-display\">Y=XW+sXL_1L_2,</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">W</span> 是冻结预训练权重，<span class=\"kb-math kb-math-inline\">L_1,L_2</span> 是可训练低秩矩阵，<span class=\"kb-math kb-math-inline\">s</span> 是缩放系数。QLoRA 将 <span class=\"kb-math kb-math-inline\">W</span> 替换为 NF4 存储的 <span class=\"kb-math kb-math-inline\">W^{\\text{NF4}}</span>，但矩阵乘法仍在 BF16 中执行：</p>\n<div class=\"kb-math kb-math-display\">Y^{\\text{BF16}}=X^{\\text{BF16}}\\operatorname{doubleDequant}(W^{\\text{NF4}}, c_1, c_2)+sX^{\\text{BF16}}L_1^{\\text{BF16}}L_2^{\\text{BF16}}.</div>\n<p>直觉上，量化权重只负责“省显存存储”，而不是让 4-bit 直接承担低精度训练；每次用到权重时临时恢复到 BF16 参与计算，所以反向传播可以穿过反量化计算图，把误差信号传给 LoRA 参数。</p>\n<p>NF4 是 QLoRA 最关键的量化设计。普通 int4/float4 的量化 bin 通常均匀或按浮点格式分布，但神经网络预训练权重大多近似零均值正态分布。NF4 用标准正态分布的分位数构造 codebook，使每个量化区间在理论上承载相近概率质量。可把第 <span class=\"kb-math kb-math-inline\">i</span> 个 codebook 值理解为相邻分位点的中心：</p>\n<div class=\"kb-math kb-math-display\">q_i \\approx \\frac{1}{2}\\left(Q_{\\mathcal{N}}\\left(\\frac{i}{2^k+1}\\right)+Q_{\\mathcal{N}}\\left(\\frac{i+1}{2^k+1}\\right)\\right),</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">Q_{\\mathcal{N}}</span> 是标准正态分布的 quantile function，<span class=\"kb-math kb-math-inline\">k=4</span>。实际实现还会保证 zero point 可精确表示，因为 padding 或稀疏位置的 0 如果不能无误差表示，会带来不必要偏差。</p>\n<p>分块量化会引入 scale 常数。假设每 64 个参数共享一个 <span class=\"kb-math kb-math-inline\">c_1=\\operatorname{absmax}(\\text{block})</span>，权重可近似恢复为：</p>\n<div class=\"kb-math kb-math-display\">\\hat{w}=c_1\\cdot q_{\\text{NF4}}.</div>\n<p>如果这些 <span class=\"kb-math kb-math-inline\">c_1</span> 仍用 FP32 存储，scale 本身会形成明显额外开销。Double Quantization 的做法是把 <span class=\"kb-math kb-math-inline\">c_1</span> 再作为输入做第二次量化，得到量化后的 scale 以及更粗粒度的二级 scale <span class=\"kb-math kb-math-inline\">c_2</span>。论文使用 64 blocksize 的第一层量化和 256 blocksize 的第二层量化，平均可把 scale 开销降低约 0.37 bit/parameter；对 65B 模型，这类小数级节省会累积成数 GB 显存。</p>\n<p>Paged Optimizer 处理的是另一类问题：即使静态权重能放进显存，训练时某些 batch 仍可能因长序列、checkpointing 回放或 optimizer step 产生显存尖峰。QLoRA 用 NVIDIA Unified Memory 为 optimizer state 分页；当 GPU 显存不足时，部分状态自动迁移到 CPU RAM，需要更新时再迁回。这不改变优化目标，但把“偶发峰值导致 OOM”的硬失败变成可承受的分页成本。</p>\n<div class=\"warn-box\">⚠️ 注意：QLoRA 不是“直接训练 4-bit 权重”。基座权重被冻结，4-bit 是存储格式；训练信号通过临时 BF16 反量化路径流向 LoRA adapter。若更新量化基座本身，就不再是论文定义的 QLoRA。</div>\n<p>与传统 LoRA 相比，QLoRA 的主要贡献不是新的低秩表达，而是围绕 LoRA 构建了一套可训练量化系统：NF4 降低量化误差，Double Quantization 压低 scale overhead，Paged Optimizer 控制显存峰值，所有线性层插入 LoRA 保证表达能力。论文的实验结论也很实用：在给定显存预算下，使用更大的低精度基座模型并做高质量 SFT，往往比小模型高精度微调更划算。</p>",
      "quiz": {
        "q": "QLoRA 中 4-bit 量化权重在训练时的角色是什么？",
        "options": [
          "作为可训练参数直接接收 AdamW 更新",
          "被冻结并以 NF4 存储，用到时反量化到 BF16 参与计算",
          "只用于推理，训练阶段仍保留完整 FP32 权重",
          "替代 LoRA adapter，完全不需要低秩参数"
        ],
        "answer": 1,
        "explain": "QLoRA 冻结 4-bit 基座权重，计算时临时 dequantize 到 BF16，梯度只更新 LoRA adapter。"
      }
    },
    {
      "id": "dora",
      "num": 14,
      "name": "DoRA",
      "fullName": "权重分解低秩适配 (DoRA)",
      "year": "2024.02",
      "org": "NVIDIA",
      "parent": "lora",
      "paperUrl": "https://arxiv.org/abs/2402.09353",
      "projectUrl": "",
      "category": "peft",
      "motivation": "幅值方向分解缩小与全参微调差距",
      "summary": "DoRA 将预训练权重分解为 magnitude 与 direction 两部分，只用 LoRA 更新 direction、单独学习 magnitude，从而让 PEFT 的更新模式更接近全参微调并缩小 LoRA 与 FT 的效果差距。",
      "keyPoints": [
        "提出 weight decomposition analysis：把权重列向量拆成幅值 <span class=\"kb-math kb-math-inline\">m</span> 与单位方向 <span class=\"kb-math kb-math-inline\">V/\\lVert V\\rVert_c</span>，比较 FT、LoRA、DoRA 的幅值/方向更新模式。",
        "发现 LoRA 的 magnitude update 与 direction update 呈强正相关，而 full fine-tuning 更像负相关或解耦更新，说明 LoRA 学习模式受限。",
        "DoRA 初始化时从预训练权重得到 <span class=\"kb-math kb-math-inline\">m=\\lVert W_0\\rVert_c</span>、<span class=\"kb-math kb-math-inline\">V=W_0</span>，训练时冻结 <span class=\"kb-math kb-math-inline\">V</span> 的基座部分、学习 <span class=\"kb-math kb-math-inline\">m</span>，并用 LoRA 低秩增量更新 direction。",
        "核心形式为 <span class=\"kb-math kb-math-inline\">W&#x27;=m\\frac{V+\\Delta V}{\\lVert V+\\Delta V\\rVert_c}</span>，其中 <span class=\"kb-math kb-math-inline\">\\Delta V=BA</span> 是 LoRA 增量。",
        "可在推理前把 DoRA 更新合并回权重矩阵，因此与 LoRA 一样不增加额外推理延迟。",
        "为减少训练开销，论文建议对方向归一化分母做 detach，把归一化值视为常数，显著降低反传图显存且几乎不影响精度。",
        "在 LLaMA commonsense reasoning、LLaVA visual instruction tuning、VL-BART image/video-text understanding 上稳定优于同 rank LoRA。"
      ],
      "detail": "<p><img alt=\"DoRA 权重分解与低秩方向更新框架\" src=\"https://ar5iv.labs.arxiv.org/html/2402.09353/assets/x1.png\" />\n<em>图：论文 Figure 1 展示 DoRA 如何把预训练权重分解为 magnitude 与 direction，并用 LoRA 只更新 direction，最后重新合成为可部署权重。</em></p>\n<pre><code class=\"language-python\"># DoRA 核心训练流程（简化）\nfor each adapted pretrained weight W0:\n    V = freeze(W0)                    # direction base\n    m = trainable(column_norm(W0))     # magnitude vector\n    A, B = init_lora(rank=r)           # Delta V = B @ A, with zero-init output path\n\nfor batch in dataloader:\n    for adapted_linear in model.layers:\n        delta_V = B @ A\n        direction = V + delta_V\n        norm = column_norm(direction)\n\n        # 论文的低开销版本可 detach(norm)，降低反向图显存\n        W_dora = m * direction / detach(norm)\n        y = x @ W_dora\n\n    loss = task_loss(y, labels)\n    loss.backward()\n    optimizer.step(params=[m, A, B])\n\n# inference 前可把 W_dora merge 成普通线性层权重\n</code></pre>\n<p>LoRA 的基本更新是 <span class=\"kb-math kb-math-inline\">W&#x27;=W_0+\\Delta W</span>，其中 <span class=\"kb-math kb-math-inline\">\\Delta W=BA</span>。这个形式虽然参数高效，也能在推理前 merge，但它把“权重向量长度变化”和“权重方向变化”混在同一个低秩增量里。DoRA 的出发点是：如果全参微调能够自由地调节每列权重的幅值和方向，而 LoRA 的低秩增量必须同时解释两者，那么 LoRA 的容量缺口不只是“参数少”，还包括更新几何受限。</p>\n<p>论文先定义列方向上的权重分解。对权重矩阵 <span class=\"kb-math kb-math-inline\">W</span>，记 <span class=\"kb-math kb-math-inline\">\\lVert W\\rVert_c</span> 为按列计算的向量范数，则：</p>\n<div class=\"kb-math kb-math-display\">W=m\\frac{V}{\\lVert V\\rVert_c},\\quad m=\\lVert W\\rVert_c,\\quad V=W.</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">m</span> 是每一列的 magnitude，<span class=\"kb-math kb-math-inline\">V/\\lVert V\\rVert_c</span> 是单位方向。论文用这个分解比较 FT 和 LoRA 在不同训练步、不同层上的变化，发现 LoRA 的方向变化越大时幅值变化也越大，呈明显正相关；而 FT 更常出现一方大、一方小的解耦更新。这意味着 FT 可以“主要转方向但少改长度”或“主要改长度但少转方向”，而 LoRA 更容易把两类变化绑定在一起。</p>\n<p>DoRA 的方法就是显式拆开这两件事。初始化时从预训练权重得到 <span class=\"kb-math kb-math-inline\">m</span> 与 <span class=\"kb-math kb-math-inline\">V</span>，训练时 <span class=\"kb-math kb-math-inline\">m</span> 是可训练向量，direction 则通过低秩矩阵更新：</p>\n<div class=\"kb-math kb-math-display\">\\Delta V=BA,</div>\n<div class=\"kb-math kb-math-display\">W&#x27;=m\\frac{V+\\Delta V}{\\lVert V+\\Delta V\\rVert_c}.</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">V</span> 的基座部分来自冻结的 <span class=\"kb-math kb-math-inline\">W_0</span>，<span class=\"kb-math kb-math-inline\">A,B</span> 是 LoRA 参数。这个公式的直觉很直接：LoRA 不再负责同时学“长度”和“方向”，而是专注于调整归一化方向；每列长度交给独立的 <span class=\"kb-math kb-math-inline\">m</span> 学习。新增的 <span class=\"kb-math kb-math-inline\">m</span> 参数量只和输出/列数相关，通常相对 LLM 总参数极小。</p>\n<p>DoRA 与 Weight Normalization 看起来相似，但训练语境不同。Weight Normalization 通常从头训练，把权重重参数化为 magnitude 和 direction 以改善优化条件；DoRA 则从一个已经包含大量知识的 <span class=\"kb-math kb-math-inline\">W_0</span> 出发，保留预训练方向作为初始点，只在下游任务上做小幅适配。因此 DoRA 避免了从零初始化方向的敏感性，也保持了 PEFT 的可合并、低推理成本属性。</p>\n<p>梯度分析解释了为什么分解能改善 LoRA 稳定性。对 direction 参数 <span class=\"kb-math kb-math-inline\">V</span> 的梯度会受到归一化结构影响，可直观写成“缩放 + 投影”形式：</p>\n<div class=\"kb-math kb-math-display\">\\nabla_V\\mathcal{L}\\propto \\frac{m}{\\lVert V\\rVert_c}\\left(I-\\frac{VV^\\top}{\\lVert V\\rVert_c^2}\\right)\\nabla_W\\mathcal{L}.</div>\n<p>投影项会削弱沿当前权重方向的分量，让更新更集中在改变方向的有效子空间；缩放项则按 magnitude 调整梯度尺度。这种结构使低秩 <span class=\"kb-math kb-math-inline\">\\Delta V</span> 接收到的梯度更接近“方向适配”任务，而不是普通 LoRA 中直接对 <span class=\"kb-math kb-math-inline\">W_0+BA</span> 做混合更新。</p>\n<div class=\"key-point\">💡 关键：DoRA 不是替代 LoRA 的低秩矩阵，而是把 LoRA 放在 direction 分支里，同时单独学习 magnitude。它保留 LoRA 的可 merge 优点，但改变了 LoRA 更新的几何含义。</div>\n<p>训练开销方面，直接对 <span class=\"kb-math kb-math-inline\">\\lVert V+\\Delta V\\rVert_c</span> 反传会让计算图变大。论文提出把分母视为动态计算但不接收梯度的常数，即：</p>\n<div class=\"kb-math kb-math-display\">W&#x27;=m\\frac{V+\\Delta V}{\\operatorname{detach}(\\lVert V+\\Delta V\\rVert_c)}.</div>\n<p>这样前向仍使用当前 direction 的真实范数，反向则避免范数分支带来的额外显存。论文报告该修改在 LLaMA 微调中可显著降低训练显存，精度差异很小。推理时，DoRA 与 LoRA 一样可以预先计算 <span class=\"kb-math kb-math-inline\">W&#x27;</span> 并合并到线性层，因此不会像串行 Adapter 那样增加额外推理层。</p>\n<p>相较于 AdaLoRA/QLoRA，DoRA 关注的不是“预算分配”或“量化存储”，而是 LoRA 的表达几何。它回答的问题是：在参数量近似不变的情况下，如何让 LoRA 更像 full fine-tuning？答案是把每列权重的长度和方向解耦，让低秩参数只承担方向更新。这个思路也解释了论文实验中 DoRA 在相同 rank 下经常优于 LoRA，甚至在 halved rank 配置下仍能保持竞争力。</p>",
      "quiz": {
        "q": "DoRA 为什么要把权重分解为 magnitude 和 direction？",
        "options": [
          "为了在推理时增加一个额外归一化层",
          "为了让 LoRA 只负责方向更新，并单独学习幅值，使更新模式更接近全参微调",
          "为了把所有权重量化到 4-bit",
          "为了按奇异值重要性动态删除 rank"
        ],
        "answer": 1,
        "explain": "DoRA 的核心是解耦幅值和方向：magnitude 用可训练向量表示，direction 用 LoRA 更新，从而缩小 LoRA 与 FT 的学习模式差距。"
      }
    },
    {
      "id": "galore",
      "num": 15,
      "name": "GaLore",
      "fullName": "梯度低秩投影 (GaLore)",
      "year": "2024.03",
      "org": "UT Austin",
      "parent": "lora",
      "paperUrl": "https://arxiv.org/abs/2403.03507",
      "projectUrl": "",
      "category": "peft",
      "motivation": "梯度投影减少80%优化器显存",
      "summary": "GaLore 提出在训练时投影“梯度”而不是重参数化“权重”的低秩训练策略，解决 LoRA 类方法限制参数搜索空间、预训练阶段显存仍高的问题。它让模型继续做全参数更新，但把 Adam/Adafactor 等优化器状态维护在低秩子空间中，从而显著降低优化器显存。",
      "keyPoints": [
        "核心对象从低秩权重更新转为低秩梯度：利用训练中权重梯度逐渐呈现低稳定秩的性质。",
        "保留全参数学习轨迹：不冻结主权重、不额外训练 LoRA adapter，而是把优化器处理后的低秩梯度投影回原空间更新权重。",
        "低秩投影机制：用 SVD 从当前梯度中估计投影矩阵 <span class=\"kb-math kb-math-inline\">P_t</span> 和 <span class=\"kb-math kb-math-inline\">Q_t</span>，将 <span class=\"kb-math kb-math-inline\">G_t</span> 压缩为 <span class=\"kb-math kb-math-inline\">P_t^\\top G_t Q_t</span>。",
        "子空间可周期切换：每隔若干步重新计算投影矩阵，使不同阶段的低秩更新叠加后仍能学习全秩权重。",
        "与优化器解耦：可接入 AdamW、8-bit Adam、Adafactor 等，把一阶/二阶矩等优化器状态存到压缩梯度空间。",
        "训练场景覆盖预训练与微调：在 C4 上预训练 LLaMA 1B/7B，并在 GLUE 上微调 RoBERTa，展示接近全秩训练的性能。",
        "显存收益来自优化器状态：8-bit GaLore 进一步结合量化优化器和逐层权重更新，论文报告优化器状态显存最高降低约 82.5%，总训练显存降低约 63.3%。"
      ],
      "detail": "<p><img alt=\"GaLore 低秩子空间训练示意图\" src=\"https://arxiv.org/html/2403.03507v2/x2.png\" />\n<em>图：GaLore 在一段训练步内固定低秩子空间，累计若干步后重新计算投影矩阵并切换到新的子空间。不同低秩更新块相加后，权重本身不被限制为单一低秩矩阵。</em></p>\n<p><img alt=\"GaLore 显存对比图\" src=\"https://arxiv.org/html/2403.03507v2/x1.png\" />\n<em>图：论文以 LLaMA 7B 单卡预训练为例，对比 BF16 AdamW、Adafactor、8-bit Adam 和 8-bit GaLore 等设置的估计显存消耗。GaLore 的目标不是减少参数本身，而是削减梯度和优化器状态的主要开销。</em></p>\n<pre><code class=\"language-python\"># GaLore 的核心训练逻辑，按单个权重矩阵 W 描述\nfor step, batch in enumerate(loader):\n    loss = model(batch).loss\n    G = -grad(loss, W)                     # G_t in R^{m x n}\n\n    if step % update_proj_gap == 0:\n        U, S, Vt = truncated_svd(G, rank=r)\n        P = U[:, :r]                       # left singular subspace\n        Q = Vt.T[:, :r]                    # right singular subspace\n\n    R = P.T @ G @ Q                        # compact gradient core\n    R_hat = optimizer.update(R)            # Adam/Adafactor states live here\n    G_hat = P @ R_hat @ Q.T                # project back to original space\n    W = W + lr * G_hat                     # full weight matrix is updated\n</code></pre>\n<p>GaLore 的出发点是反驳“想省显存就必须让权重更新低秩”这一常见做法。LoRA 把线性层写成 <span class=\"kb-math kb-math-inline\">W = W_0 + BA</span>，训练的是低秩因子 <span class=\"kb-math kb-math-inline\">B,A</span>，这会减少可训练参数和优化器状态，但也把搜索空间绑定在 adapter 的低秩参数化里。GaLore 认为真正占用大量显存的是 Adam 这类优化器为每个权重元素维护的一阶矩、二阶矩和梯度，而不是一定要把最终权重限制为低秩。因此它保留 <span class=\"kb-math kb-math-inline\">W\\in\\mathbb{R}^{m\\times n}</span> 的完整形状，只在优化器处理梯度时进入低维空间。</p>\n<p>论文先给出常规全秩训练的更新形式。设 <span class=\"kb-math kb-math-inline\">G_t=-\\nabla_W\\phi_t(W_t)</span> 是第 <span class=\"kb-math kb-math-inline\">t</span> 步反向传播得到的负梯度，<span class=\"kb-math kb-math-inline\">\\rho_t</span> 是 Adam 这类带状态的逐元素梯度正则器，则完整更新可以写成：</p>\n<div class=\"kb-math kb-math-display\">W_T = W_0 + \\eta \\sum_{t=0}^{T-1}\\tilde{G}_t\n    = W_0 + \\eta \\sum_{t=0}^{T-1}\\rho_t(G_t).</div>\n<p>对 Adam 来说，需要维护 <span class=\"kb-math kb-math-inline\">M_t,V_t\\in\\mathbb{R}^{m\\times n}</span>：</p>\n<div class=\"kb-math kb-math-display\">M_t=\\beta_1M_{t-1}+(1-\\beta_1)G_t,\n\\qquad\nV_t=\\beta_2V_{t-1}+(1-\\beta_2)G_t^2,</div>\n<div class=\"kb-math kb-math-display\">\\tilde{G}_t=\\frac{M_t}{\\sqrt{V_t}+\\epsilon}.</div>\n<p>这解释了为什么全参训练显存会被优化器状态放大：权重、梯度、一阶矩、二阶矩都与 <span class=\"kb-math kb-math-inline\">mn</span> 同阶。GaLore 的关键替换是只让 <span class=\"kb-math kb-math-inline\">\\rho_t</span> 看到压缩后的梯度核心，而不是原始 <span class=\"kb-math kb-math-inline\">G_t</span>：</p>\n<div class=\"kb-math kb-math-display\">\\tilde{G}_t = P_t\\,\\rho_t\\left(P_t^\\top G_t Q_t\\right)Q_t^\\top,\n\\qquad\nP_t\\in\\mathbb{R}^{m\\times r},\\ Q_t\\in\\mathbb{R}^{n\\times r}.</div>\n<p>直觉上，<span class=\"kb-math kb-math-inline\">P_t^\\top G_t Q_t</span> 是梯度在当前主奇异子空间里的低维坐标；优化器只在这个小矩阵上维护动量和方差，处理完再投影回原始维度。实际实现还会使用单侧投影来平衡投影矩阵存储与计算：当 <span class=\"kb-math kb-math-inline\">m\\le n</span> 时使用 <span class=\"kb-math kb-math-inline\">P^\\top G</span>，否则使用 <span class=\"kb-math kb-math-inline\">GQ</span>，因此压缩梯度的形状通常是 <span class=\"kb-math kb-math-inline\">r\\times n</span> 或 <span class=\"kb-math kb-math-inline\">m\\times r</span>，而不是必须使用 <span class=\"kb-math kb-math-inline\">r\\times r</span> 的双侧核心。</p>\n<p>GaLore 为什么敢压缩梯度？论文的理论部分说明，在一类可逆网络和 Transformer FFN 的分析框架下，权重梯度会随训练呈现低稳定秩。一个抽象形式是：</p>\n<div class=\"kb-math kb-math-display\">G_t = \\frac{1}{N}\\sum_{i=1}^{N}\\left(A_i-B_iW_tC_i\\right),</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">B_i,C_i</span> 为半正定结构。若训练动力学让非主导方向衰减，那么 <span class=\"kb-math kb-math-inline\">G_t</span> 的稳定秩 <span class=\"kb-math kb-math-inline\">\\operatorname{sr}(G_t)</span> 会下降。论文给出的上界包含一个随 <span class=\"kb-math kb-math-inline\">t</span> 指数衰减的项：</p>\n<div class=\"kb-math kb-math-display\">\\operatorname{sr}(G_t)\n\\le\n\\operatorname{sr}(G^{\\parallel}_{t_0})+\n\\left(\\frac{1-\\eta\\lambda_2}{1-\\eta\\lambda_1}\\right)^{2(t-t_0)}\n\\frac{\\|G_{t_0}-G^{\\parallel}_{t_0}\\|_F^2}{\\|G^{\\parallel}_{t_0}\\|_2^2}.</div>\n<p>这里的含义不需要死记公式：训练若进入某个局部稳定阶段，梯度中非关键特征方向的能量会更快衰减，剩下的主要变化集中在少数方向上。GaLore 用截断 SVD 动态跟踪这些方向：</p>\n<div class=\"kb-math kb-math-display\">G_t = U S V^\\top \\approx \\sum_{i=1}^{r}s_i u_i v_i^\\top,\n\\qquad\nP_t=[u_1,\\dots,u_r],\\ Q_t=[v_1,\\dots,v_r].</div>\n<p>子空间切换是 GaLore 区别于“固定低维训练”的关键。若 <span class=\"kb-math kb-math-inline\">P,Q</span> 永远不变，权重只能沿固定子空间累计更新，长期看仍会限制表达能力。GaLore 每隔 <span class=\"kb-math kb-math-inline\">T</span> 步重新从当前梯度估计 SVD 子空间，于是权重可以写成多段低秩更新的和：</p>\n<div class=\"kb-math kb-math-display\">W_t = W_0 + \\Delta W_{T_1}+\\Delta W_{T_2}+\\cdots+\\Delta W_{T_k}.</div>\n<p>每个 <span class=\"kb-math kb-math-inline\">\\Delta W_{T_i}</span> 处在一个低秩子空间内，但不同阶段的子空间不同，累加后不再等价于单个固定低秩 adapter。这也是它能用于从头预训练的原因：ReLoRA 等方法往往需要全秩 warmup，而 GaLore 的低显存状态从训练早期就可以启用。</p>\n<p>与 LoRA 的差别可以概括为“低秩在哪里”。LoRA 低秩化的是参数增量 <span class=\"kb-math kb-math-inline\">\\Delta W=BA</span>，所以推理时可以合并、训练时参数少，但训练轨迹天然不同于全参优化；GaLore 低秩化的是优化器看到的梯度统计，权重矩阵本身仍完整更新。当 rank 达到全秩且 <span class=\"kb-math kb-math-inline\">\\rho_t\\equiv 1</span> 时，GaLore 可退化到原始梯度下降轨迹；而 LoRA 即使 rank 足够大，同时优化 <span class=\"kb-math kb-math-inline\">B,A</span> 的非线性参数化也仍会改变优化路径。</p>\n<div class=\"key-point\">💡 关键：GaLore 的“省显存”不是因为模型更小，而是因为 Adam 的 <span class=\"kb-math kb-math-inline\">M,V</span> 不再为完整 <span class=\"kb-math kb-math-inline\">m\\times n</span> 梯度保存状态。它适合显存瓶颈主要来自优化器状态的 LLM 预训练/微调场景，也能和 8-bit optimizer、逐层权重更新等工程手段叠加。</div>",
      "quiz": {
        "q": "GaLore 与 LoRA 在低秩化对象上的核心区别是什么？",
        "options": [
          "GaLore 低秩化权重矩阵本身，LoRA 低秩化梯度矩阵",
          "GaLore 低秩化优化器处理的梯度统计，LoRA 低秩化可训练权重增量",
          "GaLore 只用于推理量化，LoRA 只用于训练量化",
          "GaLore 必须冻结主模型权重，LoRA 必须更新全模型权重"
        ],
        "answer": 1,
        "explain": "GaLore 将梯度投影到低秩子空间并在其中维护优化器状态，再投影回原空间更新完整权重；LoRA 则训练低秩 adapter 参数 BA。"
      }
    },
    {
      "id": "vera",
      "num": 16,
      "name": "VeRA",
      "fullName": "向量随机矩阵适配 (VeRA)",
      "year": "2024.05",
      "org": "University of Amsterdam",
      "parent": "lora",
      "paperUrl": "https://arxiv.org/abs/2310.11454",
      "projectUrl": "",
      "category": "peft",
      "motivation": "冻结共享矩阵减少10倍参数量",
      "summary": "VeRA 提出用冻结且跨层共享的随机低秩矩阵替代 LoRA 中每层可训练的 \\(A,B\\) 矩阵，只训练很小的缩放向量 \\(b,d\\)，解决 LoRA 在多任务、多用户适配时仍需存储大量 adapter 参数的问题。它保持与 LoRA 类似的可合并、无额外推理延迟特性，但显著降低每个任务需要保存的参数量。",
      "keyPoints": [
        "继承 LoRA 的低秩残差路径：仍在冻结预训练权重 <span class=\"kb-math kb-math-inline\">W_0</span> 上添加低秩更新 <span class=\"kb-math kb-math-inline\">\\Delta W</span>。",
        "冻结随机矩阵：低秩矩阵 <span class=\"kb-math kb-math-inline\">A,B</span> 随机初始化后不训练，可由 RNG seed 重建，减少每个 adapter 的存储需求。",
        "跨层共享矩阵：同一对随机矩阵在适配层间共享，层间差异由可训练缩放向量表达。",
        "只训练向量参数：每层训练输出缩放向量 <span class=\"kb-math kb-math-inline\">b</span> 和 rank 维缩放向量 <span class=\"kb-math kb-math-inline\">d</span>，用 <span class=\"kb-math kb-math-inline\">\\Lambda_b</span> 与 <span class=\"kb-math kb-math-inline\">\\Lambda_d</span> 调制随机矩阵。",
        "参数量从 LoRA 的 <span class=\"kb-math kb-math-inline\">2L_{\\text{tuned}}d_{\\text{model}}r</span> 下降到 VeRA 的 <span class=\"kb-math kb-math-inline\">L_{\\text{tuned}}(d_{\\text{model}}+r)</span>。",
        "初始化设计关键：<span class=\"kb-math kb-math-inline\">A,B</span> 使用 Kaiming 等随机初始化，<span class=\"kb-math kb-math-inline\">b</span> 初始化为 0 以保证初始输出不扰动原模型，<span class=\"kb-math kb-math-inline\">d</span> 初始化为非零常数。",
        "推理无额外延迟：训练结束后 <span class=\"kb-math kb-math-inline\">\\Lambda_bB\\Lambda_dA</span> 可合并进原始权重矩阵。",
        "实验覆盖 GLUE、E2E、Alpaca 指令微调、ViT 图像分类；在 LLaMA/LLaMA2 指令微调中以约百倍更少训练参数接近 LoRA 表现。"
      ],
      "detail": "<p><img alt=\"VeRA 与 LoRA 结构对比图\" src=\"https://ar5iv.labs.arxiv.org/html/2310.11454/assets/x1.png\" />\n<em>图：左侧 LoRA 训练每层低秩矩阵 <span class=\"kb-math kb-math-inline\">A,B</span>；右侧 VeRA 冻结并共享随机矩阵，只训练缩放向量 <span class=\"kb-math kb-math-inline\">d,b</span>。两者最终都可以把低秩分支合并回原权重，因此推理时没有额外层级延迟。</em></p>\n<pre><code class=\"language-python\"># VeRA 的核心逻辑，按一个线性层 W0: R^{d_in}-&gt;R^{d_out} 描述\n# A, B 是共享且冻结的随机矩阵，可由同一个 seed 重建\nA = frozen_random_matrix(shape=(r, d_in), init=&quot;kaiming&quot;, seed=seed_A)\nB = frozen_random_matrix(shape=(d_out, r), init=&quot;kaiming&quot;, seed=seed_B)\n\n# 每个被适配的层只保存两个可训练向量\nb = zeros(d_out)              # 让初始 delta W 为 0\nd = constant(c, shape=(r,))   # 非零 rank 缩放\n\nfor batch in finetune_loader:\n    x = layer_input(batch)\n    delta = diag(b) @ B @ diag(d) @ A\n    h = W0 @ x + delta @ x\n    loss = task_loss(h)\n    update_only([b, d])       # W0, A, B 都不更新\n\n# 部署前可合并：W_merged = W0 + diag(b) @ B @ diag(d) @ A\n</code></pre>\n<p>VeRA 的问题设定比“能否微调一个模型”更偏向“能否保存大量个性化 adapter”。LoRA 已经把全量微调的参数量从 <span class=\"kb-math kb-math-inline\">mn</span> 降到 <span class=\"kb-math kb-math-inline\">r(m+n)</span>，但如果一个服务要为成千上万个用户或任务保留不同 LoRA 权重，存储仍会快速膨胀。论文举例说明，在 GPT-3 这类深宽模型上，即便只对 query/value 层使用 rank 16 LoRA，每个适配版本也会带来可观的参数文件；当版本数达到百万级时，问题从训练显存转变成 adapter 存储和切换成本。</p>\n<p>LoRA 的基本形式是：</p>\n<div class=\"kb-math kb-math-display\">h = W_0x + \\Delta W x = W_0x + BAx,</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">W_0</span> 冻结，<span class=\"kb-math kb-math-inline\">B\\in\\mathbb{R}^{d_{out}\\times r}</span>、<span class=\"kb-math kb-math-inline\">A\\in\\mathbb{R}^{r\\times d_{in}}</span> 是每层独立训练的低秩矩阵。VeRA 保留这条“低秩残差分支”，但把可训练矩阵替换为冻结随机矩阵加可训练向量缩放：</p>\n<div class=\"kb-math kb-math-display\">h = W_0x + \\Delta W x\n  = W_0x + \\Lambda_b B \\Lambda_d A x.</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">A,B</span> 不再为每个任务学习，<span class=\"kb-math kb-math-inline\">\\Lambda_b=\\operatorname{diag}(b)</span> 负责按输出通道缩放，<span class=\"kb-math kb-math-inline\">\\Lambda_d=\\operatorname{diag}(d)</span> 负责按 rank 维缩放。可以把它理解为：随机矩阵提供一个固定的候选低秩基底，训练过程只学习“哪些输出维度和哪些 rank 通道应该被放大、压低或关闭”。这样虽然牺牲了一部分自由度，但避免了为每层、每任务存储完整 <span class=\"kb-math kb-math-inline\">A,B</span>。</p>\n<p>参数量差异来自矩阵参数与向量参数的数量级差别。若有 <span class=\"kb-math kb-math-inline\">L_{\\text{tuned}}</span> 个适配层、隐藏维度近似为 <span class=\"kb-math kb-math-inline\">d_{\\text{model}}</span>、rank 为 <span class=\"kb-math kb-math-inline\">r</span>，LoRA 的训练参数量近似为：</p>\n<div class=\"kb-math kb-math-display\">|\\Theta_{\\text{LoRA}}|=2L_{\\text{tuned}}d_{\\text{model}}r.</div>\n<p>VeRA 每层主要保存 <span class=\"kb-math kb-math-inline\">b\\in\\mathbb{R}^{d_{model}}</span> 和 <span class=\"kb-math kb-math-inline\">d\\in\\mathbb{R}^{r}</span>，因此为：</p>\n<div class=\"kb-math kb-math-display\">|\\Theta_{\\text{VeRA}}|=L_{\\text{tuned}}(d_{\\text{model}}+r).</div>\n<p>当 <span class=\"kb-math kb-math-inline\">r</span> 增大时，LoRA 参数随 <span class=\"kb-math kb-math-inline\">d_{model}r</span> 成倍增长，而 VeRA 只随 <span class=\"kb-math kb-math-inline\">r</span> 线性增加一个很小的向量项。论文表格中在 RoBERTa-large、GPT-3 等设置下展示了这种差异：rank 越大、层越宽，VeRA 相对 LoRA 的存储优势越明显。</p>\n<p>初始化是 VeRA 能稳定工作的关键。论文对冻结随机矩阵使用 Kaiming 初始化，使不同 rank 下矩阵乘积的方差更可控，避免每个 rank 都重新调学习率。<span class=\"kb-math kb-math-inline\">b</span> 初始化为零，这与 LoRA 常把其中一个低秩矩阵初始化为零的思想一致：训练开始时 <span class=\"kb-math kb-math-inline\">\\Delta W=0</span>，模型输出完全等于原始预训练模型，避免随机 adapter 一开始破坏表示。<span class=\"kb-math kb-math-inline\">d</span> 初始化为非零常数，使 rank 通道在 <span class=\"kb-math kb-math-inline\">b</span> 开始学习后能立即提供可调制路径。</p>\n<p>为什么随机矩阵可以工作？VeRA 借用了随机投影和低内在维度的经验事实：大模型适配某个下游任务时，真正需要学习的自由度远少于完整参数空间。冻结的 <span class=\"kb-math kb-math-inline\">A,B</span> 不需要精确等于最优低秩基，只要提供足够丰富且可重用的随机方向，<span class=\"kb-math kb-math-inline\">b,d</span> 就能选择和组合这些方向。对部署系统而言，<span class=\"kb-math kb-math-inline\">A,B</span> 可通过 seed 重新生成，adapter 文件主要由很小的向量组成，因此更适合多租户、个性化助手、边缘设备或需要频繁切换任务头的场景。</p>\n<p>训练与推理流程也保持 PEFT 的工程优势。训练时冻结 <span class=\"kb-math kb-math-inline\">W_0,A,B</span>，只对 <span class=\"kb-math kb-math-inline\">b,d</span> 反向传播并维护优化器状态；推理前把 <span class=\"kb-math kb-math-inline\">\\Lambda_bB\\Lambda_dA</span> 算成一个普通矩阵增量并加到 <span class=\"kb-math kb-math-inline\">W_0</span>，即可删除额外分支。因此 VeRA 不像串联 adapter 那样增加额外前向层，也不像 prompt tuning 那样改变输入长度。它与 LoRA 一样具备“训练时轻量、部署时可合并”的性质，但 adapter 存储更小。</p>\n<p>与 LoRA 的权衡在于表达能力与存储效率。LoRA 每层学习完整 <span class=\"kb-math kb-math-inline\">A,B</span>，自由度更高；VeRA 用共享随机 <span class=\"kb-math kb-math-inline\">A,B</span> 固定了候选方向，层特异性只靠向量缩放表达，所以在极难任务或需要高精度拟合时可能不如全自由 LoRA 灵活。论文的实验结论是，在 GLUE、E2E、图像分类和 LLaMA/LLaMA2 指令微调中，这种表达能力损失通常较小，而参数减少可达到 10 倍甚至 100 倍量级，尤其适合“每个任务都要存一个 adapter”的应用。</p>\n<div class=\"key-point\">💡 关键：VeRA 不是把 LoRA 的 rank 简单调小，而是把“可学习矩阵”换成“冻结随机基底 + 可学习缩放向量”。这使 adapter 大小与 rank 的关系变得更温和，也让随机矩阵可以通过 seed 共享和重建。</div>",
      "quiz": {
        "q": "VeRA 相比 LoRA 主要通过什么方式减少每个任务需要保存的参数？",
        "options": [
          "删除低秩分支，只训练原始模型最后一层",
          "把 LoRA 的 A、B 矩阵量化到 4-bit，但仍逐层保存",
          "冻结并共享随机 A、B 矩阵，只保存可训练缩放向量 b 和 d",
          "把所有 Transformer 层替换成卷积层"
        ],
        "answer": 2,
        "explain": "VeRA 的核心是随机 A、B 不作为每个 adapter 的可训练权重保存，任务差异主要由小向量 b、d 表示。"
      }
    },
    {
      "id": "flan_t5",
      "num": 17,
      "name": "FLAN-T5",
      "fullName": "指令微调T5 (FLAN-T5)",
      "year": "2023.02",
      "org": "Google Research",
      "parent": "flan",
      "paperUrl": "https://arxiv.org/abs/2210.11416",
      "projectUrl": "",
      "category": "multitask",
      "motivation": "1.8K任务+CoT数据混合训练",
      "summary": "FLAN-T5 将 T5 系列模型放入 Flan 指令微调流程中，用 1.8K 个任务和少量链式思维数据训练模型更好地遵循自然语言指令，解决预训练语言模型在未见任务上需要大量示例、指令泛化弱的问题。它的核心不是改变 T5 架构，而是系统性扩大指令任务混合、模型规模和 CoT 微调数据。",
      "keyPoints": [
        "使用 Flan 指令微调范式：把多源任务统一渲染成自然语言 instruction-input-output 格式。",
        "数据规模扩大到 1.8K 任务：整合 Muffin、T0-SF、NIV2 和 CoT 四类 mixture，覆盖 473 个数据集与 146 个任务类别。",
        "同时训练 direct 与 CoT 能力：在常规答案数据外加入 9 个带人工链式思维标注的数据集，缓解指令微调损害推理提示的问题。",
        "支持多种提示设置：训练模板覆盖有无 exemplars、zero-shot、few-shot、direct answer 和 chain-of-thought answer。",
        "应用于多种模型族：论文主线研究 PaLM、T5、U-PaLM，公开发布 Flan-T5 80M 到 11B checkpoint。",
        "评估强调未见任务泛化：MMLU、BBH、TyDiQA、MGSM、开放式生成和 Responsible AI 基准均不直接作为训练任务。",
        "训练目标仍是标准语言建模/seq2seq 交叉熵：FLAN-T5 的收益主要来自任务混合和格式化，而非新网络模块。",
        "关键发现：模型规模、任务数量和 CoT 数据都会影响效果；加入 CoT 数据后，模型在 direct 与 CoT 评测上整体更稳。"
      ],
      "detail": "<p><img alt=\"FLAN 指令微调总览\" src=\"https://ar5iv.labs.arxiv.org/html/2210.11416/assets/x1.png\" />\n<em>图：论文将多种语言模型在 1.8K 个指令化任务上微调，再在未见任务上评估；训练覆盖 zero-shot/few-shot 以及 direct/chain-of-thought 等不同提示场景。</em></p>\n<p><img alt=\"FLAN 任务混合组成\" src=\"https://ar5iv.labs.arxiv.org/html/2210.11416/assets/x2.png\" />\n<em>图：Flan 微调数据由 Muffin、T0-SF、NIV2、CoT 等 mixture 组成，共 473 个数据集、146 个任务类别、1,836 个任务。</em></p>\n<p><img alt=\"FLAN 模板格式示意\" src=\"https://ar5iv.labs.arxiv.org/html/2210.11416/assets/x3.png\" />\n<em>图：同一任务可被渲染成不同模板，包括是否带 instruction、是否带 few-shot exemplars、是否要求 chain-of-thought。模板多样性是指令泛化的重要来源。</em></p>\n<pre><code class=\"language-python\"># FLAN-T5 的训练流程抽象\nmixtures = [Muffin, T0_SF, NIV2, CoT]\nmodel = T5_checkpoint(size=&quot;80M..11B&quot;)\n\nfor step in range(num_steps):\n    mixture = sample_mixture(mixtures, proportions=flan_recipe)\n    task = sample_task(mixture)\n    example = sample_example(task)\n    template = sample_instruction_template(task)\n\n    x = render_input(example, template,\n                     include_exemplars=template.few_shot,\n                     ask_for_cot=template.chain_of_thought)\n    y = render_target(example,\n                      include_rationale=template.chain_of_thought)\n\n    loss = -sum(log p_model(y_t | y_&lt;t, x) for t in range(len(y)))\n    update(model.parameters(), loss)\n</code></pre>\n<p>FLAN-T5 要解决的不是“如何设计一个新的 Transformer 层”，而是“如何让预训练模型真正把自然语言指令当成任务接口”。普通 T5 通过 span corruption 等预训练目标学习语言和知识，但面对一个未见任务时，模型往往需要 few-shot 示例才能知道输出格式、标签空间和推理方式。Flan 把大量任务统一改写为指令形式，例如“判断下面两句话是否语义等价”“根据问题从段落中抽取答案”“一步步推理并给出最终答案”，让模型在微调阶段反复看到“自然语言说明 -&gt; 目标行为”的映射。</p>\n<p>从优化角度看，FLAN-T5 仍是标准 encoder-decoder 条件生成。给定指令化输入 <span class=\"kb-math kb-math-inline\">x</span> 和目标输出 <span class=\"kb-math kb-math-inline\">y=(y_1,\\dots,y_T)</span>，训练目标可写成：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}(\\theta)\n= -\\mathbb{E}_{(x,y)\\sim\\mathcal{M}}\n\\sum_{t=1}^{T}\\log p_\\theta(y_t\\mid y_{&lt;t},x),</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{M}</span> 是由多个任务 mixture 组成的训练分布。如果样本是 CoT 格式，目标 <span class=\"kb-math kb-math-inline\">y</span> 不只是最终答案 <span class=\"kb-math kb-math-inline\">a</span>，还包含推理链 <span class=\"kb-math kb-math-inline\">r</span>，即 <span class=\"kb-math kb-math-inline\">y=[r; a]</span>。这意味着模型不仅拟合答案，还学习在需要推理时生成中间步骤。对 T5 来说，输入指令进入 encoder，decoder 自回归生成答案或“推理过程 + 答案”。</p>\n<p>论文的数据设计有三个层次。第一层是任务来源：Muffin 包含早期 FLAN 风格任务和新增对话/程序合成任务，T0-SF 来自 T0 但去除与 Muffin 重叠部分，NIV2 提供大规模自然指令任务，CoT mixture 则包含 9 个带人工推理链的数据集。第二层是模板：同一数据集可以有多个自然语言说明、不同的输入组织方式、是否添加 few-shot exemplars。第三层是任务采样和比例控制：不同 mixture 的任务数量相差很大，如果简单按样本数混合，大型 mixture 会淹没小而关键的 CoT 或高质量任务，因此论文使用 mixture proportion 和 example cap 控制训练分布。</p>\n<p>为什么 CoT 数据是必要的？早期指令微调主要教模型直接给答案，但推理评测常用“Let's think step by step”或显式 CoT 格式。如果微调数据几乎全是 direct answer，模型会形成“短答”偏好，在 CoT 提示下反而不愿展开推理，导致 reasoning benchmark 受损。论文发现，只加入 9 个 CoT 数据集就能改善这种情况：模型既保留 direct prompting 的可用性，又能在 BBH、MGSM 等任务上更好地利用链式思维。</p>\n<p>FLAN-T5 与原始 T5 的关系可以理解为“同架构，不同任务接口”。T5 已经把 NLP 任务统一为 text-to-text，FLAN-T5 进一步把任务描述也显式写进输入，使模型在微调阶段学习“读懂任务说明”。因此，推理时用户不需要为每个任务训练新头或设计复杂标签映射，只需要给出自然语言 prompt。这个设计对 zero-shot 尤其重要：模型不是靠见过同一个数据集来回答，而是靠见过大量类似指令后迁移到新任务。</p>\n<p>论文的扩展实验说明了三个变量的影响。首先，模型越大，指令微调收益越稳定，PaLM 8B、62B、540B 都因多任务指令微调提升未见任务表现。其次，任务数量增加有收益，但大部分收益在加入前数百个任务时出现，后续从 282 增至 1,836 的边际收益变小，说明任务多样性比机械增加任务数更关键。最后，CoT 数据虽然数量很少，却改变了模型对推理格式的适应能力，是 FLAN-T5 区别于只做普通多任务 SFT 的重要因素。</p>\n<p>对实际使用者而言，FLAN-T5 的价值在于提供公开、可复用的指令微调 T5 checkpoint。相比只预训练的 T5，FLAN-T5 更适合直接作为 zero-shot/few-shot 指令模型、评测基线或下游 SFT 初始化；相比闭源大模型，它的规模从 80M 到 11B 可选，便于在资源受限场景部署。需要注意的是，FLAN-T5 不是 RLHF 模型，也没有显式偏好优化阶段；它主要学习“按指令完成任务”，而不是通过人类偏好奖励进一步塑造对话风格。</p>\n<div class=\"key-point\">💡 关键：FLAN-T5 的算法核心是“任务混合 + 模板化指令 + CoT 目标”的监督微调配方。它把 T5 的 text-to-text 框架升级成 instruction-to-text 框架，训练目标简单，但数据组织决定了泛化能力。</div>",
      "quiz": {
        "q": "FLAN-T5 中加入少量 CoT 数据的主要作用是什么？",
        "options": [
          "减少 T5 模型参数量，使推理更快",
          "让模型只输出更短答案，避免生成解释",
          "提升模型在需要链式推理的提示和评测中的适应能力",
          "替代交叉熵损失，改用强化学习训练"
        ],
        "answer": 2,
        "explain": "CoT 数据把推理链作为监督目标，使模型学习在需要时生成中间推理步骤，而不是只偏向 direct answer。"
      }
    },
    {
      "id": "selective_reflection",
      "num": 18,
      "name": "Selective Reflection-Tuning",
      "fullName": "选择性反思微调 (Selective Reflection-Tuning)",
      "year": "2026.01",
      "org": "Tsinghua University",
      "parent": "self_instruct",
      "paperUrl": "https://arxiv.org/abs/2402.10110",
      "projectUrl": "",
      "category": "frontier",
      "motivation": "学生模型自主选择高质量数据",
      "summary": "Selective Reflection-Tuning 提出教师模型反思改写、学生模型选择接收的数据回收流程，解决传统 Self-Instruct / Reflection-Tuning 只由教师决定数据质量、忽略目标学生模型兼容性的问题。它用 IFD 衡量样本对学生的“难度”，用 reversed-IFD 衡量响应对指令的“可学习可行性”，从而自动构造更适合当前学生模型的 SFT 数据。",
      "keyPoints": [
        "两阶段数据回收流程：Selective Instruction Reflection 先改写指令，Selective Response Reflection 再改写响应。",
        "教师模型负责 reflection：基于清晰度、复杂度、相关性、完整性等 criteria 对原始 instruction-response pair 进行批判和重写。",
        "学生模型负责 selection：不再依赖 GPT-4 或额外 judge，而是直接用待训练学生模型的统计量决定是否接收教师改写。",
        "IFD 指标用于指令选择：比较原样本和改写样本的 Instruction-Following Difficulty，保留对学生更有训练价值、更具挑战性的指令版本。",
        "reversed-IFD 指标用于响应选择：衡量给定响应时学生能否反推出对应指令，保留响应更能支撑指令、语义更匹配的样本。",
        "数据来源不是重新收集，而是在 Alpaca、WizardLM 等现有 instruction-tuning 数据上做自动反思、选择和回收。",
        "训练出的 sRecycled Alpaca / sRecycled WizardLM 在少量数据条件下取得强性能，表明“学生兼容的数据质量”比单纯扩大数据规模更关键。"
      ],
      "detail": "<p><img alt=\"Selective Reflection-Tuning 总体流程\" src=\"https://arxiv.org/html/2402.10110v2/extracted/5652518/Figures/reflection_main.png\" />\n<em>图：论文 Figure 1 展示了两阶段 teacher-student collaboration。教师模型先反思并生成改写候选，学生模型再用 IFD / r-IFD 选择是否接收。</em></p>\n<p>传统指令微调数据增强通常是 teacher-dominated：Self-Instruct 依赖强模型生成新任务，WizardLM / Reflection-Tuning 让强教师改写指令或响应，DEITA 等方法再用强模型打分筛选。这类方法默认“教师认为更好”的样本就一定适合学生，但论文指出这会带来两个偏差：第一，教师生成本身有随机性，反思后的样本可能看似更复杂却破坏了原问题；第二，评估模型与真正要微调的学生模型不同，judge 的偏好未必等于学生的学习需求。因此 Selective Reflection-Tuning 把问题改写为：让教师提出改进候选，但最终由学生模型基于自身困惑度统计量决定是否学习。</p>\n<p>方法从一个原始样本 <span class=\"kb-math kb-math-inline\">(x, y)</span> 出发，其中 <span class=\"kb-math kb-math-inline\">x</span> 是 instruction，<span class=\"kb-math kb-math-inline\">y</span> 是 response。SFT 的常规目标仍然是最大化给定指令时响应的条件似然，等价于最小化：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\mathrm{SFT}}(\\theta)=-\\sum_{t=1}^{|y|}\\log p_{\\theta}(y_t \\mid x, y_{&lt;t}).</div>\n<p>Selective Reflection-Tuning 不改变最终 SFT 损失，而是改变进入 SFT 的数据分布。它先让 teacher 在原始 <span class=\"kb-math kb-math-inline\">(x,y)</span> 和一组 instruction criteria <span class=\"kb-math kb-math-inline\">C_x</span> 上生成 critique，再输出候选 <span class=\"kb-math kb-math-inline\">(x&#x27;, y&#x27;)</span>。这个候选不会被无条件接收，而是交给 student 计算 IFD。直觉上，IFD 比较“有指令条件”和“无指令条件”下拟合响应的困惑度差异，可写成：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{IFD}_{\\theta}(x,y)=\\frac{\\mathrm{PPL}_{\\theta}(y\\mid x)}{\\mathrm{PPL}_{\\theta}(y)}.</div>\n<p>当 IFD 更高时，说明该 instruction-response pair 对学生更有挑战，单靠语言模型先验不容易直接生成目标响应，指令提供了更明确的学习信号。第一阶段的选择规则可概括为：</p>\n<div class=\"kb-math kb-math-display\">(x^{*},y^{*})=\n\\begin{cases}\n(x&#x27;,y&#x27;), &amp; \\mathrm{IFD}_{\\theta}(x&#x27;,y&#x27;) &gt; \\mathrm{IFD}_{\\theta}(x,y),\\\\\n(x,y), &amp; \\text{otherwise.}\n\\end{cases}</div>\n<p>第二阶段关注 response，因为只提高 instruction 难度并不保证 answer 更好。教师再次基于 response criteria <span class=\"kb-math kb-math-inline\">C_y</span> 反思 <span class=\"kb-math kb-math-inline\">(x^{*},y^{*})</span>，生成新的响应候选 <span class=\"kb-math kb-math-inline\">\\tilde{y}</span>。论文提出 reversed-IFD，把原先“指令是否帮助生成响应”的方向反过来，考察“响应是否足以让学生反推出指令”。可用同样的困惑度比例直观表示为：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{rIFD}_{\\theta}(x,y)=\\frac{\\mathrm{PPL}_{\\theta}(x\\mid q(y))}{\\mathrm{PPL}_{\\theta}(x)},</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">q(y)</span> 是把响应包装成“请根据答案猜测可能指令”的查询模板。r-IFD 越低，说明给定响应时学生越容易恢复对应 instruction，响应和指令的语义约束越一致，样本越可学。第二阶段选择规则因此与 IFD 相反：保留 r-IFD 更低的响应版本。论文最后还丢弃没有经过 response reflection 的样本，以保持响应分布一致，得到 selective recycled data，再用常规 SFT 训练 sRecycled Models。</p>\n<pre><code class=\"language-python\"># Selective Reflection-Tuning 核心伪代码\n# D: 原始 SFT 数据；T: teacher LLM；S: student base model\nD_recycled = []\n\nfor x, y in D:\n    # Phase 1: Selective Instruction Reflection\n    critique_x = T.reflect(sample=(x, y), criteria=&quot;instruction quality&quot;)\n    x_new, y_new = T.rewrite_instruction(sample=(x, y), critique=critique_x)\n\n    if IFD(S, x_new, y_new) &gt; IFD(S, x, y):\n        x1, y1 = x_new, y_new\n    else:\n        x1, y1 = x, y\n\n    # Phase 2: Selective Response Reflection\n    critique_y = T.reflect(sample=(x1, y1), criteria=&quot;response quality&quot;)\n    y2 = T.rewrite_response(sample=(x1, y1), critique=critique_y)\n\n    if rIFD(S, x1, y2) &lt; rIFD(S, x1, y1):\n        D_recycled.append((x1, y2))\n    else:\n        # 论文实践中为了响应分布一致，会过滤未 response-reflected 的样本\n        continue\n\nstudent = SFT(student=S, data=D_recycled)\n</code></pre>\n<div class=\"key-point\">💡 关键：教师只负责“提出候选改进”，学生才负责“判断是否值得学习”。这使得数据选择从通用质量评分变成 model-specific compatibility 评估。</div>\n<p>这种设计与 Self-Instruct 的区别非常直接。Self-Instruct 主要扩大指令集合，质量控制依赖规则过滤和强模型能力；Reflection-Tuning 强调让教师从多个 criteria 反思并改写现有样本，但仍然由教师主导。Selective Reflection-Tuning 的新增价值在于 selection 不是 another LLM judge，而是直接读取学生模型的条件困惑度。换言之，它不问“GPT-4 喜欢哪个样本”，而问“这个 base student 会从哪个样本中获得更有效的梯度信号”。这对于 7B/13B 学生尤其重要，因为它们的能力边界与教师模型差异很大。</p>\n<p>训练流程上，Selective Reflection-Tuning 可以看作一种离线数据生成加筛选算法，不需要在每个 SFT step 内调用 teacher。实际实现时先对 Alpaca/WizardLM 样本批量调用 teacher 生成 reflection 和候选，再用 student 前向计算 IFD/r-IFD 分数，形成新的数据文件，最后按标准 causal language modeling loss 训练。由于 IFD/r-IFD 只需要学生模型打困惑度，比让 GPT-4 逐条 pairwise judge 更便宜，也避免引入独立 reward model 的偏好错位。</p>\n<p>实验部分不是该算法的核心，但能佐证机制：论文在 Alpaca 和 WizardLM 上构造 sRecycled Alpaca / sRecycled WizardLM，并用 AlpacaEval、Open LLM Leaderboard、MT-Bench、pairwise comparison 和 human study 评估。消融显示，仅 reflection 不如 reflection + selection；随机选择、coherence、perplexity 等替代选择策略也弱于 IFD/r-IFD 组合。这说明收益不是来自“多生成一点数据”，而是来自“让学生模型参与决定哪些教师改写真正可学”。</p>",
      "quiz": {
        "q": "Selective Reflection-Tuning 中 reversed-IFD 的主要作用是什么？",
        "options": [
          "衡量响应是否足以支持学生反推出对应指令，从而判断样本可学习性",
          "计算教师模型生成响应的速度，用于过滤高延迟样本",
          "替代 SFT 交叉熵损失，直接优化学生模型参数",
          "强制所有样本都变得更长，以提高回答详细程度"
        ],
        "answer": 0,
        "explain": "r-IFD 将 IFD 的方向反过来，评估给定响应时学生恢复指令的难易程度；值越低通常表示响应和指令更匹配、更可学。"
      }
    },
    {
      "id": "llamoco",
      "num": 19,
      "name": "Llamoco",
      "fullName": "优化代码指令微调 (Llamoco)",
      "year": "2026.01",
      "org": "Peking University",
      "parent": "flan_t5",
      "paperUrl": "https://ieeexplore.ieee.org/abstract/document/11359290/",
      "projectUrl": "",
      "category": "frontier",
      "motivation": "减少代码生成特征层面混淆",
      "summary": "LLaMoCo 提出面向优化问题代码生成的指令微调框架，把“给定优化问题描述，生成可执行优化器代码”建模为 code-to-code SFT，并用对比学习 warm-up 缓解同一问题多种描述与不同优化器标签之间的表示混淆。它解决了直接 prompt LLM 充当优化器时效率低、prompt 敏感、缺少领域优化知识的问题。",
      "keyPoints": [
        "首个面向 optimization code generation 的 LLM instruction-tuning 框架，让通用 Code LLM 生成专门求解优化问题的 Python 优化器代码。",
        "输入不是历史解序列，而是格式化问题 prompt，包含目标函数、变量维度、边界、约束等 Python/LaTeX 描述。",
        "输出是可执行优化器实现，来自对算法池中多类优化器的基准测试和超参数搜索。",
        "构造大规模优化指令集：合成无约束和有约束优化实例，覆盖 unimodal/multimodal、separable/non-separable、smooth/non-smooth 等 landscape。",
        "引入两阶段训练：先做 contrastive warm-up 对齐同义问题 prompt 的潜在表示，再做常规 next-token / sequence-to-sequence 指令微调。",
        "对比 warm-up 用“是否对应同一最优优化器”定义正负样本，减少特征层面混淆并加速后续 SFT 收敛。",
        "使用 balanced data sampling 缓解优化器类别长尾，避免模型只学习出现频次最高的优化器家族。",
        "在 CodeGen-Mono 350M、Phi、Code Llama 等基础模型上验证，CodeGen-Mono 经 LLaMoCo 微调后在合成和真实优化问题上可超过 GPT-4 Turbo 等直接 prompting 基线。"
      ],
      "detail": "<p><img alt=\"LLaMoCo 概念总览\" src=\"https://arxiv.org/html/2403.01131v1/x1.png\" />\n<em>图：论文 Figure 1 对比三类范式。左侧是反复要求 LLM 生成更好解的 solution-to-solution，中央是直接 prompt 生成优化器代码，右侧是 LLaMoCo：先用问题-优化器代码指令集微调，再一次性生成优化器程序。</em></p>\n<p>LLaMoCo 的出发点是：LLM 可以被当成优化器，但直接让它在对话中不断提出更好解会非常低效。OPRO 一类方法需要把当前最优解、历史候选解和目标值放进上下文，随着变量维度和迭代次数增加，上下文窗口和 token 成本都会成为瓶颈。另一类方法直接让 LLM 写一个 optimizer program，推理轮数少得多，但 prompt 往往需要包含问题类型、推荐算法、实现细节等专家 hint，否则生成代码容易不稳定。LLaMoCo 的判断是：这些 domain-specific optimization knowledge 不应每次靠 prompt 临时注入，而应通过 instruction tuning 固化到模型参数中。</p>\n<p>论文把优化问题抽象为：</p>\n<div class=\"kb-math kb-math-display\">\\min_{\\mathbf{x}\\in\\mathbb{R}^{d}} f(\\mathbf{x})\n\\quad \\text{s.t.}\\quad g_i(\\mathbf{x})\\le 0,\n\\; h_j(\\mathbf{x})=0,\n\\; \\ell \\le \\mathbf{x}\\le u.</div>\n<p>在数据构造阶段，作者先建立基本函数集合和约束集合，再通过 composition 与 hybrid 两种方式合成不同 landscape。composition 是对多个基本函数做线性组合，hybrid 则把决策变量维度拆成若干片段，让不同基本函数作用在不同子空间后求和。这样得到的问题覆盖多峰、非可分、非光滑、局部平坦等性质，更接近真实优化任务。随后，系统从算法池中为每个实例搜索表现最好的优化器及超参数，算法池覆盖 evolutionary algorithms、differential evolution、particle swarm optimization、evolution strategies、Bayesian optimization、local search、numerical optimization 等家族；最终把“问题 prompt”作为输入，把“选中优化器的 Python 实现”作为输出。</p>\n<p>LLaMoCo 的关键不是简单收集 prompt-code pair，而是处理“描述和优化器标签之间的非一一对应”。同一个数学问题可以被学生用 Python 代码、LaTeX 公式、不同变量命名、不同约束顺序描述；这些 prompt 文本表面差异很大，但应该生成同一个优化器。反过来，两个表面相近的函数描述可能因为约束、维度或 landscape 细节不同，最合适的优化器完全不同。如果直接 SFT，模型在 token 级损失中很难先学会“同义问题描述聚在一起、不同优化策略分开”，这就是任务清单中所说的特征层面混淆。</p>\n<p>论文用 contrastive warm-up 先塑造表示空间。对 decoder-only code model，取最后一个 self-attention block 的输出 embedding 作为 prompt 表示 <span class=\"kb-math kb-math-inline\">\\mathbf{z}</span>。两个 prompt 的距离可用余弦距离表示：</p>\n<div class=\"kb-math kb-math-display\">D(\\mathbf{z}_i,\\mathbf{z}_j)=1-\\frac{\\mathbf{z}_i^{\\top}\\mathbf{z}_j}{\\|\\mathbf{z}_i\\|\\|\\mathbf{z}_j\\|}.</div>\n<p>若两个 prompt 对应同一个 selected optimizer，则它们是正样本，训练目标让距离变小；若对应不同 optimizer，则它们是负样本，目标让距离至少大于 margin <span class=\"kb-math kb-math-inline\">m</span>：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\mathrm{con}}(i,j)=\n\\mathbb{1}[a_i=a_j]D(\\mathbf{z}_i,\\mathbf{z}_j)^2\n+\n\\mathbb{1}[a_i\\ne a_j]\\max(0,m-D(\\mathbf{z}_i,\\mathbf{z}_j))^2.</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">a_i</span> 表示第 <span class=\"kb-math kb-math-inline\">i</span> 个 prompt 通过 benchmark 选出的目标优化器。warm-up 不生成完整代码，所以比 SFT 阶段便宜；它的作用是先把 optimization semantics 编码到 latent space，再让 next-token loss 学习具体代码实现。</p>\n<pre><code class=\"language-python\"># LLaMoCo 两阶段训练伪代码\n# P: 优化问题实例集合；A: 优化器算法池；M: 代码语言模型\ninstruction_set = []\n\nfor problem in synthesize_optimization_problems(P):\n    candidates = []\n    for optimizer in A:\n        best_cfg = grid_search(optimizer, problem)\n        score = benchmark(optimizer, best_cfg, problem)\n        candidates.append((score, optimizer, best_cfg))\n\n    best_optimizer, best_cfg = select_best(candidates)\n    prompt_variants = rephrase_as_python_or_latex(problem)\n    code = render_optimizer_code(best_optimizer, best_cfg)\n\n    for prompt in prompt_variants:\n        instruction_set.append({\n            &quot;input&quot;: format_prompt(prompt),\n            &quot;output&quot;: code,\n            &quot;optimizer_label&quot;: best_optimizer.name,\n        })\n\n# Phase 1: contrastive warm-up\nfor batch in balanced_sample(instruction_set):\n    z = M.encode_prompt(batch.input)\n    loss_con = contrastive_loss(z, batch.optimizer_label)\n    update(M, loss_con)\n\n# Phase 2: instruction tuning\nfor batch in balanced_sample(instruction_set):\n    logits = M(batch.input, batch.output_prefix)\n    loss_sft = cross_entropy(logits, batch.output)\n    update(M, loss_sft)\n</code></pre>\n<div class=\"key-point\">💡 关键：LLaMoCo 学的不是“某个优化算法的固定模板”，而是从问题结构映射到优化器选择与实现代码的条件生成能力。</div>\n<p>balanced data sampling 解决的是另一个实际问题：某些优化器可能在大量合成实例上表现最好，而少数 optimizer 只适合特定 landscape。如果按原始频次采样，模型会过度偏向头部优化器，即使遇到适合长尾优化器的问题也生成常见模板。论文采用近似按 optimizer 类别均衡的采样概率，让每个训练 epoch 中各优化器主导的样本数更接近。这个设计与对比 warm-up 配合：warm-up 需要高质量正负样本，均衡采样能让 mini-batch 中有足够多的 minority optimizer 表示，避免表示空间被头部类别压扁。</p>\n<p>推理时，用户只需按照协议描述优化问题，模型一次前向生成 optimizer code，再运行该程序求解问题。由于不再进行 solution-to-solution 多轮搜索，token 开销大幅下降；由于输出是程序而非单个解，它对问题规模更友好；由于优化器知识来自离线 benchmark 和 SFT，用户也不需要在 prompt 里手工指定“应该用 DE、PSO 还是 CMA-ES”。论文用 code error rate、code recovery cost、optimization performance、computational overhead 四类指标评估，覆盖代码可执行性、修复成本、求解质量和 token/计算开销。</p>\n<p>与 FLAN-T5 式通用指令微调相比，LLaMoCo 的特色在于任务空间高度结构化：输入的“指令”不是自然语言问答，而是数学/代码形式的优化问题；输出也不是解释文本，而是可执行优化器代码。与普通 code SFT 相比，它又多了 optimization algorithm selection 这层监督信号，因为同一个目标函数可能适合不同算法。两阶段训练因此非常必要：先用对比学习让模型把问题语义和优化器类别对应起来，再让 SFT 学具体 API、控制流、边界处理和约束处理。</p>\n<p>论文的局限也清晰：数据构造依赖算法池和基准测试，若算法池缺少某类现实优化器，模型不可能凭空学会；合成 landscape 虽然多样，但仍可能覆盖不到工业问题中的离散结构、噪声目标、昂贵黑箱评估和复杂约束。尽管如此，LLaMoCo 展示了一个可复用范式：对需要专业程序生成的领域，不只收集代码答案，还要把“如何选方法”的专家搜索过程蒸馏进指令数据，并用表示学习降低同义描述造成的混淆。</p>",
      "quiz": {
        "q": "LLaMoCo 中 contrastive warm-up 的核心目的是什么？",
        "options": [
          "把对应同一优化器的问题 prompt 表示拉近，把对应不同优化器的 prompt 表示推远",
          "让模型在推理时进行更多轮对话，以提高搜索次数",
          "替代优化器算法池，完全不需要 benchmark 选择标签",
          "只训练 tokenizer，使代码长度更短"
        ],
        "answer": 0,
        "explain": "LLaMoCo 的 warm-up 先塑造问题 prompt 的潜在表示空间，缓解同一问题多种描述和不同优化器标签之间的特征混淆，再进入常规代码指令微调。"
      }
    },
    {
      "id": "lora_e2",
      "num": 20,
      "name": "LoRA-E2",
      "fullName": "高效低秩适配E2 (LoRA-E2)",
      "year": "2026.01",
      "org": "Alibaba",
      "parent": "dora",
      "paperUrl": "https://dl.acm.org/doi/abs/10.1145/3774904.3792500",
      "projectUrl": "",
      "category": "frontier",
      "motivation": "正则化优化稳定训练超越DoRA",
      "summary": "LoRA-E2 针对标准 LoRA 在大宽度模型中 feature learning 低效、且零初始化 \\(B\\) 导致 \\(A\\) 早期几乎无有效更新的问题，提出稳定尺度的 \\(A\\) 高斯初始化与 Gauss-Seidel 式 \\(B/A\\) 交替更新。它在不增加推理结构复杂度的前提下，让低秩适配获得更稳定、更快的有效参数更新。",
      "keyPoints": [
        "保持 LoRA 的基本结构：冻结预训练权重 <span class=\"kb-math kb-math-inline\">W_0</span>，只训练低秩更新 <span class=\"kb-math kb-math-inline\">\\Delta W = BA</span>。",
        "识别标准 LoRA 的两个问题：大 width <span class=\"kb-math kb-math-inline\">n</span> 下特征学习效率下降；<span class=\"kb-math kb-math-inline\">B=0</span> 初始化使 <span class=\"kb-math kb-math-inline\">\\Delta W=0</span>，导致 <span class=\"kb-math kb-math-inline\">A</span> 的早期梯度更新无效或很弱。",
        "提出 stable initialization：对 <span class=\"kb-math kb-math-inline\">A</span> 使用方差为 <span class=\"kb-math kb-math-inline\">\\Theta(n^{-3/4})</span> 的高斯初始化，代码实现中标准差为 <span class=\"kb-math kb-math-inline\">\\sqrt{2/n^{0.75}}</span>，<span class=\"kb-math kb-math-inline\">B</span> 仍初始化为 0。",
        "提出 Gauss-Seidel iteration：每个训练 step 先冻结 <span class=\"kb-math kb-math-inline\">A</span> 更新 <span class=\"kb-math kb-math-inline\">B</span>，再冻结 <span class=\"kb-math kb-math-inline\">B</span> 更新 <span class=\"kb-math kb-math-inline\">A</span>，区别于标准 LoRA 同时更新两个矩阵。",
        "保持参数高效和推理友好：训练后仍可把 <span class=\"kb-math kb-math-inline\">BA</span> merge 回原线性层，不改变 LoRA 的部署路径。",
        "可与 rsLoRA、DoRA 等 LoRA 变体组合，论文报告 LoRA-E2 及其组合在 NLU/NLG 上都有稳定收益。",
        "实验覆盖 GLUE + T5-base，以及 MetaMathQA/GSM8K + LLaMA 2-7B；报告相对 LoRA 在 GLUE 上提升 1–10%，在数学生成任务上提升约 1–2% 并最高约 3× 更快收敛。",
        "官方代码将 NLU 和 NLG 分开实现，分别训练 T5-base/GLUE 与 LLaMA2-7B/MetaMathQA，核心改动集中在 LoRA layer 初始化和自定义 Trainer 的训练步。"
      ],
      "detail": "<p><img alt=\"LoRA 低秩适配结构示意\" src=\"https://arxiv.org/html/2106.09685v2/x1.png\" />\n<em>图：LoRA 原论文 Figure 1 的低秩分解结构。LoRA-E2 不改变这一路径，而是改进同一结构中 <span class=\"kb-math kb-math-inline\">A</span>、<span class=\"kb-math kb-math-inline\">B</span> 的初始化尺度和训练顺序。ACM 论文 Figure 1/3 主要展示训练损失曲线和低秩更新幅度对比；该结构图用于定位 LoRA-E2 的改动位置。</em></p>\n<p>标准 LoRA 对一个冻结线性层 <span class=\"kb-math kb-math-inline\">W_0\\in\\mathbb{R}^{d_{out}\\times d_{in}}</span> 添加低秩更新：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{h}=W_0\\mathbf{x}+\\frac{\\alpha}{r}BA\\mathbf{x},\n\\quad A\\in\\mathbb{R}^{r\\times d_{in}},\\quad B\\in\\mathbb{R}^{d_{out}\\times r},\\quad r\\ll \\min(d_{in},d_{out}).</div>\n<p>标准实践通常随机初始化 <span class=\"kb-math kb-math-inline\">A</span>，把 <span class=\"kb-math kb-math-inline\">B</span> 初始化为零。这样模型在训练开始时 <span class=\"kb-math kb-math-inline\">BA=0</span>，不会破坏预训练模型输出，这是 LoRA 稳定性的来源。但 LoRA-E2 指出，这个设计也有副作用：因为 <span class=\"kb-math kb-math-inline\">B=0</span>，损失对 <span class=\"kb-math kb-math-inline\">A</span> 的梯度 <span class=\"kb-math kb-math-inline\">\\nabla_A\\mathcal{L}</span> 依赖 <span class=\"kb-math kb-math-inline\">B^\\top</span>，初始阶段近似为零；也就是说，<span class=\"kb-math kb-math-inline\">A</span> 在前几步并没有真正学习到有效特征方向，只能等 <span class=\"kb-math kb-math-inline\">B</span> 先被更新后才开始收到有意义梯度。对于宽度 <span class=\"kb-math kb-math-inline\">n</span> 很大的 Transformer 层，这种滞后会放大 feature learning 低效问题。</p>\n<p>LoRA-E2 的第一项改动是初始化尺度。论文摘要和作者页给出的核心结论是：对 <span class=\"kb-math kb-math-inline\">A</span> 使用方差 <span class=\"kb-math kb-math-inline\">\\Theta(n^{-3/4})</span> 的高斯初始化。官方代码中的 <code>stable_init</code> 更具体：</p>\n<div class=\"kb-math kb-math-display\">A_{ij}\\sim \\mathcal{N}\\left(0,\\frac{2}{n^{0.75}}\\right),\n\\quad B=0.</div>\n<p>这里代码变量 <code>fan_in = in_features</code>，<code>std = sqrt(2.0 / fan_in**0.75)</code>。它不同于常见 Kaiming 风格的 <span class=\"kb-math kb-math-inline\">\\Theta(n^{-1})</span> 方差，也不同于过大的 <span class=\"kb-math kb-math-inline\">\\Theta(n^{-1/2})</span> 尺度。直觉上，<span class=\"kb-math kb-math-inline\">A</span> 不能太小，否则通过低秩瓶颈投影后的特征信号太弱，<span class=\"kb-math kb-math-inline\">B</span> 更新学不到有效方向；也不能太大，否则 LoRA 分支在 <span class=\"kb-math kb-math-inline\">B</span> 更新后会迅速产生过强扰动，损害稳定性。<span class=\"kb-math kb-math-inline\">n^{-3/4}</span> 是在大宽度下平衡 feature learning 与稳定更新的中间尺度。</p>\n<p>第二项改动是 Gauss-Seidel 式训练。标准 LoRA 在一个 backward 中同时对 <span class=\"kb-math kb-math-inline\">A</span> 和 <span class=\"kb-math kb-math-inline\">B</span> 求梯度并更新，近似 Jacobi-style simultaneous update。LoRA-E2 官方实现的 <code>LoRAGaussSeidelTrainer</code> 在 <code>LoRA-A</code> 模式下把一个训练 batch 拆成两个子步：先设置 <code>lora_A.requires_grad=False</code>、<code>lora_B.requires_grad=True</code>，更新 <span class=\"kb-math kb-math-inline\">B</span>；然后恢复原学习率，设置 <code>lora_A.requires_grad=True</code>、<code>lora_B.requires_grad=False</code>，再更新 <span class=\"kb-math kb-math-inline\">A</span>。这与数值线性代数中的 Gauss-Seidel 思想一致：更新第二组变量时使用第一组变量的最新值，而不是用同一旧点同时更新。</p>\n<pre><code class=\"language-python\"># LoRA-E2 核心训练伪代码，来自官方实现的逻辑抽象\nfor layer in target_linear_layers:\n    A = Normal(mean=0, std=sqrt(2 / (fan_in ** 0.75)))  # stable_init\n    B = zeros_like_B()\n    layer.delta_W = scale * B @ A\n\nfor batch in dataloader:\n    # Step 1: update B with A fixed\n    freeze(A)\n    unfreeze(B)\n    loss_B = forward_loss(model, batch)\n    backward_and_optimizer_step(loss_B)\n\n    # Step 2: update A with updated B fixed\n    unfreeze(A)\n    freeze(B)\n    loss_A = forward_loss(model, batch)\n    backward_and_optimizer_step(loss_A)\n</code></pre>\n<div class=\"key-point\">💡 关键：LoRA-E2 没有改变低秩适配的参数量公式 <span class=\"kb-math kb-math-inline\">r(d_{in}+d_{out})</span>，而是改变“低秩分支一开始如何获得有效梯度”和“两个低秩因子如何轮流吸收梯度”。</div>\n<p>从梯度角度看，设某层输入为 <span class=\"kb-math kb-math-inline\">x</span>，上游梯度为 <span class=\"kb-math kb-math-inline\">g=\\partial\\mathcal{L}/\\partial h</span>，低秩分支为 <span class=\"kb-math kb-math-inline\">h_{lora}=BAx</span>。忽略缩放常数，有：</p>\n<div class=\"kb-math kb-math-display\">\\nabla_B\\mathcal{L}=g(Ax)^\\top,\n\\quad\n\\nabla_A\\mathcal{L}=B^\\top g x^\\top.</div>\n<p>当 <span class=\"kb-math kb-math-inline\">B=0</span> 时，<span class=\"kb-math kb-math-inline\">\\nabla_A\\mathcal{L}=0</span>，而 <span class=\"kb-math kb-math-inline\">\\nabla_B\\mathcal{L}</span> 取决于 <span class=\"kb-math kb-math-inline\">Ax</span>。因此第一步最合理的事本来就是先让 <span class=\"kb-math kb-math-inline\">B</span> 学会如何读取 <span class=\"kb-math kb-math-inline\">A</span> 产生的低维特征；当 <span class=\"kb-math kb-math-inline\">B</span> 已经非零后，再更新 <span class=\"kb-math kb-math-inline\">A</span> 才能获得非零而且更贴合当前 <span class=\"kb-math kb-math-inline\">B</span> 的梯度。Gauss-Seidel 更新把这个顺序显式写进训练过程，避免同时更新中 <span class=\"kb-math kb-math-inline\">A</span> 使用“旧的、还没学会的 <span class=\"kb-math kb-math-inline\">B</span>”带来的低效。</p>\n<p>与 DoRA 的关系也值得区分。DoRA 把权重更新拆成 magnitude 与 direction，以改善 LoRA 对权重方向和尺度的表达；LoRA-E2 主要处理优化动力学，即初始化尺度和 <span class=\"kb-math kb-math-inline\">A/B</span> 更新耦合。任务元信息把它挂在 DoRA 之后，但 LoRA-E2 并不是 DoRA 的简单正则项，而是可叠加在 LoRA 家族上的训练规则。官方代码里也保留 <code>use_dora</code>、<code>use_rslora</code> 开关，说明它可以与这些结构变体组合；当 <code>use_dora=False</code>、<code>use_rslora=False</code> 时，核心仍然是 stable_init + LoRA-A 交替训练。</p>\n<p>官方代码把训练模式分成三类：<code>LoRA-S</code> 是 simultaneous training，接近标准 LoRA；<code>LoRA-F</code> 冻结 <span class=\"kb-math kb-math-inline\">A</span> 只训练 <span class=\"kb-math kb-math-inline\">B</span>，类似只把随机低维特征作为固定投影；<code>LoRA-A</code> 则是 LoRA-E2 的交替训练。NLU 实验中目标模块是 T5 的 <code>q</code>、<code>v</code>，数据是 GLUE；NLG 实验中目标模块扩展到 LLaMA2 的 <code>q_proj/k_proj/v_proj/o_proj/gate_proj/up_proj/down_proj</code>，数据是 MetaMathQA，评估关注 GSM8K 数学推理。这个覆盖说明 LoRA-E2 不是只对分类头或小模型有效，而是面向 Transformer 主干的多类线性层。</p>\n<p>与标准 LoRA 相比，LoRA-E2 的代价主要在训练阶段：同一个 batch 内做两次 training step，会增加一定计算；但它换来更有效的早期更新和更快收敛。由于最终仍然得到 <span class=\"kb-math kb-math-inline\">BA</span> 低秩矩阵，推理时可以像 LoRA 一样 merge 到 <span class=\"kb-math kb-math-inline\">W_0</span> 或保持 adapter 形式，不引入额外推理深度。实际使用上，若训练预算极紧、只追求最低 step 时间，标准 LoRA 仍然简单；若目标是减少达到同等验证性能所需的步数，LoRA-E2 的稳定初始化和交替更新更有价值。</p>",
      "quiz": {
        "q": "LoRA-E2 为什么要在一个 batch 中先更新 B、再更新 A？",
        "options": [
          "因为标准 LoRA 中 B 初始化为 0，A 的初始梯度近似为 0；先更新 B 后，A 才能获得有效梯度",
          "因为 A 的参数量总是比 B 大很多，必须延迟训练以节省显存",
          "因为 LoRA-E2 删除了 B 矩阵，只保留 A 矩阵进行推理",
          "因为 Gauss-Seidel 只能用于分类任务，不能用于生成任务"
        ],
        "answer": 0,
        "explain": "低秩分支为 BAx，梯度 \nabla_A 依赖 B^T；当 B=0 时 A 几乎不更新。LoRA-E2 先让 B 变成非零，再固定 B 更新 A，从而提高早期训练效率。"
      }
    },
    {
      "id": "sfed_lora",
      "num": 21,
      "name": "SFed-LoRA",
      "fullName": "联邦学习低秩适配 (SFed-LoRA)",
      "year": "2026.03",
      "org": "HKU",
      "parent": "lora",
      "paperUrl": "https://arxiv.org/abs/2603.08058",
      "projectUrl": "",
      "category": "frontier",
      "motivation": "缩放因子缓解联邦学习秩不匹配",
      "summary": "SFed-LoRA 提出了面向联邦 LoRA 的稳定缩放因子 \\(\\gamma_z=\\alpha\\sqrt{N/r}\\)，解决高秩 adapter 在多客户端聚合后梯度塌缩的问题。它不改变 LoRA 架构，只修正本地 adapter 计算中的尺度，使高 rank 在联邦微调中重新变得可训练。",
      "keyPoints": [
        "基于 FedSA-LoRA 的拆分聚合：服务端只聚合全局共享的 <span class=\"kb-math kb-math-inline\">A_i</span>，客户端保留本地个性化的 <span class=\"kb-math kb-math-inline\">B_i</span>",
        "提出联邦稳定缩放因子：将 LoRA / FedSA-LoRA 的 <span class=\"kb-math kb-math-inline\">\\alpha/r</span> 与 rsLoRA 的 <span class=\"kb-math kb-math-inline\">\\alpha/\\sqrt r</span> 扩展为 <span class=\"kb-math kb-math-inline\">\\gamma_z=\\alpha\\sqrt{N/r}</span>",
        "给出 <span class=\"kb-math kb-math-inline\">(N,r)</span>-federated-stabilized adapter 定义：要求前向输出矩与反向梯度范数在客户端数 <span class=\"kb-math kb-math-inline\">N</span> 和秩 <span class=\"kb-math kb-math-inline\">r</span> 变化时保持稳定",
        "理论上证明稳定条件：adapter 输出与输入梯度主项尺度为 <span class=\"kb-math kb-math-inline\">\\gamma_z^2 r/N</span>，因此必须令 <span class=\"kb-math kb-math-inline\">\\gamma_z\\in\\Theta_z(\\sqrt{N/r})</span>",
        "不增加推理延迟：仍使用 LoRA 的低秩矩阵乘积，训练后可合并到冻结权重或保留为标准 adapter",
        "实验覆盖 Alpaca、GSM8K、GLUE，模型包括 LLaMA2-7B 与 RoBERTa-large，并测试 IID、non-IID、不同客户端数与不同 rank"
      ],
      "detail": "<p><img alt=\"SFed-LoRA 框架图\" src=\"https://arxiv.org/html/2603.08058v1/figure/sfedlora-mainfig.jpg\" />\n<em>图：SFed-LoRA 在 FedSA-LoRA 拆分聚合框架上加入 <span class=\"kb-math kb-math-inline\">\\gamma_z=\\alpha\\sqrt{N/r}</span> 缩放；客户端上传共享矩阵，保留本地矩阵，用尺度因子抵消客户端聚合与高秩扩展带来的方差错配。</em></p>\n<pre><code class=\"language-python\"># SFed-LoRA 联邦训练伪代码\n# N: 客户端数, r: LoRA rank, alpha: 缩放超参数\n# W0 冻结；每个客户端 i 持有本地 B_i，服务端维护共享 A_bar\n\ngamma = alpha * sqrt(N / r)\ninitialize A_i ~ Normal(0, sigma_A^2) for each client i\ninitialize B_i = 0 for each client i\nA_bar = average_i(A_i)\n\nfor round in range(num_rounds):\n    server.broadcast(A_bar)\n\n    uploaded_A = []\n    for client i in selected_clients:\n        A_i = A_bar\n        for local_step in range(K):\n            # LoRA adapter output: gamma * B_i @ A_i @ x\n            y = frozen_model_forward(W0, x) + gamma * B_i @ A_i @ x\n            loss = task_loss(y, target)\n            update(B_i, A_i, grad(loss))\n        uploaded_A.append(A_i)      # 只上传共享矩阵 A_i\n        keep_local(B_i)             # B_i 不上传，保留本地个性化信息\n\n    A_bar = average(uploaded_A)      # 服务端聚合共享低秩矩阵\n</code></pre>\n<p>LoRA 的基本形式是冻结原始权重 <span class=\"kb-math kb-math-inline\">W_0</span>，只训练低秩增量：</p>\n<div class=\"kb-math kb-math-display\">h = W_0x + \\gamma B_i A_i x,</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">A_i\\in\\mathbb{R}^{r\\times k}</span>、<span class=\"kb-math kb-math-inline\">B_i\\in\\mathbb{R}^{d\\times r}</span>。普通 LoRA 通常令 <span class=\"kb-math kb-math-inline\">\\gamma=\\alpha/r</span>，rsLoRA 在单机训练中将其改为 <span class=\"kb-math kb-math-inline\">\\alpha/\\sqrt r</span>，以避免 rank 增大时更新幅度被过度压小。SFed-LoRA 的关键观察是：联邦场景不仅有 rank 维度，还有客户端聚合维度 <span class=\"kb-math kb-math-inline\">N</span>。如果仍使用单机缩放，服务端对共享矩阵求平均会改变 adapter 的统计量，导致高秩时梯度被压到接近 0，表现为“rank 越大越学不动”。</p>\n<p>论文选择 FedSA-LoRA 作为理论分析基底，是因为它将低秩矩阵拆开处理：<span class=\"kb-math kb-math-inline\">A_i</span> 被上传和平均，<span class=\"kb-math kb-math-inline\">B_i</span> 留在本地。这比同时平均 <span class=\"kb-math kb-math-inline\">B_iA_i</span> 或分别平均两矩阵更容易分析，因为矩阵乘积的平均并不等于平均矩阵的乘积。按照论文附录的推导，经过本地更新与服务端聚合后，adapter 主项的期望尺度可以写成：</p>\n<div class=\"kb-math kb-math-display\">\\mathbb{E}\\left[\\gamma_z B_i^{(n)}A_i^{(n)}\\right]\n\\approx\n-\\gamma_z^2\\frac{r}{N}\\sigma_A^2\\eta\n\\sum_{s=0}^{n-1} v_{i,s}x_{i,s}^{\\top}.</div>\n<p>这条式子的直觉非常直接：rank <span class=\"kb-math kb-math-inline\">r</span> 增大会放大低秩乘积中累加方向的数量，而客户端平均会引入 <span class=\"kb-math kb-math-inline\">1/N</span> 的尺度变化；如果缩放因子没有同时补偿 <span class=\"kb-math kb-math-inline\">r</span> 和 <span class=\"kb-math kb-math-inline\">N</span>，前向输出与反向梯度就无法保持同一数量级。论文将前向 <span class=\"kb-math kb-math-inline\">h</span>-阶矩与输入梯度都约束为 <span class=\"kb-math kb-math-inline\">\\Theta_N(1)</span> 和 <span class=\"kb-math kb-math-inline\">\\Theta_r(1)</span>，因此要求：</p>\n<div class=\"kb-math kb-math-display\">\\Theta_z\\left(\\left(\\gamma_z^2\\frac{r}{N}\\right)^h\\right)=\\Theta(1),\n\\quad\\Rightarrow\\quad\n\\gamma_z\\in\\Theta_z\\left(\\sqrt{\\frac{N}{r}}\\right).</div>\n<p>实现上，SFed-LoRA 采用带超参数的形式：</p>\n<div class=\"kb-math kb-math-display\">\\gamma_z=\\alpha\\sqrt{\\frac{N}{r}}.</div>\n<p>这个式子也解释了它和已有方法的关系：当没有联邦聚合影响时，<span class=\"kb-math kb-math-inline\">N</span> 可以视作常数，形式退化到类似 rsLoRA 的 <span class=\"kb-math kb-math-inline\">1/\\sqrt r</span> 稳定化；当客户端数增大时，<span class=\"kb-math kb-math-inline\">\\sqrt N</span> 项会补偿聚合导致的有效更新变弱。论文的实验也围绕这个机制展开：在 Alpaca 上固定客户端数、扫描 <span class=\"kb-math kb-math-inline\">r\\in\\{4,8,32,128,512\\}</span> 时，FedSA-LoRA 的高秩梯度范数出现明显塌缩，FedSA-rsLoRA 只能部分缓解，而 SFed-LoRA 的不同 rank 曲线基本处于同一有效范围。</p>\n<p>从训练流程看，SFed-LoRA 并不是一个新的 adapter 结构，而是一个联邦参数化规则。客户端仍然执行本地监督微调，损失函数仍可以是语言建模或下游任务交叉熵；变化只在 adapter forward 中的尺度 <span class=\"kb-math kb-math-inline\">\\gamma_z</span>，以及服务端只聚合共享矩阵 <span class=\"kb-math kb-math-inline\">A_i</span>。这使它特别适合 cross-silo 场景：机构间不共享原始数据，本地保留 <span class=\"kb-math kb-math-inline\">B_i</span> 可以维持个性化表达，而共享 <span class=\"kb-math kb-math-inline\">A</span> 提供跨客户端可迁移的低秩子空间。</p>\n<p>与传统 FedAvg + LoRA 相比，SFed-LoRA 避免了直接聚合完整 adapter 带来的乘积误差；与 FedSA-LoRA 相比，它修复了原始 <span class=\"kb-math kb-math-inline\">\\alpha/r</span> 在高 rank 下过度衰减的问题；与 rsLoRA 相比，它显式建模了客户端数 <span class=\"kb-math kb-math-inline\">N</span>。论文在 LLaMA2-7B 的 Alpaca/GSM8K、RoBERTa-large 的 GLUE 上报告了更快收敛和更稳定的高秩性能，尤其是在 <span class=\"kb-math kb-math-inline\">r=512</span> 与 <span class=\"kb-math kb-math-inline\">N\\in\\{5,10,15,20\\}</span> 变化时，SFed-LoRA 的 perplexity 对客户端扩展更不敏感。</p>\n<div class=\"key-point\">💡 关键：SFed-LoRA 的核心不是“更大的 rank 一定更好”，而是先让高 rank 不再因为错误缩放而失效。只有当梯度尺度稳定后，额外 rank 才可能转化为有效容量。</div>",
      "quiz": {
        "q": "SFed-LoRA 为什么将缩放因子设为 gamma_z = alpha * sqrt(N / r)？",
        "options": [
          "为了让每个客户端上传更多 LoRA 参数",
          "为了同时补偿 rank 扩展和客户端聚合造成的统计尺度变化",
          "为了把 LoRA 矩阵从低秩变成满秩矩阵",
          "为了减少服务端平均的通信轮数"
        ],
        "answer": 1,
        "explain": "论文推导中 adapter 输出和输入梯度主项尺度为 gamma_z^2 * r / N；令 gamma_z 与 sqrt(N/r) 同阶可以使该主项保持常数量级，避免高秩梯度塌缩。"
      }
    },
    {
      "id": "bladelora",
      "num": 22,
      "name": "BladeLoRA",
      "fullName": "刀片式低秩适配 (BladeLoRA)",
      "year": "2025.01",
      "org": "ByteDance",
      "parent": "adalora",
      "paperUrl": "https://arxiv.org/abs/2501.02245",
      "projectUrl": "",
      "category": "frontier",
      "motivation": "自适应秩选择与剪枝提升效率",
      "summary": "BladeLoRA 提出由“线性递增 rank、对齐全参数微调方向、按模型规模剪枝”组成的 LoRA 增强流程，解决固定 rank LoRA 对不同层重要性一视同仁、容量分配不足的问题。它试图在不引入额外推理开销的前提下，让低秩 adapter 更接近全参数微调的任务适配能力。",
      "keyPoints": [
        "采用线性递增 rank 序列：让更深层 Transformer 分配更高 LoRA rank，体现不同层任务适配重要性不同",
        "引入全参数微调近似对齐：调整特定层的 LoRA 矩阵权重，使低秩更新更接近 full fine-tuning 的更新方向",
        "融合两类剪枝策略：针对不同规模的预训练模型，用剪枝抵消 rank 增大和对齐计算带来的额外开销",
        "继承 LoRA 的无额外推理成本优势：训练出的低秩增量仍可与原权重合并",
        "实验覆盖 T5 与 Llama2，目标是在参数高效微调下达到或超过全参数微调的任务表现",
        "任务给定 arXiv 链接与 BladeLoRA 不匹配；可访问论文页为 Springer DOI <code>10.1007/978-3-032-02899-0_6</code>"
      ],
      "detail": "<p><img alt=\"BladeLoRA 三阶段流程图\" src=\"https://quickchart.io/graphviz?graph=digraph%20G%20%7Brankdir%3DLR%3Bnode%20%5Bshape%3Dbox%2Cstyle%3Drounded%5D%3B%20Input%20%5Blabel%3D%22Frozen%20PLM%20%2B%20LoRA%22%5D%3B%20Rank%20%5Blabel%3D%22Linearly%20increasing%20rank%20r_l%22%5D%3B%20Align%20%5Blabel%3D%22Align%20LoRA%20update%20to%20full%20fine-tuning%22%5D%3B%20Prune%20%5Blabel%3D%22Scale-aware%20pruning%22%5D%3B%20Output%20%5Blabel%3D%22Efficient%20task%20adapter%22%5D%3B%20Input-%3ERank-%3EAlign-%3EPrune-%3EOutput%3B%7D\" />\n<em>图：Springer 公开页面未暴露论文内部 Figure；上图根据论文摘要中明确给出的三部分方法重绘：递增 rank、对齐全参数微调、按规模剪枝。</em></p>\n<pre><code class=\"language-python\"># BladeLoRA 方法伪代码：按论文公开摘要重构核心流程\n# W_l: 第 l 层冻结权重；A_l, B_l: LoRA 矩阵；L: 总层数\n\nfor layer l in range(1, L + 1):\n    # 1) 线性递增 rank，深层获得更大低秩容量\n    r_l = r_min + floor((l - 1) / (L - 1) * (r_max - r_min))\n    init_lora(W_l, rank=r_l)\n\nfor step, batch in enumerate(train_loader):\n    loss_task = supervised_loss(model(batch))\n\n    # 2) 用全参数微调方向作为参考，约束 LoRA 更新更接近 full fine-tuning\n    loss_align = 0\n    for layer l in selected_layers:\n        delta_lora = (alpha / r_l) * B_l @ A_l\n        delta_full_ref = estimate_full_tuning_update(W_l, batch)\n        loss_align += 1 - cosine(vec(delta_lora), vec(delta_full_ref))\n\n    loss = loss_task + lambda_align * loss_align\n    update_lora_parameters(loss)\n\n    # 3) 周期性剪枝：小模型可细粒度剪 LoRA 方向，大模型可结构化剪 block/layer\n    if step in pruning_schedule:\n        scores = compute_importance_scores(model, criterion=&quot;first_order_or_block&quot;)\n        prune_low_score_components(scores, target_budget)\n</code></pre>\n<p>标准 LoRA 对每个目标线性层加入同样 rank 的低秩增量：</p>\n<div class=\"kb-math kb-math-display\">W_\\ell^{\\prime}=W_\\ell+\\Delta W_\\ell,\n\\quad\n\\Delta W_\\ell=\\frac{\\alpha}{r}B_\\ell A_\\ell.</div>\n<p>BladeLoRA 的第一步是打破“所有层同 rank”的假设。论文公开摘要强调，不同层的重要性不同，因此设计递增 rank 序列，让更深层获得更大的低秩容量。一个直接的形式化写法是：</p>\n<div class=\"kb-math kb-math-display\">r_\\ell = r_{\\min}+\\left\\lfloor\\frac{\\ell-1}{L-1}(r_{\\max}-r_{\\min})\\right\\rfloor,</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">L</span> 是 Transformer 层数。这个设计背后的直觉是：浅层更偏词法、局部模式和通用表示，深层更接近任务语义与输出决策；如果所有层都使用相同 rank，就会把参数预算浪费在不需要高容量的层，同时限制真正需要更强表达的深层。</p>\n<p>第二步是“对齐全参数微调”。普通 LoRA 的低秩更新只在 <span class=\"kb-math kb-math-inline\">B_\\ell A_\\ell</span> 张成的子空间里搜索，可能无法贴近 full fine-tuning 的有效更新方向。BladeLoRA 因此调整特定层的矩阵权重，使低秩增量近似 full fine-tuning 的结果。可将这种思想写成方向对齐或投影对齐目标：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{align}\n=\\sum_{\\ell\\in\\mathcal{S}}\n\\left(1-\n\\frac{\\langle \\operatorname{vec}(\\Delta W_\\ell),\\operatorname{vec}(\\Delta W_\\ell^{FFT})\\rangle}\n{\\|\\Delta W_\\ell\\|_2\\|\\Delta W_\\ell^{FFT}\\|_2}\n\\right),</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\Delta W_\\ell^{FFT}</span> 可以理解为全参数微调或其短步梯度估计给出的参考更新方向。这个项不是为了真的训练并保存一个完整 full fine-tuned 模型，而是把 full fine-tuning 的“该往哪里走”的信息蒸馏到低秩矩阵中，缩小 LoRA 与全参数微调之间的表示差距。</p>\n<p>第三步是剪枝。递增 rank 和对齐项会提高训练时的计算与显存需求，因此 BladeLoRA 引入两类 pruning 来处理不同规模的预训练模型。公开摘要没有展开内部公式，但结合标题和参考文献可以明确其目的：在小/中模型上，可以对低重要度 adapter 方向、奇异方向或权重做更细粒度删除；在 Llama2 这类大模型上，更倾向结构化剪枝，以块、层或通道为单位降低训练/推理维护成本。常见的一阶重要性可写为：</p>\n<div class=\"kb-math kb-math-display\">s_j=\\left|w_j\\frac{\\partial\\mathcal{L}}{\\partial w_j}\\right|,</div>\n<p>或对一个结构块 <span class=\"kb-math kb-math-inline\">G</span> 聚合为 <span class=\"kb-math kb-math-inline\">s_G=\\sum_{j\\in G}s_j</span>。低分组件被剪掉后，剩余 rank/结构保留了对任务损失最敏感的更新方向。这样，BladeLoRA 先主动把容量分给更重要的层，再用剪枝把冗余预算削掉，而不是像固定 rank LoRA 那样从一开始就给所有层相同容量。</p>\n<p>与 AdaLoRA 的区别在于，AdaLoRA 主要通过奇异值重要性动态分配参数预算，而 BladeLoRA 明确加入了“深层更高 rank”的结构先验，并额外使用 full fine-tuning 对齐来校正低秩搜索方向。与 PRILoRA 一类递增 rank 方法相比，BladeLoRA 的剪枝阶段进一步控制了因 rank 增大带来的资源开销。整体上，它是一套面向“LoRA 表达力不足”的工程化组合：先扩容量、再对齐方向、最后剪掉冗余。</p>\n<p>需要注意的是，任务清单给出的 <code>https://arxiv.org/abs/2501.02245</code> 实际是 “Adaptive GSIS for rarefied gas flow simulations”，不是 BladeLoRA。本文解读基于可公开访问的 Springer 页面摘要、引用信息和 DOI 页面；由于完整章节受订阅限制，具体剪枝阈值、实验表格和内部 Figure 无法从公开页面逐行核验。上述公式用于表达论文摘要中三阶段设计的机制直觉。</p>\n<div class=\"warn-box\">⚠️ 注意：BladeLoRA 的关键风险在于对齐 full fine-tuning 方向本身需要额外参考信号。如果参考更新估计成本过高，收益可能被训练开销抵消，因此剪枝调度和对齐层选择是实际落地的核心超参数。</div>",
      "quiz": {
        "q": "BladeLoRA 为什么采用线性递增的层级 rank 分配？",
        "options": [
          "因为更深层通常承载更多任务相关语义，需要更高低秩容量",
          "因为所有层使用相同 rank 会导致推理时无法合并权重",
          "因为递增 rank 可以完全替代监督损失函数",
          "因为浅层参数量一定比深层参数量更多"
        ],
        "answer": 0,
        "explain": "BladeLoRA 的动机是不同层重要性不同，深层更接近任务决策；递增 rank 将有限参数预算更多分配给深层。"
      }
    },
    {
      "id": "lora2",
      "num": 23,
      "name": "LoRA2",
      "fullName": "多尺度低秩近似 (LoRA2)",
      "year": "2025.01",
      "org": "Nanjing University",
      "parent": "lora",
      "paperUrl": "https://www.sciencedirect.com/science/article/pii/S0925231225015310",
      "projectUrl": "",
      "category": "frontier",
      "motivation": "多尺度低秩应对复杂任务需求",
      "summary": "LoRA2 将单尺度 LoRA 扩展为多尺度低秩近似，在两个互相正交的低维平面上训练内部 LoRA 并组合成更高维更新，解决复杂任务中单一 rank/单一子空间表达不足的问题。它还改进 AdaLoRA 式重要性评分，减少敏感度计算并通过剪枝适配不同任务预算。",
      "keyPoints": [
        "提出 LoRA² 多尺度结构：在两个互相正交的平面上训练内部 LoRA，再组合为高维低秩更新",
        "使用外部正交正则：减少两个 LoRA 子空间重叠，扩大整体学习空间",
        "使用内部正则：约束每个内部 LoRA 的参数更新更规整，提升训练稳定性和收敛速度",
        "改进复杂矩阵重要性评分：针对乘积式 LoRA² 结构，去除对列矩阵敏感度的冗余计算",
        "动态参数预算分配：类似 AdaLoRA，对低重要性奇异值或低秩方向进行 pruning",
        "官方 README 称参数敏感度评分计算量约减少 98.5%，DeBERTa-V3-base 上训练参数约为 full fine-tuning 的 0.72%",
        "实验覆盖 DeBERTa-V3-base、RoBERTa-large、Llama-2-7b-hf，以及 GLUE、数学推理、代码生成等任务"
      ],
      "detail": "<p><img alt=\"LoRA2 与 LoRA/AdaLoRA/SoRA 结构对比\" src=\"https://ars.els-cdn.com/content/image/1-s2.0-S0925231225015310-gr1_lrg.jpg\" />\n<em>图：论文图示对比 LoRA、AdaLoRA、SoRA 与 LoRA²。LoRA² 使用更复杂的多尺度低秩结构，而不是只在一个固定 rank 的 <span class=\"kb-math kb-math-inline\">BA</span> 子空间中更新。</em></p>\n<pre><code class=\"language-python\"># LoRA2 核心训练伪代码：多尺度正交 LoRA + 改进重要性剪枝\nfor each target weight W0 in pretrained_model:\n    freeze(W0)\n    # 两个内部 LoRA 位于互相正交的低维平面\n    L1 = init_internal_lora(rank=r1, plane=&quot;S1&quot;)\n    L2 = init_internal_lora(rank=r2, plane=&quot;S2&quot;)\n    enforce_orthogonal(S1, S2)\n\nfor step, batch in enumerate(train_loader):\n    for each target layer:\n        # 多尺度组合：用两个内部低秩更新构成更高维更新\n        delta_W = compose(L1, L2)      # conceptual: product / composition of two LoRAs\n        h = W0 @ x + scaling * delta_W @ x\n\n    loss_task = supervised_loss(h, y)\n    loss_ext = overlap_penalty(L1, L2)       # 外部正则：减少两个 LoRA 的重叠\n    loss_int = internal_orth_penalty(L1) + internal_orth_penalty(L2)\n    loss = loss_task + lambda_ext * loss_ext + lambda_int * loss_int\n    update_trainable_lora2_parameters(loss)\n\n    if step &gt;= init_warmup and step % mask_interval == 0:\n        # 改进 AdaLoRA 式重要性评分：只保留真正影响 pruning 的矩阵侧\n        scores = compute_singular_importance_without_column_redundancy()\n        prune_low_score_singular_values(scores, target_rank)\n</code></pre>\n<p>标准 LoRA 对冻结权重 <span class=\"kb-math kb-math-inline\">W_0</span> 添加一个低秩增量：</p>\n<div class=\"kb-math kb-math-display\">h = W_0x + \\frac{\\alpha}{r}BAx.</div>\n<p>这类方法的核心假设是：下游任务所需的更新可以被一个固定 rank、单尺度的 <span class=\"kb-math kb-math-inline\">BA</span> 子空间较好表达。LoRA2 认为这个假设对复杂任务不一定成立，因为不同语义模式、不同层和不同任务可能需要多个尺度的低秩变化。论文因此把 LoRA 从单个低秩平面扩展到多个正交平面：先在两个互相正交的低维空间中训练内部 LoRA，再通过矩阵组合得到高维更新。</p>\n<p>可以将 LoRA2 的组合思想抽象写为：</p>\n<div class=\"kb-math kb-math-display\">\\Delta W_{LoRA^2}=\\mathcal{C}(L_1,L_2),\n\\quad\nL_1=B_1A_1,\\quad L_2=B_2A_2,\n\\quad\n\\mathcal{S}_1\\perp\\mathcal{S}_2.</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{C}</span> 表示论文所说的“multiplying two LoRAs”得到高维 LoRA 的组合操作。直觉上，<span class=\"kb-math kb-math-inline\">L_1</span> 与 <span class=\"kb-math kb-math-inline\">L_2</span> 不应学习同一片方向，否则多尺度结构只是在重复单尺度 LoRA；因此论文加入外部正则来最小化两个 LoRA 的重叠，扩大可学习空间。一个等价直觉的正交惩罚可以写作：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{R}_{ext}=\\|U_1^\\top U_2\\|_F^2+\\|V_1^\\top V_2\\|_F^2,</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">U,V</span> 表示不同内部 LoRA 所张成的左右子空间。外部正则负责“两个 LoRA 之间别重叠”，内部正则则负责“每个 LoRA 自己别退化”。内部正则可理解为保持每个内部子空间近似正交、减少方向坍缩：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{R}_{int}=\\sum_{s\\in\\{1,2\\}}\n\\left(\\|U_s^\\top U_s-I\\|_F^2+\\|V_s^\\top V_s-I\\|_F^2\\right).</div>\n<p>LoRA2 的第二个关键点是 pruning。AdaLoRA 使用 SVD 参数化和重要性评分来动态分配 rank，但 LoRA2 的矩阵结构更复杂：两个内部 LoRA 相乘后，前一矩阵的行会与后一矩阵的列相乘。论文在 ScienceDirect 摘要和 Introduction 中指出，最直接的做法是把列矩阵的重要性加到行矩阵上；但进一步推导发现，每个奇异值的重要性评分已经包含列矩阵所有参数的敏感度，所以列矩阵敏感度对最终 pruning 没有额外作用。于是 LoRA2 排除了列矩阵计算，从而显著减少敏感度评分开销。</p>\n<p>重要性评分可以用 AdaLoRA 风格的奇异值敏感度来理解：</p>\n<div class=\"kb-math kb-math-display\">I_j^{(t)}=\\left|\\sigma_j^{(t)}\\frac{\\partial\\mathcal{L}}{\\partial \\sigma_j^{(t)}}\\right|,\n\\quad\n\\bar I_j^{(t)}=\\beta_1\\bar I_j^{(t-1)}+(1-\\beta_1)I_j^{(t)}.</div>\n<p>训练过程中先 warm up，让各低秩方向有机会形成；随后每隔 <code>mask_interval</code> 重新计算重要性，剪掉低分奇异值或低秩方向，直到达到目标平均 rank。官方 GitHub README 的复现实验参数也体现了这个调度：<code>init_warmup</code>、<code>final_warmup</code>、<code>mask_interval</code>、<code>beta1</code>、<code>beta2</code>、<code>target_rank</code>、<code>reg_orth_coef</code> 都是围绕“先学多尺度方向，再稳定剪枝”设计的。</p>\n<p>与 LoRA 相比，LoRA2 解决的是表达空间太单一的问题；与 AdaLoRA 相比，它不只是动态调整 rank，还先通过正交多尺度结构扩大候选更新空间；与 SoRA 等带门控结构的方法相比，LoRA2 更强调两个内部低秩平面的正交组合和重要性评分的计算优化。论文报告它在 DeBERTa-V3-base 上只使用 full fine-tuning 约 0.72% 的训练参数仍取得强性能，并且在参数进一步压缩到 0.17M 时仍可接近参数量约 8 倍的 baseline。</p>\n<div class=\"key-point\">💡 关键：LoRA2 的“2”不是简单堆两个 LoRA，而是用正交约束让两个内部 LoRA 学到互补方向，再通过剪枝把真正有用的多尺度方向留下。</div>",
      "quiz": {
        "q": "LoRA2 改进重要性评分算法的主要目的是什么？",
        "options": [
          "让所有层固定使用同一个 rank",
          "删除对 pruning 无额外贡献的列矩阵敏感度计算，降低评分开销",
          "将 LoRA 的低秩矩阵改成全参数矩阵",
          "完全取消正交正则项"
        ],
        "answer": 1,
        "explain": "LoRA2 发现复杂矩阵中每个奇异值的重要性已经包含列矩阵参数敏感度，因此排除列矩阵计算可显著降低重要性评分成本。"
      }
    }
  ],
  "categories": {
    "instruction": {
      "label": "指令微调",
      "color": "#3B82F6"
    },
    "peft": {
      "label": "参数高效微调",
      "color": "#10B981"
    },
    "multitask": {
      "label": "多任务SFT",
      "color": "#F59E0B"
    },
    "frontier": {
      "label": "2026前沿进展",
      "color": "#EF4444"
    }
  },
  "projectUrls": {}
};
