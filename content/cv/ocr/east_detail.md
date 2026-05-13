### EAST

```yaml
id: east
name: EAST
full_name: "高效精确的场景文本检测器 (Efficient and Accurate Scene Text detector)"
year: "2017"
org: "Megvii (Face++)"
paper_url: "https://arxiv.org/abs/1704.03155"
category: "detection"
parent: "—"
motivation: "单阶段直接回归简化流程"
```

#### 📝 一句话总结

EAST 提出了一种极简的单阶段场景文本检测方法，通过全卷积网络（FCN）直接在每个像素位置预测文本置信度和几何形状（旋转矩形或四边形），彻底消除了传统方法中候选区域提取、文本行聚合、分词等冗余中间步骤，在保持实时速度的同时大幅提升了检测精度。

#### 🎯 核心要点

- **极简两阶段流水线**：仅包含 FCN 密集预测 + NMS 后处理，去除候选聚合、分词等所有中间步骤
- **双几何输出模式**：支持 RBOX（旋转矩形，5 通道：4 距离 + 1 角度）和 QUAD（四边形，8 通道：4 顶点偏移），适应不同场景
- **U-shape 特征合并网络**：自底向上提取多尺度特征（1/4 ~ 1/32），自顶向下逐级 unpool + concat + conv 合并，输出 1/4 分辨率
- **尺度不变的 IoU 损失**：RBOX 几何回归采用 \(-\log \text{IoU}\) 损失，对不同尺度文本天然不变
- **Locality-Aware NMS**：利用相邻像素几何体高度相关的假设，按行逐步合并，将 NMS 从 \(O(n^2)\) 降至 \(O(n)\)
- **Backbone 灵活**：支持 VGG16（精度优先）和 PVANet（速度优先），PVANet 2x 达 13.2 FPS（720p）
- **多基准 SOTA**：ICDAR 2015 F-score 0.7820（单尺度）/ 0.8072（多尺度），MSRA-TD500 F-score 0.7608，COCO-Text F-score 0.3245

#### 🔬 深入细节

##### 流水线对比与动机

![EAST 流水线对比](https://ar5iv.labs.arxiv.org/html/1704.03155/assets/x1.png)
*图 1：传统多阶段文本检测流水线（上）vs EAST 极简流水线（下）。传统方法需要候选生成、过滤、文本行聚合、分词等多个步骤，每一步的误差都会累积；EAST 将所有步骤压缩为 FCN + NMS 两步。*

传统场景文本检测方法（如 CTPN、TextBoxes 等）通常包含多个串行阶段：候选区域生成 → 候选过滤 → 边界框回归 → 文本行聚合 → 分词。这种多阶段设计存在两个核心问题：

1. **误差累积**：每个中间步骤的错误都会传递到下游，最终性能受限于最弱环节
2. **速度瓶颈**：冗余的后处理步骤（尤其是文本行聚合和分词）显著增加推理时间

EAST 的核心思想是：**让网络直接在每个像素位置预测文本区域的完整几何描述**，从而跳过所有中间步骤。

##### 网络架构

![EAST 网络架构](https://ar5iv.labs.arxiv.org/html/1704.03155/assets/x2.png)
*图 2：EAST 网络架构。左侧为特征提取干（feature extractor stem），中间为特征合并分支（feature-merging branch），右侧为输出层。*

网络由三部分组成：

**1. 特征提取干（Feature Extractor Stem）**

使用预训练的卷积网络（VGG16 或 PVANet）作为骨干，从四个不同层级提取特征图：

$$f_1, f_2, f_3, f_4$$

分别对应原图的 1/4、1/8、1/16、1/32 分辨率。这些多尺度特征图能同时捕获小文本的细节信息和大文本的语义信息。

**2. 特征合并分支（Feature-Merging Branch）**

采用类似 U-Net 的自顶向下合并策略，逐级融合多尺度特征：

$$h_i = f_i \quad (i=1)$$

$$g_i = \text{unpool}(h_i) \quad (i \geq 2)$$

$$h_i = \text{Conv}_{3\times3}(\text{Conv}_{1\times1}([g_i; f_{i-1}]))$$

其中 \([g_i; f_{i-1}]\) 表示沿通道维度拼接。每一级先用 1×1 卷积降维，再用 3×3 卷积融合特征。最终输出特征图 \(h_4\) 的分辨率为原图的 1/4。

> 💡 **关键设计**：合并分支中每级的通道数逐步减半（如 128→64→32），既保证了感受野的逐步扩大，又控制了计算量。

**3. 输出层**

在合并后的特征图上，用 1×1 卷积产生两类输出：

- **Score Map**（1 通道）：每个像素属于文本区域的置信度，值域 \([0, 1]\)
- **Geometry Map**：
  - **RBOX 模式**（5 通道）：4 个通道分别表示像素到矩形上、右、下、左边界的距离 \((d_1, d_2, d_3, d_4)\)，1 个通道表示旋转角度 \(\theta \in [-\pi/4, \pi/4)\)
  - **QUAD 模式**（8 通道）：4 个顶点相对于当前像素位置的偏移量 \((\Delta x_i, \Delta y_i), i=1,2,3,4\)

##### 标签生成

![EAST 标签生成](https://ar5iv.labs.arxiv.org/html/1704.03155/assets/x3.png)
*图 3：标签生成过程。(a) 原始四边形标注；(b) 收缩后的正样本区域（绿色）；(c) RBOX 几何标签；(d) QUAD 几何标签。*

**Score Map 标签**：为避免文本边界处的模糊性，对原始四边形标注进行收缩处理。对四边形的每条边，按参考长度的 \(0.3\) 倍向内收缩：

$$D(p_i) = \min(D(p_i, p_{(i \bmod 4)+1}),\ D(p_i, p_{((i+2) \bmod 4)+1}))$$

其中 \(D(p_i, p_j)\) 是顶点 \(p_i\) 到 \(p_j\) 的欧氏距离。收缩后的区域内像素标记为正样本（score = 1），其余为负样本。

**Geometry 标签**：对于正样本区域内的每个像素，计算其到对应文本框边界的距离（RBOX）或顶点偏移（QUAD）。

##### 损失函数

总损失为分类损失和几何损失的加权和：

$$L = L_s + \lambda_g \cdot L_g$$

其中 \(\lambda_g\) 设为 1。

**分类损失 \(L_s\)**：采用类别平衡的交叉熵损失，通过对正负样本加权来处理严重的类别不平衡：

$$L_s = -\beta \cdot Y^* \cdot \log(\hat{Y}) - (1-\beta) \cdot (1-Y^*) \cdot \log(1-\hat{Y})$$

其中 \(\beta\) 为负样本在训练 patch 中的比例，自动平衡正负样本的贡献。

**RBOX 几何损失 \(L_g\)**：由 AABB 损失和角度损失两部分组成：

$$L_g = L_{\text{AABB}} + \lambda_\theta \cdot L_\theta$$

AABB 部分采用 IoU 损失，对不同尺度的文本天然不变：

$$L_{\text{AABB}} = -\log \text{IoU}(\hat{\mathbf{R}}, \mathbf{R}^*) = -\log \frac{|\hat{\mathbf{R}} \cap \mathbf{R}^*|}{|\hat{\mathbf{R}} \cup \mathbf{R}^*|}$$

其中交集的宽和高可直接计算：

$$w_i = \min(\hat{d}_2, d_2^*) + \min(\hat{d}_4, d_4^*), \quad h_i = \min(\hat{d}_1, d_1^*) + \min(\hat{d}_3, d_3^*)$$

角度部分采用余弦损失：

$$L_\theta(\hat{\theta}, \theta^*) = 1 - \cos(\hat{\theta} - \theta^*)$$

> 💡 **关键**：\(\lambda_\theta = 10\)，角度损失权重较高，因为角度预测的准确性对最终检测框质量至关重要。

**QUAD 几何损失**：采用尺度归一化的 Smooth-L1 损失：

$$L_g = \min_{\tilde{Q}} \sum_{c_i \in C_{\tilde{Q}}} \frac{\text{smoothed}_{L_1}(d_i, d_i^*)}{8 \times N_{\tilde{Q}}^*}$$

其中 \(N_{\tilde{Q}}^*\) 是四边形最短边长，用于归一化不同尺度文本的损失贡献。

##### 核心算法伪代码

```python
# EAST 检测流程伪代码
def east_detect(image, model, score_thresh=0.5):
    # 1. FCN 前向推理
    score_map, geometry_map = model(image)  # score: H/4×W/4×1, geo: H/4×W/4×5(RBOX)或8(QUAD)
    
    # 2. 阈值过滤
    mask = score_map > score_thresh
    scores = score_map[mask]
    geometries = geometry_map[mask]
    
    # 3. Locality-Aware NMS
    detections = locality_aware_nms(geometries, scores)
    return detections

def locality_aware_nms(geometries, scores):
    """按行扫描合并，O(n) 最优复杂度"""
    # 按行（y坐标）排序
    S = sort_by_row(geometries, scores)
    merged = None
    results = []
    
    for g, s in S:
        if merged is not None and should_merge(g, merged):
            # 按置信度加权合并坐标
            merged = weighted_merge(g, merged)
        else:
            if merged is not None:
                results.append(merged)
            merged = (g, s)
    
    if merged is not None:
        results.append(merged)
    
    # 对合并后的少量候选执行标准 NMS
    return standard_nms(results)
```

##### 与传统方法的对比

| 特性 | 传统多阶段方法 | EAST |
|------|--------------|------|
| 流水线步骤 | 候选生成→过滤→回归→聚合→分词 | FCN → NMS |
| 中间表示 | 字符/单词候选框 | 像素级 score + geometry |
| 几何输出 | 水平矩形 | 旋转矩形 / 任意四边形 |
| 后处理复杂度 | 高（多步串行） | 低（单步 NMS） |
| 速度（720p） | 通常 < 5 FPS | 6.5~16.8 FPS |
| 多方向文本 | 需要额外设计 | 天然支持 |

> ⚠️ **注意**：EAST 在 RBOX 模式下计算 AABB 损失时忽略了旋转角度的影响，这是一种近似——当角度预测准确时，该近似误差很小。这种解耦设计简化了损失计算，同时在实验中表现良好。

##### 实验结果

在三个主流基准上的表现：

**ICDAR 2015**（倾斜文本检测）：
| 方法 | Precision | Recall | F-score | FPS |
|------|-----------|--------|---------|-----|
| CTPN | 0.7411 | 0.5168 | 0.6085 | 7.1 |
| RRPN | 0.8202 | 0.7340 | 0.7744 | — |
| **EAST (PVANet 2x)** | **0.8034** | **0.7608** | **0.7820** | **13.2** |
| EAST (VGG16, 多尺度) | 0.8072 | — | 0.8072 | 6.52 |

**MSRA-TD500**（多语言长文本行）：F-score = 0.7608，Precision = 0.8152，Recall = 0.7127

**COCO-Text**（大规模自然场景）：F-score = 0.3245（AP = 0.3218）

#### 🧪 练习题

```yaml
question: "EAST 在 RBOX 模式下，几何损失 L_g 由哪两部分组成？"
options:
  - "交叉熵损失 + Smooth-L1 损失"
  - "IoU 损失（AABB 距离）+ 余弦角度损失"
  - "MSE 损失 + 交叉熵损失"
  - "Focal Loss + L2 正则化损失"
answer: 1
explain: "RBOX 几何损失由 AABB 的 -log IoU 损失和旋转角度的余弦损失 1-cos(θ̂-θ*) 加权求和组成，其中角度损失权重 λ_θ=10。"
```