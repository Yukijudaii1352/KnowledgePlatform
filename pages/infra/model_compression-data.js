/**
 * model_compression-data.js — 由 pipeline/build.py 于 2026-06-15 17:41:32 自动生成。
 * 源文件：content/infra/model_compression.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "infra",
    "topic_id": "model_compression",
    "topic_name": "模型压缩",
    "page_title": "模型压缩算法总结",
    "page_subtitle": "2026-06-15 版",
    "page_desc": "综述量化、剪枝、蒸馏与稀疏化部署的技术演进，涵盖从经典压缩范式到2026年最新前沿进展。",
    "page_icon": "🗜️",
    "hero_pills": [
      "🏷️ Quantization · Pruning · Distillation · Sparse Inference"
    ],
    "count_pill": "{count} 个算法",
    "image_base": "",
    "overview_from_doc": true,
    "latest_overview_from_doc": true
  },
  "overview": [
    {
      "title": "",
      "body_html": "<h1>大模型量化技术原理：总结</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/11886909512\">https://zhuanlan.zhihu.com/p/11886909512</a></li>\n<li>作者: 吃果冻不吐果冻皮</li>\n</ul>\n<hr />\n<p>大模型量化技术原理：总结</p>\n<h1>大模型量化技术原理：总结</h1>\n<p>作者: 吃果冻不吐果冻皮, 赞: 241</p>\n<p>近年来，随着Transformer、MOE架构的提出，使得深度学习模型轻松突破上万亿规模参数，从而导致模型变得越来越大，因此，我们需要一些大模型压缩技术来降低模型部署的成本，并提升模型的推理性能。 模型压缩主要分为如下几类：</p>\n<ul>\n<li>模型剪枝（Pruning）</li>\n<li>知识蒸馏（Knowledge Distillation）</li>\n<li>模型量化</li>\n</ul>\n<p>本系列将针对一些常见大模型量化方案（GPTQ、LLM.int8()、SmoothQuant、AWQ等）进行讲述。</p>\n<ul>\n<li><a href=\"https://www.zhihu.com/question/627484732/answer/3261671478\">大模型量化概述</a></li>\n<li>\n<p>量化感知训练：</p>\n</li>\n<li>\n<p><a href=\"https://zhuanlan.zhihu.com/p/647589650\">大模型量化感知训练技术原理：LLM-QAT</a></p>\n</li>\n<li>\n<p><a href=\"https://zhuanlan.zhihu.com/p/636215898\">大模型量化感知微调技术原理：QLoRA</a></p>\n</li>\n<li>\n<p>训练后量化：</p>\n</li>\n<li>\n<p><a href=\"https://zhuanlan.zhihu.com/p/680212402\">大模型量化技术原理：GPTQ、LLM.int8()</a></p>\n</li>\n<li><a href=\"https://www.zhihu.com/question/576376372/answer/3388402085\">大模型量化技术原理：SmoothQuant</a></li>\n<li><a href=\"https://zhuanlan.zhihu.com/p/681578090\">大模型量化技术原理：AWQ、AutoAWQ</a></li>\n<li><a href=\"https://zhuanlan.zhihu.com/p/682871823\">大模型量化技术原理：SpQR</a></li>\n<li><a href=\"https://link.zhihu.com/?target=https%3A//juejin.cn/post/7338284106797432873\">大模型量化技术原理：ZeroQuant系列</a></li>\n<li><a href=\"https://www.zhihu.com/question/658712811/answer/3596678896\">大模型量化技术原理：FP8</a></li>\n<li><a href=\"https://link.zhihu.com/?target=https%3A//juejin.cn/post/7412893752090853386\">大模型量化技术原理：FP6</a></li>\n<li><a href=\"https://zhuanlan.zhihu.com/p/5932153295\">大模型量化技术原理：KIVI、IntactKV、KVQuant</a></li>\n<li><a href=\"https://zhuanlan.zhihu.com/p/6281447174\">大模型量化技术原理：Atom、QuaRot</a></li>\n<li>\n<p><a href=\"https://zhuanlan.zhihu.com/p/8047106486\">大模型量化技术原理：QoQ量化及QServe推理服务系统</a></p>\n</li>\n<li>\n<p><a href=\"https://zhuanlan.zhihu.com/write\">大模型量化技术原理：总结</a></p>\n</li>\n</ul>\n<blockquote>\n<p>文章较长，建议先点赞收藏，后续再慢慢观看。另外，我撰写的<strong>大模型相关的博客及配套代码</strong>均整理放置在Github：<a href=\"https://link.zhihu.com/?target=https%3A//github.com/liguodongiot/llm-action/tree/main\">llm-action</a>，有需要的朋友自取。</p>\n</blockquote>\n<p>前面的一系列文章针对目前主流的一些量化方法进行了介绍，本文进行一个总结。</p>\n<h2>基本概念</h2>\n<h3>简介</h3>\n<p>模型量化是一种用于减少神经网络模型大小和计算量的技术，将模型参数（如：权重）从高精度数据类型（如：float32）转换为低精度数据类型（如：int8 或 fp4）。模型量化通过以更少的位数表示数据，可以减少模型尺寸，进而减少在推理时的内存消耗，并且在一些低精度运算较快的处理器上可以增加推理速度，同时仍然可以保持模型的性能。</p>\n<h3>模型量化的粒度</h3>\n<ul>\n<li>per-tensor（又名 per-layer）量化：每层或每个张量只有一个缩放因子，张量内的所有值都被这个缩放因子量化。</li>\n<li>per-channel 量化：卷积核的每个通道都有不同的缩放因子。</li>\n<li>per-token 量化：针对激活而言，针对每一行进行量化。在LLM中，通常与per-channel 量化搭配使用，如：逐Token量化激活，逐通道量化权重。</li>\n<li>per-group/group-wise：，以组为单位。正如 <strong>Q-BERT: Hessian Based Ultra Low Precision Quantization of BERT</strong> 中所说的那样，分组量化的一个特殊情况是，将每个密集矩阵视为一组，每个矩阵都可以有自己的量化范围。而更普遍的情况是<strong>将每个密集矩阵按输出神经元进行分割，每个连续的 N 输出神经元作为一个组</strong>。比如：GPTQ、AWQ中使用128个元素为一组进行量化。有些地方也称为子通道分组（Sub-channel-wise）量化，即将通道划分为更小的子组，以实现更细粒度的精度控制。</li>\n</ul>\n<p>下图展示了不同的量化粒度；其中，d为模型大小/隐藏状态维度；h是一个MHSA（多头自注意）中的Head数。</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-c4f12ac6e06a00e5bd24d73e2807a2bd_1440w.jpg\" /></p>\n<p>下面展示了一些量化方法中不同量化对象的量化粒度：</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-d493f0bec79b92fe813de0a730e67a66_1440w.jpg\" /></p>\n<p>image.png</p>\n<h3>模型量化对象</h3>\n<ul>\n<li>Weight：权重量化是最常见的量化对象。量化权重可达到减少模型内存占用空间。权重在训练完后固定，数值范围与输入无关，可离线完成量化，通常相对容易量化；</li>\n<li>Activation：实际上激活往往是占内存使用的大头，因此量化激活不仅可以大大减少内存占用。更重要的是，结合权重量化可以充分利用整数计算获得模型推理性能的提升。但激活输出随输入变化而变化，需要统计数据动态范围，通常更难量化。</li>\n<li>KV Cache：除了权重和激活量化之外，在大语言模型中的 KV 缓存也会消耗不少的内存。 因此，量化 KV 缓存对于提高模型长序列生成的吞吐量至关重要。</li>\n<li>Gradient：相对上面的量化对象，略微小众一些，主要用于训练场景。在训练深度学习模型时，梯度通常是浮点数，量化梯度可以在分布式计算中减少通信开销，同时，也可以减少反向传播时的开销。</li>\n</ul>\n<blockquote>\n<p>【丹摩智算周年庆】算力限时放血，囤到就是赚到！RTX 4090：0.99元/时、A800仅3.66元/时，每充500返100，周充500即可参与“送1台4090*1个月使用权”限时抽奖。秒杀入口：<a href=\"https://link.zhihu.com/?target=https%3A//damodel.com/register%3Fsource%3D9B270E50\">https://damodel.com/register?source=9B270E50</a></p>\n</blockquote>\n<h3>静态量化与动态量化</h3>\n<p>通常，<strong>对于激活而言</strong>，静态量化是指如果采用具有代表性的校准数据集来为其生成缩放因子和零点，这些参数在模型的整个生命周期中保持不变。静态量化的优点在于推理时的计算效率较高，因为它不需要在运行时动态计算量化参数。然而，由于量化参数是固定的，静态量化可能会引入一些量化误差，从而影响模型的精度</p>\n<p>而动态量化是指在每次前向传递期间计算激活的最小值和最大值，以提供动态的缩放因子以实现高精度。动态量化的优点在于它可以更准确地表示模型的激活值，因为它考虑了运行时的实际数据分布。然而，这种方法的缺点是可能会增加计算开销，因为需要在运行时计算量化参数。动态量化适合于那些对模型精度要求较高的应用场景，尤其是当模型的输入数据分布变化较大时。</p>\n<p>目前，常见的是对激活使用静态量化，其中最小/最大范围是在离线校准阶段计算的。但由于LLM中激活范围差异巨大，将导致准确度显著下降。</p>\n<h3>离线量化与在线量化</h3>\n<p>离线量化是指模型上线前进行量化并生成缩放因子，而在线量化是指模型运行时进行量化。</p>\n<p>动态与静态量化的区别在于是否使用校准集，而离线与在线量化的区别则是量化的时机不同。简单理解就是说<strong>离线静态量化</strong>是指在模型上线推理前使用校准集生成缩放因子，对权重和激活进行量化。<strong>在线动态量化</strong>是指在模型上线推理时，在每次前向传播过程中实时生成缩放因子，对模型对权重和激活进行量化。 而<strong>离线动态量化</strong>通常是指对权重在运行前先进行量化，对激活在运行时进行动态量化。</p>\n<h3>线性量化与非线性量化</h3>\n<p>根据量化数据表示的原始数据范围是否均匀，还可以将量化方法分为线性量化和非线性量化。实际的深度神经网络的权重和激活值通常是不均匀的；因此，理论上使用非线性量化导致的精度损失更小，但在实际推理中非线性量化的计算复杂度较高，通常使用线性量化。 下面着重介绍线性量化的原理。假设 <img alt=\"r\" src=\"https://www.zhihu.com/equation?tex=r\" /> 表示量化前的浮点数，量化后的整数 <img alt=\"q\" src=\"https://www.zhihu.com/equation?tex=q\" /> 可以表示为：</p>\n<p><img alt=\"q=clip(round(\\frac{r}{s})+z,qmin,qmax) \\\" src=\"https://www.zhihu.com/equation?tex=q%3Dclip%28round%28%5Cfrac%7Br%7D%7Bs%7D%29%2Bz%2Cqmin%2Cqmax%29+%5C%5C\" /></p>\n<p>其中，<img alt=\"round(\\cdot)\" src=\"https://www.zhihu.com/equation?tex=round%28%5Ccdot%29\" /> 和 <img alt=\"clip(\\cdot)\" src=\"https://www.zhihu.com/equation?tex=clip%28%5Ccdot%29\" /> 分别表示取整和截断操作，<img alt=\"q_{min}\" src=\"https://www.zhihu.com/equation?tex=q_%7Bmin%7D\" />和<img alt=\"q_{max}\" src=\"https://www.zhihu.com/equation?tex=q_%7Bmax%7D\" />是量化后的最小值和最大值。</p>\n<p><img alt=\"s\" src=\"https://www.zhihu.com/equation?tex=s\" />为缩放系数，表示数据量化的间隔，其求解方式为 <img alt=\"s=\\frac{r_{max}-r_{min}}{q_{max}-q_{min}}\" src=\"https://www.zhihu.com/equation?tex=s%3D%5Cfrac%7Br_%7Bmax%7D-r_%7Bmin%7D%7D%7Bq_%7Bmax%7D-q_%7Bmin%7D%7D\" />，<img alt=\"r_{max}\" src=\"https://www.zhihu.com/equation?tex=r_%7Bmax%7D\" />、<img alt=\"r_{min}\" src=\"https://www.zhihu.com/equation?tex=r_%7Bmin%7D\" />分别表示输入浮点数据中的最大值和最小值， <img alt=\"q_{max}\" src=\"https://www.zhihu.com/equation?tex=q_%7Bmax%7D\" />、<img alt=\"q_{min}\" src=\"https://www.zhihu.com/equation?tex=q_%7Bmin%7D\" />分别表示量化后最大定点值和最小定点值。 <img alt=\"z\" src=\"https://www.zhihu.com/equation?tex=z\" /> 是表示数据偏移的偏置。 <img alt=\"z\" src=\"https://www.zhihu.com/equation?tex=z\" /> 为 0 的量化被称为对称量化， <img alt=\"z\" src=\"https://www.zhihu.com/equation?tex=z\" /> 不为 0 的量化称为非对称量化。对称量化可以避免量化算子在推理中计算z相关的部分，降低推理时的计算复杂度；非对称量化可以根据实际数据的分布确定最小值和最小值，可以更加充分的利用量化数据信息，使得量化导致的损失更低。</p>\n<h3>量化数据类型</h3>\n<p>LLM主要有三种类型量化：</p>\n<ul>\n<li>仅权重量化：只量化每个线性层的权重张量W。</li>\n<li>权重激活量化：量化每个线性层的输入激活X和权重张量W。</li>\n<li>KV缓存量化：量化每个自注意力块中的键张量K和值张量V。</li>\n</ul>\n<p>下面列举了业界的一些量化数据类型的典型方案。</p>\n<p>针对仅权重量化：</p>\n<ul>\n<li>对于 W8A16 量化，代表方法有 MinMax</li>\n<li>对于 W6A16 量化，代表方法有 FP6-LLM</li>\n<li>对于 W4A16 量化，代表方法有 AWQ、GPTQ、SpQR、OmniQuant、QuIP#</li>\n<li>对于 W3A16 量化，代表方法有 GPTQ、SpQR、OmniQuant、QuIP#</li>\n<li>对于 W2A16 量化，代表方法有 OmniQuant、QuIP、QuIP#</li>\n</ul>\n<p>针对权重激活量化：</p>\n<ul>\n<li>对于 W8A8 量化，代表方法有 LLM.int8()、SmoothQuant、ZeroQuant</li>\n<li>对于 W6A6 量化，代表方法有 OmniQuant</li>\n<li>对于 W4A8 量化，代表方法有 QoQ</li>\n<li>对于 W4A4 量化，代表方法有 Atom 、QuaRot、OmniQuant</li>\n</ul>\n<p>针对 KV Cache量化：</p>\n<ul>\n<li>KV8：INT8（LMDeploy、TensorRT-LLM）、FP8（TensorRT-LLM、vLLM）</li>\n<li>KV4：Atom、QuaRot、QoQ</li>\n<li>KV3：KVQuant</li>\n<li>KV2：KVQuant、KIVI</li>\n</ul>\n<h3>量化分类</h3>\n<p>根据应用量化压缩模型的阶段，可以将模型量化分为：</p>\n<ul>\n<li>量化感知训练（Quantization Aware Training, QAT）：在模型训练过程中加入伪量化算子，通过训练时统计输入输出的数据范围可以提升量化后模型的精度，适用于对模型精度要求较高的场景；其量化目标无缝地集成到模型的训练过程中。这种方法使LLM在训练过程中适应低精度表示，增强其处理由量化引起的精度损失的能力。这种适应旨在量化过程之后保持更高性能。</li>\n<li>量化感知微调（Quantization-Aware Fine-tuning，QAF）：在微调过程中对LLM进行量化。主要目标是确保经过微调的LLM在量化为较低位宽后仍保持性能。通过将量化感知整合到微调中，以在模型压缩和保持性能之间取得平衡。</li>\n<li>训练后量化（Post Training Quantization, PTQ）：在LLM训练完成后对其参数进行量化，只需要少量校准数据，适用于追求高易用性和缺乏训练资源的场景。主要目标是减少LLM的存储和计算复杂性，而无需对LLM架构进行修改或进行重新训练。PTQ的主要优势在于其简单性和高效性。但PTQ可能会在量化过程中引入一定程度的精度损失。</li>\n</ul>\n<h2>模型量化方法精要</h2>\n<p>最近两年，业界诞生了很多关于LLM量化方法，比如：LLM.int8() 和 SmoothQuant 都属于 round-to-nearest (RTN) 量化。针对激活中的离群值，SmoothQuant 给出了与 LLM.int8() 不同的解题思路。既然激活的量化比权重的量化难得多，那么可以通过一个平滑系数，把二者的难度综合一下。GPT-Q 则是把量化问题视作优化问题，逐层寻找最优的量化权重。AWQ方法则基于不是所有权重都是同等重要的这一发现，其中只有 0.1%-1% 的权重（salient weights）对模型精度贡献更大，并且这些权重取决于激活值分布而不是权重分布。该方法的量化过程类似于 SmoothQuant，差异主要在于 scale 是基于激活值分布计算得到的。而 SmoothQuant 的 scale 是在校准样本上根据权重和激活值通过公式计算获得。</p>\n<p>下面总结了目前业界主流的大模型量化方法。</p>\n<h3>RTN</h3>\n<p>RTN（Round to Nearest）量化是最简单的量化方法，就是采取四舍五入的方式，把量化权重近似到最近的整数上。对于LLM而言，由于大量异常值的存在，如果单独使用RTN量化，对精度影响较大。通常会采用一些方式抑制异常值之后，再使用RTN量化。</p>\n<h3>LLM-QAT</h3>\n<p>特点：训练感知量化、无数据知识蒸馏、对称 MinMax 均匀量化（线性量化）、逐通道权重量化，逐 Token 激活量化，逐 Token KV缓存量化</p>\n<p>大语言模型中，权重和激活都存在显著的异常值。这些异常值对量化过程有显著影响，因为它们会增加量化步长，同时降低中间值的精度。因此，在量化过程中裁剪这些异常值不利于 LLM 的性能。</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-26706ae233f968e014ba0c973e06ca44_1440w.jpg\" /></p>\n<p>在训练的初始阶段，任何基于裁剪的方法都会导致异常高的困惑度，从而丢失大量信息，并且通过事实证明很难通过微调来恢复。 因此，选择保留这些异常值。</p>\n<p>此外，在具有门控线性单元（GLU）的模型中，激活权重大多是对称分布的。 因此，为权重和激活选择对称 MinMax 量化，对权重采用逐通道量化，对激活采用逐 Token 量化。</p>\n<p>同时，大语言模型推理工程中的KV缓存也会消耗不少的内存，对于 KV 缓存进行逐 Token量化，Key和Value是由 Token 生成的。 在生成过程中，当前的 Key 和 Value 都会被量化，并存储它们对应的缩放因子。在 QAT 的训练过程中，对 key 和 value 的整个激活张量进行量化。并通过将量化函数集成到梯度计算中，确保使用量化的键值对进行有效的训练。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-69b4dec6c5b3562243ff256156198325_1440w.jpg\" /></p>\n<h3>QLoRA</h3>\n<p>特点：量化感知微调、分页优化器、双量化</p>\n<p>QLoRA 将预训练模型量化为 4 比特，然后添加一小组可学习的LoRA权重，这些权重通过量化权重的反向传播梯度进行微调。无论何时使用 QLoRA 权重张量，都会将张量反量化为 BFloat16，然后执行 16 位矩阵乘法。</p>\n<p>在QLoRA 中，提出了两种技术实现来保证 4 比特微调的精度——NF4量化和双量化。NF4数据类型对正态分布数据比INT4/FP4更优。双量化对第一次量化后的那些常量再进行一次量化，进一步减少存储空间。</p>\n<p>此外，还引入了分页优化器，以防止梯度检查点期间的内存峰值，从而导致内存不足的错误；在过去，这些错误使得大模型难以在单台机器上进行微调。使用此功能为优化器状态（Optimizer）分配分页内存，然后在 GPU 内存不足时将其自动卸载到 CPU 内存，并在优化器更新需要时将其加载回 GPU 内存。</p>\n<h3>LLM.int8()</h3>\n<p>特点：W8A8、推理性能差、在模型加载时进行量化、不需要校准集</p>\n<p>LLM.int8()是一种采用混合精度分解的量化方法。该方案先做了一个矩阵分解，对绝大部分权重和激活用8bit量化（vector-wise）。对离群特征的几个维度保留16bit，对其做高精度的矩阵乘法。</p>\n<p>LLM.int8() 通过三个步骤完成矩阵乘法计算:</p>\n<ul>\n<li>从输入的隐含状态中，按列提取异常值 (离群特征，即大于某个阈值的值)。</li>\n<li>对离群特征进行 FP16 矩阵运算，对非离群特征进行量化，做 INT8 矩阵运算；</li>\n<li>反量化非离群值的矩阵乘结果，并与离群值矩阵乘结果相加，获得最终的 FP16 结果。</li>\n</ul>\n<h3>GPTQ</h3>\n<p>特点：W4A16、量化速度慢、离线静态量化</p>\n<p>GPTQ(论文：GPTQ: ACCURATE POST-TRAINING QUANTIZATION FOR GENERATIVE PRE-TRAINED TRANSFORMERS) 是一种仅权重量化方法，其中模型权重被量化为 int4 数值类型，而激活值则保留在 float16。在推理阶段，模型权重被动态地反量化回 float16 并在该数值类型下进行实际的运算；同 OBQ 一样，GPTQ还是从单层量化的角度考虑，希望找到一个量化过的权重，使的新的权重和老的权重之间输出的结果差别最小。</p>\n<p>GPTQ 将权重分组（如：128列为一组）为多个子矩阵（block）。对某个 block 内的所有参数逐个量化，每个参数量化后，需要适当调整这个 block 内其他未量化的参数，以弥补量化造成的精度损失。因此，GPTQ 量化需要准备校准数据集。</p>\n<p>GPTQ 量化过程如下图所示。首先，使用 Cholesky 分解求解 Hessian 矩阵的逆，然后在给定的步骤中对连续列的块（粗体）进行量化，并在该步骤结束时更新剩余的权重（蓝色）。量化过程在每个块内递归应用，白色中间列表示当前正在被量化。</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-46de2ad7e2b45a2aeba549d0edd70fdb_1440w.jpg\" /></p>\n<p>GPTQ 的创新点如下：</p>\n<ul>\n<li>取消贪心算法：OBS 采用贪心策略，先量化对目标影响最小的参数；但 GPTQ 发现直接按顺序做参数量化，对精度影响也不大。这项改进使得参数矩阵每一行的量化可以做并行的矩阵计算（这意味着我们可以独立地对每一行执行量化。即所谓的 per-channel quantization）。对于大模型场景，这项改进使得量化速度快了一个数量级；</li>\n<li>Lazy Batch-Updates：OBQ 对权重一个个进行单独更新，作者发现性能瓶颈实际在于GPU的内存带宽，而且同一个特征矩阵W不同列间的权重更新是不会互相影响的。因此作者提出了延迟批处理的方法，通过延迟一部分参数的更新，一次处理多个（如：128）列，来缓解带宽的压力，大幅提升了计算速度。</li>\n<li>Cholesky(乔莱斯基) 分解：用 Cholesky 分解(一种分解矩阵的方法)求海森矩阵的逆，提前计算好所有需要的信息，在增强数值稳定性的同时，后续更新的过程中再计算，进一步减少了计算量。</li>\n</ul>\n<p>GPTQ的伪代码如下所示。</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-6d44cb77a36df08e59e303b391fe37ad_1440w.jpg\" /></p>\n<h3>SmoothQuant</h3>\n<p>特点：离线静态量化、逐通道对权重缩放，逐 Token对激活缩放，W8A8（对权重进行per-tensor或per-channel，对激活进行per-token或per-tensor）</p>\n<p>SmoothQuant是一种同时确保准确率且推理高效的训练后量化 (PTQ) 方法，可实现 8 比特权重与激活 (W8A8) 量化。</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-39a0d6788c139ea7a4b5e5f370dec1b4_1440w.jpg\" /></p>\n<p>针对大模型而言，权重很容易量化，对于激活值，由于异常值的存在，导致激活则较难量化。作者对比了 per-channel、per-token、per-tensor 激活量化方案。在这几种不同的激活量化方案中。per-tensor量化是最高效的实现方式。但只有逐通道量化（per-channel）保留了精度，但它与 INT8 GEMM Kernel 不兼容。即per-channel量化不能很好地映射到硬件加速的GEMM内核（硬件不能高效执行，从而增加了计算时间）。</p>\n<p>为了进行 vector-wise quantization 以有效利用 INT8 GEMM Kernel，我们只能使用外部维度（即激活的维度 T 和 权重的维度 <img alt=\"C_0\" src=\"https://www.zhihu.com/equation?tex=C_0\" />）的缩放因子，不能使用内部维度（即通道内维度 <img alt=\"C_i\" src=\"https://www.zhihu.com/equation?tex=C_i\" />）。因此，先前的工作对激活都采用了per-token量化，但并不能降低激活的难度。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-bb447a550edca7d11e68d4263b23bf0c_1440w.jpg\" /></p>\n<p>于是 SmoothQuant 提出了一种数学上等价的逐通道缩放变换（per-channel scaling transformation），通过引入平滑因子s来平滑激活异常值，数学上等效的变换将量化难度从激活转移到权重上，从而使模型易于量化，保持精度的同时，还能够保证提升推理速度。</p>\n<p>根据量化方式不同，作者提出三种策略 O1、O2、O3，其计算延迟依次降低。SmoothQuant的O1和O2级成功地保持了浮点精度，而O3级（per-tensor static）虽然延迟更低，但平均精度下降了0.8%，可能是因为静态收集的统计数据与真实评估样本的激活统计数据之间的差异。</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-564a8f9e94f078fe62372bc96d76c7df_1440w.jpg\" /></p>\n<p>在我们实际使用过程中，在SmoothQuant平滑后，对应的存储和计算精度都可以是 INT8 或者 FP8，可以利用 INT8 或者 FP8 的 TensorCore 进行计算。在实现细节上，权重支持 Per-tensor 和 Per-channel 的量化，激活值支持 Per-tensor 和 Per-token 的量化。</p>\n<h3>AWQ</h3>\n<p>特点：W4A16，per-group量化（INT4-g128），量化速度慢</p>\n<p>AWQ（AWQ: Activation-aware Weight Quantization for LLM Compression and Acceleration）方法源于“权重对于LLM的性能并不同等重要”的观察，存在约（0.1%-1%）显著权重对大模型性能影响太大，通过跳过这1%的重要权重（salient weight）不进行量化，可以大大减少量化误差。</p>\n<p>具体如下图所示，左边的(a)使用RTN量化误差较大，中间的(b)通过保留1%的重要权重不量化，量化误差明显降低。但是该方法采用混合精度计算并不是硬件高效的方式。右边则是使用AWQ进行激活感知的仅权重(即W4A16)量化方法，通过逐通道缩放以保护显著权重来减少量化误差，这种方法不存在硬件效率低下的问题。</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-14335c361196cf8031c73505458cb46d_1440w.jpg\" /></p>\n<p>尽管我们只做了权重量化，但要找到显著的权重通道，我们应该根据激活分布而不是权重分布，与较大激活幅度(activation magnitudes)相对应的权重通道更加突出，因为它们处理了更重要的特征。</p>\n<p>对于原始的RTN量化，<img alt=\"y=Q(\\mathbf{w})\\mathbf{x} = \\Delta \\cdot \\text{Round}(\\frac{\\mathbf{w}}{\\Delta}) \\mathbf{x} \" src=\"https://www.zhihu.com/equation?tex=y%3DQ%28%5Cmathbf%7Bw%7D%29%5Cmathbf%7Bx%7D+%3D+%5CDelta+%5Ccdot+%5Ctext%7BRound%7D%28%5Cfrac%7B%5Cmathbf%7Bw%7D%7D%7B%5CDelta%7D%29+%5Cmathbf%7Bx%7D+\" />。</p>\n<p>作者通过对显著权重引入一个s，进行公式的等价变化。即将 w 与 s （s&gt;1）相乘， 然后，再用 x 除以 s。具体如下：</p>\n<p><img alt=\"Q(w\\cdot s)\\cdot \\frac{x}{s} = \\Delta^{'} \\cdot \\text{Round}(\\frac{ws}{\\Delta^{'}}) \\cdot x \\cdot \\frac{1}{s}   \\\" src=\"https://www.zhihu.com/equation?tex=Q%28w%5Ccdot+s%29%5Ccdot+%5Cfrac%7Bx%7D%7Bs%7D+%3D+%5CDelta%5E%7B%27%7D+%5Ccdot+%5Ctext%7BRound%7D%28%5Cfrac%7Bws%7D%7B%5CDelta%5E%7B%27%7D%7D%29+%5Ccdot+x+%5Ccdot+%5Cfrac%7B1%7D%7Bs%7D+++%5C%5C\" /></p>\n<p>最终发现与原始的量化误差比值为 <img alt=\"\\frac{\\Delta^{'}}{\\Delta} \\cdot \\frac{1}{s}\" src=\"https://www.zhihu.com/equation?tex=%5Cfrac%7B%5CDelta%5E%7B%27%7D%7D%7B%5CDelta%7D+%5Ccdot+%5Cfrac%7B1%7D%7Bs%7D\" />。给定 <img alt=\"\\Delta^{'}\\approx\\Delta\" src=\"https://www.zhihu.com/equation?tex=%5CDelta%5E%7B%27%7D%5Capprox%5CDelta\" /> 和 <img alt=\"s&gt;1\" src=\"https://www.zhihu.com/equation?tex=s%3E1\" />, 显著权重 w 的相对误差较小。</p>\n<p>为了同时考虑显著权重和非显著权重，作者选择<strong>自动搜索每个输入通道最佳缩放因子，使某一层量化后的输出差最小</strong>。从形式上看，希望优化以下目标：</p>\n<p><img alt=\"\\mathbf{s}^* = arg_{\\mathbf{s}}min \\mathcal{L}(\\mathbf{s}), \\quad  \\mathcal{L}(\\mathbf{s})=\\lVert Q(\\mathbf{W}\\cdot diag(\\mathbf{s}))  (diag(\\mathbf{s})^{-1} \\cdot \\mathbf{X}) - \\mathbf{W}\\mathbf{X} \\lVert \\\" src=\"https://www.zhihu.com/equation?tex=%5Cmathbf%7Bs%7D%5E%2A+%3D+arg_%7B%5Cmathbf%7Bs%7D%7Dmin+%5Cmathcal%7BL%7D%28%5Cmathbf%7Bs%7D%29%2C+%5Cquad++%5Cmathcal%7BL%7D%28%5Cmathbf%7Bs%7D%29%3D%5ClVert+Q%28%5Cmathbf%7BW%7D%5Ccdot+diag%28%5Cmathbf%7Bs%7D%29%29++%28diag%28%5Cmathbf%7Bs%7D%29%5E%7B-1%7D+%5Ccdot+%5Cmathbf%7BX%7D%29+-+%5Cmathbf%7BW%7D%5Cmathbf%7BX%7D+%5ClVert+%5C%5C\" /></p>\n<p>由于量化函数不可微，我们无法直接用梯度反向传播来优化问题。有一些技术依赖于近似梯度，但我们发现它仍然存在收敛不稳定的问题。</p>\n<p>为了使这一过程更加稳定，我们通过分析影响缩放因子选择的因数，为最佳缩放比例定义了一个搜索空间。</p>\n<p><img alt=\"    \\mathbf{s}=\\mathbf{s_X}^{\\alpha}, \\quad \\alpha^*=\\arg_{\\alpha} min\\mathcal{L}(\\mathbf{s_X}^{\\alpha}) \\\" src=\"https://www.zhihu.com/equation?tex=++++%5Cmathbf%7Bs%7D%3D%5Cmathbf%7Bs_X%7D%5E%7B%5Calpha%7D%2C+%5Cquad+%5Calpha%5E%2A%3D%5Carg_%7B%5Calpha%7D+min%5Cmathcal%7BL%7D%28%5Cmathbf%7Bs_X%7D%5E%7B%5Calpha%7D%29+%5C%5C\" /></p>\n<p>其中，s仅与激活<img alt=\"s_X\" src=\"https://www.zhihu.com/equation?tex=s_X\" />的大小有关，<img alt=\"s_X\" src=\"https://www.zhihu.com/equation?tex=s_X\" />是激活的平均幅值(每个通道)，这里仅使用单个超参数α来平衡显著通道和非显著通道的保护。我们可以通过在 <code>[0, 1]</code> 区间内进行快速网格搜索（grid search）来找到最佳的 α（0 表示我们不进行缩放；1 对应于最激进的缩放）。</p>\n<p>此外，作者还通过应用权重剪裁来进一步最小化 MSE 误差，因为剪裁权重可以进一步帮助减少 <img alt=\"Q(w\\cdot s)\\cdot \\frac{x}{s} = \\Delta^{'} \\cdot \\text{Round}(\\frac{ws}{\\Delta^{'}}) \\cdot x \\cdot \\frac{1}{s}  \" src=\"https://www.zhihu.com/equation?tex=Q%28w%5Ccdot+s%29%5Ccdot+%5Cfrac%7Bx%7D%7Bs%7D+%3D+%5CDelta%5E%7B%27%7D+%5Ccdot+%5Ctext%7BRound%7D%28%5Cfrac%7Bws%7D%7B%5CDelta%5E%7B%27%7D%7D%29+%5Ccdot+x+%5Ccdot+%5Cfrac%7B1%7D%7Bs%7D++\" /> 中的 <img alt=\"\\Delta^{'}\" src=\"https://www.zhihu.com/equation?tex=%5CDelta%5E%7B%27%7D\" />；从而减少量化误差。</p>\n<h3>SpQR</h3>\n<p>特点：仅权重量化、双层量化（对量化元数据进一步进行量化）、非对称（最小-最大）量化</p>\n<p>之前的 LLM 量化算法同等对待低敏感度权重和高敏感度权重；然而这可能会导致次优量化。</p>\n<p>SpQR 提出隔离此类异常值，并以 SpQR 格式有效地对给定模型进行编码。为了利用所得结构，还开发了一种基于压缩稀疏行（CSR）格式的专门稀疏矩阵乘法算法。为了使用 SpQR 进行逐个token生成，将这种稀疏算法与 3-4 比特权重的密集量化矩阵乘法结合起来。与LLM 生成 16 比特推理相比，SpQR 将 LLMs 的内存占用减少了约 3.4 倍或更多，从而实现小于1%的精度损失。</p>\n<p>具体工作原理如下：</p>\n<ul>\n<li>首先，确定并隔离离群权重，发现对其量化会导致不成比例的高误差。因此，将这些权重保持高精度，使用一个稀疏矩阵单独保存；而其他权重存储在低得多的精度中，例如：3 比特格式。</li>\n<li>其次，由于重要参数往往以行或者列聚集，因此实现了一种具有非常小的组大小（group size）的分组量化的变体，例如：16 个连续元素。同时，将量化缩放（scales）本身量化为 3 比特表示(压缩量化元数据)。</li>\n</ul>\n<h3>ZeroQuant</h3>\n<p>特点：W8A8、对权重矩阵使用分组量化、对激活进行逐Token动态量化，不需要校准激活范围</p>\n<p>对于权重矩阵进行分组量化，将整个权重矩阵分成64或128组。同时在设计时考虑了 GPU Ampere 架构（例如: A100）的硬件约束，计算单元基于 Warp Matrix Multiply and Accumulate (WMMA) 的分片大小，实现最佳加速。</p>\n<p>对于激活采用逐Token量化并动态计算每个Token的最小/最大范围，以减少激活引起的量化误差。同时，为了降低应用逐 Token 量化导致的量化和反量化成本（引入了额外的操作，导致 GPU 计算单元和主存之间产生昂贵的数据移动开销），ZeroQuant 构建了一个高度优化的推理后端，例如：采用Kernel融合技术将量化算子与其先前的算子（如：层归一化）融合，以减轻逐 Token 量化的数据移动成本。类似地，在将最终 FP16 结果写回到下一个 FP16 算子（如：GeLU）的主存之前，使用权重和激活量化缩放因子缩放 INT32 累加，以减轻不同 GeMM 输出的反量化成本。</p>\n<h3>ZeroQuant-V2</h3>\n<p>特点：新增了模型参数，拖累了推理的性能</p>\n<p>一种称为低秩补偿（LoRC）的优化方法，该方法通过新增两个两个低秩矩阵来近似量化误差，该方式以最小的模型参数大小的增加来提升模型质量的恢复。同时两个低秩矩阵也可以量化为 8 比特，而不会出现任何性能差异。</p>\n<h3>ZeroQuant-FP</h3>\n<p>特点：W4A8、FP4、FP8</p>\n<p>通过调查显示，对于 LLMs，<strong>FP8 激活始终优于其INT8激活</strong> ，并且在参数超过 10 亿的模型中，性能优势变得更加明显。对于权重量化，<strong>FP4 表现出与 INT4 相当（即使不是更优）的性能</strong>，从而简化了在 H100 等支持 FP 的硬件上的部署。</p>\n<p>本文对权重进行FP4量化对激活进行FP8量化。选择使用的方法与 GPTQ 保持一致。根据 ZeroQuant-V2 ，本文应用了细粒度权重量化（FGQ），并对激活进行 token-wise 量化。此外，本文还将研究ZeroQuant-V2中提出的附加特征 LoRC（低秩补偿），其目的是通过采用低秩矩阵分解来减少权重的量化误差。</p>\n<p>由于 W4A8 在 H100 NVIDIA 硬件中的实际软件实现是需要转换 W 的 FP4 以匹配 A 中使用的 FP8 精度。直接反量化然后再次量化的方法可能会对推理效率产生不利影响。</p>\n<p>为了解决这个问题，我们提出了<strong>位移（bit-shifting）方法</strong>。这意味着，我们不让等式（<code>Q(x) = INT(x − Z)/S − Z</code>）中定义的 S 为任何实值比例因子，而是将 S 限制为 2 的幂，即 <img alt=\"S = 2^n\" src=\"https://www.zhihu.com/equation?tex=S+%3D+2%5En\" />，n ∈ N（当n为负数时，S可以表示分数；当n不为负数时，S可以表示整数。）。</p>\n<p>本文实现了两种方法：</p>\n<ul>\n<li>(M1) 映射到由 2 的幂表示的最接近的值，即让新的scale为 <img alt=\"\\hat{S} = 2^{\\lceil \\log_2(S)\\rceil}\" src=\"https://www.zhihu.com/equation?tex=%5Chat%7BS%7D+%3D+2%5E%7B%5Clceil+%5Clog_2%28S%29%5Crceil%7D\" /></li>\n<li>(M2) 首先收集scales形成向量 <img alt=\"\\mathbf{S} = [S_1, S_2, \\ldots, S_n]\" src=\"https://www.zhihu.com/equation?tex=%5Cmathbf%7BS%7D+%3D+%5BS_1%2C+S_2%2C+%5Cldots%2C+S_n%5D\" /> 。然后取组中的最大值（通常，该集合由矩阵的（多）行组成），记为<img alt=\"S_{\\max}\" src=\"https://www.zhihu.com/equation?tex=S_%7B%5Cmax%7D\" />，将这些元素<img alt=\"S_{\\max}/S_i\" src=\"https://www.zhihu.com/equation?tex=S_%7B%5Cmax%7D%2FS_i\" />调整为2的幂表示，然后定义 <img alt=\"\\hat{S}_i = S_{\\max}/ 2^{\\lceil \\log_2(S_{\\max}/S_i)\\rceil}\" src=\"https://www.zhihu.com/equation?tex=%5Chat%7BS%7D_i+%3D+S_%7B%5Cmax%7D%2F+2%5E%7B%5Clceil+%5Clog_2%28S_%7B%5Cmax%7D%2FS_i%29%5Crceil%7D\" />。与 (M1) 相比，这提供了更好的近似值。</li>\n</ul>\n<p>注意：这种使用 2 的幂的限制，无论是使用 (M1) 还是 (M2)，都可以简化计算，特别是在基于二进制逻辑操作的数字系统中。这是优化计算效率和保持模型性能的方法的关键要素。</p>\n<h3>FP6-LLM（W6A16）</h3>\n<p>特点：W6A16</p>\n<p>FP6量化的一个挑战是缺乏针对这种不规则位宽的高效GPU KERNEL设计。在 FP6-LLM 中设计并实现了TC-FPx，第一个具有 Tensor Core 支持的用于FP6和各种量化位宽(6位、5位、3位等)的浮点权重的GPU系统设计方案，缓解了LLM推理期间的“内存墙”问题。TC-FPx打破了底层GPU硬件的限制，允许GPU支持涉及任意位宽模型权重的矩阵乘法计算。在TC-FPx中，Tensor Cores用于矩阵乘法的密集计算，而SIMT Cores在运行时有效地用于权重反量化，将模型权重反量化为FP16类型，Tensor Core基于此进行计算。它具有以下关键创新:</p>\n<ul>\n<li>运行前比特层级的数据排布转换。用以解决权重具有不规则位宽时不友好的内存访问挑战，实现GPU内存的最优访问；</li>\n<li>运行时高效的SIMT计算。用以最小化权重反量化的运行时开销；</li>\n<li>全栈的高效流水线设计。其 SIMT Core 计算、Tensor Core 计算和GPU内存访问进行高效调度，最大程度提升性能。</li>\n</ul>\n<p>平均而言， FP6 kernel 在 NVIDIA A100 GPU 上进行（因decoder的矩阵形状狭长而导致参数矩阵的访存成为瓶颈的）矩阵乘法时，处理速度比FP16 cuBLAS 基准提高了2.1倍。值得注意的是，通过FP6量化实现的 FP6 kernel 使LLaMA-70b 模型能够在单个 A100 GPU 上运行。这使得其在批处理大小小于32的LLM推理任务中，性能比FP16基准高出1.69到2.65倍。</p>\n<p>尽管FP6量化带来了显著的好处，但当前实现仍面临一些限制。值得注意的是，在 GEMM 因批处理较大或有充足的GPU内存而使得瓶颈变为Tensor Core计算时，本文的仅权重量化kernel可能无法保持其性能优势，尤其是与厂商的优化库如cuBlas相比。然而，本文系统的低内存占用仍是一个关键优势。目前仅支持非混合专家（Non-MoE）结构。此外，当前系统仅与FP16输入模型兼容，因为当前实现的FP6 Kernel仅支持处理FP16的激活。</p>\n<h3>KIVI</h3>\n<p>特点：在线量化、对Token的KV缓存进行分组，在组内对K缓存逐通道量化，对V缓存逐Token量化，KV2</p>\n<p>KIVI开发了一种 2 位非对称 KV 缓存量化方法。通过实验证明对 Key 缓存按通道进行量化，对 Value 缓存按Token进行量化能够有效保持模型的精度。</p>\n<p>由于LLM新生成的Token的Key和Value缓存是按顺序到达的。从实现的角度来看，逐Token的Value缓存量化可以与流式场景很好地结合在一起，新量化的张量按Token维度直接附加到现有的量化的Value缓存中。然而，对于逐通道的 Key 缓存量化，量化过程跨越不同的Token，因此，不能直接在流式场景中实现。为了解决这个问题，KIVI 将 Token 的KV缓存分成两部分，即分组部分和余留部分。分组部分将每 G 个 Token 的 KV 缓存分为一组。在组内分别进行逐Token的Value缓存量化和逐通道的Key缓存量化。而余留部分则保留全精度不进行量化。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-b7f73623f5424289583c400f8853e48c_1440w.jpg\" /></p>\n<h3>IntactKV</h3>\n<p>特点：保持关键词元的KV缓存无损</p>\n<p>IntactKV先使用全精度模型生成关键词元的无损 KV 并将其缓存下来，量化模型在推理时就能直接使用无损的关键词元表征，从而有效提升量化模型精度。通过利用LLM推理时的公共前缀防止给量化模型的推理带来任何额外开销。即IntactKV只包含公共前缀，那么全精度模型在生成IntactKV后就可以被释放。</p>\n<p>此外，缓存的IntactKV还可以作为模型的额外参数做校准来进一步弥补量化误差。比如：在大小为128的校准集上做轻量化训练，可学习参数仅为缓存下来的IntactKV，损失函数采用量化模型和全精度模型输出的 MSE 损失。</p>\n<h3>KVQuant</h3>\n<p>特点：离线量化、基于校准集量化无需进行分组</p>\n<p>KVQuant 通过结合几种新颖的方法来缓解 KV 缓存量化的精度损失。具体的优化技术如下：</p>\n<p>一、逐通道（Per-Channel）对 Key 进行量化，通过调整 Key 激活的量化维度以更好地匹配分布；按通道对Key进行量化也在同期的工作KIVI中被探索，该工作将同一通道中的大幅度值组合在一起以最小化量化误差。他们的按通道量化方法需要进行细粒度分组，同时保持KV缓存的一部分为fp16精度。而本工作则展示了通过利用离线校准集，可以准确地执行按通道量化，而不需要进行分组。</p>\n<p>二、在 RoPE 之前对 Key 进行量化，在旋转位置嵌入之前量化Key激活，以减轻其对量化的影响；同时，为了能够在RoPE之前量化Key，作者<strong>开发了一个融合Kernel，以在反量化后高效应用RoPE</strong>。</p>\n<p>三、非均匀 KV 缓存量化，通过导出每层敏感度加权的非均匀数据类型，以更好地表示分布；</p>\n<p>四、按向量（Per-Vector）密集和稀疏量化，分别隔离每个向量的异常值，以最大限度地减少量化范围中的偏差。</p>\n<p>五、Attention Sink 感知量化，由于 Attention Sink 现象，模型对第一个Token中的量化误差异常敏感。通过仅保留第一个Token为FP16 来确保模型的精度。</p>\n<p>六、在逐通道量化中，更新在线缩放因子是具有挑战性的，因为每个传入通道对应的缩放因子可能需要在 KV 缓存中添加新Token时进行更新。因此，离线（即在运行推理之前使用校准数据）计算统计数据。<strong>采用逐通道量化有效地进行离线校准，从而避免了在线更新缩放因子的需要</strong>。对于逐Token量化，由于存在异常的 Value tokens ，离线校准缩放因子是具有挑战性的。因此，<strong>每个传入Token在线计算缩放因子和异常值阈值</strong>。通过卸载到CPU来有效地在线计算每个Token的异常值阈值。通过<strong>利用定制的量化函数</strong>实现来压缩激活，可以<strong>在线执行逐 Token 的 Value 量化</strong>而不会影响性能。</p>\n<h3>Atom</h3>\n<p>特点：W4A4KV4、对异常值应用INT8量化</p>\n<p>为了在保持准确性的同时将LLMs量化到极低比特精度，Atom结合了一系列针对LLM特性量身定制的量化机制。具体如下：</p>\n<p>一、通过对权重和激活进行混合精度量化与通道重排序，提高量化准确性。同时由于8位（如：FP8和INT8）足以表示异常值，因此对异常值应用INT8量化。</p>\n<p>二、细粒度分组量化<strong>将矩阵分成子组并在每个子组内独立进行量化</strong>，在准确性提升和反量化开销之间提供了权衡。</p>\n<p>三、采用<strong>动态量化</strong>，为每次推理中的每个激活矩阵定制量化参数。为了控制动态量化的开销，作者像ZeroQuant的实现一样，将量化操作融合到先前的算子中。由于非对称量化可能会导致显著的运行时开销，因为需要大量的额外计算。为了在吞吐量和准确性之间取得平衡，作者<strong>采用具有精心选择的裁剪阈值进行对称量化</strong>；同时，还在量化权重矩阵时引入了GPTQ，因为这是一个离线过程，可以在不牺牲运行时效率的情况下提升准确性。</p>\n<p>四、对KV缓存以注意力头的粒度应用非对称低比特量化，以保持高精度。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-678830ea58f41d98e86a803c38a98b3b_1440w.jpg\" /></p>\n<h3>QuaRot</h3>\n<p>特点：W4A4KV4</p>\n<p>由于量化激活很困难，因为它们有较大的异常值。以前的工作依赖于使用校准集来表征异常特征，并在推理期间将它们保留在更高的精度。而本文通过使用随机Hadamard变换旋转模型输入来解决异常特征问题。作者利用计算不变性的思想，将Hadamard变换融合到权重矩阵中，从而得到一个没有异常特征的等效网络。这使得权重、激活和KV缓存可以量化到4比特，而模型精度损失很小。QuaRot由两个阶段组成。</p>\n<ul>\n<li>第一阶段，对模型权重进行运算（以全精度），并在模型的前向传播中插入两个额外的哈达玛（Hadamard）运算（哈达玛矩阵是一种方块矩阵。它的矩阵元素仅包含1或-1。其矩阵中不同的行具备正交性质），有效地抑制了异常值通道。</li>\n<li>第二阶段，使用某种现有方法（GPTQ、RTN等）量化权重，并在前向传播中添加量化操作以实现激活的在线量化。</li>\n</ul>\n<p>默认情况下，使用GPTQ量化权重，而激活则使用简单的RTN方案进行在线量化。</p>\n<h3>QoQ</h3>\n<p>特点：W4A8KV4</p>\n<p>为了实现 W4A8KV4 量化精度的理论吞吐量优势，同时不牺牲大语言模型的有效性。QoQ算法采用渐进式分组量化、SmoothAttention和各种通用量化优化功能。</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-4998abb3fc753bfe24997f190dd9e027_1440w.jpg\" /></p>\n<p>具体如下：</p>\n<p><strong>渐进式分组量化</strong>：给定权重张量，首先<strong>应用逐通道（per-channel）对称INT8量化</strong>，然后，进一步在中间权重张量上<strong>应用逐组（per-group）非对称INT4量化</strong>。对于 W4A8 GEMM 计算，4位量化权重张量将首先根据上述方程反量化为中间8位量化权重张量，然后执行INT8矩阵乘法，就好像是 W8A8 逐通道（per-channel）量化一样。此外，QoQ引入了一个保护范围，允许将反量化操作融合到 W4A8 GEMM Kernel 中，实现全寄存器级并行，最小化CUDA Core开销。</p>\n<p><strong>SmoothAttention</strong>：由于Key矩阵在每个Attention头中都有固定的异常值通道。受SmoothQuant的启发，作者提出<strong>通过逐通道（per-channel）因子缩小 Key 缓存中的异常通道</strong>。为了消除SmoothAttention缩放额外Kernel调用开销，将缩放因子融合到前一层的权重中。</p>\n<p><strong>LLM量化通用优化</strong>：块输入模块旋转（受Quarot、Quip的启发，通过乘以旋转矩阵来旋转块输入激活）、块输出模块平滑（受SmoothQuant的启发）、激活感知的通道重排序（使得具有相似显著性的通道在同一个量化组，降低精度损失）、权重裁剪（减少量化误差）。</p>\n<h2>量化对大模型的影响</h2>\n<p>该部分参考：<strong>Evaluating Quantized Large Language Models</strong></p>\n<h3>量化对模型精度的影响</h3>\n<ul>\n<li>\n<p><strong>越大的模型对于权重和KV Cache量化容忍度更高，而对权重-激活值量化容忍度更低</strong>。出现这种现象的原因可以通过数据分布发现：模型越大，分布在权重和KV Cache中的离群值越少，而分布在激活值中的离群值越多。</p>\n</li>\n<li>\n<p>小模型的 INT4 仅权重量化会导致精度大幅下降，但这种影响会随着模型大小的增加而减弱。</p>\n</li>\n<li>\n<p>INT8 激活导致小型模型的准确度下降最小，但较大的模型表现出更大的下降。</p>\n</li>\n<li>\n<p>利用专家混合（MoE）技术增加模型大小并不一定增强模型对量化的容忍度。</p>\n</li>\n<li>在大多数任务上，大部分LLMs可以通过W4或KV4量化保持其性能。当将LLMs量化到W3或KV3时，所有模型家族中小型模型的性能都会明显下降。此外，对于W2或KV2，大多数模型都会经历显著的性能损失。</li>\n<li>对于权重-激活量化，W4A8 可以达到良好性能。W4A4量化将严重影响LLMs的效果。在具有大批量大小和长文本的实际应用中，一种常见做法是同时量化权重和KV缓存。对于短文本任务，W8KV4几乎无损失。对于长文本任务，W8KV8是更好的选择。</li>\n</ul>\n<h3>量化对不同任务类型能力的影响</h3>\n<p><strong>自然语言处理能力</strong>：</p>\n<p>基本自然语言处理能力包括语言建模、自然语言理解、自然语言生成能力。</p>\n<p>对于多数自然语言处理任务，大多数大模型可以采用W4、W4A8、KV4、W8KV4量化位宽，几乎没有性能损失（&lt;2%）。</p>\n<p>当使用极低的位宽时，如W2或W4A4，若想使用SOTA量化方法将模型性能恢复到类似于FP16的水平是一个很大的挑战。</p>\n<p><strong>涌现能力</strong>：</p>\n<p>大模型的涌现能力包括上下文学习、指令跟随、多步推理、自我校准能力。四类涌现能力对于量化的容忍度由高到低依次为：上下文学习~指令跟随&gt;多步推理~自我校准。</p>\n<p>上下文学习任务：</p>\n<p>对于上下文学习任务，适当增加例子数量（由0到5）可以提升模型（或量化模型）的性能；但例子过多（~10个）时模型性能不会持续，甚至略有下降。</p>\n<p>多步推理任务：</p>\n<p>在多步推理任务中，<strong>数学推理对于量化的容忍度低于常识推理</strong>。对于数学推理任务，模型量化后会出现一些量化前没有出现的错误，主要的错误类型包括抄写错误、漏看条件、计算错误、逻辑错误。</p>\n<p>总的来说，对于较小的模型（小于13B），W8或KV8适合于维持多步推理和自我校准能力。对于较大的模型（大于13B），W4或KV4适合于维持<strong>上下文学习、指令跟随、多步推理、自我校准</strong>的涌现能力。此外，对于大多数大语言模型，<strong>W4A8不会导致显著的性能损失，但W4A4会导致所有模型完全丧失涌现能力</strong>。</p>\n<p><strong>对话能力</strong>：</p>\n<p>多数模型在W8、W8A8、KV4量化位宽下对话能力几乎不损失。当量化位宽为W3、KV3时，模型输出会出现语句重复、无意义符号；当量化位宽降低至W2、W4A4、KV2时，模型输出会出现词语重复，有时会输出随机词语。</p>\n<p><strong>长文本能力</strong>：</p>\n<p>相较于短文本（&lt;4k），输入长文本（&gt;4k）时模型性能对权重和kv cache量化容忍度更低。对于长文本任务，<strong>多数模型对KV Cache量化的容忍度低于对权重、权重-激活量化</strong>。因此在多数情况下，推荐使用W4、W4A8、KV8量化位宽执行长文本任务。</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-1221c89b0ef07270d3f8691f5c059705_1440w.jpg\" /></p>\n<h3>量化对于模型推理性能的影响</h3>\n<ul>\n<li>Weight-only量化可以显著加速decoding阶段，从而改善端到端延迟。</li>\n<li>关于prefill阶段，Weight-only量化可能实际上会增加延迟。</li>\n<li>随着批量大小和输入长度的增加，Weight-only量化所带来的加速效果逐渐减小。</li>\n<li>对于较大的模型，Weight-only量化提供了更大的益处，因为较大模型尺寸的内存访问开销显著增加。</li>\n</ul>\n<h2>如何选择正确量化方法最佳实践</h2>\n<p>下面是TensorRT-LLM中选择量化方法的最佳实践。量化方法包含三个主要组成部分：</p>\n<ul>\n<li>权重精度格式</li>\n<li>激活精度格式</li>\n<li>校准算法</li>\n</ul>\n<p>通常，在小批量推理场景（批量大小≤4）的情况下，推理通常是“内存限制”。在内存限制推理中，吞吐量受权重加载时间（从 GPU 内存到 GPU 缓存）的限制，即推理受到内存带宽的限制。因此，仅权重量化方法（例如：INT4 AWQ 或 INT4-FP8 AWQ，此外还可以考虑微软的FP6-LLM方案）可提供不错的性能提升。</p>\n<p>对于大批量推理场景（例如：批量大小≥16），内存带宽和计算密度都成为关键因素。因此，建议选择权重和激活同时量化以及使用具有较低精度计算Kernel的量化方法。对于批量大小 ≥ 16，量化方法的选择是特定于模型的。建议优先使用 FP8，因为 FP8 几乎不会导致精度下降，并且性能强大。如果 FP8 性能不能满足您的要求，可以尝试 INT4-FP8 AWQ。如果部署在 Ampere GPU 或更早版本上，建议使用 INT4 AWQ 或 INT8 SQ。</p>\n<p>根据特定的使用场景，用户可能对精度下降和校准时间有不同的容忍度。下表是TensorRT-LLM中如何选择量化方法的总结。其中，性能和影响是在 10 多个流行的 LLMs 上测量的而来。</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>量化方法</th>\n<th>小批量性能</th>\n<th>大批量性能</th>\n<th>精度下降</th>\n<th>详情</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>FP8</td>\n<td>中</td>\n<td>中</td>\n<td>非常低</td>\n<td>- 使用 min-max 校准进行 FP8 逐张量（per-tensor）权重和激活量化。  - 将 FP16/BF16 模型压缩至原始大小的 50%。 - 校准时间：分钟。 - 通过 TensorRT、TensorRT-LLM 进行部署。支持的 GPU 架构：Ada、Hopper 及更高版本。</td>\n</tr>\n<tr>\n<td>INT8 SmoothQuant</td>\n<td>中</td>\n<td>中</td>\n<td>中</td>\n<td>- 使用SmoothQuant校准的变体进行 8 位整数量化。 - 逐通道权重量化、逐张量激活量化。 - 将 FP16/BF16 模型压缩至原始大小的 50%。 - 校准时间：分钟。 - 使用 TensorRT、TensorRT-LLM 进行部署。大多数 GPU 都支持。</td>\n</tr>\n<tr>\n<td>INT4 Weights only AWQ (W4A16)</td>\n<td>高</td>\n<td>低</td>\n<td>低</td>\n<td>- - 通过AWQ校准进行 4 位整数仅权重量化（group-wise/block-wise）。 - - 将 FP16/BF16 模型压缩至原始大小的 25%。 - 校准时间：数十分钟。 - 通过 TensorRT-LLM 进行部署。支持的 GPU：Ampere 及更高版本。</td>\n</tr>\n<tr>\n<td>INT4-FP8 AWQ (W4A8)</td>\n<td>高</td>\n<td>中</td>\n<td>低</td>\n<td>- 使用 AWQ校准进行4 位整数权重量化（group-wise/block-wise）、FP8 激活量化（per-tensor） - 将 FP16/BF16 模型压缩至原始大小的 25%。 - 校准时间：数十分钟  - 通过 TensorRT-LLM 部署。支持的 GPU：Ada、Hopper 及更高版本。</td>\n</tr>\n</tbody>\n</table></div>\n<h2>结语</h2>\n<p>本文总结了目前市面上主流的大模型量化方案以及讲述了如何根据特定的场景选择合适的量化算法。</p>\n<p>码字不易，如果觉得我的文章能够能够给您带来帮助，期待您的点赞收藏加关注~~</p>\n<p>参考文档：</p>\n<ul>\n<li><a href=\"https://zhuanlan.zhihu.com/p/695144724\">量化方法怎么选？如何评估量化后的大模型LLM？</a></li>\n<li><a href=\"https://zhuanlan.zhihu.com/p/704228271\">Qllm-Eval：大模型压缩量化方案怎么选？看这一篇就够了</a></li>\n<li><a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/pdf/2402.18158\">Evaluating Quantized Large Language Models</a></li>\n<li><a href=\"https://link.zhihu.com/?target=https%3A//nvidia.github.io/TensorRT-Model-Optimizer/guides/_choosing_quant_methods.html\">Best practices to choose the right quantization methods</a></li>\n<li><a href=\"https://link.zhihu.com/?target=https%3A//medium.com/%40curiositydeck/quantization-granularity-aec2dd7a0bb4\">量化粒度</a></li>\n<li><a href=\"https://link.zhihu.com/?target=https%3A//blog.gopenai.com/model-quantization-3-timing-and-granularity-a0978c6e58d4\">量化时机与粒度</a></li>\n<li><a href=\"https://link.zhihu.com/?target=https%3A//github.com/pytorch/executorch/issues/3559\">what's the meaning of \"Groupwise 4-bit (128)\" #3559</a></li>\n<li><a href=\"https://link.zhihu.com/?target=https%3A//hub.baai.ac.cn/view/34855\">揭秘NVIDIA大模型推理框架：TensorRT-LLM</a></li>\n</ul>"
    }
  ],
  "latest_overview": [
    {
      "title": "",
      "body_html": "<h1>大模型推理部署内存告急？ICLR 2026六种量化与压缩方案帮你省显存</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2040198270664828884\">https://zhuanlan.zhihu.com/p/2040198270664828884</a></li>\n<li>作者: nightli101</li>\n</ul>\n<hr />\n<p>大模型推理部署内存告急？ICLR 2026六种量化与压缩方案帮你省显存</p>\n<h1>大模型推理部署内存告急？ICLR 2026六种量化与压缩方案帮你省显存</h1>\n<p>作者: nightli101, 赞: 1</p>\n<p>这几年大语言模型的参数规模从几十亿飙到几千亿，推理部署的显存压力也跟着水涨船高。一个700亿参数的模型，FP16精度下光是权重就要占140GB左右，再加上KV缓存，普通GPU根本扛不住。模型量化——把权重和激活值压缩到4-bit、2-bit甚至更低——成了让大模型\"瘦身\"最直观的手段。</p>\n<p>最近梳理了一下模型量化与低比特压缩方向的工作——主要来自ICLR 2026，发现研究者们从不同角度提出了各种解决思路：有的在旋转矩阵上做文章抑制异常值，有的发现不同层对量化的敏感度天差地别，还有的干脆重新设计了训练流程让2-bit模型也能做数学推理。这篇综述带你看看几篇有意思的工作。</p>\n<p>__________________________________________________</p>\n<h2>一、为什么模型量化与低比特压缩如此重要</h2>\n<p>大语言模型的推理成本主要由两部分构成：模型权重和KV缓存。以一个常见的Llama架构为例，权重存储量大约是参数量×精度位数÷8。一个70B参数的模型，FP16下权重就要吃掉约140GB显存。再加上推理过程中不断累积的KV缓存，当序列长度达到几万token时，总显存占用可以轻松突破200GB——这还没考虑batch size和中间激活值。</p>\n<p>量化技术的核心思路很简单：把原本16位甚至32位的浮点数映射到更低位宽的整数表示。4-bit量化能把权重体积压缩到原来的1/4，2-bit更是只有1/8。这意味着70B模型在4-bit下只需约35GB显存，2-bit下只要17GB左右，直接从\"服务器专属\"变成了\"消费级显卡可跑\"。</p>\n<p>但问题在于，精度砍得越狠，模型性能掉得越厉害。尤其是推理型LLM——就是那种会输出长长思考链的模型——在低比特下更容易出现灾难性精度崩塌。更麻烦的是，权重里的异常值（outliers）会让量化后的分布严重变形，导致某些层\" quantized 了个寂寞\"。怎么在压缩率和模型能力之间找到平衡，成了这个领域的核心难题。</p>\n<p>__________________________________________________</p>\n<h2>二、几篇值得一看的工作</h2>\n<h3>ParoQuant：用成对旋转抑制异常值，推理LLM的PTQ新思路</h3>\n<p>先来看看UC San Diego的ParoQuant，这篇论文标题是《ParoQuant: Pairwise Rotation Quantization for Efficient Reasoning LLM Inference》。</p>\n<p>ParoQuant想解决什么问题？</p>\n<p>后训练量化（PTQ）的好处是快——不需要重新训练，直接拿现成的模型压精度就行。但PTQ有个老毛病：权重和激活值里的异常值会让量化误差被放大。更头疼的是，推理型LLM的输出是长思维链，量化误差会随着链长不断累积，最后导致答案完全跑偏。现有方法要么抑制异常值的效果不够好，要么引入了过高的推理开销，在实际部署里很难用。</p>\n<p>它是怎么做的？</p>\n<p>ParoQuant的做法很巧妙：把权重矩阵分解成旋转矩阵、缩放矩阵和量化矩阵三部分，通过成对Givens旋转和通道缩放来\"摊平\"异常值。具体来说，独立成对旋转能在保持正交性的同时调整权重分布，而逐通道缩放则进一步均衡各通道的动态范围。更关键的是，他们设计了专用的GPU推理内核，让旋转和缩放的开销变得极低。</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-b0bd9078693653059a276ed93211d8c0_1440w.jpg\" /></p>\n<p><em>架构图</em></p>\n<p><em>你会发现，ParoQuant把权重矩阵拆解成T（旋转）、Q（量化）和S（缩放）三个部分，通过这种方式把原本突兀的异常值\"揉平\"，让低比特表示更精确。</em></p>\n<p>实验结果如何？</p>\n<p>在推理任务上，ParoQuant在仅权重量化下的平均精度优于AWQ，而且推理开销极低。对比表格显示，在Qwen3-14B等模型上，ParoQuant在保持2.2倍加速比的同时，困惑度表现接近最优。有意思的是，在校准数据效率上，ParoQuant用2048×2048的样本量约9小时就能完成，而QTIP需要约20小时。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-1b030609cd760a55471d688cb2af33fe_1440w.jpg\" /></p>\n<p><em>性能对比表</em></p>\n<p><em>你会发现，在R1-Distill-Llama-8B和Qwen3系列模型上，ParoQuant在MMLU、GPQA、AIME等推理基准上的表现明显优于AWQ，尤其在数学推理任务上差距更大。</em></p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-ce8d0f57fc5c9f5bd8befc7d734159bf_1440w.jpg\" /></p>\n<p><em>效率对比表</em></p>\n<p><em>这说明ParoQuant在精度和效率之间找到了不错的平衡——校准数据量适中，GPU时间也控制在合理范围内。</em></p>\n<p>__________________________________________________</p>\n<h3>SliderQuant：不同层敏感度不同，别再\"一刀切\"量化了</h3>\n<p>再来看看Intel Labs China和北京邮电大学合作的SliderQuant，这篇论文标题是《SliderQuant: Accurate Post-Training Quantization for LLMs》。</p>\n<p>SliderQuant想解决什么问题？</p>\n<p>现有PTQ框架有个默认假设：模型的所有层对量化的敏感度是一样的。所以它们用同一套策略处理每一层。但SliderQuant的作者发现，事实并非如此——浅层和深层（尤其是首尾层）对量化误差要敏感得多，中间层反而更鲁棒。在低比特位宽下，这种\"一刀切\"的策略会白白浪费精度预算，导致整体性能下降。</p>\n<p>它是怎么做的？</p>\n<p>SliderQuant引入了\"滑动\"的概念，分两层来做：层间滑动量化针对不同深度的层设计不同的缩放策略，层内滑动量化则在同一层内动态调整激活值范围。整个流程配合增量策略，逐层优化量化参数。简单说，就是\"好钢用在刀刃上\"——把更多的精度预算分配给敏感的层，鲁棒的层则多压一点。</p>\n<p>实验结果如何？</p>\n<p>在Llama2-7B的W4A4配置下，SliderQuant相比SmoothQuant等基线方法优势明显。更有趣的是，在DeepSeek-R1-Distill-Qwen-14B的W2A16极端量化下，OmniQuant几乎完全失效（多数任务得分接近0），而SliderQuant虽然无法恢复到全精度水平，但依然保持了可观的推理能力。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-7e7dea905489dbff42f6e81fc836f0b7_1440w.jpg\" /></p>\n<p><em>核心性能对比</em></p>\n<p><em>在W4A16配置下，SliderQuant的平均准确率（75.00%）明显高于OmniQuant（74.08%），尤其在BoolQ等任务上优势突出。</em></p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-bb287c62d8ba91a98a059ca264b6d858_1440w.jpg\" /></p>\n<p><em>极端量化对比</em></p>\n<p><em>DeepSeek-R1-Distill-Qwen在W2A16下，OmniQuant几乎\"全军覆没\"，SliderQuant却还能撑住，说明分层量化策略在极端压缩场景下确实管用。</em></p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-aaa896435700690796b72d63dbbfa98f_1440w.jpg\" /></p>\n<p><em>低比特鲁棒性</em></p>\n<p><em>在3-bit量化下，SliderQuant的平均准确率（65.44%）显著优于SpQR，证明对层敏感度差异化处理能有效缓解低比特精度损失。</em></p>\n<p>__________________________________________________</p>\n<h3>两阶段QAT：2-bit也能做数学推理？</h3>\n<p>然后来看看Institute of Science Tokyo的工作，这篇论文标题是《Towards Quantization-Aware Training for Ultra-Low-Bit Reasoning LLMs》。</p>\n<p>这篇论文想解决什么问题？</p>\n<p>量化感知训练（QAT）理论上比PTQ效果更好，因为它在训练过程中就让模型适应低比特表示。但现有的QAT方法有个盲区：它们通常只在预训练数据上做校准，忽略了推理能力的特殊需求。结果就是把模型压到2-bit后，数学推理、代码生成这类任务的能力往往断崖式下跌。</p>\n<p>它是怎么做的？</p>\n<p>作者提出了一个两阶段的QAT流程。第一阶段用混合域校准数据（同时包含预训练域和推理域）来做量化，保留跨域能力；第二阶段引入教师模型的奖励修正损失进行微调，专门恢复推理能力。说白了，就是让量化模型既\"记得住知识\"，又\"推得动理\"。</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-840a3b6bab6c0f8601424d64ef9c3cbe_1440w.jpg\" /></p>\n<p><em>架构图</em></p>\n<p><em>对比现有流程只关注预训练数据，新方法在第二阶段引入了推理数据（代码、数学等），通过RL微调用超低比特模型\"找回\"推理能力。</em></p>\n<p>实验结果如何？</p>\n<p>Qwen3-8B-int2模型在MATH-500上拿到了80.13分，远超BitNet b1.58 2B的43.40分。更关键的是训练效率：本文方法在3-bit下仅需约5 GPU小时，而GRPO方法需要220小时——差了44倍。</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-246de141a555eede375f88c051aa04e8_1440w.jpg\" /></p>\n<p><em>与GRPO对比</em></p>\n<p><em>本文方法在3-bit位宽下平均性能（53.4）优于GRPO（52.5），而GPU时间从220小时骤降到5小时，效率提升惊人。</em></p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-88d03331e83e2ceb8bdf931e0b891f4f_1440w.jpg\" /></p>\n<p><em>Qwen3 vs BitNet</em></p>\n<p><em>Qwen3 8B-int2在MATH-500上拿到80.13分，BitNet只有43.40分——参数量级和训练策略的双重优势体现得很明显。</em></p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-a940ad7fc027126022cfe85d8d91534a_1440w.jpg\" /></p>\n<p><em>混合域数据效果</em></p>\n<p><em>引入推理数据后，MATH-500得分从59.53飙升到81.33；混合数据集策略在保持预训练任务表现的同时，整体平均性能最优（52.85）。</em></p>\n<p>__________________________________________________</p>\n<h3>Not All Bits Are Equal：模型规模决定量化策略</h3>\n<p>接下来看看KRAFTON的研究，这篇论文标题是《Not All Bits Are Equal: How Model Scale Changes Memory-Optimal Reasoning》。</p>\n<p>这篇论文想解决什么问题？</p>\n<p>大家默认4-bit量化是\"通用最优\"方案——管你什么模型、什么任务，压到4-bit总没错。但作者发现，这个假设在推理模型上根本不成立。因为推理模型的KV缓存会随着生成长度线性膨胀，对于大模型来说，KV缓存的内存占用很快就超过了权重本身。这时候再死磕4-bit权重量化，反而可能不是最优解。</p>\n<p>它是怎么做的？</p>\n<p>作者通过大量实验发现了一个规模依赖的权衡：有效参数低于8-bit 4B的模型，应该优先保证权重精度（甚至用8-bit或16-bit），而不是追求更长的生成；大模型则相反——应该用更低的权重量化精度，腾出更多内存给KV缓存和测试时计算。他们还发现，数学推理任务里，16-bit和8-bit权重的内存效率其实优于4-bit。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-66af25b1e7c75173d406ab8968341dc2_1440w.jpg\" /></p>\n<p><em>架构图</em></p>\n<p><em>Qwen3系列在AIME25上的内存-准确率权衡曲线揭示了一个反直觉的现象：对于小规模模型，更高精度的权重反而更省内存——因为不需要生成长思维链来补偿能力不足。</em></p>\n<p>实验结果如何？</p>\n<p>作者用GPTQ对Qwen3系列做了系统测试。对于Qwen3-0.6B和Qwen3-1.7B这类小模型，4-bit量化后的推理准确率反而不如8-bit——因为小模型本身能力有限，需要更长的生成链来解题，而4-bit权重进一步削弱了基础能力，导致总内存（权重+KV缓存）不降反升。</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-81faf0124f63ae288c6b83d97f27c7b0_1440w.jpg\" /></p>\n<p><em>模型规格与量化对比</em></p>\n<p><em>Qwen3-4B从16-bit的7.49GB降到4-bit的2.49GB，但KV缓存大小与模型结构强相关——大模型每token的缓存需求（144KB）明显高于小模型（112KB）。</em></p>\n<p>__________________________________________________</p>\n<h3>When Reasoning Meets Compression：压缩到底伤不伤推理？</h3>\n<p>这篇论文标题是《When Reasoning Meets Compression: Understanding the Effects of LLMs Compression on Large Reasoning Mo》，做的是一件很多人想做但没系统做的事：全面评估量化、蒸馏、剪枝三种压缩方法对推理能力的真实影响。</p>\n<p>它想解决什么问题？</p>\n<p>之前的研究大多是\"我这个量化方法多好\"，缺乏对三种主流压缩手段在同一推理模型上的系统对比。更关键的是，压缩导致推理能力下降的底层机制一直是个黑箱——到底是哪些权重被\"压坏\"了？为什么有些任务对压缩很敏感，有些却几乎不受影响？</p>\n<p>它是怎么做的？</p>\n<p>作者设计了一套融合基准测试和机制解释的框架。他们对比了DeepSeek-R1在不同压缩配置下的表现，然后用均值差异和归因补丁技术，定位具体哪些组件（比如MLP的上下投影矩阵）对推理最关键。结果发现：权重数量对知识记忆的影响大于推理，但蒸馏模型的最后一层MLP上投影是关键。</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-e0fe4d4cdcaecae80cbef366259bd240_1440w.jpg\" /></p>\n<p><em>架构图</em></p>\n<p><em>这张图把压缩流程和机制解释流程并排放在一起，左边是各种压缩手段（动态量化、蒸馏、剪枝），右边是通过归因分析定位关键权重的过程。</em></p>\n<p>实验结果如何？</p>\n<p>最惊人的发现是：动态量化到2.51-bit的R1，在某些任务上性能接近甚至超过原版。比如在AIME 2024短题上，2.51-bit模型的准确率达到了100%，高于原始模型。但过度压缩到1.73-bit就会导致AIME长题准确率暴跌到22.2%。还有一个关键发现：在3-bit AWQ量化下，只要把最后一层MLP保留为全精度，AIME 2024得分就能从10.0提升到16.7。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-be2a845b471c03052db08e7457471b5e_1440w.jpg\" /></p>\n<p><em>压缩精度对比</em></p>\n<p><em>DeepSeek-R1在2.51-bit压缩下AIME 2024短题准确率反而提升到100%，但1.73-bit过度压缩导致长题准确率暴跌——适度压缩和过度压缩之间有一条清晰的\"危险线\"。</em></p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-597dcb24d41b67a109d27e27cf1c655b_1440w.jpg\" /></p>\n<p><em>综合性能对比</em></p>\n<p><em>671B参数的DeepSeek-R1经2.51-bit量化后，在AIME 2024和Temporal基准上表现优于原始模型，但1.73-bit压缩使整体平均准确率下降到81.5%。</em></p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-aca7e509b533924d365ac670ec00e69b_1440w.jpg\" /></p>\n<p><em>保留全精度MLP效果</em></p>\n<p><em>最后一层MLP保留全精度后，平均得分从46.0提升到52.57——这说明并非所有层都值得被\"公平\"压缩，关键组件值得特殊保护。</em></p>\n<p>__________________________________________________</p>\n<h3>BEP：彻底抛弃浮点运算，用位运算训练二值神经网络</h3>\n<p>最后要介绍的是来自Politecnico di Milano的BEP，这篇论文标题是《BEP: A Binary Error Propagation Algorithm for Binary Neural Networks Training》。</p>\n<p>BEP想解决什么问题？</p>\n<p>二值神经网络（BNN）把权重和激活都限制在+1/-1，理论上计算复杂度和能耗可以降到极低。但问题是：变量是离散的，传统梯度下降根本用不了。现有方案要么用量子化感知训练（QAT）维护一套全精度参数做反向传播——那BNN的轻量化优势就没了；要么用局部学习规则，但没法处理多层网络的全局信用分配。</p>\n<p>它是怎么做的？</p>\n<p>BEP的核心思路是建立反向传播链式法则的一个离散类比。他们设计了一套完全基于位运算的误差传播规则，让二值向量的误差信号能在多层网络中反向传播——前向、反向、参数更新全部用位运算完成，彻底不需要浮点参数。这是第一个实现循环神经网络端到端二值训练的方案。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-b449be2f7cc730974585e5339b986ebf_1440w.jpg\" /></p>\n<p><em>架构图</em></p>\n<p><em>不同数据集上的测试准确率随参数数量变化的曲线，BEP在多个数据集上追平甚至超过了基于QAT的方法——关键是它全程没用浮点运算。</em></p>\n<p>实验结果如何？</p>\n<p>在内存和计算复杂度上，BEP相比QAT（Adam）有数量级的优势：权重用16位整数，激活用1位；反向传播和参数更新的计算复杂度都降低了约4个数量级。在UCR时间序列分类数据集上，BEP的表现与带批归一化的QAT相当，部分数据集甚至更优。</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-111b8d84b9f6499b550c6f4165352063_1440w.jpg\" /></p>\n<p><em>内存与复杂度对比</em></p>\n<p><em>BEP的反向传播复杂度约为10，而QAT（Adam）高达约10^5——四个数量级的差距，说明完全二值化训练在理论上能极大降低资源开销。</em></p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-5e2c4badae9ad46e0a2d4de495d862a2_1440w.jpg\" /></p>\n<p><em>UCR数据集对比</em></p>\n<p><em>在16个UCR数据集上，BEP与带批归一化的QAT表现相当，JapaneseVowels上甚至略胜一筹——证明纯位运算训练在实际任务中是可行的。</em></p>\n<p>__________________________________________________</p>\n<h2>三、它们之间怎么选</h2>\n<p>ParoQuant和SliderQuant都是后训练量化（PTQ）的路子，但解决的是不同层面的问题。ParoQuant聚焦权重矩阵内部的异常值分布，通过旋转和缩放把\"刺头\"抹平；SliderQuant则从层间差异入手，发现不同深度的层对量化的敏感度完全不同，用滑动策略把精度预算花在刀刃上。如果你要部署推理型LLM且校准时间有限，ParoQuant的GPU时间控制得更紧（约9小时 vs SliderQuant的多种配置）；如果模型层数很深、层间差异大，SliderQuant的分层策略更有针对性。</p>\n<p>Towards QAT走的是完全不同的路。它不在PTQ的框架里做优化，而是直接重新训练模型去适应2-bit甚至更低精度。代价是需要重新训练（虽然只要968M token和5 GPU小时），但一旦训好，推理阶段的精度和稳定性是PTQ难以企及的。如果你要部署一个需要强推理能力（数学、代码）的2-bit模型，这条路几乎是必选项。</p>\n<p>Not All Bits Are Equal则提醒我们：选量化策略之前，先看看模型规模。小模型（&lt;4B有效参数）不要盲目追4-bit，8-bit或16-bit配合适度生成长度可能更省总内存；大模型才应该把权重压到最低，把内存留给KV缓存和测试时计算。</p>\n<p>When Reasoning Meets Compression提供了一套诊断工具。如果你已经有一个压缩后的推理模型但不确定为什么性能下降，它的归因补丁技术可以帮你定位\"罪魁祸首\"是哪一层。更实用的发现是：保护最后一层MLP的全精度，能以很小的内存代价换来显著的性能回升。</p>\n<p>BEP则是面向极端边缘场景的终极方案。如果你不是在部署几百亿参数的大模型，而是在做资源极其受限的嵌入式设备（比如MCU），BEP的纯位运算训练能把能耗和内存压到理论下限。</p>\n<p><strong>简单总结：</strong></p>\n<p>不想重新训练、追求快速部署？选ParoQuant（旋转抑制异常值，推理开销极低）或SliderQuant（分层量化，适配不同层敏感度）。</p>\n<p>要极致低比特（2-bit）且需要强推理能力？Towards QAT的两阶段训练流程几乎是当前最优解。</p>\n<p>不知道选多少bit合适？先看看模型规模——小模型优先保权重精度，大模型优先保KV缓存（Not All Bits Are Equal的结论）。</p>\n<p>压缩后推理能力暴跌？用When Reasoning Meets Compression的诊断方法定位关键层，保留最后一层MLP全精度往往能救场。</p>\n<p>要在极端资源受限设备上跑神经网络？BEP的纯二值训练是最终答案。</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>核心策略</th>\n<th>优势</th>\n<th>局限</th>\n<th>适用场景</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>ParoQuant</td>\n<td>成对旋转+通道缩放抑制异常值</td>\n<td>推理快、校准数据效率高</td>\n<td>对层间差异无特殊处理</td>\n<td>推理型LLM快速部署</td>\n</tr>\n<tr>\n<td>SliderQuant</td>\n<td>层间/层内滑动量化适配敏感度</td>\n<td>分层精度预算分配更合理</td>\n<td>极端低比特下仍有限制</td>\n<td>深层模型PTQ优化</td>\n</tr>\n<tr>\n<td>Towards QAT</td>\n<td>两阶段QAT+混合域校准+奖励修正</td>\n<td>2-bit下推理能力恢复最好</td>\n<td>需要重新训练</td>\n<td>超低比特强推理需求</td>\n</tr>\n<tr>\n<td>Not All Bits Are Equal</td>\n<td>规模依赖的内存-精度权衡分析</td>\n<td>指导不同规模模型选最优策略</td>\n<td>是分析框架而非具体方法</td>\n<td>部署前的策略规划</td>\n</tr>\n<tr>\n<td>Reasoning+Compression</td>\n<td>归因补丁定位压缩敏感组件</td>\n<td>可解释压缩影响机制</td>\n<td>是分析工具非量化方法</td>\n<td>压缩后性能诊断</td>\n</tr>\n<tr>\n<td>BEP</td>\n<td>纯位运算二值误差传播</td>\n<td>计算/内存开销理论下限</td>\n<td>目前主要在中小模型验证</td>\n<td>极端边缘设备</td>\n</tr>\n</tbody>\n</table></div>\n<p>__________________________________________________</p>\n<h2>四、技术趋势与展望</h2>\n<p><strong>当前趋势</strong></p>\n<p>趋势1：从\"一刀切\"走向自适应。SliderQuant和ParoQuant分别从层间差异和通道分布两个维度证明：统一量化策略不是最优解，自适应分配精度预算会成为主流。</p>\n<p>趋势2：量化从\"压缩工具\"变成\"推理策略\"。Not All Bits Are Equal和When Reasoning Meets Compression都指出，量化不仅是压缩手段，更深刻影响着推理模型的行为——比如适度压缩反而可能提升某些任务的表现。</p>\n<p>趋势3：QAT和PTQ的界限在模糊。Towards QAT把训练量降到了968M token和5 GPU小时，已经逼近部分PTQ方法的成本；未来可能出现\"轻量QAT\"或\"可学习PTQ\"的混合范式。</p>\n<p>趋势1：从\"一刀切\"走向自适应。SliderQuant和ParoQuant分别从层间差异和通道分布两个维度证明：统一量化策略不是最优解，自适应分配精度预算会成为主流。</p>\n<p>趋势2：量化从\"压缩工具\"变成\"推理策略\"。Not All Bits Are Equal和When Reasoning Meets Compression都指出，量化不仅是压缩手段，更深刻影响着推理模型的行为——比如适度压缩反而可能提升某些任务的表现。</p>\n<p>趋势3：QAT和PTQ的界限在模糊。Towards QAT把训练量降到了968M token和5 GPU小时，已经逼近部分PTQ方法的成本；未来可能出现\"轻量QAT\"或\"可学习PTQ\"的混合范式。</p>\n<p><strong>值得关注的新方向</strong></p>\n<p>方向1：KV缓存量化的系统研究。目前大部分工作聚焦权重量化，但推理模型的KV缓存膨胀更快。如何对KV缓存做低比特甚至动态量化，可能是下一个爆发点。</p>\n<p>方向2：量化与测试时计算（test-time compute）的联合优化。Not All Bits Are Equal已经开了个头——权重量化精度和生成长度之间存在规模依赖的权衡，把这个权衡做进自动调优框架里会很有价值。</p>\n<p>方向1：KV缓存量化的系统研究。目前大部分工作聚焦权重量化，但推理模型的KV缓存膨胀更快。如何对KV缓存做低比特甚至动态量化，可能是下一个爆发点。</p>\n<p>方向2：量化与测试时计算（test-time compute）的联合优化。Not All Bits Are Equal已经开了个头——权重量化精度和生成长度之间存在规模依赖的权衡，把这个权衡做进自动调优框架里会很有价值。</p>\n<p>__________________________________________________</p>\n<h2>写在最后</h2>\n<p>模型量化领域正在从\"怎么压得更小\"转向\"怎么压得更聪明\"。这六篇工作虽然路线不同，但共同指向一个结论：低比特压缩不是简单的精度-效率权衡，而是一个需要综合考虑模型规模、任务类型、层敏感度甚至测试时计算的多维优化问题。</p>\n<p>__________________________________________________</p>\n<h2>关注我们</h2>\n<p>欢迎关注公众号：<strong>nightli的小记</strong></p>"
    }
  ],
  "graph": {
    "nodes": [
      {
        "id": "qat",
        "x": 2018,
        "y": 100,
        "category": "quantization"
      },
      {
        "id": "gptq",
        "x": 2023,
        "y": 100,
        "category": "quantization"
      },
      {
        "id": "smoothquant",
        "x": 2023,
        "y": 130,
        "category": "quantization"
      },
      {
        "id": "awq",
        "x": 2024,
        "y": 100,
        "category": "quantization"
      },
      {
        "id": "abq_llm",
        "x": 2025,
        "y": 100,
        "category": "quantization"
      },
      {
        "id": "spinquant",
        "x": 2025,
        "y": 130,
        "category": "quantization"
      },
      {
        "id": "efficientqat",
        "x": 2025,
        "y": 160,
        "category": "quantization"
      },
      {
        "id": "lottery_ticket",
        "x": 2019,
        "y": 250,
        "category": "pruning"
      },
      {
        "id": "movement_pruning",
        "x": 2020,
        "y": 250,
        "category": "pruning"
      },
      {
        "id": "sparsegpt",
        "x": 2023,
        "y": 250,
        "category": "pruning"
      },
      {
        "id": "saap",
        "x": 2026,
        "y": 250,
        "category": "pruning"
      },
      {
        "id": "replaceme",
        "x": 2026,
        "y": 280,
        "category": "pruning"
      },
      {
        "id": "vitcop",
        "x": 2026,
        "y": 220,
        "category": "pruning"
      },
      {
        "id": "hinton_kd",
        "x": 2015,
        "y": 400,
        "category": "distillation"
      },
      {
        "id": "distilbert",
        "x": 2019,
        "y": 400,
        "category": "distillation"
      },
      {
        "id": "tinybert",
        "x": 2020,
        "y": 400,
        "category": "distillation"
      },
      {
        "id": "minillm",
        "x": 2024,
        "y": 400,
        "category": "distillation"
      },
      {
        "id": "activeprune",
        "x": 2026,
        "y": 400,
        "category": "distillation"
      },
      {
        "id": "longformer",
        "x": 2020,
        "y": 550,
        "category": "sparsity_deploy"
      },
      {
        "id": "bigbird",
        "x": 2020,
        "y": 580,
        "category": "sparsity_deploy"
      },
      {
        "id": "nm_sparsity",
        "x": 2021,
        "y": 550,
        "category": "sparsity_deploy"
      },
      {
        "id": "permllm",
        "x": 2026,
        "y": 550,
        "category": "sparsity_deploy"
      },
      {
        "id": "gigamoe",
        "x": 2026,
        "y": 520,
        "category": "sparsity_deploy"
      },
      {
        "id": "hierasparse",
        "x": 2026,
        "y": 580,
        "category": "sparsity_deploy"
      }
    ],
    "edges": [
      {
        "from": "qat",
        "to": "smoothquant",
        "label": "离群值优化"
      },
      {
        "from": "qat",
        "to": "efficientqat",
        "label": "效率提升"
      },
      {
        "from": "gptq",
        "to": "awq",
        "label": "激活感知"
      },
      {
        "from": "gptq",
        "to": "spinquant",
        "label": "旋转变换"
      },
      {
        "from": "gptq",
        "to": "sparsegpt",
        "label": "跨域迁移"
      },
      {
        "from": "awq",
        "to": "abq_llm",
        "label": "任意比特"
      },
      {
        "from": "lottery_ticket",
        "to": "movement_pruning",
        "label": "动态剪枝"
      },
      {
        "from": "movement_pruning",
        "to": "replaceme",
        "label": "深度剪枝"
      },
      {
        "from": "sparsegpt",
        "to": "saap",
        "label": "结构感知"
      },
      {
        "from": "saap",
        "to": "vitcop",
        "label": "多模态协同"
      },
      {
        "from": "hinton_kd",
        "to": "distilbert",
        "label": "预训练蒸馏"
      },
      {
        "from": "distilbert",
        "to": "tinybert",
        "label": "多层蒸馏"
      },
      {
        "from": "tinybert",
        "to": "minillm",
        "label": "LLM蒸馏"
      },
      {
        "from": "minillm",
        "to": "activeprune",
        "label": "主动学习"
      },
      {
        "from": "longformer",
        "to": "bigbird",
        "label": "随机注意力"
      },
      {
        "from": "bigbird",
        "to": "hierasparse",
        "label": "分层稀疏"
      },
      {
        "from": "nm_sparsity",
        "to": "permllm",
        "label": "通道排列"
      },
      {
        "from": "nm_sparsity",
        "to": "gigamoe",
        "label": "MoE结合"
      }
    ],
    "milestones": [
      {
        "id": "hinton_kd",
        "year": 2015,
        "description": "奠定知识蒸馏理论基础，开创模型压缩新范式"
      },
      {
        "id": "gptq",
        "year": 2023,
        "description": "首个支持LLM的高效后训练量化，推动大模型压缩普及"
      },
      {
        "id": "permllm",
        "year": 2026,
        "description": "可学习稀疏模式，标志N:M稀疏进入软件定义时代"
      }
    ]
  },
  "algos": [
    {
      "id": "qat",
      "num": 1,
      "name": "QAT",
      "fullName": "量化感知训练 (Quantization-Aware Training)",
      "year": "2018",
      "org": "Google",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1712.05877",
      "projectUrl": "",
      "category": "quantization",
      "motivation": "引入伪量化节点模拟训练中量化误差",
      "summary": "QAT 提出了一套完整的量化感知训练框架：在训练前向传播中插入模拟量化（fake quantization）节点来模拟定点推理的精度损失，配合 Batch Normalization 折叠和 Straight-Through Estimator 反向传播，使得量化后的模型可以在纯整数算术硬件上高效推理，同时将精度损失控制在极小范围内。",
      "keyPoints": [
        "<strong>仿射量化方案</strong>：采用 <span class=\"kb-math kb-math-inline\">r = S(q - Z)</span> 的非对称量化映射，权重和激活量化为 8-bit 整数，bias 量化为 32-bit 整数",
        "<strong>纯整数推理</strong>：矩阵乘法完全在整数域完成，唯一的浮点操作是一个预计算的定点乘数 <span class=\"kb-math kb-math-inline\">M = S_1 S_2 / S_3</span>，通过定点乘法实现",
        "<strong>模拟量化训练（Fake Quantization）</strong>：前向传播中插入 fake_quant 节点模拟量化误差，反向传播使用 STE（Straight-Through Estimator）直通梯度",
        "<strong>量化范围确定</strong>：权重使用逐层 min/max，激活使用 EMA（指数移动平均）跟踪运行范围",
        "<strong>BN 折叠量化</strong>：训练时模拟推理阶段的 BN 折叠效果，对折叠后的等效权重进行量化",
        "<strong>训练 Warmup</strong>：训练初期（50K~2M 步）禁用激活量化，先让网络收敛到合理范围再引入量化噪声",
        "<strong>实验覆盖广泛</strong>：在 ResNet、InceptionV3、MobileNet 上验证，涵盖分类（ImageNet）、检测（COCO）、人脸检测等任务"
      ],
      "detail": "<p><img alt=\"QAT 量化感知训练流程\" src=\"https://arxiv.org/html/1712.05877v1/extracted/figures/training_graph.png\" />\n<em>图：QAT 训练与推理流程对比。训练时在浮点权重/激活后插入 fake_quant 节点模拟量化；推理时将权重直接量化为整数，所有计算在整数域完成。</em></p>\n<pre><code class=\"language-python\"># QAT 核心训练流程伪代码 (Algorithm 1)\n# Phase 1: 构建训练图\nfloat_graph = build_model()                    # 构建浮点模型\nfor layer in float_graph.layers:\n    # 在权重后插入 fake_quant 节点\n    layer.weight = fake_quantize(layer.weight, n_bits=8)\n    # 在激活后插入 fake_quant 节点\n    layer.activation = fake_quantize(layer.activation, n_bits=8)\n\n# Phase 2: 训练（前向模拟量化，反向 STE）\nfor step in range(total_steps):\n    if step &lt; warmup_steps:\n        disable_activation_quantization()       # 初期禁用激活量化\n    else:\n        enable_activation_quantization()\n    loss = forward_with_fake_quant(batch)\n    loss.backward()                             # STE: 梯度直通 fake_quant 节点\n    optimizer.step()\n\n# Phase 3: 导出推理图\nfor layer in float_graph.layers:\n    layer.weight = quantize_to_int8(layer.weight)  # 真正量化为整数\n    layer.bn = fold_into_weight(layer.bn)           # BN 折叠\n# 推理时所有计算在 int8/int32 域完成\n</code></pre>\n<p><strong>动机与背景</strong></p>\n<p>深度神经网络在移动端和嵌入式设备上的部署面临两大挑战：（1）模型体积大，内存受限；（2）浮点运算慢，能耗高。量化（Quantization）将 32-bit 浮点参数压缩为 8-bit 或更低位宽的整数，可以同时解决存储和计算效率问题。然而，直接对训练好的模型进行 Post-Training Quantization（PTQ）往往导致显著的精度损失，尤其是对 MobileNet 等轻量模型。QAT 的核心思想是：<strong>在训练过程中就模拟量化带来的精度损失，让模型学会适应量化噪声</strong>。</p>\n<p><strong>核心机制一：仿射量化方案</strong></p>\n<p>论文采用仿射（非对称）量化，将实数值 <span class=\"kb-math kb-math-inline\">r</span> 映射到整数 <span class=\"kb-math kb-math-inline\">q</span>：</p>\n<div class=\"kb-math kb-math-display\">r = S(q - Z)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">S</span>（scale）和 <span class=\"kb-math kb-math-inline\">Z</span>（zero-point）由数据范围决定：</p>\n<div class=\"kb-math kb-math-display\">S = \\frac{r_{\\max} - r_{\\min}}{q_{\\max} - q_{\\min}}, \\quad Z = \\text{round}\\left(q_{\\min} - \\frac{r_{\\min}}{S}\\right)</div>\n<div class=\"key-point\">💡 <strong>关键</strong>：zero-point <span class=\"kb-math kb-math-inline\">Z</span> 是整数，确保实数 0.0 可以被精确表示为某个量化值。这对 ReLU 激活（大量零值）和 zero-padding 至关重要，避免了系统性偏差。</div>\n<p>权重量化到 <span class=\"kb-math kb-math-inline\">[-127, 127]</span>（int8，排除 -128 以保持对称性），激活量化到 <span class=\"kb-math kb-math-inline\">[0, 255]</span>（uint8，因 ReLU 后非负）。</p>\n<p><strong>核心机制二：纯整数矩阵乘法</strong></p>\n<p>两个量化矩阵相乘时，展开仿射映射后得到：</p>\n<div class=\"kb-math kb-math-display\">q_3^{(i,k)} \\approx Z_3 + M \\sum_{j=1}^{N} \\left(q_1^{(i,j)} - Z_1\\right)\\left(q_2^{(j,k)} - Z_2\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">M = \\frac{S_1 \\cdot S_2}{S_3}</span> 是唯一需要浮点的部分。论文的关键洞察是：<span class=\"kb-math kb-math-inline\">M</span> 总在 <span class=\"kb-math kb-math-inline\">(0, 1)</span> 区间内，可以表示为 <span class=\"kb-math kb-math-inline\">M = 2^{-n} M_0</span>，其中 <span class=\"kb-math kb-math-inline\">M_0 \\in [0.5, 1)</span> 用定点整数乘法实现，<span class=\"kb-math kb-math-inline\">2^{-n}</span> 用位移实现。这样<strong>整个推理过程完全在整数域完成</strong>。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：Bias 使用 int32 量化，其 scale 为 <span class=\"kb-math kb-math-inline\">S_{\\text{bias}} = S_1 \\cdot S_2</span>，zero-point 为 0。由于累加器本身就是 int32，bias 加法无额外开销。</div>\n<p><strong>核心机制三：模拟量化训练（Fake Quantization）</strong></p>\n<p>训练时不真正将权重转为整数，而是在浮点域模拟量化-反量化过程：</p>\n<div class=\"kb-math kb-math-display\">\\text{clamp}(r; a, b) = \\min(\\max(r, a), b)</div>\n<div class=\"kb-math kb-math-display\">s = \\frac{b - a}{n - 1}</div>\n<div class=\"kb-math kb-math-display\">q(r; a, b, n) = \\left\\lfloor \\frac{\\text{clamp}(r; a, b) - a}{s} \\right\\rceil \\cdot s + a</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">a, b</span> 是量化范围，<span class=\"kb-math kb-math-inline\">n</span> 是量化级数（8-bit 时 <span class=\"kb-math kb-math-inline\">n = 2^8 = 256</span>），<span class=\"kb-math kb-math-inline\">\\lfloor \\cdot \\rceil</span> 表示四舍五入。这个操作将浮点值\"snap\"到最近的量化格点上，模拟了量化引入的舍入误差。</p>\n<p>反向传播时，由于 round 操作不可导，使用 <strong>Straight-Through Estimator（STE）</strong>：在 <span class=\"kb-math kb-math-inline\">[a, b]</span> 范围内梯度直通（即 <span class=\"kb-math kb-math-inline\">\\frac{\\partial q}{\\partial r} = 1</span>），范围外梯度为零（clamp 的效果）。</p>\n<p><strong>量化范围确定策略</strong>：\n- <strong>权重</strong>：每层使用当前 batch 的 <span class=\"kb-math kb-math-inline\">\\min(w)</span> 和 <span class=\"kb-math kb-math-inline\">\\max(w)</span>，训练中动态更新\n- <strong>激活</strong>：使用 EMA 跟踪运行统计量的范围，平滑因子接近 1（如 0.999），避免单 batch 异常值影响</p>\n<p><strong>核心机制四：Batch Normalization 折叠</strong></p>\n<p>推理时 BN 层会被折叠进卷积权重以减少计算。训练时必须模拟这一折叠效果，否则训练和推理的量化行为不一致。折叠后的等效权重为：</p>\n<div class=\"kb-math kb-math-display\">w_{\\text{fold}} = \\frac{\\gamma \\cdot w}{\\sqrt{\\text{EMA}(\\sigma_B^2) + \\epsilon}}</div>\n<div class=\"key-point\">💡 <strong>关键</strong>：分母使用的是 BN 的 EMA 统计量（而非当前 batch 统计量），这样折叠后的权重变化更平滑，有利于训练稳定性。训练时对 <span class=\"kb-math kb-math-inline\">w_{\\text{fold}}</span> 进行 fake quantization，确保量化行为与推理一致。</div>\n<p><strong>训练 Warmup 策略</strong></p>\n<p>论文发现，在训练初期直接引入量化噪声会导致收敛困难。因此采用延迟量化策略：\n- 前 50K~2M 步（视模型大小而定）仅做正常浮点训练\n- 之后再开启激活的 fake quantization\n- 权重量化通常从一开始就启用（因为权重分布相对稳定）</p>\n<p><strong>实验结果与对比</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>任务</th>\n<th>Float 精度</th>\n<th>Int8 精度</th>\n<th>精度损失</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>ResNet-50</td>\n<td>ImageNet Top-1</td>\n<td>76.4%</td>\n<td>74.9%</td>\n<td>-1.5%</td>\n</tr>\n<tr>\n<td>ResNet-150</td>\n<td>ImageNet Top-1</td>\n<td>78.8%</td>\n<td>76.7%</td>\n<td>-2.1%</td>\n</tr>\n<tr>\n<td>InceptionV3 (ReLU6)</td>\n<td>ImageNet Top-1</td>\n<td>78.4%</td>\n<td>75.4%</td>\n<td>-3.0%</td>\n</tr>\n<tr>\n<td>InceptionV3 (ReLU6, 7-bit)</td>\n<td>ImageNet Top-1</td>\n<td>78.4%</td>\n<td>75.0%</td>\n<td>-3.4%</td>\n</tr>\n<tr>\n<td>MobileNet SSD (DM=100%)</td>\n<td>COCO mAP</td>\n<td>22.1</td>\n<td>21.7</td>\n<td>-1.8%</td>\n</tr>\n<tr>\n<td>MobileNet SSD (DM=50%)</td>\n<td>COCO mAP</td>\n<td>16.7</td>\n<td>16.6</td>\n<td>-0.6%</td>\n</tr>\n</tbody>\n</table></div>\n<p>与同期方法对比（ResNet-50 ImageNet Top-1）：BWN 68.7%、TWN 72.5%、INQ 74.8%、FGQ 70.8%，本文方法 <strong>74.9%</strong> 在 8-bit 量化中达到最优。</p>\n<p><strong>延迟收益</strong>：在 Qualcomm Snapdragon 835 上，量化 MobileNet 在相同延迟预算下精度提升约 <strong>10%</strong>（LITTLE 核心，33ms 实时约束下）。COCO 检测任务中延迟降低高达 <strong>50%</strong>（370ms → 272ms，big 核心）。人脸检测中实现约 <strong>2× 加速</strong>，25% DM 模型从 23fps 提升到 36fps 达到实时。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：论文主张不应仅关注\"给定模型的量化精度损失\"，而应关注<strong>延迟-精度权衡曲线</strong>。量化后可以使用更大的模型在相同延迟下获得更高精度，这比单纯比较同一模型的精度损失更有实际意义。</div>\n<p><strong>与传统 PTQ 方法的区别</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>Post-Training Quantization (PTQ)</th>\n<th>QAT（本文）</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>训练开销</td>\n<td>无需重训练</td>\n<td>需要完整训练流程</td>\n</tr>\n<tr>\n<td>精度损失</td>\n<td>较大（尤其轻量模型）</td>\n<td>极小</td>\n</tr>\n<tr>\n<td>BN 处理</td>\n<td>推理时直接折叠</td>\n<td>训练时模拟折叠后量化</td>\n</tr>\n<tr>\n<td>范围确定</td>\n<td>校准集统计</td>\n<td>EMA 动态跟踪</td>\n</tr>\n<tr>\n<td>适用场景</td>\n<td>大模型、精度不敏感</td>\n<td>轻量模型、精度敏感</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "QAT 训练中使用 Straight-Through Estimator (STE) 的原因是什么？",
        "options": [
          "加速训练收敛",
          "round 操作不可导，STE 让梯度在量化范围内直通以实现反向传播",
          "减少模型参数量",
          "避免 Batch Normalization 折叠带来的数值不稳定"
        ],
        "answer": 1,
        "explain": "fake quantization 中的 round 操作导数几乎处处为零，无法传递梯度。STE 在量化范围 [a,b] 内将梯度直通（视为恒等映射），范围外梯度置零，从而使训练可以正常进行。"
      }
    },
    {
      "id": "gptq",
      "num": 2,
      "name": "GPTQ",
      "fullName": "生成式预训练量化 (GPTQ)",
      "year": "2023",
      "org": "ISTA",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2210.17323",
      "projectUrl": "",
      "category": "quantization",
      "motivation": "基于Hessian的二阶近似实现极速PTQ",
      "summary": "GPTQ 的核心目标是：基于Hessian的二阶近似实现极速PTQ。",
      "keyPoints": [
        "核心动机：基于Hessian的二阶近似实现极速PTQ",
        "代表机构：ISTA"
      ],
      "detail": "<p>基于Hessian的二阶近似实现极速PTQ</p>"
    },
    {
      "id": "awq",
      "num": 3,
      "name": "AWQ",
      "fullName": "激活感知权重量化 (AWQ)",
      "year": "2024",
      "org": "MIT",
      "parent": "gptq",
      "paperUrl": "https://arxiv.org/abs/2306.00978",
      "projectUrl": "",
      "category": "quantization",
      "motivation": "保护1%显著权重通过激活感知缩放",
      "summary": "AWQ 通过观察激活分布识别 1% 的关键权重通道，利用 per-channel scaling（而非混合精度）在量化前放大这些通道的有效位宽，仅需网格搜索一个超参 $\\alpha$ 即可在 INT3/INT4 下取得优于 GPTQ 的精度，且天然泛化到指令微调模型和视觉语言模型。",
      "keyPoints": [
        "<strong>核心观察</strong>：LLM 权重中存在约 1% 的 salient channels，其重要性由<strong>激活幅度</strong>（而非权重幅度）决定；跳过这 1% 的量化即可大幅恢复精度（OPT-6.7B INT3 PPL 从 43.2 降至 13.0）",
        "<strong>关键创新</strong>：用 per-channel scaling $\\mathbf{s} = \\mathbf{s}_X^\\alpha$ 在量化前放大 salient channels，等价地缩小量化相对误差，避免了混合精度的硬件不友好问题",
        "<strong>无需训练</strong>：不依赖反向传播或逐层重建，仅在校准集上测量平均激活幅度 + 网格搜索 $\\alpha \\in [0,1]$（grid size=20），极度数据高效（16 条序列即可）",
        "<strong>泛化性强</strong>：不过拟合校准集分布，跨域 PPL 仅增 0.5-0.6（GPTQ 增 2.3-4.9）；首次成功量化 VLM（OpenFlamingo-9B、LLaVA-13B）",
        "<strong>系统加速</strong>：TinyChat 推理引擎在 INT4 下实现 3.2-3.3× speedup over HF FP16；Llama-2-70B 可部署在单块 Jetson Orin 64GB 上"
      ],
      "detail": "<h5>方法概览</h5>\n<p><img alt=\"AWQ 方法示意图\" src=\"https://arxiv.org/html/2306.00978v2/x1.png\" /></p>\n<p><strong>Figure 1</strong>：左图为直接 RTN 量化（PPL=43.2），中图为保留 1% salient weights 为 FP16（PPL=13.0，但硬件不友好），右图为 AWQ per-channel scaling 方案（PPL 接近混合精度，且硬件友好）。</p>\n<h5>算法伪代码</h5>\n<pre><code>Algorithm: AWQ — Activation-aware Weight Quantization\nInput: 预训练权重 W ∈ R^{c_o × c_i}, 校准集激活 X ∈ R^{c_i × T}\nOutput: 量化后权重 Q(W')\n\n1. 计算每通道激活均值: s_X(j) = mean(|X[j,:]|)   // j = 1..c_i\n2. 网格搜索最优 α:\n   for α in linspace(0, 1, 20):\n       s = s_X^α                          // per-channel scaling factor\n       W' = W · diag(s)                    // 放大 salient channels\n       X' = diag(s⁻¹) · X                 // 等价缩小输入（数学恒等）\n       loss(α) = ||Q(W') · X' - W · X||   // 量化误差（MSE）\n3. α* = argmin loss(α)\n4. s* = s_X^{α*}\n5. 返回 Q(W · diag(s*))，推理时输入乘 diag(s*⁻¹) 或融合到前层\n</code></pre>\n<h5>数学推导</h5>\n<p><strong>量化误差分析</strong>：对权重组 $\\mathbf{w}$，量化函数为：</p>\n<div class=\"kb-math kb-math-display\">Q(\\mathbf{w}) = \\Delta \\cdot \\text{Round}\\!\\left(\\frac{\\mathbf{w}}{\\Delta}\\right), \\quad \\Delta = \\frac{\\max(|\\mathbf{w}|)}{2^{N-1}}</div>\n<p>输出误差为 $\\text{Err}(Q(\\mathbf{w})) = \\Delta \\cdot \\text{RoundErr}!\\left(\\frac{\\mathbf{w}}{\\Delta}\\right) \\cdot \\mathbf{x}$。</p>\n<p><strong>Scaling 的作用</strong>：对第 $j$ 个输入通道乘以缩放因子 $s_j &gt; 1$，权重变为 $w_j \\cdot s_j$，输入变为 $x_j / s_j$（数学恒等变换）。量化误差变为：</p>\n<div class=\"kb-math kb-math-display\">\\text{Err}(w_j \\cdot s_j) \\cdot \\frac{x_j}{s_j} \\approx \\frac{\\Delta}{s_j} \\cdot \\text{RoundErr} \\cdot x_j</div>\n<p>即 salient channel 的量化误差被缩小了 $s_j$ 倍。但 $s_j$ 过大会增大 $\\Delta$（因为 $\\max(|\\mathbf{w}|)$ 变大），损害非 salient channels。因此需要搜索最优 $\\alpha$：</p>\n<div class=\"kb-math kb-math-display\">\\alpha^* = \\arg\\min_{\\alpha \\in [0,1]} \\; \\mathcal{L}(\\alpha) = \\left\\| Q\\!\\left(\\mathbf{W} \\cdot \\text{diag}(\\mathbf{s}_X^\\alpha)\\right) \\left(\\text{diag}(\\mathbf{s}_X^{-\\alpha}) \\cdot \\mathbf{X}\\right) - \\mathbf{W}\\mathbf{X} \\right\\|</div>\n<p><strong>Weight Clipping</strong>：在 scaling 基础上，进一步对权重做 clipping 以缩小 $\\Delta$：</p>\n<div class=\"kb-math kb-math-display\">\\Delta&#x27; = \\frac{\\text{clip}(\\max(|\\mathbf{w}|), \\; \\beta)}{2^{N-1}}, \\quad \\beta &lt; \\max(|\\mathbf{w}|)</div>\n<p>Clipping 牺牲离群值精度换取整体更小的量化步长。</p>\n<h5>与 GPTQ 的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>AWQ</th>\n<th>GPTQ</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>核心思路</strong></td>\n<td>激活感知 per-channel scaling</td>\n<td>基于 Hessian 的逐列权重重建</td>\n</tr>\n<tr>\n<td><strong>是否需要反向传播</strong></td>\n<td>❌ 不需要</td>\n<td>❌ 不需要（但需要逐层矩阵分解）</td>\n</tr>\n<tr>\n<td><strong>校准数据量</strong></td>\n<td>极少（16 条序列即可）</td>\n<td>较多（128-192 条序列）</td>\n</tr>\n<tr>\n<td><strong>过拟合风险</strong></td>\n<td>低（仅测量激活均值）</td>\n<td>高（重建过拟合校准集分布）</td>\n</tr>\n<tr>\n<td><strong>跨域泛化</strong></td>\n<td>PPL 仅增 0.5-0.6</td>\n<td>PPL 增 2.3-4.9</td>\n</tr>\n<tr>\n<td><strong>VLM/指令微调支持</strong></td>\n<td>✅ 首次成功</td>\n<td>⚠️ 泛化性差</td>\n</tr>\n<tr>\n<td><strong>INT3 LLaMA-7B PPL</strong></td>\n<td>6.35</td>\n<td>8.81（需 reorder 降至 6.53）</td>\n</tr>\n<tr>\n<td><strong>INT4 LLaMA-65B PPL</strong></td>\n<td>3.62</td>\n<td>3.66</td>\n</tr>\n<tr>\n<td><strong>推理加速</strong></td>\n<td>3.2-3.3× (TinyChat)</td>\n<td>需额外 kernel 支持</td>\n</tr>\n</tbody>\n</table></div>\n<h5>关键实验结果</h5>\n<p><strong>语言模型量化</strong>（WikiText-2 PPL↓）：\n- INT4-g128 LLaMA-65B：AWQ <strong>3.62</strong> vs GPTQ 3.66 vs RTN 3.67（FP16=3.53）\n- INT3-g128 Llama-2-70B：AWQ <strong>3.74</strong> vs GPTQ 3.88 vs RTN 3.98（FP16=3.32）\n- AWQ 在所有模型规模（7B-70B）和所有位宽（INT3/INT4）上一致优于 GPTQ</p>\n<p><strong>视觉语言模型</strong>（OpenFlamingo-9B COCO CIDEr↑）：\n- INT4-g128 32-shot：AWQ <strong>80.53</strong> vs RTN 77.13 vs GPTQ 74.98（FP16=81.70）\n- AWQ 将量化退化从 -4.57 降至 <strong>-1.17</strong>，实现 4× 压缩近乎无损</p>\n<p><strong>系统效率</strong>：\n- TinyChat INT4 推理：3.2-3.3× speedup over HF FP16\n- Llama-2-13B 在笔记本 RTX 4070 (8GB) 上达到 30 tokens/s\n- Llama-2-70B 可部署在 NVIDIA Jetson Orin (64GB)</p>\n<p><img alt=\"AWQ 校准效率与泛化性\" src=\"https://arxiv.org/html/2306.00978v2/x6.png\" /></p>\n<p><strong>Figure 6</strong>：左图显示 AWQ 仅需 16 条序列即可达到 GPTQ 192 条序列的精度；右图显示 AWQ 跨域校准仅增 0.5-0.6 PPL，而 GPTQ 增 2.3-4.9。</p>",
      "quiz": {
        "q": "AWQ 确定 salient weights 的依据是什么？",
        "options": {
          "A": "权重的 L2 范数大小",
          "B": "对应输入激活通道的平均幅度",
          "C": "权重梯度的大小",
          "D": "Hessian 矩阵的对角元素"
        },
        "answer": 1,
        "explain": ""
      }
    },
    {
      "id": "smoothquant",
      "num": 4,
      "name": "SmoothQuant",
      "fullName": "平滑量化 (SmoothQuant)",
      "year": "2023",
      "org": "MIT/NVIDIA",
      "parent": "qat",
      "paperUrl": "http://proceedings.mlr.press/v202/xiao23c.html",
      "projectUrl": "",
      "category": "quantization",
      "motivation": "将激活量化难度平滑转移至权重",
      "summary": "SmoothQuant 的核心目标是：将激活量化难度平滑转移至权重。",
      "keyPoints": [
        "核心动机：将激活量化难度平滑转移至权重",
        "演化来源：继承或改进自 qat",
        "代表机构：MIT/NVIDIA"
      ],
      "detail": "<p>将激活量化难度平滑转移至权重</p>"
    },
    {
      "id": "abq_llm",
      "num": 5,
      "name": "ABQ-LLM",
      "fullName": "任意比特量化 (Arbitrary-Bit Quantization)",
      "year": "2025",
      "org": "中科大",
      "parent": "awq",
      "paperUrl": "https://ojs.aaai.org/index.php/AAAI/article/view/34385",
      "projectUrl": "",
      "category": "quantization",
      "motivation": "实现任意比特量化推理加速",
      "summary": "ABQ-LLM 的核心目标是：实现任意比特量化推理加速。",
      "keyPoints": [
        "核心动机：实现任意比特量化推理加速",
        "演化来源：继承或改进自 awq",
        "代表机构：中科大"
      ],
      "detail": "<p>实现任意比特量化推理加速</p>"
    },
    {
      "id": "spinquant",
      "num": 6,
      "name": "SpinQuant",
      "fullName": "旋转量化 (SpinQuant)",
      "year": "2025",
      "org": "Meta",
      "parent": "gptq",
      "paperUrl": "https://proceedings.iclr.cc/paper_files/paper/2025/hash/e5b1c0d4866f72393c522c8a00eed4eb-Abstract-Conference.html",
      "projectUrl": "",
      "category": "quantization",
      "motivation": "学习旋转矩阵减少量化误差",
      "summary": "SpinQuant 提出在 Transformer 的四个旋转不变位置插入可学习的正交旋转矩阵，通过 Cayley SGD 在 Stiefel 流形上优化旋转参数以消除激活/权重中的离群值，使 W4A4KV4 量化在 LLaMA-2 7B 上仅损失 2.9 个百分点精度，大幅超越 SmoothQuant、LLM-QAT 和 QuaRot 等方法。",
      "keyPoints": [
        "<strong>旋转不变性</strong>：识别 Transformer 中 4 个可插入正交旋转矩阵且不改变全精度输出的位置（残差流 <span class=\"kb-math kb-math-inline\">R_1</span>、注意力头 <span class=\"kb-math kb-math-inline\">R_2</span>、Query/Key <span class=\"kb-math kb-math-inline\">R_3</span>、FFN 下投影 <span class=\"kb-math kb-math-inline\">R_4</span>）",
        "<strong>随机旋转方差大</strong>：不同随机旋转矩阵导致量化后零样本推理精度差异高达 13 个百分点",
        "<strong>Cayley SGD 优化</strong>：在 Stiefel 流形上用 Cayley 变换优化 <span class=\"kb-math kb-math-inline\">R_1, R_2</span>，仅需 100 次迭代、800 个 WikiText2 样本、约 1.3 小时（7B 模型，单 A100）",
        "<strong>极低额外参数</strong>：优化的旋转矩阵仅占模型权重的 0.26%，且可吸收进相邻权重矩阵，无推理开销（<span class=\"kb-math kb-math-inline\">R_3, R_4</span> 使用在线 Hadamard 变换）",
        "<strong>兼容 GPTQ</strong>：可与 GPTQ 权重量化联合使用，进一步提升精度",
        "<strong>SOTA 结果</strong>：W4A4KV4 下 LLaMA-2 7B 仅 2.9pt gap（vs LLM-QAT 22pt, SmoothQuant 27pt）；LLaMA-3 70B 仅 4.4pt gap"
      ],
      "detail": "<h5>核心框架图</h5>\n<p><img alt=\"SpinQuant 旋转位置示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2405.16406v3/assets/x1.png\" />\n<em>图：SpinQuant 在 Transformer 块中的四个旋转插入位置。<span class=\"kb-math kb-math-inline\">R_1</span> 作用于残差流，<span class=\"kb-math kb-math-inline\">R_2</span> 作用于注意力输出，<span class=\"kb-math kb-math-inline\">R_3</span> 作用于 Q/K 向量，<span class=\"kb-math kb-math-inline\">R_4</span> 作用于 FFN 下投影层输入。其中 <span class=\"kb-math kb-math-inline\">R_1, R_2</span> 可吸收进权重矩阵（离线），<span class=\"kb-math kb-math-inline\">R_3, R_4</span> 需在线计算（使用高效 Hadamard 变换）。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># SpinQuant 旋转矩阵优化流程\n# 输入: 预训练LLM权重 W, 校准集 D (800 samples from WikiText2)\n# 输出: 优化后的旋转矩阵 R1, R2\n\n# Step 1: 初始化旋转矩阵为随机 Hadamard 矩阵\nR1 = random_hadamard(D_token, D_token)       # 残差流旋转\nR2 = {l: random_hadamard(D_head, D_head)      # 每层每头的注意力旋转\n       for l in range(num_layers)}\nR3 = hadamard(D_head)                         # Q/K 旋转 (固定, 在线)\nR4 = hadamard(D_intermediate)                 # FFN 旋转 (固定, 在线)\n\n# Step 2: 将 R1, R2 吸收进权重 (不改变全精度输出)\nW_rotated = absorb_rotations(W, R1, R2)\n\n# Step 3: Cayley SGD 优化 (在 Stiefel 流形上)\nfor iteration in range(100):\n    # 前向传播: 对旋转后的权重和激活进行量化\n    loss = 0\n    for batch in calibration_loader(D):\n        # 量化权重和激活 (仅量化激活用于优化, 权重量化交给GPTQ)\n        output = quantized_forward(W_rotated, batch, R3, R4)\n        loss += cross_entropy(output, batch.labels)\n\n    # 计算梯度并用 Cayley 变换更新\n    grad = compute_gradient(loss, R1, R2)\n    # Cayley 更新: R' = (I + η/2 · A)^{-1} (I - η/2 · A) R\n    # 其中 A = grad @ R^T - R @ grad^T (反对称矩阵)\n    R1 = cayley_update(R1, grad_R1, lr=1.5 * (1 - iteration/100))\n    R2 = cayley_update(R2, grad_R2, lr=1.5 * (1 - iteration/100))\n\n    # 重新吸收旋转进权重\n    W_rotated = absorb_rotations(W, R1, R2)\n\n# Step 4: 最终量化 (可选配合 GPTQ)\nmodel_quantized = quantize(W_rotated, method=&quot;RTN_or_GPTQ&quot;, bits=4)\n</code></pre>\n<h5>动机与背景</h5>\n<p><strong>离群值问题</strong>：LLM 的激活和权重中存在少量极端离群值（outliers），这些值拉伸了量化范围，导致大部分正常值只能使用很少的有效比特表示，造成严重的量化误差。例如，直接对 LLaMA-2 7B 进行 W4A4 RTN 量化，零样本精度从 66.9% 暴跌至 37.1%。</p>\n<p><strong>随机旋转的局限</strong>：QuIP 和 QuaRot 等工作发现，对权重/激活矩阵乘以随机正交矩阵可以统计性地\"打散\"离群值，使分布更均匀。然而 SpinQuant 的关键发现是：<strong>不同的随机旋转矩阵之间存在巨大的性能差异</strong>——在 LLaMA-2 7B W4A4KV4 设置下，100 个随机种子的零样本精度范围从约 53% 到 66%，差距高达 13 个百分点。这意味着随机选择旋转矩阵是一种\"碰运气\"的做法。</p>\n<h5>核心机制：四个旋转位置</h5>\n<p>SpinQuant 系统性地识别了 Transformer 中四个满足<strong>旋转不变性</strong>的位置，即插入正交矩阵 <span class=\"kb-math kb-math-inline\">R</span>（满足 <span class=\"kb-math kb-math-inline\">RR^T = I</span>）后不改变全精度网络的输出：</p>\n<p><strong><span class=\"kb-math kb-math-inline\">R_1</span> — 残差流旋转（Residual Rotation）</strong></p>\n<p>在每个 Transformer 块的残差连接处插入旋转。由于 RMSNorm 对旋转不变（<span class=\"kb-math kb-math-inline\">\\text{RMSNorm}(Rx) = R \\cdot \\text{RMSNorm}(x)</span>），可以将 <span class=\"kb-math kb-math-inline\">R_1</span> 吸收进相邻的线性层权重中：</p>\n<div class=\"kb-math kb-math-display\">W&#x27;_{\\text{proj}} = W_{\\text{proj}} \\cdot R_1^T, \\quad W&#x27;_{\\text{out}} = R_1 \\cdot W_{\\text{out}}</div>\n<p>这样 <span class=\"kb-math kb-math-inline\">R_1</span> 不引入任何推理开销。<span class=\"kb-math kb-math-inline\">R_1</span> 的维度为 <span class=\"kb-math kb-math-inline\">D_{\\text{token}} \\times D_{\\text{token}}</span>（如 LLaMA-2 7B 为 4096×4096）。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：<span class=\"kb-math kb-math-inline\">R_1</span> 同时改变了输入到注意力层和 FFN 层的激活分布，以及所有投影矩阵的权重分布，是影响最大的旋转位置。</div>\n<p><strong><span class=\"kb-math kb-math-inline\">R_2</span> — 注意力头内旋转（MHSA Rotation）</strong></p>\n<p>在每个注意力头的 Value 投影和 Output 投影之间插入逐头旋转矩阵。由于 <span class=\"kb-math kb-math-inline\">V \\cdot R_2^T</span> 和 <span class=\"kb-math kb-math-inline\">R_2 \\cdot W_O</span> 可以分别吸收进 <span class=\"kb-math kb-math-inline\">W_V</span> 和 <span class=\"kb-math kb-math-inline\">W_O</span>，同样无推理开销。维度为 <span class=\"kb-math kb-math-inline\">D_{\\text{head}} \\times D_{\\text{head}}</span>（如 128×128），每层独立学习。</p>\n<p><strong><span class=\"kb-math kb-math-inline\">R_3</span> — Query/Key Hadamard 旋转</strong></p>\n<p>对 Query 和 Key 向量在每个头内施加 Hadamard 变换。由于 RoPE 位置编码的存在，<span class=\"kb-math kb-math-inline\">R_3</span> 无法吸收进权重（RoPE 对非对角旋转不不变），必须在线计算。但 Hadamard 变换的计算复杂度仅为 <span class=\"kb-math kb-math-inline\">O(d \\log d)</span>，开销极小。</p>\n<p><strong><span class=\"kb-math kb-math-inline\">R_4</span> — FFN 下投影 Hadamard 旋转</strong></p>\n<p>在 FFN 的 Gate/Up 投影输出与 Down 投影输入之间插入 Hadamard 变换。由于 SiLU 激活函数的非线性，<span class=\"kb-math kb-math-inline\">R_4</span> 同样无法吸收进权重，需在线计算。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：<span class=\"kb-math kb-math-inline\">R_1, R_2</span> 通过 Cayley SGD 优化学习；<span class=\"kb-math kb-math-inline\">R_3, R_4</span> 保持为固定的 Hadamard 矩阵（在线高效计算）。这种设计平衡了优化效果和推理效率。</div>\n<h5>Cayley SGD 优化</h5>\n<p>旋转矩阵必须保持正交性（<span class=\"kb-math kb-math-inline\">RR^T = I</span>），这意味着优化空间是 <strong>Stiefel 流形</strong>而非欧氏空间。SpinQuant 采用 Cayley SGD 方法：</p>\n<ol>\n<li>计算欧氏梯度 <span class=\"kb-math kb-math-inline\">\\nabla_R \\mathcal{L}</span></li>\n<li>构造反对称矩阵 <span class=\"kb-math kb-math-inline\">A = \\nabla_R \\mathcal{L} \\cdot R^T - R \\cdot (\\nabla_R \\mathcal{L})^T</span></li>\n<li>通过 Cayley 变换更新：</li>\n</ol>\n<div class=\"kb-math kb-math-display\">R&#x27; = \\left(I + \\frac{\\eta}{2} A\\right)^{-1} \\left(I - \\frac{\\eta}{2} A\\right) R</div>\n<p>这保证了更新后的 <span class=\"kb-math kb-math-inline\">R&#x27;</span> 仍然是正交矩阵。整个优化过程：\n- 学习率从 1.5 线性衰减到 0\n- 仅 100 次迭代，800 个 WikiText2 校准样本\n- LLaMA-2 7B 约 1.25 小时（8×A100），LLaMA-3 8B 约 1.39 小时\n- 从不同随机种子初始化，优化后的结果方差极小</p>\n<h5>与 GPTQ 的协同</h5>\n<p>SpinQuant 发现一个重要的实践技巧：当同时量化权重和激活时，应<strong>仅针对激活量化误差优化旋转矩阵</strong>（即在 W16A4 设置下优化），然后再用 GPTQ 处理权重量化误差。这种分工策略比同时优化两者效果更好，因为 GPTQ 已经能很好地处理权重量化误差，而旋转矩阵更擅长处理激活分布的不均匀性。</p>\n<h5>实验结果亮点</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>设置</th>\n<th>模型</th>\n<th>SpinQuant</th>\n<th>QuaRot</th>\n<th>LLM-QAT</th>\n<th>FP</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>W4A4KV4</td>\n<td>LLaMA-2 7B</td>\n<td>64.0</td>\n<td>62.5</td>\n<td>44.9</td>\n<td>66.9</td>\n</tr>\n<tr>\n<td>W4A4KV4</td>\n<td>LLaMA-2 13B</td>\n<td>66.9</td>\n<td>66.2</td>\n<td>—</td>\n<td>68.3</td>\n</tr>\n<tr>\n<td>W4A4KV4</td>\n<td>LLaMA-2 70B</td>\n<td>71.2</td>\n<td>70.3</td>\n<td>—</td>\n<td>72.9</td>\n</tr>\n<tr>\n<td>W4A4KV4</td>\n<td>LLaMA-3 8B</td>\n<td>65.2</td>\n<td>63.3</td>\n<td>43.2</td>\n<td>69.6</td>\n</tr>\n<tr>\n<td>W4A4KV4</td>\n<td>LLaMA-3 70B</td>\n<td>69.3</td>\n<td>65.1</td>\n<td>—</td>\n<td>74.5</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键</strong>：SpinQuant 在最具挑战性的 W4A4KV4 设置下，将 LLaMA-2 7B 与全精度的差距缩小到仅 2.9 个百分点，而 LLM-QAT 差距为 22 个百分点，SmoothQuant 差距为 27 个百分点。在 LLaMA-3 70B 上，SpinQuant 将差距从 QuaRot 的 9.4pt 缩小到 5.2pt。</div>\n<h5>各旋转位置的贡献（消融实验）</h5>\n<ul>\n<li><strong>无旋转</strong>：W4A4KV4 精度仅约 38%（几乎不可用）</li>\n<li><strong>仅 <span class=\"kb-math kb-math-inline\">R_1</span></strong>：精度大幅提升，是最重要的单一旋转位置</li>\n<li><strong><span class=\"kb-math kb-math-inline\">R_1 + R_2</span></strong>：进一步改善注意力层的量化质量</li>\n<li><strong><span class=\"kb-math kb-math-inline\">R_1 + R_2 + R_3 + R_4</span></strong>（全部）：达到最佳效果</li>\n<li><strong>Cayley 优化 vs 随机</strong>：优化后的旋转比最佳随机旋转（100 种子中最好的）还要好，且方差极小</li>\n</ul>",
      "quiz": {
        "q": "SpinQuant 中为什么 R3（Query/Key 旋转）不能像 R1 那样吸收进权重矩阵？",
        "options": [
          "因为 R3 的维度太大，无法存储",
          "因为 RoPE 位置编码的存在使得旋转无法与权重合并",
          "因为 Query 和 Key 需要不同的旋转矩阵",
          "因为注意力分数的 softmax 操作对旋转不不变"
        ],
        "answer": 1,
        "explain": "RoPE 对每个位置施加不同的旋转，与 R3 不可交换，因此 R3 无法被吸收进 W_Q/W_K 权重中，必须在推理时在线计算。"
      }
    },
    {
      "id": "efficientqat",
      "num": 7,
      "name": "EfficientQAT",
      "fullName": "高效量化感知训练 (EfficientQAT)",
      "year": "2025",
      "org": "北大",
      "parent": "qat",
      "paperUrl": "https://aclanthology.org/2025.acl-long.498/",
      "projectUrl": "",
      "category": "quantization",
      "motivation": "显著降低大模型量化训练资源消耗",
      "summary": "EfficientQAT 的核心目标是：显著降低大模型量化训练资源消耗。",
      "keyPoints": [
        "核心动机：显著降低大模型量化训练资源消耗",
        "演化来源：继承或改进自 qat",
        "代表机构：北大"
      ],
      "detail": "<h3>方法示意图</h3>\n<blockquote>\n<p><strong>论文 Figure 2 — EfficientQAT 整体框架</strong>\n<img alt=\"EfficientQAT Framework\" src=\"https://arxiv.org/html/2407.11062v3/x3.png\" /></p>\n<p>左侧为 <strong>Block-AP 阶段</strong>：逐块训练，每个 Transformer block 独立优化所有参数（权重 W、step size s、zero point z），使用 MSE 重建损失对齐量化前后的 block 输出。\n右侧为 <strong>E2E-QP 阶段</strong>：固定量化后的整数权重 $W_{int}$，仅端到端训练 step size $s$，使用标准语言建模损失（next-token prediction）。</p>\n</blockquote>\n<h3>核心算法伪代码</h3>\n<p>```python</p>"
    },
    {
      "id": "lottery_ticket",
      "num": 8,
      "name": "Lottery Ticket",
      "fullName": "彩票假设 (Lottery Ticket Hypothesis)",
      "year": "2019",
      "org": "MIT",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1803.03635",
      "projectUrl": "",
      "category": "pruning",
      "motivation": "发现网络中存在可训练稀疏子网络",
      "summary": "彩票假设提出：随机初始化的稠密网络中存在稀疏子网络（\"中奖彩票\"），这些子网络在使用**原始初始化权重**单独训练时，能以不超过原网络的迭代次数达到相当甚至更优的测试精度，从而揭示了初始化与网络结构的深层耦合关系。",
      "keyPoints": [
        "<strong>彩票假设定义</strong>：稠密随机初始化的前馈网络包含稀疏子网络（winning tickets），单独训练可匹配原网络精度且训练时间相当",
        "<strong>基于幅值的非结构化剪枝</strong>：训练后按权重绝对值大小剪枝，保留幅值最大的连接",
        "<strong>权重回卷（Weight Rewinding）</strong>：剪枝后将存活连接的权重重置为训练前的原始初始化值 <span class=\"kb-math kb-math-inline\">\\theta_0</span>，而非保留训练后的值",
        "<strong>迭代剪枝（Iterative Pruning）</strong>：多轮\"训练→剪枝→回卷\"循环，每轮剪去 <span class=\"kb-math kb-math-inline\">p^{1/n}\\%</span> 存活权重，比一次性剪枝找到更小的 winning tickets",
        "<strong>初始化的关键性</strong>：随机重新初始化相同结构的子网络无法复现 winning ticket 的性能，证明特定初始化是成功的关键",
        "<strong>实验覆盖</strong>：在 Lenet/MNIST 和 Conv-2/4/6/CIFAR10 上验证，winning tickets 通常仅为原网络 10-20% 的参数量",
        "<strong>学习率敏感性</strong>：在较深网络中，需要学习率预热（warmup）才能成功找到 winning tickets"
      ],
      "detail": "<p><img alt=\"Lottery Ticket 核心实验结果\" src=\"https://ar5iv.labs.arxiv.org/html/1803.03635/assets/x1.png\" />\n<em>图：不同剪枝比例下 winning tickets（实线）与随机稀疏子网络（虚线）的 early-stopping 迭代次数（左）和测试精度（右）对比。Winning tickets 在大幅剪枝后仍能保持甚至超越原网络性能。</em></p>\n<p><img alt=\"网络架构\" src=\"https://ar5iv.labs.arxiv.org/html/1803.03635/assets/x2.png\" />\n<em>图：论文中测试的网络架构，包括 Lenet（全连接）和 Conv-2/4/6（卷积，VGG 变体）。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Lottery Ticket 迭代剪枝算法\n# 输入：网络 f(x; θ)，剪枝轮数 n，总剪枝比例 p%\n# 输出：winning ticket 子网络 f(x; m ⊙ θ_0)\n\nθ_0 = random_init()           # Step 1: 随机初始化\nm = ones(|θ_0|)               # 初始 mask 全为 1\n\nfor round in range(n):\n    θ_j = train(f, m ⊙ θ_0)  # Step 2: 用当前 mask 和原始初始化训练至收敛\n    # Step 3: 按幅值剪枝，每轮剪去存活权重的 p^(1/n)%\n    scores = abs(θ_j) * m\n    threshold = percentile(scores[scores &gt; 0], p ** (1/n))\n    m = m * (scores &gt;= threshold).float()\n    # Step 4: 权重回卷至 θ_0（不保留训练后的权重）\n\n# 最终输出：f(x; m ⊙ θ_0) 即为 winning ticket\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统神经网络剪枝（如 Han et al., 2015; LeCun et al., 1990）已经证明训练好的网络可以在不损失精度的情况下减少 90% 以上的参数。然而，这些方法的标准流程是\"先训练大网络→剪枝→微调\"，剪枝后的稀疏网络依赖训练后的权重作为微调起点。一个自然的问题是：<strong>能否直接从头训练这些小网络？</strong> 当时的经验表明这是困难的——随机初始化的小网络通常无法达到大网络的精度（Li et al., 2016; Han et al., 2015 均有类似观察）。</p>\n<p>彩票假设对这一现象给出了全新的解释：问题不在于小网络本身缺乏容量，而在于<strong>初始化</strong>。稠密网络之所以容易训练，是因为它包含了大量可能的子网络，其中某些子网络恰好获得了\"幸运\"的初始化——这些就是\"中奖彩票\"。</p>\n<h5>核心机制详解</h5>\n<p><strong>形式化定义。</strong> 考虑稠密网络 <span class=\"kb-math kb-math-inline\">f(x; \\theta)</span>，初始参数 <span class=\"kb-math kb-math-inline\">\\theta = \\theta_0 \\sim \\mathcal{D}_\\theta</span>。通过 SGD 训练后在第 <span class=\"kb-math kb-math-inline\">j</span> 次迭代达到最小验证损失 <span class=\"kb-math kb-math-inline\">l</span>，测试精度为 <span class=\"kb-math kb-math-inline\">a</span>。现在考虑带掩码的子网络 <span class=\"kb-math kb-math-inline\">f(x; m \\odot \\theta)</span>，其中 <span class=\"kb-math kb-math-inline\">m \\in \\{0,1\\}^{|\\theta|}</span>，初始化为 <span class=\"kb-math kb-math-inline\">m \\odot \\theta_0</span>。彩票假设预测存在掩码 <span class=\"kb-math kb-math-inline\">m</span> 使得：</p>\n<div class=\"kb-math kb-math-display\">j&#x27; \\leq j \\quad (\\text{训练时间相当}), \\quad a&#x27; \\geq a \\quad (\\text{精度相当}), \\quad \\|m\\|_0 \\ll |\\theta| \\quad (\\text{参数更少})</div>\n<p>这一假设的关键在于三个条件同时满足：子网络不仅更小，而且训练速度不慢、精度不低。</p>\n<p><strong>权重回卷的重要性。</strong> 与传统剪枝方法保留训练后权重不同，彩票假设的核心操作是将存活连接的权重<strong>重置为原始初始化值</strong> <span class=\"kb-math kb-math-inline\">\\theta_0</span>。这一设计的目的是验证：特定的初始化（而非训练后的权重）才是 winning ticket 成功的根本原因。实验证实，如果对同一子网络结构使用新的随机初始化 <span class=\"kb-math kb-math-inline\">\\theta_0&#x27; \\sim \\mathcal{D}_\\theta</span>，性能将显著下降，说明结构本身不足以解释 winning ticket 的成功。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：Winning ticket 的成功源于初始化权重与网络结构的特定组合，而非单纯的网络拓扑。这意味着\"哪些连接被保留\"和\"这些连接的初始值是什么\"同等重要。</div>\n<p><strong>一次性剪枝 vs 迭代剪枝。</strong> 一次性剪枝（one-shot）直接训练一次后剪去 <span class=\"kb-math kb-math-inline\">p\\%</span> 的权重。迭代剪枝（iterative pruning）将这一过程分为 <span class=\"kb-math kb-math-inline\">n</span> 轮，每轮剪去存活权重的 <span class=\"kb-math kb-math-inline\">p^{1/n}\\%</span>。例如，若目标剪枝率为 <span class=\"kb-math kb-math-inline\">p = 90\\%</span>，分 <span class=\"kb-math kb-math-inline\">n = 10</span> 轮，则每轮剪去约 <span class=\"kb-math kb-math-inline\">90^{0.1}\\% \\approx 79.4\\%</span> 的存活权重（即保留约 20.6%）。迭代剪枝的优势在于每轮的剪枝决策基于更精确的权重重要性估计，因此能找到更小的 winning tickets。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：迭代剪枝的计算成本很高——需要反复训练网络 <span class=\"kb-math kb-math-inline\">n</span> 次以上。这也是该方法的主要局限之一，使其难以直接扩展到 ImageNet 等大规模任务。</div>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方面</th>\n<th>传统剪枝（Han et al., 2015）</th>\n<th>彩票假设</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>目标</strong></td>\n<td>压缩已训练模型</td>\n<td>发现可从头训练的稀疏子网络</td>\n</tr>\n<tr>\n<td><strong>剪枝后权重</strong></td>\n<td>保留训练后的权重，继续微调</td>\n<td>回卷至原始初始化 <span class=\"kb-math kb-math-inline\">\\theta_0</span></td>\n</tr>\n<tr>\n<td><strong>训练流程</strong></td>\n<td>训练→剪枝→微调</td>\n<td>训练→剪枝→回卷→从头训练</td>\n</tr>\n<tr>\n<td><strong>核心发现</strong></td>\n<td>训练后的网络可压缩</td>\n<td>稠密网络中存在可训练的稀疏子网络</td>\n</tr>\n<tr>\n<td><strong>初始化角色</strong></td>\n<td>不关注</td>\n<td>核心——特定初始化是成功关键</td>\n</tr>\n</tbody>\n</table></div>\n<h5>主要实验发现</h5>\n<p>论文在 Lenet（全连接，MNIST）和 Conv-2/4/6（卷积，CIFAR10）上进行了系统实验：</p>\n<ol>\n<li><strong>Winning tickets 普遍存在</strong>：在所有测试架构中，均能找到仅占原网络 10-20% 参数的 winning tickets，且测试精度不低于原网络。</li>\n<li><strong>Winning tickets 学习更快</strong>：在剪枝比例适中时，winning tickets 不仅精度更高，而且收敛速度更快（early-stopping 迭代次数更少）。</li>\n<li><strong>随机重初始化失败</strong>：将 winning ticket 的结构保留但随机重新初始化权重后，性能大幅下降，证明初始化的关键作用。</li>\n<li><strong>迭代剪枝优于一次性剪枝</strong>：迭代剪枝能在更高压缩率下找到有效的 winning tickets。</li>\n<li><strong>学习率敏感性</strong>：在 Conv-4/6 等较深网络中，使用较大学习率时需要 warmup 策略才能成功找到 winning tickets。</li>\n</ol>",
      "quiz": {
        "q": "在彩票假设的实验中，剪枝后对存活连接的权重进行什么操作？",
        "options": [
          "保留训练后的权重值，直接进行推理",
          "将权重重置为原始随机初始化值 θ_0，重新训练",
          "将权重全部设为零，重新训练",
          "用新的随机值重新初始化权重，重新训练"
        ],
        "answer": 1,
        "explain": "彩票假设的核心操作是'权重回卷'——将存活连接的权重重置为训练前的原始初始化值 θ_0，而非保留训练后的权重或重新随机初始化。实验证明正是这些特定的初始化值使得 winning ticket 能够成功训练。"
      }
    },
    {
      "id": "movement_pruning",
      "num": 9,
      "name": "Movement Pruning",
      "fullName": "运动剪枝 (Movement Pruning)",
      "year": "2020",
      "org": "HuggingFace",
      "parent": "lottery_ticket",
      "paperUrl": "https://proceedings.neurips.cc/paper/2020/hash/eae15aabaa768ae4a5993a8a4f4fa6e4-Abstract.html",
      "projectUrl": "",
      "category": "pruning",
      "motivation": "微调中根据权重趋势动态剪枝",
      "summary": "Movement Pruning 的核心目标是：微调中根据权重趋势动态剪枝。",
      "keyPoints": [
        "核心动机：微调中根据权重趋势动态剪枝",
        "演化来源：继承或改进自 lottery_ticket",
        "代表机构：HuggingFace"
      ],
      "detail": "<p>微调中根据权重趋势动态剪枝</p>"
    },
    {
      "id": "sparsegpt",
      "num": 10,
      "name": "SparseGPT",
      "fullName": "稀疏GPT (SparseGPT)",
      "year": "2023",
      "org": "ISTA",
      "parent": "gptq",
      "paperUrl": "https://arxiv.org/abs/2301.00774",
      "projectUrl": "",
      "category": "pruning",
      "motivation": "首个支持千亿参数模型一键剪枝",
      "summary": "SparseGPT 提出了一种基于近似二阶信息的高效逐层剪枝方法，首次实现了对 OPT-175B / BLOOM-176B 等千亿参数大语言模型的一次性（one-shot）剪枝，在单张 A100 GPU 上约 4 小时即可将模型压缩至 50–60% 非结构化稀疏度，且几乎无精度损失。",
      "keyPoints": [
        "<strong>逐层稀疏重建问题</strong>：将全局剪枝分解为逐层最小化 <span class=\"kb-math kb-math-inline\">\\|\\mathbf{W}\\mathbf{X} - (\\mathbf{M} \\odot \\hat{\\mathbf{W}})\\mathbf{X}\\|_F^2</span>，避免端到端反向传播",
        "<strong>基于 OBS 的列式贪心剪枝</strong>：按列顺序逐一剪枝，每次利用 Hessian 逆的闭式解更新未剪枝权重以补偿误差",
        "<strong>部分更新（Partial Updates）</strong>：仅更新尚未处理的列子集 <span class=\"kb-math kb-math-inline\">U</span>，将更新限制在\"未来\"权重上，保证已剪枝列不被回改",
        "<strong>Hessian 同步</strong>：所有行共享同一 Hessian 逆矩阵 <span class=\"kb-math kb-math-inline\">(\\mathbf{H}_U)^{-1}</span>，通过 Gaussian Elimination 递推更新，单步 <span class=\"kb-math kb-math-inline\">O(d^2)</span>，总复杂度 <span class=\"kb-math kb-math-inline\">O(d_{\\text{col}}^3)</span>",
        "<strong>自适应掩码选择</strong>：以 <span class=\"kb-math kb-math-inline\">B_s = 128</span> 列为一块，在块内按 OBS 误差排序选择 <span class=\"kb-math kb-math-inline\">p\\%</span> 最小权重剪枝，兼顾全局与局部最优",
        "<strong>半结构化 n:m 稀疏</strong>：令 <span class=\"kb-math kb-math-inline\">B_s = m</span>（如 <span class=\"kb-math kb-math-inline\">m=4</span> 对应 2:4 模式），天然适配 NVIDIA Ampere 硬件加速",
        "<strong>联合稀疏化 + 量化</strong>：在同一遍扫描中同时执行剪枝与权重量化（Eq. 7），50% 稀疏 + 4-bit 优于等存储量的 GPTQ 3-bit",
        "<strong>规模效应</strong>：模型越大越容易剪枝——OPT-175B 在 50% 稀疏度下 ZeroShot 平均精度甚至略高于稠密基线"
      ],
      "detail": "<h5>示意图</h5>\n<p><img alt=\"SparseGPT sparsity-perplexity trade-off on OPT-175B\" src=\"https://arxiv.org/html/2301.00774v4/extracted/5005954/figs/opt-175b.png\" />\n<em>图：OPT-175B 在不同稀疏度下的 WikiText2 困惑度对比。Magnitude Pruning 在 10% 稀疏度即崩溃，SparseGPT 可达 60% 稀疏度仍保持接近稠密基线的困惑度。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># SparseGPT 核心算法（单层）\n# 输入: 权重 W ∈ R^{d_row × d_col}, Hessian H = 2·X·X^T, 目标稀疏度 p%\n# 输出: 稀疏化后的权重 Ŵ\n\nH_inv = cholesky(inverse(H))  # Cholesky 分解 H^{-1}，O(d_col^3)\nE = zeros(d_row, B)           # 误差缓存\n\nfor i in range(0, d_col, B):           # B: lazy batch size (e.g. 128)\n    for j in range(i, i + B, B_s):     # B_s: mask selection block (e.g. 128)\n        # === 自适应掩码选择 ===\n        # 对 W[:, j:j+B_s] 中每个权重计算 OBS 误差 w_jk^2 / [H_inv]_{jk,jk}\n        # 选择误差最小的 p% 权重设为 0 → 得到掩码 M[:, j:j+B_s]\n\n        for k in range(j, j + B_s):    # 逐列处理\n            # === 剪枝 + 权重更新 ===\n            if M[:, k] == 0:           # 该列被剪枝\n                err = W[:, k] / H_inv[k, k]\n            else:\n                err = 0\n            W[:, k] = M[:, k] * W[:, k]  # 应用掩码\n            E[:, k - i] = err\n            # 更新后续列: W[:, k+1:i+B] -= err · H_inv[k, k+1:i+B]\n            W[:, k+1:i+B] -= err.unsqueeze(1) * H_inv[k, k+1:i+B].unsqueeze(0)\n\n    # === Lazy batch 更新 ===\n    # 将累积误差传播到所有未处理列\n    W[:, i+B:] -= E @ H_inv[i:i+B, i+B:]\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统剪枝方法（如 Magnitude Pruning、Lottery Ticket 等）依赖大量重训练（retraining）来恢复精度，而 GPT 规模模型的训练成本极其高昂（OPT-175B 训练需数千 GPU 天），使得这些方法在实践中不可行。</p>\n<p>已有的后训练（post-training）剪枝方法如 AdaPrune 基于 Optimal Brain Surgeon（OBS）框架，虽然不需要重训练，但其复杂度为 <span class=\"kb-math kb-math-inline\">O(d_{\\text{row}} \\cdot d_{\\text{col}}^3)</span>——对于 GPT-175B 中 <span class=\"kb-math kb-math-inline\">d = 12288</span> 的线性层，单层需约 <span class=\"kb-math kb-math-inline\">10^{13}</span> 次运算，完全不可扩展。</p>\n<p>SparseGPT 的核心贡献在于：<strong>将 OBS 剪枝的复杂度从 <span class=\"kb-math kb-math-inline\">O(d_{\\text{row}} \\cdot d_{\\text{col}}^3)</span> 降至 <span class=\"kb-math kb-math-inline\">O(d_{\\text{col}}^3 + d_{\\text{row}} \\cdot d_{\\text{col}}^2)</span></strong>，使千亿参数模型的剪枝在单 GPU 上成为可能。</p>\n<h5>核心机制详解</h5>\n<p><strong>1. 逐层稀疏重建问题</strong></p>\n<p>SparseGPT 将全局剪枝分解为独立的逐层子问题。对于每一层，目标是找到稀疏掩码 <span class=\"kb-math kb-math-inline\">\\mathbf{M}</span> 和更新后的权重 <span class=\"kb-math kb-math-inline\">\\hat{\\mathbf{W}}</span>，最小化：</p>\n<div class=\"kb-math kb-math-display\">\\min_{\\mathbf{M}, \\hat{\\mathbf{W}}} \\|\\mathbf{W}\\mathbf{X} - (\\mathbf{M} \\odot \\hat{\\mathbf{W}})\\mathbf{X}\\|_F^2</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathbf{X}</span> 是该层的输入激活（通过少量校准数据前向传播获得）。定义 Hessian <span class=\"kb-math kb-math-inline\">\\mathbf{H} = 2\\mathbf{X}\\mathbf{X}^T</span>，问题等价于：</p>\n<div class=\"kb-math kb-math-display\">\\min_{\\mathbf{M}, \\hat{\\mathbf{W}}} \\|\\mathbf{W} - \\mathbf{M} \\odot \\hat{\\mathbf{W}}\\|_{\\mathbf{H}}^2</div>\n<div class=\"key-point\">💡 关键：联合优化掩码和权重是 NP-hard 问题，SparseGPT 通过贪心列式处理将其转化为一系列可解的子问题。</div>\n<p><strong>2. OBS 闭式更新</strong></p>\n<p>当决定剪枝第 <span class=\"kb-math kb-math-inline\">j</span> 列时，OBS 给出最优的权重补偿公式：</p>\n<div class=\"kb-math kb-math-display\">\\boldsymbol{\\delta}_j = -\\frac{w_j}{[\\mathbf{H}^{-1}]_{jj}} \\cdot \\mathbf{H}^{-1}_{:,j}</div>\n<p>即将第 <span class=\"kb-math kb-math-inline\">j</span> 列权重置零后，按 Hessian 逆的第 <span class=\"kb-math kb-math-inline\">j</span> 列方向对所有其他权重进行补偿更新，更新幅度与 <span class=\"kb-math kb-math-inline\">w_j / [\\mathbf{H}^{-1}]_{jj}</span> 成正比。对应的剪枝误差为：</p>\n<div class=\"kb-math kb-math-display\">\\varepsilon_j = \\frac{w_j^2}{[\\mathbf{H}^{-1}]_{jj}}</div>\n<p><strong>3. 部分更新与 Hessian 同步</strong></p>\n<p>SparseGPT 的关键洞察是：<strong>不需要更新所有权重，只需更新尚未处理的列</strong>。定义 <span class=\"kb-math kb-math-inline\">U_j</span> 为第 <span class=\"kb-math kb-math-inline\">j</span> 步时尚未处理的列集合，则：</p>\n<ul>\n<li>更新限制在 <span class=\"kb-math kb-math-inline\">U_j</span> 上仍然是 <span class=\"kb-math kb-math-inline\">U_j</span> 范围内的最优解</li>\n<li>所有行的 <span class=\"kb-math kb-math-inline\">U_j</span> 相同 → 可共享同一个 <span class=\"kb-math kb-math-inline\">(\\mathbf{H}_{U_j})^{-1}</span></li>\n<li><span class=\"kb-math kb-math-inline\">U_{j+1} = U_j \\setminus \\{j\\}</span>，对应的逆矩阵可通过 Gaussian Elimination 在 <span class=\"kb-math kb-math-inline\">O(|U_j|^2)</span> 内递推更新</li>\n</ul>\n<div class=\"warn-box\">⚠️ 注意：这一\"Hessian 同步\"是 SparseGPT 相比传统 OBS 的核心加速来源——将 <span class=\"kb-math kb-math-inline\">d_{\\text{row}}</span> 次独立的 <span class=\"kb-math kb-math-inline\">O(d_{\\text{col}}^3)</span> Hessian 求逆合并为一次共享的 <span class=\"kb-math kb-math-inline\">O(d_{\\text{col}}^3)</span> 递推序列。</div>\n<p><strong>4. 自适应掩码选择</strong></p>\n<p>固定列顺序的贪心策略可能导致次优掩码。SparseGPT 引入分块自适应机制：</p>\n<ul>\n<li>将 <span class=\"kb-math kb-math-inline\">d_{\\text{col}}</span> 列分为大小 <span class=\"kb-math kb-math-inline\">B_s = 128</span> 的块</li>\n<li>在每个块内，根据 OBS 误差 <span class=\"kb-math kb-math-inline\">w_{ij}^2 / [\\mathbf{H}^{-1}]_{jj}</span> 选择误差最小的 <span class=\"kb-math kb-math-inline\">p\\%</span> 权重剪枝</li>\n<li>块间按固定顺序处理，块内自适应选择</li>\n</ul>\n<p>这在全局最优（<span class=\"kb-math kb-math-inline\">B_s = d_{\\text{col}}</span>，计算不可行）和纯贪心（<span class=\"kb-math kb-math-inline\">B_s = 1</span>）之间取得了良好平衡。</p>\n<p><strong>5. 半结构化稀疏与联合量化</strong></p>\n<p>对于 n:m 半结构化稀疏（如 NVIDIA 的 2:4 模式），只需设置 <span class=\"kb-math kb-math-inline\">B_s = m</span>，在每 <span class=\"kb-math kb-math-inline\">m</span> 个连续权重中保留 <span class=\"kb-math kb-math-inline\">n</span> 个。</p>\n<p>联合量化通过修改误差公式实现：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{E}_{:,j} = \\frac{\\mathbf{W}_{:,j} - \\mathbf{M}_{:,j} \\cdot \\text{quant}(\\mathbf{W}_{:,j})}{[\\mathbf{H}^{-1}]_{jj}}</div>\n<p>在同一遍列扫描中同时完成剪枝和量化，无额外计算开销。</p>\n<h5>关键实验结果</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>方法</th>\n<th>稀疏度</th>\n<th>ZeroShot 平均精度</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>OPT-175B</td>\n<td>Dense</td>\n<td>0%</td>\n<td>70.29</td>\n</tr>\n<tr>\n<td>OPT-175B</td>\n<td>Magnitude</td>\n<td>50%</td>\n<td>31.10（崩溃）</td>\n</tr>\n<tr>\n<td>OPT-175B</td>\n<td><strong>SparseGPT</strong></td>\n<td><strong>50%</strong></td>\n<td><strong>70.52</strong></td>\n</tr>\n<tr>\n<td>OPT-175B</td>\n<td>SparseGPT</td>\n<td>4:8</td>\n<td>69.62</td>\n</tr>\n<tr>\n<td>OPT-175B</td>\n<td>SparseGPT</td>\n<td>2:4</td>\n<td>69.11</td>\n</tr>\n</tbody>\n</table></div>\n<p>核心发现：\n- <strong>Magnitude Pruning 在所有规模上均崩溃</strong>，而 SparseGPT 在 50% 稀疏度下精度甚至略优于稠密基线\n- <strong>规模效应显著</strong>：OPT-2.7B 约损失 1 点困惑度，OPT-66B 几乎无损，OPT-175B 反而略有提升\n- OPT-175B 可达 <strong>60% 稀疏度</strong>仍保持合理困惑度；Magnitude Pruning 在 10% 即崩溃\n- <strong>50% 稀疏 + 4-bit 量化</strong>优于等存储量的 GPTQ 3-bit（OPT-175B: 8.29 vs 8.68 困惑度）\n- 2:4 半结构化在最大模型上仅增加 0.39 困惑度\n- <strong>后层更敏感</strong>：跳过最后 1/3 层的 2:4 剪枝效果最佳</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>Magnitude Pruning</th>\n<th>AdaPrune (OBS)</th>\n<th>SparseGPT</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>需要重训练</td>\n<td>通常需要</td>\n<td>否</td>\n<td>否</td>\n</tr>\n<tr>\n<td>单层复杂度</td>\n<td><span class=\"kb-math kb-math-inline\">O(d)</span></td>\n<td><span class=\"kb-math kb-math-inline\">O(d_{\\text{row}} \\cdot d_{\\text{col}}^3)</span></td>\n<td><span class=\"kb-math kb-math-inline\">O(d_{\\text{col}}^3 + d_{\\text{row}} \\cdot d_{\\text{col}}^2)</span></td>\n</tr>\n<tr>\n<td>175B 模型可行性</td>\n<td>✅（但精度崩溃）</td>\n<td>❌（内存/时间不可行）</td>\n<td>✅（~4h, 单 A100）</td>\n</tr>\n<tr>\n<td>精度（50% 稀疏）</td>\n<td>崩溃</td>\n<td>N/A</td>\n<td>接近无损</td>\n</tr>\n<tr>\n<td>支持 n:m 稀疏</td>\n<td>否</td>\n<td>否</td>\n<td>✅</td>\n</tr>\n<tr>\n<td>支持联合量化</td>\n<td>否</td>\n<td>否</td>\n<td>✅</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "SparseGPT 相比传统 OBS 剪枝方法的核心加速来源是什么？",
        "options": [
          "使用更小的校准数据集减少 Hessian 计算量",
          "所有行共享同一 Hessian 逆矩阵，通过递推更新避免重复求逆",
          "用 Magnitude 代替 OBS 误差进行掩码选择",
          "将逐层问题转化为全局优化问题"
        ],
        "answer": 1,
        "explain": "SparseGPT 的关键洞察是所有行的未处理列集合 U_j 相同，因此可共享同一个 (H_{U_j})^{-1}，通过 Gaussian Elimination 递推更新，将复杂度从 O(d_row·d_col³) 降至 O(d_col³ + d_row·d_col²)。"
      }
    },
    {
      "id": "saap",
      "num": 11,
      "name": "SAAP",
      "fullName": "结构感知自适应剪枝 (SAAP)",
      "year": "2026",
      "org": "IEEE",
      "parent": "sparsegpt",
      "paperUrl": "https://ieeexplore.ieee.org/abstract/document/11360603/",
      "projectUrl": "",
      "category": "pruning",
      "motivation": "维持LLM理解能力的结构感知剪枝",
      "summary": "SAAP 的核心目标是：维持LLM理解能力的结构感知剪枝。",
      "keyPoints": [
        "核心动机：维持LLM理解能力的结构感知剪枝",
        "演化来源：继承或改进自 sparsegpt",
        "代表机构：IEEE"
      ],
      "detail": "<p>维持LLM理解能力的结构感知剪枝</p>"
    },
    {
      "id": "replaceme",
      "num": 12,
      "name": "ReplaceMe",
      "fullName": "深度剪枝替换 (ReplaceMe)",
      "year": "2026",
      "org": "NeurIPS",
      "parent": "movement_pruning",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/1c10d0c087c14689628124bbc8fa69f6-Abstract-Conference.html",
      "projectUrl": "",
      "category": "pruning",
      "motivation": "深度剪枝与Transformer块线性化",
      "summary": "ReplaceMe 的核心目标是：深度剪枝与Transformer块线性化。",
      "keyPoints": [
        "核心动机：深度剪枝与Transformer块线性化",
        "演化来源：继承或改进自 movement_pruning",
        "代表机构：NeurIPS"
      ],
      "detail": "<p>深度剪枝与Transformer块线性化</p>"
    },
    {
      "id": "vitcop",
      "num": 13,
      "name": "ViTCoP",
      "fullName": "视觉文本协同剪枝 (ViTCoP)",
      "year": "2026",
      "org": "arXiv",
      "parent": "saap",
      "paperUrl": "https://arxiv.org/abs/2601.17818",
      "projectUrl": "",
      "category": "pruning",
      "motivation": "视觉与文本语义协同加速多模态",
      "summary": "ViTCoP 的核心目标是：视觉与文本语义协同加速多模态。",
      "keyPoints": [
        "核心动机：视觉与文本语义协同加速多模态",
        "演化来源：继承或改进自 saap",
        "代表机构：arXiv"
      ],
      "detail": "<p>视觉与文本语义协同加速多模态</p>"
    },
    {
      "id": "hinton_kd",
      "num": 14,
      "name": "Hinton KD",
      "fullName": "知识蒸馏 (Knowledge Distillation)",
      "year": "2015",
      "org": "Google",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1503.02531",
      "projectUrl": "",
      "category": "distillation",
      "motivation": "引入Soft Targets和温度系数T",
      "summary": "Hinton KD 的核心目标是：引入Soft Targets和温度系数T。",
      "keyPoints": [
        "核心动机：引入Soft Targets和温度系数T",
        "代表机构：Google"
      ],
      "detail": "<p>引入Soft Targets和温度系数T</p>"
    },
    {
      "id": "distilbert",
      "num": 15,
      "name": "DistilBERT",
      "fullName": "蒸馏BERT (DistilBERT)",
      "year": "2019",
      "org": "HuggingFace",
      "parent": "hinton_kd",
      "paperUrl": "https://arxiv.org/abs/1910.01108",
      "projectUrl": "",
      "category": "distillation",
      "motivation": "预训练阶段三重损失蒸馏保留97%性能",
      "summary": "DistilBERT 的核心目标是：预训练阶段三重损失蒸馏保留97%性能。",
      "keyPoints": [
        "核心动机：预训练阶段三重损失蒸馏保留97%性能",
        "演化来源：继承或改进自 hinton_kd",
        "代表机构：HuggingFace"
      ],
      "detail": "<p>预训练阶段三重损失蒸馏保留97%性能</p>"
    },
    {
      "id": "tinybert",
      "num": 16,
      "name": "TinyBERT",
      "fullName": "微型BERT (TinyBERT)",
      "year": "2020",
      "org": "华为",
      "parent": "distilbert",
      "paperUrl": "https://aclanthology.org/2020.findings-emnlp.372/",
      "projectUrl": "",
      "category": "distillation",
      "motivation": "两阶段蒸馏涵盖嵌入中间预测层",
      "summary": "TinyBERT 的核心目标是：两阶段蒸馏涵盖嵌入中间预测层。",
      "keyPoints": [
        "核心动机：两阶段蒸馏涵盖嵌入中间预测层",
        "演化来源：继承或改进自 distilbert",
        "代表机构：华为"
      ],
      "detail": "<p>两阶段蒸馏涵盖嵌入中间预测层</p>"
    },
    {
      "id": "minillm",
      "num": 17,
      "name": "MiniLLM",
      "fullName": "最小化LLM (MiniLLM)",
      "year": "2024",
      "org": "微软",
      "parent": "tinybert",
      "paperUrl": "https://arxiv.org/abs/2306.08543",
      "projectUrl": "",
      "category": "distillation",
      "motivation": "反向KL散度蒸馏大语言模型",
      "summary": "MiniLLM 的核心目标是：反向KL散度蒸馏大语言模型。",
      "keyPoints": [
        "核心动机：反向KL散度蒸馏大语言模型",
        "演化来源：继承或改进自 tinybert",
        "代表机构：微软"
      ],
      "detail": "<p>反向KL散度蒸馏大语言模型</p>"
    },
    {
      "id": "activeprune",
      "num": 18,
      "name": "ActivePrune",
      "fullName": "主动剪枝蒸馏 (ActivePrune)",
      "year": "2026",
      "org": "EACL",
      "parent": "minillm",
      "paperUrl": "https://aclanthology.org/2026.findings-eacl.229/",
      "projectUrl": "",
      "category": "distillation",
      "motivation": "结合数据剪枝与蒸馏的主动学习",
      "summary": "ActivePrune 的核心目标是：结合数据剪枝与蒸馏的主动学习。",
      "keyPoints": [
        "核心动机：结合数据剪枝与蒸馏的主动学习",
        "演化来源：继承或改进自 minillm",
        "代表机构：EACL"
      ],
      "detail": "<p>结合数据剪枝与蒸馏的主动学习</p>"
    },
    {
      "id": "longformer",
      "num": 19,
      "name": "Longformer",
      "fullName": "长文档Transformer (Longformer)",
      "year": "2020",
      "org": "Allen AI",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2004.05150",
      "projectUrl": "",
      "category": "sparsity_deploy",
      "motivation": "局部窗口+全局注意力实现线性复杂度",
      "summary": "Longformer 的核心目标是：局部窗口+全局注意力实现线性复杂度。",
      "keyPoints": [
        "核心动机：局部窗口+全局注意力实现线性复杂度",
        "代表机构：Allen AI"
      ],
      "detail": "<p>局部窗口+全局注意力实现线性复杂度</p>"
    },
    {
      "id": "bigbird",
      "num": 20,
      "name": "BigBird",
      "fullName": "大鸟 (BigBird)",
      "year": "2020",
      "org": "Google",
      "parent": "longformer",
      "paperUrl": "https://proceedings.neurips.cc/paper/2020/hash/c8512d142a2d849725f31a9a7a361ab9-Abstract.html",
      "projectUrl": "",
      "category": "sparsity_deploy",
      "motivation": "引入随机注意力块保持全图连通",
      "summary": "BigBird 的核心目标是：引入随机注意力块保持全图连通。",
      "keyPoints": [
        "核心动机：引入随机注意力块保持全图连通",
        "演化来源：继承或改进自 longformer",
        "代表机构：Google"
      ],
      "detail": "<p>引入随机注意力块保持全图连通</p>"
    },
    {
      "id": "nm_sparsity",
      "num": 21,
      "name": "N:M Sparsity",
      "fullName": "N:M细粒度稀疏 (N:M Sparsity)",
      "year": "2021",
      "org": "NVIDIA",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2102.04010",
      "projectUrl": "",
      "category": "sparsity_deploy",
      "motivation": "硬件原生2:4稀疏兼顾精度与加速",
      "summary": "N:M Sparsity 的核心目标是：硬件原生2:4稀疏兼顾精度与加速。",
      "keyPoints": [
        "核心动机：硬件原生2:4稀疏兼顾精度与加速",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>硬件原生2:4稀疏兼顾精度与加速</p>"
    },
    {
      "id": "permllm",
      "num": 22,
      "name": "PermLLM",
      "fullName": "可学习排列LLM (PermLLM)",
      "year": "2026",
      "org": "NeurIPS",
      "parent": "nm_sparsity",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/1d3fe3adb016edebc4fa615c25d22cb0-Abstract-Conference.html",
      "projectUrl": "",
      "category": "sparsity_deploy",
      "motivation": "可学习通道排列优化N:M稀疏精度",
      "summary": "PermLLM 发现手工设计的通道排列指标与实际剪枝损失几乎不相关，转而将排列矩阵参数化为可学习的 Sinkhorn 双随机矩阵，配合 block-wise 分解和 STE 梯度传递，端到端学习最优通道排列，在 LLaMA/Qwen 等模型的 2:4 和 4:8 稀疏下大幅超越现有通道排列方法（如 LLaMA-3.1 8B 2:4 PPL 从 21.09 降至 14.03）。",
      "keyPoints": [
        "<strong>核心发现</strong>：手工排列指标（最大化保留权重重要性之和）与实际剪枝损失的 Spearman 相关系数仅 0.09–0.28，说明现有启发式排列策略本质上是在错误的代理目标上优化",
        "<strong>可微排列学习</strong>：将排列矩阵松弛为双随机矩阵（Sinkhorn 归一化），前向用 Hungarian 算法硬化为真排列矩阵，反向用 STE 穿透离散操作传梯度",
        "<strong>Block-wise 分解</strong>：将 $C_{in} \\times C_{in}$ 排列矩阵分解为 $N_B$ 个 $B \\times B$ 块对角矩阵，参数量从 $O(C_{in}^2)$ 降至 $O(C_{in} \\cdot B)$，Hungarian 复杂度从 $O(C_{in}^3)$ 降至 $O(C_{in} \\cdot B^2)$",
        "<strong>即插即用</strong>：PermLLM 可与任意 N:M 剪枝指标（Wanda、RIA）组合，仅需 128 条校准样本、约 2.5 小时（7B/4×GPU）即可完成排列学习",
        "<strong>高效部署</strong>：设计 CUDA kernel 实现 block-wise 排列，相比 PyTorch 原生实现加速 84×，排列开销可忽略"
      ],
      "detail": "<h5>问题动机</h5>\n<p><img alt=\"Figure 1: 手工排列指标与实际剪枝损失的对比\" src=\"https://ar5iv.labs.arxiv.org/html/2510.10136/assets/x1.png\" /></p>\n<p><strong>Figure 1</strong>：对同一层的不同通道排列，手工指标 Score $S$（保留权重重要性之和）最高的排列（左图）实际剪枝损失反而最大；而 Score 较低的排列（右图）实际损失最小。这说明最大化 $S$ 是一个错误的代理目标。</p>\n<h5>方法概览</h5>\n<p><img alt=\"Figure 2: PermLLM 框架\" src=\"https://ar5iv.labs.arxiv.org/html/2510.10136/assets/x2.png\" /></p>\n<p><strong>Figure 2</strong>：PermLLM 整体流程。对每个线性层：(1) 学习 block-wise 排列矩阵 $P_B$；(2) 对权重施加排列 $W \\cdot P_B$；(3) 基于剪枝指标生成 N:M mask $M$；(4) 最小化稀疏输出与稠密输出的距离。</p>\n<h5>Sinkhorn 可微排列</h5>\n<p><strong>核心思想</strong>：排列矩阵 $P \\in {0,1}^{n \\times n}$ 是离散的，无法直接求梯度。PermLLM 将其松弛为双随机矩阵（每行每列之和均为 1 的非负矩阵），通过 Sinkhorn 归一化实现：</p>\n<div class=\"kb-math kb-math-display\">\\hat{P} = \\text{Sinkhorn}(W_P, \\tau) \\quad \\text{where} \\quad W_P \\in \\mathbb{R}^{n \\times n} \\text{ is learnable}</div>\n<p>Sinkhorn 迭代过程：\n1. 初始化：$S^{(0)} = \\exp(W_P / \\tau)$（温度 $\\tau$ 控制软硬程度）\n2. 行归一化：$S^{(l)} = S^{(l-1)} \\oslash (S^{(l-1)} \\mathbf{1} \\mathbf{1}^\\top)$\n3. 列归一化：$S^{(l)} = S^{(l)} \\oslash (\\mathbf{1} \\mathbf{1}^\\top S^{(l)})$\n4. 重复 $L$ 次（默认 $L=5$），得到软排列 $\\hat{P}$</p>\n<p><strong>前向硬化</strong>：用 Hungarian 算法从 $\\hat{P}$ 提取最优硬排列 $P^* = \\text{Hungarian}(\\hat{P})$</p>\n<p><strong>反向 STE</strong>：$\\nabla_{W_P} \\mathcal{L} = \\nabla_{\\hat{P}} \\mathcal{L}$（梯度直接穿透 Hungarian 操作传给软排列）</p>\n<p><strong>温度退火</strong>：$\\tau$ 从 1 线性衰减到 0.1，使训练初期探索充分、后期逼近离散解。</p>\n<h5>Block-wise 排列</h5>\n<p>全排列矩阵 $P \\in \\mathbb{R}^{C_{in} \\times C_{in}}$ 参数量和 Hungarian 复杂度过高（如 $C_{in}=4096$）。PermLLM 将其分解为块对角结构：</p>\n<div class=\"kb-math kb-math-display\">P_B = \\text{diag}(P_1, P_2, \\ldots, P_{N_B}), \\quad N_B = C_{in} / B</div>\n<p>每个 $P_i \\in \\mathbb{R}^{B \\times B}$，默认 $B=64$。这意味着排列只在每个大小为 $B$ 的通道块内进行，跨块通道顺序不变。</p>\n<p><strong>复杂度对比</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th></th>\n<th>参数量</th>\n<th>Hungarian 复杂度</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>全排列</td>\n<td>$C_{in}^2$</td>\n<td>$O(C_{in}^3)$</td>\n</tr>\n<tr>\n<td>Block-wise</td>\n<td>$C_{in} \\times B$</td>\n<td>$O(C_{in} \\cdot B^2)$</td>\n</tr>\n</tbody>\n</table></div>\n<p>当 $B=64, C_{in}=4096$：参数从 16.8M 降至 262K（64×），复杂度从 $O(10^{10})$ 降至 $O(10^6)$。</p>\n<h5>Mask 生成与 STE</h5>\n<p>给定排列后的权重 $W \\cdot P_B^*$ 和剪枝指标（如 Wanda: $|w_{ij}| \\cdot |x_j|_2$），计算重要性分数 $S$。</p>\n<p><strong>前向</strong>：在每个 M 元素组内，用 argmax 选择 top-N 生成硬 mask $M^*$</p>\n<p><strong>反向</strong>：用 softmax 近似 argmax 以传递梯度：</p>\n<div class=\"kb-math kb-math-display\">\\hat{M}_{ij} = \\frac{\\exp(S_{ij} / t)}{\\sum_{k \\in \\text{group}} \\exp(S_{ik} / t)}</div>\n<p>STE 使得梯度可以从 mask 传回排列矩阵参数。</p>\n<h5>损失函数</h5>\n<p>逐层优化，最小化稀疏层输出与稠密层输出的余弦距离：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = 1 - \\cos(Y_{\\text{dense}}, \\; Y_{\\text{sparse}})</div>\n<p>其中 $Y_{\\text{sparse}} = (M^<em> \\odot (W \\cdot P_B^</em>)) \\cdot X$，$Y_{\\text{dense}} = W \\cdot X$。</p>\n<h5>算法伪代码</h5>\n<pre><code>Algorithm: PermLLM — Learnable Channel Permutation for N:M Sparsity\nInput: 预训练权重 W ∈ R^{C_out × C_in}, 校准集输入 X, \n       block_size B=64, Sinkhorn iter L=5, τ: 1→0.1\nOutput: 最优排列 P*_B, 稀疏 mask M*\n\n1. 初始化 W_P ∈ R^{N_B × B × B} (N_B = C_in/B 个块)\n2. for each training step:\n   a. Sinkhorn 归一化:\n      for each block i = 1..N_B:\n          P̂_i = Sinkhorn(W_P[i], τ)      // 软双随机矩阵\n          P*_i = Hungarian(P̂_i)           // 硬排列矩阵\n      P*_B = diag(P*_1, ..., P*_NB)\n   b. 排列权重: W_perm = W · P*_B\n   c. 计算重要性: S = metric(W_perm, X)   // e.g., Wanda\n   d. 生成 mask:\n      前向: M* = argmax_N:M(S)            // 硬 mask\n      反向: M̂ = softmax_N:M(S/t)          // 软 mask (STE)\n   e. 稀疏输出: Y_sparse = (M* ⊙ W_perm) · X\n   f. 损失: L = 1 - cos(W·X, Y_sparse)\n   g. 反向传播: ∇W_P via STE through Hungarian and argmax\n   h. 更新 W_P (AdamW, lr ∈ {1e-3, 5e-3})\n   i. 线性衰减 τ\n3. 返回 P*_B, M*\n</code></pre>\n<h5>实验结果</h5>\n<p><strong>主要结果（WikiText-2 PPL，↓ 更好）</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>稀疏度</th>\n<th>Wanda</th>\n<th>Wanda+CP</th>\n<th>PermLLM_Wanda</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>LLaMA-2 7B</td>\n<td>2:4</td>\n<td>12.03</td>\n<td>12.02</td>\n<td><strong>11.07</strong></td>\n</tr>\n<tr>\n<td>LLaMA-2 13B</td>\n<td>2:4</td>\n<td>9.54</td>\n<td>9.37</td>\n<td><strong>8.85</strong></td>\n</tr>\n<tr>\n<td>LLaMA-3.1 8B</td>\n<td>2:4</td>\n<td>15.82</td>\n<td>21.09</td>\n<td><strong>14.03</strong></td>\n</tr>\n<tr>\n<td>Qwen-2.5 7B</td>\n<td>2:4</td>\n<td>13.10</td>\n<td>12.83</td>\n<td><strong>11.63</strong></td>\n</tr>\n</tbody>\n</table></div>\n<ul>\n<li>Wanda+CP 使用手工排列指标（最大化保留权重重要性之和），在 LLaMA-3.1 上反而严重恶化（21.09 vs 15.82），验证了手工指标的不可靠性</li>\n<li>PermLLM 在所有模型和稀疏度设置下均一致优于基线</li>\n<li>与 RIA 指标组合同样有效：LLaMA-2 7B 2:4 PPL 从 11.49 降至 10.75</li>\n</ul>\n<p><strong>部署效率</strong>：自定义 CUDA kernel 实现 block-wise 排列，相比 PyTorch 原生 <code>index_select</code> 加速 <strong>84×</strong>（0.01ms vs 0.84ms per layer），额外延迟可忽略。</p>\n<p><strong>训练开销</strong>：128 条 C4 校准样本，序列长度 1024，LLaMA-2 7B 在 4×A100 上约 2.5 小时。</p>",
      "quiz": {
        "q": "",
        "options": [],
        "answer": 0,
        "explain": ""
      }
    },
    {
      "id": "gigamoe",
      "num": 23,
      "name": "GigaMoE",
      "fullName": "十亿像素MoE (GigaMoE)",
      "year": "2026",
      "org": "AAAI",
      "parent": "nm_sparsity",
      "paperUrl": "https://ojs.aaai.org/index.php/AAAI/article/view/38810",
      "projectUrl": "",
      "category": "sparsity_deploy",
      "motivation": "稀疏引导MoE高效十亿像素检测",
      "summary": "GigaMoE 的核心目标是：稀疏引导MoE高效十亿像素检测。",
      "keyPoints": [
        "核心动机：稀疏引导MoE高效十亿像素检测",
        "演化来源：继承或改进自 nm_sparsity",
        "代表机构：AAAI"
      ],
      "detail": "<p>核心示意图说明：官方 AAAI 页面未提供独立图片直链；论文 Figure 1 位于官方 PDF <code>https://ojs.aaai.org/index.php/AAAI/article/download/38810/42772</code>，展示 GigaMoE 相比 SparseFormer 的 FLOPs 分解，说明 FFN/MoE 是主要优化对象。</p>\n<p>```python</p>"
    },
    {
      "id": "hierasparse",
      "num": 24,
      "name": "HieraSparse",
      "fullName": "分层稀疏注意力 (HieraSparse)",
      "year": "2026",
      "org": "arXiv",
      "parent": "bigbird",
      "paperUrl": "https://arxiv.org/abs/2604.16864",
      "projectUrl": "",
      "category": "sparsity_deploy",
      "motivation": "分层半结构化稀疏KV注意力",
      "summary": "HieraSparse 的核心目标是：分层半结构化稀疏KV注意力。",
      "keyPoints": [
        "核心动机：分层半结构化稀疏KV注意力",
        "演化来源：继承或改进自 bigbird",
        "代表机构：arXiv"
      ],
      "detail": "<p>分层半结构化稀疏KV注意力</p>"
    }
  ],
  "categories": {
    "quantization": {
      "label": "量化技术",
      "color": "#22a06b"
    },
    "pruning": {
      "label": "剪枝技术",
      "color": "#5b63d3"
    },
    "distillation": {
      "label": "知识蒸馏",
      "color": "#e8820c"
    },
    "sparsity_deploy": {
      "label": "稀疏化与部署",
      "color": "#d32f2f"
    }
  },
  "projectUrls": {}
};
