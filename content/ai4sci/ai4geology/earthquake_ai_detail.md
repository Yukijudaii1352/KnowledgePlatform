### Earthquake AI

```yaml
id: earthquake_ai
name: Earthquake AI
full_name: 地震检测AI (Earthquake AI)
year: '2026'
org: JAMSTEC
paper_url: https://www.jamstec.go.jp/e/
category: geo_hazard
parent: recast
motivation: 震源检测误差缩至数公里5秒处理
```

#### 📝 一句话总结

JAMSTEC 的 Earthquake AI 可具体追溯到 HypoNet Nankai：它用物理信息神经网络学习南海海槽三维 P 波速度结构中的走时函数，把昂贵的三维走时计算变成快速神经网络推理，从而支持数秒级震源位置估计和复杂地下结构下的高精度定位。

#### 🎯 核心要点

- **更准确的算法名**：给定 `paper_url` 是 JAMSTEC 泛首页，按“震源检测误差缩至数公里、5 秒处理”这一元信息追溯，最匹配的公开成果是 JAMSTEC 的 HypoNet Nankai/PINN 震源定位工具
- **任务是 hypocenter determination 而非地震预测**：输入台站 P 波到时，估计震源经纬度、深度和发震时刻；它不能预测尚未发生的地震
- **PINN 走时代理模型**：神经网络学习源点到地表接收点的 P 波走时 \(T(\mathbf{x};\mathbf{s})\)，用 Eikonal 方程残差作为训练损失，避免预先生成海量标注走时表
- **真实三维速度结构**：训练使用南海海槽 3D P 波速度模型，水平范围约 900 km x 300 km、深度 60 km，包含海域主动源地震探测资料
- **抗谱偏置设计**：用 Fourier feature embedding 和重叠子域分解处理速度模型中的多尺度结构；论文报告模型集合约 36 个神经网络，总大小约 500 MB
- **MAP 震源反演**：定位阶段用 PINN 快速给出各台站理论到时，再用贝叶斯最大后验估计最小化观测到时残差，并用 Hessian/Laplace 近似给出不确定度
- **验证对象明确**：与 Fast Marching Method/FMM 走时计算和合成震源定位对比；随机震源走时 RMSD 约 0.1-0.21 s，合成定位结果与 FMM 一致
- **数秒级处理**：论文的合成震源定位实验在 JAMSTEC Earth Simulator 的 8 个 AMD EPYC 7742 CPU core 上约 2-6 秒完成，JAMSTEC 新闻稿和媒体报道将其概括为 PC/实时解析可用的数秒级工具
- **数据效率与可扩展性**：相对预计算走时表，PINN 模型更小，且新增 DONET、DAS、N-net 等观测点时不需要为每个新台站重新生成完整走时表

#### 🔬 深入细节

##### 图示与可访问来源

![HypoNet Nankai PINN 走时代理模型](https://ar5iv.labs.arxiv.org/html/2411.04667/assets/x1.png)
*图：HypoNet Nankai 论文 Figure 1，展示用三维速度结构模型训练 PINN 走时代理模型的框架。论文预印本见 https://arxiv.org/abs/2411.04667 ，同行评审版本见 DOI https://doi.org/10.1785/0220240377 ，JAMSTEC 发布页见 https://www.jamstec.go.jp/j/about/press_release/20250808/ ，代码仓库见 https://github.com/eagleray2020/HypoNet_Nankai_P 。*

![HypoNet Nankai 合成震源定位结果](https://ar5iv.labs.arxiv.org/html/2411.04667/assets/x5.png)
*图：论文 Figure 5，DONET/DAS 与 N-net 场景下的合成震源定位结果。该图用于说明 PINN 反演结果与传统 FMM 走时生成的真值在不确定度范围内一致。*

##### 来源定位与名称说明

任务 YAML 将算法命名为 “Earthquake AI”，但 `paper_url` 只给出 JAMSTEC 英文首页，无法直接定位论文。结合元信息中的“震源检测误差缩至数公里、5 秒处理”和 JAMSTEC 近年公开材料，最匹配的是 2025 年发布并公开的 HypoNet Nankai：一个面向南海海槽的 PINN 快速震源位置估计工具。

公开论文没有把系统正式命名为 “Earthquake AI”，也没有把所有场景统一表述为“误差缩至数公里”。更严谨的说法是：相对简化一维速度模型，HypoNet Nankai 把真实三维速度结构纳入数秒级定位流程；在合成实验中，PINN 定位与 FMM 基准在估计不确定度范围内一致，定位耗时约 2-6 秒。

##### 背景：震源定位为什么卡在三维走时上

震源定位的核心是反复比较“观测到时”和“理论到时”。给定一个候选震源 \(\mathbf{s}=(\lambda,\phi,z)\)、发震时刻 \(t_0\) 和第 \(i\) 个台站位置 \(\mathbf{r}_i\)，理论 P 波到时为：

$$
\hat{t}_i = t_0 + T(\mathbf{r}_i;\mathbf{s})
$$

其中 \(T(\mathbf{r}_i;\mathbf{s})\) 是 P 波从震源传播到台站的走时。如果地下速度结构近似为一维分层模型，\(T\) 计算很快，但在南海海槽这类俯冲带中，速度结构在水平方向和深度方向都强烈不均匀，简化模型会特别影响震源深度和板块边界附近位置判断。

传统三维方法可以用 ray tracing、fast marching 或有限差分求走时，但对一个大范围三维模型、多个候选震源和大量台站反复计算，成本很高。预计算走时表可以加速，但走时表会非常大，而且新增 DAS 光纤通道、N-net 台站或自定义接收点时，需要重新计算大量表格。

HypoNet Nankai 的关键替换是：先离线训练一个 PINN 代理模型，让它学会三维速度结构中的走时函数；在线定位时只做神经网络前向推理和优化。

##### PINN 走时模型：把 Eikonal 方程放进损失函数

地震走时满足 Eikonal 方程：

$$
\left\|\nabla_{\mathbf{x}}T(\mathbf{x};\mathbf{s})\right\|
=
\frac{1}{v(\mathbf{x})},
\qquad
T(\mathbf{s};\mathbf{s}) = 0
$$

这里 \(v(\mathbf{x})\) 是三维 P 波速度，\(\mathbf{s}\) 是源点，\(\mathbf{x}\) 是空间位置。PINN 用神经网络 \(T_\theta(\mathbf{x},\mathbf{s})\) 表示走时函数，并通过自动微分计算 \(\nabla_{\mathbf{x}}T_\theta\)。训练时不需要 FMM 生成的标注走时，而是最小化物理残差：

$$
\mathcal{L}_{\mathrm{eik}}(\theta)
=
\frac{1}{N}
\sum_{j=1}^{N}
\left(
\left\|\nabla_{\mathbf{x}}
T_\theta(\mathbf{x}_j,\mathbf{s}_j)
\right\|
-
\frac{1}{v(\mathbf{x}_j)}
\right)^2
$$

为处理点源奇异性，论文采用 factored form，把几何距离导致的近源奇异项拆出，让网络学习更平滑的修正项：

$$
T_\theta(\mathbf{x},\mathbf{s})
=
T_0(\mathbf{x},\mathbf{s})\ \tau_\theta(\mathbf{x},\mathbf{s})
$$

其中 \(T_0\) 是基于源点附近速度的近似直达走时，\(\tau_\theta\) 学习复杂三维速度结构带来的修正。论文还加入互易性约束：

$$
T_\theta(\mathbf{x},\mathbf{s})
\approx
T_\theta(\mathbf{s},\mathbf{x})
$$

这对地震走时成立，并能降低训练难度。

##### Fourier features 与子域分解

南海海槽模型大而细：水平范围约 900 km x 300 km，深度 60 km；部分浅层速度突变来自海洋主动源地震探测资料。普通 MLP/PINN 容易有 spectral bias，即先学低频平滑结构，难以拟合浅部和局部高频速度变化。

HypoNet Nankai 用两类工程手段缓解这个问题：

$$
\gamma(\mathbf{x}) =
\left[
\sin(2\pi B\mathbf{x}),\
\cos(2\pi B\mathbf{x})
\right]
$$

Fourier feature embedding 让 MLP 更容易表达多尺度空间变化。与此同时，论文把全域模型和多个重叠子域模型结合起来。全域网络保证任意源点/接收点都可推理，子域网络在局部范围内更准确地表达小尺度速度结构。公开论文讨论中给出，神经网络集合大小约 500 MB；相比 Domain 1 实验中单个 FMM 走时表约 80 GB，数据体量显著更小。

##### MAP 震源反演

在线定位阶段不再求解 Eikonal 方程，而是把 PINN 当作快速函数调用。设观测 P 波到时为 \(t_i^{obs}\)，台站为 \(\mathbf{r}_i\)，震源参数为 \(\mathbf{m}=(\lambda,\phi,z,t_0)\)，残差为：

$$
e_i(\mathbf{m})
=
t_i^{obs}
-
t_0
-
T_\theta(\mathbf{r}_i;\lambda,\phi,z)
$$

最大后验估计等价于最小化负对数后验：

$$
\mathcal{J}(\mathbf{m})
=
\sum_{i=1}^{M}
\frac{e_i(\mathbf{m})^2}{2\sigma_i^2}
-
\log p(\lambda,\phi,z)
-
\log p(t_0)
$$

其中 \(\sigma_i\) 表示到时拾取和模型误差，先验 \(p\) 可以限制搜索范围或加入深度约束。最优解为：

$$
\hat{\mathbf{m}}=
\arg\min_{\mathbf{m}}\mathcal{J}(\mathbf{m})
$$

PINN 用 PyTorch 表示，走时对震源参数的导数也可以自动微分得到。论文使用 Hessian 进行 Laplace 近似，协方差可写成：

$$
\Sigma \approx
\left[
\nabla_{\mathbf{m}}^2\mathcal{J}(\hat{\mathbf{m}})
\right]^{-1}
$$

这样输出不仅是一个点估计，还能给出横向和深度方向的不确定度。对防灾和地震研究都很重要，因为“震源是否在板块边界断层上”常常比单一经纬度数值更关键。

##### 算法伪代码

```python
# HypoNet Nankai 核心流程：离线 PINN 训练 + 在线 MAP 震源定位
def train_pinn_velocity_model(velocity_model):
    # velocity_model: Nankai 3D P-wave velocity v(x)
    nets = [global_network()]
    nets += make_overlapping_subdomain_networks(domain_shape=(900, 300, 60))

    for net in nets:
        for batch in sample_collocation_and_source_points(velocity_model):
            x, s = batch.points, batch.sources
            x_emb = fourier_features(x)
            s_emb = fourier_features(s)

            T = factored_travel_time(net, x_emb, s_emb, x, s)
            grad_T = autograd_gradient(T, x)

            eikonal = (norm(grad_T) - 1.0 / velocity_model(x)) ** 2
            reciprocity = (T - factored_travel_time(net, s_emb, x_emb, s, x)) ** 2
            loss = mean(eikonal) + lambda_rec * mean(reciprocity)

            loss.backward()
            optimizer.step()

    save_compact_network_ensemble(nets)


def locate_hypocenter(p_arrival_times, station_locations, pinn_ensemble):
    # m = longitude, latitude, depth, origin_time
    m = initialize_from_simple_1d_locator(p_arrival_times, station_locations)

    def objective(m):
        lon, lat, depth, origin_time = m
        residuals = []
        for t_obs, station in zip(p_arrival_times, station_locations):
            T_pred = pinn_ensemble.travel_time(receiver=station, source=(lon, lat, depth))
            residuals.append(t_obs - origin_time - T_pred)
        return weighted_square_sum(residuals) - log_prior(m)

    m_hat = optimize_map(objective, m)
    covariance = inverse_hessian(objective, m_hat)
    return m_hat, covariance
```

##### 与传统 FMM/走时表方法的差异

FMM 的优势是物理数值解明确，给定网格和速度模型后可作为可靠基准；缺点是每次新增源点/接收点组合或扩展观测网络时，计算和存储都很重。走时表把计算提前，但会把成本转化为巨大文件，并且对任意新台站不够灵活。

HypoNet Nankai 的优势不一定是单次推理永远比“已加载的理想走时表”更快，而是它把复杂三维速度模型压缩成可分发的神经网络函数。新增观测点时，只要位置位于训练域内，网络可以直接推理走时；这对海底观测网、DAS 光纤和未来 N-net 扩展尤其有价值。

限制也很清楚。当前公开版本主要针对 P 波走时；S 波速度模型和 S 到时加入后，深度约束会更强。PINN 的准确性仍受速度模型质量、训练域、台站几何和到时拾取误差影响。对于真实业务预警，还需要与自动拾取、质量控制、误差建模和人工审核流程集成。

> 💡 关键：这类 Earthquake AI 的本质不是“预测地震”，而是把三维地球物理正问题变成可微、快速、紧凑的代理模型，再嵌入传统震源反演流程。

#### 🧪 练习题

```yaml
question: "HypoNet Nankai 为什么使用 PINN 来计算 P 波走时？"
options:
  - "为了用文本生成模型直接预测未来地震"
  - "为了把 Eikonal 方程约束写入训练损失，在不生成海量标注走时表的情况下学习三维速度结构中的走时函数"
  - "为了完全取消台站 P 波到时数据"
  - "为了只使用一维分层速度模型，避免三维地下结构"
answer: 1
explain: "PINN 通过 Eikonal 方程残差和自动微分训练走时代理模型，在线定位时用神经网络快速给出理论到时，再进行 MAP 震源反演。"
```
