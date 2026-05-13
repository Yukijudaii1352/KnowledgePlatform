### DiffGDA — 基于扩散SDE的图域自适应

```yaml
id: diffgda
name: DiffGDA
full_name: "基于扩散随机微分方程的图域自适应 (Diffusion-based Graph Domain Adaptation)"
year: "2025"
org: "HKUST / Tencent"
paper_url: "https://arxiv.org/abs/2602.10506"
category: "graph_domain_adaptation"
parent: "—"
motivation: "将图域自适应建模为连续时间扩散生成过程，通过SDE前向加噪+引导反向去噪实现源图到目标域的结构-语义联合演化"
```

#### 📝 一句话总结

DiffGDA 提出将图域自适应建模为随机微分方程(SDE)驱动的连续时间生成过程，通过 score 网络学习源域分布梯度、guidance 网络估计跨域密度比引导扩散轨迹，实现节点特征与图结构的联合域迁移，在多个引文网络和社交网络基准上取得 SOTA。

#### 🎯 核心要点

- **SDE 建模图域自适应**：前向 SDE 对源图（节点特征 + 邻接矩阵）加噪，反向 SDE 生成符合目标域分布的图数据
- **理论保证（Theorem 1）**：证明最优扩散漂移 = 源域 score 函数 + 跨域对数密度比梯度 \(\nabla \log(q/p)\)
- **Score 网络**：分解为节点特征 MLP（\(\ell_1\)）和图结构 GMH-MLP（\(\ell_2\)），分别捕获语义和拓扑信息
- **Guidance 网络**：通过域判别器估计密度比 \(q/p \approx (1-\hat{y})/\hat{y}\)，Monte Carlo 采样计算梯度期望
- **随机扩散策略**：按采样比 \(\alpha\) 选取子集节点进行扩散，平衡效率与性能
- **端到端优化**：联合优化扩散模型参数（\(\ell_1, \ell_2, \delta_1, \delta_2\)）和 GNN 分类器参数（\(\theta\)）
- **基准数据集**：ACMv9/Citationv1/DBLPv7（引文网络）、Blog1/Blog2（社交网络）、Elliptic（金融交易图）

#### 🔬 深入细节

![DiffGDA 框架总览](https://arxiv.org/html/2602.10506v1/x1.png)
*图：DiffGDA 整体框架。左侧为前向 SDE 加噪过程，右侧为带 guidance 的反向 SDE 去噪生成过程，底部为 GNN 分类器。*

##### 算法伪代码

```python
# DiffGDA 训练流程
# 输入: 源图 G_S=(X_S, A_S, Y_S), 目标图 G_T=(X_T, A_T)
# 参数: score网络(ℓ1,ℓ2), guidance网络(δ1,δ2), GNN(θ)

# === 前向SDE: 对源图加噪 ===
for t in range(0, T):
    # 节点特征演化: dX = f_X(X,t)dt + g_X(t)dW
    X_t = X_{t-1} + f(X_{t-1}, t)*dt + g(t)*sqrt(dt)*noise_X
    # 邻接矩阵演化: dA = f_A(A,t)dt + g_A(t)dW  
    A_t = A_{t-1} + f(A_{t-1}, t)*dt + g(t)*sqrt(dt)*noise_A

# === 反向SDE: 引导去噪生成 ===
for t in range(T, 0, -1):
    # Score 估计 (源域分布梯度)
    score_X = MLP_ℓ1(X_t, t)           # 节点特征score
    score_A = GMH_MLP_ℓ2(A_t, t)       # 图结构score
    
    # Guidance 估计 (跨域密度比梯度)
    y_hat = DomainDiscriminator(X_t)    # 域判别概率
    density_ratio = (1 - y_hat) / y_hat # q(x)/p(x) 近似
    guidance = grad(log(density_ratio)) # ∇log(q/p)
    
    # 反向更新: 漂移 = f - g²(score + guidance)
    X_{t-1} = X_t - [f(X_t,t) - g(t)²*(score_X + guidance_X)]*dt + g(t)*dW
    A_{t-1} = A_t - [f(A_t,t) - g(t)²*(score_A + guidance_A)]*dt + g(t)*dW

# === GNN分类 + 联合优化 ===
Z = GNN_θ(X_adapted, A_adapted)  # 生成的目标域图送入GNN
L_total = L_SDE + L_GNN           # score matching + 分类损失
optimizer.step(L_total)
```

##### 动机与背景

图域自适应（Graph Domain Adaptation）旨在将源域标注图的知识迁移到无标注的目标域图上。现有方法主要存在两个问题：

1. **离散对齐的局限性**：传统方法（如 UDAGCN、GRADE）通过对抗训练或 MMD 进行一次性分布对齐，忽略了源域到目标域之间的**连续演化路径**，容易导致结构信息丢失。
2. **结构-语义解耦不足**：大多数方法仅对齐节点特征分布，忽略了图拓扑结构的域差异（如不同引文网络的连接模式差异）。

DiffGDA 的核心洞察是：**域自适应可以看作一个从源分布到目标分布的连续生成过程**，而扩散模型（SDE）天然适合建模这种连续演化。

##### 核心机制详解

**1. 前向 SDE 建模（加噪过程）**

对源图的节点特征矩阵 \(X\) 和邻接矩阵 \(A\) 分别定义前向 SDE：

$$dX_t = f_X(X_t, t)\,dt + g_X(t)\,dW_t$$
$$dA_t = f_A(A_t, t)\,dt + g_A(t)\,dW_t$$

其中 \(f(\cdot)\) 为漂移系数，\(g(\cdot)\) 为扩散系数。前向过程逐步将源图数据转化为高斯噪声。

**2. 反向 SDE + Guidance（去噪生成过程）**

反向 SDE 的关键在于漂移项的设计。论文的核心理论贡献（Theorem 1）证明：

$$\text{最优漂移} = f(x,t) - g(t)^2 \left[\underbrace{\nabla_{x_t} \log p_t(x_t)}_{\text{Score (源域)}} + \underbrace{\nabla_{x_t} \log \frac{q_t(x_t)}{p_t(x_t)}}_{\text{Guidance (跨域)}}\right]$$

> 💡 **关键直觉**：Score 函数告诉模型"源域数据长什么样"，Guidance 函数告诉模型"目标域相对于源域有什么不同"。两者结合使得反向扩散轨迹被引导向目标域分布。

**3. Score 网络设计**

Score 网络被分解为两个独立组件：
- **节点特征 Score**（\(\ell_1\)）：标准 MLP，输入为 \((X_t, t)\)，输出节点特征维度的 score 向量
- **图结构 Score**（\(\ell_2\)）：GMH-MLP（Graph Multi-Head MLP），利用多头注意力机制捕获邻接矩阵中的高阶结构模式

训练目标为 denoising score matching：

$$\mathcal{L}_{\text{score}} = \mathbb{E}_{t,x_0,x_t}\left[\|s_\theta(x_t, t) - \nabla_{x_t} \log p_{0t}(x_t|x_0)\|^2\right]$$

**4. Guidance 网络设计**

Guidance 网络的核心任务是估计对数密度比 \(\nabla \log(q/p)\)。论文采用域判别器方法：

- 训练一个二分类器 \(D_\delta(x)\) 区分源域/目标域样本
- 利用贝叶斯最优判别器性质：\(\frac{q(x)}{p(x)} = \frac{1 - D^*(x)}{D^*(x)}\)
- 通过 Monte Carlo 采样估计梯度期望：

$$\nabla \log \frac{q_t(x_t)}{p_t(x_t)} \approx \frac{1}{M}\sum_{i=1}^M \nabla_{x_t} \log\frac{1 - D_\delta(x_t^{(i)})}{D_\delta(x_t^{(i)})}$$

> ⚠️ **注意**：Guidance 网络同样分解为特征判别器（\(\delta_1\)）和结构判别器（\(\delta_2\)），分别引导节点特征和邻接矩阵的演化方向。

**5. 随机扩散策略**

为控制计算开销，DiffGDA 不对所有源节点执行扩散，而是按比例 \(\alpha\) 随机采样子集节点。实验表明 \(\alpha \in [0.3, 0.5]\) 即可获得接近全量扩散的性能，同时将复杂度从 \(\mathcal{O}(T \cdot |V_S|^2)\) 降至 \(\mathcal{O}(T \cdot (\alpha|V_S|)^2)\)。

**6. 端到端优化**

最终目标函数为：

$$\min_{\ell_1, \ell_2, \delta_1, \delta_2, \theta} \mathcal{L}_{\text{SDE}} + \mathcal{L}_{\text{GNN}}$$

其中 \(\mathcal{L}_{\text{SDE}}\) 包含 score matching 损失和 guidance 判别器损失，\(\mathcal{L}_{\text{GNN}}\) 为下游节点分类的交叉熵损失加 MMD 对齐项。

##### 与传统方法的区别

| 方面 | 传统方法（UDAGCN等） | DiffGDA |
|------|---------------------|---------|
| 对齐方式 | 一次性对抗/MMD对齐 | 连续时间扩散轨迹 |
| 结构处理 | 仅对齐特征或共享GNN | 显式建模邻接矩阵演化 |
| 理论保证 | 无 | Theorem 1 证明最优性 |
| 生成能力 | 无 | 可生成目标域图样本 |

##### 实验结果

在 ACMv9/Citationv1/DBLPv7 三个引文网络的 6 个跨域任务上，DiffGDA 在所有任务上均取得最优 Mi-F1 和 Ma-F1：
- **A→C**: Mi-F1 82.28（vs 次优 UDAGCN 80.68）
- **A→D**: Mi-F1 76.70（vs 次优 74.66）
- **C→A**: Mi-F1 75.75（vs 次优 73.46）
- **平均提升**: 约 2-5 个百分点

消融实验证明三个组件互补：guidance 网络对困难任务贡献最大，MMD 对简单分布偏移有效，邻接约束保持结构依赖。

#### 🧪 练习题

```yaml
question: "DiffGDA 中 Guidance 网络的核心作用是什么？"
options:
  - "学习源域数据分布的 score 函数"
  - "估计源域与目标域的密度比梯度，引导扩散轨迹向目标域演化"
  - "对生成的图数据进行去噪"
  - "计算节点分类的交叉熵损失"
answer: 1
explain: "Guidance 网络通过域判别器估计 q(x)/p(x) 的梯度，将反向扩散轨迹从源域分布引导向目标域分布，这是 DiffGDA 实现跨域迁移的关键机制。"
```