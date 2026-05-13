### Zip-NeRF

```yaml
id: zip_nerf
name: Zip-NeRF
full_name: "Zip-NeRF: Anti-Aliased Grid-Based Neural Radiance Fields"
year: "2023"
org: Google Research
paper_url: https://arxiv.org/abs/2304.06706
category: 3d_vision
parent: mip-NeRF 360 / Instant NGP
motivation: 结合 mip-NeRF 360 的抗锯齿与 Instant NGP 的网格加速技术，同时解决两者各自的缺陷
```

#### 📝 一句话总结

Zip-NeRF 提出了一套将 mip-NeRF 360 的抗锯齿能力与 Instant NGP 的哈希网格加速相结合的技术方案，通过多采样预滤波、特征降权和抗锯齿 interlevel loss 三大核心机制，在质量上超越 mip-NeRF 360（RMSE 降低 11%）的同时实现 24 倍训练加速。

#### 🎯 核心要点

- **问题定义**：mip-NeRF 360 质量好但训练极慢（48h）；Instant NGP 训练快（\~6min）但存在严重锯齿伪影，两者无法简单组合
- **多采样抗锯齿（Multisampling）**：用 6 个六边形排列的子采样点将各向异性锥体截锥近似为多个各向同性 3D 高斯，使其兼容 iNGP 的哈希网格查询
- **特征降权机制（Downweighting）**：通过 erf 函数构造权重因子 \(\omega\)，抑制超出采样分辨率的高频特征，防止"超分辨率"伪影
- **抗锯齿 Interlevel Loss**：将阶梯函数模糊为分段线性函数后再计算 proposal 监督损失，消除沿光线方向的 z-aliasing
- **幂变换距离归一化**：提出 \(\mathcal{P}(x, \lambda)\) 平滑插值线性/对数/逆距离变换，替代 mip-NeRF 360 的分段归一化
- **归一化权重衰减**：对哈希网格各层级施加 \(\sum_\ell \mathrm{mean}(V_\ell^2)\) 形式的正则化，粗尺度惩罚远大于细尺度
- **性能**：360 数据集 PSNR 28.54（vs mip-NeRF 360 的 27.57），训练 0.9h vs 21.7h；多尺度 360 数据集粗尺度误差降低 55%–77%

#### 🔬 深入细节

![Zip-NeRF 多采样抗锯齿示意图](https://ar5iv.labs.arxiv.org/html/2304.06706/assets/x3.png)
*图：Zip-NeRF 的多采样策略——将锥体截锥（conical frustum）分解为 6 个六边形排列的各向同性 3D 高斯，每个高斯可直接查询 iNGP 的哈希网格*

##### 算法伪代码

```python
# Zip-NeRF 单条光线渲染核心流程
def render_ray(ray_origin, ray_dir, pixel_radius):
    # 1. Proposal 采样（两轮，每轮 64 个样本）
    for round in [1, 2]:
        intervals = proposal_network.sample(ray)
    
    # 2. 对每个区间进行多采样
    for interval in final_intervals:  # 32 个最终采样区间
        mu, sigma = compute_gaussian(interval)  # 锥体截锥 → 高斯
        
        # 六边形 6 点多采样
        samples = hexagonal_pattern(mu_xy, pixel_radius)  # 6 个子点
        features = []
        for s in samples:
            mu_s = [s.x, s.y, mu.z]
            sigma_s = diag(sigma_xy/2, sigma_xy/2, sigma_z)  # 各向同性化
            
            # 查询 iNGP 哈希网格
            feat = hash_grid.query(mu_s, sigma_s)
            
            # 特征降权：抑制超分辨率特征
            omega = 0.5 * (1 - erf(sigma_s / sqrt(2)))
            feat = feat * omega
            features.append(feat)
        
        # 平均多采样特征
        avg_feat = mean(features)
        color, density = mlp(avg_feat)
    
    # 3. 体渲染合成像素颜色
    pixel_color = volume_rendering(colors, densities, intervals)
    
    # 4. 抗锯齿 interlevel loss
    blurred_weights = blur_stepfun(nerf_weights, pulse_width=r)
    loss_prop = antialiased_interlevel_loss(blurred_weights, proposal_weights)
    
    return pixel_color, loss_prop
```

##### 动机与背景

神经辐射场（NeRF）的两大主流方向存在根本矛盾：

1. **mip-NeRF 360** 通过对锥体截锥进行积分编码（IPE）实现了优秀的抗锯齿能力，但依赖大型 MLP，训练一个场景需要 48 小时；
2. **Instant NGP (iNGP)** 使用多分辨率哈希网格将训练加速到分钟级，但其点采样（point sampling）方式天然缺乏抗锯齿能力，在多尺度场景中产生严重伪影。

两者无法简单组合的根本原因在于：mip-NeRF 360 的 IPE 编码要求各向异性高斯输入，而 iNGP 的三线性插值只能处理各向同性查询。Zip-NeRF 的核心贡献就是设计了一套桥接方案。

##### 核心机制一：多采样预滤波（Multisampling Prefiltering）

> 💡 关键：将一个各向异性的锥体截锥分解为多个各向同性的 3D 高斯，使其兼容哈希网格的三线性插值。

mip-NeRF 将像素对应的光线建模为锥体，沿光线的每个采样区间是一个锥体截锥（conical frustum），其对应的 3D 高斯具有各向异性的协方差矩阵：

$$\Sigma = \begin{pmatrix} \sigma_{xy}^2 & 0 & 0 \\ 0 & \sigma_{xy}^2 & 0 \\ 0 & 0 & \sigma_z^2 \end{pmatrix}$$

其中 \(\sigma_{xy}\) 由像素宽度和距离决定，\(\sigma_z\) 由区间长度决定，两者通常差异很大。

Zip-NeRF 的解决方案是在垂直于光线的平面上放置 **6 个六边形排列的子采样点**，每个子点对应一个各向同性高斯 \(\mathcal{N}(\mu_j, \frac{\sigma_{xy}}{2} I)\)。这 6 个高斯的混合近似了原始各向异性高斯在 xy 平面上的分布。每个各向同性高斯可以直接通过 iNGP 的三线性插值查询，最终取平均得到该区间的特征。

六边形采样点的坐标为：

$$\mathbf{p}_j = \mu_{xy} + \sigma_{xy} \cdot \begin{pmatrix} \cos(2\pi j/6) \\ \sin(2\pi j/6) \end{pmatrix}, \quad j = 0, 1, \ldots, 5$$

> ⚠️ 注意：这里的 6 点六边形模式不是随意选择的——消融实验表明它优于随机采样和 Unscented Transform 等替代方案，且计算开销可控（6 次哈希查询 vs 单次）。

##### 核心机制二：特征降权（Feature Downweighting）

> 💡 关键：即使多采样解决了 xy 平面的抗锯齿，沿 z 轴仍然可能查询到超出采样分辨率的高频特征。降权机制通过软阈值抑制这些特征。

iNGP 的哈希网格包含从粗到细的多个分辨率层级。当采样高斯的标准差 \(\sigma\) 大于某个层级的体素尺寸时，该层级的特征属于"超分辨率"——它编码了比当前采样区间更精细的细节，使用这些特征会导致锯齿。

Zip-NeRF 为每个层级 \(\ell\) 计算降权因子：

$$\omega(\sigma, \ell) = \frac{1}{2}\left(1 - \mathrm{erf}\left(\frac{\sigma}{\sqrt{2} \cdot v_\ell}\right)\right)$$

其中 \(v_\ell\) 是第 \(\ell\) 层的体素尺寸。当 \(\sigma \gg v_\ell\)（高斯远大于体素）时，\(\omega \to 0\)，该层特征被完全抑制；当 \(\sigma \ll v_\ell\)（高斯远小于体素）时，\(\omega \to 1\)，特征完整保留。这个权重被逐元素乘到特征向量上，并作为额外输入拼接到 MLP 中。

##### 核心机制三：抗锯齿 Interlevel Loss

> 💡 关键：mip-NeRF 360 的 proposal 监督损失在光线方向上存在 z-aliasing——当场景内容在相邻采样区间之间移动时，阶梯函数权重会突变，导致梯度不连续。

传统 interlevel loss 直接比较 NeRF 输出的权重直方图 \((\mathbf{s}, \mathbf{w})\) 和 proposal 网络的权重直方图 \((\hat{\mathbf{s}}, \hat{\mathbf{w}})\)。问题在于：当场景表面恰好位于某个区间边界时，微小的位移会导致权重从一个 bin 跳到相邻 bin，产生不连续的梯度信号。

Zip-NeRF 的解决方案分三步：

1. **模糊阶梯函数**：将 NeRF 权重直方图与宽度为 \(r\) 的矩形脉冲卷积，得到分段线性的连续函数
2. **重采样**：将模糊后的分布重采样到 proposal 网络的区间端点上，得到 \(\mathbf{w}^{\hat{\mathbf{s}}}\)
3. **计算损失**：

$$\mathcal{L}_{\mathrm{prop}} = \sum_i \frac{1}{\hat{w}_i} \max(0, \cancel{\nabla}(w_i^{\hat{\mathbf{s}}}) - \hat{w}_i)^2$$

其中 \(\cancel{\nabla}\) 表示 stop-gradient。这是一个半二次卡方损失，模糊操作确保了损失对光线方向平移的平滑性。

##### 距离归一化与正则化

**幂变换**：Zip-NeRF 提出了新的距离归一化函数：

$$\mathcal{P}(x, \lambda) = \frac{|\lambda - 1|}{\lambda}\left(\left(\frac{x}{|\lambda - 1|} + 1\right)^\lambda - 1\right)$$

取 \(g(x) = \mathcal{P}(2x, -1.5)\)，在原点附近为线性（无需调节近平面），远处介于逆距离和逆平方距离之间。这替代了 mip-NeRF 360 的分段归一化，后者在抗锯齿 loss 下会导致灾难性失败。

**归一化权重衰减**：对哈希网格施加 \(\sum_\ell \mathrm{mean}(V_\ell^2)\)，而非简单的 \(\sum_\ell \sum_i V_{\ell,i}^2\)。由于粗层级参数远少于细层级，取 mean 后粗层级的惩罚强度相对更大，有效防止粗尺度过拟合。消融实验显示此技巧带来约 1 dB PSNR 提升。

##### 与传统方法的区别

| 特性 | mip-NeRF 360 | Instant NGP | Zip-NeRF |
|------|-------------|-------------|----------|
| 场景表示 | 大型 MLP | 多分辨率哈希网格 | 哈希网格 + 小 MLP |
| 抗锯齿 | IPE 编码（各向异性） | 无 | 多采样 + 降权 + 抗锯齿 loss |
| 训练时间 | ~48h | ~6min | ~54min |
| 360 PSNR | 27.57 | 25.68 | **28.54** |
| 多尺度能力 | 良好 | 差 | **最优** |

Zip-NeRF 的核心洞察是：**不需要让哈希网格本身支持各向异性查询，而是通过外部的多采样和降权机制在查询之前完成预滤波**，从而在不修改 iNGP 核心数据结构的前提下实现抗锯齿。

#### 🧪 练习题

```yaml
question: "Zip-NeRF 使用六边形多采样的主要目的是什么？"
options:
  - "增加训练数据量以防止过拟合"
  - "将各向异性锥体截锥分解为多个各向同性高斯，使其兼容哈希网格的三线性插值"
  - "提高哈希网格的分辨率以捕获更多细节"
  - "替代体渲染中的数值积分以加速推理"
answer: 1
explain: "iNGP 的三线性插值只能处理各向同性查询，而 mip-NeRF 的锥体截锥是各向异性的。六边形多采样将一个各向异性高斯近似为 6 个各向同性高斯的混合，从而桥接两种表示。"
```