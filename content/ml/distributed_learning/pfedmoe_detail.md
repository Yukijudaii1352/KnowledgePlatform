### pFedMoE

```yaml
id: pfedmoe
name: pFedMoE
full_name: "数据级别个性化的模型异构联邦学习 (Data-Level Personalization with Mixture of Experts for Model-Heterogeneous Personalized Federated Learning)"
year: "2024"
org: "Nankai University & NTU"
paper_url: "https://arxiv.org/abs/2402.01350"
category: "distributed_learning"
parent: "—"
motivation: "利用MoE在样本粒度上动态平衡全局泛化与本地个性化特征，解决模型异构联邦学习中的数据级别个性化问题"
```

#### 📝 一句话总结

pFedMoE 提出在模型异构联邦学习中利用 Mixture of Experts 架构，通过门控网络为每个数据样本动态分配全局专家（共享小特征提取器）和本地专家（异构大特征提取器）的权重，首次实现了数据级别的个性化，在 CIFAR-10/100 上达到 SOTA。

#### 🎯 核心要点

- **MoE 架构设计**：每个客户端包含全局专家（同构小特征提取器 \(\mathcal{G}(\theta)\)）、本地专家（异构大特征提取器 \(\mathcal{F}_k^{ex}\)）和轻量门控网络 \(\mathcal{H}(\varphi_k)\)
- **数据级别个性化**：门控网络为每个样本独立生成权重 \([\alpha^{\mathcal{G}}, \alpha^{\mathcal{F}_k}]\)，动态平衡泛化与个性化表示
- **知识共享机制**：仅共享同构小特征提取器（通过 FedAvg 聚合），通信开销远低于传输完整模型
- **门控网络结构**：2 层线性网络 + Switch Normalization + Sigmoid + Softmax，输入为展平的原始图像
- **端到端训练**：全局专家、本地专家、门控网络和预测头通过交叉熵损失联合优化
- **理论保证**：证明了 \(\mathcal{O}(1/T)\) 的非凸收敛速率
- **实验覆盖**：CIFAR-10/100，pathological + Dirichlet non-IID，模型同构/异构场景，7 个 baseline

#### 🔬 深入细节

![pFedMoE 整体工作流程](https://ar5iv.labs.arxiv.org/html/2402.01350/assets/x2.png)
*图：pFedMoE 工作流程。每个客户端通过 MoE 架构融合全局专家和本地专家的表示，门控网络为每个样本动态分配权重。*

![门控网络结构](https://ar5iv.labs.arxiv.org/html/2402.01350/assets/x3.png)
*图：门控网络结构。输入为展平的原始图像，经 Switch Normalization、线性层、Sigmoid、Softmax 后输出两个专家的权重。*

```python
# pFedMoE 算法伪代码
def pFedMoE():
    # 服务器初始化同构小特征提取器 G(θ)
    theta = initialize_global_extractor()
    
    for t in range(T):  # 通信轮次
        S_t = sample_clients(K)  # 采样客户端
        
        # 下发全局提取器
        for k in S_t:
            send(theta, client_k)
        
        # 客户端本地训练
        for k in S_t:
            theta_k = local_train_MoE(k, theta)
        
        # 服务器聚合: θ^t = Σ (n_k/n) * θ_k^t
        theta = weighted_average({theta_k: n_k/n for k in S_t})

def local_train_MoE(k, theta):
    """客户端 k 的 MoE 端到端训练"""
    for epoch in range(E):
        for (x_i, y_i) in D_k:
            # Step 1: 双专家特征提取
            R_global = G(x_i, theta)          # 全局专家: 泛化表示
            R_local = F_k_ex(x_i, omega_k)    # 本地专家: 个性化表示
            
            # Step 2: 门控网络生成样本级权重
            alpha_G, alpha_F = H(x_i, phi_k)  # s.t. alpha_G + alpha_F = 1
            
            # Step 3: 加权混合表示
            R_mixed = alpha_G * R_global + alpha_F * R_local
            
            # Step 4: 预测与损失
            y_hat = F_k_hd(R_mixed, omega_k_hd)
            loss = CrossEntropy(y_hat, y_i)
            
            # Step 5: 端到端更新所有参数
            SGD_update([theta, omega_k, phi_k, omega_k_hd], loss)
    
    return theta  # 上传更新后的全局提取器
```

##### 动机与背景

在联邦学习中，客户端通常持有不同架构的模型（如不同深度的 CNN），这就是**模型异构个性化联邦学习（MHPFL）**问题。现有方法主要通过知识蒸馏（FedKD）、原型共享（FedProto）或互学习（FML）在**模型级别**实现个性化——即为每个客户端学习一个固定的个性化模型。

> 💡 关键洞察：同一客户端内的不同数据样本包含不同比例的全局泛化信息和本地个性化信息。例如，在非 IID 分布下，某些样本可能与全局分布更接近（需要更多泛化知识），而另一些样本则高度本地化（需要更多个性化知识）。

因此，pFedMoE 提出在**数据级别**实现个性化：为每个样本独立决定应该更依赖全局知识还是本地知识。

##### 核心机制

**1. 双专家设计**

pFedMoE 将每个客户端的模型分为两个专家：

- **全局专家** \(\mathcal{G}(\theta)\)：一个所有客户端共享的**同构小特征提取器**。它通过 FedAvg 聚合获得跨客户端的泛化知识，能够提取所有类别的通用特征。由于体积小，通信开销低。

- **本地专家** \(\mathcal{F}_k^{ex}(\omega_k^{ex})\)：客户端本地的**异构大特征提取器**（即原始本地模型的特征提取部分）。它只在本地训练，捕获本地数据分布的个性化特征。

> ⚠️ 注意：两个专家的最后一层输出维度必须相同，以支持后续的加权混合操作。

**2. 门控网络**

门控网络 \(\mathcal{H}(\varphi_k)\) 是实现数据级别个性化的核心组件。对于输入样本 \(\mathbf{x}_i\)，它输出两个权重：

$$[\alpha_{k,i}^{\mathcal{G}}, \alpha_{k,i}^{\mathcal{F}_k}] = \mathcal{H}(\mathbf{x}_i; \varphi_k), \quad \text{s.t.} \quad \alpha_{k,i}^{\mathcal{G}} + \alpha_{k,i}^{\mathcal{F}_k} = 1$$

门控网络结构为：
- 输入：展平的原始图像向量（length × width × 3）
- 第一层：SwitchNorm → Linear(d_input, m) → Sigmoid → BatchNorm
- 第二层：Linear(m, 2) → Softmax → BatchNorm

设计理由：
- **Switch Normalization**：自适应选择 Instance/Layer/Batch Norm，处理批次内样本的多样性
- **Sigmoid**：将中间表示约束在 (0, 1)，稳定训练
- **Softmax**：确保两个权重之和为 1，形成凸组合
- **两层线性**：比单层更具表达力，避免过拟合

**3. 表示混合与预测**

混合表示通过加权求和得到：

$$\mathcal{R}_{k,i}^t = \alpha_{k,i}^{\mathcal{G},t} \cdot \mathcal{G}(\mathbf{x}_i; \theta^{t-1}) + \alpha_{k,i}^{\mathcal{F}_k,t} \cdot \mathcal{F}_k^{ex}(\mathbf{x}_i; \omega_k^{ex,t-1})$$

最终预测由本地预测头完成：\(\hat{y}_i = \mathcal{F}_k^{hd}(\mathcal{R}_{k,i}^t; \omega_k^{hd,t-1})\)

##### 训练与通信流程

每轮通信包含三步：
1. **服务器下发**：将聚合后的全局同构小特征提取器 \(\mathcal{G}(\theta^{t-1})\) 发送给采样的客户端
2. **本地 MoE 训练**：客户端以端到端方式训练全部组件（全局专家 + 本地专家 + 门控网络 + 预测头），使用交叉熵损失和 SGD 优化器
3. **服务器聚合**：加权平均聚合收到的同构小特征提取器

$$\theta^t = \sum_{k \in \mathcal{S}^t} \frac{n_k}{n} \theta_k^t$$

推理时使用完整的本地 MoE 模型（双专家 + 门控 + 预测头）。

##### 与传统方法的区别

| 方法 | 个性化粒度 | 知识交换方式 | 异构支持 |
|------|-----------|-------------|---------|
| FedAvg | 无 | 完整模型 | ❌ |
| FedProto | 模型级 | 类原型 | ✅ |
| FedKD | 模型级 | 知识蒸馏(需公共数据) | ✅ |
| FML | 模型级 | 互学习 | ✅ |
| **pFedMoE** | **数据级** | **小特征提取器** | ✅ |

pFedMoE 的核心优势在于：(1) 无需公共数据集；(2) 在样本粒度上自适应平衡泛化与个性化；(3) 通信开销低（仅传小提取器）。

##### 实验结果

在 CIFAR-10/100 上，模型同构场景下相比最佳 baseline 提升 +0.33%~1.74%，相比同类最佳提升 +1.42%~5.47%；模型异构场景下相比最佳 baseline 提升 +0.05%~2.80%，相比同类最佳提升 +16.38%~22.16%（FML/FedAPEN 在异构场景下多数无法收敛）。

#### 🧪 练习题

```yaml
question: "pFedMoE 中门控网络的输入是什么？"
options:
  - "全局专家和本地专家的输出表示拼接"
  - "展平的原始图像像素向量"
  - "本地模型的中间层特征"
  - "样本的类别标签 one-hot 编码"
answer: 1
explain: "pFedMoE 的门控网络直接以展平的原始图像向量作为输入，经 SwitchNorm + 两层线性网络 + Softmax 生成两个专家的权重，这样可以根据每个样本的原始特征独立决定泛化/个性化的比例。"
```