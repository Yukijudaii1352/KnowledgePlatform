### UniVLA

```yaml
id: univla
name: UniVLA
full_name: 统一视觉语言动作 (UniVLA)
year: '2025.06'
org: CASIA / BAAI / THU / HKISI
paper_url: https://arxiv.org/abs/2506.19850
category: vlm_finetune
parent: openvla
motivation: 统一视觉语言动作Token化，并用world model后训练增强长程策略学习
```

#### 📝 一句话总结
UniVLA 提出了一种原生统一的视觉-语言-动作建模范式，把图像、指令和动作全部离散成共享词表里的 token 序列，并通过 world model 后训练先学视频动态、再学动作策略，从而显著提升长程任务和跨任务泛化能力。

#### 🎯 核心要点
- 提出 **UniVLA**：把视觉、语言、动作统一表示为共享词表中的离散 token，并用单个自回归 Transformer 建模
- 采用 **统一多模态序列**：指令、图像、动作按时间交错排列，显式保留 MDP 中的因果与时序结构
- 图像使用 **VQ tokenizer** 离散化，动作使用 **FAST** 的 **DCT 频域离散化**
- 使用 `boi/eoi/boa/eoa` 特殊 token 显式标记图像与动作边界
- 提出 **两阶段训练**：先做仅监督视觉 token 的 **world model post-training**，再做仅监督动作 token 的 **policy fine-tuning**
- 统一框架同时支持 **动作预测、未来视觉预测、空间 grounding** 等多模态输出任务
- 在 **CALVIN、LIBERO、SimplerEnv-Bridge** 上取得 SOTA，其中 **LIBERO 平均成功率 95.5%**
- 进一步展示了在 **ALOHA 真实机器人** 和 **自动驾驶 NAVSIM** 上的迁移潜力

#### 🔬 深入细节
##### 核心总览图

![UniVLA 总览图](https://robertwyq.github.io/univla.github.io/static/images/teaser_univla.png)
*图：项目页中的总览图。UniVLA 把感知、语言和控制统一到同一个 token 自回归框架里，并同时覆盖动作预测、视觉预测和空间 grounding。*

##### 核心架构图

![UniVLA 架构图](https://robertwyq.github.io/univla.github.io/static/images/univla.png)
*图：UniVLA 的统一架构。图像通过 VQ tokenizer 离散化，动作通过 FAST 的 DCT 编码离散化，之后与语言 token 一起组成交错多模态序列，由同一个自回归 Transformer 建模。*

##### 核心伪代码

```python
# UniVLA: unified tokenization + world-model post-training + policy fine-tuning

L_t = tokenize_text(instruction)
L_v = [vq_tokenize(image_t) for image_t in image_history]
L_a = [fast_dct_tokenize(action_t) for action_t in action_chunks]

S_v = [L_t[0], L_v[0], L_v[1], ..., L_v[t]]                   # world model sequence
S_a = [L_t[0], L_v[0], L_a[0], L_v[1], L_a[1], ..., L_v[t]]  # policy sequence

# stage 1: world model post-training
loss_world = cross_entropy(next_token(S_v), target='vision_tokens_only')
update(loss_world)

# stage 2: downstream policy fine-tuning
loss_policy = cross_entropy(next_token(S_a), target='action_tokens_only')
update(loss_policy)

# inference
next_action_tokens = autoregressive_decode(S_a_prefix)
action_chunk = fast_dct_decode(next_action_tokens)
```

##### 动机与背景

传统 VLA 大多沿用“语言中心”的建模路线：先用视觉编码器把图像压到语义空间，再让大语言模型基于这些视觉特征输出动作。这类设计对语义理解和指令跟随很有效，但它天然把视觉、语言和动作分成了不完全对称的三层结构。结果是，模型更像“看图后说一个动作”，而不是在统一时序里真正理解观察、动作和环境变化之间的因果关系。

UniVLA 的出发点正是反过来做这件事。论文认为，机器人交互本质上是一个 Markov 决策过程：观察会影响动作，动作又会改变下一时刻观察。如果还把视觉和动作拆成两个弱耦合阶段，那么模型就很难充分利用视频里蕴含的动态信息，也难以自然支持未来预测、空间 grounding 这类具身相关能力。因此 UniVLA 选择把视觉、语言和动作全部改写成离散 token，让它们在同一个序列空间里交错出现，由同一个 Transformer 学习。

这一步看起来只是“统一 token 化”，但真正关键的是它把 VLA 从“多模块拼装”转成了“原生多模态序列建模”。一旦三种模态共享同一建模接口，world model、policy learning、visual prediction 这些原本分散的任务就都能被写成统一的 next-token prediction 问题。后面的 world model 后训练之所以有效，根本原因也在这里。

> 💡 关键：UniVLA 不是在传统 VLA 前面多加一个视频模块，而是把整条感知到动作链条重写成统一的因果 token 序列。

##### 核心机制一：统一离散 token 化与交错序列

UniVLA 的第一步是把三种异构模态都变成离散序列。语言 token 直接沿用 VLM 体系；视觉 token 采用与 Emu3 一致的 VQ tokenizer，把图像离散成码本索引；动作 token 则沿用 FAST，把连续动作块先映射到频域，再离散成 token。论文特别强调动作不是逐时刻实值回归，而是先做 **Discrete Cosine Transform (DCT)** 编码，再表示成可变长度的离散 token 序列。

如果用 \(L_t\)、\(L_v\)、\(L_a\) 分别表示语言、视觉、动作 token 序列，那么 UniVLA 的核心对象不是单独某一种模态，而是统一多模态序列 \(L\)。在策略学习场景中，序列按时间交错为：

$$
S_a = \{L_t^1, L_v^1, L_a^1, L_v^2, L_a^2, \dots, L_v^t, L_a^t\}
$$

而在 world model 阶段，动作位置被“未来视觉”替代，写成：

$$
S_v = \{L_t^1, L_v^1, L_v^2, \dots, L_v^t\}
$$

这里的设计很重要，因为它不是简单把多种 token 拼起来，而是通过交错顺序保留了任务执行中的因果结构。当前图像之后接什么，决定了模型究竟在学习“下一步动作”还是“下一帧世界状态”。配合 `boi/eoi/boa/eoa` 等特殊边界 token，模型就能在统一语法下识别不同模态片段。

##### 核心机制二：把 world model 后训练接到 VLA 之前

UniVLA 最有辨识度的点，不是统一 token 化本身，而是它把 **world model post-training** 作为策略学习前的关键阶段。作者观察到，很多 VLA 只在有动作标注的机器人数据上学策略，但这会严重限制模型对时序动态和因果结构的理解，也无法充分利用大规模无动作视频。于是 UniVLA 先用 world model 目标，让模型在只有文本与视频的情况下学习“看到当前状态和任务后，未来会发生什么”。

这一步训练时，损失只计算在视觉 token 上，本质上是在做条件未来视觉预测。可以把训练目标理解为标准自回归交叉熵：

$$
\mathcal{L}_{\text{world}} = - \sum_{i \in \mathcal{V}} \log p(x_i \mid x_{<i})
$$

其中 \(\mathcal{V}\) 表示视觉 token 位置集合。这样做的直觉是：模型必须先学会环境如何随任务和上下文演化，之后再学“应该输出什么动作”就会更容易。论文的消融结果也支持这一点。world model 后训练相比 action-only 或单纯 text-to-image、video-only 训练，对长程任务和泛化都有更明显提升。

更关键的是，这种 world model 训练并不依赖动作标签，因此可以利用更大规模的视频数据。对 VLA 来说，这是一条很实用的扩展路径，因为互联网和机器人视频远多于高质量动作标注数据。UniVLA 的统一 token 框架恰好让这种“先学世界、再学控制”的训练顺序非常自然。

> ⚠️ 注意：论文并不是说“视觉预测本身就等于控制”，而是说明先学动态世界模型能给后续策略学习提供更强的时序和因果先验。

##### 核心机制三：统一 next-token 训练带来的多任务输出能力

当图像、语言、动作都被转成离散 token 后，UniVLA 的训练目标就被极大简化了。无论是 world model 还是 policy learning，底层都是同一个自回归 next-token prediction，只是选择不同位置计算损失。对于策略学习，损失只落在动作 token 上：

$$
\mathcal{L}_{\text{policy}} = - \sum_{i \in \mathcal{A}} \log p(x_i \mid x_{<i})
$$

其中 \(\mathcal{A}\) 表示动作 token 位置集合。也就是说，UniVLA 并不需要为视觉预测、动作生成、空间 grounding 各写一套完全不同的模型结构，它们只是“同一序列上监督位置不同”的不同任务实例。

这种设计带来的一个直接好处是，模型不再只会输出动作。论文 Figure 3 展示了 UniVLA 还能输出未来视觉预测和空间 grounding 结果，说明它在内部确实学到了一些跨模态时空结构，而不只是“从图像回归动作”的黑箱映射。对长程具身任务来说，这种能力尤其重要，因为完成长链任务往往依赖对未来状态的隐式模拟。

从结果看，这种统一范式在几个典型 benchmark 上都吃到了红利。UniVLA 在 LIBERO 上把平均成功率做到了 **95.5%**，其中 long-horizon 套件从上一阶段 SOTA 的 **69.0%** 提升到 **94.0%**；在 SimplerEnv-Bridge 上把平均成功率从 **42.7%** 拉到 **69.8%**；在 CALVIN 上也达到了更高的长程任务完成长度。对这篇工作的理解应该是：它不是简单证明“统一 token 也能做 VLA”，而是证明这种统一建模方式能更系统地把视频动态学习迁移到控制任务上。

#### 🧪 练习题

```yaml
question: "UniVLA 中 world model post-training 阶段最核心的训练信号是什么？"
options:
  - "仅对动作 token 计算损失，提前学习控制策略"
  - "仅对视觉 token 计算损失，学习由当前观察和指令条件化的未来视觉动态"
  - "同时对所有 token 等权计算损失，以避免模态偏置"
  - "只对语言 token 计算损失，提升指令理解能力"
answer: 1
explain: "UniVLA 的 world model 阶段本质是条件未来视觉预测。论文明确说明这一阶段的监督主要落在视觉 token 上，用来学习环境动态和因果结构，而不是直接学习动作。"
```
