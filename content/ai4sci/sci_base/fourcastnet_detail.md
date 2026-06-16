### FourCastNet

```yaml
id: fourcastnet
name: FourCastNet
full_name: 傅里叶预报网络 (Fourier ForeCasting Neural Network)
year: '2022'
org: NVIDIA
paper_url: https://arxiv.org/abs/2202.11214
category: materials_weather
parent: —
motivation: 傅里叶神经算子+ViT实现快速气象预报
```

#### 📝 一句话总结

FourCastNet 将 Adaptive Fourier Neural Operator 与 ViT 式 token 框架结合，在 0.25° ERA5 全球网格上学习 6 小时天气状态演化算子，解决了传统深度学习气象模型分辨率低、难以捕捉极端事件且推理太慢的问题，实现了秒级中期全球预报和大规模集合预报。

#### 🎯 核心要点

- **高分辨率全球预报**：在 \(720\times1440\) 的 0.25° 经纬网格上预测全球天气状态，约对应赤道附近 30 km 空间分辨率
- **AFNO + ViT 架构**：将输入气象场切成 patch token，用傅里叶域全局卷积替代二次复杂度自注意力做空间混合
- **20 个预报变量 backbone**：预测风、温度、位势高度、相对湿度、地面气压、海平面气压、整层水汽等关键 ERA5 变量
- **降水诊断模型**：总降水不放入 backbone 主状态，而是用单独 AFNO 模型从 backbone 输出诊断 6 小时累计降水
- **两阶段训练**：先学习单步 \(t\rightarrow t+6h\) 映射，再用两步自回归 fine-tuning 缓解长期 roll-out 误差积累
- **自回归推理**：推理时反复把预测场作为下一步输入，生成数天到一周的自由运行预报
- **极端事件能力**：能解析台风、飓风、近地面风速、强降水和 atmospheric river 等细尺度现象
- **集合预报优势**：单节点多 GPU 可快速批量推理，论文估计相对 IFS 在节点时间和能耗上有数万倍量级优势

#### 🔬 深入细节

##### 架构总览

![FourCastNet AFNO 架构与训练推理流程](https://ar5iv.labs.arxiv.org/html/2202.11214/assets/afno_plus_v1.png)
*图：AFNO Transformer 主干、两步 fine-tuning、降水诊断模型和自回归推理流程。来源为论文 ar5iv 页面 Figure 2。*

论文来源：arXiv 论文页 https://arxiv.org/abs/2202.11214；可读 HTML 与图示来源 https://ar5iv.labs.arxiv.org/html/2202.11214。

FourCastNet 把天气预报视为一个数据驱动的算子学习问题。输入不是单点时间序列，而是一个包含多通道物理变量的全球二维场：

$$X_t\in\mathbb{R}^{720\times1440\times20}$$

模型学习 6 小时时间步长的状态转移：

$$F_\theta: X_t \mapsto X_{t+\Delta t},\qquad \Delta t=6\ \mathrm{hours}$$

这与传统 NWP 的差异很大：NWP 显式求解离散化流体动力学方程和物理参数化，FourCastNet 则用 ERA5 再分析数据监督学习这个转移算子。

##### AFNO 层核心计算

FourCastNet 的关键模块是 Adaptive Fourier Neural Operator。输入场先被划分为 \(p\times p\) patch，例如 \(p=8\)，每个 patch 被嵌入为 \(d\) 维 token，形成：

$$X\in\mathbb{R}^{h\times w\times d}$$

每个 AFNO layer 先在二维 patch 网格上做离散傅里叶变换：

$$\hat{X}_{u,v}=\mathrm{DFT}(X)_{u,v}$$

然后在频域对 token 做共享的块对角 MLP 和软阈值稀疏化：

$$\hat{Y}_{u,v}=S_\lambda\left(\mathrm{MLP}_{\mathrm{block}}(\hat{X}_{u,v})\right)$$

其中软阈值可写为：

$$S_\lambda(z)=\mathrm{sign}(z)\max(|z|-\lambda,0)$$

最后逆傅里叶变换回空间 token，并加残差：

$$Y=X+\mathrm{IDFT}(\hat{Y})$$

与 ViT 自注意力的 \(\mathcal{O}(N^2)\) 空间混合不同，FFT 带来约 \(\mathcal{O}(N\log N)\) 的复杂度，因此能处理 \(720\times1440\) 这种百万像素级全球场。

##### 核心算法伪代码

```python
# FourCastNet training and autoregressive inference
def train_backbone(batch):
    x_t, x_t1, x_t2 = batch  # 6-hour interval ERA5 states

    # pretraining: one-step forecast
    pred_t1 = fcn_backbone(x_t)
    loss_one = mse(pred_t1, x_t1)

    # fine-tuning: two-step rollout
    pred_t1 = fcn_backbone(x_t)
    pred_t2 = fcn_backbone(pred_t1)
    loss_two = mse(pred_t1, x_t1) + mse(pred_t2, x_t2)

    update(loss_one_or_loss_two)

def forecast(initial_state, steps):
    x = initial_state
    trajectory = []
    for k in range(steps):
        x = fcn_backbone(x)
        precip = precipitation_afno(x)
        trajectory.append((x, precip))
    return trajectory
```

##### 训练数据与变量设计

论文使用 ERA5 再分析数据，将小时级数据下采样到每天 00/06/12/18 UTC，即 6 小时间隔。训练集为 1979-2015，验证集为 2016-2017，2018 年及以后作为 out-of-sample 测试。backbone 变量包括近地面风、2m 温度、气压、多个气压层的风速/温度/位势高度/相对湿度，以及 total column water vapor。

单步预训练目标可写为：

$$\mathcal{L}_{1}=\|F_\theta(X_t)-X_{t+1}\|_2^2$$

但天气系统是混沌动力系统，推理时模型会吃自己的输出；如果只训练单步，误差分布和训练输入分布会逐步错开。FourCastNet 因此做两步 fine-tuning：

$$\hat{X}_{t+1}=F_\theta(X_t),\qquad \hat{X}_{t+2}=F_\theta(\hat{X}_{t+1})$$

$$\mathcal{L}_{2}=\|\hat{X}_{t+1}-X_{t+1}\|_2^2+\|\hat{X}_{t+2}-X_{t+2}\|_2^2$$

这个训练目标让模型在训练阶段提前暴露于自己的预测误差，降低自由运行数十步后的漂移。

##### 为什么降水单独建模

总降水 \(P\) 和温度、风、位势高度不同，分布高度稀疏，大量位置接近 0，同时极端值长尾。论文将降水作为 diagnostic variable，而不是 backbone 的 20 个 prognostic variables 之一。降水模型输入 backbone 预测的大气状态，输出 6 小时累计降水。

为了缓解长尾和零值问题，论文对降水使用对数变换，方法可概括为：

$$P'=\log(1+P/\epsilon)$$

预测后再变换回物理单位。降水模型最后增加带周期 padding 的 2D 卷积和 ReLU，以保证输出非负：

$$\hat{P}=\mathrm{ReLU}(\mathrm{Conv2D}(G_\psi(\hat{X})))$$

这样主干网络专注于控制大气演化的状态变量，降水网络专注于从状态中诊断稀疏降水场。

##### 自回归推理与集合预报

推理时，FourCastNet 从某个 ERA5 初始条件开始自由运行：

$$\hat{X}_{t+k+1}=F_\theta(\hat{X}_{t+k}),\qquad k=0,\ldots,K-1$$

每一步间隔 6 小时，所以 16 步就是 96 小时预报。论文展示了 2018 年 9 月 8 日初始化后的 96 小时近地面风速预报，能捕捉 Super Typhoon Mangkhut 以及 Florence、Issac、Helene 等气旋相关结构。

快速推理还带来集合预报优势。给定初始条件 \(X_0\)，可以加入小扰动形成多个 ensemble members：

$$X_0^{(m)}=X_0+\sigma\epsilon^{(m)},\qquad \epsilon^{(m)}\sim\mathcal{N}(0,I)$$

然后把 \(m\) 个成员放到 batch 维度并行 rollout。集合均值：

$$\bar{X}_{t+k}=\frac{1}{M}\sum_{m=1}^{M}\hat{X}_{t+k}^{(m)}$$

可用于提高较长提前期的平均技巧分数，并估计初值不确定性。传统 IFS 也做集合预报，但每个成员都要昂贵地求解数值模式；FourCastNet 的 GPU batch 推理让 100 到 1000 成员集合在研究场景中变得便宜。

##### 与传统 NWP 和低分辨率 DL 模型的区别

传统 NWP 的优势是物理可解释、守恒律和长期业务积累，但需要大规模 CPU/HPC 资源，并依赖复杂的物理参数化。早期深度学习天气模型通常在 \(32\times64\) 或更粗网格上训练，难以解析近地面风、强降水、台风眼墙和地形影响。FourCastNet 的创新在于把高分辨率图像建模中的 Fourier token mixing 搬到全球大气场，使模型在百万像素级输入上仍能全局混合信息。

> 💡 关键：FourCastNet 不是简单 CNN 天气预报器，而是把“高分辨率大气状态转移”当作傅里叶神经算子来学习；AFNO 的频域全局混合是它能同时兼顾全球依赖、细尺度结构和推理速度的核心。

#### 🧪 练习题

```yaml
question: "FourCastNet 使用 AFNO 代替标准 ViT 自注意力做空间混合的主要原因是什么？"
options:
  - "AFNO 在傅里叶域用 FFT 实现全局混合，复杂度更适合高分辨率全球网格"
  - "AFNO 会自动求解 Navier-Stokes 方程而不需要训练数据"
  - "AFNO 只能处理单变量时间序列，因此更简单"
  - "AFNO 的目标是把降水值强制设为 0"
answer: 0
explain: "标准自注意力随 token 数近似二次增长；AFNO 在频域做全局 token mixing，利用 FFT 将复杂度降到约 O(N log N)，适合 0.25° 全球气象场。"
```
