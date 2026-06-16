### Dryad Gen-4-Pro

```yaml
id: dryad_gen4
name: Dryad Gen-4-Pro
full_name: Dryad野火传感器 (Dryad Gen-4-Pro)
year: '2026'
org: Dryad Networks
paper_url: https://www.businesswire.com/news/home/20260510819235/en/
category: geo_hazard
parent: alertcalifornia
motivation: AI嗅觉识别阴燃野火烟雾前检测
```

#### 📝 一句话总结

Dryad Gen-4-Pro 是一类面向林下部署的 AI 电子鼻野火传感器，通过 VOC、CO、PM2.5/PM10 与微气象数据融合，在明火和可见烟柱出现前识别阴燃阶段的热解气体指纹，并借助 LoRaWAN mesh 或直连卫星把告警传回云端。

#### 🎯 核心要点

- **传感器融合而非视觉检测**：用 VOC、CO、颗粒物、温湿度和气压识别阴燃火灾，补足摄像头/卫星通常要等烟柱、火焰或热异常成形后才能发现的滞后
- **Gen-4-Pro 新增 CO 与 PM2.5/PM10 能力**：官方资料称新一代传感器提高检测精度和灵敏度，降低误报，并把检测范围提升到此前的两倍或以上
- **边缘 AI 判别**：传感器在设备端融合气体和空气质量特征，区分野火热解信号与正常森林微气候、污染源或传感器漂移
- **林下低功耗部署**：内置 8 x 8 cm 太阳能板，使用超级电容而非锂电池，面向 10 年免维护运行，减少设备自身火灾风险
- **多路径通信**：支持 LoRaWAN、Silvanet 多跳 mesh、Border Gateway 云端回传，并在 Gen-4-Pro 中加入 Kinéis UHF 直连卫星链路，适合无公网覆盖的森林和线性基础设施
- **覆盖参数明确**：官方 WF-4P Pro 数据表给出 100 m、2 kg fuel 条件下数分钟级检测，传感器间距可达 300 m，单个网关最多连接约 100 个野火传感器
- **系统级告警闭环**：传感器本地打分后只上传低带宽告警和环境摘要，云端结合站点拓扑、邻近节点、历史基线和运维状态生成面向消防/林业用户的事件
- **来源限制**：未找到公开同行评审论文或完整模型结构；以下算法解读基于 Dryad 官方发布、产品页、WF-4P Pro 数据表、Dryad 文档和 ST 对 Silvanet 架构的技术介绍，并把未公开部分标注为方法级重构

#### 🔬 深入细节

##### 图示与可访问来源

![Dryad Gen-4-Pro 传感器外观](https://static.wixstatic.com/media/072dcb_b0037712e3a543369fa346db84209fba~mv2.png/v1/crop/x_130%2Cy_0%2Cw_2683%2Ch_2784/fill/w_416%2Ch_429%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/gen4%20front%20side%20back.png)
*图：Dryad 官方产品页中的 Gen-4-Pro/WF-4P Pro 传感器外观。官方发布页见 https://www.dryad.net/post/dryad-launches-gen-4-pro-silvanet-wildfire-sensor-setting-new-standard-in-ultra-early-fire-detectio ，产品页和数据表见 https://www.dryad.net/wildfiresensor 与 https://www.dryad.net/_files/ugd/072dcb_deecacb08cc04691ac08beeb3ce27c09.pdf 。*

![Silvanet LoRa mesh 架构](https://blog.st.com/wp-content/uploads/2025/11/CleanShot-2022-09-08-at-00.23.51%402x-scaled.jpg)
*图：Silvanet 传感器、Mesh Gateway、Border Gateway 与云平台的多跳回传架构。图片来自 STMicroelectronics 对 Silvanet 低功耗 LoRa 方案的技术介绍：https://blog.st.com/silvanet/ 。*

##### 问题背景：为什么要把“鼻子”放到森林里

摄像头、瞭望塔和卫星适合观察已经形成烟柱、火焰或热异常的火灾，但对林下阴燃火特别不友好。阴燃阶段的火源可能还没有可见火焰，树冠又会遮挡遥感视线；等到摄像头或卫星看到明显烟柱，火势通常已经跨过可被一支小队快速压制的窗口。

Dryad 的思路是把检测对象从“光学现象”提前到“燃烧化学信号”。枯枝、落叶和林下可燃物在热解和阴燃时会释放 VOC、CO 和细颗粒物，这些信号在火苗可见前就会扩散到近地空气中。Gen-4-Pro 把这类气体/颗粒物传感器和温湿度、气压等微气候传感器封装到低功耗节点里，部署在树上或杆上，让森林本身成为稠密的环境传感网络。

> ⚠️ 注意：Dryad 公开资料说明“内置 AI”和“融合 VOC、CO、颗粒物传感器”，但没有公开网络层数、训练集、阈值或损失函数。因此下文公式和伪代码是与公开系统行为一致的工程化重构，用来解释它为什么可行，而不是 Dryad 已披露的源码。

##### 感知变量与火灾指纹

一个传感器在时间 \(t\) 的观测可写成多变量序列：

$$
x_t =
\left[
\mathrm{VOC}_t,\ \mathrm{CO}_t,\ \mathrm{PM}_{2.5,t},\ \mathrm{PM}_{10,t},\
T_t,\ RH_t,\ P_t,\ E_t
\right]
$$

其中 \(T\) 是温度，\(RH\) 是相对湿度，\(P\) 是气压，\(E\) 可表示能量/光照或设备健康状态。单看某个变量容易误报：VOC 可能来自植被挥发，PM2.5 可能来自远处烟雾或道路扬尘，CO 传感器也会有漂移。因此真正有用的是“多变量共同变化的形状”：CO 和 VOC 同时上升、颗粒物滞后增强、湿度/温度出现局地异常，并且这种变化持续若干采样周期。

一种合理的边缘特征构造是先对每个站点建立动态基线：

$$
\mu_i(t)=\operatorname{EMA}(x_{i,t}),\qquad
\sigma_i(t)=\operatorname{EMA}(|x_{i,t}-\mu_i(t)|)+\epsilon
$$

$$
z_{i,t}=\frac{x_{i,t}-\mu_i(t)}{\sigma_i(t)}
$$

这样做的目的不是估计绝对污染浓度，而是判断“该传感器所在林下微环境是否出现不寻常的燃烧指纹”。在潮湿山谷、干燥针叶林和靠近道路的站点，同一 CO 或 PM2.5 读数的意义不同，必须相对本地背景解释。

##### 边缘 AI 判别：多模态、时序和抗误报

公开资料中的“AI-based gas and air-quality sensing”可以抽象为一个轻量分类器：

$$
p_t = f_\theta
\left(
z_{t-k:t},\
\Delta z_{t-k:t},\
\operatorname{corr}(z_{\mathrm{CO}}, z_{\mathrm{VOC}}),\
\operatorname{corr}(z_{\mathrm{PM}}, z_{\mathrm{CO}})
\right)
$$

其中 \(p_t\) 是阴燃火灾概率，\(z_{t-k:t}\) 是最近 \(k\) 个窗口的归一化特征，\(\Delta z\) 表示上升速率。火灾不是一个瞬时尖峰，而是具有持续性和化学耦合关系的事件，所以最终告警通常要经过时间平滑：

$$
s_t = \alpha p_t + (1-\alpha)s_{t-1}
$$

$$
\mathrm{alert}_t =
\mathbb{1}\left[
s_t > \tau_{\mathrm{fire}}
\land
\Delta \mathrm{CO}_t > \tau_{\mathrm{CO}}
\land
\Delta \mathrm{PM}_{2.5,t} > \tau_{\mathrm{PM}}
\right]
$$

这个结构解释了为什么 Gen-4-Pro 加入 CO 和 PM2.5 会有实质意义。VOC 对早期热解敏感，但生态背景复杂；CO 是不完全燃烧的强信号；PM2.5/PM10 捕捉烟雾颗粒。三者一起看，相当于把“气味、燃烧产物和颗粒物”同时纳入分类边界，从而降低单一传感器漂移或环境扰动造成的误报。

##### 网络与告警路径

Silvanet 的工程难点不只是检测，还包括在没有电力和公网的森林中把告警送出去。Dryad 文档将系统分成 Wildfire Sensor、Mesh Gateway、Border Gateway 和 Silvanet Cloud。普通 LoRaWAN 是星型网络，深林中单跳网关覆盖有限；Silvanet 用 Mesh Gateway 扩展覆盖，让传感器消息经多跳 mesh 到达 Border Gateway，再通过 LTE-M/2G、以太网、卫星或 Gen-4-Pro 的直连卫星链路进入云端。

从系统角度看，Dryad 避免了把原始高频传感器流全部上传。边缘节点本地完成大部分判别，只在周期心跳、微气候摘要或告警状态变化时发包。这样能同时满足三个约束：LoRa 链路低带宽、太阳能供电、传感器数量可扩展。

##### 算法伪代码：从林下空气到云端告警

```python
# Dryad Gen-4-Pro 方法级重构：公开资料未披露真实模型参数
def sensor_loop():
    baseline = load_local_baseline()
    score = 0.0

    while True:
        raw = read_sensors(
            variables=["VOC", "CO", "PM2.5", "PM10", "temperature", "humidity", "pressure"]
        )
        health = read_device_state()  # solar/supercapacitor/radio/device diagnostics

        # 1. 本地基线校正：过滤季节、昼夜和站点差异
        z = robust_normalize(raw, baseline)
        dz = temporal_gradient(z)

        # 2. 电子鼻分类：融合气体、颗粒物和微气象上下文
        p_fire = edge_model.predict(
            features=[
                z["VOC"], z["CO"], z["PM2.5"], z["PM10"],
                dz["VOC"], dz["CO"], dz["PM2.5"],
                z["temperature"], z["humidity"], z["pressure"],
                health["sensor_quality"],
            ]
        )

        # 3. 时间一致性约束：火灾指纹需要持续，而不是单点尖峰
        score = 0.8 * score + 0.2 * p_fire
        alert = (
            score > FIRE_THRESHOLD
            and dz["CO"] > CO_RISE_THRESHOLD
            and dz["PM2.5"] > PM_RISE_THRESHOLD
        )

        # 4. 低带宽上传：告警优先，常规环境数据低频上传
        if alert:
            packet = make_fire_alert(raw, score, gps_or_site_location(), timestamp())
            send_via_lora_mesh_or_satellite(packet)
        else:
            send_periodic_microclimate_summary(raw, health)

        baseline = update_baseline(baseline, raw, exclude_if=alert)
        sleep_until_next_sampling_window()


def cloud_event_fusion(packets):
    events = cluster_by_site_time_and_location(packets)
    for event in events:
        # 多节点一致性、风向、站点拓扑和设备状态用于降低误报
        confidence = fuse(
            event.sensor_scores,
            event.neighboring_sensor_context,
            event.wind_or_microclimate_context,
            event.device_health,
        )
        if confidence > DISPATCH_THRESHOLD:
            notify_users(event.location, confidence, event.first_seen)
```

##### 与 ALERTCalifornia 摄像头路线的区别

ALERTCalifornia 的优势是覆盖广、可视化强，摄像头图像还能给调度员提供方向、烟柱规模和火势发展证据。但摄像头依赖视线，容易受地形、夜间能见度、云雾和树冠遮挡影响。Dryad 的优势是把传感器放在燃料附近，目标是“火还没有长成可以被看见的烟柱之前”就发现异常。

两者不是替代关系，而是互补关系。一个合理的灾害监测系统可以用 Dryad 类地面电子鼻给出最早触发，用摄像头/无人机确认火点和态势，用卫星做大范围热异常与烟羽追踪。Dryad Gen-4-Pro 的技术贡献在于把 AI 检测边界从图像空间前移到化学空间，同时用低功耗网络解决森林中最难的供电和通信问题。

> 💡 关键：Gen-4-Pro 的“AI”价值不在于云端大模型，而在于每个边缘节点都能在噪声很大的本地空气质量信号中做早期、低功耗、低误报的二分类，并只把必要事件传回网络。

#### 🧪 练习题

```yaml
question: "Dryad Gen-4-Pro 相比摄像头/卫星野火检测，最核心的技术前移是什么？"
options:
  - "把野火检测从可见烟柱或热异常前移到阴燃阶段的气体和颗粒物指纹"
  - "用更高分辨率相机替代卫星遥感"
  - "只在云端处理全部原始传感器数据以提高精度"
  - "完全依赖人工巡查确认每个传感器读数"
answer: 0
explain: "Gen-4-Pro 使用 VOC、CO、PM2.5/PM10 和微气象信号做边缘 AI 融合，目标是在明火和明显烟柱出现前识别阴燃火。"
```
