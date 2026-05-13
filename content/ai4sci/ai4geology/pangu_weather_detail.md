### Pangu-Weather

```yaml
id: pangu_weather
name: Pangu-Weather
full_name: "Pangu-Weather: A 3D High-Resolution Model for Fast and Accurate Global Weather Forecast"
year: 2023
org: Huawei Cloud
paper_url: https://arxiv.org/abs/2211.02556
category: meteo_ai
parent: fourcastnet
motivation: "提出3D Earth-Specific Transformer处理立体气象数据，结合层次时间聚合策略，首次以AI方法在中期天气预报精度上全面超越ECMWF业务系统IFS"
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