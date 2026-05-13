### HoVer-Net — 基于水平垂直距离图的细胞核实例分割与分类

```yaml
id: hovernet
name: "HoVer-Net"
full_name: "HoVer-Net: 基于水平垂直距离图的同步细胞核实例分割与分类"
year: "2019"
org: "华威大学 TIA Lab"
paper_url: "https://arxiv.org/abs/1812.06499"
category: "diagnostic"
parent: "—"
motivation: "\\(\\text{利用水平和垂直距离图(HoVer Maps)编码核像素到质心的空间关系，结合Sobel梯度和分水岭算法实现精准的细胞核实例分割与分类}\\)"
```

#### 📝 一句话总结

HoVer-Net 提出利用**水平和垂直距离图（HoVer Maps）**编码每个核像素到其所属实例质心的归一化距离，通过 Sobel 梯度算子提取实例边界并结合 marker-controlled watershed 实现精准的细胞核实例分割，同时通过专用分类分支完成核类型预测，在多个病理图像数据集上取得 SOTA 性能。

#### 🎯 核心要点

- **三分支解码架构**：Nuclear Pixel (NP) 分支预测前景/背景、HoVer 分支回归水平和垂直距离图、Nuclear Classification (NC) 分支预测核类型
- **HoVer Maps 表示**：将每个核像素到其实例质心的水平/垂直距离归一化到 \([-1, 1]\)，使不同实例间产生显著的像素值跳变
- **Sobel 梯度后处理**：对 HoVer Maps 施加 Sobel 算子提取梯度，高梯度区域标识实例边界，结合 marker-controlled watershed 完成实例分割
- **多项损失函数**：HoVer 分支使用 MSE + 梯度 MSE（\(\lambda_b=2\)），NP 分支使用 BCE + Dice，NC 分支使用 CE + Dice，共 6 项损失联合优化
- **Preact-ResNet50 编码器**：移除最后一个残差组的 stride 并使用空洞卷积，将降采样因子从 32 降至 8，保留更多空间细节
- **CoNSeP 数据集**：新提出的结直肠核分割与表型数据集，包含 24,319 个标注核，涵盖 7 种核类型
- **实例级分类**：通过对实例内所有像素的 NC 分支预测取多数投票，将像素级分类转换为实例级分类
- **SOTA 性能**：在 Kumar（PQ=0.597）、CoNSeP（PQ=0.547）、CPM-17（PQ=0.697）数据集上均达到最优

#### 🔬 深入细节

##### 整体流程

![HoVer-Net 整体流程图](https://ar5iv.labs.arxiv.org/html/1812.06499/assets/pipeline2.png)
*图：HoVer-Net 从输入图像到最终实例分割与分类的完整流程。上方为网络三分支输出，下方为基于 Sobel 梯度的后处理 pipeline。*

##### 网络架构

![HoVer-Net 网络架构](https://ar5iv.labs.arxiv.org/html/1812.06499/assets/network.png)
*图：HoVer-Net 编码器-解码器架构。(a) Pre-activated 残差单元；(b) Dense 解码单元；(c) 完整网络结构，包含共享编码器和三个独立解码分支。*

```python
# HoVer-Net 前向推理 + 后处理伪代码
import numpy as np
from scipy.ndimage import sobel
from skimage.segmentation import watershed

# ====== 网络前向传播 ======
def hovernet_forward(image):
    """
    输入: image (270×270×3)
    编码器: Preact-ResNet50 (stride 8, 最后一组用 atrous conv)
    """
    features = preact_resnet50_encoder(image)  # 多尺度特征

    # 三个解码分支 (输出 80×80)
    np_map = NP_decoder(features)    # 核像素概率图, sigmoid → [0,1]
    hover_h = HoVer_decoder_h(features)  # 水平距离图, tanh → [-1,1]
    hover_v = HoVer_decoder_v(features)  # 垂直距离图, tanh → [-1,1]
    nc_map = NC_decoder(features)    # 核类型概率图, softmax → K类

    return np_map, hover_h, hover_v, nc_map

# ====== 后处理 Pipeline ======
def post_process(np_map, hover_h, hover_v, nc_map, h=0.5, k=0.4):
    # Step 1: Sobel 梯度计算
    grad_h = sobel(hover_h, axis=1)  # 水平方向 Sobel
    grad_v = sobel(hover_v, axis=0)  # 垂直方向 Sobel
    S_m = np.maximum(np.abs(grad_h), np.abs(grad_v))  # 取最大梯度

    # Step 2: 生成 markers
    fg_mask = (np_map > h).astype(int)       # τ(q, h): 前景阈值
    boundary = (S_m > k).astype(int)          # τ(S_m, k): 边界阈值
    markers = np.clip(fg_mask - boundary, 0, 1)  # σ(τ(q,h) - τ(S_m,k))
    markers = label_connected_components(markers)  # 连通域标记

    # Step 3: 能量景观
    E = (1 - boundary) * fg_mask  # E = [1 - τ(S_m, k)] * τ(q, h)

    # Step 4: Marker-controlled watershed
    instances = watershed(-E, markers=markers, mask=fg_mask)

    # Step 5: 实例级分类 (多数投票)
    for inst_id in np.unique(instances):
        if inst_id == 0: continue
        mask = (instances == inst_id)
        pixel_classes = nc_map[mask].argmax(axis=-1)
        majority_class = np.bincount(pixel_classes).argmax()
        # 赋予该实例 majority_class 类型

    return instances
```

##### 动机与背景

在计算病理学中，**细胞核的实例分割与分类**是组织分析的基础任务。传统方法面临两大核心挑战：

1. **实例分割难题**：语义分割方法（如 FCN、U-Net）只能区分前景/背景，无法分离紧密相邻的核。现有实例分割方法（如基于距离变换的 watershed）在密集核区域容易产生过分割或欠分割。
2. **分割与分类脱节**：大多数方法将分割和分类作为两个独立步骤，缺乏信息共享，导致分类精度受限。

> 💡 **关键洞察**：HoVer-Net 的核心创新在于——不同实例的 HoVer Map 值在边界处会产生**符号突变**（例如左侧核的右边缘 hover_h ≈ +1，右侧核的左边缘 hover_h ≈ -1），这种突变可以被 Sobel 梯度算子精确捕获，从而自然地分离相邻实例。

##### HoVer Maps 的设计原理

![HoVer Maps 可视化](https://ar5iv.labs.arxiv.org/html/1812.06499/assets/x1.png)
*图：水平和垂直距离图的预测结果。箭头标示了相邻核之间的显著像素值跳变，这些跳变被 Sobel 算子捕获后用于分离实例。*

对于属于核实例 \(i\) 的每个像素 \((x, y)\)，HoVer Maps 定义为：

$$p_x(x, y) = \frac{x - \bar{x}_i}{N_{x,i}}, \quad p_y(x, y) = \frac{y - \bar{y}_i}{N_{y,i}}$$

其中 \(\bar{x}_i, \bar{y}_i\) 是实例 \(i\) 的质心坐标，\(N_{x,i}, N_{y,i}\) 是归一化因子（实例在对应方向上的最大距离），确保值域为 \([-1, 1]\)。背景像素的 HoVer 值设为 0。

> ⚠️ **注意**：HoVer Maps 与距离变换的关键区别在于——距离变换只编码到边界的距离（标量），而 HoVer Maps 编码到质心的**有方向**距离（向量），这使得相邻核的边界处产生方向性突变，更利于分离。

##### 多项损失函数设计

总损失函数为六项加权和：

$$\mathcal{L} = \lambda_a L_a + \lambda_b L_b + \lambda_c L_c + \lambda_d L_d + \lambda_e L_e + \lambda_f L_f$$

各项含义：

| 损失项 | 分支 | 公式 | 作用 | 权重 |
|--------|------|------|------|------|
| \(L_a\) | HoVer | MSE(预测距离图, GT距离图) | 回归水平/垂直距离 | \(\lambda_a=1\) |
| \(L_b\) | HoVer | MSE(预测梯度, GT梯度) | **强制梯度结构正确**，确保边界处跳变 | \(\lambda_b=2\) |
| \(L_c\) | NP | BCE(预测前景, GT前景) | 二分类前景/背景 | \(\lambda_c=1\) |
| \(L_d\) | NP | Dice Loss | 缓解前景/背景类别不平衡 | \(\lambda_d=1\) |
| \(L_e\) | NC | CE(预测类型, GT类型) | 多分类核类型 | \(\lambda_e=1\) |
| \(L_f\) | NC | Dice Loss | 缓解核类型间的类别不平衡 | \(\lambda_f=1\) |

> 💡 **关键**：\(L_b\)（梯度 MSE）是本文的独特贡献——它直接约束预测的 HoVer Maps 在实例边界处产生正确的梯度跳变，实验表明加入 \(L_b\) 后 SQ（Segmentation Quality）显著提升，说明该损失对精确分割边界至关重要。\(\lambda_b=2\) 的较高权重也反映了这一设计意图。

##### 编码器设计细节

HoVer-Net 使用 **Preact-ResNet50** 作为编码器骨干，但做了关键修改：

- 原始 ResNet50 的降采样因子为 32×，对于细胞核这样的小目标会丢失过多空间信息
- 移除最后一个残差组（conv5_x）的 stride-2 下采样，改用 **空洞卷积（dilation rate=2）**保持感受野
- 最终降采样因子降为 **8×**，输入 270×270 → 特征图约 34×34
- 三个解码分支通过上采样恢复到 80×80 的输出分辨率

##### 与传统方法的对比

| 特性 | 距离变换 + Watershed | DCAN (边界检测) | Mask R-CNN | **HoVer-Net** |
|------|---------------------|-----------------|------------|---------------|
| 实例分离信号 | 到边界的距离 | 预测边界 | 区域提议 | HoVer 梯度跳变 |
| 密集核处理 | 易过分割 | 边界不连续导致欠分割 | 提议框重叠问题 | **梯度自然分离** |
| 分类能力 | 无 | 无 | 有（但两阶段） | **端到端联合** |
| 后处理复杂度 | 简单 | 简单 | 复杂（NMS等） | 中等（Sobel+WS） |
| Kumar PQ | 0.443 (DIST) | 0.492 (DCAN) | 0.509 | **0.597** |
| CPM-17 PQ | 0.504 (DIST) | 0.545 (DCAN) | 0.674 | **0.697** |

HoVer-Net 在三个数据集上的 PQ 指标均超越所有对比方法，特别是在 CPM-17 上 PQ 达到 0.697，比第二名 Mask R-CNN（0.674）高出 2.3 个百分点。

#### 🧪 练习题

```yaml
question: "HoVer-Net 中 HoVer Maps 的核心作用是什么？"
options:
  - "编码每个核像素到最近边界的距离，用于生成分水岭的能量景观"
  - "编码每个核像素到其所属实例质心的归一化水平/垂直距离，利用相邻实例间的梯度跳变分离核"
  - "编码每个核像素的分类概率，用于区分不同类型的细胞核"
  - "编码每个核像素到图像中心的距离，用于感受野自适应调整"
answer: 1
explain: "HoVer Maps 将每个核像素到其实例质心的水平/垂直距离归一化到[-1,1]，不同实例边界处会产生显著的值跳变（如从+1突变到-1），Sobel算子捕获这些跳变后即可精确分离相邻核实例。这与距离变换（选项A）的关键区别在于HoVer Maps编码的是有方向的到质心距离，而非到边界的标量距离。"
```