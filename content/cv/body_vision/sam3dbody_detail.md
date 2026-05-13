### SAM 3D Body — 鲁棒全身三维人体网格恢复

```yaml
id: sam3dbody
name: SAM 3D Body
full_name: 动量人体骨架 (SAM 3D Body with Momentum Human Rig)
year: 2026.02
org: Meta Superintelligence Labs
paper_url: https://arxiv.org/abs/2602.15989
github: https://github.com/facebookresearch/sam-3d-body
category: mesh
parent: smplx
motivation: 动量人体骨架解耦表示提升重建效率
```

#### 📝 一句话总结

SAM 3D Body 提出了一种基于 Momentum Human Rig (MHR) 参数化表示的 promptable 单图全身三维人体网格恢复模型，通过解耦骨架结构与表面形状实现了在多样化野外场景下的 SOTA 精度与强泛化能力，并借助多阶段高质量标注 pipeline 大幅提升训练数据质量。

#### 🎯 核心要点

- **新参数化表示 MHR（Momentum Human Rig）**：将人体网格分解为骨架（skeletal structure）和表面形状（surface shape）两个独立子空间，相比 SMPL-X 提供更好的可解释性和精度
- **Promptable 架构**：encoder-decoder 结构，支持 2D 关键点和分割 mask 作为辅助 prompt，实现用户引导式推理（类似 SAM 系列交互范式）
- **多阶段标注 Pipeline**：结合可微优化（differentiable optimization）、多视角几何（multi-view geometry）、密集关键点检测（dense keypoint detection）和数据引擎（data engine），覆盖常见与稀有姿态
- **大规模骨干网络**：支持 DINOv3-H+（840M 参数）和 ViT-H（631M 参数）两种 backbone
- **全身覆盖**：同时估计身体、手部和脚部姿态，实现真正的 full-body HMR
- **SOTA 性能**：3DPW MPJPE 54.8mm、EMDB MPJPE 61.7mm、RICH PVE 60.3mm、COCO PCK@.05 86.5%、Freihand PA-MPJPE 5.5mm
- **SAM 3D 生态**：与 SAM 3D Objects（通用物体重建）配对，支持人体与物体在同一参考系下对齐

#### 🔬 深入细节

##### 核心架构示意图

![SAM 3D Body 模型架构图](https://raw.githubusercontent.com/facebookresearch/sam-3d-body/main/assets/model_diagram.png)
*图：SAM 3D Body 的 encoder-decoder 架构总览。输入单张 RGB 图像，经过视觉编码器提取特征，结合可选的 2D 关键点/mask prompt，由解码器回归 MHR 参数，最终输出全身 3D 人体网格。*

##### 算法伪代码

```python
# SAM 3D Body 推理流程伪代码
def sam_3d_body_inference(image, keypoints_2d=None, mask=None):
    """
    image: H×W×3 RGB 输入图像
    keypoints_2d: 可选的 2D 关键点 prompt (N_kp × 2)
    mask: 可选的人体分割 mask prompt (H × W)
    """
    # Step 1: 人体检测 — 获取 bounding box
    bbox = detector(image)  # e.g. SAM3 detector
    crop = crop_and_resize(image, bbox)  # 裁剪并归一化

    # Step 2: 视觉编码 — 提取图像特征
    features = encoder(crop)  # DINOv3-H+ 或 ViT-H backbone

    # Step 3: Prompt 编码（可选）
    if keypoints_2d is not None:
        prompt_feat = encode_keypoints(keypoints_2d)
        features = fuse(features, prompt_feat)
    if mask is not None:
        mask_feat = encode_mask(mask)
        features = fuse(features, mask_feat)

    # Step 4: MHR 参数解码
    skeleton_params, shape_params = decoder(features)
    # skeleton_params: 关节旋转、全局朝向、平移
    # shape_params: 体型（身高、胖瘦等）、手部/脚部形变

    # Step 5: MHR 前向运动学 — 生成网格
    joints_3d = forward_kinematics(skeleton_params)  # 骨架驱动
    vertices = surface_model(joints_3d, shape_params)  # 表面蒙皮

    return vertices, joints_3d
```

##### 动机与背景

单图三维人体网格恢复（HMR）是计算机视觉中的核心问题，广泛应用于 AR/VR、动作捕捉和人机交互。传统方法主要基于 SMPL/SMPL-X 参数化模型，存在以下局限：

1. **骨架与形状耦合**：SMPL-X 的姿态参数和形状参数在优化过程中相互干扰，导致在极端姿态下精度下降
2. **手部和脚部精度不足**：大多数方法聚焦于身体主干，对手指和脚趾的精细重建关注不够
3. **泛化能力有限**：训练数据偏向常见姿态和视角，在稀有姿态（如倒立、高难度体操动作）下表现退化

SAM 3D Body 通过引入 MHR 表示和多阶段数据标注策略，系统性地解决了上述问题。

##### MHR（Momentum Human Rig）参数化表示

MHR 是本文的核心创新之一，其设计哲学是**解耦**：

$$\mathcal{M}(\boldsymbol{\theta}, \boldsymbol{\beta}) = \mathcal{S}\bigl(\text{FK}(\boldsymbol{\theta}),\; \boldsymbol{\beta}\bigr)$$

其中：
- \(\boldsymbol{\theta}\) 为骨架参数（关节角度、全局朝向、平移），通过前向运动学（Forward Kinematics, FK）独立计算关节 3D 位置
- \(\boldsymbol{\beta}\) 为表面形状参数（体型、局部形变），通过蒙皮函数 \(\mathcal{S}\) 将表面顶点绑定到骨架上
- 两者在参数空间中**正交**，优化一个不影响另一个

> 💡 **关键**：与 SMPL-X 将姿态 blend shapes 和形状 blend shapes 混合在同一线性空间不同，MHR 将骨架运动学和表面几何完全分离，使得骨架姿态可以独立于体型进行精确估计，反之亦然。

##### Encoder-Decoder 架构

**编码器**采用大规模预训练视觉 Transformer：
- **DINOv3-H+**（840M 参数）：Meta 自研的自监督视觉基础模型，提供强大的语义特征
- **ViT-H**（631M 参数）：标准 Vision Transformer 大模型

两种 backbone 在各 benchmark 上表现接近（3DPW MPJPE 均为 54.8mm），说明模型设计本身的贡献大于 backbone 选择。

**解码器**接收视觉特征和可选的 prompt 特征，回归 MHR 参数。Prompt 机制借鉴了 SAM（Segment Anything Model）的设计理念：
- **2D 关键点 prompt**：当自动检测的关键点不准确时，用户可手动提供修正
- **Mask prompt**：提供人体轮廓信息，帮助模型在遮挡或多人场景中聚焦目标

##### 多阶段标注 Pipeline

高质量训练数据是 SAM 3D Body 成功的关键。标注流程包含四个阶段：

1. **可微优化（Differentiable Optimization）**：给定 2D 关键点标注，通过可微渲染将 MHR 模型拟合到图像，自动生成 3D 伪标签
2. **多视角几何（Multi-view Geometry）**：利用多相机系统的三角化约束提升 3D 标注精度
3. **密集关键点检测（Dense Keypoint Detection）**：超越稀疏骨架关键点，检测手指、脚趾等密集关键点，提升末端精度
4. **数据引擎（Data Engine）**：主动发现模型弱点（如稀有姿态），定向采集和标注新数据，形成闭环迭代

> ⚠️ **注意**：数据引擎策略与 SAM（Segment Anything）的数据飞轮思路一脉相承——模型预测 → 人工校验 → 补充弱项 → 重新训练，是 Meta 基础模型方法论的核心范式。

##### 与传统方法的对比

| 特性 | SMPL-X 系列 (HMR2.0b等) | NLF | CameraHMR | **SAM 3D Body** |
|------|------------------------|-----|-----------|----------------|
| 参数化表示 | SMPL-X (耦合) | 非参数化 | SMPL-X | **MHR (解耦)** |
| 全身覆盖 | 部分 | 身体为主 | 身体为主 | **身体+手+脚** |
| Prompt 支持 | ✗ | ✗ | ✗ | **✓ (关键点+mask)** |
| 数据引擎 | ✗ | ✗ | ✗ | **✓** |
| 3DPW MPJPE↓ | ~70+ | ~60 | ~58 | **54.8** |

##### 性能基准

| Backbone | 参数量 | 3DPW (MPJPE↓) | EMDB (MPJPE↓) | RICH (PVE↓) | COCO (PCK@.05↑) | LSPET (PCK@.05↑) | Freihand (PA-MPJPE↓) |
|----------|--------|---------------|---------------|-------------|-----------------|-------------------|---------------------|
| DINOv3-H+ | 840M | 54.8 | 61.7 | 60.3 | 86.5 | 68.0 | 5.5 |
| ViT-H | 631M | 54.8 | 62.9 | 61.7 | 86.8 | 68.9 | 5.5 |

Freihand PA-MPJPE 仅 5.5mm 的手部精度尤为突出，证明了 MHR 对末端肢体的建模优势。

#### 🧪 练习题

```yaml
question: "SAM 3D Body 中 MHR (Momentum Human Rig) 相比 SMPL-X 的核心设计差异是什么？"
options:
  - "使用更多的关节点数量来提升精度"
  - "将骨架结构与表面形状解耦为独立的参数子空间"
  - "采用隐式神经表示替代显式网格"
  - "引入时序信息进行视频级别的姿态估计"
answer: 1
explain: "MHR 的核心创新在于将骨架运动学参数和表面形状参数完全解耦，使两者可以独立优化，避免了 SMPL-X 中姿态与形状参数相互干扰的问题。"
```