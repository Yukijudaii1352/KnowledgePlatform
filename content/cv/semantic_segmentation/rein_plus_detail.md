### Rein++ — 高效域泛化与域适应语义分割

```yaml
id: rein_plus
name: "Rein++"
full_name: "Rein++: Efficient Generalization and Adaptation for Vision Foundation Models"
year: "2025"
org: "USTC"
paper_url: "https://ieeexplore.ieee.org/document/10918005"
category: "semantic_segmentation"
parent: "sam"
motivation: "通过可学习token高效微调冻结的VFM骨干网络，以极少参数实现域泛化和域适应语义分割的SOTA性能"
```

#### 📝 一句话总结

Rein++ 提出基于可学习 token 的参数高效微调策略（Rein-G 用于域泛化，Rein-A 用于无监督域适应），仅需冻结骨干网络 1% 的额外参数即可在语义分割任务中超越全参数微调，并通过 SAM 辅助的语义知识迁移进一步提升跨域适应能力。

#### 🎯 核心要点

- **Rein 核心机制**：在冻结 VFM 的每一层之间嵌入可学习 token 集合 \(T_i \in \mathbb{R}^{m \times c}\)，通过注意力机制生成逐层特征修正 \(\Delta f_i\)
- **实例级特征精炼**：利用 token-to-feature 相似度图实现对单张图像中不同类别实例的差异化特征调整
- **Token-Instance 链接**：通过 DETR 风格的 object query 将 token 隐式关联到语义实例，增强分割精度
- **层共享 MLP 权重**：所有层共享 MLP 参数，配合低秩 token 序列，将可训练参数压缩至骨干的 ~1%
- **Rein-G（域泛化）**：仅在合成数据上训练，无需访问真实目标域数据即可泛化
- **Rein-A（域适应）**：扩展至 UDA 场景，引入实例级和 logit 级对齐策略，以及基于 SAM 的语义知识迁移
- **SOTA 性能**：GTAV→Cityscapes 达到 68.1% mIoU（域泛化），显著超越此前所有方法

#### 🔬 深入细节

![Rein 架构示意图](https://raw.githubusercontent.com/w1oves/Rein/train/docs/framework.png)
*图：Rein 方法总览。可学习 token 嵌入冻结 VFM 各层之间，通过注意力机制生成特征修正量 Δf_i，逐层精炼特征图。*

```python
# Rein 核心逻辑伪代码
class Rein:
    def __init__(self, num_layers, num_tokens, dim):
        # 每层一组可学习 token
        self.tokens = [Parameter(randn(num_tokens, dim)) for _ in range(num_layers)]
        # 层共享的 MLP
        self.mlp_T = Linear(dim, dim)  # token 变换
        self.mlp_f = Linear(dim, dim)  # 特征变换
        self.mlp_Q = Linear(dim, query_dim)  # query 生成

    def forward(self, f_i, layer_idx):
        T_i = self.tokens[layer_idx]
        # Step 1: 计算相似度图 (attention)
        S_i = softmax(f_i @ T_i.T / sqrt(c), dim=-1)  # [n, m]
        # Step 2: 排除第一个 token (absorb token)
        S_used = S_i[:, 1:]       # [n, m-1]
        T_used = T_i[1:]          # [m-1, c]
        # Step 3: 初步特征修正
        delta_f_bar = S_used @ self.mlp_T(T_used)  # [n, c]
        # Step 4: 最终修正 (残差 + MLP)
        delta_f = self.mlp_f(delta_f_bar + f_i)    # [n, c]
        return f_i + delta_f  # 精炼后的特征

    def get_queries(self):
        # 聚合所有层的 query 用于 decode head
        Q_all = [self.mlp_Q(T) for T in self.tokens]
        Q_max = element_wise_max(Q_all)
        Q_avg = element_wise_mean(Q_all)
        Q = concat([Q_max, Q_avg, Q_all[-1]]) @ W_Q
        return Q
```

**动机与背景**

传统域泛化语义分割（DGSS）方法依赖于数据增强、风格迁移等技术来提升模型的跨域泛化能力，但受限于 CNN 骨干网络的表征能力。随着 DINOv2、SAM、EVA02 等视觉基础模型（VFM）的出现，研究者发现**直接冻结 VFM 骨干 + 简单 decode head 就能超越所有先前 DGSS 方法**（如 DINOv2-L 在 GTAV→Cityscapes 上达到 63.3% mIoU，远超此前 SOTA 的 47.6%）。

然而，VFM 参数量巨大（如 ViT-L 有 300M+ 参数），全参数微调不仅计算代价高，还会破坏预训练获得的泛化表征。Rein 的核心动机是：**用极少的可训练参数高效引导冻结的 VFM 生成任务特定的特征**。

**核心机制详解**

**1. 特征精炼（Feature Refinement）**

对于冻结 VFM 第 \(i\) 层输出的特征图 \(f_i \in \mathbb{R}^{n \times c}\)，Rein 生成修正量：

$$f_{i+1} = L_{i+1}(f_i + \Delta f_i), \quad \Delta f_i = \text{Rein}(f_i)$$

这里 \(\Delta f_i\) 的计算分为三步：

**Step 1 - 相似度计算**：通过 token 与特征的点积生成注意力图：

$$S_i = \text{Softmax}\left(\frac{f_i \cdot T_i^\top}{\sqrt{c}}\right) \in \mathbb{R}^{n \times m}$$

**Step 2 - 初步修正**：利用相似度加权 token 值（排除第 1 个吸收 token）：

$$\Delta\bar{f_i} = S_i(:, 2\!:\!m) \times [T_i(2\!:\!m) \cdot W_T + b_T]$$

> 💡 **关键设计**：第 1 个 token 作为"吸收 token"（absorb token），用于处理没有对应语义类别的 patch。由于 softmax 归一化，排除该 token 后每行的权重和在 [0,1] 之间，避免对无关 patch 产生错误修正。

**Step 3 - 最终修正**：加入残差连接并通过 MLP 变换：

$$\Delta f_i = (\Delta\bar{f_i} + f_i) \times W_f + b_f$$

**2. Token-Instance 链接**

Rein 将 token 通过线性变换映射为 DETR 风格的 object query：

$$Q_i = T_i \times W_Q + b_Q, \quad Q_i \in \mathbb{R}^{m \times c'}$$

多层 query 通过 max/avg 聚合后送入 Mask2Former decode head：

$$Q = \text{Concat}([Q_{\max}, Q_{\text{avg}}, Q_N]) \times W_Q + b_Q$$

这使得每个 token 隐式对应一个语义实例，decode head 可直接利用这些 query 进行 mask 预测。

**3. 参数效率设计**

- **层共享 MLP**：\(W_T, W_f, W_Q\) 在所有 \(N\) 层间共享，由 token \(T_i\) 本身提供层间差异
- **低秩 token**：\(T_i = A_i \times B\)，其中 \(A_i \in \mathbb{R}^{m \times r}, B \in \mathbb{R}^{r \times c}\)，\(r \ll c\)，进一步压缩参数

> ⚠️ **对比 LoRA**：Rein 不修改 VFM 内部权重，而是在层间插入特征修正模块。这保留了 VFM 原始表征的完整性，同时通过 instance-aware 的修正实现任务适配。

**4. Rein++ 扩展：Rein-A（域适应）**

Rein++ 将 Rein 从域泛化扩展到无监督域适应（UDA）场景：

- **实例级对齐**：利用 token 的实例关联性，在源域和目标域之间进行实例级特征对齐
- **Logit 级对齐**：对分割预测的 logit 分布进行跨域一致性约束
- **SAM 语义迁移**：利用 SAM 的类无关分割能力，将目标域的结构信息迁移为语义监督信号

**与传统方法的区别**

| 方法类型 | 代表工作 | 可训练参数 | GTAV→Citys mIoU |
|---------|---------|-----------|-----------------|
| 传统 DGSS | TLDR (ICCV'23) | 全部骨干 | 47.6% |
| 冻结 VFM + Head | DINOv2-L | 仅 Head | 63.3% |
| **Rein (Ours)** | DINOv2-L + Rein | **骨干 1%** | **68.1%** |

Rein 以极少参数超越了全参数微调和纯冻结方案，证明了"精准引导优于暴力调参"的设计哲学。

#### 🧪 练习题

```yaml
question: "Rein 中第一个 token 被排除在特征修正计算之外的主要原因是什么？"
options:
  - "减少计算量，加速推理"
  - "作为吸收 token，使无对应类别的 patch 修正量趋近于零"
  - "存储全局上下文信息供 decode head 使用"
  - "防止梯度消失，稳定训练过程"
answer: 1
explain: "排除第一个 token 后，softmax 归一化的剩余权重和可以小于 1，使得没有匹配语义类别的 patch 获得接近零的修正量，避免错误修改。"
```