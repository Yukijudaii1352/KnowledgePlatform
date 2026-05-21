### Gato

```yaml
id: gato
name: Gato
full_name: 通用智能体 (Gato)
year: '2022.05'
org: DeepMind
paper_url: https://arxiv.org/abs/2205.06175
category: transformer_policy
parent: —
motivation: 单一Transformer处理600+多形态任务
```

#### 📝 一句话总结
Gato 把文本、图像、本体感觉和动作全部序列化成同一种 token 序列，用单个 1.2B decoder-only Transformer 在 600+ 任务上联合训练，证明“单一权重通吃多模态、多任务控制”是可行的。

#### 🎯 核心要点
- 提出 **Gato**：一个统一处理文本、视觉和控制的通用序列模型
- 使用 **1.2B 参数 decoder-only Transformer**，而不是为不同任务定制不同网络
- 把文本、图像 patch、离散动作和连续动作都映射成统一 token 序列
- 训练覆盖 **600+ 任务 / 604 个 benchmark 实例**，包括对话、图像描述、Atari、DMControl 和真实机器人抓取
- 采用 **prompted policy** 形式，用成功示范作为上下文条件化当前任务
- 损失只监督 **文本 token 和动作 token**，观测 token 只作为条件输入

#### 🔬 深入细节
##### 核心总览图

![Gato 总览图](https://ar5iv.labs.arxiv.org/html/2205.06175/assets/x1.png)
*图：Gato 论文 Figure 1。单一 Transformer 接收不同模态和任务的 token 序列，输出文本或动作 token，展示了从聊天到 Atari 再到真实机械臂控制的统一接口。*

##### 核心伪代码

```python
# Gato: flatten everything into one autoregressive token stream

def tokenize_step(observation, action=None):
    obs_tokens = tokenize_text_image_state(observation)
    if action is None:
        return obs_tokens
    act_tokens = tokenize_action(action)
    return obs_tokens + [SEP] + act_tokens

context = tokenize_success_demo(demo)[:1024]

for t in rollout:
    context += tokenize_step(current_observation)
    action_tokens = autoregressive_decode(transformer, context, n_tokens=action_token_count)
    action = detokenize_action(action_tokens)
    execute(action)
    context += action_tokens
```

##### 动机：为什么要把所有任务都改写成语言模型问题

Gato 的出发点与同时期大多数机器人论文不同。它并不先问“怎么为 Atari 设计一个网络，怎么为机械臂再设计一个网络”，而是先问：如果大模型真正学到的是序列建模能力，那么文本、图像、动作乃至机器人本体感觉，能不能都被改写成一个统一的 next-token prediction 问题？

这个问题的重要性在于，一旦答案是肯定的，通用智能体就不再依赖任务专用结构。模型不需要知道当前是在玩游戏、写文字还是控制机械臂，它只需要根据前缀上下文继续生成最可能的下一个 token。这样，多任务学习的核心就从“多头结构设计”变成了“如何把异构数据稳定地序列化”。

Gato 因而更像一个“序列接口标准”而不是单纯的控制模型。它为后来的 VLA/通用策略路线留下了一个很直接的启示：只要 token 化和训练目标设计得足够统一，跨模态共享一个骨干网络是可能的。

##### 核心机制一：统一 token 化

论文对不同模态采用了统一但并不完全相同的 token 化策略。文本走 SentencePiece；图像被切成 \(16 \times 16\) patch 并映射为连续 embedding；离散动作本身就是离散 token；连续值和连续动作则先做 \(\mu\)-law 压缩，再量化成 1024 个 bins。

如果记原始连续值为 \(x\in[-1,1]\)，其 \(\mu\)-law 压缩形式可写成：

$$
\mathrm{muLaw}(x)=\operatorname{sign}(x)\frac{\ln(1+\mu |x|)}{\ln(1+\mu)}
$$

压缩后的值再被量化成离散桶，统一进入 Transformer。这样做的关键收益是：网络不需要为连续控制额外配一个回归头，而是继续做它最熟悉的离散 token 预测。

##### 核心机制二：只监督动作和文本输出

Gato 的训练目标不是对所有 token 都算损失。图像 patch、本体感觉等观测 token 只作为条件输入，不是要预测的目标；真正被监督的是文本 token 和动作 token。论文中的掩码交叉熵可以写成：

$$
\mathcal{L}(\theta)
= - \sum_b \sum_l m(b,l)\log p_\theta\!\left(s_l^{(b)} \mid s_{<l}^{(b)}\right)
$$

其中 \(m(b,l)=1\) 只在第 \(l\) 个 token 属于文本或动作时成立。直觉上，这让模型把容量集中在“该说什么”和“该做什么”上，而不是浪费在重建高维观测上。

> 💡 关键：Gato 不是多模态自编码器，它的本质依然是一个条件生成器，只不过条件前缀被扩展成了多模态轨迹。

##### 核心机制三：示范式 prompt conditioning

Gato 不是用固定 task id 条件化，而是直接把成功示范作为 prompt。模型先读入一段成功 episode 的 token，再在当前任务上下文里继续生成动作。这样带来两个效果：第一，不同任务天然可以通过上下文切换；第二，少样本适应可以被表述成“给更多合适前缀示范”。

这件事与后来很多 in-context robot policy 的思路高度一致。它说明即便在没有显式任务头的情况下，Transformer 也可以把“当前正在做什么”编码进前缀上下文。

##### 结果怎么看：Gato 解决的是“统一接口”问题

Gato 不是当时每个单项 benchmark 上最强的专家，但它完成了一件更重要的事：用单个 1.2B 模型覆盖了 600+ 个不同任务域，并且还能实时控制真实机器人。它最深的影响不在某个具体成功率，而在于它证明了“文本、视觉、动作可以进入同一个自回归骨干”这一点。这条路后来被 RT-1、RT-2、PaLM-E 以及更系统的 VLA 工作不断放大。

#### 🧪 练习题

```yaml
question: "Gato 训练时为什么只对文本 token 和动作 token 计算损失？"
options:
  - "因为图像 token 不能输入 Transformer"
  - "因为观测 token 主要作为条件前缀，模型重点学习输出什么文本和动作"
  - "因为连续动作已经通过回归头单独优化，不需要 token 损失"
  - "因为这样可以完全避免上下文长度限制"
answer: 1
explain: "Gato 把图像和状态 token 当作条件输入，真正要学习预测的是文本和动作输出。这样能把模型容量集中到决策和生成上，而不是重建观测。"
```
