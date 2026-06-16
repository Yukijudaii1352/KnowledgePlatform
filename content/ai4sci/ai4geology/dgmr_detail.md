### DGMR

```yaml
id: dgmr
name: DGMR
full_name: 深度生成雷达模型 (Deep Generative Model of Radar)
year: '2021'
org: DeepMind
paper_url: https://www.nature.com/articles/s41586-021-03854-z
category: meteo_ai
parent: convlstm
motivation: GAN生成式雷达回波外推
```

#### 📝 一句话总结

DGMR 把雷达临近预报建模为条件生成式分布，用 GAN 生成多条未来雷达回波样本，解决了 ConvLSTM/UNet 等逐像素损失模型在长时效和强降水场景中容易模糊、难以表达不确定性的问题。

#### 🎯 核心要点

- **条件生成式雷达模型**：用过去 4 帧雷达图作为上下文，采样生成未来 18 帧，也就是 5-90 分钟临近预报
- **生成器包含三部分**：conditioning stack 处理历史雷达、多尺度 latent conditioning stack 注入空间随机变量、卷积 GRU sampler 递归生成未来序列
- **双判别器约束**：spatial discriminator 判断单帧空间结构真假，temporal discriminator 用 3D 卷积判断完整序列的时间一致性
- **网格级正则项**：对多样本均值与真实未来雷达之间的加权 L1 误差进行惩罚，防止 GAN 只生成锐利但位置不准的回波
- **概率集合预报**：每次采样不同 latent \(Z\)，生成多个未来可能场，天然输出类似 ensemble 的不确定性估计
- **大范围推理**：训练使用 \(256\times256\) crop，推理可处理 \(1536\times1280\) 全雷达场，latent 空间为输入分辨率的 \(1/32\)
- **专家评估强**：Nature 论文报告，超过 50 位气象专家系统评估中，DGMR 在准确性和有用性上相对两个强基线排名第一的比例为 89%

#### 🔬 深入细节

##### 图示与模型总览

![DGMR 模型概览](https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41586-021-03854-z/MediaObjects/41586_2021_3854_Fig1_HTML.png)
*图：Nature Figure 1。左侧展示 DGMR 的生成器、空间判别器、时间判别器和网格正则项；右侧展示一个强对流案例中 DGMR、PySTEPS、UNet 和 axial attention 的 30/60/90 分钟预报对比。*

##### 算法伪代码

```python
# DGMR 条件 GAN 训练伪代码
def train_dgmr(radar_dataset, generator, spatial_D, temporal_D, lambda_reg=20):
    for context, future in radar_dataset:
        # context: [B, 4, H, W], past 20 minutes
        # future:  [B, 18, H, W], next 90 minutes

        # 1. 判别器更新，论文中每个 generator step 配两个 discriminator steps
        for _ in range(2):
            z = sample_gaussian_latent(batch=B, height=H // 32, width=W // 32)
            fake = generator(context, z).detach()

            loss_D_spatial = hinge_discriminator_loss(
                real_frames=random_future_frames(future, n=8),
                fake_frames=random_future_frames(fake, n=8),
                discriminator=spatial_D,
            )
            loss_D_temporal = hinge_discriminator_loss(
                real_sequence=concat(context, future),
                fake_sequence=concat(context, fake),
                discriminator=temporal_D,
            )
            update(spatial_D, temporal_D, loss_D_spatial + loss_D_temporal)

        # 2. 生成器更新：对同一 context 采样多次，兼顾真实感、时间一致性和位置准确性
        samples = []
        adv_score = 0.0
        for _ in range(6):
            z = sample_gaussian_latent(batch=B, height=H // 32, width=W // 32)
            fake = generator(context, z)
            samples.append(fake)
            adv_score += spatial_D(fake).mean() + temporal_D(concat(context, fake)).mean()

        mean_prediction = mean(samples)
        grid_reg = weighted_l1(mean_prediction, future, weight_by_rain_rate=True)
        loss_G = -(adv_score / 6.0) + lambda_reg * grid_reg
        update(generator, loss_G)
```

##### 概率临近预报的形式化

给定过去 \(M\) 帧雷达观测 \(\mathbf{X}_{1:M}\)，DGMR 不是输出唯一未来，而是学习条件分布：

$$
P(\mathbf{X}_{M+1:M+N}\mid \mathbf{X}_{1:M})
=
\int
P(\mathbf{X}_{M+1:M+N}\mid \mathbf{Z},\mathbf{X}_{1:M},\theta)
P(\mathbf{Z}\mid\mathbf{X}_{1:M})\,d\mathbf{Z}
$$

论文中 \(M=4\)，对应过去 20 分钟雷达；\(N=18\)，对应未来 90 分钟。潜变量 \(\mathbf{Z}\) 让同一个历史场可以产生多种合理未来，这一点对强对流尤其重要：雷暴单体的生成、增强和并合具有高度随机性，逐像素平均损失往往会把多种可能路径平均成模糊雨带。

##### 生成器：上下文、多尺度随机性和递归采样

DGMR 的生成器首先用 conditioning stack 处理 4 帧历史雷达，在多个空间分辨率上提取上下文特征。并行地，latent conditioning stack 从高斯随机变量生成空间 latent 表示，分辨率约为输入的 \(1/32\)。随后 sampler 使用卷积 GRU 递归生成未来 18 帧。

这种设计有两个好处。第一，历史回波不只在输入层使用，而是以多尺度特征持续供给 sampler，避免条件生成模型忽略上下文。第二，latent 是空间化的，而不是一个全局向量，因此不同区域可以生成相关但不完全相同的未来扰动，推理到 \(1536\times1280\) 大范围雷达场时仍能保持空间一致性。

##### 双判别器与网格正则

DGMR 的训练目标由三部分组成。生成器希望骗过空间判别器 \(D_\phi\) 和时间判别器 \(T_\psi\)，同时保持多样本均值接近真实未来：

$$
\mathcal{L}_G(\theta)=
\mathbb{E}_{\mathbf{X},\mathbf{Z}}
\left[
D_\phi(G_\theta(\mathbf{Z};\mathbf{X}_{1:M}))
+T_\psi(\{\mathbf{X}_{1:M};G_\theta(\mathbf{Z};\mathbf{X}_{1:M})\})
-\lambda \mathcal{L}_R(\theta)
\right]
$$

网格正则项可写成：

$$
\mathcal{L}_R(\theta)=
\frac{1}{HWN}
\left\|
\left(
\mathbb{E}_{\mathbf{Z}}[G_\theta(\mathbf{Z};\mathbf{X}_{1:M})]
-\mathbf{X}_{M+1:M+N}
\right)\odot w(\mathbf{X}_{M+1:M+N})
\right\|_1
$$

其中 \(w(\cdot)\) 对强降水赋予更高权重，并做上限截断以降低异常雷达值影响。论文训练时用 6 个 latent 样本估计 \(\mathbb{E}_{\mathbf{Z}}\)，并设置 \(\lambda=20\)。

判别器使用 hinge loss。以空间判别器为例：

$$
\mathcal{L}_D(\phi)=
\mathbb{E}\left[
\mathrm{ReLU}(1-D_\phi(\mathbf{X}_{M+1:M+N}))
+\mathrm{ReLU}(1+D_\phi(G_\theta(\mathbf{Z};\mathbf{X}_{1:M})))
\right]
$$

时间判别器类似，但输入是真实或生成的完整序列 \(\{\mathbf{X}_{1:M};\mathbf{X}_{M+1:M+N}\}\)。空间判别器迫使单帧回波边界、强度斑块和对流结构更真实；时间判别器惩罚跳帧、闪烁和不连续移动；网格正则则防止 GAN 为了真实感牺牲位置精度。

> 💡 关键：DGMR 的锐利预报不是只靠 GAN。若没有网格级正则，样本可能看起来像雷达图但偏离真实位置；若没有判别器，逐像素损失又会产生模糊。三者组合才是核心。

##### 训练、推理和评估

论文使用英国 2016-2018 年雷达观测训练，2019 年测试；训练样本为长度 110 分钟、空间大小 \(256\times256\) 的降水事件 crop。模型训练 \(5\times10^5\) 个 generator steps，每个生成器更新配两个判别器更新；生成器学习率 \(5\times10^{-5}\)，判别器学习率 \(2\times10^{-4}\)，优化器为 Adam。

推理时，DGMR 不需要自回归地把一帧一帧接回输入，而是在一次生成过程中输出 18 个未来时刻。通过重复采样不同 \(\mathbf{Z}\)，系统可以给出多成员集合预报。Nature 论文强调，这种概率输出能同时服务统计指标、经济价值评估和气象专家认知评估；相较 UNet 和 axial attention 等深度学习基线，DGMR 在强降水、长 lead time 和空间一致性上更有优势。

##### 与 ConvLSTM 的区别

ConvLSTM 学到的是一个确定性序列映射，常用逐像素误差训练；如果未来存在多个合理演化路径，最小化平均误差会倾向输出“中间态”，表现为模糊。DGMR 则显式学习条件分布，通过 latent 采样表达多解性，通过判别器保持样本真实感。换句话说，ConvLSTM 更像“最可能平均轨迹”，DGMR 更像“给出多个物理外观合理的未来场”。

#### 🧪 练习题

```yaml
question: "DGMR 为什么在 GAN 损失之外还加入网格级正则项？"
options:
  - "为了减少输入雷达帧数量"
  - "为了让多样本均值在具体网格位置上接近真实未来，避免只生成锐利但位置不准的回波"
  - "为了把概率预报退化成单一确定性预报"
  - "为了替代空间判别器和时间判别器"
answer: 1
explain: "判别器主要约束样本真实感和时空一致性，网格正则直接约束预测均值与真实雷达场的加权 L1 误差，补足位置准确性。"
```
