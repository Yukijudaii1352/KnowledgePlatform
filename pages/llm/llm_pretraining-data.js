/**
 * llm_pretraining-data.js — 由 pipeline/build.py 于 2026-06-15 17:41:33 自动生成。
 * 源文件：content/llm/llm_pretraining.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "llm",
    "topic_id": "llm_pretraining",
    "topic_name": "LLM预训练",
    "page_title": "LLM预训练算法总结",
    "page_subtitle": "2026-06-15 版",
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
      "summary": "OpenAI Scaling Laws 的核心目标是：幂律公式揭示模型性能与N/D/C关系。",
      "keyPoints": [
        "核心动机：幂律公式揭示模型性能与N/D/C关系",
        "代表机构：OpenAI"
      ],
      "detail": "<p>幂律公式揭示模型性能与N/D/C关系</p>"
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
      "summary": "Chinchilla Laws 的核心目标是：提出20:1数据参数比的计算最优原则。",
      "keyPoints": [
        "核心动机：提出20:1数据参数比的计算最优原则",
        "演化来源：继承或改进自 kaplan_scaling",
        "代表机构：DeepMind"
      ],
      "detail": "<p>提出20:1数据参数比的计算最优原则</p>"
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
      "summary": "数据受限规模定律 的核心目标是：揭示数据重复训练的衰减幂律。",
      "keyPoints": [
        "核心动机：揭示数据重复训练的衰减幂律",
        "演化来源：继承或改进自 chinchilla_law",
        "代表机构：HuggingFace"
      ],
      "detail": "<p>揭示数据重复训练的衰减幂律</p>"
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
      "summary": "T²缩放定律 的核心目标是：推理最优的过度训练策略。",
      "keyPoints": [
        "核心动机：推理最优的过度训练策略",
        "演化来源：继承或改进自 chinchilla_law",
        "代表机构：多机构"
      ],
      "detail": "<p>推理最优的过度训练策略</p>"
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
      "summary": "RL Scaling Laws 的核心目标是：强化学习阶段能力-计算量预测。",
      "keyPoints": [
        "核心动机：强化学习阶段能力-计算量预测",
        "演化来源：继承或改进自 kaplan_scaling",
        "代表机构：多机构"
      ],
      "detail": "<p>强化学习阶段能力-计算量预测</p>"
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
      "summary": "C4 的核心目标是：T5基石数据集启发式规则清洗。",
      "keyPoints": [
        "核心动机：T5基石数据集启发式规则清洗",
        "代表机构：Google"
      ],
      "detail": "<p>T5基石数据集启发式规则清洗</p>"
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
      "summary": "The Pile 的核心目标是：825GB多源数据集强调多样性。",
      "keyPoints": [
        "核心动机：825GB多源数据集强调多样性",
        "演化来源：继承或改进自 c4",
        "代表机构：EleutherAI"
      ],
      "detail": "<p>825GB多源数据集强调多样性</p>"
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
      "summary": "MinHash LSH 的核心目标是：局部敏感哈希实现文档级去重。",
      "keyPoints": [
        "核心动机：局部敏感哈希实现文档级去重",
        "代表机构：学术界"
      ],
      "detail": "<p>局部敏感哈希实现文档级去重</p>"
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
      "summary": "Suffix Array去重 的核心目标是：后缀数组子串去重防重复生成。",
      "keyPoints": [
        "核心动机：后缀数组子串去重防重复生成",
        "演化来源：继承或改进自 minhash_dedup",
        "代表机构：Google"
      ],
      "detail": "<p>后缀数组子串去重防重复生成</p>"
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
      "summary": "RefinedWeb 的核心目标是：5T纯网页数据MDR方法论。",
      "keyPoints": [
        "核心动机：5T纯网页数据MDR方法论",
        "演化来源：继承或改进自 c4",
        "代表机构：TII"
      ],
      "detail": "<p>5T纯网页数据MDR方法论</p>"
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
      "summary": "DoReMi 的核心目标是：极小极大优化自动确定数据配比。",
      "keyPoints": [
        "核心动机：极小极大优化自动确定数据配比",
        "代表机构：Stanford"
      ],
      "detail": "<p>极小极大优化自动确定数据配比</p>"
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
      "summary": "FineWeb 的核心目标是：15T最高质量开源网页语料。",
      "keyPoints": [
        "核心动机：15T最高质量开源网页语料",
        "演化来源：继承或改进自 refinedweb",
        "代表机构：HuggingFace"
      ],
      "detail": "<p>15T最高质量开源网页语料</p>"
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
      "summary": "Common Corpus 的核心目标是：2T完全合规多语言数据集。",
      "keyPoints": [
        "核心动机：2T完全合规多语言数据集",
        "演化来源：继承或改进自 dolma",
        "代表机构：ICLR社区"
      ],
      "detail": "<p>2T完全合规多语言数据集</p>"
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
      "summary": "Essential-Web 的核心目标是：24T带12类文档分类标签。",
      "keyPoints": [
        "核心动机：24T带12类文档分类标签",
        "演化来源：继承或改进自 fineweb",
        "代表机构：学术界"
      ],
      "detail": "<p><img alt=\"Essential-Web 五阶段方法图\" src=\"https://ar5iv.labs.arxiv.org/html/2506.14111/assets/x2.png\" />\n<em>图：Essential-Web v1.0 论文 Figure 2，展示 taxonomy 设计、合成标注、蒸馏分类器、全量推理和下游过滤验证的流程。Manifest 中 paper_url 指向了不相关论文，正文方法依据公开论文 arXiv:2506.14111 与数据集卡补足。</em></p>\n<p>```python</p>"
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
      "summary": "FED框架 的核心目标是：GPU加速MinHash快107倍。",
      "keyPoints": [
        "核心动机：GPU加速MinHash快107倍",
        "演化来源：继承或改进自 minhash_dedup",
        "代表机构：学术界"
      ],
      "detail": "<p><img alt=\"SEDD GPU 去重框架总览\" src=\"https://ar5iv.labs.arxiv.org/html/2501.01046/assets/x3.png\" />\n<em>图：SEDD 论文 Figure 3，展示多 GPU 文档加载、MinHash 生成、按 band 分配 bucket、GPU 候选验证和流式通信。Manifest 中 paper_url 指向不相关论文，正文依据公开论文 arXiv:2501.01046 补足。</em></p>\n<p>```python</p>"
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
      "summary": "LSHBloom 的核心目标是：Bloom Filter节省18倍空间。",
      "keyPoints": [
        "核心动机：Bloom Filter节省18倍空间",
        "演化来源：继承或改进自 fed_dedup",
        "代表机构：学术界"
      ],
      "detail": "<p><img alt=\"LSHBloom 与 MinHashLSH 时间分解\" src=\"https://ar5iv.labs.arxiv.org/html/2411.04257/assets/x1.png\" />\n<em>图：LSHBloom 论文 Figure 1，对比传统 MinHashLSH 与 LSHBloom 在 peS2o 子集上的 wall-clock time breakdown。Manifest 中 paper_url 指向不相关论文，正文依据 arXiv:2411.04257 补足。</em></p>\n<p>```python</p>"
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
      "summary": "Data Mixing Agent 的核心目标是：强化学习动态数据加权。",
      "keyPoints": [
        "核心动机：强化学习动态数据加权",
        "演化来源：继承或改进自 doremi",
        "代表机构：学术界"
      ],
      "detail": "<p><img alt=\"Data Mixing Agent 总览\" src=\"https://ar5iv.labs.arxiv.org/html/2507.15640/assets/x2.png\" />\n<em>图：Data Mixing Agent 论文 Figure 2，展示轨迹采样、proxy model 环境反馈、CQL 训练 agent，以及目标模型持续预训练时在线预测混合比例的流程。Manifest 的 paper_url 是 data mixing survey，正文用具体方法论文补足。</em></p>\n<p>```python</p>"
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
      "summary": "混合精度训练 的核心目标是：FP16计算FP32存储Loss Scaling。",
      "keyPoints": [
        "核心动机：FP16计算FP32存储Loss Scaling",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>FP16计算FP32存储Loss Scaling</p>"
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
      "summary": "FlashAttention 的核心目标是：IO感知算法SRAM内完成Attention。",
      "keyPoints": [
        "核心动机：IO感知算法SRAM内完成Attention",
        "代表机构：Stanford"
      ],
      "detail": "<p>IO感知算法SRAM内完成Attention</p>"
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
      "summary": "FlashAttention-2 的核心目标是：优化并行度提升2倍速度。",
      "keyPoints": [
        "核心动机：优化并行度提升2倍速度",
        "演化来源：继承或改进自 flash_attention",
        "代表机构：Stanford"
      ],
      "detail": "<p>优化并行度提升2倍速度</p>"
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
      "summary": "WeSaR 的核心目标是：可学习门控抑制梯度爆炸。",
      "keyPoints": [
        "核心动机：可学习门控抑制梯度爆炸",
        "代表机构：学术界"
      ],
      "detail": "<p><img alt=\"WeSaR loss spike 与 update ratio\" src=\"https://ar5iv.labs.arxiv.org/html/2410.05052/assets/x1.png\" />\n<em>图：WeSaR 论文 Figure 1，展示 13B Transformer 训练中 loss spike 与特定矩阵 update ratio 的关系，以及 WeSaR 对 update ratio 的稳定作用。Manifest 中 paper_url 指向不相关论文，正文依据 arXiv:2410.05052 补足。</em></p>\n<p>```python</p>"
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
      "summary": "FlashAttention-4 的核心目标是：Blackwell架构71%硬件利用率。",
      "keyPoints": [
        "核心动机：Blackwell架构71%硬件利用率",
        "演化来源：继承或改进自 flash_attention_2",
        "代表机构：Together AI"
      ],
      "detail": "<p><img alt=\"FlashAttention-4 前向流水线\" src=\"https://tridao.me/assets/img/2026-03-05-flash4/fa4_fwd_pipeline.png\" />\n<em>图：Tri Dao 官方博客中的 FlashAttention-4 forward pipeline，展示 ping-pong Q tiles、softmax warpgroups 和 correction stage。Manifest 的 blog 路径已失效，正文使用官方正确路径 /blog/2026/flash4/ 与 arXiv:2603.05451 补足。</em></p>\n<p>```python</p>"
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
      "summary": "SNIP/Quartet 的核心目标是：原生FP4训练层级动态量化。",
      "keyPoints": [
        "核心动机：原生FP4训练层级动态量化",
        "演化来源：继承或改进自 mixed_precision",
        "代表机构：NeurIPS"
      ],
      "detail": "<p><img alt=\"SNIP 系统总览\" src=\"https://ar5iv.labs.arxiv.org/html/2602.01410/assets/x2.png\" />\n<em>图：SNIP 论文 Figure 2，展示周期性统计收集、层级量化影响评估和 FP4/FP8 配置更新。</em></p>\n<p><img alt=\"Quartet 低精度训练分析\" src=\"https://ar5iv.labs.arxiv.org/html/2505.14669/assets/x1.png\" />\n<em>图：Quartet 论文 Figure 1，展示低精度训练设置下的 scaling-law/accuracy-compute 分析。Manifest 中 paper_url 不匹配，正文使用 SNIP 与 Quartet 的公开论文补足。</em></p>\n<p>```python</p>"
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
      "summary": "LongRoPE2 的核心目标是：进化搜索扩展至200万上下文。",
      "keyPoints": [
        "核心动机：进化搜索扩展至200万上下文",
        "代表机构：Microsoft"
      ],
      "detail": "<p><img alt=\"LongRoPE2 mixed context window training\" src=\"https://ar5iv.labs.arxiv.org/html/2502.20082/assets/x5.png\" />\n<em>图：LongRoPE2 论文 Figure 5，展示短上下文使用原始 RoPE、长上下文使用 rescaled RoPE 的 mixed context window training。Manifest 中 paper_url 指向不相关论文，正文依据 arXiv:2502.20082 补足。</em></p>\n<p>```python</p>"
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
      "summary": "GPipe 的核心目标是：流水线并行微批次切分。",
      "keyPoints": [
        "核心动机：流水线并行微批次切分",
        "代表机构：Google"
      ],
      "detail": "<p>流水线并行微批次切分</p>"
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
      "summary": "Megatron-LM 的核心目标是：张量并行Transformer层内切分。",
      "keyPoints": [
        "核心动机：张量并行Transformer层内切分",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>张量并行Transformer层内切分</p>"
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
      "summary": "ZeRO 的核心目标是：优化器/梯度/参数分片存储。",
      "keyPoints": [
        "核心动机：优化器/梯度/参数分片存储",
        "代表机构：Microsoft"
      ],
      "detail": "<p>优化器/梯度/参数分片存储</p>"
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
      "summary": "FSDP 的核心目标是：PyTorch原生完全分片数据并行。",
      "keyPoints": [
        "核心动机：PyTorch原生完全分片数据并行",
        "演化来源：继承或改进自 zero",
        "代表机构：Meta"
      ],
      "detail": "<p><img alt=\"FSDP 算法总览\" src=\"https://ar5iv.labs.arxiv.org/html/2304.11277/assets/x1.png\" />\n<em>图：FSDP 论文 Figure 1，模型被拆成多个 FSDP unit；每个 unit 在前向/反向前收集完整参数，计算后释放非本地分片。</em></p>\n<p><img alt=\"FlatParameter 完全分片\" src=\"https://ar5iv.labs.arxiv.org/html/2304.11277/assets/x4.png\" />\n<em>图：FSDP 论文 Figure 3，原始参数被 flatten/concat/pad 成 FlatParameter，再按 sharding group 均匀切分。</em></p>\n<p>```python</p>"
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
      "summary": "DISTFLASHATTN 的核心目标是：Token级负载均衡百万上下文。",
      "keyPoints": [
        "核心动机：Token级负载均衡百万上下文",
        "演化来源：继承或改进自 flash_attention_2",
        "代表机构：学术界"
      ],
      "detail": "<p><img alt=\"DISTFLASHATTN 序列并行与负载均衡\" src=\"https://ar5iv.labs.arxiv.org/html/2310.03294/assets/x1.png\" />\n<em>图：论文 Figure 1，左侧为序列维度切分，右侧展示 causal attention 负载均衡前后的 bubble。</em></p>\n<p><img alt=\"DISTFLASHATTN 通信计算重叠\" src=\"https://ar5iv.labs.arxiv.org/html/2310.03294/assets/x2.png\" />\n<em>图：论文 Figure 2，worker 7 在计算当前 attention block 时用通信 stream 预取下一块远端 KV。</em></p>\n<p><img alt=\"Rematerialization-aware checkpointing\" src=\"https://ar5iv.labs.arxiv.org/html/2310.03294/assets/x4.png\" />\n<em>图：论文 checkpointing 对比，将 checkpoint 放在 FlashAttention 输出处，避免重复执行 attention forward。</em></p>\n<p>```python</p>"
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
