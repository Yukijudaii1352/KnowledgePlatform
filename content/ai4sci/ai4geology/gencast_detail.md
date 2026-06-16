### GenCast

```yaml
id: gencast
name: GenCast
full_name: 生成式集合预报 (GenCast)
year: '2024'
org: Google DeepMind
paper_url: https://www.nature.com/articles/s41586-024-08252-9
category: meteo_ai
parent: graphcast
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
