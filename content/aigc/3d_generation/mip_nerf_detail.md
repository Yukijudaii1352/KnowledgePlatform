### Mip-NeRF（抗锯齿神经辐射场, Mip-NeRF）论文精读
```yaml
id: mip_nerf
name: Mip-NeRF
full_name: 抗锯齿神经辐射场 (Mip-NeRF)
year: 2021
organization: Google Research
paper_url: https://arxiv.org/abs/2103.13415
category: representation
parent: nerf
motivation: 集成位置编码解决多尺度渲染
```

#### 📝 一句话总结
Mip-NeRF 把 NeRF 的“无面积光线”升级为“有像素足迹的圆锥/圆台”，用集成位置编码对一个空间区域而非单点编码，从源头缓解多尺度训练和渲染中的混叠问题。

#### 🎯 核心要点
- **问题定位**：原始 NeRF 每条射线被视为无限细的线，训练图像分辨率变化或远近尺度变化时，同一像素覆盖的 3D 区域不同，点采样容易产生 aliasing。
- **核心改动**：用 conical frustum 表示像素对应的 3D 体积段，并用高斯近似该体积段。
- **编码方式**：把位置编码 $\gamma(\mathbf{x})$ 的输入从确定点换成随机变量 $\mathbf{x}\sim\mathcal{N}(\boldsymbol{\mu},\boldsymbol{\Sigma})$，计算正弦/余弦的期望。
- **工程收益**：保留 NeRF 的体渲染框架，但减少 coarse/fine 双网络依赖，并在多尺度数据上明显更稳。

#### 🔬 深入细节
**核心示意图/框架图**

![Mip-NeRF cone tracing and integrated positional encoding](https://ar5iv.labs.arxiv.org/html/2103.13415/assets/x1.png)

Mip-NeRF 的关键观察是：一个像素不是一条数学射线，而是一个随深度扩张的圆锥。若仍只在圆锥中心线上采点，模型会被迫解释超过采样带宽的高频信号，训练视图和测试视图尺度不一致时就会出现闪烁、摩尔纹和模糊。

论文用多元高斯近似圆台区间，并对位置编码取期望。对一维高斯 $x\sim\mathcal{N}(\mu,\sigma^2)$，有：

$$
\mathbb{E}[\sin(\omega x)]=\exp\left(-\frac{1}{2}\omega^2\sigma^2\right)\sin(\omega\mu),
\quad
\mathbb{E}[\cos(\omega x)]=\exp\left(-\frac{1}{2}\omega^2\sigma^2\right)\cos(\omega\mu).
$$

这个衰减项很重要：当像素足迹很大、方差很大时，高频项自动被压低；当足迹很小、方差接近 0 时，IPE 退化为普通位置编码。

**算法伪代码**

```python
for rays in training_batches:
    # 每条像素射线带有 cone radius，采样得到一串圆台区间
    intervals = sample_conical_frustums(rays, near, far)
    gaussians = [approximate_frustum_as_gaussian(f) for f in intervals]

    encoded = [integrated_positional_encoding(mu, cov) for mu, cov in gaussians]
    sigma, rgb = nerf_mlp(encoded, viewdirs=rays.d)
    pred_rgb = volume_render(sigma, rgb, intervals.depths)

    loss = mse(pred_rgb, rays.target_rgb)
    update(loss)
```

从方法上看，Mip-NeRF 不是简单的采样数增加，而是改变了输入信号的数学对象：从 $\mathbf{x}$ 变为 $(\boldsymbol{\mu},\boldsymbol{\Sigma})$。这让网络看到的是“区域平均后的特征”，相当于内置了随尺度变化的低通滤波器。相比先渲染再做图像空间抗锯齿，Mip-NeRF 的滤波发生在辐射场查询之前，因此能减少错误几何和错误纹理被学进去。

另一个容易忽略的点是 Mip-NeRF 保持了 NeRF 的可微体渲染损失，因此可直接接入多视角重建流程。它的贡献主要在表示与采样层，而不是引入新的监督。后续 Zip-NeRF、Mip-NeRF 360 等工作继续沿着“区域编码 + 高效结构”的路线扩展大场景和无界场景。

#### 🧪 练习题
```yaml
questions:
  - type: concept
    prompt: "Mip-NeRF 为什么说像素对应圆锥而不是射线？"
    answer: "真实像素有面积，投影到 3D 后覆盖随深度扩大的区域；无限细射线忽略了这个足迹。"
  - type: formula
    prompt: "IPE 中高斯方差变大时，高频正弦项会怎样？"
    answer: "会被 exp(-0.5 * omega^2 * sigma^2) 衰减，方差越大、高频越弱。"
  - type: comparison
    prompt: "Mip-NeRF 相比增加 NeRF 采样点数的本质区别是什么？"
    answer: "它对像素覆盖区域做解析滤波，而不是只更密集地点采样中心线。"
```
