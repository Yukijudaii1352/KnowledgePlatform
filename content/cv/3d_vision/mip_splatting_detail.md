### Mip-Splatting

```yaml
id: mip_splatting
name: Mip-Splatting
full_name: 抗锯齿高斯泼溅 (Mip-Splatting)
year: '2024'
org: Tsinghua
paper_url: https://arxiv.org/abs/2311.16493
category: gaussian_splatting
parent: 3dgs
motivation: 3D平滑滤波器解决缩放时的走样问题
```

#### 📝 一句话总结

Mip-Splatting 从采样定理分析 3DGS 的多尺度走样问题，提出 3D smoothing filter 约束高斯最高频率，并用 2D Mip filter 替代固定 dilation，使 Gaussian Splatting 在放大和缩小时都更接近无锯齿渲染。

#### 🎯 核心要点

- 问题诊断：原始 3DGS 缺少 3D 频率约束，且屏幕空间 dilation 会引入尺度模糊
- 3D smoothing filter：根据训练视图诱导的最大采样率限制高斯最小尺度，减少放大时的高频伪影
- 2D Mip filter：用近似像素盒式滤波的 2D 高斯滤波替代 dilation，缓解缩小时的 aliasing 和亮度膨胀
- 归一化因子：对滤波后的 2D 高斯贡献做能量校正，使远小于像素的高斯不会贡献过多不透明度
- 即插即用：保持 3DGS 的优化损失、密度控制和显式高斯框架，只修改滤波与投影处理
- 多尺度评估：在单尺度训练、多尺度测试和改变焦距/距离的场景中显著优于原始 3DGS 与 EWA 变体

#### 🔬 深入细节

![Mip-Splatting 走样问题](https://ar5iv.labs.arxiv.org/html/2311.16493/assets/x1.png)
*图：原始 3DGS 的 dilation 和缺少 3D 频率约束会在改变采样率时产生膨胀、侵蚀和高频伪影。*

![Mip-Splatting 采样率约束](https://ar5iv.labs.arxiv.org/html/2311.16493/assets/x2.png)
*图：3D smoothing filter 使用训练视图中的最大采样率约束高斯基元，避免学习超出观测采样能力的高频结构。*

```python
# Mip-Splatting 核心伪代码
for iteration in range(num_iters):
    if iteration % update_interval == 0:
        for g in gaussians:
            # 训练视图中该高斯被观察到的最大采样率
            g.nu_hat = max(camera.focal / distance(camera, g.mu)
                           for camera in training_cameras)

    rendered = []
    for g in gaussians:
        # 1. 3D smoothing: 限制三维高频
        Sigma3d = g.covariance + (s3d / g.nu_hat) * eye(3)

        # 2. 投影为 2D Gaussian
        mean2d, Sigma2d = project_gaussian(g.mu, Sigma3d, camera)

        # 3. 2D Mip filter: 近似像素盒式滤波并做能量校正
        Sigma_mip = Sigma2d + s2d * eye(2)
        amp = sqrt(det(Sigma2d) / det(Sigma_mip))
        splat = amp * gaussian_2d(pixel_grid, mean2d, Sigma_mip)
        rendered.append(alpha_blend(g.color, g.opacity, splat))

    loss = reconstruction_loss(rendered, target)
    loss.backward()
    optimizer.step()
```

**动机与背景**

3DGS 在训练和测试分辨率接近时表现很好，但当焦距、相机距离或渲染分辨率变化时会出现强伪影。论文指出根因有两个：一是 3D 高斯可以在训练视图不可分辨的尺度上收缩，学到超过采样上限的高频信号；二是原始 3DGS 为了稳定优化，在 2D 协方差上添加固定 dilation，使极小高斯在屏幕上仍覆盖像素并贡献不透明度。

固定 dilation 的渲染形式可理解为：

$$
\Sigma^{2D}_{\text{dilated}}=\Sigma^{2D}+\epsilon I
$$

这会造成尺度模糊：一个真实很小但被 dilation 放大的高斯，与一个本来就较大的高斯在训练分辨率下可能渲染相似；当视角缩放变化时，二者行为不同，于是产生 erosion、过亮或锯齿。

**3D smoothing filter**

Mip-Splatting 根据训练视图估计每个高斯能被可靠观测到的最大采样率：

$$
\hat{\nu}_k=\max_n \frac{f_n}{d_{n,k}}
$$

其中 \(f_n\) 是第 \(n\) 个相机焦距，\(d_{n,k}\) 是相机到第 \(k\) 个高斯的距离。采样率越高，允许的高斯越小；采样率越低，必须施加更强平滑。实际做法是在 3D 协方差上加一个各向同性平滑项：

$$
\Sigma^{3D}_{k,\text{smooth}}=\Sigma^{3D}_{k}+\frac{s}{\hat{\nu}_k}I
$$

这相当于对三维场景做低通滤波，使模型不再把训练图像无法支持的细节编码成退化的小高斯。

**2D Mip filter**

真实像素值是连续图像在一个像素面积上的积分，即盒式滤波。Mip-Splatting 用 2D Gaussian 近似该像素盒式滤波：

$$
G_{\text{mip}}(x)=
\sqrt{\frac{|\Sigma^{2D}|}{|\Sigma^{2D}+sI|}}
\exp\left(-\frac{1}{2}(x-\mu)^T(\Sigma^{2D}+sI)^{-1}(x-\mu)\right)
$$

归一化因子非常关键。当投影高斯远小于一个像素时，\(|\Sigma^{2D}|\to 0\)，该因子趋近 0，高斯贡献被正确衰减；而 dilation 会让它仍像一个完整 splat 一样贡献能量。

> 💡 关键：3D smoothing 主要解决 zoom-in 时暴露出的三维高频伪影；2D Mip filter 主要解决 zoom-out 时屏幕采样不足造成的 aliasing 和亮度错误。

**与 EWA/原始 3DGS 的区别**

EWA splatting 也会在屏幕空间做滤波，但其滤波范围更偏经验性，容易过度模糊。Mip filter 的目标是近似单像素盒式滤波，并通过归一化处理小高斯能量，因此在清晰度和抗锯齿之间更平衡。相比原始 3DGS，Mip-Splatting 没有改变高斯表示本身，而是让训练和渲染遵守采样率约束。

**训练与推理流程**

训练时周期性更新每个高斯的 \(\hat{\nu}_k\)，随后在投影前使用 3D smoothing；渲染时使用 2D Mip filter 替代 dilation。损失仍采用 3DGS 的图像重建损失，密度控制策略也基本保持。因此它可以视为 3DGS 的抗锯齿补丁，而不是新的场景表示范式。

#### 🧪 练习题

```yaml
question: "Mip-Splatting 中 2D Mip filter 的归一化因子主要解决什么问题？"
options:
  - "让所有高斯拥有相同颜色"
  - "当投影高斯远小于像素时正确衰减其贡献，避免 dilation 带来的亮度膨胀"
  - "完全跳过高斯深度排序"
  - "把 3D 高斯改成三角网格"
answer: 1
explain: "归一化因子随 |Σ²ᴰ| 变小而趋近 0，使小于像素的高斯不会像 dilation 那样贡献过多不透明度。"
```
