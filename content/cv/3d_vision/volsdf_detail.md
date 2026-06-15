### VolSDF

```yaml
id: volsdf
name: VolSDF
full_name: 体密度SDF (VolSDF)
year: '2021'
org: Weizmann
paper_url: https://arxiv.org/abs/2106.12052
category: reconstruction
parent: neus
motivation: 体密度与SDF几何约束融合提升重建质量
```

#### 📝 一句话总结

VolSDF 将体渲染中的 volume density 定义为 SDF 经 Laplace CDF 变换后的函数，并推导 opacity 近似误差界来指导采样，从而把 NeRF 的可微体渲染与隐式表面的几何约束结合起来。

#### 🎯 核心要点

- **密度由 SDF 决定**：不再学习任意 density，而是令 \(\sigma(\mathbf{x})=\alpha\Psi_\beta(-d_\Omega(\mathbf{x}))\)
- **Laplace CDF 变换**：用可学习的 \(\alpha,\beta\) 控制表面附近密度厚度和强度
- **零水平集表面**：最终几何从 SDF 的 \(d_\Omega(\mathbf{x})=0\) 提取，不依赖 density threshold
- **误差界采样**：推导体渲染 opacity 近似误差上界，据此自适应增加采样点
- **形状/外观解耦**：SDF 控制 density/geometry，radiance network 控制颜色，有利于交换几何与外观
- **无需前景 mask 的重建能力**：在 DTU、BlendedMVS 等多视角数据上获得更高质量几何
- **Eikonal 正则**：约束 SDF 梯度范数接近 1，保持隐式距离场性质

#### 🔬 深入细节

##### 核心示意图

![VolSDF 方法示意](https://ar5iv.labs.arxiv.org/html/2106.12052/assets/figures/teaser.jpg)
*图：VolSDF 将输入多视角图像用于学习 radiance field，同时把 volume density 绑定到 SDF。几何从 SDF 零水平集提取，渲染仍使用体渲染积分。*

##### 算法伪代码

```python
# VolSDF 训练伪代码
def train_volsdf(images, cameras, sdf_net, radiance_net):
    for step in range(num_steps):
        rays = sample_rays(images, cameras)

        # 根据 opacity 误差界自适应采样
        intervals = init_uniform_intervals(rays)
        while opacity_error_bound(intervals, sdf_net) > eps:
            intervals = upsample_intervals(intervals, sdf_net)

        pts, deltas = sample_from_intervals(intervals)
        sdf = sdf_net(pts)
        sigma = alpha * laplace_cdf(-sdf, beta)
        rgb_samples = radiance_net(pts, rays.dirs)

        weights = volume_rendering_weights(sigma, deltas)
        rgb = sum(weights * rgb_samples, dim="samples")

        photo_loss = l1(rgb, rays.target_rgb)
        eikonal_loss = ((norm(grad(sdf, pts)) - 1.0) ** 2).mean()
        loss = photo_loss + lambda_eik * eikonal_loss
        update_networks(loss)

    return marching_cubes(lambda x: sdf_net(x), level=0.0)
```

##### 动机与背景

NeRF 把几何隐含在任意 density field 中，渲染效果可以很好，但提取几何时必须选择 density threshold。这个阈值没有明确物理或几何意义，所以网格常出现噪声、厚壳和浮动物。另一方面，IDR 等 surface rendering 方法使用隐式表面，几何清晰，但优化需要更强初始化和 mask，复杂遮挡下梯度传播不如体渲染稳定。

VolSDF 的思路是：保留体渲染训练的稳定性，但不要让 density 自由漂移。它先学习一个 SDF \(d_\Omega(\mathbf{x})\)，再把 density 定义为 SDF 的确定函数。这样，density 的高值自然集中在表面附近，几何提取也直接取 SDF 零水平集。

##### SDF 到 density 的变换

VolSDF 使用 Laplace 分布的 CDF \(\Psi_\beta\)：

$$
\sigma(\mathbf{x}) = \alpha \Psi_\beta(-d_\Omega(\mathbf{x}))
$$

其中 \(d_\Omega(\mathbf{x})<0\) 表示物体内部，\(d_\Omega(\mathbf{x})>0\) 表示外部。\(\beta\) 控制表面过渡带的宽度，\(\alpha\) 控制 density 强度。直觉上，越靠近或进入物体内部，density 越高；远离表面时 density 变低或趋于饱和，从而把渲染的吸收事件集中到表面附近。

体渲染颜色仍为：

$$
\hat{C}(\mathbf{r})=
\int_0^\infty T(t)\sigma(\mathbf{x}(t))\mathbf{c}(\mathbf{x}(t),\mathbf{v})dt
$$

$$
T(t)=\exp\left(-\int_0^t \sigma(\mathbf{x}(s))ds\right)
$$

这使 VolSDF 与 NeRF 一样可以用 RGB photometric loss 端到端训练。

##### 误差界采样

体渲染需要沿每条光线离散采样。采样过少会让表面附近的 density 峰值被漏掉，采样过多又会拖慢训练。VolSDF 的重要贡献是利用 SDF 的 Lipschitz/距离函数性质推导 opacity 近似误差上界，并用这个上界指导自适应采样。

流程上，模型先在光线上粗采样，估计每个区间的误差上界；如果某些区间误差仍大，就在这些区间继续细分或重采样，直到 bound 低于阈值。相比 NeRF 的固定粗细两阶段采样，VolSDF 的采样与当前 SDF 几何直接相关，更容易把样本集中在表面附近。

##### 损失函数与表面提取

VolSDF 的主要训练目标包括 RGB 重建项和 Eikonal 项：

$$
\mathcal{L}=
\mathcal{L}_{\text{rgb}}+
\lambda \mathbb{E}_{\mathbf{x}}
\left(\|\nabla d_\Omega(\mathbf{x})\|_2-1\right)^2
$$

如果数据提供 foreground mask，也可以加入 mask loss；但方法的核心并不依赖 mask。训练结束后，网格由 Marching Cubes 从 \(d_\Omega(\mathbf{x})=0\) 提取。

##### 与 NeuS 的关系

VolSDF 和 NeuS 几乎同时提出，目标相近：用 SDF 约束体渲染几何。差异在于 VolSDF 显式把 density 定义为 SDF 的 Laplace CDF 变换，并强调 opacity 误差界和自适应采样；NeuS 更强调重新推导一阶无偏的 alpha/weight 公式，避免 SDF-density 的表面偏差。二者共同推动了 neural implicit surface reconstruction 从 NeRF density field 向 SDF-constrained volume rendering 转变。

> 💡 关键：VolSDF 的核心是把“任意密度场”变成“由 SDF 决定的密度场”。几何不再是渲染副产物，而是直接控制渲染概率的主变量。

#### 🧪 练习题

```yaml
question: "VolSDF 为什么要把 volume density 定义为 SDF 的 Laplace CDF 变换？"
options:
  - "为了完全取消体渲染"
  - "为了让密度受几何 SDF 约束，使表面附近贡献集中，并可从零水平集提取几何"
  - "为了只支持单视角输入"
  - "为了避免使用任何神经网络"
answer: 1
explain: "VolSDF 将 density 绑定到 SDF，使体渲染优化具有明确几何归纳偏置；最终表面取 SDF=0，而不是任意 density threshold。"
```
