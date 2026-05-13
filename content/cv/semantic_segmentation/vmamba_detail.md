### VMamba

```yaml
id: vmamba
name: VMamba
full_name: "VMamba: Visual State Space Model"
year: "2024"
org: "UCAS & HIT & Huawei"
paper_url: "https://arxiv.org/abs/2401.10166"
category: "backbone"
parent: "Mamba / SSM"
motivation: "将 Mamba 的线性复杂度选择性扫描机制引入视觉领域，通过 Cross-Scan Module 解决 1D 序列模型处理 2D 图像时的方向性局限，实现全局感受野与线性计算复杂度的统一"
```

#### 📝 一句话总结

VMamba 提出 Cross-Scan Module (CSM)，将 2D 图像沿四个方向展开为 1D 序列并输入选择性状态空间模型 (S6)，以 \(O(N)\) 线性复杂度实现全局感受野，在分类、检测、语义分割任务上全面超越 Swin Transformer 和 ConvNeXt 等同量级模型。

#### 🎯 核心要点

- **Cross-Scan Module (CSM)**：将 2D 特征图沿 4 个方向（左上→右下、右下→左上、右上→左下、左下→右上）展开为 1D 序列，确保任意两个像素之间至少存在一条扫描路径可达
- **SS2D (2D-Selective-Scan)**：在 CSM 展开的 4 条序列上分别执行 S6 选择性扫描，再合并回 2D 特征图，是 VSS Block 的核心算子
- **VSS Block**：Linear → DWConv 3×3 → SiLU → SS2D → LayerNorm 的双分支结构（另一分支为 Linear → SiLU 的门控），无需位置编码和 MLP 层
- **4-stage 层级架构**：类似 Swin Transformer 的金字塔结构，通道数 [C, 2C, 4C, 8C]，各 stage 通过 Patch Merging 下采样
- **三种规模**：VMamba-T (22M/4.5G)、VMamba-S (44M/9.1G)、VMamba-B (75M/15.2G)
- **线性复杂度**：相比 ViT 的 \(O(N^2)\) 全局注意力和 CNN 的局部感受野，VMamba 以 \(O(N)\) 复杂度实现全局建模
- **ADE20K 语义分割**：VMamba-T 以 UperNet 达到 47.3% mIoU (SS)，VMamba-S 达到 50.8% mIoU，VMamba-B 达到 50.0/51.3% mIoU (SS/MS)，均超越同级 Swin 和 ConvNeXt

#### 🔬 深入细节

##### 核心架构总览

![VMamba 整体架构](https://raw.githubusercontent.com/MzeroMiko/VMamba/main/assets/architecture.png)
*图：VMamba 整体架构。左侧为 4-stage 层级结构，右侧为 VSS Block 内部结构，核心是 SS2D 模块。*

##### 2D 选择性扫描 (SS2D) 示意

![SS2D Cross-Scan 示意](https://raw.githubusercontent.com/MzeroMiko/VMamba/main/assets/ss2d.png)
*图：SS2D 中的 Cross-Scan Module。2D 特征图被沿 4 个方向展开为 1D 序列，分别经过 S6 扫描后合并回 2D。*

##### 算法伪代码

```python
# VMamba VSS Block 前向传播伪代码
def vss_block_forward(x):
    # 双分支结构
    x_residual = x
    # 分支 1: SS2D 路径
    z = Linear(x)           # 投影
    x = Linear(x)           # 投影
    x = DWConv3x3(x)        # 局部特征提取
    x = SiLU(x)             # 激活
    x = ss2d(x)             # 2D 选择性扫描（核心）
    x = LayerNorm(x)
    # 分支 2: 门控
    x = x * SiLU(z)         # 门控乘法
    x = Linear(x)           # 输出投影
    return x + x_residual   # 残差连接

def ss2d(x):
    """2D Selective Scan: Cross-Scan + S6 + Cross-Merge"""
    B, C, H, W = x.shape
    # Cross-Scan: 4 方向展开
    x1 = x.flatten(row_major)           # 左上 → 右下
    x2 = x.flatten(row_major).flip()    # 右下 → 左上
    x3 = x.T.flatten(row_major)         # 右上 → 左下
    x4 = x.T.flatten(row_major).flip()  # 左下 → 右上
    # 对每条序列执行 S6 选择性扫描
    y1, y2, y3, y4 = S6(x1), S6(x2), S6(x3), S6(x4)
    # Cross-Merge: 逆展开 + 求和
    return inverse_scan(y1) + inverse_scan(y2) + inverse_scan(y3) + inverse_scan(y4)
```

##### 动机与背景

视觉 Transformer (ViT) 通过全局自注意力实现了强大的建模能力，但其 \(O(N^2)\) 的计算复杂度在高分辨率输入（如语义分割中的 512×512 或更大）时成为瓶颈。CNN 虽然高效，但受限于局部感受野，难以捕获长距离依赖。

Mamba（S6 模型）在 NLP 领域展示了以 \(O(N)\) 线性复杂度实现全局序列建模的能力，其核心是**选择性扫描机制**——通过输入依赖的参数 \(\mathbf{B}\)、\(\mathbf{C}\)、\(\Delta\) 动态决定信息的保留与遗忘。然而，Mamba 是为 1D 序列设计的，直接应用于 2D 图像面临**方向性局限**：单一扫描方向无法让所有像素对之间建立有效的信息通路。

> 💡 **关键洞察**：如果只用单方向（如从左到右）扫描，右上角的像素信息无法有效传递到左下角。VMamba 的 CSM 通过 4 方向扫描确保任意两个像素之间至少存在一条短路径。

##### 核心机制：选择性状态空间模型 (S6)

**连续 SSM** 的基本形式为：

$$h'(t) = \mathbf{A} h(t) + \mathbf{B} x(t), \quad y(t) = \mathbf{C} h(t)$$

其中 \(\mathbf{A} \in \mathbb{R}^{N \times N}\) 为状态转移矩阵，\(\mathbf{B} \in \mathbb{R}^{N \times 1}\)、\(\mathbf{C} \in \mathbb{R}^{1 \times N}\) 为投影矩阵，\(h(t) \in \mathbb{R}^N\) 为隐状态。

**离散化**后（零阶保持 ZOH）：

$$\bar{\mathbf{A}} = \exp(\Delta \mathbf{A}), \quad \bar{\mathbf{B}} = (\Delta \mathbf{A})^{-1}(\exp(\Delta \mathbf{A}) - \mathbf{I}) \cdot \Delta \mathbf{B}$$

$$h_t = \bar{\mathbf{A}} h_{t-1} + \bar{\mathbf{B}} x_t, \quad y_t = \mathbf{C} h_t$$

**S6 的关键创新**：将 \(\mathbf{B}\)、\(\mathbf{C}\)、\(\Delta\) 从固定参数变为**输入依赖**的函数，即 \(\mathbf{B}_t = f_B(x_t)\)，\(\mathbf{C}_t = f_C(x_t)\)，\(\Delta_t = \text{softplus}(f_\Delta(x_t))\)。这使得模型能够根据输入内容动态调整信息流，类似于注意力机制的选择性。

> ⚠️ **注意**：S6 的递推计算天然是因果的（当前状态只依赖过去），这在 NLP 中是合理的，但在视觉中需要非因果的全局信息交互——这正是 CSM 4 方向扫描的必要性所在。

##### 核心机制：Cross-Scan Module (CSM)

CSM 是 VMamba 最核心的创新，解决了 1D SSM 应用于 2D 图像的根本问题：

1. **Cross-Scan（展开）**：将 \(H \times W\) 的 2D 特征图沿 4 个方向展开为 4 条长度为 \(H \times W\) 的 1D 序列
   - 方向 1：逐行从左到右（左上→右下）
   - 方向 2：方向 1 的逆序（右下→左上）
   - 方向 3：逐列从上到下（右上→左下，即转置后逐行）
   - 方向 4：方向 3 的逆序（左下→右上）

2. **S6 扫描**：对 4 条序列分别执行独立的 S6 选择性扫描，各自维护独立的隐状态

3. **Cross-Merge（合并）**：将 4 条输出序列逆展开回 \(H \times W\) 的 2D 形状，然后逐元素求和

> 💡 **为什么是 4 个方向？** 考虑位于 \((i, j)\) 的像素，方向 1 可以接收其左侧和上方行的信息，方向 2 可以接收右侧和下方行的信息，方向 3/4 覆盖列方向。4 个方向的组合确保了全局连通性，且计算量仅为单方向的 4 倍，仍保持 \(O(N)\) 复杂度。

##### VSS Block 与整体架构

**VSS Block** 采用双分支门控结构（类似 Mamba Block）：
- 主分支：Linear → DWConv 3×3 → SiLU → SS2D → LayerNorm
- 门控分支：Linear → SiLU
- 输出：主分支 ⊙ 门控分支 → Linear → 残差连接

DWConv 3×3 提供局部位置信息（替代显式位置编码），SS2D 提供全局信息建模。

**整体架构**为 4-stage 层级结构：
| Stage | 分辨率 | 通道数 | Block 数 (T/S/B) |
|-------|--------|--------|-------------------|
| 1 | H/4 × W/4 | C | 2/2/2 |
| 2 | H/8 × W/8 | 2C | 2/2/2 |
| 3 | H/16 × W/16 | 4C | 5/9/15 |
| 4 | H/32 × W/32 | 8C | 2/2/2 |

其中 VMamba-T 的 C=96，VMamba-S 的 C=96（Stage 3 更深），VMamba-B 的 C=128。

##### 与传统方法的对比

| 特性 | CNN (ResNet/ConvNeXt) | ViT/Swin | VMamba |
|------|----------------------|----------|--------|
| 感受野 | 局部（堆叠扩大） | 全局（窗口/全局注意力） | 全局（SSM 递推） |
| 计算复杂度 | \(O(N)\) | \(O(N^2)\) 或 \(O(N \cdot W^2)\) | \(O(N)\) |
| 位置编码 | 隐式（卷积） | 显式（APE/RPE） | 隐式（DWConv） |
| 动态性 | 静态权重 | 输入依赖（注意力） | 输入依赖（S6 参数） |

##### 有效感受野 (ERF) 可视化

![ERF 可视化](https://raw.githubusercontent.com/MzeroMiko/VMamba/main/assets/erf.png)
*图：有效感受野对比。VMamba 的 ERF 覆盖范围远大于 ResNet 和 ConvNeXt，接近全局，且呈十字形扩展模式（对应 4 方向扫描）。*

##### 关键实验结果

**ImageNet-1K 分类**：
| 模型 | Params | FLOPs | Top-1 Acc |
|------|--------|-------|-----------|
| Swin-T | 28M | 4.5G | 81.3% |
| ConvNeXt-T | 29M | 4.5G | 82.1% |
| **VMamba-T** | **22M** | **4.5G** | **82.2%** |
| Swin-S | 50M | 8.7G | 83.0% |
| **VMamba-S** | **44M** | **9.1G** | **83.5%** |

**ADE20K 语义分割 (UperNet)**：
| 模型 | Crop Size | mIoU (SS) | mIoU (MS) | Params | FLOPs |
|------|-----------|-----------|-----------|--------|-------|
| Swin-B | 512² | 48.1 | 49.7 | 121M | 1188G |
| ConvNeXt-B | 512² | 49.1 | 49.9 | 122M | 1170G |
| **VMamba-B** | **512²** | **50.0** | **51.3** | **110M** | **1167G** |
| Swin-S | 640² | 47.9 | 48.8 | 81M | 1614G |
| **VMamba-S** | **640²** | **50.8** | **50.8** | **76M** | **1620G** |

**COCO 目标检测 (Mask R-CNN 1×)**：
| 模型 | AP^box | AP^mask |
|------|--------|---------|
| Swin-T | 42.7 | 39.3 |
| ConvNeXt-T | 44.2 | 40.1 |
| **VMamba-T** | **46.5** | **42.1** |

> 💡 **关键发现**：VMamba 在密集预测任务（检测、分割）上的优势比分类任务更显著，这得益于 SSM 在高分辨率输入下的线性复杂度优势和全局感受野。

#### 🧪 练习题

```yaml
question: "VMamba 的 Cross-Scan Module (CSM) 为什么需要 4 个扫描方向而非 2 个？"
options:
  - "4 个方向可以将计算复杂度从 O(N²) 降低到 O(N)"
  - "4 个方向确保 2D 特征图中任意两个像素之间至少存在一条有效信息传递路径"
  - "4 个方向是为了与 4-stage 层级结构对应"
  - "4 个方向可以替代多头注意力机制中的多个注意力头"
answer: 1
explain: "S6 的递推是因果的，单方向扫描只能传递该方向上的信息。2 个方向（如左→右和右→左）只能覆盖水平方向，垂直方向的像素对仍缺乏直接通路。4 个方向（水平正反 + 垂直正反）确保了 2D 平面上任意两点间的全局连通性。"
```