### DiT-MoE: 混合专家扩散 Transformer（DiT with Mixture of Experts）

```yaml
id: dit-moe
name: DiT-MoE
full_name: "混合专家扩散Transformer (DiT with Mixture of Experts)"
year: 2024
org: Meta
paper_url: "https://arxiv.org/abs/2407.11633"
category: diffusion
parent: dit
motivation: "稀疏MoE扩展至160亿参数"
```

#### 📝 一句话总结

DiT-MoE 将稀疏混合专家（Sparse MoE）机制引入扩散 Transformer（DiT），通过共享专家路由和专家级负载均衡损失两大设计，在保持高效推理的同时将模型规模扩展至 16.5B 参数，在 ImageNet 基准上取得了 SOTA 的图像生成质量（256×256 FID=1.72，512×512 FID=1.80）。

#### 🎯 核心要点

- **稀疏 MoE 替换 DiT 的 FFN 层**：每个 Transformer Block 中的 MLP 被替换为 MoE 层，包含 \(n\) 个专家，每次仅激活 Top-\(K\) 个（通常 \(K=2\)），大幅增加参数量而不显著增加推理计算量
- **共享专家路由（Shared Expert Routing）**：设置 \(n_s=2\) 个共享专家始终被激活，捕获不同输入间的共性知识，减少路由专家间的冗余
- **专家级负载均衡损失（Expert-level Balance Loss）**：以专家粒度（而非 token 粒度）计算辅助损失，系数 \(\alpha=0.05\)，有效缓解专家负载不均衡问题
- **模型规模系列**：从 S/2-8E2A（199M 参数）到 G/2-16E2A（16.5B 总参数，3.1B 激活参数），其中 Giant 模型是目前已知最大的类别条件扩散 Transformer
- **路由分析发现**：专家选择偏好空间位置和去噪时间步，对类别条件信息不敏感；深层 MoE 层的专家选择更分散均匀；早期去噪步骤专家选择更集中，后期更均匀
- **合成数据增强**：Giant 模型使用 SDXL 和 SD3 生成的 500 万张合成图像与真实数据以 1:5 比例混合训练

#### 🔬 深入细节

##### 模型架构总览

![DiT-MoE 架构示意图](https://ar5iv.labs.arxiv.org/html/2407.11633/assets/x2.png)
*图：DiT-MoE 架构。左侧为整体流程，右侧展示 MoE Block 内部结构——包含共享专家（始终激活）和路由专家（Top-K 选择），以及专家级负载均衡损失。*

![DiT-MoE 生成样例](https://ar5iv.labs.arxiv.org/html/2407.11633/assets/x1.png)
*图：DiT-MoE 在不同分辨率下的高质量生成样例，展示了模型的强大生成能力。*

##### 算法伪代码

```python
# DiT-MoE 前向传播伪代码
def dit_moe_block(x, t, c, experts, shared_experts, router):
    """
    x: 输入 token 序列 [B, N, D]  (N = (H/p)*(W/p) 个 patch token)
    t: 时间步嵌入
    c: 类别条件嵌入
    experts: n 个路由专家 FFN
    shared_experts: n_s 个共享专家 FFN
    router: 门控网络 (线性层 D -> n)
    """
    # 1. 自注意力 + adaLN 调制
    x = x + self_attention(adaLN(x, t, c))
    
    # 2. 路由门控：计算每个 token 对每个专家的亲和度
    gate_logits = router(x)                    # [B, N, n]
    gate_scores = softmax(gate_logits, dim=-1) # [B, N, n]
    
    # 3. Top-K 选择：每个 token 选择 K 个路由专家
    topk_scores, topk_indices = topk(gate_scores, K)  # [B, N, K]
    topk_scores = topk_scores / topk_scores.sum(dim=-1, keepdim=True)  # 归一化
    
    # 4. 路由专家计算
    routed_output = zeros_like(x)
    for k in range(K):
        expert_idx = topk_indices[:, :, k]
        expert_out = experts[expert_idx](x)    # 选中的专家处理 token
        routed_output += topk_scores[:, :, k:k+1] * expert_out
    
    # 5. 共享专家计算（始终激活）
    shared_output = sum(shared_expert(x) for shared_expert in shared_experts) / n_s
    
    # 6. 合并输出
    moe_output = routed_output + shared_output
    x = x + moe_output
    
    return x

# 专家级负载均衡损失
def expert_balance_loss(gate_logits, topk_indices, n, alpha=0.05):
    """
    以专家粒度计算负载均衡损失，鼓励所有专家被均匀使用
    """
    # f_i: 专家 i 被选中的 token 比例
    f = compute_expert_frequency(topk_indices, n)  # [n]
    # P_i: 所有 token 对专家 i 的平均门控概率
    P = gate_logits.softmax(dim=-1).mean(dim=(0, 1))  # [n]
    # 负载均衡损失
    L_balance = alpha * n * (f * P).sum()
    return L_balance
```

##### 动机与背景

扩散 Transformer（DiT）已经在图像生成领域展现出卓越性能，但其密集架构面临一个根本矛盾：**增加模型容量必然导致推理计算量等比例增长**。在大语言模型领域，稀疏混合专家（Sparse MoE）已经成功解决了这一问题——通过条件计算，模型可以拥有数万亿参数但每次推理仅激活其中一小部分。

然而，将 MoE 直接应用于 DiT 面临两个独特挑战：

1. **扩散模型的多时间步特性**：不同于 LLM 的单次前向传播，扩散模型需要在数百个去噪步骤中反复调用网络，每个步骤的输入分布差异显著，这对路由机制提出了更高要求。
2. **视觉 token 的空间结构**：图像 patch token 具有强烈的空间相关性，简单的 Top-K 路由可能导致专家间的严重负载不均衡。

> 💡 **关键洞察**：DiT-MoE 的核心思想是——通过共享专家捕获跨输入的共性知识，让路由专家专注于学习差异化的特征表示，从而在不增加推理成本的前提下大幅提升模型容量。

##### 核心机制详解

**1. MoE 层设计**

DiT-MoE 将 DiT Block 中的标准 MLP（即 pointwise feedforward network）替换为 MoE 层。给定输入 token \(x \in \mathbb{R}^D\)，MoE 层的输出为：

$$y = \sum_{i=1}^{n} g_i \cdot \text{FFN}_i(x)$$

其中 \(g_i\) 是门控网络为第 \(i\) 个专家分配的权重。门控网络通过线性映射 + Softmax 实现：

$$g_i = \text{Softmax}(W_g \cdot x)_i$$

为保持稀疏性，仅保留 Top-\(K\) 个专家的门控值，其余置零并重新归一化：

$$\tilde{g}_i = \begin{cases} \frac{g_i}{\sum_{j \in \text{TopK}} g_j} & \text{if } i \in \text{TopK} \\ 0 & \text{otherwise} \end{cases}$$

**2. 共享专家路由（Shared Expert Routing）**

这是 DiT-MoE 的第一个核心创新。在 \(n\) 个专家中，\(n_s\) 个被指定为**共享专家**，它们对所有输入 token 始终激活，不参与路由选择。最终输出为：

$$y = \underbrace{\sum_{i=1}^{n_s} \text{FFN}_i^{\text{shared}}(x)}_{\text{共享专家输出}} + \underbrace{\sum_{j=1}^{n - n_s} \tilde{g}_j \cdot \text{FFN}_j^{\text{routed}}(x)}_{\text{路由专家输出}}$$

> 💡 **设计直觉**：在标准 MoE 中，由于不同输入可能共享某些通用特征（如低频纹理、全局结构），多个路由专家可能学习到高度重复的表示。共享专家通过显式建模这些共性知识，释放路由专家去学习更加差异化、细粒度的特征，从而提升整体模型容量的利用效率。

消融实验（下图）验证了 \(n_s = 2\) 是最优选择：

![消融实验](https://ar5iv.labs.arxiv.org/html/2407.11633/assets/images/ablation.png)
*图：共享专家数量和负载均衡损失类型的消融实验。(a) 共享专家数 \(n_s=2\) 时 FID 最优；(b) 专家级（expert-level）负载均衡损失优于 token 级。*

**3. 专家级负载均衡损失（Expert-level Balance Loss）**

标准 MoE 中常用的 token 级负载均衡损失在扩散模型中效果不佳，因为视觉 token 的空间结构导致某些位置的 token 天然倾向于选择特定专家。DiT-MoE 提出以**专家粒度**计算负载均衡：

$$\mathcal{L}_{\text{balance}} = \alpha \cdot n \cdot \sum_{i=1}^{n} f_i \cdot P_i$$

其中：
- \(f_i = \frac{1}{T} \sum_{t=1}^{T} \mathbf{1}[\text{expert } i \in \text{TopK}(x_t)]\) 是专家 \(i\) 被选中的 token 比例
- \(P_i = \frac{1}{T} \sum_{t=1}^{T} g_i(x_t)\) 是所有 token 对专家 \(i\) 的平均门控概率
- \(\alpha = 0.05\) 是平衡系数

> ⚠️ **注意**：与 token 级损失（鼓励每个 token 均匀选择专家）不同，专家级损失关注的是**全局视角下每个专家的总负载是否均衡**。这允许个别 token 对特定专家有强烈偏好（如空间位置特化），同时确保整体系统不会出现某些专家过载而其他专家闲置的情况。

![训练损失曲线](https://ar5iv.labs.arxiv.org/html/2407.11633/assets/images/loss.png)
*图：不同负载均衡损失的训练曲线对比。专家级损失（expert-level）收敛更快且最终损失更低。*

**4. 模型配置与命名规则**

DiT-MoE 采用 `{Size}/{Patch}-{n}E{K}A` 的命名规则，例如 `XL/2-8E2A` 表示 XL 尺寸、patch size=2、8 个专家中激活 2 个。完整配置如下：

| 模型 | 层数 | 隐藏维度 | 注意力头 | 总专家数 | 激活专家数 | 总参数 | 激活参数 |
|------|------|----------|----------|----------|------------|--------|----------|
| S/2-8E2A | 12 | 384 | 6 | 8 | 2 | 199M | 33M |
| B/2-8E2A | 12 | 768 | 12 | 8 | 2 | 795M | 130M |
| L/2-8E2A | 24 | 1024 | 16 | 8 | 2 | 2.8B | 458M |
| XL/2-8E2A | 28 | 1152 | 16 | 8 | 2 | 4.1B | 1.5B |
| G/2-16E2A | 40 | 1536 | 24 | 16+16shared | 2 | 16.5B | 3.1B |

##### 路由分析与专家特化

DiT-MoE 论文对路由机制进行了深入分析，揭示了扩散 MoE 中专家特化的独特模式：

![类别条件路由热力图](https://ar5iv.labs.arxiv.org/html/2407.11633/assets/images/class.png)
*图：不同类别条件下的专家选择频率热力图。专家路由对类别信息不敏感，不同类别的路由模式高度相似。*

![空间位置路由热力图](https://ar5iv.labs.arxiv.org/html/2407.11633/assets/images/patch.png)
*图：不同空间位置的专家选择频率。浅层（MoE layer 0）专家与空间位置强相关，深层（MoE layer 9）趋于均匀分布。*

![时间步路由热力图](https://ar5iv.labs.arxiv.org/html/2407.11633/assets/images/step.png)
*图：不同去噪时间步的专家选择频率。早期步骤（<50）专家选择集中，后期步骤（>100）趋于均匀。*

这些发现揭示了三个重要规律：
1. **空间特化优先于语义特化**：专家更倾向于按空间位置分工，而非按图像类别分工，这与扩散模型主要学习局部去噪模式的直觉一致。
2. **层深度影响特化程度**：浅层专家高度空间特化（类似于学习位置相关的纹理模式），深层专家选择更均匀（处理更全局的语义信息）。
3. **时间步影响路由集中度**：早期去噪步骤（噪声大）需要更专注的处理，后期步骤（接近清晰图像）的处理更加通用。

##### 与密集模型的性能对比

在 ImageNet 256×256 上，DiT-MoE-XL/2-8E2A 以仅 1.5B 激活参数取得 FID=1.72，显著超越：
- DiT-XL/2（675M 参数，FID=2.27）
- Large-DiT-3B（3B 参数，FID=2.10）
- Large-DiT-7B（7B 参数，FID=2.28）
- SiT-XL/2（FID=2.06）

在 ImageNet 512×512 上，DiT-MoE-G/2-16E2A（16.5B 总参数，3.1B 激活参数）取得 FID=1.80，为当时该基准的 SOTA。

> 💡 **关键结论**：DiT-MoE 证明了稀疏 MoE 在扩散模型中的巨大潜力——通过条件计算，可以在推理成本远低于同等密集模型的情况下，实现更优的生成质量。这为扩散模型的进一步扩展（scaling）指明了方向。

##### 训练细节

- **优化器**：AdamW，学习率 \(1 \times 10^{-4}\)，无权重衰减
- **批大小**：1024
- **EMA 衰减率**：0.9999
- **MoE 间隔**：默认每层（\(e=1\)）均使用 MoE
- **Giant 模型数据增强**：使用 SDXL 和 SD3 生成 500 万张合成图像，与真实 ImageNet 数据以 1:5 比例混合
- **采样**：DDPM 250 步，classifier-free guidance scale=1.5

#### 🧪 练习题

```yaml
question: "DiT-MoE 中共享专家（Shared Expert）的主要设计目的是什么？"
options:
  - "减少模型总参数量以加速推理"
  - "捕获不同输入间的共性知识，减少路由专家间的冗余表示"
  - "替代 classifier-free guidance 提供类别条件信息"
  - "在训练初期稳定路由网络的梯度更新"
answer: 1
explain: "共享专家始终被激活以处理所有输入共有的通用特征（如低频纹理、全局结构），从而释放路由专家去学习更加差异化的细粒度表示，提升模型容量利用效率。消融实验表明 n_s=2 个共享专家时 FID 最优。"
```