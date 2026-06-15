/**
 * llm_sft-data.js — 由 pipeline/build.py 于 2026-06-15 09:55:58 自动生成。
 * 源文件：content/llm/llm_sft.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "llm",
    "topic_id": "llm_sft",
    "topic_name": "LLM监督微调 算法总结",
    "page_title": "LLM监督微调 算法总结",
    "page_subtitle": "2026-06-15 版",
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
      "summary": "FLAN 的核心目标是：将60+任务转为指令模板实现零样本泛化。",
      "keyPoints": [
        "核心动机：将60+任务转为指令模板实现零样本泛化",
        "代表机构：Google Research"
      ],
      "detail": "<p>将60+任务转为指令模板实现零样本泛化</p>"
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
      "summary": "InstructGPT 的核心目标是：引入RLHF框架对齐人类偏好。",
      "keyPoints": [
        "核心动机：引入RLHF框架对齐人类偏好",
        "演化来源：继承或改进自 flan",
        "代表机构：OpenAI"
      ],
      "detail": "<p>引入RLHF框架对齐人类偏好</p>"
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
      "summary": "Self-Instruct 的核心目标是：利用模型自身生成指令数据迭代微调。",
      "keyPoints": [
        "核心动机：利用模型自身生成指令数据迭代微调",
        "演化来源：继承或改进自 flan",
        "代表机构：University of Washington"
      ],
      "detail": "<p>利用模型自身生成指令数据迭代微调</p>"
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
      "summary": "Adapter 的核心目标是：插入瓶颈层实现模块化迁移学习。",
      "keyPoints": [
        "核心动机：插入瓶颈层实现模块化迁移学习",
        "代表机构：Google Research"
      ],
      "detail": "<p>插入瓶颈层实现模块化迁移学习</p>"
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
      "summary": "Prefix-Tuning 的核心目标是：优化连续前缀向量引导生成。",
      "keyPoints": [
        "核心动机：优化连续前缀向量引导生成",
        "演化来源：继承或改进自 adapter",
        "代表机构：Stanford University"
      ],
      "detail": "<p>优化连续前缀向量引导生成</p>"
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
      "summary": "Prompt Tuning 的核心目标是：仅调优输入向量匹配全量微调性能。",
      "keyPoints": [
        "核心动机：仅调优输入向量匹配全量微调性能",
        "演化来源：继承或改进自 prefix_tuning",
        "代表机构：Google Research"
      ],
      "detail": "<p>仅调优输入向量匹配全量微调性能</p>"
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
      "summary": "P-Tuning 的核心目标是：连续嵌入替代离散提示优化。",
      "keyPoints": [
        "核心动机：连续嵌入替代离散提示优化",
        "演化来源：继承或改进自 prefix_tuning",
        "代表机构：Tsinghua University"
      ],
      "detail": "<p>连续嵌入替代离散提示优化</p>"
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
      "summary": "P-Tuning v2 的核心目标是：跨规模通用NLU任务适配。",
      "keyPoints": [
        "核心动机：跨规模通用NLU任务适配",
        "演化来源：继承或改进自 p_tuning",
        "代表机构：Tsinghua University"
      ],
      "detail": "<p>跨规模通用NLU任务适配</p>"
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
      "summary": "LoRA 的核心目标是：低秩分解消除推理延迟大幅减少显存。",
      "keyPoints": [
        "核心动机：低秩分解消除推理延迟大幅减少显存",
        "演化来源：继承或改进自 adapter",
        "代表机构：Microsoft"
      ],
      "detail": "<p>低秩分解消除推理延迟大幅减少显存</p>"
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
      "summary": "AdaLoRA 的核心目标是：SVD动态分配参数预算优化性能。",
      "keyPoints": [
        "核心动机：SVD动态分配参数预算优化性能",
        "演化来源：继承或改进自 lora",
        "代表机构：Georgia Tech"
      ],
      "detail": "<p>SVD动态分配参数预算优化性能</p>"
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
      "summary": "QLoRA 的核心目标是：4-bit量化实现单卡微调65B模型。",
      "keyPoints": [
        "核心动机：4-bit量化实现单卡微调65B模型",
        "演化来源：继承或改进自 lora",
        "代表机构：University of Washington"
      ],
      "detail": "<p>4-bit量化实现单卡微调65B模型</p>"
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
      "summary": "DoRA 的核心目标是：幅值方向分解缩小与全参微调差距。",
      "keyPoints": [
        "核心动机：幅值方向分解缩小与全参微调差距",
        "演化来源：继承或改进自 lora",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>幅值方向分解缩小与全参微调差距</p>"
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
      "summary": "GaLore 的核心目标是：梯度投影减少80%优化器显存。",
      "keyPoints": [
        "核心动机：梯度投影减少80%优化器显存",
        "演化来源：继承或改进自 lora",
        "代表机构：UT Austin"
      ],
      "detail": "<p>梯度投影减少80%优化器显存</p>"
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
      "summary": "VeRA 的核心目标是：冻结共享矩阵减少10倍参数量。",
      "keyPoints": [
        "核心动机：冻结共享矩阵减少10倍参数量",
        "演化来源：继承或改进自 lora",
        "代表机构：University of Amsterdam"
      ],
      "detail": "<p>冻结共享矩阵减少10倍参数量</p>"
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
      "summary": "FLAN-T5 的核心目标是：1.8K任务+CoT数据混合训练。",
      "keyPoints": [
        "核心动机：1.8K任务+CoT数据混合训练",
        "演化来源：继承或改进自 flan",
        "代表机构：Google Research"
      ],
      "detail": "<p>1.8K任务+CoT数据混合训练</p>"
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
      "summary": "Selective Reflection-Tuning 的核心目标是：学生模型自主选择高质量数据。",
      "keyPoints": [
        "核心动机：学生模型自主选择高质量数据",
        "演化来源：继承或改进自 self_instruct",
        "代表机构：Tsinghua University"
      ],
      "detail": "<p>学生模型自主选择高质量数据</p>"
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
      "summary": "Llamoco 的核心目标是：减少代码生成特征层面混淆。",
      "keyPoints": [
        "核心动机：减少代码生成特征层面混淆",
        "演化来源：继承或改进自 flan_t5",
        "代表机构：Peking University"
      ],
      "detail": "<p>减少代码生成特征层面混淆</p>"
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
      "summary": "LoRA-E2 的核心目标是：正则化优化稳定训练超越DoRA。",
      "keyPoints": [
        "核心动机：正则化优化稳定训练超越DoRA",
        "演化来源：继承或改进自 dora",
        "代表机构：Alibaba"
      ],
      "detail": "<p>正则化优化稳定训练超越DoRA</p>"
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
      "summary": "SFed-LoRA 的核心目标是：缩放因子缓解联邦学习秩不匹配。",
      "keyPoints": [
        "核心动机：缩放因子缓解联邦学习秩不匹配",
        "演化来源：继承或改进自 lora",
        "代表机构：HKU"
      ],
      "detail": "<p>缩放因子缓解联邦学习秩不匹配</p>"
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
      "summary": "BladeLoRA 的核心目标是：自适应秩选择与剪枝提升效率。",
      "keyPoints": [
        "核心动机：自适应秩选择与剪枝提升效率",
        "演化来源：继承或改进自 adalora",
        "代表机构：ByteDance"
      ],
      "detail": "<p>自适应秩选择与剪枝提升效率</p>"
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
      "summary": "LoRA2 的核心目标是：多尺度低秩应对复杂任务需求。",
      "keyPoints": [
        "核心动机：多尺度低秩应对复杂任务需求",
        "演化来源：继承或改进自 lora",
        "代表机构：Nanjing University"
      ],
      "detail": "<p>多尺度低秩应对复杂任务需求</p>"
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
