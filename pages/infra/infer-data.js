/**
 * infer-data.js — 由 pipeline/build.py 于 2026-05-21 11:23:25 自动生成。
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
      "detail": "<p>基于重要性持久化假设压缩缓存</p>"
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
      "detail": "<p>利用注意力汇实现无限长度流式推理</p>"
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
      "detail": "<p>结合量化与误差补偿的高倍率压缩</p>"
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
        "<strong>层级量化策略</strong>：将 Transformer 层分为三组（浅 1/3、中 1/3、深 1/3），分别使用 \\(x\\)、\\(y\\)、\\(z\\) bit 量化（\\(x \\geq y \\geq z\\)），锚点 token 保留 8-bit 高精度",
        "<strong>上下文加载控制器</strong>：根据 TTFT 预算和网络带宽，动态选择压缩级别或直接传输原始文本",
        "<strong>评估覆盖 3 个管线</strong>：Wikitext（Perplexity）、LongChat（Accuracy）、Natural Questions（F1 Score），涵盖 7B–13B 模型",
        "<strong>端到端效果</strong>：KV Cache 压缩 3.5–4.3×，TTFT 降低 2.7–3.2×，生成质量损失 &lt; 0.2%"
      ],
      "detail": "<h5>系统架构总览</h5>\n<p><img alt=\"CacheGen 系统架构\" src=\"../assets/cachegen_fig6.png\" />\n<em>图：CacheGen 系统架构。左侧为离线 KV 编码器，将 KV Cache 压缩为多个不同压缩级别的比特流；右侧为在线加载控制器，根据 TTFT 预算选择最优压缩级别进行流式传输和解码。</em></p>\n<p>CacheGen 的核心思路是：<strong>不传输原始 KV 张量，而是将其编码为紧凑比特流</strong>。与 token 剪枝方法（如 Scissorhands、H₂O）不同，CacheGen 不丢弃任何 token，而是通过信息论编码技术压缩全部 KV 特征，在解码端无损或近无损恢复。</p>\n<h5>KV Cache 编码流水线</h5>\n<p>KV Cache 的形状为 \\([N, l, c]\\)，其中 \\(N\\) 为 token 数、\\(l\\) 为层数、\\(c\\) 为通道数。CacheGen 的三步压缩流程如下：</p>\n<pre><code>输入: KV Cache 张量 [N, l, c] (float16)\n│\n├─ Step 1: 差分编码 (Delta Encoding)\n│   ├─ 将 token 分为大小为 S 的 chunk\n│   ├─ 每个 chunk 的第一个 token 为锚点 (anchor)\n│   └─ 其余 token 存储与前一 token 的差值: δ_i = KV_i - KV_{i-1}\n│\n├─ Step 2: 层级量化 (Layer-wise Quantization)\n│   ├─ 浅层 1/3: x-bit 量化 (高精度)\n│   ├─ 中层 1/3: y-bit 量化\n│   ├─ 深层 1/3: z-bit 量化 (低精度)\n│   └─ 锚点 token: 统一 8-bit 量化\n│\n├─ Step 3: 通道级算术编码 (Channel-wise AC)\n│   ├─ 为每个 (layer, channel) 组合维护概率分布\n│   ├─ 利用同通道 token 间分布一致性\n│   └─ 仅存储 l×c 个分布 (而非 N×l×c)\n│\n输出: 紧凑比特流 + 概率分布表\n</code></pre>\n<h5>动机与背景</h5>\n<p>在 RAG（检索增强生成）和长上下文对话等场景中，LLM 需要处理数千到数万 token 的上下文。为了避免重复计算，系统通常会预先缓存上下文的 KV Cache 并在用户查询到达时加载。然而，KV Cache 的体积随上下文长度线性增长——例如 Llama-13B 处理 10K token 的上下文会产生约 <strong>10.2 GB</strong> 的 KV Cache（FP16 格式）。</p>\n<p><img alt=\"KV Cache 大小随 token 数增长\" src=\"../assets/cachegen_fig2.png\" />\n<em>图：不同 LLM 的 KV Cache 大小随输入 token 长度的增长趋势。即使是 7B 模型，10K token 也需要数 GB 存储。</em></p>\n<p>传输如此大的张量会导致严重的网络延迟，成为 TTFT 的瓶颈。传统方法要么剪枝 token（需要知道 query，无法离线预处理），要么使用更小的模型（牺牲质量），都不理想。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：KV Cache 虽然体积大，但其内部存在大量可利用的统计冗余——相邻 token 间的 KV 值高度相似，同一通道内的值服从相似分布。CacheGen 正是利用这些冗余实现高效压缩。</div>\n<h5>核心机制详解</h5>\n<p><strong>Step 1: 差分编码——利用 token 局部性</strong></p>\n<p>CacheGen 发现相邻 token 的 KV 特征值高度相关（Insight 1）。直觉上，相邻 token 在同一文档中往往语义相近，其 KV 表示自然相似。因此，存储差分值 \\(\\delta_i = \\text{KV}_i - \\text{KV}_{i-1}\\) 比存储原始值的信息熵更低。</p>\n<p>具体实现中，token 被分为大小为 \\(S\\) 的 chunk。每个 chunk 的第一个 token 作为<strong>锚点（anchor）</strong>，存储完整值；其余 token 仅存储与前一 token 的差值。这样做的好处是：\n1. 差分值的分布更集中在零附近，有利于后续的算术编码\n2. chunk 化设计使得解码可以并行进行</p>\n<p><strong>Step 2: 层级量化——浅层多 bit、深层少 bit</strong></p>\n<p><img alt=\"层级量化敏感性分析\" src=\"../assets/cachegen_fig8.png\" />\n<em>图：不同层组的量化比特数对 LLM 输出质量的影响。浅层（前 1/3）对量化最敏感，深层（后 1/3）容忍度最高。</em></p>\n<p>CacheGen 的关键发现是：<strong>浅层 KV 特征对量化损失更敏感</strong>（Insight 3）。直觉上，浅层嵌入了更原始的语义信息，其精度损失会逐层传播并放大；而深层提取的是高层结构，对细微精度变化更鲁棒。</p>\n<p>基于此，CacheGen 将 Transformer 的 \\(l\\) 层分为三组，分别应用不同精度的量化：</p>\n<p>$$\\text{Quantization bits} = \\begin{cases} x \\text{ bits} & \\text{浅层 (layer 1 to } l/3\\text{)} \\\\ y \\text{ bits} & \\text{中层 (layer } l/3 \\text{ to } 2l/3\\text{)} \\\\ z \\text{ bits} & \\text{深层 (layer } 2l/3 \\text{ to } l\\text{)} \\end{cases}$$</p>\n<p>其中 \\(x \\geq y \\geq z\\)。例如，典型配置为 \\((x, y, z) = (4, 3, 2)\\)。锚点 token 始终使用 8-bit 量化以保持差分基准的精度。</p>\n<p><strong>Step 3: 通道级算术编码——利用分布一致性</strong></p>\n<p><img alt=\"通道级分布一致性\" src=\"../assets/cachegen_fig7.png\" />\n<em>图：同一 (layer, channel) 组合内，不同 token 的 KV 值分布高度一致（左），而不同 channel 间分布差异显著（右）。</em></p>\n<p>算术编码（AC）是一种接近信息熵下界的无损压缩技术，其效果取决于概率模型的准确性。CacheGen 发现：<strong>同一 channel-layer 组合内的 KV 值跨 token 共享相似的概率分布</strong>（Insight 2），但不同 channel 间分布差异很大。</p>\n<p>因此，CacheGen 为每个 \\((\\text{layer}, \\text{channel})\\) 组合维护一个概率分布，用于算术编码。这样只需存储 \\(l \\times c\\) 个分布（而非 \\(N \\times l \\times c\\)），存储开销可忽略不计（因为 \\(N\\) 通常为数千）。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：差分编码和算术编码本身是<strong>无损</strong>的，信息损失仅来自量化步骤。这意味着 CacheGen 可以通过调整量化比特数精确控制压缩率与质量的权衡。</div>\n<h5>上下文加载控制器</h5>\n<p><img alt=\"端到端 TTFT 对比\" src=\"../assets/cachegen_fig10.png\" />\n<em>图：不同网络带宽下，CacheGen 与基线方法的 TTFT 对比。CacheGen 在各带宽条件下均显著降低 TTFT。</em></p>\n<p>不同的应用场景对 TTFT 的容忍度不同。CacheGen 的控制器在用户查询到达时：</p>\n<ol>\n<li><strong>估算 TTFT</strong>：对每个压缩级别 \\((x, y, z)\\)，基于历史测量预测网络传输时间 + 解压时间</li>\n<li><strong>选择最优级别</strong>：在满足 TTFT 预算的前提下，选择压缩率最低（质量最高）的版本</li>\n<li><strong>回退机制</strong>：当上下文较短或带宽较低时，直接传输原始文本可能比传输压缩 KV Cache 更快，控制器会自动切换</li>\n</ol>\n<h5>组件消融分析</h5>\n<p><img alt=\"各组件贡献\" src=\"../assets/cachegen_fig15.png\" />\n<em>图：逐步叠加各编码组件的压缩效果。差分编码、通道级 AC 和层级量化各贡献约 1.2–1.5× 的额外压缩。</em></p>\n<p>消融实验表明，三个编码组件各自贡献显著：\n- <strong>差分编码</strong>：将均匀量化 + 默认 AC 的压缩率从 ~1.5× 提升到 ~2.2×\n- <strong>通道级 AC</strong>：进一步提升到 ~3.0×\n- <strong>层级量化</strong>：最终达到 3.5–4.3×</p>\n<h5>与现有方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th style=\"text-align: center;\">是否需要 Query</th>\n<th style=\"text-align: center;\">是否修改模型</th>\n<th>压缩方式</th>\n<th>TTFT 影响</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Token 剪枝 (Scissorhands, H₂O)</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">❌</td>\n<td>丢弃低注意力 token</td>\n<td>无法离线预处理</td>\n</tr>\n<tr>\n<td>Gisting</td>\n<td style=\"text-align: center;\">❌</td>\n<td style=\"text-align: center;\">✅</td>\n<td>将上下文压缩为 gist token</td>\n<td>需要重训练模型</td>\n</tr>\n<tr>\n<td>小模型替代</td>\n<td style=\"text-align: center;\">❌</td>\n<td style=\"text-align: center;\">✅</td>\n<td>使用更小的 LLM</td>\n<td>质量显著下降</td>\n</tr>\n<tr>\n<td><strong>CacheGen</strong></td>\n<td style=\"text-align: center;\"><strong>❌</strong></td>\n<td style=\"text-align: center;\"><strong>❌</strong></td>\n<td><strong>信息论编码压缩 KV</strong></td>\n<td><strong>TTFT ↓ 2.7–3.2×</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>CacheGen 的独特优势在于：<strong>不需要知道用户查询、不修改模型结构、不丢弃任何 token</strong>，且可以与上述方法正交组合使用。</p>",
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
      "detail": "<p>保留Token间语义关系的KV压缩</p>"
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
      "detail": "<p>草稿-验证范式实现无损推理加速</p>"
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
      "detail": "<p>严谨数学证明的拒绝采样加速方案</p>"
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
      "detail": "<p>引入动态草稿树根据置信度调整路径</p>"
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
      "detail": "<p>基于Jacobi迭代的并行解码无需微调</p>"
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
      "detail": "<p>异步草稿验证+几何扇出策略</p>"
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
      "detail": "<p>集成PagedAttention的高吞吐引擎</p>"
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
        "<strong>逐通道缩放</strong>：对显著权重通道乘以缩放因子 \\(s > 1\\)，等价地缩小对应激活通道，在不引入混合精度的前提下降低量化误差",
        "<strong>激活感知搜索</strong>：缩放因子搜索空间设计为 \\(s = s_X^\\alpha\\)（\\(s_X\\) 为逐通道激活均值，\\(\\alpha \\in [0, 1]\\)），通过网格搜索最小化量化输出误差",
        "<strong>无需训练/回归</strong>：仅需少量校准数据测量激活统计量，比 GPTQ 所需校准集小 10 倍",
        "<strong>对校准集分布鲁棒</strong>：跨域校准时 PPL 仅增加 0.5-0.6，而 GPTQ 增加 2.3-4.9",
        "<strong>广泛泛化</strong>：支持 LLaMA、OPT 等基础模型，以及指令微调模型（Vicuna）和多模态模型（OpenFlamingo、LLaVA）",
        "<strong>TinyChat 推理系统</strong>：通过内核融合实现实际加速，4090 上达 3.9× 加速，笔记本 4070（8GB）上以 33 tok/s 运行 Llama-2-13B",
        "<strong>与 GPTQ 正交</strong>：可与 GPTQ 组合进一步提升 INT2 极低比特量化性能"
      ],
      "detail": "<p><img alt=\"AWQ 核心方法示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2306.00978/assets/x1.png\" />\n<em>图：AWQ 方法概览。左：直接 INT3 量化导致严重性能退化（PPL=43.2）；中：保留 1% 显著权重为 FP16 可大幅改善（PPL=13.0），但混合精度硬件不友好；右：AWQ 通过逐通道缩放保护显著权重，实现硬件友好的高精度量化。</em></p>\n<pre><code class=\"language-python\"># AWQ 核心算法伪代码\n# 输入: 权重矩阵 W (c_out × c_in), 校准集激活 X, 量化比特数 N, 搜索粒度 n_grid\n# 输出: 最优缩放向量 s*\n\ndef awq_search(W, X, N, n_grid=20):\n    # Step 1: 计算逐通道激活均值作为显著性指标\n    s_X = X.abs().mean(dim=0)  # shape: (c_in,)\n\n    best_loss = float('inf')\n    best_alpha = 0\n\n    # Step 2: 网格搜索最优 alpha\n    for alpha in linspace(0, 1, n_grid):\n        s = s_X.pow(alpha)  # 缩放因子\n\n        # Step 3: 对权重施加缩放后量化\n        W_scaled = W * s.unsqueeze(0)        # W · diag(s)\n        W_q = quantize(W_scaled, N)           # Q(W · diag(s))\n\n        # Step 4: 计算量化输出误差 (缩放逆变换应用于激活)\n        X_scaled = X / s.unsqueeze(0)         # diag(s)^{-1} · X\n        loss = (W_q @ X_scaled - W @ X).pow(2).mean()\n\n        if loss &lt; best_loss:\n            best_loss = loss\n            best_alpha = alpha\n\n    return s_X.pow(best_alpha)\n\ndef quantize(w, N):\n    &quot;&quot;&quot;均匀量化函数&quot;&quot;&quot;\n    delta = w.abs().max() / (2**(N-1) - 1)\n    return delta * torch.round(w / delta)\n</code></pre>\n<h5>动机与背景</h5>\n<p>大语言模型（LLM）的参数量从数十亿到数千亿不等，部署时面临严峻的内存和计算瓶颈。<strong>权重量化</strong>（Weight-only Quantization）是一种有效的模型压缩方法，将权重从 FP16 压缩到 INT3/INT4，可以减少 3-4 倍模型大小，并加速 token 生成阶段的内存受限推理。</p>\n<p>现有方法存在两大问题：\n1. <strong>Round-to-Nearest (RTN)</strong>：直接将权重四舍五入到最近整数，简单但在低比特（≤4bit）下性能退化严重\n2. <strong>GPTQ</strong>：基于逐层权重重建（OBQ/OBS），通过最小化重建误差调整量化权重，但依赖反向传播/回归过程，容易<strong>过拟合校准集</strong>，损害模型在其他领域和模态上的泛化能力</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：AWQ 发现 LLM 权重的重要性不均等——仅 1% 的权重通道对模型性能至关重要，而这些显著通道应通过<strong>激活分布</strong>（而非权重分布）来识别。</div>\n<h5>核心机制：激活感知缩放</h5>\n<p><strong>Step 1: 识别显著权重通道</strong></p>\n<p>AWQ 的第一个发现是：保留少量（0.1%-1%）权重通道为 FP16 可以显著改善量化性能。关键在于如何选择这些通道：</p>\n<ul>\n<li>按<strong>权重幅度</strong>选择 → 效果与随机选择相当</li>\n<li>按<strong>激活幅度</strong>选择 → 显著提升性能，甚至匹配 GPTQ</li>\n</ul>\n<p>直觉是：激活幅度大的输入特征通常更重要，保留对应权重可以保护这些特征的传递。</p>\n<p><strong>Step 2: 用缩放替代混合精度</strong></p>\n<p>混合精度（部分 FP16 + 部分 INT3）虽然有效，但硬件实现困难。AWQ 提出用<strong>逐通道缩放</strong>来等效保护显著权重。</p>\n<p>对于线性运算 \\(y = \\mathbf{w} \\cdot \\mathbf{x}\\)，量化误差为：</p>\n<p>$$\\text{Err}(Q(\\mathbf{w})) = \\Delta \\cdot \\text{RoundErr}, \\quad \\Delta = \\frac{\\max(|\\mathbf{w}|)}{2^{N-1} - 1}$$</p>\n<p>当对权重通道乘以缩放因子 \\(s > 1\\) 时（同时对激活除以 \\(s\\) 以保持等价性），量化误差变为：</p>\n<p>$$\\text{Err}(Q(w \\cdot s) / s \\cdot x) = \\frac{\\Delta \\cdot \\text{RoundErr}}{s} \\cdot x$$</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：缩放因子 \\(s\\) 使得显著通道的<strong>相对量化误差</strong>降低为原来的 \\(1/s\\)。虽然 \\(\\Delta\\) 可能因最大值变化而略微增大，但对于显著通道（激活幅度大），\\(s\\) 带来的误差降低远大于 \\(\\Delta\\) 增大的代价。</div>\n<p><strong>Step 3: 自动搜索最优缩放因子</strong></p>\n<p>直接为每个通道独立搜索 \\(s\\) 会导致搜索空间过大。AWQ 巧妙地将搜索空间参数化为：</p>\n<p>$$\\mathbf{s} = \\mathbf{s}_X^\\alpha, \\quad \\alpha \\in [0, 1]$$</p>\n<p>其中 \\(\\mathbf{s}_X\\) 是逐通道的激活均值幅度。这一设计的直觉是：\n- \\(\\alpha = 0\\)：不缩放（等同于 RTN）\n- \\(\\alpha = 1\\)：完全按激活幅度缩放\n- 最优 \\(\\alpha\\) 在两者之间，平衡显著通道保护与非显著通道的量化精度</p>\n<p>搜索目标为最小化量化前后的输出误差：</p>\n<p>$$\\mathcal{L}(\\mathbf{s}) = \\| Q(\\mathbf{W} \\cdot \\text{diag}(\\mathbf{s})) \\cdot (\\text{diag}(\\mathbf{s})^{-1} \\cdot \\mathbf{X}) - \\mathbf{W} \\mathbf{X} \\|$$</p>\n<p>通过在 \\([0, 1]\\) 上进行网格搜索（默认 20 个点），逐层确定最优 \\(\\alpha\\)。整个搜索过程无需梯度计算，仅需前向传播，非常高效。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：缩放操作在数学上等价于将缩放因子融合到前一层的权重或归一化参数中（如 LayerNorm），因此不引入额外的推理开销。</div>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>RTN</th>\n<th>GPTQ</th>\n<th>AWQ</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>是否需要反向传播</td>\n<td>❌</td>\n<td>✅（逐层重建）</td>\n<td>❌</td>\n</tr>\n<tr>\n<td>校准数据需求</td>\n<td>无</td>\n<td>较多（128-192 序列）</td>\n<td>极少（~16 序列）</td>\n</tr>\n<tr>\n<td>校准集过拟合风险</td>\n<td>无</td>\n<td>高</td>\n<td>低</td>\n</tr>\n<tr>\n<td>多模态/跨域泛化</td>\n<td>一般</td>\n<td>差（过拟合）</td>\n<td>好</td>\n</tr>\n<tr>\n<td>INT3 LLaMA-7B PPL</td>\n<td>25.54</td>\n<td>5.69</td>\n<td>5.60</td>\n</tr>\n<tr>\n<td>INT4 LLaMA-7B PPL</td>\n<td>5.68</td>\n<td>5.63</td>\n<td>5.60</td>\n</tr>\n<tr>\n<td>与 GPTQ 组合</td>\n<td>—</td>\n<td>—</td>\n<td>✅（INT2 场景）</td>\n</tr>\n</tbody>\n</table></div>\n<h5>TinyChat 推理系统</h5>\n<p>AWQ 不仅是量化算法，还配套了 TinyChat 高效推理系统：</p>\n<ul>\n<li><strong>内核融合</strong>：将反量化与矩阵乘法融合，减少中间 DRAM 访问和内核启动开销</li>\n<li><strong>全模型优化</strong>：同时优化量化线性层和非量化层（如 LayerNorm、Attention）</li>\n<li><strong>跨平台部署</strong>：支持桌面 GPU（RTX 4090）、笔记本 GPU（RTX 4070）和边缘设备（Jetson Orin）</li>\n<li><strong>实测加速</strong>：</li>\n<li>RTX 4090：2.7-3.9× 加速（对比 HuggingFace FP16）</li>\n<li>RTX 4070（8GB）：以 33 tok/s 运行 Llama-2-13B（FP16 连 7B 都无法加载）</li>\n<li>Jetson Orin（32GB）：可运行 MPT-30B，达 7.8 tok/s</li>\n</ul>",
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
      "detail": "<p>选择性状态空间模型线性时间扩展</p>"
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
