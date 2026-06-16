/**
 * compiler-data.js — 由 pipeline/build.py 于 2026-06-16 17:00:14 自动生成。
 * 源文件：content/infra/compiler.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "infra",
    "topic_id": "compiler",
    "topic_name": "AI编译器",
    "page_title": "AI编译器技术演进总结",
    "page_subtitle": "2026-06-16 版",
    "page_desc": "系统梳理从 XLA、TVM 到 MLIR、Triton 的 AI 编译器发展历程与核心技术突破，覆盖经典奠基工作与2026年最新进展。",
    "page_icon": "⚙️",
    "hero_pills": [
      "🏷️ Deep Learning Compiler · Graph Optimization · Kernel Synthesis · LLM-Driven Compilation"
    ],
    "count_pill": "{count} 个算法",
    "image_base": "",
    "overview_from_doc": true,
    "latest_overview_from_doc": true
  },
  "overview": [
    {
      "title": "",
      "body_html": "<h1>浅谈AI编译器趋势：从更快的kernel到重新定义执行边界</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2040199323170951424\">https://zhuanlan.zhihu.com/p/2040199323170951424</a></li>\n<li>作者: 画饼充饥</li>\n</ul>\n<hr />\n<p>浅谈AI编译器趋势：从更快的kernel到重新定义执行边界</p>\n<h1>浅谈AI编译器趋势：从更快的kernel到重新定义执行边界</h1>\n<p>作者: 画饼充饥, 赞: 219</p>\n<p>最近看AI infra和AI compiler的论文，一个很明显的变化是大家已经不满足于把某个算子编译的更快了。早期深度学习编译器的叙事多半围绕operator graph，例如MatMul、Conv、Softmax、LayerNorm、Add这些算子怎么融合，layout怎么变换，schedule怎么搜索，最后怎么生成CUDA或Triton kernel。这个范式在CNN、BERT时代很自然，但放在今天LLM、长上下文、KV cache、MoE、动态batch、分布式训练上，operator这个边界开始显得更粗粒度。</p>\n<p><strong>AI编译器正在重新刻画深度学习程序的执行边界。</strong>过去一个 operator 是边界，一个 kernel launch 是边界，一个框架 runtime hook 是边界。现在这些边界都在被拆开、下沉或上移——<strong>旧的执行单位装不下现在的AI workload了。</strong></p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-0c3d7466c3a5e3389d49eab0f1d4ec97_1440w.jpg\" /></p>\n<p>AI编译器抽象边界的演进</p>\n<h2>1. 从operator到tile，编译器的单位正在下沉</h2>\n<p>过去 operator 是深度学习系统的默认单位。一个 Attention 是一个 operator，一个 LayerNorm 是一个 operator，一个 MatMul 是一个 operator。问题是 GPU 真正在意的是数据怎么在 HBM（ High Bandwidth Memory ）、shared memory、register 之间移动，tile 怎么复用，Tensor Core 怎么喂满，warp 怎么分工，kernel 边界有没有同步bubble。于是最近几年大量工作都在把编译器视角从 operator 下沉到 loop、block、tile、task。</p>\n<p>TensorIR 是这条线比较早的代表。它把 tensor computation primitive 变成一等对象，让编译器能围绕 tensorized hardware primitive 进行自动优化，而不是只在传统 loop nest 上做通用变换。Welder 则从 memory access 的角度推进了一步，用 tile-graph 显式建模 tile 级数据移动和复用，把跨算子的 memory locality 放进编译器。Ladder 关注的是低精度和自定义数据类型，它用 tType 和扩展 tensor expression 把 custom data type 放进编译器优化空间，而不是把 dtype 当成一个简单属性。TensorIR、Welder、Ladder 这三类工作共同说明了<strong>现代 AI 编译器需要的不是单纯 graph IR，也不是裸 CUDA，而是一个能同时表达数学结构、tile 数据流和硬件约束的中间层。</strong></p>\n<p>TileLang 和 ThunderKittens 则更偏向如何让人写高性能 kernel 更容易。Triton 已经把 tile programming 带到了 Python 生态，但写好 Triton kernel 依然需要很强的硬件经验。TileLang 的思路是把 dataflow 和 scheduling space 分开，用户专注描述 tile 级数据流，thread binding、layout、tensorize、pipeline 等交给 compiler annotation 和 primitive 管理。ThunderKittens 则用一小组面向 GPU 层级的抽象简化 AI kernel 编写，比如 warp-level tile、thread-block-level async pattern 等。它们不是要完全替代 compiler，而是在填补PyTorch 太高层、CUDA 太底层之间的开发空档。</p>\n<p>Cypress 代表了另一个方向。现代 GPU 上 TMA、Tensor Core、warp specialization、producer-consumer pipeline 越来越复杂，用户手写同步和数据搬运的负担越来越重。Cypress 用 task-based tensor computation 来表达 GPU 张量计算，用户写顺序语义的 task 和 mapping spec，compiler 负责插入数据移动和同步。它和 TileLang、ThunderKittens的共同点在于<strong>GPU kernel 编程正在从写线程转向组织 tile/task。</strong></p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-dbe1b3ec9db53487c9c6ca1709b7ddbf_1440w.jpg\" /></p>\n<p>Operator graph vs Tile/task graph</p>\n<h2>2. 从手写专家kernel到语义融合</h2>\n<p>如果说 tile 级编程解决的是执行单位太粗，那还有一类工作解决的是另一个问题<strong>传统 fusion 规则太保守。</strong></p>\n<p>普通 operator fusion 最擅长处理 elementwise 链，比如relu(x)+1。但 Attention 里的 fusion 难点不是 elementwise，而是 reduction dependency。稳定 softmax 要先对一行求 max，再用这个 max 去算 exp 和 sum。传统 loop fusion 看到后面的 sum 依赖前面的 max 最终值，就会拒绝融合。FlashAttention 的成功恰恰在于它绕开了这个限制。它不 materialize 完整 attention score 和 softmax，而是用 online softmax 在 tile 内不断更新 max、sum 和输出。</p>\n<p>Neptune这个工作亮点在于它把这个专家手写技巧抽象成了编译器 transformation。它的核心可以概括成<strong>break dependency, then repair algebraically</strong>。先故意做一个 naive fusion，让 consumer reduction 暂时读到 producer reduction 的中间值，然后自动推导一个 repair term，把旧坐标系下的 partial result 修到新坐标系下。对 softmax 来说，这个修正项就是exp(old_max-new_max)。当这个 transformation 用在 plain attention 上，就得到类似 FlashAttention 的 rolling update，用在 decoding attention 上，就得到类似 FlashDecoding 的 split-k update。</p>\n<p>这篇论文的启发不在于又一个 attention kernel，而在于它给了一个很清晰的研究范式是<strong>找到专家手写 kernel 中反复出现的算法结构，把它提升成带正确性条件的 compiler primitive。</strong> FlashAttention 背后的 online softmax 是一个例子，FlashDecoding 背后的 split-k partial reduction 是一个例子。未来 LayerNorm/RMSNorm backward、Linear + CrossEntropy、DPO loss、optimizer update，也可能有类似的专家经验编译器化空间。</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-dbb190ca66ef5be679759040a5a31390_1440w.jpg\" /></p>\n<p>Neptune——语义融合和普通fusion的区别</p>\n<p>FlexAttention 和 FlashInfer 则体现了 attention 生态的另一个趋势。attention 不再是一个固定算子，而是一族可编程算子。FlexAttention 让用户用少量 PyTorch 代码表达 score modification、mask、block sparsity 等 attention 变体，再由编译器生成高性能 fused kernel。FlashInfer 面向 LLM serving，把 KV-cache 存储异构性、block-sparse 格式、JIT attention template 和 load-balanced scheduling 结合起来，目标是在真实 serving 场景里覆盖 PagedAttention、长上下文、并行生成等动态需求。</p>\n<p>Nautilus 则把 Neptune 往自动化方向又推了一步。Neptune 仍然需要 high-level schedule template，而 Nautilus 试图从高层代数规格出发自动发现高级优化序列，并声称能自动发现 FlashAttention-3-like kernels。这说明 attention compiler 的路线正在从用户写 kernel走向用户写数学定义，compiler 搜索高级语义优化。</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-434fa50b2191014f1c35a46ae9445479_1440w.jpg\" /></p>\n<h2>3. Superoptimizer、Megakernel和动态执行</h2>\n<p>Superoptimizer 这两年重新火起来，但已经不是传统意义上的指令级 superoptimizer，而是 tensor program 级、甚至多层级 superoptimizer。Mirage 是代表。它提出 µGraphs，用统一表示覆盖 GPU compute hierarchy 里的 kernel、thread block 和 thread 层级，从而同时搜索 algebraic transformations、schedule transformations 和 custom kernel generation。Mirage 还用 probabilistic equivalence verification 来检查优化后的 tensor program 是否和原始程序等价。这个方向火起来并不奇怪，模型变体太多，shape 太多，dtype 太多，attention mask 太多，仅靠专家不可能给所有组合都手写最优 kernel。</p>\n<p>不过，纯黑盒搜索很难成为最终答案。搜索空间大、compile time 长、dynamic shape 泛化差、浮点正确性难讲。更有前途的路线可能是语义约束下的 superoptimization。Neptune 不是盲目搜索 FlashAttention，而是识别了 reduction repair 这个结构，Mirage 不是只在 graph 层搜索，而是把搜索空间组织成 µGraph，Nautilus 也不是单纯枚举低层 schedule，而是让高层优化、表达式重写和 tile 优化在一个 successive lowering 体系里联动。真正有影响力的优化，往往不是搜得更多，而是把搜索空间组织得更对。</p>\n<p>Megakernel 是另一条很热的线，尤其在 LLM inference 上。decode 阶段经常是小 batch、token-by-token，kernel launch overhead、kernel boundary synchronization、tail effect 和 cold start 会被放大。Megakernel / persistent kernel 的思路是把多个 operator 或 task 放进一个长期运行的 kernel，在 GPU 内部自己调度，从而减少 launch gap 并暴露 inter-kernel parallelism。Mirage Persistent Kernel 这类工作把 LLM inference 编译成 single megakernel，用 SM-level graph 表达依赖，做跨 operator software pipelining 和细粒度 overlap。</p>\n<p>但 megakernel 不是简单地kernel 越大越好。真实 LLM serving 有 dynamic batching、paged KV cache、不同请求长度、speculative decoding 分支、data-dependent computation。静态 megakernel 很难处理这些动态性。Event Tensor 的出发点正是，近期 megakernel 技术可以消除 launch gaps，但面对 dynamic shapes 和 data-dependent computation 仍然困难，它用 Event Tensor 显式编码 tiled tasks 之间的依赖，使 dynamic megakernel 能支持 shape-dependent 和 data-dependent dynamism，并在此基础上生成 persistent kernels。</p>\n<p>Infera 站在 serving system 侧给出了另一个版本的答案。它不是把所有东西都塞进一个 persistent megakernel，而是在编译期把大 operator partition 成 tiles/micro-kernels，并生成多版本 kernel，运行时再根据 GPU 状态、任务优先级和 kernel 属性进行动态调度。它还强调 compile strategy 和 scheduling strategy 必须匹配，否则 kernel 单独最优并不等于系统最优。</p>\n<h2>4. 分布式编译器，通信也在进入IR</h2>\n<p>训练侧的趋势和推理侧不一样。推理侧强调 kernel launch、dynamic serving 和 attention/KV cache，而训练侧最大的系统瓶颈之一仍然是通信。DDP、Tensor Parallel、Pipeline Parallel、ZeRO/FSDP、MoE expert parallel 都会引入通信。过去这些通信往往藏在框架实现里，DDP reducer hook、FSDP all-gather hook、ZeRO bucket、Megatron-LM 手写 all-reduce overlap。通信如果不在图里，编译器就只能优化 compute graph，看不见真正的执行瓶颈。</p>\n<p>Concerto 的贡献就是把这个问题抽象成编译器问题。它先 trace PyTorch function 得到 FX graph，再根据 parallel method 转成包含 computation operators 和 communication operators 的 ConcertoIR，之后把调度建模成 resource-constrained project scheduling problem，并通过 auto-decomposition 给 critical communication 创造 overlap 机会。</p>\n<p>Triton-distributed 和 TileLink 则把这个问题进一步推进到 kernel 编程层。Triton-distributed 扩展 Triton，把 OpenSHMEM-compliant communication primitives 集成到 compiler 中，让程序员能用高层 Python/Triton 风格写分布式 GPU kernels，并在单机和多机上做 computation、memory access、communication 的联合优化。它的目标不是简单替代 NCCL，而是让 fine-grained overlap 进入 compiler-generated kernel 的表达能力。</p>\n<p>TileLink 的角度更像是给重叠 kernel 一个 tile-centric 编程模型。传统做 compute-communication overlap 有两条路。operator decomposition 容易做但性能可能差，communication kernel 和 compute kernel 手工融合性能好但很难写。TileLink 把 computation 和 communication 的设计空间解耦，再用 tile-centric primitives 把二者连接起来，后端把这些 primitives 翻译成低层通信指令并生成 overlapped kernels。</p>\n<p>这说明分布式 AI 编译器也在经历和单卡 kernel compiler 类似的抽象演进。第一阶段是 runtime 里手工调 bucket、prefetch、overlap；第二阶段是 Concerto/DeepCompile 式的 compute-communication graph；第三阶段是 Triton-distributed/TileLink 式的 distributed kernel programming，让跨 GPU 通信成为 kernel 内部的可编译对象。这个变化很重要，因为未来 MoE、tensor parallel、sequence/context parallel 都越来越需要 tile/chunk 级别的通信计算交错，单纯靠框架 hook 很难做到足够细。</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-5edd2b168bd5f9e87289e94923ab1c2f_1440w.jpg\" /></p>\n<h2>5. 低精度、硬件异步和编译器越来越像执行系统</h2>\n<p>还有一条趋势容易被忽略：dtype、硬件异步能力和编译器正在深度耦合。FlashAttention-3 在 Hopper 上利用 Tensor Cores 和 TMA 的 asynchrony，通过 warp specialization overlap 数据搬运和计算、interleave block-wise matmul 和 softmax，并结合 FP8 low precision，在 H100 上相对 FlashAttention-2 有 1.5–2.0× 的 FP16 加速，FP8 路径接近 1.2 PFLOPs/s。这里的重点不是又优化了 Attention，而是现代 GPU 的能力已经要求 kernel 同时处理异步拷贝、warp specialization、Tensor Core scheduling、低精度数据路径和数值误差。</p>\n<p>Ladder 说明 dtype 本身也在变成编译器对象。低精度不再只是fp16/bf16/int8这种 tensor 属性，而是一套计算协议：storage type、scale、conversion、accumulation、layout、hardware instruction mapping。Ladder 用 tType 和扩展 tensor expression 把 custom data types 作为 first-class citizen，目标是在不断演进的数据类型和固定硬件 precision format 之间架桥。</p>\n<p>这也解释了为什么 TileLang、Cypress、ThunderKittens 这些工作会出现。硬件越来越强，但也越来越难编程。写高性能 kernel 不再只是选 tile size，而是要组织 producer/consumer pipeline、异步搬运、warp specialization、register/shared memory 资源、Tensor Core 指令、低精度转换。AI 编译器如果还停留在传统 loop schedule，就很难覆盖这些复杂性。</p>\n<p><img alt=\"\" src=\"https://picx.zhimg.com/v2-61599eff113e37c942ddb4b74c365ef7_1440w.jpg\" /></p>\n<h2>6. 总结</h2>\n<p>如果总结起来AI编译器最火的是什么，回答可以是megakernel、superoptimizer、tile programming、attention compiler、distributed compiler。但这些词只是表面，深层的共同点是<strong>传统抽象边界正在失效</strong>。</p>\n<p>Operator 边界失效，所以有 Welder、Neptune、TileLang、ThunderKittens。Kernel launch 边界失效，所以有 megakernel、persistent kernel、Event Tensor。Framework hook 边界失效，所以有 Concerto、Triton-distributed、TileLink。固定 attention 算子边界失效，所以有 FlexAttention、FlashInfer、Neptune、Nautilus。固定 dtype 边界失效，所以有 Ladder 和 FP8/INT4/自定义格式相关编译工作。Compile-time schedule 和 runtime schedule 边界失效，所以有 Infera 这类 compiler-scheduler co-design。</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-70641037bbf76663a5f4d3887c012b38_1440w.jpg\" /></p>\n<p>这给后续研究一个很清晰的启发。不要只追又快了多少的局部优化，而要问一个更本质的问题：<strong>现有系统里还有什么重要对象没有进入 IR？</strong> 过去几年，通信进入了 IR，tile 进入了 IR，dtype 进入了 IR，event 进入了 IR，attention mask 进入了 IR。训练里还有很多东西没有被很好地抽象，比如 backward、RNG、optimizer state、saved tensor、loss function、post-training preference objective、MoE routing。谁能把这些对象变成可编译、可验证、可生成高性能实现的 IR object，可能就会有机会做出好的 AI compiler 工作。</p>\n<h2>参考文献</h2>\n<p>[1] Siyuan Feng, Bohan Hou, Hongyi Jin, Wuwei Lin, Junru Shao, Ruihang Lai, Zihao Ye, Lianmin Zheng, Cody Hao Yu, Yong Yu, and Tianqi Chen. 2023. <em>TensorIR: An Abstraction for Automatic Tensorized Program Optimization</em>. In Proceedings of the 28th ACM International Conference on Architectural Support for Programming Languages and Operating Systems (ASPLOS ’23). ACM, New York, NY, USA, 804–817. DOI:<a href=\"https://link.zhihu.com/?target=https%3A//doi.org/10.1145/3575693.3576933\">https://doi.org/10.1145/3575693.3576933</a></p>\n<p>[2] Jason Ansel, Edward Yang, Horace He, Natalia Gimelshein, Animesh Jain, Michael Voznesensky, Bin Bao, Peter Bell, David Berard, Evgeni Burovski, et al. 2024. PyTorch 2: Faster Machine Learning Through Dynamic Python Bytecode Transformation and Graph Compilation. In <em>Proceedings of the 29th ACM International Conference on Architectural Support for Programming Languages and Operating Systems, Volume 2 (ASPLOS ’24)</em>.</p>\n<p>[3] Yining Shi, Zhi Yang, Jilong Xue, Lingxiao Ma, Yuqing Xia, Ziming Miao, Yuxiao Guo, Fan Yang, and Lidong Zhou. 2023. Welder: Scheduling Deep Learning Memory Access via Tile-graph. In <em>Proceedings of the 17th USENIX Symposium on Operating Systems Design and Implementation (OSDI ’23)</em>, 701–718.</p>\n<p>[4] Lei Wang, Yuke Wang, Ang Li, Hengrui Zhang, Yao Chen, Ziheng Jiang, Ruihang Lai, and Tianqi Chen. 2024. LADDER: Enabling Efficient Low-Precision Deep Learning Computing Through Hardware-Aware Tensor Transformation. In <em>Proceedings of the 18th USENIX Symposium on Operating Systems Design and Implementation (OSDI ’24)</em>.</p>\n<p>[5] Lei Wang, Yu Cheng, Yining Shi, Zhengju Tang, Zhiwen Mo, Wenhao Xie, Lingxiao Ma, Yuqing Xia, Jilong Xue, Fan Yang, and Zhi Yang. 2025. TileLang: A Composable Tiled Programming Model for AI Systems. <em>arXiv preprint arXiv:2504.17577</em>.</p>\n<p>[6] Benjamin F. Spector, Simran Arora, Aaryan Singhal, Daniel Y. Fu, and Christopher Ré. 2025. ThunderKittens: Simple, Fast, and Adorable AI Kernels. In <em>Proceedings of the 13th International Conference on Learning Representations (ICLR ’25)</em>.</p>\n<p>[7] Rohan Yadav, Michael Garland, and Michael Bauer. 2025. Task-Based Tensor Computations on Modern GPUs. <em>Proceedings of the ACM on Programming Languages</em> 9, PLDI, Article 163 (June 2025).</p>\n<p>[8] Tri Dao, Dan Fu, Stefano Ermon, Atri Rudra, and Christopher Ré. 2022. FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness. In <em>Advances in Neural Information Processing Systems 35 (NeurIPS ’22)</em>, 16344–16359.</p>\n<p>[9] Tri Dao. 2024. FlashAttention-2: Faster Attention with Better Parallelism and Work Partitioning. In <em>Proceedings of the 12th International Conference on Learning Representations (ICLR ’24)</em>.</p>\n<p>[10] Jay Shah, Ganesh Bikshandi, Ying Zhang, Vijay Thakkar, Pradeep Ramani, and Tri Dao. 2024. FlashAttention-3: Fast and Accurate Attention with Asynchrony and Low-precision. <em>arXiv preprint arXiv:2407.08608</em>.</p>\n<p>[11] Juechu Dong, Boyuan Feng, Driss Guessous, Yanbo Liang, and Horace He. 2024. Flex Attention: A Programming Model for Generating Optimized Attention Kernels. <em>arXiv preprint arXiv:2412.05496</em>.</p>\n<p>[12] Zihao Ye, Lequn Chen, Ruihang Lai, Wuwei Lin, Yineng Zhang, Stephanie Wang, Tianqi Chen, Baris Kasikci, Vinod Grover, Arvind Krishnamurthy, and Luis Ceze. 2025. FlashInfer: Efficient and Customizable Attention Engine for LLM Inference Serving. <em>arXiv preprint arXiv:2501.01005</em>.</p>\n<p>[13] Yifan Zhao, Egan Johnson, Prasanth Chatarasi, Vikram S. Adve, and Sasa Misailovic. 2026. Neptune: Advanced ML Operator Fusion for Locality and Parallelism on GPUs. <em>Proceedings of the ACM on Programming Languages</em> 10, PLDI, Article 220 (June 2026), 37 pages.</p>\n<p>[14] Yifan Zhao, Yuchen Yang, Matei Budiu, and Sasa Misailovic. 2026. Nautilus: An Auto-Scheduling Tensor Compiler for Efficient Tiled GPU Kernels. <em>arXiv preprint arXiv:2604.14825</em>.</p>\n<p>[15] Mengdi Wu, Xinhao Cheng, Shengyu Liu, Chunan Shi, Jianan Ji, Man Kit Ao, Praveen Velliengiri, Xupeng Miao, Oded Padon, and Zhihao Jia. 2025. Mirage: A Multi-Level Superoptimizer for Tensor Programs. In <em>Proceedings of the 19th USENIX Symposium on Operating Systems Design and Implementation (OSDI ’25)</em>, 21–38.</p>\n<p>[16] Xinhao Cheng, Zhihao Zhang, Yu Zhou, Jianan Ji, Jinchen Jiang, Zepeng Zhao, Ziruo Xiao, Zihao Ye, Yingyi Huang, Ruihang Lai, Hongyi Jin, Bohan Hou, Mengdi Wu, Yixin Dong, Anthony Yip, Songting Wang, Wenqin Yang, Xupeng Miao, Tianqi Chen, and Zhihao Jia. 2025. Mirage Persistent Kernel: A Compiler and Runtime for Mega-Kernelizing Tensor Programs. <em>arXiv preprint arXiv:2512.22219</em>.</p>\n<p>[17] Hongyi Jin, Bohan Hou, Guanjie Wang, Ruihang Lai, Jinqi Chen, Zihao Ye, Yaxing Cai, Yixin Dong, Xinhao Cheng, Zhihao Zhang, Yilong Zhao, Yingyi Huang, Lijie Yang, Jinchen Jiang, Gabriele Oliaro, Jianan Ji, Xupeng Miao, Vinod Grover, Todd C. Mowry, Zhihao Jia, and Tianqi Chen. 2026. Event Tensor: A Unified Abstraction for Compiling Dynamic Megakernel. In <em>Proceedings of Machine Learning and Systems (MLSys ’26)</em>.</p>\n<p>[18] Yikang Zhang, Junlong Chen, Wei Wang, Jia Liu, Nan Hu, and Haipeng Dai. 2026. Automated End-to-End Model Serving with Cooperative Compilation and Scheduling. In <em>Proceedings of the European Conference on Computer Systems (EuroSys ’26)</em>.</p>\n<p>[19] Shenggan Cheng, Shengjie Lin, Lansong Diao, Hao Wu, Siyu Wang, Chang Si, Ziming Liu, Xuanlei Zhao, Jiangsu Du, Wei Lin, and Yang You. 2025. Concerto: Automatic Communication Optimization and Scheduling for Large-Scale Deep Learning. In <em>Proceedings of the 30th ACM International Conference on Architectural Support for Programming Languages and Operating Systems, Volume 1 (ASPLOS ’25)</em>, 198–213.</p>\n<p>[20] Masahiro Tanaka, Du Li, Umesh Chand, Ali Zafar, Haiying Shen, and Olatunji Ruwase. 2025. DeepCompile: A Compiler-Driven Approach to Optimizing Distributed Deep Learning Training. <em>arXiv preprint arXiv:2504.09983</em>.</p>\n<p>[21] Size Zheng, Jin Fang, Xuegui Zheng, Qi Hou, Wenlei Bao, Ningxin Zheng, Ziheng Jiang, Dongyang Wang, Jianxi Ye, Haibin Lin, Li-Wen Chang, and Xin Liu. 2025. TileLink: Generating Efficient Compute-Communication Overlapping Kernels using Tile-Centric Primitives. <em>arXiv preprint arXiv:2503.20313</em>.</p>\n<p>[22] Wenlei Bao, Yuhao Zhang, Haibin Lin, Ningxin Zheng, Xuegui Zheng, Dongyang Wang, Ziheng Jiang, and Size Zheng. 2025. Triton-distributed: Programming Overlapping Kernels on Distributed AI Systems with the Triton Compiler. <em>arXiv preprint arXiv:2504.19442</em>.</p>\n<p>[23] Philippe Tillet, H. T. Kung, and David Cox. 2019. Triton: An Intermediate Language and Compiler for Tiled Neural Network Computations. In <em>Proceedings of the 3rd ACM SIGPLAN International Workshop on Machine Learning and Programming Languages (MAPL ’19)</em>, 10–19.</p>\n<p>[24] Hongyu Zhu, Ruofan Wu, Yijia Diao, Shanbin Ke, Haoyu Li, Chen Zhang, Jilong Xue, Lingxiao Ma, Yuqing Xia, Wei Cui, Fan Yang, Mao Yang, Lidong Zhou, Asaf Cidon, and Gennady Pekhimenko. 2022. ROLLER: Fast and Efficient Tensor Compilation for Deep Learning. In <em>Proceedings of the 16th USENIX Symposium on Operating Systems Design and Implementation (OSDI ’22)</em>, 233–248.</p>\n<p>[25] Lianmin Zheng, Chengfan Jia, Minmin Sun, Zhao Wu, Cody Hao Yu, Ameer Haj-Ali, Yida Wang, Jun Yang, Danyang Zhuo, Koushik Sen, Joseph E. Gonzalez, and Ion Stoica. 2020. Ansor: Generating High-Performance Tensor Programs for Deep Learning. In <em>Proceedings of the 14th USENIX Symposium on Operating Systems Design and Implementation (OSDI ’20)</em>, 863–879.</p>"
    }
  ],
  "latest_overview": [
    {
      "title": "",
      "body_html": "<h1>现代 AI 编译器</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2037556108290676409\">https://zhuanlan.zhihu.com/p/2037556108290676409</a></li>\n<li>作者: 不羁的风</li>\n</ul>\n<hr />\n<p>现代 AI 编译器</p>\n<h1>现代 AI 编译器</h1>\n<p>作者: 不羁的风, 赞: 1</p>\n<h2>一、 为什么我们需要 AI 编译器？与 MLIR 的一统江湖</h2>\n<p>在深度学习时代，上层有 PyTorch、JAX 等前端框架，下层有 NVIDIA/AMD GPU、各类 TPU/NPU 以及众多国产 AI 芯片。AI 编译器的核心使命是<strong>“解耦”</strong>：作为中间层，接收高级计算图，进行图级优化，并自动映射为特定硬件的高效机器码。</p>\n<p>在梳理具体项目前，必须提到当今编译器的绝对基石：<strong>MLIR (Multi-Level Intermediate Representation)</strong>。由 LLVM 基金会维护的 MLIR 引入了<strong>“方言（Dialect）”</strong>概念，允许开发者在不同抽象层级间自由转换。今天我们要谈及的 IREE、TPU-MLIR 以及寒武纪的 triton-linalg，无一例外都是建立在 MLIR 架构之上的。</p>\n<h2>二、 全栈与端到端图编译器 (End-to-End Compilers)</h2>\n<p>这类编译器接收完整的神经网络模型，负责一键“端到端”地将其编译为可以在目标硬件上运行的库或可执行文件。</p>\n<h3>2.1 IREE：MLIR 原生的下一代端到端编译器</h3>\n<ul>\n<li><strong>项目背景</strong>：最初由 Google 发起，2024 年由 Google 和 AMD 捐赠给 LF AI &amp; Data 基金会。目前 AMD (AIG-Sharks 团队) 在其中贡献巨大。</li>\n<li>\n<p>核心特性：</p>\n</li>\n<li>\n<p>纯粹的 MLIR 架构：从导入模型到生成机器码，IREE 全程使用 MLIR 方言。</p>\n</li>\n<li>AOT（提前编译）与 Runtime：IREE 不仅是一个编译器，还包含一个极其轻量的执行环境（Runtime）。它将调度逻辑和执行逻辑一起编译打包。</li>\n<li>\n<p>极致的伸缩性：向上可以扩展到数据中心（AMD MI300、NVIDIA GPU），向下可以压缩到移动端和边缘设备（Android、iOS、Bare metal 甚至 WebAssembly）。</p>\n</li>\n<li>\n<p>定位 ：被视为 TVM 的强力竞争对手，特别是在需要极低 Runtime 开销的边缘端，以及基于 MLIR 生态的新型异构计算平台中备受推崇。</p>\n</li>\n</ul>\n<h3>2.2 Apache TVM：经典跨平台编译器引擎</h3>\n<p>核心特性：基于独有的 Relay/Relax 和 TIR 抽象，以其强大的 AutoTuning（自动搜索调优）闻名。尽管底层非纯 MLIR，但其极佳的跨硬件能力和极其繁荣的算子调度生态，使其成为了许多新一代 DSL（如 TileLang）的基础设施。</p>\n<h3>2.3 TPU-MLIR：特定领域 DSA 芯片的编译器典范</h3>\n<p>核心特性：由算能（Sophgo）主导开源，专为 TPU 和专用 AI 处理器设计。完美展现了如何利用 MLIR 将模型量化（INT8/BF16）与片上内存的 LayerGroup（层融合与内存复用）结合，是学习“如何为自家 NPU 写编译器”的开源教科书。</p>\n<h2>三、 算子级 DSL 与硬件厂商的前端突围</h2>\n<p>大模型时代，仅仅“跑通”模型不够，还需要压榨每一滴算力（如手写各种 FlashAttention 变体）。传统的 CUDA/C++ 门槛极高，于是以 <strong>Triton</strong> 和 <strong>TileLang</strong> 为代表的算子开发 DSL 应运而生。而 2025-2026 年最大的趋势是：各大国产硬件厂商开始主动拥抱并魔改这些开源 DSL。</p>\n<h3>3.1 OpenAI Triton 与寒武纪的破局之作：triton-linalg</h3>\n<ul>\n<li><strong>项目背景</strong>：由 OpenAI 开源，因被 PyTorch 2.0（torch.compile）作为底层默认算子生成引擎而名声大噪。</li>\n<li>\n<p><strong>核心特性</strong>：</p>\n</li>\n<li>\n<p><strong>Block-Level 范式</strong>：Triton 最大的创新在于打破了 CUDA 以“单个线程（Thread）”为核心的编程模型，改为以“数据块（Block/Tile）”为核心。</p>\n</li>\n<li><strong>隐藏底层复杂性</strong>：开发者用类似 Python 的语法写代码，Triton 编译器会自动帮你处理最令人头疼的 GPU 共享内存（Shared Memory）分配、线程同步和数据预取（Prefetching）。</li>\n<li>\n<p><strong>极高生产力</strong>：仅需几十行 Python 代码就能实现性能媲美手写 CUDA C++ 的算子。</p>\n</li>\n<li>\n<p><strong>适用场景</strong>：快速开发和迭代复杂的高阶算子（各类 Attention 变体），PyTorch 生态内动态编译。</p>\n</li>\n</ul>\n<p>Triton 的局限：OpenAI 的 Triton 通过 Block 级抽象让 Python 写 GPU 算子变得简单。但 Triton 最初是高度绑定 NVIDIA GPU 的 SIMT（单指令多线程）架构的。对于类似寒武纪 MLU 等采用 DSA（领域特定架构，拥有强大的粗粒度矩阵指令）的芯片来说，直接对接 Triton 非常痛苦。</p>\n<p>寒武纪 triton-linalg：为了解决上述痛点，寒武纪开源了 <code>triton-linalg</code> 编译器前端。</p>\n<p><strong>核心技术</strong>：它将 Triton 的语法方言（如 <code>tt.dot</code>, <code>tt.reduce</code>），巧妙地转换成了 MLIR 社区标准的 <code>linalg</code> 方言（如 <code>linalg.matmul</code>, <code>linalg.reduce</code>）。</p>\n<p><strong>战略意义</strong>：这是一个极其聪明的“搭桥”动作。开发者可以用熟悉的 Triton 写算子，而底层不需要厂商去重写复杂的硬件映射，只需复用现有的 MLIR Linalg 编译链路。这大幅降低了国产芯片接入 PyTorch 2.x <code>torch.compile</code> 和 Triton 生态的门槛。</p>\n<h3><strong>3.2 TileLang：百花齐放的下一代 Tile 级编程语言</strong></h3>\n<p>如果说 Triton 是上一代的王，<strong>TileLang</strong>则是当前最火热的“跨平台高性能 DSL”。由北大杨智团队联合产业界推出，基于 TVM 基础设施构建，代码量极少（通常只需不到 80 行 Python 代码），但允许开发者显式控制内存排布和并发调度。在 DeepSeek-V3/V4 的研发中，TileLang 被大量用于各家芯片的算子快速原型设计。</p>\n<p>目前，各大国产硬件厂商纷纷基于 TileLang 推出了自己的官方分支：</p>\n<p><strong>华为昇腾分支 (tilelang-ascend)：</strong></p>\n<ul>\n<li>专门针对昇腾 NPU 架构优化。它引入了 Developer 模式，通过后端的 JIT（即时编译）和 CodeGen 模块，能将简洁的 TileLang API 自动“翻译”并映射为底层的 Ascend C 代码。</li>\n<li>极大地解决了昇腾算子开发难度，让普通开发者也能在昇腾上写出极致性能的算子。</li>\n</ul>\n<p><strong>摩尔线程分支 (tilelang_musa)：</strong></p>\n<ul>\n<li>于 2026 年 2 月刚刚宣布开源，针对摩尔线程的 MUSA 架构和全功能 GPU（如 S5000、S4000）进行了深度适配。</li>\n<li>修改了 TVM/TileLang 的底层 Pipeline（Passes 和 Codegen），使得开发者写的 Pythonic 算子能够自动推导 Layout、特化 Warp 并排布流水线。据称可将算子开发的底层代码量减少近 90%。</li>\n</ul>\n<h2>四、 核心项目横向对比矩阵</h2>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>对比维度</th>\n<th>IREE (MLIR原生)</th>\n<th>Apache TVM</th>\n<th>TPU-MLIR (算能体系)</th>\n<th>OpenAI Triton (+ 寒武纪分支)</th>\n<th>TileLang (+ 华为/摩尔线程)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>核心定位</td>\n<td>端到端部署编译器与轻量 Runtime</td>\n<td>全栈图编译器与自动搜索引擎</td>\n<td>专用 NPU/TPU 的端到端量化与部署编译器</td>\n<td>易用且极高产出的 Pythonic 算子 DSL</td>\n<td>细粒度、极致性能控制的算子 DSL</td>\n</tr>\n<tr>\n<td>抽象层级</td>\n<td>顶层图 →→ MLIR 各级通用方言</td>\n<td>Relay 图 →→ TIR →→ LLVM / Cuda</td>\n<td>顶层图 →→ Top Dialect →→ Tpu Dialect (纯 MLIR)</td>\n<td>块级别 (Block-level) 内存操作</td>\n<td>瓦片级别 (Tile-level) 数据流与调度控制</td>\n</tr>\n<tr>\n<td>对硬件厂商的意义</td>\n<td>提供一套标准的 AOT 部署方案与极小运行库</td>\n<td>早期接入 AI 生态的标准中间件与代码生成器</td>\n<td>展示了“如何将复杂的模型量化与片上内存（SRAM）复用完美结合”的教科书</td>\n<td>借助 triton-linalg，让 DSA 芯片也能低成本接入 Triton 大本营</td>\n<td>成为国产芯片“屏蔽底层指令、讨好底层算子开发者”的绝佳前端武器</td>\n</tr>\n<tr>\n<td>代表应用场景</td>\n<td>移动端部署、AMD 算力栈标准部署方案</td>\n<td>模型异构部署（多平台）、边缘端加速</td>\n<td>向算能系列及类 TPU 架构芯片一键转换、量化并部署 CV 或大模型</td>\n<td>大模型日常高阶算子开发、科研算法的快速验证</td>\n<td>DeepSeek 等极致压榨性能的算子落地、跨国产算力的 Day-0 适配</td>\n</tr>\n</tbody>\n</table></div>\n<h2>五、 总结与启示 (2026年视角)</h2>\n<p>纵观上述 AI 编译器的发展，我们可以得出三个重要的产业启示：</p>\n<ol>\n<li>\n<p>“得开发者得天下”：硬件再强，如果没有好用的软件栈也只是沙子。华为和摩尔线程纷纷投入 TileLang 的适配，寒武纪主动做 triton-linalg，本质上都是在降低开发门槛。它们希望用类似 Python 的高层语法，掩盖自家底层指令集（Ascend C / MUSA / MLU）的复杂性。</p>\n</li>\n<li>\n<p>大一统的底层逻辑：MLIR 与 TVM IR：无论是端到端的 IREE 还是算子层面的 Triton/TileLang，底层都在向通用的 IR（中间表示）收敛。编译器界不再“各自为战重造轮子”，而是共享编译 Pass 和优化逻辑。</p>\n</li>\n<li>\n<p>国产算力生态的“换道超车”：过去，国产芯片只能在 CUDA 后面苦苦追赶 API。而现在，随着大模型对定制化算子（如 Sparse-MLA）的需求爆发，TileLang 和 Triton 这种高层级 DSL 正在成为新的“通用语言”。通过在这层 DSL 上发力，国产芯片（昇腾、摩尔线程、寒武纪）真正实现了“Day-Zero（零日）”与国际顶尖模型（如 DeepSeek）的同步运行与验证。</p>\n</li>\n</ol>"
    }
  ],
  "graph": {
    "nodes": [
      {
        "id": "llvm",
        "x": 50,
        "y": 380,
        "category": "infrastructure"
      },
      {
        "id": "relay",
        "x": 490,
        "y": 380,
        "category": "infrastructure"
      },
      {
        "id": "mlir",
        "x": 560,
        "y": 330,
        "category": "infrastructure"
      },
      {
        "id": "iree",
        "x": 640,
        "y": 430,
        "category": "infrastructure"
      },
      {
        "id": "torch_dynamo",
        "x": 660,
        "y": 330,
        "category": "infrastructure"
      },
      {
        "id": "mojo",
        "x": 730,
        "y": 380,
        "category": "infrastructure"
      },
      {
        "id": "byteir",
        "x": 730,
        "y": 430,
        "category": "infrastructure"
      },
      {
        "id": "openxla",
        "x": 730,
        "y": 330,
        "category": "infrastructure"
      },
      {
        "id": "relax",
        "x": 870,
        "y": 380,
        "category": "infrastructure"
      },
      {
        "id": "wave",
        "x": 980,
        "y": 330,
        "category": "infrastructure"
      },
      {
        "id": "approx_mlir",
        "x": 980,
        "y": 430,
        "category": "infrastructure"
      },
      {
        "id": "xla",
        "x": 230,
        "y": 80,
        "category": "graph_compilers"
      },
      {
        "id": "glow",
        "x": 310,
        "y": 130,
        "category": "graph_compilers"
      },
      {
        "id": "ngraph",
        "x": 310,
        "y": 30,
        "category": "graph_compilers"
      },
      {
        "id": "jax",
        "x": 390,
        "y": 80,
        "category": "graph_compilers"
      },
      {
        "id": "flexflow",
        "x": 470,
        "y": 130,
        "category": "graph_compilers"
      },
      {
        "id": "alpa",
        "x": 660,
        "y": 80,
        "category": "graph_compilers"
      },
      {
        "id": "deep_compile",
        "x": 980,
        "y": 80,
        "category": "graph_compilers"
      },
      {
        "id": "halide",
        "x": 130,
        "y": 230,
        "category": "tensor_ir"
      },
      {
        "id": "tvm",
        "x": 310,
        "y": 230,
        "category": "tensor_ir"
      },
      {
        "id": "autotvm",
        "x": 390,
        "y": 180,
        "category": "tensor_ir"
      },
      {
        "id": "tc",
        "x": 310,
        "y": 280,
        "category": "tensor_ir"
      },
      {
        "id": "triton",
        "x": 470,
        "y": 230,
        "category": "tensor_ir"
      },
      {
        "id": "tiramisu",
        "x": 470,
        "y": 280,
        "category": "tensor_ir"
      },
      {
        "id": "ansor",
        "x": 560,
        "y": 180,
        "category": "tensor_ir"
      },
      {
        "id": "meta_schedule",
        "x": 660,
        "y": 230,
        "category": "tensor_ir"
      },
      {
        "id": "trinity",
        "x": 980,
        "y": 180,
        "category": "tensor_ir"
      },
      {
        "id": "redfuser",
        "x": 980,
        "y": 230,
        "category": "tensor_ir"
      },
      {
        "id": "nautilus",
        "x": 1060,
        "y": 180,
        "category": "tensor_ir"
      },
      {
        "id": "linear_layouts",
        "x": 1060,
        "y": 230,
        "category": "tensor_ir"
      },
      {
        "id": "event_tensor",
        "x": 1060,
        "y": 280,
        "category": "tensor_ir"
      },
      {
        "id": "triton_distributed",
        "x": 1140,
        "y": 230,
        "category": "tensor_ir"
      },
      {
        "id": "hexcute",
        "x": 1140,
        "y": 280,
        "category": "tensor_ir"
      },
      {
        "id": "tensorrt",
        "x": 170,
        "y": 530,
        "category": "hardware_specific"
      },
      {
        "id": "akg",
        "x": 640,
        "y": 530,
        "category": "hardware_specific"
      },
      {
        "id": "flash_attention",
        "x": 660,
        "y": 580,
        "category": "hardware_specific"
      },
      {
        "id": "bladedisc",
        "x": 730,
        "y": 530,
        "category": "hardware_specific"
      },
      {
        "id": "flashlight",
        "x": 980,
        "y": 530,
        "category": "hardware_specific"
      },
      {
        "id": "flash_attention_4",
        "x": 980,
        "y": 580,
        "category": "hardware_specific"
      },
      {
        "id": "hexagon_mlir",
        "x": 1060,
        "y": 530,
        "category": "hardware_specific"
      },
      {
        "id": "flex_linear_attn",
        "x": 1060,
        "y": 580,
        "category": "hardware_specific"
      },
      {
        "id": "quantix",
        "x": 1140,
        "y": 530,
        "category": "hardware_specific"
      },
      {
        "id": "magellan",
        "x": 980,
        "y": 680,
        "category": "llm_driven"
      },
      {
        "id": "cutegen",
        "x": 1060,
        "y": 680,
        "category": "llm_driven"
      },
      {
        "id": "autokernel",
        "x": 1140,
        "y": 680,
        "category": "llm_driven"
      },
      {
        "id": "acclaim",
        "x": 1140,
        "y": 730,
        "category": "llm_driven"
      }
    ],
    "edges": [
      {
        "from": "llvm",
        "to": "mlir",
        "label": "元框架升级"
      },
      {
        "from": "mlir",
        "to": "iree",
        "label": "端到端部署"
      },
      {
        "from": "mlir",
        "to": "byteir",
        "label": "业务定制"
      },
      {
        "from": "mlir",
        "to": "bladedisc",
        "label": "动态形状"
      },
      {
        "from": "mlir",
        "to": "mojo",
        "label": "语言融合"
      },
      {
        "from": "mlir",
        "to": "approx_mlir",
        "label": "精度感知"
      },
      {
        "from": "mlir",
        "to": "hexagon_mlir",
        "label": "NPU适配"
      },
      {
        "from": "mojo",
        "to": "wave",
        "label": "DSL扩展"
      },
      {
        "from": "xla",
        "to": "openxla",
        "label": "开放标准"
      },
      {
        "from": "openxla",
        "to": "magellan",
        "label": "LLM进化"
      },
      {
        "from": "tvm",
        "to": "relay",
        "label": "图IR升级"
      },
      {
        "from": "relay",
        "to": "relax",
        "label": "动态形状"
      },
      {
        "from": "torch_dynamo",
        "to": "deep_compile",
        "label": "分布式扩展"
      },
      {
        "from": "xla",
        "to": "jax",
        "label": "函数变换"
      },
      {
        "from": "xla",
        "to": "alpa",
        "label": "并行搜索"
      },
      {
        "from": "halide",
        "to": "tvm",
        "label": "调度继承"
      },
      {
        "from": "halide",
        "to": "tc",
        "label": "数学描述"
      },
      {
        "from": "tvm",
        "to": "autotvm",
        "label": "ML调优"
      },
      {
        "from": "tvm",
        "to": "redfuser",
        "label": "融合扩展"
      },
      {
        "from": "autotvm",
        "to": "ansor",
        "label": "无模板化"
      },
      {
        "from": "ansor",
        "to": "meta_schedule",
        "label": "概率统一"
      },
      {
        "from": "ansor",
        "to": "trinity",
        "label": "等价饱和"
      },
      {
        "from": "ansor",
        "to": "nautilus",
        "label": "端到端调度"
      },
      {
        "from": "triton",
        "to": "linear_layouts",
        "label": "布局形式化"
      },
      {
        "from": "triton",
        "to": "event_tensor",
        "label": "动态抽象"
      },
      {
        "from": "triton",
        "to": "triton_distributed",
        "label": "分布式扩展"
      },
      {
        "from": "triton",
        "to": "cutegen",
        "label": "LLM生成"
      },
      {
        "from": "triton",
        "to": "autokernel",
        "label": "Agent优化"
      },
      {
        "from": "triton",
        "to": "hexcute",
        "label": "布局合成"
      },
      {
        "from": "tiramisu",
        "to": "akg",
        "label": "NPU适配"
      },
      {
        "from": "flash_attention",
        "to": "flashlight",
        "label": "编译扩展"
      },
      {
        "from": "flash_attention",
        "to": "flash_attention_4",
        "label": "流水线协同"
      },
      {
        "from": "flash_attention",
        "to": "flex_linear_attn",
        "label": "线性统一"
      },
      {
        "from": "tensorrt",
        "to": "quantix",
        "label": "量化加速"
      },
      {
        "from": "cutegen",
        "to": "autokernel",
        "label": "迭代优化"
      }
    ],
    "milestones": [
      "halide",
      "tvm",
      "mlir"
    ]
  },
  "algos": [
    {
      "id": "llvm",
      "num": 1,
      "name": "LLVM",
      "fullName": "底层虚拟机编译框架 (Low Level Virtual Machine)",
      "year": "2004",
      "org": "UIUC",
      "parent": "—",
      "paperUrl": "https://ieeexplore.ieee.org/abstract/document/1281665/",
      "projectUrl": "",
      "category": "infrastructure",
      "motivation": "提供硬件无关IR，实现编译器组件高度解耦复用",
      "summary": "LLVM 提出了一套低层但保留类型、控制流和 SSA 数据流信息的通用 IR，以及围绕该 IR 组织的可复用编译器框架，解决了传统编译器前端、优化器、后端紧耦合且优化只能发生在单一阶段的问题。",
      "keyPoints": [
        "<strong>统一中间表示</strong>：LLVM IR 使用 SSA、无限虚拟寄存器、显式控制流图和简单类型系统，在接近机器码的同时保留跨阶段分析需要的信息",
        "<strong>三种等价形态</strong>：同一 IR 可在文本 <code>.ll</code>、二进制 bitcode <code>.bc</code>、内存对象三种形态间无损转换，方便持久化、调试和编译器内部变换",
        "<strong>前端/优化器/后端解耦</strong>：不同语言前端只需生成 LLVM IR，不同硬件后端只需消费 LLVM IR，将 <span class=\"kb-math kb-math-inline\">N</span> 种语言到 <span class=\"kb-math kb-math-inline\">M</span> 种硬件的工作量从 <span class=\"kb-math kb-math-inline\">N \\times M</span> 降为 <span class=\"kb-math kb-math-inline\">N + M</span>",
        "<strong>生命周期优化</strong>：同一 IR 可在编译期、链接期、安装期、运行期和空闲期持续参与优化，支撑 LTO、JIT、PGO 和离线重优化",
        "<strong>低层类型和地址模型</strong>：通过 typed pointer、<code>getelementptr</code>、<code>invoke</code>/<code>unwind</code> 等机制暴露地址计算和异常控制流，同时避免绑定到特定源语言运行时",
        "<strong>模块化 Pass 体系</strong>：分析和变换以可组合 Pass 形式复用，既服务 Clang 这类静态编译器，也服务 JIT、DSL、分析工具和后续机器学习编译栈"
      ],
      "detail": "<p><img alt=\"LLVM 三阶段编译架构\" src=\"https://aosabook.org/static/llvm/LLVMCompiler1.png\" />\n<em>图：LLVM 将多语言前端、共享优化器和多硬件后端通过 LLVM IR 连接起来，实现编译器组件复用。来源：Chris Lattner, The Architecture of Open Source Applications</em></p>\n<pre><code class=\"language-python\"># LLVM 生命周期优化伪代码\ndef llvm_pipeline(source_units, target):\n    modules = []\n    for unit in source_units:\n        ast = frontend_parse_and_check(unit)\n        ir = lower_to_llvm_ir(ast)              # typed SSA + CFG\n        ir = run_pass_pipeline(ir, phase=&quot;compile&quot;)\n        modules.append(ir)\n\n    whole_program_ir = llvm_link(modules)\n    whole_program_ir = run_pass_pipeline(whole_program_ir, phase=&quot;link&quot;)\n\n    native_obj = codegen(whole_program_ir, target)\n    executable = embed_bitcode(native_obj, whole_program_ir)\n\n    while executable.runs_in_field():\n        profile = collect_hot_paths(executable)\n        if profile.has_stable_hotspots():\n            hot_ir = recover_embedded_bitcode(executable)\n            tuned_ir = run_profile_guided_passes(hot_ir, profile)\n            executable = replace_hot_code(executable, codegen(tuned_ir, target))\n    return executable\n</code></pre>\n<p><strong>动机与背景：传统编译器的复用边界太窄</strong></p>\n<p>LLVM 论文的核心问题不是“再做一个后端”，而是重新定义编译器内部的公共契约。传统静态编译器通常把源语言前端、优化器和目标机器后端绑在一个大系统里，前端生成的内部结构不适合长期保存，后端又依赖大量机器细节。结果是，跨文件优化、跨语言优化、运行时重优化都很难共用同一套分析。JVM/CLI 虽然保存了 bytecode，但它们带有高级运行时和对象模型假设，不适合 C/C++ 这类需要透明本地运行时和手动内存控制的语言。LLVM 的判断是：公共 IR 必须足够低层，才能表达任意语言和目标；又必须比裸机器码多保留一些语义，才能让优化器看见类型、CFG、SSA def-use 等结构。</p>\n<p><strong>核心机制：LLVM IR 是“低层虚拟 ISA”，不是普通 AST</strong></p>\n<p>LLVM IR 的基本单位是 module、function、basic block 和 instruction。函数体被拆成基本块，基本块以 <code>br</code>、<code>ret</code>、<code>switch</code>、<code>invoke</code> 等 terminator 结束；普通值使用 SSA 名称，写成 <code>%x = add i32 %a, %b</code> 这类三地址形式。SSA 的关键约束可以理解为：</p>\n<div class=\"kb-math kb-math-display\">\\forall v,\\ \\text{def}(v)\\ \\text{dominates}\\ \\text{every use}(v)</div>\n<p>当多个控制流路径汇合时，IR 使用 <span class=\"kb-math kb-math-inline\">\\phi</span> 节点选择来自不同前驱块的值：</p>\n<div class=\"kb-math kb-math-display\">x = \\phi(x_{\\text{then}}, x_{\\text{else}})</div>\n<p>这让数据流依赖变得显式，公共子表达式消除、死代码删除、循环不变量外提等 Pass 可以直接基于 def-use 链工作，而不需要反复从机器寄存器或栈槽里恢复变量关系。</p>\n<p><strong>地址计算与类型系统：低层但不丢掉分析线索</strong></p>\n<p>LLVM IR 的类型系统不是为了做 Java 式安全验证，而是为了帮助优化器理解数据布局和操作意图。典型例子是 <code>getelementptr</code>，它表达“从某个聚合对象的基址出发，按类型布局走到某个字段或数组元素”，不是简单整数加法。可把它抽象为：</p>\n<div class=\"kb-math kb-math-display\">\\text{addr} = \\text{base} + \\sum_i \\text{index}_i \\cdot \\text{sizeof}(\\text{element}_i)</div>\n<p>因为索引路径仍带有类型和聚合结构信息，别名分析、边界推断和标量替换能比处理裸地址常量更精确。异常处理也类似：<code>invoke</code> 显式区分正常返回边和异常边，使 C++/setjmp 等控制流不会在优化器视角里退化成不可见的运行时黑盒。</p>\n<p><strong>生命周期优化：把 IR 留到链接后和运行后</strong></p>\n<p>LLVM 的系统架构把 bitcode 当作可持久化程序表示，而不是前端到后端之间的临时文件。编译期可先在单个 translation unit 上优化；链接期把多个 module 合并后做 interprocedural optimization，例如跨文件内联、全局常量传播和 whole-program 死代码删除；安装期或首次运行时可按本机 CPU 重新选择指令；运行期和空闲期可用用户真实 profile 重新优化热点。这个模型把 profile-guided optimization 从“开发者构造代表性输入”改成“收集终端用户运行行为”，也让 JIT 和静态编译共享 IR、分析和后端设施。</p>\n<p><strong>与传统方法的区别</strong></p>\n<p>和 GCC 早期内部表示相比，LLVM IR 是第一类语言：文本、bitcode、内存对象三种形态语义一致，工具链可以用 <code>llvm-as</code>、<code>llvm-dis</code>、<code>opt</code>、<code>llc</code> 等组件拼装出不同编译流程。和 JVM/CLI 相比，LLVM 不规定垃圾回收、对象模型、异常语义或类型安全策略，因此 C、C++、Rust、Swift、Julia、OpenCL、Halide 等语言都能把自己的运行时策略降到同一低层 IR。它的影响也正来自这种边界选择：IR 足够低，能落到真实机器；IR 又足够结构化，能让优化器长期复用。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：LLVM 真正的发明点是把“中间表示”提升为稳定基础设施。前端、优化器、后端、链接器、JIT 和分析工具都围绕同一 IR 协作，编译器因此从单体程序变成可组合平台。</div>",
      "quiz": {
        "q": "LLVM IR 为什么能显著降低多语言、多硬件编译器的实现复杂度？",
        "options": [
          "因为 LLVM IR 保留完整源语言 AST，后端可以直接生成源语言对象模型",
          "因为所有语言前端和硬件后端都以同一低层 SSA IR 为边界，优化器可以在中间复用",
          "因为 LLVM 只支持 C/C++，因此减少了语言兼容问题",
          "因为 LLVM 把所有优化都推迟到运行时 JIT，静态编译不再需要优化器"
        ],
        "answer": 1,
        "explain": "LLVM 的核心边界是统一、低层、SSA 形式的 IR。前端生成 IR，优化器变换 IR，后端消费 IR，使语言和硬件两侧可以独立扩展。"
      }
    },
    {
      "id": "halide",
      "num": 2,
      "name": "Halide",
      "fullName": "计算调度分离图像编译语言 (Halide)",
      "year": "2013",
      "org": "MIT/Google",
      "parent": "—",
      "paperUrl": "https://dl.acm.org/doi/abs/10.1145/2499370.2462176",
      "projectUrl": "",
      "category": "tensor_ir",
      "motivation": "首创计算与调度分离范式，解决并行性与局部性权衡",
      "summary": "Halide 提出将“计算什么”的算法定义与“如何计算/存储/并行化”的调度定义彻底分离，用一个面向图像与数组流水线的 DSL 解决手写高性能 stencil pipeline 难以兼顾可读性、可移植性和性能的问题。",
      "keyPoints": [
        "<strong>计算与调度分离</strong>：算法只描述纯函数式数据流，调度单独指定 tiling、fusion、compute_at、store_at、vectorize、parallel 等执行策略",
        "<strong>函数式图像模型</strong>：图像和中间结果被建模为从整数坐标到标量值的函数，天然表达 stencil、pointwise、reduction、data-dependent gather 等阶段",
        "<strong>调度空间建模</strong>：每条 producer-consumer 边都可独立选择内联、缓存、重计算或分块存储，显式覆盖局部性、并行性和冗余计算之间的权衡",
        "<strong>自动 lowering 编译器</strong>：根据 schedule 递归注入中间阶段的计算和存储，再通过区间推断、滑动窗口、storage folding、flattening、vectorization 生成低层代码",
        "<strong>跨平台代码生成</strong>：同一算法可通过不同 schedule 生成 x86/ARM SIMD、多核 CPU、CUDA GPU 等目标代码，后端依赖 LLVM 和 GPU 代码生成",
        "<strong>随机搜索 autotuning</strong>：论文将 schedule 参数空间交给随机搜索，在复杂图像 pipeline 上自动找到接近或超过专家手写实现的高性能调度"
      ],
      "detail": "<p><img alt=\"Halide 应用与调度效果示意\" src=\"https://people.csail.mit.edu/jrk/halide12/teaser.png\" />\n<em>图：Halide 用短算法代码和独立 schedule 覆盖 Camera Raw、Local Laplacian、Bilateral Grid、Segmentation 等真实图像流水线，并通过换 schedule 移植到不同硬件。来源：Halide 作者项目页</em></p>\n<pre><code class=\"language-cpp\">// Halide 3x3 box filter：算法和调度分离\nFunc blur_3x3(Func input) {\n  Func blur_x, blur_y;\n  Var x, y, xi, yi;\n\n  // Algorithm: 只定义像素值依赖，不指定循环、缓存、并行方式\n  blur_x(x, y) = (input(x - 1, y) + input(x, y) + input(x + 1, y)) / 3;\n  blur_y(x, y) = (blur_x(x, y - 1) + blur_x(x, y) + blur_x(x, y + 1)) / 3;\n\n  // Schedule: 定义执行组织和存储位置\n  blur_y.tile(x, y, xi, yi, 256, 32)\n        .vectorize(xi, 8)\n        .parallel(y);\n  blur_x.compute_at(blur_y, x)\n        .vectorize(x, 8);\n  return blur_y;\n}\n</code></pre>\n<pre><code class=\"language-python\"># Halide lowering 伪代码\ndef lower_halide(algorithm, schedule, target):\n    loop_nest = build_loop_nest_for_output(algorithm.final_stage, schedule)\n\n    for stage in reverse_topological_order(algorithm.stages):\n        compute_level = schedule[stage].compute_at\n        store_level = schedule[stage].store_at\n        inject_allocation(loop_nest, stage, at=store_level)\n        inject_producer_code(loop_nest, stage, at=compute_level)\n\n    regions = infer_bounds_with_interval_arithmetic(loop_nest)\n    loop_nest = add_region_preambles(loop_nest, regions)\n    loop_nest = sliding_window_and_storage_folding(loop_nest)\n    loop_nest = flatten_multidim_buffers(loop_nest)\n    loop_nest = apply_vectorize_unroll_parallel(loop_nest, schedule)\n    return llvm_or_gpu_codegen(loop_nest, target)\n</code></pre>\n<p><strong>动机与背景：图像流水线的瓶颈不是单个算子，而是全局组织方式</strong></p>\n<p>图像处理 pipeline 同时有 stencil 计算和 stream 程序的特征：每个阶段单看都很简单，算术强度低，但阶段数量多、依赖图深、局部邻域重叠严重。若把每个阶段都物化成完整中间图像，会产生大量内存流量；若把所有阶段强行融合，又可能破坏并行性并引入过多冗余计算。传统循环优化器通常只能识别固定 stencil 或简单 loop fusion，难以对一个包含数十上百阶段的异构 pipeline 做全局调度。Halide 的核心洞察是：算法定义不应该夹杂缓存、循环顺序和线程划分；这些选择应该成为可搜索、可替换、可组合的 schedule。</p>\n<p><strong>算法表示：把图像看成无限整数域上的纯函数</strong></p>\n<p>Halide 中的 <code>Func f(x, y)</code> 表示坐标到值的映射，算法部分通常写成方程。例如一个可分离模糊可以写成：</p>\n<div class=\"kb-math kb-math-display\">\\text{blur}_x(x,y)=I(x-1,y)+I(x,y)+I(x+1,y)</div>\n<div class=\"kb-math kb-math-display\">\\text{out}(x,y)=\\text{blur}_x(x,y-1)+\\text{blur}_x(x,y)+\\text{blur}_x(x,y+1)</div>\n<p>这些方程只表达依赖，不表达“先算哪一行”“中间结果是否落内存”“是否向量化”。边界处理也可通过外部 wrapper 或函数定义表达，而不是散落在每层循环里。Reduction 则通过 <code>RDom</code> 显式给出归约域，把 histogram、scan、convolution 等非纯 stencil 操作纳入同一图模型。</p>\n<p><strong>调度机制：在局部性、并行性、重计算之间选点</strong></p>\n<p>Schedule 的语义可以理解为为每个 producer <span class=\"kb-math kb-math-inline\">f</span> 指定两个位置：<code>store_at</code> 决定分配/缓存的生命周期，<code>compute_at</code> 决定实际计算嵌入到哪个 consumer loop 层级。若 <span class=\"kb-math kb-math-inline\">f</span> 在外层计算并完整存储，冗余计算少但内存流量大；若 <span class=\"kb-math kb-math-inline\">f</span> 在内层 tile 内按需计算，局部性好但会重复算 halo；若 <span class=\"kb-math kb-math-inline\">f</span> inline 到 consumer，存储成本最低但可能指数式放大计算。对 consumer 需要区域 <span class=\"kb-math kb-math-inline\">R_g</span>，producer 的需求区域可抽象为反向传播：</p>\n<div class=\"kb-math kb-math-display\">R_f = \\bigcup_{g \\in \\text{consumers}(f)} \\text{preimage}_{g \\rightarrow f}(R_g)</div>\n<p>Halide 编译器用区间算术近似这些区域，在每个循环层前插入计算 bounds 的 preamble，保证只分配和计算后续阶段真正会消费的那一块。</p>\n<p><strong>编译流程：从函数图到命令式循环</strong></p>\n<p>Lowering 先为最终输出建立循环嵌套，然后按 schedule 把中间阶段的 allocation 和 computation 递归注入到指定循环层。此时每个 buffer 的范围还是符号表达式，随后 bounds inference 决定每个 tile、scanline 或 vector lane 需要的最小区域。接着，sliding window optimization 会复用相邻扫描线之间重叠的 producer 值；storage folding 会把只需保留少量行的中间 buffer 折叠成环形存储；flattening 将多维坐标转换为一维地址；vectorize/unroll/parallel 再把常量宽度循环改写为 SIMD 或多线程代码。最终后端通过 LLVM 或 GPU 代码生成落到真实硬件。</p>\n<p><strong>与传统方法的区别</strong></p>\n<p>和手写 C/CUDA 相比，Halide 保留了短小、可组合的算法代码，调度可以随硬件重写而不触碰算法正确性。和 polyhedral 编译器相比，Halide 放弃了完全自动从任意循环里恢复依赖的目标，转而让程序员显式给出 pipeline 的纯函数数据流和 schedule primitives，因此分析更简单、覆盖的图像 pipeline 模式更广。和固定库函数相比，Halide 能跨阶段融合和重排，不被库边界阻断局部性优化。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：Halide 的“算法/调度分离”后来成为张量编译器的核心范式。TVM、Triton、XLA/MLIR 生态里的 schedule、tile、fusion、layout、autotune 思路，都能看到 Halide 对计算定义和执行组织拆分的影响。</div>",
      "quiz": {
        "q": "Halide 中 compute_at 的核心作用是什么？",
        "options": [
          "改变算法方程本身，使输出像素值发生变化",
          "指定某个 producer 阶段嵌入到 consumer 的哪个循环层级计算",
          "固定所有中间结果都必须完整写入全局内存",
          "只用于选择 CPU 或 GPU 后端，与循环结构无关"
        ],
        "answer": 1,
        "explain": "compute_at 控制 producer 计算发生的位置，直接影响融合粒度、缓存局部性、并行性和冗余计算，是 Halide schedule 的核心旋钮之一。"
      }
    },
    {
      "id": "tensorrt",
      "num": 3,
      "name": "TensorRT",
      "fullName": "NVIDIA深度学习推理优化引擎 (TensorRT)",
      "year": "2015",
      "org": "NVIDIA",
      "parent": "—",
      "paperUrl": "https://developer.nvidia.com/tensorrt",
      "projectUrl": "",
      "category": "hardware_specific",
      "motivation": "量化校准与算子融合深度集成，实现GPU极致推理性能",
      "summary": "TensorRT 将训练框架导出的模型编译成面向特定 NVIDIA GPU 的优化 engine，通过图融合、低精度量化、kernel tactic 搜索和运行时内存规划，解决通用深度学习框架推理延迟高、吞吐低、硬件特性利用不足的问题。",
      "keyPoints": [
        "<strong>Builder/Runtime 两阶段架构</strong>：Builder 将 ONNX 或 API 构造的 network definition 编译为序列化 engine，Runtime 反序列化 engine 并在 GPU 上执行 inference",
        "<strong>图级优化</strong>：执行常量折叠、无用层消除、layout/reformat 插入与消除、convolution-bias-activation fusion、pointwise fusion 等跨层优化",
        "<strong>低精度推理</strong>：支持 FP32/TF32/FP16/BF16/FP8/INT8 等精度路径；INT8/PTQ 通过代表性数据估计 scale，QAT/显式 Q/DQ 则把量化语义固化进图",
        "<strong>Tactic 搜索</strong>：对每层或融合子图枚举 cuDNN、cuBLASLt、自研 kernel、Tensor Core kernel、plugin kernel 等候选实现，计时后选择最快 tactic",
        "<strong>动态形状支持</strong>：通过 optimization profile 指定 min/opt/max shape，针对目标输入范围生成可复用 engine",
        "<strong>硬件特定部署</strong>：engine 包含 kernel 选择、张量格式、内存规划和目标 GPU 相关优化，换 GPU、换 batch/shape 范围时通常需要重新构建或重新 profile",
        "<strong>可扩展插件机制</strong>：不支持的算子可通过 TensorRT plugin 接入，并参与序列化、格式选择和运行时调度"
      ],
      "detail": "<p><img alt=\"TensorRT 工作流程\" src=\"https://developer.download.nvidia.com/images/tensorrt/how-tensor-rt-works.jpg\" />\n<em>图：TensorRT 从训练好的 DNN 出发，经 ONNX 转换、TensorRT Optimizer 构建 engine，再由 TensorRT Runtime 在 NVIDIA GPU 上部署。来源：NVIDIA Developer TensorRT 页面</em></p>\n<pre><code class=\"language-python\"># TensorRT engine 构建伪代码\ndef build_tensorrt_engine(onnx_model, calibration_data, target_gpu):\n    network = parse_onnx_to_network_definition(onnx_model)\n    network = fold_constants_and_eliminate_dead_layers(network)\n    network = infer_shapes_and_insert_reformats(network)\n\n    if use_int8_ptq(network):\n        stats = collect_activation_ranges(network, calibration_data)\n        for tensor in network.activations:\n            tensor.scale = choose_symmetric_scale(stats[tensor])\n        network = insert_or_preserve_qdq_semantics(network)\n\n    fused_graph = []\n    for subgraph in find_fusible_patterns(network):\n        fused_graph.append(fuse_layers(subgraph))\n\n    engine_plan = []\n    for layer_or_fusion in fused_graph:\n        candidates = enumerate_tactics(layer_or_fusion, target_gpu)\n        timings = {t: benchmark(t, layer_or_fusion.opt_shape) for t in candidates}\n        best = argmin(timings)\n        engine_plan.append((layer_or_fusion, best))\n\n    memory_plan = plan_activation_buffers(engine_plan)\n    return serialize_engine(engine_plan, memory_plan, target_gpu)\n</code></pre>\n<p><strong>动机与背景：训练框架不是极致推理编译器</strong></p>\n<p>PyTorch、TensorFlow 等训练框架的执行模型要保留动态图调试、自动微分、训练态算子、宽泛硬件兼容等能力，推理时会带来额外调度和内存开销。生产推理的目标不同：模型结构固定，权重固定，输入 shape 范围通常可枚举，硬件也明确。TensorRT 正是利用这些约束，把模型提前编译成 engine。Builder 阶段可以花更多时间做 profile 和 tactic 选择，Runtime 阶段只做低开销执行，因此适合在线服务、自动驾驶、边缘设备和高吞吐离线推理。</p>\n<p><strong>图融合：减少 kernel launch 和内存往返</strong></p>\n<p>TensorRT 的第一类优化是把多层图模式变成一个 GPU kernel 或一个更紧凑的执行片段。典型模式是：</p>\n<div class=\"kb-math kb-math-display\">y = \\text{ReLU}(\\text{Conv}(x, W) + b)</div>\n<p>若拆成 convolution、bias add、activation 三个 kernel，中间 tensor 需要写回和再读出显存，还会支付多次 launch overhead。融合后，卷积输出可在寄存器或 shared memory 中直接加 bias 并应用激活函数，只写最终结果。Pointwise fusion 同理，可把连续的 elementwise、scale、activation、cast、Q/DQ 等操作合成单次访存路径。对 batch 小、层多、算术强度不高的网络，融合带来的收益常常比单个 kernel 微优化更直接。</p>\n<p><strong>量化与校准：把数值范围变成编译信息</strong></p>\n<p>INT8 量化的核心是为浮点张量选择 scale <span class=\"kb-math kb-math-inline\">s</span>，把实数映射到有限整数范围。对称量化可写成：</p>\n<div class=\"kb-math kb-math-display\">x_q = \\text{clip}(\\text{round}(x / s), -128, 127),\\qquad \\hat{x}=s\\cdot x_q</div>\n<p>最简单的 scale 选择是 <span class=\"kb-math kb-math-inline\">s=\\max(|x|)/127</span>，实际 PTQ 会用代表性校准数据统计激活分布，在精度损失和饱和比例之间折中。早期 TensorRT 的 INT8 workflow 强调 calibrator；现代 TensorRT 更推荐显式 Q/DQ 或 TensorRT Model Optimizer 生成的 PTQ/QAT 图。无论入口形式如何，关键都是让 builder 知道哪些张量以低精度表示、哪些边界需要反量化、哪些 Q/DQ 可与上下游算子融合，从而选择 INT8 Tensor Core kernel 或合适的混合精度 tactic。</p>\n<p><strong>Tactic 搜索：把硬件选择交给构建期 profile</strong></p>\n<p>同一个卷积或矩阵乘可能有许多合法实现：direct convolution、implicit GEMM、Winograd、FFT、cuDNN tactic、cuBLASLt matmul、Tensor Core tile、稀疏 kernel、自定义 plugin 等。TensorRT Builder 会在给定 GPU、shape、precision、workspace 限制下计时候选 tactic，选择最优实现。可把每层选择近似写成：</p>\n<div class=\"kb-math kb-math-display\">t_l^*=\\arg\\min_{t\\in\\mathcal{T}_l}\\ \\text{latency}(t;\\ \\text{shape},\\ \\text{precision},\\ \\text{GPU})+\\lambda\\cdot\\text{workspace}(t)</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">\\mathcal{T}_l</span> 是该层或融合子图的候选实现集合。由于计时会受 GPU clock、缓存、驱动状态影响，生产环境常使用 timing cache、固定 clock、增加平均计时次数和 engine inspector 来提高 tactic 复现性，并避免每次构建都重新完整 benchmark。</p>\n<p><strong>动态 shape、profile 与运行时执行</strong></p>\n<p>TensorRT engine 不是完全动态解释器。对于可变 batch、分辨率或序列长度，需要在构建期提供 optimization profile：每个动态维度给出 min/opt/max。Builder 主要围绕 opt shape 做 tactic 选择，同时保证 min/max 范围可执行。Runtime 创建 execution context 后，应用设置实际输入 shape、绑定 buffer、调用 <code>enqueueV3()</code> 把执行提交到 CUDA stream。若 shape 或 profile 切换，TensorRT 需要重新推导中间 shape 和 tactic 资源，首次 enqueue 可能更慢；稳定服务通常会按常见 shape 拆分 profile 或 engine，以降低尾延迟。</p>\n<p><strong>与通用框架和 TVM 类编译器的区别</strong></p>\n<p>TensorRT 的边界更靠近硬件和部署：它不追求训练、自动微分或任意后端可移植，而是充分利用 NVIDIA GPU kernel 库、Tensor Core、CUDA Graph、DLA、plugin、timing cache 和 engine 序列化。和 TVM/MLIR 这类通用编译栈相比，TensorRT 的搜索空间和 runtime 受 NVIDIA 平台约束更强，但因此能把 kernel tactic、量化、内存规划和部署 API 做得更深。它的工程价值在于把“固定模型 + 固定硬件 + 固定 shape 范围”转化为一次性编译优势。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：TensorRT engine 是硬件和配置相关的产物。更换 GPU 架构、精度策略、dynamic shape profile 或 plugin 版本时，应重新构建并用真实输入分布验证 latency、吞吐和精度。</div>",
      "quiz": {
        "q": "TensorRT Builder 在 tactic selection 阶段主要做什么？",
        "options": [
          "根据训练集重新训练模型权重",
          "枚举并计时同一层或融合子图的多个 GPU kernel 实现，选择目标硬件上最快的方案",
          "把所有算子强制转换为 CPU 实现以提高兼容性",
          "删除所有 Q/DQ 节点，保证模型始终以 FP32 运行"
        ],
        "answer": 1,
        "explain": "TensorRT 的 builder 会针对目标 GPU、shape、precision 和 workspace 约束选择 tactic。这个选择被写入 engine，runtime 执行时不再做昂贵搜索。"
      }
    },
    {
      "id": "xla",
      "num": 4,
      "name": "XLA",
      "fullName": "加速线性代数编译器 (Accelerated Linear Algebra)",
      "year": "2017",
      "org": "Google",
      "parent": "—",
      "paperUrl": "https://openxla.org/xla",
      "projectUrl": "",
      "category": "graph_compilers",
      "motivation": "通过HLO IR实现跨算子全局内存优化，解决内存墙问题",
      "summary": "XLA 提出以 HLO/StableHLO 为中心的机器学习编译流水线，把框架图统一降到静态形状的线性代数 IR，再通过跨算子融合、布局选择、调度和缓冲区分配减少中间张量写回与峰值显存，解决深度学习推理和训练中的内存墙与硬件可移植问题。",
      "keyPoints": [
        "<strong>HLO IR 作为全图优化边界</strong>：将 TensorFlow、JAX、PyTorch/XLA 等前端程序转为 StableHLO/HLO，保留张量 shape、layout、sharding 和数据依赖信息",
        "<strong>目标无关优化</strong>：在 HLO 层执行 CSE、代数化简、常量折叠、死代码删除、通用 fusion、buffer analysis 等全图 pass",
        "<strong>目标相关后端优化</strong>：GPU/CPU/TPU 后端继续执行布局分配、SPMD partition、库调用匹配、Triton/LLVM codegen、stream/thunk 调度等硬件相关 pass",
        "<strong>融合解决内存墙</strong>：将逐元素算子、reduction、dot/softmax 周边算子合并成单个 fusion computation，避免中间张量落到 HBM，并减少 kernel launch",
        "<strong>静态内存规划</strong>：基于 HLO schedule、alias analysis 和 liveness，把不重叠生命周期的 HLOBuffer 映射到同一 buffer slice，降低峰值内存",
        "<strong>调度与重物化</strong>：调度器在合法拓扑序中搜索低峰值内存顺序；必要时用 rematerialization 复制计算来缩短张量生命周期",
        "<strong>运行时封装</strong>：后端把优化后的 HLO 降为 thunk sequence / executable，由 PJRT 或后端 runtime 负责设备内存、kernel/library 调用和命令缓冲执行"
      ],
      "detail": "<p><img alt=\"XLA 从 HLO 到 Thunks 的编译流程\" src=\"https://openxla.org/xla/images/hlo_to_thunks.svg\" />\n<em>图：OpenXLA 官方文档中的 HLO 到后端 thunks / executable 流程，展示优化 HLO、调度、Buffer Assignment、Thunk emission 和最终可执行对象之间的关系。</em></p>\n<pre><code class=\"language-python\"># XLA 编译流水线伪代码：从 StableHLO/HLO 到后端 executable\ndef compile_with_xla(stablehlo_module, target):\n    hlo = legalize_stablehlo_to_hlo(stablehlo_module)\n\n    # 目标无关：保留数学语义，先缩小图并暴露融合机会\n    hlo = run_passes(hlo, [\n        &quot;canonicalize&quot;, &quot;algebraic_simplifier&quot;, &quot;constant_folding&quot;,\n        &quot;hlo_cse&quot;, &quot;dead_code_elimination&quot;, &quot;target_independent_fusion&quot;,\n    ])\n\n    # 目标相关：后端知道寄存器、HBM、库调用、layout 和通信约束\n    hlo = target.backend.optimize_hlo(hlo, [\n        &quot;spmd_partition&quot;, &quot;layout_assignment&quot;, &quot;triton_or_library_rewrite&quot;,\n        &quot;priority_fusion&quot;, &quot;multi_output_fusion&quot;, &quot;copy_insertion&quot;,\n    ])\n\n    schedule = choose_schedule(hlo, objective=&quot;minimize_peak_memory&quot;)\n    if estimated_peak_memory(schedule) &gt; target.memory_budget:\n        hlo, schedule = rematerialize(hlo, schedule, target.memory_budget)\n\n    buffers = assign_buffers(hlo, schedule)\n    thunks = emit_thunk_sequence(hlo, schedule, buffers, target)\n    return package_executable(code=lower_to_machine_code(thunks), buffers=buffers, thunks=thunks)\n\n\ndef assign_buffers(hlo, schedule):\n    values = hlo_dataflow_analysis(hlo)        # instruction -&gt; logical HloValue\n    buffers = hlo_alias_analysis(values)       # HloValue -&gt; HloBuffer\n    live = liveness(schedule, buffers)\n    heap = interval_heap_allocate(\n        intervals=[(live[b].start, live[b].end, size(b)) for b in buffers],\n        can_share=lambda b1, b2: not overlap(live[b1], live[b2]),\n    )\n    return heap  # HloBuffer -&gt; offset/size inside a few contiguous allocations\n</code></pre>\n<h5>1. 动机：为什么深度学习需要 HLO 级编译</h5>\n<p>传统动态图或 eager 执行模式把神经网络拆成一串框架算子，运行时逐个调用 cuDNN、cuBLAS、Eigen 或自定义 kernel。这个模式的问题不在于单个 GEMM 不够快，而在于全图信息在运行时被切碎：<code>matmul -&gt; bias -&gt; gelu -&gt; dropout -&gt; residual</code> 中间会产生多个大张量，每个中间值可能被写入 HBM 后又立即读回。对现代 GPU/TPU 来说，很多模型层已经不是纯算力瓶颈，而是内存带宽、kernel launch 和跨设备通信瓶颈。XLA 的关键设计是把前端框架图先收敛到 HLO：每条指令都有静态 shape、dtype、layout/sharding 标注和明确的数据依赖，这让编译器能在“算子边界之外”做内存与调度决策。</p>\n<h5>2. HLO IR：足够高层以理解张量，足够低层以生成代码</h5>\n<p>HLO 的节点不是 C++ 循环，而是 <code>dot</code>、<code>convolution</code>、<code>broadcast</code>、<code>reduce</code>、<code>fusion</code>、<code>copy</code> 等张量操作。这个层级的好处是两方面的：一方面，代数化简可以直接识别 <code>broadcast(constant)</code>、<code>reshape(bitcast)</code>、重复子表达式、无用 tuple 等高层模式；另一方面，后端仍可把 HLO 降成 LLVM IR、Triton IR、库调用或专用硬件指令。可以把 HLO 模块抽象成带 shape/layout 的有向无环计算图：</p>\n<div class=\"kb-math kb-math-display\">G_{\\text{HLO}}=(V,E,\\text{shape},\\text{layout},\\text{sharding})</div>\n<p>其中边 <span class=\"kb-math kb-math-inline\">E</span> 表示张量依赖，<span class=\"kb-math kb-math-inline\">\\text{shape}(v)</span> 决定每个逻辑 buffer 的字节数，<span class=\"kb-math kb-math-inline\">\\text{layout}(v)</span> 决定物理内存排列，<span class=\"kb-math kb-math-inline\">\\text{sharding}(v)</span> 决定多设备切分方式。XLA 的多数优化都可以理解为在保持 <span class=\"kb-math kb-math-inline\">G_{\\text{HLO}}</span> 数学语义不变的前提下，改变图结构、物理布局、执行顺序和 buffer 复用方案。</p>\n<h5>3. Fusion：把带宽开销从全局内存搬回寄存器/共享内存</h5>\n<p>XLA 最重要的优化通常是 fusion。若两个 HLO 指令 <span class=\"kb-math kb-math-inline\">u \\to v</span> 的中间张量 <span class=\"kb-math kb-math-inline\">T_u</span> 只用于后续局部计算，未融合时成本近似包含一次写 HBM 和一次读 HBM：</p>\n<div class=\"kb-math kb-math-display\">T_{\\text{unfused}} \\approx \\frac{\\text{bytes}(T_u)_{\\text{write}}+\\text{bytes}(T_u)_{\\text{read}}+\\cdots}{BW_{\\text{HBM}}} + N_{\\text{kernels}}\\cdot T_{\\text{launch}}</div>\n<p>融合后，中间值在寄存器或共享内存中传递，成本变为：</p>\n<div class=\"kb-math kb-math-display\">T_{\\text{fused}} \\approx \\frac{\\text{bytes}(\\text{inputs})+\\text{bytes}(\\text{outputs})}{BW_{\\text{HBM}}} + T_{\\text{launch}}</div>\n<p>这就是“解决内存墙”的核心：不是让乘加更快，而是让中间张量不离开片上存储。OpenXLA GPU 后端中，一个 fusion computation 会编译成一个 GPU kernel；dot/softmax/layernorm 等复杂模式还可能被重写成 Triton fusion，并通过 autotuning 选择 tile、warp、stage 等参数。代价是 fusion 不能无限扩大：过大的 fusion 会增加寄存器压力、降低 occupancy，或者复制有多个用户的计算。因此现代 XLA 使用 cost model、priority fusion、多输出 fusion 等策略，在减少 HBM 流量和控制局部资源之间折中。</p>\n<h5>4. Layout Assignment：逻辑 shape 和物理布局分离</h5>\n<p>同一个张量逻辑上可以是 <span class=\"kb-math kb-math-inline\">f32[32,64]</span>，物理上却可以用 <code>{1,0}</code> 或 <code>{0,1}</code> 排列。XLA 把 layout 作为 shape 的一部分，并让后端根据目标硬件选择布局：例如卷积可能偏好 NHWC，某些 int8 dot 的 RHS 可能偏好特定 minor dimension。布局传播的直觉是先从库调用或硬件 emitter 的约束出发，把偏好的 layout 沿 HLO 图向上下游传播；当 producer 和 consumer 的 layout 冲突时，插入 <code>copy</code> 或显式 <code>transpose/bitcast</code>。因此 layout assignment 不是单个算子的局部选择，而是一个全图最小化物理转置开销的问题：</p>\n<div class=\"kb-math kb-math-display\">\\min_{\\ell_v \\in \\mathcal{L}(v)} \\sum_{(u,v)\\in E} C_{\\text{copy}}(\\ell_u,\\ell_v) + \\sum_{v\\in V} C_{\\text{kernel}}(v,\\ell_v)</div>\n<p>实际系统不会穷举求解这个组合优化，而使用约束传播、贪心和后端规则。这个设计也解释了为什么 XLA 可以把用户显式写出的某些 transpose 当作 layout 改变处理：如果物理布局已经满足需求，transpose 可以退化成 bitcast 或被完全消除。</p>\n<h5>5. Scheduling 与 Buffer Assignment：峰值内存是编译器目标函数</h5>\n<p>在 HLO 图已经优化后，仍然存在多个合法拓扑执行顺序。不同顺序会改变中间张量生命周期，从而影响峰值内存。给定调度 <span class=\"kb-math kb-math-inline\">\\pi</span>，峰值内存可写成：</p>\n<div class=\"kb-math kb-math-display\">M(\\pi)=\\max_t \\sum_{b\\in B} \\text{size}(b)\\cdot \\mathbf{1}\\left[\\text{start}_\\pi(b)\\le t &lt; \\text{end}_\\pi(b)\\right]</div>\n<p>XLA 调度器先模拟内存使用，选择较低 <span class=\"kb-math kb-math-inline\">M(\\pi)</span> 的顺序；随后 Buffer Assignment 把 HloValue 合并为 HloBuffer，再把生命周期不重叠的 HloBuffer 放进同一物理 buffer slice。对于 in-place 或别名操作，alias analysis 会允许输入和输出复用同一片内存；对于可能覆盖仍被使用数据的情况，CopyInsertion 会显式插入 copy 保证语义。若估算峰值超过设备预算，HloRematerialization 会选择重新计算某些中间值来缩短生命周期，本质是在计算量和显存之间做交换。</p>\n<h5>6. 与传统框架和 TVM/Glow 的差异</h5>\n<p>XLA 与普通框架执行器的差别在于“先全图编译，再运行 executable”。运行时不再临时决定每个 op 如何分配内存，而是使用编译期生成的 BufferAssignment 和 ThunkSequence。与 TVM 相比，XLA 更强调框架到后端的一体化 HLO pass pipeline 和生产级 runtime；TVM 更强调 tensor expression / schedule search 的可编程自动调优。与 Glow 相比，XLA 的 HLO 是跨 Google/JAX/TensorFlow 生态长期演进的核心 IR，静态 shape 和 functional graph 假设更强；Glow 则突出两级 IR 下降和面向推理的静态内存/代码生成。三者共同点是：深度学习编译器的关键不只是“调用更快的 kernel”，而是跨算子理解数据流、内存和硬件约束。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：XLA 的核心价值是把“每个算子单独优化”提升为“整个 HLO 模块共同优化”。Fusion 减少 HBM 往返，layout 降低物理转置，schedule 和 buffer assignment 降低峰值内存，最终由 backend executable 固化这些决策。</div>",
      "quiz": {
        "q": "XLA 中 fusion 对内存墙问题最直接的缓解机制是什么？",
        "options": [
          "把所有算子都替换为 cuDNN 调用",
          "让中间张量在寄存器或共享内存中传递，避免写回再读出 HBM",
          "把动态图改写成 Python 静态图",
          "把所有输入张量复制到 CPU 内存中执行"
        ],
        "answer": 1,
        "explain": "Fusion 将多个 HLO 指令合并为单个 fusion computation / kernel，中间值不再物化到 HBM，从而减少内存带宽和 kernel launch 开销。"
      }
    },
    {
      "id": "tvm",
      "num": 5,
      "name": "TVM",
      "fullName": "端到端深度学习自动优化编译框架 (Tensor Virtual Machine)",
      "year": "2018",
      "org": "UW",
      "parent": "halide",
      "paperUrl": "https://www.usenix.org/conference/osdi18/presentation/chen",
      "projectUrl": "",
      "category": "tensor_ir",
      "motivation": "将编译优化转化为搜索问题，ML自动调优替代手工算子",
      "summary": "TVM 提出端到端深度学习编译栈，把图级优化、张量表达式、schedule 原语和机器学习代价模型组合起来，将算子实现优化转化为可搜索问题，从而在 CPU、GPU、移动 GPU 和 FPGA/ASIC 类加速器上自动生成接近或超过手工库的代码。",
      "keyPoints": [
        "<strong>端到端编译栈</strong>：从 TensorFlow、MXNet、PyTorch、Keras、ONNX/CoreML 等前端导入计算图，经过图重写、算子级代码生成、自动调优和 runtime 打包部署",
        "<strong>图级优化</strong>：执行 operator fusion、constant folding、静态内存规划、数据布局变换，减少中间张量和跨 layout copy",
        "<strong>Tensor Expression</strong>：用声明式索引公式描述算子计算语义，把“算什么”和“如何调度执行”解耦，继承并扩展 Halide 的 compute/schedule 思想",
        "<strong>Schedule 原语扩展</strong>：在 Halide loop transformation、thread binding、compute locality 基础上新增 GPU shared memory scope、tensorization、latency hiding 等深度学习硬件相关原语",
        "<strong>自动搜索优化</strong>：将调度配置 <span class=\"kb-math kb-math-inline\">s</span> 的选择建模为 <span class=\"kb-math kb-math-inline\">\\arg\\min_{s\\in\\mathcal{S}} f(g(e,s))</span>，用 ML 代价模型和模拟退火探索庞大 schedule 空间",
        "<strong>学习型代价模型</strong>：从 lowered loop AST 提取结构化特征或送入 TreeRNN/XGBoost，预测配置性能，减少真实硬件测量次数",
        "<strong>RPC 设备池</strong>：通过远程编译、上传、运行和 profiling，在嵌入式设备和多种硬件上自动收集测量数据",
        "<strong>性能可移植性</strong>：OSDI 论文在 server GPU、embedded GPU、embedded CPU 和 FPGA-style accelerator 上展示了跨平台部署能力"
      ],
      "detail": "<p><img alt=\"TVM 系统总览\" src=\"https://ar5iv.labs.arxiv.org/html/1802.04799/assets/x2.png\" />\n<em>图：TVM 端到端编译栈。模型从多种前端进入计算图，图级优化后进入 operator-level optimization，再生成目标硬件代码并打包到 runtime module。来源：论文 Figure 2</em></p>\n<pre><code class=\"language-python\"># TVM 端到端优化伪代码：图优化 + 张量程序自动调优\ndef tvm_compile(model, target, hardware_pool):\n    graph = import_from_frontend(model)                 # TensorFlow / PyTorch / ONNX / CoreML ...\n    graph = infer_shapes_and_types(graph)\n\n    graph = rewrite_graph(graph, passes=[\n        &quot;operator_fusion&quot;,\n        &quot;constant_folding&quot;,\n        &quot;layout_transform&quot;,\n        &quot;static_memory_plan&quot;,\n    ])\n\n    tuned_kernels = {}\n    for fused_op in graph.fused_operators():\n        te = lower_to_tensor_expression(fused_op)       # declarative compute\n        schedule_space = instantiate_schedule_template(te, target)\n        tuned_kernels[fused_op] = autotune(te, schedule_space, target, hardware_pool)\n\n    graph_json, lib, params = build_runtime_module(graph, tuned_kernels, target)\n    return RuntimeModule(graph_json, lib, params)\n\n\ndef autotune(te, schedule_space, target, hardware_pool):\n    dataset = []\n    cost_model = MLBasedCostModel()\n    states = initialize_random_walks(schedule_space)\n\n    for round_id in range(MAX_ROUNDS):\n        candidates = []\n        for state in states:\n            candidate = parallel_simulated_annealing(\n                state,\n                neighbor=lambda s: mutate_tile_bind_cache_tensorize(s),\n                score=lambda s: cost_model.predict(lower_to_loop_ast(te, s)),\n            )\n            candidates.append(candidate)\n\n        batch = select_top_and_diverse(candidates, cost_model)\n        measurements = hardware_pool.rpc_measure(batch, target)\n        dataset.extend(measurements)\n        cost_model.fit(dataset)\n\n    return min(dataset, key=lambda item: item.latency).schedule\n</code></pre>\n<h5>1. 动机：为什么单靠厂商算子库不够</h5>\n<p>深度学习部署面临的硬件范围很宽：server GPU、移动 CPU/GPU、FPGA、ASIC、TPU-like accelerator。传统框架通常把图级执行交给框架，把算子级优化交给 cuDNN/MKL/厂商库；这在常规卷积上有效，但对新模型、新算子组合、低精度变体、融合算子和新硬件很难扩展。一个融合后的 <code>conv2d + bias + relu + layout_transform</code> 可能没有现成库函数；如果不融合，性能受内存访问拖累；如果融合，又需要为每个硬件手写 kernel。TVM 的核心判断是：算子实现不应该是固定库条目，而应该由可组合 schedule 原语生成，并通过自动搜索为硬件选择最优实例。</p>\n<h5>2. 计算图优化：先制造更好的算子边界</h5>\n<p>TVM 前端先把模型导入为计算图，图中节点是张量算子，边是数据依赖。图级 pass 的目标是减少后续 operator-level optimization 的负担并暴露更高收益的融合单元。论文把算子分为 injective、reduction、complex-out-fusable、opaque 四类，并给出通用融合规则：多个 injective 可融合；reduction 可以和输入侧 injective 融合；conv2d 这类复杂算子可以融合输出侧逐元素操作；opaque 算子作为边界。融合直接减少中间张量物化：</p>\n<div class=\"kb-math kb-math-display\">\\text{bytes}_{\\text{saved}} \\approx \\sum_{t\\in \\text{intermediates}} 2\\cdot \\text{size}(t)</div>\n<p>其中一次是 producer 写中间结果，一次是 consumer 读中间结果。图层还负责数据布局变换：如果后端更偏好 tiled layout 或 channel-blocked layout，TVM 会在图中插入必要 layout transform，并尽量让相邻算子使用同一内部布局，避免重复转换。</p>\n<h5>3. Tensor Expression 与 Schedule：继承 Halide，但面向深度学习硬件扩展</h5>\n<p>TVM 的 Tensor Expression 描述“每个输出元素如何计算”，不规定循环顺序、tile 大小、thread 绑定或缓存层级。例如矩阵乘法可写成：</p>\n<div class=\"kb-math kb-math-display\">C_{i,j}=\\sum_{k=0}^{K-1} A_{i,k}\\cdot B_{k,j}</div>\n<p>Schedule 则决定如何把这个公式映射到硬件。一个 schedule 可以先 tile <span class=\"kb-math kb-math-inline\">i,j,k</span>，再 reorder 循环，把外层绑定到 GPU block/thread，把局部 tile 缓存在 shared memory，把内层 reduce tensorize 到硬件矩阵指令，最后插入 double buffering 或 latency hiding。TVM 对 Halide 的关键扩展在于：深度学习硬件的“基本指令”不总是标量或 SIMD，而可能是张量级 intrinsic；加速器还常要求编译器显式管理 SRAM、DMA 和流水线依赖。因此 TVM 把 tensorization、memory scope、latency hiding 作为 schedule primitive，使同一个 TE 公式可以生成 CPU loop、CUDA/OpenCL kernel 或 FPGA accelerator microcode。</p>\n<h5>4. 自动调优：把 schedule 选择转为搜索问题</h5>\n<p>给定表达式 <span class=\"kb-math kb-math-inline\">e</span>、schedule 空间 <span class=\"kb-math kb-math-inline\">\\mathcal{S}_e</span>、代码生成器 <span class=\"kb-math kb-math-inline\">g(e,s)</span> 和真实硬件代价 <span class=\"kb-math kb-math-inline\">f(\\cdot)</span>，TVM 的优化目标是：</p>\n<div class=\"kb-math kb-math-display\">s^*=\\arg\\min_{s\\in\\mathcal{S}_e} f(g(e,s))</div>\n<p>难点是 <span class=\"kb-math kb-math-inline\">\\mathcal{S}_e</span> 可能巨大：tile 因子、循环顺序、unroll、vectorize、parallel、cache read/write、thread binding、tensorization 组合后轻易达到百万到十亿级配置。黑盒穷举不可行，手写解析代价模型又很难覆盖不同硬件。TVM 因此采用“测量少量真实样本 + 训练代价模型 + 用模型指导探索”的闭环。模型输入不是高层算子名，而是 lowered loop AST 的结构特征，例如每层循环访问的内存大小、reuse、stride、并行度、向量化信息；输出是延迟或相对排序。模拟退火在 schedule 空间中随机游走，倾向接受预测更快的邻居，同时保留一定探索能力。</p>\n<h5>5. 代价模型与 RPC 设备池：让优化真正落到硬件</h5>\n<p>TVM 的自动调优不是只跑静态模型，而是在目标硬件上编译、上传、执行和计时。RPC 设备池让主机可以交叉编译嵌入式设备模块，把候选 kernel 上传到 Raspberry Pi、Mali GPU、FPGA board 或 GPU 机器，收集真实延迟后更新训练集。代价模型的一个简化目标可以写成 pairwise ranking：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{rank}}=\\sum_{(i,j): y_i&lt;y_j}\\max(0,\\hat{y}_i-\\hat{y}_j+\\gamma)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">y_i</span> 是真实测量延迟，<span class=\"kb-math kb-math-inline\">\\hat{y}_i</span> 是模型预测。排序损失的直觉是：自动调优只需要找到更快的 schedule，不一定要精确预测毫秒值。这个思想后来在 AutoTVM/Ansor/MetaSchedule 中继续演化为更系统的搜索策略和任务级调优数据库。</p>\n<h5>6. 与 XLA、Glow 和手工库的差异</h5>\n<p>XLA 的强项是 HLO 全图优化和生产级后端流水线；Glow 的强项是 graph lowering、两级 IR 和推理内存规划；TVM 的独特位置在于把“算子如何实现”显式暴露给 schedule 搜索。相比厂商库，TVM 不依赖预先枚举的 fused kernel，能为新算子组合生成代码；相比只做图优化的编译器，TVM 可以深入循环、线程、缓存和硬件 intrinsic 层。代价是 TVM 的性能高度依赖 schedule template、搜索预算和测量质量；如果没有 auto-tuning，TVM 可能不如高度手工调优库。论文的贡献正是把这些工程步骤系统化为端到端自动优化框架。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：TVM 把深度学习编译拆成“图级选择融合边界”和“算子级搜索实现方式”两个耦合问题。图优化决定要生成哪些 fused op，自动调优决定每个 fused op 在目标硬件上如何跑得最快。</div>",
      "quiz": {
        "q": "TVM 相比依赖 cuDNN/MKL 等手工算子库的框架，最核心的优势是什么？",
        "options": [
          "完全不需要进行图级优化",
          "用 Tensor Expression 和 schedule 搜索为新算子/融合算子自动生成目标硬件代码",
          "只支持 NVIDIA GPU，因此优化空间更小",
          "把所有模型都转换成解释执行的 Python 循环"
        ],
        "answer": 1,
        "explain": "TVM 将算子计算和调度分离，并用 ML 代价模型搜索 schedule，因此可以为厂商库没有覆盖的新算子组合和新硬件后端生成优化实现。"
      }
    },
    {
      "id": "autotvm",
      "num": 6,
      "name": "AutoTVM",
      "fullName": "基于模板的张量程序自动调优 (AutoTVM)",
      "year": "2018",
      "org": "UW",
      "parent": "tvm",
      "paperUrl": "https://proceedings.neurips.cc/paper/2018/hash/8b5700012be65c9da25f49408d959ca0-Abstract.html",
      "projectUrl": "",
      "category": "tensor_ir",
      "motivation": "用ML代价模型替代硬件测量，加速模板参数空间搜索",
      "summary": "AutoTVM 提出了一种基于机器学习的张量程序自动优化框架，使用统计代价模型（梯度提升树或 TreeGRU）替代黑盒搜索或手工代价模型来指导调度参数空间探索，并通过可迁移的不变特征表示实现跨工作负载/跨硬件的迁移学习，在 GPU、ARM CPU、ARM GPU 等多种后端上无需外部算子库即可生成超越 cuDNN/TFLite 等专用库的高性能代码。",
      "keyPoints": [
        "<strong>问题建模</strong>：将张量算子优化形式化为 <span class=\"kb-math kb-math-inline\">\\min_{s \\in \\mathcal{S}_e} f(g(e, s))</span>，其中 <span class=\"kb-math kb-math-inline\">e</span> 为计算表达式，<span class=\"kb-math kb-math-inline\">s</span> 为调度配置，<span class=\"kb-math kb-math-inline\">g</span> 为代码生成器，<span class=\"kb-math kb-math-inline\">f</span> 为硬件执行代价；搜索空间可达数十亿量级",
        "<strong>统计代价模型</strong>：提出两种代价模型——(1) 基于 XGBoost 的梯度提升树（GBT），使用手工设计的循环特征；(2) 基于 TreeGRU 的神经网络模型，直接在低层循环 AST 上学习表示",
        "<strong>排序目标函数</strong>：采用 pairwise rank loss 而非回归损失训练代价模型，绕过绝对代价值建模的困难，只需预测配置间的相对优劣",
        "<strong>探索策略</strong>：使用模拟退火（Simulated Annealing）在调度空间中采样候选配置，结合 ε-greedy 策略和子模函数多样性目标选择批量评估点",
        "<strong>迁移学习</strong>：设计跨工作负载/跨算子类型的可迁移不变表示——GBT 使用 Context Relation Features，TreeGRU 使用 Context Encoded Embedding；全局模型 + 局部模型组合实现 2×–10× 的搜索加速",
        "<strong>端到端评估</strong>：在 NVIDIA TITAN X、ARM Cortex-A53、ARM Mali-T860 三种硬件上，对 ResNet、MobileNet、LSTM、DQN、DCGAN 等工作负载实现 1.2×–3.8× 的端到端加速"
      ],
      "detail": "<h5>4.1 核心框架图</h5>\n<p><img alt=\"AutoTVM 框架总览\" src=\"https://ar5iv.labs.arxiv.org/html/1805.08166/assets/img/overview.png\" />\n<em>图 1：AutoTVM 整体框架。左侧为调度空间定义，中间为统计代价模型 + 探索模块的迭代优化循环，右侧为在真实硬件上的评估反馈。</em></p>\n<p><img alt=\"代价模型架构\" src=\"https://ar5iv.labs.arxiv.org/html/1805.08166/assets/img/model.png\" />\n<em>图 2：两种代价模型架构。(a) GBT 模型使用手工提取的循环特征向量；(b) TreeGRU 模型直接在低层循环 AST 上递归编码。</em></p>\n<p><img alt=\"迁移学习表示\" src=\"https://ar5iv.labs.arxiv.org/html/1805.08166/assets/img/transfer.png\" />\n<em>图 3：不同特征表示的迁移能力对比。配置空间特征仅在域内有效，AST 特征可跨同类算子迁移，Context Relation Features 可跨算子类型迁移。</em></p>\n<h5>4.2 算法伪代码</h5>\n<pre><code class=\"language-python\"># AutoTVM 迭代优化主循环\ndef autotvm_optimize(expression e, schedule_space S_e, hardware H):\n    D = []  # 历史数据集 {(x_i, c_i)}\n    f_hat = initialize_cost_model()  # 统计代价模型\n\n    for iteration in range(T):\n        # Step 1: 探索 — 模拟退火采样候选配置\n        candidates = []\n        for i in range(n_parallel):\n            s_init = random_sample(S_e)\n            s_best = simulated_annealing(\n                s_init, S_e, \n                objective=f_hat,  # 用代价模型评估\n                temperature_schedule=exponential_decay\n            )\n            candidates.append(s_best)\n\n        # Step 2: 多样性感知批量选择\n        batch = greedy_submodular_select(\n            candidates, f_hat, \n            diversity_weight=lambda_,\n            batch_size=B\n        )\n\n        # Step 3: 在真实硬件上评估\n        for s in batch:\n            x = lower_to_ast(g(e, s))  # 生成低层循环 AST\n            c = measure_on_hardware(x, H)  # 真实执行代价\n            D.append((x, c))\n\n        # Step 4: 更新代价模型\n        f_hat.fit(D, objective=&quot;rank_loss&quot;)\n\n    return best_config(D)\n</code></pre>\n<pre><code class=\"language-python\"># 迁移学习：全局模型 + 局部模型\ndef transfer_optimize(expression e, S_e, H, D_source):\n    # 用源域数据训练全局模型（使用不变表示）\n    f_global = train_model(D_source, representation=&quot;invariant&quot;)\n    f_local = initialize_cost_model()\n\n    for iteration in range(T):\n        # 组合预测\n        f_hat = lambda x: f_global(x) + f_local(x)\n\n        # 同上迭代优化流程...\n        batch = explore_and_select(S_e, f_hat)\n        D_local = evaluate_on_hardware(batch, H)\n        f_local.fit(D_local, objective=&quot;rank_loss&quot;)\n\n    return best_config(D_local)\n</code></pre>\n<h5>4.3 方法细节</h5>\n<p><strong>动机与背景：为什么需要学习优化张量程序？</strong></p>\n<p>深度学习系统的性能高度依赖底层张量算子（如卷积、矩阵乘法）的实现效率。传统方法依赖两条路径：一是使用硬件厂商提供的手工优化库（如 cuDNN、MKL），但这些库覆盖的算子有限，无法支持新兴的融合算子和非标准数据布局；二是使用基于多面体模型（Polyhedral）的自动优化，但其手工代价模型难以精确捕捉现代硬件的复杂行为（缓存层次、流水线、线程调度等）。AutoTVM 的核心洞察是：可以将张量程序优化视为一个统计学习问题——通过在真实硬件上收集少量样本来训练代价模型，用学到的模型指导搜索，从而在庞大的调度参数空间中高效找到高性能配置。</p>\n<p><strong>统计代价模型的设计</strong></p>\n<p>AutoTVM 提出了两种互补的代价模型。第一种是基于 XGBoost 的梯度提升树（GBT）模型：对于每个调度配置 <span class=\"kb-math kb-math-inline\">s</span>，首先通过代码生成器 <span class=\"kb-math kb-math-inline\">g(e,s)</span> 产生低层循环程序，然后从循环嵌套结构中提取特征向量——包括循环的内存访问模式、循环长度、并行度、向量化宽度、展开因子等。这些特征被组织为一个上下文矩阵 <span class=\"kb-math kb-math-inline\">Z \\in \\mathbb{R}^{n \\times d}</span>，其中 <span class=\"kb-math kb-math-inline\">n</span> 为循环层数，<span class=\"kb-math kb-math-inline\">d</span> 为每层的特征维度。GBT 模型直接在展平的特征向量上进行训练。第二种是基于 TreeGRU 的神经网络模型：它将低层循环 AST 视为一棵树，使用 Tree-structured GRU 自底向上递归编码每个节点，最终在根节点获得整个程序的表示向量。TreeGRU 的优势在于无需手工设计特征，可以自动学习程序结构中的关键模式。</p>\n<p>两种模型的训练目标都采用 pairwise rank loss 而非传统的回归损失。具体而言，给定一对样本 <span class=\"kb-math kb-math-inline\">(x_i, x_j)</span> 及其真实代价 <span class=\"kb-math kb-math-inline\">c_i &lt; c_j</span>，排序损失要求模型预测 <span class=\"kb-math kb-math-inline\">\\hat{f}(x_i) &lt; \\hat{f}(x_j)</span>。这一设计的动机在于：绝对执行时间受硬件状态波动影响较大，而相对排序更加稳定；优化过程只需要找到最优配置，不需要精确预测绝对代价值。</p>\n<p><strong>探索与利用的平衡</strong></p>\n<p>在调度空间的探索中，AutoTVM 使用模拟退火（SA）作为核心搜索算法。SA 从随机初始配置出发，在每一步随机扰动当前配置（如改变某个 tile 大小或展开因子），根据代价模型的预测值决定是否接受新配置。温度参数随迭代逐步降低，使搜索从全局探索逐渐收敛到局部精化。为了进一步提高搜索效率，AutoTVM 引入了两个机制：(1) ε-greedy 策略——以概率 ε 随机选择候选而非选择模型预测最优的，防止过早陷入局部最优；(2) 子模函数多样性目标——在选择批量评估点时，不仅考虑模型预测的质量，还通过子模函数 <span class=\"kb-math kb-math-inline\">L(S) = \\sum_{s \\in S} \\hat{f}(s) + \\lambda \\cdot \\text{diversity}(S)</span> 鼓励选择彼此差异较大的配置，以最大化每批评估的信息增益。</p>\n<p><strong>迁移学习：跨工作负载的知识复用</strong></p>\n<p>AutoTVM 的一个关键创新是迁移学习机制。在实际部署中，编译器需要优化大量不同的算子（不同输入形状、不同算子类型），如果每个算子都从零开始搜索，代价极高。AutoTVM 的核心观察是：调度配置 <span class=\"kb-math kb-math-inline\">s</span>（如 tile 大小）在不同工作负载间不具有可比性（因为最优 tile 大小取决于输入尺寸），但低层循环 AST 表示 <span class=\"kb-math kb-math-inline\">x = g(e,s)</span> 具有跨工作负载的不变性——无论输入形状如何变化，好的循环结构模式（如良好的内存局部性、充分的并行度）是通用的。</p>\n<p>对于 GBT 模型，AutoTVM 设计了 <strong>Context Relation Features</strong>：将上下文矩阵 <span class=\"kb-math kb-math-inline\">Z</span> 视为一组点的集合，通过 log2 间隔的阈值 <span class=\"kb-math kb-math-inline\">\\beta_t</span> 提取跨特征的关系：</p>\n<div class=\"kb-math kb-math-display\">R_t^{(ij)} = \\max_{k: Z_{kj} &lt; \\beta_t} Z_{ki}</div>\n<p>这种表示捕捉了\"当某个特征低于某阈值时，另一个特征的最大值\"这样的关系模式，对输入形状变化具有鲁棒性。对于 TreeGRU 模型，AutoTVM 设计了 <strong>Context Encoded TreeGRU</strong>：将循环节点中的标识符嵌入替换为上下文向量（包含循环长度、访问步长等信息），使模型能够泛化到训练时未见过的循环配置。</p>\n<p>迁移学习的最终预测采用全局模型与局部模型的加法组合：</p>\n<div class=\"kb-math kb-math-display\">\\hat{f}(x) = \\hat{f}^{(\\text{global})}(x) + \\hat{f}^{(\\text{local})}(x)</div>\n<p>全局模型在源域数据 <span class=\"kb-math kb-math-inline\">\\mathcal{D}&#x27;</span> 上使用不变表示训练，提供有效的初始预测；局部模型在目标域的少量样本上在线更新，逐步修正全局模型的偏差。实验表明，这种迁移机制可以将搜索速度提升 2×–10×。</p>\n<p><strong>端到端系统集成</strong></p>\n<p>AutoTVM 被集成到 TVM 编译器栈中，实现了从高层计算图到低层硬件代码的全自动优化。与依赖外部库的传统方案不同，AutoTVM 直接生成优化代码，这使得算子融合等图级优化成为可能——传统方案中，如果某个融合算子在库中没有对应实现，就无法进行融合。在 NVIDIA TITAN X 上，AutoTVM 生成的单算子性能与 cuDNN v7 持平甚至更优；在 ARM Cortex-A53 上超越 TFLite；在 ARM Mali GPU 上超越 ARM Compute Library。端到端评估中，AutoTVM 在 ResNet、MobileNet、LSTM、DQN、DCGAN 等工作负载上实现了 1.2×–3.8× 的加速。</p>\n<h5>4.4 核心公式</h5>\n<p><strong>优化目标</strong>：</p>\n<div class=\"kb-math kb-math-display\">s^* = \\arg\\min_{s \\in \\mathcal{S}_e} f(g(e, s))</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{S}_e</span> 为表达式 <span class=\"kb-math kb-math-inline\">e</span> 的调度空间，<span class=\"kb-math kb-math-inline\">g</span> 为代码生成器，<span class=\"kb-math kb-math-inline\">f</span> 为真实硬件执行代价。</p>\n<p><strong>排序损失函数</strong>（用于训练代价模型）：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{rank}} = \\sum_{(i,j): c_i &lt; c_j} \\max\\left(0, \\hat{f}(x_i) - \\hat{f}(x_j) + \\gamma\\right)</div>\n<div class=\"key-point\">💡 <strong>关键</strong>：排序损失只要求模型正确预测配置间的相对优劣，不需要精确预测绝对执行时间，对硬件噪声更鲁棒。</div>\n<p><strong>多样性感知批量选择</strong>：</p>\n<div class=\"kb-math kb-math-display\">L(S) = \\sum_{s \\in S} \\hat{f}(s) + \\lambda \\sum_{s \\in S} \\min_{s&#x27; \\in S, s&#x27; \\neq s} d(s, s&#x27;)</div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：<span class=\"kb-math kb-math-inline\">\\lambda</span> 控制质量与多样性的权衡。实验表明多样性选择在大多数工作负载上无显著负面影响，但在部分工作负载（如 C6）上有正向收益。</div>\n<p><strong>迁移学习组合预测</strong>：</p>\n<div class=\"kb-math kb-math-display\">\\hat{f}(x) = \\hat{f}^{(\\text{global})}(x) + \\hat{f}^{(\\text{local})}(x)</div>\n<p><strong>Context Relation Features</strong>（GBT 迁移表示）：</p>\n<div class=\"kb-math kb-math-display\">R_t^{(ij)} = \\max_{k: Z_{kj} &lt; \\beta_t} Z_{ki}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\beta_t</span> 为 log2 间隔的阈值序列，<span class=\"kb-math kb-math-inline\">Z \\in \\mathbb{R}^{n \\times d}</span> 为循环上下文矩阵。</p>",
      "quiz": {
        "q": "AutoTVM 使用排序损失（rank loss）而非回归损失训练代价模型的主要原因是什么？",
        "options": [
          "排序损失的计算速度更快，可以加速模型训练",
          "回归损失需要归一化处理，实现更复杂",
          "优化只需找到最优配置的相对排序，且排序对硬件测量噪声更鲁棒",
          "排序损失可以直接优化端到端推理延迟"
        ],
        "answer": 2,
        "explain": "AutoTVM 的目标是找到最优调度配置，只需要代价模型正确预测配置间的相对优劣即可，不需要精确的绝对代价值。排序目标绕过了绝对代价建模的困难，对硬件状态波动导致的测量噪声更加鲁棒。"
      }
    },
    {
      "id": "glow",
      "num": 7,
      "name": "Glow",
      "fullName": "图下降神经网络编译器 (Graph Lowering Compiler)",
      "year": "2018",
      "org": "Meta",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1805.00907",
      "projectUrl": "",
      "category": "graph_compilers",
      "motivation": "两级IR渐进下降结合静态内存规划，提升推理内存效率",
      "summary": "Glow 提出面向神经网络的 graph lowering 编译器，把前端计算图逐步下降为强类型高层 IR 和地址式低层指令 IR，通过算子规范化、目标无关优化、静态内存规划和后端代码生成，让新硬件只需支持少量低层线性代数原语即可高效执行推理图。",
      "keyPoints": [
        "<strong>Graph Lowering 思想</strong>：将复杂高层算子拆成更少、更基础的线性代数节点，减少后端必须实现的 op 种类",
        "<strong>两级强类型 IR</strong>：高层 IR 是带 tensor shape/type 的数据流图，适合常量传播、节点替换、量化、批归一化折叠等图优化；低层 IR 是地址式指令流，适合内存生命周期、拷贝消除、in-place 和指令调度",
        "<strong>强类型张量系统</strong>：每个节点/指令输入输出都有明确元素类型、shape 和量化参数，编译期验证类型一致性",
        "<strong>Node Lowering 时机</strong>：先自动微分/图优化，再将 FullyConnected、SGD、Regression 等高层节点降成 MatMul、Add、Sub、Mul、Save 等低层节点",
        "<strong>静态内存规划</strong>：低层 IR 中 <code>alloc/dealloc</code> 描述 activation 生命周期，最终分配器把所有临时 buffer 合并到单个可复用内存区域",
        "<strong>Profile-Guided Quantization</strong>：先插入 profiling node 估计激活范围，再重新编译为 int8 图，并优化 rescale/convert 节点",
        "<strong>CPU 后端优化</strong>：通过卷积权重布局变换、operator stacking、LLVM JIT/AOT 生成直接卷积和融合逐元素代码",
        "<strong>Runtime 分区执行</strong>：Partitioner/Provisioner/DeviceManager/Executor 将图切成子图，分配到多个加速器并异步执行推理请求"
      ],
      "detail": "<p><img alt=\"Glow 高层 IR 降低后的计算图\" src=\"https://ar5iv.labs.arxiv.org/html/1805.00907/assets/x1.png\" />\n<em>图：Glow 论文 Figure 2。自动微分后的回归/SGD 相关高层节点被降低为 Sub、Mul、Add、Save 等基础节点，后端无需直接实现 DivGrad 或 SGD 这类复杂 op。</em></p>\n<pre><code class=\"language-python\"># Glow graph lowering + 静态内存规划伪代码\ndef glow_compile(frontend_graph, backend):\n    module = load_as_high_level_ir(frontend_graph)       # ONNX / Caffe2 / PyTorch exporter ...\n    verify_strong_tensor_types(module)\n\n    if module.requires_training_graph:\n        module = differentiate(module)\n\n    module = optimize_high_level_graph(module, passes=[\n        &quot;constant_propagation&quot;,\n        &quot;dead_node_elimination&quot;,\n        &quot;batchnorm_fold_into_conv&quot;,\n        &quot;transpose_elimination&quot;,\n        &quot;profile_guided_quantization_optional&quot;,\n    ])\n\n    lowered = node_lowering(module, backend.capabilities)\n    lowered = backend.target_specific_graph_opt(lowered)\n    schedule = schedule_nodes(lowered, objective=&quot;minimize_activation_memory&quot;)\n\n    ir = irgen(schedule)                                # high-level nodes -&gt; low-level instructions\n    ir = optimize_low_level_ir(ir, passes=[\n        &quot;copy_elimination&quot;,\n        &quot;inplace_buffer_reuse&quot;,\n        &quot;lifetime_shrinking&quot;,\n    ])\n\n    memory_plan = static_allocate(ir.alloc_dealloc_lifetimes())\n    return backend.codegen(ir, memory_plan)\n\n\ndef static_allocate(lifetimes):\n    # lifetimes: [(name, start, end, bytes)]\n    blocks = []\n    for name, start, end, size in sorted(lifetimes, key=lambda x: x[1]):\n        block = first_fit(\n            blocks,\n            predicate=lambda b: b.size &gt;= size and not overlaps(b.live_range, (start, end)),\n        )\n        if block is None:\n            block = new_block(size)\n            blocks.append(block)\n        block.assign(name, start, end)\n    return coalesce_to_single_activation_arena(blocks)\n</code></pre>\n<h5>1. 动机：为什么不能直接把每个框架 op 翻译成 C++ 循环</h5>\n<p>Glow 论文从一个很小的例子说明普通低层编译器的局限：两个循环依次写同一个数组，最后只读第二次写入的值，人类很容易看出第一个循环冗余，但 C++ 编译器要证明指针别名、整数溢出、循环边界和语言语义，往往无法删除。神经网络图中这个问题更严重：如果把卷积、BatchNorm、ReLU、SGD 直接展开成低层循环，后端编译器很难再反推出“这是一个卷积后接逐元素激活”。因此 Glow 保留高层 IR，让编译器先在 tensor/op 语义上做优化，再逐步下降到指令和地址。</p>\n<h5>2. 高层 IR：强类型数据流图负责语义级优化</h5>\n<p>Glow 的高层 IR 类似 Caffe 风格的数据流图，但每个节点都有强类型 tensor 输入输出：shape、element type、量化参数都在编译期可见。<code>Constant</code> 表示编译期已知权重，优化器可以转置、量化、删除或折叠；<code>Placeholder</code> 表示运行时绑定输入/输出或可训练权重，优化器不能假设其具体值。这个区分让推理图的权重成为可优化对象，例如把 BatchNorm 参数折叠到卷积权重：</p>\n<div class=\"kb-math kb-math-display\">y=\\gamma\\frac{x-\\mu}{\\sqrt{\\sigma^2+\\epsilon}}+\\beta</div>\n<p>对于卷积输出 <span class=\"kb-math kb-math-inline\">x=W*a+b</span>，可以预先改写为：</p>\n<div class=\"kb-math kb-math-display\">W&#x27;=\\frac{\\gamma}{\\sqrt{\\sigma^2+\\epsilon}}W,\\quad\nb&#x27;=\\frac{\\gamma}{\\sqrt{\\sigma^2+\\epsilon}}(b-\\mu)+\\beta</div>\n<p>这样运行时不再需要单独 BatchNorm 节点，既减少计算，也缩短 activation 生命周期。</p>\n<h5>3. Node Lowering：用少量基础 op 覆盖大量前端 op</h5>\n<p>传统框架如果有 <span class=\"kb-math kb-math-inline\">N</span> 个高层 op 和 <span class=\"kb-math kb-math-inline\">M</span> 个硬件后端，最坏需要维护 <span class=\"kb-math kb-math-inline\">N\\times M</span> 份实现。Glow 的 node lowering 把这个矩阵压缩：高层 <code>FullyConnected</code> 降为 <code>MatMul + BroadcastAdd</code>，训练相关 <code>SGD</code> 可降为 <code>Sub/Mul/Add/Save</code>，<code>Regression</code> 在不同场景下降为 no-op 或 element-wise subtract。后端只需实现更小的基础算子集合。这个过程必须发生在高层 IR 中，而不是低层 IR 中，因为降低后的图还能继续触发图优化、影响调度和目标相关重写。其本质是把后端接口从“完整神经网络 op 集”收敛为“线性代数核心 op 集”：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{O}_{\\text{frontend}} \\xrightarrow{\\text{lowering}} \\mathcal{O}_{\\text{primitive}},\\quad |\\mathcal{O}_{\\text{primitive}}|\\ll|\\mathcal{O}_{\\text{frontend}}|</div>\n<h5>4. 低层 IR：地址式指令让内存优化变得显式</h5>\n<p>当图优化和 node lowering 完成后，IRGen 将高层节点转为低层指令。低层 IR 不再是“张量节点图”，而是带 <code>declare</code> 和 <code>program</code> 的指令列表；指令操作的是内存区域，operand 标注 <code>@in</code>、<code>@out</code>、<code>@inout</code>。这让编译器可以明确判断某个 buffer 是否只读、只写或原地更新，从而做 copy elimination 和 in-place reuse。论文强调 <code>alloc</code> 指令不是真正运行时 malloc，而是声明 activation 生命周期；真正分配发生在低层内存规划阶段。</p>\n<p>低层 IR 的峰值 activation 内存同样可以用生命周期公式描述：</p>\n<div class=\"kb-math kb-math-display\">M=\\max_t \\sum_{a\\in A}\\text{size}(a)\\cdot \\mathbf{1}[\\text{alloc}(a)\\le t&lt;\\text{dealloc}(a)]</div>\n<p>调度器和 allocator 的目标是通过节点顺序、生命周期缩短和 buffer 复用降低 <span class=\"kb-math kb-math-inline\">M</span>。相比 eager 框架逐 op 分配释放，Glow 在编译期知道整张推理图，因此可以把多个互不重叠 activation 映射到同一 arena offset。这个机制直接对应用户给出的动机：两级 IR 渐进下降结合静态内存规划，提升推理内存效率。</p>\n<h5>5. 量化：profile 决定 scale/offset，编译优化消除转换</h5>\n<p>Glow 支持 profile-guided int8 quantization。第一阶段，编译器在浮点图中插入 profiling 节点，运行代表性输入，记录每条边的数值范围；第二阶段，使用这些 range 重新编译图，把浮点 tensor 转为带 scale 和 offset 的 int8 tensor。Glow 使用的反量化关系是：</p>\n<div class=\"kb-math kb-math-display\">\\text{value}=(\\text{input}-\\text{offset})\\cdot \\text{scale}</div>\n<p>量化图中会出现 <code>rescale</code>、<code>convert</code> 等节点，用来对齐不同整数范围。Glow 的优化会尽量减少 float/int 往返、折叠 rescale 到产生数值的节点中，并把 <code>max</code> 等算子的输入归一到相同 scale，使硬件可以直接比较整数。这里的重点不是“简单把 float 换成 int8”，而是让量化信息进入类型系统和图优化，使后端拿到更干净的整数子图。</p>\n<h5>6. CPU 后端与 Runtime：从单图优化到多设备执行</h5>\n<p>Glow CPU 后端会进一步执行目标相关图变换，例如将卷积权重从 <code>[depth, filter_x, filter_y, channel]</code> 改为 <code>[depth/N, filter_x, filter_y, channel, N]</code>，让 SIMD 指令连续访问；再根据 cache 大小选择卷积 tile。operator stacking 类似自动融合：多个数据并行节点被合并到一个循环中，减少内存读写和 dispatch/kernel launch。Runtime 层则面向部署：Partitioner 按内存约束、估计时间和通信代价切分子图，Provisioner 编译并放置子图，DeviceManager 管理具体设备加载和执行，Executor 按依赖异步触发子网络。这样 Glow 不只是离线代码生成器，也提供了面向多加速器推理服务的执行抽象。</p>\n<div class=\"key-point\">💡 <strong>关键</strong>：Glow 的“降低”不是简单把图翻译成低层代码，而是在多个 IR 层级之间选择合适的优化位置：高层 IR 做语义优化和 op 规范化，低层 IR 做地址/生命周期/拷贝优化，后端做布局、SIMD、JIT/AOT 和设备特化。</div>",
      "quiz": {
        "q": "Glow 采用两级 IR 的主要原因是什么？",
        "options": [
          "高层 IR 负责张量语义级优化，低层 IR 负责地址、生命周期和静态内存规划等优化",
          "高层 IR 只用于存储 Python 源码，低层 IR 只用于调试日志",
          "两级 IR 的目的只是让文件格式更复杂",
          "低层 IR 可以完全替代图级优化，因此不需要高层 IR"
        ],
        "answer": 0,
        "explain": "Glow 在高层 IR 保留 tensor/op 语义以做 lowering 和图优化，在低层地址式 IR 中显式表示内存读写和生命周期，便于 copy elimination、in-place 和静态分配。"
      }
    },
    {
      "id": "ngraph",
      "num": 8,
      "name": "nGraph",
      "fullName": "Intel深度学习统一编译器 (Intel nGraph)",
      "year": "2018",
      "org": "Intel",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1801.08058",
      "projectUrl": "",
      "category": "graph_compilers",
      "motivation": "框架无关统一IR，解决Intel异构硬件多框架适配问题",
      "summary": "nGraph 提出框架无关的深度学习 IR、Framework Bridge 和 Backend Transformer 体系，把 TensorFlow、MXNet、neon 等前端计算图统一编译到 CPU、Nervana NNP、NVIDIA GPU 等后端，解决多框架乘多硬件适配带来的重复优化问题。",
      "keyPoints": [
        "<strong>统一 IR</strong>：用 stateless operation node 组成 DAG，节点输入和属性决定输出 shape 与 element type，避免被某个框架的图语义绑定",
        "<strong>Framework Bridge</strong>：每个框架只需实现桥接层，把自身计算图翻译成 nGraph IR，并把编译后的函数接回框架执行引擎",
        "<strong>Backend Transformer</strong>：每个硬件后端提供 transformer，负责 pattern matching、liveness analysis、memory management、layout 管理和后端代码生成",
        "<strong>适配复杂度降低</strong>：直接在每个框架里适配每种硬件需要 <span class=\"kb-math kb-math-inline\">\\mathcal{O}(fp)</span> 工作量；nGraph 通过 <span class=\"kb-math kb-math-inline\">f</span> 个 bridge 和 <span class=\"kb-math kb-math-inline\">p</span> 个 transformer 将目标逼近 <span class=\"kb-math kb-math-inline\">\\mathcal{O}(f+p)</span>",
        "<strong>布局抽象</strong>：IR 的逻辑轴顺序不固定等同于物理内存布局，使 transformer 能为 MKL-DNN、cuDNN、NNP 等后端选择不同 layout",
        "<strong>训练与推理并重</strong>：相比仅面向推理标准化的 ONNX，论文强调 nGraph IR 支持训练、自动微分、优化 pass 和多后端执行",
        "<strong>初始后端</strong>：CPU transformer 调用 MKL-DNN；NNP transformer 针对 Nervana NNP；cuDNN transformer 动态生成 CUDA/cuDNN 调用并可经 LLVM 生成 PTX"
      ],
      "detail": "<p><img alt=\"nGraph 架构图\" src=\"https://ar5iv.labs.arxiv.org/html/1801.08058/assets/fig.jpeg\" />\n<em>图：nGraph 通过前端框架桥接层接收计算图，经统一 IR 交给不同 backend transformer 编译和执行。来源：论文 Figure 1</em></p>\n<pre><code class=\"language-python\"># nGraph 端到端编译执行伪代码\ndef run_with_ngraph(framework_graph, framework, target_backend, runtime_inputs):\n    # 1. Framework Bridge: 框架图 -&gt; nGraph IR\n    ir_function = framework.bridge.lower_to_ngraph_ir(framework_graph)\n\n    # 2. IR 标准化：形状/类型推断、常量属性检查、训练图或推理图分析\n    for node in topological_sort(ir_function):\n        node.output_shape = node.op.infer_shape(node.inputs, node.attrs)\n        node.output_dtype = node.op.infer_dtype(node.inputs, node.attrs)\n\n    # 3. Backend Transformer: 选择硬件相关优化与 kernel strategy\n    transformer = TransformerRegistry.get(target_backend)\n    transformer.apply_pattern_rewrites(ir_function)\n    transformer.plan_liveness_and_memory(ir_function)\n    transformer.choose_tensor_layouts(ir_function)\n\n    # 4. 生成可执行函数并交回原框架运行时\n    executable = transformer.compile(ir_function)\n    buffers = transformer.allocate(runtime_inputs)\n    return executable.invoke(buffers)\n</code></pre>\n<p><strong>动机与背景：多框架乘多硬件的适配爆炸</strong></p>\n<p>论文把传统做法称为 direct optimization：TensorFlow、MXNet、Caffe、neon 等框架各自内置 CPU/GPU/ASIC 后端，硬件厂商若想支持新框架，往往需要深入改动该框架的图执行器、算子注册、内存分配和自动微分路径。若框架数为 <span class=\"kb-math kb-math-inline\">f</span>、硬件平台数为 <span class=\"kb-math kb-math-inline\">p</span>，逐对适配的工程量近似为：</p>\n<div class=\"kb-math kb-math-display\">C_{\\text{direct}} = \\mathcal{O}(f \\cdot p)</div>\n<p>nGraph 的核心抽象是把这张二维适配矩阵拆成两条一维接口：框架侧实现 bridge，硬件侧实现 transformer。理想情况下，新增一个框架只增加一个 bridge，新增一个硬件只增加一个 transformer：</p>\n<div class=\"kb-math kb-math-display\">C_{\\text{ngraph}} \\approx \\mathcal{O}(f + p)</div>\n<p>这不是单纯的接口封装，而是把图优化、内存计划、layout 决策和后端 kernel selection 收敛到统一 IR 层，避免每个框架重复实现同类编译优化。</p>\n<p><strong>核心机制：stateless DAG IR 与 shape/type 语义</strong></p>\n<p>nGraph IR 是由无状态 operation node 构成的有向无环图。每个节点有若干输入、输出和常量属性，例如 reduction axes、padding、stride 等；节点的输入类型和属性决定输出张量的 shape 与 element type。可以把每个 IR 节点理解为一个纯函数：</p>\n<div class=\"kb-math kb-math-display\">(S_{\\text{out}}, T_{\\text{out}}) =\n\\operatorname{Infer}_{op}(S_{\\text{in}}, T_{\\text{in}}, A_{op})</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">S</span> 表示 shape，<span class=\"kb-math kb-math-inline\">T</span> 表示 element type，<span class=\"kb-math kb-math-inline\">A_{op}</span> 表示算子属性。这个设计让编译器在执行前就能做静态检查、内存规划和后端选择。与更通用的编程语言 IR 不同，nGraph 有意保持数据流图形态，因为深度学习张量操作通常是大块、可并行、少副作用的计算；简单图 IR 更便于做 liveness、buffer reuse 和 kernel 匹配。</p>\n<p><strong>Framework Bridge：保持框架接口，替换后端执行</strong></p>\n<p>Bridge 的职责不是重写框架，而是伪装成该框架的一个后端。MXNet bridge 会把 NNVM inference graph 翻译为 nGraph IR，选择尽可能大的子图交给目标后端，并可在 nGraph IR 上做 autodiff；TensorFlow bridge 则注册为 XLA device，把 TensorFlow HLO 映射为 nGraph IR，再返回编译函数供 TensorFlow 调用。这个思路降低了迁移门槛：用户仍用原框架写模型，框架仍管理训练 loop 和数据入口，但可把可编译子图下沉到 nGraph。</p>\n<div class=\"key-point\">💡 关键：nGraph 的 bridge/transformer 分层让“前端语义适配”和“后端性能优化”解耦。前端只需要知道如何表达计算，后端只需要知道如何高效执行统一 IR。</div>\n<p><strong>Backend Transformer：从统一 IR 到硬件相关执行</strong></p>\n<p>Transformer 是 nGraph 真正的后端编译器。它接收 IR 后执行 pattern matching、活跃性分析、内存管理、tensor layout 管理和 kernel 选择。CPU transformer 借助 MKL-DNN 生成优化 kernel 调用序列；NNP transformer 尽量映射到 Nervana NNP 原生能力，对不支持的子图回退到 CPU transformer；cuDNN transformer 为卷积、softmax 等常见 kernel 生成 CUDA/cuDNN 调用，并把部分图 lowering 到 LLVM IR，再经 PTX 后端生成 GPU 汇编级代码。其抽象可以写成：</p>\n<div class=\"kb-math kb-math-display\">\\operatorname{Executable}_{b}\n= \\operatorname{Transformer}_{b}\n  \\left(\\operatorname{Passes}(\\operatorname{IR})\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">b</span> 是目标后端。与只调用 vendor library 的运行时不同，transformer 可以在图级别做 memory planning 与 layout decision，再与后端库粒度优化叠加。</p>\n<p><strong>布局抽象：逻辑轴不等于物理存储</strong></p>\n<p>很多框架默认把图语义和内存布局绑在一起，例如图像张量常写成 NCHW 或 NHWC。nGraph 论文中特别强调：除了用户可直接访问的张量外，IR 不把 axis order 固定解释为 element layout。这让 transformer 可以为不同后端选择不同地址映射：</p>\n<div class=\"kb-math kb-math-display\">\\operatorname{addr}\n= L_b(i_0, i_1, \\ldots, i_{r-1})</div>\n<p>同一个逻辑张量索引 <span class=\"kb-math kb-math-inline\">(i_0,\\ldots,i_{r-1})</span> 可以在 CPU 后端采用缓存友好的 blocked layout，在 GPU 后端采用更适合 cuDNN 的 layout，在 NNP 后端采用芯片原生 layout。其收益不只是避免 transpose，还让 layout propagation、buffer reuse 和 kernel selection 变成同一个 transformer 内部的联合决策。</p>\n<p><strong>与同期系统的区别</strong></p>\n<p>XLA 当时主要作为 TensorFlow 的实验后端，nGraph 的定位更强调多框架；NNVM/TVM 也追求多后端，但论文指出 NNVM 算子集未固定会导致前后端兼容性问题，而 nGraph 选择固定但可扩展的 IR operation set；ONNX 则更偏推理标准交换格式，nGraph 目标还包括训练、pass 和执行。nGraph 的贡献不是提出复杂新优化算法，而是把深度学习编译器工程拆成可扩展架构：框架桥接、统一 IR、后端 transformer 和执行 API。</p>",
      "quiz": {
        "q": "nGraph 用 Framework Bridge 和 Backend Transformer 分层的主要目的是什么？",
        "options": [
          "让所有框架都改用同一种 Python API",
          "把多框架与多硬件逐对适配的工作拆成前端桥接和后端编译两类接口",
          "只为 Intel CPU 替换 cuDNN kernel",
          "把动态图全部改写成控制流语言 IR"
        ],
        "answer": 1,
        "explain": "Bridge 负责框架图到 nGraph IR，Transformer 负责 IR 到硬件执行，目标是把 O(f·p) 的适配矩阵拆成 O(f+p) 的接口集合。"
      }
    },
    {
      "id": "tc",
      "num": 9,
      "name": "TC",
      "fullName": "框架无关高性能张量抽象 (Tensor Comprehensions)",
      "year": "2018",
      "org": "Meta/FAIR",
      "parent": "halide",
      "paperUrl": "https://arxiv.org/abs/1802.04730",
      "projectUrl": "",
      "category": "tensor_ir",
      "motivation": "数学符号描述张量运算，多面体编译自动生成CUDA代码",
      "summary": "Tensor Comprehensions 提出接近数学 Einstein 记法的张量 DSL，并用 Halide IR、多面体编译、CUDA 映射和遗传自动调优把高层张量表达自动生成高性能 GPU kernel，解决新算子需要手写 CUDA 或等待框架库支持的问题。",
      "keyPoints": [
        "<strong>TC DSL</strong>：用 <code>C(i,j) +=! A(i,k) * B(k,j)</code> 这类数学式描述张量计算，索引变量隐式声明，右侧独有索引自动成为 reduction 维度",
        "<strong>Range Inference</strong>：从输入 shape、仿射索引表达式和 <code>where</code> 约束推断迭代范围，减少手写边界和 off-by-one 错误",
        "<strong>初始化归约语义</strong>：<code>+=!</code>、<code>min=!</code>、<code>max=!</code> 表示先用归约单位元初始化输出，再执行归约，保持求值顺序无关性",
        "<strong>多面体 JIT</strong>：TC 先 lowering 到扩展 Halide IR，再到 Polyhedral IR，经 isl/PPCG 风格调度、tiling、fusion、mapping 生成 CUDA",
        "<strong>GPU 映射</strong>：使用 schedule tree 表示循环调度和 block/thread 映射，自动插入共享内存 promotion、同步和 kernel launch 结构",
        "<strong>编译缓存</strong>：以 <code>(TC, input, shapes, target, architecture)</code> 为 key 缓存最快 CUDA/PTX 版本，并可用 Protocol Buffer 持久化",
        "<strong>遗传自动调优</strong>：搜索 tile/block/grid 大小、unroll、fusion strategy、shared/private memory 等选项，编译并 profile 数百到数千个候选 kernel",
        "<strong>框架集成</strong>：通过 ATen 薄接口集成 PyTorch 和 Caffe2，单个 TC 可替换框架中的一个或多个计算图算子"
      ],
      "detail": "<p><img alt=\"TC JIT 编译流程\" src=\"https://ar5iv.labs.arxiv.org/html/1802.04730/assets/x1.png\" />\n<em>图：TC 从 Tensor Comprehension lowering 到扩展 Halide IR、Polyhedral IR，再经多面体变换生成 CUDA/C/ATen 执行路径。来源：论文 Figure 2</em></p>\n<pre><code class=\"language-python\"># Tensor Comprehensions 的核心流程伪代码\ndef compile_and_run_tc(tc_source, input_tensors, target_gpu):\n    # 1. 前端：解析数学式张量 DSL，并从输入 shape 推断迭代范围\n    tc_ast = parse_tensor_comprehension(tc_source)\n    ranges = infer_ranges(tc_ast, input_tensors.shapes)\n\n    # 2. Lowering：TC -&gt; 扩展 Halide IR -&gt; Polyhedral IR\n    halide_ir = lower_to_halide_ir(tc_ast, ranges)\n    scop = lower_to_polyhedral_ir(halide_ir)\n\n    # 3. 查缓存；miss 时进入多面体调度和自动调优\n    key = (canonicalize(tc_source), input_tensors.shapes, target_gpu.arch)\n    if cache.contains(key):\n        kernel = cache[key]\n    else:\n        best = None\n        population = init_genetic_population()\n        for generation in range(max_generations):\n            for config in population:\n                schedule_tree = isl_schedule(scop, config.fusion_strategy)\n                tiled = tile_and_map_to_cuda(schedule_tree, config)\n                cuda_src = generate_cuda(tiled)\n                runtime = compile_and_profile(cuda_src, input_tensors)\n                best = min(best, (runtime, cuda_src), key=lambda x: x[0]) if best else (runtime, cuda_src)\n            population = breed_and_mutate(population, fitness=lambda c: 1 / measured_runtime(c))\n        kernel = nvrtc_compile(best[1])\n        cache[key] = kernel\n\n    return kernel.launch(input_tensors)\n</code></pre>\n<p><strong>动机与背景：新算子的“白板公式”和 GPU 性能之间缺桥</strong></p>\n<p>深度学习研究经常发明新层、新归约或新数据布局，但主流框架通常只能高效调用 cuDNN、cuBLAS、NNPACK 这类手写库。只要计算不完全匹配已有库调用，就要写 custom operator，工程成本高且性能不稳定。Halide 已经证明“算法与调度分离”能提升图像处理生产力，但 GPU 调度仍常需要专家手写。TC 的目标是更激进：让用户只写张量数学式，把调度、映射和代码生成交给多面体编译器与 autotuner。</p>\n<p><strong>TC 语言：隐式索引、归约和初始化</strong></p>\n<p>TC 借用 Einstein notation：索引变量通过使用自动声明，出现在右侧但不在左侧的变量是 reduction 维度。例如矩阵乘法可写成：</p>\n<pre><code class=\"language-python\">def matmul(float(M, K) A, float(K, N) B) -&gt; (C) {\n    C(m, n) +=! A(m, kk) * B(kk, n)\n}\n</code></pre>\n<p><code>kk</code> 只出现在右侧，因此编译器把它识别为归约维度；<code>+=!</code> 表示先把 <code>C(m,n)</code> 初始化为加法单位元 0，再累加。这与普通 <code>+=</code> 不同，后者假设输出已有合法初值。数学上，它表达的是：</p>\n<div class=\"kb-math kb-math-display\">C_{m,n} = \\sum_{k=0}^{K-1} A_{m,k} B_{k,n}</div>\n<p>因为归约运算要求交换律和结合律，TC 的语义对循环排列保持不变，给后端调度留下了 loop interchange、tiling、fusion 等优化空间。</p>\n<p><strong>Range Inference：从访问表达式推断安全迭代域</strong></p>\n<p>TC 的简洁性来自范围推断。对仿射访问 <span class=\"kb-math kb-math-inline\">I(i+x)</span>、<span class=\"kb-math kb-math-inline\">K(x)</span>，编译器会先找只含单个未解变量的访问表达式，推断最大不越界区间；之后逐轮用已知变量范围推断剩余变量。对于无法唯一推断的维度，用户用 <code>where kw in 0:2</code> 显式给出范围。推断本质是在构造矩形迭代域：</p>\n<div class=\"kb-math kb-math-display\">D_S = \\left\\{\\mathbf{i} \\in \\mathbb{Z}^n \\mid A\\mathbf{i} + \\mathbf{b} \\ge 0 \\right\\}</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">\\mathbf{i}</span> 是循环索引向量，约束来自输入张量边界、输出张量定义和 <code>where</code> 注解。论文强调 TC 采用接近 Halide 的普遍量化语义：输出域上的每个点都必须由同一组输入访问规则安全定义，这有利于生成无条件分支的紧凑代码。</p>\n<p><strong>多面体编译：把张量式变成可调度的 SCoP</strong></p>\n<p>TC 的 lowering 路径是 <code>TC -&gt; Ext. Halide IR -&gt; Polyhedral IR -&gt; CUDA Kernel</code>。进入 Polyhedral IR 后，每个语句实例都是整数格点，读写访问是仿射关系，依赖也可表示为整数关系。调度就是为每个语句实例寻找时间戳函数：</p>\n<div class=\"kb-math kb-math-display\">\\theta_S(\\mathbf{i}) = M_S \\mathbf{i} + \\mathbf{c}_S</div>\n<p>在满足依赖约束的前提下，<span class=\"kb-math kb-math-inline\">\\theta</span> 决定 loop fusion、loop interchange、tiling、skewing、distribution 等变换。TC 使用 schedule tree 携带调度结构，再在树上插入 GPU mapping 信息，把外层 band 映射到 block，把内层 band 映射到 thread，并根据数据复用决定是否把全局内存 tile promotion 到 shared memory。</p>\n<div class=\"key-point\">💡 关键：TC 不只是把公式翻译成嵌套循环，而是把公式翻译成可由 isl/PPCG 风格算法变换的整数集合和关系，从而系统搜索 GPU 并行与内存层级。</div>\n<p><strong>自动调优与缓存：JIT 可用性的工程关键</strong></p>\n<p>多面体调度本身比训练便宜，但仍不适合每次运行都重新探索。TC 因此把 JIT、autotuning 和 compilation cache 绑定在一起。缓存 key 为：</p>\n<div class=\"kb-math kb-math-display\">K = (\\text{TC}, \\text{input}, \\text{shapes}, \\text{target}, \\text{architecture})</div>\n<p>缓存 value 是当前已知最快的 CUDA/PTX 版本。miss 时，autotuner 用遗传算法搜索配置：每个候选的 gene 对应 tile 大小、block/grid 形状、unroll 上界、fusion strategy、shared/private memory 使用等参数；候选被编译并在 GPU 上 profile，fitness 与运行时间成反比：</p>\n<div class=\"kb-math kb-math-display\">\\operatorname{fitness}(c) = \\frac{1}{\\operatorname{runtime}(c)}</div>\n<p>下一代通过三亲本 uniform crossover 和低概率 mutation 产生。论文还提到多线程、多 GPU autotuner：CPU 线程并行编译候选，GPU 并行 profile 候选，再把性能数据写回数据库和缓存。</p>\n<p><strong>与 Halide、XLA、手写 CUDA 的区别</strong></p>\n<p>TC 继承 Halide 的“从高层表达推断边界和调度空间”思想，但针对深度学习张量 contraction、长距离复用和高维归约做了更强的多面体调度与 GPU mapping；与 XLA 相比，TC 不依赖某个框架图，也不只做固定 pattern fusion，而是允许用户直接表达新算子并自动生成单个 fused kernel；与手写 CUDA 相比，TC 的峰值性能不总是最强，论文也承认大规模 SGEMM 仍落后 cuBLAS，原因是寄存器 tiling、warp 级 operand reuse 等低层技巧很难由通用多面体系统完全覆盖。但在分组卷积、批量矩阵乘和 Facebook 生产 LUT 模型中，TC 的自动生成 kernel 能显著缩短从公式到可用高性能实现的路径。</p>",
      "quiz": {
        "q": "Tensor Comprehensions 中 `+=!` 的核心语义是什么？",
        "options": [
          "执行原子加，保证多个 CUDA thread 不发生写冲突",
          "先用加法单位元初始化输出，再对右侧独有索引执行归约累加",
          "要求编译器把该语句映射到 cuBLAS GEMM",
          "表示该输出张量必须保留上一次调用的旧值"
        ],
        "answer": 1,
        "explain": "`!` 表示 initializing reduction：先初始化为归约单位元，再执行归约；这让 TC 的归约语义明确且与循环遍历顺序无关。"
      }
    },
    {
      "id": "jax",
      "num": 10,
      "name": "JAX",
      "fullName": "可组合函数变换加速框架 (JAX)",
      "year": "2018",
      "org": "Google",
      "parent": "xla",
      "paperUrl": "https://github.com/google/jax",
      "projectUrl": "",
      "category": "graph_compilers",
      "motivation": "函数式变换统一自动微分与JIT编译，极简接口极致性能",
      "summary": "JAX 把 NumPy 风格 Python 函数提升为可组合程序变换对象，通过 `grad`、`jit`、`vmap`、`pmap` 等函数变换和 tracing 到 jaxpr/XLA 的编译路径，同时获得自动微分、向量化、JIT 编译和多设备加速能力。",
      "keyPoints": [
        "<strong>NumPy-compatible 前端</strong>：用户以 <code>jax.numpy</code> 写数组程序，保留 Python 研究体验，同时把可加速子程序交给 JAX tracing",
        "<strong>可组合函数变换</strong>：<code>grad</code> 做自动微分，<code>jit</code> 做 XLA 编译，<code>vmap</code> 做自动批量化，<code>pmap</code>/后续并行 API 做多设备 SPMD 映射",
        "<strong>高层 tracing</strong>：运行一次 Python 函数，用抽象值记录数组级 primitive，而不是解释 Python VM 指令",
        "<strong>jaxpr IR</strong>：JAX 内部 IR 是显式类型、函数式、一阶、ANF 形式，适合被不同 transform interpreter 重写或解释",
        "<strong>XLA 后端</strong>：<code>jit</code> 将 trace/jaxpr lowering 到 XLA HLO/StableHLO，再由 XLA 做 fusion、layout、buffer 和目标代码生成",
        "<strong>Autograd 继承</strong>：早期 JAX 构建在 Autograd tracing 机制上，支持 forward/reverse mode，并可组合出高阶导数",
        "<strong>静态约束</strong>：JIT 缓存按 dtype、shape、tuple/tree 结构等 monomorphic signature 专门化；新 shape/dtype 可能触发重新编译",
        "<strong>纯函数倾向</strong>：为了让 transform 可组合，JAX 鼓励不可变数组、显式 PRNG key、显式控制流 primitive 和 PyTree 参数结构"
      ],
      "detail": "<p><img alt=\"JAX tracing 与 XLA 编译流程\" src=\"https://quickchart.io/graphviz?format=svg&amp;graph=digraph%20G%20%7B%0A%20%20rankdir%3DTB%3B%0A%20%20graph%20%5Bbgcolor%3D%22transparent%22%2C%20pad%3D%220.2%22%2C%20nodesep%3D%220.45%22%2C%20ranksep%3D%220.55%22%5D%3B%0A%20%20node%20%5Bshape%3Dbox%2C%20style%3D%22rounded%2Cfilled%22%2C%20fontname%3D%22Arial%22%2C%20fontsize%3D12%2C%20color%3D%22%235b6472%22%2C%20fillcolor%3D%22%23f8fafc%22%5D%3B%0A%20%20edge%20%5Bcolor%3D%22%23475569%22%2C%20arrowsize%3D0.7%5D%3B%0A%20%20py%20%5Blabel%3D%22Pure%20Python%20%2B%20NumPy%20function%22%5D%3B%0A%20%20trans%20%5Blabel%3D%22Composable%20transforms%0A%20grad%20%2F%20vmap%20%2F%20jit%20%2F%20pmap%22%5D%3B%0A%20%20trace%20%5Blabel%3D%22Tracing%20with%20abstract%20values%22%5D%3B%0A%20%20jaxpr%20%5Blabel%3D%22jaxpr%0A%20typed%20functional%20ANF%20IR%22%2C%20fillcolor%3D%22%23e0f2fe%22%5D%3B%0A%20%20lower%20%5Blabel%3D%22Lowering%20to%20StableHLO%20%2F%20XLA%20HLO%22%2C%20fillcolor%3D%22%23fef3c7%22%5D%3B%0A%20%20xla%20%5Blabel%3D%22XLA%20compile%3A%20fusion%2C%20layout%2C%20codegen%22%5D%3B%0A%20%20dev%20%5Blabel%3D%22CPU%20%2F%20GPU%20%2F%20TPU%20executable%22%2C%20fillcolor%3D%22%23dcfce7%22%5D%3B%0A%20%20py%20-%3E%20trans%20-%3E%20trace%20-%3E%20jaxpr%20-%3E%20lower%20-%3E%20xla%20-%3E%20dev%3B%0A%7D\" />\n<em>图：基于 SysML 2018 论文、JAX README 和官方 jaxpr 文档整理的 JAX 核心流程：Python 函数经可组合变换 tracing 成 jaxpr，再 lowering 到 XLA 执行。</em></p>\n<pre><code class=\"language-python\"># JAX transform 与 JIT 编译路径伪代码\ndef jax_jit_transform(f):\n    cache = {}\n\n    def wrapped(*args):\n        # 1. 抽象化实参，只保留 dtype/shape/tree structure 等编译相关信息\n        avals = abstractify(args)  # e.g. ShapedArray(float32[1024, 1024])\n        signature = monomorphic_signature(avals)\n\n        # 2. 缓存 miss 时执行一次 Python，收集 primitive trace\n        if signature not in cache:\n            jaxpr = trace_to_jaxpr(f, avals)\n            stablehlo = lower_jaxpr_to_stablehlo(jaxpr)\n            executable = xla_compile(stablehlo)\n            cache[signature] = executable\n\n        # 3. 缓存 hit 时直接调用已编译 executable\n        return cache[signature].run(*args)\n\n    return wrapped\n\ndef training_step(params, batch):\n    def loss_fn(p, example):\n        pred = model(p, example.x)\n        return ((pred - example.y) ** 2).sum()\n\n    # grad 生成梯度函数，vmap 自动批量化，jit 编译整个 batch 梯度\n    per_example_grad = jax.vmap(jax.grad(loss_fn), in_axes=(None, 0))\n    grads = per_example_grad(params, batch).mean(axis=0)\n    return tree_map(lambda w, g: w - lr * g, params, grads)\n\ncompiled_step = jax.jit(training_step)\n</code></pre>\n<p><strong>动机与背景：动态 Python 与加速器静态需求的张力</strong></p>\n<p>SysML 2018 论文把 JAX 的切入点概括为 high-level tracing JIT：研究者希望用 Python/NumPy/Autograd 这种灵活写法表达模型，但 GPU/TPU 编译器需要静态 shape、dtype、数据依赖和可融合的大块计算。论文观察到许多 ML 程序由“动态 Python orchestration + 大块纯函数式数组子程序”组成；后者被称为 pure-and-statically-composed (PSC) subroutine，可以剥离 Python 动态性并编译到加速器。JAX 的策略不是替换 Python，而是让用户用 <code>jit</code> 标记可加速函数，让 Python 执行一次并被 tracer 记录成静态数组级 IR。</p>\n<p><strong>jaxpr：让变换可组合的内部语言</strong></p>\n<p>JAX 官方文档定义 jaxpr 为显式类型、函数式、一阶、ANF 形式的内部 IR。一个 jaxpr 形如：</p>\n<pre><code class=\"language-text\">{ lambda a:f32[batch, dim] b:f32[dim, out].\n  let c:f32[batch, out] = dot_general a b\n      d:f32[batch, out] = tanh c\n  in (d,) }\n</code></pre>\n<p>它的关键不在语法，而在“有限 primitive + 显式数据依赖”。Python 函数中的 <code>jnp.dot</code>、<code>jnp.tanh</code>、切片、reduce、控制流 primitive 会被记录为 jaxpr equation；闭包常量被 hoist 成 constvars；输入和输出带 abstract value。这样 <code>grad</code> 可以把原 jaxpr 解释成求导 jaxpr，<code>vmap</code> 可以把 primitive 替换成 batched 版本，<code>jit</code> 可以把 jaxpr lowering 到 XLA。换句话说，JAX 的 transform 是对同一小语言的不同解释器。</p>\n<p><strong>自动微分：JVP/VJP 是一等变换</strong></p>\n<p>JAX 继承 Autograd 的可组合微分思想，但把它与 XLA staging 结合。前向模式计算 Jacobian-vector product：</p>\n<div class=\"kb-math kb-math-display\">\\operatorname{JVP}(f, x, v)\n= \\left.\\frac{d}{d\\epsilon} f(x + \\epsilon v)\\right|_{\\epsilon=0}\n= J_f(x)v</div>\n<p>反向模式计算 vector-Jacobian product：</p>\n<div class=\"kb-math kb-math-display\">\\operatorname{VJP}(f, x, \\bar{y}) = \\bar{y}^{\\top} J_f(x)</div>\n<p><code>grad(f)</code> 本质上是对标量输出函数构造 VJP，再取对输入的 cotangent。因为 JAX transform 作用于函数而不是某个全局 tape，<code>jit(grad(f))</code>、<code>grad(jit(f))</code>、<code>vmap(grad(f))</code> 都有明确含义。实际性能差异取决于 transform 顺序：通常把 <code>jit</code> 放在较外层可以让 XLA 看见更大的融合范围。</p>\n<p><strong>JIT 与 XLA：trace cache、lowering 和 fusion</strong></p>\n<p><code>jax.jit</code> 会按 monomorphic signature 缓存编译结果。这个签名包含 PyTree 结构、dtype、rank、shape 以及部分 static argument；当新 shape 或 dtype 出现时，JAX 可能重新 tracing 和编译：</p>\n<div class=\"kb-math kb-math-display\">\\operatorname{signature}(x)\n= \\left(\\operatorname{tree}(x), \\operatorname{dtype}(x), \\operatorname{shape}(x), \\operatorname{static\\_args}\\right)</div>\n<p>cache miss 时，JAX 用 abstract values 执行一次 Python 函数，得到 jaxpr；随后 lowering 到 StableHLO/XLA HLO，XLA 再做 algebraic simplification、operation fusion、layout assignment、buffer assignment 和目标代码生成。对表达式 <span class=\"kb-math kb-math-inline\">y=\\operatorname{selu}(Wx+b)</span> 这类图，XLA 可把多个 elementwise op 融合到矩阵乘后续 kernel，减少内存读写和 kernel launch。</p>\n<div class=\"key-point\">💡 关键：JAX 的性能来自“尽量保留 Python 作为元语言，同时把纯数组子程序 staged out”。它不是解释每一行 Python，而是用 Python 执行一次来生成可编译 IR。</div>\n<p><strong>vmap/pmap：批量化和多设备并行作为函数变换</strong></p>\n<p><code>vmap</code> 的语义可以写成：</p>\n<div class=\"kb-math kb-math-display\">\\operatorname{vmap}(f)(X)_i = f(X_i)</div>\n<p>但实现上不是 Python for-loop，而是为每个 primitive 定义 batching rule，把标量/单样本 jaxpr 转换为带 batch 维的 jaxpr。例如 <code>dot(x, w)</code> 在 batch 维上会变成 batched <code>dot_general</code>。<code>pmap</code> 的思想类似，但把 batch axis 切到多个设备，并为 <code>psum</code> 等 collective primitive 生成跨设备通信。后来的 JAX 生态继续发展出 <code>pjit</code>、<code>shard_map</code>、GSPMD 等更强的显式 sharding 能力，但 2018 年的核心洞察已经成立：并行化不是外部 runtime 选项，而是对函数的可组合变换。</p>\n<p><strong>约束与区别：为什么 JAX 鼓励函数式风格</strong></p>\n<p>JAX 不是“任意 Python 都能无痛编译”。如果 Python 控制流依赖运行时数组值，普通 <code>if</code>/<code>while</code> 会在 tracing 阶段失去静态性，用户需要 <code>lax.cond</code>、<code>lax.while_loop</code>、<code>lax.scan</code> 等 primitive；数组更新使用 <code>.at[...]</code> 这种函数式更新；随机数通过显式 PRNG key 传递，避免隐藏全局状态。这些约束换来的是 transform composability。与 TensorFlow 1.x 静态图相比，JAX 保留 Python 函数作为主要接口；与 PyTorch eager 相比，JAX 更早把“函数变换 + 编译 IR”放在中心，使自动微分、批量化和编译统一在同一个 jaxpr 机制上。</p>",
      "quiz": {
        "q": "JAX 中 jaxpr 的主要作用是什么？",
        "options": [
          "保存 Python 源码字符串，供解释器逐行执行",
          "作为显式类型、函数式的一阶 IR，让 grad、vmap、jit 等变换可以解释或重写同一计算",
          "替代 XLA 的后端代码生成器，直接输出 GPU 汇编",
          "记录所有运行时副作用，以便反向传播恢复全局状态"
        ],
        "answer": 1,
        "explain": "jaxpr 把 Python+NumPy 函数 trace 成小而静态的 primitive 程序，JAX 的自动微分、批量化和 JIT 编译都围绕这个 IR 组合。"
      }
    },
    {
      "id": "flexflow",
      "num": 11,
      "name": "FlexFlow",
      "fullName": "自动并行化深度学习编译器 (FlexFlow)",
      "year": "2019",
      "org": "Stanford",
      "parent": "—",
      "paperUrl": "https://proceedings.mlsys.org/paper_files/paper/2019/hash/b422680f3db0986ddd7f8f126baaf0fa-Abstract.html",
      "projectUrl": "",
      "category": "graph_compilers",
      "motivation": "SOAP空间统一并行维度搜索，超越数据与模型并行二元对立",
      "summary": "FlexFlow 提出 SOAP（Sample-Operation-Attribute-Parameter）四维并行搜索空间，将数据并行、模型并行和流水线并行统一到一个框架中，并通过执行模拟器（Execution Simulator）+ MCMC 搜索算法自动发现高效的逐算子并行策略，在多种 DNN 上实现了 1.3–3.3× 的训练加速。",
      "keyPoints": [
        "<strong>SOAP 四维搜索空间</strong>：将并行化配置分解为 Sample（批次维度）、Operation（算子间并行）、Attribute（非批次数据维度，如通道/空间）、Parameter（参数复制 vs 切分）四个正交维度",
        "<strong>逐算子粒度的并行策略</strong>：每个算子独立选择并行配置，而非全图统一使用数据并行或模型并行",
        "<strong>执行模拟器</strong>：将算子图 + 设备拓扑 + 并行策略映射为任务图（计算任务 + 通信任务），通过 FIFO 调度模拟预测执行时间，比真实执行快约 1000×",
        "<strong>Delta 模拟算法</strong>：MCMC 每步仅改变一个算子配置，增量更新任务图而非从头模拟，额外加速 2.2–6.9×",
        "<strong>MCMC 优化器</strong>：使用 Metropolis-Hastings 采样搜索策略空间，以 <span class=\"kb-math kb-math-inline\">p(\\mathcal{S}) \\propto \\exp(-\\beta \\cdot \\text{cost}(\\mathcal{S}))</span> 为目标分布，兼顾贪心搜索与跳出局部最优",
        "<strong>Legion 分布式运行时</strong>：基于 Legion 实现支持任意维度组合切分的分布式执行引擎",
        "<strong>评估覆盖 CNN + RNN</strong>：在 AlexNet、Inception-v3、ResNet-101、RNNTC、RNNLM、NMT 六个模型上验证，对比数据并行、专家策略、REINFORCE、OptCNN 均有显著提升"
      ],
      "detail": "<h5>1. 问题动机与背景</h5>\n<p>现有深度学习系统的并行化策略存在两个根本局限：</p>\n<ol>\n<li><strong>并行维度受限</strong>：数据并行仅切分批次维度，模型并行仅切分参数维度，无法利用其他维度（如通道、空间维度）的并行机会</li>\n<li><strong>粒度过粗</strong>：整个模型使用同一种并行策略，无法为不同特征的算子（计算密集 vs 通信密集）选择最优配置</li>\n</ol>\n<p>FlexFlow 的核心洞察是：<strong>最优并行策略应该是逐算子、多维度的</strong>——不同算子可能适合不同的并行方式，且每个算子可以同时在多个维度上切分。</p>\n<h5>2. SOAP 搜索空间</h5>\n<p><img alt=\"FlexFlow SOAP 搜索空间示意图\" src=\"https://arxiv.org/html/1807.05358v6/extracted/figures/parallelism.png\" />\n<em>图：SOAP 四维并行空间统一了数据并行（Sample 维度）、模型并行（Operation + Attribute 维度）和流水线并行（Operation 维度）</em></p>\n<p>对于算子图 <span class=\"kb-math kb-math-inline\">\\mathcal{G} = (\\mathcal{O}, \\mathcal{E})</span>（<span class=\"kb-math kb-math-inline\">\\mathcal{O}</span> 为算子集合，<span class=\"kb-math kb-math-inline\">\\mathcal{E}</span> 为依赖边），并行策略 <span class=\"kb-math kb-math-inline\">\\mathcal{S}</span> 为每个算子 <span class=\"kb-math kb-math-inline\">o_i</span> 指定一个并行配置 <span class=\"kb-math kb-math-inline\">c_i</span>：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{S} = \\{c_1, c_2, \\ldots, c_{|\\mathcal{O}|}\\}</div>\n<p>每个配置 <span class=\"kb-math kb-math-inline\">c_i</span> 定义了在各可并行维度上的切分度（degree of parallelism）。以矩阵乘法 <span class=\"kb-math kb-math-inline\">Y = X \\times W</span> 为例，可并行维度包括：\n- <strong>Sample 维度</strong>：切分批次维度，每个设备处理不同的样本子集\n- <strong>Attribute 维度</strong>：切分输出通道等非批次维度\n- <strong>Parameter 维度</strong>：决定权重是复制（replicate）还是切分（partition）</p>\n<p>各维度切分度的乘积等于分配的设备数：</p>\n<div class=\"kb-math kb-math-display\">\\prod_{d \\in \\text{dims}(o_i)} \\text{degree}(c_i, d) = |\\text{devices}(c_i)|</div>\n<div class=\"key-point\">💡 <strong>关键</strong>：SOAP 空间的指数级大小（<span class=\"kb-math kb-math-inline\">\\prod_{i} |C_i|</span>，其中 <span class=\"kb-math kb-math-inline\">|C_i|</span> 为算子 <span class=\"kb-math kb-math-inline\">o_i</span> 的可选配置数）使得穷举不可行，这正是需要高效搜索算法的原因。</div>\n<h5>3. 执行模拟器</h5>\n<p>执行模拟器是 FlexFlow 的核心组件，它将并行策略的评估从真实硬件执行（分钟级）转化为模拟预测（毫秒级）。</p>\n<p><strong>任务图构建</strong>：给定算子图 <span class=\"kb-math kb-math-inline\">\\mathcal{G}</span>、设备拓扑 <span class=\"kb-math kb-math-inline\">\\mathcal{D}</span>、并行策略 <span class=\"kb-math kb-math-inline\">\\mathcal{S}</span>，模拟器构建任务图 <span class=\"kb-math kb-math-inline\">\\mathcal{T} = (\\mathcal{T}_N, \\mathcal{T}_E)</span>：</p>\n<ul>\n<li><strong>计算任务</strong>：每个算子 <span class=\"kb-math kb-math-inline\">o_i</span> 根据配置 <span class=\"kb-math kb-math-inline\">c_i</span> 被拆分为 <span class=\"kb-math kb-math-inline\">|c_i|</span> 个计算任务，每个任务在一个设备上执行</li>\n<li><strong>通信任务</strong>：当两个有依赖关系的任务被分配到不同设备时，插入通信任务</li>\n</ul>\n<p><strong>四个关键假设</strong>：\n- <strong>A1</strong>（可预测的任务执行时间）：同一算子的相同大小子任务执行时间一致，通过 profiling 获取\n- <strong>A2</strong>（带宽模型）：通信时间 = <span class=\"kb-math kb-math-inline\">s / b</span>，其中 <span class=\"kb-math kb-math-inline\">s</span> 为数据大小，<span class=\"kb-math kb-math-inline\">b</span> 为带宽\n- <strong>A3</strong>（FIFO 调度）：同一设备上的任务按就绪时间先进先出执行\n- <strong>A4</strong>（可忽略的运行时开销）：任务调度等运行时开销相比计算和通信可忽略</p>\n<p><strong>Full Simulation 算法</strong>（Dijkstra 变体）：</p>\n<pre><code class=\"language-python\"># Algorithm 1: Full Simulation\ndef full_simulate(G, D, S):\n    T = build_task_graph(G, D, S)\n    ready_queue = PriorityQueue(key=lambda t: t.ready_time)\n\n    for t in T.nodes:\n        t.state = NOT_READY\n        if t.has_no_predecessors():\n            t.state = READY\n            ready_queue.enqueue(t)\n\n    while not ready_queue.empty():\n        t = ready_queue.dequeue()\n        d = t.device\n        t.state = COMPLETE\n        t.start_time = max(t.ready_time, d.last_task.end_time)\n        t.end_time = t.start_time + t.exe_time\n        d.last_task = t\n\n        for n in t.successors():\n            n.ready_time = max(n.ready_time, t.end_time)\n            if all(p.state == COMPLETE for p in n.predecessors()):\n                n.state = READY\n                ready_queue.enqueue(n)\n\n    return max(t.end_time for t in T.nodes)\n</code></pre>\n<h5>4. Delta 模拟算法</h5>\n<p>MCMC 搜索每步仅修改一个算子的配置，因此大部分执行时间线不变。Delta 模拟算法利用这一特性，仅重新模拟受影响的任务：</p>\n<pre><code class=\"language-python\"># Algorithm 2: Delta Simulation\ndef delta_simulate(T, G, D, old_config, new_config):\n    T, changed_tasks = update_task_graph(T, G, D, old_config, new_config)\n    update_queue = PriorityQueue(key=lambda t: t.ready_time)\n    update_queue.enqueue_all(changed_tasks)\n\n    while not update_queue.empty():\n        t = update_queue.dequeue()\n        t.start_time = max(t.ready_time, t.prev_task_on_device.end_time)\n        t.end_time = t.start_time + t.exe_time\n\n        for n in t.successors():\n            if update_task(n):  # readyTime or startTime changed\n                update_queue.push(n)\n        if update_task(t.next_task_on_device):\n            update_queue.push(t.next_task_on_device)\n\n    return max(t.end_time for t in T.nodes)\n</code></pre>\n<div class=\"key-point\">💡 <strong>关键</strong>：Delta 模拟类似 Bellman-Ford 的增量松弛——只传播变化，不重建整个时间线。在 64 GPU 场景下可额外加速 3.0–6.9×。</div>\n<h5>5. MCMC 搜索优化器</h5>\n<p>FlexFlow 将并行策略优化转化为代价最小化问题。由于搜索空间是 NP-hard（可归约到最小 makespan 问题），采用 MCMC 采样启发式搜索：</p>\n<p><strong>概率分布定义</strong>：</p>\n<div class=\"kb-math kb-math-display\">p(\\mathcal{S}) \\propto \\exp\\big(-\\beta \\cdot \\text{cost}(\\mathcal{S})\\big)</div>\n<p><strong>Metropolis-Hastings 接受准则</strong>：</p>\n<div class=\"kb-math kb-math-display\">\\alpha(\\mathcal{S} \\to \\mathcal{S}^*) = \\min\\Big(1, \\exp\\big(\\beta \\cdot (\\text{cost}(\\mathcal{S}) - \\text{cost}(\\mathcal{S}^*))\\big)\\Big)</div>\n<p><strong>提案生成</strong>：随机选择一个算子，将其并行配置替换为随机配置。该提案分布满足对称性 <span class=\"kb-math kb-math-inline\">q(\\mathcal{S}|\\mathcal{S}^*) = q(\\mathcal{S}^*|\\mathcal{S})</span>。</p>\n<p><strong>搜索流程</strong>：\n1. 以数据并行和随机策略作为初始候选\n2. 对每个初始策略，迭代提案直到：(a) 时间预算耗尽，或 (b) 半个搜索时间内无法改进最优策略\n3. 返回搜索过程中发现的最优策略</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：MCMC 的关键优势在于——当新策略更优时必定接受，当新策略更差时仍有概率接受（概率随代价差增大而指数衰减），从而能跳出局部最优。</div>\n<h5>6. 与现有方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>数据并行</th>\n<th>模型并行</th>\n<th>REINFORCE</th>\n<th>OptCNN</th>\n<th><strong>FlexFlow</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>搜索空间</td>\n<td>仅 Sample</td>\n<td>仅 Operation</td>\n<td>Operation (设备放置)</td>\n<td>Sample + Attribute</td>\n<td><strong>SOAP 全维度</strong></td>\n</tr>\n<tr>\n<td>搜索粒度</td>\n<td>全图统一</td>\n<td>全图统一</td>\n<td>逐算子</td>\n<td>逐算子</td>\n<td><strong>逐算子</strong></td>\n</tr>\n<tr>\n<td>搜索方法</td>\n<td>无需搜索</td>\n<td>手动设计</td>\n<td>强化学习</td>\n<td>动态规划</td>\n<td><strong>MCMC + 模拟器</strong></td>\n</tr>\n<tr>\n<td>支持非线性图</td>\n<td>✓</td>\n<td>✓</td>\n<td>✓</td>\n<td>✗</td>\n<td><strong>✓</strong></td>\n</tr>\n<tr>\n<td>搜索时间</td>\n<td>—</td>\n<td>—</td>\n<td>12–27 小时</td>\n<td>秒级</td>\n<td><strong>分钟级</strong></td>\n</tr>\n<tr>\n<td>硬件需求</td>\n<td>—</td>\n<td>—</td>\n<td>160 节点</td>\n<td>1 节点</td>\n<td><strong>1 节点</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>关键实验结果</strong>：\n- 对比数据并行和专家策略：<strong>1.3–3.3× 加速</strong>\n- 对比 REINFORCE：<strong>3.4–3.8× 加速</strong>，搜索时间从 12–27 小时降至 14–40 秒\n- 对比 OptCNN（非线性图）：<strong>1.2–1.6× 加速</strong>\n- 模拟器精度：预测时间与实际执行时间误差在 30% 以内，且保持策略间的相对排序\n- Inception-v3 端到端训练：比 TensorFlow 减少 38% 训练时间</p>\n<h5>7. 发现的策略洞察</h5>\n<p>FlexFlow 自动发现的最优策略揭示了几个重要洞察：</p>\n<ol>\n<li><strong>关键路径上用 intra-op 并行</strong>：Inception-v3 中，关键路径上的算子使用 intra-operation 并行（切分 Sample/Attribute），非关键路径的分支使用 inter-operation 并行，减少 75% 参数同步开销</li>\n<li><strong>参数多计算少的层减少设备数</strong>：NMT 的 embedding 层仅在少量设备上执行，减少参数同步</li>\n<li><strong>参数多计算重的层用通道切分</strong>：NMT 的 softmax 层按通道维度切分，每个设备只需部分参数，兼顾负载均衡和通信效率</li>\n<li><strong>感知设备拓扑</strong>：在非对称 GPU 连接（如 K80 集群）中，策略倾向于将相关算子放在有直连的 GPU 上</li>\n</ol>",
      "quiz": {
        "q": "FlexFlow 的 SOAP 搜索空间中，Attribute 维度对应的是什么？",
        "options": [
          "训练样本的批次维度切分（即数据并行）",
          "不同算子分配到不同设备（即流水线并行）",
          "非批次的数据维度切分（如通道、空间维度等）",
          "模型参数的复制或切分方式"
        ],
        "answer": 2,
        "explain": "Attribute 维度指的是张量中除批次维度外的其他数据维度（如卷积的通道维度、空间维度），切分这些维度可以实现传统数据并行和模型并行之外的并行方式。Sample 对应选项0，Operation 对应选项1，Parameter 对应选项3。"
      }
    },
    {
      "id": "triton",
      "num": 12,
      "name": "Triton",
      "fullName": "分块神经网络计算中间语言与编译器 (Triton)",
      "year": "2019",
      "org": "OpenAI",
      "parent": "—",
      "paperUrl": "https://dl.acm.org/doi/abs/10.1145/3315508.3329973",
      "projectUrl": "",
      "category": "tensor_ir",
      "motivation": "Tile抽象屏蔽GPU细节，非专家也能写出高性能内核",
      "summary": "Triton 提出以静态形状 tile 为一等对象的 GPU 编程语言与 LLVM 风格中间表示，让开发者在块级张量上表达矩阵乘、卷积和融合算子，并由编译器自动完成层级 tiling、内存合并、共享内存分配和同步插入，从而用接近 Python/C 的代码达到接近 cuBLAS/cuDNN 的性能。",
      "keyPoints": [
        "<strong>Tile-first 抽象</strong>：程序员操作的是 <span class=\"kb-math kb-math-inline\">M \\times N</span> 的块级张量，而不是 CUDA 线程和 warp；块级算子如 <code>dot</code>、<code>load</code>、<code>store</code> 成为 IR 的核心对象",
        "<strong>两层语言设计</strong>：Triton-C 用类 C 语法表达参数化 tile 程序，Triton-IR 用 SSA 与块级类型承载后续优化",
        "<strong>JIT 编译管线</strong>：Triton-C / Python AST 生成 Triton-IR，经过机器无关优化和机器相关优化后降到 LLVM-IR / PTX",
        "<strong>机器相关优化</strong>：自动执行层级 tiling、DRAM 访问 coalescing、共享内存 allocation、共享内存 barrier insertion",
        "<strong>自动调参</strong>：Triton-JIT 可从 IR 优化 pass 中直接抽取 tile、micro-tile、nano-tile 等元参数，不依赖手写模板空间",
        "<strong>应用覆盖</strong>：论文展示矩阵乘、dense convolution、shift convolution 等工作负载，矩阵乘性能通常与 cuBLAS 接近，并明显优于当时多个 DSL 方案"
      ],
      "detail": "<p><img alt=\"Triton 面向的 GPU 存储与计算结构\" src=\"https://images.ctfassets.net/kftzwdyauwt9/778bccdf-6cb5-4d9f-3a247ae7f2e3/9e6d1bb6bc09e1f7b3a9adc50fc776b3/gpu-architecture.svg?q=90&amp;w=3840\" />\n<em>图：OpenAI Triton 官方资料中的 GPU 架构示意。论文 Figure 2 的 Triton 管线可概括为 Triton-C → Triton-IR → Triton-JIT / Auto-Tuner → machine-independent passes → machine-dependent passes → machine-code。</em></p>\n<pre><code class=\"language-python\"># Triton 风格的块级矩阵乘伪代码\n@triton_jit\ndef matmul_kernel(A, B, C, M, N, K, stride_am, stride_ak, stride_bk, stride_bn,\n                  BLOCK_M, BLOCK_N, BLOCK_K, GROUP_M):\n    pid_m, pid_n = remap_program_id_for_l2_reuse(program_id())\n\n    rm = pid_m * BLOCK_M + arange(0, BLOCK_M)\n    rn = pid_n * BLOCK_N + arange(0, BLOCK_N)\n    rk = arange(0, BLOCK_K)\n\n    a_ptrs = A + rm[:, None] * stride_am + rk[None, :] * stride_ak\n    b_ptrs = B + rk[:, None] * stride_bk + rn[None, :] * stride_bn\n    acc = zeros((BLOCK_M, BLOCK_N), dtype=float32)\n\n    for k0 in range(0, K, BLOCK_K):\n        a_tile = load(a_ptrs, mask=(rm[:, None] &lt; M) &amp; (k0 + rk[None, :] &lt; K))\n        b_tile = load(b_ptrs, mask=(k0 + rk[:, None] &lt; K) &amp; (rn[None, :] &lt; N))\n        acc += dot(a_tile, b_tile)\n        a_ptrs += BLOCK_K * stride_ak\n        b_ptrs += BLOCK_K * stride_bk\n\n    store(C + rm[:, None] * stride_cm + rn[None, :] * stride_cn,\n          acc,\n          mask=(rm[:, None] &lt; M) &amp; (rn[None, :] &lt; N))\n</code></pre>\n<p><strong>动机：填补“库函数太固定、CUDA 太底层”的中间层。</strong> 深度学习研究经常需要 fused softmax、变体卷积、块稀疏访问、特殊激活融合等非标准 kernel。只用 PyTorch/TensorFlow 原子算子会产生临时张量和多次 kernel launch；直接写 CUDA 又要求开发者手动管理 DRAM 合并访问、shared memory、warp 同步、tensor core 指令排布。Triton 的切入点是把程序员暴露在“块级数据并行”层：跨 SM 的 work partition 仍由程序员用 <code>program_id</code> 和 tile shape 控制，但 SM 内部的线程级并行、内存合并和同步尽量交给编译器。</p>\n<p><strong>核心表示：tile 是类型系统和优化 pass 的共同语言。</strong> 在 Triton-IR 中，一个值可以是形如 <code>tensor&lt;16x32xf32&gt;</code> 的 tile，而不是标量寄存器或一维向量。矩阵乘的数学目标仍是：</p>\n<div class=\"kb-math kb-math-display\">C_{m,n} = \\sum_{k=0}^{K-1} A_{m,k} B_{k,n}</div>\n<p>Triton 把它重写为块级累加：</p>\n<div class=\"kb-math kb-math-display\">C_{M_t,N_t} \\leftarrow C_{M_t,N_t} + A_{M_t,K_t} \\cdot B_{K_t,N_t}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">M_t,N_t,K_t</span> 是 tile 维度。这个表示让 <code>tl.dot(a_tile, b_tile)</code> 在 IR 层保留为高层块级乘加，编译器可以在看到 <code>dot</code> 后再决定是否把输入搬到 shared memory、如何分配微块到 SIMD lane、如何在寄存器中保存 accumulator，而不是过早把程序展平成线程代码。</p>\n<p><strong>机器无关优化先处理“块代数”，机器相关优化再贴近 GPU。</strong> 论文把优化分成两类。机器无关 pass 包括循环不变量外提、自动 prefetch、tile-level peephole 等，例如连续转置可以按 <span class=\"kb-math kb-math-inline\">X=(X^T)^T</span> 消去。机器相关 pass 则面向 GPU 存储层级：层级 tiling 把 tile 继续切成 micro-tile / nano-tile，匹配 core、SIMD 单元和寄存器文件；memory coalescing 通过调整微块内部线程到数据元素的映射，减少访问一列 tile 时的 DRAM transaction；shared-memory allocation 根据变量活跃区间把高复用 tile 暂存到 shared memory；synchronization pass 根据数据流危险自动插入 barrier。</p>\n<p><strong>同步插入可以理解为对 shared memory 读写集合做数据流分析。</strong> 论文中的 RAW / WAR hazard 分析可简化表示为：</p>\n<div class=\"kb-math kb-math-display\">in_s^{RAW} = \\bigcup_{p \\in pred(s)} out_p^{RAW}, \\qquad\nout_s^{RAW} =\n\\begin{cases}\n\\emptyset, &amp; in_s^{RAW} \\cap read(s) \\ne \\emptyset \\quad \\text{insert barrier} \\\\\nin_s^{RAW} \\cup write(s), &amp; \\text{otherwise}\n\\end{cases}</div>\n<p>类似地，WAR 分析用 <span class=\"kb-math kb-math-inline\">read(s)</span> 累积潜在冲突并在后续写入前清空。直觉是：当某个语句要读到前序语句写入 shared memory 的区域，而这些操作在 GPU 机器模型中可能异步重排时，编译器必须在中间插入同步屏障。Triton 的优势在于 tile-level IR 保留了足够的读写集合信息，因此 barrier 不是程序员手写的，而是从 IR 分析中推导出来。</p>\n<p><strong>自动调参不是 AutoTVM 式手写模板，而是 pass 参数空间。</strong> 传统 autotuner 往往需要专家写“这个 conv2d 可以怎么 tile、哪个轴可以 unroll”的模板。Triton-JIT 则从 IR 和优化 pass 自身抽取 meta-parameter，例如每个 tile 维度的 tile size、micro-tile size、nano-tile size。论文实验中主要调层级 tiling，并在 powers of two 上穷举。这样的空间不一定比后来的学习型搜索更强，但它展示了一个关键方向：如果 IR 抽象足够贴近硬件优化动作，调参空间可以由编译器自动暴露，而不是由专家为每个算子重新编码。</p>\n<p><strong>与 TVM / Tensor Comprehensions / Halide 的区别。</strong> TVM 和 Halide 的强项是“算法描述 + schedule”，但 2019 年的 GPU 高性能 kernel 往往仍依赖专家模板和外部库。Tensor Comprehensions 通过 polyhedral 表示自动生成代码，但对非仿射访问、低层内存层级和 tensor core 友好代码并不总是自然。Triton 牺牲了一部分完全自动调度的目标，要求开发者显式选择 tile 级 work decomposition，却把 CUDA 中最易出错的线程级并发细节封装在编译器 pass 中，因此更适合深度学习研究者快速写高性能特化 kernel。</p>",
      "quiz": {
        "q": "Triton 相比手写 CUDA 最核心的抽象提升是什么？",
        "options": [
          "完全隐藏跨 SM 的任务划分，自动决定所有 tile 的位置",
          "把 tile / block 级张量作为一等对象，让编译器处理线程级并行、内存合并和同步",
          "只调用 cuBLAS/cuDNN，因此不需要生成 GPU 代码",
          "用多面体模型自动搜索所有合法仿射变换"
        ],
        "answer": 1,
        "explain": "Triton 仍要求开发者表达块级任务划分，但不再要求手动管理 CUDA 线程、shared memory barrier 和 coalescing 等细节；这些由 tile-level IR 和编译器 pass 推导。"
      }
    },
    {
      "id": "tiramisu",
      "num": 13,
      "name": "Tiramisu",
      "fullName": "多面体深度学习编译器 (Tiramisu)",
      "year": "2019",
      "org": "MIT",
      "parent": "—",
      "paperUrl": "https://ieeexplore.ieee.org/abstract/document/8661197/",
      "projectUrl": "",
      "category": "tensor_ir",
      "motivation": "四层多面体表示自动推导依赖，数学严谨保证变换正确性",
      "summary": "Tiramisu 提出一种基于多面体模型的代码优化框架，把算法、执行顺序、数据布局和通信拆成四层 IR，并用调度语言把 tile、parallelize、GPU 映射、buffer placement、send/receive 等优化显式表达出来，从而在 CPU、GPU 和分布式机器上生成可移植高性能代码。",
      "keyPoints": [
        "<strong>四层 IR</strong>：Layer I 表达纯算法，Layer II 表达计算顺序和处理器映射，Layer III 表达数据布局和 buffer 分配，Layer IV 表达通信、同步和内存拷贝",
        "<strong>多面体表示</strong>：计算域、调度和数据映射都用整数集合与仿射关系表示，可进行精确依赖分析、set emptiness check 和合法变换组合",
        "<strong>显式调度语言</strong>：支持 <code>tile</code>、<code>parallelize</code>、<code>vectorize</code>、<code>compute_at</code>、<code>store_in</code>、<code>cache_shared_at</code>、<code>send</code>、<code>receive</code>、<code>barrier_at</code> 等命令",
        "<strong>跨后端目标</strong>：同一算法可经不同 schedule 降到 x86 LLVM IR、CUDA GPU kernel、MPI 分布式代码，并可表达 shared/global/local/constant memory placement",
        "<strong>比 Halide 更强的表达力</strong>：自然支持非矩形迭代空间、循环偏斜、循环依赖数据流，以及分布式通信调度",
        "<strong>实验覆盖</strong>：论文评估深度学习、线性代数、图像处理和分布式 benchmark，展示相对 MKL、cuBLAS、Halide、PENCIL 等系统的竞争性能"
      ],
      "detail": "<p><img alt=\"Tiramisu 四层 IR 总览\" src=\"https://ar5iv.labs.arxiv.org/html/1804.10694/assets/x3.png\" />\n<em>图：Tiramisu overview。算法与 schedule 进入四层 IR，最终经不同 backend 生成 x86、GPU、分布式或 FPGA 方向的代码。</em></p>\n<pre><code class=\"language-cpp\">// Tiramisu 风格的 blur 算法与 GPU 调度伪代码\nvar i(&quot;i&quot;, 0, N - 2), j(&quot;j&quot;, 0, M - 2), c(&quot;c&quot;, 0, 3);\n\ncomputation bx(&quot;bx&quot;, {i, j, c},\n    (input(i, j, c) + input(i, j + 1, c) + input(i, j + 2, c)) / 3);\n\ncomputation by(&quot;by&quot;, {i, j, c},\n    (bx(i, j, c) + bx(i + 1, j, c) + bx(i + 2, j, c)) / 3);\n\n// Schedule: tile + GPU block/thread mapping + shared memory + data layout\nvar i0(&quot;i0&quot;), j0(&quot;j0&quot;), i1(&quot;i1&quot;), j1(&quot;j1&quot;);\nby.tile_gpu(i, j, 32, 32, i0, j0, i1, j1);\nbx.compute_at(by, j0);\nbx.cache_shared_at(by, j0);\nbx.store_in({c, i, j});\nby.store_in({c, i, j});\n\noperation cp1 = input.host_to_device();\noperation cp2 = by.device_to_host();\ncp1.before(bx, root);\ncp2.after(by, root);\n</code></pre>\n<p><strong>动机：自动 polyhedral 不够强，手工高性能代码又不可维护。</strong> GEMM、卷积、stencil 和图像处理需要组合 tiling、vectorization、unrolling、array packing、register blocking、prefetch、GPU shared memory、MPI 通信等优化。完全自动的 polyhedral 编译器如 Pluto/Polly 能做部分仿射循环变换，但很难选择最优的数据布局、通信粒度和硬件内存层级映射。Tiramisu 的设计判断是：让用户或上层 DSL 编译器显式给出 schedule，但让底层 IR 用多面体数学保证这些 schedule 的组合、依赖和代码生成是可分析的。</p>\n<p><strong>Layer I 只描述“算什么”，不描述“什么时候算”。</strong> 以 blur 的 <code>by</code> 为例，Layer I 可写成一个计算域加表达式：</p>\n<div class=\"kb-math kb-math-display\">\\{by(i,j,c): 0 \\le i &lt; N-2 \\land 0 \\le j &lt; M-2 \\land 0 \\le c &lt; 3\\}\n:\\frac{bx(i,j,c)+bx(i+1,j,c)+bx(i+2,j,c)}{3}</div>\n<p>这一层的计算之间没有顺序，声明顺序不影响执行顺序。这样做的好处是算法语义干净：依赖来自读写关系和迭代域，而不是来自程序文本顺序。它也让不同后端共享同一个算法定义，避免为了 CPU/GPU/分布式分别改写算法。</p>\n<p><strong>Layer II 把 schedule 变成 time-space 域。</strong> 当用户执行 <code>tile(i, j, 32, 32, i0, j0, i1, j1)</code> 时，Tiramisu 生成一个仿射变换：</p>\n<div class=\"kb-math kb-math-display\">\\{by(i,j,c) \\rightarrow by(i_0,j_0,i_1,j_1,c):\ni_0=\\lfloor i/32 \\rfloor \\land i_1=i\\bmod 32 \\land\nj_0=\\lfloor j/32 \\rfloor \\land j_1=j\\bmod 32\\}</div>\n<p>在多面体表示中，多个 schedule 命令就是多个 map 的组合；仿射 map 的复合仍是仿射 map，因此编译器可以继续使用整数集合库做依赖和合法性检查。Layer II 还给维度打标签，例如 <code>gpuB</code> 表示映射到 GPU block，<code>gpuT</code> 表示映射到 GPU thread，<code>cpu</code> 表示共享内存 CPU 并行维度，<code>node</code> 表示分布式节点维度。时间维度决定执行顺序，空间维度决定在哪类处理器上执行。</p>\n<p><strong>Layer III 专门管理“值放在哪里”。</strong> 传统 schedule 往往把循环变换和数据布局混在一起，导致优化 pass 之间互相牵连。Tiramisu 把数据映射分离出来，用 access relation 描述计算实例到 buffer 元素的映射。例如 <code>by.store_in({c,i,j})</code> 产生：</p>\n<div class=\"kb-math kb-math-display\">\\{by(i_0,j_0,i_1,j_1,c) \\rightarrow by[c, 32i_0+i_1, 32j_0+j_1]\\}</div>\n<p>这使得 AoS / SoA、维度转置、降维、环形 buffer、临时 buffer 分配都可以作为数据层关系表达。对于 GPU，<code>cache_shared_at</code> 会在这一层创建适当的 shared memory buffer 与拷贝操作；对于 CPU，可表达 vectorized layout 或 cache-friendly layout。</p>\n<p><strong>Layer IV 处理通信与同步，支撑分布式目标。</strong> Tiramisu 相比 Halide 的一项重要扩展是把 send/receive、barrier、host/device copy 都纳入调度语言。<code>send({is}, src, size, dst, {ASYNC})</code> 和 <code>receive({ir}, dst, size, src, {SYNC}, s)</code> 在 Layer IV 被翻译成语句，并在代码生成时降为 MPI 或 CUDA 拷贝/同步调用。由于通信也被放入 time-space 域，用户能控制“何时发边界数据、何时等待、哪个分布式维度负责通信”，编译器则负责把这些语义嵌入最终循环 nest。</p>\n<p><strong>代码生成依赖 ISL/Cloog：遍历整数集合一次且只一次。</strong> 从 Layer IV 生成代码，本质上是在满足词典序顺序的前提下，为每个 computation set 生成恰好访问一次每个整数点的循环 nest。Tiramisu 依赖 ISL 中的 Cloog-style code generation 算法先生成 AST，再由 backend 转成 LLVM IR、CUDA 或 MPI 代码。GPU backend 会把 <code>gpuT/gpuB</code> 维度翻译为 thread/block id，把 shared/global/constant memory 标签翻译为 CUDA buffer allocation，并把完整 tile 和边界 partial tile 分开，以减少线程分歧。</p>\n<p><strong>与其他编译器的区别。</strong> 与完全自动的 Pluto/Polly 相比，Tiramisu 不把最难的 schedule 选择全部交给启发式模型，而是把优化动作暴露成明确命令；与 Halide 相比，它使用多面体表示而不是区间表示，因此更自然支持非矩形域、任意仿射变换、循环依赖和分布式通信；与 Tensor Comprehensions 相比，Tiramisu 的重点不是仅为深度学习张量表达式做 GPU JIT，而是提供覆盖 CPU、GPU、分布式和 FPGA 的通用多面体调度框架。</p>",
      "quiz": {
        "q": "Tiramisu 四层 IR 中，哪一层负责把计算实例映射到具体 buffer 元素并表达数据布局？",
        "options": [
          "Layer I：Algorithm",
          "Layer II：Computation Management",
          "Layer III：Data Management",
          "Layer IV：Communication Management"
        ],
        "answer": 2,
        "explain": "Layer III 在 Layer II 的执行域基础上加入 access relation、buffer allocation/deallocation 和 store_in/cache 等数据布局信息。"
      }
    },
    {
      "id": "relay",
      "num": 14,
      "name": "Relay",
      "fullName": "深度学习高层函数式图IR (Relay)",
      "year": "2019",
      "org": "UW/Apache",
      "parent": "tvm",
      "paperUrl": "https://arxiv.org/abs/1904.08368",
      "projectUrl": "",
      "category": "infrastructure",
      "motivation": "函数式静态类型图IR，支持复杂图优化与类型推断",
      "summary": "Relay 提出了一种基于函数式编程的静态类型中间表示（IR），将深度学习计算图扩展为支持一等函数、递归控制流和代数数据类型的完整语言，在保持与传统框架持平或更优性能的同时，实现了对复杂模型（如 TreeLSTM）的表达、可组合优化 Pass 的设计，以及从 GPU 到 FPGA 加速器的跨硬件可移植代码生成。",
      "keyPoints": [
        "<strong>函数式 IR 设计</strong>：在计算图基础上引入 let 绑定（显式共享与作用域）、一等函数（高阶抽象与递归）、if 条件分支、代数数据类型 ADT（list/tree 等复杂结构），形成类 OCaml/SML 的严格函数式语言",
        "<strong>类型系统与推断</strong>：Tensor 类型携带形状信息；引入 Type Relation 机制处理算子间复杂形状约束（如广播语义）；基于 Hindley-Milner 的类型推断 + 约束求解器自动推导全图类型与形状",
        "<strong>算子融合</strong>：基于后支配树（post-dominator tree）识别可融合子图，提取为 primitive 函数后由 TVM 生成硬件特定的融合代码，支持非线性（菱形）数据流融合",
        "<strong>通用量化框架</strong>：三步流程 Annotate → Calibrate → Realize，通过程序重写规则将 FP32 模型转为 INT8/INT16，支持用户自定义量化策略与舍入方式",
        "<strong>可组合优化 Pass</strong>：融合、常量折叠、算子布局变换、公共子表达式消除等 Pass 可自由组合，效果因模型和硬件而异",
        "<strong>跨硬件可移植性</strong>：同一 IR 可编译到 CPU（x86/ARM）、GPU（NVIDIA）、FPGA 加速器，无需修改模型代码",
        "<strong>评估覆盖广泛</strong>：视觉（ResNet/MobileNet/VGG）+ NLP（CharRNN/TreeLSTM/GRU/LSTM），在推理性能上匹配或超越 TensorFlow、PyTorch、MxNet"
      ],
      "detail": "<p><img alt=\"Relay IR 语法定义\" src=\"https://arxiv.org/html/1904.08368v1/extracted/figures/relay_grammar.png\" />\n<em>图：Relay 的核心语法定义，包括表达式（let/if/fn/match）、类型（Tensor/Function/ADT）和声明（类型定义与全局函数）。来源：论文 Figure 1</em></p>\n<pre><code class=\"language-python\"># Relay 算子融合伪代码\ndef fuse_ops(relay_expr):\n    # Step 1: Extraction — 构建数据流 DAG 并计算后支配树\n    dag = build_dataflow_dag(relay_expr)\n    post_dom_tree = compute_post_dominator(dag)\n\n    # 按后支配关系将算子分组为等价类\n    groups = {}\n    for node in dag.nodes:\n        dominator = post_dom_tree.immediate_dominator(node)\n        groups.setdefault(dominator, []).append(node)\n\n    # Step 2: 为每个融合组构建 primitive 函数\n    fused_funcs = []\n    for dom, members in groups.items():\n        body = build_fused_expr(members)\n        free_vars = collect_free_variables(body)\n        fn = Function(params=free_vars, body=body, is_primitive=True)\n        fused_funcs.append(fn)\n\n    # Step 3: Lowering — TVM 生成硬件特定代码\n    for fn in fused_funcs:\n        tvm_compute = collect_tvm_exprs(fn)        # 收集各算子的 TVM 计算描述\n        fused_compute = combine(tvm_compute)         # 合并为聚合表达式\n        schedule = select_master_schedule(fn)        # 选择主调度模板\n        compiled_fn = tvm.build(fused_compute, schedule, target)\n    return replace_with_compiled(relay_expr, fused_funcs)\n</code></pre>\n<p><strong>动机与背景：计算图 IR 的三重困境</strong></p>\n<p>传统深度学习框架（TensorFlow、PyTorch、MxNet）的核心抽象是计算图——一个由算子节点和张量边组成的有向无环图。这种表示在早期 CNN 时代足够使用，但随着模型复杂度的爆炸式增长，计算图暴露出三个根本性缺陷：（1）<strong>表达力不足</strong>——缺乏词法作用域、一等函数和递归，无法自然表达 TreeLSTM、动态路由等依赖数据的控制流，框架不得不引入 <code>tf.while_loop</code>、<code>tf.cond</code> 等临时构造，这些构造对后续优化不透明；（2）<strong>优化不可组合</strong>——没有类型系统和作用域信息，活跃性分析、常量传播等经典编译优化难以精确实施，各优化 Pass 之间存在隐式耦合；（3）<strong>可移植性差</strong>——图级优化与底层代码生成紧密绑定，新增硬件后端需要大量重复工作。Relay 的核心洞察是：函数式编程语言的设计原则（不可变绑定、静态类型、高阶函数、模式匹配）恰好能系统性地解决这三个问题。</p>\n<p><strong>核心机制：从计算图到函数式语言的四步扩展</strong></p>\n<p>Relay 在计算图之上逐步引入四个语言特性，每一步都解决一个具体问题：</p>\n<ol>\n<li>\n<p><strong>Let 绑定</strong>：<code>let x = e1 in e2</code> 引入词法作用域和显式共享。计算图中节点的多次引用是隐式的（通过边），这导致 TensorFlow 需要插入虚拟控制边来强制副作用顺序。Let 绑定使共享和求值顺序都变得显式，为活跃性分析和内存规划提供了精确的程序结构信息。</p>\n</li>\n<li>\n<p><strong>一等函数与递归</strong>：<code>fn(x, y) { body }</code> 加上命名递归。计算图本质上是一个从多输入到多输出的单一计算，缺乏函数抽象。一等函数使 Relay 能将 <code>tf.while_loop</code> 自然表达为尾递归函数（如论文 Figure 2 所示），将 <code>tf.cond</code> 表达为 if-else，极大简化了前端导入器的实现。</p>\n</li>\n<li>\n<p><strong>代数数据类型（ADT）</strong>：通过类型声明和模式匹配支持 list、tree 等递归数据结构。这使得 TreeLSTM 等在树结构上递归的模型可以直接在 IR 中表达，而非退化为固定展开的图。</p>\n</li>\n<li>\n<p><strong>类型系统</strong>：Relay 的类型系统是整个优化框架的基石。Tensor 类型 <code>Tensor[shape, dtype]</code> 携带静态形状信息，用于指导内存分配、循环优化和硬件张量化。对于算子间复杂的形状关系（如 <code>broadcast_add</code> 的输出形状依赖两个输入的广播规则），Relay 引入了 <strong>Type Relation</strong> 机制：每个算子注册一个用元语言实现的关系函数，类型检查器在每个调用点实例化并求解这些关系。整个推断过程基于 Hindley-Milner 算法扩展：先遍历 AST 生成类型变量和关系约束，再通过二部图依赖求解器迭代求解，最后标注每个子表达式的类型。</p>\n</li>\n</ol>\n<p><strong>优化流程：融合、量化与可组合 Pass</strong></p>\n<p>Relay 的优化体系围绕两个旗舰优化展开：</p>\n<ul>\n<li>\n<p><strong>算子融合</strong>是性能提升的最大来源（GPU 上尤为显著）。Relay 的融合算法优于传统方法的关键在于：（a）基于后支配树而非简单的线性链匹配，能处理菱形数据流（一个输入被多条并行链消费后再合并）；（b）融合后由 TVM 重新调度，可进行循环内联、自动调优等进一步优化；（c）对任意新增算子自动生效，因为所有算子都有 TVM 计算描述。实验显示，融合在 GPU 上为 ResNet-18 带来约 2× 加速。</p>\n</li>\n<li>\n<p><strong>通用量化框架</strong>采用三步编译器重写：Annotate 阶段在每个算子输入/输出插入模拟量化节点 <code>simQ</code>；Calibrate 阶段在真实数据上运行模型以确定 scale 和 range 参数；Realize 阶段将 <code>simQ</code> 展开为实际的 cast/shift/clip 操作，随后这些逐元素操作可被融合进原始算子，生成全新的量化算子。这种设计的优势在于量化策略完全由重写规则定义，用户可自由选择 signed/unsigned、floor/ceiling/stochastic rounding 等方案。在 Raspberry Pi 3 上，INT8/INT16 量化将 MobileNet 推理时间降低约 2×，精度损失仅 ~4%。</p>\n</li>\n<li>\n<p><strong>可组合 Pass</strong>：实验（Figure 5）显示，逐步叠加融合 → 常量折叠 → 布局变换 → CSE 四个 Pass 可持续提升性能，但最优组合因模型和硬件而异——CPU 上布局变换最有效（改善缓存局部性），GPU 上融合最有效（减少 kernel launch 开销）。VGG-16 因主要由不可融合的背靠背卷积组成，对融合不敏感；而 ResNet/MobileNet 因残差连接中的逐元素加法而大幅受益。</p>\n</li>\n</ul>\n<p><strong>与传统方法的对比</strong></p>\n<p>与 XLA、Glow、nGraph 等图编译器相比，Relay 的核心差异在于 IR 层面的表达力——这些系统使用受限的计算图 IR，无法表达递归控制流和高阶函数。与 TorchScript 相比，Relay 是静态类型的纯函数式 IR，可进行全程序静态分析，而 TorchScript 需要适应 Python 的动态语义，只能通过 profiling JIT 识别稳定 trace 后再交给底层编译器。与 MLIR 相比，MLIR 是构建 IR 方言的共享基础设施，而 Relay 是一个完整的端到端深度学习编译解决方案。Relay 的设计洞察可以指导 MLIR 方言的开发。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：Relay 证明了\"零成本抽象\"在深度学习编译器中是可行的——增加 IR 表达力（函数、控制流、ADT）不会损害已有模型的性能（Stroustrup 原则：\"你不用的东西，你不需要为之付出代价\"），同时为复杂模型带来了显著的优化机会。</div>",
      "quiz": {
        "q": "Relay 的算子融合算法使用什么数据结构来识别可融合的子图？",
        "options": [
          "拓扑排序后的线性扫描",
          "后支配树（Post-Dominator Tree）",
          "最小生成树（Minimum Spanning Tree）",
          "强连通分量（Strongly Connected Components）"
        ],
        "answer": 1,
        "explain": "Relay 构建数据流 DAG 的后支配树，按直接后支配关系将算子分组为等价类，这使得它能融合菱形等非线性数据流模式，而非仅限于线性链。"
      }
    },
    {
      "id": "ansor",
      "num": 15,
      "name": "Ansor",
      "fullName": "无模板高性能张量程序自动生成 (Ansor)",
      "year": "2020",
      "org": "UC Berkeley",
      "parent": "autotvm",
      "paperUrl": "https://www.usenix.org/conference/osdi20/presentation/zheng",
      "projectUrl": "",
      "category": "tensor_ir",
      "motivation": "无需专家模板自动构建搜索空间，覆盖更广优化可能性",
      "summary": "Ansor 提出无需手写 schedule template 的张量程序生成框架，用“sketch + annotation”的分层搜索空间自动覆盖算子和子图优化，再通过随机采样、进化搜索、学习型代价模型和任务调度器找到高性能程序，解决 AutoTVM 等模板式搜索空间覆盖不足的问题。",
      "keyPoints": [
        "<strong>无模板搜索空间</strong>：从计算 DAG 自动生成 sketch，避免为每个算子和硬件后端手写 schedule template",
        "<strong>分层表示</strong>：sketch 捕获多级 tiling、融合、cache stage、rfactor 等高层结构；annotation 随机填充 tile size、parallel、vectorize、unroll、compute location 等低层选择",
        "<strong>完整程序采样</strong>：随机采样完整程序后再评估，避免 Halide auto-scheduler 式逐步构造中对 incomplete program 的不准确剪枝",
        "<strong>进化搜索</strong>：用 tile size mutation、parallel mutation、pragma mutation、computation location mutation、node-based crossover 对完整程序做 out-of-order rewrite",
        "<strong>学习型代价模型</strong>：提取算术和访存特征，用梯度提升树预测程序吞吐，采用对高吞吐程序加权的平方误差训练",
        "<strong>任务调度器</strong>：当一个 DNN 被切成多个 subgraph 时，用近似梯度选择最可能改善端到端性能的任务分配 tuning 预算",
        "<strong>端到端效果</strong>：论文在 Intel CPU、ARM CPU、NVIDIA GPU 上评估 ResNet-50、MobileNet-V2、3D-ResNet、DCGAN、BERT 等模型，相比当时最佳替代方案分别可达约 3.8×、2.6×、1.7× 加速"
      ],
      "detail": "<p><img alt=\"Ansor 系统总览\" src=\"https://ar5iv.labs.arxiv.org/html/2006.06762/assets/x4.png\" />\n<em>图：Ansor 系统架构。DNN 先被 Relay 分割为 subgraph，任务调度器分配优化预算，program sampler 生成初始程序，performance tuner 用进化搜索和代价模型筛选，measurer 把真实运行时间反馈给系统。</em></p>\n<pre><code class=\"language-python\"># Ansor 主流程伪代码\ndef ansor_optimize(dnn, target, max_trials):\n    subgraphs = relay_partition_and_fuse(dnn)\n    tasks = [SearchTask(g) for g in subgraphs]\n    cost_model = GradientBoostedTree()\n    history = []\n\n    # warm-up: 给每个任务少量 round-robin 测量\n    for task in tasks:\n        sketches = generate_sketches(task.dag)           # multi-level tiling, fusion, cache, rfactor\n        programs = random_annotate(sketches, target)     # tile sizes, vectorize, parallel, unroll\n        measured = compile_run_measure(programs[:k], target)\n        history.extend(measured)\n\n    while len(history) &lt; max_trials:\n        task = task_scheduler_pick(tasks, history)       # argmax |partial objective / partial budget|\n        population = sample_programs(task) + best_seen(task, history)\n\n        for gen in range(num_generations):\n            candidates = mutate_and_crossover(population)\n            scores = cost_model.predict(candidates)\n            population = select_top_and_diverse(candidates, scores)\n\n        batch = topk(population, by=cost_model.predict)\n        measured = compile_run_measure(batch, target)\n        history.extend(measured)\n        cost_model.fit(history, weighted_square_loss)\n\n    return best_program_per_subgraph(history)\n</code></pre>\n<p><strong>动机：AutoTVM 的模板空间太依赖专家，Halide 式逐步搜索又会过早剪枝。</strong> 深度学习算子高性能实现包含 tile structure、tile size、fusion、cache、vectorization、parallelization、unroll、layout rewrite、reduction factorization 等组合。AutoTVM 能做高效搜索，但搜索空间由手写模板定义，新增算子、新硬件或跨算子融合都需要专家重写模板。Halide auto-scheduler 用固定顺序逐步构造程序并用 cost model 剪枝，但中间状态不是完整可测程序，最终性能很难准确估计。Ansor 的策略是：先自动生成足够大的结构空间，再随机采样完整程序，最后只对完整程序做代价模型排序和真实测量。</p>\n<p><strong>Sketch 是高层结构，annotation 是低层选择。</strong> Ansor 对计算 DAG 按拓扑序从输出向输入应用 derivation rule。典型规则包括 Skip、Always Inline、Multi-level Tiling、Multi-level Tiling with Fusion、Add Cache Stage、Reduction Factorization。以 CPU 为例，多级 tiling 采用 <code>SSRSRS</code> 结构，其中 <code>S</code> 表示 space loop tile，<code>R</code> 表示 reduction loop tile；GPU 版本改成 <code>SSSRRSRS</code>，前三个 space tile 分别绑定到 <code>BlockIdx</code>、virtual thread 和 <code>ThreadIdx</code>。sketch 数量通常小于 10，但每个 sketch 的 annotation 组合可达到数十亿级。</p>\n<p><strong>随机 annotation 保证覆盖，进化搜索负责变好。</strong> 对每个 sketch，Ansor 随机填 tile size、并行化外层 loop、向量化内层 loop、设置 unroll pragma，并随机调整部分节点的 compute location。随机采样本身不保证性能，但它让搜索空间里的每个完整程序都有非零机会被选中，避免 beam search 对 incomplete program 的早期偏见。进化阶段再针对完整程序做局部改写：tile size mutation 在不同 tile level 之间转移因子并保持乘积不变，因此程序仍合法；parallel mutation 改并行粒度；pragma mutation 改 unroll 等编译器 hint；node-based crossover 以 DAG 节点为粒度合并不同父程序的 rewrite history，降低破坏依赖的风险。</p>\n<p><strong>代价模型预测的是程序吞吐，并更重视快程序。</strong> Ansor 对每个 innermost non-loop statement 提取特征，包括算术量、内存访问模式和所在上下文；完整程序 <span class=\"kb-math kb-math-inline\">P</span> 的预测吞吐是语句得分之和。论文使用加权平方误差：</p>\n<div class=\"kb-math kb-math-display\">loss(f, P, y) = w_p\\left(\\sum_{s \\in S(P)} f(s) - y\\right)^2\n= y\\left(\\sum_{s \\in S(P)} f(s) - y\\right)^2</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">S(P)</span> 是程序中的 innermost non-loop statements，<span class=\"kb-math kb-math-inline\">y</span> 是真实吞吐并同时作为权重。这个选择体现了目标偏好：搜索并不需要准确预测所有慢程序，只要能把最有希望的快程序排到前面即可。每轮真实测量后，新的 <code>(program, throughput)</code> 样本会加入训练集，代价模型重新训练并服务下一轮进化搜索。</p>\n<p><strong>任务调度器解决“整个 DNN 有很多子图”的预算分配。</strong> Relay 会把模型分成多个 subgraph，例如 <code>conv2d + relu</code>。如果每个 subgraph 都给固定 tuning 次数，预算会浪费在不影响端到端延迟的小节点上。Ansor 把每个任务 <span class=\"kb-math kb-math-inline\">i</span> 已分配的优化时间记作 <span class=\"kb-math kb-math-inline\">t_i</span>，用目标函数 <span class=\"kb-math kb-math-inline\">f(t)</span> 表示端到端指标，并近似选择：</p>\n<div class=\"kb-math kb-math-display\">i^* = \\operatorname*{argmax}_i \\left|\\frac{\\partial f}{\\partial t_i}\\right|</div>\n<p>直觉是：优先调“继续投入最可能改善整体目标”的 subgraph。刚开始任务会 round-robin warm-up；之后如果某个大延迟 subgraph 连续 tuning 没有改进，它的边际收益估计会下降，调度器会把预算转给其他瓶颈。</p>\n<p><strong>与 AutoTVM 的根本差异在搜索空间来源。</strong> AutoTVM 的调优能力很强，但它搜索的是模板作者预先写出的网格；如果最优程序需要模板之外的 cache node、fusion pattern 或 reduction factorization，搜索永远碰不到。Ansor 的 sketch rule 是通用 derivation，不绑定某个算子模板；用户也可以注册新的 derivation rule 来覆盖 Winograd、TensorCore 或特殊加速器 intrinsic。它因此更像“自动构造搜索空间 + 学习型筛选”，而不是“专家给搜索空间 + 自动找参数”。</p>",
      "quiz": {
        "q": "Ansor 为什么要先随机采样完整程序，而不是像逐步构造方法那样对 incomplete program 做 beam search 剪枝？",
        "options": [
          "完整程序不需要编译，因此测量成本更低",
          "完整程序的最终性能可以真实测量和训练代价模型，避免对中间状态做不可靠估计",
          "随机采样会自动找到全局最优，因此不需要后续搜索",
          "beam search 无法处理任何矩阵乘法程序"
        ],
        "answer": 1,
        "explain": "Ansor 认为 incomplete program 的最终性能难以准确预测，早期剪枝会排除潜在好程序；因此先生成完整程序，再用进化搜索、代价模型和真实测量逐步优化。"
      }
    },
    {
      "id": "mlir",
      "num": 16,
      "name": "MLIR",
      "fullName": "多层中间表示编译基础设施 (Multi-Level Intermediate Representation)",
      "year": "2020",
      "org": "Google",
      "parent": "llvm",
      "paperUrl": "https://ieeexplore.ieee.org/abstract/document/9370308/",
      "projectUrl": "",
      "category": "infrastructure",
      "motivation": "Dialect元框架解决IR碎片化，实现优化Pass高度复用",
      "summary": "MLIR 提出了一套可扩展的 SSA 中间表示基础设施，用 Operation、Region、Block、Attribute、Type 和 Dialect 统一表达从高层数据流图到低层 LLVM IR 的多级抽象，解决了机器学习与异构编译栈中 IR 重复建设、Pass 难复用、降级路径割裂的问题。",
      "keyPoints": [
        "<strong>最小内核 + 全面可扩展</strong>：MLIR 固定的核心概念很少，几乎所有语义都由用户定义的 Op、Type、Attribute 和 Dialect 承载",
        "<strong>Dialect 方言机制</strong>：每个 Dialect 以命名空间组织一组 Op/Type/Attribute，不同 Dialect 可以在同一模块中混合存在，支持逐步降级",
        "<strong>Operation 作为唯一语义单元</strong>：从指令、循环、函数到模块都建模为 Operation，Operation 可包含嵌套 Region，Region 中包含 SSA Block",
        "<strong>Region 和 Block Argument</strong>：用嵌套 Region 表达循环、函数、控制流、闭包和并行结构，用 Block Argument 替代 LLVM 风格的 PHI 节点",
        "<strong>ODS 声明式定义</strong>：通过 TableGen 的 Operation Definition Specification 定义 Op 的操作数、结果、Trait、Verifier 和文档",
        "<strong>DRR 声明式重写</strong>：用 Declarative Rewrite Rule 描述 Op 到 Op 的等价重写，服务于规范化、优化和 Dialect Conversion",
        "<strong>Progressive Lowering</strong>：允许高层 Dialect 和低层 Dialect 共存，把复杂编译过程拆成多段小降级，而不是一次性丢失高层语义",
        "<strong>Affine/Vector/LLVM 等标准方言</strong>：内置或配套方言覆盖多面体循环优化、向量化、LLVM IR 映射等关键降级阶段",
        "<strong>工程基础设施复用</strong>：统一提供 parser/printer、验证器、Pass Manager、并行编译、源位置追踪和 round-trip 文本 IR"
      ],
      "detail": "<p><img alt=\"MLIR 分层代码生成流程\" src=\"https://user-images.githubusercontent.com/10148468/73613629-c5586580-45c5-11ea-94b7-074aeea94c7b.png\" />\n<em>图：MLIR/Linalg 官方文档中的分层代码生成视图，展示从高层 OpGraph 到 Linalg、Affine/Stripe、Vector、LLVM 等低层方言的逐步降级。</em></p>\n<pre><code class=\"language-python\"># MLIR progressive lowering 的核心流程伪代码\ndef compile_with_mlir(module, target):\n    module = import_frontend_program(module)\n    verify(module)\n\n    while not target.is_legal(module):\n        for op in module.walk_preorder():\n            if can_canonicalize(op):\n                rewrite_to_canonical_form(op)\n            elif has_dialect_conversion(op, target):\n                # 只降低当前已经准备好的 Op，其它部分可继续保持高层 Dialect\n                replace_op_with_lower_level_ops(op)\n            elif can_fold_constants(op):\n                fold(op)\n\n        run_passes(module, [\n            &quot;canonicalize&quot;,\n            &quot;cse&quot;,\n            &quot;shape-inference&quot;,\n            &quot;bufferize-or-materialize-if-needed&quot;,\n        ])\n        verify(module)\n\n    return emit_target_binary_or_ir(module, target)\n</code></pre>\n<p><strong>动机与背景：为什么 LLVM 还不够</strong></p>\n<p>LLVM 成功统一了很多传统语言的后端，但它的 IR 大致处在“接近 C 加向量”的抽象层级。现代编译栈的问题不在于缺少一个后端 IR，而在于高层语义太多：TensorFlow Graph、XLA HLO、TPU IR、TensorRT、TFLite、Core ML、NNAPI 等系统各有图表示、优化器和运行时接口。每个项目都重复实现 parser、verifier、pass pipeline、诊断、调试和 lowering 基础设施，但这些 IR 又难以共享优化。MLIR 的核心判断是：与其要求所有系统都过早降到 LLVM IR，不如提供一个可定义多层 IR 的元框架，让领域专用 IR 能共享同一套编译器工程基础设施。</p>\n<p><strong>核心对象模型：Operation 是唯一语义单元</strong></p>\n<p>MLIR 把 IR 抽象成一个递归结构：</p>\n<div class=\"kb-math kb-math-display\">\\text{Op} = (\\text{name}, \\text{operands}, \\text{results}, \\text{attributes}, \\text{regions}, \\text{location})</div>\n<p>其中 <code>name</code> 通常带有 Dialect 前缀，如 <code>affine.for</code>、<code>linalg.generic</code>、<code>llvm.call</code>。Op 消费和产生 SSA value，Attribute 保存编译期静态信息，Region 提供嵌套结构，Location 记录源位置或变换轨迹。这个设计的关键是“函数、循环、模块、指令都只是 Op”：<code>func.func</code> 是带 Region 的函数 Op，<code>affine.for</code> 是带循环体 Region 的循环 Op，<code>module</code> 是带符号表的顶层 Op。这样一来，Pass Manager 不必固定在 module/function/loop 三类粒度上，而可以在任意 Op 层级运行。</p>\n<p><strong>Region、Block 与 SSA：保留结构而不是过早线性化</strong></p>\n<p>传统 LLVM IR 用基本块和 PHI 节点表达控制流，适合低层优化，但会丢掉很多高层结构。MLIR 的 Region 是嵌套在 Op 内的 CFG，Block 以参数承接前驱传入的值，而不是用 PHI 节点集中合流。对循环来说，<code>affine.for</code> 的 entry block argument 就是 induction variable；对函数来说，函数参数就是 entry block argument。这个机制允许 MLIR 同时表达结构化循环、非结构化 CFG、闭包、异步执行和图区域。更重要的是，带有 <code>isolated-from-above</code> 属性的 Op 会形成作用域边界，使 use-def 链不能跨越边界，编译器可以并行处理这些区域。</p>\n<p><strong>Dialect：用命名空间管理抽象层，而不是制造一个巨型 IR</strong></p>\n<p>Dialect 本身不强加语义，而是把一组相关 Op、Type、Attribute 和接口组织到唯一命名空间下。机器学习前端可以有 TensorFlow/TOSA/MHLO 方言，结构化张量计算可以降到 Linalg，循环与多面体分析可以使用 Affine，向量抽象可以进入 Vector，最终再降到 LLVM Dialect。关键机制是混合方言：同一个函数里可以一部分已经是 <code>affine.load</code>，另一部分仍是 <code>linalg.matmul</code> 或高层 tensor op。用集合表示，某一阶段的 IR 合法性不是全局一次性替换，而是逐步扩大低层合法集合：</p>\n<div class=\"kb-math kb-math-display\">Legal_{t+1} = Legal_t \\cup Convert(D_{\\text{high}} \\rightarrow D_{\\text{low}})</div>\n<p>这避免了传统两阶段编译的常见问题：一旦降得太低，就必须从低层 IR 里“反推”循环、张量形状、数据布局等高层事实。MLIR 的原则是高层信息只在不再需要时才丢弃。</p>\n<p><strong>声明式基础设施：ODS、DRR、Verifier 和可测试文本 IR</strong></p>\n<p>MLIR 的工程贡献不只是 IR 语法，而是降低新 IR 的建设成本。ODS 用 TableGen 声明 Op 的输入输出、类型约束、Trait、summary 和 verifier，例如 <code>NoSideEffect</code>、<code>SameOperandsAndResultType</code> 可直接供优化器使用；DRR 用图重写规则表达一个 Op DAG 到另一个 Op DAG 的等价转换，可生成 C++ pattern；Verifier 先检查通用 SSA、dominance、symbol、terminator 等结构性约束，再检查每个 Op 自己的语义约束。文本 IR 可 round-trip，意味着单个 Pass 的输入输出都能用文本文件测试，极大降低了调试和回归测试成本。</p>\n<p><strong>与传统编译方法的区别</strong></p>\n<p>与 LLVM 相比，MLIR 不是替代 LLVM 后端，而是在 LLVM 之上补齐“多层中间表示基础设施”。与 XLA/TVM/Glow 这类深度学习编译器相比，MLIR 的目标不是只服务某一类模型或某一套后端，而是让不同领域构建自己的 Dialect 并共享基础设施。与经典多面体编译器相比，MLIR 的 Affine Dialect 把 affine map、integer set、memref layout、structured loop 作为 IR 的一部分，既能做精确依赖分析，又保留常规 SSA 操作，避免完全升降到外部 polyhedral representation 带来的表示鸿沟。</p>\n<div class=\"key-point\">💡 关键：MLIR 的创新不是“又发明一个 IR”，而是把“发明领域专用 IR”本身工程化、声明式化、可组合化，让每个抽象层都能在合适的时机保留、优化或降级。</div>",
      "quiz": {
        "q": "MLIR 的 Dialect 机制主要解决什么问题？",
        "options": [
          "把所有语言强制转换成一个固定的低层指令集",
          "让不同抽象层的 Op、Type、Attribute 可在统一基础设施中定义、混合和逐步降级",
          "替代 LLVM 后端的寄存器分配与指令选择",
          "只为 TensorFlow Graph 提供一种专用图格式"
        ],
        "answer": 1,
        "explain": "Dialect 是 MLIR 的扩展单元，它允许不同抽象层和领域的 IR 在同一模块中共存，并通过 Dialect Conversion 逐步降低到目标后端。"
      }
    },
    {
      "id": "akg",
      "num": 17,
      "name": "AKG",
      "fullName": "昇腾NPU自动算子生成器 (Automatic Kernel Generator)",
      "year": "2021",
      "org": "Huawei",
      "parent": "tiramisu",
      "paperUrl": "https://dl.acm.org/doi/10.1145/3453483.3454106",
      "projectUrl": "",
      "category": "hardware_specific",
      "motivation": "多面体技术适配NPU，自动协同异构调度",
      "summary": "AKG 将 TVM 风格的张量表达降到多面体 schedule tree，用 ILP 调度、复杂 tiling/fusion、自动存储管理和 NPU 专用卷积变换自动生成 Ascend NPU kernel，解决了手写 schedule 难覆盖异构计算单元与复杂片上内存层次的问题。",
      "keyPoints": [
        "<strong>TVM 前端复用</strong>：继承 TVM graph engine 和 DSL，接收深度学习框架产生的 fused operator/subgraph",
        "<strong>HalideIR 到 Polyhedral IR</strong>：把张量表达降到参数化 HalideIR，再转换为多面体 schedule tree",
        "<strong>ILP 多面体调度</strong>：利用 isl 的多面体 scheduler 自动寻找兼顾并行性与局部性的 affine schedule",
        "<strong>Reverse tiling 策略</strong>：先 tile live-out iteration space，再反推 intermediate iteration space 的复杂/重叠 tile shape",
        "<strong>Tile-size specification 与 Auto Tiling</strong>：用简洁策略语言描述 tile size 和目标 buffer，并基于硬件规格自动搜索",
        "<strong>Post-tiling fusion</strong>：用 schedule tree 的 extension node 和 mark node 在 tiling 后再融合 producer/consumer，减少片外数据搬运",
        "<strong>多方向片上数据流管理</strong>：根据 dot-product/reduction 模式将计算分流到 Cube Unit、Vector Unit、Scalar Unit 和 L1/UB/L0 buffer",
        "<strong>卷积专用优化</strong>：自动执行 img2col，将 convolution 变为 GEMM，再 graft fractal GEMM schedule tree 适配 Ascend DaVinci 架构",
        "<strong>后端补充优化</strong>：在代码生成阶段实现 SIMD vectorization、动态规划式同步合并、低层指令发射和学习型 auto-tuning"
      ],
      "detail": "<p><img alt=\"AKG 编译流程总览\" src=\"https://01.me/files/AKG/PLDI21-slides-images/slide13.png\" />\n<em>图：AKG PLDI 2021 演示中的系统架构。AKG 从深度学习框架进入 Tensor Expression，经多面体 schedule tree、fusion、tiling、storage management、backend optimization、instruction emitter 与 synchronization 生成低层汇编。</em></p>\n<pre><code class=\"language-python\"># AKG 自动 kernel 生成核心伪代码\ndef akg_compile(fused_subgraph, hardware_spec):\n    tensor_expr = tvm_graph_engine_to_tensor_expression(fused_subgraph)\n    halide_ir = lower_to_parametric_halide_ir(tensor_expr)\n    schedule_tree = build_polyhedral_schedule_tree(halide_ir)\n\n    # 1. 先用 isl 找到利于 tiling/fusion 的 affine schedule\n    schedule_tree = isl_schedule(schedule_tree, objective=[&quot;parallelism&quot;, &quot;locality&quot;])\n\n    # 2. 自动选 tile size，并从 live-out tile 反推 producer tile shape\n    tile_policy = auto_tiling(schedule_tree, hardware_spec)\n    live_out_tiles = tile_live_out_iteration_spaces(schedule_tree, tile_policy)\n    producer_relation = reverse_construct_producer_tiles(live_out_tiles, access_relations(halide_ir))\n\n    # 3. 在 tiling 后插入 extension node 做 aggressive fusion\n    schedule_tree = insert_extension_node(schedule_tree, producer_relation)\n    schedule_tree = mark_original_producer_subtree_as_skipped(schedule_tree)\n\n    # 4. 面向 NPU 的多方向数据流和卷积特化\n    schedule_tree = mark_cube_or_local_ub(schedule_tree, hardware_spec)\n    if contains_convolution(schedule_tree):\n        schedule_tree = replace_conv_with_img2col_fractal_gemm(schedule_tree, hardware_spec)\n\n    # 5. 生成 CCE/低层代码并做后端优化\n    code = emit_target_code(schedule_tree, hardware_spec)\n    code = vectorize_and_align(code)\n    code = minimize_synchronization_by_dynamic_programming(code)\n    return auto_tune(code, tile_policy.search_space)\n</code></pre>\n<p><strong>动机与背景：NPU 的难点不是“有算力”，而是“喂得上数据”</strong></p>\n<p>GPU/CPU 上的张量编译器可以依赖较通用的 cache 层次、SIMD/SIMT 模型和相对稳定的 schedule primitive；NPU 则不同。以 Ascend 910 的 DaVinci 架构为例，矩阵乘法走 Cube Unit，逐元素或向量计算走 Vector Unit，控制和标量逻辑走 Scalar Unit，数据还要在 L1、Unified Buffer、L0A、L0B、L0C 之间移动。传统“内存金字塔”模型不够表达这种多层、多方向、软件控制的数据流。手写 TVM schedule 或 CCE 代码虽然能逼近高性能，但每个 shape、每个 fused pattern、每个硬件路径都需要专家调参，开发周期和调试成本很高。</p>\n<p><strong>整体流程：把 TVM 的表达能力接到多面体调度能力上</strong></p>\n<p>AKG 没有重做深度学习前端，而是继承 TVM 的 graph engine 和 tensor DSL：图优化器先把框架模型切成 fused subgraph，AKG 负责每个 fused operator 的 operator-level optimization 与 code generation。张量表达先降到 HalideIR，再转换成 schedule tree。Schedule tree 的 domain/filter/band/sequence/set/extension/mark node 能表达 statement instance、执行次序、循环维度、融合分组和 codegen hint。相比 TVM schedule primitive，polyhedral scheduler 能自然表达 skewing、shifting、scaling、fusion、fission 等更宽的 affine transformation 空间。</p>\n<p><strong>Tiling 机制：先切 live-out，再反推 producer 的复杂 tile</strong></p>\n<p>论文的关键设计是 reverse strategy。传统多面体编译常把每个 iteration space 独立 tile，然后再考虑融合；AKG 反过来，先对 live-out iteration space 做矩形 tile，再根据读访问关系计算这个 tile 需要哪些 producer 数据，从而得到 intermediate iteration space 的复杂 tile shape。对二维卷积示例，live-out tile loop <span class=\"kb-math kb-math-inline\">(o_0,o_1)</span> 与 producer statement <span class=\"kb-math kb-math-inline\">S_0(h,w)</span> 的关系可写为：</p>\n<div class=\"kb-math kb-math-display\">\\{(o_0,o_1) \\rightarrow S_0(h,w) :\n0 \\le o_0 &lt; \\lceil(H-KH+1)/T_2\\rceil \\land\n0 \\le o_1 &lt; \\lceil(W-KW+1)/T_3\\rceil \\land\nT_2o_0 \\le h &lt; T_2o_0 + KH + T_2 - 1 \\land\nT_3o_1 \\le w &lt; T_3o_1 + KW + T_3 - 1\\}</div>\n<p>这个关系说明 producer tile 不是普通矩形块，而可能因为卷积核重叠、stride 和 padding 形成 overlap tile。正是这种复杂 tile shape 让 AKG 能把更多中间张量保留在片上 buffer 中，减少 off-chip memory traffic。</p>\n<p><strong>Fusion 机制：offload 时尽量合并，片上执行时按计算单元分流</strong></p>\n<p>AKG 区分两类 fusion。第一类是 <strong>fusion when offloading data</strong>：用 extension node 把原本不在当前 subtree 中的 producer statement instance 引入 tile 内，实现 post-tiling fusion；再用 mark node 标记原 producer subtree 为 skip，避免重复生成代码。这比先融合再 tiling 的传统做法有更大的组合空间。第二类是 <strong>fusion when forking data</strong>：数据上片后需要分流到不同 compute unit。AKG 用 <code>local_UB</code> mark 表示某些 subtree 进入 Unified Buffer 并交给 Vector/Scalar Unit；包含 dot-product reduction 的计算则视为 convolution/matmul，流向 Cube Unit。片上局部还会做 intra-tile rescheduling，让 Vector/Scalar 路径更容易向量化，让 Cube 路径保持 aggressive fusion。</p>\n<p><strong>存储管理与卷积特化：把 schedule tree 变成 NPU 数据流</strong></p>\n<p>在 storage management 阶段，AKG 根据 tile 的访问关系自动把数据提升到目标 buffer：普通 vector/scalar 数据进入 UB，卷积/GEMM 的输入矩阵进入 L0A/L0B，输出累加进入 L0C，较大数据块进入 L1。卷积优化进一步分两步：先用 img2col 把卷积窗口展开成 GEMM 的矩阵乘形式，再把 GEMM 替换为 fractal GEMM schedule tree，使矩阵块对齐 Ascend Cube Unit 的 fractal 架构。论文中 img2col/fractal 的一个索引映射示意为：</p>\n<div class=\"kb-math kb-math-display\">\\begin{aligned}\ni_0 &amp;= i&#x27;_0,\\quad\ni_1 = \\left\\lfloor \\frac{i&#x27;_2}{KH \\cdot KW} \\right\\rfloor,\\quad\ni_4 = i&#x27;_4 \\\\\ni_2 &amp;= \\left\\lfloor \\frac{i&#x27;_1 f + i&#x27;_3}{W_o} \\right\\rfloor + s_h +\n\\left\\lfloor \\frac{i&#x27;_2}{KW} \\right\\rfloor \\bmod KH - pad_h \\\\\ni_3 &amp;= ((i&#x27;_1 f + i&#x27;_3) \\bmod W_o) \\cdot s_w + (i&#x27;_2 \\bmod KW) - pad_w\n\\end{aligned}</div>\n<p>直观上，<span class=\"kb-math kb-math-inline\">i_k</span> 是原 NCHW/5D feature map 的索引，<span class=\"kb-math kb-math-inline\">i&#x27;_k</span> 是 fractal GEMM 中矩阵块的索引。这个映射把“卷积窗口如何展开成矩阵块”显式写进多面体关系，codegen 就能自动插入对应的数据搬运和布局变换。</p>\n<p><strong>后端优化：多面体负责大结构，codegen 处理硬件细节</strong></p>\n<p>AKG 并不把所有问题都强塞进多面体模型。向量化、指令级同步、double buffering、SIMD intrinsic 对齐、低层 DAE pipeline 同步等细节放在 code generator 和 post-polyhedral transformation 中处理。同步优化尤其重要：NPU 的计算单元和数据搬运单元各有流水线，需要插入同步保持依赖；AKG 先按跨单元依赖插入同步，再用动态规划合并同步点，减少等待开销。Auto-tuner 则在 Auto Tiling 给出的合法空间中采样、训练模型、再朝高性能方向继续采样，弥补静态代价模型和真实硬件之间的差距。</p>\n<div class=\"key-point\">💡 关键：AKG 的本质是把 NPU 优化从“专家手写 schedule”变成“schedule tree 上的可组合变换”。多面体 IR 负责证明和组织合法变换，硬件 spec 与 mark/extension node 负责把这些变换落到真实片上数据流。</div>",
      "quiz": {
        "q": "AKG 中 reverse tiling 策略的主要作用是什么？",
        "options": [
          "先把所有循环完全展开，再交给 LLVM 自动向量化",
          "先 tile live-out iteration space，再通过访问关系反推出 producer 的复杂 tile shape",
          "跳过多面体调度，完全依赖 TVM 手写 schedule",
          "只优化标量控制流，不处理卷积和矩阵乘"
        ],
        "answer": 1,
        "explain": "AKG 通过 live-out tile 的读访问关系构造 producer tile，可以表达卷积中的重叠 tile，并在 tiling 后做更激进的融合与片上存储管理。"
      }
    },
    {
      "id": "iree",
      "num": 18,
      "name": "IREE",
      "fullName": "中间表示执行环境 (Intermediate Representation Execution Environment)",
      "year": "2021",
      "org": "Google",
      "parent": "mlir",
      "paperUrl": "https://arxiv.org/abs/2205.14479",
      "projectUrl": "",
      "category": "infrastructure",
      "motivation": "基于MLIR实现云端到嵌入式全场景ML部署",
      "summary": "IREE 基于 MLIR 构建端到端机器学习编译器和运行时，把模型当作普通程序逐步降低为主机 VM 控制逻辑与设备 dispatch workload，实现从服务器、移动端到 TinyIREE 裸机嵌入式目标的一套统一部署路径。",
      "keyPoints": [
        "<strong>MLIR-based compiler + runtime</strong>：IREE 不只是代码生成器，还包括可加载、调度和执行编译产物的运行时",
        "<strong>模型即程序</strong>：将 ML 模型导入 TOSA/MHLO 等方言，再逐步降低到 Linalg、Vector、LLVM 或设备相关后端",
        "<strong>结构化代码生成</strong>：利用 Linalg 的 iterator types 与 indexing maps 做 fusion、tiling、loop interchange 和 dispatch region 划分",
        "<strong>Host/device 分离</strong>：把程序拆成 VM commands 和 device dispatch regions，前者负责 buffer 与调度，后者负责设备原子执行单元",
        "<strong>VM FlatBuffer 与 EmitC</strong>：控制逻辑可序列化为 VM bytecode <code>.vmfb</code>，也可降到 EmitC/C 调用以去掉 bytecode interpreter",
        "<strong>HAL 抽象层</strong>：Hardware Abstraction Layer 统一 workload loader、scheduler、buffer allocation 与设备可见性控制",
        "<strong>TinyIREE 部署选项</strong>：支持 embedded-friendly dynamic library、static library、synchronous HAL driver，甚至在固定 workload 下绕过部分 runtime",
        "<strong>跨 ISA/ABI 生成</strong>：通过 LLVM target triple、CPU feature、ABI flag 生成 x86、Armv7E-M、RISC-V32 等目标代码",
        "<strong>低内存运行机制</strong>：stream execution、memory pool、瞬态 buffer 管理和权限控制降低常驻内存与运行时尺寸"
      ],
      "detail": "<p><img alt=\"IREE 官方架构图\" src=\"https://raw.githubusercontent.com/iree-org/iree/main/docs/website/docs/assets/images/iree_architecture.svg\" />\n<em>图：IREE 官方项目架构图，展示从前端框架导入、MLIR 编译管线、HAL/VM 运行时到多后端执行的整体结构。</em></p>\n<pre><code class=\"language-python\"># IREE 从模型到运行的核心流程伪代码\ndef iree_compile_and_run(model, target_config, inputs):\n    # Compile time\n    module = import_model_to_mlir(model, dialects=[&quot;TOSA&quot;, &quot;MHLO&quot;])\n    module = lower_to_linalg(module)\n    module = fuse_and_tile_linalg(module)\n    dispatches = outline_dispatch_regions(module)\n\n    for dispatch in dispatches:\n        dispatch = lower_to_vector(dispatch)\n        dispatch = lower_to_target_binary(dispatch, target_config)  # LLVM/SPIR-V/etc.\n\n    vm_commands = build_host_side_vm_commands(module, dispatches)\n    artifact = package_as_vmfb_or_emitc(vm_commands, dispatches, target_config)\n\n    # Runtime\n    runtime = create_iree_runtime(target_config.hal_driver)\n    buffers = runtime.allocate_buffers(inputs, permissions=[&quot;host-write&quot;, &quot;device-read&quot;])\n    command_buffer = runtime.vm.prepare_command_buffer(artifact, buffers)\n    runtime.hal.schedule(command_buffer, grid=target_config.workgroup_grid)\n    return runtime.collect_outputs(buffers)\n</code></pre>\n<p><strong>动机与背景：嵌入式 ML 不该是另一套完全独立的栈</strong></p>\n<p>很多 ML 部署系统要么偏运行时解释器，要么偏特定硬件 kernel 库。TensorFlow Lite Micro 这类 op-by-op runtime 能做到小运行时，但通常依赖有限的手写 operator kernel；Glow、TVM 等编译器能做图优化和算子优化，但嵌入式/裸机目标往往需要额外 extension 来补运行时调度、内存管理和 ABI 细节。IREE 的出发点是把 ML 模型当作一个可编译程序：同一套 MLIR progressive lowering 管线既能面向服务器/GPU，也能通过 TinyIREE 配置缩小到微控制器和裸机平台。</p>\n<p><strong>编译管线：TOSA/MHLO 到 Linalg、Vector、LLVM</strong></p>\n<p>IREE 论文将编译过程描述为一串 MLIR Dialect 降级。前端 Dialect 如 TOSA/MHLO 表达 tensor-level 操作，例如 add、convolution、dot product；Linalg Dialect 把操作表达为结构化完美嵌套循环和标量 loop body，便于 fusion 和 tiling；Vector Dialect 表示可重定向的高层向量操作；LLVM Dialect 则机械转换为 LLVM IR 以交给具体 ISA 后端。以 GEMM 为例，Linalg 用 indexing map 描述 iteration space 到 operand data space 的关系：</p>\n<div class=\"kb-math kb-math-display\">D_{ij} = C_{ij} + \\sum_k A_{ik}B_{kj}</div>\n<div class=\"kb-math kb-math-display\">\\#map_A:(i,j,k)\\rightarrow(i,k),\\quad\n\\#map_B:(i,j,k)\\rightarrow(k,j),\\quad\n\\#map_C:(i,j,k)\\rightarrow(i,j)</div>\n<p>这种表示让编译器只看 iterator types 和 indexing maps 就能做 producer-consumer fusion、tiling 和 dispatch 划分，而不必枚举高层 op 的所有组合。</p>\n<p><strong>Dispatch region：把计算拆成主机控制与设备原子工作单元</strong></p>\n<p>Linalg 级 tiling 后，每个 tile 可封装为 dispatch region。IREE 的一个核心分解是：</p>\n<div class=\"kb-math kb-math-display\">Program = VM_{\\text{host control}} \\oplus \\{\\text{DispatchRegion}_r^{\\text{device}}\\}_{r=1}^{n}</div>\n<p>主机侧 VM commands 管理 buffer setup、资源所有权、依赖和 dispatch 顺序；设备侧 dispatch region 包含需要在目标设备上原子执行的计算代码。对 GPU 后端，这可以进一步降为 SPIR-V kernel 和 API 调用；对 CPU/嵌入式后端，则经 Vector/LLVM 生成静态或动态库。这个拆分让 IREE 同时表达“调度逻辑”和“执行逻辑”，避免传统只生成 kernel 却把运行时编排留给外部系统的问题。</p>\n<p><strong>TinyIREE：同一编译流，替换部署形态</strong></p>\n<p>TinyIREE 是 IREE 面向嵌入式/裸机的小型化配置集合。VM 控制逻辑可以保留为 FlatBuffer 中的 bytecode，由 runtime interpreter 执行；也可以通过 VM Dialect 降到 EmitC，再生成 C/C++ 调用，链接时去掉 bytecode interpreter，进一步减小二进制。设备 workload 可以是 dynamic library，方便运行时按架构选择，也可以是 static library，便于裸机和 link-time optimization。论文中的结果显示，切到 static/embedded 模式并使用 EmitC 时，可显著减少 host library 和 workload 尺寸。</p>\n<p><strong>HAL、调度与内存：运行时是 IREE 的另一半</strong></p>\n<p>IREE runtime 通过 HAL driver 抽象不同设备。HAL 包含 workload loader、scheduler、buffer allocator 和设备可见性/权限控制。论文给出的 workload dispatch loop 使用 3D grid：</p>\n<pre><code class=\"language-c\">for (int z = 0; z &lt; worker.cnt.z; ++z)\n  for (int y = 0; y &lt; worker.cnt.y; ++y)\n    for (int x = 0; x &lt; worker.cnt.x; ++x) {\n      vec3_t work_id = {{x, y, z}};\n      dispatch_ptr(&amp;state, &amp;work_id);\n    }\n</code></pre>\n<p>有线程支持时，IREE 可用 asynchronous task scheduler 做 DAG 的乱序和流水执行；裸机或无 OS 目标则可使用 synchronous scheduler 顺序派发。Stream execution 进一步把依赖信息交给底层调度器，并从理解流式行为的 memory pool 中申请临时内存，使常驻内存主要由常量和少量状态组成。Buffer allocator 还能显式设置 host/device 可见性和读写权限，例如输入 buffer 由 host 写入、device 只读消费，这为受限设备和安全执行环境提供了统一接口。</p>\n<p><strong>与传统方案的区别</strong></p>\n<p>与 TFLM 相比，IREE 不是固定 operator subset 的轻量解释器，而是编译器优先的部署栈；模型中的预处理、后处理和线性代数计算只要能降到合适 Dialect，就能走同一套 fusion/tiling/codegen。与只做 kernel 生成的编译器相比，IREE 把 VM、HAL、FlatBuffer/EmitC、scheduler、buffer permission 都纳入系统边界。与一般 MLIR 编译管线相比，IREE 的独特性在于它把编译产物定义为可被运行时加载和调度的 deployment artifact，而不是只输出目标 IR 或目标代码。</p>\n<div class=\"key-point\">💡 关键：IREE 的价值在“编译器和运行时共同设计”。MLIR 负责跨抽象层优化，VM/HAL 负责跨设备部署与执行，两者合在一起才支撑从云端到裸机的同一套模型部署路径。</div>",
      "quiz": {
        "q": "IREE 中 dispatch region 的主要作用是什么？",
        "options": [
          "保存训练数据集的元信息",
          "把设备上原子执行的 tiled computation 从主机 VM 控制逻辑中划分出来",
          "替代所有 MLIR Dialect，使模型直接变成 Python 代码",
          "只用于压缩模型权重，与执行调度无关"
        ],
        "answer": 1,
        "explain": "IREE 将程序拆成主机 VM commands 和设备 dispatch regions；dispatch region 承载设备侧计算，VM commands 负责 buffer、依赖和调度。"
      }
    },
    {
      "id": "meta_schedule",
      "num": 19,
      "name": "MetaSchedule",
      "fullName": "概率化张量程序调度框架 (MetaSchedule)",
      "year": "2022",
      "org": "CMU/OctoML",
      "parent": "ansor",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2022/hash/e894eafae43e68b4c8dfdacf742bcbf3-Abstract-Conference.html",
      "projectUrl": "",
      "category": "tensor_ir",
      "motivation": "概率程序统一调度搜索空间，泛化模板与无模板调优",
      "summary": "MetaSchedule 提出一种用概率程序描述张量程序调度搜索空间的方法，将“如何构造搜索空间”和“如何在空间中搜索”解耦，解决 Ansor 等自动调度器搜索规则难以模块化扩展、硬件新知识难以注入的问题。",
      "keyPoints": [
        "<strong>概率化搜索空间</strong>：把候选张量程序表示为初始程序 <span class=\"kb-math kb-math-inline\">e_0</span> 加一串参数化变换 <span class=\"kb-math kb-math-inline\">\\tau</span>，变换参数由 <code>Sample-Tile</code>、<code>Sample-Compute-Location</code> 等随机原语产生",
        "<strong>随机变换模块</strong>：每个 transformation module 包含程序分析、采样和调度变换，可组合出多级 tiling、auto-inline、cross-thread reduction、tensor-core 等搜索空间片段",
        "<strong>执行追踪</strong>：MetaSchedule 嵌入 Python，但只记录采样和调度变换指令，形成可重放的 trace，避免反复执行宿主语言控制流",
        "<strong>学习驱动搜索</strong>：基于 trace 变异候选程序，用 validator 过滤非法变换，再用 learned cost model <span class=\"kb-math kb-math-inline\">\\hat f</span> 和退火 Metropolis-Hastings 接受/拒绝候选",
        "<strong>搜索空间与搜索算法解耦</strong>：同一概率程序搜索空间可接入演化搜索、贝叶斯优化或强化学习；同一搜索器也可服务不同 transformation modules",
        "<strong>兼容模板与无模板调优</strong>：可覆盖 AutoTVM 模板式调参、Ansor 自动调度规则和专家手写硬件特化规则",
        "<strong>硬件特化可扩展</strong>：论文展示 <code>Use-Tensor-Core</code> 模块可作为额外知识组合进已有空间，在 BERT-large workload 上相对 TVM/AutoTVM 带来 48% 端到端加速"
      ],
      "detail": "<p><img alt=\"MetaSchedule 学习驱动搜索流程\" src=\"https://ar5iv.labs.arxiv.org/html/2205.13603/assets/x7.png\" />\n<em>图：MetaSchedule 从 transformation modules 采样 trace，变异随机变量生成候选程序，用 validator、cost model 和硬件实测共同更新搜索。来源：论文 Figure 7。</em></p>\n<p><img alt=\"MetaSchedule 概率语言示意\" src=\"https://ar5iv.labs.arxiv.org/html/2205.13603/assets/x3.png\" />\n<em>图：概率程序同时包含随机变量采样和依赖随机变量的程序变换；一次采样对应搜索空间中的一个具体调度 trace。来源：论文 Figure 3。</em></p>\n<pre><code class=\"language-python\"># MetaSchedule 核心流程伪代码：概率搜索空间 + 学习驱动搜索\ndef multi_level_tiling(loop_nest):\n    tiles = [[] for _ in range(5)]\n\n    def tile_loop(loop, tile_ids):\n        theta = sample_tile(loop, parts=len(tile_ids))  # 随机变量\n        tiled = split(loop, theta)                      # 调度变换\n        for tile_id, tile in zip(tile_ids, tiled):\n            tiles[tile_id].append(tile)\n\n    for loop in loop_nest:\n        if is_spatial_loop(loop):\n            tile_loop(loop, [0, 1, 3])\n        elif is_reduction_loop(loop):\n            tile_loop(loop, [2, 4])\n    reorder(concat(tiles))\n\n\ndef meta_schedule_optimize(program_e0, modules, hardware):\n    traces = []\n    cost_model = TreeBoostingCostModel()\n    measured = []\n\n    # 1. 运行概率程序，追踪采样与调度变换\n    for _ in range(num_initial_samples):\n        trace = run_and_trace(program_e0, modules)\n        traces.append(trace)\n\n    # 2. 在 trace 条件空间中搜索\n    for round_id in range(num_rounds):\n        proposals = []\n        for trace in traces:\n            mutated = mutate_random_choices(trace)\n            if validator(mutated):\n                latency_hat = cost_model.predict(apply_trace(program_e0, mutated))\n                proposals.append((mutated, latency_hat))\n\n        accepted = annealed_metropolis_hastings(proposals, temperature(round_id))\n        real_latency = measure_on_hardware(program_e0, accepted, hardware)\n        measured.extend(zip(accepted, real_latency))\n        cost_model.update(measured)\n        traces = update_trace_pool(traces, accepted, real_latency)\n\n    return best_measured_program(measured)\n</code></pre>\n<p><strong>动机与背景：搜索空间才是自动调度的上限。</strong> AutoTVM 依赖模板显式枚举 tile、unroll、vectorize 等调度参数，Ansor 进一步用无模板规则生成更大的搜索空间，但这些规则通常写死在调度系统内部。问题不在于学习搜索不重要，而是搜索器只能在给定空间内找最优；当新硬件提供 tensor core、新算子需要特殊 fusion、新后端需要不同 memory hierarchy 策略时，开发者往往要“手术式”修改调度框架。MetaSchedule 的核心观点是：搜索空间本身应成为可编程对象，专家知识应以模块化概率变换的形式被组合，而不是散落在调度器内部。</p>\n<p><strong>搜索空间表示：从离散网格变成状态相关的概率程序。</strong> 对初始张量程序 <span class=\"kb-math kb-math-inline\">e_0</span>，MetaSchedule 不直接枚举一个静态参数网格，而是执行一段概率程序。程序在每个状态 <span class=\"kb-math kb-math-inline\">e_i</span> 上先做分析，再采样随机变量 <span class=\"kb-math kb-math-inline\">\\theta_i</span>，最后施加语义保持的调度变换 <span class=\"kb-math kb-math-inline\">t_i</span>，得到 <span class=\"kb-math kb-math-inline\">e_{i+1}</span>。因此候选程序可写作：</p>\n<div class=\"kb-math kb-math-display\">e_\\tau = g(e_0, \\tau), \\quad \\tau = (t_1(\\theta_1), t_2(\\theta_2), \\ldots, t_n(\\theta_n)).</div>\n<p>这里的关键不是“随机”本身，而是随机变量的分布可以依赖当前程序结构。例如 ReLU 的 compute-at 位置必须在 Dense tiling 后的合法循环层级中采样；后一个随机选择的取值域由前面所有变换共同决定。这比 AutoTVM 式正交参数网格更贴近张量调度：循环分裂、重排、融合、tensorization 之间有长期结构依赖。</p>\n<p><strong>Transformation module 是可复用的调度知识单元。</strong> 一个模块可以是原子变换，也可以是多个变换的组合。<code>Multi-Level-Tiling</code> 先分析空间轴和归约轴，再分别采样 tile 因子，最后把各层 tile 按硬件友好的顺序 <code>Reorder</code>；<code>Auto-Inline</code> 可处理 elementwise 内联；<code>Use-Tensor-Core</code> 可把特定矩阵乘模式映射到硬件 tensor intrinsic。模块组合时，系统在可应用位置上采样模块并施加变换，形成复杂搜索空间。这样做的直接收益是：新增硬件特化知识只需新增模块并组合，不必改写搜索器。</p>\n<p><strong>学习驱动搜索：把优化问题写成后验最大化。</strong> 论文将变换 trace <span class=\"kb-math kb-math-inline\">\\tau</span> 的搜索形式化为 MAP 估计。若 <span class=\"kb-math kb-math-inline\">f(e)</span> 是真实硬件延迟，越小越好，则候选 trace 的后验可写作：</p>\n<div class=\"kb-math kb-math-display\">P(\\tau \\mid e_0) \\propto \\exp\\left(-f(g(e_0,\\tau))\\right) P(\\tau),</div>\n<div class=\"kb-math kb-math-display\">\\tau^\\star = \\arg\\max_\\tau P(\\tau \\mid e_0).</div>\n<p>真实测量 <span class=\"kb-math kb-math-inline\">f(e)</span> 代价高，因此系统训练代理代价模型 <span class=\"kb-math kb-math-inline\">\\hat f(e)</span>。搜索时对 trace 中的随机变量做 mutation，非法程序由 validator 丢弃，合法候选通过退火 Metropolis-Hastings 机制接受或拒绝：</p>\n<div class=\"kb-math kb-math-display\">\\alpha(\\tau \\rightarrow \\tau&#x27;) =\n\\min\\left(1,\\exp\\left(-\\frac{\\hat f(g(e_0,\\tau&#x27;))-\\hat f(g(e_0,\\tau))}{T}\\right)\n\\frac{P(\\tau&#x27;)}{P(\\tau)}\\right).</div>\n<p>温度 <span class=\"kb-math kb-math-inline\">T</span> 高时更容易探索差一点的候选，温度降低后逐步偏向利用代价模型预测的低延迟候选。被选中的程序会在真实硬件上测量，结果再用于更新 <span class=\"kb-math kb-math-inline\">\\hat f</span>。这保留了 Ansor 一类学习搜索的优点，但搜索空间不再由固定 C++/Python 规则硬编码。</p>\n<p><strong>与 Ansor 的关系和差异。</strong> Ansor 的核心贡献是自动生成 schedule sketches 并用学习代价模型搜索，它已经摆脱 AutoTVM 模板的人工参数网格。MetaSchedule 则进一步抽象“sketch/rule 本身”：调度规则被写成概率 transformation modules，搜索器只消费 trace 与随机选择。换句话说，Ansor 偏向提供一套强内置规则，MetaSchedule 提供一个可扩展的规则语言与统一搜索框架；二者不是简单替代关系，MetaSchedule 可以覆盖 Ansor 式空间，同时允许领域专家持续增加新模块。</p>\n<div class=\"key-point\">💡 关键：MetaSchedule 的“概率程序”不是为了做贝叶斯建模而引入复杂统计框架，而是为了表达状态相关、可组合、可追踪、可学习搜索的调度空间。</div>",
      "quiz": {
        "q": "MetaSchedule 相比 Ansor 的核心抽象变化是什么？",
        "options": [
          "用固定模板替代自动调度规则",
          "只优化图级算子融合，不再优化张量程序",
          "把调度搜索空间构造写成可组合的概率程序，并与搜索算法解耦",
          "完全取消硬件实测，只依赖静态代价模型"
        ],
        "answer": 2,
        "explain": "MetaSchedule 的重点是用随机采样和调度变换组成 transformation modules，让搜索空间可编程、可追踪、可扩展；搜索器仍会结合代价模型和真实硬件测量。"
      }
    },
    {
      "id": "flash_attention",
      "num": 20,
      "name": "FlashAttention",
      "fullName": "IO感知精确注意力计算 (FlashAttention)",
      "year": "2022",
      "org": "Stanford",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2205.14135",
      "projectUrl": "",
      "category": "hardware_specific",
      "motivation": "IO感知分块计算精确注意力，突破显存带宽瓶颈",
      "summary": "FlashAttention 提出一种 IO-aware 的精确注意力算法，通过 SRAM/HBM 分层感知的分块计算、在线 softmax 和反向重计算，避免物化 \\(N \\times N\\) 注意力矩阵，从而把注意力的显存读写和峰值内存从二次瓶颈大幅压低。",
      "keyPoints": [
        "<strong>精确注意力而非近似注意力</strong>：输出等价于标准 <span class=\"kb-math kb-math-inline\">\\mathrm{softmax}(QK^\\top)V</span>，不通过稀疏、低秩或核方法牺牲模型质量",
        "<strong>IO-aware tiling</strong>：把 <span class=\"kb-math kb-math-inline\">Q,K,V</span> 切成块，循环把 <span class=\"kb-math kb-math-inline\">K,V</span> block 和 <span class=\"kb-math kb-math-inline\">Q</span> block 放入 GPU on-chip SRAM，在片上完成 score、softmax、乘 <span class=\"kb-math kb-math-inline\">V</span> 的融合计算",
        "<strong>不物化注意力矩阵</strong>：标准实现会把 <span class=\"kb-math kb-math-inline\">S=QK^\\top</span> 和 <span class=\"kb-math kb-math-inline\">P=\\mathrm{softmax}(S)</span> 写入 HBM；FlashAttention 只写最终 <span class=\"kb-math kb-math-inline\">O</span> 和少量归一化统计",
        "<strong>在线 softmax 归并</strong>：每行维护最大值 <span class=\"kb-math kb-math-inline\">m_i</span> 和归一化项 <span class=\"kb-math kb-math-inline\">\\ell_i</span>，使跨 block softmax 数值稳定且等价于一次性 softmax",
        "<strong>反向重计算</strong>：forward 存储 softmax normalizer，backward 在 SRAM 中重算局部 attention block，避免从 HBM 读取 <span class=\"kb-math kb-math-inline\">O(N^2)</span> 中间矩阵",
        "<strong>IO 复杂度改进</strong>：标准 attention 需要 <span class=\"kb-math kb-math-inline\">\\Theta(Nd+N^2)</span> HBM 访问；FlashAttention 在 SRAM 大小 <span class=\"kb-math kb-math-inline\">M</span> 下为 <span class=\"kb-math kb-math-inline\">\\Theta(N^2d^2/M)</span>，并且在一段 SRAM 范围内 IO 最优",
        "<strong>工程实现</strong>：CUDA kernel 融合 masking、softmax、dropout、matmul 等操作；论文还扩展到 block-sparse FlashAttention"
      ],
      "detail": "<p><img alt=\"FlashAttention IO-aware 分块示意\" src=\"https://ar5iv.labs.arxiv.org/html/2205.14135/assets/x1.png\" />\n<em>图：FlashAttention 分块遍历 <span class=\"kb-math kb-math-inline\">K,V</span> 和 <span class=\"kb-math kb-math-inline\">Q</span>，避免把 <span class=\"kb-math kb-math-inline\">N \\times N</span> attention matrix 写入 HBM；右侧展示相对 PyTorch attention 的速度提升。来源：论文 Figure 1。</em></p>\n<pre><code class=\"language-python\"># FlashAttention forward pass 伪代码，省略 batch/head 维度和可选 mask/dropout\ndef flash_attention(Q, K, V, sram_size_M):\n    N, d = Q.shape\n    Bc = ceil(sram_size_M / (4 * d))\n    Br = min(Bc, d)\n\n    O = zeros((N, d))       # HBM\n    l = zeros((N,))         # row-wise softmax denominator\n    m = full((N,), -inf)    # row-wise running max\n\n    Q_blocks = split_rows(Q, Br)\n    K_blocks = split_rows(K, Bc)\n    V_blocks = split_rows(V, Bc)\n\n    for j in range(len(K_blocks)):\n        Kj = load_to_sram(K_blocks[j])\n        Vj = load_to_sram(V_blocks[j])\n\n        for i in range(len(Q_blocks)):\n            Qi = load_to_sram(Q_blocks[i])\n            Oi, li, mi = load_to_sram(O[i], l[i], m[i])\n\n            Sij = Qi @ Kj.T                         # Br x Bc scores\n            mij_new = maximum(mi, rowmax(Sij))\n            Pij = exp(Sij - mij_new[:, None])\n\n            li_new = exp(mi - mij_new) * li + rowsum(Pij)\n            Oi_new = (\n                (exp(mi - mij_new) * li)[:, None] * Oi\n                + Pij @ Vj\n            ) / li_new[:, None]\n\n            write_to_hbm(O[i], Oi_new)\n            write_to_hbm(l[i], li_new)\n            write_to_hbm(m[i], mij_new)\n\n    return O, l, m\n</code></pre>\n<p><strong>动机与背景：Transformer 的瓶颈不只是 FLOPs。</strong> 标准 attention 的数学式通常写成：</p>\n<div class=\"kb-math kb-math-display\">O = \\mathrm{softmax}\\left(\\frac{QK^\\top}{\\sqrt d}\\right)V.</div>\n<p>若序列长度为 <span class=\"kb-math kb-math-inline\">N</span>，head dimension 为 <span class=\"kb-math kb-math-inline\">d</span>，score 矩阵 <span class=\"kb-math kb-math-inline\">S</span> 和概率矩阵 <span class=\"kb-math kb-math-inline\">P</span> 都是 <span class=\"kb-math kb-math-inline\">N \\times N</span>。传统实现会先计算 <span class=\"kb-math kb-math-inline\">S</span>，写入 HBM，再读取 <span class=\"kb-math kb-math-inline\">S</span> 做 softmax 得到 <span class=\"kb-math kb-math-inline\">P</span>，再写入 HBM，最后读 <span class=\"kb-math kb-math-inline\">P</span> 和 <span class=\"kb-math kb-math-inline\">V</span> 做矩阵乘。现代 GPU 的算力增长快于显存带宽增长，这类反复读写大矩阵会让 attention 变成 memory-bound。许多近似 attention 降低 FLOPs，却仍可能被非连续访存、额外 kernel launch 或不友好的内存访问拖慢；FlashAttention 的切入点是直接优化 IO。</p>\n<p><strong>在线 softmax 是精确性的核心。</strong> 分块计算的难点是 softmax 的归一化需要整行所有 key 的 score。FlashAttention 对每个 query 行维护两个统计量：当前已见 block 的最大值 <span class=\"kb-math kb-math-inline\">m</span> 和指数和 <span class=\"kb-math kb-math-inline\">\\ell</span>。当新 block 的 score 为 <span class=\"kb-math kb-math-inline\">S_{ij}</span> 时，更新为：</p>\n<div class=\"kb-math kb-math-display\">m_i^{new} = \\max(m_i, \\max_j S_{ij}),</div>\n<div class=\"kb-math kb-math-display\">\\ell_i^{new} =\ne^{m_i-m_i^{new}}\\ell_i + \\sum_j e^{S_{ij}-m_i^{new}},</div>\n<div class=\"kb-math kb-math-display\">O_i^{new} =\n\\frac{e^{m_i-m_i^{new}}\\ell_i O_i + e^{S_{ij}-m_i^{new}}V_j}\n{\\ell_i^{new}}.</div>\n<p>这个递推本质上把 softmax 的 log-sum-exp 稳定化技巧搬到 block 聚合里。旧 block 的输出贡献先乘 <span class=\"kb-math kb-math-inline\">e^{m_i-m_i^{new}}</span> 重新缩放，新 block 的贡献用新的最大值归一化。最终遍历完所有 <span class=\"kb-math kb-math-inline\">K,V</span> block 后，得到的 <span class=\"kb-math kb-math-inline\">O_i</span> 与一次性计算全行 softmax 完全一致。</p>\n<p><strong>IO 复杂度解释：为什么多做一点计算反而更快。</strong> 论文证明，在 SRAM 大小为 <span class=\"kb-math kb-math-inline\">M</span>、<span class=\"kb-math kb-math-inline\">d \\le M \\le Nd</span> 的条件下，标准 attention 的 HBM 访问量为：</p>\n<div class=\"kb-math kb-math-display\">\\Theta(Nd + N^2),</div>\n<p>而 FlashAttention 为：</p>\n<div class=\"kb-math kb-math-display\">\\Theta\\left(\\frac{N^2d^2}{M}\\right).</div>\n<p>直觉上，<span class=\"kb-math kb-math-inline\">M</span> 越大，每次放入 SRAM 的 <span class=\"kb-math kb-math-inline\">K,V,Q</span> block 越大，同一块 <span class=\"kb-math kb-math-inline\">K,V</span> 被更多 <span class=\"kb-math kb-math-inline\">Q</span> 行复用，越少需要反复访问 HBM。FlashAttention 的 FLOPs 仍是 <span class=\"kb-math kb-math-inline\">O(N^2d)</span>，backward 还会因为重计算增加部分计算量；但这些额外计算发生在高吞吐的 GPU core 上，换来的是大量减少 HBM 读写，因此墙钟时间反而下降。</p>\n<p><strong>反向传播：存 normalizer，不存 attention matrix。</strong> 训练时标准实现通常要保留 <span class=\"kb-math kb-math-inline\">P</span> 供 backward 使用，内存为 <span class=\"kb-math kb-math-inline\">O(N^2)</span>。FlashAttention forward 只保存 <span class=\"kb-math kb-math-inline\">O</span> 以及每行的 softmax 统计量（常实现为 log-sum-exp）。Backward 时重新加载对应 <span class=\"kb-math kb-math-inline\">Q,K,V</span> block，在 SRAM 中重算 <span class=\"kb-math kb-math-inline\">S</span> 和局部 <span class=\"kb-math kb-math-inline\">P</span>，再计算 <span class=\"kb-math kb-math-inline\">dQ,dK,dV</span>。这是一种面向 GPU 层次内存的 checkpointing：用可控的重计算换掉不可承受的 <span class=\"kb-math kb-math-inline\">N^2</span> HBM 存储。</p>\n<p><strong>与传统 kernel 组合方式的差异。</strong> PyTorch/JAX 中的朴素实现通常由多个 kernel 组成：matmul、mask、softmax、dropout、matmul，每步之间通过 HBM 交接。FlashAttention 把这些步骤融合到一个 CUDA kernel 内，并显式控制 shared memory/register 的数据流。算法创新和工程实现是绑在一起的：如果只在高层框架中写等价数学式，很难阻止中间矩阵被物化，也很难保证 block 在 SRAM 中被复用。</p>\n<div class=\"warn-box\">⚠️ 注意：FlashAttention 没有降低 attention 的渐近计算复杂度 <span class=\"kb-math kb-math-inline\">O(N^2d)</span>，它降低的是显存 IO 和激活内存。对长序列和显存带宽受限场景，这比单纯减少 FLOPs 更直接影响真实速度。</div>",
      "quiz": {
        "q": "FlashAttention 能避免物化 N×N 注意力矩阵的关键机制是什么？",
        "options": [
          "把 softmax 换成线性注意力近似",
          "对每个 query 行维护 running max 和 normalization factor，按 block 精确归并 softmax",
          "只计算局部窗口内的 key-value 对",
          "把所有中间矩阵压缩成低秩分解"
        ],
        "answer": 1,
        "explain": "FlashAttention 通过在线 softmax 统计量 m 和 l 在多个 block 间精确合并归一化结果，因此不需要把完整 score 或概率矩阵写入 HBM。"
      }
    },
    {
      "id": "alpa",
      "num": 21,
      "name": "Alpa",
      "fullName": "自动层间层内并行分布式编译器 (Alpa)",
      "year": "2022",
      "org": "UC Berkeley",
      "parent": "xla",
      "paperUrl": "https://www.usenix.org/conference/osdi22/presentation/zheng-lianmin",
      "projectUrl": "",
      "category": "graph_compilers",
      "motivation": "两级分层优化统一层间与层内并行，自动搜索最优分布式策略",
      "summary": "Alpa 提出一种两级分层的分布式深度学习编译器，把模型并行计划拆成 inter-operator pipeline/stage 切分和 intra-operator SPMD sharding 两个子问题，用 DP + ILP 自动生成跨设备执行计划，解决大模型并行策略长期依赖人工设计的问题。",
      "keyPoints": [
        "<strong>重新分类并行方式</strong>：把数据并行、算子并行、ZeRO、Megatron 张量并行等归入 intra-operator parallelism，把 pipeline/device placement 归入 inter-operator parallelism",
        "<strong>两级层次化计划空间</strong>：inter-op 决定图如何切 stage、集群如何切 device mesh、stage 如何映射到 mesh；intra-op 决定每个 stage 内各算子的张量分片方式",
        "<strong>Intra-op ILP</strong>：在单个 device mesh 内采用 SPMD/GSPMD 风格，为每个 HLO 算子选择 sharding strategy，用整数线性规划最小化计算、通信和 resharding 代价",
        "<strong>Inter-op DP</strong>：枚举 stage-mesh pair，调用 intra-op pass 得到每个 pair 的执行代价，再用动态规划最小化 pipeline latency",
        "<strong>Device mesh 设计</strong>：优先把 intra-op 放在高带宽 mesh 内，跨 mesh 用 inter-op pipeline 和较小的点对点 activation 通信连接",
        "<strong>Runtime orchestration</strong>：每个 stage 编译为 XLA/GSPMD parallel executable，运行时插入跨 mesh send/recv、resharding 和 1F1B pipeline 调度",
        "<strong>泛化到异构模型</strong>：在 GPT、MoE、Wide-ResNet 等模型上匹配或超过 Megatron-LM、DeepSpeed 等手工方案；对 MoE 在多节点上显著优于缺少 inter-op 的专用系统"
      ],
      "detail": "<p><img alt=\"Alpa 两级并行计划空间\" src=\"https://ar5iv.labs.arxiv.org/html/2201.12023/assets/x1.png\" />\n<em>图：Alpa 将单一 intra-op 或 inter-op 计划扩展为层次化计划空间，同时组合算子内分片和算子间 pipeline stage。来源：论文 Figure 1。</em></p>\n<p><img alt=\"Alpa 编译与运行时架构\" src=\"https://ar5iv.labs.arxiv.org/html/2201.12023/assets/x3.png\" />\n<em>图：inter-op pass、intra-op pass 和 runtime orchestration pass 共同生成 sharded stages 与跨 mesh 执行计划。来源：论文 Figure 3。</em></p>\n<pre><code class=\"language-python\"># Alpa 编译流程伪代码：inter-op DP 调 intra-op ILP\ndef alpa_compile(model_graph, cluster, micro_batches):\n    ops = flatten_graph(model_graph)\n    layers = operator_clustering(ops)  # 把细粒度 HLO 聚成 DP 可处理的层\n    submeshes = enumerate_submesh_shapes(cluster)\n\n    # 1. 为所有 stage-mesh pair 查询 intra-op 最优代价\n    stage_cost = {}\n    stage_plan = {}\n    for start in range(len(layers)):\n        for end in range(start + 1, len(layers) + 1):\n            stage = layers[start:end]\n            for mesh in submeshes:\n                plan, cost, memory = intra_op_ilp(stage, mesh)\n                if memory &lt;= mesh.device_memory:\n                    stage_cost[(start, end, mesh)] = cost\n                    stage_plan[(start, end, mesh)] = plan\n\n    # 2. inter-op 动态规划：切分 layers，并把连续 stage 分配到 mesh\n    dp = initialize_dp()\n    for prefix_len in range(1, len(layers) + 1):\n        for used_meshes in mesh_prefixes(cluster):\n            for cut in range(prefix_len):\n                for mesh in available_last_meshes(used_meshes):\n                    stage_time = stage_cost.get((cut, prefix_len, mesh), inf)\n                    candidate = pipeline_latency(\n                        previous=dp[cut, used_meshes - mesh],\n                        stage_time=stage_time,\n                        micro_batches=micro_batches,\n                    )\n                    dp[prefix_len, used_meshes] = min(dp[prefix_len, used_meshes], candidate)\n\n    # 3. 回溯得到 stage 切分、mesh 映射和每个 stage 的 sharding plan\n    hierarchical_plan = backtrack(dp, stage_plan)\n    return compile_with_xla_gspmd_and_runtime(hierarchical_plan)\n</code></pre>\n<p><strong>动机与背景：单一并行范式无法覆盖大模型训练。</strong> 数据并行简单但复制参数，模型过大时显存不足；Megatron-LM 这类张量并行擅长 Transformer 中的 matmul，但需要专家为特定架构设计切分规则；pipeline parallelism 降低跨节点通信量，却会产生 pipeline bubble 和 stage 负载不均。Alpa 的观察是：这些不是互斥方案，而是发生在不同粒度的两类并行。intra-op 切分算子内部张量轴，通信频繁但能充分利用高带宽设备；inter-op 切分计算图 stage，通信通常只是 stage 边界 activation，更适合跨低带宽节点。</p>\n<p><strong>层次化计划空间：先把难问题拆成两个可解子问题。</strong> 一个完整执行计划可以表示为：</p>\n<div class=\"kb-math kb-math-display\">\\Pi = \\{(G_1, M_1, S_1), (G_2, M_2, S_2), \\ldots, (G_p, M_p, S_p)\\},</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">G_i</span> 是第 <span class=\"kb-math kb-math-inline\">i</span> 个 stage 的子图，<span class=\"kb-math kb-math-inline\">M_i</span> 是分配给该 stage 的 device mesh，<span class=\"kb-math kb-math-inline\">S_i</span> 是该 mesh 内的 intra-op sharding strategy。Alpa 不直接在所有可能的 <span class=\"kb-math kb-math-inline\">\\Pi</span> 上联合搜索，因为组合空间巨大；它让 intra-op pass 负责“给定 stage 和 mesh，找最佳 sharding 及代价”，让 inter-op pass 负责“选择哪些 stage 放到哪些 mesh 上”。这种分解不是理论全局最优保证，但把搜索从不可控的联合空间降到两个结构化优化问题。</p>\n<p><strong>Intra-op：用 ILP 选择 SPMD sharding。</strong> 对一个 stage 内的计算图 <span class=\"kb-math kb-math-inline\">G=(V,E)</span>，每个节点 <span class=\"kb-math kb-math-inline\">v</span> 有若干候选并行算法或 sharding strategy，记 one-hot 决策向量为：</p>\n<div class=\"kb-math kb-math-display\">s_v \\in \\{0,1\\}^{k_v}, \\quad \\mathbf{1}^\\top s_v = 1.</div>\n<p>每个策略有 compute cost <span class=\"kb-math kb-math-inline\">d_v</span> 和 communication cost <span class=\"kb-math kb-math-inline\">c_v</span>。若边 <span class=\"kb-math kb-math-inline\">(u,v)</span> 两端策略产生不同 tensor layout，还会引入 resharding cost <span class=\"kb-math kb-math-inline\">r_{uvij}</span>。一个简化的 ILP 目标可写作：</p>\n<div class=\"kb-math kb-math-display\">\\min \\sum_{v\\in V}(c_v+d_v)^\\top s_v\n+ \\sum_{(u,v)\\in E}\\sum_{i,j} r_{uvij} z_{uvij},</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">z_{uvij}</span> 表示“<span class=\"kb-math kb-math-inline\">u</span> 选策略 <span class=\"kb-math kb-math-inline\">i</span> 且 <span class=\"kb-math kb-math-inline\">v</span> 选策略 <span class=\"kb-math kb-math-inline\">j</span>”的线性化辅助变量。这样，数据并行、ZeRO 参数/梯度分片、Megatron 张量并行都变成同一个 strategy selection 问题。Alpa 借助 XLA/GSPMD 的 sharding propagation 和 collective insertion，把 ILP 结果落成可执行 SPMD 程序。</p>\n<p><strong>Inter-op：DP 选择 stage 切分和 mesh 分配。</strong> Inter-op pass 先把 HLO graph flatten 并聚类为较粗的 layer 序列，再枚举连续 layer 区间作为候选 stage，枚举 cluster 的 submesh shape 作为候选 mesh。每个 stage-mesh pair 的代价由 intra-op ILP 返回。若 stage 时间为 <span class=\"kb-math kb-math-inline\">t_i</span>，使用同步 1F1B pipeline 且有 <span class=\"kb-math kb-math-inline\">B</span> 个 micro-batches，一个常用 latency 近似是：</p>\n<div class=\"kb-math kb-math-display\">T_{\\text{pipeline}} \\approx \\sum_{i=1}^{p} t_i + (B-1)\\max_i t_i.</div>\n<p>第一项是 pipeline 填充和排空，第二项由最慢 stage 决定稳态吞吐。DP 的目标就是在显存约束下选择切分点和 mesh，使这个 pipeline latency 尽量低。论文还用 operator clustering 限制候选数量，使最优 layer clustering 可在 <span class=\"kb-math kb-math-inline\">O(K^2L)</span> 时间内求得，其中 <span class=\"kb-math kb-math-inline\">K</span> 是算子数、<span class=\"kb-math kb-math-inline\">L</span> 是聚类层数超参数。</p>\n<p><strong>跨 mesh orchestration：让两级计划真正运行起来。</strong> Intra-op 编译会在 mesh 内插入 all-reduce、all-gather、reduce-scatter 等 collective；inter-op 还需要处理 stage 之间张量 layout 不一致时的 cross-mesh resharding。Alpa 的 runtime orchestration pass 生成静态 send/recv 与必要的局部 all-gather，使相邻 stage 可以在不同 mesh shape 上交接 activation。这里的设计体现了 Alpa 的工程判断：跨 stage 通信通常小于 intra-op collective，过度精确建模会让 DP 状态指数膨胀，所以系统主要把高带宽/低带宽拓扑通过 mesh 切分和 stage 映射表达出来。</p>\n<p><strong>与 XLA/GSPMD 和手工系统的关系。</strong> Alpa 不是从零实现所有底层并行 primitive，而是站在 XLA/GSPMD 之上自动选择 sharding，并补上跨 stage 的 pipeline 编排。相比 Megatron-LM 或 DeepSpeed 的专家规则，Alpa 的优势是搜索空间覆盖更通用：Transformer、MoE、Wide-ResNet 这类结构差异很大的模型都能走同一编译流程。论文结果显示，Alpa 在 GPT 上可匹配手工 Megatron-LM，在 MoE 上因能自动引入 inter-op pipeline 跨节点扩展，相比 DeepSpeed 在 2 节点和 4 节点设置分别达到 3.5× 和 9.7× 加速。</p>\n<div class=\"key-point\">💡 关键：Alpa 的核心不是发明一种新的通信 primitive，而是把“stage 怎么切”和“stage 内怎么 shard”分层建模，让 XLA/GSPMD 能在自动搜索出的层次化计划中发挥作用。</div>",
      "quiz": {
        "q": "Alpa 为什么把并行搜索拆成 inter-op DP 和 intra-op ILP 两级？",
        "options": [
          "因为 ILP 只能处理 pipeline stage，不能处理张量分片",
          "因为所有模型都只需要 pipeline parallelism",
          "因为联合搜索空间过大，两级分解能分别优化 stage/mesh 映射和 mesh 内 sharding",
          "因为 XLA 不支持任何 collective communication"
        ],
        "answer": 2,
        "explain": "Alpa 将跨 stage 的切分与映射交给 inter-op DP，将单个 stage 在 device mesh 内的 sharding 交给 intra-op ILP，从而把原本巨大的联合计划空间拆成两个结构化子问题。"
      }
    },
    {
      "id": "torch_dynamo",
      "num": 22,
      "name": "TorchDynamo",
      "fullName": "PyTorch动态字节码编译器 (TorchDynamo + TorchInductor)",
      "year": "2022",
      "org": "Meta",
      "parent": "—",
      "paperUrl": "https://dl.acm.org/doi/abs/10.1145/3620665.3640366",
      "projectUrl": "",
      "category": "infrastructure",
      "motivation": "Python字节码变换实现零侵入动态图编译加速",
      "summary": "TorchDynamo 通过 CPython frame evaluation hook 在 Python 字节码执行前做 JIT 级别的字节码改写，把可编译的 PyTorch 操作片段捕获为 FX Graph，同时用 guards 和 graph break 保留完整 Python 语义；TorchInductor 则把这些图降到 loop-level IR，并生成 Triton/C++ 内核，实现 PyTorch 2 `torch.compile` 的零侵入动态图编译加速。",
      "keyPoints": [
        "<strong>PEP 523 frame hook</strong>：拦截 CPython 函数调用帧，在执行原始 bytecode 前分析、改写并缓存新 bytecode",
        "<strong>Python bytecode-to-bytecode translator</strong>：不是替换 Python 语言，而是在原函数中嵌入对已编译 FX Graph 的调用",
        "<strong>FX Graph 捕获</strong>：用符号解释器逐条模拟 Python bytecode，把 PyTorch Tensor 操作记录为 <code>torch.fx.GraphModule</code>",
        "<strong>Guard 复用机制</strong>：对 tensor metadata、Python 类型、常量、module 属性、全局 PyTorch 状态等动态假设生成 guard，guard 通过才复用缓存代码",
        "<strong>Graph break + continuation</strong>：遇到不可捕获 Python 行为、外部库或数据依赖控制流时切分图，并生成 <code>resume_at_X</code> 继续执行",
        "<strong>Side effect tracking</strong>：延迟并重放全局变量、属性、list/dict、closure cell 等副作用，避免 trace 语义丢失",
        "<strong>AOTAutograd</strong>：用 fake tensor 记录 forward/backward joint graph，通过 min-cut 分割前向与反向图，并做 functionalization/decomposition",
        "<strong>TorchInductor 默认后端</strong>：把 FX Graph 降为 define-by-run loop-level IR，再为 GPU 生成 Triton，为 CPU 生成 C++/OpenMP",
        "<strong>动态 shape 支持</strong>：使用 SymPy 符号尺寸、meta functions 和 shape guards，默认支持动态维度但不支持动态 rank",
        "<strong>混合执行模型</strong>：可编译片段走 compiler backend，不可编译片段回落到 CPython/PyTorch eager，兼顾覆盖率与性能"
      ],
      "detail": "<p><img alt=\"TorchDynamo 修改 CPython 解释器捕获 FX Graph 的流程\" src=\"https://canada1.discourse-cdn.com/flex036/uploads/pytorch1/original/1X/473093b09f6856e7f8fa957100ef12436c7a7526.jpeg\" />\n<em>图：TorchDynamo 开发文档中的总体流程。Dynamo 通过 CPython frame evaluation API 接管函数帧，分析 bytecode，生成 guards、FX graph 和新的 bytecode，再交给后端编译。</em></p>\n<pre><code class=\"language-python\"># TorchDynamo + TorchInductor 的核心流程伪代码\ndef eval_frame_with_torchdynamo(frame, backend=&quot;inductor&quot;):\n    code = frame.code\n\n    if should_skip_frame(frame):\n        return cpython_eval(frame)\n\n    for cached in code_cache[code]:\n        if cached.guard_fn(frame.locals, frame.globals, torch_state()):\n            return cpython_eval(cached.rewritten_bytecode, frame)\n\n    state = SymbolicState(\n        stack=[],\n        locals=wrap_inputs_as_variable_trackers(frame.locals),\n        fx_graph=FXGraph(),\n        guards=[],\n        side_effects=[],\n    )\n\n    while state.pc &lt; len(code.bytecode):\n        instr = code.bytecode[state.pc]\n        ok = symbolic_execute_one_bytecode(instr, state)\n        if not ok:\n            partial_graph = state.fx_graph.finish()\n            compiled_call = backend(partial_graph, state.example_inputs)\n            resume_fn = emit_resume_at(state.pc, state.live_values, code.bytecode)\n            new_code = emit_bytecode_calling(compiled_call, resume_fn, state.side_effects)\n            return cache_and_run(code, new_code, state.guards, frame)\n\n    fx_graph = state.fx_graph.finish()\n    fw_bw_graph = aot_autograd_capture_if_training(fx_graph)\n    inductor_ir = lower_fx_to_loop_ir(fw_bw_graph)\n    compiled_call = torchinductor_codegen(inductor_ir, targets=[&quot;triton&quot;, &quot;cpp&quot;])\n\n    new_code = emit_bytecode_calling(compiled_call, None, state.side_effects)\n    return cache_and_run(code, new_code, state.guards, frame)\n</code></pre>\n<p><strong>动机：为什么 PyTorch 需要字节码级图捕获</strong></p>\n<p>PyTorch 的核心吸引力来自 eager mode：模型就是普通 Python 程序，可以用 <code>print</code>、<code>pdb</code>、list/dict、closure、异常、第三方库和自定义类。问题是 eager mode 每次只看到单个 operator，编译器无法跨 operator 做 fusion、memory planning、kernel scheduling。早期 <code>torch.jit.trace</code> 在 dispatcher 层记录操作，遇到 Python 控制流会把示例输入走过的路径“烙死”进图里；<code>torch.jit.script</code> 尝试静态解析 Python AST，但需要重实现 Python 子集，覆盖率不够；lazy tensor 每轮积累图再编译，运行时维护图结构和延迟 kernel launch 都有额外开销。TorchDynamo 的设计判断是：不要要求用户放弃 Python，而是让编译器在 CPython 执行边界上工作，把“可图化的片段”从原 bytecode 中抽出来。</p>\n<p><strong>Frame hook、guard 与缓存：Dynamo 的正确性边界</strong></p>\n<p>TorchDynamo 利用 PEP 523 暴露的 <code>eval_frame</code> 扩展点接管 CPython 函数帧。第一次运行某个 <code>PyCodeObject</code> 时，Dynamo 逐条符号解释 bytecode；后续运行时先执行 guard 函数，如果 guard 为真就复用缓存的改写 bytecode 和后端编译产物。guard 可以写成如下逻辑：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{Reusable}(C, E)=\\bigwedge_{g_i\\in G_C} g_i(E)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">C</span> 是一次编译产物，<span class=\"kb-math kb-math-inline\">E</span> 是当前 locals/globals/tensor metadata/全局 PyTorch 状态组成的运行环境。只要任何一个假设失效，比如输入 tensor stride 变化、module 属性变化、某个 list 长度变化，Dynamo 就不能复用旧图，必须重新分析或回落。这个机制把动态图编译的“乐观特化”显式化：编译器可以对当前观察到的 Python 状态做强优化，但必须把每个特化条件变成可检查的 guard。</p>\n<p><strong>符号 bytecode 解释器：VariableTracker、fake tensor 与 FX Graph</strong></p>\n<p>Dynamo 的核心不是 AST parser，而是一个 Python bytecode 符号解释器。运行时栈、本地变量、异常上下文、闭包和副作用都被建模到 <code>SymbolicState</code> 中；每个值由 <code>VariableTracker</code> 子类表示，例如 <code>TensorVariable</code> 持有指向 FX Graph 节点的 proxy 和 fake tensor metadata，<code>ListVariable</code>/<code>ConstDictVariable</code> 表示 Python 容器，<code>UserFunctionVariable</code> 支持内联用户函数。当解释器遇到 <code>BINARY_ADD</code> 一类指令时，如果两个输入是 tensor，就在 FX Graph 中插入 <code>aten.add</code> 节点；如果只是 Python 常量，就在符号状态中折叠；如果遇到无法安全建模的外部行为，就触发 graph break。</p>\n<p><strong>Graph break：不是失败，而是混合执行协议</strong></p>\n<p>传统图捕获系统常是 all-or-nothing，某个 Python 特性不支持就整段模型失败。TorchDynamo 选择把程序切成：</p>\n<div class=\"kb-math kb-math-display\">P = P_{\\text{python},0};\\ C_{\\text{graph},1};\\ P_{\\text{python},1};\\ C_{\\text{graph},2};\\cdots</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">C_{\\text{graph}}</span> 是已编译 FX Graph，<span class=\"kb-math kb-math-inline\">P_{\\text{python}}</span> 是原始或 continuation bytecode。遇到 graph break 时，Dynamo 会先编译当前已捕获的 partial graph，再生成 <code>resume_at_X(...livevars...)</code> 函数恢复栈、局部变量和异常状态，从原函数 bytecode 的中间位置继续执行。由于 continuation 本身也是普通 Python 函数，它再次进入 frame hook 后还能继续被 Dynamo 捕获。这是 TorchDynamo 覆盖真实模型的关键：它允许编译器吃掉大块 tensor 程序，同时把稀疏的 Python 动态行为留给 CPython。</p>\n<p><strong>副作用处理：捕获 tensor 图但不丢 Python 语义</strong></p>\n<p>Python 程序并不总是纯函数。模型代码可能修改全局变量、对象属性、list/dict、closure cell，甚至构造对象。Dynamo 在符号解释期间把这些 mutation 放进 side-effect log，而不是立刻执行；如果后续 bytecode 读取了一个待修改值，就从 pending side effect 中取值。生成输出 bytecode 时，Dynamo 会在 compiled graph 调用之后重放仍可被外部观察到的副作用，并丢弃不会逃逸的临时 mutation。直觉上，Dynamo 维护的是“tensor 计算进图，Python 可观察效果回到 Python bytecode”的分层语义。</p>\n<p><strong>AOTAutograd 与 Inductor：从 FX Graph 到真实 kernel</strong></p>\n<p>训练场景还需要处理 autograd。AOTAutograd 在 fake tensor 上运行 eager autograd，记录 forward/backward 的 joint graph，再用 min-cut 思路把 joint graph 分成前向和反向，同时决定哪些 activation 保存、哪些在 backward 中重算。可以把内存优化目标理解为：</p>\n<div class=\"kb-math kb-math-display\">\\min_{S\\subseteq V}\\ \\mathrm{SaveBytes}(S)+\\lambda\\cdot\\mathrm{RecomputeCost}(V\\setminus S)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">S</span> 是前向阶段保存给反向使用的中间值集合。随后，decomposition 把复杂 PyTorch operator 改写成更小、更规则的 primitive operator，functionalization 把 mutation 改写为纯函数式形式，为后端降低语义复杂度。</p>\n<p>TorchInductor 接手后，不直接把 FX Graph 映射到某个固定图 IR，而是降为 define-by-run 的 loop-level IR：一个 buffer 的计算体可以是 Python closure，输入是 SymPy 索引变量，内部调用 <code>ops.load</code>、<code>ops.mul</code>、<code>ops.reduction</code> 等虚拟 primitive。分析时把 <code>ops.*</code> 绑定到访存分析器；代码生成时绑定到 Triton/C++ printer；重写时还可用 FX tracing 重新获得闭包图。这个设计让 Inductor 能用 Python 表达复杂 lowering，同时保留符号尺寸和 stride 信息。</p>\n<p><strong>调度与代码生成：为什么默认后端选择 Triton/C++</strong></p>\n<p>Inductor scheduler 先把每个 buffer 变成调度节点，再根据 read/write set 和符号地址建立依赖。两个节点能否 fusion 由 <code>can_fuse</code> 判断，排序由 <code>score_fusion</code> 控制，典型评分会考虑 fusion 类型、节省的 memory traffic 和原图距离：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{score}(u,v)=w_1\\cdot\\mathrm{FusionKind}+w_2\\cdot\\mathrm{BytesSaved}(u,v)-w_3\\cdot\\mathrm{GraphDistance}(u,v)</div>\n<p>GPU 后端生成 Triton kernel，适合 pointwise、reduction、matmul/convolution template；CPU 后端生成 C++/OpenMP，并可使用 vectorized 或 non-vectorized 变体。Inductor 还生成 wrapper code 负责 tensor size 计算、内存分配、kernel 调用；在 <code>reduce-overhead</code> 模式下，满足条件时可用 CUDA Graphs 降低 launch overhead。</p>\n<p><strong>动态 shape：特化路径但避免每个 shape 都重编译</strong></p>\n<p>PyTorch 2 的动态 shape 支持仍然是“固定 rank + 符号维度”的路线。每个动态尺寸用 SymPy 符号表示，第一次编译时保留一个 concrete size hint；当代码对 shape 做条件判断时，Dynamo 用 hint 选择分支，并添加 shape guard。operator 的 meta function 负责不做真实计算也能推导输出 metadata，例如 <code>cat</code> 的输出长度可表达为 <span class=\"kb-math kb-math-inline\">s_x+s_y</span>。这样，编译器可以把中间 shape 条件化简为输入符号表达式：</p>\n<div class=\"kb-math kb-math-display\">z=\\mathrm{cat}(x,y),\\quad z.\\mathrm{size}(0)=x.\\mathrm{size}(0)+y.\\mathrm{size}(0)</div>\n<p>如果尺寸来自 <code>nonzero()</code> 或 <code>.item()</code> 这类数据依赖结果，就会产生没有 hint 的 unbacked symbolic integer；当程序对它做 Python 控制流时，Dynamo 不能提前判断分支，只能 graph break。这也是 TorchDynamo 的边界：它优先保持 Python 正确性，而不是强行把所有动态行为塞进图里。</p>\n<div class=\"key-point\">💡 关键：TorchDynamo 的贡献不是“把 PyTorch 变成静态图框架”，而是在 CPython bytecode 层建立一套可回退、可缓存、可验证的 partial graph capture 协议；TorchInductor 的贡献是把这些 partial graph 变成可融合、可调度、可生成 Triton/C++ 的高性能 kernel。</div>",
      "quiz": {
        "q": "TorchDynamo 中 guard 的核心作用是什么？",
        "options": [
          "把所有 Python 控制流静态展开成一个完整计算图",
          "检查本次运行是否仍满足上次编译依赖的动态假设，从而决定能否复用缓存编译产物",
          "替代 TorchInductor 的 Triton 代码生成",
          "在 GPU 上同步所有 kernel launch"
        ],
        "answer": 1,
        "explain": "TorchDynamo 会根据 tensor metadata、Python 对象状态和全局状态生成 guard；guard 通过才说明旧的 FX Graph 和改写 bytecode 对当前输入仍然正确。"
      }
    },
    {
      "id": "bladedisc",
      "num": 23,
      "name": "BladeDISC",
      "fullName": "动态形状机器学习编译优化器 (BladeDISC)",
      "year": "2023",
      "org": "Alibaba",
      "parent": "mlir",
      "paperUrl": "https://dl.acm.org/doi/abs/10.1145/3617327",
      "projectUrl": "",
      "category": "hardware_specific",
      "motivation": "符号形状传播实现动态形状下算子融合，消除频繁重编译",
      "summary": "BladeDISC 提出面向动态 shape 工作负载的 MLIR 编译优化管线，用全局符号 shape 约束替代具体 shape 值来做算子融合与图优化，并通过 shape-insensitive codegen、多版本 kernel 与运行时 speculation 生成能适配任意输入形状的高性能代码。",
      "keyPoints": [
        "<strong>动态 shape 一次编译</strong>：目标是同一编译产物服务多种 batch size、sequence length、image size，避免静态 shape 编译器频繁重编译",
        "<strong>全局符号 shape 分析</strong>：从 op 语义中抽取 dim equality、dim collapse equality、divisibility、range 等约束",
        "<strong>跨层 shape 表示</strong>：把全局 dim symbol 绑定到 MLIR tensor type，并维护 dim collapse/property 容器，避免 pass pipeline 中 shape 信息丢失",
        "<strong>动态 broadcast elimination</strong>：在不知道具体 shape 值的情况下，利用符号相等关系消除不必要的 implicit broadcast",
        "<strong>融合决策流水线</strong>：先做 element-wise fusion，再做 compute-intensive fusion，最后用 stitch fusion 合并 memory-intensive 子图",
        "<strong>symbolic dim propagation</strong>：动态 stitch fusion 不依赖具体大小，而是传播 group-dim/tile-dim 符号关系检查 locality",
        "<strong>GEMM merging</strong>：支持共享 operand 的 GEMM 拼接，以及形状相同 GEMM 的 batched GEMM 合并",
        "<strong>shape-insensitive codegen</strong>：通过 reduce 间指令交错和 loop iteration interleaving 提高 ILP，降低 schedule 对具体 shape 的敏感性",
        "<strong>multi-codegen + runtime speculation</strong>：为 vectorization、implicit broadcast、reduce schedule、GEMM schedule 生成多版本代码，运行时根据实际 shape 选择",
        "<strong>Runtime Abstraction Layer</strong>：编译器同时生成 device tensor computation 和 host runtime flow，用 RAL 隔离 TensorFlow/PyTorch 前端与 CUDA/ROCm/CPU 后端"
      ],
      "detail": "<p><img alt=\"BladeDISC pass pipeline\" src=\"https://raw.githubusercontent.com/alibaba/BladeDISC/main/docs/developers/pics/pass_pipeline.png\" />\n<em>图：BladeDISC 官方开发者文档中的 pass pipeline。模型先降到 MHLO/StableHLO，经过 shape optimization、placement、bufferization、fusion decision、codegen，最后生成 host/device 侧执行代码。</em></p>\n<pre><code class=\"language-python\"># BladeDISC 动态 shape 编译优化伪代码\ndef bladedisc_compile(frontend_model, target):\n    hlo = lower_frontend_to_stablehlo_or_mhlo(frontend_model)\n\n    shape_env = ShapeEnv()\n    for op in hlo.ops_topological_order():\n        shape_env.union_equal_dims(infer_input_output_equalities(op))\n        shape_env.add_collapse_equalities(infer_dim_collapse(op))\n        shape_env.propagate_dim_properties(infer_divisibility_and_ranges(op))\n\n    annotate_tensor_types_with_global_symbols(hlo, shape_env)\n    hlo = eliminate_compile_time_redundant_broadcasts(hlo, shape_env)\n    hlo = graph_rewrite(hlo, passes=[&quot;dot_merge&quot;, &quot;algebraic_simplify&quot;, &quot;layout_transform&quot;])\n\n    placed = place_ops(hlo, device_ops=target.accelerator, shape_ops=&quot;host_cpu&quot;)\n    memref_ir = bufferize_and_materialize_runtime_shape_calculation(placed)\n\n    fusions = []\n    fusions += fuse_elementwise_to_consumers(memref_ir)\n    fusions += fuse_compute_intensive_with_epilogue(memref_ir)\n    fusions += stitch_memory_intensive_fusions_by_symbolic_dim_propagation(\n        memref_ir,\n        shape_env,\n        check=lambda producer, consumer: same_group_tile_dims(producer, consumer),\n    )\n\n    kernels = []\n    for fusion in fusions:\n        if fusion.is_memory_intensive():\n            kernels += generate_interleaved_shape_insensitive_kernels(fusion)\n            kernels += generate_vectorized_and_reduce_schedule_variants(fusion, shape_env)\n        else:\n            schedules = select_top_common_gemm_schedules(profile_db, top_n=target.top_n)\n            classifier = train_or_load_runtime_schedule_classifier(schedules)\n            kernels += generate_gemm_schedule_variants(fusion, schedules, classifier)\n\n    host_runtime = emit_runtime_flow_with_ral(memref_ir, kernels, target)\n    return link(host_runtime, kernels)\n</code></pre>\n<p><strong>动机：动态 shape 下静态编译器为什么会失效</strong></p>\n<p>NLP 推理的 batch size/sequence length、CV 输入分辨率、检测模型中间候选框数量都可能随请求变化。静态 shape 编译器通常有两种处理方式：JIT 缓存每个新 shape 的编译产物，或者提前把 shape bucketing 后 padding 到固定范围。前者会造成服务 warm-up、抖动和 cache 内存膨胀；后者会引入大量冗余计算，且要求用户预先知道 shape 范围。BladeDISC 的目标是“动态 shape 模型一次编译，多 shape 运行”，因此它必须在没有具体 shape 值的编译期仍能做图优化、fusion 和 codegen。</p>\n<p><strong>全局符号 shape：优化真正需要的常常是关系，不是值</strong></p>\n<p>BladeDISC 的核心观察是：很多优化并不需要知道 <span class=\"kb-math kb-math-inline\">M=128</span> 或 <span class=\"kb-math kb-math-inline\">N=512</span>，只需要知道两个维度是否相等、某个维度是否是另几个维度乘积、某个维度是否能被 4 整除。它把 shape 信息抽象为两类：shape relationship 与 shape property。对 tensor <span class=\"kb-math kb-math-inline\">T</span> 的第 <span class=\"kb-math kb-math-inline\">k</span> 个维度，可用全局符号表示为：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{dim}(T,k)=S_i,\\quad S_i\\equiv S_j,\\quad S_o=\\prod_{r\\in R}S_r,\\quad S_i\\bmod c=0,\\quad S_i\\in[l,u]</div>\n<p>dim equality 来自三种来源：输入输出推断，例如 matmul 输出维度继承输入 <span class=\"kb-math kb-math-inline\">M,N</span>；sibling constraint，例如 matmul 两个输入的 contracting dimension 必须相等；shape value extraction，例如 reshape/broadcast 的 shape tensor 元素对应输出维度。dim collapse equality 则描述 reshape 这类变换中的乘积关系，例如 <code>tensor&lt;?x4&gt;</code> reshape 到 <code>tensor&lt;?&gt;</code> 时输出维度可被 4 整除。</p>\n<p><strong>跨层 shape 表示：把分析结果变成 IR 的一部分</strong></p>\n<p>传统 pass pipeline 中，一个 pass 分析出的 shape 事实很容易在后续 lowering 后丢失。BladeDISC 利用 MLIR 类型系统，把符号 shape 绑定到 tensor type 上：相等维度共享同一个 <code>@S0/@S1/...</code> 符号，collapse 关系存入 <code>DimCollapseContainer</code>，property 存入 <code>SymbolDim</code>。这样 shape optimization、graph transformation、fusion decision、bufferization 和 codegen 都能读取同一份 shape 事实，而不是每个 pass 重新分析一遍。这个设计也让动态 shape IR 在下降到 memref/LLVM 前仍保留高层 shape 语义。</p>\n<p><strong>动态 shape fusion：从“值检查”变成“符号传播”</strong></p>\n<p>Fusion 是 BladeDISC 的主要性能来源，但动态 shape 下 fusion 决策最难。AStitch 一类静态 shape stitch fusion 会用具体 tensor size 判断 producer/consumer 在 register/shared memory/global memory 之间的 locality；BladeDISC 把这个判断改写为符号维度传播。对一个 reduce-dominated 子图，先选出 dominant op，并把每个 dominant 的循环维度分成 group-dim 与 tile-dim。以 row-reduce <span class=\"kb-math kb-math-inline\">A[m,n]\\rightarrow B[m]</span> 为例，<span class=\"kb-math kb-math-inline\">n</span> 是 tile-dim，映射到一个线程 tile 内部；<span class=\"kb-math kb-math-inline\">m</span> 是 group-dim，映射到不同 thread block/warp 组。</p>\n<p>stitch fusion 的合法性可以写成：</p>\n<div class=\"kb-math kb-math-display\">\\prod_{s\\in G_p}s = \\prod_{s\\in G_c}s,\\quad T_p \\equiv T_c,\\quad \\mathrm{Coverable}(I_{\\text{output}}, I_{\\text{dominant}})=\\mathrm{true}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">G_p,G_c</span> 是 producer/consumer 的 group-dim 集合，<span class=\"kb-math kb-math-inline\">T_p,T_c</span> 是 tile-dim 传播结果。BladeDISC 从 consumer dominant 往 producer dominant 反向传播 dim 映射，例如 reshape 的输出维度可能映射回输入维度集合；如果传播到上一个 dominant 时 group/tile 符号与原先识别结果一致，就说明两段计算的 locality 可对齐，可以 stitch 到同一个 kernel。若遇到无法解析的循环关系或 index coverability 不成立，则保守地产生 split kernels。</p>\n<p><strong>融合流水线：先小后大，区分 compute-intensive 与 memory-intensive</strong></p>\n<p>BladeDISC 不一次性搜索整图 fusion，而是分阶段构建。element-wise fusion 把逐元素算子贴到 consumer，遇到 reduce 或 compute-intensive op 停止；compute-intensive fusion 把 GEMM/conv 这类算子与纯 element-wise epilogue 融合，减少输出写回和后续读入；stitch fusion 再把 memory-intensive fusions 合成更大的 kernel。这个分层很重要：compute-intensive op 通常需要大量 on-chip resource 和较低并行度来获得矩阵计算效率，memory-intensive op 则需要高并行度隐藏访存延迟，强行全融合反而可能拖慢后者。</p>\n<p><strong>动态 shape codegen：编译期生成更不敏感的 schedule</strong></p>\n<p>没有具体 shape 值时，很难为 reduce 选择最佳 thread-level parallelism。BladeDISC 的做法之一是提高 instruction-level parallelism，让 kernel 对 TLP 的依赖降低。论文中的 reduce-sum/reduce-max 例子展示了两种写法：非交错版本先完整执行 sum reduce，再执行 max reduce；交错版本在同一个 loop、warp shuffle、cross-warp reduce 流程中同时维护 <code>sum</code> 与 <code>max</code>。这会合并相同控制流，减少分支和 loop overhead，并把独立指令放得更近，更容易填满 GPU pipeline。</p>\n<p>可以把 memory-intensive kernel 的目标近似写成：</p>\n<div class=\"kb-math kb-math-display\">\\max\\ \\mathrm{Throughput}\\approx f(\\mathrm{TLP},\\mathrm{ILP},\\mathrm{MemoryCoalescing})</div>\n<p>静态 shape 编译器通常把重点放在给定 shape 下调 <span class=\"kb-math kb-math-inline\">\\mathrm{TLP}</span>，BladeDISC 在 shape 未知时通过提升 <span class=\"kb-math kb-math-inline\">\\mathrm{ILP}</span> 和减少控制流开销，让一个 schedule 覆盖更宽的 shape 区间。</p>\n<p><strong>multi-codegen 与 runtime speculation：让运行时 shape 参与最后选择</strong></p>\n<p>BladeDISC 仍然承认“一个 schedule 不可能对所有 shape 最优”。因此它在编译期生成多个版本，在运行时根据真实 shape 做极轻量选择。memory-intensive 子图常见版本包括：vectorized/non-vectorized kernel，如果维度可被向量宽度整除就选 vectorized；保守/激进 broadcast kernel，如果运行时发现剩余 implicit broadcast 实际不需要就选激进版本；row-reduce 的 one-block-one-row 与 one-warp-one-row，根据行列规模和经验阈值选择。</p>\n<p>compute-intensive 子图则更接近数据库查询优化中的 alternative plan selection。BladeDISC 对 GEMM shape <span class=\"kb-math kb-math-inline\">[M,N,K,B]</span> 建 profile dataset，找出能达到接近最优性能的 top schedules，再取 top-N 常见 schedule 编译进二进制；运行时用轻量分类器预测：</p>\n<div class=\"kb-math kb-math-display\">s^\\*=\\mathrm{Classifier}(M,N,K,B),\\quad s^\\*\\in\\{s_1,\\dots,s_N\\}</div>\n<p>论文使用 decision tree，因为相近规模的 GEMM 通常共享同一好 schedule。这个 speculation 发生在 CPU host 侧，开销足够小，可以与 GPU 执行上一个 kernel 的时间重叠；并且如果多个 compute-intensive 子图共享相同 shape 约束，speculation 结果还能复用。</p>\n<p><strong>系统实现：MLIR、RAL 与 host/device 共同生成</strong></p>\n<p>BladeDISC 以 StableHLO/MHLO 作为多前端 hub IR：TensorFlow 通过社区 pipeline 降到 HLO，PyTorch 先到 TorchScript/torch-mlir 再到 HLO。随后 placement pass 把 tensor computation 放到 GPU/CPU device，把 shape calculation 放到 host CPU；bufferization pass 显式插入 allocation/deallocation，把 tensor 值转成 memref 和 runtime buffer 行为。与只生成 device kernel 的编译器不同，BladeDISC 还生成 host-side runtime flow，包括 shape 计算、buffer 管理、kernel launch 和 RAL custom calls。Runtime Abstraction Layer 隔离 TensorFlow/PyTorch IO context 与 CUDA/ROCm/x86/AArch64 device abstraction，使核心图优化逻辑不依赖具体前后端。</p>\n<div class=\"key-point\">💡 关键：BladeDISC 的“动态 shape 编译”不是简单把 shape 变量留到运行时，而是在编译期最大化挖掘 shape 关系，用这些关系驱动 fusion 和部分 codegen；只有真正依赖具体数值的 schedule 选择，才交给低开销运行时 speculation。</div>",
      "quiz": {
        "q": "BladeDISC 为什么能在不知道具体 tensor shape 值的情况下做 stitch fusion 决策？",
        "options": [
          "它完全跳过 fusion，只在运行时解释执行所有算子",
          "它把 producer/consumer locality 检查转化为 group-dim、tile-dim 的符号相等与传播检查",
          "它要求用户提前枚举所有可能的 batch size 和 sequence length",
          "它只支持静态 shape 的 GEMM，不处理 memory-intensive 子图"
        ],
        "answer": 1,
        "explain": "BladeDISC 的核心观察是 fusion locality 常依赖维度关系而不是具体数值；通过全局符号 shape 和 symbolic dim propagation，它可以在编译期判断动态 shape 子图是否可 stitch。"
      }
    },
    {
      "id": "mojo",
      "num": 24,
      "name": "Mojo",
      "fullName": "AI原生系统编程语言 (Mojo)",
      "year": "2023",
      "org": "Modular",
      "parent": "mlir",
      "paperUrl": "https://www.modular.com/mojo",
      "projectUrl": "",
      "category": "infrastructure",
      "motivation": "Python超集语法提供MLIR原生系统级AI编程能力",
      "summary": "Mojo 以 Python 生态兼容为入口，把静态类型、值语义、所有权、编译期参数化、SIMD/LayoutTensor/GPU 编程和 MLIR 直接暴露到语言层，试图让 AI 开发者在接近 Python 的语法中写出可降到硬件的系统级高性能代码。",
      "keyPoints": [
        "<strong>Python-first 迁移路径</strong>：支持 Mojo 调 Python，也支持 Python 调 Mojo 模块，让现有 Python/NumPy/AI 工作流可以增量迁移",
        "<strong>CPython 互操作</strong>：Mojo 可通过未修改的 CPython runtime 调用 Python 模块和对象，保证生态兼容",
        "<strong>静态 struct 类型系统</strong>：<code>struct</code> 字段必须静态声明类型，编译期确定布局，区别于 Python class 的动态对象模型",
        "<strong>值语义与所有权</strong>：每个值同一时间只有一个 owner，生命周期结束时确定性析构，并通过引用和 passing convention 控制共享与 mutation",
        "<strong>argument convention</strong>：默认 immutable reference，<code>mut</code> 表示可变引用，<code>var</code> 表示获取所有权，<code>out</code>/<code>deinit</code> 用于初始化和析构生命周期",
        "<strong>编译期参数化</strong>：<code>[]</code> 传递类型或值参数，<code>()</code> 传递运行时参数，编译器为不同参数生成具体版本",
        "<strong><code>comptime</code> 执行</strong>：支持编译期常量、条件、循环展开和类型构造，用于消除分支、生成专用 kernel",
        "<strong>Layout/LayoutTensor</strong>：把多维坐标到线性内存索引的映射建模为一等对象，服务于矩阵、tile 和 accelerator kernel",
        "<strong>GPU 标准库</strong>：通过 <code>DeviceContext</code> 分配 host/device buffer、编译 kernel、enqueue function、同步 stream",
        "<strong>Inline MLIR</strong>：提供 <code>__mlir_type</code>、<code>__mlir_attr</code>、<code>__mlir_op</code>、<code>__mlir_region</code>，允许直接访问硬件 intrinsic、atomic 和自定义 dialect 操作"
      ],
      "detail": "<p><img alt=\"Mojo 与 Python 的双向互操作\" src=\"https://mojolang.org/assets/images/python-interop-e7ab6838e7bdecafb63a7d9a27753d3b.png\" />\n<em>图：Mojo 官方文档中的 Python interoperability 示意图。Mojo 程序可调用 CPython runtime，Python 程序也可导入声明了 bindings 的 Mojo module。</em></p>\n<pre><code class=\"language-python\"># Mojo 作为 AI 系统语言的编译/执行路径伪代码\ndef build_and_run_mojo_ai_kernel(python_app, mojo_source, inputs):\n    # 1. 与 Python 生态衔接\n    if python_app.needs_existing_library:\n        py_obj = mojo_import_python_module(&quot;numpy_or_torch&quot;, via=&quot;CPython runtime&quot;)\n    if python_app.needs_fast_extension:\n        mojo_module = compile_mojo_module_with_bindings(mojo_source)\n        python_app.import_module(mojo_module)\n\n    # 2. 编译期特化\n    ir = parse_and_typecheck(mojo_source)\n    ir = run_comptime_blocks(ir)                 # comptime if / comptime for / parameter values\n    ir = elaborate_parameterized_defs(ir)        # f[T, N] -&gt; concrete versions\n    ir = verify_ownership_and_lifetimes(ir)      # owner/ref/mut/var/out/deinit\n\n    # 3. 降到 MLIR 与目标硬件\n    mlir = lower_structs_simd_layouts_to_mlir(ir)\n    mlir = inline_explicit_mlir_ops(mlir)         # __mlir_op / __mlir_type / dialect intrinsics\n    binary = compile_to_target(mlir, target=[&quot;cpu&quot;, &quot;cuda&quot;, &quot;hip&quot;, &quot;metal&quot;])\n\n    # 4. 运行时调度\n    ctx = DeviceContext()\n    device_buffers = ctx.copy_inputs_to_device(inputs)\n    kernel = ctx.compile_function(binary.kernel)\n    ctx.enqueue_function(kernel, device_buffers, grid_dim=..., block_dim=...)\n    return ctx.copy_outputs_to_host_and_synchronize(device_buffers)\n</code></pre>\n<p><strong>资料边界：Mojo 不是传统论文，而是语言与编译栈</strong></p>\n<p>Mojo 的给定 URL 是 Modular 产品页，不是会议论文。因此这里按官方 Mojo 文档、手册和 reference 资料做同等深度解读。Mojo 的核心定位不是一个单独算子优化算法，而是一套语言级基础设施：在 Python 风格语法之上加入系统编程需要的类型、内存、参数化、硬件和 MLIR 能力。它解决的问题可以概括为：AI 代码常用 Python 做表达和生态 glue，但性能关键路径最终要落到 C++、CUDA、Triton、MLIR 或厂商库；Mojo 试图把这条跨语言链路缩短，让高层 Python 生态与低层硬件代码处在同一种语言模型中。</p>\n<p><strong>Python 互操作：增量迁移而不是一次性重写</strong></p>\n<p>Mojo 的互操作分两条路。第一条是 Mojo 调 Python：Mojo 程序可以导入 Python 模块、构造 Python 对象、调用 Python 函数，背后使用未修改的 CPython runtime，因此能继承现有 Python 库生态。第二条是 Python 调 Mojo：由于 Mojo 是编译语言，Python 不能像 <code>eval</code> 一样直接解释 Mojo 源码，而是需要 Mojo 侧显式声明对 Python 可见的 bindings，编译后作为普通模块被 Python import。这个设计对应两种迁移策略：外围训练/数据处理仍留在 Python，热点函数逐步用 Mojo 写；或者 Mojo 程序中继续调用成熟 Python 库，把系统级 kernel、layout、SIMD 和 GPU 部分留给 Mojo。</p>\n<p><strong>类型与 struct：从动态对象转向可优化内存布局</strong></p>\n<p>Mojo 的大部分类型是名义类型，用户主要用 <code>struct</code> 定义数据与方法。与 Python class 不同，Mojo struct 的字段必须声明为 <code>var field: Type</code>，并在构造函数中初始化；字段集合和类型在编译期固定，所以编译器能生成紧凑、可预测的内存布局。一个 struct 可以包含 fields、methods、static methods、dunder methods、<code>comptime</code> members，并通过 traits 获得 copy/move 能力。这个模型把 AI kernel 中常见的“小值类型、指针包装、tensor view、layout descriptor、device handle”都变成可内联、可特化、可检查的编译期实体。</p>\n<p><strong>所有权与 passing convention：性能控制与内存安全合在一起</strong></p>\n<p>Mojo 的所有权规则可以写成一个不变量：</p>\n<div class=\"kb-math kb-math-display\">\\forall v,\\quad |\\mathrm{Owner}(v,t)|=1,\\quad \\mathrm{end}(\\mathrm{owner}(v))\\Rightarrow \\mathrm{destroy}(v)</div>\n<p>默认函数参数是 immutable reference，callee 能读原值但不能改，也不会触发大对象复制；<code>mut x: T</code> 表示可变引用，callee 的修改对 caller 可见，并且 Mojo 会 enforcing argument exclusivity，避免同一个值同时作为可变和不可变引用传入；<code>var x: T</code> 表示函数获得一个值的所有权，可消费或移动；<code>out self</code> 用于构造函数，表示进入函数时未初始化、返回前必须初始化；<code>deinit self</code> 用于析构或 consuming move。对 AI 系统代码来说，这比“到处 copy tensor descriptor”更可控，也比手写 C++ lifetime 更容易由编译器检查。</p>\n<p><strong>编译期参数化：类型和值都能成为 specialization 输入</strong></p>\n<p>Mojo 明确区分 parameter 与 argument：<code>[]</code> 里的 parameter 是编译期输入，<code>()</code> 里的 argument 是运行时输入。parameter 可以是类型，也可以是整数、字符串、dtype、layout 等值。例如一个函数 <code>kernel[dtype, tile_m, tile_n](ptr, n)</code> 会为不同 <code>dtype/tile_m/tile_n</code> 生成具体版本。抽象地看：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{Elaborate}(f[P], A)=f_{P}(A),\\quad P\\in\\mathrm{ComptimeValues}</div>\n<p>这类似 C++ template 或 Rust generics，但 Mojo 把 <code>comptime if</code>、<code>comptime for</code>、parameterized structs/functions 放进同一套语法。<code>comptime for i in range(N)</code> 会在编译期展开为 <span class=\"kb-math kb-math-inline\">N</span> 份 loop body，从而消除运行时分支和 loop bound 检查；对 GPU kernel 来说，这尤其适合展开小 tile、生成固定 vector width 的代码，减少线程分歧。</p>\n<p><strong>Layout 与 LayoutTensor：把内存排布显式化</strong></p>\n<p>AI kernel 的性能经常取决于“同一份逻辑矩阵如何放在线性内存中”。Mojo 的 <code>Layout</code> 把这个映射建模为函数：给定 shape/stride 和逻辑坐标，返回线性 index。最基本的 2D row-major 公式是：</p>\n<div class=\"kb-math kb-math-display\">L(i,j)=i\\cdot s_i+j\\cdot s_j</div>\n<p>更一般地，对 rank-<span class=\"kb-math kb-math-inline\">n</span> layout：</p>\n<div class=\"kb-math kb-math-display\">L(c_0,\\dots,c_{n-1})=\\sum_{k=0}^{n-1}c_k\\cdot stride_k</div>\n<p>官方文档还支持 hierarchical <code>IntTuple</code> 和 nested modes，用来表达 tiled layout、tile-major order、分块矩阵等。<code>LayoutTensor</code> 则把 <code>Layout</code> 和数据指针组合起来，使 kernel 代码不必把 index arithmetic 散落在每个访问点，而是通过类型和 layout 对象表达“坐标到地址”的规则。这是 Mojo 面向 AI 的重要部分：很多矩阵乘、attention、convolution kernel 的核心差异并不是数学公式，而是 tile、stride、shared memory 和 vectorization 方式。</p>\n<p><strong>GPU 编程模型：标准库直接承载 host/device 流程</strong></p>\n<p>Mojo 标准库的 GPU API 把常规 GPU 程序流程写进语言生态：host 创建 <code>DeviceContext</code>，分配 host/device buffer，把数据复制到 device，编译 kernel function，然后用 <code>grid_dim</code> 和 <code>block_dim</code> enqueue，最后复制结果并 <code>synchronize()</code>。kernel 内部用 <code>block_idx</code>、<code>block_dim</code>、<code>thread_idx</code> 计算全局线程索引：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{idx}=\\mathrm{block\\_idx.x}\\cdot\\mathrm{block\\_dim.x}+\\mathrm{thread\\_idx.x}</div>\n<pre><code class=\"language-mojo\"># Mojo GPU kernel 伪代码：每个线程处理一个元素\nfrom std.gpu import block_dim, block_idx, thread_idx\n\ndef axpy_kernel(\n    x: UnsafePointer[Float32, MutAnyOrigin],\n    y: UnsafePointer[Float32, MutAnyOrigin],\n    a: Float32,\n    n: Int,\n):\n    idx = block_idx.x * block_dim.x + thread_idx.x\n    if idx &lt; n:\n        y[idx] = a * x[idx] + y[idx]\n\ndef launch_axpy(ctx: DeviceContext, x_dev, y_dev, n: Int):\n    kernel = ctx.compile_function[axpy_kernel]()\n    ctx.enqueue_function(\n        kernel,\n        x_dev,\n        y_dev,\n        Float32(2.0),\n        n,\n        grid_dim=(n + 255) // 256,\n        block_dim=256,\n    )\n    ctx.synchronize()\n</code></pre>\n<p>这段结构与 CUDA/HIP 的 host-device 模式相似，但 Mojo 的目标是让同一语言同时表达 host orchestration、kernel 逻辑、layout 抽象和编译期特化，减少 Python 调 C++/CUDA 扩展时常见的 ABI、binding、构建和类型重复。</p>\n<p><strong>Inline MLIR：语言暴露编译器中间层</strong></p>\n<p>Mojo 的 <code>__mlir_type</code>、<code>__mlir_attr</code>、<code>__mlir_op</code>、<code>__mlir_region</code> 允许开发者在源码里直接引用 MLIR 类型、属性、操作和 region。这样，当语言或标准库还没有包装某个硬件 intrinsic、atomic ordering、GPU dialect op 时，开发者可以直接写 MLIR 操作。机制上，Mojo 代码先被解析和类型检查为 IR，编译期参数与 <code>comptime</code> 先 elaboration，再逐步降到 MLIR dialect 与 LLVM/backend。Inline MLIR 等于在高层语言和中间表示之间开了一个受控 escape hatch：普通用户可以写 Pythonic Mojo，高级 kernel 作者能精确控制底层 op。</p>\n<p><strong>与 Python、C++、Rust、Triton 的位置差异</strong></p>\n<p>相对 Python，Mojo 的关键增量是静态布局、编译期 specialization、确定性资源生命周期和硬件编程；相对 C++，它试图用更现代的 ownership、traits、comptime 和 Python 互操作降低 AI kernel 工程复杂度；相对 Rust，Mojo 的默认参数传递更接近 immutable reference，并针对小数值类型和 SIMD 做性能策略；相对 Triton，Mojo 的范围更大，不只写 GPU kernel DSL，还试图承载系统编程、CPU/GPU、多维 layout、Python binding 和 MLIR escape hatch。它的风险也在这里：语言、标准库、编译器、包管理和生态都要成熟，才能真正替代 Python+C++/CUDA 的组合。</p>\n<div class=\"key-point\">💡 关键：Mojo 的算法性贡献不在单个优化公式，而在“把 AI 编译器需要的抽象前移到语言层”：shape/layout、value ownership、comptime specialization、GPU execution 和 MLIR dialect 都变成程序员可直接表达、编译器可直接优化的结构。</div>",
      "quiz": {
        "q": "Mojo 中 `[]` 参数列表相对 `()` 参数列表的核心区别是什么？",
        "options": [
          "`[]` 传递编译期参数并触发 specialization，`()` 传递运行时参数",
          "`[]` 只能传 Python 对象，`()` 只能传 Mojo struct",
          "`[]` 表示 GPU grid，`()` 表示 CPU stack frame",
          "`[]` 会关闭类型检查，`()` 才会启用类型检查"
        ],
        "answer": 0,
        "explain": "Mojo 把 parameter 定义为编译期值，写在 `[]` 中；argument 是运行时值，写在 `()` 中。编译器会根据 parameter 生成具体化版本。"
      }
    },
    {
      "id": "byteir",
      "num": 25,
      "name": "ByteIR",
      "fullName": "字节跳动端到端AI编译器 (ByteIR)",
      "year": "2023",
      "org": "ByteDance",
      "parent": "mlir",
      "paperUrl": "https://github.com/bytedance/byteir",
      "projectUrl": "",
      "category": "infrastructure",
      "motivation": "linalg-ext扩展覆盖复杂AI计算模式",
      "summary": "ByteIR 是字节跳动基于 MLIR、MHLO/StableHLO 和 Linalg 构建的端到端模型编译方案，通过 LinalgExt、ShapeExt、ByRE 与 BRT 运行时把前端图、张量级优化、GPU/CPU/ASIC 后端和执行时接口串成可复用流水线，解决复杂 AI 模式在上游 Linalg 中表达不足、融合受限和运行时 ABI 不统一的问题。",
      "keyPoints": [
        "<strong>端到端组件拆分</strong>：ByteIR 同时包含 Frontends、Compiler、Runtime，但各组件可独立使用，并通过 StableHLO 与 ByRE 形成稳定通信边界",
        "<strong>前端统一到 StableHLO/MHLO</strong>：TensorFlow、PyTorch、ONNX 前端分别经各自 dialect 降到兼容的 StableHLO，Compiler 主要以 MHLO 作为输入 IR",
        "<strong>不是新 IR 规范项目</strong>：官方仓库强调 ByteIR 主要复用上游 MLIR dialect 和 Google MHLO，新增 dialect 只补齐工程和后端需要",
        "<strong>LinalgExt 扩展核心</strong>：在 Linalg 之上增加 Top-k、Scan、Softmax、BatchMatmul 等复杂模式及对应接口，目标是与上游 Linalg 互操作并逐步上游化",
        "<strong>增强融合能力</strong>：<code>fuse_ext</code> 支持 reduction 轴 tiling、diamond 数据流、中间结果作为输出、多 root fusion、与 tensor dialect 一起融合",
        "<strong>HLO 到 kernel 的分层流水线</strong>：<code>hlo-opt</code> 做 MHLO fusion group 聚类和 outlining，<code>linalg-tensor-opt</code> 降到 Linalg/LinalgExt 后继续融合、tiling、reduction codegen",
        "<strong>GPU 路径明确</strong>：MHLO → Linalg Tensor → Linalg Memref → Affine/SCF → GPU dialect，再通过 NVVM/LLVM 生成 PTX 或用 CUDA emitter 生成 CUDA C",
        "<strong>ByRE/BRT 运行时边界</strong>：ByRE 是编译器和 ByteIR Runtime 之间的执行表示，BRT 同时服务已有 kernel 和编译器生成 kernel",
        "<strong>面向自定义硬件复用</strong>：通用 graph、loop、tensor 级优化在 ByteIR 中沉淀，ASIC 编译器可只实现最后一段后端映射"
      ],
      "detail": "<p><img alt=\"ByteIR 复用的 MLIR/Linalg 分层代码生成骨架\" src=\"https://user-images.githubusercontent.com/10148468/73613629-c5586580-45c5-11ea-94b7-074aeea94c7b.png\" />\n<em>图：MLIR/Linalg 官方分层代码生成视图。ByteIR 官方资料说明其直接复用上游 MLIR、MHLO 与 Linalg，并把 LinalgExt 设计为 Linalg 之上的扩展，因此这张图可用来理解 ByteIR 在 OpGraph、Linalg、Affine/SCF、Vector/LLVM 之间的降级骨架。</em></p>\n<pre><code class=\"language-python\"># ByteIR 端到端编译流水线伪代码\ndef compile_with_byteir(model, source_framework, target):\n    # 1. 前端边界：不同框架都输出兼容 StableHLO/MHLO\n    stablehlo = frontend_to_stablehlo(model, source_framework)\n    mhlo = normalize_stablehlo_to_mhlo(stablehlo)\n\n    # 2. 图层优化：聚类可融合 HLO 子图并 outline 成 kernel function\n    mhlo = run_passes(mhlo, [\n        &quot;reduction-fusion&quot;,\n        &quot;elementwise-broadcast-fusion&quot;,\n        &quot;fusion-outlining&quot;,\n        &quot;canonicalize&quot;,\n    ])\n\n    # 3. 张量层优化：降到 Linalg/LinalgExt，处理复杂模式\n    linalg_ir = lower_mhlo_to_linalg_ext(mhlo)\n    linalg_ir = run_passes(linalg_ir, [\n        &quot;linalg-fuse-elementwise-ext&quot;,\n        &quot;linalg-tile-ext&quot;,\n        &quot;split-reduction&quot;,\n        &quot;fold-unit-extent-dims&quot;,\n        &quot;collapse-loops&quot;,\n        &quot;tensor-pad-specialization&quot;,\n    ])\n\n    # 4. 后端降级：根据目标进入 GPU、CPU 或 ASIC 的 last-mile pipeline\n    if target.kind == &quot;gpu&quot;:\n        gpu_ir = lower_linalg_to_scf_affine_gpu(linalg_ir)\n        binary = emit_ptx_or_cuda(gpu_ir)\n    else:\n        binary = target.lower_from_linalg_or_scf(linalg_ir)\n\n    # 5. 运行时边界：用 ByRE 描述可执行调用，由 BRT 装载和调度\n    byre = emit_byre_runtime_ir(binary, entry_points=collect_entry_points(mhlo))\n    return package_for_brt(byre, binary)\n</code></pre>\n<p><strong>定位：ByteIR 不是“再发明一个 IR”，而是把 MLIR 编译栈产品化</strong></p>\n<p>ByteIR 的官方 README 明确说明，ByteIR 项目不是 IR 规范定义项目。在大多数场景中，它直接使用上游 MLIR dialect 和 Google MHLO，并让自己的 passes 与上游 MLIR/MHLO passes 兼容。这一点决定了它的工程取向：前端不必绑定某个框架私有图，后端也不必重新实现完整编译器基础设施，而是在 StableHLO/MHLO、Linalg、SCF/Affine、GPU/LLVM 等层级之间补齐深度学习模型所需的缺口。换言之，ByteIR 的核心贡献不是单点算法，而是把“前端导入、通用张量优化、复杂 fusion、后端生成、运行时执行”整理成可拆换的流水线。</p>\n<p><strong>为什么需要 LinalgExt：上游 Linalg 的表达和接口都还不够</strong></p>\n<p>Linalg 适合表达结构化张量计算，但复杂 AI workload 中有三类模式会卡住普通 Linalg pipeline。第一类是 Top-k、Scan/cumsum 这种很难仅靠 <code>linalg.generic</code> 自然表达的模式；第二类是 Softmax 这类可以拆成多个 generic op 但会丢失“这是一个整体 pattern”的优化机会；第三类是 batch matmul 这类上游已有变体但需要更灵活接口的常见算子。ByteIR 的做法是在 Linalg 上方增加 <code>linalg-ext</code> dialect，而不是把所有复杂逻辑塞进 pass 的特殊分支。这样既能清楚地区分扩展语义，也能让 ext op 和普通 Linalg op 在 tiling、fusion、lower-to-loops 中互操作。</p>\n<p>可以把一个 LinalgExt op 抽象为：</p>\n<div class=\"kb-math kb-math-display\">op_{ext} = (\\text{indexing\\_maps}, \\text{iterator\\_types}, \\text{region}, \\text{interfaces}_{extra})</div>\n<p>其中前三项尽量沿用 Linalg 的结构化语义，额外接口则描述上游 Linalg 当前无法充分表达的模式属性，例如输出元素级可融合性、reduction 轴行为、scan 的前缀依赖或 top-k 的排序选择约束。这样做的好处是，优化 pass 可以基于接口而不是字符串匹配决策，后端也能在保留模式语义的同时逐步降到 loop 或 GPU dialect。</p>\n<p><strong>Reduction 轴 tiling：ByteIR 修复的是语义级 fusion bug</strong></p>\n<p>ByteIR 文档中特别展示了 <code>linalg.matmul</code> 在 reduction 轴上 tiling 时的错误案例。矩阵乘法本质是：</p>\n<div class=\"kb-math kb-math-display\">C_{ij}=\\sum_{k=0}^{K-1} A_{ik}B_{kj}</div>\n<p>如果沿 <span class=\"kb-math kb-math-inline\">k</span> 轴分块，正确的循环语义应该是先初始化一次，再在每个 tile 上累加：</p>\n<div class=\"kb-math kb-math-display\">C_{ij}^{(0)}=0,\\qquad\nC_{ij}^{(t+1)}=C_{ij}^{(t)}+\\sum_{k=tT}^{\\min((t+1)T,K)-1} A_{ik}B_{kj}</div>\n<p>上游 <code>transform.structured.fuse</code> 的错误结果会把 <code>linalg.fill</code> 放进每个 reduction tile 的循环体，导致每个 tile 都把部分和清零，等价于只保留最后一个 tile 的贡献。ByteIR 的 <code>fuse_ext</code> 把 <code>fill</code> 保留在 reduction 循环之外，并让循环的 <code>iter_args</code> 承接上一轮部分和。这个例子说明 LinalgExt 的价值不只是“多支持几个算子”，而是把 AI 编译中常见的分块、融合和初始化语义关系显式编码进变换。</p>\n<p><strong>复杂数据流融合：中间输出、diamond 和多 root 都是实际模型痛点</strong></p>\n<p>普通 producer-consumer fusion 很容易处理线性链：<code>A -&gt; B -&gt; C</code>。真实模型中更常见的是中间值既被后续 op 消费，又作为函数输出返回，或者残差块形成 diamond 结构。ByteIR 的 LinalgExt fusion 支持“intermediates as outputs”，即被融合的 producer 可以同时服务内部 consumer 和外部返回值，避免为了返回中间结果而复制整个 producer 计算。对 ResNet block 这类 diamond 图，ByteIR 文档还指出普通算法可能因重复访问分支节点而出现指数级遍历，<code>fuse_ext</code> 会合并多条路径的 tile 范围，使共享 producer 只被 tile 一次。</p>\n<p>用集合关系表示，一个 fusion group 不能只看边 <span class=\"kb-math kb-math-inline\">u\\to v</span>，还要看每个值的外部用户：</p>\n<div class=\"kb-math kb-math-display\">External(v)=Users(v)\\setminus Group</div>\n<p>若 <span class=\"kb-math kb-math-inline\">External(v)\\neq \\varnothing</span>，ByteIR 的策略不是简单拒绝融合，而是把 <span class=\"kb-math kb-math-inline\">v</span> 作为 fused function 的额外结果或 loop-carried output。这样 fused kernel 既能减少中间张量落地，又不破坏原图对中间结果的可见性。</p>\n<p><strong>从 MHLO 到 GPU：ByteIR 把通用优化和 last-mile 分开</strong></p>\n<p>ByteIR 的 <code>hlo-opt</code> pipeline 先在 MHLO 层聚类 fusion group，包括 reduction fusion、elementwise/broadcast/collapse/expand shape 等双向融合，再把每个 group outline 为独立 kernel function。随后 <code>linalg-tensor-opt</code> 把这些 group 转成 Linalg/LinalgExt，继续做 producer/consumer 融合、grid-level reduction split、parallel 维 tiling、block-level reduction、<code>tensor.pad</code> specialization 和 scalar detensorize。这个顺序很务实：MHLO 层适合做全图模式识别，Linalg 层适合做结构化循环变换，SCF/Affine/GPU 层适合绑定 block/thread 和 memory space。</p>\n<p>GPU 后端文档给出的主路线是：</p>\n<div class=\"kb-math kb-math-display\">\\text{MHLO}\\rightarrow\\text{LinalgTensor}\\rightarrow\\text{LinalgMemref}\n\\rightarrow\\text{Affine/SCF}\\rightarrow\\text{GPU}\\rightarrow\\text{NVVM/PTX or CUDA}</div>\n<p>其中 <code>ConvertFuncToGPU</code> 会把带有循环标注的 <code>func.func</code> 转成 <code>gpu.func</code>，例如将 <code>__byteir_loop_to_simt__ = \"block_id.x\"</code> 的 <code>scf.for</code> 映射到 <code>gpu.block_id x</code>。这说明 ByteIR 并不试图在高层图里直接决定线程层细节，而是让 Linalg/SCF 先把循环结构整理清楚，再在 GPU dialect 层做 SIMT 映射。</p>\n<p><strong>ByRE 与 BRT：运行时接口是端到端编译的一部分</strong></p>\n<p>ByteIR 的另一个关键边界是 ByRE，即 ByteDance Representation for Execution。前端和编译器之间用 StableHLO 通信，编译器和运行时之间则用 ByRE 通信。这个分层避免了两类耦合：前端不需要知道 BRT 如何装载 kernel，运行时也不需要理解完整的 MHLO/Linalg 优化历史。BRT 的定位是同时服务已有手写 kernel 和 ByteIR 生成 kernel，因此 ByRE 必须描述 entry function、参数、buffer、外部库调用和生成代码之间的执行契约。</p>\n<div class=\"key-point\">💡 关键：ByteIR 的工程价值在于把 MLIR 生态中的“可组合方言”落到 AI 编译产品链路中。StableHLO 解决前端入口，LinalgExt 解决复杂张量模式和融合语义，GPU/LLVM 或 ASIC backend 解决 last mile，ByRE/BRT 解决部署执行边界。</div>",
      "quiz": {
        "q": "ByteIR 引入 LinalgExt 的最核心原因是什么？",
        "options": [
          "完全替代 MLIR 和 Linalg，定义一套新的通用 IR 标准",
          "在复用 Linalg 的同时补齐 Top-k、Scan、Softmax、复杂 fusion 等上游表达或接口不足的 AI 模式",
          "只为 TensorFlow 图提供一个前端转换器",
          "把所有 GPU kernel 强制改写成手写 CUDA C"
        ],
        "answer": 1,
        "explain": "ByteIR 官方文档将 LinalgExt 定义为 Linalg 之上的扩展，目标是与上游 Linalg 互操作，并覆盖普通 Linalg 难以表达或难以优化的复杂 AI 计算模式。"
      }
    },
    {
      "id": "openxla",
      "num": 26,
      "name": "OpenXLA",
      "fullName": "开放跨框架XLA编译生态 (OpenXLA)",
      "year": "2023",
      "org": "Google",
      "parent": "xla",
      "paperUrl": "https://github.com/openxla/xla",
      "projectUrl": "",
      "category": "infrastructure",
      "motivation": "StableHLO解耦XLA为跨框架行业标准编译后端",
      "summary": "OpenXLA 把原本主要服务 TensorFlow/JAX 的 XLA 编译器开放为跨框架、跨硬件的 ML 编译生态，并以 StableHLO 作为版本化高层操作集和可移植层，解决前端框架、编译器后端和硬件厂商之间缺少稳定 IR 契约的问题。",
      "keyPoints": [
        "<strong>StableHLO 作为前端/后端契约</strong>：TensorFlow、JAX、PyTorch 等前端导出 StableHLO，XLA、IREE 等编译器消费 StableHLO",
        "<strong>版本化 HLO 操作集</strong>：StableHLO 定义高层 ML op、类型、属性、约束和执行语义，目标是让不同 release 之间具备可验证的兼容性",
        "<strong>解耦内部 HLO 演进</strong>：XLA 内部 HLO 可以继续快速变化，StableHLO 则承担稳定序列化、交换和长期可移植职责",
        "<strong>模块化 XLA pipeline</strong>：StableHLO 先转入 XLA HLO，随后经过目标无关优化、后端相关 HLO 优化、调度、buffer assignment 和代码生成",
        "<strong>跨框架生态入口</strong>：OpenXLA 让模型框架不再直接绑定某个硬件后端，也让硬件厂商可以优先实现 StableHLO/XLA 兼容路径",
        "<strong>后端可插拔目标</strong>：XLA 官方文档强调后端模块化，CPU/GPU 后端使用 LLVM，其他硬件可以接入自己的 HLO 优化和 codegen",
        "<strong>内存与融合仍是核心收益</strong>：XLA 继续通过 fusion、CSE、buffer analysis、layout assignment、schedule 和 rematerialization 降低 kernel launch 与中间张量内存开销",
        "<strong>PJRT 连接运行时</strong>：编译后的 platform-specific executable 可由 PJRT 等运行时抽象封装，向上屏蔽设备差异"
      ],
      "detail": "<p><img alt=\"StableHLO 跨框架生态图\" src=\"https://openxla.org/static/stablehlo/images/assets/stablehlo_ecosystem.svg\" />\n<em>图：OpenXLA 官方 StableHLO 生态图，展示 StableHLO 位于 ML 框架和 ML 编译器之间，承担跨框架、跨编译器的可移植层。</em></p>\n<pre><code class=\"language-python\"># OpenXLA 编译与部署契约伪代码\ndef compile_with_openxla(model, frontend, target):\n    # 1. 前端只需要导出一个稳定契约，而不是绑定某个 XLA 内部版本\n    stablehlo = frontend.export_stablehlo(model)\n    verify_against_stablehlo_spec(stablehlo)\n\n    # 2. StableHLO 是交换格式；XLA 内部仍可转成自己的 HLO 做激进优化\n    hlo = legalize_stablehlo_to_xla_hlo(stablehlo)\n    hlo = run_target_independent_passes(hlo, [\n        &quot;cse&quot;,\n        &quot;algebraic-simplifier&quot;,\n        &quot;constant-folding&quot;,\n        &quot;target-independent-fusion&quot;,\n        &quot;buffer-analysis&quot;,\n    ])\n\n    # 3. 后端接管硬件相关决策\n    hlo = target.backend.optimize_hlo(hlo, [\n        &quot;spmd-or-sharding&quot;,\n        &quot;layout-assignment&quot;,\n        &quot;library-rewrite&quot;,\n        &quot;priority-fusion&quot;,\n        &quot;copy-insertion&quot;,\n    ])\n\n    schedule = choose_hlo_schedule(hlo, objective=&quot;minimize_peak_memory&quot;)\n    buffers = assign_buffers(hlo, schedule)\n    executable = target.backend.codegen(hlo, schedule, buffers)\n    return pjrt_wrap(executable)\n</code></pre>\n<p><strong>动机：XLA 需要从单一框架后端变成行业接口</strong></p>\n<p>早期 XLA 的主要价值是把 TensorFlow 或 JAX 程序编译成高性能 CPU/GPU/TPU 可执行文件。随着 PyTorch/XLA、IREE、JAX、TensorFlow 以及硬件厂商共同进入同一生态，一个问题变得突出：如果每个前端都直接追随某个编译器内部 IR 的变化，框架和后端会形成强耦合；如果每个硬件后端都接入每个框架私有图，工程量又不可控。OpenXLA 的答案是把“稳定交换层”和“内部优化 IR”分开。StableHLO 对外提供版本化语义，XLA 内部 HLO 继续服务优化和代码生成。</p>\n<p>可以把 OpenXLA 的核心接口写成：</p>\n<div class=\"kb-math kb-math-display\">P_f \\xrightarrow{\\text{export}} S_v \\xrightarrow{\\text{consume}} C_t \\xrightarrow{\\text{codegen}} E_t</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">P_f</span> 是某个前端框架的程序，<span class=\"kb-math kb-math-inline\">S_v</span> 是版本 <span class=\"kb-math kb-math-inline\">v</span> 的 StableHLO 模块，<span class=\"kb-math kb-math-inline\">C_t</span> 是目标 <span class=\"kb-math kb-math-inline\">t</span> 的编译器 pipeline，<span class=\"kb-math kb-math-inline\">E_t</span> 是目标平台可执行对象。这个式子的关键是 <span class=\"kb-math kb-math-inline\">S_v</span> 不属于某个单一框架或硬件厂商，而是作为 OpenXLA 生态的公共边界。</p>\n<p><strong>StableHLO：稳定的是语义，不是某个后端实现</strong></p>\n<p>StableHLO 规范定义的是高层 ML operation set，包括 program、function、op、tensor type、quantized tensor type、token、tuple 等结构。一个典型 StableHLO 函数由 MLIR <code>func.func</code> 包裹，内部包含 <code>stablehlo.reshape</code>、<code>stablehlo.dot</code>、<code>stablehlo.add</code>、<code>stablehlo.maximum</code> 等 op。它的稳定性来自三点：第一，op 的输入输出、属性和约束有规范；第二，文本/字节码可被不同工具读写；第三，版本演进可以通过 VHLO 等机制保留兼容映射。</p>\n<p>与 XLA 内部 HLO 相比，StableHLO 更像 ABI。ABI 的目标不是暴露所有内部优化细节，而是让生产者和消费者在长期演进中仍能互相理解。因此 OpenXLA 的设计可以概括为：</p>\n<div class=\"kb-math kb-math-display\">\\text{semantics}(\\text{StableHLO}_{v}) =\n\\text{semantics}(\\text{import}_{v\\rightarrow h}(\\text{HLO}_{h}))</div>\n<p>这里的等式不是说两种 IR 语法相同，而是说导入到某个内部 HLO 版本后，程序的张量语义应保持一致。这样前端可以依赖 StableHLO 规范，后端仍有空间在内部 HLO 上做 aggressive rewrite、layout assignment、fusion 和 buffer planning。</p>\n<p><strong>OpenXLA 中的 XLA pipeline：StableHLO 是入口，HLO 优化仍是主战场</strong></p>\n<p>OpenXLA 官方 XLA 架构文档把编译过程拆成三步。第一步，XLA 对 StableHLO 图做目标无关优化和分析，例如 CSE、target-independent fusion、buffer analysis，并把 StableHLO dialect 转入内部 HLO dialect。第二步，HLO 交给目标后端做带硬件信息的优化，例如 GPU 后端可执行适合 GPU 编程模型的 fusion，决定 stream 划分，或把特定模式重写为 cuDNN/cuBLAS/Triton 等库调用。第三步，后端执行目标相关 codegen，CPU/GPU 官方后端使用 LLVM 低层 IR 生成 native code。</p>\n<p>这种分层解释了 OpenXLA 为什么既强调 StableHLO，又不把 StableHLO 当作所有优化的终点。StableHLO 解决交换和兼容，HLO pipeline 解决性能。用图模型表示：</p>\n<div class=\"kb-math kb-math-display\">G_{\\text{StableHLO}}=(V,E,\\text{shape},\\text{dtype},\\text{attrs})</div>\n<p>导入 HLO 后，后端会继续补充或改变 layout、sharding、schedule、buffer alias 等物理属性：</p>\n<div class=\"kb-math kb-math-display\">G_{\\text{backend}}=(G_{\\text{HLO}},\\text{layout},\\text{sharding},\\text{schedule},\\text{buffers})</div>\n<p>前者是跨框架契约，后者是面向硬件的执行计划。</p>\n<p><strong>内存和 fusion：OpenXLA 继承 XLA 的核心优化收益</strong></p>\n<p>OpenXLA 的生态价值来自开放接口，但最终用户感受到的性能仍主要来自 XLA 的传统强项。Fusion 把多个 HLO op 合成一个 computation 或 kernel，使中间张量停留在寄存器、共享内存或局部表达式中，而不是写回 HBM 再读出。Schedule 和 Buffer Assignment 则把图上的逻辑值映射到可复用物理 buffer。给定调度 <span class=\"kb-math kb-math-inline\">\\pi</span>，峰值内存可写成：</p>\n<div class=\"kb-math kb-math-display\">M(\\pi)=\\max_t \\sum_{b\\in B}\\text{bytes}(b)\\cdot\n\\mathbf{1}[\\text{start}_{\\pi}(b)\\le t&lt;\\text{end}_{\\pi}(b)]</div>\n<p>XLA 调度器会尝试选择较低峰值的合法拓扑序；Buffer Assignment 会让生命周期不重叠的 HLOBuffer 共享同一 buffer slice；如果内存仍超预算，rematerialization 可以用重复计算换取更短生命周期。OpenXLA 把这些优化能力放在 StableHLO 之后，使多个前端都能复用同一套成熟优化。</p>\n<p><strong>与直接使用 XLA 的区别：OpenXLA 是生态边界重构</strong></p>\n<p>只说“OpenXLA 等于开源 XLA”是不准确的。XLA 是编译器，OpenXLA 是围绕 XLA、StableHLO、PJRT、Shardy 等组件形成的开放生态。它改变的是组织边界：框架开发者面向 StableHLO 导出；编译器开发者面向 StableHLO 导入并生成目标 executable；运行时通过 PJRT 等接口管理设备执行；硬件厂商可以围绕 HLO backend 或 PJRT plugin 接入。这样一来，同一个 StableHLO 程序可以成为调试、测试、序列化、兼容和后端 bring-up 的共同语言。</p>\n<div class=\"key-point\">💡 关键：StableHLO 把“框架程序如何交给编译器”从 XLA 内部实现细节中抽出来。OpenXLA 的意义不是替代 XLA 优化，而是让 XLA 的优化能力以稳定、开放、跨框架的方式被更多前端和硬件后端复用。</div>",
      "quiz": {
        "q": "OpenXLA 中 StableHLO 最核心的作用是什么？",
        "options": [
          "替代所有硬件后端的代码生成器",
          "作为版本化高层操作集，在 ML 框架和 ML 编译器之间提供稳定可移植契约",
          "只描述 GPU 线程块和寄存器分配",
          "把动态图强制转成 Python AST"
        ],
        "answer": 1,
        "explain": "StableHLO 是 OpenXLA 的 portability layer，前端导出 StableHLO，编译器消费 StableHLO，从而解耦框架、XLA 内部 HLO 演进和硬件后端。"
      }
    },
    {
      "id": "relax",
      "num": 27,
      "name": "Relax",
      "fullName": "动态机器学习端到端可组合抽象 (Relax)",
      "year": "2025",
      "org": "Apache TVM",
      "parent": "relay",
      "paperUrl": "https://dl.acm.org/doi/abs/10.1145/3676641.3716249",
      "projectUrl": "",
      "category": "infrastructure",
      "motivation": "符号形状作为一等公民，完美适配LLM动态推理需求",
      "summary": "Relax 提出面向动态形状机器学习的跨层编译抽象，把图级函数、TensorIR 张量程序和外部库调用放进同一 IR，并将符号形状作为一等公民在函数、算子和外部调用之间传播，解决 LLM 动态推理中 AOT 编译、跨层融合、静态内存规划和多端部署难以兼顾的问题。",
      "keyPoints": [
        "<strong>跨层抽象</strong>：同一 Relax 程序同时表达图级 tensor operator、loop-level TensorIR 和外部 library call，避免一次性降级后丢失高层优化信息",
        "<strong>一等符号形状</strong>：用符号变量和整数表达式表示动态维度关系，例如 <code>Tensor[(n, 4)]</code>、<code>Tensor[(4*n)]</code>，而不是只写 unknown/any",
        "<strong>结构化 annotation</strong>：每个值都有类似静态类型的 structural annotation，包含 tensor/tuple/callable、shape 和 dtype 等信息",
        "<strong>Dataflow block</strong>：用无副作用、无控制流的 straight-line block 标记可安全做 DCE、融合和图重写的区域",
        "<strong>跨函数形状推导</strong>：函数签名隔离符号关系，调用点可仅凭签名推断返回 shape，同时保留必要的轻量运行时检查",
        "<strong><code>call_tir</code> 与 DPS 语义</strong>：图级函数通过 <code>call_tir</code> 调用 TensorIR，通过 <code>call_dps_library</code> 调用外部库，二者都采用 destination-passing style 以便后续内存规划",
        "<strong>动态形状感知 fusion</strong>：先用 TensorIR 分析反馈标注 ElementWise、Broadcast、Injective、Reduction、OutputEwiseFusible 等模式，再由 <code>FuseOps</code> 与 <code>FuseTensorIR</code> 联合完成跨层融合",
        "<strong>动态内存规划</strong>：用符号形状比较和 liveness 让动态 tensor 也能复用静态分配的 storage pool，减少 runtime allocator 依赖",
        "<strong>可组合优化 pipeline</strong>：支持 workspace lifting、CUDA Graph offloading、partial lowering、library dispatch 和最终 VM 指令打包"
      ],
      "detail": "<p><img alt=\"Relax 总体方法概览\" src=\"https://arxiv.org/html/2311.02103v2/x1.png\" />\n<em>图：Relax 论文 Figure 1，展示其两个核心设计：跨层抽象连接计算图、TensorIR 和外部库，一等符号形状在全程序中追踪动态 shape 关系。</em></p>\n<pre><code class=\"language-python\"># Relax 动态形状端到端编译伪代码\ndef compile_relax(module, target):\n    # 1. 构建带 structural annotation 的 Relax IR\n    module = import_to_relax(module)\n    module = annotate_symbolic_shapes(module)\n\n    # 2. 每个 pass 后做前向符号形状推导，保持新变量的 shape 信息\n    for fn in module.functions:\n        for expr in fn.dataflow_order():\n            expr.struct_info = infer_struct_info(\n                expr,\n                op_shape_rules=registered_rules,\n                function_signatures=module.signatures,\n                match_cast_hints=True,\n            )\n\n    # 3. 跨层融合：先从 TensorIR 得到 pattern kind，再融合图级子图和低层程序\n    for tir_func in module.tensorir_functions:\n        tir_func.pattern_kind = analyze_tensor_program_pattern(tir_func)\n    module = fuse_ops_by_pattern(module)\n    module = fuse_tensorir_inside_fused_subgraphs(module)\n\n    # 4. 显式化 DPS 调用、workspace 和内存分配\n    module = lower_call_tir_and_library_to_dps(module)\n    module = lift_tensor_program_workspaces(module)\n    module = plan_memory_with_symbolic_shapes(module)\n\n    # 5. 后端优化与运行时打包\n    module = offload_cuda_graph_if_static_after_planning(module, target)\n    kernels = build_tensorir_and_library_calls(module, target)\n    vm_code = lower_graph_level_to_vm_instructions(module)\n    return package_relax_vm_module(vm_code, kernels)\n</code></pre>\n<p><strong>动机：LLM 动态推理让传统图 IR 和 JIT 都显得不够</strong></p>\n<p>LLM 推理天然包含动态形状：prompt 长度、batch size、KV cache 长度、vocab 相关维度、prefill/decode 阶段的张量形状都可能变化。传统静态图编译器可以在固定 shape 下做很强的 fusion 和 memory planning，但遇到动态维度时往往只能写成 <code>?</code> 或 <code>any</code>，导致“这个维度和另一个维度相等”“flatten 后元素数是 <span class=\"kb-math kb-math-inline\">4n</span>”这类关系被抹掉。JIT trace 可以在运行时观察到具体 shape，但它依赖目标环境支持动态编译和缓存，移动端、WebGPU、嵌入式设备未必适合。Relax 的目标是在 AOT 编译框架下保留足够多的动态 shape 关系，使动态模型仍能做全程序优化。</p>\n<p>Relax 的基本 annotation 可以抽象为：</p>\n<div class=\"kb-math kb-math-display\">\\text{TensorInfo} = (\\text{dtype}, (s_1,\\ldots,s_r)),\\qquad\ns_i \\in \\mathbb{Z}[n,m,k,\\ldots]</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">s_i</span> 不只是常数或 unknown，而可以是符号表达式。例如输入是 <code>Tensor[(n, 4), f32]</code>，flatten 后输出就是 <code>Tensor[(4*n), f32]</code>。当后续 reshape 回 <code>(n, 4)</code>，编译器可以证明元素数一致，而不是因为 unknown 而放弃优化。</p>\n<p><strong>跨层抽象：图、TensorIR 和外部库在同一表示中协作</strong></p>\n<p>Relay 已经把计算图扩展成函数式 IR，但 Relax 进一步把“图级算子”和“低层张量程序”放在同一程序里。图级 Relax 函数保持纯 tensor 语义，适合全局图重写；TensorIR 函数表达 loop-level 计算，适合 tiling、vectorization、memory scope 等底层优化；外部库调用负责复用 cuBLAS、CUTLASS 或平台特定算子。关键桥梁是 <code>call_tir</code> 和 <code>call_dps_library</code>。它们在图级看起来像产生 tensor 的纯调用，但底层会被降成 destination-passing style，即显式传入输出 buffer 并由 callee 写入。</p>\n<p>这种设计解决了传统一次性 lowering 的问题。若过早把所有图算子降到 loop，图级 fusion、dead code elimination 和全局 memory planning 会变难；若一直停留在图级，则无法利用 TensorIR 分析得出的访问模式和 workspace 需求。Relax 允许某些部分先 partial lowering 到库或 TensorIR，其他部分继续保留图级结构，后续 pass 仍能在同一 IR 中看见跨层关系。</p>\n<p><strong>符号形状推导：前向、局部，但跨函数可用</strong></p>\n<p>Relax 选择前向 shape deduction。每个 tensor op 注册 shape 规则，根据输入 annotation 和必要的值参数推导输出 annotation；<code>call_tir</code> 和 <code>call_dps_library</code> 的输出 annotation 是调用参数的一部分，直接参与推导；<code>match_cast</code> 则允许前端或 pass 显式声明更精确的符号形状。这样每次 pass 引入新变量后，不需要全局求解大型约束系统，也能线性地补回 shape 信息。</p>\n<p>跨函数时，Relax 把符号关系隔离在函数签名中。若函数签名为：</p>\n<div class=\"kb-math kb-math-display\">f:\\text{Tensor}[(n,m)]\\rightarrow \\text{Tensor}[(n\\cdot m)]</div>\n<p>调用点传入 <code>Tensor[(a,b)]</code> 时，返回 shape 可直接替换为 <code>(a*b)</code>。如果调用点只有粗粒度 <code>Shape(ndim=2)</code>，也允许通过函数边界的轻量运行时检查确认具体 shape 是否满足签名。这个折中很重要：它既支持 AOT 优化常见动态关系，又不要求编译期知道所有数据依赖 shape。</p>\n<p><strong>动态形状感知 fusion：先分析低层程序，再重写图级子图</strong></p>\n<p>Relax 的 operator fusion 不是只看图级 op 名称。论文中的流程先对 TensorIR 函数做 analysis feedback，收集读写索引并分类为 <code>ElementWise</code>、<code>Broadcast</code>、<code>Injective</code>、<code>Reduction</code>、<code>OutputEwiseFusible</code> 或 <code>Opaque</code>。随后 <code>FuseOps</code> 根据这些 pattern kind 在 Relax 图中构造 fused subgraph function，例如把 elementwise op 融到 matmul 后处理里。最后 <code>FuseTensorIR</code> 做真正的跨层 transformation，把 fused subgraph 内的 TensorIR 程序合并，并用新的 <code>call_tir</code> 替换子图调用。</p>\n<p>这种三段式设计对 LLM 很实际。量化模型中常见 <code>decode_q4 -&gt; matmul -&gt; bias/relu</code>，其中 <code>decode_q4</code> 可能是自定义 TensorIR 程序，图级 IR 未必有一个标准 op 名称能表达它。Relax 通过低层索引模式判断它是否可融合，而不是要求所有自定义程序都先抽象成高层算子。其融合合法性可以理解为：</p>\n<div class=\"kb-math kb-math-display\">\\text{CanFuse}(p,c)=\n\\text{Pattern}(p)\\in\\{\\text{ElementWise},\\text{Broadcast},\\text{Injective}\\}\n\\land \\text{ShapeRel}(p,c)\\ \\text{可证明}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\text{ShapeRel}(p,c)</span> 依赖符号形状系统。例如 producer 输出 <code>(n, 4)</code>、consumer 读取 flatten 后 <code>(4n)</code>，如果 Relax 能证明两者元素数一致，就可以继续做融合和 buffer 复用。</p>\n<p><strong>动态内存规划：把 unknown 变成可比较的符号容量</strong></p>\n<p>静态 shape 编译器通常根据 tensor 字节数和生命周期复用内存，但动态 shape 会迫使系统退回运行时 allocator。Relax 的动态 shape-aware memory planning 先把 <code>call_tir</code> 和库调用降成显式 allocation 与 DPS call，再做 liveness analysis，并在 storage pool 中按符号 shape 请求复用。两个 tensor <span class=\"kb-math kb-math-inline\">a,b</span> 可以复用 storage 的基本条件是生命周期不重叠，且容量关系可在符号假设下证明：</p>\n<div class=\"kb-math kb-math-display\">\\text{Reuse}(a,b) \\Leftarrow\nLive(a)\\cap Live(b)=\\varnothing\n\\land\nBytes(a)\\le Capacity(b)</div>\n<p>如果 <span class=\"kb-math kb-math-inline\">Bytes(a)=4\\cdot n\\cdot \\text{sizeof}(f32)</span>，<span class=\"kb-math kb-math-inline\">Bytes(b)=8\\cdot n\\cdot \\text{sizeof}(f32)</span>，在 <span class=\"kb-math kb-math-inline\">n&gt;0</span> 的形状约束下就能证明前者可放入后者容量。论文的内存规划算法会在 tensor allocation 处调用 <code>RequestReuseWithSymShape(shape, dtype)</code>，若无可复用 storage 才新建分配；当 liveness 判断某个 tensor 在当前 op 后死亡，就回收到 pool。这样动态形状模型也能预分配和复用大块内存，减少频繁 runtime allocation。</p>\n<p><strong>Workspace lifting、CUDA Graph 和 VM lowering：跨层信息带来端到端收益</strong></p>\n<p>Relax 的 cross-level transform 还包括 tensor program workspace lifting。某个 TensorIR 程序经过低层分析后可能需要临时 workspace，传统做法是在低层程序内部临时分配，这会让图级 memory planning 看不见它。Relax 可以把 workspace allocation 提升到图级，修改 TensorIR 函数签名，让 workspace 作为参数传入。这样 workspace 也能参与全局 liveness 和 storage reuse。</p>\n<p>CUDA Graph offloading 也是同一逻辑的延伸。CUDA Graph 要求被捕获 kernel 访问的全局内存大小稳定并提前分配，动态 shape 通常不满足。Relax 在静态内存规划之后，已经能为动态 tensor 使用上界或符号规划出的预分配 storage，因此可以识别满足条件的子图，插入 capture/replay builtin，把原本只适合静态模型的 CUDA Graph 扩展到一部分动态 workload。最后，Relax 将图级程序降为虚拟机指令序列，每条指令调用生成函数或 builtin，同时把 GPU 代码、TensorIR 编译结果和库调用打包成一个端到端模块。</p>\n<p><strong>与 Relay 的区别：表达力从“函数式图”推进到“动态跨层程序”</strong></p>\n<p>Relay 的核心贡献是用函数式 IR 表达高层计算图、控制流和类型系统；Relax 继承 TVM 生态，但问题意识已经转向 LLM 时代的动态形状和跨层优化。Relay 中动态 shape 往往停留在 unknown 标注，Relax 则把符号 shape 变成 annotation 和运行时值；Relay 的图级优化和 TensorIR 降级更像前后阶段，Relax 则允许 <code>call_tir</code>、<code>call_dps_library</code>、partial lowering、workspace lifting 在同一 IR 中反复组合。它不是单纯“更高层的 Relay”，而是一个让图级、loop 级、库级优化相互反馈的端到端抽象。</p>\n<div class=\"key-point\">💡 关键：Relax 的核心不是只支持动态 shape，而是保留动态 shape 之间的符号关系，并让这些关系贯穿图级函数、TensorIR、外部库和运行时内存规划。这样 AOT 编译也能服务 LLM 动态推理，而不必完全依赖 JIT。</div>",
      "quiz": {
        "q": "Relax 将符号形状作为一等公民的主要收益是什么？",
        "options": [
          "把所有动态维度都替换成固定常数",
          "保留动态维度之间的等式和表达式关系，使 fusion、跨函数推导和内存规划仍可静态分析",
          "禁止调用 TensorIR 或外部库函数",
          "只为训练阶段自动生成反向传播图"
        ],
        "answer": 1,
        "explain": "Relax 用符号表达式表示动态 shape，如 n、4n、n*m，并在函数和外部调用之间传播这些关系，从而让动态模型也能做 AOT 优化和静态内存复用。"
      }
    },
    {
      "id": "trinity",
      "num": 28,
      "name": "Trinity",
      "fullName": "Tile级等价饱和三维张量程序优化器 (Trinity)",
      "year": "2026",
      "org": "KAIST/FuriosaAI",
      "parent": "ansor",
      "paperUrl": "https://ina.kaist.ac.kr/publications",
      "projectUrl": "",
      "category": "tensor_ir",
      "motivation": "Tile级等价饱和联合优化代数、内存与计算编排",
      "summary": "Trinity 提出 tile 级等价饱和优化器，把代数等价、内存 I/O 和计算编排放进同一个可重写 IR 与 e-graph 搜索空间，解决图级优化和算子级调度分离导致的跨算子 tile 级优化缺失问题。",
      "keyPoints": [
        "<strong>三维联合优化</strong>：同时搜索 algebraic equivalence、memory I/O、compute orchestration，而不是先做图重写再交给算子调度器",
        "<strong>Tile 级 IR</strong>：把 <code>load</code>、<code>store</code>、<code>seq</code>、<code>loop</code>、<code>matmul</code>、<code>rsum</code>、<code>softmax</code> 等都表示为 tile 上的一等构造",
        "<strong>状态 IR 上的等价饱和</strong>：用 expression propagation、sequence canonicalization、semantic dependency check 让 e-graph 能安全处理显式内存和控制流",
        "<strong>两遍提取算法</strong>：先按 kernel 数提取 loop skeleton，再在固定执行上下文里按 FLOPs 提取 loop body，避免固定局部代价模型失效",
        "<strong>自动发现 fully fused attention</strong>：从朴素 Transformer 解码程序中自动把 QKV projection、reshape 和 attention 融入单 kernel",
        "<strong>后端落地</strong>：优化后的 Trinity IR 降到 Triton v3.4.0，最多提取 512 个候选并在真实硬件上 profiling 选择最优 kernel",
        "<strong>性能结果</strong>：论文在 Transformer 变体上报告相对 TensorRT 最高 2.09x、相对 TorchInductor 最高 2.35x、相对 Mirage 最高 3.07x 的加速"
      ],
      "detail": "<p><img alt=\"Trinity 三维联合优化流程示意\" src=\"https://quickchart.io/graphviz?format=png&amp;graph=digraph%20G%20%7B%20rankdir%3DLR%3B%20graph%20%5Bbgcolor%3D%22white%22%5D%3B%20node%20%5Bshape%3Dbox%2C%20style%3D%22rounded%2Cfilled%22%2C%20fillcolor%3D%22%23eef6ff%22%2C%20color%3D%22%23406080%22%2C%20fontname%3D%22Arial%22%5D%3B%20edge%20%5Bcolor%3D%22%23406080%22%5D%3B%20Input%20%5Blabel%3D%22Tensor%20program%22%5D%3B%20IR%20%5Blabel%3D%22Tile-level%20IR%0Aloads%2Fstores%20%2B%20loops%20%2B%20tile%20ops%22%5D%3B%20Sat%20%5Blabel%3D%22E-graph%20saturation%0Arewrite%20algebra%20%2B%20memory%20%2B%20orchestration%22%5D%3B%20Ext%20%5Blabel%3D%22Two-pass%20extraction%0Aloop%20skeleton%20then%20loop%20body%22%5D%3B%20Kern%20%5Blabel%3D%22Triton%20kernels%0Ahardware%20profiling%22%5D%3B%20Input%20-%3E%20IR%20-%3E%20Sat%20-%3E%20Ext%20-%3E%20Kern%3B%20%7D\" />\n<em>图：根据 Trinity 论文 Figure 1 的“三维优化空间”和论文系统流程重绘。官方论文 PDF 图源：<code>https://ina.kaist.ac.kr/assets/bibliography/Trinity.pdf</code>。</em></p>\n<pre><code class=\"language-python\"># Trinity 两遍提取算法的简化伪代码\ndef two_pass_extract(egraph, top_k):\n    semi_programs = []\n    max_kernel = 0\n\n    # Pass 1: 只选择 seq/loop 等 loop-structure 节点\n    # 代价用 outermost parallel loop 数量近似 kernel 数。\n    while len(semi_programs) &lt; top_k:\n        semi_programs.extend(extract_loop_structure(\n            egraph=egraph,\n            eclass=egraph.root,\n            max_kernel=max_kernel,\n        ))\n        max_kernel += 1\n\n    # Pass 2: loop skeleton 已固定，执行上下文也固定\n    # 此时可用 greedy extraction 选择 FLOPs per compute unit 最小的 loop body。\n    candidates = []\n    for skeleton in semi_programs[:top_k]:\n        body = greedy_extract_body(egraph, skeleton, cost=&quot;min_flops_per_unit&quot;)\n        candidates.append(assemble_program(skeleton, body))\n\n    return profile_on_hardware(lower_to_triton(candidates))\n</code></pre>\n<h5>1. 为什么要把优化粒度降到 tile</h5>\n<p>传统张量编译器通常拆成两层：图级优化器决定算子融合和代数重写，算子级调度器决定 tiling、parallelization 和 cache placement。这个接口看似清晰，但会丢掉 FlashAttention 这类优化真正依赖的信息：online softmax 不是单纯的代数公式变化，也不是单纯的 kernel fusion，而是同时改变 softmax 的计算顺序、把 <span class=\"kb-math kb-math-inline\">Q,K,V</span> tile 和 running statistics 留在片上内存、并让 key tile 的顺序循环与 query/head 维度的并行调度协调起来。论文把这一点总结成三个耦合维度：</p>\n<div class=\"kb-math kb-math-display\">\\text{program choice} =\n(\\text{algebraic equivalence},\\ \\text{memory I/O},\\ \\text{compute orchestration})</div>\n<p>只优化其中一个维度会过早承诺。例如图级系统可以看到 <span class=\"kb-math kb-math-inline\">\\operatorname{softmax}(QK^T)V</span>，但看不到中间 tile 是否能留在 SRAM；算子调度器能选择 tile size，却通常不能把 QKV projection 的循环和 attention 循环重排到同一个 kernel。Trinity 的核心判断是：tile 是硬件实际执行和内存复用的单位，因此 IR 必须在 tile 层同时暴露计算、内存和控制流。</p>\n<h5>2. Trinity IR 如何让三维优化都变成 rewrite</h5>\n<p>Trinity IR 的 tensor declaration 区分 <code>input</code>、<code>output</code> 和 <code>variable</code>：前两者对应全局内存读写，<code>variable</code> 是可能在片上或片外的中间 tile。索引表达式用 <code>tile n</code>、<code>full_tile</code>、<code>elem n</code> 等表示 tile 切片和循环变量；内存操作显式写成 <code>(load tensor idx)</code> 与 <code>(store tensor value idx)</code>；计算操作包括 <code>matmul</code>、<code>rsum</code>、elementwise op、reshape 类 op；控制流是 <code>(seq op1 op2)</code> 和 <code>(loop start end tile_n n body)</code>。一个 Trinity 程序因此不仅描述“算什么”，也描述“什么时候加载/存储 tile”和“哪些 tile 操作在同一个循环或 kernel 里执行”。</p>\n<p>举例说，一个被写回 HBM 的中间张量和一个在同一 kernel 内复用的中间 tile，在传统图 IR 里可能都是边上的 tensor；在 Trinity IR 里二者的差异由 <code>store</code> 和后续 <code>load</code> 是否跨 loop/kernel 体现。kernel 边界由外层 parallel loop 决定，memory placement 则按 load/store 的 loop 关系推导：跨 loop 或输入/输出张量走 off-chip，其余中间值尽量保留在 on-chip。这样，循环融合不只是减少 launch，也会改变内存放置；代数 factoring 不只是少算 FLOPs，也可能消除 loop-carried dependency，从而解锁进一步 fusion。</p>\n<h5>3. 状态 IR 上做 equality saturation 的三个保护</h5>\n<p>普通 equality saturation 假设表达式近似纯函数式，而 Trinity IR 有 <code>seq</code>、<code>load</code>、<code>store</code>。第一个问题是代数结构被内存操作切断：<code>store A (* 7 3)</code> 后再 <code>load A</code>，e-graph 看不到 <code>(/ (* 7 3) 7)</code> 这样的连续子树。Trinity 用 expression propagation 记录 store 写入的符号表达式，并把后续同 tile 的 load 补上等价表达式，让代数规则可以跨显式内存边界匹配。</p>\n<p>第二个问题是 <code>seq</code> 的结合方式会造成指数膨胀。若任意使用 <code>(seq (seq a b) c)</code> 与 <code>(seq a (seq b c))</code>，同一串语句会有大量括号形态，e-graph 为了匹配交换和重排规则会保存大量冗余等价类。Trinity 强制把 sequence 规范化成右结合形式：</p>\n<div class=\"kb-math kb-math-display\">\\operatorname{seq}(\\operatorname{seq}(a,b),c)\n\\Rightarrow\n\\operatorname{seq}(a,\\operatorname{seq}(b,c))</div>\n<p>第三个问题是正确性。loop fusion、loop insertion、store/load reorder 都必须避免跨迭代 RAW/WAW hazard。Trinity 用 egg 的 e-class analysis 给每个 e-class 维护 read/write region、alias、shape 和 loop-variable 依赖摘要，规则触发前先检查语义谓词。这样，代数规则仍按 tile value 的等价处理，涉及状态的规则则由依赖分析约束。</p>\n<h5>4. 两遍提取解决上下文相关代价</h5>\n<p>传统 e-graph extraction 会给每个 e-node 一个固定成本，然后用 greedy 或 ILP 选总代价最小的表达式。Trinity 的 tile IR 不满足这个假设：同一个 <code>load</code> 如果在同一个 kernel 内复用，代价接近片上访问；如果跨 kernel，则意味着 HBM 读写。同一个 <code>+</code> 如果处在顺序 loop 内，会按迭代次数重复；如果处在并行 loop 内，单计算单元成本又完全不同。</p>\n<p>因此 Trinity 先提取 loop skeleton。第一遍只关心 <code>seq</code>、<code>loop</code> 这类决定 kernel 边界的结构，用 outermost loop 数量估计 kernel count，得到若干 kernel 数少的 semi-expression。第二遍在 loop skeleton 固定后，执行上下文已知，再按每个计算单元 FLOPs 选择 loop body。最后所有候选被降到 Triton 并在目标 GPU 上 profiling。这个流程牺牲了一点全局最优保证，但把 <span class=\"kb-math kb-math-inline\">&gt;10^{17}</span> 级别的等价程序空间压到可落地的候选集合。</p>\n<h5>5. Fully fused attention 的机制</h5>\n<p>Trinity 的关键 case study 是从朴素解码 Transformer 自动发现 fully fused attention。朴素程序先做 QKV projection 和 reshape，再执行 attention。Trinity 首先在 attention 内融合 logit 和 reduce-sum；然后用分配律把依赖 accumulator 的除法移出矩阵乘循环；接着用 algebraic factoring 把 division 完全 hoist 到内层 <span class=\"kb-math kb-math-inline\">p</span>-loop 外，从而消除阻止 fusion 的 loop-carried dependency。这个阶段已经能重发现 FlashAttention 式 online softmax。</p>\n<p>更进一步，Trinity 把 QKV projection 和 reshape 也纳入同一循环结构。最后它利用 iteration-space reindexing 识别 <code>(loop 0 4096 128 n)</code> 与按 head 展开的循环在迭代次数上等价，把 <code>elem h</code> 对齐成 <code>elem n</code>，于是 QKV projection、reshape、attention 的 tile 数据流可以合成单 kernel。直觉上，Trinity 不再先为所有 head 物化 <span class=\"kb-math kb-math-inline\">Q,K,V</span>，而是按 head/tile 产生 <span class=\"kb-math kb-math-inline\">Q,K,V</span> 后立即流入 attention，避免写回中间张量和等待所有 head 完成。</p>\n<div class=\"key-point\">💡 关键：Trinity 的贡献不只是“用 e-graph 搜索更多 rewrite”，而是把 tile 内存行为和 loop/kernel 边界也放进 rewrite 对象中，使代数变化能反过来改变可融合性和内存放置。</div>",
      "quiz": {
        "q": "Trinity 为什么不能直接使用传统 e-graph 的固定 e-node 成本提取最优程序？",
        "options": [
          "因为 Trinity IR 不包含任何纯代数表达式",
          "因为 tile 操作的代价依赖 loop/kernel 上下文，例如同一个 load 可能是片上复用也可能是 HBM 访问",
          "因为 equality saturation 只能处理 CPU 程序，不能处理 GPU 程序",
          "因为 Triton 后端不支持 profiling"
        ],
        "answer": 1,
        "explain": "Trinity 的 load/store、loop 和计算节点成本都受 kernel 边界、并行映射和内存放置影响，所以先固定 loop skeleton，再提取 loop body。"
      }
    },
    {
      "id": "redfuser",
      "num": 29,
      "name": "RedFuser",
      "fullName": "级联归约算子自动融合框架 (RedFuser)",
      "year": "2026",
      "org": "Alibaba Cloud",
      "parent": "tvm",
      "paperUrl": "https://arxiv.org/abs/2603.10026",
      "projectUrl": "",
      "category": "tensor_ir",
      "motivation": "增量计算突破缓存限制，自动融合级联归约算子",
      "summary": "RedFuser 把 attention、MoE routing、FP8 per-token quantization + GEMM 等模式统一建模为级联归约，通过自动判定归约函数可分解性、生成融合/增量表达式并降到 TileLang GPU kernel，解决传统编译器难以自动融合多级依赖归约的问题。",
      "keyPoints": [
        "<strong>级联归约抽象</strong>：将多个有数据依赖的 reduction 表示为 chain of reduction trees，刻画每个归约对前序归约结果的依赖",
        "<strong>融合可行条件</strong>：要求 <span class=\"kb-math kb-math-inline\">F_i(X[l],D_i)</span> 可分解为 <span class=\"kb-math kb-math-inline\">G_i(X[l]) \\otimes_i H_i(D_i)</span>，并满足单调代数结构和 distributivity",
        "<strong>ACRF 自动融合算法</strong>：用固定点分析检查函数是否可分解，并自动实例化 fused expression 与 incremental expression",
        "<strong>增量计算形式</strong>：把完整缓存前一级输出改为 streaming update，使片上存储从 <span class=\"kb-math kb-math-inline\">O(L_{k-1})</span> 降到 <span class=\"kb-math kb-math-inline\">O(1)</span>",
        "<strong>两类 GPU 策略</strong>：Single-Segment 在单 CTA 内流式完成长序列归约，Multi-Segment 用多个 CTA 并行处理并合并 partial results",
        "<strong>TVM/TileLang 集成</strong>：从 PyTorch/Relax/TIR 识别级联归约子图，tensorization 到 TileOp，再由 TileLang 做线程映射、pipeline、MMA/WGMMA/TMA 等硬件优化",
        "<strong>覆盖场景</strong>：论文展示 MHA/MLA、MoE routing、FP8 Quant+GEMM，以及 variance、moment of inertia 等非 ML 级联归约"
      ],
      "detail": "<p><img alt=\"RedFuser 级联归约融合前后对比\" src=\"https://arxiv.org/html/2603.10026v1/figs/fuse.png\" />\n<em>图：RedFuser 将相邻 reduction tree 在同一层融合，输入只加载一次，并减少对前序归约结果的重复内存访问。来源：论文 Figure 3(b)</em></p>\n<pre><code class=\"language-python\"># RedFuser Automatic Cascaded Reductions Fusion (ACRF) 简化伪代码\ndef acrf(F_i, reduce_op):\n    # 1. 根据归约算子选择兼容的乘法型操作 otimes_i\n    # max/min/topk -&gt; +, sum/gemm/inner_product -&gt; *, prod 可转到 log-sum\n    otimes = lookup_compatible_operator(reduce_op)\n\n    # 2. 固定点分析：选择常量输入，使 F_i(x0, d0) 在 otimes 下可逆\n    x0, d0 = choose_fixed_point(F_i, otimes)\n    if not is_invertible(F_i(x0, d0), otimes):\n        return &quot;NotFusable&quot;\n\n    # 3. 检查可分解恒等式\n    # F(x,d) otimes F(x0,d0) == F(x,d0) otimes F(x0,d)\n    if not symbolic_equal(\n        otimes(F_i(&quot;x&quot;, &quot;d&quot;), F_i(x0, d0)),\n        otimes(F_i(&quot;x&quot;, d0), F_i(x0, &quot;d&quot;)),\n    ):\n        return &quot;NotFusable&quot;\n\n    # 4. 自动构造 G 和 H，并实例化融合/增量表达式\n    G = lambda x: F_i(x, d0)\n    H = lambda d: otimes(F_i(x0, d), inverse(F_i(x0, d0), otimes))\n\n    fused = instantiate_fused_reduction(G, H, reduce_op, otimes)\n    incremental = instantiate_incremental_reduction(G, H, reduce_op, otimes)\n    return fused, incremental\n</code></pre>\n<h5>1. 级联归约为什么难以自动融合</h5>\n<p>普通 elementwise fusion 的依赖是逐元素的，producer 和 consumer 通常可以按相同索引合并。级联归约不同：第 <span class=\"kb-math kb-math-inline\">i</span> 个归约需要等待前 <span class=\"kb-math kb-math-inline\">i-1</span> 个归约的根节点结果 <span class=\"kb-math kb-math-inline\">D_i=\\{d_1,\\dots,d_{i-1}\\}</span>。例如 safe softmax 先做 max reduction 得到 <span class=\"kb-math kb-math-inline\">m</span>，再用 <span class=\"kb-math kb-math-inline\">m</span> 做 exp-sum reduction 得到 <span class=\"kb-math kb-math-inline\">t</span>，最后用 <span class=\"kb-math kb-math-inline\">m,t</span> 归一化并乘 <span class=\"kb-math kb-math-inline\">V</span>。传统并行归约会把每个 reduction 拆成多级树，每级产生 partial results，多个 reduction tree 被串成链后，后一个 tree 往往要重新读输入和前序根节点结果。</p>\n<p>RedFuser 的形式化定义是：</p>\n<div class=\"kb-math kb-math-display\">d_i = \\underset{l=1}{\\overset{L_0}{R_i}} F_i(X[l],D_i)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">R_i</span> 是第 <span class=\"kb-math kb-math-inline\">i</span> 个归约，底层结合算子是 <span class=\"kb-math kb-math-inline\">\\oplus_i</span>。如果只按这个定义执行，<span class=\"kb-math kb-math-inline\">d_i</span> 的计算必须等待 <span class=\"kb-math kb-math-inline\">D_i</span> 的最终根节点，无法把不同 reduction 的同层 partial results 放在一起处理。这正是 FlashAttention 手写 online softmax 能快、通用编译器却难以自动复现的原因。</p>\n<h5>2. 融合的代数条件和固定点分析</h5>\n<p>RedFuser 的核心是把 <span class=\"kb-math kb-math-inline\">F_i</span> 拆成输入相关部分和依赖结果相关部分：</p>\n<div class=\"kb-math kb-math-display\">F_i(X[l],D_i)=G_i(X[l])\\otimes_i H_i(D_i)</div>\n<p>同时要求 <span class=\"kb-math kb-math-inline\">(S,\\otimes_i)</span> 是交换幺半群，并且归约算子 <span class=\"kb-math kb-math-inline\">\\oplus_i</span> 对 <span class=\"kb-math kb-math-inline\">\\otimes_i</span> 满足分配律：</p>\n<div class=\"kb-math kb-math-display\">(s_1\\oplus_i s_2)\\otimes_i s_3\n=\n(s_1\\otimes_i s_3)\\oplus_i(s_2\\otimes_i s_3)</div>\n<p>在一般函数空间里自动找 <span class=\"kb-math kb-math-inline\">G_i,H_i</span> 很难。论文利用 ML workload 的归约类型有限这一事实，把 max/topk/min/sum/gemm/prod 映射到少数兼容 <span class=\"kb-math kb-math-inline\">\\otimes_i</span>，再用固定点分析验证可分解性。若存在固定点 <span class=\"kb-math kb-math-inline\">(x_0,d_0)</span>，并且：</p>\n<div class=\"kb-math kb-math-display\">F_i(x,d)\\otimes_i F_i(x_0,d_0)\n=\nF_i(x,d_0)\\otimes_i F_i(x_0,d)</div>\n<p>则可取：</p>\n<div class=\"kb-math kb-math-display\">G_i(x)=F_i(x,d_0),\\qquad\nH_i(d)=F_i(x_0,d)\\otimes_i F_i(x_0,d_0)^{-1}</div>\n<p>这个判定可以用 SymPy 这类符号计算实现。它把“能不能融合”从人工规则变成了可检查的代数恒等式。</p>\n<h5>3. 从链式 reduction tree 到同层融合</h5>\n<p>在归约树第 <span class=\"kb-math kb-math-inline\">k</span> 层，RedFuser 不再让第 <span class=\"kb-math kb-math-inline\">i</span> 个 reduction 等前序 reduction 的最终根节点，而是让它依赖前序 reduction 在同一层、同一 segment 的 partial results。论文推导出的第 <span class=\"kb-math kb-math-inline\">k&gt;1</span> 层融合形式可概括为：</p>\n<div class=\"kb-math kb-math-display\">\\hat d_i^k =\n\\underset{j_{k-1}=l^k_{\\mathrm{1st}}}{\\overset{l^k_{\\mathrm{last}}}{R_i}}\n\\left(\n\\hat d_i^{k-1}\n\\otimes_i H_i(\\hat D^{k-1})^{-1}\n\\otimes_i H_i(\\hat D^k)\n\\right)</div>\n<p>直觉是：先把上一层 partial result 中“旧依赖上下文”的影响除掉，再乘上“当前层依赖上下文”的影响。这样，同一层上的多个 reduction tree 可以合并成一个更大的 tree，输入 <span class=\"kb-math kb-math-inline\">X</span> 和同层依赖 <span class=\"kb-math kb-math-inline\">\\hat D^k</span> 可以留在寄存器或 shared memory，而不是每个 reduction 都重新从全局内存读。</p>\n<p>如果 <span class=\"kb-math kb-math-inline\">H_i(\\cdot)</span> 在 <span class=\"kb-math kb-math-inline\">\\otimes_i</span> 下不可逆，RedFuser 在附录中给出 reversibility repair：不可逆时把 <span class=\"kb-math kb-math-inline\">H_i</span> 修正为幺元 <span class=\"kb-math kb-math-inline\">e</span>，保证表达式可计算，并在可逆区域保持与原式一致。这是让自动融合能覆盖工程边界情况的关键。</p>\n<h5>4. 增量计算突破片上缓存限制</h5>\n<p>融合表达式减少了重复内存访问，但非增量版本仍可能要缓存完整的上一层 outputs，片上空间随 <span class=\"kb-math kb-math-inline\">L_{k-1}</span> 增长。RedFuser 的 incremental form 把当前层输出写成 streaming state update。对第 <span class=\"kb-math kb-math-inline\">k&gt;1</span> 层，处理第 <span class=\"kb-math kb-math-inline\">L</span> 个输入后：</p>\n<div class=\"kb-math kb-math-display\">\\hat d^k[L]\n=\n\\hat d^k[L-1]\\otimes_i H_i(\\hat D^k[L-1])^{-1}\\otimes_i H_i(\\hat D^k[L])\n\\oplus_i\n\\hat d^{k-1}\\otimes_i H_i(\\hat D^{k-1})^{-1}\\otimes_i H_i(\\hat D^k[L])</div>\n<p>这说明状态只依赖前一时刻的 <span class=\"kb-math kb-math-inline\">\\hat d^k[L-1]</span>、当前输入 <span class=\"kb-math kb-math-inline\">\\hat d^{k-1}</span> 或 <span class=\"kb-math kb-math-inline\">X[L]</span>，以及当前依赖上下文。片上存储复杂度从 <span class=\"kb-math kb-math-inline\">O(L_{k-1})</span> 降为 <span class=\"kb-math kb-math-inline\">O(1)</span>。Attention 的特例就是 online softmax：维护 running max <span class=\"kb-math kb-math-inline\">m</span>、归一化分母 <span class=\"kb-math kb-math-inline\">t</span> 和输出累加 <span class=\"kb-math kb-math-inline\">O</span>，每读一个 key/value tile 就重新缩放旧状态并合入新 tile。</p>\n<h5>5. 编译器流水线和 GPU codegen</h5>\n<p>RedFuser 建在 TVM 上。前端把 PyTorch 等模型降到 Relax graph，识别 cascaded reduction 子图后降到 TIR；预处理包括 function inlining 和 loop reordering；再通过 AST visitor 抽取数学表达式，交给 ACRF。成功融合后，RedFuser 同时生成 Single-Segment 和 Multi-Segment 两类 TIR：前者用增量计算在单 CTA 内处理长序列，避免 inter-block 同步；后者把输入分成多个 segment 由多个 CTA 并行处理，再用融合公式合并 partial results。</p>\n<p>之后是 tensorization。RedFuser 把 scalar loop nest blockize 成 tile，显式插入 global I/O 的 load/store，推断 register/shared memory scope，并压缩 buffer footprint；随后把 tile 映射成 TileOp，例如 <code>copy</code>、<code>gemm</code>、<code>reduce</code>、<code>parallel</code>、<code>fill</code>。TileLang 再负责线程级 mapping、software pipeline、warp 间任务划分和硬件路径选择：Ampere 上用 <code>cp.async</code>/MMA，Hopper 上用 TMA/WGMMA，并做 vectorization 和 bank conflict avoidance。最终 auto-tuning 搜索 block tile size、threads per block、pipeline depth、segment 数等参数。</p>\n<div class=\"key-point\">💡 关键：RedFuser 不是为 FlashAttention 写死一条规则，而是把“online softmax 类技巧”抽象成可分解级联归约的通用代数转换，再用 TVM/TileLang 落到 GPU kernel。</div>",
      "quiz": {
        "q": "RedFuser 的增量计算形式主要解决什么问题？",
        "options": [
          "把所有归约都改成 elementwise 运算",
          "避免缓存完整前一级归约输出，使片上存储从 O(L) 降到 O(1)",
          "删除归约算子的结合律要求",
          "强制所有 kernel 只使用一个 warp"
        ],
        "answer": 1,
        "explain": "增量形式用上一状态和当前输入流式更新当前层 partial result，不需要把上一层全部结果保存在片上缓存中。"
      }
    },
    {
      "id": "nautilus",
      "num": 30,
      "name": "Nautilus",
      "fullName": "端到端自动调度张量编译器 (Nautilus)",
      "year": "2026",
      "org": "UIUC",
      "parent": "ansor",
      "paperUrl": "https://arxiv.org/abs/2604.14825",
      "projectUrl": "",
      "category": "tensor_ir",
      "motivation": "端到端自动调度生成FlashAttn级内核",
      "summary": "Nautilus 提出了一种三层 IR 逐级降低的全自动张量编译器架构，通过自动调度器（支持高级算子融合与滚动更新优化）和代数表达式重写，从数学规范自动生成匹敌甚至超越 FlashAttention-3 的高性能 GPU 注意力内核，在 NVIDIA GH200 上实现 1.22× 加速（对比 FlashAttn-2），在 RTX 5090 上实现 1.42× 加速（对比 PyTorch SDPA）。",
      "keyPoints": [
        "<strong>三层 IR 逐级降低架构</strong>：Scalar IR → VR-tile IR（新提出）→ MA-tile IR，实现从标量数学表达到 SIMD 瓦片代码的渐进式编译",
        "<strong>Block Graph 表示</strong>：融合数据依赖图与 AST 的混合图结构，精确追踪计算语句间的依赖关系，支撑调度决策",
        "<strong>自动调度器（Auto-Scheduler）</strong>：支持双层分块（bi-level tiling）、经典融合与滚动更新融合（rolling update，源自 Neptune）、数据局部化（共享内存/寄存器 + 重物化）、正则化等优化",
        "<strong>VR-tile IR 上的代数表达式重写</strong>：支持循环不变量外提（constant hoisting）、<code>exp → exp2</code> 转换、跨迭代除法-乘法消除等代数优化",
        "<strong>多后端自适应</strong>：同时支持 Triton、Tawa、TileLang 三种瓦片编译后端，自动选择最优后端",
        "<strong>自动调优器（Auto-Tuner）</strong>：基于 TVM MetaSchedule 的进化搜索 + 学习代价模型，每个配置仅需 256 次测量",
        "<strong>覆盖 5 个主流模型</strong>：ViT 1.2B、Llama2 7B、Qwen2 7B、Qwen3 8B、GLM-4 9B，支持 FP16/FP8 精度",
        "<strong>数值稳定性</strong>：与 FlashAttention（Tri-Dao）和 FlexAttention 数值误差相当（RMS 绝对误差 ~4.96×10⁻⁵）"
      ],
      "detail": "<h5>系统架构总览</h5>\n<p><img alt=\"Nautilus 系统架构图\" src=\"https://arxiv.org/html/2604.14825v1/x1.png\" />\n<em>图：Nautilus 编译流程——从 TVM TE 数学规范出发，经过 Block Graph 构建、自动调度、三层 IR 逐级降低，最终生成多后端 GPU 内核</em></p>\n<p>Nautilus 的输入是 TVM Tensor Expression (TE) 格式的数学规范，描述注意力算子的纯代数语义（如 softmax、矩阵乘法的组合）。编译器首先构建 <strong>Block Graph</strong>，然后由 <strong>自动调度器</strong> 在 Block Graph 上搜索最优调度策略，接着通过 <strong>三层 IR 逐级降低</strong> 生成最终的 GPU 内核代码。</p>\n<h5>Block Graph：混合依赖-AST 图</h5>\n<p>Block Graph 是 Nautilus 的核心中间表示之一，它将传统的数据依赖图与抽象语法树（AST）结合为统一结构：</p>\n<ul>\n<li><strong>节点</strong>：每个节点代表一个计算语句（compute statement），对应一个张量的定义</li>\n<li><strong>边</strong>：既表示数据依赖关系（哪个张量被哪个计算消费），也保留 AST 的层次结构信息</li>\n<li><strong>作用</strong>：为自动调度器提供精确的依赖分析基础，支持融合决策和分块策略</li>\n</ul>\n<h5>自动调度器（Auto-Scheduler）</h5>\n<p>自动调度器是 Nautilus 的核心创新之一，包含四个关键调度原语：</p>\n<p><strong>1. 双层分块（Bi-level Tiling）</strong></p>\n<p>将计算空间划分为两级瓦片：外层瓦片映射到 GPU 的线程块（thread block），内层瓦片映射到 warp 级别。分块大小是可调参数，由自动调优器搜索。</p>\n<pre><code class=\"language-python\"># 双层分块伪代码\nfor block_tile in outer_tiles:        # 映射到 GPU thread blocks\n    for warp_tile in inner_tiles:      # 映射到 warps\n        compute(block_tile, warp_tile)\n</code></pre>\n<p><strong>2. 算子融合（Operator Fusion）</strong></p>\n<p>支持两种融合策略：\n- <strong>经典融合</strong>：将多个算子合并到同一个内核中执行，减少全局内存读写\n- <strong>滚动更新融合（Rolling Update）</strong>：源自 Neptune 的高级融合策略，允许在线（online）计算模式——在注意力计算中，softmax 的归一化因子随着 KV 序列的迭代逐步更新，而非等待所有数据就绪后一次性计算</p>\n<div class=\"key-point\">💡 关键：滚动更新融合是 Nautilus 能自动发现 FlashAttention 风格内核的核心机制。FlashAttention 的核心思想正是通过在线 softmax 避免将完整的注意力矩阵写入全局内存。</div>\n<p><strong>3. 数据局部化（Data Localization）</strong></p>\n<p>将频繁访问的数据从全局内存提升到更快的存储层次：\n- <strong>共享内存（Shared Memory）</strong>：线程块内共享的片上缓存\n- <strong>寄存器（Registers）</strong>：每个线程私有的最快存储\n- <strong>重物化（Rematerialization）</strong>：当寄存器/共享内存不足时，选择重新计算而非缓存某些中间结果</p>\n<p><strong>4. 正则化（Regularization）</strong></p>\n<p>确保生成的调度方案符合下游瓦片后端（Triton/Tawa/TileLang）的约束条件，例如瓦片大小必须是 2 的幂、warp 数量限制等。</p>\n<h5>三层 IR 逐级降低</h5>\n<p>Nautilus 的编译管线通过三层 IR 实现从高层数学语义到底层 GPU 代码的渐进式转换：</p>\n<p><strong>Scalar IR（标量 IR）</strong></p>\n<p>最高层表示，直接对应数学公式。每个元素独立计算，没有瓦片或并行化的概念：</p>\n<pre><code class=\"language-python\"># Scalar IR 示例：注意力计算\nfor i in range(N):\n    for j in range(N):\n        S[i][j] = sum(Q[i][k] * K[j][k] for k in range(d))\n    m[i] = max(S[i][j] for j in range(N))\n    for j in range(N):\n        P[i][j] = exp(S[i][j] - m[i])\n    l[i] = sum(P[i][j] for j in range(N))\n    for j in range(d):\n        O[i][j] = sum(P[i][k] * V[k][j] for k in range(N)) / l[i]\n</code></pre>\n<p><strong>VR-tile IR（虚拟寄存器瓦片 IR）——核心创新</strong></p>\n<p>Nautilus 新提出的中间表示，类似于编译器中的 <code>mem2reg</code> 变换。关键特性：\n- 引入 <strong>for-loop 表达式</strong>：将循环体内的计算表示为带有归约语义的表达式\n- 支持 <strong>代数表达式重写</strong>：在瓦片级别应用代数优化规则\n- 作为 Scalar IR 和 MA-tile IR 之间的桥梁</p>\n<p>VR-tile IR 上的表达式重写规则包括：</p>\n<div class=\"kb-math kb-math-display\">\\text{exp}(x) \\rightarrow \\text{exp2}(x \\cdot \\log_2 e)</div>\n<div class=\"kb-math kb-math-display\">\\frac{a}{b} \\cdot b \\rightarrow a \\quad \\text{（跨迭代除法-乘法消除）}</div>\n<div class=\"kb-math kb-math-display\">\\text{loop-invariant hoisting: } \\forall i.\\, f(c) \\rightarrow c&#x27; = f(c);\\, \\forall i.\\, c&#x27;</div>\n<div class=\"key-point\">💡 关键：VR-tile IR 的设计使得 Nautilus 能在瓦片级别执行传统编译器在标量级别才能做的代数优化，这是其超越手写内核的关键能力之一。</div>\n<p><strong>MA-tile IR（内存感知瓦片 IR）</strong></p>\n<p>最低层表示，直接对应 SIMD 瓦片操作。MA-tile IR 是 Triton、Tawa、TileLang 等瓦片语言的超集：\n- 显式表示共享内存和寄存器的数据放置\n- 包含流水线（pipelining）和异步拷贝等硬件特性\n- 可直接翻译为任一后端的代码</p>\n<h5>多后端代码生成</h5>\n<p>Nautilus 支持三种瓦片编译后端，并自动选择性能最优的：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>后端</th>\n<th>特点</th>\n<th>适用场景</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>Triton</strong></td>\n<td>OpenAI 开发，生态成熟</td>\n<td>通用场景</td>\n</tr>\n<tr>\n<td><strong>Tawa</strong></td>\n<td>支持 Hopper/Blackwell TMA 指令</td>\n<td>长序列、新硬件</td>\n</tr>\n<tr>\n<td><strong>TileLang</strong></td>\n<td>基于 TVM，灵活性高</td>\n<td>短序列、小 batch</td>\n</tr>\n</tbody>\n</table></div>\n<p>自动调优器会为每种后端分别搜索最优参数，最终选择延迟最低的方案。</p>\n<h5>自动调优器（Auto-Tuner）</h5>\n<p>基于 TVM MetaSchedule 框架的进化搜索策略：\n- <strong>搜索空间</strong>：瓦片大小、warp 数量、流水线级数、后端选择等\n- <strong>代价模型</strong>：学习型代价模型预筛选候选方案\n- <strong>测量</strong>：每个配置编译并实际运行 256 次取中位数\n- <strong>时间开销</strong>：自动调度搜索通常 &lt; 1 分钟（得益于激进剪枝），自动调优 &lt; 10 分钟</p>\n<h5>实验评估</h5>\n<p><strong>硬件平台</strong>：NVIDIA GH200（Hopper 架构）和 NVIDIA RTX 5090（Blackwell 架构）</p>\n<p><strong>端到端模型性能（FP16 注意力层延迟）</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>平台</th>\n<th>对比 FlashAttn-2</th>\n<th>对比 PyTorch SDPA</th>\n<th>对比 FlexAttn</th>\n<th>对比 Tawa</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>GH200 FP16</td>\n<td><strong>1.22×</strong></td>\n<td><strong>1.23×</strong></td>\n<td><strong>1.13×</strong></td>\n<td><strong>1.05×</strong></td>\n</tr>\n<tr>\n<td>GH200 FP8</td>\n<td>—</td>\n<td>—</td>\n<td><strong>1.16×</strong></td>\n<td><strong>1.20×</strong></td>\n</tr>\n<tr>\n<td>RTX 5090 FP16</td>\n<td><strong>1.26×</strong></td>\n<td><strong>1.42×</strong></td>\n<td><strong>1.16×</strong></td>\n<td><strong>1.01×</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>关键发现</strong>：\n- ViT 模型获益最大（GH200 上对 SDPA 加速达 1.54×），因为 ViT 的注意力配置（少层、少头、小隐藏维度）不被基线系统充分优化\n- FP8 精度下优势更大，因为 Nautilus 能自动调整流水线级数（1-4 级）适配不同序列长度\n- 在 RTX 5090 长序列场景下，滚动更新优化提供了显著加速</p>\n<p><strong>消融实验</strong>（Global Attention, seq_len=256, GH200）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>配置</th>\n<th>延迟 (μs)</th>\n<th>相对完整系统</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Nautilus 完整系统</td>\n<td><strong>7.43</strong></td>\n<td>1.00×</td>\n</tr>\n<tr>\n<td>去除自动调优</td>\n<td>9.09</td>\n<td>0.82×</td>\n</tr>\n<tr>\n<td>去除自动调优 + 表达式重写</td>\n<td>9.45</td>\n<td>0.79×</td>\n</tr>\n<tr>\n<td>去除自动调度</td>\n<td>10.93</td>\n<td>0.68×</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ 注意：自动调度器贡献了最大的性能提升（去除后延迟增加 47%），表明高层调度决策比底层参数调优更为关键。</div>\n<p><strong>数值稳定性</strong>（使用 Qwen2.5 真实输入，FP64 参考实现）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>平均 RMS 绝对误差</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Nautilus</td>\n<td>4.96×10⁻⁵</td>\n</tr>\n<tr>\n<td>Tri-Dao Attention</td>\n<td>4.90×10⁻⁵</td>\n</tr>\n<tr>\n<td>FlexAttention</td>\n<td>5.02×10⁻⁵</td>\n</tr>\n</tbody>\n</table></div>\n<p>Nautilus 的数值误差与手写库相当，验证了其代数重写的正确性。</p>\n<h5>与相关工作的对比</h5>\n<ul>\n<li><strong>vs. Neptune</strong>：Neptune 受限于 Triton 后端的代码生成质量（在 Hopper/Blackwell 上仅达 Tawa/TileLang 的 0.5-0.8×），Nautilus 通过多后端支持克服了这一瓶颈</li>\n<li><strong>vs. Mirage</strong>：Mirage 是超优化器，搜索可能产生语义不等价的变换（需概率正确性检验），Nautilus 保证变换的正确性</li>\n<li><strong>vs. Flashlight</strong>：Flashlight 绑定 PyTorch TorchInductor + Triton，优化有限；Nautilus 提供完整的三层优化管线</li>\n<li><strong>vs. 手写库（cuDNN, FlashInfer）</strong>：Nautilus 在大多数配置下匹配或超越手写库性能</li>\n</ul>",
      "quiz": {
        "q": "Nautilus 的 VR-tile IR 在编译管线中的核心作用是什么？",
        "options": [
          "直接生成 GPU PTX 汇编代码",
          "作为标量 IR 和瓦片 IR 之间的桥梁，支持瓦片级别的代数表达式重写",
          "管理 GPU 共享内存的分配和释放",
          "实现多 GPU 之间的通信调度"
        ],
        "answer": 1,
        "explain": "VR-tile IR 是 Nautilus 新提出的中间表示，位于 Scalar IR 和 MA-tile IR 之间，其核心创新在于引入 for-loop 表达式，使得代数优化规则（如常量外提、exp→exp2 转换、跨迭代除法消除）能在瓦片级别执行。"
      }
    },
    {
      "id": "linear_layouts",
      "num": 31,
      "name": "Linear Layouts",
      "fullName": "F2域线性映射张量布局编译 (Linear Layouts)",
      "year": "2026",
      "org": "NVIDIA",
      "parent": "triton",
      "paperUrl": "https://arxiv.org/abs/2505.23819",
      "projectUrl": "",
      "category": "tensor_ir",
      "motivation": "F2域线性映射建模布局，自动推导布局转换消除组合爆炸",
      "summary": "Linear Layouts 将 Triton GPU 后端中的 tensor layout 统一表示为 \\(\\mathbb{F}_2\\) 上的线性映射，用矩阵组合、求逆和子空间分析自动处理 layout 定义、传播、转换、swizzle 和硬件指令 lowering，解决传统逐布局手写转换导致的组合爆炸和布局 bug。",
      "keyPoints": [
        "<strong>布局即线性映射</strong>：把 register/thread/warp 或 memory offset 的二进制位映射到逻辑 tensor 坐标位，所有运算在 <span class=\"kb-math kb-math-inline\">\\mathbb{F}_2</span> 上完成",
        "<strong>统一覆盖 Triton 布局族</strong>：Blocked、MMA、MMA input、Sliced、Unswizzled、Swizzled memory layout 都可表达为 linear layout",
        "<strong>组合式布局构造</strong>：用 composition、product、left division、right inverse 等矩阵运算替代手写 layout 接口",
        "<strong>通用 layout propagation</strong>：在 Triton GPU backend 中把 layout 作为一等对象，forward/backward 传播并插入或消除 layout conversion",
        "<strong>自动硬件 lowering</strong>：通过 <span class=\"kb-math kb-math-inline\">A^{-1}\\circ B</span>、left division 和子空间分析自动选择 vectorized load/store、ldmatrix/stmatrix、warp shuffle、swizzle 等路径",
        "<strong>最优 swizzling</strong>：构造共享内存布局以最大化读写向量化并最小化 bank conflict",
        "<strong>效果</strong>：论文报告修复多类 Triton legacy layout 问题，在微基准上最高 14.20x，在 265 个真实 benchmark case 上最高 1.40x、平均 1.07x"
      ],
      "detail": "<p><img alt=\"Linear Layouts 论文 Figure 1：两个 warp 上的不同布局\" src=\"https://arxiv.org/html/2505.23819v5/x1.png\" />\n<em>图：layout A 把 16x16 tensor 分布到两个 warp、32 个线程和每线程寄存器中，展示物理执行资源到逻辑 tensor 坐标的映射。来源：论文 Figure 1(a)</em></p>\n<pre><code class=\"language-python\"># Linear Layouts 的核心操作伪代码\nclass LinearLayout:\n    def __init__(self, matrix, in_labels, out_labels):\n        # matrix entries are in F2: add = xor, multiply = and\n        self.M = matrix\n        self.in_labels = in_labels      # e.g. Reg x Thr x Wrp\n        self.out_labels = out_labels    # e.g. tensor dim bits\n\n    def compose(self, other):\n        # self ∘ other, over F2\n        return LinearLayout(gf2_matmul(self.M, other.M),\n                            other.in_labels, self.out_labels)\n\n    def product(self, other):\n        # block diagonal direct product of independent layouts\n        return LinearLayout(block_diag(self.M, other.M),\n                            self.in_labels + other.in_labels,\n                            self.out_labels + other.out_labels)\n\n    def right_inverse(self):\n        # solve M X = I over F2; used to recover hardware indices\n        return LinearLayout(gf2_gaussian_elimination(self.M),\n                            self.out_labels, self.in_labels)\n\n\ndef convert_layout(src_A, dst_B):\n    # Convert values distributed by layout A into layout B.\n    # B is surjective, so choose a sparse right inverse to reduce movement.\n    X = dst_B.right_inverse().compose(src_A)\n    return lower_exchange_by_register_perm_shuffle_or_shared_memory(X)\n</code></pre>\n<h5>1. 为什么 GPU layout 适合用 <span class=\"kb-math kb-math-inline\">\\mathbb{F}_2</span> 表示</h5>\n<p>GPU tensor layout 本质上是“逻辑 tensor 元素由哪个 warp、thread、register 或 memory bank 持有”的映射。现代 GPU 的 warp size、tile size、寄存器分组、MMA/WGMMA operand shape 通常都是 2 的幂，因此坐标可以自然拆成二进制位。Linear Layouts 的定义是：</p>\n<div class=\"kb-math kb-math-display\">L:U\\rightarrow V</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">U,V</span> 是带标签的 <span class=\"kb-math kb-math-inline\">\\mathbb{F}_2</span> 向量空间。输入空间可以是 <span class=\"kb-math kb-math-inline\">\\mathrm{Reg}\\times \\mathrm{Thr}\\times \\mathrm{Wrp}</span>，输出空间可以是逻辑 tensor 的 <span class=\"kb-math kb-math-inline\">(i,j)</span> 坐标位。矩阵乘法在 <span class=\"kb-math kb-math-inline\">\\mathbb{F}_2</span> 上执行，也就是加法为 XOR、乘法为 AND。论文中的 layout A 可以写成矩阵 <span class=\"kb-math kb-math-inline\">A</span>，物理资源位向量 <span class=\"kb-math kb-math-inline\">v</span> 的逻辑位置为：</p>\n<div class=\"kb-math kb-math-display\">w=A v,\\qquad w_{0:3}=j,\\quad w_{4:7}=i</div>\n<p>这个表达把原本散落在 Triton 后端中的 layout 规则变成了一个可计算对象。比如 thread、warp 或 register 中的某一位是否影响 tensor 第 <span class=\"kb-math kb-math-inline\">i</span> 维，只需要看矩阵对应列；broadcast 或重复数据则表现为零列或非满射/非单射结构。</p>\n<h5>2. 组合、product、求逆如何消除手写转换爆炸</h5>\n<p>传统 Triton legacy layout 需要每个 layout 实现自己的接口，例如 elements per thread、contiguity、indexing、layout-to-layout conversion。若有 <span class=\"kb-math kb-math-inline\">N</span> 种布局，最坏需要 <span class=\"kb-math kb-math-inline\">O(N^2)</span> 个转换路径。Linear Layouts 用少数矩阵运算替代这些 case-by-case 代码。</p>\n<p>composition 表示连续布局变换：</p>\n<div class=\"kb-math kb-math-display\">L_2\\circ L_1:U\\rightarrow W,\\qquad\nM_{L_2\\circ L_1}=M_{L_2}M_{L_1}</div>\n<p>product 用 block diagonal 矩阵把独立子布局拼成更复杂布局：</p>\n<div class=\"kb-math kb-math-display\">M_{L_1\\times L_2}=\n\\begin{bmatrix}\nM_{L_1} &amp; 0\\\\\n0 &amp; M_{L_2}\n\\end{bmatrix}</div>\n<p>right inverse 用高斯消元求解 <span class=\"kb-math kb-math-inline\">MX=I</span>，用于从逻辑 tensor 坐标恢复硬件资源索引；left division 则检查一个布局是否能分解出某个硬件指令 tile <span class=\"kb-math kb-math-inline\">T</span>。这些操作让 Blocked、MMA、Sliced、Swizzled 等布局共享同一套数学接口，而不是为每种组合手写 conversion。</p>\n<h5>3. Triton layout engine：anchor、传播和 rematerialization</h5>\n<p>集成到 Triton 后，Linear Layouts 先为一些操作分配 anchor layout：global memory load/store 往往偏向 blocked layout，<code>tt.dot</code> 这类操作需要 MMA/WGMMA 相关 layout。随后 layout engine 做 forward pass，把 layout 沿 use-chain 传播；遇到多输入冲突时按启发式合并或插入 conversion。再做 backward pass，把 conversion 沿 def-chain 反向 rematerialize；如果链上的操作足够便宜，就重算中间值而不是搬运 layout。</p>\n<p>这个机制的关键收益在 shape operations 上。<code>tt.trans</code>、<code>tt.reshape</code>、<code>tt.join</code>、<code>tt.split</code>、<code>tt.expand_dims</code>、<code>tt.broadcast</code> 等操作在合适 layout 下可以是 no-op。论文证明 distributed layout 家族对这些 shape op 前向/后向闭包。legacy Triton 不能表示“转置后的 MMA layout”这类布局，因此常常插入不必要的 shared memory conversion；linear layout 可以直接生成新的矩阵表示，让 layout propagation 穿过 shape op。</p>\n<h5>4. 从矩阵转换到硬件指令</h5>\n<p>给定源 distributed layout <span class=\"kb-math kb-math-inline\">A</span> 和目标 layout <span class=\"kb-math kb-math-inline\">B</span>，layout conversion 是：</p>\n<div class=\"kb-math kb-math-display\">B^{-1}\\circ A</div>\n<p>因为 <span class=\"kb-math kb-math-inline\">B</span> 通常是满射而不一定可逆，编译器选择一个 right inverse，并用最小 Hamming weight 的解减少不必要的数据移动。如果变化只在 register 子空间内，lowering 成 register permutation；如果 warp 维度保持 identity，则可用 warp shuffle；如果必须经过 memory，则进一步选择 shared memory load/store、<code>ldmatrix</code>、<code>stmatrix</code> 等 SIMD primitive。</p>\n<p>对于某条 SIMD 指令，论文用 left division 判定能否 lowering：</p>\n<div class=\"kb-math kb-math-display\">\\text{instruction with tile }T\\text{ can lower layout }L\n\\iff L /_\\ell T\\text{ exists}</div>\n<p>直觉是：如果 layout 矩阵左侧能分解出硬件指令要求的小 tile，那么剩余矩阵描述的就是重复应用该指令覆盖整个 tensor 的方式。这个判定把 “这个 layout pair 是否能用 ldmatrix” 从手写模式匹配变成矩阵可除性检查。</p>\n<h5>5. 最优 swizzling 和 bank conflict</h5>\n<p>共享内存 layout 可写成：</p>\n<div class=\"kb-math kb-math-display\">M:\\mathbb{F}_2^v\\times \\mathbb{F}_2^b\\times \\mathbb{F}_2^s\\rightarrow \\mathbb{F}_2^d</div>\n<p>其中 Vec 表示向量化维度，Bank 表示 bank index，Seg 表示 segment index。目标是在最大化 vectorization 的同时，让不同 thread 在同一 transaction 中尽量访问不同 bank。论文用子空间 <span class=\"kb-math kb-math-inline\">P=\\operatorname{span}(M_{\\mathrm{Vec}}\\cup A_{\\mathrm{Bank}})\\cup\\operatorname{span}(M_{\\mathrm{Vec}}\\cup B_{\\mathrm{Bank}})</span> 描述潜在冲突空间，再寻找尽可能大的 segment 子空间 <span class=\"kb-math kb-math-inline\">H</span>，使得：</p>\n<div class=\"kb-math kb-math-display\">P\\cap \\operatorname{span}(H)=\\{0\\}</div>\n<p>如果这个交集非零，就意味着不同线程可能落到同一 bank 的不同 segment，产生 bank conflict。Linear Layouts 自动构造 swizzled memory layout <span class=\"kb-math kb-math-inline\">M</span>，在无法完全避免冲突时也选择冲突最小的补空间。这使得复杂 swizzle 不再是针对某个 MMA layout 的硬编码技巧，而是可由任意 linear layout 推导。</p>\n<h5>6. 工程效果：robustness 和性能同时提升</h5>\n<p>论文报告 legacy Triton 中约 12% GitHub issue 与 layout 相关。Linear Layouts 的价值不只在峰值性能，还在“任何可线性表达的 layout 都能走同一套 lowering”。例如 contiguous load/store 不再只靠“最快变化维”启发式，而是求最大 <span class=\"kb-math kb-math-inline\">u</span>，使得 <span class=\"kb-math kb-math-inline\">L^{-1}_{\\mathrm{Reg}}(i)=i</span> 对 <span class=\"kb-math kb-math-inline\">i\\le u</span> 成立；broadcast 后哪些 thread/warp 持有重复数据，可通过矩阵零列识别；mixed precision matmul 中 MXFP4 scale 的 broadcast 可由 reshape/transpose/broadcast 的 layout propagation 自动解决。</p>\n<p>在实验中，Triton-Linear 修复了多种 MMA Input、Sliced<MMA>、Custom layout 的 pass rate 问题，减少 shared memory 指令，并在 gather、layout conversion、MXFP4 matmul 等微基准上显著加速。真实 TritonBench 上的平均收益较小但稳定，这符合它的定位：它不是单个算子的特殊优化，而是让后端 layout 系统从手工枚举变成可组合的线性代数基础设施。</p>\n<div class=\"key-point\">💡 关键：Linear Layouts 把“布局是编译器后端里的特殊属性”改成“布局是 <span class=\"kb-math kb-math-inline\">\\mathbb{F}_2</span> 上可组合、可求逆、可分析的矩阵”，因此 conversion 和 hardware lowering 可以由通用算法推导。</div>",
      "quiz": {
        "q": "Linear Layouts 用 F2 线性映射表示 tensor layout 的核心好处是什么？",
        "options": [
          "让所有张量都必须按 row-major 存储",
          "把布局定义、组合、转换和硬件指令 lowering 统一成矩阵运算，避免为每对布局手写转换",
          "取消 Triton 中的所有 MMA/WGMMA 指令",
          "只支持没有 swizzle 的共享内存布局"
        ],
        "answer": 1,
        "explain": "布局被表示为 F2 上的矩阵后，composition、right inverse、left division 和子空间分析可以通用处理 layout propagation、conversion、vectorization 与 swizzling。"
      }
    },
    {
      "id": "event_tensor",
      "num": 32,
      "name": "Event Tensor",
      "fullName": "动态Megakernel编译统一抽象 (Event Tensor)",
      "year": "2026",
      "org": "ByteDance",
      "parent": "triton",
      "paperUrl": "https://arxiv.org/abs/2604.13327",
      "projectUrl": "",
      "category": "tensor_ir",
      "motivation": "符号变量统一动态Megakernel抽象",
      "summary": "Event Tensor 提出了一种将**事件（任务完成信号）组织为多维张量**的编译器 IR 抽象，使编译器能够以统一方式表达 tile 级细粒度依赖、符号化动态形状和数据依赖的动态性，从而将整个 LLM 推理子图编译为单个持久化 Megakernel，消除 kernel launch 开销并实现跨算子流水线化。",
      "keyPoints": [
        "<strong>Event Tensor 抽象</strong>：将事件（任务完成信号）组织为多维数组，作为编译器 IR 中的一等公民，以张量形式紧凑表达 tile 间的细粒度生产者-消费者依赖关系",
        "<strong>三大动态性支持</strong>：(1) 细粒度 tile 级依赖打破全局同步屏障；(2) 符号化形状支持避免按形状重编译；(3) 数据依赖动态性（如 MoE 路由）通过运行时事件更新与任务触发实现",
        "<strong>双调度策略</strong>：静态调度（预计算 SM 任务队列 + notify/wait 信号量）适用于可预测负载；动态调度（GPU 上轻量级 push/pop 任务调度器）适用于数据依赖的不规则负载",
        "<strong>ETC 编译器</strong>：基于 Apache TVM 实现的端到端编译流水线，将 Event Tensor 图变换为持久化 Megakernel，Event Tensor 降级为整数张量 + 硬件原子操作",
        "<strong>评估覆盖</strong>：GEMM+ReduceScatter/AllGather+GEMM 通信融合（最高 1.40x 加速）、MoE 层（最高 1.23x 加速）、端到端 LLM serving（Qwen3-30B-A3B 低 batch 下 1.48x/1.20x 优于 vLLM/SGLang）、warmup 时间从 583s/123s 降至 35s"
      ],
      "detail": "<p><img alt=\"Event Tensor 总览\" src=\"https://arxiv.org/html/2604.13327v1/x2.png\" />\n<em>图：Event Tensor 概览。(a) 细粒度依赖：生产者 tile 完成后通过 Event Tensor 通知消费者 tile；(b) 符号化形状动态性：Event Tensor 维度可为符号变量；(c) 数据依赖动态性：运行时根据 MoE 路由结果更新 Event Tensor 并触发任务。</em></p>\n<pre><code class=\"language-python\"># Algorithm 1: Static Scheduling Transformation in ETC (简化伪代码)\ndef static_scheduling_transform(mod, G):\n    &quot;&quot;&quot;\n    输入: mod — 包含 tile 级数据流图 G（带 Event Tensor 依赖）的模块\n    输出: 融合后的静态调度 megakernel\n    &quot;&quot;&quot;\n    mod_updated = mod.copy()\n    static_schedule = generate_static_schedule(G)       # 预计算每个 SM 的任务队列\n    fused_kernel = new_persistent_kernel()\n    fused_kernel.add_buffer(static_schedule)             # 将调度表嵌入全局内存\n\n    for task_grid in G:\n        fused_kernel.add_dispatch_logic(task_grid)       # 分派逻辑\n        for event in task_grid.in_edges:\n            fused_kernel.add_wait_logic(event)           # wait(): 自旋等待计数器归零\n        fused_kernel.add_tile_logic(task_grid)           # 实际 tile 计算\n        for event in task_grid.out_edges:\n            fused_kernel.add_notify_logic(event)         # notify(): 原子递减计数器\n\n    mod_updated.replace(G, fused_kernel)\n    return mod_updated\n\n# Algorithm 2: Dynamic Scheduling Transformation (简化伪代码)\ndef dynamic_scheduling_transform(mod, G):\n    mod_updated = mod.copy()\n    fused_kernel = new_persistent_kernel()\n    scheduler = GPUScheduler()                           # GPU 上的轻量级任务队列\n    fused_kernel.add_pop_logic(scheduler.f_pop_tasks)    # SM 空闲时 pop 就绪任务\n\n    for task_grid in G:\n        fused_kernel.add_dispatch_logic(task_grid)\n        fused_kernel.add_tile_logic(task_grid)\n        for event in task_grid.out_edges:\n            # 任务完成 → 原子递减 → 计数器归零时 push 消费者任务\n            fused_kernel.add_complete_on_logic(event, scheduler.f_push_tasks)\n\n    mod_updated.replace(G, fused_kernel)\n    return mod_updated\n</code></pre>\n<p><strong>动机与背景：GPU Kernel Launch 开销与粗粒度同步的瓶颈。</strong> 现代 LLM 推理（尤其是低 batch 解码阶段）中，单个 kernel 的计算时间可能仅有几十微秒，而每次 kernel launch 的开销为 5–10μs，这意味着 launch 开销可占总时间的显著比例。传统方案中，CUDA Graph 可以减少 launch 开销，但要求静态输入形状，无法处理 MoE 等数据依赖的动态工作负载。已有的 Megakernel 方案（如 MPK、TKMega）仅支持单 batch 密集模型推理，缺乏对动态形状和数据依赖动态性的系统化编译器支持。Event Tensor 的核心洞察是：<strong>将事件抽象为张量</strong>，使得编译器可以用统一的张量操作语义来表达、分析和变换 tile 间的细粒度依赖关系，从而将多个算子融合为单个持久化 Megakernel。</p>\n<p><strong>核心机制：Event Tensor 的三大能力。</strong> Event Tensor <span class=\"kb-math kb-math-inline\">E \\in \\mathbb{Z}^{d_1 \\times d_2 \\times \\cdots \\times d_n}</span> 是一个多维整数数组，其中每个元素 <span class=\"kb-math kb-math-inline\">E[i_1, i_2, \\ldots, i_n]</span> 是一个事件计数器，初始值等于其生产者任务的数量。生产者 tile 完成后调用 <code>notify()</code> 对计数器执行原子递减；消费者 tile 在执行前调用 <code>wait()</code> 自旋等待计数器归零。这一机制的关键优势在于：</p>\n<ol>\n<li>\n<p><strong>细粒度依赖</strong>：传统方案中，算子 A 和算子 B 之间存在全局同步屏障——B 必须等待 A 的所有 tile 完成。Event Tensor 将依赖粒度细化到 tile 级别：若 GEMM 的输出被按行分块，则 Reduce-Scatter 的第 <span class=\"kb-math kb-math-inline\">j</span> 个 tile 只需等待 GEMM 中产出第 <span class=\"kb-math kb-math-inline\">j</span> 行块的那些 tile 完成即可开始执行，实现了<strong>跨算子流水线化</strong>。形式化地，对于 GEMM（M 方向分 <span class=\"kb-math kb-math-inline\">m</span> 块，K 方向分 <span class=\"kb-math kb-math-inline\">k</span> 块）+ Reduce-Scatter 的融合，Event Tensor 形状为 <span class=\"kb-math kb-math-inline\">E \\in \\mathbb{Z}^{m}</span>，每个 <span class=\"kb-math kb-math-inline\">E[j]</span> 的初始计数为 <span class=\"kb-math kb-math-inline\">k</span>（即 GEMM 沿 K 维的分块数），当所有 <span class=\"kb-math kb-math-inline\">k</span> 个 GEMM tile 完成对第 <span class=\"kb-math kb-math-inline\">j</span> 行的累加后，<span class=\"kb-math kb-math-inline\">E[j]</span> 归零，RS 的第 <span class=\"kb-math kb-math-inline\">j</span> 个 tile 即可执行。</p>\n</li>\n<li>\n<p><strong>符号化形状动态性</strong>：Event Tensor 的维度可以是符号变量（如 <span class=\"kb-math kb-math-inline\">E \\in \\mathbb{Z}^{s}</span>，其中 <span class=\"kb-math kb-math-inline\">s</span> 在编译时未知）。编译器生成的代码中，notify/wait 的索引计算保留符号表达式，运行时绑定具体值即可，无需按形状重编译。对于静态调度，编译器采样一组代表性形状预计算调度表，未见形状复用下一个更大采样值的执行队列。</p>\n</li>\n<li>\n<p><strong>数据依赖动态性</strong>：MoE 中 token 到 expert 的路由在运行时才确定。ETC 引入 <code>topk</code> 和 <code>exp_indptr</code> 等运行时值来动态更新 Event Tensor 的内容和触发条件。例如，MoE 第一阶段 GroupGEMM 完成后，根据实际路由结果动态设置第二阶段 GroupGEMM 的 Event Tensor 计数器，实现了<strong>运行时自适应的依赖图</strong>。</p>\n</li>\n</ol>\n<p><strong>静态 vs 动态调度的权衡与编译流程。</strong> ETC 提供两种调度变换：静态调度将 tile 级任务预分配到每个 SM 的执行队列中（round-robin 策略），依赖通过 notify/wait 信号量处理，适用于通信融合等可预测负载（如 AllGather+GEMM 的环形算法）。动态调度在 GPU 上维护一个集中式任务队列，任务完成后通过原子操作将就绪的消费者任务 push 入队，空闲 SM 通过 pop 获取任务，适用于 MoE 等不规则负载。实验表明（Table 2-3），MoE 负载下动态调度比静态调度快最多 4%，而规则密集负载下静态调度比动态调度快 20%+（动态调度在分布式场景下的远程队列 push 开销显著）。ETC 的端到端编译流程为：计算图 → 图级优化（内存规划等）→ tile 级优化（指令映射、流水线策略）→ 静态/动态调度变换 → 持久化 kernel 代码生成 → 权重预取 pass → 静态调度表物化。最终，Event Tensor 被降级为普通整数张量，notify/wait 被降级为硬件原子操作（<code>atomicSub</code> + spin-wait），运行时状态仅包含整数张量和调度器任务队列，无需传统 task-graph 运行时的图物化开销。</p>\n<p><strong>实验亮点与关键数据。</strong> 在 8×NVIDIA B200 上的评估显示：(1) GEMM+ReduceScatter 和 AllGather+GEMM 融合分别取得最高 1.40x 加速（对比 cuBLAS+NCCL 非融合基线），超越 TP-Async、Triton-Dist 和 cuBLASMp；(2) Qwen3-30B-A3B 的完整 MoE 层在 1024 tokens 下取得 1.23x 加速（对比 Triton/FlashInfer 的多 kernel 方案）；(3) 端到端 serving 中，Qwen3-30B-A3B 在 batch=1 时 TPOT 比 vLLM 快 1.48x、比 SGLang 快 1.20x；(4) 模型 warmup 时间从 SGLang 的 583s、vLLM 的 123s 降至 35s（AOT 编译消除了 JIT/CUDA Graph capture 开销）。这些结果验证了 Event Tensor 抽象在统一处理细粒度依赖、形状动态性和数据依赖动态性方面的有效性。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：Event Tensor 的核心创新在于将\"事件\"提升为编译器 IR 中的一等张量类型，使得依赖关系可以像数据张量一样被索引、切片和符号化推导。这使得编译器能够自动完成从多 kernel 到单 Megakernel 的融合变换，而无需手工编写复杂的同步逻辑。</p>\n<p>⚠️ <strong>局限性</strong>：动态调度在分布式多 GPU 场景下的远程任务队列 push 开销较大（Table 3 显示动态调度比静态调度慢 15-20%）；编译器生成的 GEMM tile 在某些配置下不如 cuBLAS 优化充分；当前实现的 CPU 端 serving 引擎开销高于 SGLang 的高度优化调度器。</div>",
      "quiz": {
        "q": "Event Tensor 中 notify() 和 wait() 操作的底层实现机制是什么？",
        "options": [
          "notify() 执行原子加操作，wait() 检查计数器是否达到阈值",
          "notify() 执行原子递减操作，wait() 自旋等待计数器归零",
          "notify() 向全局队列 push 消息，wait() 从队列 pop 消息",
          "notify() 触发 CPU 端中断，wait() 阻塞 GPU 线程直到 CPU 响应"
        ],
        "answer": 1,
        "explain": "Event Tensor 被降级为整数张量，每个元素初始化为生产者数量。notify() 通过 atomicSub 递减计数器，wait() 自旋等待计数器归零，全部在 GPU 端通过硬件原子操作完成，无需 CPU 参与。"
      }
    },
    {
      "id": "triton_distributed",
      "num": 33,
      "name": "Triton-Distributed",
      "fullName": "分布式AI系统重叠内核编译器 (Triton-Distributed)",
      "year": "2026",
      "org": "Community",
      "parent": "triton",
      "paperUrl": "https://arxiv.org/abs/2504.19442",
      "projectUrl": "",
      "category": "tensor_ir",
      "motivation": "原生通信-计算重叠优化，64卡44x加速",
      "summary": "Triton-Distributed 将 OpenSHMEM 单边通信原语原生集成到 Triton 编译器中，提出 MPMD 编程模型（对称内存 + 信号交换 + 异步任务），使开发者仅用数百行 Python 代码即可编写计算-通信重叠内核，在 Nvidia/AMD GPU 上覆盖 AllGather、ReduceScatter、AllToAll 等 12 种分布式算子，性能达到或超越 FLUX、DeepEP 等手写 CUDA 实现。",
      "keyPoints": [
        "<strong>首个原生支持通信-计算重叠的编译器</strong>：在 Triton 编译栈中集成分布式通信能力，覆盖 13 项重叠优化技术（对比 FLUX 缺 4 项、NCCL 缺 7 项）",
        "<strong>MPMD 编程模型</strong>：基于三个核心概念——对称内存（Symmetric Memory）、信号交换（Signal Exchange）、异步任务（Async-Tasks），将通信与计算统一在 Python 级 DSL 中",
        "<strong>OpenSHMEM 单边通信标准</strong>：采用 <code>put/get/signal_set/signal_wait</code> 等 PGAS 原语，避免传统 MPI 双边通信的同步开销",
        "<strong>拓扑感知 Tile Swizzle</strong>：针对 Nvidia NVSwitch 和 AMD 全网格拓扑设计不同的 tile 调度策略，最大化互联带宽利用率",
        "<strong>低延迟协议（LL Protocol）</strong>：利用 <code>multimem_st</code> 广播指令和 8 字节原子 store/load 实现 <span class=\"kb-math kb-math-inline\">\\mu s</span> 级 AllGather，适用于推理场景",
        "<strong>跨平台支持</strong>：同一编程模型同时支持 Nvidia H800 和 AMD MI308X GPU，编译栈通过 bitcode 库适配不同后端",
        "<strong>12 种优化内核</strong>：涵盖 AG+GEMM、GEMM+RS、AG+MoE、MoE+RS、FlashDecode+AG、AllToAll 的节点内/跨节点变体，最高达 44.97× 加速（vs NCCL/RCCL）"
      ],
      "detail": "<h5>1. 问题背景与动机</h5>\n<p>在大规模分布式 AI 训练和推理中，计算（GEMM、Attention 等）与通信（AllGather、ReduceScatter、AllToAll）的重叠是提升端到端性能的关键。然而，现有方案存在以下问题：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方案</th>\n<th>问题</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>PyTorch + NCCL</td>\n<td>计算与通信完全串行，无重叠</td>\n</tr>\n<tr>\n<td>FLUX (手写 CUDA)</td>\n<td>高性能但代码量巨大、难以维护、仅支持 Nvidia</td>\n</tr>\n<tr>\n<td>DeepEP</td>\n<td>数千行 CUDA 实现 AllToAll，极难移植</td>\n</tr>\n<tr>\n<td>TileLink</td>\n<td>编译器方案但不支持跨节点通信</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>核心洞察</strong>：通信-计算重叠需要在<strong>编译器层面</strong>原生支持，而非在应用层手动拼接。Triton-Distributed 是首个将分布式通信作为一等公民集成到 tile-level 编译器中的系统。</div>\n<h5>2. 系统架构与编译栈</h5>\n<p><img alt=\"Triton-Distributed 编译栈\" src=\"https://arxiv.org/html/2504.19442v1/x2.png\" />\n<em>图：Triton-Distributed 编译流程——从 Python DSL 到多后端 GPU 代码</em></p>\n<p>编译流程分为四层：</p>\n<ol>\n<li><strong>Python DSL 层</strong>：用户使用 <code>@triton.jit</code> 装饰器编写内核，调用 <code>tl.extra.cuda.experimental_device_tensormap_create2d</code> 等通信原语</li>\n<li><strong>Triton IR 层</strong>：通信原语被 lower 为 Triton IR 中的 <code>ExternElementwiseOp</code></li>\n<li><strong>LLVM IR 层</strong>：通信原语通过链接预编译的 <strong>bitcode 库</strong>（包含 NVSHMEM/ROC_SHMEM 实现）转化为设备特定的 LLVM IR</li>\n<li><strong>后端代码生成</strong>：LLVM IR 编译为 PTX（Nvidia）或 AMDGCN（AMD）</li>\n</ol>\n<div class=\"warn-box\">⚠️ <strong>关键设计</strong>：通信原语不在 Triton IR 层做特殊处理，而是通过 bitcode 库在 LLVM IR 层链接，这使得添加新原语只需扩展 bitcode 库，无需修改编译器前端。</div>\n<h5>3. MPMD 编程模型的三个核心概念</h5>\n<pre><code class=\"language-python\"># === 核心概念 1: 对称内存 (Symmetric Memory) ===\n# 所有 rank 分配相同虚拟地址的共享内存区域\nT = symm_alloc(size)          # 每个 rank 分配对称内存\nremote_ptr = remote_ptr(T, r) # 获取 rank r 上 T 的远程指针\n# 可直接读写远程 rank 的内存，无需对端参与\n\n# === 核心概念 2: 信号交换 (Signal Exchange) ===\nS = symm_alloc(signal_size)   # 信号也存储在对称内存中\nset_signal(S + rank)          # 设置本地信号（通知数据就绪）\nwait_signal(S + r)            # 等待远程 rank 的信号\n# 信号机制实现生产者-消费者同步\n\n# === 核心概念 3: 异步任务 (Async-Tasks) ===\n# 不同 threadblock 映射到不同角色\nif BLOCK_ID &lt; num_comm_blocks:\n    # 通信任务：负责数据搬运\n    comm_task(...)\nelse:\n    # 计算任务：负责 GEMM 等计算\n    compute_task(...)\n# 通信和计算在硬件上空间并行执行\n</code></pre>\n<div class=\"key-point\">💡 <strong>MPMD vs SPMD</strong>：传统 Triton 采用 SPMD（所有 threadblock 执行相同程序），Triton-Distributed 采用 MPMD（不同 threadblock 可执行不同程序），这是实现通信-计算重叠的关键——通信 threadblock 和计算 threadblock 可以并行工作。</div>\n<h5>4. 通信原语体系</h5>\n<p>Triton-Distributed 的通信原语分为两类：</p>\n<p><strong>OpenSHMEM 标准原语</strong>（可移植）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>原语</th>\n<th>功能</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>shmem_put</code> / <code>shmem_get</code></td>\n<td>单边远程写/读</td>\n</tr>\n<tr>\n<td><code>shmem_signal_set</code> / <code>shmem_signal_wait</code></td>\n<td>信号设置/等待</td>\n</tr>\n<tr>\n<td><code>shmem_barrier_all</code></td>\n<td>全局屏障同步</td>\n</tr>\n<tr>\n<td><code>shmem_fence</code></td>\n<td>内存栅栏</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>非标准原语</strong>（平台特定，高性能）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>原语</th>\n<th>功能</th>\n<th>用途</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>consume_token</code></td>\n<td>无副作用的数据依赖</td>\n<td>建立编译器可见的依赖链</td>\n</tr>\n<tr>\n<td><code>notify</code></td>\n<td>轻量级通知</td>\n<td>替代重量级 barrier</td>\n</tr>\n<tr>\n<td><code>multimem_st</code></td>\n<td>NVLink 广播写</td>\n<td>1.5μs 内广播到节点内所有 rank</td>\n</tr>\n<tr>\n<td><code>atomic_add</code></td>\n<td>远程原子加</td>\n<td>ReduceScatter 中的远程归约</td>\n</tr>\n</tbody>\n</table></div>\n<h5>5. AllGather 的 Push 与 Pull 模式</h5>\n<pre><code class=\"language-python\"># ===== Push 模式 AllGather (Algorithm 1) =====\n# 每个 rank 主动将本地数据推送到所有其他 rank\ndef allgather_push(T, S, L, RANK, WORLD_SIZE):\n    # 1. 将本地数据 L 复制到对称内存 T 的对应位置\n    T[RANK * L.size : (RANK+1) * L.size] = L\n    set_signal(S[RANK])           # 通知本地数据就绪\n    barrier_all()                  # 确保所有 rank 可见\n\n    # 2. 将本地数据推送到每个远程 rank\n    for r in range(WORLD_SIZE):\n        if r != RANK:\n            remote_buf = remote_ptr(T, r) + RANK * L.size\n            remote_buf[:] = L              # 单边写入远程内存\n            set_signal(S[r] + RANK)        # 通知远程 rank\n\n# ===== Pull 模式 AllGather (Algorithm 2) =====\n# 每个 rank 主动从所有其他 rank 拉取数据\ndef allgather_pull(T, S, L, RANK, WORLD_SIZE):\n    T[RANK * L.size : (RANK+1) * L.size] = L\n    set_signal(S[RANK])\n    barrier_all()\n\n    for r in range(WORLD_SIZE):\n        if r != RANK:\n            remote_buf = remote_ptr(T, r) + r * L.size\n            local_dst = T + r * L.size\n            local_dst[:] = remote_buf[:]   # 从远程拉取\n            set_signal(S[r])\n</code></pre>\n<div class=\"key-point\">💡 <strong>Push vs Pull 权衡</strong>：Push 模式省去同步开销但数据到达顺序不可控；Pull 模式需要 barrier 确保远程数据就绪但可精确控制读取顺序。实际选择取决于下游计算是否需要特定数据顺序。</div>\n<h5>6. 低延迟 AllGather（推理场景）</h5>\n<p>推理场景中消息尺寸小，传播延迟是主要瓶颈。论文提出两项关键优化：</p>\n<p><strong>Multimem 广播</strong>：利用 Nvidia PTX 的 <code>multimem_st</code> 指令，一次写操作即可将数据广播到节点内所有 rank，耗时约 1.5μs（vs 循环 P2P 最差 1.5μs × 多跳）。</p>\n<p><strong>LL（Low-Latency）协议</strong>：利用 GPU 8 字节 store/load 的跨 rank 原子性，将数据和标志位打包在 8 字节中一起发送：</p>\n<div class=\"kb-math kb-math-display\">\\text{LL\\_packet} = [\\underbrace{\\text{data}}_{\\text{4 bytes}} \\| \\underbrace{\\text{flag}}_{\\text{4 bytes}}]</div>\n<p>接收端通过自旋锁检查 flag 是否等于期望值来判断数据是否到达，避免了额外的信号操作开销。</p>\n<div class=\"warn-box\">⚠️ <strong>LL 协议的代价</strong>：消息大小翻倍（因为 flag 占一半空间），因此仅适用于小消息场景。大消息仍使用标准 OpenSHMEM 原语。</div>\n<h5>7. 拓扑感知 Tile Swizzle 策略</h5>\n<p>Tile Swizzle 是控制 threadblock 到 tile 坐标映射顺序的优化，直接影响通信-计算重叠效率。</p>\n<p><strong>Nvidia H800（NVSwitch 拓扑）</strong>：任意两个 GPU 间带宽均为 200 GB/s，因此每步只需从一个 rank 拉取数据即可达到峰值带宽。Swizzle 策略为：每个 rank 从不同起始位置开始计算，逐步轮转拉取下一个 rank 的数据。</p>\n<p><strong>AMD MI308X（全网格拓扑）</strong>：每条链路仅 50 GB/s，需要同时从所有 7 个 rank 拉取数据才能达到聚合带宽 350 GB/s。Swizzle 策略为：将每个 chunk 进一步切分为 sub-chunk，每步同时从所有 rank 拉取一组 sub-chunk。</p>\n<pre><code>Nvidia Swizzle (4 ranks):\n  Step 1: Rank0→本地, Rank1→从Rank0拉, Rank2→从Rank1拉, Rank3→从Rank2拉\n  Step 2: Rank0→从Rank3拉, Rank1→本地, Rank2→从Rank0拉, Rank3→从Rank1拉\n  ...（轮转）\n\nAMD Swizzle (4 ranks, 从 Rank0 视角):\n  Step 1: 同时从 Rank1/2/3 拉取 sub-chunk_0\n  Step 2: 同时从 Rank1/2/3 拉取 sub-chunk_1\n  ...（并行拉取）\n</code></pre>\n<h5>8. 跨节点 GEMM+ReduceScatter 重叠</h5>\n<p>跨节点 GEMM+RS 是最复杂的重叠场景，分解为三个流水线阶段：</p>\n<div class=\"kb-math kb-math-display\">\\text{GEMM+RS}_{\\text{inter}} = \\underbrace{\\text{GEMM}}_{\\text{Stage 1}} \\rightarrow \\underbrace{\\text{Intra-Scatter}}_{\\text{Stage 2}} \\rightarrow \\underbrace{\\text{Inter-Reduce}}_{\\text{Stage 3}}</div>\n<ol>\n<li><strong>Stage 1 (GEMM)</strong>：计算产生 tile 级输出</li>\n<li><strong>Stage 2 (Intra-node Scatter)</strong>：通过 NVLink 将 tile 数据分发到节点内其他 rank（每个 rank 执行 7 次远程写 + 1 次本地拷贝，重复 2 次对应 2 个节点）</li>\n<li><strong>Stage 3 (Inter-node Reduce)</strong>：通过 IB 网络进行跨节点归约</li>\n</ol>\n<p>Swizzle 设计的关键是将 Stage 2 的本地拷贝步骤放在末尾，使得远程传输可以与计算最大程度重叠。</p>\n<h5>9. 性能评估</h5>\n<p>在 H800 和 MI308X GPU 集群上的关键性能数据：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>内核</th>\n<th>硬件</th>\n<th>对比基线</th>\n<th>加速比</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>AG+GEMM-inter</td>\n<td>16×H800</td>\n<td>PyTorch+NCCL</td>\n<td>1.33×</td>\n</tr>\n<tr>\n<td>GEMM+RS-inter</td>\n<td>16×H800</td>\n<td>PyTorch+NCCL</td>\n<td>1.42×</td>\n</tr>\n<tr>\n<td>AG+MoE-inter</td>\n<td>16×H800</td>\n<td>PyTorch+NCCL</td>\n<td><strong>26.50×</strong></td>\n</tr>\n<tr>\n<td>MoE+RS-inter</td>\n<td>16×H800</td>\n<td>PyTorch+NCCL</td>\n<td>5.16×</td>\n</tr>\n<tr>\n<td>AllToAll Dispatch</td>\n<td>8-64×H800</td>\n<td>DeepEP</td>\n<td>1.18×</td>\n</tr>\n<tr>\n<td>AllToAll Combine</td>\n<td>8-64×H800</td>\n<td>DeepEP</td>\n<td>1.44×</td>\n</tr>\n<tr>\n<td>AG+GEMM-intra</td>\n<td>8×MI308X</td>\n<td>PyTorch+RCCL</td>\n<td>1.09×</td>\n</tr>\n<tr>\n<td>GEMM+RS-intra</td>\n<td>8×MI308X</td>\n<td>PyTorch+RCCL</td>\n<td>1.16×</td>\n</tr>\n<tr>\n<td>Low-latency AG (PCIe)</td>\n<td>8×L20</td>\n<td>NCCL</td>\n<td><strong>3.11×</strong></td>\n</tr>\n<tr>\n<td>Low-latency AG (PCIe)</td>\n<td>16×L20</td>\n<td>NVSHMEM-64bit</td>\n<td>1.31×</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>开发效率对比</strong>：AllToAll 内核仅用数百行 Python 代码实现，而 DeepEP 需要数千行 CUDA 代码，且 Triton-Distributed 版本性能持平甚至更优。</div>\n<h5>10. 与现有方案的重叠能力对比</h5>\n<p>论文定义了 13 项重叠优化技术，各方案覆盖情况：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>优化技术</th>\n<th style=\"text-align: center;\">Triton-Distributed</th>\n<th style=\"text-align: center;\">FLUX</th>\n<th style=\"text-align: center;\">NCCL</th>\n<th style=\"text-align: center;\">TileLink</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Intra-node Swizzle</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">❌</td>\n<td style=\"text-align: center;\">✅</td>\n</tr>\n<tr>\n<td>Inter-node Swizzle</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">❌</td>\n<td style=\"text-align: center;\">❌</td>\n</tr>\n<tr>\n<td>NUMA Swizzle</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">❌</td>\n<td style=\"text-align: center;\">❌</td>\n<td style=\"text-align: center;\">❌</td>\n</tr>\n<tr>\n<td>Copy Engine</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">✅</td>\n</tr>\n<tr>\n<td>High-BW Link</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">✅</td>\n</tr>\n<tr>\n<td>Network Comm</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">❌</td>\n</tr>\n<tr>\n<td>PCIe Comm</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">❌</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">❌</td>\n</tr>\n<tr>\n<td>OpenSHMEM</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">❌</td>\n<td style=\"text-align: center;\">❌</td>\n<td style=\"text-align: center;\">❌</td>\n</tr>\n<tr>\n<td>Low-latency Protocol</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">❌</td>\n<td style=\"text-align: center;\">❌</td>\n<td style=\"text-align: center;\">❌</td>\n</tr>\n<tr>\n<td>Multimem</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">❌</td>\n<td style=\"text-align: center;\">❌</td>\n</tr>\n<tr>\n<td>Fusion</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">❌</td>\n<td style=\"text-align: center;\">✅</td>\n</tr>\n<tr>\n<td>CodeGen</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">❌</td>\n<td style=\"text-align: center;\">❌</td>\n<td style=\"text-align: center;\">✅</td>\n</tr>\n<tr>\n<td>Nvidia + AMD</td>\n<td style=\"text-align: center;\">✅</td>\n<td style=\"text-align: center;\">❌</td>\n<td style=\"text-align: center;\">❌</td>\n<td style=\"text-align: center;\">❌</td>\n</tr>\n<tr>\n<td><strong>覆盖数</strong></td>\n<td style=\"text-align: center;\"><strong>13/13</strong></td>\n<td style=\"text-align: center;\"><strong>9/13</strong></td>\n<td style=\"text-align: center;\"><strong>6/13</strong></td>\n<td style=\"text-align: center;\"><strong>6/13</strong></td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "Triton-Distributed 在 AMD MI308X GPU 上的 AllGather GEMM Swizzle 策略与 Nvidia H800 的关键区别是什么？",
        "options": [
          "AMD 使用 Push 模式而 Nvidia 使用 Pull 模式",
          "AMD 每步只从一个 rank 拉取数据以避免链路冲突",
          "AMD 每步同时从所有 rank 拉取 sub-chunk 以充分利用聚合带宽",
          "AMD 不需要 Swizzle 优化因为全网格拓扑天然均衡"
        ],
        "answer": 2,
        "explain": "AMD MI308X 采用全网格拓扑，每条链路仅 50 GB/s，需同时利用所有 7 条链路（聚合 350 GB/s）才能达到峰值带宽，因此每步需从所有 rank 并行拉取 sub-chunk；而 Nvidia H800 通过 NVSwitch 任意两卡间即可达 200 GB/s 峰值，每步只需从一个 rank 拉取即可。"
      }
    },
    {
      "id": "flashlight",
      "num": 34,
      "name": "Flashlight",
      "fullName": "PyTorch编译器注意力扩展 (Flashlight)",
      "year": "2026",
      "org": "Meta",
      "parent": "flash_attention",
      "paperUrl": "https://arxiv.org/abs/2511.03230",
      "projectUrl": "",
      "category": "hardware_specific",
      "motivation": "PyTorch编译器扩展支持多样注意力变体高效编译",
      "summary": "Flashlight 把 FlashAttention 风格的分块、融合和在线 softmax 优化下沉到 PyTorch `torch.compile`/TorchInductor 编译器中，让用户用普通 PyTorch 写多样注意力变体，也能自动生成融合的高性能 Triton kernel。",
      "keyPoints": [
        "<strong>编译器原生注意力优化</strong>：不要求用户改写到固定 attention template，而是直接分析普通 PyTorch attention 程序",
        "<strong>统一 Reduction IR</strong>：把 GEMM、softmax reduction、矩阵乘链都放进统一的 p-dimension/r-dimension 抽象中，打破 GEMM 的 fusion boundary",
        "<strong>结构融合与维度降级</strong>：允许把 producer 的并行维度降级为 fused kernel 的 reduction 维度，用少量并行度换掉中间张量物化",
        "<strong>代数化 reduction 变换</strong>：识别 softmax 中 max 与 sum-exp 的代数关系，把两遍稳定 softmax 改写为一遍在线 softmax",
        "<strong>面向 tile 的维度消除</strong>：在 tile 级 loop bound 为 1 时消除小维度，继续融合 <code>softmax(QK^T)V</code> 这类跨 tile 计算",
        "<strong>逻辑 grid 维度</strong>：扩展 TorchInductor 的调度表达能力，使 tiled reduction 和后续 matmul 可以在同一 Triton kernel 中组织",
        "<strong>支持超出 FlexAttention 模板的变体</strong>：覆盖 differential attention、Evoformer row/column gated self-attention、IPA、RSA 等更复杂数据依赖模式"
      ],
      "detail": "<div class=\"warn-box\">⚠️ 资料说明：输入 YAML 中的 <code>https://arxiv.org/abs/2511.03230</code> 当前指向一篇物理论文；Flashlight 的实际论文页面是 <code>https://arxiv.org/abs/2511.02043</code>，下面基于该论文与其 arXiv HTML 精读完成。</div>\n<p><img alt=\"Flashlight 编译器扩展示意\" src=\"https://arxiv.org/html/2511.02043v4/content/figure/flashlight_overview.png\" />\n<em>图：Flashlight 在 <code>torch.compile</code>/TorchInductor 中加入结构融合、语义融合、维度降级、代数变换和 tile-aware 维度消除，最终生成融合 Triton kernel。来源：论文 Figure 1。</em></p>\n<pre><code class=\"language-python\"># Flashlight 编译与融合流程伪代码\ndef compile_with_flashlight(py_attention_fn, example_inputs):\n    # 1. PyTorch 程序捕获\n    fx_graph = torchdynamo_trace(py_attention_fn, example_inputs)\n    ir = torchinductor_lower_to_loop_ir(fx_graph)\n\n    # 2. 统一 reduction IR：GEMM 也表示为 reduction\n    for node in ir.nodes:\n        node.sketch = classify_dims(node)  # [(P0, P1, ...), (R0, R1, ...)]\n        if is_matmul(node):\n            # C[m,n] = sum_k A[m,k] * B[k,n]\n            node.parallel_dims = [m, n]\n            node.reduction_dims = [k]\n\n    # 3. 全局图重写，顺序可组合\n    changed = True\n    while changed:\n        changed = False\n        changed |= structural_fusion_with_dimension_demotion(ir)\n        changed |= semantic_fusion_with_algebraic_rewrite(ir)\n        changed |= tiling_aware_dimension_elimination(ir)\n        changed |= introduce_logical_grid_dims(ir)\n\n    # 4. 后端调度与代码生成\n    schedule = tile_and_schedule(ir)\n    triton_kernel = emit_triton(schedule)\n    return triton_kernel\n\ndef online_softmax_update(m, s, x):\n    # 一遍 reduction 中同时维护 running max 与 running sum\n    m_new = max(m, x)\n    s_new = s * exp(m - m_new) + exp(x - m_new)\n    return m_new, s_new\n</code></pre>\n<p><strong>动机与背景：FlexAttention 解决了模板内的注意力变体，但没有解决“任意 PyTorch 代码自动变快”的问题。</strong> FlashAttention 证明了手写 fused kernel 可以把 attention 的中间矩阵留在片上内存，但它主要面向标准 attention。FlexAttention 进一步提供 <code>score_mod</code>/<code>mask_mod</code> 风格的模板，让 causal、sliding window、ALiBi、softcap 等模式更容易生成高性能 kernel；问题是用户必须把算法表达成模板接受的形式。Flashlight 的目标更激进：研究者继续写普通 PyTorch，例如先构造 mask、再调用 attention，或者组合两个 attention head 做 differential attention，编译器自动发现可融合子图并生成 FlashAttention 式 kernel。</p>\n<p><strong>统一 Reduction IR 是第一步：把 GEMM 从“特殊库调用”拉回可融合图。</strong> TorchInductor 原本会把矩阵乘交给高性能 Triton template、ATen 或 cuBLAS，这保证了单个 GEMM 很快，却也形成了优化边界：<code>QK^T</code> 的输出必须先成为一个独立张量，后续 softmax、mask、乘 <code>V</code> 很难继续深度融合。Flashlight 把矩阵乘也表示成 reduction：</p>\n<div class=\"kb-math kb-math-display\">C_{mn}=\\sum_k A_{mk}B_{kn}.</div>\n<p>这里 <span class=\"kb-math kb-math-inline\">m,n</span> 是可并行的 p-dimensions，<span class=\"kb-math kb-math-inline\">k</span> 是需要累加的 r-dimension。这样，GEMM、row max、sum-exp、第二个 GEMM 都共享同一类 loop-level 语义，编译器才能在同一个 IR 中讨论“哪些维度外层并行、哪些维度内层 reduction、哪些 producer/consumer 可以合并”。</p>\n<p><strong>结构融合的关键是维度降级。</strong> 若一个 producer 的输出维度在 consumer 中变成 reduction 维度，传统“相同 loop sketch 才能融合”的规则会失败。Flashlight 允许把 producer 的某个 p-dimension 转成 fused kernel 的 r-dimension：</p>\n<div class=\"kb-math kb-math-display\">[(P_{\\text{common}},P_{\\text{producer}}),(\\cdots)]\n\\;\\Longrightarrow\\;\n[(P_{\\text{common}}),(P_{\\text{producer}},\\cdots)].</div>\n<p>直觉是：并行 loop 也可以顺序执行。把它放进内层 reduction 后，producer 的中间结果不再写 HBM，而是在寄存器或片上局部存储中立即被 consumer 消费。对 attention 来说，这能先把 <code>QK^T</code> 与 softmax 的 <code>max</code> reduction 粘在一起，虽然牺牲了一部分 producer 并行度，却省掉了大矩阵物化和 kernel 间读写。</p>\n<p><strong>语义融合负责把两遍稳定 softmax 改写成在线 softmax。</strong> 稳定 softmax 通常先求整行最大值 <span class=\"kb-math kb-math-inline\">m_{\\text{final}}</span>，再计算：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{softmax}(x_i)=\\frac{\\exp(x_i-m_{\\text{final}})}{\\sum_j \\exp(x_j-m_{\\text{final}})}.</div>\n<p>这看起来必须两遍扫描，因为第二遍依赖第一遍的最终最大值。Flashlight 利用指数函数的同态性质 <span class=\"kb-math kb-math-inline\">\\exp(x-y)=\\exp(x)/\\exp(y)</span>，把“依赖最终最大值”改成“依赖 running max 并在 max 变化时重缩放”。若旧统计量为 <span class=\"kb-math kb-math-inline\">(m_{\\text{old}}, s_{\\text{old}})</span>，新元素或新 tile 的最大值导致 <span class=\"kb-math kb-math-inline\">m_{\\text{new}}&gt;m_{\\text{old}}</span>，则旧和式修正为：</p>\n<div class=\"kb-math kb-math-display\">s_{\\text{new}}\n=s_{\\text{old}}\\exp(m_{\\text{old}}-m_{\\text{new}})\n+\\sum_{x\\in \\text{new tile}}\\exp(x-m_{\\text{new}}).</div>\n<p>这样 max reduction 与 sum-exp reduction 可以合并成单遍 loop，进一步为 <code>softmax(QK^T)</code> 的整块融合铺路。</p>\n<p><strong>tile-aware 维度消除让 <code>softmax(QK^T)V</code> 继续融合。</strong> GPU kernel 实际不是逐元素执行，而是按 tile 组织。某个维度 <span class=\"kb-math kb-math-inline\">D</span> 被 tile size <span class=\"kb-math kb-math-inline\">B_D</span> 分块后，tile 级 loop bound 是 <span class=\"kb-math kb-math-inline\">\\lceil D/B_D\\rceil</span>。如果 <span class=\"kb-math kb-math-inline\">B_D \\ge |D|</span>，这个维度在 tile 级只迭代一次，可以作为“可消除小维度”处理。Flashlight 借此把前一阶段 softmax 的 tile 输出直接交给后一阶段 <code>@ V</code>，不需要把每个 tile 的概率矩阵落到 HBM。逻辑 grid 维度则给 TorchInductor 一个更灵活的方式表达这些 tile 级调度，而不把所有维度都绑死在物理 CUDA/Triton grid 上。</p>\n<p><strong>与传统方法的差异在于优化边界。</strong> 手写 FlashAttention 把算法和 kernel 人工耦合；FlexAttention 把一批常见变体抽象为模板；Flashlight 把“发现 attention 子图、证明 reduction 可改写、决定维度是否降级、生成 fused tiled kernel”变成编译器问题。它不保证每个变体都比专门手写 kernel 快，因为过度融合可能增加寄存器压力或降低并行度；但它显著降低了新注意力变体从 PyTorch 原型到高性能实现的工程门槛。</p>",
      "quiz": {
        "q": "Flashlight 能把稳定 softmax 的两遍 reduction 融合成单遍在线 softmax，主要依赖什么性质？",
        "options": [
          "矩阵乘法满足交换律",
          "指数函数可把加减关系转成乘除重缩放关系",
          "Triton kernel 必须使用固定 tile size",
          "FlexAttention 的 block_mask 可以缓存"
        ],
        "answer": 1,
        "explain": "当 running max 改变时，旧的 sum-exp 可以乘以 exp(m_old-m_new) 重新归一化，因此 max 与 sum-exp 能在同一遍扫描中维护。"
      }
    },
    {
      "id": "flash_attention_4",
      "num": 35,
      "name": "FlashAttention-4",
      "fullName": "算法与Kernel流水线协同设计注意力 (FlashAttention-4)",
      "year": "2026",
      "org": "Tri Dao Lab",
      "parent": "flash_attention",
      "paperUrl": "https://arxiv.org/abs/2603.05451",
      "projectUrl": "",
      "category": "hardware_specific",
      "motivation": "算法与Kernel流水线协同设计，适配非对称硬件扩展",
      "summary": "FlashAttention-4 针对 Blackwell GPU 上 tensor core 变快而 shared memory 与指数单元相对滞后的非对称扩展，重新设计 attention 的前向/反向流水线、指数近似和 softmax 重缩放策略，在 B200 上把精确 attention 推到更接近硬件瓶颈的位置。",
      "keyPoints": [
        "<strong>面向 Blackwell 非对称硬件扩展</strong>：B200/GB200 的 BF16 tensor core 吞吐翻倍，但 SMEM 带宽、MUFU 指数单元等非 MMA 资源没有同比增长",
        "<strong>前向 ping-pong 流水线</strong>：利用 Blackwell fully asynchronous MMA 和 TMEM，让一个 Q tile 做 MMA 时，另一个 Q tile 做 softmax",
        "<strong>软件指数近似</strong>：用 FMA 单元执行 <span class=\"kb-math kb-math-inline\">2^x</span> 的 range reduction 与多项式近似，分担 MUFU.EX2 压力",
        "<strong>条件 softmax 重缩放</strong>：running max 增幅不足阈值时跳过中间 rescale，只在最终归一化时校正",
        "<strong>2-CTA backward</strong>：利用 Blackwell 2-CTA MMA 让两个 CTA 协作加载 operand B，减少 shared memory traffic，并重构 dQ 累加减少 global atomic add",
        "<strong>确定性 backward</strong>：通过 swizzle 与调度设计，在可复现实验/强化学习训练需要确定性时降低额外开销",
        "<strong>CuTe-DSL Python 实现</strong>：完整 kernel 用 Python 内嵌 CuTe-DSL 编写，相比 C++ template 系列显著缩短编译迭代时间"
      ],
      "detail": "<p><img alt=\"FlashAttention-4 前向流水线\" src=\"https://arxiv.org/html/2603.05451v1/Figures/FA4_FWD_p3.png\" />\n<em>图：FlashAttention-4 前向 pipeline。高/低两个 Q tile 交替推进，使 MMA、softmax、修正与数据搬运尽量重叠。来源：论文 Figure 1。</em></p>\n<pre><code class=\"language-python\"># FlashAttention-4 前向核心逻辑伪代码，表达算法思想而非真实 CuTe-DSL 代码\ndef fa4_forward(Q, K, V, block_m=256, block_n=128, tau_log2=8):\n    O = zeros_like(Q)\n    final_m = full((Q.rows,), -inf)\n    final_l = zeros((Q.rows,))\n\n    for q_pair in paired_q_tiles(Q, tile_rows=block_m):\n        # Blackwell TMEM 保存两个 accumulator tile，MMA 异步写入\n        pipe = PingPongPipeline(q_pair.high, q_pair.low)\n\n        for k_tile, v_tile in kv_tiles(K, V, tile_cols=block_n):\n            # tile A: tensor cores 计算 QK^T\n            pipe.launch_async_mma_for_scores(k_tile)\n\n            # tile B: softmax warpgroup 处理上一块 score\n            for row in pipe.ready_score_rows():\n                m_old, l_old = pipe.stats[row]\n                scores = row.scores\n                m_new = max(m_old, max(scores))\n\n                # 条件 rescale：max 变化很小时延迟修正，减少向量乘\n                if (m_new - m_old) &gt; tau_log2:\n                    l_old *= exp2(m_old - m_new)\n                    pipe.acc[row] *= exp2(m_old - m_new)\n                    m_used = m_new\n                else:\n                    m_used = m_old\n\n                p = mixed_exp2(scores - m_new)  # 部分 MUFU，部分 FMA 多项式\n                l_new = l_old + sum(p)\n                pipe.launch_async_mma_for_pv(p, v_tile)\n                pipe.stats[row] = (m_new, l_new)\n\n            pipe.advance()\n\n        O[q_pair] = pipe.normalize_by_true_stats()\n    return O\n\ndef mixed_exp2(x, emu_fraction=0.15):\n    # 硬件 MUFU.EX2 与 FMA 多项式近似混合使用\n    y = empty_like(x)\n    y[:emu_fraction] = polynomial_exp2_fma(x[:emu_fraction])\n    y[emu_fraction:] = hardware_mufu_exp2(x[emu_fraction:])\n    return y\n</code></pre>\n<p><strong>动机与背景：FlashAttention-3 的 Hopper 假设在 Blackwell 上不再成立。</strong> 早期 FlashAttention 系列主要解决 HBM IO 与 GPU 占用率问题。到了 Blackwell，BF16/FP16 tensor core 峰值显著提高，B200 每 SM 的 BF16 MMA 吞吐约为 8192 ops/clock，而 MUFU 指数吞吐仍约为 16 ops/clock/SM，SMEM read 带宽也没有等比例增长。结果是 attention 不再简单受限于矩阵乘，softmax 的 <code>exp</code>、running statistics、SMEM operand 读取和重缩放反而成为主要瓶颈。FA4 的核心判断是：当硬件扩展变得非对称时，attention 算法本身也必须改变，而不仅是把旧 kernel 移植到新指令。</p>\n<p><strong>基础 attention 与 backward 仍保持精确语义。</strong> 单 head 前向仍是标准 scaled dot-product attention：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{S}=\\alpha\\mathbf{Q}\\mathbf{K}^{\\top},\\qquad\n\\mathbf{P}=\\mathrm{softmax}(\\mathbf{S}),\\qquad\n\\mathbf{O}=\\mathbf{P}\\mathbf{V},</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\alpha=1/\\sqrt d</span>。反向可写为：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{dV}=\\mathbf{P}^{\\top}\\mathbf{dO},\\quad\n\\mathbf{dP}=\\mathbf{dO}\\mathbf{V}^{\\top},\\quad\n\\mathbf{dQ}=\\alpha\\mathbf{dS}\\mathbf{K},\\quad\n\\mathbf{dK}=\\alpha\\mathbf{dS}^{\\top}\\mathbf{Q}.</div>\n<p>因此 FA4 不是稀疏化或低精度近似 attention 的路线；它优化的是这些精确算子的执行顺序、流水线并行和非 MMA 单元压力。</p>\n<p><strong>前向流水线围绕 TMEM 与异步 MMA 重写。</strong> Blackwell 的 MMA 输出可以异步写入 Tensor Memory，而不是像 Hopper 那样主要占用寄存器 accumulator。FA4 用两个 Q tile 组成 ping-pong：当一个 tile 的 <span class=\"kb-math kb-math-inline\">QK^\\top</span> 或 <span class=\"kb-math kb-math-inline\">PV</span> 在 tensor core 上跑时，另一个 tile 的 softmax warpgroup 做 row max、指数、sum 和格式转换。论文的 roofline 估计给出典型 tile 的耗时：</p>\n<div class=\"kb-math kb-math-display\">T_{\\mathrm{MMA}}=\\frac{4MNd}{8192},\\qquad\nT_{\\exp}=\\frac{MN}{16}.</div>\n<p>当 <span class=\"kb-math kb-math-inline\">M=N=d=128</span> 时，MMA 与 exp 都约 1024 cycles；当 tile 增大到 <span class=\"kb-math kb-math-inline\">M=256,N=d=128</span> 时，两者都约 2048 cycles，SMEM 也升到约 1536 cycles。流水线设计的目标不是单独最小化某一项，而是让 MMA、softmax 和搬运尽可能同时占满各自资源。</p>\n<p><strong>指数近似把 MUFU 瓶颈搬到 FMA 单元上。</strong> Softmax 中的指数通常由 MUFU.EX2 完成，但这个单元吞吐远低于 tensor core。FA4 对一部分元素使用软件 <span class=\"kb-math kb-math-inline\">2^x</span>：</p>\n<div class=\"kb-math kb-math-display\">2^x=2^{\\lfloor x\\rfloor}\\cdot 2^{x-\\lfloor x\\rfloor},</div>\n<p>其中整数部分可通过浮点指数位操作得到，小数部分用多项式近似：</p>\n<div class=\"kb-math kb-math-display\">2^{x_{\\mathrm{frac}}}\\approx \\sum_{i=0}^{n}p_i x_{\\mathrm{frac}}^i,\\qquad x_{\\mathrm{frac}}\\in[0,1).</div>\n<p>多项式用 Horner/FMA 计算，可与 MUFU 并行使用。论文没有盲目把所有 exp 都软件化，因为寄存器压力、寄存器带宽和延迟会抵消收益；实际只对每行约 10% 到 25% 的条目做 emulation，剩余仍走硬件 MUFU。这是典型的 kernel co-design：算法近似的比例由硬件吞吐比和寄存器预算共同决定。</p>\n<p><strong>条件 softmax 重缩放减少非 matmul 向量操作。</strong> FlashAttention 的在线 softmax 在每个 block 维护 running max <span class=\"kb-math kb-math-inline\">m</span>、normalizer <span class=\"kb-math kb-math-inline\">\\ell</span> 和未归一化输出 <span class=\"kb-math kb-math-inline\">o</span>。当新 block 最大值升高到 <span class=\"kb-math kb-math-inline\">m&#x27;</span> 时，旧统计量通常需要乘：</p>\n<div class=\"kb-math kb-math-display\">r=\\exp(m-m&#x27;).</div>\n<p>FA4 观察到每次微小 max 增长都立即 rescale 会制造大量向量乘与数据移动，因此引入阈值 <span class=\"kb-math kb-math-inline\">\\tau</span>：只有当 <span class=\"kb-math kb-math-inline\">m&#x27;-m&gt;\\tau</span> 时才中间重缩放，否则延迟到最终归一化统一校正。只要最终仍用真实 <span class=\"kb-math kb-math-inline\">m_{\\mathrm{final}}</span> 和 <span class=\"kb-math kb-math-inline\">\\ell_{\\mathrm{final}}</span> 归一化，输出保持正确；区别只是把许多中间 correction 从 critical path 上拿掉。工程上为了避免 warp divergence，通常以 warp 内任一 lane 需要 rescale 作为触发条件。</p>\n<p><strong>反向的 2-CTA 设计直接针对 SMEM 和 atomic。</strong> Backward 包含 5 个 MMA，比 forward 更容易被 shared memory traffic 限制。Blackwell 的 2-CTA MMA 允许一对 CTA 协作完成同一个 MMA，并把 operand B 分摊到两个 CTA 的 shared memory 中，硬件在执行时消费组合后的 tile。FA4 用这个能力减少 B operand 重复 staging，并重构 <span class=\"kb-math kb-math-inline\">dQ</span> 的累加，使 global atomic add 数量约减半。代价是 CTA 必须成对调度、TMEM/cluster 资源组织更复杂，因此它不是简单开关，而是 backward pipeline、数据布局和 scheduler 一起重写。</p>\n<p><strong>CuTe-DSL 的意义是缩短 kernel 迭代周期。</strong> FA4 完全用 Python 内嵌 CuTe-DSL 写成，底层仍能落到 PTX/SASS，保留 low-level GPU 控制能力。论文报告单 kernel compile time 从 FA3 C++ template 的几十秒降到数秒量级。对这种强依赖硬件细节的 kernel，编译迭代速度本身会影响算法探索速度：当需要反复调 tile size、寄存器分配、warpgroup 职责和 pipeline 阶段时，Python JIT DSL 比传统 C++ 模板更适合快速试验。</p>",
      "quiz": {
        "q": "FlashAttention-4 为什么要引入软件指数近似和条件 softmax rescale？",
        "options": [
          "为了把精确 attention 改成低秩近似 attention",
          "因为 Blackwell 上 tensor core 增速快于 MUFU/SMEM，softmax 与非 matmul 操作变成瓶颈",
          "为了完全避免计算 QK^T",
          "因为 CuTe-DSL 不支持硬件指数指令"
        ],
        "answer": 1,
        "explain": "FA4 的核心背景是非对称硬件扩展：MMA 更快后，指数单元、shared memory traffic 和重缩放向量操作相对更慢，因此需要把这些非 matmul 工作降压或与 MMA 重叠。"
      }
    },
    {
      "id": "wave",
      "num": 36,
      "name": "Wave",
      "fullName": "符号化Python DSL编译器 (Wave)",
      "year": "2026",
      "org": "Modular",
      "parent": "mojo",
      "paperUrl": "https://mlsys.org/Conferences/2026/AcceptedPapers",
      "projectUrl": "",
      "category": "infrastructure",
      "motivation": "符号化Python DSL统一AI硬件编程与编译优化",
      "summary": "Wave 是面向高性能机器学习 kernel 的符号化 Python DSL，它把计算逻辑与 GPU 分发策略分离，用 symbolic shape、显式约束、FX/MLIR/IREE 编译管线把 Python 级 kernel 描述降到高性能 GPU 代码。",
      "keyPoints": [
        "<strong>Python DSL + symbolic expression</strong>：用 Python 语法和符号维度表达 tensor shape、索引、layout 与动态假设",
        "<strong>计算与分发解耦</strong>：kernel body 描述数学计算，<code>WorkgroupConstraint</code>、<code>WaveConstraint</code>、<code>TilingConstraint</code>、<code>HardwareConstraint</code> 描述并行映射",
        "<strong>支持 tile-based 与 SIMT 模型</strong>：高层以 tile/wave 为单位写 kernel，编译器展开到线程级 SIMT 执行",
        "<strong>硬件感知抽象</strong>：直接表达 wave size、MMA/MFMA 类型、shared/global memory、寄存器 accumulator 等 GPU 概念",
        "<strong>PyTorch 集成</strong>：可从 PyTorch 调用自定义 kernel，复用 PyTorch tensor，避免每次调用重新编译",
        "<strong>MLIR/IREE 后端</strong>：使用 torch.fx + sympy 作为中间表示，再降到 MLIR vector/arith/scf/amdgpu 等 dialect，交给 IREE 做最后优化与运行时",
        "<strong>内置优化 passes</strong>：包括 global load minimization、shared memory promotion/reuse、LICM、barrier insertion、instruction scheduling、contiguous load detection 等"
      ],
      "detail": "<p><img alt=\"Wave 编译管线\" src=\"https://wave-lang.readthedocs.io/en/latest/_images/wave_pipeline.excalidraw.png\" />\n<em>图：Wave 从 Python 表达式经过 FX tracing、约束上下文、类型推断、索引分析、SIMW 到 SIMT 展开、优化、MLIR emission 和 IREE compile，最终生成可运行 kernel。来源：Wave 官方文档。</em></p>\n<pre><code class=\"language-python\"># Wave GEMM 风格伪代码，展示“计算逻辑”和“分发约束”分离\nfrom wave_lang.kernel._support.indexing import sym\nimport wave_lang.kernel.lang as tkl\nimport wave_lang.kernel.wave as tkw\n\nM, N, K = sym.M, sym.N, sym.K\nBLOCK_M, BLOCK_N, BLOCK_K = sym.BLOCK_M, sym.BLOCK_N, sym.BLOCK_K\nADDRESS_SPACE = sym.ADDRESS_SPACE\n\nconstraints = [\n    tkw.WorkgroupConstraint(M, BLOCK_M, 0),      # M 维映射到 grid axis 0\n    tkw.WorkgroupConstraint(N, BLOCK_N, 1),      # N 维映射到 grid axis 1\n    tkw.TilingConstraint(K, BLOCK_K),            # K 维按 BLOCK_K 做 reduction tiling\n    tkw.WaveConstraint(M, BLOCK_M / 2),          # workgroup 内继续分到 wave\n    tkw.WaveConstraint(N, BLOCK_N / 2),\n    tkw.HardwareConstraint(\n        threads_per_wave=64,\n        mma_type=tkw.MMAType.F32_16x16x16_F16,\n    ),\n]\n\n@tkw.wave(constraints)\ndef gemm(\n    a: tkl.Memory[M, K, ADDRESS_SPACE, tkl.f16],\n    b: tkl.Memory[N, K, ADDRESS_SPACE, tkl.f16],\n    c: tkl.Memory[M, N, tkl.GLOBAL_ADDRESS_SPACE, tkl.f32],\n):\n    acc = tkl.Register[M, N, tkl.f32](0.0)\n\n    @tkw.iterate(K, init_args=[acc])\n    def repeat(acc):\n        a_reg = tkw.read(a)\n        b_reg = tkw.read(b)\n        acc = tkw.mma(a_reg, b_reg, acc)\n        return acc\n\n    tkw.write(repeat, c)\n</code></pre>\n<p><strong>动机与背景：现代 ML kernel 需要硬件矩阵指令，但 CUDA/HIP 级手写成本太高。</strong> 高性能 GEMM、attention、conv 往往必须使用 GPU vendor 的矩阵乘 intrinsics，例如 AMD MFMA 或 NVIDIA MMA。这些指令是跨线程协作的 tile 操作，寄存器/共享内存 layout、tile size、线程分发和调度互相耦合，直接用 SIMT C 写既慢又容易错。Triton 降低了一部分门槛，但当 kernel 需要更细的分发、layout 或硬件控制时，仍可能难以表达。Wave 的定位是：保留 Python 的可编程性，同时显式提供足够的硬件映射约束，让编译器自动完成索引、layout、线程展开和后端 lowering。</p>\n<p><strong>Wave 的核心抽象是“符号计算图 + 约束系统”。</strong> 用户在函数签名中写 <code>Memory[M, K, ADDRESS_SPACE, f16]</code>，这里的 <span class=\"kb-math kb-math-inline\">M,K</span> 不是立即数，而是可被编译期替换、推理和简化的符号。分发策略不写进 kernel body，而由约束给出。例如一个 workgroup 约束可理解为：</p>\n<div class=\"kb-math kb-math-display\">\\text{wg}_M=\\left\\lfloor\\frac{i_M}{B_M}\\right\\rfloor,\\qquad\n\\text{local}_M=i_M\\bmod B_M.</div>\n<p><code>WaveConstraint</code> 再把 workgroup 内的 tile 分给 wave；<code>TilingConstraint(K,B_K)</code> 表示 reduction 维 <span class=\"kb-math kb-math-inline\">K</span> 以 <span class=\"kb-math kb-math-inline\">B_K</span> 为粒度推进；<code>HardwareConstraint</code> 绑定 wave size 与 MMA 类型。这样同一个数学计算可以换不同 tile size、wave 切分或硬件指令，而不需要重写核心计算逻辑。</p>\n<p><strong>编译管线先保留 Python 灵活性，再逐步变成硬件可执行 IR。</strong> 官方架构图中，Wave 从 Python expression 进入 torch.fx tracing，得到带 Wave-specific ops 与 symbolic types 的 FX graph；随后结合 constraints 做 type inference 与 initial indexing determination。Index sequence analysis 会从 MMA/vector shape 这类“源约束”向图中其他节点传播访问模式，决定每个 <code>read</code>、<code>write</code>、<code>mma</code> 的 per-thread/per-wave 索引。当不同节点的 thread shape 冲突时，简单情况可 broadcast，复杂情况需要 shuffle 或 shared memory 往返。</p>\n<p><strong>SIMW 到 SIMT 的 Expansion 是 Wave 区别于普通 Python tensor DSL 的关键。</strong> 用户以 wave/tile 视角写：</p>\n<div class=\"kb-math kb-math-display\">C_{mn}=\\sum_{k=0}^{K-1} A_{mk}B_{nk},</div>\n<p>但真实 GPU 执行的是线程级指令序列。Wave 编译器根据约束把一个 wave 看到的 tile 展开成每个 lane 的寄存器片段、load/store mask、MMA operand layout 和 reduction 片段。对非整除 shape，编译器插入 masking；对符号表达式，先用 sympy 简化，再降到 MLIR affine/vector/arith 操作，减少除法、取模、select 等低效指令。</p>\n<p><strong>优化 pass 面向机器学习 kernel 的数据搬运瓶颈。</strong> Wave 文档与 LLVM talk 中列出的中端优化包括 promotion to shared memory、global load optimization、reuse shared allocations、fold extract slice、barrier insertion、instruction scheduling、hoisting loop-invariant Wave ops、contiguous load detection 等。可以把它理解成一个从高层 tile 计算到低层内存层次的自动调度器：先判断哪些全局读可合并或提升到 shared memory，再用 lifetime 分析复用 shared buffer，最后插入必要 barrier 并排列指令减少等待。</p>\n<p><strong>APLP 软件流水线分析说明 Wave 不只做语法糖。</strong> Wave 的软件流水线资料把路径表示成：</p>\n<div class=\"kb-math kb-math-display\">L(S)=\\text{delay}-\\text{iter\\_diff}\\cdot S,</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">S</span> 是符号 initiation interval。多个候选路径只保留上包络，因为对任意 <span class=\"kb-math kb-math-inline\">S</span> 只有最大约束会限制调度。文档用 Andrew monotone chain 类似方法剪枝上包络，复杂度主要来自排序 <span class=\"kb-math kb-math-inline\">O(N\\log N)</span>，再用 Floyd-Warshall 风格的 all-pairs longest path 组合依赖。这类机制表明 Wave 的优化目标不仅是把 Python 翻译到 MLIR，还包括对调度合法性与流水线间隔做符号级分析。</p>\n<p><strong>与 Triton、CUDA/HIP 手写和普通图编译器的区别。</strong> CUDA/HIP 提供最大控制但开发慢；高层图编译器能融合普通 tensor op 但通常难以表达硬件矩阵 intrinsics 的 layout；Triton 介于两者之间，但用户仍要显式写很多 tile 程序细节。Wave 选择把“计算”写成 tensor/tile 级 Python，把“分发”写成 declarative constraints，再由 compiler 决定 memory access pattern、thread expansion 和 MLIR lowering。它的优势是探索新 kernel 时修改约束很快；风险是编译器必须足够理解硬件，否则自动生成的 layout、barrier 或 schedule 会成为性能上限。</p>",
      "quiz": {
        "q": "Wave 的设计中，为什么要把计算逻辑和分发策略分离？",
        "options": [
          "为了让所有 kernel 都退化成 CPU 上的 Python 循环",
          "为了让同一数学 kernel 能通过不同约束映射到 workgroup、wave、tile 和硬件 MMA，而不重写计算主体",
          "为了避免使用 MLIR/IREE 后端",
          "为了禁止用户控制 shared memory"
        ],
        "answer": 1,
        "explain": "Wave 的 kernel body 表达计算，constraints 表达 tiling、workgroup/wave 映射和硬件指令选择，因此可以快速试验不同硬件分发方案并交给编译器完成索引与 lowering。"
      }
    },
    {
      "id": "approx_mlir",
      "num": 37,
      "name": "ApproxMLIR",
      "fullName": "精度感知复合ML系统编译器 (ApproxMLIR)",
      "year": "2026",
      "org": "UIUC",
      "parent": "mlir",
      "paperUrl": "https://mlsys.org/Conferences/2026/Abstract/1742",
      "projectUrl": "",
      "category": "infrastructure",
      "motivation": "approx方言自动平衡精度与速度，优化复合ML系统",
      "summary": "ApproxMLIR 提出面向复合 AI 系统的 `approx` MLIR 方言、`approx-opt` 优化器和 `approx-runtime` 运行时，把 LLM、RAG 检索、工具调用和传统 C/C++ 内核中的近似选择统一成可调 knob，并通过自动调参与动态决策树在 QoS 约束下寻找速度和质量的 Pareto 折中。",
      "keyPoints": [
        "<strong>统一近似接口</strong>：用 <code>approx.knob</code> 在 MLIR 中标记可近似区域，使 autotuner 只需要识别 knob，而不必理解 <code>scf</code>、<code>stablehlo</code>、<code>linalg</code> 等具体方言语义",
        "<strong>动态近似管理</strong>：用 <code>approx.decision_tree</code> 把运行时状态映射到不同近似强度，解决复合 AI 系统中输入状态、检索结果和工具状态变化导致静态近似失效的问题",
        "<strong>近似实现解耦</strong>：用 <code>approx.transform</code> 描述 loop perforation、function substitution、task skipping 等具体策略，管理逻辑和 rewrite rule 分离",
        "<strong>安全恢复机制</strong>：用 <code>approx.try</code> 表达 try-check-recover 合约，在近似输出不满足检查条件时调用用户提供的恢复函数",
        "<strong>端到端 autotuning</strong>：从所有 <code>approx.knob</code> 收集配置空间，借助 OpenTuner 搜索满足 QoS 下限且执行时间最短的配置，并输出质量-性能 tradeoff curve",
        "<strong>跨 ML 与非 ML 工具链</strong>：JAX/StableHLO/IREE 处理 ML 组件，Polygeist/LLVM 处理 C/C++ 非 ML 组件，ApproxMLIR 在中间层统一近似元数据",
        "<strong>评估对象覆盖复合系统</strong>：论文评估 5 个非 ML kernel 和 3 个复合 AI 系统，包括 LLM + BM25 RAG、LLM + knowledge-base RAG、LLM + tool invocation",
        "<strong>性能收益来自动态组合</strong>：例如 LLM + RAG (kb) 在 6% QoS loss 下达到 2.64x speedup，在 9% QoS loss 下达到 3.04x speedup，优于静态近似策略"
      ],
      "detail": "<p><img alt=\"ApproxMLIR 高层编译流程图（论文 Figure 2，官方 PDF 第 5 页）\" src=\"https://misailo.cs.illinois.edu/papers/approxmlir-mlsys26.pdf#page=5\" />\n<em>图：ApproxMLIR 论文 Figure 2 展示的高层流程。官方公开资料当前只提供 PDF 形态的图源，核心流程是 ML/Non-ML 前端生成 MLIR 模块，经 <code>approx</code> 方言、OpenTuner、<code>approx-opt</code> 和 <code>approx-runtime</code> 统一生成动态可近似程序。</em></p>\n<pre><code class=\"language-python\"># ApproxMLIR 端到端精度感知编译伪代码\ndef compile_with_approxmlir(ml_kernels, non_ml_kernels, qos_target, eval_inputs):\n    modules = []\n    modules += lower_jax_to_mlir(ml_kernels)             # JAX / StableHLO / IREE 路径\n    modules += lower_cpp_to_mlir(non_ml_kernels)         # Polygeist / LLVM 路径\n\n    modules = emit_approx_knobs_from_annotations(modules)\n    knobs = collect_ops(modules, op_name=&quot;approx.knob&quot;)\n    search_space = build_config_space(knobs)\n    pareto = []\n\n    for config in opentuner_search(search_space):\n        configured = write_params_to_knobs(modules, config)\n        managed = emit_decision_tree_ops(configured)\n        lowered = lower_management_ops_to_scf(managed)   # decision_tree -&gt; scf.index_switch\n        linked = bind_runtime_state_functions(lowered)   # runtime = &quot;get_state&quot; 等\n        optimized = apply_approx_transforms(linked)      # loop perforate / substitute / skip\n        artifacts = codegen_with_llvm_and_iree(optimized)\n\n        qos, exec_time = run_and_measure(artifacts, eval_inputs)\n        if qos &gt;= qos_target:\n            pareto = update_pareto_frontier(pareto, (qos, exec_time, config))\n\n    return pareto\n</code></pre>\n<p><strong>动机：复合 AI 系统的近似机会跨越了多个软件栈。</strong> 论文以 BM25 RAG 为例：查询先经过 BM25 文档打分和 top-k 过滤，再把检索结果拼进 prompt，最后交给 LLM 生成答案。BM25、PageRank、k-means、lavaMD 这类工具常由 C/C++ 编译到 LLVM；LLM 推理和张量内核则可能从 JAX/StableHLO 进入 IREE 或 XLA。传统近似优化要么只处理非 ML 代码，要么只处理模型压缩、量化或更小模型替换，导致 corpus subsetting、term scoring skipping、context truncation、LLM artifact selection 等选择无法被端到端协调。ApproxMLIR 的核心判断是：复合系统本身已经容忍一定误差，所以编译器应该在统一 IR 层管理“允许丢多少质量、换多少速度”。</p>\n<p><strong>核心抽象：knob 是配置空间，decision tree 是运行时选择，transform 是实现动作。</strong> 一个 knob 表示某个近似方法的离散参数，配置 <span class=\"kb-math kb-math-inline\">c</span> 是所有 knob 的赋值。论文把 tradeoff point 定义为：</p>\n<div class=\"kb-math kb-math-display\">\\tau = (\\mathrm{QoS}(c), \\mathrm{ExecTime}(c), c)</div>\n<p>Pareto frontier 是所有非支配点的集合：若不存在 <span class=\"kb-math kb-math-inline\">c&#x27;</span> 同时满足 <span class=\"kb-math kb-math-inline\">\\mathrm{QoS}(c&#x27;) \\ge \\mathrm{QoS}(c)</span> 且 <span class=\"kb-math kb-math-inline\">\\mathrm{ExecTime}(c&#x27;) \\le \\mathrm{ExecTime}(c)</span>，则 <span class=\"kb-math kb-math-inline\">c</span> 是 frontier 上的候选。<code>approx.knob</code> 的 <code>params</code> 字段保存 tuner 给出的阈值、分支和近似强度；<code>approx.decision_tree</code> 根据运行时函数返回值选择分支；<code>approx.transform</code> 则在对应分支中触发具体 rewrite。这样 autotuner 面对的是统一的 knob/config 空间，MLIR pass 面对的是标准化的 op lowering。</p>\n<p><strong>为什么不能简单给已有 op 加 attribute。</strong> 如果给 <code>scf.for</code>、<code>stablehlo.dot_general</code> 或 <code>linalg.generic</code> 直接挂 <code>approx.transform = \"skip\"</code> 之类的 attribute，近似语义会和具体方言耦合，并且在 lowering、bufferization、fusion、canonicalization 过程中很容易被丢掉。ApproxMLIR 选择独立方言的意义在于集中保存近似元数据，直到 <code>approx-opt</code> 明确把它降成标准控制流或具体 rewrite。这个设计也让外部 tuner 不需要理解每一种 MLIR op 的语义，只要遍历 <code>approx.knob</code> 即可完成配置搜索。</p>\n<p><strong>动态近似：把“何时近似”和“如何近似”分开。</strong> <code>approx.decision_tree</code> 的四类关键信息是 runtime function、thresholds、decisions 和 transform type。lowering 时它会变成普通 MLIR 控制流，例如先调用 <code>@get_state</code>，再根据阈值计算分支编号，最后用 <code>scf.index_switch</code> 进入不同 case。每个 case 内部可以复制 exact region，并插入不同 <code>approx.transform</code>。直觉上，这相当于把下面的决策函数编译成 IR：</p>\n<div class=\"kb-math kb-math-display\">d(s) =\n\\begin{cases}\n0, &amp; s &lt; t_1 \\\\\n1, &amp; t_1 \\le s &lt; t_2 \\\\\n2, &amp; s \\ge t_2\n\\end{cases}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">s</span> 是运行时状态，例如检索置信度、输入规模、工具返回分布或系统负载，<span class=\"kb-math kb-math-inline\">d(s)</span> 决定 exact/mild/aggressive 的近似强度。论文强调这对复合 AI 系统很关键，因为同一条静态近似规则可能在高置信输入上安全，在低置信输入上却放大错误。</p>\n<p><strong>具体 transform 以 MLIR rewrite rule 实现。</strong> ApproxMLIR 实现了三类经典近似：loop perforation 修改循环 stride 以跳过部分迭代；function substitution 把精确函数替换为用户提供的近似函数；task skipping 通过控制流重连跳过一段任务。它们本身可以是静态且粗糙的，但嵌入 decision tree 后就变成了有状态策略。例如循环穿孔可以写成：</p>\n<div class=\"kb-math kb-math-display\">\\text{for } i=0; i&lt;n; i+=1 \\quad \\Rightarrow \\quad \\text{for } i=0; i&lt;n; i+=k</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">k=1</span> 是 exact，<span class=\"kb-math kb-math-inline\">k=2</span> 或更大表示更激进的近似。<code>approx.transform</code> 只声明 <code>transform_type</code> 和 <code>transform_value</code>，真正修改 <code>scf.for</code> 的逻辑放在 RewritePattern 中，这降低了增加新近似策略时对方言本身的侵入。</p>\n<p><strong>QoS 评估连接系统层目标，而不是单个 kernel 误差。</strong> 对 LLM + RAG 这类系统，论文用问题回答是否包含短答案来定义 accuracy；对 k-means/lavaMD 使用 L2 相对误差；对 PageRank、BM25 和 embedding retrieval 使用 RBO 排名相似度。以 L2 指标为例：</p>\n<div class=\"kb-math kb-math-display\">\\mathrm{Accuracy}_{L2} = 1 - \\frac{\\|y_{\\mathrm{exact}} - y_{\\mathrm{approx}}\\|_2}{\\|y_{\\mathrm{exact}}\\|_2}</div>\n<p>这种设计让 tuner 的目标不是“某个循环少跑几次”，而是“整个复合系统是否仍满足用户 QoS 下限”。因此 ApproxMLIR 可以在 BM25 检索、上下文选择和 LLM artifact 选择之间分配误差预算，找到比单点静态近似更优的折中。</p>\n<div class=\"key-point\">💡 关键：ApproxMLIR 的贡献不是某一种新的近似变换，而是把近似变换的声明、搜索、动态选择、安全恢复和跨工具链 lowering 都放进同一个 MLIR 可组合接口中。</div>",
      "quiz": {
        "q": "ApproxMLIR 为什么要设计独立的 approx 方言，而不是直接在已有 MLIR op 上挂 attribute？",
        "options": [
          "为了绕过 MLIR 的 pass manager，直接生成二进制",
          "为了集中保存近似元数据，让 autotuner 统一识别 knob，并避免 lowering 时丢失近似语义",
          "为了只支持 JAX 模型，不再处理 C/C++ 非 ML 代码",
          "为了把所有近似策略固定成静态 loop perforation"
        ],
        "answer": 1,
        "explain": "独立方言把 approximation management 和 concrete transform 解耦，`approx.knob` 给 tuner 统一接口，`approx.decision_tree` 支持动态选择，`approx.transform` 再由专门 pass 降成具体 rewrite。"
      }
    },
    {
      "id": "hexagon_mlir",
      "num": 38,
      "name": "Hexagon-MLIR",
      "fullName": "Qualcomm NPU开源编译栈 (Hexagon-MLIR)",
      "year": "2026",
      "org": "Qualcomm",
      "parent": "mlir",
      "paperUrl": "https://arxiv.org/abs/2602.19762",
      "projectUrl": "",
      "category": "hardware_specific",
      "motivation": "Triton到Hexagon NPU直接编译路径",
      "summary": "Hexagon-MLIR 提出一个面向 Qualcomm Hexagon NPU 的开源 MLIR 编译栈，把 PyTorch/Triton 程序统一降到 Linalg，再通过 fusion、TCM tiling、HVX 多线程、异步 DMA double buffering 和数学库 lowering 生成 NPU 可执行代码，从而为新 Triton kernel 和 PyTorch 子图提供直接编译路径。",
      "keyPoints": [
        "<strong>统一入口</strong>：PyTorch 模型经 Torch-MLIR 进入 Linalg，Triton kernel 经 triton-to-linalg 进入 Linalg，后续共享同一套 NPU lowering pipeline",
        "<strong>面向 Hexagon NPU</strong>：优化目标包括 HVX 向量扩展、多硬件线程与多个 HVX context、Tightly Coupled Memory (TCM)、DMA 与高吞吐矩阵乘引擎",
        "<strong>mega-kernel 生成</strong>：把长算子链作为编译区域做 fusion，减少库调用之间反复回 DDR 的带宽瓶颈",
        "<strong>Linalg-on-tensors 作为中间层</strong>：用 <code>linalg.generic</code> 保留 affine indexing map、parallel/reduction iterator 和 scalar payload region，便于结构化变换",
        "<strong>TCM tiling</strong>：把大 tensor 切成 tile，插入 memory-space 标注和 copy，使后端能生成 DDR 到 TCM 的 DMA 数据搬运",
        "<strong>HVX 多线程</strong>：先把 parallel iterator 分配到 <code>scf.forall</code> 虚拟线程，再降到 MLIR Async dialect 的 fork-join 结构",
        "<strong>双缓冲流水化</strong>：用 ping/pong buffer 和 <code>memref.dma_start</code>/<code>memref.dma_wait</code> 让下一 tile 的 DMA 与当前 tile 的计算重叠",
        "<strong>方法覆盖面</strong>：论文用 softmax 和 GELU 贯穿说明 Triton-to-Linalg、fusion、tiling、多线程、double buffering、math library 和低层 lowering"
      ],
      "detail": "<p><img alt=\"Hexagon-MLIR AI 编译栈总览\" src=\"https://arxiv.org/html/2602.19762v1/overalldiagram.png\" />\n<em>图：论文 Figure 1，展示 Hexagon-MLIR 从 PyTorch/Triton 到 MLIR/Linalg，再到 Hexagon NPU 后端的整体编译栈。</em></p>\n<pre><code class=\"language-python\"># Hexagon-MLIR pass pipeline 伪代码\ndef compile_for_hexagon_npu(program, source_kind):\n    if source_kind == &quot;pytorch&quot;:\n        ir = torch_mlir_to_linalg(program)\n    elif source_kind == &quot;triton&quot;:\n        triton_ir = triton_frontend(program)\n        ir = triton_to_linalg(triton_ir)\n\n    ir = canonicalize_cse_constant_propagate(ir)\n    ir = fuse_linalg_generics(ir)                 # 减少中间 tensor materialization\n    ir = tile_to_tcm(ir, tile_sizes, interchange) # DDR -&gt; TCM working set\n    ir = bufferize_and_mark_memory_spaces(ir)\n    ir = form_virtual_threads(ir)                 # linalg/scf -&gt; scf.forall\n    ir = lower_to_async_threads(ir)               # scf.forall -&gt; async.execute\n    ir = introduce_ping_pong_buffers(ir)\n    ir = rewrite_copies_to_dma_start_wait(ir)\n    ir = vectorize_for_hvx(ir)\n    ir = lower_math_library_and_runtime_calls(ir)\n    return lower_to_llvm_and_hexagon_binary(ir)\n</code></pre>\n<p><strong>动机：库调用无法覆盖快速变化的 Triton/LLM kernel 长尾。</strong> 传统移动 NPU 部署依赖手写 operator library，单个标准算子可做到高性能，但新模型不断产生 fused activation、attention 变体、MoE 子图和 Inductor/Triton 生成的 kernel。若每个 operator 都以库调用为边界，数据会在调用之间回到 DDR，既丢失 fusion 机会，也形成内存带宽瓶颈。Hexagon-MLIR 的思路是把 Triton/PyTorch 子图转成一个可优化区域，生成更大的 specialized mega-kernel，让中间结果尽量停留在 TCM 或寄存器中。</p>\n<p><strong>统一语义：PyTorch 和 Triton 都先投影到 Linalg。</strong> 论文把 PyTorch 模型集合记为 <span class=\"kb-math kb-math-inline\">M</span>，Triton kernel 集合记为 <span class=\"kb-math kb-math-inline\">K</span>，Linalg op 集合记为 <span class=\"kb-math kb-math-inline\">L</span>，前端转换可写成：</p>\n<div class=\"kb-math kb-math-display\">f: M \\rightarrow L,\\qquad g: K \\rightarrow L</div>\n<p>语义保持目标是：</p>\n<div class=\"kb-math kb-math-display\">\\llbracket m \\rrbracket = \\llbracket f(m) \\rrbracket,\\qquad\n\\llbracket k \\rrbracket = \\llbracket g(k) \\rrbracket</div>\n<p>有了这个公共层，后续 pass 不需要区分输入来自 PyTorch 还是手写 Triton。量化等精度变化可能放松严格等价，但大多数结构化 lowering、fusion、tiling 和并行化仍以保持 denotational semantics 为边界。</p>\n<p><strong><code>linalg.generic</code> 是结构化优化的承载点。</strong> 一个 <code>linalg.generic</code> 可以看成由迭代域 <span class=\"kb-math kb-math-inline\">I \\subseteq \\mathbb{Z}^d</span>、一组 affine indexing map <span class=\"kb-math kb-math-inline\">\\phi_\\ell: I \\rightarrow \\mathbb{Z}^{n_\\ell}</span>、iterator 类型和 scalar payload region 组成。以 softmax 为例，Triton 中的 <code>row - tl.max(row)</code>、<code>tl.exp</code>、<code>tl.sum</code>、division 先降成多个 <code>linalg.generic</code> 或配合控制流的结构化 op。<code>linalg.generic</code> 的价值在于把“如何遍历数据”和“每个点上做什么标量计算”分开，使 fusion、tiling、vectorization 都能基于 iteration geometry 做合法变换。</p>\n<p><strong>Fusion 消除中间 materialization。</strong> 若 producer <span class=\"kb-math kb-math-inline\">P</span> 产生中间 tensor <span class=\"kb-math kb-math-inline\">Y</span>，consumer <span class=\"kb-math kb-math-inline\">Q</span> 读取 <span class=\"kb-math kb-math-inline\">Y</span>，可以抽象为：</p>\n<div class=\"kb-math kb-math-display\">X \\xrightarrow{P} Y \\xrightarrow{Q} Z</div>\n<p>若 <span class=\"kb-math kb-math-inline\">P</span> 的 payload 是 <span class=\"kb-math kb-math-inline\">y=f(x)</span>，<span class=\"kb-math kb-math-inline\">Q</span> 的 payload 是 <span class=\"kb-math kb-math-inline\">z=g(y)</span>，融合后变成：</p>\n<div class=\"kb-math kb-math-display\">z = g(f(x))</div>\n<p>对于论文中的 softmax 片段，<code>subf</code> 和 <code>exp</code> 可融合到同一个 <code>linalg.generic</code> body 中，避免把 <span class=\"kb-math kb-math-inline\">Y</span> 写回再读出。对 NPU 来说，这不仅减少 DRAM/TCM 流量，也为后续 HVX 向量化和 tile 内复用创造更大连续区域。</p>\n<p><strong>TCM tiling 把 structured tensor 计算变成显式局部工作集。</strong> Hexagon NPU 的 TCM 小而快，DDR 大而慢。给定迭代域 <span class=\"kb-math kb-math-inline\">I</span> 和 tiling vector <span class=\"kb-math kb-math-inline\">t=(t_1,\\dots,t_d)</span>，tiling 引入外层 <code>scf.for</code>/<code>scf.forall</code>，内层仍保留 <code>linalg.generic</code>，但它的输入输出变成当前 tile。实现上 pass 会插入 <code>tensor.extract_slice</code> 和带 memory-space attribute 的 <code>bufferization.alloc_tensor</code>/copy，后续 bufferization 和 lowering 再把这些 copy 映射为 DDR/TCM 之间的 DMA。直觉公式是：</p>\n<div class=\"kb-math kb-math-display\">I = \\bigcup_b I_b,\\qquad I_b = \\{ i \\in I \\mid b_j t_j \\le i_j &lt; (b_j+1)t_j \\}</div>\n<p>每个 <span class=\"kb-math kb-math-inline\">I_b</span> 对应一个 TCM-resident tile，计算完成后再 <code>tensor.insert_slice</code> 回全局结果。</p>\n<p><strong>HVX 多线程用 Async dialect 保留并行语义。</strong> 论文把多线程 lowering 分成两阶段：先分析 <code>linalg.generic</code> 的 parallel iterator 和 polytope size，决定是否值得并行化，并生成 <code>scf.forall</code> 虚拟线程；再把每个 forall tile 改写成 <code>async.execute</code>，用 <code>async.create_group</code>、<code>async.add_to_group</code> 和 <code>async.await_all</code> 表示 fork-join barrier。这样做的好处是中间 IR 仍是结构化、可分析的，而不是过早落到难以优化的低层线程 runtime 调用。</p>\n<p><strong>Double buffering 把内存传输和计算重叠。</strong> 单缓冲 tile 流程通常是 copy tile 到 TCM、计算、copy 回去、再处理下一 tile。Hexagon-MLIR 的 double buffering 先做结构化变换，生成 guarded prologue、ping/pong 两套 buffer 和交替执行的 sub-kernel；再把 <code>memref.copy</code> 改写为 <code>memref.dma_start</code>/<code>memref.dma_wait</code>。简化状态机如下：</p>\n<pre><code class=\"language-python\">prefetch(tile=0, buffer=ping)\nfor b in range(num_tiles):\n    wait_until_ready(buffer=current)\n    if b + 1 &lt; num_tiles:\n        prefetch(tile=b + 1, buffer=other)\n    compute_hvx(buffer=current)\n    store_back(buffer=current)\n    current, other = other, current\n</code></pre>\n<p>该设计把 legality/scheduling 和 transport semantics 分开：第一阶段保证 ping/pong IR 结构和 hazard-free clone，第二阶段才绑定到 DMA tag 和 wait 点。最终 pipeline 可概括为 <span class=\"kb-math kb-math-inline\">F \\rightarrow T \\rightarrow M \\rightarrow DB \\rightarrow V</span>：fusion 提升局部性，tiling 进入 TCM，多线程分配 HVX context，double buffering 隐藏 DMA 延迟，vectorization 映射到 HVX。</p>\n<div class=\"key-point\">💡 关键：Hexagon-MLIR 的价值在于把 Triton/PyTorch 生态接到 Qualcomm NPU 的硬件特性上，不是只做一个 Triton parser，而是把 TCM、HVX、DMA 和 fusion 都提升为 MLIR pass pipeline 中可组合的优化动作。</div>",
      "quiz": {
        "q": "Hexagon-MLIR 为什么先把 PyTorch 和 Triton 都降到 Linalg？",
        "options": [
          "为了绕过所有 MLIR pass，直接调用 Qualcomm 手写库",
          "为了让不同前端共享同一套结构化 fusion、tiling、multi-threading 和 lowering pipeline",
          "为了只支持 softmax，避免处理 GELU 和其他算子",
          "为了把所有 tensor 立即展平成 LLVM pointer arithmetic"
        ],
        "answer": 1,
        "explain": "Linalg 保留 iteration domain、indexing map 和 payload region，既统一 PyTorch/Triton 来源，又为后续面向 TCM/HVX/DMA 的结构化优化提供合法变换基础。"
      }
    },
    {
      "id": "magellan",
      "num": 39,
      "name": "Magellan",
      "fullName": "AlphaEvolve驱动自主编译优化发现 (Magellan)",
      "year": "2026",
      "org": "Google DeepMind",
      "parent": "openxla",
      "paperUrl": "https://arxiv.org/abs/2601.21096",
      "projectUrl": "",
      "category": "llm_driven",
      "motivation": "LLM Agent自主进化编译优化启发式",
      "summary": "Magellan 把 AlphaEvolve 式 LLM coding agent、进化搜索和 autotuning 接入真实编译器源码，让系统直接合成可编译、可部署的 C++ 优化启发式，在 LLVM inlining、register allocation 以及 XLA graph rewriting/auto-sharding 上用宏基准奖励替代人工规则调参。",
      "keyPoints": [
        "<strong>演化编译器 pass 本身</strong>：目标不是为每个程序生成优化序列，而是修改编译器中的 C++ decision logic，使产物能像人工 heuristic 一样长期复用",
        "<strong>EVOLVE-BLOCK 边界</strong>：用户在编译器源码中标记可编辑区域，AlphaEvolve 只改写这一段，候选策略仍遵守 LLVM/XLA 的现有 API",
        "<strong>四阶段闭环</strong>：policy proposal、local evaluation、hyperparameter tuning、feedback incorporation 反复迭代",
        "<strong>分层搜索</strong>：LLM 负责提出高层 policy template，数值阈值暴露成 compiler flags，由 Vizier 等 autotuner 做低层参数搜索",
        "<strong>真实宏基准奖励</strong>：候选策略会重新编译编译器并在用户提供的 workload 上测量二进制大小或运行时间，而不是只优化合成 proxy",
        "<strong>LLVM inlining 案例</strong>：在 size 目标上，API-level full heuristic 1.5 天搜索达到相对 LLVM upstream 5.23% 的二进制减小，引入 autotuning 后约 5 小时超过 5%",
        "<strong>性能 inlining 案例</strong>：在 clang 宏基准上，从 Gemini-2.5-Pro 结果续跑 Gemini-3-Pro，最终比手工调优 baseline 提升 0.61%",
        "<strong>迁移到 XLA</strong>：在 equality-saturation graph extraction 上比手工策略提升 7%，在 auto-sharding contest 设定中达到接近顶级提交的效果"
      ],
      "detail": "<p><img alt=\"Magellan 系统总览\" src=\"https://arxiv.org/html/2601.21096v1/fig/overview-bazel.png\" />\n<em>图：论文 Figure 1，Magellan 以 LLVM 为示例展示 AlphaEvolve、编译器源码、宏基准评估和 autotuner 之间的闭环；同一模式可替换为 XLA 等其他编译器。</em></p>\n<pre><code class=\"language-python\"># Magellan 发现编译优化启发式的核心闭环伪代码\ndef magellan_search(compiler_repo, evolve_block, benchmark_suite, objective):\n    population = initialize_with_seed_policy(evolve_block)\n\n    while not budget_exhausted():\n        # 1. LLM/AlphaEvolve 生成 C++ policy template\n        template = llm_propose_policy(population, editable_region=evolve_block)\n        if not compiles_as_compiler_patch(compiler_repo, template):\n            population.add_failure(template, reason=&quot;compile error&quot;)\n            continue\n\n        # 2. 对同一个模板调参，避免 LLM 同时搜索逻辑和阈值\n        best_score = None\n        best_flags = None\n        for flags in vizier_suggest(template.hyperparameters):\n            compiler = rebuild_compiler(compiler_repo, template, flags)\n            metrics = run_macro_benchmarks(compiler, benchmark_suite)\n            score = reward(metrics, objective)  # binary size 或 runtime\n            best_score, best_flags = keep_best(best_score, best_flags, score, flags)\n\n        # 3. 把分数、日志和 profile 反馈给 AlphaEvolve 做选择和变异\n        population.add_candidate(template, best_flags, best_score)\n        population = evolutionary_select_and_mutate(population)\n\n    return population.best()\n</code></pre>\n<p><strong>动机：成熟编译器仍然依赖难维护的手写启发式。</strong> 函数内联、寄存器分配、e-graph extraction、auto-sharding 等问题通常是 NP-hard 或组合爆炸，生产编译器必须依靠启发式在代码尺寸、执行时间、寄存器压力、cache 行为和通信代价之间取舍。过去的 MLGO/神经网络策略能替代部分人工规则，但集成和维护神经模型本身又是新工程负担。Magellan 选择另一条路线：让 LLM 和进化搜索直接合成 C++ 规则，最终产物仍是普通 compiler pass 代码，可审查、可编译、可部署。</p>\n<p><strong>四阶段闭环：从源码 patch 到真实 reward。</strong> Policy proposal 阶段，用户在目标源码中放置 <code>EVOLVE-BLOCK-START/END</code>，LLM 只改这一块并生成符合接口的策略，例如 LLVM <code>AEInlineAdvisor::getAdviceImpl(CallBase &amp;CB)</code>。Local evaluation 阶段，系统把候选 patch 插入源码、重新编译编译器、运行宏基准，并用 <code>llvm-size</code>、<code>perf stat</code> 或用户给定指标计算 reward。Hyperparameter tuning 阶段，模板不变，Vizier 只搜索阈值、bonus、penalty 等 flags。Feedback incorporation 阶段，AlphaEvolve 根据分数、失败日志和 profile 选择候选并生成下一轮变体。</p>\n<p><strong>分层搜索的关键是降低无效样本率。</strong> 如果 LLM 同时决定控制流结构和所有数值阈值，很多候选会因为编译错误、阈值不合理或 reward 太稀疏而浪费。Magellan 要求 LLM 输出带符号参数的 policy template，例如：</p>\n<div class=\"kb-math kb-math-display\">h_\\theta(x) =\n\\begin{cases}\n\\text{inline}, &amp; \\mathrm{cost}(x) + b_\\theta(x) &lt; T_\\theta \\\\\n\\text{no-inline}, &amp; \\text{otherwise}\n\\end{cases}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">x</span> 是 call site、callee/caller 属性、loop 信息、profile 信息等，<span class=\"kb-math kb-math-inline\">\\theta</span> 是 autotuner 调的阈值和权重。这样 LLM 探索“看哪些特征、如何组合”，Vizier 探索“阈值取多少”，两类搜索空间不会互相污染。</p>\n<p><strong>函数内联案例说明了 feature-based 和 API-level 搜索的差别。</strong> Partial heuristic 只能组合 MLInlineAdvisor 已有的 38 个特征，早期进展快，但表达能力有限，最终在 size 任务上约 4.27% binary size reduction 后趋于平台。Full heuristic 直接从 LLVM <code>CallBase</code> 出发，能遍历 callee、caller、basic block、loop、attribute 和整个 compilation unit 上下文，早期更难搜索，但最终达到 5.23% reduction。引入 autotuning 后，每个外层迭代让 tuner 评估 10 组参数，约 100 个 program samples、5 小时就超过 5% reduction，说明“模板演化 + 参数调优”的采样效率明显更好。</p>\n<p><strong>性能目标比 size 目标更难，因为 reward 更噪声且更贵。</strong> 在 inlining-for-performance 中，Magellan 使用 clang 宏基准、PGO profile、ThinLTO 和 <code>-O3</code> 环境评价端到端性能。直接从 always-false naive policy 起步，Gemini-2.5-Pro 和 Gemini-3-Pro 都难以跨过 0% baseline；但把 Gemini-2.5-Pro 找到的较好策略作为 Gemini-3-Pro 的 seed 后，搜索被限制在更有结构的邻域内，最终获得 0.61% speedup。这个结果的含义不是数值很大，而是说明 LLM 搜索也需要好的 continuation 和 curriculum，尤其在稀疏、昂贵、带噪声的生产宏基准上。</p>\n<p><strong>XLA 案例展示了 Magellan 不限于 LLVM。</strong> 在 equality saturation graph rewriting 中，饱和后的 e-graph 包含许多等价表达式，extraction 要为 reachable e-class 选择一个 e-node，并为其 child e-class 递归选择代表，同时避免 cycle，目标是最小化总 cost。可以抽象为：</p>\n<div class=\"kb-math kb-math-display\">\\min_{n_c \\in E_c} \\sum_{c \\in R} \\mathrm{cost}(n_c)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">E_c</span> 是 e-class <span class=\"kb-math kb-math-inline\">c</span> 内可选 e-node 集合，<span class=\"kb-math kb-math-inline\">R</span> 是从 root 可达的 e-class 集合。论文报告 Magellan 合成的 extraction heuristic 比手工策略提升 7%。在 XLA auto-sharding 中，每个 graph node 要从离散 sharding strategy 中选一个，目标同时包含计算、通信、resharding 和时变内存约束；Magellan 在 contest split 上用公开样例训练、私有样例评估，演化一周后达到接近顶级提交的效果。</p>\n<p><strong>工程边界：正确性由现有编译器接口兜底，质量由 macro-benchmark 约束。</strong> 以内联为例，Magellan 只返回是否建议 inline，合法性检查仍由 LLVM <code>MLInlineAdvisor</code>/inliner 框架处理，因此一个能编译并接入接口的策略不会绕过基础 correctness guard。风险更多来自性能泛化和维护性，所以论文强调生成策略要 compact、人类可读，并且能直接进入现有 compiler code review 流程。相比每个程序运行一次 agent 生成 code，Magellan 的成本是一次性搜索 compiler pass，之后对所有程序复用。</p>\n<div class=\"key-point\">💡 关键：Magellan 把 LLM 的创造性限制在编译器已有 API 和 <code>EVOLVE-BLOCK</code> 内，再用真实宏基准和 autotuner 过滤候选；这比“让 LLM 随便写优化器”更接近可上线的编译器工程流程。</div>",
      "quiz": {
        "q": "Magellan 中 LLM 和 autotuner 的分工是什么？",
        "options": [
          "LLM 只运行 benchmark，autotuner 负责写 C++ 源码",
          "LLM 生成高层启发式模板，autotuner 搜索模板暴露出的数值阈值和权重",
          "LLM 直接为每个输入程序生成机器码，autotuner 不参与",
          "LLM 只训练神经网络模型，最终编译器必须集成推理 runtime"
        ],
        "answer": 1,
        "explain": "Magellan 的分层搜索把 policy structure 和 numeric hyperparameters 分开，减少无效样本，并让最终产物保持为可审查、可部署的 C++ 编译器 heuristic。"
      }
    },
    {
      "id": "cutegen",
      "num": 40,
      "name": "CuTeGen",
      "fullName": "LLM智能体GPU Kernel生成框架 (CuTeGen)",
      "year": "2026",
      "org": "Community",
      "parent": "triton",
      "paperUrl": "https://arxiv.org/abs/2604.01489",
      "projectUrl": "",
      "category": "llm_driven",
      "motivation": "LLM Agent自动生成CuTe GPU Kernel",
      "summary": "CuTeGen 提出了一个基于 LLM Agent 的三阶段工作流（正确性测试→调试→优化），利用 NVIDIA CuTe 抽象层作为结构化中间表示来约束生成空间，自动生成和优化高性能 GPU CUDA Kernel，在多个基准任务上达到甚至超越 PyTorch 原生实现的性能。",
      "keyPoints": [
        "<strong>三阶段 Agentic 工作流</strong>：Correctness Testing → Debugging → Optimization，逐步从正确性保证过渡到性能优化",
        "<strong>CuTe 抽象层作为中间表示</strong>：利用 NVIDIA CUTLASS 库的 CuTe（CuTe Tensor）抽象，将 GPU 硬件层级（Thread/Warp/CTA/Cluster）映射为结构化的 Layout 和 Tensor 操作，约束 LLM 的生成空间",
        "<strong>Patch-based 修复策略</strong>：调试阶段不重新生成完整代码，而是基于编译/运行错误信息生成局部补丁（patch），保留已有正确逻辑",
        "<strong>Delayed Profiling 机制</strong>：将性能分析推迟到优化搜索树的较深层级（depth=11），避免过早 profiling 导致陷入局部最优",
        "<strong>Tree-structured 优化搜索</strong>：优化阶段采用树搜索结构，每个节点代表一次优化尝试，支持回溯和多路径探索",
        "<strong>实验基准</strong>：KernelBench Level-1（GEMM 变体 + 激活函数），RTX 4090 上评测",
        "<strong>关键结果</strong>：Square GEMM 达到 PyTorch 1.16x 加速，Diagonal MatMul 达 17.66x，Softsign 激活函数达 3.45x"
      ],
      "detail": "<p><img alt=\"CuTeGen 框架总览图\" src=\"https://ar5iv.labs.arxiv.org/html/2604.01489/assets/x1.png\" />\n<em>图 1：CuTeGen 的三阶段 Agentic 工作流示意图，展示从初始生成到调试修复再到性能优化的完整流程</em></p>\n<p><img alt=\"CuTe 层级抽象示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2604.01489/assets/figures/cute_diag.png\" />\n<em>图 2：CuTe 的层级化 Tensor 抽象，展示 Thread → Warp → CTA → Cluster 的硬件映射关系</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># CuTeGen 三阶段工作流伪代码\ndef cutegen_pipeline(task_spec, reference_impl):\n    # Stage 1: Initial Generation + Correctness Testing\n    kernel_code = llm_generate(task_spec, cute_docs, reference_impl)\n\n    # Stage 2: Debugging Loop (patch-based repair)\n    for attempt in range(max_debug_attempts):\n        compile_result = compile(kernel_code)\n        if compile_result.has_error:\n            patch = llm_generate_patch(kernel_code, compile_result.error)\n            kernel_code = apply_patch(kernel_code, patch)\n            continue\n        run_result = run_and_validate(kernel_code, reference_impl)\n        if run_result.correct:\n            break\n        patch = llm_generate_patch(kernel_code, run_result.error)\n        kernel_code = apply_patch(kernel_code, patch)\n\n    # Stage 3: Optimization (tree search with delayed profiling)\n    opt_tree = Tree(root=kernel_code)\n    for depth in range(max_depth):\n        for node in opt_tree.leaf_nodes():\n            optimized = llm_optimize(node.code, cute_docs)\n            optimized = debug_loop(optimized)  # 确保优化后仍正确\n            child = opt_tree.add_child(node, optimized)\n            if depth &gt;= delay_threshold:  # Delayed Profiling\n                child.perf = profile(optimized)\n    return opt_tree.best_node()\n</code></pre>\n<h5>动机与背景</h5>\n<p>GPU Kernel 编程是高性能计算的核心，但 CUDA 编程的复杂性（线程层级管理、共享内存分配、内存合并访问、Tensor Core 利用等）使得即使是经验丰富的工程师也需要大量时间进行手动调优。近年来，LLM 在代码生成领域取得了显著进展，但在 GPU Kernel 生成方面面临独特挑战：</p>\n<ol>\n<li><strong>搜索空间爆炸</strong>：CUDA 编程涉及 tile 大小、线程块配置、内存层级选择等大量超参数组合</li>\n<li><strong>正确性验证困难</strong>：GPU 并行程序的 bug 往往是非确定性的（race condition、bank conflict 等）</li>\n<li><strong>性能优化非线性</strong>：微小的参数变化可能导致性能的剧烈波动，传统的贪心搜索容易陷入局部最优</li>\n</ol>\n<p>现有方法如直接使用 LLM 生成原始 CUDA 代码，由于缺乏结构化约束，生成的代码往往存在大量低级错误。KernelBench 基准测试显示，即使是最先进的 LLM，在 GPU Kernel 生成任务上的成功率也很低。</p>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：CuTeGen 的核心创新在于引入 CuTe 作为\"结构化中间表示\"——它不是让 LLM 直接生成底层 CUDA 代码，而是让 LLM 在 CuTe 的抽象层级上进行推理和生成，从而将无限的底层优化空间压缩为有限的、语义明确的抽象操作组合。</div>\n<h5>核心机制详解</h5>\n<p><strong>1. CuTe 抽象层的作用</strong></p>\n<p>CuTe（CuTe Tensor）是 NVIDIA CUTLASS 库提供的 C++ 模板抽象层，它将 GPU 硬件的层级结构（Thread → Warp → Thread Block/CTA → Cluster）映射为统一的 Layout 和 Tensor 操作接口。CuTe 的核心概念包括：</p>\n<ul>\n<li><strong>Layout</strong>：描述数据在内存中的排列方式，由 <code>Shape</code> 和 <code>Stride</code> 组成。例如 <code>Layout&lt;Shape&lt;_4, _8&gt;, Stride&lt;_8, _1&gt;&gt;</code> 表示一个 4×8 的行主序矩阵</li>\n<li><strong>Tensor</strong>：将 Layout 绑定到具体的内存指针，支持全局内存（GMEM）、共享内存（SMEM）和寄存器文件（RMEM）</li>\n<li><strong>Tiled Copy / Tiled MMA</strong>：封装了硬件特定的数据搬运和计算原语（如 <code>cp.async</code>、WMMA 指令）</li>\n</ul>\n<p>CuTe 的优势在于它提供了<strong>硬件感知但硬件无关</strong>的编程接口——开发者（或 LLM）只需指定高层的 tile 分解策略和数据流模式，CuTe 会自动处理底层的线程映射、内存对齐和指令选择。</p>\n<p><strong>2. 三阶段工作流</strong></p>\n<p><strong>阶段一：正确性测试（Correctness Testing）</strong></p>\n<p>LLM 接收任务描述（PyTorch 参考实现）和 CuTe 文档作为上下文，生成初始的 CuTe Kernel 代码。生成的代码会经过编译测试和数值正确性验证（与 PyTorch 参考实现的输出进行比较，使用 <code>torch.allclose</code> 检查）。</p>\n<p><strong>阶段二：调试修复（Debugging）</strong></p>\n<p>当代码存在编译错误或数值错误时，进入调试循环。关键设计是 <strong>patch-based 修复</strong>而非完整代码重新生成：</p>\n<div class=\"kb-math kb-math-display\">\\text{code}_{t+1} = \\text{apply\\_patch}(\\text{code}_t, \\text{LLM}(\\text{code}_t, \\text{error}_t))</div>\n<p>这种设计的优势在于：\n- 保留了已有代码中正确的部分，避免\"推倒重来\"导致的信息丢失\n- 错误信息（编译器报错、运行时错误、数值偏差）为 LLM 提供了精确的修复方向\n- 减少了 token 消耗，提高了调试效率</p>\n<p><strong>阶段三：优化搜索（Optimization with Delayed Profiling）</strong></p>\n<p>优化阶段采用树搜索结构。从正确的基础 Kernel 出发，LLM 在每个节点生成优化变体（如更改 tile 大小、添加双缓冲、使用 Tensor Core 等）。每个优化变体都需要通过正确性验证（回到阶段二的调试循环）。</p>\n<p><strong>Delayed Profiling</strong> 是优化阶段的关键创新：</p>\n<div class=\"kb-math kb-math-display\">\\text{profile}(node) = \\begin{cases} \\text{skip} &amp; \\text{if } \\text{depth}(node) &lt; D_{\\text{delay}} \\\\ \\text{measure\\_time}(node) &amp; \\text{if } \\text{depth}(node) \\geq D_{\\text{delay}} \\end{cases}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">D_{\\text{delay}}</span> 是延迟阈值（实验中设为 11）。这样做的原因是：\n- 早期优化步骤（如基础 tiling、内存层级选择）对最终性能的影响是<strong>非单调的</strong>\n- 过早进行 profiling 会导致 Agent 过度关注当前步骤的性能数字，而忽略了需要多步组合才能显现效果的优化策略（如双缓冲 + Tensor Core + 异步拷贝的组合）\n- Delayed profiling 允许 Agent 先完成一系列结构性优化，再通过 profiling 进行精细调参</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：消融实验表明，early profiling（depth=1）的性能显著低于 delayed profiling（depth=11），验证了过早 profiling 确实会导致优化陷入局部最优。</div>\n<p><strong>3. Case Study：Square GEMM 优化过程</strong></p>\n<p>论文详细展示了 CuTeGen 对 Square GEMM（<span class=\"kb-math kb-math-inline\">C = A \\times B</span>，<span class=\"kb-math kb-math-inline\">A, B \\in \\mathbb{R}^{1024 \\times 1024}</span>）的优化过程，最终达到 PyTorch 的 1.16x 加速。关键优化步骤包括：</p>\n<ol>\n<li><strong>层级化 Tiling</strong>：</li>\n<li>CTA 级别：128×128 tile</li>\n<li>Warp 级别：64×32 tile</li>\n<li>\n<p>指令级别：16×16×16 WMMA（Warp Matrix Multiply-Accumulate）</p>\n</li>\n<li>\n<p><strong>双缓冲共享内存（Double-Buffered SMEM）</strong>：</p>\n</li>\n<li>分配两组共享内存缓冲区，一组用于当前计算，另一组预取下一个 tile</li>\n<li>\n<p>通过流水线化隐藏全局内存访问延迟</p>\n</li>\n<li>\n<p><strong>内联 PTX 异步拷贝</strong>：</p>\n</li>\n<li>使用 <code>cp.async</code> 指令实现全局内存到共享内存的异步数据传输</li>\n<li>\n<p>通过 <code>cp.async.commit_group</code> 和 <code>cp.async.wait_group</code> 管理异步操作的同步</p>\n</li>\n<li>\n<p><strong>Skew Padding</strong>：</p>\n</li>\n<li>在共享内存中添加 padding 以消除 bank conflict</li>\n<li>例如将 128×16 的 tile 存储为 128×(16+padding) 的布局</li>\n</ol>\n<h5>实验结果</h5>\n<p>在 RTX 4090 上的 KernelBench Level-1 基准测试结果（相对于 PyTorch 的加速比）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>任务类别</th>\n<th>具体任务</th>\n<th>加速比</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>GEMM</td>\n<td>Square GEMM (1024×1024)</td>\n<td>1.16x</td>\n</tr>\n<tr>\n<td>GEMM</td>\n<td>Rectangular MatMul</td>\n<td>1.07x</td>\n</tr>\n<tr>\n<td>GEMM</td>\n<td>Batched MatMul</td>\n<td>0.85x</td>\n</tr>\n<tr>\n<td>GEMM</td>\n<td>Transposed MatMul</td>\n<td>1.05x</td>\n</tr>\n<tr>\n<td>GEMM</td>\n<td>Diagonal MatMul</td>\n<td><strong>17.66x</strong></td>\n</tr>\n<tr>\n<td>激活函数</td>\n<td>Swish</td>\n<td>2.45x</td>\n</tr>\n<tr>\n<td>激活函数</td>\n<td>Softsign</td>\n<td><strong>3.45x</strong></td>\n</tr>\n<tr>\n<td>激活函数</td>\n<td>Softplus</td>\n<td>1.83x</td>\n</tr>\n<tr>\n<td>激活函数</td>\n<td>GELU</td>\n<td>1.02x</td>\n</tr>\n<tr>\n<td>激活函数</td>\n<td>HardSigmoid</td>\n<td>1.25x</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键发现</strong>：Diagonal MatMul 的 17.66x 加速来自于 CuTeGen 识别出对角矩阵的稀疏结构，生成了专门的稀疏 Kernel 而非通用 GEMM。这展示了 LLM Agent 在算法层面的优化能力，而非仅仅是底层代码调优。</div>",
      "quiz": {
        "q": "CuTeGen 中 Delayed Profiling 机制的主要目的是什么？",
        "options": [
          "减少 GPU profiling 的计算开销",
          "避免过早性能评估导致优化搜索陷入局部最优",
          "确保每次优化都能提升性能",
          "加速优化搜索树的遍历速度"
        ],
        "answer": 1,
        "explain": "Delayed Profiling 将性能测量推迟到搜索树较深层级，因为早期的结构性优化（如 tiling、双缓冲）需要多步组合才能显现效果，过早 profiling 会误导 Agent 放弃有潜力的优化路径。"
      }
    },
    {
      "id": "autokernel",
      "num": 41,
      "name": "AutoKernel",
      "fullName": "自主GPU Kernel迭代优化智能体 (AutoKernel)",
      "year": "2026",
      "org": "Community",
      "parent": "triton",
      "paperUrl": "https://arxiv.org/abs/2603.21331",
      "projectUrl": "",
      "category": "llm_driven",
      "motivation": "Agent闭环迭代优化GPU Kernel性能",
      "summary": "AutoKernel 把 GPU kernel 性能工程抽象成“profile → extract → agent edit → correctness-gated benchmark → keep/revert”的自主实验循环，用模型级 profiling 和 Amdahl 定律决定优化顺序，解决 LLM 一次性生成 kernel 不稳定、人工调参成本高的问题。",
      "keyPoints": [
        "<strong>模型级入口</strong>：从任意 PyTorch 模型出发，用 <code>torch.profiler</code> 捕获 GPU kernel 时间，而不是孤立优化单个手写题目",
        "<strong>Amdahl 定律排序</strong>：按 kernel 的端到端占比 <span class=\"kb-math kb-math-inline\">f</span> 与候选加速比 <span class=\"kb-math kb-math-inline\">s</span> 估算总收益，优先优化真正影响模型吞吐的瓶颈",
        "<strong>双后端实现</strong>：每类 kernel 同时提供 Triton 与 CUDA C++ starter，兼顾快速迭代和底层 tensor core/warp 原语控制",
        "<strong>单文件 agent 循环</strong>：agent 只修改 <code>kernel.py</code>，每次提交候选后由 benchmark 决定 keep 或 revert，保证实验历史线性、可回滚",
        "<strong>五阶段正确性门禁</strong>：smoke test、shape sweep、数值稳定性、确定性、edge cases 全部通过后才记录性能",
        "<strong>六层优化 playbook</strong>：block size、memory access、compute、advanced、architecture-specific、kernel-specific 技巧逐层推进",
        "<strong>Roofline 反馈</strong>：benchmark 报告 TFLOPS/GB/s 与峰值利用率，指导 agent 区分 compute-bound 与 memory-bound 优化",
        "<strong>多 kernel 编排</strong>：连续失败、接近硬件峰值、时间耗尽或达到 2× 加速时转向下一个 kernel，避免在局部瓶颈上过度搜索",
        "<strong>KernelBench 集成</strong>：覆盖 250 个标准化问题，并将 one-shot LLM 生成扩展为 50-300+ 次迭代 refinement"
      ],
      "detail": "<p><img alt=\"AutoKernel 项目进度图\" src=\"https://raw.githubusercontent.com/rightnow-ai/autokernel/main/progress.png\" />\n<em>图：AutoKernel 官方项目中的实验进度可视化。论文 Figure 1 的核心流程是 PyTorch Model → Profiler → Extractor → Agent edits <code>kernel.py</code> → 5-Stage Benchmark → Orchestrator → End-to-End Verifier；arXiv HTML 将该流程图以内嵌 SVG/TikZ 呈现，项目图展示同一迭代式实验轨迹。</em></p>\n<pre><code class=\"language-python\"># AutoKernel 单 kernel 优化循环与多 kernel 编排伪代码\ndef autokernel_compile(model, target_backend):\n    profile = torch_profile(model, warmup=5, active=10, record_shapes=True)\n    kernels = classify_and_rank_by_amdahl(profile)  # matmul, softmax, rmsnorm, ...\n\n    for kernel_spec in kernels:\n        kernel_py = extract_starter_kernel(model, kernel_spec, backend=target_backend)\n        best_kernel = kernel_py\n        best_throughput = benchmark_5_stage(best_kernel).throughput\n        consecutive_reverts = 0\n\n        while True:\n            roofline = analyze_roofline(best_kernel, kernel_spec.hardware)\n            candidate = agent_edit(best_kernel, history=load_tsv(), roofline=roofline)\n            git_commit(candidate)\n\n            result = benchmark_5_stage(candidate)\n            if result.pass_all and result.throughput &gt; 1.01 * best_throughput:\n                best_kernel = candidate\n                best_throughput = result.throughput\n                consecutive_reverts = 0\n                decision = &quot;keep&quot;\n            else:\n                git_reset_previous_commit()\n                consecutive_reverts += 1\n                decision = &quot;revert&quot;\n\n            log_tsv(kernel_spec.name, result, decision)\n            if should_move_on(consecutive_reverts, best_throughput, roofline, elapsed_time()):\n                break\n\n        plug_kernel_back_into_model(best_kernel)\n\n    return verify_end_to_end_correctness_and_speedup(model)\n</code></pre>\n<p><strong>动机：LLM 能写 kernel，但一次性生成不等于可部署性能工程。</strong> KernelBench 等工作证明 frontier LLM 可以生成部分 GPU kernel，但 one-shot 方案常见问题是边界条件错、dtype/shape 泛化差、速度偶然、不知道该优化哪个 kernel。AutoKernel 的关键判断是：真实模型里的收益不是“某个题目快多少”，而是“占总 GPU 时间的瓶颈快多少”。因此它先做模型级 profiling，再把热点算子抽成独立 kernel 文件，让 agent 在固定评测器里长期迭代。</p>\n<p><strong>Amdahl 编排把搜索预算投到端到端收益最大的地方。</strong> 论文中的多 kernel scheduler 使用：</p>\n<div class=\"kb-math kb-math-display\">S_{\\text{end-to-end}}=\\frac{1}{(1-f)+f/s}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">f</span> 是某个 kernel 占总 GPU 时间的比例，<span class=\"kb-math kb-math-inline\">s</span> 是该 kernel 自身加速比。直觉上，一个占 60% 时间的 matmul 提升 1.5×，端到端可达约 1.25×；一个占 5% 时间的算子即使提升 3×，端到端也只有约 1.03×。这让 AutoKernel 不会平均用力，而是把 overnight run 的 300-400 次实验集中到真正决定模型吞吐的 kernel 上。</p>\n<p><strong>Agent 循环的设计重点是“可证伪”，不是复杂多 agent 协商。</strong> 每轮 agent 基于历史 TSV、roofline 结果和 playbook 修改单个 <code>kernel.py</code>，benchmark 通过后才比较吞吐；只有 <code>pass_all</code> 且吞吐超过当前最佳 1% 以上才 keep，否则立即 revert。这个 1.01 阈值过滤计时噪声，单文件约束则保证候选变更可隔离。论文报告每轮约 90 秒：约 30 秒正确性检查、30 秒性能测量、30 秒 agent 思考和改代码，因此系统能以约 40 experiments/hour 的速度形成有效搜索轨迹。</p>\n<p><strong>五阶段正确性门禁专门针对 LLM kernel 的常见失败模式。</strong> Smoke test 捕获编译和明显 shape 错误；shape sweep 覆盖 8-10 个尺寸和 FP16/BF16/FP32；stability 用 overflow/underflow 等 adversarial inputs 检查数值稳定性；determinism 要求多次运行 bitwise 一致；edge cases 覆盖 1023、4097 等非 2 次幂尺寸。只有全部通过后才进入性能统计，这相当于把“快但错”的候选从搜索空间里硬删除。</p>\n<p><strong>Roofline 反馈把自然语言优化建议落到硬件瓶颈。</strong> 对候选 kernel，benchmark 会计算算术强度 <span class=\"kb-math kb-math-inline\">I=\\text{FLOPs}/\\text{Bytes}</span>，并用近似 roofline：</p>\n<div class=\"kb-math kb-math-display\">P_{\\text{attainable}}=\\min(P_{\\text{peak}}, I \\cdot B_{\\text{mem}})</div>\n<p>判断当前更像 compute-bound 还是 memory-bound。若 RMSNorm 这类 kernel 受内存带宽限制，agent 应优先尝试 coalesced loads、vectorized load/store、减少中间写回和融合 epilogue；若 matmul 受 tensor core 利用率限制，则优先调整 tile shape、<code>num_warps</code>、pipeline stages、split-K、persistent kernel 或 CUDA WMMA/MMA 路径。</p>\n<p><strong>与传统 auto-tuning 的差异在于搜索对象是完整程序变体。</strong> TVM/AutoTVM 通常在预定义 schedule 参数空间里搜索，AutoKernel 则让 LLM 直接编辑 Triton/CUDA 源码，搜索空间包含循环结构、边界处理、数据布局、精度累加、kernel fusion 和硬件专用路径。代价是正确性风险更大，所以论文把固定 benchmark、五阶段测试、git keep/revert 和 TSV 记录作为系统核心，而不是把 LLM 当成无约束代码生成器。</p>\n<div class=\"key-point\">💡 关键：AutoKernel 的贡献不是某个单独 kernel 技巧，而是把专家 kernel 工程的实验闭环产品化：模型级定位瓶颈、正确性先行、硬件反馈驱动、失败自动回滚、收益按端到端影响排序。</div>",
      "quiz": {
        "q": "AutoKernel 用 Amdahl 定律排序 kernel 的主要目的是什么？",
        "options": [
          "让所有 kernel 获得完全相同的优化时间",
          "优先优化对端到端模型吞吐贡献最大的瓶颈 kernel",
          "避免运行任何正确性测试",
          "只选择 CUDA C++ 后端而不使用 Triton"
        ],
        "answer": 1,
        "explain": "Amdahl 定律把 kernel 自身加速比和其总耗时占比结合起来，能估算端到端收益，避免把大量实验预算浪费在低占比算子上。"
      }
    },
    {
      "id": "acclaim",
      "num": 42,
      "name": "ACCLAIM",
      "fullName": "编译器-LLM协作代码优化系统 (ACCLAIM)",
      "year": "2026",
      "org": "Community",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2604.04238",
      "projectUrl": "",
      "category": "llm_driven",
      "motivation": "源码-IR-汇编三层LLM协作，系统化编译优化决策",
      "summary": "ACCLAIM 提出 compiler-LLM cooperation：让 LLM 在源代码、LLVM IR、x86 汇编三个抽象层做创造性重写，同时把 clang frontend/middle-end/backend 作为可靠工具交给 guiding agent 编排，从而在正确性测试约束下获得超过单层 LLM 优化和传统 `clang -O3` 的性能。",
      "keyPoints": [
        "<strong>三层优化空间</strong>：同时支持 C source、LLVM IR、x86 assembly 三个层级的 LLM rewrite",
        "<strong>编译器组件工具化</strong>：clang frontend、middle-end、backend 被建模为 guiding agent 可调用工具",
        "<strong>Guiding agent 编排</strong>：中心 LLM 动态选择调用源代码 agent、IR agent、汇编 agent 或编译器组件，并允许回退、重复调用和跨层协同",
        "<strong>Level-specific agent</strong>：每个层级 agent 使用 <span class=\"kb-math kb-math-inline\">n</span> 个并行样本和 <span class=\"kb-math kb-math-inline\">k</span> 轮反馈迭代，选择最快且正确的候选",
        "<strong>Testing agent</strong>：先生成测试脚本，再在每次候选评测时运行正确性输入和大规模输入，给出 correctness/performance 反馈",
        "<strong>形式化问题定义</strong>：把 rewrite、lowering、compiler、agent 和 testing 都写成函数组合，目标是在正确性为 1 的约束下最大化性能",
        "<strong>预算分配机制</strong>：guiding agent 有预算 <span class=\"kb-math kb-math-inline\">b</span>，调用 LLM level-specific agent 计费，调用本地编译器组件近似免费",
        "<strong>实验证据</strong>：在 Project CodeNet C 程序上，相比 <code>clang -O3</code> 可达到最高约 1.25× 平均加速，少数程序出现大幅加速",
        "<strong>关键发现</strong>：source-level 贡献最大，但 IR/assembly 和编译器 pass 的交互能产生单层方案难以发现的协同优化"
      ],
      "detail": "<p><img alt=\"ACCLAIM 加速分布图\" src=\"https://arxiv.org/html/2604.04238v1/histo_1822.png\" />\n<em>图：ACCLAIM 论文 arXiv HTML 暴露的 Figure 4 结果图之一，展示 ACCLAIM 相对基线的 speedup 分布。论文 Figure 1/3 的系统架构为内嵌 TikZ/SVG：Input Source 由 guiding agent 在 Source Agent、IR Agent、Assembly Agent、Compiler Frontend/Middle-end/Backend 与 Testing Agent 之间调度，最终输出 assembly。</em></p>\n<pre><code class=\"language-python\"># ACCLAIM 的 compiler-LLM cooperation 伪代码\ndef acclaim_optimize(source_program, compiler, budget_b, samples_n, loops_k):\n    tests = testing_agent_generate_script(source_program)\n    state = Program(level=&quot;source&quot;, code=source_program)\n    best = compile_with_clang_O3(source_program)\n    context = {&quot;history&quot;: [], &quot;best&quot;: best, &quot;tests&quot;: tests}\n\n    while budget_b &gt; 0:\n        tool = guiding_agent_choose_tool(\n            tools=[\n                compiler.frontend,      # source -&gt; LLVM IR\n                compiler.middle_end,    # LLVM IR -&gt; optimized LLVM IR\n                compiler.backend,       # LLVM IR -&gt; x86 assembly\n                source_agent, ir_agent, assembly_agent\n            ],\n            context=context,\n        )\n\n        if tool in compiler.components:\n            state = tool(state)         # 本地编译器组件近似免费且通常保持语义\n            feedback = &quot;lowered_or_rewritten_by_compiler&quot;\n        else:\n            budget_b -= 1\n            state, feedback = level_specific_loop(\n                agent=tool,\n                program=state,\n                tests=tests,\n                n=samples_n,\n                k=loops_k,\n            )\n\n        result = testing_agent_run(state, tests)\n        if result.correct and result.speedup &gt; best.speedup:\n            best = maybe_lower_to_assembly(state, compiler)\n        context[&quot;history&quot;].append((tool.name, feedback, result))\n\n    return maybe_lower_to_assembly(best, compiler)\n\ndef level_specific_loop(agent, program, tests, n, k):\n    best = program\n    feedback = &quot;&quot;\n    for _ in range(k):\n        candidates = [agent.rewrite(best, feedback) for _ in range(n)]\n        scored = [testing_agent_run(c, tests) for c in candidates]\n        correct = [x for x in scored if x.correct]\n        if correct:\n            best = max(correct, key=lambda x: x.speedup).program\n            feedback = summarize_success(correct)\n        else:\n            feedback = summarize_failures(scored)  # compile errors + failing cases\n    return best, feedback\n</code></pre>\n<p><strong>动机：LLM 有“语义跳跃”能力，编译器有“保守正确”能力。</strong> 论文用 popcount 示例说明协作价值：LLM 可以从源代码或 IR 中识别“循环在数 bit”，把内层循环改成 <code>llvm.ctpop</code> 这样的语义 intrinsic；传统 LLVM 在该上下文中未必会主动引入这个高层语义。但一旦 LLM 暴露出 <code>ctpop</code>，LLVM 又能可靠地做向量化，把多个 scalar popcount 变成 vector intrinsic。ACCLAIM 的设计目标就是让这两类能力串起来，而不是让 LLM 直接替代编译器。</p>\n<p><strong>形式化框架把“调用哪个层级”变成组合优化问题。</strong> 论文定义有序语言集合 <span class=\"kb-math kb-math-inline\">\\mathbb{L}=\\{L_1,L_2,\\dots,L_n\\}</span>，例如 <span class=\"kb-math kb-math-inline\">L_1</span> 是 C source，<span class=\"kb-math kb-math-inline\">L_2</span> 是 LLVM IR，<span class=\"kb-math kb-math-inline\">L_n</span> 是 assembly。层内重写是：</p>\n<div class=\"kb-math kb-math-display\">f: L_i \\rightarrow L_i</div>\n<p>跨层 lowering 是：</p>\n<div class=\"kb-math kb-math-display\">f: L_i \\rightarrow L_j,\\quad i&lt;j</div>\n<p>编译器是这些 rewrite/lowering 的有限集合与合法序列；level-specific LLM agent 也是某个 <span class=\"kb-math kb-math-inline\">L_i</span> 上的 rewrite。最终目标是构造一个函数组合 <span class=\"kb-math kb-math-inline\">\\mathcal{C}</span>，在输出落到最低层语言的同时满足：</p>\n<div class=\"kb-math kb-math-display\">\\max_{\\mathcal{C}} T_{\\text{perf}}(\\mathcal{C}(p))\n\\quad \\text{s.t.} \\quad\nT_{\\text{correct}}(\\mathcal{C}(p)) = 1</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">T_{\\text{perf}}</span> 可理解为原程序运行时间与候选程序运行时间之比，<span class=\"kb-math kb-math-inline\">T_{\\text{correct}}</span> 是测试通过比例。这个定义把 ACCLAIM 变成一个受正确性约束的 phase-ordering/search 问题。</p>\n<p><strong>Guiding agent 是 phase ordering 的学习型控制器。</strong> 它有 6 个工具：clang frontend、clang middle-end、clang backend、source agent、IR agent、assembly agent。调用编译器组件成本近似为 0，调用 level-specific agent 消耗预算 <span class=\"kb-math kb-math-inline\">b</span>。系统不固定顺序，因此可以 source → frontend → IR agent → backend，也可以发现结果不佳后回到 source 层重试。论文观察到 guiding agent 会重复调用某个层级，也会从 backend 回到 frontend/source，这说明它不是线性编译管线，而是在不同抽象层之间做动态试探。</p>\n<p><strong>Level-specific agent 用 sampling 和反馈环抵消 LLM 不稳定性。</strong> 每个层级 agent 参数化为 <span class=\"kb-math kb-math-inline\">n</span> 个并行样本和 <span class=\"kb-math kb-math-inline\">k</span> 轮反馈循环，总 LLM 生成预算近似随 <span class=\"kb-math kb-math-inline\">b \\times n \\times k</span> 增长。每轮会生成 <span class=\"kb-math kb-math-inline\">n</span> 个候选，testing agent 评测后只保留最快且正确的候选；如果一个样本集合全错，则把编译错误、失败测试或性能反馈压缩进下一轮上下文。论文的 ablation 发现，在 Claude 3.7 Sonnet 设置下，把预算更多投给反馈迭代（如 <span class=\"kb-math kb-math-inline\">n=1,k=4</span>）通常比只扩大并行采样更好，因为反馈能提升正确生成比例。</p>\n<p><strong>Testing agent 的职责不只是跑单元测试，而是构造性能可区分输入。</strong> 它先基于原始程序生成 deterministic test script；每次评测时产生 <span class=\"kb-math kb-math-inline\">C</span> 个 correctness exploration inputs 和 <span class=\"kb-math kb-math-inline\">L</span> 个 large-scale inputs，论文实验中使用 <span class=\"kb-math kb-math-inline\">C=10,L=5</span>。大规模输入需要跨数量级变化，才能区分两个候选的渐近复杂度。例如网格 BFS 程序如果只测小网格，就看不出把每行 <code>malloc</code> 改成整块分配的系统调用复杂度差异。</p>\n<p><strong>与传统编译器优化相比，ACCLAIM 的优势来自跨层语义与成本模型互补。</strong> LLVM 的 <code>-O3</code> 必须依赖通用、安全、可证明收益的局部规则和成本模型；LLM 能根据程序意图提出更大胆的结构性改写，例如把 <span class=\"kb-math kb-math-inline\">H</span> 次行分配改成一次连续内存分配，或者在 IR 中把乘 7 改写为左移 3 再减原值。风险是 LLM 经常生成错误代码，尤其在 IR/assembly 层。因此 ACCLAIM 并不信任 LLM 输出，而是把所有 LLM rewrite 放进 testing agent 与 compiler lowering 的闭环中。</p>\n<div class=\"warn-box\">⚠️ 注意：ACCLAIM 的正确性仍主要依赖测试而非形式化等价验证。论文明确讨论了 testing 可能漏错，未来可把 Alive2、translation validation 或更强 verification agent 接入同一模块化框架。</div>",
      "quiz": {
        "q": "ACCLAIM 中 guiding agent 的核心作用是什么？",
        "options": [
          "只在源码层调用一次 LLM 并直接输出 C 代码",
          "动态选择编译器组件和不同抽象层的 LLM agent，在正确性约束下搜索更快程序",
          "替代 clang 的所有 frontend、middle-end 和 backend",
          "只生成测试数据，不参与优化决策"
        ],
        "answer": 1,
        "explain": "Guiding agent 将 clang 组件和 source/IR/assembly agent 都视为工具，并根据反馈决定下一步调用顺序，本质上是在求解跨层 phase-ordering 与 LLM rewrite 的组合优化。"
      }
    },
    {
      "id": "deep_compile",
      "num": 43,
      "name": "DeepCompile",
      "fullName": "编译器驱动分布式训练优化系统 (DeepCompile)",
      "year": "2026",
      "org": "Microsoft/UVA",
      "parent": "torch_dynamo",
      "paperUrl": "https://arxiv.org/abs/2504.09983",
      "projectUrl": "",
      "category": "graph_compilers",
      "motivation": "编译器驱动主动预取与自适应offloading优化分布式训练",
      "summary": "DeepCompile 把 ZeRO-3/FSDP 风格 fully sharded training 从 Python hook 触发的运行时策略提升为编译器图变换问题，用 profiling-guided passes 精细插入、移动或删除 all-gather、release、offload/reload 操作，从而协调 proactive prefetching、selective unsharding 与 adaptive offloading。",
      "keyPoints": [
        "<strong>图级分布式训练优化</strong>：基于 PyTorch/base compiler 产生的计算图，直接重写通信和内存操作",
        "<strong>Fully sharded 基线 pass</strong>：为参数首次使用前插入 all-gather，为最后使用后插入 release，缩短 gather buffer 生命周期",
        "<strong>Profiling-guided pass loop</strong>：每个 pass 后运行图并收集 operator time、communication time、memory usage，为后续 pass 提供更新反馈",
        "<strong>Proactive prefetching</strong>：按动态内存曲线尽早调度 all-gather，使通信与计算重叠，同时不越过显存上限",
        "<strong>All-gather fusion</strong>：用 profiled communication time 判断小消息是否合并，减少多次通信启动开销",
        "<strong>Selective unsharding</strong>：在 prefetch 后用剩余显存保留部分参数的 unsharded 版本，尤其利于 gradient accumulation",
        "<strong>Adaptive offloading</strong>：只 offload 超出显存限制的 optimizer state fragment，并用异步拷贝与 forward/backward 计算重叠",
        "<strong>Pass 顺序意识</strong>：先 prefetch 再 selective unsharding，避免 unsharding 抢光 prefetch buffer",
        "<strong>大模型验证</strong>：在 Llama 3 70B 与 Mixtral 8x7B MoE 上相对 ZeRO-3/FSDP 提升吞吐，资源受限 offloading 场景最高约 7.01×"
      ],
      "detail": "<p><img alt=\"DeepCompile 工作流\" src=\"https://arxiv.org/html/2504.09983v2/figs/workflow.png\" />\n<em>图：DeepCompile workflow。Base compiler 将用户训练脚本和模型降为 IR/计算图，DeepCompile 注入 distributed training optimizations，再交给 GPU runtime 执行。</em></p>\n<p><img alt=\"DeepCompile prefetch 内存影响\" src=\"https://arxiv.org/html/2504.09983v2/figs/prefetch_mem.png\" />\n<em>图：proactive prefetching 对内存占用与通信-计算重叠的影响。固定 prefetch buffer 可能过于保守或触发 OOM，DeepCompile 根据 profiling 动态决定 all-gather 提前位置。</em></p>\n<pre><code class=\"language-python\"># DeepCompile proactive prefetching 核心伪代码\ndef proactive_prefetch(S0, M, M_prefetch, profiled_mem, allgather_buffer):\n    S = []   # output schedule\n    U = []   # unscheduled all-gathers that may be moved earlier\n\n    # 反向扫描：尝试把后面才需要的 all-gather 往前提\n    for i in reversed(range(1, len(S0))):\n        op = S0[i]\n        if is_allgather(op):\n            m_u = sum(allgather_buffer[x] for x in U + [op])\n            m_before_prev = profiled_mem[S0[i - 1]] + m_u\n\n            if m_before_prev &lt; M and m_u &lt; M_prefetch:\n                U.append(op)\n            else:\n                S.extend(fuse_allgathers(U))\n                U = []\n        else:\n            S.append(op)\n\n    S.extend(fuse_allgathers(U))\n    return reverse_to_execution_order(S)\n\ndef adaptive_offload_forward(S0, M, optimizer_state_fragments, profiled_mem):\n    S = []\n    offloaded = []\n    offloaded_size = 0\n    peak = max(profiled_mem[op] for op in S0)\n    opt_size = sum(fragment.size for fragment in optimizer_state_fragments)\n\n    for fragment in optimizer_state_fragments:\n        if peak + opt_size - sum(x.size for x in offloaded) &gt; M:\n            S.append(async_offload(fragment))\n            offloaded.append(fragment)\n\n    for op in S0:\n        while profiled_mem[op] + opt_size - offloaded_size &gt; M:\n            fragment = offloaded.pop()\n            S.append(sync_copy_and_free(fragment))\n            offloaded_size += fragment.size\n        S.append(op)\n\n    return S\n</code></pre>\n<p><strong>动机：ZeRO-3/FSDP 的 hook 机制缺少全局时序控制。</strong> Fully sharded 方法把每层参数切到多 GPU 上，计算前 all-gather 出完整参数，计算后释放。这个策略能省显存，但如果 all-gather 总是在层边界前一刻启动，通信无法和计算充分重叠；如果静态提前太多，又会延长 gather buffer 生命周期并触发 OOM。DeepCompile 的判断是：这些决策本质上是图中 operator 的调度与内存生命周期问题，应该由编译器在全图依赖和 profiling 信息上统一处理。</p>\n<p><strong>系统流程是 pass + profiling 的两层循环。</strong> DeepCompile 先接收 base compiler 的 IR，插入 sharded training 所需的 all-gather/release。随后每个 optimization pass 都会改写图并运行短 profiling，收集算子执行时间、通信时间和显存曲线；外层还会周期性跑训练迭代，以捕获 Adam optimizer state 等运行时状态带来的内存变化。这样后续 pass 看到的是“前面 pass 已经改变后的真实内存曲线”，能协调 prefetch、unsharding 和 offloading，而不是各自按静态启发式独立决策。</p>\n<p><strong>Proactive prefetching 的核心是带内存约束的反向移动。</strong> 设初始 schedule 为 <span class=\"kb-math kb-math-inline\">S_0=[o_1,\\dots,o_N]</span>，显存上限为 <span class=\"kb-math kb-math-inline\">M</span>，profiled memory 为 <span class=\"kb-math kb-math-inline\">\\text{P}_{\\text{mem}}(o)</span>，all-gather buffer 大小为 <span class=\"kb-math kb-math-inline\">\\text{B}_{\\text{ag}}(o)</span>。算法从后往前扫描 all-gather，维护待提前集合 <span class=\"kb-math kb-math-inline\">U</span>，并检查：</p>\n<div class=\"kb-math kb-math-display\">\\tilde{m}_U=\\sum_{o\\in U\\cup\\{o_i\\}}\\text{B}_{\\text{ag}}(o)</div>\n<div class=\"kb-math kb-math-display\">\\tilde{m}_{i-1}=\\text{P}_{\\text{mem}}(o_{i-1})+\\tilde{m}_U</div>\n<p>只有当 <span class=\"kb-math kb-math-inline\">\\tilde{m}_{i-1}&lt;M</span> 且 <span class=\"kb-math kb-math-inline\">\\tilde{m}_U&lt;M_{\\text{prefetch}}</span> 时，all-gather 才能继续提前。这个条件直接表达了“通信越早越能重叠，但提前后 buffer 活得更久，不能压爆显存”的权衡。</p>\n<p><strong>All-gather fusion 用实测通信曲线决定是否合并。</strong> 对两个通信量 <span class=\"kb-math kb-math-inline\">V_1,V_2</span>，DeepCompile 用 profiled communication time <span class=\"kb-math kb-math-inline\">T_c(V)</span> 判断：</p>\n<div class=\"kb-math kb-math-display\">T_c(V_1)+T_c(V_2)&gt;\\alpha\\cdot T_c(V_1+V_2)</div>\n<p>若成立，则把两个 all-gather 合并。小消息的通信启动开销常常占主导，合并后虽然消息更大，但总时间可能更低。论文实验中 <span class=\"kb-math kb-math-inline\">M_{\\text{prefetch}}</span> 设为 2GB，<span class=\"kb-math kb-math-inline\">\\alpha</span> 约为 1.5；同时保留 prefetch group 上限，是为了给后续 selective unsharding 留出显存空间。</p>\n<p><strong>Selective unsharding 利用 prefetch 后剩余显存减少重复通信。</strong> 在 gradient accumulation step 为 <span class=\"kb-math kb-math-inline\">n</span> 时，模型会执行 <span class=\"kb-math kb-math-inline\">n</span> 次 forward/backward 后才更新参数；这段时间内，已经 gather 的参数如果保持 unsharded，就能避免后续 micro-step 重复 all-gather。DeepCompile 根据每个 all-gather 的通信时间和 buffer 大小排序，优先选择单位显存收益高的参数：</p>\n<div class=\"kb-math kb-math-display\">\\text{score}(o)=\\frac{T_c(\\text{B}_{\\text{ag}}(o))}{\\text{B}_{\\text{ag}}(o)}</div>\n<p>直觉上，小消息通信效率较差，单位字节通信开销更高，所以保留这些参数的 unsharded 版本往往更划算。</p>\n<p><strong>Adaptive offloading 只搬必要 optimizer state，并把搬运隐藏进训练时序。</strong> Adam 的 momentum/variance 等 optimizer states 在 forward/backward 中不用，只在参数更新时需要。传统 ZeRO offload 往往把 optimizer state 大量移到 CPU，节省显存但参数更新很慢。DeepCompile 先把 optimizer states 切成 fragments，只 offload 会导致 <span class=\"kb-math kb-math-inline\">M_{\\text{peak}}+M_{\\text{opt}}&gt;M</span> 的部分；forward 初期异步 offload，接近显存峰值前同步并释放；backward 中随着 activation 释放，再异步 reload 回 GPU。其内存约束可以概括为：</p>\n<div class=\"kb-math kb-math-display\">\\text{P}_{\\text{mem}}(o_i)+M_{\\text{opt}}-M^- \\le M</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">M^-</span> 是已经成功 offload 并释放的 optimizer state 大小。这样 offloading 不再是固定“训练前搬走、训练后搬回”的停顿，而是由 profiling 驱动的异步数据流。</p>\n<p><strong>与 Alpa/Unity/nnScaler 等并行编译器的区别在于运行时内存曲线。</strong> Alpa 类系统主要搜索并行策略与静态 cost model，DeepCompile 当前不重点发明新的 parallelism search，而是把 fully sharded 训练中的通信时序、buffer 生命周期和 optimizer state 迁移变成可组合的图 pass。它与 SimpleFSDP 也不同：SimpleFSDP 聚焦 compiler-based prefetch/fusion，而 DeepCompile 让后续 pass 读取前序 pass 的 profiling 结果，因此可以处理 prefetch 与 unsharding 的相互影响。</p>\n<div class=\"key-point\">💡 关键：DeepCompile 的核心价值是“把运行时启发式变成可反馈的编译器图变换”。每个 pass 改图，每次 profiling 更新事实，后续 pass 再基于新的显存曲线做决策。</div>",
      "quiz": {
        "q": "DeepCompile 为什么建议先应用 proactive prefetching，再应用 selective unsharding？",
        "options": [
          "因为 unsharding 只能在 CPU 上执行",
          "因为 prefetch 先占用必要的通信缓冲后，unsharding 才能用剩余显存选择保留哪些参数",
          "因为 all-gather 在 fully sharded training 中不需要显存",
          "因为 adaptive offloading 会禁用所有 prefetch 操作"
        ],
        "answer": 1,
        "explain": "如果先 unshard，会尽可能占用空闲显存，导致 prefetch 缺少 buffer 而无法提前通信；先 prefetch 再 unshard 能让两种优化共享同一显存预算。"
      }
    },
    {
      "id": "flex_linear_attn",
      "num": 44,
      "name": "FlexLinearAttention",
      "fullName": "线性注意力统一抽象编译框架 (FlexLinearAttention)",
      "year": "2026",
      "org": "Community",
      "parent": "flash_attention",
      "paperUrl": "https://openreview.net/forum?id=N4jJQvQSiN",
      "projectUrl": "",
      "category": "hardware_specific",
      "motivation": "统一抽象将线性注意力变体编译为可扩展高效内核",
      "summary": "FlexLinearAttention 提出 FlexLA 编译器，把线性注意力变体统一拆成 intra-chunk computation、inter-chunk state propagation 和 output merging 三个阶段，解决每个新变体都要手写单机和分布式内核的问题，并把高层 PyTorch 描述编译为可扩展的 Triton-Distributed 内核。",
      "keyPoints": [
        "三阶段 DSL：用户只需实现 <code>chunk_mode</code>、<code>decay_mode</code>、<code>merge_mode</code> 三个 PyTorch callable，就能表达 HGRN、RetNet、Mamba2、GLA、Gated DeltaNet 等线性注意力变体",
        "编译前端：使用 Torch.fx 捕获三段函数的计算图，再做领域相关 graph rewrite、custom operator substitution、common subexpression elimination 和 transpose elimination",
        "领域优化：围绕 chunk-wise linear attention 的并行/串行边界决定是否融合 chunk、decay、merge，减少全局内存中间状态，同时避免把本可并行的 chunk 计算串行化",
        "分布式后端：基于 Triton-Distributed 生成带 OpenSHMEM 风格通信原语的代码，把 inter-chunk state propagation 中的跨设备通信融合到 tile 级计算中",
        "系统优化：通过 AOT 编译、静态 kernel dispatcher 和 profile-guided dispatch 避免短序列场景中 Triton runtime / Python 调度开销",
        "论文结果：单 GPU 生成内核达到 FLA 手写内核的 1.01x-4.9x 性能；分布式 scalar GLA 可在 128 GPU 上扩展到 1600 万 token，并相对 LASP-2 最高加速 7.2x"
      ],
      "detail": "<p><img alt=\"FlexLA OpenReview 论文页面截图\" src=\"https://image.thum.io/get/width/1200/crop/900/https://openreview.net/forum?id=N4jJQvQSiN\" />\n<em>图：公开截图服务对 FlexLA 官方 OpenReview 页面生成的远程图片。论文的核心框架图位于 OpenReview 官方 PDF 的 Figure 3，展示 FlexLA 从三阶段 DSL 到 Torch.fx graph、领域图重写、Triton-Distributed 代码生成、AOT 编译和 tile-level compute-communication overlap 的管线；OpenReview 当前未拆出独立 Figure PNG，因此这里使用可访问的远程页面截图作为图片 URL，并在正文基于官方 PDF Figure 3 解读。</em></p>\n<pre><code class=\"language-python\"># FlexLA 三阶段抽象到分布式内核的概念伪代码\ndef compile_linear_attention(chunk_mode, decay_mode, merge_mode, tensors, cluster):\n    # 1. 捕获用户用 PyTorch 写出的线性注意力语义\n    chunk_fx = torch_fx_trace(chunk_mode, tensors.local_chunk_inputs)\n    decay_fx = torch_fx_trace(decay_mode, tensors.state_inputs)\n    merge_fx = torch_fx_trace(merge_mode, tensors.merge_inputs)\n\n    # 2. 用线性注意力领域知识重写图\n    graphs = [chunk_fx, decay_fx, merge_fx]\n    graphs = substitute_custom_ops(graphs, ops=[&quot;lower_triangular_inverse&quot;, &quot;scan&quot;, &quot;state_update&quot;])\n    graphs = eliminate_transposes_and_cse(graphs)\n    graphs = annotate_hardware_features(graphs, tma=cluster.gpu_supports_tma)\n\n    # 3. 选择执行策略：是否融合阶段、如何切 tile、是否跨 GPU 传播状态\n    plan = schedule_parallelism(\n        graphs,\n        chunk_size=tensors.chunk_size,\n        state_shape=tensors.state_shape,\n        devices=cluster.num_gpus,\n        objective=&quot;minimize(memory_traffic + communication_latency + dispatch_overhead)&quot;,\n    )\n\n    # 4. 下降到 Triton-Distributed\n    kernels = lower_to_triton_distributed(graphs, plan)\n    kernels = fuse_tile_level_compute_and_comm(\n        kernels,\n        communication_phase=&quot;inter_chunk_state_propagation&quot;,\n        primitive=&quot;OpenSHMEM-style put/get&quot;,\n    )\n\n    # 5. AOT 编译并生成静态 dispatcher\n    binaries = aot_compile(kernels, static_dims=plan.static_dims)\n    return make_static_dispatcher(binaries, profile_db=plan.profile_db)\n</code></pre>\n<p><strong>动机：线性注意力不是一种固定算子，而是一族快速变化的状态更新规则。</strong> Softmax attention 已经有 FlashAttention、RingAttention 这类稳定的手写高性能内核，但线性注意力的设计空间更碎：有的状态是向量，有的是矩阵；有的 decay 是标量，有的是 data-dependent vector 或 matrix；Gated DeltaNet 还包含 delta-rule 风格的矩阵更新。若每个变体都手写 Triton/CUDA，就必须同时处理分块、状态传播、共享内存容量、通信重叠和 tile 参数，研究迭代速度会被 kernel 工程拖慢。FlexLA 的核心判断是：这些变体在 token 级更新上不同，但在 chunk-wise parallel form 上都能被拆成“块内摘要、块间状态、块内合并”。</p>\n<p>线性注意力的基础递推可以写成：</p>\n<div class=\"kb-math kb-math-display\">S_t = S_{t-1} + k_t v_t^\\top,\\qquad o_t = q_t S_t</div>\n<p>相对 softmax attention 的</p>\n<div class=\"kb-math kb-math-display\">O = \\operatorname{softmax}(QK^\\top \\odot M)V</div>\n<p>它把二次复杂度的注意力矩阵替换为可递推的状态 <span class=\"kb-math kb-math-inline\">S_t</span>。但是纯递推形式串行，完全并行形式又回到 <span class=\"kb-math kb-math-inline\">O(L^2)</span>。FlexLA 依赖的 chunk-wise 形式把长度 <span class=\"kb-math kb-math-inline\">L</span> 的序列按大小 <span class=\"kb-math kb-math-inline\">C</span> 切块，对第 <span class=\"kb-math kb-math-inline\">i</span> 个 chunk 写成：</p>\n<div class=\"kb-math kb-math-display\">S[i] = S[i-1] + K[i]^\\top V[i]</div>\n<div class=\"kb-math kb-math-display\">O[i] = Q[i]S[i-1] + \\left(Q[i]K[i]^\\top \\odot M\\right)V[i]</div>\n<p>这两个式子正好对应三阶段接口：<code>chunk_mode</code> 产生当前块的 state summary，<code>decay_mode</code> 把前序块状态传播到当前块开头，<code>merge_mode</code> 把全局 state readout 和块内 masked attention 合并成输出。</p>\n<p><strong>编译机制：用 Torch.fx 保留 PyTorch 可写性，再用领域规则缩小优化空间。</strong> FlexLA 并不是把任意 PyTorch 图交给通用编译器硬猜，而是先要求用户把语义放进三个 callable 中。这个边界告诉编译器哪些节点是 embarrassingly parallel 的 chunk 计算，哪些节点是有前缀依赖且可能需要跨设备通信的 state propagation。前端 tracing 得到 Torch.fx graph 后，编译器会把某些 PyTorch op 替换为领域手写算子，例如 Gated DeltaNet 中更适合定制 Triton 的 triangular inverse；同时做转置消除、公共子表达式消除和硬件属性标注。这样保留了 PyTorch 层面的表达能力，又避免通用图编译器在海量 schedule 空间中盲搜。</p>\n<p><strong>分布式关键在第二阶段，而不是把 NCCL collective 套在外层。</strong> 对于超长上下文，序列长度超过单卡容量后必须做 sequence parallelism。传统做法常用 All-Gather 等粗粒度 collective，但线性注意力的 state propagation 更像沿 chunk 维度的前缀传播，数据依赖粒度比一个完整 tensor 更细。FlexLA 把通信限制在 <code>decay_mode</code> 所在的 inter-chunk phase，并基于 Triton-Distributed 生成 GPU-initiated communication。可把一个 tile 的时间近似拆为：</p>\n<div class=\"kb-math kb-math-display\">T_{\\text{tile}} \\approx \\max(T_{\\text{compute}}, T_{\\text{comm}}) + T_{\\text{sync-residual}}</div>\n<p>而不是传统串行的 <span class=\"kb-math kb-math-inline\">T_{\\text{compute}} + T_{\\text{comm}} + T_{\\text{host-sync}}</span>。当通信以 tile 为单位被插入到计算流水线中，NIC 和 GPU 更容易同时忙起来，host synchronization 也被消除。</p>\n<p><strong>融合策略本身是权衡，不是越多越好。</strong> 例如把 <code>chunk_mode</code> 和 <code>decay_mode</code> 融合可以避免把每个 chunk 的 state summary 写回 global memory；但 <code>decay_mode</code> 有前缀依赖，过度融合会减少原本可并行的 chunk 级任务数量。论文把这类选择交给 parallelism scheduler：输入形状、head 数、head dimension、chunk size、GPU/NIC 拓扑会共同决定是物化中间状态、融合两阶段，还是把通信 tile 嵌入计算循环。这个设计的价值在于把“算法作者给出状态方程”和“系统为当前硬件选择执行形态”分开。</p>\n<p><strong>AOT 和静态 dispatcher 解决短序列时的系统开销。</strong> 许多线性注意力 kernel 在 1K-4K token 时真实执行时间只有几十到几百微秒，Triton runtime 的 hash lookup、JIT、Python 调度会变成主导开销。FlexLA 允许用户把相对固定的维度，如 head dimension、head 数、batch 范围标成静态或可枚举范围，提前编译出多个动态库；运行时由 profile-guided static dispatcher 直接选择 CUDA Driver API 可调用的二进制。对 inference 服务来说，这一点和 kernel 本身同样重要，因为吞吐通常被大量短请求、动态 shape 和调度开销共同限制。</p>\n<div class=\"key-point\">💡 关键：FlexLA 的抽象不是“替代所有注意力 DSL”，而是抓住线性注意力的共有数学结构。只要一个新变体能被重写为 chunk local summary、state propagation、output merge，编译器就能复用同一套 kernel generation、通信融合和调度机制。</div>",
      "quiz": {
        "q": "FlexLA 为什么把线性注意力 DSL 固定为 chunk_mode、decay_mode、merge_mode 三个 callable？",
        "options": [
          "为了让所有线性注意力退化成 softmax attention，从而直接调用 FlashAttention",
          "为了把块内并行计算、块间状态传播和输出合并分开，使编译器能定位可并行区域、串行依赖和通信位置",
          "为了避免使用 Torch.fx，只用手写 CUDA 解析 Python 源码",
          "为了强制所有模型使用同一种标量 decay 和同一种矩阵 state"
        ],
        "answer": 1,
        "explain": "三阶段接口对应 chunk-wise linear attention 的数学分解。它既能表达多种状态更新规则，也给编译器提供明确边界，用于阶段融合、tile 级通信重叠和 AOT 调度。"
      }
    },
    {
      "id": "quantix",
      "num": 45,
      "name": "Quantix",
      "fullName": "非均匀量化LLM推理加速编译器 (Quantix)",
      "year": "2026",
      "org": "Community",
      "parent": "tensorrt",
      "paperUrl": "https://dl.acm.org/doi/abs/10.1145/3774934.3786423",
      "projectUrl": "",
      "category": "hardware_specific",
      "motivation": "3-bit非均匀量化编译优化，大幅提升LLM推理吞吐",
      "summary": "Quantix 针对 3-bit 非均匀量化 LLM 权重“省显存但反而跑不快”的问题，提出硬件对齐 bit shuffling 和融合反量化-矩阵乘流水线，把 codebook lookup 反量化映射到 CUDA Core，把 GEMM 映射到 Tensor Core，从而把 3-bit 压缩真正转化为推理吞吐提升。",
      "keyPoints": [
        "面向 clustering-based non-uniform quantization：3-bit 权重用每组 8-entry center/codebook 表示，比均匀 3-bit 更容易保精度，但推理必须执行索引提取和查表反量化",
        "解决 3-bit 非对齐访问：3 不是 GPU 内存访问粒度的因子，朴素连续 bit packing 会产生跨 32-bit/128-bit word 的提取开销",
        "硬件对齐 bit shuffling：官方 artifact 中把 3-bit index 拆成 1-bit segment 和 2-bit segment，并按 <code>uint4</code>/128-bit 友好的方式搬运到 shared memory",
        "融合内核：在同一 CUDA kernel 内完成 quantized weight load、center load、register-level dequant、activation load 和 Tensor Core MMA",
        "双层流水线：使用 shared-memory pipeline 和 register double buffering，在处理当前 K tile 时预取下一 tile，并把反量化与 MMA 交错执行",
        "论文结果：在 NVIDIA L40 GPU 上相对 FP16 cuBLAS 获得平均 4.82x kernel-level speedup，相对已有量化方法获得最高 11.46x end-to-end speedup"
      ],
      "detail": "<p><img alt=\"Quantix 官方 artifact 仓库预览图\" src=\"https://opengraph.githubassets.com/quantix/yuang-chen/Quantix-PPoPP26\" />\n<em>图：Quantix 官方 artifact 仓库 <code>yuang-chen/Quantix-PPoPP26</code> 的 GitHub OpenGraph 远程图片。ACM 页面公开摘要和 DOI，官方 artifact 提供 CUDA/C++ 实现，但未提供可拆出的论文架构图；下文的架构解读基于 DOI/PPoPP 摘要和官方 artifact 中 <code>gemm_3bit_reg.cuh</code>、<code>global_fp3.cuh</code>、<code>shared_fp3.cuh</code>、<code>dequant_parallel_fp3.cuh</code> 的实现。</em></p>\n<pre><code class=\"language-python\"># Quantix 3-bit 非均匀量化 GEMM 的概念伪代码\ndef quantix_3bit_gemm(weights_1bit, weights_2bit, centers, activations):\n    # weights_1bit / weights_2bit 是离线 bit shuffling 后的硬件对齐段\n    # centers: 每个 group 的 8 个 FP16 非均匀量化中心\n    acc = fp32_zeros(BLOCK_M, BLOCK_N)\n\n    # 预取 packed weight segment、activation tile 和 center table\n    smem_w1, smem_w2 = cp_async_gmem_to_smem(weights_1bit, weights_2bit)\n    smem_x = cp_async_gmem_to_smem(activations)\n    center_reg = load_centers_to_registers(centers)\n\n    # pipeline over K tiles\n    for k_tile in range(num_k_tiles):\n        # 1. 继续预取下一 tile，隐藏 global memory latency\n        prefetch_next_weight_segments()\n        prefetch_next_activation_tile()\n\n        # 2. 从 shared memory 取当前 slice 的 1-bit/2-bit 段到寄存器\n        w1_reg = load_1bit_slice(smem_w1, slice_id=k_tile)\n        w2_reg = load_2bit_slice(smem_w2, slice_id=k_tile)\n\n        # 3. CUDA Core/SIMT: 组合出 3-bit index，并查 8-entry center 表\n        packed_idx = combine_segments(w1_reg, w2_reg)\n        w_fp16_frag = lookup(center_reg, packed_idx)  # q in [0, 7] -&gt; c[q]\n\n        # 4. Tensor Core: 用反量化出的 FP16 fragment 做 MMA\n        x_frag = load_activation_fragment(smem_x, k_tile)\n        acc = mma_m16n8k16(x_frag, w_fp16_frag, acc)\n\n    return store(acc)\n</code></pre>\n<p><strong>动机：非均匀 3-bit 量化的瓶颈不是压缩率，而是反量化路径。</strong> LLM 推理中的线性层通常 memory-bound，直觉上把 FP16 权重压到 3 bit 应该显著减少 HBM 读取量。非均匀量化用 k-means 或类似聚类得到 center/codebook，3-bit index <span class=\"kb-math kb-math-inline\">q\\in\\{0,\\ldots,7\\}</span> 指向 8 个 FP16 center，因此可比均匀 3-bit 更贴合权重分布：</p>\n<div class=\"kb-math kb-math-display\">q^\\* = \\arg\\min_{q\\in\\{0,\\ldots,7\\}}\\left|w - c_q\\right|,\\qquad \\hat{w}=c_{q^\\*}</div>\n<p>问题是在线推理时不能只读 index，还要从 packed bits 中抽取 <span class=\"kb-math kb-math-inline\">q</span>，再做 <span class=\"kb-math kb-math-inline\">\\hat{w}=c_q</span> 查表。若先完整反量化成 FP16 矩阵再调用 cuBLAS，执行时间近似为：</p>\n<div class=\"kb-math kb-math-display\">T_{\\text{two-stage}} = T_{\\text{unpack}} + T_{\\text{lookup}} + T_{\\text{write-fp16}} + T_{\\text{cuBLAS}}</div>\n<p>中间 FP16 写回会抵消 3-bit 省下的带宽，Tensor Core 在反量化阶段空闲，CUDA Core 在 GEMM 阶段空闲，这就是“内存省了但吞吐没上去”的根本原因。</p>\n<p><strong>bit shuffling 的关键是让 3-bit 适配 128-bit load/store。</strong> 3-bit 连续打包在数学上紧凑，但对 GPU 不友好：第 10 或第 11 个值附近就会跨 32-bit word，提取一个 index 可能要读两个 word，再做额外 shift/mask。Quantix 的 artifact 将 3-bit 表示拆成 <code>weight_1bit</code> 和 <code>weight_2bit</code> 两条 segment，代码里 <code>BitSegments&lt;3&gt;</code> 同时启用 1-bit 和 2-bit 段；每个 warp 对 4096 个权重元素分别需要 512B 的 1-bit shared memory 和 1024B 的 2-bit shared memory。这样 global memory 侧可以用 <code>uint4</code> 进行 128-bit 对齐搬运，shared memory 侧按 lane 读取本线程所需的 packed word。</p>\n<p>官方实现中的核心重建逻辑可以概括为：</p>\n<div class=\"kb-math kb-math-display\">\\text{idx}_{3b} =\n\\operatorname{combine}\\left(\\text{segment}_{1b},\\text{segment}_{2b}\\right)</div>\n<p>随后对每个 index 做：</p>\n<div class=\"kb-math kb-math-display\">\\hat{W}_{m,k}=C_{g(m,k),\\text{idx}_{3b}(m,k)}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">C_g</span> 是 group <span class=\"kb-math kb-math-inline\">g</span> 的 8-entry center table。<code>dequant_parallel_fp3.cuh</code> 中先通过 mask/shift 把 1-bit 和 2-bit 段组合成 <code>packed_indices_x8</code>，再在寄存器里把 8 个 3-bit index 映射到对应 FP16 center。这个设计把不规则查表限制在寄存器和少量 center load 中，不再把完整 FP16 权重矩阵写回 global memory。</p>\n<p><strong>融合反量化和 Tensor Core MMA 后，时间模型从相加变成取最大值。</strong> Quantix 的 3-bit kernel 在一个 block 内处理 <span class=\"kb-math kb-math-inline\">BLOCK_M\\times BLOCK_N</span> 输出 tile，沿 K 维按 <span class=\"kb-math kb-math-inline\">BLOCK_K</span> 迭代。<code>gemm_3bit_reg.cuh</code> 先把 packed weight segment、activation tile 和 center table 搬到 shared memory/register，然后在主循环中执行 <code>compute_matrix_slice_3bit</code>。该函数先用 Tensor Core 对已经准备好的 FP16 fragment 做 <code>MMA_FP16_M16N8K16</code>，随后加载下一 slice 的 packed bits、执行 3-bit lookup 并填充下一组 weight registers。理想情况下：</p>\n<div class=\"kb-math kb-math-display\">T_{\\text{fused}} \\approx \\max(T_{\\text{bit-extract+lookup}},T_{\\text{MMA}},T_{\\text{memory}})</div>\n<p>而不是三者相加。由于 GPU 的 CUDA Core/SIMT 路径适合 shift、mask、lookup，Tensor Core 适合规则 FP16 MMA，二者交错后能提高 SM 内资源利用率。</p>\n<p><strong>为什么 3-bit 需要专门内核，而不是把 4-bit 内核改一改。</strong> 4-bit index 可自然放进 byte 的高/低半字节，8 个 index 正好 32 bits，16 个 index 正好 64 bits；许多 INT4/AWQ/GPTQ kernel 因此可以用相对直接的 nibble unpack。3-bit 的 packed index 没有这种对齐性质，且非均匀量化还需要查 center 表，不只是 <code>scale * q + zero</code>。Quantix 的硬件对齐 segment 化布局、center register layout 和 slice-level dequant 都是为 3-bit 非均匀量化定制的，所以它的优化目标不是“低位宽通用”，而是把最难用好硬件的 3-bit 码本量化推到高吞吐。</p>\n<p><strong>与 TensorRT/常见推理引擎的关系。</strong> TensorRT 这类推理系统擅长 graph-level fusion、engine build 和标准低精度路径，但对“非均匀 3-bit + codebook lookup + Tensor Core MMA”的组合通常没有开箱即用的硬件映射。Quantix 更像是可被推理引擎调用的专用 GEMM backend：模型加载阶段把权重转成硬件对齐 packed layout，运行阶段在关键线性层调用 Quantix kernel。它的贡献集中在算子级数据布局和内核流水线，而不是重新设计上层 serving scheduler。</p>\n<div class=\"key-point\">💡 关键：Quantix 的加速来自三个因素叠加：3-bit 减少权重带宽，bit shuffling 消除非对齐提取开销，融合流水线避免反量化和矩阵乘串行执行。</div>",
      "quiz": {
        "q": "Quantix 为什么不能简单地先把 3-bit 非均匀量化权重完整反量化成 FP16，再调用 cuBLAS？",
        "options": [
          "因为非均匀量化没有 codebook，无法恢复 FP16 权重",
          "因为两阶段方案会产生 unpack、lookup 和 FP16 中间写回开销，并让 CUDA Core 与 Tensor Core 分阶段空闲",
          "因为 Tensor Core 只能处理 3-bit index，不能处理 FP16 fragment",
          "因为 3-bit 权重的压缩率低于 FP16，没有带宽收益"
        ],
        "answer": 1,
        "explain": "非均匀 3-bit 需要从 packed bits 抽取 index 并查 center 表。若先反量化再 GEMM，中间 FP16 写回和串行阶段会抵消压缩收益；Quantix 通过融合内核和流水线把这些开销隐藏在 MMA 周期内。"
      }
    },
    {
      "id": "hexcute",
      "num": 46,
      "name": "Hexcute",
      "fullName": "GPU程序自动布局合成编译框架 (Hexcute)",
      "year": "2026",
      "org": "Community",
      "parent": "triton",
      "paperUrl": "https://ieeexplore.ieee.org/abstract/document/11395194/",
      "projectUrl": "",
      "category": "tensor_ir",
      "motivation": "自动合成GPU程序布局，消除手工布局设计负担",
      "summary": "Hexcute 提出一个 GPU 编译框架，把 tensor layout 表示为函数并把布局选择建模为约束规划问题，通过类型推断式算法自动合成 shared memory / register layout 和指令选择，解决 CUTLASS/Hidet 手工布局负担重、Triton 启发式难泛化到复杂算子的问题。",
      "keyPoints": [
        "布局函数化：把 shared memory tensor 和 register tensor 的布局都看作从逻辑坐标到物理地址或线程-值坐标的函数",
        "类型系统承载布局：tensor type 中携带 layout 信息，使 copy、gemm、reduce、cast 等 tile-level operation 能产生布局约束",
        "thread-value layout synthesis：对 tile-level DAG 分连通分量，选择 GEMM 或 copy 作为 anchor，再用 ready queue 传播并求解布局约束",
        "shared-memory layout synthesis：从所有 shared-memory copy 的 alignment / coalescing / bank-conflict 要求中统一约束，失败时回退到更保守布局",
        "显式数据流与流水线：用户仍能手写关键 dataflow、software pipelining、warp specialization，编译器只自动补齐最易出错的布局和指令选择",
        "论文结果：相对 CUDA/CUTLASS 手写 kernel 减少 1.27x-7.94x 代码量；在 H100 上复杂 MoE 相对 Triton 平均加速 6.46x，Mamba scan 相对手写库平均加速 4.17x；集成 vLLM 后 DeepSeek-R1-AWQ 端到端最高加速 2.60x"
      ],
      "detail": "<p><img alt=\"Hexcute shared memory layout synthesis\" src=\"https://arxiv.org/html/2504.16214v3/x19.png\" />\n<em>图：arXiv HTML 版本 Figure 10，展示 Hexcute 的 shared memory layout synthesis，包括约束构造、layout constraint unification，以及统一失败时的冲突情况。图源为论文官方 arXiv HTML。</em></p>\n<pre><code class=\"language-python\"># Hexcute Algorithm 1 的简化伪代码：Thread-Value Layout Synthesis\ndef synthesize_thread_value_layouts(tile_dag, target_gpu):\n    layouts = {}\n    subgraphs = partition_by_shared_memory_edges(tile_dag)\n\n    for sg in subgraphs:\n        constraints = build_constraints(sg)\n        ready = []\n\n        if sg.contains(&quot;gemm&quot;):\n            for gemm in sg.ops(&quot;gemm&quot;):\n                instr = select_fastest_tensor_core_instruction(gemm, target_gpu)\n                layouts[gemm.C] = instantiate_C_layout_by_instruction(instr)\n                layouts[gemm.A], layouts[gemm.B] = solve_gemm_operand_layouts(\n                    instr,\n                    output_layout=layouts[gemm.C],\n                    constraints=constraints,\n                )\n        else:\n            anchor = pick_largest_copy_op(sg)\n            layouts[anchor.tensor] = make_coalesced_copy_layout(anchor)\n\n        update_ready_queue(ready, constraints, layouts)\n\n        while constraints:\n            while ready:\n                c = ready.pop(0)\n                unknown = c.single_unknown_layout()\n                layouts[unknown] = solve_constraint(c, known_layouts=layouts)\n                constraints.remove(c)\n            update_ready_queue(ready, constraints, layouts)\n\n    return layouts\n</code></pre>\n<p><strong>动机：GPU kernel 性能常常卡在“布局”，但布局不是普通整数参数。</strong> 对一个 tile-level GPU 程序来说，数据流决定从 global memory、shared memory、register 到 Tensor Core 的移动顺序；pipeline 决定加载和计算怎样重叠；layout 决定每个逻辑元素落在哪个线程、哪个寄存器、哪个 shared memory bank 或哪个地址。CUTLASS/Hidet/CuTe 给了很强的布局代数，但要求程序员手动写出合法且高性能的布局组合。Triton 则把很多布局决策藏进编译器启发式，普通 GEMM/elementwise 很方便，但对 mixed-type MoE、Mamba scan、warp-specialized GEMM 这类复杂 dataflow 容易选错内存层级或指令。Hexcute 的折中是：让用户显式写 dataflow 和 pipeline，让编译器自动合成 layout。</p>\n<p>布局在 Hexcute 中可以抽象成函数。shared memory layout <span class=\"kb-math kb-math-inline\">m</span> 把 tensor 坐标映射到 shared memory 地址：</p>\n<div class=\"kb-math kb-math-display\">m: (i,j) \\mapsto \\text{addr}</div>\n<p>register tensor 的 thread-value layout <span class=\"kb-math kb-math-inline\">f</span> 则把 tensor 坐标映射到线程和值槽位：</p>\n<div class=\"kb-math kb-math-display\">f: (i,j) \\mapsto (t,v)</div>\n<p>这个函数视角比“枚举一个 layout id”更适合 GPU，因为一个高性能 layout 往往由 reshape、permutation、tiling、swizzle、composition 等函数组合产生。论文用 composite mapping 描述 operation-level tensor 与 instruction-level fragment 的关系，例如对 MMA 指令，操作数 A、B、C 的 layout 必须能通过 <span class=\"kb-math kb-math-inline\">f_A\\circ p_A^{-1}</span>、<span class=\"kb-math kb-math-inline\">f_B\\circ p_B^{-1}</span>、<span class=\"kb-math kb-math-inline\">f_C\\circ p_C^{-1}</span> 对齐到同一条 Tensor Core instruction 的 operand layout。</p>\n<p><strong>thread-value layout synthesis 的核心是 anchor + 约束传播。</strong> Hexcute 先把 tile-level program 建成 DAG，边是 tensor，节点是 tile operation。shared memory 读写会自然切断寄存器级布局传播，所以算法先按这些边分连通分量。若某个分量包含 <code>gemm</code>，GEMM 是性能关键，算法就先选目标 GPU 上最快的 Tensor Core instruction，并用该 instruction 切分 C tile，从而确定 <span class=\"kb-math kb-math-inline\">L_C</span>，再通过 GEMM 约束反解 <span class=\"kb-math kb-math-inline\">L_A,L_B</span>。若没有 GEMM，则选搬运量最大的 copy operation 作 anchor，因为这类分量通常 memory-bound，coalesced load/store 是首要目标。</p>\n<p>约束求解并不是全局暴力搜索。算法维护剩余约束集合 <span class=\"kb-math kb-math-inline\">C</span> 和 ready queue <span class=\"kb-math kb-math-inline\">R_q</span>。当某条约束只剩一个未知 layout 时，它就变成 ready，可以把未知项移到等式左边求解。简化写法是：</p>\n<div class=\"kb-math kb-math-display\">R_q = \\{c\\in C \\mid |\\operatorname{unknowns}(c)|=1\\}</div>\n<div class=\"kb-math kb-math-display\">L_x = \\operatorname{Solve}\\left(c,\\{L_y\\mid y\\ne x\\}\\right)</div>\n<p>这种类型推断式传播让布局像类型一样沿数据流被推导出来：已知 copy 的输出 layout 可推输入 layout，已知 reduce 的输入 layout 可推输出 layout，已知 GEMM 的 C fragment 可推 A/B operand fragment。若多个约束冲突，说明当前指令或布局候选不合法，编译器再尝试其他候选或回退。</p>\n<p><strong>shared memory layout synthesis 解决的是另一个层面的约束统一。</strong> register layout 关注线程和值槽位，shared memory layout 还要满足向量化 load/store、TMA、bank conflict、alignment 等硬件条件。论文 Figure 10 展示的 unification 直觉是：每个 copy operation 都对同一个 shared tensor 提出一个 layout constraint，比如某些维度 stride 必须能支持 <code>ldmatrix</code> 或 vectorized load。Hexcute 尝试把这些 constraint 合并成一个更具体的 layout：</p>\n<div class=\"kb-math kb-math-display\">M = \\operatorname{Unify}(C_1,C_2,\\ldots,C_n)</div>\n<p>若 stride、shape 或 swizzle 要求兼容，就 materialize 出统一 layout；若要求互相矛盾，例如两个 copy 对同一维要求不同 stride，则合成失败，编译器使用更保守的中间布局或拆分搬运路径。这一点很重要，因为 shared memory 是多个 operation 之间的真实交换点，错误的 unified layout 会直接导致 bank conflict 或额外搬运。</p>\n<p><strong>与 Triton 的本质差异在控制边界。</strong> Triton 把很多线程级布局、memory placement 和 pipelining 决策交给启发式 pass，优点是代码短，缺点是复杂算子需要的 dataflow 不一定能表达或不一定被选中。Hexcute 的用户代码通常比 Triton 更显式：程序员写出 tile-level copy、MMA、reduce、pipeline stage、warp specialization，但不用手写每个 tensor 的 layout template。换句话说，Hexcute 保留专家对算法级 dataflow 的控制，把容易错且机械的 layout 推导交给编译器。</p>\n<p><strong>性能结果说明布局合成不仅是省代码，也影响指令选择。</strong> 在 mixed-type MoE 中，Triton 的启发式可能使用标量 load/store 或次优数据流，而 Hexcute 能从约束中合成适合 vectorized instruction 和 Tensor Core fragment 的布局，因此在 H100 上相对 Triton 平均加速 6.46x。Mamba scan 的瓶颈是多个 tensor 的向量化加载、scan/reduction 和寄存器布局，Hexcute 通过 layout synthesis 选择更宽的 load/store 指令，平均比手写 Mamba 库快 4.17x。集成到 vLLM 后，端到端收益低于 kernel microbenchmark 但仍显著，说明 layout synthesis 能穿透到真实 serving 工作负载。</p>\n<div class=\"key-point\">💡 关键：Hexcute 不是要把 GPU kernel 完全自动生成，而是把“专家选择 dataflow/pipeline”和“编译器合成 layout/instruction”拆开。这个边界比纯手写和纯启发式都更适合复杂深度学习算子。</div>",
      "quiz": {
        "q": "Hexcute 为什么把 layout synthesis 建模为类型推断式约束求解，而不是简单枚举若干 layout 模板？",
        "options": [
          "因为 GPU layout 是函数组合，搜索空间巨大，且合法性由 copy、gemm、reduce 等 operation 的约束共同决定",
          "因为 Tensor Core 只能执行一种固定 layout，不需要考虑 shared memory",
          "因为 Triton 已经完全解决了所有复杂算子的 layout 选择问题",
          "因为 layout 只影响代码行数，不影响指令选择和性能"
        ],
        "answer": 0,
        "explain": "Hexcute 将 tensor layout 嵌入类型并由操作约束传播，能从已知 anchor 推导未知布局，同时处理指令 operand、coalescing、bank conflict 等条件；这比枚举少量模板更能覆盖复杂算子。"
      }
    }
  ],
  "categories": {
    "graph_compilers": {
      "label": "图级编译器",
      "color": "#2563eb"
    },
    "tensor_ir": {
      "label": "张量算子编译器",
      "color": "#16a34a"
    },
    "infrastructure": {
      "label": "编译基础设施",
      "color": "#9333ea"
    },
    "hardware_specific": {
      "label": "硬件特化优化",
      "color": "#ea580c"
    },
    "llm_driven": {
      "label": "LLM驱动编译",
      "color": "#db2777"
    }
  },
  "projectUrls": {}
};
