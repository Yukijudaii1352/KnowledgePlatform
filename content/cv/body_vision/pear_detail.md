### PEAR

```yaml
id: pear
name: PEAR
full_name: 像素对齐表达式重建 (Pixel-aligned Expressive humAn mesh Recovery)
year: '2026.01'
org: arXiv
paper_url: https://arxiv.org/abs/2601.22693
category: mesh
parent: smplx
motivation: 像素级监督实现100+FPS的SMPL-X回归
```

#### 📝 一句话总结

PEAR 提出一种实时 expressive human mesh recovery 框架，用单个轻量 ViT 直接回归 EHM-s 参数，并通过训练阶段的像素级可微渲染监督弥补低分辨率、单分支结构对手和脸细节的损失。它解决了 SMPL-X 系列方法在速度、像素对齐和面部表达能力之间难以兼得的问题。

#### 🎯 核心要点

- **EHM-s 表达模型**：以 SMPL-X 身体为基础，融合 scaled-FLAME 头部以增强面部几何与表情自由度。
- **单分支 ViT 回归器**：不依赖高分辨率输入、手脸裁剪或多分支网络，直接输出身体、手、脸和尺度参数。
- **像素级训练监督**：训练时引入可微神经渲染/analysis-by-synthesis 反馈，让预测网格与图像像素对齐。
- **两阶段训练策略**：先学习稳定粗网格，再加入像素级细化，避免渲染外观和几何错位相互污染。
- **部件级伪标签生成**：分别利用身体、手、脸专家模型生成和修正伪标签，提高不同裁剪输入下的鲁棒性。
- **实时性能**：论文报告无需预处理即可同时推断 EHM-s 参数，并达到 100 FPS 以上。

#### 🔬 深入细节

##### 核心示意图

![PEAR 方法总览](https://arxiv.org/html/2601.22693v2/x4.png)
*图：PEAR 采用统一 ViT backbone 回归 SMPL-X 身体参数与 FLAME-consistent 头部参数，并引入头部尺度参数处理不同年龄和头身比例。*

##### 算法伪代码

```text
Algorithm: PEAR training and real-time expressive mesh recovery
# PEAR 训练与推理核心逻辑
def train_pear(image, pseudo_labels):
    params = vit_regressor(image)
    smplx_params, flame_params, head_scale = split(params)
    mesh = ehm_s_forward(smplx_params, flame_params, head_scale)

    # Stage 1: coarse supervision
    loss = param_loss(params, pseudo_labels)
    loss += joint_2d_loss(project(mesh.joints), pseudo_labels.keypoints_2d)
    loss += vertex_or_landmark_loss(mesh, pseudo_labels.mesh_parts)

    # Stage 2: pixel-aligned supervision
    rendered = differentiable_renderer(mesh, image)
    loss += photometric_loss(rendered.rgb, image, rendered.mask)
    loss += silhouette_loss(rendered.mask, pseudo_labels.mask)
    update(loss)

def infer_pear(image):
    params = vit_regressor(image)  # no hand/face crop, no renderer at inference
    return ehm_s_forward(*split(params))
```

##### 动机与背景

SMPL-X 让全身表达成为统一目标，但现实中的回归器经常陷入三难：输入分辨率低则手和脸对不齐，提高分辨率会明显降低速度；给手和脸单独开分支能提升局部精度，却带来额外裁剪、检测和多模型调度；只依赖参数级伪标签训练时，模型容易复制伪标签的局部偏差，无法从图像像素中学到嘴角、眼部、手指等细节。

PEAR 的基本判断是：推理阶段应该保持简单，训练阶段可以更重。也就是说，模型本体仍然是一个干净的 ViT 回归器，但训练时额外使用渲染闭环，让网格投影后必须解释输入图像中的局部像素。这样推理阶段不增加计算图，仍能获得像素对齐收益。

##### EHM-s 与头部尺度

论文把输出称为 EHM-s 参数，可以理解为 SMPL-X 与 scaled-FLAME 的融合。SMPL-X 提供身体、手和整体拓扑，FLAME 提供更强的面部形状与表情空间。PEAR 额外预测尺度 \(s\)，用于处理儿童、卡通角色或头身比例异常样本：

$$
\mathcal{M}_{ehm} = \mathrm{LBS}\left(\mathrm{Fuse}\left(\mathcal{M}_{smplx},\; s \cdot \mathcal{M}_{flame}\right), \theta\right)
$$

这里的直觉是：身体用 SMPL-X 保持全身运动学一致，头部用 FLAME 保持表情细节，再用尺度参数把两者对齐到同一个头部根节点附近。相比只使用 SMPL-X 面部参数，EHM-s 能更好表达嘴唇、脸型和表情。

##### 像素级监督

PEAR 的关键训练信号来自可微渲染。给定预测网格 \(\hat{M}\)，渲染器生成图像 \(\hat{I}\) 和 mask \(\hat{S}\)，训练目标可以概括为：

$$
\mathcal{L} =
\lambda_p \mathcal{L}_{param}
+ \lambda_j \mathcal{L}_{2D}
+ \lambda_m \mathcal{L}_{mesh}
+ \lambda_{rgb} \|\hat{I}-I\|_1
+ \lambda_s \|\hat{S}-S\|_1
$$

如果一开始网格与图像相差太远，像素误差会把外观错误归因到几何上，导致训练不稳定。因此论文采用两阶段策略：先用可靠伪标签学到粗对齐，再使用像素级监督优化细节。这个策略的核心不是把渲染器放进推理链路，而是把渲染作为训练时的“几何检查器”。

##### 部件级数据标注

PEAR 认为全身伪标签本身也是瓶颈。现有 SMPL-X 伪标签常由一个整体 pipeline 产生，身体、手和脸会互相拖累。PEAR 改用部件级策略：身体可由 ProHMR 等身体模型提供，手部可由 HaMeR 等专家模型提供，面部可由 TEASER/FLAME 系列方法提供，然后再做融合和一致性修正。

> 💡 关键：PEAR 的速度来自单模型推理，精度来自训练时的像素监督和更干净的部件伪标签。它把复杂性放在离线训练和数据构建阶段，而不是放在在线推理阶段。

##### 与传统方法的区别

多分支 SMPL-X 方法通常用高分辨率身体输入、手部裁剪和脸部裁剪来保存局部细节。PEAR 则证明，只要训练信号足够细，一个单分支 ViT 也能恢复有竞争力的手脸细节。与纯参数监督不同，PEAR 的 photometric/silhouette 反馈直接惩罚像素错位，所以更适合下游头像驱动、实时动画和图像编辑预处理场景。

#### 🧪 练习题

```yaml
question: "PEAR 为什么能在保持 100+FPS 推理的同时提升手脸细节？"
options:
  - "推理时额外运行手部和脸部高分辨率裁剪分支"
  - "训练时加入像素级可微渲染监督，推理时仍使用单分支 ViT 回归"
  - "完全放弃 SMPL-X，直接生成隐式神经辐射场"
  - "只优化 2D 关键点，不预测 3D 网格"
answer: 1
explain: "PEAR 把复杂的像素对齐监督放在训练阶段，推理阶段不需要渲染器或多分支裁剪，因此能兼顾速度和局部对齐。"
```
