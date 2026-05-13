### Domain Randomization

```yaml
id: domain_rand
name: Domain Randomization
full_name: "域随机化 (Domain Randomization for Transferring Deep Neural Networks from Simulation to the Real World)"
year: 2017
org: OpenAI
paper_url: "https://arxiv.org/abs/1703.06907"
category: sim2real
parent: "—"
motivation: "通过在仿真中大规模随机化视觉渲染参数（纹理、光照、相机、干扰物），使训练后的模型将真实世界视为训练分布的又一变体，实现零样本 sim-to-real 迁移"
```

#### 📝 一句话总结

Domain Randomization 提出在仿真器中对纹理、光照、相机位姿和干扰物等视觉参数进行大规模随机化，使得仅在合成数据上训练的目标检测网络能够零样本迁移到真实世界，在物体定位任务上达到 1.5 cm 精度并成功完成机器人抓取。

#### 🎯 核心要点

- **零样本 Sim-to-Real 迁移**：完全不使用真实图像数据，仅依赖仿真渲染的随机化图像训练目标检测器，即可在真实场景中工作
- **多维度域随机化**：同时随机化纹理（桌面/地板/天空盒/物体）、光照（数量/位置/颜色）、相机（位置/朝向/FOV）、物体位姿和干扰物（0-10 个随机几何体）
- **VGG-16 回归架构**：基于 VGG-16 提取特征，接全连接层直接回归物体的 \((x, y, z)\) 三维坐标
- **纹理数量是关键因素**：消融实验表明纹理种类超过 1000 时性能显著提升，此时甚至不需要 ImageNet 预训练
- **干扰物对鲁棒性至关重要**：训练时加入随机干扰物体，使模型在真实杂乱场景中仍能准确定位
- **端到端抓取验证**：在 Fetch 机器人上实现了 76.6% 的杂乱场景抓取成功率，全部视觉能力来自仿真训练

#### 🔬 深入细节

##### 方法总览

![Domain Randomization 方法总览](https://ar5iv.labs.arxiv.org/html/1703.06907/assets/x1.png)
*图 1：Domain Randomization 方法示意。在仿真中对场景进行大规模随机化渲染（左），训练目标检测器后直接部署到真实世界（右）。核心思想是让真实世界成为随机化训练分布中的"普通一员"。*

##### 核心思想：让真实世界变得"不特殊"

Domain Randomization 的核心直觉非常优雅：**如果仿真训练数据的视觉多样性足够大，那么真实世界的外观只不过是这个巨大分布中的又一个采样点**。模型被迫学习对视觉外观变化不变的特征表示，从而自然地泛化到真实场景。

> 💡 **关键洞察**：与传统 sim-to-real 方法追求"逼真仿真"不同，Domain Randomization 反其道而行之——故意让仿真场景看起来"不真实但多样"，通过覆盖足够大的外观空间来包含真实世界。

##### 模型架构

![VGG-16 目标检测架构](https://ar5iv.labs.arxiv.org/html/1703.06907/assets/x2.png)
*图 2：基于 VGG-16 的目标定位网络架构。卷积特征提取后接全连接层，直接回归物体的三维坐标。*

网络架构基于 VGG-16，具体设计如下：

1. **特征提取**：使用 VGG-16 的卷积层（可选 ImageNet 预训练权重）
2. **回归头**：在 VGG-16 的 `pool5` 层后接两个全连接层（分别为 4096 和 4096 维），最终输出 3 维向量 \((x, y, z)\)
3. **损失函数**：采用 L2 损失直接回归物体的三维笛卡尔坐标

$$\mathcal{L} = \| \hat{\mathbf{p}} - \mathbf{p}^* \|_2^2$$

其中 \(\hat{\mathbf{p}} = (\hat{x}, \hat{y}, \hat{z})\) 为网络预测坐标，\(\mathbf{p}^* = (x^*, y^*, z^*)\) 为真实坐标。

##### 随机化参数空间

Domain Randomization 的核心在于对仿真渲染的多个维度同时进行随机化。每次渲染一张训练图像时，以下参数均从均匀分布中独立采样：

| 随机化维度 | 具体参数 | 采样范围 |
|:---|:---|:---|
| **纹理** | 桌面、地板、天空盒、目标物体、干扰物体的纹理 | 从纹理库中随机选取并施加随机颜色 |
| **光照** | 光源数量（1-4）、位置、颜色 | 位置在场景上方随机，颜色 RGB 各通道独立采样 |
| **相机** | 位置、朝向、视场角（FOV） | 在目标物体周围的球壳区域内采样 |
| **物体位姿** | 目标物体在桌面上的 \((x, y)\) 位置和旋转角 | 桌面范围内均匀采样 |
| **干扰物** | 数量（0-10）、形状、大小、位置、纹理 | 随机几何体散布在桌面上 |
| **噪声** | 像素级随机噪声 | 叠加到最终渲染图像上 |

![随机化训练图像示例](https://ar5iv.labs.arxiv.org/html/1703.06907/assets/example_imgs.png)
*图 7：Domain Randomization 生成的训练图像示例。注意纹理、光照、干扰物的巨大多样性。*

##### 训练流程伪代码

```python
# Domain Randomization 训练流程
def generate_randomized_scene(simulator, texture_library):
    """在仿真器中生成一个随机化场景"""
    # 1. 随机化纹理
    for surface in [table, floor, skybox, target_object]:
        surface.texture = random.choice(texture_library)
        surface.color = random_rgb()
    
    # 2. 随机化光照
    n_lights = random.randint(1, 4)
    for _ in range(n_lights):
        add_light(position=random_position_above_table(),
                  color=random_rgb())
    
    # 3. 随机化相机
    camera.position = sample_on_sphere(center=table_center, 
                                        radius=random.uniform(r_min, r_max))
    camera.fov = random.uniform(fov_min, fov_max)
    
    # 4. 随机放置目标物体
    target.position = random_position_on_table()
    target.rotation = random.uniform(0, 2 * pi)
    
    # 5. 添加随机干扰物
    n_distractors = random.randint(0, 10)
    for _ in range(n_distractors):
        add_distractor(shape=random_geometry(),
                       position=random_position_on_table(),
                       texture=random.choice(texture_library))
    
    # 6. 渲染并添加噪声
    image = simulator.render()
    image += random_noise()
    label = target.get_3d_position()
    return image, label

# 主训练循环
model = VGG16_Regressor(output_dim=3)
for iteration in range(100000):
    image, label = generate_randomized_scene(mujoco_sim, textures)
    prediction = model(image)
    loss = l2_loss(prediction, label)
    optimizer.step(loss)
```

##### 动机与背景：为什么需要 Domain Randomization？

传统的 sim-to-real 迁移面临一个根本矛盾：**仿真器永远无法完美复现真实世界的视觉复杂性**。此前的方法主要有两条路径：

1. **提升仿真逼真度**（Photorealistic Rendering）：通过精细建模材质、光照、物理属性来缩小 sim-real gap。但这需要大量人工标注和领域知识，且总存在未建模的视觉差异。
2. **域适应**（Domain Adaptation）：利用 GAN 等方法将仿真图像转换为"看起来像真实的"图像，或学习域不变特征。但这仍然需要真实世界的无标签数据。

Domain Randomization 提出了第三条路径：**不追求逼真，而是追求多样性**。这一思路的理论基础是：

$$P(\text{real} \in \text{support}(\mathcal{D}_{\text{rand}})) \to 1 \quad \text{as} \quad |\text{randomization}| \to \infty$$

即当随机化的范围足够大时，真实世界的视觉外观几乎必然落在训练分布的支撑集内。

> ⚠️ **注意**：这并不意味着随机化越极端越好。论文的消融实验表明，随机化参数的范围需要合理设置——过小则无法覆盖真实分布，过大则引入过多噪声降低学习效率。

##### 关键实验发现

**1. 纹理数量的临界效应**

![纹理数量消融实验](https://ar5iv.labs.arxiv.org/html/1703.06907/assets/texture_ablation.png)
*图 5：纹理数量对真实世界检测精度的影响。当纹理数量超过约 1000 时，性能出现显著跃升。*

这是论文最重要的发现之一：纹理多样性存在一个**临界点**。当纹理库中的纹理数量从 10 增加到 100 时，性能提升有限；但从 100 增加到 1000 以上时，真实世界的检测精度出现质的飞跃。这说明：
- 少量纹理变化不足以让模型学到真正的形状特征
- 超过临界点后，模型被迫放弃依赖纹理线索，转而学习更本质的几何特征

**2. 预训练 vs 随机初始化**

| 配置 | 真实世界误差 (cm) |
|:---|:---|
| ImageNet 预训练 + 少量纹理 | 较低 |
| 随机初始化 + 少量纹理 | 较高 |
| ImageNet 预训练 + 大量纹理 (>1000) | 最低 |
| 随机初始化 + 大量纹理 (>1000) | 接近最低 |

> 💡 **关键发现**：当纹理数量足够多时，ImageNet 预训练带来的优势几乎消失。这意味着 Domain Randomization 本身就能提供足够丰富的视觉先验。

**3. 各随机化维度的贡献**

论文通过逐一移除各随机化维度进行消融：

| 移除的随机化维度 | 对精度的影响 |
|:---|:---|
| 移除纹理随机化 | **严重下降**（最关键因素） |
| 移除干扰物 | 显著下降（尤其在杂乱场景中） |
| 移除相机随机化 | 轻微下降 |
| 移除光照随机化 | 轻微下降 |

纹理随机化是最关键的因素，其次是干扰物。这与直觉一致：纹理变化迫使模型学习形状而非颜色/纹理特征，干扰物则训练模型在杂乱中定位目标。

**4. 真实世界抓取验证**

![机器人抓取示例](https://ar5iv.labs.arxiv.org/html/1703.06907/assets/grasping_vF.png)
*图 6：Fetch 机器人使用仅在仿真中训练的视觉模型执行真实世界抓取任务。*

在 Fetch 机器人平台上，使用仅在仿真中训练的目标检测器，配合简单的抓取策略，实现了：
- **单物体场景**：接近 100% 的抓取成功率
- **杂乱场景（5 个物体）**：76.6% 的抓取成功率
- **定位精度**：约 1.5 cm 的三维定位误差

##### 与传统方法的对比

| 方法 | 是否需要真实数据 | 仿真要求 | 泛化能力 | 工程复杂度 |
|:---|:---|:---|:---|:---|
| **真实数据训练** | ✅ 大量标注 | 不需要 | 受限于数据分布 | 数据采集成本高 |
| **逼真仿真** | ❌ | 极高逼真度 | 受限于仿真精度 | 建模成本极高 |
| **域适应 (DA)** | ⚠️ 需无标签真实数据 | 中等 | 依赖适应质量 | 需训练额外模型 |
| **Domain Randomization** | ❌ | 低（仅需基本渲染） | 强（覆盖大分布） | 低（仅需调参数范围） |

Domain Randomization 的最大优势在于**极低的工程门槛**：不需要精细的 3D 资产、不需要真实数据采集、不需要复杂的域适应训练，只需要一个基本的物理仿真器和一组随机纹理。

#### 🧪 练习题

```yaml
question: "Domain Randomization 消融实验中，对 sim-to-real 迁移性能影响最大的随机化维度是什么？"
options:
  - "光照随机化（光源数量、位置、颜色）"
  - "纹理随机化（桌面、物体、地板等表面纹理）"
  - "相机随机化（位置、朝向、视场角）"
  - "物体位姿随机化（目标物体的位置和旋转）"
answer: 1
explain: "论文消融实验明确表明纹理随机化是最关键的因素，移除后性能严重下降。纹理多样性迫使模型学习基于形状而非颜色/纹理的特征表示，这是实现 sim-to-real 泛化的核心。"
```