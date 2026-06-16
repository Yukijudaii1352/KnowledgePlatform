### Flood Hub

```yaml
id: floodhub
name: Flood Hub
full_name: 洪水预警中心 (Flood Hub)
year: '2022'
org: Google Research
paper_url: https://research.google/blog/expanding-global-flood-forecasting/
category: geo_hazard
parent: —
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
