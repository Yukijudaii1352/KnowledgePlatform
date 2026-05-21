### PaLM-E

```yaml
id: palm_e
name: PaLM-E
full_name: 具身多模态语言模型 (PaLM-E)
year: '2023.03'
org: Google Research / TU Berlin
paper_url: https://arxiv.org/abs/2303.03378
category: vlm_finetune
parent: —
motivation: 562B参数多模态观察注入LLM嵌入空间
```

#### 📝 一句话总结
PaLM-E 把连续视觉观测和机器人状态编码成一串可插入语言模型上下文的“具身 token”，让超大语言模型直接在同一个自回归序列里同时吸收互联网语义知识和机器人实时感知，从而兼顾 VQA、规划和具身控制。

#### 🎯 核心要点
- 提出 **PaLM-E**：把图像、状态和文本统一写进同一个 decoder-only language model 上下文
- 核心表示是 **embodied multimodal sentences**，即把连续观测编码成与词向量同空间的 token 序列
- 通过投影网络把 **视觉 encoder / state encoder** 的输出注入到 PaLM 嵌入空间
- 模型既在机器人数据上训练，也在互联网视觉语言任务上训练，出现明显 **positive transfer**
- 最大模型达到 **562B** 规模，展示了“LLM 直接吸收实时具身感知”的可扩展性
- 在移动操作、桌面操作、视觉问答等任务上验证了同一模型的跨域能力

#### 🔬 深入细节
##### 核心总览图

![PaLM-E 方法图](https://palm-e.github.io/img/approach.png)
*图：PaLM-E 的整体方法。连续视觉和状态输入先被各自 encoder 编成 embedding token，再与文本 token 一起拼成 embodied multimodal sentence，送入同一个 PaLM 自回归骨干。*

##### 核心伪代码

```python
# PaLM-E: inject continuous observations into a language-model token stream

def build_embodied_sentence(image, state, text_prompt):
    image_tokens = vision_projector(vision_encoder(image))
    state_tokens = state_projector(state_encoder(state))
    text_tokens = text_tokenizer(text_prompt)
    return concat(image_tokens, state_tokens, text_tokens)

sequence = build_embodied_sentence(obs.image, obs.state, instruction)
output_tokens = palm_decoder(sequence)

if target_is_text:
    return decode_text(output_tokens)
if target_is_action:
    return action_head(output_tokens[-1])
```

##### 动机：为什么 LLM 需要“看见”而不是只接收文字描述

在 PaLM-E 之前，大语言模型与机器人结合的常见做法是：先由感知系统把视觉和状态压成文本描述，再把这些文字喂给语言模型做推理或规划。这种路线的问题是信息瓶颈太重。很多几何关系、视觉细节和机器人状态，一旦被文本化，就会丢失大量可用于控制的细粒度信息。

PaLM-E 的关键判断是：既然 Transformer 本质上处理的是 token 序列，那么 token 不一定非得来自离散词表，也可以来自连续传感器编码。只要这些连续 embedding 被投影到语言模型可消费的嵌入空间，它们就能像“词”一样进入上下文。

于是，PaLM-E 不再让外部感知模块先写一段描述再转交给 LLM，而是让图像 patch、机器人状态和自然语言一起构成一个真正的具身上下文。这一步把 LLM 从“读文本的推理器”推进到了“读传感器的具身推理器”。

##### 核心机制一：embodied multimodal sentences

设语言 token 为 \(t_1,\dots,t_n\)，视觉 encoder 和状态 encoder 产生的连续表示分别为 \(x^{\text{img}}_1,\dots,x^{\text{img}}_m\) 与 \(x^{\text{state}}_1,\dots,x^{\text{state}}_k\)。PaLM-E 用投影器把这些连续向量映射到与词向量同维的嵌入空间：

$$
e_i^{\text{img}} = W_{\text{img}} x_i^{\text{img}}, \qquad
e_j^{\text{state}} = W_{\text{state}} x_j^{\text{state}}
$$

然后直接把它们与文本 token embedding 串接成一个序列：

$$
[e_1^{\text{img}}, \dots, e_m^{\text{img}},
 e_1^{\text{state}}, \dots, e_k^{\text{state}},
 e(t_1), \dots, e(t_n)]
$$

论文把这种输入称为 **embodied multimodal sentences**。它的重要性在于，语言模型看到的不再只是“场景描述文本”，而是场景本身的连续表示。这使模型在同一个上下文窗口里同时拥有几何、视觉、语义和任务信息。

##### 核心机制二：单个骨干同时做互联网任务和机器人任务

PaLM-E 的另一个重要设计是联合训练。模型并不是只在机器人轨迹上训练，而是同时保留大规模视觉语言任务，如 VQA 和 captioning。这样做不是简单为了“多任务更大”，而是为了利用互联网数据维持语言和视觉常识，同时用机器人数据把这些常识拉回到行动相关的 grounded 表示上。

从训练角度看，本质仍然是一个自回归语言模型目标：

$$
\mathcal{L}
= -\sum_{t} \log p_\theta(y_t \mid y_{<t}, x_{\text{img}}, x_{\text{state}}, \text{text})
$$

区别在于条件前缀已经包含连续感知 token。论文观察到，这种训练不仅没有破坏原有视觉语言能力，反而出现明显正迁移。例如加入机器人数据后，模型在 OK-VQA 等任务上还能继续收益；反过来，保留 web-scale 视觉语言训练也能改善具身推理与规划。

> 💡 关键：PaLM-E 不是把机器人问题专门化，而是把机器人观测“语言模型化”，从而让互联网知识和具身数据在同一个骨干里发生迁移。

##### 核心机制三：为什么它会影响后来的 VLA

PaLM-E 不一定是第一个把多模态放进 LLM 的模型，但它是最早明确把 **机器人状态** 也当成一等公民 token 注入超大语言模型的工作之一。这直接影响了后续很多 VLA 的设计方向：一部分方法继续沿用“先投影成 token 再自回归”这条路；另一部分方法虽然换成扩散或 flow action head，但仍保留“共享大骨干吸收视觉、语言和动作上下文”的思路。

它和 Gato 的差别也很清楚。Gato 更强调“所有东西都离散化成统一 token 序列”；PaLM-E 则强调“连续感知 embedding 可以原生注入大语言模型”。这让后者更适合承接大规模语言模型的语义能力和互联网知识。

##### 结果怎么看：它把 LLM 真正推到了机器人感知回路里

PaLM-E 最有价值的地方不是某一个 benchmark 分数，而是它把“语言模型读连续传感器”这件事做成了一个可扩展范式。最大 562B 的结果说明，随着模型变大、训练域变广，具身任务并不会天然与语言任务冲突，反而可能持续互补。这就是为什么后续很多 VLA 都可以被看作是在更高效、更强控制约束下对 PaLM-E 思路的再工程化。

#### 🧪 练习题

```yaml
question: "PaLM-E 中 embodied multimodal sentences 的关键作用是什么？"
options:
  - "把连续视觉和状态编码投影成可直接插入语言模型上下文的 token"
  - "强制把所有机器人观测先转成自然语言描述再送入模型"
  - "让动作生成完全脱离语言模型骨干独立训练"
  - "只保留机器人数据，去掉互联网视觉语言训练"
answer: 0
explain: "PaLM-E 的核心就在于把连续感知编码成与词向量同空间的 token 序列，直接拼进语言模型上下文，让同一个骨干同时使用语言和实时感知。"
```
