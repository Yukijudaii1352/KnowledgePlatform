---
domain: aigc
topic_id: 3d_generation
topic_name: 3D生成
page_icon: 🧊
page_title: 3D生成 技术演进
page_subtitle: 2026-05-12 版
page_desc: 概述3D生成技术从NeRF神经辐射场、3D Gaussian Splatting到扩散模型及原生3D大模型的发展历程，涵盖文生3D、图生3D、纹理生成与3D资产生产四大方向。
hero_pills:
- 🏷️ Text-to-3D · NeRF · 3DGS · Diffusion · LRM
count_pill: 32 个算法
categories:
  representation:
    label: 3D表征奠基
    color: '#3b82f6'
  optimization:
    label: 基于优化的生成
    color: '#8b5cf6'
  feed_forward:
    label: 前馈快速生成
    color: '#10b981'
  texture:
    label: 纹理生成
    color: '#f59e0b'
  native_3d:
    label: 原生3D生成
    color: '#ef4444'
image_base: ../../content/aigc/3d_generation/assets/
---

## 领域综述

### 待补充：阶段性领域总结
请补充一篇纵观一段时间以来的总结性文档，建议使用 `!INCLUDE_RAW path/to/article.md` 引入人工筛选后的 Markdown。

## 最新进展综述

### 待补充：最近一个月最新动向
请补充最近一个月该领域最新动向的综述文档，建议使用 `!INCLUDE_RAW path/to/article.md` 引入人工筛选后的 Markdown。

## 算法演化关系

```yaml
nodes:
- id: nerf
  x: 2020
  y: 100
  category: representation
- id: mip_nerf
  x: 2021
  y: 90
  category: representation
- id: instant_ngp
  x: 2022
  y: 80
  category: representation
- id: plenoxels
  x: 2022
  y: 110
  category: representation
- id: 3dgs
  x: 2023
  y: 70
  category: representation
- id: hgs
  x: 2026
  y: 60
  category: representation
- id: dreamfusion
  x: 2022
  y: 200
  category: optimization
- id: magic3d
  x: 2022.5
  y: 190
  category: optimization
- id: fantasia3d
  x: 2023
  y: 210
  category: optimization
- id: prolificdreamer
  x: 2023.5
  y: 200
  category: optimization
- id: luciddreamer
  x: 2023.8
  y: 190
  category: optimization
- id: zero123
  x: 2023
  y: 300
  category: feed_forward
- id: one2345
  x: 2023.3
  y: 310
  category: feed_forward
- id: mvdream
  x: 2024
  y: 290
  category: feed_forward
- id: wonder3d
  x: 2024.3
  y: 300
  category: feed_forward
- id: lrm
  x: 2024
  y: 320
  category: feed_forward
- id: instant3d
  x: 2024.3
  y: 330
  category: feed_forward
- id: ilrm
  x: 2026
  y: 310
  category: feed_forward
- id: vgg_t3
  x: 2026.2
  y: 320
  category: feed_forward
- id: 4d_lrm
  x: 2025.8
  y: 340
  category: feed_forward
- id: yonosplat
  x: 2026.4
  y: 300
  category: feed_forward
- id: texture
  x: 2023
  y: 400
  category: texture
- id: text2tex
  x: 2023.5
  y: 410
  category: texture
- id: trellis2
  x: 2025.8
  y: 400
  category: texture
- id: hunyuan3d_21
  x: 2026.2
  y: 410
  category: texture
- id: dragtex
  x: 2026.4
  y: 420
  category: texture
- id: ar3dr1
  x: 2026
  y: 500
  category: native_3d
- id: vist3a
  x: 2026.2
  y: 510
  category: native_3d
- id: lyra
  x: 2026.4
  y: 520
  category: native_3d
- id: hunyuan3d_3
  x: 2026.3
  y: 490
  category: native_3d
- id: seed3d_2
  x: 2026.5
  y: 500
  category: native_3d
- id: rodin_gen2
  x: 2026.6
  y: 510
  category: native_3d
edges:
- from: nerf
  to: mip_nerf
  label: 抗锯齿
- from: nerf
  to: instant_ngp
  label: 哈希加速
- from: nerf
  to: plenoxels
  label: 去神经网络
- from: instant_ngp
  to: 3dgs
  label: 显式高斯
- from: 3dgs
  to: hgs
  label: 消除伪影
- from: nerf
  to: dreamfusion
  label: SDS蒸馏
- from: dreamfusion
  to: magic3d
  label: 两阶段
- from: dreamfusion
  to: fantasia3d
  label: 解耦几何
- from: dreamfusion
  to: prolificdreamer
  label: VSD改进
- from: prolificdreamer
  to: luciddreamer
  label: ISM匹配
- from: zero123
  to: one2345
  label: 快速重建
- from: zero123
  to: mvdream
  label: 多视图
- from: mvdream
  to: wonder3d
  label: 跨域扩散
- from: zero123
  to: lrm
  label: 大模型
- from: lrm
  to: instant3d
  label: 稀疏视图
- from: lrm
  to: ilrm
  label: 迭代细化
- from: ilrm
  to: vgg_t3
  label: TTT扩展
- from: lrm
  to: 4d_lrm
  label: 4D动态
- from: ilrm
  to: yonosplat
  label: 单模型
- from: texture
  to: text2tex
  label: 渐进式
- from: text2tex
  to: trellis2
  label: PBR材质
- from: trellis2
  to: hunyuan3d_21
  label: 质量提升
- from: hunyuan3d_21
  to: dragtex
  label: 交互编辑
- from: luciddreamer
  to: ar3dr1
  label: 强化学习
- from: luciddreamer
  to: vist3a
  label: 视频蒸馏
- from: vist3a
  to: lyra
  label: 自蒸馏
- from: instant3d
  to: hunyuan3d_3
  label: 原生分辨率
- from: hunyuan3d_3
  to: seed3d_2
  label: DiT架构
- from: seed3d_2
  to: rodin_gen2
  label: 拓扑优化
milestones:
- id: nerf
  title: NeRF开创神经隐式表示
  year: '2020'
  desc: 提出神经辐射场概念，利用MLP和体渲染实现照片级新视角合成，开启神经渲染时代
- id: dreamfusion
  title: DreamFusion打通2D到3D
  year: '2022'
  desc: 提出分数蒸馏采样(SDS)，利用2D扩散模型先验优化3D表示，开创文生3D现代范式
- id: 3dgs
  title: 3DGS革新实时渲染
  year: '2023'
  desc: 显式3D高斯泼溅实现100+FPS实时渲染，取代NeRF成为2026年主流表征方法
```

## 核心算法

### NeRF

```yaml
id: nerf
num: 1
name: NeRF
full_name: 神经辐射场 (Neural Radiance Fields)
year: '2020'
org: UC Berkeley
parent: —
paper_url: https://arxiv.org/abs/2003.08934
project_url: ''
category: representation
motivation: MLP+体渲染实现连续隐式表示
```

#### 📝 一句话总结
NeRF 的核心目标是：MLP+体渲染实现连续隐式表示。

#### 🎯 核心要点
- 核心动机：MLP+体渲染实现连续隐式表示
- 代表机构：UC Berkeley

#### 🔬 深入细节
MLP+体渲染实现连续隐式表示


### Mip-NeRF

```yaml
id: mip_nerf
num: 2
name: Mip-NeRF
full_name: 抗锯齿神经辐射场 (Mip-NeRF)
year: '2021'
org: Google Research
parent: nerf
paper_url: https://arxiv.org/abs/2103.13415
project_url: ''
category: representation
motivation: 集成位置编码解决多尺度渲染
```

#### 📝 一句话总结
Mip-NeRF 的核心目标是：集成位置编码解决多尺度渲染。

#### 🎯 核心要点
- 核心动机：集成位置编码解决多尺度渲染
- 演化来源：继承或改进自 nerf
- 代表机构：Google Research

#### 🔬 深入细节
集成位置编码解决多尺度渲染


### Instant-NGP

```yaml
id: instant_ngp
num: 3
name: Instant-NGP
full_name: 即时神经图形基元 (Instant Neural Graphics Primitives)
year: '2022'
org: NVIDIA
parent: nerf
paper_url: https://arxiv.org/abs/2201.05989
project_url: ''
category: representation
motivation: 哈希编码将训练加速1000倍
```

#### 📝 一句话总结
Instant-NGP 的核心目标是：哈希编码将训练加速1000倍。

#### 🎯 核心要点
- 核心动机：哈希编码将训练加速1000倍
- 演化来源：继承或改进自 nerf
- 代表机构：NVIDIA

#### 🔬 深入细节
哈希编码将训练加速1000倍


### Plenoxels

```yaml
id: plenoxels
num: 4
name: Plenoxels
full_name: 光场体素 (Plenoxels)
year: '2022'
org: UC Berkeley
parent: nerf
paper_url: https://arxiv.org/abs/2112.05131
project_url: ''
category: representation
motivation: 稀疏体素+球谐函数无需神经网络
```

#### 📝 一句话总结
Plenoxels 的核心目标是：稀疏体素+球谐函数无需神经网络。

#### 🎯 核心要点
- 核心动机：稀疏体素+球谐函数无需神经网络
- 演化来源：继承或改进自 nerf
- 代表机构：UC Berkeley

#### 🔬 深入细节
稀疏体素+球谐函数无需神经网络


### 3D-GS

```yaml
id: 3dgs
num: 5
name: 3D-GS
full_name: 3D高斯泼溅 (3D Gaussian Splatting)
year: '2023'
org: INRIA
parent: instant_ngp
paper_url: https://arxiv.org/abs/2308.04079
project_url: ''
category: representation
motivation: 显式高斯实现100+FPS实时渲染
```

#### 📝 一句话总结
3D-GS 的核心目标是：显式高斯实现100+FPS实时渲染。

#### 🎯 核心要点
- 核心动机：显式高斯实现100+FPS实时渲染
- 演化来源：继承或改进自 instant_ngp
- 代表机构：INRIA

#### 🔬 深入细节
显式高斯实现100+FPS实时渲染


### HGS

```yaml
id: hgs
num: 6
name: HGS
full_name: 硬高斯泼溅 (Hard Gaussian Splatting)
year: '2026.01'
org: AAAI
parent: 3dgs
paper_url: https://arxiv.org/abs/2601.05000
project_url: ''
category: representation
motivation: 解决模糊和针状伪影问题
```

#### 📝 一句话总结
HGS 的核心目标是：解决模糊和针状伪影问题。

#### 🎯 核心要点
- 核心动机：解决模糊和针状伪影问题
- 演化来源：继承或改进自 3dgs
- 代表机构：AAAI

#### 🔬 深入细节
解决模糊和针状伪影问题


### DreamFusion

```yaml
id: dreamfusion
num: 7
name: DreamFusion
full_name: 梦境融合 (DreamFusion)
year: '2022'
org: Google Research
parent: nerf
paper_url: https://arxiv.org/abs/2209.14988
project_url: ''
category: optimization
motivation: 提出SDS Loss开创文生3D范式
```

#### 📝 一句话总结
DreamFusion 的核心目标是：提出SDS Loss开创文生3D范式。

#### 🎯 核心要点
- 核心动机：提出SDS Loss开创文生3D范式
- 演化来源：继承或改进自 nerf
- 代表机构：Google Research

#### 🔬 深入细节
提出SDS Loss开创文生3D范式


### Magic3D

```yaml
id: magic3d
num: 8
name: Magic3D
full_name: 魔法3D (Magic3D)
year: '2022'
org: NVIDIA
parent: dreamfusion
paper_url: https://arxiv.org/abs/2211.10440
project_url: ''
category: optimization
motivation: 两阶段粗到精提升分辨率
```

#### 📝 一句话总结
Magic3D 提出了一种两阶段粗到细（coarse-to-fine）的文本到3D生成框架，第一阶段使用基于哈希网格的神经辐射场在低分辨率下快速建立粗糙几何，第二阶段切换为可微分光栅化的纹理网格并借助潜在扩散模型在高分辨率下精细优化，在比 DreamFusion 快 2 倍的同时显著提升了生成质量。

#### 🎯 核心要点
- **两阶段场景表示**：粗阶段采用 Instant NGP 哈希网格编码 + 体渲染（64×64），细阶段采用 DMTet 可变形四面体网格 + 可微光栅化（512×512）
- **两阶段扩散先验**：粗阶段使用 eDiff-I 基础扩散模型（像素空间，64×64），细阶段使用 Stable Diffusion 潜在扩散模型（潜空间 64×64，对应图像 512×512）
- **SDS 损失扩展**：将 DreamFusion 的 Score Distillation Sampling 扩展到潜在扩散模型，通过链式法则引入编码器梯度 \(\partial z / \partial x\)
- **高效稀疏表示**：利用八叉树空间跳跃和密度体素剪枝加速体渲染，MLP 预测法线代替有限差分以降低计算开销
- **密度到 SDF 转换**：通过减去非零常数将粗阶段密度场转换为 SDF，实现从神经场到网格的无缝初始化
- **可控3D生成**：支持 DreamBooth 个性化、基于 prompt 的编辑和图像风格迁移
- **性能**：总优化时间 40 分钟（8×A100），比 DreamFusion 快 2 倍，用户偏好率 61.7%

#### 🔬 深入细节
##### 框架总览

![Magic3D 两阶段框架](https://ar5iv.labs.arxiv.org/html/2211.10440/assets/figs/overview.png)
*图：Magic3D 的两阶段粗到细优化框架。第一阶段使用低分辨率扩散先验优化稀疏神经辐射场；第二阶段将其转换为纹理网格，使用高分辨率潜在扩散模型进行精细优化。*

##### 算法伪代码

```python
# Magic3D 两阶段优化伪代码

# ========== Stage 1: Coarse (Neural Field) ==========
# 场景模型: Instant NGP hash grid + 两个单层MLP (albedo/density + normals)
# 扩散先验: eDiff-I base model (64×64 像素空间)
init_occupancy_grid(resolution=256^3, value=20)

for iter in range(5000):
    camera = sample_random_camera()
    x = render_volume(hash_grid, camera, resolution=64)  # 体渲染
    t = sample_timestep()
    epsilon = sample_noise()
    x_t = add_noise(x, epsilon, t)
    
    # SDS 梯度 (Eq. 1)
    eps_pred = diffusion_model(x_t, text_embed, t)
    grad_SDS = w(t) * (eps_pred - epsilon) * dx/dtheta
    update(hash_grid, grad_SDS)
    
    if iter % 10 == 0:
        update_occupancy_grid(decay=0.6)

# ========== Stage 2: Fine (Textured Mesh) ==========
# 场景模型: DMTet mesh + neural color field
# 扩散先验: Stable Diffusion LDM (latent 64×64 → image 512×512)
sdf = density_field - constant  # 密度→SDF转换
mesh = marching_tetrahedra(sdf, deformations)
texture = coarse_color_field  # 继承粗阶段颜色场

for iter in range(3000):
    camera = sample_random_camera(zoom_in=True)  # 增大焦距
    x = rasterize(mesh, texture, camera, resolution=512)  # 可微光栅化
    z = LDM_encoder(x)  # 编码到潜空间
    t = sample_timestep()
    epsilon = sample_noise()
    z_t = add_noise(z, epsilon, t)
    
    # LDM SDS 梯度 (Eq. 2)
    eps_pred = LDM(z_t, text_embed, t)
    grad_SDS = w(t) * (eps_pred - epsilon) * dz/dx * dx/dtheta
    
    # 更新 SDF 值 s_i、顶点偏移 Δv_i 和纹理
    update(mesh_sdf, mesh_deform, texture, grad_SDS)
    
    # 面法线平滑正则化
    smooth_loss = angular_diff_adjacent_faces(mesh)
    update(mesh, smooth_loss)
```

##### 动机与背景

DreamFusion 首次证明了利用预训练 2D 扩散模型的先验知识，通过 Score Distillation Sampling (SDS) 损失优化 3D 场景表示的可行性。然而，DreamFusion 存在两个关键限制：

1. **分辨率瓶颈**：其扩散模型（Imagen base model）仅在 64×64 分辨率下操作，无法生成高分辨率几何和纹理
2. **计算效率低**：基于 Mip-NeRF 360 的大型全局 MLP 进行体渲染计算昂贵且内存密集，难以扩展到高分辨率图像

Magic3D 的核心思想是：**将问题分解为两个阶段，每个阶段使用最适合其需求的场景表示和扩散先验**。

##### 核心机制详解

**1. Score Distillation Sampling (SDS)**

SDS 的核心思想是利用预训练扩散模型作为评判者，引导 3D 场景的优化。给定场景参数 \(\theta\)，渲染函数 \(g(\theta)\) 生成图像 \(x\)，SDS 梯度为：

$$\nabla_{\theta}\mathcal{L}_{\text{SDS}}(\phi, g(\theta)) = \mathbb{E}_{t,\epsilon}\left[w(t)(\epsilon_{\phi}(x_t; y, t) - \epsilon)\frac{\partial x}{\partial \theta}\right]$$

其中 \(\epsilon_{\phi}\) 是扩散模型的噪声预测网络，\(y\) 是文本嵌入，\(w(t)\) 是权重函数。直觉上，SDS 梯度将渲染图像"推向"扩散模型认为在给定文本条件下概率密度高的区域。

> 💡 **关键**：SDS 不需要对扩散模型本身进行反向传播（U-Net 梯度被截断），只需要其预测的噪声方向来指导场景参数的更新。

**2. 潜在扩散模型的 SDS 扩展**

在细阶段，Magic3D 使用 Stable Diffusion（一种潜在扩散模型 LDM）。LDM 在潜空间 \(z\) 而非像素空间 \(x\) 上操作，因此 SDS 梯度需要通过编码器的链式法则：

$$\nabla_{\theta}\mathcal{L}_{\text{SDS}}(\phi, g(\theta)) = \mathbb{E}_{t,\epsilon}\left[w(t)(\epsilon_{\phi}(z_t; y, t) - \epsilon)\frac{\partial z}{\partial x}\frac{\partial x}{\partial \theta}\right]$$

> 💡 **关键**：尽管输出图像分辨率为 512×512，扩散模型的计算仍在 64×64 的潜空间进行，计算量的增加主要来自高分辨率图像的渲染梯度 \(\partial x / \partial \theta\) 和编码器梯度 \(\partial z / \partial x\)。

**3. 粗阶段：哈希网格神经场**

粗阶段采用 Instant NGP 的多分辨率哈希网格编码替代 Mip-NeRF 360 的大型 MLP，大幅降低计算成本。具体设计包括：

- **双 MLP 架构**：一个单层 MLP 预测 albedo 和密度，另一个预测法线。使用 MLP 直接预测法线而非通过有限差分估计，显著减少计算开销
- **稀疏加速**：维护 256³ 分辨率的占用网格，每 10 次迭代更新（衰减因子 0.6），构建八叉树进行空间跳跃
- **环境贴图**：使用极小的 MLP（隐藏维度 16）建模背景，学习率降低 10 倍，防止模型将物体信息"泄漏"到背景中

> ⚠️ **注意**：MLP 预测的法线在体渲染中不需要严格对齐等值面法线，因为体渲染中粒子的朝向是连续位置上的属性。精确法线在细阶段的真实表面渲染中自然获得。

**4. 细阶段：可变形四面体网格**

细阶段使用 DMTet（Deformable Marching Tetrahedra）表示 3D 形状：

- **几何表示**：在四面体网格 \((V_T, T)\) 的每个顶点 \(\mathbf{v}_i\) 上存储 SDF 值 \(s_i \in \mathbb{R}\) 和顶点偏移 \(\Delta\mathbf{v}_i \in \mathbb{R}^3\)
- **网格提取**：通过可微分 Marching Tetrahedra 算法从 SDF 提取表面网格
- **纹理表示**：使用粗阶段的神经颜色场作为体积纹理
- **初始化**：将粗阶段的密度场减去非零常数转换为初始 SDF

关键优化技巧：
- **焦距放大**：渲染时增大焦距以放大物体细节，这是恢复高频细节的关键步骤
- **面平滑正则化**：对网格相邻面的法线角度差异进行正则化，在高方差的 SDS 梯度监督下保持几何平滑
- **可微抗锯齿**：使用可微抗锯齿将前景物体与预训练的环境贴图背景合成

##### 与 DreamFusion 的关键区别

| 方面 | DreamFusion | Magic3D |
|------|-------------|---------|
| 场景表示 | Mip-NeRF 360 (全局MLP) | Stage1: Hash Grid; Stage2: DMTet Mesh |
| 扩散先验 | Imagen (64×64) | Stage1: eDiff-I (64×64); Stage2: Stable Diffusion (512×512) |
| 渲染方式 | 体渲染 | Stage1: 体渲染; Stage2: 可微光栅化 |
| 优化分辨率 | 64×64 | 64×64 → 512×512 |
| 法线计算 | 有限差分 | MLP 直接预测 |
| 输出格式 | NeRF (不可直接用于图形引擎) | 纹理网格 (可直接导入标准图形软件) |
| 优化时间 | ~1.5 小时 | ~40 分钟 |

##### 可控生成扩展

Magic3D 还展示了三种可控生成能力：

1. **DreamBooth 个性化**：用少量目标图像微调 eDiff-I 和 LDM，将特定实例绑定到 [V] 标识符，然后在 3D 优化中使用包含 [V] 的 prompt
2. **Prompt 编辑**：三阶段流程——(a) 用基础 prompt 训练粗模型 → (b) 修改 prompt 并用 LDM 微调 NeRF → (c) 用修改后的 prompt 优化网格。可修改纹理或几何
3. **图像风格迁移**：将参考图像作为扩散模型的条件输入，通过调节文本引导权重和联合引导权重控制风格强度

#### 🧪 练习题
```yaml
question: "Magic3D 在细阶段（Stage 2）选择纹理网格而非继续使用神经辐射场的主要原因是什么？"
options:
  - "纹理网格的表达能力比神经辐射场更强"
  - "可微光栅化在高分辨率下比体渲染更高效，能在合理的内存和计算预算内渲染 512×512 图像"
  - "神经辐射场无法表示 SDF，不兼容 Marching Tetrahedra 算法"
  - "潜在扩散模型只能处理网格渲染的图像，不支持体渲染输出"
answer: 1
explain: "体渲染需要沿光线密集采样并逐点评估神经网络，在 512×512 分辨率下内存和计算开销过大；而可微光栅化的计算量随分辨率增长更为温和，是高分辨率优化的合适选择。"
```

### Fantasia3D

```yaml
id: fantasia3d
num: 9
name: Fantasia3D
full_name: 幻想3D (Fantasia3D)
year: '2023'
org: Alibaba
parent: dreamfusion
paper_url: https://arxiv.org/abs/2303.13873
project_url: ''
category: optimization
motivation: 解耦几何与外观学习PBR材质
```

#### 📝 一句话总结
Fantasia3D 提出将文本到3D生成中的几何与外观**解耦建模**：几何阶段利用 DMTet 混合表示配合法线图编码进行 SDS 优化，外观阶段引入 PBR（BRDF）材质模型实现逼真渲染，生成的3D资产可直接导入图形引擎进行重光照、编辑和物理仿真。

#### 🎯 核心要点
- **解耦设计**：将几何建模与外观建模分为两个独立阶段，分别优化，避免耦合学习导致的质量退化
- **混合场景表示**：采用 DMTet（Deep Marching Tetrahedra）作为几何表示，兼具隐式灵活性与显式网格的高效渲染
- **法线图编码驱动几何**：将渲染的法线图（而非着色图像）作为 Stable Diffusion 的输入，利用扩散模型对法线分布的先验知识指导几何优化
- **PBR 材质建模**：引入空间可变 BRDF（漫反射 \(k_d\)、粗糙度/金属度 \(k_{rm}\)、法线扰动 \(k_n\)），通过 MLP 预测材质参数并用物理渲染方程生成图像
- **粗到细几何策略**：几何优化分两阶段，先用大权重 \(\omega(t)=\sigma^2\) 获取整体形状，后切换 \(w(t)=\sigma^2\sqrt{1-\sigma^2}\) 精细化细节
- **用户引导生成**：支持以自定义3D形状初始化 DMTet，实现可控生成
- **图形引擎兼容**：输出带 PBR 材质的标准网格，可直接用于 Blender 等引擎的重光照、编辑与物理仿真

#### 🔬 深入细节
##### 整体框架

![Fantasia3D 几何建模流程](https://ar5iv.labs.arxiv.org/html/2303.13873/assets/x3.png)
*图：Fantasia3D 几何建模阶段。DMTet 提取的网格渲染为法线图和 mask，编码后送入预训练 Stable Diffusion 计算 SDS 损失，梯度回传更新 MLP Ψ 的参数。*

![Fantasia3D 外观建模流程](https://ar5iv.labs.arxiv.org/html/2303.13873/assets/x4.png)
*图：Fantasia3D 外观建模阶段。MLP Γ 预测每个表面点的 BRDF 材质参数，通过物理渲染方程生成彩色图像，再经 SDS 损失优化材质网络。*

Fantasia3D 的核心思想是将文本到3D生成解耦为**几何建模**和**外观建模**两个独立阶段，分别使用不同的网络和优化策略。

##### 预备知识：SDS 损失与 DMTet

**Score Distillation Sampling (SDS)** 是 DreamFusion 提出的核心技术，利用预训练的文本到图像扩散模型作为先验来指导3D生成。其梯度公式为：

$$\nabla_\theta \mathcal{L}_{\text{SDS}}(\phi, x) = \mathbb{E}\left[w(t)\left(\hat{\epsilon}_\phi(z_t^x; y, t) - \epsilon\right)\frac{\partial z^x}{\partial x}\frac{\partial x}{\partial \theta}\right]$$

其中 \(\hat{\epsilon}_\phi\) 是预训练扩散模型的噪声预测，\(z_t^x\) 是对渲染图像 \(x\) 的潜变量添加噪声后的结果，\(y\) 是文本提示，\(w(t)\) 是与时间步相关的权重函数。

**DMTet（Deep Marching Tetrahedra）** 是一种混合3D表示，在规则四面体网格的每个顶点 \(v_i\) 上存储 SDF 值 \(s_i\) 和位移 \(\Delta v_i\)，通过 Marching Tetrahedra 算法提取显式三角网格：

$$s_i, \Delta v_i = \Psi(\beta(v_i); \theta)$$

其中 \(\Psi\) 是带 hash-grid 位置编码 \(\beta\) 的 MLP，\(\theta\) 为可学习参数。

> 💡 **关键**：DMTet 的优势在于既能通过可微分的 Marching Tetrahedra 实现端到端梯度传播，又能输出高质量的显式三角网格，直接兼容传统图形管线。

##### 几何建模阶段

几何建模的核心创新是**使用法线图编码作为扩散模型的输入**，而非传统的着色图像。具体流程：

1. **网格提取**：MLP \(\Psi\) 预测四面体顶点的 SDF 值和位移，通过 Marching Tetrahedra 提取三角网格
2. **法线图渲染**：从随机采样的相机视角，通过可微分光栅化渲染法线图 \(I_n\) 和二值 mask \(I_m\)
3. **图像组合**：将法线图与 mask 组合为 RGB 图像 \(I_g = I_n \odot I_m\)
4. **SDS 优化**：将 \(I_g\) 编码到潜空间，计算 SDS 损失并回传梯度更新 \(\Psi\) 的参数

SDS 梯度对几何参数 \(\theta\) 的更新公式：

$$\nabla_\theta \mathcal{L}_{\text{SDS}}(\phi, x) = \mathbb{E}\left[w(t)\left(\hat{\epsilon}_\phi(z_t^x; y, t) - \epsilon\right)\frac{\partial x}{\partial \theta}\frac{\partial z^x}{\partial x}\right]$$

> 💡 **为什么用法线图？** 法线图的值域为 \((-1, 1)\)，恰好与潜空间扩散所需的数据范围对齐。更重要的是，训练 Stable Diffusion 的 LAION-5B 数据集中包含大量法线图数据，使得扩散模型天然具备处理法线图的能力。实验表明，使用着色图像替代法线图会导致几何扭曲。

**粗到细策略**：几何优化分两阶段调整 SDS 权重函数：
- **粗阶段**：\(w(t) = \sigma^2\)，鼓励大范围形状变化，快速建立整体轮廓
- **细阶段**：\(w(t) = \sigma^2\sqrt{1-\sigma^2}\)，抑制大幅更新，精细化表面细节

##### 外观建模阶段

几何固定后，进入外观建模阶段。Fantasia3D 引入**物理渲染（PBR）材质模型**，使用 MLP \(\Gamma\) 预测每个表面点的空间可变 BRDF 参数：

$$(k_d, k_{rm}, k_n) = \Gamma(\beta(p); \gamma)$$

其中：
- \(k_d \in \mathbb{R}^3\)：漫反射颜色
- \(k_{rm} \in \mathbb{R}^2\)：粗糙度 \(r\) 和金属度 \(m\)
- \(k_n \in \mathbb{R}^3\)：切空间法线扰动，增强表面光照细节

镜面反射项由金属度和漫反射计算：\(k_s = (1-m) \cdot 0.04 + m \cdot k_d\)

**渲染方程**采用标准的 Cook-Torrance BRDF 模型：

$$L(p, \omega) = L_d(p) + L_s(p, \omega)$$

$$L_d(p) = k_d(1-m)\int_{\Omega} L_i(p, \omega_i)(\omega_i \cdot n_p)\,\mathrm{d}\omega_i$$

$$L_s(p, \omega) = \int_{\Omega} \frac{DFG}{4(\omega \cdot n_p)(\omega_i \cdot n_p)} L_i(p, \omega_i)(\omega_i \cdot n_p)\,\mathrm{d}\omega_i$$

其中 \(D\) 为 GGX 法线分布函数（由粗糙度 \(r\) 参数化），\(F\) 为 Fresnel 项，\(G\) 为遮蔽-阴影项。入射光 \(L_i\) 由现成的环境贴图提供，半球积分通过 split-sum 方法高效计算。

渲染得到的彩色图像 \(x = \{L(p, \omega)\}\) 送入 Stable Diffusion 计算 SDS 损失，梯度回传更新材质网络 \(\Gamma\) 的参数 \(\gamma\)。

> ⚠️ **外观阶段的权重调度**：为避免颜色过饱和，外观建模采用不同的权重策略——早期使用 \(w(t) = \sigma^2\sqrt{1-\sigma^2}\)，后期切换为 \(w(t) = 1/\sigma^2\)。

##### 纹理导出与后处理

训练完成后，通过 xatlas 生成 UV 映射，将 MLP 预测的材质参数采样为标准2D纹理贴图。为消除纹理接缝，采用 **UV edge padding** 技术扩展 UV 岛边界并填充空白区域。

##### 算法伪代码

```python
# Fantasia3D 训练流程伪代码

# ===== 阶段 1: 几何建模 =====
# 初始化 DMTet 四面体网格（椭球或用户提供的形状）
# MLP Ψ: 预测 SDF 值和顶点位移
for iteration in geometry_iterations:
    # 随机采样 24 个相机视角
    cameras = sample_cameras(n=24)
    
    # DMTet 提取三角网格
    sdf, delta_v = Ψ(hash_encode(vertices))
    mesh = marching_tetrahedra(sdf, vertices + delta_v)
    
    # 可微分光栅化渲染法线图 + mask
    normal_map, mask = rasterize(mesh, cameras)
    I_g = normal_map * mask  # 组合为 RGB 图像
    
    # 编码到潜空间，计算 SDS 损失
    z = encode(I_g)
    loss = SDS_loss(z, text_prompt, w=coarse_or_fine_weight(t))
    
    # 更新几何网络
    loss.backward()
    optimizer_Ψ.step()  # lr = 1e-3

# ===== 阶段 2: 外观建模 =====
# 冻结几何，初始化材质 MLP Γ
for iteration in appearance_iterations:
    cameras = sample_cameras(n=24)
    
    # 预测 BRDF 材质参数
    kd, krm, kn = Γ(hash_encode(surface_points))
    
    # PBR 渲染（Cook-Torrance BRDF + 环境光照）
    color_image = pbr_render(mesh, kd, krm, kn, env_map, cameras)
    
    # SDS 损失优化材质
    z = encode(color_image)
    loss = SDS_loss(z, text_prompt, w=appearance_weight(t))
    
    loss.backward()
    optimizer_Γ.step()  # lr = 1e-2

# ===== 导出 =====
# UV 展开 + 纹理采样 + edge padding
uv_map = xatlas_unwrap(mesh)
texture_maps = sample_material_to_uv(Γ, uv_map)
export(mesh, texture_maps)  # 可导入 Blender
```

##### 与现有方法的对比

| 特性 | DreamFusion | Magic3D | Fantasia3D |
|------|------------|---------|------------|
| 3D 表示 | NeRF | NeRF → DMTet | DMTet |
| 几何/外观 | 耦合 | 耦合 | **解耦** |
| 材质模型 | 简单着色 | 简单着色 | **PBR (BRDF)** |
| 网格提取 | 困难 | 支持 | **原生支持** |
| 重光照/编辑 | ✗ | 有限 | **✓** |
| 物理仿真 | ✗ | ✗ | **✓** |

> 💡 **核心优势**：Fantasia3D 是首个在文本到3D任务中引入完整 PBR 材质管线的方法，生成的资产可直接用于下游图形应用（重光照、材质编辑、物理仿真），而非仅作为"观赏品"。

##### 实现细节

- **网络架构**：\(\Psi\) 为 3 层 MLP（32 隐藏单元），\(\Gamma\) 为 2 层 MLP（32 隐藏单元），均使用 hash-grid 位置编码
- **训练配置**：8× NVIDIA RTX 3090，几何阶段约 15 分钟，外观阶段约 16 分钟
- **优化器**：AdamW，几何学习率 \(1 \times 10^{-3}\)，外观学习率 \(1 \times 10^{-2}\)
- **每次迭代采样 24 个相机视角**进行渲染

##### 消融实验关键发现

1. **解耦 vs 耦合**：将几何和材质耦合到同一网络联合学习会导致生成失败，验证了解耦设计的必要性
2. **法线图 vs 着色图像**：用着色图像替代法线图进行几何优化会产生扭曲的几何形状
3. **粗到细策略**：去除粗到细的权重调度会导致几何细节不足

#### 🧪 练习题
```yaml
question: "Fantasia3D 在几何建模阶段使用什么作为 Stable Diffusion 的输入？"
options:
  - "PBR 渲染的彩色图像"
  - "渲染的法线图与 mask 的组合"
  - "深度图"
  - "SDF 体素网格的切片"
answer: 1
explain: "Fantasia3D 将 DMTet 提取网格渲染的法线图与二值 mask 组合为 RGB 图像，编码后送入 Stable Diffusion 计算 SDS 损失。法线图的值域 (-1,1) 与潜空间数据范围对齐，且 LAION-5B 训练数据中包含法线图，使扩散模型能有效处理。"
```

### ProlificDreamer

```yaml
id: prolificdreamer
num: 10
name: ProlificDreamer
full_name: 高产梦想家 (ProlificDreamer)
year: '2023'
org: Tsinghua University
parent: dreamfusion
paper_url: https://arxiv.org/abs/2305.16213
project_url: ''
category: optimization
motivation: 变分分数蒸馏VSD解决过平滑
```

#### 📝 一句话总结
ProlificDreamer 的核心目标是：变分分数蒸馏VSD解决过平滑。

#### 🎯 核心要点
- 核心动机：变分分数蒸馏VSD解决过平滑
- 演化来源：继承或改进自 dreamfusion
- 代表机构：Tsinghua University

#### 🔬 深入细节
变分分数蒸馏VSD解决过平滑


### LucidDreamer

```yaml
id: luciddreamer
num: 11
name: LucidDreamer
full_name: 清醒梦境 (LucidDreamer)
year: '2023'
org: KAIST
parent: prolificdreamer
paper_url: https://arxiv.org/abs/2311.11284
project_url: ''
category: optimization
motivation: 区间分数匹配ISM提升保真度
```

#### 📝 一句话总结
LucidDreamer 的核心目标是：区间分数匹配ISM提升保真度。

#### 🎯 核心要点
- 核心动机：区间分数匹配ISM提升保真度
- 演化来源：继承或改进自 prolificdreamer
- 代表机构：KAIST

#### 🔬 深入细节
区间分数匹配ISM提升保真度


### Zero-1-to-3

```yaml
id: zero123
num: 12
name: Zero-1-to-3
full_name: 零样本视角合成 (Zero-1-to-3)
year: '2023'
org: Columbia University
parent: —
paper_url: https://arxiv.org/abs/2303.11328
project_url: ''
category: feed_forward
motivation: 注入相机参数实现单图新视角
```

#### 📝 一句话总结
Zero-1-to-3 的核心目标是：注入相机参数实现单图新视角。

#### 🎯 核心要点
- 核心动机：注入相机参数实现单图新视角
- 代表机构：Columbia University

#### 🔬 深入细节
注入相机参数实现单图新视角


### One-2-3-45

```yaml
id: one2345
num: 13
name: One-2-3-45
full_name: 单图45秒重建 (One-2-3-45)
year: '2023'
org: Stanford University
parent: zero123
paper_url: https://arxiv.org/abs/2306.16928
project_url: ''
category: feed_forward
motivation: 多视图生成+快速网格重建
```

#### 📝 一句话总结
One-2-3-45 的核心目标是：多视图生成+快速网格重建。

#### 🎯 核心要点
- 核心动机：多视图生成+快速网格重建
- 演化来源：继承或改进自 zero123
- 代表机构：Stanford University

#### 🔬 深入细节
多视图生成+快速网格重建


### MVDream

```yaml
id: mvdream
num: 14
name: MVDream
full_name: 多视图梦境 (MVDream)
year: '2024'
org: ByteDance
parent: zero123
paper_url: https://arxiv.org/abs/2308.16512
project_url: ''
category: feed_forward
motivation: 多视图注意力解决Janus问题
```

#### 📝 一句话总结
MVDream 的核心目标是：多视图注意力解决Janus问题。

#### 🎯 核心要点
- 核心动机：多视图注意力解决Janus问题
- 演化来源：继承或改进自 zero123
- 代表机构：ByteDance

#### 🔬 深入细节
多视图注意力解决Janus问题


### Wonder3D

```yaml
id: wonder3d
num: 15
name: Wonder3D
full_name: 神奇3D (Wonder3D)
year: '2024'
org: HKU
parent: mvdream
paper_url: https://arxiv.org/abs/2310.15008
project_url: ''
category: feed_forward
motivation: 跨域扩散生成一致多视图
```

#### 📝 一句话总结
Wonder3D 的核心目标是：跨域扩散生成一致多视图。

#### 🎯 核心要点
- 核心动机：跨域扩散生成一致多视图
- 演化来源：继承或改进自 mvdream
- 代表机构：HKU

#### 🔬 深入细节
跨域扩散生成一致多视图


### LRM

```yaml
id: lrm
num: 16
name: LRM
full_name: 大规模重建模型 (Large Reconstruction Model)
year: '2024'
org: Adobe Research
parent: zero123
paper_url: https://arxiv.org/abs/2311.04400
project_url: ''
category: feed_forward
motivation: Transformer单图5秒预测NeRF
```

#### 📝 一句话总结
LRM 的核心目标是：Transformer单图5秒预测NeRF。

#### 🎯 核心要点
- 核心动机：Transformer单图5秒预测NeRF
- 演化来源：继承或改进自 zero123
- 代表机构：Adobe Research

#### 🔬 深入细节
Transformer单图5秒预测NeRF


### Instant3D

```yaml
id: instant3d
num: 17
name: Instant3D
full_name: 即时3D (Instant3D)
year: '2024'
org: Tencent
parent: lrm
paper_url: https://arxiv.org/abs/2311.06214
project_url: ''
category: feed_forward
motivation: 稀疏视图+LRM快速前馈生成
```

#### 📝 一句话总结
Instant3D 的核心目标是：稀疏视图+LRM快速前馈生成。

#### 🎯 核心要点
- 核心动机：稀疏视图+LRM快速前馈生成
- 演化来源：继承或改进自 lrm
- 代表机构：Tencent

#### 🔬 深入细节
稀疏视图+LRM快速前馈生成


### iLRM

```yaml
id: ilrm
num: 18
name: iLRM
full_name: 迭代大规模重建 (Iterative LRM)
year: '2026.03'
org: CVPR
parent: lrm
paper_url: https://arxiv.org/abs/2604.16000
project_url: ''
category: feed_forward
motivation: 迭代细化机制生成3DGS
```

#### 📝 一句话总结
iLRM 的核心目标是：迭代细化机制生成3DGS。

#### 🎯 核心要点
- 核心动机：迭代细化机制生成3DGS
- 演化来源：继承或改进自 lrm
- 代表机构：CVPR

#### 🔬 深入细节
迭代细化机制生成3DGS


### VGG-T³

```yaml
id: vgg_t3
num: 19
name: VGG-T³
full_name: 测试时训练重建 (VGG-T³)
year: '2026.02'
org: arXiv
parent: ilrm
paper_url: https://arxiv.org/abs/2602.23361
project_url: ''
category: feed_forward
motivation: TTT线性扩展58秒千图重建
```

#### 📝 一句话总结
VGG-T³ 的核心目标是：TTT线性扩展58秒千图重建。

#### 🎯 核心要点
- 核心动机：TTT线性扩展58秒千图重建
- 演化来源：继承或改进自 ilrm
- 代表机构：arXiv

#### 🔬 深入细节
TTT线性扩展58秒千图重建


### 4D-LRM

```yaml
id: 4d_lrm
num: 20
name: 4D-LRM
full_name: 4D大规模重建 (4D-LRM)
year: '2025.12'
org: arXiv
parent: lrm
paper_url: https://arxiv.org/abs/2512.04000
project_url: ''
category: feed_forward
motivation: 首个大规模4D动态重建模型
```

#### 📝 一句话总结
4D-LRM 的核心目标是：首个大规模4D动态重建模型。

#### 🎯 核心要点
- 核心动机：首个大规模4D动态重建模型
- 演化来源：继承或改进自 lrm
- 代表机构：arXiv

#### 🔬 深入细节
首个大规模4D动态重建模型


### YoNoSplat

```yaml
id: yonosplat
num: 21
name: YoNoSplat
full_name: 单模型前馈3DGS (YoNoSplat)
year: '2026.04'
org: ICLR
parent: ilrm
paper_url: https://openreview.net/forum?id=yono2026
project_url: ''
category: feed_forward
motivation: 毫秒级任意视图重建
```

#### 📝 一句话总结
YoNoSplat 的核心目标是：毫秒级任意视图重建。

#### 🎯 核心要点
- 核心动机：毫秒级任意视图重建
- 演化来源：继承或改进自 ilrm
- 代表机构：ICLR

#### 🔬 深入细节
毫秒级任意视图重建


### TEXTure

```yaml
id: texture
num: 22
name: TEXTure
full_name: 文本纹理 (TEXTure)
year: '2023'
org: Technion
parent: —
paper_url: https://arxiv.org/abs/2302.01721
project_url: ''
category: texture
motivation: 迭代投影涂色生成无缝纹理
```

#### 📝 一句话总结
TEXTure 的核心目标是：迭代投影涂色生成无缝纹理。

#### 🎯 核心要点
- 核心动机：迭代投影涂色生成无缝纹理
- 代表机构：Technion

#### 🔬 深入细节
迭代投影涂色生成无缝纹理


### Text2Tex

```yaml
id: text2tex
num: 23
name: Text2Tex
full_name: 文本转纹理 (Text2Tex)
year: '2023'
org: Stanford University
parent: texture
paper_url: https://arxiv.org/abs/2303.11396
project_url: ''
category: texture
motivation: 渐进式策略确保全局一致性
```

#### 📝 一句话总结
Text2Tex 的核心目标是：渐进式策略确保全局一致性。

#### 🎯 核心要点
- 核心动机：渐进式策略确保全局一致性
- 演化来源：继承或改进自 texture
- 代表机构：Stanford University

#### 🔬 深入细节
渐进式策略确保全局一致性


### TRELLIS 2

```yaml
id: trellis2
num: 24
name: TRELLIS 2
full_name: 微软TRELLIS 2 (TRELLIS 2)
year: '2025.12'
org: Microsoft Research
parent: text2tex
paper_url: https://trellis2.app/
project_url: ''
category: texture
motivation: O-Voxel原生PBR材质生成
```

#### 📝 一句话总结
TRELLIS 2 的核心目标是：O-Voxel原生PBR材质生成。

#### 🎯 核心要点
- 核心动机：O-Voxel原生PBR材质生成
- 演化来源：继承或改进自 text2tex
- 代表机构：Microsoft Research

#### 🔬 深入细节
O-Voxel原生PBR材质生成


### Hunyuan3D 2.1

```yaml
id: hunyuan3d_21
num: 25
name: Hunyuan3D 2.1
full_name: 混元3D 2.1 (Hunyuan3D 2.1)
year: '2026.03'
org: Tencent
parent: trellis2
paper_url: https://github.com/tencent/Hunyuan3D-2
project_url: ''
category: texture
motivation: 78%盲测胜率高质量纹理
```

#### 📝 一句话总结
Hunyuan3D 2.1 的核心目标是：78%盲测胜率高质量纹理。

#### 🎯 核心要点
- 核心动机：78%盲测胜率高质量纹理
- 演化来源：继承或改进自 trellis2
- 代表机构：Tencent

#### 🔬 深入细节
78%盲测胜率高质量纹理


### Dragtex

```yaml
id: dragtex
num: 26
name: Dragtex
full_name: 拖拽纹理编辑 (Dragtex)
year: '2026.02'
org: IEEE
parent: hunyuan3d_21
paper_url: https://ieeexplore.ieee.org/document/11368713
project_url: ''
category: texture
motivation: 基于点的交互式纹理编辑
```

#### 📝 一句话总结
Dragtex 的核心目标是：基于点的交互式纹理编辑。

#### 🎯 核心要点
- 核心动机：基于点的交互式纹理编辑
- 演化来源：继承或改进自 hunyuan3d_21
- 代表机构：IEEE

#### 🔬 深入细节
基于点的交互式纹理编辑


### AR3DR1

```yaml
id: ar3dr1
num: 27
name: AR3DR1
full_name: 强化学习3D生成 (AR3DR1)
year: '2026.03'
org: CVPR
parent: luciddreamer
paper_url: https://arxiv.org/abs/2603.15000
project_url: ''
category: native_3d
motivation: high-GRPO分层RL优化生成
```

#### 📝 一句话总结
AR3DR1 的核心目标是：high-GRPO分层RL优化生成。

#### 🎯 核心要点
- 核心动机：high-GRPO分层RL优化生成
- 演化来源：继承或改进自 luciddreamer
- 代表机构：CVPR

#### 🔬 深入细节
high-GRPO分层RL优化生成


### VIST3A

```yaml
id: vist3a
num: 28
name: VIST3A
full_name: 视频蒸馏3D (VIST3A)
year: '2026.04'
org: ICLR
parent: luciddreamer
paper_url: https://iclr.cc/virtual/2026/poster/25432
project_url: ''
category: native_3d
motivation: 视频生成器缝合3D重建
```

#### 📝 一句话总结
VIST3A 的核心目标是：视频生成器缝合3D重建。

#### 🎯 核心要点
- 核心动机：视频生成器缝合3D重建
- 演化来源：继承或改进自 luciddreamer
- 代表机构：ICLR

#### 🔬 深入细节
视频生成器缝合3D重建


### Lyra

```yaml
id: lyra
num: 29
name: Lyra
full_name: 视频扩散自蒸馏 (Lyra)
year: '2026.04'
org: ICLR
parent: vist3a
paper_url: https://iclr.cc/virtual/2026/poster/lyra
project_url: ''
category: native_3d
motivation: 视频扩散自蒸馏到3DGS
```

#### 📝 一句话总结
Lyra 的核心目标是：视频扩散自蒸馏到3DGS。

#### 🎯 核心要点
- 核心动机：视频扩散自蒸馏到3DGS
- 演化来源：继承或改进自 vist3a
- 代表机构：ICLR

#### 🔬 深入细节
视频扩散自蒸馏到3DGS


### Hunyuan3D 3.0

```yaml
id: hunyuan3d_3
num: 30
name: Hunyuan3D 3.0
full_name: 混元3D 3.0 (Hunyuan3D 3.0)
year: '2026.04'
org: Tencent
parent: instant3d
paper_url: https://github.com/tencent/Hunyuan3D-3
project_url: ''
category: native_3d
motivation: 1536³原生分辨率36亿体素
```

#### 📝 一句话总结
Hunyuan3D 3.0 的核心目标是：1536³原生分辨率36亿体素。

#### 🎯 核心要点
- 核心动机：1536³原生分辨率36亿体素
- 演化来源：继承或改进自 instant3d
- 代表机构：Tencent

#### 🔬 深入细节
1536³原生分辨率36亿体素


### Seed3D 2.0

```yaml
id: seed3d_2
num: 31
name: Seed3D 2.0
full_name: 豆包3D 2.0 (Seed3D 2.0)
year: '2026.04'
org: ByteDance
parent: hunyuan3d_3
paper_url: https://www.bytedance.com/seed3d
project_url: ''
category: native_3d
motivation: DiT+URDF工业级资产输出
```

#### 📝 一句话总结
Seed3D 2.0 的核心目标是：DiT+URDF工业级资产输出。

#### 🎯 核心要点
- 核心动机：DiT+URDF工业级资产输出
- 演化来源：继承或改进自 hunyuan3d_3
- 代表机构：ByteDance

#### 🔬 深入细节
DiT+URDF工业级资产输出


### Rodin Gen-2

```yaml
id: rodin_gen2
num: 32
name: Rodin Gen-2
full_name: Rodin二代 (Rodin Gen-2)
year: '2026.04'
org: Microsoft
parent: seed3d_2
paper_url: https://microsoft.com/rodin
project_url: ''
category: native_3d
motivation: 100亿参数四边形拓扑生成
```

#### 📝 一句话总结
Rodin Gen-2 的核心目标是：100亿参数四边形拓扑生成。

#### 🎯 核心要点
- 核心动机：100亿参数四边形拓扑生成
- 演化来源：继承或改进自 seed3d_2
- 代表机构：Microsoft

#### 🔬 深入细节
100亿参数四边形拓扑生成
