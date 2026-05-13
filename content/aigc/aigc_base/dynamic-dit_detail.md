### DyDiT — Dynamic Diffusion Transformer

```yaml
id: dynamic-dit
name: DyDiT
full_name: "动态扩散Transformer (Dynamic Diffusion Transformer)"
year: 2024
org: "NUS + Alibaba DAMO Academy + Tsinghua University"
paper_url: "https://arxiv.org/abs/2410.03456"
category: aigc_base
parent: "DiT"
motivation: "消除扩散Transformer中时间步和空间维度的计算冗余，实现动态高效推理"
```

#### 📝 一句话总结

DyDiT 提出**时间步动态宽度 (TDW)** 和**空间动态Token (SDT)** 两种即插即用机制，通过轻量路由器在每个去噪步自适应调整Transformer的宽度（激活的注意力头和MLP通道数）与活跃Token数量，在 ImageNet 256×256 上以不到 DiT-XL 50% 的 FLOPs 达到 2.07 FID，实现 1.73× 实际加速。

#### 🎯 核心要点

- **时间步动态宽度 (TDW)**：基于 sigmoid 路由器，根据时间步嵌入动态激活/停用注意力头和 MLP 通道组，阈值 0.5 二值化
- **空间动态Token (SDT)**：token 路由器逐 token 预测是否跳过 MLP 块，仅作用于 MLP（非 MHSA），通过 gather/scatter 操作实现实际加速
- **FLOPs 约束损失**：\(\mathcal{L}_{\text{FLOPs}} = \left(\frac{1}{B}\sum_{t_b} \frac{F_{\text{dynamic}}^{t_b}}{F_{\text{static}}} - \lambda\right)^2\)，超参 \(\lambda\) 控制目标 FLOPs 比率
- **训练稳定化**：warm-up 阶段保留完整 DiT 结构；magnitude 排序确保至少 1 个 head/channel 组始终激活
- **极低微调成本**：仅需预训练迭代次数的不到 3%（200K / 7M）即可适配动态架构
- **核心结果**：DyDiT-XL (\(\lambda=0.5\)) 在 ImageNet 256×256 上 FID 2.07、FLOPs 57.88G（DiT-XL 为 118G），1.73× 实际推理加速

#### 🔬 深入细节

##### 动机与背景

扩散模型（Diffusion Models）通过迭代去噪生成高质量图像，但每一步都使用**完全相同的网络架构和计算量**，忽略了不同时间步和不同空间位置的计算需求差异。如下图所示，早期去噪步（高噪声）主要处理全局结构，后期步骤（低噪声）聚焦局部细节；同时图像中的平坦区域（如背景）相比纹理丰富区域需要更少的计算。

![DyDiT 动机分析](https://ar5iv.labs.arxiv.org/html/2410.03456/assets/x1.png)
*图1：不同时间步下注意力头和 MLP 通道的激活模式差异（上），以及不同空间位置的 token 重要性差异（下），揭示了扩散Transformer中存在的时间步和空间冗余。*

传统的模型压缩方法（剪枝、蒸馏）采用**静态**策略，对所有时间步和所有 token 施加相同的压缩比，无法适应扩散过程中动态变化的计算需求。DyDiT 的核心洞察是：**不同去噪阶段和不同空间位置应分配不同的计算资源**。

##### 整体架构

![DyDiT 架构总览](https://ar5iv.labs.arxiv.org/html/2410.03456/assets/x2.png)
*图2：DyDiT 架构总览。左侧为整体框架，右侧分别展示 TDW（时间步动态宽度）和 SDT（空间动态Token）的具体实现。*

DyDiT 在标准 DiT 的每个 Transformer 层中引入两个轻量路由模块：

1. **TDW 路由器**：接收时间步嵌入，输出 head mask 和 channel mask，控制 MHSA 和 MLP 的有效宽度
2. **SDT 路由器**：接收每个 token 的隐藏表示，输出 token mask，决定哪些 token 跳过当前 MLP 块

##### 时间步动态宽度 (TDW) 机制

TDW 的核心思想是：**不同时间步需要不同数量的注意力头和 MLP 通道**。

对于每个 Transformer 层，TDW 路由器是一个简单的线性层 + sigmoid 激活：

$$\mathbf{M}_{\text{head}} = \mathbb{1}\left[\sigma(\mathbf{W}_{\text{head}} \cdot \mathbf{e}_t) > 0.5\right]$$

$$\mathbf{M}_{\text{channel}} = \mathbb{1}\left[\sigma(\mathbf{W}_{\text{channel}} \cdot \mathbf{e}_t) > 0.5\right]$$

其中 \(\mathbf{e}_t\) 是时间步嵌入，\(\sigma\) 是 sigmoid 函数，\(\mathbb{1}[\cdot > 0.5]\) 将连续值二值化为 0/1 mask。

> 💡 **关键设计**：训练时使用 sigmoid 连续值保持梯度可传播；推理时以 0.5 为阈值硬二值化，实现真正的计算跳过。

**MHSA 动态宽度**：mask \(\mathbf{M}_{\text{head}} \in \{0,1\}^H\) 控制 \(H\) 个注意力头的激活状态。被停用的 head 完全跳过 QKV 投影和注意力计算。

**MLP 动态宽度**：MLP 的隐藏维度被均匀分为 \(G\) 组，mask \(\mathbf{M}_{\text{channel}} \in \{0,1\}^G\) 控制每组通道的激活。被停用的通道组跳过矩阵乘法。

**训练稳定化**：为防止路由器在训练初期产生极端 mask（全 0 或全 1），采用两个策略：
1. **Warm-up**：训练初期所有 mask 设为全 1，保留完整 DiT 结构
2. **Magnitude 排序**：按 sigmoid 输出值排序，确保至少 1 个 head 和 1 个 channel 组始终激活

##### 空间动态Token (SDT) 机制

SDT 的核心思想是：**图像中不同空间位置的 token 需要不同程度的处理**。

SDT 仅作用于 MLP 块（不影响 MHSA，因为注意力需要全局 token 交互）。对于每个 token \(\mathbf{x}_i\)，token 路由器预测其是否应跳过当前 MLP 块：

$$\mathbf{M}_{\text{token},i} = \mathbb{1}\left[\sigma(\mathbf{w}_{\text{token}}^T \cdot \mathbf{x}_i) > 0.5\right]$$

被标记为跳过的 token 直接通过残差连接传递，不经过 MLP 计算。

> ⚠️ **注意**：SDT 仅应用于 MLP 块而非 MHSA 块。这是因为自注意力机制需要所有 token 参与全局交互，跳过部分 token 会破坏注意力矩阵的完整性。

**实际加速实现**：通过 `gather` 操作收集活跃 token 形成紧凑张量，送入 MLP 计算后再通过 `scatter` 操作将结果放回原始位置，实现真正的 FLOPs 节省和实际加速。

##### 算法伪代码

```python
# DyDiT 单层前向传播伪代码
def dydit_block_forward(x, t_emb):
    """
    x: [B, N, D] token features
    t_emb: [B, D_t] timestep embedding
    """
    # === TDW: 时间步动态宽度 ===
    head_mask = (sigmoid(W_head @ t_emb) > 0.5)    # [B, H]
    channel_mask = (sigmoid(W_channel @ t_emb) > 0.5)  # [B, G]
    # magnitude排序确保至少1个激活
    head_mask = ensure_min_active(head_mask, min_k=1)
    channel_mask = ensure_min_active(channel_mask, min_k=1)

    # === MHSA with dynamic width ===
    # 仅对激活的 head 计算 Q, K, V
    active_heads = select(heads, head_mask)
    attn_out = multi_head_attention(x, active_heads)  # 全部token参与
    x = x + attn_out

    # === SDT: 空间动态Token ===
    token_mask = (sigmoid(w_token @ x) > 0.5)  # [B, N]
    active_idx = gather(token_mask)  # 收集活跃token索引

    # === MLP with dynamic width + dynamic tokens ===
    x_active = x[active_idx]  # gather: 仅取活跃token
    active_channels = select(mlp_weights, channel_mask)
    mlp_out = mlp_forward(x_active, active_channels)
    x = scatter(x, active_idx, mlp_out)  # scatter: 放回原位

    return x
```

##### 训练目标

整体训练损失由原始 DiT 去噪损失和 FLOPs 约束损失组成：

$$\mathcal{L} = \mathcal{L}_{\text{DiT}} + \mathcal{L}_{\text{FLOPs}}$$

其中 FLOPs 约束损失为：

$$\mathcal{L}_{\text{FLOPs}} = \left(\frac{1}{B}\sum_{t_b: b \in [1,B]} \frac{F_{\text{dynamic}}^{t_b}}{F_{\text{static}}} - \lambda\right)^2$$

\(\lambda\) 是目标 FLOPs 比率超参数（如 0.5 表示目标为原始 FLOPs 的 50%）。动态 FLOPs \(F_{\text{dynamic}}^{t_b}\) 根据三种 mask 计算：

$$F_{\text{dynamic}}^{t_b} = \sum_{\ell} \left( f_{\text{MHSA}}^{\ell}(\mathbf{M}_{\text{head}}^{\ell}) + f_{\text{MLP}}^{\ell}(\mathbf{M}_{\text{channel}}^{\ell}, \mathbf{M}_{\text{token}}^{\ell}) \right)$$

> 💡 **关键**：FLOPs 损失是在 batch 内对不同时间步取平均后与目标比较，允许模型在不同时间步分配不同计算量，只要平均达标即可。

##### 实验结果

**主实验（ImageNet 256×256）**：

| 模型 | Params (M) | GFLOPs | FID↓ | sFID↓ | IS↑ | Precision↑ | Recall↑ |
|------|-----------|--------|------|-------|-----|-----------|---------|
| DiT-XL | 675 | 118.0 | 2.27 | 4.60 | 277.00 | 0.83 | 0.57 |
| DyDiT-XL (λ=0.7) | 678 | 84.33 | 2.12 | 4.61 | **284.31** | 0.81 | 0.60 |
| DyDiT-XL (λ=0.5) | 678 | **57.88** | **2.07** | **4.56** | 248.03 | 0.80 | **0.61** |

![FLOPs-FID 权衡曲线](https://ar5iv.labs.arxiv.org/html/2410.03456/assets/x3.png)
*图3：FLOPs 与 FID 的权衡关系。DyDiT 在各 FLOPs 水平下均优于静态模型和剪枝方法。*

**消融实验（Table 3 关键结论）**：

| 配置 | FID↓ |
|------|------|
| 仅 TDW | 20.93 |
| 仅 SDT | 35.12 |
| TDW + SDT（完整 DyDiT） | **16.94** |
| 随机 mask（对照） | 136.01 |

> 💡 **关键发现**：TDW 和 SDT 具有强互补性——单独使用效果有限，组合后 FID 大幅下降。随机 mask 导致性能崩溃，验证了学习路由策略的必要性。

**推理加速**：DyDiT-XL (λ=0.5) 实现 **1.73×** 实际推理加速（基于 gather/scatter 的真实 wall-clock 时间测量，而非仅理论 FLOPs 减少）。

**微调效率**：DiT-XL 预训练 7,000,000 次迭代，DyDiT 仅需额外 200,000 次微调迭代（不到 3%）即可完成动态架构适配。

![DyDiT 生成可视化](https://ar5iv.labs.arxiv.org/html/2410.03456/assets/x5.png)
*图5：DyDiT 在不同时间步的动态计算分配可视化。早期步骤（高噪声）激活更多计算资源处理全局结构，后期步骤（低噪声）自适应减少计算量。*

##### 与传统方法的区别

| 维度 | 静态剪枝/蒸馏 | DyDiT |
|------|-------------|-------|
| 压缩策略 | 所有时间步和 token 统一压缩 | 按时间步和空间位置动态分配 |
| 适应性 | 无（固定结构） | 路由器根据输入自适应决策 |
| 训练成本 | 通常需要完整重训练 | 仅需 <3% 额外微调 |
| 加速方式 | 理论 FLOPs 减少，实际加速有限 | gather/scatter 实现真实加速 |
| 性能保持 | 通常有明显性能下降 | FID 甚至优于原始模型（2.07 vs 2.27） |

##### 局限性

论文主要聚焦于**图像生成**任务，未探索在视频生成、3D 生成等其他扩散模型应用中的效果。此外，路由器的决策在不同硬件上的加速效果可能存在差异。

#### 🧪 练习题

```yaml
question: "DyDiT 的空间动态Token (SDT) 机制为什么仅应用于 MLP 块而不应用于 MHSA 块？"
options:
  - "因为 MLP 块的计算量远大于 MHSA 块"
  - "因为自注意力需要所有 token 参与全局交互，跳过部分 token 会破坏注意力矩阵的完整性"
  - "因为 MHSA 块已经通过 TDW 机制进行了动态宽度调整，无需再做 token 级优化"
  - "因为 token 路由器无法处理 MHSA 块的多头结构"
answer: 1
explain: "MHSA 的自注意力机制要求所有 token 相互计算注意力权重，跳过部分 token 会导致注意力矩阵不完整，影响全局信息聚合。因此 SDT 仅在不需要全局交互的 MLP 块中跳过冗余 token。"
```