### Thermal3D-GS — 物理驱动的热红外 3D 高斯新视角合成

```yaml
id: thermal3d_gs
name: Thermal3D-GS
full_name: "Thermal3D-GS: Physics-Induced 3D Gaussians for Thermal Infrared Novel-View Synthesis"
year: 2024
org: "ECCV 2024 (Nanjing University of Science and Technology)"
paper_url: "https://arxiv.org/abs/2409.08042"
category: 3d_vision
parent: 3D-GS
motivation: "将热红外物理先验（大气传输衰减、热传导模糊）融入3D高斯表示，首次实现热红外新视角合成，扩展至多物理模态"
```

#### 📝 一句话总结

Thermal3D-GS 首次将热红外成像的物理先验（大气传输衰减与热传导效应）引入 3D Gaussian Splatting 框架，通过大气传输场（ATF）消除纤维状浮点伪影、热传导模块（TCM）修复模糊边缘，并结合不连续性损失增强温度一致性，在自建的 TI-NVS 数据集上实现了热红外新视角合成 PSNR 提升 3dB 以上的 SOTA 结果。

#### 🎯 核心要点

- **首个热红外 NVS 数据集 TI-NVS**：包含 9 个场景（室内 3 + 室外 3 + 无人机 3），每场景 6 台相机、约 120 张热红外图像，涵盖多样温度分布与拍摄条件
- **大气传输场 ATF**：基于 Bouguer-Lambert-Beer 定律，用 MLP 网络解耦几何与大气衰减系数 \((\mu_{abs}, \mu_{sca}, d)\)，消除因大气吸收/散射导致的纤维状浮点伪影（floaters）
- **热传导模块 TCM**：基于傅里叶热传导定律推导 2D 热传导方程 \(\frac{\partial u}{\partial t} = \alpha \Delta u\)，用 CNN 学习像素级热扩散系数 \(\alpha\)，通过残差机制修复热传导引起的边缘模糊
- **不连续性损失 \(\mathcal{L}_{dis}\)**：利用 Harris 角点检测响应加权 L1 损失，引导模型关注温度不连续区域，增强对异常区域的鲁棒性
- **总损失函数**：\(\mathcal{L}_{total} = \lambda_{dis}\mathcal{L}_{dis} + \lambda\mathcal{L}_{D\text{-}SSIM} + (1-\lambda_{dis}-\lambda)\mathcal{L}_1\)，其中 \(\lambda_{dis} = \lambda = 0.2\)
- **实验结果**：平均 PSNR 35.04 / SSIM 0.955 / LPIPS 0.187，较 3D-GS 基线分别提升 +3.03dB / +0.019 / -0.019

#### 🔬 深入细节

![Thermal3D-GS 框架总览](https://arxiv.org/html/2409.08042v1/x2.png)
*图：Thermal3D-GS 整体框架。左侧为 3D-GS 基础渲染管线，中间黄色框为大气传输场（ATF）对球谐系数的衰减优化，右侧蓝色框为热传导模块（TCM）对渲染图像的边缘修复，底部为不连续性损失约束。*

##### 动机与背景

热红外成像与可见光成像存在本质差异：热红外图像记录的是物体表面的热辐射强度而非反射光，其成像过程受到两个独特物理效应的显著影响：

1. **大气传输衰减**：热辐射在传播过程中被大气中的水蒸气、CO₂ 等温室气体吸收，同时被氮气、氧气分子和云粒子散射，导致辐射强度随传播距离衰减。这种衰减在不同空间位置和时间点各不相同（受温度、湿度等环境因素影响），使得 3D-GS 学习到错误的 3D 高斯（floaters）来补偿衰减差异。

2. **热传导效应**：高温物体通过分子振动向周围介质传热，导致物体边缘温度场发生扩散。在热红外图像中表现为边缘模糊，且不同视角下模糊程度不同。3D-GS 在多视角优化中会对这些不一致的边缘取"平均"，进一步加剧模糊。

传统的 3D-GS 和 NeRF 方法未考虑这些热红外特有的物理效应，直接应用会产生严重的浮点伪影和边缘模糊。

##### 核心机制一：大气传输场（ATF）

ATF 的物理基础是 **Bouguer-Lambert-Beer 定律**，描述辐射在介质中的指数衰减：

$$I = I_0 \cdot e^{\mu(\lambda) \cdot d}$$

其中 \(I_0\) 为初始辐射强度，\(\mu = \mu_{abs} + \mu_{sca}\) 为介质衰减系数（吸收 + 散射），\(d\) 为传播距离。

**关键设计思路**：将衰减效应与几何解耦。每个 3D 高斯代表空间中一小块连续区域，共享均匀的衰减系数。ATF 使用一个 8 层、256 维隐藏层的 MLP 网络，输入为位置编码后的 3D 高斯位置 \(\gamma(x)\) 和归一化拍摄时间 \(\gamma(t)\)（\(L=10\) 频率），输出衰减参数：

$$(\mu_{abs}, \mu_{sca}, d) = \mathscr{F}_{ATF}(\gamma(x), \gamma(t))$$

衰减后的球谐系数为：

$$SH = SH_0 \cdot e^{(\mu_{abs} + \mu_{sca}) \cdot d}$$

> 💡 **关键直觉**：引入时间维度 \(t\) 是因为大气条件（温度、湿度）随时间变化，不同帧的衰减系数不同。初始化时 \(\mu_{abs} = \mu_{sca} = 0, d = 1\)，即无衰减状态，让网络从零学习衰减量。

##### 核心机制二：热传导模块（TCM）

TCM 的物理基础是 **傅里叶热传导定律**。在 2D 温度场中，热传导方程为：

$$\frac{\partial u}{\partial t} = \alpha \Delta u = \frac{k}{c\rho}\left(\frac{\partial^2 u}{\partial x^2} + \frac{\partial^2 u}{\partial y^2}\right)$$

其中 \(u(t,x,y)\) 为温度分布，\(\alpha = k/(c\rho)\) 为热扩散系数，\(k\) 为热传导系数，\(c\) 为比热容，\(\rho\) 为密度。

该方程表明：热传导对热成像的影响由常数 \(\alpha\) 和温度场的二阶微分（拉普拉斯算子）共同决定。

**关键设计思路**：由于 \(\alpha\) 在不同像素位置具有异质性（不同材质的热扩散系数不同），传统物理方法难以精确建模。TCM 采用深度学习方法：

```python
# TCM 热传导模块伪代码
def TCM(rendered_image):
    # 1. 提取二阶梯度特征（模拟拉普拉斯算子）
    grad_x2 = second_order_gradient_x(rendered_image)
    grad_y2 = second_order_gradient_y(rendered_image)
    laplacian_features = concat(grad_x2, grad_y2)
    
    # 2. 用 3 层 CNN 融合原图与梯度信息
    # 学习像素级 α 并生成残差修正
    fused = concat(rendered_image, laplacian_features)  # [2n, H, W]
    residual = conv_block_1(fused)   # [2n] -> [n]
    residual = conv_block_2(residual) # [n] -> [n]
    residual = conv_block_3(residual) # [n] -> [n]
    
    # 3. 残差添加修复热传导引起的边缘模糊
    refined_image = rendered_image + residual
    return refined_image
```

> 💡 **关键直觉**：TCM 本质上是在学习一个像素级的"热传导逆过程"——已知渲染图像是热传导后的模糊结果，通过学习二阶梯度与原图的关系来恢复清晰边缘。

##### 核心机制三：不连续性损失

热红外图像中，物体表面温度通常平滑连续变化。图像中出现的"角点"（温度突变）更可能是模型学习错误的标志。基于此观察，利用 **Harris 角点检测**构建不连续性损失：

$$\mathcal{L}_{dis} = \frac{R}{R_{max}} \cdot \max\left(1 - \frac{i}{iter_t}, 0\right) \cdot \mathcal{L}_1$$

其中：
- \(R = \det(M) - k \cdot (\text{trace}(M))^2\) 为 Harris 角点响应函数
- \(R/R_{max}\) 为归一化角点响应，表示该像素是角点的概率
- \(\max(1 - i/iter_t, 0)\) 为训练迭代衰减因子（\(iter_t = 5000\)），使该损失在训练早期起主导作用
- \(\mathcal{L}_1\) 为生成图像与真值的绝对误差

> ⚠️ **注意**：衰减因子的设计意味着不连续性损失仅在前 5000 次迭代中生效，之后完全衰减为 0。这是因为训练早期模型容易产生大量伪影角点，需要额外约束；后期模型已基本收敛，过多约束反而限制细节学习。

##### 训练流程

1. **输入**：多视角热红外图像 + SfM 点云初始化
2. **3D-GS 渲染**：标准高斯光栅化得到初始渲染图像和球谐系数 \(SH_0\)
3. **ATF 优化**：MLP 网络根据高斯位置和时间预测衰减系数，修正 \(SH_0 \to SH\)
4. **重新渲染**：使用修正后的球谐系数进行光栅化
5. **TCM 精修**：CNN 对渲染图像进行边缘修复
6. **损失计算**：\(\mathcal{L}_{total} = 0.2\mathcal{L}_{dis} + 0.2\mathcal{L}_{D\text{-}SSIM} + 0.6\mathcal{L}_1\)
7. **优化**：Adam 优化器，3D 高斯和 TCM 共享学习率，ATF 学习率从 \(8 \times 10^{-4}\) 指数衰减到 \(1.6 \times 10^{-6}\)，共 30,000 次迭代

##### 与传统方法的对比

| 方法 | 处理大气衰减 | 处理热传导 | 温度一致性 | Avg PSNR |
|------|:-----------:|:---------:|:---------:|:--------:|
| Plenoxels | ✗ | ✗ | ✗ | 23.28 |
| InstantNGP-Big | ✗ | ✗ | ✗ | 24.91 |
| 3D-GS (30k) | ✗ | ✗ | ✗ | 32.01 |
| **Thermal3D-GS** | **ATF** | **TCM** | **\(\mathcal{L}_{dis}\)** | **35.04** |

消融实验表明：ATF 主要消除纤维状浮点伪影（floaters），TCM 主要修复模糊边缘，不连续性损失提升整体鲁棒性。三个模块协同工作，缺一不可。

#### 🧪 练习题

```yaml
question: "Thermal3D-GS 中大气传输场（ATF）的 MLP 网络输入包含哪些信息？"
options:
  - "仅 3D 高斯的位置编码 γ(x)"
  - "3D 高斯的位置编码 γ(x) 和归一化拍摄时间 γ(t)"
  - "渲染图像的像素坐标和温度值"
  - "3D 高斯的球谐系数 SH 和不透明度 α"
answer: 1
explain: "ATF 网络输入为位置编码后的 3D 高斯空间位置 γ(x) 和归一化拍摄时间 γ(t)，因为大气衰减系数同时取决于空间位置（不同区域的大气成分不同）和时间（温度、湿度等环境条件随时间变化）。"
```