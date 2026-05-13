### OneFormer — 统一Former (OneFormer)

```yaml
id: oneformer
name: OneFormer
full_name: 统一Former (OneFormer)
year: '2023'
org: SHI Lab
paper_url: https://arxiv.org/abs/2211.06220
category: unified
parent: mask2former
motivation: 单次训练三任务统一分割
```

#### 📝 一句话总结

OneFormer 提出了任务条件化联合训练策略与查询-文本对比损失，使单个模型仅训练一次即可在语义、实例和全景三种分割任务上超越各自独立训练的 Mask2Former 专用模型。

#### 🎯 核心要点

- **多任务统一架构**：单个模型、单次训练同时覆盖语义/实例/全景三种分割任务
- **任务条件化联合训练**：通过 "the task is {task}" 文本输入生成 task token，条件化整个模型
- **任务引导的查询初始化**：用 task token 的 N-1 次重复初始化 object queries，替代全零初始化
- **查询-文本对比损失**：在 object queries 与 text queries 之间计算对比损失，建立任务间和类间区分
- **统一标注利用**：从全景标注中派生语义/实例标签，仅需一套标注
- **文本查询表示**：利用 6 层 Transformer 文本编码器将 GT 类别文本映射为 text queries，训练时使用、推理时丢弃
- **在 ADE20k、Cityscapes、COCO 上均超越独立训练的 Mask2Former**，资源消耗仅为后者的 1/3

#### 🔬 深入细节

![OneFormer 架构总览](https://ar5iv.labs.arxiv.org/html/2211.06220/assets/x2.png)
*图：OneFormer 整体架构。输入图像经 backbone + pixel decoder 提取多尺度特征；task input 经 tokenize 得到 task token 用于条件化 object queries；text list 经文本编码器得到 text queries 用于对比学习；transformer decoder 输出最终预测。*

![统一分割路径](https://ar5iv.labs.arxiv.org/html/2211.06220/assets/x1.png)
*图：从专用模型 → 半统一（同架构不同模型）→ 真正统一（OneFormer：同架构、同模型、同数据集）的演进路径。*

##### 动机与背景

传统图像分割方法为语义、实例、全景三种任务分别设计专用架构和模型。Mask2Former 等"新全景架构"虽然使用统一架构，但仍需为每种任务**独立训练**三个模型才能达到最优性能——这是一种"半统一"方案。OneFormer 的目标是实现**真正的统一**：单次训练、单个模型，在三种任务上均达到 SOTA。

核心挑战在于：三种任务对 object queries 的语义要求不同——实例分割只关注 thing 类别，语义分割要求每个类别仅一个无定形 mask，全景分割则是两者的混合。直接联合训练会导致性能严重下降（Mask2Former 联合训练时 PQ 下降超过 8%）。

##### 核心机制一：任务条件化联合训练

```python
# 任务条件化联合训练伪代码
for image, panoptic_annotation in dataset:
    # 1. 均匀采样任务
    task = uniform_sample(["panoptic", "instance", "semantic"])
    
    # 2. 从全景标注派生任务特定GT
    binary_masks, class_names = derive_gt(panoptic_annotation, task)
    
    # 3. 构建文本列表
    T_list = [f"a photo with a {cls}" for cls in class_names]
    T_pad = pad(T_list, N_text, fill=f"a {task} photo")  # 填充至固定长度
    
    # 4. 生成 task token
    I_task = f"the task is {task}"
    Q_task = tokenize_and_map(I_task)  # 1-D task token
    
    # 5. 条件化 object queries
    Q_prime = repeat(Q_task, N-1)  # 任务引导初始化
    Q = transformer_2layer(Q_prime, F_1_4) + [Q_task]  # 拼接 task token
    
    # 6. 前向 + 计算损失
    predictions = transformer_decoder(Q, multi_scale_features)
    loss = compute_loss(predictions, binary_masks, Q, Q_text)
```

关键设计：
- **任务均匀采样**：每张图像随机选择一个任务，从全景标注中派生对应 GT
- **统一标注**：利用全景标注的统一性（包含 stuff + thing），无需额外标注
- **任务特定 GT 派生规则**：语义→每类一个 mask；实例→仅 thing 类的非重叠 mask；全景→stuff 一个 mask + thing 非重叠 mask

##### 核心机制二：查询表示与任务条件化

OneFormer 使用两组查询：

**Object Queries \(\mathbf{Q}\)**：
1. 将 task token \(\mathbf{Q}_{\text{task}}\) 重复 \(N-1\) 次作为初始化（而非全零）
2. 通过 2 层 Transformer 与 1/4 尺度特征交互更新
3. 拼接 \(\mathbf{Q}_{\text{task}}\) 得到最终 \(N\) 个 task-conditioned queries

**Text Queries \(\mathbf{Q}_{\text{text}}\)**（仅训练时使用）：
1. 将填充后的文本列表 \(\mathbf{T}_{\text{pad}}\) 通过 6 层 Transformer 文本编码器编码
2. 拼接 \(N_{\text{ctx}}\) 个可学习文本上下文嵌入 \(\mathbf{Q}_{\text{ctx}}\)
3. 得到 \(N\) 个 text queries

> 💡 **关键**：task token 的引入使 object queries 具有任务感知能力，模型能根据不同任务动态调整预测行为。推理时只需指定任务类型即可。

##### 核心机制三：查询-文本对比损失

为了在联合训练中建立任务间和类间区分，OneFormer 在 object queries 和 text queries 之间计算对称对比损失：

$$\mathcal{L}_{\mathbf{Q}\rightarrow\mathbf{Q}_{\text{text}}} = -\frac{1}{B}\sum_{i=1}^{B}\log\frac{\exp(q_i^{obj} \odot q_i^{txt} / \tau)}{\sum_{j=1}^{B}\exp(q_i^{obj} \odot q_j^{txt} / \tau)}$$

$$\mathcal{L}_{\mathbf{Q}_{\text{text}}\rightarrow\mathbf{Q}} = -\frac{1}{B}\sum_{i=1}^{B}\log\frac{\exp(q_i^{txt} \odot q_i^{obj} / \tau)}{\sum_{j=1}^{B}\exp(q_i^{txt} \odot q_j^{obj} / \tau)}$$

$$\mathcal{L}_{\mathbf{Q}\leftrightarrow\mathbf{Q}_{\text{text}}} = \mathcal{L}_{\mathbf{Q}\rightarrow\mathbf{Q}_{\text{text}}} + \mathcal{L}_{\mathbf{Q}_{\text{text}}\rightarrow\mathbf{Q}}$$

其中 \(\odot\) 表示点积，\(\tau\) 为温度参数，\(B\) 为 batch 中匹配的 query 对数。

> 💡 **直觉**：text queries 由 GT 标签派生，天然包含任务语义信息（如语义任务只有类级别文本，实例任务只有 thing 类文本）。通过对比学习，object queries 被迫学习与当前任务对应的表示，从而实现任务区分。

##### 总损失函数

$$\mathcal{L}_{\text{final}} = \lambda_{\mathbf{Q}\leftrightarrow\mathbf{Q}_{\text{text}}}\mathcal{L}_{\mathbf{Q}\leftrightarrow\mathbf{Q}_{\text{text}}} + \lambda_{\text{cls}}\mathcal{L}_{\text{cls}} + \lambda_{\text{bce}}\mathcal{L}_{\text{bce}} + \lambda_{\text{dice}}\mathcal{L}_{\text{dice}}$$

其中 \(\lambda_{\mathbf{Q}\leftrightarrow\mathbf{Q}_{\text{text}}}=0.5\)，\(\lambda_{\text{cls}}=2\)，\(\lambda_{\text{bce}}=5\)，\(\lambda_{\text{dice}}=5\)。使用匈牙利匹配进行预测-GT 配对。

##### 架构其他组件

- **Backbone + Pixel Decoder**：使用 ImageNet 预训练骨干（Swin-L / ConvNeXt-L / DiNAT-L）提取多尺度特征，pixel decoder 采用 MSDeformAttn 架构逐步上采样
- **Transformer Decoder**：采用 Mask2Former 的多尺度策略，交替使用 1/8、1/16、1/32 分辨率特征更新 queries（masked cross-attention → self-attention → FFN），重复 L 次
- **预测头**：queries 映射到 \(K+1\) 维空间（K 类 + no-object）；mask 通过 queries 与 1/4 特征的 einsum 操作生成
- **推理**：指定任务类型，丢弃文本编码器模块，后处理阈值因数据集而异（ADE20k: 0.5, Cityscapes/COCO: 0.8）

##### 与 Mask2Former 的关键区别

| 维度 | Mask2Former | OneFormer |
|------|------------|-----------|
| 训练方式 | 每任务独立训练 | 单次联合训练 |
| 模型数量 | 3 个（每任务一个） | 1 个 |
| 任务感知 | 无 | task token 条件化 |
| Query 初始化 | 全零/随机 | task token 重复 |
| 额外监督 | 无 | 查询-文本对比损失 |
| 资源消耗 | 3× | 1× |

##### 消融实验关键结论（Cityscapes, Swin-L）

| 配置 | PQ | AP | mIoU |
|------|----|----|------|
| OneFormer (完整) | 67.2 | 45.6 | 83.0 |
| − task token | 66.5 (-0.7) | 43.3 (-2.3) | 82.9 |
| − 可学习文本上下文 | 62.7 (-4.5) | 45.0 (-0.6) | 82.8 |
| − 任务引导 query 初始化 | 65.8 (-1.4) | 44.5 (-1.1) | 83.1 |
| − 对比损失 | 58.8 (-8.4) | 42.4 (-3.2) | 82.5 |

> ⚠️ **注意**：对比损失对 PQ 的提升高达 8.4%，是 OneFormer 能成功联合训练的最关键因素。

#### 🧪 练习题

```yaml
question: "OneFormer 中 task token 的主要作用是什么？"
options:
  - "替代 backbone 提取图像特征"
  - "条件化 object queries 使模型感知当前任务类型"
  - "直接生成最终的分割 mask"
  - "计算对比损失的温度参数"
answer: 1
explain: "task token 由 'the task is {task}' 文本生成，用于初始化和拼接 object queries，使模型能根据不同任务（语义/实例/全景）动态调整预测行为。"
```