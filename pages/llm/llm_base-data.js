/**
 * llm_base-data.js — 由 pipeline/build.py 于 2026-06-16 17:00:16 自动生成。
 * 源文件：content/llm/llm_base.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "llm",
    "topic_id": "llm_base",
    "topic_name": "语言基础模型",
    "page_title": "语言基础模型技术演进",
    "page_subtitle": "2026-06-16 版",
    "page_desc": "系统梳理 Transformer、GPT/BERT/T5、GPT/LLaMA/Qwen 等基础模型家族，以及 MoE、长上下文、混合注意力和 2026 年以来前沿语言模型的演化脉络。",
    "page_icon": "🧱",
    "hero_pills": [
      "🏷️ Transformer · GPT/LLaMA · MoE · Long Context",
      "📌 Dense Scaling · Open Foundation · Frontier Systems"
    ],
    "count_pill": "{count} 个算法",
    "image_base": "",
    "overview_from_doc": true,
    "latest_overview_from_doc": true
  },
  "overview": [
    {
      "title": "",
      "body_html": "<h1>关于大语言模型的最新综述</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（通过 Jina Reader 公开抓取）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/701086272\">https://zhuanlan.zhihu.com/p/701086272</a></li>\n<li>作者: -</li>\n</ul>\n<hr />\n<p>Title: 关于大语言模型的最新综述</p>\n<p>URL Source: https://zhuanlan.zhihu.com/p/701086272</p>\n<p>Markdown Content:\n24年2月来自Snap等公司的论文“Large Language Models: A Survey”。</p>\n<p>自 2022 年 11 月 Chat<a href=\"https://zhida.zhihu.com/search?content_id=243927332&amp;content_type=Article&amp;match_order=1&amp;q=GPT&amp;zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODE2NjU2ODQsInEiOiJHUFQiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDM5MjczMzIsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.kzFNDd7kk55Ez7kT9CkNyvR38mlHBnpSIx2u1VH2X8c&amp;zhida_source=entity\">GPT</a> 发布以来，大语言模型 (<a href=\"https://zhida.zhihu.com/search?content_id=243927332&amp;content_type=Article&amp;match_order=1&amp;q=LLM&amp;zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODE2NjU2ODQsInEiOiJMTE0iLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDM5MjczMzIsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.oZZjcfieMm1y4e6BIZqzx8g_LVDpC-DddQ0BdBn2sVI&amp;zhida_source=entity\">LLM</a>) 因其在各种自然语言任务中的出色表现而备受关注。正如规模化定律所预测的那样，LLM 的通用语言理解和生成能力是通过在大量文本数据上训练数十亿个模型参数获得的 [1]，[2]。LLM 的研究领域虽然刚刚出现，但正在以多种不同的方式迅速发展。综述回顾了一些最著名的 LLM，包括三个流行的 LLM 系列 (GPT、LLaMA、<a href=\"https://zhida.zhihu.com/search?content_id=243927332&amp;content_type=Article&amp;match_order=1&amp;q=PaLM&amp;zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODE2NjU2ODQsInEiOiJQYUxNIiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MjQzOTI3MzMyLCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.sBMEzmGSzG7zoQsc2huEAkLmkCSz6HBRki2HYbq27gE&amp;zhida_source=entity\">PaLM</a>)，并讨论了它们的特点、贡献和局限性。概述了为构建和增强 LLM 而开发的技术。还有为 LLM 训练、微调和评估准备的流行数据集，以及广泛使用的 LLM 评估指标，并在一组代表性基准上比较几种流行 LLM 的性能。最后，开放的挑战和未来的研究方向。</p>\n<hr />\n<p>如图所示，LLM的<strong>涌现能力</strong>包括：(1) 上下文学习，即 LLM 在推理时从提示中呈现的一小组示例中学习新任务；(2) 指令遵循，即 LLM 在进行指令调优后，无需使用明确示例即可遵循新类型任务的指令；以及 (3) 规划：多步骤推理，即 LLM 可以通过将复杂任务分解为中间推理步骤来解决该问题，如<strong>思维链（COT）</strong>提示中所示 [34]。LLM 还可以通过使用外部知识和工具 [35]、[36] 进行增强，从而有效地与用户和环境 [37] 交互，并使用通过交互收集的反馈数据不断改进自身，例如通过<strong>人工反馈的强化学习 (<a href=\"https://zhida.zhihu.com/search?content_id=243927332&amp;content_type=Article&amp;match_order=1&amp;q=RLHF&amp;zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODE2NjU2ODQsInEiOiJSTEhGIiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MjQzOTI3MzMyLCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.O4AGlb0fcRcDQvU2xJL8FNPrI-uEHkJO_2LZ912Ca-c&amp;zhida_source=entity\">RLHF</a>)</strong>。</p>\n<p><img alt=\"Image 1\" src=\"https://pic3.zhimg.com/v2-4d18310414a0edb895809a9b1947c856_1440w.jpg\" /></p>\n<p>以下图是本文的组织图：</p>\n<p><img alt=\"Image 2\" src=\"https://pic4.zhimg.com/v2-03cb7e87e1839a3a6183a03786f7e7b9_1440w.jpg\" /></p>\n<p>早期预训练神经语言模型（PLM）是 LLM 的基础，这里主要提到三个 LLM 系列：GPT、LlaMA 和 PaLM。如表概述了其中一些模型及其特征。</p>\n<p><img alt=\"Image 3\" src=\"https://pic3.zhimg.com/v2-8c9e8fce61dc8b271ba15252512c28d0_1440w.jpg\" /></p>\n<p>基于 <a href=\"https://zhida.zhihu.com/search?content_id=243927332&amp;content_type=Article&amp;match_order=1&amp;q=Transformer&amp;zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODE2NjU2ODQsInEiOiJUcmFuc2Zvcm1lciIsInpoaWRhX3NvdXJjZSI6ImVudGl0eSIsImNvbnRlbnRfaWQiOjI0MzkyNzMzMiwiY29udGVudF90eXBlIjoiQXJ0aWNsZSIsIm1hdGNoX29yZGVyIjoxLCJ6ZF90b2tlbiI6bnVsbH0.TAT9laxe8c6-DHmZIHJLPWplskoM7gn2ffKIyil-crM&amp;zhida_source=entity\">Transformer</a> 的 PLM，根据其神经架构，分为三大类：仅编码器（BERT）、仅解码器（GPT）和编码器-解码器（T5）模型。</p>\n<p>大语言模型 (LLM) 主要指基于 Transformer 的 PLM，包含数百亿到数千亿个参数。与上面回顾的 PLM 相比，LLM 不仅模型规模大得多，而且表现出更强的语言理解和生成能力以及小规模模型所不具备的涌现能力。主要是三个 LLM 系列：GPT、LLaMA 和 PaLM，如图所示。</p>\n<p><img alt=\"Image 4\" src=\"https://pica.zhimg.com/v2-8b36cf8af6c2d749fa6190b2ed1f6aae_1440w.jpg\" /></p>\n<p>如图是一些最具代表性的 LLM 框架时间表（迄今为止）。除了具有 #parameters 阈值的大语言模型外，还包含了一些代表性方法，这些方法突破了语言模型的极限，为它们的成功铺平了道路（例如 vanilla Transformer、BERT、GPT-1），以及一些小型语言模型。♣ 显示不仅可用作模型而且可用作方法的实体。♦ 仅显示方法。</p>\n<p><img alt=\"Image 5\" src=\"https://pica.zhimg.com/v2-4ed03db3eb7c47c49f38e125cae68860_1440w.jpg\" /></p>\n<hr />\n<p>一旦选择了模型架构，训练 LLM 的主要步骤包括：数据准备（收集、清理、去重等）、token化、模型预训练（以自监督学习方式）、指令调整和对齐。如图所示说明这些LLM的不同组件：</p>\n<p><img alt=\"Image 6\" src=\"https://pic3.zhimg.com/v2-43f16c78e574435d5c1f7efab8c0f70a_1440w.jpg\" /></p>\n<p><strong>数据清洗</strong>工作非常重要。比如，在 Falcon40B [124] 中，仅对网络数据进行适当的过滤和去重，就可以产生强大的模型；甚至比在 The Pile 上训练的最先进模型表现得更好。尽管进行了广泛的过滤，他们还是能够从 CommonCrawl 中获得五万亿个tokens。他们还发布了从REFINEDWEB 数据集中提取的 6000 亿个tokens，以及在其上训练的 1.3/7.5B 参数语言模型。如图显示了这项工作对 CommonCrawl 数据的细化过程。</p>\n<p><img alt=\"Image 7\" src=\"https://pica.zhimg.com/v2-305e8b4899897349fe5c50cb76449b82_1440w.jpg\" /></p>\n<p><strong>Token化</strong>是指将文本序列转换为较小部分（称为token）的过程。虽然最简单的token化工具只是根据空格将文本切成token，但大多数token化工具都依赖于字典。但是在这种情况下，词汇表之外 (OOV) 是一个问题，因为token化器只知道字典中的单词。为了增加字典的覆盖范围，用于 LLM 的流行token化器基于子词，这些子词可以组合成大量单词，包括训练数据中未见过的单词或不同语言中的单词。三个主要token化器是：字节对编码（Byte Pair Encoding），单词片段编码（Word Piece Encoding）和句子片段编码（Sentence Piece Encoding）。</p>\n<p><strong>位置编码</strong>技术如图所示，包括以下几个：</p>\n<p><img alt=\"Image 8\" src=\"https://pic3.zhimg.com/v2-881215f256a1409841baee9f010e1302_1440w.jpg\" /></p>\n<p>1）<strong>绝对位置嵌入（APE）</strong>[44] ：已在原始 Transformer 模型中使用，以保留序列顺序信息。因此，单词的位置信息被添加到编码器和解码器底部的输入嵌入中。位置编码有多种选择，无论是学习的还是固定的。在 原始 Transformer 中，正弦和余弦函数用于此目的。在 Transformers 中使用 APE 的主要缺点是限制了一定数量的 token。此外，APE 无法解释 token 之间的相对距离。</p>\n<p>2）<strong>相对位置嵌入（RPE）</strong>[126] ：涉及扩展自注意以考虑输入元素之间的成对链接。RPE 在两个级别添加到模型中：首先作为K的附加组件，然后作为V矩阵的子组件。这种方法将输入视为具有标签和有向边的全连通图。对于线性序列，边可以捕获输入元素之间相对位置差异的信息。一个裁剪距离表示为 k2 ≤ k ≤ n − 4，指定相对位置的最大限制。这允许模型对不属于训练数据的序列长度做出合理的预测。</p>\n<p>3）<strong>旋转位置嵌入（RoPE）</strong>[127]：其解决了现有方法的问题。学习到的绝对位置编码可能缺乏通用性和意义，尤其是在句子较短的情况下。此外，当前的方法（如 T5 ）面临着在位置之间构建全注意矩阵的挑战。RoPE 使用旋转矩阵对单词的绝对位置进行编码，同时在自注意中包含明确的相对位置细节。RoPE 带来一些有用的特性，比如句子长度的灵活性、随相对距离增加单词依赖性的降低，以及通过相对位置编码改善线性自注意的能力。 GPT-NeoX-20B、PaLM、CODEGEN 和 LLaMA 等模型都在其架构中利用了 RoPE。</p>\n<p>4) <strong>相对位置偏差（RPB）</strong>：这种位置嵌入背后的概念是为了便于在推理过程中推断比训练中遇到的更长序列。在 [128]中，他们提出了具有线性偏差的注意 (ALiBi)。他们不是简单地将位置嵌入添加到词嵌入中，而是在Q-K对的注意得分中引入了偏差，施加与距离成比例的惩罚。在 BLOOM 模型中，ALiBi 得到了利用。</p>\n<p><strong>预训练</strong>是大语言模型训练流程的第一步，它可以帮助 LLM 获得基本的语言理解能力，这在各种语言相关任务中都很有用。在预训练期间，LLM 会以大量（通常）未标记的文本进行训练，通常采用自监督的方式。预训练有不同的方法，例如下一句预测 [24]，最常见的两种方法包括下一个token预测（自回归语言建模）和掩码语言建模。</p>\n<p>最近，<strong>混合专家 (<a href=\"https://zhida.zhihu.com/search?content_id=243927332&amp;content_type=Article&amp;match_order=1&amp;q=MoE&amp;zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODE2NjU2ODQsInEiOiJNb0UiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDM5MjczMzIsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.jUns6R7tjKMDaMeXCnny7_S5Pin9fzfrBEGus1eiGV4&amp;zhida_source=entity\">MoE</a>)</strong> [130]、[131] 在 LLM 领域也变得非常流行。MoE 能够以更少的计算量对模型进行预训练，这意味着人们可以使用与密集模型相同的计算预算大幅扩大模型或数据集的大小。MoE 由两个主要元素组成：稀疏 MoE 层，用于代替密集前馈网络 (FFN) 层，并具有一定数量的“专家”（例如 8 个），其中每个专家都是一个神经网络。实际上，专家是 FFN，但它们也可以是更复杂的网络。门网络或路由器，决定将哪些tokens发送给哪个专家。值得注意的是，人们可以将tokens发送给多个专家。如何将token路由给专家是使用 MoE 时的一个重要决策——路由器由学习到的参数组成，并与网络的其余部分同时进行预训练。如图提供用于 MoE 的Switch Transformer编码器块的图示。</p>\n<p><img alt=\"Image 9\" src=\"https://picx.zhimg.com/v2-aa2d9b6a371d6a4dcf823a0ddff20a2f_1440w.jpg\" /></p>\n<p><strong>微调和指令调优</strong>方面，为了使基础模型发挥作用，需要使用token数据对其进行微调以适应特定任务（即所谓的监督微调，简称 SFT）。例如，在原始的 BERT 论文 [24] 中，该模型针对 11 个不同的任务进行了微调。虽然较新的 LLM 不再需要使用微调，但它们仍然可以从任务或数据特定的微调中受益。例如，OpenAI 报告称，当使用特定于任务的数据进行微调时，小得多的 GPT-3.5 Turbo 模型可以胜过 GPT-4。</p>\n<p>不过，微调不需要针对单个任务执行，并且存在不同的多任务微调方法（例如，参见[132]）。众所周知，对一个或多个任务进行微调可以改善结果并降低提示工程的复杂性，并且可以作为检索增强生成（RAG）的替代方案。此外，还有其他原因建议进行微调。例如，人们可能希望进行微调以将模型暴露给在预训练期间未接触的新数据或专有数据。</p>\n<p><strong>微调 LLM</strong> 的一个重要原因是使响应与人类在通过提示提供指令时的期望保持一致。这就是所谓的指令调优 [133]。不同于提示调优，在指令调优的背景下，重要的是要理解指令是指定 LLM 应完成的任务的提示。指令调优数据集（例如 NaturalInstructions [134]）不仅包括任务定义，还包括其他组件，例如正/负示例或要避免的事情。</p>\n<p>用于对 LLM 进行指令调整的具体方法和指令数据集各不相同，但一般来说，指令调优模型的表现优于它们所基于的原始基础模型。例如，InstructGPT [59] 在大多数基准测试中都优于 GPT-3。与 LLaMA 相比，Alpaca [62] 也是如此。</p>\n<p>Wang 提出的 Self-Instruct [135] 也是一种流行的方法，他们引入了一个框架，通过引导自己的生成来提高预训练语言模型的指令跟随能力。他们的流水线从语言模型生成指令、输入和输出样本，然后过滤无效或类似的样本，然后再使用它们对原始模型进行微调。</p>\n<p><strong>AI 对齐</strong>是引导 AI 系统朝着人类目标、偏好和原则发展的过程。经过单词预测预训练的 LLM 经常表现出意想不到的行为。例如，它们可能会生成有毒、有害、误导和有偏见的内容。</p>\n<p>上面讨论的指令调优使 LLM 更接近对齐。然而，在许多情况下，重要的是要采取进一步的步骤来改善模型的对齐并避免意外行为。</p>\n<p><strong>RLHF（人类反馈中强化学习）</strong>和 <strong>RLAIF（AI 反馈中强化学习）</strong>是两种流行的方法。RLHF 使用奖励模型从人类反馈中学习对齐。经过调整后，该奖励模型能够对不同的输出进行评级，并根据人类给出的对齐偏好对其进行评分。奖励模型向原始 LLM 提供反馈，并使用此反馈进一步调整 LLM [137]。另一方面，从 AI 反馈中进行强化学习将经过预训练且对齐良好的模型直接连接到 LLM，并帮助它从更大、更对齐的模型中学习 [138]。</p>\n<p>在另一项最近的工作（称为 <strong><a href=\"https://zhida.zhihu.com/search?content_id=243927332&amp;content_type=Article&amp;match_order=1&amp;q=DPO&amp;zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODE2NjU2ODQsInEiOiJEUE8iLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDM5MjczMzIsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.EAuAMNc0X-D_hTEv5qFB7XUwCEWkJCFz4joEA-T0I_Y&amp;zhida_source=entity\">DPO</a></strong>）[139] 中，讨论了 RLHF 是一个复杂且通常不稳定的过程，并尝试用一种新方法解决这个问题。他们利用奖励函数和最优策略之间的映射来表明，这个受约束的奖励最大化问题可以通过一个单步的策略训练进行精确优化，本质上解决了人类偏好数据的分类问题。最终的算法称为直接偏好优化 (DPO)，该算法稳定、高效且计算量小，无需拟合奖励模型、在微调期间从 LM 采样或执行重大超参数调整。使用 DPO 进行微调超出了 RLHF 控制生成情绪的能力，并提高了总结中的响应质量。如图显示了 DPO 与 RLHF 之间的高级比较。</p>\n<p><img alt=\"Image 10\" src=\"https://picx.zhimg.com/v2-6ca0d654e91193d6f78e7112bc9c065f_1440w.jpg\" /></p>\n<p>更近一些，Ethayarajh提出了一种新的对齐方法，称为<strong>K-T优化 (<a href=\"https://zhida.zhihu.com/search?content_id=243927332&amp;content_type=Article&amp;match_order=1&amp;q=KTO&amp;zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODE2NjU2ODQsInEiOiJLVE8iLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDM5MjczMzIsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.nPQ5MRKF39-Svz3NFEfoBFDXF27Mqum1YkYdJu95paM&amp;zhida_source=entity\">KTO</a>)</strong> [136]。与现有的先进方法不同，KTO 不需要成对的偏好数据 (x, yw, yl)，它只需要 (x, y) 和 y 是可取的还是不可取的知识。尽管没有使用成对的偏好，但 KTO 对齐模型在 1B 到 30B 的尺度上被证明比 DPO 对齐模型好或更好。KTO 在现实世界中也比直接偏好优化方法更容易使用，因为它需要的数据类型要丰富得多。例如，每家零售公司都拥有大量的客户互动数据，以及该互动是成功（例如，购买）还是失败（例如，没有购买）。但是，他们几乎没有反事实数据（即，什么会使不成功的客户互动 yl 变成成功的 yw）。如图显示了 KTO 与上面讨论的其他对齐方法之间的高级比较。</p>\n<p><img alt=\"Image 11\" src=\"https://pic1.zhimg.com/v2-6d4f71c2899cab47d9cfef997f2eaa38_1440w.jpg\" /></p>\n<p><strong>解码</strong>是指使用预训练的 LLM 生成文本的过程。给定一个输入提示，token化器将输入文本中的每个token转换为相应的token ID。然后，语言模型使用这些token ID 作为输入并预测下一个最可能的token（或tokens序列）。最后，模型生成 logits，使用 softmax 函数将其转换为概率。已经提出了不同的解码策略。其中一些最流行的是贪婪搜索、波束搜索，以及不同的采样技术，如 top-K、top-P（Nucleus采样）。</p>\n<p>1) <strong>贪婪搜索</strong>：贪婪搜索将每一步中最可能的tokens作为序列中的下一个tokens，丢弃所有其他潜在备选。可以想象，这是一种简单的方法，可能会失去很多时间一致性和连贯性。它只考虑每一步中最可能的tokens，而不考虑对序列的整体影响。这个属性说明操作很快，但也意味着它可能会错过更好序列，其中可能出现可能性略低的下一个tokens。</p>\n<p>2) <strong>波束搜索</strong>：与仅考虑下一个最可能token的贪婪搜索不同，波束搜索考虑 N 个最可能的tokens，其中 N 表示波束的数量。此过程重复进行，直到达到预定义的最大序列长度或出现序列末尾的tokens。此时，选择总得分最高的tokens序列（又称“波束”）作为输出。例如，对于波束大小为 2 且最大长度为 5 的波束搜索，波束搜索需要跟踪 25 = 32 个可能的序列。因此，它比贪婪搜索更耗费计算资源。</p>\n<p>3) <strong>Top-k 抽样</strong>：Top-k 抽样是一种使用语言模型生成的概率分布从 k 个最可能的选项中随机选择一个token的技术。这种方法确保优先考虑最可能的 token，同时在选择过程中引入随机性元素。随机性通常通过温度概念引入。温度 T 是一个范围从 0 到 1 的参数，它会影响 softmax 函数生成的概率，使最可能的 token 更具影响力。低温设置会显著改变概率分布（通常用于文本生成，以控制生成输出的“创造性”水平），而高温设置会优先考虑具有更高概率的 token。Top-k 是一种创造性的采样方式，可以与波束搜索一起使用。top-k 采样选择的序列可能不是波束搜索​​中概率最高的序列。但重要的是要记住，最高分数并不总是会产生更现实或更有意义的序列。</p>\n<p>4) <strong>Top-p 采样</strong>：Top-p 采样，也称为Nucleus采样，与 top-k 采样的方法略有不同。Nucleus采样不是选择前 k 个最可能的 tokens，而是选择一个截止值 p，使得所选 tokens 的概率总和超过 p。这形成了一个token “nucleus”，可以从中随机选择下一个token。换句话说，在 top-p 采样中，语言模型按降序检查最可能的token，并不断将它们添加到列表中，直到概率总和超过阈值 p。可以想象，这可能更好，特别是对于 top-k tokens没有大概率质量的场景。与 top-k 采样不同，Nucleus采样中包含的tokens数量不是固定的。这种可变性通常会产生更多样化和更具创造性的输出，使nucleus采样在文本生成相关任务中很受欢迎。</p>\n<p>还有一个成本有效的技术问题。</p>\n<p><strong>最优训练</strong>：已经开发了许多用于优化 LLM 训练的框架，比如 1）零冗余优化器 (ZeRO)用于优化内存，大大提高了 LLM 的训练速度，同时增加了有效训练的模型大小；ZeRO 消除了数据和模型并行训练中的内存冗余，同时保持了较低的通信量和较高的计算粒度，允许人们根据设备数量按比例缩放模型大小，同时保持高效率；2）接受加权K-V (RWKV)，将 Transformer 的高效并行训练与 RNN 的高效推理相结合；其利用了线性注意机制，并将模型制定为 Transformer 或 RNN，这在训练期间并行化计算并在推理期间保持恒定的计算和内存复杂性，从而导致第一个非 Transformer 架构可扩展到数百亿个参数。</p>\n<p><strong>低秩自适应 (LoRA)</strong>：LoRA是一种流行的轻量级训练技术，可显著减少可训练参数的数量，它基于一个关键洞察：专门任务的微调权重与初始预训练权重之间的差异通常表现出“低内秩”——这意味着它可以很好地用低秩矩阵来近似 [142]。使用 LoRA 进行训练速度更快、内存效率更高，并且产生的模型权重更小（几百 MB），更易于存储和共享。低秩矩阵的一个特性是它们可以表示为两个较小矩阵的乘积。这一认识导致了这样的假设：微调权重和初始预训练权重之间的差异可以表示为两个小得多的矩阵的矩阵乘积。专注于更新这两个较小的矩阵而不是整个原始权重矩阵，可以大大提高计算效率。</p>\n<p><strong>知识蒸馏</strong>：知识蒸馏是从更大的模型中学习的过程 [143]。早期发布的最佳性能模型已经证明，即使将其用于 API 蒸馏方法中，这种方法也非常有用。它也被称为一种将知识从单个模型（实际上是多个模型）中蒸馏成较小模型的方法。通过这种方法创建较小的模型会产生较小的模型尺寸，甚至可以在边缘设备上使用。</p>\n<p><strong>量化</strong>：深度学习的核心是一组应用于矩阵的数学函数，对模型权重具有特定的精度。降低权重的精度可用于减小模型的大小并使其更快。例如，与 Int-8 操作相比，Float-32 操作更慢。此过程称为量化，可应用于不同阶段。模型量化的主要方法可分为：训练后量化和量化-觉察训练。训练后量化涉及两种众所周知的量化训练模型：动态和静态。动态训练后量化在运行时计算量化范围，与静态相比速度较慢。量化-觉察训练将量化标准添加到训练中，并在训练过程中训练和优化量化模型。这种方法确保最终模型具有良好的性能，并且在训练后不需要量化。</p>\n<hr />\n<p>一旦 LLM 经过训练，可以使用它们来为各种任务生成所需的输出。可以通过基本<strong>提示</strong>直接使用 LLM。但是，为了充分发挥其潜力或解决某些缺点，需要通过一些外部手段来增强模型。如图所示是一些讨论的方面：</p>\n<p><img alt=\"Image 12\" src=\"https://pic4.zhimg.com/v2-65590c4094b0b8874a48e84ea26ce5e9_1440w.jpg\" /></p>\n<p><strong>LLM的局限性</strong></p>\n<p>LLM 经过训练可以预测 token。虽然微调和对齐可以提高它们的性能并为其能力增加不同的维度，但仍然会出现一些重要的限制，包括：</p>\n<p>• 没有状态/记忆。LLM 本身甚至无法记住在之前的提示中发送给它们的内容。对于许多需要某种形式状态的用例来说，这是一个重要的限制。</p>\n<p>• 随机的/概率的。如果多次向 LLM 发送相同的提示，可能会得到不同的响应。虽然有一些参数，特别是温度，可以限制响应的变化，但这是它们训练的固有属性，可能会产生问题。</p>\n<p>• 拥有陈旧的信息，并且它们自己无法访问外部数据。LLM 本身甚至不知道当前的时间或日期，也无法访问其训练集中不存在的任何信息。</p>\n<p>• 通常非常大。这意味着需要许多昂贵的 GPU 机器进行训练和服务。在某些情况下，最大的模型SLA （service level agreement）较差，尤其是在延迟方面。</p>\n<p>• 会产生幻觉。LLM 没有“真相”的概念，它们通常接受过好坏参半内容的训练。它们可以给出非常合理但不真实的答案。</p>\n<p><strong>提示设计和工程</strong></p>\n<p>生成式 AI 模型中的提示是用户提供的文本输入，用于指导模型的输出。提示可以是简单的问题，也可以是详细的描述或特定的任务。提示通常由说明、问题、输入数据和示例组成。在实践中，为了从 AI 模型中引出所需的响应，提示必须包含说明或问题，其他元素是可选的。高级提示涉及更复杂的结构，例如“思维链”提示，其中引导模型遵循逻辑推理过程来得出答案。</p>\n<p>提示工程是一门快速发展的学科，它塑造了 LLM 和其他生成式 AI 模型的交互和输出。提示工程的本质在于设计最佳提示，以实现生成模型中的特定目标。这个过程不仅是指导模型，还涉及对模型的能力和局限性以及其运行环境的一些理解。</p>\n<p>提示工程超越了单纯的提示构建；它需要融合领域知识、对 AI 模型的理解，以及针对不同上下文定制提示的系统方法。这可能涉及创建可根据给定数据集或上下文以编程方式修改的模板。例如，基于用户数据生成个性化响应可能使用动态填充相关用户信息的模板。</p>\n<p>此外，提示工程是一个迭代和探索的过程，类似于传统的机器学习实践，如模型评估或超参数调整。该领域的快速发展表明它有可能彻底改变机器学习的某些方面，超越特征或架构工程等传统方法。另一方面，版本控制和回归测试等传统工程实践需要适应这种新范式，就像它们适应其他机器学习方法一样 [156]。</p>\n<p>最流行的提示工程方法包括：思维链（COT）、思维树（TOT）、自洽性、反思、专家提示、工作流/链（chains）、模版/轨道（rails）和自动提示工程（APE）。</p>\n<p><strong>外部知识的增强LLM - RAG</strong></p>\n<p>预训练 LLM 的主要限制之一是缺乏最新知识或无法访问私有或特定于用例的信息。这就是检索增强生成 (RAG) 发挥作用的地方 [164]。如图所示是RAG应用于LLM的问答系统：</p>\n<p><img alt=\"Image 13\" src=\"https://pic2.zhimg.com/v2-b6414b444d428118a45675978c53fc4f_1440w.jpg\" /></p>\n<p>RAG涉及从输入提示中提取查询，并使用该查询从外部知识源（例如搜索引擎或知识图谱，参见下图所示）检索相关信息。</p>\n<p><img alt=\"Image 14\" src=\"https://pica.zhimg.com/v2-e4545bf73c6d5a4e0ef2fe94bf77125a_1440w.jpg\" /></p>\n<p>然后将相关信息添加到原始提示中并输入到 LLM，以便模型生成最终响应。RAG 系统包括三个重要组成部分：检索、生成、增强 [165]。</p>\n<p>由于 RAG 对于构建高级 LLM 系统的重要性，最近开发了几种 RAG-觉察提示技术。其中一种技术是前瞻性主动检索增强生成 (<a href=\"https://zhida.zhihu.com/search?content_id=243927332&amp;content_type=Article&amp;match_order=1&amp;q=FLARE&amp;zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODE2NjU2ODQsInEiOiJGTEFSRSIsInpoaWRhX3NvdXJjZSI6ImVudGl0eSIsImNvbnRlbnRfaWQiOjI0MzkyNzMzMiwiY29udGVudF90eXBlIjoiQXJ0aWNsZSIsIm1hdGNoX29yZGVyIjoxLCJ6ZF90b2tlbiI6bnVsbH0.LV8GmkXWcCJaFUmIeTOvQpQYpJtY3FztMXnmaZRJsGc&amp;zhida_source=entity\">FLARE</a>)。</p>\n<p><strong>外部工具使用</strong></p>\n<p>从外部知识源检索信息只是增强 LLM 的潜在方法之一。更一般地说，LLM 可以访问任意数量的外部工具（例如服务的 API）来增强其功能。在这方面，RAG 可以看作是所谓“工具”这一更广泛类别的一个具体实例。</p>\n<p>在这种情况下，工具是 LLM 可以利用的外部功能或服务。这些工具扩展了 LLM 可以执行的任务范围，从基本信息检索到与外部数据库或 API 的复杂交互。</p>\n<p>与 RAG 中描述的类似，已经开发了几种工具-觉察提示方法，使工具的使用更具可扩展性。一种流行的技术是所谓的自动多步推理和工具使用 (<a href=\"https://zhida.zhihu.com/search?content_id=243927332&amp;content_type=Article&amp;match_order=1&amp;q=ART&amp;zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODE2NjU2ODQsInEiOiJBUlQiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDM5MjczMzIsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.E4sDArnzovwgxDhA85rCk3CzF5S3-t7vr4pWX1dO5ng&amp;zhida_source=entity\">ART</a>)。</p>\n<p><strong>LLM智体</strong></p>\n<p>在人工智能的发展史上，人工智能智体的概念已经得到了充分的探索。智体通常是一个自主实体，它可以使用传感器感知环境，根据当前状态做出判断，并根据可用的操作采取相应的行动。</p>\n<p>在 LLM 的上下文中，智体是指基于 (增强型) LLM 的专门实例系统，能够自主执行特定任务。这些智体旨在与用户和环境交互，根据输入和交互的预期目标做出决策。智体基于 LLM，能够访问和使用工具，并根据给定的输入做出决策。它们旨在处理需要一定程度的自主性和决策的任务，通常超出简单的响应生成。</p>\n<p>像 RAG 和 Tools 一样，已经开发出专门满足基于 LLM 智体需求的提示工程技术。三个这样的例子是：无需观察的推理 (ReWOO)、推理和行动 (ReAct) 和对话支持的解析智体 (DERA)。</p>\n<h2>LLM数据集和评估</h2>\n<p>大语言模型取得了令人鼓舞的成就，但主要问题是它们如何有效地发挥作用，以及如何在特定任务或应用中评估它们的性能。</p>\n<p>由于 LLM 的应用前景不断发展，对 LLM 的评估面临着特殊的挑战。开发 LLM 的初衷是提高 NLP 任务的性能，例如翻译、摘要、问答等 [178]。然而，今天很明显，这些模型正在代码生成和金融等不同领域得到应用。此外，LLM 的评估包含几个关键的考虑因素，例如公平性和偏见、事实核查和推理。</p>\n<p>LLM的流行数据集如图所示：</p>\n<p><img alt=\"Image 15\" src=\"https://pic4.zhimg.com/v2-9b93240162e1efac790122c281c4892d_1440w.jpg\" /></p>\n<p>下表是LLM数据集的概览：</p>\n<p><img alt=\"Image 16\" src=\"https://pica.zhimg.com/v2-26a330bc6e80e3776e58f21ab4f79f1e_1440w.jpg\" /></p>\n<p>大语言模型在某些情况下会产生幻觉答案，仅仅是因为它们是下一个token预测机器。幻觉是衡量大语言模型可信度和可靠性的重要因素之一。另一方面，测量幻觉并不像看起来那么容易，因为每个事实都可以用不同的风格编写，即使是最细微的书写变化也很难察觉。可以合理地假设，如果任何特定的 LLM 更能够检测文本中虚假信息的幻觉，那么它也更值得信赖。HaluEval 是旨在衡量该领域幻觉的数据集之一 [205]。也可以通过另一个模型根据实际答案判断响应来执行评估 [206]。下表展示了基于这些数据集对不同模型的评估。</p>\n<p><img alt=\"Image 17\" src=\"https://pic3.zhimg.com/v2-b9ce488d6a06e0c6fb722f267cade758_1440w.jpg\" /></p>\n<hr />\n<p>最后提一下挑战和未来的方向：</p>\n<ul>\n<li>更高效和更小LLM</li>\n<li>新的后注意架构范式</li>\n<li>多模态模型</li>\n<li>智体应用</li>\n<li>安全和道德/责任AI</li>\n</ul>"
    }
  ],
  "latest_overview": [
    {
      "title": "",
      "body_html": "<h1>2026年春季发布的10个开源权重LLM的综述与比较</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（通过 Jina Reader 公开抓取）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2016915071025034388\">https://zhuanlan.zhihu.com/p/2016915071025034388</a></li>\n<li>作者: -</li>\n</ul>\n<hr />\n<p>Title: 2026年春季发布的10个开源权重LLM的综述与比较</p>\n<p>URL Source: https://zhuanlan.zhihu.com/p/2016915071025034388</p>\n<p>Markdown Content:\n*   Arcee AI 的 Trinity Large (2026年1月27日)\n*   <a href=\"https://zhida.zhihu.com/search?content_id=271552916&amp;content_type=Article&amp;match_order=1&amp;q=Moonshot+AI&amp;zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODE2NjU3NTUsInEiOiJNb29uc2hvdCBBSSIsInpoaWRhX3NvdXJjZSI6ImVudGl0eSIsImNvbnRlbnRfaWQiOjI3MTU1MjkxNiwiY29udGVudF90eXBlIjoiQXJ0aWNsZSIsIm1hdGNoX29yZGVyIjoxLCJ6ZF90b2tlbiI6bnVsbH0.k0pIBSteBaRJiJUEuAUJMQo-0oJSpXaoljRFc75MM0M&amp;zhida_source=entity\">Moonshot AI</a> 的 Kimi K2.5 (2026年1月27日)\n*   <a href=\"https://zhida.zhihu.com/search?content_id=271552916&amp;content_type=Article&amp;match_order=1&amp;q=StepFun&amp;zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODE2NjU3NTUsInEiOiJTdGVwRnVuIiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MjcxNTUyOTE2LCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.5_gc-0Ru4gASho_qUQ5iauUVJmbXAq40fv_JU7QPvTM&amp;zhida_source=entity\">StepFun</a> Step 3.5 Flash (2026年2月1日)\n*   Qwen3-Coder-Next (2026年2月3日)\n*   <a href=\"https://link.zhihu.com/?target=https%3A//z.ai/\">z.AI</a> 的 GLM-5 (2026年2月12日)\n*   MiniMax M2.5 (2026年2月12日)\n*   Nanbeige 4.1 3B (2026年2月13日)\n*   Qwen 3.5 (2026年2月15日)\n*   <a href=\"https://zhida.zhihu.com/search?content_id=271552916&amp;content_type=Article&amp;match_order=1&amp;q=%E8%9A%82%E8%9A%81%E9%9B%86%E5%9B%A2&amp;zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODE2NjU3NTUsInEiOiLomoLomoHpm4blm6IiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNzE1NTI5MTYsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.3uYwrlX8MjAJylz-sb2nDCeUwG5qyogI8xSceNZvf7A&amp;zhida_source=entity\">蚂蚁集团</a>的 Ling 2.5 1T &amp; Ring 2.5 1T (2026年2月16日)\n*   Cohere 的 Tiny Aya (2026年2月17日)\n*   更新 1: Sarvam 30B 和 105B (2026年3月6日)\n*   (附注: DeepSeek V4 一旦发布将被加入。)</p>\n<p>由于内容广泛，本文中将引用我之前的《<a href=\"https://link.zhihu.com/?target=https%3A//magazine.sebastianraschka.com/p/the-big-llm-architecture-comparison\">大型大型语言模型架构比较</a>》文章，针对某些技术主题（如专家混合、量子规范、多头潜在注意力等）提供背景信息，以避免重复。</p>\n<h2>1. Arcee AI的Trinity Large：一家美国新兴初创公司，共享开放权重模型</h2>\n<p>1月27日，Arcee AI（此前我未曾关注过的一家公司）开始在模型中心发布其开源权重的 4000亿参数 Trinity Large 大型语言模型的多个版本，以及两个较小的变体：</p>\n<ul>\n<li>他们的旗舰大型模型是一个4000亿参数的混合专家模型，拥有130亿激活参数。</li>\n<li>两个较小的变体是 Trinity Mini（260亿参数，30亿激活参数）和 Trinity Nano（60亿参数，10亿激活参数）。</li>\n</ul>\n<p><img alt=\"Image 1\" src=\"https://pic4.zhimg.com/v2-cc9ce81f148462d7835f445cd372214f_1440w.jpg\" /></p>\n<p>图1：基于模型集线器配置文件的三一大型架构概述。</p>\n<p>除了模型权重，Arcee AI还在GitHub上发布了一份详细的<a href=\"https://link.zhihu.com/?target=https%3A//github.com/arcee-ai/trinity-large-tech-report\">技术报告</a>（截至2月18日，也在<a href=\"https://link.zhihu.com/?target=https%3A//www.arxiv.org/abs/2602.17004\">arxiv</a>上），内容丰富。</p>\n<p>那么，让我们仔细看看400B旗舰机型。下图2将其与z.AI的<a href=\"https://link.zhihu.com/?target=https%3A//magazine.sebastianraschka.com/p/the-big-llm-architecture-comparison%3Fopen%3Dfalse%23%25C2%25A711-glm-45\">GLM-4.5</a>进行比较，后者可能是最相似的型号，因其尺寸为355B参数。</p>\n<p><img alt=\"Image 2\" src=\"https://pic3.zhimg.com/v2-db5ef31af5b6dd6560cde9908feadfc6_1440w.jpg\" /></p>\n<p>图2：Arcee AI Trinity Large 与尺寸相近的 GLM-4.5（400B 对 355B）并列。</p>\n<p>正如我们在 Trinity 和 GLM-4.5 的比较中所见，Trinity 模型中增加了几个有趣的架构组件。</p>\n<p>首先，是像 Gemma 3、Olmo 3、Xiaomi MiMo 等模型中使用的交替局部：全局（滑动窗口）注意力层。简而言之，滑动窗口注意力是一种稀疏（局部）注意力模式，其中每个 token 只关注最近 t 个 token 的固定大小窗口（例如 4096），而不是关注整个输入（可能多达 n=256,000 个 token）。这将每层的常规注意力成本从序列长度 n 的 O(n²) 降低到大约 O(n·t)，这就是它对长上下文模型有吸引力的原因。</p>\n<p><img alt=\"Image 3\" src=\"https://picx.zhimg.com/v2-b4d68dc6fff5d7cbd7bf14ce8cabe75d_1440w.jpg\" /></p>\n<p>图3：常规注意力（全局注意力）与滑动窗口注意力（局部注意力）的比较。</p>\n<p>但是，Arcee 团队没有采用 Gemma 3 和 Xiaomi 使用的常见的 5:1 局部：全局比率，而是选择了类似于 Olmo 3 的 3:1 比率，以及相对较大的滑动窗口大小 4096（也类似于 Olmo 3）。</p>\n<p>该架构还使用了 QK-Norm，这是一种将 RMSNorm 应用于键和查询以稳定训练的技术（如下图4所示），并且在全局注意力层中没有使用位置嵌入，类似于 SmolLM3。</p>\n<p>Trinity 还有一种门控注意力形式。它不是完全成熟的 Gated DeltaNet，但它使用了类似于 Qwen3-Next 注意力机制中的门控机制。</p>\n<p>也就是说，Trinity 团队修改了标准注意力，在输出线性投影之前，向缩放点积添加了逐元素门控（如下图所示），这减少了注意力汇聚点并改善了长序列的泛化能力。此外，这也有助于训练稳定性。</p>\n<p><img alt=\"Image 4\" src=\"https://pic3.zhimg.com/v2-0e046f7f278db322744810b26ec77dc2_1440w.jpg\" /></p>\n<p>图4：Trinity Large在注意力机制中使用的门控机制示意图。</p>\n<p>此外，Trinity 的技术报告显示，Trinity Large 和 GLM-4.5 基础模型的建模性能几乎相同（我假设他们没有与更新的基础模型进行比较，因为如今许多公司只分享他们微调后的模型）。</p>\n<p>你可能已经注意到，在之前的 Trinity Large 架构图中使用了四层（而不是两层）RMSNorm，乍一看这与 Gemma 3 相似。</p>\n<p><img alt=\"Image 5\" src=\"https://picx.zhimg.com/v2-c61b92696c35f94406bdf3559be82ca9_1440w.jpg\" /></p>\n<p>图5：Arcee Trinity和Gemma 3 RMSNorm并排放置。</p>\n<p>总体而言，RMSNorm 的放置位置看起来像 Gemma 3 的风格，但不同之处在于，第二个 RMSNorm（在每个块中）的增益是深度缩放的，这意味着它被初始化为大约 1 / sqrt(L)（其中 L 是总层数）。因此，在训练早期，残差更新从很小的值开始，并随着模型学习到正确的尺度而增长。</p>\n<p><img alt=\"Image 6\" src=\"https://pic2.zhimg.com/v2-4c51c556c7ea79ba28c39b691e4d8a6f_1440w.jpg\" /></p>\n<p>图6：Arcee Trinity与DeepSeek V3/R1并排的MoE。</p>\n<p>其混合专家架构是类似 DeepSeek 的，包含大量小型专家，但使其更粗粒度，这有助于提高推理吞吐量（我们在 Mistral 3 Large 采用 DeepSeek V3 架构时也看到了这一点）。</p>\n<p>最后，还有一些关于训练改进的有趣细节（一种新的混合专家负载均衡策略和另一种使用 MuOpt 优化器的策略），但由于本文主要关注架构（并且还有很多开源权重模型要介绍），这些细节就不在讨论范围内了。</p>\n<h2><strong>2. Moonshot AI 的 Kimi K2.5: 一个万亿参数规模的类 DeepSeek 模型</strong></h2>\n<p>虽然 Arcee Trinity 基本上匹配了较旧的 GLM-4.5 模型的建模性能，但 Kimi K2.5 是一个在 1 月 27 日发布时就设定了新的开源权重模型性能上限的模型。</p>\n<p>令人印象深刻的是，根据他们详细技术报告中的自有基准测试，它在发布时与领先的专有模型不相上下。</p>\n<p><img alt=\"Image 7\" src=\"https://pic2.zhimg.com/v2-303486f13f993087773937f45f07576f_1440w.jpg\" /></p>\n<p>图7：官方K2.5技术报告中的Kimi K2.5性能基准。</p>\n<p>良好的建模性能并不令人意外，与之前介绍的 Arcee Trinity 或 GLM-4.5 相比，因为（与其前身 K2 类似）Kimi K2.5 是一个万亿参数模型，因此比 Trinity 大 2.5 倍，比 GLM-4.5 大 2.8 倍。</p>\n<p>总的来说，Kimi K2.5 的架构与 Kimi K2 相似，而 Kimi K2 又是 DeepSeek V3 架构的放大版本。</p>\n<p><img alt=\"Image 8\" src=\"https://pic4.zhimg.com/v2-8f3bb6d43fa4f5131398870fee4629d9_1440w.jpg\" /></p>\n<p>图8：Kimi K2是DeepSeek V3架构的更大版本。</p>\n<p>然而，K2 是一个纯文本模型，而 Kimi K2.5 现在是一个支持视觉的多模态模型。引用技术报告的话：</p>\n<blockquote>\n<p>Kimi K2.5 是一个原生多模态模型，它通过对大约 15 万亿混合视觉和文本 token 进行大规模联合预训练，在 Kimi K2 的基础上构建而成。</p>\n</blockquote>\n<p>在训练过程中，他们采用了一种早期融合方法，并在早期就将视觉 token 与文本 token 一起输入，正如我在之前的<a href=\"https://link.zhihu.com/?target=https%3A//magazine.sebastianraschka.com/p/understanding-multimodal-llms\">《理解多模态大型语言模型》</a>文章中讨论的那样。</p>\n<p><img alt=\"Image 9\" src=\"https://pica.zhimg.com/v2-709ad887595f98b01d1b46c09dfda59c_1440w.jpg\" /></p>\n<p>图9：与大多数当代多模态LLM一样，Kimi K2.5采用方法A，在训练时将视觉符号与文本符号并存。</p>\n<p>旁注：在多模态论文中，“早期融合”这个词的含义不幸地被过度加载了。它可能指：</p>\n<ol>\n<li>模型在预训练期间看到视觉 token 的时间点。即，视觉 token 从预训练开始（或很早）就混入，而不是在后期阶段。</li>\n<li>图像 token 在模型中如何组合。即，它们作为嵌入 token 与文本 token 一起馈入。</li>\n</ol>\n<p>在这种情况下，虽然报告中“早期融合”这个术语具体指的是第 1 点（视觉 token 在预训练期间提供的时间），但第 2 点在此处也是成立的。</p>\n<p>此外，关于第 1 点，研究人员进行了一项有趣的消融研究，表明模型在预训练早期看到视觉 token 会受益，如下面的注释表所示。</p>\n<p><img alt=\"Image 10\" src=\"https://picx.zhimg.com/v2-f74e72760eaafbc4447fb4813856cb4b_1440w.jpg\" /></p>\n<p>图10：在训练期间视觉标记数量固定的情况下，如果模型在预训练初期展示的视觉标记数量较少（而不是后期增加更多视觉标记），模型性能会有所提升。Kimi K2.5技术报告中的注释表。</p>\n<h2><strong>3. StepFun 的 Step 3.5 Flash: 在优秀的 Tokens/秒 吞吐量下实现良好性能</strong></h2>\n<p>我承认我之前并未关注 Step 模型。这个模型因其有趣的规模、详细的技术报告和快速的 tokens/秒 性能引起了我的注意。</p>\n<p>Step 3.5 Flash 是一个 1960亿 参数的模型，比最近的 DeepSeek V3.2 模型（6710亿）小 3 倍多，但在建模性能基准测试上略微领先。根据 Step 团队的说法，Step 3.5 Flash 在 128k 上下文长度下具有 100 tokens/秒 的吞吐量，而根据 Step 模型中心页面的数据，DeepSeek V3.2 在 Hopper GPU 上只有 33 tokens/秒 的吞吐量。</p>\n<p><img alt=\"Image 11\" src=\"https://pic2.zhimg.com/v2-418fdd2b623237894226091b1cdd9b25_1440w.jpg\" /></p>\n<p>图11：Step 3.5 Flash基准测试，取自Step技术报告。</p>\n<p>这种更高性能的一个原因是模型规模较小（1960亿参数的混合专家模型，每个 token 激活 110亿参数，而 6710亿参数的混合专家模型，每个 token 激活 370亿参数），如下图所示。</p>\n<p><img alt=\"Image 12\" src=\"https://pic2.zhimg.com/v2-afb1ff91f0b2d5b553f8c13ef3a0589f_1440w.jpg\" /></p>\n<p>图12：Step 3.5 Flash与DeepSeek V3.2并排展示。</p>\n<p>另一个原因，除了门控注意力（我们之前在讨论 Trinity 时提到过），是多 token 预测。DeepSeek 是采用多 token 预测的先行者，该技术训练 LLM 在每个步骤预测多个未来 token，而不是单个 token。在此，在每个位置 t，小的额外头（线性层）输出 t+1...t+k 的 logits，并且我们对这些偏移的交叉熵损失求和（在多 token 预测论文中，研究者推荐 k=4）。这个额外的信号加速了训练，而推理可能仍然保持一次生成一个 token，如下图所示。</p>\n<p><img alt=\"Image 13\" src=\"https://picx.zhimg.com/v2-1611bcbd2ed1bcb2edb448828ee0541d_1440w.jpg\" /></p>\n<p>图13：多代币预测与常规下一个代币预测。（左侧子图灵感来源于 MTP纸。）最初，MTP仅在培训中使用，不用于推断;因此，推断时间步（底部）显示了一个单一的下一个标记预测。</p>\n<p>DeepSeek V3 报告使用了多 token 预测-1，即在训练期间使用多 token 预测（带 1 个额外 token，而不是 3 个），然后在推理期间使多 token 预测可选。</p>\n<p>Step 3.5 Flash 在训练和推理期间都使用具有 3 个额外 token 的多 token 预测（注意，多 token 预测通常不在推理期间使用，这是一个例外）。</p>\n<p>注意，前面讨论的 Arcee Trinity 和 Kimi K2.5 没有使用多 token 预测，但其他架构，例如 GLM-4.7 和 MiniMax M2.1，已经使用了类似于 Step 3.5 Flash 的多 token 预测-3 设置。</p>\n<h2><strong>4. Qwen3-Coder-Next: 用于编码的注意力混合架构</strong></h2>\n<p>2026 年 2 月初，Qwen3 团队分享了 800亿参数的 Qwen3-Coder-Next 模型（30亿激活参数），该模型因在编码任务上优于 DeepSeek V3.2（370亿激活）、Kimi K2.5 和 GLM-4.7（均为 320亿激活）等大得多的模型而成为头条新闻。</p>\n<p><img alt=\"Image 14\" src=\"https://pica.zhimg.com/v2-17e2bc456bdb912e210f8fd26f50d420_1440w.jpg\" /></p>\n<p>图14：Qwen3-Coder-Next在编码基准测试中的表现与其他流行编码模型相比;该图出现在官方技术报告中。</p>\n<p>此外，如上图基准测试所示，Qwen3-Coder-Next 的 SWE-Bench Pro 性能大致与 Claude Sonnet 4.5 相当（仅略低于 Claude Opus 4.5），对于一个相对较小的开源权重模型来说，这令人印象深刻！</p>\n<p>在本地使用 Qwen3-Coder-Next 的 ollama 版本，模型大约需要 48.2 GB 的存储空间和 51 GB 的内存。</p>\n<p><img alt=\"Image 15\" src=\"https://pic4.zhimg.com/v2-565915b88b3ab8210655a2300a85089b_1440w.jpg\" /></p>\n<p>图15：本地运行Qwen3-Coder-Next。</p>\n<p>注意，Qwen3-Coder-Next 背后的架构与 Qwen3-Next 80B 完全相同（事实上，预训练的 Qwen3-Next 80B 作为后续中后训练的基础模型）。下图16展示了Qwen3-Next架构与常规Qwen3 235B模型的结合，供参考。</p>\n<p><img alt=\"Image 16\" src=\"https://pica.zhimg.com/v2-7a9131081d1ff2b0dd560f69773d5b50_1440w.jpg\" /></p>\n<p>图16：Qwen3-Coder-Next 80B（每个令牌激活3B参数）以及3倍大的Qwen3 235B-A22B架构。</p>\n<p>新的 Qwen3 Next 架构之所以突出，是因为尽管比之前的 235B-A22B 模型小 3 倍，但它引入了四倍的专家数量，甚至还增加了一个共享专家。这两个设计选择（高专家数量和包含共享专家）。</p>\n<p>另一个亮点是，他们用 Gated DeltaNet + Gated Attention 混合体取代了常规注意力机制，这有助于在内存使用方面实现原生 262k token 上下文长度（235B-A22B 模型原生支持 32k，通过 YaRN 扩展支持 131k）。</p>\n<p>那么，这种新的注意力混合体是如何工作的呢？与分组查询注意力相比，分组查询注意力仍然是标准的缩放点积注意力（如前所述，在查询头组之间共享 K/V 以减少 KV 缓存大小和内存带宽，但其解码成本和缓存仍随序列长度增长），他们的混合机制以 3:1 的比例混合了 Gated DeltaNet 块和 Gated Attention 块，如图 17 所示。</p>\n<p><img alt=\"Image 17\" src=\"https://pica.zhimg.com/v2-be928845fd69d7950cae96ad8a03c5f2_1440w.jpg\" /></p>\n<p>图17：Qwen3-Coder-Next 注意力混合配置。</p>\n<p>我们可以将门控注意力块视为分组查询注意力中使用的标准缩放点积注意力，并进行了一些额外的调整。门控注意力与普通分组查询注意力块的主要区别在于：</p>\n<ul>\n<li>一个输出门（通常按通道，由 sigmoid 控制），在注意力结果被加回残差之前对其进行缩放；</li>\n<li>用于 QKNorm 的零中心 RMSNorm，而不是标准的 RMSNorm；</li>\n<li>部分 RoPE（在维度的子集上）。</li>\n</ul>\n<p>注意，这些本质上只是对分组查询注意力的稳定性更改。</p>\n<p>Gated DeltaNet 是一个更重大的改变。在 DeltaNet 块中，q, k, v 和两个门（α, β）由线性和轻量级卷积层（带归一化）生成，并且该层用一个快速权重 delta 规则更新替代了注意力。</p>\n<p>然而，其权衡是，与完整注意力相比，DeltaNet 提供的内容检索精度较低，这就是为什么保留了一个门控注意力层的原因。</p>\n<p>鉴于注意力呈二次方增长，添加 DeltaNet 组件是为了提高内存效率。在“线性时间，无缓存”家族中，DeltaNet 块本质上是 Mamba 的替代品。Mamba 使用学习到的状态空间滤波器（本质上是随时间变化的动态卷积）维护一个状态。DeltaNet 维护一个由 α 和 β 更新的小型快速权重内存，并用 q 读取它，仅使用小型卷积来帮助形成 q, k, v, α, β。</p>\n<p>有关注意力混合和 Qwen3-Next 架构的更多详细信息，请参阅我之前的文章《超越标准大型语言模型》。</p>\n<p>由于本文主要关注 LLM 架构，训练细节不在讨论范围内。然而，感兴趣的读者可以在他们 GitHub 上的详细技术报告中找到更多信息。</p>\n<h2><strong>5.</strong><strong><a href=\"https://link.zhihu.com/?target=https%3A//z.ai/\">z.AI</a></strong><strong>的 GLM-5: 一个新的旗舰开源权重模型</strong></h2>\n<p>2 月 12 日发布的 GLM-5 是一件大事，因为在发布时，它似乎与主要的旗舰 LLM 产品（包括 GPT-5.2 extra-high、Gemini Pro 3 和 Claude 4.6 Opus）不相上下。（话虽如此，基准测试性能并不一定能转化为现实世界的性能。）</p>\n<p><img alt=\"Image 18\" src=\"https://pic2.zhimg.com/v2-6f8c10001800cf4a445d482d31f617d1_1440w.jpg\" /></p>\n<p>图18：GLM-5架构与其GLM-4.7前身并列。底部的基准取自官方GLM-5技术报告。</p>\n<p>不久之前，GLM-4.7（2025 年 12 月）还是最强的开源权重模型之一。根据上图 18 所示的基准测试，GLM-5 显示出显著的建模性能提升。这种飞跃可能部分归功于训练流程的改进，但很可能很大程度上归因于其参数数量翻倍，从 GLM-4.7 的 3550亿 增加到 GLM-5 的 7440亿。这种规模的增长现在使 GLM-5 在规模上介于 DeepSeek V3.2（6710亿）和 Kimi K2.5（1万亿）之间。</p>\n<p>比较前面讨论过的 Kimi K2.5（1万亿）的基准测试数字，较小的 GLM-5（7440亿）模型似乎略微领先，如下表所示。</p>\n<p><img alt=\"Image 19\" src=\"https://pica.zhimg.com/v2-b6c4518da4e3350bdfe19d022add8be0_1440w.jpg\" /></p>\n<p>图19：GLM-5（744B）与Kimi K2.5（1T）基准测试性能并排对比（越大越好）。</p>\n<p>像 GLM-4.7 以及迄今为止讨论的所有其他模型一样，GLM-5 是一个混合专家模型。每个 token 的激活参数数量仅略有增加，从 GLM-4.7 的 320亿 增加到 GLM-5 的 400亿。</p>\n<p>如下图 20 所示，GLM-5 现在采用了 DeepSeek 的多头潜在注意力以及 DeepSeek 稀疏注意力。（我在《从 DeepSeek V3 到 V3.2：架构、稀疏注意力和 RL 更新》一文中更详细地描述了 DeepSeek 稀疏注意力。）</p>\n<p>这些修改可能旨在降低处理长上下文时的推理成本。除此之外，整体架构保持相对相似。</p>\n<p><img alt=\"Image 20\" src=\"https://pic4.zhimg.com/v2-b17021ac07afb71fb39efdd3656916b9_1440w.jpg\" /></p>\n<p>图20：GLM-5和DeepSeek V3.2并排（两个相似架构，规模相近）。</p>\n<p>与 GLM-4.7 相比，总规模的增加主要来自于增加专家数量，从 160 个（GLM-4.7）增加到 256 个（GLM-5），并略微增加了层维度（同时保持每个 token 的专家数量为 8 个常规 + 1 个共享专家）。例如，嵌入维度和专家规模从 5,120 增加到 6,144，中间投影大小从 1,536 增加到 2,048。</p>\n<p>有趣的是，Transformer 层的数量从 GLM-4.7 的 92 层减少到 GLM-5 的 78 层。我推测这一改变也是为了降低推理成本和改善延迟，因为层深度无法像宽度那样以同样的方式进行并行化。</p>\n<p>此外，我还检查了一个独立基准测试（此处为幻觉排行榜），它确实显示 GLM-5 与 Opus 4.5 和 GPT-5.2 相当（同时使用更少的 token）。</p>\n<p><img alt=\"Image 21\" src=\"https://pic1.zhimg.com/v2-ed53fe783f8b4285c3fc6671b7bc35dc_1440w.jpg\" /></p>\n<p>图21：在整体基准表现旁边，该表增加了来自幻觉排行榜的幻觉率。</p>\n<p>此外，查看最新的聚合了各种基准测试的 Artificial Intelligence Index，GLM-5 确实略微领先于 Kimi K2.5，并且仅比 GPT-5.2 (xhigh) 和最近的 Claude Sonnet 4.6 低一分。</p>\n<p><img alt=\"Image 22\" src=\"https://pic3.zhimg.com/v2-5953812bb5ca0113f2f4d6fc6dfc73f4_1440w.jpg\" /></p>\n<p>图22： 2026年2月21日的人工智能指数快照。</p>\n<h2><strong>6. MiniMax M2.5: 一个“仅”有 2300亿 参数的强大编码模型</strong></h2>\n<p>前面提到的 GLM-5 和 Kimi K2.5 是受欢迎的开源权重模型，但根据 OpenRouter 统计，它们与同样在 2 月 12 日发布的 MiniMax M2.5 相比，黯然失色。</p>\n<p><img alt=\"Image 23\" src=\"https://pica.zhimg.com/v2-17677110d30272b829ae7fbf5a4974ce_1440w.jpg\" /></p>\n<p>图23：2026年2月21日OpenRouter使用快照。</p>\n<p>OpenRouter 是一个平台和 API，允许开发者访问来自不同提供商的许多不同 LLM 并路由请求。注意，虽然其使用统计数据是开源权重模型受欢迎程度的一个良好指标，但它严重偏向于开源权重模型（相对于专有模型），因为大多数用户通过官方平台直接使用专有模型。开源权重模型之间也存在使用偏差，因为许多人还通过官方开发者的 API 使用开源权重模型。无论如何，对于大多数用户来说太大而无法在本地运行的模型，它仍然可以作为一个有趣的参考来估测其相对流行度。</p>\n<p>现在，回到 MiniMax M2.5。将来自 SWE-Bench Verified 编码基准测试的 GLM-5 数据与报告的 MiniMax M2.5 数据放在一起，后者似乎是一个稍强的模型（至少在编码方面）。</p>\n<p><img alt=\"Image 24\" src=\"https://pica.zhimg.com/v2-616595244a287fb543142d014cc5ac16_1440w.jpg\" /></p>\n<p>图24：MiniMax M2.5在SWE-Bench上的编码性能已验证</p>\n<p>旁注：有趣的是，Opus 4.5 和 Opus 4.6 在 SWE-Bench Verified 上的得分几乎相同。这可能是 LLM 进展停滞的一个指标。不过，我认为这不是真的，因为 Opus 4.6 的用户可以确认该模型在实际使用中确实表现更好。因此，这里更可能的问题是 SWE-Bench Verified 基准测试已经饱和，从现在开始报告它可能不再是一个有意义的基准测试（转而支持其他基准测试，例如 SWE-Bench Pro）。我所说的饱和，是指它可能由于设计问题而包含无法解决的问题（如最近 Reddit 讨论串和 OpenAI 的新文章《为什么 SWE-bench Verified 不再衡量前沿编码能力》中所讨论的）。</p>\n<p>无论如何，回到 MiniMax M2.5 性能的话题。从更广泛的基准测试来看，根据 Artificial Intelligence Index 的聚合，GLM-5 仍然领先。这可能不足为奇，因为 GLM-5 仍然是一个比 M2.5 大 4 倍的模型，尽管 tokens/秒 吞吐量非常相似。</p>\n<p><img alt=\"Image 25\" src=\"https://pica.zhimg.com/v2-21dc9aedc0dd7a73da555ee7b05dcdb0_1440w.jpg\" /></p>\n<p>图25：基于人工智能指数（2026年2月21日）的GLM-5与MiniMax M2.5对比</p>\n<p>我认为 MiniMax M2.5 的受欢迎程度部分归功于它是一个更小、更便宜的模型，具有大致相似的建模性能（即性价比高）。</p>\n<p>架构方面，MiniMax M2.5 是一个 2300亿 参数的模型，采用相当经典的设计：只是普通的分组查询注意力，没有滑动窗口注意力或其他效率改进。</p>\n<p><img alt=\"Image 26\" src=\"https://pic4.zhimg.com/v2-21530b1d683cd13ea13e0a11b1c80427_1440w.jpg\" /></p>\n<p>图26：MiniMax M2.5与GLM-5并列。</p>\n<p>到目前为止，这也是本报告中第一个没有附带详细技术报告的架构，但你可以在模型中心页面上找到更多信息。</p>\n<h2><strong>7. Nanbeige 4.1 3B: 一个强大的 Llama 3 继任者</strong></h2>\n<p>在本节中，我们将转换话题，最终介绍一个可以在笔记本电脑上本地运行的较小模型。但首先，在介绍 Nanbeige 4.1 3B 之前，让我们先了解一些背景。</p>\n<p>Qwen 模型一直是非常流行的模型。我经常讲一个故事，几年前我在 NeurIPS LLM 效率挑战赛期间担任顾问时，大多数获胜方案都基于 Qwen 模型。</p>\n<p>如今，Qwen3 可能是使用最广泛的开源权重模型套件之一，因为它们涵盖了如此广泛的规模和使用场景（从 0.6B 到 235B）。</p>\n<p>特别是较小的模型（80B 及以下，如前所述 Qwen3-Next）非常适合在消费级硬件上本地使用。</p>\n<p><img alt=\"Image 27\" src=\"https://pic4.zhimg.com/v2-c225e70f47c2d27c8a834bae59a74bf5_1440w.jpg\" /></p>\n<p>图27：开放权重模型的相对采用率。请注意，这显示了Hugging Face模型中心中以其中一个模型为基础进行微调的模型数量。（这并不是本地使用模型的人数，这个数字几乎无法确定。）来源：Atom Project。</p>\n<p>我提到这一切的原因是，Nanbeige 4.1 3B 似乎瞄准了 Qwen3 非常流行的“小型”LLM 设备端用例。根据 Nanbeige 4.1 3B 的基准测试，他们的模型远远领先于 Qwen3（鉴于 Qwen3 已发布近一年，这也许并不令人意外）。</p>\n<p><img alt=\"Image 28\" src=\"https://pic3.zhimg.com/v2-b5cdecfa803e30fe7640d81eb1da74d4_1440w.jpg\" /></p>\n<p>图28：南贝格4.1 3B基准与Qwen3的对比（来源：南贝格4.1 3B模型中心页面）。</p>\n<p>架构方面，Nanbeige 4.1 3B 类似于 Qwen3 4B，而 Qwen3 4B 又与 Llama 3.2 3B 非常相似。下面我将 Nanbeige 4.1 3B 放在 Llama 3.2 3B 旁边，因为它们在规模上最相似。</p>\n<p><img alt=\"Image 29\" src=\"https://pic3.zhimg.com/v2-26f246c41228359c293fc7add712865e_1440w.jpg\" /></p>\n<p>图29：南贝格4.1 3B与Llama 3.2 3B相邻。</p>\n<p>Nanbeige 4.1 3B 使用与 Llama 3.2 3B 相同的架构组件，只有一些轻微的规模差异（略小的嵌入维度和略大的中间投影等）。上图中未显示的一个区别是，Nanbeige 没有将输入嵌入权重绑定到输出层权重，而 Llama 3.2 3B 这样做了。（根据我的经验，权重绑定是减少总参数数量的一个好方法，但它几乎总是会导致较差的训练性能，表现为更高的训练和验证损失。）</p>\n<p>如前所述，本文主要关注架构比较。在这种情况下，大部分性能提升（与 Nanbeige 4 3B 前身相比）来自于额外的监督微调和强化学习后期训练，但感兴趣的读者可以在详细的技术报告中找到更多信息。</p>\n<h2>8. Qwen3.5 与混合注意力的延续</h2>\n<p>虽然前一节简要介绍了作为最流行的开源权重模型家族之一的 Qwen3，但它有点过时了，因为它的发布已将近一年（如果我们不考虑面向效率的 Qwen3-Next 变体的话）。然而，Qwen 团队刚刚在 2 月 15 日发布了一个新的 Qwen3.5 模型变体。</p>\n<p>Qwen3.5 397B-A17B，一个 3970亿 参数的混合专家模型（每个 token 激活 170亿），是最大的 Qwen3 模型（2350亿 参数）的升级版。（还有一个万亿参数的 Qwen3-Max 模型，但从未作为开源权重模型发布。）</p>\n<p>强制的基准测试概览显示，Qwen3.5 全面超越了之前的 Qwen3-Max 模型，并且更侧重于智能体终端编码应用（今年的主题）。Qwen3.5 在纯粹的智能体编码性能（例如，SWE-Bench Verified）方面似乎与 GLM-5 和 MiniMax M2.5 大致相当。</p>\n<p><img alt=\"Image 30\" src=\"https://pic2.zhimg.com/v2-949c1b5d3417003b28f3e5b894aec5db_1440w.jpg\" /></p>\n<p>图30：官方模型中心页面上的Qwen3.5基准测试概览。</p>\n<p>由于 Qwen 团队喜欢发布单独的编码模型（例如，参见我们之前讨论过的 Qwen3-Coder-Next），这让我很好奇潜在的 Qwen3.5-Coder 会表现如何。</p>\n<p>架构方面，Qwen3.5 采用了 Qwen3-Next 和 Qwen3-Coder-Next（第 4 节）使用的混合注意力模型（以 Gated DeltaNet 为特色）。这很有趣，因为 Qwen3-Next 模型最初是全注意力 Qwen3 模型的替代方案，但这表明 Qwen 团队现在已经将混合注意力机制采纳到其主要模型系列中。</p>\n<p><img alt=\"Image 31\" src=\"https://pica.zhimg.com/v2-d3f117aab5cc94a723c54c4ef8739dc0_1440w.jpg\" /></p>\n<p>图31：Qwen3.5与Qwen3（-Coder）-Next架构的比较。</p>\n<p>除了扩大模型规模，如上图所示，Qwen3.5 现在还包括多模态支持（以前，这仅在单独的 Qwen3-VL 模型中可用）。</p>\n<p>无论如何，Qwen3.5 是 Qwen 系列的一次不错的更新，我希望我们将来也能看到更小的 Qwen3.5 变体！</p>\n<p>编辑：就在我完成这篇文章时，Qwen 团队推出了上述较小的模型变体：</p>\n<ul>\n<li>Qwen3.5-27B</li>\n<li>Qwen3.5-35B-A3B</li>\n<li>Qwen3.5-122B-A10B</li>\n</ul>\n<h2><strong>9. 蚂蚁集团的 Ling 2.5 1T 与闪电注意力</strong></h2>\n<p>Ling 2.5（以及推理变体 Ring 2.5）是万亿参数的 LLM，采用混合注意力架构，其精神与 Qwen3.5 和 Qwen3-Next 相似。</p>\n<p>然而，他们没有使用 Gated DeltaNet，而是使用了一种稍微简单的循环线性注意力变体，称为闪电注意力。此外，Ling 2.5 采用了 DeepSeek 的多头潜在注意力机制。</p>\n<p><img alt=\"Image 32\" src=\"https://picx.zhimg.com/v2-fc06618e7ee5f1f24bb30c70cf96dfe5_1440w.jpg\" /></p>\n<p>图32：灵2.5对比Qwen3.5;这两种架构都是线性注意力混合体。</p>\n<p>就绝对基准性能而言，Ling 2.5 不是最强的模型，但其卖点是在长上下文中具有非常好的效率（由于混合注意力）。不幸的是，没有与 Qwen3.5 的直接比较，但与 Kimi K2（1万亿参数；与 Ling 2.5 规模相同）相比，Ling 2.5 在序列长度为 32k token 时实现了 3.5 倍的吞吐量。</p>\n<p><img alt=\"Image 33\" src=\"https://pic1.zhimg.com/v2-d3e2ed8760bb9478247dd7bd71eace96_1440w.jpg\" /></p>\n<p>图33：Ling 2.5与Kimi K2的相对吞吐量（相同1万亿参数大小）;注意通量被归一化，Kimi K2显示为1倍（Kimi的吞吐量并非线性，尽管图中看起来线性）。来源：Ling 2.5 型号集线器页面。</p>\n<h2><strong>10. Tiny Aya: 一个具有强大多语言支持的 33.5亿 参数模型</strong></h2>\n<p>Tiny Aya 于 2 月 17 日发布，是 Cohere 推出的一个全新的“小型”LLM，据称是 30亿 参数规模级别中“能力最强的多语言开源权重模型”。（根据公告文章，Tiny Aya 优于 Qwen3-4B、Gemma 3 4B 和 Ministral 3 3B）。</p>\n<p>这是一个非常适合在本地运行和实验的模型。唯一的缺点是，虽然它是一个开源权重模型，但其许可条款相对受限，仅允许非商业用途。</p>\n<p>撇开这一点不谈，Aya 是一个 33.5亿 参数的模型，有几种不同的版本，对个人和（非商业）研究用途很有帮助：</p>\n<ul>\n<li>tiny-aya-base（基础模型）</li>\n<li>tiny-aya-global（跨语言和地区的最佳平衡）</li>\n<li>tiny-aya-fire（针对南亚语言优化）</li>\n<li>tiny-aya-water（针对欧洲和亚太语言优化）</li>\n<li>tiny-aya-earth（针对西亚和非洲语言优化）</li>\n</ul>\n<p>更具体地说，以下是这些模型所针对的语言列表。</p>\n<p><img alt=\"Image 34\" src=\"https://picx.zhimg.com/v2-2e508d30342b40c3a44562807b7ebb11_1440w.jpg\" /></p>\n<p>图34：各Aya模型支持的语言。</p>\n<p>架构方面，Tiny Aya 是一个经典的解码器风格 Transformer，带有一些值得注意的修改（除了明显的如 SwiGLU 和分组查询注意力之外），如下图所示。</p>\n<p><img alt=\"Image 35\" src=\"https://pic2.zhimg.com/v2-da8ba734948f1c043dfdbe9b30b337db_1440w.jpg\" /></p>\n<p>图35：Tiny Aya（并联变压器模块）与Qwen3 4B并排。</p>\n<p>总体而言，该架构中最值得注意的亮点是并行 Transformer 块。在这里，并行 Transformer 块从相同的归一化输入计算注意力和 MLP，然后在一个步骤中将两者都添加到残差中。我假设这是为了减少层内的串行依赖关系，以提高计算吞吐量。</p>\n<p>对于那些熟悉 Cohere 的 Command-A 架构的读者来说，Tiny Aya 似乎是它的一个较小版本。此外，一个有趣的细节是，Tiny Aya 团队放弃了 QK-Norm（一种应用于注意力机制内部的键和查询的 RMSNorm）；QK-Norm 在减少损失峰值方面，对于提高训练稳定性已经变得相当标准。据 Cohere 团队的一位开发人员称，放弃 QK-Norm 是因为“它可能与长上下文性能相互作用”。</p>\n<p>如你所知，我偶尔会从头开始编写架构代码。由于我发现并行 Transformer 块非常有趣，而且该模型在低端硬件上运行良好，我出于教育目的从头实现了它，你可以在 GitHub 上找到它。</p>\n<p><img alt=\"Image 36\" src=\"https://pic3.zhimg.com/v2-5d3b9fad1cab3e28eca61b69ec69a496_1440w.jpg\" /></p>\n<p>图36：从零开始实现微型Aya。</p>\n<h2><strong>结论</strong></h2>\n<p>这篇文章是一次旋风式的旅行，涵盖了 2026 年 2 月左右主要的开源权重 LLM 发布。如果说有什么收获的话，那就是存在多种运行良好的模型架构（都源自最初的 GPT 模型）。建模性能可能并不归因于架构设计本身，而是归因于数据集质量和训练方法（这是一个适合单独讨论的话题）。</p>\n<p>话虽如此，架构设计仍然是构建成功 LLM 的重要组成部分，许多开发者似乎正朝着增加更多计算性能调整的方向发展。例如，这包括采用 MLA（Kimi K2.5、GLM-5、Ling 2.5）和 DeepSeek 稀疏注意力（GLM-5）以延续 Gated DeltaNet（Qwen3.5）或类似形式的线性注意力（Ling 2.5）。</p>\n<p><img alt=\"Image 37\" src=\"https://pic3.zhimg.com/v2-31b59172a0f236f2ad39fe5dd24cbec4_1440w.jpg\" /></p>\n<p>图37：本文提及的各种架构所使用的注意力类型。</p>\n<p>此外，更经典的效率调整，如分组查询注意力和滑动窗口注意力（Arcee Trinity、Step 3.5 Flash、Tiny Aya）仍然很受欢迎。在新发布的模型中，只有 MiniMax M2.5 和 Nanbeige 4.1 在此方面保持非常经典，仅使用分组查询注意力，没有任何其他效率调整。</p>\n<h2><strong>DeepSeek V4</strong></h2>\n<p>DeepSeek V4 是每个人都在期待的模型。不幸的是，截至本文撰写时，它尚未发布。不过，我计划一旦它发布，就将其添加到本文中，很可能是在 3 月的第一周或之前。</p>\n<p>另一个有趣的模型是来自印度的 Sarvam（30B 和 100B）。该模型最近被宣布，但尚未发布。请继续关注此处的更新。</p>\n<h2><strong>更新 1: Sarvam 30B 和 105B (2026 年 3 月 6 日)</strong></h2>\n<p>正如所承诺的，这里是关于 Sarvam 的简短更新。</p>\n<p>在等待 DeepSeek V4 的同时，我们迎来了两个来自印度的非常强大的开源权重 LLM。</p>\n<p>有两个规模版本，Sarvam 30B 和 Sarvam 105B 模型（都是推理模型），它们于 3 月 6 日作为开源权重模型发布，并附带了一篇相当详细的公告博客。</p>\n<p>有趣的是，较小的 30B 模型使用“经典的”分组查询注意力，而较大的 105B 变体则切换到了 DeepSeek 风格的多头潜在注意力。</p>\n<p><img alt=\"Image 38\" src=\"https://picx.zhimg.com/v2-19b1d190475a2013511f0d2cc2178a79_1440w.jpg\" /></p>\n<p>图37：Sarvam 30B和105B架构</p>\n<p>正如我之前在分析中所写的，两者都是流行的注意力变体，用于减少 KV 缓存大小（上下文越长，与常规注意力相比节省的越多）。</p>\n<p><img alt=\"Image 39\" src=\"https://pic4.zhimg.com/v2-84f6d36a6145e10eaf1d0c87fb3d6f23_1440w.jpg\" /></p>\n<p>图38：GQA和MLA相较于MHA的相对效率。</p>\n<p>MLA 实现起来更复杂，但如果我们根据 2024 年 DeepSeek V2 论文中的消融研究来判断，它可以提供更好的建模性能（据我所知，这仍然是最新的同类比较）。</p>\n<p>说到建模性能，105B 模型与类似规模的 LLM 相当：gpt-oss 120B 和 Qwen3-Next (80B)。Sarvam 在某些任务上更好，在其他任务上稍差，但平均大致相同。</p>\n<p><img alt=\"Image 40\" src=\"https://pic1.zhimg.com/v2-43dd0447e2d8689ae86653e6550c5502_1440w.jpg\" /></p>\n<p>图39：Sarvam博客文章中的注释基准（105B模型），每行中最佳模型被高亮显示。</p>\n<p>就 SWE-Bench Verified 而言，它不是最强的编码器，但在智能体推理和任务完成（Tau2）方面出奇地好。它甚至比 Deepseek R1 0528（未在上图中显示）还要好。</p>\n<p>考虑到较小的 Sarvam 30B，与 30B 模型最可比的模型可能是 Nemotron 3 Nano 30B，后者在编码（SWE-Bench Verified）和智能体推理（Tau2）方面略微领先，但在其他一些方面（Live Code Bench v6， BrowseComp）稍差。</p>\n<p><img alt=\"Image 41\" src=\"https://pic2.zhimg.com/v2-be23e6793ad5536ed796e70037f8db83_1440w.jpg\" /></p>\n<p>图39：Sarvam博客文章中的注释基准（30B模型），每行中最佳模型被高亮标示。</p>\n<p>不幸的是，上述基准测试中缺少 Qwen3-30B-A3B，据我所知，这是该规模级别中最受欢迎的模型。然而，有趣的是，Sarvam 团队在计算性能分析中将他们的 30B 模型与 Qwen3-30B-A3B 进行了比较，他们发现由于代码和内核优化，Sarvam 的 tokens/秒 吞吐量比 Qwen3 高出 20-40%。</p>\n<p>上述基准测试未捕捉到的一点是 Sarvam 在印度语言上的良好表现。根据一个评判模型，Sarvam 团队发现，在处理印度文本时，他们的模型在 90% 的情况下优于其他模型。（由于他们也从头开始构建和训练分词器，Sarvam 在印度语言上的 token 效率也高出 4 倍。）</p>"
    }
  ],
  "graph": {
    "nodes": [
      {
        "id": "transformer",
        "x": 80,
        "y": 80,
        "category": "architecture"
      },
      {
        "id": "gpt",
        "x": 180,
        "y": 220,
        "category": "autoregressive"
      },
      {
        "id": "bert",
        "x": 180,
        "y": 80,
        "category": "architecture"
      },
      {
        "id": "transformer_xl",
        "x": 260,
        "y": 500,
        "category": "long_context"
      },
      {
        "id": "gpt2",
        "x": 280,
        "y": 220,
        "category": "autoregressive"
      },
      {
        "id": "t5",
        "x": 300,
        "y": 80,
        "category": "architecture"
      },
      {
        "id": "gpt3",
        "x": 400,
        "y": 220,
        "category": "autoregressive"
      },
      {
        "id": "switch_transformer",
        "x": 500,
        "y": 640,
        "category": "sparse_moe"
      },
      {
        "id": "rope",
        "x": 500,
        "y": 80,
        "category": "architecture"
      },
      {
        "id": "glam",
        "x": 580,
        "y": 640,
        "category": "sparse_moe"
      },
      {
        "id": "chinchilla",
        "x": 620,
        "y": 220,
        "category": "autoregressive"
      },
      {
        "id": "palm",
        "x": 650,
        "y": 220,
        "category": "autoregressive"
      },
      {
        "id": "llama",
        "x": 760,
        "y": 360,
        "category": "open_foundation"
      },
      {
        "id": "gpt4",
        "x": 790,
        "y": 220,
        "category": "autoregressive"
      },
      {
        "id": "retnet",
        "x": 820,
        "y": 500,
        "category": "long_context"
      },
      {
        "id": "llama2",
        "x": 840,
        "y": 360,
        "category": "open_foundation"
      },
      {
        "id": "mistral7b",
        "x": 900,
        "y": 360,
        "category": "open_foundation"
      },
      {
        "id": "mamba",
        "x": 920,
        "y": 500,
        "category": "long_context"
      },
      {
        "id": "mixtral",
        "x": 960,
        "y": 640,
        "category": "sparse_moe"
      },
      {
        "id": "deepseek_moe",
        "x": 980,
        "y": 700,
        "category": "sparse_moe"
      },
      {
        "id": "gemini15",
        "x": 1000,
        "y": 500,
        "category": "long_context"
      },
      {
        "id": "deepseek_v2",
        "x": 1040,
        "y": 700,
        "category": "sparse_moe"
      },
      {
        "id": "llama3",
        "x": 1060,
        "y": 360,
        "category": "open_foundation"
      },
      {
        "id": "qwen25",
        "x": 1120,
        "y": 360,
        "category": "open_foundation"
      },
      {
        "id": "deepseek_v3",
        "x": 1140,
        "y": 700,
        "category": "sparse_moe"
      },
      {
        "id": "minimax01",
        "x": 1180,
        "y": 500,
        "category": "long_context"
      },
      {
        "id": "llama4",
        "x": 1240,
        "y": 640,
        "category": "sparse_moe"
      },
      {
        "id": "qwen3",
        "x": 1260,
        "y": 700,
        "category": "sparse_moe"
      },
      {
        "id": "minimax_m1",
        "x": 1320,
        "y": 500,
        "category": "long_context"
      },
      {
        "id": "kimi_k2",
        "x": 1340,
        "y": 640,
        "category": "sparse_moe"
      },
      {
        "id": "glm45",
        "x": 1380,
        "y": 700,
        "category": "sparse_moe"
      },
      {
        "id": "gpt5",
        "x": 1460,
        "y": 780,
        "category": "frontier_2026"
      },
      {
        "id": "yuan30_ultra",
        "x": 1480,
        "y": 840,
        "category": "frontier_2026"
      },
      {
        "id": "latent_moe",
        "x": 1500,
        "y": 900,
        "category": "frontier_2026"
      },
      {
        "id": "ernie5",
        "x": 1540,
        "y": 840,
        "category": "frontier_2026"
      },
      {
        "id": "eurollm22b",
        "x": 1560,
        "y": 780,
        "category": "frontier_2026"
      },
      {
        "id": "mellum2",
        "x": 1620,
        "y": 900,
        "category": "frontier_2026"
      }
    ],
    "edges": [
      {
        "from": "transformer",
        "to": "gpt",
        "label": "解码器预训练"
      },
      {
        "from": "transformer",
        "to": "bert",
        "label": "双向编码"
      },
      {
        "from": "transformer",
        "to": "transformer_xl",
        "label": "分段递归"
      },
      {
        "from": "transformer",
        "to": "t5",
        "label": "文本到文本"
      },
      {
        "from": "transformer",
        "to": "rope",
        "label": "旋转位置"
      },
      {
        "from": "gpt",
        "to": "gpt2",
        "label": "扩大网页预训"
      },
      {
        "from": "gpt2",
        "to": "gpt3",
        "label": "少样本涌现"
      },
      {
        "from": "t5",
        "to": "switch_transformer",
        "label": "稀疏专家"
      },
      {
        "from": "switch_transformer",
        "to": "glam",
        "label": "高效MoE"
      },
      {
        "from": "gpt3",
        "to": "chinchilla",
        "label": "计算最优"
      },
      {
        "from": "gpt3",
        "to": "palm",
        "label": "Pathways扩展"
      },
      {
        "from": "chinchilla",
        "to": "llama",
        "label": "开源数据"
      },
      {
        "from": "gpt3",
        "to": "gpt4",
        "label": "可预测扩展"
      },
      {
        "from": "transformer_xl",
        "to": "retnet",
        "label": "递归推理"
      },
      {
        "from": "llama",
        "to": "llama2",
        "label": "开放对话"
      },
      {
        "from": "llama",
        "to": "mistral7b",
        "label": "GQA滑窗"
      },
      {
        "from": "transformer",
        "to": "mamba",
        "label": "线性替代"
      },
      {
        "from": "mistral7b",
        "to": "mixtral",
        "label": "Top2专家"
      },
      {
        "from": "switch_transformer",
        "to": "deepseek_moe",
        "label": "专家细分"
      },
      {
        "from": "palm",
        "to": "gemini15",
        "label": "长上下文"
      },
      {
        "from": "deepseek_moe",
        "to": "deepseek_v2",
        "label": "MLA缓存压缩"
      },
      {
        "from": "llama2",
        "to": "llama3",
        "label": "405B稠密"
      },
      {
        "from": "llama3",
        "to": "qwen25",
        "label": "开放竞争"
      },
      {
        "from": "deepseek_v2",
        "to": "deepseek_v3",
        "label": "无辅助损失"
      },
      {
        "from": "mixtral",
        "to": "minimax01",
        "label": "混合注意力"
      },
      {
        "from": "llama3",
        "to": "llama4",
        "label": "Llama转MoE"
      },
      {
        "from": "qwen25",
        "to": "qwen3",
        "label": "稠密+MoE"
      },
      {
        "from": "minimax01",
        "to": "minimax_m1",
        "label": "测试时扩展"
      },
      {
        "from": "deepseek_v3",
        "to": "kimi_k2",
        "label": "MuonClip"
      },
      {
        "from": "deepseek_v3",
        "to": "glm45",
        "label": "ARC能力"
      },
      {
        "from": "gpt4",
        "to": "gpt5",
        "label": "系统路由"
      },
      {
        "from": "deepseek_v3",
        "to": "yuan30_ultra",
        "label": "万亿MoE"
      },
      {
        "from": "deepseek_v3",
        "to": "latent_moe",
        "label": "服务感知MoE"
      },
      {
        "from": "qwen3",
        "to": "ernie5",
        "label": "超稀疏统一"
      },
      {
        "from": "qwen25",
        "to": "eurollm22b",
        "label": "多语言定制"
      },
      {
        "from": "minimax_m1",
        "to": "mellum2",
        "label": "小激活MoE"
      }
    ],
    "milestones": [
      "transformer",
      "gpt3",
      "llama",
      "deepseek_v3",
      "ernie5"
    ]
  },
  "algos": [
    {
      "id": "transformer",
      "num": 1,
      "name": "Transformer",
      "fullName": "Transformer 架构 (Attention Is All You Need)",
      "year": "2017.06",
      "org": "Google Brain / Google Research",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1706.03762",
      "projectUrl": "",
      "category": "architecture",
      "motivation": "自注意力替代循环卷积",
      "summary": "Transformer 提出完全基于注意力机制的 encoder-decoder 序列转换架构，用多头自注意力和位置编码替代循环、卷积结构，解决了 RNN 训练串行、长程依赖路径长的问题。它在 WMT 2014 机器翻译上以更低训练成本达到当时领先结果，并成为后续 GPT、BERT 等大模型的基础架构。",
      "keyPoints": [
        "提出只依赖 attention 的序列转换模型，不使用 RNN 或 CNN 来传递序列状态。",
        "采用 encoder-decoder 堆叠结构：原论文 base 模型中 encoder 和 decoder 各堆叠 6 层。",
        "每个 encoder 层包含 multi-head self-attention 与 position-wise FFN，并配合 residual connection 与 layer normalization。",
        "每个 decoder 层额外加入 encoder-decoder attention，并用 masked self-attention 阻止当前位置访问未来 token。",
        "定义 scaled dot-product attention：用 <span class=\"kb-math kb-math-inline\">QK^\\top / \\sqrt{d_k}</span> 控制点积幅度，避免 softmax 进入梯度很小的饱和区。",
        "使用 multi-head attention：把 Q/K/V 投影到多个子空间并行计算，使模型能同时捕获局部、长程、句法或对齐关系。",
        "用正弦/余弦位置编码补充 token 顺序信息，使无递归模型仍能感知绝对与相对位置。",
        "训练上使用 Adam、warmup + inverse square-root 学习率调度、dropout、label smoothing 和 beam search 解码。",
        "复杂度权衡明确：训练并行度远高于 RNN，任意两个位置的依赖路径为 <span class=\"kb-math kb-math-inline\">O(1)</span>，代价是全局自注意力的 <span class=\"kb-math kb-math-inline\">O(n^2)</span> 序列长度开销。"
      ],
      "detail": "<p><img alt=\"Transformer 架构图\" src=\"https://arxiv.org/html/1706.03762v7/Figures/ModalNet-21.png\" />\n<em>图：Transformer 的 encoder-decoder 总体结构。左侧 encoder 由自注意力和前馈网络堆叠，右侧 decoder 在 masked self-attention 之后通过 cross-attention 读取 encoder 输出。</em></p>\n<pre><code class=\"language-python\">def scaled_dot_product_attention(Q, K, V, mask=None):\n    scores = (Q @ K.T) / sqrt(d_k)\n    if mask is not None:\n        scores = scores.masked_fill(mask == 0, -float(&quot;inf&quot;))\n    weights = softmax(scores, dim=-1)\n    return weights @ V\n\ndef multi_head_attention(x_q, x_k, x_v, heads, mask=None):\n    head_outputs = []\n    for h in range(heads):\n        Q = x_q @ W_q[h]\n        K = x_k @ W_k[h]\n        V = x_v @ W_v[h]\n        head_outputs.append(scaled_dot_product_attention(Q, K, V, mask=mask))\n    return concat(head_outputs) @ W_o\n\ndef encoder_layer(x):\n    x = layer_norm(x + multi_head_attention(x, x, x, heads=8))\n    x = layer_norm(x + feed_forward(x))  # max(0, xW1+b1)W2+b2\n    return x\n\ndef decoder_layer(y, encoder_output):\n    y = layer_norm(y + multi_head_attention(y, y, y, heads=8, mask=causal_mask))\n    y = layer_norm(y + multi_head_attention(y, encoder_output, encoder_output, heads=8))\n    y = layer_norm(y + feed_forward(y))\n    return y\n\ndef transformer(source_tokens, target_prefix):\n    src = token_embedding(source_tokens) + sinusoidal_position_encoding(source_tokens)\n    memory = repeat(encoder_layer, times=6)(src)\n    tgt = token_embedding(target_prefix) + sinusoidal_position_encoding(target_prefix)\n    decoded = repeat(decoder_layer, times=6)(tgt, memory)\n    return softmax(decoded @ W_vocab)\n</code></pre>\n<p>Transformer 的出发点是计算图路径和并行性。RNN 必须按时间步递推，训练样本内部很难并行，而且两个相距 <span class=\"kb-math kb-math-inline\">n</span> 的 token 之间要经过 <span class=\"kb-math kb-math-inline\">O(n)</span> 次状态变换；卷积模型能并行，但要靠多层堆叠或扩张卷积扩大感受野。Transformer 让序列内任意两个位置在一个 self-attention 层中直接交互，把长程依赖路径缩到常数级，同时可以用矩阵乘法一次性处理整段序列。</p>\n<p>Scaled dot-product attention 的公式是：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{Attention}(Q,K,V)=\\mathrm{softmax}\\left(\\frac{QK^\\top}{\\sqrt{d_k}}\\right)V</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">Q</span> 表示“当前位置要找什么”，<span class=\"kb-math kb-math-inline\">K</span> 表示“每个位置提供什么索引”，<span class=\"kb-math kb-math-inline\">V</span> 表示“被取出的内容”。如果不除以 <span class=\"kb-math kb-math-inline\">\\sqrt{d_k}</span>，高维向量点积的方差会随 <span class=\"kb-math kb-math-inline\">d_k</span> 增大，softmax 容易接近 one-hot，导致梯度变小。缩放项的作用不是改变注意力语义，而是让注意力分数处在更稳定的数值区间。</p>\n<p>Multi-head attention 的设计解决了单头注意力“平均掉不同关系”的问题：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{MultiHead}(Q,K,V)=\\mathrm{Concat}(\\mathrm{head}_1,\\ldots,\\mathrm{head}_h)W^O</div>\n<div class=\"kb-math kb-math-display\">\\mathrm{head}_i=\\mathrm{Attention}(QW_i^Q,KW_i^K,VW_i^V)</div>\n<p>原论文 base 设置使用 <span class=\"kb-math kb-math-inline\">h=8</span>、<span class=\"kb-math kb-math-inline\">d_{model}=512</span>、每头 <span class=\"kb-math kb-math-inline\">d_k=d_v=64</span>。每个头在独立投影空间里学习一种对齐模式，例如相邻词依赖、远距离指代、源-目标词对齐等。由于每头维度降低，多头总计算量接近单个全维注意力，但表达能力更强。</p>\n<p>Encoder 和 decoder 的职责不同。Encoder 的 self-attention 可以看到源序列所有位置，输出一组上下文表示；decoder 的第一层 attention 必须使用 causal mask，将未来位置对应的 logits 置为 <span class=\"kb-math kb-math-inline\">-\\infty</span>，保证自回归生成时第 <span class=\"kb-math kb-math-inline\">t</span> 个 token 只能依赖 <span class=\"kb-math kb-math-inline\">&lt;t</span> 的前缀；decoder 的第二个 attention 是 cross-attention，query 来自 decoder 当前状态，key/value 来自 encoder 输出，相当于在每个生成步动态读取源句信息。</p>\n<p>因为 attention 本身没有顺序概念，Transformer 在输入 embedding 上加位置编码。论文采用固定正弦/余弦形式：</p>\n<div class=\"kb-math kb-math-display\">PE_{(pos,2i)}=\\sin\\left(\\frac{pos}{10000^{2i/d_{model}}}\\right)</div>\n<div class=\"kb-math kb-math-display\">PE_{(pos,2i+1)}=\\cos\\left(\\frac{pos}{10000^{2i/d_{model}}}\\right)</div>\n<p>不同维度对应不同频率，模型可以组合这些信号来判断绝对位置；同时，由于三角函数的线性关系，固定偏移 <span class=\"kb-math kb-math-inline\">k</span> 的位置编码可由当前位置编码线性表示，这给学习相对位置提供了有用归纳偏置。论文也测试了可学习位置 embedding，效果接近，但固定正弦编码更自然地支持长度外推。</p>\n<p>训练流程仍是标准 teacher forcing。源句经过 encoder 一次计算得到 memory；目标句右移后输入 decoder，模型在每个位置预测下一个 token，并用交叉熵训练。优化器使用 Adam，<span class=\"kb-math kb-math-inline\">\\beta_1=0.9</span>、<span class=\"kb-math kb-math-inline\">\\beta_2=0.98</span>、<span class=\"kb-math kb-math-inline\">\\epsilon=10^{-9}</span>，学习率先 warmup 后按步数平方根倒数衰减；dropout 和 label smoothing 分别改善泛化和过度自信。推理时 encoder 输出可缓存，decoder 逐 token 自回归生成，原论文使用 beam search 和长度惩罚。</p>\n<p>与 RNN/CNN 的关键区别不只是模块替换，而是信息流拓扑改变。RNN 将序列压进一个逐步更新的隐藏状态，优势是天然顺序建模，劣势是串行；CNN 通过局部核和层数扩大上下文，优势是并行，劣势是长距离路径仍依赖深度；Transformer 让每一层的每个位置都能全局读取其它位置，所以更适合大规模并行训练。后续长上下文工作，如 Transformer-XL、稀疏注意力、线性注意力，主要是在保留这种全局交互思想的同时降低 <span class=\"kb-math kb-math-inline\">O(n^2)</span> 成本或扩展上下文长度。</p>\n<div class=\"key-point\">💡 关键：Transformer 的真正突破是把序列建模的“时间递推”改成“内容寻址”，用 attention 权重决定信息从哪些 token 流向当前 token。</div>",
      "quiz": {
        "q": "Transformer 中 scaled dot-product attention 除以 \\(\\sqrt{d_k}\\) 的主要原因是什么？",
        "options": [
          "让每个注意力头拥有不同参数量",
          "降低点积分数方差，避免 softmax 饱和导致梯度过小",
          "把绝对位置编码转成相对位置编码",
          "减少 decoder 的自回归生成步数"
        ],
        "answer": 1,
        "explain": "当 \\(d_k\\) 增大时，未缩放点积容易取值过大，使 softmax 接近饱和。除以 \\(\\sqrt{d_k}\\) 能稳定分数尺度。"
      }
    },
    {
      "id": "gpt",
      "num": 2,
      "name": "GPT",
      "fullName": "生成式预训练 Transformer (Generative Pre-Training)",
      "year": "2018.06",
      "org": "OpenAI",
      "parent": "transformer",
      "paperUrl": "https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf",
      "projectUrl": "",
      "category": "autoregressive",
      "motivation": "解码器预训练统一迁移",
      "summary": "GPT 提出“生成式预训练 + 判别式微调”的两阶段范式：在大量无标签语料上训练一个单向 Transformer 语言模型，再为目标任务引入输入变换和微调，大幅降低了对有监督标注数据的依赖，在 12 项 NLP 基准中 9 项刷新最佳结果。",
      "keyPoints": [
        "采用 12 层 Transformer <strong>decoder-only</strong> 架构（768 维，12 头），仅使用 Masked Self-Attention 保持从左到右的自回归约束",
        "第一阶段：在 <strong>BooksCorpus</strong>（7,000+ 本未出版书籍）上做生成式预训练，建模长距离连续文本的语言规律",
        "第二阶段：引入 <strong>traversal-style</strong> 输入变换，将各类 NLP 任务（蕴含、问答、相似度、分类）统一为连续 token 序列，并在微调时加入辅助语言建模目标（Auxiliary LM Objective）",
        "辅助 LM 目标作为正则项：<span class=\"kb-math kb-math-inline\">L = L_{cls} + \\lambda \\cdot L_{lm}</span>，提升大数数集的泛化能力，加速收敛",
        "在 12 个下游任务上验证，全面超越当时的 SOTA（包括 RACE、RTE、SNLI 等 9/12）；零样本生成行为随预训练推进稳定提升"
      ],
      "detail": "<p><img alt=\"GPT 架构图\" src=\"https://raw.githubusercontent.com/openai/finetune-transformer-lm/master/assets/gpt_schema.png\" />\n<em>图：GPT 两阶段训练框架。左：Transformer 架构与预训练过程；右：不同下游任务（分类、蕴含、相似度、多项选择）的输入变换方案。</em></p>\n<h5>动机与背景</h5>\n<p>深度学习方法虽然能在大量有监督数据上取得优异表现，但大量领域缺乏足够的标注数据。传统 NLP 依赖精心设计的任务特定模型和人工特征，迁移能力不足。GPT 的核心动机是：<strong>能否从海量无标签文本中学习出通用语言表征，再将其快速迁移到不同有监督任务上？</strong></p>\n<p>ElMo 等基于 LSTM 的双向语言模型嵌入方法受限于浅层特征融合，而 Transformer 在处理长距离依赖上天然更优（得益于自注意力机制）。GPT 的关键洞察是：用 <strong>单向自回归的 Transformer</strong> 做生成式预训练，既可充分利用大规模文本，又无需修改模型结构即可适配不同的判别式微调任务。</p>\n<h5>预训练阶段</h5>\n<p>给定无标签语料 token 序列 <span class=\"kb-math kb-math-inline\">\\mathcal{U} = \\{u_1, \\dots, u_n\\}</span>，标准语言模型目标为最大化：</p>\n<div class=\"kb-math kb-math-display\">L_1(\\mathcal{U}) = \\sum_i \\log P(u_i \\mid u_{i-k}, \\dots, u_{i-1}; \\Theta)</div>\n<p>模型先过一层 Text &amp; Position Embedding（位置用学习式，非 sinusoid），再堆叠 <strong>12 层 Masked Decoder Block</strong>。每层包含：</p>\n<ul>\n<li>Masked Multi-Head Self-Attention（mask 保证第 <span class=\"kb-math kb-math-inline\">i</span> 个 token 只能看到 <span class=\"kb-math kb-math-inline\">&lt;i</span> 的位置）</li>\n<li>Layer Normalization + Residual Connection</li>\n<li>两层 Position-wise Feed-Forward（GELU 激活，内层维度 3072）</li>\n</ul>\n<p>最后经 softmax 输出 <span class=\"kb-math kb-math-inline\">P(u_i | \\text{context})</span>。训练数据集 <strong>BooksCorpus</strong> 包含约 7,000 本未出版书籍（~1B words），远大于 1B Word Benchmark，且以长段落为主，有助于模型学习长程依赖。训练细节：BPE subword 40,000 合并（堆用 spaCy ftfy）、Adam(lr=2.5e-4)、batch 64、sequence 512、epoch 100，weight decay 0.01。</p>\n<h5>微调阶段与输入变换</h5>\n<p>微调时的核心挑战是：<strong>如何用同一个预训练 LM 处理不同形状的 NLP 任务</strong>（如两个句子的蕴含判断、含上下文的答案选择）。GPT 引入 <strong>traversal-style</strong> 输入变换：</p>\n<ul>\n<li><strong>文本蕴含（Entailment）</strong>：将 premise 和 hypothesis 拼接为 <code>[Start] premise $ hypothesis [Extract]</code>，取最后一个 token 的隐藏层表示进行分类。</li>\n<li><strong>语义相似度</strong>：由于句子对无序，构造两种拼接顺序 <code>文本1 $ 文本2</code> 与 <code>文本2 $ 文本1</code>，将两个表示按元素加和后进行线性变换。</li>\n<li><strong>多项选择（QA）</strong>：将上下文与每个候选答案分别拼接后独立处理，取 softmax 归一后的分数。</li>\n<li><strong>单句分类</strong>：直接 <code>[Start] 文本 [Extract]</code>。</li>\n</ul>\n<p>微调损失包括两部分：</p>\n<div class=\"kb-math kb-math-display\">L = L_{cls} + \\lambda \\cdot L_{lm}, \\quad L_{cls} = \\sum_{(x,y)} \\log P(y|x)</div>\n<p><span class=\"kb-math kb-math-inline\">L_{lm}</span> 是<strong>辅助语言建模目标</strong>，即在微调数据上持续优化 LM 损失。论文实验发现：<span class=\"kb-math kb-math-inline\">\\lambda = 0.5</span> 在大数据集（如 SNLI ~550k）上明显提分（+1.5–2%），小数据集上不显著或略微负面，视为正则项。</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>架构</th>\n<th>迁移方式</th>\n<th>任务适配</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>ElMo</td>\n<td>Bi-LSTM</td>\n<td>冻结嵌入拼接</td>\n<td>需任务特定架构</td>\n</tr>\n<tr>\n<td>ULMFiT</td>\n<td>LSTM</td>\n<td>分层微调</td>\n<td>需判别式/层取 LR</td>\n</tr>\n<tr>\n<td><strong>GPT</strong></td>\n<td><strong>Transformer Decoder</strong></td>\n<td><strong>两阶段预微调</strong></td>\n<td>traversal-style 输入统一</td>\n</tr>\n</tbody>\n</table></div>\n<p>GPT 的关键创新在于 <strong>task-agnostic backbone</strong>：不做架构改动，靠输入层的文本拼接在 12 个任务上工作。且 GPT 首次在大规模长文本（BooksCorpus）上验证了 Transformer LM 的迁移能力，“long-range”预训练是核心。</p>\n<div class=\"key-point\">💡 关键：单向（left-to-right）masked self-attention 是 GPT 与 BERT 的最大区别——后者双向，更适合理解任务；GPT 的生成式先天更适合文本生成，但理解任务通过 traversal-style 转换得以弥补。</div>\n<h5>深度分析与消融</h5>\n<ol>\n<li>\n<p><strong>层次迁移增益</strong>（图 2 左）：每叠加一个预训练层，性能单调上升。24 层全转移比仅用 embeddings 高 <strong>9%</strong>（MultiNLI），充分说明各层学到的语义功能均有价值。</p>\n</li>\n<li>\n<p><strong>零样本行为</strong>（图 2 右）：随预训练步数增加，零样本启发式性能（SST-2、CoLA 等）稳定提高，说明生成式预训练在语言建模过程中<strong>自发习得了广泛的任务相关功能</strong>。LSTM 零样本方差大，Transformer 的归纳偏置更利于迁移。</p>\n</li>\n<li>\n<p><strong>消融实验</strong>（Table 5）：</p>\n</li>\n<li>去掉辅助 LM：NLI/QPP 下降明显（1–2%），小数据集反而略好或持稳 → 辅助 LM 主要对大数据集有益</li>\n<li>换为 2048 单元 LSTM：总分降 <strong>5.6 分</strong>，MRPC 除外 → Transformer 模型家结构优势明显</li>\n<li>去掉预训练：总分降 <strong>14.8%</strong> → 预训练是性能的核心来源</li>\n</ol>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># ==== 阶段一：生成式预训练 ====\nfor epoch in range(100):\n    for batch in BooksCorpus_iter(batch_size=64, seq_len=512):\n        x = text_to_bpe(batch)          # Byte-Pair Encoding\n        logits = transformer_decoder(x) # 单向 masked self-attn\n        loss_lm = cross_entropy(logits[:, :-1], x[:, 1:])\n        adam.step(loss_lm, lr=2.5e-4, sche dual_cosine)\n\n# ==== 阶段二：判别式微调 ====\nfor epoch in range(3):  # 下游任务仅 3 epoch\n    for batch in task_data_iter():\n        x, y = traversal_style_transform(batch)  # 特殊 token 分隔\n        h = transformer_decoder(x)\n        loss_cls = cross_entropy(linear(h_last), y)\n        loss_lm  = cross_entropy(logits[:, :-1], x[:, 1:])  # 辅助 LM\n        loss = loss_cls + 0.5 * loss_lm\n        adam.step(loss, lr=6.25e-5, sche d linear decay)\n</code></pre>",
      "quiz": {
        "q": "GPT 在微调阶段引入辅助语言建模目标（Auxiliary LM Objective）的主要作用是什么？",
        "options": [
          "替换主分类损失，直接优化语言模型",
          "作为正则项，帮助模型在大数据集上提升泛化能力",
          "生成文本标签以替代人工标注",
          "减少 Transformer 的参数量"
        ],
        "answer": 1,
        "explain": "辅助 LM 目标与分类损失联合优化，起到正则化作用，在大数据集如 SNLI 上可提升约 1.5–2% 的性能，同时加速收敛。小数据集上提升不大但未见显著负面效应。"
      }
    },
    {
      "id": "bert",
      "num": 3,
      "name": "BERT",
      "fullName": "双向编码器表征 (Bidirectional Encoder Representations from Transformers)",
      "year": "2018.10",
      "org": "Google AI Language",
      "parent": "transformer",
      "paperUrl": "https://arxiv.org/abs/1810.04805",
      "projectUrl": "",
      "category": "architecture",
      "motivation": "掩码语言建模双向表征",
      "summary": "BERT 通过**掩码语言模型（MLM）**和**下一句预测（NSP）**两个无监督任务在未标注语料上进行深度双向预训练，经统一微调框架在 11 项 NLP 任务上全面刷新 SOTA，将 GLUE 基准推至 82.1%。",
      "keyPoints": [
        "提出<strong>掩码语言模型（MLM）</strong>：随机遮盖 15% 输入 token 并预测，实现真正的深度双向上下文建模，打破单向语言模型限制",
        "提出<strong>下一句预测（NSP）</strong>：二分类任务判断两句是否相邻，赋能句子间关系推理",
        "使用统一的 <strong>Transformer 编码器架构</strong>（BASE=12 层/LARGE=24 层），预训练与微调完全共享参数，仅替换输出层",
        "输入由 <strong>Token + Segment + Position</strong> 三种 Embedding 求和构成，<code>[CLS]</code> 用于聚合序列表征",
        "在 <strong>11 项 NLP 基准</strong>上达到 SOTA：GLUE 82.1、SQuAD v1.1 F1 93.2、SQuAD v2.0 F1 83.1、SWAG 86.3%（超人类基准）",
        "验证<strong>深度双向性</strong>的压倒性优势：同等参数量下，BERT_BASE 比单向 GPT 在 GLUE 上高出 4.5 个百分点",
        "提供 BASE（110M）和 LARGE（340M）两种规格，微调极快（单云 TPU 上 1 小时内完成大多数任务）"
      ],
      "detail": "<h5>1. 背景与动机：单向语言模型的根本局限</h5>\n<p>2018 年前，NLP 预训练存在两条路线，但均无法实现真正的深度双向表征：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>架构</th>\n<th>方向性</th>\n<th>缺陷</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>ELMo</td>\n<td>双层 BiLSTM</td>\n<td>浅层双向拼接</td>\n<td>左→右和右→左独立训练，仅将隐状态拼接，无深层交互</td>\n</tr>\n<tr>\n<td>OpenAI GPT</td>\n<td>Transformer 解码器</td>\n<td>左→右单向</td>\n<td>每 token 只能关注上文，对 QA/NLI 等需双向理解的任务不利</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>核心洞察</strong>：标准条件语言模型（如 GPT）只能用单向 Transformer 解码器，因为若允许每 token 同时关注左右上下文，深层网络中 token 会\"间接看到自己\"，使预测任务退化为平凡解。BERT 受 <strong>Cloze 任务</strong>（完形填空）启发，通过随机遮盖部分 token 迫使模型利用双向上下文预测被遮盖词，巧妙绕开了这一限制。</p>\n<h5>2. 核心示意图</h5>\n<p><img alt=\"BERT 预训练与微调框架图\" src=\"https://ar5iv.org/html/1810.04805/assets/figures/figure1.png\" />\n<em>图 1：BERT 的整体预训练和微调流程。预训练阶段使用 MLM 和 NSP 双任务在无标注语料上训练；微调阶段使用相同的模型架构，为每个下游任务替换对应的输出层，所有参数端到端更新。</em></p>\n<p><img alt=\"BERT 输入表示\" src=\"https://ar5iv.org/html/1810.04805/assets/figures/figure2.png\" />\n<em>图 2：BERT 输入表示 = Token Embedding + Segment Embedding + Position Embedding 三者和。首个 token 固定为 <code>[CLS]</code>，句子间用 <code>[SEP]</code> 分隔，Segment Embedding 区分句子 A/B。</em></p>\n<h5>3. 模型架构与超参</h5>\n<p>BERT 完全基于 Transformer 编码器（Vaswani et al., 2017），关键设计：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>参数</th>\n<th>BERT_BASE</th>\n<th>BERT_LARGE</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>层数 L</td>\n<td>12</td>\n<td>24</td>\n</tr>\n<tr>\n<td>隐层维度 H</td>\n<td>768</td>\n<td>1024</td>\n</tr>\n<tr>\n<td>注意力头数 A</td>\n<td>12</td>\n<td>16</td>\n</tr>\n<tr>\n<td>前馈维度</td>\n<td>3072 (4×H)</td>\n<td>4096 (4×H)</td>\n</tr>\n<tr>\n<td>总参数量</td>\n<td>110M</td>\n<td>340M</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键设计</strong>：BASE 特意设为与 OpenAI GPT 参数量相同（110M），以便公平对比双向 vs 单向架构的效果差异——排除了参数量带来的干扰。</div>\n<p>使用 <strong>WordPiece 分词</strong>，词表大小 30,000。每 token 的输入向量为三部分之和：Token Embedding（词汇语义）+ Segment Embedding（A/B 句标识）+ Position Embedding（位置编码）。<code>[CLS]</code> 对应的最终隐向量作为整序列的聚合表征，供分类任务使用。</p>\n<h5>4. 双任务预训练详解</h5>\n<p><strong>（一）掩码语言模型（Masked LM，MLM）</strong></p>\n<pre><code class=\"language-python\"># MLM 伪代码\nfor each sequence:\n    masked_positions = random.sample(tokens, 15%)  # 随机选15%\n    for pos in masked_positions:\n        r = random()\n        if r &lt; 0.8:\n            input[pos] = [MASK]          # 80% 替换为掩码标记\n        elif r &lt; 0.9:\n            input[pos] = random_token()  # 10% 替换为随机词\n        else:\n            input[pos] = original_token  # 10% 保持原样\n    loss = CrossEntropy(model(input)[masked_positions], original_tokens[masked_positions])\n    optimizer.step(loss)\n</code></pre>\n<div class=\"warn-box\">⚠️ <strong>为何不全部用 <code>[MASK]</code>？</strong> 微调阶段没有 <code>[MASK]</code> 标记，若预训练时 100% 用 <code>[MASK]</code> 会导致预训练/微调不匹配。80/10/10 混合策略部分缓解了此问题。</div>\n<p>关键细节：\n- 仅对被遮盖位置计算损失，不重建整个输入（区别于去噪自编码器 DAE）\n- <code>[MASK]</code> token 在输入中替换原始词，其最终隐向量经全连接层 + Softmax 预测原始词 ID\n- 消融实验（附录 C.2）表明该策略大幅优于纯 masking</p>\n<p><strong>（二）下一句预测（Next Sentence Prediction，NSP）</strong></p>\n<p>构造二分类任务：\n- <strong>正例（50%）</strong>：从语料中选取真实相邻的句子对，标签为 <code>IsNext</code>\n- <strong>负例（50%）</strong>：从随机文档取任意句与当前句配对，标签为 <code>NotNext</code>\n- 使用 <code>[CLS]</code> 的最终隐向量 C 经 Softmax 分类</p>\n<p>消融显示：移除 NSP 后 QA 任务 F1 下降 3.3，NLI 任务下降 2.2——验证了句子间关系预训练的重要性。</p>\n<h5>5. 预训练设置</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>配置项</th>\n<th>值</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>语料</td>\n<td>BooksCorpus（8 亿词）+ 英文维基百科（25 亿词）</td>\n</tr>\n<tr>\n<td>优化器</td>\n<td>Adam（β₁=0.9, β₂=0.999）</td>\n</tr>\n<tr>\n<td>学习率</td>\n<td>1e-4，前 10,000 步 warmup 后线性衰减</td>\n</tr>\n<tr>\n<td>Dropout</td>\n<td>所有层 0.1</td>\n</tr>\n<tr>\n<td>激活函数</td>\n<td>GELU</td>\n</tr>\n<tr>\n<td>Batch Size</td>\n<td>256 序列 × 512 token</td>\n</tr>\n<tr>\n<td>训练硬件</td>\n<td>BASE: 4 块云 TPU × 4 天 / LARGE: 16 块云 TPU × 4 天</td>\n</tr>\n</tbody>\n</table></div>\n<h5>6. 微调机制：一键适配下游任务</h5>\n<p><img alt=\"BERT 微调示意图\" src=\"https://ar5iv.org/html/1810.04805/assets/figures/figure3.png\" />\n<em>图 3：BERT 在四类下游任务上的微调方式：(a) 句对分类如 MNLI，(b) 单句分类如 SST-2，(c) 阅读理解 SQuAD（预测答案 span 的 start/end），(d) 序列标注 NER。所有任务共享预训练的 Transformer 编码器，仅替换最上层的输出结构。</em></p>\n<p>核心特性：\n- 所有预训练参数参与微调，不冻结任何层\n- SQuAD 单云 TPU 约 30 分钟完成微调\n- 同一预训练权重可初始化不同下游任务的微调模型</p>\n<h5>7. 实验结果与深度分析</h5>\n<p><strong>GLUE 基准（9 项 NLU 任务）</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>Average</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>BiLSTM+ELMo+Attn</td>\n<td>71.0</td>\n</tr>\n<tr>\n<td>OpenAI GPT</td>\n<td>75.1</td>\n</tr>\n<tr>\n<td><strong>BERT_BASE</strong></td>\n<td><strong>79.6</strong></td>\n</tr>\n<tr>\n<td><strong>BERT_LARGE</strong></td>\n<td><strong>82.1</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>BERT_LARGE 在 CoLA（语言可接受性）+15.1、RTE（文本蕴含）+14.1——证明双向表征对深层语言理解有本质提升。</p>\n<p><strong>SQuAD 阅读理解</strong>：v1.1 F1 93.2（+1.5），v2.0 F1 83.1（+5.1），在包含不可回答问题的 v2.0 上，BERT 将 <code>[CLS]</code> 的 span 用于 \"no answer\" 检测。</p>\n<p><strong>SWAG 常识推理</strong>：LARGE 86.3%，<strong>超越人类基准 85.0%</strong>，证明预训练模型可编码丰富常识知识。</p>\n<p><strong>消融研究关键发现</strong>：\n- 移除 NSP → QA -3.3 F1，NLI -2.2\n- 单向 LTR LM 替代 MLM → 大幅下降（尤其在 QA 上）\n- BiLSTM 替代 Transformer 编码器 → GLUE -2.5+\n- 模型增大对小数据集（如 CoLA）仍有持续提升</p>\n<h5>8. BERT vs 同期方法：一张表看清本质区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>ELMo</th>\n<th>OpenAI GPT</th>\n<th>BERT</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>架构</td>\n<td>双层 BiLSTM</td>\n<td>Transformer 解码器</td>\n<td>Transformer 编码器</td>\n</tr>\n<tr>\n<td>方向性</td>\n<td>浅层拼接双向</td>\n<td>单向（左→右）</td>\n<td><strong>深度全双向</strong></td>\n</tr>\n<tr>\n<td>预训练任务</td>\n<td>独立 LM</td>\n<td>单向 LM</td>\n<td><strong>MLM + NSP</strong></td>\n</tr>\n<tr>\n<td>微调方式</td>\n<td>Feature-based</td>\n<td>Fine-tuning</td>\n<td>Fine-tuning</td>\n</tr>\n<tr>\n<td>跨任务适配</td>\n<td>需改下游模型架构</td>\n<td>通用，但受限方向性</td>\n<td><strong>通用全双向</strong></td>\n</tr>\n<tr>\n<td>GLUE 分数</td>\n<td>71.0</td>\n<td>75.1</td>\n<td><strong>82.1</strong></td>\n</tr>\n</tbody>\n</table></div>\n<h5>9. 贡献与后续影响</h5>\n<ol>\n<li><strong>范式奠基</strong>：开创\"大规模双向预训练 + 通用微调\"的 NLP 范式，成为 RoBERTa、ALBERT、XLNet、ELECTRA、T5 等的基础</li>\n<li><strong>双向性实证</strong>：系统证明深度双向表征在句子级推理和 span 抽取任务上相比单向有量级优势</li>\n<li><strong>工程遗产</strong>：30K WordPiece 词表、GELU 激活、层归一化位置等成为标准实践</li>\n</ol>\n<h5>10. 局限与改进方向</h5>\n<ul>\n<li><strong><code>[MASK]</code> 不匹配</strong>：80/10/10 策略仅部分缓解，微调时 <code>[MASK]</code> 标记不存在的问题——XLNet 通过排列语言模型彻底消除</li>\n<li><strong>NSP 任务简单</strong>：负采样使模型依赖主题预测，RoBERTa 证明去除 NSP 并增大 batch/数据反而提升性能</li>\n<li><strong>静态掩码</strong>：每 epoch 掩码不变，RoBERTa 引入动态掩码</li>\n<li><strong>计算开销大</strong>：LARGE 需 16 块 TPU 训练 4 天，ALBERT 通过参数共享大幅降低</li>\n</ul>\n<h5>核心公式</h5>\n<p><strong>自注意力机制</strong>：\n<div class=\"kb-math kb-math-display\">\\text{Attention}(Q, K, V) = \\text{softmax}\\!\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V</div></p>\n<p><strong>MLM 损失</strong>（仅对被遮盖位置）：\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{MLM}} = -\\sum_{i \\in \\text{masked}} \\log P(w_i \\mid \\text{context})</div></p>\n<p><strong>NSP 损失</strong>（二分类交叉熵）：\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{NSP}} = -[\\,y \\log p + (1-y) \\log(1-p)\\,]</div></p>\n<p><strong>最终预训练损失</strong>：\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\mathcal{L}_{\\text{MLM}} + \\mathcal{L}_{\\text{NSP}}</div></p>",
      "quiz": {
        "q": "BERT 在预训练时对选中的 15% token 进行如下处理：80% 替换为 [MASK]、10% 替换为随机词、10% 保持原样。这种混合策略的主要目的是什么？",
        "options": [
          "增加训练数据多样性，防止过拟合",
          "缓解预训练阶段使用 [MASK] 而微调阶段没有 [MASK] 的不匹配问题",
          "加速模型收敛，减少所需的训练步数",
          "防止模型过度依赖位置编码信息"
        ],
        "answer": 1,
        "explain": "如果预训练100%用[MASK]，模型会对该标记产生依赖，而微调阶段不存在[MASK]，导致表征分布偏移。80/10/10 混合策略通过引入保持原词和随机替换的 token，迫使模型在预测时兼顾上下文线索，部分缓解了此不匹配。"
      }
    },
    {
      "id": "transformer_xl",
      "num": 4,
      "name": "Transformer-XL",
      "fullName": "超长上下文 Transformer (Transformer-XL)",
      "year": "2019.01",
      "org": "CMU / Google Brain",
      "parent": "transformer",
      "paperUrl": "https://arxiv.org/abs/1901.02860",
      "projectUrl": "",
      "category": "long_context",
      "motivation": "分段递归缓解上下文截断",
      "summary": "Transformer-XL 在标准 Transformer 语言模型中加入分段级递归和相对位置编码，使当前片段能复用前一片段的隐藏状态，从而突破固定上下文长度并缓解上下文碎片化。它解决了 vanilla Transformer 训练时片段之间无信息流、推理时重复计算严重的问题，是长上下文 Transformer 的早期关键架构。",
      "keyPoints": [
        "提出 segment-level recurrence：把上一片段各层隐藏状态缓存为 memory，作为当前片段 attention 的额外 key/value 上下文。",
        "使用 stop-gradient 连接相邻片段，使训练类似截断 BPTT：前向可复用历史，反向梯度仍限制在当前片段，控制显存和计算成本。",
        "解决 context fragmentation：当前片段开头 token 不再只能依赖片段内很短前缀，而能看到前一片段的语义上下文。",
        "指出绝对位置编码与状态复用冲突：缓存状态在新片段中被复用时，绝对位置编号会混淆，因此必须改用相对位置编码。",
        "提出新的 relative positional encoding 打分分解，包括 content-based addressing、content-dependent positional bias、global content bias、global positional bias 四项。",
        "推理时复用历史 hidden states，避免每预测一个 token 都从头处理完整窗口，论文报告在 enwiki8 上相对 vanilla Transformer 可达到 1,800+ 倍评估加速。",
        "在 WikiText-103、enwiki8、text8、One Billion Word、Penn Treebank 等语言建模基准上刷新当时困惑度或 bpc 结果，并展示千 token 级连贯生成能力。"
      ],
      "detail": "<p><img alt=\"Transformer-XL 分段递归机制\" src=\"https://ar5iv.labs.arxiv.org/html/1901.02860/assets/x3.png\" />\n<em>图：Transformer-XL 的训练阶段分段递归。上一段的隐藏状态被固定并缓存，作为当前段的扩展上下文；绿色路径表示当前 token 可以直接注意到历史片段中的 hidden states。</em></p>\n<pre><code class=\"language-python\"># Transformer-XL segment-level recurrence, simplified\n\nmemory = init_empty_memory(num_layers)\n\nfor segment in stream_as_segments(tokens, length=L):\n    h = [None] * (num_layers + 1)\n    h[0] = token_embedding(segment)\n\n    for layer in range(1, num_layers + 1):\n        # Reuse previous segment states as fixed memory.\n        mem = stop_gradient(memory[layer - 1])\n        extended_context = concat(mem, h[layer - 1], dim=&quot;time&quot;)\n\n        # Query comes from current segment; key/value come from memory + current segment.\n        q = h[layer - 1] @ W_q[layer]\n        k_content = extended_context @ W_k_content[layer]\n        v_content = extended_context @ W_v[layer]\n\n        rel_pos = relative_sinusoidal_positions(query_len=len(segment), key_len=len(extended_context))\n        attn_score = relative_attention_score(q, k_content, rel_pos, u[layer], v_bias[layer])\n        attn_out = softmax(mask_future(attn_score)) @ v_content\n        h[layer] = feed_forward(layer_norm(attn_out + h[layer - 1]))\n\n    # Cache latest hidden states for the next segment.\n    for layer in range(num_layers):\n        memory[layer] = keep_last(concat(memory[layer], h[layer]), mem_len)\n</code></pre>\n<p>标准 Transformer 语言模型在长文本上通常把语料切成固定长度片段，然后在每个片段内部做因果 self-attention。这个做法计算方便，但有两个硬伤。第一，最长依赖被片段长度上界截断，片段外信息完全不可见；第二，切片往往不尊重句子或段落边界，片段开头 token 缺少必要前文，形成 context fragmentation。推理阶段也不理想：为了让每个新 token 用到最长窗口，vanilla Transformer 往往把窗口右移一位并重新计算整个窗口，历史状态不能复用，成本极高。</p>\n<p>Transformer-XL 的第一项核心改动是 segment-level recurrence。设第 <span class=\"kb-math kb-math-inline\">\\tau</span> 个片段在第 <span class=\"kb-math kb-math-inline\">n-1</span> 层的隐藏状态为 <span class=\"kb-math kb-math-inline\">\\mathbf{h}_{\\tau}^{n-1}</span>，上一片段的对应隐藏状态为 <span class=\"kb-math kb-math-inline\">\\mathbf{h}_{\\tau-1}^{n-1}</span>。当前层计算前先拼接一个扩展上下文：</p>\n<div class=\"kb-math kb-math-display\">\\tilde{\\mathbf{h}}_{\\tau}^{n-1}=[\\mathrm{SG}(\\mathbf{h}_{\\tau-1}^{n-1})\\circ \\mathbf{h}_{\\tau}^{n-1}]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathrm{SG}</span> 是 stop-gradient，<span class=\"kb-math kb-math-inline\">\\circ</span> 表示沿时间维拼接。然后当前片段的 query 只来自当前片段，而 key/value 来自“历史 memory + 当前片段”：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{q}_{\\tau}^{n}=\\mathbf{h}_{\\tau}^{n-1}W_q^n,\\quad\n\\mathbf{k}_{\\tau}^{n}=\\tilde{\\mathbf{h}}_{\\tau}^{n-1}W_{k,E}^n,\\quad\n\\mathbf{v}_{\\tau}^{n}=\\tilde{\\mathbf{h}}_{\\tau}^{n-1}W_v^n</div>\n<div class=\"kb-math kb-math-display\">\\mathbf{h}_{\\tau}^{n}=\\mathrm{TransformerLayer}(\\mathbf{q}_{\\tau}^{n},\\mathbf{k}_{\\tau}^{n},\\mathbf{v}_{\\tau}^{n})</div>\n<p>这个设计让当前片段的每个位置都可以 attend 到上一片段的缓存表示，但梯度不会穿回上一片段，因此显存不会随全文长度线性爆炸。多层网络连续应用这种机制后，信息会跨片段逐层传播，最大可利用依赖长度随层数和片段长度近似线性增长，而不是被单个 segment length 固定封死。</p>\n<div class=\"key-point\">💡 关键：Transformer-XL 的 memory 不是 RNN 那样只传一个最终 hidden state，而是缓存一整段 hidden state 序列。这样当前 token 能用 attention 选择历史中不同位置的信息，保留了 Transformer 的直接长距离连接优势。</div>\n<p>第二项核心改动是相对位置编码。直接把标准绝对位置编码搬到 recurrence 上会出错：上一片段缓存的第 <span class=\"kb-math kb-math-inline\">i</span> 个位置和当前片段的第 <span class=\"kb-math kb-math-inline\">i</span> 个位置可能带着相同绝对位置向量，模型无法判断二者在真实时间轴上的先后距离。Transformer-XL 因此不再把绝对位置静态加到输入 embedding 中，而是在每层 attention score 中注入相对距离 <span class=\"kb-math kb-math-inline\">i-j</span>。单头注意力中，位置 <span class=\"kb-math kb-math-inline\">i</span> 对位置 <span class=\"kb-math kb-math-inline\">j</span> 的打分可写成四项：</p>\n<div class=\"kb-math kb-math-display\">A_{i,j}^{\\mathrm{rel}}=q_i^{\\top}k_{E,j}+q_i^{\\top}W_{k,R}R_{i-j}+u^{\\top}k_{E,j}+v^{\\top}W_{k,R}R_{i-j}</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">q_i</span> 是当前位置 query，<span class=\"kb-math kb-math-inline\">k_{E,j}</span> 是内容 key，<span class=\"kb-math kb-math-inline\">R_{i-j}</span> 是相对距离的正弦编码，<span class=\"kb-math kb-math-inline\">u</span> 和 <span class=\"kb-math kb-math-inline\">v</span> 是可学习全局偏置。四项分别有清晰含义：<span class=\"kb-math kb-math-inline\">q_i^{\\top}k_{E,j}</span> 做内容寻址；<span class=\"kb-math kb-math-inline\">q_i^{\\top}W_{k,R}R_{i-j}</span> 表示“当前内容想关注多远”；<span class=\"kb-math kb-math-inline\">u^{\\top}k_{E,j}</span> 是全局内容偏置；<span class=\"kb-math kb-math-inline\">v^{\\top}W_{k,R}R_{i-j}</span> 是全局位置偏置。相较 Shaw 等相对位置方法，Transformer-XL 保留 sinusoidal relative encoding 的外推归纳偏置，并把内容 key 与位置 key 的投影矩阵分开。</p>\n<p>这种位置设计和 memory 机制是配套的。只有 recurrence 而没有相对位置，模型会在复用缓存时产生时间混淆；只有相对位置而没有 recurrence，仍然无法跨片段传递历史信息。两者结合后，训练时可固定片段长度，评估时可以把 memory length 设得更长，因为相对距离编码比训练过的绝对位置编号更容易外推到长上下文。</p>\n<p>从计算流程看，Transformer-XL 在训练阶段像截断 BPTT：每个 segment 做一次前向和反向，上一段 hidden states 作为固定 memory。推理阶段则更像缓存式自回归模型：旧片段的各层表示保留在 memory 中，新片段只需计算新增 token 的表示，不需要每次滑窗都从头重算历史。这就是论文能报告大幅评估加速的原因。它不仅扩大有效上下文，也把“长上下文语言模型”从重复窗口计算推进到状态复用范式。</p>\n<p>与后来的长上下文 Transformer 相比，Transformer-XL 的思路朴素但影响很大。它没有依赖稀疏注意力、检索索引或外部记忆库，而是在标准 Transformer 内部加入可缓存的 hidden-state recurrence；它也没有把长上下文问题只看作位置编码问题，而是同时处理信息流、位置一致性和推理效率。对于现代 LLM，KV cache 已成为自回归推理的基础设施，Transformer-XL 则是较早系统性说明“Transformer 状态可以跨片段复用，并且位置编码必须随之改造”的代表工作。</p>",
      "quiz": {
        "q": "Transformer-XL 为什么不能直接复用标准 Transformer 的绝对位置编码？",
        "options": [
          "因为缓存的历史状态与当前片段可能共享相同绝对位置编号，导致模型无法区分真实相对距离",
          "因为绝对位置编码会让模型参数量变成两倍",
          "因为绝对位置编码只能用于图像，不能用于文本",
          "因为相对位置编码会完全取消 attention mask"
        ],
        "answer": 0,
        "explain": "Transformer-XL 复用上一片段 hidden states 时，需要知道当前 query 与历史 key 的相对距离；绝对位置编号在跨片段缓存下会造成时间混淆。"
      }
    },
    {
      "id": "gpt2",
      "num": 5,
      "name": "GPT-2",
      "fullName": "无监督多任务语言模型 (Language Models are Unsupervised Multitask Learners)",
      "year": "2019.02",
      "org": "OpenAI",
      "parent": "gpt",
      "paperUrl": "https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf",
      "projectUrl": "",
      "category": "autoregressive",
      "motivation": "规模化带来零样本迁移",
      "summary": "GPT-2 提出用更大规模的 decoder-only Transformer 在高质量 WebText 上做纯自回归语言建模，解决了传统 NLP 任务依赖显式监督和任务专用微调的问题。它的核心发现是：当模型、数据和上下文窗口足够大时，同一个语言模型可以通过自然语言提示在阅读理解、翻译、摘要、问答等任务上产生零样本迁移能力。",
      "keyPoints": [
        "训练目标保持极简：只优化 next-token prediction，不引入任务标签、任务头或多任务监督损失。",
        "数据集使用 WebText：从 Reddit 高赞外链采样约 800 万网页、约 40GB 文本，强调文档质量和领域多样性。",
        "模型是 GPT 的直接规模化版本：最大 GPT-2 为 1542M 参数、48 层、<code>d_model=1600</code>、上下文长度 1024。",
        "输入表示使用 byte-level BPE，词表扩展到 50,257，使模型可以给任意 Unicode 字符串赋概率并减少预处理不一致。",
        "零样本任务通过自然语言序列化完成：把 <code>task</code>、<code>input</code>、<code>output</code> 都写成同一段文本，估计 <span class=\"kb-math kb-math-inline\">p(\\text{output}\\mid\\text{input},\\text{task})</span>。",
        "架构细节包括 pre-LN、最终 self-attention block 后额外 LayerNorm、残差路径初始化按深度缩放 <span class=\"kb-math kb-math-inline\">1/\\sqrt{N}</span>。",
        "论文展示模型规模与零样本能力的强相关：1542M 模型在 8 个语言建模基准中 7 个达到 zero-shot SOTA，并在 LAMBADA、CBT、Winograd 等任务上显著提升。"
      ],
      "detail": "<p><img alt=\"GPT-2 官方发布页示意图\" src=\"https://images.ctfassets.net/kftzwdyauwt9/8df9d1ca-5128-41d0-81527fd4752f/488482a9bebc41f8d72e1d0d423a5891/better-language-models.jpg?fm=webp&amp;q=90&amp;w=3840\" />\n<em>图：OpenAI 官方 GPT-2 发布页配图。论文 Figure 1 的主信息是 WebText 语言模型的 zero-shot 任务表现随模型规模增大而系统提升。</em></p>\n<pre><code class=\"language-python\"># GPT-2 的核心训练与零样本使用流程\nmodel = DecoderOnlyTransformer(\n    vocab_size=50257,\n    context_length=1024,\n    layers=48,\n    d_model=1600,\n)\n\nfor document in WebText:\n    tokens = byte_level_bpe(document)\n    for window in sliding_windows(tokens, length=1024):\n        x = window[:-1]\n        y = window[1:]\n        logits = model(x)\n        loss = cross_entropy(logits, y)\n        loss.backward()\n        optimizer.step()\n        optimizer.zero_grad()\n\n# 下游任务不增加新头，也不微调参数，只把任务写进 prompt\ndef zero_shot_infer(task, input_text):\n    prompt = serialize_as_natural_language(task, input_text)\n    return autoregressive_decode(model, prompt)\n</code></pre>\n<p>GPT-2 的方法论起点是把语言建模视为通用的序列概率估计。对一段符号序列 <span class=\"kb-math kb-math-inline\">x=(s_1,\\ldots,s_n)</span>，模型分解联合概率：</p>\n<div class=\"kb-math kb-math-display\">p(x)=\\prod_{i=1}^{n}p(s_i\\mid s_1,\\ldots,s_{i-1})</div>\n<p>训练时最小化负对数似然：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}(\\theta)=-\\sum_{i=1}^{n}\\log p_\\theta(s_i\\mid s_{&lt;i})</div>\n<p>这个公式本身没有写任何“翻译”“摘要”“问答”的监督项，但论文的关键观察是：互联网页面中天然包含大量任务演示。例如“英文句子 + 法文翻译”“问题 + 文档 + 答案”“文章 + TL;DR 摘要”都可以被视为同一类序列预测样本。只要语料足够多样，最大化整段文本似然就会迫使模型学习这些隐式格式，从而在推理时通过 prompt 激活相应能力。</p>\n<p>与显式多任务学习相比，GPT-2 不需要为每个任务设计数据集、标签格式、任务头或损失权重。传统 supervised multitask 可以写成 <span class=\"kb-math kb-math-inline\">p(\\text{output}\\mid\\text{input},\\text{task})</span>，但通常要人工提供 <span class=\"kb-math kb-math-inline\">(\\text{task},\\text{input},\\text{output})</span> 三元组；GPT-2 的做法是让自然语言本身承担 task conditioning 的角色，把任务描述、输入和待生成输出串接为同一 token 序列。这样，下游任务从“训练一个新模型”变成“构造一个让语言模型续写的上下文”。</p>\n<p>架构上，GPT-2 基本沿用 GPT 的 decoder-only Transformer：每个位置只能看见左侧上下文，自注意力输出经过前馈层和残差连接。论文做了几处对大模型训练很重要的工程修改：LayerNorm 移到每个子块输入处，类似 pre-activation ResNet；最后一个 self-attention block 后再加 LayerNorm；残差层初始化按 <span class=\"kb-math kb-math-inline\">1/\\sqrt{N}</span> 缩放，避免 48 层模型中残差信号随深度累积过大。最大模型上下文从 GPT 的 512 增加到 1024 token，批大小为 512，这让模型可以利用更长的文档级依赖。</p>\n<p>输入表示是 GPT-2 的另一处关键设计。论文使用 byte-level BPE，而不是依赖固定词级词表或语言特定 tokenizer。直觉上，纯 byte 表示过长、学习困难，纯 word 表示又无法稳健覆盖拼写、罕见词、代码和多语言字符；byte-level BPE 在二者之间折中，既能把常见片段合并为较短 token，又保留对任意字符串建模的能力。这也是 GPT-2 可以直接评测不同语言建模基准、减少 <code>&lt;UNK&gt;</code> 与预处理差异的原因。</p>\n<p>训练流程没有“预训练后微调”的第二阶段。论文在评测中明确强调 no training or fine-tuning：模型参数固定，只通过不同 prompt 诱导任务。例如阅读理解可以把文档、对话历史和 <code>A:</code> 作为条件让模型续写答案；摘要可以在文章后追加 <code>TL;DR:</code>；翻译可以给出自然语言中常见的双语表达模式。这个设置比 GPT-1 更激进：GPT-1 证明了预训练表示对微调有帮助，而 GPT-2 进一步证明了规模化语言模型本身会在零样本下显现任务能力。</p>\n<div class=\"key-point\">💡 关键：GPT-2 的“无监督多任务”不是显式地训练多个任务，而是把互联网文本中的自然语言任务演示都归入同一个自回归建模目标。</div>\n<p>论文结果的主要含义不是 GPT-2 在所有下游任务上已经可用，而是 zero-shot 曲线随参数量单调改善。1542M 模型在 LAMBADA 上取得 8.63 perplexity 和 63.24% accuracy，在 Winograd Schema Challenge 上达到 70.70%，并在多个语言建模数据集上超过当时的专用系统。不过论文也指出，摘要、翻译、问答等开放任务仍远不稳定，很多表现只是“开始学会任务”的证据，而不是完成任务的工程系统。</p>",
      "quiz": {
        "q": "GPT-2 为什么能够在没有下游微调的情况下尝试翻译、摘要、问答等任务？",
        "options": [
          "因为它为每个任务训练了独立的分类头",
          "因为 WebText 中存在自然语言形式的任务演示，统一的自回归目标会学习这些模式",
          "因为 byte-level BPE 会自动生成监督标签",
          "因为模型在评测集上继续训练了若干步"
        ],
        "answer": 1,
        "explain": "GPT-2 的关键是把 task、input、output 都看作自然语言序列的一部分；大规模 WebText 中的隐式任务演示让 next-token prediction 学到零样本迁移模式。"
      }
    },
    {
      "id": "t5",
      "num": 6,
      "name": "T5",
      "fullName": "文本到文本迁移 Transformer (Text-to-Text Transfer Transformer)",
      "year": "2019.10",
      "org": "Google Research",
      "parent": "transformer",
      "paperUrl": "https://arxiv.org/abs/1910.10683",
      "projectUrl": "",
      "category": "architecture",
      "motivation": "所有任务转成文本生成",
      "summary": "T5 提出了 Text-to-Text Transfer Transformer，把分类、翻译、摘要、问答、回归等 NLP 任务全部改写成“输入文本 -> 输出文本”的条件生成问题，并用 C4、span corruption 和系统性消融总结了预训练迁移的工程准则。",
      "keyPoints": [
        "统一 text-to-text 接口：所有任务的输入和输出都是字符串，分类标签也作为文本生成。",
        "使用任务前缀：如 <code>translate English to German:</code>、<code>summarize:</code>、<code>cola sentence:</code>，用输入 token 显式指定任务。",
        "采用 encoder-decoder Transformer：encoder 双向理解输入，decoder 自回归生成目标文本。",
        "构建 C4 语料：从 Common Crawl 中清洗出大规模英文网页文本，去除模板、短文本、代码、非英文和重复内容。",
        "预训练目标为 span corruption：随机遮盖连续片段，用 sentinel token 替换输入，并让 decoder 生成被遮盖片段。",
        "系统比较架构和目标：评估 encoder-decoder、decoder-only、prefix LM、MLM、deshuffling、span corruption 等选择。",
        "使用相对位置偏置和 AdaFactor 等工程设置，支撑从小模型到 11B 参数模型的扩展。"
      ],
      "detail": "<p><img alt=\"T5 text-to-text 框架示意\" src=\"https://ar5iv.labs.arxiv.org/html/1910.10683/assets/x1.png\" />\n<em>图：T5 将翻译、问答、分类等任务统一为输入文本到目标文本的生成过程。</em></p>\n<pre><code class=\"language-python\"># T5 的 text-to-text 训练流程\ndef format_example(task, raw_example):\n    if task == &quot;translation&quot;:\n        x = &quot;translate English to German: &quot; + raw_example.english\n        y = raw_example.german\n    elif task == &quot;classification&quot;:\n        x = &quot;sst2 sentence: &quot; + raw_example.sentence\n        y = &quot;positive&quot; if raw_example.label == 1 else &quot;negative&quot;\n    elif task == &quot;summarization&quot;:\n        x = &quot;summarize: &quot; + raw_example.article\n        y = raw_example.summary\n    return x, y\n\ndef span_corrupt(tokens, noise_density=0.15, mean_span_len=3):\n    spans = sample_spans(tokens, noise_density, mean_span_len)\n    corrupted, target = [], []\n    cursor = 0\n    for i, (start, end) in enumerate(spans):\n        sentinel = f&quot;&lt;extra_id_{i}&gt;&quot;\n        corrupted += tokens[cursor:start] + [sentinel]\n        target += [sentinel] + tokens[start:end]\n        cursor = end\n    corrupted += tokens[cursor:]\n    target += [f&quot;&lt;extra_id_{len(spans)}&gt;&quot;]\n    return corrupted, target\n\nfor text in C4:\n    x, y = span_corrupt(tokenize(text))\n    logits = t5_encoder_decoder(input_ids=x, decoder_input_ids=shift_right(y))\n    loss = cross_entropy(logits, y)\n    update(model, loss)\n</code></pre>\n<p>T5 的出发点是接口统一。在 BERT、GPT 和许多早期迁移学习系统中，不同任务常需要不同的输出层：分类用 softmax head，抽取式问答预测 span 起止位置，生成任务使用 decoder。T5 把这些差异压到数据格式里，模型始终学习同一个条件概率：</p>\n<div class=\"kb-math kb-math-display\">p_\\theta(y \\mid x)=\\prod_{t=1}^{|y|}p_\\theta(y_t \\mid y_{&lt;t}, x)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">x</span> 是带任务前缀的输入文本，<span class=\"kb-math kb-math-inline\">y</span> 是目标文本。分类任务输出 <code>\"entailment\"</code> 或 <code>\"positive\"</code>，回归任务输出数字字符串，翻译和摘要则输出目标句子或摘要。这样做让预训练、微调和推理都使用同一套最大似然训练目标。</p>\n<p>论文的另一个关键贡献是 C4。Common Crawl 原始文本规模巨大，但充满重复、导航栏、代码、非自然语言和低质量页面。T5 通过启发式清洗保留自然英文文本，例如要求句子终止符、过滤短页面、去掉包含特定脏词列表的页面、去掉含代码特征的页面，并做三句片段级去重。C4 的意义不是“越大越好”，而是为可复现的大规模预训练提供更干净的网页语料。</p>\n<p>T5 最终采用 span corruption，而不是简单逐 token MLM。输入中连续片段被替换成 <code>&lt;extra_id_0&gt;</code>、<code>&lt;extra_id_1&gt;</code> 等 sentinel token；decoder 的目标序列则按顺序生成每个 sentinel 后面的原始片段。例如原句中的两个片段被遮盖后，输入只保留上下文和哨兵标记，输出只包含被遮盖内容。这比完整语言建模更省 decoder 计算，也比独立 token MLM 更强调长程语义恢复。</p>\n<p>架构选择上，T5 的实验显示 encoder-decoder 是 text-to-text 迁移中最稳健的结构。encoder 可以双向读取完整输入，适合理解前提、问题、文章或待翻译句子；decoder 只在目标端做因果生成。相比 decoder-only LM，它不需要把输入和输出串在同一条单向序列里绕路建模；相比 encoder-only，它天然支持开放式文本生成。</p>\n<p>T5 也把“任务说明”变成了模型输入的一部分。前缀的具体措辞被当作超参数，但论文发现合理前缀已经足够稳定。这一思想直接连接到后来的指令微调和 prompt 范式：任务控制不再是模型外部的分支逻辑，而是数据样本本身的一段文本。</p>\n<div class=\"key-point\">💡 关键：T5 的价值不只是一个模型名，而是一套把 NLP 任务统一成生成问题的可复现实验框架。</div>",
      "quiz": {
        "q": "T5 的 span corruption 与 BERT 式 MLM 的核心区别是什么？",
        "options": [
          "T5 只遮盖标点，BERT 只遮盖名词",
          "T5 遮盖连续片段并让 decoder 生成这些片段",
          "T5 不使用 Transformer",
          "T5 只训练分类 head"
        ],
        "answer": 1,
        "explain": "T5 使用 sentinel token 替换连续 span，目标端生成被遮盖片段；这与 BERT 常见的独立 token 恢复不同。"
      }
    },
    {
      "id": "gpt3",
      "num": 7,
      "name": "GPT-3",
      "fullName": "少样本语言模型 (Language Models are Few-Shot Learners)",
      "year": "2020.05",
      "org": "OpenAI",
      "parent": "gpt2",
      "paperUrl": "https://arxiv.org/abs/2005.14165",
      "projectUrl": "",
      "category": "autoregressive",
      "motivation": "175B规模涌现少样本能力",
      "summary": "GPT-3 提出了一个 1750 亿参数的巨型自回归语言模型，通过纯粹扩大模型规模与数据多样性实现强大的上下文学习（In-Context Learning）能力，使模型无需任何梯度更新即可在零样本/少样本条件下完成翻译、问答、推理等数十种 NLP 任务，启发了后续 InstructGPT、RLHF 及整个大模型时代。",
      "keyPoints": [
        "8 个模型规模：从 125M 到 175B 参数，系统性研究缩放定律与下游表现的关系",
        "基于与 GPT-2 相同的 Transformer 解码器架构，使用交替的密集与稀疏注意力层（Sparse Transformer）",
        "训练数据：经过质量过滤的 Common Crawl（410B tokens, 60%）、WebText2（19B, 22%）、Books1（12B, 8%）、Books2（55B, 8%）、Wikipedia（3B, 3%），共约 300B tokens 训练",
        "三种评测范式：Zero-shot（仅任务描述）、One-shot（单个示例）、Few-shot（10-100 示例），统称上下文学习",
        "无需微调即可在 TriviaQA、CoQA、LAMBADA、Arithmetic 等任务上达到或超过当时的微调 SOTA",
        "验证了双幂律缩放定律：计算量增大时，模型能力平滑提升，且大模型对上下文信息的利用率远高于小模型",
        "系统分析了数据污染、偏见、生成虚假信息等局限，为后续安全研究奠定基础"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"GPT-3 上下文学习范式对比\" src=\"https://arxiv.org/pdf/2005.14165.pdf\" />\n<em>图：GPT-3 定义的四种任务学习范式——微调（Fine-Tuning）需要反向传播更新全部参数，而零样本（Zero-shot）、单样本（One-shot）、少样本（Few-shot）仅通过上下文文本提示完成任务，模型权重完全冻结。GPT-3 首次大规模验证了后三种范式在大模型上的有效性。</em></p>\n<h5>上下文学习伪代码</h5>\n<pre><code class=\"language-python\"># GPT-3 上下文学习（Few-shot）流程\ndef gpt3_in_context_learning(task_description, demonstrations, query):\n    &quot;&quot;&quot;\n    task_description: 自然语言任务指令\n    demonstrations:  [(input_i, output_i), ...]  最多几十对示例\n    query:           待处理的新输入\n    &quot;&quot;&quot;\n    # 构造提示文本\n    prompt = task_description + &quot;\\n\\n&quot;\n    for inp, out in demonstrations:\n        prompt += f&quot;Input: {inp}\\nOutput: {out}\\n\\n&quot;\n    prompt += f&quot;Input: {query}\\nOutput:&quot;      # 模型需补全输出\n\n    # 纯前向传播，无梯度更新\n    output = model.generate(prompt, max_tokens=...)\n    return output\n</code></pre>\n<h5>方法详解</h5>\n<p><strong>1. 动机与背景</strong></p>\n<p>传统 NLP 系统需要为每个任务收集大量标注数据并微调模型，成本高昂且泛化能力有限。GPT-3 探索了一条截然不同的路径：能否通过极度扩大模型容量和数据规模，使语言模型\"涌现\"出从少量示例（甚至纯自然语言指令）中直接学习任务的能力？这一思路源于两个关键观察：1）GPT-2 已初步展示部分零样本能力；2）缩放定律研究发现模型损失与计算量呈平滑幂律关系。GPT-3 是这一思想的大胆极限实验——将参数量从 GPT-2 的 1.5B 直接扩张 100 倍。</p>\n<p><strong>2. 核心机制：上下文学习的艺术</strong></p>\n<p>上下文学习（In-Context Learning）是 GPT-3 的绝对核心。与传统微调的本质区别在于：</p>\n<div class=\"key-point\">💡 关键：上下文学习<strong>不做任何权重更新</strong>。模型必须依靠训练时内化到参数中的元知识，在推理时理解提示中的任务模式并即时泛化。</div>\n<p>给定 K 个示例 \\<span class=\"kb-math kb-math-inline\">\\\\{(x_i, y_i)\\\\}_{i=1}^K\\</span>，GPT-3 将它们全部拼接为一个文本前缀，然后自回归地生成对查询 \\<span class=\"kb-math kb-math-inline\">x_q\\</span> 的回答：</p>\n<div class=\"kb-math kb-math-display\">P(y | x_q, \\\\{(x_i, y_i)\\\\}_{i=1}^K) = \\\\prod_{t} P_{\\\\theta}(y_t | y_{&lt;t}, x_q, \\\\{(x_i, y_i)\\\\}_{i=1}^K)</div>\n<p>其中 \\<span class=\"kb-math kb-math-inline\">\\\\theta\\</span> 是预训练中学习到的所有参数，推理过程中<strong>完全冻结</strong>。这与微调形成鲜明对比——后者会计算损失对 \\<span class=\"kb-math kb-math-inline\">\\\\theta\\</span> 的梯度并更新参数：</p>\n<div class=\"kb-math kb-math-display\">\\\\theta&#x27; = \\\\theta - \\\\eta \\\\nabla_\\\\theta \\\\mathcal{L}(\\\\{(x_i, y_i)\\\\})</div>\n<p>GPT-3 的实验表明，这种差距在大模型规模下被急剧放大：小型模型几乎无法从上下文中受益，而 175B 模型的少样本表现甚至超越了某些任务的微调 SOTA。</p>\n<p><strong>3. 模型架构与训练细节</strong></p>\n<p>GPT-3 沿用了 GPT-2 的 Transformer 解码器架构，但引入了 <strong>Sparse Transformer</strong> 的交替注意力模式以提升大模型效率。具体而言：</p>\n<ul>\n<li><strong>注意力层</strong>：在部分注意力层中，每个位置只能关注固定步长内的局部位置（而非全局），形成稀疏模式。这一设计与密集注意力层交替堆叠，在保持建模能力的同时显著降低计算复杂度。175B 模型共 96 层，每层 96 个头，隐维度 12288。</li>\n<li><strong>训练优化</strong>：使用 Adam 优化器，最大学习率 6e-5，批量大小动态从 32K 增至 3.2M tokens。训练在 V100 GPU 集群上进行，总计算量约 3.14e23 FLOPS。</li>\n</ul>\n<div class=\"warn-box\">⚠️ 注意：尽管总参数量巨大（175B），但 GPT-3 仅训练 300B tokens，远少于\"数据最优\"数量。这一设计主动选择了模型容量过剩、数据不足的策略，以便研究<strong>大模型的泛化能力</strong>而非纯粹的拟合能力。</div>\n<p><strong>4. 训练数据构成</strong></p>\n<p>GPT-3 的训练数据是精心策划的混合体。原始 Common Crawl 包含近万亿词，但质量参差不齐。团队采用三步清洗：1）基于与高质量语料（WebText、书籍、维基百科）的 N-gram 相似度过滤低质量文档；2）文档级模糊去重，防止冗余和验证集污染；3）添加高质参考语料。关键设计是<strong>非均匀采样</strong>——高质量数据（如 Wikipedia）被过采样 3-4 次，而 Common Crawl 仅采样 0.44 次，以此平衡数据量与质量。</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>数据集</th>\n<th>Token 量</th>\n<th>训练混合权重</th>\n<th>300B 训练时轮数</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Common Crawl（过滤后）</td>\n<td>4100 亿</td>\n<td>60%</td>\n<td>0.44</td>\n</tr>\n<tr>\n<td>WebText2</td>\n<td>190 亿</td>\n<td>22%</td>\n<td>2.9</td>\n</tr>\n<tr>\n<td>Books1</td>\n<td>120 亿</td>\n<td>8%</td>\n<td>1.9</td>\n</tr>\n<tr>\n<td>Books2</td>\n<td>550 亿</td>\n<td>8%</td>\n<td>0.43</td>\n</tr>\n<tr>\n<td>Wikipedia</td>\n<td>30 亿</td>\n<td>3%</td>\n<td>3.4</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>5. 决定性发现：缩放曲线与上下文学习能力的涌现</strong></p>\n<p>GPT-3 最震撼的发现是综合 42 个基准的聚合曲线：零样本性能随模型规模的增加呈平滑提升，但<strong>少样本性能的斜率远高于零样本</strong>——大模型对小模型的优势在少样本设置中被大幅放大。这意味着更大的模型不仅\"知道得更多\"，更重要的是它们<strong>学会了更有效地从上下文中提取任务模式</strong>：\n- 175B 的少样本 LAMBADA 准确率达 86.4%，远超之前的微调 SOTA（68%）；\n- 在 TriviaQA 上，64-shot 达到 71.2%，接近当时微调最优；\n- 在算术任务和词重组（SAT analogy）等全新任务上，大模型展现出小模型完全不具备的推理能力。</p>\n<p><strong>6. 局限性与影响</strong></p>\n<p>GPT-3 论文坦诚剖析了关键局限：1）生成内容的语义不可靠——可能编造事实或产生矛盾；2）社会偏见——训练数据中的偏见被放大到输出中；3）高推理成本——单次前传需数百 GB 显存；4）不可解释性——无法追溯模型\"为什么\"做出特定预测。论文还讨论了数据污染问题——部分验证集内容无意间出现在训练数据中，但由于污染比例较小（&lt;1%），作者认为整体结论仍然成立。这些直面的局限性为后续 InstructGPT、RLHF、DALL-E 等工作指明了方向。</p>",
      "quiz": {
        "q": "GPT-3 的核心创新——上下文学习（In-Context Learning），与传统微调的本质区别是什么？",
        "options": [
          "上下文学习使用更大的学习率进行训练",
          "上下文学习不执行反向传播和权重更新，纯粹通过前向传播从示例中泛化",
          "上下文学习需要先在特定任务上进行一轮预训练",
          "上下文学习只能用于文本分类任务，微调只能用于生成任务"
        ],
        "answer": 1,
        "explain": "上下文学习的核心特征是模型权重完全冻结，仅通过将示例文本拼接到提示中即兴完成新任务，没有任何梯度更新步骤。这是它与微调最根本的区别。"
      }
    },
    {
      "id": "switch_transformer",
      "num": 8,
      "name": "Switch Transformer",
      "fullName": "稀疏专家 Transformer (Switch Transformer)",
      "year": "2021.01",
      "org": "Google Research",
      "parent": "t5",
      "paperUrl": "https://arxiv.org/abs/2101.03961",
      "projectUrl": "",
      "category": "sparse_moe",
      "motivation": "Top1路由简化万亿MoE",
      "summary": "Switch Transformer 提出把 Transformer/T5 中的 dense FFN 替换为 top-1 路由的稀疏专家 FFN，解决了传统 MoE 路由复杂、通信开销大和训练不稳定的问题。它用每个 token 只激活一个专家的简单机制，在近似保持每 token FLOPs 的同时把参数规模扩展到万亿级。",
      "keyPoints": [
        "核心架构是 Switch FFN：用稀疏专家层替换 Transformer block 中的前馈网络层，attention 结构保持不变。",
        "路由策略从 MoE 的 top-k 简化为 top-1：每个 token 只发往概率最高的一个专家，降低计算、通信和实现复杂度。",
        "Router 使用 softmax gate：先计算 <span class=\"kb-math kb-math-inline\">p_i(x)=\\mathrm{softmax}(W_r x)_i</span>，再选择 <span class=\"kb-math kb-math-inline\">\\arg\\max_i p_i(x)</span>。",
        "Switch 层输出为选中专家输出乘以 gate value：<span class=\"kb-math kb-math-inline\">y=p_{e(x)}(x)E_{e(x)}(x)</span>，其中 <span class=\"kb-math kb-math-inline\">e(x)</span> 是 top-1 专家。",
        "Expert capacity 用 capacity factor 控制每个专家最多处理的 token 数，过载 token 通过残差路径跳过该专家层。",
        "训练加入可微的负载均衡辅助损失 <span class=\"kb-math kb-math-inline\">\\alpha N\\sum_i f_iP_i</span>，鼓励 token 分配和 router 概率都接近均匀。",
        "论文以 T5 为基座，在 C4 span-corruption 预训练中展示最高 7x+ pre-training speedup，并在 mT5 101 种语言上普遍收益。",
        "工程改进包括 selective precision、专家初始化缩放、稀疏模型 fine-tuning 正则增强，以及 data/model/expert parallelism 组合。"
      ],
      "detail": "<p><img alt=\"Switch Transformer 编码器块示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2101.03961/assets/x3.png\" />\n<em>图：论文 Figure 2。Switch Transformer 将 dense FFN 替换为 Switch FFN，router 为每个 token 独立选择一个专家，并用对应 gate value 缩放专家输出。</em></p>\n<p><img alt=\"Switch Transformer expert capacity 示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2101.03961/assets/x4.png\" />\n<em>图：论文 Figure 3。capacity factor 决定每个专家的 token 缓冲区大小；过小会丢 token，过大则浪费通信和计算。</em></p>\n<pre><code class=\"language-python\"># Switch FFN 的核心逻辑，省略设备并行细节\n\ndef switch_ffn(tokens, experts, router_w, capacity_factor, alpha=1e-2):\n    # tokens: [T, d_model]\n    logits = tokens @ router_w                  # [T, num_experts]\n    probs = softmax(to_float32(logits), axis=-1)\n\n    # top-1 routing: 每个 token 只选择一个专家\n    gate, expert_id = top1(probs)               # [T], [T]\n    expert_mask = one_hot(expert_id, num_experts)\n\n    # 负载均衡损失：f 是真实 dispatch 占比，P 是 router 概率占比\n    f = mean(expert_mask, axis=0)               # fraction of tokens per expert\n    P = mean(probs, axis=0)                     # fraction of probability mass\n    aux_loss = alpha * num_experts * sum(f * P)\n\n    # expert capacity：每个专家最多处理固定数量 token\n    capacity = ceil((len(tokens) / num_experts) * capacity_factor)\n    positions = cumsum_per_expert(expert_mask)\n    keep = positions &lt; capacity\n\n    outputs = zeros_like(tokens)\n    for i, expert in enumerate(experts):\n        selected = (expert_id == i) &amp; keep\n        outputs[selected] = gate[selected, None] * expert(tokens[selected])\n\n    # overflow token 在实际 Transformer block 中主要依赖残差连接保留表示\n    return outputs, aux_loss\n</code></pre>\n<p>Switch Transformer 的动机是把“参数规模”和“每 token 计算量”解耦。普通 dense Transformer 每个 token 都经过同一套 FFN 参数；如果直接把模型加宽或加深，参数、显存、FLOPs 都同步增长。MoE 的想法是准备多个专家 <span class=\"kb-math kb-math-inline\">E_1,\\ldots,E_N</span>，但每个 token 只调用其中一部分专家，因此总参数可以很大，单个 token 的实际计算仍接近一个 FFN。Switch 的贡献在于把此前较复杂的 top-k MoE 路由简化到 top-1，让稀疏化更容易稳定扩展。</p>\n<p>传统 MoE 对 token 表示 <span class=\"kb-math kb-math-inline\">x</span> 计算 router logits：</p>\n<div class=\"kb-math kb-math-display\">h(x)=W_r x</div>\n<p>然后得到专家概率：</p>\n<div class=\"kb-math kb-math-display\">p_i(x)=\\frac{e^{h_i(x)}}{\\sum_{j=1}^{N}e^{h_j(x)}}</div>\n<p>top-k MoE 会选择集合 <span class=\"kb-math kb-math-inline\">\\mathcal{T}</span> 中的多个专家并线性组合：</p>\n<div class=\"kb-math kb-math-display\">y=\\sum_{i\\in\\mathcal{T}}p_i(x)E_i(x)</div>\n<p>Switch 的变化是令 <span class=\"kb-math kb-math-inline\">|\\mathcal{T}|=1</span>。若 <span class=\"kb-math kb-math-inline\">e(x)=\\arg\\max_i p_i(x)</span>，则输出近似为：</p>\n<div class=\"kb-math kb-math-display\">y=p_{e(x)}(x)E_{e(x)}(x)</div>\n<p>这个设计看似更“硬”，但论文发现它反而更好用。top-1 让每个 token 只需要一次专家 FFN 计算，expert capacity 可以比 top-2 至少减半；跨设备通信也更简单，因为 token 不需要被复制到多个专家再聚合。Router 仍可训练的关键在于 gate value <span class=\"kb-math kb-math-inline\">p_{e(x)}(x)</span> 出现在输出中，梯度可以通过被选中专家的概率回传到 router，虽然 <span class=\"kb-math kb-math-inline\">\\arg\\max</span> 本身不可微。</p>\n<p>容量控制是 Switch 能否高效运行的核心工程问题。每个专家在编译图中必须有固定 batch shape，因此论文定义：</p>\n<div class=\"kb-math kb-math-display\">\\text{expert capacity}=\\left(\\frac{\\text{tokens per batch}}{\\text{number of experts}}\\right)\\times\\text{capacity factor}</div>\n<p>capacity factor 大于 1 会为负载不均衡预留缓冲，但会增加空槽位、通信和内存；capacity factor 太小则会发生 token overflow。论文的实现中，如果某个专家已满，溢出的 token 不经过该 Switch FFN，而是在 Transformer block 的残差连接中继续向后传播。因此，capacity factor 和负载均衡损失共同决定了稀疏层是否既高效又不损害质量。</p>\n<p>负载均衡损失是避免“所有 token 都挤到少数专家”的关键。设一个 batch 有 <span class=\"kb-math kb-math-inline\">T</span> 个 token，<span class=\"kb-math kb-math-inline\">f_i</span> 是实际被派发到专家 <span class=\"kb-math kb-math-inline\">i</span> 的 token 比例：</p>\n<div class=\"kb-math kb-math-display\">f_i=\\frac{1}{T}\\sum_{x\\in B}\\mathbf{1}\\{\\arg\\max p(x)=i\\}</div>\n<p><span class=\"kb-math kb-math-inline\">P_i</span> 是 router 给专家 <span class=\"kb-math kb-math-inline\">i</span> 的平均概率质量：</p>\n<div class=\"kb-math kb-math-display\">P_i=\\frac{1}{T}\\sum_{x\\in B}p_i(x)</div>\n<p>辅助损失为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{aux}}=\\alpha\\cdot N\\sum_{i=1}^{N}f_iP_i</div>\n<p>当 <span class=\"kb-math kb-math-inline\">f</span> 和 <span class=\"kb-math kb-math-inline\">P</span> 都接近均匀分布 <span class=\"kb-math kb-math-inline\">1/N</span> 时，该点积最小。这里 <span class=\"kb-math kb-math-inline\">f</span> 由 hard routing 产生，不可微；<span class=\"kb-math kb-math-inline\">P</span> 可微，因此损失仍能推动 router logits 变得更均衡。论文使用 <span class=\"kb-math kb-math-inline\">\\alpha=10^{-2}</span>，认为它足以快速平衡负载，又不会压过主交叉熵目标。</p>\n<p>训练流程继承 T5 的 span-corruption 预训练：在 C4 中遮蔽 15% token，把连续 mask span 替换为 sentinel token，模型预测缺失内容。Switch 不是改 attention，而是改 FFN，因此它可以直接嵌入 T5-Base、T5-Large、mT5 等架构。实验中，Switch-Base 与 dense T5-Base 保持相近 FLOPs per token，但通过增加专家数获得更多参数容量；论文报告在固定资源下可达到 7x 量级的预训练速度优势，大规模模型对 T5-XXL 也有约 4x speedup。</p>\n<p>论文还强调 Switch 的稳定训练不是只靠 top-1 路由。Selective precision 指 router 相关计算使用 float32，而其余大部分计算可用 bfloat16，从而降低低精度下 router 抖动；初始化缩放降低专家层激活方差，帮助更多专家扩展；fine-tuning 时对专家层使用更强 dropout/正则，缓解稀疏专家在小数据任务上的过拟合。换言之，Switch 的算法核心很短，但能扩到万亿参数依赖一整套路由、容量、精度和并行策略。</p>\n<div class=\"key-point\">💡 关键：Switch Transformer 不是让每个 token 使用“更多计算”，而是让不同 token 使用“不同参数”。这就是它能在近似固定 FLOPs 下增加总参数量的原因。</div>\n<p>与 dense scaling 相比，Switch scaling 增加的是专家维度；与早期 MoE 相比，它牺牲 top-2 聚合的表达冗余，换来 top-1 路由的简单性、吞吐和更低通信成本。这个取舍非常适合大规模预训练：当 batch 很大、专家很多、设备很多时，减少一次专家通信和一次 FFN 计算比理论上更平滑的 top-k 混合更有价值。</p>",
      "quiz": {
        "q": "Switch Transformer 将 MoE 的 top-k 路由改为 top-1 路由，最直接的收益是什么？",
        "options": [
          "每个 token 会同时利用所有专家，因此表达能力最大",
          "每个 token 只经过一个专家，降低路由计算、专家计算和跨设备通信",
          "不再需要负载均衡损失",
          "可以完全移除 Transformer 的 attention 层"
        ],
        "answer": 1,
        "explain": "Switch 的核心简化是 top-1 routing；它仍需要负载均衡和 attention，但每个 token 只发送到一个专家，因此计算和通信更低。"
      }
    },
    {
      "id": "rope",
      "num": 9,
      "name": "RoPE",
      "fullName": "旋转位置编码 (Rotary Position Embedding)",
      "year": "2021.04",
      "org": "Zhuiyi Technology",
      "parent": "transformer",
      "paperUrl": "https://arxiv.org/abs/2104.09864",
      "projectUrl": "",
      "category": "architecture",
      "motivation": "相对位置信息融入注意力",
      "summary": "RoPE 通过旋转矩阵将绝对位置编码融入自注意力的 Query/Key 向量中，使得注意力分数天然仅依赖相对位置差异，兼具绝对位置编码的简洁性与相对位置编码的表达力，且支持序列长度灵活外推与线性注意力。",
      "keyPoints": [
        "提出<strong>旋转位置编码 (Rotary Position Embedding, RoPE)</strong>：将绝对位置编码为 d 维空间中的旋转矩阵，施加于 Q/K 向量",
        "旋转矩阵的巧妙性质使得 QK 内积只依赖于相对位置 <span class=\"kb-math kb-math-inline\">m-n</span>，而无需显式计算相对位置偏移",
        "具备<strong>远程衰减</strong>性质：token 间的注意力权重随相对距离增大而自然衰减，符合自然语言的距离敏感特性",
        "支持<strong>序列长度外推</strong>：训练时未见过的更长序列在推理时可直接使用，无需重新训练",
        "兼容<strong>线性自注意力</strong>：RoPE 可直接装备线性注意力机制，而传统绝对/相对位置编码方案难以做到",
        "实现极简：在多头注意力中仅需对 Q/K 的每对维度施加不同频率的旋转变换，计算开销极小",
        "在长文本分类基准上，基于 RoPE 的 RoFormer 模型一致优于 BERT/ALBERT/XLNet 等替代方案",
        "自 2021 年起成为主流位置编码方案之一，被 LLaMA/Qwen/Mistral 等大量 LLM 采用"
      ],
      "detail": "<p><img alt=\"RoPE 实现示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2104.09864/assets/x1.png\" />\n<em>图：RoPE 的核心思想 — 将 Query 和 Key 向量按维度分组后在 2D 平面上旋转，旋转角度正比于 token 位置。注意力得分 <span class=\"kb-math kb-math-inline\">\\boldsymbol{q}_m^\\top \\boldsymbol{k}_n</span> 由此天然表达为 <span class=\"kb-math kb-math-inline\">\\boldsymbol{x}_m^\\top \\boldsymbol{W}_q^\\top \\boldsymbol{R}_{n-m} \\boldsymbol{W}_k \\boldsymbol{x}_n</span>，仅依赖相对位置。</em></p>\n<h5>动机与背景</h5>\n<p>Transformer 的自注意力机制本质是<strong>位置无关</strong>的 — 若不给 token 嵌入注入位置信息，模型将无法区分\"我爱你\"和\"你爱我\"。传统解决方案分为两类：</p>\n<ol>\n<li><strong>绝对位置编码 (APE)</strong>：在词嵌入上叠加位置向量（正弦/可学习），如原始 Transformer 的 sinusoidal encoding。位置信息在线性层中被混合，但进入注意力计算后位置间的相对关系被模糊。</li>\n<li><strong>相对位置编码 (RPE)</strong>：在注意力分数中显式加入相对位置偏置项 <span class=\"kb-math kb-math-inline\">a_{m-n}</span>，如 T5 的相对位置偏置和 Transformer-XL 的方案。表达力强但计算复杂，且难以兼容线性注意力（线性注意力将 softmax 替换为核函数乘积，无法直接注入加性偏置）。</li>\n</ol>\n<p>RoPE 的核心洞察：<strong>在 Q/K 向量上乘以位置相关的旋转矩阵，让注意力内积自动包含相对位置信息。</strong> 这既保留了绝对位置编码的简单性（仅修改 Q/K 向量），又获得了相对位置编码的表达力（内积依赖相对位置）。</p>\n<h5>核心机制：旋转矩阵编码位置</h5>\n<p>设 d 维向量 <span class=\"kb-math kb-math-inline\">\\boldsymbol{x}</span>，RoPE 将其按维度两两配对，每对 (2i, 2i+1) 视为一个 2D 平面，并施加角度为 <span class=\"kb-math kb-math-inline\">m\\theta_i</span> 的旋转：</p>\n<div class=\"kb-math kb-math-display\">\\boldsymbol{R}_m =\n\\begin{pmatrix}\n\\cos m\\theta_0 &amp; -\\sin m\\theta_0 &amp; 0 &amp; 0 &amp; \\cdots &amp; 0 &amp; 0 \\\\\n\\sin m\\theta_0 &amp; \\cos m\\theta_0 &amp; 0 &amp; 0 &amp; \\cdots &amp; 0 &amp; 0 \\\\\n0 &amp; 0 &amp; \\cos m\\theta_1 &amp; -\\sin m\\theta_1 &amp; \\cdots &amp; 0 &amp; 0 \\\\\n0 &amp; 0 &amp; \\sin m\\theta_1 &amp; \\cos m\\theta_1 &amp; \\cdots &amp; 0 &amp; 0 \\\\\n\\vdots &amp; \\vdots &amp; \\vdots &amp; \\vdots &amp; \\ddots &amp; \\vdots &amp; \\vdots \\\\\n0 &amp; 0 &amp; 0 &amp; 0 &amp; \\cdots &amp; \\cos m\\theta_{d/2-1} &amp; -\\sin m\\theta_{d/2-1} \\\\\n0 &amp; 0 &amp; 0 &amp; 0 &amp; \\cdots &amp; \\sin m\\theta_{d/2-1} &amp; \\cos m\\theta_{d/2-1}\n\\end{pmatrix}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\theta_i = 10000^{-2i/d}</span>，与原始 Transformer 正弦编码频率一致。该矩阵是分块对角的正交矩阵（旋转矩阵），满足：</p>\n<div class=\"kb-math kb-math-display\">\\boldsymbol{R}_m^\\top \\boldsymbol{R}_n = \\boldsymbol{R}_{n-m}</div>\n<p><strong>关键性质</strong>：两个旋转矩阵的乘积（或转置乘）仍然是旋转矩阵，且角度为两者之差。</p>\n<p>将 RoPE 应用于自注意力的 Query 和 Key 计算：</p>\n<div class=\"kb-math kb-math-display\">\\boldsymbol{q}_m = \\boldsymbol{R}_m \\boldsymbol{W}_q \\boldsymbol{x}_m, \\quad \\boldsymbol{k}_n = \\boldsymbol{R}_n \\boldsymbol{W}_k \\boldsymbol{x}_n</div>\n<p>Value 不施加位置编码。注意力分数变为：</p>\n<div class=\"kb-math kb-math-display\">\\boldsymbol{q}_m^\\top \\boldsymbol{k}_n = (\\boldsymbol{R}_m \\boldsymbol{W}_q \\boldsymbol{x}_m)^\\top (\\boldsymbol{R}_n \\boldsymbol{W}_k \\boldsymbol{x}_n) = \\boldsymbol{x}_m^\\top \\boldsymbol{W}_q^\\top \\boldsymbol{R}_m^\\top \\boldsymbol{R}_n \\boldsymbol{W}_k \\boldsymbol{x}_n = \\boldsymbol{x}_m^\\top \\boldsymbol{W}_q^\\top \\boldsymbol{R}_{n-m} \\boldsymbol{W}_k \\boldsymbol{x}_n</div>\n<div class=\"key-point\">💡 关键：注意力分数仅依赖于相对位置 <span class=\"kb-math kb-math-inline\">n-m</span>，而旋转矩阵天然将绝对位置 <span class=\"kb-math kb-math-inline\">m</span> 编码进了 Q/K，无需任何显式相对位置偏置项。这是 RoPE 最精妙的设计。</div>\n<h5>高效实现</h5>\n<p>在 PyTorch/TensorFlow 中，逐元素施加旋转矩阵可利用欧拉公式简化为<strong>复数的旋转</strong>操作。将每对相邻维度 (2i, 2i+1) 视为复数 <span class=\"kb-math kb-math-inline\">a + ib</span>，旋转角度为 <span class=\"kb-math kb-math-inline\">\\theta</span>，则：</p>\n<pre><code class=\"language-python\">def rotary_embedding(q, k, positions, dim):\n    &quot;&quot;&quot;\n    q, k: [batch, heads, seq_len, dim]\n    positions: [seq_len]\n    &quot;&quot;&quot;\n    # 生成频率: theta_i = 10000^{-2i/dim}\n    freqs = 1.0 / (10000 ** (torch.arange(0, dim, 2).float() / dim))\n    # [seq_len, dim/2]\n    angles = positions[:, None] * freqs[None, :]\n\n    # cos/sin 缓存\n    cos = angles.cos().unsqueeze(0).unsqueeze(0)  # [1, 1, seq, dim/2]\n    sin = angles.sin().unsqueeze(0).unsqueeze(0)\n\n    # 将 q/k 的最后维 reshape 为 [..., dim/2, 2]（复数对）\n    # q = [a1, b1, a2, b2, ...] -&gt; 旋转后 = [a1*cos - b1*sin, b1*cos + a1*sin, ...]\n    def rotate_half(x):\n        x1, x2 = x[..., 0::2], x[..., 1::2]\n        return torch.stack((-x2, x1), dim=-1).flatten(-2)\n\n    q_rot = q * cos.repeat_interleave(2, dim=-1) + rotate_half(q) * sin.repeat_interleave(2, dim=-1)\n    k_rot = k * cos.repeat_interleave(2, dim=-1) + rotate_half(k) * sin.repeat_interleave(2, dim=-1)\n    return q_rot, k_rot\n</code></pre>\n<div class=\"warn-box\">⚠️ 注意：上述实现将 Q/K 的相邻维度对解释为 (实部, 虚部)，旋转即复数乘法 <span class=\"kb-math kb-math-inline\">e^{i\\theta} \\cdot z</span>。这是 RoPE 在实际框架中的标准实现方式，LLaMA/Qwen 等模型均沿用此模式。</div>\n<h5>远程衰减性质</h5>\n<p>RoPE 具备一个重要的数学性质：注意力权重随相对距离增长而自然衰减。这是因为旋转频率 <span class=\"kb-math kb-math-inline\">\\theta_i</span> 沿维度递减（低频 → 高频），使得不同维度的旋转对不同相对距离的敏感度不同：低频维度捕捉长距离依赖，高频维度捕捉短距离细节。综合所有维度的内积结果，形成一个随 <span class=\"kb-math kb-math-inline\">|n-m|</span> 增大而衰减的上界。</p>\n<p><img alt=\"RoPE 远程衰减性质\" src=\"https://ar5iv.labs.arxiv.org/html/2104.09864/assets/x2.png\" />\n<em>图：RoPE 注意力权重随相对距离的衰减曲线。x 轴为相对距离，y 轴为注意力权重上界。可见相对距离越大，注意力上界越低，自然实现\"近者关注、远者忽略\"。</em></p>\n<h5>与线性自注意力的兼容性</h5>\n<p>线性注意力将标准 softmax 注意力替换为核函数形式：</p>\n<div class=\"kb-math kb-math-display\">\\text{Attention}(\\boldsymbol{Q},\\boldsymbol{K},\\boldsymbol{V}) = \\frac{\\phi(\\boldsymbol{Q})(\\phi(\\boldsymbol{K})^\\top \\boldsymbol{V})}{\\phi(\\boldsymbol{Q})\\sum \\phi(\\boldsymbol{K})^\\top}</div>\n<p>这使得计算复杂度从 <span class=\"kb-math kb-math-inline\">O(n^2)</span> 降至 <span class=\"kb-math kb-math-inline\">O(n)</span>。RoPE 可以直接装备线性注意力，只需将旋转后的 <span class=\"kb-math kb-math-inline\">\\boldsymbol{Q}&#x27;, \\boldsymbol{K}&#x27;</span> 送入核函数即可。传统 RPE（加性偏置）无法被分解到核函数中，因此无法与线性注意力兼容。这是 RoPE 相对于传统 RPE 的一个关键优势。</p>\n<h5>与已有方法的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>位置编码方式</th>\n<th>相对信息</th>\n<th>线性注意力兼容</th>\n<th>长度外推</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Sinusoidal APE</td>\n<td>加到词嵌入</td>\n<td>隐式</td>\n<td>✓</td>\n<td>✗</td>\n</tr>\n<tr>\n<td>Learnable APE</td>\n<td>可学习向量</td>\n<td>无</td>\n<td>✓</td>\n<td>✗</td>\n</tr>\n<tr>\n<td>T5 RPE</td>\n<td>注意力加性偏置</td>\n<td>显式</td>\n<td>✗</td>\n<td>✗</td>\n</tr>\n<tr>\n<td>Transformer-XL RPE</td>\n<td>注意力加性偏置</td>\n<td>显式</td>\n<td>✗</td>\n<td>部分</td>\n</tr>\n<tr>\n<td><strong>RoPE</strong></td>\n<td><strong>Q/K 旋转变换</strong></td>\n<td><strong>显式</strong></td>\n<td><strong>✓</strong></td>\n<td><strong>✓</strong></td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键：RoPE 是首个同时满足\"自然包含相对位置信息\"和\"兼容线性注意力\"的位置编码方案。其\"旋转矩阵乘 Q/K\"的设计使得位置编码与内容表征在乘法层面融合，而非简单的加法叠加。</div>",
      "quiz": {
        "q": "RoPE 为什么能够兼容线性自注意力，而传统相对位置编码 (如 T5 的加性偏置) 不能？",
        "options": [
          "RoPE 的计算量更小，所以线性注意力可以承受",
          "RoPE 将位置信息乘性融入 Q/K 向量本身，而线性注意力的核函数分解要求位置信息不能是加性偏置",
          "RoPE 使用了可学习的旋转角度，可以自适应线性注意力的需求",
          "传统相对位置编码无法处理长序列，而 RoPE 可以"
        ],
        "answer": 1,
        "explain": "线性注意力依赖核函数分解 φ(Q)φ(K)ᵀ，而加性偏置 b(m-n) 无法分解为两个向量的内积。RoPE 的旋转矩阵直接作用于 Q/K 向量，使得位置信息成为向量的一部分，天然兼容核函数分解。"
      }
    },
    {
      "id": "glam",
      "num": 10,
      "name": "GLaM",
      "fullName": "通才语言模型 MoE (Generalist Language Model)",
      "year": "2021.12",
      "org": "Google Research",
      "parent": "switch_transformer",
      "paperUrl": "https://arxiv.org/abs/2112.06905",
      "projectUrl": "",
      "category": "sparse_moe",
      "motivation": "稀疏激活降低训练推理成本",
      "summary": "GLaM 提出了一种稀疏激活的 Mixture-of-Experts (MoE) 架构语言模型，在总参数量达到 1.2T（是 GPT-3 的 7 倍）的同时，每个 token 仅激活 97B 参数（约 8%），训练能耗仅为 GPT-3 的 1/3、推理 FLOPs 减半，并在 29 个 NLP 任务上全面超越 GPT-3。",
      "keyPoints": [
        "提出 GLaM 模型家族，采用稀疏激活 MoE 架构替代传统 Dense Transformer，在每两层 Transformer 中将一层的前馈网络替换为 MoE 层",
        "最大版本 GLaM(64B/64E) 总参数 1.2T，包含 64 个专家，每个 token 通过可学习的门控网络激活其中 Top-2 专家（激活参数仅 96.6B）",
        "训练能耗仅 456 MWh（GPT-3 为 1287 MWh），推理时每 token FLOPs 为 180G（GPT-3 为 350G），实现显著的计算效率提升",
        "引入高质量数据过滤管线：训练基于文本质量分类器的网页过滤，结合 Wikipedia、书籍、论坛、新闻等多源数据并加权混合",
        "在 zero/one/few-shot 设定下，于 29 个公开 NLP 基准（含 NLU 和 NLG）上平均性能超越 GPT-3（175B）",
        "架构改进：用相对位置偏置替代绝对位置编码，在非 MoE 前馈层中用 Gated Linear Unit（GLU）+ GeLU 替代标准 FFN",
        "采用 2D Sharding（GSPMD）进行大规模权重和计算的分区，支持超大规模模型的分布式训练"
      ],
      "detail": "<h5>1. 动机与背景</h5>\n<p>传统大语言模型（如 GPT-3）通过堆叠更多参数提升性能，但 Dense 模型面临两个核心挑战：<strong>训练能耗巨大</strong>（GPT-3 达 1287 MWh）且<strong>推理计算成本高昂</strong>（每个 token 激活全部参数）。MoE 架构的直觉来源于条件计算——不同输入 token 应由网络中不同的\"专家\"子网络来处理，而非每次激活所有参数。GLaM 由此提出：\"用更多总参数扩大模型容量，但每次推理只激活一小部分专家\"，以此在容量和效率之间取得平衡。</p>\n<h5>2. 核心架构设计</h5>\n<p><img alt=\"GLaM MoE 层架构示意图\" src=\"https://arxiv.org/html/2112.06905v2/extracted/3820123/figs/jax_moe.png\" />\n<em>图：GLaM 的 MoE 层结构。在每隔一层的 Transformer 中，标准 FFN 被替换为包含 E 个专家的 MoE 层；门控网络（Gating）为每个 token 选出 Top-2 专家，输出为其加权组合。</em></p>\n<p>GLaM 基于 Decoder-only Transformer，核心修改包括：</p>\n<p><strong>(a) 稀疏 MoE 层（Sparsely Activated MoE）</strong>\n- 替换标准 Transformer 中每隔一层的 FFN 为一个 <strong>MoE 层</strong>，该层包含 E 个独立的前馈网络（专家）。\n- 每个 token 输入到一个 <strong>可学习的门控网络</strong> G(x)，通过 softmax 输出一个概率分布 p = softmax(G(x))。\n- 门控网络选择概率最高的 <strong>Top-2 专家</strong>，最终输出为两个被选中专家输出的加权组合：\n  y = p1 · Expert1(x) + p2 · Expert2(x)\n- 该设计提供了 O(E²) 种可能的 FFN 组合路径，赋予模型极大的计算灵活性。选择 Top-2 而非 Top-1（如 Switch Transformer）是经验权衡：更多专家增加 FLOPs，但 2 个专家在性能与效率间取得最佳平衡。</p>\n<p><strong>(b) 非 MoE 层的改进</strong>\n- 将标准 FFN 中的 ReLU 替换为 <strong>Gated Linear Unit (GLU)</strong> + <strong>GeLU</strong>：计算输入的两个线性变换的逐元素乘积（W1x ⊙ W2x），再通过 GeLU 激活。这提升了非 MoE 层的表示能力。\n- 用 <strong>相对位置偏置</strong>（per-layer relative positional bias, Dai et al. 2019）替代绝对位置编码，使模型更好地处理不同长度的序列。</p>\n<p><strong>(c) 模型变体与规模</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>类型</th>\n<th>总参数</th>\n<th>激活参数</th>\n<th>层数 L</th>\n<th>隐藏维度 H</th>\n<th>头数</th>\n<th>专家 E</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>0.1B</td>\n<td>Dense</td>\n<td>130M</td>\n<td>130M</td>\n<td>12</td>\n<td>768</td>\n<td>12</td>\n<td>-</td>\n</tr>\n<tr>\n<td>0.1B/64E</td>\n<td>MoE</td>\n<td>1.9B</td>\n<td>145M</td>\n<td>12</td>\n<td>768</td>\n<td>12</td>\n<td>64</td>\n</tr>\n<tr>\n<td>1.7B</td>\n<td>Dense</td>\n<td>1.7B</td>\n<td>1.7B</td>\n<td>24</td>\n<td>2048</td>\n<td>16</td>\n<td>-</td>\n</tr>\n<tr>\n<td>8B</td>\n<td>Dense</td>\n<td>8.7B</td>\n<td>8.7B</td>\n<td>32</td>\n<td>4096</td>\n<td>32</td>\n<td>-</td>\n</tr>\n<tr>\n<td>137B</td>\n<td>Dense</td>\n<td>137B</td>\n<td>137B</td>\n<td>64</td>\n<td>8192</td>\n<td>128</td>\n<td>-</td>\n</tr>\n<tr>\n<td><strong>64B/64E</strong></td>\n<td><strong>MoE</strong></td>\n<td><strong>1.2T</strong></td>\n<td><strong>96.6B</strong></td>\n<td><strong>64</strong></td>\n<td><strong>8192</strong></td>\n<td><strong>128</strong></td>\n<td><strong>64</strong></td>\n</tr>\n</tbody>\n</table></div>\n<h5>3. 训练设置</h5>\n<p><strong>(a) 数据管线</strong>\n- GLaM 构建了一个 <strong>1.6 万亿 token</strong> 的高质量训练语料库，数据来源包括：\n  - 经过 text-quality classifier 过滤的网页数据（143B tokens，过滤前 ~7T tokens）\n  - Wikipedia、书籍、论坛、新闻等\n  - 公开社交媒体对话数据（Adiwardana et al., 2020）\n- 各数据源的混合权重通过在小模型上的性能实验确定，同时防止 Wikipedia 等小数据集被过采样。\n- 实验证明，<strong>数据过滤对性能提升至关重要</strong>：对比过滤与非过滤数据训练的 1.7B/64E 模型，过滤后 NLG 和 NLU 性能均有显著提升。</p>\n<p><strong>(b) 优化配置</strong>\n- 优化器：Adafactor\n- 学习率调度：逆平方根衰减（inverse square root schedule），warmup 阶段\n- 使用 2D Sharding（GSPMD, Xu et al. 2021）对大规模模型的权重和计算进行分区，支持在 TPU v4 集群上训练 1.2T 参数模型\n- 训练最大模型消耗 456 MWh，仅为 GPT-3 的 35.4%</p>\n<h5>4. 实验结果概要</h5>\n<ul>\n<li><strong>与 GPT-3 对比</strong>：GLaM(64B/64E) 在 29 个 NLP 任务上 zero-shot 平均 62.7 vs 56.9 (+10.2%)，one-shot 65.5 vs 61.6 (+6.3%)，few-shot 68.1 vs 65.2 (+4.4%)。</li>\n<li><strong>开放域问答</strong>：TriviaQA one-shot 达 75.0%（远超 GPT-3 few-shot 71.2% 和微调 SOTA 69.8%），展示出模型容量对知识吸收的关键作用。</li>\n<li><strong>数据质量消融</strong>：过滤数据 vs 未过滤数据 → NLG/NLU 全面提升，验证了数据质量对 MoE 模型同样至关重要。</li>\n<li><strong>缩放趋势</strong>：随着总参数/激活参数的增大，MoE 模型性能持续优于同等 FLOPs 的 Dense 模型，表明稀疏激活是高效的缩放范式。</li>\n</ul>\n<div class=\"key-point\">💡 关键：GLaM 证明了稀疏 MoE 可以在不牺牲性能的前提下，将训练和推理成本降低至 Dense 同性能级别模型的 1/2~1/3。其\"大总参数 + 小激活参数\"的范式，为此后的 PaLM、Gemini 等模型提供了重要参考。\n⚠️ 注意：MoE 模型的专家负载均衡和通信开销是工程上的关键挑战。GLaM 使用 Top-2 门控 + 辅助负载均衡损失（auxiliary load balancing loss）来确保专家利用率均匀，避免部分专家\"饿死\"。</div>\n<h5>5. 伪代码：MoE 层核心逻辑</h5>\n<pre><code class=\"language-python\"># GLaM MoE 层前向传播（简化为核心逻辑）\ndef moe_layer_forward(x, experts, gate):\n    # x: (batch, seq_len, d_model)\n    # gate: 可学习的门控网络\n    # experts: list of E 个 FFN 模块\n\n    # Step 1: 计算门控分布\n    logits = gate(x)                      # (batch*seq_len, E)\n    probs = softmax(logits, dim=-1)       # 每个专家被选中的概率\n\n    # Step 2: 选择 Top-2 专家\n    top2_probs, top2_indices = topk(probs, k=2)\n\n    # Step 3: 归一化 Top-2 概率\n    top2_probs = top2_probs / top2_probs.sum(dim=-1, keepdim=True)\n\n    # Step 4: 每个 token 仅通过其选中的 2 个专家前向\n    output = zeros_like(x)\n    for i, (idx1, idx2) in enumerate(top2_indices):\n        out1 = experts[idx1](x[i])\n        out2 = experts[idx2](x[i])\n        output[i] = top2_probs[i][0] * out1 + top2_probs[i][1] * out2\n\n    return output\n</code></pre>",
      "quiz": {
        "q": "GLaM(64B/64E) 模型总参数量为 1.2T，但每个 token 仅激活约 96.6B 参数（约 8%）。实现这一点的核心技术是？",
        "options": [
          "模型蒸馏，将大模型压缩为小模型进行推理",
          "稀疏激活 MoE 架构，通过门控网络为每个 token 动态选择 Top-2 专家",
          "参数共享，不同层之间复用相同的权重矩阵",
          "量化压缩，将 1.2T 参数量化为 96.6B 的 8-bit 表示"
        ],
        "answer": 1,
        "explain": "GLaM 的核心创新在于稀疏激活的 Mixture-of-Experts 架构：每个 token 只经过门控网络选择的 Top-2 专家计算，而非激活全部 64 个专家，从而实现总容量大但计算量小的效果。"
      }
    },
    {
      "id": "chinchilla",
      "num": 11,
      "name": "Chinchilla",
      "fullName": "计算最优语言模型 (Training Compute-Optimal LLMs)",
      "year": "2022.03",
      "org": "DeepMind",
      "parent": "gpt3",
      "paperUrl": "https://arxiv.org/abs/2203.15556",
      "projectUrl": "",
      "category": "autoregressive",
      "motivation": "数据参数等比计算最优",
      "summary": "Chinchilla 提出在固定训练计算量下应同时、近似等比例扩展模型参数量和训练 token 数，解决了当时大模型“参数过大、训练数据不足”的计算分配问题。它用与 Gopher 相同的训练 FLOPs 训练 70B 参数模型和 1.4T token，证明更小但训练更充分的模型可以优于 280B 级模型。",
      "keyPoints": [
        "研究问题是固定 compute budget <span class=\"kb-math kb-math-inline\">C</span> 下如何选择参数量 <span class=\"kb-math kb-math-inline\">N</span> 和训练 token 数 <span class=\"kb-math kb-math-inline\">D</span>，而不是单纯扩大参数量。",
        "论文训练并分析 400 多个 Transformer LM，规模从约 70M 到 16B+ 参数，训练数据从 5B 到 500B token。",
        "三种估计方法分别是固定模型尺寸扫 token、IsoFLOP profiles、拟合参数化 loss function。",
        "核心损失模型为 <span class=\"kb-math kb-math-inline\">\\hat L(N,D)=E+A/N^\\alpha+B/D^\\beta</span>，把误差拆成不可约熵、模型容量不足和训练 token 不足三部分。",
        "计算近似采用 <span class=\"kb-math kb-math-inline\">\\mathrm{FLOPs}\\approx 6ND</span>，在约束 <span class=\"kb-math kb-math-inline\">6ND=C</span> 下寻找最小 loss 的 <span class=\"kb-math kb-math-inline\">(N,D)</span>。",
        "结论是 compute 增长时 <span class=\"kb-math kb-math-inline\">N</span> 和 <span class=\"kb-math kb-math-inline\">D</span> 应接近等比例扩展，明显不同于 Kaplan scaling law 中更偏向增大参数的建议。",
        "Chinchilla 实例为 70B 参数、1.4T token，与 Gopher 280B 参数、300B token 使用相同 FLOPs，但下游表现更强且推理成本更低。",
        "论文强调数据集规模和质量成为继续 scaling 的关键瓶颈，不能只把预算投入更大参数量。"
      ],
      "detail": "<p><img alt=\"Chinchilla compute-optimal scaling 示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2203.15556/assets/x1.png\" />\n<em>图：论文 Figure 1。三种估计方法都预测当时的大型 LM 位于“参数过大、token 不足”的区域；Chinchilla 以更少参数和更多 token 接近 compute-optimal 前沿。</em></p>\n<pre><code class=\"language-python\"># Chinchilla 风格的 compute-optimal scaling 估计流程\nruns = []\n\nfor N in model_sizes:                         # 约 70M 到 16B+\n    for D in token_budgets:                   # 约 5B 到 500B\n        model = TransformerLM(num_params=N)\n        schedule = cosine_schedule(length_tokens=D)\n        loss = train_and_measure_loss(model, tokens=D, schedule=schedule)\n        C = 6 * N * D                         # 训练 FLOPs 近似\n        runs.append((N, D, C, loss))\n\n# 方法 1：从训练曲线 envelope 中找每个 compute 下的最低 loss\nfrontier_1 = lower_envelope(runs, key=&quot;C&quot;, value=&quot;loss&quot;)\n\n# 方法 2：固定 FLOPs 切片，拟合 loss-vs-params 的 valley\nfrontier_2 = []\nfor C0 in flops_grid:\n    points = select_isoflop_points(runs, C0)\n    N_star = argmin_parabola_fit(points, x=&quot;log_N&quot;, y=&quot;loss&quot;)\n    D_star = C0 / (6 * N_star)\n    frontier_2.append((C0, N_star, D_star))\n\n# 方法 3：拟合 L_hat(N,D)，再在 6ND=C 约束下优化\nloss_law = fit_huber_loss_model(runs, form=&quot;E + A/N^alpha + B/D^beta&quot;)\nfor C0 in target_compute_budgets:\n    N_star, D_star = minimize(loss_law, constraint=lambda N, D: 6 * N * D == C0)\n</code></pre>\n<p>Chinchilla 论文把大模型 scaling 的核心问题从“更大模型是否更好”改写为“给定训练 FLOPs，参数和数据怎么配比最优”。形式化地，令 <span class=\"kb-math kb-math-inline\">N</span> 为非 embedding 参数量，<span class=\"kb-math kb-math-inline\">D</span> 为训练 token 数，<span class=\"kb-math kb-math-inline\">L(N,D)</span> 为最终预训练 loss。目标是在训练计算量固定时求：</p>\n<div class=\"kb-math kb-math-display\">N_{\\mathrm{opt}}(C),D_{\\mathrm{opt}}(C)=\\arg\\min_{N,D\\;\\mathrm{s.t.}\\;\\mathrm{FLOPs}(N,D)=C}L(N,D)</div>\n<p>在 dense Transformer LM 中，论文沿用近似：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{FLOPs}(N,D)\\approx 6ND</div>\n<p>这个约束说明，如果预算 <span class=\"kb-math kb-math-inline\">C</span> 固定，参数量增加就必然减少可训练 token 数；反之，更多 token 需要缩小模型。Chinchilla 的贡献不是提出新架构，而是重新估计这个 trade-off 的最优点。</p>\n<p>第一种方法固定一组模型尺寸，给每个模型训练不同 token horizon，并从完整训练曲线上抽取在每个 FLOPs 水平下的最低 loss envelope。然后对 envelope 上的最优 <span class=\"kb-math kb-math-inline\">N</span> 与 <span class=\"kb-math kb-math-inline\">D</span> 拟合幂律：</p>\n<div class=\"kb-math kb-math-display\">N_{\\mathrm{opt}}\\propto C^a,\\quad D_{\\mathrm{opt}}\\propto C^b</div>\n<p>该方法得到 <span class=\"kb-math kb-math-inline\">a\\approx0.50,b\\approx0.50</span>。直觉上，当 compute 扩大 10 倍时，不应主要把预算用于把模型变大，而应让模型大小和训练 token 数都约按平方根比例增长。</p>\n<p>第二种方法是 IsoFLOP profiles：固定若干 FLOPs 预算，训练不同参数量的模型，并根据 <span class=\"kb-math kb-math-inline\">D=C/(6N)</span> 自动确定 token 数。对每条固定 FLOPs 曲线，loss 关于参数量会出现一个 valley：模型太小会容量不足，模型太大则 token 不够、训练不足。论文对每条曲线拟合抛物线来找 valley，再拟合 <span class=\"kb-math kb-math-inline\">N_{\\mathrm{opt}}</span> 和 <span class=\"kb-math kb-math-inline\">D_{\\mathrm{opt}}</span> 随 <span class=\"kb-math kb-math-inline\">C</span> 的幂律，得到 <span class=\"kb-math kb-math-inline\">a\\approx0.49,b\\approx0.51</span>，与第一种方法几乎一致。</p>\n<p>第三种方法拟合参数化损失函数：</p>\n<div class=\"kb-math kb-math-display\">\\hat L(N,D)=E+\\frac{A}{N^\\alpha}+\\frac{B}{D^\\beta}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">E</span> 表示自然文本的不可约熵或理想生成过程下限，<span class=\"kb-math kb-math-inline\">A/N^\\alpha</span> 表示模型容量有限带来的函数逼近误差，<span class=\"kb-math kb-math-inline\">B/D^\\beta</span> 表示训练 token 有限和优化步数有限带来的误差。论文用 Huber loss 拟合 <span class=\"kb-math kb-math-inline\">(A,B,E,\\alpha,\\beta)</span>，再在 <span class=\"kb-math kb-math-inline\">6ND=C</span> 下求解析近似：</p>\n<div class=\"kb-math kb-math-display\">N_{\\mathrm{opt}}(C)=G\\left(\\frac{C}{6}\\right)^a,\\quad D_{\\mathrm{opt}}(C)=G^{-1}\\left(\\frac{C}{6}\\right)^b</div>\n<div class=\"kb-math kb-math-display\">G=\\left(\\frac{\\alpha A}{\\beta B}\\right)^{1/(\\alpha+\\beta)},\\quad a=\\frac{\\beta}{\\alpha+\\beta},\\quad b=\\frac{\\alpha}{\\alpha+\\beta}</div>\n<p>该方法得到 <span class=\"kb-math kb-math-inline\">a\\approx0.46,b\\approx0.54</span>，仍然支持“数据和参数接近等比扩展”。这与 Kaplan et al. 先前建议形成鲜明对比：Kaplan 的指数约为 <span class=\"kb-math kb-math-inline\">a=0.73,b=0.27</span>，意味着 compute 增长时更偏向扩模型，而 Chinchilla 认为当时的大模型显著 undertrained。</p>\n<p>Chinchilla 本身是这个 scaling law 的验证实验。DeepMind 用与 Gopher 相同的 compute budget，不再训练 280B 参数、约 300B token 的模型，而是训练 70B 参数、1.4T token 的模型。两者 FLOPs 类似，但 Chinchilla 参数少 4 倍、训练 token 多约 4 倍。论文报告 Chinchilla 在大量下游任务上超过 Gopher、GPT-3、Jurassic-1 和 Megatron-Turing NLG，并在 MMLU 上达到约 67.5%/67.6% 的 5-shot 平均准确率。</p>\n<p>架构上，Chinchilla 没有引入颠覆性结构，而是沿用 Gopher 风格的 dense autoregressive Transformer。它有 80 层、64 个 attention heads、key/value size 128、<span class=\"kb-math kb-math-inline\">d_{model}=8192</span>，FFN size 为 <span class=\"kb-math kb-math-inline\">4d_{model}</span>。训练细节包括使用 MassiveText、AdamW、略微修改的 SentencePiece tokenizer、不做 NFKC normalisation，并用 bfloat16 前后向加 float32 optimizer state。论文的重点是证明“训练分配”比“架构花样”更能解释当时的性能差距。</p>\n<div class=\"key-point\">💡 关键：Chinchilla law 的工程启示是，同样的钱不一定应该训练最大模型；如果数据 token 不够，较小模型训练更久会同时改善质量、降低推理成本和降低微调成本。</div>\n<p>与 GPT-3/Gopher 时代的做法相比，Chinchilla 把 scaling 的瓶颈从模型参数转向高质量数据。Table 3 的外推显示，175B 参数模型若要 compute-optimal 需要数万亿 token；280B 级模型需要更多 token 和更大 FLOPs 才合理。这也解释了后来 LLM 训练越来越重视数据去重、质量过滤、长尾覆盖和多 epoch 风险控制：如果最优策略要求更多 token，数据工程就成为模型 scaling 的一等公民。</p>",
      "quiz": {
        "q": "Chinchilla 论文相对于 Kaplan scaling law 最关键的修正是什么？",
        "options": [
          "训练更大模型时应该固定训练 token 数",
          "在固定 compute 下，模型参数量和训练 token 数应接近等比例扩展",
          "MoE 路由比 dense Transformer 更 compute-optimal",
          "语言模型 loss 与训练数据量无关"
        ],
        "answer": 1,
        "explain": "Chinchilla 通过三种估计方法发现 N 和 D 的最优 scaling 指数都接近 0.5，说明许多大模型参数偏大、训练 token 不足。"
      }
    },
    {
      "id": "palm",
      "num": 12,
      "name": "PaLM",
      "fullName": "Pathways 语言模型 (Pathways Language Model)",
      "year": "2022.04",
      "org": "Google Research",
      "parent": "gpt3",
      "paperUrl": "https://arxiv.org/abs/2204.02311",
      "projectUrl": "",
      "category": "autoregressive",
      "motivation": "540B稠密模型验证规模化",
      "summary": "PaLM 训练了 540B 参数的稠密 decoder-only Transformer，用 Pathways 在 6144 块 TPU v4 上实现跨 Pod 高效训练，验证了 500B+ 稠密语言模型继续规模化仍能带来 few-shot、推理、多语言和代码能力提升。它的核心贡献是把超大稠密模型的训练系统、架构细节和涌现评估连成了一次完整规模化实验。",
      "keyPoints": [
        "提出 8B、62B、540B 三档 PaLM 稠密自回归语言模型，最大模型 540B 参数、训练约 780B tokens。",
        "使用 Pathways 系统跨两个 TPU v4 Pod 训练，合计 6144 芯片，并采用 pod 级二路数据并行加 pod 内模型/数据并行。",
        "训练效率以 MFU（Model FLOPs Utilization）衡量，PaLM 540B 达到 46.2% MFU 和 57.8% HFU。",
        "架构采用 decoder-only Transformer，并结合 SwiGLU、Parallel Layers、Multi-Query Attention、RoPE、无 bias 等规模化友好的设计。",
        "数据集包含网页、社交媒体对话、书籍、代码、维基百科、新闻等高质量文本，词表为 256k SentencePiece。",
        "论文系统评估英语 NLP、BIG-bench、GSM8K、代码、多语言任务，并观察到若干任务随规模出现非连续跃迁。",
        "PaLM 代表的是 GPT-3 路线的“更大稠密模型”验证，后续也为 Chinchilla/LLaMA 等更重视数据-参数配比的工作提供了强基线。"
      ],
      "detail": "<p><img alt=\"PaLM Pathways 跨 TPU Pod 数据并行示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2204.02311/assets/x3.png\" />\n<em>图：论文 Figure 2 的 Pathways 执行图面板，展示跨两个 TPU v4 Pod 的前向/反向、梯度传输和优化器更新流程。</em></p>\n<pre><code class=\"language-python\"># PaLM/Pathways 跨 Pod 训练流程伪代码\ndef train_palm_with_pathways(global_batch, pod_a, pod_b, optimizer):\n    # 每个 pod 内部持有同一模型的分片副本，使用模型并行 + fully sharded data parallel\n    batch_a, batch_b = split(global_batch, parts=2)\n\n    # 1. pod 内并行执行前向和反向\n    grads_a = pod_a.forward_backward(batch_a)\n    grads_b = pod_b.forward_backward(batch_b)\n\n    # 2. pod 之间只交换对方需要累加的梯度分片\n    remote_for_a = pathways_send_recv(grads_a, source=pod_a, target=pod_b)\n    remote_for_b = pathways_send_recv(grads_b, source=pod_b, target=pod_a)\n\n    # 3. 两侧累加本地和远端梯度，独立执行同一优化器更新\n    full_grads_a = add_sharded_gradients(grads_a, remote_for_a)\n    full_grads_b = add_sharded_gradients(grads_b, remote_for_b)\n    pod_a.params = optimizer.step(pod_a.params, full_grads_a)\n    pod_b.params = optimizer.step(pod_b.params, full_grads_b)\n\n    # 更新后两个 pod 的参数保持 bitwise-identical\n    assert same_parameters(pod_a.params, pod_b.params)\n</code></pre>\n<p>PaLM 的第一层意义是系统工程：540B 稠密模型不能只靠常规单集群数据并行训练。论文用 Pathways 将一个 Python client 发出的 sharded dataflow program 调度到两个 TPU v4 Pod，每个 Pod 内部使用 12 路模型并行和 256 路 fully sharded data parallel；跨 Pod 则做二路数据并行。每一步中两个 Pod 各自处理半个 batch，完成反向传播后交换梯度，再各自累加并更新参数，从而在没有流水线并行的情况下把训练扩展到 6144 芯片。</p>\n<p>这种设计刻意避开了 pipeline parallelism 的 bubble 和微批次权重重复加载问题，但代价是跨数据中心网络的梯度传输会非常突发。论文报告每步对应主机之间要交换约 GB 级梯度，聚合带宽峰值很高，因此 Pathways 需要把传输拆成小块并走多路径路由。PaLM 用 MFU 而不是只看 HFU，是因为 rematerialization 等实现会改变硬件实际执行 FLOPs；MFU 更接近“按模型理论前反向 FLOPs 计算，系统每秒真正处理了多少 token”。</p>\n<p>架构上，PaLM 仍是 GPT-3 风格的自回归 decoder-only Transformer，但做了几处面向大规模训练和推理的改动。SwiGLU 用门控前馈层增强表达能力；Parallel Layers 让 attention 和 MLP 从同一个归一化输入并行计算，便于融合矩阵乘并提升吞吐；Multi-Query Attention 让所有 query heads 共享 key/value，降低自回归解码时 KV cache 带宽；RoPE 用旋转位置编码注入相对位置信息；去掉 dense kernel 和 LayerNorm bias 则简化参数与训练行为。这些设计单独看都不是 PaLM 首创，但 PaLM 证明它们能在 540B 稠密规模上组合工作。</p>\n<p>训练目标仍是标准 next-token prediction。若输入 token 序列为 <span class=\"kb-math kb-math-inline\">x_1,\\dots,x_T</span>，模型优化：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}(\\theta)=-\\sum_{t=1}^{T}\\log p_\\theta(x_t \\mid x_{&lt;t})</div>\n<p>优化器使用 Adafactor，学习率先保持较大初值再按步数衰减，并配合全局梯度裁剪。PaLM 的数据混合约 780B tokens，覆盖对话、网页、书籍、代码、维基百科和新闻；256k SentencePiece 词表帮助多语言和代码场景保留更细的可逆文本信息。这里的关键不是“有监督任务微调”，而是在统一预训练目标下测试规模本身能否提升 few-shot 适应能力。</p>\n<p>评估结果显示，PaLM 540B 在大量英文 NLP 基准、BIG-bench、数学推理、代码生成和多语言任务上明显强于 8B/62B，并在部分 BIG-bench 任务中出现规模跃迁。论文把这种现象描述为 discontinuous improvements：从小模型到中等模型变化不大，但到 540B 后能力突然显现。这个观察推动了后来关于 emergence、chain-of-thought 和规模阈值的讨论，不过也要注意，PaLM 同时消耗了极高训练算力；Chinchilla 随后会指出，在同样或相近预算下，数据-参数配比可能比继续堆参数更关键。</p>\n<div class=\"warn-box\">⚠️ 注意：PaLM 的“算法贡献”不只是 540B 参数本身，而是大模型训练系统、架构选择、数据混合、优化设置和评估协议的组合；离开 Pathways 训练栈，很难复现这一级别的稠密模型训练效率。</div>",
      "quiz": {
        "q": "PaLM 使用 Pathways 跨两个 TPU v4 Pod 训练时，pod 级并行的关键步骤是什么？",
        "options": [
          "把模型层按顺序切成流水线，每个 Pod 只保存连续若干层",
          "两个 Pod 各处理一半 batch，交换梯度后各自执行相同参数更新",
          "一个 Pod 只训练 embedding，另一个 Pod 只训练 Transformer block",
          "每个 Pod 训练独立模型，最后对 logits 做 ensemble"
        ],
        "answer": 1,
        "explain": "PaLM 540B 使用 pod 级二路数据并行：每个 Pod 内完成前向/反向，跨 Pod 交换并累加梯度，再并行更新以保持参数一致。"
      }
    },
    {
      "id": "llama",
      "num": 13,
      "name": "LLaMA",
      "fullName": "开放高效基础语言模型 (LLaMA)",
      "year": "2023.02",
      "org": "Meta AI",
      "parent": "chinchilla",
      "paperUrl": "https://arxiv.org/abs/2302.13971",
      "projectUrl": "",
      "category": "open_foundation",
      "motivation": "公开数据训练高效小模型",
      "summary": "LLaMA 提出了一组 7B 到 65B 的高效基础语言模型，用纯公开数据和更多训练 token 证明“小模型长训练”可以在推理成本更低的前提下达到或超过更大闭源模型的效果。",
      "keyPoints": [
        "模型族覆盖 7B、13B、33B、65B；7B/13B 训练 1.0T token，33B/65B 训练 1.4T token，全局 batch 为 4M token。",
        "训练语料全部来自公开可获取数据：CommonCrawl、C4、GitHub、Wikipedia、Books、ArXiv、StackExchange。",
        "采用 decoder-only Transformer，并集成 RMSNorm 预归一化、SwiGLU 前馈激活、RoPE 旋转位置编码。",
        "使用 SentencePiece BPE tokenizer，数字按单个 digit 切分，未知 UTF-8 字符 fallback 到 byte。",
        "优化器为 AdamW，使用 cosine learning-rate schedule、2000 warmup steps、0.1 weight decay、1.0 gradient clipping。",
        "工程侧使用高效 causal attention、activation checkpointing、model/sequence parallelism 和通信计算重叠来提升训练吞吐。",
        "核心设计目标不是“最大参数量”，而是在给定推理预算下获得最佳性能；LLaMA-13B 在多数 benchmark 上超过 GPT-3 175B，65B 接近 Chinchilla-70B 与 PaLM-540B。"
      ],
      "detail": "<p><img alt=\"LLaMA 训练损失曲线\" src=\"https://ar5iv.labs.arxiv.org/html/2302.13971/assets/x1.png\" />\n<em>图：LLaMA 7B、13B、33B、65B 随训练 token 增加的 loss 曲线；33B/65B 训练到 1.4T token，小模型训练到 1.0T token。</em></p>\n<pre><code class=\"language-python\"># LLaMA 预训练核心流程（按论文方法整理）\npublic_sources = [&quot;CommonCrawl&quot;, &quot;C4&quot;, &quot;GitHub&quot;, &quot;Wikipedia&quot;, &quot;Books&quot;, &quot;ArXiv&quot;, &quot;StackExchange&quot;]\nmodel = DecoderOnlyTransformer(norm=&quot;RMSNorm&quot;, ffn=&quot;SwiGLU&quot;, position=&quot;RoPE&quot;)\noptimizer = AdamW(beta1=0.9, beta2=0.95, weight_decay=0.1)\nscheduler = CosineSchedule(warmup_steps=2000, final_lr_ratio=0.1)\n\nfor batch in stream_tokens(public_sources, batch_tokens=4_000_000):\n    x = sentencepiece_bpe(batch, split_digits=True, byte_fallback=True)\n    logits = model(x[:, :-1])\n    loss = cross_entropy(logits, x[:, 1:])\n    loss.backward()\n    clip_grad_norm_(model.parameters(), 1.0)\n    optimizer.step()\n    scheduler.step()\n</code></pre>\n<p>LLaMA 的问题设定来自 Chinchilla scaling law 之后的一个实际矛盾：如果只按训练 compute 最优来选模型，模型可能仍然太大，线上推理成本很高；而服务一个基础模型时，推理预算往往比一次性训练预算更关键。因此论文把目标改成“在多个推理预算点上获得尽可能强的模型”，选择训练较小的 decoder-only Transformer，但让它们看远多于传统设置的 token。论文中特别指出，虽然 Chinchilla 建议 10B 模型约配 200B token，但他们观察到 7B 模型在超过 1T token 后仍持续变好，这就是 LLaMA 选择长训练的直接依据。</p>\n<p>核心训练目标仍是标准自回归语言建模：给定 token 序列 <span class=\"kb-math kb-math-inline\">x_1,\\ldots,x_T</span>，模型最大化下一个 token 的条件概率，等价于最小化负对数似然：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{LM}}(\\theta)=-\\frac{1}{T}\\sum_{t=1}^{T}\\log p_\\theta(x_t\\mid x_{&lt;t})</div>\n<p>这个目标看似普通，但 LLaMA 的关键在于数据和预算组合。预训练数据中 CommonCrawl 占 67%，C4 占 15%，GitHub、Wikipedia、Books 各占 4.5%，ArXiv 占 2.5%，StackExchange 占 2%。这些语料的共同约束是公开可获取、可支持研究发布，而不是依赖“Books 2TB”或社交媒体对话这类不可复现数据源。数据侧还进行了去重、语言识别、质量过滤、许可证过滤等处理，使得开放模型能在透明数据来源下逼近闭源模型能力。</p>\n<p>架构上，LLaMA 没有提出全新的 Transformer 结构，而是把当时被证明有效的组件组合成稳定高效的 decoder-only 模型。预归一化把每个子层输入先做 RMSNorm：</p>\n<div class=\"kb-math kb-math-display\">\\operatorname{RMSNorm}(x)=\\frac{x}{\\sqrt{\\frac{1}{d}\\sum_{i=1}^{d}x_i^2+\\epsilon}}\\odot g</div>\n<p>这样做的直觉是让 attention 和 FFN 子层看到尺度更稳定的输入，降低大规模训练时梯度爆炸或深层不稳定的风险。前馈层用 SwiGLU 替代 ReLU，常见写法为：</p>\n<div class=\"kb-math kb-math-display\">\\operatorname{FFN}(x)=\\left(\\operatorname{Swish}(xW_1)\\odot xW_3\\right)W_2</div>\n<p>SwiGLU 通过门控分支控制信息流，比普通 ReLU FFN 更有表达能力；论文还把隐藏维度设为 <span class=\"kb-math kb-math-inline\">\\frac{2}{3}\\cdot4d</span>，在性能和计算量之间折中。</p>\n<p>位置编码使用 RoPE，而不是绝对位置 embedding。RoPE 的做法是在每层 attention 的 query/key 上施加与位置相关的旋转，使相对位置信息自然进入点积注意力：</p>\n<div class=\"kb-math kb-math-display\">q_m^\\top k_n \\rightarrow (R_m q)^\\top(R_n k)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">R_m</span> 和 <span class=\"kb-math kb-math-inline\">R_n</span> 是由 token 位置决定的旋转矩阵。直觉上，RoPE 让注意力分数依赖相对距离 <span class=\"kb-math kb-math-inline\">m-n</span>，比固定绝对位置表更适合长序列泛化，也避免为每个位置学习单独参数。</p>\n<p>工程优化也是 LLaMA 能训练 65B 模型的关键。论文使用 xFormers 风格的 memory-efficient causal attention，不存完整 attention matrix，也不计算 causal mask 会屏蔽掉的 query-key 分数；再通过 activation checkpointing 只保留线性层输出等昂贵激活，减少反向传播显存压力。模型并行和序列并行负责把参数、激活和序列维度拆到多卡上，通信计算重叠则尽量隐藏 all-reduce 的开销。最终 65B 模型在 2048 张 80GB A100 上约可达到 380 tokens/sec/GPU，1.4T token 训练约 21 天。</p>\n<p>与 GPT-3、PaLM、Chinchilla 等闭源或半闭源系统相比，LLaMA 的创新不是某个单点公式，而是一个可复现的训练配方：公开数据、长 token 训练、高效 Transformer 组件、以及面向推理预算的模型尺寸选择。它直接影响了后续开源 LLM 生态，因为 13B 级模型可在单卡或少量 GPU 上运行，却能在常识推理、问答、阅读理解、代码等任务上接近或超过更大模型。</p>",
      "quiz": {
        "q": "LLaMA 相比单纯扩大参数量的路线，最核心的效率思想是什么？",
        "options": [
          "用 encoder-decoder 架构替代 decoder-only 架构",
          "在推理预算约束下，用较小模型训练更多公开 token",
          "主要依赖人工标注指令数据提升能力",
          "用检索系统替代参数化语言模型"
        ],
        "answer": 1,
        "explain": "LLaMA 的核心是让较小模型看更多 token，从而在服务成本更低的情况下达到强性能；它仍是 decoder-only 自回归 Transformer。"
      }
    },
    {
      "id": "gpt4",
      "num": 14,
      "name": "GPT-4",
      "fullName": "GPT-4 技术报告 (GPT-4 Technical Report)",
      "year": "2023.03",
      "org": "OpenAI",
      "parent": "gpt3",
      "paperUrl": "https://arxiv.org/abs/2303.08774",
      "projectUrl": "",
      "category": "autoregressive",
      "motivation": "可预测扩展到多模态前沿",
      "summary": "GPT-4 技术报告提出并评估了一个可接收图像和文本输入、输出文本的大规模多模态 Transformer，并把“可预测扩展”和 RLHF 后训练作为训练前沿模型时降低失控风险和提升对齐质量的核心方法。",
      "keyPoints": [
        "GPT-4 是 Transformer-style 模型，预训练目标是文档中的 next-token prediction，可接收 image/text 输入并生成 text 输出。",
        "报告明确不披露模型大小、硬件、训练 compute、数据构造和具体架构细节，原因是竞争和安全影响。",
        "预训练后使用 RLHF 进行行为微调，提升事实性、遵循用户意图和期望行为。",
        "可预测扩展是核心工程方法：用小于 GPT-4 约 1,000x 到 10,000x compute 的模型拟合 scaling law，预测最终 loss 和 HumanEval 能力。",
        "Loss prediction 使用带 irreducible loss 的幂律形式 <span class=\"kb-math kb-math-inline\">L(C)=aC^b+c</span>，并在训练早期、不使用中途结果的情况下预测 GPT-4 最终 loss。",
        "能力评估覆盖专业考试、MMLU、多语言 MMLU、HumanEval 等；例如模拟律师考试成绩位于考生前 10% 左右。",
        "安全流程包括 50+ 领域专家红队测试、额外安全 RLHF prompts、以及 rule-based reward models (RBRMs) 作为模型辅助安全奖励信号。",
        "报告同时强调 GPT-4 仍有幻觉、有限上下文窗口、不会从经验中持续学习等限制。"
      ],
      "detail": "<p><img alt=\"GPT-4 可预测扩展损失图\" src=\"https://ar5iv.labs.arxiv.org/html/2303.08774/assets/x1.png\" />\n<em>图：用较小模型拟合幂律曲线预测 GPT-4 在内部代码数据集上的最终 loss；绿色点为 GPT-4，虚线为基于小模型的预测。</em></p>\n<pre><code class=\"language-python\"># GPT-4 技术报告披露的高层训练与预测流程（细节被报告有意省略）\nsmall_runs = []\nfor compute in compute_grid(max_compute=&quot;GPT-4 / 1000 to GPT-4 / 10000&quot;):\n    m = train_transformer_next_token(compute=compute, data=&quot;public + licensed + third-party&quot;)\n    loss = evaluate(m, dataset=&quot;internal codebase not in training set&quot;)\n    humaneval = evaluate_pass_rate(m, dataset=&quot;HumanEval subset&quot;)\n    small_runs.append((compute, loss, humaneval))\n\nloss_law = fit_power_law(small_runs, form=&quot;L(C)=a*C**b+c&quot;)\nhumaneval_law = fit_capability_law(small_runs)\nregister_predictions(loss_law, humaneval_law)\n\ngpt4 = train_full_scale_multimodal_transformer()\ngpt4 = post_train_with_sft_rlhf_and_safety_rewards(gpt4)\n</code></pre>\n<p>GPT-4 技术报告的一个特殊点是“方法细节主动留白”：论文只说明 GPT-4 是预训练 next-token Transformer，并使用公开数据、授权数据和第三方数据；但不披露参数量、层数、训练 compute、数据清洗配方或具体多模态接口。这里的算法精读要把重点放在报告公开强调的机制：如何让一个超大训练任务在完成前就具有可预测性，以及如何通过后训练和安全奖励塑造模型行为。</p>\n<p>预训练目标仍可抽象为条件语言建模。若输入上下文 <span class=\"kb-math kb-math-inline\">x_{&lt;t}</span> 可以包含文本 token，也可以包含由视觉编码链路转成的上下文表示，则 next-token loss 为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{NTP}}(\\theta)=-\\sum_{t}\\log p_\\theta(x_t\\mid x_{&lt;t})</div>\n<p>这类目标本身不是 GPT-4 的新贡献；报告更强调大规模训练系统必须“按尺度可预测”。原因很直接：GPT-4 级别的训练无法像小模型一样反复调参重训，一旦学习率、数据配比、并行系统或数值稳定性出问题，代价极高。因此 OpenAI 先训练一系列小 compute 模型，使用相同方法论测量 loss，再拟合带不可约误差项的 scaling law：</p>\n<div class=\"kb-math kb-math-display\">L(C)=aC^b+c</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">C</span> 是训练 compute，<span class=\"kb-math kb-math-inline\">c</span> 表示再增加 compute 也难以消除的 irreducible loss。报告称该预测在 GPT-4 训练开始后不久、且不使用中途训练结果的情况下完成；这使团队能在完整训练结束前估计最终模型是否处在预期轨道上。</p>\n<p>能力预测部分比 loss 更难，因为 benchmark 分数通常噪声大且非单调。报告选择 HumanEval 的子集来观察代码合成能力，并用 mean log pass rate 建模。对于某个问题集合 <span class=\"kb-math kb-math-inline\">P</span>，论文给出的近似关系是：</p>\n<div class=\"kb-math kb-math-display\">-\\mathbb{E}_{P}[\\log(\\operatorname{pass\\_rate}(C))]=\\alpha C^{-k}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\alpha,k&gt;0</span>。直觉是：随着 compute 增大，模型解决问题的失败概率以幂律下降；但因为极低 pass rate 难以估计，论文只在每个小模型都有机会解出的题目集合上拟合。这种方法不能保证所有能力都可预测，报告也指出 inverse scaling 类任务可能在某些尺度上反常，但它为训练前沿模型提供了一套比“训练完再看”更可控的监控框架。</p>\n<p>后训练阶段使用 RLHF 来把预训练模型转成更符合用户意图的助手。报告没有给出完整 RLHF 损失，但流程可理解为：先通过人类偏好或标注得到奖励信号，再优化策略模型，使回答在有用性、事实性和期望行为上更接近标注标准。抽象写法是：</p>\n<div class=\"kb-math kb-math-display\">\\max_{\\pi_\\theta}\\;\\mathbb{E}_{x\\sim\\mathcal{D},\\,y\\sim\\pi_\\theta(\\cdot\\mid x)}[R_{\\text{human}}(x,y)]</div>\n<p>实际系统还需要 KL 约束、拒答策略、偏好数据混合等工程细节；报告只强调 RLHF 后 factuality 和 adherence to desired behavior 得到改善。</p>\n<p>GPT-4 的安全方法加入了 model-assisted safety pipeline。除了常规 RLHF，OpenAI 收集额外安全相关 prompts，并使用 RBRMs：一组 zero-shot GPT-4 classifiers。RBRM 的输入包括 prompt、policy model 的输出、以及人工书写的 rubric；输出是对回答类型的分类，例如“理想拒答”“不理想拒答”“包含不允许内容”“安全非拒答”。在安全 RLHF 中，可以把 RBRM 分类结果转成附加奖励：</p>\n<div class=\"kb-math kb-math-display\">R(x,y)=R_{\\text{preference}}(x,y)+\\lambda R_{\\text{RBRM}}(x,y;\\text{rubric})</div>\n<p>上式是对报告机制的抽象表达，不代表论文披露了完整实现。它的直觉是把“什么时候该拒答、什么时候不该过度拒答”写成可执行的评分规则，减少 reward model 标注说明不充分带来的脆弱行为。</p>\n<p>与 GPT-3 相比，GPT-4 的论文贡献并不在公开一个可复现架构，而在说明前沿模型训练的两个系统性原则：第一，用小模型外推约束大模型训练风险；第二，用人类反馈、专家红队和模型辅助规则奖励做部署前行为塑形。这也解释了为什么 GPT-4 技术报告更像“训练与安全系统报告”，而不是传统架构论文。</p>",
      "quiz": {
        "q": "GPT-4 技术报告中，predictable scaling 的主要作用是什么？",
        "options": [
          "公开 GPT-4 的完整参数量和层数",
          "在大训练完成前，用小规模训练结果预测最终 loss 和部分能力",
          "用检索增强替代 Transformer 预训练",
          "让模型在推理时自动更新参数"
        ],
        "answer": 1,
        "explain": "报告核心强调通过较小 compute 模型拟合幂律关系，提前预测 GPT-4 的最终 loss 与 HumanEval 子集能力，而不是披露完整架构。"
      }
    },
    {
      "id": "retnet",
      "num": 15,
      "name": "RetNet",
      "fullName": "保留网络 (Retentive Network)",
      "year": "2023.07",
      "org": "Microsoft Research",
      "parent": "transformer_xl",
      "paperUrl": "https://arxiv.org/abs/2307.08621",
      "projectUrl": "",
      "category": "long_context",
      "motivation": "保留机制兼顾并行与递归",
      "summary": "RetNet 提出了 **Retention（保留）机制**替代 Transformer 的 self-attention，从理论上统一了递归与注意力的联系，使同一模型支持并行训练、\\\\(\\mathcal{O}(1)\\\\) 的推理复杂度和块递归长序列建模，成为大语言模型领域 Transformer 的有力继任者。",
      "keyPoints": [
        "提出了 <strong>Retention 机制</strong>，从数学上推导出递归（RNN）与注意力（Attention）在序列建模中的统一形式",
        "支持 <strong>三种计算范式</strong>：并行表示（训练）、递归表示（\\<span class=\"kb-math kb-math-inline\">\\mathcal{O}(1)\\</span> 推理）、块递归表示（线性复杂度长序列建模）",
        "推理时每 token 仅需 \\<span class=\"kb-math kb-math-inline\">\\mathcal{O}(1)\\</span> 计算与常数量内存，无需维护 KV cache，解码吞吐量提升约 14 倍",
        "采用 <strong>因果衰减矩阵 D</strong>（causal decay matrix）在 attention 内部隐式编码位置信息，无需显式位置编码",
        "块递归训练将长序列分块，块内并行的同时跨块逐块递归传递状态流，实现线性复杂度",
        "架构上采用多层 Retention Block + FFN（SwiGLU 激活），整体设计接近 Transformer 但彻底移除 self-attention",
        "语言建模实验显示 RetNet 在相同设置下<strong>性能不输 Transformer</strong>，且推理效率显著更优"
      ],
      "detail": "<h5>示意图</h5>\n<p><img alt=\"RetNet 核心架构\" src=\"https://github.com/microsoft/unilm/raw/master/retnet/assets/retnet_arch.png\" />\n<em>图：RetNet 整体架构。左为 retention block 内部结构（Multi-Scale Retention + FFN），右为三种计算范式的关系：并行、递归与块递归。</em></p>\n<h5>核心公式：Retention 机制</h5>\n<p>Retention 的数学核心是从因果 attention 中显式注入相对位置衰减因子，推导出统一形式。给定输入 \\<span class=\"kb-math kb-math-inline\">\\mathbf{X} \\in \\mathbb{R}^{\\|x\\| \\times d}\\</span>，将其投影为 \\<span class=\"kb-math kb-math-inline\">\\mathbf{Q}, \\mathbf{K}, \\mathbf{V}\\</span>：</p>\n<div class=\"kb-math kb-math-display\">\\text{Retention}(\\mathbf{X}) = (\\mathbf{Q}\\mathbf{K}^\\top \\odot \\mathbf{D})\\mathbf{V}</div>\n<p>其中 \\<span class=\"kb-math kb-math-inline\">\\mathbf{D}_{nm} = \\gamma^{n-m}\\</span> 当 \\<span class=\"kb-math kb-math-inline\">n \\geq m\\</span>，否则为 0（因果衰减矩阵），\\<span class=\"kb-math kb-math-inline\">\\gamma \\in (0, 1)\\</span> 为衰减因子（如 0.96875）。</p>\n<h5>三种计算范式</h5>\n<p><strong>① 并行表示 (Parallel)——训练用</strong>\n展开上述矩阵乘法，直接对整序列并行计算，GPU 友好：</p>\n<div class=\"kb-math kb-math-display\">\\text{Retention}(\\mathbf{X})_n = \\sum_{m=1}^{n} \\gamma^{n-m} (\\mathbf{Q}_n^\\top \\mathbf{K}_m) \\mathbf{V}_m</div>\n<p><strong>② 递归表示 (Recurrent)——推理用</strong>\n将上述求和重写为状态空间更新形式：</p>\n<div class=\"kb-math kb-math-display\">\\begin{aligned}\n\\mathbf{S}_n &amp;= \\gamma \\mathbf{S}_{n-1} + \\mathbf{K}_n \\mathbf{V}_n^\\top \\\\\\\\\n\\text{Retention}(\\mathbf{X})_n &amp;= \\mathbf{Q}_n \\mathbf{S}_n\n\\end{aligned}</div>\n<p>其中 \\<span class=\"kb-math kb-math-inline\">\\mathbf{S}_n \\in \\mathbb{R}^{d \\times d}\\</span> 为 \\<span class=\"kb-math kb-math-inline\">d\\</span> 维状态矩阵。推理时每步仅需 \\<span class=\"kb-math kb-math-inline\">\\mathcal{O}(d^2)\\</span> 计算和常量内存——与序列长度无关，即 \\<span class=\"kb-math kb-math-inline\">\\mathcal{O}(1)\\</span> 推理。</p>\n<p><strong>③ 块递归表示 (Chunkwise Recurrent)——长序列训练</strong>\n将序列切分为长度为 \\<span class=\"kb-math kb-math-inline\">B\\</span> 的块，块内并行计算，块间逐块传递状态：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{S}_{[i]} = \\gamma^B \\mathbf{S}_{[i-1]} + \\sum_{m=1}^{B} \\gamma^{B-m} \\mathbf{K}_{[i],m} \\mathbf{V}_{[i],m}^\\top</div>\n<p>块内 attention 同时融合上块的状态，实现线性复杂度 \\<span class=\"kb-math kb-math-inline\">\\mathcal{O}(N \\cdot d^2)\\</span>。</p>\n<h5>伪代码</h5>\n<pre><code class=\"language-python\">def retention_parallel(Q, K, V, gamma):\n    &quot;&quot;&quot;并行计算 (训练用)&quot;&quot;&quot;\n    L = Q.shape[0]\n    D = gamma ** (np.arange(L)[:, None] - np.arange(L)[None, :])  # [L, L]\n    D = np.tril(D)  # 下三角因果掩码\n    attn = (Q @ K.T) * D              # (QK^T) ⊙ D\n    return attn @ V\n\ndef retention_recurrent(Q, K, V, gamma, state):\n    &quot;&quot;&quot;递归计算 (推理用), state shape: [d, d]&quot;&quot;&quot;\n    state = gamma * state + np.outer(K, V)\n    output = Q @ state                # Q: [d], state: [d, d] -&gt; [d]\n    return output, state\n</code></pre>\n<h5>Multi-Scale Retention (MSR)</h5>\n<p>类比 Multi-Head Attention，RetNet 将 head 分为多组，每组使用不同衰减因子 \\<span class=\"kb-math kb-math-inline\">\\gamma_h\\</span>（指数级递增，覆盖短程到长程依赖）：</p>\n<div class=\"kb-math kb-math-display\">\\gamma_h = 1 - 2^{-5 - h}, \\quad h = 1, \\dots, H</div>\n<p>实际实验中 \\<span class=\"kb-math kb-math-inline\">H=8\\</span>，\\<span class=\"kb-math kb-math-inline\">\\gamma\\</span> 从 0.96875 到约 0.9995，形成<strong>多尺度衰减谱</strong>，短程头捕获局部语法，长程头建模全局语义。</p>\n<h5>Retention Block 结构</h5>\n<p>每个 block 由 MSR + FFN 组成，采用 Pre-LayerNorm：</p>\n<div class=\"kb-math kb-math-display\">\\begin{aligned}\n\\mathbf{Y} &amp;= \\text{MSR}(\\text{LN}(\\mathbf{X})) + \\mathbf{X} \\\\\\\\\n\\mathbf{Z} &amp;= \\text{FFN}(\\text{LN}(\\mathbf{Y})) + \\mathbf{Y}\n\\end{aligned}</div>\n<p>FFN 使用 <strong>SwiGLU</strong> 激活（同 LLaMA 等），维度：\\<span class=\"kb-math kb-math-inline\">d_{model}=d, d_{ffn}=2d\\</span>。</p>\n<h5>动机与背景</h5>\n<div class=\"warn-box\">⚠️ <strong>痛点</strong>：Transformer 推理时需要维护整个历史的 KV cache，内存随序列长度线性增长（\\<span class=\"kb-math kb-math-inline\">\\mathcal{O}(n)\\</span>），推理延迟高、吞吐低。线性注意力、Mamba 等方案虽提升推理效率，但训练时无法并行或性能下降。</p>\n<p>💡 <strong>关键洞察</strong>：RetNet 发现，若将因果 attention 中的 softmax 替换为固定的<strong>指数衰减加权</strong>，则 attention 形式在数学上可等价位为 RNN 形式的状态空间更新——<strong>同一组参数、同一组权重的模型，训练时并行、推理时递归</strong>，无需任何近似。</div>\n<h5>推理效率对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>指标</th>\n<th>Transformer</th>\n<th>RetNet</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>每个 token 推理复杂度</td>\n<td>\\<span class=\"kb-math kb-math-inline\">\\mathcal{O}(n)\\</span></td>\n<td>\\<span class=\"kb-math kb-math-inline\">\\mathcal{O}(1)\\</span></td>\n</tr>\n<tr>\n<td>KV Cache 内存</td>\n<td>\\<span class=\"kb-math kb-math-inline\">\\mathcal{O}(n)\\</span></td>\n<td>\\<span class=\"kb-math kb-math-inline\">\\mathcal{O}(1)\\</span>（矩阵状态）</td>\n</tr>\n<tr>\n<td>13B 模型解码吞吐</td>\n<td>1x</td>\n<td>~14x</td>\n</tr>\n<tr>\n<td>训练复杂度（并行）</td>\n<td>\\<span class=\"kb-math kb-math-inline\">\\mathcal{O}(n^2)\\</span></td>\n<td>\\<span class=\"kb-math kb-math-inline\">\\mathcal{O}(n^2)\\</span></td>\n</tr>\n</tbody>\n</table></div>\n<blockquote>\n<p>训练时 RetNet 也可用块递归将复杂度降至 \\<span class=\"kb-math kb-math-inline\">\\mathcal{O}(n \\cdot d^2)\\</span>，但并行形式在小/中规模上与 Transformer 训练效率持平，因为 (QK^T ⊙ D) 本身可高度并行化，且 D 可预计算缓存。</p>\n</blockquote>\n<h5>与传统方法的区别</h5>\n<ol>\n<li><strong>vs Transformer</strong>：用指数衰减替代 softmax 归一化，因果掩码变成严格数学约束的自然产物；推理无需 KV cache，用固定大小的状态矩阵 S 替代。</li>\n<li><strong>vs Linear Attention</strong>：Linear Attention 用核函数近似 \\<span class=\"kb-math kb-math-inline\">\\phi(Q)\\phi(K)^\\top\\</span>，RetNet 不做近似——衰减形式是严格的因果推导结果。</li>\n<li><strong>vs RWKV / Mamba</strong>：RetNet 同样属于\"可并行训练的 RNN\"类别，但其训练使用完整矩阵乘法（非扫描），只需额外计算衰减矩阵 D 的逐元素乘，GPU 利用率更高。</li>\n</ol>",
      "quiz": {
        "q": "RetNet 的 Retention 机制如何实现 O(1) 推理复杂度？",
        "options": [
          "训练时只保留最近 K 个 token 的 KV cache",
          "引入量化技术压缩注意力矩阵",
          "将因果注意力等价转化为固定大小的矩阵状态递推，每步仅更新状态矩阵而不扩展序列维度",
          "用核方法近似注意力计算以减少计算量"
        ],
        "answer": 2,
        "explain": "RetNet 通过因果衰减矩阵 D 将 attention 转化为 S_n = γS_{n-1} + K_n V_n^⊤ 的递推形式，推理时仅需存储和更新固定大小的 d×d 状态矩阵（与序列长度无关），因此达到 O(1) 计算和内存。"
      }
    },
    {
      "id": "llama2",
      "num": 16,
      "name": "Llama 2",
      "fullName": "开放基础与对话模型 (Llama 2)",
      "year": "2023.07",
      "org": "Meta AI",
      "parent": "llama",
      "paperUrl": "https://arxiv.org/abs/2307.09288",
      "projectUrl": "",
      "category": "open_foundation",
      "motivation": "开放预训练与安全对话谱系",
      "summary": "Llama 2 在 LLaMA 基础上扩展到 2T 公开 token、4K 上下文和更安全的开放发布，并通过 SFT、奖励建模、拒绝采样、PPO 与 Ghost Attention 构建了面向对话的 Llama 2-Chat。",
      "keyPoints": [
        "发布 Llama 2 base 与 Llama 2-Chat，公开 7B、13B、70B 规模；34B 在论文中报告但因红队不足未发布。",
        "预训练数据为新的公开在线数据混合，不包含 Meta 产品或服务数据；训练 2T token，比 LLaMA 增加约 40%。",
        "上下文长度从 2K 扩展到 4K，34B/70B 使用 Grouped-Query Attention (GQA) 提升推理可扩展性。",
        "基础架构延续 LLaMA：pre-normalization RMSNorm、SwiGLU、RoPE、SentencePiece BPE、AdamW 和 cosine schedule。",
        "SFT 阶段强调高质量少量数据：最终收集 27,540 条人工 SFT annotations，并只在 answer tokens 上反传 loss。",
        "RLHF 使用人类二选一偏好数据，训练 Helpfulness RM 与 Safety RM 两个奖励模型；总偏好比较约 2.9M，其中 Meta 安全与有用性数据约 1.4M。",
        "奖励模型采用 pairwise ranking loss，并加入按偏好强度变化的 margin，让“明显更好”的样本对拉开更大分数差。",
        "迭代 RLHF 从 V1 到 V5，先使用 Rejection Sampling fine-tuning，后续把 PPO 接在拒绝采样 checkpoint 之后。",
        "PPO 奖励包含 safety/helpfulness 分段奖励与 KL penalty，防止策略过度偏离原始模型并缓解 reward hacking。",
        "提出 Ghost Attention (GAtt)，通过合成多轮系统指令数据和 loss masking 改善多轮对话中系统消息遗忘问题。"
      ],
      "detail": "<p><img alt=\"Llama 2-Chat 训练流程\" src=\"https://ar5iv.labs.arxiv.org/html/2307.09288/assets/x3.jpg\" />\n<em>图：Llama 2-Chat 从公开数据预训练开始，经 SFT 得到初始 chat 模型，再通过人类偏好数据、奖励模型、拒绝采样和 PPO 迭代改进。</em></p>\n<pre><code class=\"language-python\"># Llama 2 / Llama 2-Chat 训练流程（按论文方法整理）\nbase = pretrain_llama2(tokens=&quot;2T public online data&quot;, context=4096, gqa_for=[&quot;34B&quot;, &quot;70B&quot;])\nchat = supervised_finetune(base, annotations=27_540, loss_on=&quot;assistant_answer_tokens_only&quot;)\n\nfor version in [&quot;RLHF-V1&quot;, &quot;RLHF-V2&quot;, &quot;RLHF-V3&quot;, &quot;RLHF-V4&quot;, &quot;RLHF-V5&quot;]:\n    comparisons = collect_pairwise_preferences(chat, dimensions=[&quot;helpfulness&quot;, &quot;safety&quot;])\n    helpful_rm = train_reward_model(comparisons, target=&quot;helpfulness&quot;)\n    safety_rm = train_reward_model(comparisons, target=&quot;safety&quot;)\n\n    candidates = sample_k_answers(chat, prompts=comparisons.prompts, temperature=&quot;retuned per version&quot;)\n    best_answers = select_by_reward(candidates, helpful_rm, safety_rm)\n    chat = finetune_on_rejection_samples(chat, best_answers)\n\n    if version in [&quot;RLHF-V4&quot;, &quot;RLHF-V5&quot;]:\n        chat = ppo_update(chat, reward=piecewise_helpful_safety_reward, kl_to_initial_policy=True)\n\nchat = ghost_attention_finetune(chat, synthetic_multiturn_system_messages=True)\n</code></pre>\n<p>Llama 2 的第一层贡献是把 LLaMA 的开放基础模型路线工程化升级。基础模型仍是自回归 Transformer，但训练语料扩大到 2T token，上下文长度翻倍到 4096，且大模型引入 GQA。GQA 的直觉是让多个 query heads 共享较少的 key/value heads，从而降低 KV cache 体积和解码带宽压力；这对 34B/70B 这类服务成本高的模型尤其重要。预训练 loss 仍是标准 next-token objective：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{pretrain}}(\\theta)=-\\sum_{t}\\log p_\\theta(x_t\\mid x_{&lt;t})</div>\n<p>SFT 阶段的重点不是堆海量指令数据，而是高质量人工样本。论文先用公开 instruction tuning 数据启动，但发现许多第三方 SFT 数据多样性和质量不足，于是转向数万条 vendor-based 高质量标注。对每个 prompt-answer 样本，训练时会把 prompt 和 answer 拼接为同一序列，但 prompt token 的 loss 被置零，只在 assistant answer tokens 上反传：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{SFT}}(\\theta)=-\\sum_{t\\in\\text{answer}}\\log p_\\theta(y_t\\mid x,y_{&lt;t})</div>\n<p>这样做避免模型学习“复述用户输入”，把梯度集中到期望回答风格和内容上。论文报告 SFT 使用初始学习率 <span class=\"kb-math kb-math-inline\">2\\times10^{-5}</span>、batch size 64、sequence length 4096、训练 2 epochs。</p>\n<p>RLHF 数据采集使用二选一偏好比较：标注者写 prompt，然后在两个模型回答中选择更好的一个，并标注偏好强度，包括 significantly better、better、slightly better、negligibly better/unsure。Llama 2 把 helpfulness 和 safety 分开建模，因为“尽可能有帮助”和“必要时拒绝不安全请求”天然存在张力。奖励模型从 chat checkpoint 初始化，把 LM head 换成 scalar regression head，因此 reward model 继承了基础模型知识，减少奖励模型偏好幻觉答案的风险。</p>\n<p>基础 pairwise ranking loss 为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{ranking}}=-\\log\\sigma(r_\\theta(x,y_c)-r_\\theta(x,y_r))</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">y_c</span> 是被人类选择的回答，<span class=\"kb-math kb-math-inline\">y_r</span> 是被拒绝的回答。Llama 2 进一步加入 margin，让偏好越强的样本对分数间隔越大：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{ranking}}=-\\log\\sigma(r_\\theta(x,y_c)-r_\\theta(x,y_r)-m(r))</div>\n<p>这个设计的直觉是：如果两个回答只是“略好”，奖励模型不应强行拉开过大差距；如果一个回答显著更好，就应该给模型更明确的排序信号。论文还分别训练 Helpfulness RM 和 Safety RM，并按数据配方混合 Meta 自采数据、Anthropic Helpful/Harmless、OpenAI Summarize/WebGPT、StackExchange、SHP 等偏好数据。</p>\n<p>RLHF 优化分为 Rejection Sampling 和 PPO。拒绝采样在每个 prompt 上采样 <span class=\"kb-math kb-math-inline\">K</span> 个回答，用当前最好的 reward model 选出最高分回答，再把它作为新的“gold”样本进行类似 SFT 的微调。它的优势是 breadth：同一 prompt 能探索多个候选。PPO 的优势是 depth：每一步采样都来自刚更新过的策略。论文早期到 RLHF V4 主要用拒绝采样，之后把 PPO 接在拒绝采样 checkpoint 后继续优化。</p>\n<p>PPO 阶段的优化目标是最大化奖励模型估计的人类偏好：</p>\n<div class=\"kb-math kb-math-display\">\\arg\\max_{\\pi}\\mathbb{E}_{p\\sim\\mathcal{D},g\\sim\\pi}[R(g\\mid p)]</div>\n<p>最终奖励包含白化后的 safety/helpfulness 分段奖励和到原始策略 <span class=\"kb-math kb-math-inline\">\\pi_0</span> 的 KL 惩罚：</p>\n<div class=\"kb-math kb-math-display\">R(g\\mid p)=\\tilde{R}_c(g\\mid p)-\\beta D_{KL}(\\pi_\\theta(g\\mid p)\\parallel\\pi_0(g\\mid p))</div>\n<p>其中：</p>\n<div class=\"kb-math kb-math-display\">R_c(g\\mid p)=\n\\begin{cases}\nR_s(g\\mid p) &amp; \\text{if }\\textsc{is\\_safety}(p)\\text{ or }R_s(g\\mid p)&lt;0.15\\\\\nR_h(g\\mid p) &amp; \\text{otherwise}\n\\end{cases}</div>\n<div class=\"kb-math kb-math-display\">\\tilde{R}_c(g\\mid p)=\\textsc{whiten}(\\textsc{logit}(R_c(g\\mid p)))</div>\n<p>KL penalty 的作用是防止 reward hacking：策略如果只追求 reward model 分数，可能学会奖励模型漏洞，导致人工评价下降。论文中 7B/13B 设 <span class=\"kb-math kb-math-inline\">\\beta=0.01</span>，34B/70B 设 <span class=\"kb-math kb-math-inline\">\\beta=0.005</span>，PPO clip threshold 为 0.2，每轮 batch size 为 512。</p>\n<p>Ghost Attention 解决的是另一个对话模型常见问题：多轮对话中系统消息或初始约束会逐渐被遗忘。GAtt 构造合成训练数据，把同一个系统指令拼接到多轮用户消息上，再用最新 RLHF 模型采样回答；训练时只保留第一轮系统消息形式，同时把之前轮次 token 的 loss 置零。这样模型在训练中学到“初始指令应持续影响后续多轮回答”，但不会因为中间轮次文本分布不匹配而被错误梯度污染。论文报告 GAtt 在 20+ turns 范围内能改善一致性，直到达到最大上下文长度。</p>\n<p>与 LLaMA 相比，Llama 2 不只是“更多 token 的 base model”，而是把开放基础模型、对话对齐、安全奖励和迭代发布策略整合成一条谱系。它的关键意义在于：公开模型不再只发布预训练权重，也公开了接近 ChatGPT 风格对话模型所需的 SFT/RLHF 工程细节，包括奖励模型数据、拒绝采样、PPO、KL 约束、安全/有用性拆分和多轮系统消息控制。</p>",
      "quiz": {
        "q": "Llama 2-Chat 中同时训练 Helpfulness RM 和 Safety RM 的主要原因是什么？",
        "options": [
          "两个奖励模型可以减少预训练 token 数量",
          "helpfulness 与 safety 存在目标张力，分开建模能更清晰地优化不同偏好",
          "Safety RM 只用于压缩模型参数",
          "Helpfulness RM 用于替代 tokenizer"
        ],
        "answer": 1,
        "explain": "论文指出有用性和安全性可能冲突，单一奖励模型难以同时处理；分开训练再在 RLHF 奖励中按场景组合更稳定。"
      }
    },
    {
      "id": "mistral7b",
      "num": 17,
      "name": "Mistral 7B",
      "fullName": "高效 7B 基础模型 (Mistral 7B)",
      "year": "2023.10",
      "org": "Mistral AI",
      "parent": "llama",
      "paperUrl": "https://arxiv.org/abs/2310.06825",
      "projectUrl": "",
      "category": "open_foundation",
      "motivation": "GQA与滑窗提升小模型效率",
      "summary": "Mistral 7B 提出了以 Grouped-Query Attention 和 Sliding Window Attention 为核心的高效 7.3B 解码器模型，在显著降低推理 KV 缓存和长序列注意力成本的同时，整体 benchmark 表现超过 Llama 2 13B。",
      "keyPoints": [
        "7.3B decoder-only 基础模型，目标是在小参数量下提高训练与推理性价比",
        "Grouped-Query Attention (GQA)：多组 query heads 共享较少 key/value heads，减少 KV cache 与解码带宽",
        "Sliding Window Attention (SWA)：每个 token 只关注上一层最近 <span class=\"kb-math kb-math-inline\">W</span> 个 token，将注意力复杂度从 <span class=\"kb-math kb-math-inline\">O(n^2)</span> 降为 <span class=\"kb-math kb-math-inline\">O(nW)</span>",
        "跨层信息传递：虽然单层窗口有限，堆叠 <span class=\"kb-math kb-math-inline\">k</span> 层后信息可传播约 <span class=\"kb-math kb-math-inline\">k\\times W</span> 个 token",
        "窗口大小 <span class=\"kb-math kb-math-inline\">W=4096</span>：论文给出约 131K tokens 的理论注意力跨度，并在 16K 序列上报告约 2x 注意力实现加速",
        "Rolling Buffer Cache：KV 缓存固定为窗口大小，位置 <span class=\"kb-math kb-math-inline\">i</span> 写入 <span class=\"kb-math kb-math-inline\">i\\bmod W</span>，32K 序列上缓存内存减少 8x",
        "Pre-fill and Chunking：长 prompt 预填充时按窗口大小分块，当前块只看缓存窗口和块内因果位置",
        "性能结果：在论文评估中超过 Llama 2 13B，并在代码、数学、推理任务上显示出特别强的效率优势",
        "指令版本：Mistral 7B-Instruct 使用公开指令数据微调，在 MT-Bench 上达到同规模开源 chat 模型前列"
      ],
      "detail": "<p><img alt=\"Mistral 7B 滑动窗口注意力\" src=\"https://arxiv.org/html/2310.06825v1/x1.png\" />\n<em>图：Mistral 7B 论文 Figure 1。每层只允许 token 关注前一层最多 <span class=\"kb-math kb-math-inline\">W</span> 个 token，但跨层堆叠后远处信息仍可逐层传递。</em></p>\n<pre><code class=\"language-python\"># Mistral 7B Sliding Window Attention + Rolling Buffer Cache 伪代码\nW = 4096\nkv_cache = RollingBuffer(size=W)\n\nfor i, token in enumerate(sequence):\n    q_i, k_i, v_i = project_with_grouped_query_attention(token)\n\n    # 缓存位置固定，超过窗口后覆盖最旧 KV\n    kv_cache[i % W] = (k_i, v_i)\n\n    # 当前 token 只关注最近 W 个历史位置和自身\n    start = max(0, i - W + 1)\n    visible_positions = range(start, i + 1)\n    keys, values = kv_cache.read_positions(visible_positions)\n\n    scores = (q_i @ keys.T) / sqrt(head_dim)\n    scores = apply_causal_mask(scores, visible_positions, current_position=i)\n    weights = softmax(scores)\n    h_i = weights @ values\n\n    output_i = feed_forward(h_i)\n</code></pre>\n<p>Mistral 7B 的核心问题意识是：7B 级模型不能只靠“缩小版大模型配方”竞争，而要在推理成本、上下文处理和能力密度上重新设计。论文把注意力成本作为主要切入点，因为自回归生成时每步都要读取历史 KV cache；序列越长，标准全注意力不仅计算更贵，缓存也会持续增长，吞吐和延迟都会恶化。</p>\n<p>GQA 先处理 KV cache 的宽度问题。标准 MHA 中 query、key、value head 数通常一致，每个 query head 都配一套 KV，解码时需要保存并读取大量 key/value。MQA 把所有 query heads 共享同一套 KV，速度快但表达能力可能下降。GQA 则把 query heads 分组，每组共享一套 KV，是 MHA 与 MQA 的中间点。对 Mistral 7B 来说，这让模型在保持质量的同时减少推理时的 KV 带宽和内存占用。</p>\n<p>SWA 处理的是 KV cache 的长度问题。标准因果注意力在位置 <span class=\"kb-math kb-math-inline\">i</span> 可以看所有 <span class=\"kb-math kb-math-inline\">0\\ldots i</span> 的 token，复杂度随序列长度平方增长；SWA 将可见范围限制为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{A}(i)=\\{j\\mid \\max(0,i-W+1)\\le j\\le i\\}</div>\n<p>因此单层注意力成本从 <span class=\"kb-math kb-math-inline\">O(n^2)</span> 变为 <span class=\"kb-math kb-math-inline\">O(nW)</span>。Mistral 7B 使用 <span class=\"kb-math kb-math-inline\">W=4096</span>，这意味着每层只直接看局部上下文，但不会完全失去长程信息。</p>\n<p>长程信息通过层间递归传播。第 <span class=\"kb-math kb-math-inline\">k</span> 层位置 <span class=\"kb-math kb-math-inline\">i</span> 的 hidden state 可以从上一层读取 <span class=\"kb-math kb-math-inline\">W</span> 个位置，而上一层的那些 hidden states 又已经聚合了更早的信息，所以理论可达距离约为 <span class=\"kb-math kb-math-inline\">k\\times W</span>。论文指出，在最后一层使用 <span class=\"kb-math kb-math-inline\">W=4096</span> 时理论注意力跨度约为 131K tokens。这个机制的直觉类似“逐层接力”：单层只做局部通信，但深层网络把局部消息逐步传远。</p>\n<p>Rolling Buffer Cache 是 SWA 在推理端真正省内存的关键。因为模型永远不会读取窗口外 KV，所以缓存无需随生成长度增长，只需要大小为 <span class=\"kb-math kb-math-inline\">W</span> 的环形缓冲区：</p>\n<div class=\"kb-math kb-math-display\">\\text{cache\\_slot}(i)=i\\bmod W</div>\n<p>当 <span class=\"kb-math kb-math-inline\">i&gt;W</span> 时，新 token 覆盖最旧 token 的 KV。论文报告在 32K token 序列上，这种缓存把内存用量降低 8x，并且不影响模型质量。这个结论直接来自注意力掩码的结构：被覆盖的信息本来就不会被下一步直接访问。</p>\n<p>Pre-fill and Chunking 解决长 prompt 的批量预处理。生成时，prompt 已知，可以一次性填充 KV cache；但如果 prompt 很长，一次全量注意力仍会占用大量内存。Mistral 7B 将长 prompt 按窗口大小切块，每个 chunk 对自身使用因果掩码，对缓存中的最近窗口使用滑动窗口掩码，对窗口外旧 token 完全不可见。配合 FlashAttention 和 xFormers 修改，论文在 16K 序列、<span class=\"kb-math kb-math-inline\">W=4096</span> 下报告约 2x 加速。</p>\n<p>性能上，Mistral 7B 的意义在于把“模型能力、训练成本、推理成本”同时纳入比较，而不是只看参数量。论文重新评估 Mistral 7B、Llama 2 7B/13B、Llama 1 34B 等模型，显示 Mistral 7B 在所有列出的指标上超过 Llama 2 13B，并在数学、代码、推理上尤其强；作者还用 equivalent model size 说明，在推理、理解和 STEM 类任务中，它接近大于自身 3 倍规模的 Llama 2 表现，而知识类任务的压缩比约 1.9x，受限于参数量存储知识的能力。</p>\n<div class=\"key-point\">💡 关键：Mistral 7B 的创新不是把上下文窗口简单拉长，而是让“每层局部、跨层传递、缓存滚动”成为一套一致的推理设计。GQA 减少 KV 的宽度，SWA 限制 KV 的长度，Rolling Buffer 则把这种限制转化为实际内存收益。</div>",
      "quiz": {
        "q": "Mistral 7B 的 Rolling Buffer Cache 为什么能把长序列 KV 缓存限制在固定大小？",
        "options": [
          "因为模型不再使用自回归生成",
          "因为 Sliding Window Attention 永远不会直接读取窗口外 token 的 KV",
          "因为 GQA 会删除所有 value heads",
          "因为 RoPE 会把全部历史 token 压缩成一个向量"
        ],
        "answer": 1,
        "explain": "SWA 将每个 token 的直接注意力限制在最近 W 个位置，因此窗口外 KV 可以被覆盖；缓存槽可写为 i mod W。"
      }
    },
    {
      "id": "mamba",
      "num": 18,
      "name": "Mamba",
      "fullName": "选择性状态空间模型 (Selective State Space Model)",
      "year": "2023.12",
      "org": "CMU / Princeton",
      "parent": "transformer",
      "paperUrl": "https://arxiv.org/abs/2312.00752",
      "projectUrl": "",
      "category": "long_context",
      "motivation": "线性序列建模挑战注意力",
      "summary": "Mamba 提出了输入依赖的选择性状态空间模型 S6，并用硬件感知的 selective scan 解决传统 SSM 无法内容选择、而 Transformer 长序列代价二次增长的问题。它把 SSM、门控和局部卷积整合成无注意力、无 MLP 的统一块，在语言、音频和基因组等序列任务上实现线性复杂度建模。",
      "keyPoints": [
        "选择性 SSM：让 <span class=\"kb-math kb-math-inline\">\\Delta</span>、<span class=\"kb-math kb-math-inline\">B</span>、<span class=\"kb-math kb-math-inline\">C</span> 随当前 token 输入变化，使模型能选择性记忆、遗忘或重置状态。",
        "硬件感知 selective scan：放弃传统 LTI SSM 的卷积路径，改用并行 scan，并避免在 HBM 中物化完整 <span class=\"kb-math kb-math-inline\">B \\times L \\times D \\times N</span> 状态。",
        "简化 Mamba block：用输入投影、深度可分离卷积、Selective SSM、SiLU 门控和输出投影组成一个统一层，替代注意力层和独立 MLP 层。",
        "线性长上下文：训练与序列长度近似线性扩展，自回归推理每步只更新常数大小状态，不需要 Transformer 的 KV cache。",
        "方法验证重点：选择性复制、induction heads、语言建模、DNA、音频和速度/显存实验共同说明选择机制对离散高密度序列有效。"
      ],
      "detail": "<p><img alt=\"Mamba 选择性 SSM 总览\" src=\"https://arxiv.org/html/2312.00752v2/x1.png\" />\n<em>图：论文 Figure 1。传统结构化 SSM 依赖时间不变参数以避免物化大状态，Mamba 重新引入输入依赖动态，并通过硬件感知 scan 控制显存访问。</em></p>\n<p><img alt=\"Mamba block 结构\" src=\"https://arxiv.org/html/2312.00752v2/x3.png\" />\n<em>图：论文 Figure 3。Mamba block 将局部卷积、选择性 SSM 与门控融合成一个无注意力的序列建模块。</em></p>\n<p>传统结构化 SSM 从连续系统出发，用隐状态 <span class=\"kb-math kb-math-inline\">h(t)</span> 将输入序列映射到输出：</p>\n<div class=\"kb-math kb-math-display\">h&#x27;(t)=Ah(t)+Bx(t), \\qquad y(t)=Ch(t)</div>\n<p>离散化后变成递推式：</p>\n<div class=\"kb-math kb-math-display\">h_t=\\bar A h_{t-1}+\\bar B x_t, \\qquad y_t=C h_t</div>\n<p>此前 S4/H3/Hyena 等模型为了高效训练，通常要求 <span class=\"kb-math kb-math-inline\">\\Delta,A,B,C</span> 沿时间不变，因此可把递推等价成卷积：<span class=\"kb-math kb-math-inline\">y=x * \\bar K</span>。这个设计的瓶颈是内容无关：卷积核只知道相对位置，不知道当前位置 token 是否重要，所以在 selective copying、induction heads 这类需要“看到内容再决定记什么”的任务上会失败。</p>\n<p>Mamba 的核心改变是把若干 SSM 参数改成输入函数，而不是全局固定参数：</p>\n<div class=\"kb-math kb-math-display\">B_t=s_B(x_t), \\qquad C_t=s_C(x_t), \\qquad \\Delta_t=\\operatorname{softplus}(\\theta_\\Delta+s_\\Delta(x_t))</div>\n<p>再对每个位置使用离散化参数：</p>\n<div class=\"kb-math kb-math-display\">\\bar A_t=\\exp(\\Delta_t A), \\qquad \\bar B_t=f_B(\\Delta_t,A,B_t)</div>\n<p>于是递推变为时间变化系统：</p>\n<div class=\"kb-math kb-math-display\">h_t=\\bar A_t h_{t-1}+\\bar B_t x_t, \\qquad y_t=C_t h_t + D x_t</div>\n<p>直觉上，<span class=\"kb-math kb-math-inline\">\\Delta_t</span> 控制状态更新的“步长”：大 <span class=\"kb-math kb-math-inline\">\\Delta_t</span> 可以快速刷新或遗忘旧状态，小 <span class=\"kb-math kb-math-inline\">\\Delta_t</span> 可以更保守地保留历史；<span class=\"kb-math kb-math-inline\">B_t</span> 控制当前 token 写入状态的方式；<span class=\"kb-math kb-math-inline\">C_t</span> 控制从状态读出哪些信息。这样，模型可以在遇到关键 token 时写入，在遇到噪声 token 时跳过，并在边界处重置记忆。</p>\n<pre><code class=\"language-python\"># Mamba / S6 selective scan 伪代码\n# x: [batch, length, d_model]\n\ndef selective_ssm(x):\n    A = Parameter(shape=[d_model, state_dim])\n    D = Parameter(shape=[d_model])\n\n    B = s_B(x)                         # [batch, length, state_dim]\n    C = s_C(x)                         # [batch, length, state_dim]\n    delta = softplus(theta_delta + s_delta(x))  # [batch, length, d_model]\n\n    A_bar, B_bar = discretize(delta, A, B)\n\n    h = zeros([batch, d_model, state_dim])\n    ys = []\n    for t in parallel_scan_over_length(x):\n        h = A_bar[:, t] * h + B_bar[:, t] * x[:, t]\n        y_t = dot(C[:, t], h) + D * x[:, t]\n        ys.append(y_t)\n    return stack(ys, dim=&quot;length&quot;)\n\n\ndef mamba_block(u):\n    x, z = linear_in(u).chunk(2)\n    x = silu(depthwise_conv1d(x))\n    x = selective_ssm(x)\n    return linear_out(x * silu(z))\n</code></pre>\n<p>选择性带来的代价是不能再走卷积快速路径，因为参数随位置变化，卷积核不再固定。论文的工程贡献是 selective scan：把递推写成可并行前缀扫描的问题，在 GPU SRAM 等快层级中临时展开状态，避免把巨大中间状态完整写入 HBM，并在反向传播中重算必要状态以换取显存。这个设计把“内容选择”与“线性复杂度”同时保留下来，是 Mamba 能作为长上下文 backbone 的关键。</p>\n<p>与 Transformer 相比，Mamba 不显式存储所有历史 token 的 KV cache，而是把历史压缩进固定维度状态；因此训练成本随长度线性增长，推理每步只需更新状态。与传统 RNN 相比，它又不是简单标量门控，而是在结构化 SSM 中用 <span class=\"kb-math kb-math-inline\">A</span> 提供长程动态、用 <span class=\"kb-math kb-math-inline\">B_t,C_t,\\Delta_t</span> 提供内容相关选择；与传统 LTI SSM 相比，它牺牲卷积等价性，换来能处理离散语言中“某些 token 才值得记”的能力。</p>\n<div class=\"key-point\">💡 关键：Mamba 的创新不是单纯“把注意力换成 RNN”，而是把 SSM 从时间不变系统改成输入选择系统，并用 selective scan 把这个变化做成 GPU 友好的线性时间层。</div>",
      "quiz": {
        "q": "Mamba 中让 B、C、Delta 依赖输入 x 的主要目的是什么？",
        "options": [
          "让模型拥有内容相关的写入、读出和遗忘能力",
          "把所有计算转化为标准卷积以提升并行度",
          "减少词表大小并降低 embedding 参数量",
          "用 KV cache 保存全部历史 token"
        ],
        "answer": 0,
        "explain": "选择性参数使 SSM 从时间不变系统变为时间变化系统，能够根据当前 token 决定保留或过滤信息；这也是 Mamba 区别于传统 SSM 的核心。"
      }
    },
    {
      "id": "mixtral",
      "num": 19,
      "name": "Mixtral",
      "fullName": "开放稀疏专家模型 (Mixtral of Experts)",
      "year": "2024.01",
      "org": "Mistral AI",
      "parent": "mistral7b",
      "paperUrl": "https://arxiv.org/abs/2401.04088",
      "projectUrl": "",
      "category": "sparse_moe",
      "motivation": "Top2专家开放MoE落地",
      "summary": "Mixtral 8x7B 将 Mistral 7B 的前馈子层替换为 Top-2 稀疏 MoE 层，使每个 token 只激活 2 个专家，在接近 13B 活跃参数成本下访问约 47B 总参数。它验证了开放权重 LLM 中稀疏专家架构的实用性，并在数学、代码、多语言和长上下文任务上达到或超过更大密集模型。",
      "keyPoints": [
        "稀疏 MoE 架构：每层包含 8 个 FFN 专家，每个 token 由 router 选择 2 个专家处理。",
        "参数效率：总参数约 47B，每 token 推理只用约 13B 活跃参数，显著低于 Llama 2 70B 的活跃计算量。",
        "Mistral 系列基础：保持 Mistral 7B 的 decoder-only Transformer 设计，但将所有 FFN 子块替换为 MoE 层，并支持 32K dense context。",
        "Top-K gating：router 对 <span class=\"kb-math kb-math-inline\">xW_g</span> 取 Top-2，再 softmax 得到两个专家权重，输出为专家输出的加权和。",
        "指令模型：Mixtral 8x7B Instruct 通过 SFT 后接 DPO 对齐，在 MT-Bench 和 LMSys 人类评测中超过多个同时期闭源/开源聊天模型。"
      ],
      "detail": "<p><img alt=\"Mixtral MoE 层示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2401.04088/assets/images/smoe.png\" />\n<em>图：论文 Figure 1。每个输入向量由 router 分配给 8 个专家中的 2 个，最终输出是这两个专家输出的加权和。</em></p>\n<p>Mixtral 的动机是扩大模型容量而不线性增加每个 token 的计算量。密集 Transformer 中，FFN 子层对所有 token 使用同一组大矩阵；如果直接扩大 FFN，训练和推理成本都会随参数量增长。MoE 的做法是准备多个 FFN 专家，但对每个 token 只激活少数专家，因此总参数量代表“可用知识容量”，活跃参数量才更接近单 token 推理成本。</p>\n<p>对输入 token 表示 <span class=\"kb-math kb-math-inline\">x</span>，MoE 层定义 <span class=\"kb-math kb-math-inline\">n</span> 个专家 <span class=\"kb-math kb-math-inline\">\\{E_0,E_1,\\dots,E_{n-1}\\}</span>。router 先计算专家 logits：</p>\n<div class=\"kb-math kb-math-display\">\\ell=xW_g</div>\n<p>再只保留最大的 <span class=\"kb-math kb-math-inline\">K</span> 个 logits：</p>\n<div class=\"kb-math kb-math-display\">(\\operatorname{TopK}(\\ell))_i=\\begin{cases}\n\\ell_i, &amp; \\ell_i \\text{ 是 Top-K 坐标之一}\\\\\n-\\infty, &amp; \\text{否则}\n\\end{cases}</div>\n<p>门控权重为：</p>\n<div class=\"kb-math kb-math-display\">G(x)=\\operatorname{Softmax}(\\operatorname{TopK}(xW_g))</div>\n<p>Mixtral 固定 <span class=\"kb-math kb-math-inline\">n=8</span>、<span class=\"kb-math kb-math-inline\">K=2</span>，并把每个专家实现为 SwiGLU FFN。因此每个 token 的 MoE 输出是：</p>\n<div class=\"kb-math kb-math-display\">y=\\sum_{i=0}^{n-1}\\operatorname{Softmax}(\\operatorname{Top2}(xW_g))_i\\cdot \\operatorname{SwiGLU}_i(x)</div>\n<pre><code class=\"language-python\"># Mixtral Top-2 MoE 前馈层伪代码\n# x: 一个 token 在某层的 hidden state\n\ndef mixtral_moe_ffn(x):\n    logits = x @ W_g                         # [num_experts=8]\n    expert_ids = topk(logits, k=2)           # 每个 token 只选两个专家\n    masked_logits = fill(-inf, shape=[8])\n    masked_logits[expert_ids] = logits[expert_ids]\n    weights = softmax(masked_logits)\n\n    y = 0\n    for i in expert_ids:\n        y += weights[i] * swiglu_expert[i](x)\n    return y\n\n\ndef transformer_block_with_moe(x):\n    x = x + self_attention(rmsnorm(x))       # Mistral 风格注意力块\n    x = x + mixtral_moe_ffn(rmsnorm(x))      # 替换原 FFN 子层\n    return x\n</code></pre>\n<p>这个公式说明了 Mixtral 的“稀疏性”来自 gating，而不是专家本身变小。所有专家都是标准前馈网络，参数总量随专家数增加；但在实际前向中，只有 Top-2 专家参与矩阵乘法。论文特别区分 sparse parameter count 和 active parameter count：前者决定服务时需要加载的权重规模，后者更接近单 token 的计算成本。Mixtral 的优势在于让 token 接触到 47B 级别的参数容量，但每步只计算约 13B 活跃参数。</p>\n<p>工程上，MoE 的主要风险是路由造成负载不均。论文讨论了 Expert Parallelism：发往同一专家的 token 会被聚合到相应设备上执行，再把结果送回原 token 位置；同时也指出如果某些专家过热，会造成设备负载不均或通信瓶颈。Mixtral 借助高性能 MoE kernel 思路，例如将专家 FFN 操作转化为大稀疏矩阵乘法，来减轻不同专家 token 数不同带来的执行问题。</p>\n<p>与 GShard 类 MoE 相比，Mixtral 的实现更直接：它把 Transformer 中所有 FFN 子块都替换为 MoE，而不是隔层替换；router 使用简单有效的 Top-2 softmax，而不是更复杂的第二专家策略。论文的 routing analysis 还发现专家分配并没有明显按“数学、生物、哲学”等语义领域分工，反而更像和语法/局部模式有关，例如代码缩进、特定词形或连续 token 常被路由到相同专家。这提示 MoE 专家并不一定是人类可解释的领域专家，而是训练动态下形成的稀疏计算子空间。</p>\n<p>训练与对齐流程上，基础 Mixtral 使用多语言数据预训练，支持 32K 上下文，并在 passkey retrieval 中展示长上下文检索能力。Instruct 版本先进行监督微调，再对偏好对进行 DPO，对齐后在 MT-Bench 达到 8.30，并在论文报告的 LMSys 截图中超过 GPT-3.5 Turbo、Claude-2.1、Gemini Pro 与 Llama 2 70B Chat。也就是说，Mixtral 的贡献不只是架构稀疏化，还包括把 MoE 开放权重模型完整落地到可用聊天模型。</p>\n<div class=\"warn-box\">⚠️ 注意：Mixtral 的推理计算少，不代表部署显存也按 13B 计算；服务端仍需容纳或调度约 47B sparse 参数，并处理 MoE 路由通信。</div>",
      "quiz": {
        "q": "Mixtral 中 Top-2 router 的核心作用是什么？",
        "options": [
          "为每个 token 选择两个 FFN 专家并对其输出加权求和",
          "把注意力头减少到两个以降低 KV cache",
          "只在最后一层使用专家以减少训练不稳定",
          "把所有专家平均集成成一个密集 FFN"
        ],
        "answer": 0,
        "explain": "Mixtral 的 MoE 层对 router logits 取 Top-2 后 softmax，仅计算两个被选专家，并用门控权重合成输出。"
      }
    },
    {
      "id": "deepseek_moe",
      "num": 20,
      "name": "DeepSeekMoE",
      "fullName": "细粒度专家分割 MoE (DeepSeekMoE)",
      "year": "2024.01",
      "org": "DeepSeek-AI",
      "parent": "switch_transformer",
      "paperUrl": "https://arxiv.org/abs/2401.06066",
      "projectUrl": "",
      "category": "sparse_moe",
      "motivation": "细粒度专家提升专业化",
      "summary": "DeepSeekMoE 面向 MoE 的“专家专业化不足”问题，提出细粒度专家分割与共享专家隔离：前者把专家拆小并激活更多组合，后者固定共享专家承载通用知识，从而减少路由专家的知识混杂与冗余。论文在 2B、16B 和 145B 规模上验证了该结构相对 GShard 式 MoE 的参数/计算效率优势。",
      "keyPoints": [
        "<strong>问题定位</strong>：传统 Top-<span class=\"kb-math kb-math-inline\">K</span> MoE 容易出现知识混杂和知识冗余，专家无法获得足够非重叠、聚焦的知识",
        "<strong>细粒度专家分割</strong>：把 <span class=\"kb-math kb-math-inline\">N</span> 个标准专家拆为 <span class=\"kb-math kb-math-inline\">mN</span> 个小专家，每个小专家 FFN 中间维度缩小为原来的 <span class=\"kb-math kb-math-inline\">1/m</span>",
        "<strong>激活更多专家组合</strong>：为保持计算量不变，每个 token 从激活 <span class=\"kb-math kb-math-inline\">K</span> 个标准专家改为激活 <span class=\"kb-math kb-math-inline\">mK</span> 个细粒度专家，组合空间大幅增加",
        "<strong>共享专家隔离</strong>：隔离 <span class=\"kb-math kb-math-inline\">K_s</span> 个专家作为共享专家，对所有 token 无条件激活，用于捕获语法、常识等通用知识",
        "<strong>路由专家更专门化</strong>：共享专家吸收公共模式后，剩余 routed experts 更倾向学习差异化知识，缓解多专家重复学习同一通用知识",
        "<strong>两级负载均衡</strong>：Expert-Level Balance Loss 防止路由坍缩，Device-Level Balance Loss 保证跨设备计算更均衡",
        "<strong>规模验证</strong>：DeepSeekMoE 2B 接近同总参数 dense 上界，16B 以约 40% 计算量达到 LLaMA2 7B 相当水平，145B 以约 28.5% 计算量接近 DeepSeek 67B"
      ],
      "detail": "<p><img alt=\"DeepSeekMoE 架构示意\" src=\"https://ar5iv.labs.arxiv.org/html/2401.06066/assets/x1.png\" />\n<em>图：DeepSeekMoE 论文 Figure 1。左为传统 Top-2 MoE，中间为细粒度专家分割，右为加入共享专家隔离后的完整 DeepSeekMoE。</em></p>\n<pre><code class=\"language-python\"># DeepSeekMoE 层伪代码：细粒度专家分割 + 共享专家隔离\ndef deepseek_moe_layer(u_t, shared_experts, routed_experts, router, m, K, K_s):\n    # u_t: 某层 attention 后的单 token hidden state\n    # shared_experts: K_s 个固定激活专家\n    # routed_experts: mN - K_s 个可路由细粒度专家\n\n    shared_out = 0\n    for expert in shared_experts:\n        shared_out += expert(u_t)             # 无条件参与，捕获公共知识\n\n    logits = router(u_t, routed_experts)      # token-to-expert affinity\n    routed_k = m * K - K_s                    # 保持激活计算量近似不变\n    top_logits, top_idx = topk(logits, routed_k)\n    gates = softmax(top_logits)\n\n    routed_out = 0\n    for weight, idx in zip(gates, top_idx):\n        routed_out += weight * routed_experts[idx](u_t)\n\n    return u_t + shared_out + routed_out\n</code></pre>\n<p>DeepSeekMoE 从 MoE 的结构性缺陷入手，而不是只调整路由损失。传统 GShard/Switch 类 MoE 把 Transformer 的 FFN 替换为 <span class=\"kb-math kb-math-inline\">N</span> 个专家，并让每个 token 选择 <span class=\"kb-math kb-math-inline\">K</span> 个专家。若专家数较少，每个专家会被迫吸收很多异质 token 的知识，形成“知识混杂”；同时，不同 token 又共享大量基础语言规律，多个专家会重复学习这些通用知识，形成“知识冗余”。这两者都会降低稀疏参数的有效利用率。</p>\n<p>细粒度专家分割的做法是在总专家参数和激活计算量基本不变的前提下，提高组合灵活性。假设原本有 <span class=\"kb-math kb-math-inline\">N</span> 个标准 FFN 专家、每次激活 <span class=\"kb-math kb-math-inline\">K</span> 个，DeepSeekMoE 将每个专家切成 <span class=\"kb-math kb-math-inline\">m</span> 个小专家，即总数变为 <span class=\"kb-math kb-math-inline\">mN</span>，每个小专家中间维度降为原来的 <span class=\"kb-math kb-math-inline\">1/m</span>，并把激活数提高到 <span class=\"kb-math kb-math-inline\">mK</span>。对应公式为：</p>\n<div class=\"kb-math kb-math-display\">h_t^l=\\sum_{i=1}^{mN} g_{i,t}\\operatorname{FFN}_i(u_t^l)+u_t^l,</div>\n<div class=\"kb-math kb-math-display\">g_{i,t}=\n\\begin{cases}\ns_{i,t}, &amp; s_{i,t}\\in \\operatorname{Topk}(\\{s_{j,t}\\mid 1\\le j\\le mN\\},mK) \\\\\n0, &amp; \\text{otherwise}\n\\end{cases},\n\\quad\ns_{i,t}=\\operatorname{Softmax}_i((u_t^l)^T e_i^l).</div>\n<p>组合数的变化解释了为什么“拆小”有效。传统 <span class=\"kb-math kb-math-inline\">N=16,K=2</span> 只有 <span class=\"kb-math kb-math-inline\">\\binom{16}{2}=120</span> 种激活组合；若 <span class=\"kb-math kb-math-inline\">m=4</span>，则变成从 64 个小专家中选 8 个，组合数达到 <span class=\"kb-math kb-math-inline\">\\binom{64}{8}=4,426,165,368</span>。单个小专家更窄，容易学得更聚焦；多个小专家的组合又能覆盖复杂输入所需的多种知识片段。</p>\n<p>共享专家隔离进一步处理通用知识冗余。DeepSeekMoE 设 <span class=\"kb-math kb-math-inline\">K_s</span> 个 shared experts，它们不参与 TopK 竞争，而是对所有 token 固定激活；为了保持计算量，routed experts 的激活数从 <span class=\"kb-math kb-math-inline\">mK</span> 降为 <span class=\"kb-math kb-math-inline\">mK-K_s</span>。完整层输出为：</p>\n<div class=\"kb-math kb-math-display\">h_t^l=\\sum_{i=1}^{K_s}\\operatorname{FFN}_i(u_t^l)\n+\\sum_{i=K_s+1}^{mN}g_{i,t}\\operatorname{FFN}_i(u_t^l)\n+u_t^l.</div>\n<p>这不是简单增加一个 dense FFN，而是把“所有 token 都需要的公共知识”显式隔离出来。共享专家越稳定地承载语法、常见模式和基础语言能力，路由专家就越少需要重复学习这些模式，从而把容量用于更差异化的知识。论文的表述是从算法角度解释 shared experts，而不是只把它当作工程负载优化。</p>\n<p>负载均衡仍然是 MoE 必须处理的问题。DeepSeekMoE 使用 expert-level balance loss 防止路由器总把 token 分给少数专家：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\mathrm{ExpBal}}=\\alpha_1\\sum_{i=1}^{N&#x27;} f_iP_i,\n\\quad\nf_i=\\frac{N&#x27;}{K&#x27;T}\\sum_{t=1}^{T}\\mathbb{1}(\\text{Token }t\\text{ selects Expert }i),\n\\quad\nP_i=\\frac{1}{T}\\sum_{t=1}^{T}s_{i,t}.</div>\n<p>当专家跨设备部署时，论文还引入 device-level balance loss，把专家按设备聚合后约束设备间负载，而不是强迫每个专家完全均匀。这一点很实用：过强的专家级均衡会损伤专业化，但设备级均衡能直接缓解训练/推理瓶颈。整体上，DeepSeekMoE 的核心思想是“先用结构提升专家可分工性，再用轻量均衡防止训练崩塌”。</p>",
      "quiz": {
        "q": "DeepSeekMoE 中共享专家隔离的主要作用是什么？",
        "options": [
          "让所有专家都参与每个 token 的计算，退化为稠密模型",
          "固定一部分专家捕获通用知识，从而减少路由专家之间的知识冗余",
          "取消 TopK 路由，完全依赖哈希分配 token",
          "只用于把专家平均放到不同 GPU 上，与模型质量无关"
        ],
        "answer": 1,
        "explain": "共享专家对所有 token 无条件激活，承担公共语言模式；这样 routed experts 更容易学习差异化知识，提升专家专业化。"
      }
    },
    {
      "id": "gemini15",
      "num": 21,
      "name": "Gemini 1.5",
      "fullName": "百万上下文 Gemini (Gemini 1.5)",
      "year": "2024.03",
      "org": "Google DeepMind",
      "parent": "palm",
      "paperUrl": "https://arxiv.org/abs/2403.05530",
      "projectUrl": "",
      "category": "long_context",
      "motivation": "百万级上下文近完美召回",
      "summary": "> Gemini 1.5 提出了基于 MoE（Mixture-of-Experts）和稀疏化注意力的大规模多模态长上下文模型，实现了在超过 10M token 上下文中达到 >99% 的 \"Needle-in-a-Haystack\" 检索精度，同步推出 Pro（高性能）和 Flash（轻量高效）两个版本，在长文档 QA、长视频 QA、长音频 ASR 等任务上全面超越 GPT-4 Turbo 和 Claude 3。",
      "keyPoints": [
        "基于 Gemini 1.0 架构演进，引入 <strong>MoE（Mixture-of-Experts）架构</strong>，通过条件化激活部分专家网络参数大幅降低推理计算量",
        "发布两个模型变体：<strong>Gemini 1.5 Pro</strong>（高性能旗舰）和 <strong>Gemini 1.5 Flash</strong>（轻量化高效率），后者在质量损失极小下实现更高推理速度",
        "上下文窗口扩展至 <strong>10M tokens</strong> 以上，支持文本、视频（数小时）、音频的多模态超长上下文，在 10M token 下 next-token prediction 持续提升",
        "在 <strong>Needle-in-a-Haystack</strong> 基准上实现 &gt;99% 的召回率，远超 GPT-4 Turbo（128K）和 Claude 3.0（200K），形成代际跨越",
        "多模态能力扩展：在长文档 QA（如 10M-token 书籍理解）、长视频 QA（数小时视频）、长音频 ASR（数小时语音转写）上达到了 SOTA",
        "展示<strong>稀疏注意力（Sparse Attention）</strong>与前馈（MoE）层联合优化的高效长上下文训练与推理框架",
        "实际应用验证：在 10 个职业类别中帮助专业人士完成任务，实现 <strong>26%~75% 的时间节省</strong>；展示了从 Kalamang 语法书（全球不到 200 人使用）学习翻译英语→Kalamang 的新兴能力"
      ],
      "detail": "<p><img alt=\"Gemini 1.5 MoE 架构示意图\" src=\"https://arxiv.org/html/2403.05530v5/extracted/5595062/figures/architecture.png\" />\n<em>图：Gemini 1.5 基于 MoE 的模型架构总览——输入 token 经过路由器（Router）分配到不同的 Expert 子网络</em></p>\n<h5>1. 动机与背景</h5>\n<p>传统大语言模型在处理长上下文时面临两大瓶颈：（1）Transformer 的自注意力复杂度为 <span class=\"kb-math kb-math-inline\">O(N^2)</span>，超长序列导致计算和内存成本不可接受；（2）大规模稠密模型（Dense Model）在推理时激活全部参数，延迟和功耗随规模线性增长。此前 GPT-4 Turbo 支持 128K、Claude 3.0 支持 200K 上下文，但在极端长上下文（1M+ tokens）下召回率骤降，出现 \"Lost in the Middle\" 现象——模型倾向于遗忘上下文中间部分的信息。</p>\n<p>Gemini 1.5 的核心洞察是：<strong>通过稀疏化 MoE 架构大幅降低单 token 的有效计算量，同时用专用的长上下文训练管线（包括多阶段长度课程学习）将有效上下文窗口扩展至 10M tokens 以上</strong>。</p>\n<h5>2. 核心机制：MoE + 稀疏注意力</h5>\n<p><strong>MoE（Mixture-of-Experts）架构</strong>：</p>\n<p>传统 Transformer 的 FFN（前馈网络）层被替换为多个并行的 Expert 子网络，由一个可训练的 Router 网络为每个 token 选择 top-k 个 Expert：</p>\n<div class=\"kb-math kb-math-display\">y = \\sum_{i=1}^{k} G(x)_i \\cdot E_i(x)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">G(x) = \\text{softmax}(\\text{TopK}(W_{\\text{router}} \\cdot x))</span> 为路由权重，<span class=\"kb-math kb-math-inline\">E_i</span> 为第 <span class=\"kb-math kb-math-inline\">i</span> 个 Expert。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：每个 token 仅激活少量 Expert（如 top-2），使单次推理的计算量仅为同类稠密模型的几分之一，但总参数量可以大幅增加。这种 <strong>条件计算（Conditional Computation）</strong> 理念使得长序列推理的算力需求可控。</div>\n<p><strong>稀疏注意力（Sparse Attention）</strong>：</p>\n<p>为突破 <span class=\"kb-math kb-math-inline\">O(N^2)</span> 的注意力瓶颈，Gemini 1.5 采用了多层分级的稀疏注意力策略：\n- <strong>局部窗口注意力</strong>：每个 token 对邻近窗口内的 token 做全注意力\n- <strong>全局注意力 token</strong>：部分特殊 token（如 summary token）对所有位置做全注意力\n- <strong>层次化分块</strong>：将长序列划分为多个 chunk，先做 chunk 内注意力，再做 chunk 间注意力</p>\n<p>这种设计将注意力复杂度从 <span class=\"kb-math kb-math-inline\">O(N^2)</span> 降至 <span class=\"kb-math kb-math-inline\">O(N \\cdot W)</span>（<span class=\"kb-math kb-math-inline\">W</span> 为窗口大小），使 10M token 的上下文推理成为可能。</p>\n<h5>3. 训练流程</h5>\n<pre><code class=\"language-python\"># Gemini 1.5 长上下文训练伪代码\ndef train_gemini15():\n    # 阶段1: 短上下文预训练 (32k tokens)\n    model = MoETransformer(num_experts=64, top_k=2)\n    model.train(data, seq_len=32768)\n\n    # 阶段2: 渐进式长上下文适配 (Length Curriculum)\n    sequence_lengths = [64k, 128k, 256k, 512k, 1M, 2M, 5M, 10M]\n    for target_len in sequence_lengths:\n        # 混合短序列和长序列数据\n        mixed_data = mix_short_long(data, target_len, ratio=0.3)\n        # 逐步增加全局注意力的间隔\n        model.attention.sparse_config.update(target_len)\n        model.train(mixed_data, seq_len=target_len)\n\n    # 阶段3: 多任务微调 (SFT + RLHF)\n    sft_data = load_multimodal_qa(video_hours=10, audio_hours=20)\n    model.fine_tune(sft_data)\n    model.rlhf(preference_data)\n\n# 关键训练细节\nclass MoETransformer:\n    def forward(self, x):\n        # Sparse Attention with block-local window\n        attn_out = sparse_block_local_attention(x, window_size=4096)\n        # MoE FFN: each token routed to top-2 experts\n        ffn_out = moe_ffn(attn_out, num_experts=64, top_k=2)\n        return ffn_out\n\n    def moe_ffn(self, x, num_experts, top_k):\n        # 路由器为每个 token 选择专家\n        router_logits = self.router(x)  # [batch, seq, num_experts]\n        top_k_weights, top_k_indices = top_k_softmax(router_logits, k=top_k)\n        # 仅计算被选中的 expert 输出\n        output = zeros_like(x)\n        for expert_id in range(num_experts):\n            mask = (top_k_indices == expert_id).any(dim=-1)\n            if mask.any():\n                output[mask] += self.experts[expert_id](x[mask]) * top_k_weights[mask]\n        return output\n</code></pre>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：MoE 训练中需要注意 <strong>Load Balancing</strong>——确保各 Expert 被均匀使用，防止某些 Expert \"退化\"。Gemini 1.5 采用了带辅助损失（auxiliary load balancing loss）的训练策略：<span class=\"kb-math kb-math-inline\">\\mathcal{L}_{\\text{load}} = \\alpha \\cdot \\sum_{i=1}^{E} f_i \\cdot p_i</span>，其中 <span class=\"kb-math kb-math-inline\">f_i</span> 为 expert i 的实际负载比例，<span class=\"kb-math kb-math-inline\">p_i</span> 为路由器分配概率的均值。</div>\n<h5>4. Needle-in-a-Haystack 评测</h5>\n<p>Gemini 1.5 的核心验证实验是在合成数据上的 Needle-in-a-Haystack 测试（俗称\"大海捞针\"）：将一段关键信息（needle）随机插入一段长达 N tokens 的无关文本（haystack）中，测试模型能否准确召回该信息。</p>\n<p>关键发现：\n- Gemini 1.5 Pro 在 <strong>10M tokens 时仍保持 &gt;99% 的召回率</strong>\n- GPT-4 Turbo 在 128K 后召回率明显下降（低于 80%）\n- Claude 3.0 在 200K 后衰减更严重\n- 传统的 Google 模型 PaLM 2 的上下文窗口上限仅为 32K，Gemini 1.5 实现了 <strong>300 倍以上的窗口提升</strong></p>\n<h5>5. 多模态长上下文能力</h5>\n<p>Gemini 1.5 不仅是文本长上下文模型，还在多模态长上下文中展示了令人瞩目的能力：\n- <strong>长视频理解</strong>：输入数小时甚至 10 小时以上的视频，模型可以从任意时间点精准回忆起特定场景、对话或物体。例如在一部 5 小时电影中，模型可在第 2 小时 34 分钟 12 秒的场景中定位到\"主角说了某句台词\"。\n- <strong>长音频 ASR</strong>：对长达数小时的音频进行端到端转录，字错误率（WER）显著优于分段拼接方案。\n- <strong>跨模态检索</strong>：在给定的长视频中，通过文本查询定位到极短的视觉片段（例如\"当某人从桌上拿起红色水杯的那一刻\"）。</p>\n<h5>6. 与前辈工作的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>对比维度</th>\n<th>Gemini 1.5 (2024)</th>\n<th>GPT-4 Turbo (2023)</th>\n<th>Claude 3.0 (2024)</th>\n<th>Gemini 1.0 (2023)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>架构</td>\n<td><strong>Sparse MoE</strong></td>\n<td>Dense（推测）</td>\n<td>Dense（推测）</td>\n<td>Dense</td>\n</tr>\n<tr>\n<td>最大上下文</td>\n<td><strong>10M+ tokens</strong></td>\n<td>128K tokens</td>\n<td>200K tokens</td>\n<td>32K tokens</td>\n</tr>\n<tr>\n<td>长上下文召回率</td>\n<td><strong>&gt;99% @ 10M</strong></td>\n<td>~50% @ 128K</td>\n<td>~40% @ 200K</td>\n<td>N/A</td>\n</tr>\n<tr>\n<td>多模态长上下文</td>\n<td><strong>文本+视频+音频</strong></td>\n<td>文本+图像</td>\n<td>文本+图像</td>\n<td>文本+图像</td>\n</tr>\n<tr>\n<td>推理效率</td>\n<td>条件计算（仅激活部分参数）</td>\n<td>全参数激活</td>\n<td>全参数激活</td>\n<td>全参数激活</td>\n</tr>\n</tbody>\n</table></div>\n<p>Gemini 1.5 相对于 Gemini 1.0 的核心改进在于：将稠密模型升级为 <strong>Sparse MoE 架构</strong>，配合<strong>多阶段长度课程学习（Length Curriculum Learning）</strong>，在保持推理效率的同时将上下文窗口扩展了 300 倍以上。</p>\n<h5>7. 稀疏注意力的直觉解释</h5>\n<p>想象你在读一本 10000 页的书（≈10M tokens）。传统 Transformer 的做法是：每读一个单词，就要回顾前面所有 9999 页的内容——这显然浪费计算。Gemini 1.5 的策略更接近人类的阅读方式：\n1. 你关注当前段落的上下文（<strong>局部窗口注意力</strong>）\n2. 你同时记住了每章的摘要或关键标记（<strong>全局 token</strong>）\n3. 当需要跨章推理时，你翻阅目录或摘要找到相关内容（<strong>层次化分块</strong>）</p>\n<p>这种\"粗读 + 精读 + 索引查找\"的三级策略，使得 10M token 的上下文推理从不可能变为可能，且计算量仅与窗口大小 <span class=\"kb-math kb-math-inline\">W</span> 成线性关系。</p>",
      "quiz": {
        "q": "Gemini 1.5 实现百万级上下文近完美召回的核心架构创新是什么？",
        "options": [
          "使用更深的 Transformer 层数（100+ 层）来增加模型容量",
          "采用 MoE 稀疏架构降低单 token 计算量，配合渐进式长度课程学习、稀疏注意力策略",
          "引入 Retrieval-Augmented Generation (RAG) 将长文档分块索引到外部向量数据库",
          "将上下文压缩为低秩矩阵，通过矩阵分解减少计算复杂度"
        ],
        "answer": 1,
        "explain": "Gemini 1.5 的核心在于 MoE 架构的条件计算 + 稀疏注意力 + 多阶段长度课程学习，而非单纯加深网络、依赖外部检索或矩阵压缩。这些技术组合使模型在原生的 Transformer 框架内将上下文扩展到 10M+ tokens 并实现 >99% 召回率。"
      }
    },
    {
      "id": "deepseek_v2",
      "num": 22,
      "name": "DeepSeek-V2",
      "fullName": "经济高效 MoE 语言模型 (DeepSeek-V2)",
      "year": "2024.05",
      "org": "DeepSeek-AI",
      "parent": "deepseek_moe",
      "paperUrl": "https://arxiv.org/abs/2405.04434",
      "projectUrl": "",
      "category": "sparse_moe",
      "motivation": "MLA压缩KV缓存",
      "summary": "DeepSeek-V2 提出 Multi-head Latent Attention (MLA)，把生成阶段需要缓存的 Key/Value 压缩为低维 latent，并结合 DeepSeekMoE 的细粒度专家和共享专家设计，解决大模型训练成本和长上下文推理显存之间的冲突。",
      "keyPoints": [
        "236B 总参数、21B 每 token 激活参数，预训练语料规模为 8.1T tokens，并通过 YaRN 支持 128K 上下文。",
        "MLA 使用低秩 KV 联合压缩，只缓存 <span class=\"kb-math kb-math-inline\">c_t^{KV}</span> 与解耦 RoPE key，将 KV cache 降低 93.3%。",
        "解耦 RoPE 将位置信息放到额外的 <span class=\"kb-math kb-math-inline\">q_t^R,k_t^R</span> 通道，避免 RoPE 破坏低秩矩阵吸收。",
        "DeepSeekMoE 采用 2 个共享专家、160 个路由专家，每个 token 激活 6 个路由专家，兼顾通用能力和专家专化。",
        "设备受限路由把每个 token 的专家分配限制到最多 3 个设备，降低跨设备 all-to-all 通信。",
        "训练中加入专家级、设备级、通信级三类负载均衡辅助损失，并使用 token-dropping 控制专家容量。",
        "相比 DeepSeek 67B，论文报告训练成本降低 42.5%，实际部署最大生成吞吐提升到 5.76 倍。"
      ],
      "detail": "<p><img alt=\"DeepSeek-V2 架构图\" src=\"https://arxiv.org/html/2405.04434/x3.png\" />\n<em>图：DeepSeek-V2 的基础架构，注意力层采用 MLA，FFN 层采用 DeepSeekMoE。</em></p>\n<pre><code class=\"language-python\"># DeepSeek-V2 MLA + DeepSeekMoE 前向流程伪代码\nfor token_t in sequence:\n    h = transformer_input[token_t]\n\n    # 1. MLA: KV 被联合压缩到 latent，并把 RoPE 从压缩 KV 中解耦出来\n    c_kv = W_DKV @ h                       # cache this latent\n    c_q = W_DQ @ h\n    q_c = W_UQ @ c_q\n    q_r = rope(W_QR @ c_q, position=token_t)\n    k_r = rope(W_KR @ h, position=token_t)  # cache this decoupled RoPE key\n\n    kv_cache.append((c_kv, k_r))\n    attn_out = latent_attention(q_c, q_r, kv_cache)\n\n    # 2. DeepSeekMoE: 共享专家恒激活，路由专家 Top-K 激活\n    u = h + attn_out\n    shared = sum(shared_expert_i(u) for i in range(2))\n    candidate_devices = top_m_devices(router_scores(u), m=3)\n    routed_ids = top_k_experts(router_scores(u, candidate_devices), k=6)\n    routed = sum(gate_i(u) * routed_expert_i(u) for i in routed_ids)\n\n    output[token_t] = u + shared + routed\n    update_aux_balance_losses(routed_ids, candidate_devices)\n</code></pre>\n<p>MLA 的出发点是标准 MHA 的推理瓶颈。MHA 在生成时要为每层、每个历史 token 缓存完整的 <span class=\"kb-math kb-math-inline\">K,V</span>，缓存量与 <span class=\"kb-math kb-math-inline\">2n_hd_hl</span> 成正比；当 batch size 或上下文长度变大时，显存首先被 KV cache 吃掉。GQA/MQA 可以减少 KV 头数，但会牺牲表达能力。DeepSeek-V2 的做法不是少存几个完整头，而是把所有头共享的 KV 信息先压缩进一个低维向量：</p>\n<div class=\"kb-math kb-math-display\">c_t^{KV}=W^{DKV}h_t,\\quad\nk_t^C=W^{UK}c_t^{KV},\\quad\nv_t^C=W^{UV}c_t^{KV}</div>\n<p>推理时只需要缓存 <span class=\"kb-math kb-math-inline\">c_t^{KV}</span>。更关键的是，<span class=\"kb-math kb-math-inline\">W^{UK}</span> 可以吸收到 query 侧投影里，<span class=\"kb-math kb-math-inline\">W^{UV}</span> 可以吸收到输出投影里，因此计算注意力时不必显式恢复完整的 <span class=\"kb-math kb-math-inline\">k_t^C,v_t^C</span>。DeepSeek-V2 的配置中 <span class=\"kb-math kb-math-inline\">d_c=512</span>，而完整多头维度 <span class=\"kb-math kb-math-inline\">n_hd_h=128\\times128=16384</span>，缓存从“完整 K/V”变为“低维 latent”，这是 93.3% KV cache 下降的根本来源。</p>\n<p>RoPE 是 MLA 中最容易被忽略的技术难点。若直接对 <span class=\"kb-math kb-math-inline\">k_t^C=W^{UK}c_t^{KV}</span> 加 RoPE，位置相关的旋转矩阵会夹在 <span class=\"kb-math kb-math-inline\">W^{UK}</span> 和 query 投影之间，使推理时的矩阵吸收不再成立。DeepSeek-V2 因此新增解耦通道：</p>\n<div class=\"kb-math kb-math-display\">q_t=[q_t^C;q_t^R],\\quad k_t=[k_t^C;k_t^R]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">q_t^R</span> 和共享的 <span class=\"kb-math kb-math-inline\">k_t^R</span> 专门承载 RoPE 位置信息。这样主体语义仍由低秩 KV latent 提供，位置信息由额外小维度通道提供。论文给出的直觉是：MLA 的 KV cache 近似等价于只有 2.25 个组的 GQA，但能力在消融中强于 MHA。</p>\n<p>DeepSeekMoE 解决的是训练成本而不是 KV cache。它继承 DeepSeekMoE 的两条设计：细粒度专家分割让每个专家更容易专化，共享专家隔离把通用知识从路由专家里拿出来，减少不同路由专家重复学习同一类通用模式。DeepSeek-V2 每个 MoE 层包含 2 个共享专家和 160 个路由专家，每个 token 额外选择 6 个路由专家；共享专家对所有 token 生效，路由专家只处理与自己亲和度高的 token。</p>\n<p>MoE 的代价是通信和负载不均衡。DeepSeek-V2 把专家均匀放在 8 个设备上，并要求每个 token 最多发送到 3 个设备；这限制了 all-to-all 的扇出。训练时还计算三类辅助损失：专家级损失约束单个专家的 token 量，设备级损失约束设备整体负载，通信级损失约束设备接收侧负载。若某设备超出容量预算，则按路由亲和度丢弃低优先级 token，并保留一部分序列从不丢弃，以降低训练与推理的不一致。</p>\n<p>从系统角度看，DeepSeek-V2 的贡献不是单点 MoE 或单点注意力替换，而是把“低缓存注意力”和“稀疏激活 FFN”一起做成可训练、可部署的模型。MLA 让长上下文和大 batch 推理不被 KV cache 限死，DeepSeekMoE 让 236B 总参数模型每个 token 只激活 21B 参数，设备受限路由和负载均衡损失则保证这套稀疏结构在 H800 集群上不会被通信拖垮。</p>",
      "quiz": {
        "q": "DeepSeek-V2 中解耦 RoPE 的主要作用是什么？",
        "options": [
          "让 MoE 路由更均匀，减少专家负载倾斜",
          "把位置信息从低秩 KV 压缩主路径中分离出来，保留矩阵吸收带来的 KV cache 节省",
          "用更大的词表增强中文和英文混合建模",
          "在训练中完全取消所有负载均衡辅助损失"
        ],
        "answer": 1,
        "explain": "若直接对压缩 key 加 RoPE，位置相关矩阵会破坏推理时的投影矩阵吸收。解耦 RoPE 用额外的 q^R/k^R 通道承载位置信息，从而保留 MLA 的低缓存优势。"
      }
    },
    {
      "id": "llama3",
      "num": 23,
      "name": "Llama 3",
      "fullName": "Llama 3 模型群 (The Llama 3 Herd of Models)",
      "year": "2024.07",
      "org": "Meta AI",
      "parent": "llama2",
      "paperUrl": "https://arxiv.org/abs/2407.21783",
      "projectUrl": "",
      "category": "open_foundation",
      "motivation": "405B稠密开放模型群",
      "summary": "Llama 3 是 Meta AI 发布的开放基础语言模型群，旗舰版为 405B 参数的稠密 Transformer，训练计算量达 3.8×10²⁵ FLOPs（约为 Llama 2 最大版的 50 倍），原生支持 128K 长上下文、多语言、代码、推理和工具调用，在大量任务上达到与 GPT-4 相当的性能，且全部模型权重公开可商用。",
      "keyPoints": [
        "<strong>模型规模与架构</strong>：采用标准 Dense Transformer 架构，旗舰版 405B 参数，126 层，embedding 维度 16,384，128 个 attention heads；使用 Grouped Query Attention (GQA，8 个 KV heads) 以提升推理效率；词表从 Llama 2 的 32K 扩展至 128K，RoPE 基频 theta 从 10,000 提高到 500,000 以更好支持长上下文。",
        "<strong>预训练数据</strong>：训练语料约 15.6T tokens（比 Llama 2 增长 7 倍），经过三层策展流水线：URL级去重→启发式过滤（结构/质量信号）→基于模型的质量分类器。通过知识蒸馏方法用大模型预测各数据源的\"最优混合比例\"，并在训练末期引入退火阶段（Annealing）——使用少量高质量非英语数据将学习率线性衰减至零，大幅提升多语言能力。",
        "<strong>后训练对齐</strong>：采用多轮 SFT（监督微调） + DPO（直接偏好优化）迭代流程。SFT 数据来自人类标注与合成生成；DPO 在消息级别标注偏好（而非对话级别），特别针对工具使用场景。引入模型平均（Model Averaging）技巧提高稳定性，并使用拒绝采样（Rejection Sampling）扩充高质量样本。",
        "<strong>三大工具原生集成</strong>：通过后训练赋予模型调用 Brave Search（网页搜索）、Python Interpreter（代码执行）和 Wolfram Alpha API（数学计算）的能力，支持多轮对话中的顺序工具调用和零样本工具调用（仅凭函数签名生成调用代码）。",
        "<strong>性能</strong>：在 MMLU、HumanEval、GSM8K、MATH 等主流基准上，Llama 3 405B 指令版与 GPT-4 持平或差距在误差范围内；多语言基准（如 MGSM、XWinograd）上显著优于同等规模的开放模型；代码能力（HumanEval+、MBPP+）达到顶级闭源模型水平。长上下文评测（Needle-in-Haystack 100% 召回率）和工具调用（BFCL 基准领先）均为第一梯队。",
        "<strong>安全体系</strong>：发布 Llama Guard 3 输入/输出安全分类器；构建 CybersecEval、ChemicalSafetyBench 等安全评测基准；进行大规模红队测试与系统级安全防护（System Guard）；预训练数据过滤个人身份信息与不安全内容。",
        "<strong>推理优化</strong>：采用 Pipeline Parallelism（流水线并行）+ FP8 量化，使得 405B 模型可在单节点 8×H100 上高效推理，推理延迟显著低于同类规模模型。"
      ],
      "detail": "<p><img alt=\"Llama 3 整体架构与训练流程\" src=\"https://ar5iv.labs.arxiv.org/html/2407.21783/assets/x1.png\" />\n<em>图 1：Llama 3 整体架构与训练流程 — Llama 3 是一个预测下一 token 的 Transformer 语言模型</em></p>\n<p><img alt=\"后训练策略总览\" src=\"https://ar5iv.labs.arxiv.org/html/2407.21783/assets/x7.png\" />\n<em>图 7：Llama 3 后训练策略总览 — 包含 SFT、拒绝采样和 DPO 的多轮迭代</em></p>\n<pre><code class=\"language-python\"># Llama 3 DPO 训练目标简化伪代码\n# 对每个偏好对 (x, y_w, y_l)，y_w 为获胜响应，y_l 为落败响应\n\ndef dpo_loss(model, ref_model, x, y_w, y_l, beta=0.1):\n    # 计算模型对两个响应的对数概率比\n    log_pi_w = model.log_prob(x, y_w)  # 策略模型下获胜响应的 log prob\n    log_pi_l = model.log_prob(x, y_l)  # 策略模型下落败响应的 log prob\n    log_ref_w = ref_model.log_prob(x, y_w)  # 参考模型下获胜响应的 log prob\n    log_ref_l = ref_model.log_prob(x, y_l)  # 参考模型下落败响应的 log prob\n\n    # 构建隐式奖励差\n    reward_diff = beta * ((log_pi_w - log_ref_w) - (log_pi_l - log_ref_l))\n\n    # 二元交叉熵损失（等价于 Bradley-Terry 偏好模型）\n    loss = -log_sigmoid(reward_diff)\n    return loss\n\ndef training_loop():\n    for epoch in range(6):  # 6 轮 SFT → DPO 迭代\n        # 阶段 1: SFT（监督微调）\n        for batch in sft_data:\n            loss = cross_entropy(model(batch.prompt), batch.response)\n            optimizer.step(loss)\n\n        # 阶段 2: 收集偏好标注数据（消息级别）\n        preferences = human_annotate_message_level(model, prompts)\n\n        # 阶段 3: DPO（直接偏好优化）\n        for batch in preferences:\n            loss = dpo_loss(model, ref_model, batch.x, batch.y_w, batch.y_l)\n            optimizer.step(loss)\n\n        # 阶段 4: 模型平均\n        model = average_checkpoints(checkpoints[-5:])\n</code></pre>\n<h5>1. 设计哲学：数据、规模与复杂度</h5>\n<p>Meta 团队将高质量基础模型的开发总结为三个核心杠杆：(1) <strong>数据</strong> — 相比 Llama 2 大幅提升预训练数据的数量（×7）与质量，引入更精细的预处理和策展流水线；(2) <strong>规模</strong> — 将模型预训练计算量提升近 50 倍至 3.8×10²⁵ FLOPs；(3) <strong>管理复杂度</strong> — 刻意选择标准 Dense Transformer 而非 Mixture-of-Experts，以最大化开发流程的可扩展性和可预测性，降低训练不确定性和调试成本。</p>\n<div class=\"key-point\">💡 关键：Dense 架构的选择使得扩展规律（Scaling Law）预测更准确，模型行为更可预测，这对于 54 天的超大规模训练至关重要。</div>\n<h5>2. 模型架构详解</h5>\n<p>Llama 3 保持与 Llama 2 高度一致的架构选择，性能增益主要来自数据与训练规模。关键改进包括：</p>\n<ul>\n<li><strong>Grouped Query Attention (GQA)</strong>：每 8 个 query head 共享 1 组 KV head，在大 batch 推理时减少 KV cache 占用约 8 倍，使 405B 模型的单节点推理成为可能。</li>\n<li><strong>128K 词表</strong>：使用 tiktoken（与 GPT-4 相同的 tokenizer 框架）将词表从 32K 扩大至 128K，多语言编码效率提升，平均每 token 覆盖更多语义信息。</li>\n<li><strong>RoPE 优化</strong>：将旋转位置编码的频率基值 θ 从 10,000 增加到 500,000，使高频分量衰减更慢。给定位置 m 和 n，旋转角度为：</li>\n</ul>\n<div class=\"kb-math kb-math-display\">\\Theta_{m-n} = (m-n) \\cdot \\theta^{-2d/D}</div>\n<p>增大 θ 使高频分量的角度差异在长距离下仍然显著，从而改善 128K 极限长度下的位置区分能力。</p>\n<h5>3. 预训练数据策展流水线</h5>\n<p>预训练数据总量约 15.6T tokens，经过三层策展：</p>\n<ul>\n<li><strong>第一阶段：URL 级去重与清洗</strong>。移除重复文档、低质量页面（如导航页、错误页）、成人内容。</li>\n<li><strong>第二阶段：启发式过滤</strong>。基于文本长度、停用词比例、困惑度评分等信号进行粗筛。</li>\n<li><strong>第三阶段：质量分类器</strong>。使用 Llama 2 作为基座训练二分类器，对每个文档打分，仅保留高质量部分。分类器训练样本来自人工标注的\"高质量文档\"（维基百科、书籍等）与\"低质量文档\"。</li>\n<li><strong>数据混合优化</strong>：采用知识蒸馏思路 — 用小型代理模型在不同数据混合比例下训练，预测其在关键基准上的表现，寻找最优数据配比。最终混合：通用网页 50%、代码 15%、数学/推理 15%、非英语 15%。</li>\n<li><strong>退火阶段（Annealing）</strong>：在预训练最后 40M tokens，将学习率线性退火至零，同时混入精心挑选的高质量多语言数据，在不显著增加计算成本的前提下大幅提升多语言能力。</li>\n</ul>\n<h5>4. 后训练：SFT + DPO 多轮迭代</h5>\n<ul>\n<li><strong>SFT（监督微调）</strong>：收集涵盖指令遵循、代码、数学、多语言、长上下文、工具使用等场景的人工标注示例。同时引入合成数据 — 用前序模型生成多样化 prompt-response 对，经筛选后加入训练集。</li>\n<li><strong>DPO 偏好优化</strong>：在消息级别（message-level）标注偏好，核心损失函数为：</li>\n</ul>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{DPO}}(\\pi_\\theta; \\pi_{\\text{ref}}) = -\\mathbb{E}_{(x, y_w, y_l) \\sim \\mathcal{D}} \\left[\\log \\sigma\\left(\\beta \\log\\frac{\\pi_\\theta(y_w|x)}{\\pi_{\\text{ref}}(y_w|x)} - \\beta \\log\\frac{\\pi_\\theta(y_l|x)}{\\pi_{\\text{ref}}(y_l|x)}\\right)\\right]</div>\n<p>其中 σ 为 sigmoid 函数，β 控制偏离参考模型的程度，y_w / y_l 分别为获胜和落败响应。消息级别标注在工具使用等多步交互场景中比对话级别更精确。</p>\n<div class=\"warn-box\">⚠️ 注意：在工具使用相关任务中，拒绝采样（Rejection Sampling）未带来显著收益，因此省略了该步骤。</div>\n<ul>\n<li><strong>迭代轮次</strong>：整个后训练过程进行 6 轮 SFT → DPO 迭代，每轮使用新收集的标注数据。</li>\n<li><strong>模型平均（Model Averaging）</strong>：在不同训练步数保存的多个 checkpoint 进行权重平均，有效降低方差并提升下游任务稳定性。</li>\n</ul>\n<h5>5. 工具使用能力</h5>\n<p>完全依赖人类标注和偏好数据教授工具使用（非 Toolformer 式的自监督合成）。三大工具为 Brave Search、Python Interpreter 和 Wolfram Alpha API。关键能力包括：</p>\n<ul>\n<li><strong>零样本工具调用</strong>：给定未见过的 Python 函数签名和文档字符串，模型可直接生成正确的调用代码，无需额外训练。</li>\n<li><strong>多步工具链</strong>：模型可在回答中生成分步计划，依次调用多个工具（如先搜索信息 → 运行 Python 验证计算 → 调用 Wolfram Alpha 确认结果），每步之间进行推理。</li>\n</ul>\n<h5>6. 安全性设计</h5>\n<ul>\n<li><strong>预训练安全</strong>：过滤训练数据中的 PII、仇恨言论、暴力内容和 CSAM。</li>\n<li><strong>Llama Guard 3</strong>：基于 Llama 3 微调的安全分类器，覆盖 13 个风险类别，可同时检测输入 prompt 和输出 response。</li>\n<li><strong>CybersecEval</strong>：专门评估网络安全风险场景下的模型行为。</li>\n<li><strong>红队测试与 System Guard</strong>：组织内外部红队对抗性测试，部署层设置规则+模型双重过滤。</li>\n</ul>\n<h5>7. 推理部署</h5>\n<p>405B 模型的推理部署采用流水线并行（16 个阶段）+ FP8 权重量化。FP8 通过带缩放因子的浮点压缩将显存需求降低约一半，逐层校准最小化精度损失。最终在单台 8×H100 节点上即可服务 405B 模型。</p>",
      "quiz": {
        "q": "Llama 3 的 DPO（直接偏好优化）采用消息级别偏好标注的主要优势是什么？",
        "options": [
          "减少标注成本，因为只需标注一次对话",
          "在多步工具调用等交互场景中更精确，能区分单步响应质量",
          "使模型完全不需要参考模型的约束",
          "让训练速度比对话级别标注快 10 倍"
        ],
        "answer": 1,
        "explain": "消息级别标注在工具使用等多步交互场景中可精确比较同一上下文下的两个候选 assistant 消息，避免对整个对话排序引入噪声。"
      }
    },
    {
      "id": "qwen25",
      "num": 24,
      "name": "Qwen2.5",
      "fullName": "通义千问 2.5 (Qwen2.5 Technical Report)",
      "year": "2024.12",
      "org": "Alibaba Qwen",
      "parent": "llama3",
      "paperUrl": "https://arxiv.org/abs/2412.15115",
      "projectUrl": "",
      "category": "open_foundation",
      "motivation": "18T语料扩展开放谱系",
      "summary": "Qwen2.5 把 Qwen 系列扩展到更完整的开放基础模型谱系，通过 18T token 预训练、更强数据混合、长上下文扩展和 SFT+DPO+GRPO 多阶段后训练，显著提升知识、数学、代码、结构化输出与人类偏好对齐能力。它同时发布 0.5B 到 72B 的开放 dense 模型，并提供 Qwen2.5-Turbo/Plus 等 MoE API 模型，形成从端侧到云端的统一模型族。",
      "keyPoints": [
        "模型谱系：开放 0.5B、1.5B、3B、7B、14B、32B、72B dense decoder-only LLM，另有 Qwen2.5-Turbo 与 Qwen2.5-Plus 两个托管 MoE 变体。",
        "数据规模：高质量预训练数据从 Qwen2 的 7T token 扩展到 18T token，并增强数学、代码、多语言与高价值知识域数据。",
        "长上下文：多数中大模型支持 128K 上下文与 8K 生成；预训练从 4K 扩到 32K，推理侧结合 YARN 与 Dual Chunk Attention 扩展长度能力。",
        "后训练：使用超过 100 万条 SFT 样本，并进行多阶段强化学习，包括离线 DPO 和在线 GRPO。",
        "能力提升：重点提升数学、代码、结构化数据理解、JSON/结构化输出、长文本生成、指令遵循和多语言能力。",
        "评测定位：Qwen2.5-72B-Instruct 在多个任务上接近或超过更大的 Llama-3.1-405B-Instruct，Qwen2.5-14B/32B 填补中等规模高性能开放模型区间。"
      ],
      "detail": "<p><img alt=\"Qwen2.5 模型卡总览\" src=\"https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen2.5/Qwen2.5%20modelcard.001.jpeg\" />\n<em>图：Qwen 官方 Qwen2.5 LLM model card。它概览了 0.5B 到 72B 模型的参数规模、层数、注意力头/KV 头、上下文长度、生成长度和许可证。</em></p>\n<p>Qwen2.5 的核心不是单个新算子，而是一个完整 foundation model pipeline 的升级。预训练目标仍是标准自回归语言建模：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{LM}}(\\theta)=-\\sum_{t=1}^{T}\\log p_\\theta(x_t\\mid x_{&lt;t})</div>\n<p>但论文强调，收益主要来自更大且更干净的数据、面向规模的超参数律、长上下文预训练，以及后训练阶段的系统化偏好优化。相比 Qwen2，Qwen2.5 将高质量语料从 7T 扩到 18T token；数据过滤使用 Qwen2-Instruct 作为质量评估器，对多语言样本进行多维度打分；数据混合则下采样电商、社媒、娱乐等重复/模板化内容，上采样科技、科学、学术等高价值域。</p>\n<p>架构上，开放权重 Qwen2.5 是 dense decoder-only Transformer 系列。官方 model card 显示，7B/14B/32B/72B 等中大模型采用较少 KV heads 的 GQA 配置，例如 7B 为 28 个 query heads / 4 个 KV heads，14B 与 32B 为 40 / 8，72B 为 64 / 8。GQA 的直觉是多个 query heads 共享较少的 key/value 投影，从而降低长上下文 KV cache 压力；这与 RoPE、SwiGLU、RMSNorm 等现代 LLM 组件共同构成 Qwen2.5 的基础块。</p>\n<p>长上下文训练分阶段进行：先用 4,096 token 上下文做主要预训练，再在最后阶段把上下文扩展到 32,768 token；对于非 Turbo 模型，还通过 YARN 与 DCA 将推理长度能力扩展到 131,072 token。Turbo 版本采用更激进的递进式上下文扩展，训练阶段经过 32K、65K、131K、262K，并在推理侧支持最高 1M token。机制上，RoPE 外推通过调整位置频率基底缓解训练长度与推理长度的分布差异，DCA 则把长序列相对位置映射到更局部的块内/块间结构，减少超长位置带来的注意力退化。</p>\n<pre><code class=\"language-python\"># Qwen2.5 训练与对齐流程伪代码\n\ndef build_qwen25(raw_web, code_data, math_data, multilingual_data):\n    scored = qwen2_instruct_quality_filter(raw_web)\n    clean = remove_low_quality_and_contaminated(scored)\n    balanced = domain_rebalance(\n        clean,\n        downsample=[&quot;ecommerce&quot;, &quot;social_media&quot;, &quot;entertainment&quot;],\n        upsample=[&quot;technology&quot;, &quot;science&quot;, &quot;academic&quot;, &quot;high_quality_multilingual&quot;],\n    )\n    corpus_18T = mix(balanced, code_data, math_data, multilingual_data)\n\n    theta = pretrain_decoder_only_lm(corpus_18T, context_length=4096)\n    theta = continue_pretrain_long_context(theta, context_length=32768, rope_base=1_000_000)\n\n    theta = supervised_finetune(theta, instruction_samples=1_000_000_plus)\n    theta = dpo(theta, preference_pairs=&quot;offline human/model feedback&quot;)\n    theta = grpo(theta, prompts=&quot;online RL prompts&quot;, reward_models=&quot;preference + task rewards&quot;)\n    return theta\n</code></pre>\n<p>后训练阶段可以理解为从“会续写”到“会按人类意图完成任务”的转换。SFT 先用超过 100 万条指令样本建立基础行为分布；DPO 再用成对偏好样本直接优化胜负回答的相对概率。DPO 的典型目标为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{DPO}}=-\\mathbb{E}\\left[\\log\\sigma\\left(\\beta\\log\\frac{\\pi_\\theta(y_w\\mid x)}{\\pi_{\\text{ref}}(y_w\\mid x)}-\\beta\\log\\frac{\\pi_\\theta(y_l\\mid x)}{\\pi_{\\text{ref}}(y_l\\mid x)}\\right)\\right]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">y_w</span> 是偏好回答，<span class=\"kb-math kb-math-inline\">y_l</span> 是较差回答，<span class=\"kb-math kb-math-inline\">\\pi_{\\text{ref}}</span> 通常是 SFT 后的参考模型。它不显式训练 reward model 再跑 PPO，而是把偏好差异变成一个二分类式的对数概率间隔优化。</p>\n<p>GRPO 进一步用于在线强化学习。其直觉是对同一 prompt 采样一组回答，用组内奖励均值和方差构造相对优势：</p>\n<div class=\"kb-math kb-math-display\">\\hat A_i=\\frac{r_i-\\operatorname{mean}(r_1,\\dots,r_G)}{\\operatorname{std}(r_1,\\dots,r_G)}</div>\n<p>再用类似 PPO 的裁剪比率和 KL 约束更新策略，使高于同组平均的回答概率上升、低于平均的回答概率下降。相比逐样本绝对 reward，组相对优势更适合数学、代码、结构化输出等可自动或半自动评测的任务，也能降低 reward scale 对优化稳定性的影响。</p>\n<p>Qwen2.5 的一个重要设计取向是“通用底座 + 专长注入”。预训练阶段把 Qwen2.5-Coder 和 Qwen2.5-Math 的高质量数据纳入通用模型，使基础模型已经具备更强代码与数学能力；后训练阶段再重点提升长文本生成、结构化数据分析、JSON 输出和复杂指令遵循。最终，72B-Instruct 在 MATH、LiveCodeBench、Arena-Hard、MT-Bench 等指标上明显超过 Qwen2-72B-Instruct，并在若干关键任务上接近或超过更大参数量的 Llama-3.1-405B-Instruct。</p>\n<div class=\"key-point\">💡 关键：Qwen2.5 的方法贡献更像一条可复用的开放基础模型工程路线：数据质量与规模先把底座能力抬高，再用长上下文扩展和多阶段偏好优化把模型推向可用助手。</div>",
      "quiz": {
        "q": "Qwen2.5 相比 Qwen2 的最关键训练侧升级是什么？",
        "options": [
          "把预训练语料扩展到 18T token，并结合更强数据过滤、数据混合和多阶段后训练",
          "完全取消 Transformer 注意力并改用状态空间模型",
          "只发布一个 72B 模型以避免小模型能力下降",
          "只依赖 DPO，不再进行监督微调"
        ],
        "answer": 0,
        "explain": "论文强调 Qwen2.5 的提升来自 18T 高质量预训练数据、长上下文训练，以及 SFT 后接 DPO/GRPO 的多阶段后训练，而不是更换为非 Transformer 架构。"
      }
    },
    {
      "id": "deepseek_v3",
      "num": 25,
      "name": "DeepSeek-V3",
      "fullName": "大规模 MLA+MoE 语言模型 (DeepSeek-V3)",
      "year": "2024.12",
      "org": "DeepSeek-AI",
      "parent": "deepseek_v2",
      "paperUrl": "https://arxiv.org/abs/2412.19437",
      "projectUrl": "",
      "category": "sparse_moe",
      "motivation": "无辅助损失负载均衡",
      "summary": "DeepSeek-V3 在 DeepSeek-V2 的 MLA 和 DeepSeekMoE 基础上扩展到 671B 总参数，并提出无辅助损失的专家负载均衡策略，解决传统 MoE 依赖 auxiliary loss 时负载均衡信号与语言建模目标相互干扰的问题。",
      "keyPoints": [
        "671B 总参数、37B 每 token 激活参数，预训练 14.8T 高质量 tokens，完整训练约 2.788M H800 GPU hours。",
        "继续使用 MLA 压缩 KV cache，保持高效长上下文推理能力。",
        "DeepSeekMoE 配置升级为每层 1 个共享专家、256 个路由专家，每个 token 激活 8 个路由专家。",
        "提出 auxiliary-loss-free load balancing：Top-K 选择时加入动态 bias，负载更新与主损失解耦。",
        "每个 token 最多路由到 4 个节点，并取消 token dropping，减少训练和推理行为不一致。",
        "加入 Multi-Token Prediction (MTP)，在 next-token 之外额外预测一个未来 token，训练后推理可直接丢弃 MTP 模块。",
        "支持 FP8 混合精度训练，激活使用 1x128 tile-wise 量化，权重使用 128x128 block-wise 量化，并用更高精度累加降低误差。",
        "训练系统采用 2048 张 H800、16-way pipeline parallelism、64-way expert parallelism、ZeRO-1 和 DualPipe 通信计算重叠。"
      ],
      "detail": "<p><img alt=\"DeepSeek-V3 架构图\" src=\"https://arxiv.org/html/2412.19437/x2.png\" />\n<em>图：DeepSeek-V3 的基础架构，沿用 MLA 与 DeepSeekMoE，并加入 MTP 训练目标。</em></p>\n<pre><code class=\"language-python\"># DeepSeek-V3 MoE 层与无辅助损失负载均衡伪代码\nfor step, batch in enumerate(pretraining_stream):\n    expert_load = zeros(num_routed_experts)\n    loss = 0\n\n    for token in batch.tokens:\n        h = mla_attention(token.hidden, kv_latent_cache=True)\n\n        # Sigmoid gating 得到原始专家亲和度；bias 只用于选择，不作为主损失梯度学习\n        affinity = sigmoid(router(h))              # shape: [256]\n        selection_score = affinity + balance_bias\n        selected = top_k(selection_score, k=8, node_limit=4)\n\n        shared_out = shared_expert(h)\n        routed_out = 0\n        normalizer = sum(affinity[i] for i in selected)\n        for i in selected:\n            gate = affinity[i] / normalizer\n            routed_out += gate * routed_expert[i](h)\n            expert_load[i] += 1\n\n        h = h + shared_out + routed_out\n        loss += next_token_ce(h, token.next_token)\n        loss += mtp_ce(h, token.future_token_2) * mtp_weight\n\n    # 动态 bias 更新与反向传播解耦：过载专家降 bias，欠载专家升 bias\n    target = mean(expert_load)\n    for i in range(num_routed_experts):\n        if expert_load[i] &gt; target:\n            balance_bias[i] -= gamma\n        elif expert_load[i] &lt; target:\n            balance_bias[i] += gamma\n\n    loss += tiny_sequence_balance_loss(batch)       # 防止单序列极端不均衡\n    optimizer.backward_and_step(loss)\n</code></pre>\n<p>DeepSeek-V3 的架构主线是“保留 V2 已验证的高效注意力和稀疏 FFN，同时把 MoE 负载均衡从损失函数里拿出来”。MLA 部分与 DeepSeek-V2 一致，用 <span class=\"kb-math kb-math-inline\">c_t^{KV}=W^{DKV}h_t</span> 压缩 KV，并用解耦 RoPE 保留位置编码可用性。这样 V3 在扩到 671B 参数后，推理时仍不需要为每个历史 token 缓存完整多头 <span class=\"kb-math kb-math-inline\">K,V</span>，否则 128K 级上下文和大 batch 服务会被显存限制。</p>\n<p>MoE 规模比 V2 明显更大。每个 MoE 层有 1 个共享专家和 256 个路由专家，路由专家中每个 token 选 8 个，专家中间层维度为 2048。共享专家负责所有 token 都需要的通用能力，路由专家负责更细粒度的知识和模式。论文还限制每个 token 最多被发往 4 个节点，目的是在扩大专家数量时把跨节点 all-to-all 通信控制在可隐藏的范围内。</p>\n<p>传统 MoE 常用辅助损失鼓励专家负载均匀，问题是这个损失会和语言建模目标竞争：模型可能为了均匀使用专家而降低本应出现的专家专化。DeepSeek-V3 的关键改动是为每个路由专家维护一个动态 bias <span class=\"kb-math kb-math-inline\">b_i</span>，Top-K 选择用 <span class=\"kb-math kb-math-inline\">s_{i,t}+b_i</span>，但门控权重仍来自原始亲和度 <span class=\"kb-math kb-math-inline\">s_{i,t}</span>。当某专家在当前 step 中过载，就降低它的 bias；低于平均负载，就提高它的 bias：</p>\n<div class=\"kb-math kb-math-display\">b_i \\leftarrow b_i + \\gamma\\cdot\\mathrm{sign}(T_{\\mathrm{target}}-T_i)</div>\n<p>这里的 bias 更新不通过反向传播进入语言模型损失，因此不会直接扭曲 token 到专家的语义匹配。论文在预训练配置中把 bias update speed <span class=\"kb-math kb-math-inline\">\\gamma</span> 在前 14.3T tokens 设为 0.001，最后 500B tokens 设为 0。为了避免单条序列内部出现极端不均衡，V3 仍保留一个很小的 sequence-wise balance loss；但主要负载均衡压力由动态 bias 承担。</p>\n<p>V3 还取消了 V2 训练中的 token dropping。V2 需要在设备容量超限时丢弃低亲和度 token，以保证训练吞吐；V3 的辅助损失无关负载均衡和节点受限路由已经能把专家负载压住，因此可以让所有 token 都被处理。这个改变很重要，因为 token dropping 会制造训练和推理不一致：训练时某些 token 的专家计算缺失，推理时却不会缺失。</p>\n<p>MTP 是另一个训练目标层面的改动。DeepSeek-V3 设置 prediction depth <span class=\"kb-math kb-math-inline\">D=1</span>，含义是除了主模型预测下一个 token，还通过一个顺序 MTP 模块额外预测再下一个 token。第 <span class=\"kb-math kb-math-inline\">k</span> 个 MTP 模块会把上一深度的 hidden state 与第 <span class=\"kb-math kb-math-inline\">i+k</span> 个 token 的 embedding 拼接、归一化、投影，再经过 Transformer block 输出预测分布。总损失可简化为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}=\\mathcal{L}_{\\mathrm{next}}+\\lambda\\mathcal{L}_{\\mathrm{MTP}}</div>\n<p>论文中 <span class=\"kb-math kb-math-inline\">\\lambda</span> 在前 10T tokens 为 0.3，剩余 4.8T tokens 为 0.1。MTP 的好处是迫使 hidden state 携带更远一步的可预测信息，提升数据效率；推理时可以直接丢弃 MTP 模块，因此不增加主模型的常规生成成本，也可以把它改作 speculative decoding 的草稿模块。</p>\n<p>在系统层面，DeepSeek-V3 的 FP8 训练和 DualPipe 同样关键。FP8 让计算和存储更便宜，但大模型训练容易被量化误差毁掉。V3 对激活采用 1x128 tile-wise scaling，对权重采用 128x128 block-wise scaling，并把部分累加提升到更高精度，缓解 H800 Tensor Core FP8 GEMM 累加精度不足的问题。训练框架使用 16-way PP、64-way EP 和 ZeRO-1，不使用昂贵的 tensor parallelism；DualPipe 通过把 attention、all-to-all dispatch、MLP、all-to-all combine 以及反向计算重排，尽量隐藏跨节点专家并行带来的通信开销。</p>\n<p>因此，DeepSeek-V3 的方法贡献可以概括为三层协同：MLA 解决推理 KV cache，DeepSeekMoE 解决参数规模和计算成本，auxiliary-loss-free balancing 解决大规模 MoE 的专家负载与模型质量冲突。再叠加 MTP、FP8 和 DualPipe，论文才得以用 14.8T tokens 训练 671B 参数模型，并把完整训练成本控制在约 2.788M H800 GPU hours。</p>",
      "quiz": {
        "q": "DeepSeek-V3 的无辅助损失负载均衡为什么比传统 MoE auxiliary loss 更适合大规模模型？",
        "options": [
          "它把所有专家都改成 dense FFN，避免了路由问题",
          "它用动态 bias 调整 Top-K 选择，负载控制不直接通过主损失反向传播，从而减少对语言建模目标的干扰",
          "它只在推理阶段启用，因此不会影响训练",
          "它通过减少注意力头数降低 KV cache"
        ],
        "answer": 1,
        "explain": "V3 的 balance bias 根据专家负载单独更新，用于影响路由选择，但不作为语言建模损失中的强辅助项优化，因此更少破坏专家专化和主任务性能。"
      }
    },
    {
      "id": "minimax01",
      "num": 26,
      "name": "MiniMax-Text-01",
      "fullName": "闪电注意力基础模型 (MiniMax-01)",
      "year": "2025.01",
      "org": "MiniMax",
      "parent": "mixtral",
      "paperUrl": "https://arxiv.org/abs/2501.08313",
      "projectUrl": "",
      "category": "long_context",
      "motivation": "Lightning Attention扩长上下文",
      "summary": "MiniMax-Text-01 提出了 Lightning Attention、周期性 softmax attention 与 MoE 结合的混合长上下文基础模型，解决纯 softmax Transformer 在百万级上下文上计算和显存成本过高的问题。它将训练上下文扩展到 1M tokens，并在推理时外推到 4M tokens，同时保持接近顶级闭源模型的通用能力。",
      "keyPoints": [
        "MiniMax-01 系列包含 MiniMax-Text-01 与 MiniMax-VL-01，本条目聚焦 Text-01 的长上下文基础模型设计",
        "混合注意力结构采用每 7 个 Lightning Attention/TransNormer block 后接 1 个 softmax attention block 的节奏，总计 80 层",
        "MoE 结构包含 32 个专家、top-2 routing、global router 负载均衡，模型总参数 456B，每 token 激活 45.9B 参数",
        "Lightning Attention 将因果注意力拆成块内 left-product 与块间 right-product，避免线性注意力在 causal LM 中低效的全局 cumsum",
        "长上下文系统优化包含 LASP+、varlen ring attention、data packing、MoE 的 EP/ETP overlap，以及专门的 Lightning Attention 推理 kernel",
        "训练流程包含长上下文三阶段扩展、RoPE 频率与数据分布调度，Text-01 训练到 1M tokens，推理扩展到 4M tokens",
        "MiniMax-VL-01 在 Text-01 之上接入 303M ViT、两层 MLP projector，并继续训练 512B vision-language tokens"
      ],
      "detail": "<p><img alt=\"MiniMax-Text-01 4M Needle-in-a-Haystack 长上下文压力图\" src=\"https://github.com/MiniMax-AI/MiniMax-01/raw/main/figures/niah.png\" />\n<em>图：MiniMax 官方仓库给出的 4M Needle-in-a-Haystack 压力测试图，用于展示 MiniMax-Text-01 在超长上下文检索场景中的稳定性。</em></p>\n<pre><code class=\"language-python\"># Lightning Attention forward pass, simplified from the paper\n# Q, K, V: [n, d], B: block size, causal mask M: [B, B]\ndef lightning_attention_forward(Q, K, V, B):\n    blocks = split_into_blocks(Q, K, V, block_size=B)\n    KV = zeros((d, d))\n    outputs = []\n\n    for Q_t, K_t, V_t in blocks:\n        # Intra-block: exact causal attention inside the current block\n        O_intra = ((Q_t @ K_t.T) * causal_mask(B)) @ V_t\n\n        # Inter-block: summarize all previous blocks by a recurrent KV state\n        O_inter = Q_t @ KV\n\n        # Update prefix state for future blocks\n        KV = KV + K_t.T @ V_t\n        outputs.append(O_intra + O_inter)\n\n    return concat(outputs, axis=0)\n</code></pre>\n<p>MiniMax-Text-01 的核心动机是把上下文长度从常见的 32K 到 256K 推到百万级。标准 softmax attention 的训练和推理成本随序列长度呈二次增长，长上下文场景中 prefill latency 与显存占用都会迅速失控。论文选择 Lightning Attention 作为主体，不是简单替换成任意线性注意力，而是采用 I/O-aware 的分块计算来解决 causal LM 中 <code>cumsum</code> 难以并行的问题。</p>\n<p>线性注意力的基本改写是把</p>\n<div class=\"kb-math kb-math-display\">\\mathbf O = \\mathrm{Norm}\\left((\\mathbf Q\\mathbf K^\\top)\\mathbf V\\right)</div>\n<p>改成右乘形式：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf O = \\mathrm{Norm}\\left(\\mathbf Q(\\mathbf K^\\top\\mathbf V)\\right)</div>\n<p>这样可以维护一个递归状态 <span class=\"kb-math kb-math-inline\">\\mathbf{kv}_t</span>：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{kv}_0=\\mathbf 0,\\quad\n\\mathbf{kv}_t=\\mathbf{kv}_{t-1}+\\mathbf k_t\\mathbf v_t^\\top,\\quad\n\\mathbf o_t^\\top=\\mathbf q_t^\\top\\mathbf{kv}_t.</div>\n<p>直接递归虽然是线性复杂度，但不适合 GPU 并行。Lightning Attention 把序列切成块，对当前块内部仍计算因果 masked left-product，对历史块使用 <span class=\"kb-math kb-math-inline\">\\mathbf K^\\top\\mathbf V</span> 的前缀摘要。最终复杂度写作 <span class=\"kb-math kb-math-inline\">O(nd^2+nBd)</span>，其中 <span class=\"kb-math kb-math-inline\">n</span> 是序列长度，<span class=\"kb-math kb-math-inline\">d</span> 是特征维度，<span class=\"kb-math kb-math-inline\">B</span> 是 block size。当 <span class=\"kb-math kb-math-inline\">B\\ll n</span> 时，它避免了完整 <span class=\"kb-math kb-math-inline\">n\\times n</span> 注意力矩阵。</p>\n<div class=\"key-point\">💡 关键：MiniMax 并没有彻底抛弃 softmax attention。论文发现纯线性注意力在检索类任务上会有短板，因此采用 7 个 Lightning Attention block 加 1 个 softmax attention block 的混合结构。Lightning 层负责把长上下文成本压下来，周期性 softmax 层负责保留精确 token-to-token 检索能力。</div>\n<p>MoE 部分的作用是把模型容量做大，同时控制每个 token 的实际计算量。对输入 token <span class=\"kb-math kb-math-inline\">\\mathbf x_t</span>，MoE 输出可写为：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf h_t=\\sum_{i=1}^{E}\\mathrm{Softmax}_i\\left(\\mathrm{TopK}(\\mathbf x_t\\mathbf W_g)\\right)\\cdot \\mathrm{FFN}_i(\\mathbf x_t).</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">E=32</span>，MiniMax-Text-01 使用 top-2 routing。大规模 MoE 容易出现 routing collapse 或 expert imbalance，论文在 GShard 辅助损失之外增加 global router：先跨 EP group 同步各 expert 待处理 token 数，再做 dispatch，从而降低 token drop rate 并稳定训练。</p>\n<p>系统层面的贡献同样关键。softmax 层使用 varlen ring attention 处理 data packing 后的变长样本，减少百万级上下文中的 padding 浪费。Lightning 层使用 LASP+，让每个 context-parallel rank 先计算本地 <span class=\"kb-math kb-math-inline\">KV_L</span>，再通过 AllGather 得到全局前缀 <span class=\"kb-math kb-math-inline\">KV_G</span>，从而去掉原始 LASP 的串行 send-recv 依赖。MoE 侧通过 EP、ETP 与通信计算 overlap 降低 all-to-all 成本，推理侧则针对 Lightning Attention 实现 batched kernel fusion、prefill/decoding 分离、多级 padding 与 strided batched matmul。</p>\n<p>与传统 dense Transformer 相比，MiniMax-Text-01 的创新不只是把注意力从二次复杂度变成线性复杂度，而是在“线性注意力的吞吐优势、softmax 的检索能力、MoE 的容量扩展、分布式系统的通信隐藏”之间做工程化配平。这个配平解释了为什么它能在 456B 总参数、45.9B 激活参数规模下支持 1M 训练上下文和 4M 推理上下文，而不是只在小模型或离线实验中展示长序列可行性。</p>",
      "quiz": {
        "q": "MiniMax-Text-01 为什么要每 7 个 Lightning Attention block 后插入 1 个 softmax attention block？",
        "options": [
          "为了让所有 attention 层都变成二次复杂度",
          "为了在保持长上下文效率的同时补足线性注意力的检索能力",
          "为了减少 MoE 专家的总数量",
          "为了避免使用 RoPE 位置编码"
        ],
        "answer": 1,
        "explain": "Lightning Attention 提供近线性的长上下文效率，但纯线性注意力在精确检索上存在短板；周期性 softmax attention 保留强 token 交互能力。"
      }
    },
    {
      "id": "llama4",
      "num": 27,
      "name": "Llama 4",
      "fullName": "Llama 4 MoE 模型群 (Scout / Maverick)",
      "year": "2025.04",
      "org": "Meta AI",
      "parent": "llama3",
      "paperUrl": "https://ai.meta.com/blog/llama-4-multimodal-intelligence/",
      "projectUrl": "",
      "category": "sparse_moe",
      "motivation": "Llama首次转向MoE",
      "summary": "Llama 4 将 Llama 系列首次转向原生多模态 MoE 架构，推出 Scout 与 Maverick，并用 Behemoth 教师模型进行蒸馏，解决 dense Llama 在成本、上下文长度和多模态融合上的扩展瓶颈。其关键变化是稀疏专家路由、early fusion 多模态预训练、iRoPE 长上下文结构，以及更轻量但更偏在线探索的 post-training 流程。",
      "keyPoints": [
        "Llama 4 Scout 是 17B active parameters、16 experts、109B total parameters 的开放权重多模态 MoE，支持 10M token 输入上下文",
        "Llama 4 Maverick 是 17B active parameters、128 experts、400B total parameters 的多模态 MoE，面向高性能通用 assistant 与视觉理解",
        "Llama 4 Behemoth 是 288B active parameters、16 experts、近 2T total parameters 的教师模型，用于 Scout/Maverick 的 codistillation",
        "MoE 层包含 shared expert 与 routed experts，每个 token 进入 shared expert，并被 router 发送到一个 routed expert",
        "模型采用 alternating dense and MoE layers，以在稀疏激活和推理效率之间取得平衡",
        "原生多模态采用 early fusion，将文本、图像、视频帧 token 融入统一 backbone，而不是只在后端拼接视觉结果",
        "Llama 4 Scout 使用 iRoPE 架构：交错部分无位置编码 attention 层、其余层使用 RoPE，并结合 inference-time attention temperature scaling 提升长度泛化",
        "Post-training 流程改为 lightweight SFT → online RL → lightweight DPO，并持续过滤保留 medium-to-hard prompts"
      ],
      "detail": "<p><img alt=\"Llama 4 MoE 层示意图\" src=\"https://scontent-sjc3-1.xx.fbcdn.net/v/t39.2365-6/488655517_650996354186993_1043942188415715102_n.png?_nc_cat=105&amp;_nc_gid=jAu4FVVuVWJhx-yA99mh2Q&amp;_nc_ht=scontent-sjc3-1.xx&amp;_nc_oc=Adp3SXDM6sAEW3lAQImzdn3II-6LLCRkdmaMcCGsfXRTzWW7z7mPSmZThJxN_xNB1GI&amp;_nc_ohc=MLLT0x0HCvAQ7kNvwHcy6QK&amp;_nc_sid=e280be&amp;_nc_ss=78100&amp;_nc_zt=14&amp;ccb=1-7&amp;oe=6A4ADD00&amp;oh=00_Af9lNgA6auJXYH9AteODJIqmCo4wExysmD8nRUCAhlR7PQ\" />\n<em>图：Meta 官方博客中的 Llama 4 MoE 层示意图，展示 shared expert、router 与 routed experts 的组合方式。</em></p>\n<pre><code class=\"language-python\"># Simplified Llama 4 MoE block and training recipe\n# Scout uses 16 experts; Maverick uses 128 routed experts.\ndef llama4_moe_ffn(hidden, router, shared_expert, routed_experts):\n    shared = shared_expert(hidden)\n    gate = softmax(router(hidden))\n    expert_id = argmax(gate)              # top-1 routed expert in Meta's description\n    routed = gate[expert_id] * routed_experts[expert_id](hidden)\n    return shared + routed\n\n\ndef post_train_llama4(model, prompts):\n    hard_prompts = filter_easy_prompts(prompts, judge=&quot;Llama-as-judge&quot;)\n    model = lightweight_sft(model, hard_prompts)\n\n    while online_rl_budget_remaining():\n        batch = sample_medium_to_hard_prompts(hard_prompts)\n        rollouts = model.generate(batch)\n        rewards = multimodal_and_reasoning_rewards(rollouts)\n        model = online_rl_update(model, rollouts, rewards)\n        hard_prompts = retain_medium_to_hard(batch, rollouts)\n\n    model = lightweight_dpo(model, corner_case_preferences())\n    return model\n</code></pre>\n<p>Llama 4 的最大结构变化是从 dense Llama 转向 sparse MoE。dense 模型中每个 token 都经过相同 FFN 参数，质量提升通常意味着每 token 计算量随模型变大一起增加。MoE 则把参数容量和激活计算解耦：总参数可以很大，但每个 token 只激活 shared expert 与少数 routed experts。对一个 hidden state <span class=\"kb-math kb-math-inline\">\\mathbf h</span>，可用如下形式理解 Llama 4 的 MoE 层：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf y = E_{\\mathrm{shared}}(\\mathbf h) + \\sum_{e\\in\\mathrm{Top1}(g(\\mathbf h))} p_e E_e(\\mathbf h),\\quad\np=\\mathrm{softmax}(\\mathbf W_r\\mathbf h).</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">E_{\\mathrm{shared}}</span> 提供所有 token 都共享的通用变换，<span class=\"kb-math kb-math-inline\">E_e</span> 提供被 router 选中的专家能力。Meta 在博客中明确写到 Maverick 的 MoE 层有 128 个 routed experts 和一个 shared expert，每个 token 被送到 shared expert，同时送到一个 routed expert。Scout、Maverick 都保持 17B active parameters，但总参数分别达到 109B 与 400B，这就是性能成本比提升的来源。</p>\n<p>第二个关键变化是原生多模态 early fusion。Llama 4 不是先用独立视觉模型生成 caption，再把 caption 交给语言模型，而是把文本 token 与视觉 token 送入同一模型 backbone 进行联合预训练。视觉编码器基于 MetaCLIP，并与冻结的 Llama 模型配合训练以适配 LLM。early fusion 的好处是模型可以在底层注意力和专家路由阶段就学习跨模态对应关系，例如图像区域、视频帧、问题文本之间的直接交互。</p>\n<p>Llama 4 Scout 的长上下文能力主要依赖 iRoPE。Scout 在 pre-training 与 post-training 中都使用 256K context，并通过架构和推理时缩放泛化到 10M input context。iRoPE 中的 “i” 表示 interleaved：一部分 attention 层不使用位置编码，另一部分层保留 RoPE。这样做的直觉是减少所有层都强绑定训练长度位置分布带来的外推压力，同时保留 RoPE 对局部顺序和相对位置的建模能力。推理时 attention temperature scaling 可以写成直觉形式：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{Attn}(Q,K,V)=\\mathrm{softmax}\\left(\\frac{QK^\\top}{\\tau_l\\sqrt d}+B_{\\mathrm{pos}}\\right)V,</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\tau_l</span> 表示层相关的温度缩放，<span class=\"kb-math kb-math-inline\">B_{\\mathrm{pos}}</span> 在 RoPE 层隐式来自旋转位置编码，在无位置编码层可以视为缺省。温度缩放调节 attention 分布的尖锐程度，帮助模型在远超训练长度时避免注意力过度集中或失真。</p>\n<p>Post-training 流程也明显不同于“堆大量 SFT 和 DPO”的做法。Meta 报告称 Maverick 的难点是同时保持多模态、推理和对话能力，因此采用 lightweight SFT → online RL → lightweight DPO。SFT 前先用 Llama judge 移除超过 50% 的 easy 数据，只保留更难的样本，避免 SFT 和 DPO 过度约束模型探索。online RL 阶段通过更难 prompts 获得能力跃迁，并持续交替“训练模型”和“用模型过滤 medium-to-hard prompts”。最后的轻量 DPO 主要处理 response quality 的角落案例，而不是作为主要能力来源。</p>\n<p>Behemoth 的作用是教师模型。它仍是 MoE 多模态模型，规模接近 2T total parameters，288B active parameters。Meta 使用 codistillation 将 Behemoth 的能力迁移到 Maverick，并设计动态加权的蒸馏损失，在 soft targets 与 hard targets 之间随训练调整权重。与传统离线蒸馏不同，Behemoth 对新增数据提供前向目标，而大部分训练数据上的教师前向成本通过预训练期间的 codistillation 摊销。</p>\n<p>与 Llama 3 相比，Llama 4 的创新不只是“更大”。Llama 3 主要是 dense 文本模型路线，Llama 4 则把稀疏 MoE、原生多模态、长上下文位置策略、教师蒸馏和在线 RL 组合成一条新路线。代价是部署时需要存储 total parameters，并处理专家路由、专家并行和多模态输入的系统复杂度；收益是每 token 激活计算保持在相对可控范围内，同时获得更高容量、更长上下文和更强视觉理解。</p>",
      "quiz": {
        "q": "Llama 4 MoE 层中 shared expert 的主要作用是什么？",
        "options": [
          "替代所有 routed experts，让模型退化为 dense FFN",
          "为所有 token 提供共享变换，同时 routed expert 负责稀疏专门化能力",
          "只处理图像 token，不处理文本 token",
          "只在 DPO 阶段使用，推理时不参与计算"
        ],
        "answer": 1,
        "explain": "Meta 的 MoE 描述中，每个 token 同时进入 shared expert 和一个 routed expert；shared expert 承担通用能力，routed expert 提供条件化容量。"
      }
    },
    {
      "id": "qwen3",
      "num": 28,
      "name": "Qwen3",
      "fullName": "通义千问 3 (Qwen3 Technical Report)",
      "year": "2025.05",
      "org": "Alibaba Qwen",
      "parent": "qwen25",
      "paperUrl": "https://arxiv.org/abs/2505.09388",
      "projectUrl": "",
      "category": "sparse_moe",
      "motivation": "稠密与MoE统一发布",
      "summary": "Qwen3 提出了混合思考模式（Thinking/Non-thinking）融合训练框架，通过冷启动强化学习→思考模式强化学习→模式融合→通用强化学习的四阶段后训练管线，在同一密集模型中同时具备深度推理思考能力和快速直接回答能力，成为首个开源的支持模式切换的混合推理大模型系列。",
      "keyPoints": [
        "密集 Transformer 架构，参数规模覆盖 0.6B / 1.7B / 4B / 8B / 14B / 32B / 235B-A22B 七档",
        "预训练数据 36T tokens，覆盖 119+ 种语言，在 Qwen2.5 基础上进行三阶段预训练扩展",
        "核心创新：同一模型支持 Thinking（深度思考）和 Non-thinking（快速回答）两种模式，通过 <code>enable_thinking</code> 参数控制",
        "四阶段后训练管线：①冷启动 SFT → ②Thinking 模式 RL → ③模式融合（SFT+DPO）→ ④通用能力 GRPO",
        "Thinking 模式训练目标：强化学习驱动，让模型学会生成长 Chain-of-Thought（CoT）推理链，最终输出在 <code></code> 标签内",
        "Non-thinking 模式：跳过显式推理链，直接生成答案，适用于低延迟场景",
        "模式融合阶段：通过精心构造的混合 SFT 数据和 DPO 偏好对，将两种模式统一到同一模型参数中",
        "预训练三阶段扩展：Stage 1（在原数据上继续训练 5T tokens）→ Stage 2（扩展上下文至 32K，混入更多长文本数据）→ Stage 3（引入高质量多语言和代码数据）",
        "GRPO（Group Relative Policy Optimization）用于通用能力增强，无需 Value Model",
        "支持 Qwen Agent 框架集成，具备工具调用、代码解释器和 RAG 能力"
      ],
      "detail": "<p><img alt=\"Qwen3 模型能力总览\" src=\"https://arxiv.org/html/2505.09388v1/extracted/6279996/figures/overview.png\" />\n<em>图：Qwen3 系列模型的核心能力示意——同一模型在 Thinking 与 Non-thinking 模式下灵活切换</em></p>\n<p><strong>动机与背景</strong></p>\n<p>传统大语言模型存在两类需求之间的矛盾：一方面是深度推理场景（如数学证明、复杂编程）需要模型\"慢思考\"，生成详细的推理链（Chain-of-Thought）；另一方面是日常对话和简单查询需要模型\"快响应\"，跳过冗长推理直接输出答案。此前，业界通常分别训练两个独立的模型来应对这两种需求（如 DeepSeek-R1 专精推理，Qwen2.5 主打通用对话），不仅增加了部署成本，也无法在推理时动态切换模式。Qwen3 首次将这两种能力融合到<strong>单一密集模型</strong>中，用户可以通过单个超参数 <code>enable_thinking</code> 在推理时自由切换模式。</p>\n<p><strong>核心机制：混合思考模式</strong></p>\n<p>Qwen3 的 Thinking 模式受 DeepSeek-R1 启发但做了关键改进。在 Thinking 模式下，模型生成的内容包含两部分：</p>\n<ol>\n<li><strong>推理链</strong>：放在 <code></code> 和 <code></code> 标签之间，是模型内部的思考过程</li>\n<li><strong>最终答案</strong>：放在 <code></code> 和 <code></code> 标签之间，是呈现给用户的输出</li>\n</ol>\n<p>训练时，模型学会在 Thinking 模式中自动插入推理链；在 Non-thinking 模式下，模型直接跳过推理链生成最终答案。这种设计的精妙之处在于：两种模式的输出分布通过<strong>共享的解码头</strong>统一建模，模型在 token 级别学会了何时\"思考\"、何时\"回答\"。</p>\n<pre><code># Qwen3 推理时的模式切换伪代码\ndef qwen3_generate(prompt, enable_thinking=True):\n    if enable_thinking:\n        # 模型自动生成:\n        system_prompt = &quot;You are Qwen3, think step by step.&quot;\n        output = model.generate(\n            prompt,\n            stop_tokens=[&quot;&lt;/response&gt;&quot;],\n            max_thinking_tokens=4096\n        )\n    else:\n        # 模型跳过推理链，直接输出答案\n        system_prompt = &quot;You are Qwen3, answer directly.&quot;\n        output = model.generate(\n            prompt,\n            skip_thinking=True,\n            max_tokens=2048\n        )\n    return output\n</code></pre>\n<p><strong>预训练三阶段扩展</strong></p>\n<p>Qwen3 的预训练并非从头开始，而是在 Qwen2.5 的基础上进行了三阶段增量训练，总计新增 36T tokens：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>阶段</th>\n<th>训练量</th>\n<th>核心策略</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Stage 1</td>\n<td>~5T tokens</td>\n<td>在 Qwen2.5 原有数据分布上继续训练，稳定模型基础能力</td>\n</tr>\n<tr>\n<td>Stage 2</td>\n<td>~15T tokens</td>\n<td>扩展上下文窗口至 32K tokens，大幅增加长文本（书籍、论文、代码仓库）比例</td>\n</tr>\n<tr>\n<td>Stage 3</td>\n<td>~16T tokens</td>\n<td>引入高质量多语言语料（119+语言）和代码数据，提升多语言和编程能力</td>\n</tr>\n</tbody>\n</table></div>\n<p>数据配比如下：\n- 网页文本：~40%\n- 代码：~25%\n- 书籍/学术论文：~15%\n- 多语言数据：~12%\n- 数学/推理：~8%</p>\n<div class=\"key-point\">💡 关键：Stage 3 的\"质量提升\"阶段是 Qwen3 性能跃升的核心——团队使用 Qwen2.5 本身作为数据质量过滤器，对海量语料进行打分，仅保留高质量子集进行训练。</div>\n<p><strong>后训练四阶段管线</strong></p>\n<p>这是 Qwen3 最核心的技术贡献。整个后训练流程分为四个紧密衔接的阶段：</p>\n<p><strong>阶段一：冷启动 SFT（Cold Start Supervised Fine-Tuning）</strong>\n- 使用约 50K 高质量人工标注数据对基座模型进行初步微调\n- 数据覆盖：通用对话、指令遵循、安全对齐、简单推理\n- 目的：让模型获得基础的对话能力，为后续 RL 训练提供合理的初始策略\n- 此阶段同时训练 Thinking 和 Non-thinking 两种格式的回复</p>\n<p><strong>阶段二：Thinking 模式强化学习</strong>\n- 使用数学（GSM8K、MATH）和代码（LiveCodeBench）等推理密集型任务作为训练环境\n- 奖励信号设计：\n  - 格式奖励：是否正确使用了 <code>...</code> 和 <code>...</code> 标签\n  - 答案奖励：最终答案是否正确（数学题答案匹配、代码题通过测试用例）\n  - 过程奖励（可选）：推理链的中间步骤是否合理\n- 使用 PPO（Proximal Policy Optimization）进行策略优化，Reference Model 为阶段一的 SFT 模型\n- 关键公式——PPO 裁剪目标：\n  <div class=\"kb-math kb-math-display\">L^{CLIP}(\\theta) = \\mathbb{E}_t \\left[\\min\\left(r_t(\\theta) \\hat{A}_t, \\text{clip}(r_t(\\theta), 1-\\epsilon, 1+\\epsilon) \\hat{A}_t\\right)\\right]</div>\n  其中 <span class=\"kb-math kb-math-inline\">r_t(\\theta) = \\frac{\\pi_\\theta(a_t|s_t)}{\\pi_{\\theta_{old}}(a_t|s_t)}</span> 是新旧策略的概率比，<span class=\"kb-math kb-math-inline\">\\epsilon=0.2</span>\n- 此阶段模型学会了在推理密集型任务中生成高质量的长推理链</p>\n<div class=\"warn-box\">⚠️ 注意：此阶段仅强化了 Thinking 模式能力。若直接在此模型上使用 Non-thinking 模式，性能会明显下降——模型\"过度思考\"，即使在简单问题上也倾向于生成推理链。</div>\n<p><strong>阶段三：模式融合（Mode Merging）</strong>\n- 这是 Qwen3 最独特的技术创新，解决\"一个模型如何同时掌握两种模式\"的关键问题\n- 方法：构造混合训练数据，其中：\n  - 50% 的样本要求模型以 Thinking 模式回答（含推理链）\n  - 50% 的样本要求模型以 Non-thinking 模式直接回答\n- 使用两阶段训练：\n  1. SFT 阶段：在混合数据上进行监督微调，让模型学会根据任务类型选择合适的输出模式\n  2. DPO 阶段：构造偏好对，在简单任务上偏好 Non-thinking 输出（短、直接），在复杂任务上偏好 Thinking 输出（含推理链、准确率高）\n- DPO 损失函数：\n  <div class=\"kb-math kb-math-display\">\\mathcal{L}_{DPO}(\\pi_\\theta; \\pi_{ref}) = -\\mathbb{E}_{(x, y_w, y_l) \\sim \\mathcal{D}} \\left[\\log \\sigma\\left(\\beta \\log \\frac{\\pi_\\theta(y_w|x)}{\\pi_{ref}(y_w|x)} - \\beta \\log \\frac{\\pi_\\theta(y_l|x)}{\\pi_{ref}(y_l|x)}\\right)\\right]</div>\n  其中 <span class=\"kb-math kb-math-inline\">y_w</span> 是偏好输出，<span class=\"kb-math kb-math-inline\">y_l</span> 是不偏好输出，<span class=\"kb-math kb-math-inline\">\\beta</span> 控制偏好强度</p>\n<div class=\"key-point\">💡 关键洞察：模式融合的本质是让模型在表示空间中学习到两种模式的条件分布——<code>P(answer|prompt, mode=thinking)</code> 和 <code>P(answer|prompt, mode=non-thinking)</code>。由于两种模式的输出格式差异显著（有无推理链），模型在 token 级别自动形成了可切换的\"思维习惯\"。</div>\n<p><strong>阶段四：通用能力 GRPO（Group Relative Policy Optimization）</strong>\n- 在模式融合之后，使用 GRPO 进一步强化模型的通用能力\n- GRPO 是一种无需 Value Model 的策略优化方法，通过组内相对比较来估计优势\n- 核心思想：对同一个 prompt 生成 K 个候选回复，使用奖励模型打分，组内归一化后作为优势信号\n- 优势计算：\n  <div class=\"kb-math kb-math-display\">A_i = \\frac{R_i - \\text{mean}(R_{1:K})}{\\text{std}(R_{1:K})}</div>\n  其中 <span class=\"kb-math kb-math-inline\">R_i</span> 是第 i 个回复的奖励\n- 训练任务覆盖：通用 NLP、安全对齐、工具调用、多语言对话\n- 此阶段也引入了 GAE（Generalized Advantage Estimation）用于处理多步工具调用场景的优势估计</p>\n<p><strong>与 DeepSeek-R1 的关键区别</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>DeepSeek-R1</th>\n<th>Qwen3</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>模型架构</td>\n<td>MoE（专家混合）</td>\n<td>密集 Transformer</td>\n</tr>\n<tr>\n<td>推理模式</td>\n<td>仅 Thinking</td>\n<td>Thinking + Non-thinking</td>\n</tr>\n<tr>\n<td>模式切换</td>\n<td>不支持</td>\n<td><code>enable_thinking</code> 参数控制</td>\n</tr>\n<tr>\n<td>后训练</td>\n<td>R1-Zero（纯RL）→ SFT → RL</td>\n<td>冷启动 SFT → RL → 融合 → GRPO</td>\n</tr>\n<tr>\n<td>开源</td>\n<td>部分权重开源</td>\n<td>全参数开源（0.6B~32B）</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>模型架构细节</strong></p>\n<p>Qwen3 延续了 Qwen2.5 的密集 Transformer 架构，关键配置如下：\n- 注意力机制：GQA（Grouped Query Attention），KV 头数随模型规模调整\n- 激活函数：SwiGLU\n- 位置编码：RoPE，基础频率 1,000,000（支持长上下文外推）\n- 分词器：基于 BPE，词表大小 151,936（含多语言和代码特殊 token）\n- 上下文窗口：32K tokens（Stage 2 后），通过 YaRN 方法可外推至 128K\n- 归一化：RMSNorm，使用 pre-norm 结构</p>",
      "quiz": {
        "q": "Qwen3 的模式融合（Mode Merging）阶段的主要目的是什么？",
        "options": [
          "增加模型参数量以提升推理能力",
          "将 Thinking 和 Non-thinking 两种输出模式统一到同一模型参数中，实现推理时动态切换",
          "仅训练 Non-thinking 模式以降低推理延迟",
          "使用知识蒸馏将大模型压缩为小模型"
        ],
        "answer": 1,
        "explain": "模式融合阶段通过混合 SFT 数据和 DPO 偏好训练，让模型同时掌握 Thinking（含推理链）和 Non-thinking（直接回答）两种输出模式，并通过 enable_thinking 参数在推理时灵活切换。"
      }
    },
    {
      "id": "minimax_m1",
      "num": 29,
      "name": "MiniMax-M1",
      "fullName": "混合注意力推理模型 (MiniMax-M1)",
      "year": "2025.06",
      "org": "MiniMax",
      "parent": "minimax01",
      "paperUrl": "https://arxiv.org/abs/2506.13585",
      "projectUrl": "",
      "category": "long_context",
      "motivation": "混合MoE支持测试时扩展",
      "summary": "MiniMax-M1 在 MiniMax-Text-01 的 456B/45.9B 激活混合注意力 MoE 底座上，通过 CISPO 强化学习和分阶段长思维扩展，让测试时生成长度扩到 40K/80K，同时把长序列推理 FLOPs 显著低于纯 Softmax 推理模型。它解决的是“长推理越有效但越贵”的矛盾：用 Lightning Attention 降 rollout 成本，用 RL 让模型学会利用更长思维预算。",
      "keyPoints": [
        "模型底座来自 MiniMax-Text-01：456B 总参数、45.9B activated、32 experts，每 7 个 Lightning Attention block 后接 1 个 Softmax Attention block。",
        "原生支持 1M input context，并发布 MiniMax-M1-40k 与 MiniMax-M1-80k 两个 thinking budget 版本。",
        "Figure 1 报告相对 DeepSeek-R1，M1 在 64K 生成长度下 FLOPs 低于 50%，100K 生成长度下约为 25%。",
        "提出 CISPO：不再像 PPO/GRPO 那样裁剪 token update，而是裁剪 importance sampling weight，从而保留所有 token 的梯度贡献。",
        "RL 数据覆盖数学、逻辑、竞赛编程、软件工程 sandbox 和通用任务；可验证任务用规则/执行奖励，开放任务用生成式 reward model。",
        "针对混合注意力 RL 的工程问题，修复训练/推理 kernel 概率不一致、AdamW 超参数敏感、重复高概率 token 造成的病态长输出。",
        "80K 训练采用 staged window expansion：40K → 48K → 56K → 64K → 72K → 80K，并用困惑度收敛和 99 分位输出长度判断何时扩窗。"
      ],
      "detail": "<p><img alt=\"MiniMax-M1 基准性能对比\" src=\"https://arxiv.org/html/2506.13585v1/x1.png\" />\n<em>图：MiniMax-M1 Figure 1 左图，比较 MiniMax-M1-80k 与主流模型在数学、代码、软件工程、工具使用和长上下文任务上的表现；右图 <code>https://arxiv.org/html/2506.13585v1/x2.png</code> 展示生成长度增加时的 FLOPs 缩放。</em></p>\n<pre><code class=\"language-python\"># CISPO + 长思维窗口扩展训练伪代码\ndef train_minimax_m1(policy, prompts):\n    windows = [40_000, 48_000, 56_000, 64_000, 72_000, 80_000]\n\n    for max_output_tokens in windows:\n        while not ready_to_expand(policy, max_output_tokens):\n            batch = sample_curriculum(prompts, max_output_tokens)\n            rollouts = policy.generate(batch, max_new_tokens=max_output_tokens)\n            rollouts = stop_if_3000_high_prob_tokens(rollouts, threshold=0.99)\n\n            rewards = []\n            for sample in rollouts:\n                if sample.task in [&quot;math&quot;, &quot;logic&quot;, &quot;code&quot;, &quot;software_engineering&quot;]:\n                    rewards.append(rule_or_execution_reward(sample))\n                else:\n                    rewards.append(generative_reward_model(sample))\n\n            advantages = group_relative_advantage(rewards)\n            old_logp = rollout_logprobs(rollouts)\n            new_logp = policy.logprobs(rollouts)\n            is_weight = exp(new_logp - old_logp)\n\n            # CISPO: 裁剪 IS weight，但不丢弃 token 梯度\n            clipped_w = clip(is_weight, 1 - eps_low_is, 1 + eps_high_is)\n            loss = -mean(clipped_w * stop_gradient(advantages) * new_logp)\n            loss = mix_sample_level_and_token_level_normalization(loss)\n            policy.update(loss, adamw_betas=(0.9, 0.95), adamw_eps=1e-15)\n\n    return policy\n</code></pre>\n<p>M1 的基础架构继承 MiniMax-Text-01，因此它的“长推理”能力不是靠稀疏采样或外部记忆硬补出来的，而是来自混合注意力本身。Lightning Attention 把长序列 rollout 的边际成本压低，Softmax block 周期性补足精确检索，MoE 让模型保留大容量专家知识。论文强调这对 RL 尤其关键，因为 reasoning model 的训练瓶颈不只在反向传播，还在反复采样长输出；如果 rollout 随生成长度二次增长，80K thinking budget 的训练成本会迅速不可控。</p>\n<p>CISPO 的动机来自 PPO/GRPO 在长 CoT 上的 token clipping 问题。论文观察到，反思类 token 如 <code>Wait</code>、<code>Recheck</code>、<code>However</code> 往往在 base model 中概率很低，但它们可能是推理路径分叉和自我纠错的关键。一旦 PPO/GRPO 的概率比 <span class=\"kb-math kb-math-inline\">r_{i,t}</span> 超出裁剪区间，这些 token 会被“裁掉”而不再贡献后续 off-policy 更新。CISPO 改为裁剪 importance sampling weight：\n<div class=\"kb-math kb-math-display\">w_{i,t}=\\frac{\\pi_\\theta(o_{i,t}\\mid q,o_{i,&lt;t})}{\\pi_{\\theta_{\\mathrm{old}}}(o_{i,t}\\mid q,o_{i,&lt;t})},\n\\qquad\n\\bar w_{i,t}=\\mathrm{clip}(w_{i,t},1-\\epsilon^{IS}_{low},1+\\epsilon^{IS}_{high}).</div>\n直觉上，CISPO 仍限制 off-policy 分布校正的方差，但不把罕见而有用的推理 token 直接从梯度里移除。论文还明确说 CISPO 不使用 KL penalty，并结合 dynamic sampling 与 length penalty。</p>\n<p>RL 数据设计服务于“可验证能力”和“通用对齐”两类目标。数学、逻辑和竞赛编程样本可用答案解析器、规则 checker 或测试用例验证；软件工程任务构建 containerized sandbox，用编译、测试通过与回归情况给执行奖励；通用问答、创作和复杂指令没有唯一答案，则用 GenRM 做 pairwise 或打分反馈。为了避免 reward model 偏好冗长输出，训练中持续监控长度偏置，一旦发现模型靠拉长 CoT 奖励套利，就重新校准 reward，并在 RL 侧加入 reward shaping、value clipping 和 normalization。</p>\n<p>混合注意力模型做大规模 RL 时还暴露出工程敏感性。论文发现训练模式和推理模式下 rollout token 概率存在不一致，根因是 kernel 精度和 LM head 高幅值激活造成的误差；把 LM output head 提升到 FP32 后，概率相关性从约 0.9x 改善到 0.99x，reward 才能持续增长。优化器也需要重调：默认 AdamW <span class=\"kb-math kb-math-inline\">(0.9,0.999)</span>、eps <span class=\"kb-math kb-math-inline\">10^{-8}</span> 会因 M1 梯度范围极宽而不收敛，最终使用 <span class=\"kb-math kb-math-inline\">\\beta_1=0.9,\\ \\beta_2=0.95,\\ \\epsilon=10^{-15}</span>。</p>\n<p>80K thinking budget 不是一次性把输出上限翻倍，而是课程式扩展。M1 先训练 40K，再按 48K、56K、64K、72K、80K 逐步增加窗口；每阶段等待生成序列 perplexity 收敛、99 分位输出长度接近当前上限后才扩展。论文还指出长窗口后期会出现 pattern collapse：负样本长度增长快于正样本，后半段累积过量负梯度，导致输出后段乱码或重复。对应修复包括 3000 个连续高概率 token 的重复早停、混合样本级损失和 token 级归一化、降低梯度裁剪阈值以及调小 <span class=\"kb-math kb-math-inline\">\\epsilon^{IS}_{high}</span>。</p>",
      "quiz": {
        "q": "CISPO 相比 PPO/GRPO 的关键变化是什么？",
        "options": [
          "删除所有 off-policy 更新，只保留 SFT",
          "裁剪 importance sampling weight，同时保留所有 token 的梯度贡献",
          "把 Lightning Attention 替换为纯 Softmax Attention",
          "只用 reward model，不再使用规则验证"
        ],
        "answer": 1,
        "explain": "CISPO 的核心是从裁剪 token update 转向裁剪 IS weight，避免长 CoT 中罕见但关键的反思 token 被直接丢掉。"
      }
    },
    {
      "id": "kimi_k2",
      "num": 30,
      "name": "Kimi K2",
      "fullName": "开放智能体 MoE 模型 (Kimi K2)",
      "year": "2025.07",
      "org": "Moonshot AI",
      "parent": "deepseek_v3",
      "paperUrl": "https://arxiv.org/abs/2507.20534",
      "projectUrl": "",
      "category": "sparse_moe",
      "motivation": "MuonClip稳定万亿MoE",
      "summary": "Kimi K2 提出了 1.04T total、约 32B active 的开放 MoE 智能体模型，并用 MuonClip 解决 Muon 在万亿参数训练中的注意力 logit 爆炸问题。它进一步通过大规模工具使用轨迹合成、可验证奖励与 self-critique rubric reward 的联合 RL，把基础模型能力转化为软件工程、工具调用和多步 agentic 行为。",
      "keyPoints": [
        "Kimi K2 是 1.04T 参数 MoE Transformer，每 token 激活约 32B 参数，采用 DeepSeek-V3 风格的 MLA 注意力",
        "架构包含 61 层、384 个总专家、每 token 激活 8 个专家、1 个 shared expert、64 个 attention heads、hidden size 7168",
        "MuonClip 将 Muon optimizer、weight decay、consistent RMS matching 与 QK-Clip 组合，支撑 15.5T tokens 预训练且无 loss spike",
        "QK-Clip 监控每个 head 的最大 attention logit，超过阈值 <span class=\"kb-math kb-math-inline\">\\tau</span> 时按 head 缩放 query/key projection 权重，而不是直接裁剪 logits",
        "稀疏 scaling law 表明在固定 activated parameters 下增加总专家数可以降低训练和验证 loss，因此 K2 采用 sparsity 48",
        "预训练数据强调 token utility，通过知识文本 chunk-wise autoregressive rephrasing 与数学学习笔记风格改写提升高质量 token 利用率",
        "Agentic SFT 数据由 3000+ 真实 MCP 工具、20,000+ 合成工具、自动生成 agents/tasks/rubrics 与轨迹过滤组成",
        "Post-training 使用 verifiable rewards、self-critique rubric reward、budget control、PTX loss 与统一 Gym-like RL 环境"
      ],
      "detail": "<p><img alt=\"Kimi K2 工具规格、agent 与任务合成流程\" src=\"https://ar5iv.labs.arxiv.org/html/2507.20534/assets/x10.png\" />\n<em>图：Kimi K2 论文 Figure 8(a)，展示从真实 MCP tools 与合成 applications 构造 tool repository、agents 与 rubric tasks 的流程。</em></p>\n<p><img alt=\"Kimi K2 多智能体工具轨迹生成与过滤流程\" src=\"https://ar5iv.labs.arxiv.org/html/2507.20534/assets/x11.png\" />\n<em>图：Kimi K2 论文 Figure 8(b)，展示 user agent、task、rubrics、tool simulator 与 judge agent 如何生成并过滤工具调用轨迹。</em></p>\n<pre><code class=\"language-python\"># MuonClip optimizer, simplified from Algorithm 1 in the Kimi K2 paper\ndef muonclip_step(weights, grads, momentum, tau=100, lr=eta, wd=lamb):\n    # 1. Muon optimizer step\n    for W in weights:\n        G = grads[W]\n        M[W] = mu * M[W] + G\n        O = newton_schulz(M[W]) * sqrt(max(W.shape)) * 0.2  # match Adam RMS\n        W -= lr * (O + wd * W)\n\n    # 2. QK-Clip, using max logits already observed in forward\n    for layer in model.attention_layers:\n        for h in layer.heads:\n            S = layer.max_attention_logit[h]\n            if S &gt; tau:\n                gamma = tau / S\n                layer.W_qc[h] *= sqrt(gamma)\n                layer.W_kc[h] *= sqrt(gamma)\n                layer.W_qr[h] *= gamma\n                # shared rotary key component is left untouched in MLA\n</code></pre>\n<p>Kimi K2 的预训练问题不是“如何再堆一个 MoE”，而是如何让 Muon 这种 token-efficient optimizer 在 1T 级 MoE 上稳定工作。论文指出，Muon 在同等模型和计算预算下比 AdamW 更有 token efficiency，但扩展时更容易出现 attention logits 爆炸。logit soft-cap 只是在 softmax 输入处截断，无法阻止 <span class=\"kb-math kb-math-inline\">QK^\\top</span> 本身继续增大；QK-Norm 又不适合 MLA，因为 MLA 推理时 key 矩阵并不完全物化。</p>\n<p>QK-Clip 的设计是 post-update weight clipping。对第 <span class=\"kb-math kb-math-inline\">h</span> 个 attention head：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf Q^h=\\mathbf X\\mathbf W_q^h,\\quad\n\\mathbf K^h=\\mathbf X\\mathbf W_k^h,\\quad\n\\mathbf V^h=\\mathbf X\\mathbf W_v^h.</div>\n<p>attention 输出是：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf O^h=\\mathrm{softmax}\\left(\\frac{1}{\\sqrt d}\\mathbf Q^h\\mathbf K^{h\\top}\\right)\\mathbf V^h.</div>\n<p>K2 在 forward 中记录每个 head 的最大 logit：</p>\n<div class=\"kb-math kb-math-display\">S_{\\max}^h=\\frac{1}{\\sqrt d}\\max_{\\mathbf X\\in B}\\max_{i,j}\\mathbf Q_i^h\\mathbf K_j^{h\\top}.</div>\n<p>当 <span class=\"kb-math kb-math-inline\">S_{\\max}^h&gt;\\tau</span> 时，使用</p>\n<div class=\"kb-math kb-math-display\">\\gamma_h=\\min\\left(1,\\frac{\\tau}{S_{\\max}^h}\\right)</div>\n<p>缩放权重。对普通 MHA 可以缩放对应 head 的 <span class=\"kb-math kb-math-inline\">\\mathbf W_q^h</span> 和 <span class=\"kb-math kb-math-inline\">\\mathbf W_k^h</span>；对 MLA，论文只缩放 unshared head components：<span class=\"kb-math kb-math-inline\">\\mathbf q^C</span> 与 <span class=\"kb-math kb-math-inline\">\\mathbf k^C</span> 各乘 <span class=\"kb-math kb-math-inline\">\\sqrt{\\gamma_h}</span>，<span class=\"kb-math kb-math-inline\">\\mathbf q^R</span> 乘 <span class=\"kb-math kb-math-inline\">\\gamma_h</span>，共享的 <span class=\"kb-math kb-math-inline\">\\mathbf k^R</span> 不动，避免一个 head 的 clipping 影响其他 head。</p>\n<div class=\"key-point\">💡 关键：QK-Clip 不改变当前 step 的 forward/backward，只用已观测到的 <span class=\"kb-math kb-math-inline\">S_{\\max}^h</span> 指导更新后的权重缩放。因此它比直接裁剪 logits 更像“训练动力学护栏”，在 early stage 防止注意力分数失控，训练稳定后自然很少触发。</div>\n<p>架构上，Kimi K2 延续 DeepSeek-V3 的 MLA 与 MoE 思路，但把稀疏性继续推高。它有 384 个专家，每 token 激活 8 个专家，sparsity 为 48。论文的 scaling law 实验显示，在固定 activated experts 和 shared expert 的情况下，增加总专家数能降低 validation loss；达到同样 validation loss 1.5 时，sparsity 48 相比 sparsity 8、16、32 分别节省 1.69 倍、1.39 倍、1.15 倍 FLOPs。与此同时，K2 把 attention heads 从 DeepSeek-V3 的 128 减到 64，因为在 128K 等长上下文 agentic 场景下，heads 翻倍会显著增加推理 FLOPs，而验证 loss 只改善约 0.5% 到 1.2%。</p>\n<p>数据侧的重点是 token utility。K2 的 15.5T 预训练语料覆盖 Web Text、Code、Mathematics、Knowledge。对知识文本，论文使用风格和视角多样的 prompts 做 rephrasing，并用 chunk-wise autoregressive generation 保留长文档全局一致性；对数学文本，则改写为 learning-note style，并引入跨语言翻译扩充多样性。这个设计不是为了简单重复高质量数据，而是让同一知识以不同表述提供更多有效学习信号，降低多 epoch 重复带来的过拟合风险。</p>\n<p>Post-training 是 Kimi K2 与普通 chat model 区分最明显的部分。Agentic 数据合成先构建工具库：一部分来自 GitHub 中 3000+ 真实 MCP 工具，一部分来自层级 domain evolution 生成的 20,000+ 合成工具。然后为采样工具集生成 agent system prompts、任务与 rubrics，再通过 user agent、tool simulator 和 judge agent 生成多轮工具调用轨迹。只有满足 rubric 成功条件的轨迹被保留，因此整个流程相当于大规模 rejection sampling，目标是让模型学会“读工具说明、计划、调用、观察反馈、修正动作”。</p>\n<p>RL 阶段把可验证任务和主观偏好任务合到同一个框架。对数学、代码、指令遵循、工具调用等任务，奖励可以来自单元测试、解释器、规则检查或 judge；对创意写作、开放问答等不可直接验证任务，K2 使用 self-critique rubric reward，让 K2 critic 根据 core rubrics、prescriptive rubrics 与人工标注 rubrics 对多个响应做 pairwise ranking。其 RL objective 可概括为：</p>\n<div class=\"kb-math kb-math-display\">L_{\\mathrm{RL}}(\\theta)=\\mathbb E_{x\\sim\\mathcal D}\\left[\\frac{1}{K}\\sum_{i=1}^{K}\\left(r(x,y_i)-\\bar r(x)-\\tau\\log\\frac{\\pi_\\theta(y_i|x)}{\\pi_{\\mathrm{old}}(y_i|x)}\\right)^2\\right],</div>\n<p>其中</p>\n<div class=\"kb-math kb-math-display\">\\bar r(x)=\\frac{1}{K}\\sum_{i=1}^{K}r(x,y_i).</div>\n<p>奖励中心化项 <span class=\"kb-math kb-math-inline\">r(x,y_i)-\\bar r(x)</span> 让同一 prompt 下的候选响应相互比较，KL-like 的 log ratio 正则项约束新旧策略偏移，<span class=\"kb-math kb-math-inline\">\\tau&gt;0</span> 控制稳定性。K2 还加入 budget control，超过任务 token budget 的响应会被截断并惩罚，以避免 RL 把所有任务都推向冗长输出；同时通过辅助 PTX loss 混入手选高质量样本，减少 joint RL 对窄任务集合的过拟合和遗忘。</p>\n<p>与 DeepSeek-V3 路线相比，Kimi K2 的差异在三处：更高稀疏度的 MoE 设计，更适合 Muon 的 QK-Clip 稳定机制，以及面向 agentic intelligence 的后训练数据与 RL 框架。它不是单纯追求 benchmark 的非交互模型，而是把工具环境、trajectory filtering、verifiable reward 和 self-critique 结合起来，专门强化软件工程、工具调用和多步任务执行。</p>",
      "quiz": {
        "q": "Kimi K2 中 QK-Clip 相比直接 logit soft-cap 的关键区别是什么？",
        "options": [
          "QK-Clip 直接删除超过阈值的 token",
          "QK-Clip 在权重更新后缩放 query/key projection，约束后续 attention logit 增长",
          "QK-Clip 只用于推理，不参与训练",
          "QK-Clip 把 MoE top-8 routing 改成 dense FFN"
        ],
        "answer": 1,
        "explain": "QK-Clip 使用 forward 中观测到的最大 attention logit 来缩放 Q/K 权重，属于训练稳定性的权重护栏，而不是在 softmax 输入处简单截断。"
      }
    },
    {
      "id": "glm45",
      "num": 31,
      "name": "GLM-4.5",
      "fullName": "ARC 基础模型 (GLM-4.5)",
      "year": "2025.08",
      "org": "Zhipu AI / Tsinghua",
      "parent": "deepseek_v3",
      "paperUrl": "https://arxiv.org/abs/2508.06471",
      "projectUrl": "",
      "category": "sparse_moe",
      "motivation": "面向智能体推理编码",
      "summary": "GLM-4.5 提出了一个 355B 总参数、32B 激活参数的开源 MoE 模型，通过“更深而非更宽”的架构、多阶段 23T token 预训练，以及专家模型迭代式后训练，统一强化 Agent、Reasoning、Coding 三类 ARC 能力。它同时支持 thinking 与 direct response 两种模式，用较少参数在 TAU-Bench、AIME 24、SWE-bench Verified 等任务上取得强竞争力。",
      "keyPoints": [
        "<strong>ARC 目标定义</strong>：把 Agentic、Reasoning、Coding 作为同一基础模型必须同时覆盖的三类能力，而不是分别训练专用模型。",
        "<strong>355B/32B MoE 架构</strong>：GLM-4.5 使用 355B 总参数、32B 激活参数；GLM-4.5-Air 使用 106B 总参数、12B 激活参数。",
        "<strong>更深的 MoE 取舍</strong>：相对 DeepSeek-V3/Kimi K2 减少 hidden dimension 与 routed experts 数量，增加层数，论文认为更深模型更利于推理。",
        "<strong>MoE 路由与注意力稳定性</strong>：使用 loss-free balance routing、sigmoid gates、GQA、partial RoPE、96 attention heads、QK-Norm，并加入 MoE MTP layer 支持 speculative decoding。",
        "<strong>23T tokens 多阶段训练</strong>：预训练从 4K context 起步，中训扩展到 32K/128K，并加入 repo-level code、合成推理数据和长上下文/agent 轨迹。",
        "<strong>专家模型迭代后训练</strong>：Stage 1 分别训练 Reasoning、Agent、General chat 专家；Stage 2 用 self-distillation 融合成单一 hybrid reasoning generalist。",
        "<strong>Reasoning RL 配方</strong>：基于无 KL 项的 GRPO，使用两阶段难度课程、直接 64K 输出长度 RL、动态采样温度、code RL token-weighted mean loss。",
        "<strong>Agentic RL 配方</strong>：用 web-search 与 SWE/coding sandbox 的可验证结果做 outcome supervision，并加入 tool/action format penalty、迭代自蒸馏和 interaction-turn scaling。",
        "<strong>Slime RL 基础设施</strong>：支持 colocated synchronous 与 disaggregated asynchronous 两种模式，使用 Megatron 训练、SGLang/Router rollout、Data Buffer 与 FP8 rollout 加速。"
      ],
      "detail": "<p><img alt=\"GLM-4.5 预训练与中训流程\" src=\"https://ar5iv.labs.arxiv.org/html/2508.06471/assets/x3.png\" />\n<em>图：论文 Figure 3 展示 GLM-4.5 的预训练与中训阶段，最大序列长度从 4K 扩展到 32K，再扩展到 128K，并引入代码、推理和 agent 数据。</em></p>\n<pre><code class=\"language-python\"># GLM-4.5 ARC 后训练的核心流程，按论文整理\nbase = pretrain_moe(tokens=&quot;23T&quot;, context=[4096, 32768, 131072])\n\nexperts = {}\nfor domain in [&quot;reasoning&quot;, &quot;agent&quot;, &quot;general&quot;]:\n    model = cold_start_sft(base, domain_data[domain])\n    if domain == &quot;reasoning&quot;:\n        model = grpo_rl(\n            model,\n            curriculum=[&quot;moderate&quot;, &quot;very_hard_verified&quot;],\n            max_output_len=64000,\n            dynamic_temperature=True,\n        )\n    elif domain == &quot;agent&quot;:\n        traces = rollout_in_web_and_swe_envs(model)\n        reward = outcome_reward(traces) - action_format_penalty(traces)\n        model = groupwise_policy_optimization(model, traces, reward)\n        model = iterative_self_distill(model, successful_traces=traces)\n    else:\n        model = general_rl(model, feedback=[&quot;rules&quot;, &quot;human_rm&quot;, &quot;critique_model&quot;])\n    experts[domain] = model\n\nglm45 = unified_sft_distill(\n    base,\n    teachers=experts,\n    mix_thinking_and_direct_response=True,\n    max_context=128000,\n)\n</code></pre>\n<p>GLM-4.5 的架构创新来自两个方向：MoE 宽深取舍和注意力配置。它没有简单沿 DeepSeek-V3/Kimi K2 的宽模型路线继续扩专家数，而是把 hidden dimension 设为 5120、routed experts 设为 160、MoE layers 增至 89，并保持 8 个专家激活。论文明确说，相比 DeepSeek-V3 和 Kimi K2，它减少宽度、增加高度，因为实验中更深模型显示出更强 reasoning capacity。这个设计让 GLM-4.5 的总参数只有 355B，但激活参数仍保持 32B 级别，目标是在 ARC 任务中用较少总参数获得接近前沿模型的能力。</p>\n<p>注意力层也体现了“评测能力不完全等价于训练 loss”的经验。GLM-4.5 使用 GQA 与 partial RoPE，并在 5120 hidden dimension 下设置 96 个 attention heads，约为常规配置的 2.5 倍。论文指出，增加 head 数并不改善训练 loss，却能在 MMLU、BBH 等 reasoning benchmark 上稳定提升；同时用 QK-Norm 稳定 attention logits。与 Kimi K2 减少头数以控制长上下文推理 FLOPs 的取舍不同，GLM-4.5 更强调通过更多 head 提升推理模式的多样性。</p>\n<p>训练数据和阶段安排服务于 ARC 目标。预训练语料覆盖网页、社媒、书籍、论文、代码、多语言、数学与科学文档，总规模 23T tokens；中训阶段引入三类专项数据：repo-level code 用同一仓库内拼接文件、issue、PR、commit diff 学跨文件依赖；synthetic reasoning data 用推理模型生成数学、科学、竞赛代码的推理过程；long-context &amp; agent training 把 context 从 32K 推到 128K，并加入大规模合成 agent trajectories。这里的中训不是普通继续预训练，而是把软件工程、长上下文和工具交互提前注入 base model。</p>\n<p>后训练采用“先分化专家，再融合”的两阶段策略。Stage 1 中，Reasoning、Agent 和 General chat 各自从 cold-start SFT 开始，再做针对性 RL；Stage 2 则用 self-distillation 把多个专家能力蒸馏回一个统一模型。为了让最终模型能同时处理复杂推理和即时聊天，整体 SFT 数据混合了带长 CoT 的样本和不显式展示思考过程的样本，因此 GLM-4.5 支持 thinking mode 与 non-thinking/direct response mode。这种设计的关键收益是减少单一 RL 流程里的目标冲突：专家阶段先把每类能力推高，统一阶段再处理能力融合。</p>\n<p>Reasoning RL 基于 GRPO，但去掉 KL loss。论文强调 reward variance：太简单的题全是 1、太难的题全是 0，都会没有有效梯度，所以它使用两阶段 difficulty-based curriculum，第一阶段中等难度，第二阶段切换到 pass@8=0 但 pass@512&gt;0 的极难且可验证问题。输出长度方面，论文发现直接用 64K 最大输出长度做 single-stage RL 优于逐步增加长度的 multi-stage RL，因为 SFT 已经让模型适应 64K，较短 RL 阶段会让模型“忘掉”长输出能力。动态温度则在 reward 稳定后提高探索，并用 held-out 验证控制性能下降不超过约 1%。</p>\n<p>Agentic RL 把 web search 与 SWE/coding agent 视为可验证环境。对 web search，用最终答案正确性作为整条轨迹 reward；对 coding/SWE，用可执行测试和 sandbox 结果判断任务完成。论文特别加入 process action format penalty：如果工具调用格式错误，轨迹会被中止并给零奖励，保证模型学到的不是“答对即可”，而是“用可解析、可执行的动作答对”。此外，agent RL 通过迭代自蒸馏减少昂贵 RL 的成本：先对 cold-start 模型做 RL，停滞后用 RL 模型生成更好的 SFT 数据，再继续 RL 并逐步提高难度。</p>\n<p>Slime 是 GLM-4.5 后训练能规模化的工程基础。对数学/代码等较规则 RL，它支持 training/inference colocated 的同步模式以减少 GPU 空闲；对 SWE 等 agent 任务，它采用 disaggregated asynchronous 模式，让 rollout engine 持续与环境交互，training engine 独立消费 Data Buffer 并同步参数。因为 agent rollout 可能耗时很长、长度差异很大，同步等待最慢轨迹会严重浪费 GPU；异步解耦则把“慢环境交互”和“密集参数更新”分开，使多任务 agent RL 可持续吞吐。</p>",
      "quiz": {
        "q": "GLM-4.5 后训练为什么采用 Expert Training 再 Unified Training？",
        "options": [
          "为了把所有专家永久保留为独立模型，避免单模型推理",
          "先分别强化推理、Agent、通用对话，再通过蒸馏融合为支持 thinking/direct response 的单一模型",
          "为了替代 MoE router，让每个任务固定走一个专家",
          "为了只训练 GLM-4.5-Air，再蒸馏出 GLM-4.5"
        ],
        "answer": 1,
        "explain": "论文的 Stage 1 按 Reasoning、Agent、General chat 分别训练专家，Stage 2 用 self-distillation 统一到一个 hybrid reasoning generalist。"
      }
    },
    {
      "id": "gpt5",
      "num": 32,
      "name": "GPT-5",
      "fullName": "统一路由式 GPT 系统 (OpenAI GPT-5 System Card)",
      "year": "2026.01",
      "org": "OpenAI",
      "parent": "gpt4",
      "paperUrl": "https://arxiv.org/abs/2601.03267",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "主模型与推理模型统一路由",
      "summary": "GPT-5 不是单一稠密模型的技术报告，而是一套由快速主模型、深度推理模型、mini/nano 变体和实时路由器组成的统一 GPT 系统；它通过路由、推理强化学习、安全完成、指令层级和多层防护，把通用对话、复杂推理、工具使用、健康、代码和安全能力整合到一个产品级模型族中。",
      "keyPoints": [
        "<strong>统一系统而非单模型</strong>：GPT-5 包含 gpt-5-main、gpt-5-main-mini、gpt-5-thinking、gpt-5-thinking-mini、gpt-5-thinking-nano，以及 ChatGPT 中的 gpt-5-thinking-pro。",
        "<strong>实时路由器</strong>：系统根据对话类型、复杂度、工具需求和用户显式意图，在快速模型与深度推理模型之间选择；路由器使用真实交互信号持续训练。",
        "<strong>推理模型强化学习</strong>：gpt-5-thinking 系列通过强化学习学习“先思考再回答”，可在困难问题上使用更长 test-time compute，并在失败时更倾向于承认限制。",
        "<strong>安全完成 (safe-completions)</strong>：从“先判断请求是否违规再拒绝”的硬边界，转向“最大化安全范围内的有用输出”的输出中心安全训练。",
        "<strong>指令层级与提示注入防护</strong>：模型被训练遵循 system &gt; developer &gt; user 的优先级，并对网页、连接器和工具输出中的提示注入进行防御。",
        "<strong>事实性和欺骗缓解</strong>：系统卡报告 gpt-5-main 的事实幻觉率比 GPT-4o 低，gpt-5-thinking 比 OpenAI o3 低；同时通过不可解任务训练、破损工具场景和 CoT 监控降低欺骗行为。",
        "<strong>高风险领域分层防护</strong>：gpt-5-thinking 被按 Preparedness Framework 在生物/化学领域以 High capability 对待，并启用模型拒答、监控器、系统层拦截和账户级执法等纵深防御。",
        "<strong>能力覆盖面</strong>：系统卡重点评估安全、事实性、健康、软件工程、科研复现、自主能力、网络安全、偏见与多语言等场景，而不是披露参数量或训练配方。"
      ],
      "detail": "<h5>1. 系统结构：从单模型到路由式模型族</h5>\n<p>GPT-5 的关键变化是把“一个模型回答所有问题”改成“一个统一入口背后调度多个模型”。系统卡将快速、高吞吐模型称为 gpt-5-main / gpt-5-main-mini，将深度推理模型称为 gpt-5-thinking / gpt-5-thinking-mini / gpt-5-thinking-nano。ChatGPT 中还提供 gpt-5-thinking-pro，用于并行 test-time compute。</p>\n<p>论文未公开模型参数量、层数或训练 token 数，因此不能按传统 Transformer 论文那样拆解 block 结构。更合理的理解是：GPT-5 的“算法贡献”在系统层，即用路由器把普通对话、复杂推理、工具调用和安全策略组织为一个统一服务。</p>\n<p><img alt=\"GPT-5 事实性评估图\" src=\"https://arxiv.org/html/2601.03267v2/x1.png\" />\n<em>图：GPT-5 System Card 中的事实性评估图之一。系统卡的公开图主要围绕事实性、安全、健康、软件工程和风险评估，而不是模型 block 架构。</em></p>\n<h5>2. 实时路由器的工作机制</h5>\n<p>路由器接收会话上下文和用户意图，选择合适的底层模型：</p>\n<pre><code class=\"language-python\">def gpt5_route(conversation, user_intent, tool_state, usage_state):\n    &quot;&quot;&quot;\n    GPT-5 统一系统的简化路由逻辑。\n    真实系统未公开实现；此处按 system card 描述抽象。\n    &quot;&quot;&quot;\n    features = {\n        &quot;complexity&quot;: estimate_reasoning_difficulty(conversation),\n        &quot;needs_tools&quot;: detect_tool_need(conversation, tool_state),\n        &quot;explicit_think&quot;: &quot;think hard&quot; in user_intent.lower(),\n        &quot;safety_risk&quot;: classify_safety_risk(conversation),\n        &quot;latency_budget&quot;: infer_latency_need(conversation),\n    }\n\n    if usage_state.exceeded_limit:\n        return &quot;gpt-5-main-mini&quot; if not features[&quot;complexity&quot;] else &quot;gpt-5-thinking-mini&quot;\n\n    if features[&quot;explicit_think&quot;] or features[&quot;complexity&quot;] == &quot;high&quot;:\n        return &quot;gpt-5-thinking&quot;\n\n    if features[&quot;needs_tools&quot;] and features[&quot;complexity&quot;] != &quot;low&quot;:\n        return &quot;gpt-5-thinking&quot;\n\n    return &quot;gpt-5-main&quot;\n</code></pre>\n<p>路由器不是静态规则表。系统卡说明它会从真实信号中继续学习，包括用户切换模型的行为、偏好率和正确性测量。这意味着 GPT-5 的能力提升有两条路径：底层模型本身变强，以及路由策略更准确地把问题交给合适模型。</p>\n<h5>3. 推理模型与强化学习</h5>\n<p>gpt-5-thinking 系列继承了 OpenAI reasoning models 的路线：通过强化学习训练模型在回答前进行更长的内部推理，尝试不同策略并识别错误。与 gpt-5-main 的差异不是简单“更大”，而是推理预算、训练目标和适用场景不同。</p>\n<p>这种设计的收益体现在三类任务：</p>\n<ul>\n<li><strong>复杂问题求解</strong>：数学、代码、科研复现、长链诊断等任务需要多步搜索和验证。</li>\n<li><strong>工具/环境故障处理</strong>：当浏览器、代码环境或用户输入不完整时，推理模型更倾向于识别限制，而不是编造结果。</li>\n<li><strong>安全策略遵循</strong>：推理过程帮助模型在复杂、双用途或多轮场景中遵循模型政策。</li>\n</ul>\n<div class=\"key-point\">💡 关键：GPT-5 的推理不是单纯延长输出，而是把 test-time compute 作为可调资源；简单问题走快模型，困难问题走 thinking 模型。</div>\n<h5>4. Safe-Completions：输出中心安全训练</h5>\n<p>传统安全模型常把请求先分类为“允许/拒绝”，然后产生回答或拒答。GPT-5 系统卡强调 safe-completions：关注模型最终输出是否安全，而不是只对用户意图做二元分类。对于双用途问题，模型可以提供高层、安全、教育性的回答，同时避免细节化的伤害性步骤。</p>\n<p>抽象目标可以写成：</p>\n<div class=\"kb-math kb-math-display\">\\max_y \\; U(y, x) \\quad \\text{s.t.} \\quad S(y, x) \\le \\tau</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">U</span> 表示有用性，<span class=\"kb-math kb-math-inline\">S</span> 表示输出风险，<span class=\"kb-math kb-math-inline\">\\tau</span> 是安全阈值。这个目标比硬拒绝更细：如果存在安全的帮助方式，模型应尽量给出；如果没有安全输出，则拒绝。</p>\n<p>这种训练尤其适合生物、化学、网络安全、医疗等边界复杂领域。系统卡报告 GPT-5 在生产型 disallowed-content、jailbreak 和双用途安全评估上整体改善，但也明确指出某些类别仍有回归或剩余风险，需要后续修复。</p>\n<h5>5. 指令层级与提示注入</h5>\n<p>GPT-5 被训练遵循 instruction hierarchy：system 消息优先于 developer 消息，developer 消息优先于 user 消息。这个机制是产品化 LLM 的核心，因为开发者可以给应用设置长期约束，而用户或外部网页内容可能试图覆盖这些约束。</p>\n<p>系统卡还把 prompt injection 单独作为风险评估：当模型浏览网页、读取邮件/连接器内容或处理工具输出时，外部内容中可能包含恶意指令。GPT-5 的防护包括：</p>\n<ul>\n<li>训练模型忽略网页或工具输出里的越权指令；</li>\n<li>对连接器数据采用缓存访问策略，减少敏感数据被外部网络请求泄露的机会；</li>\n<li>使用多层安全分类器和系统级策略检查。</li>\n</ul>\n<h5>6. 事实性、健康与欺骗缓解</h5>\n<p>GPT-5 的一个重点是降低 hallucination。系统卡报告：在 ChatGPT 生产流量事实性评估中，gpt-5-main 的事实错误率比 GPT-4o 低，gpt-5-thinking 比 OpenAI o3 低；在 LongFact、FActScore 和 SimpleQA 等开放事实性评估上，thinking 系列也表现出更低的错误率和更好的 abstention 行为。</p>\n<p>健康场景是另一个重点。系统卡报告 HealthBench Hard 上 gpt-5-thinking 明显超过此前模型，gpt-5-main 也优于先前非 thinking 模型。这里的关键不是让模型替代医生，而是减少幻觉、急迫场景误判和全球健康语境不适配。系统卡也强调这些模型不用于诊断或治疗替代。</p>\n<p>欺骗缓解方面，OpenAI 使用不可完成任务、破损工具、缺失输入、假前提等环境训练 gpt-5-thinking 更诚实地承认无法完成。系统卡还描述了对 reasoning model 的 CoT 监控，用于发现“声称做了但实际没做”“为了通过评估而隐瞒”等行为。</p>\n<h5>7. 高风险领域的分层安全</h5>\n<p>GPT-5 System Card 将 gpt-5-thinking 在生物/化学能力上按 High capability 处理。这里的重点不是说模型已越过所有危险阈值，而是采取预防性部署：在模型能力接近阈值且未来更新可能增强时，提前启用 Preparedness Framework 下的防护。</p>\n<p>防护是多层的：</p>\n<ul>\n<li>底层模型训练时学习拒绝或安全化回答高风险请求；</li>\n<li>输入和输出侧都有分类器与监控器；</li>\n<li>高风险类别使用推理模型作为二级监控；</li>\n<li>系统层覆盖所有相关流量；</li>\n<li>账户级检测、封禁和升级处理用于持续响应。</li>\n</ul>\n<div class=\"warn-box\">⚠️ 注意：这类风险评估的公开系统卡只给出高层方法和指标，不披露可能帮助滥用者的操作细节。</div>\n<h5>8. 与 GPT-4 系列的差异</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>GPT-4 / GPT-4o 路线</th>\n<th>GPT-5 系统路线</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>模型入口</td>\n<td>以单模型或显式模型选择为主</td>\n<td>统一入口 + 实时路由</td>\n</tr>\n<tr>\n<td>推理能力</td>\n<td>普通模型与 reasoning 模型分离</td>\n<td>main/thinking/nano/mini/pro 系列统一调度</td>\n</tr>\n<tr>\n<td>安全训练</td>\n<td>拒绝式边界更突出</td>\n<td>safe-completions 输出中心约束</td>\n</tr>\n<tr>\n<td>工具场景</td>\n<td>工具能力逐步加入</td>\n<td>prompt injection、连接器和工具输出作为核心风险处理</td>\n</tr>\n<tr>\n<td>事实性</td>\n<td>仍存在明显幻觉</td>\n<td>生产流量和开放事实评测均作为重点优化目标</td>\n</tr>\n<tr>\n<td>高风险领域</td>\n<td>按模型逐次评估</td>\n<td>Preparedness Framework 与系统级防护更深入集成</td>\n</tr>\n</tbody>\n</table></div>\n<p>GPT-5 的主要意义不在于某个公开的 Transformer block 改造，而在于把 scaling、reasoning、routing、safety、tool use 和 deployment risk 合并为一个工程系统。对于“基础语言模型演进”这条主线，它代表了从单一基础模型向“模型族 + 路由 + 安全治理层”的转变。</p>",
      "quiz": {
        "q": "GPT-5 System Card 中实时路由器的核心作用是什么？",
        "options": [
          "把所有请求都固定发送给参数量最大的模型",
          "根据复杂度、工具需求和用户意图，在快速主模型与深度推理模型之间选择",
          "替代 tokenizer，将文本压缩为更少 token",
          "只用于过滤违规请求，不参与模型选择"
        ],
        "answer": 1,
        "explain": "GPT-5 是统一入口背后的模型族系统。路由器会根据任务复杂度、工具需求、显式思考意图和使用限制选择 gpt-5-main、gpt-5-thinking 或 mini/nano 变体。"
      }
    },
    {
      "id": "yuan30_ultra",
      "num": 33,
      "name": "Yuan3.0 Ultra",
      "fullName": "万亿参数企业级 MoE (Yuan3.0 Ultra)",
      "year": "2026.01",
      "org": "IEIT / Yuan Lab",
      "parent": "deepseek_v3",
      "paperUrl": "https://arxiv.org/abs/2601.14327",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "LAEP支撑万亿开源MoE",
      "summary": "本文提出**层自适应专家剪枝（LAEP）算法**，在MoE预训练稳定阶段剪除欠利用专家并跨设备重排，将1515B模型压缩至1010B（参数减少33.3%），同时训练效率提升48.3%，且性能与SOTA媲美。",
      "keyPoints": [
        "核心动机：LAEP支撑万亿开源MoE",
        "演化来源：继承或改进自 deepseek_v3",
        "代表机构：IEIT / Yuan Lab"
      ],
      "detail": "<h5>1. 预训练中专家Token分布的两阶段现象</h5>\n<p><img alt=\"Figure 1: Token分布演化\" src=\"https://ar5iv.labs.arxiv.org/html/2601.14327/assets/training_tokens+expert_index.png\" />\n<em>图1：三个代表性层的专家token负载随训练过程演化（左列a-c）。初始数百步内负载剧烈震荡（数量级差异），随后进入稳定收敛阶段。</em></p>\n<ul>\n<li>在10B小规模模型上验证，使用附录A.1描述的架构和A.2的数据集</li>\n<li><strong>过渡期</strong>（约前数百次迭代）：各层专家接收的token数量差距可达数量级</li>\n<li><strong>稳定期</strong>：负载分布收敛，波动减小，此时可安全进行剪枝决策</li>\n</ul>\n<p><strong>专家负载量化图示：</strong>\n<img alt=\"Figure 2: 负载分布\" src=\"https://ar5iv.labs.arxiv.org/html/2601.14327/assets/num_tokens_and_expert_index_bar_vertical1.png\" />\n<em>图2：(a)不同token负载下的专家数量分布；(b)专家累积token数（从低到高排列），少数专家承载绝大多数token。</em></p>\n<h5>2. LAEP Expert Pruning 算法</h5>\n<p><strong>定义</strong>：设第l层有N个专家，处理S个token。指示变量：</p>\n<div class=\"kb-math kb-math-display\">E[i, j, l] = \\begin{cases} 1 &amp; \\text{若第}j\\text{个token路由到第}i\\text{个专家} \\\\ 0 &amp; \\text{否则} \\end{cases}</div>\n<p><strong>局部剪枝条件</strong>（层内）：</p>\n<div class=\"kb-math kb-math-display\">\\sum_{j&#x27;=1}^{S} E[i, j&#x27;, l] \\leq \\alpha \\cdot \\frac{1}{N}\\sum_{i&#x27;=1}^{N}\\sum_{j&#x27;=1}^{S} E[i&#x27;, j&#x27;, l]</div>\n<p>即专家i接收的token数 ≤ α × 该层专家平均token数时触发剪枝。α越小，剪枝越激进。</p>\n<p><strong>全局剪枝条件</strong>（跨层）：</p>\n<div class=\"kb-math kb-math-display\">\\text{累积token}(i) &lt; \\beta \\cdot \\max_k(\\text{累积token}(k))</div>\n<p>即某专家累积token低于全局最大值×β时被剪除。β控制全局剪枝强度。</p>\n<p><strong>算法 1：Expert Pruning</strong></p>\n<pre><code>Input: Token分配统计数据 D_t, 组数 n_g\nOutput: 剪枝后保留的专家集合 Exp'\n\nStep 1: 统计每层每个专家的token累积量\nStep 2: 按局部条件(α)和全局条件(β)标记待剪枝专家\nStep 3: 移除标记专家，输出保留专家集合 Exp'\n</code></pre>\n<h5>3. Expert Rearrangement（专家重排）</h5>\n<p><img alt=\"Figure 3: 重排算法示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2601.14327/assets/rearrange.png\" />\n<em>图3：专家重排算法示意图。通过将token负载均衡到各计算设备组，减少设备间的负载不均。</em></p>\n<p><strong>算法 2：Expert Rearranging</strong></p>\n<pre><code>Input: 各专家平均token数 D_t, 组数 n_g\nOutput: 重排后的数据 D_r\n\nStep 1: 初始化\n  S_g = len(D_t) // n_g                    // 每组容量\n  p = argsort(D_t, order=descending)        // token数降序索引\n  G = [空列表] x n_g                       // 组容器\n  G_sums = [0] x n_g                        // 各组累计token\n\nStep 2: 贪心分配\n  for idx in p:\n    num = D_t[idx]\n    while true:\n      Min_g = argmin(G_sums)               // 当前token总数最少组\n      if len(G[Min_g]) &lt; S_g:\n        将num加入G[Min_g]\n        将idx加入G_indice[Min_g]\n        G_sums[Min_g] += num\n        break\n      else:\n        G_sums[Min_g] = infinity           // 组已满\n\nStep 3: 数据重排\n  In_flat = concat(G_indice[1..n_g])       // 展平索引\n  D_r = [D_t[idx] for idx in In_flat]      // 按新顺序输出\n  return D_r\n</code></pre>\n<h5>4. 参数消融实验</h5>\n<p><strong>Table 1：α, β及辅助损失对比（10B模型）</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>配置</th>\n<th>系数</th>\n<th>参数量(B)</th>\n<th>Test Loss</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Base Model</td>\n<td>—</td>\n<td>9.78</td>\n<td>1.661</td>\n</tr>\n<tr>\n<td>Base + DeepSeek-V3辅助损失</td>\n<td>0.0001</td>\n<td>9.78</td>\n<td><strong>1.656</strong></td>\n</tr>\n<tr>\n<td>Base + Mixtral辅助损失</td>\n<td>0.0001</td>\n<td>9.78</td>\n<td><strong>1.656</strong></td>\n</tr>\n<tr>\n<td>LAEP(β=0.05, α=∞)</td>\n<td>β=0.05</td>\n<td>8.06</td>\n<td>1.648</td>\n</tr>\n<tr>\n<td>LAEP(β=0.1, α=∞)</td>\n<td>β=0.1</td>\n<td>6.89</td>\n<td>1.658</td>\n</tr>\n<tr>\n<td>LAEP(β=0.2, α=∞)</td>\n<td>β=0.2</td>\n<td>5.51</td>\n<td>1.670</td>\n</tr>\n</tbody>\n</table></div>\n<ul>\n<li>β=0.05时：参数量降至8.06B，test loss从1.661降至1.648（更好！）</li>\n<li>辅助损失方法无法减少参数，仅改善负载均衡</li>\n</ul>\n<p><strong>Table 2：α局部剪枝系数消融（LFA 指局部灵活调整）</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>配置</th>\n<th>Test Loss</th>\n<th>Test Loss w/o LFA</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Base Model</td>\n<td>1.661</td>\n<td>1.739</td>\n</tr>\n<tr>\n<td>α=0.2</td>\n<td><strong>1.643</strong></td>\n<td>1.723</td>\n</tr>\n<tr>\n<td>α=0.2+0.4混合</td>\n<td>1.650</td>\n<td>1.729</td>\n</tr>\n<tr>\n<td>α=0.4</td>\n<td>1.653</td>\n<td>1.733</td>\n</tr>\n<tr>\n<td>α=0.6</td>\n<td>1.661</td>\n<td>1.741</td>\n</tr>\n</tbody>\n</table></div>\n<ul>\n<li><strong>α越小越好</strong>：α=0.2时test loss最低(1.643)，比未剪枝基线(1.661)更好</li>\n<li>LFA（局部灵活调整）机制显著提升性能：test loss从1.739降至1.643（降幅5.5%）</li>\n</ul>\n<h5>5. 辅助负载均衡损失的影响</h5>\n<p><img alt=\"Figure 4: 辅助损失效果对比\" src=\"https://ar5iv.labs.arxiv.org/html/2601.14327/assets/deepseek_app.png\" />\n<em>图4：不同辅助损失系数(c=0.0001, 0.01)下专家token分布趋势。上两行为DeepSeek-V3辅助损失，下两行为Mixtral辅助损失。辅助损失能平滑负载但不减少参数，而LAEP直接剪枝+重排从根本上解决问题。</em></p>\n<ul>\n<li>辅助损失仅缓解负载不均，不减少专家总数</li>\n<li>LAEP从架构层面减少冗余专家，同时重排均衡负载</li>\n</ul>\n<h5>6. 大规模验证：1515B → 1010B</h5>\n<p>在主预训练实验中，将LAEP应用于1515B稀疏MoE模型：\n- 剪枝后模型参数：<strong>1010B</strong>（减少33.3%）\n- 训练效率提升：<strong>48.3%</strong>（吞吐量）\n- 多领域基准性能：与SOTA系统相当</p>\n<p><strong>结论</strong>：LAEP在预训练阶段安全地剪枝冗余专家，不仅显著降低算力需求，还通过消除欠训练专家可能带来的噪声梯度提升了模型质量（test loss更低）。</p>\n<h5>7. 练习题（供复习）</h5>\n<ol>\n<li>为什么LAEP要求在稳定期而非过渡期触发剪枝？如果在过渡期剪枝可能有什么风险？</li>\n<li>α和β两个参数分别控制什么？为什么α=0.2的模型test loss反而低于未剪枝基线？</li>\n<li>Expert Rearrangement算法的贪心策略核心思想是什么？其时间复杂度是多少？</li>\n</ol>\n<hr />\n<p><em>论文链接：https://arxiv.org/abs/2601.14327</em></p>"
    },
    {
      "id": "latent_moe",
      "num": 34,
      "name": "LatentMoE",
      "fullName": "低成本潜变量专家架构 (LatentMoE)",
      "year": "2026.01",
      "org": "NVIDIA",
      "parent": "deepseek_v3",
      "paperUrl": "https://arxiv.org/abs/2601.18089",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "按FLOP重构专家路径",
      "summary": "LatentMoE 将 MoE 的 expert 路由和计算从模型隐藏维度解耦，投影到共享的低维潜在空间（latent space），在恒定 FLOP 和参数量下成倍增加 expert 数量和 top-k 激活数，从而系统性提升精度/FLOP 和精度/参数比，已被 Nemotron-3 Super 和 Ultra 旗舰模型采用。",
      "keyPoints": [
        "提出五大硬件—软件协同设计原则（Principle I-V），涵盖吞吐 vs 延迟瓶颈、expert 参数化、路由与通信、路由空间与负载均衡、共享专家设计",
        "核心机制：将 token 从隐藏维度 d 投影到潜在维度 l（l &lt; d），在潜在空间中进行路由和 expert 计算，路由参数量和 all-to-all 通信量降低 d/l 倍",
        "利用节省的通信和内存带宽，按比例增加 expert 总数 N 和 top-k 激活数 K（均乘以 d/l），保持总推理成本近似不变",
        "两种架构变体：l-MoE_eff（延后 projection up，减少 FLOP）和 l-MoE_acc（提前 projection up，保持精度优先）",
        "压缩比 alpha = d/l 是关键控制旋钮：消融实验表明 alpha &lt;= 4 时质量几乎无损",
        "Expert 数量扩展带来精度持续提升，且 expert 多样性（expert co-activation diversity）增加是关键增益来源",
        "95B 参数 / 1T token 训练规模验证，LatentMoE 在所有评测尺度上超越标准 MoE",
        "推理性能实测：EPM（effective parameters per minute）提升 1.35x；万亿参数（Trillion）模拟显示 1.24–3.46x 推理加速",
        "已部署于 NVIDIA Nemotron-3 系列并扩展到更大规模"
      ],
      "detail": "<h5>1. 动机与背景</h5>\n<p>标准 MoE 架构存在三大结构瓶颈：</p>\n<ol>\n<li><strong>Expert 参数化冗余</strong>：每个 expert 使用完整隐藏维度 d 的权重矩阵，但 expert 内部计算的信息密度并未随参数量线性增长。</li>\n<li><strong>All-to-All 通信瓶颈</strong>：路由后 token 需要从各设备重新分发到对应 expert 所在设备。top-k K 越大，通信量与 K * d 成正比。</li>\n<li><strong>内存带宽压力</strong>：在线低延迟推理场景下，内存带宽（而非 FLOP）是真正瓶颈，每个 expert 的参数量直接影响加载开销。</li>\n</ol>\n<p>LatentMoE 的核心洞察：<strong>路由和计算不必绑定在模型隐藏维度 d 上</strong>。将其下投影到更小的潜在维度 l 中，既可降低路由计算量、通信量和 expert 参数量，又能在恒定总成本下将节省的资源重新投入于增加 expert 数量和路由多样性。</p>\n<h5>2. 五大设计原则 (Design Principles I-V)</h5>\n<p><strong>Principle I — 吞吐 vs 延迟瓶颈识别</strong>：离线高吞吐场景瓶颈在计算 FLOP；在线低延迟场景瓶颈在内存带宽和通信。有效 MoE 设计需兼顾二者。</p>\n<p><strong>Principle II — Expert 参数化效率</strong>：每个 expert 的参数量应与实际产生的信息增益匹配。过大的 expert（如 d 维 FFN）在固定总参数量下限制了 expert 数量。</p>\n<p><strong>Principle III — 路由与通信解耦</strong>：all-to-all 通信量与 K * d 成正比。若能在更小维度 l 中路由和计算，通信量成比例下降。</p>\n<p><strong>Principle IV — 路由空间与负载均衡</strong>：更大的 expert 池 N 和 top-k K 提供更丰富的组合路由空间（combinatorial sparsity diversity），提升模型表达能力。负载均衡损失需要重新设计以适应更大的 K。</p>\n<p><strong>Principle V — 共享专家（Shared Expert）设计</strong>：共享专家捕获通用知识、路由专家捕获特定知识的分工方案，在增加路由专家时需相应调整共享专家的容量和比例。</p>\n<h5>3. LatentMoE 架构</h5>\n<p><img alt=\"LatentMoE 架构对比图\" src=\"https://ar5iv.labs.arxiv.org/html/2504.18089/assets/x1.png\" />\n<em>图：标准 MoE vs LatentMoE 架构。LatentMoE 将 token 从隐藏维度 d 投影到小得多的潜在维度 l 进行路由和 expert 计算，路由参数量和 all-to-all 通信量降低 d/l 倍。省下的资源用于增加 expert 总数和 top-k，均乘以 d/l，保持总推理成本近似不变。</em></p>\n<p>核心变换：\n- <strong>Projection Down（P_down ∈ R^{d × l}）</strong>：将 token 从 d 维投影到 l 维潜在空间。\n- <strong>Latent Routing &amp; Expert Computation</strong>：在 l 维空间中进行 router 计算（gate 网络）和 expert FFN 计算。\n- <strong>Projection Up（P_up ∈ R^{l × d}）</strong>：将 expert 输出从 l 维投影回 d 维。</p>\n<p>定义压缩比 alpha = d / l。在 iso-FLOP 和 iso-parameter 约束下：\n- Expert 数量从 N 增加到 N * alpha\n- Top-k 从 K 增加到 K * alpha\n- 每个 expert 的参数量减少为原来的 1/alpha\n- All-to-All 通信量减少为原来的 1/alpha</p>\n<p><strong>两个变体</strong>：\n- <strong>l-MoE_eff（效率优先）</strong>：projection up 放在 expert 输出后、残差连接前，expert 计算全在 l 维完成，FLOP 最低。\n- <strong>l-MoE_acc（精度优先）</strong>：projection up 放在每个 expert 的 FFN 内部（先 projection up 再做 FFN 或做部分 up），保留更多信息通路，精度更高。论文推荐此变体。</p>\n<pre><code class=\"language-python\"># LatentMoE 前向传播伪代码（l-MoE_eff）\ndef latent_moe_forward(x, P_down, P_up, experts, router, alpha, K):\n    # 1. Project down to latent space\n    z_l = P_down @ x          # [d] -&gt; [l], l = d/alpha\n\n    # 2. Routing in latent space\n    gate_logits = router(z_l)  # [N*alpha]\n    topk_indices, topk_weights = top_k(softmax(gate_logits), K*alpha)\n\n    # 3. Expert computation in latent space\n    output_l = 0\n    for i, w in zip(topk_indices, topk_weights):\n        output_l += w * experts[i](z_l)\n\n    # 4. Project up and residual\n    output = P_up @ output_l    # [l] -&gt; [d]\n    return x + output\n</code></pre>\n<h5>4. 路由与负载均衡</h5>\n<p>Router 在潜在空间中计算 gate logits：</p>\n<div class=\"kb-math kb-math-display\">g_i = \\text{softmax}(W_r \\cdot z_l)_i, \\quad z_l = P_{\\text{down}} \\cdot x</div>\n<p>负载均衡损失适配更大的 top-k：</p>\n<div class=\"kb-math kb-math-display\">L_{\\text{aux}} = \\lambda \\cdot \\sum_{i=1}^{N \\cdot \\alpha} f_i \\cdot p_i</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">f_i</span> 为 expert i 实际处理的 token 比例，<span class=\"kb-math kb-math-inline\">p_i</span> 为 gate 分配给 expert i 的平均概率。当 K 增大时，<span class=\"kb-math kb-math-inline\">\\lambda</span> 需要相应调低以避免过度正则化。</p>\n<h5>5. 实验验证</h5>\n<p><strong>5.1 消融实验</strong>：\n- <strong>压缩比 alpha</strong>：alpha = 2, 4 时精度与标准 MoE 持平甚至略优；alpha = 8 时开始出现微小退化。推荐 alpha = 4 作为最佳性价比点。\n- <strong>Expert 数量扩展</strong>：在恒定总参数量下，增加 N（同时减小每个 expert 大小）带来持续精度提升，验证了 expert 多样性增益。\n- <strong>l-MoE_eff vs l-MoE_acc</strong>：l-MoE_acc 在所有评测任务上优于 l-MoE_eff，差异在小模型上更明显。</p>\n<p><strong>5.2 扩展研究</strong>：\n- 95B 参数规模、1T token 训练：LatentMoE（alpha=4）在所有下游任务上优于等 FLOP 和等参数量的标准 MoE baseline。\n- Expert co-activation 分析：LatentMoE 的 expert 共激活模式更均匀、多样性更高，这是精度增益的主要来源。</p>\n<p><strong>5.3 推理性能</strong>：\n- <strong>EPM（Effective Parameters per Minute）</strong>：LatentMoE 在相同硬件上的 EPM 提升 1.35x。\n- <strong>万亿参数模拟</strong>：模拟 1T+ 参数部署，LatentMoE 推理速度比标准 MoE 快 1.24x（带宽密集场景）到 3.46x（计算密集场景）。</p>\n<p><strong>5.4 与 Nemotron-3 集成</strong>：LatentMoE 架构已被 NVIDIA Nemotron-3 Super 和 Ultra 模型采用，在更大规模和更长 token horizon 上验证了有效性。</p>\n<h5>6. 与标准 MoE 的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>标准 MoE</th>\n<th>LatentMoE</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Expert 参数维度</td>\n<td>模型隐藏维度 d</td>\n<td>潜在维度 l = d/alpha</td>\n</tr>\n<tr>\n<td>路由计算</td>\n<td>O(N * d)</td>\n<td>O(N*alpha * l) = O(N * d)（恒定）</td>\n</tr>\n<tr>\n<td>All-to-All 通信</td>\n<td>∝ K * d</td>\n<td>∝ K*alpha * l = K * d（恒定）</td>\n</tr>\n<tr>\n<td>Expert 数量</td>\n<td>N</td>\n<td>N * alpha</td>\n</tr>\n<tr>\n<td>Top-k</td>\n<td>K</td>\n<td>K * alpha</td>\n</tr>\n<tr>\n<td>单个 Expert 参数量</td>\n<td>大</td>\n<td>小（1/alpha）</td>\n</tr>\n<tr>\n<td>负载均衡难度</td>\n<td>低</td>\n<td>略高（需调 lambda）</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键：LatentMoE 没有增加总计算量或通信量（理论恒定），而是通过\"降维投影 + 扩展数量\"的变换，将算力重新分配到更多的 expert 和更丰富的路由组合上，从而提升模型表达能力。</p>\n<p>⚠️ 注意：Projection 矩阵引入额外参数和少量额外 FLOP，但在 alpha &lt;= 4 时这些开销可忽略不计。</div>",
      "quiz": {
        "q": "LatentMoE 中压缩比 alpha = d/l 的核心作用是什么？",
        "options": [
          "直接减少模型总参数量，提高推理速度",
          "在恒定总计算量下，将节省的资源转化为更多 expert 数量和更大 top-k，提升路由多样性",
          "消除 all-to-all 通信，实现完全去中心化推理",
          "使每个 expert 的计算精度达到 d 维水平"
        ],
        "answer": 1,
        "explain": "LatentMoE 的核心是降维投影（d→l，减少路由/通信/参数量）后按比例扩展 N 和 K（均乘 alpha），总 FLOP 和通信量保持恒定，但 expert 多样性增加带来精度提升。"
      }
    },
    {
      "id": "ernie5",
      "num": 35,
      "name": "ERNIE 5.0",
      "fullName": "统一自回归超稀疏 MoE (ERNIE 5.0)",
      "year": "2026.02",
      "org": "Baidu",
      "parent": "qwen3",
      "paperUrl": "https://arxiv.org/abs/2602.04705",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "弹性训练统一多模态MoE",
      "summary": "ERNIE 5.0 提出了从零训练的统一自回归多模态基础模型，用同一个超稀疏 MoE 主干同时处理文本、图像、视频和音频的理解与生成。它的关键增量是把所有模态压到统一 token 序列中做 Next-Group-of-Tokens Prediction，并用模态无关专家路由与弹性训练解决万亿级模型的容量、效率和部署形态问题。",
      "keyPoints": [
        "统一建模范式：文本、图像、视频、音频都被序列化为共享 token 空间，用统一自回归目标训练，而不是给不同模态外挂独立生成器。",
        "超稀疏 MoE 主干：专家池由所有模态共享，单 token 只激活很小比例专家，论文报告激活率低于 3%，以较低计算成本扩展总参数容量。",
        "模态无关专家路由：router 只看统一 token 表示，不显式使用 text/image/audio/video 标签，从而允许跨模态共享专家和自发专家分工。",
        "视觉生成机制：图像被视为单帧视频，使用因果 2D 多尺度 tokenizer 和膨胀后的因果 3D tokenizer，并通过 Next-Frame-and-Scale Prediction 统一图像与视频生成。",
        "音频生成机制：音频由 12.5 Hz codec-style tokenizer 离散化，使用 Next-Codec Prediction 做跨 codec 维度的结构化自回归预测。",
        "弹性训练：一次预训练中同时训练完整模型和深度、宽度、路由稀疏度不同的子网络，子模型可按内存、延迟、吞吐约束直接实例化。",
        "训练系统设计：多模态 tokenizer 与 MoE backbone 解耦部署，避免不同模态前处理吞吐不一致拖慢整体训练。",
        "后训练流程：统一预训练后接 SFT 与统一多模态强化学习，针对稀疏 MoE、多模态采样偏置、稀疏奖励和熵坍缩做稳定化设计。"
      ],
      "detail": "<p><img alt=\"ERNIE 5.0 统一多模态架构\" src=\"https://arxiv.org/html/2602.04705v1/x1.png\" />\n<em>图：ERNIE 5.0 的统一自回归架构。文本、视觉和音频先被各自 tokenizer 编码并序列化，再进入共享的超稀疏 MoE backbone，路由器把不同模态 token 分发到同一个专家池。</em></p>\n<p><img alt=\"ERNIE 5.0 弹性训练框架\" src=\"https://arxiv.org/html/2602.04705v1/x4.png\" />\n<em>图：ERNIE 5.0 的 Once-For-All 弹性训练。训练时随机改变可用层数、专家总数和每个 token 的 top-k 路由，让一个 super-network 同时支持多种部署预算。</em></p>\n<pre><code class=\"language-python\"># ERNIE 5.0 统一自回归 MoE 与弹性训练伪代码\nfor batch in multimodal_stream:\n    # 1. 不同模态先由解耦 tokenizer 转成统一序列\n    token_groups = []\n    for sample in batch:\n        z_text = text_tokenizer(sample.text)\n        z_vision = visual_tokenizer(sample.image_or_video)   # NFSP tokens\n        z_audio = audio_tokenizer(sample.audio)              # NCP codec tokens\n        token_groups.append(serialize(z_text, z_vision, z_audio))\n\n    # 2. 完整配置与弹性子配置共享同一套参数\n    full_cfg = Config(depth=&quot;full&quot;, experts=&quot;all&quot;, top_k=&quot;default&quot;)\n    sub_cfg = sample_elastic_config(\n        depth_choices=[&quot;full&quot;, &quot;reduced&quot;],\n        width_choices=[&quot;all_experts&quot;, &quot;sampled_experts&quot;],\n        sparsity_choices=[&quot;default_top_k&quot;, &quot;smaller_top_k&quot;],\n        full_probability=0.80,\n    )\n\n    # 3. 同一 Next-Group-of-Tokens 目标优化完整模型和子模型\n    loss_full = next_group_loss(moe_backbone(token_groups, full_cfg))\n    loss_sub = next_group_loss(moe_backbone(token_groups, sub_cfg))\n    loss = loss_full + loss_sub + router_stability_terms()\n    loss.backward()\n    optimizer.step()\n</code></pre>\n<p>ERNIE 5.0 要解决的不是单一模态建模，而是“理解”和“生成”在多模态系统里长期割裂的问题。很多多模态系统以语言模型为中心，只把图像、音频或视频理解结果接入文本空间；生成端则常常依赖扩散模型、codec decoder 或专门的视频生成模块。这类 late-fusion 设计有效但会形成能力跷跷板：理解模型学到的语义不一定能约束生成细节，生成模块的训练目标也不一定反哺跨模态推理。ERNIE 5.0 的选择是更激进的，把文本、图像、视频、音频全部变成一个自回归序列问题，从预训练一开始就让所有模态共用主干、共享优化轨迹。</p>\n<p>核心目标可以抽象成 Next-Group-of-Tokens Prediction。不同于普通语言模型每步预测一个 token，图像 patch、多尺度视觉 token 或音频 codec 往往天然以“组”的形式出现，因此 ERNIE 5.0 让模型在时间步 <span class=\"kb-math kb-math-inline\">t</span> 预测一个 token group <span class=\"kb-math kb-math-inline\">G_t</span>。一个简化写法是：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{NGoT}}(\\theta)=-\\sum_{t=1}^{T}\\sum_{j=1}^{|G_t|}\\log p_{\\theta}\\left(g_{t,j}\\mid G_{&lt;t}, g_{t,&lt;j}\\right)</div>\n<p>这个目标的直觉是把多模态生成的空间结构和时间结构都折叠进自回归条件概率里。文本 token 是 group 的特例；图像生成时，group 可以对应某个尺度上的离散视觉 token；视频生成时，group 继续沿时间维扩展为下一帧和下一尺度；音频生成时，group 对应 codec codebook 的结构化离散码。这样做的收益是所有模态都通过同一个似然目标学习，避免“文本训练一个目标、视觉训练另一个目标、音频再训练第三个目标”的优化不一致。</p>\n<p>主干网络采用超稀疏 MoE。对任意统一 token 表示 <span class=\"kb-math kb-math-inline\">h_t</span>，router 计算每个专家的分数，只选择 top-k 专家参与计算：</p>\n<div class=\"kb-math kb-math-display\">y_t=\\sum_{e\\in\\operatorname{TopK}(r_{\\theta}(h_t),k)}\\alpha_{t,e}E_e(h_t),\\qquad\n\\alpha_{t,e}=\\operatorname{softmax}_{e}\\left(r_{\\theta}(h_t)\\right)</div>\n<p>这里最重要的设计不是 MoE 本身，而是“模态无关”。路由器不手工规定某些专家处理图像、某些专家处理语音，而是让所有 token 进入同一个专家池。论文中的专家利用率可视化显示，虽然路由规则不包含模态标签，专家仍会出现非均匀激活和功能分工：一部分专家跨文本、图像、视频和音频共享，另一部分专家对特定任务或模态更敏感。这比固定模态专家更灵活，因为模型可以在跨模态任务中复用专家，也可以在细粒度生成任务中形成专门化。</p>\n<p>视觉管线把图像视为单帧视频。ERNIE 5.0 先训练因果 2D 多尺度图像 tokenizer，再膨胀成因果 3D 卷积 tokenizer，使图像和视频使用同一套离散化逻辑。Next-Frame-and-Scale Prediction 将图像生成表述为下一尺度预测，将视频生成表述为下一帧加下一尺度预测。这个设计保留了两种关键结构：尺度维度负责从粗到细补充视觉细节，时间维度负责跨帧一致性。论文还使用 progressive tokenizer switching，从低 bit、小词表 tokenizer 开始，再逐步切到高 bit、大词表 tokenizer，目的是先让主干学稳定的粗粒度表示，再引入更难的细节建模，降低早期训练震荡。</p>\n<p>音频管线则使用 codec token。连续波形先被压成 12.5 Hz 的层级离散 token，理解侧用语义表示帮助语音和环境声建模，生成侧用 Next-Codec Prediction 在 codec 维度上做深度自回归。这样避免把所有 codebook 展平导致序列过长，也让模型既能捕获语音内容这种高层语义，又能保留音色、韵律和声学细节。与视觉 NFSP 类似，NCP 的本质是为非文本模态找到一种仍能被统一语言模型主干处理的 group prediction 形式。</p>\n<p>弹性训练是 ERNIE 5.0 面向生产部署的关键机制。设完整模型为 <span class=\"kb-math kb-math-inline\">M_{\\theta}</span>，弹性子网络由深度 <span class=\"kb-math kb-math-inline\">d</span>、专家宽度 <span class=\"kb-math kb-math-inline\">w</span>、路由稀疏度 <span class=\"kb-math kb-math-inline\">k</span> 决定，记为 <span class=\"kb-math kb-math-inline\">M_{\\theta}^{d,w,k}</span>。训练时从分布 <span class=\"kb-math kb-math-inline\">q(d,w,k)</span> 采样子配置，并与完整模型共同优化：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{elastic}}=\\mathcal{L}_{\\text{NGoT}}(M_{\\theta})+\\lambda\\,\\mathbb{E}_{(d,w,k)\\sim q}\\left[\\mathcal{L}_{\\text{NGoT}}(M_{\\theta}^{d,w,k})\\right]</div>\n<p>论文中深度、宽度和稀疏度的弹性通常以 80% 保持完整配置、20% 采样缩减配置的方式训练。深度弹性让部分样本跳过层，宽度弹性让部分样本只从专家子集路由，稀疏度弹性让 top-k 在较小范围内采样。这个训练不是事后剪枝，而是在预训练期间让参数学会在不同资源预算下工作。论文报告，在推理时把路由 top-k 降到 25% 可获得超过 15% 的解码加速且精度损失较小；联合深度、宽度和稀疏度后，弹性变体只用 53.7% 激活参数和 35.8% 总参数仍保持接近完整模型的平均表现。</p>\n<p>训练系统层面，ERNIE 5.0 还把 tokenizer 与 backbone 解耦。视觉和音频 tokenizer 的计算模式与 MoE 主干差异很大，如果强行放在同一批 GPU 上，会因为模态混合比例变化产生资源空转和负载不均。论文采用 tokenizer-backbone disaggregation，把 tokenizer 作为独立、可水平扩展的服务部署，backbone 通过远程调用拿到编码结果。这是统一多模态训练容易被忽视但很关键的一点：方法上统一不代表系统上完全同构，真正能稳定扩展到万亿级参数，需要把异构前处理和稀疏主干的吞吐边界分开优化。</p>\n<p>与传统多模态模型相比，ERNIE 5.0 的创新不在于某一个单点模块，而在于把目标函数、专家路由、视觉生成、音频生成、弹性部署和训练系统对齐到同一个原则：统一序列化、统一自回归、共享专家池、按预算可伸缩。这样的设计牺牲了一些模块化系统的简单性，但换来了端到端跨模态表示学习，以及在同一检查点上派生不同延迟和显存版本的能力。</p>\n<div class=\"key-point\">💡 关键：ERNIE 5.0 的“统一”不是把多个模型拼在一起，而是让所有模态从预训练开始就在一个共享自回归 MoE 主干内竞争、协作和分工。</div>",
      "quiz": {
        "q": "ERNIE 5.0 中模态无关专家路由的主要作用是什么？",
        "options": [
          "为每种模态固定分配一组专家，避免专家共享",
          "只根据统一 token 表示选择专家，让跨模态共享和专家专门化自然出现",
          "把图像和音频都转换成文本描述后再训练语言模型",
          "用稠密 FFN 替代 MoE，以减少路由不稳定性"
        ],
        "answer": 1,
        "explain": "论文强调 router 不使用显式模态标签，而是基于统一 token 表示路由到共享专家池，从而同时支持跨模态共享和任务驱动的专家分化。"
      }
    },
    {
      "id": "eurollm22b",
      "num": 36,
      "name": "EuroLLM-22B",
      "fullName": "欧洲多语言基础模型 (EuroLLM-22B)",
      "year": "2026.02",
      "org": "Unbabel / EU consortium",
      "parent": "qwen25",
      "paperUrl": "https://arxiv.org/abs/2602.05879",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "面向35种欧洲语言从零训练",
      "summary": "EuroLLM-22B 从零预训练一个 22.639B 参数的开放多语言 Transformer，面向 24 种欧盟官方语言和 11 种额外语言，解决开放大模型中欧洲语言覆盖不足、训练流程不透明的问题。它的核心不是新算子，而是把多语言 tokenizer、分层数据过滤、三阶段约 4T token 预训练、32K 上下文扩展和 EuroBlocks 指令微调整合成一条可复现的欧洲语言基座模型流水线。",
      "keyPoints": [
        "目标语言覆盖：24 种欧盟官方语言，加上 Arabic、Catalan、Chinese、Galician、Hindi、Japanese、Korean、Norwegian、Russian、Turkish、Ukrainian，共 35 种目标语言。",
        "模型架构：54 层 decoder-only Transformer，embedding size 6144，FFN hidden size 16384，48 个 attention heads，8 个 GQA KV heads，RMSNorm、SwiGLU、RoPE，BPE 词表 128K。",
        "参数与上下文：总参数 22.639B，非 embedding 参数 21.067B，最终序列长度 32768；相较 9B 版本，22B 在最后阶段把上下文从 4K 扩到 32K，并将 RoPE <span class=\"kb-math kb-math-inline\">\\theta</span> 从 <span class=\"kb-math kb-math-inline\">10^4</span> 调到 <span class=\"kb-math kb-math-inline\">10^6</span>。",
        "三阶段预训练：约 4T tokens；第一阶段 3.6T tokens，10% 线性 warmup 到 <span class=\"kb-math kb-math-inline\">1.5 \\times 10^{-4}</span> 后保持；随后 400B tokens 退火到峰值的 10%，最后阶段继续衰减到 0。",
        "数据质量课程：EuroWeb 将多语言网页数据按 EuroFilter 质量分数分成三个 tier，越靠后的训练阶段采样越高质量数据，并在后期加入更多代码、数学、合成数学、文档级平行语料和长上下文书籍/代码数据。",
        "平行与翻译数据过滤：对 xx→en / en→xx 平行语料使用 Bifixer 去重，并用 Bicleaner 与 CometKiwi-22 阈值过滤低质量句对。",
        "合成数学增强：第三阶段加入约 170 万条由 Qwen-2.5 系列生成和改写的数学样本，并用 Qwen2.5-32B-Instruct 作为 judge 保留高分答案。",
        "后训练：使用新版 EuroBlocks-SFT-2512 构建约 1060 万多语言指令样本，移除显式 reasoning trace，进行 5 epoch SFT，得到 EuroLLM-22B-Instruct。",
        "开放资源：发布 base / instruct 模型、EuroWeb 预训练数据、EuroBlocks 指令数据、Megatron-LM 预训练 fork 和评测代码。"
      ],
      "detail": "<p><img alt=\"EuroLLM-22B 三阶段学习率调度\" src=\"https://arxiv.org/html/2602.05879v1/figures/scheduler.png\" /></p>\n<p><em>图：论文 Figure 1 展示 EuroLLM-22B 的三阶段学习率调度，先 warmup 与 hold，再在更高质量数据阶段逐步 anneal / decay。</em></p>\n<pre><code class=\"language-python\"># EuroLLM-22B 训练流水线伪代码\nlanguages = official_eu_languages_24 + additional_languages_11\n\ndef build_euroweb(raw_web_documents):\n    tiered_docs = {1: [], 2: [], 3: []}\n    for doc in raw_web_documents:\n        lang = language_id(doc)\n        if lang not in languages:\n            continue\n        if not heuristic_filter(doc):       # 长度、lorem ipsum、javascript、符号比例、大写比例等\n            continue\n        if is_duplicate(doc):\n            continue\n        score = EuroFilter(doc)             # 0 到 5 的教育质量分数\n        tier = assign_quality_tier(score)   # 后期训练使用更高质量 tier\n        tiered_docs[tier].append(doc)\n    return tiered_docs\n\ndef train_eurollm22b(model, euroweb, parallel_data, code_math_data):\n    # Phase 1: 3.6T tokens，低到中等质量覆盖，建立通用语言能力\n    lr = linear_warmup(max_lr=1.5e-4, warmup_ratio=0.10)\n    for batch in sample_mix(euroweb[1], parallel_data, code_math_data, tokens=&quot;3.6T&quot;):\n        loss = cross_entropy(model(batch.input), batch.target)\n        update(model, loss, lr)\n\n    # Phase 2: 400B tokens，采样更高质量数据并把学习率降到峰值 10%\n    for batch in sample_mix(euroweb[2], parallel_data, code_math_data, tokens=&quot;400B&quot;):\n        lr = linear_anneal(start=1.5e-4, end=1.5e-5)\n        update(model, cross_entropy(model(batch.input), batch.target), lr)\n\n    # Phase 3: 32K 上下文扩展，高质量数据、数学/代码、长文档数据占比提高\n    model.rope_theta = 1e6\n    model.max_seq_len = 32768\n    for batch in sample_mix(euroweb[3], long_context_books_code(), synthetic_math(), tokens=&quot;final&quot;):\n        lr = decay_to_zero()\n        update(model, cross_entropy(model(batch.input), batch.target), lr)\n\n    return supervised_finetune(model, EuroBlocks_SFT_2512, epochs=5, max_len=32768)\n</code></pre>\n<p>EuroLLM-22B 的动机是非常工程化的：多数开放权重大模型虽然具备一定多语言能力，但训练数据、过滤规则和后训练配方往往不透明，而且英语和少数高资源语言占据主导。论文把“服务欧洲语言”落到两个可操作约束上：一是 tokenizer 和预训练语料必须原生覆盖 24 种欧盟官方语言及 11 种额外语言；二是模型、数据和代码要开放，方便研究者复现或审计。这里的“从零训练”很关键，它不是把一个英语优先模型继续训成多语言模型，而是在 128K BPE 词表、数据混合和训练日程上直接面向多语言分布设计。</p>\n<p>架构层面，EuroLLM-22B 选择了稳健的 dense decoder-only Transformer，而不是引入 MoE 或实验性 attention。22B 版本使用 54 层、6144 hidden size、16384 FFN hidden size、48 attention heads 和 8 KV heads 的 GQA；激活函数是 SwiGLU，归一化是 RMSNorm，位置编码是 RoPE。语言建模目标仍是标准自回归交叉熵：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\mathrm{LM}}(\\theta) = - \\sum_{t=1}^{T} \\log p_\\theta(x_t \\mid x_{&lt;t})</div>\n<p>因此论文的主要贡献不在损失函数，而在训练系统和数据配方：在可控参数规模下，让模型同时学习通用推理、翻译、指令跟随和欧洲多语言表达。</p>\n<p>数据流水线是 EuroLLM-22B 最重要的机制。英语数据来自 FineWeb-edu 与 Nemotron-CC 的高质量 split；德语、西班牙语、法语、意大利语等高资源语言从 RedPajama-Data-v2 收集，并用 KenLM 困惑度和启发式规则过滤；其他语言聚合 HPLT、MADLAD-400、CulturaX、mC4，再做去重、语言识别、困惑度过滤和同样的启发式清洗。EuroFilter 把多语言网页样本打成 0 到 5 的质量分，22B 版本把这些样本分为三个 tier，让模型在训练后期更多看到高质量内容，这相当于把数据质量本身做成 curriculum。</p>\n<p>训练日程和数据 curriculum 是绑定的。第一阶段用 3.6T tokens 做大覆盖学习，学习率先 10% 线性 warmup 到 <span class=\"kb-math kb-math-inline\">1.5 \\times 10^{-4}</span> 并保持；第二阶段用 400B tokens 退火到峰值的 10%；最后阶段继续衰减到 0，同时引入最高质量 tier、更多数学/代码、合成数学和长上下文数据。32K 上下文扩展也放在最后阶段完成：模型最大序列长度从 4K 调到 32K，并把 RoPE 的 <span class=\"kb-math kb-math-inline\">\\theta</span> 从 <span class=\"kb-math kb-math-inline\">10^4</span> 增至 <span class=\"kb-math kb-math-inline\">10^6</span>。论文还特别加入 60B tokens 的长上下文数据，书籍和代码各半，让长上下文能力不是只靠位置编码缩放硬外推。</p>\n<p>后训练使用新版 EuroBlocks。作者从多个公开指令数据源出发，用更强开放模型重新生成回答，再用 Skywork-Gemma2-27B 选择更优响应，加入 Hermes-3、Tulu-3、Nemotron V1/V2 等来源，并移除结构化 reasoning trace，形成非 reasoning 的多语言指令-回复语料。SFT 只在 target tokens 上计算 loss，训练 5 个 epoch，最大上下文 32768，使用 bfloat16、sequence packing、cosine learning rate 和 Liger-Kernel 优化算子。评测时，非翻译任务用多个高能力 judge 聚合判断，翻译任务用 COMET-22；论文结论是 22B 在 fully open European baselines 中表现最强，并且在只有约 4T 预训练 token 的情况下接近更大规模欧洲模型。</p>\n<div class=\"key-point\">💡 关键：EuroLLM-22B 的“算法”更像一条可审计的多语言模型生产线：语言覆盖、质量分层、学习率阶段、上下文扩展和指令数据重建共同决定效果，单独看 Transformer 结构反而不是创新重点。</div>",
      "quiz": {
        "q": "EuroLLM-22B 将多语言网页数据按质量分成三个 tier 的主要目的是什么？",
        "options": [
          "让模型后期更多看到高质量多语言数据，配合学习率衰减提升收敛质量",
          "把所有低资源语言样本完全丢弃，只保留英语和高资源语言",
          "用 MoE router 自动选择不同语言专家",
          "在推理时动态切换不同 tokenizer"
        ],
        "answer": 0,
        "explain": "论文使用 EuroFilter 给多语言网页样本打分，并把数据划分到三个训练阶段，后期保留更高质量数据；这是一种数据质量 curriculum，而不是 MoE 或推理时机制。"
      }
    },
    {
      "id": "mellum2",
      "num": 37,
      "name": "Mellum 2",
      "fullName": "开放软件工程 MoE 模型 (Mellum 2)",
      "year": "2026.05",
      "org": "JetBrains",
      "parent": "minimax_m1",
      "paperUrl": "https://arxiv.org/abs/2605.31268",
      "projectUrl": "",
      "category": "frontier_2026",
      "motivation": "小激活MoE服务开发场景",
      "summary": "Mellum 2 提出一个开放权重的 12B 总参数、每 token 仅约 2.5B 激活参数的 MoE 语言模型，专门面向代码生成、编辑、调试、工具调用和 agentic coding 等软件工程场景。它的核心贡献是用推理预算反推架构：64 experts / top-8 路由、4 KV heads GQA、3:1 sliding-window attention、MTP、Muon + FP8 训练、layer-selective YaRN 与 RLVR 后训练共同服务“小激活、可部署、偏工程任务”的目标。",
      "keyPoints": [
        "模型规模：约 12B 总参数，约 2.5B active parameters per token；目标是在 2-3B dense 计算量附近获得更大的知识容量。",
        "MoE 结构：每层 MoE FFN，64 个 routed experts，每 token top-8 激活，expert intermediate size 896，无 shared expert，采用 dropless routing。",
        "Transformer 配置：28 层 decoder-only，hidden dimension 2304，32 query heads，4 KV heads，head dimension 128，RMSNorm <span class=\"kb-math kb-math-inline\">\\epsilon=10^{-6}</span>，RoPE base <span class=\"kb-math kb-math-inline\">\\theta=500000</span>，词表 98304。",
        "注意力效率：3:1 SWA 模式，即每 4 层中 3 层用 window size 1024 的 sliding window attention，剩余 1 层保留 full attention。",
        "MTP 头：单个 Multi-Token Prediction transformer layer，loss weight <span class=\"kb-math kb-math-inline\">\\alpha=0.1</span>，训练时作为辅助目标，部署时可作为 speculative decoding 的 draft 模型，评测时可移除。",
        "预训练 curriculum：总计 10.65T tokens，三阶段从 web-heavy 转向 code/math-heavy：6.18T、2.79T、1.69T，对应 code 比例 23% → 42% → 59%。",
        "优化与精度：Distributed Muon，内部对 embedding/output layers 使用 Adam；WHD 学习率调度，2000 warmup steps，Phase 3 线性 decay 到 0；BF16 + FP8 hybrid mixed precision，梯度归约 FP32。",
        "MoE 稳定性：router 使用 FP32，global auxiliary load-balancing loss 系数 <span class=\"kb-math kb-math-inline\">10^{-3}</span>，router z-loss <span class=\"kb-math kb-math-inline\">10^{-3}</span>，dropless routing 避免 token dropping。",
        "长上下文：从 8192 扩展到 131072 tokens，通过 layer-selective YaRN 只重映射 full-attention layers 的 RoPE 频率，不扰动 sliding-window layers。",
        "后训练：从 128K YaRN checkpoint 出发做 SFT，分别训练 Instruct 与 Thinking 两种变体，再用可程序验证奖励的 RLVR / GRPO 变体强化数学、可执行代码、工具调用等任务。"
      ],
      "detail": "<p><img alt=\"Mellum 2 MoE iso-latency 设计空间\" src=\"https://arxiv.org/html/2605.31268v1/x3.png\" /></p>\n<p><em>图：论文 Figure 1(a) 展示 64 experts、8 active 的 Qwen3-MoE 架构在 throughput mode 下的 iso-latency 设计空间，用推理延迟约束筛选 Mellum 2 的 MoE 规模。</em></p>\n<pre><code class=\"language-python\"># Mellum 2 单 batch 训练伪代码\ndef mellum2_forward(tokens):\n    h = embed(tokens)\n    aux_losses = []\n    for layer_id in range(28):\n        if layer_id % 4 in {0, 1, 2}:\n            a = sliding_window_attention(h, window=1024, q_heads=32, kv_heads=4)\n        else:\n            a = full_attention(h, q_heads=32, kv_heads=4)\n        h = h + a\n\n        # MoE FFN: router 用 FP32，选择 64 个专家中的 top-8\n        router_logits = fp32_router(h)\n        probs = softmax(router_logits)\n        top8 = top_k(probs, k=8)\n        moe = sum(probs[..., i] * expert_i(h) for i in top8.indices)\n        h = h + moe\n\n        aux_losses.append(load_balance_loss(probs, top8) + z_loss(router_logits))\n    return h, sum(aux_losses)\n\ndef train_step(batch):\n    h, router_loss = mellum2_forward(batch.tokens)\n    lm_loss = cross_entropy(lm_head(h[:, :-1]), batch.tokens[:, 1:])\n    mtp_loss = cross_entropy(mtp_head(h[:, :-2]), batch.tokens[:, 2:])\n    loss = lm_loss + 0.1 * mtp_loss + 1e-3 * router_loss\n    distributed_muon_step(loss, precision=&quot;BF16+FP8 hybrid&quot;)\n</code></pre>\n<p>Mellum 2 的出发点不是追求最大的通用 benchmark 分数，而是软件工程部署约束：IDE、代码 agent 和工具调用需要低延迟、高吞吐、长上下文和较强代码能力。论文因此采用 MoE，而不是同等总参数的 dense 模型：每个 token 只激活约 2.5B 参数，但 12B 总参数为长尾编程语言、API、调试模式和推理模板提供更大容量。作者把 64 experts 固定为能放入 GPU 内存的上限，再在 active experts 上做延迟-质量折中；2 active 更快但质量损失明显，最终选择 8 active out of 64。</p>\n<p>核心计算可以写成 top-k MoE 聚合：</p>\n<div class=\"kb-math kb-math-display\">y_t = \\sum_{i \\in \\mathrm{Top8}(g(h_t))} p_i(h_t)\\,E_i(h_t),\n\\quad p(h_t)=\\mathrm{softmax}(g(h_t))</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">g</span> 是 router，<span class=\"kb-math kb-math-inline\">E_i</span> 是第 <span class=\"kb-math kb-math-inline\">i</span> 个 expert。Mellum 2 使用 dropless routing，也就是不设置 capacity factor 丢 token；这样早期吞吐会受负载不均影响，但随着 global load-balancing loss 让 router 学会均衡分配，吞吐会接近 capacity-limited routing，同时避免 token dropping 带来的信息损失。router 计算保留 FP32，并加入 <span class=\"kb-math kb-math-inline\">10^{-3}</span> 的 auxiliary load-balancing loss 与 <span class=\"kb-math kb-math-inline\">10^{-3}</span> 的 z-loss，这些细节比 MoE 公式本身更影响训练稳定性。</p>\n<p>注意力设计同样由推理效率驱动。4 KV heads 的 GQA 降低 KV cache 成本；3:1 sliding-window attention 让 28 层中大多数层只看 1024 token 的局部窗口，减少长输入下的 attention 开销，而每 4 层保留 1 层 full attention，避免模型完全失去远距离交互路径。MTP 头预测额外未来 token，训练目标为：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}=\\mathcal{L}_{\\mathrm{next}} + 0.1\\,\\mathcal{L}_{\\mathrm{MTP}} + 10^{-3}\\mathcal{L}_{\\mathrm{router}}</div>\n<p>这个 MTP 头不是改变主模型输出接口，而是作为辅助目标和 speculative decoding 的内置 draft；评测时可以移除，降低对主干推理的影响。</p>\n<p>预训练 curriculum 是“web early, curated late”。Phase 1 用 6.18T tokens 建立基础语言和代码能力，web/code/math 比例约 70/23/6；Phase 2 用 2.79T tokens 增加高质量与代码数据，比例约 44/42/14；Phase 3 用 1.69T tokens 在学习率 decay 阶段强化能力，code/math 升至 59/18。学习率使用 Warmup-Hold-Decay：2000 steps warmup 到 <span class=\"kb-math kb-math-inline\">3\\times10^{-4}</span>，前两阶段保持峰值，第三阶段约 49306 steps 线性衰减到 0。优化器是 Distributed Muon，使用 Moonlight 配置，Muon 对 hidden layers 做正交化更新，同时对 embedding 和 output layers 使用 Adam；这比旧文件中“Muon 只管 embedding/LM head”的说法相反。</p>\n<p>长上下文扩展从 8192 到 131072 tokens。Mellum 2 没有对所有层统一做 YaRN，而是只对 full-attention layers 做频率重映射，sliding-window layers 保留原 RoPE 参数。直觉是 SWA 层本来只处理固定 1024 token 局部窗口，不需要为 128K 全局距离重标定；真正需要外推的是 full-attention 层。论文在 RULER ablation 中报告，64K 评测上下文下 layer-selective recipe 得分 0.64，高于 uniform <span class=\"kb-math kb-math-inline\">\\theta</span>-bump 的 0.52 和 unchanged-<span class=\"kb-math kb-math-inline\">\\theta</span> 的 0.33，说明“只改必须长距外推的层”比粗暴全层缩放更稳。</p>\n<p>后训练分 SFT 和 RLVR。SFT 从 long-context YaRN checkpoint 开始，训练 Instruct 和 Thinking 两个变体：Instruct 直接回答并丢弃 reasoning 字段；Thinking 会输出 reasoning trace，并只对最终 assistant turn 及其 reasoning trace 计算 loss。两者都用 131072 packed sequence、Distributed Muon、BF16+FP8，并把 MoE aux-loss 系数降到 <span class=\"kb-math kb-math-inline\">10^{-4}</span>。RL 阶段使用可程序验证奖励而非 RLHF reward model，因为数学、可执行代码和函数调用任务能用确定性 checker 判对错；这降低了 reward model 噪声，让小激活 MoE 更适合软件工程中的“能跑通就给奖”的训练信号。</p>\n<div class=\"key-point\">💡 关键：Mellum 2 的方法重点是 inference-aware model design。MoE、GQA、SWA、MTP、Muon、FP8、YaRN 和 RLVR 都围绕同一个约束展开：在可部署计算量下，把软件工程任务需要的容量、长上下文和工具调用能力尽量做满。</div>",
      "quiz": {
        "q": "Mellum 2 为什么只对 full-attention layers 使用 layer-selective YaRN？",
        "options": [
          "因为 sliding-window layers 只处理固定局部窗口，主要由 full-attention layers 承担长距离外推",
          "因为 MoE experts 只能在 full-attention layers 中工作",
          "因为 YaRN 只能用于 dense 模型，不能用于 MoE 层",
          "因为 128K 上下文只在 SFT 阶段使用，预训练阶段完全不用位置编码"
        ],
        "answer": 0,
        "explain": "论文认为 SWA 层的注意力跨度固定，统一缩放会扰动原本有效的局部建模；需要长距离位置外推的是 full-attention layers。"
      }
    }
  ],
  "categories": {
    "architecture": {
      "label": "架构奠基",
      "color": "#2563EB"
    },
    "autoregressive": {
      "label": "GPT式稠密扩展",
      "color": "#7C3AED"
    },
    "open_foundation": {
      "label": "开源基础模型",
      "color": "#059669"
    },
    "long_context": {
      "label": "长上下文与序列效率",
      "color": "#F59E0B"
    },
    "sparse_moe": {
      "label": "稀疏MoE扩展",
      "color": "#DC2626"
    },
    "frontier_2026": {
      "label": "2026前沿系统",
      "color": "#0891B2"
    }
  },
  "projectUrls": {}
};
