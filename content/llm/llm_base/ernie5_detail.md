### ERNIE 5.0：统一自回归超稀疏 MoE

```yaml
id: "ernie5"
name: "ERNIE 5.0"
full_name: "统一自回归超稀疏 MoE (ERNIE 5.0)"
year: "2026.02"
org: "Baidu"
paper_url: "https://arxiv.org/abs/2602.04705"
category: "frontier_2026"
parent: "qwen3"
motivation: "弹性训练统一多模态MoE"
```

#### 📝 一句话总结
ERNIE 5.0 提出了从零训练的统一自回归多模态基础模型，用同一个超稀疏 MoE 主干同时处理文本、图像、视频和音频的理解与生成。它的关键增量是把所有模态压到统一 token 序列中做 Next-Group-of-Tokens Prediction，并用模态无关专家路由与弹性训练解决万亿级模型的容量、效率和部署形态问题。

#### 🎯 核心要点
- 统一建模范式：文本、图像、视频、音频都被序列化为共享 token 空间，用统一自回归目标训练，而不是给不同模态外挂独立生成器。
- 超稀疏 MoE 主干：专家池由所有模态共享，单 token 只激活很小比例专家，论文报告激活率低于 3%，以较低计算成本扩展总参数容量。
- 模态无关专家路由：router 只看统一 token 表示，不显式使用 text/image/audio/video 标签，从而允许跨模态共享专家和自发专家分工。
- 视觉生成机制：图像被视为单帧视频，使用因果 2D 多尺度 tokenizer 和膨胀后的因果 3D tokenizer，并通过 Next-Frame-and-Scale Prediction 统一图像与视频生成。
- 音频生成机制：音频由 12.5 Hz codec-style tokenizer 离散化，使用 Next-Codec Prediction 做跨 codec 维度的结构化自回归预测。
- 弹性训练：一次预训练中同时训练完整模型和深度、宽度、路由稀疏度不同的子网络，子模型可按内存、延迟、吞吐约束直接实例化。
- 训练系统设计：多模态 tokenizer 与 MoE backbone 解耦部署，避免不同模态前处理吞吐不一致拖慢整体训练。
- 后训练流程：统一预训练后接 SFT 与统一多模态强化学习，针对稀疏 MoE、多模态采样偏置、稀疏奖励和熵坍缩做稳定化设计。

#### 🔬 深入细节

![ERNIE 5.0 统一多模态架构](https://arxiv.org/html/2602.04705v1/x1.png)
*图：ERNIE 5.0 的统一自回归架构。文本、视觉和音频先被各自 tokenizer 编码并序列化，再进入共享的超稀疏 MoE backbone，路由器把不同模态 token 分发到同一个专家池。*

![ERNIE 5.0 弹性训练框架](https://arxiv.org/html/2602.04705v1/x4.png)
*图：ERNIE 5.0 的 Once-For-All 弹性训练。训练时随机改变可用层数、专家总数和每个 token 的 top-k 路由，让一个 super-network 同时支持多种部署预算。*

```python
# ERNIE 5.0 统一自回归 MoE 与弹性训练伪代码
for batch in multimodal_stream:
    # 1. 不同模态先由解耦 tokenizer 转成统一序列
    token_groups = []
    for sample in batch:
        z_text = text_tokenizer(sample.text)
        z_vision = visual_tokenizer(sample.image_or_video)   # NFSP tokens
        z_audio = audio_tokenizer(sample.audio)              # NCP codec tokens
        token_groups.append(serialize(z_text, z_vision, z_audio))

    # 2. 完整配置与弹性子配置共享同一套参数
    full_cfg = Config(depth="full", experts="all", top_k="default")
    sub_cfg = sample_elastic_config(
        depth_choices=["full", "reduced"],
        width_choices=["all_experts", "sampled_experts"],
        sparsity_choices=["default_top_k", "smaller_top_k"],
        full_probability=0.80,
    )

    # 3. 同一 Next-Group-of-Tokens 目标优化完整模型和子模型
    loss_full = next_group_loss(moe_backbone(token_groups, full_cfg))
    loss_sub = next_group_loss(moe_backbone(token_groups, sub_cfg))
    loss = loss_full + loss_sub + router_stability_terms()
    loss.backward()
    optimizer.step()
```

ERNIE 5.0 要解决的不是单一模态建模，而是“理解”和“生成”在多模态系统里长期割裂的问题。很多多模态系统以语言模型为中心，只把图像、音频或视频理解结果接入文本空间；生成端则常常依赖扩散模型、codec decoder 或专门的视频生成模块。这类 late-fusion 设计有效但会形成能力跷跷板：理解模型学到的语义不一定能约束生成细节，生成模块的训练目标也不一定反哺跨模态推理。ERNIE 5.0 的选择是更激进的，把文本、图像、视频、音频全部变成一个自回归序列问题，从预训练一开始就让所有模态共用主干、共享优化轨迹。

核心目标可以抽象成 Next-Group-of-Tokens Prediction。不同于普通语言模型每步预测一个 token，图像 patch、多尺度视觉 token 或音频 codec 往往天然以“组”的形式出现，因此 ERNIE 5.0 让模型在时间步 \(t\) 预测一个 token group \(G_t\)。一个简化写法是：

$$
\mathcal{L}_{\text{NGoT}}(\theta)=-\sum_{t=1}^{T}\sum_{j=1}^{|G_t|}\log p_{\theta}\left(g_{t,j}\mid G_{<t}, g_{t,<j}\right)
$$

这个目标的直觉是把多模态生成的空间结构和时间结构都折叠进自回归条件概率里。文本 token 是 group 的特例；图像生成时，group 可以对应某个尺度上的离散视觉 token；视频生成时，group 继续沿时间维扩展为下一帧和下一尺度；音频生成时，group 对应 codec codebook 的结构化离散码。这样做的收益是所有模态都通过同一个似然目标学习，避免“文本训练一个目标、视觉训练另一个目标、音频再训练第三个目标”的优化不一致。

主干网络采用超稀疏 MoE。对任意统一 token 表示 \(h_t\)，router 计算每个专家的分数，只选择 top-k 专家参与计算：

$$
y_t=\sum_{e\in\operatorname{TopK}(r_{\theta}(h_t),k)}\alpha_{t,e}E_e(h_t),\qquad
\alpha_{t,e}=\operatorname{softmax}_{e}\left(r_{\theta}(h_t)\right)
$$

这里最重要的设计不是 MoE 本身，而是“模态无关”。路由器不手工规定某些专家处理图像、某些专家处理语音，而是让所有 token 进入同一个专家池。论文中的专家利用率可视化显示，虽然路由规则不包含模态标签，专家仍会出现非均匀激活和功能分工：一部分专家跨文本、图像、视频和音频共享，另一部分专家对特定任务或模态更敏感。这比固定模态专家更灵活，因为模型可以在跨模态任务中复用专家，也可以在细粒度生成任务中形成专门化。

视觉管线把图像视为单帧视频。ERNIE 5.0 先训练因果 2D 多尺度图像 tokenizer，再膨胀成因果 3D 卷积 tokenizer，使图像和视频使用同一套离散化逻辑。Next-Frame-and-Scale Prediction 将图像生成表述为下一尺度预测，将视频生成表述为下一帧加下一尺度预测。这个设计保留了两种关键结构：尺度维度负责从粗到细补充视觉细节，时间维度负责跨帧一致性。论文还使用 progressive tokenizer switching，从低 bit、小词表 tokenizer 开始，再逐步切到高 bit、大词表 tokenizer，目的是先让主干学稳定的粗粒度表示，再引入更难的细节建模，降低早期训练震荡。

音频管线则使用 codec token。连续波形先被压成 12.5 Hz 的层级离散 token，理解侧用语义表示帮助语音和环境声建模，生成侧用 Next-Codec Prediction 在 codec 维度上做深度自回归。这样避免把所有 codebook 展平导致序列过长，也让模型既能捕获语音内容这种高层语义，又能保留音色、韵律和声学细节。与视觉 NFSP 类似，NCP 的本质是为非文本模态找到一种仍能被统一语言模型主干处理的 group prediction 形式。

弹性训练是 ERNIE 5.0 面向生产部署的关键机制。设完整模型为 \(M_{\theta}\)，弹性子网络由深度 \(d\)、专家宽度 \(w\)、路由稀疏度 \(k\) 决定，记为 \(M_{\theta}^{d,w,k}\)。训练时从分布 \(q(d,w,k)\) 采样子配置，并与完整模型共同优化：

$$
\mathcal{L}_{\text{elastic}}=\mathcal{L}_{\text{NGoT}}(M_{\theta})+\lambda\,\mathbb{E}_{(d,w,k)\sim q}\left[\mathcal{L}_{\text{NGoT}}(M_{\theta}^{d,w,k})\right]
$$

论文中深度、宽度和稀疏度的弹性通常以 80% 保持完整配置、20% 采样缩减配置的方式训练。深度弹性让部分样本跳过层，宽度弹性让部分样本只从专家子集路由，稀疏度弹性让 top-k 在较小范围内采样。这个训练不是事后剪枝，而是在预训练期间让参数学会在不同资源预算下工作。论文报告，在推理时把路由 top-k 降到 25% 可获得超过 15% 的解码加速且精度损失较小；联合深度、宽度和稀疏度后，弹性变体只用 53.7% 激活参数和 35.8% 总参数仍保持接近完整模型的平均表现。

训练系统层面，ERNIE 5.0 还把 tokenizer 与 backbone 解耦。视觉和音频 tokenizer 的计算模式与 MoE 主干差异很大，如果强行放在同一批 GPU 上，会因为模态混合比例变化产生资源空转和负载不均。论文采用 tokenizer-backbone disaggregation，把 tokenizer 作为独立、可水平扩展的服务部署，backbone 通过远程调用拿到编码结果。这是统一多模态训练容易被忽视但很关键的一点：方法上统一不代表系统上完全同构，真正能稳定扩展到万亿级参数，需要把异构前处理和稀疏主干的吞吐边界分开优化。

与传统多模态模型相比，ERNIE 5.0 的创新不在于某一个单点模块，而在于把目标函数、专家路由、视觉生成、音频生成、弹性部署和训练系统对齐到同一个原则：统一序列化、统一自回归、共享专家池、按预算可伸缩。这样的设计牺牲了一些模块化系统的简单性，但换来了端到端跨模态表示学习，以及在同一检查点上派生不同延迟和显存版本的能力。

> 💡 关键：ERNIE 5.0 的“统一”不是把多个模型拼在一起，而是让所有模态从预训练开始就在一个共享自回归 MoE 主干内竞争、协作和分工。

#### 🧪 练习题
```yaml
question: "ERNIE 5.0 中模态无关专家路由的主要作用是什么？"
options:
  - "为每种模态固定分配一组专家，避免专家共享"
  - "只根据统一 token 表示选择专家，让跨模态共享和专家专门化自然出现"
  - "把图像和音频都转换成文本描述后再训练语言模型"
  - "用稠密 FFN 替代 MoE，以减少路由不稳定性"
answer: 1
explain: "论文强调 router 不使用显式模态标签，而是基于统一 token 表示路由到共享专家池，从而同时支持跨模态共享和任务驱动的专家分化。"
```
