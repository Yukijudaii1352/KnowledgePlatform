### RECAST

```yaml
id: recast
name: RECAST
full_name: 余震预测模型 (RECAST)
year: '2023'
org: NVIDIA
paper_url: https://developer.nvidia.com/blog/recast-deep-learning-model-for-earthquakes/
category: geo_hazard
parent: —
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
