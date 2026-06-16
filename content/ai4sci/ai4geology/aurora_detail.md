### Aurora

```yaml
id: aurora
name: Aurora
full_name: Aurora大气基础模型 (Aurora)
year: '2024'
org: Microsoft Research
paper_url: https://www.microsoft.com/en-us/research/blog/introducing-aurora-the-first-large-scale-foundation-model-of-the-atmosphere/
category: earth_fm
parent: climax
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
