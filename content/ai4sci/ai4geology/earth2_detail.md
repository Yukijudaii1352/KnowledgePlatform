### Earth-2

```yaml
id: earth2
name: Earth-2
full_name: NVIDIA地球2号 (Earth-2)
year: '2024'
org: NVIDIA
paper_url: https://nvidianews.nvidia.com/news/nvidia-earth-2-weather-forecasting-ai
category: earth_fm
parent: aurora
motivation: cBottle生成式公里级数字孪生
```

#### 📝 一句话总结

Earth-2 是 NVIDIA 面向天气与气候数字孪生的开放模型与工具栈；其中与本条目最相关的 cBottle 用级联扩散模型在 HEALPix 球面网格上生成全球公里级气候场，解决传统公里级气候模拟数据体量巨大、交互延迟高、难以做条件情景探索的问题。

#### 🎯 核心要点

- **平台而非单一论文模型**：给定链接是 NVIDIA Earth-2 新闻/产品页，方法级解读主要追溯到官方 Earth-2 页面和 cBottle 预印本
- **cBottle 两阶段级联生成**：先由全局粗分辨率扩散模型生成约 100 km、约 5 万像素的气候场，再由局地超分辨率扩散模型放大 16 倍到约 5-6 km、约 1250 万像素
- **条件生成接口**：粗生成阶段以时刻、年内日期、月平均海表温度等气候控制量为条件，支持用户构造 what-if 气候情景
- **HEALPix 球面表示**：在等面积、层级化的 HEALPix 网格上建模全球场，避免经纬度网格高纬面积畸变对生成训练的影响
- **overlapping patch multi-diffusion**：高分辨率超分辨率阶段用重叠局地 patch 去噪并融合，避免直接在 1250 万像素全球场上运行单个巨大扩散网络
- **多模态训练**：跨 ERA5 再分析与 ICON 公里级模拟学习，可用于气候仿真、下采样/超分辨、偏差校正、通道补全
- **数据压缩与交互**：论文报告将公里级气候数据封装到少量模型权重中，支持低延迟按需生成，而不是从 PB 级归档中读取
- **来源限制**：Earth-2 家族还包含 CorrDiff、FourCastNet3、Atlas、HealDA、Nowcasting 等模型；本文聚焦 YAML motivation 指向的 cBottle，而非覆盖整个 Earth-2 产品线

#### 🔬 深入细节

##### 图示与可访问来源

![cBottle 级联扩散架构](https://arxiv.org/html/2505.06474v1/x1.png)
*图：cBottle 的粗分辨率全局生成模型与 16x 超分辨率模型。原始 Earth-2 链接是新闻/产品入口；方法细节来自 cBottle 预印本 https://arxiv.org/abs/2505.06474、HTML 图像页 https://arxiv.org/html/2505.06474v1、代码页 https://github.com/NVlabs/cBottle 以及 NVIDIA Earth-2 官方页面 https://www.nvidia.com/en-us/high-performance-computing/earth-2/。*

##### 为什么 Earth-2 需要生成式气候模型

公里级全球气候模拟可以显式表现云组织、极端降水、热带气旋结构和城市尺度风险，但它的直接输出通常是 PB 级数据。传统使用方式是先运行昂贵的物理模拟，再把海量结果写入存储，用户分析时再读取和重采样。这对“交互式数字孪生”很不友好：用户不能快速改变海表温度、日期或局部情景，也难以低成本抽样多个可能未来。

cBottle 的选择是把气候数据集学习成一个条件分布，而不是学习一个自回归时间积分器。对某个条件 \(c\)（如时间、季节、SST），扩散模型直接采样可能的全球气候状态 \(x\sim p_{\theta}(x\mid c)\)。这避开了长时间自回归模型常见的漂移问题，也更适合“给我某类气候状态的多个可能样本”这类数字孪生交互。

##### HEALPix 网格：把地球当球面而不是平面图像

cBottle 在 HEALPix 网格上组织全球数据。HEALPix 将球面划分为 12 个面，每个面有 \(2^l\times 2^l\) 个像素，常写作：

$$
N_{\text{side}}=2^l,\qquad
N_{\text{pixel}}=12N_{\text{side}}^2
$$

论文使用 HPX64 表示约 100 km 的粗分辨率全球场，使用 HPX1024 表示约 5-6 km 的高分辨率全球场。等面积像素让扩散损失不会被高纬度密集经纬格点过度支配；层级结构也天然适合从粗网格级联到细网格。

##### 级联扩散：先学大尺度气候，再补公里级纹理

cBottle 的核心分解是：

$$
p(x_{\text{hi}}\mid c)
\approx
p_{\theta_{\text{sr}}}(x_{\text{hi}}\mid x_{\text{lo}},c)\,
p_{\theta_{\text{coarse}}}(x_{\text{lo}}\mid c)
$$

其中 \(x_{\text{lo}}\) 是 100 km 级全球场，\(x_{\text{hi}}\) 是公里级全球场。粗模型负责生成行星尺度环流、季节循环、海陆温度结构等低频信息；超分辨模型负责把低分辨率场细化为云组织、降水纹理、辐射场等高频结构。这个分解比直接在 1250 万像素场上建模更可训练，也便于单独使用超分辨模块做下采样/偏差校正任务。

一个简化的扩散训练目标可以写成：

$$
\mathcal{L}_{\text{diff}}(\theta)=
\mathbb{E}_{x,c,\sigma,\epsilon}
\left[
\lambda(\sigma)
\left\|
M_{\text{out}}\odot
\left(D_{\theta}(x+\sigma\epsilon,c,\sigma)-x\right)
\right\|_2^2
\right]
$$

这里 \(D_{\theta}\) 是去噪网络，\(\sigma\) 是噪声尺度，\(\epsilon\sim\mathcal{N}(0,I)\)，\(M_{\text{out}}\) 是被要求预测的变量/空间掩码。掩码使同一个模型能处理多模态数据：有的通道作为条件输入，有的通道作为生成目标，有的通道缺失时不参与损失。

##### Multi-diffusion：把局地高分辨率 patch 合成全球场

高分辨率 HPX1024 全球场太大，超分辨阶段不能简单把完整全球图像一次送入 U-Net。cBottle 使用重叠 patch 的 multi-diffusion：局地 denoiser \(\Phi_\theta\) 在每个空间裁片上去噪，再把裁片结果投回全球网格并平均融合。论文中的全局 denoiser 可概括为：

$$
\mathcal{D}_{\theta}(\mathbf{x}_{t})=
\frac{
\sum_i \mathcal{G}_i^{-1}
\left(
\Phi_{\theta}\left(\mathcal{G}_i(\mathbf{x}_{t})\mid \mathcal{G}_i(y),\sigma\right)
\right)
}{
\sum_i \mathcal{G}_i^{-1}(J_N)
}
$$

\(\mathcal{G}_i\) 表示取第 \(i\) 个重叠局地 patch，\(\mathcal{G}_i^{-1}\) 表示把 patch 放回全球位置，\(J_N\) 是全 1 patch，用于统计每个像素被覆盖的次数。直觉上，模型只需学会局地公里级纹理生成；全球一致性由粗模型条件、重叠融合和球面 padding 共同约束。

##### 伪代码：cBottle 训练与按需生成

```python
# cBottle 的简化流程：粗分辨率生成 + 高分辨率多扩散超分辨
def train_cbottle(batch):
    # batch: ERA5/ICON 多变量气候场，已经映射到 HEALPix
    x_hi, conditions, channel_mask = batch
    x_lo = downsample_to_hpx64(x_hi)

    # 1. 训练粗分辨率条件扩散模型
    sigma = sample_noise_level()
    eps = randn_like(x_lo)
    noisy_lo = x_lo + sigma * eps
    lo_pred = coarse_denoiser(noisy_lo, conditions, sigma, channel_mask)
    loss_coarse = masked_mse(lo_pred, x_lo, channel_mask.output)

    # 2. 训练超分辨率扩散模型：随机取高分辨率 HEALPix patch
    patch_hi, patch_lo = sample_overlapping_patch(x_hi, x_lo)
    sigma = sample_noise_level()
    eps = randn_like(patch_hi)
    noisy_patch = patch_hi + sigma * eps
    patch_pred = sr_denoiser(noisy_patch, patch_lo, conditions, sigma)
    loss_sr = mse(patch_pred, patch_hi)

    return loss_coarse + loss_sr


def generate_climate_state(conditions):
    # 1. 从噪声采样 100 km 全球气候场
    x_lo = diffusion_sample(coarse_denoiser, conditions, grid="HPX64")

    # 2. 在 HPX1024 上初始化噪声，用重叠 patch 去噪并融合
    x_hi = randn_hpx1024()
    for sigma in diffusion_schedule():
        numerator = 0
        denominator = 0
        for patch_id in all_overlapping_patches(x_hi):
            noisy_patch = crop(x_hi, patch_id)
            cond_patch = crop(upsample(x_lo), patch_id)
            denoised = sr_denoiser(noisy_patch, cond_patch, conditions, sigma)
            numerator += paste_back(denoised, patch_id)
            denominator += paste_back(ones_like(denoised), patch_id)
        x_hi = numerator / denominator
    return x_hi
```

##### 与传统天气/气候 AI 的区别

GraphCast、FourCastNet、Pangu-Weather、Aurora 等模型通常学习 \(x_t\rightarrow x_{t+\Delta t}\) 的状态转移，然后自回归滚动。它们适合中短期天气预报，但长气候时间尺度会面对误差累积、分布漂移和耦合变量稳定性问题。cBottle 不把自己定位为逐步积分器，而是把海量气候数据压缩成条件生成模型：输入控制条件，输出满足气候统计的样本。

Earth-2 作为平台还提供 CorrDiff 等下采样/超分辨模型、FourCastNet3 等预报模型、Nowcasting 与数据同化模型。cBottle 在其中承担的是“公里级全球气候状态生成器”的角色：它更像一个可交互的数据生成与补全层，而不是单一的业务天气预报模型。

##### 局限性与使用边界

cBottle 预印本明确仍是早期证明：非平稳气候趋势、持续时间/重现期等事件指标、部分均值气候偏差仍需要后续改进。生成式样本看起来真实不等于物理守恒严格成立，因此在风险评估中应把它视作快速情景生成和数据增强工具，并与物理模拟、观测约束和不确定性分析一起使用。

#### 🧪 练习题

```yaml
question: "cBottle 为什么采用“粗分辨率生成 + 16x 超分辨率”的级联扩散设计？"
options:
  - "为了把所有变量转换成文本 token"
  - "为了先建模全球大尺度气候结构，再用局地扩散生成公里级细节，降低直接生成超大球面场的计算成本"
  - "为了完全替代 HEALPix 网格"
  - "为了只生成单个确定性天气预报轨迹"
answer: 1
explain: "粗模型负责行星尺度低频结构，超分辨模型负责局地高频细节；重叠 patch multi-diffusion 让公里级全球生成在计算上可行。"
```
