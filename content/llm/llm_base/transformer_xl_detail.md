### Transformer-XL: Attentive Language Models Beyond a Fixed-Length Context

```yaml
title: Transformer-XL: Attentive Language Models Beyond a Fixed-Length Context
authors: Zihang Dai, Zhilin Yang, Yiming Yang, Jaime Carbonell, Quoc V. Le, Ruslan Salakhutdinov
year: 2019
url: https://arxiv.org/abs/1901.02860
conference: ACL 2019
tags: [language-modeling, transformer, long-context, recurrence, relative-positional-encoding]
```

#### 📝 一句话总结
Transformer-XL 通过在 Transformer 中引入段级循环机制（Segment-Level Recurrence）和相对位置编码（Relative Positional Encoding），解决了标准 Transformer 无法建模超出固定上下文长度的长程依赖问题，实现了比 RNN 长 80%、比普通 Transformer 长 450% 的有效上下文，评估速度提升高达 1800 倍，并在五个主流语言建模基准上取得 SOTA。

#### 🎯 核心要点
1. **问题背景**：标准 Transformer 将长文本切分为固定长度段独立训练，导致（a）最大依赖长度受限于段长，（b）简单切分造成上下文碎片化（context fragmentation），预测时虽用滑动窗口但极低效。
2. **核心创新 - 段级循环（Segment-Level Recurrence）**：训练时将前一段的隐状态固定并缓存，拼接到当前段作为扩展上下文，梯度不跨段但信息可跨段流动。
3. **核心创新 - 相对位置编码（Relative Positional Encoding）**：将绝对位置编码替换为相对位置编码，注入 Query-Key 注意力分数中，使状态复用时不发生时序混淆。
4. **评估加速**：评估时复用缓存的前段表示而非从头计算，enwiki8 上比 Vanilla Transformer 快 1800+ 倍。
5. **实验结果**：WikiText-103 PPL 从 20.5 降至 18.3；enwiki8 bpc 0.99；One Billion Word PPL 21.8；PTB PPL 54.5；text8 bpc 1.08，均为当时 SOTA。

#### 🔬 深入细节

##### 1. Vanilla Transformer 语言模型的局限性

标准方法（Al-Rfou et al., 2018）将语料切分为等长段，每段独立训练 Transformer，段间无信息流动。这带来两个关键问题：

- **最大依赖长度受限**：理论上自注意力可捕捉任意长依赖，但因段长常设数百 token（字符级约几百），实际依赖长度被硬性截断。
- **上下文碎片化（Context Fragmentation）**：简单按固定长度切分不顾语义边界，导致前段末尾和后段开头本应连续的上下文被割裂，模型在前几个位置的预测缺少足够前文。

评估时采用滑动窗口：每步右移一位重新计算整段，虽利用最长上下文但极其低效。

> **图 1（论文 Fig.1）**：Vanilla Transformer 训练时一段只预测一段（a），评估时每次只预测最后一个位置，然后整体右移一位重新计算（b）。

##### 2. 段级循环与状态复用

**核心公式。**令第 τ 段的第 n 层隐状态为 h_τ^n ∈ R^{L×d}（L 为段长，d 为隐维度）。处理段 s_{τ+1} 时，将前段第 n-1 层的隐状态缓存并拼接：

$$\tilde{h}_{τ+1}^{n-1} = [\text{SG}(h_τ^{n-1}) \;\circ\; h_{τ+1}^{n-1}]$$

其中 SG 为 stop-gradient（前段表示固定不计算梯度）。然后用 $\tilde{h}_{τ+1}^{n-1}$ 生成 Key 和 Value，用 $h_{τ+1}^{n-1}$ 生成 Query：

$$q_{τ+1}^n = h_{τ+1}^{n-1} W_q^\top,\quad k_{τ+1}^n = \tilde{h}_{τ+1}^{n-1} W_k^\top,\quad v_{τ+1}^n = \tilde{h}_{τ+1}^{n-1} W_v^\top$$

注意力计算与标准 Transformer 相同。梯度仅沿当前段回传，不跨段。

> **图 2（论文 Fig.2）**：段级循环示意图。训练时（a）前一 4-token 段（初始为紫色）的隐状态被缓存（蓝色框），拼接到当前段作为扩展上下文。评估时（b）可复用更多前段，加速显著。

**Memory 扩展。**具体实现中使用长度为 M 的 memory m_τ^n 缓存多个前段的隐状态。训练时 M = L（段长），评估时 M 可增为数倍 L，GPU 内存允许时缓存更多前文。

**评估加速。**因前段表示直接复用，enwiki8 上评估速度比 Vanilla Transformer 快 1800+ 倍。

##### 3. 相对位置编码（Relative Positional Encoding）—— 解决状态复用的关键技术

**动机。**标准 Transformer 使用绝对位置编码 U ∈ R^{L_max×d}，每段内位置 1,2,...,L 的编码固定。但引入循环后，前段位置 1 和当前段位置 1 编码相同——模型无法区分，产生时序混淆。

**重新推导。**标准 Transformer 的注意力分数（单头，忽略缩放因子）可分解为：

$$A_{i,j}^{\text{abs}} = \underbrace{E_{x_i}^\top W_q^\top W_k E_{x_j}}_{(a)} + \underbrace{E_{x_i}^\top W_q^\top W_k U_j}_{(b)} + \underbrace{U_i^\top W_q^\top W_k E_{x_j}}_{(c)} + \underbrace{U_i^\top W_q^\top W_k U_j}_{(d)}$$

Transformer-XL 将其改为基于相对距离的公式：

$$A_{i,j}^{\text{rel}} = \underbrace{E_{x_i}^\top W_q^\top W_{k,E} E_{x_j}}_{(a)} + \underbrace{E_{x_i}^\top W_q^\top W_{k,R} R_{i-j}}_{(b)} + \underbrace{u^\top W_{k,E} E_{x_j}}_{(c)} + \underbrace{v^\top W_{k,R} R_{i-j}}_{(d)}$$

**四个关键改动**：
1. **(b)(d)** 将绝对位置编码 U_j 替换为基于相对距离 i−j 的编码 R_{i−j}（可学习的正弦编码矩阵）。
2. **(c)(d)** 新增可学习向量 u 和 v 替代 U_i^\top W_q^\top，因为 Query 位置对注意力应无偏置效果——对不同位置 Query 使用相同偏置。
3. **Key 权重分拆**：W_k 分为 W_{k,E}（内容映射）和 W_{k,R}（位置映射），分别处理内容向量和位置向量。
4. **(d)** 将 U_i^\top W_q^\top W_k U_j 重构为与 Query 无关的形式 v^\top W_{k,R} R_{i-j}。

这样一来，位置信息仅依赖相对距离 i−j，前段和当前段的位置编码不再冲突，状态复用自然成立。

> **伪代码（直观理解）**：
> ```
> def rel_attn(Q, K, V, R, u, v, W_kE, W_kR):
>     A_content = Q @ (W_kE @ K).T          # (a) 内容-内容
>     A_pos    = Q @ (W_kR @ R).T           # (b) 内容-位置
>     bias_c   = u @ (W_kE @ K).T           # (c) 全局内容偏置
>     bias_p   = v @ (W_kR @ R).T           # (d) 全局位置偏置
>     return softmax(A_content + A_pos + bias_c + bias_p) @ V
> ```

##### 4. 消融实验与关键发现

**WikiText-103 消融**（Table 6）：同时使用递归机制和相对位置编码才取得最优结果。绝对位置编码仅与 "half loss"（仅对段后半位置计算损失）配合才有效，因为前半位置训练时注意力长度过短导致泛化差。全模型可将训练时的 128 注意长度扩展至评估时的 640，PPL 随注意长度增加持续下降。

**One Billion Word 控制实验**：该数据集不要求长程依赖，任何提升仅归因于解决上下文碎片化。Transformer-XL 仍显著优于 baseline，验证了递归机制消除碎片化的独立价值。

##### 5. 生成能力

论文展示了 Transformer-XL 生成连贯长文章的能力。在给定种子段落后，模型能持续生成数千 token、主题一致的文本，远超标准 Transformer 的生成质量。

#### 🧪 练习题
1. 标准 Transformer 语言模型的 context fragmentation 问题具体指的是什么？为什么简单 padding 到句边界在实践中未被广泛采用？
2. Transformer-XL 的段级循环机制中，前段隐状态通过 SG（stop-gradient）固定。如果允许梯度跨段回传（类似 BPTT），会带来什么利弊？
3. 推导标准 Transformer 注意力分数分解为四项 (a)(b)(c)(d) 的过程，并说明 Transformer-XL 为何必须将绝对位置编码改为相对位置编码。
4. 为什么 Transformer-XL 在评估时能比 Vanilla Transformer 快 1800 倍？请从计算量和缓存复用的角度分析。
5. 如果将 Transformer-XL 的 memory 长度 M 从训练时的 L 增加到评估时的 3L，会对模型的注意力模式产生什么影响？