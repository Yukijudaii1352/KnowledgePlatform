### I-JEPA — 图像联合嵌入预测架构 (Image-based Joint-Embedding Predictive Architecture)

```yaml
id: ijepa
name: I-JEPA
full_name: "图像联合嵌入预测架构 (Image-based Joint-Embedding Predictive Architecture)"
year: 2023
org: Meta AI (FAIR)
paper_url: "https://arxiv.org/abs/2301.08243"
category: ml_paradigm
parent: "—"
motivation: "在表示空间而非像素空间进行掩码预测，无需手工数据增强即可学习高语义表示，兼顾语义理解与局部特征捕获"
```

#### 📝 一句话总结

I-JEPA 提出了一种联合嵌入预测架构，通过在**表示空间**（而非像素空间）预测被掩码图像块的语义表示，结合精心设计的 multi-block masking 策略，在不使用任何手工数据增强的前提下学习到高质量的语义图像表示，同时保留了局部细节特征。

#### 🎯 核心要点

- **JEPA 范式**：区别于联合嵌入架构（JEA，如对比学习）和生成式架构（如 MAE），提出第三条路线——在抽象表示空间进行预测，避免像素级重建的冗余和手工增强的先验偏置
- **三组件架构**：Context Encoder（ViT）编码可见上下文 → Predictor（窄 ViT）以位置 mask token 为条件预测目标表示 → Target Encoder（EMA 更新）提供预测目标
- **Multi-block masking 策略**：采样 4 个较小 target block（scale 0.15–0.2）+ 1 个较大 context block（scale 0.85–1.0），上下文与目标无重叠，迫使模型学习语义级预测
- **无需手工数据增强**：不依赖随机裁剪、颜色抖动等视图增强，避免引入任务特定偏置，具有更好的通用性和跨模态迁移潜力
- **高效可扩展**：ViT-H/14 在 16 块 A100 上仅需 72 小时即可完成预训练；比 MAE 收敛快约 5 倍，比 iBOT 计算开销显著更低

#### 🔬 深入细节

##### 动机与背景

自监督视觉表示学习主要有两大范式：

1. **不变性方法**（Invariance-based）：如 DINO、iBOT、SimCLR，通过手工数据增强构造同一图像的多个视图，训练编码器产生相似嵌入。这类方法能学到高语义表示，但引入了**强先验偏置**——例如颜色抖动使模型对颜色不变，这对需要颜色信息的下游任务（如深度估计）是有害的。
2. **生成式方法**（Generative）：如 MAE、BEiT，通过掩码并重建像素/token 来学习表示。这类方法先验知识需求少，但由于在**像素空间**重建，模型被迫建模大量低级细节（纹理、精确边缘），导致学到的表示语义层次较低，线性探测性能不佳。

> 💡 **关键洞察**：I-JEPA 的核心思想来自 Yann LeCun 提出的 JEPA 框架——预测应发生在**抽象表示空间**，而非输入空间。这样 target encoder 可以自主学习滤除不相关的像素级细节，使预测目标天然具有更高的语义抽象度。

##### 架构总览

![I-JEPA 方法示意图](https://ar5iv.labs.arxiv.org/html/2301.08243/assets/x5.png)
*图：I-JEPA 方法总览。Context encoder 编码可见 patch，Predictor 以位置 mask token 为条件预测 target block 的表示，Target encoder（EMA）提供预测目标。*

I-JEPA 包含三个核心组件：

| 组件 | 架构 | 作用 | 更新方式 |
|------|------|------|----------|
| **Context Encoder** \(f_\theta\) | ViT（完整宽度） | 编码可见的 context patch 序列 | 梯度反传 |
| **Predictor** \(g_\phi\) | 窄 ViT（宽度远小于 encoder） | 以 context 表示 + 位置 mask token 为输入，预测 target 位置的表示 | 梯度反传 |
| **Target Encoder** \(\bar{f}_\theta\) | 与 Context Encoder 同架构 | 编码 target patch 序列，提供预测目标 | **EMA**（指数移动平均） |

> ⚠️ **关键设计**：Predictor 使用的是**窄 ViT**（hidden dimension 远小于 encoder），这是为了防止 predictor 过于强大而导致 context encoder 不需要学习有意义的表示（即防止表示坍塌的一种隐式约束）。

##### 三大架构范式对比

![联合嵌入架构](https://ar5iv.labs.arxiv.org/html/2301.08243/assets/x2.png)
*图 (a)：联合嵌入架构（JEA）——直接比较两个视图的嵌入相似度*

![生成式架构](https://ar5iv.labs.arxiv.org/html/2301.08243/assets/x3.png)
*图 (b)：生成式架构——在像素/token 空间重建输入*

![JEPA 架构](https://ar5iv.labs.arxiv.org/html/2301.08243/assets/x4.png)
*图 (c)：JEPA 架构——在表示空间预测目标嵌入*

三者的核心区别在于：
- **JEA**：需要手工增强构造视图对，通过对比/聚类等方式防止坍塌，学到的表示对增强操作不变
- **生成式**：在输入空间重建，无需增强但被迫建模低级细节
- **JEPA**：在表示空间预测，target encoder 自动学习抽象掉不相关细节，无需增强也能学到语义表示

##### Multi-block Masking 策略

![Masking 策略](https://ar5iv.labs.arxiv.org/html/2301.08243/assets/x6.png)
*图：Multi-block masking 策略示意。左：采样多个 target block；右：context block 为 target 的补集。*

masking 策略是 I-JEPA 的另一核心设计，直接决定了表示的语义层次：

**采样过程**：
1. 采样 **4 个 target block**：scale ∈ (0.15, 0.2)，aspect ratio ∈ (0.75, 1.5)
2. 采样 **1 个 context block**：scale ∈ (0.85, 1.0)，aspect ratio = 1
3. 从 context block 中**移除**与任何 target block 重叠的 patch
4. Context encoder 仅处理剩余的 context patch

> 💡 **为什么 multi-block 有效？** 关键在于两点：(a) target block 的 scale 足够大（语义级），使预测任务需要高层理解；(b) context 是空间分散的（移除了 target 区域），迫使模型利用远距离语义信息进行预测，而非简单的局部外推。

**Ablation 验证**（ViT-B/16, 300 epochs, 1% ImageNet linear probe）：

| Masking 策略 | Target 数量 | Context 比例 | Top-1 |
|-------------|------------|-------------|-------|
| **multi-block**（本文） | 4 | 0.25 | **54.2** |
| rasterized（四象限） | 3 | 0.25 | 15.5 |
| block（单大块） | 1 | 0.40 | 20.2 |
| random（随机 patch） | 1 | 0.40 | 17.6 |

Multi-block 策略以巨大优势胜出，验证了"多个语义级 target + 空间分散 context"的设计合理性。

##### 损失函数

I-JEPA 使用简单的 **L2 损失**在表示空间计算预测误差：

$$\mathcal{L} = \frac{1}{|\mathcal{B}|} \sum_{x \in \mathcal{B}} \sum_{i=1}^{M} \left\| s_{\bar{\theta}}(x, B_i^y) - g_\phi\left(s_\theta(x, B^x),\, \text{pos}(B_i^y)\right) \right\|_2^2$$

其中：
- \(s_\theta(x, B^x)\)：context encoder 对可见 patch 集合 \(B^x\) 的输出
- \(s_{\bar{\theta}}(x, B_i^y)\)：target encoder 对第 \(i\) 个 target block \(B_i^y\) 的输出
- \(g_\phi(\cdot, \text{pos}(B_i^y))\)：predictor 以 context 表示和目标位置编码为输入的预测
- \(M=4\)：target block 数量

**Target encoder 的 EMA 更新**：

$$\bar{\theta} \leftarrow \alpha \cdot \bar{\theta} + (1 - \alpha) \cdot \theta$$

EMA 系数 \(\alpha\) 从 0.996 线性增加到 1.0，确保 target encoder 缓慢演化，提供稳定的预测目标。

> ⚠️ **表示空间 vs 像素空间的关键对比**：当将损失改为在像素空间计算时（即 target 为原始像素而非 encoder 输出），ViT-L/16 在 1% ImageNet 线性探测上从 **66.9%** 暴跌至 **40.7%**，充分证明了表示空间预测的核心价值。

##### 算法伪代码

```python
# I-JEPA 训练伪代码
for images in dataloader:
    # 1. Multi-block masking
    target_blocks = sample_target_blocks(N=4, scale=(0.15, 0.2), ar=(0.75, 1.5))
    context_block = sample_context_block(scale=(0.85, 1.0))
    context_patches = remove_overlap(context_block, target_blocks)
    
    # 2. Target encoder (no gradient)
    with torch.no_grad():
        target_reps = [target_encoder(images, block) for block in target_blocks]
    
    # 3. Context encoder + Predictor
    context_rep = context_encoder(images, context_patches)  # ViT forward
    pred_reps = [predictor(context_rep, pos_tokens(block)) for block in target_blocks]
    
    # 4. L2 loss in representation space
    loss = sum(F.mse_loss(pred, target) for pred, target in zip(pred_reps, target_reps))
    
    # 5. Update context encoder & predictor via gradient
    loss.backward()
    optimizer.step()
    
    # 6. EMA update target encoder
    ema_update(target_encoder, context_encoder, momentum=alpha)
    alpha = linear_schedule(alpha, start=0.996, end=1.0)
```

##### 效率与可扩展性

I-JEPA 的计算效率优势来自两个方面：

1. **收敛速度快**：虽然 target encoder 的前向传播引入约 7% 的额外开销（相比 MAE），但 I-JEPA 仅需约 **1/5 的训练 epoch** 即可达到相同性能，整体计算量大幅节省
2. **无需多视图处理**：不变性方法（如 iBOT）需要对每张图像生成多个增强视图并分别前向传播，而 I-JEPA 仅处理一张图像的不同 patch 子集

具体数据：
- ViT-H/14 + I-JEPA：**16 × A100, <72 小时**
- ViT-H/14 + I-JEPA 的总 GPU 时间 **< ViT-S/16 + iBOT**（即 I-JEPA 的巨型模型比 iBOT 的小模型还省算力）
- 相比 MAE，I-JEPA 在 1% ImageNet 半监督评估中达到相同性能所需 GPU 小时约为 **1/5**

##### 主要实验结果

**ImageNet 线性探测与半监督**（1% labels）：

| 方法 | 架构 | 增强 | Linear Top-1 | 1% Semi Top-1 |
|------|------|------|-------------|---------------|
| MAE | ViT-H/14 | ✗ | 77.3 | 66.2 |
| data2vec | ViT-L/16 | ✗ | 81.6 | — |
| **I-JEPA** | **ViT-H/14** | **✗** | **87.5** | **72.3** |
| DINO | ViT-B/8 | ✓ | 84.9 | — |
| iBOT | ViT-L/16 | ✓ | 88.3 | — |

**低级任务（线性探测）**：

| 方法 | Clevr/Count | Clevr/Dist |
|------|------------|------------|
| DINO | 86.6 | 53.4 |
| iBOT | 85.7 | 62.8 |
| **I-JEPA** | **86.7** | **72.4** |

I-JEPA 在深度预测任务上大幅超越不变性方法（72.4 vs 62.8），证明其在保留局部空间信息方面的优势——这正是不变性方法因过度增强而丢失的信息。

#### 🧪 练习题

```yaml
question: "I-JEPA 相比 MAE 的核心区别是什么？"
options:
  - "使用更大的 ViT 模型架构"
  - "在表示空间而非像素空间进行掩码预测"
  - "使用了更多的手工数据增强策略"
  - "采用了对比学习的损失函数"
answer: 1
explain: "I-JEPA 的核心创新在于将预测目标从像素空间转移到由 target encoder 产生的抽象表示空间，使模型无需重建低级细节即可学习语义特征。ablation 显示像素空间预测性能从 66.9% 暴跌至 40.7%。"
```