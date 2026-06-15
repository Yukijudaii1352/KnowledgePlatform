### NeuS

```yaml
id: neus
name: NeuS
full_name: 神经隐式表面 (NeuS)
year: '2021'
org: Zhejiang Univ
paper_url: https://arxiv.org/abs/2106.10689
category: reconstruction
parent: deepsdf
motivation: 无偏体渲染+SDF实现高精度表面提取
```

#### 📝 一句话总结

NeuS 用神经 SDF 的零水平集表示表面，并提出一阶无偏的 SDF 体渲染权重，把 NeRF 的鲁棒优化和 SDF 的精确表面约束结合起来，实现无需前景 mask 也能高质量多视角表面重建。

#### 🎯 核心要点

- **SDF 几何表示**：用 \(f_\theta(\mathbf{x})\) 表示 signed distance，表面为 \(f_\theta(\mathbf{x})=0\)
- **颜色网络**：用 \(c_\phi(\mathbf{x},\mathbf{v},\mathbf{n},\mathbf{z})\) 建模视角相关颜色
- **SDF 诱导密度/权重**：从 SDF 的 sigmoid 分布构造体渲染 opacity，避免普通 density field 表面阈值任意的问题
- **一阶无偏权重**：设计让光线与零水平集交点附近贡献最大，减小 naive SDF-density 体渲染的几何偏差
- **遮挡感知**：前方表面获得更大权重，处理多表面穿越和自遮挡
- **Eikonal 正则**：约束 \(\|\nabla f_\theta(\mathbf{x})\|_2\approx 1\)，保持 SDF 的距离函数性质
- **多视角 RGB 监督**：通过可微体渲染最小化渲染图像与输入图像差异，并用 Marching Cubes 提取零水平集网格

#### 🔬 深入细节

##### 核心示意图

![NeuS 无偏权重示意](https://ar5iv.labs.arxiv.org/html/2106.10689/assets/x2.png)
*图：NeuS 论文 Figure 2，对比 naive SDF-density 体渲染的权重偏差与 NeuS 的无偏权重函数。NeuS 希望最大权重落在 SDF 零水平集与相机光线的交点处。*

##### 算法伪代码

```python
# NeuS 训练伪代码
def train_neus(images, cameras, sdf_net, color_net):
    for step in range(num_steps):
        rays = sample_rays(images, cameras)
        pts, deltas = sample_points_on_rays(rays)

        sdf = sdf_net(pts)                         # f(x)
        gradients = grad(sdf, pts)                 # normal = ∇f(x)
        colors = color_net(pts, rays.dirs, gradients)

        # NeuS 根据相邻采样点 SDF 的 sigmoid CDF 构造 alpha
        cdf = sigmoid(inv_s * sdf)
        alpha = neus_alpha_from_adjacent_cdf(cdf)
        weights = alpha * cumulative_transmittance(alpha)
        rgb = sum(weights * colors, dim="samples")

        photo_loss = l1(rgb, rays.target_rgb)
        eikonal_loss = ((norm(gradients) - 1.0) ** 2).mean()
        loss = photo_loss + lambda_eik * eikonal_loss
        update_networks(loss)

    mesh = marching_cubes(lambda x: sdf_net(x), level=0.0)
    return mesh
```

##### 动机与背景

NeRF 的 volume density 很适合优化新视角合成，但它不是严格几何表面。渲染质量高不等于能从任意 density threshold 提取出干净 mesh。IDR/DVR 等神经隐式表面方法直接用 SDF 或 occupancy 做 surface rendering，表面清晰，但梯度只来自射线与表面的局部交点，优化更容易陷入局部最小值，并常依赖前景 mask。

NeuS 的目标是兼得二者优势：几何上用 SDF 的零水平集表示精确表面，优化上用 volume rendering 让一条光线上的多个采样点都能获得梯度。问题是，直接把 SDF 转成密度再套 NeRF 公式会产生系统性偏差：最大渲染权重不一定落在真实零水平集处，重建表面会沿光线方向偏移。

##### SDF 与颜色场

NeuS 用两个网络表示场景：

$$
f_\theta:\mathbb{R}^3\rightarrow \mathbb{R}
$$

$$
c_\phi:\mathbb{R}^3\times \mathbb{S}^2\times \mathbb{R}^3\times \mathbb{R}^m
\rightarrow \mathbb{R}^3
$$

其中 \(f_\theta(\mathbf{x})\) 是 SDF，\(\nabla f_\theta(\mathbf{x})\) 可作为法向；颜色网络接收点位置、视角方向、法向和几何特征，用于建模材质和视角相关外观。

##### 无偏体渲染权重

NeuS 用 sigmoid CDF \(\Phi_s(f)=(1+e^{-sf})^{-1}\) 描述 SDF 到概率的转换，其中 \(s\) 控制表面附近分布的尖锐程度。对相邻采样点 \(\mathbf{x}_i,\mathbf{x}_{i+1}\)，离散 opacity 可写成类似：

$$
\alpha_i=
\max\left(
\frac{\Phi_s(f(\mathbf{x}_i))-\Phi_s(f(\mathbf{x}_{i+1}))}
{\Phi_s(f(\mathbf{x}_i))},0
\right)
$$

随后仍按前向 alpha compositing 得到权重：

$$
w_i=\alpha_i\prod_{j<i}(1-\alpha_j)
$$

直觉上，当光线从物体外部进入内部时，SDF 从正变负，\(\Phi_s(f)\) 会快速下降；这个下降量对应光线在该区间命中表面的概率。NeuS 的推导保证在 SDF 一阶近似下，权重峰值位于零水平集附近，从而减少表面偏移。

##### 训练损失与表面提取

NeuS 的 RGB 重建损失来自体渲染颜色：

$$
\hat{C}(\mathbf{r})=\sum_i w_i c_i
$$

$$
\mathcal{L}_{\text{color}}=\sum_{\mathbf{r}}\|\hat{C}(\mathbf{r})-C(\mathbf{r})\|_1
$$

同时加入 Eikonal 正则：

$$
\mathcal{L}_{\text{eik}}=
\mathbb{E}_{\mathbf{x}}\left(\|\nabla f_\theta(\mathbf{x})\|_2-1\right)^2
$$

Eikonal 项保证 \(f_\theta\) 更像真实距离函数，而不仅是任意符号场。训练完成后，用 Marching Cubes 在 \(f_\theta(\mathbf{x})=0\) 上提取 mesh。

##### 与 NeRF、IDR 的区别

相对 NeRF，NeuS 的几何由 SDF 直接约束，表面阈值固定为零水平集，不需要在 density field 中猜阈值。相对 IDR/DVR，NeuS 使用体渲染获得更稳定的多点梯度传播，对自遮挡、薄结构和复杂拓扑更鲁棒，并且可以在没有前景 mask 的设置下工作。

> 💡 关键：NeuS 不是简单的“SDF + NeRF”。真正关键是重新设计 SDF 到 alpha 权重的映射，让体渲染优化不会把表面系统性推离零水平集。

#### 🧪 练习题

```yaml
question: "NeuS 中一阶无偏权重设计主要解决什么问题？"
options:
  - "减少网络参数量"
  - "避免 naive SDF-density 体渲染导致最大权重偏离真实零水平集"
  - "让模型完全不需要相机位姿"
  - "把 SDF 改成离散体素"
answer: 1
explain: "NeuS 观察到直接用 SDF 构造密度会产生几何偏差，因此通过相邻 SDF 的 sigmoid CDF 构造 opacity，使权重峰值在一阶近似下对齐表面。"
```
