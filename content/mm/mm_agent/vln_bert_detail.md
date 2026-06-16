### VLN-BERT
```yaml
id: vln_bert
name: VLN-BERT
full_name: 循环视觉语言BERT (VLN-BERT)
year: '2021'
org: HKU
paper_url: https://arxiv.org/abs/2011.13922
category: vln
parent: prevalent
motivation: 将循环机制注入Transformer支持状态追踪
```

#### 📝 一句话总结
VLN-BERT 将一个 state token 作为循环记忆接入视觉语言 BERT，让 Transformer 在每一步用上一步状态、固定语言表征和当前视觉观察更新导航状态并直接输出动作。

#### 🎯 核心要点
- **解决 PREVALENT 的历史缺口**：PREVALENT 主要做单步 triplet 对齐，VLN-BERT 明确把 VLN 看作部分可观测序列决策问题，需要状态追踪。
- **循环不是外接 LSTM**：模型在 BERT 输入中加入 state token，上一时刻的 state 作为下一时刻输入，实现 Transformer 内部的 recurrent update。
- **语言 token 只作 key/value**：导航过程中语言表征不反复更新，减少长指令和长轨迹造成的显存开销。
- **动作来自注意力权重**：最终层 state 对候选视觉 token 的平均注意力直接作为动作概率，不再额外堆复杂 decoder。
- **可适配预训练 V&L BERT**：论文以 OSCAR/PREVALENT 风格模型为基础，展示了不从零训练大规模 VLN backbone 也能迁移到导航。

#### 🔬 深入细节
论文：*VLN↻BERT: A Recurrent Vision-and-Language BERT for Navigation*。核心图 Figure 2 展示了初始化语言状态、循环输入 state-language-vision、输出更新状态和动作概率的过程。

![VLN-BERT 循环视觉语言 Transformer 架构图](https://ar5iv.labs.arxiv.org/html/2011.13922/assets/x2.png)
*图：VLN-BERT 在初始化阶段编码完整指令得到初始状态，导航阶段把上一状态、语言记忆和当前视觉观察送入同一个 Transformer，输出更新状态与动作概率。*

VLN-BERT 的形式化输入包括上一状态 \(\boldsymbol{s}_{t-1}\)、语言 token \(\boldsymbol{X}\)、当前可导航视觉 token \(\boldsymbol{V}_t\)，以及在 REVERIE 中额外使用的 object token \(\boldsymbol{O}_t\)。整体递推为
\[
\boldsymbol{s}_t,\boldsymbol{p}^a_t,\boldsymbol{p}^o_t
=\mathrm{VLN\text{-}BERT}(\boldsymbol{s}_{t-1},\boldsymbol{X},\boldsymbol{V}_t,\boldsymbol{O}_t).
\]
在 R2R 这类纯导航任务中，核心输出是更新后的状态和动作分布 \(\boldsymbol{p}^a_t\)。

初始化阶段只输入 `[CLS]`、完整指令和 `[SEP]`。模型将 `[CLS]` 输出定义为初始状态 \(\boldsymbol{s}_0\)，并缓存语言表征：
\[
\boldsymbol{s}_0,\boldsymbol{X}
=\mathrm{VLN\text{-}BERT}(\mathtt{[CLS]},\boldsymbol{U},\mathtt{[SEP]}).
\]
之后每个导航步不再让语言 token 作为 query 参与全量自注意力，而是主要作为 key/value 被 state 和视觉 token 查询。这一设计保留了深层语言编码，又避免每一步都重新编码长指令。

状态 token 是模型的记忆载体。它在每一步作为输入序列的第一个 token，与当前视觉候选和语言 token 做跨模态 self-attention；输出的 state 再进入下一步。为了让 state 更明确地捕捉“当前该看哪段指令、该看哪个方向”，论文还做了 state refinement：先计算 state 对语言和视觉 token 的注意力，得到加权语言特征 \(\boldsymbol{F}^x_t\) 与视觉特征 \(\boldsymbol{F}^v_t\)，再通过逐元素乘积建模匹配：
\[
\boldsymbol{F}^x_t=\widetilde{\boldsymbol{A}}^{s,x}_l\boldsymbol{X},\qquad
\boldsymbol{F}^v_t=\widetilde{\boldsymbol{A}}^{s,v}_l\boldsymbol{V}_t,
\]
\[
\boldsymbol{s}^f_t=[\boldsymbol{s}^r_t;\boldsymbol{F}^x_t\odot \boldsymbol{F}^v_t]W^r.
\]
选定动作的方向特征 \(\boldsymbol{a}_t\) 还会写回状态：
\[
\boldsymbol{s}_t=[\boldsymbol{s}^f_t;\boldsymbol{a}_t]W^s.
\]

动作决策非常简洁。Transformer 的注意力本身已经是基于内积的匹配打分，因此 VLN-BERT 直接取最终层 state 对视觉候选的多头平均注意力作为动作概率：
\[
\boldsymbol{p}^a_t=\widetilde{\boldsymbol{A}}^{s,v}_l.
\]
训练时混合 RL 与 IL：RL 用 A2C 根据采样动作和 advantage 优化，IL 在专家轨迹上做 teacher-forcing cross entropy。导航损失可概括为
\[
\mathcal{L}
=-\sum_t a^s_t\log p^a_t A_t
-\lambda \sum_t a^\star_t \log p^a_t,
\]
其中 \(a^s_t\) 是采样动作，\(a^\star_t\) 是专家动作。

```text
Algorithm: Recurrent VLN-BERT inference
Input: instruction U, start viewpoint
1. Encode [CLS], U, [SEP] to obtain initial state s_0 and language tokens X.
2. For t = 1 ... T:
   a. Extract candidate visual tokens V_t from navigable directions.
   b. Run Transformer on (s_{t-1}, X, V_t), with X reused as language memory.
   c. Compute p_t^a from final-layer state-to-vision attention.
   d. Select action a_t and move in the navigation graph.
   e. Refine state with matched language/vision features and selected direction.
3. Stop when the selected action is stop or max step is reached.
```

VLN-BERT 的关键取舍是把长历史压缩到一个 state token，因此它比完整历史建模更省内存，也更容易接上预训练 BERT；但如果任务要求回忆很长路径、比较多个过去观测，单 token 状态可能成为瓶颈。HAMT 后续正是用层次化历史 Transformer 来避免这种压缩损失。

#### 🧪 练习题
```yaml
question: "VLN-BERT 将 state token 接入 Transformer 的主要目的是什么？"
options:
  - "把历史导航信息压缩为可递推的跨模态状态，并在每一步结合当前观察更新决策"
  - "替代视觉特征提取器，使模型不再需要全景图像输入"
  - "只用于初始化语言编码，导航阶段不再参与计算"
  - "把所有历史全景图展开为长序列，以获得完整路径记忆"
answer: 0
explain: "state token 是 VLN-BERT 的循环记忆载体；它在每一步与语言和当前视觉候选做注意力交互，输出的新状态继续传到下一步。"
```
