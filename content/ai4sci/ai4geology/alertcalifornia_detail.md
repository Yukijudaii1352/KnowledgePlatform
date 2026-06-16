### AlertCalifornia

```yaml
id: alertcalifornia
name: AlertCalifornia
full_name: 加州野火预警系统 (AlertCalifornia)
year: '2024'
org: UC San Diego
paper_url: https://www.alertcalifornia.org/
category: geo_hazard
parent: —
motivation: AI摄像头野火早期检测提前45分钟
```

#### 📝 一句话总结

AlertCalifornia 把加州大规模山顶 PTZ 摄像头网络接入烟雾/火点视觉模型与 CAL FIRE 调度流程，用“AI 初筛 + 值班员确认 + 位置/置信度告警”解决野火早期发现依赖人工盯屏和 911 电话的延迟问题。

#### 🎯 核心要点

- **全州级传感器网络**：UC San Diego 运营的 ALERTCalifornia 摄像头和网络基础设施持续采集实时图像，官方技术页说明 ArcGIS 图层可提供摄像头位置、视域和每 15 秒更新的当前图像
- **人机协同闭环**：AI 在摄像头网络中发现潜在火情后，向消防员提供置信度百分比和估计位置，再由受训 watchstander 确认并触发响应
- **部署到 CAL FIRE 调度中心**：官方说明该 AI 工具于 2023 年 9 月面向全部 21 个 CAL FIRE 911 Dispatch Centers 可用，尤其适合偏远区域和夜间异常发现
- **可追溯论文原型**：公开项目页不是论文；方法细节主要来自 Govil 等 2020 年 Remote Sensing 论文，其 Fuego 原型使用 InceptionV3 对远程摄像头图像做烟雾检测
- **小烟羽保真切片**：原型不把 3000x2000 图像整体缩放到 299x299，而是切成略重叠的 299x299 patch，避免远处小烟羽在缩放中消失
- **动态阈值抑制误报**：对每个摄像头、每个图像块用近 3 天同一时段历史最大分数提升阈值，可减少由雾、云、反光、烟霾触发的重复误报
- **通知去重**：同一摄像头持续看到同一火情时，系统继续打分但抑制重复通知，直到连续一小时不再检测到烟雾

#### 🔬 深入细节

##### 图示与来源限制

AlertCalifornia 官方站点是运行系统与公共安全项目页，不公开完整模型论文；下面的算法级细节来自其可追溯的地面摄像头烟雾检测论文原型：Govil et al., *Preliminary Results from a Wildfire Detection System Using Deep Learning on Remote Camera Images*, Remote Sensing 2020，DOI: `10.3390/rs12010166`。实际 2023-2026 年 CAL FIRE/ALERTCalifornia/Digital Path 生产系统可能包含后续工程更新，公开资料只披露“置信度、估计位置、值班员确认、调度中心接入”等运行接口。

![地面摄像头与卫星探测融合的野火告警示意](https://pub.mdpi-res.com/remotesensing/remotesensing-12-00166/article_deploy/html/images/remotesensing-12-00166-ag.png?1579090328=)
*图：Govil et al. 2020 的图形摘要。系统思想是把地面 lookout camera detector 与卫星 fire detector 融合后告警消防机构。*

![烟雾图像块打分示例](https://pub.mdpi-res.com/remotesensing/remotesensing-12-00166/article_deploy/html/images/remotesensing-12-00166-g003.png?1579090328=)
*图：论文 Figure 3 的 sub-image scoring 示例。整幅摄像头图像被切成 299x299 小块，每块独立输出烟雾 softmax 分数。*

##### 算法伪代码

```python
# ALERTCalifornia / Fuego 风格烟雾早检流程
def detect_wildfire(camera_frame, camera_id, timestamp, model, history):
    patches = sliding_299x299_patches(camera_frame, overlap=True)
    alerts = []

    for patch_id, patch in patches:
        p_smoke = model.inference(patch)["smoke_softmax"]

        # 近 3 天、当前时刻前后 2 小时窗口内，同摄像头同 patch 的历史最高分
        h = history.max_score(
            camera_id=camera_id,
            patch_id=patch_id,
            center_time=timestamp,
            days=3,
            hour_window=2,
        )
        threshold = 0.5 if h == 0 else (h + 1.0) / 2.0

        if p_smoke > threshold:
            alerts.append((patch_id, p_smoke, threshold))

    if alerts and not recently_alerted(camera_id, quiet_period="1h"):
        location = estimate_location(camera_id, active_patch_ids=[a[0] for a in alerts])
        certainty = max(a[1] for a in alerts)
        notify_dispatch_center(camera_id, location, certainty, camera_frame)

    history.update(camera_id, timestamp, patches, scores=alerts)
```

##### 为什么要用 patch 而不是整图分类

远程山顶摄像头的优点是视野极大，缺点是早期火情在图像里只占很小面积。论文原型使用 InceptionV3，标准输入尺寸是 299x299；如果把 6MP 级别的整图直接缩放到 299x299，远处细烟可能只剩几个像素，分类器几乎无法区分它和云、雾或压缩噪声。因此系统把全图切成略重叠 patch，再对每个 patch 独立分类：

$$
s_{c,p,t}=f_\theta(\operatorname{crop}_{p}(I_{c,t})) \in [0,1]
$$

其中 \(I_{c,t}\) 是摄像头 \(c\) 在时刻 \(t\) 的图像，\(p\) 是图像块编号，\(f_\theta\) 是烟雾分类模型，输出 softmax 烟雾分数。这样做牺牲了一部分全局上下文，但保留了小烟羽的空间分辨率，并允许系统把“疑似烟雾在哪个方向/图像块”传给后续定位与人工确认环节。

##### 训练数据如何构造

论文原型从 HPWREN 摄像头历史档案出发，结合 CAL FIRE 历史火点的位置和时间，先找出可能看到该火情的摄像头和时段，再由人工在火灾早期图像中框出可见烟羽。为了让模型关注“萌芽阶段”，大型火势形成后的图像不作为正样本核心。论文报告约 8500 张独特烟雾图，经平移、翻转增强到约 85000 个烟雾训练片段。

负样本不是随便抽取晴天图像，而是刻意加入云、雾、烟霾、反光等“像烟但不是烟”的 hard negative。系统还把早期模型误报的图像加入非烟雾数据集并反复重训，这相当于一个人工审核驱动的 hard-negative mining 循环。它解决的是野外视觉系统最典型的难点：真实火情稀少，而误报模式会随摄像头朝向、季节、时间和天气变化。

##### 动态阈值与通知逻辑

固定阈值 \(0.5\) 对每个摄像头、每个方向都不公平。某些图像块在每天同一时段会因为太阳反光、海雾或低云稳定地产生偏高分数。原型因此为每个 patch 建立局部历史阈值：

$$
h_{c,p,t}=\max_{\tau \in \mathcal{W}(t)}
s_{c,p,\tau}
$$

$$
\theta_{c,p,t}=
\begin{cases}
0.5, & h_{c,p,t}=0 \\
\frac{h_{c,p,t}+1}{2}, & h_{c,p,t}>0
\end{cases}
$$

只有当 \(s_{c,p,t}>\theta_{c,p,t}\) 时才把该 patch 视为异常。直觉上，如果某个方向过去几天同一时段经常达到 0.4，那么系统不会继续用 0.5 触发，而是把阈值抬到 0.7，要求新的视觉证据显著超过该位置的日常噪声。论文报告这种动态阈值把误报减少约 30%。

##### 从研究原型到生产工作流

生产系统的公开接口更强调消防调度可用性。官方技术页说明：AI 发现潜在火情后提供置信度和估计位置；受训值班员审核确认；消防员快速响应并在 incipient phase 控制火情。这个设计避免了“模型直接调度资源”的风险：视觉模型负责把海量摄像头流压缩成少量候选事件，人类负责最终判定和行动。

与传统人工瞭望相比，AI 的优势是持续扫描大量相机并把注意力推送到异常片段；与卫星热异常相比，地面相机能在烟羽很小、夜间或卫星重访间隔之外捕捉到线索。局限也很清楚：遮挡、云雾、强反光、摄像头视野外火点仍可能漏检，所以论文图形摘要把地面摄像头检测和卫星检测视为互补信号，而不是互相替代。

#### 🧪 练习题

```yaml
question: "AlertCalifornia 可追溯论文原型为什么把整幅摄像头图像切成 299x299 patch 再分类？"
options:
  - "为了让每个 patch 对应一个固定行政区"
  - "为了避免把整图缩小后丢失远处早期小烟羽的像素证据"
  - "为了绕过人工确认，直接自动派遣消防资源"
  - "为了只在夜间运行模型"
answer: 1
explain: "InceptionV3 的输入尺寸为 299x299，整图缩放会稀释小烟羽；切片能保留局部细节，再用动态阈值和人工确认降低误报。"
```
