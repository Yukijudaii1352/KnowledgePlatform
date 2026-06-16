### ClimaX

```yaml
id: climax
name: ClimaX
full_name: 气候基础模型 (ClimaX)
year: '2023'
org: Microsoft Research
paper_url: https://arxiv.org/abs/2301.10343
category: climate_ai
parent: weatherbench
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
