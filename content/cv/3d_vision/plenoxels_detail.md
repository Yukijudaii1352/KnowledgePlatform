### Plenoxels

```yaml
id: plenoxels
name: Plenoxels
full_name: 稀疏体素辐射场 (Plenoxels)
year: '2022'
org: UC Berkeley
paper_url: https://arxiv.org/abs/2112.05131
category: nerf
parent: nerf
motivation: 稀疏体素+球谐函数，无需神经网络实现快速优化
```

#### 📝 一句话总结

Plenoxels 用可直接优化的稀疏体素网格存储密度和球谐颜色系数，去掉 NeRF 的 MLP 后仍用可微体渲染监督训练，从而将辐射场重建从“训练神经网络”转化为“优化显式体素参数”。

#### 🎯 核心要点

- 无神经网络辐射场：每个稀疏体素直接保存 density 与 spherical harmonics 系数
- 三线性插值：沿射线采样时从相邻体素插值得到连续空间中的密度和颜色系数
- 球谐视角相关颜色：用 SH 基函数表达随观察方向变化的外观，而不是通过 MLP 输入 view direction
- 可微体渲染优化：使用与 NeRF 类似的 alpha compositing 和图像重建 MSE 进行端到端优化
- 正则化与剪枝：使用 total variation 正则、稀疏化、coarse-to-fine 分辨率提升和空体素剪枝
- 速度优势：在标准新视角合成任务中以接近 NeRF 的质量实现约两个数量级更快的优化

#### 🔬 深入细节

![Plenoxels 稀疏体素辐射场流程](https://ar5iv.labs.arxiv.org/html/2112.05131/assets/x2.png)
*图：Plenoxels 总览。稀疏体素网格存储密度和球谐系数，射线采样时插值查询，再用可微体渲染和 TV 正则直接优化体素参数。*

```python
# Plenoxels 核心优化伪代码
grid = SparseVoxelGrid(resolution=initial_res)
grid.init_density_and_sh()

for stage in coarse_to_fine_schedule:
    grid.upsample_if_needed(stage.resolution)
    grid.prune_empty_voxels(threshold=stage.prune_threshold)

    for rays, target_rgb in dataloader:
        rgb_pred = []
        for ray in rays:
            samples = march_ray(ray, grid.bounds)
            colors, sigmas, deltas = [], [], []
            for x, d, delta in samples:
                sigma, sh_coeff = grid.trilinear_lookup(x)
                color = eval_spherical_harmonics(sh_coeff, d)
                colors.append(color); sigmas.append(sigma); deltas.append(delta)
            rgb_pred.append(volume_render(colors, sigmas, deltas))

        loss = mse(rgb_pred, target_rgb) + lambda_tv * total_variation(grid)
        loss.backward()
        optimizer.step(grid.parameters())
```

**动机与背景**

NeRF 证明了从多视角图像优化连续辐射场可以得到高质量新视角合成，但它把场景表示压进 MLP：每个采样点都要前向网络，训练和渲染都慢。Plenoxels 的问题意识很直接：如果目标只是表示一个已知场景，是否真的需要神经网络作为隐式函数？答案是否定的。用显式稀疏网格存参数，同样可以通过可微体渲染从图像监督中优化出来。

Plenoxel 是 plenoptic volume element 的缩写。每个体素不只是 occupancy，而是一个小的辐射场单元，包含密度 \(\sigma\) 和颜色的球谐系数 \(\mathbf{k}\)。对任意位置 \(x\)，通过三线性插值得到局部参数；对任意方向 \(d\)，通过球谐基函数恢复颜色：

$$
c(x,d)=\sum_{\ell=0}^{L}\sum_{m=-\ell}^{\ell} k_{\ell m}(x)Y_{\ell m}(d)
$$

**体渲染公式**

Plenoxels 保留 NeRF 的体渲染合成。沿射线 \(r(t)=o+td\) 采样后，离散颜色为：

$$
\hat{C}(r)=\sum_i T_i\left(1-\exp(-\sigma_i\Delta_i)\right)c_i
$$

$$
T_i=\exp\left(-\sum_{j<i}\sigma_j\Delta_j\right)
$$

这里 \(\sigma_i\) 与 \(c_i\) 来自体素插值和球谐求值，而不是 MLP。由于所有步骤可微，图像重建误差可以直接反传到体素密度和 SH 系数。

**正则化为什么重要**

显式网格的自由度很高，如果只用训练图像 MSE，容易在空域、遮挡边界和少视角区域产生噪声。Plenoxels 使用 total variation 正则鼓励相邻体素参数平滑：

$$
\mathcal{L}_{TV}=\sum_{v}\sum_{u\in\mathcal{N}(v)}\|\theta_v-\theta_u\|_1
$$

其中 \(\theta_v\) 表示体素的密度或颜色系数。TV 正则相当于把逆问题中的先验显式写出来：真实场景局部通常连续，孤立噪声体素应被抑制。

> 💡 关键：Plenoxels 的贡献不只是“用体素代替 MLP”，而是证明高质量辐射场可以由显式参数、可微渲染、正则化和优化器这四个经典逆问题组件组合出来。

**粗到细优化与剪枝**

为了在单 GPU 上处理高分辨率体素，Plenoxels 采用 coarse-to-fine 训练。先在低分辨率网格上学到粗几何和颜色，再逐步上采样到高分辨率。优化过程中会剪掉密度低或贡献小的体素，避免在空空间浪费显存和计算。这样既保持显式表示的速度，又控制了体素网格的内存膨胀。

**与 NeRF 的区别**

NeRF 的优势是连续函数表达紧凑、泛化性强；Plenoxels 的优势是场景特定优化速度快、参数查询简单、可解释性更强。NeRF 通过网络权重隐式存储几何和外观，Plenoxels 则把它们显式放在空间网格中。对于离线重建一个固定场景，显式网格可以更直接地利用 GPU 并显著缩短优化时间。

#### 🧪 练习题

```yaml
question: "Plenoxels 为什么不需要 MLP 也能表示视角相关颜色？"
options:
  - "它完全忽略观察方向"
  - "它在每个体素中存储球谐系数，并用观察方向的球谐基函数求颜色"
  - "它只渲染灰度图像"
  - "它把所有相机姿态固定为同一个方向"
answer: 1
explain: "Plenoxels 在体素中保存 SH 系数，颜色由系数与方向相关的球谐基函数组合得到，因此无需通过 MLP 输入 view direction。"
```
