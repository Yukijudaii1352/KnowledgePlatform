### NeRF（神经辐射场, Neural Radiance Fields）论文精读
```yaml
id: nerf
name: NeRF
full_name: 神经辐射场 (Neural Radiance Fields)
year: 2020
organization: UC Berkeley
paper_url: https://arxiv.org/abs/2003.08934
category: representation
parent: "—"
motivation: MLP+体渲染实现连续隐式表示
```

#### 📝 一句话总结
NeRF 把一个静态场景表示为连续函数 $F_\Theta:(\mathbf{x},\mathbf{d})\rightarrow(\sigma,\mathbf{c})$，再用可微体渲染从多视角照片中优化这个函数，从而用一个 MLP 学到几何密度与视角相关外观。

#### 🎯 核心要点
- **表示方式**：输入 3D 坐标 $\mathbf{x}$ 与观察方向 $\mathbf{d}$，输出体密度 $\sigma$ 和 RGB 颜色 $\mathbf{c}$；几何主要由 $\sigma(\mathbf{x})$ 承载，镜面/高光等视角效应由 $\mathbf{c}(\mathbf{x},\mathbf{d})$ 承载。
- **训练信号**：不需要 3D 标注，只需要已知相机位姿的 posed images；损失是渲染颜色与真实像素的 MSE。
- **关键技巧**：位置编码把低维坐标映射到高频 Fourier 特征，分层采样把样本集中到有贡献的深度区间。
- **局限**：逐射线采样加 MLP 查询非常慢；每个场景单独优化，不能直接一次前向泛化到新场景。

#### 🔬 深入细节
**核心示意图/框架图**

![NeRF rendering pipeline](https://ar5iv.labs.arxiv.org/html/2003.08934/assets/x2.png)

NeRF 的主线是“相机射线采样 -> MLP 查询密度和颜色 -> 体渲染积分 -> 像素级监督”。对一条射线 $\mathbf{r}(t)=\mathbf{o}+t\mathbf{d}$，连续体渲染写作：

$$
C(\mathbf{r})=\int_{t_n}^{t_f}T(t)\sigma(\mathbf{r}(t))\mathbf{c}(\mathbf{r}(t),\mathbf{d})dt,\quad
T(t)=\exp\left(-\int_{t_n}^{t}\sigma(\mathbf{r}(s))ds\right).
$$

离散实现中，把射线分成 $N$ 个样本，令 $\alpha_i=1-\exp(-\sigma_i\delta_i)$，权重为 $w_i=T_i\alpha_i$，最终颜色为 $\hat{C}(\mathbf{r})=\sum_i w_i\mathbf{c}_i$。这个公式让密度既影响遮挡也影响几何边界，梯度可以从像素误差反传到每个采样点。

**算法伪代码**

```python
for step in training_steps:
    rays, target_rgb = sample_camera_rays(images, poses)
    z_coarse = stratified_samples(rays, near, far, N_coarse)
    x = rays.o[:, None] + z_coarse[..., None] * rays.d[:, None]
    sigma, rgb = mlp(posenc(x), posenc(rays.d))
    rgb_coarse, weights = volume_render(sigma, rgb, z_coarse)

    z_fine = importance_samples(z_coarse, weights, N_fine)
    sigma_f, rgb_f = mlp(posenc(points(rays, z_fine)), posenc(rays.d))
    rgb_fine, _ = volume_render(sigma_f, rgb_f, z_fine)

    loss = mse(rgb_coarse, target_rgb) + mse(rgb_fine, target_rgb)
    loss.backward()
    optimizer.step()
```

位置编码是 NeRF 成功的必要条件之一。原始坐标直接输入 MLP 时，网络倾向先拟合低频函数，细纹理和锐边界会被平滑掉；NeRF 使用

$$
\gamma(p)=\left(\sin(2^0\pi p),\cos(2^0\pi p),\dots,\sin(2^{L-1}\pi p),\cos(2^{L-1}\pi p)\right)
$$

把坐标展开到多频空间，使小 MLP 也能表达高频变化。论文还把坐标和方向分开处理：密度只依赖位置，颜色在较深层再注入方向，这个归纳偏置避免几何随视角漂移。

分层采样解决的是计算预算问题。coarse 网络先在整条射线上粗采样，估计哪些深度段有较高权重；fine 网络再按权重分布重采样，让查询集中在物体表面附近。这个过程不是显式三角网格重建，而是在优化一个可微渲染器；因此 NeRF 很适合新视角合成，但提取可编辑几何还需要后处理。

#### 🧪 练习题
```yaml
questions:
  - type: concept
    prompt: "为什么 NeRF 的颜色分支需要观察方向 d，而密度分支通常不需要？"
    answer: "密度描述空间是否被占据，应当与视角无关；颜色包含镜面反射、高光等视角相关外观，因此需要 d。"
  - type: formula
    prompt: "写出离散体渲染中样本 i 的权重 w_i。"
    answer: "w_i = T_i (1 - exp(-sigma_i * delta_i))，其中 T_i 是前面样本的累积透射率。"
  - type: analysis
    prompt: "如果去掉位置编码，最常见的视觉后果是什么？"
    answer: "网络更偏向低频解，渲染会变模糊，细节、锐边和纹理难以恢复。"
```
