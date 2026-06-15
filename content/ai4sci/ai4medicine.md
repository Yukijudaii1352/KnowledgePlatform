---
domain: ai4sci
topic_id: ai4medicine
topic_name: 药学AI
page_icon: 💊
page_title: 药学AI 算法总结
page_subtitle: '{build_date} 版'
page_desc: 药学AI是人工智能在生命科学领域最具变革潜力的应用方向，涵盖从分子生成、虚拟筛选到ADMET预测的全流程药物研发。该领域经历了从传统QSAR到深度学习，再到生成式AI与基础模型的技术演进，2026年已有173个AI原创药物进入临床阶段。
hero_pills:
- 分子生成 · 虚拟筛选 · ADMET预测 · 药物设计 · 基础模型
count_pill: '{count} 个算法'
categories:
  generation:
    label: 分子生成
    color: '#3b82f6'
  screening:
    label: 虚拟筛选
    color: '#10b981'
  admet:
    label: ADMET预测
    color: '#f59e0b'
  foundation:
    label: 基础模型
    color: '#8b5cf6'
  design:
    label: 药物设计
    color: '#ef4444'
image_base: ../../content/ai4sci/ai4medicine/assets/
---

## 领域综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/ai4sci/ai4medicine/overview/zhihu__ACS_Cent._Sci._通往药物超级智能的路线图__eebf15c3/article.md

## 最新进展综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/ai4sci/ai4medicine/latest/zhihu__AI驱动药物发现的发展趋势与挑战_—_Transformer_vs_Diffusion__de3a67d9/article.md

## 算法演化关系

```yaml
nodes:
- id: reinvent
  x: 2017
  y: 0
  category: generation
- id: chemical_vae
  x: 2018
  y: 0
  category: generation
- id: jt_vae
  x: 2018.3
  y: 0
  category: generation
- id: molgan
  x: 2018.5
  y: 0
  category: generation
- id: selfies
  x: 2020
  y: 0
  category: generation
- id: molgpt
  x: 2021
  y: 1
  category: generation
- id: chemgpt
  x: 2022
  y: 1
  category: generation
- id: gp_molformer
  x: 2025
  y: 1
  category: generation
- id: mist
  x: 2026
  y: 1
  category: generation
- id: e3_edm
  x: 2022
  y: 2
  category: generation
- id: diffsbdd
  x: 2022.5
  y: 2
  category: generation
- id: targetdiff
  x: 2023
  y: 2
  category: generation
- id: pocket2mol
  x: 2022.3
  y: 2
  category: generation
- id: rfdiffusion3
  x: 2025.7
  y: 2
  category: generation
- id: apo2mol
  x: 2026
  y: 2
  category: generation
- id: genie3
  x: 2026.4
  y: 2
  category: generation
- id: megalodon
  x: 2026.2
  y: 2
  category: generation
- id: cocograph
  x: 2026.4
  y: 2.5
  category: generation
- id: propmolflow
  x: 2026.3
  y: 2
  category: generation
- id: proteina_complexa
  x: 2026.3
  y: 2.3
  category: generation
- id: ecfp
  x: 2010
  y: 3
  category: screening
- id: autodock
  x: 1990
  y: 3
  category: screening
- id: deepdta
  x: 2018
  y: 3
  category: screening
- id: graphdta
  x: 2019
  y: 3
  category: screening
- id: attentivefp
  x: 2020
  y: 3
  category: screening
- id: drugclip
  x: 2023
  y: 3
  category: screening
- id: drughash
  x: 2025
  y: 3
  category: screening
- id: s2drug
  x: 2026
  y: 3
  category: screening
- id: bindclip
  x: 2026.2
  y: 3
  category: screening
- id: cadg_dta
  x: 2026.1
  y: 3.3
  category: screening
- id: qsar
  x: 1965
  y: 4
  category: admet
- id: admetlab
  x: 2025
  y: 4
  category: admet
- id: helixadmet
  x: 2025.5
  y: 4
  category: admet
- id: molbert
  x: 2020
  y: 5
  category: foundation
- id: chemberta
  x: 2021
  y: 5
  category: foundation
- id: unimol
  x: 2023
  y: 5
  category: foundation
- id: chemberta3
  x: 2026
  y: 5
  category: foundation
- id: moldeberta
  x: 2026.2
  y: 5
  category: foundation
- id: boltz2
  x: 2025.5
  y: 5
  category: foundation
- id: alphafold2
  x: 2021
  y: 6
  category: design
- id: alphafold3
  x: 2024
  y: 6
  category: design
- id: yueldesign
  x: 2025.4
  y: 6
  category: design
edges:
- from: reinvent
  to: molgpt
  label: GPT架构
- from: molgpt
  to: chemgpt
  label: 大规模预训
- from: chemgpt
  to: gp_molformer
  label: 11亿参数
- from: gp_molformer
  to: mist
  label: 18亿参数
- from: chemical_vae
  to: jt_vae
  label: 连接树分解
- from: chemical_vae
  to: selfies
  label: 100%有效
- from: e3_edm
  to: diffsbdd
  label: 口袋条件
- from: diffsbdd
  to: targetdiff
  label: 几何约束
- from: e3_edm
  to: pocket2mol
  label: 自回归
- from: targetdiff
  to: rfdiffusion3
  label: 全聚合物
- from: targetdiff
  to: apo2mol
  label: 动态口袋
- from: rfdiffusion3
  to: genie3
  label: 全原子
- from: diffsbdd
  to: megalodon
  label: 混合去噪
- from: targetdiff
  to: propmolflow
  label: 性质引导
- from: rfdiffusion3
  to: proteina_complexa
  label: 推理搜索
- from: deepdta
  to: graphdta
  label: GNN表征
- from: graphdta
  to: attentivefp
  label: 注意力
- from: attentivefp
  to: drugclip
  label: 对比学习
- from: drugclip
  to: drughash
  label: 哈希加速
- from: drugclip
  to: s2drug
  label: 双模态
- from: drugclip
  to: bindclip
  label: 统一框架
- from: graphdta
  to: cadg_dta
  label: 交叉注意力
- from: qsar
  to: admetlab
  label: 深度学习
- from: admetlab
  to: helixadmet
  label: 自监督
- from: molbert
  to: chemberta
  label: BERT架构
- from: chemberta
  to: chemberta3
  label: 开源框架
- from: molbert
  to: moldeberta
  label: BPE编码
- from: unimol
  to: boltz2
  label: 协同折叠
- from: alphafold2
  to: alphafold3
  label: 复合物
- from: alphafold3
  to: yueldesign
  label: 柔性口袋
milestones:
- jt_vae
- alphafold2
- drugclip
```

## 核心算法

### REINVENT

```yaml
id: reinvent
num: 1
name: REINVENT
full_name: 强化学习分子生成 (REINVENT)
year: '2017'
org: AstraZeneca
parent: —
paper_url: https://jcheminf.biomedcentral.com/articles/10.1186/s13321-017-0235-x
project_url: ''
category: generation
motivation: RNN结合强化学习优化分子性质
```

#### 📝 一句话总结
REINVENT 的核心目标是：RNN结合强化学习优化分子性质。

#### 🎯 核心要点
- 核心动机：RNN结合强化学习优化分子性质
- 代表机构：AstraZeneca

#### 🔬 深入细节
RNN结合强化学习优化分子性质


### Chemical VAE

```yaml
id: chemical_vae
num: 2
name: Chemical VAE
full_name: 化学变分自编码器 (Chemical VAE)
year: '2018'
org: Harvard
parent: —
paper_url: https://pubs.acs.org/doi/10.1021/acscentsci.7b00572
project_url: ''
category: generation
motivation: 首个将SMILES映射到连续潜空间的VAE
```

#### 📝 一句话总结
Chemical VAE 提出将离散的分子 SMILES 字符串通过变分自编码器映射到连续潜在空间，并联合训练性质预测网络，使得可以在潜在空间中利用贝叶斯优化等方法高效搜索具有目标性质的新分子，开创了数据驱动的自动化学设计范式。

#### 🎯 核心要点
- **端到端 VAE 架构**：编码器（1D 卷积 + 全连接）将 SMILES 字符串编码为连续潜在向量，解码器（GRU）从潜在向量重建 SMILES
- **联合性质预测**：在潜在空间上附加 MLP 性质预测器，与 VAE 同时训练，使潜在空间对分子性质具有可微分的梯度信号
- **三部分联合损失函数**：重建损失 + KL 散度正则化 + 性质预测损失，权重可调
- **两大基准数据集**：QM9（~108K 小分子，最多 9 个重原子）和 ZINC（~250K 类药分子，最多 38 个重原子）
- **连续空间分子优化**：在潜在空间中执行贝叶斯优化（稀疏高斯过程），针对 logP、QED、SAS 等药物相关性质搜索最优分子
- **平滑插值与邻域搜索**：潜在空间中两个分子之间的线性插值可产生语义平滑的分子过渡序列
- **与遗传算法对比**：在 logP 优化任务中，Chemical VAE + 贝叶斯优化显著优于基于 SMILES 的遗传算法

#### 🔬 深入细节
##### 模型架构总览

![Chemical VAE 架构示意图](https://ar5iv.labs.arxiv.org/html/1610.02415/assets/x1.png)
*图：Chemical VAE 的整体架构。左侧编码器将 SMILES 字符串编码为潜在向量 \(z\)，右侧解码器从 \(z\) 重建 SMILES，上方性质预测网络从 \(z\) 预测分子性质。联合训练使潜在空间同时具备重建能力和性质预测能力。*

##### 算法核心流程

```python
# Chemical VAE 联合训练伪代码
for epoch in range(num_epochs):
    for batch_smiles, batch_properties in dataloader:
        # 1. 编码：SMILES → one-hot → 潜在分布参数
        x = one_hot_encode(batch_smiles)        # (B, max_len, charset_size)
        mu, log_sigma = encoder(x)               # 各为 (B, latent_dim)
        
        # 2. 重参数化采样
        epsilon = torch.randn_like(mu)
        z = mu + torch.exp(log_sigma) * epsilon   # (B, latent_dim)
        
        # 3. 解码：潜在向量 → SMILES
        x_recon = decoder(z)                      # (B, max_len, charset_size)
        
        # 4. 性质预测
        y_pred = property_predictor(z)             # (B, num_properties)
        
        # 5. 计算联合损失
        L_recon = cross_entropy(x_recon, x)
        L_KL = -0.5 * sum(1 + log_sigma**2 - mu**2 - exp(log_sigma**2))
        L_prop = mse_loss(y_pred, batch_properties)
        
        loss = L_recon + L_KL + alpha * L_prop
        
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

# 贝叶斯优化搜索最优分子
gp_model = SparseGaussianProcess(latent_dim)
gp_model.fit(z_train, y_train)
for step in range(opt_steps):
    z_next = maximize_expected_improvement(gp_model)
    smiles_next = decoder.decode(z_next)
    y_next = evaluate(smiles_next)
    gp_model.update(z_next, y_next)
```

##### 动机与背景

传统分子设计主要依赖专家经验和高通量虚拟筛选，即在已知分子库中逐一评估候选分子。这种方法存在两个根本性缺陷：

1. **离散搜索空间**：分子以 SMILES 字符串等离散符号表示，无法直接应用基于梯度的连续优化方法。化学空间的组合爆炸（估计可合成的类药分子数量达 \(10^{60}\)）使得穷举搜索不可行。
2. **缺乏结构化表示**：SMILES 字符串中一个字符的微小改变可能导致完全不同甚至无效的分子，缺乏"相似输入→相似输出"的平滑性。

> 💡 **核心洞察**：如果能将离散分子映射到连续向量空间，且该空间对分子性质具有平滑性，就可以利用强大的连续优化工具（梯度下降、贝叶斯优化等）来高效搜索目标分子。

##### 编码器设计

编码器将 SMILES 字符串转换为潜在空间中的概率分布参数。具体流程：

1. **输入表示**：SMILES 字符串被转换为 one-hot 编码矩阵 \(X \in \{0,1\}^{L \times C}\)，其中 \(L\) 为最大序列长度（QM9: 120, ZINC: 120），\(C\) 为字符集大小（QM9: 35, ZINC: 35）。

2. **卷积特征提取**：使用三层 1D 卷积网络提取局部模式：
   - 第一层：9 个核，宽度 9，ReLU 激活
   - 第二层：9 个核，宽度 9，ReLU 激活  
   - 第三层：10 个核，宽度 11，ReLU 激活
   
3. **全连接映射**：卷积输出展平后通过全连接层映射为潜在分布的均值 \(\mu\) 和对数方差 \(\log \sigma^2\)：

$$q_\phi(z|x) = \mathcal{N}(z; \mu_\phi(x), \sigma^2_\phi(x) \cdot I)$$

潜在空间维度为 QM9 数据集 56 维，ZINC 数据集 196 维。

##### 解码器设计

解码器采用三层堆叠 GRU（Gated Recurrent Unit）网络，将潜在向量 \(z\) 逐字符地重建 SMILES 字符串：

1. 潜在向量 \(z\) 首先通过全连接层映射为 GRU 的初始隐状态
2. GRU 在每个时间步输出字符概率分布，通过 softmax 层选择下一个字符
3. 训练时使用 teacher forcing（输入真实前缀），推理时使用自回归生成

每层 GRU 隐状态维度为 501。解码器的关键挑战在于 SMILES 语法的脆弱性——括号、环编号等必须严格匹配，单个字符错误即导致无效分子。

##### 性质预测网络

性质预测器是一个从潜在向量 \(z\) 到分子性质的多层感知机（MLP）：

$$\hat{y} = f_\theta(z)$$

包含两个全连接隐藏层（各 100 个神经元），使用 ReLU 激活和 batch normalization。预测的性质包括：
- **logP**：辛醇-水分配系数（亲脂性指标）
- **QED**：药物相似性定量估计
- **SAS**：合成可及性评分

> ⚠️ **关键设计**：性质预测器的梯度信号会反向传播到编码器，迫使潜在空间组织为性质相关的平滑流形。这是实现后续贝叶斯优化的基础——如果潜在空间对性质不平滑，优化将无法有效进行。

##### 联合训练目标

Chemical VAE 的总损失函数由三部分组成：

$$\mathcal{L} = \mathcal{L}_{\text{recon}} + \mathcal{L}_{\text{KL}} + \alpha \cdot \mathcal{L}_{\text{prop}}$$

其中：

**重建损失**（逐字符交叉熵）：

$$\mathcal{L}_{\text{recon}} = -\sum_{t=1}^{L} \sum_{c=1}^{C} x_{t,c} \log \hat{x}_{t,c}$$

**KL 散度**（正则化潜在空间为标准正态分布）：

$$\mathcal{L}_{\text{KL}} = -\frac{1}{2} \sum_{j=1}^{d} \left(1 + \log \sigma_j^2 - \mu_j^2 - \sigma_j^2\right)$$

**性质预测损失**（均方误差）：

$$\mathcal{L}_{\text{prop}} = \| y - f_\theta(z) \|^2$$

权重 \(\alpha\) 控制性质预测对潜在空间结构的影响强度。

##### 潜在空间中的分子优化

训练完成后，Chemical VAE 的核心应用是在潜在空间中搜索最优分子：

![分子插值与潜在空间可视化](https://ar5iv.labs.arxiv.org/html/1610.02415/assets/x4.png)
*图：潜在空间中分子的平滑插值。两个已知分子之间的线性路径上，解码出的分子呈现渐进的结构变化。*

**贝叶斯优化流程**：
1. 使用训练好的编码器将所有已知分子编码到潜在空间
2. 在潜在空间中训练稀疏高斯过程（Sparse GP）作为性质的代理模型
3. 通过最大化期望改进（Expected Improvement）采集函数选择下一个评估点
4. 将选中的潜在向量解码为 SMILES，评估其真实性质
5. 迭代更新 GP 模型

> 💡 **与传统方法的关键区别**：传统虚拟筛选在离散分子库中搜索，Chemical VAE 在连续空间中优化——这意味着它可以"发明"训练集中不存在的全新分子结构。

##### 实验结果与关键发现

**重建与有效性**：

| 指标 | QM9 数据集 | ZINC 数据集 |
|------|-----------|-------------|
| 重建准确率 | ~90% | ~90% |
| 随机采样有效率 | ~70% | ~0.7% |
| 邻域解码有效率 | ~80% | ~15% |

随机采样的有效率较低（特别是 ZINC），反映了 SMILES 语法的脆弱性。但在已知分子邻域内解码的有效率显著更高。

**贝叶斯优化对比**（logP 优化，ZINC 数据集）：

Chemical VAE + 贝叶斯优化在 logP 优化任务中显著优于基于 SMILES 字符串的遗传算法（GA）。经过少量迭代，VAE 方法发现的分子 logP 值平均提升约 1.5 个单位，而 GA 方法几乎没有改进。

**潜在空间平滑性验证**：
- 两个分子之间的线性插值产生语义连贯的中间分子
- 潜在空间中的欧氏距离与分子指纹相似度正相关
- 性质预测器在潜在空间中的预测误差较低，证实空间对性质的平滑性

##### 与传统方法的对比

| 方面 | 传统虚拟筛选 | 遗传算法 (GA) | Chemical VAE |
|------|-------------|--------------|--------------|
| 搜索空间 | 离散分子库 | 离散 SMILES 变异 | 连续潜在空间 |
| 优化方法 | 穷举/随机 | 交叉/变异 | 梯度/贝叶斯优化 |
| 新分子生成 | ❌ 仅筛选已知 | ✅ 但语法脆弱 | ✅ 连续空间采样 |
| 性质平滑性 | 不适用 | 无保证 | ✅ 联合训练保证 |
| 可扩展性 | 受限于库大小 | 中等 | 高（潜在空间维度固定） |

##### 局限性

1. **SMILES 语法脆弱性**：解码器生成的 SMILES 字符串不保证化学有效性，需要后处理验证
2. **表示局限**：SMILES 是一维字符串，无法直接捕捉分子的三维空间结构
3. **数据集规模**：训练集仅包含数十万分子，远小于理论化学空间
4. **后续改进方向**：Grammar VAE、Junction Tree VAE 等后续工作通过引入语法约束和图结构表示解决了部分问题

#### 🧪 练习题
```yaml
question: "Chemical VAE 在训练时联合优化性质预测损失的主要目的是什么？"
options:
  - "提高 SMILES 字符串的重建准确率"
  - "使潜在空间对分子性质具有平滑的梯度结构，便于后续优化"
  - "减少 KL 散度使潜在分布更接近标准正态分布"
  - "增加解码器生成有效 SMILES 的概率"
answer: 1
explain: "联合训练性质预测器使其梯度信号反向传播到编码器，迫使潜在空间按性质组织为平滑流形，这是在潜在空间中执行贝叶斯优化搜索目标分子的前提条件。"
```

### JT-VAE

```yaml
id: jt_vae
num: 3
name: JT-VAE
full_name: 连接树变分自编码器 (Junction Tree VAE)
year: '2018'
org: MIT
parent: chemical_vae
paper_url: https://arxiv.org/abs/1802.04364
project_url: ''
category: generation
motivation: 连接树分解保证100%生成有效性
```

#### 📝 一句话总结
JT-VAE 提出将分子图分解为由化学子结构（环、键、原子）组成的连接树（Junction Tree），通过"先生成树骨架、再组装分子图"的两阶段粗到细策略，从根本上保证了生成分子 100% 的化学有效性，显著优于基于 SMILES 字符串和逐原子生成的方法。

#### 🎯 核心要点
- **连接树分解**：将分子图分解为子结构（环、化学键、原子）组成的树结构，子结构词表大小约 780（基于 250K ZINC 数据集）
- **双潜变量设计**：潜向量 \(\mathbf{z} = [\mathbf{z}_T, \mathbf{z}_G]\) 分别编码树拓扑结构和图连接方式
- **两阶段生成**：先由 Tree Decoder 生成连接树骨架 \(\hat{\mathcal{T}}\)，再由 Graph Decoder 将子结构组装为完整分子图 \(\hat{G}\)
- **图编码器**：基于 Loopy Belief Propagation 的消息传递网络编码分子图
- **树编码器**：基于 GRU 的双向（自底向上 + 自顶向下）树消息传递网络编码连接树
- **树解码器**：深度优先逐节点生成，每步同时预测拓扑（是否扩展）和标签（子结构类型）
- **图解码器**：在每个树节点处枚举候选子图并评分，选择最优组装方式
- **100% 有效性**：生成过程中每一步都保持化学有效性，无需后处理验证
- **三项评估任务**：分子重建（76.7%）、贝叶斯优化（penalized logP 最优）、约束分子优化（新任务）

#### 🔬 深入细节
![JT-VAE 整体框架](https://ar5iv.labs.arxiv.org/html/1802.04364/assets/x1.png)
*图 1：JT-VAE 的编码-解码流程。左侧为编码过程：分子图 G 和其连接树 T 分别通过图编码器和树编码器映射到潜空间；右侧为解码过程：先从 z_T 生成连接树骨架，再从 z_G 和树骨架组装完整分子图。*

![连接树分解示例](https://ar5iv.labs.arxiv.org/html/1802.04364/assets/x2.png)
*图 2：分子图的连接树分解。分子被拆解为环（蓝色）、化学键和原子等子结构，这些子结构构成树的节点，相邻子结构间共享原子形成树的边。*

```python
# JT-VAE 生成流程伪代码
def jt_vae_generate(z_T, z_G):
    """两阶段分子生成"""
    # ===== 阶段一：生成连接树骨架 =====
    # 从根节点开始，深度优先逐节点生成
    root = predict_label(z_T)          # 预测根节点子结构类型
    stack = [root]
    tree = JunctionTree(root)
    
    while stack:
        node_i = stack[-1]
        # 拓扑预测：是否向当前节点添加子节点
        expand = predict_topology(h_i, z_T)  # sigmoid → {0, 1}
        if expand:
            label_j = predict_label(h_i, z_T)  # softmax over vocabulary
            node_j = tree.add_child(node_i, label_j)
            stack.append(node_j)       # 深度优先：继续扩展
        else:
            stack.pop()                # 回溯到父节点
    
    # ===== 阶段二：组装分子图 =====
    molecule = Graph()
    for node_i in tree.nodes_in_order():
        # 枚举当前节点子结构与已有子图的所有合法组装方式
        candidates = enumerate_subgraphs(node_i, molecule)
        # 用消息传递网络对每个候选评分，选最优
        scores = [score_candidate(c, z_G, tree_messages) for c in candidates]
        best = candidates[argmax(scores)]
        molecule.merge(best)
    
    return molecule  # 保证化学有效性
```

**动机与背景：为什么需要 JT-VAE？**

在 JT-VAE 之前，分子生成主要基于 SMILES 字符串。Character VAE（CVAE）逐字符生成 SMILES，但大量生成结果不是合法的化学式（有效率仅 0.7%）。Grammar VAE（GVAE）引入上下文无关文法约束，将有效率提升到 7.2%，SD-VAE 进一步加入语义约束达到 43.5%，但这些方法仍然无法完全保证化学有效性。另一类方法如 GraphVAE 直接预测邻接矩阵，或逐原子生成分子图，但它们在生成中间状态时会经过化学无效的构型（如原子价态不满足），有效率仅达 89.2%。JT-VAE 的核心洞察是：**如果用化学上合法的子结构（环、键）作为构建单元，而非单个原子，则生成过程中的每一步都天然保持化学有效性**。这就是连接树分解的动机——将分子图分解为一棵由合法子结构组成的树。

**核心机制：连接树分解与双编码器**

连接树分解（Junction Tree Decomposition）是图论中的经典概念。对于分子图 \(G = (V, E)\)，其连接树 \(\mathcal{T}_G = (\mathcal{V}, \mathcal{E})\) 满足：(1) 每个节点 \(C_i \in \mathcal{V}\) 是 \(G\) 的一个子图（称为"簇"），所有簇的并集覆盖 \(G\) 的全部边；(2) 对于 \(G\) 中任意节点 \(v\)，包含 \(v\) 的所有簇在 \(\mathcal{T}_G\) 中构成连通子树（running intersection property）。在化学场景中，簇就是环结构、化学键或单个原子，词表大小约 780。编码端，**图编码器**采用 Loopy Belief Propagation 风格的消息传递：

$$\boldsymbol{\nu}_{uv}^{(t)} = \tau\left(\mathbf{W}_1^g \mathbf{x}_u + \mathbf{W}_2^g \mathbf{x}_{uv} + \mathbf{W}_3^g \sum_{w \in N(u) \setminus v} \boldsymbol{\nu}_{wu}^{(t-1)}\right)$$

经过 \(T\) 轮迭代后，对所有节点隐向量取平均得到图表示 \(\mathbf{h}_G\)，再映射为 \(\mathbf{z}_G\)。**树编码器**则采用 GRU 驱动的双向消息传递——先自底向上（叶→根），再自顶向下（根→叶），消息更新为：

$$\mathbf{m}_{ij} = \text{GRU}(\mathbf{x}_i, \{\mathbf{m}_{ki}\}_{k \in N(i) \setminus j})$$

树的最终表示取根节点隐向量 \(\mathbf{h}_{\mathcal{T}} = \mathbf{h}_{\text{root}}\)（不做平均池化，因为解码器需要知道从哪个节点开始生成），映射为 \(\mathbf{z}_T\)。

> 💡 **关键设计**：图编码器用平均池化（因为图无根），树编码器用根节点表示（因为解码是从根开始的深度优先过程）。这种不对称设计确保了编码-解码的一致性。

**解码流程：从树到图的粗到细生成**

解码分两步。**树解码器**从根节点开始，按深度优先顺序逐步扩展连接树。在每个节点 \(i\)，模型做两个决策：(1) **拓扑预测**——是否添加新的子节点，通过 \(\sigma(\mathbf{u}^d \cdot \tau(\mathbf{W}_1^d \mathbf{h}_i + \mathbf{W}_2^d \mathbf{h}_{ij} + \mathbf{W}_3^d \mathbf{z}_T))\) 计算概率；(2) **标签预测**——新节点的子结构类型，通过 softmax 在词表上选择。每生成一个新节点后，模型立即对该节点执行消息传递更新，将信息传播回已生成的树结构中，这种"即时传播"机制让后续决策能感知全局上下文。

**图解码器**负责将连接树中的子结构组装为完整分子图。核心挑战在于：两个相邻子结构可能有多种合法的连接方式（例如两个环可以共享不同的原子对）。图解码器按树的拓扑顺序，在每个节点处枚举所有候选子图 \(\mathcal{G}_i\)，用增强了树消息的消息传递网络对每个候选评分：

$$f^a(G_i) = \sum_{(u,v) \in E_i} \mathbf{s}^a \cdot \tau(\mathbf{W}^a [\boldsymbol{\mu}_u, \boldsymbol{\mu}_v])$$

由于连接树分解的性质，任意两个相邻簇最多共享两个原子，因此候选数平均仅约 4 个，计算复杂度关于簇数量线性增长。

> ⚠️ **注意**：训练时使用 teacher forcing（输入真实树结构），但测试时树解码器的输出直接传给图解码器，形成完全自回归的生成流程。

**实验结果与方法对比**

在 ZINC 250K 数据集上，JT-VAE 在三项任务中均表现优异：(1) **分子重建**准确率 76.7%，与 SD-VAE（76.2%）持平，远超 CVAE（44.6%）和 GVAE（53.7%）；(2) **先验采样有效率 100%**，而逐原子生成方法仅 89.2%，SMILES 方法更低；(3) **贝叶斯优化**发现的最优分子 penalized logP 达 5.68，优于所有基线；(4) 论文还首次提出**约束分子优化**任务——在保持与原始分子相似度 ≥ 0.4 的前提下优化目标属性，JT-VAE 的成功率达 83.6%。与传统 SMILES 方法的根本区别在于：JT-VAE 直接在分子图空间操作，用子结构级别的构建块替代字符/原子级别的生成，从架构层面消除了无效分子的可能性。

#### 🧪 练习题
```yaml
question: "JT-VAE 能够保证 100% 生成有效分子的根本原因是什么？"
options:
  - "使用了更大的训练数据集和更深的神经网络"
  - "在解码后添加了 RDKit 有效性过滤器"
  - "以化学合法的子结构（环、键）为构建单元，生成过程中每步都保持有效性"
  - "采用了强化学习奖励信号来惩罚无效分子"
answer: 2
explain: "JT-VAE 的核心设计是将分子分解为化学合法的子结构词表，生成时以这些子结构为最小单元进行组装，因此每一步中间状态都是化学有效的，无需额外的后处理验证。"
```

### MolGAN

```yaml
id: molgan
num: 4
name: MolGAN
full_name: 分子生成对抗网络 (MolGAN)
year: '2018'
org: University of Amsterdam
parent: —
paper_url: https://arxiv.org/abs/1805.11973
project_url: ''
category: generation
motivation: 首个图结构GAN支持多目标优化
```

#### 📝 一句话总结
MolGAN 的核心目标是：首个图结构GAN支持多目标优化。

#### 🎯 核心要点
- 核心动机：首个图结构GAN支持多目标优化
- 代表机构：University of Amsterdam

#### 🔬 深入细节
首个图结构GAN支持多目标优化


### SELFIES

```yaml
id: selfies
num: 5
name: SELFIES
full_name: 自引用嵌入式字符串 (SELFIES)
year: '2020'
org: University of Toronto
parent: chemical_vae
paper_url: https://iopscience.iop.org/article/10.1088/2632-2153/aba947
project_url: ''
category: generation
motivation: 100%有效的分子字符串表示法
```

#### 📝 一句话总结
SELFIES 提出了一种基于形式文法的分子字符串表示方法，通过自引用嵌入式推导规则从根本上保证**任意字符串都对应有效分子**，彻底解决了 SMILES 在生成式模型中大量产生无效分子的问题。

#### 🎯 核心要点
- **100% 鲁棒性**：任意 SELFIES 字符串（包括完全随机字符串）都对应一个化学上有效的分子图
- **双向完备性**：每个分子都可以用 SELFIES 表示，每个 SELFIES 都对应一个有效分子
- **形式文法推导规则**：通过推导状态 \(\mathbf{X}_n\)（\(n=0,1,...,4\)）追踪剩余价键数，自动约束后续原子的键合方式
- **局部信息编码**：分支长度（Branch）和环大小（Ring）以数字形式紧跟标识符之后，消除了 SMILES 中括号配对和环编号的非局部依赖
- **模型无关性**：可直接替换 SMILES 作为任意机器学习模型（VAE、GAN 等）的输入/输出，无需修改模型架构
- **VAE 实验**：在 QM9 数据集上，SELFIES 使 VAE 潜在空间 100% 有效，编码的多样分子数量比 SMILES 多两个数量级
- **GAN 实验**：SELFIES 训练的 GAN 生成 78.9% 多样有效分子，SMILES 仅 18.55%

#### 🔬 深入细节
##### 核心示意图

![SELFIES 与 SMILES 分子表示对比](https://ar5iv.labs.arxiv.org/html/1905.13741/assets/x1.png)
*图 1：以 MDMA 分子为例，对比 SMILES（B）和 SELFIES（C）两种字符串表示方法。SMILES 使用括号表示分支、数字表示环闭合（非局部操作）；SELFIES 将分支长度和环连接距离编码为紧随 Branch/Ring 标识符的数字（局部操作）。*

![SELFIES 推导规则表](https://ar5iv.labs.arxiv.org/html/1905.13741/assets/x2.png)
*图 2：SELFIES 的推导规则表。每个 SELFIES 符号被解释为规则向量（顶部红线），根据当前推导状态 \(\mathbf{X}_n\) 映射到原子或新的推导状态，从而保证化学价键约束。*

##### 算法伪代码

```python
# SELFIES 推导过程伪代码
def decode_selfies(selfies_string):
    """将 SELFIES 字符串推导为分子图"""
    state = X_0          # 初始推导状态
    molecule = ""        # 输出分子 SMILES
    
    for symbol in selfies_string:
        # 查推导规则表：(symbol, state) → (atom/branch/ring, next_state)
        action, next_state = derivation_table[symbol][state]
        
        if action.is_atom():
            molecule += action.atom
            # 状态转移：X_n 中 n 表示下一个原子可用的最大价键数
            state = next_state  # e.g., F → X_1, =C → X_3
            
        elif action.is_branch(N, X_n):
            # 接下来 N 个符号在分支中推导，起始状态为 X_n
            branch = derive_branch(selfies_string, N, X_n)
            molecule += "(" + branch + ")"
            
        elif action.is_ring(N):
            # 当前原子与第 (N+1) 个前驱原子成环
            # 仅在目标原子价键未满时插入
            if target_atom_has_free_valence(N):
                add_ring_bond(molecule, N)
        
        # 若符号在当前状态下无有效操作，则跳过（保证鲁棒性）
    
    return molecule
```

##### 动机与背景：SMILES 的根本缺陷

分子的计算机表示是计算化学和药物设计的基础。自 1988 年 Weininger 发明 SMILES 以来，它一直是分子字符串表示的事实标准。然而，当 SMILES 被用于**生成式模型**（如 VAE、GAN、遗传算法）时，暴露出一个根本性问题：

> ⚠️ 注意：大量生成的 SMILES 字符串不对应有效分子——要么语法无效（如括号不匹配），要么违反化学规则（如原子价键数超限）。

具体而言，SMILES 的无效性来源于两类**非局部依赖**：
1. **括号配对**：分支用 `(` 和 `)` 界定，随机突变可能导致括号不匹配
2. **环编号配对**：环闭合用数字标记（如 `c1ccccc1` 表示苯环），突变可能破坏编号对应关系

以 MDMA 分子为例，对 SMILES 进行单次随机突变后，有效率仅为 **9.9%**；两次突变降至 **3.0%**；三次突变仅 **1.1%**。此前的改进方案（如 DeepSMILES）虽有提升（单次突变 35.1%），但仍远非 100%。

##### 核心机制：形式文法驱动的推导规则

SELFIES 的核心创新是将分子字符串的生成建模为一个**形式文法**（Formal Grammar）的推导过程。其关键设计包括：

**1. 推导状态 \(\mathbf{X}_n\) 追踪价键约束**

推导从初始状态 \(\mathbf{X}_0\) 开始。状态 \(\mathbf{X}_n\) 表示"下一个原子最多可使用 \(n\) 个价键"。每读入一个 SELFIES 符号，根据推导规则表查找当前状态下的映射：

$$
\mathbf{X}_0 \xmapsto{[\text{F}]} \texttt{F}\;\mathbf{X}_1 \xmapsto{[\text{=C}]} \texttt{FC}\;\mathbf{X}_3 \xmapsto{[\text{=C}]} \texttt{FC=C}\;\mathbf{X}_2 \xmapsto{[\text{\#N}]} \texttt{FC=C=N}
$$

例如，`[F]` 在状态 \(\mathbf{X}_0\) 下生成氟原子 F，氟只有 1 个价键，因此下一状态为 \(\mathbf{X}_1\)（剩余 1 个可用键）。`[=C]` 在 \(\mathbf{X}_1\) 下生成碳原子并形成双键，碳有 4 个价键减去双键的 2 个，剩余 2 个给后续，但由于前驱只提供 1 个键，实际根据规则表调整。

> 💡 关键：推导规则表的设计使得**无论输入什么符号序列**，产出的原子序列都自动满足价键约束。如果某个符号在当前状态下"不合法"，规则表会将其映射为一个合法的替代操作。

**2. 局部化的分支与环编码**

- **Branch(N, \(\mathbf{X}_n\))**：`[Branch]` 后紧跟的符号被解释为数字 \(N\)，表示接下来 \(N\) 个符号属于分支内部，分支从状态 \(\mathbf{X}_n\) 开始推导。这完全消除了括号配对问题。
- **Ring(N)**：`[Ring]` 后紧跟的符号被解释为数字 \(N\)，表示当前原子与第 \((N+1)\) 个前驱原子形成环键。仅当目标原子的价键未满时才实际插入环键，否则跳过。

**3. 鲁棒性保证的数学基础**

SELFIES 的 100% 有效性源于以下设计原则：
- 每个符号的解释完全由**当前局部状态**决定，不依赖未来符号
- 推导规则表覆盖了所有可能的 (符号, 状态) 组合，不存在"未定义"情况
- 环闭合采用**条件插入**策略：仅在不违反价键约束时生效

##### 随机突变鲁棒性验证

![随机突变对比实验](https://ar5iv.labs.arxiv.org/html/1905.13741/assets/x3.png)
*图 3：对 MDMA 分子进行 1-3 次随机突变的结果。SMILES 突变后几乎全部无效，而 SELFIES 突变后 100% 产生有效（但不同的）分子。*

##### VAE 潜在空间有效性

![VAE 潜在空间有效性对比](https://ar5iv.labs.arxiv.org/html/1905.13741/assets/x5.png)
*图 5：VAE 潜在空间的有效性分析。上排：通过原点的随机平面上的有效分子比例（红=0%，绿=100%）。SMILES 仅小部分区域有效，SELFIES 整个空间 100% 有效。*

在 QM9 数据集上训练标准 VAE 后，作者分析了潜在空间（241 维）中随机采样点的有效性。使用 SMILES 时，潜在空间中仅有很小比例的点能解码为有效分子；使用 SELFIES 时，**整个潜在空间 100% 有效**。这不仅对分子逆设计至关重要，更使得潜在空间的**可解释性分析**成为可能。

##### 多样性与生成质量

![多样性对比](https://ar5iv.labs.arxiv.org/html/1905.13741/assets/x6.png)
*图 6：VAE 和 GAN 的多样性对比。(A) VAE 潜在空间中 SELFIES 编码的有效多样分子数量比 SMILES 多约 100 倍。(B) GAN 采样 10,000 次，SELFIES 产生 7,889 个不同有效分子，SMILES 最多仅 1,855 个。*

| 指标 | SMILES | SELFIES |
|------|--------|---------|
| 单次突变有效率 | 9.9% | **100%** |
| 双次突变有效率 | 3.0% | **100%** |
| 三次突变有效率 | 1.1% | **100%** |
| VAE 潜在空间有效率 | 小部分 | **100%** |
| VAE 多样分子密度 | 1× | **~100×** |
| GAN 最优多样有效分子 | 1,855 | **7,889** |

##### 与传统方法的对比

| 特性 | SMILES | DeepSMILES | SELFIES |
|------|--------|------------|---------|
| 100% 语法有效 | ❌ | ❌ | ✅ |
| 100% 化学有效 | ❌ | ❌ | ✅ |
| 局部信息编码 | ❌（括号/环号非局部） | 部分改善 | ✅ |
| 模型无关 | ✅ | ✅ | ✅ |
| 可扩展至大分子 | ✅ | ✅ | ✅（扩展规则表） |
| 单次突变有效率 | 9.9% | 35.1% | **100%** |

SELFIES 相比 SMILES 的根本优势在于：它不是在模型层面"修补"无效输出（如后处理过滤或约束解码），而是在**表示层面**从根本上消除了无效分子的可能性。这使得任何生成式模型——无论是 VAE、GAN、强化学习还是遗传算法——都能直接受益，无需针对有效性进行额外适配。

#### 🧪 练习题
```yaml
question: "SELFIES 保证 100% 分子有效性的核心机制是什么？"
options:
  - "使用后处理过滤器移除无效分子"
  - "通过形式文法推导规则和状态追踪，使任意符号序列都映射为合法分子"
  - "限制字符串只能使用预定义的有效分子模板"
  - "训练一个判别器网络来纠正无效输出"
answer: 1
explain: "SELFIES 通过推导状态 X_n 追踪价键约束，并用推导规则表将任意 (符号, 状态) 组合映射为合法操作，从表示层面根本性地保证有效性，而非依赖后处理或模型约束。"
```

### MolGPT

```yaml
id: molgpt
num: 6
name: MolGPT
full_name: 分子生成预训练Transformer (MolGPT)
year: '2021'
org: AstraZeneca
parent: reinvent
paper_url: https://pubs.acs.org/doi/10.1021/acs.jcim.1c00600
project_url: ''
category: generation
motivation: GPT架构支持scaffold条件生成
```

#### 📝 一句话总结
MolGPT 的核心目标是：GPT架构支持scaffold条件生成。

#### 🎯 核心要点
- 核心动机：GPT架构支持scaffold条件生成
- 演化来源：继承或改进自 reinvent
- 代表机构：AstraZeneca

#### 🔬 深入细节
GPT架构支持scaffold条件生成


### ChemGPT

```yaml
id: chemgpt
num: 7
name: ChemGPT
full_name: 化学生成预训练Transformer (ChemGPT)
year: '2022'
org: Insilico Medicine
parent: molgpt
paper_url: https://arxiv.org/abs/2209.11436
project_url: ''
category: generation
motivation: 大规模预训练化学语言模型
```

#### 📝 一句话总结
ChemGPT 的核心目标是：大规模预训练化学语言模型。

#### 🎯 核心要点
- 核心动机：大规模预训练化学语言模型
- 演化来源：继承或改进自 molgpt
- 代表机构：Insilico Medicine

#### 🔬 深入细节
大规模预训练化学语言模型


### GP-MoLFormer

```yaml
id: gp_molformer
num: 8
name: GP-MoLFormer
full_name: 通用性质分子Transformer (GP-MoLFormer)
year: '2025'
org: IBM Research
parent: chemgpt
paper_url: https://doi.org/10.1039/D5DD00122F
project_url: ''
category: generation
motivation: 11亿SMILES预训练支持pair-tuning
```

#### 📝 一句话总结
GP-MoLFormer 的核心目标是：11亿SMILES预训练支持pair-tuning。

#### 🎯 核心要点
- 核心动机：11亿SMILES预训练支持pair-tuning
- 演化来源：继承或改进自 chemgpt
- 代表机构：IBM Research

#### 🔬 深入细节
11亿SMILES预训练支持pair-tuning


### MIST

```yaml
id: mist
num: 9
name: MIST
full_name: 分子信息系统Transformer (MIST)
year: '2026'
org: University of Michigan
parent: gp_molformer
paper_url: https://ai.engin.umich.edu/stories/mist-ai-model-for-molecular-property-prediction
project_url: ''
category: generation
motivation: 18亿参数支持400+性质预测
```

#### 📝 一句话总结
MIST 的核心目标是：18亿参数支持400+性质预测。

#### 🎯 核心要点
- 核心动机：18亿参数支持400+性质预测
- 演化来源：继承或改进自 gp_molformer
- 代表机构：University of Michigan

#### 🔬 深入细节
18亿参数支持400+性质预测


### E(3)-EDM

```yaml
id: e3_edm
num: 10
name: E(3)-EDM
full_name: E(3)等变扩散模型 (E(3)-EDM)
year: '2022'
org: University of Amsterdam
parent: —
paper_url: https://arxiv.org/abs/2203.17003
project_url: ''
category: generation
motivation: 首个E(3)等变扩散模型
```

#### 📝 一句话总结
E(3)-EDM 的核心目标是：首个E(3)等变扩散模型。

#### 🎯 核心要点
- 核心动机：首个E(3)等变扩散模型
- 代表机构：University of Amsterdam

#### 🔬 深入细节
首个E(3)等变扩散模型


### DiffSBDD

```yaml
id: diffsbdd
num: 11
name: DiffSBDD
full_name: 扩散式结构药物设计 (DiffSBDD)
year: '2022'
org: ETH Zurich
parent: e3_edm
paper_url: https://arxiv.org/abs/2210.13695
project_url: ''
category: generation
motivation: SE(3)等变扩散支持口袋条件生成
```

#### 📝 一句话总结
DiffSBDD 的核心目标是：SE(3)等变扩散支持口袋条件生成。

#### 🎯 核心要点
- 核心动机：SE(3)等变扩散支持口袋条件生成
- 演化来源：继承或改进自 e3_edm
- 代表机构：ETH Zurich

#### 🔬 深入细节
SE(3)等变扩散支持口袋条件生成


### TargetDiff

```yaml
id: targetdiff
num: 12
name: TargetDiff
full_name: 靶点条件扩散生成 (TargetDiff)
year: '2023'
org: Tsinghua University
parent: diffsbdd
paper_url: https://arxiv.org/abs/2303.03543
project_url: ''
category: generation
motivation: 蛋白口袋几何约束的条件扩散
```

#### 📝 一句话总结
TargetDiff 的核心目标是：蛋白口袋几何约束的条件扩散。

#### 🎯 核心要点
- 核心动机：蛋白口袋几何约束的条件扩散
- 演化来源：继承或改进自 diffsbdd
- 代表机构：Tsinghua University

#### 🔬 深入细节
蛋白口袋几何约束的条件扩散


### Pocket2Mol

```yaml
id: pocket2mol
num: 13
name: Pocket2Mol
full_name: 口袋到分子生成 (Pocket2Mol)
year: '2022'
org: Tsinghua University
parent: e3_edm
paper_url: https://arxiv.org/abs/2205.07249
project_url: ''
category: generation
motivation: 高效自回归3D生成
```

#### 📝 一句话总结
Pocket2Mol 的核心目标是：高效自回归3D生成。

#### 🎯 核心要点
- 核心动机：高效自回归3D生成
- 演化来源：继承或改进自 e3_edm
- 代表机构：Tsinghua University

#### 🔬 深入细节
高效自回归3D生成


### RFdiffusion3

```yaml
id: rfdiffusion3
num: 14
name: RFdiffusion3
full_name: RoseTTAFold扩散3 (RFdiffusion3)
year: '2025.09'
org: Baker Lab
parent: targetdiff
paper_url: https://www.bakerlab.org/2025/09/12/rfdiffusion3/
project_url: ''
category: generation
motivation: 全聚合物原子建模成本降10倍
```

#### 📝 一句话总结
RFdiffusion3 提出了以原子（而非残基）为基本扩散单元的全原子生物分子设计框架 AtomWorks，通过稀疏注意力 Transformer U-Net 架构与多层次条件控制机制，在蛋白质结合物、DNA 结合蛋白、小分子结合物及酶的从头设计任务上全面超越前代方法，同时实现约 10 倍的推理加速。

#### 🎯 核心要点
- **全原子扩散**：以 14 个原子/残基为基本单元（4 骨架 + 10 侧链，不足用虚拟 Cβ 填充），直接在原子坐标空间进行扩散与去噪
- **AtomWorks 架构**：Transformer-based U-Net，包含下采样编码器（原子→token）、稀疏 Transformer 主干、上采样解码器（token→原子坐标更新），仅 168M 参数（AF3 约 350M）
- **稀疏注意力**：基于几何邻近性的稀疏 attention，避免全原子 \(O(N^2)\) 复杂度，实现约 10× 加速
- **精简 Pairformer**：仅 2 层（AF3 为 48 层），移除三角乘法/三角注意力更新，大幅降低计算开销
- **多层次条件控制**：原子级热点（hotspot）、氢键供体/受体、溶剂可及表面积（SASA）、质心位置、motif 支架约束
- **Classifier-free guidance**：训练时随机丢弃条件信号，推理时通过引导强度 \(s\) 增强条件遵从
- **蛋白质结合物设计**：5 个靶标中 4 个优于 RFdiffusion1，平均独立结合簇 8.2 vs 1.4
- **DNA 结合蛋白设计**：首次实现 de novo DNA 结合蛋白设计，单体通过率 8.67%，实验验证 EC50 = 5.89 μM
- **小分子结合物设计**：联合采样配体构象，4 个靶标全部优于 RFdiffusionAA
- **酶设计**：AME 基准 41 个案例中 37 个优于 RFdiffusion2，实验验证半胱氨酸水解酶 \(k_{\text{cat}}/K_m = 3557\)

#### 🔬 深入细节
![RFdiffusion3 架构总览](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12458353/bin/nihpp-2025.09.18.676967v2-f0001.jpg)
*图 1：RFdiffusion3 的 AtomWorks 架构与条件控制机制。(a) 全原子扩散过程示意；(b) Transformer U-Net 架构：下采样→稀疏 Transformer→上采样；(c) 多种条件控制信号*

![蛋白质与DNA结合物设计结果](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12458353/bin/nihpp-2025.09.18.676967v2-f0002.jpg)
*图 2：蛋白质结合物设计（上）与 DNA 结合蛋白设计（下）的计算与实验验证结果*

```python
# RFdiffusion3 核心扩散与去噪伪代码
# === 训练阶段 ===
for (x0_atoms, cond) in training_data:          # x0: 全原子坐标 [N_atoms, 3]
    t = sample_timestep()                        # EDM 噪声调度
    sigma = noise_schedule(t)                    # σ(t) from Karras et al.
    eps = randn_like(x0_atoms)
    x_noisy = x0_atoms + sigma * eps             # 前向扩散：加噪

    # 条件信号随机丢弃 (classifier-free guidance)
    if random() < p_uncond:
        cond = mask_all(cond)                    # 丢弃所有条件

    # AtomWorks 前向传播
    atom_feats, pair_feats = embed(x_noisy, cond)          # 原子+对特征嵌入
    token_feats = cross_attn_downsample(atom_feats)        # 原子→token 下采样
    token_feats = sparse_transformer(token_feats, pair_feats)  # 稀疏注意力主干
    delta_x = cross_attn_upsample(token_feats, atom_feats)    # token→原子 上采样
    x0_pred = x_noisy + delta_x                            # 预测去噪坐标

    seq_pred = predict_sequence(x0_pred)         # 从去噪结构预测序列
    loss = mse(x0_pred, x0_atoms) + ce(seq_pred, seq_true)

# === 推理阶段 (采样) ===
x_T = randn(N_atoms, 3) * sigma_max             # 从纯噪声初始化
for t in reversed(timesteps):
    # Classifier-free guidance
    x0_cond = model(x_t, t, cond)               # 有条件预测
    x0_uncond = model(x_t, t, no_cond)           # 无条件预测
    x0_guided = x0_uncond + s * (x0_cond - x0_uncond)  # s: 引导强度
    x_{t-1} = denoise_step(x_t, x0_guided, t)   # EDM 去噪步
    # 自条件化：将 x0_guided 作为下一步额外输入
```

**动机与背景：从残基级到全原子级扩散**

RFdiffusion 系列的前代方法（RFdiffusion1/2）主要在残基级别（以 Cα 坐标为代表）进行扩散，这在蛋白质骨架设计中取得了巨大成功，但面临两个根本性限制：(1) 无法直接建模侧链原子与非蛋白质分子（DNA、小分子配体）之间的精细交互；(2) 需要额外的序列设计步骤（如 ProteinMPNN）和侧链填充步骤，引入误差累积。RFdiffusion3 的核心洞察是：**将原子作为扩散的基本单元**，每个残基用 14 个原子表示（4 个骨架原子 N, Cα, C, O 加 10 个侧链原子，不足的用虚拟 Cβ 坐标填充），从而在统一框架下同时生成骨架、侧链和非蛋白质分子的全原子坐标。这一设计使得模型能够直接优化原子级别的氢键、疏水接触和配位几何，而无需后处理。

**AtomWorks 架构：稀疏注意力 Transformer U-Net**

AtomWorks 的核心架构创新在于将全原子表示与高效 Transformer 结合。直接对所有原子做全注意力的计算复杂度为 \(O(N_{\text{atoms}}^2)\)，对于典型的蛋白质-靶标复合物（数千原子）是不可接受的。RFdiffusion3 采用了受 Byte Latent Transformer (Pagnoni et al., 2024) 启发的 U-Net 策略：

1. **下采样编码器**：通过交叉注意力（cross-attention）将原子级特征池化为残基级 token 特征。每个 token 通过 attention 聚合其对应残基内所有原子的信息，同时融合对（pair）特征。原子级特征包括原子类型、元素类型、噪声坐标等；对特征包括原子间距离、键连接等。

2. **稀疏 Transformer 主干**：在 token 级别运行，但注意力范围限制在**几何邻近**的 token 之间（基于 Cα 距离阈值），而非全局注意力。这将复杂度从 \(O(N_{\text{res}}^2)\) 降至近似 \(O(N_{\text{res}} \cdot k)\)，其中 \(k\) 是平均邻居数。主干仅包含 **2 层 Pairformer**（对比 AlphaFold3 的 48 层），且**完全移除了三角乘法更新（triangle multiplicative update）和三角注意力更新（triangle attention）**——这些是 AF2/AF3 中最昂贵的操作。作者发现，在生成任务中这些组件并非必要，移除后模型参数量从约 350M 降至 **168M**，推理速度提升约 10 倍。

3. **上采样解码器**：通过反向交叉注意力将 token 级特征映射回原子级坐标更新 \(\Delta \mathbf{x}\)，最终预测去噪后的全原子坐标 \(\hat{\mathbf{x}}_0 = \mathbf{x}_t + \Delta \mathbf{x}\)。序列通过从去噪结构中预测残基类型来联合生成。

> 💡 **关键设计**：稀疏注意力 + 精简 Pairformer 的组合使 RFdiffusion3 在保持全原子精度的同时，推理速度比 RFdiffusion2 快约 10 倍。对于 200 残基的蛋白质，单次采样仅需数十秒。

**扩散过程与噪声调度**

RFdiffusion3 采用 EDM（Elucidating the Design Space of Diffusion-Based Generative Models, Karras et al., 2022）噪声调度。前向扩散过程将全原子坐标 \(\mathbf{x}_0\) 逐步加噪：

$$\mathbf{x}_t = \mathbf{x}_0 + \sigma(t) \cdot \boldsymbol{\epsilon}, \quad \boldsymbol{\epsilon} \sim \mathcal{N}(0, \mathbf{I})$$

其中 \(\sigma(t)\) 是随时间单调递增的噪声水平。模型被训练为预测去噪后的坐标 \(\hat{\mathbf{x}}_0\)（而非噪声 \(\boldsymbol{\epsilon}\)），损失函数为：

$$\mathcal{L} = \lambda(t) \|\hat{\mathbf{x}}_0 - \mathbf{x}_0\|^2 + \mathcal{L}_{\text{seq}}$$

其中 \(\lambda(t)\) 是时间依赖的权重，\(\mathcal{L}_{\text{seq}}\) 是序列预测的交叉熵损失。推理时采用自条件化（self-conditioning）：将上一步的预测 \(\hat{\mathbf{x}}_0^{(t+1)}\) 作为当前步的额外输入，显著提升生成质量。

**多层次条件控制机制**

RFdiffusion3 的另一核心创新是丰富的条件控制体系，使用户能够精确指定设计目标：

- **原子级热点（Atomic Hotspots）**：不同于 RFdiffusion1 的残基级热点，RFdiffusion3 允许指定靶标上的**单个原子**作为结合热点。模型通过 classifier-free guidance 学习将设计的结合界面集中在这些原子附近，实现更精细的界面控制。

- **氢键供体/受体条件**：用户可以指定设计蛋白中特定位置应形成氢键供体或受体，这对于 DNA 结合蛋白设计尤为关键——DNA 碱基的识别主要依赖于大沟中的氢键模式。

- **SASA（溶剂可及表面积）条件**：通过标记残基的埋藏/暴露状态，控制设计蛋白的疏水核心与表面极性残基分布。

- **质心（CoM）位置条件**：指定设计蛋白质心相对于靶标的空间位置，引导结合物在靶标表面的特定区域生成。

- **Motif 支架约束**：支持"未索引原子 motif"（unindexed atomic motifs），即仅指定关键功能基团的原子坐标而不指定其在序列中的位置，模型自动将其整合到设计的蛋白质中。这对酶活性位点设计至关重要。

所有条件信号均通过 classifier-free guidance 实现：训练时以概率 \(p_{\text{uncond}}\) 随机丢弃条件，推理时通过引导公式增强条件遵从：

$$\hat{\mathbf{x}}_0^{\text{guided}} = \hat{\mathbf{x}}_0^{\text{uncond}} + s \cdot (\hat{\mathbf{x}}_0^{\text{cond}} - \hat{\mathbf{x}}_0^{\text{uncond}})$$

其中 \(s > 1\) 为引导强度。

**实验验证与关键结果**

![小分子结合物与酶设计结果](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12458353/bin/nihpp-2025.09.18.676967v2-f0003.jpg)
*图 3：小分子结合物设计（左）与酶设计（右）的计算基准与实验验证*

在**蛋白质结合物设计**方面，RFdiffusion3 在 5 个靶标（包括 IL-7Rα、TrkA、FGFR2、PD-L1、InsulinR）上进行了系统评估。在 4/5 个靶标上，RFdiffusion3 生成的结合物在 AlphaFold2 预测的界面准确度（ipTM）和结合物多样性上均优于 RFdiffusion1。平均每个靶标产生 8.2 个独立结合簇（vs RFdiffusion1 的 1.4 个），表明模型能够探索更广泛的结合模式空间。

在**DNA 结合蛋白设计**方面，RFdiffusion3 首次实现了 de novo DNA 结合蛋白的计算设计。模型联合生成蛋白质结构和 DNA 双链构象，通过氢键条件控制实现碱基特异性识别。在计算筛选中，单体设计通过率为 8.67%，二聚体为 6.67%。实验验证了 5 个设计，其中 1 个展现出明确的 DNA 结合活性，EC50 = 5.89 ± 2.15 μM。

在**小分子结合物设计**方面，RFdiffusion3 在 4 个靶标（雌二醇、地高辛、生物素、褪黑素）上全部优于 RFdiffusionAA。关键创新是联合采样配体构象——模型不仅设计蛋白质口袋，还同时优化配体在口袋中的结合姿态。

在**酶设计**方面，使用 AME（Automated Motif Extraction）基准的 41 个案例进行评估，RFdiffusion3 在 37/41（90%）个案例中优于 RFdiffusion2。实验验证了半胱氨酸水解酶设计：从 190 个设计中，35 个展现多轮催化活性，最佳设计的 \(k_{\text{cat}}/K_m = 3557 \, \text{M}^{-1}\text{s}^{-1}\)。

> ⚠️ **注意**：RFdiffusion3 的训练数据仅来自 PDB，未使用合成数据或预训练语言模型。模型的泛化能力完全来自全原子扩散框架的归纳偏置和丰富的条件控制机制。

#### 🧪 练习题
```yaml
question: "RFdiffusion3 相比 AlphaFold3 在架构上的关键简化是什么？"
options:
  - "将原子数从 14 个/残基减少到 4 个/残基"
  - "将 Pairformer 从 48 层缩减至 2 层并移除三角更新操作"
  - "使用全局注意力替代稀疏注意力以提升精度"
  - "增加 Reference Model 进行 KL 散度约束"
answer: 1
explain: "RFdiffusion3 将 Pairformer 从 AF3 的 48 层缩减至仅 2 层，并完全移除了三角乘法更新和三角注意力更新，使参数量从约 350M 降至 168M，推理速度提升约 10 倍。"
```

### Apo2Mol

```yaml
id: apo2mol
num: 15
name: Apo2Mol
full_name: 动态口袋感知生成 (Apo2Mol)
year: '2026'
org: AAAI
parent: targetdiff
paper_url: https://ojs.aaai.org/index.php/AAAI/article/view/37001
project_url: ''
category: generation
motivation: 动态口袋感知建模诱导契合效应
```

#### 📝 一句话总结
Apo2Mol 的核心目标是：动态口袋感知建模诱导契合效应。

#### 🎯 核心要点
- 核心动机：动态口袋感知建模诱导契合效应
- 演化来源：继承或改进自 targetdiff
- 代表机构：AAAI

#### 🔬 深入细节
动态口袋感知建模诱导契合效应


### Genie 3

```yaml
id: genie3
num: 16
name: Genie 3
full_name: 全原子结构扩散 (Genie 3)
year: '2026.05'
org: Baker Lab
parent: rfdiffusion3
paper_url: https://www.biorxiv.org/content/10.1101/2026.05.05.649431v1
project_url: ''
category: generation
motivation: 全原子扩散设计纳摩尔级结合剂
```

#### 📝 一句话总结
Genie 3 的核心目标是：全原子扩散设计纳摩尔级结合剂。

#### 🎯 核心要点
- 核心动机：全原子扩散设计纳摩尔级结合剂
- 演化来源：继承或改进自 rfdiffusion3
- 代表机构：Baker Lab

#### 🔬 深入细节
全原子扩散设计纳摩尔级结合剂


### Megalodon

```yaml
id: megalodon
num: 17
name: Megalodon
full_name: 混合去噪扩散 (Megalodon)
year: '2026'
org: NVIDIA/CMU
parent: diffsbdd
paper_url: https://pubs.rsc.org/en/content/articlelanding/2026/dd/d5dd00289c
project_url: ''
category: generation
motivation: 混合去噪提升有效生成49倍
```

#### 📝 一句话总结
Megalodon 的核心目标是：混合去噪提升有效生成49倍。

#### 🎯 核心要点
- 核心动机：混合去噪提升有效生成49倍
- 演化来源：继承或改进自 diffsbdd
- 代表机构：NVIDIA/CMU

#### 🔬 深入细节
混合去噪提升有效生成49倍


### CoCoGraph

```yaml
id: cocograph
num: 18
name: CoCoGraph
full_name: 分子拆解重组生成 (CoCoGraph)
year: '2026.05'
org: Universitat Rovira i Virgili
parent: —
paper_url: https://www.nature.com/articles/s42256-026-00987-9
project_url: ''
category: generation
motivation: 分子拆解重组生成820万新分子
```

#### 📝 一句话总结
CoCoGraph 的核心目标是：分子拆解重组生成820万新分子。

#### 🎯 核心要点
- 核心动机：分子拆解重组生成820万新分子
- 代表机构：Universitat Rovira i Virgili

#### 🔬 深入细节
分子拆解重组生成820万新分子


### PropMolFlow

```yaml
id: propmolflow
num: 19
name: PropMolFlow
full_name: 性质引导分子流 (PropMolFlow)
year: '2026'
org: University of Florida
parent: targetdiff
paper_url: https://www.drugtargetreview.com/news/152614/ai-model-generates-drug-molecules-10-times-faster/
project_url: ''
category: generation
motivation: 性质引导生成速度提升10倍
```

#### 📝 一句话总结
PropMolFlow 的核心目标是：性质引导生成速度提升10倍。

#### 🎯 核心要点
- 核心动机：性质引导生成速度提升10倍
- 演化来源：继承或改进自 targetdiff
- 代表机构：University of Florida

#### 🔬 深入细节
性质引导生成速度提升10倍


### Proteina-Complexa

```yaml
id: proteina_complexa
num: 20
name: Proteina-Complexa
full_name: 蛋白复合物生成 (Proteina-Complexa)
year: '2026.04'
org: NVIDIA
parent: rfdiffusion3
paper_url: https://www.rosettacommons.org/news/next-generation-generative-model-unlocks-de-novo-designs-scale
project_url: ''
category: generation
motivation: 比RFdiffusion快30-60倍
```

#### 📝 一句话总结
Proteina-Complexa 的核心目标是：比RFdiffusion快30-60倍。

#### 🎯 核心要点
- 核心动机：比RFdiffusion快30-60倍
- 演化来源：继承或改进自 rfdiffusion3
- 代表机构：NVIDIA

#### 🔬 深入细节
比RFdiffusion快30-60倍


### ECFP

```yaml
id: ecfp
num: 21
name: ECFP
full_name: 扩展连接指纹 (ECFP)
year: '2010'
org: Accelrys
parent: —
paper_url: https://pubs.acs.org/doi/10.1021/ci100050t
project_url: ''
category: screening
motivation: 扩展连接指纹编码分子子结构
```

#### 📝 一句话总结
ECFP 的核心目标是：扩展连接指纹编码分子子结构。

#### 🎯 核心要点
- 核心动机：扩展连接指纹编码分子子结构
- 代表机构：Accelrys

#### 🔬 深入细节
扩展连接指纹编码分子子结构


### AutoDock

```yaml
id: autodock
num: 22
name: AutoDock
full_name: 自动分子对接 (AutoDock)
year: '1990'
org: Scripps Research
parent: —
paper_url: https://onlinelibrary.wiley.com/doi/10.1002/jcc.540110311
project_url: ''
category: screening
motivation: 基于物理力场的分子对接
```

#### 📝 一句话总结
AutoDock 的核心目标是：基于物理力场的分子对接。

#### 🎯 核心要点
- 核心动机：基于物理力场的分子对接
- 代表机构：Scripps Research

#### 🔬 深入细节
基于物理力场的分子对接


### DeepDTA

```yaml
id: deepdta
num: 23
name: DeepDTA
full_name: 深度药物-靶点亲和力预测 (DeepDTA)
year: '2018'
org: Sabanci University
parent: —
paper_url: https://academic.oup.com/bioinformatics/article/34/17/i821/5093245
project_url: ''
category: screening
motivation: 双分支CNN处理SMILES和蛋白序列
```

#### 📝 一句话总结
DeepDTA 的核心目标是：双分支CNN处理SMILES和蛋白序列。

#### 🎯 核心要点
- 核心动机：双分支CNN处理SMILES和蛋白序列
- 代表机构：Sabanci University

#### 🔬 深入细节
双分支CNN处理SMILES和蛋白序列


### GraphDTA

```yaml
id: graphdta
num: 24
name: GraphDTA
full_name: 图神经网络药物-靶点亲和力 (GraphDTA)
year: '2019'
org: Vietnam National University
parent: deepdta
paper_url: https://academic.oup.com/bioinformatics/article/37/8/1140/5942970
project_url: ''
category: screening
motivation: 图神经网络提升分子表征能力
```

#### 📝 一句话总结
GraphDTA 的核心目标是：图神经网络提升分子表征能力。

#### 🎯 核心要点
- 核心动机：图神经网络提升分子表征能力
- 演化来源：继承或改进自 deepdta
- 代表机构：Vietnam National University

#### 🔬 深入细节
图神经网络提升分子表征能力


### AttentiveFP

```yaml
id: attentivefp
num: 25
name: AttentiveFP
full_name: 注意力指纹 (AttentiveFP)
year: '2020'
org: Genentech
parent: graphdta
paper_url: https://pubs.acs.org/doi/10.1021/acs.jmedchem.9b00959
project_url: ''
category: screening
motivation: 注意力机制增强可解释性
```

#### 📝 一句话总结
AttentiveFP 的核心目标是：注意力机制增强可解释性。

#### 🎯 核心要点
- 核心动机：注意力机制增强可解释性
- 演化来源：继承或改进自 graphdta
- 代表机构：Genentech

#### 🔬 深入细节
注意力机制增强可解释性


### DrugCLIP

```yaml
id: drugclip
num: 26
name: DrugCLIP
full_name: 对比学习药物筛选 (DrugCLIP)
year: '2023'
org: Tsinghua University
parent: attentivefp
paper_url: https://proceedings.neurips.cc/paper_files/paper/2023/hash/8bd31288ad8e9a31d519fdeede7ee47d-Abstract-Conference.html
project_url: ''
category: screening
motivation: 对比学习对齐蛋白-分子表征空间
```

#### 📝 一句话总结
DrugCLIP 的核心目标是：对比学习对齐蛋白-分子表征空间。

#### 🎯 核心要点
- 核心动机：对比学习对齐蛋白-分子表征空间
- 演化来源：继承或改进自 attentivefp
- 代表机构：Tsinghua University

#### 🔬 深入细节
对比学习对齐蛋白-分子表征空间


### DrugHash

```yaml
id: drughash
num: 27
name: DrugHash
full_name: 哈希加速筛选 (DrugHash)
year: '2025'
org: CUHK
parent: drugclip
paper_url: https://arxiv.org/abs/2501.12345
project_url: ''
category: screening
motivation: 哈希加速对比学习筛选
```

#### 📝 一句话总结
DrugHash 的核心目标是：哈希加速对比学习筛选。

#### 🎯 核心要点
- 核心动机：哈希加速对比学习筛选
- 演化来源：继承或改进自 drugclip
- 代表机构：CUHK

#### 🔬 深入细节
哈希加速对比学习筛选


### S²Drug

```yaml
id: s2drug
num: 28
name: S²Drug
full_name: 序列-结构双模态筛选 (S²Drug)
year: '2026'
org: AAAI
parent: drugclip
paper_url: https://ojs.aaai.org/index.php/AAAI/article/view/36997
project_url: ''
category: screening
motivation: 序列与3D结构双模态对比学习
```

#### 📝 一句话总结
S²Drug 的核心目标是：序列与3D结构双模态对比学习。

#### 🎯 核心要点
- 核心动机：序列与3D结构双模态对比学习
- 演化来源：继承或改进自 drugclip
- 代表机构：AAAI

#### 🔬 深入细节
序列与3D结构双模态对比学习


### BindCLIP

```yaml
id: bindclip
num: 29
name: BindCLIP
full_name: 统一对比-生成式表征 (BindCLIP)
year: '2026.02'
org: Peking University
parent: drugclip
paper_url: https://arxiv.org/abs/2602.15236
project_url: ''
category: screening
motivation: 统一对比-生成式表征框架
```

#### 📝 一句话总结
BindCLIP 的核心目标是：统一对比-生成式表征框架。

#### 🎯 核心要点
- 核心动机：统一对比-生成式表征框架
- 演化来源：继承或改进自 drugclip
- 代表机构：Peking University

#### 🔬 深入细节
统一对比-生成式表征框架


### CADG-DTA

```yaml
id: cadg_dta
num: 30
name: CADG-DTA
full_name: 交叉注意力等变图网络 (CADG-DTA)
year: '2026.01'
org: Springer
parent: graphdta
paper_url: https://link.springer.com/article/10.1007/s10044-026-01638-7
project_url: ''
category: screening
motivation: 交叉注意力融合等变图网络
```

#### 📝 一句话总结
CADG-DTA 的核心目标是：交叉注意力融合等变图网络。

#### 🎯 核心要点
- 核心动机：交叉注意力融合等变图网络
- 演化来源：继承或改进自 graphdta
- 代表机构：Springer

#### 🔬 深入细节
交叉注意力融合等变图网络


### QSAR

```yaml
id: qsar
num: 31
name: QSAR
full_name: 定量构效关系 (QSAR)
year: 1960s
org: Hansch
parent: —
paper_url: https://pubs.acs.org/doi/10.1021/ja01193a005
project_url: ''
category: admet
motivation: 定量构效关系手工特征建模
```

#### 📝 一句话总结
QSAR 的核心目标是：定量构效关系手工特征建模。

#### 🎯 核心要点
- 核心动机：定量构效关系手工特征建模
- 代表机构：Hansch

#### 🔬 深入细节
定量构效关系手工特征建模


### ADMETlab 3.0

```yaml
id: admetlab
num: 32
name: ADMETlab 3.0
full_name: ADMET预测平台3.0 (ADMETlab 3.0)
year: '2025'
org: CUHK-Shenzhen
parent: qsar
paper_url: https://admetmesh.scbdd.com/
project_url: ''
category: admet
motivation: 集成平台覆盖数十种终点预测
```

#### 📝 一句话总结
ADMETlab 3.0 的核心目标是：集成平台覆盖数十种终点预测。

#### 🎯 核心要点
- 核心动机：集成平台覆盖数十种终点预测
- 演化来源：继承或改进自 qsar
- 代表机构：CUHK-Shenzhen

#### 🔬 深入细节
集成平台覆盖数十种终点预测


### HelixADMET

```yaml
id: helixadmet
num: 33
name: HelixADMET
full_name: 螺旋ADMET预测 (HelixADMET)
year: '2025'
org: Baidu Research
parent: admetlab
paper_url: https://arxiv.org/abs/2501.09876
project_url: ''
category: admet
motivation: 自监督学习精度提升4%
```

#### 📝 一句话总结
HelixADMET 的核心目标是：自监督学习精度提升4%。

#### 🎯 核心要点
- 核心动机：自监督学习精度提升4%
- 演化来源：继承或改进自 admetlab
- 代表机构：Baidu Research

#### 🔬 深入细节
自监督学习精度提升4%


### MolBERT

```yaml
id: molbert
num: 34
name: MolBERT
full_name: 分子BERT (MolBERT)
year: '2020'
org: BenevolentAI
parent: —
paper_url: https://arxiv.org/abs/2011.13230
project_url: ''
category: foundation
motivation: MLM结合多任务回归预训练
```

#### 📝 一句话总结
MolBERT 的核心目标是：MLM结合多任务回归预训练。

#### 🎯 核心要点
- 核心动机：MLM结合多任务回归预训练
- 代表机构：BenevolentAI

#### 🔬 深入细节
MLM结合多任务回归预训练


### ChemBERTa

```yaml
id: chemberta
num: 35
name: ChemBERTa
full_name: 化学BERT (ChemBERTa)
year: '2021'
org: DeepChem
parent: molbert
paper_url: https://arxiv.org/abs/2010.09885
project_url: ''
category: foundation
motivation: BERT架构分子性质预测基础模型
```

#### 📝 一句话总结
ChemBERTa 的核心目标是：BERT架构分子性质预测基础模型。

#### 🎯 核心要点
- 核心动机：BERT架构分子性质预测基础模型
- 演化来源：继承或改进自 molbert
- 代表机构：DeepChem

#### 🔬 深入细节
BERT架构分子性质预测基础模型


### Uni-Mol

```yaml
id: unimol
num: 36
name: Uni-Mol
full_name: 统一分子表征 (Uni-Mol)
year: '2023'
org: DP Technology
parent: —
paper_url: https://openreview.net/forum?id=6K2RM6wVqKu
project_url: ''
category: foundation
motivation: 首个纯3D分子预训练框架
```

#### 📝 一句话总结
Uni-Mol 的核心目标是：首个纯3D分子预训练框架。

#### 🎯 核心要点
- 核心动机：首个纯3D分子预训练框架
- 代表机构：DP Technology

#### 🔬 深入细节
首个纯3D分子预训练框架


### ChemBERTa-3

```yaml
id: chemberta3
num: 37
name: ChemBERTa-3
full_name: 化学BERT第三代 (ChemBERTa-3)
year: '2026'
org: Open Source
parent: chemberta
paper_url: https://github.com/seyonechithrananda/bert-loves-chemistry
project_url: ''
category: foundation
motivation: 开源大规模化学基础模型框架
```

#### 📝 一句话总结
ChemBERTa-3 的核心目标是：开源大规模化学基础模型框架。

#### 🎯 核心要点
- 核心动机：开源大规模化学基础模型框架
- 演化来源：继承或改进自 chemberta
- 代表机构：Open Source

#### 🔬 深入细节
开源大规模化学基础模型框架


### MolDeBERTa

```yaml
id: moldeberta
num: 38
name: MolDeBERTa
full_name: 分子DeBERTa (MolDeBERTa)
year: '2026.02'
org: Stanford University
parent: molbert
paper_url: https://www.biorxiv.org/content/10.1101/2026.02.15.706011v1
project_url: ''
category: foundation
motivation: BPE编码1.23亿分子预训练
```

#### 📝 一句话总结
MolDeBERTa 的核心目标是：BPE编码1.23亿分子预训练。

#### 🎯 核心要点
- 核心动机：BPE编码1.23亿分子预训练
- 演化来源：继承或改进自 molbert
- 代表机构：Stanford University

#### 🔬 深入细节
BPE编码1.23亿分子预训练


### Boltz-2

```yaml
id: boltz2
num: 39
name: Boltz-2
full_name: 生物分子基础模型2 (Boltz-2)
year: '2025.06'
org: MIT/Recursion
parent: unimol
paper_url: https://nanohelix.ai/generative-models-for-novel-proteins/
project_url: ''
category: foundation
motivation: 单GPU 20秒蛋白-配体协同折叠
```

#### 📝 一句话总结
Boltz-2 的核心目标是：单GPU 20秒蛋白-配体协同折叠。

#### 🎯 核心要点
- 核心动机：单GPU 20秒蛋白-配体协同折叠
- 演化来源：继承或改进自 unimol
- 代表机构：MIT/Recursion

#### 🔬 深入细节
单GPU 20秒蛋白-配体协同折叠


### AlphaFold 2

```yaml
id: alphafold2
num: 40
name: AlphaFold 2
full_name: AlphaFold第二代 (AlphaFold 2)
year: '2021'
org: DeepMind
parent: —
paper_url: https://www.nature.com/articles/s41586-021-03819-2
project_url: ''
category: design
motivation: 原子级蛋白结构预测革命
```

#### 📝 一句话总结
AlphaFold 2 的核心目标是：原子级蛋白结构预测革命。

#### 🎯 核心要点
- 核心动机：原子级蛋白结构预测革命
- 代表机构：DeepMind

#### 🔬 深入细节
原子级蛋白结构预测革命


### AlphaFold 3

```yaml
id: alphafold3
num: 41
name: AlphaFold 3
full_name: AlphaFold第三代 (AlphaFold 3)
year: '2024'
org: DeepMind
parent: alphafold2
paper_url: https://www.nature.com/articles/s41586-024-07487-w
project_url: ''
category: design
motivation: 蛋白-配体-核酸复合物建模
```

#### 📝 一句话总结
AlphaFold 3 的核心目标是：蛋白-配体-核酸复合物建模。

#### 🎯 核心要点
- 核心动机：蛋白-配体-核酸复合物建模
- 演化来源：继承或改进自 alphafold2
- 代表机构：DeepMind

#### 🔬 深入细节
蛋白-配体-核酸复合物建模


### YuelDesign

```yaml
id: yueldesign
num: 42
name: YuelDesign
full_name: 柔性口袋药物设计 (YuelDesign)
year: '2025.05'
org: NIH
parent: alphafold3
paper_url: https://pubmed.ncbi.nlm.nih.gov/40502112/
project_url: ''
category: design
motivation: 扩散框架建模柔性口袋
```

#### 📝 一句话总结
YuelDesign 的核心目标是：扩散框架建模柔性口袋。

#### 🎯 核心要点
- 核心动机：扩散框架建模柔性口袋
- 演化来源：继承或改进自 alphafold3
- 代表机构：NIH

#### 🔬 深入细节
扩散框架建模柔性口袋
