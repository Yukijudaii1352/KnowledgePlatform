# 2026年春季发布的10个开源权重LLM的综述与比较

- 来源平台: **zhihu**（通过 Jina Reader 公开抓取）
- 原文链接: <https://zhuanlan.zhihu.com/p/2016915071025034388>
- Reader链接: <https://r.jina.ai/https://zhuanlan.zhihu.com/p/2016915071025034388>
- 作者: -

---

Title: 2026年春季发布的10个开源权重LLM的综述与比较

URL Source: https://zhuanlan.zhihu.com/p/2016915071025034388

Markdown Content:
*   Arcee AI 的 Trinity Large (2026年1月27日)
*   [Moonshot AI](https://zhida.zhihu.com/search?content_id=271552916&content_type=Article&match_order=1&q=Moonshot+AI&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODE2NjU3NTUsInEiOiJNb29uc2hvdCBBSSIsInpoaWRhX3NvdXJjZSI6ImVudGl0eSIsImNvbnRlbnRfaWQiOjI3MTU1MjkxNiwiY29udGVudF90eXBlIjoiQXJ0aWNsZSIsIm1hdGNoX29yZGVyIjoxLCJ6ZF90b2tlbiI6bnVsbH0.k0pIBSteBaRJiJUEuAUJMQo-0oJSpXaoljRFc75MM0M&zhida_source=entity) 的 Kimi K2.5 (2026年1月27日)
*   [StepFun](https://zhida.zhihu.com/search?content_id=271552916&content_type=Article&match_order=1&q=StepFun&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODE2NjU3NTUsInEiOiJTdGVwRnVuIiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MjcxNTUyOTE2LCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.5_gc-0Ru4gASho_qUQ5iauUVJmbXAq40fv_JU7QPvTM&zhida_source=entity) Step 3.5 Flash (2026年2月1日)
*   Qwen3-Coder-Next (2026年2月3日)
*   [z.AI](https://link.zhihu.com/?target=https%3A//z.ai/) 的 GLM-5 (2026年2月12日)
*   MiniMax M2.5 (2026年2月12日)
*   Nanbeige 4.1 3B (2026年2月13日)
*   Qwen 3.5 (2026年2月15日)
*   [蚂蚁集团](https://zhida.zhihu.com/search?content_id=271552916&content_type=Article&match_order=1&q=%E8%9A%82%E8%9A%81%E9%9B%86%E5%9B%A2&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODE2NjU3NTUsInEiOiLomoLomoHpm4blm6IiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNzE1NTI5MTYsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.3uYwrlX8MjAJylz-sb2nDCeUwG5qyogI8xSceNZvf7A&zhida_source=entity)的 Ling 2.5 1T & Ring 2.5 1T (2026年2月16日)
*   Cohere 的 Tiny Aya (2026年2月17日)
*   更新 1: Sarvam 30B 和 105B (2026年3月6日)
*   (附注: DeepSeek V4 一旦发布将被加入。)

由于内容广泛，本文中将引用我之前的《[大型大型语言模型架构比较](https://link.zhihu.com/?target=https%3A//magazine.sebastianraschka.com/p/the-big-llm-architecture-comparison)》文章，针对某些技术主题（如专家混合、量子规范、多头潜在注意力等）提供背景信息，以避免重复。

## 1. Arcee AI的Trinity Large：一家美国新兴初创公司，共享开放权重模型

1月27日，Arcee AI（此前我未曾关注过的一家公司）开始在模型中心发布其开源权重的 4000亿参数 Trinity Large 大型语言模型的多个版本，以及两个较小的变体：

*   他们的旗舰大型模型是一个4000亿参数的混合专家模型，拥有130亿激活参数。
*   两个较小的变体是 Trinity Mini（260亿参数，30亿激活参数）和 Trinity Nano（60亿参数，10亿激活参数）。

![Image 1](https://pic4.zhimg.com/v2-cc9ce81f148462d7835f445cd372214f_1440w.jpg)

图1：基于模型集线器配置文件的三一大型架构概述。

除了模型权重，Arcee AI还在GitHub上发布了一份详细的[技术报告](https://link.zhihu.com/?target=https%3A//github.com/arcee-ai/trinity-large-tech-report)（截至2月18日，也在[arxiv](https://link.zhihu.com/?target=https%3A//www.arxiv.org/abs/2602.17004)上），内容丰富。

那么，让我们仔细看看400B旗舰机型。下图2将其与z.AI的[GLM-4.5](https://link.zhihu.com/?target=https%3A//magazine.sebastianraschka.com/p/the-big-llm-architecture-comparison%3Fopen%3Dfalse%23%25C2%25A711-glm-45)进行比较，后者可能是最相似的型号，因其尺寸为355B参数。

![Image 2](https://pic3.zhimg.com/v2-db5ef31af5b6dd6560cde9908feadfc6_1440w.jpg)

图2：Arcee AI Trinity Large 与尺寸相近的 GLM-4.5（400B 对 355B）并列。

正如我们在 Trinity 和 GLM-4.5 的比较中所见，Trinity 模型中增加了几个有趣的架构组件。

首先，是像 Gemma 3、Olmo 3、Xiaomi MiMo 等模型中使用的交替局部：全局（滑动窗口）注意力层。简而言之，滑动窗口注意力是一种稀疏（局部）注意力模式，其中每个 token 只关注最近 t 个 token 的固定大小窗口（例如 4096），而不是关注整个输入（可能多达 n=256,000 个 token）。这将每层的常规注意力成本从序列长度 n 的 O(n²) 降低到大约 O(n·t)，这就是它对长上下文模型有吸引力的原因。

![Image 3](https://picx.zhimg.com/v2-b4d68dc6fff5d7cbd7bf14ce8cabe75d_1440w.jpg)

图3：常规注意力（全局注意力）与滑动窗口注意力（局部注意力）的比较。

但是，Arcee 团队没有采用 Gemma 3 和 Xiaomi 使用的常见的 5:1 局部：全局比率，而是选择了类似于 Olmo 3 的 3:1 比率，以及相对较大的滑动窗口大小 4096（也类似于 Olmo 3）。

该架构还使用了 QK-Norm，这是一种将 RMSNorm 应用于键和查询以稳定训练的技术（如下图4所示），并且在全局注意力层中没有使用位置嵌入，类似于 SmolLM3。

Trinity 还有一种门控注意力形式。它不是完全成熟的 Gated DeltaNet，但它使用了类似于 Qwen3-Next 注意力机制中的门控机制。

也就是说，Trinity 团队修改了标准注意力，在输出线性投影之前，向缩放点积添加了逐元素门控（如下图所示），这减少了注意力汇聚点并改善了长序列的泛化能力。此外，这也有助于训练稳定性。

![Image 4](https://pic3.zhimg.com/v2-0e046f7f278db322744810b26ec77dc2_1440w.jpg)

图4：Trinity Large在注意力机制中使用的门控机制示意图。

此外，Trinity 的技术报告显示，Trinity Large 和 GLM-4.5 基础模型的建模性能几乎相同（我假设他们没有与更新的基础模型进行比较，因为如今许多公司只分享他们微调后的模型）。

你可能已经注意到，在之前的 Trinity Large 架构图中使用了四层（而不是两层）RMSNorm，乍一看这与 Gemma 3 相似。

![Image 5](https://picx.zhimg.com/v2-c61b92696c35f94406bdf3559be82ca9_1440w.jpg)

图5：Arcee Trinity和Gemma 3 RMSNorm并排放置。

总体而言，RMSNorm 的放置位置看起来像 Gemma 3 的风格，但不同之处在于，第二个 RMSNorm（在每个块中）的增益是深度缩放的，这意味着它被初始化为大约 1 / sqrt(L)（其中 L 是总层数）。因此，在训练早期，残差更新从很小的值开始，并随着模型学习到正确的尺度而增长。

![Image 6](https://pic2.zhimg.com/v2-4c51c556c7ea79ba28c39b691e4d8a6f_1440w.jpg)

图6：Arcee Trinity与DeepSeek V3/R1并排的MoE。

其混合专家架构是类似 DeepSeek 的，包含大量小型专家，但使其更粗粒度，这有助于提高推理吞吐量（我们在 Mistral 3 Large 采用 DeepSeek V3 架构时也看到了这一点）。

最后，还有一些关于训练改进的有趣细节（一种新的混合专家负载均衡策略和另一种使用 MuOpt 优化器的策略），但由于本文主要关注架构（并且还有很多开源权重模型要介绍），这些细节就不在讨论范围内了。

## **2. Moonshot AI 的 Kimi K2.5: 一个万亿参数规模的类 DeepSeek 模型**

虽然 Arcee Trinity 基本上匹配了较旧的 GLM-4.5 模型的建模性能，但 Kimi K2.5 是一个在 1 月 27 日发布时就设定了新的开源权重模型性能上限的模型。

令人印象深刻的是，根据他们详细技术报告中的自有基准测试，它在发布时与领先的专有模型不相上下。

![Image 7](https://pic2.zhimg.com/v2-303486f13f993087773937f45f07576f_1440w.jpg)

图7：官方K2.5技术报告中的Kimi K2.5性能基准。

良好的建模性能并不令人意外，与之前介绍的 Arcee Trinity 或 GLM-4.5 相比，因为（与其前身 K2 类似）Kimi K2.5 是一个万亿参数模型，因此比 Trinity 大 2.5 倍，比 GLM-4.5 大 2.8 倍。

总的来说，Kimi K2.5 的架构与 Kimi K2 相似，而 Kimi K2 又是 DeepSeek V3 架构的放大版本。

![Image 8](https://pic4.zhimg.com/v2-8f3bb6d43fa4f5131398870fee4629d9_1440w.jpg)

图8：Kimi K2是DeepSeek V3架构的更大版本。

然而，K2 是一个纯文本模型，而 Kimi K2.5 现在是一个支持视觉的多模态模型。引用技术报告的话：

> Kimi K2.5 是一个原生多模态模型，它通过对大约 15 万亿混合视觉和文本 token 进行大规模联合预训练，在 Kimi K2 的基础上构建而成。

在训练过程中，他们采用了一种早期融合方法，并在早期就将视觉 token 与文本 token 一起输入，正如我在之前的[《理解多模态大型语言模型》](https://link.zhihu.com/?target=https%3A//magazine.sebastianraschka.com/p/understanding-multimodal-llms)文章中讨论的那样。

![Image 9](https://pica.zhimg.com/v2-709ad887595f98b01d1b46c09dfda59c_1440w.jpg)

图9：与大多数当代多模态LLM一样，Kimi K2.5采用方法A，在训练时将视觉符号与文本符号并存。

旁注：在多模态论文中，“早期融合”这个词的含义不幸地被过度加载了。它可能指：

1.   模型在预训练期间看到视觉 token 的时间点。即，视觉 token 从预训练开始（或很早）就混入，而不是在后期阶段。
2.   图像 token 在模型中如何组合。即，它们作为嵌入 token 与文本 token 一起馈入。

在这种情况下，虽然报告中“早期融合”这个术语具体指的是第 1 点（视觉 token 在预训练期间提供的时间），但第 2 点在此处也是成立的。

此外，关于第 1 点，研究人员进行了一项有趣的消融研究，表明模型在预训练早期看到视觉 token 会受益，如下面的注释表所示。

![Image 10](https://picx.zhimg.com/v2-f74e72760eaafbc4447fb4813856cb4b_1440w.jpg)

图10：在训练期间视觉标记数量固定的情况下，如果模型在预训练初期展示的视觉标记数量较少（而不是后期增加更多视觉标记），模型性能会有所提升。Kimi K2.5技术报告中的注释表。

## **3. StepFun 的 Step 3.5 Flash: 在优秀的 Tokens/秒 吞吐量下实现良好性能**

我承认我之前并未关注 Step 模型。这个模型因其有趣的规模、详细的技术报告和快速的 tokens/秒 性能引起了我的注意。

Step 3.5 Flash 是一个 1960亿 参数的模型，比最近的 DeepSeek V3.2 模型（6710亿）小 3 倍多，但在建模性能基准测试上略微领先。根据 Step 团队的说法，Step 3.5 Flash 在 128k 上下文长度下具有 100 tokens/秒 的吞吐量，而根据 Step 模型中心页面的数据，DeepSeek V3.2 在 Hopper GPU 上只有 33 tokens/秒 的吞吐量。

![Image 11](https://pic2.zhimg.com/v2-418fdd2b623237894226091b1cdd9b25_1440w.jpg)

图11：Step 3.5 Flash基准测试，取自Step技术报告。

这种更高性能的一个原因是模型规模较小（1960亿参数的混合专家模型，每个 token 激活 110亿参数，而 6710亿参数的混合专家模型，每个 token 激活 370亿参数），如下图所示。

![Image 12](https://pic2.zhimg.com/v2-afb1ff91f0b2d5b553f8c13ef3a0589f_1440w.jpg)

图12：Step 3.5 Flash与DeepSeek V3.2并排展示。

另一个原因，除了门控注意力（我们之前在讨论 Trinity 时提到过），是多 token 预测。DeepSeek 是采用多 token 预测的先行者，该技术训练 LLM 在每个步骤预测多个未来 token，而不是单个 token。在此，在每个位置 t，小的额外头（线性层）输出 t+1...t+k 的 logits，并且我们对这些偏移的交叉熵损失求和（在多 token 预测论文中，研究者推荐 k=4）。这个额外的信号加速了训练，而推理可能仍然保持一次生成一个 token，如下图所示。

![Image 13](https://picx.zhimg.com/v2-1611bcbd2ed1bcb2edb448828ee0541d_1440w.jpg)

图13：多代币预测与常规下一个代币预测。（左侧子图灵感来源于 MTP纸。）最初，MTP仅在培训中使用，不用于推断;因此，推断时间步（底部）显示了一个单一的下一个标记预测。

DeepSeek V3 报告使用了多 token 预测-1，即在训练期间使用多 token 预测（带 1 个额外 token，而不是 3 个），然后在推理期间使多 token 预测可选。

Step 3.5 Flash 在训练和推理期间都使用具有 3 个额外 token 的多 token 预测（注意，多 token 预测通常不在推理期间使用，这是一个例外）。

注意，前面讨论的 Arcee Trinity 和 Kimi K2.5 没有使用多 token 预测，但其他架构，例如 GLM-4.7 和 MiniMax M2.1，已经使用了类似于 Step 3.5 Flash 的多 token 预测-3 设置。

## **4. Qwen3-Coder-Next: 用于编码的注意力混合架构**

2026 年 2 月初，Qwen3 团队分享了 800亿参数的 Qwen3-Coder-Next 模型（30亿激活参数），该模型因在编码任务上优于 DeepSeek V3.2（370亿激活）、Kimi K2.5 和 GLM-4.7（均为 320亿激活）等大得多的模型而成为头条新闻。

![Image 14](https://pica.zhimg.com/v2-17e2bc456bdb912e210f8fd26f50d420_1440w.jpg)

图14：Qwen3-Coder-Next在编码基准测试中的表现与其他流行编码模型相比;该图出现在官方技术报告中。

此外，如上图基准测试所示，Qwen3-Coder-Next 的 SWE-Bench Pro 性能大致与 Claude Sonnet 4.5 相当（仅略低于 Claude Opus 4.5），对于一个相对较小的开源权重模型来说，这令人印象深刻！

在本地使用 Qwen3-Coder-Next 的 ollama 版本，模型大约需要 48.2 GB 的存储空间和 51 GB 的内存。

![Image 15](https://pic4.zhimg.com/v2-565915b88b3ab8210655a2300a85089b_1440w.jpg)

图15：本地运行Qwen3-Coder-Next。

注意，Qwen3-Coder-Next 背后的架构与 Qwen3-Next 80B 完全相同（事实上，预训练的 Qwen3-Next 80B 作为后续中后训练的基础模型）。下图16展示了Qwen3-Next架构与常规Qwen3 235B模型的结合，供参考。

![Image 16](https://pica.zhimg.com/v2-7a9131081d1ff2b0dd560f69773d5b50_1440w.jpg)

图16：Qwen3-Coder-Next 80B（每个令牌激活3B参数）以及3倍大的Qwen3 235B-A22B架构。

新的 Qwen3 Next 架构之所以突出，是因为尽管比之前的 235B-A22B 模型小 3 倍，但它引入了四倍的专家数量，甚至还增加了一个共享专家。这两个设计选择（高专家数量和包含共享专家）。

另一个亮点是，他们用 Gated DeltaNet + Gated Attention 混合体取代了常规注意力机制，这有助于在内存使用方面实现原生 262k token 上下文长度（235B-A22B 模型原生支持 32k，通过 YaRN 扩展支持 131k）。

那么，这种新的注意力混合体是如何工作的呢？与分组查询注意力相比，分组查询注意力仍然是标准的缩放点积注意力（如前所述，在查询头组之间共享 K/V 以减少 KV 缓存大小和内存带宽，但其解码成本和缓存仍随序列长度增长），他们的混合机制以 3:1 的比例混合了 Gated DeltaNet 块和 Gated Attention 块，如图 17 所示。

![Image 17](https://pica.zhimg.com/v2-be928845fd69d7950cae96ad8a03c5f2_1440w.jpg)

图17：Qwen3-Coder-Next 注意力混合配置。

我们可以将门控注意力块视为分组查询注意力中使用的标准缩放点积注意力，并进行了一些额外的调整。门控注意力与普通分组查询注意力块的主要区别在于：

*   一个输出门（通常按通道，由 sigmoid 控制），在注意力结果被加回残差之前对其进行缩放；
*   用于 QKNorm 的零中心 RMSNorm，而不是标准的 RMSNorm；
*   部分 RoPE（在维度的子集上）。

注意，这些本质上只是对分组查询注意力的稳定性更改。

Gated DeltaNet 是一个更重大的改变。在 DeltaNet 块中，q, k, v 和两个门（α, β）由线性和轻量级卷积层（带归一化）生成，并且该层用一个快速权重 delta 规则更新替代了注意力。

然而，其权衡是，与完整注意力相比，DeltaNet 提供的内容检索精度较低，这就是为什么保留了一个门控注意力层的原因。

鉴于注意力呈二次方增长，添加 DeltaNet 组件是为了提高内存效率。在“线性时间，无缓存”家族中，DeltaNet 块本质上是 Mamba 的替代品。Mamba 使用学习到的状态空间滤波器（本质上是随时间变化的动态卷积）维护一个状态。DeltaNet 维护一个由 α 和 β 更新的小型快速权重内存，并用 q 读取它，仅使用小型卷积来帮助形成 q, k, v, α, β。

有关注意力混合和 Qwen3-Next 架构的更多详细信息，请参阅我之前的文章《超越标准大型语言模型》。

由于本文主要关注 LLM 架构，训练细节不在讨论范围内。然而，感兴趣的读者可以在他们 GitHub 上的详细技术报告中找到更多信息。

## **5.****[z.AI](https://link.zhihu.com/?target=https%3A//z.ai/)****的 GLM-5: 一个新的旗舰开源权重模型**

2 月 12 日发布的 GLM-5 是一件大事，因为在发布时，它似乎与主要的旗舰 LLM 产品（包括 GPT-5.2 extra-high、Gemini Pro 3 和 Claude 4.6 Opus）不相上下。（话虽如此，基准测试性能并不一定能转化为现实世界的性能。）

![Image 18](https://pic2.zhimg.com/v2-6f8c10001800cf4a445d482d31f617d1_1440w.jpg)

图18：GLM-5架构与其GLM-4.7前身并列。底部的基准取自官方GLM-5技术报告。

不久之前，GLM-4.7（2025 年 12 月）还是最强的开源权重模型之一。根据上图 18 所示的基准测试，GLM-5 显示出显著的建模性能提升。这种飞跃可能部分归功于训练流程的改进，但很可能很大程度上归因于其参数数量翻倍，从 GLM-4.7 的 3550亿 增加到 GLM-5 的 7440亿。这种规模的增长现在使 GLM-5 在规模上介于 DeepSeek V3.2（6710亿）和 Kimi K2.5（1万亿）之间。

比较前面讨论过的 Kimi K2.5（1万亿）的基准测试数字，较小的 GLM-5（7440亿）模型似乎略微领先，如下表所示。

![Image 19](https://pica.zhimg.com/v2-b6c4518da4e3350bdfe19d022add8be0_1440w.jpg)

图19：GLM-5（744B）与Kimi K2.5（1T）基准测试性能并排对比（越大越好）。

像 GLM-4.7 以及迄今为止讨论的所有其他模型一样，GLM-5 是一个混合专家模型。每个 token 的激活参数数量仅略有增加，从 GLM-4.7 的 320亿 增加到 GLM-5 的 400亿。

如下图 20 所示，GLM-5 现在采用了 DeepSeek 的多头潜在注意力以及 DeepSeek 稀疏注意力。（我在《从 DeepSeek V3 到 V3.2：架构、稀疏注意力和 RL 更新》一文中更详细地描述了 DeepSeek 稀疏注意力。）

这些修改可能旨在降低处理长上下文时的推理成本。除此之外，整体架构保持相对相似。

![Image 20](https://pic4.zhimg.com/v2-b17021ac07afb71fb39efdd3656916b9_1440w.jpg)

图20：GLM-5和DeepSeek V3.2并排（两个相似架构，规模相近）。

与 GLM-4.7 相比，总规模的增加主要来自于增加专家数量，从 160 个（GLM-4.7）增加到 256 个（GLM-5），并略微增加了层维度（同时保持每个 token 的专家数量为 8 个常规 + 1 个共享专家）。例如，嵌入维度和专家规模从 5,120 增加到 6,144，中间投影大小从 1,536 增加到 2,048。

有趣的是，Transformer 层的数量从 GLM-4.7 的 92 层减少到 GLM-5 的 78 层。我推测这一改变也是为了降低推理成本和改善延迟，因为层深度无法像宽度那样以同样的方式进行并行化。

此外，我还检查了一个独立基准测试（此处为幻觉排行榜），它确实显示 GLM-5 与 Opus 4.5 和 GPT-5.2 相当（同时使用更少的 token）。

![Image 21](https://pic1.zhimg.com/v2-ed53fe783f8b4285c3fc6671b7bc35dc_1440w.jpg)

图21：在整体基准表现旁边，该表增加了来自幻觉排行榜的幻觉率。

此外，查看最新的聚合了各种基准测试的 Artificial Intelligence Index，GLM-5 确实略微领先于 Kimi K2.5，并且仅比 GPT-5.2 (xhigh) 和最近的 Claude Sonnet 4.6 低一分。

![Image 22](https://pic3.zhimg.com/v2-5953812bb5ca0113f2f4d6fc6dfc73f4_1440w.jpg)

图22： 2026年2月21日的人工智能指数快照。

## **6. MiniMax M2.5: 一个“仅”有 2300亿 参数的强大编码模型**

前面提到的 GLM-5 和 Kimi K2.5 是受欢迎的开源权重模型，但根据 OpenRouter 统计，它们与同样在 2 月 12 日发布的 MiniMax M2.5 相比，黯然失色。

![Image 23](https://pica.zhimg.com/v2-17677110d30272b829ae7fbf5a4974ce_1440w.jpg)

图23：2026年2月21日OpenRouter使用快照。

OpenRouter 是一个平台和 API，允许开发者访问来自不同提供商的许多不同 LLM 并路由请求。注意，虽然其使用统计数据是开源权重模型受欢迎程度的一个良好指标，但它严重偏向于开源权重模型（相对于专有模型），因为大多数用户通过官方平台直接使用专有模型。开源权重模型之间也存在使用偏差，因为许多人还通过官方开发者的 API 使用开源权重模型。无论如何，对于大多数用户来说太大而无法在本地运行的模型，它仍然可以作为一个有趣的参考来估测其相对流行度。

现在，回到 MiniMax M2.5。将来自 SWE-Bench Verified 编码基准测试的 GLM-5 数据与报告的 MiniMax M2.5 数据放在一起，后者似乎是一个稍强的模型（至少在编码方面）。

![Image 24](https://pica.zhimg.com/v2-616595244a287fb543142d014cc5ac16_1440w.jpg)

图24：MiniMax M2.5在SWE-Bench上的编码性能已验证

旁注：有趣的是，Opus 4.5 和 Opus 4.6 在 SWE-Bench Verified 上的得分几乎相同。这可能是 LLM 进展停滞的一个指标。不过，我认为这不是真的，因为 Opus 4.6 的用户可以确认该模型在实际使用中确实表现更好。因此，这里更可能的问题是 SWE-Bench Verified 基准测试已经饱和，从现在开始报告它可能不再是一个有意义的基准测试（转而支持其他基准测试，例如 SWE-Bench Pro）。我所说的饱和，是指它可能由于设计问题而包含无法解决的问题（如最近 Reddit 讨论串和 OpenAI 的新文章《为什么 SWE-bench Verified 不再衡量前沿编码能力》中所讨论的）。

无论如何，回到 MiniMax M2.5 性能的话题。从更广泛的基准测试来看，根据 Artificial Intelligence Index 的聚合，GLM-5 仍然领先。这可能不足为奇，因为 GLM-5 仍然是一个比 M2.5 大 4 倍的模型，尽管 tokens/秒 吞吐量非常相似。

![Image 25](https://pica.zhimg.com/v2-21dc9aedc0dd7a73da555ee7b05dcdb0_1440w.jpg)

图25：基于人工智能指数（2026年2月21日）的GLM-5与MiniMax M2.5对比

我认为 MiniMax M2.5 的受欢迎程度部分归功于它是一个更小、更便宜的模型，具有大致相似的建模性能（即性价比高）。

架构方面，MiniMax M2.5 是一个 2300亿 参数的模型，采用相当经典的设计：只是普通的分组查询注意力，没有滑动窗口注意力或其他效率改进。

![Image 26](https://pic4.zhimg.com/v2-21530b1d683cd13ea13e0a11b1c80427_1440w.jpg)

图26：MiniMax M2.5与GLM-5并列。

到目前为止，这也是本报告中第一个没有附带详细技术报告的架构，但你可以在模型中心页面上找到更多信息。

## **7. Nanbeige 4.1 3B: 一个强大的 Llama 3 继任者**

在本节中，我们将转换话题，最终介绍一个可以在笔记本电脑上本地运行的较小模型。但首先，在介绍 Nanbeige 4.1 3B 之前，让我们先了解一些背景。

Qwen 模型一直是非常流行的模型。我经常讲一个故事，几年前我在 NeurIPS LLM 效率挑战赛期间担任顾问时，大多数获胜方案都基于 Qwen 模型。

如今，Qwen3 可能是使用最广泛的开源权重模型套件之一，因为它们涵盖了如此广泛的规模和使用场景（从 0.6B 到 235B）。

特别是较小的模型（80B 及以下，如前所述 Qwen3-Next）非常适合在消费级硬件上本地使用。

![Image 27](https://pic4.zhimg.com/v2-c225e70f47c2d27c8a834bae59a74bf5_1440w.jpg)

图27：开放权重模型的相对采用率。请注意，这显示了Hugging Face模型中心中以其中一个模型为基础进行微调的模型数量。（这并不是本地使用模型的人数，这个数字几乎无法确定。）来源：Atom Project。

我提到这一切的原因是，Nanbeige 4.1 3B 似乎瞄准了 Qwen3 非常流行的“小型”LLM 设备端用例。根据 Nanbeige 4.1 3B 的基准测试，他们的模型远远领先于 Qwen3（鉴于 Qwen3 已发布近一年，这也许并不令人意外）。

![Image 28](https://pic3.zhimg.com/v2-b5cdecfa803e30fe7640d81eb1da74d4_1440w.jpg)

图28：南贝格4.1 3B基准与Qwen3的对比（来源：南贝格4.1 3B模型中心页面）。

架构方面，Nanbeige 4.1 3B 类似于 Qwen3 4B，而 Qwen3 4B 又与 Llama 3.2 3B 非常相似。下面我将 Nanbeige 4.1 3B 放在 Llama 3.2 3B 旁边，因为它们在规模上最相似。

![Image 29](https://pic3.zhimg.com/v2-26f246c41228359c293fc7add712865e_1440w.jpg)

图29：南贝格4.1 3B与Llama 3.2 3B相邻。

Nanbeige 4.1 3B 使用与 Llama 3.2 3B 相同的架构组件，只有一些轻微的规模差异（略小的嵌入维度和略大的中间投影等）。上图中未显示的一个区别是，Nanbeige 没有将输入嵌入权重绑定到输出层权重，而 Llama 3.2 3B 这样做了。（根据我的经验，权重绑定是减少总参数数量的一个好方法，但它几乎总是会导致较差的训练性能，表现为更高的训练和验证损失。）

如前所述，本文主要关注架构比较。在这种情况下，大部分性能提升（与 Nanbeige 4 3B 前身相比）来自于额外的监督微调和强化学习后期训练，但感兴趣的读者可以在详细的技术报告中找到更多信息。

## 8. Qwen3.5 与混合注意力的延续

虽然前一节简要介绍了作为最流行的开源权重模型家族之一的 Qwen3，但它有点过时了，因为它的发布已将近一年（如果我们不考虑面向效率的 Qwen3-Next 变体的话）。然而，Qwen 团队刚刚在 2 月 15 日发布了一个新的 Qwen3.5 模型变体。

Qwen3.5 397B-A17B，一个 3970亿 参数的混合专家模型（每个 token 激活 170亿），是最大的 Qwen3 模型（2350亿 参数）的升级版。（还有一个万亿参数的 Qwen3-Max 模型，但从未作为开源权重模型发布。）

强制的基准测试概览显示，Qwen3.5 全面超越了之前的 Qwen3-Max 模型，并且更侧重于智能体终端编码应用（今年的主题）。Qwen3.5 在纯粹的智能体编码性能（例如，SWE-Bench Verified）方面似乎与 GLM-5 和 MiniMax M2.5 大致相当。

![Image 30](https://pic2.zhimg.com/v2-949c1b5d3417003b28f3e5b894aec5db_1440w.jpg)

图30：官方模型中心页面上的Qwen3.5基准测试概览。

由于 Qwen 团队喜欢发布单独的编码模型（例如，参见我们之前讨论过的 Qwen3-Coder-Next），这让我很好奇潜在的 Qwen3.5-Coder 会表现如何。

架构方面，Qwen3.5 采用了 Qwen3-Next 和 Qwen3-Coder-Next（第 4 节）使用的混合注意力模型（以 Gated DeltaNet 为特色）。这很有趣，因为 Qwen3-Next 模型最初是全注意力 Qwen3 模型的替代方案，但这表明 Qwen 团队现在已经将混合注意力机制采纳到其主要模型系列中。

![Image 31](https://pica.zhimg.com/v2-d3f117aab5cc94a723c54c4ef8739dc0_1440w.jpg)

图31：Qwen3.5与Qwen3（-Coder）-Next架构的比较。

除了扩大模型规模，如上图所示，Qwen3.5 现在还包括多模态支持（以前，这仅在单独的 Qwen3-VL 模型中可用）。

无论如何，Qwen3.5 是 Qwen 系列的一次不错的更新，我希望我们将来也能看到更小的 Qwen3.5 变体！

编辑：就在我完成这篇文章时，Qwen 团队推出了上述较小的模型变体：

*   Qwen3.5-27B
*   Qwen3.5-35B-A3B
*   Qwen3.5-122B-A10B

## **9. 蚂蚁集团的 Ling 2.5 1T 与闪电注意力**

Ling 2.5（以及推理变体 Ring 2.5）是万亿参数的 LLM，采用混合注意力架构，其精神与 Qwen3.5 和 Qwen3-Next 相似。

然而，他们没有使用 Gated DeltaNet，而是使用了一种稍微简单的循环线性注意力变体，称为闪电注意力。此外，Ling 2.5 采用了 DeepSeek 的多头潜在注意力机制。

![Image 32](https://picx.zhimg.com/v2-fc06618e7ee5f1f24bb30c70cf96dfe5_1440w.jpg)

图32：灵2.5对比Qwen3.5;这两种架构都是线性注意力混合体。

就绝对基准性能而言，Ling 2.5 不是最强的模型，但其卖点是在长上下文中具有非常好的效率（由于混合注意力）。不幸的是，没有与 Qwen3.5 的直接比较，但与 Kimi K2（1万亿参数；与 Ling 2.5 规模相同）相比，Ling 2.5 在序列长度为 32k token 时实现了 3.5 倍的吞吐量。

![Image 33](https://pic1.zhimg.com/v2-d3e2ed8760bb9478247dd7bd71eace96_1440w.jpg)

图33：Ling 2.5与Kimi K2的相对吞吐量（相同1万亿参数大小）;注意通量被归一化，Kimi K2显示为1倍（Kimi的吞吐量并非线性，尽管图中看起来线性）。来源：Ling 2.5 型号集线器页面。

## **10. Tiny Aya: 一个具有强大多语言支持的 33.5亿 参数模型**

Tiny Aya 于 2 月 17 日发布，是 Cohere 推出的一个全新的“小型”LLM，据称是 30亿 参数规模级别中“能力最强的多语言开源权重模型”。（根据公告文章，Tiny Aya 优于 Qwen3-4B、Gemma 3 4B 和 Ministral 3 3B）。

这是一个非常适合在本地运行和实验的模型。唯一的缺点是，虽然它是一个开源权重模型，但其许可条款相对受限，仅允许非商业用途。

撇开这一点不谈，Aya 是一个 33.5亿 参数的模型，有几种不同的版本，对个人和（非商业）研究用途很有帮助：

*   tiny-aya-base（基础模型）
*   tiny-aya-global（跨语言和地区的最佳平衡）
*   tiny-aya-fire（针对南亚语言优化）
*   tiny-aya-water（针对欧洲和亚太语言优化）
*   tiny-aya-earth（针对西亚和非洲语言优化）

更具体地说，以下是这些模型所针对的语言列表。

![Image 34](https://picx.zhimg.com/v2-2e508d30342b40c3a44562807b7ebb11_1440w.jpg)

图34：各Aya模型支持的语言。

架构方面，Tiny Aya 是一个经典的解码器风格 Transformer，带有一些值得注意的修改（除了明显的如 SwiGLU 和分组查询注意力之外），如下图所示。

![Image 35](https://pic2.zhimg.com/v2-da8ba734948f1c043dfdbe9b30b337db_1440w.jpg)

图35：Tiny Aya（并联变压器模块）与Qwen3 4B并排。

总体而言，该架构中最值得注意的亮点是并行 Transformer 块。在这里，并行 Transformer 块从相同的归一化输入计算注意力和 MLP，然后在一个步骤中将两者都添加到残差中。我假设这是为了减少层内的串行依赖关系，以提高计算吞吐量。

对于那些熟悉 Cohere 的 Command-A 架构的读者来说，Tiny Aya 似乎是它的一个较小版本。此外，一个有趣的细节是，Tiny Aya 团队放弃了 QK-Norm（一种应用于注意力机制内部的键和查询的 RMSNorm）；QK-Norm 在减少损失峰值方面，对于提高训练稳定性已经变得相当标准。据 Cohere 团队的一位开发人员称，放弃 QK-Norm 是因为“它可能与长上下文性能相互作用”。

如你所知，我偶尔会从头开始编写架构代码。由于我发现并行 Transformer 块非常有趣，而且该模型在低端硬件上运行良好，我出于教育目的从头实现了它，你可以在 GitHub 上找到它。

![Image 36](https://pic3.zhimg.com/v2-5d3b9fad1cab3e28eca61b69ec69a496_1440w.jpg)

图36：从零开始实现微型Aya。

## **结论**

这篇文章是一次旋风式的旅行，涵盖了 2026 年 2 月左右主要的开源权重 LLM 发布。如果说有什么收获的话，那就是存在多种运行良好的模型架构（都源自最初的 GPT 模型）。建模性能可能并不归因于架构设计本身，而是归因于数据集质量和训练方法（这是一个适合单独讨论的话题）。

话虽如此，架构设计仍然是构建成功 LLM 的重要组成部分，许多开发者似乎正朝着增加更多计算性能调整的方向发展。例如，这包括采用 MLA（Kimi K2.5、GLM-5、Ling 2.5）和 DeepSeek 稀疏注意力（GLM-5）以延续 Gated DeltaNet（Qwen3.5）或类似形式的线性注意力（Ling 2.5）。

![Image 37](https://pic3.zhimg.com/v2-31b59172a0f236f2ad39fe5dd24cbec4_1440w.jpg)

图37：本文提及的各种架构所使用的注意力类型。

此外，更经典的效率调整，如分组查询注意力和滑动窗口注意力（Arcee Trinity、Step 3.5 Flash、Tiny Aya）仍然很受欢迎。在新发布的模型中，只有 MiniMax M2.5 和 Nanbeige 4.1 在此方面保持非常经典，仅使用分组查询注意力，没有任何其他效率调整。

## **DeepSeek V4**

DeepSeek V4 是每个人都在期待的模型。不幸的是，截至本文撰写时，它尚未发布。不过，我计划一旦它发布，就将其添加到本文中，很可能是在 3 月的第一周或之前。

另一个有趣的模型是来自印度的 Sarvam（30B 和 100B）。该模型最近被宣布，但尚未发布。请继续关注此处的更新。

## **更新 1: Sarvam 30B 和 105B (2026 年 3 月 6 日)**

正如所承诺的，这里是关于 Sarvam 的简短更新。

在等待 DeepSeek V4 的同时，我们迎来了两个来自印度的非常强大的开源权重 LLM。

有两个规模版本，Sarvam 30B 和 Sarvam 105B 模型（都是推理模型），它们于 3 月 6 日作为开源权重模型发布，并附带了一篇相当详细的公告博客。

有趣的是，较小的 30B 模型使用“经典的”分组查询注意力，而较大的 105B 变体则切换到了 DeepSeek 风格的多头潜在注意力。

![Image 38](https://picx.zhimg.com/v2-19b1d190475a2013511f0d2cc2178a79_1440w.jpg)

图37：Sarvam 30B和105B架构

正如我之前在分析中所写的，两者都是流行的注意力变体，用于减少 KV 缓存大小（上下文越长，与常规注意力相比节省的越多）。

![Image 39](https://pic4.zhimg.com/v2-84f6d36a6145e10eaf1d0c87fb3d6f23_1440w.jpg)

图38：GQA和MLA相较于MHA的相对效率。

MLA 实现起来更复杂，但如果我们根据 2024 年 DeepSeek V2 论文中的消融研究来判断，它可以提供更好的建模性能（据我所知，这仍然是最新的同类比较）。

说到建模性能，105B 模型与类似规模的 LLM 相当：gpt-oss 120B 和 Qwen3-Next (80B)。Sarvam 在某些任务上更好，在其他任务上稍差，但平均大致相同。

![Image 40](https://pic1.zhimg.com/v2-43dd0447e2d8689ae86653e6550c5502_1440w.jpg)

图39：Sarvam博客文章中的注释基准（105B模型），每行中最佳模型被高亮显示。

就 SWE-Bench Verified 而言，它不是最强的编码器，但在智能体推理和任务完成（Tau2）方面出奇地好。它甚至比 Deepseek R1 0528（未在上图中显示）还要好。

考虑到较小的 Sarvam 30B，与 30B 模型最可比的模型可能是 Nemotron 3 Nano 30B，后者在编码（SWE-Bench Verified）和智能体推理（Tau2）方面略微领先，但在其他一些方面（Live Code Bench v6， BrowseComp）稍差。

![Image 41](https://pic2.zhimg.com/v2-be23e6793ad5536ed796e70037f8db83_1440w.jpg)

图39：Sarvam博客文章中的注释基准（30B模型），每行中最佳模型被高亮标示。

不幸的是，上述基准测试中缺少 Qwen3-30B-A3B，据我所知，这是该规模级别中最受欢迎的模型。然而，有趣的是，Sarvam 团队在计算性能分析中将他们的 30B 模型与 Qwen3-30B-A3B 进行了比较，他们发现由于代码和内核优化，Sarvam 的 tokens/秒 吞吐量比 Qwen3 高出 20-40%。

上述基准测试未捕捉到的一点是 Sarvam 在印度语言上的良好表现。根据一个评判模型，Sarvam 团队发现，在处理印度文本时，他们的模型在 90% 的情况下优于其他模型。（由于他们也从头开始构建和训练分词器，Sarvam 在印度语言上的 token 效率也高出 4 倍。）
