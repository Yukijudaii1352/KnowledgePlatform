### WeatherBench

```yaml
id: weatherbench
name: WeatherBench
full_name: 天气基准数据集 (WeatherBench)
year: '2020'
org: Google Research
paper_url: https://arxiv.org/abs/2002.00469
category: climate_ai
parent: —
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
