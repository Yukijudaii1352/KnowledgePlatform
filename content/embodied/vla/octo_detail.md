### Octo

```yaml
id: octo
name: Octo
full_name: 开源通用机器人策略 (Octo)
year: '2024.05'
org: UC Berkeley / Stanford / CMU / Google DeepMind
paper_url: https://arxiv.org/abs/2405.12213
category: diffusion_flow
parent: roboagent
motivation: 开源通用策略支持扩散动作头
```

#### 📝 一句话总结
Octo 提出了一种面向多机器人、多传感器和多动作空间的开源通用机器人策略，通过模块化 token 化输入、block-wise masked Transformer 和单次主干前向配合扩散动作头，实现可扩展预训练与高效下游微调。

#### 🎯 核心要点
- 提出 **Octo**：一个专门为开放式通用机器人策略设计的 **transformer-based diffusion policy**
- 预训练数据来自 **Open X-Embodiment** 中筛选出的 **25 个数据集、800k 条机器人轨迹**
- 模型由 **输入 tokenizer + Transformer backbone + readout/action head** 三段组成
- 支持 **language instruction** 和 **goal image** 两种任务定义方式，并支持观测历史输入
- 使用 **block-wise masked attention**，让任务 token 与观测 token 在变模态、变传感器场景下仍可稳定拼接
- 引入 **readout token**，只读不写地从主干抽取动作条件表征，避免影响输入 token 的内部表示
- 动作头采用 **conditional diffusion decoding**，只需 **一次 Transformer 前向**，后续多步去噪全部在小扩散头内完成
- 强调 **efficient finetuning**：可在微调时新增观测模态、改动作空间、换机器人形态，而保留大部分预训练主干
- 提供两版模型：**Octo-Small 27M** 与 **Octo-Base 93M**

#### 🔬 深入细节
##### 核心总览图

![Octo 官方总览图](https://arxiv.org/html/2405.12213v2/x1.png)
*图：Octo 论文 Figure 1。模型目标不是只做单一机器人策略，而是作为可复用的通用策略初始化，在多机器人、多任务、多动作空间场景中开箱可用并可快速微调。*

##### 核心架构图

![Octo 架构图](https://arxiv.org/html/2405.12213v2/x2.png)
*图：Octo 论文 Figure 2。左侧是任务和观测 token 化，中间是 block-wise Transformer，右侧是 readout token 与扩散动作头；底部展示了微调时新增观测和动作头的方式。*

##### 核心伪代码

```python
# Octo: tokenization -> block-wise transformer -> readout -> diffusion action head

T_task = tokenize_task(language=instruction, goal_image=goal_image)   # T5 + image patches
T_obs = tokenize_observation(obs_history)                             # shallow CNN patch tokens

tokens = concat(T_task, T_obs, readout_tokens())
mask = build_blockwise_mask(tokens)                                   # task global, obs causal

emb = transformer(tokens, attention_mask=mask)                        # single backbone pass
e = emb.readout_suffix                                                # passive readout tokens

# diffusion action decoding
x_k = gaussian_noise(shape=action_chunk_shape)
for k in reversed(range(K)):
    eps = diffusion_head(x_k, e, k)
    x_k = alpha[k] * (x_k - gamma[k] * eps + sigma[k] * randn_like(x_k))

action_chunk = x_k
execute(action_chunk)
```

##### 动机：为什么通用机器人策略不能只固定一种输入和动作格式

Octo 要解决的问题很具体。已有通用机器人策略虽然已经展示出一定跨任务和跨环境能力，但它们通常把下游用户锁死在预训练时见过的输入模态和动作空间里。比如一个模型如果只在固定第三视角 RGB、固定末端位姿控制上训练，那么遇到新的腕部相机、力传感器或关节控制动作空间时，往往就得重做大部分模型设计。对一个真正可复用的通用策略来说，这种刚性是不够的。

因此 Octo 不是单纯追求更大的机器人策略，而是把“可适配性”作为第一目标来设计。论文一开始就明确要求模型必须支持不同机器人、不同传感器组合、不同任务定义方式，以及可在消费级 GPU 上快速微调。换句话说，Octo 的重点不是“零样本直接统治一切”，而是提供一个广泛可复用的策略底座，让下游机器人项目不必从头训练。

> 💡 关键：Octo 的设计中心不是极限 zero-shot，而是“统一预训练 + 低成本适配”。这也是它和很多更封闭、更固定规格 VLA 的根本差别。

##### 核心机制一：统一 token 化与 block-wise masked Transformer

Octo 的输入分成任务定义和观测两类。语言指令先经过分词，再送入 **T5-base (111M)** 得到语言 embedding tokens；图像观测和目标图像先经过浅层卷积栈，再切成 patch token。论文没有采用“重视觉编码器 + 小 Transformer”的常见路线，而是刻意使用 **shallow CNN + transformer-first** 设计，把大部分参数和 FLOPs 放在主干 Transformer 中统一处理。

如果记任务 token 为 \(T_T\)，观测 token 为 \(T_{o,t}\)，那么主干输入可以写成按时间顺序拼接的序列：

$$
[T_T,\; T_{o,1},\; T_{o,2},\; \dots]
$$

关键不只是 token 化，而是 **block-wise masked attention**。观测 token 只能因果地关注同一时刻或更早时刻的观测，以及所有任务 token；而不存在的观测模态则被完全 mask 掉。这使模型在训练和微调时可以自然处理“有的机器人有腕部相机、有的没有”“有的数据带语言标注、有的没有”这种真实异构数据问题。

这种掩码设计的价值在于它让主干 Transformer 的输入语法保持稳定，但又允许模态组合变化。相比固定输入顺序、固定模态数量的策略架构，Octo 的 backbone 更接近一个可扩展的多模态操作系统。

##### 核心机制二：readout token 与被动读取动作条件

Octo 一个很有辨识度的设计是 **readout token**。在任务和观测 token 之外，模型额外插入可学习的 \(T_{R,t}\)。它们的注意力规则是不对称的：readout token 可以看前面的任务和观测 token，但任务和观测 token 不会反过来看它们。论文明确强调，这意味着 readout token 只能 **passively read** 内部表示，而不会污染输入 token 的处理过程。

这件事看似细节，实际上很重要。因为如果动作 token 或输出 token 参与双向耦合，它们可能会改变主干中任务与观测的联合表示，使微调到新动作头时更容易破坏预训练结构。现在 readout token 只负责从现有表示里“抽取”一个适合动作解码的压缩向量 \(e\)，再交给输出头：

$$
e = T(T_l, T_g, T_o), \qquad a = R(e)
$$

其中 \(T(\cdot)\) 表示主干 Transformer，\(R(\cdot)\) 表示动作 readout head。直觉上，这等于把“理解输入”和“产生动作”做了一个轻量解耦。输入主干尽量保持通用，而动作输出则通过 readout suffix 单独适配。

> ⚠️ 注意：readout token 不是普通的 `[CLS]` 复刻。它的重点不是做分类聚合，而是给后续动作头提供一个不干扰主干 token 交互的输出接口。

##### 核心机制三：单次主干前向 + 条件扩散动作头

Octo 在动作建模上没有走简单的 MSE 回归，也没有走纯离散动作 token，而是用了 **conditional diffusion decoding head**。论文强调，一个动作预测只需要 **一次 Transformer backbone 前向**；得到 readout embedding \(e\) 之后，多步去噪都在小型扩散头里完成，不再重复调用昂贵的主干。

如果从高斯噪声 \(x_K \sim \mathcal{N}(0, I)\) 开始，那么其动作去噪过程写成：

$$
x_{k-1} = \alpha \bigl(x_k - \gamma \,\epsilon_\theta(x_k, e, k) + \mathcal{N}(0, \sigma^2 I)\bigr)
$$

这里 \(\epsilon_\theta(x_k, e, k)\) 是由扩散头预测的噪声，条件是当前噪声动作、步数索引 \(k\) 和 readout embedding \(e\)。论文使用标准 cosine noise schedule，并用标准 DDPM 目标训练扩散头，即对真实动作加高斯噪声，再训练去噪网络恢复原始动作。

这条路线的直觉是：机器人动作往往是连续、多峰而且存在策略多样性的。单一 MSE 容易学成“平均动作”，离散化又容易牺牲连续控制精度。扩散头在保持连续动作质量的同时，也能表达多模态动作分布。论文实验中，扩散动作头同时优于 MSE 头和离散动作预测头。

##### 核心机制四：训练数据配方与高效微调

Octo 的预训练并不是把整个 Open X-Embodiment 生吞进去，而是筛选出 **25 个**带图像观测、末端增量动作且行为足够多样的子数据集，总计 **800k** 轨迹。数据混合时，作者会去掉过于重复、分辨率过低或任务过窄的数据集，并对更丰富的数据集加权，同时对过大的单一数据集降权。对于缺失相机通道的样本，模型使用 zero-padding；对于不同数据集的夹爪动作，则统一到“`+1 = open, 0 = closed`”的约定。

更重要的是，Octo 的微调机制和架构是匹配的。论文明确说明：当下游需要加入新任务、新观测或新损失时，可以保留预训练 Transformer，只新增位置编码、轻量 encoder 或新的输出 head。实际微调时，作者发现 **全模型更新** 比只训动作头效果更好，但由于主干结构稳定、输入输出接口模块化，整个过程仍然很高效。论文给出的标准配方是：约 **100 条 in-domain 轨迹**、**50k steps**、统一超参数、单张 **NVIDIA A5000 24GB** 约 **5 小时**。这正是 Octo 被称为“广泛适用”的关键原因。

##### 结果怎么看：它解决的是“可复用初始化”问题

在论文正文中，Octo 的主实验覆盖 **3 个机构的 6 个真实机器人 setup**，同时测试 zero-shot 和 data-efficient finetuning。项目页则把这些实验与额外展示合并成 **4 个机构的 9 个真实机器人 setup** 总览。对方法本身来说，更重要的是结果形态：zero-shot 时，Octo 对开放可得的 RT-1-X 具备明显优势，并在部分任务上接近 55B 的 RT-2-X；微调时，在 6 个 evaluation setups 上，Octo 平均比次优基线高 **52%**，而且还能适配新观测输入和新动作空间。

因此，对 Octo 的最好理解不是“它是最强 zero-shot VLA”，而是“它第一次把通用机器人策略做成了一个真正能被社区拿来继续训练和迁移的开源底座”。从后续 `OpenVLA`、`π0` 到更多开源 VLA 的发展看，Octo 最大的价值正在于这条路径被验证为可行。

#### 🧪 练习题

```yaml
question: "Octo 中 readout token 的核心作用是什么？"
options:
  - "让动作 token 反向影响观测 token，从而增强控制闭环"
  - "作为只读接口从任务和观测表示中提取动作条件，并交给动作头解码"
  - "把连续动作离散成文本 token，便于使用交叉熵训练"
  - "替代任务 token，使模型不再需要语言或目标图像输入"
answer: 1
explain: "Octo 的 readout token 能读取前面的任务和观测 token，但不会被它们反向关注。它的作用是从主干中抽取动作条件表示，供扩散动作头解码，而不是改变输入 token 的内部计算。"
```
