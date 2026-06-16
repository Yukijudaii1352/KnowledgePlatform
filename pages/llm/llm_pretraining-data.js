/**
 * llm_pretraining-data.js — 由 pipeline/build.py 于 2026-06-16 17:00:16 自动生成。
 * 源文件：content/llm/llm_pretraining.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "llm",
    "topic_id": "llm_pretraining",
    "topic_name": "LLM预训练",
    "page_title": "LLM预训练算法总结",
    "page_subtitle": "2026-06-16 版",
    "page_desc": "系统梳理从Scaling Laws理论奠基、数据工程精炼到分布式训练优化的大语言模型预训练技术演进脉络",
    "page_icon": "⚡",
    "hero_pills": [
      "Scaling Laws · 数据工程 · 训练稳定性 · 分布式训练"
    ],
    "count_pill": "{count} 个算法",
    "image_base": "",
    "overview_from_doc": true,
    "latest_overview_from_doc": true
  },
  "overview": [
    {
      "title": "",
      "body_html": "<h1>2 万字总结：全面梳理大模型预训练相关技术</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/1932686334230765959\">https://zhuanlan.zhihu.com/p/1932686334230765959</a></li>\n<li>作者: 吴建明wujianming</li>\n</ul>\n<hr />\n<p>2 万字总结：全面梳理大模型预训练相关技术</p>\n<h1>2 万字总结：全面梳理大模型预训练相关技术</h1>\n<p>作者: 吴建明wujianming, 赞: 14</p>\n<p>微信视频号：sph0RgSyDYV47z6</p>\n<p>快手号：4874645212</p>\n<p>抖音号：dy0so323fq2w</p>\n<p>小红书号：95619019828</p>\n<p><strong>一、引言</strong><br />\n<strong>本文主要聚焦于大语言模型预训练相关阶段的技术和行业最新进展，其中包括常见的分布式策略、模型结构、常见的优化手段等。考虑到篇幅原因，暂不包含后训练、多模态等领域。</strong><br />\n<strong>相关工作可以参考我们之前的文章：</strong></p>\n<p><strong>二、模型结构</strong><br />\n<strong>2.1 概述</strong><br />\n<strong>当前 LLM 基本上都是 Decoder-Only 的 Transformer 模型，只不过都会进行一些修改。比如对 Attention 的修改衍生出来 Softmax Attention 系列和 Linear Attention 系列。而对 FFN 的修改衍生出了 Dense 模型和 MoE 模型。这个章节我们对这些模型结构的修改进行简单的总结。</strong><br />\n<strong>2.2 Attention</strong><br />\n<strong>2.2.1 MHA、MQA、GQA、MLA</strong><br />\n<strong>对于 Softmax Attention 系列，目前主要的是 MHA、MQA、GQA 和 MLA，主要区别如下图 Figure 3 所示：</strong></p>\n<ul>\n<li>\n<p><strong>MHA：Transformer 模型的标准实现，每个 Attention Head 都有独立的 Q、K、V。</strong></p>\n</li>\n<li>\n<p><strong>早期模型用的比较多，现在很少使用，至少是比较大的模型都没有使用。</strong></p>\n</li>\n<li>\n<p><strong>Inference 阶段的问题比较多，最主要的问题是 KV Cache 占比是几种方案里最大的，并且在 Continuous Batching 阶段 Attention 核心计算无法只用 Tensor Core，存在一定的局限性。</strong></p>\n</li>\n<li>\n<p><strong>MQA：所有 Attention Head 共享相同的 K 和 V（[2003.04641] MQA: Answering the Question via Robotic Manipulation）。</strong></p>\n</li>\n<li>\n<p><strong>计算量和 KV Cache 都是最小的，也是对 Inference 阶段最友好的。</strong></p>\n</li>\n<li>\n<p><strong>对模型效果影响较大，所以很少使用。</strong></p>\n</li>\n<li>\n<p><strong>GQA：Attention Head 进行分组，一组 Attention Head 共享相同的 K 和 V（[2305.13245] GQA: Training Generalized Multi-Query Transformer Models from Multi-Head Checkpoints）。</strong></p>\n</li>\n<li>\n<p><strong>是 MHA 和 GQA 的折衷方案，KV Cache 大小处于 MHA 和 GQA 之间，计算效率也处于两者之间。考虑到 Tensor Core 要求矩阵乘法的 Shape 是 8 的整数倍，因此每组有 8 个 Head 的整数倍是最优的。如果每组中不到 8 个 Head，计算时可以 Padding，也能用上 Tensor Core，只是存在部分冗余计算。</strong></p>\n</li>\n<li>\n<p><strong>是当前模型中最常见的的 Attention 方式。</strong></p>\n</li>\n<li>\n<p><strong>MLA：DeepSeek 2024 年 5 月在 DeepSeek V2（DeepSeek-V2: A Strong, Economical, and Efficient Mixture-of-Experts Language Model）中提出，并在 DeepSeek V3 （[2412.19437] DeepSeek-V3 Technical Report）中沿用。核心思路是每个 Head 都有独立的 K 和 V，但它们可以投影和反投影到同样的、共享的 Latent KV。</strong></p>\n</li>\n<li>\n<p><strong>KV Cache 和 MQA 相当，明显少于 MHA 和 GQA，但效果还不错，和 MHA 相当。但是也会额外的增加一些计算量。DeepSeek 也开源了部分针对 MLA Inference 的代码实现（FlashMLA: Efficient MLA decoding kernels）。</strong></p>\n</li>\n<li><strong>当前主要是 DeepSeek V2、V3 以及最新开源的Kimi K2 模型（Kimi-K2 - a moonshotai Collection）中使用，其他模型并没有跟进。</strong></li>\n</ul>\n<p><strong><img alt=\"\" src=\"https://pic3.zhimg.com/v2-8046242455402bec5947c5327c18a020_1440w.jpg\" /></strong></p>\n<p><strong>如下图 Table 1 可以看出，MLA 的 KV Cache 需求虽然依然大于 MQA，但明显优于 MHA 和 GQA，同时效果更好：</strong></p>\n<p><strong><img alt=\"\" src=\"https://pic1.zhimg.com/v2-08341de24006f519b5454efcf82876d2_1440w.jpg\" /></strong></p>\n<p><strong>如下图 Table 8 和 Table 9 所示，DeepSeek 团队在 DeepSeek V2 的技术报告中进行过一些消融实验，MLA 的效果优于 GQA，甚至优于 MHA：</strong></p>\n<p><strong><img alt=\"\" src=\"https://pica.zhimg.com/v2-ae622b0a7ad9abcec65af008afa8ec72_1440w.jpg\" /></strong></p>\n<p><strong>2.2.2 MHA -&gt; GQA/MLA</strong><br />\n<strong>模型在预训练阶段已经确定好是 MHA，还是 GQA、MLA。考虑到 GQA 和 MLA 在 Inference 阶段的优势，也就衍生了一系列将 MHA 转为 GQA、MLA 或者将 GQA 转为 MLA 的方案（PS：这些方案和预训练没有太大关系，更多是对 Inference 的帮助，不过这里也简单介绍）。</strong><br />\n<strong>如下图 Table 1 所示，在 [2412.20677] Align Attention Heads Before Merging Them: An Effective Way for Converting MHA to GQA 中作者提出了将 MHA 转换为 GQA 的方案。其在 LLaMA2 7B 上做实验（共 32 个 Attention Head ）：</strong></p>\n<ul>\n<li><strong>在 GQA-16 上能取得与 MHA 相当甚至更好的效果，但是 KV Cache 压缩比更高的 GQA-8（节约 75% KV Cache）和 GQA-4（节约 87.5% KV Cache）精度下降较大。</strong></li>\n<li><strong>LLaMA2 模型预训练数据比较少，模型训练不够充分，有效性有待商榷。</strong></li>\n<li><strong>当前的 LLM 基本至少会默认采用 GQA，因此相应场景也就更少。</strong></li>\n</ul>\n<p><strong><img alt=\"\" src=\"https://picx.zhimg.com/v2-71ed2f4024330a11b9fdd476be709287_1440w.jpg\" /></strong></p>\n<p><strong>如下图 Table 1 所示，在 [2502.14837] Towards Economical Inference: Enabling DeepSeek's Multi-Head Latent Attention in Any Transformer-based LLMs 中，作者进一步探索了 MHA/GQA 到 MLA 的转换（PS：其实 GQA 可以看做 MHA 的特例，因此如果支持 MHA 转 MLA，就很容易支持 GQA 转 MLA）。</strong></p>\n<ul>\n<li><strong>在模型比较小时损失比较大，在 LLaMA2 7B 上损失还可以接受。</strong></li>\n<li>\n<p><strong>上述评测还存在两方面问题：</strong></p>\n</li>\n<li>\n<p><strong>LLaMA2 模型没有充分训练，Baseline 比较低。</strong></p>\n</li>\n<li><strong>LLaMA2 里面的评估任务中 OBQA 提升比较明显拉升了整体得分，在更多任务上的有效性有待商榷。</strong></li>\n</ul>\n<p><strong><img alt=\"\" src=\"https://pic3.zhimg.com/v2-250b62cd8ea5b239484ce4a48d96cd70_1440w.jpg\" /></strong></p>\n<p><strong>如下图 Table 1 所示，在 [2502.07864] TransMLA: Multi-Head Latent Attention Is All You Need 中，作者同样提出了 MHA 到 MLA 的转换方案 TransMLA：</strong></p>\n<ul>\n<li><strong>相比上述的 MHA2MLA，在无需训练的方式中提升较明显。而在加入一定训练数据后表现相当。</strong></li>\n<li><strong>和 MHA2MLA 有同样问题，评测任务中考 OBQA 拉高得分，另外模型是 LLaMA2MLA。</strong></li>\n<li><strong>如果与直接将 GQA 转为 MLA 的消融实验会更有说服力。</strong></li>\n</ul>\n<p><strong><img alt=\"\" src=\"https://pic2.zhimg.com/v2-92a63c2057559aa01d11883c20b4af05_1440w.jpg\" /></strong></p>\n<p><strong>2.2.3 Linear Attention</strong><br />\n<strong>由于 Softmax Attention 的二次方特性，当序列比较长时，Attention 的开销急剧增加。针对这种场景，Linear Attention 和 Sparse Attention 是两种常见的流派。在 Linear Attention 中比较常见的是 Mamba 和 RWKV 系列，不过在常见的开源模型中并非主流，业内质疑的声音也比较多。</strong><br />\n<strong>如下图 Table 3 所示，在 RWKV-7[2503.14456] RWKV-7 \"Goose\" with Expressive Dynamic State Evolution 中，作者进行了相应对比实验：</strong></p>\n<ul>\n<li><strong>针对小规模模型，基于 Linear Attention 的 RWKV7 模型确实能获得与基于 Softmax Attention 相当的性能。</strong></li>\n<li><strong>主要实验聚焦在 3B 及以下模型，缺少 7B 及更大规模模型的实验。</strong></li>\n</ul>\n<p><strong><img alt=\"\" src=\"https://picx.zhimg.com/v2-853015a96269ec28e990fa4ce7c4277f_1440w.jpg\" /></strong></p>\n<p><strong>2.2.4 Hybrid Linear Attention</strong><br />\n<strong>相较于全部采用 Linear Attention 的方式，也有不少工作采用 Softmax Attention 和 Linear Attention 混合的方案。其相比全部 Linear Attention 更加保守，能够同时保留 Softmax Attention 的高精度以及 Linear Attention 在长序列的高效率。</strong><br />\n<strong>这类工作中规模最大，影响力最大的是 MiniMax 的开源大模型 MiniMax-01 系列模型（[2501.08313] MiniMax-01: Scaling Foundation Models with Lightning Attention）。如下图 Figure 3 所示，其最大的 MiniMax-01 W456A46 模型包含 80 个 Transformer Block，其中每 7 个 Linear Attention 接一个 Softmax Attention（也就是下图中的 M=7）。并且 Softmax Attention 采用了 GQA，而 Linear Attention 也采用了定制化的高性能实现 Lighting Attention。</strong></p>\n<p><strong><img alt=\"\" src=\"https://pic1.zhimg.com/v2-14fd2b385c556aa3549c50dbfaa8b9fe_1440w.jpg\" /></strong></p>\n<p><strong>如下图 Figure 8 所示，作者也对比了不同机制的训练吞吐。可以看出，随着序列长度增加：</strong></p>\n<ul>\n<li><strong>Softmax Attention 的效率逐渐降低，并且序列越长，下降比例越快。不过对于预训练常见的 8K 序列长度，基本还可以接受（PS：其实对于长序列也可以考虑采用 Sample Packing Mask 来优化，只不过是需要考虑负载均衡的问题）。</strong></li>\n<li><strong>Linear Attention 的 Lightning、HGRN2、Mamba2 几乎都能维持性能不降。（PS：也可以看出，对于 LLM 预训练常见的 4K、8K 训练长度，Linear Attention 没有特别明显的优势）</strong></li>\n<li><strong>Hybrid-Lightning 虽然也会出现性能下降的问题，但是明显好于 Softmax Attention。</strong></li>\n</ul>\n<p><strong><img alt=\"\" src=\"https://pic3.zhimg.com/v2-ba9902765466ecb646e3bef9889dc7b4_1440w.jpg\" /></strong></p>\n<p><strong>腾讯同样也提出了混合结构的 Hunyuan-TurboS W560A56 模型（[2505.15431] Hunyuan-TurboS: Advancing Large Language Models through Mamba-Transformer Synergy and Adaptive Chain-of-Thought），其中 Softmax Attention 与 Mamba2 Layer 的比例大约为 1:8（7 vs 57）。</strong></p>\n<p><strong><img alt=\"\" src=\"https://picx.zhimg.com/v2-66fe71eaa4d85cc52c6dad83d1c549fb_1440w.jpg\" /></strong></p>\n<p><strong>如下图 Table 2 所示，其效果也还不错，与 DeepSeek-V3、Qwen3-235B-A22B 相当：</strong></p>\n<p><strong><img alt=\"\" src=\"https://pic1.zhimg.com/v2-3ddc142b0f15b2a1e31b40e517b76bd2_1440w.jpg\" /></strong></p>\n<p><strong>除了 MiniMax 和 Hunyuan 外，NVIDIA 也发表过基于 Mamba 的混合模型 Mamba-2-Hybrid 8B（[2406.07887] An Empirical Study of Mamba-based Language Models），其混合结构如下图 Table 6 所示，共 28 个 Attention Layer，其中：</strong></p>\n<ul>\n<li><strong>24 个是 Mamba2 的 Linear Attention</strong></li>\n<li><strong>4 个是 Softmax Attention，并且采用了 GQA。</strong></li>\n</ul>\n<p><strong><img alt=\"\" src=\"https://pic4.zhimg.com/v2-a14766a104fa761af6d80a9e3512335b_1440w.jpg\" /></strong></p>\n<p><strong>如下图 Table 7 所示，在一些常见的任务上确实可以获得还不错的效果：</strong></p>\n<p><strong><img alt=\"\" src=\"https://pic2.zhimg.com/v2-6d4d11c4551183b1ef5a944a5a21b35b_1440w.jpg\" /></strong></p>\n<p><strong>2.2.5 Sparse Attention</strong><br />\n<strong>与 Linear Attention 类似，Sparse Attention 也是为了降低长序列的计算开销，只是方向不同。Sparse Attention 的主要动机是：Attention Score 是高度稀疏化的，只关注权重比较高的 Score 可以大幅降低计算复杂度并维持相当的精度。</strong><br />\n<strong>Sparse Attention 在长序列 Inference 场景使用非常多，而预训练场景序列长度比较小，比较少使用。这里面比较早的工作是 Mistral 7B（[2310.06825] Mistral 7B）中使用的 Sliding Window Attention，是 Sparse Attention 的一种特例。如下图 Figure 1 所示，其相当于每个 Token 只关注附近的 Token。</strong></p>\n<p><strong><img alt=\"\" src=\"https://picx.zhimg.com/v2-51026d594ca1a2e35a6855924defa739_1440w.jpg\" /></strong></p>\n<p><strong>在这个领域，今年比较火的有两个工作（PS：都是针对长序列场景），一个是 Moonshot AI 的 [2502.13189] MoBA: Mixture of Block Attention for Long-Context LLMs，另外一个是 DeepSeek 的 Hardware-Aligned and Natively Trainable Sparse Attention。它们在某些方面都促进了一些共识：</strong></p>\n<ul>\n<li><strong>长序列场景（Long Prefill 或 Long Decoding），Attention 是高度稀疏化的，也是高度动态化的。</strong></li>\n<li><strong>固定 Pattern 的稀疏化方式往往很难保持精度，可学习 Sparse Pattern 是通用化且高精度的有效方案。</strong></li>\n<li><strong>Token 粒度的稀疏化很难充分发挥 GPU 算力，Block 粒度稀疏化是精度和性能（稀疏度、计算量）的良好平衡，基于此的高效 Block Sparse Attention 也成为标配。</strong></li>\n<li><strong>当前常见的 LLM 通常会采用 GQA，也要充分结合 GQA 的特性来设计稀疏化方案，不然可能会影响整体的稀疏化程度。</strong></li>\n<li><strong>在进行 Block 选择时并不需要使用 Block 内所有的 KV Cache，选择一个代表性的“聚类中心”即可，比如取 Avg 或者 Max。</strong></li>\n<li><strong>不要随意永久性丢弃 Token，由于 LLM 的自回归特性，很难推测在后续的生成中是不是一定不需要某个 Token。这也就是为什么在 NSA 和 MOBA 中并不会节约 KV Cache 的存储空间。</strong></li>\n</ul>\n<p><strong>如下图 Figure 1 所示为 Moonshot AI MoBA 的主要原理：</strong></p>\n<p><strong><img alt=\"\" src=\"https://pic2.zhimg.com/v2-bd598f213ac91f8231161bf850160e29_1440w.jpg\" /></strong></p>\n<p><strong>如下图 Figure 2 所示是 DeepSeek NSA 的主要原理：</strong></p>\n<p><strong><img alt=\"\" src=\"https://picx.zhimg.com/v2-9fb1ee260ddd74a77a0e9349a05d2f9b_1440w.jpg\" /></strong></p>\n<p><strong>2.3 MoE</strong><br />\n<strong>2.3.1 粗粒度 MoE</strong><br />\n<strong>2023 年的大语言模型还以 Dense 模型为主，2024 年初 Mistral AI 发布 Mixtral 8x7B MoE 模型（[2401.04088] Mixtral of Experts），引发了 MoE LLM 的热潮。不过早期的 MoE 还是比较粗粒度的专家，比如 Mixtral 8x7B 只有 8 个专家，后续的 Mixtral 8x22B 也是只有 8 个专家。</strong></p>\n<p><strong><img alt=\"\" src=\"https://pic4.zhimg.com/v2-4d55cecfaf258e78f8ff2be357d046e9_1440w.jpg\" /></strong></p>\n<p><strong>早期的 MoE 模型训练都比较保守，往往采用先训练 Dense 模型，然后通过 Upcycling 的方式扩展到 MoE 模型，比如上述的 Mixtral 8x7B 是由 Mistral 7B Upcycling 而来。在昆仑万维的 Skywork-MoE（[2406.06563] Skywork-MoE: A Deep Dive into Training Techniques for Mixture-of-Experts Language Models）中也对相应方案有所探讨，并将 Skywork 13B Dense 模型扩展为 Skywork 146B 的 MoE 模型（16 个专家）。</strong><br />\n<strong>2.3.2 细粒度 + 共享 MoE</strong><br />\n<strong>DeepSeek 团队在 DeepSeek MoE 的技术报告（[2401.06066] DeepSeekMoE: Towards Ultimate Expert Specialization in Mixture-of-Experts Language Models）中提出了细粒度专家+共享专家方案，并且在后续模型中一直延续。如下图 Figure 2 所示，DeepSeek MoE 模型主要有两点改进：</strong></p>\n<ul>\n<li><strong>细粒度专家（Routed Expert）：常见的 MoE 模型中通常是 8 或 16 个专家，而这里会将一个大专家切分为 M 个小专家。比如原来从 16 个专家中选择 Top 2 大概有 120 种可能；而同样计算量的 64 个专家（M=4）中选择 8 个，对应了 4,426,165,368 种可能。</strong></li>\n<li><strong>共享专家（Shared Expert）：额外增加了 1 个或多个共享专家，用于捕获通用知识，每个 Token 都会经过这些共享专家。</strong></li>\n</ul>\n<p><strong><img alt=\"\" src=\"https://picx.zhimg.com/v2-c8dc8710d23cafec46bd260aa3083771_1440w.jpg\" /></strong></p>\n<p><strong>3 个模型的具体配置如下所示，需要说明的是，3 个模型中都未使用 GQA，而是使用的 MHA（PS：这个应该是 23 年的工作，正好是 MHA 往 GQA 过渡的阶段）：</strong></p>\n<p><strong><img alt=\"\" src=\"https://pic3.zhimg.com/v2-0035a532dfb57993513329a067f603f8_1440w.jpg\" /></strong></p>\n<p><strong>在 DeepSeek MoE 阶段（24 年 1 月），细粒度 MoE 还没被广泛接受（当模型规模不大时，细粒度 MoE 对训练性能影响较大）。直到 DeepSeek V2（DeepSeek-V2: A Strong, Economical, and Efficient Mixture-of-Experts Language Model）甚至是后续的 DeepSeek V3（[2412.19437] DeepSeek-V3 Technical Report），这种细粒度专家和共享专家的方式的方式才被广泛接受并得到大规模使用。</strong><br />\n<strong>2.3.3 Dense + MoE</strong><br />\n<strong>除了 Softmax Attention 与 Linear Attention 的混合架构外，也有一些 Dense 模型和 MoE 模型的混合架构。这种方式最早出现在 Google 经典的 Switch Transformer模型中（[2101.03961] Switch Transformers: Scaling to Trillion Parameter Models with Simple and Efficient Sparsity），其同样是 MoE 相关工作中非常经典的 Paper。如下图 Figure 2 所示，单看架构图很容易误解为是一个纯粹的 MoE 模型（每一个 Transformer Layer 都包含 MoE Block），一些非官方的代码实现中也是如此。然而，实际上该模型是一个混合架构模型。</strong></p>\n<p><strong><img alt=\"\" src=\"https://pic4.zhimg.com/v2-ebc867ad698644ca95a3f65ffe833591_1440w.jpg\" /></strong></p>\n<p><strong>如下图 Table 9 所示，其中提到 Expert Freq 为 1/2，表明 MoE Transformer Layer 和 Dense Transformer Layer 各占 1/2：</strong></p>\n<p><strong><img alt=\"\" src=\"https://pic4.zhimg.com/v2-a80fb5fb65fa3d5e117f9938df47c53f_1440w.jpg\" /></strong></p>\n<p><strong>Google 在此后的 GLaM 模型（[2112.06905] GLaM: Efficient Scaling of Language Models with Mixture-of-Experts）和 ST-MoE 模型（[2202.08906] ST-MoE: Designing Stable and Transferable Sparse Expert Models）中都沿袭了这种方式。不过这些都是在 ChatGPT 之前的工作。</strong><br />\n<strong>在后续的 LLM 中比较少出现这种情况。最常见的是 DeepSeek 系列 MoE 模型以及沿袭 DeepSeek V3 的 Kimi K2 模型：</strong></p>\n<ul>\n<li><strong>DeepSeek MoE 包含 28 层，第 1 层是 Dense Layer，后续 27 层为 MoE Layer。</strong></li>\n<li><strong>DeepSeek V2 包含 60 层，第 1 层是 Dense Layer，后续 59 层为 MoE Layer。</strong></li>\n<li><strong>DeepSeek V3 包含 61 层，前 3 层是 Dense Layer，后续 58 层为 MoE Layer。</strong></li>\n<li><strong>DeepSeek K2 包含 61 层，第 1 层是 Dense Layer，后续 60 层为 MoE Layer。</strong></li>\n</ul>\n<p><strong>DeepSeek 在 DeepSeek MoE 的 Paper 中提到，采用这种方式主要是第 1 层的负载均衡状态收敛很慢，因此将第 1 层保留为 Dense 层。Moonshot 在实现 K2 模型时同样发现第 1 层的 MoE 的 Router 很难做到负载均衡，但不同的是第 2 层并没有发现此现象，因此相比 DeepSeek V3，只是第 1 层使用 Dense 层，第 2 和 第 3 层都使用 MoE 层。</strong><br />\n<strong>其实后续的很多其他工作也采用了类似的方案：</strong></p>\n<ul>\n<li><strong>小红书 dots.llm1：62 层，第 1 层 Dense，后 61 层 MoE。</strong></li>\n<li><strong>百度 ERNIE 4.5：54 层，前 3 层 Dense，后 51 层 MoE。</strong></li>\n</ul>\n<p><strong>2.4 其他改进</strong><br />\n<strong>2.4.1 MTP</strong><br />\n<strong>DeepSeek V3 模型同样采用了 DeepSeek V2 的 MLA 以及细粒度专家+共享专家的 MoE 结构。除了模型增大之外，模型层面最主要的变化是引入 MTP（Multi-Token Prediction），这个思路在 Inference 的投机采样中经常使用，只不过这里也可以帮助提升模型训练的效果。具体来说：</strong></p>\n<ul>\n<li><strong>其中 Main Model 就是标准的 Next Token Prediction。</strong></li>\n<li><strong>MTP Module 1 用于预测下下一个 Token，MTP Module 2 用于预测下下下一个 Token（与 LLM 推理中常见的多头投机采样思路一致）。</strong></li>\n<li><strong>MTP Module 中的输入都包含两个部分，一个是上一个 Module 的 Output Head 的输入，以及上一个输入 Token，并且其中的 Embedding Layer 和 Output Head 都是共享自 Main Model，只有新增的 RMSNorm + Linear Projection 和一个 Transformer Block。由于这里有两个输入分别经过 RMSNorm 后 Concat 到一起，因此需要一个额外的 Linear Projection 进行降维，保持维度一致。</strong></li>\n</ul>\n<p><strong><img alt=\"\" src=\"https://pic1.zhimg.com/v2-5d7607eb0bdddfa33728be1e21b121b6_1440w.jpg\" /></strong></p>\n<p><strong>MTP 策略主要用于提升 Main Model 的性能，因此在推理阶段，可以直接舍弃 MTP Module，Main Model 仍能独立且正常运行。此外，还可将这些 MTP Module 用于投机解码，以进一步降低生成延迟。</strong><br />\n<strong>三、分布式并行策略</strong><br />\n<strong>3.1 概述</strong><br />\n<strong>LLM 模型规模很大，单 GPU 甚至单节点往往无法放下，即使可以放下也可能因为显存空间有限而限制各种优化策略的实施。为了解决这些问题并获得最大吞吐，通常会采用各种混合分布式并行策略来优化，常见的有 DP（Data Parallelism）、TP（Tensor Parallelism）、PP（Pipeline Parallelism）、EP（Expert Parallelism）和 SP（Sequence Parallelism）。除此之外，也有许多优化方案试图改进上述并行策略，以便获得更优吞吐。</strong><br />\n<strong>3.2 DP</strong><br />\n<strong>3.2.1 概述</strong><br />\n<strong>DP 是最常用的并行策略，因为它与其他并行策略正交，实现简单并且通信量相对不是很大，很容易扩展训练的规模。但是 DP 也存在一个比较明显的问题：在每个 DP 组内都有完整的模型、优化器状态和梯度副本，导致内存开销比较大。</strong><br />\n<strong>3.2.2 DeepSpeed ZeRO</strong><br />\n<strong>为了解决内存开销大的问题，微软提出了 ZeRO 相关工作（[1910.02054] ZeRO: Memory Optimizations Toward Training Trillion Parameter Models）。如下图 Figure 1 所示，根据不同的程度充分将优化器状态（os）、梯度（g）和模型参数（p）切分到所有的设备中，也就是不同的 DP 组中会存储不同的优化器状态、梯度和参数切片。</strong></p>\n<ul>\n<li><strong>ZeRO-1（Pos）：将优化器状态切分到所有设备，每个设备还有全量的模型参数和梯度。优先切分优化器状态是因为其占用内存更多，并且与 Forward 和 Backward 的反向传播无关，只影响模型权重参数更新阶段。（PS：由于 ZeRO-1 中每个设备只需要对应部分的平均梯度，而不像 DP 那样需要梯度的 AllGather，因此总的通信量不变。也就是说，在极大降低显存开销的情况下并不会增加通信量，这也是为什么常见的并行方案中基本都会默认采用 ZeRO-1 或者叫 ZeRO-DP）</strong></li>\n<li><strong>ZeRO-2（Pos+g）：在 ZeRO-1 的基础上进一步切分梯度，切分梯度也不影响 Forward 过程。</strong></li>\n<li><strong>ZeRO-3（Pos+g+p）：在 ZeRO-2 的基础上进一步切分模型参数，会影响 Forward 阶段，需要 AllGather 所有参数才能计算，会引入更多通信。采用 ZeRO-3 几乎可以将内存需求降低到 1/N，其中 N 表示设备数，这里是 64。</strong></li>\n</ul>\n<p><strong><img alt=\"\" src=\"https://picx.zhimg.com/v2-88096ad899c48794c440f9425adcda1b_1440w.jpg\" /></strong></p>\n<p><strong>3.2.3 PyTorch FSDP</strong><br />\n<strong>与 DeepSpeed 的 ZeRO 优化方案类似，Meta 也提供了 PyTorch 原生支持的 FSDP V1（[2304.11277] PyTorch FSDP: Experiences on Scaling Fully Sharded Data Parallel）和 FSDP V2（[2411.00284] SimpleFSDP: Simpler Fully Sharded Data Parallel with torch.compile） 方案。早期的 Megatron-LM 框架不支持 FSDP，限制了 FSDP 的发展，最近半年 NVIDIA 在 Megatron-Core 里实现了相应的能力并进行了一系列优化，也能获得很不错的吞吐。随着后续集群 Scale-Up 域的扩展（比如 NVL72），FSDP 也许会有更大的空间。</strong></p>\n<p><strong><img alt=\"\" src=\"https://pica.zhimg.com/v2-2e1f55e98e474966ef228d6c9bc48ec2_1440w.jpg\" /></strong></p>\n<p><strong>3.3 TP</strong><br />\n<strong>很多时候模型在单一 GPU 无法放下，此时通常会采用 TP 切分，对于 Transformer 模型而言，最常见的是 NVIDIA 在 [1909.08053] Megatron-LM: Training Multi-Billion Parameter Language Models Using Model Parallelism 提出的切分方式。</strong><br />\n<strong>如下图 （a）所示，MLP 层的两个 FC 采用先列切（A，Column Parallelism），然后行切（B，Row Parallelism）的方案，这样两个 FC 之间不用通信：</strong></p>\n<p><strong><img alt=\"\" src=\"https://pica.zhimg.com/v2-bc826d4f30d19fe2c1e7fbf0e3081ac6_1440w.jpg\" /></strong></p>\n<p><strong>如下图（b）所示，由于每个 Head 的 Attention，Softmax 都是独立的，因此可以采用按照 Head 的方式切分（等价于 Column Parallelism），然后对之后的 FC 采用行切分（B，Row Parallelism），这样 Self-Attention 中间也不用通信：</strong></p>\n<p><strong><img alt=\"\" src=\"https://pic4.zhimg.com/v2-c1398cc6eb5d51e435b4f644d9ac6027_1440w.jpg\" /></strong></p>\n<p><strong>然而，由于每个 Transformer Layer 的 Forward 和 Backward 都需要 2 次 AllReduce 操作，并且通信量大，为了避免 TP 通信成为瓶颈，通常会将 TP 切分到一个节点内，因为节点内的 8 个 GPU 可以充分利用 NVLink + NVSwitch 的高带宽（PS：这也是为什么 TP 通常不会大于 8）。</strong><br />\n<strong>如下图 Figure 8 所示为 Megatron-LM 中一个 DP + TP 的混合分布式并行方案，总共采用 64 台 8 GPU 机器，共 512 GPU。</strong></p>\n<ul>\n<li><strong>每台机器的 8 个 GPU 组成一个 Model Parallelism Group（TP），共 64 个 TP Group；每个 TP Group 内的 GPU 包含不同的模型参数，并且使用相同的训练数据。</strong></li>\n<li><strong>所有设备的同号 GPU（比如 GPU 1，9，...，505）组成一个 Data Parallelism Group（DP），共 8 个 DP Group；每个 DP Group 内的 GPU 都有相同的模型参数，但是使用不同的训练数据。</strong></li>\n</ul>\n<p><strong><img alt=\"\" src=\"https://pica.zhimg.com/v2-6040ed44752ddd45ab5f13deb740bea2_1440w.jpg\" /></strong></p>\n<p><strong>当然，TP 也存在明显的问题：TP 会对 Tensor 进行切分，从而可能降低矩阵计算的算术强度。对于比较大的 Dense LLM，由于 TP 通常不会很大，基本还能接受；但是对于比较小的模型，或者细粒度的 MoE 模型，其矩阵乘法的 Shape 本身比较小，TP 切分后对算术强度的影响比较大，会导致吞吐的明显下降，无法充分发挥 GPU 的性能，因此在细粒度 MoE 模型的专家部分比较少采用 TP 并行。</strong><br />\n<strong>3.3 PP</strong><br />\n<strong>3.3.1 概述</strong><br />\n<strong>PP 是另一种常见的模型并行策略，其同样是将模型切分成不同的部分，只不过与 TP 的切分方式不同，其主要是将模型的不同层切分到不同的设备上。</strong><br />\n<strong>如下图 Figure 3 所示为使用 4 个设备进行 PP 训练的执行过程。其每一行代表一个设备，蓝色表示 Forward，绿色表示 Backward，Forward 和 Backward 中的数字指的是 Mini Batch 的 ID。由于是按层切分，并且同一时间只有 1 个 Mini Batch，每个设备都必须等待之前的设备执行完才能执行对应的 Stage，导致存在大量的 Bubble。</strong></p>\n<p><strong><img alt=\"\" src=\"https://pic3.zhimg.com/v2-0994d57b841130bcd4d66024a685a61a_1440w.jpg\" /></strong></p>\n<p><strong>3.3.2 1F1B</strong><br />\n<strong>实际上当设备 1 执行完 Mini Batch 1 的 Forward 之后便可以开始 Mini Batch 2 的 Forward，以此类推。在调度的过程中，系统中的每个设备都会有两个选择：</strong></p>\n<ul>\n<li><strong>对某个 Mini Batch 执行 Forward，进而可以将 Mini Batch 传递到下一个设备。</strong></li>\n<li><strong>对另一个 Mini Batch 执行 Backward，进而确保学习向前推进。</strong></li>\n</ul>\n<p><strong>如果始终优先考虑 Forward，则会导致阻塞 Backward，模型也就无法学习和更新，因为只有 Backward 后才能执行权重更新；同样，如果只考虑 Backward 优先调度，则会导致计算资源闲置，无法充分发挥算力。</strong><br />\n<strong>为了避免上述问题，1F1B （1次 Forward，1次 Backward，[1806.03377] PipeDream: Fast and Efficient Pipeline Parallel DNN Training）调度机制应运而生。如下图 Figure 8 所示，4 个设备，分成 4 个 Stage。在起始阶段允许执行多个 Mini Batch 的 Forward，稳定后就保持 Forward 和 Backward 的交替执行，这样可以保证 GPU 在稳定状态下没有空闲，并且始终继续学习。</strong></p>\n<p><strong><img alt=\"\" src=\"https://pic3.zhimg.com/v2-65daa16e326a92b8a78a728444ffc7c4_1440w.jpg\" /></strong></p>\n<p><strong>上述的 1F1B 过程并不需要 Forward 和 Backward 一样长，实际上，Backward 总是大于 Forward（大约 2 倍），此时 1F1B 依然是有效的调度机制。</strong><br />\n<strong>PP 相比 TP 来说，只用在相邻的 PP Stage 间进行 P2P 通信即可，其通信次数、通信量相对较少，因此比较适合跨节点间通信；除此之外，从上图也可以推测出，增加梯度累加的次数，也就是 Mini Batch 的数量，可以较大程度降低 Bubble 率，梯度累加次数越大，Bubble 率越小。</strong><br />\n<strong>3.3.3 Interleaved 1F1B</strong><br />\n<strong>采用 PP 最需要关注的问题就是 Bubble 率，需要尽可能的利用流水线机制让所有设备处于工作状态，提升整体吞吐。</strong><br />\n<strong>NVIDIA 在 [2104.04473] Efficient Large-Scale Language Model Training on GPU Clusters Using Megatron-LM 中提出的 Interleaved-1F1B 方案正是为了降低 Bubble 率。</strong><br />\n<strong>如下图 Figure 4 所示为基于 1F1B 提出的 Interleaved 1F1B 调度方案。</strong></p>\n<ul>\n<li>\n<p><strong>上图为 1F1B：假设模型有 16 层，每个 Device 有 4 层。</strong></p>\n</li>\n<li>\n<p><strong>对应 K=4 个 Device，Micro Batch 个数为 M=8，也就是每 M=8 个 Micro Batch 进行一次同步梯度更新。</strong></p>\n</li>\n<li>\n<p><strong>模型被分为 4 个 Stage，Device 1 包含 Layer (0,1,2,3)，Device 2 包含 Layer (4,5,6,7)，Device 3 包含 Layer(8,9,10,11)，Device 4 包含 Layer(12,13,14,15)。</strong></p>\n</li>\n<li>\n<p><strong>下图为Interleaved 1F1B：</strong></p>\n</li>\n<li>\n<p><strong>与标准 1F1B 的主要不同是层的切分方式。</strong></p>\n</li>\n<li><strong>模型被分为 8 个 Stage，Device 1 包含 Layer (0,1,8,9)，Device 2 包含 Layer (2,3,10,11)，Device 3 包含 Layer(4,5,12,13)，Device 4 包含 Layer(6,7,14,15)。可以看出，相当于将模型切分为 8 个 Stage，但是交替放在 4 个 Device 上，下图中深色代表前 4 个 Stage（Layer 0-7），浅色代表后 4 个 Stage（Layer 8-15）。以此就可以实现更细力度的调度，减少 Bubble。</strong></li>\n</ul>\n<p><strong><img alt=\"\" src=\"https://pic3.zhimg.com/v2-245e6a67f6e7ec951b350585139444c8_1440w.jpg\" /></strong></p>\n<p><strong>3.3.4 ZeroBubble</strong><br />\n<strong>Sea AI-Lab 团队在 [2401.10241] Zero Bubble Pipeline Parallelism 中进一步提出了 Zero Bubble 方案，可以进一步降低 Bubble 率。</strong><br />\n<strong>如下图 Figure 1 所示，ZeroBubble 中将 Backward 分成两个部分，一部分计算输入的梯度，一部分计算权重的梯度。这里计算输入的梯度有明确的依赖关系，也是链式法则不断传递的基础；而计算权重的梯度却没有明确的依赖，甚至可以滞后很多。此外，三个红色部分计算量相当，这也就是为什么之前 1F1B 或者 Interleaved-1F1B 中 Backward 的长度为 Forward 的 2 倍。</strong></p>\n<p><strong><img alt=\"\" src=\"https://picx.zhimg.com/v2-3bfa3ec09cdad5c187f57c21a1c7ff4f_1440w.jpg\" /></strong></p>\n<p><strong>可以看出，ZeroBubble 的方式为降低 Bubble 率提供了更多的可能，然而也有一定局限性。首先，当梯度累积次数比较多时，Bubble 率本身不大，提升的空间也就比较有限；此外，通常优化方案中会将上述两个梯度的计算放在一个 Kernel 里，ZeroBubble 会将其变成两个 Kernel，有可能导致效率的降低。</strong><br />\n<strong>3.3.5 非均匀 PP</strong><br />\n<strong>由于 LLM 模型中除了 Transformer Block 外还有一些其他组件，比如还有开始的 Word Embedding，结尾的 LM Head 以及 Loss 计算，对于 DeepSeek 模型还有 MTP Layer，如果按照 Transformer Block 平均切分会存在计算的负载不均衡；此外，由于 1F1B 的机制问题，PP Stage 越靠前的部分就会占用越多的 GPU 显存，导致显存的不均衡。</strong><br />\n<strong>对于计算负载不均的问题，思路也比较简单，既然首尾 Stage 的计算负载更大，那么让首尾的层数少一些即可。比如：</strong></p>\n<ul>\n<li><strong>智谱在 GLM-130B 模型（[2210.02414] GLM-130B: An Open Bilingual Pre-trained Model）时就提出将 72 层 Transformer Block 变成 70 层，PP 为 8，中间各 9 层，起始各 8 层，这样可以降低首尾 Stage 的压力。</strong></li>\n<li><strong>Meta 在 LLaMA3 405B 模型（[2407.21783] The Llama 3 Herd of Models）中同样采用了类似的方案，共包含 126 层，同样是首尾 Stage 少 1 层。</strong></li>\n<li><strong>昆仑万维在 Skywork-MoE 也类似，24 层，由 [6, 6, 6, 6] 切分变为 [5, 5, 5, 5, 4]。</strong></li>\n</ul>\n<p><strong>对于显存开销不均的问题，通常会使用重计算和 Offloading 机制来缓解，不过也需要注意重计算或者 Offloading 的粒度，通常不会对整个 Transformer Layer 进行，而是针对个别计算，以便尽可能降低重计算等带来的额外开销。</strong><br />\n<strong>3.3.6 DeepSeek DualPipe</strong><br />\n<strong>对于 DeepSeek V3 而言，跨节点 EP 引入的通信开销导致计算与通信比约为 1:1，效率很低。为了应对这一挑战，作者设计了一种创新的流水线并行算法 DualPipe。</strong><br />\n<strong>DualPipe 的核心思想是：将一对独立的 Forward 与 Backward Chunk 内的计算与通信进行 Overlap。特别地，对于 Backward Chunk，借鉴 ZeroBubble，将 Attention 与 MLP 的 Backward 分为两部分：Backward for Input 及 Backward for Weight。</strong><br />\n<strong>如下图 Figure 4 所示，针对一对 Forward 与 Backward Chunk，重新排列这些组件，并手动调整 GPU SM 在通信与计算间的分配比例。在此 Overlap 策略下，能够确保 All2All 和 PP 通信在执行过程中完全隐藏，其中：</strong></p>\n<ul>\n<li><strong>橙色表示 Forward</strong></li>\n<li><strong>绿色表示 Backward for Input</strong></li>\n<li><strong>蓝色表示 Backward for Weight</strong></li>\n<li><strong>紫色表示 PP 通信</strong></li>\n<li><strong>红色表示 Barrier 同步</strong></li>\n</ul>\n<p><strong><img alt=\"\" src=\"https://picx.zhimg.com/v2-70b4cd5fd02dddf94ce75d6904c86279_1440w.jpg\" /></strong></p>\n<p><strong>完整的 DualPipe 调度如下图 Figure 5 所示，其采用双向 PP 调度，同时从流水线两端输入 Micro Batch，使得大部分通信得以完全 Overlap（PS：8PP，双向 20 Micro Batch，反方向 10-19 的 10 个 Micro Batch 并没有列出来，因此我们用红色 10-19 补充了部分 Micro Batch）。这种 Overlap 还确保了随着模型进一步扩展，只要保持恒定的计算与通信比，仍可在跨节点部署细粒度专家的同时，实现近乎零的 All2All 通信开销。</strong><br />\n<strong>PS：正常来说是无法实现双向 PP 调度的，主要是因为 Forward 执行顺序是从前往后，比如从 Layer 0,1,2,...,14,15，而 Backward 执行顺序是从后往前，比如 Layer 15,14,...,2,1,0。而常见 PP 中的 Layer 只会在某一个 PP Stage，比如 8 PP，那么：</strong></p>\n<ul>\n<li><strong>Stage 0 上有 Layer 0 和 1 的权重</strong></li>\n<li><strong>Stage 1 上有 Layer 2 和 3 权重</strong></li>\n<li><strong>Stage 7 上有 Layer 14 和 15 的权重</strong></li>\n<li><strong>Forward 的顺序也只能从 Stage 0 到 Stage 7，不能从 Stage 7 到 Stage 0。</strong></li>\n</ul>\n<p><strong>而 DeepSeek V3 的双向 PP 调度中，还是 8 PP 为例：</strong></p>\n<ul>\n<li><strong>Stage 0 上有 Layer 0, 1 以及 Layer 14, 15 的权重</strong></li>\n<li><strong>Stage 1 上有 Layer 2, 3 以及 Layer 12, 13 的权重</strong></li>\n<li><strong>Stage 7 上有 Layer 14, 15 以及 Layer 0, 1 的权重</strong></li>\n<li><strong>相当于有 2 份相同的模型副本，Forward 的顺序可以从 Stage 0 到 7，也可以从 Stage 7 到 0。</strong></li>\n</ul>\n<p><strong><img alt=\"\" src=\"https://pic2.zhimg.com/v2-182f46b398887cbcdba69bf0ed26484f_1440w.jpg\" /></strong></p>\n<p><strong>3.3.7 NVIDIA Merged FWD-BWD</strong><br />\n<strong>DeepSeek 的 DualPipe 会导致静态显存翻倍，此外仍然存在较高的 Bubble 率。针对上述问题，NVIDIA 也提出利用奇&amp;偶 Micro-Batch 实现 Overlap 的方案，已在 Megatron-LM 中集成，如下图所示：</strong></p>\n<p><strong><img alt=\"\" src=\"https://pic1.zhimg.com/v2-ad8f9374af356e1420b128434ebedaf2_1440w.jpg\" /></strong></p>\n<p><strong>此外，华为在 [2505.04519] Pangu Ultra MoE: How to Train Your Big MoE on Ascend NPUs 中提出了和 NVIDIA 类似的方案，核心思路也是利用 Micro Batch 间的独立性，以 Forward 计算掩盖 Backward 通信（反之亦然）。</strong><br />\n<strong>3.4 EP</strong><br />\n<strong>3.4.1 概述</strong><br />\n<strong>对于 Dense LLM 而言，采用 DP（Zero-1） + TP + PP 基本都能获得不错的吞吐。而对于 MoE 模型，尤其是细粒度 MoE，TP 已经不再合适，一般都会引入 EP 策略。这里通常会涉及几个方面的问题：</strong></p>\n<ul>\n<li><strong>在 MoE 之前引入 All2All Dispatch，在 MoE 之后引入 All2All Combine 操作，通信开销比较大。</strong></li>\n<li><strong>Dispatch 和 Combine 处存在比较多小的 Kernel，效率比较低。</strong></li>\n<li><strong>EP 中不同设备可能存在负载不均的问题。</strong></li>\n</ul>\n<p><strong><img alt=\"\" src=\"https://pic3.zhimg.com/v2-6801eeeed7a42d1c9d4767665e7e3402_1440w.jpg\" /></strong></p>\n<p><strong>3.4.2 DeepEP</strong><br />\n<strong>MoE 模型 EP 的主要挑战就是高性能的 All2All 实现。DeepSeek V3 中，为了确保 DualPipe 具有足够的计算性能，定制了高效的跨节点 All2All 通信 Kernel（包括 Dispatching 和 Combining），以节省专用于通信的 SM 数量。Kernel 的实现也与 MoE Gating 算法及集群的网络拓扑共同设计。</strong></p>\n<ul>\n<li><strong>为了有效利用 IB 和 NVLink 的不同带宽，将每个 Token 限制为最多被发送到 4 个节点，从而减少 IB 流量。</strong></li>\n<li><strong>对于每个 Token，在做出路由决策时，首先通过 IB 传输到其目标节点上具有相同节点内索引的 GPU。一旦到达目标节点，将努力确保它通过 NVLink 立即转发到承载目标专家的特定 GPU，而不会被随后到达的 Token 阻塞。（PS：比如说，节点 A 上 GPU 0 的 Token 要发送到节点 B 上的 GPU 3，则对应的路径为：节点 A GPU 0 -&gt; 节点 B GPU 0 -&gt; 节点 B GPU 3。这样做是因为高性能 GPU 训练集群往往会采用轨道优化，同号 GPU 在一个 Leaf Switch 下，因此可以利用高速的 NVLink 来代替从 Leaf Switch 到 Spine Switch 的流量，从而降低 IB 通信时延，并且减少 Leaf Switch 和 Spine Switch 之间的流量，这也是 NVIDIA PXN 的核心思路）</strong></li>\n</ul>\n<p><strong>DeepSeek 随后也开源了相应实现 DeepEP（GitHub - deepseek-ai/DeepEP: DeepEP: an efficient expert-parallel communication library），是专为 MoE 和 EP（Expert Parallelism, EP）设计的通信库。提供了一系列优化的通信 Kernel，实现了以下能力：</strong></p>\n<ul>\n<li>\n<p><strong>高度优化的 All2All 通信，适合 MoE 模型 2 个主要过程：</strong></p>\n</li>\n<li>\n<p><strong>Dispatch：将 Token 发送给专家。</strong></p>\n</li>\n<li>\n<p><strong>Combine：从专家接收处理过的 Token 过程。</strong></p>\n</li>\n<li>\n<p><strong>同时支持不同的通信类型：</strong></p>\n</li>\n<li>\n<p><strong>节点内（intra-node）：可以使用 NVLink + NVSwitch 通信。</strong></p>\n</li>\n<li>\n<p><strong>节点间（inter-node）：可以使用 RDMA 通信。</strong></p>\n</li>\n<li>\n<p><strong>针对不同场景的 Kernel：</strong></p>\n</li>\n<li>\n<p><strong>常规（高吞吐） Kernel（Normal Kernel）：针对 Training 和 Inference Prefill。节点内 NVLink + 节点间 RDMA 通信。</strong></p>\n</li>\n<li>\n<p><strong>低时延 Kernel（Low-Latency Kernel）：针对 Inference Decoding。使用纯 RDMA 通信来最小化时延。</strong></p>\n</li>\n<li>\n<p><strong>原生支持 FP8，减少数据传输需求，相比 FP16 通信量减半。</strong></p>\n</li>\n<li><strong>灵活的 GPU 资源（SM）控制，支持计算和通信的 Overlap。</strong></li>\n</ul>\n<p><strong>除此之外，如果模型不是非常大，将 EP 的 All2All 放在一个节点内，使用 NVLink + NVSwitch 的高带宽通信也是常见的优化方案。</strong><br />\n<strong>3.4.3 专家负载均衡</strong><br />\n<strong>专家负载均衡是 MoE 模型另外一个非常常见的问题。其不仅影响预训练阶段，还会影响 Inference 阶段的性能。针对这个问题，通常会采用负载均衡损失来解决，由于 DeepSeek 系列模型的负载均衡比较典型，这里以 DeepSeek 系列为主。</strong><br />\n<strong>DeepSeek MoE 中采用了 2 种负载均衡损失：</strong></p>\n<ul>\n<li><strong>专家级负载损失（Expert-Level Balance Loss）：让各个专家的负载平均，尽量避免都路由到少数专家。</strong></li>\n<li><strong>设备级负载损失（Device-Level Balance Loss）：强制让各个专家负载平均可能影响效果。由于每个设备（GPU）包含多个专家，因此让不同设备上的计算量尽量均衡同样可以一定程度避免负载不均的问题。</strong></li>\n</ul>\n<p><strong>DeepSeek V2 中采用了 3 种辅助负载均衡损失：</strong></p>\n<ul>\n<li><strong>专家级负载损失（Expert-Level Balance Loss）：同 DeepSeek MoE。</strong></li>\n<li><strong>设备级负载损失（Device-Level Balance Loss）：同 DeepSeek MoE。</strong></li>\n<li><strong>通信负载损失（Communication Balance Loss）：设备限制路由可以保证每个设备发送的通信量是有界的，但如果某个设备接收的 Token 比其他设备多，实际的通信效率也会受到影响。为此，引入通信负载损失，正是为了缓解不同设备接收 Token 不均衡的问题。保证设备之间均衡交换信息，促进高效通信。</strong></li>\n</ul>\n<p><strong>DeepSeek V2Token Dropping 策略：负载均衡损失可以促进均衡，但是无法严格保证。为了进一步减少负载不均导致的计算资源浪费，DeepSeek V2 中额外引入了设备级 Token 丢弃策略（Device Level Token Dropping Strategy）。首先计算每个设备的平均计算预算，也就意味着每个设备的容量因子等同于 1.0，然后在每个设备上丢弃亲和力得分最低的 Token，直到达到计算预算需求；除此之外，确保约 10% 的训练序列中的 Token 永远不会被丢弃。根据效率需求，可以在 Inference 过程中灵活配置是否丢弃 Token，并始终保证 Training 和 Inference 的一致性。</strong><br />\n<strong>DeepSeek V3 中进一步对专家负载均衡策略进行了调整：</strong></p>\n<ul>\n<li><strong>无需辅助损失的负载均衡策略（Auxiliary-Loss-Free Load Balancing Strategy）：来自 DeepSeek 2024 年的论文（[2408.15664] Auxiliary-Loss-Free Load Balancing Strategy for Mixture-of-Experts），具体来说，其通过动态更新每个专家的偏置（b）来维持专家的负载均衡，而不会引入额外的干扰梯度。</strong></li>\n<li><strong>补充的序列级辅助损失（Complementary Sequence-Wise Auxiliary Loss）：尽管 DeepSeek-V3 主要依赖于无辅助损失的策略来实现负载平衡，但为了防止在任何单一序列中出现极端的不平衡，作者采用一种补充的序列级均衡损失。这种序列级均衡损失的目的是鼓励每个序列中的专家负载更加均衡，避免负载集中在少数专家上，从而提高模型的效率和公平性。</strong></li>\n<li><strong>节点限制路由（Node-Limited Routing）：与 DeepSeek-V2 所采用的设备限制路由类似，DeepSeek-V3 同样使用了一种约束路由机制以控制训练过程中的通信开销。简而言之，确保每个 Token 最多被发送至 M 个节点，这些节点的选择依据是分布在各节点上的专家中，其亲和度得分最高的 Kr/M 项之和。在此约束下，MoE 训练框架几乎能够实现计算与通信的完全重叠。</strong></li>\n</ul>\n<p><strong>DeepSeek V3No Token-Dropping：得益于高效的负载均衡策略，DeepSeek-V3 在整个训练过程中保持了良好的负载平衡。因此，DeepSeek-V3 在训练期间未丢弃任何 Token。此外，作者还实施了特定的部署策略以确保推理过程中的负载均衡，故 DeepSeek-V3 在推理阶段同样不会丢弃 Token。</strong><br />\n<strong>3.4.4 MoE 计算优化 —— 设备内</strong><br />\n<strong>当前常见粗粒度 MoE 模型的专家数通常是 8-32，而细粒度 MoE 的专家数通常可以达到 64-256，在 Kimi K2 中更是高达 384。在 Inference 阶段经常会采用超大 EP 的方式以尽可能提升计算强度；而在 Training 阶段，不像 Inference 的 Decoding 有那么明显的 Memory Bound 问题，因此通常 EP 不会特别大。此时，一个设备上会存在多个专家，相应的计算问题就是经典的 Grouped GEMM 计算问题，由于每个专家的 Token 数可能不同，相应矩阵计算的 Shape 也可能不等。</strong><br />\n<strong>Grouped GEMM 有几种常见的解法，在不同 Shape 下它们的性能也会差距很大（如下图 Figure 1 是非常早的一个图，一定程度上可以说明这个问题）：</strong></p>\n<ul>\n<li><strong>For 循环串行调度：效率最低，但是当 Shape 非常大时可能也不会特别差。</strong></li>\n<li><strong>Multi-Stream 调度：多个 Stream 同时执行，在 Shape 不是特别大时可以更充分的利用 GPU 资源，但是 Kernel Launch 开销无法避免。</strong></li>\n<li><strong>Batched GEMM：对于同 Shape 的多个 GEMM 计算，cuBLAS 提供了 BatchedGEMM 的 API（cublasgemmgroupedbatchedex），可以直接使用，通常能获得很不错的性能。</strong></li>\n<li><strong>Grouped GEMM：对于不同 Shape 的多个 GEMM 计算，CUTLASS 和 DeepSeek 开源的 DeepEP（DeepGEMM: clean and efficient FP8 GEMM kernels with fine-grained scaling）也提供了相应方案。这种方式通常能获得很不错的性能。</strong></li>\n</ul>\n<p><strong><img alt=\"\" src=\"https://pic1.zhimg.com/v2-459d08aaa8d7d4ff82a097a2c34073aa_1440w.jpg\" /></strong></p>\n<p><strong>如下图 Table 1 所示，小红书团队在 [2506.05767] dots.llm1 Technical Report 中也提到了相关优化方案，通过优化 GroupedGEMM 获得相应算子 Forward 14%，Backward 8% 的提升：</strong></p>\n<p><strong><img alt=\"\" src=\"https://pic1.zhimg.com/v2-f1f2c9f995136465a9bb54420e51892a_1440w.jpg\" /></strong></p>\n<p><strong>3.4.5 MoE 负载优化 —— 设备间</strong><br />\n<strong>MoE 负载均衡损失可以尽可能的降低负载不均的问题，但是依然无法严格保证。此外，Grouped GEMM 可以优化设别内的计算效率，但是无法缓解节点间负载不均的问题。</strong><br />\n<strong>针对上述问题，华为在 Pangu Ultra MoE（[2505.04519] Pangu Ultra MoE: How to Train Your Big MoE on Ascend NPUs）中提出了动态重排的方案。如下图 Figure 11 所示，如果某个 Device 上被路由到的 Token 数都比较少（Device 0），则相较于路由到比较多 Token 的 Device 会出现计算的 Bubble（Device 1）。通过 Planner 和 Executor 的协同合作，动态调整 Device 上 Expert 的排布，可以让不同 Device 上的负载尽可能均衡，从而提升整体的利用率。</strong></p>\n<p><strong><img alt=\"\" src=\"https://picx.zhimg.com/v2-df8ac93a66c3f278c5addce8cd568a7d_1440w.jpg\" /></strong></p>\n<p><strong>华为在 Pangu Pro MoE（[2505.21411] Pangu Pro MoE: Mixture of Grouped Experts for Efficient Sparsity）中还采用了专家分组的方式，在专家选择时，让每个组都选择固定数量的专家，这样可以保证每组的负载是均衡的，但会降低专家的可组合数，也就是降低专家组合的空间。（DeepSeek 中也有类似的方案）</strong></p>\n<p><strong><img alt=\"\" src=\"https://pic1.zhimg.com/v2-bcd979028b09dfa4f0a2764e2b9986d6_1440w.jpg\" /></strong></p>\n<p><strong>其实 DeepSeek V3 在 Inference 阶段也会采用类似但稍有不同的负载均衡方案，比如针对共享专家、高负载专家采用冗余部署，并动态重排的方案来尽可能的实现负载的均衡。</strong><br />\n<strong>3.4.5 Permute &amp; UnPermute 算子优化</strong><br />\n<strong>在 MoE 模型中另外一个容易影响吞吐的地方就是 MoE 相关的 Permute 和 Unpermute 操作，此处会存在很多较小的 Kernel，如果不进行优化也会一定程度上影响性能。NVIDIA 在 GitHub - NVIDIA/TransformerEngine 中也提供了相应 Kernel 融合的优化，具体可以搜索 moe_permute 和 moe_unpermute 相关实现。</strong></p>\n<p><strong><img alt=\"\" src=\"https://picx.zhimg.com/v2-95e6a33c4a988ade52119f06e4579ddb_1440w.jpg\" /></strong><strong><img alt=\"\" src=\"https://pic1.zhimg.com/v2-8ab74c3a6dcf2a4749e21c424b367cfe_1440w.jpg\" /></strong></p>\n<p><strong>3.5 CP &amp; SP</strong><br />\n<strong>在 Transformer 模型中，自注意力机制的内存需求、计算量与序列长度成二次方关系，导致序列比较长时可能存在明显瓶颈。为此，也有一系列工作尝试解决这个问题，比如：</strong></p>\n<ul>\n<li><strong>[2105.13120] Sequence Parallelism: Long Sequence Training from System Perspective：核心是将输入序列分为不同的 Chunk，每个 Chunk 都使用独立的设备处理，而 Attention 部分采用 Ring Attention 的实现。</strong></li>\n<li><strong>[2205.05198] Reducing Activation Recomputation in Large Transformer Models：NVIDIA 在 Megatron 中也提供了相应实现，主要思路是在 TP 的基础上，将原来未切分的部分激活进一步切分，从而降低内存开销。</strong></li>\n<li><strong>[2309.14509] DeepSpeed Ulysses: System Optimizations for Enabling Training of Extreme Long Sequence Transformer Models：微软进一步解决了序列并行中通信量比较大的问题，同样是按序列切分，不过在 Attention 计算时通过 All2All 将同一个 Head 的序列汇聚在一起。这里也有个约束条件，Head 数需要是序列并行度的整数倍。</strong></li>\n<li><strong>[2310.03294] DISTFLASHATTN: Distributed Memory-efficient Attention for Long-context LLMs Training：进一步解决了长序列时 Ring-Attention 切分方式导致的负载不均衡问题。整体思路还是对调度进行重排，减少 Bubble。</strong></li>\n<li><strong>[2405.07719] USP: A Unified Sequence Parallelism Approach for Long Context Generative AI：结合了上述 Ulysses 和 Ring-Attention 的优势。</strong></li>\n</ul>\n<p><strong>在 LLM 的预训练场景中通常序列长度不会超过 8K，因此没有太大必要使用序列并行，在序列长度扩展或视频场景中比较需要，这里不再展开。</strong><br />\n<strong>四、常见优化方案</strong><br />\n<strong>4.1 FP8 训练</strong><br />\n<strong>4.1.1 概述</strong><br />\n<strong>NVIDIA GPU 从 Hopper/Ada Lovelace 开始支持 FP8 计算，其 FP8 算力通常是 FP16 算力的两倍，而常见的训练还是以 BF16 为主，利用 FP8 实现训练加速也是一个值得探索的方向。此外，NVIDIA 从 Blackwell GPU 开始也进一步支持了 MX Format，可以原生支持细粒度的 FP8 甚至 FP4 量化，为 FP8 训练，FP4 推理提供了更多可能。</strong><br />\n<strong>微软在 23 年就提出了使用 FP8 加速训练的工作（[2310.18313] FP8-LM: Training FP8 Large Language Models）。NVIDIA 也在 Transformer Engine（Using FP8 with Transformer Engine）和 Megatron-LM 中提供了相应支持。</strong><br />\n<strong>然而，LLM 预训练的代价很高，对 FP8 训练是否能真的获得和 BF16 相当的性能也不得而知，因此，早期业内一直没有真正的使用 FP8 做预训练。</strong><br />\n<strong>为了解决上述问题，零一万物在 零一万物面向万卡集群的 AI Infra 建设 中提到了一个 Trick 的方法。如下图所示，每隔一段时间就会 Load FP8 的 Checkpoint 并使用 BF16 进行训练，验证 Loss 是否和 FP8 训练的 Loss 一致（PS：Loss 对齐就真的表示下游任务也能对齐吗？）。如果出现不一致的情况，就会使用 BF16 的训练代替 FP8，并在一段时间后继续使用 FP8 训练。最终获得了 1.3x 的吞吐提升，不过并没有说明这个提升是纯粹的 FP8 相比 BF16 还是也包含了 BF16 的校验预算。</strong></p>\n<p><strong><img alt=\"\" src=\"https://picx.zhimg.com/v2-82403a34ccb7e3dd18a8b3a06c17484f_1440w.jpg\" /></strong></p>\n<p><strong>4.1.2 DeepSeek FP8</strong><br />\n<strong>DeepSeek V3 中另一个比较大的优化是 FP8 混合精度训练，也是业内首个宣称使用 FP8 进行端到端预训练并进行了大量优化的工作。在 DeepSeek V3 的训练中，大多数计算密集型操作以 FP8 执行，而少数关键操作则保留原始数据格式，以平衡训练效率与数值稳定性。整体框架如下图 Figure 6 所示，与线性算子相关的三个 GEMM 操作，包括 Forward（Fprop）、激活 Backward（Dgrad）和权重 Backward（Wgrad），接受 FP8 Tensor 作为输入，并输出 BF16 或 FP32 格式的结果，理论上使计算速度较原 BF16 方法提升一倍。此外，FP8 Wgrad GEMM 允许激活值以 FP8 存储，供 Backward 使用，从而显著降低内存消耗。</strong></p>\n<p><strong><img alt=\"\" src=\"https://pic4.zhimg.com/v2-0f1f31392db1189baead3ec0d401dee3_1440w.jpg\" /></strong></p>\n<p><strong>尽管 FP8 格式具有效率优势，但某些算子对低精度计算比较敏感，仍需更高精度。同时，一些低成本算子也可采用更高精度，对整体训练性能的影响较小。因此，对以下组件保持原始精度（如 BF16 或 FP32）：Embedding Module、输出 Head、MoE 门控模块、归一化算子及 Attention 算子。为进一步保证数值稳定性，将主权重、权重梯度和优化器状态以更高精度存储。</strong><br />\n<strong>DeepSeek V3 中还引入了一系列策略来提升 FP8 训练的准确率，包括：</strong></p>\n<ul>\n<li><strong>细粒度量化。</strong></li>\n<li><strong>提升累加精度。</strong></li>\n<li><strong>全部使用 E4M3 以获得更高精度。</strong></li>\n<li><strong>在线量化。</strong></li>\n</ul>\n<p><strong>除此之外，DeepSeek V3 还通过将缓存的激活值和优化器状态压缩为低精度格式，进一步减少内存消耗和通信开销。</strong><br />\n<strong>4.2 CUDA Graph</strong><br />\n<strong>CUDA Graph 首次出现在 CUDA 10 中，是 NVIDIA 在 CUDA 编程模型中引入的一种工作提交模型。允许将一系列 GPU 操作（如 Kernel、内存拷贝、Event 记录等）按依赖关系组织成一个 Graph，并与其执行分离开来。换言之，Graph 描述了整个任务流程的静态依赖关系，一旦定义完成，就可以多次重复执行，而无需每次都重新 Launch Kernel 和设置依赖。</strong><br />\n<strong>在传统的执行模型中，每次 Kernel Launch 都需要 CPU 配合执行一系列准备和调度操作，这对每个 Kernel 都是额外开销。当 Kernel 执行时间很短时，这些 Launch 开销可能成为整个任务的主要瓶颈（PS：这也是 Kernel Fusion 的一个好处）。CUDA Graph 通过提前定义工作流、预先实例化 Graph，将这些开销挪至 Graph 的准备阶段，大幅降低了每次执行时的 CPU 负担。一旦定义完成，就可以多次重复执行，而无需每次都重新 Launch Kernel 和设置依赖。</strong><br />\n<strong>如下图所示，Launch Graph 的时间远小于 A、B、C、D、E 这 5 个 Kernel 总的 Launch 时间。也就是在多个小 Kernel 按顺序执行的场景中，用单次 Graph Launch 替代多次小 Kernel Launch，可以显著减少 GPU 闲置等待时间，提高整体吞吐率。</strong></p>\n<p><strong><img alt=\"\" src=\"https://pic3.zhimg.com/v2-9f3846b5aaaad9e18ac803843fc192f8_1440w.jpg\" /></strong></p>\n<p><strong>实践中，当 Kernel 执行时间较短（微秒级）时，Graph 可显著减少调度开销并提升性能。此外，CUDA Graph 将完整的计算流程呈现给驱动程序，使得驱动能够针对整个流程进行优化（如更高效的线程块调度），这是逐次提交无法轻易做到的。</strong><br />\n<strong>PyTorch 和 Megatron-LM 都提供了对 CUDA Graph 的支持，在一些小规模细粒度的 MoE 模型训练中会有比较明显的帮助。</strong><br />\n<strong>4.3 细粒度 Overlap</strong><br />\n<strong>DeepSeek V3 中的通信、计算细粒度 Overlap 也是其软硬协同设计的一个重要组成部分。然而 DeepSeek 方案是针对特定硬件环境、特定模型的高度定制化，在其他场景并不一定最优；此外，随着模型、硬件的变化，分别定制化的成本比较高，因此也就衍生出一系列更通用的方案。</strong><br />\n<strong>其实在 DeepSeek V3 之前已经有一些相关工作，但是没有被广泛使用，在 DeepSeek V3 之后，字节跳动也出现了一些相关方案，值得关注。</strong><br />\n<strong>24 年北大提出过 Centauri 框架（[ASPLOS 24.04] Centauri: Enabling Efficient Scheduling for Communication-Computation Overlap in Large Model Training via Communication Partitioning），其构建了一个由三个固有抽象维度组成的切分空间：原语替换、拓扑感知组切分及工作负载切分。这些维度共同构成了一个全面的优化空间，用于高效 Overlap。为确定通信与计算的高效 Overlap，将混合并行训练中的调度任务分解为 OP、Layer 和模型三个层次。如下图 Figure 3 所示，通过通信切分和层次调度实现通信和计算的细粒度 Overlap。</strong></p>\n<p><strong><img alt=\"\" src=\"https://pica.zhimg.com/v2-7609a1498e1d6f6b4c64dc2857c14386_1440w.jpg\" /></strong></p>\n<p><strong>字节也相应提出了 Flux（[2406.06858] FLUX: Fast Software-based Communication Overlap On GPUs Through Kernel Fusion），旨在通过依赖计算隐藏 GPU 间的通信时延。Flux 将通信和计算操作分解为更细粒度的操作，并进一步融合成更大的 Kernel，从而在不损害 Kernel 效率的前提下有效隐藏通信。</strong><br />\n<strong>25 年，字节又在 Flux 的基础上提出 TileLink（[2503.20313] TileLink: Generating Efficient Compute-Communication Overlapping Kernels using Tile-Centric Primitives），旨在高效编译并生成计算-通信 Overlap 执行的 Kernel，并且聚焦于层内并行。TileLink 由前端（Frontend）和后端（Backend）构成：</strong></p>\n<ul>\n<li><strong>在前端，系统通过以 Tile 为中心的原语将通信与计算的设计空间解耦并建立关联。</strong></li>\n<li><strong>在后端，将这些原语转换为底层指令，整合通信与计算组件以实现 Overlap 执行。</strong></li>\n</ul>\n<p><strong>在 TileLink 之后，字节很快又发布了 Triton-distributed（Programming Overlapping Kernels on Distributed AI Systems with the Triton Compiler），其作为对 Triton 编译器的扩展方案，以更好的支持分布式 AI 工作负载的 Overlap 优化。其首先将符合 OpenSHMEM（NVSHMEM）标准的通信原语集成到编译器中，使得能够通过更高层次的 Python 编程模型使用这些原语。其次，还阐述了如何借助编译器实现计算、内存访问与通信的复杂联合优化，并重点介绍了如何利用 Overlap 技术隐藏时延。</strong><br />\n<strong>4.4 Attention Mask</strong><br />\n<strong>在 Attention 模块中的 Attention Mask 是实现序列中 Token 之间信息融合的关键模块，也是实现各种业务场景的关键所在。</strong></p>\n<ul>\n<li><strong>在 LLM 预训练中，由于 Attention 计算占比不高，并且基本都是 Causal Mask，因此这块相应的关注比较少，基本上用 FlashAttention 就能获得非常高的性能。</strong></li>\n<li><strong>在 LLM 后训练或者多模态等复杂场景，当序列比较长时，Attention 的占比变大，Attention 相应的优化问题也需要关注。</strong></li>\n</ul>\n<p><strong>如下图所示就是一系列常见的 Attention Mask，比如：</strong></p>\n<ul>\n<li><strong>（1）Causal：Decoder 的标准 Mask。</strong></li>\n<li><strong>（2）Sliding Window：滑动窗口 Attention 常用的 Mask。</strong></li>\n<li><strong>（3）Causal Document Mask：SFT 等后训练常用的 Sample Packing Mask。</strong></li>\n<li><strong>（9）Prefix LM Cache Mask：一些多模态场景会用的 Mask。</strong></li>\n<li><strong>（12）Random Eviction Mask：有点类似 Tree Attention Mask，在投机采样，推荐等场景比较常见。</strong></li>\n</ul>\n<p><strong><img alt=\"\" src=\"https://pic3.zhimg.com/v2-ac76cb01d28d1db21703615535263c1a_1440w.jpg\" /></strong></p>\n<p><strong>Attention 部分最经典的优化就是 FlashAttention 系列工作，包括 V1、V2、V3，随后也有其他相关优化，比如：</strong></p>\n<ul>\n<li><strong>PyTorch 官方的 FlexAttention 优化：FlexAttention: The Flexibility of PyTorch with the Performance of FlashAttention。</strong></li>\n<li><strong>百度的 FlashMask 优化：[2410.01359] FlashMask: Efficient and Rich Mask Extension of FlashAttention</strong></li>\n<li><strong>FlashInfer 的 Sparse Attention：flashinfer.sparse</strong></li>\n</ul>\n<p><strong>五、业内常见模型</strong><br />\n<strong>5.1 Meta LLaMA</strong><br />\n<strong>Meta LLaMA 3.1 405B（[2407.21783] The Llama 3 Herd of Models）是开源的最大的 Dense 模型：</strong></p>\n<ul>\n<li><strong>总参数量 405B。</strong></li>\n<li><strong>采用 GQA，比例为 128/8。</strong></li>\n<li><strong>共 126 层。</strong></li>\n<li><strong>词表 128,000。</strong></li>\n<li><strong>15T Token。</strong></li>\n</ul>\n<p><strong>如下图 Figure 5 所示为 405B 模型对应的分布式排布，其 MFU 在 38%-43% 之间（未使用 FP8）：</strong></p>\n<ul>\n<li><strong>TP 始终是 8，保持在一个节点内，充分利用 NVLink + NVSwitch。</strong></li>\n<li><strong>在 8K 序列长度时不用 CP，在 128K 时使用 16 CP。</strong></li>\n<li><strong>始终使用 16 PP。</strong></li>\n<li><strong>根据预算 GPU 数调整相应的 DP 数和 Batch Size。</strong></li>\n</ul>\n<p><strong><img alt=\"\" src=\"https://pica.zhimg.com/v2-4e267a0af736a776c9f3dba9a48d5538_1440w.jpg\" /></strong></p>\n<p><strong>主要提到的优化就是对 VPP 的一些改进，以便解决内存和计算的不均衡，比如首尾 Stage 都少一层，主动释放一些不需要的 Tensor 等：</strong></p>\n<p><strong><img alt=\"\" src=\"https://pic4.zhimg.com/v2-8c2d66468726b2262d4a32dbc7c2a0d5_1440w.jpg\" /></strong></p>\n<p><strong>5.2 DeepSeek</strong><br />\n<strong>如下图所示，今年上半年我们曾总结过 DeepSeek 相关工作中的关键技术点，这里不再赘述，详细内容可以参考：<a href=\"https://link.zhihu.com/?target=https%3A//mp.weixin.qq.com/s%3F__biz%3DMzk0ODU3MjcxNA%3D%3D%26mid%3D2247489358%26idx%3D1%26sn%3Dbda66cd5ffc40d6dd653d0bc076c7c09%26scene%3D21%23wechat_redirect\">综述：DeepSeek Infra/V1/MoE/V2/V3/R1 &amp; 开源关键技术</a>。其中 DeepSeek V3 预训练 MFU 预估在 38.2% 左右。</strong></p>\n<p><strong><img alt=\"\" src=\"https://pica.zhimg.com/v2-78561ad2afec026758201c952e4dcbee_1440w.jpg\" /></strong></p>\n<p><strong>5.3 阿里 Qwen3 MoE</strong><br />\n<strong>阿里之前也开源了其最新的 Qwen3 系列模型（[2505.09388] Qwen3 Technical Report），其中最大的模型为 Qwen3 W235A22 模型，具体配置如下：</strong></p>\n<ul>\n<li><strong>总参数量 235B，激活参数 22B。</strong></li>\n<li><strong>采用 GQA，比例为 64/4。</strong></li>\n<li><strong>128 个路由专家，每个 Token 激活 8 个专家。</strong></li>\n<li><strong>共 94 层。</strong></li>\n<li><strong>词表 151,669。</strong></li>\n<li><strong>预训练序列长度 4K。</strong></li>\n<li><strong>预训练 36T Token，119 种语言和方言。</strong></li>\n</ul>\n<p><strong>Qwen3 虽然提供了技术报告，但并没有提供使用的 GPU 资源量、MFU 以及相关的训练优化手段。</strong><br />\n<strong>5.4 腾讯 Hunyuan-TurboS</strong><br />\n<strong>我们前面提到过，腾讯的 Hunyuan-TurboS W560A56 模型（[2505.15431] Hunyuan-TurboS: Advancing Large Language Models through Mamba-Transformer Synergy and Adaptive Chain-of-Thought）采用了 Softmax Attention 与 Mamba2 混合的架构：</strong></p>\n<ul>\n<li><strong>总参数量 560B，激活参数 56B。</strong></li>\n<li><strong>采用 GQA，比例为 64/8。</strong></li>\n<li><strong>预训练 16T Token。</strong></li>\n<li><strong>1 个共享专家，32 个路由专家，每个 Token 激活 2 个路由专家。</strong></li>\n</ul>\n<p><strong>不过并没有提供预训练 Infra 优化相关部分，没有介绍使用的资源量、MFU 及相应的优化方案。</strong><br />\n<strong>5.5 小红书 dots.llm1</strong><br />\n<strong>5.5.1 模型配置</strong><br />\n<strong>小红书于 2025.06.06 发布并开源自研大模型 dots.llm1 W142A14，并提供相应技术报告（[2506.05767] dots.llm1 Technical Report）。对应的模型配置为：</strong></p>\n<ul>\n<li><strong>总参数量 142B，激活参数 14B。</strong></li>\n<li><strong>采用 MHA，32 Head。（PS：在大模型里依然采用 MHA 是比较少见的）</strong></li>\n<li><strong>第 1 层是 Dense 层。</strong></li>\n<li><strong>2 个共享专家，128 个路由专家，每个 Token 激活 6 个共享专家。</strong></li>\n<li><strong>共 62 层。</strong></li>\n<li><strong>预训练 11.2T Token。</strong></li>\n<li><strong>预训练序列长度 8K。</strong></li>\n</ul>\n<p><strong>5.5.2 预训练优化</strong><br />\n<strong>论文中针对预训练主要提了两个优化手段，在前面已经介绍过：</strong></p>\n<ul>\n<li><strong>和 NVIDIA 合作的类似 DualPipe 的 Interleaved-1F1B 优化。</strong></li>\n<li><strong>Grouped GEMM 优化。</strong></li>\n</ul>\n<p><strong>根据公式可以大概推出 DeepSeek V2 预训练的 MFU：</strong><br />\n<strong>MFU = (Token 数 * Ctoken) / (训练 GPU 小时数 * GPU FLOPs * 3600)</strong><br />\n<strong>如下图 Table 4 所示 Qwen2.5 72B MFU 大约为 35.69%，dots.llm1 W142A14 MFU 大约为 18.15%：</strong><br />\n<strong>Qwen2.5 72B：(1T*72B*6) / (340K*989T*3600) = 35.69%</strong><br />\n<strong>dots.llm1 W142A14：(1T*14B*6) / (130K*989T*3600) = 18.15%</strong></p>\n<p><strong><img alt=\"\" src=\"https://pica.zhimg.com/v2-b2245b37ddc7c963ff5fde0373ef6b1a_1440w.jpg\" /></strong></p>\n<p><strong>5.6 百度 ERNIE 4.5</strong><br />\n<strong>5.6.1 模型配置</strong><br />\n<strong>百度于 2025.06.28 也开源了自研的 ERNIE 4.5 系列模型，并提供了详细的技术报告（ERNIE 4.5 Technical Report）。其中最主要的 LLM 为 ERNIE-4.5-300B-A47B：</strong></p>\n<ul>\n<li><strong>总参数量 300B，激活参数 47B。</strong></li>\n<li><strong>采用 GQA，比例为 64/8。</strong></li>\n<li><strong>前 3 层是 Dense 层。</strong></li>\n<li><strong>64 个路由专家，每个 Token 激活 8 个专家。</strong></li>\n<li><strong>共 54 层。</strong></li>\n<li><strong>预训练序列长度 4K。</strong></li>\n</ul>\n<p><strong>5.6.2 预训练优化</strong><br />\n<strong>W300A47 LLM 预训练的分布式策略为 21DP（ZeRO-1）、8EP（Attention 8TP）、12PP，共 2016 H800 GPU，Global Batch Size 15120，GPU 之间使用 RoCE NIC，MFU 达到 47%。此外，ERNIE 也采用了一系列的优化措施。</strong><br />\n<strong>机内 EP：从上可以看出，其训练使用 8EP，可以将 EP 的 All2All 全部放在机内，进而降低跨机 All2All 的压力。</strong><br />\n<strong>All2All 内存优化：如下图 Figure 9a，传统 MoE 实现在第二次 All2All 后应用 Gating 概率乘法算子。该方法需保留第二次 All2All 的输出 Tensor 以供 Backward，造成显著内存压力。如下图 Figure 9b，作者提出将 Gating 概率乘法算子重新放于专家计算模块内部。这一架构改进使得第二次 All2All 输出 Tensor 在使用后可立即释放。尽管通过概率置换和额外轻量级 All2All 操作引入了微小开销，但该优化显著降低了峰值内存使用量，并消除了 Backward 过程中的大量重计算。</strong></p>\n<p><strong><img alt=\"\" src=\"https://picx.zhimg.com/v2-0c6495a652a2f1e8a7ecff2124d5cd89_1440w.jpg\" /></strong></p>\n<p><strong>VPP 优化：至于 PP 方案，当梯度累积比较少时，比如小于 PP-Degree 时，采用 1F1B；当梯度累积比较大时，采用 VPP（Interleaved 1F1B）。考虑到最后一个 PP Stage 还包含损失函数相关计算，也会占用较高内存，因此对其进行优化，一旦最后一个 PP Stage 的 Forward 完成，立即启动 Backward 计算并释放损失函数的激活内存，这样最后一个 PP Stage 最多只保留单个 VPP 阶段的激活内存。如下图 Figure 11 中的红框所示。</strong></p>\n<p><strong><img alt=\"\" src=\"https://pic2.zhimg.com/v2-59a5e3e69d727b68756ceff1a57ada7f_1440w.jpg\" /></strong></p>\n<p><strong>FP8 混合精度训练：采用和 DeepSeek V3 类似的量化策略，使用 E4M3 FP8 数据格式及在线量化方法，对权重实施 Block-wise 量化，对激活实施 Tile-wise 量化。如下图 Figure 12 所示为 ERNIE 4.5 的 FP8 混合精度训练策略。</strong></p>\n<ul>\n<li>\n<p><strong>FP8 训练中的细粒度内存优化：FP8 训练可以降低内存开销，因此可以降低重计算以提升吞吐。MoE 中主要激活内存消耗来自 Up-gate Linear、Down-gate Linear、Down Linear、SwiGLU 以及 Gate 概率乘法的输入激活。</strong></p>\n</li>\n<li>\n<p><strong>对于 Up-gate Linear，保留其 FP8 输入激活值 XFP8 而非 BF16 张量 XBF16 用于 Backward。在 Backward 中，需要利用转置后 XBF16 的 FP8 量化版本来计算权重梯度。因此，在权重梯度计算阶段，需要对 XFP8 执行反量化-转置-再量化操作。该策略可降低 Up-gate Linear 的内存占用，并使得第一个 All2All 操作使用 FP8 精度执行以节约通信开销。这是内存占用、通信成本与计算精度之间的权衡方案，实验表明该方法能保持与基线实现相同的收敛速率。</strong></p>\n</li>\n<li>\n<p><strong>对于 Down Linear，有两种优化方案：（1）保留 Up-gate Linear 的 BF16 输出张量；（2）利用上述 XFP8 张量重新计算 Up-gate Linear 以生成其 BF16 输出张量。这两种方法均需要对 SwiGLU 激活函数和 Gate 概率乘法算子执行轻量级重计算，从而节约这两个算子输入张量的内存占用。</strong></p>\n</li>\n<li>\n<p><strong>FP8 算子融合优化：通过算子融合降低数据移动开销并提升计算强度，具体包括：(1) Forward 中 Permutation 操作与 FP8 量化的融合；(2) Forward 与 Backward 中 SwiGLU、Gate 概率乘法及 FP8 量化的三重融合。</strong></p>\n</li>\n<li><strong>FP8 通信优化与 Overlap：Forward 阶段采用 FP8 精度执行第一个 All2All 以降低 BF16 通信成本；Backward 阶段将第二次 All2All 与 Up-gate Linear 权重梯度计算进行 Overlap。</strong></li>\n</ul>\n<p><strong><img alt=\"\" src=\"https://pic3.zhimg.com/v2-ab8f2c057c07679ca711c0bc8fb5d8c0_1440w.jpg\" /></strong></p>\n<p><strong>重计算优化：为了制定最优的重计算策略，对模型中的每个算子进行精细化分析，系统评估了内存占用与计算时间的权衡。选择性的对性价比最高的算子（能以最小运行时代价换取显著内存节省的算子）实施算子级重计算，最终设计出能最大化训练效率的最优重计算方案。Paddle 框架原生容错系统：为了实现快速识别硬件故障等异常，并做到快速恢复，设计了框架原生的容错系统。如下图 Figure 13 所示，包括以下几个关键组件：</strong></p>\n<ul>\n<li><strong>TraceHang：通过并行度信息和通信记录的协同分析，实现对 Hang 源头的自动化诊断。TraceHang 可以精准定位 Hang 的根本原因，从而加速问题解决并最大限度减少停机时间。</strong></li>\n<li><strong>Online SDC Scanner：静默数据损坏（Silent Data Corruption，SDC，这种情况 ECC、CRC 可能捕获不到）因其隐蔽性特征对模型收敛构成重大威胁。利用 PP 中的 Bubble，采用固定输入参数执行计算与通信操作，并将结果与基准真值进行实时比对验证，识别出多个存在 SDC 的节点单元。</strong></li>\n<li><strong>Parallelized Warmup：PP Warmup 阶段存在数据依赖性，因而初始化导致的性能退化被放大 P 倍（PP Stage 数量）。因此，采用了跨 PP Stage 的并行同步 Warmup 方案，将首个训练 Step 的延迟降低到 1/P。</strong></li>\n<li><strong>Zero Cost Checkpoint (ZCC)：支持在每个训练步骤保存检查点，且不会对训练吞吐量产生任何开销，从而确保训练中断时不会丢失任何进度。首先是训练中异步保存，其次是将异常节点 Checkpoint 通过 RDMA P2P 操作快速传输到健康节点，并与初始化 Overlap；如果异常节点内存不可访问，则从持久化 Checkpoint 恢复。</strong></li>\n</ul>\n<p><strong><img alt=\"\" src=\"https://pic4.zhimg.com/v2-eb9fe32a99608ee1c34941eae074da57_1440w.jpg\" /></strong></p>\n<p><strong>5.7 Kimi K2</strong><br />\n<strong>5.7.1 模型配置</strong><br />\n<strong>Kimi K2 是 Moonshot AI 在 2025.07.11 新发布的模型（Kimi K2: Open Agentic Intelligence），其采用了和 DeepSeek V3 类似的模型，也获得了很不错的效果。</strong></p>\n<p><strong><img alt=\"\" src=\"https://picx.zhimg.com/v2-50c718bb0bbf3c8546f2e67341da279d_1440w.jpg\" /></strong></p>\n<p><strong>如下图（<a href=\"https://link.zhihu.com/?target=https%3A//x.com/rasbt/status/1944056316424577525/photo/1\">https://x.com/rasbt/status/1944056316424577525/photo/1</a>）所示为 Kimi K2 与 DeepSeek V3 模型的主要区别：</strong></p>\n<p><strong><img alt=\"\" src=\"https://pic2.zhimg.com/v2-67798a37ec8dd44c500c05d6179ddbe7_1440w.jpg\" /></strong></p>\n<p><strong>除此之外还有些需要关注的地方：</strong></p>\n<ul>\n<li><strong>Kimi K2 采用了自研的 MuonClip Optimizer。</strong></li>\n<li><strong>DeepSeek V3 增加了 Expert 分组以便降低通信开销，同时强制负载均衡；Kimi K2 中去除了这一个限制，以便增加更多的专家组合空间。</strong></li>\n<li><strong>Kimi K2 参数量更大，但是激活更少，主要是因为 MoE 部分共享专家增多，但是激活专家并没有增加；同时 Attention Head 减半，因此总的激活参数反而降低。</strong></li>\n</ul>\n<p><strong>2025.07.22 Moonshot 发布了 Kimi K2 的技术报告（<a href=\"https://link.zhihu.com/?target=https%3A//github.com/MoonshotAI/Kimi-K2/blob/main/tech_report.pdf\">https://github.com/MoonshotAI/Kimi-K2/blob/main/tech_report.pdf</a>），模型配置与上述一致：</strong></p>\n<p><strong><img alt=\"\" src=\"https://picx.zhimg.com/v2-8256ec34b11aa32a401b81b55af3062f_1440w.jpg\" /></strong></p>\n<p><strong>5.7.2 预训练优化</strong><br />\n<strong>Kimi K2 在 H800 GPU 集群训练，每个节点包含 8 个 H800 GPU，2T 内存，采用 NVLink + NVSwitch 高速互联，并且包含 8 个 400 Gbps 的 RoCE 网卡。不过没有提供 MFU 相关信息。</strong><br />\n<strong>采用动态资源训练，并保证资源数量是 32 个节点（256 H800）的整数倍，其 ZeRO-1 DP + 16PP + 16EP 的策略，训练时直接扩展 DP 组即可。训练时以 BF16 格式存储模型参数，并采用 FP32 梯度累加，约需要 6TB 显存，分散在 256 个 GPU 的模型并行组中。而对于优化器状态，节点较多时分散在所有节点，节点较少时，则 Offload 到 CPU 内存。</strong><br />\n<strong>通信和计算 Overlap：通过增加 Warmup Micro Batch 数量，实现 EP 中 All2All 与 Interleaved 1F1B 的计算 Overlap。不过 Interleaved 1F1B 把 PP 切的更碎，会引入更多的通信开销，为了降低这一成本，同样解耦了权重梯度重计算，使其能与 PP 并行通信 Overlap。</strong></p>\n<p><strong><img alt=\"\" src=\"https://pic3.zhimg.com/v2-309275dea08fa7e382fde4077aa1d378_1440w.jpg\" /></strong></p>\n<p><strong>最小化 EP 并行：由于 Attention Head 减半，Attention 计算时间变少，为了更好的实现计算和通信的 Overlap，需要最小化 EP 耗时，因此采用了 16EP 的最小化 EP 并行策略，这也放宽了负载均衡约束。细粒度重计算：对 LayerNorm、SwiGLU 和 MLA Up-proj、MoE Down-proj，已最小化计算开销并最大化显存节约。</strong><br />\n<strong>FP8 存储激活：对于 MoE Up-proj 和 SwiGLU 等不敏感激活采用 FP8-E4M3 存储（ 1 x 128 Tile 的 FP32 Scale）。潜在性能下降风险，未采用 FP8 计算。</strong><br />\n<strong>激活 Offload：如上图 Figure 7 所示，采用了激活 Offload 的机制。</strong></p>\n<p>微信视频号：sph0RgSyDYV47z6</p>\n<p>快手号：4874645212</p>\n<p>抖音号：dy0so323fq2w</p>\n<p>小红书号：95619019828</p>\n<p>参考文献链接</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//mp.weixin.qq.com/s/H9deyKONuDJEUn5VVgkC1Q\">2 万字总结：全面梳理大模型预训练相关技术</a></p>\n<p><strong>六、参考链接</strong></p>\n<ol>\n<li><strong>MQA：[2003.04641] MQA: Answering the Question via Robotic Manipulation</strong></li>\n<li><strong>GQA：[2305.13245] GQA: Training Generalized Multi-Query Transformer Models from Multi-Head Checkpoints</strong></li>\n<li><strong>FlashMLA：FlashMLA: Efficient MLA decoding kernels</strong></li>\n<li><strong>MHA to GQA：[2412.20677] Align Attention Heads Before Merging Them: An Effective Way for Converting MHA to GQA</strong></li>\n<li><strong>GQA to MLA：[2502.14837] Towards Economical Inference: Enabling DeepSeek's Multi-Head Latent Attention in Any Transformer-based LLMs</strong></li>\n<li><strong>TransMLA：[2502.07864] TransMLA: Multi-Head Latent Attention Is All You Need</strong></li>\n<li><strong>RWKV-7：[2503.14456] RWKV-7 \"Goose\" with Expressive Dynamic State Evolution</strong></li>\n<li><strong>MiniMax-01：[2501.08313] MiniMax-01: Scaling Foundation Models with Lightning Attention</strong></li>\n<li><strong>Hunyuan-TurboS：[2505.15431] Hunyuan-TurboS: Advancing Large Language Models through Mamba-Transformer Synergy and Adaptive Chain-of-Thought</strong></li>\n<li><strong>Mamba-2-Hybrid 8B：[2406.07887] An Empirical Study of Mamba-based Language Models</strong></li>\n<li><strong>Mistral 7B：[2310.06825] Mistral 7B</strong></li>\n<li><strong>MOBA：[2502.13189] MoBA: Mixture of Block Attention for Long-Context LLMs</strong></li>\n<li><strong>NSA：Hardware-Aligned and Natively Trainable Sparse Attention</strong></li>\n<li><strong>Mixtral 8x7B：[2401.04088] Mixtral of Experts</strong></li>\n<li><strong>Skywork-MoE：[2406.06563] Skywork-MoE: A Deep Dive into Training Techniques for Mixture-of-Experts Language Models</strong></li>\n<li><strong>Switch Transformer：[2101.03961] Switch Transformers: Scaling to Trillion Parameter Models with Simple and Efficient Sparsity</strong></li>\n<li><strong>GlaM：[2112.06905] GLaM: Efficient Scaling of Language Models with Mixture-of-Experts</strong></li>\n<li><strong>ST-MoE：[2202.08906] ST-MoE: Designing Stable and Transferable Sparse Expert Models</strong></li>\n<li><strong>DeepSeek MoE：[2401.06066] DeepSeekMoE: Towards Ultimate Expert Specialization in Mixture-of-Experts Language Models</strong></li>\n<li><strong>DeepSeek V2：[2405.04434] DeepSeek-V2: A Strong, Economical, and Efficient Mixture-of-Experts Language Model</strong></li>\n<li><strong>DeepSeek V3：[2412.19437] DeepSeek-V3 Technical Report</strong></li>\n<li><strong>ZeRO：[1910.02054] ZeRO: Memory Optimizations Toward Training Trillion Parameter Models</strong></li>\n<li><strong>FSDP1：[2304.11277] PyTorch FSDP: Experiences on Scaling Fully Sharded Data Parallel</strong></li>\n<li><strong>FSDP2：[2411.00284] SimpleFSDP: Simpler Fully Sharded Data Parallel with torch.compile</strong></li>\n<li><strong>Megatron-LM：[1909.08053] Megatron-LM: Training Multi-Billion Parameter Language Models Using Model Parallelism</strong></li>\n<li><strong>PipeDream：[1806.03377] PipeDream: Fast and Efficient Pipeline Parallel DNN Training</strong></li>\n<li><strong>Interleaved 1F1B：[2104.04473] Efficient Large-Scale Language Model Training on GPU Clusters Using Megatron-LM</strong></li>\n<li><strong>ZeRO Bubble：[2401.10241] Zero Bubble Pipeline Parallelism</strong></li>\n<li><strong>GLM 130B：[2210.02414] GLM-130B: An Open Bilingual Pre-trained Model</strong></li>\n<li><strong>LLaMA 3：[2407.21783] The Llama 3 Herd of Models</strong></li>\n<li><strong>Pangu Ultra MoE：[2505.04519] Pangu Ultra MoE: How to Train Your Big MoE on Ascend NPUs</strong></li>\n<li><strong>DeepEP：GitHub - deepseek-ai/DeepEP: DeepEP: an efficient expert-parallel communication library</strong></li>\n<li><strong>DeepGEMM：DeepGEMM: clean and efficient FP8 GEMM kernels with fine-grained scaling</strong></li>\n<li><strong>Pangu Pro MoE：[2505.21411] Pangu Pro MoE: Mixture of Grouped Experts for Efficient Sparsity</strong></li>\n<li><strong>小红书 dots.llm1：[2506.05767] dots.llm1 Technical Report</strong></li>\n<li><strong>DeepSpeed Ulysses：[2309.14509] DeepSpeed Ulysses: System Optimizations for Enabling Training of Extreme Long Sequence Transformer Models</strong></li>\n<li><strong>DistAttention：[2310.03294] DISTFLASHATTN: Distributed Memory-efficient Attention for Long-context LLMs Training</strong></li>\n<li><strong>USP：[2405.07719] USP: A Unified Sequence Parallelism Approach for Long Context Generative AI</strong></li>\n<li><strong>FP8-LM：[2310.18313] FP8-LM: Training FP8 Large Language Models</strong></li>\n<li><strong>Centauri：Centauri: Enabling Efficient Scheduling for Communication-Computation Overlap in Large Model Training via Communication Partitioning</strong></li>\n<li><strong>FLUX：[2406.06858] FLUX: Fast Software-based Communication Overlap On GPUs Through Kernel Fusion</strong></li>\n<li><strong>TileLink：[2503.20313] TileLink: Generating Efficient Compute-Communication Overlapping Kernels using Tile-Centric Primitives</strong></li>\n<li><strong>Triton-Distributed：Programming Overlapping Kernels on Distributed AI Systems with the Triton Compiler</strong></li>\n<li><strong>FlexAttention：<a href=\"https://link.zhihu.com/?target=https%3A//pytorch.org/blog/flexattention/\">https://pytorch.org/blog/flexattention/</a></strong></li>\n<li><strong>FlashMask：[2410.01359] FlashMask: Efficient and Rich Mask Extension of FlashAttention</strong></li>\n<li><strong>Qwen3：[2505.09388] Qwen3 Technical Report</strong></li>\n<li><strong>ERNIE 4.5：ERNIE 4.5 Technical Report</strong></li>\n<li><strong>Kimi K2：Kimi K2: Open Agentic Intelligence</strong></li>\n</ol>"
    }
  ],
  "latest_overview": [
    {
      "title": "",
      "body_html": "<h1>LLM预训练数据工程的最佳实践</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2032080549381190858\">https://zhuanlan.zhihu.com/p/2032080549381190858</a></li>\n<li>作者: 李煜东 Yudong</li>\n</ul>\n<hr />\n<p>LLM预训练数据工程的最佳实践</p>\n<h1>LLM预训练数据工程的最佳实践</h1>\n<p>作者: 李煜东 Yudong, 赞: 110</p>\n<p><strong>写在前面：</strong></p>\n<p>LLM 研究的关注重心正在这几年内不断转移，从post train到强化学习再到agentic / harness工作流。这些都体现了技术前沿和社区焦点的演进。对于用户而言，基座模型与LLM使用之间的链路变得越来越长，预训练似乎已不再是最受关注的 LLM 研究话题。但是我们认为，预训练仍然值得研究，不仅因为它是模型能力形成的基础，一些关键问题也尚未回答，例如数据如何驱动智能，知识如何从大规模语料中涌现。这也是一项需要耐心、经验以及对数据具有 taste 的长期工作。</p>\n<p>同时，我们发现近年来技术报告对数据工程细节的披露日益减少，模型预训练是一个重实践经验的方向，要判断哪些做法真正有效，研究的开放性至关重要。大模型研究需要集体智慧，也需要来自真实训练的经验共享，才能推动社区形成更可靠的判断。</p>\n<p>这也是我们撰写这篇综述的动机，我们从有限披露的信息和可交叉验证的证据中整理线索，尽可能复原工业级 LLM 预训练数据工程的关键实践。我们希望这篇综述能够为感兴趣的研究者提供进入该领域的清晰路径，也为本领域的研究者提供关于数据构建、工程取舍与未来研究方向的有价值参考。</p>\n<p>本文对原文进行了精简，详细引用和高清图片请参考原文：</p>\n<p><a href=\"https://link.zhihu.com/?target=https%3A//github.com/ydli-ai/ydli-ai.github.io/blob/main/assets/papers/LLM_pretrain_data_survey_zh.pdf\">LLM预训练数据工程综述</a><img alt=\"\" src=\"https://pic2.zhimg.com/v2-f8398e3d9e0829e9e4ee438c18377029_1440w.jpg\" /></p>\n<p>大模型数据工程的技术演进</p>\n<h2>1. 引言</h2>\n<p>预训练语料的规模在数年内增长了近四个数量级。2020 年 GPT-3 使用约 300B token，至 2024 年 DeepSeek~V3 提升至 14.8T token，LLaMA~3 使用 15.6T token。2025 年的 Qwen~3和 2026 年发布的 GLM-5 、DeepSeek~V4 进一步攀升至 30–40T token 量级。  </p>\n<p>然而，这一路线正遭遇数据供给瓶颈。当前主流预训练数据集仍高度依赖以 CommonCrawl 为代表的开放网页资源，而其中的高质量内容增量已经放缓，重复与噪声占比持续上升。Villalobos（2024） 估算了人类产生高质量文本的总量与大模型消耗速率，预测高质量文本将在 2026 至 2032 年间耗尽。在数据增量趋缓的条件下持续提升知识获取效率，已成为预训练研究的关键问题。</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-806c90861ef1bcceb996ca4cc92bcae5_1440w.jpg\" /></p>\n<p>互联网文本有效存量与预训练语言模型数据用量趋势</p>\n<p>面对这一供需矛盾，预训练数据工程，即对训练语料的获取、清洗、筛选、配比与调度，正成为决定模型能力的核心变量。RefinedWeb 证明经过去重和过滤的纯网页数据可以超越多源精选语料。FineWeb-Edu 和 DCLM 进一步通过更优的过滤策略，在相同计算预算下将模型性能提升至数倍等效数据量的水平。在架构与算力相近的前提下，数据处理质量已成为区分前沿模型的关键因素。  </p>\n<p>更重要的是，数据问题并不只是供给不足，也在于已有语料尚未被充分转化为模型能力。人类个体一生中接触的文本量远少于当前 LLM 所消耗的数据规模，却能发展出健全的概念体系与推理能力。这一反差表明，现有预训练范式仍有大量信息利用提升空间。<strong>预训练研究的重心因此正从单纯扩大数据规模，转向更高效地利用数据。</strong></p>\n<p>本文聚焦于预训练阶段的数据方法如何影响模型数据效率，并以经大规模训练验证的共识与最佳实践为组织主线。我们以前沿模型的公开技术报告（涵盖 2020 至 2026 年发布的 GPT、LLaMA、Qwen、DeepSeek、Kimi、GLM、OLMo、Phi 等系列）为一手证据，提炼数据工程的通用流程，比较各阶段的方法选择，并标注具有潜力但尚未被规模化验证的新方向。<strong>本文目标是追踪技术共识的演变脉络，并提供一份持续更新的大模型数据工程最佳实践指南。</strong></p>\n<h2>2. 预训练数据工程技术趋势</h2>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-826f51687058d9d56f77383fde5f6610_1440w.jpg\" /></p>\n<p>代表性模型的预训练数据实践</p>\n<h3>2.1 数据规模持续增长</h3>\n<blockquote>\n<p>语料规模仍在扩张，但多个独立证据表明，数据处理和课程设计带来的收益已可与规模扩张相当。数据效率正从辅助指标上升为预训练的核心优化目标。</p>\n</blockquote>\n<p>Scaling law 之后，前沿模型的训练数据量持续增长，远超计算最优比例。与此同时，RefinedWeb、FineWeb-Edu 和 DCLM 的实验表明，在相同计算预算下更优的过滤流程可带来数倍等效数据量的性能提升。现有的数据筛选工作大多以逼近既有模型能力为目标，在需要突破已有能力上限的场景下，高效小数据集能否持续优于大规模语料，尚缺乏验证。<strong>规模和效率并非替代关系，而是共同决定模型能力的两个维度。</strong></p>\n<h3>2.2 合成数据已被多数前沿模型采纳</h3>\n<blockquote>\n<p>用天然数据控制分布，合成数据提升质量或补强特定领域。Qwen~3、Phi-4、Kimi~K2 是典型代表，DeepSeek~V3 是唯一明确排除合成预训练数据的主流模型。</p>\n</blockquote>\n<p>2023 年 Phi-1 率先在预训练中使用合成数据，至 2025 年多数前沿模型已采用合成数据。在生成方式上各团队选择差异显著，包括重新生成教科书式内容、对已有文本进行风格重述、使用专用模型合成领域数据。合成数据在迭代训练中引发分布收窄和模型坍缩的风险已被理论证明，但尚未在超大规模预训练中被实证评估。</p>\n<h3>2.3 预训练已细分为多阶段训练</h3>\n<blockquote>\n<p>预训练阶段的数据调度正在不断细化，由单阶段固定配比，演变为包含 mid-training、退火等多个阶段的课程结构，逐步向为后训练的准备靠拢。但如何确定阶段边界、领域配比和切换时机，目前没有统一公认方案。</p>\n</blockquote>\n<p>从 LLaMA 1 的固定数据比例，到 LLaMA 3 引入 scaling law 引导的配比搜索与退火阶段，再到 Qwen 3 的三阶段训练，预训练数据投喂从静态配置演变为课程设计。多阶段训练也在 DeepSeek V3/4、Kimi K2 和 GLM-5 中出现。学术界提出了更精细的领域配比优化方法 （DoReMi,RegMix,DataMixingLaws），但在小规模实验与大规模训练之间的可迁移性尚未验证。公开的工业实践仍采用三到四个粗粒度阶段，而非更细的动态调度。</p>\n<h3>2.4 数据工程的披露正在减少</h3>\n<blockquote>\n<p>开放权重意味着模型架构和参数不可避免地公开，而训练数据的来源、分布和处理细节仍可保留。数据工程因此成为不同模型之间性能差异的核心来源，也是披露最少的环节。</p>\n</blockquote>\n<p>一个明显趋势是，随着模型能力增强和商业价值提高，技术报告中关于预训练数据的披露细节在持续减少。早期报告（如 LLaMA 1、Qwen 1）公开了数据来源比例与具体处理方法。最近的报告在数据细节上的披露大幅减少，Qwen 3 对去重只字未提，LLaMA 4 甚至未发布技术报告。Kimi K2 提供了一种折中方案，详细披露合成数据管线的方法论，但对数据源与分布保持模糊。Mistral 系列处于另一端，Mistral 7B 、Mixtral 8x7B 以及后续模型几乎不披露任何预训练数据细节。逆流之中，OLMo 系列和 Nemotron-CC 仍坚持完全开放数据、代码和处理流程，为可复现研究提供参照。<strong>透明度的下降说明数据工程已成为预训练的核心竞争环节，这也决定了本综述的调研方式。本文不依赖单篇报告的描述，而是从大量部分披露的证据中交叉验证，提炼重复出现的做法与存在的差异。</strong></p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-193159e4b70bdf7b88af3ce4d311ad79_1440w.jpg\" /></p>\n<p>预训练数据流程总览与本文的组织结构</p>\n<h2><strong>3. 语料库构建</strong></h2>\n<p>本章涵盖预训练语料库的构建过程。我们首先综述可用的数据来源与开放语料库项目，随后讨论三个核心处理步骤，包括去重、质量过滤、和合成数据增强。</p>\n<h3>3.1 预训练数据源和公开语料集</h3>\n<p>在 BERT 时期（2019–2022 年），预训练数据集的标准做法是混合多种精选来源。The Pile 汇聚了 22 个英文数据源共约 800GB，CLUECorpus2020汇总了 100GB 中文语料，C4 则是最早被广泛使用的 CommonCrawl 过滤流程。这种多源混合策略在数据需求为数百 GB 到数 TB 时是可行的，但难以支撑后续训练规模的增长。CommonCrawl 每月发布一次网络爬取快照，完整存档跨越十余年，包含数千亿个页面，是目前唯一提供 T token 量级原始文本的公开数据源。原始网络爬取数据噪声极大，含有大量 HTML 样板代码、广告、近重复页面和机器生成文本，需经多阶段处理才能用于训练。RefinedWeb 首次证明仅经过去重和过滤的 CommonCrawl 即可超越多源混合语料。此后 FineWeb、DCLM 、Dolma 和 Nemotron-CC 进一步验证了这一路线。如今前沿模型均以处理后的网络爬取数据作为主要来源。  </p>\n<p>除网页外，代码仓库（GitHub、StackOverflow）、科学文献（arXiv、PubMed）、书籍和百科（Wikipedia）等领域来源也被广泛使用。这些内容在 CommonCrawl 中虽有覆盖，但领域来源受益于同行评审与编辑审核，提供更干净且更结构化的数据。领域数据仅占训练 token 总量的一小部分，却显著影响数学推理与代码生成等能力。从原始领域数据源构建可用语料涉及爬取、清洗、去重、过滤等完整流程，工程成本高。为降低复现门槛，社区开发了一系列开放语料库，将原始数据转化为可直接使用的训练语料。</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-f61a1e2e423419d0342817aa26e10a95_1440w.jpg\" /></p>\n<p>主要开放预训练语料库</p>\n<p>互联网爬取并不是高质量内容的唯一入口。教科书、学术论文与纸质书等信息密度较高的文本主要以 PDF 或扫描图像形式存在，传统 OCR 在公式、表格、多栏排版与历史版面上的失误率使其难以直接产出可训练 token。Nougat用端到端 transformer 识别学术 PDF 中的公式与文档结构。MinerU 同时覆盖电子 PDF 与扫描件，支持多语言与多布局。olmOCR 用一个微调过的 7B VLM 作 page-level 转写，将版面理解与字符识别合并为单一过程，对纸质书与档案资料的恢复质量明显高于 Tesseract 等传统 OCR 流水线。OLMo~3 用 olmOCR 抽取学术与书籍内容并在 mid-training 阶段补充合成 QA，Nemotron 与 Qwen 团队也在技术报告中提及自建 PDF 与扫描解析栈但未公布细节。这一类数据补充了网页中稀缺的长文本数据源。</p>\n<h3>3.2 去重</h3>\n<p>去重从训练语料库中移除冗余内容，是所有前沿模型一致采用的预处理步骤。网络爬取中的重复有两个主要来源。一是跨页面冗余，即不同 URL 托管相同或近似的内容。二是时序冗余，即同一页面在每月快照中被重复爬取。这两类冗余高度集中，少数页面被重复数千次，而大多数页面仅出现一次。重复数据会降低训练效率：Hernandez（2022） 发现仅将 0.1% 的数据重复 100 次，就会使一个 8 亿参数模型的有效容量降至 4 亿参数模型的水平，浪费约一半的训练计算量。不过，在高质量新数据受限时，重复仍有价值。Muennighoff（2023） 发现重复训练少量 epoch 可以继续提升性能，但收益会很快下降。Carlini（2023）进一步表明，模型逐字复现某训练序列的概率与该序列出现次数呈对数线性增长，因此高频重复还会放大记忆和隐私风险。  </p>\n<p>去重方法分为精确匹配和模糊匹配两类，实践中通常叠加使用。精确去重通过文档级哈希（如 SHA-256）或 URL 比对移除内容完全相同的文档。OLMo 1通过 Dolma 流程使用 Bloom filter 实现概率性精确去重，以较低的内存成本处理大规模语料。模糊去重针对仅有细微编辑差异的近重复文档，基于局部敏感哈希（LSH）的 MinHash 是最主流的算法，被 LLaMA、Qwen、DeepSeek、InternLM 等前沿模型采用。MinHash/LSH 的核心优势在于内存占用呈亚线性增长，能够在万亿 token 规模的语料库上保持可行性。  </p>\n<p>所有模型都采用文档级去重，但在更细粒度上存在差异。LLaMA 3 在三个层级执行去重：URL 级、文档级 MinHash 和行级，从完全重复的页面到导航菜单等样板片段均有覆盖。DeepSeek V2 跨不同时期的 CommonCrawl 快照应用 MinHash（跨快照去重），专门消除重复爬取同一页面产生的时序冗余，DeepSeek V3 和 V4 沿用了相同做法。InternLM 2 针对代码增加了领域特定去重，使用仓库级拓扑排序保持文件依赖关系，并公开了具体的 MinHash 超参数（128 个哈希函数、5-gram、Jaccard 阈值 0.7）作为参考配置。  </p>\n<p>去重的一个潜在风险是过度移除。在大量独立撰写的文档中频繁出现的知识（如常见事实和惯用表达）也可能被模糊匹配捕获，导致对常见话题的自然覆盖被误删。更深层的问题在于，知识在网络中出现的频率本身可能携带信号，高频内容往往是基础性的、被广泛引用的事实，去重在消除冗余的同时也抹去了这种隐含的重要性权重。目前缺乏将爬取冗余与知识频率信号加以区分的方法，核心困难在于没有 ground truth 也没有公认的标注标准。在实践中，去重的激进程度仍依赖经验调参，此外往往不可避免地重复使用高质量数据来提升性能。这说明适度重复高质量数据的收益仍大于其风险，也凸显了高质量数据在预训练中的稀缺性。</p>\n<h3>3.3 质量过滤</h3>\n<p>质量过滤从训练语料库中移除低质量文档。现有流程通常叠加两类方法，启发式规则负责粗粒度移除，分类器负责精细选择。  </p>\n<p>规则是最基础的过滤手段。Gopher 规则 对文档长度、词数比例和符号密度设定阈值，被大多数开放语料库和模型作为最低过滤基线。部分流程还加入 perplexity 过滤，用在高质量参考文本上训练的语言模型对文档打分，移除统计异常值。Yi 和 Falcon 都采用了基于 perplexity 的过滤。  </p>\n<p>分类器过滤的基本思路是训练一个轻量分类器区分高质量正样本与随机网络文本，再将其应用于整个语料库。各方法的核心差异在于如何定义正样本。GPT-3 以 Reddit 链接页面作为正样本训练 fastText 分类器。LLaMA~1 \\citep{llama1} 通过 CCNet 流程以 Wikipedia 作为正样本参考。LLaMA~3 改用 LLaMA~2 生成的质量标签训练 DistilRoBERTa 分类器。DCLM \\citep{li2024dclm} 在 OpenHermes 指令数据上训练 fastText 分类器，7B 模型在 DCLM 过滤数据上达到 MMLU 64\\%，相比 LLaMA~3 节省约 6× 计算量。  </p>\n<p>FineWeb-Edu \\citep{fineweb} 引入两阶段方法，先用 Llama-3-70B-Instruct 对 50 万个样本标注教育质量分数，再将标签蒸馏为 BERT 分类器用于规模化部署。这种``强 LLM 标注、轻量分类器部署''的模式已被 Nemotron-CC 与 Qwen~3 沿用。Nemotron-CC \\citep{su2024nemotron} 集成 Mixtral、Nemotron-340B 与 fastText 三个分类器，效果优于任一单一分类器。Qwen~3 进一步将标量质量打分扩展为多维标注，对超过 30T token 沿教育价值、领域等维度标注，再用这些细粒度标签在实例级优化数据混合。分类器方法的共同优势在于推理成本低，fastText 或 BERT 分类器一旦训练完成，处理数十亿文档的成本相比生成训练标签的 LLM 几乎可以忽略。  </p>\n<p>现有质量过滤方法存在一个根本局限，即「质量」的定义本身依赖于风格。以 Wikipedia 风格文本训练的分类器偏好百科式写作，以教育内容训练的分类器偏好教科书式表述，两者都会移除其他非正式但信息密度高的文本。DeepSeek 在实践中发现 V1 过于激进的过滤降低了知识密集型任务的性能，在 V2 中放宽了阈值。Yi 以严格标准精选 3T token 而非宽松过滤 10T token，但这种选择性本身反映了特定的质量判断，并非适用于所有任务。</p>\n<h3>3.4 合成数据增强</h3>\n<p>合成数据由现有 LLM 生成，用于在自然高质量文本不足时扩充训练池。前沿模型在合成数据的使用程度上差异显著。DeepSeek V3 的预训练语料库不含合成数据，完全依赖网页与电子书。Phi-4 处于另一极端，合成数据占其预训练数据的 40 %。多数模型介于两者之间。  </p>\n<p>Phi 系列是最早将合成数据大规模用于预训练的工作。2023 年 Phi-1 使用 GPT-3.5 生成教科书风格数据，此后 Phi 系列以合成数据为核心特征，Phi-4 使用超过 50 类合成数据集共约 400B token。Phi 方案在 140 亿参数以上的有效性尚缺乏验证。其他模型将合成数据的主流用途转向数学与代码等领域。Qwen~2.5 用专项模型（Qwen2.5-Math、Qwen2.5-Coder）生成合成数学与代码数据。Qwen 3 将做法扩展至数十个领域，用上一代模型以教科书、问答对与代码片段等格式合成数T token。这种 「每一代为下一代生成合成数据」 的迭代模式也被 InternLM 采用。OLMo 3 遵循类似路径，用 olmOCR 从学术 PDF 中提取文本，并为 mid-training 阶段生成合成问答对。  </p>\n<p>除生成全新内容外，另一类做法是将已有文本改写为更利于训练的形式。Kimi K2 以多种风格和视角改写源文档，将数学内容转换为学习笔记格式，并通过跨语言翻译增加多样性，每个源文档最多改写两次以限制冗余。Kimi K2 在 SimpleQA 上验证了改写优于在原始文本上重复训练。Nemotron-CC 在更大规模上应用改写，从 CommonCrawl 生成 1.9T token，并对不同质量层级采用不同策略，低质量文档改写为 Wikipedia 风格以降噪，高质量文档转化为问答对、摘要与知识列表以生成新的独特 token。这些改写方法的共同特点是 LLM 仅用作风格转换而非知识来源，从而避免引入生成模型自身的分布偏差。  </p>\n<p>合成数据的有效性取决于与自然数据的混合比例。 Kang （2025） 训练了超过 1000 个 LLM，发现纯合成数据并不优于 CommonCrawl，而三分之一合成、三分之二自然数据的混合可将训练效率提升 5–10 倍。一个相关风险是模型坍缩，即在模型生成数据上迭代训练会导致不可逆的分布多样性损失。即便是 Phi-4 和 Qwen 3 也始终将合成数据作为自然文本的补充而非替代。</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-a9f4d37a98f91d9f72133047085908ef_1440w.jpg\" /></p>\n<p>预训练数据工程中的Model-in-the-loop</p>\n<h2>4. 数据利用</h2>\n<h3>4.1 数据选择与配比</h3>\n<p>早期模型采用人工设定的静态配比，通常基于数据源规模或经验判断。LLaMA 1 公布了具体的域配比方案（CommonCrawl 67 %、C4 15 %、GitHub 4.5 % 等），是后续模型的常见参考。BLOOM 、Falcon 和 PaLM 同样采用基于经验的固定配比。PaLM 2 在此基础上提高了多语言与代码数据的比例，并按数据质量分层加权采样，是较早将非英文和领域数据明确写入混合配方的模型。OLMo 1 直接使用 Dolma 数据集的默认比例，未做配比搜索。这种方法实现简单且结果可复现，但配比之间的性能差异只能通过代价高昂的全规模训练验证。  </p>\n<p>固定配比的局限催生了利用 scaling law 在小规模上预测最优配比的方法论。核心思路是在小模型上系统尝试多组配比，拟合配比与性能之间的定量关系，再将预测的最优配比应用到大规模训练中。LLaMA 3 报告了使用 scaling law 实验指导配比迭代优化的流程，并在训练过程中根据模型能力的变化动态调整各域权重。Qwen 2.5、Qwen~3 和 DeepSeek V3 都报告使用类似策略。  </p>\n<p>学术界对此方向提出了多个方案。DoReMi 用一个小型 proxy 模型配合 Group DRO 优化各域权重，在不增加数据量的情况下提升下游性能。Data Mixing Laws 将配比与 loss 之间的关系建模为解析函数，通过拟合少量实验点预测最优配比，声称可节省约 48 % 的训练步数。RegMix 将配比优化转化为回归问题，仅需 DoReMi 约 10 % 的计算量即可获得相当的配比质量。BiMix 提出双变量混合定律，同时建模配比与训练 token 数量对 loss 的联合影响，在给定计算预算下预测最优的配比与数据量组合。UtiliMax 将配比优化类比为投资组合优化（Markowitz 模型），利用 LLM 估计各领域数据效用，结合数据集规模约束求解最优分配。  </p>\n<p>上述方法依赖一个前提假设，即小规模实验得出的最优配比可以迁移到大规模训练。DataDecide 在三万多个 checkpoint 上的实验表明，150M 模型的相对排名在约 80 % 的情况下可迁移到更大规模，为这一假设提供了积极证据。AutoScale 反向发现小规模最优配比在迁移到大规模时可能失效。BETR进一步揭示最优的过滤严格度随模型规模变化。这些发现对依赖小规模实验做决策的通行做法提出警示，但目前尚无替代方案，因为全规模消融实验的计算成本难以承受。</p>\n<h3>4.2 多阶段训练</h3>\n<p>预训练通过在不同阶段切换数据配比来分化训练目标，2024 年之后发布的前沿模型几乎都采用这一结构。基本逻辑是先用大规模通用数据建立基础语言能力，后续阶段用更精选的数据补强特定能力。Qwen 3 采用三阶段方案。S1 阶段使用约 30T token 覆盖 119 种语言与方言的通用世界知识。S2 阶段消耗约 5T token，主要包括科学、代码、推理与合成数据，目标是提升推理能力。S3 阶段使用数百M token 的高质量长上下文数据将序列长度进一步扩展。GLM-5 与 DeepSeek V3 报告了类似的多阶段切换。LLaMA 3 在跨阶段过渡时同步调整 batch size 与学习率。  </p>\n<p>近期实践中，配比切换的中间阶段进一步独立为 mid-training，位于通用预训练与后训练之间。OLMo 2 与 OLMo 3 在通用预训练完成后单独划出 mid-training 阶段，向其中注入高质量数学、代码与问答数据来补强推理能力。InternLM 2.5 同样使用专门的 mid-training 阶段强化领域能力。Qwen~3 的 S2 阶段在性质上也属于这一范畴。  </p>\n<p>多阶段训练的最后通常包含一个退火（annealing）阶段，在训练末期降低学习率的同时将数据分布切换为高质量子集。LLaMA~3 报告退火阶段使 8B 模型在 GSM8K 上提升 24 个百分点，是单阶段最大的性能跳跃之一。OLMo 3、Phi-4 和 Kimi K2 都在训练末期采用退火。MiniCPM 提出 WSD（Warmup-Stable-Decay）学习率调度，将退火从经验做法提升为可复用的训练范式，并在小规模模型上验证。Kairong 2025 发现学习率与数据质量存在交互效应，高质量数据在学习率较低时对参数的影响更持久，这为退火阶段切换高质量数据提供了一个解释。GLM-4.5 反向指出 WSD 调度可能导致性能衰减，说明这一范式尚未达到普适。退火与 mid-training 的差异在于退火伴随学习率衰减，而 mid-training 通常在恒定或周期性学习率下持续数百B 至 1T token，目标更接近于补充能力而非为切换到后训练做准备。多阶段训练的出现说明预训练正在分化为更多具有独立目标和评估方法的精细过程，也意味着预训练与后训练之间的边界正在变得模糊。  </p>\n<p>当前的多阶段训练在形式上与课程学习相似，两者都在训练过程中改变数据分布。课程学习的经典假设是按难度有序呈现数据可以提升学习效率，Zhang2025curriculum 的实验表明课程策略可减少 18–45 % 的训练步数。前沿模型的多阶段训练则主要按领域和目标能力划分阶段，并不遵循由易到难的顺序。例如 S2 中常见的代码和推理数据并不只是因为「更难」，而是因为它们更接近下游任务 benchmark 与应用，目标是塑造模型的下游能力，而不只是提升预训练效率。因此，严格意义上的课程学习策略尚未被前沿模型采纳，主要原因在于训练样本难度缺乏可跨任务、跨领域迁移的通用定义，因此难以在海量的异质语料上建立可靠的全局难度排序。</p>\n<h3>4.3 长上下文训练</h3>\n<p>长上下文训练把模型可处理的序列从数 K 扩展到 M 量级，已成为预训练后期的常规步骤。更长的上下文窗口直接影响长文档理解、代码仓库分析、多轮工具调用和 agentic 工作流，因为这些场景需要模型在单次推理中保留更长的任务状态。LLaMA 3、DeepSeek V3/4、Qwen 3、Kimi K2/2.5 都将长上下文扩展放在基础预训练之后完成。这一阶段涉及两个独立问题：如何规划上下文长度的扩展，以及用什么数据填充扩展后的序列。  </p>\n<p>分阶段训练不同长度是最普遍的扩展方式。模型先在较短序列上使用大规模通用数据建立基础语言能力，再在后续阶段逐步提高上下文窗口。DeepSeek V3 在第一阶段消耗约 14.8T token，序列长度为 4K。第二阶段采用 YaRN 将上下文窗口先后扩展到 32K 和 128K。LLaMA 3 采用更细的多步扩展，从 8K 起经过 6 个阶段依次提升至 128K。Kimi K2 沿用类似的分段扩展思路。  </p>\n<p>长上下文阶段的数据挑战在于，极长自然文档处于长尾分布。现实世界中的网页、问答和社交文本大多较短，CommonCrawl 中超过 32K token 的网页占比极低。书籍、学术论文和代码仓库能够提供更长的连续结构，但它们的总量和领域覆盖有限，仅依赖自然长文不足以支撑长上下文训练。前沿模型通常采用三类策略：采样长文档源、文档拼接、合成长上下文任务。LLaMA 3 在长上下文阶段提高代码与书籍的占比，DeepSeek V3 同样上采样数学与代码作为长序列。In-Context Pretraining 用最近邻检索将语义相关短文档拼接为长序列，使 ICL 能力提升约 8 %。Best-fit Packing 通过长度感知组合将文档打包成训练序列减少截断和 padding。Qwen 3 的 S3 阶段使用数百M token 的合成长上下文数据，Kimi K2 与 GLM-5 报告类似做法。这三类策略常常叠加应用，并且主要用于训练后期少量 token，但对长上下文 benchmark 的提升远超其 token 占比。</p>\n<h3>4.4 训练信号</h3>\n<p>标准的自回归预训练对序列中每个 token 施加等权重的交叉熵损失，隐含假设是所有 token 对模型学习的贡献均等。然而训练动态分析表明，不同 token 的学习速度并不相同。RHO-1 提出选择性语言建模，先在高质量语料上训练一个参考模型，再逐 token 比较当前模型与参考模型的 loss，只对超额 loss 较大的 token 反向传播，将训练信号集中于「应该能预测但尚未学会“的位置。Fill-in-the-Middle 在训练时以一定概率将文档的中间片段移至序列末尾，要求模型根据前缀和后缀预测被移除的内容，使自回归模型获得双向条件生成能力。这一策略在代码模型中被 StarCoder、Code~LLaMA、DeepSeek-Coder-V2采用。FIM 的应用已从代码专用模型扩展到通用模型，DeepSeek V3 和 DeepSeek V4 在通用预训练中继承相同策略，并报告其不损害从左到右的生成能力。Gemma 2给出了另一条改写训练信号的路线，在预训练中使用大型 teacher 模型的 logits 取代 one-hot 目标，以蒸馏方式向 9B 与 27B 学生模型迁移知识。  </p>\n<p>除了改进已有训练信号，另一方向是挖掘更多可用于训练的信息。互联网文档除正文外天然包含 URL、域名层级、来源站点与时间戳等字段。这些信号通常在标准预训练中被丢弃，但近期工作表明它们可以作为有效的训练条件。Physics of LLM 3.1 的实验发现知识能否被模型高效吸收不仅取决于命题本身，也取决于命题出现时的上下文。MeCo 将 URL 等元信息作为前缀拼接到训练序列中，并仅对正文 token 计算 loss，在 600M 到 8B 的规模上都观察到更快收敛，能以约 33\\% 更少的数据达到与标准预训练相当的效果。Beyond URLs 表明加速效果不仅来自是否加入元信息，还取决于元信息的粒度，细粒度域名层级通常优于粗粒度主题标签或简单来源标记。KoCo 进一步将文档元信息映射为知识坐标作为条件输入模型，使元信息从离散标签变为可组合的语境表示。一个可能的解释是，标准语言模型只建模 token 的共现关系，而真实世界中的知识总是在具体语境中产生和传播。URL、来源标签或知识坐标为模型提供了语境的代理，因而可能提高数据利用效率并减弱低质量文本的干扰。这一方向尚缺乏在前沿模型与更大规模上的公开验证。</p>\n<h2>5. 预训练评估</h2>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-1cf86afd8743807625064ba652e8893d_1440w.jpg\" /></p>\n<p>预训练基座模型使用的评估 benchmark</p>\n<h3>5.1 评估方法与指标</h3>\n<p>训练 loss 是最基本的监控信号。万亿 token 规模下，loss 的局部 spike、阶梯式 plateau 与缓慢上漂通常是数据异常或数值不稳定的早期指征。常用的 spike 检测做法是滑动窗口 z-score 或绝对阈值，触发后回滚若干 step 并跳过相关 batch，PaLM 在 540B 训练中报告约 20 次显著 spike 并采用此策略恢复训练。Gradient norm 是与 loss 互补的稳定性信号，往往在 loss 显式爆炸前数百 step 给出预警。DeepSeek V3 与 Kimi K2 将 grad norm、参数 norm 与 loss 一同作为常规监控量。loss 的绝对值无法跨数据集对齐，因此训练 loss 主要用于同一配置内的纵向监控。  </p>\n<p>为了在不同数据方案之间提供可比指标，开源模型通常报告下游 benchmark 性能。预训练阶段的评估一般采用 few-shot 设置，因为 base model 缺乏指令遵循能力，需要通过 in-context 示例引导输出格式。  </p>\n<p>下游任务准确率并不是理想的预训练监控信号。准确率是非线性阈值指标。对于选择题，模型对正确选项的概率必须超过所有其他选项才算正确。对于生成式评估，模型必须逐 token 精确复现完整答案。因此模型能力的连续改善在跨越阈值之前不可观测，表现为指标长期停留在随机水平后突然跳升。Mirage 给出了直接证据，BIG-Bench 中超过 92% 的涌现能力仅在精确匹配等不连续指标下出现。当评估指标替换为连续的 Token Edit Distance 或 Brier Score 后，这些能力的增长曲线恢复为平滑幂律，涌现消失。格式敏感性进一步加剧这一问题。Olmes发现 MMLU 在标准的多选字母作答格式下约 400B token 内停留在随机水平。将评估改为 cloze 格式，即不要求模型生成答案字母，而是分别计算每个选项文本的 log-probability 并取最高者，同一 benchmark 从训练初期即产生清晰的区分信号。这两项发现共同说明，下游任务准确率无法捕捉预训练早期的能力变化。  </p>\n<p>针对上述缺陷，社区发展出改进的评估方案。Bits-per-byte（BPB）将模型在一段文本上的总 negative log-likelihood 除以该文本的 UTF-8 字节数而非 token 数，消除分词器差异，使不同模型的得分可以直接比较。DeepSeek V3 和 OLMo 3 都采用 BPB 作为标准报告指标。在 benchmark 层面，Gadre 2025提出不直接比较准确率，而是比较模型对每道题正确答案的 NLL。NLL 是连续值，随计算量增加而平滑下降，可以用幂律关系外推。在此基础上再通过 $\\text{Err}(L) = \\varepsilon - k \\cdot \\exp(-\\gamma \\cdot L)$ 将 NLL 映射到准确率。这一方法用 1.4B 过度训练模型即可预测大模型的 benchmark 表现，所需计算量仅为全规模训练的 1/300，被 LLaMA~3 的预训练评估流程采用。  </p>\n<p>对训练过程中多个 checkpoint 的持续评估可以追踪数据或架构决策的累积效果，例如某一领域数据占比的调整是否带来对应能力的提升或退化。Phi-4 构建了内部评估集 PhiBench 指导数据混合与超参数决策。纯合成数据模型在 TriviaQA 等知识型任务上的退化信号直接促使团队在数据配比中保留 web 数据。Gemma 3 在预训练过程中使用涵盖科学、代码、事实性、多语言与推理等维度的 benchmark 作为能力探针持续监控各维度得分，同时在验证集上计算 perplexity 来评估架构选择，把架构搜索建立在连续指标之上。  </p>\n<p>评估信号还用于判断预训练何时结束以及如何过渡到下一阶段。LLaMA 3 将退火阶段的评估增益作为模型成熟度指标，退火阶段上采样高质量数学与代码数据后，8B 模型在 GSM8K 和 MATH 上分别提升 24.0% 和 6.4%，但对 405B 模型的提升可忽略不计。技术报告将其归因为 405B 模型已在通用预训练阶段习得足够强的上下文学习与推理能力，不再依赖特定领域样本来达到高性能。当退火阶段的高质量数据不再带来增益时，说明模型已从通用数据中充分提取能力，可以切换到后训练。OLMo~2 将 OLMES 评估任务划分为 development 集与 held-out 集，在 mid-training 阶段通过 development 集上的表现优化退火数据混合比例，最终在 held-out 集上验证增益的泛化性。OLMo 3 进一步将评估规模扩展到 43 个 benchmark（约为 OLMo 2 的四倍）。这些做法表明，预训练的完成不仅由固定的 token 数量决定，也可以根据评估框架中各能力维度的边际增益来判定。</p>\n<h3>5.2 度量挑战</h3>\n<p>已有的评估方法假设下游 benchmark 表现可以作为预训练模型能力的代理指标。但代理指标提供的是相关性而非因果性，benchmark 得分的变化可能源于数据质量的改善，也可能源于格式适应、评估噪声或能力之间的此消彼长。当代理关系不稳定时，基于 benchmark 做出的决策就可能产生误导。  </p>\n<p>首先是代理指标与实际能力之间的脱钩。现有下游任务并不能完整体现模型在真实使用场景中的能力，agentic 工作流就是一个典型例子。当前模型往往接入检索、工具调用、代码执行、多轮规划等外部工作流来完成具体任务，而这类 agentic training 所需的交互轨迹和环境反馈在预训练语料中天然不存在。预训练阶段的模型是否已经为后续 agentic training 准备好了可迁移的基础能力，现有 benchmark 很难直接回答这一点。Yi-Lightning 提供了直接证据。该模型在 Chatbot Arena 上排名第 6，在中文、数学、代码等专项类别中排名第 2 至第 4，但其在 benchmark 上得分与这一排名存在明显落差。技术报告因此质疑 benchmark 作为模型能力代理的可靠性。Ministral~3 进一步表明，同一组 benchmark 在不同训练阶段可能给出矛盾的指导方向。在预训练蒸馏阶段，从较小的 Mistral Small 3.1 蒸馏的效果优于从更强的 Mistral Medium 3。但进入后训练阶段后规律逆转，更强 teacher 蒸馏的模型反而获得更大增益。  </p>\n<p>此外，现有 benchmark 衡量的是下游任务的综合表现而非模型的原子能力。以 MMLU 为例，模型同时依赖常识记忆、上下文理解和作答格式遵循三种能力来回答问题，分数的变化难以定位到具体能力。FineWeb-Edu 的实验发现教育质量过滤使 MMLU 和 ARC 提升，但 HellaSwag 和 PIQA 退化，说明单一维度的数据干预会在不同能力之间引发此消彼长，而聚合指标可能掩盖这种内部结构。即使某项 benchmark 上的分数提升，也难以验证这一提升是否对应该能力维度的真实改善。这意味着 benchmark 分数作为数据决策的反馈信号存在可靠性风险。  </p>\n<p>这种可靠性风险在 scaling 研究中进一步放大，因为趋势本身依赖实验设置，且跨实验结果往往不可比。lourie2025scaling 在 gadre2025reliable 构建的 46 个下游任务测试集中发现，仅约 39 % 的任务表现出单调的 scaling 行为，其余呈现非单调、突变或无趋势的模式。即便使用相同的预训练语料和下游任务，prompt 格式、few-shot 数量等细节差异也会使 scaling 趋势发生定性改变，而验证语料的选择甚至能翻转结论，例如在 HellaSwag 上使用不同验证集时 C4 与 RedPajama 的优劣关系可以完全逆转。这种不稳定性在跨实验比较中被进一步放大。不同研究报告除了 benchmark 设置差异外，还涉及模型架构与规模、基线数据集、训练 token 数等更根本的维度差异。例如 FineWeb-Edu 报告的结果基于 1.8B 模型和 350B token，DCLM 的结果基于 7B 模型和 280B token，两者的数字无法直接对比。这一问题直接影响预训练研究的迭代效率。预训练的核心任务是在数据、算力与架构之间做资源分配决策，而这些决策的验证依赖不同方案之间的公平比较。当实验设置、评估方法与效率度量缺乏标准化时，社区无法可靠判断哪些策略真正带来了进步，哪些仅是实验设置差异造成的偏差。  </p>\n<p>上述挑战共同反映了现有评估体系的核心问题，即缺乏将模型能力分解为独立维度并逐一测量的手段，而是把多种能力混淆在综合性下游任务中。Allen-Zhu 的 Physics of Language Models 系列研究朝这一方向做了探索，针对``智能''的每个原子能力分别构建合成数据集，在受控环境中隔离并测量单一能力，以排除数据噪声与能力混淆的干扰。该系列先后研究了知识的存储与提取条件 （Part 3.1）、知识操纵（分类、比较、反向检索）的固有局限 （Part 3.2）、以及知识容量与模型参数之间的定量关系（Part 3.3）。这一思路为大模型的能力评估提供了一条噪声更低、归因更清晰的补充路径，本文不直接采用其评估范式，而是把它作为度量代理失效问题的可能解之一。其结论能否推广到大规模预训练仍有待验证。</p>\n<h2>6. 总结</h2>\n<p>预训练正在变得更加精细。数据不再只是训练开始前准备好的静态语料库，而是贯穿模型训练全过程的可调变量。研究者开始关心数据来源、质量、配比、阶段切换和训练信号之间的关系。这些细节会影响模型学到什么，也会影响模型以多高的代价学到。但精细化并不意味着流程越复杂越好。许多经过规模验证的做法仍然遵循``大道至简''的原则。例如去掉明显重复和低质的内容，保留足够广的自然分布，在关键阶段提高高质量数据比例。这些方法并不 fancy，却在大规模训练中反复显示出价值。  </p>\n<p>如 Ilya Sutskever 所说，LLM 的主线需要回到研究问题本身。未来研究者更需要思考的是，数据究竟以什么方式驱动智能。新的高质量文本越来越难获得，简单扩充数据量的收益正在下降。更关键的问题是，知识是如何从数据中出现的，模型如何从数据中学习建立概念、关系和推理路径。我们正在推进的<a href=\"https://link.zhihu.com/?target=https%3A//ydli-ai.github.io/%255C%23knowledge-context\">知识语境系列研究</a>，正是沿着这一问题展开。标准语言建模把网页、书籍、代码和论文都压成 token 序列，却常常忽略知识产生的条件。人类学习并不是在无来源的信息中完成的，知识总是附着在具体场景中被理解、比较和迁移。我们的工作正尝试把这些被丢弃的语境重新纳入预训练数据工程。  </p>\n<p>模型预训练是一个重实践经验的方向，要判断哪些做法真正有效，训练细节的开放性至关重要。大模型研究需要集体智慧，也需要来自真实训练的经验分享，才能推动社区形成更可靠的判断。数据工程的细节往往决定模型差异，却也是公开报告中最容易缺失的部分。这正是本文写作的出发点：我们希望在有限披露的信息中整理可交叉验证的证据，为社区提供一个持续追踪前沿实践的窗口，并随着新的技术报告和开放语料库继续更新。</p>\n<p>如果您认为有遗漏或者未被充分讨论的技术点请留言~</p>"
    }
  ],
  "graph": {
    "nodes": [
      {
        "id": "kaplan_scaling",
        "x": 100,
        "y": 100,
        "category": "scaling"
      },
      {
        "id": "chinchilla_law",
        "x": 250,
        "y": 100,
        "category": "scaling"
      },
      {
        "id": "mup",
        "x": 260,
        "y": 150,
        "category": "scaling"
      },
      {
        "id": "data_constrained_scaling",
        "x": 350,
        "y": 100,
        "category": "scaling"
      },
      {
        "id": "t2_scaling",
        "x": 550,
        "y": 80,
        "category": "scaling"
      },
      {
        "id": "u_mup",
        "x": 500,
        "y": 150,
        "category": "scaling"
      },
      {
        "id": "rl_scaling",
        "x": 550,
        "y": 120,
        "category": "scaling"
      },
      {
        "id": "c4",
        "x": 100,
        "y": 250,
        "category": "data"
      },
      {
        "id": "the_pile",
        "x": 180,
        "y": 250,
        "category": "data"
      },
      {
        "id": "minhash_dedup",
        "x": 240,
        "y": 220,
        "category": "data"
      },
      {
        "id": "suffix_array_dedup",
        "x": 240,
        "y": 280,
        "category": "data"
      },
      {
        "id": "refinedweb",
        "x": 350,
        "y": 250,
        "category": "data"
      },
      {
        "id": "dolma",
        "x": 420,
        "y": 250,
        "category": "data"
      },
      {
        "id": "doremi",
        "x": 350,
        "y": 300,
        "category": "data"
      },
      {
        "id": "fineweb",
        "x": 420,
        "y": 220,
        "category": "data"
      },
      {
        "id": "common_corpus",
        "x": 550,
        "y": 250,
        "category": "data"
      },
      {
        "id": "essential_web",
        "x": 550,
        "y": 220,
        "category": "data"
      },
      {
        "id": "fed_dedup",
        "x": 550,
        "y": 280,
        "category": "data"
      },
      {
        "id": "lshbloom",
        "x": 600,
        "y": 280,
        "category": "data"
      },
      {
        "id": "data_mixing_agent",
        "x": 550,
        "y": 320,
        "category": "data"
      },
      {
        "id": "mixed_precision",
        "x": 50,
        "y": 400,
        "category": "training"
      },
      {
        "id": "flash_attention",
        "x": 240,
        "y": 400,
        "category": "training"
      },
      {
        "id": "flash_attention_2",
        "x": 350,
        "y": 400,
        "category": "training"
      },
      {
        "id": "wesar",
        "x": 500,
        "y": 450,
        "category": "training"
      },
      {
        "id": "muon",
        "x": 480,
        "y": 400,
        "category": "training"
      },
      {
        "id": "flash_attention_4",
        "x": 550,
        "y": 400,
        "category": "training"
      },
      {
        "id": "snip_quartet",
        "x": 550,
        "y": 440,
        "category": "training"
      },
      {
        "id": "longrope2",
        "x": 500,
        "y": 360,
        "category": "training"
      },
      {
        "id": "gpipe",
        "x": 80,
        "y": 550,
        "category": "distributed"
      },
      {
        "id": "megatron_lm",
        "x": 80,
        "y": 590,
        "category": "distributed"
      },
      {
        "id": "zero",
        "x": 100,
        "y": 570,
        "category": "distributed"
      },
      {
        "id": "fsdp",
        "x": 350,
        "y": 570,
        "category": "distributed"
      },
      {
        "id": "distflashattn",
        "x": 550,
        "y": 550,
        "category": "distributed"
      }
    ],
    "edges": [
      {
        "from": "kaplan_scaling",
        "to": "chinchilla_law",
        "label": "修正缩放比例"
      },
      {
        "from": "chinchilla_law",
        "to": "data_constrained_scaling",
        "label": "数据受限"
      },
      {
        "from": "chinchilla_law",
        "to": "t2_scaling",
        "label": "推理优化"
      },
      {
        "from": "mup",
        "to": "u_mup",
        "label": "单位缩放"
      },
      {
        "from": "kaplan_scaling",
        "to": "rl_scaling",
        "label": "RL扩展"
      },
      {
        "from": "c4",
        "to": "the_pile",
        "label": "多样性增强"
      },
      {
        "from": "c4",
        "to": "refinedweb",
        "label": "MDR方法"
      },
      {
        "from": "minhash_dedup",
        "to": "suffix_array_dedup",
        "label": "子串去重"
      },
      {
        "from": "refinedweb",
        "to": "fineweb",
        "label": "质量提升"
      },
      {
        "from": "the_pile",
        "to": "dolma",
        "label": "透明开源"
      },
      {
        "from": "fineweb",
        "to": "essential_web",
        "label": "分类标签"
      },
      {
        "from": "dolma",
        "to": "common_corpus",
        "label": "合规化"
      },
      {
        "from": "minhash_dedup",
        "to": "fed_dedup",
        "label": "GPU加速"
      },
      {
        "from": "fed_dedup",
        "to": "lshbloom",
        "label": "空间优化"
      },
      {
        "from": "doremi",
        "to": "data_mixing_agent",
        "label": "RL动态"
      },
      {
        "from": "flash_attention",
        "to": "flash_attention_2",
        "label": "并行优化"
      },
      {
        "from": "flash_attention_2",
        "to": "flash_attention_4",
        "label": "硬件适配"
      },
      {
        "from": "mixed_precision",
        "to": "snip_quartet",
        "label": "FP4训练"
      },
      {
        "from": "zero",
        "to": "fsdp",
        "label": "PyTorch原生"
      },
      {
        "from": "flash_attention_2",
        "to": "distflashattn",
        "label": "分布式扩展"
      }
    ],
    "milestones": [
      "kaplan_scaling",
      "chinchilla_law",
      "flash_attention"
    ]
  },
  "algos": [
    {
      "id": "kaplan_scaling",
      "num": 1,
      "name": "OpenAI Scaling Laws",
      "fullName": "OpenAI规模定律 (Scaling Laws for Neural Language Models)",
      "year": "2020",
      "org": "OpenAI",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2001.08361",
      "projectUrl": "",
      "category": "scaling",
      "motivation": "幂律公式揭示模型性能与N/D/C关系",
      "summary": "Kaplan Scaling Laws 提出用幂律统一描述 Transformer 语言模型损失与参数量 \\(N\\)、数据量 \\(D\\)、训练计算量 \\(C\\) 的关系，解决了“大模型训练预算如何分配”的经验预测问题。论文的核心结论是：性能主要由规模决定，架构形状影响较弱；在固定计算预算下，OpenAI 2020 的估计倾向于把更多新增计算投入模型参数，而不是把模型训练到完全收敛。",
      "keyPoints": [
        "将语言模型交叉熵损失建模为参数量、数据量、计算量的幂律函数，覆盖多数量级实验范围。",
        "实验对象是自回归 Transformer，主要在 WebText2 上以 1024-token 上下文训练并评估测试损失。",
        "区分非 embedding 参数 <span class=\"kb-math kb-math-inline\">N</span>、数据 token 数 <span class=\"kb-math kb-math-inline\">D</span>、训练 compute <span class=\"kb-math kb-math-inline\">C</span>、最小 compute <span class=\"kb-math kb-math-inline\">C_{\\min}</span>、临界 batch size <span class=\"kb-math kb-math-inline\">B_{crit}</span>。",
        "提出单变量规模律：<span class=\"kb-math kb-math-inline\">L(N)</span>、<span class=\"kb-math kb-math-inline\">L(D)</span>、<span class=\"kb-math kb-math-inline\">L(C_{\\min})</span> 均近似服从幂律下降。",
        "提出联合模型-数据公式 <span class=\"kb-math kb-math-inline\">L(N,D)</span>，解释过拟合与数据不足时的收益递减。",
        "发现模型形状如深度、宽度、attention heads 在合理范围内影响较弱，非 embedding 参数规模更关键。",
        "得到固定 compute 下的分配建议：<span class=\"kb-math kb-math-inline\">N\\propto C_{\\min}^{0.73}</span>、<span class=\"kb-math kb-math-inline\">B\\propto C_{\\min}^{0.24}</span>、<span class=\"kb-math kb-math-inline\">S\\propto C_{\\min}^{0.03}</span>，数据需求约随 <span class=\"kb-math kb-math-inline\">C^{0.27}</span> 缓慢增长。",
        "强调大模型更 sample-efficient，计算最优训练通常应早停，而不是把较小模型训练到收敛。"
      ],
      "detail": "<p><img alt=\"Kaplan Scaling Laws Figure 1\" src=\"https://ar5iv.labs.arxiv.org/html/2001.08361/assets/x1.png\" />\n<em>图：论文 Figure 1 展示测试损失随训练 compute、数据集大小、非 embedding 参数量平滑下降，并可被幂律拟合。</em></p>\n<pre><code class=\"language-python\"># Kaplan Scaling Laws 的经验拟合流程伪代码\nruns = []\nfor N in model_sizes:                  # 非 embedding 参数量，从小模型到十亿级模型\n    for D in dataset_sizes:            # WebText2 子集 token 数\n        for schedule in train_settings:\n            model = Transformer(params=N, context=1024)\n            curve = train_autoregressive_lm(model, tokens=D, schedule=schedule)\n            runs.append({&quot;N&quot;: N, &quot;D&quot;: D, &quot;C&quot;: estimate_flops(curve), &quot;loss&quot;: test_loss(curve)})\n\n# 1. 在数据充足时拟合 L(N)\nfit_power_law(x=[r.N for r in converged_large_data_runs], y=[r.loss for r in runs])\n\n# 2. 在模型足够大、早停时拟合 L(D)\nfit_power_law(x=[r.D for r in dataset_limited_runs], y=[r.loss for r in runs])\n\n# 3. 在每个 compute 预算下取最优模型，拟合 L(C_min)\nfrontier = lower_envelope(runs, key=&quot;C&quot;, value=&quot;loss&quot;)\nfit_power_law(x=[p.C_min for p in frontier], y=[p.loss for p in frontier])\n\n# 4. 用联合公式预测过拟合边界和 compute-optimal 分配\nfor C_budget in budgets:\n    choose N, batch_size, steps to minimize predicted_loss(N, D, C_budget)\n</code></pre>\n<p>论文的出发点不是提出一个新网络结构，而是把语言模型训练看成一个可预测的工程系统。作者把性能指标固定为自回归语言模型的 token 平均交叉熵 <span class=\"kb-math kb-math-inline\">L</span>，把模型规模固定为不含词表和位置 embedding 的参数量 <span class=\"kb-math kb-math-inline\">N</span>，把数据规模固定为训练语料 token 数 <span class=\"kb-math kb-math-inline\">D</span>，再用近似 <span class=\"kb-math kb-math-inline\">C\\approx 6NBS</span> 估计非 embedding 训练计算量。这样做的关键好处是消除 embedding 参数、context 相关项、深宽比例等二阶因素，让不同深度和宽度的 Transformer 能落到同一条主趋势线上。</p>\n<p>单变量规模律是整篇论文的入口。在其他因素不成为瓶颈时，测试损失可写成：</p>\n<div class=\"kb-math kb-math-display\">L(N)=\\left(\\frac{N_c}{N}\\right)^{\\alpha_N},\\quad \\alpha_N\\approx 0.076,\\quad N_c\\approx 8.8\\times 10^{13}</div>\n<div class=\"kb-math kb-math-display\">L(D)=\\left(\\frac{D_c}{D}\\right)^{\\alpha_D},\\quad \\alpha_D\\approx 0.095,\\quad D_c\\approx 5.4\\times 10^{13}</div>\n<div class=\"kb-math kb-math-display\">L(C_{\\min})=\\left(\\frac{C_c^{\\min}}{C_{\\min}}\\right)^{\\alpha_C^{\\min}},\\quad \\alpha_C^{\\min}\\approx 0.050,\\quad C_c^{\\min}\\approx 3.1\\times 10^8\\ \\text{PF-days}</div>\n<p>这些指数都很小，直觉上意味着 scale 的收益稳定但有强烈边际递减：参数、数据或 compute 翻倍时，loss 只会按一个小指数下降。论文重要的工程价值也来自这里：如果早期训练曲线已经落在幂律上，就可以外推更大模型或更长训练后的损失，而不必完整训练所有候选模型。</p>\n<p>为了刻画“模型太大但数据不够”或“数据很多但模型太小”的瓶颈，论文把 <span class=\"kb-math kb-math-inline\">L(N)</span> 和 <span class=\"kb-math kb-math-inline\">L(D)</span> 合成联合公式：</p>\n<div class=\"kb-math kb-math-display\">L(N,D)=\\left[\\left(\\frac{N_c}{N}\\right)^{\\alpha_N/\\alpha_D}+\\frac{D_c}{D}\\right]^{\\alpha_D}</div>\n<p>当 <span class=\"kb-math kb-math-inline\">D\\to\\infty</span> 时，第二项消失，公式退化为模型受限的 <span class=\"kb-math kb-math-inline\">L(N)</span>；当 <span class=\"kb-math kb-math-inline\">N\\to\\infty</span> 时，第一项消失，公式退化为数据受限的 <span class=\"kb-math kb-math-inline\">L(D)</span>。这也是“过拟合程度主要由 <span class=\"kb-math kb-math-inline\">N^{0.74}/D</span> 之类比例控制”的来源：因为 <span class=\"kb-math kb-math-inline\">\\alpha_N/\\alpha_D\\approx 0.8</span>，模型变大时数据也要增长，但可低于线性增长。</p>\n<p>训练动态部分进一步说明，大模型并不只是最终 loss 更低，它们在达到同一 loss 时需要更少样本。论文用临界 batch size <span class=\"kb-math kb-math-inline\">B_{crit}</span> 和最小训练步数 <span class=\"kb-math kb-math-inline\">S_{\\min}</span> 描述时间与计算效率的折中：batch 太小会浪费并行性，batch 太大会出现收益递减。由学习曲线公式和 <span class=\"kb-math kb-math-inline\">B_{crit}</span> 公式推导，固定 compute 下最优策略近似满足：</p>\n<div class=\"kb-math kb-math-display\">N\\propto C_{\\min}^{0.73},\\quad B\\propto C_{\\min}^{0.24},\\quad S\\propto C_{\\min}^{0.03},\\quad D=B\\cdot S\\propto C_{\\min}^{0.27}</div>\n<p>这组指数后来成为 Chinchilla 论文重点修正的对象。Kaplan 结论认为新增预算主要应扩大模型，数据和串行训练步数增长较慢，因此会得到“训练很大的模型但远未收敛”的计算最优方案。它在 2020 年极大推动了大模型预训练的可预测化，但也因为实验中 token 数和学习率 schedule 的处理方式，低估了增加训练 token 的价值。</p>\n<p>与传统调参经验相比，这篇论文的创新在于把“大模型越大越好”转化为可用于预算规划的幂律方程。传统做法往往只比较几个模型大小的最终指标，无法回答“给定 10 倍 compute 应该增大模型、数据还是训练步数”。Kaplan Scaling Laws 给出的答案虽然后来被 Chinchilla 修正，但它奠定了 scaling-law 研究的基本语言：先拟合 loss surface，再沿 compute 约束求最优 frontier。</p>\n<div class=\"key-point\">💡 关键：Kaplan Scaling Laws 的贡献不是某个单独公式，而是证明 LLM 预训练损失在 <span class=\"kb-math kb-math-inline\">N,D,C</span> 上具有稳定、可外推的幂律结构，从而让“大规模训练”从经验赌博变成预算优化问题。</div>",
      "quiz": {
        "q": "Kaplan Scaling Laws 中，固定 compute 下最核心的预算分配结论是什么？",
        "options": [
          "主要增加模型参数，并较早停止训练，而不是把小模型训练到完全收敛",
          "主要增加训练 epoch，模型参数保持不变",
          "只要增大 batch size，模型大小和数据量都不重要",
          "embedding 参数数量比非 embedding 参数更能预测损失"
        ],
        "answer": 0,
        "explain": "论文推导出 N 随 compute 的指数约为 0.73，远高于训练步数的约 0.03，因此其计算最优建议偏向训练更大的模型并早停。"
      }
    },
    {
      "id": "chinchilla_law",
      "num": 2,
      "name": "Chinchilla Laws",
      "fullName": "计算最优训练法则 (Training Compute-Optimal Large Language Models)",
      "year": "2022.03",
      "org": "DeepMind",
      "parent": "kaplan_scaling",
      "paperUrl": "https://arxiv.org/abs/2203.15556",
      "projectUrl": "",
      "category": "scaling",
      "motivation": "提出20:1数据参数比的计算最优原则",
      "summary": "Chinchilla Laws 重新估计了固定训练 FLOPs 下参数量 \\(N\\) 与训练 token 数 \\(D\\) 的最优分配，指出当时许多大模型“参数过大、数据训练不足”。它提出 compute-optimal LLM 应大致等比例扩大参数和数据，经验上接近每个参数约 20 个训练 token 的原则。",
      "keyPoints": [
        "用 400 多个语言模型实验重新估计 <span class=\"kb-math kb-math-inline\">N_{opt}(C)</span> 与 <span class=\"kb-math kb-math-inline\">D_{opt}(C)</span>，模型规模从约 70M 到 16B+ 参数，训练 token 从 5B 到 500B+。",
        "明确优化目标：在 <span class=\"kb-math kb-math-inline\">\\mathrm{FLOPs}(N,D)=C</span> 约束下最小化最终预训练损失 <span class=\"kb-math kb-math-inline\">L(N,D)</span>。",
        "提出三种互相验证的方法：固定模型大小扫 token、IsoFLOP 曲线、参数化损失函数拟合。",
        "参数化损失采用 <span class=\"kb-math kb-math-inline\">\\hat L(N,D)=E+A/N^\\alpha+B/D^\\beta</span>，把模型容量不足和数据/优化不足分解为两个幂律项。",
        "三种方法均得到接近等比例的 scaling：<span class=\"kb-math kb-math-inline\">N_{opt}\\propto C^{0.46\\sim0.50}</span>，<span class=\"kb-math kb-math-inline\">D_{opt}\\propto C^{0.50\\sim0.54}</span>。",
        "与 Kaplan 2020 的 <span class=\"kb-math kb-math-inline\">N\\propto C^{0.73},D\\propto C^{0.27}</span> 明显不同，Chinchilla 大幅提高了训练数据的重要性。",
        "用 Gopher 相同计算预算训练 70B Chinchilla、1.4T tokens，相比 280B Gopher 用 4 倍更少参数和约 4 倍更多数据取得更好下游性能。",
        "给出现代预训练常用启发式：compute-optimal 模型大约训练 20 tokens/parameter。"
      ],
      "detail": "<p><img alt=\"Chinchilla compute-optimal frontier\" src=\"https://ar5iv.labs.arxiv.org/html/2203.15556/assets/x1.png\" />\n<em>图：论文 Figure 1 对比三种方法预测的最优参数量与 FLOPs 关系，并标出 Chinchilla、Gopher、GPT-3、MT-NLG；三种方法都认为当时大模型普遍应更小但训练更久。</em></p>\n<pre><code class=\"language-python\"># Chinchilla Laws 的核心估计流程伪代码\nruns = []\nfor N in model_sizes:                       # 约 70M 到 16B+ 参数\n    for D in token_budgets:                 # 约 5B 到 500B+ tokens\n        model = train_lm(params=N, tokens=D, lr_schedule=&quot;cosine_matched_to_D&quot;)\n        runs.append({&quot;N&quot;: N, &quot;D&quot;: D, &quot;C&quot;: flops(N, D), &quot;loss&quot;: smoothed_train_loss(model)})\n\n# Approach 1: 对每个 compute 预算，从训练曲线 envelope 中取最低 loss\nfrontier_1 = lower_envelope_over_training_curves(runs)\nfit N_opt ~ C**a, D_opt ~ C**b\n\n# Approach 2: 固定 FLOPs，扫描参数量，找到每条 IsoFLOP 曲线的 loss valley\nfor C in flops_budgets:\n    candidates = [r for r in runs if close(r.C, C)]\n    N_star = argmin_by_parabolic_fit(candidates, x=&quot;N&quot;, y=&quot;loss&quot;)\n    D_star = C / (6 * N_star)\nfit N_opt ~ C**a, D_opt ~ C**b\n\n# Approach 3: 直接拟合参数化损失，再在 compute 约束下求闭式 frontier\nfit E, A, B, alpha, beta in L_hat(N, D) = E + A/N**alpha + B/D**beta\nfor C in target_budgets:\n    choose N, D to minimize L_hat(N, D) subject to C ≈ 6*N*D\n</code></pre>\n<p>Chinchilla 的问题设置非常直接：训练预算通常先由硬件数量和训练时长确定，因此真正要优化的是“同样 FLOPs 下该用多大模型、看多少 token”。论文将目标写成：</p>\n<div class=\"kb-math kb-math-display\">N_{opt}(C),D_{opt}(C)=\\operatorname*{argmin}_{N,D\\ \\text{s.t.}\\ \\mathrm{FLOPs}(N,D)=C} L(N,D)</div>\n<p>并使用常见近似 <span class=\"kb-math kb-math-inline\">C\\approx 6ND</span>。这里 <span class=\"kb-math kb-math-inline\">N</span> 是参数量，<span class=\"kb-math kb-math-inline\">D</span> 是训练 token 数。相比 Kaplan，Chinchilla 的关键修正是让学习率 schedule 与训练 token 数匹配，并显式扫过更多 token budget；否则短训练阶段的 loss 会被高估，进而错误地认为“增加数据不如增加参数”。</p>\n<p>三种估计方法分别从不同角度避免偏差。第一种方法把训练曲线视作连续函数，对每个 FLOPs 点取所有 run 中最低 loss 的 envelope，再拟合 <span class=\"kb-math kb-math-inline\">N_{opt}\\propto C^a</span>、<span class=\"kb-math kb-math-inline\">D_{opt}\\propto C^b</span>。第二种方法在固定 FLOPs 下改变模型大小，因为 <span class=\"kb-math kb-math-inline\">D=C/(6N)</span>，每条 IsoFLOP 曲线都会出现一个 U 形谷底：模型太小会容量不足，模型太大则 token 不够、训练不足。第三种方法直接拟合损失曲面：</p>\n<div class=\"kb-math kb-math-display\">\\hat L(N,D)=E+\\frac{A}{N^\\alpha}+\\frac{B}{D^\\beta}</div>\n<p>论文在附录中给出一组拟合值：<span class=\"kb-math kb-math-inline\">E=1.69</span>、<span class=\"kb-math kb-math-inline\">A=406.4</span>、<span class=\"kb-math kb-math-inline\">B=410.7</span>、<span class=\"kb-math kb-math-inline\">\\alpha=0.34</span>、<span class=\"kb-math kb-math-inline\">\\beta=0.28</span>。其中 <span class=\"kb-math kb-math-inline\">E</span> 可理解为理想生成过程的不可约熵，<span class=\"kb-math kb-math-inline\">A/N^\\alpha</span> 是有限模型容量带来的 excess loss，<span class=\"kb-math kb-math-inline\">B/D^\\beta</span> 是有限训练数据/优化步数带来的 excess loss。</p>\n<p>在 <span class=\"kb-math kb-math-inline\">C\\approx 6ND</span> 约束下，参数化公式可推出闭式最优 frontier：</p>\n<div class=\"kb-math kb-math-display\">N_{opt}(C)=G\\left(\\frac{C}{6}\\right)^a,\n\\quad\nD_{opt}(C)=G^{-1}\\left(\\frac{C}{6}\\right)^b</div>\n<div class=\"kb-math kb-math-display\">G=\\left(\\frac{\\alpha A}{\\beta B}\\right)^{1/(\\alpha+\\beta)},\n\\quad\na=\\frac{\\beta}{\\alpha+\\beta},\n\\quad\nb=\\frac{\\alpha}{\\alpha+\\beta}</div>\n<p>因为 <span class=\"kb-math kb-math-inline\">\\alpha</span> 与 <span class=\"kb-math kb-math-inline\">\\beta</span> 接近，<span class=\"kb-math kb-math-inline\">a</span> 与 <span class=\"kb-math kb-math-inline\">b</span> 都接近 0.5。论文 Table 2 中三种方法的指数分别约为：Approach 1 为 <span class=\"kb-math kb-math-inline\">(0.50,0.50)</span>，Approach 2 为 <span class=\"kb-math kb-math-inline\">(0.49,0.51)</span>，Approach 3 为 <span class=\"kb-math kb-math-inline\">(0.46,0.54)</span>。这与 Kaplan 的 <span class=\"kb-math kb-math-inline\">(0.73,0.27)</span> 形成鲜明对比，也解释了为什么 GPT-3、Gopher、MT-NLG 这类约 300B token 训练的大模型在 Chinchilla 视角下是 undertrained。</p>\n<p>最有说服力的验证是 Chinchilla 本身。DeepMind 用与 Gopher 近似相同的计算预算，不训练 280B 参数模型，而是训练 70B 参数模型并使用 1.4T tokens。也就是说，它把预算从“更多参数”转移到“更多 token”。结果 Chinchilla 在许多语言建模、阅读理解、MMLU、BIG-bench 等评测上系统性超过 Gopher，同时参数量更小，推理和微调成本也更低。这个实验把 scaling law 从拟合曲线变成了可操作训练策略。</p>\n<p>从机制上看，Chinchilla 的直觉是平衡两种 excess loss。如果模型太小，<span class=\"kb-math kb-math-inline\">A/N^\\alpha</span> 是瓶颈；如果模型太大但 token 太少，<span class=\"kb-math kb-math-inline\">B/D^\\beta</span> 是瓶颈。compute-optimal 点不是最大模型，也不是最多 token，而是在二者边际收益相当的位置。经验上的 20 tokens/parameter 并不是硬编码常数，而是这些拟合参数、FLOPs 近似和当时数据分布共同导出的可用规则。</p>\n<div class=\"key-point\">💡 关键：Chinchilla Laws 的工程影响在于把“更大模型”改写为“参数和数据同步扩张”，直接改变了后续 LLM 预训练的预算规划、数据工程优先级和 overtraining 策略。</div>",
      "quiz": {
        "q": "Chinchilla Laws 相比 Kaplan Scaling Laws 的主要修正是什么？",
        "options": [
          "认为参数量和训练 token 数应随 compute 近似等比例增长",
          "认为 embedding 参数应计入主要规模律",
          "认为训练数据越少越能提升泛化",
          "认为固定 300B token 对所有模型都是 compute-optimal"
        ],
        "answer": 0,
        "explain": "Chinchilla 的三种估计方法都得到接近 0.5/0.5 的参数与数据 scaling 指数，说明许多旧模型参数过大、训练 token 不足。"
      }
    },
    {
      "id": "mup",
      "num": 3,
      "name": "μP/μTransfer",
      "fullName": "最大更新参数化 (Maximal Update Parameterization)",
      "year": "2022.03",
      "org": "Microsoft Research",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2203.03466",
      "projectUrl": "",
      "category": "scaling",
      "motivation": "实现超参数跨规模零次迁移",
      "summary": "μP（Maximal Update Parameterization）通过重新设计神经网络各层参数的初始化方差与学习率随宽度的缩放规则，使得最优超参数在不同模型规模间保持稳定，从而实现 **μTransfer**——在小模型上调优超参数后零次迁移到大模型，无需对大模型进行任何额外调参。",
      "keyPoints": [
        "<strong>abc-参数化框架</strong>：将参数化抽象为三元组 (a=参数乘子缩放, b=初始化方差缩放, c=学习率缩放)，SP 和 μP 都是其特例；论文证明 μP 是唯一允许超参数跨宽度零次迁移的 abc-参数化",
        "<strong>三类权重差异化缩放</strong>：将网络参数分为输入权重（含偏置）、隐藏权重、输出权重三类，分别制定不同的初始化方差和学习率缩放规则（Table 3）",
        "<strong>注意力缩放修正</strong>：Transformer 中注意力 logit 使用 <span class=\"kb-math kb-math-inline\">q^\\top k / d</span> 而非标准的 <span class=\"kb-math kb-math-inline\">q^\\top k / \\sqrt{d}</span>，确保训练中注意力分数随宽度稳定",
        "<strong>μTransfer 流程</strong>：三步法——(1) 用 μP 参数化目标模型，(2) 在小版本模型上调优超参数，(3) 将超参数直接复制到大模型",
        "<strong>可迁移超参数范围</strong>：学习率、动量、Adam beta、LR schedule、初始化方差、参数乘子等均可迁移；宽度、深度、batch size 等作为迁移维度",
        "<strong>Coord Check 诊断工具</strong>：通过检查各层激活值随宽度变化的稳定性，验证 μP 实现的正确性",
        "<strong>大规模验证</strong>：从 13M 参数迁移超参数超越 BERT-large (350M) 发布结果；从 40M 参数迁移超参数超越 GPT-3 6.7B 发布结果，调参成本仅为预训练的 7%"
      ],
      "detail": "<h5>动机：标准参数化的缺陷</h5>\n<p>在标准参数化（Standard Parameterization, SP）下，不同宽度的模型具有不同的最优学习率——随着模型变宽，最优学习率会发生漂移。这意味着在小模型上调好的超参数无法直接用于大模型，而大模型的超参数搜索代价极其昂贵。更严重的是，SP 下宽模型的训练激活值会在训练过程中发散（blow up），本质原因是各层的有效学习率不平衡。</p>\n<p><img alt=\"μTransfer 核心对比：SP vs μP 下学习率-损失曲线\" src=\"https://ar5iv.labs.arxiv.org/html/2203.03466/assets/x1.png\" />\n<em>图 1：不同宽度 Transformer 在 Adam 下的训练损失 vs 学习率。左图（SP）：不同宽度的最优学习率不一致，宽模型不一定优于窄模型；右图（μP）：最优学习率跨宽度稳定，宽模型始终更优。</em></p>\n<p><img alt=\"μTransfer 流程示意\" src=\"https://ar5iv.labs.arxiv.org/html/2203.03466/assets/x2.png\" />\n<em>图 2：μTransfer 流程——在小模型上进行超参数搜索，找到最优超参数后直接迁移到大模型。</em></p>\n<h5>μP 参数化规则</h5>\n<p>μP 的核心思想是：确保每一层在训练过程中的<strong>更新幅度</strong>（对激活值的影响）与宽度无关。具体地，对于一个宽度为 <span class=\"kb-math kb-math-inline\">n</span> 的网络，μP 将参数分为三类并分别制定缩放规则：</p>\n<p><strong>Table 3 核心规则（Adam 优化器）：</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th></th>\n<th>输入权重 &amp; 偏置</th>\n<th>输出权重</th>\n<th>隐藏权重</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>初始化方差</strong></td>\n<td><span class=\"kb-math kb-math-inline\">1/\\text{fan\\_in}</span></td>\n<td><span class=\"kb-math kb-math-inline\">1/\\text{fan\\_in}^2</span>（SP: <span class=\"kb-math kb-math-inline\">1/\\text{fan\\_in}</span>）</td>\n<td><span class=\"kb-math kb-math-inline\">1/\\text{fan\\_in}</span></td>\n</tr>\n<tr>\n<td><strong>Adam 学习率</strong></td>\n<td><span class=\"kb-math kb-math-inline\">1</span></td>\n<td><span class=\"kb-math kb-math-inline\">1/\\text{fan\\_in}</span>（SP: <span class=\"kb-math kb-math-inline\">1</span>）</td>\n<td><span class=\"kb-math kb-math-inline\">1/\\text{fan\\_in}</span>（SP: <span class=\"kb-math kb-math-inline\">1</span>）</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：在 SP 下，隐藏层和输出层的学习率相对于宽度过大，导致宽模型训练时激活值爆炸。μP 通过对输出权重和隐藏权重的学习率乘以 <span class=\"kb-math kb-math-inline\">1/\\text{fan\\_in}</span> 来补偿，确保参数更新对激活值的影响与宽度无关。</div>\n<p>对于一个简单的两隐藏层 MLP（宽度 <span class=\"kb-math kb-math-inline\">n</span>），μP 的基本形式为：</p>\n<div class=\"kb-math kb-math-display\">W^1 \\sim \\mathcal{N}(0, 1/d_{in}), \\quad W^2 \\sim \\mathcal{N}(0, 1/n), \\quad W^3 \\sim \\mathcal{N}(0, 1/n^2)</div>\n<p>SGD 学习率分别为：</p>\n<div class=\"kb-math kb-math-display\">\\eta_{W^1} = \\eta_{b^1} = \\eta_{b^2} = \\eta \\cdot n, \\quad \\eta_{W^2} = \\eta, \\quad \\eta_{W^3} = \\eta \\cdot n^{-1}</div>\n<h5>Transformer 特殊处理：注意力缩放</h5>\n<p>标准 Transformer 中注意力分数计算为 <span class=\"kb-math kb-math-inline\">q^\\top k / \\sqrt{d}</span>，其中 <span class=\"kb-math kb-math-inline\">d</span> 是 head 维度。这一缩放基于初始化时 <span class=\"kb-math kb-math-inline\">q</span> 和 <span class=\"kb-math kb-math-inline\">k</span> 不相关的假设（中心极限定理）。然而在训练过程中，<span class=\"kb-math kb-math-inline\">q</span> 和 <span class=\"kb-math kb-math-inline\">k</span> 会变得相关，此时 <span class=\"kb-math kb-math-inline\">q^\\top k</span> 实际上按 <span class=\"kb-math kb-math-inline\">d</span>（而非 <span class=\"kb-math kb-math-inline\">\\sqrt{d}</span>）的量级增长（大数定律）。因此 μP 要求：</p>\n<div class=\"kb-math kb-math-display\">\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^\\top}{d}\\right)V</div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：这里使用 <span class=\"kb-math kb-math-inline\">1/d</span> 而非 <span class=\"kb-math kb-math-inline\">1/\\sqrt{d}</span>，这是 μP 在 Transformer 上的关键修改，确保注意力 logit 在训练过程中不随宽度发散。</div>\n<h5>μTransfer 算法</h5>\n<pre><code class=\"language-python\"># Algorithm 1: μTransfer — 通过小模型调优大模型超参数\n# 输入：目标大模型架构 M_target\n\n# Step 1: 用 μP 参数化目标模型\nmodel_target = apply_muP(M_target)  # 修改初始化方差和学习率缩放\n\n# Step 2: 构建小版本模型并调优\nmodel_small = shrink(M_target, width=small_width)  # 缩小宽度（和/或深度）\nmodel_small = apply_muP(model_small)\nbest_hps = hyperparameter_search(model_small)  # 在小模型上搜索最优 HP\n# 可调参数：学习率、LR schedule、初始化方差、正则化等\n\n# Step 3: 零次迁移\nmodel_target.set_hyperparameters(best_hps)  # 直接复制，无需修改\ntrain(model_target)  # 以迁移的超参数训练大模型\n</code></pre>\n<h5>abc-参数化理论框架</h5>\n<p>论文将参数化形式化为 <strong>abc-参数化</strong>：对于每个参数张量，定义三个缩放指数：\n- <strong>a</strong>（参数乘子）：前向传播中参数的缩放因子\n- <strong>b</strong>（初始化）：初始化标准差随宽度的缩放\n- <strong>c</strong>（学习率）：学习率随宽度的缩放</p>\n<p>SP 和 μP 都是 abc-参数化的特例。论文的核心理论结果是：<strong>μP 是唯一允许超参数零次迁移的 abc-参数化</strong>。直觉上，只有当每层的\"特征学习\"强度（即参数更新对激活值的影响）与宽度无关时，最优超参数才能跨宽度保持稳定。SP 下隐藏层实际上退化为\"核regime\"（kernel regime），即特征几乎不更新，而 μP 确保了\"最大化\"的特征学习。</p>\n<div class=\"key-point\">💡 <strong>核心洞察</strong>：μP 不仅仅是让最优学习率可迁移——它还确保了宽模型能充分进行特征学习（而非退化为核方法），因此 μP 模型在最优超参数下通常<strong>优于</strong> SP 模型即使后者也经过了学习率调优。</div>\n<h5>Coord Check：实现正确性验证</h5>\n<p>论文提出了 <strong>Coord Check</strong>（坐标检查）作为验证 μP 实现正确性的诊断工具。其原理是：在 μP 下，各层激活值的坐标均值应在训练初期保持与宽度无关的稳定性。具体做法是：</p>\n<ol>\n<li>用不同宽度（如 64, 128, 256, ...）初始化模型</li>\n<li>训练若干步，记录每层激活值的坐标均值</li>\n<li>如果各宽度的曲线重合，说明 μP 实现正确；如果发散，说明存在缩放错误</li>\n</ol>\n<h5>与标准参数化的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>标准参数化 (SP)</th>\n<th>μP</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>最优 LR 随宽度</td>\n<td>漂移</td>\n<td>稳定</td>\n</tr>\n<tr>\n<td>宽模型特征学习</td>\n<td>退化（核 regime）</td>\n<td>最大化</td>\n</tr>\n<tr>\n<td>输出层初始化</td>\n<td><span class=\"kb-math kb-math-inline\">1/\\text{fan\\_in}</span></td>\n<td><span class=\"kb-math kb-math-inline\">1/\\text{fan\\_in}^2</span></td>\n</tr>\n<tr>\n<td>隐藏层 Adam LR</td>\n<td>固定</td>\n<td><span class=\"kb-math kb-math-inline\">\\propto 1/\\text{fan\\_in}</span></td>\n</tr>\n<tr>\n<td>注意力缩放</td>\n<td><span class=\"kb-math kb-math-inline\">1/\\sqrt{d}</span></td>\n<td><span class=\"kb-math kb-math-inline\">1/d</span></td>\n</tr>\n<tr>\n<td>超参数迁移</td>\n<td>不可靠</td>\n<td>零次迁移</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "在 μP 中，Transformer 的注意力 logit 缩放因子应使用什么？",
        "options": [
          "1/√d，与标准 Transformer 相同",
          "1/d，因为训练中 query 和 key 相关导致内积按 d 量级增长",
          "1/d²，为了进一步抑制注意力分数的方差",
          "不需要缩放，μP 的学习率调整已经补偿了这一点"
        ],
        "answer": 1,
        "explain": "训练过程中 q 和 k 变得相关，q⊤k 按 d（而非 √d）量级增长（大数定律而非中心极限定理），因此需要除以 d 而非 √d 来保持注意力 logit 的稳定性。"
      }
    },
    {
      "id": "data_constrained_scaling",
      "num": 4,
      "name": "数据受限规模定律",
      "fullName": "数据受限规模定律 (Scaling Data-Constrained Language Models)",
      "year": "2023.05",
      "org": "HuggingFace",
      "parent": "chinchilla_law",
      "paperUrl": "https://arxiv.org/abs/2305.16264",
      "projectUrl": "",
      "category": "scaling",
      "motivation": "揭示数据重复训练的衰减幂律",
      "summary": "数据受限规模定律将 Chinchilla 的 \\(L(N,D)\\) 扩展到“有限唯一数据、多 epoch 重复训练”的场景，用有效数据量 \\(D'\\) 和有效参数量 \\(N'\\) 描述重复 token 与过量参数的边际价值衰减。它解决了高质量文本即将耗尽时，LLM 应如何在重复数据、扩大参数和继续增加 compute 之间分配预算的问题。",
      "keyPoints": [
        "针对 Chinchilla 默认“训练 token 足够且近似唯一”的限制，研究数据受限 regime 下的 compute allocation 与 return。",
        "训练 400+ 个模型，规模从 10M 到 9B 参数，总训练 token 最高约 900B，重复 epoch 最高达 1500。",
        "将总 token <span class=\"kb-math kb-math-inline\">D</span> 拆成唯一 token <span class=\"kb-math kb-math-inline\">U_D</span> 和重复次数 <span class=\"kb-math kb-math-inline\">R_D</span>，其中 <span class=\"kb-math kb-math-inline\">U_D=\\min(D_C,D)</span>、<span class=\"kb-math kb-math-inline\">R_D=D/U_D-1</span>。",
        "用指数衰减定义有效数据 <span class=\"kb-math kb-math-inline\">D&#x27;=U_D+U_D R_D^*(1-e^{-R_D/R_D^*})</span>，刻画重复 token 价值逐步下降。",
        "对参数也引入对称的有效参数 <span class=\"kb-math kb-math-inline\">N&#x27;=U_N+U_N R_N^*(1-e^{-R_N/R_N^*})</span>，刻画数据受限时过量参数的收益递减。",
        "损失函数沿用 Chinchilla 结构：<span class=\"kb-math kb-math-inline\">L=A/(N&#x27;)^\\alpha+B/(D&#x27;)^\\beta+E</span>。",
        "实验发现最多约 4 epochs 的重复训练与使用新数据相比损失差异很小；约 16 epochs 后收益快速衰减。",
        "拟合得到 <span class=\"kb-math kb-math-inline\">R_D^*\\approx15.39</span>、<span class=\"kb-math kb-math-inline\">R_N^*\\approx5.31</span>，说明过量参数比重复数据更快进入收益递减，因此数据受限时应相对更快增加 epoch。",
        "补充研究代码数据混合、perplexity filtering、deduplication 等缓解数据稀缺的策略。"
      ],
      "detail": "<p><img alt=\"Data-Constrained Scaling Laws Figure 1\" src=\"https://github.com/huggingface/datablations/raw/main/plotstables/return_alloc.png\" />\n<em>图：官方仓库中的 Figure 1 展示重复数据的 return 和 allocation。左图显示 4 epochs 内重复几乎像新数据一样有效，右图显示数据受限 frontier 会偏向更小模型与更多重复 token。</em></p>\n<pre><code class=\"language-python\"># Data-Constrained Scaling Laws 的核心拟合与决策伪代码\ndef effective_data(unique_tokens, repeat_count, R_D_star):\n    # D' = U_D + U_D * R_D* * (1 - exp(-R_D / R_D*))\n    return unique_tokens + unique_tokens * R_D_star * (1 - exp(-repeat_count / R_D_star))\n\ndef effective_params(unique_params, param_repeat, R_N_star):\n    # N' = U_N + U_N * R_N* * (1 - exp(-R_N / R_N*))\n    return unique_params + unique_params * R_N_star * (1 - exp(-param_repeat / R_N_star))\n\ndef data_constrained_loss(N, D, data_budget, chinchilla_fit, R_D_star, R_N_star):\n    U_D = min(data_budget, D)\n    R_D = D / U_D - 1\n\n    # U_N 是在 U_D 唯一 token 下的 Chinchilla compute-optimal 参数量上限\n    U_N = min(chinchilla_N_opt_for_tokens(U_D), N)\n    R_N = N / U_N - 1\n\n    D_eff = effective_data(U_D, R_D, R_D_star)\n    N_eff = effective_params(U_N, R_N, R_N_star)\n    return chinchilla_fit.E + chinchilla_fit.A / (N_eff ** chinchilla_fit.alpha) + chinchilla_fit.B / (D_eff ** chinchilla_fit.beta)\n\nfor C in compute_budgets:\n    # 在 FLOPs(N,D) ≈ 6ND 且 U_D &lt;= D_C 的约束下搜索最小预测 loss\n    best = argmin(lambda N, D: data_constrained_loss(N, D, D_C, fit, R_D_star, R_N_star),\n                  constraint=lambda N, D: close(6 * N * D, C))\n</code></pre>\n<p>这篇论文的动机来自 Chinchilla 的外推悖论：如果 compute-optimal 训练要求参数和 token 近似等比例增长，那么超大模型会需要数万亿乃至更多高质量 token；但真实世界中，高质量自然语言数据是有限的。问题不再是“给定 compute 训练多大模型”，而是“给定 compute 和唯一数据预算 <span class=\"kb-math kb-math-inline\">D_C</span>，重复数据是否仍有价值，以及该如何分配参数和 epoch”。</p>\n<p>作者首先把数据项拆开。设总训练 token 为 <span class=\"kb-math kb-math-inline\">D</span>，可用唯一数据预算为 <span class=\"kb-math kb-math-inline\">D_C</span>，则：</p>\n<div class=\"kb-math kb-math-display\">U_D=\\min\\{D_C,D\\},\\quad R_D=\\frac{D}{U_D}-1</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">U_D</span> 是实际用到的唯一 token 数，<span class=\"kb-math kb-math-inline\">R_D</span> 是重复次数，也就是 epochs 减 1。单 epoch 时 <span class=\"kb-math kb-math-inline\">R_D=0</span>，完全退化回 Chinchilla 的无限数据假设。数据受限优化目标变为：</p>\n<div class=\"kb-math kb-math-display\">\\operatorname*{argmin}_{N,D} L(N,D)\\quad \\text{s.t.}\\quad \\mathrm{FLOPs}(N,D)=C,\\ U_D\\le D_C</div>\n<p>核心机制是“有效数据量”而不是原始 token 计数。重复 token 的价值不是 0，也不是与新 token 完全相同，而是随重复次数指数衰减：</p>\n<div class=\"kb-math kb-math-display\">D&#x27;=U_D+U_D R_D^*\\left(1-e^{-R_D/R_D^*}\\right)</div>\n<p>当 <span class=\"kb-math kb-math-inline\">R_D=0</span> 时，<span class=\"kb-math kb-math-inline\">D&#x27;=U_D=D</span>。当 <span class=\"kb-math kb-math-inline\">R_D\\ll R_D^*</span> 时，<span class=\"kb-math kb-math-inline\">1-e^{-R_D/R_D^*}\\approx R_D/R_D^*</span>，所以 <span class=\"kb-math kb-math-inline\">D&#x27;\\approx U_D(1+R_D)=D</span>，重复数据近似等同新数据。随着 <span class=\"kb-math kb-math-inline\">R_D</span> 变大，第二项逐渐饱和在 <span class=\"kb-math kb-math-inline\">U_D R_D^*</span>，意味着无限重复同一批数据也不可能无限降低 loss。</p>\n<p>论文还为参数引入对称形式。给定唯一数据 <span class=\"kb-math kb-math-inline\">U_D</span>，先根据 Chinchilla frontier 计算适合这些唯一数据的“基础参数量” <span class=\"kb-math kb-math-inline\">U_N</span>，再把真实参数量 <span class=\"kb-math kb-math-inline\">N</span> 表示为 <span class=\"kb-math kb-math-inline\">U_N</span> 的重复/超额：</p>\n<div class=\"kb-math kb-math-display\">R_N=\\frac{N}{U_N}-1</div>\n<div class=\"kb-math kb-math-display\">N&#x27;=U_N+U_N R_N^*\\left(1-e^{-R_N/R_N^*}\\right)</div>\n<p>这个项的直觉是：当数据非常有限时，继续扩大模型并不会像无限数据条件下那样有效，因为新增参数缺少足够多样的监督信号。最终损失函数延续 Chinchilla 的三项分解：</p>\n<div class=\"kb-math kb-math-display\">L(N,D)=E+\\frac{A}{(N&#x27;)^\\alpha}+\\frac{B}{(D&#x27;)^\\beta}</div>\n<p>论文基于 C4 重新拟合 Chinchilla 型基础参数，给出一个用于计算的形式：</p>\n<div class=\"kb-math kb-math-display\">L(N,D)=1.87+\\frac{521}{N^{0.353}}+\\frac{1488}{D^{0.353}}</div>\n<p>在重复数据扩展中，再把 <span class=\"kb-math kb-math-inline\">N</span> 与 <span class=\"kb-math kb-math-inline\">D</span> 替换成 <span class=\"kb-math kb-math-inline\">N&#x27;</span> 与 <span class=\"kb-math kb-math-inline\">D&#x27;</span>。作者用 LBFGS 在 182 个样本上拟合衰减常数，得到 <span class=\"kb-math kb-math-inline\">R_D^*\\approx15.3878</span>、<span class=\"kb-math kb-math-inline\">R_N^*\\approx5.3097</span>。这意味着重复数据的“半衰期”更长，而过量参数更快失去边际价值；因此在数据受限、继续增加 compute 时，efficient frontier 会偏向增加 epochs，而不是按 Chinchilla 假设同等增加参数。</p>\n<p>实验结论可以分成 return 和 allocation 两类。Return 问题问“重复数据还值不值”：4.2B 参数模型训练 4 epochs 时，最终验证损失只比单 epoch 唯一数据高约 0.5%，说明少量重复很安全；但重复次数继续增加后，loss 曲线逐渐变平，约 16 epochs 附近进入明显收益递减，40 epochs 左右重复几乎不再带来有效改进。Allocation 问题问“compute 怎么花”：在固定唯一数据预算下，单 epoch compute-optimal 模型会严重低估可从数据中榨取的信号，适当增加参数和 epoch 都有必要，但 epoch 应该增长得略快。</p>\n<p>与 Chinchilla 相比，这篇论文不是推翻“参数与数据平衡”，而是给平衡关系增加了数据约束条件。Chinchilla 假设每个 token 都是新信息；Data-Constrained Scaling 说如果 token 是重复的，就要先折算成 <span class=\"kb-math kb-math-inline\">D&#x27;</span>。这让 scaling law 能回答更实际的问题：低资源语言、垂直领域、小语料高质量数据、经过严格过滤的数据集，在无法继续收集同质量文本时仍能通过有限重复获得收益，但不能无限重复。</p>\n<div class=\"warn-box\">⚠️ 注意：论文的结论不是“重复数据总是无害”。它强调的是全量数据重复、少量 epochs 时收益接近新数据；当重复过多或出现局部重复/记忆化时，收益会快速衰减甚至可能出现训练不稳定。</div>",
      "quiz": {
        "q": "数据受限规模定律中，有效数据量 D' 的主要作用是什么？",
        "options": [
          "把重复 token 按指数衰减折算，避免把多 epoch 数据视为完全等价的新数据",
          "把所有重复 token 完全丢弃，只保留第一轮 epoch",
          "只统计 embedding 参数对应的 token",
          "强制所有模型都训练 exactly 20 tokens/parameter"
        ],
        "answer": 0,
        "explain": "D'=U_D+U_D R_D^*(1-e^{-R_D/R_D^*}) 描述重复 token 的边际价值从近似新数据逐渐衰减到饱和。"
      }
    },
    {
      "id": "t2_scaling",
      "num": 5,
      "name": "T²缩放定律",
      "fullName": "T²缩放定律 (Train-to-Test Scaling Laws)",
      "year": "2026",
      "org": "多机构",
      "parent": "chinchilla_law",
      "paperUrl": "https://www.machinelearningplus.com/llm/llm-scaling-laws/",
      "projectUrl": "",
      "category": "scaling",
      "motivation": "推理最优的过度训练策略",
      "summary": "T² 缩放定律把模型参数量 \\(N\\)、预训练 token 数 \\(D\\) 和测试时重复采样次数 \\(k\\) 放进同一个端到端算力约束中联合优化，解决了 Chinchilla 只优化训练而忽略推理成本的问题。它的核心结论是：当部署阶段会使用 pass@k 或重复采样时，更小但训练更久的过度训练模型往往比 Chinchilla 最优模型更符合总成本最优。",
      "keyPoints": [
        "将预训练缩放和测试时缩放合并为一个联合决策问题：同时选择 <span class=\"kb-math kb-math-inline\">N</span>、<span class=\"kb-math kb-math-inline\">D</span>、<span class=\"kb-math kb-math-inline\">k</span>。",
        "显式计入两类成本：训练成本近似为 <span class=\"kb-math kb-math-inline\">6ND</span>，重复采样推理成本近似为 <span class=\"kb-math kb-math-inline\">2Nk</span>。",
        "用 pass@k 描述测试时重复采样收益：采样越多，至少一次答对的概率以非线性方式上升。",
        "提出两条互补建模路线：基于 NLL/任务损失的 Approach 1，以及直接建模 pass@k 准确率的 Approach 2。",
        "在超过 100 个模型检查点、12 个训练算力层级和 8 个任务上拟合缩放关系，并额外训练 21 个重度过度训练检查点做外推验证。",
        "结论稳定指向小模型高 token/parameter 比例：在固定推理预算下，较小模型能获得更多 <span class=\"kb-math kb-math-inline\">k</span>，因此总性能-成本前沿向过度训练区域移动。",
        "后训练后趋势仍然存在：FT/SFT 会削弱一部分过度训练收益，但不会把最优点拉回 Chinchilla 的约 20 tokens/parameter 规则。"
      ],
      "detail": "<p><img alt=\"T² 缩放定律框架图\" src=\"https://arxiv.org/html/2604.01411v1/x1.png\" />\n<em>图：T² 将 Chinchilla 训练缩放和 pass@k 测试时缩放组合起来，在给定训练预算和推理预算下寻找新的预训练最优配置。</em></p>\n<p>任务 JSON 给出的 <code>paper_url</code> 是缩放定律综述页；这里的精读对象是其中对应的原始论文 <em>Test-Time Scaling Makes Overtraining Compute-Optimal</em>，arXiv 链接为 <code>https://arxiv.org/abs/2604.01411</code>。论文要回答的问题非常具体：如果一个模型上线后会被重复采样很多次，那么训练时还应该继续遵循 Chinchilla 的“训练算力最优”比例吗？T² 的答案是否定的，因为 Chinchilla 默认每个模型只被查询一次，完全没有把小模型单次推理更便宜、因此可以多采样的事实放入优化目标。</p>\n<pre><code class=\"language-python\"># T² 联合训练-测试缩放伪代码\n# 输入：候选模型尺寸 N_grid、训练 token D_grid、训练预算 C_train、推理预算 C_inf\n# 输出：在端到端预算下最优的 N, D, k\n\nfit_chinchilla_or_task_model(checkpoints)  # 从缩放检查点拟合 N,D -&gt; loss/accuracy\nfit_passk_model(eval_samples)              # 从多次采样结果拟合 k -&gt; pass@k\n\nbest = None\nfor N in N_grid:\n    for D in D_grid:\n        if 6 * N * D &gt; C_train:\n            continue\n\n        # 关键推理成本修正：小模型单次采样更便宜，所以 k 更大\n        k = floor(C_inf / (2 * N))\n        if k &lt; 1:\n            continue\n\n        # Approach 1: 预测 NLL 或任务损失，越低越好\n        loss_score = predict_loss(N, D, k)\n\n        # Approach 2: 预测 pass@k accuracy，越高越好\n        acc_score = predict_passk_accuracy(N, D, k)\n\n        candidate = combine_or_compare(loss_score, acc_score)\n        best = arg_optimal(best, candidate, N, D, k)\n\nreturn best.N, best.D, best.k\n</code></pre>\n<p>传统 Chinchilla 缩放律把预训练损失写成参数量和数据量的可加幂律：</p>\n<div class=\"kb-math kb-math-display\">L(N,D)=E+\\frac{A}{N^{\\alpha}}+\\frac{B}{D^{\\beta}}.</div>\n<p>在只考虑训练预算 <span class=\"kb-math kb-math-inline\">C_{\\text{train}}\\approx 6ND</span> 时，最优解通常让模型规模和训练 token 数随预算以相近指数增长，即直觉上的“模型和数据一起变大”。T² 的关键改动是把推理也变成约束：</p>\n<div class=\"kb-math kb-math-display\">\\min_{N,D,k} L(N,D,k)\\quad \\text{s.t.}\\quad 6ND\\le C_{\\text{train}},\\quad 2Nk\\le C_{\\text{inf}}.</div>\n<p>如果直接优化准确率，则相应写成：</p>\n<div class=\"kb-math kb-math-display\">\\max_{N,D,k}\\;\\text{Acc}(N,D,k)\\quad \\text{s.t.}\\quad 6ND\\le C_{\\text{train}},\\quad 2Nk\\le C_{\\text{inf}}.</div>\n<p>这里的 <span class=\"kb-math kb-math-inline\">2Nk</span> 是简化的单 token 前向推理成本乘以采样数。它改变了最优点的方向：当 <span class=\"kb-math kb-math-inline\">C_{\\text{inf}}</span> 固定时，<span class=\"kb-math kb-math-inline\">k=\\lfloor C_{\\text{inf}}/(2N)\\rfloor</span>，所以小模型天然能被采样更多次。小模型单次正确率较低，但 pass@k 的收益不是线性的，重复采样可能补回甚至超过单次质量差距。</p>\n<p>pass@k 的基本机制是：对同一题采样 <span class=\"kb-math kb-math-inline\">k</span> 次，只要有一次正确就算成功。如果第 <span class=\"kb-math kb-math-inline\">i</span> 个问题单次采样正确率是 <span class=\"kb-math kb-math-inline\">p_i</span>，那么：</p>\n<div class=\"kb-math kb-math-display\">\\text{pass@}k_i = 1-(1-p_i)^k.</div>\n<p>在包含 <span class=\"kb-math kb-math-inline\">M</span> 个问题的基准 <span class=\"kb-math kb-math-inline\">\\mathcal{D}</span> 上，期望 pass@k 为：</p>\n<div class=\"kb-math kb-math-display\">\\text{pass@}k_{\\mathcal{D}}=\\frac{1}{M}\\sum_{i=1}^{M}\\left[1-(1-p_i)^k\\right].</div>\n<p>这条公式解释了为什么 T² 会偏好过度训练。对一个大模型，<span class=\"kb-math kb-math-inline\">p_i</span> 可能更高，但 <span class=\"kb-math kb-math-inline\">k</span> 很小；对一个小模型，<span class=\"kb-math kb-math-inline\">p_i</span> 较低，但 <span class=\"kb-math kb-math-inline\">k</span> 可以大很多。只要任务存在“多试几次能找到正确轨迹”的空间，后者就可能在相同推理 FLOPs 下占优。</p>\n<p>论文使用两种建模方式来避免单一指标带来的偏差。Approach 1 从损失角度建模，把 repeated sampling 对负对数 pass@k 的改善并入 <span class=\"kb-math kb-math-inline\">L(N,D,k)</span>，可以理解为在 Chinchilla 的 <span class=\"kb-math kb-math-inline\">N,D</span> 幂律上增加一个随 <span class=\"kb-math kb-math-inline\">k</span> 改善的测试时缩放项。Approach 2 则直接建模准确率，先拟合 <span class=\"kb-math kb-math-inline\">N,D</span> 对单次能力的影响，再用 Beta 分布刻画题目难度和单题成功概率的分布：</p>\n<div class=\"kb-math kb-math-display\">p\\sim \\text{Beta}(a_{N,D}, b_{N,D}),\\qquad\n\\mathbb{E}[\\text{pass@}k]=1-\\frac{\\mathrm{B}(a_{N,D}, b_{N,D}+k)}{\\mathrm{B}(a_{N,D}, b_{N,D})}.</div>\n<p>两个路线虽然拟合对象不同，一个偏连续损失，一个偏离散成功率，但都给出相同方向的建议：一旦加入推理预算，最优预训练配置会比 Chinchilla 更小、更久训、更高 tokens/parameter。</p>\n<p>实验上，论文先用常规 Chinchilla 缩放检查点拟合模型，再向过度训练区域外推。为了验证不是曲线拟合幻觉，作者额外训练了 21 个超出标准缩放套件的过度训练检查点。结果显示，在固定 <span class=\"kb-math kb-math-inline\">C_{\\text{train}}=2.56\\times10^{19}</span> 且 <span class=\"kb-math kb-math-inline\">C_{\\text{inf}}=2\\times10^9</span> FLOPs 的比较下，小型过度训练模型在 8 个任务上都优于经验上的 Chinchilla 最优检查点。例如 LAMBADA 上 37M 过度训练模型优于 455M Chinchilla 检查点，Simple Reasoning 上 37M 过度训练模型也显著优于 901M 检查点。</p>\n<div class=\"key-point\">💡 关键：T² 中的“过度训练”不是训练集过拟合的意思，而是相对 Chinchilla 推荐的 token/parameter 比例训练更久。它牺牲了一部分训练阶段的单次最优性，换取部署阶段更低的单样本成本和更多测试时采样机会。</div>\n<p>与传统缩放律相比，T² 的主要创新不是发明新的模型结构，而是把“训练什么模型”和“部署时怎么用模型”合并成一个优化问题。Chinchilla 适合一次查询或推理预算可忽略的场景；T² 适合推理密集、会做 self-consistency、best-of-N、生成-验证或 pass@k 的场景。对于推理模型、代码模型、数学模型和 agent 任务，测试时采样往往是主性能杠杆，因此 T² 给出的是更接近真实部署成本的训练规划方法。</p>",
      "quiz": {
        "q": "T² 缩放定律为什么会推荐比 Chinchilla 更小但训练更久的模型？",
        "options": [
          "因为小模型的单次输出准确率一定高于大模型",
          "因为在固定推理预算下，小模型单次采样更便宜，可以获得更大的 k，并通过 pass@k 弥补单次质量差距",
          "因为 T² 完全不考虑训练成本，只优化推理成本",
          "因为过度训练会减少模型参数量"
        ],
        "answer": 1,
        "explain": "T² 同时约束训练成本 6ND 和推理成本 2Nk；当 N 变小时，同一推理预算能支持更多采样，pass@k 的非线性收益会把最优点推向小模型过度训练区域。"
      }
    },
    {
      "id": "u_mup",
      "num": 6,
      "name": "u-μP",
      "fullName": "单位缩放μP (Unit-Scaled Maximal Update Parametrization)",
      "year": "2025.11",
      "org": "OPT-ML",
      "parent": "mup",
      "paperUrl": "https://opt-ml.org/papers/2024/paper_26.pdf",
      "projectUrl": "",
      "category": "scaling",
      "motivation": "单位缩放支持FP8稳定训练",
      "summary": "u-μP 将 Unit Scaling 技术融入 μP（Maximal Update Parametrization）框架，通过 abc-对称性消除初始化缩放超参、移除 base-shape 依赖、重新设计 α 缩放因子体系，使得超参数搜索可在极小代理模型上以近乎独立的一维扫描高效完成，并原生支持 FP8 低精度训练，在 7B 规模 LLM 上验证了从小模型到大模型的超参迁移有效性。",
      "keyPoints": [
        "<strong>abc-参数化统一框架</strong>：将权重矩阵的前向缩放 <span class=\"kb-math kb-math-inline\">a_W</span>、初始化缩放 <span class=\"kb-math kb-math-inline\">b_W</span>、学习率缩放 <span class=\"kb-math kb-math-inline\">c_W</span> 纳入统一的 abc-参数化体系，揭示三者之间存在 abc-对称性（可在保持训练动态不变的前提下重新分配缩放）",
        "<strong>消除 <span class=\"kb-math kb-math-inline\">\\sigma_W</span> 超参</strong>：利用 abc-对称性将初始化标准差固定为 1（unit init），从而减少一个需要调优的超参维度",
        "<strong>移除 base-shape 依赖</strong>：标准 μP 需要指定一个\"基础模型宽度\"来定义缩放基准，u-μP 通过将缩放因子直接嵌入前向传播（Unit Scaling 风格）完全消除此依赖",
        "<strong>重新定义 α 缩放因子</strong>：将 α 与操作（而非权重）关联，定义 6 个独立的 α 超参：<span class=\"kb-math kb-math-inline\">\\alpha_{\\text{ffn-act}}</span>、<span class=\"kb-math kb-math-inline\">\\alpha_{\\text{attn-softmax}}</span>、<span class=\"kb-math kb-math-inline\">\\alpha_{\\text{out}}</span>、<span class=\"kb-math kb-math-inline\">\\alpha_{\\text{res}}</span>、<span class=\"kb-math kb-math-inline\">\\alpha_{\\text{res-attn-ratio}}</span>、<span class=\"kb-math kb-math-inline\">\\alpha_{\\text{loss-softmax}}</span>",
        "<strong>新的 Embedding 学习率规则</strong>：提出 <span class=\"kb-math kb-math-inline\">c_{\\text{emb}} = 1/\\sqrt{d_{\\text{model}}}</span> 的 embedding 层学习率缩放，修正了标准 μP 中 embedding 学习率不随宽度缩放的问题",
        "<strong>独立超参搜索策略</strong>：证明 u-μP 下超参近乎独立，可先扫描学习率（9 次运行），再对其他 α 参数进行独立一维扫描，总搜索成本极低",
        "<strong>原生 FP8 支持</strong>：约 70% 矩阵乘法可直接转为 FP8，仅需保留少数关键张量（注意力 dense 投影、最终 FFN 层、decoder head）为高精度",
        "<strong>大规模验证</strong>：在 1B/3B/7B 参数的 Llama 风格模型上（SlimPajama 300B tokens）验证了超参迁移和 FP8 训练的有效性"
      ],
      "detail": "<h5>核心框架示意</h5>\n<p><img alt=\"u-μP 主要实验结果\" src=\"https://ar5iv.labs.arxiv.org/html/2407.17465v3/assets/x1.png\" />\n<em>图 1：u-μP 的三大核心优势——(a) 高效超参搜索：仅需 9 次 LR 扫描即可接近完整网格搜索效果；(b) 超参从小模型到大模型的可靠迁移；(c) FP8 低精度训练的原生支持</em></p>\n<h5>abc-参数化与对称性</h5>\n<p>u-μP 的理论基础是 <strong>abc-参数化</strong>。对于一个权重矩阵 <span class=\"kb-math kb-math-inline\">W</span>，其在前向传播中的实际作用可以表示为：</p>\n<div class=\"kb-math kb-math-display\">y = a_W \\cdot (x \\cdot W)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">W</span> 的初始化为 <span class=\"kb-math kb-math-inline\">W_{ij} \\sim \\mathcal{N}(0, b_W^2)</span>，学习率为 <span class=\"kb-math kb-math-inline\">\\eta \\cdot c_W</span>。这三个缩放因子 <span class=\"kb-math kb-math-inline\">(a_W, b_W, c_W)</span> 完全决定了该层的训练动态。</p>\n<div class=\"key-point\">💡 <strong>关键洞察——abc-对称性</strong>：对于任意正实数 <span class=\"kb-math kb-math-inline\">\\lambda</span>，变换 <span class=\"kb-math kb-math-inline\">a_W \\to \\lambda \\cdot a_W</span>，<span class=\"kb-math kb-math-inline\">b_W \\to b_W / \\lambda</span>，<span class=\"kb-math kb-math-inline\">c_W \\to c_W / \\lambda</span> 不改变训练动态。这意味着我们可以自由地在三个缩放因子之间\"搬运\"尺度。</div>\n<p>利用这一对称性，u-μP 做出了一个关键选择：<strong>固定 <span class=\"kb-math kb-math-inline\">b_W = 1</span></strong>（即所有权重以标准正态分布初始化）。这不仅消除了初始化标准差这个超参，还使得权重天然处于 FP8 的有效表示范围内。</p>\n<h5>u-μP 缩放规则</h5>\n<p>基于 abc-对称性和 Unit Scaling 原则，u-μP 为 Transformer 的不同层定义了如下缩放规则：</p>\n<pre><code>┌─────────────────────────────────────────────────────────────┐\n│                    u-μP 缩放规则 (Table 2)                    │\n├──────────┬──────────────┬────────┬──────────────────────────┤\n│  层类型   │  前向缩放 aW  │ 初始化 bW │  学习率缩放 cW            │\n├──────────┼──────────────┼────────┼──────────────────────────┤\n│ Hidden   │ 1/√fan_in    │   1    │  η / √fan_in             │\n│ Input    │ 1            │   1    │  η / √fan_out  (新规则!)  │\n│ Output   │ 1/fan_in     │   1    │  η / √depth              │\n├──────────┴──────────────┴────────┴──────────────────────────┤\n│ 残差连接缩放：1/√depth                                       │\n└─────────────────────────────────────────────────────────────┘\n</code></pre>\n<p>对应的伪代码实现：</p>\n<pre><code class=\"language-python\"># u-μP Transformer 前向传播伪代码\ndef u_mup_transformer(x, layers, params):\n    &quot;&quot;&quot;\n    x: input token ids [batch, seq_len]\n    layers: list of transformer blocks\n    params: {W_emb, W_head, W_q, W_k, W_v, W_o, W_up, W_gate, W_down}\n    &quot;&quot;&quot;\n    depth = len(layers)\n    d_model = params.W_emb.shape[1]\n\n    # === Input Embedding (Input 层规则) ===\n    # aW=1, bW=1, cW=η/√fan_out=η/√d_model\n    h = x @ params.W_emb  # W_emb ~ N(0,1), LR = η/√d_model\n\n    for l in range(depth):\n        residual = h\n\n        # === RMSNorm (非参数化版本，对μP迁移至关重要) ===\n        h_norm = rms_norm(h)  # 无可学习的 γ 参数\n\n        # === Attention (Hidden 层规则) ===\n        # aW=1/√d_model, bW=1, cW=η/√d_model\n        Q = (1/sqrt(d_model)) * (h_norm @ params.W_q[l])\n        K = (1/sqrt(d_model)) * (h_norm @ params.W_k[l])\n        V = (1/sqrt(d_model)) * (h_norm @ params.W_v[l])\n\n        # Scaled dot-product attention\n        # α_attn_softmax 控制 softmax 温度\n        attn_logits = Q @ K.T  # 已经被 1/√d 缩放过\n        attn_logits = attn_logits * alpha_attn_softmax\n        attn_weights = softmax(attn_logits)\n        attn_out = attn_weights @ V\n\n        # Output projection (Hidden 层规则)\n        attn_out = (1/sqrt(d_model)) * (attn_out @ params.W_o[l])\n\n        # === 残差连接 ===\n        # 缩放因子 1/√depth，α_res 和 α_res_attn_ratio 控制比例\n        h = residual + (1/sqrt(depth)) * alpha_res * attn_out\n\n        # === FFN (SwiGLU, Hidden 层规则) ===\n        residual = h\n        h_norm = rms_norm(h)\n\n        gate = (1/sqrt(d_model)) * (h_norm @ params.W_gate[l])\n        up   = (1/sqrt(d_model)) * (h_norm @ params.W_up[l])\n        # α_ffn_act 控制激活函数缩放\n        ffn_out = silu(gate * alpha_ffn_act) * up\n        ffn_out = (1/sqrt(d_ffn)) * (ffn_out @ params.W_down[l])\n\n        h = residual + (1/sqrt(depth)) * alpha_res * ffn_out\n\n    # === Output Head (Output 层规则) ===\n    # aW=1/fan_in=1/d_model, bW=1, cW=η/√depth\n    h_norm = rms_norm(h)\n    logits = (1/d_model) * (h_norm @ params.W_head)\n    logits = logits * alpha_out\n\n    # α_loss_softmax 控制 loss softmax 温度\n    loss = cross_entropy(logits * alpha_loss_softmax, targets)\n    return loss\n</code></pre>\n<h5>动机与背景：μP 的实际困境</h5>\n<p>μP（Maximal Update Parametrization）由 Yang et al. (2022) 提出，其核心承诺是：<strong>在小模型上搜索到的最优超参数可以直接迁移到大模型</strong>。然而在实际应用中，μP 面临四个严重问题：</p>\n<p><strong>问题 1：Llama 风格模型的迁移失败。</strong> 标准 μP 假设使用 LayerNorm，但现代 LLM（如 Llama）使用 RMSNorm 且带有可学习的缩放参数 <span class=\"kb-math kb-math-inline\">\\gamma</span>。论文发现，<strong>参数化的 norm 层会破坏 μP 的超参迁移性</strong>。解决方案是使用非参数化的 RMSNorm（去掉 <span class=\"kb-math kb-math-inline\">\\gamma</span>），并配合独立的 weight decay 设置。</p>\n<p><strong>问题 2：超参搜索空间不清晰。</strong> μP 引入了多个 α 缩放因子，但未明确哪些需要调优、哪些可以固定，且超参之间存在复杂的相互依赖关系。</p>\n<p><strong>问题 3：base-shape 的困扰。</strong> μP 需要指定一个\"基础模型\"的形状作为缩放参考点，这增加了使用复杂度且引入了额外的隐式超参。</p>\n<p><strong>问题 4：FP8 兼容性差。</strong> 标准 μP 的初始化标准差 <span class=\"kb-math kb-math-inline\">\\sigma_W</span> 随宽度缩放（如 <span class=\"kb-math kb-math-inline\">1/\\sqrt{d}</span>），在大模型中会变得极小，超出 FP8 的有效表示范围。</p>\n<h5>核心机制详解</h5>\n<p><strong>1. Unit Init 与 FP8 兼容性</strong></p>\n<p>通过 abc-对称性将 <span class=\"kb-math kb-math-inline\">b_W</span> 固定为 1，所有权重初始化为标准正态分布。这意味着权重值集中在 <span class=\"kb-math kb-math-inline\">[-3, 3]</span> 范围内，完美适配 FP8 E4M3 格式（范围 <span class=\"kb-math kb-math-inline\">[-448, 448]</span>）。相比之下，标准 μP 中 7B 模型的 hidden 层初始化标准差约为 <span class=\"kb-math kb-math-inline\">1/\\sqrt{4096} \\approx 0.0156</span>，大量权重值会落入 FP8 的低精度区域。</p>\n<p><strong>2. 新的 Embedding 学习率规则</strong></p>\n<p>标准 μP 中 embedding 层的学习率缩放为 <span class=\"kb-math kb-math-inline\">c_{\\text{emb}} = 1</span>（不随宽度变化），这导致 embedding 更新幅度随宽度增大而增大。u-μP 通过分析发现，正确的缩放应为：</p>\n<div class=\"kb-math kb-math-display\">c_{\\text{emb}} = \\frac{1}{\\sqrt{d_{\\text{model}}}}</div>\n<p>这确保了 embedding 层的更新幅度在不同宽度下保持一致。论文通过实验验证，这一修正显著改善了学习率从小模型到大模型的迁移效果。</p>\n<p><img alt=\"Embedding 学习率规则对比\" src=\"https://ar5iv.labs.arxiv.org/html/2407.17465v3/assets/x3.png\" />\n<em>图 3：不同 embedding 学习率规则下的 LR 迁移对比。u-μP 的新规则（右）相比标准 μP（左）实现了更一致的最优 LR 迁移</em></p>\n<p><strong>3. α 超参的重新设计</strong></p>\n<p>u-μP 将 α 缩放因子从\"与权重关联\"改为\"与操作关联\"，定义了 6 个语义清晰的 α 参数：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>α 参数</th>\n<th>作用位置</th>\n<th>物理含义</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><span class=\"kb-math kb-math-inline\">\\alpha_{\\text{ffn-act}}</span></td>\n<td>FFN 激活函数前</td>\n<td>控制 SwiGLU 激活的输入幅度</td>\n</tr>\n<tr>\n<td><span class=\"kb-math kb-math-inline\">\\alpha_{\\text{attn-softmax}}</span></td>\n<td>注意力 softmax 前</td>\n<td>控制注意力分布的锐度（温度）</td>\n</tr>\n<tr>\n<td><span class=\"kb-math kb-math-inline\">\\alpha_{\\text{out}}</span></td>\n<td>输出 logits</td>\n<td>控制 logits 的整体幅度</td>\n</tr>\n<tr>\n<td><span class=\"kb-math kb-math-inline\">\\alpha_{\\text{res}}</span></td>\n<td>残差连接</td>\n<td>控制残差分支的相对贡献</td>\n</tr>\n<tr>\n<td><span class=\"kb-math kb-math-inline\">\\alpha_{\\text{res-attn-ratio}}</span></td>\n<td>attention vs FFN 残差</td>\n<td>控制 attention 和 FFN 残差的相对比例</td>\n</tr>\n<tr>\n<td><span class=\"kb-math kb-math-inline\">\\alpha_{\\text{loss-softmax}}</span></td>\n<td>loss 计算的 softmax</td>\n<td>控制交叉熵 loss 的 softmax 温度</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键发现——超参独立性</strong>：在 u-μP 框架下，这些 α 参数与学习率之间近乎独立。这意味着可以先固定默认 α 值扫描最优 LR，然后独立地对每个 α 进行一维扫描，而不需要昂贵的联合网格搜索。</div>\n<p><strong>4. 独立超参搜索流程</strong></p>\n<p>论文提出了一个高效的两阶段搜索策略：</p>\n<ul>\n<li><strong>阶段 1</strong>：在小代理模型上，固定所有 α 为默认值，仅扫描学习率 η（约 9 个值）</li>\n<li><strong>阶段 2</strong>：固定最优 η，对每个 α 参数独立进行一维扫描（每个约 5 个值）</li>\n</ul>\n<p>由于各 α 参数独立，阶段 2 的所有扫描可以<strong>并行执行</strong>。总搜索成本仅为 <span class=\"kb-math kb-math-inline\">9 + 6 \\times 5 = 39</span> 次小模型训练，远低于联合网格搜索的 <span class=\"kb-math kb-math-inline\">9 \\times 5^6 = 140625</span> 次。</p>\n<p>论文通过实验量化了超参独立性：μP 的超参迁移误差（transfer error）约为 0.03，而 u-μP 仅为 0.005，降低了 6 倍。</p>\n<p><img alt=\"超参迁移误差对比\" src=\"https://ar5iv.labs.arxiv.org/html/2407.17465v3/assets/x4.png\" />\n<em>图 4：μP vs u-μP 的超参迁移误差。u-μP 在各超参维度上的迁移误差显著更低</em></p>\n<p><strong>5. FP8 训练策略</strong></p>\n<p>u-μP 的 unit init 天然适配 FP8，但并非所有张量都适合低精度。论文通过逐层分析 per-tensor RMS，识别出三类需要保持高精度的关键张量：</p>\n<ol>\n<li><strong>注意力 dense 投影</strong>（<span class=\"kb-math kb-math-inline\">W_o</span> 的输出）：因为注意力权重经 softmax 后分布极不均匀</li>\n<li><strong>最终 FFN 层</strong>（最后一个 transformer block 的 FFN）：对输出影响最大</li>\n<li><strong>Decoder head</strong>（<span class=\"kb-math kb-math-inline\">W_{\\text{head}}</span>）：直接影响 logits 精度</li>\n</ol>\n<p>保留这些张量为 BF16/FP16 后，约 70% 的矩阵乘法仍可在 FP8 下执行，实现了精度与效率的良好平衡。</p>\n<h5>与标准 μP 的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>标准 μP</th>\n<th>u-μP</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>初始化</td>\n<td><span class=\"kb-math kb-math-inline\">\\sigma_W</span> 随宽度缩放</td>\n<td>固定 <span class=\"kb-math kb-math-inline\">b_W = 1</span>（unit init）</td>\n</tr>\n<tr>\n<td>Base shape</td>\n<td>需要指定基础模型宽度</td>\n<td>完全不需要</td>\n</tr>\n<tr>\n<td>Embedding LR</td>\n<td><span class=\"kb-math kb-math-inline\">c_{\\text{emb}} = 1</span></td>\n<td><span class=\"kb-math kb-math-inline\">c_{\\text{emb}} = 1/\\sqrt{d_{\\text{model}}}</span></td>\n</tr>\n<tr>\n<td>α 定义</td>\n<td>与权重关联</td>\n<td>与操作关联（6 个独立 α）</td>\n</tr>\n<tr>\n<td>HP 搜索</td>\n<td>联合网格搜索</td>\n<td>先 LR 后独立 α 扫描</td>\n</tr>\n<tr>\n<td>Norm 层</td>\n<td>支持参数化 LayerNorm</td>\n<td>要求非参数化 RMSNorm</td>\n</tr>\n<tr>\n<td>FP8 支持</td>\n<td>困难（小 <span class=\"kb-math kb-math-inline\">\\sigma_W</span>）</td>\n<td>原生支持（unit init）</td>\n</tr>\n<tr>\n<td>Weight decay</td>\n<td>与 LR 耦合</td>\n<td>独立设置</td>\n</tr>\n</tbody>\n</table></div>\n<h5>大规模实验验证</h5>\n<p>论文在 SlimPajama 数据集（300B tokens）上训练了 1B、3B、7B 参数的 Llama 风格模型：</p>\n<ul>\n<li><strong>HP 迁移有效性</strong>：从 width=2048 的代理模型搜索到的超参，直接应用于 7B 模型（width=4096），性能与在 7B 上直接搜索的结果相当</li>\n<li><strong>FP8 训练</strong>：u-μP FP8 模型在 7B 规模上的 benchmark 性能与标准参数化 BF16 模型相当，验证 loss 差距极小</li>\n<li><strong>LR 迁移跨维度泛化</strong>：最优 LR 不仅跨宽度迁移，还跨训练步数、batch size、深度等维度迁移</li>\n</ul>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：u-μP 要求使用非参数化的 RMSNorm（去掉可学习的 <span class=\"kb-math kb-math-inline\">\\gamma</span>），以及独立于学习率的 weight decay 设置。这两个条件是超参迁移成功的必要前提。</div>",
      "quiz": {
        "q": "u-μP 通过什么机制将所有权重的初始化标准差固定为 1？",
        "options": [
          "通过引入额外的归一化层来约束权重分布",
          "利用 abc-对称性将初始化缩放转移到前向传播的缩放因子中",
          "在训练过程中动态调整权重的标准差",
          "使用特殊的正交初始化方法替代高斯初始化"
        ],
        "answer": 1,
        "explain": "abc-对称性表明 (aW, bW, cW) 可以在保持训练动态不变的前提下重新分配缩放。u-μP 利用这一性质，将 bW 固定为 1，同时相应调整 aW（前向缩放）和 cW（学习率缩放），从而实现 unit init 而不改变模型行为。"
      }
    },
    {
      "id": "rl_scaling",
      "num": 7,
      "name": "RL Scaling Laws",
      "fullName": "强化学习规模定律 (RL Scaling Laws)",
      "year": "2026",
      "org": "多机构",
      "parent": "kaplan_scaling",
      "paperUrl": "https://www.machinelearningplus.com/llm/llm-scaling-laws/",
      "projectUrl": "",
      "category": "scaling",
      "motivation": "强化学习阶段能力-计算量预测",
      "summary": "RL Scaling Laws 将 LLM 强化学习后训练的验证奖励随 GPU 小时增长的轨迹拟合为可外推的饱和 S 曲线，并据此提出 ScaleRL 配方来预测和筛选真正能在大算力下继续提升的 RL 方法。它解决了 RL 后训练长期依赖经验试错、缺少类似预训练缩放律的能力-算力预测框架的问题。",
      "keyPoints": [
        "将 RL 后训练性能建模为验证集期望奖励 <span class=\"kb-math kb-math-inline\">R_C</span> 与训练算力 <span class=\"kb-math kb-math-inline\">C</span> 之间的 sigmoid-like 饱和曲线。",
        "曲线参数可解释：<span class=\"kb-math kb-math-inline\">A</span> 表示大算力极限下的性能上限，<span class=\"kb-math kb-math-inline\">B</span> 表示计算效率/上升斜率，<span class=\"kb-math kb-math-inline\">C_{\\text{mid}}</span> 表示达到一半收益所需的中点算力。",
        "通过早期训练段拟合曲线，外推更长训练后的表现，从而避免每个候选 RL recipe 都跑到极大算力。",
        "系统消融异步 RL、off-policy 程度、损失函数、logit 精度、loss aggregation、advantage normalization、prompt filtering 和长度控制等设计轴。",
        "提出 ScaleRL 配方：PipelineRL-8、CISPO 截断重要性采样、prompt-level loss aggregation、batch-level advantage normalization、FP32 logits、zero-variance filtering、No-Positive-Resampling 和 interruption-based length control。",
        "在超过 400,000 GPU-hours 的研究预算下验证，并展示 8B dense 与 17B x 16 MoE 规模上可用早期曲线预测 100k GPU-hours 级别训练。",
        "与 GRPO/DAPO、DeepSeek-style、Qwen-style、Magistral、MiniMax-M1 等常见 recipe 相比，ScaleRL 在论文实验中同时具备更好的可扩展性和更高的渐近奖励。"
      ],
      "detail": "<p><img alt=\"ScaleRL 100k GPU-hours 可预测缩放曲线\" src=\"https://arxiv.org/html/2510.13786v1/paper_figs/100k.png\" />\n<em>图：论文用早期验证集 pass rate 拟合 sigmoid 曲线，并外推到更长的 RL 训练预算，展示 ScaleRL 在 8B dense 与 MoE 模型上的预测能力。</em></p>\n<p>任务 JSON 给出的 <code>paper_url</code> 是缩放律综述页；这里的精读对象是其中对应的 ICLR 2026 论文 <em>The Art of Scaling Reinforcement Learning Compute for LLMs</em>，arXiv 链接为 <code>https://arxiv.org/abs/2510.13786</code>。这篇论文关注的不是传统 RL 环境中的 sample complexity，而是现代 LLM 在 SFT 之后继续用 verifiable reward 或偏好信号做 RL post-training 时，怎样判断一个训练 recipe 是否值得放大到数万甚至十万 GPU 小时。</p>\n<pre><code class=\"language-python\"># ScaleRL / RL Scaling Laws 核心伪代码\n# 目标：用早期 RL 曲线预测大算力表现，并选择可扩展 recipe\n\nfor recipe in candidate_rl_recipes:\n    initialize_policy_from_sft_or_base_model()\n    C, validation_rewards = [], []\n\n    while gpu_hours &lt; small_or_medium_budget:\n        # PipelineRL: generators 持续采样，trainers 异步更新\n        prompts = sample_training_prompts()\n        rollouts = generate_G_responses(policy_old, prompts)\n        rewards = verifier_or_rule_reward(rollouts)\n\n        # 过滤无梯度或已过易样本\n        rollouts = drop_zero_variance_prompts(rollouts, rewards)\n        prompts = drop_prompts_with_historical_pass_rate_ge_0_9(prompts)\n\n        # 计算 batch-level normalized advantages\n        advantages = normalize_advantages_across_batch(rewards)\n\n        # CISPO / truncated importance sampling policy gradient\n        rho = pi_train_theta(rollouts) / pi_gen_old(rollouts)\n        loss = -mean(stop_grad(min(rho, epsilon)) * advantages * logprob_theta(rollouts))\n        update_policy(loss, fp32_logits=True)\n\n        if step % eval_interval == 0:\n            R_C = evaluate_mean_at_16_on_iid_validation(policy)\n            C.append(current_gpu_hours())\n            validation_rewards.append(R_C)\n\n    # 用早期曲线拟合 A, B, C_mid，再外推到大预算\n    params = fit_sigmoid_scaling_law(C, validation_rewards)\n    predicted_large_scale_reward = predict_reward(params, target_gpu_hours)\n    rank_recipe(recipe, predicted_large_scale_reward, params.A, params.B)\n</code></pre>\n<p>论文的核心缩放公式是一个饱和 S 曲线，而不是预训练中常见的幂律损失下降。设 <span class=\"kb-math kb-math-inline\">R_0</span> 是起始策略的验证奖励，<span class=\"kb-math kb-math-inline\">R_C</span> 是消耗训练算力 <span class=\"kb-math kb-math-inline\">C</span> 后的验证奖励，公式为：</p>\n<div class=\"kb-math kb-math-display\">R_C - R_0 = (A-R_0)\\times \\frac{1}{1+(C_{\\text{mid}}/C)^B}.</div>\n<p>等价地：</p>\n<div class=\"kb-math kb-math-display\">R_C = R_0 + \\frac{A-R_0}{1+(C_{\\text{mid}}/C)^B}.</div>\n<p>这个形式非常适合 RL 后训练，因为验证 reward 或 pass rate 是有上界的。预训练 NLL 可以在很宽范围内用幂律持续下降，而 RL reward 往往经历三个阶段：初期变化慢或不稳定，中期快速上升，后期接近任务和 recipe 允许的性能上限。参数 <span class=\"kb-math kb-math-inline\">A</span> 衡量“最终天花板”，<span class=\"kb-math kb-math-inline\">B</span> 和 <span class=\"kb-math kb-math-inline\">C_{\\text{mid}}</span> 衡量“多快接近天花板”。因此两个方法在小预算下谁更强并不一定重要，更重要的是拟合出来的 <span class=\"kb-math kb-math-inline\">A</span> 和效率参数是否能支撑大预算外推。</p>\n<p>ScaleRL 的训练目标来自 off-policy policy-gradient 家族。生成器用旧策略 <span class=\"kb-math kb-math-inline\">\\pi^{\\theta_{old}}_{gen}</span> 产生回答，训练器用当前策略 <span class=\"kb-math kb-math-inline\">\\pi^\\theta_{train}</span> 更新，因此每个 token 都有重要性采样比率：</p>\n<div class=\"kb-math kb-math-display\">\\rho_{i,t}(\\theta)=\\frac{\\pi^\\theta_{train}(y_{i,t}\\mid x,y_{i,&lt;t})}{\\pi^{\\theta_{old}}_{gen}(y_{i,t}\\mid x,y_{i,&lt;t})}.</div>\n<p>论文最终采用 CISPO 思路，把重要性采样比率截断后放入 REINFORCE 风格目标。简化写法如下：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{J}_{\\text{ScaleRL}}(\\theta)=\\mathbb{E}\\left[\\frac{1}{\\sum_g |y_g|}\\sum_{i=1}^{G}\\sum_{t=1}^{|y_i|}\\text{sg}(\\min(\\rho_{i,t},\\epsilon))\\hat{A}^{\\text{norm}}_i\\log \\pi^\\theta_{train}(y_{i,t})\\right].</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">\\text{sg}</span> 是 stop-gradient，<span class=\"kb-math kb-math-inline\">\\hat{A}^{\\text{norm}}_i</span> 是 batch-level 标准化后的优势。直觉上，CISPO 保留了“好的回答增加概率、坏的回答降低概率”的策略梯度方向，但用截断 <span class=\"kb-math kb-math-inline\">\\min(\\rho,\\epsilon)</span> 避免 off-policy 采样比率爆炸。论文发现 GSPO/CISPO 相比 DAPO 能提高渐近 pass rate，其中 CISPO 后期略优，因此被纳入 ScaleRL。</p>\n<p>ScaleRL 的工程配方同样关键。PipelineRL-8 让生成器和训练器异步流水工作，减少等待，并允许最多 8 steps 的 off-policyness；FP32 logits 修复生成端和训练端 kernel 数值差异，因为微小概率误差会直接放大到 <span class=\"kb-math kb-math-inline\">\\rho</span>；prompt-level loss aggregation 让每个 prompt 而不是每个 rollout 或 token 主导梯度权重；batch-level advantage normalization 让不同 prompt 的奖励尺度更稳定；zero-variance filtering 丢弃同一 prompt 所有样本全对或全错的批内样本，因为这些样本优势为零，不贡献有效策略梯度；No-Positive-Resampling 则把历史 pass rate <span class=\"kb-math kb-math-inline\">\\ge 0.9</span> 的过易 prompt 从后续 epoch 中移除，避免把 RL 算力浪费在已经学会的题目上。</p>\n<div class=\"key-point\">💡 关键：这篇论文中的“scaling law”不是直接告诉你参数量和 token 数如何配比，而是告诉你一个 RL recipe 的 reward-算力曲线是否可预测、上限多高、到达上限多快。它更像一个大规模 RL 方法筛选器。</div>\n<p>与预训练缩放律相比，RL scaling 的困难在于算法选择会改变曲线形状。预训练中很多配置差异最后可以折算成 loss 曲线的平移，但 RL 中一个不稳定 recipe 可能早期看起来很好，放大后却撞到低天花板。论文强调“small compute winner”并不一定是“large compute winner”，所以要用早期曲线拟合 <span class=\"kb-math kb-math-inline\">A,B,C_{\\text{mid}}</span> 后再比较。这个框架允许研究者用较小预算消融设计，再把最有前途的 recipe 放大到 100k GPU-hours，而不是靠一次性赌博式大训练。</p>\n<p>实验部分显示，ScaleRL 在 iid validation 上的曲线可以从较早阶段外推到更长训练，并且下游 AIME-24 等评估也呈现一致增长趋势。论文还分析了模型规模、生成长度、global batch size、每 prompt 生成数、数学与代码多任务等轴，发现 sigmoid compute-performance 关系不只适用于单一设置。限制也很明确：这仍主要在可验证数学/代码类任务上建立，未来需要把模型大小、预训练 compute、RL 数据量、奖励模型质量和多轮 agent 环境纳入统一更高维的 RL 缩放律。</p>",
      "quiz": {
        "q": "在 RL Scaling Laws 中，参数 A 的主要含义是什么？",
        "options": [
          "当前 batch 的平均 advantage",
          "训练曲线在大算力极限下可达到的渐近 reward/pass rate",
          "每次 rollout 的最大生成长度",
          "训练数据中 prompt 的数量"
        ],
        "answer": 1,
        "explain": "论文用 sigmoid 曲线拟合 reward-算力关系，A 表示大算力极限下的性能上限；B 和 C_mid 更侧重描述接近该上限的效率。"
      }
    },
    {
      "id": "c4",
      "num": 8,
      "name": "C4",
      "fullName": "C4数据集 (Colossal Clean Crawled Corpus)",
      "year": "2020",
      "org": "Google",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1910.10683",
      "projectUrl": "",
      "category": "data",
      "motivation": "T5基石数据集启发式规则清洗",
      "summary": "C4 从 Common Crawl 的网页抽取文本中通过启发式规则清洗出大规模英文自然文本，解决了早期 NLP 预训练缺少公开、干净、可复现实验语料的问题。它作为 T5 的核心预训练数据集，把“数据清洗策略”提升为影响迁移学习效果的关键算法组件。",
      "keyPoints": [
        "数据来源是 Common Crawl 的 web extracted text，T5 论文使用 April 2019 dump 构建基础 C4。",
        "清洗目标是去掉菜单、样板页、错误消息、脏词、占位文本、源码、重复片段和非英文网页。",
        "关键过滤规则包括句末标点、最少句子数、最少词数、坏词列表、Javascript 行、lorem ipsum、花括号代码页、Wikipedia citation markers、隐私/ cookie 模板行。",
        "使用 langdetect 只保留英文概率至少 0.99 的页面，贴合 T5 主要英文下游任务设置。",
        "使用三句 span 级去重，丢弃重复出现的三句窗口，只保留一个副本。",
        "产物约 750GB，显著大于 Wikipedia、Toronto Books Corpus、WebText-like 等对照语料。",
        "论文在 T5 框架中比较 C4、Unfiltered C4、RealNews-like、WebText-like、Wikipedia、Wikipedia+TBC 等数据源，证明预训练语料的清洁度、规模和领域覆盖都会影响迁移效果。"
      ],
      "detail": "<p><img alt=\"T5 text-to-text 框架图\" src=\"https://arxiv.org/html/1910.10683/x1.png\" />\n<em>图：T5 将所有任务统一为 text-to-text 形式，C4 是该框架中用于无监督预训练的核心大规模语料来源。</em></p>\n<p>C4 不是一个模型结构算法，而是一个数据构建算法。T5 论文的主线是“统一的 text-to-text Transformer + 系统性迁移学习实验”，但 C4 是其中非常关键的一环：如果预训练数据太小，模型很快受限于覆盖度；如果直接使用 Common Crawl，又会被网页模板、导航、广告、错误页、代码和重复内容污染。C4 的贡献在于给出一套可复现的启发式过滤流水线，把每月约 20TB 级别的网页抽取文本变成约 750GB 的相对干净英文语料。</p>\n<pre><code class=\"language-python\"># C4 数据清洗算法伪代码\n# 输入：Common Crawl web extracted text pages\n# 输出：C4 clean English text corpus\n\nclean_pages = []\nseen_three_sentence_spans = set()\n\nfor page in common_crawl_april_2019:\n    lines = extract_text_lines(page)\n\n    # 页面级过滤\n    if langdetect(page).language != &quot;en&quot; or langdetect(page).prob &lt; 0.99:\n        continue\n    if count_sentences(page) &lt; 3:\n        continue\n    if contains_bad_word(page):\n        continue\n    if contains_phrase(page, &quot;lorem ipsum&quot;):\n        continue\n    if contains_character(page, &quot;{&quot;):\n        continue\n\n    kept_lines = []\n    for line in lines:\n        if word_count(line) &lt; 5:\n            continue\n        if not ends_with_terminal_punctuation(line):\n            continue\n        if contains_case_insensitive(line, &quot;javascript&quot;):\n            continue\n        if contains_policy_boilerplate(line):\n            continue\n        line = remove_wikipedia_citation_markers(line)\n        kept_lines.append(line)\n\n    sentences = split_into_sentences(join_lines(kept_lines))\n    deduped = []\n    for span in sliding_window(sentences, size=3):\n        key = normalize(span)\n        if key in seen_three_sentence_spans:\n            continue\n        seen_three_sentence_spans.add(key)\n        deduped.extend(new_sentences_from(span))\n\n    if deduped:\n        clean_pages.append(join_sentences(deduped))\n\nreturn clean_pages\n</code></pre>\n<p>C4 的过滤器可以形式化为一个谓词组合。设原始网页集合为 <span class=\"kb-math kb-math-inline\">\\mathcal{W}</span>，页面 <span class=\"kb-math kb-math-inline\">w</span> 的语言检测概率为 <span class=\"kb-math kb-math-inline\">P_{\\text{en}}(w)</span>，文本行集合为 <span class=\"kb-math kb-math-inline\">\\ell(w)</span>，过滤后语料可以写作：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{C4}=\\operatorname{Dedup}_{3\\text{-sent}}\\left(\\{\\ell\\in w:\\; w\\in\\mathcal{W},\\;P_{\\text{en}}(w)\\ge 0.99,\\;F_{page}(w)=1,\\;F_{line}(\\ell)=1\\}\\right).</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">F_{page}</span> 覆盖页面级规则，例如至少 3 句、没有坏词、没有 <code>lorem ipsum</code>、没有花括号代码痕迹；<span class=\"kb-math kb-math-inline\">F_{line}</span> 覆盖行级规则，例如至少 5 个词、以终止标点结尾、不包含 Javascript 和 policy boilerplate。最后的 <span class=\"kb-math kb-math-inline\">\\operatorname{Dedup}_{3\\text{-sent}}</span> 表示三句窗口去重，它比简单逐行去重更适合网页语料，因为许多网页模板和转载内容会以短段落形式重复。</p>\n<p>C4 的动机来自 Common Crawl 的双重属性：规模巨大但噪声巨大。Common Crawl 的 web extracted text 已经移除了 HTML 标记，但并不等于自然语言语料。网页抽取文本会包含导航菜单、cookie 声明、隐私政策、404 页面、脚本提示、版权页脚、自动生成列表、论坛模板和重复转载。直接拿这些内容训练语言模型，会把 token 预算浪费在非任务相关模式上，并可能让模型学习到不自然的文本分布。C4 的启发式规则看起来朴素，但每条都对应一种高频网页污染源。</p>\n<p>句末标点和最少词数规则主要过滤碎片化文本。网页菜单常见的 “Home”、“Contact”、“Read more” 等短行虽然是英文，却不是完整自然句；要求以句号、问号、感叹号或结束引号结尾，可以提高保留行的叙述性。页面至少 3 句则避免把极短页面或抽取失败页面误认为高质量文档。坏词列表和 <code>lorem ipsum</code> 规则处理内容安全与占位模板；花括号规则处理网页源码或代码片段；Javascript 与 cookie/policy 字符串规则处理浏览器提示和法律模板；Wikipedia citation marker 清理则减少百科页面抽取残留。</p>\n<p>去重是 C4 中特别重要的机制。网页语料的重复不只是整页重复，还包括相同新闻稿、产品说明、版权段落、模板段落在不同站点或同一站点多次出现。三句 span 去重相当于用较长上下文作为指纹，比单句去重更不容易误删常见短句，又能捕捉大段重复内容。对预训练而言，去重降低了模型在重复样本上的过拟合，也让固定 token 预算覆盖更多独立语言现象。</p>\n<p>C4 与 T5 的关系还体现在预训练目标上。T5 最终采用 span corruption 式 denoising objective：从 C4 文本中采样连续 span，用 sentinel tokens 替换输入中的被污染片段，并让模型在输出端恢复这些 span。简化损失为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{denoise}}(\\theta)=-\\sum_{t=1}^{|y|}\\log p_{\\theta}(y_t\\mid y_{&lt;t},\\tilde{x}),</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\tilde{x}</span> 是被 sentinel tokens corruption 后的输入，<span class=\"kb-math kb-math-inline\">y</span> 是按顺序拼接的被遮盖 span。C4 的清洁度直接影响这个目标的有效性：如果输入中大量是菜单、样板和乱码，模型就会把容量用于复原网页噪声；如果输入是相对自然的英文段落，denoising 才更接近学习通用语言知识。</p>\n<p>论文在数据集实验中把 C4 与多个替代语料比较。Unfiltered C4 保留了更多 Common Crawl 噪声，规模更大但质量更差；RealNews-like 更像新闻域，规模较小且领域偏窄；WebText-like 借鉴 Reddit upvote 过滤，但从同一时期 Common Crawl 可得到的内容有限；Wikipedia 和 Wikipedia+TBC 较干净但规模和领域覆盖不足。这个对照说明，预训练数据不是“越大越好”的单变量问题，而是规模、清洁度、领域多样性和可复现性之间的折中。</p>\n<div class=\"key-point\">💡 关键：C4 的算法价值在于把网页清洗变成可复现实验条件。T5 不是只靠模型架构取胜，C4 让不同预训练目标、架构和迁移策略能在统一的大规模干净语料上被系统比较。</div>\n<p>从后续 LLM 发展看，C4 也暴露出启发式清洗的局限：规则简单、英文中心、对质量的定义依赖表面模式，且不能充分处理事实质量、版权、毒性、PII、跨语言覆盖和数据混入 benchmark 等问题。但在 2020 年的背景下，C4 的意义非常明确：它提供了一个公开、足够大、相对干净、可通过 TensorFlow Datasets 使用的预训练基准语料，成为 T5 以及许多后续数据工程研究的参照点。</p>",
      "quiz": {
        "q": "C4 构建流程中，三句 span 去重的主要作用是什么？",
        "options": [
          "把所有英文网页翻译成多语言语料",
          "删除重复出现的长片段，减少网页模板和转载内容对预训练的污染",
          "把文本转换成 T5 的 sentinel token 格式",
          "提高 langdetect 的英文概率阈值"
        ],
        "answer": 1,
        "explain": "C4 使用三句窗口作为较稳定的重复指纹，能去掉模板、转载和重复段落，让固定 token 预算覆盖更多独立自然文本。"
      }
    },
    {
      "id": "the_pile",
      "num": 9,
      "name": "The Pile",
      "fullName": "The Pile数据集 (The Pile: An 800GB Dataset)",
      "year": "2021",
      "org": "EleutherAI",
      "parent": "c4",
      "paperUrl": "https://arxiv.org/abs/2101.00027",
      "projectUrl": "",
      "category": "data",
      "motivation": "825GB多源数据集强调多样性",
      "summary": "The Pile 提出了一个由 22 个高质量、多领域英文子语料按权重混合而成的 825GiB 语言模型预训练数据集，解决了单纯依赖 Common Crawl 时领域覆盖窄、学术/代码/法律/医学等专业知识不足的问题。它的核心不是新模型结构，而是把“数据多样性、可复现构建、评测切分、文档化审计”作为大语言模型预训练质量的主要机制。",
      "keyPoints": [
        "825.18GiB 英文文本语料，由 Pile-CC、PubMed Central、Books3、OpenWebText2、ArXiv、GitHub、FreeLaw、Stack Exchange 等 22 个子数据集构成。",
        "采用“有效大小”而非单纯原始大小来混合数据，对学术、医学、数学、法律、代码等高质量或稀缺来源进行多 epoch 上采样。",
        "将 The Pile 同时设计为预训练语料和跨领域语言模型评测集，验证模型是否只擅长网页文本还是能泛化到专业文本。",
        "使用 bits per UTF-8 encoded byte（bpb）作为主要评测指标，避免不同 tokenizer 下字符/词级困惑度不可比的问题。",
        "对 OpenWebText2 与 Pile-CC 执行文档级 MinHash LSH 去重，并从训练集中移除与 held-out 数据完全相同的样本以降低验证/测试泄漏。",
        "训练 1.3B 参数对照模型表明，在控制 40GB 数据规模且去污染后，Pile 模型在 Pile 各子域上显著优于 CC-100 与 Raw Common Crawl。",
        "附带 datasheet、data statement、主题分布、语言比例、冒犯性内容、偏见共现等数据文档化分析，把数据集风险显式暴露给使用者。"
      ],
      "detail": "<p><img alt=\"The Pile 组成树图\" src=\"https://ar5iv.labs.arxiv.org/html/2101.00027/assets/pile_chart2.png\" />\n<em>图：The Pile 的 22 个组成部分按有效大小绘制的 treemap，颜色区分 Academic、Internet、Prose、Dialogue 和 Misc 等类别。</em></p>\n<pre><code class=\"language-python\"># The Pile 构建流程伪代码：把多源语料变成可训练的预训练 corpus\nsources = [PileCC, PubMedCentral, Books3, OpenWebText2, ArXiv, GitHub,\n           FreeLaw, StackExchange, USPTO, PubMedAbstracts, PG19,\n           OpenSubtitles, Wikipedia, DMMath, UbuntuIRC, BookCorpus2,\n           EuroParl, HackerNews, YouTubeSubtitles, PhilPapers,\n           NIHExporter, EnronEmails]\n\nfor source in sources:\n    docs = collect_or_download(source)\n    docs = source_specific_cleaning(docs)      # HTML/PDF/LaTeX/邮件/字幕等各自解析\n    docs = normalize_text(docs)\n    docs = discard_low_quality_or_empty(docs)\n\n# 只对最容易重复的网页来源做文档级 MinHash LSH 去重\nOpenWebText2 = minhash_lsh_dedup(OpenWebText2, num_perm=10, jaccard_threshold=0.5)\nPileCC = minhash_lsh_dedup(PileCC, num_perm=10, jaccard_threshold=0.5)\n\nheldout = sample_heldout(sources, total_size_gib=10)  # 其中约 2GiB 用于 val/test\ntrain_sources = remove_exact_matches_against_heldout(sources, heldout)\n\n# 按“文档数 × epoch 权重”混合，高质量或小规模语料可被重复采样\nfor output_shard in range(30):\n    while shard_not_full(output_shard):\n        source = weighted_sample(train_sources, weight=lambda s: len(s.docs) * s.epochs)\n        write_next_document(output_shard, random_document(source))\n</code></pre>\n<p>The Pile 的动机来自一个很具体的数据瓶颈：GPT-3、T5、CC-100/C4 等路线证明了 Common Crawl 规模足够大，但网页抓取语料天然偏向网页模板、新闻、论坛、SEO 文本和通用百科，难以覆盖论文、专利、医学全文、代码、法律文书、数学推理、哲学论文等高价值领域。论文因此把语料建设目标从“尽可能多的网页”改为“用一个大规模网页底座，加上大量专业、小众但高质量的数据源”。这解释了为什么 Pile-CC 虽然仍是最大单项来源之一，但 PubMed Central、Books3、ArXiv、GitHub、FreeLaw 等也被赋予很高有效权重。</p>\n<p>数据混合的关键机制是 effective size。设第 <span class=\"kb-math kb-math-inline\">c</span> 个数据源有 <span class=\"kb-math kb-math-inline\">N_c</span> 个文档，设定 epoch 权重为 <span class=\"kb-math kb-math-inline\">e_c</span>，则抽样近似服从：</p>\n<div class=\"kb-math kb-math-display\">p(c)=\\frac{N_c e_c}{\\sum_{c&#x27;} N_{c&#x27;} e_{c&#x27;}}</div>\n<p>这意味着 The Pile 并不是把 22 份数据简单拼接一次，而是在最终训练流中让某些高质量数据“出现多次”。例如 Wikipedia、PG-19、EuroParl、DM Mathematics 等相对小但质量高的来源会被上采样；PubMed Central、ArXiv、FreeLaw 等学术/专业文本也被赋予更高影响力。这样做的直觉是，大模型的梯度预算有限，如果所有 token 都来自网页，模型会把容量花在网页分布上；如果让专业语料在训练中被更频繁看到，模型更可能学习到跨领域表达、术语和推理模式。</p>\n<p>The Pile 对“评测指标”也做了专门设计。论文倾向使用 bits per UTF-8 byte（bpb）而不是单纯 perplexity，因为不同数据源的字符集、数学公式、代码符号、tokenizer 切分都会显著影响 token 数。若令 <span class=\"kb-math kb-math-inline\">B</span> 为 UTF-8 字节数、<span class=\"kb-math kb-math-inline\">\\mathcal{L}</span> 为整份数据的负对数似然，则可以写作：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{bpb}=\\frac{\\mathcal{L}}{B\\log 2}</div>\n<p>bpb 的直觉是“每个原始字节需要多少比特才能被模型压缩/预测”，因此更适合比较 GitHub、ArXiv、DM Mathematics、普通网页等 tokenization 难度差异很大的子语料。论文还强调按文档独立评估，而不是把所有文档串接后评估，避免模型利用跨文档上下文获得不真实优势。</p>\n<p>去重与泄漏控制是 The Pile 的另一个工程重点，但它采取的是务实折中。论文说明由于内存约束没有做全 Pile 级别去重，而是在最容易重复的 OpenWebText2 与 Pile-CC 上执行文档级 MinHash LSH：每个文档构造 MinHash 签名，用近似 Jaccard 相似度 0.5 作为重复阈值，OpenWebText2 和 Common Crawl 分别得到约 28% 与 26% 的重复率。与此同时，论文从训练集中移除与 held-out 数据完全相同的元素，以避免验证/测试样本被训练集直接包含。</p>\n<p>与 C4/CC-100 的区别在于，The Pile 不把“强过滤 Common Crawl”作为唯一数据质量来源。CC-100 的英文部分主要依靠网页过滤，C4 也以 Common Crawl 为底座；The Pile 则明确承认 Common Crawl 有覆盖面优势但专业性不足，因此引入学术论文、医学全文、开源代码、专利、法律、邮件、字幕、论坛问答等多模态文本。实验中，在控制每个训练集约 40GB 并做 13-gram 去污染后，Pile 训练的 1.3B 模型在 Pile 各组件 bpb 上显著优于 CC-100 与 Raw CC，尤其在 ArXiv、PubMed Central、FreeLaw、GitHub、Stack Exchange、DM Mathematics 等专业域上优势明显。</p>\n<div class=\"key-point\">💡 关键：The Pile 的核心贡献不是“更大”，而是“以可复现方式把网页、书籍、学术、代码、法律、医学和对话语料组织成一个可训练分布”，并用 bpb 与分组件评测证明这种多样性会转化为跨领域语言建模收益。</div>",
      "quiz": {
        "q": "The Pile 相比只使用 Common Crawl/C4 的核心改进是什么？",
        "options": [
          "把所有网页文本按困惑度过滤到最接近 Wikipedia 的分布",
          "用 22 个多领域高质量子语料按有效权重混合，增强跨领域覆盖",
          "只保留英文 Wikipedia 和新闻文本，减少噪声来源",
          "通过更深的 Transformer 架构提升模型容量"
        ],
        "answer": 1,
        "explain": "The Pile 的主要贡献是数据构成和构建流程：用多源语料及权重混合覆盖学术、代码、法律、医学等领域，而不是提出新模型结构。"
      }
    },
    {
      "id": "minhash_dedup",
      "num": 10,
      "name": "MinHash LSH",
      "fullName": "MinHash局部敏感哈希去重 (MinHash LSH Deduplication)",
      "year": "2022",
      "org": "学术界",
      "parent": "—",
      "paperUrl": "https://aclanthology.org/2022.acl-long.577/",
      "projectUrl": "",
      "category": "data",
      "motivation": "局部敏感哈希实现文档级去重",
      "summary": "MinHash LSH 去重用 n-gram 集合的 Jaccard 相似度近似来发现大规模语料中的近重复文档，解决网页预训练数据里模板化、轻微改写、字段替换导致的“非精确但高度重复”问题。论文中的 NearDup 方法先用 MinHash 快速召回候选文档对，再用编辑相似度和连通分量聚类决定要删除的重复样本。",
      "keyPoints": [
        "目标是文档级近重复去重：处理“主体相同但城市、日期、URL、商品名等字段略有变化”的网页模板文本。",
        "将文档表示为 5-gram 集合，用 Jaccard 相似度衡量两个文档的 n-gram 重叠程度。",
        "使用 MinHash 签名近似 Jaccard，相比全量文档两两比较，将候选召回扩展到 C4、RealNews、Wiki-40B、LM1B 等大规模语料。",
        "论文实现中使用 5-gram、9000 维签名，并按论文记号设置 <span class=\"kb-math kb-math-inline\">b=20,r=450</span> 控制相似文档发生碰撞的概率曲线。",
        "对 MinHash 召回的候选对再计算 edit similarity，只有编辑相似度大于 0.8 才判定为重复。",
        "将重复文档对构成图，边表示一对近重复文档，再用连通分量形成重复簇，每簇只保留一个代表文档。",
        "发现 C4、RealNews 等网页语料中存在大量近重复；C4 中 3.04% 训练样本被 NearDup 标记为近重复，最大近重复簇可达 250,933 个样本。",
        "去重后模型无提示生成中复制训练文本的 token 比例下降约一个数量级，并且在若干验证集上不损害甚至改善困惑度。"
      ],
      "detail": "<p><img alt=\"NearDup 在 C4 上发现的近重复簇规模分布\" src=\"https://ar5iv.labs.arxiv.org/html/2107.06499/assets/x1.png\" />\n<em>图：NearDup 在 C4 上得到的近重复簇规模分布；绝大多数簇很小，但也存在数千甚至数十万样本的大簇，说明网页模板重复会形成长尾风险。</em></p>\n<pre><code class=\"language-python\"># NearDup / MinHash LSH 文档级近重复去重伪代码\nfor doc_id, text in corpus:\n    tokens = bpe_tokenize(text)\n    shingles = set(ngrams(tokens, n=5))\n    signature[doc_id] = minhash(shingles, signature_size=9000)\n\ncandidate_pairs = set()\nfor bucket in lsh_buckets(signature, b=20, r=450):\n    for doc_i, doc_j in all_pairs(bucket):\n        candidate_pairs.add((doc_i, doc_j))\n\ngraph = UnionFind()\nfor doc_i, doc_j in candidate_pairs:\n    jaccard = exact_jaccard(ngrams(doc_i, 5), ngrams(doc_j, 5))\n    if jaccard &lt; 0.8:\n        continue\n    sim = 1 - edit_distance(tokens(doc_i), tokens(doc_j)) / max(len(doc_i), len(doc_j))\n    if sim &gt; 0.8:\n        graph.union(doc_i, doc_j)\n\nfor cluster in graph.connected_components():\n    keep = choose_representative(cluster, prefer_validation_or_test=True)\n    remove_all_except(cluster, keep)\n</code></pre>\n<p>MinHash LSH 的动机是，精确哈希只能删除完全相同的段落或文档，却无法捕捉网页语料中更常见的“近重复”：广告页、旅游页、商品页、新闻聚合页往往共享大段模板，只替换地点、日期、价格或标题。论文给出的 C4 例子中，两段航班广告文本结构几乎相同，但出发地、目的地和月份不同；如果只做字符串完全匹配，这类重复会留在训练集中，模型会反复看到同一种模板，从而更容易记忆模板化文本并污染验证集。</p>\n<p>形式化地，每个文档 <span class=\"kb-math kb-math-inline\">x_i</span> 被转为 n-gram 集合 <span class=\"kb-math kb-math-inline\">d_i</span>。两个文档的真实相似度可用 Jaccard 指数表示：</p>\n<div class=\"kb-math kb-math-display\">J(d_i,d_j)=\\frac{|d_i\\cap d_j|}{|d_i\\cup d_j|}</div>\n<p>如果对所有文档对都精确计算 <span class=\"kb-math kb-math-inline\">J</span>，复杂度接近 <span class=\"kb-math kb-math-inline\">O(N^2)</span>，在数亿文档规模上不可行。MinHash 的关键性质是：对集合应用随机哈希并取最小哈希值时，两个集合得到相同最小哈希的概率等于它们的 Jaccard 相似度。多个 hash 组成签名后，签名相同/部分相同的概率就能作为 Jaccard 的近似筛选器。</p>\n<p>论文的 NearDup 采用 5-gram 与 9000 个 MinHash 值，并给出候选召回概率：</p>\n<div class=\"kb-math kb-math-display\">\\Pr(d_i,d_j\\mid J(d_i,d_j)=s_{ij})=1-(1-s_{ij}^{b})^{r}</div>\n<p>其中按论文记号 <span class=\"kb-math kb-math-inline\">b=20,r=450</span>。这个函数的作用是形成一条陡峭的 S 型过滤曲线：当 <span class=\"kb-math kb-math-inline\">s_{ij}</span> 接近 0.8 时，文档对很可能进入候选集；当相似度明显低于阈值时，碰撞概率迅速下降。这样可以用局部敏感哈希把“可能重复”的对召回出来，而不是枚举所有文档对。</p>\n<p>召回候选后，NearDup 不直接删除，而是再做精确过滤。论文要求候选对的实际 Jaccard 足够高，并计算 token 序列的编辑相似度：</p>\n<div class=\"kb-math kb-math-display\">\\operatorname{EditSim}(x_i,x_j)=1-\\frac{\\operatorname{EditDistance}(x_i,x_j)}{\\max(|x_i|,|x_j|)}</div>\n<p>只有当 <span class=\"kb-math kb-math-inline\">\\operatorname{EditSim}&gt;0.8</span> 时，这对文档才被连边。这个二阶段设计很重要：MinHash 负责高召回、低成本地缩小搜索空间，edit similarity 负责减少误删，避免仅共享大量常见 n-gram 的不同文档被错误合并。</p>\n<p>最后，NearDup 把所有判定重复的文档对构成图，图中的连通分量就是近重复簇。删除策略不是按边逐对删除，而是按簇保留一个代表，其余移除；当重复跨越 train/validation/test 时，论文优先保留测试或验证样本，从训练集中移除重叠内容，以降低评测泄漏。这个策略解决了一个常见陷阱：如果 A 近似 B、B 近似 C，即使 A 和 C 未直接比较成重复，它们也应被视为同一模板族。</p>\n<p>实验层面，NearDup 在网页数据上的影响很大：论文报告 C4 有 3.04% 训练样本被标记为近重复，RealNews 达到 13.63%，而人工整理程度更高的 Wiki-40B 只有 0.39%。去重不仅减少数据体积，还显著降低模型生成训练集原文的比例；无提示生成中，原始 C4 训练的 XL 模型有超过 1% token 属于 50-token 训练集拷贝片段，而 NearDup/ExactSubstr 去重模型下降到约十分之一量级。</p>\n<div class=\"key-point\">💡 关键：MinHash LSH 去重的价值在于“近似召回 + 精确复核 + 簇级删除”，它不是为了找完全相同文档，而是为了在数亿网页文档中高效发现模板化近重复。</div>",
      "quiz": {
        "q": "NearDup 为什么在 MinHash 候选召回后还要计算 edit similarity？",
        "options": [
          "因为 MinHash 只能处理图片，不能处理文本",
          "为了在高召回候选中进一步过滤，降低共享常见 n-gram 导致的误删",
          "为了把文档转换成 UTF-8 字节并训练 tokenizer",
          "为了让所有文档长度完全一致"
        ],
        "answer": 1,
        "explain": "MinHash 用于快速找到可能相似的文档对，但候选中仍可能有假阳性；edit similarity > 0.8 是更严格的复核条件。"
      }
    },
    {
      "id": "suffix_array_dedup",
      "num": 11,
      "name": "Suffix Array去重",
      "fullName": "后缀数组去重 (Suffix Array Deduplication)",
      "year": "2022",
      "org": "Google",
      "parent": "minhash_dedup",
      "paperUrl": "https://aclanthology.org/2022.acl-long.577/",
      "projectUrl": "",
      "category": "data",
      "motivation": "后缀数组子串去重防重复生成",
      "summary": "Suffix Array Deduplication 使用后缀数组在线性扫描中发现跨文档重复的长精确子串，解决文档整体不相似但局部大段文本被重复复制的问题。论文中的 ExactSubstr 方法选择 50 个 BPE token 作为重复阈值，从训练数据中删除重复片段，从而降低语言模型直接背诵训练文本的概率。",
      "keyPoints": [
        "目标是子串级精确去重：不是删除整篇近重复文档，而是删除跨样本重复出现的长 verbatim span。",
        "将整个语料的 BPE token 字节序列拼接成一个大序列 <span class=\"kb-math kb-math-inline\">S</span>，在 <span class=\"kb-math kb-math-inline\">S</span> 上构建后缀数组 <span class=\"kb-math kb-math-inline\">A(S)</span>。",
        "后缀数组按字典序排列所有后缀，因此共享长前缀的重复片段会在数组中相邻出现。",
        "线性扫描相邻后缀，计算 longest common prefix（LCP），当公共前缀长度 <span class=\"kb-math kb-math-inline\">\\ge 50</span> BPE tokens 且来自不同样本时记录重复 span。",
        "选择 50-token 阈值是保守策略：论文观察到 10 token 左右是重复概率曲线拐点，人工检查 25-token 匹配无明显误报，因此翻倍为 50。",
        "与 MinHash/NearDup 互补：MinHash 删除近重复整文档，ExactSubstr 删除跨文档共享的精确片段；前者处理模板化改写，后者处理长引用、复制段落和训练/验证泄漏。",
        "工程实现采用并行 SA-IS、分块构建、partial suffix array merge 与磁盘流式输出，支持 C4 这类数百 GB 语料。",
        "在 C4 上构建 350GB 语料后缀数组耗时约 12 小时，后续去重不到 1 小时；后缀数组约需 8 倍空间，350GB C4 的后缀数组约 1.5TB。"
      ],
      "detail": "<p><img alt=\"ExactSubstr 的重复长度阈值分析\" src=\"https://ar5iv.labs.arxiv.org/html/2107.06499/assets/x6.png\" />\n<em>图：不同长度 <span class=\"kb-math kb-math-inline\">k</span> 的精确重复子串出现概率；论文观察到 10 token 以下重复很常见，最终选用 50 BPE token 作为保守阈值。</em></p>\n<pre><code class=\"language-python\"># ExactSubstr / Suffix Array 子串级去重伪代码\nS = []\nowner = []  # 每个 token 位置属于哪个文档/数据切分\nfor doc_id, text in corpus:\n    tokens = bpe_tokenize_to_bytes(text)\n    S.extend(tokens + [DOC_SEPARATOR])\n    owner.extend([doc_id] * (len(tokens) + 1))\n\nA = suffix_array(S)  # A 中每个元素是某个后缀的起始位置，按后缀字典序排列\nspans_to_remove = []\n\nfor t in range(len(A) - 1):\n    i, j = A[t], A[t + 1]\n    if owner[i] == owner[j]:\n        continue\n    lcp = longest_common_prefix_length(S, i, j)\n    if lcp &gt;= 50:\n        # 重复片段出现在两个不同样本中；优先保留 validation/test 或先出现代表\n        loser_span = choose_training_span_to_remove(i, j, lcp, owner)\n        spans_to_remove.append(loser_span)\n\ncorpus = delete_spans(corpus, spans_to_remove)\n</code></pre>\n<p>ExactSubstr 的动机与 NearDup 不同。NearDup 关注“整篇文档是否近似重复”，但很多训练集泄漏和模型记忆并不表现为整篇文档重复：一篇网页可能只复制了一个长免责声明、一段诗、一段新闻模板、一段论坛签名，或者验证集中的一个长句子被嵌入到训练文档里。整篇文档的 Jaccard 可能不高，但那段局部文本足够长，语言模型多次看到后就可能逐字复现。因此 ExactSubstr 直接寻找跨样本共享的长连续 token 片段。</p>\n<p>后缀数组提供了规模化解决方案。对总序列 <span class=\"kb-math kb-math-inline\">S</span> 的所有后缀按字典序排序，得到：</p>\n<div class=\"kb-math kb-math-display\">A(S)=\\operatorname{argsort}(\\operatorname{all\\_suffixes}(S))</div>\n<p>如果一个片段 <span class=\"kb-math kb-math-inline\">s</span> 在位置 <span class=\"kb-math kb-math-inline\">i</span> 和 <span class=\"kb-math kb-math-inline\">j</span> 处重复出现，即：</p>\n<div class=\"kb-math kb-math-display\">S_{i:i+k}=S_{j:j+k},\\quad k\\ge 50</div>\n<p>那么从 <span class=\"kb-math kb-math-inline\">i</span> 与 <span class=\"kb-math kb-math-inline\">j</span> 开始的两个后缀会共享至少 <span class=\"kb-math kb-math-inline\">k</span> 个 token 的公共前缀。由于所有后缀按字典序排列，共享长前缀的后缀会聚在一起；因此不需要做所有位置两两比较，只要扫描后缀数组中的相邻元素并计算 LCP，就能找出候选重复片段。</p>\n<p>论文将文本先经过 BPE tokenization，再在 token 的字节表示上构造大序列。这样做有两个好处：第一，重复判定与语言模型实际训练 token 更一致，50 个 BPE token 大致对应足够长的可记忆片段；第二，字节序列避免了复杂 Unicode 字符边界问题，也便于后缀数组库处理。后缀数组相比后缀树更节省内存，论文引用的经验是 10-100 倍更省，实际实现仍需要约 8 bytes per input token 的空间开销。</p>\n<p>50-token 阈值不是任意设置。论文定义不同长度 <span class=\"kb-math kb-math-inline\">k</span> 的重复概率：</p>\n<div class=\"kb-math kb-math-display\">m(k)=\\Pr_{i\\in[N]}\\left[\\exists j\\ne i: S_{i:i+k}=S_{j:j+k}\\right]</div>\n<p>图中显示，长度小于 10 的重复很常见，且这些短重复覆盖了大量 token；这类重复多为常用短语、HTML 片段或普通搭配，删除会产生大量误报。论文观察到曲线在约 10 token 附近出现拐点，人工检查 25-token 匹配没有明显 false positive，于是进一步加倍到 50 token，以更保守地只删除几乎可以确定为复制的长片段。</p>\n<p>工程上，ExactSubstr 的难点不在理论，而在 C4 这种 350GB 语料无法轻松放入普通内存。论文实现了并行后缀数组构建：先把数据切成多个 split，各自用 SA-IS 构建 partial suffix array，再通过比较跨 split 后缀前缀并用 min-heap/merge sort 合并为全局后缀数组。为了降低内存压力，后缀数组可从磁盘流式处理，不要求整个数组常驻内存；但语料本身仍需支持随机索引，因为计算 LCP 时需要访问任意位置。</p>\n<p>与 MinHash LSH 的关系是互补而非替代。MinHash/NearDup 适合删除高度相似的整篇网页模板，但如果两篇文档只有一段 80-token 引文相同，整体 Jaccard 可能不够高；后缀数组会直接命中这段精确重复。反过来，如果两篇网页大体相同但字段交错不同，ExactSubstr 可能只能删除若干片段，而 NearDup 会把整篇文档归为同一簇并删除冗余样本。论文结果也显示，两者删除的内容高度相关但不完全相同，组合使用才能同时降低训练数据浪费、评测泄漏和生成式记忆。</p>\n<div class=\"warn-box\">⚠️ 注意：Suffix Array 去重只处理“完全相同的长连续片段”。它不会发现轻微改写、同义替换或模板字段变化，这些情况仍需要 MinHash LSH、SimHash 或 embedding-based dedup 等近似方法补充。</div>",
      "quiz": {
        "q": "ExactSubstr 为什么选择后缀数组而不是对所有文档片段两两比较？",
        "options": [
          "后缀数组能按字典序聚集共享长前缀的后缀，使重复子串可通过线性扫描发现",
          "后缀数组会自动训练一个语言模型来预测重复内容",
          "后缀数组只能用于删除整篇近重复文档，不能处理子串",
          "后缀数组要求所有文档长度相同，因此更容易批处理"
        ],
        "answer": 0,
        "explain": "重复子串对应共享长前缀的后缀；后缀数组排序后这些后缀相邻，扫描 LCP 即可避免二次复杂度的全量比较。"
      }
    },
    {
      "id": "refinedweb",
      "num": 12,
      "name": "RefinedWeb",
      "fullName": "RefinedWeb数据集 (RefinedWeb Dataset)",
      "year": "2023",
      "org": "TII",
      "parent": "c4",
      "paperUrl": "https://arxiv.org/abs/2306.01116",
      "projectUrl": "",
      "category": "data",
      "motivation": "5T纯网页数据MDR方法论",
      "summary": "RefinedWeb 提出了 MacroData Refinement（MDR）数据处理流程，用严格过滤、行级清理、MinHash 近重复去重和精确子串去重，把 CommonCrawl 纯网页数据加工成约 5T tokens 的高质量英文预训练语料。它解决了“大模型必须依赖人工策划语料混合”的假设，证明充分清洗和去重的网页数据也能训练出与 curated corpora 相当甚至更强的语言模型。",
      "keyPoints": [
        "提出 MDR：面向 CommonCrawl 的大规模“文档准备 → 过滤 → 去重”流水线。",
        "目标数据规模为 3T 到 6T tokens，最终得到约 5T tokens 的英文 RefinedWeb。",
        "数据源坚持 web-only，不依赖书籍、Wikipedia、arXiv、社交媒体等人工精选语料。",
        "文档准备使用 WARC 原始 HTML、<code>warcio</code>、<code>trafilatura</code> 和 fastText/CCNet 语言识别。",
        "过滤阶段组合 URL blocklist、URL scoring、重复片段检测、文档级质量规则和行级 corrections。",
        "去重阶段组合 MinHash 近似文档去重、ExactSubstr 精确子串去重、跨 CommonCrawl dump 的 URL 去重。",
        "论文释放约 600B tokens 公共子集，并训练 1.3B/7.5B 级别模型验证数据质量。",
        "核心实证结论是：RefinedWeb-only 模型可超过 The Pile 训练模型，并在论文评测设置中接近 GPT-3 系列表现。"
      ],
      "detail": "<p><img alt=\"RefinedWeb MDR 流水线\" src=\"https://ar5iv.labs.arxiv.org/html/2306.01116/assets/x2.png\" />\n<em>图：论文 Figure 2 展示 MDR 从 CommonCrawl 到 RW 的主要阶段，以及每一步过滤或去重后保留的数据比例。</em></p>\n<pre><code class=\"language-python\"># MacroData Refinement (MDR) 简化伪代码\nfor dump in common_crawl_dumps:\n    for page in read_warc_with_warcio(dump):\n        if blocked_by_domain_or_url_score(page.url):\n            continue\n\n        text = trafilatura_extract_main_content(page.html)\n        text = normalize_newlines_and_remove_urls(text)\n\n        lang, score = fasttext_ccnet_language_id(text)\n        if lang != &quot;en&quot; or score &lt; 0.65:\n            continue\n\n        if has_excessive_repetition(text):\n            continue\n        if violates_document_quality_rules(text):\n            continue\n\n        text = remove_bad_lines(text)  # navigation, call-to-action, counters\n        if removed_line_fraction(text) &gt; 0.05:\n            continue\n\n        emit_to_rw_filtered(text, metadata={&quot;url&quot;: page.url, &quot;dump&quot;: dump})\n\n# 为了可扩展性，将过滤后的语料分片后去重\nfor shard in split_rw_filtered_into_100_parts():\n    clusters = minhash_lsh_clusters(shard, ngram=5, hashes=9000)\n    keep_one_document_per_cluster(clusters)\n    remove_exact_substrings_longer_than_50_tokens(shard)\n    drop_urls_seen_in_previous_dumps(shard)\n\nwrite_refinedweb()\n</code></pre>\n<p>RefinedWeb 的动机不是“再做一个 CommonCrawl 清洗版”，而是挑战一个当时很强的经验判断：强 LLM 需要把网页、书籍、论文、代码、Wikipedia、论坛等人工策划语料混在一起训练。论文指出，Chinchilla 式 scaling law 会把数据需求推到数万亿 tokens，人工精选源既难以扩展，也带来授权和覆盖范围问题。因此 MDR 的设计原则是 scale first：从 CommonCrawl 这种可持续增量的数据源出发，不靠人工挑选高价值站点，而靠可复现的处理规则把低质量网页剔除出去。</p>\n<p>MDR 的第一段是文档准备。作者没有直接用 CommonCrawl WET，因为 WET 会保留大量菜单、广告、页脚和站点模板文本；他们从 WARC 原始 HTML 开始，用 <code>trafilatura</code> 提取正文，再用正则清理 URL 和过多换行。语言识别使用 CCNet 的 fastText 分类器，保留 top language score 不低于 0.65 的英文文档。这个阈值的直觉是：如果最高语言概率仍然很低，文本通常不是正常自然语言，而是混杂、模板、乱码或抽取失败的页面。</p>\n<p>第二段是过滤。RefinedWeb 避免在质量过滤上依赖“像 Wikipedia 才是好文本”的 ML 分类器，因为这会把公开网页中合法但风格不同的群体语言、方言、医学法律内容误删。相反，论文使用相对中性的启发式规则：URL 层面用 4.6M 量级域名 blocklist 和 URL 词项打分过滤欺诈、成人、赌博等站点；文档层面移除重复行、重复段落、异常符号比例、过短或过长等低质量样本；行级 corrections 则删除“subscribe”、“click here”、社交计数、导航按钮等被正文抽取器漏进来的 boilerplate。若行级清理删掉超过 5% 的文档内容，整篇文档会被认为页面结构污染严重而丢弃。</p>\n<p>去重是 MDR 的核心质量杠杆。网页数据的重复不是简单的整篇复制，还包括许可证模板、页脚、隐私声明、SEO 伪原创、同一网页跨月份重复抓取，以及不同站点之间的转载。RefinedWeb 先做文档级 MinHash 近似去重，再做 token 序列级 ExactSubstr 精确子串去重。MinHash 把文档看成 5-gram 集合，用 sketch 近似 Jaccard 相似度；若两个文档的 n-gram 集合相似度为 <span class=\"kb-math kb-math-inline\">s</span>，LSH 至少命中一个 bucket 的概率可写为：</p>\n<div class=\"kb-math kb-math-display\">P(\\text{match} \\mid s) = 1 - (1 - s^b)^r</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">b</span> 是每个 bucket 中的哈希数，<span class=\"kb-math kb-math-inline\">r</span> 是 bucket 数。这个公式的作用是把“所有文档两两比较”的不可行问题变成“只比较落在同一 bucket 的候选文档”。RefinedWeb 使用大量哈希来提高召回，目的是尽可能发现模板化近重复，而不是只抓完全相同的网页。</p>\n<p>ExactSubstr 处理的是 MinHash 不擅长的局部重复。一个文档可能整体并不相似，但其中包含 100 tokens 的免责声明、引用、页脚或转载段落；文档级 MinHash 可能认为它们不重复，但语言模型仍会反复看到这些片段并产生记忆化。论文采用 Lee et al. 的 suffix array 实现，在拼接后的长 token 序列上查找超过 50 连续 tokens 的精确重复，并删除重复片段。可以把最终保留语料理解成：</p>\n<div class=\"kb-math kb-math-display\">D_{\\text{RW}} = \\operatorname{ExactSubstr}\\bigl(\\operatorname{MinHash}(\\operatorname{Filter}(\\operatorname{Extract}(D_{\\text{CC}})))\\bigr)</div>\n<p>这里每个算子都不是独立追求“删得越多越好”，而是服务于最终预训练质量。论文通过 ablation 发现，raw → filtered → deduplicated 的每个阶段都带来下游 zero-shot 提升，尤其去重对网页语料非常关键。相比 The Pile 这类混合 curated corpus，RefinedWeb 的优势来自规模、统一处理和低重复率，而不是人工选择“高端文本”。</p>\n<p>训练与验证流程也体现了数据集论文的评价方法。作者用相同预训练设置比较 C4、OSCAR、The Pile 和 RefinedWeb，并训练 1B/3B 小规模模型到近似最优 tokens，再扩展到 1B/7B 模型在 350B tokens 上训练。评测聚合了常识、推理、问答等 zero-shot 任务，结论是 RefinedWeb-only 模型显著优于 The Pile-only 对照，甚至在论文的评测环境中接近 GPT-3 相关点位。这意味着 MDR 的关键贡献不是某一个过滤规则，而是一个可规模化、可复现、以去重为中心的网页数据工程方法论。</p>\n<div class=\"key-point\">💡 关键：RefinedWeb 的“纯网页”并不等于“原始网页”。它把 CommonCrawl 当作原矿，MDR 的抽取、过滤和去重才是把网页数据变成预训练燃料的冶炼过程。</div>",
      "quiz": {
        "q": "RefinedWeb 中同时使用 MinHash 和 ExactSubstr 的主要原因是什么？",
        "options": [
          "MinHash 负责语言识别，ExactSubstr 负责去除非英文文本",
          "MinHash 找文档级近重复，ExactSubstr 找局部精确重复片段",
          "MinHash 用于压缩模型参数，ExactSubstr 用于提升推理速度",
          "二者都是 URL blocklist 的不同实现"
        ],
        "answer": 1,
        "explain": "网页重复既有整篇或模板化近重复，也有局部免责声明、页脚等精确重复片段；两种去重粒度互补。"
      }
    },
    {
      "id": "dolma",
      "num": 13,
      "name": "Dolma",
      "fullName": "Dolma数据集 (Dolma: An Open Corpus)",
      "year": "2024",
      "org": "AI2",
      "parent": "the_pile",
      "paperUrl": "https://aclanthology.org/2024.acl-long.840/",
      "projectUrl": "",
      "category": "data",
      "motivation": "3T全透明开源支持OLMo研究",
      "summary": "Dolma 构建了一个包含 3 万亿 token 的英文预训练语料库，融合 Web、代码、学术论文、书籍、社交媒体和百科等 7 类数据源，并开源了完整的数据处理工具链（语言过滤、质量过滤、内容过滤、去重），通过系统性消融实验验证了各处理步骤的有效性，为开放语言模型 OLMo 的训练提供了可复现的数据基础。",
      "keyPoints": [
        "<strong>7 大数据源、3T tokens</strong>：Common Crawl（2281B）、The Stack（411B）、C4（198B）、Reddit（89B）、PeS2o（70B）、Project Gutenberg（6B）、Wikipedia+Wikibooks（4.3B）",
        "<strong>四阶段处理 Pipeline</strong>：语言过滤（fastText）→ 质量过滤（Gopher+C4 启发式规则）→ 内容过滤（Jigsaw 毒性分类器 + PII 正则）→ 去重（URL/文档/段落级 Bloom filter）",
        "<strong>Web 数据处理</strong>：基于 CCNet 处理 25 个 Common Crawl 快照（2020-05 至 2023-06），过滤掉 84.2% 的原始内容",
        "<strong>质量过滤策略</strong>：拒绝 CCNet 的模型打分，采用 Gopher All + C4 NoPunc 启发式规则组合，消融实验证明其优于单独使用任一规则集",
        "<strong>毒性过滤</strong>：使用 Jigsaw 毒性分类器对 hate/NSFW 内容进行阈值过滤，提供高/低两档阈值选择",
        "<strong>去重机制</strong>：URL 精确去重 + 基于 Bloom filter 的段落级去重，Web 数据去重率达 61.7%",
        "<strong>基准去污染</strong>：段落匹配方式移除与 Paloma 评测集重叠的文档，实验证明不会降低模型性能",
        "<strong>混合策略实验</strong>：代码数据（5%~15%）显著提升推理任务表现；多源混合比例通过 1B 模型消融实验确定",
        "<strong>完全开源</strong>：数据集（HuggingFace）+ 数据处理工具链（GitHub）+ 处理文档全部公开"
      ],
      "detail": "<p><img alt=\"Dolma 数据处理 Pipeline 总览\" src=\"https://ar5iv.labs.arxiv.org/html/2402.00159/assets/x1.png\" />\n<em>图：Dolma 数据处理 Pipeline 总览——每个数据源经过语言过滤、质量过滤、内容过滤和去重四个阶段</em></p>\n<pre><code class=\"language-python\"># Dolma Web 数据处理 Pipeline 伪代码\ndef dolma_web_pipeline(common_crawl_snapshots):\n    &quot;&quot;&quot;处理 25 个 Common Crawl 快照 (2020-05 ~ 2023-06)&quot;&quot;&quot;\n    documents = []\n    for snapshot in common_crawl_snapshots:\n        # Step 1: 语言过滤 (CCNet + fastText)\n        docs = ccnet_extract(snapshot)\n        docs = [d for d in docs if fasttext_en_score(d) &gt;= 0.5]  # 移除 61.7%\n\n        # Step 2: 质量过滤 (Gopher All + C4 NoPunc)\n        docs = gopher_filter(docs)       # 移除 15.23% UTF-8 字符\n        docs = c4_nopunc_filter(docs)     # 移除无标点段落, 22.73% 字符\n        docs = remove_repeated_ngrams(docs, max_len=100)  # 移除重复 n-gram\n\n        # Step 3: 内容过滤\n        docs = jigsaw_toxicity_filter(docs, hate_threshold, nsfw_threshold)\n        docs = pii_mask_or_remove(docs, regex_patterns=['email', 'ip', 'phone'])\n\n        # Step 4: 去重\n        docs = url_dedup(docs)                        # URL 精确去重\n        docs = bloom_filter_paragraph_dedup(docs)      # 段落级 Bloom filter\n        docs = bloom_filter_document_dedup(docs)       # 文档级去重\n\n        documents.extend(docs)\n\n    # Step 5: 基准去污染\n    documents = decontaminate(documents, benchmark='paloma',\n                               method='paragraph_match', min_tokens=13)\n    return documents  # 175.1 TB → 27.7 TB (CCNet) → 最终 ~9 TB\n</code></pre>\n<p><strong>动机与背景：为什么需要 Dolma？</strong></p>\n<p>当前最强大的语言模型（如 GPT-4、PaLM）几乎不公开其训练数据的任何信息，即使是开源模型（如 LLaMA）也很少释放完整的训练语料或可复现的构建方案。这导致了一个根本性的研究瓶颈：研究者无法系统地研究训练数据如何影响模型能力和局限性。Dolma 的核心动机是打破这一信息壁垒——不仅提供一个 3T token 规模的高质量英文语料库，更重要的是开源整个数据处理工具链和详细的构建文档，使得任何研究者都能复现、修改和改进数据处理流程。Dolma 的设计遵循三个原则：(1) 语料规模需达到 2-3T tokens 以支持大规模训练实验；(2) 数据来源需多样化以覆盖不同领域知识；(3) 整个流程必须完全透明和可复现。</p>\n<p><strong>核心机制：四阶段处理 Pipeline 详解</strong></p>\n<p>Dolma 的数据处理 Pipeline 由四个串行阶段组成，每个阶段都经过了严格的消融实验验证：</p>\n<p><strong>（1）语言过滤</strong>：使用 CCNet 框架集成的 fastText 语言识别模型，对每个文档计算英文概率分数，保留分数 <span class=\"kb-math kb-math-inline\">\\geq 0.5</span> 的文档。仅此一步就过滤掉了 61.7% 的 Web 页面。CCNet 还会在每个快照内按分片分组，移除高频重复段落（主要是导航栏和页头），此步骤移除了约 70% 的段落。整个 CCNet 阶段将 Common Crawl 从 175.1 TB 压缩至 27.7 TB，过滤率达 84.2%。</p>\n<p><strong>（2）质量过滤</strong>：这是 Dolma 最具特色的设计决策之一。CCNet 原生提供基于 KenLM 困惑度的质量分桶（高/中/低），但 Dolma 团队经过人工检查发现这种模型打分方式并不可靠——它倾向于保留\"类维基百科\"的文本而过度过滤其他有价值的内容。因此，Dolma 选择了纯启发式规则组合：Gopher All（来自 DeepMind 的 Gopher 论文，包含文档长度、符号比例、重复行比例等规则）+ C4 NoPunc（来自 T5 的 C4 数据集，仅保留\"移除不以标点结尾的段落\"这一条规则）。消融实验（Figure 2）表明，这一组合在困惑度和下游任务（HellaSwag）上均优于单独使用任一规则集。此外，团队还发现即使经过 Gopher+C4 过滤，仍存在大量重复 n-gram（如连续 100 个 '-' 出现超过 6000 万次），因此额外实现了移除超过 100 个 UTF-8 字符的重复序列的规则。</p>\n<p><strong>（3）内容过滤</strong>：包含毒性过滤和 PII（个人身份信息）处理两部分。毒性过滤使用 Jigsaw Toxic Comments 分类器对每个文档的 hate、NSFW 等维度进行打分，提供高阈值（保守，移除约 5-7% 内容）和低阈值（激进，移除约 29-35% 内容）两种选择。消融实验（Figure 3）显示低阈值在语言建模和下游任务上表现更好，但移除的内容更多。PII 处理采用正则表达式检测邮箱、IP 地址和电话号码，默认策略是将检测到的 PII 替换为特殊标记（如 <code>{{EMAIL}}</code>），而非直接删除整个文档。实验（Figure 4）表明 PII 过滤策略对模型性能几乎没有影响。</p>\n<p><strong>（4）去重</strong>：采用多层级去重策略。URL 去重在同一快照内移除相同 URL 的重复文档；段落级去重使用 Bloom filter 在所有快照间识别重复段落；文档级去重同样基于 Bloom filter。去重是移除数据量最大的步骤，Web 数据的去重率达到 61.7%。</p>\n<div class=\"key-point\">💡 关键：Dolma 明确拒绝了基于模型的质量过滤（如 KenLM 困惑度打分），转而采用可解释的启发式规则组合。这一设计选择的核心理由是：模型打分会引入隐式偏见，偏好\"类维基百科\"文本，而启发式规则更加透明、可控、可复现。</div>\n<p><strong>混合策略与代码数据的作用</strong></p>\n<p>Dolma 作为多源数据集，训练时需要确定各源的混合比例。团队通过 1B 参数模型在 150B tokens 上的消融实验探索了两个关键问题：</p>\n<p><em>代码数据的比例</em>：通过对比 0%、5%、15% 代码混合比例的模型，发现代码数据显著提升推理任务表现（Table 4）。在 bAbI 任务上，0% 代码的模型完全失败（0.0），而 15% 代码的模型达到 10.1；在 WebNLG 上从 16.8 提升至 22.0。更有趣的是，在 GSM8K 数学推理任务上，所有模型在标准设置下都失败了，但当使用 Program-Aided Language（PAL）方式——即让模型生成 Python 代码来解题时，预训练含代码的模型显著优于纯文本模型（14.7 vs 11.8）。</p>\n<p><em>多源混合比例</em>：团队实验了多种混合配置（Table 5），发现排除代码会增加代码数据集上的困惑度，而上采样学术论文和维基百科则降低了 S2ORC 上的困惑度。最终 Dolma 不强制规定单一混合策略，而是提供灵活的混合工具，让研究者根据需求自行调整。</p>\n<div class=\"warn-box\">⚠️ 注意：Dolma 的基准去污染实验（Table 3）表明，段落匹配方式移除与 Paloma 评测集重叠的文档后，模型在困惑度和下游任务上均无一致性性能下降，验证了去污染策略的安全性。</div>",
      "quiz": {
        "q": "Dolma 在质量过滤阶段为什么拒绝使用 CCNet 原生的 KenLM 困惑度打分？",
        "options": [
          "KenLM 模型计算开销太大，无法处理 3T 规模的数据",
          "KenLM 打分偏好类维基百科文本，引入隐式偏见，且与启发式规则相关性低",
          "KenLM 只支持英文，无法处理多语言数据",
          "KenLM 的过滤效果不如直接使用 GPT-2 困惑度打分"
        ],
        "answer": 1,
        "explain": "论文明确指出 CCNet 的 KenLM 质量分桶与 Gopher+C4 启发式规则的相关性极低（过滤后文档在高/中/低桶的分布几乎不变），且基于模型的过滤会引入偏向维基百科风格文本的隐式偏见，因此选择了更透明可控的启发式规则组合。"
      }
    },
    {
      "id": "doremi",
      "num": 14,
      "name": "DoReMi",
      "fullName": "DoReMi数据配比优化 (DoReMi: Optimizing Data Mixtures)",
      "year": "2023",
      "org": "Stanford",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2305.10429",
      "projectUrl": "",
      "category": "data",
      "motivation": "极小极大优化自动确定数据配比",
      "summary": "DoReMi 用小型代理模型和 Group DRO 极小极大优化自动学习预训练数据的领域采样权重，避免靠人工直觉或下游任务网格搜索确定数据配比。它先训练 reference model，再训练 DRO proxy model 产生 domain weights，最后用这些权重训练大模型，从而加速预训练并提升多域表现。",
      "keyPoints": [
        "全名 Domain Reweighting with Minimax Optimization，目标是自动优化多域预训练数据 mixture proportions",
        "输入是一组领域数据，如 Wikipedia、Books、Web、GitHub、ArXiv 等，以及初始 reference weights",
        "先按参考权重训练小 reference model，用于估计每个样本/领域的基线难度",
        "再训练小 proxy model，用 Group DRO 最小化最坏领域的 excess loss",
        "excess loss 是 proxy loss 相对 reference loss 的差值，用来强调“可学但当前学得不够好”的领域",
        "训练过程中用 exponentiated gradient 更新领域权重，最终取平均权重作为大模型数据配比",
        "在 The Pile 上用 280M proxy 为 8B 模型定权重，平均 few-shot 准确率提升 6.5 个百分点，并以 2.6x 更少步数达到基线"
      ],
      "detail": "<p><img alt=\"DoReMi 三阶段流程\" src=\"https://ar5iv.labs.arxiv.org/html/2305.10429/assets/x1.png\" />\n<em>图：DoReMi 论文 Figure 1，先训练 reference model，再用 Group DRO 训练 proxy model 得到领域权重，最后训练大模型。</em></p>\n<pre><code class=\"language-python\"># DoReMi 数据配比优化伪代码\ndef doremi(domain_datasets, reference_weights):\n    # Step 1: 训练小 reference model\n    ref_model = train_lm(domain_datasets, domain_weights=reference_weights, size=&quot;small&quot;)\n\n    # Step 2: 用 Group DRO 训练 proxy，并在线更新领域权重\n    q = uniform_weights(domain_datasets)\n    proxy = init_model(size=&quot;small&quot;)\n    q_history = []\n    for step in range(T):\n        batch = sample_domains(domain_datasets, weights=uniform_weights(domain_datasets))\n        excess = {}\n        for domain, examples in batch.by_domain().items():\n            proxy_loss = token_nll(proxy, examples)\n            ref_loss = token_nll(ref_model, examples)\n            excess[domain] = mean(max(proxy_loss - ref_loss, 0.0))\n\n        q = q * exp(eta * vector(excess))\n        q = smooth_and_normalize(q, epsilon=1e-3)\n        proxy = optimizer_step(proxy, weighted_loss(batch, q))\n        q_history.append(q)\n\n    optimized_weights = average(q_history)\n\n    # Step 3: 用优化后的权重训练大模型\n    large_model = train_lm(domain_datasets, domain_weights=optimized_weights, size=&quot;large&quot;)\n    return optimized_weights, large_model\n</code></pre>\n<p><strong>动机与背景：数据配比是 LLM 训练里昂贵但关键的超参数。</strong> 预训练语料通常由许多领域组成：网页、百科、书籍、论文、代码、对话、法律等。不同权重会显著影响模型能力，但直接在大模型上搜索配比代价极高，而且用下游任务调权重容易过拟合某个 benchmark。DoReMi 的目标是用小模型、无下游任务标签的方式，找到对所有领域都更稳健的采样比例。</p>\n<p><strong>核心机制：优化最坏领域的 excess loss。</strong> DoReMi 不直接最大化某个下游指标，而是使用 Group DRO：</p>\n<div class=\"kb-math kb-math-display\">\\min_\\theta \\max_{q\\in \\Delta_m} \\sum_{i=1}^{m} q_i \\cdot \\ell_i^{\\text{excess}}(\\theta)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">q_i</span> 是第 <span class=\"kb-math kb-math-inline\">i</span> 个领域的权重，<span class=\"kb-math kb-math-inline\">\\ell_i^{\\text{excess}}</span> 是 proxy model 相对 reference model 的额外损失。reference loss 的作用是校准领域难度：如果某个领域本身熵很高，原始 loss 高不一定代表应该加权；只有 reference 已经能较好处理、但 proxy 仍落后的领域，才更值得上调。</p>\n<p><strong>训练流程：小模型调权，大模型受益。</strong> DoReMi 分三步：先训练 reference model；再训练 DRO proxy model，同时根据每个领域的 excess loss 用 exponentiated gradient 调整领域权重；最后把平均后的权重用于训练更大的主模型。论文实验中，280M proxy/reference 的额外成本只占训练 8B 模型的一小部分，但能显著改善 The Pile 上所有领域的 perplexity，并提升 few-shot 下游准确率。</p>\n<p><strong>与人工配比和下游网格搜索的区别。</strong> 人工配比依赖经验，例如上采样 Wikipedia、代码或论文；下游调权需要训练许多候选模型，且会绑定到某组任务。DoReMi 则把数据配比转化为训练时可优化的问题：谁的 excess loss 高，谁就被加权；谁已经相对 reference 学得足够好，就不再盲目增加。这样得到的权重不是“哪个领域最干净”，而是“哪个领域对当前模型训练最有边际价值”。</p>\n<div class=\"key-point\">💡 关键：DoReMi 的 domain weights 是小模型训练动态的产物，而不是静态数据统计；它优化的是跨领域稳健性和学习效率。</div>",
      "quiz": {
        "q": "DoReMi 为什么要使用 reference model 的 loss？",
        "options": [
          "为了估计样本/领域本身的难度，避免只因高熵领域 loss 高就过度加权",
          "为了替代 proxy model，不再训练代理模型",
          "为了把所有领域权重固定为相同值",
          "为了只优化下游任务准确率"
        ],
        "answer": 0,
        "explain": "excess loss = proxy loss - reference loss，可突出 reference 已能处理但 proxy 仍学得不足的领域，减少对天然高难度/高熵领域的误加权。"
      }
    },
    {
      "id": "fineweb",
      "num": 15,
      "name": "FineWeb",
      "fullName": "FineWeb数据集 (FineWeb Dataset)",
      "year": "2024",
      "org": "HuggingFace",
      "parent": "refinedweb",
      "paperUrl": "https://huggingface.co/datasets/HuggingFaceFW/fineweb",
      "projectUrl": "",
      "category": "data",
      "motivation": "15T最高质量开源网页语料",
      "summary": "FineWeb 提出了一个完全公开、可复现、以实验消融选择规则的网页预训练数据构建流程，把 96 个 CommonCrawl 快照加工成论文版本约 15T tokens 的高质量英文语料。它解决了 RefinedWeb 之后“配方公开但全量数据和设计选择仍不够透明”的问题，用小模型预训练评测来决定抽取、过滤、去重和自定义启发式规则。",
      "keyPoints": [
        "发布 FineWeb：论文版本为 15T tokens，来自 96 个 CommonCrawl snapshots 的英文网页数据。",
        "Hugging Face 数据集页后续版本继续追加快照，当前数据卡描述为超过 18.5T tokens。",
        "使用 <code>datatrove</code> 作为可复现的大规模数据处理库，并公开完整处理脚本。",
        "方法核心不是单条过滤规则，而是训练 1.82B ablation models 来验证每个数据处理选择。",
        "文本抽取从 WARC 原始 HTML 出发，使用 <code>trafilatura</code>，避免 WET 中残留的菜单和 boilerplate。",
        "基础过滤包括 URL 过滤、fastText 英文识别、Gopher repetition、Gopher quality、C4 quality 和 FineWeb 自定义质量规则。",
        "去重采用 per-crawl MinHash，而不是把所有 dump 合并后做全局去重。",
        "MinHash 配置采用 5-grams、14 buckets、8 hashes per bucket，并对每个 CommonCrawl dump 独立去重。",
        "公开 sample-10BT、sample-100BT、sample-350BT、代码、评测配置和 ablation checkpoints，强调数据集科学的可审计性。"
      ],
      "detail": "<p><img alt=\"FineWeb 处理步骤带来的性能提升\" src=\"https://arxiv.org/html/2406.17557v1/x9.png\" />\n<em>图：论文 Figure 9 展示 FineWeb 从 base filtering 到 per-crawl MinHash、C4 filters、自定义 filters 的逐步性能收益。</em></p>\n<pre><code class=\"language-python\"># FineWeb / datatrove 简化伪代码\nfor dump in common_crawl_snapshots_96:\n    raw_docs = WarcReader(f&quot;s3://commoncrawl/crawl-data/{dump}/segments/*/warc/*&quot;)\n\n    filtered = []\n    for doc in raw_docs:\n        if URLFilter(doc.url):\n            continue\n\n        text = Trafilatura(favour_precision=True)(doc.html)\n        if LanguageFilter(language=&quot;en&quot;, min_score=0.65)(text):\n            continue\n        if GopherRepetitionFilter(text):\n            continue\n        if GopherQualityFilter(text):\n            continue\n        if C4QualityFilter(selected_rules=True)(text):\n            continue\n        if FineWebQualityFilter(text):\n            continue\n\n        text = PIIFormatter.replace_email_and_public_ip(text)\n        filtered.append(text)\n\n    # 论文和数据卡强调每个 crawl 独立 MinHash 去重\n    signatures = MinhashDedupSignature(\n        filtered,\n        n_grams=5,\n        num_buckets=14,\n        hashes_per_bucket=8,\n        hash_fc=&quot;sha1&quot;,\n        precision=64,\n    )\n    clusters = MinhashDedupBuckets(signatures)\n    deduped = MinhashDedupFilter(filtered, clusters)\n    write_parquet(deduped, dump=dump)\n</code></pre>\n<p>FineWeb 的出发点是：数据处理规则本身需要像模型结构一样被实验验证。过去网页数据集常给出一套经验规则，例如“删掉不以标点结尾的行”或“用某个 bad-word list”，但这些规则是否真正提升预训练模型并不总是清楚。FineWeb 论文把数据构建变成一系列可控消融：固定模型规模、架构、训练 tokens 和评测任务，只替换训练数据版本，然后比较下游 benchmark 聚合分数。作者使用 1.82B Llama-style ablation models、2048 context、约 2M tokens global batch，并在 CommonSenseQA、HellaSwag、OpenBookQA、PIQA、SIQA、WinoGrande、ARC、MMLU 等任务上验证早期训练信号。</p>\n<p>文本抽取阶段继承但强化了 RefinedWeb 的经验。CommonCrawl 提供 WARC 和 WET 两类数据，WET 虽然已经是纯文本，但通常保留菜单、导航、广告、页脚和模板文本。FineWeb 选择从 WARC 原始 HTML 重新抽取，用 <code>trafilatura</code> 获取正文，牺牲一部分处理成本换取更干净的训练样本。这个选择通过 ablation 验证，而不是只凭直觉决定；如果抽取器让模型反复学习网页框架文本，预训练损失可能仍下降，但下游能力会被无意义 token 消耗掉。</p>\n<p>基础过滤由多类启发式构成。URL 过滤删除恶意、NSFW 和低可信来源；fastText 语言过滤保留英文分数足够高的文档；Gopher repetition 和 Gopher quality 针对重复段落、异常字符比例、过短或过长文档等低质量模式；C4 filters 提供一组传统网页清洗规则；FineWeb 自定义 filters 则针对 list-like documents、重复行、疑似错误换行等在消融中暴露出来的问题。可以把过滤器组合写成：</p>\n<div class=\"kb-math kb-math-display\">D_{\\text{base}} = \\{d \\in D_{\\text{WARC}} : f_i(d)=0,\\ \\forall f_i \\in \\mathcal{F}_{\\text{url,lang,gopher,c4,fineweb}}\\}</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">f_i(d)=1</span> 表示某个过滤器判定文档应删除。关键点在于，FineWeb 不把“过滤比例”当作目标，而把“同样 token 预算训练出的模型表现”当作目标。论文中自定义过滤规则合计会删除相当数量 tokens，但只有当 28B 或 350B token ablation 显示性能提升时才被纳入最终配方。</p>\n<p>FineWeb 最值得注意的差异是去重策略。RefinedWeb 强调大规模严格去重，而 FineWeb 发现“全局跨 dump 去重”并不一定产生最好的训练数据；在他们的实验中，对每个 crawl/snapshot 独立做 MinHash 去重，再从多个 dump 采样训练，效果优于把所有 dump 合起来做一次全局去重。直觉上，跨 dump 重复可能代表网页在不同时间的稳定内容，也可能保留时间分布和域分布；过度全局去重会削弱这种分布结构。FineWeb 的 MinHash LSH 命中概率可写为：</p>\n<div class=\"kb-math kb-math-display\">P(\\text{duplicate} \\mid s)=1-(1-s^8)^{14}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">s</span> 是两个文档 5-gram 集合的 Jaccard 相似度，8 是每个 bucket 的哈希数，14 是 bucket 数。这个配置让高相似文档更容易聚到同一候选桶，同时避免对所有文档做平方级比较。与 RefinedWeb 的“MinHash + ExactSubstr”相比，FineWeb 更强调配方在完整训练评价上的收益，并把 per-crawl 作为一个经验证有效的工程选择。</p>\n<p>FineWeb 的另一个贡献是公开性。数据集页不仅提供全量数据和不同大小 sample，还给出 <code>datatrove</code> 处理脚本、ablation checkpoints、评测结果和 benchmark 定义。这样做的价值是把“数据质量”从黑箱口碑变成可重复实验：研究者可以替换某个过滤器、改 MinHash 参数、只处理一个 dump，或用 sample-100BT 快速训练代理模型。对于 LLM 预训练来说，这种公开 pipeline 比单纯发布一个大文件更重要，因为后续模型开发者需要知道数据为什么长这样、哪些规则可以迁移到其他语言、哪些规则只对英文网页成立。</p>\n<p>训练流程上，FineWeb 的最终 15T tokens 足以支持 Chinchilla-optimal 级别的大模型数据需求。论文同时提出 FineWeb-Edu 作为教育内容子集，用 Llama-3-70B-Instruct 产生 0 到 5 的教育质量标注，再训练轻量分类器扩展到全量 FineWeb；虽然本条目关注 FineWeb 本体，但 FineWeb-Edu 说明同一开放数据底座还能继续派生任务导向的数据切片。FineWeb 因此不是一个静态语料，而是一套“CommonCrawl → 可复现处理 → 小模型消融 → 发布数据与证据”的开放数据工程范式。</p>\n<div class=\"key-point\">💡 关键：FineWeb 的核心创新不是“比 RefinedWeb 多几个过滤器”，而是用代理模型训练结果来选择过滤和去重策略，避免把看似合理但伤害模型表现的清洗规则固化进数据集。</div>",
      "quiz": {
        "q": "FineWeb 为什么选择 per-crawl MinHash 去重，而不是简单地把所有 CommonCrawl dump 合并后全局去重？",
        "options": [
          "因为 per-crawl 去重在实验中带来更好的模型表现，并保留跨时间快照的有用分布信息",
          "因为全局去重无法计算任何 MinHash 签名",
          "因为 FineWeb 完全不需要去重",
          "因为 per-crawl 去重只适用于非英文数据"
        ],
        "answer": 0,
        "explain": "论文的消融显示，独立 crawl 去重的采样训练效果优于全局去重；这说明重复删除强度和时间分布保留之间存在质量权衡。"
      }
    },
    {
      "id": "common_corpus",
      "num": 16,
      "name": "Common Corpus",
      "fullName": "Common Corpus数据集 (Common Corpus Dataset)",
      "year": "2026",
      "org": "ICLR社区",
      "parent": "dolma",
      "paperUrl": "https://openreview.net/forum?id=Submission25369",
      "projectUrl": "",
      "category": "data",
      "motivation": "2T完全合规多语言数据集",
      "summary": "Common Corpus 提出了一个约 2T tokens、517M 文档量级的多语言开放许可预训练数据集，通过 provenance 记录、许可过滤、OCR 修复、PII 替换和毒性检测，解决大规模 LLM 训练数据难以公开审计和法律合规的问题。它证明不依赖未授权网页抓取，也可以构建覆盖政府、文化、科学、代码、开放网页和语义数据的可训练语料基础设施。",
      "keyPoints": [
        "ICLR 2026 Oral 论文，OpenReview submission number 为 25369，对应公开页面题名为 Common Corpus: The Largest Collection of Ethical Data for LLM Pre-Training。",
        "数据总量为 1,998,647,168,282 tokens，约 517,033,648 documents。",
        "数据均来自 public domain 或开放许可来源，并在元数据中记录 source URL、license、language、collection/domain 等字段。",
        "六大 collection 为 Open Government、Open Culture、Open Science、Open Code、Open Web、Open Semantic。",
        "不是传统 web-only corpus，包含法律金融行政文本、文化遗产、科学出版、开源代码、Creative Commons 网页和 Wikidata 语义数据。",
        "多语言覆盖强，英语约 969B tokens，法语约 275B tokens，德语约 112B tokens，并有至少九种语言超过 10B tokens。",
        "清洗工具链包括 Segmentext 文本分段、OCRoscope/OCRerrcr OCR 错误检测、OCRonos OCR 修复、Presidio PII 替换、Celadon 多语言毒性分类器。",
        "设计目标是“fully open and auditable LLMs”，让训练数据本身也能被发布、检查、过滤和复现。",
        "作者训练 Pleias 系列小模型验证 Common Corpus 可用于多语言预训练，并指出其仍受开放数据可见性不足的 open data paradox 限制。"
      ],
      "detail": "<p><img alt=\"Common Corpus 时间与语义分布概览\" src=\"https://arxiv.org/html/2506.01732v1/x2.png\" />\n<em>图：论文 Figure 2a 展示 Common Corpus 主要 collection 的历史时间覆盖，体现它不只是现代网页抓取数据。</em></p>\n<pre><code class=\"language-python\"># Common Corpus 简化构建流程\nallowed_licenses = {\n    &quot;Public Domain&quot;, &quot;CC-By&quot;, &quot;CC-By-SA&quot;, &quot;CC0-1.0&quot;,\n    &quot;MIT&quot;, &quot;Apache-2.0&quot;, &quot;BSD-2-Clause&quot;, &quot;BSD-3-Clause&quot;,\n    &quot;Open license&quot;,\n}\n\ncollections = [\n    &quot;Open Government&quot;, &quot;Open Culture&quot;, &quot;Open Science&quot;,\n    &quot;Open Code&quot;, &quot;Open Web&quot;, &quot;Open Semantic&quot;,\n]\n\nfor source in registered_open_sources(collections):\n    assert source.license in allowed_licenses\n    raw_docs = ingest(source)\n\n    for doc in raw_docs:\n        doc = attach_metadata(\n            doc,\n            source_url=source.url,\n            license=source.license,\n            collection=source.collection,\n        )\n\n        segments = Segmentext(doc.text)\n        ocr_quality = OCRoscope(segments)\n        if ocr_quality &lt; source.min_quality:\n            segments = OCRonos.correct(segments)\n\n        segments = Presidio.detect_and_replace_with_realistic_fake_values(segments)\n\n        toxicity = Celadon.score(segments)\n        if toxicity.above_threshold():\n            segments = remove_or_rewrite_harmful_spans(segments)\n\n        language = fasttext_language_id(segments)\n        write_parquet(segments, metadata={**doc.metadata, &quot;language&quot;: language})\n</code></pre>\n<p>Common Corpus 的核心问题设定和 FineWeb/RefinedWeb 不同。后两者主要问“如何把 CommonCrawl 变成高质量训练数据”，Common Corpus 问的是“如果必须公开训练数据本身，并且不能依赖版权或 ToS 不明确的内容，能否仍然构建万亿 token 规模语料”。论文把 open 定义得很强：不仅数据可下载，还要允许任意目的使用，且提供 provenance、处理流程和内容信息。这个目标直接面向欧盟等严格监管环境下的 LLM 研发：如果训练语料不能被发布、审计或按许可证过滤，就很难称为真正开放的模型基础。</p>\n<p>数据组成上，Common Corpus 是多域聚合而非网页清洗。Open Government 覆盖金融、法律、行政文本；Open Culture 聚合公共领域文化遗产、期刊和书籍；Open Science 包含开放科学出版物；Open Code 来自开源代码；Open Web 收集许可明确的开放网页；Open Semantic 将 Wikidata 结构化三元组转成自然语言式序列。论文表格给出的 collection token 量显示，Open Culture 约 886B tokens，Open Government 约 407B tokens，Open Code 约 283B tokens，Open Science 约 281B tokens，Open Web 约 73B tokens，Open Semantic 约 68B tokens。这个分布说明它的差异化价值不是抓取更多网页，而是把过去不容易进入 LLM 预训练的数据源纳入同一可审计框架。</p>\n<p>许可过滤可以形式化为一个集合选择问题。设 <span class=\"kb-math kb-math-inline\">S_s</span> 是每个来源的原始文档集合，<span class=\"kb-math kb-math-inline\">\\mathcal{L}_{open}</span> 是允许任意使用的许可集合，Common Corpus 的第一层约束是：</p>\n<div class=\"kb-math kb-math-display\">D_{\\text{license}} = \\{d \\in \\bigcup_s S_s : \\operatorname{license}(d) \\in \\mathcal{L}_{open}\\}</div>\n<p>这一步和常见网页数据集的“抓到再过滤质量”不同，它先限定数据权利边界，再做清洗。每个文档保留 license、source URL、language、collection/domain 等元数据，因此下游用户可以根据商业用途、署名要求、语言或领域再筛选。对 LLM 训练来说，这种 metadata-rich corpus 的价值在于可追责：模型出问题时可以回溯数据来源，部署前也可以按组织政策移除某些许可证类型。</p>\n<p>清洗流程的难点来自历史和多语言数据。Open Culture 与 Open Government 中大量文本来自扫描件和 OCR，错误类型包括断词、粘连、乱码、版面顺序错乱和古旧拼写。论文为此开发 Segmentext 做抗噪文本分段，用 OCRoscope 统计无法识别的 7-gram 比例作为 OCR 质量信号，用更重的 OCRerrcr 做高精度错误检测，再用 OCRonos 修复严重损坏文本。OCR 质量可以写成：</p>\n<div class=\"kb-math kb-math-display\">q_{\\text{ocr}}(d)=1-\\frac{\\#\\text{unknown 7-grams}(d)}{\\#\\text{all 7-grams}(d)}</div>\n<p>当 <span class=\"kb-math kb-math-inline\">q_{\\text{ocr}}</span> 太低时，文档不是简单丢弃，而可能进入 OCRonos 修复。这个选择很重要，因为公共领域文化遗产常常是高价值但低可用性的文本，如果只按现代网页规则过滤，许多低资源语言和历史材料会被误删。</p>\n<p>PII 和毒性处理体现了“合规”不只等于“有开放许可证”。论文使用 Microsoft Presidio 检测个人可识别信息，并通过自定义正则把电话识别准确率提升到更高水平；处理方式不是简单替换成 <code>[PHONE]</code> 这类标签，而是换成虚构但格式真实的值，避免破坏模型学习真实文本格式。毒性处理则用 Celadon，一个从 2M 标注样本训练的 DeBERTa-v3-small 多语言分类器，检测 race/origin、gender/sexuality、religion、ability、violence/abuse 等维度的有害内容。对公共领域历史文本而言，即便没有版权风险，也可能包含过时歧视性表达，因此需要删除或合成改写。</p>\n<p>整体目标可以写成一个多约束筛选与修复过程：</p>\n<div class=\"kb-math kb-math-display\">D_{\\text{CC}} = \\{\\operatorname{clean}(d): d \\in D_{\\text{license}},\\ q_{\\text{ocr}}(d) &gt; \\gamma,\\ \\operatorname{pii}(d)=\\varnothing,\\ \\operatorname{tox}(d)&lt;\\tau\\}</div>\n<p>这里的 <span class=\"kb-math kb-math-inline\">\\operatorname{clean}</span> 不是单一函数，而是分段、OCR 修复、PII 替换、毒性删除或改写、语言识别和元数据写入的组合。对于 Wikidata，论文还把 RDF triples 转成自然语言式序列，例如把实体和属性 ID 展开为“Franz Liszt country of citizenship Kingdom of Hungary”一类文本，使结构化知识也能进入自回归语言模型训练。</p>\n<p>与 Dolma、FineWeb、C4、ROOTS 等数据集相比，Common Corpus 的创新点在四个条件同时满足：多域、超越网页抓取、多语言、开放数据。论文指出，FineWeb 这类高质量网页语料在性能上很强，但主要仍是 web crawl；Common Corpus 与其 top domains 的重叠很低，提供的是互补内容。它的局限也很明确：2T tokens 对中小模型预训练已经有价值，但对 frontier-scale 大模型仍不够；同时开放数据本身存在 open data paradox，即许多合法开放资源并不容易被搜索引擎和 CommonCrawl 抓到，需要专门的社区、机构和工具去整理。</p>\n<div class=\"key-point\">💡 关键：Common Corpus 的“算法”不是一个新模型结构，而是一套可审计数据治理流水线；它把许可证、来源、语言、OCR 质量、PII 和毒性都变成预训练语料构建中的显式约束。</div>",
      "quiz": {
        "q": "Common Corpus 与 FineWeb/RefinedWeb 的最核心区别是什么？",
        "options": [
          "Common Corpus 只包含英文网页，FineWeb/RefinedWeb 主要包含代码",
          "Common Corpus 优先保证开放许可、provenance 和多域多语言合规性，而不只是清洗 CommonCrawl 网页",
          "Common Corpus 不做任何文本清洗或 PII 处理",
          "Common Corpus 的主要创新是更大的 Transformer 架构"
        ],
        "answer": 1,
        "explain": "Common Corpus 的核心贡献是构建可发布、可审计、许可明确的多语言多域预训练数据，并配套 OCR、PII、毒性等治理流程。"
      }
    },
    {
      "id": "essential_web",
      "num": 17,
      "name": "Essential-Web",
      "fullName": "Essential-Web数据集 (Essential-Web Dataset)",
      "year": "2026",
      "org": "学术界",
      "parent": "fineweb",
      "paperUrl": "https://arxiv.org/abs/2501.02404",
      "projectUrl": "",
      "category": "data",
      "motivation": "24T带12类文档分类标签",
      "summary": "Essential-Web 提出一个 24T token、23.6B 文档级标注的网页预训练数据集，用 12 类 taxonomy 把 Common Crawl 从“只能按粗糙质量分数筛选”的语料池改造成可用 SQL 风格条件组合的数据索引。它解决的是开放预训练数据难以审计、难以按领域快速重组的问题，使数学、代码、STEM、医学等子集可以通过标签过滤而不是重新训练专用分类器获得。",
      "keyPoints": [
        "数据规模：覆盖 23.6B 个去重并启发式过滤后的 Common Crawl 文档，总量约 24T tokens。",
        "标注结构：每个网页获得 12 个类别标签，横跨 FDC 主题层级、Bloom 教育目标、Document Type、Content Quality、Extraction 五个逻辑组。",
        "教师模型：选择 <code>Qwen2.5-32B-Instruct</code> 作为合成标注教师，在速度和 annotator <span class=\"kb-math kb-math-inline\">\\kappa</span> 之间取得平衡。",
        "学生模型：用 82B token 的教师标注数据微调 <code>Qwen2.5-0.5B-Instruct</code>，得到 <code>EAI-Distill-0.5b</code> 文档分类器。",
        "推理优化：通过输出格式压缩、context distillation 和小模型蒸馏，将生成式长输出分类转化为高吞吐短标签预测。",
        "标签质量评估：用 inter-category NMI 衡量类别正交性，用 annotator <span class=\"kb-math kb-math-inline\">\\kappa</span> 衡量标签正确性，用 domain-recall 衡量领域召回。",
        "下游使用方式：研究者通过 SQL-like filters 组合主题、网页类型、推理深度、技术正确性、抽取质量等字段，快速构造领域预训练子集。",
        "下游效果：无领域专用训练的 taxonomy 过滤在数学上接近 SOTA，在 web code、STEM、medical 上报告相对 SOTA 的明显提升。"
      ],
      "detail": "<p><img alt=\"Essential-Web 数据处理管线图\" src=\"https://www.eventual.ai/blog/assets/essential.png\" />\n<em>图：Essential-Web 构建流程中的大规模网页处理与过滤管线示意。论文首页的核心思想是把一次性大规模标注成本摊销为后续可复用的语义索引。</em></p>\n<pre><code class=\"language-python\"># Essential-Web / EAI-Taxonomy 简化构建流程\ncommon_crawl = load_deduplicated_filtered_common_crawl()\n\n# 1. 用强教师模型生成文档级 taxonomy 标签\nteacher = &quot;Qwen2.5-32B-Instruct&quot;\nseed_docs = sample(common_crawl, n=104_600_000)\nteacher_labels = teacher_annotate(seed_docs, taxonomy=EAI_TAXONOMY_12_CATEGORIES)\n\n# 2. 蒸馏为高吞吐学生分类器\nstudent = finetune(\n    base_model=&quot;Qwen2.5-0.5B-Instruct&quot;,\n    inputs=seed_docs,\n    targets=condense_labels(teacher_labels),\n    loss_mask=&quot;completion_only&quot;,\n    tokens=&quot;82B&quot;,\n)\n\n# 3. 在全量网页上推理，形成文档级语义索引\nfor shard in stream(common_crawl):\n    labels = student.predict(shard)\n    write_parquet(shard.document_id, shard.text, labels)\n\n# 4. 用 SQL-like filters 直接构造领域数据集\nmath_docs = sql_filter(\n    subject_fdc=&quot;51 - Mathematics&quot;,\n    reasoning_depth=[&quot;intermediate&quot;, &quot;advanced&quot;],\n    technical_correctness=&quot;high&quot;,\n    document_type_not_in=[&quot;ad&quot;, &quot;product_listing&quot;],\n    extraction_artifacts=&quot;low&quot;,\n)\n</code></pre>\n<p>Essential-Web 的核心不是再提出一个单一质量分数，而是把网页内容映射到一个多轴坐标系。论文把 taxonomy 定义为有限类别集合 <span class=\"kb-math kb-math-inline\">T=\\{C_1,\\dots,C_k\\}</span>，每个类别 <span class=\"kb-math kb-math-inline\">C_i</span> 有固定标签集合 <span class=\"kb-math kb-math-inline\">L_i</span>。对单个文档 <span class=\"kb-math kb-math-inline\">d</span>，分类器输出可理解为：</p>\n<div class=\"kb-math kb-math-display\">f(d)=\\left((\\lambda_1,\\mu_1),\\dots,(\\lambda_{12},\\mu_{12})\\right),\\qquad\n\\lambda_i\\in L_i,\\ \\mu_i\\in L_i\\cup\\{\\bot\\},\\ \\mu_i\\ne\\lambda_i</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\lambda_i</span> 是主标签，<span class=\"kb-math kb-math-inline\">\\mu_i</span> 是可选副标签，<span class=\"kb-math kb-math-inline\">\\bot</span> 表示没有副标签。这个设计比单标签主题分类更适合网页，因为一个页面可能同时是“数学教程”和“代码文档”，也可能主题正确但抽取质量很差。固定 12 个类别意味着后续不需要为每个新领域重新定义模型输出，只需要在已有列上组合查询条件。</p>\n<p>12 个类别被组织为五组。FDC 提供三级主题标签，例如 Level 1 的 Science、Level 2 的 Mathematics、Level 3 的 Algebra；Bloom 组提供 Cognitive Process 和 Knowledge Domain，用于刻画学习目标与知识抽象层次；Document Type 包含 broad V1 和 fine V2 两套网页类型；Content Quality 包含 Reasoning Depth、Educational Level、Technical Correctness；Extraction 组包含 Extraction Artifacts 和 Missing Content。论文报告全量 23.6B 文档上有 14.1M 种主标签组合，以及 1.2B 种主/副标签组合，这说明 taxonomy 的组合空间足以表达细粒度网页差异。</p>\n<div class=\"key-point\">💡 关键：Essential-Web 把“数据集构造”从训练一个新的二分类器，改写为在一个统一标签表上做组合查询。一次昂贵标注换来许多后续廉价数据切片。</div>\n<p>教师模型选择是方法的第一层工程权衡。论文比较 <code>DeepSeek-V3</code>、<code>Qwen2.5-72B-Instruct</code> 和 <code>Qwen2.5-32B-Instruct</code>，用 annotator <span class=\"kb-math kb-math-inline\">\\kappa</span>、NMI 与 domain-recall 评估。虽然 <code>DeepSeek-V3</code> 的平均 <span class=\"kb-math kb-math-inline\">\\kappa</span> 更高，但 671B MoE 服务成本过高；<code>Qwen2.5-32B-Instruct</code> 在 random 与 STEM 集上整体 <span class=\"kb-math kb-math-inline\">\\kappa</span> 约 0.74，明显快于更大模型，并且平均 inter-category NMI 在 random/STEM 上约 0.079/0.083，说明标签之间冗余较低。因此论文选择 32B Qwen 作为标注教师，而不是盲目追求最大模型。</p>\n<p>学生模型 <code>EAI-Distill-0.5b</code> 是 Essential-Web 能扩展到 23.6B 文档的关键。论文不是直接让 0.5B 模型复现教师的长自然语言解释，而是先把教师输出程序化压缩为短标签格式，将平均 generation tokens 从约 791 降到 51；再通过 context distillation 移除推理时的大提示词开销；最后只在教师 completion token 上计算损失，屏蔽输入文档、chat template 和 system prompt。这使学生模型相对原始 <code>Qwen2.5-32B</code> prompting 获得约 50 倍推理吞吐提升，同时平均 annotator <span class=\"kb-math kb-math-inline\">\\kappa</span> 只从 0.74 降到约 0.72，论文称相对下降小于 3%。</p>\n<p>标签质量有三个互补指标。类别正交性用 normalized mutual information：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{NMI}(X,Y)=\\frac{2I(X;Y)}{H(X)+H(Y)},\\qquad\nI(X;Y)=\\sum_{x,y}p_{xy}\\log\\frac{p_{xy}}{p_xp_y}</div>\n<p>如果 NMI 接近 0，说明两个类别提供的信息基本独立；如果接近 1，说明两个类别几乎重复。标签正确性用 Cohen-style <span class=\"kb-math kb-math-inline\">\\kappa</span>：</p>\n<div class=\"kb-math kb-math-display\">\\kappa=\\frac{P_o-P_e}{1-P_e}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">P_o</span> 是模型与 gold annotators 的实际一致率，<span class=\"kb-math kb-math-inline\">P_e</span> 是按经验标签分布估计的随机一致率。领域可表达性用 domain-recall：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{Recall}=\\frac{|\\widehat{D}\\cap D^+|}{|D^+|}</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">D^+</span> 是人工验证的领域 URL 集合扩展出的正例文档，<span class=\"kb-math kb-math-inline\">\\widehat{D}</span> 是过滤器返回的文档。这个指标直接回答“简单标签过滤能召回多少真实领域网页”。</p>\n<p>下游构造体现了 taxonomy 的实用价值。数学数据集可以只用 <code>FDC == 51 - Mathematics</code>、reasoning depth、technical correctness、document type 等条件组合得到 29B token 的 <code>EAI-Taxonomy Top Math</code>，也可以先用 FDC 高召回 116M 数学文档，再只在这个小集合上运行 FineMath classifier，得到 34B token 的 <code>Math w/ FM</code>。这种设计把昂贵专用分类器从全 Common Crawl 扫描缩小到高密度候选集。代码数据集也类似，用 FDC <code>004/005</code>、代码相关 document type、技术正确性与 DCLM 分数构造 web code 子集。</p>\n<p>与 FineWeb/DCLM 这类基线相比，Essential-Web 的区别在于可解释字段数量和重组方式。FineWeb/DCLM 主要给出质量过滤、启发式清洗或一个整体分类器分数，用户想得到新领域往往要重新收集正负例、训练高召回分类器并扫全量数据。Essential-Web 则把主题、网页形式、难度、技术正确性和抽取缺陷拆成列，使“高质量医学教材”“包含高级推理的数学页面”“不是广告的 API 文档”等复杂集合可以被声明式表达。代价是初始标注很昂贵，论文估计全量推理约需 90k AMD MI300x GPU-hours；收益是该成本被后续无限次过滤和审计摊销。</p>",
      "quiz": {
        "q": "Essential-Web 相比只给网页一个质量分数的数据集，最核心的方法优势是什么？",
        "options": [
          "用 12 类文档级 taxonomy 把网页变成可组合查询的语义索引",
          "完全取消了 Common Crawl 的去重和启发式过滤",
          "只保留数学网页，因此提高了 GSM8K 分数",
          "用更大的教师模型直接训练所有下游模型"
        ],
        "answer": 0,
        "explain": "论文的关键贡献是为 23.6B 文档生成多轴标签，使数据子集能通过 SQL-like filters 重组，而不是为每个领域重新训练分类器。"
      }
    },
    {
      "id": "fed_dedup",
      "num": 18,
      "name": "FED框架",
      "fullName": "FED去重框架 (Fast and Efficient Dataset Deduplication)",
      "year": "2026",
      "org": "学术界",
      "parent": "minhash_dedup",
      "paperUrl": "https://arxiv.org/abs/2501.02404",
      "projectUrl": "",
      "category": "data",
      "motivation": "GPU加速MinHash快107倍",
      "summary": "FED/SEDD 类 GPU 去重框架把 MinHash LSH 的签名生成、分桶和候选相似度验证搬到多 GPU 流水线上，解决了万亿 token 级语料去重中 CPU MinHash 过慢、GPU 数据搬移过重的问题。其核心贡献是用可复用 rolling hash、流式通信和硬件感知参数选择显著提高端到端吞吐。",
      "keyPoints": [
        "公开可读的对应实现论文为 SEDD: Scalable and Efficient Dataset Deduplication with GPUs",
        "沿用 MinHash LSH 的文档级近重复检测思想，目标是保持与标准 MinHash 高相似的重复集合",
        "用部分可复用哈希函数加速 n-gram MinHash 签名生成，减少重复计算",
        "用 GPU kernel 并行完成 MinHash 生成、bucket 扫描和 pairwise similarity verification",
        "用 streaming-based approach 替代物理数据 shuffle，降低多 GPU/多节点通信瓶颈",
        "在 30M 文档上相对 CPU SlimPajama 工具最高 158×，相对 NeMo Curator GPU baseline 最高 7.8×",
        "在 8 节点 32 GPU V100 集群上完成 1.2T tokens 去重约 3 小时，并保持与标准 MinHash 重复集合 Jaccard 相似度大于 0.95"
      ],
      "detail": "<p><img alt=\"SEDD GPU 去重框架总览\" src=\"https://ar5iv.labs.arxiv.org/html/2501.01046/assets/x3.png\" />\n<em>图：SEDD 论文 Figure 3，展示多 GPU 文档加载、MinHash 生成、按 band 分配 bucket、GPU 候选验证和流式通信。Manifest 中 paper_url 指向不相关论文，正文依据公开论文 arXiv:2501.01046 补足。</em></p>\n<pre><code class=\"language-python\"># GPU 加速 MinHash LSH 去重伪代码\ndef gpu_fed_dedup(documents, num_hashes=128, bands=16, threshold=0.8):\n    gpu_streams = init_gpu_streams()\n    duplicate_edges = []\n\n    for batch in stream_documents(documents):\n        tokens = tokenize_on_cpu(batch)\n        shingles = build_ngrams(tokens, n=5)\n\n        # GPU 上用可复用 rolling hash 生成 MinHash 签名\n        signatures = gpu_minhash(shingles, num_hashes, reusable_hash=True)\n        band_keys = gpu_split_and_hash_bands(signatures, bands)\n\n        # 不做全量物理 shuffle，而是按 band/rank 流式派发候选桶\n        for rank, bucket_stream in stream_buckets_by_rank(band_keys):\n            candidates = gpu_collect_candidate_pairs(bucket_stream)\n            verified = gpu_verify_similarity(candidates, signatures, threshold)\n            duplicate_edges.extend(verified)\n\n    clusters = union_find(duplicate_edges)\n    return keep_representatives(documents, clusters)\n</code></pre>\n<p><strong>动机与背景：MinHash LSH 可扩展，但传统实现不是硬件友好的。</strong> 文档级近重复去重通常先把每篇文档转成 n-gram 集合，再生成 MinHash 签名，通过 LSH bands 找候选重复对。算法复杂度比全量两两比较低很多，但在 C4、SlimPajama、Common Crawl 级规模上，签名生成和分桶仍会消耗大量 CPU 时间；朴素 GPU 版本又容易被数据 shuffle、bucket 不均衡和 GPU occupancy 不足拖慢。</p>\n<p><strong>核心机制一：复用哈希计算。</strong> 标准 MinHash 对每个 shingle 施加多个 hash permutation，生成 <span class=\"kb-math kb-math-inline\">H</span> 个最小值。SEDD/FED 的关键优化是把相邻 n-gram 的哈希计算改成部分可复用形式，类似 rolling hash：当窗口从 <span class=\"kb-math kb-math-inline\">g_t</span> 滑到 <span class=\"kb-math kb-math-inline\">g_{t+1}</span> 时，只更新离开和进入窗口的 token 贡献。这样 MinHash signature generation 不再重复处理大部分相邻上下文。</p>\n<div class=\"kb-math kb-math-display\">\\text{sig}_h(d)=\\min_{s\\in \\text{shingles}(d)} h(s)</div>\n<p><strong>核心机制二：分桶和验证都围绕 GPU 占用率设计。</strong> MinHash LSH 会把签名切成 <span class=\"kb-math kb-math-inline\">b</span> 个 band，每个 band 产生 bucket key。传统分布式实现常把同一 bucket 的文档物理 shuffle 到同一 worker；SEDD/FED 则让 GPU process 负责特定 band 子集，通过流式方式读入 bucket 并立刻验证候选对。这样避免大规模中间状态落盘或跨节点搬移，同时让 bucket 内 pairwise comparison 在 GPU 上以较大 batch 执行。</p>\n<p><strong>训练数据管线中的作用：快，但不牺牲重复集合质量。</strong> 论文不是用启发式精确哈希替代 MinHash，而是尽量保持 MinHash LSH 的候选召回和判定逻辑。实验用标准 MinHash 或 exact MinHash 近似作为 oracle，报告重复集合 Jaccard overlap 通常在 0.95 以上。这一点很重要，因为预训练去重错误会改变数据分布：过度去重会丢内容，漏去重会增加记忆化和评测污染。</p>\n<p><strong>与 CPU MinHash 和 NeMo Curator 的区别：端到端瓶颈不同。</strong> CPU baseline 的瓶颈主要是签名生成；早期 GPU baseline 虽然加速了部分 kernel，但物理 shuffle 和小 bucket 使 GPU 利用率低。SEDD/FED 的设计把 hash、bucket、candidate verification 和通信方式一起改，因而端到端收益高于单个 CUDA kernel 的局部优化。</p>\n<div class=\"warn-box\">⚠️ 注意：该类框架仍是 MinHash LSH 去重，不会发现语义等价但 n-gram 不相似的文档；它优化的是网页级近重复去重的工程吞吐。</div>",
      "quiz": {
        "q": "FED/SEDD 加速 MinHash 去重的主要瓶颈改造是什么？",
        "options": [
          "把所有文档翻译成英文",
          "用 GPU 并行 MinHash/候选验证，并用流式分桶降低通信开销",
          "只做 MD5 精确去重",
          "训练一个语言模型判断重复"
        ],
        "answer": 1,
        "explain": "框架保留 MinHash LSH 逻辑，但把签名生成、分桶和候选验证做成 GPU 友好流水线。"
      }
    },
    {
      "id": "lshbloom",
      "num": 19,
      "name": "LSHBloom",
      "fullName": "LSHBloom去重 (LSHBloom Deduplication)",
      "year": "2026",
      "org": "学术界",
      "parent": "fed_dedup",
      "paperUrl": "https://arxiv.org/abs/2501.02404",
      "projectUrl": "",
      "category": "data",
      "motivation": "Bloom Filter节省18倍空间",
      "summary": "LSHBloom 用一组 Bloom filters 替代传统 MinHashLSH 的树或哈希表索引，解决互联网规模文本近重复去重时索引过大、插入查询过慢的问题。它保留 MinHashLSH 基于 Jaccard 相似度的近重复判定框架，同时把额外误差限制为可解析控制的 Bloom false positive 开销。",
      "keyPoints": [
        "目标场景：面向 LLM 预训练、RAG、全文搜索等持续数据摄入流程中的大规模文本近重复去重。",
        "基线问题：传统 MinHashLSH 需要存储每个 band 的签名索引，规模上升后磁盘、内存和随机访问成为瓶颈。",
        "核心结构：为 MinHash signature matrix 的每个 band 建一个 Bloom filter，而不是保存完整 band 签名到 prefix tree/hashmap。",
        "插入方式：文档先计算 MinHash 签名，再按 <span class=\"kb-math kb-math-inline\">b</span> 个 bands、每 band <span class=\"kb-math kb-math-inline\">r</span> 行分组，最后把每个 band 压缩成一个整数写入对应 Bloom filter。",
        "查询方式：新文档只要在任一 band 的 Bloom filter 中命中，就被判为候选重复或重复。",
        "误差控制：Bloom filter 不产生 false negative，只增加可设定的 false positive overhead <span class=\"kb-math kb-math-inline\">p_{\\text{effective}}=1-(1-p)^b</span>。",
        "空间收益：在 peS2o 全量实验中，LSHBloom 约 11GB 磁盘，MinHashLSH 超过 200GB，约 18 倍节省。",
        "扩展估计：处理 5B 文档时，MinHashLSH 估计需要约 277TB 索引，而保守 Bloom FP 设置下 LSHBloom 约 15.5TB。",
        "工程优化：用 Rust/128-bit arithmetic 优化 band 向量哈希，替换 Python 大整数逻辑，端到端墙钟时间提升约 11 倍。"
      ],
      "detail": "<p><img alt=\"LSHBloom 运行时间分解\" src=\"https://arxiv.org/html/2411.04257v3/figs/scaling2/breakdown_time.jpg\" />\n<em>图：LSHBloom 与其他去重方法在 peS2o 扩展实验中的时间分解。论文指出 MinHashing 是主要时间来源，而 Bloom filter 索引显著降低插入/查询索引的成本。</em></p>\n<pre><code class=\"language-python\"># LSHBloom 近重复去重伪代码\nclass LSHBloomIndex:\n    def __init__(self, num_bands, rows_per_band, bloom_fpr):\n        self.b = num_bands\n        self.r = rows_per_band\n        self.filters = [BloomFilter(false_positive_rate=bloom_fpr) for _ in range(num_bands)]\n\n    def band_hash(self, band_values, modulus):\n        # 论文使用通用哈希思想：把 r 个 MinHash 值压缩成一个整数\n        return sum(hash_i(x) for hash_i, x in zip(universal_hashes, band_values)) % modulus\n\n    def query(self, document):\n        sig = minhash(document)              # length ~= b * r\n        for j in range(self.b):\n            band = sig[j * self.r : (j + 1) * self.r]\n            key = self.band_hash(band, N)\n            if key in self.filters[j]:       # 任一 band 命中即视作重复\n                return True\n        return False\n\n    def insert_if_new(self, document):\n        if self.query(document):\n            return &quot;duplicate&quot;\n        sig = minhash(document)\n        for j in range(self.b):\n            band = sig[j * self.r : (j + 1) * self.r]\n            key = self.band_hash(band, N)\n            self.filters[j].add(key)\n        return &quot;inserted&quot;\n</code></pre>\n<p>传统 MinHashLSH 的基本思想是避免 <span class=\"kb-math kb-math-inline\">O(n^2)</span> 文档两两比较。先把文档表示为 n-gram 集合，两个文档的相似度用 Jaccard：</p>\n<div class=\"kb-math kb-math-display\">J(A,B)=\\frac{|A\\cap B|}{|A\\cup B|}</div>\n<p>MinHash 的性质是 <span class=\"kb-math kb-math-inline\">\\Pr[h_{\\min}(A)=h_{\\min}(B)] = J(A,B)</span>，因此多个随机排列产生的签名可以近似估计 Jaccard。LSH 再把签名矩阵切成 <span class=\"kb-math kb-math-inline\">b</span> 个 band，每个 band 有 <span class=\"kb-math kb-math-inline\">r</span> 行；如果两个文档在任一 band 完全相同，就把它们作为相似候选。给定真实相似度 <span class=\"kb-math kb-math-inline\">t</span>，至少一个 band 命中的概率是：</p>\n<div class=\"kb-math kb-math-display\">P_{\\mathrm{candidate}}(t)=1-(1-t^r)^b</div>\n<p>这会形成一个 S 型曲线，<span class=\"kb-math kb-math-inline\">b,r</span> 控制阈值 <span class=\"kb-math kb-math-inline\">T</span> 附近的 false positive / false negative trade-off。</p>\n<p>MinHashLSH 的瓶颈不在 MinHash 数学本身，而在索引。传统实现需要把每个 band 的签名作为 key 存入 prefix tree 或 hashmap，并维护 key 到文档 ID 的映射。随着文档数、MinHash 位宽和 permutations 增加，索引线性膨胀，而且随机访问和 pointer chasing 会拖慢吞吐。论文给出的典型例子是 peS2o 仅 39M 学术文档，MinHashLSH 就需要超过 200GB 磁盘；扩展到数十亿文档时，索引会进入 TB 甚至 PB 级难以操作。</p>\n<p>LSHBloom 的关键替换是：不再保存“谁和谁匹配”的完整倒排索引，而只回答“这个 band 值之前是否出现过”。每个 band 对应一个 Bloom filter，插入文档时把该 band 的 <span class=\"kb-math kb-math-inline\">r</span> 个 MinHash 值压缩成一个整数。论文使用通用哈希式的向量哈希：</p>\n<div class=\"kb-math kb-math-display\">h(\\bar{x})=\\left(\\sum_{i=1}^{r} h_i(x_i)\\right)\\bmod N</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">\\bar{x}</span> 是某个 band 的 <span class=\"kb-math kb-math-inline\">r</span> 个签名值，<span class=\"kb-math kb-math-inline\">N</span> 是哈希值空间大小。然后把 <span class=\"kb-math kb-math-inline\">h(\\bar{x})</span> 写入对应 Bloom filter。查询时重复同样过程，只要任一 Bloom filter 报告“可能存在”，就判为重复。这使索引变成连续 bit arrays，空间由预计文档数和目标 false positive rate 决定，而不再随原始 band key 的存储开销线性爆炸。</p>\n<div class=\"key-point\">💡 关键：LSHBloom 牺牲的是“返回所有匹配文档 ID”的能力，换来“在线判断是否重复”的极低空间索引。对预训练数据摄入来说，常见需求正是保留或丢弃当前文档，而不是枚举所有重复对。</div>\n<p>误差分析说明了为什么 Bloom 替换是可控的。若每个 Bloom filter 的 false positive rate 是 <span class=\"kb-math kb-math-inline\">p</span>，共有 <span class=\"kb-math kb-math-inline\">b</span> 个 bands，则任一 filter 误报的有效概率为：</p>\n<div class=\"kb-math kb-math-display\">p_{\\text{effective}}=1-(1-p)^b</div>\n<p>如果用户想指定整体额外误报率 <span class=\"kb-math kb-math-inline\">p_{\\text{effective}}</span>，可以反推单个 Bloom filter 的 <span class=\"kb-math kb-math-inline\">p</span>：</p>\n<div class=\"kb-math kb-math-display\">p=1-(1-p_{\\text{effective}})^{1/b}</div>\n<p>Bloom filter 不会 false negative，因此 LSHBloom 的 false negative 主要来自 MinHashLSH 本身；Bloom 的额外 false positive 还会把一小部分原本的 LSH false negatives 变为 positives。论文给出的整体 false positive 近似为：</p>\n<div class=\"kb-math kb-math-display\">FP_{\\mathrm{bloom}}=FP_{\\mathrm{lsh}}+(1-FP_{\\mathrm{lsh}})(p_{\\mathrm{effective}}+b/N)</div>\n<p>false negative 则为：</p>\n<div class=\"kb-math kb-math-display\">FN_{\\mathrm{bloom}}=(1-(p_{\\mathrm{effective}}+b/N))FN_{\\mathrm{lsh}}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">b/N</span> 是把 band 向量压缩成整数时的哈希碰撞项。由于 <span class=\"kb-math kb-math-inline\">p_{\\text{effective}}</span> 可以通过分配更多 bit 降到很小，LSHBloom 的额外误差在实际设置中可以近似忽略。</p>\n<p>Bloom filter 的空间公式解释了 18 倍节省的来源。若预计插入 <span class=\"kb-math kb-math-inline\">n</span> 个元素，单个 Bloom filter 目标 false positive rate 为 <span class=\"kb-math kb-math-inline\">p</span>，最优 bit 数为：</p>\n<div class=\"kb-math kb-math-display\">m=-\\frac{n\\log p}{(\\log 2)^2}\\ \\text{bits}</div>\n<p>LSHBloom 需要 <span class=\"kb-math kb-math-inline\">b</span> 个这样的 filters，但其大小只依赖 <span class=\"kb-math kb-math-inline\">n,b,p</span>，不依赖 MinHash hashvalue 是 32-bit、64-bit 还是 128-bit。相反，传统 MinHashLSH 需要存储签名 key，hashvalue 位宽和 permutations 增加都会线性推高索引。论文举例：<span class=\"kb-math kb-math-inline\">T=0.8</span>、128 permutations、9 bands、10B 文档、<span class=\"kb-math kb-math-inline\">p_{\\text{effective}}=10^{-10}</span> 时，LSHBloom 约 590GB，而传统 MinHashLSH 约 46TB，近 80 倍差距。</p>\n<p>工程部分同样重要。论文 profiling 发现原始 LSHBloom 中，对 band 整数向量做哈希占插入/查询时间超过 90%，原因是 Python extended-precision integer 表示低效。由于 64-bit MinHash 值累加最多需要约 71-bit 无符号精度，作者改用 Rust 和 128-bit arithmetic，实现无溢出的向量化累加，并用硬件 <code>adc</code>/carry 机制降低成本。这个函数比 Python 版本快 94% 以上，带来约 11 倍端到端墙钟提升。最终系统还利用 <code>/dev/shm</code> 的 node-local shared memory 放置 Bloom filters，减少网络文件系统 I/O。</p>\n<p>与 DOLMA/CCNet 这类段落级 exact-ish Bloom 去重相比，LSHBloom 仍保留 MinHashLSH 对近重复的敏感性；与传统 MinHashLSH 相比，它不再保存重复对映射，因而更适合在线摄入。这个取舍非常贴合 LLM 数据管线：如果目标是“当前文档是否应被丢弃”，Bloom membership 足够；如果目标是构建完整重复簇、做可解释数据溯源，则可能仍需要传统索引或后处理来恢复文档对。</p>",
      "quiz": {
        "q": "LSHBloom 为什么能比传统 MinHashLSH 显著节省索引空间？",
        "options": [
          "它完全不计算 MinHash，直接按字符串精确匹配",
          "它用每个 band 一个 Bloom filter 的近似 membership 结构替代树或哈希表索引",
          "它降低 Jaccard 阈值，因此保留更少文档",
          "它只处理短文档，跳过长文档"
        ],
        "answer": 1,
        "explain": "LSHBloom 仍使用 MinHashLSH 的 banding 逻辑，但把 band key 是否出现过存入 Bloom filters，不再存储完整 key 到文档 ID 的索引。"
      }
    },
    {
      "id": "data_mixing_agent",
      "num": 20,
      "name": "Data Mixing Agent",
      "fullName": "数据混合代理 (Data Mixing Agent)",
      "year": "2026",
      "org": "学术界",
      "parent": "doremi",
      "paperUrl": "https://arxiv.org/abs/2604.16380",
      "projectUrl": "",
      "category": "data",
      "motivation": "强化学习动态数据加权",
      "summary": "Data Mixing Agent 将持续预训练中的领域配比更新建模为 MDP，并用大量数据混合轨迹和 CQL 离线强化学习训练一个轻量代理来动态输出下一阶段领域权重。它解决的是 DoReMi/RegMix 等静态或代理模型方法难以随训练状态变化、且难以跨领域泛化的问题。",
      "keyPoints": [
        "正确方法论文为 Data Mixing Agent: Learning to Re-weight Domains for Continual Pre-training, arXiv:2507.15640",
        "将 domain re-weighting step 形式化为 MDP：状态包含历史混合轨迹、环境反馈和训练进度，动作是概率 simplex 上的领域分布",
        "先随机采样大量 data mixing trajectories，每条轨迹含多次固定 budget 的领域重加权步骤",
        "对每个轨迹训练小型 proxy model，并通过评测环境获得 reward/feedback",
        "用监督学习初始化 agent，再用 Conservative Q-Learning (CQL) 做离线 off-policy 强化学习",
        "目标训练时无需重新采样轨迹，agent 根据历史状态在线预测下一阶段混合比例",
        "实验显示 agent 可跨 source fields、target models 和 domain spaces 泛化，并在数学推理/代码等持续预训练中优于静态和动态 baselines"
      ],
      "detail": "<p><img alt=\"Data Mixing Agent 总览\" src=\"https://ar5iv.labs.arxiv.org/html/2507.15640/assets/x2.png\" />\n<em>图：Data Mixing Agent 论文 Figure 2，展示轨迹采样、proxy model 环境反馈、CQL 训练 agent，以及目标模型持续预训练时在线预测混合比例的流程。Manifest 的 paper_url 是 data mixing survey，正文用具体方法论文补足。</em></p>\n<pre><code class=\"language-python\"># Data Mixing Agent 训练与使用伪代码\ndef train_data_mixing_agent(domain_space, proxy_model, eval_env):\n    replay = []\n    for traj_id in range(num_trajectories):\n        trajectory = sample_random_mixing_trajectory(domain_space, steps=T)\n        ckpts = train_proxy_with_trajectory(proxy_model, trajectory)\n        feedback = [eval_env.evaluate(ckpt) for ckpt in ckpts]\n        replay.extend(to_transitions(trajectory, feedback))\n\n    agent = supervised_warm_start(replay)  # imitate good observed actions\n    agent = conservative_q_learning(agent, replay)  # offline actor-critic\n    return agent\n\ndef continual_pretrain_with_agent(target_model, agent, domains, budget):\n    history = []\n    while budget.remaining_tokens &gt; 0:\n        state = encode_state(history, validation_feedback(target_model))\n        weights = agent.predict_distribution(state)  # action on simplex\n        batch_stream = sample_domains(domains, weights)\n        target_model.train_for_one_stage(batch_stream)\n        history.append((weights, validation_feedback(target_model)))\n    return target_model\n</code></pre>\n<p><strong>动机与背景：数据混合不是一次性超参数。</strong> DoReMi 用 proxy model 和 group DRO 思想找静态领域权重，RegMix 等方法从候选混合中拟合性能预测器；这些方法能减少人工调配，但通常把“混合比例”当成训练前确定的 recipe。持续预训练不同：模型在不同阶段的短板会变化，早期需要补基础分布，后期可能需要更多目标领域或互补领域。Data Mixing Agent 因此把配比看成序列决策，而不是单点优化。</p>\n<p><strong>MDP 表述：动作是整个 domain distribution。</strong> 在第 <span class=\"kb-math kb-math-inline\">t</span> 个 re-weighting step，agent 观察历史混合比例、阶段评测反馈、目标领域表现等状态 <span class=\"kb-math kb-math-inline\">s_t</span>，输出动作 <span class=\"kb-math kb-math-inline\">a_t\\in \\Delta^K</span>，即 <span class=\"kb-math kb-math-inline\">K</span> 个领域上的采样概率。环境用该动作训练 proxy 或 target model 一段 token budget 后返回 reward。优化目标是最大化整条轨迹的累计收益：</p>\n<div class=\"kb-math kb-math-display\">\\max_\\pi \\mathbb{E}_{a_t\\sim \\pi(\\cdot|s_t)}\\left[\\sum_{t=1}^{T}\\gamma^{t-1} r(s_t,a_t)\\right]</div>\n<p><strong>为什么用 CQL：离线轨迹不能随意外推。</strong> 采样一条真实预训练轨迹很贵，因此 agent 主要在离线 replay buffer 上学习。如果普通 Q-learning 对未见过动作过度乐观，agent 可能输出训练数据里没有覆盖的极端配比。Conservative Q-Learning 通过惩罚 out-of-distribution action 的 Q 值，降低离线 RL 的过估计风险，使连续 simplex 动作空间中的策略更稳。</p>\n<p><strong>使用方式：小 agent 替代大规模反复搜索。</strong> 训练完后，agent 被直接插入目标模型持续预训练循环。每经过一个阶段，系统把当前反馈和历史轨迹编码给 agent，agent 预测下一阶段领域权重。论文强调泛化性：一个在数学 reasoning 轨迹上训练的 agent，可以迁移到不同 target model、不同 domain classifier 定义，甚至代码生成目标，而不必每次重新跑昂贵轨迹采样。</p>\n<p><strong>与 DoReMi 的区别：静态 minimax 配比 vs. 状态条件策略。</strong> DoReMi 学到的是一组或若干组固定权重，适合训练前做数据配比优化；Data Mixing Agent 学到的是 <span class=\"kb-math kb-math-inline\">s_t\\mapsto a_t</span> 的策略函数，能根据训练反馈调整。代价是需要构建离线轨迹和评测环境，但收益是可以把经验压缩进一个小模型，并在新场景复用。</p>\n<div class=\"key-point\">💡 关键：Data Mixing Agent 的“agent”含义不是聊天代理，而是一个根据训练状态输出下一阶段数据配比的策略模型。</div>",
      "quiz": {
        "q": "Data Mixing Agent 中的动作 action 表示什么？",
        "options": [
          "下一个 token 的词表分布",
          "下一阶段各数据领域的采样概率分布",
          "模型层数和隐藏维度",
          "去重阈值"
        ],
        "answer": 1,
        "explain": "该方法把领域重加权建模为 MDP，动作是在 domain simplex 上的混合权重。"
      }
    },
    {
      "id": "mixed_precision",
      "num": 21,
      "name": "混合精度训练",
      "fullName": "混合精度训练 (Mixed Precision Training)",
      "year": "2018",
      "org": "NVIDIA",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1710.03740",
      "projectUrl": "",
      "category": "training",
      "motivation": "FP16计算FP32存储Loss Scaling",
      "summary": "混合精度训练提出用 FP16 存储与计算前向/反向主路径，同时保留 FP32 master weights、loss scaling 和 FP32 accumulation，从而解决纯 FP16 训练梯度下溢与权重更新丢失的问题。它让深度网络在不改超参数、不损失精度的前提下降低显存和带宽压力，并利用 Tensor Cores 获得更高吞吐。",
      "keyPoints": [
        "训练主路径：前向、反向中的权重、激活和梯度大多以 FP16 存储，降低显存占用和内存带宽。",
        "FP32 master weights：优化器更新维护一份 FP32 权重主副本，避免小更新在 FP16 加法中被舍入为 0。",
        "Loss scaling：先把 loss 乘以缩放因子 <span class=\"kb-math kb-math-inline\">S</span>，反向传播得到放大的梯度，再在 optimizer 前除以 <span class=\"kb-math kb-math-inline\">S</span>，减少 FP16 梯度下溢。",
        "FP32 accumulation：矩阵乘、卷积、循环层 dot product 使用 FP16 乘法但以 FP32 累加，写回前再转换。",
        "特殊算子处理：大 reduction、batch norm 统计、softmax 等对精度敏感的归约通常用 FP32 执行。",
        "动态安全性：如果 unscale 后发现 <code>inf</code> 或 <code>NaN</code>，可以跳过该步更新并调整 loss scale。",
        "实验覆盖：CNN 分类、检测、语音识别、Seq2Seq、语言模型、GAN 等任务可匹配 FP32 baseline。",
        "硬件背景：NVIDIA Volta Tensor Cores 支持 FP16 输入和 FP32 累加，使混合精度同时带来显存与算力收益。"
      ],
      "detail": "<p><img alt=\"Mixed Precision 单层训练迭代图\" src=\"https://ar5iv.labs.arxiv.org/html/1710.03740/assets/x1.png\" />\n<em>图：论文 Figure 1 的混合精度训练迭代。FP32 master weights 被转换成 FP16 参与前向/反向，梯度再用于更新 FP32 主副本。</em></p>\n<pre><code class=\"language-python\"># Mixed Precision Training 简化伪代码\nmaster_params = fp32_copy(model.parameters())\nloss_scale = S\n\nfor x, y in dataloader:\n    # 1. 用 FP32 master weights 派生 FP16 训练权重\n    fp16_params = cast(master_params, dtype=&quot;float16&quot;)\n    model.load(fp16_params)\n\n    # 2. 前向和反向主路径使用 FP16；GEMM/conv 可用 FP32 accumulation\n    logits = model.forward(x.astype(&quot;float16&quot;))\n    loss = criterion(logits, y)\n    scaled_loss = loss * loss_scale\n    scaled_loss.backward()\n\n    # 3. 梯度恢复到原尺度，再做裁剪、权重衰减等梯度相关操作\n    grads = [p.grad.astype(&quot;float32&quot;) / loss_scale for p in model.parameters()]\n\n    # 4. 如果溢出，跳过更新；否则用 FP32 优化器更新 master weights\n    if has_inf_or_nan(grads):\n        loss_scale = adjust_down(loss_scale)\n        continue\n    master_params = optimizer_step(master_params, grads)\n</code></pre>\n<p>这篇论文要解决的不是“能否把神经网络量化到 16 位”，而是“训练时如何让 FP16 既快又不破坏收敛”。FP16 的指数和尾数都比 FP32 少，normalized exponent 大致覆盖 <span class=\"kb-math kb-math-inline\">[-14,15]</span>，含 denormal 的最小量级约到 <span class=\"kb-math kb-math-inline\">2^{-24}</span>。训练中的梯度常常集中在很小的负指数区间，一旦小于可表示范围就会下溢为 0；即使梯度本身可表示，乘以学习率后的权重更新也可能小到在加到权重时被舍入消失。因此纯 FP16 训练经常不是稍微变差，而是某些网络直接发散或出现显著精度损失。</p>\n<p>FP32 master copy 是第一条保险。训练时使用 FP16 权重 <span class=\"kb-math kb-math-inline\">W_{16}</span> 做 forward/backward，但优化器维护 FP32 主权重 <span class=\"kb-math kb-math-inline\">W_{32}</span>。更新公式可以写成：</p>\n<div class=\"kb-math kb-math-display\">W_{32}^{(t+1)} = W_{32}^{(t)} - \\eta\\,g_{32}^{(t)},\\qquad\nW_{16}^{(t+1)} = \\mathrm{cast}_{16}(W_{32}^{(t+1)})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">g_{32}^{(t)}</span> 是 unscale 后以 FP32 表示的梯度。这样做的直觉是：训练计算可以低精度，但权重历史状态和小更新累积必须有足够分辨率。论文用 Mandarin speech recognition 示例说明，如果没有 FP32 master copy，伪 FP16 更新会造成约 80% 相对精度损失；使用 FP32 主副本后可以恢复 FP32 baseline。</p>\n<p>Loss scaling 是第二条保险，针对的是梯度下溢。设原始 loss 为 <span class=\"kb-math kb-math-inline\">L</span>，缩放因子为 <span class=\"kb-math kb-math-inline\">S</span>，反向传播使用：</p>\n<div class=\"kb-math kb-math-display\">L&#x27; = S\\cdot L</div>\n<p>由链式法则，任意参数梯度变为：</p>\n<div class=\"kb-math kb-math-display\">g&#x27; = \\frac{\\partial L&#x27;}{\\partial W}=S\\frac{\\partial L}{\\partial W}=Sg</div>\n<p>只要在 optimizer step 前恢复：</p>\n<div class=\"kb-math kb-math-display\">g=\\frac{g&#x27;}{S}</div>\n<p>最终更新与 FP32 训练在数学上等价，但反向传播中间的梯度被整体“平移”到 FP16 可表示范围内。论文以 Multibox SSD 为例，未做 loss scaling 时 mixed precision 会发散；用 <span class=\"kb-math kb-math-inline\">S=8</span> 后恢复到 FP32 mAP。对 bigLSTM，缩放因子 128 可避免 perplexity 曲线在 300K iterations 后发散。</p>\n<div class=\"warn-box\">⚠️ 注意：loss scaling 不能无限大。若 <span class=\"kb-math kb-math-inline\">S\\cdot g</span> 超过 FP16 最大有限值 65,504，就会产生 <code>inf</code> 或 <code>NaN</code>，因此训练系统需要在 unscale 时检测溢出并跳过更新。</div>\n<p>第三个关键点是算术精度分层。论文把神经网络算子分为 dot products、reductions 和 point-wise operations。矩阵乘、卷积、循环层中的 dot product 可以使用 FP16 乘法，但累加最好用 FP32：</p>\n<div class=\"kb-math kb-math-display\">y=\\sum_i a_i b_i,\\qquad a_i,b_i\\in\\mathrm{FP16},\\ \\mathrm{accumulator}\\in\\mathrm{FP32}</div>\n<p>这是 Volta Tensor Cores 的核心路径：输入半精度，乘积累加到单精度，再根据需要写回 FP16。大型 reduction，例如 batch norm 的均值方差统计、softmax 归约，也应该用 FP32，因为大量元素求和会放大舍入误差。相反，ReLU、逐元素乘加等 point-wise operations 常受内存带宽限制，使用 FP16 或 FP32 对速度影响不大，可按实现便利和精度需求选择。</p>\n<p>混合精度训练的收益主要来自两个方面。第一是显存：权重、激活和梯度以 FP16 存储时，训练中占大头的 activation memory 近似减半，这允许更大 batch size、更大模型或更长序列。虽然 FP32 master weights 会让权重部分额外增加一份拷贝，但训练显存通常不是只由权重主导，所以整体仍接近减半。第二是吞吐：在支持半精度矩阵单元的硬件上，FP16 GEMM/conv 的 arithmetic throughput 更高，且内存带宽压力更低。</p>\n<p>与早期低精度或量化训练不同，NVIDIA 这篇方法强调“不改模型结构、不调窄层宽、不牺牲 baseline accuracy”。以前很多方法只量化推理，或仅量化权重/激活但保留反向 FP32，因此训练成本没有真正下降；也有方法需要改变超参数或网络尺寸。混合精度训练的工程价值在于它能作为训练系统的一层数值策略：同一模型、同一学习率日程、同一优化器语义，只在 dtype、master weights、loss scaling 和 accumulator precision 上做系统性处理。</p>\n<p>在现代 LLM 训练中，论文的三条原则仍然是基础。FP32 master weights 后来演化出 FP32 optimizer states、BF16/FP16 parameters、ZeRO/FSDP shard 等组合；loss scaling 在 FP16 中仍常用，而 BF16 因指数范围更大通常不需要同样强的 scaling；FP32 accumulation 则成为 Tensor Core 路径的默认假设。换句话说，混合精度训练不是单纯“把模型 <code>.half()</code>”，而是一套数值稳定性协议。</p>",
      "quiz": {
        "q": "混合精度训练中保留 FP32 master weights 的主要目的是什么？",
        "options": [
          "让模型推理时一定使用 FP32",
          "避免小梯度更新在 FP16 权重更新中因舍入或下溢而丢失",
          "减少 optimizer state 的显存占用到原来一半",
          "替代 loss scaling，使所有梯度都不会溢出"
        ],
        "answer": 1,
        "explain": "FP16 的尾数和指数范围有限，小更新可能在加到权重时变成 0；FP32 master copy 用更高精度累积优化器更新。"
      }
    },
    {
      "id": "flash_attention",
      "num": 22,
      "name": "FlashAttention",
      "fullName": "FlashAttention (FlashAttention: Fast and Memory-Efficient)",
      "year": "2022",
      "org": "Stanford",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2205.14135",
      "projectUrl": "",
      "category": "training",
      "motivation": "IO感知算法SRAM内完成Attention",
      "summary": "FlashAttention 提出了一种 IO-aware 的精确 attention 计算方法，通过分块、在线 softmax 与反向重计算避免把 \\(N \\times N\\) attention 矩阵写入 HBM，解决了长序列 Transformer 中显存访问主导耗时的问题。它不改变 attention 的数学结果，却把显存占用从序列长度的二次级中间矩阵压到近似线性，并显著提升训练速度。",
      "keyPoints": [
        "精确 attention：计算结果等价于 <span class=\"kb-math kb-math-inline\">\\mathrm{softmax}(QK^\\top)V</span>，不是低秩、稀疏或随机近似。",
        "IO-aware 设计：优化目标不是只减少 FLOPs，而是减少 HBM 与片上 SRAM 之间的读写次数。",
        "分块 tiling：按块加载 <span class=\"kb-math kb-math-inline\">Q,K,V</span> 到 SRAM，在片上完成矩阵乘、mask、softmax、dropout 与乘 <span class=\"kb-math kb-math-inline\">V</span>。",
        "在线 softmax：用每行最大值 <span class=\"kb-math kb-math-inline\">m</span> 与归一化项 <span class=\"kb-math kb-math-inline\">\\ell</span> 增量合并不同 key block，避免一次性物化完整 attention 矩阵。",
        "反向重计算：前向只保存输出和 softmax 统计量，反向在 SRAM 中重算局部 <span class=\"kb-math kb-math-inline\">S</span> 与 <span class=\"kb-math kb-math-inline\">P</span>，避免保存 <span class=\"kb-math kb-math-inline\">N^2</span> 中间矩阵。",
        "Kernel fusion：把 attention 的多个 memory-bound 子操作融合进一个 CUDA kernel，减少中间结果反复进出 HBM。",
        "IO 复杂度优势：标准 attention 需要读写大规模 <span class=\"kb-math kb-math-inline\">S,P</span>，FlashAttention 在 SRAM 大小 <span class=\"kb-math kb-math-inline\">M</span> 合理时把 HBM 访问量降到 <span class=\"kb-math kb-math-inline\">O(N^2d^2/M)</span> 量级。",
        "可扩展到 block-sparse FlashAttention：在预定义稀疏块 mask 下跳过零块，进一步降低长上下文 attention 的 IO 与计算。"
      ],
      "detail": "<p><img alt=\"FlashAttention IO-aware tiling 示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2205.14135/assets/x1.png\" />\n<em>图：FlashAttention 利用 GPU 内存层级差异，将 <span class=\"kb-math kb-math-inline\">Q,K,V</span> 分块搬入 SRAM，避免把完整 attention 矩阵写回 HBM。左侧展示 HBM/SRAM 带宽差异，中间展示分块循环，右侧展示 attention kernel 的速度收益。</em></p>\n<p>标准 self-attention 通常写成 <span class=\"kb-math kb-math-inline\">S=QK^\\top</span>、<span class=\"kb-math kb-math-inline\">P=\\mathrm{softmax}(S)</span>、<span class=\"kb-math kb-math-inline\">O=PV</span>。问题不只是 <span class=\"kb-math kb-math-inline\">O(N^2d)</span> 的矩阵乘计算量，而是常规实现会把 <span class=\"kb-math kb-math-inline\">S</span> 和 <span class=\"kb-math kb-math-inline\">P</span> 这两个 <span class=\"kb-math kb-math-inline\">N\\times N</span> 中间矩阵写入 HBM，再被 mask、softmax、dropout 和后续矩阵乘反复读取。GPU 上 SRAM 的容量远小于 HBM，但带宽通常高一个数量级；当 attention 中大量操作是逐元素或归约操作时，真正拖慢 wall-clock time 的往往是 HBM IO，而不是 Tensor Core 可高效执行的 matmul FLOPs。</p>\n<p>FlashAttention 的核心做法是把 attention 重新组织为“流式分块计算”。对每个 query block <span class=\"kb-math kb-math-inline\">Q_i</span>，算法逐个扫描 key/value block <span class=\"kb-math kb-math-inline\">(K_j,V_j)</span>，在片上计算局部分数 <span class=\"kb-math kb-math-inline\">S_{ij}=Q_iK_j^\\top</span>。由于 softmax 的归一化需要整行所有 key 的信息，不能简单对每个块单独 softmax 后相加；因此论文引入在线 softmax 统计量：行最大值 <span class=\"kb-math kb-math-inline\">m</span> 用于数值稳定，行指数和 <span class=\"kb-math kb-math-inline\">\\ell</span> 用于最终归一化。对一个向量 <span class=\"kb-math kb-math-inline\">x</span>，稳定 softmax 可写为：</p>\n<div class=\"kb-math kb-math-display\">m(x)=\\max_k x_k,\\qquad \\ell(x)=\\sum_k e^{x_k-m(x)},\\qquad \\mathrm{softmax}(x)_k=\\frac{e^{x_k-m(x)}}{\\ell(x)}.</div>\n<p>当一行分数被拆成两个块 <span class=\"kb-math kb-math-inline\">x^{(1)},x^{(2)}</span> 时，不需要保存全部分数，只要合并统计量：</p>\n<div class=\"kb-math kb-math-display\">m=\\max(m^{(1)},m^{(2)}),\\qquad\n\\ell=e^{m^{(1)}-m}\\ell^{(1)}+e^{m^{(2)}-m}\\ell^{(2)}.</div>\n<p>这个公式给出了 FlashAttention 正确性的直觉：每个块内部先以本块或当前全局最大值为基准计算指数，再用指数缩放把旧块贡献调整到新的全局最大值坐标系中。输出 <span class=\"kb-math kb-math-inline\">O</span> 也以相同方式重标定，所以处理完所有 key block 后得到的结果与完整 <span class=\"kb-math kb-math-inline\">\\mathrm{softmax}(QK^\\top)V</span> 完全一致。</p>\n<pre><code class=\"language-python\"># FlashAttention forward 的核心逻辑，省略 batch/head/dropout 的工程细节\n# Q, K, V: [N, d] in HBM; SRAM can hold one Q block plus one K/V block\nsplit Q into row blocks Q_i of size B_r\nsplit K, V into column blocks K_j, V_j of size B_c\ninitialize O_i = 0, m_i = -inf, l_i = 0 for every Q block\n\nfor each K_j, V_j block:\n    load K_j, V_j from HBM to SRAM\n    for each Q_i block:\n        load Q_i, O_i, m_i, l_i from HBM to SRAM\n        S_ij = Q_i @ K_j.T\n        m_new = maximum(m_i, rowmax(S_ij))\n        P_tilde = exp(S_ij - m_new[:, None])\n        l_new = exp(m_i - m_new) * l_i + rowsum(P_tilde)\n        O_i = (\n            exp(m_i - m_new)[:, None] * l_i[:, None] * O_i\n            + P_tilde @ V_j\n        ) / l_new[:, None]\n        write O_i, m_new, l_new back to HBM\n\nreturn O\n</code></pre>\n<p>反向传播的关键是“少存、多算”，但这里的多算是刻意设计的。常规训练会在前向保存 <span class=\"kb-math kb-math-inline\">P</span> 以便反向计算 <span class=\"kb-math kb-math-inline\">dQ,dK,dV</span>，这会产生 <span class=\"kb-math kb-math-inline\">O(N^2)</span> 的显存占用。FlashAttention 前向只保存输出 <span class=\"kb-math kb-math-inline\">O</span> 和 softmax 统计量 <span class=\"kb-math kb-math-inline\">(m,\\ell)</span>；反向时重新加载局部 <span class=\"kb-math kb-math-inline\">Q_i,K_j,V_j</span>，在 SRAM 中重算局部 <span class=\"kb-math kb-math-inline\">S_{ij}</span> 和 <span class=\"kb-math kb-math-inline\">P_{ij}</span>，再计算梯度贡献。虽然重计算增加了一些 FLOPs，但这些 FLOPs 主要是块内矩阵乘，GPU 擅长处理；相比之下，避免 HBM 读写大矩阵通常带来更大的实际加速。</p>\n<p>FlashAttention 与许多“高效 attention”工作的区别在于它不牺牲精度。低秩、局部窗口、哈希或随机特征方法通常试图降低理论计算复杂度，但会改变 attention 矩阵或引入近似误差，并且不一定有真实速度收益。FlashAttention 反过来承认精确 attention 的 <span class=\"kb-math kb-math-inline\">N^2</span> 交互仍然要算，却把这些交互安排在更合适的内存层级中完成。论文也给出 IO 复杂度分析：在 head dimension 为 <span class=\"kb-math kb-math-inline\">d</span>、SRAM 大小为 <span class=\"kb-math kb-math-inline\">M</span> 时，FlashAttention 的 HBM 访问规模约为 <span class=\"kb-math kb-math-inline\">O(N^2d^2/M)</span>，而标准实现要物化并访问 <span class=\"kb-math kb-math-inline\">N^2</span> 级中间矩阵。</p>\n<div class=\"key-point\">💡 关键：FlashAttention 的“快”不是因为少算了 attention，而是因为不把 <span class=\"kb-math kb-math-inline\">S</span> 和 <span class=\"kb-math kb-math-inline\">P</span> 这两个巨大中间矩阵写到慢速 HBM。它把计算重排成适合 GPU 内存层级的形式，让 expensive IO 变少、cheap recompute 变多。</div>\n<p>在训练流程中，FlashAttention 通常作为 Transformer attention kernel 的 drop-in replacement：上层模型仍然生成 <span class=\"kb-math kb-math-inline\">Q,K,V</span>，仍然使用 causal mask 或 padding mask，仍然得到同形状输出 <span class=\"kb-math kb-math-inline\">O</span>。区别在 kernel 内部：mask、softmax、dropout、矩阵乘 <span class=\"kb-math kb-math-inline\">V</span> 被融合，局部块在 SRAM 生命周期内完成尽可能多的操作。对于自回归 causal attention，还可以跳过完全位于未来位置的块；对于 block-sparse 版本，只需在同一分块框架中跳过稀疏 mask 为零的块。</p>\n<p>论文实验表明，FlashAttention 在 BERT-large、GPT-2 与 Long Range Arena 等场景中带来端到端训练加速，并让模型能处理更长上下文。更重要的是，它把“高效 Transformer”的优化视角从单纯 FLOPs 转向 IO complexity，这也解释了为什么很多理论上 FLOPs 更低的近似 attention 并没有稳定获得 wall-clock speedup。</p>",
      "quiz": {
        "q": "FlashAttention 为什么能够在不近似 attention 的情况下节省显存并加速？",
        "options": [
          "把 softmax 替换成线性 attention，降低理论计算复杂度",
          "通过分块和在线 softmax 避免把完整 attention 矩阵写入 HBM",
          "只保留局部窗口内的 token-token 交互",
          "冻结 K/V 矩阵，只训练 Q 矩阵"
        ],
        "answer": 1,
        "explain": "FlashAttention 仍计算精确的 softmax attention，但用 tiling、在线归一化和反向重计算减少 HBM 读写，因此显存占用和实际运行时间下降。"
      }
    },
    {
      "id": "flash_attention_2",
      "num": 23,
      "name": "FlashAttention-2",
      "fullName": "FlashAttention-2 (FlashAttention-2: Faster Attention)",
      "year": "2023",
      "org": "Stanford",
      "parent": "flash_attention",
      "paperUrl": "https://arxiv.org/abs/2307.08691",
      "projectUrl": "",
      "category": "training",
      "motivation": "优化并行度提升2倍速度",
      "summary": "FlashAttention-2 在保持 FlashAttention 精确 attention 与线性级中间显存优势的基础上，重写在线 softmax 更新、提升单 head 内并行度，并重新划分 warp 工作，从而解决 FlashAttention GPU 占用率和共享内存通信不足的问题。它把 attention kernel 从约 25-40% 理论峰值提升到接近 GEMM 的 50-73% 峰值利用率，并相对 FlashAttention 约 2 倍加速。",
      "keyPoints": [
        "保持精确性：仍计算 <span class=\"kb-math kb-math-inline\">O=\\mathrm{softmax}(QK^\\top)V</span>，不引入 attention 近似。",
        "减少 non-matmul FLOPs：维护未归一化输出 <span class=\"kb-math kb-math-inline\">\\tilde O</span>，最后一次性除以 <span class=\"kb-math kb-math-inline\">\\ell</span>，减少逐元素缩放次数。",
        "只保存 logsumexp：前向保存 <span class=\"kb-math kb-math-inline\">L=m+\\log\\ell</span>，反向不再同时保存行最大值和指数和。",
        "单 head 内序列并行：除 batch 和 head 维度外，把一个 head 的 sequence block 分给多个 thread block，提高长序列小 batch 场景的 occupancy。",
        "Warp 级工作重划分：从 FlashAttention 的 sliced-K 改为 sliced-Q，减少 warp 间规约、同步和 shared memory 读写。",
        "Causal attention 优化：跳过完全被 causal mask 遮蔽的块，只在边界块应用 mask，降低无效计算。",
        "工程覆盖扩大：支持 head dimension 到 256，并支持 MQA/GQA 等现代 LLM 推理常用 attention 变体。",
        "训练收益：A100 上达到 50-73% 理论最大 FLOPs/s，GPT 风格模型训练可达约 225 TFLOPs/s 每 A100。"
      ],
      "detail": "<p><img alt=\"FlashAttention-2 warp 工作划分示意图\" src=\"https://hazyresearch.stanford.edu/static/posts/2023-07-17-flash2/flash_flash2_partitioning.png\" />\n<em>图：FlashAttention 使用 sliced-K，把 <span class=\"kb-math kb-math-inline\">K,V</span> 分给不同 warp 后需要跨 warp 合并中间输出；FlashAttention-2 使用 sliced-Q，让每个 warp 负责不同 <span class=\"kb-math kb-math-inline\">Q</span> 行切片，共享 <span class=\"kb-math kb-math-inline\">K,V</span>，从而减少 shared memory 通信。</em></p>\n<p>FlashAttention-2 的出发点不是推翻 FlashAttention，而是解释为什么 FlashAttention 仍明显慢于优化良好的 GEMM。第一版已经避免了 <span class=\"kb-math kb-math-inline\">N^2</span> attention 矩阵的 HBM 读写，但在 A100 上通常只有理论最大 FLOPs/s 的 25-40%。论文指出瓶颈主要来自三类低层问题：在线 softmax 中过多 non-matmul 操作、thread block 数不足导致 SM 利用率不高、warp 之间为了合并局部结果产生 shared memory 通信。现代 GPU 的 Tensor Core 对 matmul 极快，但 FP32 标量/逐元素操作吞吐远低于 matmul，因此 attention kernel 中每一次额外 rescale、bound check 或 mask 都很贵。</p>\n<p>算法层面的第一处改动是重写在线 softmax 的输出更新。FlashAttention 在每个 key/value block 后都会维护已经归一化的 <span class=\"kb-math kb-math-inline\">O</span>，这意味着每次合并都要用新的 <span class=\"kb-math kb-math-inline\">\\ell</span> 重新缩放旧输出和新输出。FlashAttention-2 改为维护未归一化输出 <span class=\"kb-math kb-math-inline\">\\tilde O</span>，只在处理完所有 <span class=\"kb-math kb-math-inline\">K,V</span> block 后执行一次最终归一化：</p>\n<div class=\"kb-math kb-math-display\">S_i^{(j)}=Q_iK_j^\\top,\n\\qquad\nm_i^{(j)}=\\max\\left(m_i^{(j-1)},\\mathrm{rowmax}(S_i^{(j)})\\right),</div>\n<div class=\"kb-math kb-math-display\">\\tilde P_i^{(j)}=\\exp\\left(S_i^{(j)}-m_i^{(j)}\\right),\n\\qquad\n\\ell_i^{(j)}=e^{m_i^{(j-1)}-m_i^{(j)}}\\ell_i^{(j-1)}+\\mathrm{rowsum}(\\tilde P_i^{(j)}),</div>\n<div class=\"kb-math kb-math-display\">\\tilde O_i^{(j)}=e^{m_i^{(j-1)}-m_i^{(j)}}\\tilde O_i^{(j-1)}+\\tilde P_i^{(j)}V_j,\n\\qquad\nO_i=\\frac{\\tilde O_i^{(T_c)}}{\\ell_i^{(T_c)}}.</div>\n<p>这个变化的直觉很简单：旧块贡献必须随着全局最大值 <span class=\"kb-math kb-math-inline\">m</span> 的变化被重新标尺化，但没有必要在每个块后都把输出除以当前 <span class=\"kb-math kb-math-inline\">\\ell</span>。只要最后一次除以最终 <span class=\"kb-math kb-math-inline\">\\ell</span>，数学结果仍然等于完整 softmax attention，同时减少了大量逐元素除法和缩放。前向还保存 <span class=\"kb-math kb-math-inline\">L_i=m_i+\\log\\ell_i</span>，反向可由 <span class=\"kb-math kb-math-inline\">L</span> 恢复 softmax 归一化所需信息。</p>\n<pre><code class=\"language-python\"># FlashAttention-2 forward 的核心逻辑，强调未归一化输出和 logsumexp\nsplit Q into row blocks Q_i\nsplit K, V into column blocks K_j, V_j\n\nfor each Q_i block in parallel:\n    load Q_i to SRAM\n    O_tilde = zeros([B_r, d])\n    m = full([B_r], -inf)\n    l = zeros([B_r])\n\n    for each K_j, V_j block:\n        load K_j, V_j to SRAM\n        S = Q_i @ K_j.T\n        if causal:\n            apply mask only to boundary blocks; skip fully masked blocks\n        m_new = maximum(m, rowmax(S))\n        P_tilde = exp(S - m_new[:, None])\n        l = exp(m - m_new) * l + rowsum(P_tilde)\n        O_tilde = exp(m - m_new)[:, None] * O_tilde + P_tilde @ V_j\n        m = m_new\n\n    O_i = O_tilde / l[:, None]\n    L_i = m + log(l)\n    write O_i and L_i to HBM\n\nreturn O, L\n</code></pre>\n<p>并行性是 FlashAttention-2 的第二个关键。FlashAttention 主要按 batch 和 head 维度并行，一个 thread block 处理一个 attention head 的一个工作单元。当 batch size 或 head 数较小而序列很长时，可调度的 thread block 数可能小于 GPU SM 数，导致很多 SM 空闲。FlashAttention-2 额外沿 sequence 维拆分工作，即使是单个 head 也能分给多个 thread block，从而提高 occupancy。这对长上下文 LLM 特别重要，因为长序列训练往往受显存限制，只能使用较小 batch。</p>\n<p>第三个关键是 warp 内工作划分。第一版采用 sliced-K：不同 warp 拿不同 <span class=\"kb-math kb-math-inline\">K,V</span> 切片，计算出同一 <span class=\"kb-math kb-math-inline\">Q</span> block 的部分输出后，需要把中间结果写入 shared memory、同步、再规约相加。FlashAttention-2 改成 sliced-Q：不同 warp 处理 <span class=\"kb-math kb-math-inline\">Q</span> 的不同 row slice，共享同一份 <span class=\"kb-math kb-math-inline\">K,V</span>。这样每个 warp 产生的是输出的不同行，不需要跨 warp 合并同一行的 partial sum，减少了 shared memory 读写和同步开销。这个设计没有改变数学公式，但显著改善了 kernel 的数据流。</p>\n<div class=\"key-point\">💡 关键：FlashAttention-2 的“2”主要是硬件利用率升级，而不是新 attention 机制。它保留 IO-aware tiling，同时让更多 FLOPs 落在 Tensor Core matmul 上，让更少时间花在逐元素缩放、mask 与 warp 间通信上。</div>\n<p>与 FlashAttention 相比，FlashAttention-2 在 causal mask 上也更细。对于自回归 attention，约一半 <span class=\"kb-math kb-math-inline\">(Q_i,K_j)</span> 块位于未来位置，完全不需要计算；只有对角线附近的边界块需要真正应用 causal mask。这样既减少矩阵乘，也减少逐元素 mask 判断。工程上，FlashAttention-2 支持 head dimension 到 256，使 GPT-J、CodeGen、Stable Diffusion 1.x 等模型受益；同时支持 MQA/GQA，有利于推理阶段减少 KV cache 体积。</p>\n<p>论文的实证结果表明，这些优化让 FlashAttention-2 在 A100 上达到 50-73% 理论最大 FLOPs/s，明显接近 GEMM 效率。在端到端 GPT 风格训练中，FlashAttention-2 可达到约 225 TFLOPs/s 每 A100，约 72% model FLOPs utilization。由于它仍然是 exact attention，迁移成本主要是替换底层 kernel，而不是重新训练或调整模型结构。</p>",
      "quiz": {
        "q": "FlashAttention-2 相对 FlashAttention 的主要改进方向是什么？",
        "options": [
          "把 softmax attention 改成低秩近似",
          "通过更好的在线 softmax、sequence 并行和 sliced-Q warp 划分提升 GPU 利用率",
          "删除反向传播中的重计算以保存全部 attention 矩阵",
          "只支持短序列以减少 kernel 复杂度"
        ],
        "answer": 1,
        "explain": "FlashAttention-2 保持精确 attention 与 IO-aware tiling，核心提升来自减少非矩阵乘操作、增加单 head 内并行度以及减少 warp 间通信。"
      }
    },
    {
      "id": "wesar",
      "num": 24,
      "name": "WeSaR",
      "fullName": "WeSaR (Weight Scaling as Reparameterization)",
      "year": "2025.10",
      "org": "学术界",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2410.16682",
      "projectUrl": "",
      "category": "training",
      "motivation": "可学习门控抑制梯度爆炸",
      "summary": "WeSaR 提出用每个参数矩阵一个可学习 gate \\(\\alpha\\) 进行权重缩放重参数化，把“满足梯度传播所需的函数尺度”和“参数自身的统一小范数”解耦，从而缓解 LLM 预训练中的 loss spike 与梯度/更新比例不稳定。它解决的是传统初始化中不同矩阵范数不均导致小范数矩阵更新比例过大的问题。",
      "keyPoints": [
        "失稳诊断：论文把 loss spike 与不同参数矩阵的 update ratio <span class=\"kb-math kb-math-inline\">\\|\\Delta W\\|/\\|W\\|</span> 不均联系起来。",
        "范数冲突：Transformer 为避免梯度消失/爆炸需要某些矩阵采用非均匀初始化尺度，但小范数矩阵会对同等梯度更新更敏感。",
        "权重缩放重参数化：每个参数矩阵使用 <span class=\"kb-math kb-math-inline\">\\bar W_i=\\alpha_i W_i</span>，模型前向使用虚拟权重 <span class=\"kb-math kb-math-inline\">\\bar W_i</span>。",
        "统一实际参数尺度：实际参数 <span class=\"kb-math kb-math-inline\">W_i</span> 全部用共同小标准差 <span class=\"kb-math kb-math-inline\">\\hat\\sigma</span> 初始化，降低 update ratio 不均。",
        "Gate 承担功能尺度：<span class=\"kb-math kb-math-inline\">\\alpha_i</span> 初始化为目标初始化尺度与 <span class=\"kb-math kb-math-inline\">\\hat\\sigma</span> 的比值，使 <span class=\"kb-math kb-math-inline\">\\bar W_i</span> 满足 He/residual scaling 等 backbone 初始化要求。",
        "可学习且低开销：每个矩阵仅增加一个标量 gate，训练时可学习，推理时可合并为 <span class=\"kb-math kb-math-inline\">\\alpha_i W_i</span>。",
        "与 WeightNorm/Reparam 区别：WeSaR 不做逐行范数归一化或谱归一化，避免额外 normalization 反向开销。",
        "实验覆盖：在 130M、1.3B、13B Transformer decoder 预训练上稳定并加速训练，在 WikiText、LAMBADA 与下游 SuperGLUE 评估中优于多种初始化和重参数化基线。"
      ],
      "detail": "<p><img alt=\"WeSaR loss spike 与 update ratio 示意图\" src=\"https://ar5iv.org/html/2410.05052/assets/x1.png\" />\n<em>图：WeSaR 主论文 Figure 1 展示 13B Transformer 训练初期 loss spike，以及最后一层 FFN up/down projection 的 update ratio 变化；基线中小尺度矩阵的更新比例更大，而 WeSaR 使更新比例更稳定。</em></p>\n<p>WeSaR 的切入点不是“再设计一个更深的 Transformer 架构”，而是重新审视初始化尺度带来的训练动力学问题。LLM 预训练中的 loss spike 常被归因于异常 batch、优化器状态、attention entropy 或 logits 爆炸；WeSaR 论文关注的是另一个量：参数更新相对参数自身大小的比例，记为 <span class=\"kb-math kb-math-inline\">r_i=\\|\\Delta W_i\\|/\\|W_i\\|</span>。如果某个矩阵因为 residual scaling 或特定初始化策略而范数很小，那么即使绝对更新量不大，<span class=\"kb-math kb-math-inline\">r_i</span> 也可能很大，导致这个矩阵在训练早期被过度扰动，进而触发不稳定。</p>\n<p>传统初始化存在一个冲突：为了让反向传播的梯度尺度在深层网络中不爆炸也不消失，初始化标准差通常依赖 fan-in、fan-out、层深度或 residual 分支位置；但为了让不同参数矩阵有相近 update ratio，又希望所有矩阵本身的范数接近。WeSaR 的核心是把这两个目标拆开：实际可训练参数 <span class=\"kb-math kb-math-inline\">W_i</span> 负责保持统一的小范数，gate <span class=\"kb-math kb-math-inline\">\\alpha_i</span> 负责把前向/反向看到的有效权重尺度调到初始化理论所需的大小。</p>\n<p>具体地，对每个矩阵 <span class=\"kb-math kb-math-inline\">W_i</span>，WeSaR 不直接把它初始化为传统方法要求的标准差 <span class=\"kb-math kb-math-inline\">\\sigma_i</span>，而是统一采样：</p>\n<div class=\"kb-math kb-math-display\">W_i\\sim\\mathcal N(0,\\hat\\sigma^2),\\qquad \\bar W_i=\\alpha_i W_i,</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\hat\\sigma</span> 是所有矩阵共享的小标准差，<span class=\"kb-math kb-math-inline\">\\bar W_i</span> 是模型实际使用的虚拟权重。为了让虚拟权重在初始时仍满足 backbone 初始化方法，gate 初始化为：</p>\n<div class=\"kb-math kb-math-display\">\\alpha_i^{(0)}=\\frac{\\sigma_i}{\\hat\\sigma},\\qquad \\mathrm{Std}(\\bar W_i)=\\mathrm{Std}(\\alpha_i W_i)=\\sigma_i.</div>\n<p>这样，前向和反向中的有效权重 <span class=\"kb-math kb-math-inline\">\\bar W_i</span> 仍具备 He initialization、embedding scaling、residual scaling 等要求的函数尺度；但优化器直接维护的实际参数 <span class=\"kb-math kb-math-inline\">W_i</span> 都拥有接近的范数，更新比例更均匀。</p>\n<pre><code class=\"language-python\"># WeSaR 初始化与训练伪代码\n# sigma_target[i] 来自选定 backbone 初始化规则，例如 He init + residual scaling\nsigma_common = 4e-5  # 论文默认量级，可作为超参数调节\n\nfor each parameter matrix i:\n    W[i] = Normal(mean=0, std=sigma_common)\n    alpha[i] = sigma_target[i] / sigma_common\n\nfor each training step:\n    for each matrix i used by the Transformer:\n        W_eff[i] = alpha[i] * W[i]\n    loss = transformer_forward(parameters=W_eff)\n    loss.backward()\n    Adam.update(W, alpha)\n\nfor inference:\n    fold W_eff[i] = alpha[i] * W[i]\n    discard alpha[i]\n</code></pre>\n<p>论文给出的理论解释主要围绕 Adam。若模型使用 <span class=\"kb-math kb-math-inline\">\\bar W=\\alpha W</span>，则对实际参数的梯度满足 <span class=\"kb-math kb-math-inline\">\\nabla_W\\mathcal L=\\alpha\\nabla_{\\bar W}\\mathcal L</span>。Adam 的一阶动量和二阶动量会分别随 <span class=\"kb-math kb-math-inline\">\\alpha</span> 与 <span class=\"kb-math kb-math-inline\">\\alpha^2</span> 缩放，因此在忽略 <span class=\"kb-math kb-math-inline\">\\epsilon</span> 与符号细节时，更新方向近似不依赖 <span class=\"kb-math kb-math-inline\">\\alpha</span>：</p>\n<div class=\"kb-math kb-math-display\">\\Delta W_t\\approx -\\eta\\frac{\\alpha m_{\\bar W,t}}{\\sqrt{\\alpha^2 v_{\\bar W,t}}}\n= -\\eta\\frac{m_{\\bar W,t}}{\\sqrt{v_{\\bar W,t}}}.</div>\n<p>这意味着 gate 可以承担“把虚拟权重放大到合适函数尺度”的职责，而不会简单地把 Adam 对实际参数 <span class=\"kb-math kb-math-inline\">W</span> 的更新按同样比例放大。于是 WeSaR 可以选择更小的 <span class=\"kb-math kb-math-inline\">\\hat\\sigma</span>，让所有实际参数的范数更可控，同时保留梯度传播所需的有效尺度。</p>\n<div class=\"key-point\">💡 关键：WeSaR 不是把权重归一化到固定范数，而是把“参数本体”和“函数中使用的缩放后权重”分离。训练时 gate 是可学习的稳定器；推理时 gate 可以折叠进权重，没有额外推理成本。</div>\n<p>与 Weight Normalization 相比，WeSaR 的缩放粒度是“每个矩阵一个标量”，不是每一行一个归一化尺度，因此不需要在每个 batch 中计算行范数并反向传播通过归一化。与 <span class=\"kb-math kb-math-inline\">\\sigma</span>-Reparam 相比，WeSaR 不需要估计谱范数，也不是专门通过控制 attention entropy 来稳定训练；它把所有参数矩阵纳入统一的小标准差初始化，并用 gate 对齐每个矩阵自己的目标尺度。与 residual scaling as reparameterization 相比，WeSaR 不是只处理残差分支相关矩阵，而是扩展到 Transformer 中所有主要参数矩阵。</p>\n<p>训练流程上，WeSaR 通常可以作为初始化和参数化层面的改动接入预训练代码。模型结构、loss、数据流不需要改变；需要改变的是参数注册方式：原先一个矩阵 <span class=\"kb-math kb-math-inline\">W</span> 变成实际矩阵 <span class=\"kb-math kb-math-inline\">W</span> 与标量 gate <span class=\"kb-math kb-math-inline\">\\alpha</span>，forward 时临时使用 <span class=\"kb-math kb-math-inline\">\\alpha W</span>。由于每个矩阵只多一个标量，这个方法对参数量和通信量几乎无影响；在分布式训练中，gate 的同步开销也可以忽略。</p>\n<p>实验上，论文在 130M、1.3B、13B Transformer decoder 上验证 WeSaR。主结果显示，WeSaR 相比 Small initialization 在 WikiText 和 LAMBADA perplexity 上更好，并在 13B 模型训练初期减少 loss spike。更值得关注的是消融结论：He initialization 本身可能产生 loss spike，但作为 WeSaR 的虚拟权重 backbone 反而有效，因为它负责梯度传播尺度；实际参数则由统一小 <span class=\"kb-math kb-math-inline\">\\hat\\sigma</span> 控制 update ratio。这说明 WeSaR 的价值正是解耦了“函数尺度”和“可训练参数尺度”。</p>",
      "quiz": {
        "q": "WeSaR 中 gate 参数 alpha 的核心作用是什么？",
        "options": [
          "把所有权重剪枝为稀疏矩阵，减少计算量",
          "让实际参数保持统一小范数，同时把有效权重缩放到满足初始化规则的尺度",
          "替代 Adam 的二阶动量估计，直接控制学习率",
          "只缩放 attention logits，避免 softmax 过尖锐"
        ],
        "answer": 1,
        "explain": "WeSaR 使用 alpha W 作为模型中的有效权重，alpha 承担每个矩阵所需的函数尺度，而 W 本身用共同小标准差初始化以稳定 update ratio。"
      }
    },
    {
      "id": "muon",
      "num": 25,
      "name": "Muon优化器",
      "fullName": "Muon优化器 (MomentUm Orthogonalized by Newton-Schulz)",
      "year": "2025.02",
      "org": "学术界",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2502.16982",
      "projectUrl": "",
      "category": "training",
      "motivation": "梯度正交化节省50%计算步骤",
      "summary": "Muon 通过 Newton-Schulz 迭代对梯度动量进行正交化，实现谱范数下的最速下降方向，并引入 weight decay 与 update RMS 匹配机制使其可扩展至大规模 LLM 训练，仅需约 **50% 的训练 FLOPs** 即可达到 AdamW 同等性能。",
      "keyPoints": [
        "<strong>谱范数最速下降</strong>：Muon 将梯度动量矩阵正交化（取其最近正交矩阵），等价于在谱范数约束下的最速下降方向，比 AdamW 的逐元素缩放更高效利用矩阵结构",
        "<strong>Newton-Schulz 迭代</strong>：使用 5 次多项式迭代 <span class=\"kb-math kb-math-inline\">X_{k+1} = a X_k + b X_k^3 + c X_k^5</span> 近似矩阵极分解，完全由矩阵乘法组成，GPU 友好且无需 SVD",
        "<strong>Weight Decay 稳定训练</strong>：原始 Muon 无 weight decay 导致权重范数膨胀、训练不稳定；引入 <span class=\"kb-math kb-math-inline\">\\lambda = 0.1</span> 的 weight decay 解决此问题",
        "<strong>Update RMS 匹配</strong>：通过 <span class=\"kb-math kb-math-inline\">\\text{lr} \\times \\sqrt{\\max(m, n)/n} \\times 0.2</span> 的缩放因子，使 Muon 的 update RMS 与 AdamW 对齐，可直接复用 AdamW 的超参数",
        "<strong>分布式 ZeRO-1 实现</strong>：每个 GPU 仅存储部分参数的动量，通过 all-gather 拼接后执行 Newton-Schulz 迭代，内存开销仅为 AdamW 的约 50%",
        "<strong>混合策略</strong>：2D 权重矩阵使用 Muon，1D 参数（bias、LayerNorm、embedding）仍使用 AdamW",
        "<strong>Scaling Law 验证</strong>：在 1.5B 到 16B 参数规模上验证，Muon 的 scaling law 曲线始终优于 AdamW，仅需约 52% FLOPs 匹配同等损失",
        "<strong>Moonlight 模型</strong>：基于 Muon 训练的 3B/16B MoE 模型（5.7T tokens），在多项基准上超越同规模竞品"
      ],
      "detail": "<h5>核心框架图</h5>\n<p><img alt=\"Muon vs AdamW Scaling Law\" src=\"https://ar5iv.labs.arxiv.org/html/2502.16982/assets/x1.png\" />\n<em>图 1(a)：Muon 与 AdamW 在不同 FLOPs 预算下的验证损失对比。Muon 在所有计算预算下均优于 AdamW，且差距随规模增大而保持。</em></p>\n<p><img alt=\"Moonlight MMLU 对比\" src=\"https://ar5iv.labs.arxiv.org/html/2502.16982/assets/x2.png\" />\n<em>图 1(b)：Moonlight（Muon 训练）与其他同规模模型在 MMLU 上的对比，展示了 Muon 在下游任务上的优势。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Muon 优化器核心算法（含 weight decay 和 update RMS 匹配）\n# 输入: 参数 θ, 学习率 η, 动量系数 μ, weight decay λ, NS迭代次数 k=5\n# NS多项式系数: a=3.4445, b=-4.7750, c=2.0315\n\ndef muon_step(θ, grad, momentum_buffer, η, μ=0.95, λ=0.1):\n    # 1. 更新动量（Nesterov 风格）\n    buf = μ * momentum_buffer + grad\n    grad_with_nesterov = grad + μ * buf\n\n    # 2. Newton-Schulz 迭代正交化（仅对 2D 权重矩阵）\n    G = grad_with_nesterov  # shape: (m, n)\n    # 初始缩放使谱范数约为 1\n    G = G / (G.norm() + 1e-7)\n\n    # 5 次 NS 迭代\n    for _ in range(5):\n        A = G @ G.T                    # (m, m)\n        G = 3.4445 * G - 4.7750 * (A @ G) + 2.0315 * (A @ A @ G)\n\n    # 3. Update RMS 匹配缩放\n    m, n = θ.shape\n    scale = 0.2 * sqrt(max(m, n) / n)\n\n    # 4. 参数更新（含 weight decay）\n    θ = θ - η * (scale * G + λ * θ)\n\n    return θ, buf\n</code></pre>\n<pre><code class=\"language-python\"># 分布式 Muon（ZeRO-1 风格）\n# 每个 GPU rank 仅存储 1/world_size 的动量\n\ndef distributed_muon_step(θ_full, grad_full, local_momentum, rank, world_size):\n    # 每个 rank 只处理自己负责的参数分片\n    chunk_size = len(θ_full) // world_size\n    local_grad = grad_full[rank * chunk_size : (rank+1) * chunk_size]\n\n    # 本地更新动量\n    local_momentum = μ * local_momentum + local_grad\n    local_nesterov = local_grad + μ * local_momentum\n\n    # All-gather 拼接完整动量矩阵\n    full_nesterov = all_gather(local_nesterov)  # 通信\n\n    # 在完整矩阵上执行 Newton-Schulz 迭代\n    G = newton_schulz_orthogonalize(full_nesterov, k=5)\n\n    # 取回本地分片进行参数更新\n    local_update = G[rank * chunk_size : (rank+1) * chunk_size]\n    θ_local = θ_local - η * (scale * local_update + λ * θ_local)\n</code></pre>\n<h5>动机与背景</h5>\n<p><strong>AdamW 的局限性</strong>：AdamW 通过逐元素的二阶矩估计来缩放梯度，本质上是在 <span class=\"kb-math kb-math-inline\">\\ell_\\infty</span> 范数约束下的最速下降。这种逐元素操作忽略了权重矩阵的矩阵结构，无法利用梯度矩阵的奇异值分布信息。</p>\n<p><strong>Muon 的核心洞察</strong>：对于权重矩阵 <span class=\"kb-math kb-math-inline\">W \\in \\mathbb{R}^{m \\times n}</span>，更自然的约束应该是谱范数（最大奇异值）。在谱范数约束下的最速下降方向恰好是梯度矩阵的<strong>正交极因子</strong>（orthogonal polar factor），即将梯度 SVD 分解 <span class=\"kb-math kb-math-inline\">G = U \\Sigma V^T</span> 后取 <span class=\"kb-math kb-math-inline\">UV^T</span>。</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：正交化后的更新方向 <span class=\"kb-math kb-math-inline\">UV^T</span> 保留了梯度的方向信息但移除了奇异值的不均匀缩放，使得所有方向上的更新幅度一致，避免了某些方向更新过大或过小的问题。</div>\n<h5>Newton-Schulz 迭代的数学原理</h5>\n<p>直接计算 SVD 代价高昂且不适合 GPU 并行。Muon 使用 <strong>Newton-Schulz 迭代</strong> 来近似极分解：</p>\n<div class=\"kb-math kb-math-display\">X_{k+1} = a X_k + b X_k (X_k^T X_k) + c X_k (X_k^T X_k)^2</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">a = 3.4445, b = -4.7750, c = 2.0315</span>，这些系数经过优化以最大化收敛速度。</p>\n<p><strong>为什么只需 5 次迭代？</strong> 初始矩阵经过谱范数归一化后，其奇异值已经在 <span class=\"kb-math kb-math-inline\">[0, 1]</span> 范围内。5 次迭代足以将所有奇异值映射到接近 1（即正交化），因为每次迭代都是一个 5 阶多项式映射 <span class=\"kb-math kb-math-inline\">\\sigma \\mapsto (a + b\\sigma^2 + c\\sigma^4) \\cdot \\sigma</span>，在 <span class=\"kb-math kb-math-inline\">[0, 1]</span> 上快速收敛到恒等函数。</p>\n<p><strong>计算复杂度</strong>：每次迭代仅涉及矩阵乘法，5 次迭代共需约 15 次矩阵乘法。对于 <span class=\"kb-math kb-math-inline\">m \\times n</span> 矩阵，总 FLOPs 约为 <span class=\"kb-math kb-math-inline\">O(15 \\cdot m \\cdot n \\cdot \\min(m,n))</span>，远小于前向/反向传播的计算量。</p>\n<h5>Weight Decay 的必要性</h5>\n<p><img alt=\"Weight Decay 消融实验\" src=\"https://ar5iv.labs.arxiv.org/html/2502.16982/assets/x3.png\" />\n<em>图 2：AdamW（绿色）、无 weight decay 的 Muon（红色）、有 weight decay 的 Muon（蓝色）的验证损失曲线。无 weight decay 的 Muon 在训练后期出现损失上升。</em></p>\n<p>原始 Muon 没有 weight decay，导致两个问题：</p>\n<ol>\n<li><strong>权重范数膨胀</strong>：正交化更新的范数恒定（不随权重大小调整），缺乏隐式正则化效果</li>\n<li><strong>训练不稳定</strong>：在大规模训练中（&gt;100B tokens），权重范数持续增长最终导致训练崩溃</li>\n</ol>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：AdamW 的逐元素归一化天然具有一定的权重范数控制效果（大权重对应大梯度时更新比例较小），而 Muon 的正交化更新不具备此性质，因此显式 weight decay 是必需的。</div>\n<p>论文实验表明 <span class=\"kb-math kb-math-inline\">\\lambda = 0.1</span> 在所有规模上都表现良好，无需针对模型大小调整。</p>\n<h5>Update RMS 匹配机制</h5>\n<p>这是使 Muon 可扩展的关键工程创新。核心问题是：<strong>如何让 Muon 直接复用 AdamW 经过大量调参得到的学习率？</strong></p>\n<p><strong>观察</strong>：AdamW 的 update RMS（参数更新的均方根）约为 <span class=\"kb-math kb-math-inline\">\\text{lr} \\times 0.2</span>（因为 Adam 的二阶矩归一化使 update 幅度约为 1，再乘以 lr）。</p>\n<p><strong>Muon 的 update RMS 推导</strong>：正交化后的矩阵 <span class=\"kb-math kb-math-inline\">G \\in \\mathbb{R}^{m \\times n}</span> 满足 <span class=\"kb-math kb-math-inline\">\\|G\\|_F^2 = \\min(m, n)</span>（正交矩阵的 Frobenius 范数等于其秩），因此：</p>\n<div class=\"kb-math kb-math-display\">\\text{RMS}(G) = \\sqrt{\\frac{\\|G\\|_F^2}{m \\cdot n}} = \\sqrt{\\frac{\\min(m, n)}{m \\cdot n}} = \\frac{1}{\\sqrt{\\max(m, n)}}</div>\n<p>为了匹配 AdamW 的 update RMS <span class=\"kb-math kb-math-inline\">\\approx \\text{lr} \\times 0.2</span>，Muon 的缩放因子设为：</p>\n<div class=\"kb-math kb-math-display\">\\text{scale} = 0.2 \\times \\sqrt{\\frac{\\max(m, n)}{n}}</div>\n<div class=\"key-point\">💡 <strong>关键</strong>：这个匹配使得 Muon 可以直接使用 AdamW 的学习率、warmup 策略和 decay schedule，大幅降低了超参数搜索成本。实验验证（Table 1）显示匹配后的 update RMS 在 <span class=\"kb-math kb-math-inline\">10^{-4}</span> 量级上与 AdamW 一致。</div>\n<h5>分布式实现与内存优化</h5>\n<p>Muon 采用类似 ZeRO-1 的分布式策略：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>组件</th>\n<th>AdamW</th>\n<th>Muon</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>优化器状态</td>\n<td>动量 + 二阶矩 = <strong>2份</strong></td>\n<td>仅动量 = <strong>1份</strong></td>\n</tr>\n<tr>\n<td>分布式策略</td>\n<td>每 GPU 存全部状态</td>\n<td>每 GPU 存 1/N 动量</td>\n</tr>\n<tr>\n<td>通信</td>\n<td>梯度 all-reduce</td>\n<td>动量 all-gather</td>\n</tr>\n<tr>\n<td>内存占用</td>\n<td>2× 参数量</td>\n<td>~0.5× 参数量（分片后）</td>\n</tr>\n</tbody>\n</table></div>\n<p>Newton-Schulz 迭代需要完整的动量矩阵，因此在迭代前需要 all-gather 操作。但由于 Muon 只需存储一份动量（而非 AdamW 的动量+二阶矩两份），分片后的总内存开销反而更低。</p>\n<h5>Scaling Law 分析</h5>\n<p><img alt=\"Scaling Law 拟合曲线\" src=\"https://ar5iv.labs.arxiv.org/html/2502.16982/assets/x4.png\" />\n<em>图 3：Muon 和 AdamW 的 Scaling Law 拟合曲线。Muon 在所有 FLOPs 预算下均低于 AdamW。</em></p>\n<p>论文在 1.5B–16B 参数规模上进行了系统的 scaling law 实验，使用 Chinchilla 风格的拟合：</p>\n<div class=\"kb-math kb-math-display\">L(C) = A \\cdot C^{-\\alpha} + L_\\infty</div>\n<p>拟合结果：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>优化器</th>\n<th><span class=\"kb-math kb-math-inline\">A</span></th>\n<th><span class=\"kb-math kb-math-inline\">\\alpha</span></th>\n<th><span class=\"kb-math kb-math-inline\">L_\\infty</span></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Muon</td>\n<td>2.506</td>\n<td>0.052</td>\n<td>2.839</td>\n</tr>\n<tr>\n<td>AdamW</td>\n<td>2.608</td>\n<td>0.054</td>\n<td>2.857</td>\n</tr>\n</tbody>\n</table></div>\n<p>关键发现：<strong>Muon 仅需约 52% 的 FLOPs 即可达到 AdamW 相同的验证损失</strong>。两者的 <span class=\"kb-math kb-math-inline\">\\alpha</span>（缩放指数）接近，说明 Muon 的优势是一个近似恒定的乘法因子，而非改变缩放规律本身。</p>\n<h5>SVD 熵分析</h5>\n<p><img alt=\"SVD 熵分析\" src=\"https://ar5iv.labs.arxiv.org/html/2502.16982/assets/x5.png\" />\n<em>图 4：不同训练阶段权重矩阵的 SVD 熵。Muon 训练的模型具有更高的 SVD 熵，说明奇异值分布更均匀。</em></p>\n<p>论文通过 SVD 熵（对归一化奇异值计算信息熵）分析了 Muon 与 AdamW 训练的权重矩阵差异：</p>\n<div class=\"kb-math kb-math-display\">H = -\\sum_i \\hat{\\sigma}_i \\log \\hat{\\sigma}_i, \\quad \\hat{\\sigma}_i = \\frac{\\sigma_i}{\\sum_j \\sigma_j}</div>\n<p>Muon 训练的模型在所有层类型（attention QKV、output projection、FFN）上都具有更高的 SVD 熵，意味着：\n- 权重矩阵的奇异值分布更均匀\n- 模型利用了更多的方向来编码信息\n- 有效秩更高，表示能力更强</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：Muon 的正交化更新天然倾向于均匀化奇异值——因为更新方向 <span class=\"kb-math kb-math-inline\">UV^T</span> 的所有奇异值都是 1，不会像 AdamW 那样因梯度奇异值不均匀而导致某些方向被过度更新。</div>\n<h5>Moonlight 模型实验结果</h5>\n<p>Moonlight 是基于 Muon 训练的 3B 激活 / 16B 总参数的 MoE 模型，在 5.7T tokens 上训练。</p>\n<p><strong>与 AdamW 基线对比（1.2T tokens）</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>基准</th>\n<th>Moonlight (Muon)</th>\n<th>Moonlight-A (AdamW)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>MMLU</td>\n<td>59.1</td>\n<td>55.5</td>\n</tr>\n<tr>\n<td>MATH-500</td>\n<td>30.0</td>\n<td>22.8</td>\n</tr>\n<tr>\n<td>HumanEval</td>\n<td>53.7</td>\n<td>48.8</td>\n</tr>\n<tr>\n<td>MBPP</td>\n<td>56.3</td>\n<td>54.3</td>\n</tr>\n<tr>\n<td>GSM8K</td>\n<td>60.0</td>\n<td>50.0</td>\n</tr>\n</tbody>\n</table></div>\n<p>Muon 在所有基准上均优于 AdamW，尤其在数学（MATH +7.2）和代码（HumanEval +4.9）任务上优势显著。</p>\n<p><strong>与同规模开源模型对比（5.7T tokens）</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>基准</th>\n<th>Moonlight</th>\n<th>Llama-3.2-3B (9T)</th>\n<th>Qwen2.5-3B (18T)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>MMLU</td>\n<td>62.6</td>\n<td>63.4</td>\n<td>65.6</td>\n</tr>\n<tr>\n<td>MATH-500</td>\n<td>42.4</td>\n<td>44.4</td>\n<td>42.4</td>\n</tr>\n<tr>\n<td>HumanEval</td>\n<td>68.3</td>\n<td>36.0</td>\n<td>42.7</td>\n</tr>\n<tr>\n<td>GSM8K</td>\n<td>71.7</td>\n<td>54.4</td>\n<td>79.2</td>\n</tr>\n</tbody>\n</table></div>\n<p>Moonlight 仅用 5.7T tokens 即在 HumanEval 上大幅超越使用 9T/18T tokens 训练的竞品，在 MATH 上与 Qwen2.5-3B 持平，展示了 Muon 的数据效率优势。</p>\n<h5>与 AdamW 的本质区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>AdamW</th>\n<th>Muon</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>更新方向</td>\n<td>逐元素梯度/二阶矩</td>\n<td>梯度动量的正交极因子</td>\n</tr>\n<tr>\n<td>范数约束</td>\n<td><span class=\"kb-math kb-math-inline\">\\ell_\\infty</span> 最速下降</td>\n<td>谱范数最速下降</td>\n</tr>\n<tr>\n<td>矩阵结构利用</td>\n<td>❌ 忽略</td>\n<td>✅ 利用奇异值结构</td>\n</tr>\n<tr>\n<td>优化器状态</td>\n<td>2 份（<span class=\"kb-math kb-math-inline\">m_t, v_t</span>）</td>\n<td>1 份（<span class=\"kb-math kb-math-inline\">m_t</span>）</td>\n</tr>\n<tr>\n<td>适用参数</td>\n<td>所有参数</td>\n<td>仅 2D 权重矩阵</td>\n</tr>\n<tr>\n<td>Weight decay</td>\n<td>解耦式</td>\n<td>同样解耦式（<span class=\"kb-math kb-math-inline\">\\lambda=0.1</span>）</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "Muon 优化器使用 Newton-Schulz 迭代的主要目的是什么？",
        "options": [
          "计算梯度矩阵的逆，实现二阶优化",
          "近似梯度动量矩阵的极分解，获取正交化更新方向",
          "对梯度进行低秩近似以减少通信量",
          "估计梯度的二阶矩以实现自适应学习率"
        ],
        "answer": 1,
        "explain": "Newton-Schulz 迭代用于近似矩阵极分解 G = U Σ V^T → UV^T，将梯度动量正交化为最近正交矩阵，实现谱范数下的最速下降方向。"
      }
    },
    {
      "id": "flash_attention_4",
      "num": 26,
      "name": "FlashAttention-4",
      "fullName": "FlashAttention-4 (FlashAttention-4 for Blackwell)",
      "year": "2026.03",
      "org": "Together AI",
      "parent": "flash_attention_2",
      "paperUrl": "https://tridao.me/blog/2026/flash-attention-4/",
      "projectUrl": "",
      "category": "training",
      "motivation": "Blackwell架构71%硬件利用率",
      "summary": "FlashAttention-4 针对 NVIDIA Blackwell 的非对称硬件扩展重新设计 attention kernel，用异步 MMA、TMEM、2-CTA MMA、软件指数和条件 softmax rescaling 重叠 matmul、softmax 与内存瓶颈。它在 B200 BF16 上达到约 1605-1613 TFLOPs/s、约 71% 利用率，解决了 Tensor Core 变快后 SFU 和 shared memory 成为新瓶颈的问题。",
      "keyPoints": [
        "正确官方博客地址为 https://tridao.me/blog/2026/flash4/，论文为 arXiv:2603.05451",
        "面向 Blackwell B200/GB200 的 TMEM、5th-gen async tensor cores 和 2-CTA MMA",
        "前向使用 ping-pong Q tiles 和两个 softmax warpgroups，最大化 MMA 与 softmax overlap",
        "用 FMA 多项式近似分担部分 <span class=\"kb-math kb-math-inline\">2^x</span> 指数计算，缓解 MUFU/SFU 吞吐瓶颈",
        "条件 online softmax rescaling 只在 running max 变化超过阈值时重缩放，减少非 matmul 操作",
        "反向把中间 <span class=\"kb-math kb-math-inline\">P^T,dS^T</span> 放入 TMEM，并用 2-CTA MMA 降低 shared memory traffic 与 dQ atomic adds",
        "使用 CuTe-DSL/Python 实现，保持底层表达力同时显著缩短编译迭代时间"
      ],
      "detail": "<p><img alt=\"FlashAttention-4 前向流水线\" src=\"https://tridao.me/assets/img/2026-03-05-flash4/fa4_fwd_pipeline.png\" />\n<em>图：Tri Dao 官方博客中的 FlashAttention-4 forward pipeline，展示 ping-pong Q tiles、softmax warpgroups 和 correction stage。Manifest 的 blog 路径已失效，正文使用官方正确路径 /blog/2026/flash4/ 与 arXiv:2603.05451 补足。</em></p>\n<pre><code class=\"language-python\"># FlashAttention-4 forward 高层伪代码\ndef fa4_forward_blackwell(Q, K, V):\n    for cta in schedule_lpt_tiles(Q, K):\n        # 两个 Q tile 交替推进，MMA 输出进入 TMEM\n        q_hi, q_lo = load_two_q_tiles(cta)\n        state_hi = init_online_softmax()\n        state_lo = init_online_softmax()\n\n        for k_tile, v_tile in stream_kv_tiles(K, V):\n            async_mma_tmem(q_hi, k_tile)  # QK^T for high tile\n            softmax_lo = softmax_warpgroup(state_lo, exp_mode=&quot;mufu+fma&quot;)\n            maybe_correction_rescale(state_lo, threshold=tau)\n\n            async_mma_tmem(q_lo, k_tile)  # QK^T for low tile\n            softmax_hi = softmax_warpgroup(state_hi, exp_mode=&quot;mufu+fma&quot;)\n            maybe_correction_rescale(state_hi, threshold=tau)\n\n            async_mma_tmem(softmax_hi, v_tile)  # PV\n            async_mma_tmem(softmax_lo, v_tile)\n\n        write_normalized_outputs(state_hi, state_lo)\n</code></pre>\n<p><strong>动机与背景：Blackwell 的瓶颈从 GEMM 转移到周边单元。</strong> 从 H100 到 B200，BF16 Tensor Core 峰值大幅增加，但 shared memory bandwidth 和指数单元吞吐没有同等增长。Attention 不是纯 GEMM；它还要做 softmax、mask、归一化、数据搬运和调度。FA4 的 roofline 分析指出，前向常被指数计算卡住，反向常被 shared memory traffic 卡住，因此单纯复用 FA2/FA3 pipeline 会留下大量硬件性能。</p>\n<p><strong>核心机制一：前向把 softmax 藏在 MMA 后面。</strong> Blackwell 的 MMA 异步写入 TMEM，使 tensor core 工作不再强依赖寄存器累加器。FA4 让一个 CTA 同时处理两个 Q tile，交替发射 <span class=\"kb-math kb-math-inline\">QK^\\top</span> 和 <span class=\"kb-math kb-math-inline\">PV</span> MMA；当一个 tile 做 tensor core 计算时，另一个 tile 的 softmax warpgroup 读取 TMEM 结果并做 max/sum/exp。这样 softmax 不再完全串在两次 matmul 之间。</p>\n<p><strong>核心机制二：软件指数和条件 rescaling 减少非 matmul 路径。</strong> softmax 需要大量 <span class=\"kb-math kb-math-inline\">e^x</span>，但 MUFU.EX2 吞吐有限。FA4 将一部分 <span class=\"kb-math kb-math-inline\">2^x</span> 用 FMA 上的多项式近似计算，利用空闲 ALU 分担 MUFU 压力。online softmax 的传统更新每次 running max 改变都要 rescale 旧输出；FA4 只在 <span class=\"kb-math kb-math-inline\">m_j-m_{j-1}&gt;\\tau</span> 时立即 rescale，否则延迟到最终归一化：</p>\n<div class=\"kb-math kb-math-display\">O_j =\n\\begin{cases}\ne^{m_{j-1}-m_j}O_{j-1}+e^{S_j-m_j}V_j, &amp; m_j-m_{j-1}&gt;\\tau\\\\\nO_{j-1}+e^{S_j-m_{j-1}}V_j, &amp; \\text{otherwise}\n\\end{cases}</div>\n<p><strong>核心机制三：反向用 TMEM 和 2-CTA MMA 降低共享内存压力。</strong> Backward 需要重算 <span class=\"kb-math kb-math-inline\">S,P</span>，并执行 <span class=\"kb-math kb-math-inline\">dV,dK,dQ</span> 等五类 MMA。FA4 把 <span class=\"kb-math kb-math-inline\">P^T</span> 和 <span class=\"kb-math kb-math-inline\">dS^T</span> 直接放在 TMEM 中作为后续 MMA operand，避免在 shared memory 中反复写读。Blackwell 的 2-CTA MMA 让两个 CTA 协作一个大 tile，各自 staging 一半 operand，减少 B operand 的共享内存流量，并顺带减少 dQ 的全局 atomic reductions。</p>\n<p><strong>与 FA2/FA3 的区别：面向 Blackwell 的算法-内核协同。</strong> FA2 主要优化并行划分，FA3 面向 Hopper 做异步和 warp specialization；FA4 则把 Blackwell 新增的 TMEM、UMMA 和 2-CTA mode 作为算法设计约束。它不只是“换一代 GPU 重新调参”，而是改变 softmax、rescale、backward dataflow 和 scheduler 的配合方式。</p>\n<div class=\"key-point\">💡 关键：FA4 的本质是把 attention 中所有非 GEMM 瓶颈重新排进 Blackwell 的异步执行缝隙里。</div>",
      "quiz": {
        "q": "FlashAttention-4 在 Blackwell 上重点缓解了哪些新瓶颈？",
        "options": [
          "Tokenizer 训练和词表合并",
          "前向指数/softmax 吞吐与反向 shared memory traffic",
          "CPU 文件读取",
          "模型参数初始化"
        ],
        "answer": 1,
        "explain": "Blackwell Tensor Core 更快后，attention 的 SFU 指数计算和 shared memory 访问成为主要限制，FA4 围绕这些瓶颈重排流水线。"
      }
    },
    {
      "id": "snip_quartet",
      "num": 27,
      "name": "SNIP/Quartet",
      "fullName": "SNIP/Quartet (Native FP4 Training)",
      "year": "2026",
      "org": "NeurIPS",
      "parent": "mixed_precision",
      "paperUrl": "https://arxiv.org/abs/2410.20574",
      "projectUrl": "",
      "category": "training",
      "motivation": "原生FP4训练层级动态量化",
      "summary": "SNIP 和 Quartet 分别从“自适应层级混合精度”和“端到端原生 FP4 训练”两条路线推进 sub-byte LLM 训练：前者根据量化导致的 loss/weight divergence 动态决定各层 FP4/FP8，后者用 MXFP4/优化 kernel 和低精度 scaling law 证明主要线性层可原生 FP4。它们共同解决的是 FP4 训练吞吐高但收敛和精度容易崩的问题。",
      "keyPoints": [
        "Manifest URL 指向不相关数学论文；正文依据 SNIP arXiv:2602.01410 与 Quartet arXiv:2505.14669 补足",
        "SNIP 周期性收集 activations、gradients、optimizer states 统计，评估量化对训练质量的影响",
        "SNIP 定义 forward loss divergence 和 backward weight divergence，作为层级精度选择的优化代理",
        "SNIP 将“多少 FP4 FLOPs”作为效率预算，在满足质量约束下求 layer-wise FP4/FP8 配置",
        "Quartet 聚焦 Blackwell 支持的 FP4/MXFP4，试图让主要 linear layers 的 forward/backward 都原生低精度",
        "Quartet 通过低精度 scaling law 分析不同 bit-width/训练设置的 accuracy-vs-compute tradeoff",
        "二者都继承混合精度思想，但把粒度从 FP16/FP32 扩展到 FP4/FP8/BF16 的动态组合"
      ],
      "detail": "<p><img alt=\"SNIP 系统总览\" src=\"https://ar5iv.labs.arxiv.org/html/2602.01410/assets/x2.png\" />\n<em>图：SNIP 论文 Figure 2，展示周期性统计收集、层级量化影响评估和 FP4/FP8 配置更新。</em></p>\n<p><img alt=\"Quartet 低精度训练分析\" src=\"https://ar5iv.labs.arxiv.org/html/2505.14669/assets/x1.png\" />\n<em>图：Quartet 论文 Figure 1，展示低精度训练设置下的 scaling-law/accuracy-compute 分析。Manifest 中 paper_url 不匹配，正文使用 SNIP 与 Quartet 的公开论文补足。</em></p>\n<pre><code class=\"language-python\"># SNIP + Quartet 风格 sub-byte 训练伪代码\ndef subbyte_train(model, data, fp4_budget):\n    precision = {layer: &quot;FP8&quot; for layer in model.linear_layers}\n\n    for step, batch in enumerate(data):\n        if step % profile_interval == 0:\n            stats = collect_stats(model, batch, tensors=[&quot;act&quot;, &quot;grad&quot;, &quot;optimizer&quot;])\n            costs = {}\n            for layer in model.linear_layers:\n                loss_div = estimate_loss_divergence(layer, stats, quant=&quot;FP4&quot;)\n                weight_div = estimate_weight_divergence(layer, stats, quant=&quot;FP4&quot;)\n                costs[layer] = loss_div + lambda_w * weight_div\n            precision = solve_layer_precision(costs, fp4_budget)\n\n        with quantized_linear_policy(precision, fp4_kernel=&quot;MXFP4&quot;):\n            loss = model(batch)\n            loss.backward()\n            optimizer_step_with_master_states(model)\n</code></pre>\n<p><strong>动机与背景：FP4 的计算收益很大，但统一 FP4 太粗暴。</strong> Blackwell 等硬件让 FP4 GEMM 具备很高理论吞吐，但 LLM 训练对数值误差极其敏感。若把所有线性层、所有阶段都统一降到 FP4，forward loss 会因为激活/权重量化误差上升，backward 更新也会因梯度和 optimizer 状态误差偏离，最终表现为收敛变慢或质量崩溃。</p>\n<p><strong>SNIP 的核心机制：把精度选择变成有预算的优化问题。</strong> SNIP 不用固定规则说“前几层 FP8、后几层 FP4”，而是定期 profile 当前模型状态。它用 loss divergence 衡量某层 forward 量化让训练 loss 增加多少，用 weight divergence 衡量 backward/更新误差会让参数轨迹偏离多少。然后在给定 FP4 FLOPs 比例预算下，选择最适合降到 FP4 的层。</p>\n<div class=\"kb-math kb-math-display\">\\min_{q_1,\\ldots,q_L}\\sum_{\\ell=1}^{L} C_\\ell(q_\\ell)\n\\quad \\text{s.t.}\\quad\n\\sum_{\\ell=1}^{L}\\text{FLOPs}_\\ell\\mathbf{1}[q_\\ell=\\text{FP4}]\\ge B</div>\n<p><strong>Quartet 的核心机制：把 FP4 做成端到端训练路径。</strong> Quartet 关注硬件支持的 MXFP4/NVFP4 类格式，用 per-block scale、量化 kernel 和训练规则让主要线性层 forward/backward 都走 FP4，而不是在关键路径频繁 fallback 到 BF16/FP16。它还通过 scaling law 比较 BF16、FP8、FP4 在不同模型规模和 token 预算下的损失曲线，寻找计算最优的低精度配置。</p>\n<p><strong>二者的互补关系：SNIP 管策略，Quartet 管原生算子。</strong> SNIP 更像 precision scheduler，回答“哪些层、什么时候可以用 FP4”；Quartet 更像 FP4 training recipe/kernel stack，回答“用 FP4 时怎样量化、缩放和执行才不掉太多精度”。实际系统可以把 SNIP 的层级策略与 Quartet 的 MXFP4 kernel 结合。</p>\n<p><strong>与 2018 混合精度的区别：从 FP16 安全加速到 sub-byte 动态控制。</strong> 经典混合精度只需解决 FP16 下溢和 FP32 master weight；FP4 训练还要处理更强的量化噪声、block scale、outlier、梯度路径偏移和层间敏感度差异。因此 FP4 不能简单套用 loss scaling，而需要动态量化误差评估和硬件感知 kernel。</p>\n<div class=\"warn-box\">⚠️ 注意：SNIP/Quartet 并不意味着所有训练状态都变成 4 bit；优化器状态、累积器或部分敏感路径仍可能需要更高精度保护。</div>",
      "quiz": {
        "q": "SNIP 决定某层是否使用 FP4 时主要看什么？",
        "options": [
          "层名字是否包含 attention",
          "量化导致的 loss divergence 和 weight divergence，并结合 FP4 FLOPs 预算",
          "该层参数是否全为正数",
          "训练数据文件大小"
        ],
        "answer": 1,
        "explain": "SNIP 用前向损失偏移和反向权重轨迹偏移估计量化影响，再求层级混合精度配置。"
      }
    },
    {
      "id": "longrope2",
      "num": 28,
      "name": "LongRoPE2",
      "fullName": "LongRoPE2 (Near-Lossless LLM Context Window Scaling)",
      "year": "2025.12",
      "org": "Microsoft",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2502.05011",
      "projectUrl": "",
      "category": "training",
      "motivation": "进化搜索扩展至200万上下文",
      "summary": "LongRoPE2 通过“真实 critical dimension”感知的 RoPE rescaling、needle-driven perplexity 引导的进化搜索和 mixed context window training，把 RoPE 模型扩展到长上下文同时尽量保留短上下文能力。它解决的是传统 RoPE 外推在高维频率未充分训练时产生 OOD 位置、长上下文有效长度不足的问题。",
      "keyPoints": [
        "正确公开论文为 LongRoPE2: Near-Lossless LLM Context Window Scaling, arXiv:2502.20082",
        "提出高 RoPE 维度训练不足会导致长上下文 OOD 的假设",
        "用理论 period 初始化 rescaling factors，并识别 real critical dimension",
        "构造 synthetic needle data，只计算 needle answer tokens 的 PPL 作为长程检索导向评价",
        "用 evolutionary search 搜索各 RoPE 维度缩放因子，而不是手写统一 NTK/YaRN 缩放",
        "mixed context window training 同时喂短上下文原始 RoPE 和长上下文 rescaled RoPE，减少短上下文遗忘",
        "在 LLaMA3-8B 和 Phi3-mini-3.8B 上扩展到 128K，并报告保留 98.5% 以上短上下文性能；LongRoPE 系列支持更长目标上下文"
      ],
      "detail": "<p><img alt=\"LongRoPE2 mixed context window training\" src=\"https://ar5iv.labs.arxiv.org/html/2502.20082/assets/x5.png\" />\n<em>图：LongRoPE2 论文 Figure 5，展示短上下文使用原始 RoPE、长上下文使用 rescaled RoPE 的 mixed context window training。Manifest 中 paper_url 指向不相关论文，正文依据 arXiv:2502.20082 补足。</em></p>\n<pre><code class=\"language-python\"># LongRoPE2 搜索与训练伪代码\ndef longrope2_extend(model, target_len):\n    factors = init_by_theoretical_periods(model.rope_dims, target_len)\n    population = make_population(factors, size=64)\n\n    for _ in range(40):  # evolutionary search\n        scored = []\n        for candidate in population:\n            apply_rope_scaling(model, candidate)\n            ppl = needle_driven_perplexity(model, synthetic_needle_set(target_len))\n            scored.append((ppl, candidate))\n        parents = select_best(scored)\n        population = mutate_critical_dims(parents, prob=0.3)\n\n    best_factors = min(scored)[1]\n    for batch in mixed_context_batches(short_docs, long_docs):\n        if batch.length &lt;= original_len:\n            model.use_rope(&quot;original&quot;)\n        else:\n            model.use_rope(&quot;rescaled&quot;, best_factors)\n        train_step(model, batch)\n\n    return model\n</code></pre>\n<p><strong>动机与背景：RoPE 外推失败并不只因长度变大。</strong> RoPE 为不同维度分配不同旋转频率。低维高频分量在原始训练长度内经历过多个周期，而高维低频分量可能连一个完整周期都没见过。把上下文突然扩到 128K 或更长时，这些高维旋转角进入模型未训练过的区域，造成 position OOD。LongRoPE2 把这个问题称为高维 RoPE 训练不足。</p>\n<p><strong>核心机制一：按维度缩放，而不是统一拉伸。</strong> NTK/YaRN 等方法提供全局或规则化缩放，但不同 RoPE 维度的训练充分程度不同。LongRoPE2 先用理论 period 找到哪些维度在目标长度下会跨入风险区，再围绕 real critical dimension 搜索维度级 rescaling factor。形式上，位置 <span class=\"kb-math kb-math-inline\">p</span> 和第 <span class=\"kb-math kb-math-inline\">i</span> 个 RoPE 频率的角度从 <span class=\"kb-math kb-math-inline\">\\theta_i p</span> 改为：</p>\n<div class=\"kb-math kb-math-display\">\\theta&#x27;_i p = \\frac{\\theta_i}{s_i}p</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">s_i</span> 不是常数，而是搜索得到的 per-dimension factor。</p>\n<p><strong>核心机制二：needle-driven PPL 让搜索关注长程检索。</strong> 普通 PPL 对所有 token 平均，长上下文中局部语言建模 token 会淹没“是否真的利用远距离信息”的信号。LongRoPE2 在长文本中插入 needle，并只对答案 needle tokens 计算 perplexity。这样候选 rescaling factor 如果不能让模型跨长距离找回 needle，会直接得到更差分数。</p>\n<p><strong>核心机制三：mixed context window training 保短也保长。</strong> 只用长上下文 rescaled RoPE 继续训练，可能让模型短上下文基准下降；只保留原始 RoPE，又无法适应长位置。LongRoPE2 在训练中混合两种模式：短片段继续使用原始 RoPE，长片段使用搜索到的 rescaled RoPE。推理时也可根据输入长度切换 factor，减少“为了长上下文牺牲常规能力”的问题。</p>\n<p><strong>与 LongRoPE/YaRN 的区别：搜索目标更贴近有效上下文。</strong> 早期方法通常用预设缩放公式或搜索短期 PPL。LongRoPE2 把 OOD 假设、needle PPL 和 mixed-context 训练结合起来，因此不仅看模型能否在长序列上给低平均 loss，还看能否在远距离 needle retrieval 中保持准确，并保留短上下文评测。</p>\n<div class=\"key-point\">💡 关键：LongRoPE2 的“near-lossless”来自两个约束同时满足：长上下文位置不过度 OOD，短上下文仍用原始分布训练和推理。</div>",
      "quiz": {
        "q": "LongRoPE2 为什么使用 needle-driven perplexity 指导搜索？",
        "options": [
          "因为它只适用于代码补全",
          "因为普通平均 PPL 容易被局部 token 淹没，不能直接反映远距离检索能力",
          "因为 RoPE 不需要任何位置编码",
          "因为它会删除短上下文训练"
        ],
        "answer": 1,
        "explain": "needle token 的 PPL 更直接衡量模型是否能利用长距离上下文找回关键信息。"
      }
    },
    {
      "id": "gpipe",
      "num": 29,
      "name": "GPipe",
      "fullName": "GPipe (GPipe: Easy Scaling with Micro-Batch Pipeline)",
      "year": "2019",
      "org": "Google",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1811.06965",
      "projectUrl": "",
      "category": "distributed",
      "motivation": "流水线并行微批次切分",
      "summary": "GPipe 提出了一套面向任意顺序神经网络的流水线模型并行方法，通过把 mini-batch 切成 micro-batch 并在多个加速器上的模型分区之间同步流水执行，解决单卡显存无法容纳大模型以及朴素模型并行设备利用率低的问题。",
      "keyPoints": [
        "将可表示为层序列的网络切成多个连续 cell，每个 cell 放到一个 accelerator 上执行。",
        "使用 micro-batch pipeline：把一个 mini-batch 切成多个 micro-batch，让不同分区同时处理不同 micro-batch。",
        "采用同步 mini-batch 梯度下降：所有 micro-batch 的梯度累积完以后再统一更新参数，避免异步流水线的 weight staleness。",
        "在分区边界自动插入通信，只传递 activation tensor 和反向梯度，通信量主要由边界张量决定。",
        "使用 rematerialization / recomputation 降低激活显存，前向只保留边界激活，反向时在分区内部重算中间激活。",
        "通过基于计算代价的分区策略平衡每个 cell 的耗时，减少流水线 bubble 和 load imbalance。",
        "实验展示了 557M 参数 AmoebaNet 在 ImageNet-2012 上达到 84.4% top-1，以及 128 层、6B 参数 multilingual Transformer 覆盖 103 种语言。"
      ],
      "detail": "<p><img alt=\"GPipe micro-batch pipeline 示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1811.06965/assets/PipelineParallelism.png\" />\n<em>图：论文 Figure 2(c) 的流水线并行面板。横向表示时间，不同颜色表示不同模型分区，<code>F</code> 是 forward，<code>B</code> 是 backward，中央空白是 pipeline bubble。</em></p>\n<p>GPipe 的出发点不是为某一种网络手写并行规则，而是抓住一个更通用的结构：许多深度网络都可以看成有序层序列。设模型由层 <span class=\"kb-math kb-math-inline\">L_1, L_2, \\dots, L_N</span> 组成，GPipe 把连续层合并成 <span class=\"kb-math kb-math-inline\">K</span> 个 cell：<span class=\"kb-math kb-math-inline\">C_1, C_2, \\dots, C_K</span>，并把第 <span class=\"kb-math kb-math-inline\">k</span> 个 cell 放在第 <span class=\"kb-math kb-math-inline\">k</span> 个加速器上。对第 <span class=\"kb-math kb-math-inline\">m</span> 个 micro-batch，其前向传播可以写成：</p>\n<div class=\"kb-math kb-math-display\">h_k^{(m)} = C_k(h_{k-1}^{(m)}; \\theta_k), \\quad k=1,\\dots,K</div>\n<p>朴素模型并行会让设备按层串行等待：第 2 个分区必须等第 1 个分区完成同一个 batch 的前向，第 1 个分区处理完后又空闲，反向时也类似。GPipe 的关键改动是把原 mini-batch <span class=\"kb-math kb-math-inline\">B</span> 切成 <span class=\"kb-math kb-math-inline\">M</span> 个 micro-batch <span class=\"kb-math kb-math-inline\">B^{(1)},\\dots,B^{(M)}</span>。当 <span class=\"kb-math kb-math-inline\">C_2</span> 在处理 <span class=\"kb-math kb-math-inline\">B^{(1)}</span> 的前向时，<span class=\"kb-math kb-math-inline\">C_1</span> 可以立即处理 <span class=\"kb-math kb-math-inline\">B^{(2)}</span>，于是设备利用率显著提高。pipeline 的近似利用率常被理解为 <span class=\"kb-math kb-math-inline\">\\frac{M}{M+K-1}</span>：分区数 <span class=\"kb-math kb-math-inline\">K</span> 越多，启动和排空阶段的 bubble 越大；micro-batch 数 <span class=\"kb-math kb-math-inline\">M</span> 越多，bubble 被摊薄得越充分。</p>\n<pre><code class=\"language-python\"># GPipe 训练一步的核心逻辑，省略具体调度队列和通信实现\npartitions = partition_sequential_layers(model.layers, num_cells=K, balance_by_cost=True)\nmicro_batches = split(minibatch, chunks=M)\n\n# 1. 流水线前向：不同 cell 同时处理不同 micro-batch\nfor clock in range(M + K - 1):\n    for k in range(K):\n        m = clock - k\n        if 0 &lt;= m &lt; M:\n            h[k + 1][m] = partitions[k].forward(h[k][m])\n\n# 2. 计算每个 micro-batch 的 loss\nloss = sum(loss_fn(h[K][m], target[m]) for m in range(M)) / M\n\n# 3. 反向流水线：按相反方向传回梯度，并对每个分区累积梯度\nfor clock in range(M + K - 1):\n    for k in reversed(range(K)):\n        m = clock - (K - 1 - k)\n        if 0 &lt;= m &lt; M:\n            grad_h[k][m], grad_theta[k] += partitions[k].backward(grad_h[k + 1][m])\n\n# 4. 同步更新：所有 micro-batch 都完成后才更新一次\noptimizer.step(accumulated_gradients=grad_theta)\noptimizer.zero_grad()\n</code></pre>\n<p>同步更新是 GPipe 与一些异步 pipeline 方法的关键差异。对一个 mini-batch 的目标函数可写为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}(\\theta)=\\frac{1}{M}\\sum_{m=1}^{M}\\ell\\left(C_K\\circ C_{K-1}\\circ\\cdots\\circ C_1(x^{(m)}), y^{(m)}\\right)</div>\n<p>GPipe 在所有 micro-batch 的梯度 <span class=\"kb-math kb-math-inline\">\\nabla_\\theta \\ell_m</span> 累积后执行一次参数更新：</p>\n<div class=\"kb-math kb-math-display\">\\theta \\leftarrow \\theta - \\eta \\cdot \\frac{1}{M}\\sum_{m=1}^{M}\\nabla_\\theta \\ell_m</div>\n<p>因此，同一个 mini-batch 内所有 micro-batch 都看到同一版本的参数。这样做牺牲了部分调度自由度，但换来与普通 mini-batch SGD 一致的更新语义；增加分区数或 micro-batch 数不会改变数学上的 batch gradient，只改变执行计划。这一点对于大模型预训练很重要，因为训练稳定性通常比单步吞吐更敏感。</p>\n<p>显存优化来自 rematerialization。若每个分区在前向时缓存所有层的中间激活，activation memory 会随着分区内层数和 micro-batch 数增长。GPipe 只保存分区边界上的 activation；反向传播到某个 cell 时，再重新执行该 cell 的局部前向来恢复内部中间值，然后计算梯度。这相当于用额外计算换显存。对超大 Transformer 或 AmoebaNet，这个折中非常实用：重算增加的 FLOPs 通常小于因模型能跨卡放大而获得的收益。</p>\n<p>GPipe 的通信也被限制在 cell 边界。第 <span class=\"kb-math kb-math-inline\">k</span> 个设备只需把 <span class=\"kb-math kb-math-inline\">h_k^{(m)}</span> 发送给第 <span class=\"kb-math kb-math-inline\">k+1</span> 个设备，并在反向时接收 <span class=\"kb-math kb-math-inline\">\\partial \\mathcal{L}/\\partial h_k^{(m)}</span>。相比张量并行在层内频繁 all-reduce，GPipe 的通信模式更像点到点 activation 传递，容易与数据并行组合：每个数据并行副本内部做 GPipe，副本之间再同步参数梯度。</p>\n<div class=\"key-point\">💡 关键：GPipe 的核心不是“把模型切开”这一件事，而是“切模型 + 切 batch + 同步累积 + 激活重算”四件事共同成立。只切模型会产生严重空闲；只切 batch 不解决单卡显存；只做流水线但异步更新会引入 staleness；只做重算则无法提升多设备利用率。</div>\n<p>与传统数据并行相比，GPipe 解决的是单个模型无法放进一张卡的问题，而不是单纯扩大 batch 吞吐。与朴素模型并行相比，它利用 micro-batch 让多个分区同时工作。与 Mesh-TensorFlow 一类更通用的张量切分框架相比，GPipe 的假设更简单：模型可按层顺序切分即可，因此实现门槛低，但对非顺序结构、分区不均衡、跨层跳连较复杂的模型需要更仔细的 partition function。</p>",
      "quiz": {
        "q": "GPipe 为什么要等所有 micro-batch 的梯度累积完以后再更新参数？",
        "options": [
          "为了让每个 micro-batch 使用不同参数，从而增加随机性",
          "为了保持与普通 mini-batch SGD 一致的同步梯度语义，避免同一 batch 内参数陈旧",
          "为了减少 forward pass 的计算量",
          "为了把所有通信都替换为广播操作"
        ],
        "answer": 1,
        "explain": "GPipe 的同步更新让一个 mini-batch 内的所有 micro-batch 基于同一参数版本计算梯度，最后统一更新，避免异步 pipeline 中常见的 stale weight 问题。"
      }
    },
    {
      "id": "megatron_lm",
      "num": 30,
      "name": "Megatron-LM",
      "fullName": "Megatron-LM (Megatron-LM: Training Multi-Billion Parameter)",
      "year": "2019",
      "org": "NVIDIA",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1909.08053",
      "projectUrl": "",
      "category": "distributed",
      "motivation": "张量并行Transformer层内切分",
      "summary": "Megatron-LM 提出了一种面向 Transformer 的层内张量并行方案，通过按矩阵列/行和 attention head 切分 MLP、Self-Attention 与词表 embedding，在只插入少量 all-reduce 的情况下训练数十亿参数语言模型。",
      "keyPoints": [
        "将 Transformer 层内部的 GEMM 做 tensor model parallel，而不是只按层做 pipeline parallel。",
        "MLP 中第一层线性按列切分，GeLU 可在每张 GPU 本地独立执行；第二层线性按行切分，输出通过 all-reduce 合并。",
        "Self-Attention 中 Q/K/V 按 attention head 或列维度切分，每张 GPU 计算一部分 head，输出投影再按行切分并 all-reduce。",
        "引入成对通信算子 <span class=\"kb-math kb-math-inline\">f</span> 与 <span class=\"kb-math kb-math-inline\">g</span>：一个 forward 恒等、backward all-reduce；另一个 forward all-reduce、backward 恒等。",
        "每个 Transformer layer 的主要并行区域只需 forward 两次 all-reduce、backward 两次 all-reduce。",
        "输入 embedding 按 vocabulary 维度切分；输出 embedding 与 cross-entropy 融合，避免 all-gather 巨大的 vocabulary logits。",
        "LayerNorm、dropout、residual 等便宜操作在各 GPU 上复制执行，保持 GPU 主要时间花在大 GEMM 上。",
        "论文在 512 张 V100 GPU 上训练 8.3B GPT-2-like 模型，达到 15.1 PFLOPs 和 76% scaling efficiency，并报告 WikiText103、LAMBADA、RACE 上的 SOTA 结果。"
      ],
      "detail": "<p><img alt=\"Megatron-LM MLP tensor parallel 示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1909.08053/assets/mlp_mp_2.png\" />\n<em>图：论文 Figure 3(a)。第一层 MLP 矩阵 <span class=\"kb-math kb-math-inline\">A</span> 按列切分，第二层矩阵 <span class=\"kb-math kb-math-inline\">B</span> 按行切分，GeLU 夹在两次 GEMM 中间但不需要跨卡同步。</em></p>\n<p><img alt=\"Megatron-LM Self-Attention tensor parallel 示意图\" src=\"https://ar5iv.labs.arxiv.org/html/1909.08053/assets/attention_mp_2.png\" />\n<em>图：论文 Figure 3(b)。Q/K/V 与 attention heads 被分配到不同 GPU，本地完成一部分 head 的注意力计算，输出线性层后再合并。</em></p>\n<p>Megatron-LM 的基本判断是：Transformer 的主要计算量集中在大矩阵乘法，而这些矩阵乘法具有天然可切分结构。对 MLP 块，设输入为 <span class=\"kb-math kb-math-inline\">X</span>，第一层权重为 <span class=\"kb-math kb-math-inline\">A</span>，第二层权重为 <span class=\"kb-math kb-math-inline\">B</span>，原始计算为：</p>\n<div class=\"kb-math kb-math-display\">Y = \\mathrm{GeLU}(XA), \\quad Z = YB</div>\n<p>如果把 <span class=\"kb-math kb-math-inline\">A</span> 按列切分为 <span class=\"kb-math kb-math-inline\">[A_1, A_2]</span>，则：</p>\n<div class=\"kb-math kb-math-display\">Y = [Y_1, Y_2] = [\\mathrm{GeLU}(XA_1), \\mathrm{GeLU}(XA_2)]</div>\n<p>GeLU 是逐元素非线性，可以在每个分片上本地执行，不需要先把 <span class=\"kb-math kb-math-inline\">XA_1</span> 与 <span class=\"kb-math kb-math-inline\">XA_2</span> 聚合。这是设计的核心直觉：非线性函数不能跨加法随意交换，因此要选择一种切法，让非线性前不需要同步。随后把 <span class=\"kb-math kb-math-inline\">B</span> 按行切为 <span class=\"kb-math kb-math-inline\">\\begin{bmatrix}B_1 \\\\ B_2\\end{bmatrix}</span>，输出为：</p>\n<div class=\"kb-math kb-math-display\">Z = YB = Y_1B_1 + Y_2B_2</div>\n<p>这个求和通过一次 all-reduce 完成。也就是说，MLP 中两个 GEMM 被“配对切分”：第一个 GEMM column-parallel，第二个 GEMM row-parallel，中间的 GeLU 完全本地化，最后只在必要位置同步。</p>\n<pre><code class=\"language-python\"># Megatron-LM Transformer layer 的张量并行伪代码，world_size 张 GPU 组成一个 model-parallel group\nfor layer in transformer_layers:\n    # Self-Attention: QKV column-parallel，按 head 分片\n    x_norm = layernorm_replicated(x)\n    q_i, k_i, v_i = column_parallel_qkv(x_norm, shard_id=rank)\n    attn_i = scaled_dot_product_attention(q_i, k_i, v_i)   # 每张 GPU 只算自己的 heads\n    attn_out_i = row_parallel_projection(attn_i, shard_id=rank)\n    attn_out = all_reduce_sum(attn_out_i)                  # g: forward all-reduce\n    x = x + dropout_replicated(attn_out)\n\n    # MLP: A column-parallel，B row-parallel\n    x_norm = layernorm_replicated(x)\n    hidden_i = gelu(x_norm @ A_i)                          # 不需要同步即可 GeLU\n    mlp_out_i = hidden_i @ B_i\n    mlp_out = all_reduce_sum(mlp_out_i)                    # g: forward all-reduce\n    x = x + dropout_replicated(mlp_out)\n</code></pre>\n<p>论文中的 <span class=\"kb-math kb-math-inline\">f</span> 与 <span class=\"kb-math kb-math-inline\">g</span> 是实现这个图的关键抽象。<span class=\"kb-math kb-math-inline\">f</span> 在 forward pass 中是 identity，在 backward pass 中对梯度 all-reduce；<span class=\"kb-math kb-math-inline\">g</span> 在 forward pass 中 all-reduce，在 backward pass 中是 identity。二者是共轭的 autograd function，因此可以用少量 PyTorch 自定义 autograd 代码实现，而不用新编译器或重写整个框架。直观上，<span class=\"kb-math kb-math-inline\">f</span> 让各 GPU 在前向拿到同样输入但反向时合并输入梯度；<span class=\"kb-math kb-math-inline\">g</span> 让分片输出在前向相加，反向时每个分片自然接收自己的梯度。</p>\n<p>Self-Attention 的切分利用了 multi-head attention 的结构。多个 attention head 在 softmax 前后基本独立，所以可以把 Q/K/V 的投影矩阵按列切分，使每张 GPU 负责一部分 head：</p>\n<div class=\"kb-math kb-math-display\">Q_i = XW^Q_i, \\quad K_i = XW^K_i, \\quad V_i = XW^V_i</div>\n<p>然后每张 GPU 本地计算 <span class=\"kb-math kb-math-inline\">\\mathrm{softmax}(Q_iK_i^\\top / \\sqrt{d})V_i</span>。只有在 attention 输出投影时，需要像 MLP 第二层那样把行切分的结果求和。这样的好处是把最重的 attention-head 内部计算留在本地，通信只发生在 block 边界，而不是每个中间张量之后都同步。</p>\n<p>Embedding 层也需要特殊处理。语言模型的输出 logits 维度是 vocabulary size，GPT-2 词表约五万量级，直接 all-gather logits 会产生很大的通信。Megatron-LM 把 input embedding 按 vocabulary 维度切分，并对 output embedding GEMM 与 cross-entropy loss 做融合：每张 GPU 只保留自己词表分片上的 logits，计算局部 loss 所需项，再通过较小的标量或向量归约得到全局 loss。这样避免了把 <span class=\"kb-math kb-math-inline\">B \\times S \\times V</span> 的大 logits 张量完整聚合到每张 GPU。</p>\n<p>与 GPipe 的层间流水线不同，Megatron-LM 的 2019 论文重点是层内切分：单个 Transformer layer 的参数、激活和计算被拆到多张 GPU 上。它与 pipeline parallelism 正交，后续大规模训练系统通常会组合 tensor parallel、pipeline parallel 和 data parallel。论文当时强调的工程价值在于“少量侵入式修改”：原有 PyTorch Transformer 只需替换线性层、QKV 投影、embedding 和通信函数，就能扩展到多 GPU model-parallel group。</p>\n<div class=\"warn-box\">⚠️ 注意：张量并行并不是免费扩展。切得越细，每张 GPU 上的 GEMM 越小，通信占比越高；attention head 数也会影响切分粒度。Megatron-LM 的设计目标是让 GPU 仍然 compute-bound，即把 all-reduce 限制在少数必须同步的位置，并尽量复用 Transformer 里最规则的大矩阵乘法。</div>\n<p>论文还指出 BERT-like 模型放大时 layer normalization 的位置会影响训练稳定性。Megatron-LM 使用类似 GPT-2/BERT 常见的 pre-LN 风格，把 LayerNorm 放在 attention 和 MLP 子层输入侧，使更大 BERT 模型随规模增加仍能获得更好的下游结果。这部分不是张量并行本身，但说明大模型扩展同时依赖并行系统和可训练架构细节。</p>",
      "quiz": {
        "q": "Megatron-LM 在 MLP 中为什么把第一层 GEMM 按列切分、第二层 GEMM 按行切分？",
        "options": [
          "为了让 GeLU 在每个分片本地执行，并只在第二层输出处做一次 all-reduce",
          "为了把所有参数复制到每张 GPU，减少显存占用",
          "为了让每个 attention head 共享同一个 Q/K/V 投影",
          "为了完全消除 forward 和 backward 中的通信"
        ],
        "answer": 0,
        "explain": "第一层列切分后 GeLU 可独立作用于每个输出分片；第二层行切分后各分片结果求和，用一次 all-reduce 合并即可。"
      }
    },
    {
      "id": "zero",
      "num": 31,
      "name": "ZeRO",
      "fullName": "ZeRO (ZeRO: Memory Optimizations Toward Training Trillion)",
      "year": "2020",
      "org": "Microsoft",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1910.02054",
      "projectUrl": "",
      "category": "distributed",
      "motivation": "优化器/梯度/参数分片存储",
      "summary": "ZeRO 通过在数据并行进程之间分片优化器状态、梯度和参数，消除传统 Data Parallel 中模型状态的冗余存储，使训练显存随数据并行规模近似线性扩展，同时尽量保持数据并行的计算粒度和通信效率。",
      "keyPoints": [
        "ZeRO-DP 将数据并行中的 model states 从“每卡完整复制”改为“按 rank 分片保存”，覆盖 optimizer states、gradients、parameters 三类最大显存来源",
        "Stage 1 <span class=\"kb-math kb-math-inline\">P_{os}</span>：分片 Adam 等优化器状态，混合精度 Adam 下可达到约 4x model-state 显存降低，通信量与普通 DP 基本一致",
        "Stage 2 <span class=\"kb-math kb-math-inline\">P_{os+g}</span>：继续分片梯度，显存降低约 8x，梯度规约从 all-reduce 组织为 reduce-scatter 语义",
        "Stage 3 <span class=\"kb-math kb-math-inline\">P_{os+g+p}</span>：继续分片参数，需要前向/反向按需 all-gather 参数，model-state 显存随数据并行度 <span class=\"kb-math kb-math-inline\">N_d</span> 近似线性降低",
        "ZeRO-R 处理残余显存：partitioned activation checkpointing、constant-size buffers、memory defragmentation，避免激活、临时通信缓冲和碎片成为新瓶颈",
        "ZeRO 保持数据并行的高计算粒度，可与模型并行组合；论文分析显示 1024 张 GPU 可支撑 1T 参数级模型状态存储"
      ],
      "detail": "<p><img alt=\"ZeRO-DP 三阶段显存对比\" src=\"https://ar5iv.labs.arxiv.org/html/1910.02054/assets/x1.png\" />\n<em>图：ZeRO 论文 Figure 1，对比标准数据并行和 ZeRO-DP 三个阶段的单卡 model-state 显存。</em></p>\n<pre><code class=\"language-python\"># ZeRO-DP 训练步骤伪代码，展示三阶段的核心通信/存储逻辑\ndef zero_train_step(model, batch, rank, world_size, stage):\n    # 每个 rank 始终只拥有自己的优化器状态分片\n    optimizer_state = load_optimizer_state_shard(rank)\n\n    # Stage 3: 参数也只保留本地分片；每层计算前临时收集完整参数\n    for layer in model.layers:\n        if stage &gt;= 3:\n            full_param = all_gather(layer.param_shard)\n        else:\n            full_param = layer.full_param\n\n        activation = layer.forward(batch, full_param)\n\n        if stage &gt;= 3:\n            release_non_owned_param_shards(full_param, rank)\n\n    loss = compute_loss(activation)\n\n    for layer in reversed(model.layers):\n        if stage &gt;= 3:\n            full_param = all_gather(layer.param_shard)\n\n        grad = layer.backward(loss)\n\n        if stage &gt;= 2:\n            grad_shard = reduce_scatter(grad)       # 梯度求和并只留下本 rank 分片\n        else:\n            grad_shard = all_reduce(grad)           # 普通 DP 梯度同步\n\n        if stage &gt;= 3:\n            release_non_owned_param_shards(full_param, rank)\n\n    # Stage 1/2/3: 只更新自己负责的参数/优化器状态分片\n    updated_param_shard = optimizer_step(\n        param_shard=get_param_shard(rank),\n        grad_shard=grad_shard,\n        optimizer_state=optimizer_state,\n    )\n\n    if stage &lt; 3:\n        all_gather_updated_params(updated_param_shard)\n</code></pre>\n<p><strong>动机与背景：大模型训练的显存瓶颈首先来自 model states，而不是参数本身。</strong> 以混合精度 Adam 为例，训练时不仅要保存 FP16 参数和 FP16 梯度，还要保存 FP32 master parameters、momentum、variance 等优化器状态。若模型参数量为 <span class=\"kb-math kb-math-inline\">\\Psi</span>，优化器状态 multiplier 为 <span class=\"kb-math kb-math-inline\">K</span>，标准数据并行每张卡都保存完整状态，model-state 显存近似为：</p>\n<div class=\"kb-math kb-math-display\">M_{\\text{DP}} = 2\\Psi_{\\text{param}} + 2\\Psi_{\\text{grad}} + K\\Psi_{\\text{optim}}</div>\n<p>混合精度 Adam 中 <span class=\"kb-math kb-math-inline\">K=12</span>，因此总量约为 <span class=\"kb-math kb-math-inline\">16\\Psi</span> bytes。普通数据并行增加 GPU 数只增加 batch 并复制这些状态，单卡显存并不会下降；模型并行虽然能切参数，但会破坏算子粒度并引入层内通信。ZeRO 的核心判断是：数据并行已经有最好的编程模型和较大的计算粒度，真正浪费的是每个 rank 上重复保存同一份模型状态。</p>\n<p><strong>ZeRO-DP 的三阶段是累积启用的显存去冗余策略。</strong> Stage 1 <span class=\"kb-math kb-math-inline\">P_{os}</span> 只分片 optimizer states：每个 rank 只维护自己负责的 Adam 状态和参数更新，更新后通过 all-gather 让各 rank 得到一致参数。此时显存从 <span class=\"kb-math kb-math-inline\">(4+K)\\Psi</span> 降到：</p>\n<div class=\"kb-math kb-math-display\">M_{P_{os}} = 4\\Psi + \\frac{K\\Psi}{N_d}</div>\n<p>Stage 2 <span class=\"kb-math kb-math-inline\">P_{os+g}</span> 进一步分片梯度，反向传播结束后不再让每张卡保存完整梯度，而是通过 reduce-scatter 只保留对应分片：</p>\n<div class=\"kb-math kb-math-display\">M_{P_{os+g}} = 2\\Psi + \\frac{(2+K)\\Psi}{N_d}</div>\n<p>Stage 3 <span class=\"kb-math kb-math-inline\">P_{os+g+p}</span> 连参数也分片保存，前向和反向只在某一层需要时临时 all-gather 该层参数，用完立即释放非本地分片，最终 model-state 显存降到：</p>\n<div class=\"kb-math kb-math-display\">M_{P_{os+g+p}} = \\frac{(4+K)\\Psi}{N_d}</div>\n<p><strong>关键机制不是“少算”，而是“只在需要时 materialize”。</strong> 标准 DP 在整个训练 step 中静态持有完整参数、梯度和优化器状态，但 Transformer 层的参数只在该层前向和反向附近被使用。ZeRO-3 把参数视为有生命周期的临时对象：计算前 all-gather，计算后释放；梯度在反向完成后 reduce-scatter；优化器只更新本地分片。这样仍执行和普通训练等价的数学更新，但把常驻显存从“完整模型”改成“本地分片 + 当前层临时完整参数”。</p>\n<p><strong>ZeRO-R 解决 ZeRO-DP 之后暴露出的残余显存问题。</strong> 当 model states 大幅下降后，activation checkpoint、通信临时 buffer 和 CUDA 内存碎片会变得更突出。ZeRO-R 对模型并行中的激活做 partitioned activation checkpointing，避免每个 MP rank 保存重复激活；对 all-reduce 等操作使用固定大小通信 buffer，避免超大临时张量直接占满显存；同时按张量生命周期管理内存，减少“总空闲足够但没有连续块”的碎片化 OOM。</p>\n<p><strong>与传统数据并行和模型并行的区别在于效率取舍。</strong> 普通 DP 通信简单但显存完全冗余；MP/PP 能降低显存但要求模型结构切分，跨节点通信和 pipeline bubble 会降低效率。ZeRO 试图保留 DP 的用户体验和大矩阵计算粒度，只改变状态放置和通信调度。因此它特别适合把单机无法容纳的大模型扩展到多机多卡，同时仍能和 Megatron-LM 这类模型并行技术组合使用。</p>\n<div class=\"key-point\">💡 关键：ZeRO 的“Zero Redundancy”不是压缩模型或改变优化器，而是把每个 rank 上不必要的重复状态移除；训练结果应与对应的数据并行优化过程保持等价。</div>",
      "quiz": {
        "q": "ZeRO Stage 3 相比 Stage 2 额外分片了哪一类 model state？",
        "options": [
          "激活值 activation",
          "模型参数 parameters",
          "训练样本 batch",
          "注意力分数矩阵 attention scores"
        ],
        "answer": 1,
        "explain": "Stage 2 已经分片优化器状态和梯度；Stage 3 进一步分片参数，并在每层计算前按需 all-gather。"
      }
    },
    {
      "id": "fsdp",
      "num": 32,
      "name": "FSDP",
      "fullName": "FSDP (Fully Sharded Data Parallel)",
      "year": "2023",
      "org": "Meta",
      "parent": "zero",
      "paperUrl": "https://arxiv.org/abs/2304.11277",
      "projectUrl": "",
      "category": "distributed",
      "motivation": "PyTorch原生完全分片数据并行",
      "summary": "FSDP 将 ZeRO-3 风格的参数、梯度和优化器状态完全分片做成 PyTorch 原生训练机制，通过按 FSDP unit 临时 all-gather、计算后释放、反向 reduce-scatter，让大模型以接近 DDP 的使用体验在更小单卡显存上训练。",
      "keyPoints": [
        "FSDP 把模型拆成多个 FSDP unit，每个 unit 内参数被展平为 FlatParameter 并均匀切成 rank 分片",
        "前向/反向只 materialize 当前 unit 的完整参数，其余 unit 常驻为 sharded parameter",
        "反向结束时对 FlatParameter gradient 执行 ReduceScatter，使每个 rank 只保存梯度分片，optimizer states 也保持分片",
        "支持 full sharding、hybrid sharding 和 full replication，通过 sharding factor 在显存节省与通信开销之间调节",
        "使用 deferred initialization 在 fake device 上记录初始化，再按 unit 在真实 GPU 上初始化和分片，降低超大模型初始化峰值显存",
        "通信优化包括单独 CUDA stream 上的 AllGather、backward prefetch、forward prefetch、gradient accumulation 选项和 caching allocator rate limiter",
        "PyTorch 实现通过 autograd-visible views 和 hooks 接入原生 autograd，尽量保持用户模型代码和训练语义不变"
      ],
      "detail": "<p><img alt=\"FSDP 算法总览\" src=\"https://ar5iv.labs.arxiv.org/html/2304.11277/assets/x1.png\" />\n<em>图：FSDP 论文 Figure 1，模型被拆成多个 FSDP unit；每个 unit 在前向/反向前收集完整参数，计算后释放非本地分片。</em></p>\n<p><img alt=\"FlatParameter 完全分片\" src=\"https://ar5iv.labs.arxiv.org/html/2304.11277/assets/x4.png\" />\n<em>图：FSDP 论文 Figure 3，原始参数被 flatten/concat/pad 成 FlatParameter，再按 sharding group 均匀切分。</em></p>\n<pre><code class=\"language-python\"># FSDP 单步训练核心逻辑伪代码\ndef fsdp_train_step(fsdp_units, batch, optimizer):\n    x = batch\n\n    # Forward: 每个 unit 只在执行时 all-gather 完整参数\n    for unit in fsdp_units:\n        unit.full_param = all_gather(unit.flat_param_shard)\n        unit.install_param_views(unit.full_param)\n        x = unit.forward(x)\n        unit.free_peer_param_shards()       # 保留本地 shard，释放临时收集的 peer shards\n\n    loss = compute_loss(x)\n\n    # Backward: 按反向顺序重新 materialize 参数并规约梯度\n    grad = loss_grad(loss)\n    for unit in reversed(fsdp_units):\n        unit.full_param = all_gather(unit.flat_param_shard)\n        unit.install_param_views(unit.full_param)\n        grad = unit.backward(grad)\n        unit.free_peer_param_shards()\n        unit.grad_shard = reduce_scatter(unit.flat_param_grad)\n\n    # Optimizer states 始终分片；每个 rank 只更新自己的 FlatParameter shard\n    for unit in fsdp_units:\n        optimizer.step(\n            param_shard=unit.flat_param_shard,\n            grad_shard=unit.grad_shard,\n            optim_state_shard=unit.optim_state_shard,\n        )\n</code></pre>\n<p><strong>动机与背景：FSDP 的目标是把完全分片数据并行变成 PyTorch 的工业级默认能力。</strong> DDP 的问题很直接：每个 rank 都要放完整参数、完整梯度和完整优化器状态，模型稍大就会触发 OOM。ZeRO-3 证明了完全分片可行，但在框架层面要处理初始化、autograd、通信调度、CUDA allocator、动态图等大量工程细节。FSDP 论文的贡献不是提出新的优化目标，而是把“完全分片 + 按需 materialization”系统性集成进 PyTorch。</p>\n<p><strong>FSDP unit 是显存峰值和通信效率的核心粒度。</strong> 模型被包装成多个 FSDP unit，每个 unit 的参数被拼接成一个 FlatParameter。设模型总元素数为 <span class=\"kb-math kb-math-inline\">\\Psi</span>，第 <span class=\"kb-math kb-math-inline\">i</span> 个 FlatParameter 大小为 <span class=\"kb-math kb-math-inline\">\\psi_i</span>，sharding factor 为 <span class=\"kb-math kb-math-inline\">F</span>，则参数相关峰值近似包含两部分：</p>\n<div class=\"kb-math kb-math-display\">O\\left(\\sum_i \\frac{\\psi_i}{F} + \\max_i \\psi_i\\right)</div>\n<p>第一项是所有 unit 的常驻本地分片，第二项是当前被 all-gather 出来的最大完整 unit。unit 划得越细，峰值显存越低，但 collective 次数更多；unit 划得越粗，通信更高效但需要更大瞬时显存。因此 FSDP 的 auto-wrap/manual-wrap 本质上是在调这个 memory-throughput trade-off。</p>\n<p><strong>FlatParameter 让通信更接近 NCCL 的高效路径。</strong> 原始模型参数形状不一，直接对每个小 tensor all-gather/reduce-scatter 会产生大量小 collective 和不均匀输入。FSDP 将一个 unit 内参数 flatten、concat，并 padding 到可被 sharding factor 整除，随后每个 rank 持有等长 chunk。这样 unsharded FlatParameter 和 sharded FlatParameter 的布局天然匹配 AllGather 和 ReduceScatter，减少额外 copy，也避免小消息通信启动开销过高。</p>\n<p><strong>训练流程与普通本地训练等价，但参数生命周期不同。</strong> 前向进入某个 unit 前，FSDP all-gather 完整 FlatParameter，并把原始参数设置为其 view；计算完成后释放 peer shards，只留下本地分片。反向到达该 unit 前再次 all-gather，autograd 写入完整 FlatParameter gradient，unit 结束后用 ReduceScatter 求和并切回梯度分片。优化器只看本地 param/grad/state shard，因此 optimizer states 不需要完整 materialize。</p>\n<p><strong>通信重叠和 prefetch 是 FSDP 能接近 DDP 性能的关键。</strong> FSDP 的 full sharding 会引入比 DDP 更多的 AllGather/ReduceScatter，论文指出 ring 算法下 full sharding 通信量可达到 DDP 的约 1.5x。为了减少暴露在 critical path 上的时间，FSDP 在单独 CUDA stream 上发 AllGather，避免 default stream 的伪依赖；backward prefetch 根据记录到的 forward order 预测反向顺序，在当前 ReduceScatter 前提前发起下一个 AllGather；forward prefetch 则面向静态图和较慢 CPU 调度场景，提前填充 NCCL stream。</p>\n<p><strong>FSDP 的工程难点还包括初始化和内存分配器行为。</strong> 超大模型不能先在一张 GPU 上完整初始化再分片，因此 FSDP 支持 deferred initialization：在 fake device 上创建参数并记录初始化操作，包装后逐个 unit 在真实 GPU 上 materialize、replay 初始化、再分片。另一方面，AllGather 目标 tensor 常在 producer stream 分配，计算在 consumer stream 使用；CPU 若跑得过快，PyTorch caching allocator 可能无法复用已有 block，引发 cudaMalloc retry。FSDP 的 rate limiter 限制最多两个 inflight AllGather，在保持重叠的同时降低分配器峰值压力。</p>\n<div class=\"key-point\">💡 关键：FSDP 的“fully sharded”不是把计算也切碎，而是让每个 rank 在计算当前 unit 时临时拥有完整参数；这保留了本地算子语义，也把常驻显存压到分片级别。</div>",
      "quiz": {
        "q": "FSDP 中 FlatParameter 的主要作用是什么？",
        "options": [
          "把多个参数展平拼接后均匀分片，提升 AllGather/ReduceScatter 的通信效率",
          "把模型层改写成流水线并行 stage",
          "把激活值压缩成低精度格式",
          "替代 autograd 计算梯度"
        ],
        "answer": 0,
        "explain": "FlatParameter 统一参数布局并保证分片大小均匀，使 FSDP 可以用高效 collective 通信，同时减少小 tensor 通信开销。"
      }
    },
    {
      "id": "distflashattn",
      "num": 33,
      "name": "DISTFLASHATTN",
      "fullName": "DISTFLASHATTN (Distributed Memory-efficient Attention)",
      "year": "2026",
      "org": "学术界",
      "parent": "flash_attention_2",
      "paperUrl": "https://arxiv.org/abs/2310.03294",
      "projectUrl": "",
      "category": "distributed",
      "motivation": "Token级负载均衡百万上下文",
      "summary": "DISTFLASHATTN 将 FlashAttention 扩展到序列维度分布式训练，通过 token/worker 级负载均衡、KV 通信与计算重叠、以及 rematerialization-aware checkpointing，在保持精确注意力的同时支持 32K 到 512K 级长上下文训练。",
      "keyPoints": [
        "沿 sequence dimension 把一个长序列的 tokens 均匀切到 <span class=\"kb-math kb-math-inline\">P</span> 个 worker，每个 worker 只保存 <span class=\"kb-math kb-math-inline\">N/P</span> 个 query/key/value 激活",
        "继承 FlashAttention 的 IO-aware blockwise 计算方式，每次只流式拉取一个远端 <span class=\"kb-math kb-math-inline\">K,V</span> chunk，而不是本地 materialize 全部 <span class=\"kb-math kb-math-inline\">K,V</span>",
        "针对 causal attention 的天然三角工作量不均衡，使用 helper worker 计算后段 worker 的部分 attention block，并回传 partial output 与 softmax statistics",
        "使用独立通信 stream 预取远端 key/value，使 P2P 通信与当前 attention block 计算重叠",
        "将 checkpoint 边界移动到 FlashAttention 输出处，避免 HuggingFace 式 layer-level checkpointing 触发额外一次 FlashAttention forward recomputation",
        "通信分析中 DISTFLASHATTN 每轮约 <span class=\"kb-math kb-math-inline\">3Nd</span> 通信量，Megatron-LM 在 checkpointing 下约 <span class=\"kb-math kb-math-inline\">14Nd</span>，理论通信量降低约 4.7x",
        "与 FSDP 正交：DISTFLASHATTN 降低长序列 activation/attention 显存，FSDP 分片模型权重、梯度和优化器状态"
      ],
      "detail": "<p><img alt=\"DISTFLASHATTN 序列并行与负载均衡\" src=\"https://ar5iv.labs.arxiv.org/html/2310.03294/assets/x1.png\" />\n<em>图：论文 Figure 1，左侧为序列维度切分，右侧展示 causal attention 负载均衡前后的 bubble。</em></p>\n<p><img alt=\"DISTFLASHATTN 通信计算重叠\" src=\"https://ar5iv.labs.arxiv.org/html/2310.03294/assets/x2.png\" />\n<em>图：论文 Figure 2，worker 7 在计算当前 attention block 时用通信 stream 预取下一块远端 KV。</em></p>\n<p><img alt=\"Rematerialization-aware checkpointing\" src=\"https://ar5iv.labs.arxiv.org/html/2310.03294/assets/x4.png\" />\n<em>图：论文 checkpointing 对比，将 checkpoint 放在 FlashAttention 输出处，避免重复执行 attention forward。</em></p>\n<pre><code class=\"language-python\"># Balanced DISTFLASHATTN forward 伪代码，简化自论文 Algorithm 1/2\ndef distflashattn_worker(p, Q_p, K_p, V_p, world_size):\n    O_p = zeros_like(Q_p)\n    stats_p = init_softmax_stats(Q_p)  # m, l 等在线 softmax 统计量\n\n    # 先计算本地 token chunk 的注意力\n    O_p, stats_p = flash_attn_block(Q_p, K_p, V_p, O_p, stats_p)\n\n    # causal attention 中只需要访问当前 worker 及更早 worker 的 KV\n    for t in range(1, world_size // 2 + 1):\n        remote = (p - t) % world_size\n\n        if p &gt; t:\n            # owner worker: 预取远端 KV，并与当前计算重叠\n            K_r, V_r = async_recv_kv(remote)\n            wait_until_ready(K_r, V_r)\n            O_p, stats_p = flash_attn_block(Q_p, K_r, V_r, O_p, stats_p)\n\n            # 如果有 helper 替自己算了部分 block，合并 partial output 和 softmax stats\n            if has_helper_result(p, t):\n                O_h, stats_h = recv_partial_result(helper_rank(p, t))\n                O_p, stats_p = rescale_and_merge(O_p, stats_p, O_h, stats_h)\n        else:\n            # helper worker: 利用空闲时间替后段 worker 计算一块 attention\n            owner = owner_rank_for_helper(p, t)\n            Q_owner = recv_query(owner)\n            O_part, stats_part = flash_attn_block(Q_owner, K_p, V_p, zeros(), init_stats())\n            send_partial_result(owner, O_part, stats_part)\n\n    return O_p, stats_p\n</code></pre>\n<p><strong>动机与背景：长上下文训练同时卡在 attention 激活和并行维度上。</strong> 单卡 FlashAttention 已经把 attention 的峰值显存从显式 <span class=\"kb-math kb-math-inline\">N^2</span> softmax 矩阵降到线性级别，但当 <span class=\"kb-math kb-math-inline\">N</span> 到 128K、512K 时，单卡仍无法容纳完整序列激活。Megatron-LM 这类张量并行通常按 attention heads 切分，但并行度受 head 数限制；GQA/MQA 或少头模型尤其难继续扩展。DISTFLASHATTN 改为沿 token 序列切分，最大并行度随上下文长度增长，更适合长上下文。</p>\n<p><strong>核心 attention 公式保持精确，只改变 KV 的放置和流式访问。</strong> 第 <span class=\"kb-math kb-math-inline\">p</span> 个 worker 持有 <span class=\"kb-math kb-math-inline\">Q_p,K_p,V_p \\in \\mathbb{R}^{N/P \\times d}</span>。在 causal attention 下，它需要计算：</p>\n<div class=\"kb-math kb-math-display\">O_p =\n\\operatorname{Softmax}\\left(\\frac{Q_p [K_1,\\ldots,K_p]^T}{\\sqrt{d}}\\right)\n[V_1,\\ldots,V_p]</div>\n<p>朴素做法会把所有历史 <span class=\"kb-math kb-math-inline\">K,V</span> 都 gather 到本地，重新制造巨大的显存压力。DISTFLASHATTN 利用 FlashAttention 的 blockwise 特性，每次只拉取一个远端 <span class=\"kb-math kb-math-inline\">K_r,V_r</span> chunk，执行一次局部 attention，并维护在线 softmax 的 <span class=\"kb-math kb-math-inline\">m,l</span> statistics 来正确合并不同 block 的 partial output。这样每个 worker 常驻的远端 KV 只是一块，而不是整条序列。</p>\n<p><strong>负载均衡来自 causal mask 的三角结构。</strong> 在序列切分后，越靠后的 worker 需要 attend 的历史 chunk 越多；第一个 worker 很快完成本地块后空闲，最后一个 worker 最忙。未均衡时 idle fraction 近似趋近 <span class=\"kb-math kb-math-inline\">1/2</span>。论文让早完成的 worker 作为 helper，为后段 worker 计算部分 attention block，并把 partial output 与 softmax statistics 回传给 owner。owner 用 <code>rescale</code> 合并结果，保持与自己顺序执行所有 block 相同的数值语义。</p>\n<p><strong>通信计算重叠把远端 KV 传输隐藏在 FlashAttention kernel 后面。</strong> 每个 worker 在计算当前 <span class=\"kb-math kb-math-inline\">Q_p,K_r,V_r</span> block 时，可以在另一个 CUDA/NCCL stream 上预取下一块 <span class=\"kb-math kb-math-inline\">K,V</span>。由于 FlashAttention block 的计算量随 <span class=\"kb-math kb-math-inline\">N/P</span> 和 <span class=\"kb-math kb-math-inline\">d</span> 增长，长序列下有足够计算时间覆盖 P2P 传输。这个设计不是减少通信字节本身，而是减少通信暴露在 critical path 上的时间。</p>\n<p><strong>Rematerialization-aware checkpointing 解决了 FlashAttention 与传统 checkpoint 的冲突。</strong> 常见 layer-level checkpointing 在反向时会重算整个 Transformer layer，其中包括 FlashAttention forward；而 FlashAttention backward 内部本来就会为了省显存重算 softmax block。若仍按层边界 checkpoint，就会多做一次 attention forward。DISTFLASHATTN 将 checkpoint 边界移动到 FlashAttention 输出：后续 FFN 需要重算时使用该输出，FlashAttention backward 也直接使用它，从而每层少一次 attention forward recomputation，且不改变数值结果。</p>\n<p><strong>与 Megatron-LM、Ring Attention 和 FSDP 的关系。</strong> Megatron-LM 的 sequence/tensor 并行在长上下文下会产生多次 all-gather/reduce-scatter，且受 head 数约束；Ring Attention/Ring Self-Attention 也沿序列传播 KV，但论文指出其对 causal workload 和 FlashAttention 兼容性优化不足。DISTFLASHATTN 关注 activation 和 attention 的长序列瓶颈；FSDP 关注模型状态分片。因此两者可组合：FSDP 让权重/优化器状态不爆显存，DISTFLASHATTN 让百万级上下文的 attention 激活不爆显存。</p>\n<div class=\"key-point\">💡 关键：DISTFLASHATTN 不是近似稀疏注意力；它仍计算精确 causal attention，只是把序列分布到多个 worker，并用 FlashAttention 的在线 softmax 统计量合并跨 worker block。</div>",
      "quiz": {
        "q": "DISTFLASHATTN 为什么需要 token/worker 级负载均衡？",
        "options": [
          "因为 causal attention 中后段 token 需要看更多历史 token，后段 worker 工作量更大",
          "因为每个 worker 的模型参数数量不同",
          "因为 FlashAttention 只能在 CPU 上执行",
          "因为训练数据需要按类别重新采样"
        ],
        "answer": 0,
        "explain": "序列维度切分后，causal mask 形成三角计算量；越靠后的 worker attend 的历史 KV 越多，因此需要 helper worker 减少空闲 bubble。"
      }
    }
  ],
  "categories": {
    "scaling": {
      "label": "规模法则",
      "color": "#22a06b"
    },
    "data": {
      "label": "数据工程",
      "color": "#5b63d3"
    },
    "training": {
      "label": "训练优化",
      "color": "#e97f33"
    },
    "distributed": {
      "label": "分布式系统",
      "color": "#8b5cf6"
    }
  },
  "projectUrls": {}
};
