### Fantasia3D — 解耦几何与外观的高质量文本到3D生成

```yaml
id: fantasia3d
name: Fantasia3D
full_name: "Fantasia3D: Disentangling Geometry and Appearance for High-quality Text-to-3D Content Creation"
year: 2023
org: "South China University of Technology / Tencent AI Lab"
paper_url: "https://arxiv.org/abs/2303.13873"
category: "text-to-3d"
parent: "DreamFusion / SDS"
motivation: "将几何与外观解耦建模，结合 DMTet 混合表示与 PBR 材质模型，实现高质量可编辑的文本到3D内容生成"
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