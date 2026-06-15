/**
 * sound_generation-data.js — 由 pipeline/build.py 于 2026-06-15 18:08:20 自动生成。
 * 源文件：content/aigc/sound_generation.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "aigc",
    "topic_id": "sound_generation",
    "topic_name": "AI音频生成技术演化图谱",
    "page_title": "AI音频生成技术演化图谱",
    "page_subtitle": "2026-05-12 版",
    "page_desc": "从WaveNet自回归波形生成到Diffusion Transformer统一框架，AI音频生成经历了自回归时代、GAN时代、扩散模型时代和统一大模型时代四个阶段，涵盖TTS、语音克隆、音效生成、神经编解码器与音乐生成五大技术方向。",
    "page_icon": "🔊",
    "hero_pills": [
      "文本到语音",
      "语音克隆",
      "音效生成",
      "神经编解码器",
      "音乐生成",
      "Diffusion Transformer",
      "零样本克隆",
      "实时推理"
    ],
    "count_pill": "{count} 个算法",
    "image_base": "../../content/aigc/sound_generation/assets/",
    "overview_from_doc": true,
    "latest_overview_from_doc": true
  },
  "overview": [
    {
      "title": "",
      "body_html": "<h1>音频生成模型的技术发展梳理</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2029797789308056829\">https://zhuanlan.zhihu.com/p/2029797789308056829</a></li>\n<li>作者: Step Out</li>\n</ul>\n<hr />\n<p>音频生成模型的技术发展梳理</p>\n<h1>音频生成模型的技术发展梳理</h1>\n<p>作者: Step Out, 赞: 10</p>\n<p>接上篇对音频理解技术路线的梳理，梳理一下音频生成技术路线。</p>\n<p>音频生成是一个从传统 TTS 一路演进到神经编解码语言模型、再到扩散和流匹配范式的完整故事。最早是拼接式合成和基于 HMM 的参数式合成，接着 Tacotron 2 把 text-to-mel 加上 WaveNet vocoder 打通了端到端合成，后来 FastSpeech 2 用 duration predictor 解决了 AR attention 不稳定的问题，再后来 VITS 用条件 VAE 加 normalizing flow 加对抗训练把 text 到 waveform 做成单阶段端到端。再往后扩散和流匹配范式把非自回归生成重新抬上桌，而 VALL-E 为代表的 neural codec language model 又让自回归范式重回舞台，这两条线在 2023 年之后并行推进。</p>\n<hr />\n<p>先说一下神经网络 TTS 兴起之前的两种老方法，因为现代 TTS 里 duration model、谱特征、context-dependent 建模这些概念都是从这两种方法沿袭下来的，理解了它们才理解为什么现代架构要这么设计。</p>\n<p>一是拼接式合成concatenative synthesis，年代跨度大约是 1980 年代到 2010 年代初。核心思想是事先让同一位专业录音员录一个巨大的语料库，通常十几到几十小时，推理时根据目标文本去数据库里挑一串最合适的音频单元直接拼接起来。关键算法叫 unit selection，Siri 早期就用 unit selection。优点是用的是真人原声，自然度极高，音色真实。缺点是数据库重，换发音人要重录；灵活性差，改风格改情感改语速基本不可能；拼接点可听，熟悉的用户能听出卡顿和音高跳变等等。</p>\n<p>二是 HMM 参数式合成 statistical parametric speech synthesis，简称 SPSS，核心思想反过来，不存原声只存模型。把语音信号参数化成一组可以统计建模的特征，然后用上下文相关的 HMM 做统计建模，推理时从 HMM 里生成参数轨迹，再用一个信号处理式的 vocoder 把参数合成成波形。这两种方法的具体情况可以看2007年的STATISTICAL PARAMETRIC SPEECH SYNTHESIS这篇论文，这里就不赘述了。</p>\n<hr />\n<p>在聊具体模型之前，先讲清楚 waveform 和 mel-spectrogram，以及它们之间的关系，因为后面所有 TTS 模型都绕不开这两样东西。Waveform 是原始波形，它是时域信号，本质是个一维浮点序列，表示每个采样时刻的声压随时间的变化，常见的采样率有 16kHz、44.1kHz 和 48kHz，也就是说每秒钟要存下 1.6 万到 4.8 万个采样点。它是最接近物理世界的表示，但是维度极高，相位和高频细节全都揉在一起，直接让神经网络在这个空间上生成难度太大。</p>\n<p>所以一般会把 waveform 先转换到时频域。先对 waveform 做短时傅里叶变换，也就是 STFT，得到一个二维矩阵，横轴是时间帧、纵轴是线性频率。这就是 spectrogram线性谱。但线性谱维度还是很高，而且频率轴是线性的，跟人耳的感知不匹配，因为人耳对低频更敏感、对高频更粗糙。于是就有了 mel-spectrogram，它在线性谱的基础上再乘一组按 mel 刻度排布的三角滤波器，一般是 80 个或者 128 个，低频密集高频稀疏，最后再取 log，得到一个 T 乘 80 的紧凑时频矩阵，这就是 log-mel。TTS 系统里的声学中间表征几乎都是 log-mel。mel 谱的好处是维度小、感知友好、保留了主要的音色和韵律信息，但代价是相位信息和精细高频信息都丢了。</p>\n<p>从 waveform 到 mel 这一步是有损但是可以用公式直接算出来的；但反过来从 mel 到 waveform 就没法直接算，因为相位被丢掉了，需要一个专门的神经网络去学，这个神经网络就叫 vocoder声码器。最早期有 Griffin-Lim 这样的迭代算法，不需要训练但音质差，有明显的电音感。后来 DeepMind 在 2016 年提出 WaveNet，用空洞因果卷积dilated causal convolution做 raw audio 的自回归预测，音质高但速度慢。再往后有基于 flow 和 RNN 的 WaveGlow 和 WaveRNN，速度快一点但质量略逊。改变状况的是 2020 年 NeurIPS 上的 HiFi-GAN，用多尺度判别器加多周期判别器组合出来的 GAN vocoder，效果好速度快，目前是主流的vocoder；NVIDIA 在 2023 年 ICLR 又做了 BigVGAN；还有 2023 年提出的 Vocos，这些都是vocoder比较有代表性的工作。</p>\n<p>所以 TTS 的标准pipeline就是文本先过声学模型(如 Tacotron 2 / FastSpeech 2) 得到 mel，再过 vocoder (如 HiFi-GAN / BigVGAN) 还原成 waveform，前半段负责说什么/怎么说，后半段负责怎么把谱变成声音。后来 VITS 把这两段合成一段端到端去做，NaturalSpeech 2 用 latent diffusion 在连续 latent 空间里预测，VALL-E 跳过 mel 直接在 codec token 空间建模，都是在对这条pipeline做简化或者改写。</p>\n<hr />\n<p>把这条基础链路捋清楚之后，再往下看具体模型就顺很多。Tacotron 2 是典型的级联式方案，encoder 加 attention 加 decoder 预测 mel 谱，后面接 WaveNet、WaveGlow 或 HiFi-GAN 把 mel 还原成波形。WaveNet 是空洞卷积的自回归模型(语音信号具有极长的长距离依赖，所以要用卷积核的元素之间插入了“空洞”的卷积网络)，预测 raw audio，质量很高但速度慢；HiFi-GAN 用 GAN 训练，实时又高质量，目前仍然是很多模型的标准 vocoder（不知道选哪个就选这个）。FastSpeech 2 是非自回归路线的代表，核心思想是用 duration predictor 显式预测每个音素的时长，再加上 pitch 和 energy 的 predictor，比 AR attention 快 10 到 100 倍，鲁棒性也更好，整体链路是 text 过 encoder 后经过 duration predictor 和 length regulator，再经过 pitch 和 energy 的 adaptor，最后 decoder 出 mel，再过 vocoder 到 waveform。VITS 则是单阶段端到端，text 直接到 waveform，不需要独立的 vocoder，架构很优雅，开源生态也很好（GPT-SoVITS 就是基于 VITS 的）。</p>\n<hr />\n<p>接着说 neural codec language model TTS，这是 2023 年之后的主流范式，也跟端到端 SDM 高度相关。核心思路是把波形先过一个 neural codec，比如 Encodec、DAC 或 Mimi，拿到 RVQ(Residual Vector Quantization) tokens，然后用一个 audio LM 做 next-token prediction 生成新的 token，再交给 decoder 还原波形，这样就把 TTS 问题整个转化成了语言建模问题。</p>\n<p>这种范式的开创者是微软 2023 年的 VALL-E。它首次把 TTS 视作条件化的 codec language modeling，输入是音素加上 3 秒参考音频对应的 Encodec RVQ token，Encodec 默认是 8 层。它采用两阶段训练，AR 模型负责预测第一层 codebook,也就是粗粒度的声学信息，NAR 模型并行预测第二到第八层的细粒度 codebook。只需要 3 秒参考就能做到零样本克隆，训练数据是 LibriLight 60k 小时的英语有声书。到 2024 年微软又做了 VALL-E 2，关键改动有两个，一个是 grouped code modeling，把相邻若干帧的 code 合成一个组去建模，这样序列短了推理也快了；另一个是 repetition-aware sampling，对 nucleus sampling 做改进，根据历史 token 的重复情况动态调整，把无限循环这类幻觉问题压下来。</p>\n<p>同期还有VoiceCraft(ACL 2024)。它把语音编辑和零样本合成统一在一个框架里，插入、替换等全都用 token infilling 来实现。核心技术叫做 causal masking 加 delayed stacking 的 token rearrangement，让单个 Transformer decoder 能同时支持双向上下文建模和自回归生成。Google 在 2023 年推出的 SpearTTS 则是典型的两阶段方案，第一阶段叫 Reading，text 到 semantic token，需要少量平行数据；第二阶段叫 Speaking，semantic token 到 acoustic token，最后 SoundStream decoder 还原波形。它只需要 15 分钟数据就能做到 ground truth 级的自然度，3 秒 prompt 就能克隆说话人。</p>\n<p>阿里的 CosyVoice 系列是近两年中文 TTS 的一个标杆。CosyVoice 1 的组件是 S3Tokenizer 做监督式语义 token，加上 text-to-token LM、flow matching 的 mel decoder，以及 HiFi-GAN vocoder。CosyVoice 2 在 2024 年有几个关键升级，一是把传统 VQ 换成 finite-scalar quantization，码本从 4096 的 VQ 只用到 963 个大约 23% 利用率，升级到 6561 的 FSQ 全部 100% 利用；二是干脆去掉独立的 text encoder，直接把预训练的 Qwen2.5-0.5B LLM 当 backbone，自回归地预测 text 和 speech token 混合的序列；三是引入 chunk-aware causal flow matching，让流式和非流式共用同一个模型，首包延迟做到 150 毫秒。到 CosyVoice 3,即 2025 年的版本,又在后训练/模型参数/数据量上做了增强。</p>\n<p>2024 年的 Seed-TTS 也值得关注，它的推理 pipeline 是四阶段的，第一步 speech tokenizer 从参考语音学 speech token，第二步自回归 LM 根据文本加 speech prompt 生成 speech token，第三步一个 diffusion transformer 由 token 生成连续的 speech latent 表示，做 coarse-to-fine 的细化，第四步 acoustic vocoder 把 diffusion 输出合成成高质量波形。它还有一个纯非自回归端到端的 DiT 变体叫 Seed-TTS DiT，不依赖预估的音素时长，性能和 AR 变体相当，还能做语音编辑。增强手段有两类，一是 self-distillation 做音色解耦（模型往往会把“韵律”和“音色”混在一起。比如，如果参考音频里的人正在愤怒地大喊，传统的模型可能会把这种“愤怒的波形特征”误认为是“音色的一部分”。当你换个文本让它克隆时，它可能只会“愤怒”地说话，而无法切换成“平静”的音色，所以必须做好音色解耦），二是 RL 后训练提升鲁棒性、说话人相似度和可控性。</p>\n<p>阶跃的 Step-TTS 和 Step-Audio 系列是很有特色的双码本 tokenizer，linguistic tokenizer 是 1024 码本，负责音素和高层语义；acoustic tokenizer 是 4096 码本，负责音色、韵律和声学细节。两条码流是 2 比 3 的时序交错，每 2 个 linguistic token 对应 3 个 acoustic token。LLM 基座是 Step-1(130B 参数)，是业界最大的语音基座之一。Speech decoder 用 flow matching 加 mel-to-wave vocoder，接收双码本的交错输入。Step-Audio 2 把 token 生成并入 LLM 里，对情感、方言这类副语言信息的响应更强。</p>\n<p>Index-TTS 是 B 站 Index 团队开源的工业级零样本 TTS，中英对齐训练，中文效果是开源里的第一梯队。Index-TTS-2 进一步引入情感和时长可控，把情感和说话人特征从输入的参考音频中解耦了出来。</p>\n<p>重点是 AR codec LM 的共性。优势方面，零样本克隆质量高，可以完全复用 LLM 的技术栈，包括 attention、KV cache、speculative decoding，而且天然支持流式。劣势是推理慢，要逐 token 生成；容易有幻觉和重复；而且整体质量依赖 codec，量化会带来损失。</p>\n<hr />\n<p>接下来是扩散和流匹配这条线，也意味着非自回归路线的再次崛起。首先是 score-based TTS，输入文字先过 text encoder 和对齐模块拿到对齐好的声学先验，然后在 mel 空间上跑扩散，把高斯噪声一步步去噪成目标 mel，再送进 HiFi-GAN vocoder 变成 waveform。相对于 Tacotron 2 或 FastSpeech 2 这种一次性回归 mel 的做法，score-based TTS 的好处是不用预测一个确定性 mel 而是对整个 mel 分布采样，自然带来多样性、训练稳定、不会像 AR attention 那样崩塌或复读，代价就是推理需要多步迭代。后面的 NaturalSpeech 2/3、VoiceBox、Matcha-TTS、E2 和 F5 TTS，本质都是这条路线的改进，要么把扩散搬到 latent 空间，要么把 SDE 换成 flow matching，要么专门压缩步数。ICML 2021的 Grad-TTS 是 score-based TTS 的开山之作。论文末尾还展示了可以把 decoder 输出从 mel 换成 raw waveform 做端到端生成，这条支线后来被 WaveGrad 和 Diff-Wave 发扬光大。</p>\n<p>微软的 NaturalSpeech 系列是这条线里的重要一支，第一代 2022 年的 NaturalSpeech 追求听觉上和录音无法区分；2023 年的NaturalSpeech 2用了 latent diffusion，在 codec latent 上做 diffusion；NaturalSpeech 3 2024 年则用到 FACodec，用 factorized vector quantization 把语音解耦成四个子空间，分别是内容 content、韵律 prosody、音色 timbre 和声学细节 acoustic details，其中 timbre 由单独的 timbre extractor 抽出来不做量化。解耦时在解耦子空间里按顺序生成，先 duration 再 prosody 再 content 再 details(timbre extractor用了一个Transformer encoder)。</p>\n<p>Meta 2023 年的 VoiceBox 用 flow matching实现，范式是 mask-infilling，给 prompt 和 context，让模型预测 mask 区域，它把零样本 TTS、降噪、风格迁移等统一到了一个框架。Matcha-TTS 2023 年用 optimal transport 加 conditional flow matching，能以极少的迭代到达 SOTA 质量。</p>\n<p>2024 年的 E2 TTS 走的是极简路线，输入就是 character sequence 加 mel prompt，直接做 flow matching，没有 phonemizer，没有 duration predictor，证明了在大数据加持下越简单反而越强。F5-TTS 是 sjtu X-LANCE 在 ACL 2025 的工作。介绍该工作前，先介绍一下 RTF，RTF 全称 real-time factor，中文叫实时率，是 TTS、ASR、语音增强这些领域的通用速度指标，定义就是处理时间除以音频时长。RTF 等于 1 表示合成一秒音频刚好用一秒的墙钟时间，也就是恰好实时；RTF 小于 1 表示比实时快，RTF 大于 1 表示比实时慢；数值越小越快。F5-TTS 的 RTF 等于 0.15 意思就是合成一秒波形只要 0.15 秒的真实时间，也就是差不多 6.7 倍实时，这个速度可以支撑低延迟的流式对话或者大规模离线合成。需要注意 RTF 是设备依赖的，论文一般会标注 GPU 型号和优化手段。回到F5 TTS, 它在 E2 TTS 的基础上把主干换成 DiT，即 diffusion transformer，再用 ConvNeXt V2 blocks 来细化 character sequence 的文本表示。推理时引入了 sway sampling（在推理中，不同的阶段使用不同的采样密度，在推理前期难度高的时候多走几步，后期难度低的时候少走几步），在时间步上做非均匀采样，低步数下质量明显提升，RTF 大概在 0.15。它也不需要 phonemizer 和 duration predictor，做法是把 character sequence 用 filler token 填充到语音长度之后和 mel prompt 一起送进 DiT。</p>\n<p>扩散和流匹配这条线总体上有几个优势，一是并行生成，每一步一次性生成所有时刻，比 AR 快；二是不需要离散化，可以直接在 latent、mel 或波形上做。缺点是步数和质量需要权衡，要多步才能到高质量。</p>\n<hr />\n<p>Flow matching 和 diffusion 的对比也值得理清。训练目标上，diffusion 预测的是噪声 epsilon，flow matching 预测的是速度场 v。采样路径上 diffusion 是弯的需要多步，flow matching 是直的少步也能到。数学基础一个是 SDE 一个是 ODE。实用优势上 diffusion 生态更成熟，flow matching 推理快训练稳数学也更简洁。2024 到 2026 的趋势是 flow matching 正在各种生成模型中，越来越广泛地被使用，如 VoiceBox、E2 和 F5-TTS、Matcha-TTS，以及 Stable Diffusion 3 也用了 rectified flow。</p>\n<hr />\n<p>此外还有音乐/音效生成，不过这些和上述TTS差异很大：</p>\n<p>在输入–输出对齐方式上，TTS的文本和语音严格一对一对齐，音素→帧可由 forced alignment / duration predictor 等显式建模。音乐的多模态条件输入（text prompt、歌词 lyrics、melody condition、style reference、instrument），和波形没有严格的帧级对齐，尤其是 text-to-music，prompt 只是语义层面的控制，没有\"一个词对应多少帧\"的概念。Lyric-to-vocal 有对齐但非常松（一个字可以唱 0.3 秒也可以唱 3 秒）。音效（Text-to-Audio / Sound）更彻底，text prompt 只提供语义类别和事件时间描述（\"a dog barks, then a door slams\"），完全没有帧级对齐，生成端要自己学会\"什么时候触发什么事件\"；</p>\n<p>频谱特性上，TTS的人声窄带。音乐中低频很低，高频很高，动态范围极大。由此直接导致 codec 设计不同。音效更是包含任意声学事件，既有窄带（电话铃）也有宽带（爆炸），所以音效 codec / latent 通常沿用音乐 codec 而不是语音 codec。</p>\n<p>控制维度也完全不一样，TTS 控制维度是音色 timbre、韵律 prosody、情感 emotion、语速 speed、停顿 pause、口音 accent。音乐控制维度是节奏（BPM）、调性（C Major、A minor）、乐器组合（\"piano + strings + drums\"）、情绪（happy / melancholic）、风格（jazz / lo-fi / K-pop）、段落切换、和声走向（chord progression）、歌词-旋律对齐（lyric-to-melody）、主唱音色 / 伴唱 / 和声层等等。音效控制维度是事件类别、事件时间位置（\"bell at 2s, explosion at 5s\"）、空间方位、源距离等。评价体系更是完全不同。研究价值和工业价值都很高，近两年大厂在相关方向的团队部署，以及startup都很多，不过本文聚焦TTS，这里就先不展开了。</p>\n<hr />\n<p>接着是端到端 Spoken Dialogue Model 里的音频生成端。架构上是把 LLM 的 hidden states/output 作为条件送给 TTS模块，有诸多工作可以参考（Qwen-Omni系列, GLM-4-Voice, Step-Audio系列, Kimi-Audio）。</p>\n<hr />\n<p>关键技术细节这一段也值得理清：phonemizer 或者说 G2P，全称是 grapheme-to-phoneme，把文字转成音素，经典工具有 g2p-en、Misaki、CharsiuG2P，不过 E2 和 F5 TTS 已经证明大数据下可以跳过 G2P 直接 character input。</p>\n<p>duration modeling 有三种典型做法，一是 FastSpeech 这种 explicit duration predictor，简单可控但需要对齐；二是 VITS 和 Glow-TTS 用的 monotonic alignment search，即 MAS，可以让模型在训练过程中自己学到哪个音素对应哪几帧 mel的对齐；三是 E2 和 F5 这种 flow matching，通过 mask 长度隐式控制，需要指定总时长。</p>\n<hr />\n<p>从 2025 到 2026 的趋势来看，flow matching 逐渐替代 diffusion，代表是 E2、F5 和 VoiceBox，同时用RL后训练用来提升自然度和偏好对齐越来越普遍。</p>\n<p>最后整理一下几个重要问题。第一个是 AR codec LM(如 VALL-E)和 flow matching(如 F5-TTS)的权衡。训练难度上 AR 是 next-token 比较容易，flow matching 要学速度场难度中等；推理速度上 AR 是逐 token 较慢，flow matching 有时几十步就能出结果；流式支持上 AR 天然支持，flow matching 需要特殊设计；稳定性上 AR 偶有幻觉和重复，flow matching 更稳定；与 LLM 的融合上 AR 完美契合，是 SDM 的必选项，flow matching 需要改造。进行选择时，SDM 和对话场景应该选 AR，因为很容易统一到 next-token；离线 TTS 推荐选 flow matching，因为速度和稳定性更好。</p>\n<p>第二个问题是 TTS 如何做情感可控。做法包括 reference encoder 给情感参考音频、prompt-based 比如写请用悲伤的语气说、discrete style token，当然训练数据也必须覆盖情感 annotation。</p>\n<p>第三个问题是 flow matching 和 diffusion 的本质区别，前面其实已经展开过，flow 的路径更直，也就是 rectified flow，少步就能收敛，而且 ODE 框架下理论更简洁。</p>\n<p>第四个问题是 codec 设计如何影响下游 SDM。码率太高则 token 太多，LLM 负担大；码率太低则信息损失严重，还原质量差。平衡点上 Mimi 的 12.5 Hz 是当前流式 codec 的优秀参考标准。codec 分层也很关键，可以在第一层偏语义和粗粒度，由 LLM 建模，后续层补声学细节，可以用轻量 decoder 处理。</p>"
    }
  ],
  "latest_overview": [
    {
      "title": "",
      "body_html": "<h1>语音生成的新范式？连续表征的「自回归 × 扩散」建模</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/1953150132246802768\">https://zhuanlan.zhihu.com/p/1953150132246802768</a></li>\n<li>作者: 知更鸟</li>\n</ul>\n<hr />\n<p>语音生成的新范式？连续表征的「自回归 × 扩散」建模</p>\n<h1>语音生成的新范式？连续表征的「自回归 × 扩散」建模</h1>\n<p>作者: 知更鸟, 赞: 104</p>\n<h2>TL;DR 太长不看版</h2>\n<p>语音合成目前主流的路线是「离散语音 tokenizer + LLM」，典型代表有 VALL-E、Tortoise-TTS、Seed-TTS、CosyVoice、Minimax-Speech、Index-TTS、FireRed-TTS 等。但近一年兴起了一股新的技术趋势：直接在<strong>连续表征（continuous token）</strong>空间建模，结合自回归 + 扩散/流匹配两种模型方案，代表性工作包括 AR-DiT、MELLE、SALAD、CLEAR、<strong>VibeVoice</strong>、CALM、MELA-TTS、<strong>VoxCPM</strong> 等等。离散建模与连续表征建模的总体对比如下：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>离散 Token 路线（VALL-E, CosyVoice, FireRed-TTS 等）</th>\n<th>连续表征路线（AR-DiT, CLEAR, VibeVoice, CALM 等）</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>表示方式</td>\n<td>语音压缩为离散 token（码本）</td>\n<td>语音直接映射为连续 latent 向量</td>\n</tr>\n<tr>\n<td>优点</td>\n<td>- 工业界方案较成熟（已有大规模落地） - 编码器如 DAC/WavTokenizer 成熟稳健 - 推理速度快，每步直接采样下一个 token</td>\n<td>- 无量化损失，高保真音质 - 架构更简洁，可单阶段端到端</td>\n</tr>\n<tr>\n<td>缺点</td>\n<td>- 码本有限，存在信息损失 - Token 序列长，长语音的推理延迟大 - 训练流程复杂（编码器 + LLM 分阶段）</td>\n<td>- 连续空间建模更难，需扩散/流匹配/特殊设计的 loss - 推理迭代开销大，需要蒸馏/consistency 加速 - 强依赖连续表征的质量（VAE设计） - 需要额外的损失函数来预测 stop token 结束符（比如 eos token）</td>\n</tr>\n<tr>\n<td>代表模型</td>\n<td>VALL-E, CosyVoice, Index-TTS, FireRed-TTS</td>\n<td>AR-DiT, MELLE, SALAD, Cont-SPT, CLEAR, VibeVoice, CALM, MELA-TTS, VoxCPM</td>\n</tr>\n<tr>\n<td>应用现状</td>\n<td>已在部分场景落地</td>\n<td>快速迭代中，VibeVoice 可生成 90 分钟播客，VoxCPM 已在 RTX4090 实现实时</td>\n</tr>\n</tbody>\n</table></div>\n<p>以下是详细解读版。</p>\n<hr />\n<blockquote>\n<p>最近两年，业界主流的语音合成模型主要是基于「离散语音 tokenizer (Codec) + LLM 建模」方案。其中影响力较大的工作，基本是在 Tortoise-TTS (<a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/pdf/2305.07243\">https://arxiv.org/pdf/2305.07243</a>) 的框架下发展而来，比如：阿里的 CosyVoice 系列、B 站的 Index-TTS 系列、小红书的 FireRed-TTS 系列，以及 Seed-TTS、Minimax-Speech 等未开源的工作，这些工作已经在各公司完成落地应用。  </p>\n<p>不过，近一年也出现了另外一类方案，试图<strong>从依赖离散 token 建模音频走向利用连续表征</strong>（continuous token）的新范式，结合自回归 LLM 生成与扩散/流匹配模型，既能保持 LLM 因果建模的优势，又引入扩散/流匹配方法，生成连续语音片段、降低建模的帧率。这一范式已在多篇最新研究工作中得到验证：此类模型普遍展现出更高的语音保真度、更低的生成延迟，主流的离散 tokenizer + LLM 路线可能正在受到挑战。  </p>\n<p>为避免篇幅过长，本文简要总结一些「连续表征」方案相关的论文/开源工作，<strong>主要介绍核心思想</strong>。本文第三和第四部分则是自己一些不成熟的想法，欢迎大家交流讨论~</p>\n</blockquote>\n<h2>一、相关背景</h2>\n<p>近年来，语音合成（Text-to-Speech, TTS）领域出现了将<strong>大语言模型</strong>技术用于音频生成的趋势。早期工作如 VALL-E 等通过<strong>离散语音 token</strong>（由神经编码器量化后的语音片段）进行自回归生成，在零样本（zero-shot）语音克隆等任务上取得突破。然而离散化也带来了固有问题：  </p>\n<ol>\n<li>为了降低码率而压缩语音，离散表示需要在码率和保真度间权衡，不可避免损失细节信息。  </li>\n<li>高质量重建往往意味着更长的 token 序列，与 LLM 模型配合下，导致推理延迟显著增加。  </li>\n<li>离散 token 的训练通常依赖复杂的多阶段流程（先训练编码器/解码器，再训练语言模型），训练过程中还要克服量化 VQ 带来的一些问题。  </li>\n</ol>\n<p>最近一年，部分大佬团队开始「回归」<strong>连续表征</strong>的语音生成范式，希望直接在连续空间中生成语音特征，从根本上避免VQ 的损耗。为了在连续空间建模语音的丰富细节，新的技术方案应运而生，特别是自回归 Transformer 与扩散模型（Diffusion）或流匹配（flow matching）的结合——在这一新范式下，模型<strong>以连续表征（如梅尔频谱或编码器隐向量、VAE Latents）为基本单元</strong>进行生成，通过扩散模型或流匹配方法处理连续概率分布，从而既保留高保真度又保证生成效率。</p>\n<p>下面按照大致时间顺序介绍本方向最新的一系列研究工作，以及这种连续表征范式相较传统离散 token + LLM 方法的优缺点及未来展望。</p>\n<h2>二、「自回归 × 扩散/流匹配」在 TTS 中的应用</h2>\n<h3>1. [AR-DiT] Autoregressive Diffusion Transformer for Text-to-Speech Synthesis</h3>\n<ul>\n<li>论文链接：<a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/pdf/2406.05551\">HTTPS://arxiv.org/pdf/2406.05551</a></li>\n<li>demo：<a href=\"https://link.zhihu.com/?target=https%3A//ardit-tts.github.io/\">https://ardit-tts.github.io/</a></li>\n<li>时间及机构：2024 年 6 月，香港中文大学（深圳）</li>\n</ul>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-fe98ad9931e0911e9d159c62615cf8e8_1440w.jpg\" /></p>\n<p><strong>连续表征方式：</strong>如上图所示，论文在 24kHz 语音的对数梅尔特征 log_mel 基础上，使用 Transfomer Encoder + 4 倍下采样网络，将特征降低至 <strong>23.5Hz 帧率（24000/256/4≈23.5，其中 256 是梅尔特征计算时的 hop size）</strong>，将压缩后的表征称为 continuous token。值得注意的是，Decoder 采用的是 DiT 结构配合 Flow Matching 学习目标，在解码阶段，即可使用 ODE Sampler，逐步从预测得到的 latent z 来恢复出梅尔特征。</p>\n<p><strong>核心方法：</strong> AR-DiT （Autoregressive Diffusion Transformer ）提出了<strong>自回归的DiT架构</strong>，直接在连续空间（continuous token）生成语音，避免了离散 token 的信息损耗，相比于传统离散 token 的 LLM 建模，主要区别在于模型预测的目标（损失函数的设计）——基于文本 text 和历史的 continuous token，来预测下一个 block 的 continous token 的分布。</p>\n<blockquote>\n<p><strong>概念区分</strong>  </p>\n<p>在 AR-DiT（自回归 + Diffusion/Flow Matching）包括下文的所有模型中，“时间”有两个不同层次的含义：<br />\n1. 序列层面的时间步（Sequence-level time step）<br />\n这是 LLM 模式下常说的“next token / next step”，也就是在时间上生成 token 的过程。它决定了模型在“序列维度”上的生成节奏——比如第一个帧、第二个帧，或第一个语音 patch、第二个 patch。<br />\n2. 连续层面的时间变量（Continuous-time variable）<br />\n这是扩散或流匹配模型中引入的连续时间变量，一般 <img alt=\"t \\in [0,1]\" src=\"https://www.zhihu.com/equation?tex=t+%5Cin+%5B0%2C1%5D\" /> ，用于建模从噪声到真实数据的分布变化，推理时往往需要多次采样来得到更好的效果。  </p>\n<p>以上两个概念实际上一般不会搞混，但此处提到这个差异，主要是因为二者的优化思路是完全不同的。比如从加快推理速度的角度来考虑两种方案：<br />\n- 连续时间维度的采样次数 → 可通过蒸馏或采样策略优化；<br />\n- 序列维度的生成步数 → 则是通过降低帧率（如 25Hz→12.5Hz）或采用 chunk/patch-level 建模来压缩。</p>\n</blockquote>\n<p><strong>训练策略：</strong>在训练方法上，通过设计下图中 block 之间和 block 内的 attention mask，使得模型可以并行训练，保证了训练的高效性。此外，模型还采用 <strong>Distribution Matching Distillation（DMD，分布匹配蒸馏法）</strong>，将多步采样过程压缩为单步，从而极大加速了推理速度。AR-DiT 可以在单步内预测多个 continuous token，进一步降低生成时延。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-76b520bdf87f6c161c8e4b2134b3a8e0_1440w.jpg\" /></p>\n<p><strong>关键创新：</strong> 1）<strong>高比特率的连续表征</strong>：使用高保真度的连续特征，使模型几乎能够无损重建原始语音，实现了近乎完美的语音编辑能力；2）<strong>扩散模型蒸馏</strong>：将迭代扩散采样简化为单步，显著提升了生成质量和效率；3）<strong>多向量并行预测</strong>：一次生成多个帧的特征，显著降低推理延迟。AR-DiT 在<strong>零样本 TTS</strong> 任务中表现出色，语音自然度和相似度达到或超过当时的最新模型。连续高码率表示带来了近乎完美的重构能力，实验中模型在语音编辑等场景下取得了几乎无可挑剔的效果。</p>\n<p><strong>目标应用：</strong> AR-DiT 针对<strong>零样本语音克隆</strong>、<strong>语音编辑</strong>等高要求应用，提供了高保真且高效的生成范式，为无需离散 token 的<strong>通用语音语言模型</strong>奠定了基础。</p>\n<h3>2. [MELLE] Autoregressive Speech Synthesis without Vector Quantization</h3>\n<ul>\n<li>论文链接：<a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/pdf/2407.08551\">HTTPS://arxiv.org/pdf/2407.08551</a></li>\n<li>demo：<a href=\"https://link.zhihu.com/?target=https%3A//www.microsoft.com/en-us/research/project/vall-e-x/melle/\">https://www.microsoft.com/en-us/research/project/vall-e-x/melle/</a></li>\n<li>时间及机构：2024 年 7 月，香港中文大学 &amp; 微软</li>\n</ul>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-d6a9ca8684987892f2b3e5a8b1b8208d_1440w.jpg\" /></p>\n<p><strong>核心方法：</strong> MELLE 提出了一种<strong>无向量量化的自回归语音合成</strong>框架，此处直接以<strong>连续梅尔频谱帧</strong>作为语言模型的建模单位。它摒弃了为压缩音频而设计的离散 VQ，<strong>注意并没有使用 VAE Latents 表征</strong>，而是“一次性”地自回归生成高质量梅尔谱，直接从文本到语音、无需两阶段预测流程，非常简洁。  </p>\n<p><strong>训练策略：</strong>在训练目标上，MELLE 除了最基础的 <strong>L1 + L2 + KL 散度</strong>三种损失函数外，还额外设计了<strong>光谱通量回归损失</strong>（spectrogram flux loss）来直接拟合连续值梅尔谱的分布。同时，引入<strong>变分推断（VI）</strong>机制来增强采样的多样性和模型鲁棒性，可以理解成类似于 LLM 离散建模方案下的某种采样策略。</p>\n<p><strong>关键改进：</strong> MELLE 一方面简化了 TTS 范式——从以往“先码本离散再语言模型”改为单阶段连续生成，避免了离散采样的缺陷；另一方面，通过新损失函数和变分推断，使模型兼顾稳定性与多样性。论文在实验中将 MELLE 与两阶段的离散 codec 模型（如 VALL-E 系列）对比，发现 MELLE 有效避免了离散码采样的固有问题，显著提升了多项评测指标上的性能，在自然度和鲁棒性上均优于 VALL-E 及其变体。</p>\n<p><strong>创新点：</strong> 1）<strong>连续 token 语言模型：</strong> 不生成离散 token，直接生成梅尔谱帧，保留了完整的频谱细节；2）<strong>光谱通量损失：</strong> 用于连续回归的定制损失，更准确刻画梅尔谱变化，提高合成质量；3）<strong>变分采样机制：</strong> 提升输出的多样性与稳健性；4）<strong>单阶段架构：</strong> 避免了离散两阶段带来的复杂度和错误传播，提供了更流畅的合成流程。</p>\n<h3>3. [SALAD] Continuous Speech Synthesis using per-token Latent Diffusion</h3>\n<ul>\n<li>论文链接：<a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/pdf/2410.16048\">HTTPS://arxiv.org/pdf/2410.16048</a></li>\n<li>demo：<a href=\"https://link.zhihu.com/?target=https%3A//s3.us-south.objectstorage.softlayer.net/zk-wav-data/Webpages/ICLR2025PerTokenLatentDiffusion/index.html\">https://s3.us-south.objectstorage.softlayer.net/zk-wav-data/Webpages/ICLR2025PerTokenLatentDiffusion/index.html</a></li>\n<li>时间及机构：2024 年 10 月，IBM 研究院</li>\n</ul>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-c84ac05e88c90e03d4e344a5346f64a6_1440w.jpg\" /><img alt=\"\" src=\"https://picx.zhimg.com/v2-564c578852e5c5485c9530b7801466c7_1440w.jpg\" /></p>\n<p><strong>核心方法：</strong> SALAD 的灵感来自何凯明大佬在图像生成论文（<a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/pdf/2406.11838\">https://arxiv.org/pdf/2406.11838</a>）中的“per token diffusion head”技术，引入了<strong>逐 token 的 LDM 扩散模型</strong>用于零样本语音合成。不同于以离散 token 序列建模，SALAD 直接对<strong>连续语音表征</strong>进行扩散生成，SALAD 将其扩展用于可变长度的语音序列生成。<br />\n具体做法是：首先使用<strong>语义 token</strong>（来自预训练音频模型的高层表示）为 TTS 提供语义条件和终止判断；然后设计了三种变体方法，将现有离散 TTS 技巧扩展到连续表征情况，并分别实现对应的离散基线进行对比。</p>\n<p><strong>关键工作：</strong> SALAD 在同一框架下对比了连续和离散语音建模，对每种连续方案都设计了对应的离散 baseline。实验结果表明，两种方案都能生成高质量语音，但<strong>连续方案在可懂度（intelligibility）上略胜一筹</strong>，同时语音质量和说话人相似度等指标与原声基本持平。这说明在保证音质的前提下，连续表示可以带来更好的内容保真度。</p>\n<p><strong>创新点：</strong> 1）<strong>逐 token 扩散（per token diffusion）</strong>：粒度达到每个语音隐 token，用扩散模型捕捉细粒度变化；2）<strong>语义引导</strong>：利用高层语义 token 指导生成，解决纯连续生成缺乏文本关联的问题；3）<strong>连续-离散对比分析</strong>：首次全面比较连续/离散 TTS 方案性能，这也是语音生成经常讨论的技术要点之一，也算是提供了一些参考经验。</p>\n<h3>4. [Cont-SPT] Continuous Speech Tokenizer in Text To Speech</h3>\n<ul>\n<li>论文链接：<a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/pdf/2410.17081\">HTTPS://arxiv.org/pdf/2410.17081</a></li>\n<li>开源：<a href=\"https://link.zhihu.com/?target=https%3A//github.com/Yixing-Li/Continuous-Speech-Tokenizer\">https://github.com/Yixing-Li/Continuous-Speech-Tokenizer</a></li>\n<li>时间及机构：2024 年 10 月，腾讯 &amp; 香港中文大学</li>\n</ul>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-de7aadc4ce90169411d9c3927449a008_1440w.jpg\" /></p>\n<p><strong>核心方法：</strong> Cont-SPT 提出了一种 Continuous Speech Tokenizer，通过一个语音编码器将音频表示为连续向量序列，<strong>此处设计和 AR-DiT 基本一致，Decoder 通过 Flow Matching 恢复语音</strong>，尽可能保留原始信息，<br />\n自回归LM 则基于这些连续表征进行训练和推断，实验结果显示，基于连续 token 在合成语音的连贯性和平均意见得分（MOS）上均优于离散 token 方案。论文分析认为，连续表示在低频和高频细节上都有更好的信息保留度，从而提高了音质和自然度。</p>\n<p><strong>关键工作：</strong> 1）提出 Cont-SPT 连续 tokenizer，以简单高效的方式获得连续语音表示，解决离散 token 信息缺失的问题；2）构建了连续 token 的 TTS 模型，并提供完整的训练框架，验证其可行性；3）通过频域分析，证明连续分词器在全频段上信息保留率更高，使生成的语音在不同采样率下都更具鲁棒性。</p>\n<p><strong>创新点：</strong> 1) <strong>信息无损压缩</strong>：Cont-SPT 编码器在压缩语音长度的同时尽量减少失真，使语言模型获得更完整的声学信息；2) <strong>端到端训练</strong>：模型可直接以连续向量为桥梁联合优化，实现文本到语音的端到端映射；3) <strong>简单高效</strong>：连续 tokenzier 结构更简洁（据论文所述参数量小），为后续大模型融合语音提供了便利。</p>\n<h3>5. [KALL-E] Autoregressive Speech Synthesis with Next-Distribution Prediction</h3>\n<ul>\n<li>论文链接：<a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/pdf/2412.16846\">HTTPS://arxiv.org/pdf/2412.16846</a></li>\n<li>开源：<a href=\"https://link.zhihu.com/?target=https%3A//github.com/xkx-hub/KALL-E\">https://github.com/xkx-hub/KALL-E</a></li>\n<li>时间及机构：2024 年 12 月，西北工业大学</li>\n</ul>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-415bcfcef392b8e9274f28030f36a374_1440w.jpg\" /></p>\n<p><strong>核心方法：</strong> KALL-E 是一款新的自回归语音合成模型，其显著特点在于预测下一个连续分布（而非确定的下一个帧值）。论文使用 <strong>Flow-VAE</strong> 对音频训练出连续表征（替代离散 token），然后训练单一 AR Transformer 根据文本预测下一帧的概率分布。<br />\n具体来说，Flow-VAE 编码器将波形映射为高斯分布参数（均值和方差），解码器能从该分布重构波形；AR Transformer 则以 KL 散度为损失函数，逐步预测下一个连续潜向量的分布。这种方法通过LM直接建模连续语音表征。由于每一步输出的是分布，采样时可通过重参数化获得多样化的输出。</p>\n<p><strong>关键工作：</strong> KALL-E 取消了 VQ 和扩散模型，以更直接有效的方式利用连续表示进行 TTS。它引入的 WaveVAE 模块能够自适应地提取语音分布，结合 Transformer 的自回归预测，实现了扩散模型蒸馏到 AR 模型的效果。实验表明，KALL-E 在语音合成质量上优于诸多现有模型。</p>\n<p><strong>模型创新点：</strong> 1）<strong>下一分布预测</strong>：相较传统预测下一个具体值，预测分布能表达不确定性，利于提升自然度和多样性；2）<strong>Flow-VAE 连续编码</strong>：通过流式 VAE 高效压缩语音至连续潜在空间，并保留可控的分布信息；3）<strong>单阶段训练</strong>：将 VAE 编码与 AR 预测融合训练，简化了流水线，提升一致性。4）<strong>KL 散度损失</strong>：以 KL 散度替代交叉熵，使模型直接学得连续分布，训练更稳定。</p>\n<h3>6. [DiTAR] Diffusion Transformer Autoregressive Modeling for Speech Generation</h3>\n<ul>\n<li>论文链接：<a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/pdf/2502.03930\">HTTPS://arxiv.org/pdf/2502.03930</a></li>\n<li>demo：<a href=\"https://link.zhihu.com/?target=https%3A//spicyresearch.github.io/ditar/\">Demo page of DiTAR</a></li>\n<li>时间及机构：2025 年 2 月，字节跳动-豆包 ⭐️ （重点论文）</li>\n</ul>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-b200100bc1a61ff4b61a0b0a50bdb11e_1440w.jpg\" /></p>\n<p><strong>核心方法：</strong> DiTAR 提出了 LocDiT + LLM 的自回归建模框架，以分块序列的方式生成连续语音。模型由<strong>语言模型</strong> 和 <strong>LocDiT</strong> 组成，采用“<strong>分而治之</strong>”策略：将语音表示序列划分为若干 <strong>patch</strong>，语言模型先对前面已生成的 patch 通过 Aggregation Encoder 降低帧率（实际功能就是合并 token 进行下采样），并输出 patch embedding；DiT 接着基于该 embedding 生成下一个 patch。<br />\n这种设计使每个 patch 内部可通过扩散并行生成多个帧，而 patch 与 patch 之间通过 AR 顺序保证全局连贯。为平衡生成多样性和确定性，论文还在推理时还引入了一个“温度”参数，控制输出随机性。此外，论文通过大规模实验展示了 DiTAR 在模型规模扩展上的卓越效果。</p>\n<p><strong>关键工作：</strong> 1）<strong>分块+扩散</strong>：把长语音序列拆成 patch 处理，每块内部用 LocDiT 生成，高效且保真；2）<strong>AR+并行结合</strong>：patch 间自回归确保整体一致性，patch 内并行扩散提高速度；3）<strong>温度控制</strong>：通过调整扩散噪声注入时刻，允许用户在音质稳定和生成多样之间调节。实验表明，在零样本语音生成中，DiTAR 的鲁棒性、说话人相似度和自然度等指标达到当前最佳。该模型已被 ICML 2025 接收，可见其技术路线已经获得了学界认可，已经在<strong>实践落地中</strong>。</p>\n<p><strong>模型创新点：Patch 级别自回归</strong>：将长序列预测转化为较短单元的预测任务，使 Transformer 对长上下文处理更高效；<strong>块内扩散</strong>：在每个 patch 内用扩散模型处理细节，实现快慢过程分离、各擅其长；<strong>可扩展性</strong>：论文对模型进行了规模扩展的实验，结果证明 DiTAR 在更大模型/数据下表现持续提升，没有明显瓶颈。</p>\n<p><strong>目标应用：</strong> DiTAR 特别适合长内容语音合成（如有声书、播客）和多说话人场景。其 patch 机制支持极长上下文（论文提及 64k 长度的对话情景），可一次生成数十分钟的多轮对话内容而保持角色音色和对话语气连贯。此外，通过温度调整，它也能用于可控风格合成：在需要更保守或更创造性的语音输出时进行平衡。</p>\n<h3>7. [FELLE] Autoregressive Speech Synthesis with Token-Wise Coarse-to-Fine Flow Matching</h3>\n<ul>\n<li>论文链接：<a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/pdf/2502.11128\">HTTPS://arxiv.org/pdf/2502.11128</a></li>\n<li>demo：<a href=\"https://link.zhihu.com/?target=https%3A//felle-demo.github.io/\">https://felle-demo.github.io/</a></li>\n<li>时间及机构：2025 年 2 月，南开大学 &amp; 微软</li>\n</ul>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-f6322da39c8fd2b316aa2932e290a5ab_1440w.jpg\" /></p>\n<p><strong>核心方法：</strong> FELLE 和 MELLE 方案非常相似，自回归逐帧预测梅尔特征<strong>。不同的是，</strong>为了提升时序一致性和生成质量，FELLE 针对每个连续 token 引入<strong>动态先验机制</strong>：即在流匹配过程中，将前一步已生成的谱帧作为当前帧的高斯先验分布的中心。这样每一步生成都参考了上一步结果，保证了谱帧之间的平滑衔接和稳定性。<br />\n进一步地，FELLE 提出了从粗粒度到细粒度的流匹配（C2F-FM）模块，将每帧的生成分成粗略和精细两个阶段：先低分辨率粗生成，再进行精细化的还原。这一两阶段机制帮助模型捕捉梅尔谱的时频相关结构，提高了合成音频的细节保真度。</p>\n<p><strong>关键工作：</strong> 1）<strong>token 级流匹配</strong>：不同于以往全局流，FELLE 在每个自回归步使用流匹配生成当前帧，使分布预测更灵活准确；2）<strong>动态先验</strong>：每帧的生成先验由前一帧输出确定，实现了时序信息的<strong>显式建模</strong>，增强了长时依赖的保持；3）<strong>粗到细生成</strong>：先粗后细的分层生成策略确保既有全局结构又有局部细节；4）<strong>多重损失设计</strong>：包含条件损失、粗细分辨率损失和停止符预测损失等，保障模型从各方面优化。<br />\n实验在 LibriSpeech 数据集上显示，与同时期的 MELLE 等模型相比，FELLE 在字词错误率（WER）降低、相似度提升等多个指标上都有显著优势。特别是在语音连贯性和跨句一致性方面，FELLE 表现优秀，凸显其高保真长文本合成潜力。</p>\n<p><strong>模型创新点：</strong> <strong>动态先验融入上下文</strong>：每步根据上一帧调整先验，使模型生成更稳定不发散；<strong>C2F 分阶段</strong>：借鉴图像领域粗到细思想，提升声谱细节品质。</p>\n<h3>8. [SMLLE] Zero-Shot Streaming Text to Speech Synthesis with Transducer and Auto-Regressive Modeling</h3>\n<ul>\n<li>论文链接：<a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/pdf/2505.19669\">HTTPS://arxiv.org/pdf/2505.19669</a></li>\n<li>demo：<a href=\"https://link.zhihu.com/?target=https%3A//shy-98.github.io/SMLLE_demo_page/\">SMLLE Demos</a></li>\n<li>时间及机构：2025 年 5 月，微软 &amp; 上海交通大学</li>\n</ul>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-8b8464e98ebd1d2ae0d91da876984a95_1440w.jpg\" /></p>\n<p><strong>核心方法：</strong> SMLLE 提出了一种针对实时流式零样本 TTS 的解决方案，将 RNNT（Transducer）模型与自回归 TTS 结合，做到逐字流式生成高质量语音。系统分两部分：第一部分，Transducer 根据输入文本实时输出语义 token 流并同步获得对齐的发音持续时间信息，这些语义 token 类似于高层次的内容表示。<br />\n第二部分是一个完全自回归的模型逐帧生成梅尔谱，<strong>这部分类似于本文讨论的连续表征的自回归模型</strong>，建模采用的是 MELLE 相同的损失函数，输入条件是 Transducer 输出的语义 token。为了解决严格流式下看不到未来文本的问题，论文设计了<strong>“Delete <BOS>”机制</strong>：大致思想是允许 AR 模型以最小延迟窥视一小部分未来文本，这种机制在保证低延迟的同时改善了语音连贯和自然度。</p>\n<p><strong>关键工作：</strong> SMLLE 克服了传统流式 TTS 需要 <strong>look-ahead</strong> 造成高延迟的难题。Transducer 模块的引入使系统在不牺牲未来文本的情况下获得语速和停顿信息；同时 <strong>Delete <BOS></strong> 机制巧妙地补充了一些未来下文，从而显著降低由于严格因果模型而产生的语调生硬等问题。实验结果显示，SMLLE 不仅优于现有流式 TTS 方法，在品质上甚至逼近非流式（整句级别合成）的系统。在毫秒级延迟下，SMLLE 依然可以产生与离线模型相当自然的语音。论文提供的试听示例也证明了其低延迟、高音质的特性。</p>\n<p><strong>模型创新点：</strong> 1）<strong>Transducer+AR 组合</strong>：Transducer 负责<strong>即时字符到语义</strong>转换，AR 模型负责语音生成，两者无缝衔接保证实时性和高质；2）<strong>显式对齐</strong>：Transducer 输出对齐信息，让 AR 模型准确把握每个语音帧应对应的文本长度，避免播放时长与文本错配；3）<strong>Delete <BOS> 技术</strong>：在严格流式环境下引入极小“偷窥”未来能力，换取巨大自然度提升；4）<strong>零样本支持</strong>：延续微软系列工作的风格，SMLLE 支持零样本说话人克隆，可在实时合成中改变音色。</p>\n<h3>9. [StreamMel] Real-Time Zero-shot Text-to-Speech via Interleaved Continuous Autoregressive Modeling</h3>\n<ul>\n<li>论文链接：<a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/pdf/2506.12570\">HTTPS://arxiv.org/pdf/2506.12570</a></li>\n<li>demo：<a href=\"https://link.zhihu.com/?target=https%3A//jiusansan222.github.io/StreamMel-demo/\">StreamMel</a></li>\n<li>时间及机构：2025 年 6 月，微软 &amp; 上海交通大学</li>\n</ul>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-e6b22f5a6543d75920428a0b1d998757_1440w.jpg\" /></p>\n<p><strong>核心方法：</strong> StreamMel 是一种单阶段的流式零样本 TTS 框架，特点在于采用了文本和 Mel 特征进行 Interleave 交替输入的连续自回归建模的新范式。与 SMLLE 的两阶段方案不同，StreamMel 将<strong>文本 token 和声学梅尔特征交替地插入同一序列</strong>，由一个大型 Transformer 在同一时间步同时处理文本和语音信息。<br />\n模型在每个时间步输出下一帧的梅尔，同时接受一部分新的文本 token，实现文本和语音的同步生成。这种交叉序列设计使得模型天然具备流式能力：文本一边输入一边被转换为语音帧，不需要等待整个句子结束。此外，论文让模型直接生成连续梅尔谱特征，避免了离散表示和多阶段流水线，从而降低计算开销和延迟。</p>\n<p><strong>关键工作：</strong> StreamMel 在低时延和高质量之间取得了新的平衡。通过 Interleave 序列的方法，它实现了单阶段端到端生成，使多余的中间步骤和不同模块间通信统统省去。实验表明，StreamMel 在 LibriSpeech 数据集上的延迟和语音质量均优于已有流式 TTS 基线，且性能可以媲美一些离线系统。<br />\n特别地，模型在说话人相似度和自然度方面，与离线模型不相上下，同时支持高效实时合成。论文还强调，StreamMel 有希望与实时语音大语言模型对接融合，为将来更强大的语音对话 AI 打下基础。</p>\n<p><strong>模型创新点：</strong> 1）<strong>交替序列 AR</strong>：将文本和语音帧融为一个序列交替生成，避免单独对齐步骤，实现真正的端到端同步合成；2）<strong>单模型单阶段</strong>：不再需要语音编码器或 Transducer，直接由一个 Transformer 完成所有工作，结构简洁高效；3）<strong>零样本</strong>：保留微软系列模型零样本克隆优势，一套模型应对多说话人场景无需专门调优；4）<strong>扩展性</strong>：在支持低时延的同时，依然可以拓展长文本场景（论文称达离线系统可比性能），未来可应用于长段播报甚至多轮对话。</p>\n<h3>10. [CLEAR] Continuous Latent Autoregressive Modeling for High-quality and Low-latency Speech Synthesis</h3>\n<ul>\n<li>论文链接：<a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/pdf/2508.19098\">HTTPS://arxiv.org/pdf/2508.19098</a></li>\n<li>时间及机构：2025 年 8 月，香港中文大学 &amp; 华为</li>\n</ul>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-7d6ce8c9a935361a5a82a8f435b3429a_1440w.jpg\" /></p>\n<p><strong>核心方法：</strong> CLEAR 提出了一种统一的连续表征的自回归零样本 TTS 框架。同样为了摆脱离散 token 压缩损失，CLEAR 首先设计了一个高压缩率的变分自编码器（VAE），带有 shortcut 的 skip-connection结构，可将原始波形映射为紧凑的连续 latents表示，这种 VAE 能在保持音质的前提下极大地降低序列长度（提升压缩比）。<br />\n论文同样使用 LLM 直接预测下一个连续表征，同时引入一个轻量级 MLP rectified-flow head 对每个 Transformer 的隐状态进行独立的分布建模，能够逐步生成音频 VAE 的连续表征。换言之，CLEAR 将一个大型 Transformer 与每步的小型 MLP 生成器结合，避免了对离散 token 的依赖。</p>\n<p><strong>关键工作：</strong> CLEAR 证明了<strong>不经离散压缩</strong>也能实现高质量、低延迟的 TTS。实验表明，相比类似规模的离散音频语言模型，CLEAR 在效率和保真度上都有提升。在 LibriSpeech 标准测试集上，CLEAR 达到了仅 1.88% 的字错误率（WER）和 0.29 的实时因子（RTF），远优于此前 SOTA 模型。同时，CLEAR 天生支持<strong>流式合成</strong>，首帧延迟仅 96 毫秒，且后续持续生成时保持高音质。这些成绩表明连续潜变量 AR 建模在 TTS 中具有极大潜力。</p>\n<p><strong>模型创新点：</strong> 1）<strong>高效连续表示</strong>：优化设计的 VAE 确保极高压缩比（官方称 80 倍于 EnCodec）同时音质几乎无损；2）<strong>rectified-flow head</strong>：独立作用于每个时间步隐状态的 MLP，进行一小步一致性变换，弥补 Transformer 直接输出连续值的不足；3）<strong>联合训练</strong>：VAE 编码器、Transformer、rectified-flow head 在一个阶段端到端优化，无需多阶段配合；4）<strong>流式方案</strong>：模型生成每帧不依赖未来帧，可流式输出，并通过特殊设计降低流式首帧延迟。</p>\n<h3>11. [VibeVoice] VibeVoice Technical Report</h3>\n<ul>\n<li>论文链接：<a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/pdf/2508.19205\">HTTPS://arxiv.org/pdf/2508.19205</a></li>\n<li>demo：<a href=\"https://link.zhihu.com/?target=https%3A//microsoft.github.io/VibeVoice/\">VibeVoice</a></li>\n<li>官方开源：<a href=\"https://link.zhihu.com/?target=https%3A//github.com/microsoft/VibeVoice\">https://github.com/microsoft/VibeVoice</a></li>\n<li>社区版开源(备份)：<a href=\"https://link.zhihu.com/?target=https%3A//github.com/vibevoice-community/VibeVoice/\">https://github.com/vibevoice-community/VibeVoice/</a></li>\n<li>时间及机构：2025 年 8 月，微软</li>\n</ul>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-3da27c949705ede460062b34ae8b9a5e_1440w.jpg\" /></p>\n<p><strong>核心方法：</strong> VibeVoice 是微软推出的一种生成长篇多说话人语音的模型，同样以“next-token diffusion”技术为核心。模型使用了一种新颖的连续语音 tokenizer：相比流行的 EnCodec，其数据压缩能力提高了 80 倍，但音频保真度几乎不变，用极低的 token 速率表示长音频，为长段合成打下基础。<br />\n在生成阶段，同样每个时间步通过扩散模型在连续空间生成 latent，并以自回归方式推进序列。由于连续 token 密度极低，模型可以处理超长上下文（报告称支持 64k 长度上下文）。整套系统能够在 90 分钟的语音长度范围内生成包含最多 4 个说话人的对话内容，真正实现了长对话中说话人语调、语气的细腻呈现。</p>\n<p><strong>关键工作：</strong> VibeVoice 最大亮点在于解决了长对话、多说话人的生成问题，同时兼顾了音频质量和效率。其超强压缩 tokenizer 使得长达 1.5 小时的音频仅相当于短序列，对 Transformer 来说仍在可处理范围。加上 Diffusion、模型对连续数据的全局建模能力，模型可以在长对话中维持角色特点和交互节奏。<br />\n实验表明，VibeVoice 在多说话人对话合成方面超越了开源和某些专有对话模型，生成的 90 分钟播客令人难以区分真人与 AI。一篇新闻稿称其为“90 分钟播客生成器”，足见其在播客内容自动生成上的巨大突破。</p>\n<p><strong>模型创新点：</strong> 1）<strong>超高压缩连续 tokenizer</strong>：将数据压缩到传统的 1/80，大幅减少模型负担；2）<strong>next-token 扩散：</strong>每个 token 通过扩散模型生成，兼具 AR 的顺序性和扩散模型的高质量生成，保证长文内容的丰富性和一致性；3）<strong>多说话人对话</strong>：内建对多说话人角色的支持，可在一个上下文中灵活切换 4 种声音；4）<strong>极长上下文</strong>：将 Transformer 上下文窗口拓展到 64k，使得模型能整段剧本一次读完并自然合成整部有声内容。</p>\n<p><strong>目标应用：</strong> VibeVoice 针对播客、广播剧、长访谈等应用，能够自动生成长时多人对话音频。例如，给定剧本，模型可以合成数十分钟多角色有声读物，且角色间语气互动真实。未来，它可用于数字内容创作，帮助媒体生产者快速生成高质量播客；也可与聊天机器人结合，创造出具备长对话记忆和逼真声音的 AI 主播或 AI 客服。</p>\n<h3>12. [CALM] Continuous Audio Language Models</h3>\n<ul>\n<li>论文链接：<a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/pdf/2509.06926\">HTTPS://arxiv.org/pdf/2508.19205</a></li>\n<li>demo：<a href=\"https://link.zhihu.com/?target=https%3A//huggingface.co/spaces/kyutai/calm-samples\">https://huggingface.co/spaces/kyutai/calm-samples</a></li>\n<li>时间及机构：2025 年 8 月，Kyutai</li>\n</ul>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-0c11deb74b61426ff831adb80d1e94f8_1440w.jpg\" /></p>\n<p><strong>核心方法：</strong>Kyutai 团队的最新工作 CALM，提出了一种新的连续音频语言模型架构，不再依赖离散音频 token。模型由一个大型 Transformer Backbone 和 MLP 生成头组成。Transformer 每个时间步输出一个上下文嵌入，随后 MLP（一致性模型）以此嵌入为条件，生成音频 VAE 的下一帧连续向量。<br />\n这种通过一致性建模（consistency modeling）的生成方式，可以看作是对扩散模型的蒸馏，使每一步直接产生高质量帧，而无需多次迭代。由于跳过了离散 codec 压缩环节，CALM 在相同计算成本下实现了更高的音质。论文在语音和音乐数据上验证了 CALM 的优势：与现有离散音频语言模型相比，CALM 显著提高了生成效率和保真度。换言之，在达到相同音频质量时，CALM 所需的 token 更少，推理更快；若耗费相同计算量，则 CALM 生成的音频质量更佳。</p>\n<p><strong>关键工作：</strong> CALM 直接通过连续帧方式生成，它避免了提升质量就必须指数增加 token 数量的矛盾。同时，<strong>CALM 利用了 Audio VAE</strong> 的编解码能力，使连续帧仍可还原为高保真音频。实验中，其在语音和音乐领域都取得了比离散模型更好的效果。这说明连续音频语言模型不但可行，而且在效率和质量上都优于传统离散范式，为<strong>统一生成音乐与语音</strong>等不同类型音频铺平了道路。</p>\n<p><strong>模型创新点：</strong> 1）<strong>帧级语言建模</strong>：逐帧生成音频，不再将音频切成离散符号，消除了不可逆压缩损失；2）<strong>一致性生成</strong>：采用一致性模型确保一步预测高质量帧，避免扩散多步耗时，实现质量和速度兼得；3）<strong>统一语音音乐</strong>：不区分数据类型，证明了连续框架对不同音频模态的普适性；4）<strong>轻量高质</strong>：无需庞大码本，Transformer+MLP 的小巧组合即可匹敌离散大模型性能，为后续模型轻量化提供了思路。</p>\n<p><strong>目标应用：</strong> CALM 有望应用于通用音频生成场景。例如，一个模型既可以用来合成语音对话，又能生成音乐片段，实现多模态音频合成。其高效架构也适用于设备端部署，用于音乐伴奏生成、实时音效合成等需要高质量和低时延的场景。此外，CALM 为构建音频领域的 GPT 提供了另一条路线——通过连续表示，可以训练出同时掌握语言和声音的超大模型，在语音对话系统、AI 作曲等方向具有广阔前景。</p>\n<h3>13. [MELA-TTS] Joint transformer-diffusion model with representation alignment for speech synthesis</h3>\n<ul>\n<li>论文链接：<a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/pdf/2509.14784\">HTTPS://arxiv.org/pdf/2509.14784</a></li>\n<li>时间及机构：2025 年 9 月，阿里巴巴 &amp; 东南大学</li>\n</ul>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-4c8dd20ac8b90006f8d6dd9f6c22b9e7_1440w.jpg\" /></p>\n<p><strong>核心方法：</strong> MELA-TTS 提出了一种将 Transformer 自回归与扩散模型紧密结合的 TTS 架构。模型直接从文本和说话人条件出发，自回归地生成连续梅尔谱帧，不经过任何离散符号或多级流程。针对连续特征难以建模的问题，论文还引入了表示对齐模块：在训练过程中，将 Transformer 解码器的输出表示和预训练 ASR（自动语音识别）编码器的语义嵌入对齐。<br />\n具体而言，让 TTS 模型的中间表示去匹配一个 ASR 模型对相应语音帧的高层表示，从而强制 TTS 输出携带正确的语义信息和结构。这种对齐机制加速了模型收敛，并增强了文本域与语音域的跨模态一致性。同时，模型内部融合了噪声估计器，在自回归生成每帧时辅以噪声建模，提升了连续帧预测的稳定性。整体框架实现了端到端的一阶段训练，相比离散 token 范式极大简化，但在各项评测中取得了新的 SOTA 性能。</p>\n<p><strong>关键工作：</strong> MELA-TTS 在保证零样本音色克隆和支持流式/离线双模式的同时，在 MOS、WER 等多个指标上超越了以往工作。表示对齐模块功不可没，它让 TTS 生成更贴合文本语义，减少了说话不清或语义偏离的问题（ASR 嵌入相当于给 TTS 提供了“教师信号”）。此外，LLM+Diffusion 的结合提高了连续帧的预测精度和多样性，使模型在稳健性方面表现突出。综合实验结果表明，MELA-TTS 为连续特征建模提供了强有力的例证，有望成为取代离散 token 范式的有力替代。</p>\n<p><strong>模型创新点：</strong> 1）LLM + Diffusion<strong>融合</strong>：在每个自回归步注入扩散噪声建模，提高连续预测的可靠度和平滑度；2）<strong>语音语义对齐</strong>：首创将预训练 ASR 的特征用于指导 TTS，使合成语音在内容和韵律上都更加精准；3）<strong>一阶段端到端</strong>：无需嵌套 VAE 或两步流程，训练简单、推理高效；4）<strong>全模式支持</strong>：同一模型即可离线批量生成，又可流式逐帧输出，应用灵活。</p>\n<h3>14. [VoxCPM] VoxCPM: Tokenizer-Free TTS for Context-Aware Speech Generation and True-to-Life Voice Cloning</h3>\n<ul>\n<li>论文链接：<a href=\"https://link.zhihu.com/?target=https%3A//arxiv.org/pdf/2509.24650\">https://arxiv.org/pdf/2509.24650</a></li>\n<li>demo：<a href=\"https://link.zhihu.com/?target=https%3A//openbmb.github.io/VoxCPM-demopage/\">VoxCPM: Tokenizer-Free TTS for Context-Aware Speech Generation and True-to-Life Voice Cloning</a></li>\n<li>开源：<a href=\"https://link.zhihu.com/?target=https%3A//github.com/OpenBMB/VoxCPM\">HTTPS://GitHub.com/OpenBMB/VoxCPM</a></li>\n<li>时间及机构：2025 年 9 月，面壁智能</li>\n</ul>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-70d0c27667e434fe5f28c093f75c7d16_1440w.jpg\" /></p>\n<p>VoxCPM 是由 OpenBMB 推出的不使用离散 tokenizer 的 TTS 方案，也是采用连续表征建模：抛弃主流的离散 token 化路径，采用 扩散 + 自回归架构，直接在连续空间生成语音表征。突出的特点在于：采用了类似于 UniAudio/Moshi/FireRedTTS-2 的两个 LLM 模型，分别负责 semantic hidden 和 acoustic hidden 的生成，这部分后续准备另外一篇文章来单独介绍。</p>\n<p>官方 github 的其他介绍：</p>\n<ul>\n<li>上下文感知语音生成：能理解文本上下文，自然推断韵律与语气，合成更具表现力的语音。</li>\n<li>真实感语音克隆：通过一段简短的参考音频即可实现零样本克隆，捕捉音色、口音、情绪、节奏等细粒度特征。</li>\n<li>高效流式合成：在消费级 RTX 4090 上的实时因子（RTF）低至 0.17，适用于实时交互场景。</li>\n<li>训练规模：基于 MiniCPM-4 作为主干，训练语料达 180 万小时双语语音，增强了表达力和稳定性。</li>\n</ul>\n<hr />\n<h2>三、连续表征新范式的优缺点分析</h2>\n<p>上述工作实际都是围绕着“<strong>连续表征 + 自回归</strong>”这一新范式在进行各种改动尝试，可以看出各论文大同小异。连续表征新范式在语音生成中展现出诸多优势，但是离散方法的优势也是显而易见的：有成熟的编码器（如 EnCodec/ DAC / CosyVoice Tokenizer）、有稳定的训练范式、在过去两年推动了 CosyVoice、FireRed-TTS、Index-TTS 等工业落地。所以，下面我们从优缺点两方面对比连续表征范式与传统离散 token 方法：</p>\n<p><strong>连续表征的优势：</strong></p>\n<ol>\n<li>首先是<strong>高保真</strong>。AR-DiT、CLEAR、CALM 等直接在连续 latent 上建模，省去了 VQ 离散压缩环节，不存在码本限制，几乎摆脱了量化带来的折损，声音细节被完整保留。例如，AR-DiT 等模型利用高比特率连续向量，实现了几乎无损的重建效果。连续模型也无需像 VQ-VAE 那样担心 codebook 坍塌的问题（比如需要多种训练 VQ 的 trick 来保证 codebook 利用率和训练稳定性）。</li>\n<li>其次是<strong>端到端的简化</strong>：MELLE、Cont-SPT 让我们看到不用单独 tokenizer 也能把文本直接映射到语音，架构更轻、更干净，单阶段即可训练和生成，减少了模型设计和调优的复杂度，避免了离散 token 范式中编码器-解码器失配或误差累积的问题。</li>\n<li>更重要的是，连续表征方法在<strong>长语音生成</strong>上天然具备优势，VibeVoice 可以合成 90 分钟的播客，而离散方法很难撑住如此长的 token 序列。连续表示在相同质量下所需 token 帧率更低（因为每个连续帧携带的信息量更大），加上蒸馏、并行化、硬件优化的加入，推理速度并非不可解的难题，在应用落地方面具有天然的优势。</li>\n</ol>\n<p><strong>当然，「没有免费的午餐」，缺点或者难点也是有的：</strong></p>\n<ol>\n<li>连续表示包含的信息更加丰富，所以分布的建模难度远高于离散，简单使用均方误差（MSE）或平均绝对误差（MAE）损失会假设分布肯定过于简单，导致输出模糊或失真。需要引入扩散、流匹配、flux loss 等复杂技术来避免输出模糊，这意味着更高的算法和技巧门槛。</li>\n<li>其次，离散 token 因为有预训练码本压缩，较小模型即可处理，而连续模型要直接拟合连续空间的复杂特征，参数量可能需要更大（位置）？中小型研究团队和定制场景可能难以立刻复现和使用。</li>\n<li>另外，加上扩散和流匹配在推理中的时延问题，几十步迭代采样的方案几乎无法实时，需要配合<strong>蒸馏、rectified flow 或者 Consistency Models</strong> 来优化建模。相比之下，离散 AR 模型虽然帧率较高，但每步直接采样，下一个 token 生成一步到位，在同等条件下速度优势明显（当然可能音质会略差）。</li>\n<li>最后，连续范式也强依赖于底层的连续表征质量。往往依赖一个高质量连续表示编码器（如 CLEAR 的 VAE、VibeVoice 的 tokenizer、Cont-SPT 的 encoder），需要良好的设计和训练，否则会影响最终合成效果——如果连续表征不能完美重构音频，那么生成模型再优秀也无济于事。连续新范式，实际把一部分难度转移到了学习可逆的连续表示上，和离散 token 本质上一样需要同样的外部编/解码模型。</li>\n</ol>\n<hr />\n<h2>四、技术展望</h2>\n<p>短短一年多里，连续表征范式已经跑出了气势，取得了不错的成果：从 AR-DiT 到 MELLE，从 VibeVoice 再到 VoxCPM，我们看到了一条不同于离散 token 的技术曲线。但如果说这已经是终点，可能还为时过早。接下来几年，这条发展曲线会走向哪里呢？以下仍然值得深入探索的方向：</p>\n<p><strong>第一，连续表示学习的方法改进。</strong> 连续范式很大程度上依赖底层连续表示的质量，如何在不牺牲音质的情况下进一步提高压缩效率、简化表示维度？VibeVoice 提升 EnCodec 压缩 80 倍就是一个惊人的进步，但是否还有余地？此外，可以探索<strong>跨模态的统一表示</strong>——让语音的连续表示与文本 embedding 处于同一空间或者具有直接可比性，这将有利于语音和语言模型的结合（Cont-SPT 等工作已开始在尝试）。实现语音-文本的表示对齐，将使多模态模型训练更加便利，或许哪天能看到一个 Transformer 既能处理文本 token 又能处理语音帧，实现真正意义上的 Modality-Agnostic 的“语音/音频语言模型”。</p>\n<p><strong>第二，模型的融合与范式统一。</strong> 目前的研究呈现出两大方向融合的趋势——即<strong>自回归语言建模</strong>与<strong>扩散/流匹配</strong>的结合，未来或许会出现更加统一的框架，将 <strong>Transformer 的长程建模能力与扩散模型的细节合成能力</strong>有机结合，形成端到端的语音和音频大模型（实际上，之前传出的 GPT-4o 图像生成能力可能也采用了类似的模型结构方案）。随着之后的发展，连续与离散、AR 与扩散模型（包括连续扩散和离散扩散）的界限，可能逐渐被模糊甚至消解。甚至有可能出现一套模型同时支持离线高质量生成和在线流式生成，只需通过调节参数或子模块即可切换，从而满足不同场景的应用需求。</p>\n<p><strong>第三，优化推理速度与效率。</strong>以上部分论文声称达到了实时甚至超实时速度，但这些通常是在非生产环境下得到的指标，未必考虑了部署开销。未来研究还需要着眼于模型压缩和加速推理，离散 LLM 和扩散/流匹配模型单独进行推理的部署框架已经相当成熟，但是两个模型相结合的推理方案，有可能定制化的优化还有提升空间，还比如像 StreamMel 这类交替输入文本和语音 token 的 TTS 方案，如何更好地平衡 prefill/decode 的开销及 cache 方案，都值得进一步定制化设计。</p>\n<p>总之，<strong>连续表征驱动的语音生成</strong>远不是“取代离散 token”这么简单，有可能也不是最终的方案，但是更像是一次思路上的重构，提醒我们思考什么才是语音大模型的<strong>原生形态</strong>。最近也在不同渠道看到一些小伙伴开始有相同的思考：如何进一步简化模型设计、提高模型效率，或许也是后续大家关注的焦点。未来的下一站，或许是一个真正统一的音频大模型，能像人类一样全方面理解和生成声音。</p>\n<p>某些新的范式，或许在加速到来。</p>\n<hr />\n<h2>参考文献</h2>\n<ul>\n<li>[AR-DiT] Autoregressive Diffusion Transformer for Text-to-Speech Synthesis<br />\n<a href=\"https://link.zhihu.com/?target=HTTPS%3A//arxiv.org/pdf/2406.05551\">HTTPS://arxiv.org/pdf/2406.05551</a></li>\n<li>[MELLE] MELLE: Autoregressive Speech Synthesis without Vector Quantization<br />\n<a href=\"https://link.zhihu.com/?target=HTTPS%3A//arxiv.org/pdf/2407.08551\">HTTPS://arxiv.org/pdf/2407.08551</a></li>\n<li>[SALAD] Continuous speech synthesis using per-token latent diffusion<br />\n<a href=\"https://link.zhihu.com/?target=HTTPS%3A//arxiv.org/pdf/2410.16048\">HTTPS://arxiv.org/pdf/2410.16048</a></li>\n<li>[Cont-SPT] Continuous Speech Tokenizer in Text To Speech<br />\n<a href=\"https://link.zhihu.com/?target=HTTPS%3A//arxiv.org/pdf/2410.17081\">HTTPS://arxiv.org/pdf/2410.17081</a></li>\n<li>[KALL-E] KALL-E: Autoregressive Speech Synthesis with Next-Distribution Prediction<br />\n<a href=\"https://link.zhihu.com/?target=HTTPS%3A//arxiv.org/pdf/2412.16846\">HTTPS://arxiv.org/pdf/2412.16846</a></li>\n<li>[DiTAR] DiTAR: Diffusion Transformer Autoregressive Modeling for Speech Generation<br />\n<a href=\"https://link.zhihu.com/?target=HTTPS%3A//arxiv.org/pdf/2502.03930\">HTTPS://arxiv.org/pdf/2502.03930</a></li>\n<li>[FELLE] FELLE: Autoregressive Speech Synthesis with Token-Wise Coarse-to-Fine Flow Matching<br />\n<a href=\"https://link.zhihu.com/?target=HTTPS%3A//arxiv.org/pdf/2502.11128\">HTTPS://arxiv.org/pdf/2502.11128</a></li>\n<li>[SMLLE] Zero-Shot Streaming Text to Speech Synthesis with Transducer and Auto-Regressive Modeling<br />\n<a href=\"https://link.zhihu.com/?target=HTTPS%3A//arxiv.org/pdf/2505.19669\">HTTPS://arxiv.org/pdf/2505.19669</a></li>\n<li>[StreamMel] StreamMel: Real-Time Zero-shot Text-to-Speech via Interleaved Continuous Autoregressive Modeling<br />\n<a href=\"https://link.zhihu.com/?target=HTTPS%3A//arxiv.org/pdf/2506.12570\">HTTPS://arxiv.org/pdf/2506.12570</a></li>\n<li>[CLEAR] CLEAR: Continuous Latent Autoregressive Modeling for High-quality and Low-latency Speech Synthesis<br />\n<a href=\"https://link.zhihu.com/?target=HTTPS%3A//arxiv.org/pdf/2508.19098\">HTTPS://arxiv.org/pdf/2508.19098</a></li>\n<li>[VibeVoice] VibeVoice Technical Report<br />\n<a href=\"https://link.zhihu.com/?target=HTTPS%3A//arxiv.org/pdf/2508.19205\">HTTPS://arxiv.org/pdf/2508.19205</a></li>\n<li>[CALM] Continuous Audio Language Models<br />\n<a href=\"https://link.zhihu.com/?target=HTTPS%3A//arxiv.org/pdf/2509.06926\">HTTPS://arxiv.org/pdf/2509.06926</a></li>\n<li>[MELA-TTS] MELA-TTS: Joint transformer-diffusion model with representation alignment for speech synthesis<br />\n<a href=\"https://link.zhihu.com/?target=HTTPS%3A//arxiv.org/pdf/2509.14784\">HTTPS://arxiv.org/pdf/2509.14784</a></li>\n<li>[VoxCPM] VoxCPM: Tokenizer-Free TTS for Context-Aware Speech Generation and True-to-Life Voice Cloning<br />\n<a href=\"https://link.zhihu.com/?target=HTTPS%3A//GitHub.com/OpenBMB/VoxCPM\">HTTPS://GitHub.com/OpenBMB/VoxCPM</a></li>\n</ul>"
    }
  ],
  "graph": {
    "nodes": [
      {
        "id": "wavenet",
        "x": 100,
        "y": 100,
        "category": "tts"
      },
      {
        "id": "tacotron",
        "x": 200,
        "y": 100,
        "category": "tts"
      },
      {
        "id": "tacotron2",
        "x": 300,
        "y": 100,
        "category": "tts"
      },
      {
        "id": "fastspeech",
        "x": 400,
        "y": 100,
        "category": "tts"
      },
      {
        "id": "fastspeech2",
        "x": 500,
        "y": 100,
        "category": "tts"
      },
      {
        "id": "vits",
        "x": 600,
        "y": 100,
        "category": "tts"
      },
      {
        "id": "f5tts",
        "x": 700,
        "y": 100,
        "category": "tts"
      },
      {
        "id": "dittotts",
        "x": 800,
        "y": 100,
        "category": "tts"
      },
      {
        "id": "cosyvoice3",
        "x": 900,
        "y": 80,
        "category": "tts"
      },
      {
        "id": "fishaudio_s2",
        "x": 900,
        "y": 120,
        "category": "tts"
      },
      {
        "id": "uniaudio2",
        "x": 900,
        "y": 160,
        "category": "tts"
      },
      {
        "id": "hifigan",
        "x": 500,
        "y": 250,
        "category": "vocoder"
      },
      {
        "id": "bigvgan",
        "x": 650,
        "y": 250,
        "category": "vocoder"
      },
      {
        "id": "yourtts",
        "x": 650,
        "y": 350,
        "category": "voice_clone"
      },
      {
        "id": "valle",
        "x": 750,
        "y": 350,
        "category": "voice_clone"
      },
      {
        "id": "megatts",
        "x": 800,
        "y": 380,
        "category": "voice_clone"
      },
      {
        "id": "valle2",
        "x": 850,
        "y": 350,
        "category": "voice_clone"
      },
      {
        "id": "xvoice",
        "x": 950,
        "y": 330,
        "category": "voice_clone"
      },
      {
        "id": "marcovoice",
        "x": 950,
        "y": 370,
        "category": "voice_clone"
      },
      {
        "id": "audioldm",
        "x": 750,
        "y": 500,
        "category": "audio_effect"
      },
      {
        "id": "tango",
        "x": 800,
        "y": 500,
        "category": "audio_effect"
      },
      {
        "id": "audioldm2",
        "x": 850,
        "y": 500,
        "category": "audio_effect"
      },
      {
        "id": "tfoley",
        "x": 850,
        "y": 540,
        "category": "audio_effect"
      },
      {
        "id": "audiox",
        "x": 950,
        "y": 500,
        "category": "audio_effect"
      },
      {
        "id": "audiogenomni",
        "x": 1000,
        "y": 500,
        "category": "audio_effect"
      },
      {
        "id": "soundstream",
        "x": 600,
        "y": 650,
        "category": "neural_codec"
      },
      {
        "id": "encodec",
        "x": 700,
        "y": 650,
        "category": "neural_codec"
      },
      {
        "id": "wavtokenizer",
        "x": 800,
        "y": 650,
        "category": "neural_codec"
      },
      {
        "id": "omnicodec",
        "x": 950,
        "y": 650,
        "category": "neural_codec"
      },
      {
        "id": "musicgen",
        "x": 750,
        "y": 800,
        "category": "music_gen"
      },
      {
        "id": "stableaudio25",
        "x": 950,
        "y": 800,
        "category": "music_gen"
      }
    ],
    "edges": [
      {
        "from": "wavenet",
        "to": "tacotron",
        "label": "端到端架构"
      },
      {
        "from": "tacotron",
        "to": "tacotron2",
        "label": "Mel谱+声码器"
      },
      {
        "from": "tacotron2",
        "to": "fastspeech",
        "label": "非自回归"
      },
      {
        "from": "fastspeech",
        "to": "fastspeech2",
        "label": "方差适配器"
      },
      {
        "from": "fastspeech2",
        "to": "vits",
        "label": "VAE+Flow"
      },
      {
        "from": "vits",
        "to": "f5tts",
        "label": "Flow Matching"
      },
      {
        "from": "f5tts",
        "to": "dittotts",
        "label": "DiT架构"
      },
      {
        "from": "f5tts",
        "to": "cosyvoice3",
        "label": "RL优化"
      },
      {
        "from": "f5tts",
        "to": "fishaudio_s2",
        "label": "情感建模"
      },
      {
        "from": "hifigan",
        "to": "bigvgan",
        "label": "大规模训练"
      },
      {
        "from": "vits",
        "to": "yourtts",
        "label": "零样本克隆"
      },
      {
        "from": "encodec",
        "to": "valle",
        "label": "语言模型范式"
      },
      {
        "from": "valle",
        "to": "megatts",
        "label": "扩散韵律"
      },
      {
        "from": "valle",
        "to": "valle2",
        "label": "重复感知"
      },
      {
        "from": "valle2",
        "to": "xvoice",
        "label": "多语言扩展"
      },
      {
        "from": "valle2",
        "to": "marcovoice",
        "label": "表达性统一"
      },
      {
        "from": "valle2",
        "to": "uniaudio2",
        "label": "统一框架"
      },
      {
        "from": "audioldm",
        "to": "tango",
        "label": "指令微调"
      },
      {
        "from": "audioldm",
        "to": "audioldm2",
        "label": "自监督学习"
      },
      {
        "from": "tango",
        "to": "tfoley",
        "label": "Foley合成"
      },
      {
        "from": "audioldm2",
        "to": "audiox",
        "label": "DiT架构"
      },
      {
        "from": "audiox",
        "to": "audiogenomni",
        "label": "MM-DiT"
      },
      {
        "from": "soundstream",
        "to": "encodec",
        "label": "高效压缩"
      },
      {
        "from": "encodec",
        "to": "wavtokenizer",
        "label": "单层Codebook"
      },
      {
        "from": "wavtokenizer",
        "to": "omnicodec",
        "label": "语义解耦"
      },
      {
        "from": "encodec",
        "to": "musicgen",
        "label": "音乐生成"
      },
      {
        "from": "musicgen",
        "to": "stableaudio25",
        "label": "ARC加速"
      }
    ],
    "milestones": [
      "wavenet",
      "vits",
      "valle"
    ]
  },
  "algos": [
    {
      "id": "wavenet",
      "num": 1,
      "name": "WaveNet",
      "fullName": "WaveNet: 生成式原始音频模型 (WaveNet: A Generative Model for Raw Audio)",
      "year": "2016",
      "org": "DeepMind",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/1609.03499",
      "projectUrl": "",
      "category": "tts",
      "motivation": "空洞因果卷积自回归生成原始波形",
      "summary": "WaveNet 的核心目标是：空洞因果卷积自回归生成原始波形。",
      "keyPoints": [
        "核心动机：空洞因果卷积自回归生成原始波形",
        "代表机构：DeepMind"
      ],
      "detail": "<p>空洞因果卷积自回归生成原始波形</p>"
    },
    {
      "id": "tacotron",
      "num": 2,
      "name": "Tacotron",
      "fullName": "Tacotron: 端到端语音合成 (Tacotron: Towards End-to-End Speech Synthesis)",
      "year": "2017",
      "org": "Google",
      "parent": "wavenet",
      "paperUrl": "https://arxiv.org/abs/1703.10135",
      "projectUrl": "",
      "category": "tts",
      "motivation": "Seq2Seq注意力机制端到端合成",
      "summary": "Tacotron 提出了一种基于 Seq2Seq + Attention 的端到端文本到语音合成模型，直接从字符序列生成语音频谱图，无需传统 TTS 流水线中的语言学特征工程和多阶段独立训练，在自然度上超越了生产级参数化系统。",
      "keyPoints": [
        "<strong>端到端架构</strong>：直接以字符序列为输入，输出原始频谱图，省去了文本前端、时长模型、声学模型等传统 TTS 流水线的多个独立模块",
        "<strong>CBHG 模块</strong>：提出 1-D 卷积组 + Highway 网络 + 双向 GRU 的组合模块，用于编码器和后处理网络，有效提取多尺度序列特征",
        "<strong>两阶段频谱预测</strong>：Seq2Seq 解码器先预测 80 维 mel 频谱图，再由后处理网络（Post-processing net）转换为线性频谱图",
        "<strong>输出帧缩减技巧</strong>：每个解码步预测 <span class=\"kb-math kb-math-inline\">r</span> 帧（reduction factor），大幅加速训练收敛和推理速度",
        "<strong>Griffin-Lim 波形合成</strong>：使用 Griffin-Lim 算法从线性频谱图重建波形，简单高效",
        "<strong>Pre-net 正则化</strong>：编码器和解码器均使用带 Dropout 的瓶颈层（Pre-net）作为正则化手段，提升泛化能力",
        "<strong>实验结果</strong>：在美式英语数据集上达到 3.82 MOS，超越生产级参数化 TTS 系统（3.69 MOS）"
      ],
      "detail": "<h5>模型整体架构</h5>\n<p><img alt=\"Tacotron 模型架构图\" src=\"https://ar5iv.labs.arxiv.org/html/1703.10135/assets/x1.png\" />\n<em>图 1：Tacotron 模型架构。模型以字符为输入，输出对应的原始频谱图，再通过 Griffin-Lim 重建算法合成语音波形。</em></p>\n<p>Tacotron 的核心是一个带注意力机制的 Seq2Seq 模型，包含三个主要组件：<strong>编码器（Encoder）</strong>、<strong>基于注意力的解码器（Attention-based Decoder）</strong> 和 <strong>后处理网络（Post-processing Net）</strong>。</p>\n<h5>CBHG 模块</h5>\n<p><img alt=\"CBHG 模块结构\" src=\"https://ar5iv.labs.arxiv.org/html/1703.10135/assets/x2.png\" />\n<em>图 2：CBHG（1-D 卷积组 + Highway 网络 + 双向 GRU）模块结构。</em></p>\n<p>CBHG 是 Tacotron 中的核心构建模块，其处理流程如下：</p>\n<ol>\n<li><strong>1-D 卷积组（Conv1D Bank）</strong>：使用 <span class=\"kb-math kb-math-inline\">K</span> 组不同宽度的 1-D 卷积滤波器（宽度从 1 到 <span class=\"kb-math kb-math-inline\">K</span>），显式建模从 unigram 到 <span class=\"kb-math kb-math-inline\">K</span>-gram 的局部上下文信息</li>\n<li><strong>最大池化</strong>：沿时间轴进行 stride=1 的最大池化，增强局部不变性并保持时间分辨率</li>\n<li><strong>1-D 卷积投影</strong>：通过固定宽度的 1-D 卷积进一步处理，并通过残差连接与原始输入相加</li>\n<li><strong>Highway 网络</strong>：多层全连接 Highway 网络提取高层特征</li>\n<li><strong>双向 GRU</strong>：最终通过双向 GRU 从前后两个方向提取序列特征</li>\n</ol>\n<div class=\"key-point\">💡 <strong>关键</strong>：CBHG 的多尺度卷积设计类似于 n-gram 语言模型的思想——不同宽度的卷积核捕获不同粒度的局部模式，这比单纯的 RNN 编码器更能减少过拟合和发音错误。</div>\n<h5>编码器（Encoder）</h5>\n<p>编码器将字符序列转换为高层表示：</p>\n<ol>\n<li>字符通过 one-hot 编码后嵌入为 256 维连续向量</li>\n<li>经过 <strong>Pre-net</strong>（FC-256-ReLU → Dropout(0.5) → FC-128-ReLU → Dropout(0.5)）进行非线性变换</li>\n<li>Pre-net 输出送入 <strong>CBHG 模块</strong>（<span class=\"kb-math kb-math-inline\">K=16</span>），生成最终的编码器表示</li>\n</ol>\n<h5>解码器（Decoder）</h5>\n<p>解码器采用 content-based tanh 注意力机制，逐步生成 mel 频谱图：</p>\n<div class=\"kb-math kb-math-display\">\\text{Attention}(q, K, V) = \\text{softmax}\\left(\\frac{qK^T}{\\sqrt{d}}\\right)V</div>\n<p>具体流程：\n1. <strong>Attention RNN</strong>（1 层 256 单元 GRU）生成注意力查询向量\n2. 注意力模块计算上下文向量，与 Attention RNN 输出拼接\n3. 拼接结果送入 <strong>Decoder RNN</strong>（2 层残差 GRU，256 单元）\n4. 全连接输出层预测 <span class=\"kb-math kb-math-inline\">r</span> 帧 80 维 mel 频谱图</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：每步预测 <span class=\"kb-math kb-math-inline\">r</span> 帧（论文中 <span class=\"kb-math kb-math-inline\">r=2</span>）是关键技巧。这不仅将解码步数减少为 <span class=\"kb-math kb-math-inline\">1/r</span>，更重要的是大幅加速了注意力对齐的学习——因为相邻语音帧高度相关，一次输出多帧允许注意力在训练早期就能快速前移。</div>\n<h5>后处理网络与波形合成</h5>\n<p>后处理网络的任务是将 mel 频谱图转换为线性频谱图：</p>\n<ul>\n<li>使用另一个 CBHG 模块（<span class=\"kb-math kb-math-inline\">K=8</span>），能够看到完整的解码序列</li>\n<li>相比 Seq2Seq 解码器只能从左到右生成，后处理网络同时利用前向和后向信息修正每帧的预测误差</li>\n</ul>\n<p>波形合成使用 <strong>Griffin-Lim 算法</strong>，从预测的线性频谱图迭代重建相位信息：</p>\n<div class=\"kb-math kb-math-display\">x_{n+1} = \\text{ISTFT}\\left(|S| \\cdot \\frac{\\text{STFT}(x_n)}{|\\text{STFT}(x_n)|}\\right)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">|S|</span> 为预测的幅度谱。论文发现将预测幅度取 1.2 次幂后再送入 Griffin-Lim 可减少合成伪影。</p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># Tacotron 端到端 TTS 推理流程\ndef tacotron_inference(text):\n    # 1. 编码器\n    chars = char_embedding(text)          # [T_in, 256]\n    enc = encoder_prenet(chars)           # [T_in, 128]\n    enc = encoder_cbhg(enc)              # [T_in, 256]\n\n    # 2. 注意力解码器\n    go_frame = zeros(80)                  # &lt;GO&gt; 帧\n    decoder_input = go_frame\n    mel_outputs = []\n\n    for step in range(max_steps):\n        prenet_out = decoder_prenet(decoder_input)\n        attn_rnn_out = attention_rnn(prenet_out)\n        context = attention(attn_rnn_out, enc)\n        decoder_out = decoder_rnn(concat(context, attn_rnn_out))\n        mel_frames = linear_projection(decoder_out)  # 预测 r 帧\n        mel_outputs.append(mel_frames)\n        decoder_input = mel_frames[-1]    # 取最后一帧作为下一步输入\n        if is_end_of_sequence(mel_frames):\n            break\n\n    # 3. 后处理网络\n    mel_spec = concat(mel_outputs)        # [T_out, 80]\n    linear_spec = postprocessing_cbhg(mel_spec)  # [T_out, 1025]\n\n    # 4. Griffin-Lim 波形合成\n    waveform = griffin_lim(linear_spec, n_iter=50)\n    return waveform\n</code></pre>\n<h5>训练细节</h5>\n<ul>\n<li><strong>损失函数</strong>：对 mel 频谱图和线性频谱图均使用 <span class=\"kb-math kb-math-inline\">\\ell_1</span> 损失，两者权重相等</li>\n</ul>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\|\\hat{y}_{\\text{mel}} - y_{\\text{mel}}\\|_1 + \\|\\hat{y}_{\\text{linear}} - y_{\\text{linear}}\\|_1</div>\n<ul>\n<li><strong>优化器</strong>：Adam，学习率从 0.001 开始，在 500K/1M/2M 步分别衰减至 0.0005/0.0003/0.0001</li>\n<li><strong>批大小</strong>：32，所有序列填充至最大长度</li>\n<li><strong>音频参数</strong>：24 kHz 采样率，50 ms 帧长，12.5 ms 帧移，2048 点 FFT，0.97 预加重</li>\n</ul>\n<div class=\"key-point\">💡 <strong>关键</strong>：训练时不使用 loss mask（即零填充帧也参与损失计算），这是为了让模型学会何时停止输出。使用 loss mask 的模型在推理时不知道何时结束，会在末尾产生重复声音。</div>\n<h5>注意力对齐对比</h5>\n<p><img alt=\"注意力对齐对比\" src=\"https://ar5iv.labs.arxiv.org/html/1703.10135/assets/x3.png\" />\n<em>图 3(a)：Vanilla Seq2Seq + Scheduled Sampling 的注意力对齐——对齐混乱，注意力频繁卡住。</em></p>\n<p><img alt=\"GRU 编码器注意力对齐\" src=\"https://ar5iv.labs.arxiv.org/html/1703.10135/assets/x4.png\" />\n<em>图 3(b)：GRU 编码器的注意力对齐——对齐有噪声，导致发音错误。</em></p>\n<p><img alt=\"Tacotron 注意力对齐\" src=\"https://ar5iv.labs.arxiv.org/html/1703.10135/assets/x5.png\" />\n<em>图 3(c)：Tacotron（CBHG 编码器）的注意力对齐——干净平滑的对角线对齐。</em></p>\n<p>消融实验表明：(1) 普通 Seq2Seq 模型学到的对齐质量很差，注意力容易卡住导致语音不清晰；(2) 用 GRU 替换 CBHG 编码器后对齐变得嘈杂，容易产生发音错误；(3) Tacotron 的 CBHG 编码器能学到干净平滑的注意力对齐。</p>\n<h5>后处理网络效果</h5>\n<p><img alt=\"无后处理网络的频谱图\" src=\"https://ar5iv.labs.arxiv.org/html/1703.10135/assets/x6.png\" />\n<em>图 4(a)：不使用后处理网络时预测的频谱图。</em></p>\n<p><img alt=\"有后处理网络的频谱图\" src=\"https://ar5iv.labs.arxiv.org/html/1703.10135/assets/x7.png\" />\n<em>图 4(b)：使用后处理网络后预测的频谱图——谐波结构更清晰，高频共振峰更完整。</em></p>\n<p>后处理网络利用双向上下文信息，显著改善了预测频谱图中的谐波分辨率（100-400 bin 之间的高次谐波）和高频共振峰结构，从而减少了合成伪影。</p>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>传统 TTS 流水线</th>\n<th>Tacotron</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>输入</td>\n<td>语言学特征（音素、时长等）</td>\n<td>原始字符序列</td>\n</tr>\n<tr>\n<td>模块</td>\n<td>文本前端 + 时长模型 + 声学模型 + 声码器</td>\n<td>单一端到端模型</td>\n</tr>\n<tr>\n<td>训练</td>\n<td>各模块独立训练，误差累积</td>\n<td>端到端联合训练</td>\n</tr>\n<tr>\n<td>特征工程</td>\n<td>大量领域专家知识</td>\n<td>无需手工特征</td>\n</tr>\n<tr>\n<td>生成速度</td>\n<td>取决于声码器</td>\n<td>帧级生成，远快于样本级自回归方法</td>\n</tr>\n<tr>\n<td>MOS</td>\n<td>参数化系统 3.69</td>\n<td><strong>3.82</strong></td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "Tacotron 中每个解码步预测多帧（reduction factor r）的主要好处是什么？",
        "options": [
          "减少模型参数量，降低显存占用",
          "加速注意力对齐的学习，因为相邻帧高度相关无需逐帧关注同一输入",
          "提升 Griffin-Lim 算法的重建质量",
          "使模型能够处理更长的输入文本序列"
        ],
        "answer": 1,
        "explain": "每步预测 r 帧将解码步数减少为 1/r，更重要的是允许注意力在训练早期快速前移，而非被迫在同一输入 token 上停留多步，从而大幅加速对齐学习的收敛。"
      }
    },
    {
      "id": "tacotron2",
      "num": 3,
      "name": "Tacotron 2",
      "fullName": "Tacotron 2: 自然TTS合成 (Natural TTS Synthesis by Conditioning WaveNet on Mel Spectrogram)",
      "year": "2018",
      "org": "Google",
      "parent": "tacotron",
      "paperUrl": "https://arxiv.org/abs/1712.05884",
      "projectUrl": "",
      "category": "tts",
      "motivation": "Mel谱预测+WaveNet声码器",
      "summary": "Tacotron 2 的核心目标是：Mel谱预测+WaveNet声码器。",
      "keyPoints": [
        "核心动机：Mel谱预测+WaveNet声码器",
        "演化来源：继承或改进自 tacotron",
        "代表机构：Google"
      ],
      "detail": "<p>Mel谱预测+WaveNet声码器</p>"
    },
    {
      "id": "fastspeech",
      "num": 4,
      "name": "FastSpeech",
      "fullName": "FastSpeech: 快速鲁棒的TTS (FastSpeech: Fast, Robust and Controllable Text to Speech)",
      "year": "2019",
      "org": "Microsoft",
      "parent": "tacotron2",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2019/hash/f63f65b5870931065885e0afa52ad6a8-Abstract.html",
      "projectUrl": "",
      "category": "tts",
      "motivation": "非自回归并行合成+长度预测器",
      "summary": "FastSpeech 的核心目标是：非自回归并行合成+长度预测器。",
      "keyPoints": [
        "核心动机：非自回归并行合成+长度预测器",
        "演化来源：继承或改进自 tacotron2",
        "代表机构：Microsoft"
      ],
      "detail": "<p>非自回归并行合成+长度预测器</p>"
    },
    {
      "id": "fastspeech2",
      "num": 5,
      "name": "FastSpeech 2",
      "fullName": "FastSpeech 2: 快速高质量TTS (FastSpeech 2: Fast and High-Quality End-to-End Text to Speech)",
      "year": "2020",
      "org": "Microsoft",
      "parent": "fastspeech",
      "paperUrl": "https://arxiv.org/abs/2006.04558",
      "projectUrl": "",
      "category": "tts",
      "motivation": "方差适配器改进韵律建模",
      "summary": "FastSpeech 2 提出直接使用真实语音中提取的时长、音高和能量作为条件输入来训练非自回归 TTS 模型，去除了 FastSpeech 中复杂的教师-学生蒸馏流程，同时提出 FastSpeech 2s 首次实现了文本到波形的完全并行生成，在语音质量和训练速度上均显著优于前作。",
      "keyPoints": [
        "<strong>去除教师-学生蒸馏</strong>：直接使用 ground-truth mel 频谱图训练，避免教师模型蒸馏带来的信息损失和流程复杂性",
        "<strong>方差适配器（Variance Adaptor）</strong>：包含时长预测器、音高预测器和能量预测器三个子模块，显式建模语音中的多种变化信息",
        "<strong>时长预测器</strong>：使用 Montreal Forced Alignment (MFA) 提取的真实音素时长替代教师模型的注意力对齐，精度更高",
        "<strong>音高预测器</strong>：采用连续小波变换（CWT）将连续 F0 分解为多尺度频谱，预测小波系数后通过逆 CWT 重建，更好捕捉音高的时间结构",
        "<strong>能量预测器</strong>：以 STFT 幅度谱的 L2 范数作为能量特征，量化为 256 个等距 bin 后通过 embedding 注入",
        "<strong>FastSpeech 2s</strong>：首次实现文本直接并行生成波形（text-to-waveform），跳过 mel 频谱中间表示",
        "<strong>实验结果</strong>：FastSpeech 2 训练速度为 FastSpeech 的 3 倍，MOS 达 3.83 超越自回归 Transformer TTS（3.86 vs teacher），FastSpeech 2s 推理延迟仅为自回归模型的 1/60"
      ],
      "detail": "<h5>动机与背景</h5>\n<p>FastSpeech（Ren et al., 2019）是非自回归 TTS 的先驱，通过并行生成 mel 频谱图实现了数十倍的推理加速。然而，FastSpeech 存在三个关键问题：</p>\n<ol>\n<li><strong>教师-学生蒸馏流程复杂</strong>：需要先训练一个自回归教师模型（Transformer TTS），从中提取注意力对齐作为时长标签，并用教师生成的 mel 频谱图（而非 ground-truth）作为训练目标，整个流程耗时且繁琐。</li>\n<li><strong>时长提取不准确</strong>：从教师模型注意力中提取的时长存在误差，影响合成语音的韵律。</li>\n<li><strong>信息损失</strong>：教师模型蒸馏的 mel 频谱图是对真实数据分布的简化，丢失了语音中的细节变化信息。</li>\n</ol>\n<div class=\"key-point\">💡 <strong>关键洞察</strong>：TTS 的核心困难在于\"一对多映射\"——同一文本可以对应多种合法的语音表达（不同语速、音高、能量）。FastSpeech 通过知识蒸馏简化输出分布来回避此问题，而 FastSpeech 2 的思路是<strong>显式提供方差信息作为条件</strong>，从根本上缓解一对多映射的歧义。</div>\n<h5>模型整体架构</h5>\n<p><img alt=\"FastSpeech 2 模型架构图\" src=\"https://ar5iv.labs.arxiv.org/html/2006.04558/assets/x1.png\" />\n<em>图 1(a)：FastSpeech 2 整体架构。编码器将音素序列编码为隐藏序列，方差适配器添加时长/音高/能量信息，解码器生成 mel 频谱图。</em></p>\n<p>FastSpeech 2 的整体架构沿用了 FastSpeech 的 Feed-Forward Transformer (FFT) 设计，包含以下核心模块：</p>\n<ul>\n<li><strong>编码器（Encoder）</strong>：由 4 个 FFT Block 组成，每个 Block 包含多头自注意力层和 1D 卷积前馈网络（2 层卷积，kernel size 为 9 和 1），将音素序列编码为隐藏表示 <span class=\"kb-math kb-math-inline\">H_{\\text{pho}}</span>。</li>\n<li><strong>方差适配器（Variance Adaptor）</strong>：核心创新模块，包含时长预测器、音高预测器和能量预测器，将编码器输出扩展为帧级别的隐藏序列，并注入音高和能量信息。</li>\n<li><strong>解码器（Decoder）</strong>：同样由 4 个 FFT Block 组成，将帧级隐藏序列转换为 mel 频谱图。</li>\n<li><strong>线性层</strong>：最终将解码器输出映射到 80 维 mel 频谱图。</li>\n</ul>\n<h5>方差适配器（Variance Adaptor）</h5>\n<p><img alt=\"方差适配器结构\" src=\"https://ar5iv.labs.arxiv.org/html/2006.04558/assets/x2.png\" />\n<em>图 1(b)：方差适配器结构。依次包含时长预测器、音高预测器和能量预测器。</em></p>\n<p><img alt=\"预测器内部结构\" src=\"https://ar5iv.labs.arxiv.org/html/2006.04558/assets/x3.png\" />\n<em>图 1(c)：时长/音高/能量预测器的共享内部结构——2 层 1D 卷积 + ReLU + LayerNorm + Dropout + 线性层。</em></p>\n<p>方差适配器是 FastSpeech 2 的核心创新，它通过三个预测器显式建模语音的方差信息：</p>\n<p><strong>1. 时长预测器（Duration Predictor）</strong></p>\n<p>时长预测器的目标是预测每个音素对应的 mel 帧数。与 FastSpeech 使用教师模型注意力不同，FastSpeech 2 使用 <strong>Montreal Forced Alignment (MFA)</strong> 工具从真实语音-文本对中提取音素级时长标签，精度更高。</p>\n<ul>\n<li>结构：2 层 1D 卷积（kernel size = 3，channels = 256）+ ReLU + LayerNorm + Dropout + 线性投影层</li>\n<li>训练时使用 MFA 提取的 ground-truth 时长，推理时使用预测值</li>\n<li>损失函数采用对数域的 MSE：</li>\n</ul>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{dur}} = \\text{MSE}(\\log \\hat{d}, \\log d)</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\hat{d}</span> 为预测时长，<span class=\"kb-math kb-math-inline\">d</span> 为 ground-truth 时长。使用 Length Regulator 将音素级隐藏序列按时长扩展为帧级序列。</p>\n<p><strong>2. 音高预测器（Pitch Predictor）</strong></p>\n<p>音高（F0）是影响语音韵律的关键因素。FastSpeech 2 将帧级 F0 轮廓作为条件输入，但直接预测逐帧 F0 存在困难——F0 序列包含复杂的时间依赖结构。</p>\n<p><img alt=\"音高预测器细节\" src=\"https://ar5iv.labs.arxiv.org/html/2006.04558/assets/x5.png\" />\n<em>图 2：音高预测器细节。使用 CWT 将 F0 分解为多尺度小波系数，预测后通过 iCWT 重建。</em></p>\n<p>FastSpeech 2 采用<strong>连续小波变换（Continuous Wavelet Transform, CWT）</strong>来分解 F0：</p>\n<div class=\"kb-math kb-math-display\">W(t, s) = \\frac{1}{\\sqrt{s}} \\int f(\\tau) \\psi^*\\left(\\frac{\\tau - t}{s}\\right) d\\tau</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">s</span> 为尺度参数，<span class=\"kb-math kb-math-inline\">\\psi</span> 为母小波函数。具体流程：</p>\n<ol>\n<li>对每个语音样本的帧级 F0 序列进行 CWT 分解，得到 10 个尺度的小波系数 <span class=\"kb-math kb-math-inline\">\\{W_0, W_1, \\ldots, W_9\\}</span></li>\n<li>音高预测器（与时长预测器结构相同）预测这 10 个尺度的小波系数谱</li>\n<li>推理时通过逆 CWT（iCWT）从预测的小波系数重建 F0 轮廓</li>\n<li>将 F0 量化为 256 个 bin，通过 pitch embedding 层转换为向量，加到隐藏序列上</li>\n</ol>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：CWT 的优势在于将 F0 的局部细节和全局趋势分离到不同尺度上，使预测任务更加平滑和可学习，相比直接预测逐帧 F0 效果显著更好。</div>\n<p><strong>3. 能量预测器（Energy Predictor）</strong></p>\n<p>能量反映语音的响度变化。FastSpeech 2 将每帧的能量定义为 STFT 幅度谱的 L2 范数：</p>\n<div class=\"kb-math kb-math-display\">e_t = \\left\\| \\text{STFT}(x)_t \\right\\|_2</div>\n<p>能量处理流程：\n1. 计算每帧的 STFT 幅度谱 L2 范数作为能量值\n2. 将能量值线性量化为 256 个等距 bin\n3. 通过 energy embedding 层将量化后的能量转换为向量，加到隐藏序列上\n4. 能量预测器结构与时长预测器相同，使用 MSE 损失训练</p>\n<h5>训练与推理流程</h5>\n<p><strong>训练损失函数</strong>：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L} = \\mathcal{L}_{\\text{mel}} + \\alpha \\mathcal{L}_{\\text{dur}} + \\beta \\mathcal{L}_{\\text{pitch}} + \\gamma \\mathcal{L}_{\\text{energy}}</div>\n<ul>\n<li><span class=\"kb-math kb-math-inline\">\\mathcal{L}_{\\text{mel}}</span>：mel 频谱图重建的 MSE 损失</li>\n<li><span class=\"kb-math kb-math-inline\">\\mathcal{L}_{\\text{dur}}</span>：对数域时长预测的 MSE 损失</li>\n<li><span class=\"kb-math kb-math-inline\">\\mathcal{L}_{\\text{pitch}}</span>：音高小波系数谱的 MSE 损失</li>\n<li><span class=\"kb-math kb-math-inline\">\\mathcal{L}_{\\text{energy}}</span>：能量预测的 MSE 损失</li>\n</ul>\n<p><strong>训练流程</strong>：\n1. 使用 MFA 预处理所有训练数据，提取音素级时长对齐\n2. 从语音波形中提取帧级 F0（使用 DIO 算法）和能量\n3. 对 F0 进行 CWT 分解得到小波系数谱\n4. 训练时，方差适配器使用 ground-truth 的时长、音高和能量（teacher forcing）\n5. 编码器-解码器端到端优化上述联合损失</p>\n<p><strong>推理流程</strong>：\n1. 编码器编码输入音素序列\n2. 时长预测器预测每个音素的时长，Length Regulator 扩展序列\n3. 音高预测器预测小波系数，iCWT 重建 F0，量化后通过 embedding 注入\n4. 能量预测器预测能量值，量化后通过 embedding 注入\n5. 解码器生成 mel 频谱图，再由外部声码器（如 Parallel WaveGAN）合成波形</p>\n<h5>FastSpeech 2s：文本到波形的并行生成</h5>\n<p><img alt=\"波形解码器\" src=\"https://ar5iv.labs.arxiv.org/html/2006.04558/assets/x4.png\" />\n<em>图 1(d)：FastSpeech 2s 的波形解码器结构。</em></p>\n<p>FastSpeech 2s 在 FastSpeech 2 的基础上，将 mel 解码器替换为<strong>波形解码器</strong>，直接从隐藏序列生成波形，实现完全端到端的推理。波形解码器的设计借鉴了 WaveNet 的膨胀卷积结构：</p>\n<ul>\n<li>使用多组 1D 膨胀卷积层（dilation rate 指数增长：1, 2, 4, ..., 512），共 4 组，每组 10 层</li>\n<li>每层包含门控激活函数（tanh + sigmoid）和残差连接</li>\n<li>最终通过线性层输出波形样本</li>\n</ul>\n<p>由于波形解码器直接生成高维波形（采样率 22050 Hz），训练难度更大。FastSpeech 2s 额外引入了：\n- <strong>mel 频谱图解码器辅助损失</strong>：在训练初期帮助隐藏序列学习有意义的表示\n- <strong>对抗训练损失</strong>：使用判别器区分生成波形和真实波形，提升音质</p>\n<h5>与 FastSpeech 的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>FastSpeech</th>\n<th>FastSpeech 2</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>训练目标</td>\n<td>教师蒸馏的 mel 频谱图</td>\n<td>Ground-truth mel 频谱图</td>\n</tr>\n<tr>\n<td>时长来源</td>\n<td>教师模型注意力对齐</td>\n<td>MFA 强制对齐</td>\n</tr>\n<tr>\n<td>方差信息</td>\n<td>仅时长</td>\n<td>时长 + 音高 + 能量</td>\n</tr>\n<tr>\n<td>音高建模</td>\n<td>无</td>\n<td>CWT 分解 + 小波系数预测</td>\n</tr>\n<tr>\n<td>能量建模</td>\n<td>无</td>\n<td>STFT L2 范数 + 量化 embedding</td>\n</tr>\n<tr>\n<td>端到端波形</td>\n<td>不支持</td>\n<td>FastSpeech 2s 支持</td>\n</tr>\n<tr>\n<td>训练速度</td>\n<td>1×</td>\n<td>3×</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>核心创新总结</strong>：FastSpeech 2 的本质思想是——与其通过知识蒸馏\"简化\"输出分布来回避一对多映射问题，不如<strong>显式提供缺失的条件信息</strong>（音高、能量、精确时长），让模型在给定这些条件后面对的是一个近似一对一的映射，从而可以直接在 ground-truth 数据上训练。</div>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># FastSpeech 2 训练伪代码\ndef fastspeech2_train(phonemes, mel_gt, duration_gt, f0_gt, energy_gt):\n    # 编码器\n    h_pho = encoder(phonemes)  # [B, T_pho, D]\n\n    # 方差适配器（训练时使用 ground-truth）\n    # 1. 时长：使用 GT 时长扩展序列\n    dur_pred = duration_predictor(h_pho)  # [B, T_pho]\n    h_frame = length_regulator(h_pho, duration_gt)  # [B, T_mel, D]\n\n    # 2. 音高：CWT 分解 + 预测小波系数\n    cwt_spec_gt = CWT(f0_gt)  # [B, T_mel, 10]\n    cwt_spec_pred = pitch_predictor(h_frame)  # [B, T_mel, 10]\n    pitch_emb = pitch_embedding(quantize(f0_gt, 256))\n    h_frame = h_frame + pitch_emb\n\n    # 3. 能量：量化 + embedding\n    energy_pred = energy_predictor(h_frame)  # [B, T_mel]\n    energy_emb = energy_embedding(quantize(energy_gt, 256))\n    h_frame = h_frame + energy_emb\n\n    # 解码器\n    mel_pred = decoder(h_frame)  # [B, T_mel, 80]\n\n    # 损失计算\n    loss = MSE(mel_pred, mel_gt) + MSE(log(dur_pred), log(duration_gt)) \\\n         + MSE(cwt_spec_pred, cwt_spec_gt) + MSE(energy_pred, energy_gt)\n    return loss\n</code></pre>\n<pre><code class=\"language-python\"># FastSpeech 2 推理伪代码\ndef fastspeech2_inference(phonemes):\n    h_pho = encoder(phonemes)\n\n    # 使用预测值\n    dur_pred = duration_predictor(h_pho)\n    h_frame = length_regulator(h_pho, round(dur_pred))\n\n    cwt_spec = pitch_predictor(h_frame)\n    f0_pred = iCWT(cwt_spec)  # 逆小波变换重建 F0\n    h_frame = h_frame + pitch_embedding(quantize(f0_pred, 256))\n\n    energy_pred = energy_predictor(h_frame)\n    h_frame = h_frame + energy_embedding(quantize(energy_pred, 256))\n\n    mel_pred = decoder(h_frame)\n    waveform = vocoder(mel_pred)  # 外部声码器\n    return waveform\n</code></pre>",
      "quiz": {
        "q": "FastSpeech 2 中音高预测器使用连续小波变换（CWT）的主要原因是什么？",
        "options": [
          "减少模型参数量，降低计算开销",
          "将 F0 的多尺度时间结构分解为更平滑的小波系数，使预测更容易",
          "将连续的 F0 值转换为离散类别，简化分类任务",
          "利用小波变换的压缩特性减少序列长度"
        ],
        "answer": 1,
        "explain": "CWT 将 F0 序列分解为不同尺度的小波系数，分离了局部细节和全局趋势，使得预测目标更加平滑和结构化，相比直接预测逐帧 F0 值更容易学习。"
      }
    },
    {
      "id": "hifigan",
      "num": 6,
      "name": "HiFi-GAN",
      "fullName": "HiFi-GAN: 高保真语音合成GAN (HiFi-GAN: Generative Adversarial Networks for Efficient and High Fidelity Speech Synthesis)",
      "year": "2020",
      "org": "Kakao",
      "parent": "—",
      "paperUrl": "https://proceedings.neurips.cc/paper_files/paper/2020/hash/c5d736809766d46260d816d8dbc9eb44-Abstract.html",
      "projectUrl": "",
      "category": "vocoder",
      "motivation": "MSD+MPD多尺度判别器声码器",
      "summary": "HiFi-GAN 提出了多周期判别器（MPD）和多尺度判别器（MSD）的双判别器架构，配合生成器中的多感受野融合（MRF）模块，实现了兼具高保真度与高效率的神经网络声码器，在单 V100 GPU 上以 167.9 倍实时速度合成接近人类质量的 22.05 kHz 语音。",
      "keyPoints": [
        "<strong>双判别器架构</strong>：同时使用多周期判别器（MPD）和多尺度判别器（MSD），分别捕获音频的周期性模式和连续性模式",
        "<strong>多周期判别器（MPD）</strong>：由 5 个子判别器组成，分别以素数周期 <span class=\"kb-math kb-math-inline\">[2, 3, 5, 7, 11]</span> 对 1D 波形重塑为 2D 后用 2D 卷积判别，捕获不同周期的隐式结构",
        "<strong>多尺度判别器（MSD）</strong>：沿用 MelGAN 架构，3 个子判别器分别在原始音频、×2 和 ×4 平均池化音频上操作，捕获长程依赖",
        "<strong>多感受野融合（MRF）模块</strong>：生成器中每个转置卷积后接 MRF 模块，并行使用不同核大小和膨胀率的残差块，融合多尺度特征",
        "<strong>三重损失函数</strong>：LSGAN 对抗损失 + 特征匹配损失（<span class=\"kb-math kb-math-inline\">\\lambda_{fm}=2</span>）+ Mel 频谱图 L1 损失（<span class=\"kb-math kb-math-inline\">\\lambda_{mel}=45</span>）",
        "<strong>三种模型配置</strong>：V1（最大/最高质量）、V2（中等）、V3（最小，仅 0.92M 参数），在质量与效率间灵活权衡",
        "<strong>泛化能力</strong>：在未见说话人的 mel 频谱图反演和端到端语音合成中均表现出良好的泛化性"
      ],
      "detail": "<h5>核心架构总览</h5>\n<p><img alt=\"HiFi-GAN 生成器架构\" src=\"https://ar5iv.labs.arxiv.org/html/2010.05646/assets/x1.png\" />\n<em>图 1：HiFi-GAN 生成器架构。生成器通过转置卷积将 mel 频谱图逐步上采样至原始波形的时间分辨率，每个转置卷积后接一个 MRF 模块。MRF 模块将多个不同核大小和膨胀率的残差块输出相加。</em></p>\n<p><img alt=\"HiFi-GAN 判别器架构\" src=\"https://ar5iv.labs.arxiv.org/html/2010.05646/assets/x2.png\" />\n<em>图 2：(a) MSD 的第二个子判别器；(b) MPD 中周期为 3 的子判别器。MPD 将 1D 音频重塑为 2D 数据后使用 2D 卷积处理。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># HiFi-GAN 训练伪代码\n# 初始化: Generator G, MPD D_mpd (5个子判别器), MSD D_msd (3个子判别器)\n\nfor epoch in range(num_epochs):\n    for mel_spec, ground_truth_audio in dataloader:\n        # ---- 生成器前向 ----\n        fake_audio = G(mel_spec)  # mel → 转置卷积上采样 + MRF → 波形\n\n        # ---- 判别器训练 ----\n        # MPD: 对每个周期 p ∈ [2,3,5,7,11]\n        for p, D_p in zip([2,3,5,7,11], D_mpd):\n            real_2d = reshape(ground_truth_audio, period=p)  # [B,1,T] → [B,1,T/p,p]\n            fake_2d = reshape(fake_audio, period=p)\n            loss_D_p = (D_p(real_2d) - 1)^2 + D_p(fake_2d)^2  # LSGAN\n\n        # MSD: 对每个尺度 s ∈ [1x, 2x_pool, 4x_pool]\n        for s, D_s in zip(scales, D_msd):\n            real_s = avg_pool(ground_truth_audio, factor=s)\n            fake_s = avg_pool(fake_audio, factor=s)\n            loss_D_s = (D_s(real_s) - 1)^2 + D_s(fake_s)^2\n\n        loss_D = sum(loss_D_p) + sum(loss_D_s)\n        optimizer_D.step(loss_D)\n\n        # ---- 生成器训练 ----\n        loss_adv = sum((D_p(fake) - 1)^2) + sum((D_s(fake) - 1)^2)\n        loss_fm  = sum(L1(D_i_features(real), D_i_features(fake)))  # 各层特征匹配\n        loss_mel = L1(mel_transform(fake_audio), mel_spec)\n        loss_G = loss_adv + 2 * loss_fm + 45 * loss_mel\n        optimizer_G.step(loss_G)\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统神经网络声码器面临<strong>质量与效率的两难困境</strong>：</p>\n<ul>\n<li><strong>自回归模型</strong>（WaveNet）：逐样本生成，质量高但速度极慢（每次前向仅产生一个采样点）</li>\n<li><strong>基于流的模型</strong>（WaveGlow）：并行生成速度快，但需要超过 90 层的深层架构，参数量巨大</li>\n<li><strong>早期 GAN 模型</strong>（MelGAN、Parallel WaveGAN）：效率高、参数少，但音频质量与自回归/流模型仍有差距</li>\n</ul>\n<p>HiFi-GAN 的核心洞察是：<strong>语音信号由多种周期的正弦信号叠加而成，建模这些周期性模式是生成高保真音频的关键</strong>。此前的 GAN 声码器未充分利用这一先验知识。</p>\n<h5>生成器：转置卷积 + 多感受野融合（MRF）</h5>\n<p>生成器是一个全卷积网络，输入 mel 频谱图（80 维），通过多级转置卷积逐步上采样至原始波形的时间分辨率（256 倍上采样率，对应 hop size）。</p>\n<p><strong>MRF 模块</strong>是生成器的核心创新。每个转置卷积层后接一个 MRF 模块，其结构为：</p>\n<div class=\"kb-math kb-math-display\">\\text{MRF}(x) = \\sum_{n=1}^{|k_r|} \\text{ResBlock}_{n}(x)</div>\n<p>其中每个残差块使用不同的核大小 <span class=\"kb-math kb-math-inline\">k_r[n]</span> 和膨胀率序列 <span class=\"kb-math kb-math-inline\">D_r[n]</span>，形成不同的感受野模式。这种设计让网络能<strong>并行观察不同时间尺度的模式</strong>——短核捕获局部细节（如音素边界），长核捕获全局结构（如基频包络）。</p>\n<div class=\"key-point\">💡 <strong>关键直觉</strong>：MRF 的\"求和融合\"而非\"拼接\"设计，使得不同感受野的特征在同一表示空间中直接叠加，避免了通道维度膨胀，同时保持了计算效率。</div>\n<p>生成器提供了可调参数：隐藏维度 <span class=\"kb-math kb-math-inline\">h_u</span>、转置卷积核大小 <span class=\"kb-math kb-math-inline\">k_u</span>、残差块核大小 <span class=\"kb-math kb-math-inline\">k_r</span> 和膨胀率 <span class=\"kb-math kb-math-inline\">D_r</span>，从而支持三种配置（V1/V2/V3）在质量与效率间灵活权衡。</p>\n<h5>多周期判别器（MPD）：捕获周期性模式</h5>\n<p>MPD 是 HiFi-GAN 最核心的创新。它由 5 个子判别器组成，每个子判别器仅处理输入音频中<strong>等间隔采样</strong>的部分，间隔即为周期 <span class=\"kb-math kb-math-inline\">p</span>。</p>\n<p><strong>工作原理</strong>：\n1. 将 1D 音频信号（长度 <span class=\"kb-math kb-math-inline\">T</span>）重塑为 2D 数据（高度 <span class=\"kb-math kb-math-inline\">T/p</span>，宽度 <span class=\"kb-math kb-math-inline\">p</span>）\n2. 对 2D 数据施加 2D 卷积，且<strong>宽度方向核大小限制为 1</strong>，确保不同周期位置的样本独立处理\n3. 使用步长卷积 + LeakyReLU 堆叠，逐层提取特征</p>\n<p><strong>周期选择为素数 <span class=\"kb-math kb-math-inline\">[2, 3, 5, 7, 11]</span></strong>，这是为了<strong>最大程度减少不同子判别器之间的采样重叠</strong>。例如，周期 2 和周期 3 的子判别器观察的样本子集几乎不重合，从而确保每个子判别器学习到独特的周期性模式。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：通过重塑（reshape）而非直接下采样来提取周期信号，使得 MPD 的梯度可以传递到输入音频的<strong>所有时间步</strong>，避免了信息丢失。</div>\n<p>权重归一化（Weight Normalization）应用于 MPD 的所有子判别器。</p>\n<h5>多尺度判别器（MSD）：捕获连续性模式</h5>\n<p>由于 MPD 的每个子判别器仅处理<strong>不相交的采样子集</strong>，它可能遗漏相邻样本之间的连续性模式。MSD 正是为了弥补这一不足。</p>\n<p>MSD 沿用 MelGAN 的设计，包含 3 个子判别器，分别在不同尺度上操作：\n- 子判别器 1：原始波形（应用谱归一化而非权重归一化，以稳定训练）\n- 子判别器 2：×2 平均池化后的波形\n- 子判别器 3：×4 平均池化后的波形</p>\n<p>每个子判别器是步长卷积 + 分组卷积 + LeakyReLU 的堆叠。</p>\n<div class=\"key-point\">💡 <strong>MPD 与 MSD 的互补关系</strong>：MPD 在原始波形上操作，关注离散的周期性模式；MSD 在平滑后的波形上操作，关注连续的时间依赖。两者结合，全面覆盖了语音信号的频率和时间特征。</div>\n<h5>损失函数设计</h5>\n<p>HiFi-GAN 的训练使用三个损失函数的组合：</p>\n<p><strong>1. LSGAN 对抗损失</strong></p>\n<p>采用最小二乘 GAN（LSGAN）替代原始 GAN 的二元交叉熵，提供非消失梯度流：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{Adv}(D;G) = \\mathbb{E}_{(x,s)}\\Big[(D(x)-1)^2 + (D(G(s)))^2\\Big]</div>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{Adv}(G;D) = \\mathbb{E}_{s}\\Big[(D(G(s))-1)^2\\Big]</div>\n<p><strong>2. Mel 频谱图损失</strong></p>\n<p>生成波形与真实波形的 mel 频谱图之间的 L1 距离，既加速训练收敛，又聚焦于人耳感知质量：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{Mel}(G) = \\mathbb{E}_{(x,s)}\\Big[||\\phi(x) - \\phi(G(s))||_1\\Big]</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\phi</span> 为 mel 频谱图变换函数。</p>\n<p><strong>3. 特征匹配损失</strong></p>\n<p>提取判别器每一中间层的特征，计算真实样本与生成样本在各层特征空间中的 L1 距离：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{FM}(G;D) = \\mathbb{E}_{(x,s)}\\Big[\\sum_{i=1}^{T}\\frac{1}{N_i}||D^i(x) - D^i(G(s))||_1\\Big]</div>\n<p><strong>最终损失</strong>：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_G = \\mathcal{L}_{Adv}(G;D) + 2\\,\\mathcal{L}_{FM}(G;D) + 45\\,\\mathcal{L}_{Mel}(G)</div>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_D = \\mathcal{L}_{Adv}(D;G)</div>\n<div class=\"key-point\">💡 <strong>Mel 损失权重高达 45</strong>，远大于特征匹配损失权重 2，说明在训练早期 mel 频谱图重建是主导信号，确保生成器首先学会正确的频谱结构，再通过对抗训练精炼细节。</div>\n<h5>与传统方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>类型</th>\n<th>质量 (MOS)</th>\n<th>速度</th>\n<th>参数量</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>WaveNet</td>\n<td>自回归</td>\n<td>高</td>\n<td>极慢（逐样本）</td>\n<td>中等</td>\n</tr>\n<tr>\n<td>WaveGlow</td>\n<td>基于流</td>\n<td>高</td>\n<td>快</td>\n<td>巨大（&gt;90层）</td>\n</tr>\n<tr>\n<td>MelGAN</td>\n<td>GAN</td>\n<td>中等</td>\n<td>极快（CPU实时）</td>\n<td>小</td>\n</tr>\n<tr>\n<td>HiFi-GAN V1</td>\n<td>GAN</td>\n<td><strong>最高</strong>（≈人类）</td>\n<td>167.9× 实时 (V100)</td>\n<td>13.92M</td>\n</tr>\n<tr>\n<td>HiFi-GAN V3</td>\n<td>GAN</td>\n<td>高</td>\n<td>13.4× 实时 (CPU)</td>\n<td><strong>0.92M</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>HiFi-GAN 的核心突破在于：<strong>首次在 GAN 声码器中达到甚至超越自回归和流模型的音频质量，同时保持了 GAN 的高效率优势</strong>。这主要归功于 MPD 对周期性模式的精确建模能力。</p>",
      "quiz": {
        "q": "HiFi-GAN 的多周期判别器（MPD）选择周期为 [2, 3, 5, 7, 11] 的主要原因是什么？",
        "options": [
          "这些数字对应语音中最常见的基频周期",
          "素数周期使不同子判别器的采样子集重叠最小化",
          "这些周期恰好覆盖了 mel 频谱图的 80 个频带",
          "素数分解可以加速 FFT 计算"
        ],
        "answer": 1,
        "explain": "选择素数作为周期是为了最大程度减少不同子判别器之间采样位置的重叠，确保每个子判别器观察到尽可能独特的周期性模式，从而提升判别器整体的覆盖能力。"
      }
    },
    {
      "id": "vits",
      "num": 7,
      "name": "VITS",
      "fullName": "VITS: 条件变分自编码器端到端TTS (Conditional Variational Autoencoder with Adversarial Learning for End-to-End TTS)",
      "year": "2021",
      "org": "Kakao",
      "parent": "fastspeech2",
      "paperUrl": "https://proceedings.mlr.press/v139/kim21f.html",
      "projectUrl": "",
      "category": "tts",
      "motivation": "VAE+Flow+GAN端到端合成",
      "summary": "VITS 的核心目标是：VAE+Flow+GAN端到端合成。",
      "keyPoints": [
        "核心动机：VAE+Flow+GAN端到端合成",
        "演化来源：继承或改进自 fastspeech2",
        "代表机构：Kakao"
      ],
      "detail": "<p>VAE+Flow+GAN端到端合成</p>"
    },
    {
      "id": "soundstream",
      "num": 8,
      "name": "SoundStream",
      "fullName": "SoundStream: 端到端神经音频编解码器 (SoundStream: An End-to-End Neural Audio Codec)",
      "year": "2021",
      "org": "Google",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2107.03312",
      "projectUrl": "",
      "category": "neural_codec",
      "motivation": "RVQ神经音频编码框架",
      "summary": "SoundStream 的核心目标是：RVQ神经音频编码框架。",
      "keyPoints": [
        "核心动机：RVQ神经音频编码框架",
        "代表机构：Google"
      ],
      "detail": "<p>RVQ神经音频编码框架</p>"
    },
    {
      "id": "bigvgan",
      "num": 9,
      "name": "BigVGAN",
      "fullName": "BigVGAN: 通用神经声码器 (BigVGAN: A Universal Neural Vocoder with Large-Scale Training)",
      "year": "2022",
      "org": "NVIDIA",
      "parent": "hifigan",
      "paperUrl": "https://arxiv.org/abs/2206.04658",
      "projectUrl": "",
      "category": "vocoder",
      "motivation": "Snake激活大规模通用声码器",
      "summary": "BigVGAN 的核心目标是：Snake激活大规模通用声码器。",
      "keyPoints": [
        "核心动机：Snake激活大规模通用声码器",
        "演化来源：继承或改进自 hifigan",
        "代表机构：NVIDIA"
      ],
      "detail": "<p>Snake激活大规模通用声码器</p>"
    },
    {
      "id": "encodec",
      "num": 10,
      "name": "EnCodec",
      "fullName": "EnCodec: 高保真神经音频压缩 (High Fidelity Neural Audio Compression)",
      "year": "2022",
      "org": "Meta",
      "parent": "soundstream",
      "paperUrl": "https://arxiv.org/abs/2210.13438",
      "projectUrl": "",
      "category": "neural_codec",
      "motivation": "高效音频压缩与Token化",
      "summary": "EnCodec 提出了一种基于编码器-解码器架构 + 残差向量量化（RVQ）+ 语言模型熵编码的实时流式神经音频编解码器，在 1.5~24 kbps 的极低比特率下实现了超越传统编解码器（Opus、EVS）和同期神经编解码器（Lyra-v2）的音频压缩质量，同时引入了多尺度 STFT 判别器和梯度级别的损失平衡器两项关键技术创新。",
      "keyPoints": [
        "<strong>端到端编码器-解码器架构</strong>：采用 SEANet 骨干的全卷积 Encoder-Decoder 结构，通过 4 层步幅卷积（stride=2,4,5,8）实现 320× 时间降采样，将 24kHz 音频压缩至 75 帧/秒的潜在表示",
        "<strong>残差向量量化（RVQ）</strong>：使用级联多层码本（每层 1024 个码字 = 10 bits），通过选择不同数量的量化层（<span class=\"kb-math kb-math-inline\">N_q = 2 \\sim 32</span>）实现可变比特率（1.5/3/6/12/24 kbps），单一模型支持多带宽",
        "<strong>语言模型熵编码</strong>：训练小型 Transformer 语言模型估计离散编码的概率分布，结合 range coder 实现无损熵编码，进一步压缩带宽约 25-40%",
        "<strong>多尺度 STFT 判别器（MS-STFTD）</strong>：基于复数 STFT 的多尺度判别器，替代传统 MSD+MPD 组合，在更少参数下达到同等或更优感知质量",
        "<strong>损失平衡器（Loss Balancer）</strong>：梯度级别的损失平衡机制，通过控制每个损失项对总梯度的贡献比例（而非简单加权标量损失），稳定多目标训练",
        "<strong>流式与非流式双模式</strong>：流式模式使用因果卷积，单帧延迟仅 13.3ms，支持单核 CPU 实时编解码",
        "<strong>双采样率配置</strong>：支持 24kHz 单声道（1.5-24 kbps）和 48kHz 立体声（3-24 kbps）两种配置"
      ],
      "detail": "<h5>核心架构总览</h5>\n<p><img alt=\"EnCodec 整体架构\" src=\"https://ar5iv.labs.arxiv.org/html/2210.13438/assets/x1.png\" />\n<em>图 1：EnCodec 整体架构。编码器将输入波形压缩为离散 token 序列，解码器从 token 重建波形。训练时使用重建损失、对抗损失（通过判别器）和 RVQ 承诺损失联合优化。推理时可选地使用语言模型进行熵编码以进一步压缩比特率。</em></p>\n<p><img alt=\"MS-STFT 判别器架构\" src=\"https://ar5iv.labs.arxiv.org/html/2210.13438/assets/x2.png\" />\n<em>图 2：多尺度 STFT 判别器架构。输入为复数 STFT（实部 + 虚部 = 2 通道），使用 2D 卷积网络处理。多个判别器使用不同的 STFT 窗口大小（分辨率），捕获不同时频尺度的特征。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># EnCodec 编码-量化-解码流程\n# 初始化: Encoder E, Decoder D, RVQ with N_q codebooks, LM (optional)\n\n# === 编码 ===\nz = E(waveform)                    # [B, D, T/320] 连续潜在表示\n\n# === 残差向量量化 ===\nresidual = z\ncodes = []\nz_hat = 0\nfor j in range(N_q):               # N_q 层级联码本\n    c_j = nearest_neighbor(residual, codebook_j)  # 最近邻查找\n    codes.append(index_of(c_j))    # 存储码本索引 (10 bits each)\n    z_hat += c_j                   # 累加量化结果\n    residual = residual - c_j      # 更新残差\n\n# === 可选: 语言模型熵编码 ===\nprobs = LM(codes)                  # Transformer 预测概率分布\ncompressed = range_encode(codes, probs)  # 无损熵编码, 节省 25-40%\n\n# === 解码 ===\nx_hat = D(z_hat)                   # 从量化表示重建波形\n\n# === 训练损失 ===\nL_t = ||x - x_hat||_1                              # 时域 L1\nL_f = multi_scale_mel_loss(x, x_hat)               # 多尺度 Mel 频谱\nL_g = adversarial_loss(D_k(x_hat))                  # 对抗损失\nL_feat = feature_matching_loss(D_k(x), D_k(x_hat))  # 特征匹配\nL_w = sum(||z_j - sg(c_j)||^2)                      # RVQ 承诺损失\nL_total = balancer(L_t, L_f, L_g, L_feat, L_w)      # 梯度平衡\n</code></pre>\n<h5>编码器-解码器架构</h5>\n<p>EnCodec 的编码器和解码器基于 SEANet 架构，采用全卷积设计：</p>\n<p><strong>编码器</strong>由以下组件顺序构成：\n1. 初始 1D 卷积（kernel=7），将单通道音频映射至 <span class=\"kb-math kb-math-inline\">C=32</span> 通道（48kHz 模型 <span class=\"kb-math kb-math-inline\">C=64</span>）\n2. 4 个编码块（EncoderBlock），每个包含：\n   - 3 个残差单元：膨胀卷积（dilation=1,3,9）+ 1×1 卷积 + skip connection\n   - 步幅下采样卷积（kernel = 2×stride），步幅依次为 2, 4, 5, 8\n   - 通道数逐层翻倍：<span class=\"kb-math kb-math-inline\">32 \\to 64 \\to 128 \\to 256 \\to 512</span>\n3. 2 层 LSTM 用于序列建模\n4. 最终 1D 卷积（kernel=7），输出 <span class=\"kb-math kb-math-inline\">D=128</span> 维潜在表示</p>\n<p>总下采样率 = <span class=\"kb-math kb-math-inline\">2 \\times 4 \\times 5 \\times 8 = 320</span>，24kHz 输入产生 75 帧/秒的潜在表示。</p>\n<p><strong>解码器</strong>镜像编码器结构，使用转置卷积进行上采样。所有卷积使用权重归一化（Weight Normalization）。</p>\n<div class=\"key-point\">💡 <strong>流式 vs 非流式</strong>：流式模式将所有 padding 放在时间步之前（因果卷积），单帧延迟 = 320/24000 = 13.3ms；非流式模式使用双向 padding + 左右各 1 秒 overlap-add 拼接。</div>\n<h5>残差向量量化（RVQ）</h5>\n<p>RVQ 是 EnCodec 实现极低比特率的关键。其核心思想是用多层小码本级联逼近连续向量：</p>\n<div class=\"kb-math kb-math-display\">\\hat{\\mathbf{z}} = \\sum_{j=1}^{N_q} \\mathbf{c}_j, \\quad \\mathbf{c}_j = \\text{Quantize}_j\\left(\\mathbf{z} - \\sum_{k=1}^{j-1} \\mathbf{c}_k\\right)</div>\n<p>每层量化前一层的残差，逐步细化表示精度。比特率由码本数 <span class=\"kb-math kb-math-inline\">N_q</span> 决定：</p>\n<div class=\"kb-math kb-math-display\">\\text{Bandwidth} = \\frac{f_s}{S} \\times N_q \\times \\log_2(K) = 75 \\times N_q \\times 10 \\text{ bits/s}</div>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th style=\"text-align: center;\">目标带宽 (kbps)</th>\n<th style=\"text-align: center;\">码本数 <span class=\"kb-math kb-math-inline\">N_q</span></th>\n<th style=\"text-align: center;\">每秒 token 数</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style=\"text-align: center;\">1.5</td>\n<td style=\"text-align: center;\">2</td>\n<td style=\"text-align: center;\">150</td>\n</tr>\n<tr>\n<td style=\"text-align: center;\">3.0</td>\n<td style=\"text-align: center;\">4</td>\n<td style=\"text-align: center;\">300</td>\n</tr>\n<tr>\n<td style=\"text-align: center;\">6.0</td>\n<td style=\"text-align: center;\">8</td>\n<td style=\"text-align: center;\">600</td>\n</tr>\n<tr>\n<td style=\"text-align: center;\">12.0</td>\n<td style=\"text-align: center;\">16</td>\n<td style=\"text-align: center;\">1200</td>\n</tr>\n<tr>\n<td style=\"text-align: center;\">24.0</td>\n<td style=\"text-align: center;\">32</td>\n<td style=\"text-align: center;\">2400</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>为什么不用单层 VQ？</strong> 要达到 30 bits/frame 的精度，单层 VQ 需要 <span class=\"kb-math kb-math-inline\">2^{30} \\approx 10^9</span> 个码字，存储和最近邻搜索均不可行。RVQ 用 3 层 1024 码字的码本即可达到等效精度。</div>\n<p><strong>训练技巧</strong>：码本使用指数移动平均（EMA）更新（衰减率 0.99）；当码字使用率低于阈值 2 时，从当前 batch 重新初始化（codebook restart）；训练时随机选择 <span class=\"kb-math kb-math-inline\">N_q</span>，实现单模型多比特率。</p>\n<h5>语言模型熵编码</h5>\n<p>RVQ 产生的离散 token 之间存在统计冗余。EnCodec 训练一个小型 Transformer 语言模型来利用这种冗余：</p>\n<ul>\n<li><strong>架构</strong>：5 层 Transformer，8 头注意力，隐藏维度 200，前馈维度 800</li>\n<li><strong>建模方式</strong>：自回归预测每个时间步所有 <span class=\"kb-math kb-math-inline\">N_q</span> 个码本的联合分布</li>\n<li><strong>压缩流程</strong>：LM 输出概率分布 → range arithmetic coder → 无损压缩</li>\n<li><strong>压缩效果</strong>：低比特率（1.5-3 kbps）可压缩 25-40%，高比特率压缩比降低（受限于小模型容量）</li>\n</ul>\n<p>例如，3 kbps 的 EnCodec 配合语言模型熵编码可压缩至约 1.9 kbps，且不损失任何质量。</p>\n<h5>多尺度 STFT 判别器（MS-STFTD）</h5>\n<p>论文提出的 MS-STFTD 是对传统 MSD+MPD 组合的简洁替代：</p>\n<ul>\n<li><strong>输入</strong>：复数 STFT 的实部和虚部拼接为 2 通道输入</li>\n<li><strong>窗口大小集合</strong>：<span class=\"kb-math kb-math-inline\">\\{2^i \\mid i = 5, 6, \\ldots, 11\\}</span>，即从 32 到 2048</li>\n<li><strong>每个尺度</strong>使用独立的 2D 卷积判别器</li>\n<li>小窗口捕获高时间分辨率特征，大窗口捕获高频率分辨率特征</li>\n</ul>\n<div class=\"warn-box\">⚠️ <strong>消融实验关键发现</strong>：单独使用 MS-STFTD 即可达到 MSD+MPD 组合的效果，且参数更少。添加 MPD 仅带来边际提升。</div>\n<h5>训练目标与损失平衡器</h5>\n<p>总损失函数由五部分组成：</p>\n<p><strong>(a) 时域重建损失：</strong>\n<div class=\"kb-math kb-math-display\">\\ell_t(\\mathbf{x}, \\hat{\\mathbf{x}}) = \\|\\mathbf{x} - \\hat{\\mathbf{x}}\\|_1</div></p>\n<p><strong>(b) 频域重建损失（多尺度 Mel 谱）：</strong>\n<div class=\"kb-math kb-math-display\">\\ell_f(\\mathbf{x}, \\hat{\\mathbf{x}}) = \\frac{1}{|\\alpha| \\cdot |s|} \\sum_{\\alpha_i \\in \\alpha} \\sum_{i \\in e} \\left(\\|\\mathcal{S}_i(\\mathbf{x}) - \\mathcal{S}_i(\\hat{\\mathbf{x}})\\|_1 + \\alpha_i \\|\\mathcal{S}_i(\\mathbf{x}) - \\mathcal{S}_i(\\hat{\\mathbf{x}})\\|_2\\right)</div></p>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\mathcal{S}_i</span> 是 64-bin Mel 频谱图，窗口大小 <span class=\"kb-math kb-math-inline\">2^i</span>，<span class=\"kb-math kb-math-inline\">i \\in \\{5, \\ldots, 11\\}</span>，<span class=\"kb-math kb-math-inline\">\\alpha_i \\in \\{0.1, \\ldots, 2\\}</span>。</p>\n<p><strong>(c) 对抗损失（Hinge Loss）：</strong>\n<div class=\"kb-math kb-math-display\">\\ell_g(\\hat{\\mathbf{x}}) = \\frac{1}{K} \\sum_k \\max(0, 1 - D_k(\\hat{\\mathbf{x}}))</div></p>\n<p><strong>(d) 特征匹配损失：</strong>\n<div class=\"kb-math kb-math-display\">\\ell_{\\text{feat}}(\\mathbf{x}, \\hat{\\mathbf{x}}) = \\frac{1}{KL} \\sum_{k,l} \\frac{\\|D_k^l(\\mathbf{x}) - D_k^l(\\hat{\\mathbf{x}})\\|_1}{\\text{mean}(|D_k^l(\\mathbf{x})|)}</div></p>\n<p><strong>(e) RVQ 承诺损失：</strong>\n<div class=\"kb-math kb-math-display\">\\ell_w = \\sum_{j=1}^{N_q} \\|\\mathbf{z}_j - \\text{sg}[\\mathbf{c}_j]\\|_2^2</div></p>\n<p><strong>损失平衡器（Loss Balancer）</strong> 是本文的重要贡献。传统方法通过标量权重 <span class=\"kb-math kb-math-inline\">\\lambda_i</span> 加权各损失项，但不同损失的梯度量级差异可达数个数量级。Loss Balancer 直接在梯度空间操作：</p>\n<ol>\n<li>定义每个损失项 <span class=\"kb-math kb-math-inline\">\\ell_i</span> 对总梯度的目标贡献比例 <span class=\"kb-math kb-math-inline\">\\tilde{\\lambda}_i</span>（<span class=\"kb-math kb-math-inline\">\\sum_i \\tilde{\\lambda}_i = 1</span>）</li>\n<li>计算每个损失对编码器最后一层参数的梯度范数 <span class=\"kb-math kb-math-inline\">\\|g_i\\|</span></li>\n<li>动态调整权重：<span class=\"kb-math kb-math-inline\">\\hat{\\lambda}_i = \\tilde{\\lambda}_i / (\\|g_i\\| + \\epsilon)</span></li>\n<li>使用 EMA 平滑梯度范数估计，避免训练不稳定</li>\n</ol>\n<div class=\"key-point\">💡 <strong>核心优势</strong>：将超参数从\"调损失权重\"简化为\"设定贡献比例\"，显著稳定训练过程。</div>\n<h5>实验结果</h5>\n<p>EnCodec 在主观评测（MUSHRA）中展现了显著优势：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th style=\"text-align: left;\">方法</th>\n<th style=\"text-align: center;\">带宽 (kbps)</th>\n<th style=\"text-align: center;\">MUSHRA ↑</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style=\"text-align: left;\">Opus</td>\n<td style=\"text-align: center;\">6</td>\n<td style=\"text-align: center;\">~65</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">Opus</td>\n<td style=\"text-align: center;\">12</td>\n<td style=\"text-align: center;\">~72</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">EVS</td>\n<td style=\"text-align: center;\">9.6</td>\n<td style=\"text-align: center;\">~68</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\">Lyra-v2</td>\n<td style=\"text-align: center;\">6</td>\n<td style=\"text-align: center;\">~70</td>\n</tr>\n<tr>\n<td style=\"text-align: left;\"><strong>EnCodec</strong></td>\n<td style=\"text-align: center;\"><strong>3</strong></td>\n<td style=\"text-align: center;\"><strong>~74</strong></td>\n</tr>\n<tr>\n<td style=\"text-align: left;\"><strong>EnCodec</strong></td>\n<td style=\"text-align: center;\"><strong>6</strong></td>\n<td style=\"text-align: center;\"><strong>~78</strong></td>\n</tr>\n<tr>\n<td style=\"text-align: left;\"><strong>EnCodec</strong></td>\n<td style=\"text-align: center;\"><strong>12</strong></td>\n<td style=\"text-align: center;\"><strong>~82</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>关键结论</strong>：\n1. <strong>EnCodec 3 kbps &gt; Lyra-v2 6 kbps &gt; Opus 12 kbps</strong>（MUSHRA 评分）\n2. 语言模型熵编码可将 3 kbps 压缩至 ~1.9 kbps，无质量损失\n3. 流式模式相比非流式仅有轻微质量下降\n4. 48kHz 立体声模型在 6 kbps 下超越 MP3 64 kbps 和 Opus 64 kbps\n5. 单核 CPU 实时编解码</p>",
      "quiz": {
        "q": "EnCodec 中损失平衡器（Loss Balancer）的核心创新是什么？",
        "options": [
          "自动搜索最优的损失权重超参数",
          "在梯度空间归一化各损失项的贡献比例，而非简单加权损失值",
          "动态调整学习率以适应不同损失的收敛速度",
          "使用多个优化器分别优化不同的损失项"
        ],
        "answer": 1,
        "explain": "Loss Balancer 计算每个损失对参数的梯度范数，然后归一化使各项梯度贡献符合预设比例，解决了不同损失梯度量级差异大的问题。"
      }
    },
    {
      "id": "yourtts",
      "num": 11,
      "name": "YourTTS",
      "fullName": "YourTTS: 零样本多说话人TTS (YourTTS: Towards Zero-Shot Multi-Speaker TTS)",
      "year": "2022",
      "org": "Coqui",
      "parent": "vits",
      "paperUrl": "https://proceedings.mlr.press/v162/casanova22a.html",
      "projectUrl": "",
      "category": "voice_clone",
      "motivation": "多语言零样本VITS克隆",
      "summary": "YourTTS 的核心目标是：多语言零样本VITS克隆。",
      "keyPoints": [
        "核心动机：多语言零样本VITS克隆",
        "演化来源：继承或改进自 vits",
        "代表机构：Coqui"
      ],
      "detail": "<p>多语言零样本VITS克隆</p>"
    },
    {
      "id": "audioldm",
      "num": 12,
      "name": "AudioLDM",
      "fullName": "AudioLDM: 文本到音频生成 (AudioLDM: Text-to-Audio Generation with Latent Diffusion Models)",
      "year": "2023",
      "org": "Surrey",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2301.12503",
      "projectUrl": "",
      "category": "audio_effect",
      "motivation": "潜在扩散+CLAP对齐音效生成",
      "summary": "AudioLDM 的核心目标是：潜在扩散+CLAP对齐音效生成。",
      "keyPoints": [
        "核心动机：潜在扩散+CLAP对齐音效生成",
        "代表机构：Surrey"
      ],
      "detail": "<p>潜在扩散+CLAP对齐音效生成</p>"
    },
    {
      "id": "valle",
      "num": 13,
      "name": "VALL-E",
      "fullName": "VALL-E: 神经编解码语言模型 (Neural Codec Language Models are Zero-Shot Text to Speech Synthesizers)",
      "year": "2023",
      "org": "Microsoft",
      "parent": "encodec",
      "paperUrl": "https://arxiv.org/abs/2301.02111",
      "projectUrl": "",
      "category": "voice_clone",
      "motivation": "神经编解码语言模型TTS范式",
      "summary": "VALL-E 首次将文本转语音（TTS）重新定义为**条件编解码语言建模**任务，利用 EnCodec 将语音离散化为 token 序列，通过自回归（AR）+ 非自回归（NAR）两阶段 Transformer 解码器在 60K 小时 LibriLight 数据上训练，仅需 3 秒语音提示即可实现高质量零样本语音合成，在说话人相似度和语音自然度上显著超越现有零样本 TTS 系统。",
      "keyPoints": [
        "<strong>TTS 即语言建模</strong>：将 TTS 从传统的连续信号回归问题转化为离散 token 的条件语言建模问题，利用神经编解码器（EnCodec）将 24kHz 语音压缩为 8 层残差向量量化（RVQ）码本的离散 token 序列",
        "<strong>两阶段生成架构</strong>：AR 模型自回归生成第 1 层（最粗粒度）编码，NAR 模型以第 1 层为条件并行生成第 2-8 层（精细细节）编码，兼顾生成质量与效率",
        "<strong>上下文学习（In-context Learning）</strong>：借鉴 GPT-3 的 prompt 机制，将 3 秒参考语音的编解码 token 作为 prompt 拼接在输入中，无需微调即可克隆未见说话人的声音特征",
        "<strong>大规模数据驱动</strong>：在 LibriLight 60K 小时英语语音数据上训练（比此前 TTS 系统大数百倍），是首个利用如此大规模半监督数据的 TTS 模型",
        "<strong>强零样本性能</strong>：在 LibriSpeech 测试集上，WER 5.9%、说话人相似度 0.580、SMOS 3.8，显著优于 YourTTS 基线（WER 7.7%、相似度 0.510、SMOS 2.4）",
        "<strong>多样性生成</strong>：AR 模型的采样机制使得同一文本+同一 prompt 可生成多种不同的语音输出，具备多样性和表现力"
      ],
      "detail": "<h5>核心架构总览</h5>\n<p><img alt=\"VALL-E 系统概览\" src=\"https://ar5iv.labs.arxiv.org/html/2301.02111/assets/prompt.jpg\" />\n<em>图 1：VALL-E 系统概览。给定一段 3 秒的语音片段作为 prompt，VALL-E 能够合成高质量的个性化语音。VALL-E 在说话人情感保持和声学环境一致性方面显著优于基线系统。</em></p>\n<p><img alt=\"EnCodec 编解码器结构\" src=\"https://ar5iv.labs.arxiv.org/html/2301.02111/assets/codec.jpg\" />\n<em>图 2：EnCodec 编解码器的离散化过程。24kHz 语音通过编码器降采样至 75Hz 的连续表示，再经 8 层残差向量量化（RVQ）得到离散 token 矩阵 $C \\in {0,...,1023}^{8 \\times T'}$，其中每层码本大小为 1024。</em></p>\n<p><img alt=\"VALL-E 模型架构\" src=\"https://ar5iv.labs.arxiv.org/html/2301.02111/assets/x1.png\" />\n<em>图 3：VALL-E 的两阶段模型架构。左侧为自回归（AR）编解码器，逐 token 生成第 1 层量化码；右侧为非自回归（NAR）编解码器，并行生成第 2-8 层量化码。两者均以音素序列和声学 prompt 为条件。</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># VALL-E 推理伪代码\n# 输入: phoneme_seq (音素序列), prompt_audio (3秒参考语音)\n# 模型: AR_decoder, NAR_decoder, EnCodec\n\n# Step 0: 对 prompt 语音提取 EnCodec token\nprompt_tokens = EnCodec.encode(prompt_audio)  # [8, T_prompt], 8层RVQ码\n\n# Step 1: AR 模型 —— 自回归生成第1层编码\n# 条件: 音素序列 x, prompt第1层token C̃[:,1]\n# 输出: 目标语音第1层token C[:,1]\nar_input = concat(phoneme_embedding(x), prompt_tokens[0])  # 拼接prompt\nC_layer1 = []\nfor t in range(max_length):\n    # p(c_t,1 | C_{&lt;t,1}, x, C̃_{:,1})\n    logits = AR_decoder(ar_input, C_layer1)\n    next_token = sample(logits, top_p=0.95)  # nucleus sampling\n    if next_token == EOS:\n        break\n    C_layer1.append(next_token)\n\n# Step 2: NAR 模型 —— 非自回归逐层生成第2-8层编码\nC = [C_layer1]  # 已有第1层\nfor j in range(2, 9):  # 第2层到第8层\n    # p(C_{:,j} | C_{:,&lt;j}, x, C̃)\n    # NAR模型使用层级嵌入区分不同量化层\n    # 对前j-1层的嵌入求和作为声学输入\n    acoustic_input = sum(Embedding_l(C[l]) for l in range(j-1))\n    C_layer_j = NAR_decoder(phoneme_embedding(x), acoustic_input, \n                             prompt_tokens, layer_id=j)  # 并行输出所有时间步\n    C.append(C_layer_j)\n\n# Step 3: EnCodec 解码器将8层离散token还原为波形\nC_matrix = stack(C)  # [8, T']\nwaveform = EnCodec.decode(C_matrix)  # 24kHz 语音波形\n</code></pre>\n<h5>动机与背景</h5>\n<p>传统 TTS 系统面临<strong>零样本泛化能力不足</strong>的核心挑战：</p>\n<ul>\n<li><strong>数据规模受限</strong>：现有 TTS 模型通常在数百至数千小时的单/多说话人录音棚数据上训练，导致泛化到未见说话人时质量急剧下降</li>\n<li><strong>连续信号建模困难</strong>：传统方法将 TTS 视为连续 mel 频谱图的回归任务，需要复杂的编码器-解码器-声码器流水线，且难以利用语言模型的强大建模能力</li>\n<li><strong>微调依赖</strong>：现有说话人适应方法（如 speaker embedding、adapter 微调）需要额外的适应步骤，无法实现真正的零样本</li>\n</ul>\n<p>VALL-E 的核心洞察是：<strong>将语音视为一种\"语言\"</strong>，通过神经编解码器将连续波形离散化为 token，就可以直接复用大语言模型的训练范式（大数据 + Transformer + 上下文学习），从而突破传统 TTS 的数据和架构瓶颈。</p>\n<h5>方法详解</h5>\n<h6>1. 语音离散化：EnCodec 残差向量量化</h6>\n<p>VALL-E 使用 Meta 的 EnCodec 模型作为语音 tokenizer：</p>\n<ul>\n<li><strong>编码器</strong>：将 24kHz 波形降采样 320 倍至 75Hz 的连续表示</li>\n<li><strong>残差向量量化（RVQ）</strong>：8 层级联量化，每层码本大小 1024</li>\n<li>第 1 层捕获最重要的粗粒度信息（说话人身份、韵律）</li>\n<li>第 2-8 层逐步补充精细的声学细节</li>\n<li>总比特率：75 × 8 × 10 = 6000 bps</li>\n<li><strong>解码器</strong>：从 8 层离散 token 重建 24kHz 波形</li>\n</ul>\n<p>关键性质：RVQ 的层级结构天然适合分阶段生成——第 1 层最重要且依赖关系最强（适合 AR），后续层可基于前面层并行生成（适合 NAR）。</p>\n<h6>2. 自回归（AR）模型：生成第 1 层编码</h6>\n<p>AR 模型是一个仅解码器的 Transformer，建模第 1 层 token 的条件分布：</p>\n<div class=\"kb-math kb-math-display\">p(C_{:,1} | \\tilde{C}_{:,1}, x) = \\prod_{t=0}^{T&#x27;} p(c_{t,1} | C_{&lt;t,1}, \\tilde{C}_{:,1}, x; \\theta_{AR})</div>\n<p>其中：\n- $x = (x_0, ..., x_L)$：音素序列\n- $\\tilde{C}<em _1=\",1\">{:,1}$：prompt 语音的第 1 层 token\n- $C</em>)$：目标语音的第 1 层 token} = (c_{0,1}, ..., c_{T',1</p>\n<p>模型结构细节：\n- 音素序列和声学 token 共享同一个 Transformer，但使用不同的嵌入层\n- 音素部分使用<strong>双向注意力</strong>（可看到完整文本），声学部分使用<strong>因果注意力</strong>（仅看到历史 token）\n- Prompt 的声学 token $\\tilde{C}<em _1=\",1\">{:,1}$ 直接拼接在目标序列 $C</em>$ 前面\n- 训练目标：标准的交叉熵损失（next-token prediction）</p>\n<h6>3. 非自回归（NAR）模型：生成第 2-8 层编码</h6>\n<p>NAR 模型同样是 Transformer 架构，但以非自回归方式并行生成每一层：</p>\n<div class=\"kb-math kb-math-display\">p(C_{:,2:8} | C_{:,1}, \\tilde{C}, x) = \\prod_{j=2}^{8} p(C_{:,j} | C_{:,&lt;j}, \\tilde{C}, x; \\theta_{NAR})</div>\n<p>模型结构细节：\n- 8 个独立的声学嵌入层 $E_1, ..., E_8$，每层对应一个 RVQ 量化层\n- 输入声学表示：前 $j-1$ 层嵌入的<strong>逐元素求和</strong> $\\sum_{l=1}^{j-1} E_l(C_{:,l})$\n- 使用<strong>层级嵌入（layer embedding）</strong>告知模型当前生成的是第几层\n- Prompt 的完整 8 层 token $\\tilde{C}$ 同样通过嵌入求和后拼接\n- 所有位置使用<strong>双向注意力</strong>（NAR 无需因果约束）\n- 训练时随机采样层 $j \\in {2,...,8}$，仅计算该层的交叉熵损失</p>\n<h6>4. 推理策略</h6>\n<ul>\n<li>AR 阶段使用 <strong>nucleus sampling</strong>（top-p = 0.95），支持多样性生成</li>\n<li>NAR 阶段使用 <strong>greedy decoding</strong>（argmax），确保精细层的稳定性</li>\n<li>最终将 8 层 token 送入 EnCodec 解码器重建波形</li>\n</ul>\n<h5>实验设置</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>配置项</th>\n<th>详情</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>训练数据</strong></td>\n<td>LibriLight 60K 小时（含 7000+ 说话人），使用现有 ASR 模型生成转录文本</td>\n</tr>\n<tr>\n<td><strong>音素化</strong></td>\n<td>使用 G2P 工具将文本转为音素序列</td>\n</tr>\n<tr>\n<td><strong>编解码器</strong></td>\n<td>EnCodec 24kHz，8 层 RVQ，每层码本 1024，帧率 75Hz</td>\n</tr>\n<tr>\n<td><strong>AR 模型</strong></td>\n<td>12 层 Transformer 解码器，16 头注意力，嵌入维度 1024，FFN 维度 4096，约 0.37B 参数</td>\n</tr>\n<tr>\n<td><strong>NAR 模型</strong></td>\n<td>12 层 Transformer 解码器，16 头注意力，嵌入维度 1024，FFN 维度 4096，约 0.37B 参数</td>\n</tr>\n<tr>\n<td><strong>优化器</strong></td>\n<td>AdamW，学习率线性预热 + 逆平方根衰减</td>\n</tr>\n<tr>\n<td><strong>训练步数</strong></td>\n<td>800K 步（AR），400K 步（NAR）</td>\n</tr>\n<tr>\n<td><strong>批大小</strong></td>\n<td>6K 声学 token / GPU</td>\n</tr>\n<tr>\n<td><strong>硬件</strong></td>\n<td>16 × NVIDIA V100 32GB GPU</td>\n</tr>\n<tr>\n<td><strong>评估数据</strong></td>\n<td>LibriSpeech test-clean（续写任务），VCTK（跨数据集零样本）</td>\n</tr>\n</tbody>\n</table></div>\n<h5>实验结果</h5>\n<h6>LibriSpeech 续写任务（Continuation）</h6>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>WER ↓</th>\n<th>说话人相似度 ↑</th>\n<th>SMOS ↑</th>\n<th>CMOS</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Ground Truth</td>\n<td>2.2%</td>\n<td>0.754</td>\n<td>4.09</td>\n<td>0</td>\n</tr>\n<tr>\n<td>YourTTS</td>\n<td>7.7%</td>\n<td>0.510</td>\n<td>2.41</td>\n<td>-0.52</td>\n</tr>\n<tr>\n<td><strong>VALL-E</strong></td>\n<td><strong>5.9%</strong></td>\n<td><strong>0.580</strong></td>\n<td><strong>3.81</strong></td>\n<td><strong>+0.12</strong></td>\n</tr>\n</tbody>\n</table></div>\n<ul>\n<li>VALL-E 在所有指标上大幅超越 YourTTS 基线</li>\n<li>CMOS +0.12 表明 VALL-E 的合成质量甚至略优于真实语音的续写拼接</li>\n<li>WER 5.9% 接近真实语音的 2.2%，表明语音内容的准确性很高</li>\n</ul>\n<h6>VCTK 跨数据集零样本</h6>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>WER ↓</th>\n<th>说话人相似度 ↑</th>\n<th>SMOS ↑</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>YourTTS</td>\n<td>9.2%</td>\n<td>0.337</td>\n<td>—</td>\n</tr>\n<tr>\n<td><strong>VALL-E</strong></td>\n<td><strong>6.2%</strong></td>\n<td><strong>0.381</strong></td>\n<td><strong>3.40</strong></td>\n</tr>\n</tbody>\n</table></div>\n<ul>\n<li>在完全未见过的 VCTK 数据集上，VALL-E 仍保持较好的零样本性能</li>\n<li>说话人相似度从 0.337 提升至 0.381</li>\n</ul>\n<h6>Prompt 长度消融</h6>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Prompt 长度</th>\n<th>WER ↓</th>\n<th>说话人相似度 ↑</th>\n<th>SMOS ↑</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>原始 enrolled（完整句）</td>\n<td>3.8%</td>\n<td>0.617</td>\n<td>—</td>\n</tr>\n<tr>\n<td>3 秒</td>\n<td>5.9%</td>\n<td>0.580</td>\n<td>3.81</td>\n</tr>\n</tbody>\n</table></div>\n<ul>\n<li>更长的 prompt 提供更多说话人信息，可进一步提升性能</li>\n</ul>\n<h5>消融实验</h5>\n<p>论文通过以下消融验证了关键设计选择：</p>\n<ol>\n<li>\n<p><strong>AR+NAR vs 纯 AR</strong>：纯 AR 模型（逐层自回归生成所有 8 层）的推理速度极慢（8 倍），且后续层的自回归建模收益递减。AR+NAR 的两阶段设计在质量和效率间取得最优平衡。</p>\n</li>\n<li>\n<p><strong>Prompt 长度影响</strong>：3 秒 prompt 已足够捕获说话人特征（相似度 0.580），但更长的 prompt（完整句子）可将相似度提升至 0.617。</p>\n</li>\n<li>\n<p><strong>采样策略</strong>：AR 阶段使用 nucleus sampling（top-p=0.95）相比 greedy decoding 能生成更自然、更多样的语音，但 WER 略有上升。</p>\n</li>\n<li>\n<p><strong>数据规模</strong>：60K 小时的大规模数据是零样本能力的关键——论文指出这是首个在如此大规模数据上训练的 TTS 模型，数据规模比此前系统大数百倍。</p>\n</li>\n</ol>\n<h5>关键公式</h5>\n<p><strong>AR 模型目标函数（第 1 层自回归生成）：</strong></p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{AR} = -\\sum_{t=1}^{T&#x27;} \\log p(c_{t,1} | c_{&lt;t,1}, \\tilde{C}_{:,1}, x; \\theta_{AR})</div>\n<p><strong>NAR 模型目标函数（第 j 层非自回归生成）：</strong></p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{NAR} = -\\sum_{t=1}^{T&#x27;} \\log p(c_{t,j} | C_{:,&lt;j}, \\tilde{C}, x; \\theta_{NAR}), \\quad j \\sim \\text{Uniform}\\{2,...,8\\}</div>\n<p><strong>声学嵌入融合（NAR 输入构造）：</strong></p>\n<div class=\"kb-math kb-math-display\">e_t = \\sum_{l=1}^{j-1} E_l(c_{t,l})</div>\n<p>其中 $E_l$ 为第 $l$ 层的嵌入矩阵，$c_{t,l}$ 为时间步 $t$ 第 $l$ 层的量化码。</p>"
    },
    {
      "id": "musicgen",
      "num": 14,
      "name": "MusicGen",
      "fullName": "MusicGen: 简单可控音乐生成 (Simple and Controllable Music Generation)",
      "year": "2023",
      "org": "Meta",
      "parent": "encodec",
      "paperUrl": "https://arxiv.org/abs/2306.05284",
      "projectUrl": "",
      "category": "music_gen",
      "motivation": "单Transformer可控音乐生成",
      "summary": "MusicGen 的核心目标是：单Transformer可控音乐生成。",
      "keyPoints": [
        "核心动机：单Transformer可控音乐生成",
        "演化来源：继承或改进自 encodec",
        "代表机构：Meta"
      ],
      "detail": "<p>单Transformer可控音乐生成</p>"
    },
    {
      "id": "tango",
      "num": 15,
      "name": "TANGO",
      "fullName": "TANGO: 文本到音频生成 (Text-to-Audio Generation using Instruction Guided Latent Diffusion Model)",
      "year": "2023",
      "org": "多机构",
      "parent": "audioldm",
      "paperUrl": "https://arxiv.org/abs/2304.13731",
      "projectUrl": "",
      "category": "audio_effect",
      "motivation": "指令微调潜在扩散音效生成",
      "summary": "TANGO 的核心目标是：指令微调潜在扩散音效生成。",
      "keyPoints": [
        "核心动机：指令微调潜在扩散音效生成",
        "演化来源：继承或改进自 audioldm",
        "代表机构：多机构"
      ],
      "detail": "<p>指令微调潜在扩散音效生成</p>"
    },
    {
      "id": "megatts",
      "num": 16,
      "name": "Mega-TTS",
      "fullName": "Mega-TTS: 零样本大规模TTS (Mega-TTS: Zero-Shot Text-to-Speech at Scale)",
      "year": "2023",
      "org": "多机构",
      "parent": "valle",
      "paperUrl": "https://arxiv.org/abs/2306.03509",
      "projectUrl": "",
      "category": "voice_clone",
      "motivation": "扩散韵律建模长文本合成",
      "summary": "Mega-TTS 的核心目标是：扩散韵律建模长文本合成。",
      "keyPoints": [
        "核心动机：扩散韵律建模长文本合成",
        "演化来源：继承或改进自 valle",
        "代表机构：多机构"
      ],
      "detail": "<p>扩散韵律建模长文本合成</p>"
    },
    {
      "id": "audioldm2",
      "num": 17,
      "name": "AudioLDM 2",
      "fullName": "AudioLDM 2: 通用音频生成 (AudioLDM 2: Learning Holistic Audio Generation with Self-supervised Pretraining)",
      "year": "2024",
      "org": "Surrey",
      "parent": "audioldm",
      "paperUrl": "https://arxiv.org/abs/2308.05734",
      "projectUrl": "",
      "category": "audio_effect",
      "motivation": "自监督音频语言表示学习",
      "summary": "AudioLDM 2 的核心目标是：自监督音频语言表示学习。",
      "keyPoints": [
        "核心动机：自监督音频语言表示学习",
        "演化来源：继承或改进自 audioldm",
        "代表机构：Surrey"
      ],
      "detail": "<p>自监督音频语言表示学习</p>"
    },
    {
      "id": "valle2",
      "num": 18,
      "name": "VALL-E 2",
      "fullName": "VALL-E 2: 人类水平零样本TTS (VALL-E 2: Neural Codec Language Models are Human Parity Zero-Shot Text to Speech Synthesizers)",
      "year": "2024",
      "org": "Microsoft",
      "parent": "valle",
      "paperUrl": "https://www.microsoft.com/en-us/research/project/vall-e-x/vall-e-2/",
      "projectUrl": "",
      "category": "voice_clone",
      "motivation": "重复感知采样达人类水平TTS",
      "summary": "VALL-E 2 的核心目标是：重复感知采样达人类水平TTS。",
      "keyPoints": [
        "核心动机：重复感知采样达人类水平TTS",
        "演化来源：继承或改进自 valle",
        "代表机构：Microsoft"
      ],
      "detail": "<p>重复感知采样达人类水平TTS</p>"
    },
    {
      "id": "tfoley",
      "num": 19,
      "name": "T-Foley",
      "fullName": "T-Foley: 可控波形域扩散Foley (T-Foley: A Controllable Waveform-Domain Diffusion Model)",
      "year": "2024",
      "org": "多机构",
      "parent": "tango",
      "paperUrl": "https://ieeexplore.ieee.org/abstract/document/10447380/",
      "projectUrl": "",
      "category": "audio_effect",
      "motivation": "时间事件引导扩散Foley合成",
      "summary": "T-Foley 提出了 Block-FiLM 条件化机制，将**时间事件特征（RMS 包络）**作为显式条件注入波形域扩散模型，首次实现了对 Foley 音效合成中声音事件时序的精确控制，同时支持人声模仿作为直觉化输入接口。",
      "keyPoints": [
        "<strong>波形域扩散架构</strong>：基于 DAG（Full-band General Audio Synthesis）的 UNet 结构，含双向 LSTM 瓶颈层，直接在波形域生成高保真音频，无需预训练声码器",
        "<strong>双重条件化</strong>：声音类别（class embedding）通过标准 FiLM 注入，时间事件特征（RMS 包络）通过 Block-FiLM 注入，前半部分下/上采样块用 FiLM，后半部分用 Block-FiLM",
        "<strong>Block-FiLM（BFiLM）</strong>：对 TFiLM 的简化——将序列建模层（LSTM）替换为逐块 MLP，利用 UNet 瓶颈处的 LSTM 承担跨块时序建模，参数量减少 ~30%（74M vs 101M），推理速度提升 ~27%",
        "<strong>RMS 包络作为时间事件特征</strong>：帧级均方根能量（W=512, h=128），相比 onset/offset 更适合无明确起止的声音类别（如雨声、喷嚏）",
        "<strong>Event-L1 距离</strong>：新提出的客观评估指标，衡量生成音频与目标时间事件特征之间的 L1 距离",
        "<strong>人声模仿接口</strong>：支持从人声模仿（Vocal Imitation Set / VocalSketch）中提取 RMS 作为条件，实现直觉化控制",
        "<strong>数据集</strong>：DCASE 2023 Foley Sound Synthesis 任务数据集，7 类声音（DogBark, Footstep, GunShot, Keyboard, MovingMotorVehicle, Rain, Sneeze_Cough），约 5k 样本 / 5.4 小时"
      ],
      "detail": "<h5>任务定义与动机</h5>\n<p><img alt=\"T-Foley 任务示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2401.09294/assets/task.png\" />\n<em>图 1：时间事件引导的 Foley 音效合成任务。给定声音类别和时间事件条件（如 RMS 包络），生成时序对齐的 Foley 音效。</em></p>\n<p>Foley 音效是影视后期制作中由拟音师手工创建的、与画面同步的声音效果。传统 Foley 合成方法主要关注<strong>声音类别</strong>条件（生成\"什么声音\"），但忽略了<strong>时间维度</strong>的控制（\"何时发声\"以及\"声音的时间包络如何\"）。</p>\n<p>现有方法的局限：\n- <strong>文本引导方法</strong>（如 AudioLDM、DiffSound）：文本描述难以精确表达时间信息\n- <strong>视频引导方法</strong>（如 SpecVQGAN、FoleyGAN）：依赖视频输入，且时间对齐效果有限\n- <strong>无条件/类别条件方法</strong>（如 DAG、CRASH）：无法控制声音事件的时序</p>\n<p>T-Foley 的核心思路：<strong>将时间事件特征（temporal event feature）作为独立的显式条件</strong>，与声音类别共同引导波形扩散过程。</p>\n<h5>模型架构</h5>\n<p><img alt=\"T-Foley 模型架构\" src=\"https://ar5iv.labs.arxiv.org/html/2401.09294/assets/model_arch.png\" />\n<em>图 2：(a) T-Foley 整体架构。UNet 的前半部分下/上采样块使用 FiLM 注入类别+扩散时间步条件，后半部分使用 Block-FiLM 注入时间事件条件。(b) Block-FiLM 的工作原理。</em></p>\n<p>T-Foley 的架构基于 DAG 模型的 UNet 设计：</p>\n<ol>\n<li><strong>编码器（下采样路径）</strong>：将含噪波形 <span class=\"kb-math kb-math-inline\">\\mathbf{x}</span> 逐层下采样为潜在向量</li>\n<li><strong>瓶颈层</strong>：双向 LSTM，维护样本内的音色一致性，同时承担跨时间块的序列建模</li>\n<li><strong>解码器（上采样路径）</strong>：通过线性投影调整尺寸后逐层上采样，输出噪声预测 <span class=\"kb-math kb-math-inline\">\\hat{\\epsilon}</span></li>\n</ol>\n<p><strong>条件注入策略</strong>：UNet 的每个下/上采样块分为两部分：\n- <strong>前半部分</strong>：使用标准 <strong>FiLM</strong> 注入扩散时间步 <span class=\"kb-math kb-math-inline\">\\sigma</span> 和声音类别 <span class=\"kb-math kb-math-inline\">\\mathbf{c}</span>\n- <strong>后半部分</strong>：使用 <strong>Block-FiLM</strong> 注入时间事件特征 <span class=\"kb-math kb-math-inline\">T</span>（RMS 包络）</p>\n<h5>时间事件特征：RMS 包络</h5>\n<p>时间事件特征采用帧级 RMS（Root Mean Square）能量：</p>\n<div class=\"kb-math kb-math-display\">E_i(x) = \\sqrt{\\frac{1}{W} \\sum_{t=ih}^{ih+W} x^2(t)}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">x(t)</span> 为音频波形，<span class=\"kb-math kb-math-inline\">W=512</span> 为窗口大小，<span class=\"kb-math kb-math-inline\">h=128</span> 为跳步大小。</p>\n<div class=\"key-point\">💡 <strong>为什么选择 RMS 而非 onset/offset？</strong> 论文实验发现 RMS 和 power（RMS 的平方）效果相当，但 onset/offset 对某些声音类别（如雨声、喷嚏）不适用——这些声音没有明确的起止点，但有随时间变化的强度包络。RMS 能统一表征所有类型声音的时间模式。</div>\n<h5>Block-FiLM 核心机制</h5>\n<p>Block-FiLM 是论文的核心技术创新，它是对 TFiLM（Temporal FiLM）的高效简化。</p>\n<p><strong>标准 FiLM</strong> 对整个特征图施加全局仿射变换：</p>\n<div class=\"kb-math kb-math-display\">\\text{FiLM}(\\mathbf{x}, \\mathbf{y}, \\gamma, \\beta) = \\gamma \\odot \\mathbf{x} + \\beta</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\gamma, \\beta = \\text{MLP}(\\mathbf{y})</span>，<span class=\"kb-math kb-math-inline\">\\gamma, \\beta \\in \\mathbb{R}^{C_{out}}</span> 是<strong>通道级</strong>参数，不区分时间维度。</p>\n<p><strong>TFiLM</strong> 将特征图沿时间轴分为 <span class=\"kb-math kb-math-inline\">N</span> 个块，每个块有独立的仿射参数：</p>\n<div class=\"kb-math kb-math-display\">\\text{TFiLM}(\\mathbf{x}, \\mathbf{y}) = \\text{Concat}\\left[\\gamma_i \\cdot \\mathbf{1}_d^T \\odot X_{b_i} + \\beta_i \\cdot \\mathbf{1}_d^T\\right]_{i=1}^{N}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">(\\gamma_i, \\beta_i) = \\text{LSTM}(Y_{b_i}^{\\text{pool}})</span>，使用 LSTM 建模块间时序依赖。</p>\n<p><strong>Block-FiLM</strong> 的关键简化——<strong>用 MLP 替换 LSTM</strong>：</p>\n<div class=\"kb-math kb-math-display\">(\\gamma_i, \\beta_i) = \\text{MLP}(Y_{b_i}^{\\text{pool}})</div>\n<pre><code class=\"language-python\"># Block-FiLM 伪代码\ndef block_film(x, y_temporal, N_blocks):\n    &quot;&quot;&quot;\n    x: 待调制特征 [C_out, L_out]\n    y_temporal: 时间事件特征(RMS) [C_in, L_in]  \n    N_blocks: 块数量\n    &quot;&quot;&quot;\n    # 将时间事件特征分为 N 个块并池化\n    y_blocks = split_and_pool(y_temporal, N_blocks)  # [N, C_in]\n\n    # 将待调制特征分为 N 个块\n    x_blocks = split(x, N_blocks)  # [N, C_out, d]  d = L_out / N\n\n    output = []\n    for i in range(N_blocks):\n        # 每个块独立计算仿射参数（无跨块序列建模）\n        gamma_i, beta_i = MLP(y_blocks[i])  # 各 [C_out]\n\n        # 块级仿射变换\n        x_mod = gamma_i[:, None] * x_blocks[i] + beta_i[:, None]\n        output.append(x_mod)\n\n    return concat(output, dim=-1)  # [C_out, L_out]\n</code></pre>\n<div class=\"key-point\">💡 <strong>为什么 Block-FiLM 能省去 LSTM？</strong> 论文的关键洞察是：RMS 包络中嵌入的时间事件具有<strong>弱依赖性</strong>——例如 t=1.3s 处的枪声事件不影响 t=3s 处的另一个事件。因此块间的序列建模并非必要。而 UNet 瓶颈处已有的双向 LSTM 足以在全局层面处理跨块的时序一致性。这种\"分工\"设计使 Block-FiLM 以更少参数（74M vs TFiLM 的 101M）和更快推理（9.5s vs 13s）取得更好性能。</div>\n<h5>块数量的权衡</h5>\n<p><img alt=\"块数量权衡\" src=\"https://ar5iv.labs.arxiv.org/html/2401.09294/assets/block_tradeoff.png\" />\n<em>图 3：不同块数量 N 在性能（E-L1、FAD-P）和效率（推理时间）之间的权衡。</em></p>\n<p>块数量 <span class=\"kb-math kb-math-inline\">N</span> 控制时间条件的分辨率：\n- <strong>更多块</strong>（如 N=245）→ 更精细的时间控制，E-L1 更低，但推理更慢\n- <strong>更少块</strong>（如 N=7）→ 更平滑的条件，效率更高，但时间精度下降\n- 论文选择 <strong>N=49</strong> 作为精度与效率的最佳平衡点</p>\n<h5>训练与推理</h5>\n<p><strong>训练配置</strong>：\n- 方差保持（VP）余弦调度的连续时间 L2 噪声预测损失\n- Classifier-free guidance：训练时以 <span class=\"kb-math kb-math-inline\">p=0.1</span> 随机丢弃条件\n- 500 epoch 训练\n- 数据：22,050 Hz 单声道，4 秒时长</p>\n<p><strong>推理</strong>：采用 DDPM 风格的 SDE 离散化 + classifier-free guidance</p>\n<h5>实验结果</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>参数量</th>\n<th>推理时间</th>\n<th>E-L1↓</th>\n<th>FAD-P↓</th>\n<th>FAD-V↓</th>\n<th>IS↑</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Real data</td>\n<td>-</td>\n<td>-</td>\n<td>0.0</td>\n<td>22.81</td>\n<td>4.06</td>\n<td>2.18</td>\n</tr>\n<tr>\n<td>DAG (无时间条件)</td>\n<td>87M</td>\n<td>12s</td>\n<td>0.2212</td>\n<td>53.94</td>\n<td>36.10</td>\n<td>1.46</td>\n</tr>\n<tr>\n<td>T-Foley (FiLM)</td>\n<td>83M</td>\n<td>6.3s</td>\n<td>0.0772</td>\n<td>54.59</td>\n<td>36.06</td>\n<td>1.94</td>\n</tr>\n<tr>\n<td>T-Foley (TFiLM)</td>\n<td>101M</td>\n<td>13s</td>\n<td>0.0469</td>\n<td>49.44</td>\n<td>36.10</td>\n<td>1.74</td>\n</tr>\n<tr>\n<td><strong>T-Foley (BFiLM)</strong></td>\n<td><strong>74M</strong></td>\n<td><strong>9.5s</strong></td>\n<td><strong>0.0367</strong></td>\n<td><strong>41.59</strong></td>\n<td><strong>36.09</strong></td>\n<td>1.79</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：FiLM 的 IS 值较高可能是因为生成了多样但低质量的音频（与真实数据分布偏离较大），而非真正的质量优势。</div>\n<p>主观评估（MOS，23 名参与者）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>类别保真度↑</th>\n<th>时间保真度↑</th>\n<th>音频质量↑</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>FiLM</td>\n<td>3.85±0.12</td>\n<td>4.11±0.10</td>\n<td>3.28±0.11</td>\n</tr>\n<tr>\n<td>TFiLM</td>\n<td>4.02±0.11</td>\n<td>4.00±0.13</td>\n<td>3.75±0.11</td>\n</tr>\n<tr>\n<td><strong>BFiLM</strong></td>\n<td><strong>4.22±0.11</strong></td>\n<td><strong>4.41±0.09</strong></td>\n<td><strong>4.06±0.10</strong></td>\n</tr>\n</tbody>\n</table></div>\n<p>BFiLM 在所有三个主观指标上均显著优于 FiLM 和 TFiLM。</p>\n<h5>人声模仿控制</h5>\n<p><img alt=\"生成样本示例\" src=\"https://ar5iv.labs.arxiv.org/html/2401.09294/assets/event-guided_samples.png\" />\n<em>图 4：第一行为用于提取目标事件特征的控制声音，后续行为不同类别的生成结果。生成音频的 RMS 包络与控制信号高度对齐。</em></p>\n<p>T-Foley 支持从<strong>人声模仿</strong>中提取 RMS 包络作为条件输入。用户只需用嘴模仿目标声音的节奏和强度模式，模型即可生成对应类别的、时序对齐的 Foley 音效。这为影视后期制作提供了极为直觉化的交互方式。</p>\n<h5>与传统方法的核心区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统方法</th>\n<th>T-Foley</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>时间控制</td>\n<td>无显式时间条件</td>\n<td>RMS 包络作为显式时间事件条件</td>\n</tr>\n<tr>\n<td>条件化方式</td>\n<td>全局 FiLM</td>\n<td>双重条件：FiLM（类别）+ Block-FiLM（时间）</td>\n</tr>\n<tr>\n<td>生成域</td>\n<td>多为频谱域+声码器</td>\n<td>直接波形域生成</td>\n</tr>\n<tr>\n<td>交互方式</td>\n<td>文本/视频</td>\n<td>支持人声模仿的直觉化输入</td>\n</tr>\n<tr>\n<td>评估指标</td>\n<td>FAD/IS</td>\n<td>新增 Event-L1 衡量时间保真度</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "T-Foley 中 Block-FiLM 相比 TFiLM 的核心简化是什么？",
        "options": [
          "将块级仿射变换替换为全局仿射变换",
          "用 MLP 替换 LSTM 进行块级参数生成，依赖瓶颈层 LSTM 处理跨块时序",
          "减少块的数量以降低计算复杂度",
          "将 RMS 特征替换为 onset/offset 特征以简化输入"
        ],
        "answer": 1,
        "explain": "Block-FiLM 的核心简化是将 TFiLM 中用于块间序列建模的 LSTM 替换为独立的 MLP，因为时间事件间具有弱依赖性，而 UNet 瓶颈处已有的双向 LSTM 足以处理全局时序一致性。"
      }
    },
    {
      "id": "wavtokenizer",
      "num": 20,
      "name": "WavTokenizer",
      "fullName": "WavTokenizer: 高效声学离散编解码器 (WavTokenizer: An Efficient Acoustic Discrete Codec Tokenizer)",
      "year": "2025",
      "org": "多机构",
      "parent": "encodec",
      "paperUrl": "https://proceedings.iclr.cc/paper_files/paper/2025/hash/ea1f5f0878d43ff4fb8bf64ef4a2326c-Abstract-Conference.html",
      "projectUrl": "",
      "category": "neural_codec",
      "motivation": "单层Codebook高效Token化",
      "summary": "WavTokenizer 的核心目标是：单层Codebook高效Token化。",
      "keyPoints": [
        "核心动机：单层Codebook高效Token化",
        "演化来源：继承或改进自 encodec",
        "代表机构：多机构"
      ],
      "detail": "<p>单层Codebook高效Token化</p>"
    },
    {
      "id": "f5tts",
      "num": 21,
      "name": "F5-TTS",
      "fullName": "F5-TTS: Flow Matching扩散TTS (F5-TTS: A Fairytaler that Fakes Fluent and Faithful Speech with Flow Matching)",
      "year": "2025",
      "org": "多机构",
      "parent": "vits",
      "paperUrl": "https://arxiv.org/abs/2410.06885",
      "projectUrl": "",
      "category": "tts",
      "motivation": "Flow Matching+DiT非自回归",
      "summary": "F5-TTS 的核心目标是：Flow Matching+DiT非自回归。",
      "keyPoints": [
        "核心动机：Flow Matching+DiT非自回归",
        "演化来源：继承或改进自 vits",
        "代表机构：多机构"
      ],
      "detail": "<p>Flow Matching+DiT非自回归</p>"
    },
    {
      "id": "dittotts",
      "num": 22,
      "name": "DiTTo-TTS",
      "fullName": "DiTTo-TTS: 扩散Transformer TTS (DiTTo-TTS: Efficient and Scalable Zero-Shot Text-to-Speech with Diffusion Transformer)",
      "year": "2025",
      "org": "KRAFTON/NVIDIA",
      "parent": "f5tts",
      "paperUrl": "https://arxiv.org/abs/2406.11427",
      "projectUrl": "",
      "category": "tts",
      "motivation": "无音素扩散Transformer零样本",
      "summary": "DiTTo-TTS 的核心目标是：无音素扩散Transformer零样本。",
      "keyPoints": [
        "核心动机：无音素扩散Transformer零样本",
        "演化来源：继承或改进自 f5tts",
        "代表机构：KRAFTON/NVIDIA"
      ],
      "detail": "<p>无音素扩散Transformer零样本</p>"
    },
    {
      "id": "cosyvoice3",
      "num": 23,
      "name": "CosyVoice 3",
      "fullName": "CosyVoice 3: 可扩展多语言多任务语音生成 (CosyVoice 3: Scalable Multilingual and Multitask Speech Generation)",
      "year": "2026.01",
      "org": "阿里巴巴",
      "parent": "f5tts",
      "paperUrl": "https://github.com/FunAudioLLM/CosyVoice",
      "projectUrl": "",
      "category": "tts",
      "motivation": "RL优化双向流式多语言TTS",
      "summary": "CosyVoice 3 的核心目标是：RL优化双向流式多语言TTS。",
      "keyPoints": [
        "核心动机：RL优化双向流式多语言TTS",
        "演化来源：继承或改进自 f5tts",
        "代表机构：阿里巴巴"
      ],
      "detail": "<p>RL优化双向流式多语言TTS</p>"
    },
    {
      "id": "xvoice",
      "num": 24,
      "name": "X-Voice",
      "fullName": "X-Voice: 30语言零样本克隆 (X-Voice: Enabling Everyone to Speak 30 Languages via Zero-Shot Cross-Lingual Voice Cloning)",
      "year": "2026.05",
      "org": "多机构",
      "parent": "valle2",
      "paperUrl": "https://arxiv.org/abs/2605.05611",
      "projectUrl": "",
      "category": "voice_clone",
      "motivation": "30语言零样本跨语言克隆",
      "summary": "X-Voice 的核心目标是：30语言零样本跨语言克隆。",
      "keyPoints": [
        "核心动机：30语言零样本跨语言克隆",
        "演化来源：继承或改进自 valle2",
        "代表机构：多机构"
      ],
      "detail": "<p>30语言零样本跨语言克隆</p>"
    },
    {
      "id": "marcovoice",
      "num": 25,
      "name": "Marco-Voice",
      "fullName": "Marco-Voice: 统一表达性语音合成 (Marco-Voice: A Unified Framework for Expressive Speech Synthesis)",
      "year": "2026",
      "org": "多机构",
      "parent": "valle2",
      "paperUrl": "https://ieeexplore.ieee.org/abstract/document/11463753/",
      "projectUrl": "",
      "category": "voice_clone",
      "motivation": "统一表达性语音合成框架",
      "summary": "Marco-Voice 的核心目标是：统一表达性语音合成框架。",
      "keyPoints": [
        "核心动机：统一表达性语音合成框架",
        "演化来源：继承或改进自 valle2",
        "代表机构：多机构"
      ],
      "detail": "<p>统一表达性语音合成框架</p>"
    },
    {
      "id": "audiox",
      "num": 26,
      "name": "AudioX",
      "fullName": "AudioX: 万物转音频 (AudioX: Diffusion Transformer for Anything-to-Audio Generation)",
      "year": "2026.03",
      "org": "多机构",
      "parent": "audioldm2",
      "paperUrl": "https://arxiv.org/abs/2503.10522",
      "projectUrl": "",
      "category": "audio_effect",
      "motivation": "DiT万物转音频多模态生成",
      "summary": "AudioX 的核心目标是：DiT万物转音频多模态生成。",
      "keyPoints": [
        "核心动机：DiT万物转音频多模态生成",
        "演化来源：继承或改进自 audioldm2",
        "代表机构：多机构"
      ],
      "detail": "<p>DiT万物转音频多模态生成</p>"
    },
    {
      "id": "audiogenomni",
      "num": 27,
      "name": "AudioGen-Omni",
      "fullName": "AudioGen-Omni: 统一多模态音频生成 (AudioGen-Omni: A Unified Multimodal Diffusion Transformer)",
      "year": "2026",
      "org": "多机构",
      "parent": "audiox",
      "paperUrl": "https://ieeexplore.ieee.org/abstract/document/11461581/",
      "projectUrl": "",
      "category": "audio_effect",
      "motivation": "MM-DiT统一多模态音频生成",
      "summary": "AudioGen-Omni 的核心目标是：MM-DiT统一多模态音频生成。",
      "keyPoints": [
        "核心动机：MM-DiT统一多模态音频生成",
        "演化来源：继承或改进自 audiox",
        "代表机构：多机构"
      ],
      "detail": "<p>MM-DiT统一多模态音频生成</p>"
    },
    {
      "id": "omnicodec",
      "num": 28,
      "name": "OmniCodec",
      "fullName": "OmniCodec: 低帧率通用编解码器 (OmniCodec: Low Frame Rate Universal Audio Codec with Semantic-Acoustic Disentanglement)",
      "year": "2026.03",
      "org": "多机构",
      "parent": "wavtokenizer",
      "paperUrl": "https://arxiv.org/abs/2603.20638",
      "projectUrl": "",
      "category": "neural_codec",
      "motivation": "低帧率语义声学解耦编解码",
      "summary": "OmniCodec 提出了一种全域通用神经音频编解码器，通过将预训练 Qwen3-Omni-AuT-Encoder 的语义知识蒸馏到第一层码本、其余码本专注声学重建的双分支解耦架构，并引入自引导（Self-Guidance）机制提升码本利用率，在语音、音乐和通用声音三个领域均实现了优于 Mimi codec 的重建质量与语义保持能力。",
      "keyPoints": [
        "<strong>全域通用编解码器</strong>：单一模型同时处理语音（Speech）、音乐（Music）和通用声音（Sound）三个领域，训练数据达 160K 小时",
        "<strong>双分支架构</strong>：语义分支（Semantic Branch）利用冻结的 Qwen3-Omni-AuT-Encoder 提取语义表示，声学分支（Acoustic Branch）基于 SEANet 编码器提取声学特征",
        "<strong>语义-声学解耦</strong>：第一层码本通过语义向量量化器（Semantic VQ）编码语义信息，后续 31 层残差向量量化器（RVQ）专注声学细节重建",
        "<strong>解耦适配器（Decoupled Adapters）</strong>：两个独立适配器分别将语义和声学表示映射到解码器输入空间，避免信息耦合",
        "<strong>自引导损失（Self-Guidance Loss）</strong>：利用码本自身的量化误差信号引导训练，提升码本利用率（从 0.974 到 0.982）并稳定训练过程",
        "<strong>极低帧率</strong>：支持 12.5 Hz 和 6.25 Hz 的 token 速率，在极低比特率下保持高质量重建",
        "<strong>因果 Transformer 解码器</strong>：8 层因果 Transformer 增强解码器的序列建模能力",
        "<strong>实验结果</strong>：在 LibriSpeech、GTZAN、AudioSet 等基准上，重建质量和语义保持均优于 Mimi codec 和 DAC 等基线"
      ],
      "detail": "<h5>模型整体架构</h5>\n<p><img alt=\"OmniCodec 模型架构图\" src=\"https://ar5iv.labs.arxiv.org/html/2603.20638/assets/x1.png\" />\n<em>图 1：OmniCodec 模型架构。上方语义分支利用冻结的 Qwen3-Omni-AuT-Encoder 提取语义表示，下方声学分支通过 SEANet 编码器提取声学特征，两者分别经过解耦适配器后送入 SEANet 解码器进行重建。</em></p>\n<p>OmniCodec 的核心设计思想是<strong>将语义理解与声学重建解耦到不同的码本层级</strong>。整体架构包含以下关键组件：</p>\n<ol>\n<li><strong>语义分支（Semantic Branch）</strong>：冻结的 Qwen3-Omni-AuT-Encoder（来自预训练多模态理解模型）提取 12.5 Hz 的语义隐藏表示</li>\n<li><strong>声学分支（Acoustic Branch）</strong>：SEANet 编码器以分层下采样比 <span class=\"kb-math kb-math-inline\">[8, 6, 5, 4]</span> 或 <span class=\"kb-math kb-math-inline\">[12, 8, 5, 4]</span> 将 24 kHz 音频压缩到 12.5 Hz 或 6.25 Hz</li>\n<li><strong>向量量化层</strong>：语义 VQ（codebook size 2048, dim 1024）+ 31 层声学 RVQ（codebook size 2048, dim 256）</li>\n<li><strong>因果 Transformer</strong>：8 层、8 头、dim 512 的因果 Transformer 增强解码能力</li>\n<li><strong>SEANet 解码器</strong>：将量化后的表示上采样重建为波形</li>\n</ol>\n<h5>核心算法流程</h5>\n<pre><code class=\"language-python\"># OmniCodec 编码-解码伪代码\ndef encode(audio):\n    # 语义分支：冻结的预训练编码器\n    semantic_repr = qwen3_omni_aut_encoder(audio)  # [B, T/downsample, D_sem]\n    semantic_tokens = semantic_vq(semantic_repr)     # 第1层码本, codebook=2048\n\n    # 声学分支：SEANet 编码器\n    acoustic_repr = seanet_encoder(audio)            # [B, T/downsample, D_aco]\n    acoustic_tokens = rvq(acoustic_repr, layers=31)  # 第2~32层码本\n\n    return semantic_tokens, acoustic_tokens\n\ndef decode(semantic_tokens, acoustic_tokens):\n    # 解耦适配器：独立映射语义和声学表示\n    sem_embed = adapter_semantic(semantic_vq.lookup(semantic_tokens))\n    aco_embed = adapter_acoustic(rvq.lookup(acoustic_tokens))\n\n    # 融合后送入因果 Transformer + SEANet 解码器\n    combined = sem_embed + aco_embed\n    enhanced = causal_transformer(combined)\n    waveform = seanet_decoder(enhanced)\n    return waveform\n</code></pre>\n<h5>语义-声学解耦机制</h5>\n<p>OmniCodec 的核心创新在于<strong>利用预训练多模态理解模型的语义知识</strong>来指导编解码器的第一层码本学习。</p>\n<p><strong>为什么需要解耦？</strong> 传统神经编解码器（如 EnCodec、DAC）的所有码本层级混合编码语义和声学信息，导致下游语言模型难以高效建模。理想情况下，第一层码本应捕获高层语义（如语音内容、音乐结构），后续码本逐层补充声学细节（如音色、混响）。</p>\n<p><strong>语义分支的设计</strong>：OmniCodec 选择 Qwen3-Omni 的音频理解编码器（AuT-Encoder）作为语义教师。该编码器在大规模多模态数据上预训练，具备跨语音、音乐、声音的通用语义理解能力。其输出以 12.5 Hz 的速率产生隐藏表示，通过语义向量量化器离散化为第一层码本：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{z}_{\\text{sem}} = \\text{VQ}(\\text{AuT-Encoder}(\\mathbf{x})), \\quad \\text{codebook size} = 2048</div>\n<p><strong>声学分支的设计</strong>：SEANet 编码器独立提取声学特征，经过 31 层 RVQ 逐步量化。每层 RVQ 量化前一层的残差：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{r}_0 = \\mathbf{z}_{\\text{aco}}, \\quad \\mathbf{r}_i = \\mathbf{r}_{i-1} - \\text{VQ}_i(\\mathbf{r}_{i-1}), \\quad i = 1, \\ldots, 31</div>\n<p><strong>解耦适配器</strong>：为防止语义和声学信息在解码端重新耦合，OmniCodec 设计了两个独立的适配器网络（Decoupled Adapter 1 和 Adapter 2），分别将语义量化表示和声学量化表示映射到解码器的输入空间后相加：</p>\n<div class=\"kb-math kb-math-display\">\\mathbf{h}_{\\text{dec}} = \\text{Adapter}_1(\\hat{\\mathbf{z}}_{\\text{sem}}) + \\text{Adapter}_2(\\hat{\\mathbf{z}}_{\\text{aco}})</div>\n<div class=\"key-point\">💡 <strong>关键</strong>：解耦适配器的存在至关重要。消融实验表明，移除 Adapter 1 会导致 PPL 略微上升且重建指标下降，说明独立的映射路径有效防止了语义信息被声学细节\"淹没\"。</div>\n<h5>自引导损失（Self-Guidance Loss）</h5>\n<p>传统 VQ 训练中常见的问题是<strong>码本利用率低</strong>（codebook collapse），即大量码字从未被使用。OmniCodec 提出自引导损失来缓解这一问题。</p>\n<p>核心思想是：<strong>利用量化误差本身作为额外的监督信号</strong>。具体而言，在训练过程中，模型计算每个码本层级的量化残差，并将其作为自监督目标引导编码器产生更均匀分布的表示：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{sg}} = \\sum_{i=1}^{N} \\|\\text{sg}[\\mathbf{z}_i] - \\mathbf{e}_i\\|_2^2 + \\beta \\|\\mathbf{z}_i - \\text{sg}[\\mathbf{e}_i]\\|_2^2</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\text{sg}[\\cdot]</span> 表示停止梯度操作，<span class=\"kb-math kb-math-inline\">\\mathbf{e}_i</span> 是最近码字，<span class=\"kb-math kb-math-inline\">\\beta</span> 是承诺损失系数。自引导机制在此基础上额外引入码本间的协调信号，使得不同层级的量化器协同工作。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：消融实验显示，不使用自引导损失时，码本利用率从 0.982 降至 0.974，同时重建指标也出现轻微下降，验证了该机制对训练稳定性和码本利用率的双重贡献。</div>\n<h5>训练细节与损失函数</h5>\n<p>OmniCodec 的总训练损失包含多个组件：</p>\n<div class=\"kb-math kb-math-display\">\\mathcal{L}_{\\text{total}} = \\lambda_t \\mathcal{L}_{\\text{time}} + \\lambda_f \\mathcal{L}_{\\text{freq}} + \\lambda_g \\mathcal{L}_{\\text{GAN}} + \\lambda_{\\text{feat}} \\mathcal{L}_{\\text{feat}} + \\lambda_{\\text{vq}} \\mathcal{L}_{\\text{vq}} + \\lambda_{\\text{sem}} \\mathcal{L}_{\\text{sem}} + \\lambda_{\\text{sg}} \\mathcal{L}_{\\text{sg}}</div>\n<p>各损失项说明：\n- <strong><span class=\"kb-math kb-math-inline\">\\mathcal{L}_{\\text{time}}</span></strong>：时域 L1 损失，约束波形重建\n- <strong><span class=\"kb-math kb-math-inline\">\\mathcal{L}_{\\text{freq}}</span></strong>：多分辨率 STFT 频域损失\n- <strong><span class=\"kb-math kb-math-inline\">\\mathcal{L}_{\\text{GAN}}</span></strong>：对抗损失（使用多尺度判别器），提升感知质量\n- <strong><span class=\"kb-math kb-math-inline\">\\mathcal{L}_{\\text{feat}}</span></strong>：判别器特征匹配损失\n- <strong><span class=\"kb-math kb-math-inline\">\\mathcal{L}_{\\text{vq}}</span></strong>：向量量化承诺损失\n- <strong><span class=\"kb-math kb-math-inline\">\\mathcal{L}_{\\text{sem}}</span></strong>：语义蒸馏损失，约束第一层码本对齐预训练语义表示\n- <strong><span class=\"kb-math kb-math-inline\">\\mathcal{L}_{\\text{sg}}</span></strong>：自引导损失</p>\n<p>训练配置：\n- 全局 batch size 24，梯度累积 2，4 × A100 GPU\n- AdamW 优化器，峰值学习率 1e-4，2.5K 步线性预热 + 500K 步余弦衰减\n- 模型约 134M 参数\n- 训练数据：160K 小时（Emilia 语音数据集 + 内部数据集 + AudioSet）\n- 量化器 dropout 用于 RVQ 层，支持可变比特率</p>\n<h5>与现有方法的对比</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>EnCodec/DAC</th>\n<th>Mimi codec</th>\n<th>OmniCodec</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>语义-声学解耦</td>\n<td>❌ 混合编码</td>\n<td>✅ WavLM 蒸馏</td>\n<td>✅ Qwen3-Omni 蒸馏</td>\n</tr>\n<tr>\n<td>支持领域</td>\n<td>主要语音</td>\n<td>语音为主</td>\n<td>语音+音乐+通用声音</td>\n</tr>\n<tr>\n<td>语义教师</td>\n<td>无</td>\n<td>WavLM（语音专用）</td>\n<td>Qwen3-Omni-AuT-Encoder（全域）</td>\n</tr>\n<tr>\n<td>自引导机制</td>\n<td>❌</td>\n<td>❌</td>\n<td>✅</td>\n</tr>\n<tr>\n<td>因果 Transformer</td>\n<td>❌</td>\n<td>✅</td>\n<td>✅</td>\n</tr>\n<tr>\n<td>最低帧率</td>\n<td>75 Hz</td>\n<td>12.5 Hz</td>\n<td>6.25 Hz</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 <strong>关键区别</strong>：Mimi codec 使用 WavLM 作为语义教师，WavLM 基于 BERT 架构和掩码自监督学习，在语音领域的语义捕获能力极强，但在音乐和通用声音领域泛化有限。OmniCodec 选择 Qwen3-Omni 的音频编码器作为教师，该模型在多模态理解任务上预训练，天然具备跨领域语义理解能力。实验表明，OmniCodec 在音乐和通用声音的 PPL 指标上优于 Mimi，但在纯语音领域略逊，这与 WavLM 在语音精细语音学特征上的优势一致。</div>\n<h5>实验结果亮点</h5>\n<p><strong>重建质量</strong>（LibriSpeech test-clean，16 层 RVQ）：\n- OmniCodec-16L 在 PESQ（3.04）、STOI（0.941）上均优于 Mimi codec-16L（PESQ 2.59, STOI 0.924）\n- 主观评测 N-MOS 达 3.86±0.06，显著优于 Mimi 的 3.51±0.07</p>\n<p><strong>语义保持</strong>（LLM PPL 评测）：\n- 音乐领域 PPL0：OmniCodec 4.14 vs Mimi 4.43\n- 通用声音领域 PPL0：OmniCodec 3.32 vs Mimi 3.74\n- 语音领域 PPL0：OmniCodec 10.02 vs Mimi 8.73（Mimi 因 WavLM 优势略优）</p>",
      "quiz": {
        "q": "OmniCodec 中自引导损失（Self-Guidance Loss）的主要作用是什么？",
        "options": [
          "提升语义分支的语义捕获能力",
          "提高码本利用率并稳定训练过程",
          "加速模型收敛速度",
          "降低模型参数量以提升推理效率"
        ],
        "answer": 1,
        "explain": "自引导损失利用码本自身的量化误差信号引导训练，使码本利用率从 0.974 提升至 0.982，同时稳定训练过程并轻微改善重建指标。"
      }
    },
    {
      "id": "uniaudio2",
      "num": 29,
      "name": "UniAudio 2.0",
      "fullName": "UniAudio 2.0: 统一音频语言模型 (UniAudio 2.0: A Unified Audio Language Model)",
      "year": "2026.02",
      "org": "字节跳动",
      "parent": "valle2",
      "paperUrl": "https://arxiv.org/abs/2602.04683",
      "projectUrl": "",
      "category": "tts",
      "motivation": "因子化Token统一音频框架",
      "summary": "UniAudio 2.0 的核心目标是：因子化Token统一音频框架。",
      "keyPoints": [
        "核心动机：因子化Token统一音频框架",
        "演化来源：继承或改进自 valle2",
        "代表机构：字节跳动"
      ],
      "detail": "<p>因子化Token统一音频框架</p>"
    },
    {
      "id": "fishaudio_s2",
      "num": 30,
      "name": "Fish Audio S2",
      "fullName": "Fish Audio S2: 高保真情感TTS (Fish Audio S2: High-Fidelity Emotional Text-to-Speech)",
      "year": "2026",
      "org": "Fish Audio",
      "parent": "f5tts",
      "paperUrl": "https://github.com/fishaudio/fish-speech",
      "projectUrl": "",
      "category": "tts",
      "motivation": "50+情感标签高保真TTS",
      "summary": "Fish Audio S2 的核心目标是：50+情感标签高保真TTS。",
      "keyPoints": [
        "核心动机：50+情感标签高保真TTS",
        "演化来源：继承或改进自 f5tts",
        "代表机构：Fish Audio"
      ],
      "detail": "<p>50+情感标签高保真TTS</p>"
    },
    {
      "id": "stableaudio25",
      "num": 31,
      "name": "Stable Audio 2.5",
      "fullName": "Stable Audio 2.5: 企业级音频生成 (Stable Audio 2.5: Enterprise Sound Production)",
      "year": "2026",
      "org": "Stability AI",
      "parent": "musicgen",
      "paperUrl": "https://www.stability.ai/news/stable-audio-2-5-enterprise-sound-production",
      "projectUrl": "",
      "category": "music_gen",
      "motivation": "ARC快速立体声音乐生成",
      "summary": "Stable Audio 2.5 的核心目标是：ARC快速立体声音乐生成。",
      "keyPoints": [
        "核心动机：ARC快速立体声音乐生成",
        "演化来源：继承或改进自 musicgen",
        "代表机构：Stability AI"
      ],
      "detail": "<p>ARC快速立体声音乐生成</p>"
    }
  ],
  "categories": {
    "tts": {
      "label": "文本到语音合成",
      "color": "#3B82F6"
    },
    "vocoder": {
      "label": "神经网络声码器",
      "color": "#10B981"
    },
    "voice_clone": {
      "label": "语音克隆",
      "color": "#8B5CF6"
    },
    "audio_effect": {
      "label": "音效生成",
      "color": "#F97316"
    },
    "neural_codec": {
      "label": "神经编解码器",
      "color": "#EF4444"
    },
    "music_gen": {
      "label": "音乐生成",
      "color": "#06B6D4"
    }
  },
  "projectUrls": {}
};
