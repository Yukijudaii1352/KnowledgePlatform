### PARSeq — 排列自回归序列模型 (Permuted Autoregressive Sequence Models)

```yaml
id: parseq
name: PARSeq
full_name: "排列自回归序列模型 (Permuted Autoregressive Sequence Models)"
year: "2022"
org: "University of the Philippines"
paper_url: "https://arxiv.org/abs/2207.06966"
category: "scene_text_recognition"
parent: "—"
motivation: "统一多种解码策略"
```

#### 📝 一句话总结

PARSeq 通过排列语言建模（PLM）训练单一 Transformer 模型学习共享权重的 AR 模型集合，统一了上下文无关的非自回归解码、上下文感知的自回归解码以及基于双向上下文的迭代精炼，在场景文字识别任务上以最优的参数效率达到 SOTA 精度。

#### 🎯 核心要点

- 架构极简：ViT-S 编码器（12 层）+ 单层 Transformer 解码器，共约 23.8M 参数
- 排列语言建模（PLM）训练：对 T! 种排列采样 K 个（K/2 对），用 attention mask 实现不同因式分解顺序
- 统一三种解码方案：NAR（并行）、AR（单调自回归）、Cloze（迭代精炼），仅通过切换 attention mask 实现
- Position tokens 与 context tokens 解耦：position query 指定"预测哪个位置"，context 提供"已知哪些字符"
- 迭代精炼机制：将上一轮预测作为 context 反馈，利用双向上下文修正低置信度 token
- 合成数据训练达 91.9% 平均准确率（SOTA），真实数据训练达 96.0%（SOTA）
- 参数效率最优：在 accuracy vs params/FLOPS/latency 的帕累托前沿上

#### 🔬 深入细节

![PARSeq 模型架构](https://arxiv.org/html/2207.06966v2/extracted/figures/parseq_arch.png)
*图：PARSeq 整体架构。ViT 编码器提取图像特征，单层 Transformer 解码器通过 attention mask 统一 AR/NAR/Cloze 解码。*

##### 算法伪代码

```python
# PARSeq 训练伪代码
def train_step(image, label):
    # 1. 编码图像
    z = ViT_Encoder(image)  # [batch, num_patches, d_model]
    
    # 2. 采样 K 个排列（K/2 对）
    perms = sample_permutation_pairs(K, T=len(label))
    # 前 K/2: [LTR] + (K/2-1) 随机排列
    # 后 K/2: 前 K/2 的翻转版本
    
    # 3. 对每个排列生成 attention mask 并解码
    total_loss = 0
    for perm in perms:
        mask = generate_attention_mask(perm)  # 根据排列顺序生成因果 mask
        y_pred = Decoder(z, pos_tokens, context_tokens, mask)
        total_loss += cross_entropy(y_pred, label)
    
    return total_loss / K

# PARSeq 推理伪代码（迭代精炼）
def inference(image, max_iters=2):
    z = ViT_Encoder(image)
    
    # 第 1 轮：NAR 解码（context 仅含 [B]）
    context = [BOS]
    mask = nar_mask()  # 全 1 mask，无因果约束
    prediction = Decoder(z, pos_tokens, context, mask)
    
    # 第 2+ 轮：Cloze 精炼（用上轮预测作为双向 context）
    for i in range(max_iters - 1):
        context = prediction  # 上轮输出作为新 context
        mask = cloze_mask()   # 双向 mask（每个位置可见所有其他位置）
        prediction = Decoder(z, pos_tokens, context, mask)
    
    return prediction
```

##### 动机与背景

传统场景文字识别（STR）中的上下文感知方法面临两大困境：

1. **AR 模型的单向性限制**：标准自回归模型仅能学习单方向（通常是从左到右）的 token 依赖关系，导致模型对阅读方向产生偏见，在反向文本或旋转文本上表现不佳。
2. **两阶段方法的低效性**：如 ABINet 采用独立的视觉模型 + 外部语言模型 + 融合层的三段式结构。外部 LM 与图像条件独立，可能错误地"纠正"已经正确的预测（ABINet LM 单独使用时仅 41.9% 词准确率），且参数利用率极低。

> 💡 关键洞察：不同的解码策略（AR、NAR、Cloze）本质上只是序列似然函数的不同因式分解顺序，可以通过 attention mask 在同一模型中统一实现。

##### 核心机制：排列语言建模（PLM）

PLM 的核心思想是对序列似然函数的所有可能因式分解进行训练：

$$\log p(\mathbf{y}|\mathbf{x}) = \mathbb{E}_{\mathbf{z}\sim\mathcal{Z}_T}\left[\sum_{t=1}^{T}\log p_\theta(y_{z_t}|\mathbf{y}_{\mathbf{z}_{<t}},\mathbf{x})\right]$$

其中 \(\mathcal{Z}_T\) 是长度为 \(T\) 的所有排列集合，\(z_t\) 是排列 \(\mathbf{z}\) 的第 \(t\) 个元素。

**关键设计**：PLM 不需要实际打乱输入序列，而是通过构造不同的 attention mask 来强制执行排列指定的因果顺序。例如对于排列 \([3,1,2]\)，位置 3 无需任何上下文，位置 1 可以看到位置 3 的 token，位置 2 可以看到位置 3 和位置 1 的 token。

**排列采样策略**：由于 \(T!\) 增长过快，实际训练中只使用 \(K\) 个排列。采样方式为 \(K/2\) 对：
- 前半部分：1 个 LTR 排列 + \(K/2-1\) 个随机排列
- 后半部分：前半部分每个排列的翻转版本

训练损失为所有排列的平均交叉熵：

$$\mathcal{L} = \frac{1}{K}\sum_{k=1}^{K}\mathcal{L}_{ce}(\mathbf{y}_k, \hat{\mathbf{y}})$$

##### 解码器架构细节

解码器接收三类输入：
1. **图像特征** \(\mathbf{z} \in \mathbb{R}^{n \times d_{model}}\)：来自 ViT 编码器
2. **Position tokens** \(\mathbf{p} \in \mathbb{R}^{(T+1) \times d_{model}}\)：可学习的位置嵌入，指定输出位置
3. **Context tokens** \(\mathbf{c} \in \mathbb{R}^{(T+1) \times d_{model}}\)：已知字符的嵌入（训练时为 ground truth，推理时为上轮预测）

解码器的计算流程：
1. Self-attention（带 attention mask \(\mathbf{m}\)）处理 context tokens
2. Cross-attention 融合图像特征
3. 残差 MLP 输出：\(\mathbf{h}_{dec} = \mathbf{h}_i + \text{MLP}(\mathbf{h}_i)\)
4. 线性层映射到字符集：\(\mathbf{y} = \text{Linear}(\mathbf{h}_{dec}) \in \mathbb{R}^{(T+1)\times(S+1)}\)

> ⚠️ 注意：Position tokens 和 context tokens 的解耦是 PARSeq 的关键设计。Position tokens 始终指定"要预测哪些位置"，而 context tokens 通过 attention mask 控制"可以利用哪些已知信息"，这使得同一解码器能灵活切换解码模式。

##### 统一的解码方案

通过不同的 attention mask，同一模型支持三种解码：

| 解码方式 | Context 输入 | Attention Mask | 特点 |
|---------|-------------|---------------|------|
| NAR（并行） | 仅 [B] token | 全 1（无因果约束） | 最快，一次前向传播 |
| AR（自回归） | [B] + 逐步生成的 token | 下三角因果 mask | 最精确的单次解码 |
| Cloze（精炼） | 上轮完整预测 | 双向 mask（排除自身） | 利用双向上下文修正 |

**迭代精炼流程**：第一轮用 NAR 获得初始预测，后续轮次用 Cloze mask 将整个预测作为双向上下文反馈，逐步修正低置信度的 token。这等价于 ABINet 中外部 LM 的功能，但 PARSeq 的 LM 是**内部的**（条件依赖于图像特征），因此不会出现与图像矛盾的错误纠正。

##### 与传统方法的对比

| 方法 | 语言模型类型 | 解码方式 | 参数量 | 缺陷 |
|------|------------|---------|--------|------|
| CRNN/CTC | 无 | 并行 | 少 | 无上下文 |
| ASTER/NRTR | 内部 AR | 串行 LTR | 中 | 单向偏见 |
| ABINet | 外部双向 LM | 并行+精炼 | 多（36.7M） | LM 与图像独立，易错误纠正 |
| **PARSeq** | **内部 PLM** | **AR/NAR/Cloze 统一** | **23.8M** | **参数最优，精度最高** |

PARSeq 的核心优势在于：用一个简单统一的结构（单层解码器 + attention mask）替代了 ABINet 中视觉模型 + 语言模型 + 融合模型的复杂三段式架构，同时获得了更强的精度和更高的效率。

#### 🧪 练习题

```yaml
question: "PARSeq 如何在同一模型中实现 AR、NAR 和迭代精炼三种解码方式？"
options:
  - "使用三个独立的解码器分支，分别处理不同解码模式"
  - "通过切换 Transformer 解码器的 attention mask 来控制 token 间的依赖关系"
  - "在训练时使用不同的损失函数分别优化三种解码路径"
  - "通过调整编码器输出的特征维度来适配不同解码需求"
answer: 1
explain: "PARSeq 的核心设计是通过 attention mask 控制 context tokens 之间的可见性：NAR 用全 1 mask（无因果约束），AR 用下三角 mask（因果约束），Cloze 用排除自身的双向 mask，从而在同一模型中统一三种解码。"
```