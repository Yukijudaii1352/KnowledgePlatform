---
domain: ai4sci
topic_id: sci_base
topic_name: 科学基础模型
page_icon: 🔬
page_title: 科学基础模型算法总结
page_subtitle: '{build_date} 版'
page_desc: 涵盖蛋白质结构预测、材料发现、气象预报、分子建模、科学大模型等领域，展示从单任务专用模型到跨学科统一架构的技术演进
hero_pills:
- 🏷️ AI4Sci · Foundation Models · Cross-disciplinary
count_pill: '{count} 个算法'
categories:
  neural_operator:
    label: 神经算子与基础架构
    color: '#607D8B'
  protein_structure:
    label: 蛋白质结构预测
    color: '#4CAF50'
  materials_weather:
    label: 材料科学与气象预测
    color: '#2196F3'
  molecular:
    label: 分子建模与药物发现
    color: '#9C27B0'
  science_llm:
    label: 科学大语言模型
    color: '#FF9800'
  unified_foundation:
    label: 统一科学基础模型
    color: '#E91E63'
---

## 领域综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/ai4sci/sci_base/overview/zhihu__科研AI的进化论！系统梳理600+数据集与模型，上海AI_Lab等发布科学大语言模型全景式综述__ae4b458c/article.md

## 最新进展综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/ai4sci/sci_base/latest/zhihu__中国科学院“磐石100”模型体系发布：AI引擎驱动科学创新__609690e3/article.md

## 算法演化关系

```yaml
nodes:
- id: transformer
  x: 2017
  y: 0
  category: neural_operator
- id: schnet
  x: 2018
  y: 0
  category: neural_operator
- id: fno
  x: 2020
  y: 0
  category: neural_operator
- id: dimenet
  x: 2020.5
  y: 0
  category: neural_operator
- id: deeponet
  x: 2021
  y: 0
  category: neural_operator
- id: egnn
  x: 2021.5
  y: 0
  category: neural_operator
- id: alphafold2
  x: 2021
  y: 1
  category: protein_structure
- id: rosettafold
  x: 2021.5
  y: 1
  category: protein_structure
- id: esm2
  x: 2022
  y: 1
  category: protein_structure
- id: rfdiffusion
  x: 2023
  y: 1
  category: protein_structure
- id: alphafold3
  x: 2024
  y: 1
  category: protein_structure
- id: esm3
  x: 2024.5
  y: 1
  category: protein_structure
- id: fourcastnet
  x: 2022
  y: 2
  category: materials_weather
- id: m3gnet
  x: 2022.5
  y: 2
  category: materials_weather
- id: gnome
  x: 2023
  y: 2
  category: materials_weather
- id: panguweather
  x: 2023.3
  y: 2
  category: materials_weather
- id: graphcast
  x: 2023.6
  y: 2
  category: materials_weather
- id: mattergen
  x: 2025
  y: 2
  category: materials_weather
- id: mpnn
  x: 2017.5
  y: 3
  category: molecular
- id: jtvae
  x: 2018
  y: 3
  category: molecular
- id: chemberta
  x: 2020
  y: 3
  category: molecular
- id: unimap
  x: 2024
  y: 3
  category: molecular
- id: galactica
  x: 2022
  y: 4
  category: science_llm
- id: sciglm
  x: 2024
  y: 4
  category: science_llm
- id: scidfm
  x: 2024.5
  y: 4
  category: science_llm
- id: aion1
  x: 2025
  y: 5
  category: unified_foundation
- id: walrus
  x: 2025.3
  y: 5
  category: unified_foundation
- id: auroragpt
  x: 2026
  y: 5
  category: unified_foundation
- id: scienceone100
  x: 2026.3
  y: 5
  category: unified_foundation
- id: prithvi
  x: 2026.6
  y: 5
  category: unified_foundation
- id: darwin7b
  x: 2026.9
  y: 5
  category: unified_foundation
edges:
- from: schnet
  to: dimenet
  label: 融入键角
- from: alphafold2
  to: alphafold3
  label: 引入扩散
- from: rosettafold
  to: rfdiffusion
  label: 扩散设计
- from: esm2
  to: esm3
  label: 协同生成
- from: transformer
  to: alphafold2
  label: 注意力机制
- from: transformer
  to: panguweather
  label: 3D架构
- from: transformer
  to: galactica
  label: 语言建模
- from: fno
  to: fourcastnet
  label: 傅里叶算子
- from: mpnn
  to: gnome
  label: GNN材料
- from: mpnn
  to: graphcast
  label: GNN气象
- from: schnet
  to: esm2
  label: 几何建模
- from: galactica
  to: sciglm
  label: 科学推理
- from: alphafold3
  to: auroragpt
  label: 多模态融合
- from: gnome
  to: mattergen
  label: 生成式设计
- from: esm3
  to: darwin7b
  label: 生物组学
- from: graphcast
  to: prithvi
  label: 地学应用
milestones:
- alphafold2
- gnome
- alphafold3
```

## 核心算法

### Transformer

```yaml
id: transformer
num: 1
name: Transformer
full_name: Transformer (Transformer)
year: '2017'
org: Google
parent: —
paper_url: https://arxiv.org/abs/1706.03762
project_url: ''
category: neural_operator
motivation: 自注意力机制奠定科学大模型基础
```

#### 📝 一句话总结
Transformer 提出了完全基于自注意力机制的 Encoder-Decoder 架构，彻底摒弃了循环和卷积结构，在机器翻译任务上取得了 SOTA 结果，同时大幅提升了训练并行性，成为后续所有大语言模型和科学基础模型的核心架构基石。

#### 🎯 核心要点
- **纯注意力架构**：首次证明仅靠注意力机制（无 RNN/CNN）即可在序列转录任务中达到最优性能
- **Scaled Dot-Product Attention**：通过 \(\sqrt{d_k}\) 缩放因子解决高维点积导致的梯度消失问题
- **Multi-Head Attention**：将注意力拆分为 \(h\) 个并行头，让模型同时关注不同子空间的信息
- **三种注意力用法**：Encoder 自注意力、Decoder 掩码自注意力、Encoder-Decoder 交叉注意力
- **位置编码**：使用正弦/余弦函数注入序列位置信息，替代 RNN 的隐式位置建模
- **残差连接 + 层归一化**：每个子层采用 \(\text{LayerNorm}(x + \text{Sublayer}(x))\) 稳定深层训练
- **Position-wise FFN**：两层全连接网络（含 ReLU）为每个位置独立提供非线性变换能力
- **WMT 2014 翻译 SOTA**：EN-DE 达到 28.4 BLEU，EN-FR 达到 41.0 BLEU，训练成本仅为此前最优模型的一小部分

#### 🔬 深入细节
##### 架构总览

![Transformer 模型架构](https://ar5iv.labs.arxiv.org/html/1706.03762/assets/Figures/ModalNet-21.png)
*图：Transformer 模型架构。左侧为 Encoder，右侧为 Decoder。*

Transformer 采用经典的 Encoder-Decoder 结构，但内部完全由注意力层和前馈网络构成：

- **Encoder**：由 \(N=6\) 个相同层堆叠而成，每层包含两个子层——Multi-Head Self-Attention 和 Position-wise FFN，每个子层外包裹残差连接和层归一化。
- **Decoder**：同样 \(N=6\) 层，每层在 Encoder 的两个子层基础上增加了一个 Encoder-Decoder Cross-Attention 子层。Decoder 的自注意力层使用掩码（mask）防止位置 \(i\) 关注到未来位置 \(i+1, i+2, \ldots\)，确保自回归生成的合法性。

> 💡 **关键设计**：所有子层的输出维度统一为 \(d_{\text{model}} = 512\)，这使得残差连接可以直接相加，无需额外投影。

##### 核心机制：Scaled Dot-Product Attention

![注意力机制示意图](https://ar5iv.labs.arxiv.org/html/1706.03762/assets/Figures/ModalNet-19.png)
*图：Scaled Dot-Product Attention 计算流程*

注意力函数将 Query、Key、Value 三组向量映射为输出：

$$\text{Attention}(Q, K, V) = \text{softmax}\!\left(\frac{QK^T}{\sqrt{d_k}}\right) V$$

**为什么需要缩放？** 当 \(d_k\) 较大时，点积 \(QK^T\) 的方差为 \(d_k\)，导致 softmax 进入梯度极小的饱和区。除以 \(\sqrt{d_k}\) 将方差归一化为 1，保持梯度流通畅。这是论文相比加性注意力（Additive Attention）选择点积注意力的关键改进。

```python
# Scaled Dot-Product Attention 伪代码
def scaled_dot_product_attention(Q, K, V, mask=None):
    d_k = Q.shape[-1]
    scores = Q @ K.transpose(-2, -1) / math.sqrt(d_k)  # (batch, seq_q, seq_k)
    if mask is not None:
        scores = scores.masked_fill(mask == 0, -1e9)
    attn_weights = softmax(scores, dim=-1)
    attn_weights = dropout(attn_weights)
    return attn_weights @ V  # (batch, seq_q, d_v)
```

##### Multi-Head Attention

![Multi-Head Attention](https://ar5iv.labs.arxiv.org/html/1706.03762/assets/Figures/ModalNet-20.png)
*图：Multi-Head Attention 将 Q、K、V 分别线性投影到多个子空间后并行计算注意力*

单个注意力头只能学习一种关注模式。Multi-Head Attention 将 \(d_{\text{model}}\) 维的 Q、K、V 分别通过 \(h\) 组不同的线性投影映射到 \(d_k = d_v = d_{\text{model}}/h = 64\) 维子空间，并行计算注意力后拼接：

$$\text{MultiHead}(Q, K, V) = \text{Concat}(\text{head}_1, \ldots, \text{head}_h) W^O$$

$$\text{where } \text{head}_i = \text{Attention}(QW_i^Q, KW_i^K, VW_i^V)$$

其中 \(W_i^Q \in \mathbb{R}^{d_{\text{model}} \times d_k}\)，\(W_i^K \in \mathbb{R}^{d_{\text{model}} \times d_k}\)，\(W_i^V \in \mathbb{R}^{d_{\text{model}} \times d_v}\)，\(W^O \in \mathbb{R}^{hd_v \times d_{\text{model}}}\)。

论文使用 \(h=8\) 个头，每个头的维度 \(d_k = d_v = 64\)，总计算量与单头全维度注意力相当，但表达能力更强。

> 💡 **直觉理解**：不同的注意力头可以分别学习语法依赖、语义相似性、位置关系等不同类型的关联模式，类似于 CNN 中多个卷积核捕捉不同特征。

```python
# Multi-Head Attention 伪代码
def multi_head_attention(Q, K, V, h=8):
    d_model = Q.shape[-1]
    d_k = d_model // h
    heads = []
    for i in range(h):
        Q_i = Q @ W_Q[i]  # (batch, seq, d_k)
        K_i = K @ W_K[i]
        V_i = V @ W_V[i]
        head_i = scaled_dot_product_attention(Q_i, K_i, V_i)
        heads.append(head_i)
    concat = torch.cat(heads, dim=-1)  # (batch, seq, d_model)
    return concat @ W_O
```

##### 三种注意力的应用场景

Transformer 中注意力机制被用于三个不同位置，Q、K、V 的来源各不相同：

| 位置 | Q 来源 | K、V 来源 | 作用 |
|------|--------|-----------|------|
| Encoder Self-Attention | Encoder 当前层输入 | Encoder 当前层输入 | 每个位置关注输入序列所有位置 |
| Decoder Masked Self-Attention | Decoder 当前层输入 | Decoder 当前层输入（带掩码） | 每个位置仅关注已生成的位置 |
| Encoder-Decoder Cross-Attention | Decoder 当前层输入 | Encoder 最终输出 | Decoder 关注输入序列信息 |

> ⚠️ **注意**：Decoder 自注意力中的掩码（mask）将未来位置的注意力权重设为 \(-\infty\)（softmax 后为 0），这是保证自回归生成因果性的关键。

##### Position-wise Feed-Forward Network

每个注意力子层之后紧跟一个两层全连接前馈网络，对每个位置独立且相同地应用：

$$\text{FFN}(x) = \max(0,\; xW_1 + b_1)\, W_2 + b_2$$

内层维度 \(d_{ff} = 2048\)，外层维度 \(d_{\text{model}} = 512\)。这等价于两个 kernel size 为 1 的卷积。FFN 为模型提供了逐位置的非线性变换能力，弥补了注意力层本身线性加权求和的不足。

##### 位置编码（Positional Encoding）

由于 Transformer 不含循环或卷积结构，无法隐式感知序列顺序。论文使用正弦/余弦函数生成位置编码，直接加到输入嵌入上：

$$PE_{(pos, 2i)} = \sin\!\left(\frac{pos}{10000^{2i/d_{\text{model}}}}\right)$$

$$PE_{(pos, 2i+1)} = \cos\!\left(\frac{pos}{10000^{2i/d_{\text{model}}}}\right)$$

其中 \(pos\) 为位置索引，\(i\) 为维度索引。选择正弦函数的原因是：对于任意固定偏移 \(k\)，\(PE_{pos+k}\) 可以表示为 \(PE_{pos}\) 的线性函数，使模型能够轻松学习相对位置关系。实验表明，学习式位置编码与正弦编码效果几乎相同，但正弦编码可以外推到训练时未见过的更长序列。

##### 自注意力 vs RNN vs CNN 的复杂度对比

| 层类型 | 每层复杂度 | 顺序操作数 | 最大路径长度 |
|--------|-----------|-----------|-------------|
| Self-Attention | \(O(n^2 \cdot d)\) | \(O(1)\) | \(O(1)\) |
| Recurrent | \(O(n \cdot d^2)\) | \(O(n)\) | \(O(n)\) |
| Convolution | \(O(k \cdot n \cdot d^2)\) | \(O(1)\) | \(O(\log_k(n))\) |

> 💡 **关键优势**：自注意力的最大路径长度为 \(O(1)\)（任意两个位置直接连接），远优于 RNN 的 \(O(n)\)，这使得长距离依赖的学习更加容易。同时，自注意力的所有位置可并行计算（顺序操作 \(O(1)\)），而 RNN 必须逐步展开。当序列长度 \(n < d\) 时（实际中常见），自注意力的计算量也更小。

##### 训练配置

- **数据集**：WMT 2014 EN-DE（450 万句对）和 EN-FR（3600 万句对）
- **优化器**：Adam（\(\beta_1=0.9, \beta_2=0.98, \epsilon=10^{-9}\)）
- **学习率调度**：Warmup + 逆平方根衰减

$$lr = d_{\text{model}}^{-0.5} \cdot \min(step^{-0.5},\; step \cdot warmup\_steps^{-1.5})$$

前 4000 步线性预热，之后按步数的逆平方根衰减。

- **正则化**：Residual Dropout（\(P_{drop}=0.1\)）应用于每个子层输出和嵌入+位置编码之和；Label Smoothing（\(\epsilon_{ls}=0.1\)）牺牲困惑度但提升 BLEU 和准确率
- **硬件**：8 块 NVIDIA P100 GPU，base 模型训练 12 小时（10 万步），big 模型训练 3.5 天（30 万步）

#### 🧪 练习题
```yaml
question: "Transformer 中 Scaled Dot-Product Attention 除以 √d_k 的主要原因是什么？"
options:
  - "减少模型参数量，降低计算复杂度"
  - "防止点积值过大导致 softmax 梯度消失"
  - "使注意力权重之和严格等于 1"
  - "对齐 Query 和 Key 的维度"
answer: 1
explain: "当 d_k 较大时，点积的方差为 d_k，导致 softmax 输入值过大进入饱和区，梯度趋近于零。除以 √d_k 将方差归一化为 1，保持梯度有效流动。"
```

### MPNN

```yaml
id: mpnn
num: 2
name: MPNN
full_name: 消息传递神经网络 (Message Passing Neural Network)
year: '2017'
org: Google
parent: —
paper_url: https://arxiv.org/abs/1704.01212
project_url: ''
category: molecular
motivation: 统一框架处理图结构分子表征学习
```

#### 📝 一句话总结
MPNN 将多种图神经网络统一为“消息函数、节点更新函数、读出函数”三段式框架，解决了分子图学习中模型形式分散、难以比较和难以利用化学对称性的问题，并在 QM9 量子化学属性预测上验证了这一框架的有效性。

#### 🎯 核心要点
- **统一框架**：把 Molecular Graph Convolution、GG-NN、Interaction Network、DTNN 等方法都写成消息传递与图级读出的共同形式
- **两阶段前向传播**：先进行 \(T\) 轮局部消息聚合与节点状态更新，再用置换不变的 readout 得到整图表示或属性预测
- **化学图归纳偏置**：节点表示原子特征，边表示化学键、距离或空间信息，使模型天然适配分子图结构
- **Edge Network 消息函数**：用边特征生成线性变换矩阵，让连续距离和键类型直接调制从邻居传来的信息
- **Set2Set 读出**：用面向集合的读出模型替代简单求和，提升对可变大小分子图的表达能力并保持节点顺序不变性
- **长程信息设计**：通过虚拟边或 master node 缩短远距离节点的信息传播路径，缓解纯局部消息传递的深度需求
- **Multiple Towers 加速**：将高维节点隐状态拆成多个低维 tower 独立传播后混合，降低大隐藏维度下的计算成本
- **QM9 实证结果**：在 13 个 DFT 属性预测任务上取得当时最优结果，最佳 MPNN 变体在 11/13 个目标上达到化学精度

#### 🔬 深入细节
##### 框架总览

![MPNN 量子化学属性预测示意图](https://ar5iv.labs.arxiv.org/html/1704.01212/assets/x1.png)
*图：MPNN 用分子图近似昂贵的 DFT 计算，从原子和键的结构信息预测能量、振动频率等量子化学属性。来源为论文 ar5iv 页面 Figure 1。*

论文来源：arXiv 论文页 https://arxiv.org/abs/1704.01212；可读 HTML 与图示来源 https://ar5iv.labs.arxiv.org/html/1704.01212。

MPNN 的关键不是提出单一网络层，而是给分子图学习提供一个抽象接口。给定分子图 \(G=(V,E)\)，每个原子 \(v\) 有节点特征 \(x_v\)，每条边 \((v,w)\) 有边特征 \(e_{vw}\)。模型维护每个节点的隐状态 \(h_v^t\)，初始状态通常由原子特征填充或投影得到：

$$h_v^0 = \mathrm{pad}(x_v)$$

每一轮消息传递中，节点 \(v\) 从所有邻居 \(w \in N(v)\) 接收消息并聚合：

$$m_v^{t+1} = \sum_{w \in N(v)} M_t(h_v^t, h_w^t, e_{vw})$$

随后用更新函数刷新节点状态：

$$h_v^{t+1} = U_t(h_v^t, m_v^{t+1})$$

经过 \(T\) 轮后，readout 函数将所有节点状态汇总为图级输出：

$$\hat{y} = R(\{h_v^T \mid v \in V\})$$

这里 \(M_t\)、\(U_t\)、\(R\) 都是可学习的可微函数。由于 readout 接收的是节点状态集合，它必须对节点排列不敏感；这正是分子图属性预测所需的图同构不变性。

##### 核心算法伪代码

```python
# Message Passing Neural Network for graph-level molecular property prediction
def mpnn_forward(graph, atom_features, edge_features, T):
    h = initialize_hidden_states(atom_features)  # h_v^0

    for t in range(T):
        new_h = {}
        for v in graph.nodes:
            m_v = 0
            for w in graph.neighbors(v):
                e_vw = edge_features[(v, w)]
                m_v += message_fn[t](h[v], h[w], e_vw)
            new_h[v] = update_fn[t](h[v], m_v)  # often a GRU
        h = new_h

    graph_embedding = permutation_invariant_readout([h[v] for v in graph.nodes])
    y_hat = output_mlp(graph_embedding)
    return y_hat
```

##### 消息函数：从离散键类型到连续边特征

最基础的 GG-NN 式消息可以写作：

$$M_t(h_v^t, h_w^t, e_{vw}) = A_{e_{vw}}h_w^t$$

其中 \(A_{e_{vw}}\) 是由边标签选择的矩阵，适合单键、双键、芳香键等离散化学键类型。但量子化学属性常常依赖原子间三维距离，仅靠离散键标签不够。论文因此重点探索 Edge Network：

$$M_t(h_v^t, h_w^t, e_{vw}) = A(e_{vw})h_w^t$$

这里 \(A(\cdot)\) 是一个小神经网络，它把边特征 \(e_{vw}\) 映射成矩阵。若 \(e_{vw}\) 包含欧氏距离与键类型 one-hot，消息函数就能根据距离连续地改变邻居信息的线性变换。这比把距离粗暴分桶更平滑，也更适合拟合 DFT 属性。

论文还尝试 Pair Message：

$$M_t(h_v^t, h_w^t, e_{vw}) = f(h_v^t, h_w^t, e_{vw})$$

它让消息同时依赖源节点、目标节点和边，表达力更强，但计算与优化更难。最终表现最好的配置是 Edge Network + Set2Set readout + 显式氢原子。

##### 更新函数与读出函数

节点更新函数常使用 GRU：

$$h_v^{t+1} = \mathrm{GRU}(h_v^t, m_v^{t+1})$$

GRU 的作用是控制新消息与历史状态的融合，避免多轮传播后信息被完全覆盖。对分子图来说，\(T\) 轮传播相当于让每个原子看到 \(T\)-hop 化学环境；更大的 \(T\) 可以引入更远的结构信息，但也增加过平滑和计算成本。

读出函数需要把不同大小的分子图映射到固定维度。简单求和满足置换不变性，但表达力有限。Set2Set 读出用一个序列式注意力过程反复查询节点状态集合，得到更强的图级嵌入：

$$q_t = \mathrm{LSTM}(q_{t-1}^*)$$

$$a_{v,t} = \mathrm{softmax}(h_v^T \cdot q_t), \quad r_t = \sum_v a_{v,t}h_v^T$$

$$q_t^* = [q_t, r_t]$$

直觉上，Set2Set 不是只问“所有原子的平均模式是什么”，而是多次聚焦于不同局部环境，例如官能团、长程相互作用或空间几何贡献。

##### 输入表示与训练目标

论文在 QM9 数据集上做系统实验。节点特征包括原子类型 H/C/N/O/F、原子序数、是否受体/供体、芳香性、杂化类型、氢原子数量等。边特征有三类设置：仅化学键类型、距离分桶、原始距离加键类型 one-hot。实验发现，显式加入氢原子和完整边特征对许多量子化学目标非常重要。

训练时每个目标属性通常单独训练一个模型，预测值 \(\hat{y}\) 与 DFT 标签 \(y\) 的损失为均方误差：

$$\mathcal{L}_{\mathrm{MSE}} = \frac{1}{B}\sum_{i=1}^{B}\|\hat{y}_i - y_i\|_2^2$$

评估使用 MAE，并将 MAE 与化学精度阈值比较。最佳模型的 ensemble 在所有 13 个目标上达到当时 SOTA，并在 11 个目标上达到化学精度。

##### 长程传播：虚拟边、Master Node 与 Towers

纯局部消息传递需要多轮传播才能让远距离原子互相影响。对分子属性，某些电子效应或空间相互作用并不严格局限于共价键邻域。论文测试了两类长程机制：第一类是给非相邻节点添加虚拟边，让信息能在更少步数内跨越分子；第二类是添加 master node，它连接所有原子，作为全局 scratch space，每一轮都收集全图信息再广播回节点。

Multiple Towers 解决的是高维隐藏状态计算昂贵的问题。将 \(d\) 维状态拆成 \(k\) 个较小 tower，各自做消息传递得到临时状态，再通过共享混合网络融合：

$$\tilde{h}_{v,i}^{t+1} = U_i(h_{v,i}^t, m_{v,i}^{t+1}), \quad i=1,\ldots,k$$

$$h_v^{t+1} = g([\tilde{h}_{v,1}^{t+1}, \ldots, \tilde{h}_{v,k}^{t+1}])$$

这保留了节点置换不变性，同时降低了单次传播的矩阵计算规模。论文报告 towers 在无显式氢的距离分桶设置下比 vanilla GG-NN 更快，也有一定泛化收益。

##### 与传统分子特征工程的区别

传统量子化学机器学习常依赖 Coulomb Matrix、Bag of Bonds、ECFP 等手工分子描述符。这些特征要么需要人为设计对称性，要么在图同构、原子排列和空间几何上处理不够自然。MPNN 的优势是把对称性和局部相互作用写入网络结构：同一套消息函数共享于所有原子和边，readout 对节点顺序不敏感，模型能从数据中学习哪些局部环境与目标属性相关。

> 💡 关键：MPNN 的贡献在于抽象出“消息传递 + 置换不变读出”的通用接口。后续许多分子 GNN、材料 GNN 和等变网络都可以看作在消息函数、几何特征或对称性约束上继续强化这一框架。

#### 🧪 练习题
```yaml
question: "MPNN 中 readout 函数必须满足置换不变性的主要原因是什么？"
options:
  - "让模型能够在每一轮传播中减少参数数量"
  - "保证同一个分子图在原子编号改变后仍得到相同图级预测"
  - "让边特征可以从连续距离自动离散化"
  - "强制所有节点拥有完全相同的隐藏状态"
answer: 1
explain: "分子属性不应依赖原子编号。readout 接收节点状态集合并保持置换不变，才能保证同构图得到一致的图级表示和预测。"
```

### SchNet

```yaml
id: schnet
num: 3
name: SchNet
full_name: SchNet (SchNet)
year: '2018'
org: TU Berlin
parent: —
paper_url: https://aip.scitation.org/doi/10.1063/1.5019779
project_url: ''
category: neural_operator
motivation: 连续卷积滤波器实现分子3D建模
```

#### 📝 一句话总结
SchNet 提出了基于连续滤波卷积的分子神经网络，用距离生成的连续卷积核建模任意三维原子位置，解决了离散网格卷积难以处理分子几何和势能面不连续的问题。

#### 🎯 核心要点
- **连续滤波卷积 cfconv**：用滤波器生成网络 \(W(r)\) 根据原子间相对位置或距离动态产生卷积权重
- **3D 分子几何输入**：模型直接使用核电荷 \(Z_i\) 与原子坐标 \(\mathbf{r}_i\)，不需要将分子栅格化为体素
- **旋转与平移约束**：能量只依赖原子间距离 \(d_{ij}=\|\mathbf{r}_i-\mathbf{r}_j\|\)，保证能量预测旋转、平移不变
- **Interaction Block**：多个残差交互模块逐步更新原子表示，捕捉从局部径向环境到复杂多体相互作用的层级信息
- **径向基展开**：将距离展开为 Gaussian RBF 后送入滤波器网络，减少初始滤波器相关性并改善训练
- **能量-力联合建模**：通过 \(\mathbf{F}_i=-\partial E/\partial \mathbf{r}_i\) 从能量模型导出守恒力场
- **平滑激活函数**：使用 shifted softplus，使势能面对坐标可微且足够平滑，适合力的梯度训练
- **多基准验证**：在 QM9、MD17、ISO17 上评估分子组成变化、构象变化以及二者结合的泛化能力

#### 🔬 深入细节
##### 架构总览

![SchNet 架构与连续滤波卷积示意图](https://ar5iv.labs.arxiv.org/html/1706.08566/assets/x2.png)
*图：SchNet 总体架构、interaction block 与 cfconv/filter-generating network。来源为论文 ar5iv 页面 Figure 2。*

论文来源：AIP/JCP DOI https://aip.scitation.org/doi/10.1063/1.5019779；arXiv 版本 https://arxiv.org/abs/1706.08566；可读 HTML 与图示来源 https://ar5iv.labs.arxiv.org/html/1706.08566。

传统 CNN 假设输入在规则网格上，例如图像像素或音频采样点；分子却是由不规则三维坐标中的原子组成。如果先把原子放进体素网格，会引入分辨率、插值和旋转处理问题。SchNet 的核心做法是把卷积核从离散张量推广为连续函数：卷积权重不是固定查表，而是由原子之间的连续距离生成。

对第 \(l\) 层，原子 \(i\) 的表示记为 \(\mathbf{x}_i^l \in \mathbb{R}^F\)。初始表示来自核电荷嵌入：

$$\mathbf{x}_i^0 = \mathbf{a}_{Z_i}$$

其中 \(\mathbf{a}_{Z_i}\) 是元素类型 \(Z_i\) 的可学习 embedding。SchNet 不使用原子编号，因此天然满足原子排列不变性的要求。

##### 连续滤波卷积

SchNet 的 interatomic continuous-filter convolution 可以写作：

$$\mathbf{x}_i^{l+1} = \sum_{j=1}^{n} \mathbf{x}_j^l \circ W^l(\mathbf{r}_i - \mathbf{r}_j)$$

其中 \(\circ\) 是逐通道乘法，\(W^l(\cdot)\) 是由神经网络参数化的连续滤波器。为了让能量预测对旋转不变，论文实际使用距离：

$$d_{ij}=\|\mathbf{r}_i-\mathbf{r}_j\|$$

$$\mathbf{x}_i^{l+1} = \sum_{j=1}^{n} \mathbf{x}_j^l \circ W^l(d_{ij})$$

这样如果整个分子被平移或旋转，所有 \(d_{ij}\) 不变，能量输出也不变。力是能量对坐标的负梯度，因此会随坐标旋转而等变。

距离先通过 Gaussian radial basis function 展开：

$$e_k(d_{ij}) = \exp\!\left(-\gamma(d_{ij}-\mu_k)^2\right), \quad k=1,\ldots,K$$

再输入两层 dense 网络和 shifted softplus 得到滤波器：

$$W^l(d_{ij}) = \mathrm{MLP}^l([e_1(d_{ij}),\ldots,e_K(d_{ij})])$$

RBF 展开相当于给连续距离提供一组平滑“刻度”，让滤波器网络更容易区分短程、中程和长程相互作用。

##### 核心算法伪代码

```python
# SchNet forward pass for molecular energy and forces
def schnet_forward(Z, R, num_interactions=3):
    # Z: nuclear charges, R: atom coordinates
    x = atom_embedding(Z)
    D = pairwise_distances(R)  # D[i, j] = ||R_i - R_j||
    rbf = gaussian_rbf_expand(D)

    for block in range(num_interactions):
        z = atomwise_dense[block][0](x)
        filters = filter_mlp[block](rbf)
        v = sum_over_neighbors(z[j] * filters[:, j] for j in atoms)
        v = atomwise_dense[block][1](shifted_softplus(v))
        x = x + v  # residual interaction update

    atom_energies = atomwise_output(x)
    energy = atom_energies.sum()
    forces = -grad(energy, R)
    return energy, forces
```

##### Interaction Block 如何形成多体表示

一个 interaction block 由 atom-wise dense、cfconv、atom-wise dense 以及残差连接组成。Atom-wise layer 对每个原子独立使用同一组权重：

$$\mathbf{y}_i = W\mathbf{x}_i + \mathbf{b}$$

这种共享保证模型对分子大小可扩展，也不会依赖原子编号。cfconv 将周围原子的距离调制信息聚合到中心原子；后续 atom-wise 层重新组合通道。残差形式可以表示为：

$$\mathbf{x}_i^{l+1} = \mathbf{x}_i^l + \mathcal{I}^l_i(\{\mathbf{x}_j^l, d_{ij}\}_{j=1}^{n})$$

多层 interaction block 的直觉是：第一层主要学习局部径向环境，后续层在已经更新过的原子表示上继续传播信息，从而逐渐形成复杂多体相互作用。虽然滤波器只显式依赖两两距离，但连续多轮交互可以表达更高阶的化学环境。

##### 能量预测与守恒力场

SchNet 将总能量写成原子贡献之和：

$$\hat{E} = \sum_i \hat{E}_i$$

这个设计同时满足分子大小可变和原子排列不变。更重要的是，力不由单独网络直接输出，而是由能量对坐标求导得到：

$$\hat{\mathbf{F}}_i = -\frac{\partial \hat{E}}{\partial \mathbf{r}_i}$$

由于力来自同一个标量势能，模型预测的力场天然是能量守恒的。训练时可单独训练能量，也可联合训练能量与力：

$$\mathcal{L}
= \rho\,\|\hat{E}-E\|_2^2
+ \frac{1-\rho}{3N}\sum_{i=1}^{N}\|\hat{\mathbf{F}}_i-\mathbf{F}_i\|_2^2$$

其中 \(\rho\) 控制能量和力的权重。联合训练虽然需要对能量模型求梯度，计算成本更高，但在分子动力学数据上能显著提升数据效率和泛化。

##### 为什么需要 shifted softplus

SchNet 需要对坐标至少二阶可微：训练力损失时，力本身是一阶梯度，优化参数时还要对力误差反传。ReLU 这类分段线性激活会带来不光滑点，不适合平滑势能面。论文使用 shifted softplus：

$$\mathrm{ssp}(x)=\ln(0.5e^x+0.5)$$

它在 \(x=0\) 附近有平滑行为，且满足 \(\mathrm{ssp}(0)=0\)，有助于稳定训练。这个细节体现了 SchNet 面向物理建模的核心约束：不仅要预测数值，还要让预测随坐标变化得合理、连续、可导。

##### 与 MPNN/DTNN/离散卷积的区别

MPNN 可以使用键类型或距离分桶作为边特征，但分桶会使势能面对坐标产生不连续变化，难以用于力场。DTNN 已经使用原子距离建模相互作用，但 SchNet 用连续滤波卷积将这一思想系统化为更接近 CNN 的可扩展架构，并用 interaction block 与原子能量分解实现端到端能量/力预测。

SchNet 的贡献可以概括为：把“卷积核”从固定网格上的离散权重变成距离条件化的连续函数。这样它既保留了卷积的局部共享归纳偏置，又能处理分子中任意位置、任意数量的原子。

> 💡 关键：SchNet 的几何约束来自“只用距离生成滤波器”。这同时带来平移/旋转不变的能量、旋转等变的力，以及可以随原子坐标平滑变化的势能面。

#### 🧪 练习题
```yaml
question: "SchNet 使用原子间距离生成连续滤波器的最直接好处是什么？"
options:
  - "让能量预测对整体旋转和平移保持不变，并避免离散网格带来的不连续性"
  - "让模型完全不需要反向传播即可训练"
  - "强制所有分子的原子数量必须相同"
  - "把分子图转换成 SMILES 字符串后再建模"
answer: 0
explain: "距离在整体旋转和平移下不变；连续滤波器随距离平滑变化，因此比离散网格或距离分桶更适合能量和力的建模。"
```

### JT-VAE

```yaml
id: jtvae
num: 4
name: JT-VAE
full_name: 联结树变分自编码器 (Junction Tree VAE)
year: '2018'
org: MIT
parent: —
paper_url: https://arxiv.org/abs/1802.04364
project_url: ''
category: molecular
motivation: 基于分子子结构的可解释生成模型
```

#### 📝 一句话总结
JT-VAE 提出了先生成分子子结构联结树、再组装成完整分子图的变分自编码器，解决了 SMILES 字符串生成不平滑和逐原子图生成容易产生化学无效中间态的问题。

#### 🎯 核心要点
- **两阶段分子生成**：先解码 junction tree 作为粗粒度骨架，再用图解码器决定子结构之间的具体连接方式
- **子结构词表**：将环、键、单原子等有效化学片段作为 cluster label，避免从非法的单个芳香键等中间状态开始构造
- **双潜变量表示**：用 \(z_T\) 编码树结构和子结构类型，用 \(z_G\) 编码完整分子图的细粒度连接
- **Tree Encoder**：在 junction tree 上做上下行消息传递，获得用于树解码和图组装的上下文表示
- **Graph Encoder**：在原子-键图上做 loopy message passing，捕捉局部化学连接与原子环境
- **Tree Decoder**：按深度优先顺序递归生成树节点，分别预测是否扩展子节点和新节点的 cluster label
- **Graph Decoder/Assembly**：枚举并打分相邻 cluster 的合法拼接方案，逐个局部组装完整分子图
- **化学有效性约束**：解码时屏蔽与当前邻域不兼容的 cluster label 或拼接方式，提高 prior sampling 的有效率

#### 🔬 深入细节
##### 方法总览

![JT-VAE 分子图与联结树双表示](https://ar5iv.labs.arxiv.org/html/1802.04364/assets/paradigm.png)
*图：JT-VAE 将分子图分解为 junction tree，分别编码树与图，再先重建树骨架、后组装完整分子。来源为论文 ar5iv 页面 Figure 3。*

论文来源：arXiv 论文页 https://arxiv.org/abs/1802.04364；PMLR PDF https://proceedings.mlr.press/v80/jin18a/jin18a.pdf；官方实现 https://github.com/wengong-jin/icml18-jtnn；可读 HTML 与图示来源 https://ar5iv.labs.arxiv.org/html/1802.04364。

分子生成的难点在于输出空间同时有图结构约束和化学价态约束。早期 VAE 常生成 SMILES 字符串，但两个结构相近的分子可能有差异很大的规范 SMILES，导致潜空间不平滑；同时，字符串语法合法也不等于化学合法。直接逐原子生成图也有问题：例如芳香环单独拆成一个个键时，中间结构往往不满足化学规则。

JT-VAE 的核心思想是引入化学上有效的子结构作为生成单位。一个分子先被分解为多个 cluster，例如环、非环键、单原子等；这些 cluster 组成满足 running intersection property 的 junction tree。模型先生成这棵树，保证粗粒度骨架由有效片段构成，再解决片段之间如何共享原子或键的细粒度组装问题。

##### 联结树分解

给定分子图 \(G=(V,E)\)，junction tree \(T=(\mathcal{C},\mathcal{E})\) 的每个节点 \(C_i \in \mathcal{C}\) 是 \(G\) 的一个诱导子图或原子集合。它需要满足两个条件：

$$\bigcup_i C_i = V$$

以及 running intersection property：若某个原子同时出现在 \(C_i\) 和 \(C_j\)，则在树上 \(C_i\) 到 \(C_j\) 路径中的所有 cluster 都必须包含该原子。

论文的分解过程针对分子做了简化：先找出所有简单环和不属于环的键；若两个环共享超过两个原子，则将其合并为 bridged ring cluster；再构造 cluster graph 并取最大生成树作为 junction tree。由于任意两个相邻 cluster 最多共享两个原子，后续组装的候选数量可以被有效控制。

##### 核心算法伪代码

```python
# JT-VAE training and sampling sketch
def encode_molecule(G):
    T = tree_decomposition(G)
    z_G = graph_encoder(G)  # loopy message passing on atoms and bonds
    z_T = tree_encoder(T)   # bottom-up and top-down message passing on clusters
    return q_mu_logvar(z_T, z_G)

def decode_molecule(z_T, z_G):
    T_hat = sample_tree_depth_first(z_T)
    for node in depth_first_order(T_hat):
        # enumerate chemically feasible attachments between this cluster and neighbors
        candidates = enumerate_valid_assemblies(node, T_hat)
        scores = [graph_assembly_score(c, z_G, tree_context=T_hat) for c in candidates]
        choose_or_sample_best_candidate(candidates, scores)
    return assembled_molecular_graph(T_hat)

def train_step(G):
    mu_T, logvar_T, mu_G, logvar_G = encode_molecule(G)
    z_T, z_G = reparameterize(mu_T, logvar_T), reparameterize(mu_G, logvar_G)
    tree_loss = teacher_forced_tree_decode_loss(z_T, ground_truth_tree(G))
    graph_loss = teacher_forced_assembly_loss(z_G, ground_truth_graph=G)
    kl = kl_normal(mu_T, logvar_T) + kl_normal(mu_G, logvar_G)
    return tree_loss + graph_loss + beta * kl
```

##### Graph Encoder 与 Tree Encoder

Graph Encoder 在原子图上做消息传递。对有向边 \((u,v)\)，第 \(t\) 轮消息可抽象为：

$$\nu_{uv}^{(t)}
= \tau\!\left(W_1x_u + W_2x_{uv} + W_3\sum_{w \in N(u)\setminus v}\nu_{wu}^{(t-1)}\right)$$

其中 \(x_u\) 是原子特征，\(x_{uv}\) 是键特征，\(\tau\) 通常为 ReLU。经过多轮后，节点表示聚合进入图级表示 \(h_G\)，再由两个仿射层得到变分后验参数：

$$q_\phi(z_G \mid G) = \mathcal{N}(\mu_G(G), \mathrm{diag}(\sigma_G^2(G)))$$

Tree Encoder 在 junction tree 上传递 cluster 消息。每个 cluster 节点用其子结构标签 one-hot 表示。由于树没有环，消息按调度传播：先从叶子到底部向根汇聚，再从根向叶子广播。论文使用树形 GRU，使每个 cluster 的表示含有其子树和全树上下文。

两个编码器分工明确：\(z_T\) 负责“有哪些子结构、骨架怎么连”，\(z_G\) 负责“这些子结构具体如何共享原子和键”。这种拆分比单一潜变量更贴合分子生成的层次结构。

##### Tree Decoder：先生成可解释骨架

Tree Decoder 从 \(z_T\) 出发，以深度优先顺序递归生成 junction tree。每访问一个节点 \(i\)，模型先预测是否继续扩展子节点：

$$p_t = \sigma(f_{\mathrm{topo}}(h_i, z_T, m_i))$$

若决定扩展，则预测新子节点的 cluster label：

$$p_{\ell} = \mathrm{softmax}(f_{\mathrm{label}}(h_i, z_T, m_i))$$

训练时用 teacher forcing，将真实拓扑动作和真实标签喂给下一步，树解码损失为拓扑二分类交叉熵与标签多分类交叉熵之和：

$$\mathcal{L}_{\mathrm{tree}}
= \sum_t \mathrm{CE}(a_t, \hat{a}_t)
+ \sum_t \mathrm{CE}(\ell_t, \hat{\ell}_t)$$

采样时还会构造与当前邻域化学兼容的标签集合，并对不合法标签做 mask。这使模型不只是“事后检查”分子是否合法，而是在生成过程中尽量避免走入不可实现的树骨架。

##### Graph Decoder：组装 cluster 到完整分子

同一棵 junction tree 可能对应多个分子，因为相邻子结构可以用不同原子共享方式连接。Graph Decoder 将完整图生成写成结构化预测：

$$G^* = \arg\max_{G \in \mathcal{G}(T)} f(G)$$

其中 \(\mathcal{G}(T)\) 是与树 \(T\) 一致的候选分子集合。为了降低复杂度，论文不是全局枚举所有分子，而是按树解码顺序逐个 cluster 处理局部邻域：对当前 cluster 与相邻 cluster 的拼接方式进行枚举，过滤价态或结构不合法的候选，再用图消息传递网络给候选子图打分。

候选 \(c\) 的概率可以写作：

$$p(c \mid z_G, T) =
\frac{\exp(s(c, z_G, T))}
{\sum_{c' \in \mathcal{A}(i)} \exp(s(c', z_G, T))}$$

对应训练损失为正确拼接候选的交叉熵：

$$\mathcal{L}_{\mathrm{graph}}
= -\sum_i \log p(c_i^\star \mid z_G, T)$$

这个局部组装策略的优势是可解释且高效：树控制“模块级结构”，图解码器只在局部决定共享原子/键方式。论文指出，在 ZINC 标准药物分子数据上，经过化学剪枝和同构合并后，平均候选数可控，整体复杂度近似随 cluster 数线性增长。

##### VAE 目标与分子优化

JT-VAE 使用标准 VAE 的重参数化采样：

$$z_T = \mu_T + \sigma_T \odot \epsilon_T,\quad z_G = \mu_G + \sigma_G \odot \epsilon_G,\quad \epsilon \sim \mathcal{N}(0,I)$$

总体目标由重建损失和 KL 正则组成：

$$\mathcal{L}
= \mathcal{L}_{\mathrm{tree}}
+ \mathcal{L}_{\mathrm{graph}}
+ \beta\left[
D_{\mathrm{KL}}(q_\phi(z_T\mid G)\|p(z_T))
+ D_{\mathrm{KL}}(q_\phi(z_G\mid G)\|p(z_G))
\right]$$

得到连续潜空间后，可以在 \(z=[z_T,z_G]\) 上训练属性预测器并做贝叶斯优化或梯度优化，再将优化后的潜变量解码回分子。这正是 JT-VAE 相比纯规则生成器的重要价值：它把离散化学结构搜索转化为相对平滑的连续空间搜索，同时尽量保持解码有效性。

##### 与 SMILES VAE 和逐原子图生成的区别

SMILES VAE 的主要瓶颈是表示层面不稳定：同一类结构可能对应差异很大的字符串，潜空间相邻不一定意味着化学相似。逐原子图生成虽然避开字符串，但在构造环、芳香体系和多键结构时会频繁经过非法中间态。JT-VAE 的折中方案是“先结构块、后原子级组装”：用有效子结构提高生成合法性，用图组装保留分子连接的细节。

> 💡 关键：JT-VAE 并不是简单把图 VAE 换成树 VAE，而是把分子生成拆成两个难度更可控的问题：生成有效子结构骨架，以及在骨架约束下选择化学合法的局部拼接。

#### 🧪 练习题
```yaml
question: "JT-VAE 先生成 junction tree 再组装分子图的主要目的是什么？"
options:
  - "把所有分子都强制转换成线性 SMILES 字符串"
  - "先使用有效化学子结构构造骨架，减少非法中间态并提升生成有效性"
  - "避免使用任何图神经网络编码分子"
  - "让模型只预测分子性质而不生成分子"
answer: 1
explain: "junction tree 的节点是环、键等有效子结构。先生成这些结构块的树骨架，再枚举合法拼接方式，可以避免逐原子生成中常见的化学无效中间态。"
```

### FNO

```yaml
id: fno
num: 5
name: FNO
full_name: 傅里叶神经算子 (Fourier Neural Operator)
year: '2020'
org: Caltech/NVIDIA
parent: —
paper_url: https://arxiv.org/abs/2010.08895
project_url: ''
category: neural_operator
motivation: 傅里叶空间学习PDE算子映射
```

#### 📝 一句话总结
FNO 提出了在傅里叶空间参数化积分核的神经算子，用一次训练直接学习 PDE 参数函数到解函数的算子映射，解决 CNN/PINN 等方法依赖固定网格或单个方程实例的问题。

#### 🎯 核心要点
- **函数到函数的算子学习**：学习 \(\mathcal{G}: a(x) \mapsto u(x)\)，而不是学习固定维度向量映射或为每个 PDE 实例重新求解
- **Lift-Fourier-Project 架构**：输入函数先经 \(P\) 升维到通道空间，再堆叠多个 Fourier layer，最后由 \(Q\) 投影回目标解空间
- **傅里叶层核心计算**：对特征场做 FFT，只在低频模式上学习复值线性变换 \(R\)，截断高频后经 IFFT 回到物理空间
- **全局非局部交互**：频域乘法等价于物理空间卷积，单层即可建模全局依赖，比局部卷积更适合椭圆型、流体等 PDE 解算子
- **分辨率不变性**：参数绑定在 Fourier modes 上，而不是绑定在具体网格点上，可在不同网格分辨率之间共享同一组权重
- **零样本超分辨率**：在 \(64 \times 64 \times 20\) Navier-Stokes 数据上训练后，可直接推理到 \(256 \times 256 \times 80\) 时空网格
- **实验覆盖三类 PDE**：Burgers 方程、Darcy Flow、Navier-Stokes 方程，展示固定分辨率精度、跨分辨率泛化和推理速度优势
- **复杂度来自 FFT**：均匀网格上用 FFT 实现频域变换，使全局卷积接近 \(O(n \log n)\)，显著快于直接积分核计算

#### 🔬 深入细节
##### 架构总览

![FNO 架构与 Fourier layer](https://ar5iv.labs.arxiv.org/html/2010.08895/assets/figs/fourier_full_arch5.png)
*图：FNO 的整体神经算子架构和单个 Fourier layer；图片来自论文 arXiv 源包中的 `figs/fourier_full_arch5.png`。*

FNO 的目标不是求一个固定初值或固定系数下的 PDE 解，而是学习一个解算子。设 \(D\) 为空间域，\(a \in \mathcal{A}(D)\) 是 PDE 的参数函数、初值或系数场，\(u \in \mathcal{U}(D)\) 是对应解，FNO 直接近似：

$$
\mathcal{G}^{\dagger}: \mathcal{A}(D) \to \mathcal{U}(D), \qquad a \mapsto u
$$

这和传统有限差分/有限元的思路不同：传统数值方法每来一个新 \(a\) 都要重新迭代求解；FNO 训练完成后，对新的 \(a\) 只需一次前向传播。因此它更像一个可复用的 PDE surrogate solver。

##### 神经算子层

FNO 继承 neural operator 的迭代形式。输入先被局部网络 \(P\) 升维：

$$
v_0(x) = P(a(x))
$$

然后重复更新 \(v_t \mapsto v_{t+1}\)：

$$
v_{t+1}(x) =
\sigma\left(
Wv_t(x) + \left(\mathcal{K}(\phi)v_t\right)(x)
\right)
$$

其中 \(W\) 是逐点线性变换，负责局部通道混合；\(\mathcal{K}\) 是非局部积分算子，负责跨位置的信息传播；\(\sigma\) 是非线性激活。最后输出由另一个局部网络 \(Q\) 给出：

$$
u(x) = Q(v_T(x))
$$

普通神经算子的瓶颈在于积分核：

$$
\left(\mathcal{K}v_t\right)(x)
= \int_D \kappa(x,y)v_t(y)\,\mathrm{d}y
$$

如果直接计算所有 \(x,y\) 的交互，复杂度高且难以扩展。FNO 的关键改动是令核具有卷积结构 \(\kappa(x,y)=\kappa(x-y)\)，再用卷积定理把积分核搬到傅里叶空间。

##### Fourier layer 的关键计算

FNO 将非局部算子定义为：

$$
\left(\mathcal{K}(\phi)v_t\right)(x)
=
\mathcal{F}^{-1}\left(
R_\phi \cdot \mathcal{F}(v_t)
\right)(x)
$$

在离散网格上，\(\mathcal{F}\) 用 FFT 实现，\(R\) 是只作用于低频模式的复值权重张量。对第 \(k\) 个频率模式和输出通道 \(l\)，乘法为：

$$
\left(R \cdot \mathcal{F}(v_t)\right)_{k,l}
=
\sum_{j=1}^{d_v} R_{k,l,j}\left(\mathcal{F}(v_t)\right)_{k,j}
$$

这里 \(d_v\) 是隐空间通道数。实现时只保留前 \(k_{\max}\) 个低频模式，高频被置零；这既降低计算量，也把模型容量集中在 PDE 解中最稳定、能量最大的低频结构上。

```python
# FNO Fourier layer 伪代码：2D 情况
def fourier_layer(v, W, R, modes1, modes2):
    # v: [batch, height, width, channels]
    v_ft = fft2(v)  # 转到频域，得到复值 Fourier modes

    out_ft = zeros_like(v_ft)
    out_ft[:, :modes1, :modes2, :] = complex_channel_mix(
        v_ft[:, :modes1, :modes2, :],
        R
    )
    # 未写入的高频模式保持为 0，相当于截断高频

    global_part = ifft2(out_ft).real
    local_part = pointwise_linear(v, W)
    return activation(global_part + local_part)

def fno_forward(a):
    v = lift_network_P(a)
    for _ in range(num_fourier_layers):
        v = fourier_layer(v, W, R, modes1, modes2)
    return projection_network_Q(v)
```

> 💡 关键：FNO 不是简单把 CNN 换成 FFT。它学习的是连续函数空间上的算子，只是在均匀离散网格上用 FFT 高效实现这个算子。

##### 为什么 Fourier 参数化带来分辨率不变性

CNN 的卷积核通常绑定在固定网格上的局部邻域，例如 \(3 \times 3\) 像素。网格变密时，同一个 \(3 \times 3\) 卷积覆盖的物理尺度发生变化，因此模型容易依赖训练分辨率。FNO 的参数则绑定在频率模式 \(k\) 上，傅里叶基函数 \(e^{2\pi i\langle x,k\rangle}\) 在连续域上定义；只要新网格能表示这些低频模式，同一组 \(R_k\) 就可以用于不同分辨率。

这种设计解释了论文中的 zero-shot super-resolution：模型训练时只见过低分辨率 Navier-Stokes 轨迹，推理时在更密的空间和时间网格上计算 FFT/IFFT，并复用已学习的低频权重。高频并不是完全丢失，因为每个 Fourier layer 后都有非线性激活和局部线性通道混合，多层组合可以逐步恢复更复杂的高频结构。

##### 与传统方法的区别

与有限元、有限差分相比，FNO 不显式求解每个新样本的 PDE 离散方程，而是从数据中学习整个参数化 PDE 家族的解算子；与 PINN 相比，FNO 不需要为每个新初值或系数场重新优化网络；与普通 CNN 相比，FNO 的单层频域卷积天然是全局的，且权重不直接依赖物理网格大小。

论文实验在 Burgers、Darcy Flow 和 Navier-Stokes 三类问题上验证这一点。对时间无关问题，FNO 学习从初值/系数场到最终解的映射；对 Navier-Stokes，FNO-2D 可按时间递推，FNO-3D 则把空间和时间一起视作三维函数场并直接预测后续轨迹。训练通常使用相对误差损失：

$$
\mathcal{L}(\theta)
=
\frac{1}{N}\sum_{i=1}^N
\frac{\|\mathcal{G}_\theta(a_i)-u_i\|_2}{\|u_i\|_2}
$$

这种损失直接度量预测函数和真实解函数之间的整体误差，适合不同 PDE 数据集之间比较。

##### 训练与推理流程

```python
# FNO 训练流程伪代码
for epoch in range(num_epochs):
    for a, u_true in dataloader:
        u_pred = fno_forward(a)
        loss = relative_l2(u_pred, u_true)
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

# 推理时可更换网格分辨率，只要输入被插值/采样到目标网格
u_high_res = fno_forward(a_high_res_grid)
```

实际使用时，FNO 常需要注意边界条件和非均匀网格。FFT 天然对应周期结构，论文通过局部变换 \(W\)、非线性层和输入坐标/边界信息缓解非周期边界；若网格极不规则，则需要改用更一般的神经算子或插值到规则网格。

#### 🧪 练习题
```yaml
question: "FNO 中 Fourier layer 只学习低频 Fourier modes 的主要作用是什么？"
options:
  - "让模型完全忽略高频信息，从而只能预测平滑常数解"
  - "把非局部卷积转化为频域中的少量复值线性变换，降低复杂度并支持跨分辨率泛化"
  - "强制 PDE 满足周期边界条件，因此不再需要训练数据"
  - "把所有空间位置打乱，从而获得排列不变性"
answer: 1
explain: "FNO 在低频模式上学习 R 权重，并用 FFT/IFFT 实现全局卷积；参数绑定在频率模式而非固定网格点上，因此更容易迁移到新分辨率。"
```

### DimeNet

```yaml
id: dimenet
num: 6
name: DimeNet
full_name: 定向消息传递网络 (Directional Message Passing NN)
year: '2020'
org: TU Munich
parent: schnet
paper_url: https://arxiv.org/abs/2003.03123
project_url: ''
category: neural_operator
motivation: 定向消息传递融入键角信息
```

#### 📝 一句话总结
DimeNet 提出把分子图中的边消息而非原子节点作为核心表示，并在消息更新中显式引入键长和键角，从而让 GNN 直接建模分子的方向性相互作用和角势能项。

#### 🎯 核心要点
- **消息嵌入替代节点嵌入**：为有向原子对 \(j \to i\) 建立消息 \(\mathbf{m}_{ji}\)，节点表示由入边消息求和得到
- **方向性消息传递**：更新 \(\mathbf{m}_{ji}\) 时聚合 \(k \to j\) 的邻接消息，并使用夹角 \(\alpha_{(kj,ji)}\) 调制交互
- **键长 + 键角联合表示**：用 2D spherical Fourier-Bessel basis 表示 \((d_{kj}, \alpha_{(kj,ji)})\)，而不是只使用 pairwise distance
- **物理启发的正交基**：用 spherical Bessel functions 和 spherical harmonics 替代常见 Gaussian RBF，减少径向基数量并提升参数效率
- **物理对称性**：预测对原子排列、平移、旋转和反演保持不变；由能量梯度得到的力满足旋转等变性
- **连续可微设计**：使用 Swish 激活和 envelope cutoff，使能量函数二阶连续可微，适合分子动力学中的力预测
- **结构模块清晰**：Embedding block 生成初始消息，多个 Interaction block 做定向传递，Output block 汇总每层原子贡献
- **基准性能**：在 QM9 与 MD17 上优于 SchNet 等距离型 GNN，论文报告在 MD17 平均提升 76%、QM9 平均提升 31%

#### 🔬 深入细节
##### 架构与来源

![DimeNet 官方架构图](https://raw.githubusercontent.com/gasteigerjo/dimenet/master/architecture.svg)
*图：DimeNet 官方实现仓库中的架构图，展示 Embedding、Interaction、Output 三类模块如何围绕有向消息工作。论文源包中的 Figure 4 为 TikZ 源文件 `figures/model.tex`，官方 raw SVG 更适合 Markdown 直接嵌入。*

![2D spherical Fourier-Bessel basis](https://ar5iv.labs.arxiv.org/html/2003.03123/assets/figures/sbf.png)
*图：论文源包中的 2D spherical Fourier-Bessel basis，用于联合编码距离 \(d\) 与角度 \(\alpha\)。*

传统分子 GNN 通常把原子作为节点，边特征主要是原子间距离 \(d_{ij}\)。这种做法天然满足平移和旋转不变性，但会丢失方向信息：两个局部邻域如果具有相同键长但角度排列不同，距离型消息传递很难直接区分。DimeNet 的核心判断是，分子势能不仅包含键长项，还包含角度项和扭转项；如果模型只看 pairwise distance，就需要通过多层间接组合才能学到角势能。

DimeNet 因此把表示对象从原子节点转为有向边消息。消息 \(\mathbf{m}_{ji}\) 表示从原子 \(j\) 指向原子 \(i\) 的方向性信息；当整个分子旋转时，这些方向随分子一起旋转，因此相对角度保持不变。模型最终只使用距离和夹角这类不变量参与计算，从而保证预测能量对整体旋转、平移和反演不变。

##### 从普通 GNN 到定向消息传递

普通分子 GNN 的节点更新可写为：

$$
\mathbf{h}_i^{(l+1)}
=
f_{\text{update}}\left(
\mathbf{h}_i^{(l)},
\sum_{j \in \mathcal{N}_i}
f_{\text{int}}\left(\mathbf{h}_j^{(l)}, \mathbf{e}_{(ij)}^{(l)}\right)
\right)
$$

其中边特征 \(\mathbf{e}_{(ij)}\) 多数只依赖距离 \(d_{ij}\)。DimeNet 改为更新有向消息：

$$
\mathbf{m}_{ji}^{(l+1)}
=
f_{\text{update}}\left(
\mathbf{m}_{ji}^{(l)},
\sum_{k \in \mathcal{N}_j \setminus \{i\}}
f_{\text{int}}\left(
\mathbf{m}_{kj}^{(l)},
\mathbf{e}_{\text{RBF}}^{(ji)},
\mathbf{a}_{\text{SBF}}^{(kj,ji)}
\right)
\right)
$$

这里 \(\mathbf{e}_{\text{RBF}}^{(ji)}\) 表示当前边 \(j \to i\) 的径向距离，\(\mathbf{a}_{\text{SBF}}^{(kj,ji)}\) 联合表示 incoming edge \(k \to j\) 的距离 \(d_{kj}\) 与两条有向边之间的夹角 \(\alpha_{(kj,ji)} = \angle x_k x_j x_i\)。

> 💡 关键：DimeNet 的消息更新类似 belief propagation。更新 \(j \to i\) 时，模型查看所有进入 \(j\) 的其他消息 \(k \to j\)，并用 \((k,j,i)\) 三元组中的角度控制信息如何流动。

##### 物理启发的 Fourier-Bessel 表示

DimeNet 不直接把原始距离和角度喂给 MLP，而是用正交基展开。对距离和角度的联合表示，论文从球坐标下的 Helmholtz 方程出发，得到 spherical Bessel functions \(j_l\) 与 spherical harmonics \(Y_l^m\)。在只保留 \(m=0\) 的情况下，2D spherical Fourier-Bessel basis 为：

$$
\tilde{a}_{\text{SBF},ln}(d,\alpha)
=
\sqrt{\frac{2}{c^3 j_{l+1}^2(z_{ln})}}
j_l\left(\frac{z_{ln}}{c}d\right)Y_l^0(\alpha)
$$

其中 \(c\) 是 cutoff，\(z_{ln}\) 是 \(l\) 阶 Bessel 函数的第 \(n\) 个根。单独的径向距离基可写为：

$$
\tilde{e}_{\text{RBF},n}(d)
=
\sqrt{\frac{2}{c}}
\frac{\sin\left(\frac{n\pi}{c}d\right)}{d}
$$

这比 Gaussian RBF 更有结构：基函数在目标区间上近似正交，频率上界可控，减少冗余参数。论文指出 \(N_{\text{RBF}}\) 可以显著小于 SchNet/PhysNet 中常见的大量 Gaussian basis。

为了让模型适合分子动力学，DimeNet 在 cutoff 处乘上 envelope function，让函数值及一、二阶导数平滑趋近 0：

$$
u(d)
=
1
- \frac{(p+1)(p+2)}{2}d^p
+ p(p+2)d^{p+1}
- \frac{p(p+1)}{2}d^{p+2}
$$

##### 模块级流程

```python
# DimeNet 定向消息传递伪代码
def dimenet_forward(atom_types, positions):
    edges = radius_graph(positions, cutoff=c)
    distances = compute_pairwise_distances(edges, positions)
    angles = compute_triplet_angles(edges, positions)  # k -> j -> i

    rbf = radial_bessel_basis(distances)
    sbf = spherical_bessel_basis(distances, angles)

    # Embedding block: 为每条有向边 j -> i 生成初始消息
    m = {}
    for (j, i) in edges:
        m[j, i] = swish(linear(concat(embed(atom_types[j]),
                                      embed(atom_types[i]),
                                      rbf[j, i])))

    outputs = []
    outputs.append(output_block(m, rbf))

    for layer in range(num_interaction_blocks):
        new_m = {}
        for (j, i) in edges:
            incoming = []
            for k in neighbors(j):
                if k == i:
                    continue
                incoming.append(interaction(m[k, j], rbf[j, i], sbf[k, j, i]))
            new_m[j, i] = update(m[j, i], sum(incoming))
        m = new_m
        outputs.append(output_block(m, rbf))

    return sum(outputs)  # 分子性质或能量
```

Output block 会把每层消息按接收原子求和：

$$
\mathbf{h}_i = \sum_{j \in \mathcal{N}_i}\mathbf{m}_{ji}
$$

再经 MLP 得到原子级贡献 \(t_i^{(l)}\)，最终预测为：

$$
t = \sum_i \sum_l t_i^{(l)}
$$

这种逐原子求和保证了对原子排列的置换不变性。

##### 力预测与损失函数

DimeNet 可以预测分子标量能量 \(f_\theta(\mathbf{X}, \mathbf{z})\)，再通过坐标梯度得到保守力场：

$$
\mathbf{F}_i(\mathbf{X}, \mathbf{z})
=
-
\frac{\partial}{\partial \mathbf{x}_i}
f_\theta(\mathbf{X}, \mathbf{z})
$$

在 MD17 这类同时有能量和力标签的数据上，论文使用能量误差与力误差联合训练：

$$
\mathcal{L}_{\text{MD}}(\mathbf{X}, \mathbf{z})
=
\left|f_\theta(\mathbf{X}, \mathbf{z})-\hat{t}\right|
+
\frac{\rho}{3N}
\sum_{i=1}^{N}\sum_{\alpha=1}^{3}
\left|
-
\frac{\partial f_\theta(\mathbf{X}, \mathbf{z})}{\partial x_{i\alpha}}
-
\hat{F}_{i\alpha}
\right|
$$

这里 \(\rho\) 控制力损失权重。由于力来自能量的梯度，模型需要至少二阶连续可微；这就是 DimeNet 使用 Swish、平滑 cutoff 和连续基函数的原因。

##### 与 SchNet 的核心差异

SchNet 主要通过连续滤波卷积建模距离依赖，已经能处理 3D 坐标和分子性质预测，但它的消息通常仍以节点和 pairwise distance 为中心。DimeNet 则显式构建三元组 \((k,j,i)\)，让消息 \(k \to j\) 通过角度影响消息 \(j \to i\)。这相当于把经典经验势中的角度项直接放进 GNN 的归纳偏置中，因此在量子化学性质和力预测任务上更具样本效率。

#### 🧪 练习题
```yaml
question: "DimeNet 为什么要更新有向边消息 m_ji，而不是只更新原子节点 h_i？"
options:
  - "因为有向边消息可以携带方向信息，并在三元组 k-j-i 中显式利用键角"
  - "因为节点表示无法用于任何分子性质预测"
  - "因为有向边消息会破坏旋转不变性，从而提升模型容量"
  - "因为 DimeNet 不使用原子坐标，只使用 SMILES 字符串"
answer: 0
explain: "DimeNet 的核心是让消息与空间方向关联；更新 m_ji 时聚合 k->j 的消息并使用夹角调制交互，因此能直接建模角势能项。"
```

### ChemBERTa

```yaml
id: chemberta
num: 7
name: ChemBERTa
full_name: ChemBERTa (ChemBERTa)
year: '2020'
org: DeepChem
parent: —
paper_url: https://arxiv.org/abs/2010.09885
project_url: ''
category: molecular
motivation: BERT架构化学分子SMILES预训练
```

#### 📝 一句话总结
ChemBERTa 将 RoBERTa/BERT 式自监督预训练迁移到分子 SMILES 序列上，通过大规模 PubChem 分子字符串的 masked language modeling 学习可迁移的分子表示，用于 MoleculeNet 属性预测。

#### 🎯 核心要点
- **分子 Transformer 预训练**：把 SMILES/SELFIES 当作化学语言序列，使用 RoBERTa 架构学习上下文相关分子 token 表示
- **MLM 自监督目标**：随机 mask 15% token，让模型根据上下文恢复被遮蔽 token，形成化学空间中的表示拓扑
- **PubChem 77M 数据集**：论文整理 7700 万 unique SMILES，并在 100K、250K、1M、10M 子集上研究预训练规模效应
- **RoBERTa 实现细节**：基于 HuggingFace RoBERTa，使用 6 层、12 个 attention heads，总计 72 个注意力机制
- **Tokenization 对比**：比较 BPE 与基于化学正则的 SmilesTokenizer，后者在 Tox21 SR-p53 上略优
- **SMILES vs SELFIES**：探索更鲁棒的 SELFIES 表示，但论文中的 Tox21 结果未显示显著差异
- **MoleculeNet 微调**：在 BBBP、ClinTox、HIV、Tox21 等任务上加线性分类头并用 scaffold split 评估
- **可解释性探索**：使用 BertViz 检查注意力头，观察到部分神经元/头关注功能团、芳香环和括号闭合等 SMILES 语法结构

#### 🔬 深入细节
##### 模型与可视化来源

![ChemBERTa 分子 Transformer 示意图](https://ar5iv.labs.arxiv.org/html/2010.09885/assets/img/bert_chemistry.png)
*图：ChemBERTa 论文源包中的分子 Transformer 示意图，展示 BERT/RoBERTa 风格模型用于化学字符串。*

![ChemBERTa 预训练规模曲线](https://ar5iv.labs.arxiv.org/html/2010.09885/assets/img/scaling_2.png)
*图：预训练数据从 100K 扩展到 10M PubChem SMILES 后，下游 AUC 整体提升。*

ChemBERTa 的出发点很直接：GNN 和化学指纹是分子属性预测的主流，但 NLP 中 Transformer 预训练已经证明，大规模无标签序列可以产生强迁移表示。SMILES 本质上是带语法约束的分子字符串，因此可以把分子建模为语言建模问题，再把预训练模型微调到属性预测任务。

与图神经网络不同，ChemBERTa 不显式构建原子-键图，也不直接使用 3D 构象。它依赖 SMILES 序列中的 token 顺序、分支括号、环编号、原子符号和化学键符号来学习分子结构线索。这使它可以复用 HuggingFace 的高吞吐训练和可视化生态，但也意味着它的结构归纳偏置弱于 3D GNN。

##### RoBERTa 式 MLM 预训练

ChemBERTa 使用 RoBERTa 实现。给定 SMILES token 序列：

$$
\mathbf{x} = (x_1, x_2, \ldots, x_L)
$$

随机选择约 15% 的 token 作为 mask 集合 \(M\)，模型根据未遮蔽上下文预测原 token。损失函数是 masked token 上的交叉熵：

$$
\mathcal{L}_{\text{MLM}}
=
-
\sum_{i \in M}
\log p_\theta(x_i \mid \mathbf{x}_{\setminus M})
$$

对 SMILES 来说，这个任务会迫使模型学习诸如原子价态、环闭合、支链括号、芳香性符号和常见功能团上下文等统计规律。论文使用最大词表 52K、最大序列长度 512，并在 PubChem 子集上预训练。

```python
# ChemBERTa 预训练伪代码
for smiles in pubchem_loader:
    tokens = tokenizer(smiles, max_length=512)
    masked_tokens, labels = random_mask(tokens, mask_ratio=0.15)

    hidden = roberta_encoder(masked_tokens)
    logits = lm_head(hidden)

    loss = cross_entropy(logits[labels != IGNORE], labels[labels != IGNORE])
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
```

##### 数据规模与 tokenization

论文整理了 7700 万 unique PubChem SMILES，并构造 100K、250K、1M、10M 子集。最大 10M 子集的预训练约使用单张 NVIDIA V100 训练 48 小时。实验观察到，从 100K 扩展到 10M 时，BBBP、ClinTox、Tox21 等任务的平均 ROC-AUC 和 PRC-AUC 均提升，说明 Transformer 在分子字符串上也具有类似 NLP 的规模收益。

Tokenization 是 ChemBERTa 的关键变量。默认 BPE 会从字符对频率中学习子词单元，优点是通用、可扩展，缺点是可能把化学语义单元切得不自然。SmilesTokenizer 使用化学正则规则，更倾向于保留 `Cl`、`Br`、环编号、括号、键符号等有意义 token。论文在 PubChem-1M 上训练两个相同模型，发现 SmilesTokenizer 在 Tox21 SR-p53 的 PRC-AUC 上小幅领先：

$$
\Delta \text{PRC-AUC} \approx +0.015
$$

这不是决定性结论，但提示化学感知 tokenization 对分子语言模型很重要。

##### 微调到 MoleculeNet

预训练完成后，ChemBERTa 在下游任务上接线性分类头。给定 `[CLS]` 或池化后的序列表示 \(\mathbf{h}\)，二分类属性预测为：

$$
\hat{y} = \sigma(\mathbf{w}^{\top}\mathbf{h}+b)
$$

训练损失为二元交叉熵：

$$
\mathcal{L}_{\text{clf}}
=
-
y\log \hat{y}
-
(1-y)\log(1-\hat{y})
$$

论文选取 BBBP、ClinTox、HIV、Tox21 等 MoleculeNet 任务，使用 DeepChem 的 scaffold splitter 做 80/10/10 训练、验证、测试划分。scaffold split 比随机划分更接近真实药物发现场景，因为测试集包含训练集中未见过的分子骨架。

```python
# ChemBERTa 微调伪代码
encoder = load_pretrained_chemberta()
classifier = Linear(hidden_dim, num_labels)

for smiles, y in moleculenet_loader:
    tokens = tokenizer(smiles)
    h = encoder(tokens).pooled_output
    y_hat = classifier(h)
    loss = task_loss(y_hat, y)
    update(encoder, classifier, loss)
```

##### 注意力可解释性

![ChemBERTa SMILES attention 示例](https://ar5iv.labs.arxiv.org/html/2010.09885/assets/img/ketone_head_crop.png)
*图：ChemBERTa 使用 BertViz 观察 SMILES token 间注意力，论文报告部分头会关注功能团和括号/分支结构。*

ChemBERTa 的一个优点是可以直接使用 NLP 工具分析注意力。论文用 BertViz 检查 Tox21 分子时，观察到部分注意力头与化学功能团、芳香环相关，另一些神经元追踪括号闭合等 SMILES 语法。这并不能证明模型学到了完整化学机制，但提供了一个可调试入口：当模型预测某个毒性标签时，可以观察哪些 token 对最终表示贡献较大。

##### 与 GNN/指纹方法的差异与限制

ChemBERTa 的优势在于简单、可扩展、可迁移：只需大量无标签 SMILES，就能利用成熟 Transformer 工具链训练分子表征。相比 Morgan fingerprint，它不依赖固定半径哈希特征；相比监督 GNN，它可以先从大规模无标签分子中获得先验。

限制也很明确。SMILES 是一种线性化表示，同一分子可有多种 SMILES；序列模型需要自己从字符串中恢复图结构与化学约束。论文尝试 SELFIES 是为了解决合法性与鲁棒性问题，但早期结果未显示明显优势。另外，ChemBERTa 没有显式 3D 构象、键角、距离或量子化学信息，因此在强依赖几何结构的任务上通常不如专门的 3D GNN 或等变模型。

#### 🧪 练习题
```yaml
question: "ChemBERTa 的 MLM 预训练目标在分子建模中的主要作用是什么？"
options:
  - "直接预测分子的 3D 原子坐标"
  - "根据 SMILES 上下文恢复被遮蔽 token，从无标签分子中学习可迁移表示"
  - "把所有 SMILES 转换成固定 Morgan fingerprint"
  - "只训练最后的分类头，不更新 Transformer 参数"
answer: 1
explain: "ChemBERTa 随机 mask 约 15% 的 SMILES token，并用上下文预测原 token；这种自监督任务让模型学习化学字符串的语法和结构统计规律。"
```

### AlphaFold 2

```yaml
id: alphafold2
num: 8
name: AlphaFold 2
full_name: AlphaFold 2 (AlphaFold 2)
year: '2021'
org: DeepMind
parent: —
paper_url: https://www.nature.com/articles/s41586-021-03819-2
project_url: ''
category: protein_structure
motivation: Evoformer架构基本解决蛋白质折叠
```

#### 📝 一句话总结
AlphaFold 2 提出了以 Evoformer 和 Structure Module 为核心的端到端蛋白质结构预测系统，将 MSA、模板、残基对关系和三维坐标统一优化，显著解决了从氨基酸序列直接预测接近实验精度结构的问题。

#### 🎯 核心要点
- **端到端坐标预测**：从输入序列、MSA 和模板特征直接输出三维原子坐标，不再依赖先预测距离图再手工折叠的分阶段流程
- **Evoformer 双表示架构**：同时维护 MSA representation \(M \in \mathbb{R}^{N_{seq}\times N_{res}\times c_m}\) 与 Pair representation \(Z \in \mathbb{R}^{N_{res}\times N_{res}\times c_z}\)
- **MSA-Pair 持续通信**：通过 row/column attention、outer product mean、pair bias 等操作把进化共变信息持续注入残基对图
- **三角更新机制**：Triangle multiplicative update 与 triangle self-attention 在残基三元组上更新边特征，显式编码几何一致性约束
- **Structure Module**：使用 Invariant Point Attention 在 SE(3) 不变/等变条件下迭代更新每个残基的刚体框架和侧链扭转角
- **FAPE 核心损失**：Frame Aligned Point Error 在局部残基框架内比较预测原子与真实原子位置，使损失对全局旋转和平移不敏感
- **Recycling 迭代细化**：将上一轮预测的 pair/坐标信息重新输入网络，少量额外计算换取明显精度提升
- **自蒸馏与置信度估计**：用高置信无标注序列预测扩充训练集，并输出 pLDDT、PAE/pTM 等结构可靠性指标
- **CASP14 标志性结果**：在 CASP14 域上达到约 \(0.96\) Å median backbone r.m.s.d.\(_{95}\)，显著优于下一名约 \(2.8\) Å

#### 🔬 深入细节
##### 架构总览

![AlphaFold 2 架构与精度示意](https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41586-021-03819-2/MediaObjects/41586_2021_3819_Fig1_HTML.png)
*图：Nature 论文 Fig. 1，展示 AlphaFold 2 从输入序列、MSA、模板到 Evoformer、Structure Module 和 recycling 的整体信息流。*

![Evoformer 与 Structure Module 细节](https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41586-021-03819-2/MediaObjects/41586_2021_3819_Fig3_HTML.png)
*图：Nature 论文 Fig. 3，展示 Evoformer block、三角更新、Invariant Point Attention 和 FAPE 的结构细节。*

##### 核心流程伪代码

```python
# AlphaFold 2 推理流程的高层伪代码
def alphafold2(sequence):
    msa = search_genetic_databases(sequence)
    templates = search_structure_database(sequence)

    M = embed_msa(sequence, msa)              # (N_seq, N_res, c_m)
    Z = embed_pair_features(sequence, templates)  # (N_res, N_res, c_z)
    prev = None

    for recycle in range(num_recycles):
        if prev is not None:
            Z = Z + embed_prev_distogram(prev.coords)
            M[0] = M[0] + embed_prev_single(prev.single)

        for block in range(num_evoformer_blocks):
            M = msa_row_attention_with_pair_bias(M, Z)
            M = msa_column_attention(M)
            Z = Z + outer_product_mean(M)
            Z = triangle_multiplicative_update(Z, mode="outgoing")
            Z = triangle_multiplicative_update(Z, mode="incoming")
            Z = triangle_self_attention(Z, mode="starting_node")
            Z = triangle_self_attention(Z, mode="ending_node")
            M, Z = transition(M), transition(Z)

        single = M[0]                         # target sequence representation
        coords, frames, torsions = structure_module(single, Z)
        prev = Prediction(single=single, coords=coords, frames=frames)

    confidence = predict_plddt(single)
    return coords, confidence
```

##### 动机：从“距离图后处理”到“结构图推理”

AlphaFold 2 之前的深度学习结构预测通常把 MSA 的共进化信号转成 residue-residue contact 或 distance distribution，再用 Rosetta/优化器生成三维结构。这类方法的瓶颈在于：二维距离图并不天然保证能嵌入到一个一致的三维结构中，局部距离预测错误会在后处理阶段累积，并且端到端学习信号无法从最终坐标充分回传到早期特征。

AlphaFold 2 的核心转变是把蛋白质折叠视为三维空间中的图推理问题。残基是节点，pair representation 是有向边，MSA representation 提供进化证据；Evoformer 不断在这两个表示之间传递信息，Structure Module 再把表示落到三维刚体和原子坐标上。这样，网络不只是预测“哪些残基接近”，而是在训练中学习哪些 pair 特征能够形成一个物理上自洽的三维结构。

##### Evoformer：MSA 与 Pair 的双通道推理

Evoformer 每个 block 都让 MSA 和 pair representation 双向通信。MSA row attention 在同一条序列内沿残基维度建模长程依赖，并使用 pair representation 作为 attention bias；MSA column attention 在同一残基位点跨同源序列聚合共变模式；outer product mean 则把 MSA 中的列间相关性转换为 pair 更新：

$$
Z_{ij} \leftarrow Z_{ij} + \text{Linear}\left(\frac{1}{N_{seq}}\sum_s a(M_{s,i}) \otimes b(M_{s,j})\right)
$$

Pair track 的三角操作是 AlphaFold 2 最重要的几何归纳偏置。若 \(i,j,k\) 三个残基构成三角形，那么边 \(i\to j\) 的合理性应受 \(i\to k\) 与 \(k\to j\) 影响。Triangle multiplicative update 通过乘性门控聚合三元组边信息，triangle self-attention 则让一条边以共享端点的其他边为上下文进行注意力更新。

> 💡 关键：三角更新不是显式写入“三角不等式”，而是把三维结构中必须满足的三体一致性变成网络容易学习的信息流模式。

##### Structure Module 与 Invariant Point Attention

Evoformer 输出的 single representation 和 pair representation 会进入 Structure Module。该模块为每个残基维护一个局部刚体框架 \(T_i=(R_i,t_i)\)，并预测 backbone frame 与侧链扭转角。Invariant Point Attention (IPA) 的思想是：query/key/value 不仅有标量特征，也有在残基局部坐标系中定义的点；这些点经当前刚体框架变换到全局坐标后，用距离参与注意力计算。

一个简化的 IPA 注意力权重可以写成：

$$
a_{ij} \propto \text{softmax}_j\left(q_i^\top k_j + b_{ij} - \gamma \sum_p \left\|T_i q_{i,p}^{pt} - T_j k_{j,p}^{pt}\right\|_2^2\right)
$$

由于点之间使用距离项，整体对全局旋转和平移不敏感；由于输出会更新每个残基的刚体框架，坐标预测又具有等变性。这使网络能够在不固定全局坐标系的情况下学习三维几何。

##### FAPE 损失：在局部框架中比较原子位置

AlphaFold 2 的关键结构损失是 Frame Aligned Point Error。对每个参考残基框架 \(i\) 和原子/点 \(j\)，先把真实点 \(x_j\) 与预测点 \(\hat{x}_j\) 分别变换到对应的真实/预测局部框架，再计算距离误差：

$$
\mathcal{L}_{FAPE}
= \frac{1}{Z}\sum_{i,j}
\min\left(
\left\|
T_i^{-1}x_j - \hat{T}_i^{-1}\hat{x}_j
\right\|_2,
d_{clamp}
\right)
$$

这个损失同时关心残基局部朝向和相对位置。它不会因为整条蛋白被整体旋转或平移而变化，但会惩罚局部框架、backbone、side-chain 放置错误。实际训练还加入 distogram 交叉熵、masked MSA 交叉熵、pLDDT 置信度损失、结构 violation loss 等辅助项，可概括为：

$$
\mathcal{L}
= \lambda_{fape}\mathcal{L}_{FAPE}
+ \lambda_{dist}\mathcal{L}_{distogram}
+ \lambda_{msa}\mathcal{L}_{masked\_MSA}
+ \lambda_{conf}\mathcal{L}_{pLDDT}
+ \lambda_{viol}\mathcal{L}_{violation}
$$

##### Recycling 与自蒸馏

Recycling 是 AlphaFold 2 把“反复修模型”的传统结构生物学直觉嵌入神经网络的方式。上一轮输出的坐标会被转成距离/几何特征，加回下一轮的 pair representation；上一轮 single representation 也会参与下一轮输入。与简单堆更深网络相比，recycling 让同一组模块在“已有粗结构”的条件下做细化，尤其有利于域间相对取向和长程接触的修正。

训练数据方面，模型先用 PDB 监督训练，再对大量无标注 Uniclust30 序列生成高置信预测结构，用这些伪标签重新训练。这种 noisy-student 式自蒸馏把未标注序列中的 fold 多样性注入模型，使模型在没有近似模板的新折叠上更稳健。

##### 与传统方法的关键区别

传统 coevolution 方法通常把 MSA 压缩成固定统计量，如 inverse covariance 或 contact score；AlphaFold 2 直接对原始 MSA 做 attention，让模型学习何时信任哪些同源序列。传统距离图方法把几何一致性交给后处理；AlphaFold 2 在 pair track 中用三角信息流提前处理一致性。传统坐标优化依赖手工能量项；AlphaFold 2 则用 IPA 和 FAPE 让最终坐标成为训练目标本身。

#### 🧪 练习题
```yaml
question: "AlphaFold 2 中三角更新机制的核心作用是什么？"
options:
  - "把氨基酸序列翻译成多序列比对"
  - "在残基三元组上更新 pair representation，使残基对关系更符合三维几何一致性"
  - "直接计算所有原子的量子力学能量"
  - "用模板结构替代神经网络预测"
answer: 1
explain: "Triangle multiplicative update 和 triangle self-attention 都围绕残基三元组传播信息，让一条残基对边参考第三个残基相关的边，从而更容易形成可嵌入三维空间的一致结构。"
```

### RoseTTAFold

```yaml
id: rosettafold
num: 9
name: RoseTTAFold
full_name: RoseTTAFold (RoseTTAFold)
year: '2021'
org: Baker Lab/UW
parent: —
paper_url: https://www.science.org/doi/10.1126/science.abj8754
project_url: ''
category: protein_structure
motivation: 三轨网络同时处理序列距离坐标
```

#### 📝 一句话总结
RoseTTAFold 提出了同时在 1D 序列/MSA、2D 残基对距离图和 3D 坐标空间中推理的三轨网络，使蛋白质结构预测、实验结构解析辅助和蛋白复合物建模能够以较低计算成本快速完成。

#### 🎯 核心要点
- **三轨网络**：并行维护 1D sequence/MSA track、2D pair distance/orientation track 和 3D coordinate track
- **跨轨信息流**：1D、2D、3D 表示在网络主体中多次双向交换信息，而不是先完成二维预测再单独做三维折叠
- **SE(3)-equivariant 3D 推理**：3D track 使用等变注意力/Transformer 操作，使坐标更新对旋转和平移保持一致
- **两种结构生成路径**：pyRosetta 版本把预测的距离/取向分布转为 all-atom 模型；end-to-end 版本直接通过 SE(3) 层输出 backbone 坐标
- **不连续 crop 策略**：训练和推理中使用总长约 260 residues 的 discontinuous crops，再聚合 1D/2D 预测以减轻显存压力
- **快速推理**：论文报告在完成序列和模板搜索后，小于 400 residues 的蛋白可在单张 RTX2080 上约 10 分钟生成 backbone 坐标
- **盲测与应用**：在 CASP14 和 CAMEO 上接近或超过当时服务器方法，并用于分子置换、cryo-EM 建模和蛋白复合物预测
- **开放实现**：Baker Lab/RosettaCommons 发布官方代码和服务器，便于结构生物学社区复现、部署和扩展

#### 🔬 深入细节
##### 架构示意

![RoseTTAFold 三轨网络示意](https://science.sciencemag.org/content/sci/early/2021/07/19/science.abj8754/F1.large.jpg)
*图：Science 论文 Fig. 1，展示 RoseTTAFold 的 1D、2D、3D 三轨架构及 CASP/CAMEO 性能。若该 Science 图片直链受访问策略限制，可使用 Baker Lab 提供的论文 PDF 核对同一图：https://www.ipd.uw.edu/wp-content/uploads/2021/07/Baek_etal_Science2021_RoseTTAFold.pdf 。*

##### 核心流程伪代码

```python
# RoseTTAFold 高层推理流程
def rosettafold(sequence):
    msa = build_msa(sequence)
    templates = search_templates(sequence)

    crops = make_discontinuous_crops(sequence, total_len=260)
    all_pair_logits, all_1d_features = [], []

    for crop in crops:
        S = embed_1d_track(msa, crop)              # sequence/MSA features
        P = embed_2d_track(msa, templates, crop)   # distance/orientation pair features
        X = init_3d_track(crop)                    # backbone frames or coarse coordinates

        for block in range(num_three_track_blocks):
            S = sequence_attention(S, pair_bias=P)
            P = update_pair_from_sequence(S, P)
            X = se3_equivariant_update(X, S, P)
            P = update_pair_from_coordinates(P, X)
            S = update_sequence_from_structure(S, X)

        all_1d_features.append(project_to_full_sequence(S, crop))
        all_pair_logits.append(project_to_full_pairs(P, crop))

    pair_logits = average_over_crops(all_pair_logits)
    features_1d = average_over_crops(all_1d_features)

    if use_pyrosetta:
        restraints = convert_logits_to_rosetta_restraints(pair_logits)
        return pyrosetta_fold(sequence, restraints, templates)
    else:
        return final_se3_backbone_decoder(features_1d, pair_logits)
```

##### 动机：为什么要把坐标作为第三条主干？

AlphaFold2 在 CASP14 中展示的思路启发了 Baker Lab：MSA 原始信息、attention、两轨交互、SE(3) 坐标细化和端到端训练都很关键。RoseTTAFold 的问题意识是，若 3D 坐标只在最后阶段出现，网络主体的大部分推理仍停留在 1D/2D 表示中，坐标几何对早期 residue-pair 表示的反馈不足。

RoseTTAFold 因此把 3D track 提前放进主网络。1D track 处理序列和 MSA 的残基上下文；2D track 表示残基对距离、接触和取向；3D track 持有当前结构坐标或骨架框架。三条轨道反复通信，使模型在每一层都能同时问三个问题：这个残基在进化上像什么？它和其他残基的距离/取向应当是什么？这些关系能否形成合理三维构型？

##### 三轨信息如何互相约束

2D pair track 可以作为 1D attention 的 bias，让序列表示在关注远距离残基时利用当前 pair 几何判断；1D track 的更新又能通过外积或投影产生新的 pair 信息，类似从 MSA 共变模式中提取残基对证据。3D track 则通过 SE(3)-equivariant 模块把 pair 信息落实到坐标，并把坐标派生的距离/方向反馈回 2D track。

如果把 \(S_i\) 表示为残基 \(i\) 的 1D 特征，\(P_{ij}\) 表示残基对特征，\(X_i\in\mathbb{R}^3\) 表示当前坐标，一个简化更新可写为：

$$
S_i' = \text{Attn}_{j}(S_i, S_j; P_{ij})
$$

$$
P_{ij}' = P_{ij} + f_{pair}(S_i', S_j', \|X_i-X_j\|)
$$

$$
X_i' = X_i + f_{SE(3)}(S_i', \{P_{ij}'\}_{j}, \{X_j-X_i\}_{j})
$$

这里 \(f_{SE(3)}\) 必须满足旋转/平移等变：若输入坐标整体旋转平移，输出坐标应以同样方式变换。这保证模型学习的是相对几何而不是任意全局坐标。

##### 损失与结构生成

RoseTTAFold 的监督信号可从两个层面理解。第一层是 2D 几何分布：预测残基间距离 \(d_{ij}\) 以及 backbone 取向角 \(\omega_{ij}, \theta_{ij}, \phi_{ij}\)。这类目标通常使用离散 bin 的交叉熵：

$$
\mathcal{L}_{geom}
= \text{CE}(\hat{p}(d_{ij}), d_{ij})
+ \text{CE}(\hat{p}(\omega_{ij}), \omega_{ij})
+ \text{CE}(\hat{p}(\theta_{ij}), \theta_{ij})
+ \text{CE}(\hat{p}(\phi_{ij}), \phi_{ij})
$$

第二层是 3D 坐标和质量评估。end-to-end 版本通过 SE(3)-equivariant 输出 backbone 坐标，并回传坐标级损失；pyRosetta 版本则把距离/取向分布转换为约束势能，与 Rosetta 物理能量一起优化 all-atom 模型：

$$
E_{total}
= E_{Rosetta}
+ \sum_{i,j} w^d_{ij}[-\log \hat{p}(d_{ij})]
+ \sum_{i,j,a} w^a_{ij}[-\log \hat{p}(a_{ij})]
$$

其中 \(a\) 表示取向角类别。pyRosetta 路径计算更慢但能生成侧链完整的 all-atom 模型，并且对较长蛋白的 GPU 显存要求较低；end-to-end 路径更快，适合服务器化和大规模筛选。

##### Crop、聚合与显存权衡

三轨网络参数多、三维轨道显存开销大，论文没有直接把所有大蛋白完整送入训练，而是使用 discontinuous crops：每个 crop 由两个不连续序列片段组成，总长度约 260 residues。这样既能覆盖长程接触，又能把训练样本控制在可承受大小。

推理时，多个 crop 产生的 1D 特征和 2D 距离/取向预测会投回全长蛋白并平均，再进入 pyRosetta 或最终 SE(3) 解码器。这个设计的直觉是：不同区域最有用的 MSA 序列可能不同，局部 crop 允许模型更专注地利用相关同源序列，同时通过全局聚合恢复整条链的结构约束。

##### 与 AlphaFold 2 和 trRosetta 的区别

trRosetta 主要预测 residue-residue distance/orientation，再交给 Rosetta 优化；RoseTTAFold 继承了这种可解释的几何约束输出，但把三维等变推理纳入网络主体。AlphaFold 2 的 Evoformer 和 Structure Module 在精度上更强，尤其配合 recycling、FAPE、自蒸馏和更大模型训练；RoseTTAFold 的特点是以三轨架构更直接地让坐标早期参与推理，并以开放代码和较低推理成本快速服务结构生物学应用。

> ⚠️ 来源说明：Science 页面和早期 sciencemag 图片直链可能因访问策略在部分环境下触发防护；本文方法细节同时依据 Baker Lab 可访问 PDF、Science DOI 元信息和 RosettaCommons 官方实现说明核对。

#### 🧪 练习题
```yaml
question: "RoseTTAFold 相比两轨蛋白结构预测网络的关键设计是什么？"
options:
  - "完全取消 MSA，只使用单条氨基酸序列"
  - "把 1D 序列、2D 残基对和 3D 坐标作为三条轨道，在网络主体中反复交换信息"
  - "只使用 Rosetta 能量函数，不使用深度学习"
  - "先预测所有侧链原子，再推断 backbone"
answer: 1
explain: "RoseTTAFold 的核心是三轨网络：序列/MSA、距离/取向图和三维坐标同步更新，使坐标几何能够在早期层就约束序列与残基对表示。"
```

### DeepONet

```yaml
id: deeponet
num: 10
name: DeepONet
full_name: 深度算子网络 (Deep Operator Network)
year: '2021'
org: Brown University
parent: —
paper_url: https://www.nature.com/articles/s42256-021-00302-5
project_url: ''
category: neural_operator
motivation: Branch-Trunk双网络通用算子学习
```

#### 📝 一句话总结
DeepONet 提出了 Branch Net 编码输入函数、Trunk Net 编码输出查询位置的双网络结构，用可训练基函数展开学习非线性算子 \(G:u\mapsto G(u)\)，解决了从离散观测直接泛化到函数到函数映射的问题。

#### 🎯 核心要点
- **学习对象是算子**：目标不是普通函数 \(f(x)\)，而是输入函数 \(u\) 到输出函数 \(G(u)\) 的映射
- **Branch-Trunk 双网络**：Branch Net 输入固定 sensor 上的函数值 \([u(x_1),\ldots,u(x_m)]\)，Trunk Net 输入输出位置 \(y\)
- **内积式输出**：通过 \(\sum_{k=1}^p b_k(u)t_k(y)\) 合成 \(\hat{G}(u)(y)\)，可理解为“输入相关系数 + 位置相关基函数”
- **Stacked 与 Unstacked 两版**：stacked DeepONet 使用 \(p\) 个 branch nets；unstacked DeepONet 用一个 branch net 输出 \(p\) 维系数，参数更少且泛化更好
- **mesh-free 输出查询**：训练数据只要求输入函数使用同一组 sensors，输出函数可在任意位置 \(y\) 采样
- **理论来源清晰**：结构受非线性算子通用逼近定理启发，并把浅层定理扩展为更易训练的深层网络
- **训练目标简单**：用输入函数样本、查询点和真实输出值组成 triples，以均方误差监督
- **应用覆盖广**：论文展示了积分、分数阶 Laplacian、ODE/PDE 解算子、确定性与随机动力系统等多类显式和隐式算子

#### 🔬 深入细节
##### 架构示意

![DeepONet 架构示意](https://media.springernature.com/m312/springer-static/image/art%3A10.1038%2Fs42256-021-00302-5/MediaObjects/42256_2021_302_Fig1_HTML.png)
*图：Nature Machine Intelligence 论文 Fig. 1，展示输入/输出函数设定、training data、stacked DeepONet 与 unstacked DeepONet。*

![DeepONet arXiv 版架构图](https://ar5iv.labs.arxiv.org/html/1910.03193/assets/x1.png)
*图：arXiv 早期版本的 Fig. 1，可更清楚地看到 Branch Net 输出系数 \(b_k\)、Trunk Net 输出基函数 \(t_k\) 后做逐项乘积求和。*

##### 核心算法伪代码

```python
# DeepONet 训练流程
def train_deeponet(dataset, sensors):
    # dataset: [(u_values_at_sensors, y_query, target_value), ...]
    branch = BranchNet(input_dim=len(sensors), output_dim=p)
    trunk = TrunkNet(input_dim=dim_y, output_dim=p)
    bias = learnable_scalar()

    for batch in dataloader(dataset):
        u_sensor, y, target = batch
        b = branch(u_sensor)        # (batch, p), coefficients depending on input function u
        t = trunk(y)                # (batch, p), basis values depending on output coordinate y
        pred = (b * t).sum(dim=-1) + bias

        loss = mean_squared_error(pred, target)
        loss.backward()
        optimizer.step()
        optimizer.zero_grad()

    return branch, trunk, bias
```

##### 问题设定：从函数学习函数

普通监督学习通常拟合有限维映射 \(f:\mathbb{R}^d\to\mathbb{R}^q\)。科学计算中的许多问题更自然地表示为算子：给定一个输入函数 \(u(x)\)，输出另一个函数 \(s(y)=G(u)(y)\)。例如，\(u\) 可以是初始条件、边界条件、源项、介质系数或随机激励，\(G(u)\) 可以是 ODE/PDE 的解函数。

DeepONet 的训练样本不是完整连续函数，而是三元组：

$$
\left([u_i(x_1),\ldots,u_i(x_m)],\; y_{ij},\; G(u_i)(y_{ij})\right)
$$

其中 \(x_1,\ldots,x_m\) 是固定 sensors，用来离散表示输入函数；\(y_{ij}\) 是输出函数的查询点，可以是不规则、非网格、每个样本不同的位置。这一点使 DeepONet 和把函数当图像处理的 CNN 方法明显不同。

##### Branch-Trunk 公式

DeepONet 的核心公式非常紧凑。Branch Net 读取输入函数在 sensors 上的值并输出 \(p\) 个系数，Trunk Net 读取查询点并输出 \(p\) 个基函数值：

$$
b(u)=\left[b_1(u),\ldots,b_p(u)\right]
$$

$$
t(y)=\left[t_1(y),\ldots,t_p(y)\right]
$$

最终预测为二者内积加偏置：

$$
\hat{G}_{\theta}(u)(y)
= \sum_{k=1}^{p} b_k\left(u(x_1),\ldots,u(x_m)\right)t_k(y) + b_0
$$

直觉上，Trunk Net 学到一组全局共享的“输出空间基函数”，Branch Net 根据输入函数 \(u\) 预测这些基函数的组合系数。与固定 Fourier/多项式基不同，\(t_k(y)\) 本身也是从数据中学出来的，因而能适应非线性动力系统的解空间。

##### 损失函数与训练数据

训练目标是对所有采样三元组最小化均方误差：

$$
\min_{\theta}
\frac{1}{N}\sum_{i=1}^{n}\sum_{j=1}^{q_i}
\left|
\hat{G}_{\theta}(u_i)(y_{ij}) - G(u_i)(y_{ij})
\right|^2
$$

这里 \(q_i\) 是第 \(i\) 个输入函数对应的输出查询点数量。一个输入函数可以搭配多个 \(y\) 产生多条训练样本，因此模型学习的不是固定网格上的输出向量，而是可被任意查询的连续输出函数。

##### Stacked 与 Unstacked DeepONet

论文从算子通用逼近定理得到 stacked 结构：一个 trunk net 输出 \(t_1,\ldots,t_p\)，并行的 \(p\) 个 branch nets 分别输出 \(b_1,\ldots,b_p\)。这和理论形式高度一致，但计算和内存开销较大。

Unstacked DeepONet 把 \(p\) 个 branch nets 合并为一个共享网络，一次输出 \(p\) 维系数。形式上仍然是同一个内积公式，但参数量更小、训练更快。论文实验中，unstacked 版本常出现训练误差略高但测试误差更低的现象，说明共享 branch 参数起到了正则化作用，降低了泛化误差。

##### 为什么这种结构适合算子学习？

如果直接把 \([u(x_1),\ldots,u(x_m),y]\) 拼接后送入普通 FNN，网络需要同时学习“输入函数如何影响解”和“输出坐标如何参数化解”这两件不同的事。DeepONet 把二者拆开：Branch 只负责识别输入函数，Trunk 只负责表达输出域。这个归纳偏置与算子本身的结构一致，因此即使子网络只是普通 FNN，也能比直接拼接的 FNN 泛化得更好。

这种结构也解释了 DeepONet 与 PINN/FNO 的区别。PINN 通常针对单个 PDE 实例优化一个解函数，DeepONet 学的是跨许多输入函数的解算子；FNO 通常在规则网格上用 Fourier 卷积学习场到场映射，DeepONet 的输出查询天然是 mesh-free 的，但输入 sensors 通常需要在训练集中保持一致。

##### 传感器数量与离散化误差

算子学习的一个关键误差来源是：连续输入函数 \(u\) 被有限个 sensors 表示。如果 sensors 太少，Branch Net 看到的离散值不足以区分不同输入函数；如果 sensors 很多，优化和泛化难度上升。论文理论分析表明，所需 sensor 数与输入函数族的光滑性有关。例如从带 RBF kernel 的 Gaussian random field 采样时，length scale 越大，函数越平滑，较少 sensors 就能有效表示输入。

> 💡 关键：DeepONet 的误差不仅来自神经网络逼近能力，还来自输入函数离散化、训练优化和有限数据泛化。Branch-Trunk 结构主要是在后两者上提供更好的归纳偏置。

#### 🧪 练习题
```yaml
question: "DeepONet 中 Branch Net 和 Trunk Net 的分工是什么？"
options:
  - "Branch Net 编码输入函数在 sensors 上的值，Trunk Net 编码输出查询位置 y"
  - "Branch Net 负责求 PDE 残差，Trunk Net 负责自动微分"
  - "Branch Net 只用于训练，Trunk Net 只用于推理"
  - "Branch Net 编码时间，Trunk Net 编码优化器状态"
answer: 0
explain: "DeepONet 的核心是把输入函数和输出位置分开建模：Branch Net 产生依赖 u 的系数，Trunk Net 产生依赖 y 的基函数值，二者内积得到 G(u)(y)。"
```

### EGNN

```yaml
id: egnn
num: 11
name: EGNN
full_name: E(n)等变图神经网络 (E(n) Equivariant GNN)
year: '2021'
org: UvA
parent: —
paper_url: https://arxiv.org/abs/2102.09844
project_url: ''
category: neural_operator
motivation: E(n)等变性保证旋转平移不变
```

#### 📝 一句话总结
EGNN 提出了一种只用标量消息和相对坐标向量更新节点坐标的 E(n) 等变图神经网络，解决了 3D 分子、点云和 N-body 系统中普通 GNN 不满足旋转、平移、反射等对称性的问题，同时避免了球谐函数和高阶张量表示的计算开销。

#### 🎯 核心要点
- **E(n) 等变目标**：同时满足平移、旋转、反射等变，以及节点置换等变，适用于任意维欧氏空间中的点集图
- **EGCL 层设计**：每层同时更新节点特征 \(h_i\) 和坐标 \(x_i\)，坐标更新由相对向量 \((x_i-x_j)\) 与标量边权相乘得到
- **距离驱动消息**：边消息输入包括节点特征、边属性和平方距离 \(\|x_i-x_j\|^2\)，保证消息本身对 E(n) 变换不变
- **无需高阶表示**：不使用 spherical harmonics、Clebsch-Gordan 系数或 irreducible representation，计算上比 TFN/SE(3)-Transformer 更轻
- **特征不变、坐标等变**：节点隐藏特征保持旋转/平移不变，坐标输出随输入几何变换同步变换
- **支持速度扩展**：在动力系统中可加入速度 \(v_i\)，用等变方式预测动量或位移
- **可学习边关系**：当图结构未知时，可以从边消息中推断软邻接 \(e_{ij}\)，再调制消息聚合
- **验证场景多样**：论文在带电粒子 N-body、图自编码器、QM9 分子属性预测上验证 EGNN 的数据效率和性能

#### 🔬 深入细节
##### 等变示意图

![EGNN 旋转等变示意图](https://ar5iv.labs.arxiv.org/html/2102.09844/assets/x1.png)
*图：对输入图先旋转再经过网络，与先经过网络再旋转输出应得到一致结果。来源为论文 ar5iv 页面 Figure 1。*

论文来源：arXiv 论文页 https://arxiv.org/abs/2102.09844；可读 HTML 与图示来源 https://ar5iv.labs.arxiv.org/html/2102.09844。

普通 GNN 只关心图上的节点和边，天然满足节点重编号下的置换等变，却不保证三维坐标的几何对称性。对分子或物理粒子系统来说，把整个系统旋转、平移或镜像，不应该改变标量属性；如果任务输出坐标或速度，输出也应该被同样旋转、平移或镜像。EGNN 的设计目标就是把这种物理归纳偏置直接写入消息传递层。

给定图 \(G=(V,E)\)，每个节点有标量特征 \(h_i^l\) 和坐标 \(x_i^l \in \mathbb{R}^n\)。第 \(l\) 个 Equivariant Graph Convolutional Layer 首先为每条边构造不变消息：

$$m_{ij}=\phi_e\left(h_i^l,h_j^l,\|x_i^l-x_j^l\|^2,a_{ij}\right)$$

其中 \(\phi_e\) 是 MLP，\(a_{ij}\) 是可选边属性。关键是只把平方距离送入 \(\phi_e\)，而不是直接把绝对坐标送入 MLP；平方距离在平移、旋转和反射下都不变。

##### 核心算法伪代码

```python
# One EGNN / EGCL layer
def egcl_layer(h, x, edge_attr, edges):
    # h[i]: invariant node feature, x[i]: equivariant coordinate
    messages = {}
    coord_delta = {i: 0 for i in nodes}
    agg = {i: 0 for i in nodes}

    for i, j in edges:
        r2 = squared_norm(x[i] - x[j])
        m_ij = phi_e(concat(h[i], h[j], r2, edge_attr[i, j]))
        messages[i, j] = m_ij

        # scalar weight times relative vector: still transforms as a vector
        w_ij = phi_x(m_ij)
        coord_delta[i] += (x[i] - x[j]) * w_ij
        agg[i] += m_ij

    for i in nodes:
        x_next[i] = x[i] + coord_delta[i] / max(1, degree(i))
        h_next[i] = phi_h(concat(h[i], agg[i]))

    return h_next, x_next
```

##### 坐标更新为什么等变

EGNN 的核心坐标更新为：

$$x_i^{l+1}=x_i^l+C\sum_{j\neq i}(x_i^l-x_j^l)\phi_x(m_{ij})$$

这里 \(C\) 常取 \(1/(M-1)\) 或邻居数归一化，\(\phi_x(m_{ij})\) 输出标量。设整体坐标做 E(n) 变换 \(x_i \mapsto Qx_i+g\)，其中 \(Q\) 是正交矩阵、\(g\) 是平移向量，则相对向量满足：

$$x_i-x_j \mapsto Q(x_i-x_j)$$

平方距离不变：

$$\|Qx_i+g-(Qx_j+g)\|^2=\|Q(x_i-x_j)\|^2=\|x_i-x_j\|^2$$

因此 \(m_{ij}\) 和 \(\phi_x(m_{ij})\) 都不变，而相对向量整体乘上 \(Q\)。求和后坐标增量也乘上 \(Q\)，最后再加上被同样变换的 \(x_i\)，所以 \(x_i^{l+1}\) 与输入坐标保持同样的旋转、反射和平移关系。

节点特征更新则只依赖不变消息的聚合：

$$m_i=\sum_{j\neq i}m_{ij},\qquad h_i^{l+1}=\phi_h(h_i^l,m_i)$$

所以 \(h_i\) 是 E(n) 不变的标量表示。对分子能量、图分类等标量任务，可以进一步使用 permutation-invariant readout，例如 \(\hat{y}=\rho(\sum_i h_i^L)\)；对坐标预测任务，则直接读取 \(x_i^L\)。

##### 与 GNN、SchNet 和 SE(3) 方法的区别

标准 GNN 消息一般写作：

$$m_{ij}=\phi_e(h_i,h_j,a_{ij}),\qquad h_i'=\phi_h(h_i,\sum_j m_{ij})$$

它没有坐标更新机制，若把坐标直接拼进特征，MLP 会学习到依赖坐标系方向和原点位置的函数，旋转或平移输入会破坏预测一致性。SchNet 等距离型模型能输出旋转不变的标量属性，但如果需要输出坐标或速度，仅依赖距离不足以产生等变向量场。

TFN、SE(3)-Transformer 通过不可约表示和球谐函数在特征通道中维护不同阶张量，表达力强，但计算复杂且主要面向三维空间。EGNN 选择更朴素的路径：所有可学习消息都是标量，唯一的向量来源是相对坐标 \((x_i-x_j)\)。这个约束降低了表示复杂度，却足以覆盖很多 AI4Sci 中常见的标量-向量任务。

##### 速度扩展与动力系统建模

在 N-body 预测中，粒子还带有速度 \(v_i\)。论文给出带速度的变体：

$$v_i^{l+1}=\phi_v(h_i^l)v_i^l+C\sum_{j\neq i}(x_i^l-x_j^l)\phi_x(m_{ij})$$

$$x_i^{l+1}=x_i^l+v_i^{l+1}$$

\(\phi_v(h_i^l)\) 是标量门控，因此 \(v_i\) 在旋转或反射下仍作为向量等变变换。这个形式接近学习一个物理向量场：节点特征决定相互作用强弱，相对位置决定力或位移方向。

##### 边推断与训练目标

如果图的邻接未知，EGNN 可以先假设全连接图，再用边消息估计软边：

$$e_{ij}=\phi_{\mathrm{inf}}(m_{ij})$$

并在消息聚合时用 \(e_{ij}m_{ij}\) 进行加权。这适合粒子系统或点云中“哪些对象真正相互作用”未知的场景。

训练损失由任务决定。N-body 坐标预测通常使用位置 MSE：

$$\mathcal{L}_{\mathrm{pos}}=\frac{1}{BN}\sum_{b=1}^{B}\sum_{i=1}^{N}\|\hat{x}_{b,i}^{T}-x_{b,i}^{T}\|_2^2$$

QM9 分子属性预测则对分子级标量属性使用 MAE/MSE 监督。核心收益来自结构性约束：模型不需要从数据中反复学习“同一个物理系统旋转后仍是同一个系统”，因此在小数据和需要几何泛化的任务上更省样本。

> 💡 关键：EGNN 的等变性不是靠数据增强学出来的，而是由“距离生成标量消息、相对坐标生成向量更新”这两个设计保证的。

#### 🧪 练习题
```yaml
question: "EGNN 坐标更新保持 E(n) 等变性的关键原因是什么？"
options:
  - "把绝对坐标直接输入一个足够大的 MLP"
  - "用平方距离产生标量边权，再乘以相对坐标向量进行坐标更新"
  - "在每一层随机旋转训练样本以增强数据"
  - "只使用全连接图而不使用边属性"
answer: 1
explain: "平方距离在旋转、平移、反射下不变，标量权重不随坐标系改变；相对坐标向量会按同样的正交变换旋转，因此加权和仍是等变向量。"
```

### ESM-2

```yaml
id: esm2
num: 12
name: ESM-2
full_name: 进化尺度建模2 (Evolutionary Scale Modeling 2)
year: '2022'
org: Meta AI
parent: —
paper_url: https://www.science.org/doi/10.1126/science.ade2574
project_url: ''
category: protein_structure
motivation: 150亿参数蛋白质语言模型无需MSA
```

#### 📝 一句话总结
ESM-2 将 BERT 式蛋白质语言模型扩展到 150 亿参数，使单条氨基酸序列的上下文表示中涌现出可用于原子级结构预测的进化与几何信息；ESMFold 在此基础上训练折叠头，绕过 MSA 和模板搜索，实现高通量单序列结构预测。

#### 🎯 核心要点
- **大规模蛋白质语言模型**：ESM-2 以 Transformer 编码器建模蛋白质序列，模型族从 8M 扩展到 15B 参数
- **自监督预训练**：使用 masked language modeling，从大量天然蛋白序列中学习残基上下文、保守性和长程依赖
- **无需 MSA 推理**：ESMFold 直接从 primary sequence 预测结构，不需要 AlphaFold/RoseTTAFold 常用的多序列比对和模板搜索
- **三模块折叠架构**：ESM-2 stem 产生残基表示，folding trunk 迭代更新序列与 pairwise 表示，structure module 输出全原子坐标
- **序列-结构桥接**：语言模型每层隐藏状态被组合成 per-residue embedding，并初始化或调制 residue-pair 表示
- **AlphaFold 式几何模块**：folding trunk 维护 \(s_i\) 和 \(z_{ij}\)，通过三角更新、轴向注意力和结构模块把关系图转成 3D 构象
- **置信度输出**：预测结构同时给出 pLDDT、pTM、PAE 等可靠性信号，便于筛选高置信结构
- **超大规模应用**：论文用该能力构建 ESM Metagenomic Atlas，预测超过 6.17 亿条宏基因组蛋白序列，其中超过 2.25 亿条为高置信预测

#### 🔬 深入细节
##### 架构总览

![ESMFold 三模块架构示意图](https://folding.baulab.info/images/paper/esmfold_architecture.png)
*图：ESMFold 将输入序列送入 ESM-2 语言模型，再由 folding trunk 和 structure module 生成三维坐标。该图来自可访问的 ESMFold 机制分析页面，概括了 Lin et al. Science 论文中的 ESMFold 三模块结构。*

来源说明：正式论文 DOI 为 https://www.science.org/doi/10.1126/science.ade2574；当前环境中 Science 正文和 bioRxiv 图片受浏览器校验限制。摘要和元数据通过 NCBI E-utilities 可访问：https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=36927031&retmode=xml；模型、权重和用法参考 Meta 官方仓库 https://github.com/facebookresearch/esm；ESMFold 模块字段参考 Hugging Face 文档 https://huggingface.co/docs/transformers/en/model_doc/esm。

ESM-2 的基本观察是：蛋白质序列像自然语言一样存在强上下文约束，但约束来源不是语法，而是进化选择和三维折叠。一个残基能否出现在某个位置，取决于远处残基、疏水核心、二硫键、二级结构和功能位点等因素。大规模 masked language modeling 迫使模型从单序列语料中恢复这些约束，随着参数和数据规模增大，注意力和隐藏状态中会出现可用于接触图、二级结构和全原子折叠的信号。

##### ESM-2 预训练目标

给定蛋白质序列 \(a=(a_1,\ldots,a_L)\)，随机选择 mask 集合 \(\mathcal{M}\)，用 Transformer 编码被遮蔽后的序列。训练目标是预测被遮蔽位置的氨基酸：

$$\mathcal{L}_{\mathrm{MLM}}=-\sum_{i\in\mathcal{M}}\log p_\theta(a_i\mid a_{\setminus \mathcal{M}})$$

与普通文本 BERT 类似，模型输出每个位置的上下文化表示 \(h_i^l\)。不同的是，蛋白质词表较小，序列长度可达数百到数千，长程依赖具有明确结构含义：空间上接近的残基可能在线性序列上相距很远，语言模型必须通过注意力捕捉这种非局部耦合。

##### 核心算法伪代码

```python
# Simplified ESM-2 pretraining and ESMFold inference
def pretrain_esm2(batch_sequences):
    tokens, mask_positions, labels = mask_amino_acids(batch_sequences)
    hidden_states = esm2_transformer(tokens, return_all_layers=True)
    logits = lm_head(hidden_states[-1])
    loss = cross_entropy(logits[mask_positions], labels[mask_positions])
    update_esm2(loss)

def esmfold_infer(sequence):
    layer_states = esm2(sequence, return_all_layers=True)
    s = learned_layer_mix(layer_states)      # per-residue representation s_i
    z = init_pair_representation(sequence)   # pair representation z_ij

    for block in folding_trunk:
        s, z = block.update_sequence_and_pairs(s, z)

    coords, frames, angles = structure_module(s, z)
    confidence = confidence_heads(s, z, coords)
    return coords, confidence
```

##### 从语言模型到折叠模型

ESMFold 不是重新训练一个从零开始的结构网络，而是把 ESM-2 当作序列知识的 stem。一个常见抽象写法是把各层隐藏状态做可学习加权：

$$s_i^{0}=\sum_{\ell=0}^{L_{\mathrm{LM}}}\alpha_\ell h_{i}^{\ell}$$

其中 \(\alpha_\ell\) 是训练得到的层权重，\(s_i^0\) 是每个残基的初始序列表示。pairwise 表示 \(z_{ij}\) 可由相对位置编码、序列表示组合和 trunk 内部更新逐步形成：

$$z_{ij}^{0}=E(i-j)+g(s_i^0,s_j^0)$$

folding trunk 同时维护两类状态：每个残基的 \(s_i\)，以及每对残基的 \(z_{ij}\)。这很接近 AlphaFold2 Evoformer 的思想，但输入信息来源不同：AlphaFold2 主要从 MSA 和模板中获得进化共变信息，ESMFold 让大语言模型在单序列上下文中提供这种信息。

##### Folding trunk 的机制

folding trunk 的作用是把“序列语义”变成“几何蓝图”。序列表示 \(s_i\) 通过自注意力交换全局上下文，pairwise 表示 \(z_{ij}\) 通过三角乘法更新、三角注意力和行列注意力传播残基对关系。简化地看，每个 block 在做：

$$s^{k+1}, z^{k+1}=T_k(s^k,z^k)$$

其中 \(z_{ij}\) 越到后层越像距离图、接触图和相对构象约束。structure module 再把最终 \(s,z\) 转换为刚体框架、扭转角和原子坐标：

$$\hat{X}=\mathrm{StructureModule}(s^K,z^K)$$

模型还输出 distogram logits、pLDDT、pTM 和 predicted aligned error 等置信度信号。它们帮助区分“模型知道怎么折”的区域和天然无序或低置信区域。

##### 损失函数与监督信号

预训练阶段只需要序列，不需要结构标签；折叠阶段需要 PDB 等结构监督。可以把 ESMFold 的训练目标概括为：

$$\mathcal{L}=\mathcal{L}_{\mathrm{coord}}+\lambda_d\mathcal{L}_{\mathrm{distogram}}+\lambda_c\mathcal{L}_{\mathrm{confidence}}+\lambda_{\mathrm{aux}}\mathcal{L}_{\mathrm{aux}}$$

其中 \(\mathcal{L}_{\mathrm{coord}}\) 约束预测坐标或局部框架与真实结构一致，\(\mathcal{L}_{\mathrm{distogram}}\) 用残基对距离分箱交叉熵训练 \(z_{ij}\)，\(\mathcal{L}_{\mathrm{confidence}}\) 训练 pLDDT/pTM/PAE 等置信度头。这个表达式是方法级简化，具体权重和结构模块细节以原论文和实现为准。

##### 为什么“无需 MSA”重要

MSA 的核心价值是提供进化共变：如果两个残基在进化中协同突变，它们很可能空间接近或功能耦合。但构建 MSA 要查询大型序列数据库，速度慢，对孤儿蛋白、低同源蛋白和大规模宏基因组扫描尤其昂贵。ESM-2 把这种统计规律压缩进模型参数，使推理时只需输入一条序列。

这带来两个直接后果：第一，单条蛋白结构预测速度大幅提升，适合高通量筛选；第二，模型可以预测缺乏丰富同源序列的蛋白，但置信度仍取决于训练分布和序列本身是否给出足够折叠线索。论文报告的 ESM Metagenomic Atlas 正是利用这一点，对超过 6.17 亿宏基因组蛋白进行结构预测。

##### 与 AlphaFold2/RoseTTAFold 的区别

AlphaFold2 的 Evoformer 显式处理 MSA representation 和 pair representation，强依赖外部数据库搜索；RoseTTAFold 通过三轨网络同步处理序列、距离和坐标。ESMFold 的主要取舍是把 MSA 查询替换为大规模语言模型参数：牺牲部分依赖显式同源证据的精度上限，换取端到端单序列推理速度和部署简洁性。

> 💡 关键：ESM-2 本身是蛋白质语言模型，ESMFold 是把 ESM-2 表征转成结构的折叠系统。它的突破不只是“更大的 Transformer”，而是证明大规模序列预训练能在没有 MSA 的情况下提供足够强的结构先验。

#### 🧪 练习题
```yaml
question: "ESMFold 相比 AlphaFold2 推理流程的核心差异是什么？"
options:
  - "ESMFold 完全不使用神经网络，只做物理能量最小化"
  - "ESMFold 直接从单条序列和 ESM-2 表征预测结构，不需要推理时构建 MSA 或模板搜索"
  - "ESMFold 只预测二级结构，不输出原子坐标"
  - "ESMFold 必须为每个蛋白重新训练一个专用模型"
answer: 1
explain: "ESMFold 用预训练 ESM-2 表征替代推理时的外部同源序列搜索，再由 folding trunk 和 structure module 输出三维结构。"
```

### FourCastNet

```yaml
id: fourcastnet
num: 13
name: FourCastNet
full_name: 傅里叶预报网络 (Fourier ForeCasting Neural Network)
year: '2022'
org: NVIDIA
parent: —
paper_url: https://arxiv.org/abs/2202.11214
project_url: ''
category: materials_weather
motivation: 傅里叶神经算子+ViT实现快速气象预报
```

#### 📝 一句话总结
FourCastNet 将 Adaptive Fourier Neural Operator 与 ViT 式 token 框架结合，在 0.25° ERA5 全球网格上学习 6 小时天气状态演化算子，解决了传统深度学习气象模型分辨率低、难以捕捉极端事件且推理太慢的问题，实现了秒级中期全球预报和大规模集合预报。

#### 🎯 核心要点
- **高分辨率全球预报**：在 \(720\times1440\) 的 0.25° 经纬网格上预测全球天气状态，约对应赤道附近 30 km 空间分辨率
- **AFNO + ViT 架构**：将输入气象场切成 patch token，用傅里叶域全局卷积替代二次复杂度自注意力做空间混合
- **20 个预报变量 backbone**：预测风、温度、位势高度、相对湿度、地面气压、海平面气压、整层水汽等关键 ERA5 变量
- **降水诊断模型**：总降水不放入 backbone 主状态，而是用单独 AFNO 模型从 backbone 输出诊断 6 小时累计降水
- **两阶段训练**：先学习单步 \(t\rightarrow t+6h\) 映射，再用两步自回归 fine-tuning 缓解长期 roll-out 误差积累
- **自回归推理**：推理时反复把预测场作为下一步输入，生成数天到一周的自由运行预报
- **极端事件能力**：能解析台风、飓风、近地面风速、强降水和 atmospheric river 等细尺度现象
- **集合预报优势**：单节点多 GPU 可快速批量推理，论文估计相对 IFS 在节点时间和能耗上有数万倍量级优势

#### 🔬 深入细节
##### 架构总览

![FourCastNet AFNO 架构与训练推理流程](https://ar5iv.labs.arxiv.org/html/2202.11214/assets/afno_plus_v1.png)
*图：AFNO Transformer 主干、两步 fine-tuning、降水诊断模型和自回归推理流程。来源为论文 ar5iv 页面 Figure 2。*

论文来源：arXiv 论文页 https://arxiv.org/abs/2202.11214；可读 HTML 与图示来源 https://ar5iv.labs.arxiv.org/html/2202.11214。

FourCastNet 把天气预报视为一个数据驱动的算子学习问题。输入不是单点时间序列，而是一个包含多通道物理变量的全球二维场：

$$X_t\in\mathbb{R}^{720\times1440\times20}$$

模型学习 6 小时时间步长的状态转移：

$$F_\theta: X_t \mapsto X_{t+\Delta t},\qquad \Delta t=6\ \mathrm{hours}$$

这与传统 NWP 的差异很大：NWP 显式求解离散化流体动力学方程和物理参数化，FourCastNet 则用 ERA5 再分析数据监督学习这个转移算子。

##### AFNO 层核心计算

FourCastNet 的关键模块是 Adaptive Fourier Neural Operator。输入场先被划分为 \(p\times p\) patch，例如 \(p=8\)，每个 patch 被嵌入为 \(d\) 维 token，形成：

$$X\in\mathbb{R}^{h\times w\times d}$$

每个 AFNO layer 先在二维 patch 网格上做离散傅里叶变换：

$$\hat{X}_{u,v}=\mathrm{DFT}(X)_{u,v}$$

然后在频域对 token 做共享的块对角 MLP 和软阈值稀疏化：

$$\hat{Y}_{u,v}=S_\lambda\left(\mathrm{MLP}_{\mathrm{block}}(\hat{X}_{u,v})\right)$$

其中软阈值可写为：

$$S_\lambda(z)=\mathrm{sign}(z)\max(|z|-\lambda,0)$$

最后逆傅里叶变换回空间 token，并加残差：

$$Y=X+\mathrm{IDFT}(\hat{Y})$$

与 ViT 自注意力的 \(\mathcal{O}(N^2)\) 空间混合不同，FFT 带来约 \(\mathcal{O}(N\log N)\) 的复杂度，因此能处理 \(720\times1440\) 这种百万像素级全球场。

##### 核心算法伪代码

```python
# FourCastNet training and autoregressive inference
def train_backbone(batch):
    x_t, x_t1, x_t2 = batch  # 6-hour interval ERA5 states

    # pretraining: one-step forecast
    pred_t1 = fcn_backbone(x_t)
    loss_one = mse(pred_t1, x_t1)

    # fine-tuning: two-step rollout
    pred_t1 = fcn_backbone(x_t)
    pred_t2 = fcn_backbone(pred_t1)
    loss_two = mse(pred_t1, x_t1) + mse(pred_t2, x_t2)

    update(loss_one_or_loss_two)

def forecast(initial_state, steps):
    x = initial_state
    trajectory = []
    for k in range(steps):
        x = fcn_backbone(x)
        precip = precipitation_afno(x)
        trajectory.append((x, precip))
    return trajectory
```

##### 训练数据与变量设计

论文使用 ERA5 再分析数据，将小时级数据下采样到每天 00/06/12/18 UTC，即 6 小时间隔。训练集为 1979-2015，验证集为 2016-2017，2018 年及以后作为 out-of-sample 测试。backbone 变量包括近地面风、2m 温度、气压、多个气压层的风速/温度/位势高度/相对湿度，以及 total column water vapor。

单步预训练目标可写为：

$$\mathcal{L}_{1}=\|F_\theta(X_t)-X_{t+1}\|_2^2$$

但天气系统是混沌动力系统，推理时模型会吃自己的输出；如果只训练单步，误差分布和训练输入分布会逐步错开。FourCastNet 因此做两步 fine-tuning：

$$\hat{X}_{t+1}=F_\theta(X_t),\qquad \hat{X}_{t+2}=F_\theta(\hat{X}_{t+1})$$

$$\mathcal{L}_{2}=\|\hat{X}_{t+1}-X_{t+1}\|_2^2+\|\hat{X}_{t+2}-X_{t+2}\|_2^2$$

这个训练目标让模型在训练阶段提前暴露于自己的预测误差，降低自由运行数十步后的漂移。

##### 为什么降水单独建模

总降水 \(P\) 和温度、风、位势高度不同，分布高度稀疏，大量位置接近 0，同时极端值长尾。论文将降水作为 diagnostic variable，而不是 backbone 的 20 个 prognostic variables 之一。降水模型输入 backbone 预测的大气状态，输出 6 小时累计降水。

为了缓解长尾和零值问题，论文对降水使用对数变换，方法可概括为：

$$P'=\log(1+P/\epsilon)$$

预测后再变换回物理单位。降水模型最后增加带周期 padding 的 2D 卷积和 ReLU，以保证输出非负：

$$\hat{P}=\mathrm{ReLU}(\mathrm{Conv2D}(G_\psi(\hat{X})))$$

这样主干网络专注于控制大气演化的状态变量，降水网络专注于从状态中诊断稀疏降水场。

##### 自回归推理与集合预报

推理时，FourCastNet 从某个 ERA5 初始条件开始自由运行：

$$\hat{X}_{t+k+1}=F_\theta(\hat{X}_{t+k}),\qquad k=0,\ldots,K-1$$

每一步间隔 6 小时，所以 16 步就是 96 小时预报。论文展示了 2018 年 9 月 8 日初始化后的 96 小时近地面风速预报，能捕捉 Super Typhoon Mangkhut 以及 Florence、Issac、Helene 等气旋相关结构。

快速推理还带来集合预报优势。给定初始条件 \(X_0\)，可以加入小扰动形成多个 ensemble members：

$$X_0^{(m)}=X_0+\sigma\epsilon^{(m)},\qquad \epsilon^{(m)}\sim\mathcal{N}(0,I)$$

然后把 \(m\) 个成员放到 batch 维度并行 rollout。集合均值：

$$\bar{X}_{t+k}=\frac{1}{M}\sum_{m=1}^{M}\hat{X}_{t+k}^{(m)}$$

可用于提高较长提前期的平均技巧分数，并估计初值不确定性。传统 IFS 也做集合预报，但每个成员都要昂贵地求解数值模式；FourCastNet 的 GPU batch 推理让 100 到 1000 成员集合在研究场景中变得便宜。

##### 与传统 NWP 和低分辨率 DL 模型的区别

传统 NWP 的优势是物理可解释、守恒律和长期业务积累，但需要大规模 CPU/HPC 资源，并依赖复杂的物理参数化。早期深度学习天气模型通常在 \(32\times64\) 或更粗网格上训练，难以解析近地面风、强降水、台风眼墙和地形影响。FourCastNet 的创新在于把高分辨率图像建模中的 Fourier token mixing 搬到全球大气场，使模型在百万像素级输入上仍能全局混合信息。

> 💡 关键：FourCastNet 不是简单 CNN 天气预报器，而是把“高分辨率大气状态转移”当作傅里叶神经算子来学习；AFNO 的频域全局混合是它能同时兼顾全球依赖、细尺度结构和推理速度的核心。

#### 🧪 练习题
```yaml
question: "FourCastNet 使用 AFNO 代替标准 ViT 自注意力做空间混合的主要原因是什么？"
options:
  - "AFNO 在傅里叶域用 FFT 实现全局混合，复杂度更适合高分辨率全球网格"
  - "AFNO 会自动求解 Navier-Stokes 方程而不需要训练数据"
  - "AFNO 只能处理单变量时间序列，因此更简单"
  - "AFNO 的目标是把降水值强制设为 0"
answer: 0
explain: "标准自注意力随 token 数近似二次增长；AFNO 在频域做全局 token mixing，利用 FFT 将复杂度降到约 O(N log N)，适合 0.25° 全球气象场。"
```

### M3GNet

```yaml
id: m3gnet
num: 14
name: M3GNet
full_name: 材料三体图网络 (Materials 3-body Graph Network)
year: '2022'
org: UC San Diego
parent: —
paper_url: https://www.nature.com/articles/s43588-022-00349-3
project_url: ''
category: materials_weather
motivation: 三体相互作用GNN材料建模
```

#### 📝 一句话总结
M3GNet 在材料图神经网络中显式加入三体角度相互作用，并用能量对坐标和晶格应变的自动微分同时得到力与应力，解决了普通材料 GNN 难以作为平滑通用原子间势的问题。

#### 🎯 核心要点
- **三体材料图**：在原子节点和成键边之外，显式计算同一中心原子周围的键-键夹角，让消息传递包含 \(i-j-k\) 三体环境
- **坐标与晶格进入图表示**：把原子坐标 \(\mathbf{R}\) 和晶格矩阵 \(\mathbf{L}\) 纳入模型，使力与应力可由总能量自动微分得到
- **平滑距离基函数**：边距离展开使用在截断半径处数值、一阶导和二阶导都平滑消失的基函数，避免邻居进出 cutoff 时能量和导数跳变
- **Many-body to bond 模块**：先把三体角度信息汇入边特征，再执行标准的边、原子、全局状态图卷积更新
- **原子能量加和读出**：每个原子经 gated MLP 输出原子能量，所有原子能量求和得到总能量，天然适配不同大小晶体
- **能量-力-应力联合训练**：通用势训练同时拟合 DFT 能量、力和应力，使用 Huber 损失稳定处理大范围 relaxation 数据
- **周期表级数据覆盖**：MPF.2021.2.8 数据集覆盖 89 种元素、62,783 个化合物和 187,687 个离子步
- **材料发现应用**：用 M3GNet 快速弛豫 3,166 万个假想晶体，筛出约 184.9 万个潜在稳定材料，并用 DFT 验证 top-2000 中 1,578 个稳定

#### 🔬 深入细节
##### 架构总览

![M3GNet 多体图势架构](https://media.springernature.com/m312/springer-static/image/art%3A10.1038%2Fs43588-022-00349-3/MediaObjects/43588_2022_349_Fig1_HTML.png)
*图：M3GNet 从包含坐标的材料图出发，经图 featurizer、三体 many-body 计算、many-body to bond、图卷积和原子能量读出，输出能量、力与应力。来源为 Nature Computational Science 论文 Figure 1。*

论文来源：Nature 论文页 https://www.nature.com/articles/s43588-022-00349-3；arXiv 可读版本 https://ar5iv.labs.arxiv.org/html/2202.02450；MatGL 文档对 M3GNet 架构和预训练势也有说明 https://matgl.ai/。

M3GNet 的直接目标不是只预测一个静态材料属性，而是学习一个可用于结构弛豫、分子动力学和材料筛选的原子间势。传统材料 GNN 往往只把原子看作节点、近邻键看作边，用两两距离作为边特征；这种模型可以做属性回归，但当邻居跨过截断半径时，能量、力和应力的连续性很难保证。M3GNet 因此把原子坐标、晶格和三体角度都纳入图计算。

给定材料图 \(G=(V,E,u;\mathbf{R},\mathbf{L})\)，节点 \(i\) 表示原子，边 \((i,j)\) 表示 cutoff 内的近邻关系，\(u\) 是可选全局状态。原子特征由元素原子序数 embedding 得到，边特征来自距离

$$
r_{ij}=\|\mathbf{R}_j-\mathbf{R}_i+\mathbf{L}\mathbf{n}_{ij}\|
$$

其中 \(\mathbf{n}_{ij}\) 是周期性镜像偏移。为了让势能面对原子位置平滑，距离被展开为满足 cutoff 平滑约束的基函数：

$$
\mathbf{b}_{ij}=[b_1(r_{ij}),\ldots,b_K(r_{ij})], \quad
b_k(r_c)=b_k'(r_c)=b_k''(r_c)=0
$$

这保证不只是能量值，连力和应力所需的一阶、二阶导数在邻居列表边界也不会突然跳变。

##### 核心算法伪代码

```python
# M3GNet universal interatomic potential
def m3gnet_forward(structure, cutoff_pair=5.0, cutoff_three_body=4.0):
    graph = build_periodic_graph(structure, cutoff=cutoff_pair)
    h = element_embedding(graph.atomic_numbers)      # atom features
    e = smooth_distance_basis(graph.distances)       # bond features
    triplets = enumerate_triplets(graph, cutoff_three_body)

    for block in range(num_blocks):
        # many-body to bond: inject angular environment into each bond
        angle_messages = {}
        for (k, i, j) in triplets:
            theta = angle_between(i, k, j, structure.positions)
            basis = spherical_bessel_harmonic_basis(
                graph.distance(i, j), graph.distance(i, k), theta
            )
            angle_messages[(i, j)] += three_body_mlp(
                h[i], h[j], h[k], e[(i, j)], e[(i, k)], basis
            )
        e = e + angle_messages

        # graph convolution: update bonds, atoms and optional state
        for (i, j) in graph.edges:
            e[(i, j)] = bond_update_mlp(h[i], h[j], e[(i, j)], graph.state)
        for i in graph.nodes:
            m_i = sum(e[(i, j)] for j in graph.neighbors(i))
            h[i] = atom_update_mlp(h[i], m_i, graph.state)
        graph.state = state_update_mlp(h, e, graph.state)

    atomic_energy = {i: energy_mlp(h[i]) for i in graph.nodes}
    energy = sum(atomic_energy.values())
    forces = -grad(energy, structure.positions)
    stress = grad(energy, structure.strain) / structure.volume
    return energy, forces, stress
```

##### 三体相互作用为什么重要

在许多晶体中，局部稳定性不仅由某一对原子的距离决定，也由键角决定。例如四面体、八面体配位和层状结构即使拥有相似的近邻距离，也可能因为角度排列不同而有完全不同的能量。传统两体消息传递需要多层间接传播才可能区分这些角度模式，而 M3GNet 在每个中心原子 \(i\) 上枚举相邻键 \((i,j)\) 与 \((i,k)\)，直接把夹角

$$
\theta_{jik}=\angle(\mathbf{r}_{ij},\mathbf{r}_{ik})
$$

编码进边更新。论文采用球贝塞尔函数和球谐函数构造三体基，直观上可写成：

$$
\mathbf{a}_{jik}
= \mathrm{SBF}(r_{ij}, r_{ik}, \theta_{jik})
\odot c(r_{ij})c(r_{ik})
$$

其中 \(c(\cdot)\) 是平滑 cutoff 函数。随后每条边 \((i,j)\) 汇聚所有第三原子 \(k\) 贡献：

$$
\tilde{\mathbf{e}}_{ij}
= \mathbf{e}_{ij}
+ \sum_{k\in \mathcal{N}(i)\setminus j}
\phi_3(\mathbf{h}_i,\mathbf{h}_j,\mathbf{h}_k,\mathbf{e}_{ij},\mathbf{e}_{ik},\mathbf{a}_{jik})
$$

这一步就是论文 Figure 1 中的 many-body to bond 模块。它借鉴 Tersoff 等传统多体势的思想：某条键的强弱要由中心原子的完整配位环境调制，而不是只由两端原子决定。

##### 图卷积与读出

三体信息注入边之后，M3GNet 执行多轮标准材料图更新。一个简化写法是：

$$
\mathbf{e}_{ij}^{t+1}
= \mathbf{e}_{ij}^{t}
+ \phi_e([\mathbf{h}_i^t,\mathbf{h}_j^t,\mathbf{e}_{ij}^t,\mathbf{u}^t,\mathbf{b}_{ij}])
$$

$$
\mathbf{h}_i^{t+1}
= \mathbf{h}_i^{t}
+ \phi_v\left([\mathbf{h}_i^t,\sum_{j\in \mathcal{N}(i)}\mathbf{e}_{ij}^{t+1},\mathbf{u}^t]\right)
$$

$$
\mathbf{u}^{t+1}
= \phi_u\left(\mathbf{u}^{t}, \sum_i \mathbf{h}_i^{t+1}, \sum_{(i,j)}\mathbf{e}_{ij}^{t+1}\right)
$$

\(\phi_e,\phi_v,\phi_u\) 在实现中使用 gated MLP。门控结构相当于让模型同时学习“候选更新”和“是否通过该更新”，在多轮传播中能更稳定地融合局部几何、元素类型和全局状态。

对原子间势，M3GNet 将总能量拆成原子能量加和：

$$
\hat{E} = \sum_{i=1}^{N}\hat{\epsilon}_i,\quad
\hat{\epsilon}_i=\phi_{\mathrm{readout}}(\mathbf{h}_i^T)
$$

这种读出满足原子排列不变性，也让模型可迁移到不同原子数的结构。力和应力不由独立网络输出，而是从同一个能量函数求导：

$$
\hat{\mathbf{F}}_i = -\frac{\partial \hat{E}}{\partial \mathbf{R}_i}
$$

$$
\hat{\boldsymbol{\sigma}} = \frac{1}{V}\frac{\partial \hat{E}}{\partial \boldsymbol{\epsilon}}
$$

这里 \(\boldsymbol{\epsilon}\) 是晶格应变。这样得到的力场与能量一致，避免了能量和力由两个模型分别预测时可能出现的非守恒问题。

##### 训练目标与数据

通用 M3GNet IAP 使用 Materials Project 十年结构弛豫过程中积累的中间构型，而不只是最终稳定结构。MPF.2021.2.8 数据包含 187,687 个离子步、187,687 个能量标签、16,875,138 个力分量和 1,689,183 个应力分量，覆盖 89 个元素。论文强调，只用能量训练会导致力和应力导数误差被放大，因此最终模型联合拟合三类物理量：

$$
\mathcal{L}
= \lambda_E\,\mathcal{H}_{\delta}\left(\frac{\hat{E}}{N},\frac{E_{\mathrm{DFT}}}{N}\right)
+ \lambda_F\,\frac{1}{3N}\sum_{i,\alpha}
\mathcal{H}_{\delta}(\hat{F}_{i\alpha},F^{\mathrm{DFT}}_{i\alpha})
+ \lambda_{\sigma}\,\frac{1}{9}\sum_{\alpha,\beta}
\mathcal{H}_{\delta}(\hat{\sigma}_{\alpha\beta},\sigma^{\mathrm{DFT}}_{\alpha\beta})
$$

\(\mathcal{H}_{\delta}\) 是 Huber 损失。Huber 损失在小误差区间像 MSE，在大误差区间像 MAE，适合处理 relaxation 数据中跨度很大的能量、力和应力。训练前还会用线性回归拟合元素参考能并从总能量中扣除，降低不同化学组成带来的基线差异。

##### 与 MEGNet、SchNet 和传统势的区别

MEGNet 等早期材料图网络擅长材料性质预测，但它们通常没有面向力和应力设计连续可微的能量面；SchNet 通过连续距离滤波器处理分子坐标，但主要依靠两两距离和多层传播来形成多体效应。M3GNet 的差异在于把“可作为势能函数”作为结构设计约束：距离基函数要在 cutoff 处高阶平滑，三体角度要直接进入边更新，总能量要通过自动微分导出力和应力。

传统经验势如 EAM、MEAM、Tersoff 具有明确物理形式和高效率，但通常需要针对单元素或少量化学空间重新拟合。M3GNet 用元素 embedding 和共享图网络把这种局部多体势思想扩展到周期表级化学空间。论文中的单元素基准显示 M3GNet 接近局部环境 ML-IAP 的精度，同时更容易扩展到多元素组合。

##### 材料发现流程

M3GNet 的最终应用是大规模候选晶体筛选。流程是：先从 ICSD 结构原型出发做等价离子替换，生成 31,664,858 个假想晶体；然后用 M3GNet 快速弛豫结构并估计能量；再根据相对于 Materials Project 凸包的能量距离筛选潜在稳定材料；最后对优先级最高的候选做 DFT 验证。M3GNet 不是替代最终 DFT，而是把昂贵的第一性原理计算前移到更小、更有希望的候选集合。

> 💡 关键：M3GNet 的核心不是“多加一个角度特征”，而是把三体局部几何、平滑势能面、能量-力-应力一致性和周期表级元素 embedding 组合成一个可用于实际结构弛豫的通用材料势。

#### 🧪 练习题
```yaml
question: "M3GNet 为什么要从总能量自动微分得到力和应力，而不是用独立网络直接预测它们？"
options:
  - "这样可以保证力和应力与同一个势能函数一致，并支持结构弛豫和分子动力学"
  - "这样可以完全避免使用 DFT 数据"
  - "这样可以让模型只处理分子而不能处理周期晶体"
  - "这样可以把三体角度信息从模型中删除"
answer: 0
explain: "力和应力是能量对坐标和应变的导数，由同一能量函数导出可保持物理一致性；这也是 M3GNet 能作为原子间势使用的关键。"
```

### Galactica

```yaml
id: galactica
num: 15
name: Galactica
full_name: Galactica (Galactica)
year: '2022'
org: Meta AI
parent: —
paper_url: https://arxiv.org/abs/2211.09085
project_url: ''
category: science_llm
motivation: 120B参数科学专用分词LaTeX/SMILES
```

#### 📝 一句话总结
Galactica 提出了一组面向科学知识的 decoder-only Transformer 语言模型，通过 curated 科学语料、特殊科学模态 token 和 prompt pre-training，解决通用 LLM 在论文、公式、引用、SMILES 与蛋白序列等科学文本上表示低效的问题。

#### 🎯 核心要点
- **科学专用语料**：训练语料约 106B tokens，包含 48M 篇论文、代码、参考材料、知识库、过滤 CommonCrawl、prompt 数据和其他科学来源
- **模型规模族**：发布 GAL 125M、1.3B、6.7B、30B、120B 五个规模，最大模型 120B 参数
- **decoder-only Transformer**：使用 2048 上下文窗口、GeLU、无 bias dense/layer norm、学习式位置编码和 50k BPE 词表
- **科学模态 tokenization**：对引用、数学符号、数字、SMILES、氨基酸序列、DNA 序列使用特殊起止 token 和字符级拆分策略
- **引用建模接口**：用 `[START_REF]... [END_REF]` 表示论文引用，使模型可在上下文中预测可能的文献引用
- **工作记忆 token**：用 `<work>...</work>` 包裹中间推理步骤，为数学和科学推理提供类似 scratchpad 的训练格式
- **Prompt pre-training**：把问答、化学性质、摘要、实体抽取、推理等 prompt 数据混入预训练，而不是只在后期 instruction tuning
- **重复 token 训练**：在 curated corpus 上训练约 450B tokens，约 4.25 个 epoch，论文报告验证损失在多轮重复后仍持续下降
- **科学任务收益**：在 LaTeX 方程、PubMedQA、MedMCQA、MATH、数学 MMLU、分子与蛋白相关任务上相对通用模型表现更强

#### 🔬 深入细节
##### 框架总览

![Galactica Prompt Pre-training 示意图](https://ar5iv.labs.arxiv.org/html/2211.09085/assets/figs/prompt_pretraining_new.png)
*图：Galactica 将 prompt pre-training 放在普通预训练和 instruction tuning 之间，以较弱的任务偏置提升下游科学任务，同时尽量保留通用生成能力。来源为 ar5iv 论文 Figure 5。*

论文来源：arXiv 论文页 https://arxiv.org/abs/2211.09085；可读 HTML 与图示来源 https://ar5iv.labs.arxiv.org/html/2211.09085。论文没有给出新的注意力层结构图，核心创新主要在科学语料构造、token 接口和预训练配方；上图展示的是其训练范式，而模型主体仍是标准自回归 Transformer。

Galactica 的基本建模目标与 GPT 类模型相同：给定 token 序列 \(x_1,\ldots,x_T\)，最大化每个 token 在过去上下文下的条件概率。训练损失是 causal language modeling 交叉熵：

$$
\mathcal{L}_{\mathrm{LM}}
= -\frac{1}{T}\sum_{t=1}^{T}
\log p_{\theta}(x_t \mid x_{<t})
$$

差异在于 \(x_t\) 不只是普通网页文本 token。Galactica 把论文、公式、引用、代码、化学式、蛋白序列和 prompt 都转换成统一 markdown-like 序列，使同一个自回归模型同时学习“科学文献语言”和“自然对象序列语言”。

##### 核心算法伪代码

```python
# Galactica pre-training pipeline
def galactica_pretrain(raw_sources):
    documents = []
    for source in raw_sources:
        doc = normalize_to_markdown(source)
        doc = wrap_citations(doc, start="[START_REF]", end="[END_REF]")
        doc = wrap_smiles(doc, start="[START_SMILES]", end="[END_SMILES]")
        doc = wrap_amino_acids(doc, start="[START_AMINO]", end="[END_AMINO]")
        doc = wrap_dna(doc, start="[START_DNA]", end="[END_DNA]")
        doc = wrap_reasoning_steps(doc, start="<work>", end="</work>")
        documents.append(doc)

    tokenizer = train_bpe(documents_sample=sample(documents, ratio=0.02),
                          vocab_size=50_000)
    token_stream = tokenizer.encode(documents)
    token_stream += tokenizer.encode(prompt_pretraining_tasks())

    model = DecoderOnlyTransformer(
        context_length=2048,
        activation="GeLU",
        learned_position_embeddings=True,
        use_bias=False,
    )

    for batch in make_causal_lm_batches(token_stream):
        logits = model(batch.input_ids)
        loss = cross_entropy(logits[:, :-1], batch.input_ids[:, 1:])
        adamw_step(model, loss, grad_clip=1.0)
    return model
```

##### 为什么语料设计是 Galactica 的核心

通用 LLM 常从大规模网页抓取语料学习语言规律，但科学任务有几个明显不同点。第一，科学文本的信息密度高，公式、单位、变量和引用都很重要；第二，许多对象本身就是序列，例如 SMILES、DNA 和蛋白质；第三，科研工作流经常需要从自然语言跳到文献引用、数学推导或结构化标签。Galactica 因此采用 curated corpus，而不是简单扩大通用网页数据。

论文给出的 Galactica Corpus 约 106B tokens，其中论文占最大比例，约 88B tokens；代码和参考材料各约 7B tokens；知识库约 2B tokens；prompt 数据约 0.4B tokens。这个规模小于许多通用 LLM 语料，但作者强调语料质量和领域匹配，使模型可以在同一批高价值 token 上训练多个 epoch。

重复训练的假设可以写成一种数据效率权衡。若高质量领域语料集合为 \(\mathcal{D}_{sci}\)，通用网页语料为 \(\mathcal{D}_{web}\)，Galactica 选择提高

$$
\mathbb{E}_{x\sim \mathcal{D}_{sci}}[-\log p_{\theta}(x)]
$$

上的优化深度，而不是无条件扩大 \(\mathcal{D}_{web}\)。论文报告 120B 模型在第五个 epoch 初期才出现过拟合迹象，这支持了“curated scientific tokens 可被重复利用”的经验判断。

##### 科学 tokenization 机制

Galactica 的 tokenization 不是只训练一个 BPE 词表后结束，而是在科学模态边界上显式加入控制 token。几个关键规则如下：

```text
Citations:
  [START_REF]Attention Is All You Need, Vaswani[END_REF]

SMILES:
  [START_SMILES]C(C(=O)O)N[END_SMILES]
  -> C, (, C, (, =, O, ), O, ), N

Amino acid sequence:
  [START_AMINO]MIRLGAPQTL[END_AMINO]
  -> M, I, R, L, G, A, P, Q, T, L

DNA:
  [START_DNA]CGGTACCCTC[END_DNA]
  -> C, G, G, T, A, C, C, C, T, C

Reasoning:
  <work> intermediate derivation or executable calculation trace </work>
```

字符级拆分对 SMILES、氨基酸和 DNA 特别重要。若直接依赖普通 BPE，模型可能把低频化学片段切成不稳定子词，难以泛化到新分子或新序列；字符级 token 则保留了自然字母表。引用 token 的作用是把论文中的 citation graph 变成语言模型可预测的序列片段，使模型在生成综述或回答问题时能学习“什么上下文通常引用什么工作”。

##### `<work>` 与 prompt pre-training

`<work>` 不是新网络模块，而是一种训练时显式暴露推理中间态的文本接口。对数学题或科学计算题，训练样本将推导步骤包在 `<work>...</work>` 中；有些样本还展示写 Python 脚本并读取结果的格式。模型仍然只做 next-token prediction，但它在预训练阶段已经见过“先展开工作区，再给出答案”的格式。

这与纯 chain-of-thought prompting 的区别在于：Galactica 不依赖测试时临时发现提示词，而是在预训练数据中直接植入这种接口。prompt pre-training 也类似。论文把化学性质预测、多选问答、摘要、实体抽取、推理、对话等任务转成文本 prompt 后混入预训练，使模型在保持生成式语言模型目标的同时，增加任务格式的先验。

可以把总训练目标理解为普通语料和 prompt 语料的混合：

$$
\mathcal{L}
= \mathbb{E}_{x\sim \mathcal{D}_{corpus}}
\mathcal{L}_{\mathrm{LM}}(x)
+ \alpha\,
\mathbb{E}_{x\sim \mathcal{D}_{prompt}}
\mathcal{L}_{\mathrm{LM}}(x)
$$

其中 \(\alpha\) 并不是论文中显式给出的单独超参数，而是由 prompt tokens 在混合 token 流中的比例隐式决定。直觉上，prompt pre-training 比 instruction tuning 更早、更弱；它不是把模型强行压到某个助手风格，而是让任务格式成为预训练分布的一部分。

##### 模型结构与训练配方

Galactica 使用 decoder-only Transformer。对第 \(l\) 层，简化残差形式为：

$$
\mathbf{z}^{l}
= \mathbf{h}^{l}
+ \mathrm{MHA}(\mathrm{LN}(\mathbf{h}^{l}))
$$

$$
\mathbf{h}^{l+1}
= \mathbf{z}^{l}
+ \mathrm{FFN}_{\mathrm{GeLU}}(\mathrm{LN}(\mathbf{z}^{l}))
$$

模型使用 2048 token 上下文窗口、学习式位置编码、GeLU 激活，并按 PaLM 风格去掉 dense kernel 和 layer norm 中的 bias。词表大小为 50k，由训练数据 2% 随机子集训练 BPE 得到。训练使用 AdamW、梯度全局范数裁剪到 1.0、学习率线性衰减到最大值的 10%。最大 120B 模型用更长 warmup，以缓解大模型早期初始化对优化器状态的影响。

模型规模配置覆盖从 125M 到 120B。120B 的意义不只是绝对规模，而是作者把“单个 A100 节点可推理”作为上限约束，希望科学社区能更容易复现和使用。论文结果显示，规模提升对引用预测、公式知识、MMLU/MATH 和生物医学问答都有明显收益。

##### 能力边界与可靠性

Galactica 论文把模型定位为“科学知识接口”，但它仍然是自回归语言模型，训练目标并不会自动保证事实正确、引用真实或实验结论可复现。引用 token 让模型能学习引用分布，但也可能生成看似合理却不存在或不匹配的引用；SMILES 和蛋白序列 token 让模型能处理科学序列，但不等同于具备物理模拟或实验验证能力。

因此更稳妥的使用方式是把 Galactica 看成科学语料预训练和科学 token 接口的一次系统化尝试：它展示了 curated corpus、模态 token 和 prompt pre-training 的价值，也暴露了科学 LLM 必须面对的可靠性问题。后续科学助手通常会进一步引入检索、工具调用、引用校验和结构化数据库，以弥补纯 weight memory 的不足。

> 💡 关键：Galactica 的算法贡献主要在“把科学对象序列化成语言模型可学习的接口”。它没有发明新的 Transformer 层，而是通过语料、token 和预训练任务设计，让标准 decoder-only Transformer 更适合科学知识建模。

#### 🧪 练习题
```yaml
question: "Galactica 对 SMILES、蛋白质和 DNA 序列使用特殊起止 token 与字符级 tokenization 的主要目的是什么？"
options:
  - "让这些科学序列以稳定、可泛化的字母表形式进入同一个语言模型上下文"
  - "把 Transformer 改成图神经网络"
  - "避免模型学习自然语言"
  - "让模型只训练一次 epoch，防止重复 token"
answer: 0
explain: "SMILES、氨基酸和 DNA 本身具有自然字符字母表。特殊 token 标记模态边界，字符级拆分避免普通 BPE 对低频科学片段的不可控切分。"
```

### GNoME

```yaml
id: gnome
num: 16
name: GNoME
full_name: 材料探索图网络 (Graph Networks for Materials Exploration)
year: '2023'
org: DeepMind
parent: —
paper_url: https://www.nature.com/articles/s41586-023-06735-9
project_url: ''
category: materials_weather
motivation: GNN预测220万新晶体等效800年知识
```

#### 📝 一句话总结
GNoME 将晶体图网络、两条候选生成管线、DFT 验证和主动学习闭环扩展到工业级规模，解决了传统晶体发现依赖人工原型替换、搜索空间巨大且 DFT 成本过高的问题。

#### 🎯 核心要点
- **两条发现管线**：结构管线从已知晶体做元素替换，组合管线从化学计量式出发并用 AIRSS 生成结构
- **图网络稳定性过滤**：把候选晶体表示为原子图，用 GNN 预测形成能或稳定性，优先把低能候选送入 DFT
- **DFT 主动学习闭环**：模型提出候选，DFT 计算能量与弛豫结果，新增标签回流到 GNoME 数据库并继续训练
- **凸包稳定性判定**：用分解能/相分离能衡量候选相对已知材料凸包的稳定性，越接近或低于凸包越值得验证
- **规模化搜索结果**：发现 2.2M 个相对先前数据库稳定的晶体，其中 381,000 个位于更新后的最终凸包
- **效率提升**：论文报告最终模型在结构管线和组合管线中的命中率随主动学习显著提升，稳定材料发现效率提高一个数量级
- **外部分布泛化**：随着训练集扩大，GNoME 对随机结构搜索产生的 out-of-domain 候选也呈现更好的能量预测泛化
- **官方数据发布**：DeepMind 发布约 381,000 个新稳定结构及更新凸包数据，后续官方仓库还扩展到超过 520,000 个接近凸包材料
- **MLIP 扩展**：论文还训练基于 NequIP 的 GNoME interatomic potential，用大规模 relaxation 数据学习能量与力，服务分子动力学和稳定性分析

#### 🔬 深入细节
##### 框架总览

![GNoME 主动学习材料发现流程](https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41586-023-06735-9/MediaObjects/41586_2023_6735_Fig1_HTML.png)
*图：GNoME 用结构管线和组合管线生成候选，经图网络筛选后送入 DFT，DFT 结果再回流数据库形成主动学习数据飞轮。来源为 Nature 论文 Figure 1。*

论文来源：Nature 论文页 https://www.nature.com/articles/s41586-023-06735-9；Google DeepMind 介绍页 https://deepmind.google/blog/millions-of-new-materials-discovered-with-deep-learning/；官方数据与模型仓库 https://github.com/google-deepmind/materials_discovery。

GNoME 的核心不是单个新 GNN layer，而是一套可扩展的材料发现系统。晶体稳定性预测本质上要回答：给定组成和结构，这个材料的能量是否低到不会分解为其他已知相？直接用 DFT 对所有候选做结构弛豫和能量计算不可行，因为候选空间随着元素数、配比和原型组合急剧膨胀。GNoME 用图网络先做廉价能量估计，把 DFT 计算集中到最可能稳定的区域。

##### 核心算法伪代码

```python
# GNoME active-learning discovery loop
def gnome_discovery_loop(seed_databases, rounds):
    dataset = load_materials_project_and_oqmd(seed_databases)
    model_ensemble = train_gnome_graph_networks(dataset)
    gnome_database = []

    for r in range(rounds):
        structural_candidates = substitution_pipeline(
            stable_structures=dataset.stable_crystals,
            promote_novel_compositions=True,
        )
        composition_candidates = compositional_pipeline(
            oxidation_state_relaxation=True,
            structure_generator="AIRSS",
        )
        candidates = deduplicate_by_composition_hash(
            structural_candidates + composition_candidates
        )

        scored = []
        for crystal in candidates:
            graph = crystal_to_periodic_graph(crystal)
            energy_pred = model_ensemble.predict_formation_energy(graph)
            decomp_pred = distance_to_convex_hull(energy_pred, dataset.hull)
            scored.append((crystal, decomp_pred, model_uncertainty(crystal)))

        selected = select_low_energy_and_diverse_candidates(scored)
        dft_results = run_dft_relaxations(selected)

        dataset.add(dft_results)
        gnome_database.extend(dft_results)
        model_ensemble = train_gnome_graph_networks(dataset)

    final_hull = build_updated_convex_hull(dataset + gnome_database)
    return materials_on_or_near_hull(final_hull)
```

##### 晶体图网络如何预测稳定性

GNoME 把周期晶体表示为图。节点是原子，边连接 cutoff 内的周期近邻，边特征包含相对位移、距离或距离展开，图级全局特征承载结构级信息。官方仓库中的 GNN 实现基于 Jraph 的 `GraphsTuple`，包含 nodes、edges、senders、receivers、globals、n_node 和 n_edge；消息传递时先更新边，再把入边和出边聚合到节点，最后可更新图级全局特征。

简化的一轮 graph network 可以写成：

$$
\mathbf{e}_{ij}^{t+1}
= \phi_e(\mathbf{e}_{ij}^{t},\mathbf{h}_i^t,\mathbf{h}_j^t,\mathbf{u}^t)
$$

$$
\mathbf{m}_i^{t+1}
= \sum_{j:(j,i)\in E}\mathbf{e}_{ji}^{t+1}
$$

$$
\mathbf{h}_i^{t+1}
= \phi_v(\mathbf{h}_i^t,\mathbf{m}_i^{t+1},\mathbf{u}^t)
$$

$$
\mathbf{u}^{t+1}
= \phi_u\left(\mathbf{u}^t,\sum_i\mathbf{h}_i^{t+1},\sum_{(i,j)}\mathbf{e}_{ij}^{t+1}\right)
$$

读出层把节点或全局状态映射成结构能量。对发现任务，模型最关心的是形成能和相对凸包的距离，而不是孤立结构的绝对总能量。形成能可写作：

$$
E_f(x)=\frac{E_{\mathrm{tot}}(x)-\sum_{\alpha}n_{\alpha}\mu_{\alpha}}{\sum_{\alpha}n_{\alpha}}
$$

其中 \(n_{\alpha}\) 是元素 \(\alpha\) 的原子数，\(\mu_{\alpha}\) 是元素参考化学势。稳定性由分解能衡量：

$$
E_{\mathrm{decomp}}(x)
= E_f(x) -
\min_{\{\lambda_q\}}
\sum_q \lambda_q E_f(q)
$$

约束为 \(\sum_q \lambda_q \mathbf{c}_q=\mathbf{c}_x\)、\(\sum_q\lambda_q=1\)、\(\lambda_q\ge 0\)。如果 \(E_{\mathrm{decomp}}\le 0\)，候选在当前参考集合下位于或低于凸包；如果略高于 0，也可能因 DFT 误差或亚稳态而有合成价值。

##### 两条候选生成管线

结构管线利用材料科学中一个强先验：许多新晶体可以通过已知稳定晶体的元素替换得到。GNoME 从 Materials Project 和 OQMD 等稳定结构出发，使用替换概率和启发式规则生成新组成/新结构。论文为了鼓励探索，调整了原始替换概率模型，降低对“已知常见替换”的偏好，使高元素数和更少见组合也能进入候选池。

组合管线则从化学式空间出发。它先用放宽的氧化态约束生成可能的化学计量式，再用 AIRSS 随机结构搜索生成候选结构。这个管线比结构替换更随机、更偏 out-of-distribution，因此命中率起初较低，但它能发现不容易从已知结构原型直接替换出来的组合。两条管线互补：结构管线更高效，组合管线提供更大的探索半径。

##### 主动学习数据飞轮

GNoME 的发现效率来自闭环，而不是一次性训练。第 \(r\) 轮中，模型 \(\theta_r\) 对候选集合 \(\mathcal{C}_r\) 预测能量和稳定性，选择低分解能、高新颖性或高价值候选做 DFT：

$$
\mathcal{S}_r
= \mathrm{Select}\left(
\{x \in \mathcal{C}_r :
\hat{E}_{\mathrm{decomp},\theta_r}(x) < \tau\}
\right)
$$

DFT 返回的弛豫结构和能量标签加入训练集：

$$
\mathcal{D}_{r+1}
= \mathcal{D}_{r}
\cup
\{(x,E_{\mathrm{DFT}}(x)) : x\in \mathcal{S}_r\}
$$

再训练得到 \(\theta_{r+1}\)。随着 rounds 增加，模型不仅看到更多稳定候选，也看到大量“看起来可能稳定但 DFT 后不稳定”的负例，因此筛选边界不断改善。论文报告经过六轮主动学习，最终 ensembles 在 relaxation 后结构上的误差约为 11 meV atom\(^{-1}\)，结构管线命中率超过 80%，组合管线命中率超过 33%。

##### 训练目标与 ensemble

发现模型可以用 DFT 形成能监督训练，基本损失为：

$$
\mathcal{L}_{E}
= \frac{1}{B}\sum_{b=1}^{B}
\left(\hat{E}_{f,\theta}(x_b)-E_{f,\mathrm{DFT}}(x_b)\right)^2
$$

实际系统会使用多个模型形成 ensemble，以降低单模型偶然误差对候选选择的影响。候选选择时，预测均值用于估计稳定性，模型间分歧可作为不确定性信号；这对主动学习很关键，因为高不确定但潜在低能的候选可能扩展模型覆盖范围。

论文还训练了 GNoME interatomic potential，用于学习 relaxation trajectory 中的能量和力。该部分采用 NequIP 架构，能量由原子贡献加和：

$$
\hat{E}=\sum_{i\in N_{\mathrm{atoms}}}(\hat{\epsilon}_i\sigma+\mu)
$$

联合 Huber 损失拟合能量和力：

$$
\mathcal{L}
= \lambda_E\frac{1}{N_b}\sum_b
\mathcal{H}_{\delta_E}\left(\frac{\hat{E}_b}{N_a},\frac{E_b}{N_a}\right)
+ \lambda_F\frac{1}{N_b}\sum_b\sum_{a,\alpha}
\mathcal{H}_{\delta_F}\left(
-\frac{\partial \hat{E}_b}{\partial r_{b,a,\alpha}},
F_{b,a,\alpha}
\right)
$$

这部分说明 GNoME 数据不仅能训练静态能量筛选器，也能训练可用于分子动力学的机器学习势。

##### 与传统材料发现的区别

传统高通量材料发现通常从少量结构原型出发，做人工设计的元素替换，再对有限候选跑 DFT。瓶颈有两个：一是候选空间大到无法穷举，二是 DFT 弛豫成本太高。GNoME 把“提出候选”和“验证候选”分离：GNN 负责在巨大空间中快速排序，DFT 负责给被选候选提供高可信标签，新增标签再提升 GNN。

与单纯的一次性 surrogate model 相比，GNoME 更像搜索算法。模型错误不是终点，而会通过 DFT 反馈暴露并进入下一轮训练。最终发现的 2.2M 个稳定晶体和 381,000 个最终凸包材料，来自这种规模化闭环，而不是一次模型推理。

##### 结果如何理解

GNoME 的“稳定”是计算材料学意义上的热力学稳定：材料位于给定 DFT 设置和参考数据库构成的凸包上或附近。这不等价于一定能在实验中合成，因为真实合成还受动力学、温度、压力、缺陷和反应路径影响。论文和官方说明也把数据发布给社区用于进一步筛选、DFT 复核和实验验证。Nature 论文提到有 736 个 GNoME 结构在并行外部实验/数据库工作中得到匹配，可视为部分外部支撑，但不是对全部预测的实验确认。

> 💡 关键：GNoME 的核心机制是“GNN 筛选 + DFT 反馈 + 凸包稳定性”的主动学习飞轮。它用机器学习扩大搜索半径，用 DFT 保持物理标签可信，再把新标签转化为下一轮搜索效率。

#### 🧪 练习题
```yaml
question: "GNoME 主动学习循环中 DFT 计算的主要作用是什么？"
options:
  - "为模型筛出的候选提供高可信能量与弛豫标签，并把这些标签反馈给下一轮训练"
  - "替代图神经网络中的所有消息传递层"
  - "只用于生成 LaTeX 公式，与材料稳定性无关"
  - "把所有候选都判定为实验可合成"
answer: 0
explain: "GNoME 用 GNN 降低候选筛选成本，但稳定性标签仍依赖 DFT 验证。DFT 结果回流训练集后，模型在后续轮次中筛选更准确。"
```

### Pangu-Weather

```yaml
id: panguweather
num: 17
name: Pangu-Weather
full_name: 盘古气象 (Pangu-Weather)
year: '2023'
org: Huawei Cloud
parent: —
paper_url: https://www.nature.com/articles/s41586-023-06185-3
project_url: ''
category: materials_weather
motivation: 3D Transformer首超传统数值预报精度
```

#### 📝 一句话总结
Pangu-Weather 提出了面向全球中期天气预报的 3D Earth-Specific Transformer，把高空多气压层和地表变量统一为三维气象体，并用分层时间聚合减少自回归误差累积，解决了早期 AI 天气模型速度快但精度难以超过传统 NWP 的问题。

#### 🎯 核心要点
- **三维气象建模**：将 13 个气压层上的 5 个高空变量与 4 个地表变量组织为 \(1{,}440 \times 721 \times 69\) 的全球状态，而不是把每个气压层当作独立二维图像
- **3DEST 架构**：基于 Swin Transformer 的 encoder-decoder，使用 3D window attention、shifted window、patch embedding 和 patch recovery 处理经纬度与垂直层级
- **Earth-specific positional bias**：用依赖气压层和纬度绝对位置的可学习偏置替代普通相对位置偏置，编码地球曲率、纬向差异和气象变量的绝对地理依赖
- **四个 lead-time 专用模型**：分别训练 1 h、3 h、6 h、24 h 预测模型，每个模型约 64M 参数，合计约 256M 参数
- **分层时间聚合**：推理时用贪心策略优先调用最大可用步长模型，例如 7 天预报可由 7 次 24 h 模型完成，而不是大量 1 h 迭代
- **ERA5 高分辨率训练**：使用 1979-2017 年 ERA5 小时级再分析数据，空间分辨率为 \(0.25^\circ \times 0.25^\circ\)
- **变量加权 MAE 训练**：对不同变量单独归一化，并用变量权重平衡 Z、Q、T、U、V、MSLP、U10、V10、T2M 等字段的损失贡献
- **与 ECMWF IFS 对比**：在论文设定的 reanalysis 初始化下，多数确定性预报指标优于 operational IFS，并且推理速度快四个数量级以上

#### 🔬 深入细节
##### 架构总览

![Pangu-Weather 3DEST 与分层时间聚合](https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41586-023-06185-3/MediaObjects/41586_2023_6185_Fig1_HTML.png)
*图：Nature 论文 Fig. 1，展示 3D Earth-Specific Transformer 的 encoder-decoder 结构，以及由 FM1/FM3/FM6/FM24 组成的分层时间聚合推理策略。*

论文正文和图像来源为 Nature 文章 `https://www.nature.com/articles/s41586-023-06185-3`；官方实现与模型信息也发布在 `https://github.com/198808xc/Pangu-Weather`。

##### 核心流程伪代码

```python
# Pangu-Weather 推理流程的高层伪代码
LEAD_MODELS = {
    24: FM24,  # 预测 t + 24 h
     6: FM6,
     3: FM3,
     1: FM1,
}

def pangu_forecast(A_t0, lead_hours):
    # A_t0: 高空变量 + 地表变量构成的全球天气状态
    state = A_t0
    remaining = lead_hours
    trajectory = []

    while remaining > 0:
        step = max(dt for dt in [24, 6, 3, 1] if dt <= remaining)
        state = LEAD_MODELS[step](state)
        trajectory.append((step, state))
        remaining -= step

    return state, trajectory

def train_one_model(dataset, lead_hours, model):
    for A_t in dataset:  # ERA5 hourly reanalysis, 1979-2017
        target = load_state(time=A_t.time + lead_hours)
        pred = model(normalize(A_t))
        loss_upper = weighted_mae(pred.upper_air, target.upper_air)
        loss_surface = weighted_mae(pred.surface, target.surface)
        loss = loss_upper + 0.25 * loss_surface
        loss.backward()
        optimizer.step()
```

##### 动机：为什么二维天气网络不够

全球天气预报的状态不是一张普通图片。高空变量在多个压力层上相互耦合，风场、温度、湿度和位势高度的垂直结构共同决定锋面、气旋和急流的演化；同时，纬度、经度、地形、海陆分布会强烈影响局地气象统计。早期 AI 天气模型常把变量或压力层堆成通道，使用二维卷积、Fourier operator 或二维 Transformer 处理，这会弱化垂直方向的显式建模。

Pangu-Weather 的核心选择是把高空变量组织成三维体。论文中高空输入为 \(13 \times 1440 \times 721 \times 5\)，对应 13 个压力层、经度、纬度和 5 个高空变量；地表输入为 \(1440 \times 721 \times 4\)。经过 patch embedding 后，高空 patch 的大小为 \(2 \times 4 \times 4\)，地表 patch 的大小为 \(4 \times 4\)，二者拼接成 \(8 \times 360 \times 181 \times C\) 的隐表示，其中 \(C=192\)。

> 💡 关键：这里的“3D”不是可视化噱头，而是让注意力窗口直接跨压力层、纬度和经度建模，使网络能学习垂直层间耦合。

##### 3D Earth-Specific Transformer

3DEST 沿用 Swin Transformer 的局部窗口注意力和 shifted window 思路，但窗口在三维体上划分。对一个窗口内 token 表示 \(X\)，标准注意力可写成：

$$
\mathrm{Attn}(Q,K,V)
= \mathrm{Softmax}\left(\frac{QK^\top}{\sqrt{d}} + B_{\mathrm{earth}}\right)V
$$

其中 \(B_{\mathrm{earth}}\) 是 Pangu-Weather 的关键改动。普通 Swin Transformer 的相对位置偏置默认同样的相对位移在任意图像位置含义相同；但地球上不同纬度的经线间距不同，气象变量也有强烈的纬向和垂直分布规律。因此论文让偏置依赖压力层窗口索引和纬度窗口索引，且经度方向共享偏置以保留周期性：

$$
B_{\mathrm{earth}}
= B_{m_{\mathrm{pl}},m_{\mathrm{lat}}}
\left[
h'_1 + h'_2 W_{\mathrm{pl}},
\lambda'_1-\lambda'_2+W_{\mathrm{lon}}-1,
\phi'_1+\phi'_2 W_{\mathrm{lat}}
\right]
$$

这里 \(m_{\mathrm{pl}}\) 和 \(m_{\mathrm{lat}}\) 定位全局压力层/纬度窗口，\((h',\lambda',\phi')\) 是窗口内部坐标。这个偏置不会改变 attention 的计算复杂度，但给模型提供了更贴近地球几何的归纳偏置：同样的局部天气模式在赤道、中纬度和极区不应完全共享位置先验。

##### Encoder-decoder 与变量恢复

模型先把原始物理变量归一化并嵌入为 latent tokens。前 2 个 encoder layer 保持 \(8 \times 360 \times 181 \times C\) 分辨率，后 6 个 encoder layer 通过下采样变为 \(8 \times 180 \times 91 \times 2C\)；decoder 对称恢复分辨率，并使用 encoder 到 decoder 的特征拼接。最后 patch recovery 把隐表示还原为原始高空变量和地表变量。

训练目标使用变量加权 MAE。若 \(v\) 表示变量，\(\hat{A}^{v}_{i,j,t+\Delta t}\) 是预测值，\(A^{v}_{i,j,t+\Delta t}\) 是 ERA5 目标值，可以简化表示为：

$$
\mathcal{L}
=
\sum_{v \in \mathcal{V}_{upper}}
\alpha_v
\left\|
\hat{A}^{v}_{t+\Delta t}-A^{v}_{t+\Delta t}
\right\|_1
+
0.25
\sum_{v \in \mathcal{V}_{surface}}
\alpha_v
\left\|
\hat{A}^{v}_{t+\Delta t}-A^{v}_{t+\Delta t}
\right\|_1
$$

论文为不同变量设置不同权重，例如高空变量 Z、Q、T、U、V 和地表变量 MSLP、U10、V10、T2M 分别加权，以避免某些量纲或方差较大的字段主导优化。评估时则使用天气领域常见的纬度加权 RMSE 和 ACC：

$$
\mathrm{RMSE}(v,t)
=
\sqrt{
\frac{
\sum_i\sum_j L(i)
\left(\hat{A}^{v}_{i,j,t}-A^{v}_{i,j,t}\right)^2
}{
N_{\mathrm{lat}}N_{\mathrm{lon}}
}
}
$$

其中 \(L(i)\) 与纬度 \(\phi_i\) 的 \(\cos \phi_i\) 成正比，用来修正经纬度网格在高纬地区面积变小的问题。

##### 分层时间聚合：减少自回归误差累积

中期预报需要把模型反复滚动到数天之后。若只训练 1 小时模型，7 天预报要迭代 168 次，每一步的小误差都会进入下一步输入。Pangu-Weather 训练 1 h、3 h、6 h、24 h 四个模型，推理时把目标 lead time 分解为尽量少的长步长调用：

$$
\Delta t
=
24 n_{24} + 6 n_6 + 3 n_3 + n_1,
\qquad
n_{24},n_6,n_3,n_1 \in \mathbb{N}
$$

例如 \(168\) 小时预报只需要 \(7\) 次 FM24；\(31\) 小时可以分解为 \(24+6+1\)。这种贪心策略牺牲了一点模型一致性，因为不同 lead-time 模型并非同一个动力系统的精确时间步，但显著减少了迭代次数和误差传播链条。

##### 与传统 NWP 和其他 AI 天气模型的区别

传统 NWP 显式离散大气动力学方程，并用超算推进状态，优势是物理约束强、可解释性高，但计算昂贵且需要大量参数化处理未解析尺度。Pangu-Weather 不求解 PDE，而是从 ERA5 学习状态转移函数：

$$
\hat{\mathbf{A}}_{t+\Delta t}
=
f_{\theta,\Delta t}(\mathbf{A}_t)
$$

这使它在 GPU 上推理极快，适合生成大量情景或作为 NWP 的补充。与 FourCastNet 等二维或频域模型相比，Pangu-Weather 的 3DEST 更强调垂直层间耦合和地球位置先验；与后来的 GraphCast 相比，它仍在经纬度规则网格上使用 Transformer，而不是转到球面多尺度图网格。

论文也明确指出局限：模型主要在 reanalysis 初始化和目标上评估，真实业务预报输入与 ERA5 存在分布差异；降水等变量未纳入主模型；回归式 AI 预报容易平滑极端值；多 lead-time 模型混用可能带来时间不一致。理解这些边界条件很重要，因为 Pangu-Weather 的贡献不是“完全替代物理预报”，而是证明高分辨率数据驱动模型能在中期确定性预报上达到甚至超过强 NWP 基线。

#### 🧪 练习题
```yaml
question: "Pangu-Weather 使用分层时间聚合的主要目的是什么？"
options:
  - "让所有天气变量共享同一个归一化常数"
  - "用更少的自回归调用达到目标预报时长，从而减轻误差累积"
  - "把经纬度网格替换为非结构化三角网格"
  - "强制模型只输出地表变量，不预测高空变量"
answer: 1
explain: "Pangu-Weather 训练 1 h、3 h、6 h、24 h 四类模型，推理时优先使用最大可用步长模型分解目标 lead time，减少滚动次数和误差传递。"
```

### GraphCast

```yaml
id: graphcast
num: 18
name: GraphCast
full_name: GraphCast (GraphCast)
year: '2023'
org: DeepMind
parent: —
paper_url: https://www.science.org/doi/10.1126/science.adi2336
project_url: ''
category: materials_weather
motivation: GNN球形网格建模大气动力学
```

#### 📝 一句话总结
GraphCast 提出了基于多尺度球面网格图神经网络的中期全球天气预报模型，用 encode-process-decode 消息传递直接学习 ERA5 中的天气状态演化，解决了经纬度网格模型难以兼顾球面几何、长程传播和高分辨率效率的问题。

#### 🎯 核心要点
- **球面图建模**：将规则经纬度天气场编码到由多级 icosahedral mesh 组成的球面图，避免普通二维网格在极区畸变
- **输入两帧天气状态**：使用当前时刻和 6 小时前状态作为输入，预测未来 6 小时的残差更新
- **227 个变量/层级组合**：覆盖 5 个地表变量和 6 个高空变量在 37 个压力层上的状态，每个变量位于 \(0.25^\circ\) 全球网格
- **Encode-process-decode GNN**：encoder 从经纬度网格映射到 mesh，processor 在 multi-mesh 上做 16 层非共享消息传递，decoder 再映射回经纬度网格
- **多尺度 multi-mesh**：由 icosahedron 逐级细分到第 6 级，最高分辨率包含 40,962 个节点，并保留不同尺度边以支持局部和长程信息传播
- **自回归 10 天预报**：单步输出 6 小时预报，滚动 40 步得到 10 天全球预报
- **多步训练损失**：训练中对多个自回归步的目标加权 MSE，逐步增加 rollout 长度，提高长时程稳定性
- **严谨业务对比**：在 2018 年及以后数据上与 ECMWF HRES 对比，论文报告 GraphCast 在 1380 个验证目标中的约 90% 优于 HRES

#### 🔬 深入细节
##### 架构总览

![GraphCast 模型示意图](https://ar5iv.labs.arxiv.org/html/2212.12794/assets/figures/schematic.png)
*图：GraphCast 论文 Fig. 1 的 arXiv HTML 图像资源，展示从经纬度网格输入到 multi-mesh 编码、GNN processor、解码回网格以及自回归滚动预报的流程。*

Science 正式论文地址为 `https://www.science.org/doi/10.1126/science.adi2336`；可访问的 arXiv 版本为 `https://arxiv.org/abs/2212.12794`，图像直链来自 ar5iv 渲染页面。

##### 核心流程伪代码

```python
# GraphCast 6 小时步长预报的高层伪代码
def graphcast_step(state_t_minus_6h, state_t):
    # state: lat-lon grid, 包含 surface + pressure-level variables
    grid_features = normalize(concat([state_t_minus_6h, state_t]))

    # Encoder: grid -> multi-mesh
    mesh_nodes = initialize_mesh_nodes()
    mesh_edges = build_multiscale_icosahedral_edges()
    mesh_nodes = grid_to_mesh_gnn(grid_features, mesh_nodes)

    # Processor: multi-mesh message passing
    for layer in range(16):
        messages = []
        for edge in mesh_edges:
            msg = edge_mlp(mesh_nodes[edge.src], mesh_nodes[edge.dst], edge.attr)
            messages.append((edge.dst, msg))
        mesh_nodes = node_mlp(mesh_nodes, aggregate(messages))

    # Decoder: multi-mesh -> grid
    residual_norm = mesh_to_grid_gnn(mesh_nodes, grid_points=state_t.grid)
    residual = denormalize_residual(residual_norm)
    return state_t + residual

def rollout_10_days(state_minus_6h, state_0):
    states = [state_minus_6h, state_0]
    for _ in range(40):  # 40 * 6 h = 10 days
        states.append(graphcast_step(states[-2], states[-1]))
    return states[-40:]
```

##### 动机：为什么从经纬度图像转向球面图

全球天气发生在球面上，但常见气象数据以经纬度矩形网格存储。在这种投影下，赤道附近网格近似均匀，高纬度网格却在物理距离上被挤压；同样的 \(3 \times 3\) 邻域在不同纬度覆盖的真实面积不同，极点附近还存在拓扑奇异性。二维 CNN 或 Transformer 可以学习这种偏差，但没有天然的球面归纳偏置。

GraphCast 的解决方案是保留经纬度网格作为输入/输出接口，但在网络内部转到球面 multi-mesh 图。mesh 由正二十面体不断细分并投影到球面，第 6 级最高分辨率包含 40,962 个节点。multi-mesh 保留从低分辨率到高分辨率的边集合，形成一张扁平层级图：短边传播局地天气结构，长边让信号在少量消息传递层内跨区域流动。

> 💡 关键：GraphCast 并不是把每个经纬度点都当作图节点，而是把规则网格数据编码到更均匀的球面 mesh，在 mesh 上学习大气动力学，再解码回业务需要的经纬度字段。

##### Encode-process-decode 消息传递

GraphCast 的架构可以抽象为：

$$
\hat{\mathbf{x}}_{t+6h}
=
\mathbf{x}_t
+
D_\theta
\left(
P_\theta^{(16)}
\left(
E_\theta(\mathbf{x}_{t-6h},\mathbf{x}_t)
\right)
\right)
$$

其中 \(E_\theta\) 是 grid-to-mesh encoder，\(P_\theta^{(16)}\) 是 16 层 processor，\(D_\theta\) 是 mesh-to-grid decoder。模型输出的是归一化残差，最后加到当前状态 \(\mathbf{x}_t\) 上，而不是直接预测完整天气场。这符合天气状态短时间演化的连续性：6 小时后的大气场通常可视作当前状态加一个有限变化量。

一层图网络的典型计算为：

$$
\mathbf{e}'_{ij}
=
\phi_e(\mathbf{h}_i,\mathbf{h}_j,\mathbf{e}_{ij})
$$

$$
\bar{\mathbf{m}}_j
=
\sum_{i:(i,j)\in \mathcal{E}} \mathbf{e}'_{ij}
$$

$$
\mathbf{h}'_j
=
\phi_v(\mathbf{h}_j,\bar{\mathbf{m}}_j)
$$

这里 \(\mathbf{h}_i\) 是 mesh node 特征，\(\mathbf{e}_{ij}\) 是相对位置、边长等 edge 特征，\(\phi_e\) 和 \(\phi_v\) 是 MLP。多层堆叠后，局地风温湿压变化可以沿边传播到下游区域，类似数值模式中信息随动力系统推进，但传播规则由数据学习。

##### 训练目标与自回归稳定性

GraphCast 使用 ERA5 1979-2017 年数据训练，并在 2018 年以后评估。每个训练样本包含两个输入状态 \((\mathbf{x}_{t-6h}, \mathbf{x}_t)\) 和未来状态。训练时模型不是只优化单步误差，而是在若干自回归步上累积损失，且训练过程中逐步把 rollout 长度增加到 12 步，即 3 天。这使模型在训练时暴露于自己的预测分布，减轻推理时滚动 40 步的分布漂移。

简化后的损失可写成：

$$
\mathcal{L}(\theta)
=
\frac{1}{K}
\sum_{k=1}^{K}
\sum_{v,\ell,i}
w_{v,\ell}\,a_i
\left\|
\hat{x}^{v,\ell}_{t+6k,i}
-
x^{v,\ell}_{t+6k,i}
\right\|_2^2
$$

其中 \(K\) 是训练 rollout 步数，\(v\) 是变量，\(\ell\) 是压力层，\(i\) 是网格点，\(a_i\) 表示面积/纬度权重，\(w_{v,\ell}\) 表示变量和垂直层权重。使用 MSE 会鼓励模型在不确定性较大的长 lead time 输出更平滑的场，这也是论文讨论的局限之一：确定性 GraphCast 的不确定性表达主要体现为模糊，而不是显式概率分布。

##### 变量表示与数据流

GraphCast 建模的单个天气状态包含 5 个地表变量：2 米温度、10 米 u/v 风、海平面气压、总降水；还包含 6 个高空变量在 37 个压力层上的值：温度、u/v 风、位势、比湿、垂直速度。因此每个网格点最多有 \(5 + 6 \times 37 = 227\) 个变量/层级组合。论文的主要 scorecard 评估其中一组业务关键变量和压力层。

数据流可拆成三段。第一段，encoder 用 grid-to-mesh 边把经纬度局部区域的信息聚合到最近的 mesh node。第二段，processor 在 multi-mesh 上同步更新节点特征；因为不同尺度的边同时存在，消息既能沿细 mesh 捕捉局部梯度，也能通过粗尺度边快速跨区域传播。第三段，decoder 用 mesh-to-grid 边把处理后的节点信息插值/映射回每个经纬度网格点，并输出 6 小时残差。

##### 与 Pangu-Weather 和传统 NWP 的区别

与传统 NWP 相比，GraphCast 不显式求解 Navier-Stokes 方程、热力学方程或物理参数化方案，而是学习状态转移算子：

$$
F_\theta:
(\mathbf{x}_{t-6h},\mathbf{x}_t)
\mapsto
\Delta \mathbf{x}_{t \to t+6h}
$$

这样做的优势是推理极快，并能直接从几十年再分析数据中吸收统计规律；代价是物理守恒、可解释参数化和概率不确定性需要额外设计。与 Pangu-Weather 的 Transformer 经纬度体不同，GraphCast 的内部表示是球面多尺度图，天然更接近全球大气的几何结构。与 FourCastNet 等频域模型相比，GraphCast 的 message passing 让局地边界、球面邻接和多尺度传播在同一图结构中表达。

论文对评估公平性也做了细致控制。GraphCast 以 ERA5 输入和 ERA5 目标训练，而 HRES 业务预报与 ERA5 的资料同化窗口不同；因此论文构造了 HRES-fc0 等对齐方式，避免某一方使用未来观测信息。这个细节说明 GraphCast 的贡献不只是模型结构，也包括把机器学习天气预报放入接近业务标准的验证框架中。

#### 🧪 练习题
```yaml
question: "GraphCast 使用 multi-mesh 图结构的核心目的是什么？"
options:
  - "把所有压力层压缩成一个标量，降低输出维度"
  - "在更均匀的球面网格上进行多尺度消息传递，同时保持经纬度网格输入输出"
  - "完全避免自回归推理，一次前向直接输出全年天气"
  - "只对热带地区建模，忽略高纬度区域"
answer: 1
explain: "GraphCast 将经纬度场编码到由多级 icosahedral mesh 构成的球面图，在图上进行局地和长程消息传递，再解码回经纬度网格。"
```

### RFdiffusion

```yaml
id: rfdiffusion
num: 19
name: RFdiffusion
full_name: RoseTTAFold扩散 (RoseTTAFold Diffusion)
year: '2023'
org: Baker Lab/UW
parent: rosettafold
paper_url: https://www.nature.com/articles/s41586-023-06415-8
project_url: ''
category: protein_structure
motivation: 扩散模型从噪声生成全新蛋白质
```

#### 📝 一句话总结
RFdiffusion 将 RoseTTAFold 结构预测网络微调为蛋白质骨架扩散模型，从随机残基刚体框架逐步去噪生成可设计的三维蛋白结构，解决了传统蛋白设计方法依赖强约束、输出多样性不足且难以统一处理 binder、motif scaffolding 和对称装配的问题。

#### 🎯 核心要点
- **结构预测网络变生成模型**：以 RoseTTAFold 的等变三维结构推理能力为 denoising network，而不是从零训练一个普通扩散 U-Net
- **残基刚体框架扩散**：每个残基由 \(C_\alpha\) 平移和 \(N-C_\alpha-C\) 方向框架表示，对平移加高斯噪声，对旋转在 \(SO(3)\) 上加噪
- **200 步训练扩散过程**：训练时从 PDB 结构采样并加噪到最多 200 个 timestep，模型学习从 \(X_t\) 预测干净结构 \(\hat{X}_0\)
- **自条件 self-conditioning**：每一步把上一轮的 \(\hat{X}_0^{t+1}\) 作为 template 输入，增强去噪轨迹的连贯性，类似 AlphaFold/RoseTTAFold 的 recycling 思路
- **MSE frame loss**：训练中使用未对齐的 frame MSE，而不是 FAPE，以保持全局坐标框架在连续去噪步骤之间稳定
- **条件生成能力**：可通过 motif 坐标、目标蛋白、hotspot residues、对称性、fold/secondary structure 等条件约束生成
- **结构-序列分离流程**：RFdiffusion 通常先生成骨架，再用 ProteinMPNN 为骨架设计序列，最后用 AlphaFold2/RoseTTAFold 等验证折叠
- **实验验证覆盖广**：论文验证了无条件单体、拓扑约束单体、对称寡聚体、金属结合、酶活性位点 scaffold 和 de novo binder 设计

#### 🔬 深入细节
##### 架构总览

![RFdiffusion 蛋白质设计流程](https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41586-023-06415-8/MediaObjects/41586_2023_6415_Fig1_HTML.png)
*图：Nature 论文 Fig. 1，展示 RFdiffusion 如何把 RoseTTAFold 微调为扩散去噪网络，并从随机残基框架迭代生成无条件或条件蛋白骨架。*

论文正文和图像来源为 Nature 文章 `https://www.nature.com/articles/s41586-023-06415-8`；官方代码与推理配置发布在 `https://github.com/RosettaCommons/RFdiffusion`。

##### 核心流程伪代码

```python
# RFdiffusion 推理流程的高层伪代码
def rfdiffusion_sample(length, conditions=None, T=200):
    # X_t: 每个残基的 Cα 坐标和平移/旋转刚体框架
    X_t = sample_random_residue_frames(length)
    x0_prev = None

    for t in reversed(range(1, T + 1)):
        model_input = {
            "noised_frames": X_t,
            "timestep": t,
            "conditions": conditions,      # motif, target, symmetry, hotspots...
            "self_condition": x0_prev,     # previous x0 prediction as template
        }

        x0_hat = rosettafold_denoiser(model_input)
        X_t = reverse_diffusion_step(X_t, x0_hat, t)
        x0_prev = x0_hat

    backbone = x0_prev
    sequences = protein_mpnn_design(backbone, num_samples=8)
    ranked = validate_with_structure_prediction(backbone, sequences)
    return ranked
```

##### 动机：从预测结构到生成结构

RoseTTAFold、AlphaFold2 等模型擅长从序列和模板预测蛋白结构，但蛋白设计问题通常反过来：给定一个功能目标，想找到能折叠成某种骨架、携带某个 motif、或结合某个靶标的全新蛋白。传统 hallucination、inpainting 或 Rosetta 搜索方法常需要较强初始约束；当约束很少时，优化容易陷入有限模式，生成多样性不足。

扩散模型适合这个反问题，因为它从随机噪声出发，每条采样轨迹都可能落到不同的高概率结构。但蛋白质不是普通图像：骨架具有刚体几何、旋转等变性、链连续性、二级结构和长程接触约束。RFdiffusion 的关键判断是：与其从零训练一个扩散网络，不如把 RoseTTAFold 中已经学到的蛋白几何推理能力改造成去噪器。

> 💡 关键：RFdiffusion 的生成能力来自“扩散采样”，而生成结果像蛋白质则很大程度来自 RoseTTAFold 预训练结构网络中的几何先验。

##### 残基框架与前向加噪过程

RFdiffusion 使用每个残基的刚体 frame 表示结构。一个残基 \(i\) 的状态可以写作：

$$
T_i = (R_i, \mathbf{x}_i)
$$

其中 \(\mathbf{x}_i \in \mathbb{R}^3\) 是 \(C_\alpha\) 坐标，\(R_i \in SO(3)\) 由 \(N-C_\alpha-C\) 定义的局部方向框架给出。前向扩散对平移和旋转分别加噪。平移可用标准 DDPM 形式概括：

$$
q(\mathbf{x}_t|\mathbf{x}_0)
=
\mathcal{N}
\left(
\sqrt{\bar{\alpha}_t}\mathbf{x}_0,
(1-\bar{\alpha}_t)\mathbf{I}
\right)
$$

旋转部分不能直接加欧式高斯噪声，因为 \(R_i\) 位于旋转群 \(SO(3)\) 上。论文使用旋转矩阵流形上的 Brownian motion 来扰动方向，使噪声过程保持在合法旋转空间内。这样，模型看到的 \(X_t\) 既包含被扰动的 \(C_\alpha\) 坐标，也包含被扰动的残基朝向。

##### 去噪网络与训练目标

在 timestep \(t\)，RFdiffusion 接收加噪结构 \(X_t\)、条件信息 \(c\) 和可选的上一轮自条件 \(\hat{X}_0^{t+1}\)，输出当前对干净结构的预测：

$$
\hat{X}_0^t
=
f_\theta(X_t, t, c, \hat{X}_0^{t+1})
$$

训练目标是让 \(\hat{X}_0^t\) 接近原始 PDB 结构 \(X_0\)。论文强调这里使用 frame prediction 与真实结构之间的 MSE，且不做全局对齐：

$$
\mathcal{L}_{frame}
=
\frac{1}{N}
\sum_{i=1}^{N}
\left\|
\hat{\mathbf{x}}_{0,i}
-
\mathbf{x}_{0,i}
\right\|_2^2
+
\lambda_R
d_{SO(3)}(\hat{R}_{0,i},R_{0,i})^2
$$

上式是便于理解的简化写法，表示平移和旋转 frame 都要接近真实值。它不同于结构预测中常用的 FAPE：FAPE 对全局旋转平移不敏感，而 RFdiffusion 的未对齐 MSE 会鼓励去噪轨迹在同一个全局参考系中连续演化，便于从 \(X_t\) 逐步插值到 \(\hat{X}_0\)。

反向采样时，模型不会直接把 \(\hat{X}_0^t\) 当作最终结果，而是按扩散后验从 \(X_t\) 朝 \(\hat{X}_0^t\) 移动并加入适量噪声：

$$
X_{t-1}
\sim
p_\theta(X_{t-1}|X_t)
\approx
\mathcal{N}
\left(
\mu_\theta(X_t,\hat{X}_0^t,t),
\sigma_t^2 I
\right)
$$

这种“预测干净结构，再生成下一步 noisy structure”的方式让采样既能收敛到蛋白质分布，又保留随机性和多样性。

##### Self-conditioning：让生成轨迹更连贯

RFdiffusion 的一项重要训练/推理策略是 self-conditioning。图示中每个 timestep 的网络不仅接收当前 noisy frames \(X_t\)，还把上一 timestep 预测的 \(\hat{X}_0^{t+1}\) 作为 template 输入。这类似 AlphaFold2 和 RoseTTAFold 的 recycling：模型不是每一步都从头猜完整结构，而是在上一轮粗预测基础上修正。

self-conditioning 的好处在蛋白设计中很直观。早期 timestep 的结构非常嘈杂，模型只能给出宽泛的折叠倾向；随着 \(t\) 变小，上一轮 \(\hat{X}_0\) 已经包含二级结构、链走向和长程接触，下一轮可以专注于消除局部冲突、改善 packing 和满足条件约束。论文报告 self-conditioning 明显提升了无条件和条件设计任务的 in silico 成功率。

##### 条件生成：同一个模型处理多类设计任务

RFdiffusion 的条件信息 \(c\) 可以落在多个层级。motif scaffolding 固定一小段功能残基的坐标，要求模型生成其余骨架来稳定展示该 motif；binder design 提供靶蛋白结构和 hotspot residues，要求新链在指定界面附近形成结合面；对称设计把 \(C_n\)、\(D_n\) 等对称约束施加到生成结构；fold conditioning 则用二级结构或 block adjacency 限定拓扑。

这些任务都可以被写成条件扩散：

$$
p_\theta(X_0|c)
=
\int
p(X_T)
\prod_{t=1}^{T}
p_\theta(X_{t-1}|X_t,c)
\mathrm{d}X_{1:T}
$$

条件越强，采样空间越窄；条件越弱，模型越依赖 RoseTTAFold 几何先验和 PDB 学到的结构分布。与确定性 inpainting 相比，扩散的随机初始化和噪声注入允许针对同一 motif 或 target 生成多条不同骨架方案。

##### 结构到序列：为什么还需要 ProteinMPNN

RFdiffusion 主要生成 backbone，而不是直接输出最终氨基酸序列。论文流程通常在骨架生成后使用 ProteinMPNN 设计序列，每个骨架采样多条序列，再用结构预测模型筛选是否能折叠回目标骨架或形成目标复合物。这个分工降低了问题难度：RFdiffusion 专注学习可设计的几何骨架，ProteinMPNN 专注解决“哪些序列能编码这个骨架”。

实际设计流程可概括为：

```python
for backbone in rfdiffusion_backbones:
    seqs = protein_mpnn(backbone, n=8)
    for seq in seqs:
        pred = alphafold_or_rosettafold(seq, optional_target)
        score = evaluate_backbone_match_and_interface(pred, backbone)
        keep_if(score.pae_low and score.rmsd_low and score.interface_good)
```

这种 pipeline 也解释了 RFdiffusion 的实验验证方式：in silico 成功只是第一步，论文进一步对数百个设计进行实验表征，覆盖对称装配、金属结合蛋白和靶标 binder，并用冷冻电镜结构验证了部分设计与模型高度一致。

##### 与 RoseTTAFold/传统设计方法的区别

RoseTTAFold 原本是判别式结构预测模型：给定序列、MSA、模板等输入，输出结构。RFdiffusion 则把“输入结构被加噪，输出干净结构”作为训练任务，使模型学会从随机 frame 分布回到蛋白质骨架分布。相较于 RFjoint inpainting，RFdiffusion 不是一次性补全，而是通过多步去噪逐渐形成全局 fold，因此在弱约束和需要多样性的任务上更稳健。

与纯能量搜索或手工 Rosetta 设计相比，RFdiffusion 把 PDB 中的结构统计和 RoseTTAFold 的几何推理压缩进神经去噪器，能在较短时间内探索大量候选骨架。它的局限也来自这一点：模型生成的是训练分布和条件约束下“看起来可设计”的结构，最终功能、稳定性、表达和结合仍需 ProteinMPNN、结构预测、物理筛选和实验验证共同闭环。

#### 🧪 练习题
```yaml
question: "RFdiffusion 中 self-conditioning 的主要作用是什么？"
options:
  - "把蛋白质序列翻译成 DNA 序列"
  - "将上一去噪步骤预测的干净结构作为当前步骤输入，使扩散轨迹更连续、更容易逐步细化"
  - "强制所有生成蛋白都具有同一种对称性"
  - "用 FAPE 完全替代扩散模型的反向采样"
answer: 1
explain: "RFdiffusion 在每个 timestep 接收上一轮的 \\(\\hat{X}_0\\) 预测作为 template，类似 recycling，让后续步骤在已有粗结构上继续修正。"
```

### AlphaFold 3

```yaml
id: alphafold3
num: 20
name: AlphaFold 3
full_name: AlphaFold 3 (AlphaFold 3)
year: '2024'
org: DeepMind/Isomorphic
parent: alphafold2
paper_url: https://www.nature.com/articles/s41586-024-07487-w
project_url: ''
category: protein_structure
motivation: 扩散模块预测全生物分子相互作用
```

#### 📝 一句话总结
AlphaFold 3 提出了面向全生物分子复合物的统一结构预测框架，用 Pairformer 表征分子间关系，并用条件扩散模块直接生成原子坐标，解决了 AlphaFold 2 主要聚焦蛋白质和蛋白复合物、难以统一处理核酸、小分子配体、离子和修饰残基的问题。

#### 🎯 核心要点
- **统一建模范围**：输入可同时包含蛋白质、DNA/RNA、小分子配体、离子、共价连接与修饰残基，输出复合物的全原子三维结构
- **架构主干重写**：推理流程由 Input Embedder、Template Module、MSA Module、48 层 Pairformer、Diffusion Module 和 Confidence Module 组成
- **Pairformer 替代 Evoformer 主干**：主干维护 token 级 single representation 与 pair representation，MSA 信息先被压入 pair 表示，后续主干不再保留 AlphaFold 2 式 MSA track
- **几何关系仍由三角操作刻画**：Pairformer 使用 triangle multiplicative update、triangle self-attention 和 pair-biased single attention 建模残基/原子 token 之间的三体一致性
- **扩散模块直接预测原子坐标**：从带噪坐标开始迭代去噪，条件来自输入特征、single/pair 表示和原子级注意力，不再使用 AlphaFold 2 的 Structure Module/FAPE 作为主要坐标生成机制
- **训练损失更适合全原子复合物**：核心结构损失是 weighted aligned MSE，额外加入 smooth LDDT 与 bonded ligand/glycan 的键长损失，核酸和配体原子被上权重
- **采样与置信度排名分离**：同一输入可运行多个随机种子和多个 diffusion samples，再用 pLDDT、pTM、ipTM、clash/disorder 等置信度相关指标选择最终结构
- **对专用工具形成统一替代**：在蛋白-配体、蛋白-核酸、抗体-抗原、修饰残基等任务上，用一个框架超过多类任务专用模型

#### 🔬 深入细节
##### 架构总览

![AlphaFold 3 整体推理框架](https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41586-024-07487-w/MediaObjects/41586_2024_7487_Fig1_HTML.png)
*图：Nature 论文 Fig. 1，展示 AlphaFold 3 对多类生物分子复合物的预测效果，以及从序列/配体/共价键输入到 Pairformer、Diffusion Module 和 Confidence Module 的推理流程。*

![AlphaFold 3 Pairformer 与扩散训练细节](https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41586-024-07487-w/MediaObjects/41586_2024_7487_Fig2_HTML.png)
*图：Nature 论文 Fig. 2，展示 Pairformer block、扩散模块、训练时的去噪目标和不同类型界面的训练曲线。*

可访问来源：主论文为 Nature 论文页面 `https://www.nature.com/articles/s41586-024-07487-w`；完整算法伪代码和损失函数在补充材料 `https://static-content.springer.com/esm/art%3A10.1038%2Fs41586-024-07487-w/MediaObjects/41586_2024_7487_MOESM1_ESM.pdf`。

##### 核心流程伪代码

```python
# AlphaFold 3 推理流程的高层伪代码
def alphafold3_predict(input_complex, num_seeds=5, samples_per_seed=5):
    tokens, atom_features = tokenize_biomolecules(
        proteins=input_complex.proteins,
        dna=input_complex.dna,
        rna=input_complex.rna,
        ligands=input_complex.ligands,
        ions=input_complex.ions,
        covalent_bonds=input_complex.covalent_bonds,
    )
    msa_features = genetic_search(tokens.polymer_sequences)
    template_features = template_search(tokens.polymer_sequences)
    conformer_features = generate_ligand_conformers(input_complex.ligands)

    s_inputs, z = input_embedder(tokens, atom_features, conformer_features)
    z = template_module(z, template_features)
    z = msa_module(z, msa_features, s_inputs)

    predictions = []
    for seed in range(num_seeds):
        s, pair = s_inputs, z
        for recycle in range(num_recycles):
            pair, s = pairformer_stack(pair, s, num_blocks=48)

        for _ in range(samples_per_seed):
            x = sample_gaussian_atom_coordinates(tokens)
            for t in diffusion_noise_schedule():
                x = diffusion_module.denoise(
                    noisy_coords=x,
                    noise_level=t,
                    single=s,
                    pair=pair,
                    atom_features=atom_features,
                )
            confidence = confidence_module(x, s, pair)
            predictions.append((x, confidence))

    return rank_by_confidence(predictions)
```

##### 从蛋白折叠到“复合物全原子生成”

AlphaFold 2 的强项是蛋白质单体和蛋白复合物结构预测，但很多真实生物系统不是纯蛋白问题：转录因子结合 DNA，核酶和蛋白形成 RNA-蛋白复合物，药物发现关心蛋白-小分子口袋，翻译后修饰和金属离子也会改变局部几何。若为每类对象分别设计模型，数据管线、特征、坐标约束和评价指标都会碎片化。

AlphaFold 3 的设计选择是把复合物拆成 token 和 atom 两个尺度。Pairformer 在 token 尺度上推理长程关系，token 可以对应聚合物残基，也可以代表非聚合物组分中需要参与结构推理的单元；扩散模块再在 atom 尺度上生成坐标。这个分层让模型既能保留 AlphaFold 系列擅长的 pair representation，又能处理配体、离子和修饰残基带来的原子级几何。

##### Pairformer：保留三角几何，弱化 MSA 主干地位

Pairformer 的输入是 single representation \(s_i \in \mathbb{R}^{c_s}\) 与 pair representation \(z_{ij} \in \mathbb{R}^{c_z}\)。MSA 与模板仍然重要，但它们先经过 MSA Module 和 Template Module 更新 pair 表示，之后主干不再像 Evoformer 那样维护完整 MSA track。这样做的直接收益是：同一主干可以处理没有自然 MSA 的配体、离子和修饰残基。

一个 Pairformer block 可以抽象为：

$$
z \leftarrow z + \text{TriangleMul}_{out}(z) + \text{TriangleMul}_{in}(z)
$$

$$
z \leftarrow z + \text{TriangleAttn}_{start}(z) + \text{TriangleAttn}_{end}(z)
$$

$$
s \leftarrow s + \text{AttentionWithPairBias}(s, z)
$$

其中三角更新继续表达“边 \(i \to j\) 应参考第三个 token \(k\)”的几何一致性；single attention with pair bias 则让每个 token 的状态在关注其他 token 时显式读取 pair 表示。与 AlphaFold 2 相比，核心差异不是完全放弃进化信息，而是把进化信息压缩到 pair 表示后，用更通用的 token-pair 主干服务所有分子类型。

##### 条件扩散：从噪声原子云到复合物坐标

AlphaFold 3 不再用 Structure Module 迭代更新残基刚体框架，而是把坐标预测转成条件去噪问题。训练时，真实原子坐标 \(x^{GT}\) 被加入噪声得到 \(x_t\)，Diffusion Module 在输入特征和 Pairformer 表示条件下预测去噪后的坐标 \(\hat{x}\)。推理时，从随机原子云开始沿噪声日程逐步去噪，得到一个满足输入序列、配体、共价键和界面约束的结构样本。

这种做法对小分子和核酸尤其自然，因为模型不必把所有对象强行塞进“蛋白质残基刚体+侧链扭转角”的参数化形式，而是直接在原子坐标空间学习局部键长、口袋几何和跨分子界面。代价是扩散采样具有随机性，因此论文默认用多个随机种子和多个 diffusion samples，再靠 Confidence Module 排名。

##### 损失函数：weighted aligned MSE + 局部几何约束

补充材料给出的核心结构损失先把真实结构刚性对齐到预测结构，再计算加权 MSE：

$$
\{x_l^{GT\text{-}aligned}\} =
\text{weighted\_rigid\_align}(\{x_l^{GT}\}, \{\hat{x}_l\}, \{w_l\})
$$

$$
\mathcal{L}_{MSE}
= \frac{1}{3}\operatorname{mean}_l
\left(w_l \left\|\hat{x}_l - x_l^{GT\text{-}aligned}\right\|_2^2\right)
$$

权重对 DNA、RNA 和 ligand 原子上调：

$$
w_l = 1
+ f_l^{DNA}\alpha_{DNA}
+ f_l^{RNA}\alpha_{RNA}
+ f_l^{ligand}\alpha_{ligand}
$$

论文补充材料中给出 \(\alpha_{DNA}=\alpha_{RNA}=5\)，\(\alpha_{ligand}=10\)。最终扩散损失还包含 bonded ligand/glycan 的键长损失与 smooth LDDT：

$$
\mathcal{L}_{diffusion}
=
\frac{\hat{t}^2 + \sigma_{data}^2}{(\hat{t}+\sigma_{data})^2}
\left(\mathcal{L}_{MSE} + \alpha_{bond}\mathcal{L}_{bond}\right)
+ \mathcal{L}_{smooth\_lddt}
$$

> 💡 关键：AlphaFold 3 的主要坐标损失不再是 AlphaFold 2 的 FAPE，而是更适合全原子复合物的对齐后坐标误差与局部结构质量约束。

##### 置信度与排名

Diffusion Module 可以给出多个候选构象，但下游用户通常需要一个可信结构。Confidence Module 因此预测残基/原子级和链间界面相关置信度；论文方法部分说明，全局排名会混合 pTM、ipTM，并加入减少严重 clash、提升无序区域处理的项；如果只关心特定链、界面或修饰残基，也可以使用链特异 pTM、界面 ipTM 或修饰残基局部 pLDDT 排名。

这种“生成多个候选，再用置信度选择”的范式比 AlphaFold 2 更接近生成模型工作流。它解释了为什么论文报告的结果通常来自多个 model seeds 和 diffusion samples 的 top-ranked 结构，也解释了 AF3 在配体 pose 或蛋白-核酸界面上能显著受益于采样。

##### 与 AlphaFold 2 的本质区别

AlphaFold 2 的创新核心是 Evoformer + Structure Module：用 MSA/pair 双通道推理蛋白折叠，再通过 IPA 和 FAPE 生成蛋白原子坐标。AlphaFold 3 的创新核心则是 Pairformer + Diffusion Module：把多分子复合物编码为统一 token-pair 表示，再在全原子坐标空间条件生成结构。前者像“端到端蛋白折叠器”，后者更像“生物分子复合物生成器”。

#### 🧪 练习题
```yaml
question: "AlphaFold 3 相比 AlphaFold 2 的关键结构生成变化是什么？"
options:
  - "完全删除 MSA 和模板搜索，只使用小分子指纹预测结构"
  - "用条件扩散模块从噪声原子坐标迭代去噪，替代以 Structure Module/FAPE 为核心的坐标生成方式"
  - "只预测蛋白质二级结构，不输出三维坐标"
  - "把所有配体都转换成氨基酸残基后再运行 AlphaFold 2"
answer: 1
explain: "AlphaFold 3 的主干仍使用序列、模板、MSA 等信息，但最终坐标由条件扩散模块在原子坐标空间生成，并用 weighted aligned MSE、smooth LDDT 和键长损失训练。"
```

### ESM3

```yaml
id: esm3
num: 21
name: ESM3
full_name: 进化尺度建模3 (Evolutionary Scale Modeling 3)
year: '2024'
org: EvolutionaryScale
parent: esm2
paper_url: https://www.evolutionaryscale.ai/blog/esm3-release
project_url: ''
category: protein_structure
motivation: 98B参数序列-结构-功能协同生成
```

#### 📝 一句话总结
ESM3 提出了序列、结构、功能三轨离散 token 的生成式蛋白质语言模型，用统一 Transformer 同时补全三种模态，解决了 ESM-2 主要从序列学习表征、难以直接按结构和功能约束生成蛋白的问题。

#### 🎯 核心要点
- **三轨蛋白语言模型**：把 amino-acid sequence、3D structure 和 biological function 都转成离散 token track，在同一个 Transformer 中联合建模
- **生成式 masked language modeling**：训练时对序列、结构、功能 token 部分遮盖，目标是在上下文和其他模态条件下预测被遮盖位置
- **结构离散化**：用结构 tokenizer/VQ-VAE 将三维蛋白结构编码为结构 token，再由结构解码器把 token 还原为三维坐标
- **功能离散化**：用 InterPro、Gene Ontology 等注释的文本语义构造 per-residue function tokens，使模型能用功能关键词作为提示
- **任意模态条件生成**：推理时可输入部分序列、局部结构、功能关键词或它们的组合，模型通过迭代 unmask 生成缺失 track
- **规模化训练**：最大模型 98B 参数，官方说明训练使用约 \(1.07\times10^{24}\) FLOPs、2.78B proteins 和 771B unique tokens
- **合成数据增强**：由于实验结构和功能注释稀缺，训练集中加入大量预测结构和预测功能，扩展多模态监督覆盖面
- **可编程蛋白设计**：论文报告用多模态提示生成远离已知天然序列的荧光蛋白 esmGFP，序列身份约 58%，被解释为跨越超过 5 亿年自然演化距离
- **开放模型族**：Biohub/ESM3 公开了 1.4B 小模型权重和 API/SDK，7B 与 98B 模型通过平台访问或用于论文结果复现

#### 🔬 深入细节
##### 架构总览

![ESM3 多轨 Transformer 架构](https://github.com/Biohub/esm/raw/main/_assets/esm3_diagram.png)
*图：Biohub/ESM 官方 README 中的 ESM3 架构图，展示 sequence、structure、SS8、SASA、function 等 token track 经逐位置 embedding 求和后进入 Transformer，并为每个 track 输出 logits。*

可访问来源：任务给出的官方发布页是 `https://www.evolutionaryscale.ai/blog/esm3-release`；论文正式版本为 Science DOI `https://www.science.org/doi/10.1126/science.ads0018`；开源使用说明与架构图在 `https://github.com/Biohub/esm/blob/main/_assets/ESM3_README.md`。bioRxiv/Science 全文在部分环境下可能受访问限制，因此这里的方法级细节主要基于官方发布页、可访问的官方 README、论文摘要和开源实现说明。

##### 核心流程伪代码

```python
# ESM3 训练与生成的抽象伪代码
def train_esm3(protein_batch):
    losses = []
    for protein in protein_batch:
        seq_tokens = tokenize_amino_acids(protein.sequence)
        struct_tokens = structure_vqvae.encode(protein.coordinates)
        func_tokens = tokenize_function_annotations(
            interpro=protein.interpro_terms,
            go_terms=protein.go_terms,
        )

        tracks = {
            "sequence": seq_tokens,
            "structure": struct_tokens,
            "function": func_tokens,
            "ss8": tokenize_secondary_structure(protein.coordinates),
            "sasa": discretize_sasa(protein.coordinates),
        }
        corrupted, mask_index = partially_mask_tracks(tracks)
        logits = transformer(sum_positionwise_embeddings(corrupted))

        losses.append(sum_cross_entropy(logits, tracks, mask_index))

    optimizer.step(mean(losses))


def generate_with_esm3(prompt_tracks, target_track, num_steps):
    tracks = fill_missing_positions_with_mask(prompt_tracks)
    for step in range(num_steps):
        logits = model(tracks)
        positions = choose_masked_positions_to_unmask(step, tracks)
        sampled_tokens = sample(logits[target_track][positions])
        tracks[target_track][positions] = sampled_tokens
    return decode_tracks(tracks)
```

##### 为什么要把结构和功能也写成“语言”

ESM-2 已经证明，仅用蛋白质序列训练大模型，也能学到大量结构和功能信息。但序列语言模型的生成约束仍然间接：如果用户想要“某个活性位点几何形状”或“某类水解酶功能”，模型只能通过序列统计去猜。ESM3 的核心转变是把结构和功能也显式变成 token，使提示空间从一条氨基酸序列扩展为多轨蛋白程序。

在输入端，序列 token 表示氨基酸；结构 token 表示局部三维构象；功能 token 表示来自 InterPro/GO 等注释的语义。多个 track 在同一 residue 位置上分别查 embedding，然后逐位置求和，得到 Transformer 的输入表示。这样，一个位置的隐藏状态同时携带“这里是什么氨基酸”“这里应处于什么局部结构”“这里承担什么功能”的条件。

##### 多轨 masked language modeling

ESM3 的训练目标可以写成多模态遮盖重建。设模态集合为 \(\mathcal{M}\)，包括 sequence、structure、function 以及辅助结构属性；第 \(m\) 个 track 的第 \(i\) 个真实 token 为 \(y_{m,i}\)，被遮盖集合为 \(\Omega_m\)。模型在被破坏的多轨输入 \(\tilde{Y}\) 上预测原始 token：

$$
\mathcal{L}_{ESM3}
=
\sum_{m \in \mathcal{M}} \lambda_m
\sum_{i \in \Omega_m}
\operatorname{CE}\left(
y_{m,i},
p_\theta(y_{m,i}\mid \tilde{Y})
\right)
$$

这个目标的直觉很直接：如果 structure track 被遮盖，模型要从序列和功能推断结构；如果 sequence track 被遮盖，模型要做受结构/功能约束的 inverse folding；如果 function track 被遮盖，模型要从序列和结构推断功能。统一目标让同一个模型可以在不同任务之间共享表示。

> 💡 关键：ESM3 不是先训练一个序列模型，再外挂结构预测头；它把多种蛋白属性都离散成 token，从预训练开始就学习它们之间的条件分布。

##### 结构 token：用离散瓶颈处理三维几何

蛋白结构本来是连续坐标，直接放入普通 Transformer 会遇到旋转平移等变性、坐标噪声和长度扩展问题。ESM3 采用结构 tokenizer，把三维结构编码到离散 token 空间，再让语言模型处理这些 token。开源说明与相关论文材料显示，结构输出头会产生结构 token logits，结构解码器再把 token 序列重建为坐标。

这种做法牺牲了一部分连续几何精度，但换来两个好处。第一，结构可以和序列、功能一样走大规模 token 语言建模路线，训练和采样都更统一。第二，结构 token 是可遮盖、可补全、可提示的：用户可以固定某个 motif 的结构 token，让模型生成兼容该局部几何的其余序列和结构。

##### 功能 token：从注释文本到 residue-level 条件

功能注释天然不是单一类别，而是来自 InterPro、GO term、关键词和层级关系的稀疏文本语义。ESM3 将这些功能描述压缩成 per-residue 的离散 function tokens，使功能提示能进入同一 Transformer。官方发布页强调，模型可以用功能关键词参与提示，例如用 \(\alpha/\beta\) hydrolase 这样的功能/折叠提示来生成 PETase 活性位点支架。

功能 token 的意义在于把“我要一种有某类功能的蛋白”转成模型可条件化的离散输入。传统 protein language model 通常只能无条件采样或用后验筛选；ESM3 则能在生成时直接给定功能轨道，让模型在采样过程中同时满足序列合理性、结构可折叠性和功能语义。

##### 迭代 unmask：从提示到可控生成

ESM3 的生成不是一次性从左到右输出，而是类似 masked diffusion 的迭代补全。初始时，未知位置填 `<mask>`；每一步模型对所有 track 输出 logits；采样器选择一部分位置解除遮盖，并把采样 token 写回输入。重复若干步后，目标 track 全部被补齐。

这种采样方式适合蛋白设计，因为约束通常不是前缀式的。用户可能固定中间一段活性位点、几处远距离接触、一个功能关键词和若干已知残基。自回归模型必须人为排列生成顺序，而 ESM3 可以把这些条件放在任意位置，让 Transformer 在全局上下文中补全其余部分。

##### 与 ESM-2 的区别

ESM-2 是大规模蛋白质序列语言模型，擅长从序列中提取进化表征，并可服务结构预测、突变效应预测和功能分类。ESM3 继承了“生物序列可语言建模”的路线，但目标从表征学习扩展到多模态生成：它同时建模 \(p(\text{sequence}, \text{structure}, \text{function})\)，并允许任意条件分布 \(p(\text{missing tracks}\mid\text{prompt tracks})\) 的近似采样。

因此，ESM3 更像一个蛋白质设计引擎。它的能力不只体现在预测结构或注释功能，而是可以把“给定功能和几何约束，生成新序列并返回结构”变成统一推理过程。最大 98B 模型带来的收益也主要体现在复杂组合提示响应、远离天然序列的可行蛋白生成和跨模态一致性上。

#### 🧪 练习题
```yaml
question: "ESM3 能用同一个模型做序列补全、结构生成和功能条件设计的根本原因是什么？"
options:
  - "它把序列、结构和功能都表示为离散 token track，并用 masked language modeling 联合预测被遮盖位置"
  - "它只训练了一个比 ESM-2 更大的氨基酸序列自回归模型"
  - "它在推理阶段调用 AlphaFold 3 作为唯一结构模块"
  - "它用人工规则枚举所有可能的蛋白突变"
answer: 0
explain: "ESM3 的关键是多轨离散化与联合遮盖重建目标；结构和功能不再只是后处理标签，而是和序列一起进入 Transformer 的输入输出空间。"
```

### SciGLM

```yaml
id: sciglm
num: 22
name: SciGLM
full_name: 科学GLM (Scientific GLM)
year: '2024'
org: 清华大学/智谱AI
parent: —
paper_url: https://proceedings.neurips.cc/paper_files/paper/2024/hash/02ee6b7295f720407b56c457b34c54d5-Abstract-Datasets_and_Benchmarks_Track.html
project_url: ''
category: science_llm
motivation: 自反思指令标注大学水平科学推理
```

#### 📝 一句话总结
SciGLM 通过 SciInstruct 数据集和自反思指令标注流程，把 ChatGLM 系列模型调优为面向大学水平科学推理的语言模型，解决了高质量科学 CoT 指令数据稀缺、普通 LLM 在公式推导和数值计算上不稳的问题。

#### 🎯 核心要点
- **核心产物是模型+数据流程**：SciGLM 是用 SciInstruct 微调得到的科学语言模型，SciInstruct 是其关键训练数据资产
- **自反思指令标注**：先收集无完整推理步骤的科学题，再让 LLM 生成 CoT reasoning，随后通过 critic-and-revise 补充和修正推理过程
- **覆盖大学科学推理**：数据包含物理/化学、数学和 Lean 形式化证明，强调复杂概念理解、符号方程推导和高级数值计算
- **254,051 条验证指令**：论文统计最终数据包括 123,869 条物理与化学、89,934 条数学、40,248 条形式化证明指令
- **质量过滤器**：训练 instruction-quality classifier，对生成推理打分并过滤低质量样本，降低计算错误、理解错误和伪推理进入训练集的概率
- **ChatGLM 系列验证**：主要在 ChatGLM3-6B-Base 和 ChatGLM3-32B-Base 上进行 SFT，也对 Llama3-8B-Instruct、Mistral-7B 等模型验证数据有效性
- **低学习率 SFT**：论文使用 HuggingFace Transformers、DeepSpeed，6B/32B 模型学习率 \(3\times10^{-6}\)，linear scheduler，训练 2 epochs
- **科学任务稳定提升**：在 CEval-Sci、SciEval、SciBench、MMLU-Sci 等科学任务和 MATH/SAT-Math 等数学任务上提升，同时基本不牺牲通用语言理解能力
- **跨学科混合有迁移收益**：leave-one-out 分析显示，物理/化学、数学和形式证明数据对非本学科任务也有贡献，说明模型学到的是通用推理格式而非只记题型

#### 🔬 深入细节
##### 框架总览

![SciInstruct 自反思指令构造流程](https://sciglm.github.io/static/images/SciInstruct.png)
*图：SciGLM 项目页 Figure 2，展示从多学科题库收集、LLM 自反思标注、质量过滤到保留高质量指令的流程。*

![SciGLM 科学基准平均准确率](https://sciglm.github.io/static/images/models_sci_v3.png)
*图：SciGLM 项目页 Figure 1，展示不同参数规模模型在 CEval-Sci、SciEval、SciBench、MATH 和 SAT-Math 上的平均准确率。*

可访问来源：NeurIPS 2024 Datasets and Benchmarks 论文页为 `https://proceedings.neurips.cc/paper_files/paper/2024/hash/02ee6b7295f720407b56c457b34c54d5-Abstract-Datasets_and_Benchmarks_Track.html`；arXiv HTML 为 `https://arxiv.org/html/2401.07950v2`；项目页和图示为 `https://sciglm.github.io/`。

##### 核心流程伪代码

```python
# SciGLM / SciInstruct 的高层构造与训练流程
def build_scinstruct(raw_questions, teacher_llms, labeled_seed_set):
    candidate_instructions = []
    for q in raw_questions:
        # q 通常已有题目和最终答案，但缺少稳定、可读的推理链
        draft_reasoning = teacher_llms.generate_cot(question=q.text)
        critique = teacher_llms.critic(
            question=q.text,
            answer=q.answer,
            reasoning=draft_reasoning,
        )
        revised_reasoning = teacher_llms.revise(
            question=q.text,
            answer=q.answer,
            reasoning=draft_reasoning,
            critique=critique,
        )
        candidate_instructions.append(format_chat(q.text, revised_reasoning, q.answer))

    positives, negatives = synthesize_quality_labels(labeled_seed_set, teacher_llms)
    quality_clf = train_quality_classifier(positives, negatives)
    scored = [(quality_clf.score(x), x) for x in candidate_instructions]
    return keep_high_quality(scored)


def train_sciglm(base_chatglm, scinstruct):
    for batch in dataloader(scinstruct):
        prompt, target = batch.prompt, batch.reasoning_and_answer
        loss = -log_prob(base_chatglm, target, condition=prompt)
        optimizer.step(loss)
    return base_chatglm
```

##### 动机：科学推理缺的不是题目，而是高质量推理过程

数学、物理和化学题库并不少，但很多数据只有题目和最终答案，缺少可监督模型学习的中间推导。对于科学 LLM，这个缺口比通用聊天更严重：模型不仅要选择概念，还要写出公式、代入数值、检查单位，并在多步推理中避免早期错误传导。

SciGLM 的判断是：继续预训练科学文本不一定能直接得到解题能力，因为论文语料和教材语料通常不以“问题-推导-答案”的交互格式出现；只用现成数学 CoT 数据又覆盖不了大学物理、化学和形式化证明。因此，方法重点放在构造高质量科学 instruction tuning 数据，而不是提出一个新的 Transformer 架构。

##### 自反思标注：生成、批判、修正

对一个问题 \(Q\) 和参考答案 \(A\)，普通 CoT 蒸馏可写成让教师模型直接生成推理：

$$
\hat{R} = \pi_{teacher}(Q, A)
$$

但科学题中，\(\hat{R}\) 可能出现“答案对、过程错”的情况，例如套错公式后通过数值巧合得到正确选项。SciGLM 加入 critic-and-revise，把生成过程拆成：

$$
C = \pi_{critic}(Q, A, \hat{R})
$$

$$
R^{*} = \pi_{revise}(Q, A, \hat{R}, C)
$$

其中 \(C\) 是对推理错误的批判性反馈，\(R^{*}\) 是修订后的推理链。这样得到的训练目标不是“模仿第一次生成”，而是模仿经过自我检查后的推理过程。

> 💡 关键：SciGLM 的自反思不是推理时让模型多想一遍，而是在数据构造阶段用反思机制提高 instruction 的监督质量。

##### 质量分类器：把“看起来像 CoT”的噪声过滤掉

论文指出，生成推理的错误主要来自两类：一是 LLM 中间推理错误，即使最终答案正确也可能有伪推理；二是 OCR 或题库转换导致题目/解答不完整。为此，SciGLM 训练 instruction-quality classifier。它基于 ChatGLM3-6B-Base 的特征，对候选解答输出从低到高的质量分数。

质量分类器的训练可抽象成二分类：

$$
h = \operatorname{ChatGLM3Feature}(Q, R, A)
$$

$$
s = w^\top h + b
$$

$$
\mathcal{L}_{clf}
= -y\log\sigma(s) - (1-y)\log(1-\sigma(s))
$$

其中正样本来自人工/已标注高质量解答，负样本来自 ChatGLM2-6B、GPT-3.5、GPT-4 等生成但经检查不可靠的推理。过滤阶段按 \(s\) 排序，移除低分候选；论文消融显示，过滤后的数据在科学和数学平均指标上优于未过滤版本。

##### 指令微调目标

最终 SciGLM 的模型训练是标准监督微调。把题目格式化为聊天式 prompt \(x\)，把修订后的推理链和答案拼成目标输出 \(y=(y_1,\dots,y_T)\)，优化自回归负对数似然：

$$
\mathcal{L}_{SFT}
= -\sum_{t=1}^{T}
\log p_\theta(y_t \mid x, y_{<t})
$$

这个目标本身并不新，关键在于 \(y\) 的质量。SciInstruct 让目标输出包含“识别知识点 -> 选择公式/定理 -> 分步计算/证明 -> 给出答案”的结构，因而模型学习到的是科学问题解决流程，而不只是答案模板。

##### 数据组成与跨学科迁移

论文最终保留 254,051 条 verified instructions，其中物理与化学占 123,869 条，数学占 89,934 条，形式化证明占 40,248 条。项目页的领域分布图显示，物理/化学约 48.8%，数学约 35.4%，Lean 约 15.8%；题型包括填空、选择、简单解答和复杂解答。

![SciInstruct 领域与题型分布](https://sciglm.github.io/static/images/domain_question_type.png)
*图：SciGLM 项目页 Figure 3，展示 SciInstruct 的学科占比和题型占比。*

有意思的是，leave-one-out 数据混合分析显示，删除某一学科会影响其他学科任务。例如数学和形式证明数据能帮助 SciBench，物理/化学数据也能帮助部分数学评测。这说明 SciInstruct 的价值不只是学科知识覆盖，更在于训练模型形成可迁移的符号推理、单位检查、公式选择和逐步验证行为。

##### 与 Galactica 或普通继续预训练的区别

Galactica 代表的是“用大量科学文本继续预训练”的路线，优势是覆盖论文、公式、引用和科学术语；但科学问答需要模型在交互格式下完成多步推导。SciGLM 的路线更接近“科学 CoT 指令调优”：不试图从原始论文中无监督学会解题，而是把大学科学题构造成高质量问题-推理-答案样本。

因此，SciGLM 的核心创新不是参数规模，而是数据闭环：收集题目、补全推理、反思修订、质量过滤、SFT 验证。论文报告 ChatGLM3-6B-Base 经 SciInstruct 训练后在科学与数学加权平均上提升，32B 模型也有稳定收益，并且 MMLU、CEval 等通用语言理解任务没有明显被牺牲。

#### 🧪 练习题
```yaml
question: "SciGLM 中 self-reflective instruction annotation 的主要作用是什么？"
options:
  - "在推理时让用户手动检查模型答案"
  - "在数据构造阶段为缺少推理链的科学题生成、批判并修订 CoT，再过滤低质量样本"
  - "把所有科学题转换成蛋白质结构预测任务"
  - "用更大的词表替换 ChatGLM 的分词器"
answer: 1
explain: "SciGLM 的关键贡献是 SciInstruct 构造流程：先让 LLM 补充推理步骤，再通过 critic-and-revise 和质量分类器提升训练指令质量。"
```

### SciDFM

```yaml
id: scidfm
num: 23
name: SciDFM
full_name: 科学领域基础模型 (Scientific Domain Foundation Model)
year: '2024'
org: 复旦大学
parent: —
paper_url: https://arxiv.org/abs/2401.12356
project_url: ''
category: science_llm
motivation: MoE架构科学大模型多领域专家
```

#### 📝 一句话总结
SciDFM 提出了一个从头训练的科学领域 MoE 大语言模型，用 8 专家、top-2 路由的稀疏 FFN 替代普通 Transformer FFN，并通过科学语料、分子/蛋白专用 token 与指令微调来补足通用 LLM 对化学分子和氨基酸序列的建模短板。

#### 🎯 核心要点
- MoE 架构：总参数约 18.2B、每次前向激活约 5.6B，26 层、隐藏维度 3200、上下文长度 8192、8 个专家且每个 token 选择 top-2 专家。
- 科学 token 设计：在 OpenLLaMA-3B BPE tokenizer 基础上，把化学原子和氨基酸字符作为独立 token，减少 SMILES 与蛋白序列被普通子词切碎的问题。
- 预训练数据：约 570B token 单轮语料，其中科学域约 300B、通用域约 270B；训练两轮后总计约 1.1T token。
- 指令微调数据：约 9.3M 条样本，覆盖数学、物理、生物、医学、化学与通用问答，并包含 Mol-Instructions、ChemDFM-sft 等分子/蛋白任务。
- 训练机制：AdamW、cosine learning-rate schedule、4M token macro batch、MoE auxiliary loss factor 0.02 与 expert capacity factor 1.0。
- 专家分析：论文用不同学科论文、分子 SMILES 与氨基酸序列统计专家选择向量，再用 t-SNE 展示专家路由会随学科/模态形成不同分布。
- 来源限制：任务给出的 `paper_url` 实际指向联邦学习论文；本文依据可追溯的 SciDFM 论文 `https://arxiv.org/abs/2409.18412` 和公开模型页 `https://huggingface.co/OpenDFM/SciDFM-MoE-A5.6B-v1.0` 撰写。

#### 🔬 深入细节
##### 图示与来源
![SciDFM 专家选择 t-SNE 可视化](https://arxiv.org/html/2409.18412v3/extracted/5994215/tsne.png)
*图：SciDFM 论文 Figure 1，展示数学、物理、化学、生物文本以及分子/蛋白序列在 MoE 专家选择统计上的 t-SNE 分布。论文没有给出单独的模型架构总览图，因此这里使用作者提供的专家行为分析图作为核心机制证据。*

可访问来源：SciDFM 的 arXiv HTML 为 `https://arxiv.org/html/2409.18412v3`；任务中的 `https://arxiv.org/abs/2401.12356` 不是 SciDFM 论文，正文按实际论文校正。

##### 机制拆解
SciDFM 的基础仍是 decoder-only Transformer，并沿用 LLaMA 系列常见改动：RMSNorm、RoPE 与 SwiGLU。关键差异在于把原本每层中的 dense FFN 替换为 MoE 层。对每个 token 的隐藏状态 \(x\)，门控网络产生专家概率：

$$
p=\mathrm{Softmax}(xW_g),\qquad S=\mathrm{TopK}(p, k=2)
$$

MoE 输出可写成：

$$
\mathrm{MoE}(x)=\sum_{i\in S} p_i E_i(x)
$$

其中 \(E_i\) 是第 \(i\) 个专家 FFN。直觉上，注意力层仍负责跨 token 交互，而 MoE FFN 负责把 token 映射到少量更适合的专家子网络；top-2 路由让计算量接近 5.6B 激活参数，同时保留 18.2B 总容量。训练时还加入负载均衡辅助项，避免少数专家长期被过度使用：

$$
\mathcal{L}_{\mathrm{train}}
=-\sum_t \log p_\theta(x_t\mid x_{<t})
+\lambda \mathcal{L}_{\mathrm{aux}}
$$

SciDFM 的 tokenizer 是另一个方法核心。普通 BPE 对 SMILES 或氨基酸序列可能把一个化学原子、括号、键符号或残基拆到不稳定的子词边界；SciDFM 把化学原子和 20 类氨基酸字符作为独立 token，并使用特殊标识区分科学符号和自然语言文本。例如 `C(C(=O)O)N` 会按原子、括号和键相关符号切分，蛋白序列 `MIRLGAPQTL` 则按残基逐字符切分。这样做的效果不是显式建模 3D 结构，而是让语言模型至少在序列层面看到稳定的科学符号单元。

论文还提出了一种专家选择分析方式。设第 \(i\) 层 MoE gate 对长度为 \(l\) 的文本输出 \(g_i\)，专家数为 \(e\)，该层的专家选择摘要为：

$$
e_i=\mathrm{Softmax}\left(\sum_{j=1}^{l} g_i[j,:]\right)\in\mathbb{R}^{e}
$$

把所有 \(N\) 个 MoE 层的摘要拼接为：

$$
E_T=\mathrm{Concat}([e_1,e_2,\dots,e_N])\in\mathbb{R}^{Ne}
$$

这相当于把一段文本或序列投影成“它倾向使用哪些专家”的指纹。论文对数学、物理、化学、生物论文以及分子/蛋白序列分别采样后发现，学科文本在专家选择空间中出现聚类，分子和蛋白序列又与普通学科论文明显分离，说明 MoE 路由确实学习到了不同科学数据类型的差异。

##### 训练与推理伪代码
```python
# SciDFM pretraining: decoder-only LM with top-2 MoE FFN
for batch in science_and_general_corpus:
    tokens = scientific_tokenizer(batch)  # text, SMILES, amino-acid sequences
    hidden = embed(tokens)

    aux_loss = 0.0
    for layer in transformer_layers:
        hidden = hidden + self_attention(layer.norm1(hidden))

        x = layer.norm2(hidden)
        gate_prob = softmax(x @ layer.gate_weight)
        expert_ids = topk(gate_prob, k=2)
        moe_out = 0
        for expert_id in expert_ids:
            moe_out += gate_prob[expert_id] * layer.experts[expert_id](x)
        hidden = hidden + moe_out
        aux_loss += load_balance_loss(gate_prob, expert_ids)

    lm_loss = cross_entropy(next_token_head(hidden), tokens.shift_left())
    loss = lm_loss + 0.02 * aux_loss
    loss.backward()
    optimizer.step()
```

推理阶段没有额外检索或工具调用：输入文本、SMILES 或蛋白序列先经科学 tokenizer 编码，再经过同一组 MoE Transformer 层；每个 token 的 gate 动态选择两个专家，因此同一个模型能在数学推理、医学问答、分子属性描述和蛋白功能描述之间共享底层表示，同时保留一定的专家分工。

> 💡 关键：SciDFM 的贡献不是提出新的注意力机制，而是把“科学语料 + 科学符号 tokenizer + 稀疏 MoE 容量”组合成一个通用科学 LLM，并用专家选择分析证明不同科学域会触发不同路由模式。

#### 🧪 练习题
```yaml
question: "SciDFM 使用 MoE 层替代普通 FFN 的主要目的是什么？"
options:
  - "让每个 token 动态路由到少量专家，在增加总参数容量的同时控制激活计算量"
  - "完全移除注意力层，只依赖专家网络完成序列建模"
  - "把分子 3D 坐标直接编码进模型结构"
  - "用检索数据库替代预训练语料"
answer: 0
explain: "SciDFM 的 MoE 层通过 top-2 gate 激活少数专家，使模型拥有更大的总容量，但每次前向只计算部分专家。"
```

### UniMAP

```yaml
id: unimap
num: 24
name: UniMAP
full_name: 统一分子预训练 (Unified Molecular Pre-training)
year: '2024'
org: Tsinghua University
parent: —
paper_url: https://arxiv.org/abs/2402.13163
project_url: ''
category: molecular
motivation: 多模态融合SMILES序列与分子图
```

#### 📝 一句话总结
UniMAP 提出了一个单流 Transformer 分子表征学习框架，把 SMILES token 与分子图节点嵌入拼接到同一个序列中，并用分子级与片段级预训练任务同时对齐 1D SMILES 和 2D 图结构。

#### 🎯 核心要点
- 单流跨模态架构：SMILES 经 regex tokenizer 得到 token embedding，分子图经 GCN 得到原子/边相关表示，再拼接后输入共享 Transformer。
- 细粒度融合目标：不仅做分子级 SMILES-Graph Matching，还做 token/fragment 级 Multi-Level Cross-Modality Masking 与 Fragment-Level Alignment。
- 片段分解机制：把 SMILES 片段与图子结构对应起来，让模型学习“同一化学片段在两种模态中的语义一致性”。
- Domain Knowledge Learning：利用化学功能团、scaffold 等领域知识作为额外监督，补足纯自监督目标对药化语义的约束。
- 下游覆盖：在 MoleculeNet 分子性质预测、drug-target affinity 与 drug-drug interaction 等任务上评估，强调预训练表征的通用性。
- 与双流方法的区别：MOCO 等方法通常分别编码 SMILES 和 graph 后做全局对比；UniMAP 让两种模态在 Transformer 内部逐层交互。
- 来源限制：任务给出的 `paper_url` 实际指向数学逻辑论文；本文依据可追溯的 UniMAP 论文 `https://arxiv.org/abs/2310.14216` 与 HTML `https://arxiv.org/html/2310.14216v2` 撰写。

#### 🔬 深入细节
##### 图示与来源
![UniMAP 框架总览](https://arxiv.org/html/2310.14216v2/x2.png)
*图：UniMAP 论文 Figure 2，SMILES 与 Graph 被输入同一个 Transformer，并由片段级和分子级预训练任务共同监督。*

可访问来源：UniMAP 的 arXiv HTML 为 `https://arxiv.org/html/2310.14216v2`；任务中的 `https://arxiv.org/abs/2402.13163` 不是 UniMAP 论文，正文按实际论文校正。

##### 机制拆解
UniMAP 解决的是分子表征中的一个具体矛盾：SMILES 是 1D 序列，适合捕获长程上下文、手性符号与字符串模式；分子图是 2D 拓扑，适合捕获原子邻接、环与局部子结构。双流模型通常只在最终向量上做对齐，容易错过“一个片段替换导致药性反转”的细粒度关系。UniMAP 因此采用早期融合：让 SMILES token 和图节点从第一层 Transformer 起就相互注意。

设 SMILES 为 \(S=[t_1,t_2,\dots,t_n]\)，其 embedding 为 \(\mathbf{s}=[s_1,\dots,s_n]\)；分子图为 \(G=\{V,E\}\)，经 GCN 得到 \(\mathbf{g}=[g_1,\dots,g_m]\)。UniMAP 的 Transformer 输入可概括为：

$$
H_0=[s_1+p_1,\dots,s_n+p_n,g_1,\dots,g_m]
$$

其中 SMILES token 加位置编码，图节点本身不强行赋予线性顺序。经过多层 Transformer 后，SMILES token 可以 attend 到图节点，图节点也能 attend 到序列上下文，从而在单个骨干内完成融合。

Multi-Level Cross-Modality Masking (CMM) 是核心预训练目标。它包含 token-level masking 与 fragment-level masking：前者遮盖个别 SMILES token 或图原子并用另一模态上下文辅助恢复；后者遮盖对应的 SMILES/graph 片段，迫使模型学习片段级语义。片段级损失可写成：

$$
\mathcal{L}_f=-\sum_{\forall(S,G)}
\left(
\log P_\theta(\mathbf{s_m}\mid S_{\backslash\mathbf{m}},G)
+\log P_\theta(\mathbf{g_m}\mid S,G_{\backslash\mathbf{m}})
\right)
$$

整体 CMM 损失为：

$$
\mathcal{L}_{CMM}=\mathcal{L}_t+\mathcal{L}_f
$$

SMILES-Graph Matching (SGM) 是分子级二分类任务：给定一对 SMILES 和 graph，判断它们是否来自同一个分子。它可以用二元交叉熵表示：

$$
\mathcal{L}_{SGM}
=-\left[y\log q_\theta(S,G)+(1-y)\log(1-q_\theta(S,G))\right]
$$

Fragment-Level Alignment (FLA) 进一步把对应片段拉近、非对应片段推远。可用对比学习形式理解：

$$
\mathcal{L}_{FLA}
=-\sum_i \log
\frac{\exp(\mathrm{sim}(f_i^S,f_i^G)/\tau)}
{\sum_j \exp(\mathrm{sim}(f_i^S,f_j^G)/\tau)}
$$

Domain Knowledge Learning (DKL) 则把功能团、分子 scaffold 等药化先验变成多标签监督，让模型不只恢复表面 token，还学习与性质相关的化学类别。最终预训练目标可以概括为：

$$
\mathcal{L}
=\mathcal{L}_{CMM}
+\mathcal{L}_{SGM}
+\mathcal{L}_{FLA}
+\mathcal{L}_{DKL}
$$

##### 训练伪代码
```python
# UniMAP pretraining: single-stream SMILES-graph fusion
for molecule in pretrain_loader:
    smiles = regex_tokenize(molecule.smiles)
    graph = build_molecular_graph(molecule)

    s_emb = smiles_embedding(smiles) + position_embedding(smiles)
    g_emb = gcn_encoder(graph)  # atom/node embeddings
    h = transformer(concat([s_emb, g_emb]))

    # molecular-level alignment
    pos_pair = (molecule.smiles, molecule.graph)
    neg_pair = sample_mismatched_pair()
    loss_sgm = binary_cross_entropy(match_head(h), labels=[1, 0])

    # token/fragment reconstruction
    masked_tokens = mask_smiles_tokens_and_graph_atoms(molecule)
    masked_frags = mask_corresponding_smiles_graph_fragments(molecule)
    loss_cmm = reconstruct(masked_tokens, h) + reconstruct(masked_frags, h)

    # fragment-level and domain-knowledge supervision
    loss_fla = contrastive_align(fragment_repr_smiles(h), fragment_repr_graph(h))
    loss_dkl = multi_label_bce(domain_head(h), functional_group_labels(molecule))

    loss = loss_cmm + loss_sgm + loss_fla + loss_dkl
    loss.backward()
    optimizer.step()
```

推理或下游微调时，UniMAP 仍同时接收 SMILES 与 graph；模型输出的 `[CLS]`/pooling 表示可接分类或回归头，用于 MoleculeNet 性质预测、DTA 或 DDI。相比只用 SMILES 或只用图，单流结构的优势在于同一层注意力可以发现跨模态互补：例如 SMILES 显式保存手性和 disconnected ionic moieties 的字符串关系，而图更直接表达环、邻接和药效片段。

> 💡 关键：UniMAP 的“统一”不是把 SMILES 转成图或把图转成 SMILES，而是让两种表示作为异构 token 同时进入 Transformer，并用片段级任务约束它们在局部化学语义上对齐。

#### 🧪 练习题
```yaml
question: "UniMAP 相比仅做 SMILES-Graph 全局对比的双流方法，最核心的改进是什么？"
options:
  - "把 SMILES 和 graph 拼接进同一个 Transformer，并加入片段级遮盖与对齐目标"
  - "只保留 SMILES 字符串，完全删除分子图"
  - "用 3D 构象监督替代所有 1D/2D 信息"
  - "只在下游有标签数据上从零训练分类器"
answer: 0
explain: "UniMAP 的关键是单流早期融合和片段级预训练，使模型能捕获 SMILES token 与图子结构之间的细粒度对应关系。"
```

### AION-1

```yaml
id: aion1
num: 25
name: AION-1
full_name: AION-1 (AION-1)
year: '2025'
org: Polymathic AI
parent: —
paper_url: https://polymathic-ai.org/news/aion-1
project_url: ''
category: unified_foundation
motivation: 十亿参数多模态天文学基础模型
```

#### 📝 一句话总结
AION-1 提出了面向天文学的多模态基础模型族，把图像、光谱和标量观测统一离散为 token，再用 Transformer encoder-decoder 做跨模态 masked modeling，从而学习可用于检索、参数估计和条件生成的天体级通用表示。

#### 🎯 核心要点
- 数据模态：整合 39 类天文数据模态，包括多波段图像、光谱、光度、红移、Gaia BP/RP 系数、天体形态和其他标量属性。
- 两阶段结构：先用模态专用 tokenizer 把异构观测离散化，再用统一 Transformer 对跨模态 token 序列做 masked prediction。
- 训练目标：借鉴 4M multimodal masked modeling，从所有可用模态中采样 observed tokens 与 target tokens，最大化 \(p_\theta(x^{tgt}\mid x^{obs})\)。
- 模型规模：AION-1-B/L/XL 分别约 300M、800M、3B 参数，XL 已达到十亿参数级多模态天文学基础模型。
- 早期融合：同一个 encoder 处理图像、光谱与标量 token；多模态输入只需拼接 token，不需要额外 late-fusion 模块。
- 下游使用：常把 encoder 冻结为特征提取器，再训练轻量 head 做星系性质估计、恒星参数估计、形态分类和稀有天体检索。
- 来源说明：任务给出的是官方新闻/项目页；本文同时依据官方博客 `https://polymathic-ai.org/blog/aion-1/`、论文 `https://arxiv.org/abs/2510.17960` 和 HTML `https://arxiv.org/html/2510.17960v1` 撰写。

#### 🔬 深入细节
##### 图示与来源
![AION-1 多模态框架](https://arxiv.org/html/2510.17960v1/figures/aion.png)
*图：AION-1 论文 Figure 1，展示多类天文观测先经专用 tokenizer 统一成 token，再进入多模态 masked modeling 框架。*

可访问来源：官方博客为 `https://polymathic-ai.org/blog/aion-1/`，论文 HTML 为 `https://arxiv.org/html/2510.17960v1`，代码入口为 `https://github.com/PolymathicAI/AION/`。

##### 机制拆解
AION-1 面对的是天文学中非常典型的异构观测问题：同一个天体可能同时有 Legacy Survey 或 HSC 图像、SDSS/DESI 光谱、Gaia 低分辨率系数、光度、红移和形态参数。传统做法通常为每个 survey、每种任务分别训练模型；AION-1 则把所有观测变成统一 token 序列，使模型学习“不同观测其实描述同一个物理对象”的联合分布。

第一阶段是 tokenization。图像、光谱、标量和 scalar field 不能直接共用原始数值空间，因此 AION-1 为每类数据设计专用 tokenizer。标量 tokenization 尤其强调分布自适应：先用训练集经验 CDF 把原始标量 \(x\) 映射到近似标准正态空间，再做有限级别量化。可概括为：

$$
z=\Phi^{-1}(\hat{F}(x))
$$

其中 \(\hat{F}\) 是经验 CDF，\(\Phi^{-1}\) 是标准正态分布的逆 CDF。这样长尾标量在量化空间中不会把大量概率质量挤在少数 bins 里。

第二阶段是 multimodal masked modeling。设一个训练样本的可用模态 token 序列为：

$$
\mathbf{X}=\{\mathbf{x}_1,\ldots,\mathbf{x}_M\}
$$

训练时从全部 token 池中采样两个不相交子集：observed tokens \(\mathbf{x}^{obs}\) 作为 encoder 输入，target tokens \(\mathbf{x}^{tgt}\) 作为 decoder 查询目标。目标函数为：

$$
\mathcal{L}_{\mathrm{4M}}(\theta)
=-\sum_{t=1}^{N}\log p_\theta(\mathbf{x}_t^{tgt}\mid \mathbf{x}_t^{obs})
$$

这使 AION-1 既学习同模态重建，也学习跨模态转换。例如给定低分辨率 Gaia BP/RP 系数预测高分辨率 DESI 光谱，或给定图像 token 预测标量属性 token。

AION-1 的 encoder 输入 embedding 同时包含 token value、模态/来源标识和位置：

$$
\mathbf{e}_{t}^{(\mathrm{enc})}
=\mathrm{Embed}_{i}(x_t^i)+\mathbf{m}_i+\mathbf{p}_t
$$

decoder 查询 token 不包含待预测值，只告诉模型“要预测哪个模态、哪个位置”：

$$
\mathbf{e}_{t}^{(\mathrm{dec})}
=\mathbf{m}_i+\mathbf{p}_t
$$

这里 \(\mathbf{m}_i\) 不只是数据类型标识，还包含来源/仪器信息；两个图像即便都是 image modality，只要来自不同 survey，也会使用不同的 modality embedding。这一点对天文学很重要，因为仪器、分辨率、噪声和选择函数本身携带观测先验。

##### 训练与推理伪代码
```python
# AION-1 multimodal masked modeling
for object_record in astronomy_loader:
    token_pool = []
    for modality in available_modalities(object_record):
        tokenizer = tokenizer_registry[modality]
        tokens = tokenizer.encode(object_record[modality])
        token_pool.extend(add_modality_and_position_metadata(tokens, modality))

    observed = sample_input_tokens(token_pool, budget=256)
    targets = sample_target_tokens(token_pool - observed, budget=128)

    enc = transformer_encoder(embed_value_modality_position(observed))
    dec_query = embed_modality_position_only(targets)
    logits = transformer_decoder(dec_query, cross_attend_to=enc)

    loss = cross_entropy(logits, targets.values)
    loss.backward()
    optimizer.step()
```

下游阶段通常不重新训练整个基础模型，而是冻结 encoder 并抽取对象级 embedding。论文给出两类 pooling：平均池化以及带可学习 query/key/value 的 attentive pooling。多模态输入只需把各模态 token 拼接后送入同一 encoder，表示中已经包含预训练阶段学到的跨模态关系。对于小样本科学任务，这种流程比端到端监督模型更省标注，也更容易把研究者的校准集和选择函数纳入轻量 head。

> 💡 关键：AION-1 的核心不是单个更强的图像模型或光谱模型，而是把天文学观测统一成“可相互预测的 token 语言”，让模型学习同一物理天体在不同仪器和模态下的联合表示。

#### 🧪 练习题
```yaml
question: "AION-1 的 multimodal masked modeling 为什么适合异构天文数据？"
options:
  - "它把不同模态都离散成 token，并训练模型根据可见模态预测被遮盖模态"
  - "它要求所有 survey 使用完全相同的图像分辨率和噪声模型"
  - "它只训练图像分类器，不处理光谱和标量"
  - "它在推理时必须为每个下游任务重新预训练基础模型"
answer: 0
explain: "AION-1 通过模态专用 tokenizer 和跨模态遮盖预测，把图像、光谱和标量放进统一 token 空间，适合处理观测来源复杂的天文学数据。"
```

### Walrus

```yaml
id: walrus
num: 26
name: Walrus
full_name: Walrus (Walrus)
year: '2025'
org: Polymathic AI
parent: —
paper_url: https://polymathic-ai.org/news/walrus
project_url: ''
category: unified_foundation
motivation: 连续介质动力学跨领域物理迁移
```

#### 📝 一句话总结
Walrus 提出了一个面向连续介质动力学的 13 亿参数空间-时间 Transformer，用同一模型处理 2D/3D、不同分辨率和不同物理场景的场演化预测。它的关键贡献不是单一 PDE 求解器，而是用自适应 token 化、patch jittering 稳定化和负载均衡训练把多领域物理仿真合成一个可迁移的基础模型。

#### 🎯 核心要点
- 统一任务形式：把流体、声学、等离子体、天体物理、地球科学、流变学等连续场都表示为网格上的多变量状态序列，学习短历史到下一步增量的映射。
- 空间-时间 Transformer：采用 encoder-processor-decoder 结构，encoder/decoder 使用带 stride modulation 的 hMLP/反 hMLP，processor 使用分解的空间注意力和时间注意力。
- 自适应计算 token 化：对不同空间维度、分辨率和长宽比动态调节下采样步幅，使 2D 与 3D 样本进入模型后的 token 数大致可控。
- Patch jittering 稳定化：训练/滚动时随机平移参考坐标系再反向平移输出，降低固定 patch 下采样带来的混叠和长期滚动伪影。
- 数据与训练规模：公开材料描述其在 19 个物理场景、63 个物理变量、2D/3D 数据上联合训练，并发布代码、权重和微调检查点。
- 迁移方式：预训练模型可零样本滚动，也可在新物理场景上用少量高保真轨迹微调，作为昂贵数值仿真的 surrogate model。

#### 🔬 深入细节
##### 1. 图示与来源

![Walrus 架构示意图](https://raw.githubusercontent.com/PolymathicAI/walrus/main/assets/ArchitectureWIP.png)

*图：Walrus 官方仓库中的整体架构图，展示从物理场输入、patch/token 表示、空间-时间处理器到预测输出的流程。*

可访问来源包括 arXiv 论文页面 `https://arxiv.org/abs/2511.15684`、官方仓库 `https://github.com/PolymathicAI/walrus`、Hugging Face 模型卡 `https://huggingface.co/polymathic-ai/walrus`。任务给出的 `paper_url` 是新闻/项目页，因此本文优先依据 arXiv 摘要、官方代码仓库和模型卡；部分训练损失细节按物理 surrogate 的公开实现范式整理，未公开的超参数不作臆测。

##### 2. 问题形式：从场历史预测下一步增量

连续介质仿真的状态可写成多通道场 \(u_t(x)\)，例如密度、速度、压力、温度或磁场分量。Walrus 不为每个方程族设计专用网络，而是把最近 \(\tau\) 个时间步组织为历史窗口：

$$
U_t = [u_{t-\tau+1}, \ldots, u_t]
$$

模型学习一个增量预测器：

$$
\Delta \hat{u}_{t+1} = M_\theta(U_t, m), \qquad \hat{u}_{t+1}=u_t+\Delta \hat{u}_{t+1}
$$

其中 \(m\) 表示变量索引、网格元信息、边界/数据源等条件信息。训练时通常对真实增量 \(\Delta u_{t+1}=u_{t+1}-u_t\) 做归一化回归：

$$
\mathcal{L}_{\text{step}}
= \sum_{c \in \mathcal{C}} w_c
\left\|
\frac{\Delta \hat{u}^{(c)}_{t+1}-\Delta u^{(c)}_{t+1}}{\sigma_c+\epsilon}
\right\|_2^2
$$

这种“预测增量而不是绝对状态”的形式有两个好处：一是不同物理量的动态尺度更容易归一化，二是在自回归滚动时可直接把输出反馈为下一步输入。

##### 3. 架构机制：自适应 token 化与空间-时间处理

Walrus 的 encoder 把网格场压缩成 token 序列。传统 ViT/PDE surrogate 往往使用固定 patch 大小，这在多分辨率、多维度训练中会导致 token 数暴涨或过度压缩。Walrus 使用 stride modulation 动态调节下采样，使内部 token 网格保持近似目标大小；公开 README 中给出的预训练设置是 2D 内部尺度约为每维 32/33，3D 约为每维 16/17。

processor 部分采用分解注意力：空间注意力负责同一时间片内的远程空间相互作用，时间注意力负责历史帧之间的信息整合。相比分别训练 2D 模型、3D 模型和单一方程模型，这种结构把“局部守恒、波动传播、扩散、旋涡输运”等跨领域动力学模式压到同一参数空间中。

##### 4. Patch jittering：用随机坐标平移抑制混叠

固定 patch 化和转置卷积上采样容易产生网格对齐伪影；这些误差在单步预测中可能很小，但自回归滚动会不断放大。Walrus 的 patch jittering 在每一步随机平移输入参考系，模型输出后再反向平移回原坐标。

从频域直觉看，下采样-上采样组合会让高频分量折叠到低频。若下采样倍率为 \(P=N/M\)，输出频谱可概括为：

$$
\hat{v}[k]
= \hat{h}[k]\hat{g}[k]\hat{u}[k]
+ \sum_{j=1}^{P-1}\hat{h}[k]\hat{g}[k+jM]\hat{u}[k+jM]
$$

第二项就是由固定采样格点引入的混叠。若对输入施加随机平移 \(s\)，再对输出反平移，混叠项会乘上相位因子：

$$
\mathbb{E}_s\left[e^{-i2\pi s jM}\right] \approx 0
$$

因此期望意义下混叠被平均掉，长期 rollout 中的棋盘格/条纹伪影更难持续积累。

##### 5. 核心训练与推理伪代码

```python
# Walrus-style continuum dynamics pretraining
for step in range(num_steps):
    source = load_balanced_sampler.pick_dataset()  # 2D/3D heterogeneous sources
    fields = source.sample_window(length=tau + 1)
    history = normalize(fields[:tau])
    target_delta = normalize(fields[tau] - fields[tau - 1])

    shift = sample_spatial_shift()                 # patch jittering
    history_j = translate_with_padding(history, shift)

    tokens = adaptive_patch_embed(history_j, target_internal_grid=source.target_grid)
    latent = spacetime_transformer(tokens, variable_metadata=source.variables)
    pred_delta_j = decoder(latent)
    pred_delta = inverse_translate(pred_delta_j, shift)

    loss = weighted_mse(pred_delta, target_delta)
    loss.backward()
    optimizer.step()

# autoregressive rollout
context = observed_initial_window
for _ in range(forecast_steps):
    delta = walrus(context)
    next_state = context[-1] + denormalize(delta)
    context = append_and_drop_oldest(context, next_state)
```

##### 6. 与传统 PDE surrogate 的区别

传统 FNO、UNet 或专用 Transformer 往往假设固定网格、固定方程族和固定变量集合；它们在一个数据集上很强，但跨数据集迁移时需要重新设计输入通道、分辨率策略和训练流程。Walrus 的目标是把这些差异抽象为 token 化、变量元数据和数据采样问题，让一个大模型跨物理域共享表征。

这并不意味着 Walrus 替代数值求解器。它更适合作为快速近似器：用短历史状态生成多步预测，用于参数扫描、初筛、交互式分析或给下游优化提供廉价 rollout。对守恒律严格性、极端外推和未见边界条件仍需通过物理校验或高保真仿真复核。

#### 🧪 练习题
```yaml
question: "Walrus 中 patch jittering 的主要作用是什么？"
options:
  - "随机丢弃物理变量以降低显存占用"
  - "随机平移输入参考系并反平移输出，削弱固定 patch 下采样导致的混叠伪影"
  - "把所有 3D 数据投影成 2D 图像以便使用 ViT"
  - "用语言 token 替代连续物理场"
answer: 1
explain: "patch jittering 的核心是随机化采样网格相位，使固定 patch 化产生的混叠项在期望上被抵消，从而提升长期自回归预测稳定性。"
```

### MatterGen

```yaml
id: mattergen
num: 27
name: MatterGen
full_name: MatterGen (MatterGen)
year: '2025'
org: Microsoft Research
parent: —
paper_url: https://www.microsoft.com/en-us/research/blog/mattergen-a-generative-model-for-inorganic-materials-design/
project_url: ''
category: materials_weather
motivation: 扩散生成满足属性约束的晶体
```

#### 📝 一句话总结
MatterGen 提出了一个面向无机晶体的扩散生成模型，联合去噪原子类型、周期坐标和晶格向量，从随机结构直接生成稳定且新颖的晶体。它进一步通过 adapter 微调和 classifier-free guidance 支持化学体系、空间群、带隙、体模量、磁密度等属性约束，推动材料发现从“筛选已知候选”转向“按目标生成候选”。

#### 🎯 核心要点
- 晶体表示：将一个周期晶体表示为 atom types \(A\)、fractional coordinates \(X\) 和 lattice \(L\)，扩散过程同时作用于三者。
- 定制扩散过程：坐标噪声尊重周期边界，晶格噪声趋向物理上合理的平均密度分布，元素类型在离散类别空间中被 mask/腐蚀。
- 等变 score network：对 \(A, X, L\) 同时预测反向去噪方向，坐标与晶格分量保持对平移、旋转和周期性的合理归纳偏置。
- 两阶段训练：先在大规模稳定晶体结构上预训练通用生成器，再对带属性标签的小数据集插入 adapter 进行条件微调。
- 条件生成能力：支持化学组成、空间群、磁密度、带隙、体模量、供应链风险等单属性或多属性目标。
- 评价指标：论文用稳定、唯一、新颖（SUN）比例、DFT relaxation 后 RMSD、energy above hull 等指标衡量生成质量。
- 实验验证：Nature 论文报告其生成结构相对先前模型更可能同时稳定且新颖，并合成验证了一个生成结构的目标性质。

#### 🔬 深入细节
##### 1. 图示与来源

![MatterGen 扩散生成流程](https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41586-025-08628-5/MediaObjects/41586_2025_8628_Fig1_HTML.png)

*图：MatterGen 的晶体扩散流程。正向过程腐蚀 \(A, X, L\)，反向过程用等变 score network 去噪；条件微调时通过 adapter 注入属性标签。*

可访问来源包括 Nature 正文 `https://www.nature.com/articles/s41586-025-08628-5`、arXiv 页面 `https://arxiv.org/abs/2312.03687`、Microsoft Research 博客 `https://www.microsoft.com/en-us/research/blog/mattergen-a-new-paradigm-of-materials-design-with-generative-ai/` 和官方仓库 `https://github.com/microsoft/mattergen`。任务给出的链接是 Microsoft Research 新闻/博客页；本文以 Nature 论文方法段落为主，并用官方仓库补充可运行流程。

##### 2. 晶体扩散对象：同时生成元素、坐标和晶格

一个晶体的基本生成单元可写作：

$$
C = (A, X, L)
$$

其中 \(A\in\{1,\ldots,K\}^n\) 是 \(n\) 个原子的元素类别，\(X\in[0,1)^{n\times 3}\) 是周期晶胞内的分数坐标，\(L\in\mathbb{R}^{3\times 3}\) 是晶格向量矩阵。图像扩散只需要处理连续像素，而晶体必须同时满足三类约束：元素是离散类别，坐标在周期边界上等价，晶格要有物理可行的尺度与形状。

MatterGen 的正向腐蚀过程把三部分推向简单噪声分布：

$$
q(C_t|C_0)
= q(A_t|A_0)\,q(X_t|X_0,L_0)\,q(L_t|L_0)
$$

可直观理解为：元素逐步变成不确定/掩码类别，分数坐标在周期空间中加入 wrapped noise，晶格逐渐靠近由训练集平均原子密度诱导的随机晶胞分布。

##### 3. 训练目标：学习反向去噪 score

反向生成从随机晶体 \(C_T\) 开始，逐步预测 \(C_{t-1}\)。模型参数 \(\theta\) 输出三类去噪信号：

$$
s_\theta(C_t,t,c)
= \left(s_\theta^A, s_\theta^X, s_\theta^L\right)
$$

其中 \(c\) 是可选属性条件。训练损失可以概括为离散类别交叉熵与连续 score matching 的组合：

$$
\mathcal{L}
= \mathbb{E}_{t,C_0,C_t}
\left[
\lambda_A \operatorname{CE}(A_0, p_\theta(A_0|C_t,t,c))
+ \lambda_X \left\|s_\theta^X - \nabla_{X_t}\log q(X_t|X_0)\right\|_2^2
+ \lambda_L \left\|s_\theta^L - \nabla_{L_t}\log q(L_t|L_0)\right\|_2^2
\right]
$$

这里的重点不在公式符号本身，而在归纳偏置：坐标和晶格的输出必须与晶体几何等变，元素预测必须与周期结构中各原子的局部环境一致。

##### 4. Adapter 微调与属性引导

基础模型先学习“什么样的无机晶体像稳定材料”。当要生成满足某个属性的材料时，MatterGen 不从头训练大模型，而是在 score network 的层中插入 adapter，并用带标签的小数据集微调。对目标属性 \(c\)，推理时可使用 classifier-free guidance：

$$
s_{\text{guided}}(C_t,t,c)
= (1+\gamma)s_\theta(C_t,t,c)
- \gamma s_\theta(C_t,t,\varnothing)
$$

\(\gamma\) 越大，生成越贴近属性目标，但也可能牺牲多样性和结构真实性。官方仓库的生成命令中 `--diffusion_guidance_factor` 就对应这个引导强度。

##### 5. 核心算法伪代码

```python
# MatterGen base pretraining
for crystal in stable_structure_loader:
    A0, X0, L0 = crystal.atom_types, crystal.frac_coords, crystal.lattice
    t = sample_diffusion_time()
    At = corrupt_atom_types(A0, t)
    Xt = wrapped_coordinate_noise(X0, L0, t)
    Lt = lattice_noise(L0, t)

    pred = equivariant_score_network(At, Xt, Lt, t, condition=None)
    loss = atom_ce(pred.A, A0) + coord_score_loss(pred.X, X0) + lattice_score_loss(pred.L, L0)
    loss.backward()
    optimizer.step()

# Property-conditioned generation
C = sample_random_crystal_prior()
for t in reversed(diffusion_schedule):
    s_cond = model(C, t, condition={"bulk_modulus": 400.0})
    s_uncond = model(C, t, condition=None)
    score = (1 + gamma) * s_cond - gamma * s_uncond
    C = reverse_diffusion_step(C, score, t)

return decode_to_cif(C)
```

##### 6. 为什么它比筛选式材料发现更直接

筛选式流程从已知数据库或规则生成候选开始，再用 DFT/MLFF 过滤。其瓶颈是候选空间被“已知材料附近”强烈限制，目标属性也只能在候选集合内优化。MatterGen 反过来从目标约束出发，在连续的晶体结构空间中采样，生成后再用 MatterSim、DFT、结构匹配和 convex hull 评价进行验证。

论文中的 SUN 指标体现了这个逻辑：stable 表示能量接近凸包，unique 表示样本之间不重复，novel 表示不与参考数据库结构匹配。只有三者同时满足，生成结果才可能成为值得进一步计算或实验验证的候选。

##### 7. 局限与使用注意

MatterGen 输出的是候选结构，不是实验成功的保证。高体模量、磁密度或带隙等属性还需要更精确的 DFT、热力学稳定性、动力学稳定性、可合成路径和实验条件验证。官方仓库也提醒，快速评估可用 MatterSim 等 MLFF，但发表级结论仍应使用更严格的 DFT 或实验复核。

#### 🧪 练习题
```yaml
question: "MatterGen 相比普通图像扩散模型最关键的定制点是什么？"
options:
  - "只生成材料名称，不生成结构"
  - "同时对原子类型、周期坐标和晶格向量进行扩散/去噪，并保持晶体几何约束"
  - "把晶体结构渲染成二维图片后做图像生成"
  - "只用强化学习搜索 Materials Project 数据库"
answer: 1
explain: "晶体生成必须处理离散元素、周期坐标和晶格几何，MatterGen 的扩散过程和等变 score network 都是围绕这三个对象设计的。"
```

### AuroraGPT

```yaml
id: auroragpt
num: 28
name: AuroraGPT
full_name: AuroraGPT (AuroraGPT)
year: '2026'
org: Argonne National Lab
parent: —
paper_url: https://www.anl.gov/aurora-gpt
project_url: ''
category: unified_foundation
motivation: 2T参数整合20T+科学Token多模态
```

#### 📝 一句话总结
AuroraGPT 是 Argonne/DOE 围绕 Aurora 超算建设的科学基础模型项目，目标是在公开科学数据、代码和结构化科学数据上训练一系列越来越大的模型，并配套数据、训练、评测、后训练、推理和分发工作流。公开资料显示其已完成 2T tokens 级预训练模型，并把重点放在科学研究助手能力、HPC 规模训练效率和可信评测方法上。

#### 🎯 核心要点
- 项目定位：不是单篇已完整公开的模型论文，而是面向科学发现的基础模型计划，涵盖数据、模型、训练基础设施、评测、安全、推理和分发。
- 训练数据：公开资料强调收集 20T+ 高质量科学文本和结构化数据，并评估把通用 web 文本与科学专用数据结合的收益。
- 模型序列：Argonne 项目页描述其创建和评估一系列参数更多或训练数据更多的 foundation models，用前一代模型的科学与计算表现指导下一代设计。
- 已公开进展：ALCF 案例页称已经训练完成一个 2 trillion tokens 的预训练模型，并把 Llama 3 适配到 Aurora 软件栈后完成大规模训练。
- 工程核心：使用/维护 Megatron-DeepSpeed 训练栈，关注多维并行、批量训练、通信-计算重叠、文件 IO、checkpoint 转换和数据索引加速。
- 评测体系：相关 EAIRA 论文提出面向科学研究助手的多层评测，包括选择题、开放回答、lab-style experiments 和 field-style experiments。
- 来源限制：截至本条目写作所依据的公开页面，AuroraGPT 没有像 GPT-4 technical report 或 Walrus/MatterGen 那样公开完整架构、参数表和训练 loss 细节；下文按公开项目资料和标准自回归 LLM 训练机制做方法级解读。

#### 🔬 深入细节
##### 1. 图示与来源

![Aurora 超算外观](https://www.alcf.anl.gov/sites/default/files/styles/965x543/public/2025-01/CELS_Aurora%20Skin_1600x900.jpg?itok=ypwplSu2)

*图：ALCF 官方案例页中的 Aurora 超算图片。AuroraGPT 公开资料更偏项目与训练系统说明，未发布统一的模型架构总览图，因此这里使用官方项目环境图，并在下文给出流程级示意。*

主要来源包括 Argonne AuroraGPT 项目页 `https://auroragpt.anl.gov/project-overview`、ALCF 案例页 `https://www.alcf.anl.gov/science/case-studies/auroragpt-large-scale-foundation-model-advancing-science`、AuroraGPT 公开演示 `https://samforeman.me/talks/auroragpt/alcf-hpc-workshop-2024/`、训练基础模型演示 `https://samforeman.me/talks/2025/10/15/` 和 EAIRA 评测论文 `https://arxiv.org/abs/2502.20309`。

##### 2. 方法框架：科学 LLM 项目而非单一封闭模型

AuroraGPT 的公开描述更接近“科学基础模型生产线”：

```text
科学/代码/结构化数据
        ↓ 清洗、去重、格式化、tokenization、索引
混合语料采样器 BlendableDataset
        ↓
Megatron-DeepSpeed / Aurora 分布式训练
        ↓
预训练 checkpoint
        ↓ checkpoint 转换、指令微调、对齐、推理服务
        ↓
科学任务评测与研究助手评测
```

项目的关键不只是模型参数量，而是让科学数据进入可扩展训练管线：结构化数据需要映射为叙述式或可学习的序列表示，论文、代码、实验记录和领域数据需要统一到可采样语料，训练系统需要在超算环境中稳定运行数周到数月。

##### 3. 标准自回归训练目标

在没有公开专属 loss 的情况下，AuroraGPT 作为 LLM 项目的基本预训练目标可按自回归语言建模理解。给定 token 序列 \(x_{1:T}\)，模型最大化下一个 token 概率：

$$
p_\theta(x_{1:T}) = \prod_{t=1}^{T} p_\theta(x_t|x_{<t})
$$

训练时最小化交叉熵：

$$
\mathcal{L}_{\text{LM}}
= -\frac{1}{T}\sum_{t=1}^{T}\log p_\theta(x_t|x_{<t})
$$

对于科学模型，难点不在这个公式本身，而在数据分布和上下文结构：数学推导、LaTeX、代码、表格、化学式、材料配方、仿真输出和实验记录的 token 分布都不同。AuroraGPT 团队公开资料强调混合多来源语料，并构建数据管线来按固定分布采样训练 batch。

##### 4. 分布式训练关键计算

超算训练中，每个 worker 看到不同 batch，局部计算 loss 和梯度，再通过 collective communication 聚合。数据并行下的梯度平均可写为：

$$
\nabla_\theta \mathcal{L}
= \frac{1}{N}\sum_{i=1}^{N}\nabla_\theta \mathcal{L}_i
$$

大模型还需要张量并行、流水并行、ZeRO/FSDP 类优化器状态切分和 checkpoint 分片。公开演示中反复强调三类工程目标：训练要高效、稳定、可复现；这要求数据 IO、通信重叠、GPU kernel、文件系统和故障恢复一起优化。

ALCF 案例页给出一个具体瓶颈：2T tokens 数据索引最初需要约 1 小时，后来通过异步分布式实现降到分钟级。这说明 AuroraGPT 的“算法”部分包含大量系统算法：语料混合索引、分布式采样、checkpoint 格式转换、Megatron-DeepSpeed 与 Hugging Face 互操作。

##### 5. 数据处理与训练伪代码

```python
# AuroraGPT-style scientific LLM training pipeline
corpora = [
    load_text_corpus("scientific_papers"),
    load_text_corpus("code"),
    load_structured_science_data_as_text(),
    load_general_web_text(),
]

tokenized = []
for corpus in corpora:
    docs = clean_deduplicate_filter(corpus)
    docs = normalize_scientific_markup(docs)  # LaTeX, units, tables, code blocks
    tokenized.append(tokenize(docs))

blend_index = build_distributed_blendable_index(
    tokenized,
    sampling_weights=fixed_domain_mixture,
    sequence_length=context_length,
)

for step in range(train_steps):
    batch = blend_index.sample(global_batch_size)
    logits = model(batch.input_ids)
    loss = cross_entropy(logits[:, :-1], batch.input_ids[:, 1:])
    loss.backward()

    average_or_shard_gradients_across_ranks()
    optimizer.step()
    scheduler.step()

    if step % checkpoint_interval == 0:
        save_distributed_checkpoint()
        optionally_convert_checkpoint("megatron_deepspeed", "huggingface")
```

##### 6. 评测机制：从基准题到真实科研交互

AuroraGPT 公开项目资料把评测放在核心位置。EAIRA 方法论把科学研究助手评测分为四类：选择题评测 factual recall，开放回答评测推理和问题求解，lab-style experiments 模拟科研流程中的具体任务，field-style experiments 记录真实研究者与模型的交互并分析能力边界。

这和通用 LLM leaderboard 的区别在于：科学助手并不只需要答对单题，还需要能读论文、写代码、调用工具、提出实验方案、解释不确定性，并在复杂任务中避免编造。因而 AuroraGPT 的方法论重点是把“模型训练”与“科学能力诊断”闭环起来。

##### 7. 局限与可解释边界

公开资料没有披露 AuroraGPT 最终 2T 参数模型的完整结构、训练数据精确配比、tokenizer 细节、上下文长度、优化器超参数或最终 checkpoint 发布方式。因此，本文不能把“2T 参数整合 20T+ 科学 token 多模态”解读为已经公开可复现实验的单篇论文结论。更准确地说，AuroraGPT 是一个正在推进的科学 FM 工程计划：已公开的信息足以说明其数据-训练-评测路线，但不足以复现最终模型。

#### 🧪 练习题
```yaml
question: "从公开资料看，AuroraGPT 与单篇传统模型论文最大的区别是什么？"
options:
  - "它只训练图像分类器，不处理文本"
  - "它是围绕科学基础模型的数据、超算训练、评测、后训练和分发构建的项目体系，而非已完整公开所有细节的单一模型论文"
  - "它完全不需要分布式训练"
  - "它只依赖人工规则库，不使用神经网络"
answer: 1
explain: "AuroraGPT 公开资料主要描述项目目标、超算训练栈、数据管线和科学评测方法；完整模型架构与训练细节尚未像常规论文那样充分公开。"
```

### ScienceOne 100

```yaml
id: scienceone100
num: 29
name: ScienceOne 100
full_name: 科学一号 (ScienceOne 100)
year: '2026'
org: 中国科学院
parent: —
paper_url: https://dig.watch/resources/scienceone-100
project_url: ''
category: unified_foundation
motivation: 跨数学物理生物统一模型100+场景
```

#### 📝 一句话总结
ScienceOne 100 提出了以科学基础模型、领域模型和工具智能体共同组成的平台式 AI for Science 系统，解决通用大模型难以直接处理科学多模态数据、长链科研流程和跨学科工具调用的问题。

#### 🎯 核心要点
- **平台而非单模型**：ScienceOne 100 将科学基础模型、学科专用大模型、文献分析、创新评估和工具编排组合成面向完整科研周期的系统
- **异构 MoE 科学基座**：官方页面说明 ScienceOne 采用 heterogeneous mixture-of-experts 架构，面向波形、谱图、场数据等复杂科学模态
- **百场景部署**：DIG Watch 可访问报道指出系统已覆盖 100+ 科研场景，并在 50+ 研究机构中部署
- **三类核心功能**：文献罗盘用于检索、综述和技术路线抽取；创新评估引擎用于发现研究方向；Agent/ToolChain 用于调度科学工具
- **大规模科学知识入口**：S1-Literature 连接约 170M 篇全球科学文献，并支持公式、图表和专业术语解析
- **工具生态**：S1-ToolChain 集成 300+ 科学工具和 30+ 专业模型，覆盖数据处理、模型训练、特征分析和仿真执行
- **多模态科学推理补充**：S1-VL 技术报告给出 ScienceOne 体系下的 Scientific Reasoning 与 Thinking-with-Images，两者支撑高分辨率科学图表、显微图像和地理图像推理
- **来源限制**：输入 `paper_url` 是新闻/资源页；本文结合可访问 DIG Watch 更新页、ScienceOne 官方站、The Innovation Informatics 系统图和 S1-VL arXiv 技术报告进行方法级解读

#### 🔬 深入细节
##### 系统框架与来源说明

![ScienceOne 100 系统框架](https://data.the-innovation.org/innovation-data/informatics/newcreate/TII-2026-0045-1_online.jpg)
*图：The Innovation Informatics 文章 Figure 1，展示 ScienceOne 100 model system 的平台级框架。原始条目的 DIG Watch 资源页不稳定；可访问来源包括 DIG Watch 更新页 `https://dig.watch/updates/china-ai-driven-scientific-research-platform`、官方站 `https://www.scienceone.cn/index-en.html`、系统图文章 `https://www.the-innovation.org/article/doi/10.59717/j.xinn-inform.2026.100050` 和 S1-VL 技术报告 `https://arxiv.org/abs/2604.21409`。*

ScienceOne 100 的关键不是把一个通用聊天模型改名为科学模型，而是把“科学知识表征、科学数据理解、工具调用、研究流程管理”放进同一个操作系统式平台。官方站将其描述为可理解波形、谱图和场数据的科学基础模型，并强调四类能力：多模态科学数据专业理解、科学文献萃取融合、科学知识表征推理、科学工具编排规划。

可以把 ScienceOne 100 看成三层结构。底层是科学基础模型与异构专家路由，负责把文本、公式、图像、谱图、场数据等输入转成可推理表示；中层是学科和任务专家，例如文献、数字细胞、粒子物理、晶体材料、谱图解读；上层是工作流智能体，用于完成“检索文献 - 形成假设 - 调用工具 - 运行仿真 - 解释结果 - 生成报告”的闭环。

##### 平台执行流程伪代码

```python
# ScienceOne 100 的高层工作流伪代码
def scienceone_research_loop(user_goal, scientific_assets):
    task_graph = planner.decompose(user_goal)
    memory = EvidenceStore()

    for task in task_graph:
        modality = detect_modality(task, scientific_assets)
        expert = router.select_expert(
            task=task,
            modality=modality,
            candidates=["literature", "spectrum", "field", "biology", "simulation", "general_llm"],
        )

        if task.requires_external_tool:
            tool = toolchain.match(task, constraints=task.safety_and_reproducibility)
            result = tool.run(inputs=scientific_assets, params=task.params)
        else:
            result = expert.infer(task, context=memory.retrieve(task))

        checked = verifier.cross_check(result, evidence=memory)
        memory.add(task, checked)

    return report_writer.synthesize(memory, citation_required=True)
```

这个伪代码强调两个机制。第一，路由不是单纯按关键词分发，而是根据任务、数据模态和工具需求选择专家模型或科学工具。第二，科研任务天然是多轮闭环，系统需要把中间证据、工具输出和模型判断写回记忆，再由验证器交叉检查，降低科学场景中的幻觉风险。

##### 异构 MoE：为什么科学平台需要专家路由

通用大模型擅长自然语言，但科学研究中的输入经常是非自然语言对象，例如质谱峰、遥感多光谱图像、电磁场、蛋白质序列、微分方程和仿真日志。ScienceOne 官方站明确提到 heterogeneous mixture-of-experts 架构，其直觉是用一个路由器决定“该交给哪个专家处理”，而不是要求单一模型同时掌握所有科学数据类型。

可以将路由写成：

$$
p(e \mid x, q)=\operatorname{softmax}(W_r \phi(x, q))_e
$$

$$
y=\sum_{e \in \mathcal{E}} p(e \mid x, q)\, f_e(x, q)
$$

其中 \(x\) 是科学数据，\(q\) 是用户任务，\(\phi\) 是任务和模态表征，\(f_e\) 是文献、谱图、场、生命科学、仿真等专家。对于高置信任务可以只激活 Top-\(k\) 专家：

$$
y=\sum_{e \in \operatorname{TopK}(p)} \tilde{p}_e f_e(x,q)
$$

这类设计的收益是参数和工具可以按学科扩展，推理时只调用必要专家，且新学科可以通过新增专家或工具协议接入，而不是重训整个平台。

##### 科学工作流中的工具编排

ScienceOne 与普通科学问答系统的差别在于它强调工具执行。官方站显示 S1-ToolChain 集成 300+ 科学工具和 30+ 专业模型，可用于数据处理、模型训练、特征分析等流程。对科研来说，这一步很关键：很多结论不能仅由语言模型生成，而要由数值求解器、分子模拟器、粒子物理分析程序或材料性质预测模型给出可复现实验结果。

工具选择可以建模为带约束优化：

$$
t^\*=\arg\max_{t \in \mathcal{T}}
\left[
s_{\text{match}}(t,q)
-\lambda_c C(t)
-\lambda_r R(t)
+\lambda_v V(t)
\right]
$$

其中 \(s_{\text{match}}\) 表示工具与任务的语义匹配，\(C(t)\) 是计算成本，\(R(t)\) 是失败或不可复现风险，\(V(t)\) 是输出可验证性。这个目标比“调用第一个看起来相关的工具”更适合科研场景，因为研究者需要稳定、可追溯、可复现的执行链。

##### S1-VL 对 ScienceOne 100 的方法补充

ScienceOne 100 的公开系统报道偏平台层，S1-VL arXiv 报告提供了更具体的模型训练机制。S1-VL 支持两种互补范式：Scientific Reasoning 使用结构化思维链处理多步科学问题；Thinking-with-Images 则允许模型在推理中生成并执行图像处理代码，获得裁剪、缩放、增强和标注后的中间图像，再继续多轮推理。

S1-VL 的四阶段训练可以概括为：

$$
\text{SFT}_{\text{sci}}
\rightarrow
\text{SFT}_{\text{TwI}}
\rightarrow
\text{RL}_{\text{sci}}
\rightarrow
\text{RL}_{\text{TwI}}
$$

对应流程是：先用跨数学、物理、化学、天文、地理、生物的科学多模态数据做监督微调；再用 Thinking-with-Images 数据让模型学会何时进行图像操作；之后通过强化学习优化科学推理；最后进一步优化图像操作的调用时机和质量。

```python
# S1-VL Thinking-with-Images 的简化机制
def think_with_images(question, image):
    visual_context = [image]
    trace = []

    while True:
        action = vlm.next_action(question, visual_context, trace)
        if action.type == "final_answer":
            return action.answer
        if action.type == "image_code":
            # 例如 crop / zoom / contrast enhancement / annotation
            new_image = sandbox.execute(action.python_code, visual_context[-1])
            visual_context.append(new_image)
            trace.append((action.reason, new_image))
        else:
            trace.append(action.reason)
```

这种机制适合科学图表、显微图像和遥感图像，因为关键信息往往只出现在局部区域。传统 VLM 一次性把整张图压成视觉 token，容易丢失局部细节；主动图像操作相当于让模型在推理过程中重新采样信息。

##### 与传统科研 AI 工具的区别

传统工具通常是单点能力：文献检索系统只找论文，仿真平台只运行模型，通用大模型只生成文本，领域模型只处理固定数据类型。ScienceOne 100 的创新在于把这些能力组织成一个可路由、可编排、可验证的平台。它不只是“更懂科学的聊天机器人”，而是把模型和工具放进一个任务图中运行。

> 💡 关键：ScienceOne 100 的“100”应理解为覆盖 100+ 科研场景的平台化目标；方法核心是异构专家路由、科学多模态理解、证据交叉检查和工具链编排，而不是单一架构组件。

#### 🧪 练习题
```yaml
question: "ScienceOne 100 相比普通通用大模型的核心技术差异是什么？"
options:
  - "只扩大参数量并直接生成科研报告"
  - "用异构专家路由和工具编排把科学数据理解、文献分析、仿真执行和结果验证组织成平台化流程"
  - "只依赖人工编写规则库回答科学问题"
  - "完全取消领域模型，仅保留一个统一聊天入口"
answer: 1
explain: "ScienceOne 100 的重点是平台化 AI for Science：根据任务和模态路由到专家模型或科学工具，并通过工作流和证据检查支撑完整科研周期。"
```

### Prithvi

```yaml
id: prithvi
num: 30
name: Prithvi
full_name: Prithvi地学基础模型 (Prithvi Geospatial FM)
year: '2026'
org: NASA/IBM
parent: —
paper_url: https://www.nasa.gov/news-release/nasa-ibm-geospatial-ai-foundation-model-deployed-in-orbit/
project_url: ''
category: unified_foundation
motivation: 首个在轨部署地学基础模型ISS实时
```

#### 📝 一句话总结
Prithvi 提出了面向地球观测的开放基础模型族，以 HLS/MERRA-2 等 NASA 数据进行自监督预训练，并通过小型任务解码器适配灾害监测、土地覆盖、作物和气候任务；2026 年压缩版 Prithvi 被部署到 Kanyini 卫星和 ISS IMAGIN-e 载荷，证明地学基础模型可以在轨执行云/洪水检测。

#### 🎯 核心要点
- **模型族定位**：IBM-NASA Prithvi family 包含 Prithvi-EO-1.0、Prithvi-EO-2.0 和 Prithvi-WxC，分别覆盖地球观测和天气气候数据
- **在轨部署**：NASA 2026 年报道显示压缩版 Prithvi 被上传到 Kanyini 卫星和 ISS IMAGIN-e 载荷，用于两类轨道平台上的云检测和洪水检测
- **开放科学路线**：Prithvi 权重、模型卡和微调资源发布在 Hugging Face 与 GitHub，并通过 TerraTorch 支持下游任务适配
- **Prithvi-EO-2.0 数据规模**：使用 NASA Harmonized Landsat and Sentinel-2 数据，4.2M 全球时间序列样本，30 m 分辨率，覆盖 2014-2023 年时段
- **多时相 MAE 预训练**：基于 ViT masked autoencoder，把 2D patch embedding 替换为 3D patch embedding，以联合建模时间、高度、宽度
- **时间/位置元数据嵌入**：将采集年份、年内日、中心纬度和经度编码为 sin/cos embedding，并用可学习权重加入 encoder/decoder token
- **鲁棒缺失元数据训练**：预训练时随机丢弃时间或地理位置元数据，使模型在实际数据缺少 metadata 时仍可工作
- **下游任务广泛**：覆盖洪水、火烧迹地、滑坡、作物分类、土地覆盖、生物量和 GPP 等任务
- **GEO-Bench 评估**：Prithvi-EO-2.0-600M-TL 在 GEO-Bench 上比 Prithvi-EO-1.0 平均提升约 8%，并与六类其他地学基础模型比较

#### 🔬 深入细节
##### 架构总览

![Prithvi-EO-2.0 MAE 架构](https://arxiv.org/html/2412.02732v3/x2.png)
*图：Prithvi-EO-2.0 论文 Figure 3，展示多时相输入经 3D patch embedding、时间/位置 sin-cos embedding、mask/drop、encoder transformer 和 decoder transformer 重建影像的预训练框架。*

主要可访问来源包括 NASA 在轨部署报道 `https://science.nasa.gov/science-research/ai-foundation-model-in-orbit/`、Prithvi-EO-2.0 论文 `https://arxiv.org/abs/2412.02732`、arXiv HTML `https://arxiv.org/html/2412.02732`、GitHub 仓库 `https://github.com/NASA-IMPACT/Prithvi-EO-2.0` 和 Hugging Face 组织页 `https://huggingface.co/ibm-nasa-geospatial`。输入 YAML 中的 NASA news-release URL 已迁移，NASA Science 页面是可访问版本。

##### 预训练流程伪代码

```python
# Prithvi-EO-2.0 的多时相 MAE 预训练伪代码
def prithvi_eo_pretrain(hls_sequence, lat_lon, dates):
    # hls_sequence: [T=4, C=6, H=224, W=224]，来自 HLS Blue/Green/Red/NIR/SWIR1/SWIR2
    cubes = conv3d_patch_embed(hls_sequence, cube_size=(t, h, w))
    pos_3d = sincos_3d_position(time=T, height=H, width=W)

    time_embed = sincos_2d(dates.year, dates.day_of_year)
    loc_embed = sincos_2d(lat_lon.lat, lat_lon.lon)
    if random() < drop_prob:
        time_embed = 0
    if random() < drop_prob:
        loc_embed = 0

    tokens = cubes + pos_3d + w_time * time_embed + w_loc * loc_embed
    visible_tokens, mask = random_mask(tokens)

    encoded = vit_encoder(visible_tokens)
    decoded = vit_decoder(insert_mask_tokens(encoded, mask))
    loss = mse(decoded[mask], normalize_pixels(hls_sequence)[mask])
    return loss

def finetune_for_orbit(prithvi_encoder, task):
    # 轨道上传时尽量复用共享 encoder，只换小型 decoder/head
    encoder = compress_or_quantize(prithvi_encoder)
    decoder = train_small_decoder(task.labels)
    return OnboardModel(encoder, decoder)
```

##### 为什么地球观测需要多时相基础模型

地球观测影像的语义不只由单张图决定。农作物类型、洪水范围、火烧迹地和植被恢复都依赖时间变化；同一块地在不同季节的光谱特征可能完全不同。早期遥感模型往往把每张图当作独立样本，或者用较短、局部的时间序列，难以同时表达空间纹理和长期季节性。

Prithvi-EO-2.0 的输入是四个时间点的 HLS 影像序列。论文构造时间序列时要求相邻时间点至少间隔 1 到 6 个月，从 2014-2023 年 HLS 数据中采样，以捕获季节变化和长期趋势。每个样本来自 \(256 \times 256\) patch，训练时随机裁剪到 \(4 \times 224 \times 224\)，并过滤缺失值和云量较高的样本。

##### 3D patch embedding 与时间/位置编码

标准 ViT-MAE 对二维图像做 patch embedding：

$$
z_i = W_p \operatorname{vec}(x_i) + p_i
$$

Prithvi-EO-2.0 将它扩展到三维时空 cube：

$$
z_{t,h,w}
= \operatorname{Conv3D}(x)_{t,h,w}
+ p^{3D}_{t,h,w}
+ \alpha_t e_{\text{time}}
+ \alpha_l e_{\text{loc}}
$$

其中 \(p^{3D}_{t,h,w}\) 是时间、高度、宽度三个维度的 sin/cos 位置编码，\(e_{\text{time}}\) 来自采集年份和 day-of-year，\(e_{\text{loc}}\) 来自中心纬度和经度，\(\alpha_t,\alpha_l\) 是学习权重。这样，模型既知道 token 在影像序列中的局部位置，也知道这组影像来自地球上的哪里、哪个季节。

这种设计解决了两个遥感特有问题。第一，相同光谱在不同地理区域含义不同，例如高纬积雪、沙漠和城市亮屋顶可能有相近反射特征。第二，相同地物在不同季节变化很大，作物和天然植被尤其依赖 phenology。时间/位置元数据以 bias 形式加入，既提供先验，又不会把模型绑死在必须有 metadata 的输入格式上。

##### MAE 损失函数与下游适配

Prithvi 的核心预训练目标是 masked autoencoder 的重建损失。给定被 mask 的 token 集合 \(\mathcal{M}\)，模型只让 encoder 处理可见 token，再由 decoder 重建全部 token：

$$
\mathcal{L}_{\text{MAE}}
=
\frac{1}{|\mathcal{M}|}
\sum_{i \in \mathcal{M}}
\left\|
\hat{x}_i - x_i
\right\|_2^2
$$

MAE 目标适合遥感基础模型，因为全球标注数据昂贵，但未标注影像丰富。模型在预训练中学习云、植被、水体、土壤、城市纹理和季节变化的通用表示；微调时只需要接入小型分类头或分割解码器，就可以迁移到洪水、水体、作物、土地覆盖等任务。

##### 在轨部署为何重要

NASA 2026 年报道强调，活跃卫星通常无法接收大型软件更新，带宽也不足以频繁上传完整模型。Prithvi 的价值在于共享 encoder 可以长期驻留在轨道计算平台上；当需要新任务时，只上传一个小型 decoder/head，就能复用基础表示完成新的地球观测任务。

可以把在轨适配写成：

$$
\hat{y}=D_{\phi}^{\text{task}}(E_{\theta}^{\text{Prithvi}}(x))
$$

其中 \(E_{\theta}^{\text{Prithvi}}\) 是预训练并压缩后的共享编码器，\(D_{\phi}^{\text{task}}\) 是云检测、洪水检测或火烧迹地检测等任务头。相较“每个任务上传一个完整模型”，这种方式降低了上传体积，也让轨道平台在灾害响应中更快地把影像转成可行动信息。

##### 与传统遥感模型的区别

传统 U-Net、随机森林或任务专用 CNN 通常针对单一传感器、单一地区、单一标签训练。它们在标注充足时有效，但跨地区、跨季节、跨传感器迁移时容易退化。Prithvi 的路线是先用全球未标注数据学习通用地球表征，再通过少量任务数据微调。这类似自然语言中的 foundation model，但它把“上下文”换成了地理位置、时间序列和多光谱反射。

> 💡 关键：Prithvi 的方法贡献不只是在轨运行一次模型，而是证明“地球观测基础编码器 + 轻量任务解码器”的结构可以从地面训练迁移到轨道边缘计算环境。

#### 🧪 练习题
```yaml
question: "Prithvi-EO-2.0 为什么要引入 3D patch embedding 和时间/位置嵌入？"
options:
  - "为了把所有遥感波段压缩成单个灰度通道"
  - "为了同时建模影像序列的空间结构、季节变化和地理位置先验"
  - "为了取消 masked autoencoder 的重建目标"
  - "为了只在美国本土数据上训练模型"
answer: 1
explain: "Prithvi-EO-2.0 面向多时相 HLS 数据，3D patch embedding 建模时间-空间 cube，时间和位置嵌入帮助模型区分季节、地区和地物语义。"
```

### Darwin-7B

```yaml
id: darwin7b
num: 31
name: Darwin-7B
full_name: Darwin-7B (Darwin-7B)
year: '2026'
org: ICLR 2026
parent: —
paper_url: https://fm-science.github.io/
project_url: ''
category: unified_foundation
motivation: 肠道微生物组多组学基础模型
```

#### 📝 一句话总结
Darwin-7B 提出了“稀疏化 genomics + 质量感知 tokenization + Mamba/Transformer 多组学模型”的肠道微生物组基础模型，解决公共测序档案质量异质、原始 reads 计算成本高、宏基因组与代谢组难以联合建模的问题。

#### 🎯 核心要点
- **两阶段数据回收**：先用结构化二进制 mask 稀疏化 metagenomic reads，再用 QA-Token 将 Phred 质量分数纳入词表构造
- **可用数据扩大**：论文称该 pipeline 将公共档案可用于预训练的比例从 5% 提升到 40%，相当于 8 倍数据回收
- **224 个稀疏配置评估**：在 CAMI species-level taxonomic classification 上寻找速度和准确率的 Pareto frontier，覆盖 5.1x 加速到近无损 F1=0.994
- **质量感知词表**：QA-Token 用多目标 reward 和 Gumbel-Softmax relaxation 优化 merge 决策，相比标准 BPE 报告 12% bits-per-base-pair 改善
- **7B 多组学模型**：Darwin-7B 在 8T base pairs metagenomics 与 250K metabolite profiles 上预训练
- **混合主干**：32 层堆栈中 24 层是 Mamba，8 层是局部 Transformer window attention，兼顾 \(O(N)\) 长程建模与局部 motif 分辨率
- **代谢组 HyperGNN**：用 KEGG pathway 反应构造超边，以 3 层 hypergraph neural network 处理 metabolite profile
- **跨模态注意力**：在第 16 层和第 32 层后插入双向 cross-attention，对齐 genomic 与 metabolomic 表示
- **任务覆盖**：病原检测、宏基因组 profiling、代谢通路预测、IBD/T2D 疾病预测、抗生素耐药预测
- **来源限制**：FM4Science 页面是 workshop 首页；Darwin-7B 的可访问论文页面为 OpenReview `https://openreview.net/forum?id=X5Ii21IdDF`，PDF 为 `https://openreview.net/pdf?id=X5Ii21IdDF`

#### 🔬 深入细节
##### 图示与来源说明

OpenReview 条目和 PDF 没有提供独立稳定的架构图片文件 URL；可访问方法来源为 OpenReview 页面 `https://openreview.net/forum?id=X5Ii21IdDF` 与 PDF `https://openreview.net/pdf?id=X5Ii21IdDF`。PDF 的第 4-5 页给出稀疏化、QA-Token、Darwin-7B 数据与架构描述，附录 E.1 给出 32 层 Mamba/Transformer interleaving、HyperGNN 和 cross-attention 细节。下面用文字流程图复现论文方法框架：

![Darwin-7B OpenReview 论文入口](https://openreview.net/images/openreview-logo.png)
*图：OpenReview 论文入口标识；Darwin-7B 公开页面/PDF 未提供独立稳定架构图直链，因此下方用文字流程图复现论文中的数据回收、QA-Token、多组学编码和跨模态对齐流程。*

```text
raw public reads + quality scores + metabolomics
    │
    ├─ sparsification mask p in {0,1}^w
    │      retain base i iff p[i mod w] = 1
    │
    ├─ QA-Token vocabulary learning
    │      reward = quality + information + efficiency + robustness
    │      differentiable merge via Gumbel-Softmax
    │
    ├─ genomic tokens (~2T)        metabolite profiles (250K)
    │          │                         │
    │     Mamba/Transformer         HyperGNN over KEGG hyperedges
    │          └──────── bidirectional cross-attention ────────┘
    │
    └─ task heads: pathogen, profiling, pathway, disease, resistance
```

##### 核心算法伪代码

```python
# Darwin-7B 训练前的数据回收和多组学预训练伪代码
def sparsify_read(read, pattern):
    kept = []
    for i, base in enumerate(read):
        if pattern[i % len(pattern)] == 1:
            kept.append(base)
    return "".join(kept)

def learn_qa_tokenizer(reads, qualities, candidate_merges):
    vocab = initialize_base_vocab()
    for step in range(num_merge_steps):
        rewards = []
        for merge in candidate_merges:
            q = phred_quality_score(merge, qualities)
            info = pointwise_mutual_information(merge, reads)
            eff = compression_gain(merge, reads)
            rob = robustness_under_quality_noise(merge, reads, qualities)
            rewards.append(lambda_q*q + lambda_i*info + lambda_e*eff + lambda_r*rob)

        # Gumbel-Softmax 让离散 merge 选择可微
        merge_weights = gumbel_softmax(rewards, temperature=tau)
        vocab = apply_weighted_merge(vocab, candidate_merges, merge_weights)
    return vocab

def pretrain_darwin(genomic_tokens, metabolite_profiles):
    g = genomic_embedding(genomic_tokens)
    m = hypergnn_metabolites(metabolite_profiles, kegg_hyperedges)

    for layer in range(32):
        if layer in transformer_layers:
            g = local_transformer(g, window=256)
        else:
            g = mamba_block(g)
        if layer in [15, 31]:
            g, m = bidirectional_cross_attention(g, m)

    loss = (
        lm_loss(g, genomic_tokens)
        + masked_metabolite_loss(m, metabolite_profiles)
        + contrastive_alignment_loss(g, m)
        + task_supervised_loss(g, m)
    )
    return loss
```

##### 问题动机：为什么宏基因组不能直接照搬普通 DNA 大模型

宏基因组 reads 与干净参考基因组不同。它们来自多物种混合样本，测序质量不均，错误率随 Phred 分数变化，并且很多公共档案缺少可用于因果建模的干预结构。传统 genomic foundation model 如果直接用标准 BPE 处理 reads，会把频繁出现的测序错误也纳入词表，使模型在预训练时学习到噪声。

Darwin-7B 的第一步是“少读但读得有信息”。稀疏化 pattern \(p \in \{0,1\}^w\) 周期性作用在 read 上：

$$
\operatorname{keep}(i)=\mathbb{1}\left[p_{i \bmod w}=1\right]
$$

例如 \(p=1010\) 表示保留隔位碱基。论文评估了 224 个 pattern，发现均匀分布的 mask 通常优于聚集 mask，因为均匀采样能保留更分散的序列上下文。稀疏化的作用不是随机丢信息，而是在速度和 taxonomic signal 之间寻找 Pareto frontier。

##### QA-Token：把测序质量放进词表学习

标准 BPE 的 merge 决策主要依赖频率。QA-Token 将“高质量碱基更值得合并、低质量噪声不应主导词表”写进 reward。论文给出的 merge reward 可概括为：

$$
R(a,b)
=
\lambda_Q Q(ab)
+\lambda_I \operatorname{PMI}(a,b)
+\lambda_E E(ab)
+\lambda_R \operatorname{Robust}(ab)
$$

其中 \(Q(ab)\) 表示合并 token 的质量分数，\(\operatorname{PMI}\) 衡量两个片段共同出现的信息量，\(E(ab)\) 表示压缩收益，\(\operatorname{Robust}\) 衡量在质量扰动下是否稳定。因为 token merge 是离散选择，QA-Token 用 Gumbel-Softmax relaxation 近似：

$$
\tilde{z}_k =
\frac{\exp((\log \pi_k + g_k)/\tau)}
{\sum_j \exp((\log \pi_j + g_j)/\tau)}
$$

这样可以在外层优化词表 reward、内层训练 proxy model 的 bilevel 设置中反向传播。直觉上，它让 tokenizer 不再只问“哪个片段出现得多”，还要问“这个片段是否由可信测序信号支持”。

##### Darwin-7B 架构：长序列效率与局部 motif 的折中

Darwin-7B 使用 LLaMA-7B 的维度配置作为初始化尺度，但不是普通 LLaMA。附录 E.1 指出其 32 层堆栈采用 3:1 Mamba-to-Transformer interleaving：24 层 Mamba 负责 \(O(N)\) 长程依赖，8 层局部 Transformer 负责 window size 256 的 motif 解析。

一层局部 attention 的复杂度大致为：

$$
O(Nw^2)
$$

其中 \(w=256\) 是局部窗口；Mamba/SSM 路径则近似 \(O(N)\)。这种混合设计适合宏基因组：reads 很长且样本量巨大，需要线性时间建模长距离上下文；同时，启动子、codon pattern、酶相关 motif 等局部结构又需要 attention 的精细分辨率。

##### 代谢组与跨模态对齐

代谢组不是简单向量分类任务。代谢反应通常是多对多关系：多个底物、酶和产物共同构成一条 pathway。Darwin-7B 使用 KEGG pathway annotations 构造 hyperedges，并用 HyperGNN 做消息传递：

$$
h_i^{(l+1)}
=
\sigma
\left(
\sum_{e \ni i}
\alpha_{ie}
\sum_{j \in e} W^{(l)}h_j^{(l)}
\right)
$$

这里 \(e\) 是代谢反应超边，\(\alpha_{ie}\) 是节点 \(i\) 对超边 \(e\) 的注意力权重。随后 genomic representation \(H_g \in \mathbb{R}^{L_g \times d}\) 与 metabolomic representation \(H_m \in \mathbb{R}^{L_m \times d}\) 做双向 cross-attention：

$$
\operatorname{CrossAttn}(H_g,H_m)
=
\operatorname{softmax}
\left(
\frac{H_gW_Q(H_mW_K)^\top}{\sqrt{d_k}}
\right)H_mW_V
$$

这一步让模型学习“哪些基因序列片段与哪些代谢物或 pathway 对齐”，比后验拼接 feature 更适合多组学推理。

##### 训练目标与任务头

论文描述 Darwin-7B 使用四类预训练目标。可简化为：

$$
\mathcal{L}
=
\mathcal{L}_{\text{ALM}}
+\lambda_m \mathcal{L}_{\text{met-mask}}
+\lambda_c \mathcal{L}_{\text{contrast}}
+\lambda_s \mathcal{L}_{\text{sup}}
$$

其中 autoregressive language modeling 学习 genomic token 序列分布；masked metabolite loss 学习代谢组缺失项重建；contrastive alignment 让同一样本的宏基因组和代谢组表示靠近；supervised heads 支持病原检测、profiling、疾病和耐药预测等任务。OpenReview 摘要报告 Darwin-7B 在 pathogen detection 上达到 94.5±0.4 MCC，在 metagenomic profiling 上达到 0.98±0.01 F1，并给出四个多组学任务结果。

##### 与 METAGENE-1 和 Evo2 的区别

METAGENE-1 面向 metagenomic reads，但使用标准 BPE 且不建模测序质量；Evo2 更偏干净组装基因组，难以覆盖真实微生物群落中的混合物种、混合质量 reads。Darwin-7B 的区别在三处：先用稀疏化降低计算负担，再用 QA-Token 控制噪声进入词表，最后用 HyperGNN 与 cross-attention 将代谢组纳入同一个基础模型。

> ⚠️ 注意：Darwin-7B 目前公开来源是 ICLR 2026 workshop OpenReview 投稿/海报论文，部分数据和 MetaOmics-10T pilot 仍属于早期报告；解读应把它视为方法路线和初步实验，而不是已经完全独立复现的成熟基准。

#### 🧪 练习题
```yaml
question: "Darwin-7B 中 QA-Token 相比标准 BPE 的核心区别是什么？"
options:
  - "只按 token 出现频率做 merge，不考虑测序质量"
  - "把 Phred 质量、信息量、压缩收益和鲁棒性共同写入 merge reward，并用 Gumbel-Softmax 优化离散词表选择"
  - "完全丢弃所有低频 DNA 片段，不再训练 tokenizer"
  - "只处理代谢物浓度，不处理宏基因组 reads"
answer: 1
explain: "QA-Token 的关键是质量感知词表学习：高质量、信息量高且鲁棒的片段更可能被合并，避免测序错误主导 vocabulary。"
```
