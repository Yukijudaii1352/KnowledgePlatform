### SRFormer — 统一分割与回归的场景文本检测

```yaml
id: srformer
name: SRFormer
full_name: "SRFormer: Unifying Segmentation and Regression for Scene Text Detection"
year: "2024"
org: ByteDance
paper_url: "https://arxiv.org/abs/2308.10531"
category: cv/ocr
parent: "DETR / DPText-DETR"
motivation: "统一分割与回归刷新SOTA"
```

#### 📝 一句话总结

SRFormer 在 DETR 框架的 Decoder 中**同时引入分割分支与回归分支**，利用预测的实例掩码为控制点回归提供锚点先验，并通过 Mask-guided Query Enhancement (MQE) 模块以掩码为软注意力权重增强查询特征，在 Total-Text、CTW1500、ICDAR19-ArT 三大任意形状文本检测基准上均取得 SOTA。

#### 🎯 核心要点

- **统一 Decoder 架构**：将 6 层 Decoder 分为前 N 层 Segmentation & Regression Chunk（同时输出掩码与控制点）和后续 Regression-only Chunk（仅精细化控制点），兼顾分割的全局感知与回归的逐层精炼
- **掩码作为回归先验**：利用预测掩码的概率加权计算实例重心作为锚点（anchor point），控制点以该锚点为基准回归偏移量，提供强位置先验
- **Mask-guided Query Enhancement (MQE)**：将实例掩码与语义掩码分别作为软 ROI 权重，对像素特征做加权池化后注入查询嵌入，等效于以掩码为位置编码的交叉注意力机制
- **高效收敛**：分割分支引入的像素级监督使模型在训练早期即获得良好定位能力，收敛速度显著优于纯回归方法 DPText-DETR
- **SOTA 性能**：Total-Text F1=90.0%、CTW1500 F1=89.5%、ICDAR19-ArT F1=79.3%，分别超越前 SOTA DPText +1.3/+0.7/+1.2 个百分点

#### 🔬 深入细节

##### 整体架构

![SRFormer 整体架构](https://arxiv.org/html/2308.10531v2/x1.png)
*图 1：SRFormer 整体架构。Decoder 前几层为 Segmentation & Regression Chunk（同时预测掩码与控制点），后续层为 Regression-only Chunk（仅精炼控制点）。MQE 模块利用掩码预测增强查询特征。*

SRFormer 沿用 DETR 的 Encoder-Decoder 范式：
1. **Backbone + Encoder**：ResNet-50 提取多尺度特征，经 Deformable Transformer Encoder（8 头、4 采样点）更新得到像素级特征图 \(\mathbf{F}\)。
2. **Query 初始化**：从 Encoder 输出中选取分类得分 Top-K 的 proposal 作为位置查询（正弦位置编码），配合可学习的内容查询，共 100 个 query。
3. **Decoder**：总共 6 层，分为两种 Chunk：
   - **Seg & Reg Chunk**（前 \(N\) 层）：每层同时输出实例掩码、语义掩码和控制点坐标，并通过 MQE 模块将掩码信息反馈到查询嵌入。
   - **Reg-only Chunk**（后 \(6-N\) 层）：仅进行控制点坐标的逐层精炼，不再预测掩码。

> 💡 **关键直觉**：分割任务提供像素级密集监督，帮助模型在训练早期快速建立"哪里有文字"的全局感知；回归任务则在此基础上逐层精细化多边形边界。两者在 Decoder 中的有机融合，既避免了纯分割方法复杂后处理的问题，又克服了纯回归方法收敛慢、对位置先验敏感的缺陷。

##### 掩码预测与锚点生成

![掩码预测头](https://arxiv.org/html/2308.10531v2/x3.png)
*图 2：掩码预测头。实例掩码通过 query 嵌入与像素特征的点积生成；语义掩码通过共享 1×1 卷积生成。*

在 Seg & Reg Chunk 的每一层中，掩码预测包含两个分支：

**实例掩码（Instance Mask）**：

$$\mathbf{M}_{\text{ins}}^{(i)} = \sigma\!\bigl(\text{MLP}(\mathbf{q}_i) \cdot \mathbf{F}^T\bigr) \in [0,1]^{H \times W}$$

其中 \(\mathbf{q}_i\) 是第 \(i\) 个 query 的嵌入，\(\mathbf{F}\) 是像素特征图，\(\sigma\) 为 Sigmoid。每个 query 生成一张独立的实例掩码，表示该 query 对应文本实例的空间范围。

**语义掩码（Semantic Mask）**：

$$\mathbf{M}_{\text{sem}} = \sigma\!\bigl(\text{Conv}_{1\times1}(\mathbf{F})\bigr) \in [0,1]^{H \times W}$$

所有 query 共享同一张语义掩码，提供全局的文本/非文本二值先验。

**锚点生成**：利用实例掩码的概率分布计算加权重心作为锚点：

$$\mathbf{a}_i = \frac{\sum_{(x,y)} \mathbf{M}_{\text{ins}}^{(i)}(x,y) \cdot (x, y)}{\sum_{(x,y)} \mathbf{M}_{\text{ins}}^{(i)}(x,y)}$$

控制点坐标以该锚点为基准进行偏移回归：\(\mathbf{p}_k = \mathbf{a}_i + \Delta\mathbf{p}_k\)，其中 \(\Delta\mathbf{p}_k\) 由 MLP 从 query 嵌入预测。

> 💡 **为什么用掩码重心做锚点？** 传统 DETR 检测中，参考点来自 Encoder proposal，在训练初期可能偏离真实目标中心。掩码重心直接由像素级预测驱动，即使在训练早期也能提供相对准确的位置先验，加速控制点回归的收敛。

##### Mask-guided Query Enhancement (MQE)

![MQE 模块](https://arxiv.org/html/2308.10531v2/x4.png)
*图 3：MQE 模块。利用实例掩码和语义掩码分别对像素特征做加权池化，增强 query 嵌入。*

MQE 是 SRFormer 的另一核心创新，其目标是将掩码中蕴含的空间信息反馈到 query 嵌入中，使每个 query 能"看到"其对应文本区域的丰富像素特征。

**实例分支**：

$$\mathbf{e}_{\text{ins}}^{(i)} = \text{Linear}\!\left(\frac{\sum_{(x,y)} \mathbf{M}_{\text{ins}}^{(i)}(x,y) \cdot \mathbf{F}(x,y)}{\sum_{(x,y)} \mathbf{M}_{\text{ins}}^{(i)}(x,y) + \epsilon}\right)$$

以实例掩码为权重对像素特征做加权平均池化，每个 query 获得独立的区域特征。

**语义分支**：

$$\mathbf{e}_{\text{sem}} = \text{Linear}\!\left(\frac{\sum_{(x,y)} \mathbf{M}_{\text{sem}}(x,y) \cdot \mathbf{F}(x,y)}{\sum_{(x,y)} \mathbf{M}_{\text{sem}}(x,y) + \epsilon}\right)$$

以语义掩码为权重做全局加权池化，所有 query 共享该特征。

**融合**：

$$\mathbf{q}_i \leftarrow \mathbf{q}_i + \mathbf{e}_{\text{ins}}^{(i)} + \mathbf{e}_{\text{sem}}$$

> 💡 **MQE 的本质**：可以将 MQE 理解为一种**以掩码为注意力权重的交叉注意力**。标准交叉注意力中，注意力权重由 query-key 点积产生；MQE 中，注意力权重直接由掩码预测给出，绕过了点积计算，同时引入了显式的空间归纳偏置。实验表明 MQE 单独带来 +1.2% F1 提升，引入参数不到 3M。

##### 算法伪代码

```python
# SRFormer Decoder 前向传播伪代码
def decoder_forward(queries, pixel_features, N_seg=3, N_total=6):
    for layer_idx in range(N_total):
        # 标准 Deformable Cross-Attention + Self-Attention
        queries = deformable_cross_attn(queries, pixel_features)
        queries = self_attn(queries)
        
        if layer_idx < N_seg:  # Seg & Reg Chunk
            # 1. 掩码预测
            inst_mask = sigmoid(mlp(queries) @ pixel_features.T)  # [N_q, H, W]
            sem_mask  = sigmoid(conv1x1(pixel_features))          # [H, W]
            
            # 2. MQE: 掩码引导的 query 增强
            inst_feat = mask_weighted_pool(inst_mask, pixel_features)  # [N_q, C]
            sem_feat  = mask_weighted_pool(sem_mask, pixel_features)   # [C]
            queries   = queries + linear(inst_feat) + linear(sem_feat)
            
            # 3. 锚点生成 + 控制点回归
            anchor = mask_weighted_centroid(inst_mask)       # [N_q, 2]
            offsets = mlp_reg(queries)                       # [N_q, 2K]
            ctrl_pts = anchor.unsqueeze(1) + offsets.view(N_q, K, 2)
        else:  # Regression-only Chunk
            # 仅精炼控制点
            offsets = mlp_reg(queries)
            ctrl_pts = prev_ctrl_pts + offsets.view(N_q, K, 2)
        
        # 分类预测
        cls_score = cls_head(queries)
    
    return cls_score, ctrl_pts, inst_mask, sem_mask
```

##### 损失函数与训练

**匈牙利匹配**：采用与 DETR 相同的二部图匹配，匹配代价为分类代价、掩码代价和回归代价的加权和：

$$\mathcal{C} = \lambda_{\text{cls}} \mathcal{L}_{\text{cls}} + \lambda_{\text{mask}} \mathcal{L}_{\text{mask}} + \lambda_{\text{reg}} \mathcal{L}_{\text{reg}}$$

**总损失**：

$$\mathcal{L} = \lambda_{\text{cls}} \mathcal{L}_{\text{focal}} + \lambda_{\text{mask}} (\mathcal{L}_{\text{dice}} + \mathcal{L}_{\text{bce}}) + \lambda_{\text{reg}} \mathcal{L}_{1}$$

其中 \(\lambda_{\text{cls}}=2\)，\(\lambda_{\text{mask}}=\lambda_{\text{reg}}=5\)。掩码损失同时包含 Dice Loss 和 BCE Loss，分别作用于实例掩码和语义掩码。

**训练细节**：
- Backbone：ResNet-50，Encoder 8 头 4 采样点
- Query 数量：100，控制点数量 \(K=16\)
- 预训练：SynthText150K + MLT17 + TotalText，300K 迭代
- 微调：TotalText 30K 迭代（lr=1e-4→1e-5），CTW1500 30K 迭代（lr=5e-5）
- 优化器：AdamW（\(\beta_1=0.9, \beta_2=0.999\)，weight decay=1e-4）
- 数据增强：随机裁剪、模糊、亮度调整、颜色变换
- 多尺度训练：短边 480~896，长边≤1600；推理短边 1000，长边≤1800
- 硬件：8× NVIDIA 3090

##### 与传统方法的对比

| 维度 | 纯分割方法（DBNet/FCENet） | 纯回归方法（DPText-DETR） | SRFormer |
|------|---------------------------|--------------------------|----------|
| 检测范式 | 像素级分割 → 后处理提取轮廓 | DETR query 直接回归控制点 | Decoder 内分割+回归联合 |
| 后处理复杂度 | 高（阈值化、连通域、多边形拟合） | 低（直接输出多边形） | 低（直接输出多边形） |
| 训练收敛 | 快（密集像素监督） | 慢（稀疏点监督） | 快（掩码提供密集监督） |
| 位置先验 | 隐式（像素分类） | Encoder proposal | 掩码重心锚点 |
| 低数据场景 | — | 10% 数据 F1=75.6 | 10% 数据 F1=76.9 |

##### 消融实验关键发现

**Decoder 层分配**（Table 2，TotalText 无预训练 50K 迭代）：

| Seg 层数 | Reg 层数 | Precision | Recall | F1 |
|---------|---------|-----------|--------|-----|
| 1 | 5 | 88.6 | 84.5 | 86.5 |
| 2 | 4 | 89.0 | 85.1 | 87.0 |
| **3** | **3** | **88.0** | **86.1** | **87.1** |

> ⚠️ 注意：增加分割层数提升 Recall 但降低 Precision，因为减少了回归精炼层数。实验发现 Decoder 第一层即可获得较好的分割结果，后续层难以进一步改善掩码质量，因此 3+3 为最优平衡。

**组件消融**（Table 3）：

| AnchorReg | MQE | F1 | 提升 | 额外参数 |
|-----------|-----|-----|------|---------|
| ✗ | ✗ | 85.5 | — | — |
| ✓ | ✗ | 86.0 | +0.5 | 0.39M |
| ✗ | ✓ | 86.7 | +1.2 | 2.95M |
| ✓ | ✓ | **87.1** | **+1.6** | 3.34M |

##### 训练收敛与可视化

![训练收敛曲线](https://arxiv.org/html/2308.10531v2/x5.png)
*图 4：SRFormer 与 DPText-DETR 在 TotalText 和 Rot.TotalText 上的收敛曲线。SRFormer 在 5K 迭代后即持续领先，即使 DPText 训练时间翻倍仍不及 SRFormer。*

![检测可视化](https://arxiv.org/html/2308.10531v2/x6.png)
*图 5：SRFormer 在各数据集上的检测可视化结果。*

#### 🧪 练习题

```yaml
question: "SRFormer 中 Mask-guided Query Enhancement (MQE) 模块的核心作用是什么？"
options:
  - "替代 Decoder 中的自注意力机制以减少计算量"
  - "利用预测掩码作为软注意力权重，对像素特征做加权池化以增强 query 嵌入"
  - "生成更精确的语义分割掩码用于后处理"
  - "将掩码预测结果直接作为最终检测输出"
answer: 1
explain: "MQE 以实例掩码和语义掩码为权重对像素特征做加权平均池化，将区域特征注入 query 嵌入，等效于以掩码为位置编码的交叉注意力，带来 +1.2% F1 提升。"
```