### Groundsource

```yaml
id: groundsource
name: Groundsource
full_name: 城市内涝预警 (Groundsource)
year: '2026'
org: Google Research
paper_url: https://research.google/blog/protecting-cities-with-ai-driven-flash-flood-forecasting/
category: geo_hazard
parent: floodhub
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
