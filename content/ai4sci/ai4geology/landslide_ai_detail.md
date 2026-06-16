### Landslide AI

```yaml
id: landslide_ai
name: Landslide AI
full_name: 香港滑坡预警系统 (Landslide AI)
year: '2026'
org: Hong Kong GEO
paper_url: https://www.geoengineer.org/news/hong-kongs-new-ai-powered-landslip-warning-system
category: geo_hazard
parent: floodhub
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
