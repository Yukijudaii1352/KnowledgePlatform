### D-NeRF：动态神经辐射场

```yaml
id: d_nerf
name: D-NeRF
full_name: "动态神经辐射场 (Dynamic Neural Radiance Fields)"
year: "2020"
org: "UPC / MPI for Informatics"
paper_url: "https://arxiv.org/abs/2011.13961"
category: "3d_vision"
parent: "NeRF"
motivation: "将 NeRF 从静态场景扩展到动态场景，通过形变网络+规范网络的双模块设计建模场景的形变与运动"
```

#### 📝 一句话总结

D-NeRF 提出将动态场景分解为**规范空间表示**与**时变形变场**两个模块，仅需单目移动相机拍摄的稀疏图像即可端到端学习动态场景的神经辐射场，实现任意时刻、任意视角的新视角合成。

#### 🎯 核心要点

- **双网络架构**：形变网络 \(\Psi_t\) 学习时变位移场，规范网络 \(\Psi_x\) 学习规范空间的体密度与颜色
- **6D 神经辐射场**：将 NeRF 的 5D 输入 \((x,y,z,\theta,\phi)\) 扩展为 6D \((x,y,z,\theta,\phi,t)\)，引入时间维度
- **规范空间分解**：所有时刻的场景通过位移场映射到统一的规范配置（\(t=0\)），实现几何与外观的共享表示
- **端到端训练**：仅需 RGB 图像和相机位姿，无需 3D 先验、深度监督或多视角同步采集
- **课程学习策略**：按时间戳排序逐步引入训练图像，提升形变网络收敛稳定性
- **位置编码**：对空间坐标 \(L=10\)、视角方向和时间 \(L=4\) 分别应用 Fourier 位置编码
- **8 个动态场景基准**：构建包含关节运动、人体运动、弹跳球等多种形变类型的合成数据集

#### 🔬 深入细节

##### 框架总览

![D-NeRF 流水线示意图](https://ar5iv.labs.arxiv.org/html/2011.13961/assets/figures/pipeline.png)
*图：D-NeRF 整体流水线。输入为带时间戳的 3D 点 \((\mathbf{x}, t)\)，形变网络输出位移 \(\Delta\mathbf{x}\)，将点映射到规范空间后由规范网络预测颜色和密度。*

![D-NeRF 网络架构](https://ar5iv.labs.arxiv.org/html/2011.13961/assets/figures/model.png)
*图：D-NeRF 的双网络架构细节。左侧为形变网络 \(\Psi_t\)，右侧为规范网络 \(\Psi_x\)，均为 8 层 MLP。*

##### 算法伪代码

```python
# D-NeRF 训练流程伪代码
# 两个网络：Ψ_t (形变网络), Ψ_x (规范网络)

for iteration in range(800_000):
    # 1. 采样：随机选取一张图像及其时间戳 t 和相机位姿 T_t
    image_t, t, T_t = sample_training_image()
    
    # 2. 光线采样：从该相机投射 N_s=4096 条光线
    rays = cast_rays(T_t, num_rays=4096)
    
    # 3. 对每条光线上的采样点 x(h) = o + h*d：
    for ray in rays:
        points = stratified_sample(ray, num_samples=64)  # 分层采样
        
        # 4. 形变网络：将观测空间的点映射到规范空间
        if t != 0:
            delta_x = Ψ_t(encode(x), encode(t))  # 预测位移
            p = x + delta_x                        # 规范空间坐标
        else:
            p = x  # t=0 即为规范空间
        
        # 5. 规范网络：预测规范空间的密度和颜色
        color, sigma = Ψ_x(encode(p), encode(d))
    
    # 6. 体渲染：沿光线积分得到像素颜色
    C_pred = volume_rendering(colors, sigmas, deltas)
    
    # 7. 损失：MSE
    loss = MSE(C_pred, C_gt)
    loss.backward()
    optimizer.step()
```

##### 动机与背景

NeRF 在静态场景的新视角合成中取得了突破性成果，但其假设场景在所有图像中保持不变，无法处理包含运动或形变的动态场景。现实世界中大量场景是动态的——人体运动、物体交互、柔性物体变形等。

此前处理动态场景的方法通常需要：(1) 多相机同步采集系统；(2) 预计算的 3D 先验（如模板网格、骨骼）；(3) 同一时刻的多视角观测。这些约束严重限制了实际应用。

D-NeRF 的核心洞察是：**动态场景可以分解为一个共享的规范几何表示和一组时变的形变场**。这一思想借鉴了传统计算机视觉中 Shape-from-Template 的理念，但完全在隐式神经表示框架下实现。

##### 核心机制

**1. 形变网络 \(\Psi_t\)：时变位移场**

形变网络接收空间坐标 \(\mathbf{x}\) 和时间 \(t\) 的位置编码，输出 3D 位移向量 \(\Delta\mathbf{x}\)：

$$\Psi_t(\mathbf{x}, t) = \begin{cases} \Delta\mathbf{x}, & \text{if } t \neq 0 \\ \mathbf{0}, & \text{if } t = 0 \end{cases}$$

这里选择 \(t=0\) 作为规范时刻，意味着 \(t=0\) 时形变为零，网络无需学习恒等映射。形变网络的输出不施加非线性激活，允许任意方向和大小的位移。

> 💡 **关键**：形变网络将每个时刻的 3D 点映射回规范空间，而非反向映射。这使得体渲染时可以直接在规范空间查询密度和颜色。

**2. 规范网络 \(\Psi_x\)：共享场景表示**

规范网络与标准 NeRF 结构相同，接收规范空间坐标 \(\mathbf{p}\) 和视角方向 \(\mathbf{d}\) 的位置编码，输出 RGB 颜色 \(\mathbf{c}\) 和体密度 \(\sigma\)：

$$[\mathbf{c}(\mathbf{p}, \mathbf{d}),\; \sigma(\mathbf{p})] = \Psi_x(\mathbf{p}, \mathbf{d})$$

颜色和密度分别通过 sigmoid 激活输出。所有时刻共享同一个规范网络，这是 D-NeRF 能够从稀疏观测中学习的关键——不同时刻的图像虽然形变不同，但都为同一个规范表示提供监督信号。

**3. 体渲染方程**

给定相机光线 \(\mathbf{x}(h) = \mathbf{o} + h\mathbf{d}\)，像素颜色通过修改后的体渲染积分计算：

$$C(p, t) = \int_{h_n}^{h_f} \mathcal{T}(h, t)\, \sigma(\mathbf{p}(h,t))\, \mathbf{c}(\mathbf{p}(h,t), \mathbf{d})\, dh$$

其中 \(\mathbf{p}(h,t) = \mathbf{x}(h) + \Psi_t(\mathbf{x}(h), t)\) 是经形变网络映射后的规范空间坐标，\(\mathcal{T}(h,t) = \exp\left(-\int_{h_n}^{h} \sigma(\mathbf{p}(s,t))\, ds\right)\) 是累积透射率。

> ⚠️ **注意**：密度 \(\sigma\) 和颜色 \(\mathbf{c}\) 均在**规范空间**中计算，而非观测空间。这意味着形变网络必须学习准确的点对应关系。

**4. 训练损失与优化**

训练损失为渲染像素与真实像素之间的均方误差：

$$\mathcal{L} = \frac{1}{N_s} \sum_{i=1}^{N_s} \left\| \hat{C}(p,t) - C'(p,t) \right\|_2^2$$

两个网络同时端到端优化，使用 Adam 优化器（学习率 \(5 \times 10^{-4}\)，指数衰减至 \(5 \times 10^{-5}\)）。

**5. 课程学习策略**

为提升收敛性，训练图像按时间戳排序，逐步引入更大形变的图像。这使得网络先学习小形变，再逐步扩展到大形变，避免了形变网络在训练初期因大位移而产生的不稳定。

##### 与传统方法的区别

| 特性 | NeRF | T-NeRF（直接 6D 输入） | D-NeRF |
|------|------|----------------------|--------|
| 输入维度 | 5D \((x,y,z,\theta,\phi)\) | 6D \((x,y,z,\theta,\phi,t)\) | 6D（分解为形变+规范） |
| 动态场景 | ❌ | ✅ 但无显式形变建模 | ✅ 显式形变场 |
| 规范空间 | — | 无 | 有（共享几何表示） |
| 形变可视化 | — | 不可解释 | 可提取位移场 |

T-NeRF 是将时间直接作为额外输入维度的朴素扩展，但缺乏规范空间的归纳偏置，导致网络需要为每个时刻独立学习几何和外观，数据效率低。D-NeRF 通过规范空间分解，使所有时刻共享几何先验，显著提升了稀疏观测下的重建质量。

实验结果表明，D-NeRF 在 8 个动态场景上的 PSNR 普遍优于 NeRF（提升 5-15 dB）和 T-NeRF（提升 1-3 dB），尤其在大形变场景（如 Hell Warrior、Hook）中优势更为明显。

#### 🧪 练习题

```yaml
question: "D-NeRF 中形变网络 Ψ_t 在 t=0 时的输出是什么？"
options:
  - "与其他时刻相同的位移向量 Δx"
  - "零向量（强制为规范空间）"
  - "单位矩阵表示的刚体变换"
  - "由网络自由学习的任意值"
answer: 1
explain: "D-NeRF 将 t=0 设为规范时刻，强制 Ψ_t(x, 0) = 0，使得规范空间即为 t=0 时的场景状态，网络无需学习恒等映射。"
```