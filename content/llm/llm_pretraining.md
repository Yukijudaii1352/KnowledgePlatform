---
domain: llm
topic_id: llm_pretraining
topic_name: LLM预训练
page_icon: ⚡
page_title: LLM预训练算法总结
page_subtitle: '{build_date} 版'
page_desc: 系统梳理从Scaling Laws理论奠基、数据工程精炼到分布式训练优化的大语言模型预训练技术演进脉络
hero_pills:
- Scaling Laws · 数据工程 · 训练稳定性 · 分布式训练
count_pill: '{count} 个算法'
categories:
  scaling:
    label: 规模法则
    color: '#22a06b'
  data:
    label: 数据工程
    color: '#5b63d3'
  training:
    label: 训练优化
    color: '#e97f33'
  distributed:
    label: 分布式系统
    color: '#8b5cf6'
---

## 领域综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/llm/llm_pretraining/overview/zhihu__2_万字总结：全面梳理大模型预训练相关技术__0be03b06/article.md

## 最新进展综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/llm/llm_pretraining/latest/zhihu__LLM预训练数据工程的最佳实践__2012c9d7/article.md

## 算法演化关系

```yaml
nodes:
- id: kaplan_scaling
  x: 100
  y: 100
  category: scaling
- id: chinchilla_law
  x: 250
  y: 100
  category: scaling
- id: mup
  x: 260
  y: 150
  category: scaling
- id: data_constrained_scaling
  x: 350
  y: 100
  category: scaling
- id: t2_scaling
  x: 550
  y: 80
  category: scaling
- id: u_mup
  x: 500
  y: 150
  category: scaling
- id: rl_scaling
  x: 550
  y: 120
  category: scaling
- id: c4
  x: 100
  y: 250
  category: data
- id: the_pile
  x: 180
  y: 250
  category: data
- id: minhash_dedup
  x: 240
  y: 220
  category: data
- id: suffix_array_dedup
  x: 240
  y: 280
  category: data
- id: refinedweb
  x: 350
  y: 250
  category: data
- id: dolma
  x: 420
  y: 250
  category: data
- id: doremi
  x: 350
  y: 300
  category: data
- id: fineweb
  x: 420
  y: 220
  category: data
- id: common_corpus
  x: 550
  y: 250
  category: data
- id: essential_web
  x: 550
  y: 220
  category: data
- id: fed_dedup
  x: 550
  y: 280
  category: data
- id: lshbloom
  x: 600
  y: 280
  category: data
- id: data_mixing_agent
  x: 550
  y: 320
  category: data
- id: mixed_precision
  x: 50
  y: 400
  category: training
- id: flash_attention
  x: 240
  y: 400
  category: training
- id: flash_attention_2
  x: 350
  y: 400
  category: training
- id: wesar
  x: 500
  y: 450
  category: training
- id: muon
  x: 480
  y: 400
  category: training
- id: flash_attention_4
  x: 550
  y: 400
  category: training
- id: snip_quartet
  x: 550
  y: 440
  category: training
- id: longrope2
  x: 500
  y: 360
  category: training
- id: gpipe
  x: 80
  y: 550
  category: distributed
- id: megatron_lm
  x: 80
  y: 590
  category: distributed
- id: zero
  x: 100
  y: 570
  category: distributed
- id: fsdp
  x: 350
  y: 570
  category: distributed
- id: distflashattn
  x: 550
  y: 550
  category: distributed
edges:
- from: kaplan_scaling
  to: chinchilla_law
  label: 修正缩放比例
- from: chinchilla_law
  to: data_constrained_scaling
  label: 数据受限
- from: chinchilla_law
  to: t2_scaling
  label: 推理优化
- from: mup
  to: u_mup
  label: 单位缩放
- from: kaplan_scaling
  to: rl_scaling
  label: RL扩展
- from: c4
  to: the_pile
  label: 多样性增强
- from: c4
  to: refinedweb
  label: MDR方法
- from: minhash_dedup
  to: suffix_array_dedup
  label: 子串去重
- from: refinedweb
  to: fineweb
  label: 质量提升
- from: the_pile
  to: dolma
  label: 透明开源
- from: fineweb
  to: essential_web
  label: 分类标签
- from: dolma
  to: common_corpus
  label: 合规化
- from: minhash_dedup
  to: fed_dedup
  label: GPU加速
- from: fed_dedup
  to: lshbloom
  label: 空间优化
- from: doremi
  to: data_mixing_agent
  label: RL动态
- from: flash_attention
  to: flash_attention_2
  label: 并行优化
- from: flash_attention_2
  to: flash_attention_4
  label: 硬件适配
- from: mixed_precision
  to: snip_quartet
  label: FP4训练
- from: zero
  to: fsdp
  label: PyTorch原生
- from: flash_attention_2
  to: distflashattn
  label: 分布式扩展
milestones:
- kaplan_scaling
- chinchilla_law
- flash_attention
```

## 核心算法

### OpenAI Scaling Laws

```yaml
id: kaplan_scaling
num: 1
name: OpenAI Scaling Laws
full_name: OpenAI规模定律 (Scaling Laws for Neural Language Models)
year: '2020'
org: OpenAI
parent: —
paper_url: https://arxiv.org/abs/2001.08361
project_url: ''
category: scaling
motivation: 幂律公式揭示模型性能与N/D/C关系
```

#### 📝 一句话总结
OpenAI Scaling Laws 的核心目标是：幂律公式揭示模型性能与N/D/C关系。

#### 🎯 核心要点
- 核心动机：幂律公式揭示模型性能与N/D/C关系
- 代表机构：OpenAI

#### 🔬 深入细节
幂律公式揭示模型性能与N/D/C关系


### Chinchilla Laws

```yaml
id: chinchilla_law
num: 2
name: Chinchilla Laws
full_name: 计算最优训练法则 (Training Compute-Optimal Large Language Models)
year: '2022.03'
org: DeepMind
parent: kaplan_scaling
paper_url: https://arxiv.org/abs/2203.15556
project_url: ''
category: scaling
motivation: 提出20:1数据参数比的计算最优原则
```

#### 📝 一句话总结
Chinchilla Laws 的核心目标是：提出20:1数据参数比的计算最优原则。

#### 🎯 核心要点
- 核心动机：提出20:1数据参数比的计算最优原则
- 演化来源：继承或改进自 kaplan_scaling
- 代表机构：DeepMind

#### 🔬 深入细节
提出20:1数据参数比的计算最优原则


### μP/μTransfer

```yaml
id: mup
num: 3
name: μP/μTransfer
full_name: 最大更新参数化 (Maximal Update Parameterization)
year: '2022.03'
org: Microsoft Research
parent: —
paper_url: https://arxiv.org/abs/2203.03466
project_url: ''
category: scaling
motivation: 实现超参数跨规模零次迁移
```

#### 📝 一句话总结
μP（Maximal Update Parameterization）通过重新设计神经网络各层参数的初始化方差与学习率随宽度的缩放规则，使得最优超参数在不同模型规模间保持稳定，从而实现 **μTransfer**——在小模型上调优超参数后零次迁移到大模型，无需对大模型进行任何额外调参。

#### 🎯 核心要点
- **abc-参数化框架**：将参数化抽象为三元组 (a=参数乘子缩放, b=初始化方差缩放, c=学习率缩放)，SP 和 μP 都是其特例；论文证明 μP 是唯一允许超参数跨宽度零次迁移的 abc-参数化
- **三类权重差异化缩放**：将网络参数分为输入权重（含偏置）、隐藏权重、输出权重三类，分别制定不同的初始化方差和学习率缩放规则（Table 3）
- **注意力缩放修正**：Transformer 中注意力 logit 使用 \(q^\top k / d\) 而非标准的 \(q^\top k / \sqrt{d}\)，确保训练中注意力分数随宽度稳定
- **μTransfer 流程**：三步法——(1) 用 μP 参数化目标模型，(2) 在小版本模型上调优超参数，(3) 将超参数直接复制到大模型
- **可迁移超参数范围**：学习率、动量、Adam beta、LR schedule、初始化方差、参数乘子等均可迁移；宽度、深度、batch size 等作为迁移维度
- **Coord Check 诊断工具**：通过检查各层激活值随宽度变化的稳定性，验证 μP 实现的正确性
- **大规模验证**：从 13M 参数迁移超参数超越 BERT-large (350M) 发布结果；从 40M 参数迁移超参数超越 GPT-3 6.7B 发布结果，调参成本仅为预训练的 7%

#### 🔬 深入细节
##### 动机：标准参数化的缺陷

在标准参数化（Standard Parameterization, SP）下，不同宽度的模型具有不同的最优学习率——随着模型变宽，最优学习率会发生漂移。这意味着在小模型上调好的超参数无法直接用于大模型，而大模型的超参数搜索代价极其昂贵。更严重的是，SP 下宽模型的训练激活值会在训练过程中发散（blow up），本质原因是各层的有效学习率不平衡。

![μTransfer 核心对比：SP vs μP 下学习率-损失曲线](https://ar5iv.labs.arxiv.org/html/2203.03466/assets/x1.png)
*图 1：不同宽度 Transformer 在 Adam 下的训练损失 vs 学习率。左图（SP）：不同宽度的最优学习率不一致，宽模型不一定优于窄模型；右图（μP）：最优学习率跨宽度稳定，宽模型始终更优。*

![μTransfer 流程示意](https://ar5iv.labs.arxiv.org/html/2203.03466/assets/x2.png)
*图 2：μTransfer 流程——在小模型上进行超参数搜索，找到最优超参数后直接迁移到大模型。*

##### μP 参数化规则

μP 的核心思想是：确保每一层在训练过程中的**更新幅度**（对激活值的影响）与宽度无关。具体地，对于一个宽度为 \(n\) 的网络，μP 将参数分为三类并分别制定缩放规则：

**Table 3 核心规则（Adam 优化器）：**

|  | 输入权重 & 偏置 | 输出权重 | 隐藏权重 |
|---|---|---|---|
| **初始化方差** | \(1/\text{fan\_in}\) | \(1/\text{fan\_in}^2\)（SP: \(1/\text{fan\_in}\)） | \(1/\text{fan\_in}\) |
| **Adam 学习率** | \(1\) | \(1/\text{fan\_in}\)（SP: \(1\)） | \(1/\text{fan\_in}\)（SP: \(1\)） |

> 💡 **关键直觉**：在 SP 下，隐藏层和输出层的学习率相对于宽度过大，导致宽模型训练时激活值爆炸。μP 通过对输出权重和隐藏权重的学习率乘以 \(1/\text{fan\_in}\) 来补偿，确保参数更新对激活值的影响与宽度无关。

对于一个简单的两隐藏层 MLP（宽度 \(n\)），μP 的基本形式为：

$$W^1 \sim \mathcal{N}(0, 1/d_{in}), \quad W^2 \sim \mathcal{N}(0, 1/n), \quad W^3 \sim \mathcal{N}(0, 1/n^2)$$

SGD 学习率分别为：

$$\eta_{W^1} = \eta_{b^1} = \eta_{b^2} = \eta \cdot n, \quad \eta_{W^2} = \eta, \quad \eta_{W^3} = \eta \cdot n^{-1}$$

##### Transformer 特殊处理：注意力缩放

标准 Transformer 中注意力分数计算为 \(q^\top k / \sqrt{d}\)，其中 \(d\) 是 head 维度。这一缩放基于初始化时 \(q\) 和 \(k\) 不相关的假设（中心极限定理）。然而在训练过程中，\(q\) 和 \(k\) 会变得相关，此时 \(q^\top k\) 实际上按 \(d\)（而非 \(\sqrt{d}\)）的量级增长（大数定律）。因此 μP 要求：

$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^\top}{d}\right)V$$

> ⚠️ **注意**：这里使用 \(1/d\) 而非 \(1/\sqrt{d}\)，这是 μP 在 Transformer 上的关键修改，确保注意力 logit 在训练过程中不随宽度发散。

##### μTransfer 算法

```python
# Algorithm 1: μTransfer — 通过小模型调优大模型超参数
# 输入：目标大模型架构 M_target

# Step 1: 用 μP 参数化目标模型
model_target = apply_muP(M_target)  # 修改初始化方差和学习率缩放

# Step 2: 构建小版本模型并调优
model_small = shrink(M_target, width=small_width)  # 缩小宽度（和/或深度）
model_small = apply_muP(model_small)
best_hps = hyperparameter_search(model_small)  # 在小模型上搜索最优 HP
# 可调参数：学习率、LR schedule、初始化方差、正则化等

# Step 3: 零次迁移
model_target.set_hyperparameters(best_hps)  # 直接复制，无需修改
train(model_target)  # 以迁移的超参数训练大模型
```

##### abc-参数化理论框架

论文将参数化形式化为 **abc-参数化**：对于每个参数张量，定义三个缩放指数：
- **a**（参数乘子）：前向传播中参数的缩放因子
- **b**（初始化）：初始化标准差随宽度的缩放
- **c**（学习率）：学习率随宽度的缩放

SP 和 μP 都是 abc-参数化的特例。论文的核心理论结果是：**μP 是唯一允许超参数零次迁移的 abc-参数化**。直觉上，只有当每层的"特征学习"强度（即参数更新对激活值的影响）与宽度无关时，最优超参数才能跨宽度保持稳定。SP 下隐藏层实际上退化为"核regime"（kernel regime），即特征几乎不更新，而 μP 确保了"最大化"的特征学习。

> 💡 **核心洞察**：μP 不仅仅是让最优学习率可迁移——它还确保了宽模型能充分进行特征学习（而非退化为核方法），因此 μP 模型在最优超参数下通常**优于** SP 模型即使后者也经过了学习率调优。

##### Coord Check：实现正确性验证

论文提出了 **Coord Check**（坐标检查）作为验证 μP 实现正确性的诊断工具。其原理是：在 μP 下，各层激活值的坐标均值应在训练初期保持与宽度无关的稳定性。具体做法是：

1. 用不同宽度（如 64, 128, 256, ...）初始化模型
2. 训练若干步，记录每层激活值的坐标均值
3. 如果各宽度的曲线重合，说明 μP 实现正确；如果发散，说明存在缩放错误

##### 与标准参数化的关键区别

| 特性 | 标准参数化 (SP) | μP |
|---|---|---|
| 最优 LR 随宽度 | 漂移 | 稳定 |
| 宽模型特征学习 | 退化（核 regime） | 最大化 |
| 输出层初始化 | \(1/\text{fan\_in}\) | \(1/\text{fan\_in}^2\) |
| 隐藏层 Adam LR | 固定 | \(\propto 1/\text{fan\_in}\) |
| 注意力缩放 | \(1/\sqrt{d}\) | \(1/d\) |
| 超参数迁移 | 不可靠 | 零次迁移 |

#### 🧪 练习题
```yaml
question: "在 μP 中，Transformer 的注意力 logit 缩放因子应使用什么？"
options:
  - "1/√d，与标准 Transformer 相同"
  - "1/d，因为训练中 query 和 key 相关导致内积按 d 量级增长"
  - "1/d²，为了进一步抑制注意力分数的方差"
  - "不需要缩放，μP 的学习率调整已经补偿了这一点"
answer: 1
explain: "训练过程中 q 和 k 变得相关，q⊤k 按 d（而非 √d）量级增长（大数定律而非中心极限定理），因此需要除以 d 而非 √d 来保持注意力 logit 的稳定性。"
```

### 数据受限规模定律

```yaml
id: data_constrained_scaling
num: 4
name: 数据受限规模定律
full_name: 数据受限规模定律 (Scaling Data-Constrained Language Models)
year: '2023.05'
org: HuggingFace
parent: chinchilla_law
paper_url: https://arxiv.org/abs/2305.16264
project_url: ''
category: scaling
motivation: 揭示数据重复训练的衰减幂律
```

#### 📝 一句话总结
数据受限规模定律 的核心目标是：揭示数据重复训练的衰减幂律。

#### 🎯 核心要点
- 核心动机：揭示数据重复训练的衰减幂律
- 演化来源：继承或改进自 chinchilla_law
- 代表机构：HuggingFace

#### 🔬 深入细节
揭示数据重复训练的衰减幂律


### T²缩放定律

```yaml
id: t2_scaling
num: 5
name: T²缩放定律
full_name: T²缩放定律 (Train-to-Test Scaling Laws)
year: '2026'
org: 多机构
parent: chinchilla_law
paper_url: https://www.machinelearningplus.com/llm/llm-scaling-laws/
project_url: ''
category: scaling
motivation: 推理最优的过度训练策略
```

#### 📝 一句话总结
T²缩放定律 的核心目标是：推理最优的过度训练策略。

#### 🎯 核心要点
- 核心动机：推理最优的过度训练策略
- 演化来源：继承或改进自 chinchilla_law
- 代表机构：多机构

#### 🔬 深入细节
推理最优的过度训练策略


### u-μP

```yaml
id: u_mup
num: 6
name: u-μP
full_name: 单位缩放μP (Unit-Scaled Maximal Update Parametrization)
year: '2025.11'
org: OPT-ML
parent: mup
paper_url: https://opt-ml.org/papers/2024/paper_26.pdf
project_url: ''
category: scaling
motivation: 单位缩放支持FP8稳定训练
```

#### 📝 一句话总结
u-μP 将 Unit Scaling 技术融入 μP（Maximal Update Parametrization）框架，通过 abc-对称性消除初始化缩放超参、移除 base-shape 依赖、重新设计 α 缩放因子体系，使得超参数搜索可在极小代理模型上以近乎独立的一维扫描高效完成，并原生支持 FP8 低精度训练，在 7B 规模 LLM 上验证了从小模型到大模型的超参迁移有效性。

#### 🎯 核心要点
- **abc-参数化统一框架**：将权重矩阵的前向缩放 \(a_W\)、初始化缩放 \(b_W\)、学习率缩放 \(c_W\) 纳入统一的 abc-参数化体系，揭示三者之间存在 abc-对称性（可在保持训练动态不变的前提下重新分配缩放）
- **消除 \(\sigma_W\) 超参**：利用 abc-对称性将初始化标准差固定为 1（unit init），从而减少一个需要调优的超参维度
- **移除 base-shape 依赖**：标准 μP 需要指定一个"基础模型宽度"来定义缩放基准，u-μP 通过将缩放因子直接嵌入前向传播（Unit Scaling 风格）完全消除此依赖
- **重新定义 α 缩放因子**：将 α 与操作（而非权重）关联，定义 6 个独立的 α 超参：\(\alpha_{\text{ffn-act}}\)、\(\alpha_{\text{attn-softmax}}\)、\(\alpha_{\text{out}}\)、\(\alpha_{\text{res}}\)、\(\alpha_{\text{res-attn-ratio}}\)、\(\alpha_{\text{loss-softmax}}\)
- **新的 Embedding 学习率规则**：提出 \(c_{\text{emb}} = 1/\sqrt{d_{\text{model}}}\) 的 embedding 层学习率缩放，修正了标准 μP 中 embedding 学习率不随宽度缩放的问题
- **独立超参搜索策略**：证明 u-μP 下超参近乎独立，可先扫描学习率（9 次运行），再对其他 α 参数进行独立一维扫描，总搜索成本极低
- **原生 FP8 支持**：约 70% 矩阵乘法可直接转为 FP8，仅需保留少数关键张量（注意力 dense 投影、最终 FFN 层、decoder head）为高精度
- **大规模验证**：在 1B/3B/7B 参数的 Llama 风格模型上（SlimPajama 300B tokens）验证了超参迁移和 FP8 训练的有效性

#### 🔬 深入细节
##### 核心框架示意

![u-μP 主要实验结果](https://ar5iv.labs.arxiv.org/html/2407.17465v3/assets/x1.png)
*图 1：u-μP 的三大核心优势——(a) 高效超参搜索：仅需 9 次 LR 扫描即可接近完整网格搜索效果；(b) 超参从小模型到大模型的可靠迁移；(c) FP8 低精度训练的原生支持*

##### abc-参数化与对称性

u-μP 的理论基础是 **abc-参数化**。对于一个权重矩阵 \(W\)，其在前向传播中的实际作用可以表示为：

$$y = a_W \cdot (x \cdot W)$$

其中 \(W\) 的初始化为 \(W_{ij} \sim \mathcal{N}(0, b_W^2)\)，学习率为 \(\eta \cdot c_W\)。这三个缩放因子 \((a_W, b_W, c_W)\) 完全决定了该层的训练动态。

> 💡 **关键洞察——abc-对称性**：对于任意正实数 \(\lambda\)，变换 \(a_W \to \lambda \cdot a_W\)，\(b_W \to b_W / \lambda\)，\(c_W \to c_W / \lambda\) 不改变训练动态。这意味着我们可以自由地在三个缩放因子之间"搬运"尺度。

利用这一对称性，u-μP 做出了一个关键选择：**固定 \(b_W = 1\)**（即所有权重以标准正态分布初始化）。这不仅消除了初始化标准差这个超参，还使得权重天然处于 FP8 的有效表示范围内。

##### u-μP 缩放规则

基于 abc-对称性和 Unit Scaling 原则，u-μP 为 Transformer 的不同层定义了如下缩放规则：

```
┌─────────────────────────────────────────────────────────────┐
│                    u-μP 缩放规则 (Table 2)                    │
├──────────┬──────────────┬────────┬──────────────────────────┤
│  层类型   │  前向缩放 aW  │ 初始化 bW │  学习率缩放 cW            │
├──────────┼──────────────┼────────┼──────────────────────────┤
│ Hidden   │ 1/√fan_in    │   1    │  η / √fan_in             │
│ Input    │ 1            │   1    │  η / √fan_out  (新规则!)  │
│ Output   │ 1/fan_in     │   1    │  η / √depth              │
├──────────┴──────────────┴────────┴──────────────────────────┤
│ 残差连接缩放：1/√depth                                       │
└─────────────────────────────────────────────────────────────┘
```

对应的伪代码实现：

```python
# u-μP Transformer 前向传播伪代码
def u_mup_transformer(x, layers, params):
    """
    x: input token ids [batch, seq_len]
    layers: list of transformer blocks
    params: {W_emb, W_head, W_q, W_k, W_v, W_o, W_up, W_gate, W_down}
    """
    depth = len(layers)
    d_model = params.W_emb.shape[1]

    # === Input Embedding (Input 层规则) ===
    # aW=1, bW=1, cW=η/√fan_out=η/√d_model
    h = x @ params.W_emb  # W_emb ~ N(0,1), LR = η/√d_model

    for l in range(depth):
        residual = h

        # === RMSNorm (非参数化版本，对μP迁移至关重要) ===
        h_norm = rms_norm(h)  # 无可学习的 γ 参数

        # === Attention (Hidden 层规则) ===
        # aW=1/√d_model, bW=1, cW=η/√d_model
        Q = (1/sqrt(d_model)) * (h_norm @ params.W_q[l])
        K = (1/sqrt(d_model)) * (h_norm @ params.W_k[l])
        V = (1/sqrt(d_model)) * (h_norm @ params.W_v[l])

        # Scaled dot-product attention
        # α_attn_softmax 控制 softmax 温度
        attn_logits = Q @ K.T  # 已经被 1/√d 缩放过
        attn_logits = attn_logits * alpha_attn_softmax
        attn_weights = softmax(attn_logits)
        attn_out = attn_weights @ V

        # Output projection (Hidden 层规则)
        attn_out = (1/sqrt(d_model)) * (attn_out @ params.W_o[l])

        # === 残差连接 ===
        # 缩放因子 1/√depth，α_res 和 α_res_attn_ratio 控制比例
        h = residual + (1/sqrt(depth)) * alpha_res * attn_out

        # === FFN (SwiGLU, Hidden 层规则) ===
        residual = h
        h_norm = rms_norm(h)

        gate = (1/sqrt(d_model)) * (h_norm @ params.W_gate[l])
        up   = (1/sqrt(d_model)) * (h_norm @ params.W_up[l])
        # α_ffn_act 控制激活函数缩放
        ffn_out = silu(gate * alpha_ffn_act) * up
        ffn_out = (1/sqrt(d_ffn)) * (ffn_out @ params.W_down[l])

        h = residual + (1/sqrt(depth)) * alpha_res * ffn_out

    # === Output Head (Output 层规则) ===
    # aW=1/fan_in=1/d_model, bW=1, cW=η/√depth
    h_norm = rms_norm(h)
    logits = (1/d_model) * (h_norm @ params.W_head)
    logits = logits * alpha_out

    # α_loss_softmax 控制 loss softmax 温度
    loss = cross_entropy(logits * alpha_loss_softmax, targets)
    return loss
```

##### 动机与背景：μP 的实际困境

μP（Maximal Update Parametrization）由 Yang et al. (2022) 提出，其核心承诺是：**在小模型上搜索到的最优超参数可以直接迁移到大模型**。然而在实际应用中，μP 面临四个严重问题：

**问题 1：Llama 风格模型的迁移失败。** 标准 μP 假设使用 LayerNorm，但现代 LLM（如 Llama）使用 RMSNorm 且带有可学习的缩放参数 \(\gamma\)。论文发现，**参数化的 norm 层会破坏 μP 的超参迁移性**。解决方案是使用非参数化的 RMSNorm（去掉 \(\gamma\)），并配合独立的 weight decay 设置。

**问题 2：超参搜索空间不清晰。** μP 引入了多个 α 缩放因子，但未明确哪些需要调优、哪些可以固定，且超参之间存在复杂的相互依赖关系。

**问题 3：base-shape 的困扰。** μP 需要指定一个"基础模型"的形状作为缩放参考点，这增加了使用复杂度且引入了额外的隐式超参。

**问题 4：FP8 兼容性差。** 标准 μP 的初始化标准差 \(\sigma_W\) 随宽度缩放（如 \(1/\sqrt{d}\)），在大模型中会变得极小，超出 FP8 的有效表示范围。

##### 核心机制详解

**1. Unit Init 与 FP8 兼容性**

通过 abc-对称性将 \(b_W\) 固定为 1，所有权重初始化为标准正态分布。这意味着权重值集中在 \([-3, 3]\) 范围内，完美适配 FP8 E4M3 格式（范围 \([-448, 448]\)）。相比之下，标准 μP 中 7B 模型的 hidden 层初始化标准差约为 \(1/\sqrt{4096} \approx 0.0156\)，大量权重值会落入 FP8 的低精度区域。

**2. 新的 Embedding 学习率规则**

标准 μP 中 embedding 层的学习率缩放为 \(c_{\text{emb}} = 1\)（不随宽度变化），这导致 embedding 更新幅度随宽度增大而增大。u-μP 通过分析发现，正确的缩放应为：

$$c_{\text{emb}} = \frac{1}{\sqrt{d_{\text{model}}}}$$

这确保了 embedding 层的更新幅度在不同宽度下保持一致。论文通过实验验证，这一修正显著改善了学习率从小模型到大模型的迁移效果。

![Embedding 学习率规则对比](https://ar5iv.labs.arxiv.org/html/2407.17465v3/assets/x3.png)
*图 3：不同 embedding 学习率规则下的 LR 迁移对比。u-μP 的新规则（右）相比标准 μP（左）实现了更一致的最优 LR 迁移*

**3. α 超参的重新设计**

u-μP 将 α 缩放因子从"与权重关联"改为"与操作关联"，定义了 6 个语义清晰的 α 参数：

| α 参数 | 作用位置 | 物理含义 |
|--------|---------|---------|
| \(\alpha_{\text{ffn-act}}\) | FFN 激活函数前 | 控制 SwiGLU 激活的输入幅度 |
| \(\alpha_{\text{attn-softmax}}\) | 注意力 softmax 前 | 控制注意力分布的锐度（温度） |
| \(\alpha_{\text{out}}\) | 输出 logits | 控制 logits 的整体幅度 |
| \(\alpha_{\text{res}}\) | 残差连接 | 控制残差分支的相对贡献 |
| \(\alpha_{\text{res-attn-ratio}}\) | attention vs FFN 残差 | 控制 attention 和 FFN 残差的相对比例 |
| \(\alpha_{\text{loss-softmax}}\) | loss 计算的 softmax | 控制交叉熵 loss 的 softmax 温度 |

> 💡 **关键发现——超参独立性**：在 u-μP 框架下，这些 α 参数与学习率之间近乎独立。这意味着可以先固定默认 α 值扫描最优 LR，然后独立地对每个 α 进行一维扫描，而不需要昂贵的联合网格搜索。

**4. 独立超参搜索流程**

论文提出了一个高效的两阶段搜索策略：

- **阶段 1**：在小代理模型上，固定所有 α 为默认值，仅扫描学习率 η（约 9 个值）
- **阶段 2**：固定最优 η，对每个 α 参数独立进行一维扫描（每个约 5 个值）

由于各 α 参数独立，阶段 2 的所有扫描可以**并行执行**。总搜索成本仅为 \(9 + 6 \times 5 = 39\) 次小模型训练，远低于联合网格搜索的 \(9 \times 5^6 = 140625\) 次。

论文通过实验量化了超参独立性：μP 的超参迁移误差（transfer error）约为 0.03，而 u-μP 仅为 0.005，降低了 6 倍。

![超参迁移误差对比](https://ar5iv.labs.arxiv.org/html/2407.17465v3/assets/x4.png)
*图 4：μP vs u-μP 的超参迁移误差。u-μP 在各超参维度上的迁移误差显著更低*

**5. FP8 训练策略**

u-μP 的 unit init 天然适配 FP8，但并非所有张量都适合低精度。论文通过逐层分析 per-tensor RMS，识别出三类需要保持高精度的关键张量：

1. **注意力 dense 投影**（\(W_o\) 的输出）：因为注意力权重经 softmax 后分布极不均匀
2. **最终 FFN 层**（最后一个 transformer block 的 FFN）：对输出影响最大
3. **Decoder head**（\(W_{\text{head}}\)）：直接影响 logits 精度

保留这些张量为 BF16/FP16 后，约 70% 的矩阵乘法仍可在 FP8 下执行，实现了精度与效率的良好平衡。

##### 与标准 μP 的关键区别

| 特性 | 标准 μP | u-μP |
|------|---------|------|
| 初始化 | \(\sigma_W\) 随宽度缩放 | 固定 \(b_W = 1\)（unit init） |
| Base shape | 需要指定基础模型宽度 | 完全不需要 |
| Embedding LR | \(c_{\text{emb}} = 1\) | \(c_{\text{emb}} = 1/\sqrt{d_{\text{model}}}\) |
| α 定义 | 与权重关联 | 与操作关联（6 个独立 α） |
| HP 搜索 | 联合网格搜索 | 先 LR 后独立 α 扫描 |
| Norm 层 | 支持参数化 LayerNorm | 要求非参数化 RMSNorm |
| FP8 支持 | 困难（小 \(\sigma_W\)） | 原生支持（unit init） |
| Weight decay | 与 LR 耦合 | 独立设置 |

##### 大规模实验验证

论文在 SlimPajama 数据集（300B tokens）上训练了 1B、3B、7B 参数的 Llama 风格模型：

- **HP 迁移有效性**：从 width=2048 的代理模型搜索到的超参，直接应用于 7B 模型（width=4096），性能与在 7B 上直接搜索的结果相当
- **FP8 训练**：u-μP FP8 模型在 7B 规模上的 benchmark 性能与标准参数化 BF16 模型相当，验证 loss 差距极小
- **LR 迁移跨维度泛化**：最优 LR 不仅跨宽度迁移，还跨训练步数、batch size、深度等维度迁移

> ⚠️ **注意**：u-μP 要求使用非参数化的 RMSNorm（去掉可学习的 \(\gamma\)），以及独立于学习率的 weight decay 设置。这两个条件是超参迁移成功的必要前提。

#### 🧪 练习题
```yaml
question: "u-μP 通过什么机制将所有权重的初始化标准差固定为 1？"
options:
  - "通过引入额外的归一化层来约束权重分布"
  - "利用 abc-对称性将初始化缩放转移到前向传播的缩放因子中"
  - "在训练过程中动态调整权重的标准差"
  - "使用特殊的正交初始化方法替代高斯初始化"
answer: 1
explain: "abc-对称性表明 (aW, bW, cW) 可以在保持训练动态不变的前提下重新分配缩放。u-μP 利用这一性质，将 bW 固定为 1，同时相应调整 aW（前向缩放）和 cW（学习率缩放），从而实现 unit init 而不改变模型行为。"
```

### RL Scaling Laws

```yaml
id: rl_scaling
num: 7
name: RL Scaling Laws
full_name: 强化学习规模定律 (RL Scaling Laws)
year: '2026'
org: 多机构
parent: kaplan_scaling
paper_url: https://www.machinelearningplus.com/llm/llm-scaling-laws/
project_url: ''
category: scaling
motivation: 强化学习阶段能力-计算量预测
```

#### 📝 一句话总结
RL Scaling Laws 的核心目标是：强化学习阶段能力-计算量预测。

#### 🎯 核心要点
- 核心动机：强化学习阶段能力-计算量预测
- 演化来源：继承或改进自 kaplan_scaling
- 代表机构：多机构

#### 🔬 深入细节
强化学习阶段能力-计算量预测


### C4

```yaml
id: c4
num: 8
name: C4
full_name: C4数据集 (Colossal Clean Crawled Corpus)
year: '2020'
org: Google
parent: —
paper_url: https://arxiv.org/abs/1910.10683
project_url: ''
category: data
motivation: T5基石数据集启发式规则清洗
```

#### 📝 一句话总结
C4 的核心目标是：T5基石数据集启发式规则清洗。

#### 🎯 核心要点
- 核心动机：T5基石数据集启发式规则清洗
- 代表机构：Google

#### 🔬 深入细节
T5基石数据集启发式规则清洗


### The Pile

```yaml
id: the_pile
num: 9
name: The Pile
full_name: 'The Pile数据集 (The Pile: An 800GB Dataset)'
year: '2021'
org: EleutherAI
parent: c4
paper_url: https://arxiv.org/abs/2101.00027
project_url: ''
category: data
motivation: 825GB多源数据集强调多样性
```

#### 📝 一句话总结
The Pile 的核心目标是：825GB多源数据集强调多样性。

#### 🎯 核心要点
- 核心动机：825GB多源数据集强调多样性
- 演化来源：继承或改进自 c4
- 代表机构：EleutherAI

#### 🔬 深入细节
825GB多源数据集强调多样性


### MinHash LSH

```yaml
id: minhash_dedup
num: 10
name: MinHash LSH
full_name: MinHash局部敏感哈希去重 (MinHash LSH Deduplication)
year: '2022'
org: 学术界
parent: —
paper_url: https://aclanthology.org/2022.acl-long.577/
project_url: ''
category: data
motivation: 局部敏感哈希实现文档级去重
```

#### 📝 一句话总结
MinHash LSH 的核心目标是：局部敏感哈希实现文档级去重。

#### 🎯 核心要点
- 核心动机：局部敏感哈希实现文档级去重
- 代表机构：学术界

#### 🔬 深入细节
局部敏感哈希实现文档级去重


### Suffix Array去重

```yaml
id: suffix_array_dedup
num: 11
name: Suffix Array去重
full_name: 后缀数组去重 (Suffix Array Deduplication)
year: '2022'
org: Google
parent: minhash_dedup
paper_url: https://aclanthology.org/2022.acl-long.577/
project_url: ''
category: data
motivation: 后缀数组子串去重防重复生成
```

#### 📝 一句话总结
Suffix Array去重 的核心目标是：后缀数组子串去重防重复生成。

#### 🎯 核心要点
- 核心动机：后缀数组子串去重防重复生成
- 演化来源：继承或改进自 minhash_dedup
- 代表机构：Google

#### 🔬 深入细节
后缀数组子串去重防重复生成


### RefinedWeb

```yaml
id: refinedweb
num: 12
name: RefinedWeb
full_name: RefinedWeb数据集 (RefinedWeb Dataset)
year: '2023'
org: TII
parent: c4
paper_url: https://arxiv.org/abs/2306.01116
project_url: ''
category: data
motivation: 5T纯网页数据MDR方法论
```

#### 📝 一句话总结
RefinedWeb 的核心目标是：5T纯网页数据MDR方法论。

#### 🎯 核心要点
- 核心动机：5T纯网页数据MDR方法论
- 演化来源：继承或改进自 c4
- 代表机构：TII

#### 🔬 深入细节
5T纯网页数据MDR方法论


### Dolma

```yaml
id: dolma
num: 13
name: Dolma
full_name: 'Dolma数据集 (Dolma: An Open Corpus)'
year: '2024'
org: AI2
parent: the_pile
paper_url: https://aclanthology.org/2024.acl-long.840/
project_url: ''
category: data
motivation: 3T全透明开源支持OLMo研究
```

#### 📝 一句话总结
Dolma 构建了一个包含 3 万亿 token 的英文预训练语料库，融合 Web、代码、学术论文、书籍、社交媒体和百科等 7 类数据源，并开源了完整的数据处理工具链（语言过滤、质量过滤、内容过滤、去重），通过系统性消融实验验证了各处理步骤的有效性，为开放语言模型 OLMo 的训练提供了可复现的数据基础。

#### 🎯 核心要点
- **7 大数据源、3T tokens**：Common Crawl（2281B）、The Stack（411B）、C4（198B）、Reddit（89B）、PeS2o（70B）、Project Gutenberg（6B）、Wikipedia+Wikibooks（4.3B）
- **四阶段处理 Pipeline**：语言过滤（fastText）→ 质量过滤（Gopher+C4 启发式规则）→ 内容过滤（Jigsaw 毒性分类器 + PII 正则）→ 去重（URL/文档/段落级 Bloom filter）
- **Web 数据处理**：基于 CCNet 处理 25 个 Common Crawl 快照（2020-05 至 2023-06），过滤掉 84.2% 的原始内容
- **质量过滤策略**：拒绝 CCNet 的模型打分，采用 Gopher All + C4 NoPunc 启发式规则组合，消融实验证明其优于单独使用任一规则集
- **毒性过滤**：使用 Jigsaw 毒性分类器对 hate/NSFW 内容进行阈值过滤，提供高/低两档阈值选择
- **去重机制**：URL 精确去重 + 基于 Bloom filter 的段落级去重，Web 数据去重率达 61.7%
- **基准去污染**：段落匹配方式移除与 Paloma 评测集重叠的文档，实验证明不会降低模型性能
- **混合策略实验**：代码数据（5%~15%）显著提升推理任务表现；多源混合比例通过 1B 模型消融实验确定
- **完全开源**：数据集（HuggingFace）+ 数据处理工具链（GitHub）+ 处理文档全部公开

#### 🔬 深入细节
![Dolma 数据处理 Pipeline 总览](https://ar5iv.labs.arxiv.org/html/2402.00159/assets/x1.png)
*图：Dolma 数据处理 Pipeline 总览——每个数据源经过语言过滤、质量过滤、内容过滤和去重四个阶段*

```python
# Dolma Web 数据处理 Pipeline 伪代码
def dolma_web_pipeline(common_crawl_snapshots):
    """处理 25 个 Common Crawl 快照 (2020-05 ~ 2023-06)"""
    documents = []
    for snapshot in common_crawl_snapshots:
        # Step 1: 语言过滤 (CCNet + fastText)
        docs = ccnet_extract(snapshot)
        docs = [d for d in docs if fasttext_en_score(d) >= 0.5]  # 移除 61.7%

        # Step 2: 质量过滤 (Gopher All + C4 NoPunc)
        docs = gopher_filter(docs)       # 移除 15.23% UTF-8 字符
        docs = c4_nopunc_filter(docs)     # 移除无标点段落, 22.73% 字符
        docs = remove_repeated_ngrams(docs, max_len=100)  # 移除重复 n-gram

        # Step 3: 内容过滤
        docs = jigsaw_toxicity_filter(docs, hate_threshold, nsfw_threshold)
        docs = pii_mask_or_remove(docs, regex_patterns=['email', 'ip', 'phone'])

        # Step 4: 去重
        docs = url_dedup(docs)                        # URL 精确去重
        docs = bloom_filter_paragraph_dedup(docs)      # 段落级 Bloom filter
        docs = bloom_filter_document_dedup(docs)       # 文档级去重

        documents.extend(docs)

    # Step 5: 基准去污染
    documents = decontaminate(documents, benchmark='paloma',
                               method='paragraph_match', min_tokens=13)
    return documents  # 175.1 TB → 27.7 TB (CCNet) → 最终 ~9 TB
```

**动机与背景：为什么需要 Dolma？**

当前最强大的语言模型（如 GPT-4、PaLM）几乎不公开其训练数据的任何信息，即使是开源模型（如 LLaMA）也很少释放完整的训练语料或可复现的构建方案。这导致了一个根本性的研究瓶颈：研究者无法系统地研究训练数据如何影响模型能力和局限性。Dolma 的核心动机是打破这一信息壁垒——不仅提供一个 3T token 规模的高质量英文语料库，更重要的是开源整个数据处理工具链和详细的构建文档，使得任何研究者都能复现、修改和改进数据处理流程。Dolma 的设计遵循三个原则：(1) 语料规模需达到 2-3T tokens 以支持大规模训练实验；(2) 数据来源需多样化以覆盖不同领域知识；(3) 整个流程必须完全透明和可复现。

**核心机制：四阶段处理 Pipeline 详解**

Dolma 的数据处理 Pipeline 由四个串行阶段组成，每个阶段都经过了严格的消融实验验证：

**（1）语言过滤**：使用 CCNet 框架集成的 fastText 语言识别模型，对每个文档计算英文概率分数，保留分数 \(\geq 0.5\) 的文档。仅此一步就过滤掉了 61.7% 的 Web 页面。CCNet 还会在每个快照内按分片分组，移除高频重复段落（主要是导航栏和页头），此步骤移除了约 70% 的段落。整个 CCNet 阶段将 Common Crawl 从 175.1 TB 压缩至 27.7 TB，过滤率达 84.2%。

**（2）质量过滤**：这是 Dolma 最具特色的设计决策之一。CCNet 原生提供基于 KenLM 困惑度的质量分桶（高/中/低），但 Dolma 团队经过人工检查发现这种模型打分方式并不可靠——它倾向于保留"类维基百科"的文本而过度过滤其他有价值的内容。因此，Dolma 选择了纯启发式规则组合：Gopher All（来自 DeepMind 的 Gopher 论文，包含文档长度、符号比例、重复行比例等规则）+ C4 NoPunc（来自 T5 的 C4 数据集，仅保留"移除不以标点结尾的段落"这一条规则）。消融实验（Figure 2）表明，这一组合在困惑度和下游任务（HellaSwag）上均优于单独使用任一规则集。此外，团队还发现即使经过 Gopher+C4 过滤，仍存在大量重复 n-gram（如连续 100 个 '-' 出现超过 6000 万次），因此额外实现了移除超过 100 个 UTF-8 字符的重复序列的规则。

**（3）内容过滤**：包含毒性过滤和 PII（个人身份信息）处理两部分。毒性过滤使用 Jigsaw Toxic Comments 分类器对每个文档的 hate、NSFW 等维度进行打分，提供高阈值（保守，移除约 5-7% 内容）和低阈值（激进，移除约 29-35% 内容）两种选择。消融实验（Figure 3）显示低阈值在语言建模和下游任务上表现更好，但移除的内容更多。PII 处理采用正则表达式检测邮箱、IP 地址和电话号码，默认策略是将检测到的 PII 替换为特殊标记（如 `{{EMAIL}}`），而非直接删除整个文档。实验（Figure 4）表明 PII 过滤策略对模型性能几乎没有影响。

**（4）去重**：采用多层级去重策略。URL 去重在同一快照内移除相同 URL 的重复文档；段落级去重使用 Bloom filter 在所有快照间识别重复段落；文档级去重同样基于 Bloom filter。去重是移除数据量最大的步骤，Web 数据的去重率达到 61.7%。

> 💡 关键：Dolma 明确拒绝了基于模型的质量过滤（如 KenLM 困惑度打分），转而采用可解释的启发式规则组合。这一设计选择的核心理由是：模型打分会引入隐式偏见，偏好"类维基百科"文本，而启发式规则更加透明、可控、可复现。

**混合策略与代码数据的作用**

Dolma 作为多源数据集，训练时需要确定各源的混合比例。团队通过 1B 参数模型在 150B tokens 上的消融实验探索了两个关键问题：

*代码数据的比例*：通过对比 0%、5%、15% 代码混合比例的模型，发现代码数据显著提升推理任务表现（Table 4）。在 bAbI 任务上，0% 代码的模型完全失败（0.0），而 15% 代码的模型达到 10.1；在 WebNLG 上从 16.8 提升至 22.0。更有趣的是，在 GSM8K 数学推理任务上，所有模型在标准设置下都失败了，但当使用 Program-Aided Language（PAL）方式——即让模型生成 Python 代码来解题时，预训练含代码的模型显著优于纯文本模型（14.7 vs 11.8）。

*多源混合比例*：团队实验了多种混合配置（Table 5），发现排除代码会增加代码数据集上的困惑度，而上采样学术论文和维基百科则降低了 S2ORC 上的困惑度。最终 Dolma 不强制规定单一混合策略，而是提供灵活的混合工具，让研究者根据需求自行调整。

> ⚠️ 注意：Dolma 的基准去污染实验（Table 3）表明，段落匹配方式移除与 Paloma 评测集重叠的文档后，模型在困惑度和下游任务上均无一致性性能下降，验证了去污染策略的安全性。

#### 🧪 练习题
```yaml
question: "Dolma 在质量过滤阶段为什么拒绝使用 CCNet 原生的 KenLM 困惑度打分？"
options:
  - "KenLM 模型计算开销太大，无法处理 3T 规模的数据"
  - "KenLM 打分偏好类维基百科文本，引入隐式偏见，且与启发式规则相关性低"
  - "KenLM 只支持英文，无法处理多语言数据"
  - "KenLM 的过滤效果不如直接使用 GPT-2 困惑度打分"
answer: 1
explain: "论文明确指出 CCNet 的 KenLM 质量分桶与 Gopher+C4 启发式规则的相关性极低（过滤后文档在高/中/低桶的分布几乎不变），且基于模型的过滤会引入偏向维基百科风格文本的隐式偏见，因此选择了更透明可控的启发式规则组合。"
```

### DoReMi

```yaml
id: doremi
num: 14
name: DoReMi
full_name: 'DoReMi数据配比优化 (DoReMi: Optimizing Data Mixtures)'
year: '2023'
org: Stanford
parent: —
paper_url: https://arxiv.org/abs/2305.10429
project_url: ''
category: data
motivation: 极小极大优化自动确定数据配比
```

#### 📝 一句话总结
DoReMi 的核心目标是：极小极大优化自动确定数据配比。

#### 🎯 核心要点
- 核心动机：极小极大优化自动确定数据配比
- 代表机构：Stanford

#### 🔬 深入细节
极小极大优化自动确定数据配比


### FineWeb

```yaml
id: fineweb
num: 15
name: FineWeb
full_name: FineWeb数据集 (FineWeb Dataset)
year: '2024'
org: HuggingFace
parent: refinedweb
paper_url: https://huggingface.co/datasets/HuggingFaceFW/fineweb
project_url: ''
category: data
motivation: 15T最高质量开源网页语料
```

#### 📝 一句话总结
FineWeb 的核心目标是：15T最高质量开源网页语料。

#### 🎯 核心要点
- 核心动机：15T最高质量开源网页语料
- 演化来源：继承或改进自 refinedweb
- 代表机构：HuggingFace

#### 🔬 深入细节
15T最高质量开源网页语料


### Common Corpus

```yaml
id: common_corpus
num: 16
name: Common Corpus
full_name: Common Corpus数据集 (Common Corpus Dataset)
year: '2026'
org: ICLR社区
parent: dolma
paper_url: https://openreview.net/forum?id=Submission25369
project_url: ''
category: data
motivation: 2T完全合规多语言数据集
```

#### 📝 一句话总结
Common Corpus 的核心目标是：2T完全合规多语言数据集。

#### 🎯 核心要点
- 核心动机：2T完全合规多语言数据集
- 演化来源：继承或改进自 dolma
- 代表机构：ICLR社区

#### 🔬 深入细节
2T完全合规多语言数据集


### Essential-Web

```yaml
id: essential_web
num: 17
name: Essential-Web
full_name: Essential-Web数据集 (Essential-Web Dataset)
year: '2026'
org: 学术界
parent: fineweb
paper_url: https://arxiv.org/abs/2501.02404
project_url: ''
category: data
motivation: 24T带12类文档分类标签
```

#### 📝 一句话总结
Essential-Web 的核心目标是：24T带12类文档分类标签。

#### 🎯 核心要点
- 核心动机：24T带12类文档分类标签
- 演化来源：继承或改进自 fineweb
- 代表机构：学术界

#### 🔬 深入细节
24T带12类文档分类标签


### FED框架

```yaml
id: fed_dedup
num: 18
name: FED框架
full_name: FED去重框架 (Fast and Efficient Dataset Deduplication)
year: '2026'
org: 学术界
parent: minhash_dedup
paper_url: https://arxiv.org/abs/2501.02404
project_url: ''
category: data
motivation: GPU加速MinHash快107倍
```

#### 📝 一句话总结
FED框架 的核心目标是：GPU加速MinHash快107倍。

#### 🎯 核心要点
- 核心动机：GPU加速MinHash快107倍
- 演化来源：继承或改进自 minhash_dedup
- 代表机构：学术界

#### 🔬 深入细节
GPU加速MinHash快107倍


### LSHBloom

```yaml
id: lshbloom
num: 19
name: LSHBloom
full_name: LSHBloom去重 (LSHBloom Deduplication)
year: '2026'
org: 学术界
parent: fed_dedup
paper_url: https://arxiv.org/abs/2501.02404
project_url: ''
category: data
motivation: Bloom Filter节省18倍空间
```

#### 📝 一句话总结
LSHBloom 的核心目标是：Bloom Filter节省18倍空间。

#### 🎯 核心要点
- 核心动机：Bloom Filter节省18倍空间
- 演化来源：继承或改进自 fed_dedup
- 代表机构：学术界

#### 🔬 深入细节
Bloom Filter节省18倍空间


### Data Mixing Agent

```yaml
id: data_mixing_agent
num: 20
name: Data Mixing Agent
full_name: 数据混合代理 (Data Mixing Agent)
year: '2026'
org: 学术界
parent: doremi
paper_url: https://arxiv.org/abs/2604.16380
project_url: ''
category: data
motivation: 强化学习动态数据加权
```

#### 📝 一句话总结
Data Mixing Agent 的核心目标是：强化学习动态数据加权。

#### 🎯 核心要点
- 核心动机：强化学习动态数据加权
- 演化来源：继承或改进自 doremi
- 代表机构：学术界

#### 🔬 深入细节
强化学习动态数据加权


### 混合精度训练

```yaml
id: mixed_precision
num: 21
name: 混合精度训练
full_name: 混合精度训练 (Mixed Precision Training)
year: '2018'
org: NVIDIA
parent: —
paper_url: https://arxiv.org/abs/1710.03740
project_url: ''
category: training
motivation: FP16计算FP32存储Loss Scaling
```

#### 📝 一句话总结
混合精度训练 的核心目标是：FP16计算FP32存储Loss Scaling。

#### 🎯 核心要点
- 核心动机：FP16计算FP32存储Loss Scaling
- 代表机构：NVIDIA

#### 🔬 深入细节
FP16计算FP32存储Loss Scaling


### FlashAttention

```yaml
id: flash_attention
num: 22
name: FlashAttention
full_name: 'FlashAttention (FlashAttention: Fast and Memory-Efficient)'
year: '2022'
org: Stanford
parent: —
paper_url: https://arxiv.org/abs/2205.14135
project_url: ''
category: training
motivation: IO感知算法SRAM内完成Attention
```

#### 📝 一句话总结
FlashAttention 的核心目标是：IO感知算法SRAM内完成Attention。

#### 🎯 核心要点
- 核心动机：IO感知算法SRAM内完成Attention
- 代表机构：Stanford

#### 🔬 深入细节
IO感知算法SRAM内完成Attention


### FlashAttention-2

```yaml
id: flash_attention_2
num: 23
name: FlashAttention-2
full_name: 'FlashAttention-2 (FlashAttention-2: Faster Attention)'
year: '2023'
org: Stanford
parent: flash_attention
paper_url: https://arxiv.org/abs/2307.08691
project_url: ''
category: training
motivation: 优化并行度提升2倍速度
```

#### 📝 一句话总结
FlashAttention-2 的核心目标是：优化并行度提升2倍速度。

#### 🎯 核心要点
- 核心动机：优化并行度提升2倍速度
- 演化来源：继承或改进自 flash_attention
- 代表机构：Stanford

#### 🔬 深入细节
优化并行度提升2倍速度


### WeSaR

```yaml
id: wesar
num: 24
name: WeSaR
full_name: WeSaR (Weight Scaling as Reparameterization)
year: '2025.10'
org: 学术界
parent: —
paper_url: https://arxiv.org/abs/2410.16682
project_url: ''
category: training
motivation: 可学习门控抑制梯度爆炸
```

#### 📝 一句话总结
WeSaR 的核心目标是：可学习门控抑制梯度爆炸。

#### 🎯 核心要点
- 核心动机：可学习门控抑制梯度爆炸
- 代表机构：学术界

#### 🔬 深入细节
可学习门控抑制梯度爆炸


### Muon优化器

```yaml
id: muon
num: 25
name: Muon优化器
full_name: Muon优化器 (MomentUm Orthogonalized by Newton-Schulz)
year: '2025.02'
org: 学术界
parent: —
paper_url: https://arxiv.org/abs/2502.16982
project_url: ''
category: training
motivation: 梯度正交化节省50%计算步骤
```

#### 📝 一句话总结
Muon 通过 Newton-Schulz 迭代对梯度动量进行正交化，实现谱范数下的最速下降方向，并引入 weight decay 与 update RMS 匹配机制使其可扩展至大规模 LLM 训练，仅需约 **50% 的训练 FLOPs** 即可达到 AdamW 同等性能。

#### 🎯 核心要点
- **谱范数最速下降**：Muon 将梯度动量矩阵正交化（取其最近正交矩阵），等价于在谱范数约束下的最速下降方向，比 AdamW 的逐元素缩放更高效利用矩阵结构
- **Newton-Schulz 迭代**：使用 5 次多项式迭代 \(X_{k+1} = a X_k + b X_k^3 + c X_k^5\) 近似矩阵极分解，完全由矩阵乘法组成，GPU 友好且无需 SVD
- **Weight Decay 稳定训练**：原始 Muon 无 weight decay 导致权重范数膨胀、训练不稳定；引入 \(\lambda = 0.1\) 的 weight decay 解决此问题
- **Update RMS 匹配**：通过 \(\text{lr} \times \sqrt{\max(m, n)/n} \times 0.2\) 的缩放因子，使 Muon 的 update RMS 与 AdamW 对齐，可直接复用 AdamW 的超参数
- **分布式 ZeRO-1 实现**：每个 GPU 仅存储部分参数的动量，通过 all-gather 拼接后执行 Newton-Schulz 迭代，内存开销仅为 AdamW 的约 50%
- **混合策略**：2D 权重矩阵使用 Muon，1D 参数（bias、LayerNorm、embedding）仍使用 AdamW
- **Scaling Law 验证**：在 1.5B 到 16B 参数规模上验证，Muon 的 scaling law 曲线始终优于 AdamW，仅需约 52% FLOPs 匹配同等损失
- **Moonlight 模型**：基于 Muon 训练的 3B/16B MoE 模型（5.7T tokens），在多项基准上超越同规模竞品

#### 🔬 深入细节
##### 核心框架图

![Muon vs AdamW Scaling Law](https://ar5iv.labs.arxiv.org/html/2502.16982/assets/x1.png)
*图 1(a)：Muon 与 AdamW 在不同 FLOPs 预算下的验证损失对比。Muon 在所有计算预算下均优于 AdamW，且差距随规模增大而保持。*

![Moonlight MMLU 对比](https://ar5iv.labs.arxiv.org/html/2502.16982/assets/x2.png)
*图 1(b)：Moonlight（Muon 训练）与其他同规模模型在 MMLU 上的对比，展示了 Muon 在下游任务上的优势。*

##### 算法伪代码

```python
# Muon 优化器核心算法（含 weight decay 和 update RMS 匹配）
# 输入: 参数 θ, 学习率 η, 动量系数 μ, weight decay λ, NS迭代次数 k=5
# NS多项式系数: a=3.4445, b=-4.7750, c=2.0315

def muon_step(θ, grad, momentum_buffer, η, μ=0.95, λ=0.1):
    # 1. 更新动量（Nesterov 风格）
    buf = μ * momentum_buffer + grad
    grad_with_nesterov = grad + μ * buf
    
    # 2. Newton-Schulz 迭代正交化（仅对 2D 权重矩阵）
    G = grad_with_nesterov  # shape: (m, n)
    # 初始缩放使谱范数约为 1
    G = G / (G.norm() + 1e-7)
    
    # 5 次 NS 迭代
    for _ in range(5):
        A = G @ G.T                    # (m, m)
        G = 3.4445 * G - 4.7750 * (A @ G) + 2.0315 * (A @ A @ G)
    
    # 3. Update RMS 匹配缩放
    m, n = θ.shape
    scale = 0.2 * sqrt(max(m, n) / n)
    
    # 4. 参数更新（含 weight decay）
    θ = θ - η * (scale * G + λ * θ)
    
    return θ, buf
```

```python
# 分布式 Muon（ZeRO-1 风格）
# 每个 GPU rank 仅存储 1/world_size 的动量

def distributed_muon_step(θ_full, grad_full, local_momentum, rank, world_size):
    # 每个 rank 只处理自己负责的参数分片
    chunk_size = len(θ_full) // world_size
    local_grad = grad_full[rank * chunk_size : (rank+1) * chunk_size]
    
    # 本地更新动量
    local_momentum = μ * local_momentum + local_grad
    local_nesterov = local_grad + μ * local_momentum
    
    # All-gather 拼接完整动量矩阵
    full_nesterov = all_gather(local_nesterov)  # 通信
    
    # 在完整矩阵上执行 Newton-Schulz 迭代
    G = newton_schulz_orthogonalize(full_nesterov, k=5)
    
    # 取回本地分片进行参数更新
    local_update = G[rank * chunk_size : (rank+1) * chunk_size]
    θ_local = θ_local - η * (scale * local_update + λ * θ_local)
```

##### 动机与背景

**AdamW 的局限性**：AdamW 通过逐元素的二阶矩估计来缩放梯度，本质上是在 \(\ell_\infty\) 范数约束下的最速下降。这种逐元素操作忽略了权重矩阵的矩阵结构，无法利用梯度矩阵的奇异值分布信息。

**Muon 的核心洞察**：对于权重矩阵 \(W \in \mathbb{R}^{m \times n}\)，更自然的约束应该是谱范数（最大奇异值）。在谱范数约束下的最速下降方向恰好是梯度矩阵的**正交极因子**（orthogonal polar factor），即将梯度 SVD 分解 \(G = U \Sigma V^T\) 后取 \(UV^T\)。

> 💡 **关键直觉**：正交化后的更新方向 \(UV^T\) 保留了梯度的方向信息但移除了奇异值的不均匀缩放，使得所有方向上的更新幅度一致，避免了某些方向更新过大或过小的问题。

##### Newton-Schulz 迭代的数学原理

直接计算 SVD 代价高昂且不适合 GPU 并行。Muon 使用 **Newton-Schulz 迭代** 来近似极分解：

$$X_{k+1} = a X_k + b X_k (X_k^T X_k) + c X_k (X_k^T X_k)^2$$

其中 \(a = 3.4445, b = -4.7750, c = 2.0315\)，这些系数经过优化以最大化收敛速度。

**为什么只需 5 次迭代？** 初始矩阵经过谱范数归一化后，其奇异值已经在 \([0, 1]\) 范围内。5 次迭代足以将所有奇异值映射到接近 1（即正交化），因为每次迭代都是一个 5 阶多项式映射 \(\sigma \mapsto (a + b\sigma^2 + c\sigma^4) \cdot \sigma\)，在 \([0, 1]\) 上快速收敛到恒等函数。

**计算复杂度**：每次迭代仅涉及矩阵乘法，5 次迭代共需约 15 次矩阵乘法。对于 \(m \times n\) 矩阵，总 FLOPs 约为 \(O(15 \cdot m \cdot n \cdot \min(m,n))\)，远小于前向/反向传播的计算量。

##### Weight Decay 的必要性

![Weight Decay 消融实验](https://ar5iv.labs.arxiv.org/html/2502.16982/assets/x3.png)
*图 2：AdamW（绿色）、无 weight decay 的 Muon（红色）、有 weight decay 的 Muon（蓝色）的验证损失曲线。无 weight decay 的 Muon 在训练后期出现损失上升。*

原始 Muon 没有 weight decay，导致两个问题：

1. **权重范数膨胀**：正交化更新的范数恒定（不随权重大小调整），缺乏隐式正则化效果
2. **训练不稳定**：在大规模训练中（>100B tokens），权重范数持续增长最终导致训练崩溃

> ⚠️ **注意**：AdamW 的逐元素归一化天然具有一定的权重范数控制效果（大权重对应大梯度时更新比例较小），而 Muon 的正交化更新不具备此性质，因此显式 weight decay 是必需的。

论文实验表明 \(\lambda = 0.1\) 在所有规模上都表现良好，无需针对模型大小调整。

##### Update RMS 匹配机制

这是使 Muon 可扩展的关键工程创新。核心问题是：**如何让 Muon 直接复用 AdamW 经过大量调参得到的学习率？**

**观察**：AdamW 的 update RMS（参数更新的均方根）约为 \(\text{lr} \times 0.2\)（因为 Adam 的二阶矩归一化使 update 幅度约为 1，再乘以 lr）。

**Muon 的 update RMS 推导**：正交化后的矩阵 \(G \in \mathbb{R}^{m \times n}\) 满足 \(\|G\|_F^2 = \min(m, n)\)（正交矩阵的 Frobenius 范数等于其秩），因此：

$$\text{RMS}(G) = \sqrt{\frac{\|G\|_F^2}{m \cdot n}} = \sqrt{\frac{\min(m, n)}{m \cdot n}} = \frac{1}{\sqrt{\max(m, n)}}$$

为了匹配 AdamW 的 update RMS \(\approx \text{lr} \times 0.2\)，Muon 的缩放因子设为：

$$\text{scale} = 0.2 \times \sqrt{\frac{\max(m, n)}{n}}$$

> 💡 **关键**：这个匹配使得 Muon 可以直接使用 AdamW 的学习率、warmup 策略和 decay schedule，大幅降低了超参数搜索成本。实验验证（Table 1）显示匹配后的 update RMS 在 \(10^{-4}\) 量级上与 AdamW 一致。

##### 分布式实现与内存优化

Muon 采用类似 ZeRO-1 的分布式策略：

| 组件 | AdamW | Muon |
|------|-------|------|
| 优化器状态 | 动量 + 二阶矩 = **2份** | 仅动量 = **1份** |
| 分布式策略 | 每 GPU 存全部状态 | 每 GPU 存 1/N 动量 |
| 通信 | 梯度 all-reduce | 动量 all-gather |
| 内存占用 | 2× 参数量 | ~0.5× 参数量（分片后） |

Newton-Schulz 迭代需要完整的动量矩阵，因此在迭代前需要 all-gather 操作。但由于 Muon 只需存储一份动量（而非 AdamW 的动量+二阶矩两份），分片后的总内存开销反而更低。

##### Scaling Law 分析

![Scaling Law 拟合曲线](https://ar5iv.labs.arxiv.org/html/2502.16982/assets/x4.png)
*图 3：Muon 和 AdamW 的 Scaling Law 拟合曲线。Muon 在所有 FLOPs 预算下均低于 AdamW。*

论文在 1.5B–16B 参数规模上进行了系统的 scaling law 实验，使用 Chinchilla 风格的拟合：

$$L(C) = A \cdot C^{-\alpha} + L_\infty$$

拟合结果：

| 优化器 | \(A\) | \(\alpha\) | \(L_\infty\) |
|--------|-------|-----------|-------------|
| Muon | 2.506 | 0.052 | 2.839 |
| AdamW | 2.608 | 0.054 | 2.857 |

关键发现：**Muon 仅需约 52% 的 FLOPs 即可达到 AdamW 相同的验证损失**。两者的 \(\alpha\)（缩放指数）接近，说明 Muon 的优势是一个近似恒定的乘法因子，而非改变缩放规律本身。

##### SVD 熵分析

![SVD 熵分析](https://ar5iv.labs.arxiv.org/html/2502.16982/assets/x5.png)
*图 4：不同训练阶段权重矩阵的 SVD 熵。Muon 训练的模型具有更高的 SVD 熵，说明奇异值分布更均匀。*

论文通过 SVD 熵（对归一化奇异值计算信息熵）分析了 Muon 与 AdamW 训练的权重矩阵差异：

$$H = -\sum_i \hat{\sigma}_i \log \hat{\sigma}_i, \quad \hat{\sigma}_i = \frac{\sigma_i}{\sum_j \sigma_j}$$

Muon 训练的模型在所有层类型（attention QKV、output projection、FFN）上都具有更高的 SVD 熵，意味着：
- 权重矩阵的奇异值分布更均匀
- 模型利用了更多的方向来编码信息
- 有效秩更高，表示能力更强

> 💡 **关键直觉**：Muon 的正交化更新天然倾向于均匀化奇异值——因为更新方向 \(UV^T\) 的所有奇异值都是 1，不会像 AdamW 那样因梯度奇异值不均匀而导致某些方向被过度更新。

##### Moonlight 模型实验结果

Moonlight 是基于 Muon 训练的 3B 激活 / 16B 总参数的 MoE 模型，在 5.7T tokens 上训练。

**与 AdamW 基线对比（1.2T tokens）**：

| 基准 | Moonlight (Muon) | Moonlight-A (AdamW) |
|------|------------------|---------------------|
| MMLU | 59.1 | 55.5 |
| MATH-500 | 30.0 | 22.8 |
| HumanEval | 53.7 | 48.8 |
| MBPP | 56.3 | 54.3 |
| GSM8K | 60.0 | 50.0 |

Muon 在所有基准上均优于 AdamW，尤其在数学（MATH +7.2）和代码（HumanEval +4.9）任务上优势显著。

**与同规模开源模型对比（5.7T tokens）**：

| 基准 | Moonlight | Llama-3.2-3B (9T) | Qwen2.5-3B (18T) |
|------|-----------|-------------------|-------------------|
| MMLU | 62.6 | 63.4 | 65.6 |
| MATH-500 | 42.4 | 44.4 | 42.4 |
| HumanEval | 68.3 | 36.0 | 42.7 |
| GSM8K | 71.7 | 54.4 | 79.2 |

Moonlight 仅用 5.7T tokens 即在 HumanEval 上大幅超越使用 9T/18T tokens 训练的竞品，在 MATH 上与 Qwen2.5-3B 持平，展示了 Muon 的数据效率优势。

##### 与 AdamW 的本质区别

| 维度 | AdamW | Muon |
|------|-------|------|
| 更新方向 | 逐元素梯度/二阶矩 | 梯度动量的正交极因子 |
| 范数约束 | \(\ell_\infty\) 最速下降 | 谱范数最速下降 |
| 矩阵结构利用 | ❌ 忽略 | ✅ 利用奇异值结构 |
| 优化器状态 | 2 份（\(m_t, v_t\)） | 1 份（\(m_t\)） |
| 适用参数 | 所有参数 | 仅 2D 权重矩阵 |
| Weight decay | 解耦式 | 同样解耦式（\(\lambda=0.1\)） |

#### 🧪 练习题
```yaml
question: "Muon 优化器使用 Newton-Schulz 迭代的主要目的是什么？"
options:
  - "计算梯度矩阵的逆，实现二阶优化"
  - "近似梯度动量矩阵的极分解，获取正交化更新方向"
  - "对梯度进行低秩近似以减少通信量"
  - "估计梯度的二阶矩以实现自适应学习率"
answer: 1
explain: "Newton-Schulz 迭代用于近似矩阵极分解 G = U Σ V^T → UV^T，将梯度动量正交化为最近正交矩阵，实现谱范数下的最速下降方向。"
```

### FlashAttention-4

```yaml
id: flash_attention_4
num: 26
name: FlashAttention-4
full_name: FlashAttention-4 (FlashAttention-4 for Blackwell)
year: '2026.03'
org: Together AI
parent: flash_attention_2
paper_url: https://tridao.me/blog/2026/flash-attention-4/
project_url: ''
category: training
motivation: Blackwell架构71%硬件利用率
```

#### 📝 一句话总结
FlashAttention-4 的核心目标是：Blackwell架构71%硬件利用率。

#### 🎯 核心要点
- 核心动机：Blackwell架构71%硬件利用率
- 演化来源：继承或改进自 flash_attention_2
- 代表机构：Together AI

#### 🔬 深入细节
Blackwell架构71%硬件利用率


### SNIP/Quartet

```yaml
id: snip_quartet
num: 27
name: SNIP/Quartet
full_name: SNIP/Quartet (Native FP4 Training)
year: '2026'
org: NeurIPS
parent: mixed_precision
paper_url: https://arxiv.org/abs/2410.20574
project_url: ''
category: training
motivation: 原生FP4训练层级动态量化
```

#### 📝 一句话总结
SNIP/Quartet 的核心目标是：原生FP4训练层级动态量化。

#### 🎯 核心要点
- 核心动机：原生FP4训练层级动态量化
- 演化来源：继承或改进自 mixed_precision
- 代表机构：NeurIPS

#### 🔬 深入细节
原生FP4训练层级动态量化


### LongRoPE2

```yaml
id: longrope2
num: 28
name: LongRoPE2
full_name: LongRoPE2 (Near-Lossless LLM Context Window Scaling)
year: '2025.12'
org: Microsoft
parent: —
paper_url: https://arxiv.org/abs/2502.05011
project_url: ''
category: training
motivation: 进化搜索扩展至200万上下文
```

#### 📝 一句话总结
LongRoPE2 的核心目标是：进化搜索扩展至200万上下文。

#### 🎯 核心要点
- 核心动机：进化搜索扩展至200万上下文
- 代表机构：Microsoft

#### 🔬 深入细节
进化搜索扩展至200万上下文


### GPipe

```yaml
id: gpipe
num: 29
name: GPipe
full_name: 'GPipe (GPipe: Easy Scaling with Micro-Batch Pipeline)'
year: '2019'
org: Google
parent: —
paper_url: https://arxiv.org/abs/1811.06965
project_url: ''
category: distributed
motivation: 流水线并行微批次切分
```

#### 📝 一句话总结
GPipe 的核心目标是：流水线并行微批次切分。

#### 🎯 核心要点
- 核心动机：流水线并行微批次切分
- 代表机构：Google

#### 🔬 深入细节
流水线并行微批次切分


### Megatron-LM

```yaml
id: megatron_lm
num: 30
name: Megatron-LM
full_name: 'Megatron-LM (Megatron-LM: Training Multi-Billion Parameter)'
year: '2019'
org: NVIDIA
parent: —
paper_url: https://arxiv.org/abs/1909.08053
project_url: ''
category: distributed
motivation: 张量并行Transformer层内切分
```

#### 📝 一句话总结
Megatron-LM 的核心目标是：张量并行Transformer层内切分。

#### 🎯 核心要点
- 核心动机：张量并行Transformer层内切分
- 代表机构：NVIDIA

#### 🔬 深入细节
张量并行Transformer层内切分


### ZeRO

```yaml
id: zero
num: 31
name: ZeRO
full_name: 'ZeRO (ZeRO: Memory Optimizations Toward Training Trillion)'
year: '2020'
org: Microsoft
parent: —
paper_url: https://arxiv.org/abs/1910.02054
project_url: ''
category: distributed
motivation: 优化器/梯度/参数分片存储
```

#### 📝 一句话总结
ZeRO 的核心目标是：优化器/梯度/参数分片存储。

#### 🎯 核心要点
- 核心动机：优化器/梯度/参数分片存储
- 代表机构：Microsoft

#### 🔬 深入细节
优化器/梯度/参数分片存储


### FSDP

```yaml
id: fsdp
num: 32
name: FSDP
full_name: FSDP (Fully Sharded Data Parallel)
year: '2023'
org: Meta
parent: zero
paper_url: https://arxiv.org/abs/2304.11277
project_url: ''
category: distributed
motivation: PyTorch原生完全分片数据并行
```

#### 📝 一句话总结
FSDP 的核心目标是：PyTorch原生完全分片数据并行。

#### 🎯 核心要点
- 核心动机：PyTorch原生完全分片数据并行
- 演化来源：继承或改进自 zero
- 代表机构：Meta

#### 🔬 深入细节
PyTorch原生完全分片数据并行


### DISTFLASHATTN

```yaml
id: distflashattn
num: 33
name: DISTFLASHATTN
full_name: DISTFLASHATTN (Distributed Memory-efficient Attention)
year: '2026'
org: 学术界
parent: flash_attention_2
paper_url: https://arxiv.org/abs/2310.03294
project_url: ''
category: distributed
motivation: Token级负载均衡百万上下文
```

#### 📝 一句话总结
DISTFLASHATTN 的核心目标是：Token级负载均衡百万上下文。

#### 🎯 核心要点
- 核心动机：Token级负载均衡百万上下文
- 演化来源：继承或改进自 flash_attention_2
- 代表机构：学术界

#### 🔬 深入细节
Token级负载均衡百万上下文
