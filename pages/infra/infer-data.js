/**
 * infer-data.js — 由 pipeline/build.py 于 2026-06-15 17:41:32 自动生成。
 * 源文件：content/infra/infer.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "infra",
    "topic_id": "infer",
    "topic_name": "推理加速",
    "page_title": "推理加速算法总结",
    "page_subtitle": "2026-05-12 版",
    "page_desc": "回顾从FlashAttention到PagedAttention，以及投机解码、KV Cache优化、推理引擎的演进历程，涵盖2026年最新的Blackwell架构适配与分布式推理突破。",
    "page_icon": "⚡",
    "hero_pills": [
      "🏷️ KV Cache · 投机解码 · 推理引擎"
    ],
    "count_pill": "52 个算法",
    "image_base": "",
    "overview_from_doc": true,
    "latest_overview_from_doc": true
  },
  "overview": [
    {
      "title": "",
      "body_html": "<h1>AI Infra LLM推理系统：技术发展与演进调研</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2028069625129186800\">https://zhuanlan.zhihu.com/p/2028069625129186800</a></li>\n<li>作者: TensorDance</li>\n</ul>\n<hr />\n<p>AI Infra LLM推理系统：技术发展与演进调研</p>\n<h1>AI Infra LLM推理系统：技术发展与演进调研</h1>\n<p>作者: TensorDance, 赞: 7</p>\n<h3>一句话结论</h3>\n<p>大模型推理的竞争重心，已经从“单个算子更快”转为“从内核到调度再到集群控制面的协同优化”。<br />\n在今天的生产环境里，决定成本和体验的不是某一个优化技巧，而是整条推理链路的系统设计能力。</p>\n<h3>1. 先看大势：推理系统为何进入“分层协同”时代</h3>\n<p>如果把现代 LLM serving 拆开看，通常可以分成三层：</p>\n<ul>\n<li><strong>执行层（单卡/单机）</strong>：关注 kernel、内存访问、精度格式和显存利用。</li>\n<li><strong>实例层（单服务实例）</strong>：关注请求编排、批处理策略、prefill/decode 协同。</li>\n<li><strong>集群层（多实例/多节点）</strong>：关注路由、缓存共享、弹性伸缩和资源异构。</li>\n</ul>\n<p>过去团队常在执行层做“点状加速”；2024-2026 的主流变化是三层同时优化，并且彼此联动。<br />\n例如，你在执行层做了更激进的 KV 压缩，如果实例层调度不合理、集群层路由打散缓存，最终收益会被吃掉。</p>\n<h3>2. KV cache 已经成为推理系统的“主对象”</h3>\n<p>一个常被低估的现实是：线上 LLM 推理的主要压力，很多时候不在 FLOPs，而在 KV 相关的容量、带宽和生命周期管理。</p>\n<p>为什么 KV 变成中心问题？</p>\n<ul>\n<li>长上下文导致 KV 容量持续上升；</li>\n<li>高并发导致 HBM 带宽竞争明显；</li>\n<li>请求长度分布不规则，会引入严重内存碎片；</li>\n<li>多轮会话和共享提示词让“缓存命中”直接影响成本。</li>\n</ul>\n<p>因此，行业逐步形成了“以 KV 为中心”的一整套方法：paged/blocked KV、prefix 复用、KV 量化、KV 分层存储、缓存感知路由。<br />\n可以说，现代推理框架真正的差异化能力，越来越体现在谁能更高效地管理 KV 生命周期。</p>\n<h3>3. Continuous batching：高吞吐系统的基本能力</h3>\n<p>静态 batch 更适合离线场景，不适合请求到达时间和输出长度波动很大的在线流量。<br />\n当前更常见的是 iteration 级动态拼批（continuous/in-flight batching），即每个解码周期都可动态加入或移出请求。</p>\n<p>它带来的直接效果是：</p>\n<ul>\n<li>GPU 空转减少，吞吐更稳定；</li>\n<li>长短请求混跑时抖动下降；</li>\n<li>在同等硬件下可承载更高并发。</li>\n</ul>\n<p>这项能力在主流 runtime 中基本已成为“没有就很难进入生产主战场”的门槛能力。</p>\n<h3>4. Prefix caching：稳定、可解释、回报率高</h3>\n<p>在系统提示词固定、few-shot 模板固定、多轮对话连续、RAG 查询重复度较高的业务中，prefix caching 通常有非常稳定的收益。<br />\n它的价值在于：跳过可复用前缀的 prefill 计算，不改变模型输出分布，也不依赖复杂的接受率条件。</p>\n<p>近两年的关键进展是：缓存复用从“单实例局部优化”走向“跨实例全局优化”。</p>\n<ul>\n<li>实例内：哈希块复用、radix 结构索引；</li>\n<li>集群侧：prefix-aware / cache-aware routing；</li>\n<li>平台侧：围绕缓存命中率做调度和成本治理。</li>\n</ul>\n<p>这背后反映的是一个更深层变化：缓存命中率从性能指标升级为经营指标（直接决定单位 token 成本）。</p>\n<h3>5. 调度架构升级：Chunked Prefill 与 PD 分离</h3>\n<p>prefill 和 decode 的资源特性天然不同：</p>\n<ul>\n<li>prefill 偏算力密集；</li>\n<li>decode 偏内存带宽密集。</li>\n</ul>\n<p>把它们粗暴放在同一调度队列里，常见结果是 TTFT、ITL、吞吐三者互相牵制。<br />\n这推动了两条重要演进路径。</p>\n<h3>5.1 Chunked Prefill</h3>\n<p>将超长输入切成小块，穿插进 decode 周期执行，减少长输入对在线解码的“独占式阻塞”。<br />\n它本质上是改善队列公平性和尾延迟体验的调度手段。</p>\n<h3>5.2 Prefill/Decode Disaggregation（PD 分离）</h3>\n<p>把 prefill 与 decode 放到不同实例甚至不同节点，使两类负载可独立扩缩容，并采用不同并行策略或硬件配置。<br />\n这在大规模部署、长输出场景、严格 tail-latency 目标下尤其有效。</p>\n<p>但 PD 分离并非“默认总收益”，它会引入跨实例通信、状态同步与系统复杂度成本。<br />\n是否启用，应该由业务流量形态和 SLA 目标驱动，而非跟风。</p>\n<h3>6. Speculative decoding：已经可用，但不是无脑开</h3>\n<p>从早期 speculative decoding 到 Medusa、EAGLE、MTP 等变体，技术成熟度明显提升，越来越多框架将其作为正式特性提供。</p>\n<p>不过它和 prefix caching 的性质不同：<br />\nprefix caching 常常“开了就有收益”，而 speculative decoding 的效果高度依赖场景参数，例如：</p>\n<ul>\n<li>draft token 的接受率；</li>\n<li>批大小与并发结构；</li>\n<li>模型类型（dense / MoE）；</li>\n<li>优先目标是极低延迟还是极高吞吐；</li>\n<li>团队是否能持续维护更复杂的调参与监控体系。</li>\n</ul>\n<p>因此更合理的定位是：它是高价值的“强可选能力”，而不是所有业务默认路径。</p>\n<h3>7. 量化趋势：从压权重走向压全链路</h3>\n<p>量化的目标已经从“让模型塞进显存”演变为“同时缓解算力、带宽和容量压力”。<br />\n在工程实践中，常见分层可以理解为：</p>\n<ul>\n<li><strong>Weight-only PTQ</strong>：部署快、改造小，适合快速降显存；</li>\n<li><strong>W8A8</strong>：硬件友好性更好，兼顾整图性能；</li>\n<li><strong>FP8</strong>：在新一代 GPU 上成为性能与质量的实用平衡点；</li>\n<li><strong>FP4/NVFP4</strong>：正在随新硬件推进，但大规模稳定性和通用性仍在爬坡。</li>\n</ul>\n<p>更关键的是 KV 量化进入主流实践。<br />\n很多线上瓶颈并非模型参数量本身，而是长上下文下 KV 的带宽和内存占用，KV 量化因此成为高并发场景的关键抓手。</p>\n<h3>8. MoE 与新模型结构正在重塑推理基础设施</h3>\n<p>在 dense 模型里，TP/PP 的经验依然有效；但在 MoE 模型里，瓶颈会更多转向 expert dispatch、负载均衡、跨设备通信和缓存布局。</p>\n<p>这让 expert parallelism 从“高级选配”逐步变成“前沿模型服务的必备能力”。<br />\n与此同时，GQA/MQA/MLA 等结构变化也在影响系统设计：</p>\n<ul>\n<li>某些结构显著降低 KV 访问开销；</li>\n<li>某些结构要求更专门化的 kernel 与并行拓扑；</li>\n<li>“不理解模型结构就做不好系统”的趋势越来越明显。</li>\n</ul>\n<p>换句话说，推理系统正在进入 model-architecture-aware 的阶段：系统方案必须和模型形态绑定设计。</p>\n<h3>9. 竞争边界上移：从 runtime 到集群控制面</h3>\n<p>到 2026 年，单机 tokens/s 已不再是唯一决定胜负的指标。<br />\n真正拉开差距的是：谁能在分布式环境里稳定放大缓存收益，并把资源利用率做高。</p>\n<p>三个越来越关键的能力方向：</p>\n<ul>\n<li><strong>Cache-aware routing</strong>：把相似前缀请求尽量路由到同一副本，提高复用率；</li>\n<li><strong>Hierarchical KV（分层 KV）</strong>：HBM 不够时平滑下沉到 CPU/远端内存/磁盘；</li>\n<li><strong>异构与解耦伸缩</strong>：prefill 池和 decode 池独立扩缩，按负载类型配置不同机器。</li>\n</ul>\n<p>这个变化意味着，LLM 推理正在逐步具备“分布式数据系统”的典型特征，而不仅仅是“GPU 程序优化”。</p>\n<h3>10. 技术成熟度分层（工程视角）</h3>\n<h3>已经普及的能力</h3>\n<ul>\n<li>paged/blocked KV 管理</li>\n<li>continuous/in-flight batching</li>\n<li>prefix caching</li>\n<li>attention 内核与融合算子优化</li>\n<li>权重量化（如 GPTQ/AWQ）与 FP8 生产落地</li>\n<li>dense 模型下稳定的 TP/PP 方案</li>\n</ul>\n<h3>正在快速成为主流的能力</h3>\n<ul>\n<li>chunked prefill</li>\n<li>PD 分离（prefill/decode 解耦）</li>\n<li>KV cache quantization</li>\n<li>cache-aware routing</li>\n<li>MoE expert parallel（含 TP+EP 混合）</li>\n</ul>\n<h3>仍偏前沿或强场景化的能力</h3>\n<ul>\n<li>大规模稳定的 remote/tiered KV</li>\n<li>更激进的 speculative 变体（如 MTP 体系化落地）</li>\n<li>FP4/NVFP4 的全面生产化</li>\n<li>更激进 sparse attention 的通用 serving 路线</li>\n</ul>\n<h3>11. 2026 年值得重点跟踪的 runtime 生态</h3>\n<ul>\n<li><strong>vLLM</strong>：生态广、迭代快，通用场景覆盖最全面。</li>\n<li><strong>SGLang</strong>：在高性能 serving、MoE 与调度创新上活跃度高。</li>\n<li><strong>TensorRT-LLM</strong>：NVIDIA 平台性能上限和硬件代际适配能力强。</li>\n<li><strong>TGI</strong>：Hugging Face 体系中的工程化生产入口，维护成本友好。</li>\n<li><strong>LMDeploy</strong>：中文社区影响力强，在 KV 与批处理优化上持续投入。</li>\n<li><strong>DeepSpeed-FastGen</strong>：仍具参考价值，但行业中心性相对下降。</li>\n</ul>\n<h3>12. 结语：未来两年的关键判断</h3>\n<p>未来一段时间，最有价值的推理能力不会是单个“黑科技开关”，而是以下组合能力：</p>\n<ol>\n<li>以 KV 生命周期为主线组织内存与缓存系统；</li>\n<li>以动态批处理和调度策略维持高资源利用率；</li>\n<li>以 PD 分离和缓存感知路由做大规模稳定扩展；</li>\n<li>以量化与模型结构适配持续降低单位推理成本。</li>\n</ol>\n<p>最终胜出的推理平台，往往不是“某项指标最快”，而是能在真实业务中同时做到：<br />\n<strong>延迟可控、吞吐可扩、成本可降、稳定可运营。</strong></p>\n<h3>说明（边界与口径）</h3>\n<ul>\n<li>本文聚焦推理基础设施，不讨论训练系统。</li>\n<li>结论基于公开资料与工程实践抽象，不构成统一 benchmark 排名。</li>\n<li>不同项目公布的数据受模型、硬件、并行策略、负载分布影响，不能简单横向对齐。</li>\n<li>文中“主流”指工程采用趋势与生态活跃度，不等价于市场份额统计。</li>\n</ul>\n<p>注：以上调研报告的整理均来自Ai</p>"
    }
  ],
  "latest_overview": [
    {
      "title": "",
      "body_html": "<h1>2026年大模型推理优化全景：从 KV Cache 压缩到投机解码</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2017695401436783377\">https://zhuanlan.zhihu.com/p/2017695401436783377</a></li>\n<li>作者: 苯宝宝是有机物</li>\n</ul>\n<hr />\n<p>2026年大模型推理优化全景：从 KV Cache 压缩到投机解码</p>\n<h1>2026年大模型推理优化全景：从 KV Cache 压缩到投机解码</h1>\n<p>作者: 苯宝宝是有机物, 赞: 51</p>\n<h2>2026年大模型推理优化全景：从 KV Cache 压缩到投机解码</h2>\n<blockquote>\n<p>当 GPT-5、Claude Opus 4 和 Qwen3 纷纷卷到百万级上下文，真正卡脖子的早已不是”谁更聪明”，而是”谁跑得起”。</p>\n</blockquote>\n<h3>引子：一个尴尬的现实</h3>\n<p>你训练了一个千亿参数的大模型，效果炸裂，Demo惊艳全场。</p>\n<p>然后产品经理问你：<strong>“上线后每个用户请求要花多少钱？”</strong></p>\n<p>你默默打开计算器，算完之后陷入了沉默。</p>\n<p>这就是 2026 年大模型行业最核心的矛盾——<strong>模型能力的天花板在不断提高，但推理成本的地板却迟迟降不下去</strong>。今天我们就来聊聊，业界到底在用哪些技术来解决这个问题。</p>\n<h3>一、KV Cache：那个吃显存的大户</h3>\n<h3>1.1 为什么 KV Cache 是推理的心腹大患？</h3>\n<p>Transformer 在自回归生成时，每个新 token 都需要 attend 到之前所有 token 的 Key 和 Value。为了避免重复计算，我们把历史的 K/V 向量缓存下来，这就是 KV Cache。</p>\n<p>问题在于，<strong>KV Cache 的显存占用和序列长度成线性关系</strong>。以 Llama-3 70B 为例：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>序列长度</th>\n<th>KV Cache 大小（FP16）</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>4K</td>\n<td>~5 GB</td>\n</tr>\n<tr>\n<td>32K</td>\n<td>~40 GB</td>\n</tr>\n<tr>\n<td>128K</td>\n<td>~160 GB</td>\n</tr>\n<tr>\n<td>1M</td>\n<td>~1.2 TB</td>\n</tr>\n</tbody>\n</table></div>\n<p>当上下文窗口来到百万级别，光 KV Cache 就能吃掉一整台 8×H100 服务器的显存。模型权重？Sorry，没位置了。</p>\n<h3>1.2 压缩派：用更少的 bit 存同样的信息</h3>\n<p><strong>量化压缩</strong>是最直接的思路。2025 年下半年以来，KV Cache 量化已经从实验室走向了生产：</p>\n<ul>\n<li><strong>KIVI（ICML 2025）</strong>：Key 用 2-bit，Value 用 4-bit，几乎不掉点。核心洞察是 Key 的分布比 Value 更集中，可以压得更狠。</li>\n<li><strong>Gear（NeurIPS 2025）</strong>：引入残差量化——先做一轮粗量化，把误差大的 outlier 单独用高精度存储，整体压缩比可达 8x。</li>\n<li><strong>CacheQuant（2026）</strong>：动态精度分配，越靠近当前位置的 token 精度越高，远处的逐步降精度，兼顾了”近处看细节、远处看大意”的注意力模式。</li>\n</ul>\n<p><strong>稀疏/蒸馏</strong>则是另一条路线：</p>\n<ul>\n<li><strong>Streaming LLM</strong>：只保留开头的 sink tokens + 最近的滑动窗口，中间全扔。简单粗暴但对很多任务够用。</li>\n<li><strong>H2O（Heavy-Hitter Oracle）</strong>：用累积 attention score 来判断哪些 token 是”重要选手”，只保留 top-k。</li>\n<li><strong>SnapKV（2026）</strong>：把选择策略从 token 级别细化到 head 级别——不同的 attention head 关注的 token 分布差异很大，一刀切太浪费。</li>\n</ul>\n<h3>1.3 架构派：从根上改 Attention</h3>\n<p>如果说压缩是”事后补救”，那架构改良就是”治本”：</p>\n<ul>\n<li><strong>MLA（Multi-Latent Attention）</strong>：DeepSeek-V3 的招牌设计。把 KV 投影到低维潜空间，存的不是原始 K/V，而是低秩近似。显存占用直接砍到原来的 1/10。</li>\n<li><strong>GQA（Grouped Query Attention）</strong>：多个 Query head 共享同一组 KV head，Llama 3 和 Qwen3 都在用。</li>\n<li><strong>线性注意力变体</strong>：Mamba-2、RWKV-7 等 SSM/线性 Transformer 方案，彻底绕开了 KV Cache 的二次方瓶颈。代价是在超长上下文的精确检索任务上还有差距。</li>\n</ul>\n<h3>二、投机解码：让小模型”猜”，大模型”审”</h3>\n<h3>2.1 核心思想</h3>\n<p>传统自回归解码，一次只生成一个 token，大模型的算力利用率其实很低（memory-bound）。</p>\n<p>投机解码（Speculative Decoding）的思路很妙：</p>\n<ol>\n<li>用一个<strong>小模型（draft model）</strong>快速猜出接下来的 K 个 token</li>\n<li>把这 K 个 token 一次性喂给<strong>大模型（target model）</strong>做并行验证</li>\n<li>大模型从前往后检查，找到第一个”猜错”的位置，接受之前的 token，拒绝之后的</li>\n<li>数学上可以证明：<strong>输出分布和直接用大模型生成完全一致</strong>——无损加速</li>\n</ol>\n<h3>2.2 2026 年的进展</h3>\n<p>投机解码在这一年进化了很多：</p>\n<p><strong>自投机（Self-Speculation）</strong>：不用额外的小模型，大模型自己跳过部分层来充当 draft model。Llama 3.1 的论文里就提到了 layer-skip 的实验。</p>\n<p><strong>Eagle-2 和 Medusa-2</strong>：在原始投机解码基础上引入树状验证（tree attention），一次性验证多条候选路径，接受率大幅提升。实测在代码生成任务上可达 3-4x 加速。</p>\n<p><strong>异构投机</strong>：draft model 跑在 CPU/NPU 上，target model 跑在 GPU 上，两者完全并行。充分利用了异构计算的带宽优势。</p>\n<h3>2.3 投机解码的局限</h3>\n<p>投机解码不是银弹：</p>\n<ul>\n<li><strong>接受率决定一切</strong>：如果 draft model 猜得不准（比如模型差异太大、或生成创意性内容时），加速比会大打折扣</li>\n<li><strong>Batch 场景收益递减</strong>：当 batch size 足够大时，GPU 已经是 compute-bound，投机解码反而增加了开销</li>\n<li><strong>上下文一致性</strong>：draft model 和 target model 必须共享同一套 KV Cache，实现起来有不少工程坑</li>\n</ul>\n<h3>三、量化：从”能不能用”到”怎么用好”</h3>\n<h3>3.1 权重量化的现状</h3>\n<p>2026 年，INT4 权重量化已经是推理部署的<strong>标配</strong>，不需要讨论”掉不掉点”了——GPTQ、AWQ、QuIP# 等方案在主流模型上的精度损失可以忽略不计。</p>\n<p>更激进的前沿在 <strong>INT2/INT3</strong>：</p>\n<ul>\n<li><strong>QuIP#</strong>：使用随机旋转 + 向量量化，在 2-bit 下依然保持不错的效果</li>\n<li><strong>AQLM</strong>：学习型向量量化，用 codebook 来逼近原始权重分布</li>\n<li><strong>SqueezeLLM</strong>：基于敏感度的非均匀量化，重要权重给更多 bit</li>\n</ul>\n<h3>3.2 KV + Weight + Activation 联合量化</h3>\n<p>2026 年最值得关注的趋势是<strong>全链路量化</strong>——不只是权重，连 KV Cache 和中间 Activation 一起压：</p>\n<ul>\n<li><strong>FP8 推理</strong>已经被 NVIDIA H200/B200 和 AMD MI350 原生支持，吞吐量直接翻倍</li>\n<li><strong>W4A8KV4</strong>（权重4bit、激活8bit、KV Cache 4bit）成为很多团队的默认配置</li>\n<li>端侧推理的极致路线甚至做到 <strong>W2A8</strong>，在手机上跑 7B 模型</li>\n</ul>\n<h3>四、系统级优化：被低估的工程力量</h3>\n<h3>4.1 算子融合与调度</h3>\n<ul>\n<li><strong>FlashAttention-3</strong>：支持 FP8 attention，在 Hopper 架构上利用 TMA（Tensor Memory Accelerator）做异步 warp 调度</li>\n<li><strong>PagedAttention（vLLM）</strong>：把 KV Cache 做分页管理，像操作系统管理内存一样。解决了 batch 推理中的显存碎片化问题</li>\n<li><strong>FlashInfer</strong>：专为变长序列和 prefix caching 优化的 attention 内核</li>\n</ul>\n<h3>4.2 Prefix Caching</h3>\n<p>如果多个请求共享相同的 system prompt（这在 API 服务中极其常见），那这段 prefix 的 KV Cache 只需要算一次：</p>\n<ul>\n<li>vLLM 的 automatic prefix caching 可以节省 30-60% 的首 token 延迟</li>\n<li>SGLang 的 RadixAttention 更进一步，用 radix tree 管理所有可能的共享前缀</li>\n</ul>\n<h3>4.3 分布式推理</h3>\n<p>千亿参数模型单卡放不下，分布式策略至关重要：</p>\n<ul>\n<li><strong>TP（Tensor Parallelism）</strong>：同一层切分到多张卡，延迟敏感但通信开销大</li>\n<li><strong>PP（Pipeline Parallelism）</strong>：不同层放不同卡，吞吐友好但增加延迟</li>\n<li><strong>EP（Expert Parallelism）</strong>：MoE 模型专属，不同 expert 放不同卡。DeepSeek-V3 的 256 个 expert 就是这么部署的</li>\n<li><strong>Disaggregated Serving</strong>：把 prefill 和 decode 分开部署在不同集群——prefill 是 compute-bound，decode 是 memory-bound，混在一起互相干扰</li>\n</ul>\n<h3>五、2026 年的趋势判断</h3>\n<p>回顾这些技术，我总结几个趋势：</p>\n<p><strong>1. 推理成本会持续指数下降</strong> 从 2023 年 GPT-4 发布到现在，同等能力模型的推理成本已经下降了 100 倍以上。这个趋势不会停。</p>\n<p><strong>2. 端侧推理即将爆发</strong> Apple M4 Ultra、Qualcomm X Elite、Google Tensor G5 都在堆 NPU 算力。7B-14B 模型在手机/笔记本上流畅运行已经是现实。</p>\n<p><strong>3. 混合架构会成为主流</strong> 纯 Transformer 在效率上的劣势越来越明显。未来的大模型可能是 Transformer（精确检索）+ SSM（长程建模）+ MoE（稀疏激活）的混合体。</p>\n<p><strong>4. 编译器和硬件的角色越来越重要</strong> 软件优化的空间在缩小，越来越多的加速需要编译器（如 TVM、Triton）和硬件（如定制 ASIC）的配合。</p>\n<h3>结语</h3>\n<p>推理优化是一个典型的”<strong>看起来是算法问题，实际上是系统工程问题</strong>“的领域。从数学原理到 CUDA kernel，从模型架构到集群调度，每一层都有巨大的优化空间。</p>\n<p>对于从业者来说，我的建议是：<strong>不要只盯着模型效果看，推理效率同样决定了一个模型能不能真正落地</strong>。</p>\n<p>毕竟，跑不起的模型，再聪明也只是 Demo。</p>\n<hr />\n<p><em>如果这篇文章对你有帮助，欢迎点赞、关注我的专栏「模型前沿技术分享」，我会持续更新大模型领域的深度技术分析。</em></p>"
    }
  ],
  "graph": {
    "nodes": [
      {
        "id": "mqa",
        "x": 50,
        "y": 80,
        "category": "kv_cache"
      },
      {
        "id": "pagedattn",
        "x": 350,
        "y": 50,
        "category": "kv_cache"
      },
      {
        "id": "gqa",
        "x": 350,
        "y": 100,
        "category": "kv_cache"
      },
      {
        "id": "h2o",
        "x": 350,
        "y": 150,
        "category": "kv_cache"
      },
      {
        "id": "scissorhands",
        "x": 350,
        "y": 200,
        "category": "kv_cache"
      },
      {
        "id": "streamingllm",
        "x": 380,
        "y": 75,
        "category": "kv_cache"
      },
      {
        "id": "cachegen",
        "x": 380,
        "y": 125,
        "category": "kv_cache"
      },
      {
        "id": "kivi",
        "x": 500,
        "y": 80,
        "category": "kv_cache"
      },
      {
        "id": "gear",
        "x": 500,
        "y": 140,
        "category": "kv_cache"
      },
      {
        "id": "turboquant",
        "x": 750,
        "y": 60,
        "category": "kv_cache"
      },
      {
        "id": "bitdecoding",
        "x": 750,
        "y": 110,
        "category": "kv_cache"
      },
      {
        "id": "chunkkv",
        "x": 750,
        "y": 160,
        "category": "kv_cache"
      },
      {
        "id": "spec_leviathan",
        "x": 350,
        "y": 240,
        "category": "spec_decode"
      },
      {
        "id": "spec_chen",
        "x": 350,
        "y": 290,
        "category": "spec_decode"
      },
      {
        "id": "medusa",
        "x": 500,
        "y": 220,
        "category": "spec_decode"
      },
      {
        "id": "eagle",
        "x": 500,
        "y": 270,
        "category": "spec_decode"
      },
      {
        "id": "lookahead",
        "x": 500,
        "y": 320,
        "category": "spec_decode"
      },
      {
        "id": "eagle_v2",
        "x": 500,
        "y": 370,
        "category": "spec_decode"
      },
      {
        "id": "eagle_v3",
        "x": 620,
        "y": 250,
        "category": "spec_decode"
      },
      {
        "id": "p_eagle",
        "x": 750,
        "y": 230,
        "category": "spec_decode"
      },
      {
        "id": "ssd",
        "x": 750,
        "y": 290,
        "category": "spec_decode"
      },
      {
        "id": "flashattn",
        "x": 200,
        "y": 420,
        "category": "attention"
      },
      {
        "id": "flashattn_v2",
        "x": 350,
        "y": 400,
        "category": "attention"
      },
      {
        "id": "flash_decoding",
        "x": 350,
        "y": 450,
        "category": "attention"
      },
      {
        "id": "ring_attn",
        "x": 350,
        "y": 500,
        "category": "attention"
      },
      {
        "id": "striped_attn",
        "x": 350,
        "y": 540,
        "category": "attention"
      },
      {
        "id": "mla",
        "x": 500,
        "y": 420,
        "category": "attention"
      },
      {
        "id": "flashattn_v3",
        "x": 500,
        "y": 460,
        "category": "attention"
      },
      {
        "id": "nsa",
        "x": 620,
        "y": 390,
        "category": "attention"
      },
      {
        "id": "flashmla",
        "x": 620,
        "y": 440,
        "category": "attention"
      },
      {
        "id": "flashattn_v4",
        "x": 750,
        "y": 380,
        "category": "attention"
      },
      {
        "id": "dsa",
        "x": 750,
        "y": 430,
        "category": "attention"
      },
      {
        "id": "hisa",
        "x": 750,
        "y": 480,
        "category": "attention"
      },
      {
        "id": "orca",
        "x": 200,
        "y": 580,
        "category": "engine"
      },
      {
        "id": "deepspeed_infer",
        "x": 200,
        "y": 630,
        "category": "engine"
      },
      {
        "id": "vllm",
        "x": 350,
        "y": 590,
        "category": "engine"
      },
      {
        "id": "sglang",
        "x": 350,
        "y": 640,
        "category": "engine"
      },
      {
        "id": "trt_llm",
        "x": 500,
        "y": 570,
        "category": "engine"
      },
      {
        "id": "flashinfer",
        "x": 750,
        "y": 560,
        "category": "engine"
      },
      {
        "id": "dynamo",
        "x": 750,
        "y": 610,
        "category": "engine"
      },
      {
        "id": "vllm_v1",
        "x": 750,
        "y": 660,
        "category": "engine"
      },
      {
        "id": "sglang_v05",
        "x": 750,
        "y": 710,
        "category": "engine"
      },
      {
        "id": "gptq",
        "x": 200,
        "y": 750,
        "category": "quantize"
      },
      {
        "id": "smoothquant",
        "x": 200,
        "y": 800,
        "category": "quantize"
      },
      {
        "id": "sparsegpt",
        "x": 350,
        "y": 740,
        "category": "quantize"
      },
      {
        "id": "awq",
        "x": 350,
        "y": 790,
        "category": "quantize"
      },
      {
        "id": "wanda",
        "x": 350,
        "y": 840,
        "category": "quantize"
      },
      {
        "id": "bitnet_b158",
        "x": 500,
        "y": 760,
        "category": "quantize"
      },
      {
        "id": "nvfp4",
        "x": 750,
        "y": 750,
        "category": "quantize"
      },
      {
        "id": "mc_sharp",
        "x": 750,
        "y": 810,
        "category": "quantize"
      },
      {
        "id": "retnet",
        "x": 350,
        "y": 920,
        "category": "linear_attn"
      },
      {
        "id": "mamba",
        "x": 350,
        "y": 980,
        "category": "linear_attn"
      }
    ],
    "edges": [
      {
        "from": "mqa",
        "to": "gqa",
        "label": "分组折中"
      },
      {
        "from": "flashattn",
        "to": "flashattn_v2",
        "label": "优化并行"
      },
      {
        "from": "flashattn_v2",
        "to": "flash_decoding",
        "label": "序列维并行"
      },
      {
        "from": "flashattn_v2",
        "to": "flashattn_v3",
        "label": "Hopper异步"
      },
      {
        "from": "flashattn",
        "to": "ring_attn",
        "label": "分布式扩展"
      },
      {
        "from": "ring_attn",
        "to": "striped_attn",
        "label": "负载均衡"
      },
      {
        "from": "gqa",
        "to": "mla",
        "label": "低秩压缩"
      },
      {
        "from": "mla",
        "to": "flashmla",
        "label": "内核优化"
      },
      {
        "from": "spec_leviathan",
        "to": "medusa",
        "label": "无草稿模型"
      },
      {
        "from": "spec_leviathan",
        "to": "eagle",
        "label": "特征投机"
      },
      {
        "from": "eagle",
        "to": "eagle_v2",
        "label": "动态树"
      },
      {
        "from": "pagedattn",
        "to": "vllm",
        "label": "引擎集成"
      },
      {
        "from": "vllm",
        "to": "sglang",
        "label": "前缀缓存"
      },
      {
        "from": "gptq",
        "to": "sparsegpt",
        "label": "结构剪枝"
      },
      {
        "from": "smoothquant",
        "to": "awq",
        "label": "通道保护"
      },
      {
        "from": "flashattn_v2",
        "to": "nsa",
        "label": "稀疏化演进"
      },
      {
        "from": "kivi",
        "to": "turboquant",
        "label": "向量量化"
      },
      {
        "from": "kivi",
        "to": "bitdecoding",
        "label": "硬件加速"
      },
      {
        "from": "h2o",
        "to": "chunkkv",
        "label": "语义感知"
      },
      {
        "from": "eagle_v2",
        "to": "eagle_v3",
        "label": "预测范式"
      },
      {
        "from": "eagle_v3",
        "to": "p_eagle",
        "label": "并行化"
      },
      {
        "from": "spec_leviathan",
        "to": "ssd",
        "label": "异步化"
      },
      {
        "from": "flashattn_v3",
        "to": "flashattn_v4",
        "label": "架构适配"
      },
      {
        "from": "nsa",
        "to": "dsa",
        "label": "工业级压缩"
      },
      {
        "from": "nsa",
        "to": "hisa",
        "label": "索引精细化"
      },
      {
        "from": "trt_llm",
        "to": "dynamo",
        "label": "分布式解耦"
      },
      {
        "from": "flashattn",
        "to": "flashinfer",
        "label": "内核生成"
      },
      {
        "from": "vllm",
        "to": "vllm_v1",
        "label": "调度架构"
      },
      {
        "from": "sglang",
        "to": "sglang_v05",
        "label": "通信优化"
      },
      {
        "from": "smoothquant",
        "to": "nvfp4",
        "label": "硬件原生"
      },
      {
        "from": "gptq",
        "to": "bitnet_b158",
        "label": "极低比特"
      },
      {
        "from": "awq",
        "to": "mc_sharp",
        "label": "MoE压缩"
      }
    ],
    "milestones": [
      "flashattn",
      "vllm",
      "flashattn_v4"
    ]
  },
  "algos": [
    {
      "id": "mqa",
      "num": 1,
      "name": "MQA",
      "fullName": "多查询注意力 (Multi-Query Attention)",
      "year": "2019",
      "org": "Google",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1911.02150",
      "projectUrl": "",
      "category": "kv_cache",
      "motivation": "共享Key/Value头减少带宽压力",
      "summary": "MQA 的核心目标是：共享Key/Value头减少带宽压力。",
      "keyPoints": [
        "核心动机：共享Key/Value头减少带宽压力",
        "代表机构：Google"
      ],
      "detail": "<p>共享Key/Value头减少带宽压力</p>"
    },
    {
      "id": "gqa",
      "num": 2,
      "name": "GQA",
      "fullName": "分组查询注意力 (Grouped-Query Attention)",
      "year": "2023",
      "org": "Google",
      "parent": "mqa",
      "paperUrl": "https://aclanthology.org/2023.emnlp-main.298/",
      "projectUrl": "",
      "category": "kv_cache",
      "motivation": "MHA与MQA的折中兼顾速度与精度",
      "summary": "GQA 的核心目标是：MHA与MQA的折中兼顾速度与精度。",
      "keyPoints": [
        "核心动机：MHA与MQA的折中兼顾速度与精度",
        "演化来源：继承或改进自 mqa",
        "代表机构：Google"
      ],
      "detail": "<p>MHA与MQA的折中兼顾速度与精度</p>"
    },
    {
      "id": "pagedattn",
      "num": 3,
      "name": "PagedAttention",
      "fullName": "分页注意力 (PagedAttention)",
      "year": "2023",
      "org": "UC Berkeley",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2309.06180",
      "projectUrl": "",
      "category": "kv_cache",
      "motivation": "引入虚拟内存分页解决显存碎片化",
      "summary": "PagedAttention 的核心目标是：引入虚拟内存分页解决显存碎片化。",
      "keyPoints": [
        "核心动机：引入虚拟内存分页解决显存碎片化",
        "代表机构：UC Berkeley"
      ],
      "detail": "<p>引入虚拟内存分页解决显存碎片化</p>"
    },
    {
      "id": "h2o",
      "num": 4,
      "name": "H2O",
      "fullName": "重击者预言机 (Heavy-Hitter Oracle)",
      "year": "2023",
      "org": "Texas A&M",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2306.14048",
      "projectUrl": "",
      "category": "kv_cache",
      "motivation": "动态保留高权重标记剔除冗余缓存",
      "summary": "H2O 的核心目标是：动态保留高权重标记剔除冗余缓存。",
      "keyPoints": [
        "核心动机：动态保留高权重标记剔除冗余缓存",
        "代表机构：Texas A&amp;M"
      ],
      "detail": "<p>动态保留高权重标记剔除冗余缓存</p>"
    },
    {
      "id": "scissorhands",
      "num": 5,
      "name": "Scissorhands",
      "fullName": "剪刀手 (Scissorhands)",
      "year": "2023",
      "org": "Rice Univ",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2305.17118",
      "projectUrl": "",
      "category": "kv_cache",
      "motivation": "基于重要性持久化假设压缩缓存",
      "summary": "Scissorhands 的核心目标是：基于重要性持久化假设压缩缓存。",
      "keyPoints": [
        "核心动机：基于重要性持久化假设压缩缓存",
        "代表机构：Rice Univ"
      ],
      "detail": "<p><img alt=\"Scissorhands 核心示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2305.17118/assets/x1.png\" />\n<em>图：Scissorhands 的 cache 剪枝流程，根据注意力重要性保留关键 token。</em></p>\n<pre><code class=\"language-python\">importance = zeros(context_length)\nfor t in decode_steps:\n    logits, attn = model.decode(x_t, kv_cache)\n    importance = decay * importance + aggregate_attention(attn)\n    kv_cache.append(K_t, V_t)\n    protected = recent_positions(window)\n    pivotal = topk_except(importance, budget-len(protected), protected)\n    kv_cache.keep_only(protected | pivotal)\n</code></pre>\n<h5>动机与背景</h5>\n<p>KV cache 剪枝最难的是未来需求未知。Scissorhands 观察到，系统指令、实体、主题词等关键位置一旦被关注，往往会在后续持续被使用，因此历史注意力可以作为未来重要性的代理。</p>\n<h5>核心机制</h5>\n<p>算法为每个 token 维护重要性分数，分数由历史注意力聚合并可加入衰减。超过预算时，保留高分 pivotal tokens 和最近窗口，删除其余位置的 K/V。</p>\n<h5>训练/推理流程</h5>\n<p>推理中每一步先用当前 cache 生成 token，再从 attention 中更新重要性，最后执行剪枝。剪枝后模型仍做标准 causal attention，只是可见历史集合变小。</p>\n<h5>与传统方法的区别</h5>\n<p>相比滑动窗口，Scissorhands 可保留远距离关键 token；相比 H2O，它更强调重要性持久化假设；相比 KV 量化，它节省的是序列维度，风险是误删造成不可逆信息丢失。</p>"
    },
    {
      "id": "streamingllm",
      "num": 6,
      "name": "StreamingLLM",
      "fullName": "流式大模型 (StreamingLLM)",
      "year": "2023",
      "org": "MIT",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2309.17453",
      "projectUrl": "",
      "category": "kv_cache",
      "motivation": "利用注意力汇实现无限长度流式推理",
      "summary": "StreamingLLM 的核心目标是：利用注意力汇实现无限长度流式推理。",
      "keyPoints": [
        "核心动机：利用注意力汇实现无限长度流式推理",
        "代表机构：MIT"
      ],
      "detail": "<p><img alt=\"StreamingLLM 核心示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2309.17453/assets/x1.png\" />\n<em>图：StreamingLLM 展示的 attention sink 现象和保留 sink+窗口的推理策略。</em></p>\n<pre><code class=\"language-python\">sink_kv = prefill(first_k_tokens)\nwindow = KVWindow(maxlen=recent_size)\nfor token in stream:\n    kv = concat(sink_kv, window.kv)\n    logits, new_kv = model.decode(token, kv_cache=kv)\n    window.append(new_kv)\n</code></pre>\n<h5>动机与背景</h5>\n<p>普通滑窗会在窗口移动后丢失序列开头，导致注意力分布与训练时差异变大，长流式推理困惑度突然恶化。StreamingLLM 发现问题不只是语义信息缺失，还包括注意力归一化缺少稳定锚点。</p>\n<h5>核心机制</h5>\n<p>attention sink 是初始少量 token 对后续所有位置可见后形成的稳定注意力落点。即便其语义不重要，它们也帮助 softmax 分配多余注意力质量。保留 sink 后，模型在滑窗下仍维持类似训练时的注意力结构。</p>\n<h5>训练/推理流程</h5>\n<p>预填充保留最开始 <span class=\"kb-math kb-math-inline\">k</span> 个 token 的 KV；之后每步只维护这些 sink KV 和最近 <span class=\"kb-math kb-math-inline\">w</span> 个 token 的 KV。普通旧 token 会被丢弃，sink 永不滑出窗口。</p>\n<h5>与传统方法的区别</h5>\n<p>与 H2O/Scissorhands 的动态重要性打分不同，StreamingLLM 是固定规则：<span class=\"kb-math kb-math-inline\">C_t=\\{1..k\\}\\cup\\{t-w+1..t\\}</span>。它牺牲远距离普通语义记忆，但换来稳定、简单和常数 cache。</p>"
    },
    {
      "id": "kivi",
      "num": 7,
      "name": "KIVI",
      "fullName": "KIVI量化 (KIVI)",
      "year": "2024",
      "org": "Rice Univ",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2402.02750",
      "projectUrl": "",
      "category": "kv_cache",
      "motivation": "无需微调的非对称2-bit缓存量化",
      "summary": "KIVI 的核心目标是：无需微调的非对称2-bit缓存量化。",
      "keyPoints": [
        "核心动机：无需微调的非对称2-bit缓存量化",
        "代表机构：Rice Univ"
      ],
      "detail": "<p>无需微调的非对称2-bit缓存量化</p>"
    },
    {
      "id": "gear",
      "num": 8,
      "name": "GEAR",
      "fullName": "GEAR压缩框架 (GEAR)",
      "year": "2024",
      "org": "Georgia Tech",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2403.05527",
      "projectUrl": "",
      "category": "kv_cache",
      "motivation": "结合量化与误差补偿的高倍率压缩",
      "summary": "GEAR 的核心目标是：结合量化与误差补偿的高倍率压缩。",
      "keyPoints": [
        "核心动机：结合量化与误差补偿的高倍率压缩",
        "代表机构：Georgia Tech"
      ],
      "detail": "<p><img alt=\"GEAR 核心示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2403.05527/assets/x1.png\" />\n<em>图：GEAR 的量化、低秩补偿与稀疏补偿组合框架。</em></p>\n<pre><code class=\"language-python\">for block in kv_blocks:\n    Q, scale = quantize(block, bits=b)\n    residual = block - dequant(Q, scale)\n    U, V = low_rank(residual, rank=r)\n    S = keep_top_abs(residual - U @ V, nnz=s)\n    store(Q, scale, U, V, S)\n\nblock_hat = dequant(Q, scale) + U @ V + S\nout = attention(query, block_hat.K, block_hat.V)\n</code></pre>\n<h5>动机与背景</h5>\n<p>极低比特 KV 量化不仅有均匀噪声，还有结构化残差和少量异常大误差。裸量化要么精度不足，要么必须提高 bit 数牺牲压缩率。GEAR 把误差拆开处理。</p>\n<h5>核心机制</h5>\n<p>主体张量用低比特量化保存；残差矩阵中可共享的模式用低秩因子表示；剩余最大幅度误差用稀疏矩阵保存。近似形式是 <span class=\"kb-math kb-math-inline\">X\\approx DeQuant(Q)+UV^T+S</span>。</p>\n<h5>训练/推理流程</h5>\n<p>KV block 生成后被压缩成量化码、scale、低秩因子和稀疏补偿。attention kernel 读取时按块恢复近似 K/V，随后执行标准注意力。压缩率由 bit 数、rank 和稀疏预算共同控制。</p>\n<h5>与传统方法的区别</h5>\n<p>KIVI 强调 K/V 不同量化粒度，GEAR 强调误差补偿。它比单纯 outlier 保存更全面，因为低秩项能修复广泛但有结构的偏差；比完整 FP16 cache 更省显存。</p>"
    },
    {
      "id": "cachegen",
      "num": 9,
      "name": "CacheGen",
      "fullName": "缓存生成 (CacheGen)",
      "year": "2023",
      "org": "Univ of Chicago",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2310.07240",
      "projectUrl": "",
      "category": "kv_cache",
      "motivation": "通过流式传输与张量编码降低TTFT",
      "summary": "CacheGen 将 LLM 的 KV Cache 压缩为紧凑比特流（而非直接传输原始张量），通过**差分编码 + 层级量化 + 通道级算术编码**三步流水线实现 3.5–4.3× 压缩，配合自适应加载控制器将 Time-To-First-Token (TTFT) 降低 2.7–3.2×，且生成质量损失不超过 0.2%。",
      "keyPoints": [
        "<strong>KV Cache 编码器</strong>：三步压缩流水线——差分编码（Delta Encoding）→ 层级量化（Layer-wise Quantization）→ 通道级算术编码（Channel-wise Arithmetic Coding）",
        "<strong>三个关键 Insight 驱动设计</strong>：",
        "Insight 1：相邻 token 的 KV 值具有高度局部性（差分后信息熵更低）",
        "Insight 2：同一 channel-layer 组合内的 KV 值共享相似概率分布（可用通道级先验做 AC）",
        "Insight 3：浅层 KV 特征对量化更敏感（浅层分配更多比特）",
        "<strong>层级量化策略</strong>：将 Transformer 层分为三组（浅 1/3、中 1/3、深 1/3），分别使用 <span class=\"kb-math kb-math-inline\">x</span>、<span class=\"kb-math kb-math-inline\">y</span>、<span class=\"kb-math kb-math-inline\">z</span> bit 量化（<span class=\"kb-math kb-math-inline\">x \\geq y \\geq z</span>），锚点 token 保留 8-bit 高精度",
        "<strong>上下文加载控制器</strong>：根据 TTFT 预算和网络带宽，动态选择压缩级别或直接传输原始文本",
        "<strong>评估覆盖 3 个管线</strong>：Wikitext（Perplexity）、LongChat（Accuracy）、Natural Questions（F1 Score），涵盖 7B–13B 模型",
        "<strong>端到端效果</strong>：KV Cache 压缩 3.5–4.3×，TTFT 降低 2.7–3.2×，生成质量损失 &lt; 0.2%"
      ],
      "detail": "<h5>系统架构总览</h5>\n<p><img alt=\"CacheGen 系统架构\" src=\"../assets/cachegen_fig6.png\" />\n<em>图：CacheGen 系统架构。左侧为离线 KV 编码器，将 KV Cache 压缩为多个不同压缩级别的比特流；右侧为在线加载控制器，根据 TTFT 预算选择最优压缩级别进行流式传输和解码。</em></p>\n<p>CacheGen 的核心思路是：<strong>不传输原始 KV 张量，而是将其编码为紧凑比特流</strong>。与 token 剪枝方法（如 Scissorhands、H₂O）不同，CacheGen 不丢弃任何 token，而是通过信息论编码技术压缩全部 KV 特征，在解码端无损或近无损恢复。</p>\n<h5>KV Cache 编码流水线</h5>\n<p>KV Cache 的形状为 <span class=\"kb-math kb-math-inline\">[N, l, c]</span>，其中 <span class=\"kb-math kb-math-inline\">N</span> 为 token 数、<span class=\"kb-math kb-math-inline\">l</span> 为层数、<span class=\"kb-math kb-math-inline\">c</span> 为通道数。CacheGen 的三步压缩流程如下：</p>\n<pre><code>输入: KV Cache 张量 [N, l, c] (float16)\n│\n├─ Step 1: 差分编码 (Delta Encoding)\n│   ├─ 将 token 分为大小为 S 的 chunk\n│   ├─ 每个 chunk 的第一个 token 为锚点 (anchor)\n│   └─ 其余 token 存储与前一 token 的差值: δ_i = KV_i - KV_{i-1}\n│\n├─ Step 2: 层级量化 (Layer-wise Quantization)\n│   ├─ 浅层 1/3: x-bit 量化 (高精度)\n│   ├─ 中层 1/3: y-bit 量化\n│   ├─ 深层 1/3: z-bit 量化 (低精度)\n│   └─ 锚点 token: 统一 8-bit 量化\n│\n├─ Step 3: 通道级算术编码 (Channel-wise AC)\n│   ├─ 为每个 (layer, channel) 组合维护概率分布\n│   ├─ 利用同通道 token 间分布一致性\n│   └─ 仅存储 l×c 个分布 (而非 N×l×c)\n│\n输出: 紧凑比特流 + 概率分布表\n</code></pre>\n<h5>动机与背景</h5>\n<p>在 RAG（检索增强生成）和长上下文对话等场景中，LLM 需要处理数千到数万 token 的上下文。为了避免重复计算，系统通常会预先缓存上下文的 KV Cache 并在用户查询到达时加载。然而，KV Cache 的体积随上下文长度线性增长——例如 Llama-13B 处理 10K token 的上下文会产生约 <strong>10.2 GB</strong> 的 KV Cache（FP16 格式）。</p>\n<p><img alt=\"KV Cache 大小随 token 数增长\" src=\"../assets/cachegen_fig2.png\" />\n<em>图：不同 LLM 的 KV Cache 大小随输入 token 长度的增长趋势。即使是 7B 模型，10K token 也需要数 GB 存储。</em></p>\n<p>传输如此大的张量会导致严重的网络延迟，成为 TTFT 的瓶颈。传统方法要么剪枝 token（需要知道 query，无法离线预处理），要么使用更小的模型（牺牲质量），都不理想。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：KV Cache 虽然体积大，但其内部存在大量可利用的统计冗余——相邻 token 间的 KV 值高度相似，同一通道内的值服从相似分布。CacheGen 正是利用这些冗余实现高效压缩。</div>\n<h5>核心机制详解</h5>\n<p><strong>Step 1: 差分编码——利用 token 局部性</strong></p>\n<p>CacheGen 发现相邻 token 的 KV 特征值高度相关（Insight 1）。直觉上，相邻 token 在同一文档中往往语义相近，其 KV 表示自然相似。因此，存储差分值 <span class=\"kb-math kb-math-inline\">\\delta_i = \\text{KV}_i - \\text{KV}_{i-1}</span> 比存储原始值的信息熵更低。</p>\n<p>具体实现中，token 被分为大小为 <span class=\"kb-math kb-math-inline\">S</span> 的 chunk。每个 chunk 的第一个 token 作为<strong>锚点（anchor）</strong>，存储完整值；其余 token 仅存储与前一 token 的差值。这样做的好处是：\n1. 差分值的分布更集中在零附近，有利于后续的算术编码\n2. chunk 化设计使得解码可以并行进行</p>\n<p><strong>Step 2: 层级量化——浅层多 bit、深层少 bit</strong></p>\n<p><img alt=\"层级量化敏感性分析\" src=\"../assets/cachegen_fig8.png\" />\n<em>图：不同层组的量化比特数对 LLM 输出质量的影响。浅层（前 1/3）对量化最敏感，深层（后 1/3）容忍度最高。</em></p>\n<p>CacheGen 的关键发现是：<strong>浅层 KV 特征对量化损失更敏感</strong>（Insight 3）。直觉上，浅层嵌入了更原始的语义信息，其精度损失会逐层传播并放大；而深层提取的是高层结构，对细微精度变化更鲁棒。</p>\n<p>基于此，CacheGen 将 Transformer 的 <span class=\"kb-math kb-math-inline\">l</span> 层分为三组，分别应用不同精度的量化：</p>\n<div class=\"kb-math kb-math-display\">\\text{Quantization bits} = \\begin{cases} x \\text{ bits} &amp; \\text{浅层 (layer 1 to } l/3\\text{)} \\\\ y \\text{ bits} &amp; \\text{中层 (layer } l/3 \\text{ to } 2l/3\\text{)} \\\\ z \\text{ bits} &amp; \\text{深层 (layer } 2l/3 \\text{ to } l\\text{)} \\end{cases}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">x \\geq y \\geq z</span>。例如，典型配置为 <span class=\"kb-math kb-math-inline\">(x, y, z) = (4, 3, 2)</span>。锚点 token 始终使用 8-bit 量化以保持差分基准的精度。</p>\n<p><strong>Step 3: 通道级算术编码——利用分布一致性</strong></p>\n<p><img alt=\"通道级分布一致性\" src=\"../assets/cachegen_fig7.png\" />\n<em>图：同一 (layer, channel) 组合内，不同 token 的 KV 值分布高度一致（左），而不同 channel 间分布差异显著（右）。</em></p>\n<p>算术编码（AC）是一种接近信息熵下界的无损压缩技术，其效果取决于概率模型的准确性。CacheGen 发现：<strong>同一 channel-layer 组合内的 KV 值跨 token 共享相似的概率分布</strong>（Insight 2），但不同 channel 间分布差异很大。</p>\n<p>因此，CacheGen 为每个 <span class=\"kb-math kb-math-inline\">(\\text{layer}, \\text{channel})</span> 组合维护一个概率分布，用于算术编码。这样只需存储 <span class=\"kb-math kb-math-inline\">l \\times c</span> 个分布（而非 <span class=\"kb-math kb-math-inline\">N \\times l \\times c</span>），存储开销可忽略不计（因为 <span class=\"kb-math kb-math-inline\">N</span> 通常为数千）。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：差分编码和算术编码本身是<strong>无损</strong>的，信息损失仅来自量化步骤。这意味着 CacheGen 可以通过调整量化比特数精确控制压缩率与质量的权衡。</div>\n<h5>上下文加载控制器</h5>\n<p><img alt=\"端到端 TTFT 对比\" src=\"../assets/cachegen_fig10.png\" />\n<em>图：不同网络带宽下，CacheGen 与基线方法的 TTFT 对比。CacheGen 在各带宽条件下均显著降低 TTFT。</em></p>\n<p>不同的应用场景对 TTFT 的容忍度不同。CacheGen 的控制器在用户查询到达时：</p>\n<ol>\n<li><strong>估算 TTFT</strong>：对每个压缩级别 <span class=\"kb-math kb-math-inline\">(x, y, z)</span>，基于历史测量预测网络传输时间 + 解压时间</li>\n<li><strong>选择最优级别</strong>：在满足 TTFT 预算的前提下，选择压缩率最低（质量最高）的版本</li>\n<li><strong>回退机制</strong>：当上下文较短或带宽较低时，直接传输原始文本可能比传输压缩 KV Cache 更快，控制器会自动切换</li>\n</ol>\n<h5>组件消融分析</h5>\n<p><img alt=\"各组件贡献\" src=\"../assets/cachegen_fig15.png\" />\n<em>图：逐步叠加各编码组件的压缩效果。差分编码、通道级 AC 和层级量化各贡献约 1.2–1.5× 的额外压缩。</em></p>\n<p>消融实验表明，三个编码组件各自贡献显著：\n- <strong>差分编码</strong>：将均匀量化 + 默认 AC 的压缩率从 ~1.5× 提升到 ~2.2×\n- <strong>通道级 AC</strong>：进一步提升到 ~3.0×\n- <strong>层级量化</strong>：最终达到 3.5–4.3×</p>\n<h5>与现有方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th style=\"text-align: center;\">是否需要 Query</th>\n<th style=\"text-align: center;\">是否修改模型</th>\n<th>压缩方式</th>\n<th>TTFT 影响</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Token 剪枝 (Scissorhands, H₂O)</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">❌</td>\n<td>丢弃低注意力 token</td>\n<td>无法离线预处理</td>\n</tr>\n<tr>\n<td>Gisting</td>\n<td style=\"text-align: center;\">❌</td>\n<td style=\"text-align: center;\">✅</td>\n<td>将上下文压缩为 gist token</td>\n<td>需要重训练模型</td>\n</tr>\n<tr>\n<td>小模型替代</td>\n<td style=\"text-align: center;\">❌</td>\n<td style=\"text-align: center;\">✅</td>\n<td>使用更小的 LLM</td>\n<td>质量显著下降</td>\n</tr>\n<tr>\n<td><strong>CacheGen</strong></td>\n<td style=\"text-align: center;\"><strong>❌</strong></td>\n<td style=\"text-align: center;\"><strong>❌</strong></td>\n<td><strong>信息论编码压缩 KV</strong></td>\n<td><strong>TTFT ↓ 2.7–3.2×</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>CacheGen 的独特优势在于：<strong>不需要知道用户查询、不修改模型结构、不丢弃任何 token</strong>，且可以与上述方法正交组合使用。</p>",
      "quiz": {
        "q": "CacheGen 在层级量化中对不同深度的 Transformer 层采用不同比特数，其设计依据是什么？",
        "options": [
          "深层参数量更大，需要更多比特来表示",
          "浅层 KV 特征对量化更敏感，精度损失会逐层传播放大",
          "深层的 KV Cache 体积更大，需要更激进的压缩",
          "浅层的 token 数量更多，需要更高精度来区分"
        ],
        "answer": 1,
        "explain": "浅层嵌入了更原始的语义信息，其量化误差会在后续层中传播和放大，因此需要分配更多比特（更高精度）来保护浅层特征。"
      }
    },
    {
      "id": "turboquant",
      "num": 10,
      "name": "TurboQuant",
      "fullName": "涡轮量化 (TurboQuant)",
      "year": "2026",
      "org": "Google Research",
      "parent": "kivi",
      "paperUrl": "https://arxiv.org/abs/2501.06425",
      "projectUrl": "",
      "category": "kv_cache",
      "motivation": "PolarQuant+QJL实现3-bit KV压缩",
      "summary": "TurboQuant 的核心目标是：PolarQuant+QJL实现3-bit KV压缩。",
      "keyPoints": [
        "核心动机：PolarQuant+QJL实现3-bit KV压缩",
        "演化来源：继承或改进自 kivi",
        "代表机构：Google Research"
      ],
      "detail": "<p>PolarQuant+QJL实现3-bit KV压缩</p>"
    },
    {
      "id": "bitdecoding",
      "num": 11,
      "name": "BitDecoding",
      "fullName": "比特解码 (BitDecoding)",
      "year": "2026",
      "org": "爱丁堡大学/微软",
      "parent": "kivi",
      "paperUrl": "https://arxiv.org/abs/2503.18773",
      "projectUrl": "",
      "category": "kv_cache",
      "motivation": "解锁Tensor Core处理低比特KV解码",
      "summary": "BitDecoding 的核心目标是：解锁Tensor Core处理低比特KV解码。",
      "keyPoints": [
        "核心动机：解锁Tensor Core处理低比特KV解码",
        "演化来源：继承或改进自 kivi",
        "代表机构：爱丁堡大学/微软"
      ],
      "detail": "<p>解锁Tensor Core处理低比特KV解码</p>"
    },
    {
      "id": "chunkkv",
      "num": 12,
      "name": "ChunkKV",
      "fullName": "语义分块缓存 (ChunkKV)",
      "year": "2026",
      "org": "X Liu等",
      "parent": "h2o",
      "paperUrl": "https://arxiv.org/abs/2603.20397",
      "projectUrl": "",
      "category": "kv_cache",
      "motivation": "保留Token间语义关系的KV压缩",
      "summary": "ChunkKV 的核心目标是：保留Token间语义关系的KV压缩。",
      "keyPoints": [
        "核心动机：保留Token间语义关系的KV压缩",
        "演化来源：继承或改进自 h2o",
        "代表机构：X Liu等"
      ],
      "detail": "<p><img alt=\"ChunkKV 核心示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2603.20397/assets/x1.png\" />\n<em>图：ChunkKV 的语义分块缓存压缩示意，展示 chunk 级保留比 token 级保留更完整。</em></p>\n<pre><code class=\"language-python\">chunks = semantic_chunk(tokens)\nfor chunk in chunks:\n    chunk.score = aggregate_token_importance(chunk.tokens, attention, recency)\nselected = knapsack_or_topk(chunks, budget_tokens)\nkv_cache.keep_tokens(flatten([c.tokens for c in selected]) + recent_tokens)\n</code></pre>\n<h5>动机与背景</h5>\n<p>token 级 KV 剪枝可能保留主语却删除谓语，或保留实体名却删除限定关系，导致剩余上下文语义碎片化。长文档任务往往依赖连续短语和句子结构，因此压缩单位需要对语义边界更友好。</p>\n<h5>核心机制</h5>\n<p>ChunkKV 先把输入切成语义 chunk，再基于注意力、位置或语义信号评估 chunk 重要性。选择时整块保留或丢弃，确保被保留的信息仍是完整语言片段，而不是散点 token。</p>\n<h5>训练/推理流程</h5>\n<p>prefill 后记录 token 到 chunk 的映射；decode 中更新 chunk-level 重要性；当超出预算时，优先保留高分 chunk 和最近窗口。attention 仍在保留 token 的 KV 上计算，但选择动作发生在 chunk 层。</p>\n<h5>与传统方法的区别</h5>\n<p>H2O/Scissorhands 关注单 token 重要性，ChunkKV 关注 token 间关系。它可能牺牲少量细粒度预算最优性，但换来更强语义连贯性，特别适合自然语言长上下文。</p>"
    },
    {
      "id": "spec_leviathan",
      "num": 13,
      "name": "Speculative Decoding",
      "fullName": "经典投机解码 (Speculative Decoding)",
      "year": "2023",
      "org": "Google",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2211.17192",
      "projectUrl": "",
      "category": "spec_decode",
      "motivation": "草稿-验证范式实现无损推理加速",
      "summary": "Speculative Decoding 的核心目标是：草稿-验证范式实现无损推理加速。",
      "keyPoints": [
        "核心动机：草稿-验证范式实现无损推理加速",
        "代表机构：Google"
      ],
      "detail": "<p><img alt=\"Speculative Decoding 核心示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2211.17192/assets/figure1.png\" />\n<em>图：Leviathan 等提出的 speculative decoding 流程，小模型提出草稿，大模型并行验证。</em></p>\n<pre><code class=\"language-python\">while not finished:\n    draft = []\n    for i in range(gamma):\n        x = sample(q_model(. | prefix + draft))\n        draft.append(x)\n    p = target_model.distributions(prefix, draft)  # one parallel forward\n    for i, x in enumerate(draft):\n        accept_prob = min(1.0, p[i][x] / q[i][x])\n        if random() &lt; accept_prob:\n            prefix.append(x)\n        else:\n            prefix.append(sample(normalize(p[i] - q[i].clamp(max=p[i]))))\n            break\n    if all_accepted:\n        prefix.append(sample(p[gamma]))\n</code></pre>\n<h5>动机与背景</h5>\n<p>自回归解码每生成一个 token 都要跑一次大模型，延迟由串行前向次数决定。即使 GPU 能并行处理多个位置，标准采样也不能提前知道后续 token，因此无法直接批量生成。</p>\n<h5>核心机制</h5>\n<p>投机解码引入较快的近似分布 <span class=\"kb-math kb-math-inline\">q</span> 作为提案分布，目标模型分布 <span class=\"kb-math kb-math-inline\">p</span> 作为校验分布。若 draft token 在 <span class=\"kb-math kb-math-inline\">p</span> 下也足够可能，则接受；若不接受，则从校正后的剩余分布采样，保证边际分布仍等于 <span class=\"kb-math kb-math-inline\">p</span>。</p>\n<h5>训练/推理流程</h5>\n<p>每轮先让 draft model 连续生成 <span class=\"kb-math kb-math-inline\">\\gamma</span> 个 token；然后 target model 对 prefix+draft 做一次并行前向，得到每个位置的 <span class=\"kb-math kb-math-inline\">p_i</span>。验证从左到右进行，直到第一次拒绝或全部接受。接受越多，单次 target 前向产出的 token 越多。</p>\n<h5>与传统方法的区别</h5>\n<p>它与贪心近似、多 token head 不同，是严格 lossless 的采样加速。加速上限取决于 draft model 速度和接受率；draft 越接近 target，接受长度越长，但 draft 成本也可能上升。</p>"
    },
    {
      "id": "spec_chen",
      "num": 14,
      "name": "Speculative Sampling",
      "fullName": "投机采样 (Speculative Sampling)",
      "year": "2023",
      "org": "DeepMind",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2302.01318",
      "projectUrl": "",
      "category": "spec_decode",
      "motivation": "严谨数学证明的拒绝采样加速方案",
      "summary": "Speculative Sampling 的核心目标是：严谨数学证明的拒绝采样加速方案。",
      "keyPoints": [
        "核心动机：严谨数学证明的拒绝采样加速方案",
        "代表机构：DeepMind"
      ],
      "detail": "<p><img alt=\"Speculative Sampling 核心示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2302.01318/assets/x1.png\" />\n<em>图：Speculative Sampling 论文中的算法流程，展示 draft proposal 与 target verification。</em></p>\n<pre><code class=\"language-python\">for round in decoding:\n    y = draft_model.sample_k(prefix, k)\n    p = target_model(prefix + y).next_token_distributions()\n    for i in range(k):\n        if uniform() &lt;= min(1, p[i][y[i]] / q[i][y[i]]):\n            prefix.append(y[i])\n        else:\n            r = relu(p[i] - q[i])\n            prefix.append(sample(r / r.sum()))\n            break\n    if accepted_all:\n        prefix.append(sample(p[k]))\n</code></pre>\n<h5>动机与背景</h5>\n<p>工程上早已有用小模型猜 token 的直觉，但若只是猜对就用、猜错再回退，会改变非贪心采样的概率分布。Chen 等工作的重点是把该过程变成数学上精确的采样算法。</p>\n<h5>核心机制</h5>\n<p>draft 分布 <span class=\"kb-math kb-math-inline\">q</span> 负责提出候选，target 分布 <span class=\"kb-math kb-math-inline\">p</span> 负责定义正确采样。候选 token <span class=\"kb-math kb-math-inline\">x</span> 以 <span class=\"kb-math kb-math-inline\">\\min(1,p(x)/q(x))</span> 接受；拒绝时从 <span class=\"kb-math kb-math-inline\">(p-q)_+</span> 归一化后的分布采样，补上被 draft 过度提案的概率质量。</p>\n<h5>训练/推理流程</h5>\n<p>每轮 draft 自回归生成多个 token；target 并行计算每个候选位置的 logits；验证从前到后进行。一旦某个 token 被拒绝，后续 draft 被丢弃，因为其条件前缀已经不成立。</p>\n<h5>与传统方法的区别</h5>\n<p>与 Leviathan 版本高度相近，但该论文突出数学证明和 speculative sampling 形式化。它不是近似加速，只要实现接受/拒绝与校正采样，输出分布就与逐 token target sampling 一致。</p>"
    },
    {
      "id": "medusa",
      "num": 15,
      "name": "Medusa",
      "fullName": "美杜莎 (Medusa)",
      "year": "2024",
      "org": "Together AI",
      "parent": "spec_leviathan",
      "paperUrl": "https://arxiv.org/abs/2401.10774",
      "projectUrl": "",
      "category": "spec_decode",
      "motivation": "增加并行解码头消除草稿模型依赖",
      "summary": "Medusa 的核心目标是：增加并行解码头消除草稿模型依赖。",
      "keyPoints": [
        "核心动机：增加并行解码头消除草稿模型依赖",
        "演化来源：继承或改进自 spec_leviathan",
        "代表机构：Together AI"
      ],
      "detail": "<p>增加并行解码头消除草稿模型依赖</p>"
    },
    {
      "id": "eagle",
      "num": 16,
      "name": "EAGLE",
      "fullName": "鹰 (EAGLE)",
      "year": "2024",
      "org": "PKU",
      "parent": "spec_leviathan",
      "paperUrl": "https://arxiv.org/abs/2401.15077",
      "projectUrl": "",
      "category": "spec_decode",
      "motivation": "在特征空间投机解决标记预测不确定性",
      "summary": "EAGLE 的核心目标是：在特征空间投机解决标记预测不确定性。",
      "keyPoints": [
        "核心动机：在特征空间投机解决标记预测不确定性",
        "演化来源：继承或改进自 spec_leviathan",
        "代表机构：PKU"
      ],
      "detail": "<p>在特征空间投机解决标记预测不确定性</p>"
    },
    {
      "id": "eagle_v2",
      "num": 17,
      "name": "EAGLE-2",
      "fullName": "鹰2代 (EAGLE-2)",
      "year": "2024",
      "org": "PKU",
      "parent": "eagle",
      "paperUrl": "https://aclanthology.org/2024.emnlp-main.422/",
      "projectUrl": "",
      "category": "spec_decode",
      "motivation": "引入动态草稿树根据置信度调整路径",
      "summary": "EAGLE-2 的核心目标是：引入动态草稿树根据置信度调整路径。",
      "keyPoints": [
        "核心动机：引入动态草稿树根据置信度调整路径",
        "演化来源：继承或改进自 eagle",
        "代表机构：PKU"
      ],
      "detail": "<p><img alt=\"EAGLE-2 核心示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2406.16858/assets/x1.png\" />\n<em>图：EAGLE-2 的动态草稿树，根据节点置信度选择扩展路径。</em></p>\n<pre><code class=\"language-python\">root = current_prefix\nfrontier = [root]\nwhile draft_budget_remaining:\n    node = pop_highest_confidence(frontier)\n    children = eagle_draft(node).topk()\n    for child in children:\n        child.accept_prob = estimate_from_confidence(child)\n        if child.accept_prob &gt; threshold:\n            frontier.push(child)\n    tree.add(children)\nverified = target_model.verify_tree(prefix, tree)\nprefix.extend(accepted_prefix(verified))\n</code></pre>\n<h5>动机与背景</h5>\n<p>EAGLE 使用固定草稿树时，默认同一深度/位置的候选接受率相近。但实际语言上下文差异很大：有些前缀下模型非常确定，有些前缀下分布多峰。固定树会把预算浪费在低置信路径上。</p>\n<h5>核心机制</h5>\n<p>EAGLE-2 使用 draft model 的 confidence 作为接受率近似，动态选择哪些节点继续扩展。高置信节点获得更深或更多子节点，低置信节点少扩展甚至停止。这样同样的验证预算覆盖更可能被接受的路径。</p>\n<h5>训练/推理流程</h5>\n<p>推理时先逐步构造动态 draft tree，而不是使用预设形状；然后 target model 一次验证该树。接受规则仍与投机解码一致，因此改变的是候选集合，不改变最终采样分布。</p>\n<h5>与传统方法的区别</h5>\n<p>EAGLE-1 的树结构静态，EAGLE-2 的树结构随上下文变化。它的核心收益来自更好的草稿预算分配，而不是更大的模型或近似接受。</p>"
    },
    {
      "id": "lookahead",
      "num": 18,
      "name": "Lookahead Decoding",
      "fullName": "展望解码 (Lookahead Decoding)",
      "year": "2024",
      "org": "Stanford",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2402.02057",
      "projectUrl": "",
      "category": "spec_decode",
      "motivation": "基于Jacobi迭代的并行解码无需微调",
      "summary": "Lookahead Decoding 的核心目标是：基于Jacobi迭代的并行解码无需微调。",
      "keyPoints": [
        "核心动机：基于Jacobi迭代的并行解码无需微调",
        "代表机构：Stanford"
      ],
      "detail": "<p><img alt=\"Lookahead Decoding 核心示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2402.02057/assets/x1.png\" />\n<em>图：Lookahead Decoding 的并行生成与验证窗口示意。</em></p>\n<pre><code class=\"language-python\">while not finished:\n    # lookahead branch: parallel propose future tokens\n    guesses = jacobi_parallel_update(prefix, window_size, ngram_size)\n    ngrams = collect_candidate_ngrams(guesses)\n\n    # verification branch: target model verifies candidates\n    accepted = verify_longest_ngram(prefix, ngrams, target_model)\n    if accepted:\n        prefix.extend(accepted)\n    else:\n        prefix.append(target_model.greedy_next(prefix))\n</code></pre>\n<h5>动机与背景</h5>\n<p>投机解码通常需要草稿模型或额外 heads。许多部署场景无法训练或维护这些组件，但仍希望利用 GPU 对多个位置并行计算的能力。Lookahead 从迭代求解角度重写解码过程。</p>\n<h5>核心机制</h5>\n<p>Jacobi 迭代允许在当前近似序列上并行更新多个未来位置。Lookahead 分支持续产生候选 n-gram；验证分支用目标模型检查这些 n-gram 是否与标准解码一致。一旦匹配，就一次提交多个 token。</p>\n<h5>训练/推理流程</h5>\n<p>算法维护一个二维窗口：行表示并行 lookahead 步，列表示不同位置。每轮从窗口中提取可能 n-gram，目标模型对候选进行验证；成功则前缀前进多个 token，失败则退回常规一步。</p>\n<h5>与传统方法的区别</h5>\n<p>与 classic speculative decoding 相比，Lookahead 没有独立 draft model，部署简单；但它主要服务确定性/贪心一致性验证，采样分布处理不像拒绝采样式投机解码那样通用。</p>"
    },
    {
      "id": "eagle_v3",
      "num": 19,
      "name": "EAGLE-3",
      "fullName": "鹰3代 (EAGLE-3)",
      "year": "2025.03",
      "org": "PKU/SafeAI Lab",
      "parent": "eagle_v2",
      "paperUrl": "https://arxiv.org/abs/2503.01840",
      "projectUrl": "",
      "category": "spec_decode",
      "motivation": "直接Token预测+三层特征融合",
      "summary": "EAGLE-3 的核心目标是：直接Token预测+三层特征融合。",
      "keyPoints": [
        "核心动机：直接Token预测+三层特征融合",
        "演化来源：继承或改进自 eagle_v2",
        "代表机构：PKU/SafeAI Lab"
      ],
      "detail": "<p>直接Token预测+三层特征融合</p>"
    },
    {
      "id": "p_eagle",
      "num": 20,
      "name": "P-EAGLE",
      "fullName": "并行鹰 (P-EAGLE)",
      "year": "2026.02",
      "org": "Amazon",
      "parent": "eagle_v3",
      "paperUrl": "https://arxiv.org/abs/2602.01469",
      "projectUrl": "",
      "category": "spec_decode",
      "motivation": "并行草稿单次前向生成K个draft",
      "summary": "P-EAGLE 的核心目标是：并行草稿单次前向生成K个draft。",
      "keyPoints": [
        "核心动机：并行草稿单次前向生成K个draft",
        "演化来源：继承或改进自 eagle_v3",
        "代表机构：Amazon"
      ],
      "detail": "<p>并行草稿单次前向生成K个draft</p>"
    },
    {
      "id": "ssd",
      "num": 21,
      "name": "SSD",
      "fullName": "异步投机解码 (SSD)",
      "year": "2026.03",
      "org": "Stanford/Together AI",
      "parent": "spec_leviathan",
      "paperUrl": "https://arxiv.org/abs/2603.03251",
      "projectUrl": "",
      "category": "spec_decode",
      "motivation": "异步草稿验证+几何扇出策略",
      "summary": "SSD 的核心目标是：异步草稿验证+几何扇出策略。",
      "keyPoints": [
        "核心动机：异步草稿验证+几何扇出策略",
        "演化来源：继承或改进自 spec_leviathan",
        "代表机构：Stanford/Together AI"
      ],
      "detail": "<p><img alt=\"SSD 核心示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2603.03251/assets/x1.png\" />\n<em>图：SSD/Saguaro 的异步草稿与验证重叠框架。</em></p>\n<pre><code class=\"language-python\">while decoding:\n    current_spec = get_ready_speculation(prefix)\n    verify_future = target_model.verify_async(prefix, current_spec)\n\n    # while verification is running, draft possible continuations\n    outcomes = predict_verification_outcomes(current_spec)\n    for outcome in fanout(outcomes, strategy='geometric'):\n        cache[outcome] = draft_model.speculate(prefix_after(outcome))\n\n    result = verify_future.wait()\n    prefix.extend(result.accepted)\n    if result in cache:\n        next_spec = cache[result]\n</code></pre>\n<h5>动机与背景</h5>\n<p>普通投机解码每轮需要先 draft，再 target verify，再根据验证结果开始下一轮 draft。即使 target 验证本身并行，轮与轮之间仍存在串行控制依赖，尤其 draft 成本不可忽略时会限制加速。</p>\n<h5>核心机制</h5>\n<p>SSD 让 draft model 在 target 验证期间猜测验证会产生哪些结果，例如接受几个 token，并提前为这些可能前缀生成下一轮草稿。若真实验证结果落在预测集合中，就能直接使用已准备好的 speculation。</p>\n<h5>训练/推理流程</h5>\n<p>系统维护 speculation cache。当前候选送入 target 异步验证后，draft model 根据可能结果做 fanout。fanout 可以均匀分配，也可以按几何策略偏向更可能接受长度。验证返回后，命中则无缝继续，未命中则退回普通 draft。</p>\n<h5>与传统方法的区别</h5>\n<p>SSD 不是替代 speculative decoding，而是在其外层再做一次投机，目标是重叠 draft 与 verify 的控制间隙。正确性仍依赖最终 target 验证，预测错只损失额外 draft 计算。</p>"
    },
    {
      "id": "flashattn",
      "num": 22,
      "name": "FlashAttention",
      "fullName": "闪电注意力 (FlashAttention)",
      "year": "2022",
      "org": "Stanford",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2205.14135",
      "projectUrl": "",
      "category": "attention",
      "motivation": "IO感知的分块计算减少内存访问",
      "summary": "FlashAttention 的核心目标是：IO感知的分块计算减少内存访问。",
      "keyPoints": [
        "核心动机：IO感知的分块计算减少内存访问",
        "代表机构：Stanford"
      ],
      "detail": "<p>IO感知的分块计算减少内存访问</p>"
    },
    {
      "id": "flashattn_v2",
      "num": 23,
      "name": "FlashAttention-2",
      "fullName": "闪电注意力2代 (FlashAttention-2)",
      "year": "2023",
      "org": "Stanford",
      "parent": "flashattn",
      "paperUrl": "https://arxiv.org/abs/2307.08691",
      "projectUrl": "",
      "category": "attention",
      "motivation": "优化并行策略提升硬件利用率",
      "summary": "FlashAttention-2 的核心目标是：优化并行策略提升硬件利用率。",
      "keyPoints": [
        "核心动机：优化并行策略提升硬件利用率",
        "演化来源：继承或改进自 flashattn",
        "代表机构：Stanford"
      ],
      "detail": "<p>优化并行策略提升硬件利用率</p>"
    },
    {
      "id": "flash_decoding",
      "num": 24,
      "name": "Flash-Decoding",
      "fullName": "闪电解码 (Flash-Decoding)",
      "year": "2023",
      "org": "Stanford",
      "parent": "flashattn_v2",
      "paperUrl": "https://crfm.stanford.edu/2023/10/12/flash-decoding.html",
      "projectUrl": "",
      "category": "attention",
      "motivation": "沿序列维度切分并行加速长文本解码",
      "summary": "Flash-Decoding 的核心目标是：沿序列维度切分并行加速长文本解码。",
      "keyPoints": [
        "核心动机：沿序列维度切分并行加速长文本解码",
        "演化来源：继承或改进自 flashattn_v2",
        "代表机构：Stanford"
      ],
      "detail": "<p>沿序列维度切分并行加速长文本解码</p>"
    },
    {
      "id": "flashattn_v3",
      "num": 25,
      "name": "FlashAttention-3",
      "fullName": "闪电注意力3代 (FlashAttention-3)",
      "year": "2024",
      "org": "Stanford",
      "parent": "flashattn_v2",
      "paperUrl": "https://arxiv.org/abs/2407.08691",
      "projectUrl": "",
      "category": "attention",
      "motivation": "针对Hopper架构实现异步计算重叠",
      "summary": "FlashAttention-3 的核心目标是：针对Hopper架构实现异步计算重叠。",
      "keyPoints": [
        "核心动机：针对Hopper架构实现异步计算重叠",
        "演化来源：继承或改进自 flashattn_v2",
        "代表机构：Stanford"
      ],
      "detail": "<p>针对Hopper架构实现异步计算重叠</p>"
    },
    {
      "id": "mla",
      "num": 26,
      "name": "MLA",
      "fullName": "多头潜在注意力 (Multi-Head Latent Attention)",
      "year": "2024.05",
      "org": "DeepSeek",
      "parent": "gqa",
      "paperUrl": "https://arxiv.org/abs/2405.04434",
      "projectUrl": "",
      "category": "attention",
      "motivation": "KV低秩压缩大幅降低缓存显存占用",
      "summary": "MLA 的核心目标是：KV低秩压缩大幅降低缓存显存占用。",
      "keyPoints": [
        "核心动机：KV低秩压缩大幅降低缓存显存占用",
        "演化来源：继承或改进自 gqa",
        "代表机构：DeepSeek"
      ],
      "detail": "<p>KV低秩压缩大幅降低缓存显存占用</p>"
    },
    {
      "id": "ring_attn",
      "num": 27,
      "name": "Ring Attention",
      "fullName": "环形注意力 (Ring Attention)",
      "year": "2023",
      "org": "UC Berkeley",
      "parent": "flashattn",
      "paperUrl": "https://arxiv.org/abs/2310.01802",
      "projectUrl": "",
      "category": "attention",
      "motivation": "分布式环形通信支持近乎无限上下文",
      "summary": "Ring Attention 的核心目标是：分布式环形通信支持近乎无限上下文。",
      "keyPoints": [
        "核心动机：分布式环形通信支持近乎无限上下文",
        "演化来源：继承或改进自 flashattn",
        "代表机构：UC Berkeley"
      ],
      "detail": "<p>分布式环形通信支持近乎无限上下文</p>"
    },
    {
      "id": "striped_attn",
      "num": 28,
      "name": "Striped Attention",
      "fullName": "条纹注意力 (Striped Attention)",
      "year": "2023",
      "org": "UC Berkeley",
      "parent": "ring_attn",
      "paperUrl": "https://arxiv.org/abs/2311.09431",
      "projectUrl": "",
      "category": "attention",
      "motivation": "交错分配标记解决因果掩码负载不均",
      "summary": "Striped Attention 的核心目标是：交错分配标记解决因果掩码负载不均。",
      "keyPoints": [
        "核心动机：交错分配标记解决因果掩码负载不均",
        "演化来源：继承或改进自 ring_attn",
        "代表机构：UC Berkeley"
      ],
      "detail": "<p>交错分配标记解决因果掩码负载不均</p>"
    },
    {
      "id": "flashmla",
      "num": 29,
      "name": "FlashMLA",
      "fullName": "闪电MLA内核 (FlashMLA)",
      "year": "2025.02",
      "org": "DeepSeek",
      "parent": "mla",
      "paperUrl": "https://github.com/deepseek-ai/FlashMLA",
      "projectUrl": "",
      "category": "attention",
      "motivation": "针对Hopper优化的MLA高效解码内核",
      "summary": "FlashMLA 的核心目标是：针对Hopper优化的MLA高效解码内核。",
      "keyPoints": [
        "核心动机：针对Hopper优化的MLA高效解码内核",
        "演化来源：继承或改进自 mla",
        "代表机构：DeepSeek"
      ],
      "detail": "<p>针对Hopper优化的MLA高效解码内核</p>"
    },
    {
      "id": "flashattn_v4",
      "num": 30,
      "name": "FlashAttention-4",
      "fullName": "闪电注意力4代 (FlashAttention-4)",
      "year": "2026.03",
      "org": "Tri Dao",
      "parent": "flashattn_v3",
      "paperUrl": "https://arxiv.org/abs/2603.05451",
      "projectUrl": "",
      "category": "attention",
      "motivation": "算法与内核协同设计适配Blackwell",
      "summary": "FlashAttention-4 的核心目标是：算法与内核协同设计适配Blackwell。",
      "keyPoints": [
        "核心动机：算法与内核协同设计适配Blackwell",
        "演化来源：继承或改进自 flashattn_v3",
        "代表机构：Tri Dao"
      ],
      "detail": "<p>算法与内核协同设计适配Blackwell</p>"
    },
    {
      "id": "nsa",
      "num": 31,
      "name": "NSA",
      "fullName": "原生稀疏注意力 (Native Sparse Attention)",
      "year": "2025",
      "org": "DeepSeek",
      "parent": "flashattn_v2",
      "paperUrl": "https://arxiv.org/abs/2502.11089",
      "projectUrl": "",
      "category": "attention",
      "motivation": "硬件对齐的原生可训练稀疏注意力",
      "summary": "NSA 的核心目标是：硬件对齐的原生可训练稀疏注意力。",
      "keyPoints": [
        "核心动机：硬件对齐的原生可训练稀疏注意力",
        "演化来源：继承或改进自 flashattn_v2",
        "代表机构：DeepSeek"
      ],
      "detail": "<p>硬件对齐的原生可训练稀疏注意力</p>"
    },
    {
      "id": "dsa",
      "num": 32,
      "name": "DSA",
      "fullName": "DeepSeek稀疏注意力 (DeepSeek Sparse Attention)",
      "year": "2026",
      "org": "DeepSeek",
      "parent": "nsa",
      "paperUrl": "https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro",
      "projectUrl": "",
      "category": "attention",
      "motivation": "混合架构减90%KV缓存",
      "summary": "DSA 的核心目标是：混合架构减90%KV缓存。",
      "keyPoints": [
        "核心动机：混合架构减90%KV缓存",
        "演化来源：继承或改进自 nsa",
        "代表机构：DeepSeek"
      ],
      "detail": "<p>混合架构减90%KV缓存</p>"
    },
    {
      "id": "hisa",
      "num": 33,
      "name": "HISA",
      "fullName": "层次化索引稀疏注意力 (HISA)",
      "year": "2026",
      "org": "Y Xu等",
      "parent": "nsa",
      "paperUrl": "https://arxiv.org/abs/2603.28458",
      "projectUrl": "",
      "category": "attention",
      "motivation": "层次化索引实现细粒度稀疏注意力",
      "summary": "HISA 的核心目标是：层次化索引实现细粒度稀疏注意力。",
      "keyPoints": [
        "核心动机：层次化索引实现细粒度稀疏注意力",
        "演化来源：继承或改进自 nsa",
        "代表机构：Y Xu等"
      ],
      "detail": "<p>层次化索引实现细粒度稀疏注意力</p>"
    },
    {
      "id": "orca",
      "num": 34,
      "name": "Orca",
      "fullName": "虎鲸 (Orca)",
      "year": "2022",
      "org": "SNU",
      "parent": "—",
      "paperUrl": "https://www.usenix.org/conference/osdi22/presentation/yu",
      "projectUrl": "",
      "category": "engine",
      "motivation": "首次提出迭代级调度实现连续批处理",
      "summary": "Orca 的核心目标是：首次提出迭代级调度实现连续批处理。",
      "keyPoints": [
        "核心动机：首次提出迭代级调度实现连续批处理",
        "代表机构：SNU"
      ],
      "detail": "<p>首次提出迭代级调度实现连续批处理</p>"
    },
    {
      "id": "deepspeed_infer",
      "num": 35,
      "name": "DeepSpeed-Inference",
      "fullName": "DeepSpeed推理 (DeepSpeed-Inference)",
      "year": "2022",
      "org": "Microsoft",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2207.00032",
      "projectUrl": "",
      "category": "engine",
      "motivation": "异构存储卸载支持万亿参数模型推理",
      "summary": "DeepSpeed-Inference 的核心目标是：异构存储卸载支持万亿参数模型推理。",
      "keyPoints": [
        "核心动机：异构存储卸载支持万亿参数模型推理",
        "代表机构：Microsoft"
      ],
      "detail": "<p>异构存储卸载支持万亿参数模型推理</p>"
    },
    {
      "id": "vllm",
      "num": 36,
      "name": "vLLM",
      "fullName": "vLLM引擎 (vLLM)",
      "year": "2023",
      "org": "UC Berkeley",
      "parent": "pagedattn",
      "paperUrl": "https://arxiv.org/abs/2309.06180",
      "projectUrl": "",
      "category": "engine",
      "motivation": "集成PagedAttention的高吞吐引擎",
      "summary": "vLLM 的核心目标是：集成PagedAttention的高吞吐引擎。",
      "keyPoints": [
        "核心动机：集成PagedAttention的高吞吐引擎",
        "演化来源：继承或改进自 pagedattn",
        "代表机构：UC Berkeley"
      ],
      "detail": "<p><img alt=\"vLLM 核心示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2309.06180/assets/x2.png\" />\n<em>图：vLLM 论文中的 PagedAttention block 管理图，解释 vLLM 高吞吐的内存基础。</em></p>\n<pre><code class=\"language-python\">engine = VLLMEngine(model, paged_kv_allocator)\nwhile True:\n    new_reqs = receive_requests()\n    scheduler.add(new_reqs)\n    batch = scheduler.build_continuous_batch(kv_budget)\n    outputs = model.forward(batch, paged_kv_cache)\n    scheduler.update(outputs)\n</code></pre>\n<h5>动机与背景</h5>\n<p>LLM serving 的瓶颈不仅是算力，还包括 KV cache 显存碎片、不同请求长度造成的调度浪费，以及多候选采样中的前缀复制。简单 batching 不能充分利用 GPU。</p>\n<h5>核心机制</h5>\n<p>vLLM 用 PagedAttention 让 KV cache 以块为单位按需分配；调度器按 iteration 进行 continuous batching；共享前缀通过 copy-on-write 避免重复 KV。系统接口封装为易用服务。</p>\n<h5>训练/推理流程</h5>\n<p>请求到达后先 prefill，写入 paged KV；decode 阶段调度器每轮选择一批可运行请求，模型读取 block table 执行 attention，输出 token 后更新请求状态和 KV blocks。</p>\n<h5>与传统方法的区别</h5>\n<p>PagedAttention 是核心算法，vLLM 是完整系统。它把内存管理、调度、模型执行和 API 服务结合起来，使算法收益变成实际吞吐提升。</p>"
    },
    {
      "id": "trt_llm",
      "num": 37,
      "name": "TensorRT-LLM",
      "fullName": "TensorRT推理库 (TensorRT-LLM)",
      "year": "2024",
      "org": "NVIDIA",
      "parent": "—",
      "paperUrl": "https://github.com/NVIDIA/TensorRT-LLM",
      "projectUrl": "",
      "category": "engine",
      "motivation": "深度适配NVIDIA硬件的极致性能库",
      "summary": "TensorRT-LLM 的核心目标是：深度适配NVIDIA硬件的极致性能库。",
      "keyPoints": [
        "核心动机：深度适配NVIDIA硬件的极致性能库",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>深度适配NVIDIA硬件的极致性能库</p>"
    },
    {
      "id": "sglang",
      "num": 38,
      "name": "SGLang",
      "fullName": "结构化语言引擎 (SGLang)",
      "year": "2023",
      "org": "UC Berkeley",
      "parent": "vllm",
      "paperUrl": "https://arxiv.org/abs/2312.07104",
      "projectUrl": "",
      "category": "engine",
      "motivation": "RadixAttention实现前缀缓存自动复用",
      "summary": "SGLang 的核心目标是：RadixAttention实现前缀缓存自动复用。",
      "keyPoints": [
        "核心动机：RadixAttention实现前缀缓存自动复用",
        "演化来源：继承或改进自 vllm",
        "代表机构：UC Berkeley"
      ],
      "detail": "<p>RadixAttention实现前缀缓存自动复用</p>"
    },
    {
      "id": "dynamo",
      "num": 39,
      "name": "Dynamo",
      "fullName": "NVIDIA Dynamo (Dynamo)",
      "year": "2026.03",
      "org": "NVIDIA",
      "parent": "trt_llm",
      "paperUrl": "https://github.com/ai-dynamo/dynamo",
      "projectUrl": "",
      "category": "engine",
      "motivation": "开源分布式推理框架支持PD物理解耦",
      "summary": "Dynamo 的核心目标是：开源分布式推理框架支持PD物理解耦。",
      "keyPoints": [
        "核心动机：开源分布式推理框架支持PD物理解耦",
        "演化来源：继承或改进自 trt_llm",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>开源分布式推理框架支持PD物理解耦</p>"
    },
    {
      "id": "flashinfer",
      "num": 40,
      "name": "FlashInfer",
      "fullName": "FlashInfer (FlashInfer)",
      "year": "2026",
      "org": "CMU/Dao-AILab",
      "parent": "flashattn",
      "paperUrl": "https://arxiv.org/abs/2601.00227",
      "projectUrl": "",
      "category": "engine",
      "motivation": "AI驱动的GPU注意力内核生成框架",
      "summary": "FlashInfer 的核心目标是：AI驱动的GPU注意力内核生成框架。",
      "keyPoints": [
        "核心动机：AI驱动的GPU注意力内核生成框架",
        "演化来源：继承或改进自 flashattn",
        "代表机构：CMU/Dao-AILab"
      ],
      "detail": "<p>AI驱动的GPU注意力内核生成框架</p>"
    },
    {
      "id": "vllm_v1",
      "num": 41,
      "name": "vLLM v1",
      "fullName": "vLLM v1 (vLLM v1)",
      "year": "2026",
      "org": "vLLM社区",
      "parent": "vllm",
      "paperUrl": "https://github.com/vllm-project/vllm",
      "projectUrl": "",
      "category": "engine",
      "motivation": "V2架构零泡沫异步调度",
      "summary": "vLLM v1 的核心目标是：V2架构零泡沫异步调度。",
      "keyPoints": [
        "核心动机：V2架构零泡沫异步调度",
        "演化来源：继承或改进自 vllm",
        "代表机构：vLLM社区"
      ],
      "detail": "<p>V2架构零泡沫异步调度</p>"
    },
    {
      "id": "sglang_v05",
      "num": 42,
      "name": "SGLang v0.5",
      "fullName": "SGLang v0.5 (SGLang v0.5)",
      "year": "2026",
      "org": "UC Berkeley",
      "parent": "sglang",
      "paperUrl": "https://github.com/sgl-project/sglang",
      "projectUrl": "",
      "category": "engine",
      "motivation": "弹性专家并行+GPU Staging Buffer",
      "summary": "SGLang v0.5 的核心目标是：弹性专家并行+GPU Staging Buffer。",
      "keyPoints": [
        "核心动机：弹性专家并行+GPU Staging Buffer",
        "演化来源：继承或改进自 sglang",
        "代表机构：UC Berkeley"
      ],
      "detail": "<p>弹性专家并行+GPU Staging Buffer</p>"
    },
    {
      "id": "gptq",
      "num": 43,
      "name": "GPTQ",
      "fullName": "GPT量化 (GPTQ)",
      "year": "2022",
      "org": "IST Austria",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2210.17323",
      "projectUrl": "",
      "category": "quantize",
      "motivation": "高效二阶权重补偿实现4-bit无损量化",
      "summary": "GPTQ 的核心目标是：高效二阶权重补偿实现4-bit无损量化。",
      "keyPoints": [
        "核心动机：高效二阶权重补偿实现4-bit无损量化",
        "代表机构：IST Austria"
      ],
      "detail": "<p>高效二阶权重补偿实现4-bit无损量化</p>"
    },
    {
      "id": "smoothquant",
      "num": 44,
      "name": "SmoothQuant",
      "fullName": "平滑量化 (SmoothQuant)",
      "year": "2022",
      "org": "MIT",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2211.10438",
      "projectUrl": "",
      "category": "quantize",
      "motivation": "迁移激活值量化难度实现W8A8推理",
      "summary": "SmoothQuant 的核心目标是：迁移激活值量化难度实现W8A8推理。",
      "keyPoints": [
        "核心动机：迁移激活值量化难度实现W8A8推理",
        "代表机构：MIT"
      ],
      "detail": "<p>迁移激活值量化难度实现W8A8推理</p>"
    },
    {
      "id": "sparsegpt",
      "num": 45,
      "name": "SparseGPT",
      "fullName": "稀疏GPT (SparseGPT)",
      "year": "2023",
      "org": "IST Austria",
      "parent": "gptq",
      "paperUrl": "https://arxiv.org/abs/2301.00774",
      "projectUrl": "",
      "category": "quantize",
      "motivation": "一步式无结构剪枝支持千亿参数模型",
      "summary": "SparseGPT 的核心目标是：一步式无结构剪枝支持千亿参数模型。",
      "keyPoints": [
        "核心动机：一步式无结构剪枝支持千亿参数模型",
        "演化来源：继承或改进自 gptq",
        "代表机构：IST Austria"
      ],
      "detail": "<p>一步式无结构剪枝支持千亿参数模型</p>"
    },
    {
      "id": "awq",
      "num": 46,
      "name": "AWQ",
      "fullName": "激活感知权重量化 (AWQ)",
      "year": "2023",
      "org": "MIT",
      "parent": "smoothquant",
      "paperUrl": "https://arxiv.org/abs/2306.00978",
      "projectUrl": "",
      "category": "quantize",
      "motivation": "保护显著权重通道提升低比特量化精度",
      "summary": "AWQ 提出了一种激活感知的权重量化方法，通过观察激活分布识别显著权重通道并施加逐通道缩放保护，无需反向传播或权重重建即可显著提升低比特（INT3/INT4）权重量化精度，同时保持对不同领域和模态的泛化能力。",
      "keyPoints": [
        "<strong>核心观察</strong>：LLM 中仅 1% 的显著权重通道（由激活幅度决定而非权重幅度）对量化性能至关重要",
        "<strong>逐通道缩放</strong>：对显著权重通道乘以缩放因子 <span class=\"kb-math kb-math-inline\">s &gt; 1</span>，等价地缩小对应激活通道，在不引入混合精度的前提下降低量化误差",
        "<strong>激活感知搜索</strong>：缩放因子搜索空间设计为 <span class=\"kb-math kb-math-inline\">s = s_X^\\alpha</span>（<span class=\"kb-math kb-math-inline\">s_X</span> 为逐通道激活均值，<span class=\"kb-math kb-math-inline\">\\alpha \\in [0, 1]</span>），通过网格搜索最小化量化输出误差",
        "<strong>无需训练/回归</strong>：仅需少量校准数据测量激活统计量，比 GPTQ 所需校准集小 10 倍",
        "<strong>对校准集分布鲁棒</strong>：跨域校准时 PPL 仅增加 0.5-0.6，而 GPTQ 增加 2.3-4.9",
        "<strong>广泛泛化</strong>：支持 LLaMA、OPT 等基础模型，以及指令微调模型（Vicuna）和多模态模型（OpenFlamingo、LLaVA）",
        "<strong>TinyChat 推理系统</strong>：通过内核融合实现实际加速，4090 上达 3.9× 加速，笔记本 4070（8GB）上以 33 tok/s 运行 Llama-2-13B",
        "<strong>与 GPTQ 正交</strong>：可与 GPTQ 组合进一步提升 INT2 极低比特量化性能"
      ],
      "detail": "<p><img alt=\"AWQ 核心方法示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2306.00978/assets/x1.png\" />\n<em>图：AWQ 方法概览。左：直接 INT3 量化导致严重性能退化（PPL=43.2）；中：保留 1% 显著权重为 FP16 可大幅改善（PPL=13.0），但混合精度硬件不友好；右：AWQ 通过逐通道缩放保护显著权重，实现硬件友好的高精度量化。</em></p>\n<pre><code class=\"language-python\"># AWQ 核心算法伪代码\n# 输入: 权重矩阵 W (c_out × c_in), 校准集激活 X, 量化比特数 N, 搜索粒度 n_grid\n# 输出: 最优缩放向量 s*\n\ndef awq_search(W, X, N, n_grid=20):\n    # Step 1: 计算逐通道激活均值作为显著性指标\n    s_X = X.abs().mean(dim=0)  # shape: (c_in,)\n\n    best_loss = float('inf')\n    best_alpha = 0\n\n    # Step 2: 网格搜索最优 alpha\n    for alpha in linspace(0, 1, n_grid):\n        s = s_X.pow(alpha)  # 缩放因子\n\n        # Step 3: 对权重施加缩放后量化\n        W_scaled = W * s.unsqueeze(0)        # W · diag(s)\n        W_q = quantize(W_scaled, N)           # Q(W · diag(s))\n\n        # Step 4: 计算量化输出误差 (缩放逆变换应用于激活)\n        X_scaled = X / s.unsqueeze(0)         # diag(s)^{-1} · X\n        loss = (W_q @ X_scaled - W @ X).pow(2).mean()\n\n        if loss &lt; best_loss:\n            best_loss = loss\n            best_alpha = alpha\n\n    return s_X.pow(best_alpha)\n\ndef quantize(w, N):\n    &quot;&quot;&quot;均匀量化函数&quot;&quot;&quot;\n    delta = w.abs().max() / (2**(N-1) - 1)\n    return delta * torch.round(w / delta)\n</code></pre>\n<h5>动机与背景</h5>\n<p>大语言模型（LLM）的参数量从数十亿到数千亿不等，部署时面临严峻的内存和计算瓶颈。<strong>权重量化</strong>（Weight-only Quantization）是一种有效的模型压缩方法，将权重从 FP16 压缩到 INT3/INT4，可以减少 3-4 倍模型大小，并加速 token 生成阶段的内存受限推理。</p>\n<p>现有方法存在两大问题：\n1. <strong>Round-to-Nearest (RTN)</strong>：直接将权重四舍五入到最近整数，简单但在低比特（≤4bit）下性能退化严重\n2. <strong>GPTQ</strong>：基于逐层权重重建（OBQ/OBS），通过最小化重建误差调整量化权重，但依赖反向传播/回归过程，容易<strong>过拟合校准集</strong>，损害模型在其他领域和模态上的泛化能力</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：AWQ 发现 LLM 权重的重要性不均等——仅 1% 的权重通道对模型性能至关重要，而这些显著通道应通过<strong>激活分布</strong>（而非权重分布）来识别。</div>\n<h5>核心机制：激活感知缩放</h5>\n<p><strong>Step 1: 识别显著权重通道</strong></p>\n<p>AWQ 的第一个发现是：保留少量（0.1%-1%）权重通道为 FP16 可以显著改善量化性能。关键在于如何选择这些通道：</p>\n<ul>\n<li>按<strong>权重幅度</strong>选择 → 效果与随机选择相当</li>\n<li>按<strong>激活幅度</strong>选择 → 显著提升性能，甚至匹配 GPTQ</li>\n</ul>\n<p>直觉是：激活幅度大的输入特征通常更重要，保留对应权重可以保护这些特征的传递。</p>\n<p><strong>Step 2: 用缩放替代混合精度</strong></p>\n<p>混合精度（部分 FP16 + 部分 INT3）虽然有效，但硬件实现困难。AWQ 提出用<strong>逐通道缩放</strong>来等效保护显著权重。</p>\n<p>对于线性运算 <span class=\"kb-math kb-math-inline\">y = \\mathbf{w} \\cdot \\mathbf{x}</span>，量化误差为：</p>\n<div class=\"kb-math kb-math-display\">\\text{Err}(Q(\\mathbf{w})) = \\Delta \\cdot \\text{RoundErr}, \\quad \\Delta = \\frac{\\max(|\\mathbf{w}|)}{2^{N-1} - 1}</div>\n<p>当对权重通道乘以缩放因子 <span class=\"kb-math kb-math-inline\">s &gt; 1</span> 时（同时对激活除以 <span class=\"kb-math kb-math-inline\">s</span> 以保持等价性），量化误差变为：</p>\n<div class=\"kb-math kb-math-display\">\\text{Err}(Q(w \\cdot s) / s \\cdot x) = \\frac{\\Delta \\cdot \\text{RoundErr}}{s} \\cdot x</div>\n<div class=\"key-point\">💡 <strong>关键</strong>：缩放因子 <span class=\"kb-math kb-math-inline\">s</span> 使得显著通道的<strong>相对量化误差</strong>降低为原来的 <span class=\"kb-math kb-math-inline\">1/s</span>。虽然 <span class=\"kb-math kb-math-inline\">\\Delta</span> 可能因最大值变化而略微增大，但对于显著通道（激活幅度大），<span class=\"kb-math kb-math-inline\">s</span> 带来的误差降低远大于 <span class=\"kb-math kb-math-inline\">\\Delta</span> 增大的代价。</div>\n<p><strong>Step 3: 自动搜索最优缩放因子</strong></p>\n<p>直接为每个通道独立搜索 <span class=\"kb-math kb-math-inline\">s</span> 会导致搜索空间过大。AWQ 巧妙地将搜索空间参数化为：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{s} = \\mathbf{s}_X^\\alpha, \\quad \\alpha \\in [0, 1]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{s}_X</span> 是逐通道的激活均值幅度。这一设计的直觉是：\n- <span class=\"kb-math kb-math-inline\">\\alpha = 0</span>：不缩放（等同于 RTN）\n- <span class=\"kb-math kb-math-inline\">\\alpha = 1</span>：完全按激活幅度缩放\n- 最优 <span class=\"kb-math kb-math-inline\">\\alpha</span> 在两者之间，平衡显著通道保护与非显著通道的量化精度</p>\n<p>搜索目标为最小化量化前后的输出误差：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}(\\mathbf{s}) = \\| Q(\\mathbf{W} \\cdot \\text{diag}(\\mathbf{s})) \\cdot (\\text{diag}(\\mathbf{s})^{-1} \\cdot \\mathbf{X}) - \\mathbf{W} \\mathbf{X} \\|</div>\n<p>通过在 <span class=\"kb-math kb-math-inline\">[0, 1]</span> 上进行网格搜索（默认 20 个点），逐层确定最优 <span class=\"kb-math kb-math-inline\">\\alpha</span>。整个搜索过程无需梯度计算，仅需前向传播，非常高效。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：缩放操作在数学上等价于将缩放因子融合到前一层的权重或归一化参数中（如 LayerNorm），因此不引入额外的推理开销。</div>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>RTN</th>\n<th>GPTQ</th>\n<th>AWQ</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>是否需要反向传播</td>\n<td>❌</td>\n<td>✅（逐层重建）</td>\n<td>❌</td>\n</tr>\n<tr>\n<td>校准数据需求</td>\n<td>无</td>\n<td>较多（128-192 序列）</td>\n<td>极少（~16 序列）</td>\n</tr>\n<tr>\n<td>校准集过拟合风险</td>\n<td>无</td>\n<td>高</td>\n<td>低</td>\n</tr>\n<tr>\n<td>多模态/跨域泛化</td>\n<td>一般</td>\n<td>差（过拟合）</td>\n<td>好</td>\n</tr>\n<tr>\n<td>INT3 LLaMA-7B PPL</td>\n<td>25.54</td>\n<td>5.69</td>\n<td>5.60</td>\n</tr>\n<tr>\n<td>INT4 LLaMA-7B PPL</td>\n<td>5.68</td>\n<td>5.63</td>\n<td>5.60</td>\n</tr>\n<tr>\n<td>与 GPTQ 组合</td>\n<td>—</td>\n<td>—</td>\n<td>✅（INT2 场景）</td>\n</tr>\n</tbody>\n</table></div>\n<h5>TinyChat 推理系统</h5>\n<p>AWQ 不仅是量化算法，还配套了 TinyChat 高效推理系统：</p>\n<ul>\n<li><strong>内核融合</strong>：将反量化与矩阵乘法融合，减少中间 DRAM 访问和内核启动开销</li>\n<li><strong>全模型优化</strong>：同时优化量化线性层和非量化层（如 LayerNorm、Attention）</li>\n<li><strong>跨平台部署</strong>：支持桌面 GPU（RTX 4090）、笔记本 GPU（RTX 4070）和边缘设备（Jetson Orin）</li>\n<li><strong>实测加速</strong>：</li>\n<li>RTX 4090：2.7-3.9× 加速（对比 HuggingFace FP16）</li>\n<li>RTX 4070（8GB）：以 33 tok/s 运行 Llama-2-13B（FP16 连 7B 都无法加载）</li>\n<li>Jetson Orin（32GB）：可运行 MPT-30B，达 7.8 tok/s</li>\n</ul>",
      "quiz": {
        "q": "AWQ 选择显著权重通道的依据是什么？",
        "options": [
          "权重的 L2 范数大小",
          "权重的绝对值大小",
          "对应输入激活的幅度大小",
          "梯度的幅度大小"
        ],
        "answer": 2,
        "explain": "AWQ 的核心发现是按激活幅度（而非权重幅度）选择显著通道效果最好，因为激活幅度大的特征通常更重要，保护对应权重可以保留这些关键特征的传递。"
      }
    },
    {
      "id": "wanda",
      "num": 47,
      "name": "Wanda",
      "fullName": "权重与激活剪枝 (Wanda)",
      "year": "2023",
      "org": "CMU",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2306.11695",
      "projectUrl": "",
      "category": "quantize",
      "motivation": "极简剪枝准则无需二阶信息计算",
      "summary": "Wanda 的核心目标是：极简剪枝准则无需二阶信息计算。",
      "keyPoints": [
        "核心动机：极简剪枝准则无需二阶信息计算",
        "代表机构：CMU"
      ],
      "detail": "<p>极简剪枝准则无需二阶信息计算</p>"
    },
    {
      "id": "nvfp4",
      "num": 48,
      "name": "NVFP4",
      "fullName": "NVIDIA FP4 (NVFP4)",
      "year": "2026",
      "org": "NVIDIA",
      "parent": "smoothquant",
      "paperUrl": "https://developer.nvidia.com/blog/nvfp4-blackwell-inference/",
      "projectUrl": "",
      "category": "quantize",
      "motivation": "E2M1双层微缩放实现硬件原生FP4推理",
      "summary": "NVFP4 的核心目标是：E2M1双层微缩放实现硬件原生FP4推理。",
      "keyPoints": [
        "核心动机：E2M1双层微缩放实现硬件原生FP4推理",
        "演化来源：继承或改进自 smoothquant",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>E2M1双层微缩放实现硬件原生FP4推理</p>"
    },
    {
      "id": "bitnet_b158",
      "num": 49,
      "name": "BitNet b1.58",
      "fullName": "比特网 (BitNet b1.58)",
      "year": "2024",
      "org": "微软",
      "parent": "gptq",
      "paperUrl": "https://arxiv.org/abs/2402.17764",
      "projectUrl": "",
      "category": "quantize",
      "motivation": "三值化权重消除浮点乘法",
      "summary": "BitNet b1.58 的核心目标是：三值化权重消除浮点乘法。",
      "keyPoints": [
        "核心动机：三值化权重消除浮点乘法",
        "演化来源：继承或改进自 gptq",
        "代表机构：微软"
      ],
      "detail": "<p>三值化权重消除浮点乘法</p>"
    },
    {
      "id": "mc_sharp",
      "num": 50,
      "name": "MC#",
      "fullName": "混合压缩器 (MC#)",
      "year": "2026",
      "org": "IEEE TPAMI",
      "parent": "awq",
      "paperUrl": "https://ieeexplore.ieee.org/document/10884444/",
      "projectUrl": "",
      "category": "quantize",
      "motivation": "自适应混合精度量化+在线剪枝压缩MoE",
      "summary": "MC# 的核心目标是：自适应混合精度量化+在线剪枝压缩MoE。",
      "keyPoints": [
        "核心动机：自适应混合精度量化+在线剪枝压缩MoE",
        "演化来源：继承或改进自 awq",
        "代表机构：IEEE TPAMI"
      ],
      "detail": "<p>自适应混合精度量化+在线剪枝压缩MoE</p>"
    },
    {
      "id": "retnet",
      "num": 51,
      "name": "RetNet",
      "fullName": "保留网络 (Retentive Network)",
      "year": "2023",
      "org": "Microsoft",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2307.08621",
      "projectUrl": "",
      "category": "linear_attn",
      "motivation": "三种范式统一实现线性推理复杂度",
      "summary": "RetNet 的核心目标是：三种范式统一实现线性推理复杂度。",
      "keyPoints": [
        "核心动机：三种范式统一实现线性推理复杂度",
        "代表机构：Microsoft"
      ],
      "detail": "<p>三种范式统一实现线性推理复杂度</p>"
    },
    {
      "id": "mamba",
      "num": 52,
      "name": "Mamba",
      "fullName": "曼巴 (Mamba)",
      "year": "2023",
      "org": "CMU/Princeton",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2312.00752",
      "projectUrl": "",
      "category": "linear_attn",
      "motivation": "选择性状态空间模型线性时间扩展",
      "summary": "Mamba 的核心目标是：选择性状态空间模型线性时间扩展。",
      "keyPoints": [
        "核心动机：选择性状态空间模型线性时间扩展",
        "代表机构：CMU/Princeton"
      ],
      "detail": "<h3>架构示意图</h3>\n<blockquote>\n<p><strong>Mamba Block 架构</strong>（对应论文 Figure 3）</p>\n<p>将 H3 block（SSM 架构基础）与 MLP block 合并为单一 Mamba block，同质堆叠：</p>\n</blockquote>\n<pre><code>Input x\n  │\n  ├──→ Linear Projection (expand D→ED) ──→ Conv1D ──→ SiLU ──→ Selective SSM ──→ ⊗\n  │                                                                                │\n  └──→ Linear Projection (expand D→ED) ──→ SiLU ─────────────────────────────────→ ⊗\n                                                                                   │\n                                                                          Linear Projection (ED→D)\n                                                                                   │\n                                                                              + Residual\n                                                                                   │\n                                                                              LayerNorm\n                                                                                   ↓\n                                                                               Output y\n</code></pre>\n<blockquote>\n<p><strong>选择性 SSM 核心机制</strong>（对应论文 Figure 1）</p>\n<p>S4（LTI）→ S6（Selective）的关键变化：参数从固定变为输入依赖</p>\n</blockquote>\n<pre><code>┌─────────────────────────────────────────────────────────────┐\n│  S4 (LTI):  A, B, C, Δ 均为固定参数                          │\n│  → 可用卷积加速，但无法做内容感知推理                            │\n│                                                               │\n│  S6 (Selective):  B(x), C(x), Δ(x) 依赖输入                  │\n│  → 必须用递推(scan)计算，但能选择性记忆/遗忘                     │\n│  → 通过硬件感知算法(SRAM scan + kernel fusion)保持高效          │\n└─────────────────────────────────────────────────────────────┘\n</code></pre>\n<h3>伪代码</h3>\n<p><strong>Algorithm 1: S4（传统 LTI SSM）</strong></p>\n<p>```python</p>"
    }
  ],
  "categories": {
    "kv_cache": {
      "label": "KV Cache优化",
      "color": "#22a06b"
    },
    "spec_decode": {
      "label": "投机解码",
      "color": "#e56910"
    },
    "attention": {
      "label": "注意力优化",
      "color": "#0065ff"
    },
    "engine": {
      "label": "推理引擎与系统",
      "color": "#8270db"
    },
    "quantize": {
      "label": "模型压缩与量化",
      "color": "#e34935"
    },
    "linear_attn": {
      "label": "线性/高效架构",
      "color": "#1d7f8c"
    }
  },
  "projectUrls": {}
};
