# 关于大语言模型的最新综述

- 来源平台: **zhihu**（通过 Jina Reader 公开抓取）
- 原文链接: <https://zhuanlan.zhihu.com/p/701086272>
- Reader链接: <https://r.jina.ai/https://zhuanlan.zhihu.com/p/701086272>
- 作者: -

---

Title: 关于大语言模型的最新综述

URL Source: https://zhuanlan.zhihu.com/p/701086272

Markdown Content:
24年2月来自Snap等公司的论文“Large Language Models: A Survey”。

自 2022 年 11 月 Chat[GPT](https://zhida.zhihu.com/search?content_id=243927332&content_type=Article&match_order=1&q=GPT&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODE2NjU2ODQsInEiOiJHUFQiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDM5MjczMzIsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.kzFNDd7kk55Ez7kT9CkNyvR38mlHBnpSIx2u1VH2X8c&zhida_source=entity) 发布以来，大语言模型 ([LLM](https://zhida.zhihu.com/search?content_id=243927332&content_type=Article&match_order=1&q=LLM&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODE2NjU2ODQsInEiOiJMTE0iLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDM5MjczMzIsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.oZZjcfieMm1y4e6BIZqzx8g_LVDpC-DddQ0BdBn2sVI&zhida_source=entity)) 因其在各种自然语言任务中的出色表现而备受关注。正如规模化定律所预测的那样，LLM 的通用语言理解和生成能力是通过在大量文本数据上训练数十亿个模型参数获得的 [1]，[2]。LLM 的研究领域虽然刚刚出现，但正在以多种不同的方式迅速发展。综述回顾了一些最著名的 LLM，包括三个流行的 LLM 系列 (GPT、LLaMA、[PaLM](https://zhida.zhihu.com/search?content_id=243927332&content_type=Article&match_order=1&q=PaLM&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODE2NjU2ODQsInEiOiJQYUxNIiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MjQzOTI3MzMyLCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.sBMEzmGSzG7zoQsc2huEAkLmkCSz6HBRki2HYbq27gE&zhida_source=entity))，并讨论了它们的特点、贡献和局限性。概述了为构建和增强 LLM 而开发的技术。还有为 LLM 训练、微调和评估准备的流行数据集，以及广泛使用的 LLM 评估指标，并在一组代表性基准上比较几种流行 LLM 的性能。最后，开放的挑战和未来的研究方向。

* * *

如图所示，LLM的**涌现能力**包括：(1) 上下文学习，即 LLM 在推理时从提示中呈现的一小组示例中学习新任务；(2) 指令遵循，即 LLM 在进行指令调优后，无需使用明确示例即可遵循新类型任务的指令；以及 (3) 规划：多步骤推理，即 LLM 可以通过将复杂任务分解为中间推理步骤来解决该问题，如**思维链（COT）**提示中所示 [34]。LLM 还可以通过使用外部知识和工具 [35]、[36] 进行增强，从而有效地与用户和环境 [37] 交互，并使用通过交互收集的反馈数据不断改进自身，例如通过**人工反馈的强化学习 ([RLHF](https://zhida.zhihu.com/search?content_id=243927332&content_type=Article&match_order=1&q=RLHF&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODE2NjU2ODQsInEiOiJSTEhGIiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MjQzOTI3MzMyLCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.O4AGlb0fcRcDQvU2xJL8FNPrI-uEHkJO_2LZ912Ca-c&zhida_source=entity))**。

![Image 1](https://pic3.zhimg.com/v2-4d18310414a0edb895809a9b1947c856_1440w.jpg)

以下图是本文的组织图：

![Image 2](https://pic4.zhimg.com/v2-03cb7e87e1839a3a6183a03786f7e7b9_1440w.jpg)

早期预训练神经语言模型（PLM）是 LLM 的基础，这里主要提到三个 LLM 系列：GPT、LlaMA 和 PaLM。如表概述了其中一些模型及其特征。

![Image 3](https://pic3.zhimg.com/v2-8c9e8fce61dc8b271ba15252512c28d0_1440w.jpg)

基于 [Transformer](https://zhida.zhihu.com/search?content_id=243927332&content_type=Article&match_order=1&q=Transformer&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODE2NjU2ODQsInEiOiJUcmFuc2Zvcm1lciIsInpoaWRhX3NvdXJjZSI6ImVudGl0eSIsImNvbnRlbnRfaWQiOjI0MzkyNzMzMiwiY29udGVudF90eXBlIjoiQXJ0aWNsZSIsIm1hdGNoX29yZGVyIjoxLCJ6ZF90b2tlbiI6bnVsbH0.TAT9laxe8c6-DHmZIHJLPWplskoM7gn2ffKIyil-crM&zhida_source=entity) 的 PLM，根据其神经架构，分为三大类：仅编码器（BERT）、仅解码器（GPT）和编码器-解码器（T5）模型。

大语言模型 (LLM) 主要指基于 Transformer 的 PLM，包含数百亿到数千亿个参数。与上面回顾的 PLM 相比，LLM 不仅模型规模大得多，而且表现出更强的语言理解和生成能力以及小规模模型所不具备的涌现能力。主要是三个 LLM 系列：GPT、LLaMA 和 PaLM，如图所示。

![Image 4](https://pica.zhimg.com/v2-8b36cf8af6c2d749fa6190b2ed1f6aae_1440w.jpg)

如图是一些最具代表性的 LLM 框架时间表（迄今为止）。除了具有 #parameters 阈值的大语言模型外，还包含了一些代表性方法，这些方法突破了语言模型的极限，为它们的成功铺平了道路（例如 vanilla Transformer、BERT、GPT-1），以及一些小型语言模型。♣ 显示不仅可用作模型而且可用作方法的实体。♦ 仅显示方法。

![Image 5](https://pica.zhimg.com/v2-4ed03db3eb7c47c49f38e125cae68860_1440w.jpg)

* * *

一旦选择了模型架构，训练 LLM 的主要步骤包括：数据准备（收集、清理、去重等）、token化、模型预训练（以自监督学习方式）、指令调整和对齐。如图所示说明这些LLM的不同组件：

![Image 6](https://pic3.zhimg.com/v2-43f16c78e574435d5c1f7efab8c0f70a_1440w.jpg)

**数据清洗**工作非常重要。比如，在 Falcon40B [124] 中，仅对网络数据进行适当的过滤和去重，就可以产生强大的模型；甚至比在 The Pile 上训练的最先进模型表现得更好。尽管进行了广泛的过滤，他们还是能够从 CommonCrawl 中获得五万亿个tokens。他们还发布了从REFINEDWEB 数据集中提取的 6000 亿个tokens，以及在其上训练的 1.3/7.5B 参数语言模型。如图显示了这项工作对 CommonCrawl 数据的细化过程。

![Image 7](https://pica.zhimg.com/v2-305e8b4899897349fe5c50cb76449b82_1440w.jpg)

**Token化**是指将文本序列转换为较小部分（称为token）的过程。虽然最简单的token化工具只是根据空格将文本切成token，但大多数token化工具都依赖于字典。但是在这种情况下，词汇表之外 (OOV) 是一个问题，因为token化器只知道字典中的单词。为了增加字典的覆盖范围，用于 LLM 的流行token化器基于子词，这些子词可以组合成大量单词，包括训练数据中未见过的单词或不同语言中的单词。三个主要token化器是：字节对编码（Byte Pair Encoding），单词片段编码（Word Piece Encoding）和句子片段编码（Sentence Piece Encoding）。

**位置编码**技术如图所示，包括以下几个：

![Image 8](https://pic3.zhimg.com/v2-881215f256a1409841baee9f010e1302_1440w.jpg)

1）**绝对位置嵌入（APE）**[44] ：已在原始 Transformer 模型中使用，以保留序列顺序信息。因此，单词的位置信息被添加到编码器和解码器底部的输入嵌入中。位置编码有多种选择，无论是学习的还是固定的。在 原始 Transformer 中，正弦和余弦函数用于此目的。在 Transformers 中使用 APE 的主要缺点是限制了一定数量的 token。此外，APE 无法解释 token 之间的相对距离。

2）**相对位置嵌入（RPE）**[126] ：涉及扩展自注意以考虑输入元素之间的成对链接。RPE 在两个级别添加到模型中：首先作为K的附加组件，然后作为V矩阵的子组件。这种方法将输入视为具有标签和有向边的全连通图。对于线性序列，边可以捕获输入元素之间相对位置差异的信息。一个裁剪距离表示为 k2 ≤ k ≤ n − 4，指定相对位置的最大限制。这允许模型对不属于训练数据的序列长度做出合理的预测。

3）**旋转位置嵌入（RoPE）**[127]：其解决了现有方法的问题。学习到的绝对位置编码可能缺乏通用性和意义，尤其是在句子较短的情况下。此外，当前的方法（如 T5 ）面临着在位置之间构建全注意矩阵的挑战。RoPE 使用旋转矩阵对单词的绝对位置进行编码，同时在自注意中包含明确的相对位置细节。RoPE 带来一些有用的特性，比如句子长度的灵活性、随相对距离增加单词依赖性的降低，以及通过相对位置编码改善线性自注意的能力。 GPT-NeoX-20B、PaLM、CODEGEN 和 LLaMA 等模型都在其架构中利用了 RoPE。

4) **相对位置偏差（RPB）**：这种位置嵌入背后的概念是为了便于在推理过程中推断比训练中遇到的更长序列。在 [128]中，他们提出了具有线性偏差的注意 (ALiBi)。他们不是简单地将位置嵌入添加到词嵌入中，而是在Q-K对的注意得分中引入了偏差，施加与距离成比例的惩罚。在 BLOOM 模型中，ALiBi 得到了利用。

**预训练**是大语言模型训练流程的第一步，它可以帮助 LLM 获得基本的语言理解能力，这在各种语言相关任务中都很有用。在预训练期间，LLM 会以大量（通常）未标记的文本进行训练，通常采用自监督的方式。预训练有不同的方法，例如下一句预测 [24]，最常见的两种方法包括下一个token预测（自回归语言建模）和掩码语言建模。

最近，**混合专家 ([MoE](https://zhida.zhihu.com/search?content_id=243927332&content_type=Article&match_order=1&q=MoE&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODE2NjU2ODQsInEiOiJNb0UiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDM5MjczMzIsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.jUns6R7tjKMDaMeXCnny7_S5Pin9fzfrBEGus1eiGV4&zhida_source=entity))** [130]、[131] 在 LLM 领域也变得非常流行。MoE 能够以更少的计算量对模型进行预训练，这意味着人们可以使用与密集模型相同的计算预算大幅扩大模型或数据集的大小。MoE 由两个主要元素组成：稀疏 MoE 层，用于代替密集前馈网络 (FFN) 层，并具有一定数量的“专家”（例如 8 个），其中每个专家都是一个神经网络。实际上，专家是 FFN，但它们也可以是更复杂的网络。门网络或路由器，决定将哪些tokens发送给哪个专家。值得注意的是，人们可以将tokens发送给多个专家。如何将token路由给专家是使用 MoE 时的一个重要决策——路由器由学习到的参数组成，并与网络的其余部分同时进行预训练。如图提供用于 MoE 的Switch Transformer编码器块的图示。

![Image 9](https://picx.zhimg.com/v2-aa2d9b6a371d6a4dcf823a0ddff20a2f_1440w.jpg)

**微调和指令调优**方面，为了使基础模型发挥作用，需要使用token数据对其进行微调以适应特定任务（即所谓的监督微调，简称 SFT）。例如，在原始的 BERT 论文 [24] 中，该模型针对 11 个不同的任务进行了微调。虽然较新的 LLM 不再需要使用微调，但它们仍然可以从任务或数据特定的微调中受益。例如，OpenAI 报告称，当使用特定于任务的数据进行微调时，小得多的 GPT-3.5 Turbo 模型可以胜过 GPT-4。

不过，微调不需要针对单个任务执行，并且存在不同的多任务微调方法（例如，参见[132]）。众所周知，对一个或多个任务进行微调可以改善结果并降低提示工程的复杂性，并且可以作为检索增强生成（RAG）的替代方案。此外，还有其他原因建议进行微调。例如，人们可能希望进行微调以将模型暴露给在预训练期间未接触的新数据或专有数据。

**微调 LLM** 的一个重要原因是使响应与人类在通过提示提供指令时的期望保持一致。这就是所谓的指令调优 [133]。不同于提示调优，在指令调优的背景下，重要的是要理解指令是指定 LLM 应完成的任务的提示。指令调优数据集（例如 NaturalInstructions [134]）不仅包括任务定义，还包括其他组件，例如正/负示例或要避免的事情。

用于对 LLM 进行指令调整的具体方法和指令数据集各不相同，但一般来说，指令调优模型的表现优于它们所基于的原始基础模型。例如，InstructGPT [59] 在大多数基准测试中都优于 GPT-3。与 LLaMA 相比，Alpaca [62] 也是如此。

Wang 提出的 Self-Instruct [135] 也是一种流行的方法，他们引入了一个框架，通过引导自己的生成来提高预训练语言模型的指令跟随能力。他们的流水线从语言模型生成指令、输入和输出样本，然后过滤无效或类似的样本，然后再使用它们对原始模型进行微调。

**AI 对齐**是引导 AI 系统朝着人类目标、偏好和原则发展的过程。经过单词预测预训练的 LLM 经常表现出意想不到的行为。例如，它们可能会生成有毒、有害、误导和有偏见的内容。

上面讨论的指令调优使 LLM 更接近对齐。然而，在许多情况下，重要的是要采取进一步的步骤来改善模型的对齐并避免意外行为。

**RLHF（人类反馈中强化学习）**和 **RLAIF（AI 反馈中强化学习）**是两种流行的方法。RLHF 使用奖励模型从人类反馈中学习对齐。经过调整后，该奖励模型能够对不同的输出进行评级，并根据人类给出的对齐偏好对其进行评分。奖励模型向原始 LLM 提供反馈，并使用此反馈进一步调整 LLM [137]。另一方面，从 AI 反馈中进行强化学习将经过预训练且对齐良好的模型直接连接到 LLM，并帮助它从更大、更对齐的模型中学习 [138]。

在另一项最近的工作（称为 **[DPO](https://zhida.zhihu.com/search?content_id=243927332&content_type=Article&match_order=1&q=DPO&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODE2NjU2ODQsInEiOiJEUE8iLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDM5MjczMzIsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.EAuAMNc0X-D_hTEv5qFB7XUwCEWkJCFz4joEA-T0I_Y&zhida_source=entity)**）[139] 中，讨论了 RLHF 是一个复杂且通常不稳定的过程，并尝试用一种新方法解决这个问题。他们利用奖励函数和最优策略之间的映射来表明，这个受约束的奖励最大化问题可以通过一个单步的策略训练进行精确优化，本质上解决了人类偏好数据的分类问题。最终的算法称为直接偏好优化 (DPO)，该算法稳定、高效且计算量小，无需拟合奖励模型、在微调期间从 LM 采样或执行重大超参数调整。使用 DPO 进行微调超出了 RLHF 控制生成情绪的能力，并提高了总结中的响应质量。如图显示了 DPO 与 RLHF 之间的高级比较。

![Image 10](https://picx.zhimg.com/v2-6ca0d654e91193d6f78e7112bc9c065f_1440w.jpg)

更近一些，Ethayarajh提出了一种新的对齐方法，称为**K-T优化 ([KTO](https://zhida.zhihu.com/search?content_id=243927332&content_type=Article&match_order=1&q=KTO&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODE2NjU2ODQsInEiOiJLVE8iLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDM5MjczMzIsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.nPQ5MRKF39-Svz3NFEfoBFDXF27Mqum1YkYdJu95paM&zhida_source=entity))** [136]。与现有的先进方法不同，KTO 不需要成对的偏好数据 (x, yw, yl)，它只需要 (x, y) 和 y 是可取的还是不可取的知识。尽管没有使用成对的偏好，但 KTO 对齐模型在 1B 到 30B 的尺度上被证明比 DPO 对齐模型好或更好。KTO 在现实世界中也比直接偏好优化方法更容易使用，因为它需要的数据类型要丰富得多。例如，每家零售公司都拥有大量的客户互动数据，以及该互动是成功（例如，购买）还是失败（例如，没有购买）。但是，他们几乎没有反事实数据（即，什么会使不成功的客户互动 yl 变成成功的 yw）。如图显示了 KTO 与上面讨论的其他对齐方法之间的高级比较。

![Image 11](https://pic1.zhimg.com/v2-6d4f71c2899cab47d9cfef997f2eaa38_1440w.jpg)

**解码**是指使用预训练的 LLM 生成文本的过程。给定一个输入提示，token化器将输入文本中的每个token转换为相应的token ID。然后，语言模型使用这些token ID 作为输入并预测下一个最可能的token（或tokens序列）。最后，模型生成 logits，使用 softmax 函数将其转换为概率。已经提出了不同的解码策略。其中一些最流行的是贪婪搜索、波束搜索，以及不同的采样技术，如 top-K、top-P（Nucleus采样）。

1) **贪婪搜索**：贪婪搜索将每一步中最可能的tokens作为序列中的下一个tokens，丢弃所有其他潜在备选。可以想象，这是一种简单的方法，可能会失去很多时间一致性和连贯性。它只考虑每一步中最可能的tokens，而不考虑对序列的整体影响。这个属性说明操作很快，但也意味着它可能会错过更好序列，其中可能出现可能性略低的下一个tokens。

2) **波束搜索**：与仅考虑下一个最可能token的贪婪搜索不同，波束搜索考虑 N 个最可能的tokens，其中 N 表示波束的数量。此过程重复进行，直到达到预定义的最大序列长度或出现序列末尾的tokens。此时，选择总得分最高的tokens序列（又称“波束”）作为输出。例如，对于波束大小为 2 且最大长度为 5 的波束搜索，波束搜索需要跟踪 25 = 32 个可能的序列。因此，它比贪婪搜索更耗费计算资源。

3) **Top-k 抽样**：Top-k 抽样是一种使用语言模型生成的概率分布从 k 个最可能的选项中随机选择一个token的技术。这种方法确保优先考虑最可能的 token，同时在选择过程中引入随机性元素。随机性通常通过温度概念引入。温度 T 是一个范围从 0 到 1 的参数，它会影响 softmax 函数生成的概率，使最可能的 token 更具影响力。低温设置会显著改变概率分布（通常用于文本生成，以控制生成输出的“创造性”水平），而高温设置会优先考虑具有更高概率的 token。Top-k 是一种创造性的采样方式，可以与波束搜索一起使用。top-k 采样选择的序列可能不是波束搜索​​中概率最高的序列。但重要的是要记住，最高分数并不总是会产生更现实或更有意义的序列。

4) **Top-p 采样**：Top-p 采样，也称为Nucleus采样，与 top-k 采样的方法略有不同。Nucleus采样不是选择前 k 个最可能的 tokens，而是选择一个截止值 p，使得所选 tokens 的概率总和超过 p。这形成了一个token “nucleus”，可以从中随机选择下一个token。换句话说，在 top-p 采样中，语言模型按降序检查最可能的token，并不断将它们添加到列表中，直到概率总和超过阈值 p。可以想象，这可能更好，特别是对于 top-k tokens没有大概率质量的场景。与 top-k 采样不同，Nucleus采样中包含的tokens数量不是固定的。这种可变性通常会产生更多样化和更具创造性的输出，使nucleus采样在文本生成相关任务中很受欢迎。

还有一个成本有效的技术问题。

**最优训练**：已经开发了许多用于优化 LLM 训练的框架，比如 1）零冗余优化器 (ZeRO)用于优化内存，大大提高了 LLM 的训练速度，同时增加了有效训练的模型大小；ZeRO 消除了数据和模型并行训练中的内存冗余，同时保持了较低的通信量和较高的计算粒度，允许人们根据设备数量按比例缩放模型大小，同时保持高效率；2）接受加权K-V (RWKV)，将 Transformer 的高效并行训练与 RNN 的高效推理相结合；其利用了线性注意机制，并将模型制定为 Transformer 或 RNN，这在训练期间并行化计算并在推理期间保持恒定的计算和内存复杂性，从而导致第一个非 Transformer 架构可扩展到数百亿个参数。

**低秩自适应 (LoRA)**：LoRA是一种流行的轻量级训练技术，可显著减少可训练参数的数量，它基于一个关键洞察：专门任务的微调权重与初始预训练权重之间的差异通常表现出“低内秩”——这意味着它可以很好地用低秩矩阵来近似 [142]。使用 LoRA 进行训练速度更快、内存效率更高，并且产生的模型权重更小（几百 MB），更易于存储和共享。低秩矩阵的一个特性是它们可以表示为两个较小矩阵的乘积。这一认识导致了这样的假设：微调权重和初始预训练权重之间的差异可以表示为两个小得多的矩阵的矩阵乘积。专注于更新这两个较小的矩阵而不是整个原始权重矩阵，可以大大提高计算效率。

**知识蒸馏**：知识蒸馏是从更大的模型中学习的过程 [143]。早期发布的最佳性能模型已经证明，即使将其用于 API 蒸馏方法中，这种方法也非常有用。它也被称为一种将知识从单个模型（实际上是多个模型）中蒸馏成较小模型的方法。通过这种方法创建较小的模型会产生较小的模型尺寸，甚至可以在边缘设备上使用。

**量化**：深度学习的核心是一组应用于矩阵的数学函数，对模型权重具有特定的精度。降低权重的精度可用于减小模型的大小并使其更快。例如，与 Int-8 操作相比，Float-32 操作更慢。此过程称为量化，可应用于不同阶段。模型量化的主要方法可分为：训练后量化和量化-觉察训练。训练后量化涉及两种众所周知的量化训练模型：动态和静态。动态训练后量化在运行时计算量化范围，与静态相比速度较慢。量化-觉察训练将量化标准添加到训练中，并在训练过程中训练和优化量化模型。这种方法确保最终模型具有良好的性能，并且在训练后不需要量化。

* * *

一旦 LLM 经过训练，可以使用它们来为各种任务生成所需的输出。可以通过基本**提示**直接使用 LLM。但是，为了充分发挥其潜力或解决某些缺点，需要通过一些外部手段来增强模型。如图所示是一些讨论的方面：

![Image 12](https://pic4.zhimg.com/v2-65590c4094b0b8874a48e84ea26ce5e9_1440w.jpg)

**LLM的局限性**

LLM 经过训练可以预测 token。虽然微调和对齐可以提高它们的性能并为其能力增加不同的维度，但仍然会出现一些重要的限制，包括：

• 没有状态/记忆。LLM 本身甚至无法记住在之前的提示中发送给它们的内容。对于许多需要某种形式状态的用例来说，这是一个重要的限制。

• 随机的/概率的。如果多次向 LLM 发送相同的提示，可能会得到不同的响应。虽然有一些参数，特别是温度，可以限制响应的变化，但这是它们训练的固有属性，可能会产生问题。

• 拥有陈旧的信息，并且它们自己无法访问外部数据。LLM 本身甚至不知道当前的时间或日期，也无法访问其训练集中不存在的任何信息。

• 通常非常大。这意味着需要许多昂贵的 GPU 机器进行训练和服务。在某些情况下，最大的模型SLA （service level agreement）较差，尤其是在延迟方面。

• 会产生幻觉。LLM 没有“真相”的概念，它们通常接受过好坏参半内容的训练。它们可以给出非常合理但不真实的答案。

**提示设计和工程**

生成式 AI 模型中的提示是用户提供的文本输入，用于指导模型的输出。提示可以是简单的问题，也可以是详细的描述或特定的任务。提示通常由说明、问题、输入数据和示例组成。在实践中，为了从 AI 模型中引出所需的响应，提示必须包含说明或问题，其他元素是可选的。高级提示涉及更复杂的结构，例如“思维链”提示，其中引导模型遵循逻辑推理过程来得出答案。

提示工程是一门快速发展的学科，它塑造了 LLM 和其他生成式 AI 模型的交互和输出。提示工程的本质在于设计最佳提示，以实现生成模型中的特定目标。这个过程不仅是指导模型，还涉及对模型的能力和局限性以及其运行环境的一些理解。

提示工程超越了单纯的提示构建；它需要融合领域知识、对 AI 模型的理解，以及针对不同上下文定制提示的系统方法。这可能涉及创建可根据给定数据集或上下文以编程方式修改的模板。例如，基于用户数据生成个性化响应可能使用动态填充相关用户信息的模板。

此外，提示工程是一个迭代和探索的过程，类似于传统的机器学习实践，如模型评估或超参数调整。该领域的快速发展表明它有可能彻底改变机器学习的某些方面，超越特征或架构工程等传统方法。另一方面，版本控制和回归测试等传统工程实践需要适应这种新范式，就像它们适应其他机器学习方法一样 [156]。

最流行的提示工程方法包括：思维链（COT）、思维树（TOT）、自洽性、反思、专家提示、工作流/链（chains）、模版/轨道（rails）和自动提示工程（APE）。

**外部知识的增强LLM - RAG**

预训练 LLM 的主要限制之一是缺乏最新知识或无法访问私有或特定于用例的信息。这就是检索增强生成 (RAG) 发挥作用的地方 [164]。如图所示是RAG应用于LLM的问答系统：

![Image 13](https://pic2.zhimg.com/v2-b6414b444d428118a45675978c53fc4f_1440w.jpg)

RAG涉及从输入提示中提取查询，并使用该查询从外部知识源（例如搜索引擎或知识图谱，参见下图所示）检索相关信息。

![Image 14](https://pica.zhimg.com/v2-e4545bf73c6d5a4e0ef2fe94bf77125a_1440w.jpg)

然后将相关信息添加到原始提示中并输入到 LLM，以便模型生成最终响应。RAG 系统包括三个重要组成部分：检索、生成、增强 [165]。

由于 RAG 对于构建高级 LLM 系统的重要性，最近开发了几种 RAG-觉察提示技术。其中一种技术是前瞻性主动检索增强生成 ([FLARE](https://zhida.zhihu.com/search?content_id=243927332&content_type=Article&match_order=1&q=FLARE&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODE2NjU2ODQsInEiOiJGTEFSRSIsInpoaWRhX3NvdXJjZSI6ImVudGl0eSIsImNvbnRlbnRfaWQiOjI0MzkyNzMzMiwiY29udGVudF90eXBlIjoiQXJ0aWNsZSIsIm1hdGNoX29yZGVyIjoxLCJ6ZF90b2tlbiI6bnVsbH0.LV8GmkXWcCJaFUmIeTOvQpQYpJtY3FztMXnmaZRJsGc&zhida_source=entity))。

**外部工具使用**

从外部知识源检索信息只是增强 LLM 的潜在方法之一。更一般地说，LLM 可以访问任意数量的外部工具（例如服务的 API）来增强其功能。在这方面，RAG 可以看作是所谓“工具”这一更广泛类别的一个具体实例。

在这种情况下，工具是 LLM 可以利用的外部功能或服务。这些工具扩展了 LLM 可以执行的任务范围，从基本信息检索到与外部数据库或 API 的复杂交互。

与 RAG 中描述的类似，已经开发了几种工具-觉察提示方法，使工具的使用更具可扩展性。一种流行的技术是所谓的自动多步推理和工具使用 ([ART](https://zhida.zhihu.com/search?content_id=243927332&content_type=Article&match_order=1&q=ART&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODE2NjU2ODQsInEiOiJBUlQiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDM5MjczMzIsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.E4sDArnzovwgxDhA85rCk3CzF5S3-t7vr4pWX1dO5ng&zhida_source=entity))。

**LLM智体**

在人工智能的发展史上，人工智能智体的概念已经得到了充分的探索。智体通常是一个自主实体，它可以使用传感器感知环境，根据当前状态做出判断，并根据可用的操作采取相应的行动。

在 LLM 的上下文中，智体是指基于 (增强型) LLM 的专门实例系统，能够自主执行特定任务。这些智体旨在与用户和环境交互，根据输入和交互的预期目标做出决策。智体基于 LLM，能够访问和使用工具，并根据给定的输入做出决策。它们旨在处理需要一定程度的自主性和决策的任务，通常超出简单的响应生成。

像 RAG 和 Tools 一样，已经开发出专门满足基于 LLM 智体需求的提示工程技术。三个这样的例子是：无需观察的推理 (ReWOO)、推理和行动 (ReAct) 和对话支持的解析智体 (DERA)。

## LLM数据集和评估

大语言模型取得了令人鼓舞的成就，但主要问题是它们如何有效地发挥作用，以及如何在特定任务或应用中评估它们的性能。

由于 LLM 的应用前景不断发展，对 LLM 的评估面临着特殊的挑战。开发 LLM 的初衷是提高 NLP 任务的性能，例如翻译、摘要、问答等 [178]。然而，今天很明显，这些模型正在代码生成和金融等不同领域得到应用。此外，LLM 的评估包含几个关键的考虑因素，例如公平性和偏见、事实核查和推理。

LLM的流行数据集如图所示：

![Image 15](https://pic4.zhimg.com/v2-9b93240162e1efac790122c281c4892d_1440w.jpg)

下表是LLM数据集的概览：

![Image 16](https://pica.zhimg.com/v2-26a330bc6e80e3776e58f21ab4f79f1e_1440w.jpg)

大语言模型在某些情况下会产生幻觉答案，仅仅是因为它们是下一个token预测机器。幻觉是衡量大语言模型可信度和可靠性的重要因素之一。另一方面，测量幻觉并不像看起来那么容易，因为每个事实都可以用不同的风格编写，即使是最细微的书写变化也很难察觉。可以合理地假设，如果任何特定的 LLM 更能够检测文本中虚假信息的幻觉，那么它也更值得信赖。HaluEval 是旨在衡量该领域幻觉的数据集之一 [205]。也可以通过另一个模型根据实际答案判断响应来执行评估 [206]。下表展示了基于这些数据集对不同模型的评估。

![Image 17](https://pic3.zhimg.com/v2-b9ce488d6a06e0c6fb722f267cade758_1440w.jpg)

* * *

最后提一下挑战和未来的方向：

*   更高效和更小LLM
*   新的后注意架构范式
*   多模态模型
*   智体应用
*   安全和道德/责任AI
