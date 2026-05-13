### Chemical VAE — 化学变分自编码器 (Chemical Variational Autoencoder)

```yaml
id: chemical_vae
name: Chemical VAE
full_name: "化学变分自编码器 (Chemical Variational Autoencoder)"
year: 2018
org: Harvard
paper_url: "https://arxiv.org/abs/1610.02415"
category: ai4medicine
parent: VAE
motivation: "将离散分子 SMILES 表示映射到连续潜在空间，实现基于梯度的分子性质优化与自动化学设计"
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