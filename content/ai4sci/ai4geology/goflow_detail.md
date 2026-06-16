### GOFLOW

```yaml
id: goflow
name: GOFLOW
full_name: 全球海洋流场模型 (GOFLOW)
year: '2026'
org: ETH Zurich
paper_url: https://www.eurekalert.org/news-releases/1041045
category: climate_ai
parent: —
motivation: 深度学习映射海洋表面电流碳循环
```

#### 📝 一句话总结

GOFLOW 将连续地球静止卫星红外热图像中的温度锋面形变转换为小时级海表流速图，用 U-Net 和速度-谱联合损失解决传统海面高度反演难以观测小于 10 km、小时级亚中尺度流场的问题。

#### 🎯 核心要点

- **从温度纹理反演海流**：输入不是海面高度，而是三个连续小时的 \(\log |\nabla T|\) 温度梯度图，利用热锋面被流场平流、拉伸和弯曲的轨迹推断速度
- **使用现有 GOES-East 卫星**：推理阶段使用 GOES-East ABI Band 14 红外亮温，约 2 km nadir resolution，不需要发射新仪器
- **LLC4320 模拟监督训练**：训练标签来自 MITgcm LLC4320 1/48°、约 2 km 全球高分辨率海洋模拟，提取北大西洋 20°N-45°N、5.3°×5.3° 子域
- **256×256 patch U-Net**：用全卷积 encoder-decoder 和 skip connections 学习 image-to-image velocity mapping，训练在小 patch，推理可直接作用于 >1000×1000 卫星图
- **目标速度低通滤波**：对 LLC4320 速度标签做 18 小时低通 Butterworth filter，去掉不由 SST 纹理强编码的半日潮等高频非平流运动
- **复合损失函数**：\(L_1\) 速度误差保证点位速度准确，log kinetic-energy spectral loss 保证亚中尺度动能谱和速度梯度结构
- **λ=0.2 权衡尺度**：论文扫描 \(\lambda\in[0.05,0.9]\)，选择 0.2 以提升小尺度谱结构且几乎不损失归一化速度误差
- **可反演速度梯度**：除 \(u,v\) 外，GOFLOW 可恢复涡度、应变和水平散度，尤其提供传统地转海面高度法难以给出的散度信息
- **观测验证**：与 AVISO、SWOT、drifter 和 shipboard ADCP 观测比较，GOFLOW 在 Gulf Stream 区域展现更细的边界层、涡旋和混合结构

#### 🔬 深入细节

##### 图示与可访问来源

![GOFLOW 与 AVISO 海表流场对比](https://www.uri.edu/news/wp-content/uploads/news/sites/16/2026/04/GOFLOW_comparison-1280x447.jpeg)
*图：同一区域中 GOFLOW 基于小时级 GOES 热图像得到的流速/涡度结构，与 10 天平均 AVISO 产品相比保留更多小尺度细节。图源为 URI 新闻页；论文页为 https://www.nature.com/articles/s41561-026-01943-0；代码页为 https://github.com/ksr-ocean/goflow。任务给出的 EurekaAlert URL 实际指向不相关的 Kobe University 新闻，因此这里按 Nature Geoscience 2026 论文和可访问新闻页解读。*

##### 背景：为什么海流观测有一个“小时级小尺度”空白

海表流场决定热量、碳、营养盐和漂浮物的输运。传统卫星海面高度 altimetry 可以通过地转平衡估计大尺度流速，但重访周期通常是数天到十天量级，而且对快速演化、空间尺度小于 10 km 的亚中尺度锋面、汇聚带和强剪切结构会被时间平均抹平。船载 ADCP、漂流浮标和岸基雷达能测到更快变化，但覆盖范围有限。

GOFLOW 的出发点是：海洋表面温度并不只是静态图像，连续红外图像里的热锋面会被底下的流场推动、拉伸、旋转和折叠。地球静止气象卫星已经以分钟到小时级频率拍摄大范围红外亮温；如果能从这些纹理的时空形变中反演速度，就可以弥补传统 altimetry 与现场观测之间的尺度缺口。

##### 输入表示：为什么用 \(\log |\nabla T|\)

GOFLOW 不直接把 SST 或 brightness temperature \(T\) 输入网络，而是计算温度梯度幅值并取对数：

$$
X_t = \log\left(|\nabla T_t|+\epsilon\right)
$$

三个连续小时的图像堆叠为：

$$
X = [X_{t-1}, X_t, X_{t+1}]
$$

这个表示有两个作用。第一，温度锋面是近海表流速的天然示踪线，\(|\nabla T|\) 比绝对温度更直接暴露拉伸、剪切和旋转造成的几何结构。第二，取对数会放大弱温度锋面，让稀疏高梯度图变成更稠密、更接近可训练分布的输入，减少网络只关注少数强边界的倾向。

##### 物理直觉：温度作为被平流的示踪量

若忽略短时间内的表面热通量和垂直混合，海表温度可近似满足二维平流方程：

$$
\frac{\partial T}{\partial t}+\mathbf{u}\cdot\nabla T \approx \kappa\nabla^2T + Q
$$

\(\mathbf{u}=(u,v)\) 是目标海表速度，\(\kappa\nabla^2T\) 表示扩散，\(Q\) 表示表面热通量、云和观测噪声等非平流项。经典光流方法会直接从 \(\partial_t T+\mathbf{u}\cdot\nabla T=0\) 求速度，但这个问题病态：一条温度等值线只能约束法向速度，沿等值线方向仍有孔径问题；云、夜昼加热和内部波也会破坏简单守恒假设。

GOFLOW 用监督学习绕过显式求解病态方程。LLC4320 模拟提供输入温度场和真实速度标签，U-Net 学习从局部温度纹理、多小时形变和多尺度上下文到 \((u,v)\) 的条件映射。它不是纯粹的光流，也不是海面高度地转反演，而是“热图像纹理 -> 速度场”的数据驱动物理反演。

##### 训练标签：为什么要过滤目标速度

论文强调，SST 纹理主要编码能平流温度锋面的流动；半日潮、部分内部波和更高频非平流信号虽然存在于速度场中，但不一定会在三个小时红外温度梯度里留下可辨识签名。把这些信号直接作为标签会变成 label noise。

因此 GOFLOW 对 LLC4320 目标速度做 18 小时低通 Butterworth filter：

$$
\mathbf{u}^{target}
=
\operatorname{LowPass}_{18h}(\mathbf{u}^{LLC4320})
$$

这个选择让网络更专注于可由温度锋面稳定约束的海表流结构，同时保留近惯性、Ekman 以及亚中尺度锋生相关运动。相对于“让网络拟合所有速度”，过滤目标是更保守的物理建模选择。

##### U-Net 架构与复合损失

GOFLOW 使用标准 U-Net：

$$
\hat{\mathbf{u}} = f_{\theta}(X), \qquad \hat{\mathbf{u}}\in\mathbb{R}^{2\times H\times W}
$$

encoder 逐级下采样以获得大尺度上下文，decoder 逐级上采样恢复像素级速度；skip connection 把高分辨率温度锋面位置直接传给解码端。由于 U-Net 全卷积，训练时使用 \(256\times256\) 子域，推理时可以在整个 GOES 图像上滑动或直接全图卷积，而不需要固定输入大小。

训练目标为速度点误差和动能谱误差的凸组合：

$$
\mathcal{L}=(1-\lambda)\mathcal{L}_{vel}+\lambda\mathcal{L}_{spec}
$$

速度项使用 \(L_1\)：

$$
\mathcal{L}_{vel}
=
\left\|
\hat{\mathbf{u}}-\mathbf{u}^{target}
\right\|_1
$$

谱项约束二维空间动能谱。设 \(\mathcal{E}(\mathbf{k};\mathbf{u})\) 是经过 Tukey window 后计算得到的二维 kinetic energy spectrum：

$$
\mathcal{L}_{spec}
=
\frac{1}{|\Omega_k|}
\sum_{\mathbf{k}\in\Omega_k}
\left[
\log\left(\mathcal{E}(\mathbf{k};\hat{\mathbf{u}})+\epsilon\right)
-
\log\left(\mathcal{E}(\mathbf{k};\mathbf{u}^{target})+\epsilon\right)
\right]^2
$$

如果只用 \(L_1\)，模型容易给出点位误差低但小尺度梯度偏平滑的流场。log spectral loss 防止大尺度能量支配训练，让亚中尺度动能谱也被显式约束；这也是 GOFLOW 能恢复涡度、应变和散度统计分布的关键。

##### 伪代码：GOFLOW 训练与推理

```python
# GOFLOW 核心流程：从三帧红外温度梯度反演海表速度
def make_input(temp_frames):
    # temp_frames: [T(t-1), T(t), T(t+1)]
    features = []
    for temp in temp_frames:
        grad_mag = sqrt(dx(temp) ** 2 + dy(temp) ** 2)
        features.append(log(grad_mag + eps))
    return stack(features, axis="channel")


def train_step(llc4320_batch):
    temp_frames, velocity_raw = llc4320_batch
    x = make_input(temp_frames)

    # 标签过滤：去掉不由SST纹理稳定编码的高频潮汐/内部波成分
    velocity_target = butterworth_lowpass(velocity_raw, cutoff_hours=18)
    velocity_pred = unet(x)

    loss_vel = l1(velocity_pred, velocity_target)
    loss_spec = mse(
        log(kinetic_energy_spectrum(velocity_pred) + eps),
        log(kinetic_energy_spectrum(velocity_target) + eps),
    )
    loss = (1 - lambda_) * loss_vel + lambda_ * loss_spec  # lambda_=0.2
    return loss


def infer_from_goes(goes_abi14_hourly):
    x = make_input(goes_abi14_hourly)
    velocity = unet(x)
    velocity = mask_cloud_contaminated_pixels(velocity, goes_abi14_hourly)
    vorticity = dv_dx(velocity.v) - du_dy(velocity.u)
    divergence = du_dx(velocity.u) + dv_dy(velocity.v)
    strain = compute_strain(velocity)
    return velocity, vorticity, divergence, strain
```

##### 为什么它能看到 AVISO 看不清的结构

AVISO/DUACS 这类产品主要依赖海面高度和地转平衡，适合大尺度平衡流，但会错过非地转成分、快速变化和水平散度。亚中尺度过程恰恰常表现为强涡度、强应变和汇聚/辐散；这些结构与垂直混合、碳下泵、营养盐上翻和海气交换有关。

GOFLOW 从小时级热图像出发，捕捉的是温度锋面的实际变形轨迹，因此更敏感于边界层和亚中尺度动力学。论文报告其在 held-out LLC4320 上能保留近两 decade wavenumber 范围内的动能、涡度、散度和应变谱，并在独立 Gulf Stream 观测中与 shipboard ADCP、drifter、SWOT 和 AVISO 作对比。

##### 局限性与适用边界

GOFLOW 当前模型主要训练于北大西洋 20°N-45°N 的一年 LLC4320 数据，卷积操作默认局部平面几何，直接推广到全球和高纬需要位置编码或球面/经纬度感知架构。它也依赖红外热图像，因此云会遮挡 SST 纹理；论文用云梯度输入和后处理 mask 做了初步处理，但持续云覆盖仍需要微波辐射计、altimetry 等额外观测补洞。

此外，GOFLOW 的“真值”来自高分辨率模拟，模拟本身的混合层、Gulf Stream 分离和亚中尺度参数化偏差可能被网络继承。因此它最适合作为高频海流观测产品和模型验证/同化候选，而不是无需校准的绝对真值。

#### 🧪 练习题

```yaml
question: "GOFLOW 的谱损失项主要解决什么问题？"
options:
  - "让模型只预测海面高度而不预测速度"
  - "防止点位速度误差较低但亚中尺度动能谱和速度梯度被过度平滑"
  - "把云层像素自动变成真实海表温度"
  - "把 U-Net 改成 Transformer"
answer: 1
explain: "单纯 L1 速度损失容易产生平滑速度场；log kinetic-energy spectral loss 约束不同波数上的能量分布，使涡度、应变和散度等小尺度动力结构更接近参考流场。"
```
