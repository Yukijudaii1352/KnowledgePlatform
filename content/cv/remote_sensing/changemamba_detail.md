### ChangeMamba: Remote Sensing Change Detection With Spatiotemporal State Space Model

```yaml
id: changemamba
name: ChangeMamba
full_name: "ChangeMamba: 基于时空状态空间模型的遥感变化检测"
year: "2024"
org: "University of Tokyo / RIKEN AIP"
paper_url: "https://ieeexplore.ieee.org/abstract/document/10565926/"
arxiv_url: "https://arxiv.org/abs/2404.03425"
code_url: "https://github.com/ChenHongruixuan/MambaCD"
category: "application"
parent: "changeformer"
motivation: "将Mamba状态空间模型引入遥感变化检测，通过三种时空关系建模机制实现线性复杂度下的高效多时相特征交互"
```

#### 📝 一句话总结

ChangeMamba 提出了基于 VMamba 编码器和三种时空状态空间（STSS）建模机制的遥感变化检测框架，以 \(O(N)\) 线性复杂度替代 Transformer 的 \(O(N^2)\) 自注意力，在二元变化检测、语义变化检测和建筑损伤评估三类任务上均取得 SOTA 性能。

#### 🎯 核心要点

- **三大任务框架**：MambaBCD（二元变化检测）、MambaSCD（语义变化检测）、MambaBDA（建筑损伤评估），统一编码器 + 任务特定解码器设计
- **Siamese VMamba 编码器**：采用权重共享的 VMamba 骨干网络，利用 2D 选择性扫描（SS2D，四方向交叉扫描）提取多尺度特征，线性复杂度建模全局上下文
- **三种时空关系建模机制**：
  - Sequential（时序拼接）：将双时相 token 按时间顺序串联
  - Cross（交叉交错）：双时相 token 逐位置交错排列
  - Parallel（通道并行）：双时相特征在通道维度拼接
- **Spatio-Temporal State Space (STSS) Block**：每个 block 包含三个 VSS 分支分别执行三种机制，融合后输出变化特征
- **4 阶段多尺度变化解码器**：逐级上采样融合编码器多尺度特征，最终生成变化图
- **损失函数**：BCD 使用 CE + Lovász-softmax；SCD/BDA 使用多头 CE 损失
- **5 个基准数据集全面验证**：SYSU-CD、LEVIR-CD+、WHU-CD（BCD）；SECOND（SCD）；xBD（BDA）
- **三种模型规模**：Tiny（17.13M/45.74G）、Small（49.94M/114.82G）、Base（84.70M/179.32G）

#### 🔬 深入细节

![ChangeMamba 整体框架图](https://arxiv.org/html/2404.03425v7/x1.png)
*图：ChangeMamba 三大框架（MambaBCD、MambaSCD、MambaBDA）的整体架构示意。所有框架共享 Siamese VMamba 编码器，通过不同解码器适配不同任务。*

![三种时空关系建模机制](https://arxiv.org/html/2404.03425v7/x4.png)
*图：三种 Spatio-Temporal Relationship Modeling 机制的 token 排列方式。(a) Sequential：时间序列拼接；(b) Cross：交错排列；(c) Parallel：通道拼接。*

##### 动机与背景

遥感变化检测需要对比不同时间获取的同一区域图像，识别地表变化。传统 CNN 方法受限于局部感受野，难以捕获大范围上下文信息；Transformer 方法虽能建模全局依赖，但 \(O(N^2)\) 的计算复杂度在高分辨率遥感图像上代价高昂。

Mamba（结构化状态空间模型 S6）以 \(O(N)\) 复杂度实现序列建模，VMamba 将其扩展到 2D 视觉任务。然而，**如何将状态空间模型应用于多时相图像的时空关系建模**是一个全新问题——这正是 ChangeMamba 的核心贡献。

##### 核心机制：VMamba 编码器

编码器采用 VMamba 的 Visual State Space (VSS) Block，核心是 **2D Selective Scan (SS2D)**：

$$\mathbf{h}'(t) = \overline{\mathbf{A}} \mathbf{h}(t-1) + \overline{\mathbf{B}} \mathbf{x}(t), \quad \mathbf{y}(t) = \mathbf{C} \mathbf{h}'(t)$$

其中 \(\overline{\mathbf{A}} = \exp(\Delta \mathbf{A})\)，\(\overline{\mathbf{B}} = (\Delta \mathbf{A})^{-1}(\exp(\Delta \mathbf{A}) - \mathbf{I}) \cdot \Delta \mathbf{B}\)。

SS2D 将 2D 特征图展开为 4 个方向的 1D 序列（左上→右下、右下→左上、左下→右上、右上→左下），分别通过 SSM 处理后合并，从而在保持线性复杂度的同时捕获全局空间依赖。

Siamese 编码器对双时相图像 \(I_{T_1}, I_{T_2}\) 共享权重提取 4 级特征：
$$F_{T_k}^l \in \mathbb{R}^{\frac{H}{2^{l+1}} \times \frac{W}{2^{l+1}} \times C_l}, \quad l=1,2,3,4$$

##### 核心创新：三种时空关系建模机制

给定双时相特征 \(F_{T_1}, F_{T_2}\)（展平为 token 序列长度 \(N\)），三种机制定义了不同的 token 排列方式输入 SSM：

**1. Sequential（时序拼接）**：
$$\mathbf{Z}_{seq} = [F_{T_1}^{(1)}, F_{T_1}^{(2)}, \ldots, F_{T_1}^{(N)}, F_{T_2}^{(1)}, F_{T_2}^{(2)}, \ldots, F_{T_2}^{(N)}]$$

直觉：模拟人类"先看前时相、再看后时相"的观察方式，SSM 的隐状态在处理 \(T_2\) 时已编码了完整的 \(T_1\) 信息。

**2. Cross（交叉交错）**：
$$\mathbf{Z}_{cross} = [F_{T_1}^{(1)}, F_{T_2}^{(1)}, F_{T_1}^{(2)}, F_{T_2}^{(2)}, \ldots, F_{T_1}^{(N)}, F_{T_2}^{(N)}]$$

直觉：同一空间位置的双时相 token 相邻排列，SSM 在每一步都能直接对比同位置的时间变化，强化局部时间差异感知。

**3. Parallel（通道并行）**：
$$\mathbf{Z}_{para} = \text{Concat}_C(F_{T_1}, F_{T_2}) \in \mathbb{R}^{N \times 2C}$$

直觉：在通道维度融合双时相信息，每个 token 同时包含两个时相的特征，由 SSM 学习通道间的时间差异模式。

> 💡 **关键洞察**：三种机制分别从"全局时序记忆"、"逐位置时间对比"、"通道级特征融合"三个互补角度建模时空关系，联合使用可全面捕获变化信息。

##### STSS Block 与变化解码器

```python
# STSS Block 伪代码
def stss_block(F_T1, F_T2):
    # 三种机制并行执行
    Z_seq = VSS_block(concat_spatial(F_T1, F_T2))      # [2N, C]
    Z_cross = VSS_block(interleave(F_T1, F_T2))        # [2N, C]  
    Z_para = VSS_block(concat_channel(F_T1, F_T2))     # [N, 2C]
    
    # 恢复原始空间尺寸并融合
    out_seq = split_and_diff(Z_seq)       # [N, C]
    out_cross = deinterleave_and_diff(Z_cross)  # [N, C]
    out_para = linear_proj(Z_para)        # [N, C]
    
    # 多机制融合
    change_feature = fusion(out_seq, out_cross, out_para)
    return change_feature

# 4阶段变化解码器
def change_decoder(encoder_features_T1, encoder_features_T2):
    for level in [4, 3, 2, 1]:  # 从深到浅
        F_T1_l = encoder_features_T1[level]
        F_T2_l = encoder_features_T2[level]
        change_l = stss_block(F_T1_l, F_T2_l)
        if level < 4:
            change_l = upsample_and_fuse(change_l, change_prev)
        change_prev = change_l
    return prediction_head(change_prev)
```

##### 损失函数设计

- **MambaBCD**：\(\mathcal{L} = \mathcal{L}_{CE} + \mathcal{L}_{Lovász}\)，Lovász-softmax 损失优化 IoU 指标
- **MambaSCD**：\(\mathcal{L} = \mathcal{L}_{CE}^{seg1} + \mathcal{L}_{CE}^{seg2} + \mathcal{L}_{CE}^{BCD}\)，同时监督双时相语义分割和二元变化
- **MambaBDA**：\(\mathcal{L} = \mathcal{L}_{CE}^{loc} + \mathcal{L}_{CE}^{cls}\)，分别监督建筑定位和损伤分类

##### 实验结果

| 任务 | 数据集 | 方法 | 核心指标 | 对比 SOTA |
|------|--------|------|----------|-----------|
| BCD | SYSU-CD | MambaBCD-Base | F1=83.11, IoU=71.10 | vs SwinSUNet F1=81.58 (+1.53) |
| BCD | LEVIR-CD+ | MambaBCD-Base | F1=88.39, IoU=79.20 | vs SwinSUNet F1=85.60 (+2.79) |
| BCD | WHU-CD | MambaBCD-Base | F1=94.19, IoU=89.02 | vs SwinSUNet F1=93.04 (+1.15) |
| SCD | SECOND | MambaSCD-Base | SeK=24.11 | vs ScanNet SeK=23.94 (+0.17) |
| BDA | xBD | MambaBDA-Base | F1_overall=81.41 | vs DamFormer F1=77.02 (+4.39) |

> ⚠️ **注意**：MambaBDA 在建筑损伤评估任务上的提升（+4.39%）远超其他任务，表明 STSS 机制在需要精细时空差异判别的场景中优势尤为显著。

##### 与传统方法的区别

| 特性 | CNN-based (FC-EF等) | Transformer-based (ChangeFormer等) | **ChangeMamba** |
|------|---------------------|--------------------------------------|-----------------|
| 全局建模 | ✗ 局部感受野 | ✓ 自注意力 | ✓ SSM 全局记忆 |
| 计算复杂度 | \(O(K^2 N)\) | \(O(N^2)\) | \(O(N)\) |
| 时空交互 | 简单差分/拼接 | Cross-attention | 三种 STSS 机制 |
| 可扩展性 | 高 | 受限于图像尺寸 | 高（线性缩放） |

#### 🧪 练习题

```yaml
question: "ChangeMamba 中 Cross 时空建模机制的 token 排列方式是什么？"
options:
  - "先排列 T1 所有 token，再排列 T2 所有 token"
  - "将 T1 和 T2 同一空间位置的 token 交错排列"
  - "将 T1 和 T2 的 token 在通道维度拼接"
  - "随机打乱 T1 和 T2 的 token 顺序后拼接"
answer: 1
explain: "Cross 机制将同一空间位置的双时相 token 交错排列为 [F_T1(1), F_T2(1), F_T1(2), F_T2(2), ...]，使 SSM 在每一步都能直接对比相邻位置的时间变化。选项 0 是 Sequential 机制，选项 2 是 Parallel 机制。"
```