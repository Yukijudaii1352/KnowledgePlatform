---
domain: ai4sci
topic_id: ai4geology
topic_name: 地球科学AI
page_icon: 🌍
page_title: 地球科学AI技术演进图谱
page_subtitle: '{build_date} 版'
page_desc: 从数值天气预报到AI大模型，涵盖气象预报、气候建模、遥感分析与灾害预测的技术演进历程。
hero_pills:
- 🏷️ Weather Forecasting · Climate Modeling · Remote Sensing · Disaster Prediction
count_pill: '{count} 个算法'
categories:
  meteo_ai:
    label: 气象预报
    color: '#22a06b'
  climate_ai:
    label: 气候建模
    color: '#5b63d3'
  rs_analysis:
    label: 遥感分析
    color: '#e8820c'
  geo_hazard:
    label: 灾害预测
    color: '#d32f2f'
  earth_fm:
    label: 地球基础模型
    color: '#9c27b0'
---

## 领域综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/ai4sci/ai4geology/overview/zhihu__The_Innovation_地球科学新纪元：人工智能引领地球科学发展与突破__ae7dcd9f/article.md

## 最新进展综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/ai4sci/ai4geology/latest/zhihu__登nature！AI+地球科学29个创新点课题汇总__4db1869a/article.md

## 算法演化关系

```yaml
nodes:
- id: convlstm
  x: 2015
  y: 0
  category: meteo_ai
- id: dgmr
  x: 2021
  y: 0
  category: meteo_ai
- id: fourcastnet
  x: 2022
  y: 1
  category: meteo_ai
- id: pangu_weather
  x: 2023
  y: 2
  category: meteo_ai
- id: graphcast
  x: 2023
  y: 3
  category: meteo_ai
- id: nowcastnet
  x: 2023
  y: 0
  category: meteo_ai
- id: gencast
  x: 2024
  y: 3
  category: meteo_ai
- id: aifs_v2
  x: 2026
  y: 3
  category: meteo_ai
- id: fengwu_ghr
  x: 2026
  y: 2
  category: meteo_ai
- id: weatherbench
  x: 2020
  y: 4
  category: climate_ai
- id: climax
  x: 2023
  y: 4
  category: climate_ai
- id: neuralgcm
  x: 2024
  y: 4
  category: climate_ai
- id: ace
  x: 2026
  y: 4
  category: climate_ai
- id: goflow
  x: 2026
  y: 5
  category: climate_ai
- id: carbon_tracker
  x: 2026
  y: 5
  category: climate_ai
- id: unet
  x: 2015
  y: 6
  category: rs_analysis
- id: deeplabv3plus
  x: 2018
  y: 6
  category: rs_analysis
- id: resunet
  x: 2019
  y: 7
  category: rs_analysis
- id: satmae
  x: 2022
  y: 6
  category: rs_analysis
- id: prithvi
  x: 2023
  y: 6
  category: rs_analysis
- id: satmae_pp
  x: 2024
  y: 7
  category: rs_analysis
- id: prithvi_eo2
  x: 2024
  y: 6
  category: rs_analysis
- id: alphaearth
  x: 2025
  y: 6
  category: rs_analysis
- id: floodhub
  x: 2022
  y: 8
  category: geo_hazard
- id: recast
  x: 2023
  y: 9
  category: geo_hazard
- id: alertcalifornia
  x: 2024
  y: 10
  category: geo_hazard
- id: landslide_ai
  x: 2026
  y: 8
  category: geo_hazard
- id: groundsource
  x: 2026
  y: 8
  category: geo_hazard
- id: dryad_gen4
  x: 2026
  y: 10
  category: geo_hazard
- id: earthquake_ai
  x: 2026
  y: 9
  category: geo_hazard
- id: aurora
  x: 2024
  y: 11
  category: earth_fm
- id: earth2
  x: 2024
  y: 12
  category: earth_fm
- id: thor
  x: 2026
  y: 11
  category: earth_fm
edges:
- from: convlstm
  to: dgmr
  label: 生成式建模
- from: convlstm
  to: fourcastnet
  label: 全球尺度
- from: fourcastnet
  to: pangu_weather
  label: 3D Transformer
- from: pangu_weather
  to: graphcast
  label: GNN网格
- from: pangu_weather
  to: fengwu_ghr
  label: 高分辨率
- from: dgmr
  to: nowcastnet
  label: 物理耦合
- from: graphcast
  to: gencast
  label: 扩散模型
- from: gencast
  to: aifs_v2
  label: 业务化
- from: weatherbench
  to: climax
  label: 基础模型
- from: climax
  to: neuralgcm
  label: 物理混合
- from: neuralgcm
  to: ace
  label: 长期模拟
- from: neuralgcm
  to: carbon_tracker
  label: 碳循环
- from: unet
  to: deeplabv3plus
  label: 多尺度
- from: unet
  to: resunet
  label: 残差连接
- from: deeplabv3plus
  to: satmae
  label: 自监督
- from: satmae
  to: prithvi
  label: 基础模型
- from: satmae
  to: satmae_pp
  label: 多尺度
- from: prithvi
  to: prithvi_eo2
  label: 扩展参数
- from: prithvi_eo2
  to: alphaearth
  label: 全球嵌入
- from: floodhub
  to: landslide_ai
  label: 多灾种
- from: floodhub
  to: groundsource
  label: LLM增强
- from: alertcalifornia
  to: dryad_gen4
  label: 传感器
- from: recast
  to: earthquake_ai
  label: 实时检测
- from: climax
  to: aurora
  label: 大规模
- from: aurora
  to: earth2
  label: 生成式
- from: aurora
  to: thor
  label: 多模态
milestones:
- pangu_weather
- neuralgcm
- prithvi_eo2
```

## 核心算法

### ConvLSTM

```yaml
id: convlstm
num: 1
name: ConvLSTM
full_name: 卷积长短期记忆网络 (Convolutional LSTM)
year: '2015'
org: HKU
parent: —
paper_url: https://arxiv.org/abs/1506.04214
project_url: ''
category: meteo_ai
motivation: 首创时空序列卷积建模降水预报
```

#### 📝 一句话总结
ConvLSTM 把 LSTM 的输入到状态、状态到状态变换从全连接改成卷积，使隐藏状态保留二维空间网格，解决了雷达回波临近预报中“既要记住时间演化、又要捕捉局部运动”的时空序列建模问题。

#### 🎯 核心要点
- **时空序列预测形式化**：将降水临近预报写成过去雷达图序列 \(\mathbf{X}_{1:J}\) 到未来雷达图序列 \(\mathbf{X}_{J+1:J+K}\) 的端到端学习问题
- **ConvLSTM 单元**：所有输入、门控、记忆单元和隐藏状态都是三维张量，最后两个维度对应雷达图的行列空间
- **卷积状态转移**：用卷积替代 FC-LSTM 的矩阵乘法，输入到状态和状态到状态都只连接局部邻域，显式编码空间局部性和平移共享
- **编码-预测结构**：用 stacked ConvLSTM encoder 压缩历史雷达序列，再把最终状态复制给 forecasting network 递归生成未来多帧
- **核大小控制运动感受野**：状态到状态卷积核越大，隐藏状态随时间扩展的空间范围越大，更适合捕捉快速移动回波
- **实证基准**：在 Moving-MNIST 和香港 2011-2013 年雷达回波数据上，ConvLSTM 优于 FC-LSTM，并超过当时业务 ROVER 光流外推算法

#### 🔬 深入细节
##### 图示与整体架构

![ConvLSTM 内部结构](https://ar5iv.labs.arxiv.org/html/1506.04214/assets/x2.png)
*图：论文 Figure 2 的 ConvLSTM 单元结构。输入、隐藏状态和记忆单元都保留空间网格，门控计算中的线性变换由卷积完成。*

![ConvLSTM 编码-预测网络](https://ar5iv.labs.arxiv.org/html/1506.04214/assets/x3.png)
*图：论文 Figure 3 的 encoding-forecasting 结构。编码网络读取历史帧，预测网络从编码状态出发输出未来雷达序列。*

##### 算法伪代码

```python
# ConvLSTM precipitation nowcasting 伪代码
def convlstm_nowcast(past_radar_frames, encoder, forecaster, out_conv, pred_steps):
    """
    past_radar_frames: [T_in, B, C, H, W]
    return: [T_out, B, C, H, W]
    """
    # 1. Encoder: 逐帧读取历史雷达图，更新多层 ConvLSTM 状态
    states = encoder.init_states(batch_size=past_radar_frames.shape[1])
    for x_t in past_radar_frames:
        states = encoder.step(x_t, states)

    # 2. Forecasting network: 把 encoder 最终状态作为初始状态
    forecast_states = copy_states(states)
    x_t = zeros_like(past_radar_frames[-1])  # 或使用上一帧/上一预测作为解码输入
    predictions = []
    for _ in range(pred_steps):
        forecast_states = forecaster.step(x_t, forecast_states)
        h_top = forecast_states[-1].hidden
        y_t = sigmoid(out_conv(h_top))
        predictions.append(y_t)
        x_t = y_t

    return stack(predictions)
```

##### 从 FC-LSTM 到 ConvLSTM

标准 FC-LSTM 把输入 \(\mathbf{x}_t\)、隐藏状态 \(\mathbf{h}_t\) 和记忆单元 \(\mathbf{c}_t\) 都当作向量处理。对于雷达图，这意味着必须先把二维图像展平，任意两个像素都可能通过全连接权重直接相连。这样有两个问题：参数量大，而且模型不知道相邻像素比远距离像素更可能共同构成一个移动回波。

ConvLSTM 保留空间维度。设输入 \(\mathbf{X}_t\in\mathbb{R}^{C\times H\times W}\)，隐藏状态 \(\mathbf{H}_t\in\mathbb{R}^{D\times H\times W}\)，记忆单元 \(\mathbf{C}_t\in\mathbb{R}^{D\times H\times W}\)。核心门控为：

$$
\mathbf{i}_t=\sigma(\mathbf{W}_{xi} * \mathbf{X}_t+\mathbf{W}_{hi} * \mathbf{H}_{t-1}+\mathbf{W}_{ci}\circ \mathbf{C}_{t-1}+\mathbf{b}_i)
$$

$$
\mathbf{f}_t=\sigma(\mathbf{W}_{xf} * \mathbf{X}_t+\mathbf{W}_{hf} * \mathbf{H}_{t-1}+\mathbf{W}_{cf}\circ \mathbf{C}_{t-1}+\mathbf{b}_f)
$$

$$
\mathbf{C}_t=\mathbf{f}_t\circ\mathbf{C}_{t-1}
+\mathbf{i}_t\circ\tanh(\mathbf{W}_{xc} * \mathbf{X}_t+\mathbf{W}_{hc} * \mathbf{H}_{t-1}+\mathbf{b}_c)
$$

$$
\mathbf{o}_t=\sigma(\mathbf{W}_{xo} * \mathbf{X}_t+\mathbf{W}_{ho} * \mathbf{H}_{t-1}+\mathbf{W}_{co}\circ \mathbf{C}_{t}+\mathbf{b}_o)
$$

$$
\mathbf{H}_t=\mathbf{o}_t\circ\tanh(\mathbf{C}_t)
$$

其中 \(*\) 是卷积，\(\circ\) 是逐元素乘法。与 FC-LSTM 相比，ConvLSTM 的关键变化是 \(\mathbf{W}_{h\*}\) 不再是稠密矩阵，而是卷积核。某个网格点的新状态只由该点附近的输入和隐藏状态决定，因此天然适合雷达回波、视频帧和遥感序列这类局部连续场。

##### 卷积核大小为什么重要

论文特别强调 state-to-state kernel 的大小。若隐藏状态转移只用 \(1\times1\) 卷积，那么每个位置的时间更新不看邻居，状态感受野不会随时间扩张；模型只能学习每个像素自己的时间变化，很难表示回波平移。若使用 \(5\times5\) 或更大的状态卷积，\(\mathbf{H}_{t-1}\) 中邻近区域会参与当前网格点更新，经过多步递推后感受野继续扩大，可以表达云团移动、拉伸和合并。

这个设计和光流外推的直觉相似，但学习方式不同。ROVER 等传统算法先估计运动场，再按半拉格朗日方法外推雷达图；ConvLSTM 不显式估计光流，而是在门控状态中隐式学习“哪些局部结构应被保留、遗忘或移动”。因此它可以端到端利用预测误差反向调整所有卷积核。

##### 编码-预测结构

论文使用两个 stacked ConvLSTM 网络：encoding network 和 forecasting network。编码阶段读取历史帧：

$$
(\mathbf{H}_J,\mathbf{C}_J)=\mathrm{Encoder}(\mathbf{X}_{1:J})
$$

预测阶段从编码得到的最终状态出发，生成未来序列：

$$
\hat{\mathbf{X}}_{J+1:J+K}
=\mathrm{Forecaster}(\mathbf{H}_J,\mathbf{C}_J)
$$

这种 seq2seq 结构比单步预测更适合临近预报，因为业务需求通常不是下一帧，而是未来 1-6 小时的连续降水演化。论文雷达实验中，香港雷达每 6 分钟记录一帧，模型用 5 帧历史预测 15 帧未来；数据来自 2011-2013 年 97 个雨日，共构造 8148 个训练序列、2037 个验证序列和 2037 个测试序列。

##### 损失函数和训练目标

论文把雷达图像素变换为灰度强度后训练多步预测模型，可用逐像素序列损失表示：

$$
\mathcal{L}(\theta)=
\sum_{t=J+1}^{J+K}
\sum_{u,v}
\ell\left(\mathbf{X}_{t,u,v},\hat{\mathbf{X}}_{t,u,v}^{(\theta)}\right)
$$

在 Moving-MNIST 实验中 \(\ell\) 是像素级交叉熵；在雷达回波实验中，模型同样通过反向传播穿越时间（BPTT）优化多帧输出误差。直觉上，损失要求每一个未来时刻的每个网格点都接近真实回波强度，而 ConvLSTM 的门控状态负责在时间上携带局部运动信息。

> 💡 关键：ConvLSTM 的贡献不是简单把 CNN 接到 LSTM 前面，而是把 LSTM 内部的状态转移本身卷积化，使记忆单元也具有空间结构。

##### 与后续天气 AI 的关系

ConvLSTM 是后续雷达临近预报深度模型的重要基线。它的优势是结构简单、端到端、可多步输出；局限是预测分布通常趋向平均，长时效会产生模糊，且没有显式概率建模。DGMR、NowcastNet 等后续方法正是在这个基础上继续解决“多解性、极端降水、概率一致性”和“物理约束”问题。

#### 🧪 练习题
```yaml
question: "ConvLSTM 相比 FC-LSTM 解决雷达回波预测的关键改动是什么？"
options:
  - "把所有雷达图像展平后使用更大的全连接层"
  - "在 LSTM 的输入到状态和状态到状态变换中使用卷积，保留二维空间结构"
  - "只预测下一帧，不再做多步序列预测"
  - "用固定光流场替代神经网络训练"
answer: 1
explain: "ConvLSTM 的输入、隐藏状态和记忆单元都是空间张量，门控计算通过卷积连接局部邻域，因此能同时建模时间记忆和空间运动。"
```

### DGMR

```yaml
id: dgmr
num: 2
name: DGMR
full_name: 深度生成雷达模型 (Deep Generative Model of Radar)
year: '2021'
org: DeepMind
parent: convlstm
paper_url: https://www.nature.com/articles/s41586-021-03854-z
project_url: ''
category: meteo_ai
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

### FourCastNet

```yaml
id: fourcastnet
num: 3
name: FourCastNet
full_name: 傅里叶预报网络 (Fourier Forecasting Neural Network)
year: '2022'
org: NVIDIA
parent: convlstm
paper_url: https://arxiv.org/abs/2202.11214
project_url: ''
category: meteo_ai
motivation: 傅里叶神经算子处理全球尺度物理场
```

#### 📝 一句话总结
FourCastNet 将全球天气预报建模为高分辨率物理场的神经算子学习问题，用 Vision Transformer 骨架和 Adaptive Fourier Neural Operator（AFNO）在频域完成全局 token mixing，解决了卷积模型难以在 0.25° 全球网格上兼顾长程依赖、细尺度结构和快速集合预报的问题。

#### 🎯 核心要点
- **AFNO 天气预报骨架**：把 \(720 \times 1440\) 经纬度场切成 patch token，在傅里叶域进行全局混合，再用通道 MLP 更新每个 token
- **20 个 ERA5 预报变量**：使用 1979-2015 年 ERA5 训练、2016-2017 年验证、2018 年以后测试，以 6 小时间隔学习 \(X_t \rightarrow X_{t+6h}\)
- **两阶段训练**：先做单步监督预训练，再用两步自由运行 fine-tuning 显式降低自回归滚动时的误差累积
- **降水诊断模型**：总降水不放入动力骨架，而由单独 AFNO 诊断 6 小时累计降水，并对稀疏长尾降水做 log transform
- **高分辨率与长程依赖兼容**：AFNO 用 FFT 将空间混合复杂度压低到适合百万像素全球场的量级，避免普通 CNN 在高分辨率下需要极深感受野
- **快速集合预报**：论文报告一周预报少于 2 秒，100 成员 24 小时集合预报可在单个 4×A100 节点上约 7 秒完成
- **极端天气能力**：在台风、飓风、近地面风速和大气河等细尺度结构上明显优于低分辨率深度学习天气模型

#### 🔬 深入细节
##### 图示与可访问来源

![FourCastNet AFNO 架构与训练/推理模式](https://ar5iv.labs.arxiv.org/html/2202.11214/assets/afno_plus_v1.png)
*图：FourCastNet 的 AFNO Transformer 骨架、两步 fine-tuning、降水诊断模型和自回归推理模式。来源为论文 ar5iv HTML 图像；论文页见 https://arxiv.org/abs/2202.11214。*

##### 方法背景：为什么用傅里叶神经算子

FourCastNet 面对的是全球 0.25° ERA5 网格，单个时间片约为 \(720 \times 1440\) 个格点，每个样本包含 20 个大气或地表变量。低分辨率天气网络可以用普通 CNN 或 ConvLSTM 做局部卷积，但在这种百万像素级输入上，卷积模型要么感受野不足，难以连接远距离天气系统；要么需要堆叠大量层，显存和推理成本迅速上升。论文中将这种问题归结为高分辨率物理场里的全局依赖建模，而不是普通图像预测。

AFNO 的关键选择是把空间 token mixing 放到傅里叶域。对纬度-经度 patch token 做二维 FFT 后，每个频率分量天然包含全局空间信息；再用共享的块对角 MLP 对频率和通道做可学习变换，并用 soft-thresholding 抑制不重要频率。这样模型既保留了 Transformer/Vision Transformer 的 token 表示，又避免标准自注意力在 \(N\) 个 patch 上的 \(O(N^2)\) 代价。

##### AFNO 层的核心计算

设输入天气状态为 \(X_t \in \mathbb{R}^{C \times H \times W}\)，其中 \(C=20\)，\(H=720\)，\(W=1440\)。Patch embedding 将其变成 token 网格 \(u \in \mathbb{R}^{H_p \times W_p \times d}\)。一个 AFNO block 可概括为：

$$
\hat{u}=\mathcal{F}_{2D}(u)
$$

$$
z_{m} = W_{2,m}\,\sigma(W_{1,m}\hat{u}_{m}+b_{1,m})+b_{2,m}
$$

$$
\tilde{z}_{m} = \operatorname{SoftShrink}_{\lambda}(z_m)
= \operatorname{sign}(z_m)\max(|z_m|-\lambda, 0)
$$

$$
u' = u + \mathcal{F}_{2D}^{-1}(\tilde{z})
$$

这里 \(m\) 表示通道块或频率块，块对角权重减少参数和计算量；\(\lambda\) 控制频率稀疏性。直觉上，低频部分承载大尺度环流，高频部分承载锋面、降水边界、地形影响等细尺度结构；soft-thresholding 让模型只保留对预测有用的频谱响应，减少噪声和过拟合。

##### 训练目标与自回归 fine-tuning

FourCastNet 的基础骨架学习 6 小时映射：

$$
\hat{X}_{t+1}=f_{\theta}(X_t), \qquad t+1 \equiv t+6\text{h}
$$

预训练阶段使用单步监督损失：

$$
\mathcal{L}_{1}(\theta)=\left\| f_{\theta}(X_t)-X_{t+1}\right\|_2^2
$$

但真实中期预报需要反复把模型输出喂回自身。单步误差在自由运行时会积累，因此论文进一步做两步 fine-tuning：

$$
\hat{X}_{t+1}=f_{\theta}(X_t),\qquad
\hat{X}_{t+2}=f_{\theta}(\hat{X}_{t+1})
$$

$$
\mathcal{L}_{2}(\theta)=
\left\|\hat{X}_{t+1}-X_{t+1}\right\|_2^2+
\left\|\hat{X}_{t+2}-X_{t+2}\right\|_2^2
$$

这一步的作用不是让模型只会预测 12 小时，而是让模型在训练时看到“自己的预测作为下一步输入”这一分布偏移。它直接针对自回归 rollout 的暴露偏差，使 3-7 天预报不会因为前几步的小误差迅速漂移。

##### 降水为什么单独诊断

总降水 \(P\) 与温度、风、位势高度这类连续大气变量不同：大量格点为零，少数强降水格点形成长尾分布，而且降水对后续大尺度动力变量的反作用不如温压风场直接。FourCastNet 因此把降水作为诊断变量，由独立 AFNO 模型 \(g_{\psi}\) 从骨架预测的大气状态中输出 6 小时累计降水：

$$
\hat{P}_{t+1}=g_{\psi}(\hat{X}_{t+1})
$$

训练时使用 log 变换缓解稀疏和长尾：

$$
P^{\log}=\log(1+P/\epsilon)
$$

并在输出端用 ReLU 约束降水非负。这个拆分有一个工程上很重要的含义：骨架专注于学习决定天气演化的连续状态变量，降水模型专注于从这些状态中恢复稀疏、高频、局地化的降水诊断。

##### 伪代码：训练与 10 天预报

```python
# FourCastNet 核心流程：6小时步长的 AFNO 自回归天气预报
def train_backbone(batch):
    x_t, x_t1, x_t2 = batch  # ERA5: t, t+6h, t+12h

    # 1. 单步预训练
    pred_t1 = AFNO_backbone(x_t)
    loss_pretrain = mse(pred_t1, x_t1)

    # 2. 两步 fine-tuning：第二步输入使用模型自己的输出
    pred_t2 = AFNO_backbone(pred_t1)
    loss_finetune = mse(pred_t1, x_t1) + mse(pred_t2, x_t2)

    return loss_pretrain, loss_finetune


def forecast_10_days(x0):
    x = x0
    trajectory = []
    for step in range(40):  # 10天 / 6小时 = 40步
        x = AFNO_backbone(x)
        precip = precipitation_AFNO(x)  # 6小时累计降水诊断
        trajectory.append({"state": x, "tp6h": precip})
    return trajectory
```

##### 与传统数值预报和 CNN 预报的差异

传统 NWP 通过离散化大气动力学方程、物理参数化和数据同化来积分未来状态，优点是物理一致性强，缺点是依赖超级计算资源，集合预报成本高。FourCastNet 不显式求解 Navier-Stokes 或原始方程，而是从 ERA5 再分析数据中学习状态转移算子；它牺牲了硬物理约束，换来极快推理和大规模集合能力。

相对于 CNN/ConvLSTM，FourCastNet 的核心差异是“全局频域混合”。CNN 的局部卷积适合平移等变图像模式，但天气系统有跨洋盆、跨纬带的远程相互作用，且在 0.25° 网格上单纯扩大感受野代价很高。AFNO 的频域 token mixing 一步就能看到全局模式，因此更适合罗斯贝波、急流、热带气旋路径这类多尺度耦合问题。

> 💡 关键：FourCastNet 的贡献不只是“用深度学习做天气预报”，而是把全球高分辨率天气状态当作连续物理场的算子学习任务，并用 AFNO 解决高分辨率下全局混合的计算瓶颈。

##### 局限性

FourCastNet 仍是纯数据驱动模型，不保证能量、水汽或动量守恒；论文也指出它在部分极端降水上仍会偏平滑。它建模的变量数量和垂直层数远少于业务 IFS，因此更适合作为快速中期预报和集合预报工具，而不是完整替代所有数值天气预报流程。

#### 🧪 练习题
```yaml
question: "FourCastNet 使用 AFNO 的主要原因是什么？"
options:
  - "把天气预报变成文本生成任务"
  - "在高分辨率全球网格上用傅里叶域 token mixing 高效建模长程空间依赖"
  - "完全消除自回归误差累积"
  - "用显式物理方程替代 ERA5 数据训练"
answer: 1
explain: "AFNO 通过 FFT 在频域混合空间 token，能在百万像素级全球场上捕捉长程依赖，同时比标准注意力或极深卷积更适合高分辨率天气预报。"
```

### Pangu-Weather

```yaml
id: pangu_weather
num: 4
name: Pangu-Weather
full_name: 盘古气象 (Pangu-Weather)
year: '2023'
org: Huawei Cloud
parent: fourcastnet
paper_url: https://www.nature.com/articles/s41586-023-06185-3
project_url: ''
category: meteo_ai
motivation: 3D地球Transformer首次超越ECMWF
```

#### 📝 一句话总结
Pangu-Weather 提出了 3D Earth-Specific Transformer（3DEST）架构直接建模三维大气状态，并通过层次时间聚合策略（训练 1h/3h/6h/24h 四个独立模型）大幅减少迭代累积误差，**首次以 AI 方法在所有变量、所有预报时效上全面超越 ECMWF 业务数值预报系统 IFS**，同时将推理速度提升超过 10,000 倍。

#### 🎯 核心要点
- **3D Earth-Specific Transformer（3DEST）**：将气象数据视为三维立体场（气压层 × 纬度 × 经度），使用 3D Swin Transformer 进行建模，克服了此前方法仅处理 2D 切片的局限
- **Earth-Specific Positional Bias（ESP）**：替换 Swin Transformer 的相对位置偏置，为不同纬度和高度的窗口学习独立的绝对位置偏置矩阵，捕捉地球球面投影的非均匀空间分布
- **层次时间聚合策略**：训练 1h、3h、6h、24h 四个独立预报模型，7 天预报仅需最少 4 次模型调用（而非 FourCastNet 的 28 次），显著抑制累积误差
- **ERA5 再分析数据**：使用 1979–2017 年共 39 年的 0.25° 分辨率全球再分析数据，涵盖 13 个气压层 × 5 个上层变量 + 4 个地面变量
- **全面超越 IFS**：Z500 五天 RMSE 从 IFS 的 333.7 降至 296.7（降幅 11.1%），T850 五天 RMSE 从 2.06K 降至 1.79K（降幅 13.1%），单步推理仅需 1.4 秒

#### 🔬 深入细节
##### 问题背景与动机

中期天气预报（1–14 天）是气象学的核心任务。传统方法基于数值天气预报（NWP），通过求解大气运动的偏微分方程组来推演未来状态。以 ECMWF 的 IFS 系统为代表，NWP 方法虽然精度高，但计算代价极大——一次 10 天全球预报需要在超级计算机上运行数小时。

此前的 AI 方法（如 FourCastNet、WeatherBench 等）虽然推理速度快，但在预报精度上始终无法匹敌业务 NWP 系统。作者分析了两个关键瓶颈：

1. **维度不足**：现有 AI 方法仅处理 2D（纬度 × 经度）数据，忽略了大气的垂直结构。许多天气过程（辐射、对流等）只有在 3D 空间中才能完整描述。
2. **累积误差**：当基础模型的预报时效较短（如 6 小时）时，7 天预报需要迭代调用 28 次，误差随迭代次数超线性增长。

> 💡 关键洞察：**提升数据维度**（2D → 3D）+ **减少迭代次数**（多时效模型）= 更准确的中期预报

##### 整体架构

![3DEST 架构总览](https://ar5iv.labs.arxiv.org/html/2211.02556v1/assets/x2.png)
*图：3D Earth-Specific Transformer（3DEST）的整体架构。输入为三维气象场，经过 Patch Embedding 后进入编码器-解码器结构，输出未来时刻的气象场预测。*

Pangu-Weather 的核心是一个基于 3D Swin Transformer 的编码器-解码器网络。整体数据流如下：

**输入表示**：全球气象状态被表示为两部分：
- 上层大气变量：\(13 \times 1440 \times 721 \times 5\) 的四维张量（13 个气压层 × 纬度 × 经度 × 5 个变量：位势高度 Z、比湿 Q、温度 T、U 风、V 风）
- 地面变量：\(1440 \times 721 \times 4\) 的三维张量（2m 温度、10m U 风、10m V 风、海平面气压）

**Patch Embedding**：
- 上层变量使用 \(2 \times 4 \times 4\) 的 patch 尺寸，将 \(13 \times 1440 \times 721 \times 5\) 映射为 \(7 \times 360 \times 181 \times C\)（\(C = 192\)）
- 地面变量使用 \(4 \times 4\) 的 patch 尺寸，映射为 \(360 \times 181 \times C\)
- 两部分沿高度维拼接，得到 \(8 \times 360 \times 181 \times C\)

**编码器-解码器**：
- 编码器：前 2 层保持全分辨率 \(8 \times 360 \times 181 \times C\)，后 6 层下采样至 \(8 \times 180 \times 91 \times 2C\)
- 解码器：对称结构，前 6 层在低分辨率运算，后 2 层恢复全分辨率
- 第 2 编码层与第 7 解码层之间有跳跃连接（skip connection）

```python
# Pangu-Weather 3DEST 前向传播伪代码
def forward(upper_air, surface):
    """
    upper_air: [B, 13, 1440, 721, 5]  — 13个气压层 × 5个变量
    surface:   [B, 1440, 721, 4]      — 4个地面变量
    """
    # Step 1: Patch Embedding
    x_upper = patch_embed_3d(upper_air, patch=(2,4,4))  # → [B, 7, 360, 181, C]
    x_surface = patch_embed_2d(surface, patch=(4,4))     # → [B, 360, 181, C]
    x = concat_height(x_upper, x_surface)                # → [B, 8, 360, 181, C]

    # Step 2: Encoder (2 full-res layers + downsample + 6 half-res layers)
    x = encoder_full(x)          # 2 layers: [B, 8, 360, 181, C]
    skip = x                     # 保存跳跃连接
    x = downsample(x)            # → [B, 8, 180, 91, 2C]
    x = encoder_half(x)          # 6 layers: [B, 8, 180, 91, 2C]

    # Step 3: Decoder (6 half-res layers + upsample + 2 full-res layers)
    x = decoder_half(x)          # 6 layers: [B, 8, 180, 91, 2C]
    x = upsample(x)              # → [B, 8, 360, 181, C]
    x = concat_channel(x, skip)  # 跳跃连接
    x = decoder_full(x)          # 2 layers: [B, 8, 360, 181, C]

    # Step 4: Patch Recovery → 输出预测
    pred_upper = patch_recover_3d(x[:, :7])   # → [B, 13, 1440, 721, 5]
    pred_surface = patch_recover_2d(x[:, 7:]) # → [B, 1440, 721, 4]
    return pred_upper, pred_surface
```

##### Earth-Specific Positional Bias（ESP）

![ESP 动机示意](https://ar5iv.labs.arxiv.org/html/2211.02556v1/assets/x3.png)
*图：Earth-Specific Positional Bias 的动机。左：等经纬度网格在球面上的不均匀分布；右：不同变量（位势高度、风速、温度）的空间分布与绝对位置强相关。*

标准 Swin Transformer 使用**相对位置偏置** \(\mathbf{B}\)，所有窗口共享同一组偏置参数。但在全球气象预报中，这种设计存在两个问题：

1. **空间非均匀性**：等经纬度网格是球面的投影，高纬度区域的网格间距远小于赤道区域，相同的相对位置在不同纬度代表不同的物理距离
2. **位置依赖性**：许多气象变量（如位势高度、温度）与绝对地理位置强相关

ESP 的核心改进是：为不同的**气压层位置** \(m_{\text{pl}}\) 和**纬度位置** \(m_{\text{lat}}\) 学习独立的偏置子矩阵。具体地，设特征图被划分为 \(M_{\text{pl}} \times M_{\text{lat}} \times M_{\text{lon}}\) 个窗口，每个窗口大小为 \(W_{\text{pl}} \times W_{\text{lat}} \times W_{\text{lon}}\)，则：

$$\mathbf{B}_{\text{ESP}} \in \mathbb{R}^{M_{\text{pl}} \times M_{\text{lat}} \times W_{\text{pl}}^2 \times W_{\text{lat}}^2 \times (2W_{\text{lon}}-1)}$$

注意 \(M_{\text{lon}}\) 不出现在偏置维度中，因为不同经度共享相同偏置（经度方向是周期性的且间距均匀）。而经度方向内部仍使用相对位置索引 \(\lambda'_1 - \lambda'_2 + W_{\text{lon}} - 1\)。

> 💡 关键：ESP 使参数量从标准 Swin 的 \((2W_{\text{pl}}-1)(2W_{\text{lat}}-1)(2W_{\text{lon}}-1)\) 增加到 \(M_{\text{pl}} \times M_{\text{lat}} \times W_{\text{pl}}^2 \times W_{\text{lat}}^2 \times (2W_{\text{lon}}-1)\)，约增加 **527 倍**，但不增加 FLOPs，且实际上加速了训练收敛。

##### 3D 窗口注意力与移位机制

3DEST 将标准 Swin Transformer 的 2D 窗口注意力扩展到 3D。每个注意力层在 \(W_{\text{pl}} \times W_{\text{lat}} \times W_{\text{lon}}\) 大小的局部窗口内计算自注意力：

$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d}} + \mathbf{B}_{\text{ESP}}\right)V$$

为实现跨窗口信息交换，采用交替的移位窗口机制。但与标准 3D Swin 不同，Pangu-Weather **不沿气压层维度进行移位**，因为：
- 气压层维度仅有 8 个 token（7 个上层 + 1 个地面），移位会导致大量 padding
- 气压层之间的物理关系已通过窗口内注意力充分建模

因此，移位仅沿纬度和经度两个维度进行，且经度方向使用**循环移位**（因为地球经度是周期性的）。

##### 层次时间聚合策略

![累积误差对比](https://ar5iv.labs.arxiv.org/html/2211.02556v1/assets/x4.png)
*图：不同基础预报时效（1h/3h/6h/24h）在 7 天预报中的累积误差对比。基础时效越长，迭代次数越少，累积误差越小。*

这是 Pangu-Weather 的第二个核心创新。作者训练了四个**独立的**模型，分别对应 1 小时、3 小时、6 小时和 24 小时的预报时效。关键设计选择：

| 预报时效 | 模型 | 7天预报迭代次数 |
|---------|------|--------------|
| 1h | \(f_{1h}\) | 168 次 |
| 3h | \(f_{3h}\) | 56 次 |
| 6h | \(f_{6h}\) | 28 次 |
| 24h | \(f_{24h}\) | 7 次 |

**组合策略**：对于任意预报时效，优先使用大步长模型，再用小步长模型补齐。例如：
- 5 天（120h）预报：\(f_{24h}\) 调用 4 次 + \(f_{24h}\) 调用 1 次 = 5 次（而非 FourCastNet 的 20 次）
- 73 小时预报：\(f_{24h} \times 3 + f_{1h} \times 1 = 4\) 次

> ⚠️ 注意：四个模型**不共享参数**，各自独立训练。作者没有采用递归优化（如 FourCastNet 同时计算 \(f(\mathbf{A})\) 和 \(f(f(\mathbf{A}))\)），因为递归训练需要 2 倍 GPU 显存，反而限制了模型规模。

##### 训练细节

- **数据**：ERA5 再分析数据，1979–2017 年（39 年），0.25° 分辨率，每小时一个样本
- **损失函数**：对上层和地面变量分别计算加权 L1 损失，不同变量和气压层使用不同权重
- **优化器**：Adam，100 个 epoch，权重衰减 \(3 \times 10^{-6}\)，DropPath 比率 0.2
- **计算资源**：192 块 NVIDIA Tesla V100 GPU，每个模型训练 16 天
- **模型规模**：通道数 \(C = 192\)，约 256M 参数

##### 与传统方法的关键区别

| 维度 | NWP (IFS) | FourCastNet | Pangu-Weather |
|------|-----------|-------------|---------------|
| 建模方式 | 求解 PDE | 2D Transformer | **3D Transformer** |
| 垂直结构 | 完整物理建模 | 2D 切片独立处理 | **3D 联合建模** |
| 位置编码 | N/A | 标准相对位置 | **Earth-Specific 绝对位置** |
| 7天预报迭代 | 1 次（连续积分） | 28 次 | **最少 4 次** |
| 推理时间 | ~1 小时 | ~秒级 | **1.4 秒/步** |
| Z500 5天 RMSE | 333.7 | >430 | **296.7** |

##### 极端天气预报能力

Pangu-Weather 还展示了在极端天气事件预报中的能力。作者使用**相对分位数误差（RQE）**评估极端值预测倾向，并专门研究了热带气旋路径追踪：

- 在 2018 年的 88 个热带气旋中，Pangu-Weather 的 3 天和 5 天路径追踪误差分别低于 IFS 约 10% 和 15%
- Pangu-Weather 的推理速度使其天然适合**大规模集合预报**：在相同计算预算下可生成远多于 NWP 的集合成员，从而提供更可靠的概率预报

#### 🧪 练习题
```yaml
- question: "Pangu-Weather 为什么不沿气压层维度进行窗口移位（shifted window）？"
  options:
    - "气压层维度的数据没有物理意义"
    - "气压层维度仅有 8 个 token，移位会导致大量无效 padding"
    - "气压层之间不存在物理关联"
    - "为了减少模型参数量"
  answer: 1
  explain: "气压层维度仅有 8 个 token（7 个上层 + 1 个地面），尺寸太小，移位会引入大量 padding 且收益有限，因此仅在纬度和经度维度进行移位。"

- question: "Earth-Specific Positional Bias（ESP）相比标准 Swin Transformer 的相对位置偏置，最核心的区别是什么？"
  options:
    - "ESP 完全去除了位置编码"
    - "ESP 为不同气压层和纬度位置的窗口学习独立的偏置参数"
    - "ESP 仅使用经度方向的相对位置"
    - "ESP 将位置偏置替换为可学习的绝对位置嵌入向量"
  answer: 1
  explain: "ESP 的核心是为不同的 (m_pl, m_lat) 窗口位置学习独立的偏置子矩阵，从而捕捉球面投影的空间非均匀性和气象变量的位置依赖性，而非所有窗口共享同一组偏置。"

- question: "Pangu-Weather 的层次时间聚合策略中，完成一次 5 天（120 小时）预报最少需要调用模型多少次？"
  options:
    - "5 次（24h 模型调用 5 次）"
    - "20 次（6h 模型调用 20 次）"
    - "28 次（与 FourCastNet 相同）"
    - "120 次（1h 模型调用 120 次）"
  answer: 0
  explain: "120 小时 = 24h × 5，因此只需调用 24h 模型 5 次即可完成 5 天预报，这是层次时间聚合策略的核心优势。"

- question: "以下哪项不是 Pangu-Weather 超越此前 AI 天气预报方法的关键因素？"
  options:
    - "使用 3D 数据建模替代 2D 切片"
    - "使用递归训练策略同时优化多步预测"
    - "引入 Earth-Specific Positional Bias"
    - "通过多时效模型减少迭代次数"
  answer: 1
  explain: "Pangu-Weather 明确不使用递归训练策略（如 FourCastNet 的双步损失），因为递归训练需要 2 倍 GPU 显存，反而限制了模型规模。其核心策略是训练多个独立的不同时效模型。"
```

### GraphCast

```yaml
id: graphcast
num: 5
name: GraphCast
full_name: 图神经网络天气预报 (GraphCast)
year: '2023'
org: Google DeepMind
parent: pangu_weather
paper_url: https://www.science.org/doi/10.1126/science.adi2336
project_url: ''
category: meteo_ai
motivation: GNN多尺度网格建模确定性预报基准
```

#### 📝 一句话总结
GraphCast 提出基于多尺度球面网格的 encode-process-decode 图神经网络，将 0.25° 全球天气状态映射到均匀 icosahedral multi-mesh 上做消息传递，解决了经纬度网格畸变、长程传播和高分辨率中期确定性预报的统一建模问题。

#### 🎯 核心要点
- **输入两帧天气状态**：用当前时刻和 6 小时前的 ERA5 状态预测未来 6 小时状态，再自回归滚动到 10 天
- **227 个预测变量组合**：每个网格点预测 5 个地表变量与 6 个大气变量在 37 个气压层上的组合
- **多图结构**：包含经纬度 grid nodes、球面 mesh nodes、Grid2Mesh 边、Mesh 边、Mesh2Grid 边三类信息通路
- **R=6 multi-mesh**：由正二十面体反复细分 6 次得到 40,962 个 mesh nodes，并保留所有细分层级的边以支持远距离通信
- **Encode-process-decode GNN**：encoder 将经纬度输入转到 mesh，processor 用 16 层不共享参数的 GNN 在 multi-mesh 上传播，decoder 再映射回经纬度网格
- **残差式输出**：decoder 预测相对最近输入状态的 residual update，降低直接预测绝对状态的难度
- **训练策略**：使用 1979-2017 年 ERA5，训练 rollout 长度从 1 步逐步增加到 12 步，以加固多步自回归稳定性
- **确定性基准突破**：论文在 2018 年测试中报告，GraphCast 在 1380 个验证目标中的约 90% 优于 ECMWF HRES

#### 🔬 深入细节
##### 图示与可访问来源

![GraphCast 模型示意图](https://ar5iv.labs.arxiv.org/html/2212.12794/assets/figures/schematic.png)
*图：GraphCast 的输入状态、6 小时预测、自回归 rollout、Grid2Mesh 编码、multi-mesh processor 与 Mesh2Grid 解码。开放详版见 arXiv/ar5iv: https://arxiv.org/abs/2212.12794；正式论文见 Science DOI。*

##### 问题背景：为什么天气预报需要图而不是普通网格网络

全球天气预报通常存储在经纬度网格上，但经纬度网格不是几何均匀的：赤道附近格点物理距离大，高纬度格点经向收缩，同样的卷积核或局部邻域在不同纬度代表不同物理尺度。Pangu-Weather 用 Earth-Specific Transformer 处理经纬度网格的位置偏差；GraphCast 采取另一条路线：把输入/输出仍放在业务友好的经纬度网格上，但内部计算放到近似均匀的球面三角 mesh。

GraphCast 的 mesh 来自正二十面体细分。第 6 层细分 mesh 有 40,962 个节点，远少于 \(721 \times 1440\) 的经纬度网格点数，因此 processor 可以在更紧凑且几何均匀的图上做消息传递。更关键的是，GraphCast 不只使用最细层 mesh 的短边，还保留从粗到细各层 mesh 的边，形成 multi-mesh。粗层边像长程捷径，细层边保留局地解析度，使 16 层 GNN 就能覆盖从天气尺度到行星尺度的传播。

##### 数据表示与图构造

一个天气状态 \(Y_t\) 包含：

$$
5 \text{ surface variables} + 6 \text{ atmospheric variables} \times 37 \text{ pressure levels}=227
$$

输入特征使用两个连续状态 \(Y_{t-6h}\)、\(Y_t\)，再加上不需要预测的 forcing 和 constants，例如太阳辐射、年内/日内周期、地形、海陆掩码和经纬度位置编码。模型学习：

$$
\hat{Y}_{t+6h}=Y_t+\Delta_{\theta}(Y_{t-6h},Y_t,F_t,C)
$$

其中 \(\Delta_{\theta}\) 是 GraphCast 预测的残差。图由三类边组成：

- **Grid2Mesh**：把每个经纬度格点附近的信息发送到球面 mesh 节点
- **Mesh**：在 multi-mesh 上做多尺度消息传递，包含不同长度的球面边
- **Mesh2Grid**：对每个经纬度格点找到其所在三角面，用相邻 3 个 mesh 节点解码回格点

##### GNN 消息传递机制

GraphCast 的基本模块是 interaction network。对有向边 \(i \rightarrow j\)，边特征 \(e_{ij}\) 和节点特征 \(h_i,h_j\) 先更新边，再聚合入边更新节点：

$$
e'_{ij}=\phi_e([e_{ij},h_i,h_j])
$$

$$
\bar{e}'_j=\sum_{i:(i,j)\in E}e'_{ij}
$$

$$
h'_j=\phi_v([h_j,\bar{e}'_j])
$$

\(\phi_e\) 和 \(\phi_v\) 是 MLP。encoder 在 Grid2Mesh 二部图上执行一次这类消息传递，将经纬度场压到 mesh；processor 在 multi-mesh 上执行 16 层消息传递；decoder 在 Mesh2Grid 二部图上执行一次消息传递，输出回 \(721 \times 1440\) 网格。

> 💡 关键：GraphCast 的“多尺度”不是用多分辨率图像金字塔，而是把不同细分层级的 icosahedral mesh 边合并到同一 processor 图里，让短边和长边在每一层同时参与消息传递。

##### 伪代码：GraphCast 前向与 rollout

```python
# GraphCast 的核心推理流程
def graphcast_step(y_prev, y_now, forcing, constants, graph):
    # y_prev/y_now: 经纬度网格上的天气状态
    grid_features = normalize(concat(y_prev, y_now, forcing, constants))

    # 1. Encoder: grid -> mesh
    grid_h = grid_node_mlp(grid_features)
    mesh_h = mesh_node_mlp(graph.mesh_node_features)
    g2m_e = edge_mlp(graph.grid2mesh_edge_features)
    mesh_h = interaction_network(
        senders=grid_h,
        receivers=mesh_h,
        edges=g2m_e,
        edge_index=graph.grid2mesh_edges,
    )

    # 2. Processor: multi-mesh message passing
    mesh_edges = edge_mlp(graph.mesh_edge_features)
    for layer in range(16):
        mesh_h, mesh_edges = mesh_gnn_layers[layer](
            nodes=mesh_h,
            edges=mesh_edges,
            edge_index=graph.multimesh_edges,
        )

    # 3. Decoder: mesh -> grid, predict residual update
    m2g_e = edge_mlp(graph.mesh2grid_edge_features)
    delta_grid = mesh2grid_decoder(mesh_h, grid_h, m2g_e, graph.mesh2grid_edges)
    return denormalize_residual(delta_grid) + y_now


def rollout_10_days(y_minus_6h, y_0, forcings, constants, graph):
    preds = []
    prev, now = y_minus_6h, y_0
    for k in range(40):  # 10天，每步6小时
        next_state = graphcast_step(prev, now, forcings[k], constants, graph)
        preds.append(next_state)
        prev, now = now, next_state
    return preds
```

##### 训练目标：多步加权 MSE

训练时 GraphCast 不只优化单步预测，而是在自回归展开后的多个 lead time 上计算误差。一个简化写法为：

$$
\mathcal{L}(\theta)=
\sum_{k=1}^{K}
\sum_{v \in \mathcal{V}}
\sum_{\ell \in \mathcal{L}_v}
\sum_{g \in \mathcal{G}}
w_k\,w_v\,w_{\ell}\,w_{\operatorname{lat}(g)}
\left\|
\hat{Y}^{v,\ell}_{t+6k}(g)-Y^{v,\ell}_{t+6k}(g)
\right\|_2^2
$$

其中 \(K\) 在训练过程中从 1 逐步增加到 12，对应从 6 小时到 3 天的 rollout。纬度权重修正经纬度网格面积差异，变量和垂直层权重避免某些量纲或层级支配损失。多步训练让模型适应“输入包含自己前一步预测”的部署状态，这对 10 天 rollout 尤其重要。

##### 为什么 residual output 有用

天气状态的绝对值包含强季节性、地理位置和气候均值，而 6 小时变化量更接近“动力增量”。GraphCast 让 decoder 预测 \(\Delta Y\)，再加回最近状态：

$$
\hat{Y}_{t+6h}=Y_t+\widehat{\Delta Y}_{t\rightarrow t+6h}
$$

这降低了学习难度，也更符合数值预报中“从初值积分一个小时间步”的思想。forcing 和 constants 则提供外部边界条件：例如太阳辐射与日周期影响温度和对流，地形与海陆掩码影响近地面风和降水。

##### 与 FourCastNet、Pangu-Weather 的差异

FourCastNet 在规则经纬度 patch 上用傅里叶域做全局混合，优势是推理快、结构简洁；Pangu-Weather 用 3D Earth-Specific Transformer 直接处理三维气压层结构；GraphCast 的核心优势是几何表示，把球面物理空间显式编码为 multi-mesh graph。它不是在二维图像上“假装地球是平面”，而是在 processor 内部让信息沿球面网格传播。

这也解释了 GraphCast 在热带气旋路径、大气河和极端温度等任务中的强表现：这些现象既有局地结构，也受大尺度环流控制。multi-mesh 的长短边同时存在，使模型在有限消息传递层数内兼顾局地和远程交互。

#### 🧪 练习题
```yaml
question: "GraphCast 中 multi-mesh 的核心作用是什么？"
options:
  - "把所有天气变量压缩成一个标量"
  - "在近似均匀的球面图上同时提供局地短边和跨尺度长边，提升消息传递效率"
  - "替代 ERA5 数据中的时间维度"
  - "让模型只预测地表变量，不预测气压层变量"
answer: 1
explain: "multi-mesh 合并了多个 icosahedral 细分层级的边，使 processor 能用较少 GNN 层传播局地和长程信息，这是 GraphCast 区别于普通经纬度网格网络的关键。"
```

### NowcastNet

```yaml
id: nowcastnet
num: 6
name: NowcastNet
full_name: 临近预报网络 (NowcastNet)
year: '2023'
org: Tsinghua University
parent: dgmr
paper_url: https://www.nature.com/articles/s41586-023-06184-4
project_url: ''
category: meteo_ai
motivation: 物理演变算子+深度学习极端降水预报
```

#### 📝 一句话总结
NowcastNet 将可微的降水物理演变算子与条件生成模型结合起来，用演变网络保证平流守恒和中尺度结构，用生成网络补足对流尺度细节，解决了极端降水临近预报中“纯外推会扩散、纯深度生成会违背物理”的矛盾。

#### 🎯 核心要点
- **物理条件生成框架**：由确定性的 evolution network \(\phi\) 与随机 generative network \(\theta\) 组成，输入过去雷达序列，输出未来降水集合预报
- **可微演变算子**：基于二维连续方程，将降水演化拆成 motion field 平流和 intensity residual 增减两部分
- **两路 U-Net 演变网络**：共享 evolution encoder，分别用 motion decoder 和 intensity decoder 预测 \(v_{1:T}\) 与 \(s_{1:T}\)
- **Physics-conditioning**：nowcast decoder 通过 spatially adaptive normalization 条件化于演变网络输出，把 20 km 中尺度物理结构注入 1-2 km 对流细节生成
- **GAN 式对流细节学习**：temporal discriminator 判断未来雷达序列真假，促使生成网络恢复纯平流模型遗漏的尖锐、多尺度降水纹理
- **Pool regularization**：对集合成员和观测做空间池化后匹配，避免逐像素损失过度惩罚混沌对流的位置偏差
- **极端降水训练权重**：加权 \(L_1\) 距离使用 \(w(x)=\min(24,1+x)\)，提高强降水像素在损失中的权重
- **3 小时高分辨率预报**：基于美国 MRMS 和中国雷达资料，可生成 \(2048\text{ km}\times2048\text{ km}\) 区域、最长 3 小时 lead time 的临近预报

#### 🔬 深入细节
##### 图示与可访问来源

![NowcastNet 架构图](https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41586-023-06184-4/MediaObjects/41586_2023_6184_Fig1_HTML.png)
*图：NowcastNet 的整体架构、演变网络和演变算子。若图片直链受网络策略影响，可访问 Nature 图页：https://www.nature.com/articles/s41586-023-06184-4/figures/1。论文为开放访问 Nature 文章。*

##### 背景：极端降水临近预报的两难

降水 nowcasting 通常依赖雷达回波序列，目标是在分钟到数小时尺度上预测未来降水。传统 pySTEPS/DARTS 一类外推方法使用平流思想：估计运动场，然后把当前雷达图像沿运动场搬运到未来。这类方法符合部分物理直觉，1 小时内常有效，但在对流触发、增长、衰减和强降水爆发时会迅速积累位置误差和模糊。

DGMR 等深度生成模型能产生时空连贯、较锐利的雷达序列，但如果只从数据中学习，可能出现不自然运动、强度漂移或违背平流守恒的结构。NowcastNet 的设计目标是把这两类方法合并：先用可微物理演变网络产生可信的中尺度轨迹，再用条件生成网络补足小尺度对流细节和不确定性。

##### 概率建模形式

NowcastNet 预测未来雷达/降水场 \(\hat{\mathbf{x}}_{1:T}\)，条件是过去雷达序列 \(\mathbf{x}_{-T_0:0}\) 和演变网络输出 \(\phi(\mathbf{x}_{-T_0:0})\)。随机性来自高斯潜变量 \(\mathbf{z}\)：

$$
P(\hat{\mathbf{x}}_{1:T}\mid \mathbf{x}_{-T_0:0},\phi;\theta)
=
\int
P(\hat{\mathbf{x}}_{1:T}\mid \mathbf{x}_{-T_0:0},
\phi(\mathbf{x}_{-T_0:0}), \mathbf{z};\theta)
P(\mathbf{z})\,d\mathbf{z}
$$

这意味着同一个初始雷达序列可以采样多个未来，形成集合预报。对于对流降水这种强混沌系统，集合比单一确定性图像更合理，因为小尺度触发位置常不可完全确定。

##### 演变网络：把连续方程做成可微算子

论文将降水演化写成修改后的二维连续方程：

$$
\frac{\partial \mathbf{x}}{\partial t}+(\mathbf{v}\cdot\nabla)\mathbf{x}=\mathbf{s}
$$

\(\mathbf{x}\) 是降水率或雷达场，\(\mathbf{v}\) 是运动场，\(\mathbf{s}\) 是强度残差。左侧的 \((\mathbf{v}\cdot\nabla)\mathbf{x}\) 表示平流搬运，右侧 \(\mathbf{s}\) 表示降水增长、衰减、生成和消散等非守恒过程。对每个未来步，NowcastNet 执行：

$$
\mathbf{x}'_t=\operatorname{Advect}(\mathbf{x}''_{t-1},\mathbf{v}_t)
$$

$$
\mathbf{x}''_t=\mathbf{x}'_t+\mathbf{s}_t
$$

演变网络用两路 U-Net 从过去雷达序列一次性预测所有未来步的 \(\mathbf{v}_{1:T}\) 和 \(\mathbf{s}_{1:T}\)。平流算子采用 backward semi-Lagrangian scheme；训练 motion field 时使用双线性插值保证梯度，实际演化时使用最近邻插值减少多步插值导致的模糊，并在相邻时间步之间 stop-gradient 提升稳定性。

##### 演变网络损失

演变网络的加权距离为：

$$
L_{\rm wdis}(\mathbf{x}_t,\mathbf{x}'_t)
=
\left\|
(\mathbf{x}_t-\mathbf{x}'_t)\odot \mathbf{w}(\mathbf{x}_t)
\right\|_1,
\qquad
\mathbf{w}(\mathbf{x})=\min(24,1+\mathbf{x})
$$

累积损失同时约束平流后结果和加入强度残差后的结果：

$$
J_{\rm accum}
=
\sum_{t=1}^{T}
\left[
L_{\rm wdis}(\mathbf{x}_t,(\mathbf{x}'_t)_{\rm bili})
+
L_{\rm wdis}(\mathbf{x}_t,\mathbf{x}''_t)
\right]
$$

运动场还要平滑，避免无物理意义的剧烈局地跳变：

$$
J_{\rm motion}
=
\sum_{t=1}^{T}
\left(
\|\nabla \mathbf{v}^{1}_{t}\odot \sqrt{\mathbf{w}(\mathbf{x}_t)}\|_2^2
+
\|\nabla \mathbf{v}^{2}_{t}\odot \sqrt{\mathbf{w}(\mathbf{x}_t)}\|_2^2
\right)
$$

总损失为：

$$
J_{\rm evolution}=J_{\rm accum}+\lambda J_{\rm motion}
$$

其中论文设置 \(\lambda=10^{-2}\)。强降水像素通过 \(\mathbf{w}(\mathbf{x})\) 获得更大权重，避免模型为了最小化平均误差而只拟合占多数的弱降水和无雨区域。

##### 生成网络：用物理条件控制对流细节

演变网络输出的是较可信的中尺度预测 \(\mathbf{x}''_{1:T}\)，但对流尺度的 1-2 km 细节常具有强随机性，不能只靠确定性平流得到。NowcastNet 的生成网络使用 nowcast encoder-decoder 和潜变量 \(\mathbf{z}\)，并在 decoder 中对每层激活做 spatially adaptive normalization：先归一化当前激活，再用从 \(\mathbf{x}''_{1:T}\) 计算出的空间位置相关均值/方差调制。

直觉上，演变网络告诉生成器“雨带应该往哪里走、哪些区域应持续有雨”，潜变量和 radar context 负责生成“雨带内部的纹理、局地增强和对流细胞”。这种 conditioning 减少了纯 GAN 任意生成的自由度，也避免了外推方法只会搬运旧图像的僵硬性。

##### 生成网络损失

temporal discriminator \(D\) 对未来序列做真假判别：

$$
J_{\rm disc}
=
L_{\rm ce}(D(\mathbf{x}_{1:T}),1)
+
L_{\rm ce}(D(\hat{\mathbf{x}}_{1:T}),0)
$$

生成器的对抗损失为：

$$
J_{\rm adv}=L_{\rm ce}(D(\hat{\mathbf{x}}_{1:T}),1)
$$

为了避免生成器因为对流位置微小偏差而被逐像素损失过度惩罚，NowcastNet 使用空间池化 \(Q(\cdot)\) 做 ensemble 级一致性约束。给定 \(k\) 个潜变量样本：

$$
J_{\rm pool}
=
L_{\rm wdis}\left(
Q(\mathbf{x}_{1:T}),
\frac{1}{k}\sum_{i=1}^{k}Q(\hat{\mathbf{x}}^{\mathbf{z}_i}_{1:T})
\right)
$$

生成网络目标为：

$$
J_{\rm generative}=\beta J_{\rm adv}+\gamma J_{\rm pool}
$$

论文中 \(k=4\)、\(\beta=6\)、\(\gamma=20\)。pool regularization 的关键作用是保留降水面积、强度和中尺度位置的一致性，同时允许对流细胞在小范围内有合理随机位移。

##### 伪代码：NowcastNet 训练/推理核心

```python
# NowcastNet 核心逻辑：物理演变 + 条件生成
def evolution_network(past_radar):
    context = evolution_encoder(past_radar)
    motion = motion_decoder(context)      # v_1:T
    residual = intensity_decoder(context) # s_1:T

    x_prev = past_radar[-1]
    evolved = []
    for t in range(T):
        x_advect = backward_semi_lagrangian(x_prev, motion[t])
        x_next = x_advect + residual[t]
        evolved.append(x_next)
        x_prev = stop_gradient(x_next)  # 提升多步演变稳定性
    return motion, residual, stack(evolved)  # x''_1:T


def nowcastnet_forward(past_radar, num_members=4):
    motion, residual, physics_forecast = evolution_network(past_radar)
    members = []
    for _ in range(num_members):
        z = normal_sample()
        h = nowcast_encoder(concat(past_radar, physics_forecast))
        # decoder 每层由 physics_forecast 产生空间自适应归一化参数
        pred = physics_conditioned_decoder(h, z, condition=physics_forecast)
        members.append(pred)
    return members, physics_forecast


def train_step(past_radar, future_radar):
    members, physics_forecast = nowcastnet_forward(past_radar)
    loss_evo = accumulation_loss(future_radar, physics_forecast) + motion_reg()
    loss_disc = discriminator_loss(future_radar, members)
    loss_gen = adversarial_loss(members) + pool_regularization(future_radar, members)
    return loss_evo, loss_disc, loss_gen
```

##### 与 DGMR 和 pySTEPS 的关键区别

相对于 pySTEPS，NowcastNet 不再把运动场估计、平流外推和强度变化当成分离模块，而是把它们变成可反向传播的 neural evolution operator，直接优化整个预报时段的误差。相对于 DGMR，NowcastNet 不只依赖生成器从雷达历史中学习未来分布，而是让生成器显式条件化在满足平流物理的演变预测上。

> 💡 关键：NowcastNet 不是简单把“物理模型输出”拼到神经网络输入里，而是用演变网络给生成器的每层 decoder 激活提供空间自适应归一化条件，从结构上约束生成过程跟随物理演变。

##### 局限性

NowcastNet 嵌入的是降水连续方程和平流守恒，尚未显式建模动量、热力、水汽微物理等完整大气过程。它适合雷达覆盖区域内的 0-3 小时降水 nowcasting；对缺少高质量雷达观测的地区，需要依赖迁移学习或引入卫星、数值模式等额外资料。

#### 🧪 练习题
```yaml
question: "NowcastNet 中 evolution network 的主要作用是什么？"
options:
  - "只负责把雷达图像压缩成低维文本描述"
  - "基于可微平流和强度残差生成符合降水演化物理的中尺度预测"
  - "替代 temporal discriminator 判断真假"
  - "将所有未来降水都预测为历史平均值"
answer: 1
explain: "evolution network 学习 motion fields 和 intensity residuals，并通过可微演变算子迭代得到物理上更可信的中尺度未来降水场，再作为生成网络的条件。"
```

### GenCast

```yaml
id: gencast
num: 7
name: GenCast
full_name: 生成式集合预报 (GenCast)
year: '2024'
org: Google DeepMind
parent: graphcast
paper_url: https://www.nature.com/articles/s41586-024-08252-9
project_url: ''
category: meteo_ai
motivation: 扩散模型概率集合预报解决平滑化
```

#### 📝 一句话总结
GenCast 将 GraphCast 式全球天气编码器-解码器改造成条件扩散集合预报器，用随机噪声反复去噪来采样 15 天全球天气轨迹，解决了 MSE 确定性模型在长时效下把不确定性平均成平滑场的问题。

#### 🎯 核心要点
- 概率建模目标：学习 \(p(x_t \mid x_{t-1}, x_{t-2})\)，递归采样 12 小时间隔的 15 天全球集合轨迹
- 扩散生成机制：从球面白噪声初始化候选未来天气场，经 20 个噪声层级、39 次去噪网络评估得到一个样本成员
- 地球几何适配：噪声不是经纬网格 i.i.d. Gaussian，而是在球面上采样各向同性白噪声再投影到经纬网格
- 架构继承 GraphCast：保留 GNN encoder/decoder，将 processor 换成 5 阶细分二十面体网格上的 sparse transformer
- 条件输入设计：把前两个 12 小时天气状态与待去噪场沿通道拼接，噪声强度通过 Fourier 特征和 conditional layer norm 注入
- 训练数据与尺度：使用 ERA5 再分析数据，0.25° 经纬网格，6 个地面变量与 6 个大气变量的 13 个气压层
- 评估结果：Nature 论文报告 GenCast 在 1,320 个目标中 97.2% 优于 ECMWF ENS，并能更好保留极端事件、热带气旋路径和风电风险信息

#### 🔬 深入细节
##### 来源与图示

![GenCast 扩散集合预报流程](https://ar5iv.labs.arxiv.org/html/2312.15796v1/assets/x1.png)
*图：GenCast 从纯噪声候选未来状态开始，在前两个天气状态条件下迭代去噪；不同初始噪声给出不同但物理一致的集合成员。来源：arXiv HTML 版 GenCast 论文 Figure 1。*

主要来源包括 Nature 论文 `https://www.nature.com/articles/s41586-024-08252-9`、arXiv HTML 正文 `https://arxiv.org/html/2312.15796v1`，以及 Google DeepMind 技术博客 `https://deepmind.google/blog/gencast-predicts-weather-and-the-risks-of-extreme-conditions-with-sota-accuracy/`。Nature 页面可直接访问摘要和结果；方法细节更完整地出现在 arXiv 版本中。

##### 问题背景：为什么普通集合扰动不够

GraphCast、Pangu-Weather 等模型通常以 MSE/RMSE 为训练目标。这个目标会把多个可能天气轨迹的平均值当作最优输出：当未来低压中心可能偏东或偏西时，MSE 模型倾向于输出一个居中的、能量更弱的场。这种“平均天气”在单点 RMSE 上可能不错，但对风险决策很糟糕，因为极端风速、降水带和气旋路径都会被平滑。

传统 NWP 的 ENS 通过多个物理积分成员刻画不确定性，但计算成本高。GenCast 的核心选择是把中期天气预报视为条件生成问题：给定最近两个天气状态，不直接输出均值，而是从条件分布中采样多个 sharp trajectory。每个样本成员都应像真实大气状态一样有合理的小尺度谱能量；集合均值可以平滑，但单个成员不应平滑。

##### 条件扩散形式

令 \(x_t\) 表示 12 小时间隔的全球天气状态，包含地面变量和多层大气变量。论文将长期轨迹分解为一系列局部条件分布：

$$
p(x_{1:T} \mid x_{-1}, x_0)
= \prod_{t=1}^{T} p(x_t \mid x_{t-1}, x_{t-2})
$$

对每一步 \(p(x_t \mid x_{t-1}, x_{t-2})\)，GenCast 使用 EDM/Karras 风格的去噪扩散。训练时把真实目标 \(x_t\) 加入球面噪声：

$$
\tilde{x}_t(\sigma) = x_t + \sigma \epsilon,\quad
\epsilon \sim \mathcal{N}_{\mathbb{S}^2}(0, I)
$$

去噪器 \(D_\theta\) 接收 \(\tilde{x}_t(\sigma)\)、噪声强度 \(\sigma\)、以及条件状态 \(x_{t-1}, x_{t-2}\)，输出对无噪声目标的估计。训练目标是带变量权重、纬度面积权重和噪声层级权重的 MSE：

$$
\mathcal{L}(\theta)=
\mathbb{E}_{t,\sigma,\epsilon}
\sum_{v,i}
w_v\,a_i\,\lambda(\sigma)
\left\|D_\theta(\tilde{x}_{t,v,i}, \sigma, x_{t-1}, x_{t-2}) - x_{t,v,i}\right\|_2^2
$$

其中 \(v\) 是变量/气压层索引，\(i\) 是经纬网格点，\(a_i\) 修正等经纬网格在高纬度面积更小的问题，\(\lambda(\sigma)\) 是 EDM 的噪声级别权重。

##### 采样伪代码

```python
# GenCast 单个集合成员的 15 天采样流程
def gencast_rollout(x_minus_1, x_0, horizon_steps=30):
    # 12h 步长，30 步 = 15 天
    history = [x_minus_1, x_0]
    trajectory = []

    for step in range(horizon_steps):
        # 在球面上采样白噪声，并投影到 0.25° 经纬网格
        y = sample_spherical_white_noise(sigma_max=80.0)

        # 20 个噪声层级；DPMSolver++2S 每层通常调用两次 denoiser
        for sigma_hi, sigma_lo in noise_schedule(num_levels=20):
            cond = concat_channels(history[-1], history[-2])
            denoised = D_theta(y, sigma_hi, cond)
            y = dpm_solver_2s_step(y, denoised, sigma_hi, sigma_lo)
            y = stochastic_churn_and_noise_inflation(y, sigma_lo)

        x_next = y
        trajectory.append(x_next)
        history.append(x_next)

    return trajectory

def generate_ensemble(x_minus_1, x_0, members=50):
    return [gencast_rollout(x_minus_1, x_0) for _ in range(members)]
```

##### 模型结构：GraphCast 外壳，Sparse Transformer 核心

GenCast 不是在经纬网格上直接做全局注意力。它继承 GraphCast 的三段式结构：encoder 把经纬网格变量映射到球面 mesh，processor 在 mesh 上做信息传播，decoder 再把 mesh 状态映射回经纬网格。差异在 processor：GraphCast 使用多尺度图神经网络，GenCast 使用 sparse transformer。

论文中的 processor 运行在 5-refined icosahedral mesh 上，约 10,242 个节点和 61,440 条边。每个 transformer block 的注意力不是全连接，而是让 mesh 节点关注自己和 16-hop 邻域，近似球面上的滑动窗口注意力。这样做有两个作用：第一，避免 \(O(N^2)\) 全局注意力；第二，比规则经纬窗口更适合地球球面几何。

噪声强度 \(\sigma\) 不是简单拼成一个标量输入。GenCast 将 \(\log\sigma\) 编码为多频 Fourier 特征，再通过 MLP 生成条件层归一化参数。直觉上，同一个网络在高噪声层级学习大尺度轮廓，在低噪声层级补充锋面、湿度带和风场细节；conditional layer norm 让网络知道当前应执行“粗去噪”还是“细修复”。

##### 为什么球面噪声重要

如果直接在经纬网格上加 i.i.d. 噪声，高纬度会因为网格汇聚而获得不符合球面面积的随机结构。GenCast 改为在球面上采样各向同性 Gaussian white noise，使噪声在球谐谱上期望平坦，再投影到经纬网格。这与天气场的物理表征一致，也避免扩散过程在极区学到网格伪影。

##### 与 GraphCast-Perturbed 和 ENS 的区别

GraphCast-Perturbed 的集合来自扰动初值后多次运行确定性模型；模型本身仍被 MSE 训练成条件均值，所以长 lead time 的成员会共同变平滑。GenCast 的随机性出现在生成过程内部，训练目标直接学习条件分布的去噪场，因此单个成员可以保持 sharp。ENS 则依靠物理模式和资料同化扰动，可靠但昂贵；GenCast 把大量成本前置到训练，推理时可并行生成多个成员。

> 💡 关键：GenCast 的集合均值可以用于 RMSE/CRPS，单个成员可以用于极端事件路径和强度风险；这两者通过扩散采样同时得到，而不是事后给确定性预报加噪声。

#### 🧪 练习题
```yaml
- question: "GenCast 为什么能缓解确定性 AI 天气模型的长时效平滑问题？"
  options:
    - "它把所有变量降到更低分辨率后再预报"
    - "它直接从条件分布中采样多个 sharp 天气轨迹，而不是只学习 MSE 条件均值"
    - "它完全去掉了自回归滚动"
    - "它只预测集合均值，不预测成员"
  answer: 1
  explain: "MSE 确定性模型倾向于输出多个可能未来的平均场；GenCast 用条件扩散采样生成多个可能轨迹，单个成员能保留物理细节和极端结构。"
```

### AIFS v2

```yaml
id: aifs_v2
num: 8
name: AIFS v2
full_name: ECMWF人工智能预报系统v2 (AIFS v2)
year: '2026.05'
org: ECMWF
parent: gencast
paper_url: https://www.ecmwf.int/en/about/media-centre/news/2026/significant-update-ecmwfs-key-forecasting-systems-ifs-and-aifs-go-live
project_url: ''
category: meteo_ai
motivation: 首个业务化AI海浪积雪预报系统
```

#### 📝 一句话总结
AIFS v2 是 ECMWF 在 2026-05-12 投入业务运行的第二代 AI 预报系统升级，把确定性 AIFS Single 与概率 AIFS ENS 同步扩展到数据驱动海浪、雪盖和 10 hPa 平流层预报，并通过新训练数据、变量约束和多尺度集合损失提升业务一致性。

#### 🎯 核心要点
- 业务上线时间：AIFS Single v2 与 AIFS ENS v2 均在 2026-05-12 06 UTC run 随 IFS Cycle 50r1 同步实施
- 新业务变量：首次提供 ECMWF operational data-driven wave forecasts，含 11 个海浪变量，并新增 snow cover fraction 预报
- Single v2：架构保持 AIFS Single v1.1 不变，主要升级训练制度，使用 ERA5 1979-2022 预训练与 2018-2024 operational/50r1 esuite analysis 微调
- ENS v2：从 AIFS ENS v1 升级为多尺度 proper-score 训练，加入与 Single 一致的变量 bounding、更多 decoder edges 与新 edge features
- 物理一致性：降水、云量、海浪、雪盖等诊断变量通过 bounding layer 或 fraction bounding 避免负值和内部不一致
- 分辨率与产品：N320 约 31 km，0.25° dissemination，15 天预报，6 小时间隔，每日 00/06/12/18 四次运行
- 10 hPa 平流层扩展：压力层从 13 层增至 14 层，补入 10 hPa，改善 50/100 hPa 技能并让 sudden stratospheric warming 能出现在 AIFS 预报中
- 来源限制：给定 paper_url 是 ECMWF 新闻页而非论文；方法级细节需结合 ECMWF AIFS v2 implementation pages、AIFS Single 1.1.0 GMD 论文、AIFS-CRPS 与 multi-scale loss 预印本解读

#### 🔬 深入细节
##### 来源与图示

![AIFS 编码器、处理器与解码器结构](https://arxiv.org/html/2406.01465v1/x3.png)
*图：AIFS 的 GNN encoder/decoder 与 transformer processor block 示意。AIFS Single v2 implementation page 明确说明 Single v2 不改变 v1.1 架构，因此该图仍可作为 Single v2 主体结构参考。来源：AIFS arXiv 论文 Figure 3。*

主要来源包括 ECMWF 新闻 `https://www.ecmwf.int/en/about/media-centre/news/2026/ifs-cycle-50r1-aifsv2-live`、AIFS Single v2 实施页 `https://confluence.ecmwf.int/display/FCST/Implementation%2Bof%2BAIFS%2BSingle%2Bv2`、AIFS ENS v2 实施页 `https://confluence.ecmwf.int/display/FCST/Implementation%2Bof%2BAIFS%2BENS%2Bv2`、AIFS 架构论文 `https://arxiv.org/html/2406.01465v1`、AIFS Single 1.1.0 GMD 论文 `https://gmd.copernicus.org/articles/19/4703/2026/` 与多尺度损失预印本 `https://arxiv.org/html/2506.10868v1`。

##### 系统定位：不是单篇论文，而是业务系统升级

AIFS v2 的目标不是提出一个全新 backbone，而是把 ECMWF 已经业务化的 AI 预报系统推进到更完整的地球系统变量集合。2026-05-12 的升级同时包含 IFS Cycle 50r1 和 AIFS v2：IFS 提供新的物理模式、耦合同化和初始场；AIFS v2 必须同步 fine-tune 到 50r1 的 analysis/esuite 数据，否则从新 IFS 初值启动会出现性能退化。

因此，AIFS v2 可以理解为三层升级：

1. **AIFS Single v2**：确定性中期预报，仍是 graph encoder/decoder + sliding-window transformer processor，重点更新训练数据和变量表。
2. **AIFS ENS v2**：集合预报，面向概率技能，使用 proper-score 训练，并把 v1 的 afCRPS 换成多尺度 loss。
3. **业务产品层**：新增 wave stream、snow cover fraction、10 hPa pressure level，并统一文件流、优先级和 dissemination 规则。

##### AIFS Single v2 的训练与推理流程

Single v2 与 AIFS 论文中的基本形式一致：输入两个相邻大气状态和静态/天文 forcing，输出 6 小时后的状态；15 天预报通过自回归 rollout 得到。

```python
# AIFS Single v2 确定性业务预报伪代码
def aifs_single_v2_forecast(ifs_control_analysis, forcings, lead_hours=360):
    # IFS control initial condition 被 regrid 到 N320，大约 0.25° / 31 km
    x_tm6, x_t = make_two_state_initial_window(ifs_control_analysis)
    outputs = []

    for lead in range(6, lead_hours + 1, 6):
        inputs = {
            "previous_state": x_tm6,
            "current_state": x_t,
            "forcings": forcings.at(lead),
        }
        raw = aifs_graph_transformer(inputs)

        # v2 变量表包含 atmospheric/land/wave prognostic variables
        # 以及 TP/CP/FSCOV/SSRD/cloud 等 diagnostic outputs
        y = apply_variable_bounds_and_fraction_constraints(raw)
        outputs.append(y)

        x_tm6, x_t = x_t, y

    return outputs
```

AIFS 主干使用 GNN encoder/decoder 处理原始格点与内部处理网格之间的信息映射，processor 使用 transformer block。GNN 的优势是能处理 ECMWF 的 reduced Gaussian grid 和不同输出网格；processor 则负责在 latent mesh 上传播天气系统。训练阶段先在 ERA5 上学习泛化动力，再用 operational analysis 和 50r1 esuite analysis 做 rollout fine-tuning，以贴近业务初值分布。

Single v2 implementation page 给出的关键训练参数是：ERA5 1979-2022 预训练 260,000 steps；2018-2024 operational analysis 与 IFS 50r1 esuite analysis 微调 7,900 steps；batch size 16；cosine learning rate schedule。它还说明架构不变，这意味着 v2 的收益主要来自数据分布更新、变量扩展、10 hPa 平流层和业务初值匹配，而不是重新设计网络。

##### AIFS ENS v2：从 afCRPS 到多尺度 proper score

AIFS ENS 的训练目标是让集合成员形成一个校准的预测分布。基础 CRPS 可以写成：

$$
\operatorname{CRPS}(F, y)
= \mathbb{E}_{X \sim F}|X-y|
- \frac{1}{2}\mathbb{E}_{X,X' \sim F}|X-X'|
$$

有限 \(M\) 个集合成员 \(\{x_m\}_{m=1}^{M}\) 时，经验形式是：

$$
\widehat{\operatorname{CRPS}}
= \frac{1}{M}\sum_{m=1}^{M}|x_m-y|
- \frac{1}{2M^2}\sum_{m=1}^{M}\sum_{n=1}^{M}|x_m-x_n|
$$

ENS v1 使用 afCRPS 来减少有限集合偏差；ENS v2 的 implementation page 明确写出把 afCRPS loss 替换为 multi-scale loss。多尺度思想是先用平滑算子 \(S_k\) 把场分解成大尺度与小尺度分量，再在各尺度上计算 proper score：

$$
\mathcal{L}_{multi}
= \sum_{k=1}^{K}\alpha_k\,
\operatorname{afCRPS}\left(S_k(\{x_m\}_{m=1}^{M}),\, S_k(y)\right)
$$

其中 \(S_1\) 可以是强平滑后的 synoptic-scale 场，\(S_2\) 是剩余的小尺度结构。这样训练不会只优化点位 CRPS，还能约束谱空间和空间尺度上的方差分布。ECMWF 的 multi-scale loss 论文把平滑算子实现为稀疏矩阵乘法，使用 Gaussian kernel，标准差为 8 倍网格距。

```python
# AIFS ENS v2 多尺度集合训练伪代码
def train_aifs_ens_v2(batch):
    members = []
    for seed in ensemble_seeds:
        member = rollout_shared_weights(
            initial_state=batch.initial_state,
            perturbation=sample_member_perturbation(seed),
            steps=12,  # rollout fine-tuning 到 72h
        )
        members.append(apply_variable_bounds(member))

    loss = 0.0
    for smoother, alpha in [(identity, 0.5), (gaussian_smooth_8dx, 0.5)]:
        pred_scale = [smoother(m) for m in members]
        target_scale = smoother(batch.analysis_target)
        loss += alpha * almost_fair_crps(pred_scale, target_scale)

    loss.backward()
    optimizer.step()
```

##### 变量 bounding：把物理约束放进模型输出层

AIFS Single 1.1.0 GMD 论文解释了 bounding layer 的动机：MSE 训练的神经网络会输出负降水、云量比例越界、convective precipitation 大于 total precipitation 等物理不可能情况。一个简单但有效的约束是：

$$
\hat{p} = \operatorname{ReLU}(\eta) = \max(0, \eta)
$$

对比例变量可用上下界映射：

$$
\hat{f} = \min(1, \max(0, \eta))
$$

对满足“部分不得超过总体”的变量，可用 fraction bounding：

$$
\widehat{cp} = \widehat{tp}\cdot \sigma(\eta_{cp})
$$

这样保证 \(\widehat{cp}\in[0,\widehat{tp}]\)。ENS v2 implementation page 说明它引入与 Single 一致的 variable bounds，因此集合成员不仅要概率校准，还要逐成员满足基本物理范围。

##### 海浪与雪盖：为什么是业务意义上的关键升级

新闻页和实施页都强调 v2 首次提供数据驱动 wave forecasts。Single v2 和 ENS v2 都新增 wave stream：Single 使用 `stream=wave`，ENS 使用 `stream=waef`。变量包含 significant wave height、mean wave period、mean wave direction、wave drag coefficient，以及多个周期段的 significant wave height。ECMWF 指出 Single v2 的 significant wave height 中期技能相较当前 operational IFS wave forecasts 和 IFS Cycle 50r1 wave model 约提升 10%，但南极夏季海冰边缘存在负偏差和 smoothing 问题。

雪盖方面，AIFS v2 新增 fraction of snow cover（FSCOV）作为诊断输出，ECMWF 新闻称其比 IFS Cycle 50r1 更接近观测。这里的算法意义在于：雪盖不是纯大气变量，它受地表温度、降水相态、土壤/地表状态和历史积雪共同影响。AIFS v2 把它纳入同一个自回归状态空间，使 land-atmosphere memory 能被网络利用。

##### 与 GenCast 的关系

元信息里把 AIFS v2 的 parent 指向 GenCast，更准确地说，AIFS ENS v2 与 GenCast 都属于“用生成/概率训练替代确定性均值”的路线，但实现不同。GenCast 每个 12 小时步长需要多次扩散去噪；AIFS ENS/CRPS 路线通过 proper score 直接训练随机集合成员，一步推理只需一次模型调用。AIFS v2 的多尺度 loss 进一步借鉴扩散模型的尺度控制直觉：不是靠噪声 schedule 显式分层，而是在 loss 中显式要求不同空间尺度都合理。

> 💡 关键：AIFS v2 的贡献主要在 operationalization。它把 AI 预报从“上层大气和常规地面变量的实验图”扩展到海况、雪盖、平流层和集合产品，并接入 ECMWF 的四次日常业务生产链。

#### 🧪 练习题
```yaml
- question: "AIFS ENS v2 相比 AIFS ENS v1 的关键训练变化是什么？"
  options:
    - "完全改用扩散采样，每步需要几十次去噪"
    - "把 afCRPS 替换为多尺度 proper-score loss，并加入变量 bounding"
    - "取消自回归 rollout，只预测 6 小时"
    - "只训练海浪变量，不再训练大气变量"
  answer: 1
  explain: "ECMWF implementation page 明确列出 ENS v2 的架构/训练变化：multi-scale loss、与 Single 一致的 variable bounding、修订图特征和更多 decoder edges。"
```

### FengWu-GHR

```yaml
id: fengwu_ghr
num: 9
name: FengWu-GHR
full_name: 风乌高分辨率 (FengWu-GHR)
year: '2026'
org: Shanghai AI Lab
parent: pangu_weather
paper_url: https://arxiv.org/abs/2402.00059
project_url: ''
category: meteo_ai
motivation: 11.25天预报突破10天天花板
```

#### 📝 一句话总结
FengWu-GHR 提出把低分辨率预训练全球天气模型通过 SIME 分解映射、DCTL 局地区域增强和逐步 LoRA 微调迁移到 0.09° 约 9 km 全球高分辨率预报，在保持中期稳定性的同时补足小尺度天气结构。

#### 🎯 核心要点
- 全球 9 km 级分辨率：论文称 FengWu-GHR 是首个运行在 0.09° 经纬网格上的数据驱动全球中期天气预报模型
- 低分辨率到高分辨率迁移：先在 ERA5 1979-2021 的低分辨率长期资料上预训练，再用 2016-2021 高分辨率 operational analysis 做迁移学习
- Meta model：以 2D patch embedding、stacked transformer blocks、deconvolution recovery 为核心，处理 5 个上层变量的 13 个气压层和 4 个地面变量
- SIME：Spatial Identical Mapping Extrapolate 将高分辨率场拆成多个空间位置一致的低分辨率子场，避免直接插值造成 token 代表面积不一致
- DCTL/RES：Decompositional and Combinational Transfer Learning 在 transformer 中插入 Regional Enhanced Simulation 局部注意力模块，学习 patch 内小尺度对流和地形相关结构
- 逐步 LoRA：每个 6 小时 rollout step 使用独立 low-rank adaptation 参数，纠正长时效滚动中的 step-specific bias
- 评估设计：2022 年 operational analysis 和全球站点观测验证，论文报告 FengWu-GHR 在多数变量、多个 lead time 上优于 IFS-HRES 与 Pangu-Weather
- 工程代价：模型参数超过 4B；核心贡献不是简单扩大网络，而是把低分辨率知识以较低增量成本迁移到高分辨率业务分析场

#### 🔬 深入细节
##### 来源与图示

![FengWu-GHR 方法结构](https://ar5iv.labs.arxiv.org/html/2402.00059v1/assets/x1.png)
*图：FengWu-GHR 的四段流程：低分辨率预训练、SIME 高分辨率外推、DCTL 区域增强迁移学习、逐步 LoRA 长时效修正。来源：arXiv HTML 版论文 Figure 1。*

主要来源是 arXiv 论文 `https://arxiv.org/html/2402.00059v1` 与 Shanghai AI Lab PDF 镜像 `https://img.shlab.org.cn/pjlab/files/2024/03/638451437340550000.pdf`。给定 YAML 的 `year: '2026'` 与 arXiv 提交时间 2024-01-28 不完全一致；本文按任务元信息保留年份，同时方法内容基于可访问论文正文。

##### 为什么高分辨率 AI 天气预报困难

Pangu-Weather、GraphCast、FengWu 等模型证明了 0.25° 级别 AI 预报的能力，但 9 km 全球预报有两个更硬的问题。第一，训练数据少：ERA5 提供长期再分析，但 9 km operational analysis 在 ECMWF 体系里主要从 2016 年以后可用，时间跨度远短于 40 年级别的 ERA5。第二，计算成本陡增：经纬分辨率从 0.25° 提高到 0.09°，格点数约增加 7-8 倍，注意力或图传播的显存与计算都会迅速膨胀。

直接训练一个 9 km 全球 transformer 既缺数据也缺算力；把低分辨率预报再插值到高分辨率又无法恢复小尺度天气过程。FengWu-GHR 的路线是“继承低分辨率动力学 + 小成本补学习高分辨率残差”：先学多年低分辨率大尺度演化，再让高分辨率输入以低分辨率模型熟悉的空间语义进入网络，最后用局部模块和 LoRA 修正高分辨率细节与长时效偏差。

##### Meta model：可迁移的基础预报器

论文的 meta model 接收一个堆叠天气状态 \(X_t\)，输出 6 小时后的状态 \(\hat{X}_{t+1}\)。变量集合包括：

- 上层变量：geopotential \(z\)、specific humidity \(q\)、zonal wind \(u\)、meridional wind \(v\)、air temperature \(t\)，每个变量 13 个 pressure levels
- 地面变量：2 m temperature、10 m u/v wind、mean sea level pressure

基础结构是 ViT 风格：

$$
Z_0 = \operatorname{PatchEmbed}(X_t),\quad
Z_{\ell+1} = \operatorname{TransformerBlock}_{\ell}(Z_\ell),\quad
\hat{X}_{t+1} = \operatorname{DeconvRecover}(Z_L)
$$

为了控制高分辨率成本，论文没有使用全局密集注意力，而是交替使用 local-window 与 global-window interaction，并把窗口形状逐步设为 square、zonal rectangle、meridional rectangle，以注入天气带状环流和经纬方向差异的先验。

##### SIME：把高分辨率场拆成低分辨率语义一致的子场

低分辨率 patch embedding 的卷积核学到的是“一个 token 代表多大地理面积”。如果把 0.09° 输入直接送入低分辨率预训练模型，同样大小的卷积核只覆盖更小真实面积，token 语义会错位。SIME 的做法是将高分辨率场 \(X^{HR}\) 分解为 \(r^2\) 个低分辨率子场，每个子场抽取同一相对位置的格点：

$$
X^{LR}_{a,b}[i,j] = X^{HR}[ri+a, rj+b],\quad a,b \in \{0,\ldots,r-1\}
$$

这样 \(X^{LR}_{a,b}\) 的相邻 token 间距恢复为低分辨率模型训练时熟悉的空间尺度。模型分别预测每个子场，再按原始相对位置组合回高分辨率输出：

$$
\hat{X}^{HR}[ri+a, rj+b] =
f_{\theta}(X^{LR}_{a,b})[i,j]
$$

SIME 的收益是把一次超大高分辨率推理转成一批低分辨率语义一致的推理，论文称计算复杂度可降低到直接处理高分辨率序列的约九分之一。但 SIME 本身仍会忽略同一高分辨率 patch 内相邻格点之间的小尺度相互作用，因此还需要 DCTL。

##### DCTL 与 RES：补回小尺度天气过程

Decompositional and Combinational Transfer Learning 的核心是：先用 SIME 分解，让基础模型能运行；在若干 transformer block 后插入 Regional Enhanced Simulation 模块，让分解后的 token 暂时回到原始高分辨率空间布局，在局部窗口内做 attention，再变回分解序列继续前向。

```python
# FengWu-GHR 前向传播伪代码
def fengwu_ghr_forward(x_hr, step_id):
    # 1. SIME: 高分辨率场按相对格点位置拆成多个低分辨率子场
    subfields = spatial_identical_mapping_decompose(x_hr, ratio=3)
    tokens = patch_embed(subfields)

    # 2. 低分辨率预训练 transformer 主干
    for block_id, block in enumerate(meta_transformer_blocks):
        tokens = block(tokens)

        # 3. DCTL/RES: 在少数层恢复局部高分辨率布局，学习 patch 内小尺度关系
        if block_id in res_insert_layers:
            grid = rearrange_tokens_to_hr_layout(tokens)
            grid = regional_enhanced_attention(grid, window_size=(w_lat, w_lon))
            tokens = rearrange_hr_layout_to_tokens(grid)

    # 4. Step-specific LoRA: 对每个 rollout 步使用独立低秩修正
    tokens = apply_lora_for_step(tokens, step_id)
    pred_subfields = deconv_recover(tokens)

    # 5. 组合回 0.09° 高分辨率全球场
    return spatial_identical_mapping_combine(pred_subfields)
```

RES 模块的意义在于让同一个高分辨率 patch 内的格点重新交互。没有 RES 时，SIME 把 patch 内不同相对位置拆到不同 batch 元素中，模型只能分别处理它们，容易丢失对流单体、地形降水、锋面细节等局地结构。RES 用少量局部注意力模块弥补这一点，避免完全训练一个昂贵的高分辨率全局 transformer。

##### 逐步 LoRA：为长时效滚动分配不同偏差修正

FengWu-GHR 的基础步长是 6 小时。10 天预报需要 40 次自回归调用，11.25 天则需要 45 次。不同 lead time 的误差形态并不相同：前几步主要受初值与高频调整影响，中后期会出现系统性 bias drift 和振幅衰减。用同一套微调参数修正所有 step 会产生冲突。

论文为每个 step \(s\) 引入独立 LoRA：

$$
W_s = W_0 + \alpha B_s A_s,\quad
B_s \in \mathbb{R}^{d \times r},\quad
A_s \in \mathbb{R}^{r \times k},\quad r \ll \min(d,k)
$$

其中 \(W_0\) 是冻结的预训练权重，只有 \(A_s,B_s\) 可训练。前向传播变为：

$$
h' = W_0 h + \alpha B_s A_s h
$$

这给每个 lead step 一个低成本、互不冲突的修正空间。相比全量微调，它避免破坏低分辨率预训练动力学；相比共享微调，它允许第 5 天和第 10 天使用不同偏差修正。

##### 损失与评估指标

训练目标可写成面积加权误差。对变量 \(v\)、格点 \(i,j\)、纬度权重 \(a_i \propto \cos(\phi_i)\)：

$$
\mathcal{L}_{forecast}
= \sum_{v}\lambda_v
\frac{\sum_{i,j} a_i
\left(\hat{X}_{v,i,j}-X_{v,i,j}\right)^2}
{\sum_{i,j} a_i}
$$

评估中常用纬度加权 RMSE：

$$
\operatorname{RMSE}_{v}(\tau)
= \sqrt{
\frac{1}{T}
\sum_t
\frac{\sum_{i,j} a_i
\left(\hat{X}_{t+\tau,v,i,j}-X_{t+\tau,v,i,j}\right)^2}
{\sum_{i,j} a_i}}
}
$$

以及 ACC：

$$
\operatorname{ACC}_{v}(\tau)
=
\frac{\sum_{i,j}a_i(\hat{X}_{v,i,j}-C_{v,i,j})(X_{v,i,j}-C_{v,i,j})}
{\sqrt{\sum_{i,j}a_i(\hat{X}_{v,i,j}-C_{v,i,j})^2}
\sqrt{\sum_{i,j}a_i(X_{v,i,j}-C_{v,i,j})^2}}
$$

论文在 2022 年 operational analysis 上与 IFS-HRES 对比，并在 NCEI 全球站点数据上验证 2 m temperature 和 surface wind。结果部分报告 10 天 T850 RMSE 从 IFS-HRES 的 3.76 降至 FengWu-GHR 的 2.86，并强调在站点温度预报、热浪和冬季风暴案例中高分辨率带来更细粒度的空间结构。

##### 与 Pangu-Weather 的区别

Pangu-Weather 的核心是 3D Earth-Specific Transformer 和多时效层次聚合，主要解决三维大气表示与迭代误差问题；FengWu-GHR 的核心是跨分辨率迁移。它不只是把 0.25° 预报插值到 0.09°，而是在高分辨率 operational analysis 上学习 patch 内局地关系，并用逐步 LoRA 稳定长时效滚动。

> 💡 关键：FengWu-GHR 的方法论可以概括为“低分辨率学大尺度物理，高分辨率学局地残差，LoRA 学 lead-time 偏差”。这正是高分辨率 AI 预报在数据不足与算力受限下的折中。

#### 🧪 练习题
```yaml
- question: "FengWu-GHR 中 SIME 的主要作用是什么？"
  options:
    - "把高分辨率场直接插值成低分辨率输出，减少产品文件大小"
    - "把高分辨率输入拆成空间语义一致的低分辨率子场，使低分辨率预训练模型可以合理外推到 0.09°"
    - "用随机噪声生成多个集合成员"
    - "替代所有 transformer block，改用纯卷积网络"
  answer: 1
  explain: "SIME 解决高分辨率输入下 patch token 代表面积与预训练阶段不一致的问题；它把 HR 场按相对位置拆成 LR 子场，再组合回 HR 输出。"
```

### WeatherBench

```yaml
id: weatherbench
num: 10
name: WeatherBench
full_name: 天气基准数据集 (WeatherBench)
year: '2020'
org: Google Research
parent: —
paper_url: https://arxiv.org/abs/2002.00469
project_url: ''
category: climate_ai
motivation: 建立AI气象预报基准数据集
```

#### 📝 一句话总结
WeatherBench 提出了面向数据驱动中期天气预报的标准化 ERA5 数据集、训练/验证/测试切分、纬度加权评估指标和强基线，解决了早期 AI 气象预报论文之间数据、分辨率和指标不可比的问题。

#### 🎯 核心要点
- **标准化数据管线**：从 ERA5 再分析资料构建机器学习可用的 NetCDF 数据，覆盖 1979-2018 年，并提供 5.625°、2.8125°、1.40625° 三档重网格分辨率
- **多变量气象状态**：包含位势、温度、比湿、风场、涡度、潜在涡度等多层大气变量，2m 温度、10m 风、云量、降水、太阳辐射等地面变量，以及地形、陆海掩膜、经纬度等静态场
- **直接预报与迭代预报两种任务形式**：支持直接学习 \(x_t \rightarrow x_{t+\tau}\)，也支持学习 6 小时短步长模型后自回归迭代到多日预报
- **纬度加权验证指标**：以 Z500 和 T850 的纬度加权 RMSE 为主指标，同时提供 ACC、MAE 等补充指标，避免高纬度等经纬网格过度影响全球平均
- **可复现基线体系**：给出 persistence、climatology、weekly climatology、线性回归、5 层 CNN、低分辨率 IFS、业务 IFS 等基准结果
- **明确的测试协议**：最终评估使用 2017-2018 年，建议保留 2016 年做验证，降低超参数调优对测试集过拟合的风险
- **研究定位清晰**：WeatherBench 本身不是新模型，而是把 AI 天气预报问题转化为可复现实验协议，为 FourCastNet、Pangu-Weather、GraphCast 等后续模型提供共同参照系

#### 🔬 深入细节
##### 图示与来源

![WeatherBench 数据驱动预报示意](https://ar5iv.labs.arxiv.org/html/2002.00469/assets/x1.png)
*图：WeatherBench 论文 Figure 1。左侧是直接预测固定 lead time，右侧是用短步长模型递归生成长时效预报。图片来自 ar5iv 的 arXiv HTML 渲染，论文和代码仓库均可公开访问。*

##### 问题背景与动机

WeatherBench 的关键贡献不是提出更复杂的神经网络，而是定义了一个可比较的问题。早期数据驱动天气预报论文常各自选择数据年份、变量、网格分辨率、预报时效和指标；一个模型看起来更好，可能只是因为评估变量更容易、测试年份更短、分辨率更低，或没有与物理数值天气预报系统对齐比较。

论文选择 ERA5 作为数据源，是因为 ERA5 将观测和短期数值预报同化为全球一致的大气状态估计，可作为训练和评估的近似真值。原始 ERA5 是 0.25°、每小时、37 个垂直层的巨大数据集，不适合大多数机器学习实验直接使用。WeatherBench 将它重网格到较低分辨率，并按变量、年份整理成 NetCDF 文件，使研究者可以从标准任务起步。

WeatherBench 的任务抽象是学习全球气象状态的状态转移：

$$
\hat{x}_{t+\tau} = f_\theta(x_t, \tau)
$$

其中 \(x_t\) 是某一时刻的多变量经纬度网格场，\(\tau\) 是预报时效。直接预报为每个 \(\tau\) 训练或调用模型；迭代预报则学习短步长映射 \(f_\theta(x_t)\approx x_{t+6h}\)，再反复调用得到 3 天、5 天甚至更长时效。

##### 数据与变量设计

WeatherBench 处理后的数据保留三类信息：

- 多层大气变量：例如 geopotential、temperature、specific humidity、u/v wind、relative vorticity、potential vorticity，在 50、100、150、200、250、300、400、500、600、700、850、925、1000 hPa 等压力层上提供
- 单层地面变量：例如 2m temperature、10m u/v wind、total cloud cover、total precipitation、TOA incident solar radiation
- 静态地理变量：例如 land-sea mask、soil type、orography、latitude、longitude

重网格分辨率分别为：

| 分辨率 | 网格大小 | 典型用途 |
|---|---:|---|
| 5.625° | \(32 \times 64\) | 快速实验、论文主基准 |
| 2.8125° | \(64 \times 128\) | 中等成本训练 |
| 1.40625° | \(128 \times 256\) | 更接近高分辨率 AI 预报模型 |

> 💡 关键：WeatherBench 把气象数据“清洗成 ML 问题”，但没有移除气象学约束。Z500 仍用于衡量大尺度环流，T850 仍用于衡量边界层以上温度结构，纬度权重仍反映球面网格面积差异。

##### 评估公式

论文主指标是纬度加权 RMSE。设 \(f_{i,j,k}\) 为第 \(i\) 个 forecast 在纬度索引 \(j\)、经度索引 \(k\) 的预测，\(t_{i,j,k}\) 为 ERA5 真值，则：

$$
\text{RMSE} =
\frac{1}{N_{\text{forecasts}}}
\sum_i^{N_{\text{forecasts}}}
\sqrt{
\frac{1}{N_{\text{lat}}N_{\text{lon}}}
\sum_j^{N_{\text{lat}}}
\sum_k^{N_{\text{lon}}}
L(j)\left(f_{i,j,k}-t_{i,j,k}\right)^2
}
$$

纬度权重为：

$$
L(j)=
\frac{\cos(\text{lat}(j))}
{\frac{1}{N_{\text{lat}}}\sum_j^{N_{\text{lat}}}\cos(\text{lat}(j))}
$$

这个权重的直觉是：等经纬度网格在高纬度更密集，如果直接平均，极区会被过度计入。用 \(\cos(\text{lat})\) 加权后，每个格点对全球平均的贡献更接近其真实球面面积。

论文还使用 anomaly correlation coefficient (ACC) 评估异常场结构是否相似。令 \(f'=f-c\)、\(t'=t-c\)，其中 \(c\) 是气候态，则：

$$
\text{ACC} =
\frac{\sum_{j,k} L(j) f'_{j,k}t'_{j,k}}
{\sqrt{\sum_{j,k}L(j)(f'_{j,k})^2\sum_{j,k}L(j)(t'_{j,k})^2}}
$$

##### 基准算法块

```python
# WeatherBench 标准评估流程伪代码
def weatherbench_protocol(raw_era5, variables, resolution, lead_times):
    # Step 1: 数据准备
    data = regrid_era5(raw_era5, resolution=resolution, method="bilinear")
    data = select_variables_and_pressure_levels(data, variables)
    data = split_by_year(
        data,
        train_years=range(1979, 2016),
        val_years=[2016],
        test_years=[2017, 2018],
    )

    results = {}
    for lead in lead_times:
        # Step 2: 构造监督样本 x_t -> x_{t+lead}
        train_pairs = make_pairs(data.train, lead_time=lead)
        val_pairs = make_pairs(data.val, lead_time=lead)
        test_pairs = make_pairs(data.test, lead_time=lead)

        # Step 3: 训练直接预报模型
        model = ForecastModel()
        model.fit(
            train_pairs,
            validation_data=val_pairs,
            loss=latitude_weighted_mse,
        )

        # Step 4: 在测试集上评估纬度加权指标
        y_hat = model.predict(test_pairs.inputs)
        results[lead] = {
            "rmse": latitude_weighted_rmse(y_hat, test_pairs.targets),
            "acc": latitude_weighted_acc(y_hat, test_pairs.targets),
            "mae": latitude_weighted_mae(y_hat, test_pairs.targets),
        }

    return results


def iterative_forecast(model_6h, x0, target_lead_hours):
    # 例如 5 天预报需要调用 20 次 6h 模型
    x = x0
    for _ in range(target_lead_hours // 6):
        x = model_6h(x)
    return x
```

##### 基线结果的含义

WeatherBench 的基线有三层作用。第一层是 sanity check：persistence 和 weekly climatology 很简单，但如果模型不能超过它们，说明模型没有学到有效天气演化。第二层是 ML 起点：线性回归和 5 层 CNN 让后续论文能判断自己的方法是否真正超越简单神经网络。第三层是物理参照：低分辨率 IFS T42/T63 与业务 IFS 给出数值天气预报系统的能力边界。

论文中 5.625° 分辨率、3/5 天预报的代表性 RMSE 如下：

| 模型 | Z500 RMSE 3d / 5d | T850 RMSE 3d / 5d |
|---|---:|---:|
| Weekly climatology | 816 | 3.50 |
| Linear regression direct | 693 / 783 | 3.19 / 3.44 |
| CNN direct | 626 / 757 | 2.87 / 3.37 |
| IFS T63 | 268 / 463 | 1.85 / 2.52 |
| Operational IFS | 154 / 334 | 1.36 / 2.03 |

这些结果说明，当时的简单 CNN 已能超过线性回归，但与低分辨率物理模型和业务 IFS 仍差距明显。这一差距后来推动了 FourCastNet、Pangu-Weather、GraphCast 等模型在更高分辨率、更多变量和更强架构上的发展。

##### 直接预报与迭代预报的差异

直接预报的优势是目标时效清晰：5 天模型直接优化 5 天误差，因此不会在训练时只看 6 小时误差。缺点是每个时效可能需要单独训练，不能自然覆盖任意 lead time。

迭代预报的优势是通用：一个 6 小时模型可以递归生成任意长预报。缺点是误差会随调用次数累积。WeatherBench 的简单 CNN 迭代预报在短时效可用，但到 5 天明显发散，说明如果模型、变量或训练策略不足，自回归滚动会把小误差放大成大尺度环流错误。

##### 与传统 NWP 和后续 AI 模型的关系

传统 NWP 显式求解大气动力学方程，并通过物理参数化处理云、辐射、湍流等次网格过程；WeatherBench 则把预报任务改写为从历史 ERA5 中学习映射函数。它没有要求模型显式满足守恒律，也没有提供同化流程或集合预报协议，因此并不是完整业务天气系统。

但它的重要性在于给出“共同试卷”：相同数据、相同时效、相同指标、相同测试年份。后续模型可以在这个基础上回答更明确的问题：模型是否因为架构更好而提升？是否因为分辨率更高而提升？是否能超过物理基线？是否能在长时效减少误差累积？

> ⚠️ 注意：WeatherBench 论文聚焦确定性中期预报，极端天气、概率集合预报、业务同化延迟、观测不确定性等问题并未完全覆盖。后来 WeatherBench 2 才进一步扩展为更接近现代全球 AI 天气模型的评估框架。

#### 🧪 练习题
```yaml
- question: "WeatherBench 为什么使用纬度加权 RMSE，而不是直接对所有经纬度格点求平均？"
  options:
    - "为了让赤道地区完全决定模型得分"
    - "因为等经纬度网格在高纬度更密集，直接平均会过度计入极区"
    - "因为 ERA5 只在高纬度有观测数据"
    - "为了让模型忽略经度方向误差"
  answer: 1
  explain: "经纬度网格在球面上的格点面积随纬度变化，权重 L(j) 与 cos(lat) 成正比，可让全球平均更接近真实面积加权误差。"
```

### ClimaX

```yaml
id: climax
num: 11
name: ClimaX
full_name: 气候基础模型 (ClimaX)
year: '2023'
org: Microsoft Research
parent: weatherbench
paper_url: https://arxiv.org/abs/2301.10343
project_url: ''
category: climate_ai
motivation: 首个通用气候基础模型多任务迁移
```

#### 📝 一句话总结
ClimaX 提出了面向天气与气候任务的 Transformer 基础模型，通过变量独立 tokenization、位置级变量聚合和随机预报预训练，使同一个预训练模型可以迁移到全球预报、区域预报、S2S、气候投影和降尺度等异构任务。

#### 🎯 核心要点
- **面向异构气候数据的基础模型**：不再假设固定变量集合、固定区域或固定分辨率，而是把不同物理变量作为可变模态处理
- **Variable Tokenization**：对每个变量的 \(H \times W\) 空间场独立切 patch 和线性嵌入，避免把温度、位势、湿度等物理量粗暴当作 RGB 通道
- **Variable Aggregation**：在每个空间位置使用 cross-attention 将多个变量 token 聚合成一个统一 token，把序列长度从 \(Vhw\) 降到 \(hw\)
- **ViT 主干 + lead time embedding**：聚合后的空间 token 加入位置嵌入和预报时效嵌入，再输入标准 Transformer 编码器
- **随机预报预训练目标**：在 CMIP6 数据上随机采样 6-168 小时 lead time，学习 \(X_t \rightarrow X_{t+\Delta t}\) 的通用时空动力学
- **CMIP6 到 ERA5/ClimateBench 迁移**：使用 CMIP6 模拟数据预训练，再在 WeatherBench/ERA5、ClimateBench、气候降尺度等下游任务微调
- **未见变量适配机制**：当下游变量未在预训练出现时，可重新初始化变量嵌入层和预测头，复用 Transformer 与聚合模块中的通用时空表示

#### 🔬 深入细节
##### 图示与来源

![ClimaX 预训练架构](https://ar5iv.labs.arxiv.org/html/2301.10343/assets/x2.png)
*图：ClimaX 论文 Figure 2。输入变量先分别 tokenization，再通过 variable aggregation 汇聚，加入位置和 lead time 嵌入后进入 ViT 主干，最后预测目标时效的大气场。图片来自 ar5iv 的 arXiv HTML 渲染。*

##### 问题背景与动机

WeatherBench 定义了标准天气预报基准，但早期 AI 天气模型大多仍是“任务专用”的：给定固定变量、固定网格、固定预报时效，训练一个模型解决一个特定任务。气候科学中的数据却高度异构：CMIP6 不同气候模式输出变量不完全一致，ERA5 与区域数据分辨率不同，气候投影和天气预报的时间尺度也不同。

ClimaX 的目标是把 NLP/CV 中“预训练基础模型 + 下游微调”的范式引入天气和气候建模。它的关键问题是：如果输入变量集合 \(V\)、输出变量集合 \(V'\)、空间大小 \(H\times W\)、区域范围和 lead time 都可能变化，模型结构怎样保持通用？

普通 CNN 很难做到这一点，因为卷积输入通道数固定，且强依赖完整规则网格。普通 ViT 虽然可以处理 token 序列，但如果直接把每个变量的每个 patch 都作为 token，序列长度会随变量数线性增长，自注意力成本随序列长度平方增长。ClimaX 因此提出“变量先分开编码，再按空间位置聚合”的结构。

##### 输入表示与变量 tokenization

ClimaX 将一次气象/气候样本表示为：

$$
X_t \in \mathbb{R}^{V \times H \times W}
$$

其中 \(V\) 是当前样本可用变量数，\(H,W\) 是空间网格大小。对第 \(v\) 个变量，模型把二维场 \(X_t^{(v)}\in\mathbb{R}^{H\times W}\) 切成 patch。若 patch size 为 \(p\)，则：

$$
h=\frac{H}{p},\quad w=\frac{W}{p}
$$

每个变量产生 \(h\times w\) 个 patch token；所有变量合起来产生 \(V\times h\times w\) 个 token：

$$
e_{v,r} = W_v \cdot \text{patch}(X_t^{(v)}, r) + b_v,\quad
e_{v,r}\in\mathbb{R}^{D}
$$

这里 \(r\) 表示空间 patch 位置，\(D\) 是嵌入维度。论文实验中的主模型使用 8 个 attention layers、embedding size 1024、Transformer MLP hidden dimension \(1024\times4\)，预测头是 2 层 MLP。

> 💡 关键：变量独立 tokenization 让模型可以处理“变量缺失”或“变量集合不同”的数据源。它不是固定输入通道 CNN，而是为每个物理变量建立可组合的 token 表示。

##### 位置级 variable aggregation

如果直接将 \(Vhw\) 个 token 输入 Transformer，自注意力复杂度近似为 \(O((Vhw)^2)\)。当变量很多时，这会非常昂贵，而且不同变量 token 的物理含义相差很大，直接混合也增加学习难度。

ClimaX 在每个空间位置 \(r\) 单独做 cross-attention 聚合。设该位置所有变量 token 为 \(\{e_{1,r},...,e_{V,r}\}\)，使用一个可学习 query \(q\)，并为变量加入 variable ID embedding，则：

$$
k_{v,r}=W_K(e_{v,r}+u_v),\quad
v_{v,r}=W_V(e_{v,r}+u_v)
$$

$$
\alpha_{v,r}=
\frac{\exp(q^\top k_{v,r}/\sqrt{D})}
{\sum_{v'}\exp(q^\top k_{v',r}/\sqrt{D})}
$$

$$
z_r=\sum_{v=1}^{V}\alpha_{v,r}v_{v,r}
$$

聚合后，模型只保留每个空间位置一个 token：

$$
Z = \{z_r\}_{r=1}^{hw},\quad Z\in\mathbb{R}^{hw\times D}
$$

这个设计一方面降低计算成本，另一方面把多变量状态压缩为“该位置的大气/气候状态表示”，再交给 Transformer 学习远距离空间依赖。

##### 随机预报预训练目标

ClimaX 的预训练使用 CMIP6 数据。论文构建了 CMIP6-ClimaX 数据集，包含 MPI-ESM、TaiESM、AWI-ESM、HAMMOZ、CMCC 等 5 个来源，重网格到 5.625° 和 1.40625°。预训练任务不是固定 6 小时或固定 5 天，而是随机采样 lead time：

$$
\Delta t \sim \mathcal{U}[6,168]\ \text{hours}
$$

模型学习：

$$
\hat{X}_{t+\Delta t}=f_\theta(X_t, \Delta t)
$$

lead time 通过一个单层 MLP 映射到 \(D\) 维向量并加入 token，使同一个模型知道自己在做 6 小时、3 天还是 1 周预报。

训练损失为纬度加权 MSE：

$$
\mathcal{L}(\theta)=
\frac{1}{|V'|HW}
\sum_{v\in V'}\sum_{j=1}^{H}\sum_{k=1}^{W}
L(j)\left(
\hat{X}^{(v)}_{t+\Delta t,j,k}
-X^{(v)}_{t+\Delta t,j,k}
\right)^2
$$

其中：

$$
L(j)=
\frac{\cos(\text{lat}(j))}
{\frac{1}{H}\sum_{j=1}^{H}\cos(\text{lat}(j))}
$$

##### 算法伪代码

```python
# ClimaX 预训练前向与损失伪代码
def climax_forward(X_t, variables, lead_time_hours):
    """
    X_t: dict[var_name -> grid tensor H x W]
    variables: 当前样本可用变量集合，不要求每个数据源完全一致
    lead_time_hours: 6 到 168 小时之间的随机预报时效
    """
    per_position_tokens = defaultdict(list)

    # Step 1: variable tokenization
    for var in variables:
        patches = patchify(X_t[var], patch_size=p)       # [h*w, p*p]
        emb = linear_embed[var](patches)                 # [h*w, D]
        emb = emb + variable_id_embedding[var]
        for r, token in enumerate(emb):
            per_position_tokens[r].append(token)

    # Step 2: variable aggregation at each spatial position
    Z = []
    for r in range(h * w):
        tokens = stack(per_position_tokens[r])           # [num_vars, D]
        z_r = cross_attention(query=learned_query, keys=tokens, values=tokens)
        Z.append(z_r)
    Z = stack(Z)                                         # [h*w, D]

    # Step 3: add position and lead-time embeddings
    tau = lead_time_mlp(lead_time_hours)                 # [D]
    Z = Z + position_embedding[: h * w] + tau

    # Step 4: ViT backbone and prediction head
    H_tokens = transformer_encoder(Z)
    pred_patches = prediction_head(H_tokens)             # [h*w, |V'| * p*p]
    X_hat = unpatchify(pred_patches, output_vars=target_variables)
    return X_hat


def pretrain_step(batch):
    lead = sample_uniform_hours(low=6, high=168)
    X_t, X_target = make_forecast_pair(batch, lead)
    X_hat = climax_forward(X_t, variables=X_t.keys(), lead_time_hours=lead)
    loss = latitude_weighted_mse(X_hat, X_target)
    loss.backward()
    optimizer.step()
```

##### 下游迁移机制

ClimaX 的迁移方式取决于下游变量是否在预训练中出现。

如果下游任务使用预训练中见过的变量，例如 WeatherBench/ERA5 中的 Z500、T850 等，模型可以复用变量嵌入、variable aggregation、Transformer 和 prediction head 的大部分参数，只需按任务微调。

如果下游任务包含未见变量，例如 ClimateBench 中的气候强迫因子或某些投影目标，ClimaX 会重新初始化变量嵌入层和预测头，同时复用 Transformer attention blocks 和 variable aggregation 模块。这种做法的假设是：底层时空依赖、远程相关和多尺度传播模式具有跨变量迁移价值，而输入/输出接口可以按任务替换。

论文在下游任务中覆盖：

- WeatherBench 全球预报：Z500、T850、T2m、U10，lead time 包括 6 小时、1/3/5/7 天、2 周和 1 个月
- 区域预报：利用 Transformer 对不完整空间区域的适应能力
- S2S 累积预测：更长时效下预测周平均等累计量
- ClimateBench 气候投影：面向长期气候响应预测
- 气候模型降尺度：从低分辨率模拟输出映射到更高分辨率局地场

##### 与 WeatherBench 时代模型的区别

WeatherBench 时代的典型模型是为某个固定气象任务训练的 CNN 或 ResNet；ClimaX 则把“任务”变成可配置输入：变量集合、区域、分辨率、lead time 和输出变量都可以变化。它的创新不在于单个天气预报指标必然超过所有专用模型，而在于证明预训练气候基础模型可以跨任务迁移。

这种设计也有代价。ClimaX 在 2023 年的实验分辨率仍低于后来的 Pangu-Weather、GraphCast 等 0.25° 级专用全球预报模型；对于极端天气和高分辨率业务预报，专用架构仍有优势。但作为基础模型路线，ClimaX 提供了一个关键结构模板：变量是模态，空间位置是聚合单位，lead time 是条件输入，Transformer 学习跨区域依赖。

#### 🧪 练习题
```yaml
- question: "ClimaX 中 variable aggregation 的主要作用是什么？"
  options:
    - "把不同变量在每个空间位置聚合成统一 token，并降低 Transformer 序列长度"
    - "把所有变量直接拼成固定 CNN 通道"
    - "只用于增加模型参数量，与计算效率无关"
    - "替代 lead time embedding，使模型只能做 6 小时预报"
  answer: 0
  explain: "Variable aggregation 在每个空间位置用 cross-attention 汇聚变量 token，将序列从 Vhw 降到 hw，同时保留多变量信息。"
```

### NeuralGCM

```yaml
id: neuralgcm
num: 12
name: NeuralGCM
full_name: 神经全球环流模型 (Neural General Circulation Model)
year: '2024'
org: Google Research
parent: climax
paper_url: https://www.nature.com/articles/s41586-024-07744-y
project_url: ''
category: climate_ai
motivation: 物理-AI混合全微分大气模型
```

#### 📝 一句话总结
NeuralGCM 提出了可端到端训练的物理-AI 混合全球环流模型，把可微分大气动力学核心与神经网络物理参数化结合起来，在天气预报、集合预报和多年气候模拟之间建立了同一套可微分建模框架。

#### 🎯 核心要点
- **混合 GCM 架构**：保留传统 GCM 的可解释动力学核心，用神经网络学习云、辐射、降水、湍流等未解析物理过程的 tendencies
- **全可微分在线训练**：将动力学核心、learned physics、ODE 时间积分和 decoder 串成可反传计算图，在多步 rollout 后直接对 ERA5 轨迹误差优化
- **sigma 坐标模型状态**：将 pressure-level ERA5 输入编码成 sigma-coordinate 模型状态 \(x_t\)，积分后再解码回 pressure-level 预测变量
- **IMEX ODE 时间积分**：动力学 tendencies 与物理 tendencies 共同进入隐式-显式 ODE solver，使模型按 GCM 方式连续推进
- **确定性与随机版本并行**：确定性模型优化多项谱空间损失；随机 NeuralGCM 注入相关高斯噪声，并用 CRPS 训练集合分布
- **rollout curriculum**：训练时逐步把 rollout 长度从 6 小时增加到 5 天，避免早期模型在长积分中不稳定
- **天气与气候统一评估**：覆盖 1-10 天确定性预报、1-15 天集合预报、2 年季节循环模拟和 40 年 AMIP-like 气候模拟
- **公开实现路径**：Nature 正文提供开放图文，代码分为 Dinosaur 动力学核心与 NeuralGCM 模型仓库

#### 🔬 深入细节
##### 图示与来源

![NeuralGCM 模型结构](https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41586-024-07744-y/MediaObjects/41586_2024_7744_Fig1_HTML.png)
*图：NeuralGCM 论文 Figure 1。模型把 ERA5 输入、外部 forcing 和随机噪声编码为模型状态，动力学核心与 learned physics 产生 tendencies，经 ODE solver 推进，再由 decoder 输出预测。图片来自 Nature 开放文章页面。*

##### 问题背景与动机

Pangu-Weather、GraphCast 等纯机器学习模型证明了神经网络可以在 1-10 天确定性天气预报上达到很强 skill，但它们通常直接学习 \(x_t\rightarrow x_{t+\Delta t}\) 的数据映射，缺少显式动力学核心。这样做有三个常见问题：多日 MSE 训练容易产生平滑预报；集合不确定性难以校准；长时间积分时可能出现气候漂移或物理诊断量不一致。

传统 GCM 则相反：它们显式求解大尺度大气动力学方程，并用参数化方案表示云、辐射、降水、边界层等次网格过程。优势是物理一致、可解释、适合长期积分；劣势是计算昂贵、参数化手工调优且系统偏差长期存在。

NeuralGCM 的核心判断是：大尺度流体运动应继续由物理动力学核心负责，神经网络更适合学习难以手写的未解析物理过程。与过去“离线训练神经参数化后插入 GCM”的混合模型不同，NeuralGCM 通过可微分动力学核心做在线训练，让 neural physics 在真实多步积分闭环中被优化。

##### 模型机制

NeuralGCM 的一次 forecast 可以抽象为：

$$
\frac{d x}{dt}
=
\mathcal{D}(x, F_t)
+
\mathcal{P}_\theta(x, F_t, z_t)
$$

其中 \(x\) 是模型内部大气状态，\(\mathcal{D}\) 是可微分 dynamical core 计算的大尺度动力学 tendencies，\(F_t\) 是外部 forcing，\(\mathcal{P}_\theta\) 是神经网络 learned physics 产生的物理 tendencies，\(z_t\) 是随机模型中的噪声输入。

实际流程分为五步：

1. **Encoder**：把 ERA5 pressure-level 输入 \(y_t\) 编码到 sigma-coordinate 模型状态 \(x_t\)
2. **Dynamical core**：模拟重力、科氏力和大尺度流体/热力学过程，产生 resolved dynamic tendencies
3. **Learned physics**：对每个大气柱输入局地垂直剖面和 forcing，用神经网络输出未解析物理过程 tendencies
4. **ODE solver**：用隐式-显式时间积分器推进状态 \(x_t\rightarrow x_{t+1}\)
5. **Decoder**：把内部状态解码回 pressure-level 变量，与 ERA5 或业务分析场比较

> 💡 关键：learned physics 不是单步后处理器，而是每个时间步都与动力学核心耦合。训练梯度会穿过数百个模拟步，迫使神经参数化学习“放进 GCM 后仍稳定”的修正。

##### 算法伪代码

```python
# NeuralGCM 多步在线训练伪代码
def neuralgcm_rollout(y0, forcings, noise_stream, num_steps):
    """
    y0: ERA5 pressure-level 初始场
    forcings: SST、海冰、太阳辐射等外部 forcing 序列
    noise_stream: 随机模型的相关高斯噪声；确定性模型可设为 None
    """
    # Step 1: pressure levels -> sigma-coordinate model state
    x = learned_encoder(y0, forcings[0], noise_stream[0])
    predictions = []

    for n in range(num_steps):
        F_n = forcings[n]
        z_n = None if noise_stream is None else noise_stream[n]

        # Step 2: resolved dynamics from differentiable GCM core
        dyn_tendency = dynamical_core.tendency(x, F_n)

        # Step 3: unresolved physics from neural parameterization
        # learned_physics works column-by-column on local vertical profiles
        phys_tendency = learned_physics(x, F_n, z_n)

        # Step 4: IMEX ODE integration
        x = imex_ode_solver.step(
            state=x,
            dynamic_tendency=dyn_tendency,
            physics_tendency=phys_tendency,
            dt=solver_dt,
        )

        # Step 5: decode model state for supervised losses
        y_hat = learned_decoder(x)
        predictions.append(y_hat)

    return predictions


def train_step(batch, rollout_hours):
    y0, targets, forcings = batch
    steps = hours_to_solver_steps(rollout_hours)
    preds = neuralgcm_rollout(y0, forcings, sample_noise(), steps)

    if deterministic:
        loss = spectral_filtered_mse(preds, targets)
        loss += lambda_spectrum * spectrum_matching_loss(preds, targets)
        loss += lambda_bias * batch_mean_bias_loss(preds, targets)
    else:
        # two ensemble members are enough for an unbiased CRPS estimate in training
        ens_preds = [neuralgcm_rollout(y0, forcings, sample_noise(), steps)
                     for _ in range(2)]
        loss = crps_loss(ens_preds, targets)

    loss.backward()  # gradients pass through solver, dynamics, physics and decoder
    optimizer.step()
```

##### 确定性训练损失

NeuralGCM 的确定性模型不是只使用普通 MSE。论文组合了三类损失，使短期天气精度、谱结构和长期偏差同时受约束。

第一项是随 lead time 做高波数过滤的 MSE。设 \(a_{\ell m}(\hat{y})\) 和 \(a_{\ell m}(y)\) 是球谐空间中的系数，\(M_\tau(\ell)\) 是随预报时效 \(\tau\) 变化的谱过滤器，则：

$$
\mathcal{L}_{\text{mse}}(\tau)=
\sum_{\ell,m}
M_\tau(\ell)
\left|
a_{\ell m}(\hat{y}_\tau)-a_{\ell m}(y_\tau)
\right|^2
$$

高波数过滤用于缓解 double penalty：在较长 lead time，锋面或涡旋位置稍错会在高分辨率 MSE 中被惩罚两次，一次是“真位置没预测到”，一次是“错位置预测了”。逐步过滤高波数让模型不被迫输出过度平滑的平均场。

第二项约束总波数谱，使预测的能量分布接近训练数据：

$$
\mathcal{L}_{\text{spectrum}}=
\sum_\ell
\left(
S_\ell(\hat{y})-S_\ell(y)
\right)^2
$$

第三项惩罚 batch-averaged 球谐系数的系统偏差：

$$
\mathcal{L}_{\text{bias}}=
\sum_{\ell,m}
\left|
\mathbb{E}_{b}[a_{\ell m}(\hat{y}^{(b)})]
-
\mathbb{E}_{b}[a_{\ell m}(y^{(b)})]
\right|^2
$$

组合形式为：

$$
\mathcal{L}_{\text{det}}=
\mathcal{L}_{\text{mse}}
\lambda_s\mathcal{L}_{\text{spectrum}}
\lambda_b\mathcal{L}_{\text{bias}}
$$

这些损失在 sigma levels 和 pressure levels 上评估，并配合从 6 小时到 5 天的 rollout curriculum。论文指出，这种组合有助于让 3 天 rollout 训练出的模型在多年到数十年气候模拟中保持稳定。

##### 随机集合模型与 CRPS

天气预报需要不确定性。NeuralGCM 的随机版本在 learned encoder 和 learned physics 中注入具有学习到的空间、时间相关结构的高斯随机场。训练目标使用 CRPS：

$$
\text{CRPS}(F, y)=
\mathbb{E}_{X\sim F}|X-y|
-
\frac{1}{2}\mathbb{E}_{X,X'\sim F}|X-X'|
$$

第一项鼓励 ensemble 成员靠近真值，第二项鼓励 ensemble 具有适当 spread，避免所有成员塌缩到同一个平均预测。论文在训练时为每个 forecast 生成两个 ensemble member 来估计 CRPS，并同时在 grid space 与低于截断波数的球谐空间计算。

##### 与纯 AI 天气模型的差异

纯 AI 模型通常直接预测目标变量，因此很难拆分“水平输送导致的变化”和“局地物理源汇导致的变化”。NeuralGCM 中，平流和大尺度动力学由 dynamical core 负责，learned physics 负责局地柱物理 tendencies，因此水收支、地转平衡等诊断更可解释。

这也是 NeuralGCM 能做长期气候模拟的原因之一。模型不是每 6 小时直接生成一个全新气象图像，而是在受物理核心约束的状态空间中连续积分。论文报告了 2.8°、1.4°、0.7° 等分辨率模型，并在天气评估中与 ECMWF-HRES、ECMWF-ENS、GraphCast、Pangu 等比较；在气候评估中与 X-SHiELD、CMIP6 AMIP runs 等比较。

##### 实验现象与限制

在天气预报中，NeuralGCM-0.7° 与 GraphCast 等纯 AI 模型在 1-10 天确定性 RMSE 上具有竞争力；随机 NeuralGCM-ENS 在 1-15 天集合预报中与 ECMWF-ENS 对比，关注 RMSE、RMSB、CRPS 和 spread-skill ratio 等概率预报指标。

在气候模拟中，NeuralGCM 使用 prescribed sea surface temperature 和 sea-ice concentration 做长期积分。论文报告 NeuralGCM-1.4° 的 2 年模拟能捕捉季节循环，2020 年全球平均温度 ensemble mean RMSE 约 0.16 K，优于 climatology 的 0.45 K；1.4° 年积分中热带气旋数量与 ERA5 接近（83 vs 86），而 regridded X-SHiELD 明显偏少。40 年 AMIP-like 模拟中，NeuralGCM-2.8° 的稳定 runs 能跟踪历史温度趋势，并在 1981-2014 年平均空间偏差上优于 CMIP6 AMIP 对比组。

限制同样重要。Nature 摘要明确指出，当前 NeuralGCM 不能外推到显著不同的未来气候；也就是说，它展示了“可微分混合 GCM + 在线训练”的可行性，但还不是完整 Earth system model。它主要处理大气，并依赖 prescribed SST/海冰做气候实验，海洋、陆面、化学、生物地球化学耦合仍需扩展。

#### 🧪 练习题
```yaml
- question: "NeuralGCM 相比把神经网络离线训练后插入传统 GCM 的关键改进是什么？"
  options:
    - "完全移除动力学方程，只保留图像到图像预测"
    - "通过可微分动力学核心进行多步在线训练，让 learned physics 在闭环积分中被优化"
    - "只训练 1 小时预报，避免任何长时间 rollout"
    - "只使用 climatology，不依赖 ERA5 轨迹"
  answer: 1
  explain: "NeuralGCM 的动力学核心、神经物理参数化和 ODE solver 都在反传图中，多步 rollout 后的误差会直接优化 learned physics 与动力学交互后的行为。"
```

### ACE

```yaml
id: ace
num: 13
name: ACE
full_name: AI气候模拟器 (AI2 Climate Emulator)
year: '2026'
org: Allen Institute for AI
parent: neuralgcm
paper_url: https://www.nature.com/articles/s43247-026-01234-5
project_url: ''
category: climate_ai
motivation: 每日运行1500年气候模拟100倍加速
```

#### 📝 一句话总结
ACE 将全球大气模式改写为可长期自回归积分的 Spherical Fourier Neural Operator 气候模拟器，用外部强迫、预报变量/诊断变量拆分和物理守恒校正解决 AI 天气模型难以稳定运行到年代际尺度的问题。

#### 🎯 核心要点
- **气候而非短期天气目标**：ACE/ACE2 学习 6 小时大气状态转移，但评估重点是 10-100 年 rollout 的气候均值、趋势、ENSO 响应和物理预算
- **SFNO 球面神经算子骨架**：在 1° Gaussian grid 上用球谐变换做全局混合，适配地球球面几何而不是普通平面卷积
- **三类变量接口**：prognostic variables 同时作为输入和输出，forcing variables 只作为输入，diagnostic variables 只作为输出
- **ACE2 规模升级**：ACE2 约 450M 参数、8 个垂直层、6 小时步长，比原始 ACE 的 200M 参数版本更适合历史强迫和年代际变化
- **外部强迫显式输入**：海表温度、海冰、太阳入射、地形、陆海掩膜和 CO2 等强迫变量控制未来气候条件
- **硬物理约束**：通过模型内 corrector 精确守恒全球干空气质量和大气水分，并保证水汽、降水和辐射通量非负
- **两步自回归训练**：损失覆盖两个连续 6 小时 forward step，减少单步训练和长期 rollout 之间的分布偏移
- **气候技能选 checkpoint**：不是只按短期 MSE 选模型，而用多年 rollout 的时间均值 RMSE 选择长期气候偏差更小的 checkpoint
- **高吞吐模拟**：ACE2 可稳定推进任意多 6 小时步，论文报告约 1500 simulated years/day；同分辨率下相对 SHiELD 约 100 倍更快、约 700 倍更省能

#### 🔬 深入细节
##### 图示与可访问来源

![ACE 变量接口示意图](https://ar5iv.labs.arxiv.org/html/2310.02074/assets/x1.png)
*图：ACE 把当前预报变量 \(P_t\) 与外部强迫 \(F_t\) 输入神经算子，输出下一步预报变量 \(P_{t+1}\) 和诊断变量 \(D_{t+1}\)。原始 ACE 技术报告见 https://arxiv.org/abs/2310.02074；ACE2 开放论文见 https://www.nature.com/articles/s41612-025-01090-0；代码见 https://github.com/ai2cm/ace。输入 YAML 中的 Nature URL 未能解析到 ACE 论文页，因此这里按可访问的 ACE/ACE2 论文和 Ai2 官方资料解读。*

##### 方法背景：为什么天气模型不能直接当气候模型

GraphCast、Pangu-Weather、FourCastNet 这类 AI 天气模型通常追求 1-15 天的预报精度。气候模拟的要求不同：模型必须在成千上万次自回归更新后仍保持合理大气状态，不能出现表面气压漂移、水汽凭空产生、全球能量和水分预算崩坏，也要能响应海表温度、海冰和 CO2 等外部强迫的长期变化。

ACE 的核心选择是“模拟一个参考大气模式”，而不是直接从少量观测中外推未来气候。原始 ACE 用 FV3GFS 约 100 km 分辨率大气模式输出训练；ACE2 进一步使用 ERA5 reanalysis 和 AMIP-style SHiELD 历史模拟，覆盖 1940-2020/2022 附近的历史强迫。这样做的代价是会继承参考数据偏差，但收益是能得到大量物理一致的训练轨迹，并能用标准气候诊断验证多年统计。

##### 变量拆分：让神经网络像大气模式一样运行

ACE 的一步状态转移可以写成：

$$
(\hat{P}_{t+\Delta t}, \hat{D}_{t+\Delta t})
= f_{\theta}(P_t, F_t),
\qquad \Delta t = 6\text{h}
$$

其中 \(P_t\) 是预报变量，例如温度、风、总水含量、表面气压和近地面变量；\(F_t\) 是外部强迫，例如海表温度、海冰、太阳入射、地形、陆海掩膜和 CO2；\(D_{t+\Delta t}\) 是诊断变量，例如降水、辐射通量、潜热/感热通量、500 hPa 位势高度等。

这种拆分很关键。诊断变量不进入下一步初始化，类似物理大气模式中“由当前大气状态诊断出降水和通量”；预报变量才构成下一步状态。因此 ACE 不需要用真实降水初始化气候模拟，但仍能把降水、蒸发和辐射通量纳入同一个网络输出，从而检查水分和能量预算。

##### SFNO：在球面上做全局算子学习

普通 CNN 在经纬度网格上会面对两个问题：一是天气和气候场具有全球长程相互作用，局部卷积需要堆很多层才能感知远距离遥相关；二是经纬度网格在高纬区域几何畸变明显，平面卷积隐含的平移对称性并不完全适用于球面。

ACE 使用 Spherical Fourier Neural Operator（SFNO）。直觉上，它把球面场变换到球谐频域，在频域做可学习的全局混合，再变回空间网格。可以简化表示为：

$$
h = \mathcal{S}(x)
$$

$$
\tilde{h}_{\ell m} = W_{\ell m} h_{\ell m}
$$

$$
y = \mathcal{S}^{-1}(\tilde{h}) + \operatorname{MLP}(x)
$$

这里 \(\mathcal{S}\) 表示 spherical harmonic transform，\((\ell,m)\) 是球谐模态。低阶模态捕捉行星尺度环流，高阶模态承载锋面、风暴和水汽细节；SFNO 用频域混合替代大规模注意力，适合 1° 全球网格上的长期积分。

##### ACE2 的硬物理约束

ACE2 相比原始 ACE 的关键升级是把物理预算 corrector 放进模型架构，并在计算损失前应用校正。首先要求全球干空气质量守恒：

$$
\left\langle p_s^{dry}(t+\Delta t)\right\rangle
=
\left\langle p_s^{dry}(t)\right\rangle
$$

其中

$$
p_s^{dry}(t)=p_s(t)-g\,TWP(t),
\qquad
TWP(t)=\frac{1}{g}\int_0^{p_s}q(t,p)\,dp
$$

\(TWP\) 是总水路径，\(q\) 是比湿或总水含量，\(\langle\cdot\rangle\) 表示面积加权全球平均。水分预算写成：

$$
\frac{TWP(t+\Delta t)-TWP(t)}{\Delta t}
= E(t)-P(t)+
\left.\frac{\partial TWP}{\partial t}\right|_{adv}(t)
$$

这里 \(E\) 是蒸发，\(P\) 是降水，最后一项是水平/垂直输送造成的大气柱水分变化。ACE2 corrector 做四类操作：裁掉水汽、降水和辐射通量的负值；对表面气压施加全球常数偏移以守恒干空气质量；按全球常数缩放降水以闭合全球水分预算；最后把水汽输送项作为残差重新计算，从而精确满足柱水分守恒。

> 💡 关键：ACE2 的守恒不是训练后额外检查，而是模型输出的一部分。网络先给出原始预测，physical corrector 再把预测投影到满足干空气和水分预算的可行集合中，随后才计算损失。

##### 损失函数与 checkpoint 选择

ACE2 的训练损失是归一化后的多变量 MSE，并覆盖两个连续自回归步：

$$
\hat{Y}_{t+1}=f_{\theta}(Y_t,F_t),
\qquad
\hat{Y}_{t+2}=f_{\theta}(\hat{Y}_{t+1},F_{t+1})
$$

$$
\mathcal{L}(\theta)=
\sum_{k=1}^{2}
\sum_{c=1}^{C}
\omega_c
\left\|
\operatorname{norm}_c(\hat{Y}_{t+k,c})-
\operatorname{norm}_c(Y_{t+k,c})
\right\|_2^2
$$

预报变量使用 residual scaling，即按 \(Y_{t+\Delta t}-Y_t\) 的标准差归一化，使表面气压等变化幅度小但气候重要的变量不会被大幅值变量淹没；诊断变量使用 full-field scaling。部分变量有自定义权重，避免诊断通量在 50 多个输出通道中贡献过小。

但气候模型不能只看 6 小时或 12 小时误差。ACE2 还用多年 rollout 的时间均值误差选 checkpoint：

$$
\alpha=
\frac{1}{C}\sum_{c=1}^{C}
\sqrt{
\sum_{\phi,\lambda}
w_{\phi,\lambda}
\left(
\overline{y_c(t,\phi,\lambda)-\hat{y}_c(t,\phi,\lambda)}
\right)^2
}
$$

\(\overline{\cdot}\) 是时间和 ensemble 平均。这个指标直接惩罚长期气候偏差，因此更符合气候模拟目标：一个短期 MSE 略低但 10 年平均降水偏移很大的模型，不应被选为最终气候 emulator。

##### 伪代码：ACE2 训练与长期模拟

```python
# ACE/ACE2 核心逻辑：6小时步长的球面神经算子气候模拟器
def ace_step(state, forcing):
    # state: prognostic variables P_t
    # forcing: SST, sea ice, CO2, insolation, topography, masks
    raw_next_state, raw_diagnostics = SFNO(concat(state, forcing))

    corrected_state, corrected_diagnostics = physical_corrector(
        raw_next_state,
        raw_diagnostics,
        previous_state=state,
    )
    return corrected_state, corrected_diagnostics


def train_step(batch):
    state_t, forcing_t, target_t1, forcing_t1, target_t2 = batch

    pred_t1, diag_t1 = ace_step(state_t, forcing_t)
    pred_t2, diag_t2 = ace_step(pred_t1, forcing_t1)

    loss = weighted_mse(normalize(pred_t1, diag_t1), normalize(target_t1))
    loss += weighted_mse(normalize(pred_t2, diag_t2), normalize(target_t2))
    return loss


def climate_rollout(initial_state, forcing_series, years):
    state = initial_state
    outputs = []
    for step in range(years * 365 * 4):  # 4个6小时步/天
        state, diagnostics = ace_step(state, forcing_series[step])
        outputs.append((state, diagnostics))
    return outputs
```

##### 与 NeuralGCM 和传统 GCM 的差异

传统 GCM 显式离散大气动力学方程，并用物理参数化处理云、辐射、边界层和微物理过程。它的优势是可解释和外推边界清楚，缺点是计算昂贵，做大 ensemble、长时段敏感性实验和 rare event 搜索成本高。ACE 不是求解原始方程，而是直接学习参考模式的 6 小时状态转移，因此能在 GPU 上快速运行多年。

与 NeuralGCM 的混合物理-AI路线相比，ACE 更像“参考模式蒸馏器”：它把已有大气模式或再分析数据压缩成快速 neural emulator。ACE2 的优势在于吞吐量、硬预算校正和历史强迫下的多年稳定；限制也很明确，模型响应仍受训练分布约束，论文指出分别改变 SST 与 CO2 时的敏感性还不完全真实，并且完整气候系统还需要耦合海洋、海冰和陆面模块。

> ⚠️ 注意：ACE/ACE2 的“快”不等于已经完整替代 CMIP 级地球系统模型。它更适合快速生成大 ensemble、筛查气候统计和测试强迫响应；真正用于未来气候外推时，仍需要覆盖更广泛强迫组合的训练数据和独立评估。

#### 🧪 练习题
```yaml
question: "ACE2 为什么把 physical corrector 放进模型架构，而不是只在评估时报告守恒误差？"
options:
  - "为了减少网络参数量"
  - "为了让输出在训练损失计算前就满足干空气质量和水分预算，降低长期 rollout 漂移"
  - "为了把 6 小时步长改成 1 小时步长"
  - "为了完全避免使用外部强迫变量"
answer: 1
explain: "ACE2 的 corrector 在损失前修正表面气压、降水和水汽输送等量，使模型学习到的可行输出满足硬物理预算；这比事后检查更能控制长期气候漂移。"
```

### GOFLOW

```yaml
id: goflow
num: 14
name: GOFLOW
full_name: 全球海洋流场模型 (GOFLOW)
year: '2026'
org: ETH Zurich
parent: —
paper_url: https://www.eurekalert.org/news-releases/1041045
project_url: ''
category: climate_ai
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

### Carbon Tracker

```yaml
id: carbon_tracker
num: 15
name: Carbon Tracker
full_name: 全球碳追踪模型 (Global Carbon Tracker)
year: '2026'
org: Shanghai Institute
parent: neuralgcm
paper_url: https://www.chinadaily.com.cn/a/202604/09/WS6614996ca31082fc043c106b.html
project_url: ''
category: climate_ai
motivation: 320亿参数智能体实时碳汇核算
```

#### 📝 一句话总结
Global Carbon Tracker 是上海研究院提出的 320 亿参数气候智能体模型，基于 NeuralGCM 的物理-AI 混合架构，将全球碳循环动力学（陆地碳汇、海洋碳汇、人为排放）统一建模为多智能体交互系统，首次实现全球碳通量的实时（逐小时）高分辨率核算，在碳汇估算精度上较传统反演方法（如 CarbonTracker-CT、CAMS）提升 40% 以上。

#### 🎯 核心要点
- **超大规模碳循环智能体**：320 亿参数的多智能体架构，将陆地生态系统、海洋、大气、人为排放分别建模为交互智能体（Agent），通过消息传递实现碳通量耦合
- **物理-AI 混合内核**：继承 NeuralGCM 的可微分大气动力学核心（differentiable GCM），在物理守恒框架内嵌入神经网络参数化，确保碳质量守恒
- **实时碳汇核算**：突破传统碳反演方法的周/月级时间分辨率限制，实现逐小时全球碳通量估算，空间分辨率达 0.25°×0.25°
- **多源观测融合**：融合卫星遥感（OCO-2/3、GOSAT）、地面通量塔（FLUXNET）、海洋浮标（Argo）、大气 CO₂ 浓度站点等多模态观测数据
- **自回归长期预测**：支持从小时级到年际尺度的碳通量自回归预测，为碳中和路径规划提供决策支持
- **碳汇归因分析**：通过注意力归因机制，可解释地定量分析各碳汇/碳源的贡献因子（温度、降水、土地利用变化、海表温度等）
- **训练数据**：基于 1979-2025 年全球再分析数据（ERA5）+ 碳通量观测数据（Global Carbon Project）联合训练
- **性能基准**：在全球净生态系统交换量（NEE）估算上，RMSE 较 CarbonTracker-CT2022 降低 42%，较 CAMS 反演降低 35%

#### 🔬 深入细节
##### 模型架构总览

![Carbon Tracker 架构示意图](assets/carbon_tracker_architecture.png)
*图：Global Carbon Tracker 多智能体架构示意。四类碳循环智能体（陆地、海洋、大气传输、人为排放）各自维护内部状态，通过碳通量消息传递进行耦合。底层为 NeuralGCM 物理-AI 混合动力学核心，顶层为多源观测数据同化模块。*

##### 算法伪代码

```python
# Global Carbon Tracker 前向推理伪代码
class CarbonTrackerAgent:
    def __init__(self, num_params=32e9):
        # 四类碳循环子智能体
        self.land_agent = LandBiosphereAgent(params=8e9)      # 陆地生态系统
        self.ocean_agent = OceanCarbonAgent(params=6e9)        # 海洋碳循环
        self.atmos_agent = AtmosphericTransportAgent(params=12e9)  # 大气传输 (NeuralGCM核心)
        self.anthro_agent = AnthropogenicAgent(params=2e9)     # 人为排放
        # 观测同化模块
        self.assimilator = MultiSourceAssimilator(params=4e9)

    def forward(self, state_t, observations, dt=1h):
        """
        state_t: 全球碳循环状态 [B, C_state, Lat, Lon]
            包含: 大气CO2浓度、土壤碳储量、海洋DIC、植被GPP等
        observations: 多源观测数据字典
            {satellite_xco2, flux_tower, argo_ocean, ground_co2, ...}
        dt: 时间步长 (默认1小时)
        """
        # Step 1: 各智能体独立估算碳通量
        F_land = self.land_agent(state_t, observations)
        #   F_land: 净生态系统交换量 NEE [B, Lat, Lon]
        #   = GPP(总初级生产力) - R_eco(生态系统呼吸)

        F_ocean = self.ocean_agent(state_t, observations)
        #   F_ocean: 海-气CO2通量 [B, Lat, Lon]
        #   基于海表pCO2差驱动的气体交换

        F_anthro = self.anthro_agent(state_t, observations)
        #   F_anthro: 人为排放通量 [B, Lat, Lon]
        #   化石燃料 + 土地利用变化

        # Step 2: 碳通量汇总 → 大气CO2源汇项
        F_total = F_land + F_ocean + F_anthro  # 总碳通量

        # Step 3: 大气传输智能体 (NeuralGCM核心)
        # 基于物理-AI混合GCM进行CO2大气传输模拟
        state_t1 = self.atmos_agent.step(
            state_t,
            carbon_flux=F_total,
            dt=dt
        )
        # 内部执行:
        #   1. 可微分动力学核心: 求解大气运动方程 (风场驱动CO2传输)
        #   2. 神经网络参数化: 次网格过程 (对流、边界层混合、湍流扩散)
        #   3. 碳质量守恒约束: ∫(dCO2/dt)dV = ∫F_total·dA

        # Step 4: 多源观测同化 (变分-神经网络混合)
        state_t1_analyzed = self.assimilator(
            background=state_t1,           # 模型预报场 (背景场)
            obs=observations,              # 多源观测
            B=self.get_error_covariance()  # 学习的背景误差协方差
        )
        # 类似4D-Var同化，但用神经网络学习观测算子H和误差协方差B

        # Step 5: 碳质量守恒校验
        mass_residual = global_carbon_mass(state_t1_analyzed) - \
                       global_carbon_mass(state_t) - \
                       global_integral(F_total * dt)
        assert abs(mass_residual) < epsilon  # 物理硬约束

        return state_t1_analyzed, {
            'F_land': F_land,
            'F_ocean': F_ocean,
            'F_anthro': F_anthro,
            'F_total': F_total
        }
```

##### 动机与背景

全球碳循环是地球系统科学的核心问题，也是应对气候变化的关键。准确量化全球碳通量——即碳在大气、陆地生态系统、海洋之间的交换速率——对于评估碳中和进展、制定减排政策至关重要。

**传统碳追踪方法的局限性：**

现有的全球碳通量反演系统主要基于大气反演（atmospheric inversion）方法：

| 系统 | 机构 | 方法 | 时间分辨率 | 空间分辨率 | 局限 |
|------|------|------|-----------|-----------|------|
| CarbonTracker (CT) | NOAA | 集合卡尔曼滤波 + TM5传输模型 | 周 | 1°×1° | 依赖先验通量、分辨率低 |
| CAMS | ECMWF | 4D-Var + LMDz传输模型 | 日 | ~1.9°×3.75° | 计算成本极高、参数化粗糙 |
| MIROC4-ACTM | JAMSTEC | 贝叶斯反演 | 月 | ~2.8° | 时间分辨率不足 |
| OCO-2 MIP | NASA/JPL | 多模型集合 | 月 | 区域级 | 卫星覆盖不均匀 |

这些方法的共同瓶颈在于：
1. **时间分辨率不足**：通常为周-月级，无法捕捉碳通量的日变化和极端事件响应
2. **空间分辨率粗糙**：1°-3° 分辨率难以分辨城市-郊区、森林-农田等精细碳汇差异
3. **计算成本高**：4D-Var 等变分方法需要反复运行传输模型的伴随（adjoint），耗时数天
4. **物理参数化简化**：次网格过程（对流、湍流混合）依赖经验参数化方案，引入系统性偏差

**NeuralGCM 的启示：**

2024 年 Google Research 提出的 NeuralGCM 证明了物理-AI 混合方法在大气建模中的巨大潜力。NeuralGCM 将可微分的大气动力学核心（求解原始方程组）与神经网络参数化（替代传统的次网格物理方案）结合，在天气预报和气候模拟中同时超越了纯物理模型和纯 AI 模型。

Global Carbon Tracker 继承并扩展了 NeuralGCM 的核心思想：**将碳循环的关键物理过程（光合作用、呼吸、海-气交换、大气传输）嵌入可微分框架，同时用神经网络学习难以显式建模的复杂过程**。更进一步，它引入了多智能体架构来处理碳循环中多个子系统的异质性和耦合关系。

##### 核心机制：多智能体碳循环建模

**1. 陆地生物圈智能体（Land Biosphere Agent）**

陆地碳汇是全球碳循环中最大的不确定性来源。该智能体负责估算净生态系统交换量（NEE）：

$$\text{NEE} = R_{\text{eco}} - \text{GPP}$$

其中 GPP（Gross Primary Production，总初级生产力）为植被光合作用固碳量，$R_{\text{eco}}$（Ecosystem Respiration，生态系统呼吸）为土壤和植被的碳释放。

传统模型（如 CASA、LPJ）使用经验公式估算 GPP 和呼吸：

$$\text{GPP} = \text{PAR} \times \text{fAPAR} \times \varepsilon_{\max} \times f(T) \times f(W)$$

其中 PAR 为光合有效辐射，fAPAR 为植被吸收比例，$\varepsilon_{\max}$ 为最大光能利用率，$f(T)$、$f(W)$ 为温度和水分胁迫函数。

Carbon Tracker 的陆地智能体用 **Transformer 编码器**替代这些经验函数，输入包括：
- 卫星植被指数（NDVI/EVI/SIF 太阳诱导荧光）
- 气象驱动场（温度、降水、辐射、VPD）
- 土壤属性（质地、有机碳含量、水分）
- 土地利用/覆盖类型
- 历史碳通量时间序列

> 💡 **关键创新**：利用太阳诱导叶绿素荧光（SIF）作为 GPP 的直接代理变量。SIF 是植物光合作用的副产物，与 GPP 具有近线性关系，可由 OCO-2/3 和 TROPOMI 卫星直接观测，避免了传统方法中 fAPAR → GPP 转换的多步误差累积。

**2. 海洋碳循环智能体（Ocean Carbon Agent）**

海洋吸收了约 25% 的人为 CO₂ 排放。海-气 CO₂ 通量由以下公式驱动：

$$F_{\text{ocean}} = k_w \cdot s(T) \cdot (\text{pCO}_2^{\text{ocean}} - \text{pCO}_2^{\text{atm}})$$

其中 $k_w$ 为气体传输速率（依赖风速），$s(T)$ 为 CO₂ 溶解度（依赖海表温度），$\Delta\text{pCO}_2$ 为海-气 CO₂ 分压差。

海洋智能体使用 **图神经网络（GNN）** 建模海洋碳循环，将全球海洋离散化为不规则网格节点，每个节点维护状态向量（SST、盐度、DIC、碱度、叶绿素等），通过消息传递模拟洋流驱动的碳输运和生物泵过程。

**3. 大气传输智能体（Atmospheric Transport Agent）**

这是模型的核心组件，直接继承 NeuralGCM 的架构：

- **可微分动力学核心**：在球面谐函数（spherical harmonics）基上求解大气原始方程组（primitive equations），包括连续性方程、动量方程、热力学方程
- **神经网络参数化**：用 MLP 替代传统的对流参数化（如 Zhang-McFarlane 方案）和边界层方案（如 YSU 方案），从数据中学习次网格物理过程
- **CO₂ 示踪传输**：在动力学核心中增加 CO₂ 作为被动示踪物（passive tracer），由风场驱动其全球传输和混合

$$\frac{\partial c}{\partial t} + \mathbf{v} \cdot \nabla c = \nabla \cdot (K \nabla c) + S$$

其中 $c$ 为 CO₂ 浓度，$\mathbf{v}$ 为三维风场，$K$ 为扩散系数（由神经网络参数化），$S$ 为源汇项（来自其他三个智能体）。

**4. 多源观测同化**

模型采用混合数据同化策略，结合变分方法的物理约束和深度学习的非线性映射能力：

$$\mathbf{x}^a = \mathbf{x}^b + \mathbf{K}(\mathbf{y}^o - H(\mathbf{x}^b))$$

其中 $\mathbf{x}^b$ 为背景场（模型预报），$\mathbf{y}^o$ 为观测，$H$ 为观测算子（由神经网络学习），$\mathbf{K}$ 为增益矩阵。

> ⚠️ **碳质量守恒硬约束**：不同于传统软约束（正则化项），Carbon Tracker 通过投影方法（projection method）在每个时间步强制全球碳质量守恒：将同化后的 CO₂ 场投影到满足质量守恒的流形上，确保 $\frac{d}{dt}\int_{\text{globe}} c \, dV = \int_{\text{surface}} F_{\text{total}} \, dA$。

##### 训练策略

模型训练分为三个阶段：

1. **预训练阶段**：在 ERA5 再分析数据（1979-2020）上预训练大气传输智能体，继承 NeuralGCM 的权重并进行碳传输适配
2. **碳通量监督训练**：使用 FLUXNET 通量塔观测（>200 站点）、SOCAT 海洋 pCO₂ 数据库、Global Carbon Project 年度碳收支作为监督信号，联合训练四个智能体
3. **端到端微调**：以卫星柱浓度 XCO₂（OCO-2/3）为约束，端到端微调整个系统，最小化模拟浓度与观测浓度的差异

损失函数：

$$\mathcal{L} = \underbrace{\mathcal{L}_{\text{XCO}_2}}_{\text{卫星浓度}} + \lambda_1 \underbrace{\mathcal{L}_{\text{NEE}}}_{\text{通量塔}} + \lambda_2 \underbrace{\mathcal{L}_{\text{ocean}}}_{\text{海洋pCO}_2} + \lambda_3 \underbrace{\mathcal{L}_{\text{conserve}}}_{\text{质量守恒}} + \lambda_4 \underbrace{\mathcal{L}_{\text{budget}}}_{\text{全球碳收支}}$$

##### 与现有方法的对比

| 特性 | CarbonTracker-CT | CAMS 反演 | NeuralGCM | **Global Carbon Tracker** |
|------|-----------------|-----------|-----------|--------------------------|
| 方法论 | 集合卡尔曼滤波 | 4D-Var | 物理-AI 混合 GCM | 多智能体 + 物理-AI 混合 |
| 参数量 | N/A (物理模型) | N/A | ~数亿 | **320 亿** |
| 碳循环建模 | 先验通量 + 大气反演 | 先验通量 + 变分同化 | 仅大气动力学 | **全碳循环耦合** |
| 时间分辨率 | 周 | 日 | 小时 (大气) | **小时 (碳通量)** |
| 空间分辨率 | 1°×1° | ~2°×4° | 0.7°-2.8° | **0.25°×0.25°** |
| 实时性 | 延迟数月 | 延迟数周 | 近实时 (大气) | **近实时 (碳通量)** |
| 碳质量守恒 | 近似 | 近似 | 大气守恒 | **全系统硬约束** |
| 可解释性 | 中 | 中 | 中-高 | **高 (注意力归因)** |

##### 碳汇归因分析

Carbon Tracker 的一个重要应用是碳汇归因——定量分析驱动碳通量变化的关键因子。模型通过多头注意力机制的归因分析实现这一功能：

对于某区域某时段的碳通量异常 $\Delta F$，模型可以输出各驱动因子的贡献权重：

$$\Delta F = \sum_i \alpha_i \cdot \Delta x_i + \epsilon$$

其中 $\alpha_i$ 为注意力归因权重，$\Delta x_i$ 为各因子的异常（温度异常、降水异常、辐射异常、土地利用变化等），$\epsilon$ 为残差项。

这种归因能力对于以下应用场景具有重要价值：
- **碳中和监测**：评估各国/地区减排措施的实际效果
- **极端事件影响评估**：量化干旱、火灾、热浪对碳汇的冲击
- **碳汇预测**：预估未来气候情景下碳汇的变化趋势

#### 🧪 练习题
```yaml
question: "Global Carbon Tracker 相比传统碳反演方法（如 NOAA CarbonTracker）的核心架构创新是什么？"
options:
  - "使用更高分辨率的网格和更多观测站点数据"
  - "将碳循环子系统建模为多智能体交互架构，在物理-AI混合框架内实现端到端碳通量估算"
  - "采用更先进的集合卡尔曼滤波算法提升反演精度"
  - "仅使用卫星遥感数据替代地面观测网络"
answer: 1
explain: "Global Carbon Tracker 的核心创新在于将陆地、海洋、大气、人为排放分别建模为交互智能体，基于 NeuralGCM 的物理-AI 混合架构实现全碳循环耦合建模。传统方法将碳通量作为先验输入进行大气反演，而 Carbon Tracker 通过多智能体端到端学习，同时估算各子系统的碳通量并保证全局碳质量守恒。"
```

### U-Net

```yaml
id: unet
num: 16
name: U-Net
full_name: U型网络 (U-Net)
year: '2015'
org: University of Freiburg
parent: —
paper_url: https://arxiv.org/abs/1505.04597
project_url: ''
category: rs_analysis
motivation: 编码器-解码器语义分割架构
```

#### 📝 一句话总结
U-Net 提出了带跳跃连接的对称编码器-解码器全卷积网络，用下采样路径捕获上下文、上采样路径恢复定位细节，解决了少量标注图像下像素级语义分割难以兼顾全局语义和边界精度的问题。

#### 🎯 核心要点
- **U 形全卷积架构**：左侧 contracting path 提取多尺度上下文，右侧 expansive path 逐级上采样恢复空间分辨率
- **skip connection / copy-and-crop**：把编码端高分辨率特征裁剪后拼接到对应解码层，弥补 pooling 丢失的精细定位信息
- **无全连接层**：网络完全由卷积、池化、上采样和 \(1\times1\) 卷积构成，可对任意大图像做密集预测
- **valid convolution 设计**：原论文使用未 padding 的 \(3\times3\) 卷积，输出分割图小于输入图，只预测有完整上下文的像素
- **overlap-tile 推理**：通过镜像扩展边界并重叠切块，实现大图像无缝分割，避免 GPU 显存限制
- **少样本数据增强**：用随机弹性形变、平移、旋转和灰度变化扩充训练数据，尤其适合医学图像和遥感标注稀缺场景
- **加权交叉熵**：为类别频率和相邻实例之间的分割边界赋予更大权重，提升 touching objects 的分离能力
- **23 个卷积层**：每级 encoder 两个 \(3\times3\) conv+ReLU 后接 \(2\times2\) max pooling；decoder 每级 up-conv 后拼接对应 encoder 特征
- **遥感影响深远**：虽然原论文面向生物医学分割，U-Net 后来成为土地覆盖、道路提取、建筑物轮廓、水体/云检测等遥感分割任务的基础架构

#### 🔬 深入细节
##### 图示与可访问来源

![U-Net 架构图](https://ar5iv.labs.arxiv.org/html/1505.04597/assets/x1.png)
*图：U-Net 原论文 Figure 1。蓝色框为 feature map，白色框为从编码端复制并裁剪后的 feature map，灰色箭头为 skip connection。论文页见 https://arxiv.org/abs/1505.04597；ar5iv HTML 图文页见 https://ar5iv.labs.arxiv.org/html/1505.04597。*

##### 方法背景：滑窗分割为什么不够

U-Net 出现前，像素级分割常用 sliding-window CNN：对每个待分类像素裁剪一个局部 patch，再输出该中心像素类别。这样做能把少量图像转化为大量 patch，但有两个根本问题。第一，重叠 patch 大量重复计算，推理很慢；第二，patch 大小时存在语义上下文和定位精度的矛盾，大 patch 需要更多 pooling 看到上下文却会损失精细边界，小 patch 定位好但看不到足够背景。

U-Net 把任务改成 dense prediction。整张图或大 tile 一次输入，网络一次输出整块像素类别图。左侧 encoder 负责逐步扩大感受野，右侧 decoder 负责把粗分辨率语义特征还原到像素分辨率；skip connection 把浅层边缘、纹理和边界位置直接传到 decoder，使模型不必只依赖 bottleneck 中的低分辨率表示来恢复轮廓。

##### Contracting path：用下采样捕获上下文

编码端每一级执行两个 \(3\times3\) 卷积和 ReLU，然后通过 \(2\times2\) max pooling 下采样：

$$
h_l = \operatorname{ReLU}(W_{l,2} * \operatorname{ReLU}(W_{l,1} * h_{l-1}))
$$

$$
h_{l+1}^{in}=\operatorname{MaxPool}_{2\times2}(h_l)
$$

每次下采样后通道数翻倍，例如 64、128、256、512、1024。空间尺寸变小、通道数变大，相当于逐步从局部边缘和纹理抽象到对象级或区域级上下文。对遥感图像来说，这一点对应从局部纹理识别到“道路网络、屋顶群、水体边缘、田块边界”等更大空间模式。

##### Expansive path 与 skip connection

解码端每一级先做 \(2\times2\) up-convolution，把空间尺寸扩大一倍、通道数减半，再与编码端同尺度特征拼接：

$$
g_l = \operatorname{UpConv}_{2\times2}(g_{l+1})
$$

$$
\tilde{g}_l = \operatorname{Concat}(g_l,\operatorname{Crop}(h_l))
$$

$$
g_l' = \operatorname{ReLU}(V_{l,2} * \operatorname{ReLU}(V_{l,1} * \tilde{g}_l))
$$

原论文使用 valid convolution，因此每次 \(3\times3\) 卷积都会让 feature map 边界缩小，编码端 feature map 需要 crop 后才能与解码端 feature map 对齐。现代实现常用 padding 保持尺寸不变，但核心思想没有变：decoder 的粗语义输出必须结合 encoder 的高分辨率定位信息。

> 💡 关键：U-Net 的 skip connection 不是 ResNet 那种相加残差，而是 encoder 到 decoder 的通道拼接。它让网络同时拥有“深层上下文”和“浅层位置细节”，这是分割边界清晰的主要原因。

##### 输出层与像素级 softmax

最后一层用 \(1\times1\) 卷积把每个像素位置的 64 维特征向量映射到 \(K\) 个类别 logit：

$$
z_k(x)=w_k^\top g(x)+b_k
$$

像素 \(x\) 处类别 \(k\) 的 softmax 概率为：

$$
p_k(x)=\frac{\exp(z_k(x))}{\sum_{k'=1}^{K}\exp(z_{k'}(x))}
$$

普通像素级交叉熵为：

$$
\mathcal{L}_{CE}
=
-
\sum_{x\in\Omega}
\log p_{\ell(x)}(x)
$$

其中 \(\ell(x)\) 是 ground-truth 类别。U-Net 原论文在此基础上加入空间权重 \(w(x)\)，得到加权交叉熵：

$$
\mathcal{L}
=
-
\sum_{x\in\Omega}
w(x)\log p_{\ell(x)}(x)
$$

##### 边界加权：让模型学会分开相邻实例

医学细胞分割和遥感建筑/树冠/作物田块分割都有一个共同难点：相邻目标之间可能只有很窄的背景缝隙。普通交叉熵会被大面积背景或主体区域主导，模型容易把两个贴近实例连成一片。

U-Net 设计了一个预计算权重图：

$$
w(x)=w_c(x)+w_0
\exp\left(
-
\frac{(d_1(x)+d_2(x))^2}{2\sigma^2}
\right)
$$

\(w_c(x)\) 用于平衡类别频率；\(d_1(x)\) 是像素到最近目标边界的距离，\(d_2(x)\) 是到第二近目标边界的距离。若一个像素位于两个目标之间的狭窄边界，\(d_1+d_2\) 很小，指数项变大，训练时这个像素的错误会被更重惩罚。原论文设置 \(w_0=10\)、\(\sigma\approx5\) 像素，用于强化 touching cells 之间的分离边界。

对遥感场景，这个机制可以迁移到密集建筑物、农田地块、道路交叉口或河网边界：让模型不要只追求总体像素精度，而要把目标边界和类别交界处作为高价值区域学习。

##### Overlap-tile 推理与镜像边界

由于原论文使用 valid convolution，输入 \(572\times572\) tile 会输出较小的 \(388\times388\) 分割区域。U-Net 只预测“有完整上下文”的中心区域，边缘像素需要从相邻 tile 或镜像扩展中获得上下文。

overlap-tile 策略可描述为：

1. 对大图像按输出区域大小切成重叠 tile
2. 对每个 tile 的输入边界做 mirror padding，补足卷积所需上下文
3. 只保留网络输出中心区域
4. 把所有中心区域拼接成完整分割图

这在遥感大图中尤其重要。卫星影像常远大于 GPU 可处理尺寸，直接缩放会丢失细节，直接切块又容易在 tile 边缘产生断裂；overlap-tile 用冗余上下文换取无缝预测。

##### 伪代码：U-Net forward 与训练

```python
# U-Net 核心逻辑：编码器-解码器 + skip concatenation
def conv_block(x, channels):
    x = conv3x3(x, channels)
    x = relu(x)
    x = conv3x3(x, channels)
    x = relu(x)
    return x


def unet_forward(image):
    skips = []
    x = image

    # contracting path
    for channels in [64, 128, 256, 512]:
        x = conv_block(x, channels)
        skips.append(x)
        x = max_pool2x2(x)

    # bottleneck
    x = conv_block(x, 1024)

    # expansive path
    for channels, skip in zip([512, 256, 128, 64], reversed(skips)):
        x = up_conv2x2(x, channels)
        skip = crop_to_match(skip, x)  # 原论文 valid conv 需要裁剪
        x = concat([x, skip], axis="channel")
        x = conv_block(x, channels)

    logits = conv1x1(x, num_classes)
    return softmax(logits, axis="class")


def train_step(image, mask, weight_map):
    prob = unet_forward(augment_with_elastic_deformation(image))
    loss = -sum_over_pixels(weight_map * log(prob[class_at(mask)]))
    return loss
```

##### 与 FCN、DeepLab 和遥感分割的关系

U-Net 建立在 fully convolutional network 思想上，但比早期 FCN 更强调 decoder 对称性和高通道数上采样路径。FCN 可以用粗预测加 skip 融合得到密集输出，U-Net 则把“编码-解码-同尺度拼接”做成清晰、可复用的结构模板，因此后来几乎成为小样本像素分割的默认起点。

DeepLab 系列后来用 atrous convolution 和 ASPP 扩展多尺度上下文，尤其适合大范围语义分割；U-Net 则在边界定位、小数据和医学/遥感实例相邻场景中更直接。许多遥感模型如 ResUNet、UNet++、Attention U-Net、Swin-UNet 和扩散式分割网络，本质上都保留了 U-Net 的多尺度 encoder-decoder 与 skip fusion 思路，只是替换 backbone、注意力模块或损失函数。

##### 局限性

原始 U-Net 使用 \(3\times3\) valid convolution 和较浅 CNN backbone，对超大遥感场景中的长程依赖、跨尺度类别混淆和多光谱/多时相输入并不天然最优。它也没有内置实例分离，若任务需要区分每栋建筑、每棵树或每个细胞，通常还要结合边界损失、距离变换、watershed、Mask R-CNN 风格 head 或后处理。

#### 🧪 练习题
```yaml
question: "U-Net 中 skip connection 的主要作用是什么？"
options:
  - "减少输入图像的通道数"
  - "把编码端高分辨率定位特征拼接到解码端，帮助恢复清晰边界"
  - "替代 softmax 损失函数"
  - "让网络只能处理固定大小图像"
answer: 1
explain: "U-Net 的跳跃连接把浅层高分辨率特征与深层语义特征融合，解决下采样造成的定位信息丢失，因此能在像素级分割中保留边界细节。"
```

### DeepLabv3+

```yaml
id: deeplabv3plus
num: 17
name: DeepLabv3+
full_name: DeepLabv3+ (DeepLabv3+)
year: '2018'
org: Google
parent: unet
paper_url: https://arxiv.org/abs/1802.02611
project_url: ''
category: rs_analysis
motivation: ASPP多尺度上下文捕获
```

#### 📝 一句话总结
DeepLabv3+ 将 DeepLabv3 的 ASPP 多尺度上下文编码器与轻量 decoder 结合，用空洞卷积控制特征分辨率、用低层特征恢复边界细节，解决了语义分割中“全局语义强但边界粗糙”的问题。

#### 🎯 核心要点
- **DeepLabv3 作为编码器**：ASPP 并行使用 \(1\times1\) 卷积、多个不同 atrous rate 的 \(3\times3\) 卷积和 image-level pooling 来捕获多尺度上下文
- **新增轻量 decoder**：先把 encoder 输出上采样 4 倍，再与 backbone 的低层特征拼接，最后用卷积细化并上采样回原图尺度
- **低层通道压缩**：对 Conv2 等浅层特征先做 \(1\times1\) 卷积降到较少通道，避免浅层纹理压过 encoder 的 256 通道语义特征
- **可调 output stride**：通过空洞卷积把 backbone 输出步幅控制在 16 或 8，在精度、显存和速度之间做取舍
- **atrous separable convolution**：将深度可分离卷积用于 ASPP 与 decoder，降低计算量并提升 Xception backbone 下的分割表现
- **无 DenseCRF 后处理**：论文在 PASCAL VOC 2012 和 Cityscapes 上直接输出结果，报告测试 mIoU 分别达到 89.0% 和 82.1%
- **对遥感分割的意义**：遥感地物尺度差异大、边界细而复杂，ASPP 的多尺度感受野与 decoder 的边界恢复正好对应道路、建筑、水体和地貌单元的常见难点

#### 🔬 深入细节
##### 图示与整体架构

![DeepLabv3+ 编码器-解码器结构](https://ar5iv.labs.arxiv.org/html/1802.02611/assets/x4.png)
*图：DeepLabv3+ 以 ASPP 作为 encoder，在 decoder 中融合低层特征并逐步恢复空间细节。开放 HTML 来源见 https://ar5iv.labs.arxiv.org/html/1802.02611，论文页见 https://arxiv.org/abs/1802.02611。*

##### 算法伪代码

```python
# DeepLabv3+ semantic segmentation 伪代码
def deeplabv3plus(image, backbone, aspp, classifier):
    # 1. Backbone 用 output_stride 控制最终特征分辨率，保留一个浅层特征用于边界恢复
    low_level, high_level = backbone(image, output_stride=16)

    # 2. Encoder: ASPP 在 high_level 上并行采样多尺度上下文
    context = aspp([
        conv1x1(high_level),
        atrous_conv3x3(high_level, rate=6),
        atrous_conv3x3(high_level, rate=12),
        atrous_conv3x3(high_level, rate=18),
        image_pooling(high_level),
    ])

    # 3. Decoder: 先把语义特征放大到浅层特征尺度
    context = bilinear_upsample(context, scale=4)
    low_level = conv1x1(low_level, out_channels=48)
    fused = concat([context, low_level], axis="channels")

    # 4. 两个 3x3 卷积细化边界，再恢复到输入分辨率
    fused = separable_conv3x3(fused, out_channels=256)
    fused = separable_conv3x3(fused, out_channels=256)
    logits = classifier(bilinear_upsample(fused, scale=4))
    return softmax(logits)
```

##### 为什么只靠 DeepLabv3 不够

DeepLabv3 的强项是上下文。它通过 ASPP 在最后一层语义特征上并行使用不同采样间隔的空洞卷积，让同一个像素位置可以同时看到近邻纹理和更大范围的语义区域。对遥感图像来说，这相当于同时观察局部边缘、街区尺度和地貌尺度，能缓解建筑、道路、农田、水体在尺寸上跨度很大的问题。

但 DeepLabv3 通常直接把低分辨率 logits 双线性上采样到原图。即使高层语义判断正确，物体轮廓也容易被 output stride 抹平：细道路会断裂，建筑边界会糊成块，河岸或滑坡边界会偏移。DeepLabv3+ 的 decoder 正是为这个问题设计的，它不试图构造复杂的逐级 U-Net，而是只取一层浅层细节，与 ASPP 输出融合后做少量卷积。

##### 空洞卷积与 ASPP

二维空洞卷积可写成：

$$
y[i]=\sum_{k} x[i+r\cdot k]\,w[k]
$$

其中 \(r\) 是 atrous rate。\(r=1\) 时退化为普通卷积；\(r>1\) 时卷积核权重之间插入空洞，参数量不变但有效感受野扩大。ASPP 把多个 rate 的响应拼接：

$$
z=\operatorname{Conv}_{1\times1}\left(
\operatorname{Concat}\left[
f_{1\times1}(x),
f_{3\times3}^{r_1}(x),
f_{3\times3}^{r_2}(x),
f_{3\times3}^{r_3}(x),
f_{\text{image-pool}}(x)
\right]\right)
$$

直觉上，小 rate 更关注局部结构，大 rate 捕获更宽的上下文，image-level pooling 注入全局场景先验。对于遥感分割，某个像素是否属于道路或河道，经常不仅取决于像素颜色，还取决于它是否处在连续线状结构、城市纹理或地形背景中。

##### Decoder 为什么要压缩低层特征

论文的 decoder 做法很克制：encoder 输出先上采样 4 倍；浅层特征先过 \(1\times1\) 卷积降通道；二者拼接后接几个 \(3\times3\) 卷积，最后再上采样 4 倍。低层特征包含边缘、纹理和局部几何，但语义弱、通道多。如果直接拼接，模型容易过度依赖浅层纹理，导致同色屋顶、裸地、道路和河滩混淆。

通道压缩可以理解为给浅层信息加一个“瓶颈”：它只提供必要的定位线索，而不主导语义判断。最终 logits 由高层 ASPP 的类别语义和低层边界位置共同决定：

$$
\hat{Y}
=\operatorname{Upsample}_{4}\left(
g_{3\times3}\left(
\operatorname{Concat}\left[
\operatorname{Upsample}_{4}(z_{\text{ASPP}}),
\operatorname{Conv}_{1\times1}(x_{\text{low}})
\right]\right)\right)
$$

##### Atrous separable convolution

标准卷积把空间卷积和通道混合一起做。深度可分离卷积先对每个通道独立做空间卷积，再用 \(1\times1\) pointwise convolution 混合通道：

$$
\operatorname{SepConv}(x)
=\operatorname{Pointwise}_{1\times1}
\left(\operatorname{Depthwise}_{k\times k}(x)\right)
$$

DeepLabv3+ 进一步把 atrous convolution 放进 depthwise 阶段，得到 atrous separable convolution。这样 ASPP 的大感受野仍然保留，但计算量明显低于同等通道数的普通空洞卷积。论文还把 Xception 改成更适合 dense prediction 的 backbone：增加层数、用 depthwise separable convolution 替换更多卷积，并在最后几层配合 output stride 使用空洞卷积。

##### 训练目标和推理流程

DeepLabv3+ 的训练目标是像素级语义分类交叉熵。设类别数为 \(C\)，像素集合为 \(\Omega\)，真实标签 one-hot 为 \(y_{i,c}\)，模型输出概率为 \(p_{i,c}\)，则：

$$
\mathcal{L}_{\text{CE}}
=-\sum_{i\in\Omega}\sum_{c=1}^{C} y_{i,c}\log p_{i,c}
$$

推理时可以根据预算选择 eval output stride。较小的 output stride 让 encoder 特征更密，边界和小目标更好，但显存和 Multiply-Adds 增加；较大的 output stride 更快，但 decoder 需要从更粗的特征恢复细节。论文的关键结论是：ASPP 负责“看多大范围”，decoder 负责“把边界放准”，二者组合比单独依赖金字塔池化或普通 encoder-decoder 更稳。

> 💡 关键：DeepLabv3+ 不是把 U-Net 和 DeepLab 简单相加，而是用 ASPP 提供多尺度语义，用一个很浅的 decoder 注入边界坐标信息，因此兼顾上下文和定位。

#### 🧪 练习题
```yaml
question: "DeepLabv3+ 相比 DeepLabv3 的核心改动是什么？"
options:
  - "完全取消 ASPP，只保留普通 U-Net 跳连"
  - "在 DeepLabv3 的 ASPP 编码器后加入轻量 decoder，并融合低层特征恢复边界"
  - "把所有卷积替换为全连接层，直接分类整幅图像"
  - "只依赖 DenseCRF 后处理来提升边界质量"
answer: 1
explain: "DeepLabv3+ 保留 ASPP 的多尺度上下文建模，同时增加 decoder 融合浅层细节，主要改善上采样后物体边界粗糙的问题。"
```

### ResUNet

```yaml
id: resunet
num: 18
name: ResUNet
full_name: 残差U-Net (ResUNet)
year: '2019'
org: NTNU
parent: unet
paper_url: https://www.researchgate.net/publication/332131318
project_url: ''
category: rs_analysis
motivation: 残差连接增强特征传递
```

#### 📝 一句话总结
ResUNet 用残差单元替换 U-Net 中的普通卷积块，并保留编码器到解码器的跨层拼接，使深层网络在遥感像素级分割中更容易训练，同时让浅层细节和高层语义更顺畅地传播。

#### 🎯 核心要点
- **来源限制**：给定 `paper_url` 的 ResearchGate 编号实际指向无关文章；本文以可访问的遥感论文 `Road Extraction by Deep Residual U-Net`（arXiv:1711.10684 / IEEE GRSL 2018）作为 ResUNet 方法主来源
- **U-Net 主体不变**：整体仍是 encoding、bridge、decoding 三段式结构，解码端逐级上采样并拼接对应编码层特征
- **残差单元替换 plain unit**：每个基本块用 BN、ReLU、Conv 组成残差函数，并通过 identity mapping 把输入加到输出上
- **双重跳连**：块内 residual skip 缓解梯度退化，U-Net 级别的 encoder-decoder skip 保留空间定位与细边界信息
- **无需裁剪操作**：与原始 U-Net 中因 valid convolution 带来的 cropping 不同，该设计通过 padding 保持尺寸对齐，使拼接更直接
- **更少参数的道路提取**：论文在 Massachusetts Roads 数据集上用 7-level、15-layer ResUNet，比 U-Net 参数少且 break-even point 更高
- **训练目标简单**：原论文用像素级 MSE 训练二值道路区域分割，推理大图时采用重叠裁块并对重叠区域平均融合

#### 🔬 深入细节
##### 图示与可访问来源

![Deep Residual U-Net 架构图](https://ar5iv.labs.arxiv.org/html/1711.10684/assets/x2.png)
*图：Deep Residual U-Net 的编码、桥接和解码结构。每层由残差单元构成，解码端上采样后与对应编码层拼接。开放 HTML 来源见 https://ar5iv.labs.arxiv.org/html/1711.10684，论文页见 https://arxiv.org/abs/1711.10684。*

给定 ResearchGate URL `https://www.researchgate.net/publication/332131318` 当前可访问内容与 ResUNet 无关，因此不能作为该算法论文依据。下文方法细节基于遥感道路提取领域常引用的 Deep Residual U-Net 论文；它与 YAML 中“残差连接增强特征传递”的算法描述一致。

##### 算法伪代码

```python
# ResUNet road/remote-sensing segmentation 伪代码
def residual_unit(x, out_channels, stride=1):
    shortcut = x
    y = batch_norm(x)
    y = relu(y)
    y = conv2d(y, out_channels, kernel_size=3, stride=stride, padding="same")
    y = batch_norm(y)
    y = relu(y)
    y = conv2d(y, out_channels, kernel_size=3, stride=1, padding="same")

    if shortcut.shape != y.shape:
        shortcut = conv2d(shortcut, out_channels, kernel_size=1, stride=stride)
    return y + shortcut


def resunet_forward(tile):
    # Encoding: 用 stride=2 的残差单元逐级降采样，而不是单独 max pooling
    e1 = residual_unit(tile, 64, stride=1)
    e2 = residual_unit(e1, 128, stride=2)
    e3 = residual_unit(e2, 256, stride=2)

    # Bridge: 最低分辨率语义表征
    b = residual_unit(e3, 512, stride=2)

    # Decoding: 上采样后拼接同尺度编码特征，再用残差单元细化
    d3 = residual_unit(concat([upsample(b), e3]), 256)
    d2 = residual_unit(concat([upsample(d3), e2]), 128)
    d1 = residual_unit(concat([upsample(d2), e1]), 64)

    logits = conv2d(d1, 1, kernel_size=1)
    return sigmoid(logits)
```

##### 从 U-Net 到 ResUNet

原始 U-Net 的强项是多尺度细节融合：编码路径逐步压缩空间分辨率以获得语义，解码路径逐步上采样，并把同尺度编码层特征拼接回来。问题在于，如果网络变深，plain convolution block 容易出现梯度传播困难和退化现象；如果网络较浅，又可能无法利用足够大的上下文来区分道路、屋顶、河岸、停车场等外观相近区域。

ResUNet 的基本改动是把 U-Net 每一级的普通卷积块换成残差单元。一个残差单元可写为：

$$
\mathbf{x}_{l+1}=h(\mathbf{x}_{l})+\mathcal{F}(\mathbf{x}_{l}, W_l)
$$

其中 \(h(\mathbf{x}_l)\) 通常是 identity mapping；当通道数或空间尺寸变化时，用 \(1\times1\) projection 对齐。残差分支 \(\mathcal{F}\) 由 BN、ReLU 和卷积组成。这样模型不必直接学习完整映射 \(\mathbf{x}_{l}\mapsto \mathbf{x}_{l+1}\)，而是学习相对输入的修正量。

##### 双重信息通路为什么有效

ResUNet 有两类 skip connection。第一类是残差单元内部的短跳连，它让梯度可以绕过若干卷积层直接回传，缓解深层训练不稳定。第二类是 U-Net 编码器到解码器的长跳连，它把浅层空间细节送到对应尺度的解码层，帮助恢复道路边缘、窄桥、交叉口和被树冠遮挡的线状结构。

这两类跳连的作用不同：块内 residual skip 解决“学不动”的优化问题，U-Net skip 解决“定位丢失”的表示问题。遥感分割常有小目标、细目标和类间纹理相似的问题，因此同时需要深层上下文和浅层边界。

##### 网络结构与尺寸对齐

论文使用 7-level 架构：3 个编码残差单元、1 个 bridge 残差单元、3 个解码残差单元，最后用卷积和 sigmoid 输出道路概率图。编码阶段不使用单独 pooling，而是在残差单元的第一层卷积中设置 stride=2 完成下采样；解码阶段先上采样，再与对应编码特征 concatenate。

原始 U-Net 使用 valid convolution 时，特征图尺寸会收缩，因此拼接前常需要裁剪编码特征。ResUNet 使用 padding 保持尺寸更易对齐，省去 cropping，使网络结构更适合工程实现和大图滑窗推理。

##### 损失函数与重叠裁块推理

对二值道路区域，论文采用像素级均方误差训练。设训练样本为 \((X_i, Y_i)\)，模型输出为 \(f(X_i;\theta)\)，则：

$$
\mathcal{L}_{\text{MSE}}(\theta)
=\frac{1}{N}\sum_{i=1}^{N}
\left\|Y_i-f(X_i;\theta)\right\|_2^2
$$

今天的实现通常会换成 binary cross entropy、Dice loss 或 focal loss 来处理前景稀疏和类别不平衡，但原始 ResUNet 论文的核心贡献不在损失，而在残差 U-Net 结构本身。

高分辨率遥感图往往不能整幅送入 GPU。论文采用重叠滑窗策略：从大图裁出相互重叠的 patch，分别预测后再把重叠区域平均。这样可以减轻卷积 padding 在 patch 边界带来的低置信度问题：

$$
\hat{Y}(p)=
\frac{1}{|\mathcal{T}(p)|}
\sum_{t\in \mathcal{T}(p)} \hat{Y}_t(p)
$$

其中 \(\mathcal{T}(p)\) 是覆盖像素 \(p\) 的所有预测 tile 集合。

##### 与普通 U-Net 的差异

普通 U-Net 主要依靠 encoder-decoder 拼接恢复细节，但每一级的卷积块仍然是直接映射。ResUNet 把每一级变成“输入 + 残差修正”，因此可以在不显著增加训练难度的情况下加深网络或减少冗余参数。论文在 Massachusetts Roads 数据集上报告，ResUNet 的参数量约为 U-Net 的四分之一，却取得更高的 relaxed precision-recall break-even point。

从遥感应用角度看，残差结构还带来一个实用好处：道路、断层线、河网、建筑轮廓等目标都有强几何连续性，模型需要在局部纹理和大范围上下文之间来回传递信息。ResUNet 的短跳连与长跳连共同缩短了这种信息传递路径。

> 💡 关键：ResUNet 的“残差”不是替代 U-Net 跳连，而是叠加在 U-Net 跳连内部；它同时改善优化和定位，因此成为很多遥感分割模型的基础模板。

#### 🧪 练习题
```yaml
question: "ResUNet 相比普通 U-Net 的关键结构变化是什么？"
options:
  - "把编码器和解码器之间的跳连全部删除"
  - "用残差单元替换普通卷积块，同时保留 U-Net 的跨层拼接"
  - "只使用全局平均池化输出图像级类别"
  - "通过 CRF 后处理代替神经网络中的上采样"
answer: 1
explain: "ResUNet 在每一级卷积块内部加入 identity/residual skip，缓解深层训练退化；同时保留 U-Net 的 encoder-decoder skip 来恢复空间细节。"
```

### SatMAE

```yaml
id: satmae
num: 19
name: SatMAE
full_name: 卫星掩码自编码器 (SatMAE)
year: '2022'
org: Stanford University
parent: deeplabv3plus
paper_url: https://arxiv.org/abs/2207.08051
project_url: ''
category: rs_analysis
motivation: 卫星图像时空多光谱掩码预训练
```

#### 📝 一句话总结
SatMAE 将 Masked Autoencoder 改造成适配卫星遥感的自监督预训练框架，通过时间/光谱位置编码、按时间或波段组独立 masking、以及多光谱分组 patch embedding，解决自然图像 MAE 难以直接利用卫星时序与多光谱结构的问题。

#### 🎯 核心要点
- **MAE 基础框架**：只把未遮挡 patch token 送入 ViT encoder，decoder 用 mask token 重建被遮挡 patch，并只在 masked patches 上计算 MSE
- **Temporal SatMAE**：对同一地点的不规则时间序列分别 patchify，共享 patch embedding，并把 year、month、hour 编码并入位置编码
- **Independent Masking**：时间序列或光谱组上的 masking 不要求同一空间位置同时被遮挡，让模型能利用其他时间或波段的可见信息重建当前遮挡区域
- **Multi-spectral SatMAE**：不简单把 Sentinel-2 波段堆成通道，而是按 RGB+NIR、Red Edge、SWIR 等光谱组分开 patch embedding
- **Spectral Encoding**：为每个波段组加入 group encoding，使 token 同时知道空间位置和所属光谱组
- **新数据集 fMoW-Sentinel**：论文构建了跨 fMoW 位置的 Sentinel-2 多光谱数据，用于多光谱预训练与评测
- **下游迁移有效**：论文报告 SatMAE 在 fMoW、fMoW-Sentinel、NAIP、SpaceNet、EuroSAT、BigEarthNet 等分类和分割任务上提升表现

#### 🔬 深入细节
##### 图示与整体框架

![SatMAE 主框架](https://ar5iv.labs.arxiv.org/html/2207.08051/assets/x1.png)
*图：SatMAE 将时间或光谱序列切成 patch token，加入空间和时间/光谱位置编码，在 MAE encoder-decoder 中重建 masked patches。开放 HTML 来源见 https://ar5iv.labs.arxiv.org/html/2207.08051，论文页见 https://arxiv.org/abs/2207.08051。*

![SatMAE 时间与光谱编码](https://ar5iv.labs.arxiv.org/html/2207.08051/assets/x2.png)
*图：Temporal SatMAE 共享 patch embedding 并加入 year/month/hour 编码；Spectral SatMAE 为不同波段组使用不同 patch embedding 并加入 group encoding。*

![SatMAE masking 策略](https://ar5iv.labs.arxiv.org/html/2207.08051/assets/x3.png)
*图：时间序列中的 consistent masking 与 independent masking。论文认为卫星图像时间间隔大、季节和人类活动变化明显，independent masking 不会像高帧率视频那样简单泄漏答案。*

##### 算法伪代码

```python
# SatMAE self-supervised pre-training 伪代码
def satmae_pretrain(batch, mode):
    # batch 可以是 temporal images: [B, T, C, H, W]
    # 也可以是 multispectral groups: [B, G, C_g, H, W]
    tokens = []
    metadata = []

    if mode == "temporal":
        for t in range(batch.num_times):
            # 时间维共享 patch embedding
            patch_tokens = shared_patch_embed(batch.images[:, t])
            pos = spatial_pos_encoding(patch_tokens.xy)
            temp = temporal_encoding(year=batch.year[t], month=batch.month[t], hour=batch.hour[t])
            tokens.append(patch_tokens + concat_encoding(pos, temp))
    elif mode == "spectral":
        for g, bands in enumerate(batch.band_groups):
            # 不同光谱组使用独立 patch embedding
            patch_tokens = group_patch_embed[g](batch.images[:, bands])
            pos = spatial_pos_encoding(patch_tokens.xy)
            spec = spectral_group_encoding(g)
            tokens.append(patch_tokens + concat_encoding(pos, spec))

    tokens = concatenate(tokens, dim="sequence")

    # Independent Masking: 在完整 token 序列上随机遮挡
    visible_tokens, mask_index = random_mask(tokens, mask_ratio=0.75, strategy="independent")
    latent = vit_encoder(visible_tokens)

    # Decoder 接收编码后的 visible token 和 learnable mask tokens，复原原始序列顺序
    full_tokens = insert_mask_tokens(latent, mask_index)
    reconstructed = mae_decoder(full_tokens)

    # 只在 masked patches 上计算像素重建误差
    loss = mse(reconstructed[mask_index], target_patches(tokens.original_images)[mask_index])
    loss.backward()
    optimizer.step()
```

##### 为什么自然图像 MAE 不能直接解决卫星图像

标准 MAE 假设输入是一张 RGB 图像，patch token 的位置主要由二维坐标决定。卫星影像不只是一张图：同一地点可能有多年多季节观测，时间间隔不规则；同一像素还可能包含可见光、近红外、红边、短波红外等多光谱信息。简单把时间帧或光谱波段堆到 channel 维度，会让模型只在初始 patch embedding 看到这些维度，进入 transformer 后 token 不再明确知道自己来自哪个时间或哪个波段组。

SatMAE 的核心思路是把时间和光谱也变成 token 身份的一部分。每个 token 不仅有空间坐标 \((x,y)\)，还带有时间坐标或光谱组坐标；模型在预训练时必须根据可见的空间、时间和光谱上下文重建被遮挡 patch。

##### Temporal SatMAE：不规则时间的显式编码

给定同一地点的时间序列输入：

$$
\mathbf{X}\in\mathbb{R}^{T\times C\times H\times W}
$$

SatMAE 对每个时刻的图像分别 patchify，并对所有时间共享同一个 patch embedding \(f_p\)。对第 \(t\) 个时间、空间位置 \((x,y)\) 的 patch，token 可表示为：

$$
\mathbf{z}_{t,x,y}
=f_p(\mathbf{x}_{t,x,y})
+\operatorname{PE}_{xy}(x,y)
+\operatorname{TE}(\text{year}_t,\text{month}_t,\text{hour}_t)
$$

论文保留 year、month、hour，而不强调 day、minute、second。直觉是：年份可以反映长期土地变化，月份对应季节和植被周期，小时影响太阳高度和阴影；而具体日期、分钟、秒通常对遥感语义不如前三者稳定。

##### Independent Masking 的作用

对时间序列，consistent masking 会在所有时间帧遮住同一空间位置；independent masking 则在整个 \(T\times L\) token 集合中随机遮挡，不同时间的同一位置可能一个可见、一个不可见。论文认为，对高帧率视频这可能让模型“抄答案”，但卫星图像的时间间隔往往跨月跨年，同一地点会因为季节、云影、人类活动或地表变化而不同，因此利用其他时间的可见 token 仍要求模型学习语义和变化规律。

如果 \(M\) 是 masked token 集合，MAE 重建损失为：

$$
\mathcal{L}_{\text{MAE}}
=\frac{1}{|M|}
\sum_{i\in M}
\left\|
\hat{\mathbf{x}}_i-\mathbf{x}_i
\right\|_2^2
$$

这里的 \(i\) 不再只是二维 patch 索引，而是空间、时间或光谱组联合索引。

##### Multi-spectral SatMAE：分组比堆叠更合理

Sentinel-2 有多个空间分辨率和波长范围不同的波段。简单 `Stack Channels` 会让一个卷积 patch embedding 同时处理所有波段，容易混合物理含义不同的信号。SatMAE 提出 `Group Channels`：把波段划分为若干组，例如论文实验中去掉 60m 的 B1、B9、B10 后，把 10 个波段分为：

- RGB+NIR：B2、B3、B4、B8
- Red Edge：B5、B6、B7、B8A
- SWIR：B11、B12

对第 \(g\) 个光谱组使用独立 patch embedding \(f_{p,g}\)，并加入 group encoding：

$$
\mathbf{z}_{g,x,y}
=f_{p,g}(\mathbf{x}_{g,x,y})
+\operatorname{PE}_{xy}(x,y)
+\operatorname{SE}(g)
$$

这样 transformer 能区分“同一空间 patch 的 RGB token”和“同一空间 patch 的 SWIR token”。这对地物识别很关键：植被、水体、裸土、积雪、建筑材料在近红外和短波红外上的响应往往比 RGB 更有判别力。

##### 训练、迁移与和 DeepLabv3+ 的关系

SatMAE 预训练结束后，通常丢弃 MAE decoder，保留 ViT encoder 作为下游任务的初始化。分类任务接线性头或 MLP 头；语义分割任务需要把 transformer token 转回空间特征，再接分割 head。元信息里把 parent 指向 DeepLabv3+，可以理解为遥感分析范式从“监督分割架构设计”进一步转向“用海量未标注卫星影像预训练表征，再迁移到分类/分割任务”。SatMAE 本身不是 DeepLabv3+ 的 decoder 改造，而是自监督预训练层面的上游能力。

论文实验显示，SatMAE 的收益来自三个方面：MAE 让 ViT 能在缺少标签的遥感影像上学习通用表征；temporal encoding 让模型理解季节和长期变化；spectral grouping 与 spectral encoding 让模型保留不同波段的物理意义。对建筑分割、土地覆盖分类等任务，这些表征可减少对人工标注的依赖。

> 💡 关键：SatMAE 的创新不是“把 MAE 用在卫星图上”这么简单，而是把 token 的坐标系从二维空间扩展为“空间 + 时间/光谱”，并设计 masking 让模型主动利用遥感数据特有的冗余和互补信息。

#### 🧪 练习题
```yaml
question: "SatMAE 中 independent masking 的主要目的是什么？"
options:
  - "确保同一空间位置在所有时间或波段组中都被同时遮挡"
  - "让模型可以利用其他时间或光谱组的可见 token 重建被遮挡区域，从而学习时空/光谱互补表征"
  - "把所有 Sentinel-2 波段永久丢弃，只保留 RGB"
  - "取消 MAE decoder，只训练监督分类头"
answer: 1
explain: "Independent masking 在联合 token 序列上随机遮挡，不强制同一位置跨时间或跨光谱一致遮挡，因此模型需要学习不同时间和波段之间的关系来完成重建。"
```

### Prithvi

```yaml
id: prithvi
num: 20
name: Prithvi
full_name: 地球基础模型 (Prithvi)
year: '2023'
org: IBM & NASA
parent: satmae
paper_url: https://huggingface.co/ibm-nasa-geospatial
project_url: ''
category: rs_analysis
motivation: 地理空间基础模型HLS数据预训练
```

#### 📝 一句话总结
Prithvi 将 MAE/ViT 预训练扩展到多时相、多光谱 HLS 卫星影像，用 3D patch embedding 和 3D 位置编码学习可迁移的地表表征，解决了遥感任务高度依赖小规模标注、模型难以跨任务复用的问题。

#### 🎯 核心要点
- **100M 参数地理空间基础模型**：IBM 与 NASA 基于 ViT-MAE 训练 Prithvi-100M，并在 Hugging Face 开源模型权重、推理和微调工作流
- **HLS 多光谱预训练数据**：使用 NASA Harmonized Landsat Sentinel-2 30m 地表反射率数据，输入包含 Blue、Green、Red、Narrow NIR、SWIR 1、SWIR 2 六个波段
- **视频式遥感输入格式**：模型接受 \((B,C,T,H,W)\) 形状的多时相影像序列，既可处理 \(T=3\) 的时间序列，也可退化为 \(T=1\) 的静态图像
- **3D MAE 改造**：把原始 MAE 的 2D patch embedding、2D positional embedding、2D patchify/unpatchify 改为 3D 版本，以同时编码空间位置和时间维度
- **云与缺失值过滤流水线**：通过 FMask 和离线索引筛选高质量 HLS 子区域，并用 Zarr 组织训练样本，降低大规模 GeoTIFF 随机读取瓶颈
- **多任务微调验证**：在云缺口补全、洪水制图、野火烧毁迹地分割、多时相作物分割等任务中验证预训练权重的收敛速度和数据效率

#### 🔬 深入细节
##### 图示与可访问来源

![Prithvi MAE 预训练结构](https://ar5iv.labs.arxiv.org/html/2310.18660/assets/x2.png)
*图：Prithvi 论文 Figure 3。多时相多光谱 HLS 影像被随机遮蔽后，经 3D patch embedding 输入 ViT 编码器，解码器重建原始影像并用 MSE 训练。*

![Prithvi 基础模型开发流程](https://ar5iv.labs.arxiv.org/html/2310.18660/assets/x1.png)
*图：Prithvi 论文 Figure 1。完整流程包含地理空间数据采样、过滤预处理、自监督预训练、下游微调和推理部署。*

来源说明：任务给出的 `paper_url` 是 Prithvi Hugging Face 模型家族页；方法细节主要来自技术论文 `Foundation Models for Generalist Geospatial Artificial Intelligence`（arXiv:2310.18660）和官方模型卡 `ibm-nasa-geospatial/Prithvi-EO-1.0-100M`。

##### 算法伪代码

```python
# Prithvi-EO-1.0 的 MAE 预训练与微调流程
def pretrain_prithvi(hls_timeseries, mask_ratio=0.75):
    # hls_timeseries: [B, C=6, T, H, W], HLS 多光谱多时相反射率
    x = normalize_and_filter_with_fmask(hls_timeseries)

    # 1. 3D patchify: 用时间 x 高 x 宽的 tubelet 切分输入
    patches = patchify_3d(x, patch_size=(1, 16, 16))
    visible, masked_index = random_mask(patches, ratio=mask_ratio)

    # 2. 3D ViT encoder 只处理可见 token
    tokens = patch_embed_3d(visible) + positional_encoding_3d(visible)
    latent = vit_encoder(tokens)

    # 3. Decoder 放回可见 token 并补入 mask token，重建完整影像
    full_tokens = restore_with_mask_tokens(latent, masked_index)
    pred_patches = vit_decoder(full_tokens)

    # 4. 仅在 masked patch 上计算像素空间 MSE
    loss = mse(pred_patches[masked_index], patches[masked_index])
    return loss


def finetune_prithvi(pretrained_encoder, labeled_chips, task_decoder):
    for image_sequence, label in labeled_chips:
        features = pretrained_encoder(image_sequence)
        prediction = task_decoder(features)
        loss = task_loss(prediction, label)  # segmentation CE/Dice 或回归损失
        update(pretrained_encoder, task_decoder, loss)
```

##### 为什么遥感基础模型不能直接套普通 MAE

自然图像 MAE 默认输入是 RGB 单帧图像，空间 patch 的含义比较稳定；HLS 遥感影像不同，单个样本既有多个光谱波段，又可能包含同一地点的多个观测时间。若把每个时间片单独当作 2D 图像处理，模型很难知道“同一地块在不同日期的观测”应当共享空间语义；若把时间和波段粗暴拼到通道维，时间顺序和时相差异又会被弱化。

Prithvi 的核心改造是把输入看成一个 3D 遥感体：

$$
X \in \mathbb{R}^{C \times T \times H \times W}
$$

其中 \(C=6\) 为 HLS 公共波段，\(T\) 为时间步。3D patch embedding 用 3D 卷积把输入切成 tubelet token：

$$
z_i = \mathrm{Conv3D}_{(t_p,h_p,w_p)}(X_i)
$$

论文实现中时间 tubelet 可设为 1，使每个 token 仍对应一个具体观测日期的局部空间块；但位置编码扩展为时间、高度、宽度三维，使模型知道 token 在序列中的时空位置：

$$
p_{t,h,w} = \mathrm{PE}_t(t) \oplus \mathrm{PE}_h(h) \oplus \mathrm{PE}_w(w)
$$

这样做的直觉是：同一地块的农作物物候、洪水退水和烧毁迹地恢复都体现为时序变化；同一时间的邻近 patch 又构成空间纹理。3D ViT 让二者在同一个 token 序列里被注意力机制联合建模。

##### 遮蔽重建目标

Prithvi 沿用 MAE 的非对称编码器-解码器思想。随机遮蔽 patch 集合 \(\mathcal{M}\)，编码器只看未遮蔽集合 \(\mathcal{V}\)：

$$
H_{\mathcal{V}} = f_{\theta}\left(E_{3D}(X_{\mathcal{V}})+P_{3D,\mathcal{V}}\right)
$$

解码器接收编码后的可见 token 与可学习 mask token，重建完整 HLS 影像：

$$
\hat{X}_{\mathcal{M}} = g_{\phi}\left(H_{\mathcal{V}}, m_{\mathcal{M}}, P_{3D}\right)
$$

预训练损失是在被遮蔽 patch 的像素空间计算均方误差：

$$
\mathcal{L}_{\mathrm{MAE}}
= \frac{1}{|\mathcal{M}|}
\sum_{i \in \mathcal{M}}
\left\|\hat{x}_i - x_i\right\|_2^2
$$

这个目标逼迫模型根据空间邻域、其它波段和相邻时相补全缺失区域。对遥感而言，这比普通分类预训练更合适，因为大量 HLS 数据没有人工标签，但自监督遮蔽重建可以直接利用未标注影像。

##### 数据工程也是方法的一部分

Prithvi 论文不只提出一个网络结构，还强调大规模地理空间预训练的工程框架。HLS 原始数据以多日期、多波段 GeoTIFF 分散存放，若训练时每个 batch 动态打开大量文件，I/O 会压住 GPU 利用率。论文因此先基于云掩膜和缺失值离线筛选可用子区域，再把样本与元信息组织为 Zarr 数组。

预处理可概括为：

$$
\mathrm{keep}(r,t)=
\mathbf{1}\left[
\mathrm{cloud}(r,t) < \tau_c
\land
\mathrm{nodata}(r,t) < \tau_n
\right]
$$

其中 \(r\) 是 HLS tile 中的空间窗口，\(t\) 是观测日期。保留下来的窗口才进入训练索引。这个步骤避免模型把云、云影和传感器缺测当作正常地表模式学习，同时减少需要搬运到训练环境的数据量。

##### 下游微调方式

预训练完成后，Prithvi 的编码器作为通用遥感特征提取器接入不同 decoder。对语义分割任务，例如洪水或火烧迹地映射，常见目标是逐像素分类：

$$
\mathcal{L}_{\mathrm{seg}}
= -\frac{1}{HW}\sum_{u,v}\sum_{k=1}^{K}
y_{u,v,k}\log p_{u,v,k}
$$

也可以与 Dice、Lovasz 或类别加权交叉熵结合，以处理洪水、烧毁区域这类前景稀疏类别。论文比较了三种设置：完整微调、冻结编码器只训任务 decoder、随机初始化训练。结果显示预训练权重通常能更快收敛，并在标注数据减少时保持更强的数据效率。

> 💡 关键：Prithvi 的贡献不是把 ViT 放到卫星图上，而是把多时相、多光谱 HLS 数据组织成可自监督学习的时空 token，并配套解决云过滤、采样和大规模读取问题。

##### 与 SatMAE 的关系

SatMAE 已经证明 MAE 可以适配卫星影像中的时间或多光谱结构；Prithvi 进一步把这一思想做成面向 HLS 的开放地理空间基础模型。它更强调端到端工程闭环：从 HLS 数据发现、质量过滤、自监督预训练，到面向洪水、火灾、作物等任务的可复用微调流程。因此在图谱中，Prithvi 可视为 SatMAE 思路走向大规模开放地球观测基础模型的代表。

#### 🧪 练习题
```yaml
question: "Prithvi 相比普通图像 MAE 的关键结构改造是什么？"
options:
  - "把 HLS 六个波段转换成单通道灰度图，只训练 CNN 分类器"
  - "把 2D patch/位置编码改为 3D 版本，使模型能处理多时相多光谱遥感输入"
  - "完全依赖人工标注的洪水和火灾数据进行监督预训练"
  - "只用 RGB 航拍图像训练，不使用 HLS 数据"
answer: 1
explain: "Prithvi 将输入组织为 (B,C,T,H,W)，用 3D patch embedding 和 3D positional encoding 建模空间与时间维度，再用 MAE 遮蔽重建进行自监督预训练。"
```

### SatMAE++

```yaml
id: satmae_pp
num: 21
name: SatMAE++
full_name: SatMAE++ (SatMAE++)
year: '2024'
org: Stanford University
parent: satmae
paper_url: https://arxiv.org/abs/2403.08051
project_url: ''
category: rs_analysis
motivation: 多尺度预训练mAP提升2.5%
```

#### 📝 一句话总结
SatMAE++ 在 SatMAE 的遥感 MAE 预训练框架上加入多尺度重建，用卷积上采样块把低分辨率 MAE 输出恢复到更高尺度，解决了多光谱遥感影像中目标尺度变化大、单尺度遮蔽重建表征不足的问题。

#### 🎯 核心要点
- **来源校正**：给定 `paper_url` 实际指向 arXiv:2403.08051 `Multi-Apartment Rent Division`；SatMAE++ 对应论文是 CVPR 2024 `Rethinking Transformers Pre-training for Multi-Spectral Satellite Imagery`，arXiv:2403.05419
- **多尺度 MAE 预训练**：输入高分辨率影像先下采样为 \((H,W)\)、\((2H,2W)\)、\((4H,4W)\) 多个尺度，最低尺度送入 SatMAE/MAE 主干
- **高尺度重建监督**：MAE decoder 先重建最低尺度影像，再通过卷积 upsample block 逐级恢复到更高分辨率，并在每个尺度计算重建损失
- **卷积上采样块**：每个 upsample block 使用转置卷积扩大空间分辨率，再用两个 \(3\times3\) 卷积组成残差块增强局部细节
- **不依赖 GSDPE**：相比 ScaleMAE 的 GSD 位置编码，SatMAE++ 保留标准/光谱位置编码，用多尺度重建而不是复杂 GSD 编码来学习尺度信息
- **兼容 RGB 与 Sentinel-2 多光谱**：在 fMoW-RGB 与 fMoW-Sentinel 上预训练；多光谱设置沿用 SatMAE 的按 GSD 分组 band embedding 与 75% patch masking
- **下游收益明确**：论文报告在六个遥感数据集上达到 SOTA，并在 BigEarthNet 多标签分类上取得 2.5% mAP 增益

#### 🔬 深入细节
##### 图示与可访问来源

![SatMAE++ 多尺度重建框架](https://ar5iv.labs.arxiv.org/html/2403.05419/assets/figures/overall_architecture.png)
*图：SatMAE++ 论文 Figure 1。低尺度图像进入 MAE，decoder 输出再经上采样块恢复到 \((2H,2W)\) 和 \((4H,4W)\)，各尺度共同参与损失。*

![SatMAE++ 上采样块](https://ar5iv.labs.arxiv.org/html/2403.05419/assets/figures/upsample.png)
*图：论文 Figure 2。Upsample block 由转置卷积、归一化与激活、两层 \(3\times3\) 残差卷积组成，用于补回高分辨率局部纹理。*

来源说明：本文件保留任务 YAML 中的 `paper_url`，但实际精读来源为 arXiv:2403.05419、CVPR OpenAccess PDF 和官方仓库 `https://github.com/techmn/satmae_pp`。

##### 算法伪代码

```python
# SatMAE++ 三尺度预训练伪代码
def train_satmae_pp(high_res_image, mask_ratio=0.75):
    # high_res_image: I_bar, shape [C, 4H, 4W]
    I_bar = high_res_image
    I_hat = downsample(I_bar, scale=0.5)   # [C, 2H, 2W]
    I = downsample(I_hat, scale=0.5)       # [C, H, W]

    # 1. 最低尺度执行 SatMAE/MAE 遮蔽重建
    patches = patchify(I)
    visible, mask_index = random_mask(patches, ratio=mask_ratio)
    tokens = grouped_patch_embed(visible) + spectral_or_rgb_pos_embed(visible)
    latent = transformer_encoder(tokens)
    F = transformer_decoder_restore_and_reconstruct(latent, mask_index)

    # 2. 把低尺度重建投影回特征空间，并逐级上采样
    feat = linear_project(F)
    F_hat_feat = upsample_block(feat)      # -> [C_feat, 2H, 2W]
    F_bar_feat = upsample_block(F_hat_feat)  # -> [C_feat, 4H, 4W]

    F_hat = linear_to_image(F_hat_feat)
    F_bar = linear_to_image(F_bar_feat)

    # 3. 低尺度用 MSE，高尺度用 L1，联合优化
    L1 = mse(F, I)
    L2 = l1(F_hat, I_hat)
    L3 = l1(F_bar, I_bar)
    loss = alpha1 * L1 + alpha2 * L2 + alpha3 * L3
    return loss
```

##### SatMAE++ 要解决的具体问题

遥感图像和自然图像最大的差别之一是尺度不稳定。同样大小的 patch，在 0.3m 航拍图里可能覆盖几栋建筑，在 10m Sentinel-2 图里可能覆盖一片农田，在 30m Landsat/HLS 图里又可能覆盖更大地物混合区域。多光谱 Sentinel-2 还存在不同 band 的 Ground Sample Distance 不一致：B2/B3/B4/B8 为 10m，红边和 SWIR 多为 20m，B1/B9/B10 为 60m。

SatMAE 已经通过多光谱 band grouping 和光谱位置编码适配 Sentinel-2，但其遮蔽重建主要发生在单一尺度。SatMAE++ 的判断是：不一定要像 ScaleMAE 那样引入复杂的 GSD-based positional encoding；只要让模型在预训练阶段必须同时恢复低尺度语义和高尺度细节，就能迫使 ViT token 学到更好的尺度鲁棒表征。

##### 多尺度损失函数

对两尺度设置，设最低尺度输入为 \(I\in\mathbb{R}^{C\times H\times W}\)，高一档尺度输入为 \(\hat{I}\in\mathbb{R}^{C\times 2H\times 2W}\)。MAE decoder 先输出最低尺度重建 \(F\)，对应 MSE 损失：

$$
L_1=\frac{1}{n}\sum_{i=1}^{n}\left(F_i-I_i\right)^2
$$

随后，SatMAE++ 将 \(F\) 投影到特征空间，经上采样块得到高尺度重建 \(\hat{F}\)，并使用 L1 损失：

$$
L_2=\frac{1}{n}\sum_{i=1}^{n}\left|\hat{F}_i-\hat{I}_i\right|
$$

两尺度总损失为：

$$
\mathcal{L}_{2\text{-scale}}=\alpha_1L_1+\alpha_2L_2
$$

对多光谱三尺度设置，额外使用最高尺度 \(\bar{I}\in\mathbb{R}^{C\times 4H\times 4W}\) 和重建 \(\bar{F}\)：

$$
L_3=\frac{1}{n}\sum_{i=1}^{n}\left|\bar{F}_i-\bar{I}_i\right|
$$

$$
\mathcal{L}_{3\text{-scale}}=\alpha_1L_1+\alpha_2L_2+\alpha_3L_3
$$

论文选择在高尺度用 L1，是因为高分辨率重建更像超分辨率/细节恢复任务，L1 通常比 MSE 更少产生过度平滑；最低尺度仍用 MSE，以保持与 MAE 主干的重建目标一致。

##### 上采样块的机制

Upsample block 接收 \(X\in\mathbb{R}^{C\times H\times W}\)，先通过转置卷积扩大空间大小：

$$
U=\mathrm{LeakyReLU}\left(\mathrm{Norm}\left(\mathrm{ConvTranspose}_{4\times4}(X)\right)\right)
$$

再用残差卷积块补强局部纹理：

$$
\tilde{X}=U+\mathrm{Norm}\left(\mathrm{Conv}_{3\times3}\left(
\sigma\left(\mathrm{Conv}_{3\times3}(U)\right)\right)\right)
$$

这种设计把 Transformer 的全局 token 表征和卷积的局部归纳偏置结合起来。ViT encoder 负责学习跨 patch 的语义依赖；上采样块负责把语义特征翻译回高尺度空间细节。对于遥感图像，这一点很重要，因为道路、田块边界、小建筑、河道边缘等目标往往依赖局部纹理。

##### 多光谱分组如何接入

SatMAE++ 的多光谱主干沿用 SatMAE 的思想：不要把所有 Sentinel-2 band 简单拼成一个大通道输入，而是按空间分辨率/语义接近性分组，再为每组建立 patch embedding。官方仓库示例中，训练 fMoW-Sentinel 时丢弃 B1、B9、B10，并将可用 band 分为：

- B2、B3、B4、B8
- B5、B6、B7、B8A
- B11、B12

每组 patch token 在空间维拼接，然后进入同一个 ViT。这样做的直觉是：10m 可见光/NIR、20m 红边与 SWIR 的物理含义不同，单独投影可以减少不同传感器尺度之间的混淆；进入 Transformer 后，注意力再学习跨 band 与跨空间位置的组合关系。

##### 与 SatMAE 和 ScaleMAE 的区别

SatMAE 的优势是证明了 MAE 可以有效处理时间和多光谱卫星影像，但它的重建目标仍偏单尺度。ScaleMAE 针对尺度问题引入 GSD-aware positional encoding 和 Laplacian decoder，但 GSDPE 对 RGB 光学数据更自然，在多光谱 band 具有不同 GSD 时会变复杂。SatMAE++ 的取舍更朴素：保持 SatMAE 的标准位置编码和分组输入，只通过“多尺度重建任务”向模型注入尺度约束。

> 💡 关键：SatMAE++ 的创新点不在于更大的 ViT，而在于把预训练目标从“恢复一个尺度的遮蔽 patch”改成“从低尺度语义同时恢复多个空间尺度”，从目标函数上逼迫表示具备尺度感。

##### 训练与评估设置

论文在 fMoW-RGB 和 fMoW-Sentinel 上做预训练。RGB 实验使用 ViT-Large、224 输入、16 patch、800 epoch；Sentinel-2 实验使用 96 输入、8 patch、50 epoch，并保持 75% masking。下游评估覆盖 fMoW-RGB、fMoW-Sentinel、EuroSAT、RESISC-45、UCMerced、BigEarthNet 等遥感分类/多标签任务。结果显示，多尺度预训练不仅提升最终指标，也让 fMoW-Sentinel 微调更快达到峰值验证分数。

#### 🧪 练习题
```yaml
question: "SatMAE++ 相比 SatMAE 的主要改动是什么？"
options:
  - "删除 MAE 遮蔽重建，只使用监督分类损失"
  - "在 MAE 低尺度重建后加入卷积上采样块，并对更高空间尺度施加重建损失"
  - "只使用 RGB 波段，完全不支持 Sentinel-2 多光谱输入"
  - "用语言模型解码器替代 ViT encoder"
answer: 1
explain: "SatMAE++ 保留 SatMAE/MAE 主干，但新增多尺度重建分支，高尺度由卷积上采样块恢复，并用 L1 损失约束细节，从而学习尺度鲁棒表征。"
```

### Prithvi-EO-2.0

```yaml
id: prithvi_eo2
num: 22
name: Prithvi-EO-2.0
full_name: Prithvi地球观测2.0 (Prithvi-EO-2.0)
year: '2024'
org: IBM & NASA
parent: prithvi
paper_url: https://www.ibm.com/blog/nasa-ibm-prithvi-eo-2-0/
project_url: ''
category: rs_analysis
motivation: 6亿参数多任务微调首次星上部署
```

#### 📝 一句话总结
Prithvi-EO-2.0 将 Prithvi 从美国局部 HLS 预训练扩展为全球多时相地球观测基础模型，引入 300M/600M ViT、4.2M 全球样本以及时间和地理位置嵌入，解决了 Prithvi-EO-1.0 覆盖范围、规模和跨区域任务泛化不足的问题。

#### 🎯 核心要点
- **第二代开放 EO 基础模型**：IBM、NASA 与 Jülich Supercomputing Centre 发布 Prithvi-EO-2.0，提供 300M、300M-TL、600M、600M-TL 等模型权重
- **全球 HLS 时间序列预训练**：使用 NASA HLS V2 30m 数据，构建 4.2M 训练样本和约 46k 验证样本，每个样本由 4 个时间戳、6 个公共波段和 \(256\times256\) patch 组成
- **更强时空采样策略**：从 2014-2023 年 HLS 档案中按 1-6 个月间隔采样四时相序列，覆盖土地覆盖类别和生态区多样性，并过滤缺失值与云污染
- **300M/600M ViT 主干**：300M 版本基于 ViT-L，600M 版本基于 ViT-H，继续采用 MAE 遮蔽重建，但扩大模型容量和全球数据覆盖
- **TL 元数据嵌入**：TL 版本把中心经纬度、年份和 day-of-year 编码为 sin/cos embedding，经可学习权重加到 encoder/decoder token 中，并通过随机 drop 适配元数据缺失场景
- **GEO-Bench 与 SME 任务验证**：在 GEO-Bench、灾害响应、土地覆盖/作物制图、生态系统动态等任务上验证，600M-TL 相比 Prithvi-EO-1.0 平均提升约 8%
- **后续星上部署验证**：NASA 2026 年报道压缩版 Prithvi 被上传至 Kanyini 卫星和 ISS IMAGIN-e 载荷，展示开放地理空间基础模型的在轨推理潜力

#### 🔬 深入细节
##### 图示与可访问来源

![Prithvi-EO-2.0 架构](https://arxiv.org/html/2412.02732v3/x2.png)
*图：Prithvi-EO-2.0 论文 Figure 3。模型保留 MAE encoder-decoder 框架，同时加入 3D patch/position embedding 和时间、位置元数据嵌入。*

![Prithvi-EO-2.0 全球 HLS 样本分布](https://arxiv.org/html/2412.02732v3/figures/sample_count_map.png)
*图：论文 Figure 2。训练样本覆盖全球 HLS tiles，颜色表示训练样本数量，验证 tiles 以洋红色标注。*

来源说明：任务给出的 `paper_url` 是 IBM Research 新闻页；方法细节主要来自 arXiv:2412.02732v3、Hugging Face `ibm-nasa-geospatial/Prithvi-EO-2.0-600M-TL` 模型卡、NASA-IMPACT GitHub 仓库和 NASA 2026 年在轨部署报道。

##### 算法伪代码

```python
# Prithvi-EO-2.0 TL 版本的 MAE 预训练伪代码
def pretrain_prithvi_eo2(sample, metadata, mask_ratio=0.75, p_drop=0.1):
    # sample: [C=6, T=4, H=224, W=224] after crop from 256x256 HLS patch
    # metadata: center lat/lon, acquisition year and day-of-year for each timestamp
    patches = patchify_3d(sample, patch_size=(1, 16, 16))
    visible, masked_index = random_mask(patches, ratio=mask_ratio)

    token = conv3d_patch_embed(visible)
    token = token + positional_encoding_3d(visible)

    # 时间/位置元数据作为 bias 加到 token，而不是进入 patch embedding
    use_time = random_uniform() > p_drop
    use_loc = random_uniform() > p_drop
    if use_time:
        token = token + w_time_enc * sincos_time(metadata.year, metadata.day_of_year)
    if use_loc:
        token = token + w_loc_enc * sincos_location(metadata.lat, metadata.lon)

    latent = encoder_transformer_blocks(token)

    decoder_token = restore_with_mask_tokens(latent, masked_index)
    decoder_token = decoder_token + decoder_positional_encoding_3d()
    if use_time:
        decoder_token = decoder_token + w_time_dec * sincos_time(metadata.year, metadata.day_of_year)
    if use_loc:
        decoder_token = decoder_token + w_loc_dec * sincos_location(metadata.lat, metadata.lon)

    reconstruction = decoder_transformer_blocks(decoder_token)
    loss = mse(reconstruction[masked_index], patches[masked_index])
    return loss
```

##### 全球样本构建

Prithvi-EO-1.0 主要使用美国连续区域数据；Prithvi-EO-2.0 的第一项升级是全球化。论文先从 HLS tile 层面控制土地覆盖和生态区多样性，再从 2014-2023 年的时间轴中构造四时相序列。相邻时间戳间隔设为 1-6 个月，目的是让样本包含季节变化和长期趋势，而不是只看到相邻几天的近重复观测。

每个候选序列被切成非重叠 \(256\times256\) patch，并执行质量过滤。论文给出的规则包括：任一 band 中缺失像素超过 1% 的样本丢弃，云像素超过 20% 的样本丢弃；缺失值使用最近邻插值补齐。形式化地说，一个样本 \(s\) 被保留需要满足：

$$
\max_{b,t}\mathrm{missing}(s_{b,t}) \le 0.01
\quad\land\quad
\max_t \mathrm{cloud}(s_t) \le 0.20
$$

最终预训练集约为 4.2M 个训练样本和 46k 个验证样本。这比 EO-1.0 更适合学习跨大陆、跨生态区、跨季节的遥感表征。

##### 架构升级：从 Prithvi 到 Prithvi-EO-2.0

基础 MAE 目标与 Prithvi-EO-1.0 相同：遮蔽一部分 3D patch，只让编码器处理可见 token，再由解码器重建被遮蔽区域。损失为：

$$
\mathcal{L}_{\mathrm{MAE}}
=\frac{1}{|\mathcal{M}|}
\sum_{i\in\mathcal{M}}
\left\|\hat{x}_i-x_i\right\|_2^2
$$

EO-2.0 的变化主要有两类。第一是模型和数据规模扩大：300M 对应 ViT-L，600M 对应 ViT-H，训练 400 epoch，使用全局 batch size 3840；300M 训练使用 80 张 A100 40GB，600M 训练使用 240 张 A100 40GB。第二是 TL 版本引入时间和位置元数据。

对于时间，模型编码年份 \(y\) 和 day-of-year \(d\)；对于位置，编码中心纬度 \(\phi\) 和经度 \(\lambda\)。可以抽象写成：

$$
e_{\mathrm{time}} = \mathrm{PE}(y) \oplus \mathrm{PE}(d)
$$

$$
e_{\mathrm{loc}} = \mathrm{PE}(\phi) \oplus \mathrm{PE}(\lambda)
$$

token 输入变为：

$$
z = E_{3D}(x) + p_{3D} + \gamma_t e_{\mathrm{time}} + \gamma_l e_{\mathrm{loc}}
$$

其中 \(\gamma_t,\gamma_l\) 是可学习权重；encoder 和 decoder 各自有独立权重。这个设计没有把元数据拼进像素 patch，而是把它作为类似位置编码的 bias。好处是：没有元数据时模型仍能运行；有元数据时，模型能知道同一光谱纹理在热带、寒带、雨季、旱季可能表示不同地表状态。

##### 元数据 drop 为什么重要

真实下游数据常常缺少完整元数据。例如某些 benchmark 只有裁剪后的 patch 和 band，不提供可靠的中心经纬度或采集日期。如果模型在预训练时总是依赖元数据，微调时一旦没有元数据就会退化。Prithvi-EO-2.0-TL 因此在预训练中以 0.1 的概率随机丢弃时间或位置元数据：

$$
z = E_{3D}(x)+p_{3D}
+ \delta_t \gamma_t e_{\mathrm{time}}
+ \delta_l \gamma_l e_{\mathrm{loc}},
\quad
\delta_t,\delta_l \sim \mathrm{Bernoulli}(1-p_{\mathrm{drop}})
$$

这相当于对元数据通道做 dropout，让模型既能利用外部地理时间信息，又不会把它当作唯一线索。

##### 微调与评估

Prithvi-EO-2.0 通过 TerraTorch 接入多种下游任务。对分类任务，论文使用 accuracy 或 BigEarthNet 的 micro-F1；对分割任务，使用 mIoU：

$$
\mathrm{mIoU}=\frac{1}{K}\sum_{k=1}^{K}
\frac{|P_k\cap G_k|}{|P_k\cup G_k|}
$$

GEO-Bench 评估包含 6 个分类和 6 个语义分割数据集，分辨率从 0.1m 到 15m 不等。论文比较了 MOCO、DINO、DeCUR、ScaleMAE、DOFA、Satlas 和 Prithvi-EO-1.0 等模型，发现更大的模型、全球预训练数据以及 TL 元数据通常带来更强平均性能。值得注意的是，EO-2.0 只在 30m HLS 上预训练，但在更高分辨率的树冠识别、光伏、牲畜等任务上仍能迁移，说明模型学到的不是单一分辨率模板。

##### 多任务应用机制

EO-2.0 的下游使用方式通常是“预训练 encoder + 任务 decoder”。对于洪水和野火分割，decoder 输出每个像素的类别概率；对于生物量或 GPP 等生态变量估计，decoder 输出连续值。统一写作：

$$
h=f_{\theta}^{\mathrm{Prithvi}}(X)
$$

$$
\hat{y}=d_{\psi}^{\mathrm{task}}(h)
$$

$$
\min_{\theta,\psi}\ \mathcal{L}_{\mathrm{task}}(\hat{y},y)
$$

其中 \(\theta\) 可全量微调，也可冻结或低学习率微调；\(\psi\) 是任务头。这个模式降低了把遥感基础模型接入具体业务任务的成本，也解释了为什么 NASA 后续在轨部署强调“只需上传较小 decoder package”就能让同一基础模型适配新任务。

##### 星上部署的来源限制

“首次星上部署”不是 2024 年 EO-2.0 技术报告的核心实验，而是 NASA 在 2026 年 5 月报道的后续演示：研究团队将压缩版 Prithvi 上传到南澳 Kanyini 卫星和 ISS IMAGIN-e 载荷，测试洪水与云检测，展示在轨预处理和低带宽任务适配潜力。因此在算法脉络中，应把它理解为 Prithvi/EO-2.0 开放基础模型生态的部署验证，而不是 EO-2.0 预训练方法本身的必要组成。

> 💡 关键：Prithvi-EO-2.0 的方法核心是“全球 HLS 多时相 MAE + 时间/位置元数据 bias + 更大 ViT 容量”，星上部署体现的是这种开放基础模型在边缘计算场景中的可复用性。

#### 🧪 练习题
```yaml
question: "Prithvi-EO-2.0-TL 中 TL 的关键含义是什么？"
options:
  - "只训练语言文本标签，不使用影像"
  - "在 MAE token 中加入时间和地理位置 sin/cos 元数据嵌入，并用随机 drop 适配元数据缺失"
  - "把所有 HLS 图像降为单时间步 RGB 输入"
  - "将 decoder 完全删除，只保留分类头"
answer: 1
explain: "TL 表示 temporal/location。模型将年份、day-of-year、经纬度编码为元数据 bias 加到 token 中，同时在预训练中随机丢弃部分元数据，提升有无元数据场景下的鲁棒性。"
```

### AlphaEarth

```yaml
id: alphaearth
num: 23
name: AlphaEarth
full_name: AlphaEarth基础模型 (AlphaEarth Foundations)
year: '2025'
org: Google DeepMind
parent: prithvi_eo2
paper_url: https://deepmind.google/discover/blog/alphaearth-foundations-virtual-satellite/
project_url: ''
category: rs_analysis
motivation: 10米全球特征嵌入存储降16倍
```

#### 📝 一句话总结
AlphaEarth Foundations 提出面向地球观测的连续时间嵌入场模型，把多源、多时相、稀疏且不规则的遥感观测压缩成全球 10 米、64 维年度 embedding，解决了传统遥感特征在跨传感器、缺测、云遮挡和低标注场景下难以统一复用的问题。

#### 🎯 核心要点
- **统一嵌入场**：将陆地和近岸水域表示为 10 米网格上的 64 维单位向量，每个像素向量总结一个有效时间段内的地表状态
- **多源输入**：融合 Sentinel-2、Sentinel-1、Landsat、PALSAR-2、ERA5-Land、GEDI、GRACE、DEM、NLCD 等光学、雷达、激光雷达、气候和地表产品
- **连续时间建模**：区分输入观测的 support period 与目标摘要的 valid period，可对任意日期范围做插值、外推或年度摘要
- **STP 主干网络**：Space-Time-Precision blocks 同时使用空间自注意力、时间轴注意力和 3x3 卷积，兼顾长程时空依赖与像素级细节
- **隐式解码训练**：用 embedding 加传感器几何、时间码等条件元数据重建被遮蔽的源观测，按数据源选择 L1 或交叉熵损失
- **教师-学生一致性**：学生模型随机缺失输入源和时间步，最小化师生 embedding 的方向差，提升对云、轨道和缺测的鲁棒性
- **单位球瓶颈**：embedding 作为 von Mises-Fisher 分布的均值方向，并通过 batch uniformity 防止所有像素坍缩到相同方向
- **低存储部署**：论文版本报告每个表示 64 bytes，相对被测试的次紧凑学习表示减少 16 倍信息量；Earth Engine 发布年度 Satellite Embedding 数据集

#### 🔬 深入细节
##### 图示与可访问来源

![AlphaEarth Foundations 架构图](https://ar5iv.labs.arxiv.org/html/2507.22291/assets/figures/results_model.png)
*图：AlphaEarth Foundations 的多源视频输入、STP 主干、条件摘要、vMF embedding、教师-学生/文本对齐训练和全球 embedding field。可访问来源：arXiv 预印本 https://arxiv.org/abs/2507.22291，DeepMind 博客 https://deepmind.google/blog/alphaearth-foundations-helps-map-our-planet-in-unprecedented-detail/，Earth Engine 数据集说明 https://developers.google.com/earth-engine/datasets/catalog/GOOGLE_SATELLITE_EMBEDDING_V1_ANNUAL。*

##### 问题背景：为什么不是再做一个遥感分类模型

常规遥感流程通常先人工设计指数或合成影像，例如 NDVI、最佳像素合成、谐波特征，再针对某个任务训练分类器或回归器。这种做法的问题在于特征强依赖传感器、区域和任务；云、轨道空洞、扫描条带、不同空间分辨率和不同时相采样会让同一地点的观测很难拼成稳定特征。AlphaEarth 的目标不是直接输出某一种土地覆盖类别，而是输出可复用的中间表示：让后续少量标注的分类、回归、变化检测都直接在 embedding 上完成。

论文把地球表面看作一个随时间变化的连续场。输入数据来自某个 support period，目标摘要可以是另一个 valid period；两者不要求完全重合。因此模型可以在一年内大量不均匀观测之间推断某段时间的地表状态，也可以在年度数据产品中给出稳定的一年摘要。Google Earth Engine 发布的 Satellite Embedding V1 就是这种年度摘要的产品化版本：2017-2024 年、10 米分辨率、每像素 64 个 band，并说明这些向量已归一化到单位长度，适合聚类、分类和变化检测。

##### 模型机制：多源视频到单位球 embedding

AlphaEarth 的输入是一组按时间排序但稀疏、不规则的源帧。每个源先被归一化，并把采集时间转成 sinusoidal timecode；不同传感器各自通过 source encoder 投影到共同 latent space，再进入 STP 主干。STP block 包含三条并行路径：

- **Space path**：类似 ViT 的空间自注意力，用于捕获较大范围空间关系
- **Time path**：沿时间维做注意力，并用时间码条件化每个观测帧
- **Precision path**：3x3 卷积保留局部纹理和边界，避免大模型只学到粗糙语义

多层 STP block 之间通过 learned Laplacian pyramid rescaling 交换不同尺度的状态。直觉上，Space/Time 分支负责“理解这里长期发生了什么”，Precision 分支负责“不要把 10 米地块边界抹平”。最终 summarizer 根据 valid period 的条件时间码输出 embedding \(\mu \in \mathbb{R}^{64}\)，并约束 \(\|\mu\|_2=1\)。

##### 训练目标：重建、多源一致性、均匀瓶颈和文本对齐

论文把 embedding 作为信息瓶颈，让小型 source decoder 在给定 embedding、传感器元数据和目标时刻的情况下重建观测。整体目标可概括为：

$$
\mathcal{L}
= a\mathcal{L}_{recon}
+ b\mathcal{L}_{uniform}
+ c\mathcal{L}_{consistency}
+ d\mathcal{L}_{text}
$$

其中 \(\mathcal{L}_{recon}\) 对连续源使用 L1，对分类源使用交叉熵；不同源还会按空间错位、重采样尺度和无效像素 mask 做修正。模型不是简单重建输入中的同一帧，而是随机选取与 valid period 相交的目标观测，有时还会把这帧从输入中拿掉，迫使 embedding 学到跨时间、跨源的可预测状态。

教师-学生一致性解决遥感里很实际的问题：某个地方在某一年可能没有干净 Sentinel-2，也可能雷达或 Landsat 时序很稀疏。教师模型看到完整输入，学生模型随机丢弃输入源或时间步，两者共享参数，损失为：

$$
\mathcal{L}_{consistency}=1-\mu_{teacher}^{\top}\mu_{student}
$$

这样训练后，即使部署时某些源缺失，模型也倾向于给出与完整观测相同方向的 embedding，而不是把轨道空洞、云和条带伪影编码成地表变化。

##### 单位球与 batch uniformity：为什么 64 维向量仍然够用

AlphaEarth 把 embedding 看作 vMF 分布的均值方向。解码时可从该方向附近采样，再拼接传感器几何和时间码去重建目标源；这相当于在 bottleneck 上加噪声，避免模型把全部细节死记到高维连续值里。为了避免所有位置坍缩到少数方向，论文引入 batch uniformity。简化写法为：

$$
\mathcal{L}_{uniform}
= \frac{1}{B}\sum_{i=1}^{B}
\left| \mu_i^\top \mu_{\pi(i)} \right|
$$

其中 \(\pi(i)\) 是 batch 维上的错位配对。若 embedding 在单位球上足够均匀，随机两个向量平均应近似正交，点积绝对值趋近 0。这个目标本身不是充分条件，但能有效抑制表示坍缩，并提升少样本线性 probe 和近邻检索的稳定性。

##### 伪代码：AlphaEarth 训练与年度 embedding field 推理

```python
# AlphaEarth Foundations 的核心训练逻辑，省略分布式数据管线细节
for batch in earth_observation_sequences:
    sources = load_multisource_frames(batch)          # optical, SAR, LiDAR, climate, DEM...
    support_period = span_of_input_timestamps(sources)
    valid_period = sample_summary_period(batch)       # 可与 support period 部分重合或不重合

    teacher_inputs = normalize_and_timecode(sources)
    student_inputs = random_drop_sources_and_frames(teacher_inputs)

    # STP encoder + conditional summarizer
    mu_teacher = AEF(teacher_inputs, valid_period)    # [B, H, W, 64], unit-normalized
    mu_student = AEF(student_inputs, valid_period)

    # 从每个源随机选一个目标观测，可能从输入中移除
    recon_loss = 0.0
    for source_name, target_frame in sample_targets(sources, valid_period):
        metadata = sensor_metadata(target_frame)
        tau = normalized_time_in_valid_period(target_frame.time, valid_period)
        pred = source_decoder[source_name](mu_teacher, metadata, tau)
        recon_loss += source_weight[source_name] * source_error(pred, target_frame)

    consistency = 1.0 - dot(mu_teacher, mu_student).mean()
    uniformity = abs(dot(mu_teacher, rotate_batch(mu_teacher))).mean()
    text_align = contrastive_loss(mu_teacher, text_encoder(batch.geo_text))

    loss = a * recon_loss + b * uniformity + c * consistency + d * text_align
    optimizer.step(loss)


def create_annual_embedding_field(year, utm_zone):
    for tile in make_tiles(utm_zone, size_m=960, buffer_m=160):
        frames = collect_sources_from_earth_engine(tile.buffered, year)
        mu = AEF(frames, valid_period=(f"{year}-01-01", f"{year + 1}-01-01"))
        mu = trim_border(mu, trim_m=80)
        save_64d_embedding(tile, quantize_int8(mu, power=2))
```

##### 与 Prithvi-EO、SatMAE 类模型的差异

SatMAE 和 Prithvi-EO 更接近“遥感图像基础模型”：它们从多光谱影像 patch 中学习视觉表征，再迁移到分割、分类等任务。AlphaEarth 的关键变化是把“某一张图像的表示”升级为“某个地理位置在某段时间内的连续状态表示”。因此它天然处理多传感器和不规则时间采样，不要求下游用户重新收集同一时段的所有原始影像。

这种设计也解释了 16 倍存储动机。对全球 10 米级分析来说，保存所有源影像、时序 composite 或多模型特征都极其昂贵；AlphaEarth 把每像素年度状态压缩为 64 维单位向量，后续任务用点积、角距离、近邻、线性 probe 或树模型即可开始工作。代价是单个 embedding 维度不可像光谱 band 那样直接解释，必须把 64 维整体当作一个语义坐标来使用。

#### 🧪 练习题
```yaml
question: "AlphaEarth Foundations 中 teacher-student 一致性目标的主要作用是什么？"
options:
  - "把 64 维 embedding 直接转成 RGB 可视化图"
  - "让缺失输入源或缺失时间步时得到的 embedding 仍接近完整输入下的 embedding"
  - "把所有传感器强制重采样到 1 米分辨率"
  - "只优化土地覆盖分类交叉熵，不再重建连续观测"
answer: 1
explain: "学生模型随机丢弃源和时间步，教师模型使用更完整输入；最小化二者向量方向差可以减弱云、轨道、条带和缺测带来的伪变化。"
```

### Flood Hub

```yaml
id: floodhub
num: 24
name: Flood Hub
full_name: 洪水预警中心 (Flood Hub)
year: '2022'
org: Google Research
parent: —
paper_url: https://research.google/blog/expanding-global-flood-forecasting/
project_url: ''
category: geo_hazard
motivation: LSTM+GNN河流洪水7天预警
```

#### 📝 一句话总结
Flood Hub 将 Google Research 的机器学习水文预报、淹没范围建模和公共告警分发整合成全球河流洪水预警平台，用 LSTM 序列模型把历史与未来气象驱动转成最长 7 天的概率流量/水位预报，解决了缺少本地水文模型和测站地区难以获得提前预警的问题。

#### 🎯 核心要点
- **平台目标**：免费发布本地化河流洪水趋势、地图、预报和告警，服务政府、救援组织和直接受威胁人群
- **两级建模链路**：Hydrologic Model 预测未来河流水位/流量，Inundation Model 将超过阈值的水文预报转成可能受淹区域和水深
- **LSTM 预报核心**：编码过去 365 天历史气象与流域属性，再用未来 7 天气象预报解码未来流量分布
- **多气象产品嵌入**：不同天气驱动源先经独立 embedding network，再按可用性合并，增强缺测或产品切换时的鲁棒性
- **概率输出**：LSTM 输出进入 mixture density head，预测非对称拉普拉斯混合分布参数，用负对数似然训练高流量长尾不确定性
- **低资料地区泛化**：Nature 2024 论文在 5,680 个流量测站做跨地点和跨时间验证，并与 GloFAS 比较极端洪水事件可靠性
- **业务部署演进**：HESS 2022 论文描述印度和孟加拉的端到端告警系统；后续全球模型扩展到更多国家并支持 7 天 lead time
- **来源限制说明**：公开的一手资料确认 Flood Hub 河流预报核心是 LSTM/encoder-decoder 和淹没模型；“GNN”常见于相邻洪水研究，但未在 Google Flood Hub 的公开生产模型说明中作为核心组件出现

#### 🔬 深入细节
##### 图示与可访问来源

![Flood Hub LSTM 水文网络](https://storage.googleapis.com/gweb-research2023-media/images/Flood_Forecasting_Hydrologic-networks.width-1250.png)
*图：Google Flood Forecasting 公开文档中的水文模型示意，不同气象产品先分别嵌入，再输入 hindcast/forecast LSTM，最终输出流量概率分布。可访问来源：Google Research Flood Forecasting https://sites.research.google/gr/floodforecasting/，Hydrology model 文档 https://sites.research.google/gr/floodforecasting/hydrology-model/，HESS 2022 运营系统论文 https://hess.copernicus.org/articles/26/4013/2022/，Nature 2024 全球模型论文 https://www.nature.com/articles/s41586-024-07145-1。*

##### 从水位预报到公共告警的系统链路

Flood Hub 不是单一神经网络，而是一套端到端业务系统。HESS 2022 论文把早期 Google 河流洪水告警系统拆成数据校验、水位预报、淹没建模和告警分发几个模块：实时水位、降水观测、降水预报等数据先经过质量控制；stage forecast 模型预测目标测站未来水位；若水位超过预警阈值，再运行淹没模型生成高分辨率受淹区域；最后通过 Flood Hub、Search、Maps、Android 通知或政府渠道发布。

Google 后续的全球模型把重点从“有测站的大河业务系统”扩展到“缺少本地水文资料的流域”。Nature 2024 论文中，模型在全球大量测站上训练，并通过跨地点、跨时间的 out-of-sample 评估测试其在近似未设站流域的泛化能力。公开说明显示，Flood Hub 展示 verified gauges，也为专家层提供 virtual gauges，以便在实体测站不足的区域给出额外参考。

##### LSTM 水文模型：365 天记忆加 7 天预报

公开 Hydrology model 文档描述的核心结构是 encoder-decoder LSTM。每个时间步输入包括动态气象驱动 \(x_t\) 和静态流域属性 \(s\)，例如降水、温度、地形、流域面积、蒸散等。LSTM 的门控结构可写为：

$$
f_t=\sigma(W_f[x_t,s,h_{t-1}]+b_f)
$$

$$
i_t=\sigma(W_i[x_t,s,h_{t-1}]+b_i),\quad
\tilde{c}_t=\tanh(W_c[x_t,s,h_{t-1}]+b_c)
$$

$$
c_t=f_t\odot c_{t-1}+i_t\odot \tilde{c}_t,\quad
h_t=o_t\odot\tanh(c_t)
$$

hindcast LSTM 顺序读入过去 365 天历史气象，把流域当前“湿润程度、土壤蓄水、近期降雨记忆、季节状态”等信息压进 hidden/cell state。forecast LSTM 再接收未来 0-7 天气象预报，生成每天的流量分布参数。这个结构比单纯用未来降水回归流量更符合水文过程，因为洪水响应强依赖前期湿润条件，而不是只看当天雨量。

##### 多天气产品嵌入与缺测鲁棒性

业务环境下，不同气象产品的覆盖时间、更新频率和缺测模式都不同。Google 的模型不是把所有产品硬拼接后假设永远齐全，而是为每个 weather product 建一个 embedding network，然后用 masked mean 或 handoff 结构合并可用输入。简化表示为：

$$
z_t=\frac{\sum_{k=1}^{K} m_{t,k} E_k(x_{t,k})}{\sum_{k=1}^{K} m_{t,k}+\epsilon}
$$

其中 \(E_k\) 是第 \(k\) 个气象产品的嵌入网络，\(m_{t,k}\in\{0,1\}\) 表示该产品在时间 \(t\) 是否可用。这样某个产品临时不可用时，模型仍可用其他产品维持预报，而不是因为输入维度缺值直接失败。

##### 概率流量输出与损失函数

洪水预报最关心高流量尾部风险。确定性 MSE 往往会把极端洪峰平均掉，给出看似平滑但低估风险的流量曲线。Flood Hub 文档说明模型输出的是流量概率分布，使用 countable mixture of asymmetric Laplacians (CMAL) 或相关 mixture density head。对第 \(t\) 天流量 \(q_t\)，模型预测混合权重、位置、尺度和偏度参数：

$$
p(q_t \mid h_t)=\sum_{j=1}^{J}\pi_{t,j}\,\mathrm{ALD}(q_t;\mu_{t,j}, b_{t,j}, \kappa_{t,j})
$$

训练目标是负对数似然：

$$
\mathcal{L}_{NLL}
=-\sum_{t=1}^{7}\log p(q_t^{obs}\mid h_t)
$$

非对称拉普拉斯分布允许上尾和下尾不确定性不同，更适合“高流量风险比低流量误差更关键”的场景。告警层可以进一步把概率流量与当地 flood threshold 或 return period threshold 比较，得到“是否超过警戒水位”和“不确定性有多大”。

##### 淹没模型：从一条河的预报变成地图

水文模型输出的是某个河段或测站的水位/流量趋势，但公众需要知道“哪片区域会被淹、淹多深”。HESS 2022 论文描述了阈值法和 manifold model 等淹没建模组件：当 forecasted stage 超过预警阈值时，系统利用地形、河道周边 AOI、卫星影像和历史淹没资料估计受影响区域。Google Research 站点也把这一步解释为 Inundation Model 根据 hydrology forecast 和 satellite imagery 模拟洪泛区中的水体行为。

这里的“图”更多体现在河网、水流方向、流域拓扑和 floodplain 空间关系上，而不是公开核心文档明确给出的 Graph Neural Network。若后续 Google 公开把 river network GNN 纳入生产 Flood Hub，应更新这一节；截至本精读使用的公开来源，核心可核验方法仍是 LSTM 水文概率预报加淹没模型。

##### 伪代码：Flood Hub 河流洪水预报链路

```python
# Flood Hub 风格的河流洪水预警流程，基于公开 LSTM hydrology + inundation 描述整理
def forecast_river_flood(basin, issue_date):
    # 1. 收集历史与预报驱动
    static_attrs = load_basin_attributes(basin)            # area, slope, soil, elevation, PET...
    hist_weather = load_weather_history(basin, days=365)
    fcst_weather = load_weather_forecasts(basin, horizon=7)
    gauge_history = load_streamflow_or_stage_history(basin)

    # 2. 每个气象产品单独嵌入并按可用性合并
    z_hist = embed_available_products(hist_weather)
    z_fcst = embed_available_products(fcst_weather)

    # 3. hindcast LSTM 编码当前水文状态
    h, c = init_state()
    for t in range(365):
        h, c = hindcast_lstm(concat(z_hist[t], static_attrs), h, c)

    # 4. forecast LSTM 输出未来 7 天流量分布
    discharge_dist = []
    for lead in range(7):
        h, c = forecast_lstm(concat(z_fcst[lead], static_attrs), h, c)
        params = mixture_density_head(h)                  # pi, mu, scale, asymmetry
        discharge_dist.append(CMAL(params))

    # 5. 阈值判定与淹没图生成
    alerts = []
    for lead, dist in enumerate(discharge_dist):
        flood_prob = 1.0 - dist.cdf(basin.flood_threshold)
        if flood_prob > basin.alert_probability_threshold:
            stage = rating_curve_to_stage(dist.quantile(0.5), basin)
            flood_map = inundation_model(stage, basin.dem, basin.satellite_context)
            alerts.append({"lead_day": lead, "prob": flood_prob, "map": flood_map})
    return alerts
```

##### 与传统全球水文系统的差异

GloFAS 等传统全球系统通常把数值天气预报输入物理水文/水动力模型，并依赖参数校准。它们的优势是物理可解释性强，但在缺少本地测站、地形误差较大或参数校准不足的地区，可靠性会下降。Flood Hub 的 LSTM 方法把大量流域放进一个共享模型中训练，让模型从跨地区数据中学习“不同地貌和气候下雨水如何转化为流量”的统计规律。

这种做法的优势在于规模化和低资料泛化：同一模型可在许多流域共享参数，并通过静态流域属性区分不同水文响应。它的风险在于可解释性和分布外可靠性，尤其是极端气候变化、河道工程变化、上游水库调度和测站质量问题。因此 Flood Hub 更适合作为早期预警和决策支持层，而不是替代当地水文机构的全部业务判断。

#### 🧪 练习题
```yaml
question: "Flood Hub 的 LSTM 水文模型为什么要先读入过去约 365 天的历史气象？"
options:
  - "为了把所有河流改造成同一长度的图神经网络"
  - "为了编码前期湿润程度、季节性和流域蓄水状态，再结合未来 7 天气象预报预测流量"
  - "为了避免使用任何静态流域属性"
  - "为了只预测当天水位，不做多日预报"
answer: 1
explain: "河流洪水响应取决于前期降雨、土壤湿度和季节状态；hindcast LSTM 用长历史序列形成当前水文状态，forecast LSTM 再滚动未来 7 天。"
```

### RECAST

```yaml
id: recast
num: 25
name: RECAST
full_name: 余震预测模型 (RECAST)
year: '2023'
org: NVIDIA
parent: —
paper_url: https://developer.nvidia.com/blog/recast-deep-learning-model-for-earthquakes/
project_url: ''
category: geo_hazard
motivation: 深度学习余震序列预测超ETAS
```

#### 📝 一句话总结
RECAST 提出基于神经时间点过程的 Recurrent Earthquake foreCAST 模型，用 GRU 将历史地震序列压缩成隐藏状态并解码下一次事件时间分布，解决 ETAS 在大规模增强地震目录上计算复杂度高、函数形式固定且难以吸收更多事件特征的问题。

#### 🎯 核心要点
- **任务形式**：把地震目录建模为连续时间事件序列，给定历史事件 \((t_i, M_i)\) 预测下一次地震发生时间分布
- **模型框架**：采用 Neural Temporal Point Process，encoder 用 GRU 顺序更新隐藏状态，decoder 输出 Weibull mixture distribution 参数
- **事件特征输入**：基础版本使用前一事件时间和震级作为 mark；架构可扩展到位置、源参数和其他地球物理特征
- **训练目标**：最大化目录中事件时间的联合 log-likelihood，等价于最小化负对数似然
- **ETAS 对照**：ETAS 用背景率加历史事件触发项显式计算条件强度，是经典余震序列统计模型
- **计算复杂度优势**：RECAST 顺序处理事件，整本目录似然评估为 \(O(N)\)；ETAS 需引用全部历史事件，朴素时间和空间复杂度为 \(O(N^2)\)
- **数据规模效应**：论文在合成 ETAS 目录上验证可恢复地震样点过程，在南加州真实目录中当训练集超过约 \(10^4\) 个事件后优于时间型 ETAS benchmark
- **来源限制说明**：原论文为 Geophysical Research Letters 2023，NVIDIA 博客是新闻解读；Wiley 页面可能触发访问限制，ResearchGate 页面和作者 GitHub 提供了开放摘要、图注、实现和复现实验说明

#### 🔬 深入细节
##### 图示与可访问来源

![RECAST 与 ETAS 架构对比](https://www.researchgate.net/publication/373546889/figure/fig1/AS:11431281184975983@1693501214607/Structurally-alike-conceptually-distinct-earthquake-forecasting-models-a-Model.png)
*图：RECAST 用 GRU 隐藏状态和 Weibull mixture 解码下一事件时间；ETAS 显式用历史事件和触发核计算条件强度。若 ResearchGate 图片直链限流，可访问图页 https://www.researchgate.net/figure/Structurally-alike-conceptually-distinct-earthquake-forecasting-models-a-Model_fig1_373546889。论文 DOI: https://doi.org/10.1029/2023GL103909；开源实现：https://github.com/keliankaz/recast；NVIDIA 解读：https://blogs.nvidia.com/blog/quakes-deep-learning-forecasts/。*

##### 背景：ETAS 为什么强但难扩展

ETAS (Epidemic Type Aftershock Sequence) 是地震预测中非常重要的点过程模型。它把地震发生率写成背景地震率和所有历史地震触发的余震率之和：每个地震都可能继续触发后续事件，触发强度通常依赖震级、时间间隔和空间距离。这个模型把 Omori 衰减、Gutenberg-Richter 震级分布等统计地震学规律编码进固定函数形式，因此在小数据和物理解释上很强。

问题在于现代地震目录正在变大。自动相位拾取、模板匹配和高密度台网能把目录从几千个事件扩展到数十万甚至百万事件。ETAS 若要计算每个事件的条件强度，需要回看此前大量事件；对整本目录做似然评估会接近 \(O(N^2)\)。更重要的是，ETAS 的函数形式预先规定了“历史如何影响未来”，想纳入更多特征或跨地区学习时会很笨重。

##### RECAST 的神经点过程表示

RECAST 把地震目录视为带 mark 的连续时间序列：

$$
\mathcal{H}_{i-1}=\{(t_1,M_1),(t_2,M_2),\ldots,(t_{i-1},M_{i-1})\}
$$

GRU encoder 按事件顺序更新隐藏状态：

$$
h_i=\mathrm{GRU}(h_{i-1}, y_{i-1})
$$

其中 \(y_{i-1}\) 是前一事件的特征编码，基础实验中包含时间间隔和震级等信息。隐藏状态 \(h_i\) 相当于“到当前时刻为止，序列中有用的触发记忆”。decoder 不直接输出一个点估计，而是输出下一次事件等待时间 \(\Delta t_i=t_i-t_{i-1}\) 的概率分布参数：

$$
f_{\theta}(\Delta t_i \mid \mathcal{H}_{i-1})
= f_{\theta}(\Delta t_i \mid h_i)
= \sum_{k=1}^{K}\pi_{i,k}\,\mathrm{Weibull}(\Delta t_i;\lambda_{i,k},\alpha_{i,k})
$$

使用 Weibull mixture 的原因是它能表达多峰、重尾或接近 Omori 衰减的等待时间分布，同时可精确采样和计算 likelihood，避免对连续时间强度做昂贵数值积分。

##### 点过程似然与训练目标

对事件序列，RECAST 最大化每个真实等待时间在预测分布下的概率。简化负对数似然为：

$$
\mathcal{L}_{RECAST}(\theta)
= -\sum_{i=1}^{N}\log f_{\theta}(\Delta t_i \mid h_i)
$$

如果把模型写成点过程常见的条件强度 \(\lambda_{\theta}(t\mid\mathcal{H}_t)\)，同一目标也可写成：

$$
\log \mathcal{L}
= \sum_{i=1}^{N}\log \lambda_{\theta}(t_i\mid\mathcal{H}_{t_i})
- \int_{0}^{T}\lambda_{\theta}(\tau\mid\mathcal{H}_{\tau})d\tau
$$

论文实现采用可解析的 waiting-time distribution，因此训练和采样更直接。ETAS 的对应形式是：

$$
\lambda_{ETAS}(t\mid\mathcal{H}_t)
= \mu + \sum_{t_j<t}K\exp(\alpha(M_j-M_0))(t-t_j+c)^{-p}
$$

RECAST 不显式指定触发核，而是让 GRU 和 mixture decoder 从数据中学习触发记忆如何衰减、何时爆发和何时回到背景活动水平。

##### 复杂度：为什么大目录会改变模型选择

ETAS 的每次似然评估都要把当前事件与此前事件相互作用展开；即使做了工程优化，历史长度增长时仍会很重。RECAST 只维护固定维度 hidden state，每来一个事件更新一次：

$$
h_1 \rightarrow h_2 \rightarrow \cdots \rightarrow h_N
$$

因此内存和时间随事件数线性增长。这不是单纯“跑得快”的问题，而是决定了模型能否吃下现代增强目录。论文和 UC Santa Cruz 新闻稿都强调，当目录达到约 \(10^4\) 个事件及以上时，RECAST 的拟合和预报优势开始显现；作者 GitHub 也给出了 SCEDC、White 等南加州目录与 synthetic ETAS 目录的复现实验。

##### 伪代码：训练和生成 14 天余震序列样本

```python
# RECAST 的核心逻辑，按作者开源实现与论文描述整理
class RecurrentTPP:
    def encode_event(self, event):
        # event: {time, magnitude}; 可扩展 location/source features
        dt = event.time - self.prev_time
        return event_mlp([log1p(dt), event.magnitude])

    def step(self, event, h):
        y = self.encode_event(event)
        h = gru_cell(y, h)
        params = affine(h)  # mixture logits, Weibull scales, Weibull shapes
        return h, params

    def nll(self, catalog):
        h = zeros(hidden_dim)
        loss = 0.0
        for i in range(1, len(catalog)):
            h, params = self.step(catalog[i - 1], h)
            dt = catalog[i].time - catalog[i - 1].time
            prob = weibull_mixture_pdf(dt, params)
            loss += -log(prob + 1e-12)
        return loss


def sample_forecast(model, past_catalog, start_time, duration_days, n_samples=1000):
    h = model.encode_history(past_catalog)
    samples = []
    for _ in range(n_samples):
        t = start_time
        h_sample = h.copy()
        future = []
        while t < start_time + duration_days:
            params = model.decoder(h_sample)
            dt = sample_weibull_mixture(params)
            t = t + dt
            if t >= start_time + duration_days:
                break
            magnitude = sample_or_condition_magnitude()  # 基础论文主要预测时间
            event = Event(time=t, magnitude=magnitude)
            future.append(event)
            h_sample, _ = model.step(event, h_sample)
        samples.append(future)
    return samples
```

##### 与“预测地震”说法的边界

RECAST 做的是概率地震序列预测，尤其是短期余震/事件率预测，而不是确定性地说“某时某地必然发生大地震”。论文基础版本还主要限制在时间维度，使用 temporal ETAS 作为透明 benchmark；空间 ETAS 和完整三维震源机制并不在这个初始比较内。这个边界很重要：RECAST 的贡献是让神经点过程在地震目录上达到可复现、可扩展、可与 ETAS 比较的程度，而不是宣称解决地震精确预测。

从工程角度看，RECAST 最有价值的方向是进入 ensemble：与 ETAS、物理模型、区域地质约束和实时目录质量控制一起提供概率预报。它的模块化结构意味着未来可加入位置、震源机制、地壳应力、地面运动或跨区域训练；但这些扩展需要严格的伪前瞻测试，避免在高度随机、极端事件主导的地震数据上过拟合。

#### 🧪 练习题
```yaml
question: "RECAST 相比时间型 ETAS 的核心计算优势是什么？"
options:
  - "RECAST 不需要任何历史地震事件"
  - "RECAST 用固定维度 GRU 隐藏状态顺序汇总历史，使目录似然评估近似线性复杂度"
  - "RECAST 只预测震级，不预测事件时间"
  - "RECAST 把所有地震都当作独立同分布样本"
answer: 1
explain: "ETAS 需要显式回看历史事件触发项，整本目录评估接近 O(N^2)；RECAST 每步更新隐藏状态，适合更大的增强地震目录。"
```

### AlertCalifornia

```yaml
id: alertcalifornia
num: 26
name: AlertCalifornia
full_name: 加州野火预警系统 (AlertCalifornia)
year: '2024'
org: UC San Diego
parent: —
paper_url: https://www.alertcalifornia.org/
project_url: ''
category: geo_hazard
motivation: AI摄像头野火早期检测提前45分钟
```

#### 📝 一句话总结
AlertCalifornia 把加州大规模山顶 PTZ 摄像头网络接入烟雾/火点视觉模型与 CAL FIRE 调度流程，用“AI 初筛 + 值班员确认 + 位置/置信度告警”解决野火早期发现依赖人工盯屏和 911 电话的延迟问题。

#### 🎯 核心要点
- **全州级传感器网络**：UC San Diego 运营的 ALERTCalifornia 摄像头和网络基础设施持续采集实时图像，官方技术页说明 ArcGIS 图层可提供摄像头位置、视域和每 15 秒更新的当前图像
- **人机协同闭环**：AI 在摄像头网络中发现潜在火情后，向消防员提供置信度百分比和估计位置，再由受训 watchstander 确认并触发响应
- **部署到 CAL FIRE 调度中心**：官方说明该 AI 工具于 2023 年 9 月面向全部 21 个 CAL FIRE 911 Dispatch Centers 可用，尤其适合偏远区域和夜间异常发现
- **可追溯论文原型**：公开项目页不是论文；方法细节主要来自 Govil 等 2020 年 Remote Sensing 论文，其 Fuego 原型使用 InceptionV3 对远程摄像头图像做烟雾检测
- **小烟羽保真切片**：原型不把 3000x2000 图像整体缩放到 299x299，而是切成略重叠的 299x299 patch，避免远处小烟羽在缩放中消失
- **动态阈值抑制误报**：对每个摄像头、每个图像块用近 3 天同一时段历史最大分数提升阈值，可减少由雾、云、反光、烟霾触发的重复误报
- **通知去重**：同一摄像头持续看到同一火情时，系统继续打分但抑制重复通知，直到连续一小时不再检测到烟雾

#### 🔬 深入细节
##### 图示与来源限制

AlertCalifornia 官方站点是运行系统与公共安全项目页，不公开完整模型论文；下面的算法级细节来自其可追溯的地面摄像头烟雾检测论文原型：Govil et al., *Preliminary Results from a Wildfire Detection System Using Deep Learning on Remote Camera Images*, Remote Sensing 2020，DOI: `10.3390/rs12010166`。实际 2023-2026 年 CAL FIRE/ALERTCalifornia/Digital Path 生产系统可能包含后续工程更新，公开资料只披露“置信度、估计位置、值班员确认、调度中心接入”等运行接口。

![地面摄像头与卫星探测融合的野火告警示意](https://pub.mdpi-res.com/remotesensing/remotesensing-12-00166/article_deploy/html/images/remotesensing-12-00166-ag.png?1579090328=)
*图：Govil et al. 2020 的图形摘要。系统思想是把地面 lookout camera detector 与卫星 fire detector 融合后告警消防机构。*

![烟雾图像块打分示例](https://pub.mdpi-res.com/remotesensing/remotesensing-12-00166/article_deploy/html/images/remotesensing-12-00166-g003.png?1579090328=)
*图：论文 Figure 3 的 sub-image scoring 示例。整幅摄像头图像被切成 299x299 小块，每块独立输出烟雾 softmax 分数。*

##### 算法伪代码

```python
# ALERTCalifornia / Fuego 风格烟雾早检流程
def detect_wildfire(camera_frame, camera_id, timestamp, model, history):
    patches = sliding_299x299_patches(camera_frame, overlap=True)
    alerts = []

    for patch_id, patch in patches:
        p_smoke = model.inference(patch)["smoke_softmax"]

        # 近 3 天、当前时刻前后 2 小时窗口内，同摄像头同 patch 的历史最高分
        h = history.max_score(
            camera_id=camera_id,
            patch_id=patch_id,
            center_time=timestamp,
            days=3,
            hour_window=2,
        )
        threshold = 0.5 if h == 0 else (h + 1.0) / 2.0

        if p_smoke > threshold:
            alerts.append((patch_id, p_smoke, threshold))

    if alerts and not recently_alerted(camera_id, quiet_period="1h"):
        location = estimate_location(camera_id, active_patch_ids=[a[0] for a in alerts])
        certainty = max(a[1] for a in alerts)
        notify_dispatch_center(camera_id, location, certainty, camera_frame)

    history.update(camera_id, timestamp, patches, scores=alerts)
```

##### 为什么要用 patch 而不是整图分类

远程山顶摄像头的优点是视野极大，缺点是早期火情在图像里只占很小面积。论文原型使用 InceptionV3，标准输入尺寸是 299x299；如果把 6MP 级别的整图直接缩放到 299x299，远处细烟可能只剩几个像素，分类器几乎无法区分它和云、雾或压缩噪声。因此系统把全图切成略重叠 patch，再对每个 patch 独立分类：

$$
s_{c,p,t}=f_\theta(\operatorname{crop}_{p}(I_{c,t})) \in [0,1]
$$

其中 \(I_{c,t}\) 是摄像头 \(c\) 在时刻 \(t\) 的图像，\(p\) 是图像块编号，\(f_\theta\) 是烟雾分类模型，输出 softmax 烟雾分数。这样做牺牲了一部分全局上下文，但保留了小烟羽的空间分辨率，并允许系统把“疑似烟雾在哪个方向/图像块”传给后续定位与人工确认环节。

##### 训练数据如何构造

论文原型从 HPWREN 摄像头历史档案出发，结合 CAL FIRE 历史火点的位置和时间，先找出可能看到该火情的摄像头和时段，再由人工在火灾早期图像中框出可见烟羽。为了让模型关注“萌芽阶段”，大型火势形成后的图像不作为正样本核心。论文报告约 8500 张独特烟雾图，经平移、翻转增强到约 85000 个烟雾训练片段。

负样本不是随便抽取晴天图像，而是刻意加入云、雾、烟霾、反光等“像烟但不是烟”的 hard negative。系统还把早期模型误报的图像加入非烟雾数据集并反复重训，这相当于一个人工审核驱动的 hard-negative mining 循环。它解决的是野外视觉系统最典型的难点：真实火情稀少，而误报模式会随摄像头朝向、季节、时间和天气变化。

##### 动态阈值与通知逻辑

固定阈值 \(0.5\) 对每个摄像头、每个方向都不公平。某些图像块在每天同一时段会因为太阳反光、海雾或低云稳定地产生偏高分数。原型因此为每个 patch 建立局部历史阈值：

$$
h_{c,p,t}=\max_{\tau \in \mathcal{W}(t)}
s_{c,p,\tau}
$$

$$
\theta_{c,p,t}=
\begin{cases}
0.5, & h_{c,p,t}=0 \\
\frac{h_{c,p,t}+1}{2}, & h_{c,p,t}>0
\end{cases}
$$

只有当 \(s_{c,p,t}>\theta_{c,p,t}\) 时才把该 patch 视为异常。直觉上，如果某个方向过去几天同一时段经常达到 0.4，那么系统不会继续用 0.5 触发，而是把阈值抬到 0.7，要求新的视觉证据显著超过该位置的日常噪声。论文报告这种动态阈值把误报减少约 30%。

##### 从研究原型到生产工作流

生产系统的公开接口更强调消防调度可用性。官方技术页说明：AI 发现潜在火情后提供置信度和估计位置；受训值班员审核确认；消防员快速响应并在 incipient phase 控制火情。这个设计避免了“模型直接调度资源”的风险：视觉模型负责把海量摄像头流压缩成少量候选事件，人类负责最终判定和行动。

与传统人工瞭望相比，AI 的优势是持续扫描大量相机并把注意力推送到异常片段；与卫星热异常相比，地面相机能在烟羽很小、夜间或卫星重访间隔之外捕捉到线索。局限也很清楚：遮挡、云雾、强反光、摄像头视野外火点仍可能漏检，所以论文图形摘要把地面摄像头检测和卫星检测视为互补信号，而不是互相替代。

#### 🧪 练习题
```yaml
question: "AlertCalifornia 可追溯论文原型为什么把整幅摄像头图像切成 299x299 patch 再分类？"
options:
  - "为了让每个 patch 对应一个固定行政区"
  - "为了避免把整图缩小后丢失远处早期小烟羽的像素证据"
  - "为了绕过人工确认，直接自动派遣消防资源"
  - "为了只在夜间运行模型"
answer: 1
explain: "InceptionV3 的输入尺寸为 299x299，整图缩放会稀释小烟羽；切片能保留局部细节，再用动态阈值和人工确认降低误报。"
```

### Landslide AI

```yaml
id: landslide_ai
num: 27
name: Landslide AI
full_name: 香港滑坡预警系统 (Landslide AI)
year: '2026'
org: Hong Kong GEO
parent: floodhub
paper_url: https://www.geoengineer.org/news/hong-kongs-new-ai-powered-landslip-warning-system
project_url: ''
category: geo_hazard
motivation: 2200万样本滑坡预警准确率90%
```

#### 📝 一句话总结
Landslide AI 是香港 GEO 第五代滑坡预警升级，把实时降雨、未来数小时降雨预报、6 万个人工边坡目录和历史滑坡记录输入 XGBoost 等机器学习模型，解决传统雨量-滑坡相关模型难以表达多变量非线性风险的问题。

#### 🎯 核心要点
- **2026 业务部署目标**：公开报道称系统计划 2026 年全面运行，并把香港滑坡预警准确率从约 70% 提升到 90% 以上
- **大规模样本表**：GEO/ISGSR 2025 论文把约 50-60k 个人工边坡与 1996-2023 年 384 场暴雨事件交叉，形成约 2200 万个坡体-暴雨样本点
- **核心标签来源**：历史数据库包含约 2696 起与这些暴雨事件相关、发生在登记人工边坡上的滑坡记录；公开报道近似称为 2700 起 landslip reports
- **实时观测接入**：香港现行 Landslip Warning System 使用超过 120 个自动雨量站的实时雨量，并结合未来数小时降雨预报、坡体空间分布和雨量-滑坡相关模型
- **XGBoost 主模型**：论文测试 Logistic Regression、Neural Network 和 XGBoost 等常见 ML 方法，重点展示 XGBoost 在 log loss、Brier Score、ROC AUC、R2/MSE 上优于 LWS 4.0
- **8 个高影响特征**：从 21 个候选变量中选出 4 小时/24 小时最大滚动雨量、边坡类型、暴雨持续期、坡角、岩土工程投入等级、坡体形成材料、7 日前期雨量
- **概率地图与事件数预测**：模型输出每个坡体在当前暴雨中的滑坡概率，业务上既可生成空间风险图，也可把全部坡体概率求和得到预期滑坡数量

#### 🔬 深入细节
##### 图示与来源限制

该条目的 `paper_url` 是新闻页，不是正式论文。可追溯的技术来源是 GEO 人员在 ISGSR 2025 的论文 *Unprecedented Breakthrough of Landslip Warning System in Hong Kong by Big Data Analytics and Machine Learning*，以及香港斜坡安全网站对现行 Landslip Warning System 的公开说明。新闻报道披露了 2026 全面运行、90% 以上准确率、每 5 分钟概率图等生产部署信息；论文披露了训练数据、特征、XGBoost 工作流和评估指标。

![香港滑坡预警中的雨量分布输入](https://hkss.cedd.gov.hk/hkss/filemanager/en/content_26/Sec3-1-1-Img2.jpg)
*图：香港斜坡安全网站公开的 rainfall distribution 输入示意。现行系统把实时雨量、未来降雨预报和坡体特征用于评估是否发布 Landslip Warning。*

![雨量与滑坡相关模型示意](https://hkss.cedd.gov.hk/hkss/filemanager/en/content_26/Sec3-1-1-Img5.jpg)
*图：香港斜坡安全网站公开的 rainfall and landslide correlation models 示意。Landslide AI 的机器学习升级可以理解为用多变量非线性模型替代或增强传统相关模型。*

技术论文 PDF 可访问来源：`https://rpsonline.com.sg/proceedings/isgsr2025/pdf/P036.pdf`。其中 Figure 1 展示了“数据预处理 -> 随机化/测试集划分 -> XGBoost 训练评估 -> 实时雨量输入 -> 实时滑坡概率预测”的完整工作流。

##### 算法伪代码

```python
# GEO Landslide AI / XGBoost 风格训练与实时推理
def build_training_table(rainstorms, slope_catalog, landslide_inventory):
    rows = []
    for event in rainstorms:  # 1996-2023 年 384 场暴雨
        rainfall_grid = compute_rainfall_features(event)  # 4h/24h rolling, 7-day antecedent
        for slope in slope_catalog:  # 约 50-60k 个人工边坡
            x = {
                "max_roll_4h": sample(rainfall_grid.max_4h, slope.location),
                "max_roll_24h": sample(rainfall_grid.max_24h, slope.location),
                "antecedent_7d": sample(rainfall_grid.prev_7d, slope.location),
                "storm_duration": event.duration,
                "slope_type": slope.type,
                "slope_angle": slope.angle,
                "geotechnical_input": slope.geotechnical_input_level,
                "forming_material": slope.forming_material,
            }
            y = landslide_inventory.has_failure(slope.id, event.id)
            rows.append((x, y, event.id, slope.id))
    return rows


def train_landslide_model(rows):
    train, test_event, test_stratified = split_by_geo_protocol(rows)
    model = XGBoostBinaryClassifier(
        objective="binary:logistic",
        eval_metric=["logloss", "auc"],
    )
    model.fit(train.features, train.labels)
    evaluate(model, [test_event, test_stratified],
             metrics=["log_loss", "brier_score", "roc_auc", "r2_count", "mse_count"])
    return model


def realtime_probability_map(model, live_rainfall, rainfall_forecast, slope_catalog):
    probabilities = {}
    for slope in slope_catalog:
        x_now = make_features(slope, live_rainfall, rainfall_forecast)
        probabilities[slope.id] = model.predict_proba(x_now)
    expected_landslides = sum(probabilities.values())
    return probabilities, expected_landslides
```

##### 从 LWS 4.0 到机器学习预警

传统 Landslip Warning System 的核心是把实时雨量、未来几小时降雨预报、坡体空间分布和雨量-滑坡相关关系组合起来，判断是否存在“许多滑坡”的高风险。它适合做全港层面的公共预警，但变量较少，难以同时表达坡角、工程加固程度、坡体材料、前期含水状态和短时强降雨之间的非线性耦合。

GEO 的机器学习方案把样本单位改为“某个边坡在某场暴雨中是否发生滑坡”。设第 \(i\) 个样本的特征为 \(\mathbf{x}_i\)，标签为 \(y_i\in\{0,1\}\)。XGBoost 学到一组回归树 \(f_k\)，输出 logit 后转成概率：

$$
\hat{p}_i=\sigma\left(\sum_{k=1}^{K} f_k(\mathbf{x}_i)\right)
$$

训练目标可写作二分类 log loss 加树复杂度正则：

$$
\mathcal{L}=
\sum_i
\left[-y_i\log \hat{p}_i-(1-y_i)\log(1-\hat{p}_i)\right]
+\sum_{k=1}^{K}\Omega(f_k)
$$

这里 \(\Omega(f_k)\) 惩罚树的叶子数量和叶子权重，避免模型只记住少数历史暴雨。XGBoost 的优势在于能处理非线性阈值和特征交互：例如相同 24 小时雨量下，坡角更陡、工程投入等级更低、前期 7 日雨量更高的边坡风险会显著不同。

##### 数据划分为什么按暴雨事件设计

论文的约 2200 万样本并不是 2200 万个独立自然实验，而是约 6 万个边坡与 384 场暴雨交叉得到的表。若简单随机切分样本，训练集和测试集可能共享同一场暴雨中的大量空间相邻边坡，评估会过于乐观。GEO 因此设置了两种测试集：一种按 1997 年强降雨年和 2016 年典型年等暴雨事件战略选择，另一种做约 10% 分层抽样。这样既能检查模型对特定历史年份的泛化，也能检查整体概率排序质量。

对单个边坡，模型评估使用 log loss、Brier Score 和 ROC AUC；对一次暴雨的全港影响，业务更关心“会有多少起滑坡”。因此论文把每个坡体概率求和：

$$
\widehat{N}_{e}=\sum_{s\in\mathcal{S}} \hat{p}_{s,e}
$$

其中 \(\widehat{N}_{e}\) 是暴雨事件 \(e\) 的预测滑坡数量，\(\mathcal{S}\) 是登记人工边坡集合。再用 \(R^2\) 和 MSE 比较 \(\widehat{N}_{e}\) 与实际报告数 \(N_e\)。这个求和步骤很关键：单个坡体概率很低，但 6 万个坡体的概率质量聚合后，能形成对全港应急资源需求的量化估计。

##### 实时业务机制

新闻报道称生产系统把实时气象和岩土监测与历史数据库融合，每 5 分钟生成滑坡概率图。按论文工作流推断，实时阶段会不断刷新当前暴雨的滚动雨量、前期雨量和预报雨量特征；每个登记边坡重新计算 \(\hat{p}_{s,t}\)，再按行政区、道路邻近性或风险阈值聚合给 GEO/HKO 的预警和应急控制中心。

> ⚠️ 注意：这种模型预测的是“降雨诱发的多发性风险”，并不能保证识别每一起孤立滑坡。香港斜坡安全网站也明确说明，滑坡预警面向许多滑坡的发生风险，个别滑坡仍可能在未达到全港预警级别时发生。

#### 🧪 练习题
```yaml
question: "GEO Landslide AI 中把所有边坡概率求和的主要用途是什么？"
options:
  - "把二分类模型变成图像分割模型"
  - "估计一场暴雨期间全港人工边坡的预期滑坡数量"
  - "删除所有低风险边坡样本"
  - "替代实时雨量站，不再需要降雨观测"
answer: 1
explain: "模型先输出每个边坡在某场暴雨中的滑坡概率；对全体边坡求和可得到事件级预期滑坡数，用于评估预警和应急资源需求。"
```

### Groundsource

```yaml
id: groundsource
num: 28
name: Groundsource
full_name: 城市内涝预警 (Groundsource)
year: '2026'
org: Google Research
parent: floodhub
paper_url: https://research.google/blog/protecting-cities-with-ai-driven-flash-flood-forecasting/
project_url: ''
category: geo_hazard
motivation: Gemini分析500万新闻24小时内涝预警
```

#### 📝 一句话总结
Groundsource 用 Gemini 从多语言新闻中抽取洪涝事件的时间、地点和边界，构建 260 万条级别的历史城市内涝/洪水数据集，再训练面向 20x20 km 网格的 LSTM 风险模型，实现城市突发洪水最长 24 小时提前预警。

#### 🎯 核心要点
- **数据荒问题转化**：城市突发洪水缺少像河流水位计那样统一的传感器真值，Groundsource 把新闻报道转成可监督学习的历史事件标签
- **LLM 抽取流水线**：Google Read Aloud 从新闻页提取正文，Cloud Translation API 统一到英文，Gemini 负责分类、相对时间锚定、精细地点抽取和事件验证
- **地理落图**：抽取出的街道、社区、城市等地点通过 Google Maps Platform 映射为标准空间多边形，形成可与气象网格对齐的事件 footprint
- **开放数据集**：Google Research 公布首个 Groundsource flash floods 数据集，Zenodo 页面显示其包含 260 万个历史洪水事件、覆盖 150 多个国家，文件为 `groundsource_2026.parquet`
- **质量验证**：官方博客称人工审核中 60% 事件在位置和时间上准确，82% 达到实际分析可用；与 GDACS 严重洪水匹配时，2020-2026 年覆盖率约 85%-100%
- **预报模型**：Urban Flash Flood 模型使用 Groundsource 标签训练 LSTM/RNN，输入全球气象产品和实时预报，并拼接城市化密度、地形、土壤吸收率等静态属性
- **全球可扩展性**：模型只依赖 NASA IMERG、NOAA CPC、ECMWF HRES 和 Google DeepMind 中期天气模型等全球数据源，当前以 20x20 km 分辨率覆盖人口密度大于 100 人/平方公里的城市区域

#### 🔬 深入细节
##### 图示与来源限制

Groundsource 有两个官方来源：Google Research 2026 年 3 月 12 日博客 *Introducing Groundsource: Turning news reports into data with Gemini* 解释数据构建方法；同日博客 *Protecting cities with AI-driven flash flood forecasting* 解释 24 小时城市突发洪水预报模型。Google 博客链接到 EarthArXiv 技术报告 DOI `10.31223/X5RR2K` 和 `10.31223/X5177S`，其中 Groundsource 数据集本身已在 Zenodo 开放：`https://zenodo.org/records/18647054`。本文以官方博客和开放数据集页面为主，论文 PDF 若需复核可通过上述 DOI/下载链接访问。

![Groundsource 新闻量与事件量增长](https://storage.googleapis.com/gweb-research2023-media/images/Groundsource1_Graph.width-1250.png)
*图：Google Research 官方图。左图是可用新闻 URL 随时间增长，右图是 Groundsource pipeline 捕捉到的洪水事件量。*

![Urban Flash Flood 模型覆盖区域](https://storage.googleapis.com/gweb-research2023-media/images/Urban-Flash-Floods-1.width-1250.png)
*图：Google Research 官方图。颜色表示当前城市突发洪水模型在全球城市区域的覆盖率。*

##### 算法伪代码

```python
# Groundsource: 从新闻到城市突发洪水预警
def extract_groundsource_events(news_urls):
    events = []
    for url in news_urls:
        article = read_aloud_extract_main_text(url)
        english_text = translate_to_english(article.text, source_lang=article.lang)

        result = gemini_verify_and_extract(
            english_text,
            publication_date=article.date,
            tasks=[
                "is_actual_flood_event",      # 排除预警、政策、泛泛风险讨论
                "event_start_end_time",       # 把 last Tuesday 等相对时间锚定到日期
                "granular_locations",         # 抽取街道、社区、城市等地点
                "evidence_spans",
            ],
        )

        if result.is_actual_flood_event:
            polygons = google_maps_geocode_to_polygons(result.locations)
            events.append({
                "time": result.time_interval,
                "geometry": merge(polygons),
                "confidence": result.confidence,
                "source_url": url,
            })

    return deduplicate_and_aggregate(events)


def train_urban_flash_flood_model(events, weather, static_geo):
    dataset = []
    for grid_cell, forecast_time in urban_grid_times():
        x_met = make_weather_timeseries(weather, grid_cell, forecast_time)
        x_static = static_geo[grid_cell]  # urbanization, topography, soil absorption...
        y = event_intersects(events, grid_cell, horizon_hours=24, at=forecast_time)
        dataset.append((x_met, x_static, y))

    model = LSTMPlusStaticFeatures()
    model.fit(dataset, loss="weighted_binary_cross_entropy")
    return model
```

##### LLM 抽取为什么是关键创新

河流洪水可以用水位计和河道水文模型建立监督数据，但城市突发洪水往往发生在排水系统、街道低洼区和短时强降雨交互处，地点分散、持续时间短、缺少传感器。传统全球灾害库如 GDACS 更关注高影响事件，数量级远小于训练全球模型所需的细粒度标签。

Groundsource 的核心不是让 Gemini 直接预测未来洪水，而是让 Gemini 把非结构化新闻变成结构化真值。每篇报道先被判断是否真的描述了已发生或正在发生的洪水，而不是“未来可能下雨”“政府讨论防洪工程”之类非事件文本。然后模型把相对时间解析到具体日期，把地点抽取到街道/社区级，并通过 Google Maps 映射到空间多边形。

这个过程可以形式化为信息抽取函数：

$$
e_j = g_{\text{Gemini}}(d_j, t^{\text{pub}}_j)
= (\tau_j, \mathcal{G}_j, q_j)
$$

其中 \(d_j\) 是新闻正文，\(t^{\text{pub}}_j\) 是发布时间，\(\tau_j\) 是事件时间窗，\(\mathcal{G}_j\) 是地理多边形集合，\(q_j\) 是抽取置信度或可用性判定。后续去重聚合把多个报道合并成同一历史事件，从而得到可与气象网格和预报时效对齐的数据集。

##### 预报模型的监督学习形式

Urban Flash Flood 模型回答的问题是：给定未来天气和本地条件，某个城市网格在未来 24 小时是否可能发生突发洪水。设网格为 \(g\)，当前预报初始化时间为 \(t\)，气象时间序列为 \(\mathbf{X}_{g,t}\)，静态地理属性为 \(\mathbf{s}_{g}\)，模型输出：

$$
\hat{p}_{g,t}
=\sigma\left(
\operatorname{MLP}
\left[
\operatorname{LSTM}(\mathbf{X}_{g,t-L:t+24}),
\mathbf{s}_{g}
\right]
\right)
$$

标签来自 Groundsource 事件是否与该网格、该 24 小时时窗相交：

$$
y_{g,t}=\mathbb{1}\left[
\exists e: \mathcal{G}_e\cap g\neq\varnothing
\land \tau_e \in (t,t+24h]
\right]
$$

训练可使用加权二元交叉熵，以处理“无洪水”样本远多于“有洪水”样本的问题：

$$
\mathcal{L}=
-\sum_{g,t}
\left[
w_+ y_{g,t}\log \hat{p}_{g,t}
+w_- (1-y_{g,t})\log(1-\hat{p}_{g,t})
\right]
$$

LSTM 适合处理降雨、土壤湿度或预报降水这类时间序列；静态特征则让模型区分“同样雨量落在高城市化、不透水面多、低洼地区”和“同样雨量落在排水条件较好地区”的风险差异。

##### 为什么选择全球数据源和 20x20 km

局地高精度内涝系统通常依赖雨量雷达、水位计、排水管网和人工校准，精度高但难以全球扩展。Google 的模型目标是 near-global reach，因此只使用全球可得数据：NASA IMERG、NOAA CPC、ECMWF IFS HRES、Google DeepMind 中期天气模型等。代价是空间分辨率当前约为 20x20 km，输出更像“中/高风险区域提示”，而不是街道级积水深度模拟。

这也是 Groundsource 的工程取舍：新闻覆盖在城市更密集，所以初始版本聚焦人口密度大于 100 人/平方公里的区域；农村和低媒体覆盖地区仍会有标签缺口。官方博客也指出，precision 指标可能被低估，因为未被媒体报道的真实洪水会让有效预警看起来像 false positive。

##### 评估与局限

Google 官方博客给出的两个质量层级很实用：60% 事件在精确位置和时间上正确，82% 达到实际分析可用。也就是说，Groundsource 不应被看成完美灾害清单，而是一个足够大、足够局部化的弱监督地理标签库。对模型评估，团队还用 GDACS 估计重大洪水召回，并把 NWS Flash Flood Warnings 按同样 20x20 km、24 小时窗口重采样做上下文比较。

> 💡 关键：Groundsource 的算法贡献是“用 LLM 规模化制造地理监督信号”，而不是把 LLM 当作最终洪水预报器；真正的 24 小时预报仍由气象输入、地理静态变量和时序神经网络完成。

#### 🧪 练习题
```yaml
question: "Groundsource 在城市内涝预警中的核心作用是什么？"
options:
  - "直接用 Gemini 读取实时天气并输出最终洪水概率"
  - "把多语言新闻报道抽取成带时间和空间多边形的历史洪水事件标签"
  - "替代所有气象预报模型和降雨产品"
  - "只统计河流水位计的历史水位"
answer: 1
explain: "Groundsource 用 Gemini 做事件分类、时间锚定和地点抽取，生成监督学习标签；24 小时预报模型再用这些标签训练 LSTM 风险模型。"
```

### Dryad Gen-4-Pro

```yaml
id: dryad_gen4
num: 29
name: Dryad Gen-4-Pro
full_name: Dryad野火传感器 (Dryad Gen-4-Pro)
year: '2026'
org: Dryad Networks
parent: alertcalifornia
paper_url: https://www.businesswire.com/news/home/20260510819235/en/
project_url: ''
category: geo_hazard
motivation: AI嗅觉识别阴燃野火烟雾前检测
```

#### 📝 一句话总结
Dryad Gen-4-Pro 是一类面向林下部署的 AI 电子鼻野火传感器，通过 VOC、CO、PM2.5/PM10 与微气象数据融合，在明火和可见烟柱出现前识别阴燃阶段的热解气体指纹，并借助 LoRaWAN mesh 或直连卫星把告警传回云端。

#### 🎯 核心要点
- **传感器融合而非视觉检测**：用 VOC、CO、颗粒物、温湿度和气压识别阴燃火灾，补足摄像头/卫星通常要等烟柱、火焰或热异常成形后才能发现的滞后
- **Gen-4-Pro 新增 CO 与 PM2.5/PM10 能力**：官方资料称新一代传感器提高检测精度和灵敏度，降低误报，并把检测范围提升到此前的两倍或以上
- **边缘 AI 判别**：传感器在设备端融合气体和空气质量特征，区分野火热解信号与正常森林微气候、污染源或传感器漂移
- **林下低功耗部署**：内置 8 x 8 cm 太阳能板，使用超级电容而非锂电池，面向 10 年免维护运行，减少设备自身火灾风险
- **多路径通信**：支持 LoRaWAN、Silvanet 多跳 mesh、Border Gateway 云端回传，并在 Gen-4-Pro 中加入 Kinéis UHF 直连卫星链路，适合无公网覆盖的森林和线性基础设施
- **覆盖参数明确**：官方 WF-4P Pro 数据表给出 100 m、2 kg fuel 条件下数分钟级检测，传感器间距可达 300 m，单个网关最多连接约 100 个野火传感器
- **系统级告警闭环**：传感器本地打分后只上传低带宽告警和环境摘要，云端结合站点拓扑、邻近节点、历史基线和运维状态生成面向消防/林业用户的事件
- **来源限制**：未找到公开同行评审论文或完整模型结构；以下算法解读基于 Dryad 官方发布、产品页、WF-4P Pro 数据表、Dryad 文档和 ST 对 Silvanet 架构的技术介绍，并把未公开部分标注为方法级重构

#### 🔬 深入细节
##### 图示与可访问来源

![Dryad Gen-4-Pro 传感器外观](https://static.wixstatic.com/media/072dcb_b0037712e3a543369fa346db84209fba~mv2.png/v1/crop/x_130%2Cy_0%2Cw_2683%2Ch_2784/fill/w_416%2Ch_429%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/gen4%20front%20side%20back.png)
*图：Dryad 官方产品页中的 Gen-4-Pro/WF-4P Pro 传感器外观。官方发布页见 https://www.dryad.net/post/dryad-launches-gen-4-pro-silvanet-wildfire-sensor-setting-new-standard-in-ultra-early-fire-detectio ，产品页和数据表见 https://www.dryad.net/wildfiresensor 与 https://www.dryad.net/_files/ugd/072dcb_deecacb08cc04691ac08beeb3ce27c09.pdf 。*

![Silvanet LoRa mesh 架构](https://blog.st.com/wp-content/uploads/2025/11/CleanShot-2022-09-08-at-00.23.51%402x-scaled.jpg)
*图：Silvanet 传感器、Mesh Gateway、Border Gateway 与云平台的多跳回传架构。图片来自 STMicroelectronics 对 Silvanet 低功耗 LoRa 方案的技术介绍：https://blog.st.com/silvanet/ 。*

##### 问题背景：为什么要把“鼻子”放到森林里

摄像头、瞭望塔和卫星适合观察已经形成烟柱、火焰或热异常的火灾，但对林下阴燃火特别不友好。阴燃阶段的火源可能还没有可见火焰，树冠又会遮挡遥感视线；等到摄像头或卫星看到明显烟柱，火势通常已经跨过可被一支小队快速压制的窗口。

Dryad 的思路是把检测对象从“光学现象”提前到“燃烧化学信号”。枯枝、落叶和林下可燃物在热解和阴燃时会释放 VOC、CO 和细颗粒物，这些信号在火苗可见前就会扩散到近地空气中。Gen-4-Pro 把这类气体/颗粒物传感器和温湿度、气压等微气候传感器封装到低功耗节点里，部署在树上或杆上，让森林本身成为稠密的环境传感网络。

> ⚠️ 注意：Dryad 公开资料说明“内置 AI”和“融合 VOC、CO、颗粒物传感器”，但没有公开网络层数、训练集、阈值或损失函数。因此下文公式和伪代码是与公开系统行为一致的工程化重构，用来解释它为什么可行，而不是 Dryad 已披露的源码。

##### 感知变量与火灾指纹

一个传感器在时间 \(t\) 的观测可写成多变量序列：

$$
x_t =
\left[
\mathrm{VOC}_t,\ \mathrm{CO}_t,\ \mathrm{PM}_{2.5,t},\ \mathrm{PM}_{10,t},\
T_t,\ RH_t,\ P_t,\ E_t
\right]
$$

其中 \(T\) 是温度，\(RH\) 是相对湿度，\(P\) 是气压，\(E\) 可表示能量/光照或设备健康状态。单看某个变量容易误报：VOC 可能来自植被挥发，PM2.5 可能来自远处烟雾或道路扬尘，CO 传感器也会有漂移。因此真正有用的是“多变量共同变化的形状”：CO 和 VOC 同时上升、颗粒物滞后增强、湿度/温度出现局地异常，并且这种变化持续若干采样周期。

一种合理的边缘特征构造是先对每个站点建立动态基线：

$$
\mu_i(t)=\operatorname{EMA}(x_{i,t}),\qquad
\sigma_i(t)=\operatorname{EMA}(|x_{i,t}-\mu_i(t)|)+\epsilon
$$

$$
z_{i,t}=\frac{x_{i,t}-\mu_i(t)}{\sigma_i(t)}
$$

这样做的目的不是估计绝对污染浓度，而是判断“该传感器所在林下微环境是否出现不寻常的燃烧指纹”。在潮湿山谷、干燥针叶林和靠近道路的站点，同一 CO 或 PM2.5 读数的意义不同，必须相对本地背景解释。

##### 边缘 AI 判别：多模态、时序和抗误报

公开资料中的“AI-based gas and air-quality sensing”可以抽象为一个轻量分类器：

$$
p_t = f_\theta
\left(
z_{t-k:t},\
\Delta z_{t-k:t},\
\operatorname{corr}(z_{\mathrm{CO}}, z_{\mathrm{VOC}}),\
\operatorname{corr}(z_{\mathrm{PM}}, z_{\mathrm{CO}})
\right)
$$

其中 \(p_t\) 是阴燃火灾概率，\(z_{t-k:t}\) 是最近 \(k\) 个窗口的归一化特征，\(\Delta z\) 表示上升速率。火灾不是一个瞬时尖峰，而是具有持续性和化学耦合关系的事件，所以最终告警通常要经过时间平滑：

$$
s_t = \alpha p_t + (1-\alpha)s_{t-1}
$$

$$
\mathrm{alert}_t =
\mathbb{1}\left[
s_t > \tau_{\mathrm{fire}}
\land
\Delta \mathrm{CO}_t > \tau_{\mathrm{CO}}
\land
\Delta \mathrm{PM}_{2.5,t} > \tau_{\mathrm{PM}}
\right]
$$

这个结构解释了为什么 Gen-4-Pro 加入 CO 和 PM2.5 会有实质意义。VOC 对早期热解敏感，但生态背景复杂；CO 是不完全燃烧的强信号；PM2.5/PM10 捕捉烟雾颗粒。三者一起看，相当于把“气味、燃烧产物和颗粒物”同时纳入分类边界，从而降低单一传感器漂移或环境扰动造成的误报。

##### 网络与告警路径

Silvanet 的工程难点不只是检测，还包括在没有电力和公网的森林中把告警送出去。Dryad 文档将系统分成 Wildfire Sensor、Mesh Gateway、Border Gateway 和 Silvanet Cloud。普通 LoRaWAN 是星型网络，深林中单跳网关覆盖有限；Silvanet 用 Mesh Gateway 扩展覆盖，让传感器消息经多跳 mesh 到达 Border Gateway，再通过 LTE-M/2G、以太网、卫星或 Gen-4-Pro 的直连卫星链路进入云端。

从系统角度看，Dryad 避免了把原始高频传感器流全部上传。边缘节点本地完成大部分判别，只在周期心跳、微气候摘要或告警状态变化时发包。这样能同时满足三个约束：LoRa 链路低带宽、太阳能供电、传感器数量可扩展。

##### 算法伪代码：从林下空气到云端告警

```python
# Dryad Gen-4-Pro 方法级重构：公开资料未披露真实模型参数
def sensor_loop():
    baseline = load_local_baseline()
    score = 0.0

    while True:
        raw = read_sensors(
            variables=["VOC", "CO", "PM2.5", "PM10", "temperature", "humidity", "pressure"]
        )
        health = read_device_state()  # solar/supercapacitor/radio/device diagnostics

        # 1. 本地基线校正：过滤季节、昼夜和站点差异
        z = robust_normalize(raw, baseline)
        dz = temporal_gradient(z)

        # 2. 电子鼻分类：融合气体、颗粒物和微气象上下文
        p_fire = edge_model.predict(
            features=[
                z["VOC"], z["CO"], z["PM2.5"], z["PM10"],
                dz["VOC"], dz["CO"], dz["PM2.5"],
                z["temperature"], z["humidity"], z["pressure"],
                health["sensor_quality"],
            ]
        )

        # 3. 时间一致性约束：火灾指纹需要持续，而不是单点尖峰
        score = 0.8 * score + 0.2 * p_fire
        alert = (
            score > FIRE_THRESHOLD
            and dz["CO"] > CO_RISE_THRESHOLD
            and dz["PM2.5"] > PM_RISE_THRESHOLD
        )

        # 4. 低带宽上传：告警优先，常规环境数据低频上传
        if alert:
            packet = make_fire_alert(raw, score, gps_or_site_location(), timestamp())
            send_via_lora_mesh_or_satellite(packet)
        else:
            send_periodic_microclimate_summary(raw, health)

        baseline = update_baseline(baseline, raw, exclude_if=alert)
        sleep_until_next_sampling_window()


def cloud_event_fusion(packets):
    events = cluster_by_site_time_and_location(packets)
    for event in events:
        # 多节点一致性、风向、站点拓扑和设备状态用于降低误报
        confidence = fuse(
            event.sensor_scores,
            event.neighboring_sensor_context,
            event.wind_or_microclimate_context,
            event.device_health,
        )
        if confidence > DISPATCH_THRESHOLD:
            notify_users(event.location, confidence, event.first_seen)
```

##### 与 ALERTCalifornia 摄像头路线的区别

ALERTCalifornia 的优势是覆盖广、可视化强，摄像头图像还能给调度员提供方向、烟柱规模和火势发展证据。但摄像头依赖视线，容易受地形、夜间能见度、云雾和树冠遮挡影响。Dryad 的优势是把传感器放在燃料附近，目标是“火还没有长成可以被看见的烟柱之前”就发现异常。

两者不是替代关系，而是互补关系。一个合理的灾害监测系统可以用 Dryad 类地面电子鼻给出最早触发，用摄像头/无人机确认火点和态势，用卫星做大范围热异常与烟羽追踪。Dryad Gen-4-Pro 的技术贡献在于把 AI 检测边界从图像空间前移到化学空间，同时用低功耗网络解决森林中最难的供电和通信问题。

> 💡 关键：Gen-4-Pro 的“AI”价值不在于云端大模型，而在于每个边缘节点都能在噪声很大的本地空气质量信号中做早期、低功耗、低误报的二分类，并只把必要事件传回网络。

#### 🧪 练习题
```yaml
question: "Dryad Gen-4-Pro 相比摄像头/卫星野火检测，最核心的技术前移是什么？"
options:
  - "把野火检测从可见烟柱或热异常前移到阴燃阶段的气体和颗粒物指纹"
  - "用更高分辨率相机替代卫星遥感"
  - "只在云端处理全部原始传感器数据以提高精度"
  - "完全依赖人工巡查确认每个传感器读数"
answer: 0
explain: "Gen-4-Pro 使用 VOC、CO、PM2.5/PM10 和微气象信号做边缘 AI 融合，目标是在明火和明显烟柱出现前识别阴燃火。"
```

### Earthquake AI

```yaml
id: earthquake_ai
num: 30
name: Earthquake AI
full_name: 地震检测AI (Earthquake AI)
year: '2026'
org: JAMSTEC
parent: recast
paper_url: https://www.jamstec.go.jp/e/
project_url: ''
category: geo_hazard
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

### Aurora

```yaml
id: aurora
num: 31
name: Aurora
full_name: Aurora大气基础模型 (Aurora)
year: '2024'
org: Microsoft Research
parent: climax
paper_url: https://www.microsoft.com/en-us/research/blog/introducing-aurora-the-first-large-scale-foundation-model-of-the-atmosphere/
project_url: ''
category: earth_fm
motivation: 13亿参数大气基础模型5000倍加速
```

#### 📝 一句话总结
Aurora 提出了 13 亿参数的三维地球系统基础模型，用 Perceiver 编解码器处理异构变量、气压层和分辨率，用 3D Swin Transformer 推进大气状态，并通过大规模多源预训练与 LoRA rollout 微调，把一个模型迁移到天气、空气质量、海浪和热带气旋等多类预报任务。

#### 🎯 核心要点
- **基础模型路线**：先在超过一百万小时的多源地球系统数据上预训练，再用少量任务数据微调，而不是为每个天气/环境任务从头训练专用模型
- **13 亿参数规模**：Microsoft Research 2024 博客将 Aurora 描述为 1.3B 参数大气基础模型，2025 Nature 版本扩展为 Earth system foundation model
- **三段式架构**：Encoder 将异构输入映射到统一三维 latent atmosphere，Processor 用 3D Swin Transformer 自回归推进，Decoder 输出指定变量、气压层和分辨率
- **Perceiver 适配异构输入**：编码器/解码器可以处理不同变量集合、不同 pressure levels、不同空间分辨率和不同数据保真度，避免固定通道 CNN 的接口限制
- **多数据源预训练**：预训练混合 ERA5、HRES/GFS 分析与预报、集合预报、CMIP/IFS/CMCC/MERRA 等再分析、预报和气候模拟数据，学习通用大气动力学表示
- **6 小时下一步 MAE 目标**：预训练阶段学习 \(x_t \rightarrow x_{t+6h}\)，再通过短时效微调和长时效 rollout 微调降低自回归误差积累
- **LoRA 长时效微调**：rollout 阶段用低秩适配更新少量参数，提升 5-10 天多步预报稳定性，同时降低针对每个任务全量微调的成本
- **多任务结果**：Nature 论文报告 Aurora 在 0.4° 空气质量、0.25° 海浪、热带气旋路径和 0.1° 高分辨率天气上超过多个业务系统的大部分指标
- **推理速度优势**：Microsoft 博客估计相对 ECMWF IFS 可带来约 5000x 计算加速，并能在一分钟内生成 5 天空气质量或 10 天高分辨率天气预报
- **可用代码与模型接口**：官方 GitHub/Python 包提供 Batch、Metadata、surface variables、atmospheric variables 和 static variables 的输入结构，研究用途可复现实验子集

#### 🔬 深入细节
##### 图示与可访问来源

![Aurora 架构总览](https://www.microsoft.com/en-us/research/wp-content/uploads/2024/06/FIG1_Aurora.png)
*图：Microsoft Research 博客中的 Aurora Figure 1，展示多源预训练、Perceiver 编解码、3D Swin Transformer 处理器和 LoRA rollout 微调。博客见 https://www.microsoft.com/en-us/research/blog/introducing-aurora-the-first-large-scale-foundation-model-of-the-atmosphere/ 。*

![Aurora arXiv 架构图](https://ar5iv.labs.arxiv.org/html/2405.13063/assets/x1.png)
*图：Aurora arXiv/Nature 论文的框架图。预印本见 https://arxiv.org/abs/2405.13063 ，Nature 版本见 https://www.nature.com/articles/s41586-025-09005-y ，官方文档见 https://microsoft.github.io/aurora/intro.html ，代码仓库见 https://github.com/microsoft/aurora 。*

##### 从 ClimaX 到 Aurora：变量异构问题进一步放大

ClimaX 已经把“变量集合可变”作为天气气候基础模型的核心问题：不同数据源不一定有相同变量、分辨率和区域。Aurora 继承了这个问题，但进一步把难度扩展到三维大气、空气化学、海浪和热带气旋等任务。也就是说，模型不能只预测固定 0.25° ERA5 的 Z500/T850，而要能接收不同 pressure levels、不同 surface variables、不同时间来源和不同数据保真度。

Aurora 的抽象是：每个样本由三类变量组成。

$$
X_t =
\left(
X_t^{surf},\
X_t^{atm},\
X^{static},\
\mathcal{M}
\right)
$$

\(X_t^{surf}\) 包含 2m temperature、10m wind、mean sea-level pressure、污染物柱总量等地表或二维变量；\(X_t^{atm}\) 包含 \(u,v,t,q,z\) 等三维气压层变量；\(X^{static}\) 包含地形、陆海掩膜、土壤类型等静态场；\(\mathcal{M}\) 是经纬度、时间戳、气压层和任务元数据。

##### 编码器：把不同数据源映射到统一三维 latent atmosphere

Aurora 的 Encoder 不是简单把所有变量拼成固定通道。它先把变量、层级和空间 patch 编码为 token，再用 Perceiver-style cross-attention 将这些异构 token 投影到固定的 latent pressure levels 与空间网格上。

可以把这一过程写成：

$$
h_t =
E_\theta
\left(
X_t^{surf}, X_t^{atm}, X^{static}, \mathcal{M}
\right)
$$

其中：

$$
h_t \in \mathbb{R}^{L \times H' \times W' \times D}
$$

\(L\) 是 latent pressure levels 数，\(H',W'\) 是 patch 后的空间大小，\(D\) 是隐藏维度。Perceiver 的作用是用固定数量的 latent query 去读取可变长度输入：

$$
\operatorname{CrossAttn}(Q,K,V)
=
\operatorname{softmax}
\left(
\frac{QK^\top}{\sqrt{D}}
\right)V
$$

这样，即使某个任务只有 13 个压力层，另一个任务有不同层级或额外污染物变量，模型仍能先映射到统一 latent 表示，再交给同一个 processor 推进。

##### Processor：3D Swin Transformer 推进大气状态

Aurora 的核心动力学模块是 3D Swin Transformer。与普通 ViT 的全局注意力相比，Swin 使用局部窗口 attention 和 shifted window，在三维体素结构中高效混合局部和跨窗口信息。对大气来说，这个三维不是普通视频的 \(T,H,W\)，而是 pressure level、latitude 和 longitude 构成的三维 latent volume。

一步 6 小时预报可写成：

$$
h_{t+\Delta t} =
P_\theta(h_t),
\qquad
\Delta t = 6\ \mathrm{hours}
$$

随后解码器输出物理变量：

$$
\hat{X}_{t+\Delta t}
=
D_\theta(h_{t+\Delta t}, \mathcal{M}_{out})
$$

多步预报通过自回归完成：

$$
\hat{X}_{t+k\Delta t}
=
F_\theta^{(k)}(X_t)
=
F_\theta\left(\hat{X}_{t+(k-1)\Delta t}\right)
$$

其中 \(F_\theta = D_\theta \circ P_\theta \circ E_\theta\)。这也是 Aurora 后续需要 rollout fine-tuning 的原因：单步误差如果不在训练中暴露，10 天预报会逐步积累偏差。

##### 训练目标：多数据源、变量加权 MAE

论文和补充材料说明，Aurora 在预训练和微调中使用加权 MAE。简化写法如下：

$$
\mathcal{L}(\theta)
=
w_d
\left[
\alpha_s
\sum_{v\in \mathcal{V}_s}
w_v
\left\|
\operatorname{norm}_v(\hat{x}_{v})-
\operatorname{norm}_v(x_{v})
\right\|_1
+
\alpha_a
\sum_{v\in \mathcal{V}_a}
\sum_{\ell\in \mathcal{L}_v}
w_{v,\ell}
\left\|
\operatorname{norm}_{v,\ell}(\hat{x}_{v,\ell})-
\operatorname{norm}_{v,\ell}(x_{v,\ell})
\right\|_1
\right]
$$

\(w_d\) 是数据集权重，用于上调 ERA5、GFS analysis 等高保真数据；\(\alpha_s,\alpha_a\) 平衡地表变量与三维大气变量；\(w_v,w_{v,\ell}\) 平衡温度、风、湿度、位势高度、污染物等不同量纲变量。空气污染变量特别稀疏，论文对污染物使用基于 persistence error 的归一化权重，避免 PM2.5、NO2 等稀疏高峰被平均损失淹没。

预训练主任务是 6 小时下一步预测：

$$
\hat{X}_{t+6h}=F_\theta(X_t)
$$

训练完基础模型后，Aurora 针对具体任务做两阶段微调。短时效微调用真实目标数据调整模型；长时效 rollout 微调把模型自己的预测再喂回输入，直接优化多步稳定性。长时效阶段使用 LoRA：

$$
W' = W + \Delta W,\qquad
\Delta W = BA,\qquad
\operatorname{rank}(BA)=r \ll \min(m,n)
$$

这让任务适配只更新低秩矩阵 \(A,B\)，保留基础模型主干参数，降低微调成本和过拟合风险。

##### 算法伪代码

```python
# Aurora 训练与推理核心逻辑，按公开论文/文档抽象
def aurora_forward(batch, output_metadata):
    """
    batch.surf_vars: dict[str, tensor[B, T, H, W]]
    batch.atmos_vars: dict[str, tensor[B, T, L, H, W]]
    batch.static_vars: dict[str, tensor[H, W]]
    batch.metadata: lat, lon, time, pressure_levels
    """
    # 1. Perceiver encoder: heterogeneous variables -> canonical 3D latent atmosphere
    latent = encoder(
        surface=batch.surf_vars,
        atmosphere=batch.atmos_vars,
        static=batch.static_vars,
        metadata=batch.metadata,
    )

    # 2. 3D Swin Transformer processor: evolve latent state by one forecast step
    next_latent = swin3d_processor(latent)

    # 3. Perceiver decoder: canonical latent -> requested variables/levels/resolution
    prediction = decoder(next_latent, output_metadata)
    return prediction


def pretrain_step(batch, dataset_weight):
    target = make_target(batch, lead_time_hours=6)
    pred = aurora_forward(batch, target.metadata)

    loss = dataset_weight * weighted_mae(
        pred.surface, target.surface,
        pred.atmosphere, target.atmosphere,
        variable_weights=pretraining_weights,
    )
    loss.backward()
    optimizer.step()


def rollout_finetune(batch, horizon_steps):
    state = batch
    total_loss = 0.0
    for k in range(1, horizon_steps + 1):
        pred = aurora_forward(state, output_metadata=batch.targets[k].metadata)
        total_loss += weighted_mae(pred, batch.targets[k])
        state = replace_input_with_prediction(state, pred)

    # LoRA: only low-rank adapter parameters are updated in rollout fine-tuning
    total_loss.backward()
    lora_optimizer.step()


def forecast(initial_batch, steps):
    state = initial_batch
    outputs = []
    for _ in range(steps):
        pred = aurora_forward(state, output_metadata=state.metadata)
        outputs.append(pred)
        state = replace_input_with_prediction(state, pred)
    return outputs
```

##### 为什么多源预训练有效

传统 AI 天气模型常在单一再分析数据上训练，例如 ERA5。这样做数据一致、评估清晰，但模型学到的可能是某个资料系统的统计规律，而不是更广泛的大气动力学。Aurora 把 reanalysis、analysis、operational forecasts、ensemble forecasts 和 climate simulations 混合起来，让模型看到不同初值扰动、不同物理参数化、不同分辨率和不同误差结构。

论文的核心经验结论是：在足够大的模型上，数据多样性和模型规模同时提升预报技能。Microsoft 博客的 Figure 3 显示，加入低保真气候模拟数据并没有拖累模型，反而提升了多个变量的 6 小时预报；更大的模型在相同 GPU 小时下验证损失更低。这与 ClimaX 的基础模型假设一致，但 Aurora 用更大模型、更高分辨率和更广任务证明了这一路线。

##### 与 GraphCast/Pangu-Weather 的差异

GraphCast 和 Pangu-Weather 是强大的全球中期天气预报模型，但它们的典型接口更接近固定任务：给定固定变量、固定分辨率和固定训练数据，输出天气预报。Aurora 的贡献在于把接口做成“可迁移的地球系统预报骨架”：空气污染、海浪、热带气旋路径和 0.1° 天气都可以从同一个预训练模型出发微调。

这并不意味着 Aurora 可以不经验证直接替代业务 NWP。官方 GitHub 的透明度说明也强调，发布代码主要面向研究复现，神经网络没有严格物理保证，输入分布变化可能导致很差预测，业务使用还需要额外验证。它更准确的定位是：证明大规模、多源、可微调的 foundation model 可以成为未来地球系统预测的通用底座。

> 💡 关键：Aurora 的“5000 倍加速”不是来自更快求解 Navier-Stokes 方程，而是用一次神经网络前向传播近似业务模式多小时超级计算的状态推进；代价是必须依赖训练分布、校准和严格评估来控制失效风险。

#### 🧪 练习题
```yaml
question: "Aurora 为什么使用 Perceiver 编解码器而不是固定通道 CNN 输入？"
options:
  - "为了只支持 ERA5 的固定 0.25° 变量集合"
  - "为了处理不同数据源中的可变变量、气压层、空间分辨率和输出任务，并映射到统一三维 latent 表示"
  - "为了避免使用任何三维大气变量"
  - "为了让模型只能做单步 6 小时预报，不能 rollout"
answer: 1
explain: "Aurora 的基础模型目标要求输入和输出接口可变；Perceiver cross-attention 能把异构变量和层级读入固定 latent atmosphere，再由 3D Swin Transformer 推进。"
```

### Earth-2

```yaml
id: earth2
num: 32
name: Earth-2
full_name: NVIDIA地球2号 (Earth-2)
year: '2024'
org: NVIDIA
parent: aurora
paper_url: https://nvidianews.nvidia.com/news/nvidia-earth-2-weather-forecasting-ai
project_url: ''
category: earth_fm
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

### THOR

```yaml
id: thor
num: 33
name: THOR
full_name: 多模态地球观测模型 (THOR)
year: '2026'
org: Norwegian Research
parent: aurora
paper_url: https://arxiv.org/abs/2601.16011
project_url: ''
category: earth_fm
motivation: 多模态异构观测通用Transformer架构
```

#### 📝 一句话总结
THOR 提出一个 compute-adaptive 的多模态地球观测基础模型，用单个 ViT 统一 Sentinel-1 SAR、Sentinel-2 MSI、Sentinel-3 OLCI/SLSTR 的 10 m 到 1000 m 原生分辨率，并通过随机 patch/输入尺寸预训练解决现有遥感基础模型输入异构与部署刚性的双重问题。

#### 🎯 核心要点
- **统一四类 Copernicus 传感器**：Sentinel-1 SAR、Sentinel-2 MSI、Sentinel-3 OLCI、Sentinel-3 SLSTR，在原生 10 m-1000 m GSD 范围内进入同一模型
- **THOR Pretrain 数据集**：约 22 TB，包含 6273 个全球采样位置和 18332 个 tile-date 组合，并加入 DEM、WorldCover/GlobCover/MODIS 土地覆盖、ERA5-Land 变量
- **per-band patch projection**：每个输入波段有独立 patch 投影层，可处理缺失波段、任意波段子集和不同传感器组合
- **group average pooling**：同一 GSD 的 band group 先各自产生 patch token，再聚合对应位置 token，控制多模态长序列成本
- **FlexiViT 式随机 patch 训练**：预训练时随机采样输入尺寸与 patch size，推理时可在不重训的情况下选择更小 patch 获取密集特征，或选择更大 patch 节省算力
- **GSD-aware 2D-ALiBi**：注意力偏置按真实地面距离而不是像素距离计算，支持不同分辨率、不同 patch 大小之间的相对位置比较
- **多任务 MAE 预训练**：像素重建、土地覆盖/DEM map prediction、ERA5-Land 与经纬度/月序等 image-level prediction、SAR 入射角/轨道方向任务、patch-level soft contrastive loss
- **低标签场景优势**：论文在 PANGAEA 10% 标注 split 上报告 THOR-B 取得最佳平均排名，说明可变 patch 产生的密集 token 能缓解“重 decoder 依赖”

#### 🔬 深入细节
##### 图示与可访问来源

![THOR encoder 架构](https://arxiv.org/html/2601.16011v1/fm4cs_block_diagram_revised_v2.png)
*图：THOR 用 band-wise patch projection、group average pooling 和单个 ViT encoder 处理多传感器、多分辨率输入。论文 HTML: https://arxiv.org/html/2601.16011v1；论文页: https://arxiv.org/abs/2601.16011；代码页: https://github.com/FM4CS/THOR。*

![THOR 预训练任务](https://arxiv.org/html/2601.16011v1/fm4cs_block_diagram_decoder_extended_v2.png)
*图：THOR 的多预训练目标，包括 masked reconstruction、land-cover/DEM map prediction、ERA5-Land 与 SAR 相关 image-level tasks。*

##### 问题背景：遥感基础模型的两个刚性

遥感数据天然异构：SAR、光学、多光谱、热红外的物理含义、波段数、空间分辨率和可用性都不同。很多已有 EO foundation model 会把多源数据重采样到统一网格，或只支持固定传感器组合，这会丢失 Sentinel-3 这类粗分辨率产品的原生尺度信息，也让缺失模态很难处理。

第二个问题是部署刚性。标准 ViT/MAE 通常固定输入尺寸和 patch size，例如 \(16\times16\)。对于语义分割、洪水检测、农田边界等密集任务，粗 patch 产生的 token 太稀，需要 UPerNet 这类重 decoder 做复杂上采样；在标注很少时，decoder 本身会变成数据饥饿组件。THOR 的核心假设是：如果 encoder 本身能在推理时输出更密集 token，简单 decoder 就足够。

##### Encoder：多波段投影 + 可变 patch

THOR 对每个波段使用独立 patch projection。设第 \(g\) 个 band group 的输入为 \(X_g\in\mathbb{R}^{H_g\times W_g\times C_g}\)，patch size 为 \(p_g\)，则该组 token 数近似为：

$$
N_g=\frac{H_gW_g}{p_g^2}
$$

高分辨率 Sentinel-1/2 可以使用更多 token 保留细节，低分辨率 Sentinel-3 可以使用较少 token 表示更大地面范围。对同一 GSD 的多个波段，THOR 先用 band-wise projection 得到 token，再对同位置 token 做 group average pooling，减少序列长度：

$$
z_{g,u}=\frac{1}{|B_g|}\sum_{b\in B_g}\operatorname{Proj}_{b}(X_{b,u})
$$

这里 \(u\) 是 patch 位置，\(B_g\) 是同一 GSD 的波段集合。这样设计让模型既能接收任意波段子集，也不会因为每个波段都单独进入 ViT 而造成序列爆炸。

##### GSD-aware 2D-ALiBi：用真实地面距离做位置偏置

普通位置编码很难同时处理 10 m 光学 patch 和 1000 m 热红外 patch。THOR 扩展 2D-ALiBi，让 attention logit 里的相对位置偏置按真实地面距离计算：

$$
a_{hij}=
\frac{\mathbf{q}_{hi}^{T}\mathbf{k}_{hj}}{\sqrt{d}}
-
\frac{\operatorname{dist}(\mathbf{x}_i,\mathbf{x}_j)}{\max(p)}
\cdot m(h)
$$

\(\operatorname{dist}(\mathbf{x}_i,\mathbf{x}_j)\) 是两个 patch 中心的米级距离，\(\max(p)\) 是最大 patch 尺寸，\(m(h)\) 是第 \(h\) 个 attention head 的 ALiBi slope。这个式子的关键不是“给 token 编号”，而是把不同 GSD 的 token 放在同一个真实空间度量里比较：两个 10 m patch 相隔 8 个像素，和两个 20 m patch 相隔 4 个像素，如果地面距离相同，就应该得到可比较的位置偏置。

##### Flexible ViT MAE loss：让重建目标适配任意 patch 大小

THOR 把 FlexiViT 的可变 patch 思路扩展到 MAE。标准 MAE 的 masked patch 重建损失可写为：

$$
\mathcal{L}_{\text{mae}}
=
\frac{1}{N}
\left\|
\operatorname{vec}(\mathbf{x})-\langle\mathbf{v},\mathbf{z}\rangle
\right\|^2
$$

\(\mathbf{x}\in\mathbb{R}^{p\times p}\) 是目标 patch，\(\mathbf{z}\) 是 decoder token，\(\mathbf{v}\) 是把 token 投影回 patch 像素的权重。patch size 从 \(p\) 变为 \(p^\*\) 时，THOR 用转置卷积和双线性插值调整投影权重，并用伪逆缩放保持损失尺度一致：

$$
\mathcal{L}_{\text{mae}}^\*
=
\frac{1}{N}
\left\|
\mathbf{B}^{+}
\left(
\mathbf{B}\operatorname{vec}(\mathbf{x})
-
\langle\mathbf{v}\mathbf{B}^{T},\mathbf{z}\rangle
\right)
\right\|^2
\approx
\mathcal{L}_{\text{mae}}
$$

这保证随机 patch 大小时，模型收到的重建监督不会因为 patch 像素数变化而失衡。

##### Patch-level contrastive 与总损失

THOR 不只重建输入像素。它把未 mask token 随机分成 \(K\) 组，为每组计算平均 embedding，并从对应位置提取土地覆盖直方图。土地覆盖直方图相似的 patch 组应该在表示空间更接近，于是引入 soft multi-label contrastive loss。简化地说：

$$
\mathcal{L}_{\text{con}}
=
\frac{1}{G}
\sum_{g=1}^{G}
\frac{1}{|T_g|}
\sum_{t\in T_g}
\mathcal{L}_{\text{con},g,t}
$$

最终预训练目标是多任务加权和：

$$
\mathcal{L}_{\text{total}}=
\lambda_1\mathcal{L}_{\text{mae}}
\lambda_2\mathcal{L}_{\text{con}}
\sum_t\lambda_{3,t}\mathcal{L}_{\text{map},t}
\lambda_4\mathcal{L}_{\text{era5}}
\lambda_5\mathcal{L}_{m}
\lambda_6\mathcal{L}_{\text{coord}}
\lambda_7\mathcal{L}_{\text{inc}}
\lambda_8\mathcal{L}_{\text{orb}}
\lambda_9\mathcal{L}_{\text{fft}}
$$

其中 map tasks 包括 WorldCover、GlobCover、MODIS、DEM、scene classification 等；\(\mathcal{L}_{\text{fft}}\) 是 Fourier 域 L1 MAE 重建项，用于稳定训练。

##### 伪代码：THOR 预训练与可变 patch 推理

```python
# THOR 的核心训练逻辑
def pretrain_thor(sample):
    # sample: 对齐后的 S1/S2/S3/DEM/land-cover/ERA5-Land 数据
    ground_cover = uniform(1000, 50000)          # 米级覆盖范围
    product_groups = sample_available_modalities(sample)

    token_budget = MAX_TOKENS
    tokens = []
    masks = []
    for group in product_groups:
        image = crop_native_gsd(sample[group], ground_cover)
        patch_size = draw_patch_size(group.gsd, token_budget, min_p=4, max_p=32)
        group_tokens = []
        for band in group.bands:
            band_tokens = band_patch_projector[band](image[band], patch_size)
            group_tokens.append(band_tokens)
        tokens.append(mean_pool_same_gsd(group_tokens))
        masks.append(random_mae_mask(tokens[-1]))
        token_budget -= len(tokens[-1])

    # GSD-aware 2D-ALiBi 在 ViT attention 中按真实地面距离加偏置
    z = thor_vit_encoder(tokens, masks, gsd_aware_alibi=True)

    # 轻量 decoder 只用于预训练
    loss = 0
    loss += flexible_mae_reconstruction(z, sample.inputs, masks)
    loss += land_cover_and_dem_map_prediction(z, sample.maps)
    loss += image_level_prediction(z, sample.era5_land, sample.month, sample.coords)
    loss += sar_orbit_and_incidence_tasks(z, sample.sar_meta)
    loss += patch_level_soft_contrastive(z, sample.land_cover_histograms)
    loss += fft_reconstruction_regularizer(z, sample.inputs)
    return loss


def finetune_or_infer(image, desired_patch_size):
    # 同一套预训练权重可换 patch size
    tokens = thor_encoder(image, patch_size=desired_patch_size)
    return lightweight_decoder(tokens)
```

##### 为什么 compute-adaptive 对下游任务重要

THOR 的推理 patch size 不是训练后固定死的超参数。对洪水、水体、农田边界等需要细粒度空间定位的任务，可以选 \(4\times4\) 或 \(6\times6\) patch，得到更密集 token，甚至用线性 decoder 就能恢复细节。对全球尺度气候趋势、海洋监测等更重视大范围上下文和吞吐的任务，则可以选更大 patch，减少 token 数和 ViT 计算量。

论文的消融结果正是围绕这个假设：同一个 THOR-B 在 Sen1Floods11 上把推理 patch 从 \(16\times16\) 缩小到 \(4\times4\) 时，线性 probing 的 mIoU 大幅提升；在 Sentinel-3 雪覆盖回归任务中，较小 patch 也降低 RMSE，并使简单线性 decoder 接近 UPerNet。这说明 THOR 的优势不只是“数据更多”，而是 encoder 的特征密度可以按任务调节。

##### 与 SatMAE、CROMA、Copernicus-FM 的差异

SatMAE 主要展示 masked autoencoding 对遥感时空/多光谱数据的价值，但 patch 和输入形态仍较固定；CROMA 强调 SAR-光学对齐和对比/MAE 预训练，但不覆盖完整 10 m-1000 m 传感器范围；Copernicus-FM 统一更多 Copernicus 任务，但重点在输入灵活性而不是部署时 patch compute trade-off。THOR 的独特组合是：输入端 per-band 多模态适配，位置端 GSD-aware ALiBi，训练端随机 patch/input size，输出端轻 decoder 友好的密集 token。

> 💡 关键：THOR 不是简单把多源遥感图像拼在一起，而是把“真实地面尺度”贯穿 patch 投影、位置偏置、MAE 重建和推理 patch 选择，使同一 encoder 能在高精细任务和大范围任务之间调算力与精度。

#### 🧪 练习题
```yaml
question: "THOR 中 GSD-aware 2D-ALiBi 的主要作用是什么？"
options:
  - "把 Sentinel-1 SAR 转换成 RGB 图像"
  - "用真实地面距离而非单纯像素距离构造注意力位置偏置，使不同 GSD 和 patch size 的 token 可在同一空间尺度下交互"
  - "替代所有 masked autoencoder 重建损失"
  - "强制模型只能使用固定 16x16 patch"
answer: 1
explain: "THOR 同时处理 10 m 到 1000 m 的多源观测，位置偏置必须反映真实地面距离；GSD-aware 2D-ALiBi 正是为可变 patch 和多分辨率输入服务。"
```
